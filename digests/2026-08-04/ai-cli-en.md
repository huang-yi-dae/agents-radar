# AI CLI Tools Community Digest 2026-08-04

> Generated: 2026-08-04 12:27 UTC | Tools covered: 7

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

[LLM fallback] stepfun returned an empty response.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report
*Data as of 2026-08-04*

---

## 1. Top Skills Ranking

| Rank | PR | Skill | Description | Status |
|------|----|-------|-------------|--------|
| 1 | [#1298](https://github.com/anthropics/skills/pull/1298) | **skill-creator eval fix** | Fixes `run_eval.py` reporting 0% recall due to incorrect artifact installation, Windows stream reading, and trigger detection flaws. | Open |
| 2 | [#514](https://github.com/anthropics/skills/pull/514) | **document-typography** | Prevents orphan words, widow paragraphs, and numbering misalignment in AI-generated documents. | Open |
| 3 | [#538](https://github.com/anthropics/skills/pull/538) | **pdf case-sensitivity fix** | Corrects 8 case-sensitive file references in `pdf/SKILL.md` that break on Linux/macOS. | Open |
| 4 | [#486](https://github.com/anthropics/skills/pull/486) | **odt** | Create, fill, read, and convert OpenDocument Format files (.odt, .ods). | Open |
| 5 | [#210](https://github.com/anthropics/skills/pull/210) | **frontend-design overhaul** | Improves clarity, actionability, and coherence of frontend-design skill instructions. | Open |
| 6 | [#723](https://github.com/anthropics/skills/pull/723) | **testing-patterns** | Covers unit testing, React component testing, and testing philosophy (Testing Trophy). | Open |
| 7 | [#525](https://github.com/anthropics/skills/pull/525) | **pyxel** | Retro/pixel-art game development workflow using the Pyxel engine and pyxel-mcp. | Open |

---

## 2. Community Demand Trends

**From Issues, the highest-demand directions are:**

- **Skill-creator reliability** — Multiple issues (#556, #1169, #1061, #1099, #1050, #1323, #1261) report that `run_eval.py` and `run_loop.py` fail on Windows, report 0% recall, and pollute live project registries. The community urgently needs a robust, cross-platform evaluation harness.

- **Quality & security meta-tools** — Requests for audit capabilities appear repeatedly: #492 (namespace trust boundary abuse), #1385 (reasoning quality gate pipeline), #1487 (token exhaustion from eager injection), and #1329 (compact-memory symbolic state). Users want skills that analyze and govern skills.

- **Document & enterprise formats** — Strong interest in production-grade document handling: #514 (typography), #486 (ODT), #541 (DOCX tracked changes), and #538 (PDF case fixes).

- **Testing & validation** — #723 (testing-patterns) and #83 (skill-quality-analyzer) signal demand for built-in verification standards.

- **Cross-platform & interoperability** — #29 (AWS Bedrock), #16 (expose as MCPs), and #228 (org-wide sharing) show users want skills to work across runtimes and distribution channels.

---

## 3. High-Potential Pending Skills

**Active PRs with strong community interest:**

- **[#1367](https://github.com/anthropics/skills/pull/1367)** — *self-audit* skill (mechanical verification + four-dimension reasoning quality gate). Addresses a gap in automated output validation.

- **[#1302](https://github.com/anthropics/skills/pull/1302)** — *color-expert* skill covering color spaces, naming systems, and accessibility. Fills a niche in design workflows.

- **[#1479](https://github.com/anthropics/skills/pull/1479)** — *plan-file-hygiene* skill. Directly responds to #1417 about lifecycle management of planning artifacts.

- **[#83](https://github.com/anthropics/skills/pull/83)** — *skill-quality-analyzer* and *skill-security-analyzer*. Proposed two years ago, still open; aligns with current security and quality trends.

---

## 4. Skills Ecosystem Insight

The community’s most concentrated demand is for **reliable, cross-platform meta-tooling that audits, validates, and secures skills** — with particular urgency around fixing `skill-creator`’s broken evaluation loop and preventing trust-boundary abuse in community-contributed skills.

---

# Claude Code Community Digest — 2026-08-04

## Today's Highlights
Claude Code v2.1.221 shipped today with a new VSCode Focus view to declutter tool activity, plus Linux sandbox credential masking support. Multiple high-severity open issues surfaced today, including a VSCode extension credit-blocking bug for Fable 5 users, a Windows 11 GPU crash tied to Opus 5 in-page actions, and a terminal mode message queue stall affecting macOS 26.6 users.

## Releases
### v2.1.221
- Added VSCode Focus view: a chat-menu toggle (shortcut `Ctrl+Alt+F` / command "Claude Code: Toggle Focus view") that hides tool activity behind expandable per-turn summaries, with a live running-tool indicator for active tasks
- Added `mode: "mask"` option for sandbox credential files on Linux to improve secret handling security
- No other new releases were published in the last 24 hours.

## Hot Issues
1. [CLOSED] Regression: Native team-management tools (TeamCreate/TeamDelete) broken in v2.1.178 (#68721)  
   Why it matters: Breaks core enterprise team collaboration workflows for users relying on native team management features.  
   Community reaction: 18 comments, 7 upvotes, confirmed regression from v2.1.177, resolved in a subsequent release.  
   Link: https://github.com/anthropics/claude-code/issues/68721
2. [OPEN] VSCode extension blocks Fable 5 access with false credit error for Max plan users (#79441)  
   Why it matters: Prevents eligible paying users from accessing high-tier model features, with no workaround for affected accounts.  
   Community reaction: 14 comments, 12 upvotes, high frustration from users with remaining weekly Fable allowance.  
   Link: https://github.com/anthropics/claude-code/issues/79441
3. [OPEN] Windows 11 GPU crash corrupts MSIX package during Opus 5 in-page browser actions (#81159)  
   Why it matters: Causes immediate Claude Desktop crashes and broken installs requiring manual cleanup for Windows users running Opus 5.  
   Community reaction: 11 comments, multiple reports of data loss from corrupted packages.  
   Link: https://github.com/anthropics/claude-code/issues/81159
4. [OPEN] GitHub repos missing from Claude Code web repo picker despite desktop app install (#60493)  
   Why it matters: Breaks the core workflow of selecting repositories for work in the browser-based Claude Code

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

[LLM fallback] stepfun returned an empty response.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest
**Date: 2026-08-04**

---

## Today's Highlights
August 4, 2026 activity is dominated by critical stability, security, and model support updates for the Gemini CLI. Key changes include fixes for long-standing agent hang issues, new support for Gemini 3.6 Flash/3.5 Flash-Lite and local OpenAI-compatible endpoints, and urgent security patches for authentication and OAuth flows. Multiple high-priority bugs impacting subagent behavior, shell execution, and session memory are also actively being triaged by maintainers.

---

## Releases
No new stable or nightly releases were published in the last 24 hours.

---

## Hot Issues
1. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409) [P1] Generalist agent hangs**
   The generalist subagent hangs indefinitely on even simple tasks like folder creation, forcing users to manually disable subagents as a workaround. It has 8 upvotes and 8 comments, with multiple users confirming the issue across versions, and is marked for retesting.
2. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) [P1] Subagent recovery after MAX_TURNS reported as GOAL success**
   Subagents report false `success` status and `GOAL` termination reasons when hitting turn limits before completing work, leading to silent failures in multi-step tasks. It has 12 comments, with active discussion around fixing termination reporting logic.
3. **[#25166](https://github.com/google-gemini/gemini-cli/issues/25166) [P1] Shell command execution stuck with "Waiting input" after completion**
   Core shell execution functionality is broken, with tasks marked as active and awaiting input long after they finish, blocking subsequent operations. It has 3 upvotes and multiple user reports.
4. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983) [P1] Browser subagent fails in Wayland**
   The browser automation subagent fails for Linux users running the Wayland display server, limiting the feature's usability for a growing user base. It is marked for retesting.
5. **[#24353](https://github.com/google-gemini

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest
**Date: 2026-08-04**

## Today's Highlights
Copilot CLI v1.0.78 shipped on 2026-08-03, adding live right-aligned tool call duration headers, automatic first-party plugin updates, an experimental `/new-worktree` command, and a fix for local desktop login defaulting to the browser flow. Multiple high-priority bugs were reported in the last 24 hours, including a regression breaking plugin-provided slash commands, a WSL2 keyboard input mapping issue, and an enterprise managed-settings validation error that blocks custom MCP servers.

## Releases
### v1.0.78 (2026-08-03)
- **Added**: Timeline headers for tool calls lasting 5+ seconds, displayed right-aligned and ticking live during execution; opt out via `/settings showToolDurations`
- **Improved**: First-party plugins now automatically update to the latest version at session start
### v1.0.78-3 (2026-08-03)
- **Added**: Experimental `/new-worktree` command to create a new git worktree and start a fresh conversation in it
- **Improved**: Interactive shell shortcut now launches on Enter and displays an inline hint when the "$" input prefix is armed
- **Fixed**: Copilot login now defaults to the browser flow for local desktop installs

## Hot Issues
Top 10 most discussed issues from the last 24 hours, ordered by comment count:
1. [#2692 [CLOSED] Web Search tool (github-mcp-server) error](https://github.com/github/copilot-cli/issues/2692) (6 comments, 2👍): A closed bug where the GitHub MCP server threw Streamable HTTP errors when executing web search tasks. Community reaction confirmed the issue impacted Reddit search and other web search workflows.
2. [#4328 [OPEN] Ctrl+H misinterpreted as Ctrl+Backspace under WSL2](https

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI Community Digest | 2026-08-04

## Today's Highlights
No new Kimi Code CLI releases were published in the last 24 hours. Active development and community activity focused on ACP protocol improvements, Windows-specific bug fixes, and subprocess environment standardization, with 2 new issues and 1 new PR opened today. Several long-running PRs addressing core CLI reliability and Web UI stability also received updates.

## Releases
No new releases were published in the last 24 hours.

## Hot Issues
1. [#1283: Feature Request: Memory System - Persistent context across sessions](https://github.com/MoonshotAI/kimi-cli/issues/1283)  
   Why it matters: Proposes a comprehensive persistent memory system (AI-managed automatic notes + user-defined manual instructions) to enable cross-session context retention, drastically improving workflow continuity for long-term projects. Community reaction: High engagement with 16 comments, reflecting strong user demand for persistent project and preference storage.
2. [#2573: Bug: Web UI "Connecting to session..." infinite spinner when switching sessions](https://github.com/MoonshotAI/kimi-cli/issues/2573)  
   Why it matters: Breaks core functionality of the technical preview Web UI, making session navigation impossible for users relying on the browser-based interface. Community reaction: Reported by a macOS 26.4 arm64 user on kimi-cli 1.48.0, with 1 comment and no widespread reports yet, but poses a critical usability barrier for Web UI users.
3.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest | 2026-08-04

## Today's Highlights
Two consecutive bugfix releases (v1.18.12 and v1.18.13) shipped within 24 hours, addressing critical Azure model reasoning failures, right-to-left UI layout gaps, TUI pull request context omissions, and desktop composer lag for large attachments. High-activity community discussions remain focused on TUI core usability, hosted Zen API reliability, and edge-case agent behavior, with multiple open issues drawing strong community engagement.

## Releases
### v1.18.13
- TUI bugfix: Pull request reviews now include the pull request number and URL in context
- Desktop bugfixes: Resolved right-to-left layout issues across tabs, drawers, resizing, and titlebar interactions, plus fixed shared directional icon behavior for RTL interfaces
Release link: https://github.com/anomalyco/opencode/releases/tag/v1.18.13

### v1.18.12
- Core bugfix: Fixed Azure GPT-5.5+ completion requests failing when reasoning is enabled (credit: @frederiknsgo)
- Desktop bugfixes: Reduced composer lag for drafts with large pasted images or attachments; fixed project search to match any known recent project instead of only the first five results
Release link: https://github.com/anomalyco/opencode/releases/tag/v1.18.12

## Hot Issues
1. **#4283 [OPEN] Copy To Clipboard is not working** (117 comments, 109 upvotes): Long-running high-impact TUI bug where selected response text fails to copy to clipboard across all operating systems, breaking a core user workflow. https://github.com/anomalyco/opencode/issues/4283
2. **#25270 [OPEN] Bug: Model generates identical response twice** (24 comments, 4 upvotes): Core agent loop bug causing duplicate LLM responses, wasting tokens and degrading output reliability. Active community discussion on root cause isolation. https://github.com/anomalyco/opencode/issues/25270
3. **#17505 [CLOSED] session/update notifications sent after session/prompt response** (15 comments, 10 upvotes): ACP provider integration bug that caused third-party clients to finalize turns with incomplete content, breaking OpenCode integrations with external tools. Recently resolved via PR #40422. https://github.com/anomalyco/opencode/issues/17505
4. **#10884 [OPEN] [FEATURE]: Add Support for MCP Apps in the desktop app** (11 comments, 44 upvotes): High-demand feature request to support the stable Model Context Protocol Apps specification, aligning OpenCode with emerging agent ecosystem standards. 44 upvotes signal strong user demand. https://github.com/anomalyco/opencode/issues/10884
5. **#39827 [OPEN] [Zen] AuthError: "Request blocked by upstream provider"** (8 comments, 4 upvotes): Service-breaking bug rendering all Zen models unusable for affected users, with direct provider API keys working as a workaround, pointing to a Zen platform-side outage. https://github.com/anomalyco/opencode/issues/39827
6. **#31217 [OPEN] [BUG] TUI prompt input fail on Enter** (7 comments, 3 upvotes): TUI usability bug where pressing Enter after typing a prompt swallows input without submission, breaking core CLI/TUI interaction for both English and Chinese input. https://github.com/anomalyco/opencode/issues/31217
7. **#17076 [OPEN] CLI/TUI multi-file apply_patch approval only shows first file diff** (5 comments, 19 upvotes): Code review usability gap where multi-file patch approvals only display one file's diff, forcing users to miss changes in other modified files. High upvote count reflects strong developer need. https://github.com/anomalyco/opencode/issues/17076
8. **#32852 [OPEN] TUI sidebar "Modified Files" section does not show session diffs** (4 comments, 3 upvotes): Regression bug where the sidebar fails to display file changes made during a session, removing visibility into agent code edits. https://github.com/anomalyco/opencode/issues/32852
9. **#18213 [OPEN] Sub-agent in plan mode bypasses restrictions after compaction** (4 comments, 1 upvote): Control/security bug where plan mode's read-only restrictions are violated after sub-agent context compaction, allowing unintended file modifications. https://github.com/anomalyco/opencode/issues/18213
10. **#38723 [OPEN] `opencode run` intermittently hangs during init** (3 comments, 1 upvote): Reliability bug with a 56% observed failure rate where the run command hangs indefinitely with no output or error, breaking CI/automation workflows. https://github.com/anomalyco/opencode/issues/38723

## Key PR Progress
1. **#40422 [CLOSED] fix(acp): drain updates before end turn**: Resolves #17505 by waiting for the backing session to emit idle status before returning ACP prompt responses, fixing incomplete content delivery to ACP clients. https://github.com/anomalyco/opencode/pull/40422
2. **#40410 [CLOSED] feat(app): RTL layout interactions**: Comprehensive right-to-left UI support, mirroring titlebar controls, diff navigation, file trees, tabs, menus, and resize hit zones for RTL language users, paired with the v1.18.13 desktop RTL bugfixes. https://github.com/anomalyco/opencode/pull/40410
3. **#40427 [OPEN] some experimental perf improvements**: Experimental renderer performance pass that eliminated renderer-blocking tasks over 50ms on Home startup across consecutive test runs, targeting desktop UI responsiveness. https://github.com/anomalyco/opencode/pull/40427
4. **#20491 [OPEN] [contributor] feat(opencode): add Kiro provider**: Adds AWS Kiro as a bundled provider via the opencode-kiro plugin, expanding the supported model ecosystem. https://github.com/anomalyco/opencode/pull/20491
5. **#40426 [OPEN] fix(plugin): skip mismatched kind in readV1Plugin detect mode**: Fixes plugin detection logic to skip mismatched plugin kinds, resolving server plugin loader edge cases (closes #31610). https://github.com/anomalyco/opencode/pull/40426
6. **#28326 [OPEN] feat(server): runtime base path support for reverse proxy deployments**: Adds `--base-path` flag and `server.basePath` config to support running opencode web behind reverse proxies, improving deployment flexibility. https://github.com/anomalyco/opencode/pull/28326
7. **#40030 [OPEN] feat(tui): add spinnerVerbs config to customize TUI spinner text**: Adds `spinner_verbs` config option for `.opencode/tui.json` to let users customize loading spinner text. https://github.com/anomalyco/opencode/pull/40030
8. **#40415 [OPEN] [contributor] fix(tui): include model variants in assistant footer**: Fixes assistant message metadata and exported transcripts to display persisted non-default model variants alongside model names. https://github.com/anomalyco/opencode/pull/40415
9. **#40403 [OPEN] feat(session): auto-compact stale sessions resumed after idle**: Adds automatic session compaction for stale long-running sessions resumed after idle, eliminating the cost of re-sending full session prefixes every turn. https://github.com/anomalyco/opencode/pull/40403
10. **#40216 [OPEN] [needs:compliance] feat(opencode): let tools opt into strict mode**: Adds a `strict?: boolean` field to tool definitions, letting individual tools request strict mode instead of relying solely on provider-level settings, improving tool reliability. https://github.com/anomalyco/opencode/pull/40216

## Feature Request Trends
The most requested feature directions from community issues are:
1. TUI customization and usability: Requests for sidebar default state configuration, mouse capture disable for terminal multiplexer compatibility, extended session history access beyond the 100-session/30-day limit, and core interaction fixes (clipboard, Enter key submission)
2. Expanded model and provider support: Demand for MCP Apps integration, new provider support (Kiro, QVAC, Poolside), and fixes for incorrect model routing on the Zen platform
3. Agent control and observability: Requests for plan mode restriction enforcement, multi-file patch review visibility, session diff tracking in the sidebar, and sub-agent behavior controls
4. Deployment flexibility: Support for reverse proxy deployments and local provider integrations for self-hosted use cases

## Developer Pain Points
Recurring frustrations reported across issues include:
1. TUI core usability gaps: Interaction bugs (Enter key input swallowing, clipboard copy failure, mouse capture breaking terminal multiplexer copy/paste) and missing customization options are the most frequently reported pain points, with the clipboard bug alone drawing 117 comments.
2. Agent behavior edge cases: Duplicate responses, plan mode restriction bypasses after context compaction, and incomplete ACP notifications break trust in agent output and third-party integrations.
3. Zen API reliability: Recurring auth errors, incorrect model routing (deepseek-v4-flash returning outdated V3.2), and UTF-8 streaming corruption for non-English text impact users relying on the hosted Zen platform.
4. Desktop UI regressions: Right-to-left layout issues, sidebar modified files not updating, and composer lag with large attachments degrade the desktop app experience for power users.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

[LLM fallback] stepfun returned an empty response.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar).*