/**
 * Weekly and monthly rollup report generator.
 * Reads existing daily digest files — no GitHub API calls needed.
 *
 * LEARNING NOTES:
 * - Rollup reports aggregate daily digests into higher-level summaries.
 * - They read from the filesystem (digests/YYYY-MM-DD/*.md) instead of calling the GitHub API.
 * - Weekly reports use the last 7 daily digests.
 * - Monthly reports prefer weekly digests (if 2+ available), otherwise sample daily digests.
 */

import fs from "node:fs";
import path from "node:path";
import { callLlm, saveFile, autoGenFooter, LLM_TOKENS_ROLLUP } from "./report.ts";
import {
  buildWeeklyPrompt,
  buildMonthlyPrompt,
  buildHighlightsPrompt,
  type ReportHighlights,
} from "./prompts-data.ts";
import { createGitHubIssue } from "./github.ts";
import { toCstDateStr, toUtcStr } from "./date.ts";
import { type Lang, WEEKLY_REPORT, MONTHLY_REPORT } from "./i18n.ts";

/** Directory where digest files are stored. */
const DIGESTS_DIR = "digests";

/** Max characters per source report when building rollup inputs (prevents token overflow). */
const MAX_CHARS_PER_REPORT = 2500;

/** Source report types to read for rollups (in priority order). */
const ROLLUP_SOURCES = ["ai-cli", "ai-agents", "ai-trending", "ai-hn", "ai-web"];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Get all date directories in digests/, sorted newest first.
 *
 * HOW IT WORKS:
 * 1. Read all entries in the digests/ directory.
 * 2. Filter to entries matching the date pattern (YYYY-MM-DD).
 * 3. Filter to only directories (not files).
 * 4. Sort descending (newest first).
 */
function getDateDirs(): string[] {
  if (!fs.existsSync(DIGESTS_DIR)) return [];
  return fs
    .readdirSync(DIGESTS_DIR)
    .filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d) && fs.statSync(path.join(DIGESTS_DIR, d)).isDirectory())
    .sort()
    .reverse();
}

/**
 * Read and truncate all daily digest files for a date.
 *
 * HOW IT WORKS:
 * - For each source type (ai-cli, ai-agents, etc.), check if the file exists.
 * - Read the content and truncate to MAX_CHARS_PER_REPORT.
 * - Join all sources into a single string.
 * - Returns null if no files found for this date.
 */
function readDailyDigest(date: string): string | null {
  const parts: string[] = [];
  for (const type of ROLLUP_SOURCES) {
    const p = path.join(DIGESTS_DIR, date, `${type}.md`);
    if (fs.existsSync(p)) {
      const content = fs.readFileSync(p, "utf-8");
      const truncated = content.slice(0, MAX_CHARS_PER_REPORT);
      parts.push(truncated.length < content.length ? truncated + "\n...[摘要截断]" : truncated);
    }
  }
  return parts.length > 0 ? parts.join("\n\n") : null;
}

/**
 * Read a weekly report file. Returns null if not found.
 */
function readWeeklyDigest(date: string): string | null {
  const p = path.join(DIGESTS_DIR, date, "ai-weekly.md");
  if (!fs.existsSync(p)) return null;
  const content = fs.readFileSync(p, "utf-8");
  return content.slice(0, 3000) + (content.length > 3000 ? "\n...[截断]" : "");
}

/**
 * Format a date as ISO week string, e.g. "2026-W10".
 *
 * HOW IT WORKS (ISO WEEK CALCULATION):
 * 1. Create a UTC date (midnight).
 * 2. Adjust to the nearest Thursday (ISO weeks are defined by the Thursday).
 * 3. Calculate the week number from the year start.
 */
export function toWeekStr(date: Date): string {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}

// ---------------------------------------------------------------------------
// Highlights generation for rollup reports
// ---------------------------------------------------------------------------

/**
 * Generate highlights for a rollup report and merge with existing highlights.
 *
 * HOW IT WORKS:
 * 1. Load existing highlights.json (from daily digest) if it exists.
 * 2. Generate new highlights from the rollup report content.
 * 3. Merge new highlights into existing ones (Object.assign).
 * 4. Save the merged highlights back to highlights.json.
 */
async function generateRollupHighlights(
  zhContent: string,
  enContent: string,
  reportId: string,
  dateStr: string,
  itemsPerReport: number,
): Promise<void> {
  console.log(`  [${reportId}] Generating highlights for Telegram...`);

  const existingPath = path.join(DIGESTS_DIR, dateStr, "highlights.json");
  let existing: Record<Lang, ReportHighlights> = { zh: {}, en: {} };
  if (fs.existsSync(existingPath)) {
    try {
      existing = JSON.parse(fs.readFileSync(existingPath, "utf-8"));
    } catch {
      // ignore parse errors — start fresh
    }
  }

  const highlights: Record<Lang, ReportHighlights> = {
    zh: { ...existing.zh },
    en: { ...existing.en },
  };

  try {
    const [zhRaw, enRaw] = await Promise.all([
      callLlm(buildHighlightsPrompt({ [reportId]: zhContent }, "zh", itemsPerReport), 1024),
      callLlm(buildHighlightsPrompt({ [reportId]: enContent }, "en", itemsPerReport), 1024),
    ]);
    const zhNew = JSON.parse(
      zhRaw
        .replace(/```json?\n?/g, "")
        .replace(/```/g, "")
        .trim(),
    ) as ReportHighlights;
    const enNew = JSON.parse(
      enRaw
        .replace(/```json?\n?/g, "")
        .replace(/```/g, "")
        .trim(),
    ) as ReportHighlights;
    Object.assign(highlights.zh, zhNew);
    Object.assign(highlights.en, enNew);
  } catch (err) {
    console.error(`  [${reportId}] Highlights generation failed: ${err}`);
  }
  const p = saveFile(JSON.stringify(highlights, null, 2), dateStr, "highlights.json");
  console.log(`  Saved ${p}`);
}

// ---------------------------------------------------------------------------
// Weekly rollup
// ---------------------------------------------------------------------------

/**
 * Generate the weekly rollup report.
 *
 * HOW IT WORKS:
 * 1. Get the last 7 date directories.
 * 2. Read and concatenate daily digests for each date.
 * 3. Call LLM twice (ZH + EN in parallel) to generate weekly summaries.
 * 4. Save to digests/YYYY-MM-DD/ai-weekly.md and ai-weekly-en.md.
 * 5. Generate highlights for Telegram.
 * 6. Optionally create a GitHub Issue.
 */
export async function runWeeklyRollup(): Promise<void> {
  const now = new Date();
  const dateStr = toCstDateStr(now);
  const utcStr = toUtcStr(now);
  const weekStr = toWeekStr(new Date(now.getTime() + 8 * 60 * 60 * 1000));
  const digestRepo = process.env["DIGEST_REPO"] ?? "";

  console.log(`[weekly] Generating rollup for ${weekStr} (date: ${dateStr})`);

  const allDates = getDateDirs();
  const last7 = allDates.slice(0, 7);

  const dailyDigests: Record<string, string> = {};
  for (const date of last7) {
    const content = readDailyDigest(date);
    if (content) dailyDigests[date] = content;
  }

  if (Object.keys(dailyDigests).length === 0) {
    console.log("[weekly] No daily digests found, skipping.");
    return;
  }

  console.log(
    `[weekly] Found ${Object.keys(dailyDigests).length} daily digests: ${Object.keys(dailyDigests).join(", ")}`,
  );

  console.log("[weekly] Calling LLM for ZH and EN weekly reports in parallel...");
  const [zhSummary, enSummary] = await Promise.all([
    callLlm(buildWeeklyPrompt(dailyDigests, weekStr, "zh"), LLM_TOKENS_ROLLUP),
    callLlm(buildWeeklyPrompt(dailyDigests, weekStr, "en"), LLM_TOKENS_ROLLUP),
  ]);

  const footer = autoGenFooter("zh");
  const enFooter = autoGenFooter("en");

  const zhContent =
    `# ${WEEKLY_REPORT.title.zh} ${weekStr}\n\n` +
    `> ${WEEKLY_REPORT.coverage.zh}: ${last7[last7.length - 1]} ~ ${last7[0]} | 生成时间: ${utcStr} UTC\n\n` +
    `---\n\n` +
    zhSummary +
    footer;

  const enContent =
    `# ${WEEKLY_REPORT.title.en} ${weekStr}\n\n` +
    `> ${WEEKLY_REPORT.coverage.en}: ${last7[last7.length - 1]} ~ ${last7[0]} | Generated: ${utcStr} UTC\n\n` +
    `---\n\n` +
    enSummary +
    enFooter;

  console.log(`  Saved ${saveFile(zhContent, dateStr, "ai-weekly.md")}`);
  console.log(`  Saved ${saveFile(enContent, dateStr, "ai-weekly-en.md")}`);

  await generateRollupHighlights(zhContent, enContent, "ai-weekly", dateStr, 6);

  if (digestRepo) {
    const url = await createGitHubIssue(WEEKLY_REPORT.issueTitle(weekStr), zhContent, "weekly");
    console.log(`  Created weekly issue: ${url}`);
  }

  console.log("[weekly] Done!");
}

// ---------------------------------------------------------------------------
// Monthly rollup
// ---------------------------------------------------------------------------

/**
 * Generate the monthly rollup report.
 *
 * HOW IT WORKS:
 * 1. Determine the previous month (monthly reports are generated on the 1st).
 * 2. Find all date directories in that month.
 * 3. Prefer weekly digests if 2+ available; otherwise sample daily digests.
 * 4. Call LLM twice (ZH + EN) to generate monthly summaries.
 * 5. Save files and optionally create a GitHub Issue.
 */
export async function runMonthlyRollup(): Promise<void> {
  const now = new Date();
  const cstDate = new Date(now.getTime() + 8 * 60 * 60 * 1000);
  const prevMonth = new Date(Date.UTC(cstDate.getUTCFullYear(), cstDate.getUTCMonth() - 1, 1));
  const monthStr = prevMonth.toISOString().slice(0, 7); // "2026-02"
  const dateStr = toCstDateStr(now);
  const utcStr = toUtcStr(now);
  const digestRepo = process.env["DIGEST_REPO"] ?? "";

  console.log(`[monthly] Generating rollup for ${monthStr} (date: ${dateStr})`);

  const allDates = getDateDirs();

  const monthDates = allDates.filter((d) => d.startsWith(monthStr));
  const weeklyDates = monthDates.filter((d) => fs.existsSync(path.join(DIGESTS_DIR, d, "ai-weekly.md")));

  let sourceDigests: Record<string, string>;
  let sourceLabel: { zh: string; en: string };

  if (weeklyDates.length >= 2) {
    sourceLabel = { zh: `${weeklyDates.length} 份周报`, en: `${weeklyDates.length} weekly reports` };
    sourceDigests = {};
    for (const date of weeklyDates) {
      const content = readWeeklyDigest(date);
      if (content) sourceDigests[date] = content;
    }
  } else {
    const sampled = monthDates.filter((_, i) => i % 4 === 0).slice(0, 10);
    sourceLabel = {
      zh: `${sampled.length} 份日报（每4日采样）`,
      en: `${sampled.length} daily reports (sampled every 4 days)`,
    };
    sourceDigests = {};
    for (const date of sampled) {
      const content = readDailyDigest(date);
      if (content) sourceDigests[date] = content;
    }
  }

  if (Object.keys(sourceDigests).length === 0) {
    console.log(`[monthly] No source digests found for ${monthStr}, skipping.`);
    return;
  }

  console.log(`[monthly] Source: ${sourceLabel.zh}`);

  console.log("[monthly] Calling LLM for ZH and EN monthly reports in parallel...");
  const [zhSummary, enSummary] = await Promise.all([
    callLlm(buildMonthlyPrompt(sourceDigests, monthStr, "zh"), LLM_TOKENS_ROLLUP),
    callLlm(buildMonthlyPrompt(sourceDigests, monthStr, "en"), LLM_TOKENS_ROLLUP),
  ]);

  const footer = autoGenFooter("zh");
  const enFooter = autoGenFooter("en");

  const zhContent =
    `# ${MONTHLY_REPORT.title.zh} ${monthStr}\n\n` +
    `> 数据来源: ${sourceLabel.zh} | 生成时间: ${utcStr} UTC\n\n` +
    `---\n\n` +
    zhSummary +
    footer;

  const enContent =
    `# ${MONTHLY_REPORT.title.en} ${monthStr}\n\n` +
    `> Sources: ${sourceLabel.en} | Generated: ${utcStr} UTC\n\n` +
    `---\n\n` +
    enSummary +
    enFooter;

  console.log(`  Saved ${saveFile(zhContent, dateStr, "ai-monthly.md")}`);
  console.log(`  Saved ${saveFile(enContent, dateStr, "ai-monthly-en.md")}`);

  await generateRollupHighlights(zhContent, enContent, "ai-monthly", dateStr, 6);

  if (digestRepo) {
    const url = await createGitHubIssue(MONTHLY_REPORT.issueTitle(monthStr), zhContent, "monthly");
    console.log(`  Created monthly issue: ${url}`);
  }

  console.log("[monthly] Done!");
}

// ── SUMMARY ──────────────────────────────────────────────────────────────────
// Rollup reports aggregate daily digests into weekly/monthly summaries.
// Key patterns:
// 1. Read from filesystem (not GitHub API) — digests/YYYY-MM-DD/*.md
// 2. Truncate source content to prevent token overflow
// 3. Prefer weekly digests for monthly rollups (higher quality aggregation)
// 4. Sample daily digests when weekly aren't available (every 4th day, max 10)
//
// QUESTIONS:
// Q1: Why prefer weekly digests for monthly rollups?
//     (Answer: Weekly digests are already aggregated — they provide higher-quality
//      summaries than raw daily digests. Using them reduces LLM token usage.)
// Q2: Why sample every 4th day instead of using all daily digests?
//     (Answer: A month has ~30 daily digests — feeding all of them would exceed
//      token limits. Sampling reduces the input while preserving temporal coverage.)
// ─────────────────────────────────────────────────────────────────────────────
