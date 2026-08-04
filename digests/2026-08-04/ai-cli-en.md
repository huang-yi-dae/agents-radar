# AI CLI Tools Community Digest 2026-08-04

> Generated: 2026-08-04 14:02 UTC | Tools covered: 7

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

> LLM generation failed: StepFun request failed: Connection error.


---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

## 1. Top Skills Ranking

**PR #1298** – fix(skill-creator): run_eval.py always reports 0% recall  
- **Functionality**: Fixes a critical bug in the skill-creator evaluation pipeline where recall is always 0% due to incorrect artifact installation, Windows stream reading flaws, trigger detection failures, and parallel worker issues.  
- **Discussion Highlights**: Directly addresses the root cause of the broken description-optimization loop reported in multiple issues (#556, #1061, #1169, #1323).  
- **Status**: Open. [Link](https://github.com/anthropics/skills/pull/1298)

**PR #

---

# Claude Code Community Digest — 2026-08-04

## Today's Highlights
Claude Code v2.1.221 shipped with a new VSCode Focus view that collapses tool activity into per-turn summaries, plus Linux sandbox credential masking. Meanwhile, the community is actively debating a potential quality regression in Generation 5 models and several cross-platform bugs affecting VS Code extension hook dispatch and session persistence.

## Releases
**v2.1.221** — Released today.
- VSCode: Added Focus view (toggle with `Ctrl+Alt+F` or "Claude Code: Toggle Focus view" command) that hides tool activity behind expandable per-turn summaries with a live running-tool indicator.
- Linux: Added `mode: "mask"` for sandbox credential files.

## Hot Issues
1. **#23626** — [Support diff comparison against branches other than main](https://github.com/anthropics/claude-code/issues/23626) (36 comments, 111 👍)  
   Long-running feature request for comparing diffs against arbitrary branches. High community interest; remains open.

2. **#28729** — [Link a source control repo as the source for organization skills](https://github.com/anthropics/claude-code/issues/28729) (35 comments, 83 👍)  
   Users want organization skills versioned and managed via git repos instead of only server-managed settings. Strong demand.

3. **#80988** — [v2.1.219 injects `heron_brook` prompt section for Opus 5, overriding delegation policy](https://github.com/anthropics/claude-code/issues/80988) (16 comments, 35 👍)  
   A system-prompt section silently overrides user-configured AgentTool delegation policies with no opt-out, reported on Opus 5 only.

4. **#83510** — [Measurable quality regression in Claude generation 5](https://github.com/anthropics/claude-code/issues/83510) (5 comments, 5 👍)  
   Reports of worse nonsense detection, ~2x verbosity, and silent rerouting across Fable 5/Opus 5/Sonnet 5 with reproducible measurements.

5. **#83823** — [CLI 2.1.215 emits `tool_use` with empty input in stream-json](https://github.com/anthropics/claude-code/issues/83823) (1 comment)  
   Tools never execute when the CLI emits empty `input` objects; reported on macOS arm64 with claude-agent-sdk 0.2.128.

6. **#83828** — [PreToolUse Edit events not dispatched after compact/continuation](https://github.com/anthropics/claude-code/issues/83828) (1 comment)  
   In v2.1.220, `Edit` hook events stop firing after a compact boundary while `Write` events continue, breaking hook-based workflows.

7. **#83795** — [Model pinning is broken by design](https://github.com/anthropics/claude-code/issues/83795) (2 comments)  
   Four measured bypass vectors allow Sonnet 4.6 to be silently removed from the model menu despite pinning; flagged as a security/architecture concern.

8. **#80454** — [Web Remote Control renders peer-message authority envelope as chat bubble](https://github.com/anthropics/claude-code/issues/80454) (4 comments)  
   Internal security envelopes are exposed as visible chat bubbles on every teammate message when viewing sessions remotely via claude.ai/code.

9. **#79386** — [VS Code extension prompts for usage credits on Fable 5 despite Max plan entitlement](https://github.com/anthropics/claude-code/issues/79386) (4 comments)  
   Auth/billing integration bug where Max plan users are incorrectly prompted for credits.

10. **#67085** — [Desktop activity dashboard streak/heatmap credits session-start date](https://github.com/anthropics/claude-code/issues/67085) (10 comments)  
    Multi-day sessions incorrectly break streaks because the dashboard attributes all activity to the session start date rather than each active calendar day.

## Key PR Progress
1. **#83374** — [docs(plugin-dev): document MessageDisplay streaming semantics](https://github.com/anthropics/claude-code/pull/83374)  
   Adds `MessageDisplay` to the Hook Development skill trigger descriptions, event guidance, and quick-reference table.

2. **#83738** — [Fix/83484 symlink path expansion](https://github.com/anthropics/claude-code/pull/83738)  
   Ensures `claude install` creates the `~/.local/bin/claude` symlink from an expanded home directory path instead of a literal `%h` placeholder.

## Feature Request Trends
- **Branch & diff flexibility**: Multiple requests to compare against arbitrary branches and improve diff workflows.
- **Skills sourcing from Git**: Version-control organization skills via linked repositories.
- **Spell-check & input quality**: Native spellcheck in chat input and configurable language support.
- **Quota & cost controls**: Reserve quota for specific tasks and transparent cloud spend tracking.
- **Permission hardening**: Machine-level policies that override user/org settings for shared/HPC environments.

## Developer Pain Points
- **Model quality regressions**: Gen 5 models exhibit verbosity, nonsense, and silent rerouting, undermining trust.
- **VS Code extension instability**: Hook dispatch failures after compact, voice dictation ignoring language settings, and incorrect credit prompts.
- **Session & state persistence**: Sessions lost after restart in git worktrees, and session switcher forcing background jobs.
- **Cross-platform install issues**: Linux symlink breakage and Windows MSIX registration failures after cumulative updates.
- **Web Remote Control security exposure**: Internal authority envelopes rendered as visible UI artifacts.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**OpenAI Codex Community Digest – 2026-08-04**

---

### Today’s Highlights
A flurry of activity on the `openai/codex` repository today: four Rust alpha releases (0.147.0-alpha.1.2 through 0.147.0-alpha.7) shipped within the last 24 hours, while the community actively debated stability gaps on Windows/WSL, VS Code extension reliability, and parity between the desktop app and CLI. High-engagement issues and a wave of closed PRs signal focused progress on multi-agent v2, skill loading, and telemetry hygiene.

---

### Releases
- **rust-v0.147.0-alpha.1.2** – Patch alpha build.
- **rust-v0.147.0-alpha.6** – Alpha iteration.
- **rust-v0.147.0-alpha.6.1** – Follow-up patch.
- **rust-v0.147.0-alpha.7** – Latest alpha in the series.

All four were published in the last 24 hours; no detailed changelogs are attached, but the rapid alpha cadence suggests active development toward the next stable.

---

### Hot Issues
1. **[#35058](https://github.com/openai/codex/issues/35058)** – *Codex Diff crashes with “Oops, an error has occurred” in VS Code on macOS*  
   **Why it matters:** A showstopper for extension users; reproducible across all repos.  
   **Community reaction:** 122 👍, 50 comments; closed after community debugging.

2. **[#17827](https://github.com/openai/codex/issues/17827)** – *Customizable status line*  
   **Why it matters:** Users want real-time token/model/branch info in the TUI, mirroring Claude Code.  
   **Community reaction:** 143 👍, 38 comments; strong demand for configuration hooks.

3. **[#20730](https://github.com/openai/codex/issues/20730)** – *Custom pets fail to load in WSL environments due to path normalization*  
   **Why it matters:** Breaks a beloved personalization feature for Windows+WSL users.  
   **Community reaction:** 24 👍, 19 comments; path-handling bug across host/WSL boundary.

4. **[#31987](https://github.com/openai/codex/issues/31987)** – *Auto-recharge of credits keeps getting turned back on*  
   **Why it matters:** Unexpected billing behavior erodes trust in subscription management.  
   **Community reaction:** 4 👍, 17 comments; persistent toggle regression.

5. **[#19262](https://github.com/openai/codex/issues/19262)** – *Codex CLI 0.124.0 misreports `gh auth status` as invalid inside session*  
   **Why it matters:** Blocks GitHub workflow automation from within Codex.  
   **Community reaction:** 18 👍, 17 comments; environment variable propagation suspected.

6. **[#35119](https://github.com/openai/codex/issues/35119)** – *Windows][WSL] 26.721.3404 marks valid WSL repositories as non-Git*  
   **Why it matters:** Git integration failure in WSL2; regression after app server update.  
   **Community reaction:** 14 👍, 15 comments; version-specific breakage.

7. **[#28080](https://github.com/openai/codex/issues/28080)** – *Desktop thread tools intermittently lose handlers*  
   **Why it matters:** “No handler registered” errors disrupt long-running agent sessions.  
   **Community reaction:** 2 👍, 14 comments; hard-to-reproduce race condition.

8. **[#34227](https://github.com/openai/codex/issues/34227)** – *Windows pet overlay hit region desynchronizes from the visible mascot over time*  
   **Why it matters:** Visual polish regression; overlay misalignment degrades UX.  
   **Community reaction:** 1 👍, 13 comments; timing/DPI-related.

9. **[#25826](https://github.com/openai/codex/issues/25826)** – *Windows Desktop: maximized window spills onto adjacent monitors in multi-monitor setup*  
   **Why it matters:** Multi-monitor workspace usability issue for Windows power users.  
   **Community reaction:** 12 👍, 10 comments; window manager integration bug.

10. **[#35763](https://github.com/openai/codex/issues/35763)** – *Max reasoning effort is missing in the VS Code extension while available in Codex App*  
    **Why it matters:** Feature parity gap limits advanced reasoning control in IDE.  
    **Community reaction:** 2 👍, 8 comments; extension lag behind desktop app.

---

### Key PR Progress
1. **[#36892](https://github.com/openai/codex/pull/36892)** – *Support leaf models in multi-agent v2*  
   Allows parent agents to spawn any visible model unless multi-agent is explicitly disabled.

2. **[#36893](https://github.com/openai/codex/pull/36893)** – *Redact secrets from app-server command execution items*  
   Prevents sensitive data from appearing in live and completed command logs.

3. **[#36895](https://github.com/openai/codex/pull/36895)** – *Handle late MCP startup results after lag timeout*  
   Eliminates false interruption warnings when MCP servers start slowly.

4. **[#36884](https://github.com/openai/codex/pull/36884)** – *Add host skill root loading*  
   Discovers skills from canonical host roots while respecting `SkillScope` and symlinks.

5. **[#36882](https://github.com/openai/codex/pull/36882)** – *Preserve complete MCP namespace descriptions*  
   Raises namespace tool-spec description limit from 1,000 bytes to 512 KiB.

6. **[#36880](https://github.com/openai/codex/pull/36880)** – *Move direct executor skill discovery into the skills extension*  
   Centralizes skill discovery and namespace resolution.

7. **[#36877](https://github.com/openai/codex/pull/36877)** – *Move executor skill bundle loading into the skills extension*  
   Unifies `SKILL.md` frontmatter parsing for direct and pre-discovered loading.

8. **[#36862](https://github.com/openai/codex/pull/36862)** – *Consolidate thread spawning behind a request object*  
   Routes new, resumed, and forked threads through a unified `spawn_thread` path.

9. **[#36857](https://github.com/openai/codex/pull/36857)** – *Support custom tools in namespaces*  
   Enables custom freeform tools alongside function tools in namespaced specs.

10. **[#36830](https://github.com/openai/codex/pull/36830)** – *Time out stalled code-mode host requests*  
    Adds a 60-second transport deadline for `wait` and `terminate` to prevent hangs.

---

### Feature Request Trends
- **TUI/CLI configurability:** Customizable status lines and opt-in automatic CLI updates are the most requested enhancements.  
- **App ↔ Extension parity:** Users repeatedly ask for feature parity (e.g., max reasoning effort, browser plugin routes).  
- **Conversation organization:** Pinning threads within projects and better mobile queue persistence are emerging needs.  
- **Cross-platform consistency:** Windows/WSL path handling, terminal rendering, and multi-monitor behavior are frequent friction points.

---

### Developer Pain Points
- **Windows/WSL instability:** Git detection, pet overlay, TUI rendering, and sandbox setup issues dominate Windows-related complaints.  
- **VS Code extension reliability:** The Codex Diff crash (#35058) and missing max reasoning effort highlight extension lag behind the desktop app.  
- **Session and context management:** Context compacting, thread tool handler loss, and mobile queue disappearance cause user input loss.  
- **Performance on macOS:** High GPU/WindowServer CPU usage and sustained heat during normal operation.  
- **Connectivity edge cases:** SSH remote connections and LAN destination blocking on macOS interrupt remote workflows.  
- **Pasting diffs:** Automatic markdown conversion of pasted code snippets breaks code review workflows.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

[LLM fallback] stepfun returned an empty response.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

[LLM fallback] stepfun returned an empty response.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI Community Digest — 2026-08-04

## Today's Highlights
On August 4, 2026, the Kimi Code CLI community saw ongoing high engagement around a 5-month-old feature request for a persistent cross-session memory system, alongside two new bug reports for Windows IME input duplication and CLI stream hangs. Two in-progress PRs were updated today, including a fix for shell command timeouts for long-running operations and protocol-level ACP permission mode switching support, with a new PR also submitted to expose the AI_AGENT environment variable to subprocesses.

## Releases
No new Kimi Code CLI releases were published in the last 24 hours.

## Hot Issues
1. **[#1283] Feature Request: Persistent Memory System** (https://github.com/MoonshotAI/kimi-cli/issues/1283)
   *Why it matters*: Addresses a core workflow gap for users who need to retain project context, coding patterns, and personal preferences across CLI sessions, with support for both AI-managed automatic notes and user-defined manual instructions.
   *Community reaction*: High engagement with 16 comments over 5 months, indicating strong user demand for the feature.
2. **[#2573] Bug: Web UI infinite spinner when switching sessions** (https://github.com/MoonshotAI/kimi-cli/issues/2573)
   *Why it matters*: Breaks core session switching functionality for users of the Kimi Code CLI Web UI Technical Preview, a key interface for browser-based workflow.
   *Community reaction*: 1 comment reported shortly after the bug was filed on August 1, 2026.
3. **[#2584] Bug: Thai (and other IME-based) characters duplicated when typing in the prompt on Windows** (https://github.com/MoonshotAI/kimi-cli/issues/2584)
   *Why it matters*: Creates a critical usability barrier for non-Latin IME users on Windows, impacting accessibility for a global user base.
   *Community reaction*: Filed on August 4, 2026, with no comments yet, but high priority for international developers.
4. **[#2583] Feature Request: ACP model advertisement and mid-session model switching** (https://github.com/MoonshotAI/kimi-cli/issues/2583)
   *Why it matters*: Enables third-party ACP clients (e.g. Zed, Happy Coder mobile app) to discover available Kimi models and switch models mid-session without restarting, expanding integration flexibility for external developer tools.
   *Community reaction*: Filed on August 4, 2026, with no comments yet.
5. **[#2582] Bug: CLI stream hangs indefinitely during generation, session becomes unusable** (https://github.com/MoonshotAI/kimi-cli/issues/2582)
   *Why it matters*: Renders CLI sessions completely unusable when generation freezes, a high-severity stability issue for Windows users leveraging the Moonshot Platform API and kimi-k2.7-code model.
   *Community reaction*: Filed on August 3, 2026, with no comments yet.

## Key PR Progress
1. **[#2200] fix(shell): adapt timeouts for long commands** (https://github.com/MoonshotAI/kimi-cli/pull/2200)
   *Status*: Open, last updated August 4, 2026
   *Details*: Automatically extends shell timeouts for common slow command patterns (git submodule cleanup, git clone/fetch, package installs, builds) while retaining the 60s default for standard commands, and preserves explicit timeouts set by users.
2. **[#2585] feat(cli): set AI_AGENT for subprocesses** (https://github.com/MoonshotAI/kimi-cli/pull/2585)
   *Status*: Open, filed August 4, 2026
   *Details*: Exposes the `AI_AGENT=kimi` environment variable to subprocesses launched from both pip/uv and standalone binary entrypoints, with logic to preserve explicit non-blank values set by external wrappers or orchestrators.
3. **[#2364] feat(acp): support permission mode switching** (https://github.com/MoonshotAI/kimi-cli/pull/2364)
   *Status*: Open, last updated August 4, 2026
   *Details*: Adds protocol-level ACP permission mode switching for Kimi sessions, advertising default and custom permission modes to ACP clients. Depends on PR #2363, so will be reviewed and merged in sequence.

## Feature Request Trends
The most active feature directions center on two core areas:
1. **Long-term workflow continuity**: The highest-engagement feature request to date is for a persistent cross-session memory system, reflecting user demand for retained context across coding sessions to reduce repetitive context-setting.
2. **Expanded ACP interoperability**: Multiple recent requests target improvements to the Agent Communication Protocol (ACP) to support third-party developer tools, including model discovery, mid-session model switching, and permission mode controls.

## Developer Pain Points
Recurring frustrations and high-priority requests include:
1. **Input and accessibility gaps**: IME input duplication on Windows breaks workflows for non-Latin language users, a critical unaddressed accessibility issue.
2. **Stability issues**: Two high-severity bugs reported in the last 48 hours cause complete session unusability: indefinite CLI stream hangs during generation, and Web UI session switching freezes.
3. **Integration limitations**: Gaps in ACP protocol support prevent third-party tools from accessing core Kimi functionality, including model selection and permission configuration.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest | 2026-08-04

## Today's Highlights
Two patch releases (v1.18.12 and v1.18.13) shipped on 2026-08-04, resolving critical Azure GPT-5.5 reasoning completion failures, multiple right-to-left desktop UI layout bugs, and TUI context gaps for pull request reviews. The community remains highly engaged with long-running high-priority issues around clipboard functionality, CPU performance, and duplicate model responses, while active PRs target core session message ordering, ACP subagent visibility, and desktop startup performance.

## Releases
### v1.18.13
- **TUI Bugfixes**: Pull request reviews now include the pull request number and URL in context.
- **Desktop Bugfixes**: Fixed multiple right-to-left layout issues across tabs, drawers, resizing, and titlebar interactions, plus shared RTL UI directional icon behavior.
### v1.18.12
- **Core Bugfixes**: Fixed Azure GPT-5.5+ completion requests failing when reasoning is enabled (credit: @frederiknsgo).
- **Desktop Bugfixes**: Reduced composer lag when drafts include large pasted images or attachments; fixed project search to match any known recent project instead of only the first five.

## Hot Issues
1. [#4283 [OPEN] Copy To Clipboard is not working](https://github.com/anomalyco/opencode/issues/4283) (117 comments, 109 👍): Long-running high-impact TUI bug affecting all users, with widespread community frustration over broken basic text selection functionality.
2. [#30086 [OPEN] High CPU usage in newer versions of OpenCode](https://github.com/anomalyco/opencode/issues/30086) (43 comments, 22 👍): Severe performance regression that limits users to 2-3 concurrent sessions instead of 10+, with reported mouse lag and system slowdowns.
3. [#25270 [OPEN] Bug: Model generates identical response twice](https://github.com/anomalyco/opencode/issues/25270) (24 comments, 4 👍): Core model output bug that produces duplicate consecutive responses, breaking workflow reliability and wasting token quota.
4. [#17076 [OPEN] CLI/TUI multi-file apply_patch approval only shows first file diff](https://github.com/anomalyco/opencode/issues/17076) (5 comments, 19 👍): High-demand fix for agent workflow usability, as the current approval UI hides all but one file's diff for multi-file patch operations.
5. [#34087 [OPEN] OpenCode not returning responses](https://github.com/anomalyco/opencode/issues/34087) (7 comments, 3 👍): Critical desktop app failure where queries hang indefinitely after the "thinking" step with no output, breaking core chat functionality.
6. [#31217 [OPEN] [BUG] TUI prompt input fail on Enter](https://github.com/anomalyco/opencode/issues/31217) (7 comments, 3 👍): Core input bug that swallows typed prompts when pressing Enter, while slash commands continue to work, blocking basic TUI interaction.
7. [#38723 [OPEN] `opencode run` intermittently hangs during init](https://github.com/anomalyco/opencode/issues/38723) (3 comments, 1 👍): CLI reliability issue with a ~56% observed failure rate, where processes hang indefinitely before session creation with no error output, blocking automation and scripting use cases.
8. [#40409 [OPEN] `opencode run` intermittently hangs during init](https://github.com/anomalyco/opencode/issues/40409) (3 comments): Zen API model catalog mismatch where the `deepseek-v4-flash` endpoint returns V3.2 instead of the advertised V4 Flash 0731, creating billing and quality gaps for subscribers.
9. [#38266 [OPEN] opencode serve: local stdio MCP connection silently dropped mid-session](https://github.com/anomalyco/opencode/issues/38266) (1 comment): Breaks MCP tool integrations for `serve` + `attach` workflows, with no error logging for debugging.
10. [#39694 [OPEN] Zen API SSE streaming splits UTF-8 multi-byte characters causing garbled Chinese in third-party clients](https://github.com/anomalyco/opencode/issues/39694) (2 comments, 1 👍): Impacts internationalization for streaming API users, breaking non-ASCII text rendering in third-party clients.

## Key PR Progress
1. [#40450 [OPEN] fix(opencode): include cache writes in ACP usage](https://github.com/anomalyco/opencode/pull/40450): Fixes context usage reporting for ACP integrations to account for cache-write tokens, aligns calculation across ACP service paths, and includes regression tests.
2. [#40438 [OPEN] fix(acp): surface subagent activity](https://github.com/anomalyco/opencode/pull/40438): Fixes ACP subagent transcript loss by preserving events with non-matching session IDs, addressing the closed #17505 notification ordering bug.
3. [#40437 [OPEN] fix(core): fail steps with empty provider output after bounded retries](https://github.com/anomalyco/opencode/pull/40437): Fixes V2 session runner to mark reasoning-only turns (no visible text/tool calls) as failed instead of empty successful steps, improving error visibility.
4. [#40432 [OPEN] fix(session): order messages across ID rollover](https://github.com/anomalyco/opencode/pull/40432): Fixes session message ordering by using persisted creation time as primary sort key instead of message ID, resolving duplicate response bugs from non-monotonic ID comparison.
5. [#40327 [OPEN] feat(plugin): add session HTTP middleware](https://github.com/anomalyco/opencode/pull/40327): Adds Effect

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

[LLM fallback] stepfun returned an empty response.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar).*