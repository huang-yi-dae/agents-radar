/**
 * Report content builders — extracted from index.ts for testability.
 *
 * LEARNING NOTES:
 * - These functions take LLM-generated summaries and assemble them into final Markdown strings.
 * - They don't call the LLM or save files — they're pure "content assembly" functions.
 * - Extracted from index.ts so they can be unit-tested independently.
 *
 * KEY CONCEPTS:
 * - `<details>` / `<summary>` HTML tags: create collapsible sections in Markdown.
 *   GitHub renders these as expandable sections — useful for long reports.
 * - String concatenation with template literals: building Markdown documents piece by piece.
 */

import type { RepoConfig, RepoFetch } from "./github.ts";
import type { RepoDigest } from "./prompts.ts";
import { type Lang, CLI_REPORT, OPENCLAW_REPORT } from "./i18n.ts";

// ---------------------------------------------------------------------------
// CLI Report
// ---------------------------------------------------------------------------

/**
 * Build the final Markdown content for the AI CLI Tools report.
 *
 * STRUCTURE:
 * 1. Title + metadata
 * 2. Repo links (list of tracked tools)
 * 3. Cross-tool comparison (LLM-generated)
 * 4. Per-tool detailed reports (each in a <details> collapsible section)
 *    - Claude Code section includes the Skills Highlights sub-section
 * 5. Footer
 *
 * @param cliDigests - Array of per-tool digests (config + summary)
 * @param skillsSummary - LLM-generated Claude Code Skills summary
 * @param comparison - LLM-generated cross-tool comparison text
 * @param utcStr - UTC timestamp string
 * @param dateStr - Date string like "2026-03-11"
 * @param footer - Auto-generated footer string
 * @param skillsRepo - Skills repository slug
 * @param lang - Language
 * @returns Complete Markdown document as a string
 */
export function buildCliReportContent(
  cliDigests: RepoDigest[],
  skillsSummary: string,
  comparison: string,
  utcStr: string,
  dateStr: string,
  footer: string,
  skillsRepo: string,
  lang: Lang = "zh",
): string {
  // Build the repo links list
  const repoLinks =
    cliDigests.map((d) => `- [${d.config.name}](https://github.com/${d.config.repo})`).join("\n") +
    `\n- [Claude Code Skills](https://github.com/${skillsRepo})`;

  const title = `# ${CLI_REPORT.title[lang]} ${dateStr}\n\n`;
  const meta = CLI_REPORT.meta(utcStr, cliDigests.length, lang);

  // Skills section — only included inside the Claude Code <details> block
  const skillsSection =
    `## ${CLI_REPORT.skillsHeading[lang]}\n\n` +
    `> ${CLI_REPORT.skillsSource[lang]}: [anthropics/skills](https://github.com/${skillsRepo})\n\n` +
    `${skillsSummary}\n\n---\n\n`;

  // Build <details> blocks for each tool
  const toolSections = cliDigests
    .map((d) => {
      // Only Claude Code gets the skills section
      const skills = d.config.id === "claude-code" ? skillsSection : "";
      return [
        `<details>`,
        `<summary><strong>${d.config.name}</strong> — <a href="https://github.com/${d.config.repo}">${d.config.repo}</a></summary>`,
        ``,
        skills + d.summary,
        ``,
        `</details>`,
      ].join("\n");
    })
    .join("\n\n");

  // Concatenate all sections into the final document
  return (
    title +
    meta +
    `${repoLinks}\n\n` +
    `---\n\n` +
    `## ${CLI_REPORT.comparison[lang]}\n\n` +
    comparison +
    `\n\n---\n\n` +
    `## ${CLI_REPORT.detail[lang]}\n\n` +
    toolSections +
    footer
  );
}

// ---------------------------------------------------------------------------
// OpenClaw Report
// ---------------------------------------------------------------------------

/**
 * Build the final Markdown content for the OpenClaw Ecosystem report.
 *
 * STRUCTURE:
 * 1. Title + metadata (issues, PRs, projects covered)
 * 2. Repo links (OpenClaw + all peers)
 * 3. OpenClaw deep dive (LLM-generated)
 * 4. Cross-ecosystem comparison (LLM-generated)
 * 5. Peer project detailed reports (each in a <details> section)
 * 6. Footer
 */
export function buildOpenclawReportContent(
  fetchedOpenclaw: RepoFetch,
  peerDigests: RepoDigest[],
  openclawSummary: string,
  peersComparison: string,
  utcStr: string,
  dateStr: string,
  footer: string,
  openclaw: RepoConfig,
  openclawPeers: RepoConfig[],
  lang: Lang = "zh",
): string {
  const { issues, prs } = fetchedOpenclaw;

  const peersRepoLinks =
    `- [OpenClaw](https://github.com/${openclaw.repo})\n` +
    openclawPeers.map((p) => `- [${p.name}](https://github.com/${p.repo})`).join("\n");

  const peerDetailSections = peerDigests
    .map((d) =>
      [
        `<details>`,
        `<summary><strong>${d.config.name}</strong> — <a href="https://github.com/${d.config.repo}">${d.config.repo}</a></summary>`,
        ``,
        d.summary,
        ``,
        `</details>`,
      ].join("\n"),
    )
    .join("\n\n");

  const title = `# ${OPENCLAW_REPORT.title[lang]} ${dateStr}\n\n`;
  const meta =
    lang === "en"
      ? `> Issues: ${issues.length} | PRs: ${prs.length} | Projects covered: ${1 + openclawPeers.length} | Generated: ${utcStr} UTC\n\n`
      : `> Issues: ${issues.length} | PRs: ${prs.length} | 覆盖项目: ${1 + openclawPeers.length} 个 | 生成时间: ${utcStr} UTC\n\n`;

  return (
    title +
    meta +
    `${peersRepoLinks}\n\n` +
    `---\n\n` +
    `## ${OPENCLAW_REPORT.deepDive[lang]}\n\n` +
    openclawSummary +
    `\n\n---\n\n` +
    `## ${OPENCLAW_REPORT.comparison[lang]}\n\n` +
    peersComparison +
    `\n\n---\n\n` +
    `## ${OPENCLAW_REPORT.peers[lang]}\n\n` +
    peerDetailSections +
    footer
  );
}

// ── SUMMARY ──────────────────────────────────────────────────────────────────
// These are pure "assembly" functions — they take pre-generated content and
// concatenate it into final Markdown documents.
// Key patterns:
// 1. <details>/<summary> for collapsible sections (GitHub renders these)
// 2. Conditional content (skills section only for Claude Code)
// 3. String concatenation to build the final document
//
// QUESTIONS:
// Q1: Why use <details> instead of Markdown headings?
//     (Answer: <details> creates collapsible sections — users can expand only
//      the tools they care about, making the report scannable)
// Q2: Why is the skills section conditionally included only for Claude Code?
//     (Answer: Skills are a Claude Code-specific feature — other tools don't have them)
// ─────────────────────────────────────────────────────────────────────────────
