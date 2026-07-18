/**
 * Report saver functions — LLM call + file save + optional GitHub issue.
 * Extracted from index.ts for separation of concerns.
 *
 * LEARNING NOTES:
 * - Each saver function encapsulates the full workflow for one report type:
 *   1. Check if there's data to report
 *   2. Call the LLM to generate the summary
 *   3. Build the final Markdown document
 *   4. Save to a file
 *   5. Optionally create a GitHub Issue
 * - This is the "Command" pattern — each function is a self-contained operation.
 * - The `lang` parameter makes each saver bilingual — called once for ZH, once for EN.
 */

import { type Lang, WEB_REPORT, TRENDING_REPORT, HN_REPORT, ISSUE_LABELS } from "./i18n.ts";
import { buildWebReportPrompt, buildHnPrompt } from "./prompts-data.ts";
import { callLlm, saveFile, LLM_TOKENS_WEB } from "./report.ts";
import { createGitHubIssue } from "./github.ts";
import { saveWebState, type WebFetchResult, type WebState } from "./web.ts";
import type { HnData } from "./hn.ts";
import type { TrendingData } from "./trending.ts";

// ---------------------------------------------------------------------------
// Web report
// ---------------------------------------------------------------------------

/**
 * Generate and save the web content report.
 *
 * HOW IT WORKS:
 * 1. Check if any site has new content (skip if not).
 * 2. Call LLM with the web report prompt.
 * 3. Build the Markdown document with title, metadata, sources, and LLM summary.
 * 4. Save to digests/YYYY-MM-DD/ai-web.md (or ai-web-en.md).
 * 5. If DIGEST_REPO is set, create a GitHub Issue.
 * 6. For ZH runs only: save the web state (so EN doesn't double-save).
 *
 * @param webResults - Array of WebFetchResult (one per site)
 * @param webState - The web state object (modified in-place, saved on ZH run)
 * @param utcStr - UTC timestamp
 * @param dateStr - Date string
 * @param digestRepo - GitHub repo slug (empty string = skip Issue creation)
 * @param footer - Auto-generated footer
 * @param lang - Language
 */
export async function saveWebReport(
  webResults: WebFetchResult[],
  webState: WebState,
  utcStr: string,
  dateStr: string,
  digestRepo: string,
  footer: string,
  lang: Lang = "zh",
): Promise<void> {
  const hasNewContent = webResults.some((r) => r.newItems.length > 0);

  if (hasNewContent) {
    console.log(`  [web/${lang}] Calling LLM for web content report...`);
    try {
      const webSummary = await callLlm(buildWebReportPrompt(webResults, dateStr, lang), LLM_TOKENS_WEB);
      const isFirstRun = webResults.some((r) => r.isFirstRun);
      const totalNew = webResults.reduce((sum, r) => sum + r.newItems.length, 0);

      const anthropicNew = webResults.find((r) => r.site === "anthropic")?.newItems.length ?? 0;
      const anthropicTotal = webResults.find((r) => r.site === "anthropic")?.totalDiscovered ?? 0;
      const openaiNew = webResults.find((r) => r.site === "openai")?.newItems.length ?? 0;
      const openaiTotal = webResults.find((r) => r.site === "openai")?.totalDiscovered ?? 0;

      const fileName = lang === "en" ? "ai-web-en.md" : "ai-web.md";
      const mode = isFirstRun ? WEB_REPORT.firstCrawl[lang] : WEB_REPORT.todayUpdate[lang];

      const webTitle = `# ${WEB_REPORT.title[lang]} ${dateStr}\n\n`;
      const webMeta = `> ${mode} | ${WEB_REPORT.newContent(totalNew, lang)} | ${WEB_REPORT.generated(utcStr, lang)}\n\n`;
      const webSources =
        lang === "en"
          ? `${WEB_REPORT.sourcesHeader[lang]}\n` +
            `- Anthropic: [anthropic.com](https://www.anthropic.com) — ${anthropicNew} new articles (sitemap total: ${anthropicTotal})\n` +
            `- OpenAI: [openai.com](https://openai.com) — ${openaiNew} new articles (sitemap total: ${openaiTotal})\n\n`
          : `${WEB_REPORT.sourcesHeader[lang]}\n` +
            `- Anthropic: [anthropic.com](https://www.anthropic.com) — 新增 ${anthropicNew} 篇（sitemap 共 ${anthropicTotal} 条）\n` +
            `- OpenAI: [openai.com](https://openai.com) — 新增 ${openaiNew} 篇（sitemap 共 ${openaiTotal} 条）\n\n`;

      const webContent = webTitle + webMeta + webSources + `---\n\n` + webSummary + footer;

      console.log(`  Saved ${saveFile(webContent, dateStr, fileName)}`);

      if (digestRepo) {
        const issueTitle = WEB_REPORT.issueTitle(dateStr, isFirstRun, lang);
        const webLabel = ISSUE_LABELS.web[lang];
        const webUrl = await createGitHubIssue(issueTitle, webContent, webLabel);
        console.log(`  Created web issue (${lang}): ${webUrl}`);
      }
    } catch (err) {
      console.error(`  [web/${lang}] Report generation failed: ${err}`);
    }
  } else {
    console.log(`  [web/${lang}] No new content detected, skipping report.`);
  }

  // Save state only on ZH run to avoid double-save (ZH runs first)
  if (lang === "zh") {
    saveWebState(webState);
    console.log("  [web] State saved.");
  }
}

// ---------------------------------------------------------------------------
// Trending report
// ---------------------------------------------------------------------------

/**
 * Generate and save the GitHub Trending report.
 *
 * HOW IT WORKS:
 * - The trending summary is already generated in index.ts (Phase 2).
 * - This function just wraps it with a header and saves it.
 * - Unlike web/HN, the LLM call happens in index.ts's generateSummaries(),
 *   not here. This function is a "save only" operation.
 */
export async function saveTrendingReport(
  trendingData: TrendingData,
  trendingSummary: string,
  utcStr: string,
  dateStr: string,
  digestRepo: string,
  footer: string,
  lang: Lang = "zh",
): Promise<void> {
  const hasData = trendingData.trendingRepos.length > 0 || trendingData.searchRepos.length > 0;
  if (!hasData) {
    console.log(`  [trending/${lang}] No data available, skipping report.`);
    return;
  }

  const fileName = lang === "en" ? "ai-trending-en.md" : "ai-trending.md";
  const header =
    `# ${TRENDING_REPORT.title[lang]} ${dateStr}\n\n` +
    `> ${TRENDING_REPORT.sources[lang]} | ${lang === "en" ? "Generated" : "生成时间"}: ${utcStr} UTC\n\n---\n\n`;

  const trendingContent = header + trendingSummary + footer;

  console.log(`  Saved ${saveFile(trendingContent, dateStr, fileName)}`);

  if (digestRepo) {
    const trendingTitle = TRENDING_REPORT.issueTitle(dateStr, lang);
    const trendingLabel = ISSUE_LABELS.trending[lang];
    const trendingUrl = await createGitHubIssue(trendingTitle, trendingContent, trendingLabel);
    console.log(`  Created trending issue (${lang}): ${trendingUrl}`);
  }
}

// ---------------------------------------------------------------------------
// Hacker News report
// ---------------------------------------------------------------------------

/**
 * Generate and save the Hacker News report.
 *
 * HOW IT WORKS:
 * 1. Check if HN data was fetched successfully.
 * 2. Call LLM with the HN prompt (uses default 4096 tokens).
 * 3. Build the Markdown document.
 * 4. Save to file and optionally create a GitHub Issue.
 */
export async function saveHnReport(
  hnData: HnData,
  utcStr: string,
  dateStr: string,
  digestRepo: string,
  footer: string,
  lang: Lang = "zh",
): Promise<void> {
  if (!hnData.fetchSuccess) {
    console.log(`  [hn/${lang}] No data available, skipping report.`);
    return;
  }

  console.log(`  [hn/${lang}] Calling LLM for HN report...`);
  try {
    const hnSummary = await callLlm(buildHnPrompt(hnData, dateStr, lang));
    const fileName = lang === "en" ? "ai-hn-en.md" : "ai-hn.md";
    const header =
      lang === "en"
        ? `# ${HN_REPORT.title[lang]} ${dateStr}\n\n` +
          `> Source: [Hacker News](https://news.ycombinator.com/) | ` +
          `${hnData.stories.length} stories | Generated: ${utcStr} UTC\n\n` +
          `---\n\n`
        : `# ${HN_REPORT.title[lang]} ${dateStr}\n\n` +
          `> 数据来源: [Hacker News](https://news.ycombinator.com/) | ` +
          `共 ${hnData.stories.length} 条 | 生成时间: ${utcStr} UTC\n\n` +
          `---\n\n`;

    const hnContent = header + hnSummary + footer;

    console.log(`  Saved ${saveFile(hnContent, dateStr, fileName)}`);

    if (digestRepo) {
      const hnTitle = HN_REPORT.issueTitle(dateStr, lang);
      const hnLabel = ISSUE_LABELS.hn[lang];
      const hnUrl = await createGitHubIssue(hnTitle, hnContent, hnLabel);
      console.log(`  Created HN issue (${lang}): ${hnUrl}`);
    }
  } catch (err) {
    console.error(`  [hn/${lang}] Report generation failed: ${err}`);
  }
}

// ── SUMMARY ──────────────────────────────────────────────────────────────────
// Three saver functions, each following the same pattern:
// 1. Check if data exists → skip if not
// 2. Call LLM (web, HN) or use pre-generated summary (trending)
// 3. Build Markdown with header + summary + footer
// 4. Save to file
// 5. Optionally create GitHub Issue
//
// Note: Web state is saved only on ZH run to avoid race conditions.
//
// QUESTIONS:
// Q1: Why does saveWebReport check `lang === "zh"` for state saving?
//     (Answer: Both ZH and EN runs process the same web data. Saving state on
//      both runs would be redundant. Since ZH runs first, it saves the state.)
// Q2: Why is the trending LLM call in index.ts, not in saveTrendingReport?
//     (Answer: The trending summary is needed by generateSummaries() which runs
//      in parallel with other summaries — the saver just wraps and saves it)
// ─────────────────────────────────────────────────────────────────────────────
