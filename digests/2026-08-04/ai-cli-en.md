# AI CLI Tools Community Digest 2026-08-04

> Generated: 2026-08-04 14:49 UTC | Tools covered: 7

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

### 1. fix(skill-creator): run_eval.py always reports 0% recall
- **PR #1298** — [Link](https://github.com/anthropics/skills/pull/1298)
- **Functionality**: Fixes a critical bug in the skill evaluation pipeline where `run_eval.py` always reports 0% recall, breaking the description-optimization loop.
- **Discussion highlights**: Multiple independent reproductions; addresses Windows stream reading, trigger detection, and parallel workers.
- **Status**: Open

### 2. Add document-typography skill
- **PR #514** — [Link](https://github.com/anthropics/skills/pull/514)
- **Functionality**: Provides typographic quality control for AI-generated documents, preventing orphan word wraps, widow paragraphs, and numbering misalignment.
- **Discussion highlights**: Addresses a universal pain point in document generation.
- **Status**: Open

### 3. fix(pdf): correct case-sensitive file references in SKILL.md
- **PR #538** — [Link](https://github.com/anthropics/skills/pull/538)
- **Functionality**: Fixes 8 case-sensitivity mismatches in the PDF skill that break on case-sensitive filesystems.
- **Discussion highlights**: Simple but critical cross-platform compatibility fix.
- **Status**: Open

### 4. Add ODT skill
- **PR #486** — [Link](https://github.com/anthropics/skills/pull/486)
- **Functionality**: Enables creation, template filling, reading, and conversion of OpenDocument Format files (.odt, .ods).
- **Discussion highlights**: Expands support beyond proprietary formats; requested by users needing open-standard document workflows.
- **Status**: Open

### 5. Improve frontend-design skill clarity and actionability
- **PR #210** — [Link](https://github.com/anthropics/skills/pull/210)
- **Functionality**: Revises the frontend-design skill to be more specific, actionable, and coherent within a single conversation.
- **Discussion highlights**: Focus on token efficiency and reducing educational tone.
- **Status**: Open

### 6. Add skill-quality-analyzer and skill-security-analyzer
- **PR #83** — [Link](https://github.com/anthropics/skills/pull/83)
- **Functionality**: Two meta-skills that evaluate Claude Skills across structure, documentation, security, and more.
- **Discussion highlights**: Early proposal for automated skill vetting and marketplace health.
- **Status**: Open

### 7. feat(skills): add self-audit
- **PR #1367** — [Link](https://github.com/anthropics/skills/pull/1367)
- **Functionality**: Audits AI output before delivery via mechanical file verification and four-dimension reasoning quality checks.
- **Discussion highlights**: Universal, model-agnostic quality gate aligned with governance trends.
- **Status**: Open

### 8. Add pyxel skill for retro game development
- **PR #525** — [Link](https://github.com/anthropics/skills/pull/525)
- **Functionality**: Adds a skill for the Pyxel retro game engine, covering workflow from creation to iterative testing.
- **Discussion highlights**: Popular creative coding use case; demonstrates skill versatility.
- **Status**: Open

---

## 2. Community Demand Trends

From Issues, the most-anticipated new Skill directions are:

- **Testing & Quality Assurance**: Strong demand for a dedicated `testing-patterns` skill and automated quality analysis tools (#723 PR, #189, #83).
- **Workflow Automation & Integration**: Requests for org-wide skill sharing (#228), exposing skills as MCPs (#16), and AWS Bedrock compatibility (#29).
- **Documentation & Format Support**: ODT support (#486), typographic control (#514), and SharePoint integration (#1175).
- **Security & Governance**: Proposals for agent-governance (#412) and concerns about namespace trust boundaries (#492).
- **Cross-Platform Reliability**: Windows compatibility (#1061) and case-sensitivity fixes (#538) are recurring pain points.

---

## 3. High-Potential Pending Skills

These active PRs have clear utility and may land soon:

- **document-typography** (#514) — Solves universal typographic issues in generated documents.
- **ODT** (#486) — Fills the open-standard document gap.
- **testing-patterns** (#723) — Comprehensive testing guidance for modern stacks.
- **color-expert** (#1302) — Authoritative color science knowledge for design tasks.
- **plan-file-hygiene** (#1479) — Addresses planning artifact accumulation with a lifecycle management skill.
- **self-audit** (#1367) — Reasoning quality gate for AI output.
- **skill-quality-analyzer / skill-security-analyzer** (#83) — Meta-tools for skill ecosystem health.

All are currently **Open** and under community review.

---

## 4. Skills Ecosystem Insight

The community's most concentrated demand is for robust, well-documented, cross-platform compatible skills with built-in quality, security, and testing guarantees—moving the ecosystem from experimental to production-ready.

---

## Claude Code Community Digest — 2026-08-04

### 1. Today's Highlights
Claude Code v2.1.221 shipped with a new VSCode Focus view toggle and Linux sandbox credential masking. The community remains intensely focused on reliability concerns: silent transcript deletion, session limit accounting errors, and a reported measurable quality regression in Generation 5 models are driving significant discussion.

### 2. Releases
**v2.1.221** (2026-08-04)  
- [VSCode] Added Focus view: a chat-menu toggle that hides tool activity behind an expandable per-turn summary with a live running-tool indicator (`Ctrl+Alt+F` or the "Claude Code: Toggle Focus view" command).  
- Added `mode: "mask"` for sandbox credential files on Linux.

### 3. Hot Issues
**#28729 — Link a source control repo as the source for organization skills**  
[36 comments, 84 👍]  
Proposal to allow organization skills to be sourced directly from a git repository rather than only local/manual uploads. Strong community support; discussion centers on permission granularity and sync conflict resolution.  
🔗 https://github.com/anthropics/claude-code/issues/28729

**#23626 — Support diff comparison against branches other than main**  
[36 comments, 111 👍]  
Requests the ability to generate diffs against arbitrary branches, not just `main`. Highly upvoted workflow enhancement for code review and parallel development.  
🔗 https://github.com/anthropics/claude-code/issues/23626

**#59248 — Silent retention cleanup deletes session transcripts with no warning, opt-in, or recovery**  
[29 comments, 18 👍]  
Critical data-loss bug: retention policies are purging conversation transcripts without user consent or recovery path. Affects Cursor extension and CLI; users lose ability to resume or audit prior sessions. Tagged `data-loss`; community demands immediate configurable retention controls.  
🔗 https://github.com/anthropics/claude-code/issues/59248

**#82506 — Possible Claude Max usage bug: session limit consumed without using**  
[13 comments, 6 👍]  
Users on Claude Max plan report that session quotas are being deducted even when no active usage occurs, suggesting a billing-metering defect.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

## OpenAI Codex Community Digest – 2026-08-04

### Today's Highlights
Multiple alpha releases of the Rust-based Codex CLI landed in the last 24 hours (v0.147.0-alpha.1.2 through alpha.7), while the community actively debated token consumption, rate limits, and Windows stability. Several merged PRs improved MCP namespace handling, skill loading, and secret redaction in app-server command execution.

### Releases
- **rust-v0.147.0-alpha.7**, **rust-v0.147.0-alpha.6.1**, **rust-v0.147.0-alpha.6**, **rust-v0.147.0-alpha.1.2** – Incremental alpha builds with ongoing refinements.

### Hot Issues
| Issue | Why It Matters | Community Reaction | Link |
|-------|----------------|--------------------|------|
| **\#14593** – Burning tokens very fast | Users report extreme token usage across Business/Pro tiers on VS Code/Windows. | 628 comments, 283 👍 | [\#14593](https://github.com/openai/codex/issues/14593) |
| **\#35058** – Codex Diff crashes in VS Code on macOS | Diff view unusable after edits; affects all repos. | 50 comments, 122 👍 | [\#35058](https://github.com/openai/codex/issues/35058) |
| **\#9508** – Make Weekly Limit Reset Deterministic | Rate-limit reset timing is unpredictable, breaking budgeting. | 48 comments, 32 👍 | [\#9508](https://github.com/openai/codex/issues/9508) |
| **\#17827** – Customizable status line | Request for TUI status line (tokens, model, branch) like Claude Code. | 38 comments, 143 👍 | [\#17827](https://github.com/openai/codex/issues/17827) |
| **\#26234** – Flatten MCP namespace tools for non-OpenAI providers | MCP tools from Ollama/LM Studio/OpenRouter are uncallable. | 31 comments, 41 👍 | [\#26234](https://github.com/openai/codex/issues/26234) |
| **\#20730** – Custom pets fail in WSL | Path normalization breaks custom pets on Windows/WSL. | 20 comments, 24 👍 | [\#20730](https://github.com/openai/codex/issues/20730) |
| **\#19262** – `gh auth status` misreported as invalid | CLI 0.124.0 breaks GitHub auth detection inside sessions. | 18 comments, 18 👍 | [\#19262](https://github.com/openai/codex/issues/19262) |
| **\#31987** – Auto-recharge toggle resets on credit purchase | UI automatically re-enables auto-recharge after buying credits. | 17 comments, 4 👍 | [\#31987](https://github.com/openai/codex/issues/31987) |
| **\#28080** – Desktop thread tools lose handlers | Intermittent “No handler registered” in active Windows sessions. | 15 comments, 2 👍 | [\#28080](https://github.com/openai/codex/issues/28080) |
| **\#34227** – Windows pet overlay hit region desyncs | Mascot overlay interaction area drifts from visible image. | 13 comments, 1 👍 | [\#34227](https://github.com/openai/codex/issues/34227) |

### Key PR Progress
| PR | Summary | Link |
|----|---------|------|
| **\#36901** | Propagate updated permissions to review threads; inherit approval policy. | [\#36901](https://github.com/openai/codex/pull/36901) |
| **\#36900** | Register app tools independently of connector list; enforce model-visibility. | [\#36900](https://github.com/openai/codex/pull/36900) |
| **\#36898** | Reuse directory-entry file types to avoid redundant filesystem metadata probes. | [\#36898](https://github.com/openai/codex/pull/36898) |
| **\#36895** | Treat late MCP startup results after lag timeout as not cancelled. | [\#36895](https://github.com/openai/codex/pull/36895) |
| **\#36893** | Redact secrets from `commandExecution.command` and `commandActions`. | [\#36893](https://github.com/openai/codex/pull/36893) |
| **\#36892** | Support leaf models in multi-agent v2; expose collaboration tools only to supported models. | [\#36892](https://github.com/openai/codex/pull/36892) |
| **\#36884** | Add host skill root loading; discover skills from canonical host roots. | [\#36884](https://github.com/openai/codex/pull/36884) |
| **\#36882** | Preserve complete MCP namespace descriptions; raise limit to 512 KiB. | [\#36882](https://github.com/openai/codex/pull/36882) |
| **\#36880** | Move direct executor skill discovery into the skills extension. | [\#36880](https://github.com/openai/codex/pull/36880) |
| **\#36877** | Move executor skill bundle loading into the skills extension; unify parsing. | [\#36877](https://github.com/openai/codex/pull/36877) |

### Feature Request Trends
- **TUI/UX enhancements**: customizable status line (tokens, model, branch), pinned conversations within groups.
- **Rate limit control**: deterministic weekly reset, opt-in full 1.05M context window, configurable compaction for GPT-5.6 Sol.
- **CLI automation**: opt-in automatic updates for Codex CLI.
- **MCP interoperability**: flatten namespaces for non-OpenAI providers; support custom tools in namespaces.
- **Observability**: map `codex-auto-review` metrics to official model pricing.

### Developer Pain Points
- **Windows instability**: numerous bugs (pet overlay, remote control, window management, thread handlers, TUI rendering).
- **Token consumption**: rapid burning without clear accounting (#14593).
- **Rate-limit unpredictability**: weekly resets and auto-recharge toggle behavior.
- **MCP tooling gaps**: namespaced tools inaccessible on local/gateway endpoints.
- **Context/performance**: frequent auto-compaction, UI freezes, high GPU/CPU on macOS.
- **Path handling**: WSL path normalization breaks custom assets.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-08-04

## Today’s Highlights
No new releases were published in the last 24 hours. Community attention remains concentrated on agent reliability, with high-volume discussion around subagent timeout handling, memory system security, and shell execution stability. Notable contributions include new model support for Gemini 3.6 Flash and 3.5 Flash-Lite, plus critical fixes for session compression failures and quota-fallback context corruption.

## Releases
*None in the last 24 hours.*

## Hot Issues
- [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) — **Generalist agent hangs** (P1, 8👍, 8💬). The CLI freezes indefinitely when delegating to the generalist agent; users report hour-long hangs and must explicitly disable subagents to restore functionality. Highest community engagement this period.
- [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) — **Subagent recovery misreported as GOAL success** (P1, 2👍, 12💬). The `codebase_investigator` subagent reports `status: "success"` and `Termination Reason: "GOAL"` even after hitting `MAX_TURNS`, masking interruptions from users.
- [#27155](https://github.com/google-gemini/gemini-cli/issues/27155) — **PTY memory and file descriptor leak in ShellExecutionService** (P2, 6💬). Closed critical bug where long-running background shells (e.g., MCP servers) leaked `ptyProcess` and `headlessTerminal` instances when log streams failed to emit `end()`.
- [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) — **Gemini does not use skills and sub-agents autonomously** (P2, 6💬). The agent ignores custom skills and subagents unless explicitly instructed, reducing proactive tool use.
- [#26525](https://github.com/google-gemini/gemini-cli/issues/26525) — **Auto Memory logs content before redaction** (P2, 4💬). Security concern: transcripts are sent to the background extraction model before secrets are redacted, and existing skills may be logged.
- [#25166](https://github.com/google-gemini/gemini-cli/issues/25166) — **Shell command stuck on “Waiting input” after completion** (P1, 3👍, 4💬). Simple commands hang in the UI despite having finished execution.
- [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) — **Browser subagent fails in Wayland** (P1, 1👍, 4💬). The browser agent terminates unexpectedly under Wayland compositors.
- [#22186](https://github.com/google-gemini/gemini-cli/issues/22186) — **get-shit-done output hook causes crash** (P1, 3💬). Crash occurs near the end of output summarization.
- [#22093](https://github.com/google-gemini/gemini-cli/issues/22093) — **Subagents running without permission since v0.33.0** (P2, 3💬). Regression where subagents activate despite being disabled in configuration.
- [#24246](https://github.com/google-gemini/gemini-cli/issues/24246) — **400 error with >128 tools** (P2, 3💬). The agent fails when the tool count exceeds limits, with no smart scoping.

## Key PR Progress
- [#28681](https://github.com/google-gemini/gemini-cli/pull/28681) — **feat(core,cli): add support for SGLang and local OpenAI-compatible endpoints** (priority/p1, size/l). Adds model resolution and configuration for third-party local and SGL

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

[LLM fallback] stepfun returned an empty response.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI Community Digest | 2026-08-04

## Today's Highlights
On 2026-08-04, the Kimi Code CLI community saw active progress on ACP integration enhancements, with two related PRs updated to add mid-session model switching and permission mode controls for third-party ACP clients. The long-running persistent memory feature request (Issue #1283) was updated today, now with 17 community comments highlighting strong demand for cross-session context retention. A new Windows-specific input bug affecting Thai and other IME-based language input was also reported on the latest 0.31.1 release.

## Releases
No new Kimi Code CLI releases were published in the last 24 hours.

## Hot Issues
1. [Issue #1283: Feature Request: Memory System](https://github.com/MoonshotAI/kimi-cli/issues/1283)
   First proposed in February 2026, this feature would add persistent context retention across CLI sessions, including AI-managed project notes and user-defined custom instructions. It has accumulated 17 community comments as of today, indicating high engagement for reducing repetitive context input for recurring projects.
2. [Issue #2573: Web UI "Connecting to session..." infinite spinner when switching sessions](https://github.com/MoonshotAI/kimi-cli/issues/2573)
   Breaks core functionality of the technical preview Web UI, preventing users from switching between active sessions in the local web interface. Reported on version 1.48.0 for macOS arm64.
3. [Issue #2584: Thai (and other IME-based) characters duplicated when typing in the prompt on Windows](https://github.com/MoonshotAI/kimi-cli/issues/2584)
   A critical input regression on the latest stable 0.31.1 release for Windows 11, breaking usability for all users typing in non-Latin IME-based languages.
4. [Issue #2583: feat(acp): advertise available models and support mid-session model switching](https://github.com/MoonshotAI/kimi-cli/issues/2583)
   Would enable ACP client integrations (e.g. Zed, Happy Coder mobile app) to dynamically discover supported models and switch models mid-session without restarting the CLI, filling a key gap in third-party tool interoperability.
5. [Issue #2582: CLI stream hangs indefinitely during generation, session becomes unusable](https://github.com/MoonshotAI/kimi-cli/issues/2582)
   A critical stability bug for Windows users running the kimi-k2.7-code model, making CLI sessions completely unusable when generation hangs occur.

## Key PR Progress
1. [PR #2200: fix(shell): adapt timeouts for long commands](https://github.com/MoonshotAI/kimi-cli/pull/2200)
   Updated 2026-08-04. Automatically extends shell execution timeouts for known slow command patterns (git submodule cleanup, clone/fetch, package installs, builds) while retaining the 60s default for standard commands, and preserves explicit user-provided timeouts to resolve hanging issues during long-running development tasks.
2. [PR #2585: feat(cli): set AI_AGENT for subprocesses](https://github.com/MoonshotAI/kimi-cli/pull/2585)
   Created and updated 2026-08-04. Exposes the `AI_AGENT=kimi` environment variable to all subprocesses launched from both pip/uv and standalone binary entrypoints, with support for preserving explicitly set values from wrapper or orchestration tools to improve compatibility with external developer tooling.
3. [PR #2364: feat(acp): support permission mode switching](https://github.com/MoonshotAI/kimi-cli/pull/2364)
   Updated 2026-08-04. Adds protocol-level ACP permission mode switching for Kimi sessions, resolving issue #1414. It is designed to stack with the mid-session model switching PR (#2583) to deliver full ACP integration flexibility for third-party clients.

## Feature Request Trends
The most requested feature directions across open issues are:
1. ACP protocol expansion: High demand for enhanced ACP support including dynamic model discovery, mid-session model switching, and granular permission mode controls to enable seamless integration with third-party developer tools.
2. Persistent cross-session context: Strong interest in a built-in memory system that retains project patterns, user preferences, and useful context across CLI sessions to reduce repetitive manual input.
3. Cross-platform input stability: Repeated requests for fixes to input regressions, particularly for IME-based non-Latin languages on Windows.

## Developer Pain Points
Recurring frustrations reported by the community include:
1. Windows-specific stability gaps: Two separate high-impact issues (IME input duplication, indefinite generation stream hangs) affect Windows users on the latest stable release, breaking core input and generation functionality.
2. Web UI usability limitations: The technical preview Web UI has a critical bug blocking session switching, limiting its utility for local web-based workflows.
3. Limited ACP integration capabilities: Current ACP support lacks core functionality (model discovery, mid-session switching, permission controls) that prevents seamless use with popular third-party developer tools.
4. Lack of persistent context: Users must repeatedly input project-specific context and preferences for each new CLI session, creating friction for recurring development workflows.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest | 2026-08-04

## Today's Highlights
Two urgent patch releases (v1.18.12 and v1.18.13) were published today to address critical Azure model reasoning failures, right-to-left desktop UI layout bugs, and TUI pull request context gaps. The community also reported a spike in model unresponsiveness and stuck "thinking" states, particularly for DeepSeek v4 Flash and Zen provider models, while a months-old clipboard copy bug remains the highest-engagement open issue by far.

## Releases
- **v1.18.13** (2026-08-04)
  - TUI: Fixed GitHub pull request reviews to include pull request number and URL in context
  - Desktop: Resolved multiple right-to-left layout issues across tabs, drawers, resizing, and titlebar interactions, plus fixed shared RTL UI directional icon behavior
- **v1.18.12** (2026-08-04)
  - Core: Fixed Azure GPT-5.5+ completion requests failing when reasoning is enabled ([@frederiknsgo](https://github.com/frederiknsgo))
  - Desktop: Reduced composer lag when drafts include large pasted images or attachments; fixed project search to match any known recent project instead of only the first 5 results

## Hot Issues
1. [#4283: Copy To Clipboard is not working](https://github.com/anomalyco/opencode/issues/4283) (117 comments, 109 👍, OPEN)
   The highest-engagement open issue, affecting all TUI/desktop users attempting to copy response text. No workaround has been confirmed, and the bug has persisted since November 2025.
2. [#30086: High CPU usage in newer versions of OpenCode](https://github.com/anomalyco/opencode/issues/30086) (43 comments, 22 👍, OPEN)
   Severe performance regression that prevents users from running multiple concurrent sessions, a core use case for power users. Reports of laggy system performance and unusable multi-instance workflows.
3. [#40460: DeepSeek v4 Flash Model not responding](https://github.com/anomalyco/opencode/issues/40460) (4 comments, 5 👍, OPEN)
   High-urgency report for a popular free model: users report getting stuck on "thinking" with no output, no workaround, and no error messaging.
4. [#40465: deepseek-v4-flash on opencode-go drops connection before response](https://github.com/anomalyco/opencode/issues/40465) (2 comments, 3 👍, OPEN)
   Confirms the above issue is specific to the Go provider endpoint, with TCP connections closed pre-response, causing 30-second timeouts for all requests.
5. [#34087: Opencode not returning responses](https://github.com/anomalyco/opencode/issues/34087) (7 comments, 3 👍, OPEN)
   Users report input → thinking → no output across multiple models, rendering the app unusable for basic chat and agent workflows.
6. [#35689: DeepSeek silently stops executing (interleaved reasoning_content dropped in tool call messages)](https://github.com/anomalyco/opencode/issues/35689) (3 comments, 4 👍, OPEN)
   Root cause identified for mid-task agent exits when using DeepSeek thinking mode via OpenAI-compatible providers, breaking coding agent workflows for a widely used model family.
7. [#17076: CLI/TUI multi-file apply_patch approval only shows first file diff](https://github.com/anomalyco/opencode/issues/17076) (5 comments, 19 👍, OPEN)
   High-demand fix for agent code review workflows: users cannot approve multi-file patches in CLI/TUI mode, a core use case for automated coding agents.
8. [#40459: Opencode CLI not working](https://github.com/anomalyco/opencode/issues/40459) (2 comments, 2 👍, OPEN)
   Reports of no chat response in the latest 1.18.13 CLI version, impacting users who rely on terminal-based workflows.
9. [#40451: The models auto stop in middle](https://github.com/anomalyco/opencode/issues/40451) (2 comments, 0 👍, OPEN)
   Additional report of Zen models getting stuck on thinking and auto-stopping mid-task in 1.18.13, confirming a broader regression in the latest patch release.
10. [#40413: Experimental LSP tool returns empty results instead of initialization errors for nested Rust workspace](https://github.com/anomalyco/opencode/issues/40413) (3 comments, 0 👍, OPEN)
    Impacts Rust developers using the experimental LSP tool, as initialization failures are hidden as empty results instead of actionable error messages.

## Key PR Progress
1. [#40472: fix(opencode): preserve user request for skill slash commands](https://github.com/anomalyco/opencode/pull/40472) (OPEN)
   Fixes a bug where skill slash commands would drop the user's original request, breaking skill functionality. Cl

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest
*Date: 2026-08-04*

---

## 1. Today's Highlights
Qwen Code v0.21.5 is now generally available, introducing an opt-in one-time update bridge for macOS users migrating from the Electron desktop app to the new Tauri shell. Parallel active development focuses on bounded multi-workspace daemon resource usage, security fixes for provider warning sanitization, and desktop app binary signing improvements for upcoming Tauri releases.

---

## 2. Releases
| Version | Type | Key Changes |
|---------|------|-------------|
| v0.21.5 | General Availability | Ships the macOS Electron-to-Tauri migration bridge ([#8392](https://github.com/QwenLM/qwen-code/pull/8392)) |
| v0.21.4-nightly.20260804.d6f55a1c9 | Nightly | Includes in-progress work on detailed execution-specific outcome tracking for tool calls, plus ongoing bugfixes |

---

## 3. Hot Issues
Top 10 most-discussed issues updated in the last 24 hours:
1. **[#8102](https://github.com/QwenLM/qwen-code/issues/8102) [OPEN] proposal(core): deterministic tool-execution boundaries for a trustworthy agent runtime**
   17 comments | P3, core/security
   Why it matters: Proposes a core runtime security model that keeps LLMs outside the trust boundary, letting Qwen Code deterministically constrain, authorize, and observe model actions to reduce untrusted execution risk. The community is actively discussing incremental implementation approaches for production use cases.
2. **[#8519](https://github.com/QwenLM/qwen-code/issues/8519) [CLOSED] qwen code在tmux中闪屏严重**
   11 comments | P2, UI/Linux
   Why it matters: Affects a large user base that runs Qwen Code in tmux, with reports of near-constant flicker (1-2 times per second) that makes the CLI unusable. Multiple community reports confirm the issue across Linux environments.
3. **[#8051](https://github.com/QwenLM/qwen-code/issues/8051) [OPEN] tracking(serve): Bound multi-workspace daemon resource usage**
   9 comments | P2, core/daemon
   Why it matters: Current `qwen serve` daemons use count-only limits for workspaces and sessions, with no hard bounds on memory held by request bodies, WebSocket assembly, or in-flight operations, posing a risk of host resource exhaustion for production deployments.
4. **[#8136](https://github.com/QwenLM/qwen-code/issues/8136) [OPEN] Provider warning sanitizer truncates messages containing a port, and leaks a password containing `@`**
   6 comments | P2, CLI/security
   Why it matters: The `sanitizeProviderWarning` function has two critical flaws: it truncates warnings that include port numbers, and fails to fully strip passwords from URLs containing `@` characters, leading to credential leakage in `/status` payloads.
5. **[#8356](https://github.com/QwenLM/qwen-code/issues/8356) [OPEN] Bug: after APIUserAbortError, subsequent turns are not written to the local session transcript**
   5 comments | P2, session management
   Why it matters: When a user aborts a model turn, subsequent conversation turns are not persisted to local session transcripts, leading to lost work for users relying on session resume functionality. Reproduced across Windows and OpenAI-compatible endpoint configurations.
6. **[#8493](https://github.com/QwenLM/qwen-code/issues/8493) [OPEN] bug(core): cancelled file tools can still mutate files**
   5 comments | P2, core/file operations
   Why it matters: `write_file` and `edit` tools complete filesystem mutations even after their abort signal fires, due to async preparation work that runs outside the abort guard, leading to unintended file changes for cancelled operations.
7. **[#8470](https://github.com/QwenLM/qwen-code/issues/8470) [OPEN] 使用alibaba token plan时模型名过长**
   5 comments | P2, UI/model switching
   Why it matters: When using Alibaba token plans, model name prefixes are so long that they are fully truncated in the mobile Paseo client, making it impossible for users to identify which model they are selecting.
8. **[#8527](https://github.com/QwenLM

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar).*