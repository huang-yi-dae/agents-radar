# AI CLI Tools Community Digest 2026-08-04

> Generated: 2026-08-04 14:38 UTC | Tools covered: 7

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

## Claude Code Skills Community Highlights Report

### 1. Top Skills Ranking

**PR #1298** – [fix(skill-creator): run_eval.py always reports 0% recall](https://github.com/anthropics/skills/pull/1298)  
*Author: MartinCajiao | Created: 2026-06-10*  
Fixes a critical bug in the skill-creator evaluation pipeline where `run_eval.py` incorrectly reports 0% recall, rendering the description-optimization loop ineffective. Addresses Windows stream reading, trigger detection, and parallel worker issues. Status: Open.

**PR #514** – [Add document-typography skill](https://github.com/anthropics/skills/pull/514)  
*Author: PGTBoos | Created: 2026-03-04*  
Introduces typographic quality control for AI-generated documents, preventing orphan word wraps, widow paragraphs, and numbering misalignment. Status: Open.

**PR #538** – [fix(pdf): correct case-sensitive file references in SKILL.md](https://github.com/anthropics/skills/pull/538)  
*Author: Lubrsy706 | Created: 2026-03-06*  
Corrects eight case-sensitivity mismatches in the PDF skill’s SKILL.md (e.g., `REFERENCE.md` → `reference.md`), fixing breakage on case-sensitive file systems. Status: Open.

**PR #486** – [Add ODT skill](https://github.com/anthropics/skills/pull/486)  
*Author: GitHubNewbie0 | Created: 2026-03-01*  
Adds comprehensive support for OpenDocument Format (.odt, .ods) creation, template filling, and parsing to HTML. Triggers on mentions of ODT/ODF/LibreOffice. Status: Open.

**PR #210** – [Improve frontend-design skill clarity and actionability](https://github.com/anthropics/skills/pull/210)  
*Author: justinwetch | Created: 2026-01-05*  
Revises the frontend-design skill to be more actionable and internally coherent, ensuring instructions are executable within a single conversation. Status: Open.

**PR #83** – [Add skill-quality-analyzer and skill-security-analyzer](https://github.com/anthropics/skills/pull/83)  
*Author: eovidiu | Created: 2025-11-06*  
Adds two meta-skills: one evaluates skill quality across five dimensions (structure, examples, etc.), the other audits security aspects. Status: Open.

**PR #541** – [fix(docx): prevent tracked change w:id collision](https://github.com/anthropics/skills/pull/541)  
*Author: Lubrsy706 | Created: 2026-03-06*  
Prevents document corruption when the DOCX skill adds tracked changes to documents with existing bookmarks by avoiding hardcoded ID collisions. Status: Open.

**PR #539** – [fix(skill-creator): warn on unquoted description with YAML special characters](https://github.com/anthropics/skills/pull/539)  
*Author: Lubrsy706 | Created: 2026-03-06*  
Adds pre-parse validation to catch unquoted YAML frontmatter descriptions containing colons, preventing silent parsing failures. Status: Open.

---

### 2. Community Demand Trends

Issues reveal strong demand for:
- **Skill governance and security**: Requests for official namespace protection, skill security analyzers, and agent-governance patterns.
- **Enterprise integration**: Skills for SharePoint Online, AWS Bedrock compatibility, and org-wide skill sharing.
- **Meta-tooling**: Skills that audit, calibrate, or improve other skills (e.g., self-audit, reasoning quality gates).
- **Cross-platform robustness**: Windows compatibility fixes for skill-creator scripts remain a recurring pain point.
- **Memory and state efficiency**: Proposals for compact symbolic notation to reduce context window usage in long-running agents.

---

### 3. High-Potential Pending Skills

**PR #1479** – [Add plan-file-hygiene skill](https://github.com/anthropics/skills/pull/1479)  
*Author: Palo-Alto-AI-Research-Lab | Updated: 2026-07-27*  
Addresses the accumulation of planning artifacts by introducing a lifecycle management skill for plan files. Status: Open.

**PR #1302** – [Add color-expert skill](https://github.com/anthropics/skills/pull/1302)  
*Author: meodai | Updated: 2026-07-21*  
Provides comprehensive color expertise (ISCC-NBS, Munsell, OKLCH/OKLAB, etc.) with guidance on when to use specific color spaces and naming systems. Status: Open.

**PR #525** – [Add pyxel skill for retro game development](https://github.com/anthropics/skills/pull/525)  
*Author: kitao | Updated: 2026-07-15*  
Enables creation of retro/pixel-art games using the Pyxel engine via an MCP server, covering the full iterative development workflow. Status: Open.

**PR #1367** – [Add self-audit skill](https://github.com/anthropics/skills/pull/1367)  
*Author: YuhaoLin2005 | Updated: 2026-07-02*  
Implements a mechanical verification step followed by a four-dimension reasoning quality gate to audit AI output before delivery. Status: Open.

**PR #723** – [Add testing-patterns skill](https://github.com/anthropics/skills/pull/723)  
*Author: 4444J99 | Updated: 2026-04-21*  
Covers the full testing stack: philosophy (Testing Trophy), unit testing patterns, React component testing, and integration/E2E strategies. Status: Open.

---

### 4. Skills Ecosystem Insight

The community’s most concentrated demand is for robust, cross-platform skill-development tooling and meta-skills that ensure skill quality, security, and maintainability across diverse enterprise and creative workflows.

---

# Claude Code Community Digest — 2026-08-04

## Today's Highlights

Claude Code v2.1.221 shipped a new **Focus view** for VSCode that hides tool activity behind per-turn summaries, alongside Linux sandbox credential masking. Meanwhile, the community continues to surface critical platform bugs: a data-loss issue from silent transcript retention cleanup (#59248) and a reported quality regression in Claude generation 5 (#83510) are drawing significant attention.

## Releases

**v2.1.221**
- Added **Focus view** in VSCode: a chat-menu toggle that collapses tool activity behind an expandable per-turn summary with a live running-tool indicator (`Ctrl+Alt+F` or "Claude Code: Toggle Focus view").
- Added `mode: "mask"` for sandbox credential files on Linux.

## Hot Issues

1. **#28729 — Link a source control repo as the source for organization skills** ([36 comments](https://github.com/anthropics/claude-code/issues/28729), 84 👍)
   - Proposal to let orgs pull shared skills directly from a Git repo instead of manual uploads. Strong community interest; addresses skill distribution at scale.

2. **#23626 — Support diff comparison against branches other than main** ([36 comments](https://github.com/anthropics/claude-code/issues/23626), 111 👍)
   - Developers want to generate PR-style diffs against arbitrary branches, not just `main`. High engagement; top-voted feature request in this batch.

3. **#59248 — Silent retention cleanup deletes session transcripts with no warning** ([29 comments](https://github.com/anthropics/claude-code/issues/59248), tagged `data-loss`)
   - A user lost all prior conversation transcripts after a retention sweep. Raises urgent concerns about irreversible data deletion and lack of recovery.

4. **#67085 — Desktop activity dashboard streak/heatmap credits session-start date, not active days** ([10 comments](https://github.com/anthropics/claude-code/issues/67085))
   - Multi-day sessions incorrectly break streaks. A UX/metrics accuracy bug affecting the desktop activity view.

5. **#83510 — Measurable quality regression in Claude generation 5** ([5 comments](https://github.com/anthropics/claude-code/issues/83510), 5 👍)
   - Reproducible report of worse nonsense detection, ~2x verbosity, and silent rerouting on Fable 5 / Opus 5 / Sonnet 5. Model behavior issues under scrutiny.

6. **#76694 — Cowork: new projects lost "Choose a folder" after Chat/Cowork merge** ([8 comments](https://github.com/anthropics/claude-code/issues/76694))
   - Context menu replaced with upload-only knowledge menu, breaking the ability to bind local folders to Cowork projects.

7. **#79386 — Claude Code prompts for usage credits on Fable 5 despite Max plan entitlement** ([4 comments](https://github.com/anthropics/claude-code/issues/79386))
   - Billing/entitlement mismatch on the VS Code extension; Max plan users incorrectly see credit prompts.

8. **#52384 — VS Code extension voice dictation ignores `language` setting** ([4 comments](https://github.com/anthropics/claude-code/issues/52384), now closed)
   - French audio transcribed as English gibberish in the extension, while CLI voice dictation respects the setting. Confirmed platform-specific bug.

9. **#80454 — Web Remote Control renders internal peer-message envelope as chat bubble** ([4 comments](https://github.com/anthropics/claude-code/issues/80454))
   - Repeated rendering defect in remote sessions; internal authority/security metadata leaks into the chat UI.

10. **#83830 — Sessions launched from in-terminal session switcher run as background jobs** ([1 comment](https://github.com/anthropics/claude-code/issues/83830))
    - New session-switcher UX unexpectedly backgrounds sessions; users expect foreground terminal behavior.

## Key PR Progress

1. **#83374 — docs(plugin-dev): document MessageDisplay streaming semantics** ([Open](https://github.com/anthropics/claude-code/pull/83374))
   - Adds `MessageDisplay` to the Hook Development skill documentation, trigger descriptions, and quick-reference tables.

2. **#83738 — Fix/83484 symlink path expansion** ([Open](https://github.com/anthropics/claude-code/pull/83738))
   - Fixes a Linux install bug where `claude install` created a broken symlink pointing to a literal `%h` placeholder instead of expanding the home directory.

## Feature Request Trends

- **Skill/Org distribution**: Centralized, repo-linked skill management for teams (#28729).
- **IDE workflow depth**: Better diff/PR workflows (#23626), native spellcheck (#81814), and voice dictation fixes (#52384).
- **Security & permissions**: Machine-level policies for shared infrastructure (#70184), model-pinning guarantees (#83795), and MCP anonymous-access fallbacks (#83846).
- **Automation reliability**: Pre-authorization for scheduled browser tasks (#83850) and insights generation fixes (#83849).

## Developer Pain Points

- **Data integrity & loss**: Silent transcript deletion (#59248) dominates trust concerns; recovery/opt-in mechanisms are top requests.
- **Model quality & billing**: Reported regressions in generation 5 models (#83510) and incorrect credit prompts on paid plans (#79386, #79773) erode confidence in upgrade value.
- **Platform instability**: VS Code extension bugs (voice dictation, session restoration after git worktree/restart) and terminal-mode queue stalls (#83823, #83828) break core workflows.
- **Platform-specific regressions**: macOS desktop streaks (#67085), Windows Cowork SMB share failures (#83847), and WSL accessibility/theme collisions (#77243) indicate uneven cross-platform maintenance.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest | 2026-08-04

## Today's Highlights
On 2026-08-04, the OpenAI Codex repository shipped 4 new Rust CLI alpha releases (v0.147.0-alpha.1.2 through v0.147.0-alpha.7) and merged 20 PRs focused on security, performance, and cross-platform feature parity. The highest-engagement ongoing community thread remains the long-running fast token consumption bug (Issue #14593) impacting Business tier Windows/VS Code users, with 628 total comments and 283 upvotes. Newly reported issues today highlight persistent gaps in Windows/WSL support, TUI feature parity, and desktop app stability.

## Releases
Four new Rust CLI alpha releases were published in the last 24 hours:
- v0.147.0-alpha.1.2
- v0.147.0-alpha.6
- v0.147.0-alpha.6.1
- v0.147.0-alpha.7
No detailed changelogs were included in the release metadata.
All releases: https://github.com/openai/codex/releases

## Hot Issues
1. [Burning tokens very fast (Issue #14593)](https://github.com/openai/codex/issues/14593) | 628 comments, 283 upvotes | OPEN
   Why it matters: The highest-engagement issue in the repository, impacting paying Business tier users on Windows/VS Code with unanticipated token consumption leading to unexpected costs and premature rate limit hits.
   Community reaction: Extremely high, with hundreds of user reports, workaround requests, and calls for transparent usage auditing and billing controls.

2. [Codex Diff crashes with “Oops, an error has occurred” in VS Code on macOS (Issue #35058)](https://github.com/openai/codex/issues/35058) | 50 comments, 122 upvotes | CLOSED
   Why it matters: Breaks core code review functionality for macOS VS Code users, rendering the Codex Diff feature completely unusable across all repositories.
   Community reaction: High upvote count indicates widespread impact, with users confirming the bug occurs on fresh workspaces and latest extension versions.

3. [Make Weekly Limit Reset Deterministic (Issue #9508)](https://github.com/openai/codex/issues/9508) | 48 comments, 32 upvotes | OPEN
   Why it matters: Affects Pro tier users' ability to predict rate limit availability for planning long-form coding sessions, with current reset timing appearing inconsistent.
   Community reaction: Steady engagement from users requesting transparent, timezone-aware rate limit scheduling to avoid unexpected workflow interruptions.

4. [Customizable status line (Issue #17827)](https://github.com/openai/codex/issues/17827) | 38 comments, 143 upvotes | OPEN
   Why it matters: Requests parity with Claude Code's TUI, which lets users display real-time token usage, model name, rate limits, context window size, and git branch in the terminal UI via simple configuration.
   Community reaction: High upvote count shows strong demand for TUI customization from CLI power users.

5. [Custom pets fail to load in WSL environments due to path normalization (Issue #20730)](https://github.com/openai/codex/issues/20730) | 20 comments, 24 upvotes | OPEN
   Why it matters: Bre

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

# Kimi Code CLI Community Digest (2026-08-04)

## Today's Highlights
No new releases were published for Kimi Code CLI in the last 24 hours. The community remains active with contributions focused on ACP protocol improvements, shell reliability fixes, and ongoing discussion of a high-engagement persistent memory feature request, alongside new bug reports for Windows IME input and Web UI session switching.

## Releases
No new releases published in the last 24 hours.

## Hot Issues
All 5 open issues updated or created in the last 24 hours are listed below:
- #1283 [enhancement] Feature Request: Memory System - Persistent context across sessions (https://github.com/MoonshotAI/kimi-cli/issues/1283): Created 2026-02-27, updated 2026-08-04, 17 comments. This is the highest-engagement feature request in the current batch, calling for a built-in memory system to retain project context, user preferences, and AI-managed notes across sessions. Community discussion has centered on implementation scope for both automatic and manual memory controls.
- #2573 [bug] Web UI "Connecting to session..." infinite spinner when switching sessions (https://github.com/MoonshotAI/kimi-cli/issues/2573): Created 2026-08-01, updated 2026-08-03. Affects users of the Kimi Web UI technical preview on macOS/Chrome, blocking the core session switching workflow.
- #2584 [bug] Thai (and other IME-based) characters duplicated when typing in the prompt on Windows (https://github.com/MoonshotAI/kimi-cli/issues/2584): Created and updated 2026-08-04. Impacts Windows 11 users using IME input methods, breaking prompt input functionality for non-Latin language users.
- #2583 [enhancement] feat(acp): advertise available models and support mid-session model switching (https://github.com/MoonshotAI/kimi-cli/issues/2583): Created and updated 2026-08-04. Blocks ACP client users (e.g. Zed, Happy Coder) from discovering supported models or switching models without restarting active sessions.
- #2582 [bug] CLI stream hangs indefinitely during generation, session becomes unusable (https://github.com/MoonshotAI/kimi-cli/issues/2582): Created 2026-08-03, updated 2026-08-03. Affects Windows users running the kimi-k2.7-code model, rendering sessions completely unusable when generation streams stall.

## Key PR Progress
All 3 open PRs updated in the last 24 hours are listed below:
- #2200 fix(shell): adapt timeouts for long commands (https://github.com/MoonshotAI/kimi-cli/pull/2200): Created 2026-05-08, updated 2026-08-04. Automatically extends shell timeouts for common slow command patterns (git submodule cleanup, clone/fetch, package installs, builds) while retaining the 60s default for standard commands and preserving explicitly user-configured timeouts, eliminating premature timeout failures for long-running development tasks.
- #2585 feat(cli): set AI_AGENT for subprocesses (https://github.com/MoonshotAI/kimi-cli/pull/2585): Created and updated 2026-08-04. Exposes the `AI_AGENT=kimi` environment variable to all subprocesses launched from both pip/uv and standalone binary entrypoints, preserves explicit non-blank values set by wrapper/orchestrator tools, and enables downstream tooling to identify processes launched by Kimi Code CLI.
- #2364 feat(acp): support permission mode switching (https://github.com/MoonshotAI/kimi-cli/pull/2364): Created 2026-05-24, updated 2026-08-04. Adds protocol-level ACP permission mode switching for Kimi sessions, resolving related issue #1414, and is designed to stack on top of PR #2363 to enable granular permission control for ACP client integrations.

## Feature Request Trends
The most common feature request directions from recent issues are:
- Persistent cross-session memory and context retention for long-term project workflows
- ACP protocol enhancements to improve compatibility with third-party developer tools (model discovery, mid-session model switching, granular permission controls)
- Cross-platform input reliability support for IME and non-Latin input methods

## Developer Pain Points
Recurring frustrations and high-frequency requests from the community include:
- Windows-specific reliability gaps, including IME input duplication and indefinite CLI stream hangs during model generation
- Web UI technical preview stability issues, such as broken session switching functionality
- Limited ACP client functionality that restricts integration with popular developer tools like Zed
- Lack of built-in persistent memory for retaining project context and user preferences across sessions

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest
**Date: 2026-08-04**

---

## 1. Today's Highlights
Two bugfix releases (v1.18.12 and v1.18.13) shipped in the last 24 hours addressing Azure reasoning failures, desktop composer lag, and RTL layout issues. The community is reporting widespread regressions in the latest 1.18.x builds, including model response hangs, high CPU usage, and clipboard failures impacting core usability.

---

## 2. Releases
### v1.18.13
- **TUI**: GitHub pull request reviews now include the pull request number and URL in context.
- **Desktop**: Fixed multiple right-to-left layout issues across tabs, drawers, resizing, and titlebar interactions, plus shared RTL UI behavior including directional icons.
[Release link](https://github.com/anomalyco/opencode/releases/tag/v1.18.13)

### v1.18.12
- **Core**: Fixed Azure GPT-5.5+ completion requests failing when reasoning is enabled.
- **Desktop**: Reduced composer lag when drafts include large pasted images or attachments; fixed project search to match any known recent project instead of only the first five.
[Release link](https://github.com/anomalyco/opencode/releases/tag/v1.18.12)

---

## 3. Hot Issues
| # | Title | Comments | Upvotes | Why It Matters | Link |
|---|-------|----------|---------|----------------|------|
| 4283 | Copy To Clipboard is not working | 117 | 109 | Long-standing core TUI usability bug preventing users from copying selected response text, impacting all terminal users. | [Link](https://github.com/anomalyco/opencode/issues/4283) |
| 30086 | High CPU usage in newer versions of OpenCode | 43 | 22 | Post-update CPU spikes reduce concurrent session capacity from 10+ to 3, breaking workflows for power users running multiple parallel sessions. | [Link](https://github.com/anomalyco/opencode/issues/30086) |
| 40459 | OpenCode CLI not working | 2 | 2 | Latest 1.18.13 users report no response after sending messages with no error output, a core functionality failure for CLI/TUI users. | [Link](https://github.com/anomalyco/opencode/issues/40459) |
| 40451 | The models auto stop in middle | 2 | 0 | Zen model users report responses get stuck in "thinking" then auto-terminate without completion on 1.18.13, a regression from prior stable versions. | [Link](https://github.com/anomalyco/opencode/issues/40451) |
| 40465 | deepseek-v4-flash on opencode-go drops connection before response | 1 | 1 | Free DeepSeek V4 Flash via OpenCode Go hangs until 30s timeout, while Pro works on the same endpoint, indicating provider-side routing inconsistencies for free tier users. | [Link](https://github.com/anomalyco/opencode/issues/40465) |
| 40460 | DeepSeek V4 Flash Free not working | 4 | 4 | Widespread reports of DeepSeek V4 Flash getting stuck on "Thinking..." with no output on 1.18.13, a high-impact regression for free tier users. | [Link](https://github.com/anomalyco/opencode/issues/40460) |
| 17076 | CLI/TUI multi-file apply_patch approval only shows first file diff | 5 | 19 | Multi-file patch reviews only render the first file's diff, hiding critical code changes from users during approval, posing a security and usability risk for code editing workflows. | [Link](https://github.com/anomalyco/opencode/issues/17076) |
| 32366 | UI stuck on 'thinking' indefinitely after stream error | 5 | 0 | Stream errors leave the desktop UI frozen with no error message, requiring a full app restart to recover and breaking workflow continuity. | [Link](https://github.com/anomalyco/opencode/issues/32366) |
| 9922 | Impossible to paste API key after /connect | 14 | 3 | Windows/Ubuntu users cannot paste API keys via standard shortcuts or right-click after running `/connect`, blocking setup for new users on those platforms. | [Link](https://github.com/anomalyco/opencode/issues/9922) |
| 34087 | Opencode not returning responses | 7 | 3 | Desktop app users report input leads to "Thinking" with no output for both Go and Zen models, a core functionality failure. | [Link](https://github.com/anomalyco/opencode/issues/34087) |

---

## 4. Key PR Progress
| # | Title | Status | Description | Link |
|---|-------|--------|-------------|------|
| 40458 | fix(opencode): define OPENCODE_VERSION in the node server build | Open | Closes 5 long-standing issues where the desktop app reported incorrect installation version, fixing version detection for updates and bug reports. | [Link](https://github.com/anomalyco/opencode/pull/40458) |
| 40444 | refactor(tui): break plugin registry cycle | Open | Eliminates circular dependencies in the TUI plugin system, improving stability for third-party plugin development. | [Link](https://github.com/anomalyco/opencode/pull/40444) |
| 40438 | fix(acp): surface subagent activity | Open | Fixes missing ACP subagent transcripts by preserving events from sessions with different IDs, improving visibility into multi-agent workflows. | [Link](https://github.com/anomalyco/opencode/pull/40438) |
| 40437 | fix(core): fail steps with empty provider output after bounded retries | Open | Fixes issue where reasoning-only model turns (no visible text/tool calls) were recorded as successful, leading to empty user responses. | [Link](https://github.com/anomalyco/opencode/pull/40437) |
| 40435 | fix(tui): adapt logo to narrow terminals | Open | Backports responsive logo rendering from V2 TUI, preventing broken startup UI in small terminal windows. | [Link](https://github.com/anomalyco/opencode/pull/40435) |
| 40371 | feat(vcs): publish branch updates | Open | Adds background Git/Hg branch metadata tracking via filesystem events, improving VCS integration for workspace-aware workflows. | [Link](https://github.com/anomalyco/opencode/pull/40371) |
| 40450 | fix(opencode): include cache writes in ACP usage | Open | Corrects ACP context usage reporting to include cache-write tokens, fixing inaccurate context limit tracking for ACP integrations. | [Link](https://github.com/anomalyco/opencode/pull/40450) |
| 36710 | fix(core): bound event log compaction | Open | Adds bounded, dry-run-by-default event log compaction with CLI flags, preventing unbounded log growth in long-running sessions. | [Link](https://github.com/anomalyco/opencode/pull/36710) |
| 38728 | fix: keep prompt input inert during Safari IME composition | Open | Fixes CJK IME input abortion in Safari web app, improving usability for CJK users. | [Link](https://github.com/anomalyco/opencode/pull/38728) |
| 40327 | feat(plugin): add session HTTP middleware | Closed | Adds Effect-native HTTP execution seam for plugins, enabling custom request/response handling for provider integrations. | [Link](https://github.com/anomalyco/opencode/pull/40327) |

---

## 5. Feature Request Trends
The most requested feature directions center on three areas:
1. **UI flexibility**: Requests for movable/dockable panels (especially for RTL languages like Arabic), dynamic model list refresh, and improved desktop UI customization.
2. **Developer workflow integration**: Requests for environment markers exposed to shell commands to let downstream CLIs detect when running inside an OpenCode coding agent, plus improved install script UX (e.g., guiding users to reload shell after PATH updates).
3. **Multi-agent workflow visibility**: Requests for better multi-file patch review UIs and surfacing of subagent activity for complex multi-step agent tasks.

---

## 6. Developer Pain Points
1. **Core functionality regressions in 1.18.x**: Widespread reports of models (especially DeepSeek V4 Flash, Zen models) hanging on "thinking", auto-stopping mid-response, or returning no output, breaking core chat functionality for a large share of users.
2. **Clipboard and paste failures**: Long-standing bug where TUI selected text cannot be copied, and API key paste fails after `/connect` on Windows/Ubuntu, blocking setup and content reuse for cross-platform users.
3. **High CPU usage**: Post-recent update CPU spikes reduce concurrent session capacity from 10+ to 3, impacting power users running multiple parallel sessions.
4. **UI state recovery failures**: Stream errors leave the desktop UI frozen on "thinking" with no error message, requiring a full app restart to recover and breaking workflow continuity.
5. **Inconsistent free tier provider behavior**: Free DeepSeek V

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-08-04

## Today's Highlights
Qwen Code v0.21.5 shipped with an opt-in macOS update bridge that helps Electron desktop users migrate to the new Tauri shell, while desktop packaging work advanced with vendor binary codesigning (PR #8518). The community’s strongest thread this week is a foundational proposal for deterministic, trustworthy agent runtime boundaries (Issue #8102, 17 comments). At the same time, multiple high-priority bugs are active around session reliability, terminal UI, and security sanitization.

## Releases
- **v0.21.5** — Includes the macOS Electron→Tauri migration bridge. The release quality job failed on 2026-08-03 (Issues #8476, #8483), but the tag was published. [Release](https://github.com/QwenLM/qwen-code/releases/tag/v0.21.5)
- **v0.21.4-nightly.20260804.d6f55a1c9** — Nightly build also shipped. [Release](https://github.com/QwenLM/qwen-code/releases/tag/v0.21.4-nightly.20260804.d6f55a1c9)

## Hot Issues
1. **[#8102](https://github.com/QwenLM/qwen-code/issues/8102)** — Proposal: deterministic tool-execution boundaries for a trustworthy agent runtime (17 comments). A foundational security/architecture proposal to keep the LLM outside the trust boundary and deterministically constrain runtime actions. Strong community debate.
2. **[#8519](https://github.com/QwenLM/qwen-code/issues/8519)** — Severe screen flickering in tmux (11 comments). Users report Qwen Code flashing nearly every second inside tmux sessions, impacting readability.
3. **[#8051](https://github.com/QwenLM/qwen-code/issues/8051)** — Bound multi-workspace daemon resource usage (9 comments). Current limits are count-only; the request is for byte-level bounds on request bodies, WebSocket assembly, and memory.
4. **[#8136](https://github.com/QwenLM/qwen-code/issues/8136)** — Provider warning sanitizer leaks passwords (6 comments). Security bug where `sanitizeProviderWarning` mishandles `@` and ports, potentially exposing credentials in `/status` payloads.
5. **[#8356](https://github.com/QwenLM/qwen-code/issues/8356)** — Session transcript not written after user abort (5 comments). After `APIUserAbortError`, subsequent turns fail to persist, breaking resume continuity.
6. **[#4362](https://github.com/QwenLM/qwen-code/issues/4362)** — Opt-in "Auto Fix CI & Address Review Comments" workflow (5 comments, 2 likes). Feature request for background automation on active PRs; closed but reflects strong demand.
7. **[#8493](https://github.com/QwenLM/qwen-code/issues/8493)** — Cancelled file tools can still mutate files (5 comments). `write_file` and `edit` continue async filesystem work after abort signals fire.
8. **[#8470](https://github.com/QwenLM/qwen-code/issues/8470)** — Model name truncation with Alibaba token plan (5 comments). Long `Modelstuidio` prefixes are truncated in terminal/mobile selectors, causing selection errors.
9. **[#8533](https://github.com/QwenLM/qwen-code/issues/8533)** — `Content[]`/`Part[]` cannot safely encode per-provider reasoning-replay contracts (4 comments). A foundational data-model issue complicating reasoning trace portability across providers.
10. **[#8317](https://github.com/QwenLM/qwen-code/issues/8317)** — `Ctrl+Shift+C` copy shortcut broken in terminal CLI (4 comments). Standard copy shortcut stopped working, impacting basic usability.

## Key PR Progress
1. **[#8518](https://github.com/QwenLM/qwen-code/pull/8518)** — Codesign ripgrep and Node binaries before Tauri build. Unblocks the 0.0.6 desktop release by signing embedded vendor binaries for macOS notarization.
2. **[#8517](https://github.com/QwenLM/qwen-code/pull/8517)** — Manage DingTalk `interactiveCards` config. Exposes the field in the daemon channel management API with nested validation

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar).*