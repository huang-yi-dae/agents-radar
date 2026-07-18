/**
 * agents-radar: daily digest for AI CLI tools and OpenClaw.
 *
 * This is the MAIN ENTRY POINT — `pnpm start` runs this file.
 *
 * The pipeline runs in 4 sequential phases:
 *   Phase 1: Fetch all data in parallel (GitHub API, sitemaps, trending, HN)
 *   Phase 2: Generate per-repo LLM summaries in parallel (ZH + EN simultaneously)
 *   Phase 3: Generate cross-repo comparisons (ZH + EN in parallel)
 *   Phase 4: Build Markdown reports, save files, create GitHub Issues
 *
 * LEARNING NOTES:
 * - This file is the ORCHESTRATOR — it coordinates the entire pipeline.
 * - Each phase is an async function that returns data for the next phase.
 * - `Promise.all()` is used extensively to parallelize independent operations.
 * - The `main()` function is the top-level entry point, called at the bottom.
 *
 * ENV VARS:
 *   LLM_PROVIDER        - "anthropic" | "openai" | "github-copilot" | "openrouter" (default: anthropic)
 *   GITHUB_TOKEN        - GitHub token for API access and issue creation
 *   DIGEST_REPO         - owner/repo where digest issues are posted (optional)
 */

import fs from "node:fs";
import path from "node:path";
import {
  type GitHubItem,
  type RepoFetch,
  fetchRecentItems,
  fetchRecentReleases,
  fetchSkillsData,
  createGitHubIssue,
} from "./github.ts";
import {
  type RepoDigest,
  buildCliPrompt,
  buildPeerPrompt,
  buildComparisonPrompt,
  buildPeersComparisonPrompt,
  buildSkillsPrompt,
} from "./prompts.ts";
import { buildTrendingPrompt, buildHighlightsPrompt, type ReportHighlights } from "./prompts-data.ts";
import { callLlm, saveFile, autoGenFooter, LLM_TOKENS_TRENDING } from "./report.ts";
import { buildCliReportContent, buildOpenclawReportContent } from "./report-builders.ts";
import { saveWebReport, saveTrendingReport, saveHnReport } from "./report-savers.ts";
import { loadWebState, fetchSiteContent, type WebFetchResult, type WebState } from "./web.ts";
import { fetchTrendingData, type TrendingData } from "./trending.ts";
import { fetchHnData, type HnData } from "./hn.ts";
import { loadConfig } from "./config.ts";
import { toCstDateStr, toUtcStr } from "./date.ts";
import { type Lang, MSG, ISSUE_LABELS, CLI_ISSUE_TITLE, OPENCLAW_ISSUE_TITLE } from "./i18n.ts";

// ---------------------------------------------------------------------------
// Repo config — loaded from config.yml, falls back to built-in defaults
// ---------------------------------------------------------------------------

/**
 * Load configuration from config.yml at startup.
 * Destructure into named constants for backward compatibility with the rest of the code.
 */
const {
  cliRepos: CLI_REPOS,
  skillsRepo: CLAUDE_SKILLS_REPO,
  openclaw: OPENCLAW,
  openclawPeers: OPENCLAW_PEERS,
} = loadConfig();

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Read a required environment variable. Throws if not set.
 *
 * @param name - Env var name
 * @returns The env var value
 * @throws Error if the env var is not set
 */
function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

// ---------------------------------------------------------------------------
// Phase 1: Fetch — all network I/O in parallel
// ---------------------------------------------------------------------------

/**
 * Fetch ALL data sources in parallel.
 *
 * HOW IT WORKS:
 * - Uses Promise.all() to run 5 independent fetch operations simultaneously:
 *   1. GitHub issues/PRs/releases for all tracked repos
 *   2. Claude Code Skills data
 *   3. Web content from Anthropic and OpenAI sitemaps
 *   4. GitHub Trending + Search API
 *   5. Hacker News stories
 * - Each source has error handling — if one fails, the others continue.
 * - Returns a single object with all fetched data.
 *
 * @param since - Date threshold — only fetch items updated after this date
 * @param webState - Persisted web state for incremental scraping
 * @returns Object with all fetched data
 */
async function fetchAllData(
  since: Date,
  webState: WebState,
): Promise<{
  fetched: RepoFetch[];
  skillsData: { prs: GitHubItem[]; issues: GitHubItem[] };
  webResults: WebFetchResult[];
  trendingData: TrendingData;
  hnData: HnData;
}> {
  const allConfigs = [...CLI_REPOS, OPENCLAW, ...OPENCLAW_PEERS];
  console.log(`  Tracking: ${allConfigs.map((r) => r.id).join(", ")}, claude-code-skills, web, hn`);

  const [fetched, skillsData, webResults, trendingData, hnData] = await Promise.all([
    // 1. Fetch issues, PRs, and releases for all repos in parallel
    Promise.all(
      allConfigs.map(async (cfg) => {
        const [issuesRaw, prs, releases] = await Promise.all([
          fetchRecentItems(cfg, "issues", since),
          fetchRecentItems(cfg, "pulls", since),
          fetchRecentReleases(cfg.repo, since),
        ]);
        // Filter out PRs from the issues list (GitHub's /issues returns both)
        const issues = issuesRaw.filter((i) => !i.pull_request);
        console.log(
          `  [${cfg.id}] issues: ${issues.length}, prs: ${prs.length}, releases: ${releases.length}`,
        );
        return { cfg, issues, prs, releases } satisfies RepoFetch;
      }),
    ),
    // 2. Fetch Claude Code Skills data
    fetchSkillsData(CLAUDE_SKILLS_REPO).then((d) => {
      console.log(`  [claude-code-skills] prs: ${d.prs.length}, issues: ${d.issues.length}`);
      return d;
    }),
    // 3. Fetch web content from Anthropic and OpenAI in parallel
    Promise.all([
      fetchSiteContent("anthropic", webState).catch((err): WebFetchResult => {
        console.error(`  [web/anthropic] fetch failed: ${err}`);
        return {
          site: "anthropic",
          siteName: "Anthropic (Claude)",
          isFirstRun: false,
          newItems: [],
          totalDiscovered: 0,
        };
      }),
      fetchSiteContent("openai", webState).catch((err): WebFetchResult => {
        console.error(`  [web/openai] fetch failed: ${err}`);
        return { site: "openai", siteName: "OpenAI", isFirstRun: false, newItems: [], totalDiscovered: 0 };
      }),
    ]),
    // 4. Fetch GitHub Trending data
    fetchTrendingData().catch(
      (): TrendingData => ({
        trendingRepos: [],
        searchRepos: [],
        trendingFetchSuccess: false,
      }),
    ),
    // 5. Fetch Hacker News stories
    fetchHnData().catch((): HnData => ({ stories: [], fetchSuccess: false })),
  ]);

  return { fetched, skillsData, webResults, trendingData, hnData };
}

// ---------------------------------------------------------------------------
// Phase 2: LLM summaries — per-repo summaries in parallel
// ---------------------------------------------------------------------------

/**
 * Call LLM with logging and error fallback.
 *
 * @param id - Identifier for logging (e.g. "claude-code")
 * @param prompt - The prompt to send
 * @param failMsg - Fallback message if the LLM call fails
 * @param maxTokens - Optional token limit override
 * @returns The LLM response, or failMsg on error
 */
async function summarize(id: string, prompt: string, failMsg: string, maxTokens?: number): Promise<string> {
  console.log(`  [${id}] Calling LLM for summary...`);
  try {
    return await callLlm(prompt, maxTokens);
  } catch (err) {
    console.error(`  [${id}] LLM call failed: ${err}`);
    return failMsg;
  }
}

/**
 * Summarize a repo's activity, returning a RepoDigest.
 * Skips the LLM call if there's no activity (no issues, PRs, or releases).
 *
 * @param param0 - Destructured RepoFetch (cfg, issues, prs, releases)
 * @param prompt - The LLM prompt
 * @param noActivityMsg - Message to use when there's no activity
 * @param failMsg - Message to use if the LLM call fails
 * @returns A RepoDigest object
 */
async function summarizeRepo(
  { cfg, issues, prs, releases }: RepoFetch,
  prompt: string,
  noActivityMsg: string,
  failMsg: string,
): Promise<RepoDigest> {
  if (!issues.length && !prs.length && !releases.length) {
    console.log(`  [${cfg.id}] No activity, skipping LLM call`);
    return { config: cfg, issues, prs, releases, summary: noActivityMsg };
  }
  const summary = await summarize(cfg.id, prompt, failMsg);
  return { config: cfg, issues, prs, releases, summary };
}

/**
 * Generate all LLM summaries for a given language.
 *
 * HOW IT WORKS:
 * - Runs 5 summary operations in parallel using Promise.all():
 *   1. Per-tool CLI digests (one LLM call per tool)
 *   2. OpenClaw deep dive (one LLM call)
 *   3. Claude Code Skills highlights (one LLM call)
 *   4. Peer project digests (one LLM call per peer)
 *   5. Trending report (one LLM call)
 * - All LLM calls go through the concurrency limiter (max 5 at a time).
 *
 * @returns Object with all generated summaries
 */
async function generateSummaries(
  fetchedCli: RepoFetch[],
  fetchedOpenclaw: RepoFetch,
  skillsData: { prs: GitHubItem[]; issues: GitHubItem[] },
  fetchedPeers: RepoFetch[],
  trendingData: TrendingData,
  dateStr: string,
  lang: Lang = "zh",
): Promise<{
  cliDigests: RepoDigest[];
  openclawSummary: string;
  skillsSummary: string;
  peerDigests: RepoDigest[];
  trendingSummary: string;
}> {
  const noActivity = MSG.noActivity[lang];
  const fail = MSG.summaryFailed[lang];

  const [cliDigests, openclawSummary, skillsSummary, peerDigests, trendingSummary] = await Promise.all([
    // 1. CLI tool digests
    Promise.all(
      fetchedCli.map((f) =>
        summarizeRepo(f, buildCliPrompt(f.cfg, f.issues, f.prs, f.releases, dateStr, lang), noActivity, fail),
      ),
    ),
    // 2. OpenClaw deep dive
    summarizeRepo(
      fetchedOpenclaw,
      buildPeerPrompt(
        fetchedOpenclaw.cfg,
        fetchedOpenclaw.issues,
        fetchedOpenclaw.prs,
        fetchedOpenclaw.releases,
        dateStr,
        50, // higher limits for OpenClaw (high-volume repo)
        30,
        lang,
      ),
      noActivity,
      fail,
    ).then((d) => d.summary),
    // 3. Claude Code Skills
    summarize(
      "claude-code-skills",
      buildSkillsPrompt(skillsData.prs, skillsData.issues, dateStr, lang),
      MSG.skillsFailed[lang],
    ),
    // 4. Peer project digests
    Promise.all(
      fetchedPeers.map((f) =>
        summarizeRepo(
          f,
          buildPeerPrompt(f.cfg, f.issues, f.prs, f.releases, dateStr, undefined, undefined, lang),
          noActivity,
          fail,
        ),
      ),
    ),
    // 5. Trending report
    (async () => {
      const hasData = trendingData.trendingRepos.length > 0 || trendingData.searchRepos.length > 0;
      if (!hasData) {
        return MSG.trendingNoData[lang];
      }
      return summarize(
        "trending",
        buildTrendingPrompt(trendingData, dateStr, lang),
        MSG.trendingFailed[lang],
        LLM_TOKENS_TRENDING,
      );
    })(),
  ]);

  return { cliDigests, openclawSummary, skillsSummary, peerDigests, trendingSummary };
}

// ---------------------------------------------------------------------------
// Main — the top-level orchestrator
// ---------------------------------------------------------------------------

/**
 * Main entry point. Runs the full 4-phase pipeline.
 *
 * PHASE 1: Fetch all data (GitHub API, web, trending, HN)
 * PHASE 2: Generate per-repo LLM summaries (ZH + EN in parallel)
 * PHASE 3: Generate cross-repo comparisons (ZH + EN in parallel)
 * PHASE 4: Build Markdown reports, save files, create GitHub Issues
 *
 * TIMING:
 * - The entire pipeline runs in ~2-5 minutes depending on LLM response times.
 * - Most time is spent in Phase 2 (LLM calls) and Phase 3 (comparisons).
 * - Phase 1 (network I/O) is fast because everything runs in parallel.
 */
async function main(): Promise<void> {
  requireEnv("GITHUB_TOKEN");

  const now = new Date();
  const since = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 24 hours ago
  const dateStr = toCstDateStr(now); // "2026-03-11"
  const utcStr = toUtcStr(now); // "2026-03-11 00:00"
  const digestRepo = process.env["DIGEST_REPO"] ?? "";

  const providerName = process.env["LLM_PROVIDER"] ?? "anthropic";
  console.log(`[${now.toISOString()}] Starting digest | provider: ${providerName}`);

  // ── Phase 1: Fetch all data in parallel ──────────────────────────────────
  const webState = loadWebState();
  const { fetched, skillsData, webResults, trendingData, hnData } = await fetchAllData(since, webState);

  // Separate fetched data into categories
  const peerIds = new Set(OPENCLAW_PEERS.map((p) => p.id));
  const fetchedCli = fetched.filter((f) => f.cfg.id !== OPENCLAW.id && !peerIds.has(f.cfg.id));
  const fetchedOpenclaw = fetched.find((f) => f.cfg.id === OPENCLAW.id)!;
  const fetchedPeers = fetched.filter((f) => peerIds.has(f.cfg.id));

  // ── Phase 2: Generate summaries in ZH and EN in parallel ────────────────
  console.log("  Generating summaries in ZH and EN in parallel...");
  const [zhSummaries, enSummaries] = await Promise.all([
    generateSummaries(fetchedCli, fetchedOpenclaw, skillsData, fetchedPeers, trendingData, dateStr, "zh"),
    generateSummaries(fetchedCli, fetchedOpenclaw, skillsData, fetchedPeers, trendingData, dateStr, "en"),
  ]);

  // ── Phase 3: Cross-repo comparisons (ZH + EN in parallel) ───────────────
  console.log("  Calling LLM for comparative analyses (ZH + EN)...");
  const summariesByLang = { zh: zhSummaries, en: enSummaries };

  // Helper to create an OpenClaw digest from summaries
  const makeOpenclawDigest = (lang: Lang): RepoDigest => ({
    config: OPENCLAW,
    issues: fetchedOpenclaw.issues,
    prs: fetchedOpenclaw.prs,
    releases: fetchedOpenclaw.releases,
    summary: summariesByLang[lang].openclawSummary,
  });

  // 4 comparison LLM calls in parallel (ZH CLI + ZH OpenClaw + EN CLI + EN OpenClaw)
  const [zhComparison, zhPeersComparison, enComparison, enPeersComparison] = await Promise.all([
    callLlm(buildComparisonPrompt(zhSummaries.cliDigests, dateStr, "zh")),
    callLlm(buildPeersComparisonPrompt(makeOpenclawDigest("zh"), zhSummaries.peerDigests, dateStr, "zh")),
    callLlm(buildComparisonPrompt(enSummaries.cliDigests, dateStr, "en")),
    callLlm(buildPeersComparisonPrompt(makeOpenclawDigest("en"), enSummaries.peerDigests, dateStr, "en")),
  ]);

  const comparisonByLang = { zh: zhComparison, en: enComparison };
  const peersComparisonByLang = { zh: zhPeersComparison, en: enPeersComparison };

  // ── Phase 4: Build + save all reports (ZH + EN) ─────────────────────────

  // CLI and OpenClaw reports — built directly from summaries
  const cliContent: Record<Lang, string> = {} as Record<Lang, string>;
  const openclawContent: Record<Lang, string> = {} as Record<Lang, string>;

  for (const lang of ["zh", "en"] as const) {
    const s = summariesByLang[lang];
    const ft = autoGenFooter(lang);
    const suffix = lang === "en" ? "-en" : "";

    cliContent[lang] = buildCliReportContent(
      s.cliDigests,
      s.skillsSummary,
      comparisonByLang[lang],
      utcStr,
      dateStr,
      ft,
      CLAUDE_SKILLS_REPO,
      lang,
    );
    openclawContent[lang] = buildOpenclawReportContent(
      fetchedOpenclaw,
      s.peerDigests,
      s.openclawSummary,
      peersComparisonByLang[lang],
      utcStr,
      dateStr,
      ft,
      OPENCLAW,
      OPENCLAW_PEERS,
      lang,
    );

    console.log(`  Saved ${saveFile(cliContent[lang], dateStr, `ai-cli${suffix}.md`)}`);
    console.log(`  Saved ${saveFile(openclawContent[lang], dateStr, `ai-agents${suffix}.md`)}`);
  }

  // Web report — sequential for ZH first (saves state), then EN
  for (const lang of ["zh", "en"] as const) {
    await saveWebReport(webResults, webState, utcStr, dateStr, digestRepo, autoGenFooter(lang), lang);
  }

  // Trending and HN reports — ZH and EN in parallel
  await Promise.all([
    saveTrendingReport(
      trendingData,
      zhSummaries.trendingSummary,
      utcStr,
      dateStr,
      digestRepo,
      autoGenFooter("zh"),
      "zh",
    ),
    saveTrendingReport(
      trendingData,
      enSummaries.trendingSummary,
      utcStr,
      dateStr,
      digestRepo,
      autoGenFooter("en"),
      "en",
    ),
    saveHnReport(hnData, utcStr, dateStr, digestRepo, autoGenFooter("zh"), "zh"),
    saveHnReport(hnData, utcStr, dateStr, digestRepo, autoGenFooter("en"), "en"),
  ]);

  // ── Step 5: Generate highlights for Telegram notification ────────────────

  // Read all generated report files
  const readReport = (name: string): string | undefined => {
    const p = path.join("digests", dateStr, name);
    return fs.existsSync(p) ? fs.readFileSync(p, "utf-8") : undefined;
  };

  const zhReports: Record<string, string> = { "ai-cli": cliContent.zh, "ai-agents": openclawContent.zh };
  const enReports: Record<string, string> = { "ai-cli": cliContent.en, "ai-agents": openclawContent.en };
  for (const [id, zhFile, enFile] of [
    ["ai-trending", "ai-trending.md", "ai-trending-en.md"],
    ["ai-web", "ai-web.md", "ai-web-en.md"],
    ["ai-hn", "ai-hn.md", "ai-hn-en.md"],
  ] as const) {
    const zh = readReport(zhFile);
    const en = readReport(enFile);
    if (zh) zhReports[id] = zh;
    if (en) enReports[id] = en;
  }

  // Extract highlights from reports for Telegram notifications
  console.log("  Generating highlights for Telegram...");
  const highlights: Record<Lang, ReportHighlights> = { zh: {}, en: {} };
  try {
    const [zhRaw, enRaw] = await Promise.all([
      callLlm(buildHighlightsPrompt(zhReports, "zh"), 1024),
      callLlm(buildHighlightsPrompt(enReports, "en"), 1024),
    ]);
    // Parse JSON from LLM response (strip markdown code fences if present)
    highlights.zh = JSON.parse(
      zhRaw
        .replace(/```json?\n?/g, "")
        .replace(/```/g, "")
        .trim(),
    );
    highlights.en = JSON.parse(
      enRaw
        .replace(/```json?\n?/g, "")
        .replace(/```/g, "")
        .trim(),
    );
  } catch (err) {
    console.error(`  [highlights] Generation failed: ${err}`);
  }

  const highlightsPath = saveFile(JSON.stringify(highlights, null, 2), dateStr, "highlights.json");
  console.log(`  Saved ${highlightsPath}`);

  // ── Step 6: Create GitHub Issues for CLI + OpenClaw (ZH + EN) ────────────
  if (digestRepo) {
    for (const lang of ["zh", "en"] as const) {
      const cliUrl = await createGitHubIssue(
        CLI_ISSUE_TITLE(dateStr, lang),
        cliContent[lang],
        ISSUE_LABELS.cli[lang],
      );
      console.log(`  Created CLI issue (${lang}): ${cliUrl}`);

      const ocUrl = await createGitHubIssue(
        OPENCLAW_ISSUE_TITLE(dateStr, lang),
        openclawContent[lang],
        ISSUE_LABELS.openclaw[lang],
      );
      console.log(`  Created OpenClaw issue (${lang}): ${ocUrl}`);
    }
  }

  console.log("Done!");
}

// Call main() and handle errors
main().catch((err) => {
  console.error(err);
  process.exit(1);
});

// ── SUMMARY ──────────────────────────────────────────────────────────────────
// This is the main orchestrator file. It coordinates the 4-phase pipeline:
// Phase 1 (fetchAllData): All network I/O in parallel
// Phase 2 (generateSummaries): All LLM summary calls in parallel
// Phase 3 (comparisons): Cross-repo LLM comparisons in parallel
// Phase 4 (save): Build Markdown, save files, create GitHub Issues
//
// Key patterns:
// - Heavy use of Promise.all() for parallelization
// - Data flows forward through phases (Phase 1 output → Phase 2 input → etc.)
// - Error handling at each level (individual fetches, LLM calls, etc.)
// - Bilingual processing: ZH and EN run in parallel where possible
//
// QUESTIONS:
// Q1: Why run ZH and EN summaries in parallel (Promise.all) instead of sequentially?
//     (Answer: They're independent — the LLM can process both simultaneously.
//      This roughly halves the total LLM time.)
// Q2: Why does the web report run sequentially (ZH first, then EN)?
//     (Answer: ZH saves the web state file. If EN ran in parallel, there could be
//      a race condition where both try to save state simultaneously.)
// Q3: What's the purpose of the `satisfies RepoFetch` in fetchAllData?
//     (Answer: It validates that the returned object matches the RepoFetch type
//      WITHOUT changing the inferred type — catches shape mismatches at compile time)
// ─────────────────────────────────────────────────────────────────────────────
