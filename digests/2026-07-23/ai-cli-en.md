# AI CLI Tools Community Digest 2026-07-23

> Generated: 2026-07-23 03:19 UTC | Tools covered: 7

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

# Cross-Tool Comparison Report: AI CLI Developer Tools Ecosystem

## 1. Ecosystem Overview

The AI CLI tool landscape in mid-2026 is characterized by rapid iteration cycles and a converging set of developer pain points. Across six major projects—Claude Code, OpenAI Codex, Gemini CLI, GitHub Copilot CLI, Kimi Code, OpenCode, and Qwen Code—the community is actively pushing for better multi-agent orchestration, cross-platform parity, and context management. While each tool targets overlapping developer workflows, their technical approaches and community maturity vary significantly, with Gemini CLI and Claude Code showing the highest velocity of critical bug fixes, and OpenAI Codex leading in community-driven feature requests. The ecosystem is maturing from "demo quality" toward production-grade tooling, evidenced by the increasing number of security patches, sandbox hardening, and enterprise integration work visible across all repositories.

## 2. Activity Comparison

| Tool | Hot Issues (Today) | Key PRs (Today) | Releases (Last 24h) |
|---|---|---|---|
| Claude Code | 10 | 9 | v2.1.218 (stable) |
| OpenAI Codex | 10 | 10 | 4x Rust alphas |
| Gemini CLI | 10 | 10 | v0.52.0, v0.53.0-preview, nightly |
| GitHub Copilot CLI | 10 | 2 | v1.0.74-1/2/3 (patches) |
| Kimi Code | 4 | 3 | None |
| OpenCode | 10 | 10 | None |
| Qwen Code | 10 | 10 | V0 prerelease (benchmark infra only) |

**Observation:** Gemini CLI and Claude Code maintain high release cadence across stable and preview channels. OpenAI Codex is iterating rapidly on its Rust SDK but with multiple alpha versions indicating instability. Kimi Code remains the least active, with no release and low issue throughput.

## 3. Shared Feature Directions

Several requirements appear across **three or more** tool communities:

- **Multi-agent orchestration & subagent control**  
  *Affects:* Claude Code, OpenAI Codex, Gemini CLI, Kimi Code, OpenCode  
  *Specific needs:* Per-agent model selection (Kimi #2533, Codex #32031), subagent isolation/scratchpads (Claude Code #80416), subagent permission enforcement (Gemini #22093), and parallel session isolation (OpenCode #28958).

- **Cross-platform context sharing & session continuity**  
  *Affects:* Claude Code, Copilot CLI, OpenCode  
  *Key requests:* Transfer conversations between web and CLI (Claude Code #13843, 99👍), session forking from any message (OpenCode #25582), and `--resume` reliability across platforms (Copilot CLI #4165).

- **Customizable TUI and status line**  
  *Affects:* OpenAI Codex, Copilot CLI, OpenCode  
  *Demand:* Configurable status bar with token usage, model name, git branch (Codex #17827, 119👍), auto-model pool configuration (Copilot CLI #4218), and custom system prompts (OpenCode #7101, 123👍).

- **Platform-specific stability (Windows, macOS, Linux)**  
  *Affects:* All tools  
  *Recurring issues:* Windows sandbox failures (Codex #22428, Qwen #6577), macOS SQLite log churn (Codex #29532), Linux OAuth loops (Claude Code #77966), Wayland browser agent crashes (Gemini #21983), and hibernate/resume CPU spin (Claude Code #80404).

- **Authentication & BYOK workflow improvements**  
  *Affects:* Claude Code, OpenAI Codex, Copilot CLI, Qwen Code  
  *Common complaints:* OAuth loops (Claude Code #68674, Codex #31573), BYOK regression (Copilot CLI #4016), and credential exposure (Qwen Code #6601, #7527).

## 4. Differentiation Analysis

| Tool | Unique Focus | Target User | Technical Approach |
|---|---|---|---|
| **Claude Code** | Desktop-CLI parity, plugin ecosystem | Enterprise developers, plugin authors | Background subagents, `/planwith`, account profiles plugin |
| **OpenAI Codex** | Rust SDK development, multi-agent v2 | Rust ecosystem, power users | Rapid Rust alpha releases, copyberry[bot]-automated PRs |
| **Gemini CLI** | Agent reliability, evaluation infrastructure | Google Cloud developers, CI/CD heavy | Triage workers, eval coverage reporting, A2A role coalescing |
| **GitHub Copilot CLI** | Authentication flexibility, terminal rendering | GitHub enterprise, tmux users | BYOK custom providers, sandbox opt-in splash, Gemini 3.6 Flash support |
| **Kimi Code** | Lightweight, third-party API compatibility | Moonshot AI platform users | Minimalist feature set, single-model default |
| **OpenCode** | Customizability, session management | Power users, parallel workflow builders | Custom system prompts, roll-call connectivity testing, ACP-backed agents |
| **Qwen Code** | CI/CD automation, cold-start performance | Alibaba Cloud, enterprise ops | Git mode selector, GenAI telemetry (ARMS), workspace-level generation |

**Key insight:** Claude Code and Gemini CLI are pulling ahead in agent orchestration maturity. OpenAI Codex is uniquely focused on Rust SDK evolution, while Copilot CLI differentiates on authentication flexibility. Kimi Code fills a niche for simplicity but lags in platform support. OpenCode leads in user-facing customization (system prompts, session forking). Qwen Code is investing heavily in enterprise observability and CI/CD integration.

## 5. Community Momentum & Maturity

| Tool | Momentum Signal | Maturity Indicator |
|---|---|---|
| **Claude Code** | High: 57 comments on critical bug (#80002), 99👍 top feature request | Stable release cadence, plugin directory, background agents |
| **OpenAI Codex** | Very high: 151👍 on auto-resolve issue (#28969), 119👍 on status line | Rapid Rust alpha iteration, but instability across alphas |
| **Gemini CLI** | High: multiple P1 bugs with active investigation, 10 PRs/day | Stable + preview channels, security advisory (GHSA) |
| **Copilot CLI** | Moderate: active discussion on authentication, few PRs | Stable patch releases, but rendering regressions persist |
| **Kimi Code** | Low: only 4 issues today, 3 PRs, no release | Minimal community engagement; feature set is sparse |
| **OpenCode** | High: 123👍 on custom prompts, 10 PRs, consistent daily activity | Mature session management, but desktop memory leaks |
| **Qwen Code** | High: 10 PRs, CI failures drive rapid fixes | Enterprise-grade telemetry, but cold-start still a pain point |

**Summary:** The most active communities today are Claude Code, OpenAI Codex, and Qwen Code—each with high PR throughput and strong user engagement. Gemini CLI shows the fastest critical bug response time. Kimi Code appears least mature in both community engagement and feature velocity.

## 6. Trend Signals

Five industry trends emerge from cross-tool community feedback, with direct implications for developers:

1. **Agent orchestration is becoming the central UX challenge.** Users no longer want single-turn code generation; they want multi-agent planning, subagent isolation, and parallel execution with reliable failure reporting. The most-upvoted issues across Claude Code (mid-turn steering), Codex (multi-agent model overrides), and Gemini (agent recovery) all point to the same need. **Action:** When evaluating tools, prioritize those with transparent subagent lifecycle management.

2. **Platform stability remains the #1 friction point.** Windows sandbox, macOS I/O churn, Linux OAuth loops, and Wayland crashes appear in every digest. These issues disproportionately affect enterprises that cannot standardize on a single OS. **Action:** Budget time for platform-specific debugging; tools with dedicated platform fixes (Claude Code's Windows power bug, Gemini's Wayland browser fix) are investing in coverage.

3. **The "rate limit" conversation is shifting from quantity to predictability.** Copilot CLI and Codex users explicitly call out that weekly limits feel identical to hourly limits (#33685). Users want configurable context compaction thresholds (#1688) and per-agents cost breakdowns (#4207). **Action:** Demand transparent usage dashboards, not just limit increases.

4. **Security hardening is accelerating.** Three tools shipped credential-exposure fixes this week alone (Qwen #6601, #7527; Copilot CLI's GHSA; Gemini's shell variable expansion bypass fix). Plugin and subagent permission bypasses are increasingly reported (Gemini #22093, OpenCode #28958). **Action:** Treat sandbox isolation and credential scoping as table stakes, not differentiators.

5. **Cross-platform session portability is the next frontier.** The top feature request across Claude Code (share context from Claude.ai) and OpenCode (fork to new session) signals that developers want to move conversations between devices, editors, and workflows without losing context. **Action:** Tools that solve frictionless session transfer will have a significant adoption advantage, especially for hybrid desktop/CLI users.

**Bottom line for technical decision-makers:** If you need production-grade multi-agent orchestration, evaluate Claude Code or Gemini CLI. If you need deep enterprise integration (telemetry, CI/CD), Qwen Code shows strong foundations. For maximum customization, OpenCode's system prompt architecture is unique. Kimi Code should be considered only if Moonshot API compatibility is mandatory. The ecosystem is converging on common pain points; the tools that solve platform stability, cost predictability, and context portability will win long-term adoption.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report
**Data snapshot:** 2026-07-23 | **Source:** github.com/anthropics/skills

---

## 1. Top Skills Ranking

The following pull requests represent the most-discussed Skill submissions by community engagement. All remain **open** unless noted.

### #1298 — `fix(skill-creator)`: run_eval.py reports 0% recall
**Functionality:** Fixes the skill evaluation pipeline where `run_eval.py` consistently reports `recall=0%` for every description under test (#556, 10+ independent reproductions). The root cause involves failing to install the eval artifact as a real skill, plus Windows stream-reading, trigger-detection, and parallel-worker bugs. This fix is critical because the description-optimization loop (`run_loop.py`, `improve_description.py`) is currently optimizing against noise.
**Discussion highlights:** Addresses the single most-reported bug across the entire repository; multiple contributors independently reproduced the failure across platforms.
**Status:** Open ([PR #1298](https://github.com/anthropics/skills/pull/1298))

### #514 — `Add document-typography skill`
**Functionality:** Prevents orphan word wrap (1–6 words on a new line), widow paragraphs (section headers stranded at page bottom), and numbering misalignment in AI-generated documents. Targets typographic issues that appear in every document Claude generates but users rarely explicitly request correction for.
**Discussion highlights:** Proposes a broadly applicable quality-of-life improvement; touches every document workflow.
**Status:** Open ([PR #514](https://github.com/anthropics/skills/pull/514))

### #486 — `Add ODT skill`
**Functionality:** Creates, fills, reads, and converts OpenDocument Format files (.odt, .ods). Covers template filling and ODT-to-HTML conversion. Triggers on mentions of "ODT", "ODS", "ODF", "OpenDocument", "LibreOffice document", or requests for ISO-standard open-source document formats.
**Discussion highlights:** Fills a notable gap in document-format coverage; complements existing PDF and DOCX skills.
**Status:** Open ([PR #486](https://github.com/anthropics/skills/pull/486))

### #723 — `Add testing-patterns skill`
**Functionality:** Comprehensive testing skill covering the full stack: Testing Trophy philosophy, unit testing (AAA pattern, naming, pure functions, edge cases), React component testing (Testing Library, queries), and a "what to test vs. what NOT to test" framework.
**Discussion highlights:** Addresses a frequently requested domain—automated test generation with best-practice guardrails.
**Status:** Open ([PR #723](https://github.com/anthropics/skills/pull/723))

### #1367 — `Add self-audit skill (v1.3.0)`
**Functionality:** A meta-skill that audits AI output before delivery: mechanical file verification (every claimed output file exists and matches spec) followed by a four-dimension reasoning audit in damage-severity priority order. Universal across projects, tech stacks, and models.
**Discussion highlights:** Part of a broader community push for output quality gates and verification pipelines.
**Status:** Open ([PR #1367](https://github.com/anthropics/skills/pull/1367))

### #1302 — `Add color-expert skill`
**Functionality:** A self-contained color-expertise skill covering naming systems (ISCC-NBS, Munsell, XKCD, RAL, Ridgway 1912, CSS named colors), color spaces with "what to use when" guidance (OKLCH for scales, OKLAB for gradients, CAM16 for appearance models), palette generation, and harmony rules.
**Discussion highlights:** Deeply specialized; draws on multiple established color systems for design, scientific visualization, and accessibility use cases.
**Status:** Open ([PR #1302](https://github.com/anthropics/skills/pull/1302))

### #525 — `Add pyxel skill for retro game development`
**Functionality:** Integrates with [pyxel-mcp](https://github.com/kitao/pyxel-mcp), an MCP server for the Pyxel retro game engine. Covers the full workflow: write → run_and_capture → inspect → iterate loop. Triggers when users want to create retro/pixel-art/8-bit games with Python.
**Discussion highlights:** Represents the game-dev niche; leverages the MCP protocol for external tool integration.
**Status:** Open ([PR #525](https://github.com/anthropics/skills/pull/525))

---

## 2. Community Demand Trends

Analysis of the most-commented Issues reveals several concentrated demand directions:

1. **Skill ecosystem trust & security** — Issue [#492](https://github.com/anthropics/skills/issues/492) (43 comments) identifies a critical trust-boundary vulnerability: community skills distributed under the `anthropic/` namespace impersonating official skills. This is the most-discussed Issue across the entire repository.

2. **Skill creation tooling reliability** — Multiple Issues ([#556](https://github.com/anthropics/skills/issues/556), [#1169](https://github.com/anthropics/skills/issues/1169), [#1061](https://github.com/anthropics/skills/issues/1061)) report that the `run_eval.py` / `run_loop.py` pipeline is fundamentally broken on Windows and produces `recall=0%` on all platforms. The community is demanding a reliable evaluation loop before building new skills.

3. **Organizational skill distribution** — Issue [#228](https://github.com/anthropics/skills/issues/228) (14 comments, 👍 7) requests org-wide skill sharing without manual `.skill` file exchange via Slack/Teams. This points to enterprise deployment demand.

4. **Skill definition quality & best practices** — Issue [#202](https://github.com/anthropics/skills/issues/202) (8 comments) critiques the skill-creator skill itself as too verbose and educational; Issue [#62](https://github.com/anthropics/skills/issues/62) (10 comments) reports skill disappearance under unclear conditions. Together, these signal a need for clearer authoring standards and more robust skill management.

5. **New skill domains proposed** — Compact-memory ([#1329](https://github.com/anthropics/skills/issues/1329), 9 comments) and agent governance ([#412](https://github.com/anthropics/skills/issues/412), 6 comments) represent emerging interest in long-running agent state management and safety patterns. The reasoning quality gate pipeline ([#1385](https://github.com/anthropics/skills/issues/1385)) extends the self-audit concept.

---

## 3. High-Potential Pending Skills

These open PRs maintain active commentary and are likely to land soon:

| PR | Skill | Key Focus |
|---|---|---|
| [#1367](https://github.com/anthropics/skills/pull/1367) | **self-audit** | Output verification + 4-dimension reasoning gate |
| [#1323](https://github.com/anthropics/skills/pull/1323) | **fix(skill-creator): trigger detection** | Fixes recall=0% by correcting how `run_eval.py` detects skill triggers |
| [#1302](https://github.com/anthropics/skills/pull/1302) | **color-expert** | Color naming, spaces, palettes |
| [#1099](https://github.com/anthropics/skills/pull/1099) | **fix(skill-creator): Windows pipes** | Fixes WinError 10038 and pipe-read crashes |
| [#1050](https://github.com/anthropics/skills/pull/1050) | **fix(skill-creator): subprocess + encoding** | PATHEXT and cp1252 encoding fixes |
| [#723](https://github.com/anthropics/skills/pull/723) | **testing-patterns** | Full-stack testing with best-practice framework |
| [#525](https://github.com/anthropics/skills/pull/525) | **pyxel** | Retro game development via MCP |

Multiple fix-PRs for skill-creator indicate that once the evaluation pipeline stabilizes, the community is poised to submit many more skills.

---

## 4. Skills Ecosystem Insight

**The community's single most concentrated demand is a reliable, cross-platform skill creation and evaluation pipeline** — every new skill proposal depends on `run_eval.py` working correctly, and the recurring `recall=0%` bug (with 10+ independent reproductions across Windows and Linux) has become the ecosystem's critical bottleneck, stalling both new submissions and existing skill optimization.

---

# Claude Code Community Digest — 2026-07-23

## Today’s Highlights

A new release (v2.1.218) shifts `/code-review` to run as a background subagent, keeping conversation history clean. Meanwhile, the community is heavily discussing a **macOS Filesystem extension dispatch bug** (57 comments) and a long-running feature request to **share conversation context from Claude.ai** (99 👍). Several Fable 5–related issues suggest model-selection friction is rising, and the first wave of Windows power-management bugs has arrived.

---

## Releases

**v2.1.218** — [Release link](https://github.com/anthropics/claude-code/releases/tag/v2.1.218)
- `/code-review` now runs as a **background subagent**, so review work no longer fills the conversation and stacked slash commands keep the correct review target.
- Added screen-reader announcements for deleted text (word/line deletions: `Option+Delete`, `Ctrl+W`, `Cmd+Backspace`).

---

## Hot Issues

1. **[#80002] macOS: Claude Desktop never dispatches tools/call to Filesystem extension** *(CLOSED)* — tools/list succeeds but tools/call is never logged. 57 comments, 25 👍.  
   [Issue #80002](https://github.com/anthropics/claude-code/issues/80002)

2. **[#13843] Share conversation context from Claude.ai to Claude Code** *(OPEN)* — Top-voted feature request (99 👍). Users want to plan a conversation on the web and continue in the CLI without losing context.  
   [Issue #13843](https://github.com/anthropics/claude-code/issues/13843)

3. **[#71726] Desktop app: inject queued messages mid-task between tool calls (CLI steering parity)** *(OPEN)* — CLI users can “steer” a running task mid-turn; desktop users cannot. 16 👍, 9 comments.  
   [Issue #71726](https://github.com/anthropics/claude-code/issues/71726)

4. **[#77966] Linux/IntelliJ: OAuth loop — state parameter dropped after “sign in again to continue” redirect** *(OPEN)* — Repeated login prompts on Linux + IntelliJ integration. 8 comments, 6 👍.  
   [Issue #77966](https://github.com/anthropics/claude-code/issues/77966)

5. **[#78933] Remote Control never connects: “Cannot read properties of undefined (reading 'session_url')”** *(OPEN)* — Desktop app `/remote-control` fails with undefined error. 8 comments.  
   [Issue #78933](https://github.com/anthropics/claude-code/issues/78933)

6. **[#80404] Event-loop starvation causing ~200% CPU spin and input lag after hibernate/resume** *(OPEN)* — Windows analog of earlier macOS bug #62308; libuv event loop stuck with `uv_backend_timeout() == 0`. Automatically terminates after tens of minutes. 4 comments.  
   [Issue #80404](https://github.com/anthropics/claude-code/issues/80404)

7. **[#80263] Plugin submissions reach “Published” but never appear in directory** *(OPEN)* — Stuck duplicate entries; request to remove them and publish intended plugin. 3 comments.  
   [Issue #80263](https://github.com/anthropics/claude-code/issues/80263)

8. **[#79997] Sandbox regression: “bwrap: Can't mkdir /opt/.claude” on non-root installs under root-owned dirs** *(OPEN)* — `denyWrite` mountpoint ancestor walk fails-closed, killing every Bash tool call. 3 comments, 2 👍.  
   [Issue #79997](https://github.com/anthropics/claude-code/issues/79997)

9. **[#68674] Desktop app Cloudflare Turnstile 403 loop on Windows 11** *(OPEN)* — Persistent authentication loop blocks login on Windows. 3 comments.  
   [Issue #68674](https://github.com/anthropics/claude-code/issues/68674)

10. **[#80210] Task/Todo tools not exposed despite `todoFeatureEnabled: true` — regressed ~2026-07-21** *(OPEN)* — Account-gated regression; tools stopped appearing around July 21. 3 👍, 1 comment.  
    [Issue #80210](https://github.com/anthropics/claude-code/issues/80210)

---

## Key PR Progress

1. **[#18217] feat(plugins): add /planwith command for inline plan mode prompts** *(CLOSED)* — Adds `/planwith <prompt>` so users can skip the two-step `/plan` toggle.  
   [PR #18217](https://github.com/anthropics/claude-code/pull/18217)

2. **[#80353] docs(gcp): stop on checksum mismatch** *(OPEN)* — Fails the GCP gateway deployment if the binary checksum doesn’t match, with cleanup before exit.  
   [PR #80353](https://github.com/anthropics/claude-code/pull/80353)

3. **[#80326] Add account profiles plugin** *(OPEN)* — Experimental plugin for managing isolated `CLAUDE_CONFIG_DIR` environments (personal vs. work accounts). Commands to create, list, launch, diagnose, and remove profiles.  
   [PR #80326](https://github.com/anthropics/claude-code/pull/80326)

4. **[#80294] docs: fix 1 broken link(s) via archive.org** *(OPEN)* — Fixes a broken npm link in README using Wayback Machine.  
   [PR #80294](https://github.com/anthropics/claude-code/pull/80294)

5. **[#80241] fix: Console scrolling top of history when Claude adds text** *(OPEN)* — Prevents the console from auto-scrolling to top on new output.  
   [PR #80241](https://github.com/anthropics/claude-code/pull/80241)

6. **[#80229] docs: fix 1 broken link(s) via archive.org** *(OPEN)* — Another link fix in README.  
   [PR #80229](https://github.com/anthropics/claude-code/pull/80229)

7. **[#80196] fix: Auto-compact never triggers despite statusline showing “100% context used”** *(OPEN)* — Addresses a bug where context compaction doesn’t fire automatically even when the context is full.  
   [PR #80196](https://github.com/anthropics/claude-code/pull/80196)

8. **[#80195] fix: Instantly hitting usage limits with Max subscription** *(OPEN)* — Investigation and fix for users who see usage cap despite being on Max plan.  
   [PR #80195](https://github.com/anthropics/claude-code/pull/80195)

9. **[#80112] Make devcontainer firewall init resilient to DNS resolution failures** *(OPEN)* — Prevents transient DNS failures from aborting the entire firewall setup script.  
   [PR #80112](https://github.com/anthropics/claude-code/pull/80112)

---

## Feature Request Trends

The most common feature themes across recent issues:

- **Desktop ↔ CLI parity** — Users want the desktop app to support mid-turn steering (injecting messages between tool calls) and background subagents, matching CLI capabilities.
- **Cross-platform context sharing** — Transferring conversation context between Claude.ai (web) and Claude Code is the top-voted request.
- **Agent session lifecycle management** — The ability to mark an agent session as “completed” or dismiss it from the agents view (9 👍) is a recurring ask.
- **Model selection improvements** — Multiple reports (Fable 5 contradictory messages, inability to switch models mid-session when quota runs out) highlight confusion around model availability and plan limits.
- **Plugin directory reliability** — Submissions that reach “Published” but never propagate to the public directory frustrate plugin developers.
- **Better subagent isolation** — Requests for isolated scratchpad directories instead of writing to `/tmp` (see #80416).

---

## Developer Pain Points

- **Authentication & OAuth loops** — Multiple reports of login failures on Windows (Turnstile 403) and Linux/IntelliJ (state parameter dropped). Also payment failures in Japan (#80055).
- **Sandbox regressions** — The `bwrap` regression on non-root installs (#79997) and sandbox glob handling inconsistencies (#80410) cause silent permissions issues.
- **Power-management bugs** — Event-loop starvation after hibernate/resume on Windows, and CPU spin that doesn’t recover.
- **Fable 5 quota confusion** — Users on Max plans see contradictory availability messages, are prompted for credits when included, and hit hard limits with no model-switch fallback.
- **MCP/Routine connector issues** — Connectors showing `enabledInChat: false` despite being globally connected, and GitHub repo picker showing “no repository found” when the GitHub App is missing.
- **Unicode/text encoding** — Korean text corruption in card UI (TodoWrite / AskUserQuestion) suggests a locale-handling gap in the VS Code extension.
- **Task tool availability**— Task/Todo tools stop being exposed after updates, even with feature flags enabled, and are inconsistently available between CLI and Desktop sessions.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# Codex Community Digest – 2026-07-23

## Today's Highlights
Four rapid-fire Rust alpha releases (`v0.146.0-alpha.1` through `.4`) hit the repository, likely preparing a stable Rust SDK bump. The community is still vocal about the persistent auto-resolve timer (Issue #28969, +151 👍) and the macOS SQLite log churn that persists after partial fixes (#29532). Meanwhile, a batch of copyberry[bot] PRs landed, addressing agent sleep/wake, plugin catalog caching, and Guardian review limits.

## Releases
- **rust-v0.146.0-alpha.1, .2, .3, .4** – Four consecutive alpha versions of the Codex Rust SDK were published today. No detailed changelogs are available, but the rapid iteration suggests incremental fixes or feature work ahead of a stable release.
*(No other components had new releases in the last 24h.)*

## Hot Issues (10 selected)

1. **[#28969] – Add setting to disable auto-resolve in 60 seconds**  
   *Author: antoyo | Comments: 53 | 👍: 151*  
   The most upvoted issue today. Users find the automatic 60‑second question resolution disruptive, especially in `/plan` mode. Two duplicate/spin-off issues (#34310) also request a permanent flag.  
   https://github.com/openai/codex/issues/28969

2. **[#29532] – macOS: Persistent SQLite TRACE log churn after rust‑v0.142.0**  
   *Author: pwukun | Comments: 44 | 👍: 8*  
   A partial fix reduced websocket logs but other targets still thrash `~/.codex/logs_2.sqlite`. Developers on macOS are seeing unnecessary disk I/O.  
   https://github.com/openai/codex/issues/29532

3. **[#17827] – Customizable status line**  
   *Author: pkondaurov | Comments: 31 | 👍: 119*  
   Long-standing feature request to show token usage, model name, git branch, etc. at the bottom of the TUI, inspired by Claude Code. Very popular (119 👍).  
   https://github.com/openai/codex/issues/17827

4. **[#21639] – Hooks no longer run after Codex Desktop update**  
   *Author: skydreamer21 | Comments: 23 | 👍: 6*  
   Regression in hooks functionality post Desktop update. Affects automation workflows that depend on `pre/post` hooks.  
   https://github.com/openai/codex/issues/21639

5. **[#31573] – OAuth authentication fails at issuer validation**  
   *Author: NiceWaffel | Comments: 19 | 👍: 45*  
   Free-tier users hit a issuer mismatch during OAuth flow. Blocks CLI login for some setups.  
   https://github.com/openai/codex/issues/31573

6. **[#33685] – Weekly limit draining like old 5‑hour limit**  
   *Author: mikk73 | Comments: 19 | 👍: 9*  
   The weekly rate limit appears to be consumed at the same speed as the removed 5‑hour limit, making the change feel cosmetic rather than substantive.  
   https://github.com/openai/codex/issues/33685

7. **[#25319] – Scope Codex VS Code chats to workspace/project**  
   *Author: omry | Comments: 17 | 👍: 47*  
   Users want chat history scoped per project, not globally. High developer demand for better workspace isolation.  
   https://github.com/openai/codex/issues/25319

8. **[#27597] – Codex IDE extension fails in VS Code Remote‑SSH**  
   *Author: lucastdeoliveira1-bit | Comments: 16 | 👍: 4*  
   Extension cannot load when connecting via Remote‑SSH, though the CLI works fine. Hinders remote development workflows.  
   https://github.com/openai/codex/issues/27597

9. **[#32031] – Multi‑agent v2 spawn_agent hides model overrides**  
   *Author: lidge-jun | Comments: 5 | 👍: 14*  
   Critical UX regression: the new multi-agent surface makes sub-agent model selection undiscoverable or outright broken. Affects `gpt-5.6-sol` users.  
   https://github.com/openai/codex/issues/32031

10. **[#29122] – Stable IDE extension ships prerelease CLI with silent "Code mode"**  
    *Author: alexchexes | Comments: 4 | 👍: 0*  
    A stable extension bundle contained an alpha CLI that activated an unfinished "Code mode", breaking long MCP calls and burning tokens during waits.  
    https://github.com/openai/codex/issues/29122

## Key PR Progress (10 selected)

1. **[#34852] – Wake sleeping threads for queued agent mail**  
   *Closed by copyberry[bot]* – Prevents idle threads from missing agent work when durable sleep is interrupted.  
   https://github.com/openai/codex/pull/34852

2. **[#34851] – Use batch metadata for plugin app summaries**  
   *Closed by copyberry[bot]* – Loads plugin metadata via authenticated batch API (100/apps per batch), with fallback caching on failure.  
   https://github.com/openai/codex/pull/34851

3. **[#34850] – Disable image generation for Free‑plan accounts**  
   *Closed by copyberry[bot]* – Skips registering the `image_generation` tool for free accounts, while keeping existing checks intact for others.  
   https://github.com/openai/codex/pull/34850

4. **[#34849] – Cache remote plugin catalogs by scope**  
   *Closed by copyberry[bot]* – Adds disk caching for global/user/workspace catalogs (3h TTL, warm refresh). Reduces repeated network requests.  
   https://github.com/openai/codex/pull/34849

5. **[#34847] – Use Guardian model limits for review sessions**  
   *Closed by copyberry[bot]* – Clears context-window overrides when Guardian review picks a different model, ensuring accurate limits.  
   https://github.com/openai/codex/pull/34847

6. **[#34846] – Allow custom providers to opt into standalone web search**  
   *Closed by copyberry[bot]* – Introduces `supports_standalone_web_search` provider setting, enabling `web.run` for opted-in custom Response providers.  
   https://github.com/openai/codex/pull/34846

7. **[#34845] – Track multi‑agent mode in world state**  
   *Closed by copyberry[bot]* – Stores multi-agent mode instructions as durable model context, surviving history changes without redundant hints.  
   https://github.com/openai/codex/pull/34845

8. **[#34835] – Track compaction time in turn profiles**  
   *Closed by copyberry[bot]* – Adds `compaction_ms` metric to turn analytics, distinguishing compaction from idle time.  
   https://github.com/openai/codex/pull/34835

9. **[#34831] – Flush analytics before in‑process app server shutdown**  
   *Closed by copyberry[bot]* – Prevents loss of completed-turn and accepted-line events by flushing the analytics queue during shutdown.  
   https://github.com/openai/codex/pull/34831

10. **[#34825] – Reduce cloning when building Responses requests**  
    *Closed by copyberry[bot]* – Shares raw JSON tool definitions and reduces incremental WebSocket item prefix cloning for better performance.  
    https://github.com/openai/codex/pull/34825

## Feature Request Trends
- **Customizable TUI status line** (Issue #17827, 119 👍) – remains the most-requested ergonomic improvement.  
- **Persistent disable of auto‑resolution timer** (Issues #28969, #34310) – strong demand for a flag to kill the 60‑second interrupt, especially in planning mode.  
- **Workspace‑scoped chat history** in the VS Code extension (Issue #25319, 47 👍) – users want project‑isolated threads.  
- **Inline diffs in Desktop app** (Issue #24513) – missing diff display compared to CLI turns code review into manual git diff.  
- **Remote control project sidebar visibility** (Issues #31407, #33727) – projects disappearing after updates or when connected remotely.

## Developer Pain Points
- **Rate‑limit drain confusion** (#33685): The weekly limit feels as restrictive as the old 5‑hour limit, undermining the supposed improvement.  
- **macOS SQLite log churn** (#29532): Persistent disk I/O from debug logging, even after partial fixes.  
- **Hooks regression** (#21639): Desktop updates breaking pre/post hooks disrupts automated workflows.  
- **OAuth issuer validation fails** (#31573): Blocks free‑tier CLI login for some environments.  
- **Windows sandbox failures** (#22428, #32876, #29639, #33778): Multiple sandbox and process spawning issues on Windows, including `CreateProcessAsUserW` errors and excessive `taskkill.exe` processes.  
- **Multi‑agent v2 model override breakage** (#32031): Sub-agent model selection is either hidden or fails, hurting power users.  
- **IDE extension crashes in codespaces** (#27892): The extension can destabilize GitHub Codespaces entirely.  
- **MCP OAuth refresh missing RFC 8707 resource parameter** (#33403): Authenticated MCP servers break after token expiry.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest – 2026-07-23

---

## Today’s Highlights

Three releases landed today, including a stable v0.52.0 with triage worker foundations and a v0.53.0-preview that fixes A2A role coalescing. The community is reporting persistent agent‑hang and shell‑stuck issues (P1), while a critical security fix for shell‑variable expansion bypass was merged. Developer focus remains on agent reliability, sub‑agent coordination, and evaluation infrastructure.

---

## Releases

| Version | Summary |
|---------|---------|
| **v0.52.0‑nightly.20260723.g9681621c6** | Sequential credential verification with restored `GOOGLE_APPLICATION_CREDENTIALS` fallback; new `eval coverage report` command. |
| **v0.53.0‑preview.0** | Fixed A2A `400 Bad Request` by grouping cancelled tool responses and coalescing consecutive roles; LLM‑based triage orchestrator container build. |
| **v0.52.0** | Refactored CI config exclusion from workspace context; introduced core modules for caretaker triage worker. |

Omit changelog PRs for brevity.

---

## Hot Issues (Top 10)

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)** – *Subagent recovery after MAX_TURNS reported as GOAL success*  
   P1 bug: `codebase_investigator` misreports termination as success when turn‑limit is hit, hiding interruptions. 12 comments, 2 👍. Community expects honest failure reporting.

2. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)** – *Generalist agent hangs forever*  
   P1: simple tasks like folder creation freeze when the generalist agent is used. Workaround: instruct model not to defer. 8 comments, 8 👍 – high frustration.

3. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968)** – *Gemini does not use skills and sub‑agents enough*  
   Custom skills (e.g., git, gradle) are ignored even when descriptions match the task – anecdotal but widely echoed. 6 comments.

4. **[#25166](https://github.com/google-gemini/gemini-cli/issues/25166)** – *Shell command stuck “Waiting input” after completion*  
   CLI hangs on finished commands, keeping shell active. P1, 4 comments, 3 👍. Impacts workflow reliability.

5. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983)** – *Browser subagent fails on Wayland*  
   P1: browser agent crashes in Wayland environments. 4 comments, 1 👍. Linux users affected.

6. **[#26522](https://github.com/google-gemini/gemini-cli/issues/26522)** – *Auto Memory retries low‑signal sessions indefinitely*  
   Sessions not processed remain in index and resurface, wasting extraction calls. 5 comments.

7. **[#22232](https://github.com/google-gemini/gemini-cli/issues/22232)** – *Enhance browser_agent resilience: lock recovery*  
   Fail‑fast on locked browser profiles – feature request to automatically take over or recover orphaned sessions. 4 comments.

8. **[#20079](https://github.com/google-gemini/gemini-cli/issues/20079)** – *Symlink in ~/.gemini/agents/ not recognized as agent*  
   Symlinked agent definitions are silently ignored. 4 comments – trivial fix but disruptive for power users.

9. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246)** – *400 error with >128 tools*  
   Exceeding 128 tools triggers API error. Expectation: smarter tool scoping. 3 comments.

10. **[#22093](https://github.com/google-gemini/gemini-cli/issues/22093)** – *(Sub)agents running without permission since v0.33.0*  
    Subagents execute despite being disabled; MCP users affected. 3 comments – security/privacy concern.

---

## Key PR Progress

1. **[#28410](https://github.com/google-gemini/gemini-cli/pull/28410)** – *fix(core): shorten MCP tools/list discovery timeout*  
   P1: reduces CLI startup freeze from 10 min to fast failure when a server doesn’t respond.

2. **[#28406](https://github.com/google-gemini/gemini-cli/pull/28406)** – *fix(availability): apply modelIdResolutions to tool sub‑agent configs*  
   P1: API‑key users without preview access now correctly resolve model IDs instead of hitting `INVALID_MODEL` errors.

3. **[#28403](https://github.com/google-gemini/gemini-cli/pull/28403)** – *fix(core): block $VAR and ${VAR} variable expansion bypass*  
   Security fix (GHSA‑wpqr‑6v78‑jr5g): closes incomplete detection of shell substitution patterns.

4. **[#28309](https://github.com/google-gemini/gemini-cli/pull/28309)** – *fix(cli): improve markdown rendering for CJK text wrapping and __bold__ syntax*  
   Fixes hard line‑breaks in CJK text and misinterpreted lists – important for international users.

5. **[#28469](https://github.com/google-gemini/gemini-cli/pull/28469)** – *fix(core): rotate session ID on model fallback*  
   Prevents `[API Error: Please submit a new query]` when falling back to gemini‑2.5‑flash.

6. **[#28485](https://github.com/google-gemini/gemini-cli/pull/28485)** – *fix(cli): add gemini‑3.5‑flash to model selector for all users*  
   Fixes missing model in selector – legacy code only surfaced `DEFAULT_GEMINI_FLASH_MODEL`.

7. **[#28506](https://github.com/google-gemini/gemini-cli/pull/28506)** – *fix(cli): propagate AbortSignal in /compress command*  
   Prevents dangling network requests when user starts a new prompt or presses Escape.

8. **[#28431](https://github.com/google-gemini/gemini-cli/pull/28431)** – *feat(pr‑generator‑infra): configure Cloud Run job, Workflows, Dockerfile*  
   Foundational infrastructure for SSR code generation pipeline – Eventarc‑triggered Cloud Workflow.

9. **[#28169](https://github.com/google-gemini/gemini-cli/pull/28169)** – *feat(evals): add eval coverage report command*  
   Merged into nightly; cross‑references eval inventory with tool registry (`npm run eval:coverage`).

10. **[#28404](https://github.com/google-gemini/gemini-cli/pull/28404)** – *fix(core): override genai version of google‑auth‑library to 10.9.0*  
    Resolves compatibility issue in authentication stack.

---

## Feature Request Trends

- **AST‑aware file operations**: Multiple issues (e.g., #22745, #22746) push for method‑level reads, smarter codebase mapping, and reduced token consumption.
- **Agent self‑awareness & configuration**: Users want the CLI to know its own flags, hotkeys, and ability to run itself (#21432).
- **Browser agent resilience**: Automatic takeover of locked profiles, Wayland support, and `settings.json` override respect (#22232, #21983, #22267).
- **Evaluation infrastructure**: Component‑level evals (#24353), subagent trajectory sharing via `/chat share` (#22598), and always‑passing steering tests (#23313).
- **Memory system improvements**: Quarantine invalid patches (#26523), deterministic redaction (#26525), and stop retrying low‑signal sessions (#26522).

---

## Developer Pain Points

- **Agent hangs and freezes**: Generalist and browser agents frequently hang indefinitely (#21409, #21983), and shell commands remain stuck after completion (#25166).
- **False success reports**: Subagents report `GOAL` even after hitting turn limits (#22323), undermining trust.
- **Permission bypass / silent activation**: Subagents run despite being disabled in config (#22093).
- **Tool limits**: 400 error when more than 128 tools are enabled (#24246); CLI also lacks smart scoping.
- **Workspace clutter**: Temporary scripts left in random directories (#23571), symlinks ignored (#20079).
- **Missing debugging support**: Bug reports lack sub‑agent context (#21763), and `get‑shit‑done` output crashes on summary (#22186).

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-07-23

**Data source:** [github.com/github/copilot-cli](https://github.com/github/copilot-cli)

---

## Today's Highlights

Three patch releases shipped within the last 24 hours (v1.0.74-1 through v1.0.74-3), with the first introducing **Gemini 3.6 Flash support** and a first-run sandbox opt‑in splash. Meanwhile, the community continues to report regressions in authentication (BYOK), terminal rendering in tmux, and Windows‑specific crashes. A long‑standing feature request for native PDF reading (#443) remains the most‑upvoted open issue (33 👍).

## Releases

Three versions were published in the last 24 hours:

- **v1.0.74-1**  
  *Added:* First‑run splash screen to opt into the default sandbox. Support for the `gemini-3.6-flash` model.  
  *Improved:* Multiplexing session isolation – open dialogs no longer leak between sessions; eligible pickers re‑open on switch‑back. The `$` interactive shell shortcut now operates as documented (cut‑off in release notes).  
- **v1.0.74-2** – Bug fixes and minor changes.  
- **v1.0.74-3** – Further fixes.

[Full release notes](https://github.com/github/copilot-cli/releases)

## Hot Issues (10 notable)

1. **[#443 – PDF Reading Support](https://github.com/github/copilot-cli/issues/443)**  
   *Feature request, ↑33, 6 comments*  
   Copilot CLI cannot natively read PDFs, forcing users to install external tools. Highly requested for academic and documentation workflows.

2. **[#3534 – WSL2 ARM64: /copy fails with clip.exe quoting bug](https://github.com/github/copilot-cli/issues/3534)**  
   *Bug, ↑4, 5 comments*  
   Clipboard writes on WSL2 (ARM64) break with `clip.exe exited with code 1` due to incorrect `cmd.exe` quoting in v1.0.55+. Actively discussed.

3. **[#4016 – BYOK rejected in `--acp` mode (authentication regression)](https://github.com/github/copilot-cli/issues/4016)**  
   *Bug, ↑4, 5 comments*  
   Custom provider bypasses login in normal mode but still requires GitHub OAuth in `--acp --stdio`. A recurring issue (#3048, #3902) that regressed between v1.0.61 and v1.0.68.

4. **[#4163 – Zombie processes accumulate under copilot PID on Linux](https://github.com/github/copilot-cli/issues/4163)**  
   *Bug, ↑2, 3 comments*  
   Child processes are not reaped, causing zombie accumulation (~2/min per session). Degrades system resources over long sessions.

5. **[#4206 – Environment footer stuck on “Loading:” forever (MCP handshake stall)](https://github.com/github/copilot-cli/issues/4206)**  
   *Bug, ↑2, 2 comments*  
   Under enterprise MCP policies, the status footer never transitions to completed state despite everything being loaded. Blocks interactive use.

6. **[#1688 – Configurable auto‑compaction threshold for context memory](https://github.com/github/copilot-cli/issues/1688)**  
   *Feature request, ↑5, 2 comments*  
   High‑capacity models (e.g., Claude Opus 4.6) suffer latency before built‑in compaction triggers; users want a tunable threshold.

7. **[#4161 – `task_complete` tool unavailable after switching back to autopilot mode](https://github.com/github/copilot-cli/issues/4161)**  
   *Bug, ↑1, 2 comments*  
   Regression of #1523 – the `task_complete` tool is removed from the tool list when re‑entering autopilot, breaking agent workflows.

8. **[#4165 – `copilot --resume` hangs on Windows cold start](https://github.com/github/copilot-cli/issues/4165)**  
   *Bug, ↑1, 2 comments*  
   Resuming a session from a cold start in PowerShell hangs at “Resuming session…” with no error. Works if a session was opened first.

9. **[#4222 – Infinite React/Ink render loop returns on v1.0.72+ (regression of #2802)](https://github.com/github/copilot-cli/issues/4222)**  
   *Bug, 0 comments*  
   Main pane freezes on VS Code integrated terminal (Windows native). A well‑known issue that has reappeared after being closed for v1.0.31.

10. **[#4218 – Allow users to configure the model pool used by Auto mode](https://github.com/github/copilot-cli/issues/4218)**  
    *Feature request, ↑6, 0 comments*  
    Auto mode today uses all available models under the user’s plan; users want to restrict it to a subset for predictable cost/behavior.

## Key PR Progress

Only two pull requests were updated in the last 24 hours, neither representing substantive code changes:

- **#4228** – [Withdrawn by author](https://github.com/github/copilot-cli/pull/4228)  
  Attempted to document a workaround for the WSL2 clipboard issue (#3534) but incorrectly targeted the public documentation instead of the private clipboard runtime. Branch deleted.

- **#3163** – [ViewSonic monitor](https://github.com/github/copilot-cli/pull/3163)  
  Appears to be a test/spam PR referencing unrelated issue numbers. No meaningful code.

*No PRs with new features or significant fixes were merged or active this week.*

## Feature Request Trends

The community is pushing in three main directions:

1. **Richer document support** – Native PDF reading (#443) and better handling of scanned/paper formats remain the top request.
2. **Cost transparency and control** – Users want per‑subagent credit usage breakdown (#4207), configurable auto mode model pools (#4218), and context‑memory compaction thresholds (#1688).
3. **Agent orchestration improvements** – Inline/explicit agent chaining (#4208), a documented `skill` tool alias for custom agents (#4209), and better visibility into MCP tool‑schema cost (#4189).

## Developer Pain Points

Recurring frustrations visible in recent issues:

- **Authentication regressions** – BYOK workflows for custom providers and ACP mode continue to break across releases (#4016, previously #3048, #3902).
- **Terminal rendering quirks** – Dark‑on‑dark prompts inside tmux (#4212), infinite React/Ink render loops on Windows (#4222, regression of #2802), and missing OSC 133 sequences for shell navigation (#3428).
- **Windows stability** – Hard crashes on exit (#4217), crashes with native notifications (#4219), and `--resume` hangs (#4165) make the Windows experience unreliable.
- **Permission scanner false positives** – In plan mode, read‑only `gh api` calls and `git log -L` arguments are misclassified as potentially modifying the workspace (#4220, #4221).
- **Subagent and background operation fragility** – Server errors during subagent tasks (#4226) and coordinator hangs when only a subagent is running (#4225) disrupt complex workflows.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI Community Digest – 2026-07-23

## Today's Highlights

No new releases were published in the last 24 hours, but the community reported two new bugs and one feature request. A critical issue (#2534) affecting third‑party API compatibility was quickly addressed with a targeted PR (#2535), while Windows users dealing with Unicode encoding crashes (#2532) and a long‑standing TPD rate‑limit bug (#2318) continue to await fixes.

## Releases

None in the last 24 hours.

## Hot Issues

1. **[#2318 – request reached organization TPD rate limit, current: 1505241](https://github.com/MoonshotAI/kimi-cli/issues/2318)**  
   *Author: globalvideos272-lab · Updated: 2026-07-22 · 2 👍*  
   A months‑old bug where the CLI incorrectly calculates daily token usage, causing premature rate limiting on the Moonshot platform. Despite high interest and a clear reproduction, no fix has been merged yet.

2. **[#2534 – Model API error 400: Unsupported parameter(s): `prompt_cache_key`](https://github.com/MoonshotAI/kimi-cli/issues/2534)**  
   *Author: dewrama · Created/Updated: 2026-07-23*  
   Introduced in the latest update, the CLI now sends a `prompt_cache_key` parameter that is rejected by third‑party Kimi‑compatible endpoints (e.g., Nvidia NIM). This breaks workflows that rely on non‑Moonshot backends. A PR (#2535) is already open to scope the parameter to official Moonshot APIs.

3. **[#2533 – Feature Request: Per‑agent model selection for sub‑agents](https://github.com/MoonshotAI/kimi-cli/issues/2533)**  
   *Author: bob0x-ai · Created/Updated: 2026-07-23*  
   Proposes allowing sub‑agents to use a different model than the session default, enabling cost‑tiered multi‑agent pipelines (cheap models for trivial tasks, powerful models for complex reasoning). No community reactions yet, but the idea aligns with growing multi‑agent usage.

4. **[#2532 – `kimi web` crashes on Windows with redirected stdout: UnicodeEncodeError (gbk)](https://github.com/MoonshotAI/kimi-cli/issues/2532)**  
   *Author: BFour666 · Created/Updated: 2026-07-22*  
   On Chinese‑locale Windows, piping or redirecting stdout causes a crash due to an unsupported unicode character (`➜`) in the startup banner. Blocks CLI integration into CI/CD or scripted workflows on affected systems. No fix posted yet.

## Key PR Progress

1. **[#2535 – fix(llm): scope prompt cache keys to Moonshot APIs](https://github.com/MoonshotAI/kimi-cli/pull/2535)**  
   *Author: Sanjays2402 · Updated: 2026-07-23*  
   Directly resolves #2534 by ensuring the `prompt_cache_key` parameter is only sent to official Moonshot endpoints, preserving caching for Moonshot users while fixing third‑party API errors. A clean, targeted fix.

2. **[#2524 – fix(tools): count StrReplaceFile replacements against the running content](https://github.com/MoonshotAI/kimi-cli/pull/2524)**  
   *Author: Sreekant13 · Updated: 2026-07-22*  
   Fixes a subtle bug in `StrReplaceFile` where the reported count of replacements was computed against the original file content, causing chained edits that produce new strings to be miscounted. Resolves #2526.

3. **[#2530 – fix(shell): stop blocking until timeout when a detached child holds the pipes](https://github.com/MoonshotAI/kimi-cli/pull/2530)**  
   *Author: ayaangazali · Updated: 2026-07-22*  
   Addresses a long‑standing issue (#2468) where shell commands that launch daemon processes (e.g., `some_daemon & echo done`) would hang indefinitely because the CLI waited for EOF from detached child processes before checking exit codes. Now properly times out and proceeds.

## Feature Request Trends

The most prominent new request is **per‑agent model selection** (#2533): users want sub‑agents to run on a different model than the session default, enabling cost‑optimised multi‑agent workflows. This reflects a broader trend in the Kimi ecosystem where power users are building complex agent chains and need fine‑grained control over model allocation.

No other substantial feature requests appeared in the last 24 hours.

## Developer Pain Points

- **Third‑party API breakage** (#2534) – The latest release silently broke compatibility with non‑Moonshot endpoints by sending an unsupported parameter. While a fix is in review, this highlights the need for better testing across diverse backends.
- **Windows Unicode crashes** (#2532) – A basic output encoding issue with the startup banner prevents CLI use in piped or redirected environments on Chinese‑locale Windows, blocking automation and CI adoption.
- **Persistent rate‑limit miscalculation** (#2318) – The TPD rate‑limit bug has been open for over two months with no resolution, causing frustration for heavy users on the Moonshot platform.
- **Sub‑agent model inflexibility** (#2533) – Users building multi‑agent apps are forced to use a single model for all agents, leading to unnecessary cost or reduced capability for certain tasks.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-07-23

## Today’s Highlights
The community continues to focus on model interoperability and session reliability: multiple issues around Qwen models’ “system message must be at the beginning” error were resolved, while a long‑running request for custom system prompts (#7101, 123👍) was finally closed. On the PR side, infrastructure improvements dominate — token usage diagnostics, command source metadata, and a new `roll-call` command for connectivity testing landed today, alongside a critical fix for orphan assistant scaffolds that could leave sessions in an unrecoverable state.

## Releases
- **pr-38252-videos** – Verification recordings for PR #38252 (no version bump). *No new versions were published in the last 24h.*

## Hot Issues
1. **[#7101 – Allow custom system prompts in global, project or custom directories](https://github.com/anomalyco/opencode/issues/7101)**  
   *35 comments | 123👍* – The most upvoted request this digest. Proposes extending system prompt configuration beyond the single file, drawing from a Reddit discussion on shorter prompts. *Closed after 7 months.*

2. **[#25582 – "Fork to new session" action from message timeline in OpenCode Desktop](https://github.com/anomalyco/opencode/issues/25582)**  
   *9 comments | 5👍* – Users want to branch a conversation from any message, matching existing CLI behavior. Desktop app parity remains a recurring theme.

3. **[#21911 – AI edit strips all generics in TS files](https://github.com/anomalyco/opencode/issues/21911)**  
   *8 comments* – A persistent bug where the edit tool removes generic type annotations. Affects all models; reportedly started after removing `oh-my-opencode`. *Closed but likely to resurface.*

4. **[#16560 / #20785 / #20813 – "System message must be at the beginning" errors with Qwen models](https://github.com/anomalyco/opencode/issues/16560)**  
   *6, 6, 4 comments* – Multiple reports across different Qwen variants (3.5‑122b‑a10b, 3.5‑397B‑A17B, 3.6‑plus) via Nvidia provider and Superpowers plugin. All closed, suggesting a fix went in.

5. **[#28961 – Model does not actively update todowrite list during task execution](https://github.com/anomalyco/opencode/issues/28961)**  
   *6 comments | 2👍* – Agents fail to mark todo items as done, leaving progress tracking broken. Community wants more reliable tool‑usage discipline.

6. **[#28965 – Add F# wasm syntax highlight](https://github.com/anomalyco/opencode/issues/28965)**  
   *5 comments* – Missing F# support in the WASM‑based syntax highlighter; a straightforward feature request with a reference implementation.

7. **[#29017 – `cp` tool](https://github.com/anomalyco/opencode/issues/29017)**  
   *5 comments* – Models hallucinate a `cp` tool; users request a built‑in copy command to avoid errors and improve reliability.

8. **[#25490 – Desktop memory grows to 3‑4GB with multiple workspaces/session tabs](https://github.com/anomalyco/opencode/issues/25490)**  
   *4 comments* – Memory leak on Windows after recent desktop updates, culminating in Solid/WebView crashes. A serious stability concern.

9. **[#28958 – Plugin hook rejection aborts unrelated parallel sessions](https://github.com/anomalyco/opencode/issues/28958)**  
   *3 comments | 2👍* – A race condition where a failing plugin hook aborts sibling sessions in parallel‑subagent workflows. Highly disruptive for power users.

10. **[#29060 – `session list` not displaying historical sessions](https://github.com/anomalyco/opencode/issues/29060)**  
    *2 comments | 1👍* – CLI only shows 2 sessions despite 238 in the database. Suggests a retrieval bug introduced in v1.15.x.

## Key PR Progress
1. **[#38398 – feat(tui): add turn token usage diagnostics](https://github.com/anomalyco/opencode/pull/38398)**  
   Derives token summaries directly from existing assistant step data, groups continuation steps, and detects cache‑bust warnings. *Open.*

2. **[#38438 – feat(command): identify command sources](https://github.com/anomalyco/opencode/pull/38438)**  
   Adds source metadata (config/plugin/MCP) to commands, enabling clients to distinguish origins. *Open.*

3. **[#38437 – feat(server): expose location paths](https://github.com/anomalyco/opencode/pull/38437)**  
   New API endpoint and schemas for home, state, config, worktree directories. Improves client integration. *Open.*

4. **[#38427 – fix(ai): normalize Bedrock cache usage](https://github.com/anomalyco/opencode/pull/38427)**  
   Treats Bedrock Converse `inputTokens` as non‑cached input, matching AWS semantics. *Closed.*

5. **[#38424 – fix(provider): select prompt cache keys by SDK](https://github.com/anomalyco/opencode/pull/38424)**  
   Differentiates cache key formats per AI SDK npm package, fixing incorrect keys for DeepInfra/Cerebras. *Open.*

6. **[#38414 – fix(core): migrate named agent colors](https://github.com/anomalyco/opencode/pull/38414)**  
   Preserves named colors in V1 config schema; migrates them to `#aaaaaa` before V2 validation. *Closed.*

7. **[#38433 – feat(opencode): add roll-call command](https://github.com/anomalyco/opencode/pull/38433)**  
   New `roll-call` command to test multiple text models for connectivity and latency (closes #13711). *Open.*

8. **[#38432 – fix(session): recover orphan assistant scaffolds](https://github.com/anomalyco/opencode/pull/38432)**  
   Handles cases where an assistant scaffold is persisted but never set up, preventing session stalling. *Open.*

9. **[#38401 – fix(core): load dynamic models for generation](https://github.com/anomalyco/opencode/pull/38401)**  
   Allows stateless `/api/generate` to use dynamically loaded providers (e.g., Gemini 3.5 Flash via AI SDK). *Closed.*

10. **[#38428 – fix(core): skip ahead by counting newlines when reading at a high offset](https://github.com/anomalyco/opencode/pull/38428)**  
    Dramatically speeds up `ReadTool` for large files at high line offsets (closes #35044). *Open.*

## Feature Request Trends
- **Customisable system prompts** (#7101, 123👍) – desire for global, project‑level, and per‑directory prompt overrides.
- **Session forking** (#25582) – users want to branch conversations from any message, especially in the Desktop app.
- **New built‑in tools** (#29017 – `cp`; #29030 – `/effort` and `/goal` slash commands) – reducing hallucination and adding task‑focus controls.
- **ACP‑backed agents** (#28991) – using other ACP‑compatible agents as backends natively.
- **Auto‑rename sessions** (#29002) – re‑title conversations after N messages to stay relevant.
- **F# syntax highlighting** (#28965) – completing WASM language support.

## Developer Pain Points
- **System message ordering** – multiple reports with Qwen models via Nvidia; the “system message must be at the beginning” error appears to be resolved but was a major frustration.
- **AI stripping generics** (#21911) – the edit tool destroys TypeScript generic annotations; workarounds are manual and time‑consuming.
- **Memory leaks** (#25490) – Desktop app grows to 3–4 GB on Windows with multiple workspaces, leading to crashes.
- **Session mixing in non‑git directories** (#18890) – `--continue` resumes wrong sessions when outside git repos.
- **Plugin hook isolation** (#28958) – a single failing plugin aborts parallel sessions, breaking multi‑agent workflows.
- **`apply_patch` verification failures** (#27282) – patch divergence on Windows despite claim of fix; still sporadic.
- **Unresponsive GUI after recent updates** (#29024) – lag on Windows binary since v1.15.5–1.15.6.
- **`session list` returning incomplete results** (#29060) – CLI shows only 2 of 238 sessions, likely a DB query regression.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest – 2026-07-23

## Today’s Highlights

The repository saw a flurry of critical bug fixes and infrastructure improvements. A core‑test suite failure (`#7537`) turned `main` red for all PRs, and two nightly release workflows failed (`#7549`, `#7555`). Meanwhile, several high‑priority patches landed: the side‑query thinking bug (`#7284`) was closed, and a security fix for credential exposure (`#6601`) was merged. On the feature front, PRs introducing workspace‑level generation, web‑shell git mode, and GenAI telemetry alignment signal continued investment in both developer experience and observability.

## Releases

No official product release today. A temporary prerelease `v0.0.0-benchmark-poc.20260722.1` was published to validate the GitHub Actions → ECS benchmark worker → result publication pipeline; it is **not a Qwen Code product release** and should be ignored by end‑users.

## Hot Issues

1. **[[#7284]](https://github.com/QwenLM/qwen-code/issues/7284)** `side-query forces enable_thinking=false, breaking TokenPlan endpoints` (CLOSED, P1)  
   *Why it matters:* Every side‑query (web_fetch, classifiers) forced `enable_thinking: false`, causing 400 errors on endpoints that require thinking. This blocked tool usage for many users. The fix was merged quickly; community reaction was relief.

2. **[[#7537]](https://github.com/QwenLM/qwen-code/issues/7537)** `Core test suite is red on main: fork dispatch test never sees registry.complete` (CLOSED, P1)  
   *Why it matters:* A failing test on `main` made every open PR’s CI red regardless of content. This blocked merging for hours until a fix was landed today. Community frustration was high.

3. **[[#7516]](https://github.com/QwenLM/qwen-code/issues/7516)** `Main CI failed: E2E Tests` (CLOSED)  
   *Why it matters:* A main‑branch E2E test failure was automatically filed and labeled for agent‑assisted fix. Shows the team’s reliance on automated triage.

4. **[[#7489]](https://github.com/QwenLM/qwen-code/issues/7489)** `VS Code Companion: file picker inserts @filename but image is not attached` (CLOSED)  
   *Why it matters:* A clear UX bug – users think they’re attaching images but only the filename text is sent. The issue was triaged quickly but the fix is pending.

5. **[[#6577]](https://github.com/QwenLM/qwen-code/issues/6577)** `Windows PowerShell / Windows Terminal: Alt+V cannot paste clipboard screenshots` (OPEN, P2)  
   *Why it matters:* A long‑standing platform limitation. Alt+V is a standard paste‑image shortcut on Windows, but Qwen Code’s TUI doesn’t handle it. The issue is marked `welcome-pr`.

6. **[[#6601]](https://github.com/QwenLM/qwen-code/issues/6601)** `Shell subprocess inherits sensitive environment variables causing credential exposure` (CLOSED, P1)  
   *Why it matters:* A serious security vulnerability – shell commands run by the agent could leak API keys and tokens. Fixed by merging `sanitizeChildEnv()`. Community praise for the rapid response.

7. **[[#7404]](https://github.com/QwenLM/qwen-code/issues/7404)** `Startup update‑check timeout too short when loading long old sessions` (CLOSED, P3)  
   *Why it matters:* Users with many previous conversations experienced frequent timeouts during version checking. The fix may involve extending the timeout or deferring the check.

8. **[[#7515]](https://github.com/QwenLM/qwen-code/issues/7515)** `Failed to check for updates (registry error)` (OPEN, P3)  
   *Why it matters:* Several users reported `/update` and startup checks failing after v0.20.1, even though the registry is reachable. Root cause being investigated (see also #7520).

9. **[[#7520]](https://github.com/QwenLM/qwen-code/issues/7520)** `npm 12 compatibility: update check fails with "registry error"` (OPEN, P2)  
   *Why it matters:* Fresh installations on Node.js 26 (which ships npm 12) cannot update Qwen Code. The bug is in the update‑check helper and is blocking early adopters of the latest Node runtime.

10. **[[#7264]](https://github.com/QwenLM/qwen-code/issues/7264)** `Cold-start follow-ups: remaining lazy-loading candidates from ACP eager-closure audit` (OPEN, P2)  
    *Why it matters:* Startup performance remains a pain point. The audit found 17.24 MiB of eager static imports during cold start. Follow‑up work is tracked to lazily load non‑critical modules.

## Key PR Progress

1. **[[#7552]](https://github.com/QwenLM/qwen-code/pull/7552)** `feat(serve): add workspace-level generation` (OPEN)  
   Adds a stateless, tool‑free generation endpoint scoped to the primary workspace, with cancellation and SSE streaming. Important for headless automation use cases.

2. **[[#7550]](https://github.com/QwenLM/qwen-code/pull/7550)** `fix(cli): say review coverage gaps in the author's units, not chunk ids` (OPEN)  
   Improves the `/review` command output by reporting coverage in the PR author’s units instead of internal chunk IDs – a UX enhancement.

3. **[[#7541]](https://github.com/QwenLM/qwen-code/pull/7541)** `fix(core): preserve disabled reasoning effort` (OPEN)  
   Ensures that when a side query disables thinking, an explicitly configured `reasoning_effort: "none"` is preserved. Prevents regression from the #7284 fix.

4. **[[#7490]](https://github.com/QwenLM/qwen-code/pull/7490)** `fix(autofix): retry a skipped‑Prepare instead of stranding the PR` (OPEN)  
   Prevents a base/infra failure that occurs before the agent runs from permanently killing a PR. Retries instead of going terminal.

5. **[[#7471]](https://github.com/QwenLM/qwen-code/pull/7471)** `feat(web-shell): add git mode selector for new session creation` (OPEN)  
   Adds a popover in the Web Shell composer allowing users to choose between “current branch”, “new branch”, and “detached HEAD” when starting a session. Enhances Git workflow integration.

6. **[[#7554]](https://github.com/QwenLM/qwen-code/pull/7554)** `feat(autofix): auto‑update a PR red only from a stale, since‑fixed base` (OPEN)  
   Teaches the autofix system to automatically merge the latest `main` into a PR that is red only because its base was broken at merge time. Reduces manual intervention.

7. **[[#7536]](https://github.com/QwenLM/qwen-code/pull/7536)** `feat(core): Align GenAI telemetry with ARMS` (OPEN)  
   Aligns LLM, tool, and agent span attributes with OpenTelemetry GenAI conventions and Alibaba Cloud ARMS. Important for enterprise observability.

8. **[[#7527]](https://github.com/QwenLM/qwen-code/pull/7527)** `fix(core): strip daemon secrets from hook and tool‑discovery child env` (OPEN)  
   Extends the `sanitizeChildEnv()` fix from #7256 to cover hooks and tool‑discovery child processes, closing remaining credential‑exposure gaps.

9. **[[#7534]](https://github.com/QwenLM/qwen-code/pull/7534)** `fix(core): retry requests when providers require thinking` (OPEN)  
   Auto‑retries an OpenAI‑compatible request if it was sent with `enable_thinking: false` and the provider returns 400. Complements the #7284 fix with graceful recovery.

10. **[[#7535]](https://github.com/QwenLM/qwen-code/pull/7535)** `fix(scripts): retry model calls and surface degraded release notes` (OPEN)  
    Makes the stable‑release notes generator retry model calls before falling back to PR titles, and marks degraded runs as visible failures instead of silent greens.

## Feature Request Trends

The most‑requested feature directions emerging from recent issues are:

- **Enterprise integration profiles** – A documentation‑first proposal for a provider‑neutral external‑memory integration (e.g., enterprise knowledge bases) ([#7449](https://github.com/QwenLM/qwen-code/issues/7449)).
- **Web Shell UX improvements** – A “Start In” context selector for local vs. worktree sessions ([#6701](https://github.com/QwenLM/qwen-code/issues/6701)), plan‑execution DAG visualization with live subagent links ([#7525](https://github.com/QwenLM/qwen-code/issues/7525)), and workspace‑level generation endpoints ([#7552](https://github.com/QwenLM/qwen-code/pull/7552)).
- **Tool‑output hardening** – Budgeting, observability, and artifact lifecycle improvements to make tool outputs more predictable and debuggable ([#7306](https://github.com/QwenLM/qwen-code/issues/7306)).
- **Cold‑start performance** – Lazy loading of non‑critical modules to reduce startup time ([#7264](https://github.com/QwenLM/qwen-code/issues/7264)).
- **CI/CD automation** – Disk cleanup for managed npm update artifacts ([#7524](https://github.com/QwenLM/qwen-code/issues/7524)), AI‑assisted release notes with proper fallback visibility ([#7523](https://github.com/QwenLM/qwen-code/issues/7523)).

## Developer Pain Points

Recurring frustrations reported by the community include:

- **Frequent CI failures on `main`** – E2E tests and core tests have been red multiple times this week, blocking PR merges and causing cascading delays.
- **Update/version check problems** – Multiple users cannot use `/update` or startup checks due to registry parsing errors, especially on npm 12 (Node.js 26). The `getNpmCliPath` and `fetchGlobalNpmUpdateInfo` functions need a compatibility audit.
- **Platform‑specific bugs** – Windows users continue to face keyboard shortcut issues (Alt+V paste) and terminal flickering. Mobile support for Web Shell is still broken.
- **Environment variable exposure** – Even after the main fix (#6601), three child‑process paths remained un‑sanitized until today’s PR #7527. Security‑conscious users are watching closely.
- **Timeout sensitivity** – The update‑check timeout is too short when loading large previous sessions (#7404); side‑query thinking retries are still being rolled out (#7534). Users on slower networks or with many conversations experience frequent interruptions.

*For full details, visit the [Qwen Code repository](https://github.com/QwenLM/qwen-code).*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar).*