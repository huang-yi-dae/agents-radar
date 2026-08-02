/**
 * Web content fetching for AI company news/blog/research.
 *
 * Strategy:
 *   - Discover article URLs via sitemaps (no date filter needed — lastmod is reliable)
 *   - Compare with stored state to find new/updated URLs
 *   - Fetch content only for new URLs; on first run, cap at MAX_CONTENT_FETCH_FIRST_RUN per site
 *   - After every run, mark ALL discovered URLs as seen so future runs stay incremental
 *
 * State is persisted in digests/web-state.json (committed to git by the Actions workflow).
 *
 * LEARNING NOTES:
 * - This module demonstrates "incremental scraping": compare current state with previous state
 *   to detect changes, rather than re-fetching everything.
 * - Sitemaps are XML files that list all URLs on a website — no need to crawl the site.
 * - Body extraction is attempted for every site; sites that block datacenter IPs
 *   (e.g. Cloudflare WAF on OpenAI) gracefully fall back to metadata-only items.
 *
 * KEY CONCEPTS:
 * - XML parsing with regex (no DOM parser needed for simple sitemaps).
 * - State persistence: save/load JSON to track what's been seen.
 * - Polite scraping: delays between requests, custom User-Agent header.
 */

import fs from "node:fs";
import path from "node:path";
import { sleep } from "./date.ts";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * A single web page item extracted from a sitemap.
 *
 * PROPERTIES:
 * - url: The full URL
 * - title: Page title (from og:title meta tag, or <title>, or URL slug)
 * - lastmod: Last modification date from sitemap
 * - content: Extracted text content (first 1500 chars), or empty string if the page couldn't be fetched (e.g. blocked by WAF)
 * - site: Which site this came from ("anthropic" or "openai")
 * - category: URL path segment (e.g. "news", "research", "engineering")
 */
export interface WebPageItem {
  url: string;
  title: string;
  lastmod: string;
  content: string;
  site: "anthropic" | "openai";
  category: string;
}

/**
 * State for a single site — tracks which URLs have been seen.
 *
 * PROPERTIES:
 * - lastChecked: ISO timestamp of the last check
 * - seenUrls: Map of URL → lastmod string (or "seen" if no lastmod)
 */
interface SiteState {
  lastChecked: string;
  seenUrls: Record<string, string>;
}

/**
 * Combined web state for both sites.
 * Persisted to digests/web-state.json.
 */
export interface WebState {
  anthropic: SiteState;
  openai: SiteState;
}

/**
 * Result of fetching content from a single site.
 *
 * PROPERTIES:
 * - site: Site identifier
 * - siteName: Human-readable name
 * - isFirstRun: True if this is the first time we've seen this site (no state)
 * - newItems: Array of new/updated WebPageItem objects
 * - totalDiscovered: Total URLs found in the sitemap (for context)
 */
export interface WebFetchResult {
  site: "anthropic" | "openai";
  siteName: string;
  isFirstRun: boolean;
  newItems: WebPageItem[];
  totalDiscovered: number;
}

// ---------------------------------------------------------------------------
// Site config
// ---------------------------------------------------------------------------

/**
 * Configuration for a single site's sitemap structure.
 *
 * PROPERTIES:
 * - name: Human-readable site name
 * - sitemapUrl: URL to the sitemap XML
 * - prefixes?: For single sitemaps — only keep URLs starting with these paths
 * - subSitemapNames?: For sitemap indexes — names of sub-sitemaps to fetch
 * - subSitemapTemplate?: URL template with {name} placeholder
 */
interface SiteConfig {
  name: string;
  sitemapUrl: string;
  prefixes?: string[];
  subSitemapNames?: string[];
  subSitemapTemplate?: string;
}

/**
 * Site configurations. Maps site identifiers to their sitemap structures.
 *
 * Anthropic: single sitemap, filter by path prefixes (/news/, /research/, etc.)
 * OpenAI: sitemap index with named sub-sitemaps.
 *
 * NOTE on body extraction: OpenAI sits behind Cloudflare WAF, which returns
 * HTTP 403 for requests from datacenter IPs (e.g. CI runners). We still
 * *attempt* to fetch article bodies — when reachable the body is extracted;
 * when blocked, fetchSiteContent degrades to metadata-only items instead of
 * dropping articles entirely.
 */
const SITE_CONFIGS: Record<"anthropic" | "openai", SiteConfig> = {
  anthropic: {
    name: "Anthropic (Claude)",
    sitemapUrl: "https://www.anthropic.com/sitemap.xml",
    prefixes: ["/news/", "/research/", "/engineering/", "/learn/"],
  },
  openai: {
    name: "OpenAI",
    sitemapUrl: "https://openai.com/sitemap.xml",
    subSitemapNames: [
      "research",
      "publication",
      "release",
      "company",
      "engineering",
      "milestone",
      "learn-guides",
      "safety",
      "product",
    ],
    subSitemapTemplate: "https://openai.com/sitemap.xml/{name}/",
  },
};

/** Max articles to fetch full content for on the very first run (per site). */
const MAX_CONTENT_FETCH_FIRST_RUN = 25;

/** Characters of page text forwarded to the LLM per article. */
const MAX_CONTENT_LENGTH = 1_500;

/** Polite delay between individual page GETs (ms). */
const FETCH_DELAY_MS = 300;

/** Per-request timeout (ms). */
const FETCH_TIMEOUT_MS = 10_000;

// ---------------------------------------------------------------------------
// HTTP helpers
// ---------------------------------------------------------------------------

/** Headers for web scraping — identifies the bot and requests HTML/XML. */
const WEB_HEADERS = {
  "User-Agent": "Mozilla/5.0 (compatible; agents-radar/1.0; +https://github.com/search?q=agents-radar)",
  Accept: "text/html,application/xml,text/xml,*/*",
  "Accept-Language": "en-US,en;q=0.9",
};

/**
 * HTTP GET with timeout.
 *
 * HOW IT WORKS:
 * - AbortController lets us cancel the request after FETCH_TIMEOUT_MS.
 * - `controller.abort()` is called by the timer to cancel the request.
 * - `clearTimeout(timer)` in the `finally` block prevents memory leaks.
 *
 * @param url - URL to fetch
 * @returns The response body as text
 */
async function httpGet(url: string): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const resp = await fetch(url, { headers: WEB_HEADERS, signal: controller.signal });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    return await resp.text();
  } finally {
    clearTimeout(timer);
  }
}

// ---------------------------------------------------------------------------
// Sitemap parsing (plain-text XML; no DOM needed)
// ---------------------------------------------------------------------------

/**
 * Parse a sitemap XML string and extract URL entries.
 *
 * HOW IT WORKS (REGEX EXPLANATION):
 * - `/<url>[\s\S]*?<\/url>/g` — matches each <url>...</url> block.
 *   [\s\S]*? means "any character including newlines, non-greedy".
 * - `/<loc>\s*(.*?)\s*<\/loc>/` — extracts the URL from <loc>...</loc>.
 *   (.*?) is a capture group matching any characters (non-greedy).
 * - `/<lastmod>\s*(.*?)\s*<\/lastmod>/` — extracts the lastmod date.
 *
 * @param xml - The sitemap XML string
 * @returns Array of { loc, lastmod? } objects
 */
export function parseSitemapUrls(xml: string): Array<{ loc: string; lastmod?: string }> {
  const results: Array<{ loc: string; lastmod?: string }> = [];
  for (const block of xml.match(/<url>[\s\S]*?<\/url>/g) ?? []) {
    const loc = block.match(/<loc>\s*(.*?)\s*<\/loc>/)?.[1];
    const lastmod = block.match(/<lastmod>\s*(.*?)\s*<\/lastmod>/)?.[1];
    if (loc) results.push({ loc, lastmod });
  }
  return results;
}

/**
 * Check if a sitemap XML is a sitemap index (contains <sitemapindex>).
 */
export function isSitemapIndex(xml: string): boolean {
  return /<sitemapindex[\s>]/.test(xml);
}

// ---------------------------------------------------------------------------
// HTML content extraction
// ---------------------------------------------------------------------------

/**
 * Extract the page title from HTML.
 * Prefers OpenGraph title (og:title meta tag) for cleaner strings.
 *
 * REGEX EXPLANATION:
 * - `<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']{1,200})["']` — matches
 *   <meta property="og:title" content="..."> and captures the content value.
 * - `{1,200}` limits capture to 200 chars to prevent matching across tags.
 * - `?.[1]` — optional chaining to get the first capture group, or undefined if no match.
 */
export function extractTitle(html: string): string {
  return (
    html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']{1,200})["']/i)?.[1] ??
    html.match(/<meta[^>]+content=["']([^"']{1,200})["'][^>]+property=["']og:title["']/i)?.[1] ??
    html.match(/<title[^>]*>([^<]{1,200})<\/title>/i)?.[1] ??
    ""
  ).trim();
}

/**
 * Extract readable text from HTML.
 *
 * HOW IT WORKS:
 * 1. Prefer <main> or <article> content (avoids nav/footer boilerplate).
 * 2. Remove <script> and <style> tags.
 * 3. Strip all remaining HTML tags.
 * 4. Decode common HTML entities (&amp; → &, &lt; → <, etc.).
 * 5. Collapse whitespace and truncate to MAX_CONTENT_LENGTH.
 */
export function extractText(html: string): string {
  const source =
    html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)?.[1] ??
    html.match(/<article[^>]*>([\s\S]*?)<\/article>/i)?.[1] ??
    html;

  return source
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, " ")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_CONTENT_LENGTH);
}

/**
 * Extract the category from a URL's path.
 * Example: "https://anthropic.com/research/paper-123" → "research"
 */
export function urlCategory(url: string): string {
  try {
    return new URL(url).pathname.split("/").filter(Boolean)[0] ?? "article";
  } catch {
    return "article";
  }
}

/**
 * Derive a human-readable title from the last URL path segment.
 * Example: "https://openai.com/research/gpt-5-release" → "Gpt 5 Release"
 */
export function titleFromUrl(url: string): string {
  try {
    const slug = new URL(url).pathname.split("/").filter(Boolean).pop() ?? "";
    return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  } catch {
    return url;
  }
}

// ---------------------------------------------------------------------------
// Page fetch + item builders
// ---------------------------------------------------------------------------

/**
 * Fetch a single article page and extract its title + body text.
 *
 * Throws if the page can't be fetched (HTTP error, timeout, network failure)
 * so the caller can fall back to a metadata-only item instead of dropping it.
 */
export async function fetchWebPageItem(
  site: "anthropic" | "openai",
  loc: string,
  lastmod?: string,
): Promise<WebPageItem> {
  const html = await httpGet(loc);
  return {
    url: loc,
    title: extractTitle(html) || titleFromUrl(loc),
    lastmod: lastmod ?? "",
    content: extractText(html),
    site,
    category: urlCategory(loc),
  };
}

/** Build a metadata-only item (no body text) from a sitemap URL. */
function metadataOnlyItem(site: "anthropic" | "openai", loc: string, lastmod?: string): WebPageItem {
  return {
    url: loc,
    title: titleFromUrl(loc),
    lastmod: lastmod ?? "",
    content: "",
    site,
    category: urlCategory(loc),
  };
}

// ---------------------------------------------------------------------------
// URL discovery
// ---------------------------------------------------------------------------

/**
 * Discover URLs from a site's sitemap(s).
 *
 * TWO MODES:
 * 1. Sitemap index (subSitemapNames): fetch each named sub-sitemap and combine results.
 * 2. Single sitemap: fetch once and filter by path prefixes.
 */
async function discoverUrls(site: "anthropic" | "openai"): Promise<Array<{ loc: string; lastmod?: string }>> {
  const cfg = SITE_CONFIGS[site];
  const results: Array<{ loc: string; lastmod?: string }> = [];

  if (cfg.subSitemapNames && cfg.subSitemapTemplate) {
    // Sitemap index: fetch each named sub-sitemap
    for (const name of cfg.subSitemapNames) {
      const subUrl = cfg.subSitemapTemplate.replace("{name}", name);
      try {
        const xml = await httpGet(subUrl);
        results.push(...parseSitemapUrls(xml));
        await sleep(100); // polite delay between sub-sitemaps
      } catch (err) {
        console.error(`  [web/${site}] sub-sitemap "${name}" failed: ${err}`);
      }
    }
  } else {
    // Single sitemap: fetch and filter by prefixes
    const xml = await httpGet(cfg.sitemapUrl);
    const all = isSitemapIndex(xml)
      ? [] // unexpected; skip rather than recurse
      : parseSitemapUrls(xml);

    const prefixes = cfg.prefixes ?? [];
    results.push(
      ...all.filter(({ loc }) => {
        try {
          return prefixes.some((p) => new URL(loc).pathname.startsWith(p));
        } catch {
          return false;
        }
      }),
    );
  }

  return results;
}

// ---------------------------------------------------------------------------
// State persistence
// ---------------------------------------------------------------------------

/** Path to the web state file. Committed to git on every run. */
const STATE_FILE = path.join("digests", "web-state.json");

/** Create an empty state (used when no state file exists). */
export function emptyState(): WebState {
  return {
    anthropic: { lastChecked: "", seenUrls: {} },
    openai: { lastChecked: "", seenUrls: {} },
  };
}

/** Load web state from disk. Returns empty state if file doesn't exist or is invalid. */
export function loadWebState(): WebState {
  try {
    return JSON.parse(fs.readFileSync(STATE_FILE, "utf-8")) as WebState;
  } catch {
    return emptyState();
  }
}

/** Save web state to disk. */
export function saveWebState(state: WebState): void {
  fs.mkdirSync(path.dirname(STATE_FILE), { recursive: true });
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), "utf-8");
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

/**
 * Fetch new content from a site.
 *
 * HOW IT WORKS:
 * 1. Discover all URLs from the sitemap(s).
 * 2. Sort by lastmod descending (newest first).
 * 3. Compare with seen URLs to find new/updated ones.
 * 4. On first run: fetch content for up to MAX_CONTENT_FETCH_FIRST_RUN articles.
 *    On subsequent runs: fetch all new articles.
 * 5. Attempt full page fetch for every item; on failure fall back to
 *    metadata-only. After the first failure in a run, skip remaining fetches
 *    (the host is blocking us, e.g. Cloudflare WAF).
 * 6. Mark ALL discovered URLs as seen (not just fetched ones).
 *
 * @param site - Site identifier ("anthropic" or "openai")
 * @param state - The web state (modified in-place)
 * @returns A WebFetchResult with the new items
 */
export async function fetchSiteContent(
  site: "anthropic" | "openai",
  state: WebState,
): Promise<WebFetchResult> {
  const cfg = SITE_CONFIGS[site];
  const siteState = state[site];
  const isFirstRun = Object.keys(siteState.seenUrls).length === 0;

  console.log(`  [web/${site}] Discovering URLs from sitemap...`);
  const allDiscovered = await discoverUrls(site);
  console.log(`  [web/${site}] Discovered ${allDiscovered.length} URLs`);

  // Sort newest first
  allDiscovered.sort((a, b) => {
    if (!a.lastmod && !b.lastmod) return 0;
    if (!a.lastmod) return 1;
    if (!b.lastmod) return -1;
    return b.lastmod.localeCompare(a.lastmod);
  });

  // Find new URLs: not seen before, OR lastmod is newer (re-fetch updated content)
  const newUrls = allDiscovered.filter(({ loc, lastmod }) => {
    const prev = siteState.seenUrls[loc];
    if (!prev) return true;
    if (lastmod && lastmod > prev) return true;
    return false;
  });

  // Cap content fetches on first run
  const toFetch = isFirstRun ? newUrls.slice(0, MAX_CONTENT_FETCH_FIRST_RUN) : newUrls;

  console.log(
    `  [web/${site}] ${isFirstRun ? "First run" : "Incremental"}: ` +
      `${newUrls.length} new URLs, fetching content for ${toFetch.length}`,
  );

  // Build items — attempt a full page fetch for every item. On failure (e.g.
  // Cloudflare WAF 403), fall back to a metadata-only item and short-circuit
  // the rest of this site's fetches so we don't hammer the host with timeouts.
  const items: WebPageItem[] = [];
  let siteBlocked = false;
  for (const { loc, lastmod } of toFetch) {
    if (siteBlocked) {
      items.push(metadataOnlyItem(site, loc, lastmod));
      continue;
    }
    try {
      items.push(await fetchWebPageItem(site, loc, lastmod));
    } catch (err) {
      siteBlocked = true;
      console.error(
        `  [web/${site}] Body fetch failed for ${loc}: ${err}. ` +
          `Falling back to metadata-only for remaining ${site} items.`,
      );
      items.push(metadataOnlyItem(site, loc, lastmod));
    }
    await sleep(FETCH_DELAY_MS);
  }

  // Mark ALL discovered URLs as seen (not just fetched ones)
  for (const { loc, lastmod } of allDiscovered) {
    siteState.seenUrls[loc] = lastmod ?? "seen";
  }
  siteState.lastChecked = new Date().toISOString();

  return {
    site,
    siteName: cfg.name,
    isFirstRun,
    newItems: items,
    totalDiscovered: allDiscovered.length,
  };
}

// ── SUMMARY ──────────────────────────────────────────────────────────────────
// This module implements incremental web scraping with 3 key concepts:
// 1. Sitemap parsing (regex-based XML extraction)
// 2. State persistence (JSON file tracking seen URLs)
// 3. Content extraction (HTML → title + text, with graceful fallback to
//    metadata-only when a page can't be fetched)
//
// QUESTIONS:
// Q1: Why use regex for XML parsing instead of a proper XML parser?
//     (Answer: Sitemaps have a simple, predictable structure — regex is faster
//      and avoids adding a dependency for something this simple)
// Q2: Why mark ALL discovered URLs as seen, not just fetched ones?
//     (Answer: If we only marked fetched URLs, the next run would re-discover
//      all the unfetched URLs and treat them as "new" again)
// Q3: Why does OpenAI sometimes only have metadata?
//     (Answer: Cloudflare WAF returns HTTP 403 for datacenter IPs, so the
//      article-page fetch fails. fetchSiteContent catches the failure and
//      falls back to metadata-only items instead of dropping the article —
//      body extraction still runs whenever the host is reachable.)
// ─────────────────────────────────────────────────────────────────────────────
