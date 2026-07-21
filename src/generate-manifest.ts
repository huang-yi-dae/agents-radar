/**
 * Generates manifest.json (sidebar data for Web UI) and feed.xml (RSS 2.0 feed).
 *
 * Run with: pnpm manifest
 *
 * LEARNING NOTES:
 * - manifest.json: lists all dates and their available reports, used by index.html to build the sidebar.
 * - feed.xml: RSS 2.0 feed with the latest 30 reports, for RSS readers.
 * - Uses the `marked` library to convert Markdown → HTML for RSS content.
 *
 * KEY CONCEPTS:
 * - RSS 2.0: XML format for syndicating content. Each <item> has title, link, description, pubDate.
 * - CDATA sections: `<![CDATA[...]]>` — content that shouldn't be XML-parsed.
 * - RFC 822 date format: "Mon, 11 Mar 2026 00:00:00 +0000" — required by RSS.
 */

import fs from "fs";
import path from "path";
import { marked } from "marked";
import { REPORT_LABELS } from "./i18n.ts";

const DIGESTS_DIR = "digests";
const MANIFEST_PATH = "manifest.json";
const FEED_PATH = "feed.xml";
const SITE_URL = "https://huang-yi-dae.github.io/agents-radar";

/** Regex to match date directory names (YYYY-MM-DD). */
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/** All report file IDs to look for. Each corresponds to a filename like "{id}.md". */
const REPORT_FILES = [
  "ai-cli",
  "ai-cli-en",
  "ai-agents",
  "ai-agents-en",
  "ai-web",
  "ai-web-en",
  "ai-trending",
  "ai-trending-en",
  "ai-hn",
  "ai-hn-en",
  "ai-weekly",
  "ai-weekly-en",
  "ai-monthly",
  "ai-monthly-en",
] as const;

/** Maximum items in the RSS feed. */
const MAX_FEED_ITEMS = 30;

/** A date entry in the manifest. */
interface DateEntry {
  date: string;
  reports: string[];
}

/** The manifest.json structure. */
interface Manifest {
  generated: string;
  dates: DateEntry[];
}

/** Report content extracted for RSS. */
interface ReportContent {
  summary: string; // plain text summary (XML-escaped)
  fullHtml: string; // full HTML in CDATA
}

/** Day and month names for RFC 822 date formatting. */
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/**
 * Format a Date as RFC 822 (required by RSS 2.0).
 * Example: "Mon, 11 Mar 2026 00:00:00 +0000"
 */
export function toRfc822(date: Date): string {
  return (
    `${DAYS[date.getUTCDay()]}, ${String(date.getUTCDate()).padStart(2, "0")} ` +
    `${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()} ` +
    `${String(date.getUTCHours()).padStart(2, "0")}:${String(date.getUTCMinutes()).padStart(2, "0")}:${String(date.getUTCSeconds()).padStart(2, "0")} +0000`
  );
}

/**
 * Escape special XML characters.
 * Prevents XML injection and parsing errors.
 */
export function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/**
 * Read a report file and extract content for RSS.
 *
 * HOW IT WORKS:
 * 1. Read the Markdown file.
 * 2. Convert to HTML using `marked`.
 * 3. Extract plain text summary (strip HTML tags, truncate to 500 chars).
 * 4. Escape CDATA end markers to prevent injection.
 * 5. Return both plain text (for <description>) and full HTML (for <content:encoded>).
 */
async function getReportContent(date: string, report: string): Promise<ReportContent> {
  const filePath = path.join(DIGESTS_DIR, date, `${report}.md`);

  try {
    const markdown = fs.readFileSync(filePath, "utf-8");
    const html = await marked.parse(markdown, { async: false });

    const textOnly = html
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim();
    const summary = textOnly.length > 500 ? textOnly.slice(0, 500) + "..." : textOnly;

    // Escape CDATA end marker to prevent injection
    const safeHtml = html.replace(/]]>/g, "]]]]><![CDATA[");

    return {
      summary: escapeXml(summary),
      fullHtml: `<![CDATA[${safeHtml}]]>`,
    };
  } catch {
    const label = REPORT_LABELS[report] ?? report;
    const title = `${label} ${date}`;
    return {
      summary: escapeXml(title),
      fullHtml: `<![CDATA[${escapeXml(title)}]]>`,
    };
  }
}

async function main(): Promise<void> {
  // Build manifest from date directories
  const entries = fs
    .readdirSync(DIGESTS_DIR)
    .filter((name) => DATE_RE.test(name) && fs.statSync(path.join(DIGESTS_DIR, name)).isDirectory())
    .sort()
    .reverse()
    .map((date) => {
      const reports = REPORT_FILES.filter((r) => fs.existsSync(path.join(DIGESTS_DIR, date, `${r}.md`)));
      return { date, reports };
    })
    .filter((e) => e.reports.length > 0);

  const manifest: Manifest = {
    generated: new Date().toISOString(),
    dates: entries,
  };

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");
  console.log(`manifest.json updated: ${entries.length} dates`);

  // ── RSS Feed ──────────────────────────────────────────────────────────────

  // Collect up to MAX_FEED_ITEMS reports (newest first)
  const feedItems: Array<{ date: string; report: string }> = [];
  outer: for (const entry of entries) {
    for (const report of entry.reports) {
      feedItems.push({ date: entry.date, report });
      if (feedItems.length >= MAX_FEED_ITEMS) break outer;
    }
  }

  const buildDate = toRfc822(new Date());

  // Build RSS items
  const itemXmlChunks: string[] = [];
  for (const { date, report } of feedItems) {
    const label = REPORT_LABELS[report] ?? report;
    const title = `${label} ${date}`;
    const link = `${SITE_URL}/#${date}/${report}`;
    const parts = date.split("-").map(Number);
    const pubDate = toRfc822(new Date(Date.UTC(parts[0]!, parts[1]! - 1, parts[2]!)));
    const content = await getReportContent(date, report);
    itemXmlChunks.push(
      [
        "    <item>",
        `      <title>${escapeXml(title)}</title>`,
        `      <link>${escapeXml(link)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(link)}</guid>`,
        `      <pubDate>${pubDate}</pubDate>`,
        `      <description>${content.summary}</description>`,
        `      <content:encoded>${content.fullHtml}</content:encoded>`,
        "    </item>",
      ].join("\n"),
    );
  }
  const itemsXml = itemXmlChunks.join("\n");

  // Assemble the full RSS feed
  const feedXml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">\n` +
    `  <channel>\n` +
    `    <title>agents-radar</title>\n` +
    `    <link>${SITE_URL}</link>\n` +
    `    <description>AI 开源生态每日简报 · Daily AI ecosystem digest</description>\n` +
    `    <language>zh-CN</language>\n` +
    `    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>\n` +
    `    <lastBuildDate>${buildDate}</lastBuildDate>\n` +
    itemsXml +
    `\n  </channel>\n` +
    `</rss>\n`;

  fs.writeFileSync(FEED_PATH, feedXml);
  console.log(`feed.xml updated: ${feedItems.length} items`);
}

// Run only when executed directly (not imported for testing)
const isDirectRun =
  process.argv[1] &&
  (process.argv[1].endsWith("generate-manifest.ts") || process.argv[1].endsWith("generate-manifest.js"));
if (isDirectRun) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

// ── SUMMARY ──────────────────────────────────────────────────────────────────
// Generates two output files:
// 1. manifest.json — sidebar data for the Web UI (dates + report IDs)
// 2. feed.xml — RSS 2.0 feed with the latest 30 reports
//
// Key patterns:
// - Markdown → HTML conversion with `marked` library
// - CDATA sections for safe HTML embedding in XML
// - RFC 822 date formatting for RSS compatibility
//
// QUESTIONS:
// Q1: Why use CDATA instead of escaping HTML entities?
//     (Answer: CDATA preserves the HTML as-is without needing to escape every < and &.
//      The content:encoded element expects raw HTML, not escaped text.)
// Q2: What does the `isDirectRun` check do?
//     (Answer: Prevents the main() function from running when this file is imported
//      as a module (e.g. by tests). Only runs when executed directly.)
// ─────────────────────────────────────────────────────────────────────────────
