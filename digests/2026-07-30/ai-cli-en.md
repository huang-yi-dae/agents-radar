# AI CLI Tools Community Digest 2026-07-30

> Generated: 2026-07-30 02:41 UTC | Tools covered: 7

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
## 2026-07-30

---

## 1. Ecosystem Overview

The AI CLI developer tools landscape remains highly fragmented but increasingly convergent. Across seven major tools—Claude Code, OpenAI Codex, Gemini CLI, GitHub Copilot CLI, Kimi Code CLI, OpenCode, and Qwen Code—communities are grappling with the same fundamental challenges: platform stability (especially Windows), session state management, sub-agent reliability, and the tension between security/approval fatigue and automation desire. Feature borrowing is accelerating (e.g., OpenCode directly importing Claude's `/btw` command pattern), while enterprise deployment requirements are surfacing across tools with different maturity levels. The MCP ecosystem shows signs of instability as breaking changes in downstream SDKs cascade into user-facing failures.

---

## 2. Activity Comparison

| Tool | Hot Issues (today) | Active PRs (today) | Releases (24h) | Notable Activity |
|---|---|---|---|---|
| **Claude Code** | 10 | 4 | 0 | No release; regression reports dominate; MCP SDK 2.0 breaking change |
| **OpenAI Codex** | 10 | 10 | 4 alpha (Rust) | Heavy PR flow on MCP tooling; Windows stability issues top tracker |
| **Gemini CLI** | 10 | 10 | 1 nightly | Rapid iteration; many high-priority fixes merged |
| **GitHub Copilot CLI** | 10 | 1 | 1 stable (v1.0.76) | New release overshadowed by critical crash bug; very low PR throughput |
| **Kimi Code CLI** | 1 | 4 | 0 | Quiet day; enterprise gateway request signals growing adoption |
| **OpenCode** | 10 | 10 | 0 | Strong community feature demand; TUI performance improvements |
| **Qwen Code** | 10 | 10 | 1 nightly | CI flakiness dominates; autofix infrastructure heavily iterated |

**Key observations:**
- **Codex, Gemini, OpenCode, and Qwen** show the highest development velocity (10+ active PRs)
- **GitHub Copilot CLI** has notably low community PR involvement (1 PR, low quality)
- **Claude Code** has no release today but high community engagement on open issues
- **Kimi Code** remains the quietest ecosystem, likely reflecting newer/niche adoption

---

## 3. Shared Feature Directions

Several feature requirements appear across **multiple tool communities**, signaling industry-wide developer needs:

### XDG Base Directory Compliance
- **Claude Code** (#1455, 406 👍) — most upvoted issue, open 14 months
- **General Linux developer tooling expectation** — mentioned in Copilot CLI and OpenCode side discussions

### Full Hook/Automation Parity
- **Claude Code** has advanced hook system; **Codex** requests 29+ hooks (#21753, 22 👍)
- **Gemini CLI** improving sub-agent lifecycle hooks
- **Copilot CLI** adding plugin enable/disable but missing hook parity

### Sub-Agent Reliability & Transparency
- **Claude Code**: unresumable background agents (#77730), filename block lists (#44657)
- **Codex**: hooks for pre/post compact (#17148)
- **Gemini CLI**: false success reports after MAX_TURNS (#22323, P1), ignored permissions (#22093)
- **Copilot CLI**: empty sub-agent responses (#4293), model inheritance ignored (#4287)
- **OpenCode**: nested sub-agent permission hangs (#13715)

### Session Portability & State Management
- **Claude Code**: portable sessions inside project directory (#81946, #81907)
- **Codex**: sync CLI and app-server sessions (#14722)
- **OpenCode**: session tab switching performance (PRs #39589, #39568)
- **Gemini CLI**: auto-compress on overflow (PR #28488)

### Enterprise API Gateway Integration
- **Kimi Code** (#2568) — custom API Base URL for K3 gateway
- **Qwen Code** (#8021) — role-based model routing for enterprise deployments
- **Copilot CLI** — enterprise sandbox configuration requests (#4298, #4295)

### Windows Platform Stability
- **Every tool** reports Windows-specific regressions: GPU crashes (Claude #80444), process leaks (Codex #33776), scroll regression (Qwen #7964), multi-tool SchemaError (OpenCode #39600), shell detection (Kimi PR #1790)
- Windows is universally the weakest platform across all tools

### MCP Ecosystem Maturity
- **Claude Code**: SDK 2.0 breaking change (#82453)
- **Codex**: read-only hints (#36055), auth status clarity (#36045), catalog pagination (#36039)
- **Gemini CLI**: OAuth token refresh fix (#28481), discovery timeout (#28410)
- **OpenCode**: server/URL configuration fixes
- Growing consensus: MCP needs versioned contracts and migration paths

---

## 4. Differentiation Analysis

| Dimension | Claude Code | OpenAI Codex | Gemini CLI | GitHub Copilot CLI | OpenCode | Qwen Code |
|---|---|---|---|---|---|---|
| **Primary focus** | Feature depth, hooks, agent orchestration | Cross-platform desktop, MCP ecosystem | Rapid nightly iteration, model availability | Enterprise sandbox, GitHub integration | TUI experience, plugin ecosystem | CI automation, headless mode |
| **Target user** | Power developers, tool builders | Desktop-first developers | Google Cloud/AI ecosystem devs | GitHub-centric enterprise teams | Open-source community, cross-provider | Asian market, self-hosted deployments |
| **Technical approach** | Python/JS SDK ecosystem | Rust rewrite (alpha) | Node.js with auth library | Go-based CLI | Bun/TypeScript | Node.js with autofix bots |
| **Community engagement** | Very high (#1455: 406 👍) | High (#11023: 874 👍) | Moderate (#19883: 8 👍) | Low (#1613: 36 👍 highest) | High (#16992: 168 👍) | Moderate (#8039: 6 comments) |
| **Key strength** | Most mature agent capabilities | MCP tooling investment | Fastest release cadence | Native GitHub workflow | Plugin extensibility | Autofix infrastructure |
| **Key weakness** | Data loss bugs, slow issue resolution | Windows instability, session bloat | API capacity errors | Low PR velocity, zombie processes | Provider incompatibility | CI flakiness |

**Codex** leads in community upvote volume (874 for Linux desktop), while **Claude Code** leads in ecosystem maturity but struggles with regression management. **Gemini CLI** ships fixes fastest (multiple PRs merged daily), while **Copilot CLI** has the lowest community contribution activity.

---

## 5. Community Momentum & Maturity

### Rapidly Iterating (High velocity, <1 year major adoption)
- **Gemini CLI**: New nightly every day, 10+ active PRs, multiple P1 fixes merged daily. Rapidly maturing agent features but still catching up on stability.
- **Qwen Code**: Heavy autofix infrastructure investment, CI automation maturity, but flaky CI creates noise. Targeting headless/operator workflows.

### Moderately Active (Established user base, measured iteration)
- **Claude Code**: Highest community engagement on long-standing issues but slower resolution. Ecosystem pain points (MCP SDK breakage) indicate depth of use.
- **OpenCode**: Strong feature demand from community (168 👍 for `/btw`), TUI innovation, but provider compatibility issues limit broader adoption.

### Enterprise-Focused (Lower velocity, specific use cases)
- **GitHub Copilot CLI**: Stable releases but minimal community PRs. Enterprise sandbox focus limits edge growth. Zombie process leak (#4163) unresolved since v1.0.75.
- **Kimi Code**: Nascent ecosystem; single feature request today. Likely early-stage adoption, primarily in Asian markets.

### Transitioning (Major platform shift)
- **OpenAI Codex**: Mid-Rust-rewrite. Four alpha releases today indicate active development, but Windows stability regression (#33776) and session bloat (#25779) suggest the rewrite isn't yet stable.

---

## 6. Trend Signals

*Industry trends from community feedback with developer reference value*

### 1. Cross-Tool Feature Borrowing is Accelerating
- OpenCode's `/btw` command (#16992, 168 👍) is explicitly "inspired by Claude Code"
- Codex's Hook Parity request (#21753) maps directly to Claude's hook surface
- **Implication**: Claude Code is viewed as the feature reference; other tools compete on implementation quality

### 2. Windows Remains the Unsolved Platform
- Every tool reports Windows-specific crashes, regressions, or missing features
- **Implication**: Tools that solve Windows well (native ARM64, pwsh detection, stable GPU) gain differentiation. Current state disadvantages Windows developer adoption.

### 3. MCP Ecosystem Needs Governance
- **Two incidents today**: Claude Python SDK 2.0 breaking change (#82453) and Codex adding catalog limits (#36039)
- **Implication**: Without semantic versioning and migration guides, MCP risks fragmenting the tool ecosystem. Standardization body or compatibility layers needed.

### 4. "Headless Mode" is Becoming Table Stakes
- Qwen Code's `review run` (#7983), Codex's `--full-auto` removal (#36054), and Gemini's YOLO/headless improvements all point to non-interactive CI/CD use
- **Implication**: CLI tools are evolving from interactive assistants to operation platforms. Structured output contracts and exit codes matter.

### 5. Permission Fatigue Drives Demand for Smarter Approval Models
- Copilot CLI's #1168 (>12 approvals per command) and OpenCode's #13715 (nested permission hangs) highlight friction
- Claude Code's bypass regressions (#75235, #82451) show dependency on working override systems
- **Implication**: "Bypass permissions" and "auto-mode" classifiers are becoming competitive differentiators

### 6. Enterprise Production Deployments Are Driving New Feature Requests
- Kimi Code's K3 gateway (#2568), Qwen Code's model routing (#8021), and multiple sandbox configurability requests across tools
- **Implication**: CLI tools are entering enterprise procurement conversations. Custom API base URLs, role-based access, audit trails, and failover are becoming requirements.

### 7. Sub-Agent Proliferation Creates New Reliability Challenges
- False success reports (Gemini #22323), empty responses (Copilot #4293), lost transcripts (Claude #77730), permission hangs (OpenCode #13715)
- **Implication**: Sub-agent architecture has outpaced monitoring. Tools that add trajectory visibility, error propagation, and deterministic outcomes will differentiate.

---

## Summary for Technical Decision-Makers

| Your Context | Consider |
|---|---|
| Need Windows stability | Currently none excel; OpenCode and Qwen show most active Windows fixing |
| Enterprise deployment | Kimi Code (K3 gateway) or Qwen Code (model routing) for self-hosted; Copilot CLI for GitHub-centric |
| Maximum automation surface | Claude Code (hooks) or Codex (29+ hook request in progress) |
| Rapid development/ML experimentation | Gemini CLI (fastest iteration, nightly releases) |
| Plugin/extensibility | OpenCode (ui.tabs API, permission parsing) or Claude Code (mature hook system) |
| Lightweight cross-provider use | OpenCode (GPT, Gemini, Ollama) or Qwen Code (self-hosted Qwen) |

**Bottom line**: No single tool dominates across all dimensions. The ecosystem is still converging: platform stability, permission models, and headless operation are the key battlegrounds for 2026-2027.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report

**Data as of 2026-07-30 | Source: github.com/anthropics/skills**

---

## 1. Top Skills Ranking

The following pull requests have attracted the most community discussion. All remain **open** (unmerged), reflecting active review and iteration.

| # | PR | Skill / Focus | Summary | Discussion Highlights |
|---|-----|---------------|---------|----------------------|
| 1 | [#1298](https://github.com/anthropics/skills/pull/1298) | **skill-creator fix (run_eval)** | Fixes `run_eval.py` which always reports 0% recall — installs eval artifact as a real skill, fixes Windows stream reading, trigger detection, and parallel workers. | Addresses #556 and 10+ independent reproductions. Core tooling bug blocking the entire description-optimization loop. |
| 2 | [#514](https://github.com/anthropics/skills/pull/514) | **document-typography** | Typographic quality control for generated docs: orphan wraps, widow paragraphs, numbering misalignment. | Users rarely ask for good typography; skill enforces it automatically. Practical quality-of-life improvement. |
| 3 | [#486](https://github.com/anthropics/skills/pull/486) | **ODT / OpenDocument** | Creates, fills, reads, and converts `.odt`, `.ods` files; supports template filling and ODT-to-HTML. | Addresses LibreOffice/ISO-standard document workflows. triggers include “ODT”, “OpenDocument”. |
| 4 | [#83](https://github.com/anthropics/skills/pull/83) | **skill-quality-analyzer + skill-security-analyzer** | Meta-skills: quality analysis (5 dimensions) and security analysis for Claude Code skills. | Dual submission — community tooling to evaluate other skills. Indicates maturing ecosystem. |
| 5 | [#525](https://github.com/anthropics/skills/pull/525) | **pyxel (retro game engine)** | Skill for [pyxel-mcp](https://github.com/kitao/pyxel-mcp) – creates retro/pixel-art games with Python. | Author is Pyxel creator; specialized creative skill with clear workflow: write → run → inspect → iterate. |
| 6 | [#1367](https://github.com/anthropics/skills/pull/1367) | **self-audit** | Mechanical file verification + four-dimension reasoning quality gate (v1.3.0). | Universal, stack-agnostic audit skill. Step 0 verifies output files exist; four reasoning dimensions follow. |
| 7 | [#723](https://github.com/anthropics/skills/pull/723) | **testing-patterns** | Covers testing philosophy (Testing Trophy), unit/React/E2E patterns, what to test vs. not. | Comprehensive testing skill targeting the full testing stack. |
| 8 | [#1302](https://github.com/anthropics/skills/pull/1302) | **color-expert** | Color naming systems (ISCC-NBS, Munsell, XKCD, RAL, etc.) and color space guidance (OKLCH, CAM16, etc.). | Self-contained; useful for any task involving color knowledge. Updated as recently as 2026-07-21. |

> **Note**: Several high-comment PRs are infrastructure fixes (#538, #541, #539, #1099, #1050, #1323, #1261) addressing Windows compatibility, ID collision, and evaluation correctness. These are not new skills but are critical to the skill-creator toolchain.

---

## 2. Community Demand Trends

From the most-commented Issues (50 total, top 15 shown), the community is collectively calling for these new skill directions:

| Theme | Key Issue(s) | Demand Signal |
|-------|--------------|---------------|
| **Security & Trust Boundaries** | [#492](https://github.com/anthropics/skills/issues/492) – “Community skills under anthropic/ namespace” (43 comments) | Strongest signal. Users want official vs. community skill distinction, permission isolation, and namespace governance. |
| **Organizational Skill Sharing** | [#228](https://github.com/anthropics/skills/issues/228) – “Enable org-wide skill sharing” (16 comments) | Enterprise need: shared libraries, direct sharing links, team-wide deployment. |
| **Skill-Creator Tooling Reliability** | [#556](https://github.com/anthropics/skills/issues/556) – “run_eval.py 0% trigger rate” (12 comments); [#1169](https://github.com/anthropics/skills/issues/1169) – “recall=0% on every iteration”; [#1061](https://github.com/anthropics/skills/issues/1061) – “Windows compatibility” (3 comments) | Highest volume of duplicate reports. Community is blocked from optimizing descriptions. |
| **Governance & Safety Patterns** | [#412](https://github.com/anthropics/skills/issues/412) – “agent-governance skill” (6 comments) | Interest in policy enforcement, threat detection, trust scoring, audit trails. |
| **Memory & Context Efficiency** | [#1329](https://github.com/anthropics/skills/issues/1329) – “compact-memory” (9 comments) | Demand for compact symbolic notation to reduce token usage in long-running agents. |
| **Reasoning Quality Gates** | [#1385](https://github.com/anthropics/skills/issues/1385) – “Reasoning Quality Gate Pipeline” (3 comments) | Full lifecycle quality: pre-task calibration → adversarial review → delivery verification. |
| **Duplicate Content in Bundles** | [#189](https://github.com/anthropics/skills/issues/189) – “document-skills and example-skills install identical content” (6 comments) | Pain point around skill distribution and deduplication. |

---

## 3. High-Potential Pending Skills

These open PRs show active community engagement (recent updates, multiple contributors) and are likely to merge soon:

- **#1298** – *skill-creator fix (run_eval)* – Updated 2026-06-23. Addresses the #1 blocker for the entire description-optimization pipeline. Multiple authors contributed fixes; this is a prerequisite for other skill improvements.
- **#1367** – *self-audit* – Updated 2026-07-02. Universal reasoning quality gate. Clear specification, author responsive.
- **#1302** – *color-expert* – Updated 2026-07-21. Latest update among skill PRs. Well-defined scope, no controversial design.
- **#1479** – *plan-file-hygiene* – Updated 2026-07-27. Addresses #1417 (planning artifacts lifecycle). Recent, with credit to community commenters.
- **#525** – *pyxel* – Updated 2026-07-15. From Pyxel’s creator; likely to be accepted as a high-quality external contribution.

All remain open; no PRs in this dataset have been merged as of the query date.

---

## 4. Skills Ecosystem Insight

**The community’s most concentrated demand is for trust and reliability infrastructure: they need stable skill-creator evaluation tooling, security namespacing, and enterprise sharing—before they can productively develop and distribute new skill content.**

---

---

# Claude Code Community Digest — 2026-07-30

## Today's Highlights

The community remains vocal about persistent bugs and missing platform compliance features. The top-voted issue (#1455, 406 👍) demands XDG Base Directory support for Linux cache/config — still open after 14 months. A critical data-loss bug in adaptive thinking (#74260) where assistant text blocks are silently dropped continues to attract attention (20 comments). Today saw several new regression reports in version 2.1.220, including scroll lag in the JetBrains plugin (#82449) and a broken `PreToolUse` hook override (#82451). The MCP ecosystem also hit a snag with the unannounced Python SDK 2.0.0 breaking existing extensions (#82453).

No new releases were published in the last 24 hours.

## Hot Issues

1. **[#1455 – Claude Code does not respect XDG Base Directory specification](https://github.com/anthropics/claude-code/issues/1455)**  
   *Open since May 2025* – Linux users want cache/config stored under `$XDG_CACHE_HOME`/`$XDG_CONFIG_HOME`. With 406 upvotes, this is the most desired community feature, but no accepted PR or official timeline exists.

2. **[#74260 – Assistant text blocks silently dropped with adaptive thinking](https://github.com/anthropics/claude-code/issues/74260)**  
   *59 days old* – A `text` block followed by more thinking in the same turn is never rendered and is missing from the transcript JSONL. A severe data-loss bug reproduced across platforms and versions (`claude-fable-5`). High urgency for users relying on interleaved thinking.

3. **[#44657 – Subagent Write tool rejects `.md` files named "report"/"summary"/"findings"/"analysis"](https://github.com/anthropics/claude-code/issues/44657)**  
   *Open since April* – Hard-coded filename block in subagents prevents writing many legitimate markdown outputs, with no opt-out. Community reaction: “Subagents should be programmable — not paternalistic.” (13 👍)

4. **[#77730 – Background agent transcripts become unresumable](https://github.com/anthropics/claude-code/issues/77730)**  
   *15 days old* – Spawned background agents lose their transcript, forcing a full-context respawn and burning tokens. Reported by a Max subscriber; impacts long-running agent pipelines.

5. **[#73638 – Session rename mid-server-tool-call corrupts the transcript](https://github.com/anthropics/claude-code/issues/73638)**  
   *28 days old* – Renaming a session while a `server_tool_use` call is in flight injects a malformed synthetic turn, causing a 400 error on every future prompt. A subtle concurrency bug that corrupts sessions irreparably.

6. **[#78315 – Browser tool "read tools" don't respect launchPreviewAllowedOrigins](https://github.com/anthropics/claude-code/issues/78315)**  
   *Closed as invalid* – Despite being closed, the issue highlights confusion: per-action approval for read/interact operations ignores the allowed-sites list set in Settings, requiring repeated approvals. Security vs. usability tension.

7. **[#82408 – Stale "auto-update failed" status can't be cleared](https://github.com/anthropics/claude-code/issues/82408)**  
   *Filed yesterday* – The `auto-update failed` message persists even after a successful update; running `claude doctor` doesn’t help. Minor but irritating UX flaw with no remediation path.

8. **[#80444 – Windows Desktop GPU crash leaves MSIX package unlaunchable](https://github.com/anthropics/claude-code/issues/80444)**  
   *7 days old* – A fatal GPU-process crash (0x060C201E) when using in-app Browser tab renders the app completely unopenable until an MSIX Repair. Reproduced across driver versions. Severe for Windows users.

9. **[#82453 – MCP SDK 2.0.0 breaks Claude Desktop extensions](https://github.com/anthropics/claude-code/issues/82453)**  
   *Filed today* – `mcp 2.0.0` (PyPI 2026-07-28) removed the FastMCP v1 compatibility layer and renamed classes, causing all existing MCP-based extensions/servers to fail. Urgent for anyone with custom MCP tools.

10. **[#82452 – `/model Fable 5` fails with bare "Model not found"](https://github.com/anthropics/claude-code/issues/82452)**  
    *Filed today* – The startup banner advertises “Fable 5” but passing that display name to `/model` yields a dead end with no auto-complete or suggestions. Trivial UX regression that undermines the onboarding flow.

## Key PR Progress

Only four pull requests were updated in the last 24 hours. We cover them all:

1. **[#48272 – Enrich release titles with changelog summary](https://github.com/anthropics/claude-code/pull/48272)**  
   *Closed – merged upstream* – A long-lived PR that standardised the release feed format (`feed.xml`) with bullet-point changelogs. Already adopted in `main` since May 2026. Good example of community-driven release communication improvements.

2. **[#82358 – MCP Guard plugin: security hardening for MCP configurations](https://github.com/anthropics/claude-code/pull/82358)**  
   *Open (yesterday)* – Introduces a plugin to prevent accidental leakage of bearer tokens in MCP configs during debugging. Addresses issue #82351. Community-driven security fix; still under review.

3. **[#82335 – Fix GCP gateway setup.sh exiting silently when gcloud is not installed](https://github.com/anthropics/claude-code/pull/82335)**  
   *Open (yesterday)* – Under `set -euo pipefail`, a missing `gcloud` binary causes the script to exit with code 127 with no error message. Adds an explicit check before the command substitution.

4. **[#82320 – Fix examples/gateway/aws/setup.sh aborting on stock macOS bash 3.2](https://github.com/anthropics/claude-code/pull/82320)**  
   *Open (yesterday)* – Uses a bash 4 case-modification expansion (`${DIST_SHA256,,}`) that fails on macOS default `/bin/bash` 3.2. Proposal: switch to `awk`-based lowercase conversion for portability.

## Feature Request Trends

Across all open issues, several recurring feature directions stand out:

- **XDG Base Directory compliance** (#1455) – By far the most requested, reflecting a strong Linux developer presence.
- **Subagent file-writing controls** (#44657 + related) – Developers want configurable allow/block lists for filenames written by subagents, not hard-coded restrictions.
- **Portable sessions/transcripts** (#81946, #81907) – Allow session data to be stored inside the project directory so it survives reinstall or is shareable across team members.
- **Granular permission overrides** – Several issues ask for `permissions.defaultMode=bypassPermissions` to work consistently (#75235) and for `PreToolUse` hooks to always override `permissions.ask` globs (#82451).
- **Better Cowork VM lifecycle** (#81874, #81494) – Users want configurable idle timeouts and transparent recovery, plus explicit Cowork tab visibility controls.

## Developer Pain Points

- **Data loss and corruption** – The #74260 silent text drop and #73638 session corruption are frightening for anyone doing serious work. Transcripts silently dropping means lost context; corrupt transcripts make the tool unusable until a new session is started.
- **Windows platform friction** – Shift+Enter not inserting newlines (#77311), GPU crashes destroying the install (#80444), and `claude.cmd` behaving differently from the `.exe` for JSON-schema calls (#82447) all signal that the Windows experience lags macOS/Linux.
- **Permission bypass regressions** – The `permissions.defaultMode=bypassPermissions` stopped being honored (#75235) and the `PreToolUse` hook no longer takes precedence (#82451). These regressions break established workflows that rely on automated tools.
- **Misleading status messages** – The stale auto-update failure message (#82408) and model selection showing “Fable 5” but rejecting the exact text (#82452) add unnecessary cognitive overhead.
- **MCP ecosystem instability** – An unannounced breaking change in the MCP Python SDK (#82453) wiped out compatibility for many extension developers overnight. Highlights the need for better dependency pinning and migration guides.

---

*Generated from `github.com/anthropics/claude-code` data. Issues and PRs updated as of 2026-07-30 23:59 UTC.*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-07-30

## Today’s Highlights
A heavy day for Windows stability and session management: multiple critical bugs around process leaks, DWM degradation, and session bloat are dominating the tracker. On the engineering side, the team merged a stream of small but meaningful PRs improving MCP tool handling, network policy, and HTTP client unification. The long-running Linux desktop app request (#11023) continues to gather momentum with 874 👍.

## Releases
Four alpha releases in the Rust toolchain were published in the last 24 hours:
- **rust-v0.147.0-alpha.2**
- **rust-v0.147.0-alpha.1**
- **rust-v0.146.0-alpha.9.2**
- **rust-v0.146.0-alpha.9.1**

No changelog details were provided beyond the version bumps. Likely continuous integration releases addressing minor fixes or dependency updates.

## Hot Issues (10 of note)

1. **[#11023 – Codex desktop app for Linux](https://github.com/openai/codex/issues/11023)**  
   *874 👍, 192 comments*  
   The most upvoted open issue. A Linux desktop app is the single most desired feature, with users citing macOS performance issues as a driver. Community reaction is overwhelmingly positive, though some worry about fragmentation.

2. **[#21753 – Full Claude Code Hook Parity (29+)](https://github.com/openai/codex/issues/21753)**  
   *22 👍, 29 comments*  
   Umbrella tracker requesting 29+ hooks to match Claude Code’s automation surface. Important for advanced workflows and CI/CD integration. Community is passionate about automated lifecycle events.

3. **[#33776 – Windows: ChatGPT.exe spawns hundreds of taskkill/conhost processes](https://github.com/openai/codex/issues/33776)**  
   *23 👍, 25 comments*  
   A serious Windows performance bug causing WMI storms and DWM degradation. Users report 287+ orphan processes. High urgency for Windows users.

4. **[#10561 – Plan Mode: “Copy Plan” button & “Clear Context and Start Coding” workflow](https://github.com/openai/codex/issues/10561)**  
   *37 👍, 19 comments*  
   A UX enhancement request for the Plan Mode. Users want to export plans and reset context without losing work. Community consensus: essential for iterative development.

5. **[#35420 – Stream disconnects on OneDrive-backed Windows workspace](https://github.com/openai/codex/issues/35420)**  
   *0 👍, 13 comments*  
   Edge case: OneDrive degradation breaks Codex connectivity. Low engagement but affects enterprise users with cloud-synced folders.

6. **[#27458 – Codex appears to timeout while waiting for user input](https://github.com/openai/codex/issues/27458)**  
   *49 👍, 12 comments*  
   CLI users report timeouts during interactive prompts, especially on Windows WSL. High upvote count indicates many affected. Related to sandbox or stdin handling.

7. **[#25779 – Desktop meta-bug: unbounded session/turn state causes freezes](https://github.com/openai/codex/issues/25779)**  
   *8 👍, 12 comments*  
   A comprehensive bug report detailing session state bloat, freezes, and lost control. Community members confirm the same pattern across Windows and macOS.

8. **[#23172 – automation_update inconsistent across Windows chats](https://github.com/openai/codex/issues/23172)**  
   *0 👍, 10 comments*  
   Automation management tools appear unavailable in some chats. Points to deeper statefulness issues in the app-server.

9. **[#35311 – In-app Browser startup crash loop on Windows](https://github.com/openai/codex/issues/35311)**  
   *2 👍, 10 comments*  
   A two-stage incident: crash, then startup loop, then deep-control timeouts. Affected a user trying to check update notes. Illustrates brittleness in the in-app browser component.

10. **[#14722 – Sync CLI and app-server sessions](https://github.com/openai/codex/issues/14722)**  
    *21 👍, 8 comments*  
    Users want session state to persist when switching devices (e.g., SSH resume). Currently, printing in original session does not stay updated. A cross-platform workflow blocker.

## Key PR Progress (10 of note)

1. **[#36055 – Expose MCP read-only hints in tool call items](https://github.com/openai/codex/pull/36055)**  
   Propagates `readOnlyHint` annotations from MCP tools through event streams and persistence. Enables tools to declare they don’t modify state.

2. **[#36054 – Remove legacy `--full-auto` handling from `codex exec`](https://github.com/openai/codex/pull/36054)**  
   Cleanup: deprecated flag removed; users must now explicitly pass `--sandbox workspace-write`. Breaks backward compatibility for scripts still using the old flag.

3. **[#36051 – Avoid overwriting symlinked migration targets](https://github.com/openai/codex/pull/36051)**  
   Security fix: migration now respects symlinks and refuses to overwrite targets pointing outside the repository. Prevents accidental modifications of external files.

4. **[#36049 – Keep tool-call metrics out of Statsig exports](https://github.com/openai/codex/pull/36049)**  
   Tool-level metrics (`codex.tool.call`, `duration_ms`) are now runtime-only in the built-in Statsig exporter but still available via OTLP. Reduces noise in default telemetry.

5. **[#36045 – Distinguish unknown MCP authentication status](https://github.com/openai/codex/pull/36045)**  
   OAuth discovery failures are now reported as `unknown` rather than `unsupported`. Prevents false negatives; clients can distinguish between “server lacks OAuth” and “can’t tell.”

6. **[#36039 – Limit MCP catalog pagination](https://github.com/openai/codex/pull/36039)**  
   Hard limits: max 100 pages and 1,024 items per catalog. Prevents runaway pagination that could cause memory or network issues.

7. **[#36037 – Deny network access when an allow amendment fails](https://github.com/openai/codex/pull/36037)**  
   Policy hardening: if a network allow amendment (e.g., user prompt) fails, the host is not approved. Prevents accidental grants.

8. **[#36036 – Allow naming forked chats from the TUI](https://github.com/openai/codex/pull/36036)**  
   `/fork` now accepts an optional name. Essential for TUI users managing multiple conversation branches. Small but high-impact UX improvement.

9. **[#36035 – Exit the stdio app-server when its connection closes](https://github.com/openai/codex/pull/36035)**  
   Fix: stdio app-server now shuts down when stdin closes, even if a remote-control client is still connected. Prevents zombie processes.

10. **[#36031 – Load cloud-managed servers in MCP CLI commands](https://github.com/openai/codex/pull/36031)**  
    Enterprise feature: `codex mcp list`, `get`, `login`, `logout` now resolve cloud-managed (enterprise) MCP servers. Keeps `add`/`remove` scoped to user config.

## Feature Request Trends
- **Cross-platform parity** continues to dominate: Linux desktop app (#11023), Windows performance improvements (#33776, #25779), and macOS session management (#23026).
- **Hooks and automation expansion**: Users want full Claude Code hook parity (#21753) plus pre/post‑compact hooks (#17148) to enable CI/CD and custom logging.
- **Session synchronization**: Sync CLI and app-server sessions (#14722) and remote control over SSH (implied).
- **Plan Mode enhancements**: “Copy Plan” button and “Clear Context” workflow (#10561) – a clear ask for better planning-to-execution handoff.
- **MCP ecosystem**: Read-only hints, authentication status clarity, catalog pagination limits – all indicate growing adoption and need for robust server integration.

## Developer Pain Points
- **Windows is fragile**: Repeated reports of process leaks (`taskkill.exe` storms), DWM degradation, startup crash loops, and inconsistent tool shells. The platform is clearly less stable than macOS/Linux.
- **Session bloat**: Unbounded state growth leads to freezes, high memory (27 GB+ reported in #34863), and lost control (#25779, #35458). Users on Pro plans hitting storage limits.
- **Context compaction bugs**: Several issues (#35935, #27894, #35458) describe lost task state, repeated work, or oversized JSONL files from base64 screenshots. Compaction logic needs urgent review.
- **Sandbox inconsistencies**: Timeouts during input waits (#27458), panics in `codex exec --sandbox` (#16908), and Google Drive virtual filesystem hangs (#35914) – sandbox mode is not yet production‑ready.
- **In-app browser flakiness**: Crash loops (#35311), silent termination (#35210), and DWM handle leaks (#33192) – the browser component remains a weak point.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-07-30

## Today’s Highlights
A new nightly release (v0.55.0‑nightly.20260730) continues the rapid development cadence, while several high‑priority fixes are in review: MCP OAuth token refresh, diff‑hunk parsing optimization, and sub‑agent model resolution. The community remains vocal about recurring API capacity errors (gemini‑3‑flash‑preview) and sub‑agent behavior quirks, which are actively being addressed.

## Releases
- **[v0.55.0‑nightly.20260730](https://github.com/google-gemini/gemini-cli/releases/tag/v0.55.0-nightly.20260730.gdc859e8e4)** — Automated nightly bump; includes changelogs for v0.54.0-preview.0 and v0.53.0 (both published earlier this week).
- No stable or preview release today; the team is focusing on nightly iteration.

## Hot Issues (10 noteworthy)
1. **[#18811 – API Error: Failed to generate content – invalid argument](https://github.com/google-gemini/gemini-cli/issues/18811)** – A long‑standing P2 bug affecting users during auto‑update; 15 comments, 5 👍. Community reports the error appears after npm updates, often requiring manual intervention.
2. **[#19883 – “No capacity available for model gemini-3-flash-preview”](https://github.com/google-gemini/gemini-cli/issues/19883)** – P2 area/platform. Users report gemini‑3‑flash is unreachable while other models work. 13 comments, 8 👍 – high frustration around preview model availability.
3. **[#22323 – Subagent recovery after MAX_TURNS reports GOAL success](https://github.com/google-gemini/gemini-cli/issues/22323)** – P1 bug where `codebase_investigator` sub‑agent falsely reports success after hitting turn limits. 12 comments, 2 👍. Critical for trust in agent reporting.
4. **[#18834 – Sandbox image missing/pull failure](https://github.com/google-gemini/gemini-cli/issues/18834)** – P1 core bug with a community‑provided fix. Users can’t launch sandbox even though Docker works fine. 11 comments.
5. **[#18961 – VS Code companion extension not detected](https://github.com/google-gemini/gemini-cli/issues/18961)** – P2 area/extensions. The CLI fails to connect to the installed VS Code extension, breaking diff display. 8 comments.
6. **[#24353 – Robust component‑level evaluations](https://github.com/google-gemini/gemini-cli/issues/24353)** – P1 EPIC tracking expansion of behavioral evals from 76 to a comprehensive test suite across all Gemini models. Critical for quality assurance.
7. **[#22745 – AST‑aware file reads, search, and mapping](https://github.com/google-gemini/gemini-cli/issues/22745)** – P2 EPIC investigating AST‑aware tools to reduce token usage and improve codebase navigation. 7 comments, 1 👍.
8. **[#21968 – Gemini does not use skills and sub‑agents enough](https://github.com/google-gemini/gemini-cli/issues/21968)** – P2 area/agent. Users report custom skills are ignored unless explicitly requested. 6 comments.
9. **[#26522 – Auto Memory retrying low‑signal sessions indefinitely](https://github.com/google-gemini/gemini-cli/issues/26522)** – P2 bug where the background extractor keeps reprocessing sessions that are deliberately skipped. 5 comments.
10. **[#27578 – Gemini keeps thinking with only “hello” – 100% failure](https://github.com/google-gemini/gemini-cli/issues/27578)** – P1 bug where the agent hangs on trivial input. 4 comments. Attached chat history suggests a regression in turn handling.

## Key PR Progress (10 important)
1. **[#28581 – fix(cli): skip diff hunk markers during @ processing](https://github.com/google-gemini/gemini-cli/pull/28581)** – Prevents memory heap growth on large diffs by ignoring unified/combined hunk markers. **Open**.
2. **[#28410 – fix(core): shorten MCP tools/list discovery timeout](https://github.com/google-gemini/gemini-cli/pull/28410)** – Merged. Prevents 10‑minute freeze when an MCP server fails to respond. **Closed**.
3. **[#28406 – fix(availability): apply modelIdResolutions to tool sub‑agent model configs](https://github.com/google-gemini/gemini-cli/pull/28406)** – Merged. Fixes `INVALID_MODEL` errors for API‑key users without preview access. **Closed**.
4. **[#28404 – fix(core): override google‑auth‑library version to 10.9.0](https://github.com/google-gemini/gemini-cli/pull/28404)** – Merged. Resolves auth dependency conflicts. **Closed**.
5. **[#28485 – fix(cli): add gemini-3.5-flash to model selector](https://github.com/google-gemini/gemini-cli/pull/28485)** – **Open**. Addresses users unable to select newer flash models after v0.51.0.
6. **[#28481 – fix(core): refresh MCP OAuth tokens with stored client ID](https://github.com/google-gemini/gemini-cli/pull/28481)** – **Open**. Fixes token refresh failures for dynamically registered MCP servers, preventing forced re‑auth.
7. **[#28488 – feat(cli): auto‑compress chat history on context window overflow](https://github.com/google-gemini/gemini-cli/pull/28488)** – **Open**. Adds `autoCompressOnOverflow` setting to avoid session interruptions.
8. **[#28566 – fix(core,cli): propagate InvalidStreamError details to UI](https://github.com/google-gemini/gemini-cli/pull/28566)** – **Open**. Shows actionable suggestions (e.g., `/compress`) when empty responses occur.
9. **[#28586 – fix(core): preserve thoughtSignature in functionCall parts](https://github.com/google-gemini/gemini-cli/pull/28586)** – **Open**. Fixes 400 errors on parallel tool calls introduced in v0.53.0.
10. **[#27154 – fix(core): prevent PTY memory leak](https://github.com/google-gemini/gemini-cli/pull/27154)** – Merged. Synchronously deletes PTY entries to eliminate file descriptor leak. **Closed**.

## Feature Request Trends
- **AST‑aware code navigation** – Several EPICs (#22745, #22746) propose using AST‑based file reading and searching to reduce token consumption and improve codebase mapping accuracy.
- **Better sub‑agent transparency** – Requests for sub‑agent trajectory visibility in `/chat share` (#22598) and inclusion of sub‑agent context in bug reports (#21763).
- **Resilience automation** – Auto‑compress on context overflow (#28488), automatic session takeover for browser agent (#22232), and graceful handling of MCP server failures (#28410).
- **Model availability improvements** – Multiple requests to surface newer flash models in the selector (#28483) and to handle preview‑only models gracefully.
- **Memory system quality** – Deterministic redaction, quarantine of invalid patches, and permanent dismissal of low‑signal sessions (#26522, #26523, #26525).

## Developer Pain Points
- **Recurring API capacity errors** – “No capacity for gemini-3-flash-preview” (#19883) and generic “invalid argument” errors (#18811, #18903) frustrate users across models.
- **Sub‑agent reliability** – False success reports after MAX_TURNS (#22323), sub‑agents ignoring permissions (#22093), and lack of context in bug reports (#21763) erode trust.
- **Startup/sandbox friction** – Sandbox image missing (#18834), VS Code extension detection failures (#18961), and PTY memory leaks (#27154) cause hard crashes.
- **Shell execution hangs** – CLI stuck on “Waiting input” after simple commands (#25166), and sub‑agents creating temporary scripts in random locations (#23571).
- **Configuration overrides ignored** – Browser agent ignores `settings.json` overrides (#22267), and tools with >128 entries cause 400 errors (#24246).
- **Destructive behavior** – Agents occasionally using `git reset --force` or unsafe database operations (#22672), prompting calls for safety guardrails.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-07-30

## Today’s Highlights
A new stable release **v1.0.76** landed yesterday, shipping enable/disable controls for plugins/agents/hooks and **grok-4.5** model support. However, the release is overshadowed by a critical **log-level crash** bug (#4285) that affects all canonical levels except `all` and `default`, and by the recurrence of the **zombie-process leak** issue (#4163) still unaddressed on AlmaLinux (#4290). Community frustration is also spiking over multi-minute streaming silences (#4286) and a growing list of sandbox-configuration requests.

## Releases
- **[v1.0.76](https://github.com/github/copilot-cli/releases/tag/v1.0.76)** (2026-07-29) – Added enable/disable controls in `/plugins` for plugins, instructions, agents, LSP servers, and hooks; added **grok-4.5** model; enforced sandbox denied paths for relative/symlinked entries on macOS/Linux; unsent prompt text now persists.
- **Pre-releases** included several iterative fixes:
  - v1.0.76-5: backend model support (grok-4.5).
  - v1.0.76-4: fixed path enforcement for denied sandbox entries.
  - v1.0.76-3: improved auto-update notification maturity, faster multi-file diff scrolling, disabled hover-to-focus by default in split-view.
  - v1.0.76-2: added directable queue manager (staff) and new Sessions sidebar (experimental `/expe`).

## Hot Issues (10 noteworthy)
1. **[#4163 / #4290 – Zombie process accumulation on Linux](https://github.com/github/copilot-cli/issues/4163) (closed, reopened as #4290)**  
   Finished subprocesses remain as zombies under the copilot PID (~2/min leak). Still unpatched on AlmaLinux 8.10 with v1.0.75–v1.0.76. Community: +3, multiple reports. [Issue #4163](https://github.com/github/copilot-cli/issues/4163) | [Issue #4290](https://github.com/github/copilot-cli/issues/4290)

2. **[#1613 – Git worktree lifecycle management](https://github.com/github/copilot-cli/issues/1613) (open, +36👍)**  
   Request for Copilot CLI to create/destroy worktrees automatically for safer multi-task isolation. High community demand.

3. **[#4202 – Built-in view tool reports “Path does not exist” for existing files](https://github.com/github/copilot-cli/issues/4202) (open)**  
   Regression since v1.0.72 on CLI v1.0.73. Works in isolated SDK probe. Impacts daily development workflows.

4. **[#1168 – Authorization fatigue](https://github.com/github/copilot-cli/issues/1168) (open, +2👍)**  
   Single prompt triggers >12 authorization requests. Still unresolved; frequent complaints from developers.

5. **[#4293 – Sub-agents with full tool access return empty responses](https://github.com/github/copilot-cli/issues/4293) (open)**  
   Identical prompt succeeds with restricted-tool agents. No error or log. Blocks advanced multi-agent workflows.

6. **[#4299 – Increasing typing latency over long sessions](https://github.com/github/copilot-cli/issues/4299) (open)**  
   Especially when background agents run, latency grows to “unusable” levels. Affects v1.0.76-5. No workaround.

7. **[#4285 – Silent exit 1 on startup with most log levels](https://github.com/github/copilot-cli/issues/4285) (open, +2👍)**  
   `--log-level none|error|warning|info|debug` causes immediate exit with no output. Only `all`/`default` work. Critical for debugging.

8. **[#4286 – Streaming tool_use buffers until complete](https://github.com/github/copilot-cli/issues/4286) (open)**  
   `input_json_delta` events are held for multi-minute silences before flushing. Breaks real-time tool feedback.

9. **[#4287 – General-purpose subagent ignores inherited model](https://github.com/github/copilot-cli/issues/4287) (open)**  
   Subagent defaults to `gpt-5.4-mini` even when configured to inherit session model (e.g., GPT-5.6 Sol). Configuration ignored.

10. **[#4140 – `/resume` session list sorting](https://github.com/github/copilot-cli/issues/4140) (open)**  
    Sessions grouped by repo/branch, not recency. Recent sessions appear far down the list. Simple UX improvement with high impact.

## Key PR Progress
Only **one pull request** was active in the last 24 hours:

- **[#4100 – “安全性” (Security)](https://github.com/github/copilot-cli/pull/4100)**  
  Author: huangyoufeng76-debug | Opened 2026-07-12 | Updated 2026-07-29  
  Sparse description; appears to be a low-quality submission with no significant impact. No other PRs were updated or merged in the period.

## Feature Request Trends
- **Sandbox configurability** – Multiple requests (e.g., #4298, #4295, #4294) to selectively enable tools, whitelist packages, and show AI-credit warnings. Users want finer-grained sandbox controls beyond all-or-nothing.
- **Session ordering & worktrees** – #4140 (recency sorting) and #1613 (worktree lifecycle) reflect demand for better session management and isolated environments.
- **Model inheritance & custom endpoints** – #4282 (session resume fails on custom model name prefix) and #4287 (subagent model inheritance) highlight confusion around model configuration.
- **ACP protocol completeness** – #4113 asks for `session/close` capability for ACP clients.
- **Enterprise plugin enablement** – #4283 reports that server-managed `enabledPlugins` do not persist enablement state, causing hooks to be missed.

## Developer Pain Points
- **Authorization fatigue** (#1168) remains a top complaint; users are asked for consent >10 times per command.
- **Silent crashes and output failures** – #4285 (log level crash) and #4297 (crash on any log level) are blocking developers from debugging.
- **Sub-agent unpredictability** – #4293 (empty responses) and #4286 (stream buffering) erode trust in multi-agent setups.
- **Zombie process leaks** (#4163) still unpatched on Linux (AlmaLinux, RHEL) – a stability risk for long-running sessions.
- **Terminal compat issues** – #4296 (Cmd+V paste broken in iTerm2), #4292 (colors off in tmux), #4294 (COLORTERM injection) continue to plague macOS and Linux users.
- **Nudging to update** – #4284 complains that an auto-updating tool still shows a yellow warning message every day, creating visual noise.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI Community Digest — 2026-07-30

**Data Source:** [github.com/MoonshotAI/kimi-cli](https://github.com/MoonshotAI/kimi-cli)

---

## Today's Highlights

A new enterprise-facing feature request for K3 gateway integration (#2568) signals growing demand for production-grade Kimi deployments. Meanwhile, two PRs merged: one improves Windows Shell tool detection by preferring pwsh (#1790), and another enhances the `/usage` panel by showing absolute reset timestamps (#2567), both reflecting ongoing polish for developer experience.

---

## Releases

**No new releases in the last 24 hours.**

---

## Hot Issues

1. **#2568 [OPEN] Feature Request: Support custom API Base URL for enterprise K3 gateway**  
   *Author: kwu18-png*  
   **Summary:** Proposes adding a custom API Base URL configuration to kimi-cli so enterprises can route traffic through their own K3 gateway. Key concerns include avoiding API rate limits, reducing cross-region latency, enabling failover, and centralizing API key management.  
   **Why it matters:** With Kimi K3 (2.8T parameters) open-sourced in July 2026, this request directly addresses the gap between a developer CLI and production-grade enterprise deployment.  
   **Community reaction:** 0 comments, 0 👍 — early-stage request, but likely to attract attention as enterprises evaluate K3.  
   [GitHub Issue #2568](https://github.com/MoonshotAI/kimi-cli/issues/2568)

*(Only 1 issue updated in the last 24h; picking 10 is not applicable. Below are the remaining items for completeness.)*

---

## Key PR Progress

1. **#2569 [OPEN] fix(tools): count chained StrReplaceFile edits against intermediate content**  
   *Author: aalhadxx*  
   **Summary:** Fixes a bug where `StrReplaceFile` tool counted replacements against the original file text, causing later edits that depend on earlier ones to be reported as zero applications.  
   **Impact:** Critical for multi-step file transformation workflows common in code generation and refactoring agents.  
   [GitHub PR #2569](https://github.com/MoonshotAI/kimi-cli/pull/2569)

2. **#2176 [OPEN] fix(hooks): extract text from ContentPart for UserPromptSubmit hook**  
   *Author: tears-mysthrala*  
   **Summary:** Fixes the `UserPromptSubmit` hook receiving an empty `prompt` and `matcher_value` when input is `list[ContentPart]` (default for all messages). Only string case was handled; now regex matchers work correctly.  
   **Impact:** Resolves issue #2148; important for hook-based extensions like custom input validation or prompt preprocessing.  
   [GitHub PR #2176](https://github.com/MoonshotAI/kimi-cli/pull/2176)

3. **#1790 [CLOSED] feat(windows): prefer pwsh over powershell.exe for Shell tool**  
   *Author: scwf*  
   **Summary:** `Environment.detect()` now prefers pwsh from PATH, then Program Files\PowerShell\7, then System32 powershell.exe, then PATH powershell. Shell name remains `Windows PowerShell` for compatibility.  
   **Impact:** Improves Windows developer experience by automatically using the more modern, cross-platform PowerShell 7 when available.  
   [GitHub PR #1790](https://github.com/MoonshotAI/kimi-cli/pull/1790)

4. **#2567 [CLOSED] feat(usage): show absolute reset datetime in /usage panel**  
   *Author: versun*  
   **Summary:** Adds absolute local reset datetime alongside the existing relative duration (e.g., `resets in 4d` → `resets on 2026-08-03 14:30:00 (in 4d)`). Uses already-available `reset_at` API field.  
   **Impact:** Small UX improvement that reduces developer confusion about when quota cycles actually reset.  
   [GitHub PR #2567](https://github.com/MoonshotAI/kimi-cli/pull/2567)

*(Only 4 PRs updated in the last 24h; picking 10 is not applicable.)*

---

## Feature Request Trends

The single active issue (#2568) points to a clear emerging trend:

- **Enterprise API Gateway Integration**: Developers want kimi-cli to support custom API Base URLs so they can deploy Kimi K3 through their own enterprise gateways. This addresses real pain points around rate limiting, regional latency, failover, and centralized API key management — all hallmarks of production usage.

No other feature request directions were detected in the last 24h.

---

## Developer Pain Points

Based on the limited data, the primary pain point surfacing is:

- **Enterprise Deployment Gaps**: Direct use of the official Kimi API outside of personal/development contexts creates friction for teams. Rate limiting breaks collaborative workflows, single-region deployment causes high latency across geographies, lack of automatic failover risks service disruptions, and decentralized API key management creates security audit problems. The community is signaling that kimi-cli needs to evolve from a personal developer tool to an enterprise-capable CLI.

No other recurring frustrations or high-frequency requests were observed in this cycle.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-07-30

## Today's Highlights

The community is buzzing over the proposed `/btw` command (#16992, 168 👍), a direct lift from Anthropic’s Claude Code. Meanwhile, a pair of PRs from @kitlangton dramatically improve TUI session tab performance by making tab switching near-instant and pre-fetching data in the background. On the bug front, a critical regression on Windows (all multi-parameter tools fail with `SchemaError`, #39600) was reported today, and the long-standing pipe truncation bug (`opencode export | jq` losing data) finally has a fix in #39577.

## Releases

No new releases in the last 24 hours.

## Hot Issues

1. **[#16992 – [FEATURE]: add /btw command](https://github.com/anomalyco/opencode/issues/16992)**  
   20 comments, 168 👍. Inspired by Claude Code, this request for a `/btw` instruction that lets developers “by the way” add context mid-session without derailing the current task has overwhelming community support.  

2. **[#19130 – Windows ARM64 native: OpenTUI fails to initialize with bun:ffi dlopen TinyCC error](https://github.com/anomalyco/opencode/issues/19130)**  
   15 comments. The native ARM64 binary works for commands but the TUI crashes on launch – a blocker for Surface Pro X and similar devices.  

3. **[#30680 – OpenCode immediately enters auto-compaction loop and stops generating responses](https://github.com/anomalyco/opencode/issues/30680)**  
   Closed, but 15 comments. Users report that even in empty folders, OpenCode burns tokens on repeated compaction and then ceases all replies – a major reliability concern.  

4. **[#38801 – message="exiting loop"](https://github.com/anomalyco/opencode/issues/38801)**  
   14 comments. “Every time I open my opencode in hopes of a decent TUI I put it away for another day” – the dreaded “exiting loop” error frustrates users across OpenAI-compatible APIs.  

5. **[#14972 – Agent stops after tool execution with OpenAI-compatible providers](https://github.com/anomalyco/opencode/issues/14972)**  
   12 comments. Root cause identified: Gemini/LiteLLM return `finish_reason: "stop"` even when the response contains tool calls, breaking the agent loop.  

6. **[#13715 – Permission asks from nested subagent sessions silently hang](https://github.com/anomalyco/opencode/issues/13715)**  
   9 comments, 22 👍. A subagent spawning another subagent that requires bash permission never renders the prompt – the session hangs forever.  

7. **[#37231 – Error from provider (Console Go): Upstream request failed](https://github.com/anomalyco/opencode/issues/37231)**  
   8 comments. All Go models (CLI, desktop, VSCode extension) return the same upstream failure error, suggesting a provider-side issue.  

8. **[#32157 – Configurable mid-run prompt delivery: queue vs steer](https://github.com/anomalyco/opencode/issues/32157)**  
   3 comments, 8 👍. Users want three modes for submitting prompts while the model is generating: queue, steer (interrupt), or break – especially important after compaction.  

9. **[#39600 – 1.18.9: All multi-parameter tools fail with SchemaError on Windows](https://github.com/anomalyco/opencode/issues/39600)**  
   2 comments, filed today. `bash`, `write`, `glob` all crash with `Missing key at ["command"]`; single-parameter `read` sometimes works. High severity regression.  

10. **[#39595 – TUI context usage always shows 0%](https://github.com/anomalyco/opencode/issues/39595)**  
    1 comment, filed today. The context progress circle never updates – `model.limit.context` is undefined in the build function. Impacts all users relying on the indicator.  

## Key PR Progress

1. **[#39607 – fix(console): emit valid cost chunks](https://github.com/anomalyco/opencode/pull/39607)**  
   Fixes strict OpenAI-compatible clients failing on Zen cost events by adding required fields (`id`, `object`, `created`, `model`) while preserving cost metadata.  

2. **[#39567 – feat(core): parse shell permission commands](https://github.com/anomalyco/opencode/pull/39567)**  
   Uses tree-sitter to parse Bash/PowerShell before permission checks, splitting compound commands into independent resources and enabling command-prefix approvals.  

3. **[#39604 – fix(core): sanitize frontmatter keys containing hyphens and dots](https://github.com/anomalyco/opencode/pull/39604)**  
   Hyphenated keys like `allowed-tools` were unsanitized, causing parse failures. The regex now supports hyphens (`.` still excluded for safety).  

4. **[#39589 – feat(tui): prefetch open session tabs after connect](https://github.com/anomalyco/opencode/pull/39589)**  
   Eliminates the blank screen on first tab switch by warming session data in the background as soon as the client connects.  

5. **[#39568 – feat(tui): make session tab switching fast for long transcripts](https://github.com/anomalyco/opencode/pull/39568)**  
   Tab switching is now roughly constant-time – the visible switch mounts a fixed-size tail regardless of transcript size.  

6. **[#39602 – fix(tui): resolve filetype case-insensitively](https://github.com/anomalyco/opencode/pull/39602)**  
   Files with uppercase extensions (`MAIN.PY`, `COMPONENT.TSX`) or bare names (`Makefile`) now get correct syntax highlighting.  

7. **[#39599 – fix(core): correct path helpers for delimiter-less input](https://github.com/anomalyco/opencode/pull/39599)**  
   `getDirectory()` and related helpers no longer produce a fake `/` parent for root-level files, fixing issues in the command palette.  

8. **[#39597 – fix(core): retry lazy initializer after it throws](https://github.com/anomalyco/opencode/pull/39597)**  
   A throwing `lazy()` initializer permanently poisoned the cache – now the error is surfaced and the initializer can be retried on the next call.  

9. **[#39577 – fix(opencode): await stdout drain so piped output is not truncated](https://github.com/anomalyco/opencode/pull/39577)**  
   Closes the long-standing #29330: `opencode db`, `session list`, and `export` silently lost data beyond 64 KiB when piped. Exit code now reflects success/failure properly.  

10. **[#39591 – feat(plugin): add ui.tabs API for session tab control](https://github.com/anomalyco/opencode/pull/39591)**  
    Exposes a new `ui.tabs` context so plugins can observe open tabs, focus, and programmatically open/close them – unblocking richer plugin UIs.  

## Feature Request Trends

- **Permission & approval models** – Requests for “auto-mode” classifiers (#37564), structured diff previews in permission dialogs (#39578, #39567), and fixing nested subagent permission hangs (#13715) show a strong desire for smarter, safer approval flows.  
- **Context & copy tools** – The `/btw` command (#16992) and “copy message as raw markdown” (#14041) point to a need for better mid-session context injection and output portability.  
- **TUI performance & navigation** – Configurable mid-run prompt delivery (#32157), scrollbars (#10570), and fast tab switching (PRs #39589, #39568) reflect frustration with the current interaction model during long sessions.  
- **Internationalization** – Multiple PRs adding Hebrew (#39423) and requests for Farsi, Urdu, Pashto (#34697) indicate growing global adoption.  
- **Provider compatibility** – OpenAI-compatible provider issues (#14972, #39553) continue to be a pain point; users want consistent behavior across Gemini, LiteLLM, NVIDIA, and others.  

## Developer Pain Points

- **Provider incompatibility**: Agent loops breaking on non-OpenAI providers (#14972) and errors like “Console Go upstream request failed” (#37231) are recurring blockers.  
- **TUI instability**: The “exiting loop” message (#38801), auto-compaction loops (#30680), and the 0% context indicator (#39595) erode trust in the terminal user interface.  
- **Platform-specific bugs**: Windows ARM64 TUI crash (#19130), GNU Screen incompatibility (#32985), and the Windows multi-parameter SchemaError regression (#39600) frustrate users on edge platforms.  
- **Data loss**: Piped JSON truncation (#29330, now fixed in #39577) and silent session hangs due to permission prompts (#13715) are particularly damaging because they provide no feedback.  
- **Memory/resource issues**: TreeSitter client destruction causing memory leaks (#36454) and excessive early compaction (#38851) harm long-running sessions.  
- **Plugin ecosystem friction**: Fabricated `serverUrl` for in-process TUI (#39561) prevents plugins from attaching, while the lack of a tab API (now addressed in #39591) has limited plugin integration.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-07-30

A technical analysis of the past 24 hours in the [QwenLM/qwen-code](https://github.com/QwenLM/qwen-code) repository.

---

## 1. Today's Highlights

The project shipped a nightly release (v0.21.1) while grappling with a wave of CI failures across E2E tests, SDK integration tests, and interactive file-system tests. The autofix/takeover infrastructure saw aggressive iteration: wenshao landed a series of PRs addressing race-lost pushes, cumulative timeout breakers, and round-cap visibility on PRs. A significant downstream dependency surfaced: Anthropic 4.6+ assistant-prefill is broken at the core level (Issue #8039), affecting every Claude Opus/Sonnet 4.6 and 5.x model. Community feedback highlighted persistent UI friction in v0.21.1 — scroll behavior regressed on Windows terminals, mouse-wheel interaction vanished for some users, and the `@` completion tab-switching keybind (`Ctrl+←/→`) conflicts with terminal word-jump.

---

## 2. Releases

**[v0.21.1-nightly.20260730.1643a6c9a](https://github.com/QwenLM/qwen-code/releases/tag/v0.21.1-nightly.20260730.1643a6c9a)** was published. The changelog is minimal:
- CI fix: `qwen-triage` container jobs now default to bash shell (#7838).
- `fix(web-shell): pre` (truncated in data — likely an unfinished entry).

No stable release is indicated; this is a nightly build.

---

## 3. Hot Issues (10 selected)

1. **[#8039](https://github.com/QwenLM/qwen-code/issues/8039) — Anthropic 4.6+ assistant-prefill 400 + thinking.display silently defaults to 'omitted'** (P1, bug, core, content-generation)
   *Why it matters:* Verified bug affecting all Claude Opus/Sonnet 4.6+ and 5.x models. Gemini-format history ending on a model turn with no follow-up causes 400 errors with no mitigation path. Community engagement is high (6 comments) and the `welcome-pr` label signals maintainers want help.

2. **[#8076](https://github.com/QwenLM/qwen-code/issues/8076) — Main CI failed: E2E Tests — cli/acp-cron.test.ts** (bug, integration, testing)
   *Why it matters:* A cron job streaming test (`sessionUpdate` after prompt returns) broke on `main`. The `autofix/in-progress` tag suggests the agent is actively working on it.

3. **[#8072](https://github.com/QwenLM/qwen-code/issues/8072) — Main CI failed: E2E Tests — sdk-typescript/system-control.test.ts** (bug, integration, SDK)
   *Why it matters:* Dynamic model switching during streaming input fails in the TypeScript SDK. Foundational for model-routing features. 3 comments, agent is assigned.

4. **[#7964](https://github.com/QwenLM/qwen-code/issues/7964) — Windows terminal: content cannot scroll after upgrading to 0.21.1** (P2, bug, UI, Windows)
   *Why it matters:* Critical UX regression for Windows users. 4 comments, closed — but the root cause may still affect others. Shows the project struggles with terminal virtualization on Windows.

5. **[#7752](https://github.com/QwenLM/qwen-code/issues/7752) — Release managed writer locks and lease daemon maintenance** (P0, bug, core, daemon)
   *Why it matters:* The highest priority open issue. A daemon can stop while holding session writer locks, blocking replacement daemons with "session already open" errors. Requires lock lifecycle fixes.

6. **[#7832](https://github.com/QwenLM/qwen-code/issues/7832) — YOLO mode: mid-stream socket close is not retried** (P1, bug, non-interactive)
   *Why it matters:* Large code generation in headless mode (500+ lines) consistently fails with `UND_ERR_SOCKET`. DashScope drops TCP after ~3-5 minutes of SSE streaming. Closed now, but reflects a real limitation for heavy automation users.

7. **[#7960](https://github.com/QwenLM/qwen-code/issues/7960) — Compression side-query's fixed maxOutputTokens can exceed context window on small-window deployments** (P2, bug, token-management)
   *Why it matters:* Self-hosted vLLM users hit 400 → `COMPRESSION_FAILED_EMPTY_SUMMARY` because the compression query's token budget is hardcoded, not dynamic. 3 comments, still open.

8. **[#8003](https://github.com/QwenLM/qwen-code/issues/8003) — Model outputs XML-style tool calls as plain text instead of structured function calls** (P2, bug, long-context)
   *Why it matters:* In 200+ turn sessions (180K+ tokens), `qwen3.8-max-preview` sometimes dumps raw `<invoke>` / `<parameter>` tags into `content` instead of using `tool_calls` array. qwen-code treats this as a string, breaking automation loops.

9. **[#8069](https://github.com/QwenLM/qwen-code/issues/8069) — @ completion tab switching uses Ctrl+←/→ which conflicts with terminal word-jump** (P2, bug, UI, keybindings)
   *Why it matters:* Most terminals (iTerm2, Windows Terminal, GNOME Terminal) intercept `Ctrl+←/→` for word-by-word cursor movement, making tab switching in `@` completion unusable. A `welcome-pr` fix is in progress (#8074).

10. **[#8006](https://github.com/QwenLM/qwen-code/issues/8006) — Ctrl+C issue: raw mode intercepts copy, triggers quit/clear instead** (P3, bug, Windows, keybindings)
    *Why it matters:* Represents broader usability friction: terminal raw mode prevents standard copy operations (`Ctrl+C` / `Ctrl+Shift+C`). Windows Terminal users are particularly affected. Status is `need-information`.

---

## 4. Key PR Progress (10 selected)

1. **[#8042](https://github.com/QwenLM/qwen-code/pull/8042) — fix(autofix): salvage race-lost pushes by merging the moved head and retrying** (wenshao)
   *Feature:* When someone pushes to a PR head during the agent's ~50-minute run window, the agent's push now merges the moved head and retries instead of dying with `fetch first`. Solves a frequent autofix discard scenario.

2. **[#7975](https://github.com/QwenLM/qwen-code/pull/7975) — fix(serve): Isolate daemon session maintenance writers** (doudouOUC)
   *Feature:* Addresses #7752 by pinning absolute session runtime roots and passing them to managed children. Session deletion, archive, unarchive, and scheduled maintenance all go through the writer-lease protocol.

3. **[#7983](https://github.com/QwenLM/qwen-code/pull/7983) — feat(review): add `review run` — headless review with a machine-readable verdict** (wenshao)
   *Feature:* `qwen review run [target]` delivers full `/review` non-interactively, with machine-readable stdout, progress on stderr, and exit codes suitable for CI gates. Part of the "first-class headless mode" roadmap.

4. **[#7993](https://github.com/QwenLM/qwen-code/pull/7993) — fix(cli): stamp QWEN_CODE_CLI at the workspace entry and publish QWEN_CODE_MODEL** (wenshao)
   *Feature:* Skill subprocesses can now reliably reach the build that launched them and learn the model actually running. Stamps runtime identity at workspace entry.

5. **[#8010](https://github.com/QwenLM/qwen-code/pull/8010) — feat(verify-pr): add seven techniques from maintainer verification rounds** (wenshao)
   *Feature:* Adds verification patterns (shared, collision, writer, both arms, positive...) that were previously absent from the `verify-pr` skill — directly lifted from hand-written maintainer rounds.

6. **[#8014](https://github.com/QwenLM/qwen-code/pull/8014) — feat(triage): raise the /verify agent budget from 25m to 120m** (wenshao)
   *Feature:* The agent's verification time budget jumps from 25 to 120 minutes, allowing it to match what a maintainer would do locally. Three encoded values move together to prevent silent failure.

7. **[#8044](https://github.com/QwenLM/qwen-code/pull/8044) — fix(autofix): cumulative timeout breaker, narrowed retry prompt, truthful handoff wording** (wenshao)
   *Feature:* The consecutive-failure cap now accounts for interleaved timeouts (not just pushes). Retry prompts are narrowed, and failure handoff wording is more honest about what the agent attempted.

8. **[#8064](https://github.com/QwenLM/qwen-code/pull/8064) — fix(integration): make interactive read-then-write test deterministic (#8060)** (qwen-code-dev-bot)
   *Feature:* The flaky interactive E2E test now uses a deterministic conversation driver instead of a live LLM, eliminating AI nondeterminism as a failure source.

9. **[#8074](https://github.com/QwenLM/qwen-code/pull/8074) — fix(cli): add Ctrl+Tab alternative for @ completion tab switching** (qwen-code-dev-bot)
   *Feature:* Addresses #8069 by adding `Ctrl+Tab` as an alternative keybinding for switching between all/session/mcp tabs in `@` completion. Leaves `Ctrl+←/→` as one option but doesn't rely on it.

10. **[#7908](https://github.com/QwenLM/qwen-code/pull/7908) — feat(ci): add repo-hygiene skill and weekly patrol workflow** (ZijianZhang989)
    *Feature:* Adds a `repo-hygiene` skill that dispatches nine parallel subagents weekly to scan for small docs/test/code hygiene issues, consolidating fixes into a single PR. Automates cleanup that previously required human triage.

---

## 5. Feature Request Trends

The most requested directions from this week's issue data:

1. **Role-based model routing** — [#8021](https://github.com/QwenLM/qwen-code/issues/8021) proposes binding model groups to intent-based roles (cheap models for exploration, strong models for implementation). This would fundamentally change how qwen-code selects models per task phase, rather than using a global `/model` switch.

2. **GitHub channel delivery and review automation** — [#8012](https://github.com/QwenLM/qwen-code/issues/8012) and [#8013](https://github.com/QwenLM/qwen-code/issues/8013) ask for publication-safe output contracts, delivery audit trails, and batch/close/review-event gap closure. The community wants the GitHub integration to behave like a first-class notification channel, not just a polling-based wakeup.

3. **Reduced UI intrusion for modal dialogs** — [#8025](https://github.com/QwenLM/qwen-code/issues/8025) asks for confirmation dialogs that don't block reading output. Users want non-blocking or movable dialog placements.

4. **Auto-close delivery and batching** — Multiple issues request automatic closing of resolved conversations and batched delivery for background automation tasks, indicating a shift toward treating qwen-code as an operational workflow tool rather than just an interactive terminal.

5. **Headless mode maturity** — The `review run` PR (#7983) and YOLO mode bug (#7832) show strong demand for reliable non-interactive operation with structured output contracts, suitable for CI/CD pipelines.

---

## 6. Developer Pain Points

Recurring frustrations and high-frequency requests observed this week:

- **CI flakiness is the dominant operational headache** — Seven `Main CI failed` issues were filed in 24 hours alone (#8076, #8072, #8070, #8060, #8029, #8018, #8019, #8022, #8023, #8026). Failures span ACP cron, SDK system-control, subagents, interactive file-system, and infrastructure-level build failures. The `autofix/in-progress` label on many suggests maintainers are firefighting rather than developing new features.

- **Terminal interaction on Windows is broken** — Two distinct issues (#7964, #8052) report scroll regression in v0.21.1 on Windows. The `Ctrl+C` keybinding (#8006) interferes with standard copy operations, and @ completion tab switching (#8069) conflicts with terminal keybindings. Windows users are disproportionately affected by v0.21.1's terminal virtualization changes.

- **Token management for small-window deployments** — Issues #7960 and #7961 describe hardcoded `maxOutputTokens` in both main-turn output clamping and compression side-queries. Self-hosted deployments with small `max_model_len` (vLLM, Ollama) consistently overflow context windows or get 400 errors. The fix requires making token budgets dynamically responsive to actual model capacity.

- **Daemon writer-lock lifecycle is fragile** — Issue #7752 (P0) shows that daemon crashes or replacements leave orphaned writer locks in the workspace, preventing new sessions. The PR #7975 attempts to fix this, but the problem is systemic and has been open since July 26.

- **Model behavior regression in long sessions** — Issue #8003 reports that Qwen models occasionally revert to XML tool-call formatting instead of structured `tool_calls` arrays in long contexts (>180K tokens). This breaks automation pipelines that parse structured responses, forcing users into string matching workarounds.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar).*