/**
 * GitHub trending and AI topic search data fetching.
 *
 * LEARNING NOTES:
 * - Two data sources fetched in parallel:
 *   1. GitHub Trending page (HTML scraping) — today's hottest repos by new stars
 *   2. GitHub Search API — repos matching AI topic tags, active in last 7 days
 * - HTML scraping uses regex to extract data from the page structure.
 * - The Search API runs 6 parallel queries and deduplicates results.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** A repo from the GitHub Trending page. */
export interface TrendingRepo {
  fullName: string;
  description: string;
  language: string;
  todayStars: number;
  totalStars: number;
  forks: number;
  url: string;
}

/** A repo from the GitHub Search API. */
export interface SearchRepo {
  fullName: string;
  description: string | null;
  language: string | null;
  stargazersCount: number;
  pushedAt: string;
  url: string;
  searchQuery: string; // which topic query found this repo
}

/** Combined trending data from both sources. */
export interface TrendingData {
  trendingRepos: TrendingRepo[];
  searchRepos: SearchRepo[];
  trendingFetchSuccess: boolean;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** AI topic queries for the GitHub Search API. */
const SEARCH_QUERIES = [
  { q: "topic:llm", label: "llm" },
  { q: "topic:ai-agent", label: "ai-agent" },
  { q: "topic:rag", label: "rag" },
  { q: "topic:vector-database", label: "vector-db" },
  { q: "topic:large-language-model", label: "llm-model" },
  { q: "topic:machine-learning", label: "ml" },
];

// ---------------------------------------------------------------------------
// GitHub Trending HTML fetch
// ---------------------------------------------------------------------------

/**
 * Fetch and parse the GitHub Trending page.
 *
 * HOW IT WORKS:
 * 1. GET github.com/trending?since=daily — returns HTML.
 * 2. Split HTML by <article class="Box-row"> blocks — each block is one repo.
 * 3. For each block, extract: fullName, description, language, todayStars, totalStars, forks.
 * 4. Return { repos, success } — success=false if parsing fails or 0 repos found.
 *
 * REGEX PATTERNS:
 * - `<h2[^>]*>[\s\S]*?<a[^>]+href="\/([^/"]+\/[^/"]+)"` — extracts owner/repo from <h2><a href="/owner/repo">
 * - `<p[^>]*class="[^"]*col-9[^"]*"[^>]*>([\s\S]*?)<\/p>` — extracts description
 * - `([\d,]+)\s+stars?\s+today` — extracts today's star count
 */
async function fetchGitHubTrending(): Promise<{ repos: TrendingRepo[]; success: boolean }> {
  try {
    const resp = await fetch("https://github.com/trending?since=daily&spoken_language_code=", {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; agents-radar/1.0)",
        Accept: "text/html",
      },
    });
    if (!resp.ok) {
      console.error(`  [trending] HTTP ${resp.status} fetching github.com/trending`);
      return { repos: [], success: false };
    }

    const html = await resp.text();
    const repos: TrendingRepo[] = [];

    const articlePattern =
      /<article[^>]*class="[^"]*Box-row[^"]*"[\s\S]*?(?=<article[^>]*class="[^"]*Box-row[^"]*"|$)/g;
    const blocks = html.match(articlePattern) ?? [];

    for (const block of blocks) {
      try {
        const nameMatch = block.match(/<h2[^>]*>[\s\S]*?<a[^>]+href="\/([^/"]+\/[^/"]+)"/);
        if (!nameMatch?.[1]) continue;
        const fullName = nameMatch[1].trim();

        const descMatch = block.match(/<p[^>]*class="[^"]*col-9[^"]*"[^>]*>([\s\S]*?)<\/p>/);
        const description = descMatch?.[1] ? descMatch[1].replace(/<[^>]+>/g, "").trim() : "";

        const langMatch = block.match(/<span[^>]+itemprop="programmingLanguage"[^>]*>([\s\S]*?)<\/span>/);
        const language = langMatch?.[1] ? langMatch[1].replace(/<[^>]+>/g, "").trim() : "";

        const todayMatch = block.match(/([\d,]+)\s+stars?\s+today/i);
        const todayStars = todayMatch?.[1] ? parseInt(todayMatch[1].replace(/,/g, ""), 10) : 0;

        const totalMatch = block.match(/href="\/[^"]+\/stargazers"[^>]*>\s*<[^>]+>\s*([\d,]+)/);
        const totalStars = totalMatch?.[1] ? parseInt(totalMatch[1].replace(/,/g, ""), 10) : 0;

        const forkMatch = block.match(/href="\/[^"]+\/forks"[^>]*>\s*<[^>]+>\s*([\d,]+)/);
        const forks = forkMatch?.[1] ? parseInt(forkMatch[1].replace(/,/g, ""), 10) : 0;

        repos.push({
          fullName,
          description,
          language,
          todayStars,
          totalStars,
          forks,
          url: `https://github.com/${fullName}`,
        });
      } catch {
        // single block parse failure is non-fatal
      }
    }

    if (repos.length === 0) {
      console.error("  [trending] Parsed 0 repos — HTML structure may have changed");
      return { repos: [], success: false };
    }

    console.log(`  [trending] Parsed ${repos.length} trending repos from HTML`);
    return { repos, success: true };
  } catch (err) {
    console.error(`  [trending] Fetch failed: ${err}`);
    return { repos: [], success: false };
  }
}

// ---------------------------------------------------------------------------
// GitHub Search API
// ---------------------------------------------------------------------------

/** GitHub Search API response shape. */
interface SearchApiItem {
  full_name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  html_url: string;
}

interface SearchApiResponse {
  items: SearchApiItem[];
}

/**
 * Search GitHub for AI-related repos using topic tags.
 *
 * HOW IT WORKS:
 * 1. For each of the 6 SEARCH_QUERIES, make a parallel API call.
 * 2. Each query searches for repos with a specific topic tag, pushed in the last 7 days.
 * 3. Results are deduplicated by full_name (a repo can match multiple topics).
 * 4. The `seen` Set tracks which repos have already been added.
 */
async function searchAiRepos(sevenDaysAgo: string): Promise<SearchRepo[]> {
  const token = process.env["GITHUB_TOKEN"] ?? "";
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const seen = new Set<string>();
  const all: SearchRepo[] = [];

  await Promise.all(
    SEARCH_QUERIES.map(async ({ q, label }) => {
      try {
        const query = `${q}+pushed:>${sevenDaysAgo}&sort=stars&order=desc`;
        const url = `https://api.github.com/search/repositories?q=${query}&per_page=15`;
        const resp = await fetch(url, { headers });
        if (!resp.ok) {
          console.error(`  [trending/search] "${label}": HTTP ${resp.status}`);
          return;
        }
        const data = (await resp.json()) as SearchApiResponse;
        let added = 0;
        for (const item of data.items ?? []) {
          if (!seen.has(item.full_name)) {
            seen.add(item.full_name);
            all.push({
              fullName: item.full_name,
              description: item.description,
              language: item.language,
              stargazersCount: item.stargazers_count,
              pushedAt: item.pushed_at,
              url: item.html_url,
              searchQuery: label,
            });
            added++;
          }
        }
        console.log(`  [trending/search] "${label}": ${added} new repos`);
      } catch (err) {
        console.error(`  [trending/search] "${label}": ${err}`);
      }
    }),
  );

  return all;
}

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

/**
 * Fetch all trending data — HTML scraping + Search API in parallel.
 *
 * @returns TrendingData with both sources combined
 */
export async function fetchTrendingData(): Promise<TrendingData> {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

  const [{ repos: trendingRepos, success }, searchRepos] = await Promise.all([
    fetchGitHubTrending(),
    searchAiRepos(sevenDaysAgo),
  ]);

  return { trendingRepos, searchRepos, trendingFetchSuccess: success };
}

// ── SUMMARY ──────────────────────────────────────────────────────────────────
// Two data sources fetched in parallel:
// 1. GitHub Trending HTML — parsed with regex, returns today's hot repos
// 2. GitHub Search API — 6 parallel queries for AI topic tags
//
// QUESTIONS:
// Q1: Why scrape HTML instead of using an API for trending?
//     (Answer: GitHub doesn't have an official API for trending — the HTML page
//      is the only reliable source)
// Q2: Why use a `seen` Set for deduplication in searchAiRepos?
//     (Answer: A repo can match multiple topic queries — the Set ensures
//      each repo appears only once in the results)
// ─────────────────────────────────────────────────────────────────────────────
