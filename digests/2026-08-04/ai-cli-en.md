# AI CLI Tools Community Digest 2026-08-04

> Generated: 2026-08-04 14:12 UTC | Tools covered: 7

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [GitHub Copilot CLI](https://github.com/github/copilot-cli)
- [Kimi Code CLI](https://github.com/MoonshotAI/kimi-cli)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Qwen Code](https://github.com/QwenLM/qwen-code)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## Cross-Tool Comparison

# 2026-08-04 AI CLI Tools Cross-Tool Comparison Report

## Ecosystem Overview
As of 2026-08-04, the AI CLI tools ecosystem is characterized by rapid iteration on core developer workflow integration, enterprise scaling capabilities, and cross-platform reliability, with Anthropic, OpenAI, and GitHub leading active development and community engagement. Smaller entrants including Moonshot AI's Kimi CLI are prioritizing open protocol interoperability and niche accessibility features, while Google's Gemini CLI has no visible public development activity in the reporting window. Community feedback across tools consistently highlights data integrity, model reliability, and cost transparency as critical unmet needs for production use cases.

## Activity Comparison
| Tool | Active Hot Issues (Last 24h) | PR Activity (Last 24h) | Release Status (Last 24h) |
|------|------------------------------|------------------------|---------------------------|
| Claude Code | 10 | 2 PRs updated | Stable v2.1.221 shipped |
| OpenAI Codex | 7 | 17 PRs merged | 7 iterative alpha builds (v0.147.0-alpha.1.2 to v0

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report
*Data as of 2026-08-04 | Source: github.com/anthropics/skills*

## 1. Top Skills Ranking

The following PRs represent the most actively discussed Skills proposals and fixes in the repository:

- **[PR #1298](https://github.com/anthropics/skills/pull/1298)** — fix(skill-creator): run_eval.py always reports 0% recall. Addresses a critical evaluation bug where the skill optimization loop reports 0% recall for every skill description, causing the description-optimization loop to optimize against noise. The fix involves installing the eval artifact as a real skill, correcting Windows stream reading, improving trigger detection, and enabling parallel workers. Status: Open.

- **[PR #514](https://github.com/anthropics/skills/pull/514)** — Add document-typography skill. Introduces typographic quality control for AI-generated documents, preventing orphan word wraps, widow paragraphs, and numbering misalignment. These issues affect every document Claude generates, yet users rarely explicitly request good typography. Status: Open.

- **[PR #538](https://github.com/anthropics/skills/pull/538)** — fix(pdf): correct case-sensitive file references in SKILL.md. Fixes 8 case-sensitivity mismatches in the PDF skill's SKILL.md where `REFERENCE.md` and `FORMS.md` were referenced in uppercase but the actual files are lowercase, breaking on case-sensitive file systems. Status: Open.

- **[PR #486](https://github.com/anthropics/skills/pull/486)** — Add ODT skill — OpenDocument text creation and template filling and parse ODT to HTML. Provides comprehensive support for OpenDocument Format files (.odt, .ods), including creation, template filling, and conversion to HTML. Triggers on mentions of ODT, ODS, ODF, LibreOffice, or requests for open-standard documents. Status: Open.

- **[PR #210](https://github.com/anthropics/skills/pull/210)** — Improve frontend-design skill clarity and actionability. Revises the frontend-design skill to ensure every instruction is actionable within a single conversation and specific enough to steer behavior without ambiguity. Status: Open.

- **[PR #83](https://github.com/anthropics/skills/pull/83)** — Add skill-quality-analyzer and skill-security-analyzer to marketplace. Adds two meta-skills: `skill-quality-analyzer` evaluates skills across structure, documentation, functionality, safety, and maintainability; `skill-security-analyzer` checks for injection risks, permission scoping, and supply chain vulnerabilities. Status: Open.

- **[PR #1367](https://github.com/anthropics/skills/pull/1367)** — feat(skills): add self-audit. Introduces a mechanical verification plus four-dimension reasoning quality gate that audits AI output before delivery. Step 0 verifies every claimed output file exists; subsequent steps audit reasoning quality in damage-severity priority order. Status: Open.

- **[PR #723](https://github.com/anthropics/skills/pull/723)** — Add testing-patterns skill. Comprehensive skill covering the full testing stack including Testing Trophy philosophy, AAA pattern, React component testing, and mocking strategies. Status: Open.

## 2. Community Demand Trends

Analysis of community Issues reveals the most-anticipated Skill directions:

- **Evaluation and Optimization Tooling**: Multiple issues (#556, #1169, #1061) and PRs (#1298, #1323, #1099, #1050) highlight urgent demand for fixing `run_eval.py` and `run_loop.py`, particularly Windows compatibility and trigger detection accuracy.
- **Document Processing and Quality**: Strong interest in skills for document-typography, PDF, DOCX, and ODT formats, with users seeking robust creation, editing, and conversion capabilities.
- **Security and Trust Verification**: Issue #492 (43 comments) exposes critical concerns about namespace impersonation and trust boundaries, driving demand for security-analyzer meta-skills and verification mechanisms.
- **Testing and Quality Assurance**: Proposals for testing-patterns and quality-analyzer skills indicate community need for built-in testing guidance and quality gates.
- **Organizational Sharing**: Issue #228 (16 comments) requests org-wide skill sharing capabilities to replace manual download/upload workflows.
- **Long-Running Agent Memory**: Issue #1329 proposes `compact-memory` skill using symbolic notation to reduce context bloat from prose-based persistent memory.

## 3. High-Potential Pending Skills

These active PRs have not yet merged but show strong community interest and are likely to land soon:

- **[PR #514](https://github.com/anthropics/s

---

# Claude Code Community Digest — 2026-08-04

## Today's Highlights

Claude Code v2.1.221 shipped today, introducing a new Focus view in VS Code that collapses tool activity behind per-turn summaries, along with Linux sandbox credential masking. Meanwhile, the community continues to surface high-impact issues around data loss, model quality regressions, and platform-specific UI bugs, with the top feature requests centering on git workflow enhancements and organizational skill management.

## Releases

**v2.1.221** (released 2026-08-04)
- Added Focus view in VS Code: a toggle (`Ctrl+Alt+F` or "Claude Code: Toggle Focus view") that hides tool activity behind expandable per-turn summaries with a live running-tool indicator
- Added `mode: "mask"` for sandbox credential files on Linux

## Hot Issues

1. **[#23626](https://github.com/anthropics/claude-code/issues/23626)** — *Support diff comparison against branches other than main* (111👍, 36 comments)
   A top-voted feature request asking for diff views against arbitrary branches, not just `main`. High community engagement reflects a common git workflow gap.

2. **[#28729](https://github.com/anthropics/claude-code/issues/28729)** — *Link a source control repo as the source for organization skills* (83👍, 35 comments)
   Users want to version-control and distribute team skills via git repos instead of manual imports. Strong demand for enterprise/team scaling.

3. **[#59248](https://github.com/anthropics/claude-code/issues/59248)** — *Silent retention cleanup deletes session transcripts with no warning, opt-in, or recovery* (18👍, 29 comments)
   **Data-loss bug**: A user reports all conversation transcripts older than the current session were permanently deleted without warning. Labeled `data-loss`; high urgency.

4. **[#83510](https://github.com/anthropics/claude-code/issues/83510)** — *Measurable quality regression in Claude generation 5 (Fable 5 / Opus 5 / Sonnet 5)* (5👍, 5 comments)
   Reproducible measurements show worse nonsense detection, ~2x verbosity, and silent rerouting in gen-5 models. Flagged as a model-level regression.

5. **[#67085](https://github.com/anthropics/claude-code/issues/67085)** — *Desktop activity dashboard streak/heatmap credits session-start date, not each active calendar day* (4👍, 10 comments)
   Multi-day sessions incorrectly break streaks because the dashboard attributes all activity to the session start date.

6. **[#52384](https://github.com/anthropics/claude-code/issues/52384)** — *VS Code extension voice dictation ignores `language` setting* (4👍, 4 comments)
   French (and likely other non-English) audio is decoded as English gibberish in the VS Code extension, while the CLI respects the `language` setting.

7. **[#79386](https://github.com/anthropics/claude-code/issues/79386)** — *Claude Code prompts for usage credits on Fable 5 despite Max plan showing full entitlement* (0👍, 4 comments)
   Max-tier users on Fable 5 are incorrectly prompted for credits, indicating an entitlement-check bug.

8. **[#83798](https://github.com/anthropics/claude-code/issues/83798)** — *Terminal mode: messages enqueued after first turn are never dispatched* (0👍, 2 comments)
   A CLI-side queue stall in terminal mode causes silent message drops after the first turn, with log evidence provided.

9. **[#83795](https://github.com/anthropics/claude-code/issues/83795)** — *Model pinning is broken by design — 4 measured bypass vectors, Sonnet 4.6 silently removed* (0👍, 2 comments)
   Security/architecture concern: model pinning can be bypassed, and Sonnet 4.6 was removed from the model menu without notice.

10. **[#80471](https://github.com/anthropics/claude-code/issues/80471)** — *Regression: date filter (1/3/7 days) missing from sessions list when grouping by Project* (9👍, 2 comments)
    A desktop app regression that removed date filters from the Project-grouped sessions view.

## Key PR Progress

Only 2 PRs were updated in the last 24 hours:

- **[#83374](https://github.com/anthropics/claude-code/pull/83374)** — *docs(plugin-dev): document MessageDisplay streaming semantics*
  Adds missing documentation for the `MessageDisplay` hook event to the bundled plugin-development skill, including trigger descriptions and a quick-reference table.

- **[#83738](https://github.com/anthropics/claude-code/pull/83738)** — *Fix/83484 symlink path expansion*
  Fixes a Linux install bug where `~/.local/bin/claude` was created as a broken symlink due to an unexpanded `%h` placeholder.

## Feature Request Trends

- **Git workflow depth**: Diff comparisons across branches (#23626) and git worktree session persistence (#82802) show demand for more advanced version-control integration.
- **Team/organization scaling**: Linking source-control repos for skills distribution (#28729) and machine-level policies for HPC/shared infrastructure (#70184) point to enterprise adoption needs.
- **Cost and quota controls**: Reserved quota for specific tasks (#81554) and billing visibility (#83231) reflect user desire for predictable spend.
- **Permission hardening**: Complete disablement of "accept edits" (#76091) and model-pinning controls (#83795) indicate security-conscious use cases.

## Developer Pain Points

- **Data integrity**: Silent transcript deletion (#59248) and empty session restoration after restarts (#82802) undermine trust in local state persistence.
- **Model reliability**: Quality regressions in gen-5 models (#83510) and broken model pinning (#83795) create uncertainty for production use.
- **Platform parity**: Voice dictation language settings work in CLI but fail in VS Code (#52384, #83845); WSL and Windows-specific UI and install bugs (#77243, #70700, #83730) remain frequent.
- **Terminal reliability**: Queue stalls in terminal mode (#83798) and silent message drops (#83823) disrupt CLI-centric workflows.
- **Billing confusion**: Max-plan users incorrectly prompted for credits (#79386) and untracked cloud spend (#83231) highlight opaque cost accounting.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-08-04

---

## Today's Highlights
On 2026-08-04, OpenAI Codex shipped a new series of Rust CLI alpha releases (v0.147.0-alpha.1.2 through v0.147.0-alpha.7) alongside 17 merged pull requests focused on skills system refactoring, multi-agent v2 support, and performance/telemetry fixes. The most active community issue remains the long-running #14593 bug reporting rapid, unexplained token consumption, which has accumulated 628 comments and 283 upvotes since March 2026, while a high-impact VS Code Codex Diff crash on macOS (#35058) was closed after widespread community reporting.

---

## Releases
New iterative builds in the active Rust CLI 0.147.0 alpha development cycle were published on 2026-08-04:
- v0.147.0-alpha.1.2
- v0.147.0-alpha.6
- v0.147.0-alpha.6.1
- v0.147.0-alpha.7
Release notes for individual alpha builds are minimal, aligned with standard pre-release cadence.

---

## Hot Issues
1. **[#14593 Burning tokens very fast](https://github.com/openai/codex/issues/14593)** (OPEN | 628 comments | 283 👍)
   Unresolved high-severity bug causing unexplained, rapid token consumption for users across Business, Pro, and Plus tiers on VS Code and desktop. It is the highest-engagement issue in the tracker, with users sharing billing dispute reports and unofficial workarounds for 5+ months.
2. **[#35058 Codex Diff crashes with “Oops, an error has occurred” in VS Code on macOS](https://github.com/openai/codex/issues/35058)** (CLOSED | 50 comments | 122 👍)
   Critical blocker that made the core diff review feature completely unusable for macOS VS Code users across all repositories. It was closed after community escalation and a targeted fix rollout.
3. **[#17827 Customizable status line](https://github.com/openai/codex/issues/17827)** (OPEN | 38 comments | 143 👍)
   Long-running feature request to match Claude Code's functionality, letting users display real-time token usage, model name, rate limits, git branch, and other metadata in the TUI. Strong community support, with users sharing custom status line script workarounds.
4. **[#20730 Custom pets fail to load in WSL environments due to path normalization](https://github.com/openai/codex/issues/20730)** (OPEN | 20 comments | 24 👍)
   Breaks the popular pet mascot UI customization feature for Windows users running Codex in WSL, caused by Windows/WSL path normalization mismatches. Consistent reproduction reports from the WSL user base.
5. **[#19262 Codex CLI 0.124.0 misreports `gh auth status` as invalid inside Codex session](https://github.com/openai/codex/issues/19262)** (OPEN | 18 comments | 18 👍)
   Breaks GitHub CLI integration for Codex CLI sessions, preventing users from running GitHub-related tool calls (PR creation, issue management) inside Codex. Impacts users relying on GitHub workflow automation.
6. **[#31987 Auto-recharge of credits keeps getting turned back on](https://github.com/openai/codex/issues/31987)** (OPEN | 17 comments | 4 👍)
   Unintended automatic opt-in to credit auto-recharge after users manually disable the toggle and purchase credits, raising billing UX and trust concerns for Pro/Plus subscribers.
7. **[#35119 [Windows][WSL] 26.721.3404 marks valid WSL repositories

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-08-04

## Today's Highlights
No new stable or nightly releases were published in the last 24 hours. Community and maintainer activity is focused on core agent

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest
*Date: 2026-08-04 | Source: github.com/github/copilot-cli*

---

## Today's Highlights
GitHub Copilot CLI released v1.0.78-3 on 2026-08-04, introducing an experimental `/new-worktree` command for branching worktrees with new conversations, interactive shell shortcut improvements, and a fix for local desktop login defaulting to the browser flow. The community is actively discussing high-impact feature requests including session forking, cloud-synced cross-device sessions, and custom LLM provider support, while a critical regression breaking plugin slash command invocation was reported on the same day.

---

## Releases
- [v1.0.78-3](https://github.com/github/copilot-cli/releases/tag/v1.0.78-3) (2026-08-04)
  - Added: Experimental `/new-worktree` command to create a new worktree and start a new conversation in it
  - Improved: Interactive shell shortcut now launches on Enter and displays an inline hint when the `$` prompt is armed
  - Fixed: Copilot login now defaults to the browser flow for local desktop installations

---

## Hot Issues
1. [#4361 (OPEN, triage)](https://github.com/github/copilot-cli/issues/4361): Critical regression breaking plugin-provided slash command invocation. Previously, commands like `/grill-me <args>` were rewritten to natural language by the desktop client; they now fire a failed `session.commands.invoke` RPC. Reported 2026-08-04, impacts all users relying on plugin skills as slash commands.
2. [#4349 (OPEN, enterprise/mcp)](https://github.com/github/copilot-cli/issues/4349): Enterprise managed settings policy fetch fails validation on the valid enum value `"enable"` for `permissions.disableBypassPermissionsMode`, blocking all local and custom MCP servers for enterprise users on GHE instances. Reported 2026-08-03, impacts enterprise deployment workflows.
3. [#2692 (CLOSED, networking/mcp)](https://github.com/github/copilot-cli/issues/2692): Web Search tool (via `github-mcp-server`) threw streamable HTTP POST errors during execution, breaking MCP-powered web search functionality. 6 comments, 2 👍, marked resolved.
4. [#4328 (OPEN, input/platform-windows)](https://github.com/github/copilot-cli/issues/4328): `Ctrl+H` is misinterpreted as `Ctrl+Backspace` (delete word instead of delete previous character) under WSL2, caused by `WT_SESSION` leaking from Windows Terminal. 5 comments, impacts Windows/WSL2 developers using standard keyboard shortcuts.
5. [#1697 (OPEN, sessions/context-memory)](https://github.com/github/copilot-cli/issues/1697): Highly requested feature to support session forking, allowing users to branch a conversation into parallel sessions with shared context for multi-step tasks. 3 comments, 25 👍, one of the most upvoted open feature requests.
6. [#1947 (CLOSED, sessions)](https://github.com/github/copilot-cli/issues/1947): Feature request for cloud-synced sessions to enable cross-device continuity, eliminating the need to tie sessions to a single local machine. 4 comments, 6 👍, marked closed but remains a popular community request.
7. [#4363 (OPEN, triage)](https://github.com/github/copilot-cli/issues/4363): Request to expose session cost data in `copilot --acp` protocol output, which currently only provides token usage and context window size. Needed for cost tracking in ACP integrations, reported 2026-08-04.
8. [#4358 (OPEN, triage)](https://github.com/github/copilot-cli/issues/4358): Feature request to populate the in-session `/model` picker from a custom provider's `/models` endpoint when running with `COPILOT_PROVIDER_BASE_URL`, as only a

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI Community Digest | 2026-08-04

## Today's Highlights
No new Kimi Code CLI releases were published in the last 24 hours. The community is actively prioritizing core feature requests including persistent cross-session memory systems and ACP protocol enhancements for third-party tooling, while bug reports highlight Windows-specific IME input duplication and Web UI session switching failures. Three in-progress PRs targeting shell timeout improvements, subprocess AI_AGENT exposure, and ACP permission mode switching were updated in the reporting window.

## Releases
No new releases were published in the last 24 hours.

## Hot Issues
1. [#1283: Feature Request: Memory System - Persistent context across sessions](https://github.com/MoonshotAI/kimi-cli/issues/1283)  
   Why it matters: Addresses a high-demand need for the CLI to retain project patterns, user preferences, and useful context across sessions without manual re-input.  
   Community reaction: 16 comments (highest engagement of all open issues), opened in February 2026, indicating strong sustained user demand for this functionality.
2. [#2573: Bug: Web UI "Connecting to session..." infinite spinner when switching sessions](https://github.com/MoonshotAI/kimi-cli/issues/2573)  
   Why it matters: Breaks core functionality of the Technical Preview Web UI, blocking users from accessing previous chat sessions.  
   Community reaction: 1 confirmed report, affects kimi-cli 1.48.0 users on macOS, classified as a high-severity UX blocker for Web UI adopters.
3. [#2584: Bug: Thai (and other IME-based) characters duplicated when typing in the prompt on Windows](https://github.com/MoonshotAI/kimi-cli/issues/2584)  
   Why it matters: Renders input unusable for users of IME-based languages (Thai, Chinese, Japanese, Korean, etc.) on Windows, creating a major accessibility and usability gap.  
   Community reaction: Newly reported 2026-08-04 with 0 comments so far, but impacts a large global subset of Windows users.
4. [#2583: feat(acp): advertise available models and support mid-session model switching](https://github.com/MoonshotAI/kimi-cli/issues/2583)  
   Why it matters: Enables third-party ACP clients (Zed, Happy Coder mobile) to discover available models and switch models mid-session without restarting, improving ecosystem interoperability.  
   Community reaction: Newly opened 2026-08-04, addresses a key gap for developers building integrations on the ACP protocol.
5. [#2582: [bug] CLI stream hangs indefinitely during generation, session becomes unusable](https://github.com/MoonshotAI/kimi-cli/issues/2582)  
   Why it matters: Critical reliability bug that renders active sessions completely unusable, disrupting production coding workflows.  
   Community reaction: Reported 2026-08-03 with 0 comments, affects Windows 11 users running kimi-k2.7-code via Moonshot Platform API.

## Key PR Progress
1. [#2200: fix(shell): adapt timeouts for long commands](https://github.com/MoonshotAI/kimi-cli/pull/2200)  
   In-progress since May 2026, updated 2026-08-04. Automatically extends shell command timeouts for common slow operations (git submodule cleanup, clone/fetch, package installs, builds) while retaining the 60s default for standard commands and respecting explicitly set timeouts.
2. [#2585: feat(cli): set AI_AGENT for subprocesses](https://github.com/MoonshotAI/kimi-cli/pull/2585)  
   Opened and updated 2026-08-04. Exposes the `AI_AGENT=kimi` environment variable to subprocesses launched from both pip/uv and standalone binary entrypoints, with logic to preserve non-blank values set by external wrappers or orchestrators.
3. [#2364: feat(acp): support permission mode switching](https://github.com/MoonshotAI/kimi-cli/pull/2364)  
   In-progress since May 2026, updated 2026-08-04. Adds protocol-level ACP permission mode switching for Kimi sessions, advertising supported permission modes to ACP clients. Depends on merged PR #2363 and

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

[LLM fallback] stepfun returned an empty response.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

[LLM fallback] stepfun returned an empty response.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar).*