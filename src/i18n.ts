/**
 * Centralized i18n strings for bilingual (zh/en) report generation.
 *
 * LEARNING NOTES:
 * - This module is the SINGLE SOURCE OF TRUTH for all user-facing text.
 * - Every bilingual string is a `Record<Lang, string>` — a TypeScript mapped type
 *   that maps "zh" and "en" keys to their respective translations.
 * - The `t()` helper function is a shorthand constructor for these maps.
 * - By centralizing strings here, we avoid scattered `lang === "en" ? ... : ...` ternaries
 *   throughout the codebase. If you need to change a label, you change it in ONE place.
 *
 * KEY CONCEPTS:
 * - `type Lang = "zh" | "en"`: a union type — Lang can ONLY be "zh" or "en".
 * - `Record<K, V>`: a TypeScript utility type that creates { [key: K]: V }.
 * - `as const`: makes the object deeply readonly and narrows literal types.
 *   Without it, `MSG.noActivity` would be typed as `Record<string, string>`.
 *   With it, TypeScript knows the exact keys ("zh" and "en").
 * - Functions as values: `CLI_REPORT.meta` is a function that returns a string.
 *   This allows dynamic content (e.g. inserting a date) while keeping the structure.
 */

// ---------------------------------------------------------------------------
// Language type — the foundation of all bilingual support
// ---------------------------------------------------------------------------

/**
 * Language code type. "zh" = Chinese, "en" = English.
 * Used as a key in Record<Lang, string> maps throughout the codebase.
 */
export type Lang = "zh" | "en";

/**
 * Helper to create a bilingual string map.
 *
 * HOW IT WORKS:
 * - Takes two strings (Chinese and English).
 * - Returns an object `{ zh: "中文", en: "English" }`.
 * - The return type is `Record<Lang, string>` — exactly the shape used everywhere.
 *
 * @param zh - Chinese translation
 * @param en - English translation
 * @returns A Record<Lang, string> object
 *
 * EXAMPLE: t("过去24小时无活动。", "No activity in the last 24 hours.")
 *   → { zh: "过去24小时无活动。", en: "No activity in the last 24 hours." }
 */
function t(zh: string, en: string): Record<Lang, string> {
  return { zh, en };
}

// ---------------------------------------------------------------------------
// Status & error messages (used in index.ts, rollup.ts)
// These are fallback messages shown when data is missing or LLM calls fail.
// ---------------------------------------------------------------------------

export const MSG = {
  /** Shown when a repo has no issues, PRs, or releases in the last 24 hours. */
  noActivity: t("过去24小时无活动。", "No activity in the last 24 hours."),
  /** Shown when an LLM summary call fails (network error, rate limit, etc.). */
  summaryFailed: t("⚠️ 摘要生成失败。", "⚠️ Summary generation failed."),
  /** Shown when the Claude Code Skills LLM summary fails. */
  skillsFailed: t("⚠️ Skills 摘要生成失败。", "⚠️ Skills summary generation failed."),
  /** Shown when GitHub Trending data can't be fetched at all. */
  trendingNoData: t(
    "⚠️ 今日趋势数据获取失败，无法生成报告。",
    "⚠️ Trending data unavailable, unable to generate report.",
  ),
  /** Shown when the trending LLM summary fails. */
  trendingFailed: t("⚠️ 趋势报告生成失败。", "⚠️ Trending report generation failed."),
} as const; // `as const` makes this deeply readonly and preserves literal types

// ---------------------------------------------------------------------------
// Report headers & labels (used in report-builders.ts, index.ts, rollup.ts)
// These are the section titles and metadata strings that appear in the Markdown reports.
// ---------------------------------------------------------------------------

/** Strings for the AI CLI Tools report. */
export const CLI_REPORT = {
  /** Main report title. */
  title: t("AI CLI 工具社区动态日报", "AI CLI Tools Community Digest"),
  /**
   * Metadata line below the title. This is a FUNCTION, not a string.
   * It takes dynamic values (utcStr, count) and returns a formatted string.
   *
   * @param utcStr - UTC timestamp string like "2026-03-11 00:00"
   * @param count - Number of CLI tools covered
   * @param lang - Language code
   * @returns A formatted metadata string
   */
  meta: (utcStr: string, count: number, lang: Lang) =>
    lang === "en"
      ? `> Generated: ${utcStr} UTC | Tools covered: ${count}\n\n`
      : `> 生成时间: ${utcStr} UTC | 覆盖工具: ${count} 个\n\n`,
  /** Section heading for Claude Code Skills highlights. */
  skillsHeading: t("Claude Code Skills 社区热点", "Claude Code Skills Highlights"),
  /** Label for the data source note. */
  skillsSource: t("数据来源", "Source"),
  /** Section heading for cross-tool comparison. */
  comparison: t("横向对比", "Cross-Tool Comparison"),
  /** Section heading for per-tool detailed reports. */
  detail: t("各工具详细报告", "Per-Tool Reports"),
} as const;

/** Strings for the OpenClaw Ecosystem report. */
export const OPENCLAW_REPORT = {
  title: t("OpenClaw 生态日报", "OpenClaw Ecosystem Digest"),
  deepDive: t("OpenClaw 项目深度报告", "OpenClaw Deep Dive"),
  comparison: t("横向生态对比", "Cross-Ecosystem Comparison"),
  peers: t("同赛道项目详细报告", "Peer Project Reports"),
} as const;

/** Strings for the web content report (Anthropic + OpenAI). */
export const WEB_REPORT = {
  title: t("AI 官方内容追踪报告", "Official AI Content Report"),
  firstCrawl: t("首次全量", "First full crawl"),
  todayUpdate: t("今日更新", "Today's update"),
  /** Dynamic function: formats the "N new articles" line. */
  newContent: (count: number, lang: Lang) =>
    lang === "en" ? `New content: ${count} articles` : `新增内容: ${count} 篇`,
  /** Dynamic function: formats the "Generated: ... UTC" line. */
  generated: (utcStr: string, lang: Lang) =>
    lang === "en" ? `Generated: ${utcStr} UTC` : `生成时间: ${utcStr} UTC`,
  sourcesHeader: t("数据来源:", "Sources:"),
  /** Dynamic function: formats the GitHub Issue title. */
  issueTitle: (dateStr: string, isFirstRun: boolean, lang: Lang) =>
    lang === "en"
      ? `🌐 Official AI Content Report ${dateStr}${isFirstRun ? " (First Crawl)" : ""}`
      : `🌐 AI 官方内容追踪报告 ${dateStr}${isFirstRun ? "（首次全量）" : ""}`,
} as const;

/** Strings for the GitHub Trending report. */
export const TRENDING_REPORT = {
  title: t("AI 开源趋势日报", "AI Open Source Trends"),
  sources: t("数据来源: GitHub Trending + GitHub Search API", "Sources: GitHub Trending + GitHub Search API"),
  issueTitle: (dateStr: string, lang: Lang) =>
    lang === "en" ? `📈 AI Open Source Trends ${dateStr}` : `📈 AI 开源趋势日报 ${dateStr}`,
} as const;

/** Strings for the Hacker News report. */
export const HN_REPORT = {
  title: t("Hacker News AI 社区动态日报", "Hacker News AI Community Digest"),
  issueTitle: (dateStr: string, lang: Lang) =>
    lang === "en" ? `📰 Hacker News AI Digest ${dateStr}` : `📰 Hacker News AI 社区动态日报 ${dateStr}`,
} as const;

/** Strings for the weekly rollup report. */
export const WEEKLY_REPORT = {
  title: t("AI 工具生态周报", "AI Tools Ecosystem Weekly Report"),
  coverage: t("覆盖日期", "Coverage"),
  issueTitle: (weekStr: string) => `📅 AI 工具生态周报 ${weekStr}`,
} as const;

/** Strings for the monthly rollup report. */
export const MONTHLY_REPORT = {
  title: t("AI 工具生态月报", "AI Tools Ecosystem Monthly Report"),
  issueTitle: (monthStr: string) => `📆 AI 工具生态月报 ${monthStr}`,
} as const;

// ---------------------------------------------------------------------------
// GitHub Issue labels — used when creating Issues on the digest repo
// ---------------------------------------------------------------------------

/**
 * Maps report types to their GitHub Issue label names.
 * The Chinese label is the primary label; English is for the EN variant.
 */
export const ISSUE_LABELS = {
  cli: t("digest", "digest-en"),
  openclaw: t("openclaw", "openclaw-en"),
  web: t("web", "web-en"),
  trending: t("trending", "trending-en"),
  hn: t("hn", "hn-en"),
} as const;

/** Dynamic function: formats the CLI Issue title. */
export const CLI_ISSUE_TITLE = (dateStr: string, lang: Lang) =>
  lang === "en" ? `📊 AI CLI Tools Digest ${dateStr}` : `📊 AI CLI 工具社区动态日报 ${dateStr}`;

/** Dynamic function: formats the OpenClaw Issue title. */
export const OPENCLAW_ISSUE_TITLE = (dateStr: string, lang: Lang) =>
  lang === "en" ? `🦞 OpenClaw Ecosystem Digest ${dateStr}` : `🦞 OpenClaw 生态日报 ${dateStr}`;

// ---------------------------------------------------------------------------
// Footer (used in report.ts)
// ---------------------------------------------------------------------------

/** The "auto-generated by agents-radar" footer text. */
export const FOOTER = {
  autoGen: t("本日报由", "This digest is auto-generated by"),
} as const;

// ---------------------------------------------------------------------------
// Report labels for manifest/RSS (used in generate-manifest.ts)
// These are display names for each report type, used in the Web UI sidebar and RSS feed.
// ---------------------------------------------------------------------------

/**
 * Maps report file IDs to their display names.
 * Keys like "ai-cli" correspond to filenames like "ai-cli.md".
 * Keys like "ai-cli-en" correspond to "ai-cli-en.md" (English variant).
 */
export const REPORT_LABELS: Record<string, string> = {
  "ai-cli": "AI CLI 工具社区动态日报",
  "ai-cli-en": "AI CLI Tools Digest",
  "ai-agents": "AI Agents 生态日报",
  "ai-agents-en": "AI Agents Ecosystem Digest",
  "ai-web": "AI 官方内容追踪报告",
  "ai-web-en": "Official AI Content Report",
  "ai-trending": "AI 开源趋势日报",
  "ai-trending-en": "AI Open Source Trends",
  "ai-hn": "Hacker News AI 社区动态日报",
  "ai-hn-en": "Hacker News AI Community Digest",
  "ai-weekly": "AI 工具生态周报",
  "ai-weekly-en": "AI Tools Weekly Digest",
  "ai-monthly": "AI 工具生态月报",
  "ai-monthly-en": "AI Tools Monthly Digest",
};

/**
 * Maps report IDs to bilingual display names for Telegram notifications.
 * Used in notify.ts to build the notification message.
 */
export const NOTIFY_LABELS: Record<string, Record<Lang, string>> = {
  "ai-cli": t("AI CLI 工具", "AI CLI Tools"),
  "ai-agents": t("AI Agents 生态", "AI Agents Ecosystem"),
  "ai-web": t("官网动态", "Official Updates"),
  "ai-trending": t("GitHub 趋势", "GitHub Trends"),
  "ai-hn": t("HN 社区动态", "HN Community"),
  "ai-weekly": t("AI 工具生态周报", "AI Tools Weekly"),
  "ai-monthly": t("AI 工具生态月报", "AI Tools Monthly"),
};

// ── SUMMARY ──────────────────────────────────────────────────────────────────
// This module is the i18n (internationalization) layer for the entire project.
// Key patterns:
// 1. `Lang` type — union type restricting values to "zh" | "en"
// 2. `t()` helper — shorthand for creating Record<Lang, string> objects
// 3. `as const` — makes objects deeply readonly with precise literal types
// 4. Dynamic functions — some labels are functions that accept parameters
//    (e.g. CLI_REPORT.meta takes utcStr, count, lang and returns a string)
// 5. Three categories of exports: messages (MSG), report labels (CLI_REPORT etc.),
//    and lookup maps (REPORT_LABELS, NOTIFY_LABELS)
//
// QUESTIONS TO TEST YOUR UNDERSTANDING:
// Q1: Why is `t()` a private function (not exported)?
//     (Answer: It's an internal helper — external code should use the exported constants)
// Q2: What's the difference between `MSG.noActivity` and `CLI_REPORT.meta`?
//     (Answer: MSG.noActivity is a static Record<Lang, string>;
//      CLI_REPORT.meta is a function that returns a string dynamically)
// Q3: Why does REPORT_LABELS use `Record<string, string>` instead of `Record<Lang, string>`?
//     (Answer: The keys are report IDs like "ai-cli", not language codes — it maps
//      report file names to display titles, not translations)
// ─────────────────────────────────────────────────────────────────────────────
