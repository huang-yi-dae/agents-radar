# AI CLI Tools Community Digest 2026-08-03

> Generated: 2026-08-03 03:23 UTC | Tools covered: 7

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

# Cross-Tool Comparison Report: AI CLI Developer Tools
**Date:** 2026-08-03 | **Scope:** 7 major AI CLI tools

---

## 1. Ecosystem Overview

The AI CLI coding agent landscape is in a **post-adoption stabilization phase**: no major stable releases shipped in the last 24 hours across any of the seven tracked tools, yet issue traffic and PR activity remain intense, indicating mature user bases actively stress-testing production workflows. The dominant cross-cutting themes are **concurrency correctness** (parallel sessions/subagents hitting race conditions), **token/cost efficiency** (polling loops and context management), **session persistence reliability**, and **approval/transparency UX**. Notably, the three properties-backed tools (Anthropic, OpenAI, Google) are all fielding report clusters around multi-session and multi-agent correctness, while open-source tools (OpenCode, Qwen Code) are investing heavily in plugin extensibility and daemon/serve architectures. The ecosystem is converging on a common feature set — memory, agents/subagents, MCP, diff review — while differentiation increasingly happens at the architecture level (server-based vs. terminal-based) and in ecosystem integration depth.

---

## 2. Activity Comparison

Figures represent **highlighted issues/PRs in each tool's daily digest**, not total tracker counts.

| Tool | Hot Issues | Active PRs | Release Today | Top Issue Engagement |
|---|---|---|---|---|
| **Claude Code** | ~13 | 4 | None | 96 comments / 39 👍 |
| **OpenAI Codex** | 10 | 5 | None | 45 comments / 115 👍 |
| **Gemini CLI** | 10 | 9 | Nightly v0.55.0 | 12 comments / 8 👍 |
| **GitHub Copilot CLI** | 10 | 0 | None | 3 comments |
| **Kimi Code CLI** | 4 | 1 | None | 24 👍 (no comments) |
| **OpenCode** | 10 | 10 | None | 14 comments / 30 👍 |
| **Qwen Code** | 10 | 10 | Nightly v0.21.3 | 7 comments |

**Observation:** Claude Code leads in raw community engagement (deep comment threads, high upvotes), while OpenCode and Qwen Code show the strongest **PR velocity** (10 each). Gemini CLI ships nightlies daily, signaling rapid iteration. GitHub Copilot CLI has the quietest tracker — few comments per issue, zero PRs — suggesting either higher stability or a smaller/different feedback channel.

---

## 3. Shared Feature Directions

The following requirements appear independently across multiple tool communities:

| Direction | Tools | Specific Needs |
|---|---|---|
| **Batch diff review & approval transparency** | Claude Code (#31888), Copilot CLI (#4335), Qwen Code (#8393), OpenCode (#30357) | Show all changes for approval before execution; expose real shell commands (not summaries) in approval modals; bind plan approvals to exact Todo revisions; fix incorrect diffs in review panels |
| **Persistent session memory & state integrity** | Kimi (#1283), Claude Code (#40175, #75900), Gemini (Auto Memory #26522/26525), Qwen Code (#8400, #7164) | Cross-session context retention; prevent silent config reversion; stop transcript/instruction data loss; deterministic redaction before model exposure; survive restarts without data loss |
| **Multi-agent / parallel execution reliability** | Claude Code (#82491, #83457, #83288), Kimi (#2578), Qwen Code (#7164), Codex (#22411) | Fix cross-session output bleed; prevent MCP response misdelivery; eliminate CPU spin; make swarm batches resilient to quota/timeout failures; coordinate session writers |
| **Token/cost visibility & control** | Codex (#13733, #2916, #35259), Qwen Code (#7306), Claude Code (#81940) | Service-tier config; scoped rate limits in statusline; eliminate polling-triggered full-history resends; tool-output budgeting; persistent usage displays |
| **Model/provider flexibility** | OpenCode (#18793, #26338), Gemini CLI (#24246), Copilot CLI (#4337), Qwen Code (#8398) | Plugin-driven model routing; new providers (CommandCode); handle >128 tools gracefully; consistent API surface across endpoints; OpenAI-compatible provider edge cases |
| **Remote/daemon architectures** | Qwen Code (#4156), Kimi (#1282, #2579), Codex (app-server) | TUI + daemon coexistence; resume sessions from other devices; external event/wake channels; fix app-server session-file loading on every list call |
| **Windows reliability** | Claude (#32870 BSOD), Codex (#35420 OneDrive), Copilot (#4328 WSL2), Qwen (#8400 data loss), OpenCode (#24217 ESC loops) | Kernel-level crashes; OneDrive-degraded workspaces; input key leakage; silent session deletion; TUI/Desktop interruption bugs |

---

## 4. Differentiation Analysis

| Tool | Primary Focus | Target User | Technical Approach |
|---|---|---|---|
| **Claude Code** | Enterprise-scale agent orchestration; subagents, hooks, plugins | Professional dev teams running many parallel sessions | Deep CLI/TUI with plugin marketplace; extensive hook system; **straining under concurrency** at fleet scale |
| **OpenAI Codex** | Multi-surface: CLI, VS Code extension, Desktop app | ChatGPT ecosystem users; extension-heavy workflows | Server-backed app architecture (`app-server`); OpenAI Responses API; **pain point is token economics** of polling loops |
| **Gemini CLI** | Agent framework sophistication: subagents, skills, Auto Memory, browser agent | Google ecosystem developers; nightly-channel adopters | Most **formalized P1/P2 triage** of all trackers; nightly release cadence; heavy dependency on Google SDK stack |
| **GitHub Copilot CLI** | GitHub-centric workflows; ACP (Agent Client Protocol) | GitHub-heavy developers; Zed/other ACP clients | ACP protocol integration; OpenAI-compatible Models API; **lowest visible churn** — possibly most stable, possibly least active |
| **Kimi Code CLI** | Session continuity: memory, remote access, external wake channels | Moonshot AI users; swarm/batch workflows | Smallest tracked footprint but clear product vision: making the CLI a persistent, remotely accessible agent runtime |
| **OpenCode** | Open-source plugin extensibility; TUI polish | Plugin-hungry OSS community; model-agnostic users | Plugin hooks for every layer (model routing, MCP trust, TUI config); **highest feature velocity per issue** via direct PRs |
| **Qwen Code** | Serve/daemon platform; review/CI automation; enterprise deployment | Alibaba cloud ecosystem; managed deployments | Investing most heavily in **architecture**: workspace runtime ownership, daemon transports, sandbox probing, external tool guards |

**Key structural split:** Claude Code, Gemini CLI, and Kimi remain **terminal-first** tools bolting on persistence. Qwen Code and Codex are pushing **server/daemon architectures** where the CLI is one surface among many. OpenCode is the purest **plugin-platform play**, letting the community build what vendors ship slowly. Copilot CLI is the most **protocol-driven** (ACP), betting on ecosystem interop over proprietary features.

---

## 5. Community Momentum & Maturity

**Most mature / highest engagement:**  
**Claude Code** has the deepest community threads (96-comment issue, 46-upvote feature requests) and the widest issue surface, indicating the largest real-world install base — but also the most production pain. The issue cluster around concurrency bugs (cross-session bleed, MCP misdelivery, 33% CPU spin) suggests **scale is exposing architectural limits**.

**Rapidly iterating:**  
**Qwen Code** (10 PRs + nightly release, serve-architecture PRs) and **OpenCode** (10 PRs incl. a long-awaited `chat.model` plugin hook) are shipping the most code per day. **Gemini CLI** maintains a consistent nightly cadence with formalized P1/P2 priorities, though issue engagement (12 comments max) trails its release activity.

**Community engagement vs. engineering activity divergence:**  
- GitHub Copilot CLI: quiet tracker (max 3 comments), zero PRs — but filed issues are **high-quality and specific** (regression diffs between versions, API surface inconsistencies), suggesting a professional user base reporting via other channels.
- Kimi Code CLI: smallest dataset (4 issues, 1 PR) — early-stage community, but the feature requests (memory, remote control, wake channels) are ambitious and well-aligned with industry direction.

**Maturity ranking (by ecosystem signals):** Claude Code > OpenAI Codex > Gemini CLI ≈ Qwen Code > OpenCode > GitHub Copilot CLI ≈ Kimi Code CLI

---

## 6. Trend Signals

1. **Concurrency safety is the defining technical debt of 2026.** Every multi-agent tool (Claude Code, Kimi, Qwen, Codex) reported race conditions this week: misdelivered MCP payloads, forked transcript histories, partial swarm state. Tools that solve cross-session and cross-subagent correctness will win enterprise trust.

2. **Token waste is becoming a top-tier product issue, not just a cost issue.** Codex's 9.47M-token session and 19.8% polling overhead, plus Claude's 33% CPU spin, show that **architectural inefficiency directly undermines user trust**. Expect "token observability" (per-request cost breakdowns, polling de-duplication, compaction transparency) to become a standard feature.

3. **False-success reporting is a latent safety crisis.** Gemini's MAX_TURNS-as-GOAL bug (#22323) hides interrupted work behind a success status — in automated pipelines, this silently corrupts downstream results. Similar concerns appear in Copilot's autopilot false-positive state (#4329). **Correct terminal-state semantics will be a hard requirement for unattended operation.**

4. **Windows remains the weakest platform across the board.** BSODs (Claude), OneDrive-degraded streams (Codex), silent session deletion (Qwen), input key leakage (Copilot), ESC loops (OpenCode) — every vendor has Windows-specific reliability debt. This is a competitive opening for any tool that invests seriously in Windows hardening.

5. **The architecture race is server-side.** Qwen's workspace-runtime ownership and daemon transports, Codex's app-server, and Kimi's remote-control requests all point to the same conclusion: **the CLI is becoming a client to a local agent server**. Terminal-first tools (Claude Code, Gemini) will need to address this or risk being leapfrogged for remote/automation use cases.

6. **Approval UX is being redesigned around transparency.** The cluster of requests for batch diff review (Claude), real-command approval modals (Copilot), and Todo-bound plan approval (Qwen) signals that **developers no longer trust "the agent summary"** — they want the actual diff, the actual command, the exact plan version. Guardrails are shifting from permission prompts to **artifact-exact review**.

7. **Auto-memory features are under security scrutiny.** Gemini's Auto Memory issues (retrying low-signal sessions, sending transcript content to models before redaction) raise the question of whether memory systems are worth their privacy cost. Expect **deterministic redaction and opt-in scoping** to become table stakes.

---

### Bottom Line for Technical Decision-Makers

- **If you run fleets/parallel agents:** watch Claude Code's concurrency fixes and Kimi's swarm hardening closely; pin versions until race-condition fixes land.
- **If you're cost-sensitive at scale:** audit your Codex/Claude usage for polling waste; demand statusline rate-limit visibility and service-tier controls.
- **If you're choosing a platform for extensibility:** OpenCode's plugin hook (model routing, MCP trust) is shipping fastest; Claude's marketplace is broader but slower.
- **If you need unattended/automated operation:** verify terminal-state correctness (Gemini's MAX_TURNS bug) and approve-transparency semantics (Copilot ACP) before trusting agents without human review.
- **If you're on Windows:** budget for platform-specific quirks across all vendors; Qwen's session data loss and Claude's BSOD are the most severe current risks.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report
**Data as of 2026-08-03 | Source: github.com/anthropics/skills**

---

## 1. Top Skills Ranking

The most-discussed pull requests show a two-sided picture: new Skill submissions and a concentrated burst of fixes to the `skill-creator` meta-tooling.

**1. skill-creator eval pipeline overhaul — [PR #1298](https://github.com/anthropics/skills/pull/1298)** — *Open*
The most-commented PR. Fixes the critical `run_eval.py` `recall=0%` bug that invalidates the description-optimization loop (tracked in #556 with 10+ independent reproductions). Proposes installing the eval artifact as a real skill, plus Windows stream-reading, trigger-detection, and parallel-worker fixes.

**2. document-typography skill — [PR #514](https://github.com/anthropics/skills/pull/514)** — *Open*
A typographic quality-control skill for AI-generated documents: orphan word wrap, widow paragraphs, and numbering misalignment. Notable for addressing a universal failure mode across all document-producing Skills.

**3. pdf skill case-sensitivity fix — [PR #538](https://github.com/anthropics/skills/pull/538)** — *Open*
Fixes 8 mismatches in `skills/pdf/SKILL.md` (`REFERENCE.md` → `reference.md`). Breaks workflows on case-sensitive filesystems — evidence of growing scrutiny on cross-platform correctness.

**4. ODT skill — [PR #486](https://github.com/anthropics/skills/pull/486)** — *Open*
Adds OpenDocument Format support (.odt/.ods): creation, template filling, and ODT-to-HTML parsing. Responds to demand for open-source document formats alongside docx/pdf.

**5. frontend-design skill revision — [PR #210](https://github.com/anthropics/skills/pull/210)** — *Open*
Revises the frontend-design skill for clarity and actionability, ensuring every instruction is executable within a single conversation.

**6. skill-quality-analyzer + skill-security-analyzer — [PR #83](https://github.com/anthropics/skills/pull/83)** — *Open*
Meta-skills evaluating Skills across five dimensions (structure, documentation, security, etc.) — a direct response to quality and trust concerns in the marketplace.

**7. testing-patterns skill — [PR #723](https://github.com/anthropics/skills/pull/723)** — *Open*
Comprehensive testing guidance: Testing Trophy philosophy, AAA unit-testing patterns, React Testing Library, and what *not* to test.

**8. self-audit skill — [PR #1367](https://github.com/anthropics/skills/pull/1367)** — *Open*
Mechanical file verification followed by a four-dimension reasoning quality gate before delivery; universal across projects and models, part of the "reasoning quality gate" proposal family (#1385).

*Other active submissions:* pyxel retro-game dev ([#525](https://github.com/anthropics/skills/pull/525)), color-expert ([#1302](https://github.com/anthropics/skills/pull/1302)), plan-file-hygiene ([#1479](https://github.com/anthropics/skills/pull/1479)), SAP-RPT-1-OSS predictor ([#181](https://github.com/anthropics/skills/pull/181)).

---

## 2. Community Demand Trends (from Issues)

- **Trust & distribution security — [#492](https://github.com/anthropics/skills/issues/492) (43 comments, 2 👍)** — The single most-discussed issue: community Skills distributed under the `anthropic/` namespace impersonate official Anthropic Skills, creating a trust-boundary vulnerability where users may grant elevated permissions unintentionally.
- **Org-wide skill sharing — [#228](https://github.com/anthropics/skills/issues/228) (16 comments, 8 👍)** — Direct skill sharing in Claude.ai; the current download-and-reupload workflow is a major enterprise friction point.
- **skill-creator reliability — [#556](https://github.com/anthropics/skills/issues/556) (12 comments, 7 👍), [#1169](https://github.com/anthropics/skills/issues/1169), [#1061](https://github.com/anthropics/skills/issues/1061)** — The eval loop's 0% trigger rate and Windows incompatibilities (PATHEXT, cp1252 encoding, select-on-pipes) are the ecosystem's biggest operational pain points.
- **Skill lifecycle & context hygiene — [#62](https://github.com/anthropics/skills/issues/62) (10 comments), [#189](https://github.com/anthropics/skills/issues/189) (6 comments, 9 👍), [#1487](https://github.com/anthropics/skills/issues/1487)** — Skills disappearing after file renames, duplicate Skills across overlapping plugins, and a Skill injecting ~156k tokens in one call.
- **Proposed new directions** — compact-memory symbolic notation ([#1329](https://github.com/anthropics/skills/issues/1329)), agent-governance safety patterns ([#412](https://github.com/anthropics/skills/issues/412)), reasoning quality gate pipeline ([#1385](https://github.com/anthropics/skills/issues/1385)).
- **Platform reach** — AWS Bedrock support ([#29](https://github.com/anthropics/skills/issues/29)) and exposing Skills as MCPs ([#16](https://github.com/anthropics/skills/issues/16)).

---

## 3. High-Potential Pending Skills

All top PRs remain open with active discussion; these new-submission PRs are the most likely to land soon:

| PR | Skill | Focus |
|----|-------|-------|
| [#514](https://github.com/anthropics/skills/pull/514) | document-typography | Typographic QC for generated documents |
| [#486](https://github.com/anthropics/skills/pull/486) | ODT | OpenDocument creation/template-fill/parsing |
| [#723](https://github.com/anthropics/skills/pull/723) | testing-patterns | Full-stack testing methodology |
| [#525](https://github.com/anthropics/skills/pull/525) | pyxel | Retro/pixel-art game development |
| [#1302](https://github.com/anthropics/skills/pull/1302) | color-expert | Color systems, spaces, and naming |
| [#1367](https://github.com/anthropics/skills/pull/1367) | self-audit | Output verification + reasoning gate |
| [#83](https://github.com/anthropics/skills/pull/83) | skill-quality/security-analyzer | Meta-evaluation of Skills |
| [#1479](https://github.com/anthropics/skills/pull/1479) | plan-file-hygiene | Planning-artifact lifecycle |

The skill-creator bug-fix cluster ([#1298](https://github.com/anthropics/skills/pull/1298), [#1099](https://github.com/anthropics/skills/pull/1099), [#1050](https://github.com/anthropics/skills/pull/1050), [#1323](https://github.com/anthropics/skills/pull/1323), [#1261](https://github.com/anthropics/skills/pull/1261), [#539](https://github.com/anthropics/skills/pull/539)) is equally high-priority, as it unblocks reliable skill-authoring for every future contributor.

---

## 4. Skills Ecosystem Insight

The community's most concentrated demand is not any single new Skill domain, but the reliability and trustworthiness of the Skill infrastructure itself — fixing the broken skill-creator eval loop, ensuring cross-platform (Windows) correctness, and securing the distribution namespace against impersonation.

---

# Claude Code Community Digest — 2026-08-03

## Today's Highlights
No new CLI releases landed in the past 24 hours, but issue traffic remains heavy: the long-running claude.ai visualize/DNS thread reached 96 comments, and several severe concurrency bugs were filed around multi-session and multi-subagent workflows — cross-session output bleed, remote MCP response misdelivery, and a constant 33% CPU spin in SDK-spawned processes. The PR queue is quiet, with only four documentation/plugin-guardrail fixes in motion.

## Releases
No new releases in the last 24 hours.

## Hot Issues

- **[#34820](https://github.com/anthropics/claude-code/issues/34820) — claude.ai visualize broken (DNS_PROBE_FINISHED_NXDOMAIN)** — The most-commented open thread (96 comments, 39 👍), active since March. Users report claudemcpcontent.com is unreachable, breaking the visualize feature. Despite the `[invalid]` tag, sustained engagement suggests widespread impact.

- **[#2805](https://github.com/anthropics/claude-code/issues/2805) — CRLF line endings on Linux** — A year-old platform bug (44 comments, 33 👍). Claude Code creates Windows line endings on Ubuntu despite CLAUDE.md instructions, causing "No such file or directory" errors when executing generated scripts.

- **[#32870](https://github.com/anthropics/claude-code/issues/32870) — claude.exe triggers Windows BSOD via Wof.sys** — 38 comments. A kernel-level crash during `NtQueryDirectoryFileEx` directory listing. Extremely high severity for Windows users; tagged `external`, suggesting interplay with a Windows component.

- **[#40175](https://github.com/anthropics/claude-code/issues/40175) — Cowork global instructions silently revert** — 32 comments, 20 👍. Saved global instructions revert to an older version without user action — silent configuration corruption that erodes trust in persistence on macOS and Windows.

- **[#77966](https://github.com/anthropics/claude-code/issues/77966) — OAuth loop: state parameter dropped** — 20 comments, 14 👍. Linux/IntelliJ users are stuck in a "sign in again to continue" redirect loop; the dropped OAuth state parameter blocks login entirely.

- **[#31888](https://github.com/anthropics/claude-code/issues/31888) — Batch diff review mode (Cursor-style)** — 16 comments but 46 👍, making it the highest-upvoted request this week. Users want all changes shown together for approval before the agent proceeds, as in Cursor's native agent.

- **[#83288](https://github.com/anthropics/claude-code/issues/83288) — Headless SDK-spawned CLI burns ~33% CPU per session** — Strace-confirmed futex/sched_yield spin, still present in 2.1.220. Every `query()` session wastes a third of a core for its lifetime — a real cost multiplier for agent fleets.

- **[#75900](https://github.com/anthropics/claude-code/issues/75900) — Assistant text between tool calls lost** — Filed by Jeremy Howard via Fable. Mid-stream reasoning between tool calls is neither rendered, shown in ctrl-o, nor saved to the session file; only the first and last text fragments survive.

- **[#83457](https://github.com/anthropics/claude-code/issues/83457) — Remote MCP response delivered to wrong tool call** — Filed today. When multiple subagents call the same remote MCP connector concurrently, a payload can land on the wrong pending call, and the rightful caller times out after 180s.

- **[#83453](https://github.com/anthropics/claude-code/issues/83453) — Linux Desktop GPU retry storm floods syslog** — Filed today. GPU process launch retries at ~9,000/sec, writing 346 GB to `/var/log/syslog` in 24 hours — a disk-filling resource bug.

## Key PR Progress
Only four PRs were active; all are documentation or plugin-guardrail fixes, with no core-CLI changes in flight.

- **[#77977](https://github.com/anthropics/claude-code/pull/77977) — docs: document `skipLfs` marketplace sources** — Adds guidance for `github`/`git` marketplace sources that skip Git LFS downloads, addressing plugin installs from large LFS-backed repos (refs #63035).

- **[#83374](https://github.com/anthropics/claude-code/pull/83374) — docs: add MessageDisplay hook guidance** — The bundled Hook Development skill omits `MessageDisplay`; this adds trigger descriptions, event guidance, and streaming-field semantics.

- **[#26056](https://github.com/anthropics/claude-code/pull/26056) — Fix code-review plugin posting without `--comment`** — Strengthens guardrails so the model reliably stops at terminal output when `--comment` is absent, adds explicit conditionals on steps 8–9, and a NEVER-post note.

- **[#48343](https://github.com/anthropics/claude-code/pull/48343) — fix: make skill-reviewer frontmatter valid YAML** — Rewrites the frontmatter description as a YAML block scalar so the file parses cleanly (part of #40370).

## Feature Request Trends
- **Multi-agent observability** — The Agent Hierarchy Dashboard ([#24537](https://github.com/anthropics/claude-code/issues/24537)) asks for unified real-time visualization of multi-agent workflows in both TUI and Desktop.
- **Batch diff review UX** — [##31888](https://github.com/anthropics/claude-code/issues/31888) leads a push for Cursor-style review of all changes before approval.
- **Session management customization** — Configurable auto-generated session names ([#83455](https://github.com/anthropics/claude-code/issues/83455)) for users running many concurrent sessions.
- **Richer statusline data** — Scoped rate-limit info in the statusline JSON payload ([#81940](https://github.com/anthropics/claude-code/issues/81940)), motivated by Fable 5's separate weekly cap.
- **Desktop UX polish** — Persistent "keep sidebar open" setting ([#75523](https://github.com/anthropics/claude-code/issues/75523)); the current Ctrl+B pinned state is called undiscoverable.
- **Plugin lifecycle reliability** — Auto-update fixes for git-marketplace plugins ([#73673](https://github.com/anthropics/claude-code/issues/73673)) remain a recurring theme.

## Developer Pain Points
- **Concurrency correctness under parallel sessions** — This week's cluster: cross-session output bleed ([#82491](https://github.com/anthropics/claude-code/issues/82491)), MCP payload misdelivery ([#83457](https://github.com/anthropics/claude-code/issues/83457)), CPU spin ([#83288](https://github.com/anthropics/claude-code/issues/83288)), and worktrees locking Bash/Edit to the wrong repo ([#83454](https://github.com/anthropics/claude-code/issues/83454)). Multi-session and multi-subagent workflows are hitting real race conditions.
- **Platform inconsistency** — CRLF on Linux ([#2805](https://github.com/anthropics/claude-code/issues/2805)), Windows BSODs ([#32870](https://github.com/anthropics/claude-code/issues/32870)), and hardcoded PowerShell in the Windows Desktop terminal ([#78596](https://github.com/anthropics/claude-code/issues/78596)).
- **Silent state loss** — Global instructions reverting ([#40175](https://github.com/anthropics/claude-code/issues/40175)), assistant text vanishing from sessions ([#75900](https://github.com/anthropics/claude-code/issues/75900)), and Desktop loading stale plugin versions ([#83447](https://github.com/anthropics/claude-code/issues/83447)).
- **Auth friction** — OAuth loops ([#77966](https://github.com/anthropics/claude-code/issues/77966)) and VSCode extension disconnects ([#83443](https://github.com/anthropics/claude-code/issues/83443)) continue to block onboarding.
- **Resource exhaustion on Desktop** — syslog flooding ([#83453](https://github.com/anthropics/claude-code/issues/83453)) joins earlier complaints about plugin auto-update no-ops, pointing to desktop-app stability as a weak spot.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

## OpenAI Codex Community Digest — 2026-08-03

### 1. Today's Highlights

No new Codex release shipped in the last 24 hours. The most active community discussion centers on runaway token consumption from polling loops and context compaction, including reports of a single CLI session burning 9.47M tokens. On the PR side, the team closed focused fixes for rollout budget accounting, onboarding hints, and SQLite thread metadata preservation.

### 2. Releases

No releases were published in the last 24 hours.

### 3. Hot Issues

1. **[#35058 — Codex Diff crashes with “Oops, an error has occurred” in VS Code on macOS](https://github.com/openai/codex/issues/35058)**  
   The most-discussed issue today with 45 comments and 115 👍. Opening the Codex Diff tab after file edits crashes consistently, even in fresh workspaces. This is a serious extension stability problem for macOS/VS Code users.

2. **[#13733 — Background process polling wastes tokens: each write_stdin poll triggers full API turn with complete history](https://github.com/openai/codex/issues/13733)**  
   A long-running issue with 35 comments. During `cargo build`/`cargo test` style loops, every status poll re-sends the full conversation history, burning credits proportional to history size × poll count. Represents one of the most common cost complaints.

3. **[#35420 — Work/Codex stream repeatedly disconnects on OneDrive-backed Windows workspaces](https://github.com/openai/codex/issues/35420)**  
   27 comments. Users on Windows see `stream disconnected before completion` when the selected workspace is OneDrive-backed and OneDrive is degraded. Connectivity + Windows-specific reliability remains a hot area.

4. **[#2916 — OpenAI service tier support](https://github.com/openai/codex/issues/2916)**  
   21 comments, 54 👍. Users want a `service_tier` configuration option to control API cost/latency. This is one of the most-upvoted enhancement requests in the tracker.

5. **[#12098 — Tabbed interface for parallel chat sessions in Codex extension](https://github.com/openai/codex/issues/12098)**  
   19 comments, 55 👍. Switching between chats is currently multi-step; developers want tabbed parallel sessions in the VS Code extension. Clear demand for better multi-session UX.

6. **[#35259 — Codex Desktop repeatedly re-enters the model during wait/status polling](https://github.com/openai/codex/issues/35259)**  
   11 comments. A measured example showed ~19.8% of local token volume consumed by turns whose only action was wait/status polling. This is the desktop-app variant of the polling waste problem.

7. **[#5148 — Add timestamp to each message in Codex VS Code extension](https://github.com/openai/codex/issues/5148)**  
   8 comments. Small UX request: display timestamps so users can estimate how long each request took. Lightweight but popular.

8. **[#35763 — Max reasoning effort is missing in VS Code extension while available in Codex App](https://github.com/openai/codex/issues/35763)**  
   7 comments. Users on Windows report the VS Code extension does not expose the **Max** reasoning effort setting for GPT-5.6 models, creating feature parity gaps between surfaces.

9. **[#12978 — Long-standing undo bug remains unfixed](https://github.com/openai/codex/issues/12978)**  
   6 comments. The user complains that modified code cannot be reverted even though files are Git-managed, and notes this has been broken across many versions. Frustration with a long-lived regression.

10. **[#22411 — app-server loads ALL session files on every thread/list call](https://github.com/openai/codex/issues/22411)**  
    5 comments. The `codex app-server` deserializes every session file on each `thread/list` request, causing high CPU, slow startup, and invisible background token usage. Major performance/cost issue for heavy users.

### 4. Key PR Progress

Only 5 PRs were updated in the last 24 hours; all are listed below.

1. **[#36641 — Capture rollout budget units from response usage](https://github.com/openai/codex/pull/36641)**  
   Closed. Parses `codex_rollout_budget_units` from Responses API usage into `TokenUsage` while keeping the provider-only value out of serialized protocol and TypeScript representations. Directly relevant to budget/usage tracking.

2. **[#31817 — Update models.json](https://github.com/openai/codex/pull/31817)**  
   Open. Automated model metadata refresh. No functional change expected.

3. **[#36635 — Expose onboarding hints in login completion notifications](https://github.com/openai/codex/pull/36635)**  
   Closed. Accepts allowlisted `.onboarding_entrypoint=life_sciences` suffixes on OAuth state and returns parsed callback metadata from the login server without exposing raw state.

4. **[#36632 — Preserve SQLite thread metadata during goal mutations](https://github.com/openai/codex/pull/36632)**  
   Closed. Fixes a bug where setting/clearing a thread goal could reconcile an already indexed rollout and overwrite SQLite-only metadata such as the thread preview.

5. **[#31781 — Bound executor-controlled HTTP response buffering](https://github.com/openai/codex/pull/31781)**  
   Open, code-reviewed. Addresses a security/robustness gap: streamed HTTP responses were bounded by frame count but not byte size, allowing an untrusted remote exec-server to cause excessive memory retention in app-server. Adds stricter byte-level buffering limits.

### 5. Feature Request Trends

- **Cost control and usage transparency**: Users repeatedly ask for service-tier configuration, persistent usage-limit displays, and better accounting of token consumption.
- **Session/chat UX improvements**: Tabbed parallel sessions and per-message timestamps are the most concrete community-supported UI requests.
- **Autonomous goal continuation**: A new request asks for controlled resume/active transitions through the Goal API for user-authorized autonomous continuation.
- **Cross-surface parity**: Users expect the same reasoning-effort settings and behaviors across VS Code extension, desktop app, and CLI.
- **Better onboarding/login plumbing**: PRs and issues hint at interest in lifecycle science entrypoints and more useful login completion hints.

### 6. Developer Pain Points

- **Token/credit burn**: Polling loops, session compaction, and re-reading already-read files are wasting significant allowances. One reported CLI session consumed 9.47M tokens and 183.9M cached tokens in ~5.9 hours.
- **Windows instability**: OneDrive-connected workspaces, desktop freezes, crash loops, migration data loss, and unrecoverable threads are recurring across Windows-specific issues.
- **Sandbox/permissions breakage**: On macOS, activating permission profiles can cause silent `SIGABRT`, blocking legitimate sandbox use cases.
- **MCP and tool-call reliability**: `notifications/cancelled` can halt work without resolving `tools/call`, leaving MCP integrations in a broken state.
- **App-server performance**: Loading all session files on list calls creates severe slowdowns and background token usage.
- **Long-standing regressions**: The inability to undo edited code remains a major source of user frustration, spanning multiple releases.
- **Model scope discipline**: Multiple reports describe Codex agents ignoring explicit task scope and making destructive out-of-scope changes, even after repeated corrections.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-08-03

## 1. Today's Highlights

The project shipped another nightly release and a broad dependency refresh, while the highest-community attention remains on agent reliability. The most active issue thread (12 comments) is a false-success bug where a subagent that hits `MAX_TURNS` is still reported as `GOAL` completion, which can hide incomplete work. Meanwhile, maintainers landed fixes for headless OAuth login failures and continue working through terminal hang and permission-regression reports.

## 2. Releases

- [v0.55.0-nightly.20260803.gf47d6c6f7](https://github.com/google-gemini/gemini-cli/releases/tag/v0.55.0-nightly.20260803.gf47d6c6f7) — Nightly release published in the last 24 hours. No detailed changelog in the release body; see the [full changelog against the previous nightly](https://github.com/google-gemini/gemini-cli/compare/v0.55.0-nightly.20260802.gf47d6c6f7...v0.55.0-nightly.20260803.gf47d6c6f7).

## 3. Hot Issues

- [#22323 — Subagent recovery after MAX_TURNS is reported as GOAL success, hiding interruption](https://github.com/google-gemini/gemini-cli/issues/22323)  
  **P1 · 12 comments · 2 👍**  
  A subagent that runs out of turns still reports `status: "success"` with `Termination Reason: "GOAL"`. This is dangerous for automated workflows because interruption is silently masked as success.

- [#21409 — Generalist agent hangs](https://github.com/google-gemini/gemini-cli/issues/21409)  
  **P1 · 8 comments · 8 👍**  
  One of the most upvoted open bugs: simple actions like folder creation hang when the CLI defers to the generalist agent. Users report waiting up to an hour before cancelling.

- [#25166 — Shell command execution gets stuck with "Waiting input" after command completes](https://github.com/google-gemini/gemini-cli/issues/25166)  
  **P1 · 4 comments · 3 👍**  
  Repeated reports of the CLI hanging after simple shell commands finish, still showing the command as active and awaiting input.

- [#21983 — Browser subagent fails in Wayland](https://github.com/google-gemini/gemini-cli/issues/21983)  
  **P1 · 4 comments · 1 👍**  
  Browser agent finishes with `Termination Reason: GOAL` but fails on Wayland systems, leaving Linux users without a functional browser subagent.

- [#22093 — (Sub)agents running without permission since v0.33.0](https://github.com/google-gemini/gemini-cli/issues/22093)  
  **P2 · 3 comments**  
  Subagents are being invoked even when agents are disabled in configuration. Users expect disabled agents to remain disabled.

- [#26522 — Stop Auto Memory from retrying low-signal sessions indefinitely](https://github.com/google-gemini/gemini-cli/issues/26522)  
  **P2 · 5 comments**  
  Auto Memory keeps surfacing low-value sessions because they are never marked as processed. This causes unnecessary retries and background extraction overhead.

- [#26525 — Add deterministic redaction and reduce Auto Memory logging](https://github.com/google-gemini/gemini-cli/issues/26525)  
  **P2 · 4 comments**  
  Security concern: Auto Memory sends transcript content to the model before prompt-based redaction happens. The issue asks for deterministic redaction before context exposure and less logging.

- [#24246 — Gemini CLI encounters 400 error with > 128 tools](https://github.com/google-gemini/gemini-cli/issues/24246)  
  **P2 · 3 comments**  
  Users with many MCP/tools hit a 400 error. The community expects smarter tool selection/limiting rather than a hard failure.

- [#22672 — Agent should stop/discourage destructive behavior](https://github.com/google-gemini/gemini-cli/issues/22672)  
  **P2 · 3 comments · 1 👍**  
  Gemini can use destructive commands like `git reset` or `--force` when safer alternatives exist. Users want stronger guardrails for destructive operations.

- [#21968 — Gemini does not use skills and sub-agents enough](https://github.com/google-gemini/gemini-cli/issues/21968)  
  **P2 · 6 comments**  
  Even when users have well-described custom skills and subagents, the model usually ignores them unless explicitly instructed. This reduces the return on investment for custom agent setups.

## 4. Key PR Progress

- [#28446 — fix(auth): use native fetch for OAuth token exchange to avoid "Premature close"](https://github.com/google-gemini/gemini-cli/pull/28446)  
  **Closed · P1 · security**  
  Fixes login failures on headless VPSes where OAuth token exchange fails with `Premature close`.

- [#28447 — docs(get-started): add Windows PowerShell troubleshooting for gemini command](https://github.com/google-gemini/gemini-cli/pull/28447)  
  **Closed · P2**  
  Adds PowerShell-specific guidance for installations where the `gemini` command is not recognized after global npm install.

- [#28624 — fix(core): prevent boolean thought parts leaking as [Thought: true] text](https://github.com/google-gemini/gemini-cli/pull/28624)  
  **Open · P2 · agent**  
  Fixes internal boolean `thought` flags from leaking into rendered output, improving thought-display cleanliness.

- [#28526 — fix(vscode-ide-companion): stop leaking gemini.diff.accept and onDidChangeWorkspaceFolders disposables](https://github.com/google-gemini/gemini-cli/pull/28526)  
  **Open · P2 · core**  
  Fixes a subscription regression where a stray parenthesis caused only the last registration in a comma expression to be preserved.

- [#28626 — chore(deps): bump the npm-dependencies group with 75 updates](https://github.com/google-gemini/gemini-cli/pull/28626)  
  **Closed · size/xl**  
  Large dependency sweep including `simple-git`, `@modelcontextprotocol/sdk`, and many other npm packages.

- [#28635 — chore(deps): bump undici from 7.10.0 to 8.9.0](https://github.com/google-gemini/gemini-cli/pull/28635)  
  **Closed · size/s**  
  Major `undici` update that includes high-severity security fixes.

- [#28631 — chore(deps): bump @google/genai from 1.30.0 to 2.13.0](https://github.com/google-gemini/gemini-cli/pull/28631)  
  **Closed · size/s**  
  Major version bump for the core Gemini SDK dependency.

- [#28630 — chore(deps): bump yargs from 17.7.2 to 18.1.0](https://github.com/google-gemini/gemini-cli/pull/28630)  
  **Closed · size/l**  
  Major update to the CLI argument-parsing layer.

- [#28637 — chore(deps): bump js-yaml from 4.1.1 to 5.2.2](https://github.com/google-gemini/gemini-cli/pull/28637)  
  **Closed · size/s**  
  Major YAML parser update, potentially affecting configuration-file handling.

- [#28638 — chore/release: bump version to 0.55.0-nightly.20260803.gf47d6c6f7](https://github.com/google-gemini/gemini-cli/pull/28638)  
  **Open · size/s**  
  Automated nightly version bump matching today's release.

## 5. Feature Request Trends

From the active issue set, community requests cluster around these directions:

- **AST-aware codebase tooling** — Better file reads, search, and codebase mapping using AST awareness, potentially via tools like `tilth` or `glyph`.  
  See [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) and [#22746](https://github.com/google-gemini/gemini-cli/issues/22746).

- **Agent evaluability and observability** — More robust component-level evals and shareable subagent trajectories.  
  See [#24353](https://github.com/google-gemini/gemini-cli/issues/24353) and [#22598](https://github.com/google-gemini/gemini-cli/issues/22598).

- **Browser agent resilience** — Automatic session takeover and lock recovery when browser profiles are locked by orphaned processes.  
  See [#22232](https://github.com/google-gemini/gemini-cli/issues/22232).

- **Better agent self-awareness** — The agent should know its own CLI flags, hotkeys, and self-execution behavior so it can act as its own guide.  
  See [#21432](https://github.com/google-gemini/gemini-cli/issues/21432).

- **Safety guardrails for destructive actions** — Avoid `git reset`, `--force`, and destructive database operations when safer alternatives exist.  
  See [#22672](https://github.com/google-gemini/gemini-cli/issues/22672).

## 6. Developer Pain Points

- **Hangs and stalls** — The strongest recurring frustration is the CLI getting stuck: generalist agent hangs ([#21409](https://github.com/google-gemini/gemini-cli/issues/21409)), shell commands stuck on "Waiting input" ([#25166](https://github.com/google-gemini/gemini-cli/issues/25166)), and interactive prompts not being handled correctly ([#22465](https://github.com/google-gemini/gemini-cli/issues/22465)).

- **Opaque subagent outcomes** — Subagents can report success when they actually failed or hit limits, and bug reports often lack subagent context.  
  See [#22323](https://github.com/google-gemini/gemini-cli/issues/22323), [#21983](https://github.com/google-gemini/gemini-cli/issues/21983), and [#21763](https://github.com/google-gemini/gemini-cli/issues/21763).

- **Config and permission regressions** — Users report subagents running despite being disabled, browser agent ignoring `settings.json`, and symlinked agent files not being recognized.  
  See [#22093](https://github.com/google-gemini/gemini-cli/issues/22093), [#22267](https://github.com/google-gemini/gemini-cli/issues/22267), and [#20079](https://github.com/google-gemini/gemini-cli/issues/20079).

- **Memory system trust and security** — Auto Memory retries low-value sessions, sends transcripts to models before deterministic redaction, and silently skips invalid patches.  
  See [#26522](https://github.com/google-gemini/gemini-cli/issues/26522), [#26525](https://github.com/google-gemini/gemini-cli/issues/26525), and [#26516](https://github.com/google-gemini/gemini-cli/issues/26516).

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-08-03

## Today's Highlights
No new releases or PR updates landed in the last 24 hours, but 11 issues were updated. The most significant themes are reliability regressions and approval transparency: a built-in `view` tool regression in 1.0.73 (#4202), autopilot failing to actually resume enabled state (#4329), and ACP approval modals hiding real shell commands behind summaries (#4335). An API consistency issue also surfaced: `gpt-5.6-luna` is advertised in `/models` but unusable via `/chat/completions` (#4337), potentially breaking OpenAI-compatible aggregator tooling.

## Releases
No new releases in the last 24 hours.

## Hot Issues

1. [**#4202 — Built-in view reports "Path does not exist" for existing files in 1.0.73; 1.0.71 succeeds**](https://github.com/github/copilot-cli/issues/4202)  
   A regression in the built-in `view` tool: existing text files fail with `Path does not exist` on 1.0.72/1.0.73, while an isolated SDK probe succeeds. This has the most community engagement today with 3 comments and points to a CLI-side regression in non-interactive/tool mode.

2. [**#4337 — gpt-5.6-luna advertised in /models but not accessible via /chat/completions**](https://github.com/github/copilot-cli/issues/4337)  
   The model is listed in the Models API but only works through `/responses`, not the OpenAI-compatible `/chat/completions` endpoint. This breaks MoA/aggregator tooling and creates significant API-surface inconsistency. Newly filed, no comments yet.

3. [**#4336 — Cancelled user input is still delivered to the agent and processed as a valid turn**](https://github.com/github/copilot-cli/issues/4336)  
   In autopilot mode, cancelling a queued input does not discard it; it later reappears in a subsequent message block with the original timestamp. This is a correctness and safety issue for unattended workflows.

4. [**#4335 — [ACP] toolCall.title contains high-level summary instead of executable command**](https://github.com/github/copilot-cli/issues/4335)  
   ACP clients like Zed show approval modals with natural-language summaries, hiding the actual shell command that will be executed. This reduces approval transparency and makes secure review difficult.

5. [**#4334 — Stashed (`ctrl+S`) prompt discarded on session switch**](https://github.com/github/copilot-cli/issues/4334)  
   Draft input stashed with `ctrl+S` is lost after switching sessions; popping it later restores nothing. A session-state persistence bug that interrupts common multi-session workflows.

6. [**#4332 — Provide a way to silence the once-per-session "Memory is disabled" notice**](https://github.com/github/copilot-cli/issues/4332)  
   Users with `"memory": false` get a one-line notice every session with no supported way to turn it off. A small configurability request, but recurring for users who intentionally disable memory.

7. [**#4329 — Autopilot is not enabled when resuming a session that had autopilot enabled**](https://github.com/github/copilot-cli/issues/4329)  
   The statusline shows autopilot as enabled, but actions requiring approval fail after session resume. This false-positive state is especially risky for automation and affects version 1.0.77.

8. [**#4229 — Trust module**](https://github.com/github/copilot-cli/issues/4229)  
   An open issue referencing `install.sh`, likely requesting installer trust/verification. The report is sparse and needs clarification, but it touches on supply-chain security concerns for teams pinning CLI installations.

9. [**#4328 — Ctrl+H misinterpreted as Ctrl+Backspace under WSL2**](https://github.com/github/copilot-cli/issues/4328)  
   `WT_SESSION` leaking from Windows Terminal causes WSL2 to treat `ctrl+h` as delete-word rather than delete-previous-character. A platform-specific input bug affecting Windows/WSL2 users.

10. [**#4292 — Colors are completely off in tmux**](https://github.com/github/copilot-cli/issues/4292)  
    Light theme colors render incorrectly inside tmux, while the same session outside tmux works. A terminal-rendering compatibility issue that affects tmux-heavy developers.

## Key PR Progress
No pull requests were updated in the last 24 hours, so there are no merged or in-progress PR changes to report.

## Feature Request Trends

- **Session persistence**: Users expect interactive state — stashed prompts, autopilot mode, queued input — to survive session switches and resumes.  
  Relevant: [#4334](https://github.com/github/copilot-cli/issues/4334), [#4329](https://github.com/github/copilot-cli/issues/4329), [#4336](https://github.com/github/copilot-cli/issues/4336)

- **Terminal/environment compatibility**: Demand for correct input handling under WSL2/Windows Terminal and proper tmux color rendering.  
  Relevant: [#4328](https://github.com/github/copilot-cli/issues/4328), [#4292](https://github.com/github/copilot-cli/issues/4292)

- **ACP/approval transparency**: ACP tool calls should expose the real shell command in `toolCall.title`, not a high-level summary, so approval workflows remain auditable.  
  Relevant: [#4335](https://github.com/github/copilot-cli/issues/4335)

- **API surface consistency**: All advertised models should work through the standard OpenAI-compatible `/chat/completions` endpoint.  
  Relevant: [#4337](https://github.com/github/copilot-cli/issues/4337)

- **Configurability / low-noise UX**: Users want a supported way to suppress informational notices like `Memory is disabled.`  
  Relevant: [#4332](https://github.com/github/copilot-cli/issues/4332)

- **Trust/security verification**: Installer trust/verification appears to be an emerging concern, though the current report needs more detail.  
  Relevant: [#4229](https://github.com/github/copilot-cli/issues/4229)

## Developer Pain Points

- **Regression-prone tooling**: [#4202](https://github.com/github/copilot-cli/issues/4202) shows a built-in tool breaking between patch versions (1.0.71 → 1.0.73) with no clear cause, forcing teams to pin versions.

- **Autopilot safety**: [#4336](https://github.com/github/copilot-cli/issues/4336) and [#4329](https://github.com/github/copilot-cli/issues/4329) show that cancelled input and session resume can leave autopilot in an unpredictable or falsely enabled state.

- **Approval transparency**: [#4335](https://github.com/github/copilot-cli/issues/4335) hides shell commands behind summaries in ACP approval modals, making safe human review difficult.

- **Environment-specific behavior**: WSL2 key leakage ([#4328](https://github.com/github/copilot-cli/issues/4328)) and tmux color failures ([#4292](https://github.com/github/copilot-cli/issues/4292)) create inconsistent experiences depending on terminal setup.

- **Model API drift**: Advertised models that fail on `/chat/completions` ([#4337](https://github.com/github/copilot-cli/issues/4337)) make it hard to build reliable clients and aggregator tooling on the Copilot Models API.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI Community Digest — 2026-08-03

## Today’s Highlights
No new releases landed in the past 24 hours, but community momentum continues around two long-running feature requests: persistent session memory (#1283) and remote session control (#1282). A notable PR adding a per-line streaming `Monitor` tool was closed, and new issues highlight swarm batch reliability as an emerging pain point.

## Releases
None in the last 24 hours.

## Hot Issues
Only 4 issues were updated in the last 24 hours; all are listed below.

- [#1283 [enhancement] Feature Request: Memory System - Persistent context across sessions](https://github.com/MoonshotAI/kimi-cli/issues/1283)  
  Proposes automatic and manual memory so the CLI retains project context, patterns, and user preferences across sessions. With 14 comments, this remains a strongly discussed quality-of-life feature, though it has no 👍 yet.

- [#1282 [enhancement] Feature Request: Remote Control - Continue local sessions from any device](https://github.com/MoonshotAI/kimi-cli/issues/1282)  
  Wants to let users resume local interactive sessions from phone/browser/tablet. The 24 👍 show clear demand for workflow continuity beyond the desktop.

- [#2579 Feature request: external wake channel for running interactive sessions](https://github.com/MoonshotAI/kimi-cli/issues/2579)  
  Requests an external event/wake mechanism so other agents can trigger actions in a running TUI session, e.g. via an “agent mail” inbox directory. This points toward agentic integration and event-driven workflows.

- [#2578 [swarm] 403/timeout mid-batch: partial work lost, resume re-spends tokens, broken tree blocks others](https://github.com/MoonshotAI/kimi-cli/issues/2578)  
  Reports a serious reliability issue: parallel subagents killed by quota errors or timeouts leave half-written state, force token re-spending on resume, and can break the workspace tree for other agents. High severity for swarm users.

## Key PR Progress
Only 1 PR was updated in the last 24 hours.

- [#2471 feat(tools): add Monitor tool for per-line stdout streaming](https://github.com/MoonshotAI/kimi-cli/pull/2471) — **CLOSED**  
  Adds a `Monitor` tool as a streaming counterpart to the existing background-task tooling. It was opened as a feature proposal without a prior issue; the closure status means maintainers have likely made a decision, but the feature direction remains relevant for observability and long-running task supervision.

## Feature Request Trends
Across the current issues, the community is pushing toward:

- **Persistence & memory** — remember context, patterns, and preferences across sessions (#1283).
- **Remote/anywhere access** — continue local sessions from other devices (#1282).
- **External event-driven control** — let other agents or systems wake/notify a running CLI session (#2579).
- **Better streaming/observability** — per-line stdout monitoring for background tasks (PR #2471).

The recurring theme is making Kimi Code CLI a more autonomous, persistent, and integrable agent runtime rather than a purely interactive terminal tool.

## Developer Pain Points
- **Swarm reliability under quota/timeout failures** (#2578): partial work is lost, resumes burn tokens on already-done work, and broken workspace trees can block parallel agents. This is a critical resilience gap for batch/parallel workflows.
- **Context loss between sessions** (#1283): developers must re-explain project state and preferences, slowing long-running work.
- **Session immobility** (#1282): being tied to one machine interrupts workflows when moving between desk and mobile.
- **Lack of external integration** (#2579): the TUI is effectively isolated; users want an event-driven channel for multi-agent orchestration.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

## Today's Highlights

No new release shipped in the last 24 hours, but the project remains very active: a long-requested `chat.model` plugin hook is now in PR, and persistence/desktop reliability continues to be a major focus. Meanwhile, a recent incident report shows `grok-4.5` on OpenCode Go has been failing since August 2, and several Windows/TUI interruption bugs are drawing repeated community attention.

## Releases

No new releases in the last 24 hours.

## Hot Issues

- [grok-4.5 on opencode go not working since 2 Aug #40206](https://github.com/anomalyco/opencode/issues/40206)  
  Fresh open incident: `grok-4.5` calls via OpenCode Go return 500 errors. High visibility because it affects a currently shipped model path.

- [Conversation history too large to compact - exceeds model context limit #40196](https://github.com/anomalyco/opencode/issues/40196)  
  User reports the context-limit compaction error even in a brand-new session, suggesting a possible regression in context accounting.

- [Crash at start #28996](https://github.com/anomalyco/opencode/issues/28996)  
  14 comments. OpenCode crashes the WezTerm terminal on Debian testing for some users. Has been open for a while but still receiving attention.

- [桌面版 Agent 下拉菜单不显示插件加载的 Agents #25948](https://github.com/anomalyco/opencode/issues/25948)  
  14 comments. Desktop app loads plugin agents successfully but they are missing from the agent dropdown. Important plugin-visibility issue for Windows desktop users.

- [[FEATURE]: add chat.model plugin hook for pre-call model routing #18793](https://github.com/anomalyco/opencode/issues/18793)  
  10 comments, 6 👍. One of the most-requested plugin extensions: let plugins change provider/model before an LLM call. Now has a corresponding open PR.

- [[FEATURE]: Add CommandCode as a Provider #26338](https://github.com/anomalyco/opencode/issues/26338)  
  8 comments, 30 👍. The highest-upvoted issue in this batch. Users want `commandcode.ai` supported as a first-class provider.

- [Add macOS-friendly clipboard fallback #12800](https://github.com/anomalyco/opencode/issues/12800)  
  8 comments, 8 👍. macOS clipboard support never activates because only `xclip` is detected. Community wants `pbcopy` fallback.

- [[Kimi K2.6] reasoning_content is missing in assistant tool call messages #29619](https://github.com/anomalyco/opencode/issues/29619)  
  7 comments. Tool calls fail when thinking is enabled on Moonshot AI / Kimi K2.6 because `reasoning_content` is missing.

- [TUI double-ESC loops and Desktop stop button fails to interrupt #24217](https://github.com/anomalyco/opencode/issues/24217)  
  6 comments. Windows users report ESC loops in the TUI and an unresponsive stop button in Desktop, especially with DeepSeek V4.

- [Session title generation fails silently since v1.3.3 #20269](https://github.com/anomalyco/opencode/issues/20269)  
  5 comments, 3 👍. An `effort` parameter is leaking into the small model call, so sessions never get generated titles.

## Key PR Progress

- [feat(plugin): add request-scoped chat.model hook #40188](https://github.com/anomalyco/opencode/pull/40188)  
  Adds the long-awaited `chat.model` plugin hook for per-request model replacement. Closes #18793 and makes progress on #24006.

- [fix(app): persist prompt drafts without base64 #40207](https://github.com/anomalyco/opencode/pull/40207)  
  Moves prompt drafts/history to a dedicated store using SQLite WAL and content-addressed blobs; avoids base64 persistence.

- [fix(app): eliminate persistence write amplification #40197](https://github.com/anomalyco/opencode/pull/40197)  
  Replaces setter-coupled persisted writes with a shared repository and a fixed 500ms checkpoint deadline.

- [feat: add OPENCODE_AIRGAP to disable automatic internet access #39994](https://github.com/anomalyco/opencode/pull/39994)  
  Adds a single kill switch for air-gapped/intranet deployments, referenced from #18233 and #37888.

- [feat(opencode): Allow per-MCP-server trust configuration #40125](https://github.com/anomalyco/opencode/pull/40125)  
  Addresses several long-running MCP permission/trust issues by allowing per-server trust decisions.

- [fix(opencode): match canonically equivalent Unicode in patches #40198](https://github.com/anomalyco/opencode/pull/40198)  
  Fixes patch verification failures caused by Unicode normalization differences in files.

- [fix(opencode): handle removed OpenAI OAuth auth #40199](https://github.com/anomalyco/opencode/pull/40199)  
  Handles the mid-session OpenAI OAuth removal race in the Codex fetch wrapper, with a regression test.

- [fix(tui): let the prompt Down arrow reach the end of the text #40163](https://github.com/anomalyco/opencode/pull/40163)  
  Fixes cursor navigation behavior where `cursorOffset` measurement in display columns prevented reaching the end of multiline prompt text.

- [feat(tui): add spinnerVerbs config to customize TUI spinner text #40030](https://github.com/anomalyco/opencode/pull/40030)  
  Adds a `spinner_verbs` option in `.opencode/tui.json`, closing #19401.

- [fix(app): search every known project in the open project dialog #40202](https://github.com/anomalyco/opencode/pull/40202)  
  Fixes project search only covering the five most recent projects; closes #39142.

## Feature Request Trends

- **Plugin-driven model routing**  
  Users repeatedly request plugin hooks to select models dynamically based on request context or complexity.  
  See #18793, #18844, #24006.

- **Configurable discovery paths for commands/agents/skills**  
  Commands and agents should support custom search paths just like skills.  
  See #14240, #27972.

- **More provider flexibility**  
  Requests include new providers like CommandCode and the ability to alias custom models to official models.dev definitions.  
  See #26338, #30519.

- **Better session and project management**  
  Community wants readable auto-named projects, session rename in Desktop, and reliable persistence of project metadata.  
  See #30535, #16677, #24744.

- **Platform parity for clipboard and input**  
  macOS needs `pbcopy` fallback; Windows needs working Ctrl+C/Ctrl+V in the TUI.  
  See #12800, #12595.

- **Air-gap and trust controls**  
  Users want explicit offline mode and per-MCP-server trust configuration rather than broad global prompts.  
  See #39994, #40125.

## Developer Pain Points

- **Windows input and interruption bugs keep recurring**  
  Ctrl+C/Ctrl+V issues, ESC loops, unresponsive stop buttons, and permission prompt loops are common on Windows.  
  See #12595, #24217, #30136.

- **Plugin-loaded content is not always visible or synchronized**  
  Desktop agent dropdowns miss loaded agents, and cross-instance agent messages do not update the TUI in real time.  
  See #25948, #22588.

- **Model/provider compatibility friction**  
  Users hit provider-specific failures such as Kimi `reasoning_content` errors and Grok 500s, often with little visibility into the cause.  
  See #29619, #40206.

- **Context and session handling remains fragile**  
  Unexpected context-limit errors, silently failing session titles, and review panels showing incorrect diffs create trust issues.  
  See #40196, #20269, #30357.

- **Desktop/UI polish gaps**  
  Markdown headings render as bold, project edit dialogs don’t persist, and panel resizing breaks at small window sizes.  
  See #16046, #24744, #30560.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-08-03

## Today's Highlights

Qwen Code published a new nightly (`v0.21.3-nightly.20260803`) with an improved TUI keyboard shortcut reference and a core history-pagination fix. Session reliability is the dominant theme on the issue tracker, with P1/P2 reports around Windows desktop session loss, concurrent transcript writers, and OpenAI-compatible abort handling all receiving focused follow-up. At the same time, daemon/serve architecture and Web Shell workflow safety continue to attract the heaviest PR activity.

## Releases

- **v0.21.3-nightly.20260803.e1e5b42ce** — [Release](https://github.com/QwenLM/qwen-code/releases/tag/v0.21.3-nightly.20260803.e1e5b42ce)
  - `docs`: complete TUI keyboard shortcut reference ([#8327](https://github.com/QwenLM/qwen-code/pull/8327))
  - `fix(core)`: unblock history pagination on o… (release notes truncated)

## Hot Issues

1. **#4156 — `qwen --serve` Mode A: TUI + in-process HTTP daemon proposal**  
   [Issue #4156](https://github.com/QwenLM/qwen-code/issues/4156) · Closed · 7 comments  
   A 3-phase plan to let a TUI process and daemon coexist, consolidating the serve architecture. Community interest is high because it would unify local interactive use with remote/HTTP access.

2. **#7306 — Harden tool-output budgeting, observability, and artifact lifecycle**  
   [Issue #7306](https://github.com/QwenLM/qwen-code/issues/7306) · Open · 5 comments  
   Phase 1 is complete, but broader lifecycle hardening still needs discussion. Important for agent correctness and resource control.

3. **#8123 — Desktop client cannot reference existing files with `@`**  
   [Issue #8123](https://github.com/QwenLM/qwen-code/issues/8123) · Open · 5 comments  
   The desktop client fails to find `KuaiShouOrderService.java` via `@`-reference, breaking a core IDE-style workflow. Particularly impactful for Java projects.

4. **#8400 — Windows sessions silently auto-deleted after restart**  
   [Issue #8400](https://github.com/QwenLM/qwen-code/issues/8400) · Open · 2 comments · P1  
   After app restart, all sessions disappear because ACP session/load fails with a workspace `cwd` mismatch and the app auto-deletes local mirrors. High-severity data-loss bug.

5. **#7164 — Concurrent session writers can fork transcript history**  
   [Issue #7164](https://github.com/QwenLM/qwen-code/issues/7164) · Open · 2 comments · P1  
   Two processes restoring the same session can write divergent JSONL parent chains, hiding responses and breaking recovery on restart.

6. **#8411 — Caller-supplied session IDs not coordinated across daemon transports**  
   [Issue #8411](https://github.com/QwenLM/qwen-code/issues/8411) · Open · 2 comments · P2  
   `POST /session` supports caller-supplied IDs, but duplicate checks are route-local. Needs daemon-wide coordination across transports and workspaces.

7. **#8382 — Duplicate provider tool call id**  
   [Issue #8382](https://github.com/QwenLM/qwen-code/issues/8382) · Open · 3 comments · P2  
   Users frequently hit “Duplicate provider tool call id” and “not recorded” errors, causing sessions to fail mid-task.

8. **#8398 — `isAbortError` misses OpenAI SDK `APIUserAbortError`**  
   [Issue #8398](https://github.com/QwenLM/qwen-code/issues/8398) · Open · 2 comments · P2  
   On the common `auth_type=openai` path, user cancellations are misclassified as real errors. Related: [Issue #8356](https://github.com/QwenLM/qwen-code/issues/8356).

9. **#8376 — Change process name from `node.exe` to `qwen.exe`**  
   [Issue #8376](https://github.com/QwenLM/qwen-code/issues/8376) · Open · 4 comments · P3  
   External tools need a reliable process identity. Renaming to `qwen-code` on Windows/macOS/Linux would remove heuristic-based detection.

10. **#8281 — Add Email channel with IMAP and SMTP support**  
    [Issue #8281](https://github.com/QwenLM/qwen-code/issues/8281) · Open · 4 comments  
    Proposal for an official email channel so agents can communicate via a dedicated mailbox. Signals growing demand for agent integrations beyond CLI/desktop.

## Key PR Progress

1. **#8213 — Establish workspace runtime ownership**  
   [PR #8213](https://github.com/QwenLM/qwen-code/pull/8213)  
   Introduces `WorkspaceRuntime` as the ownership boundary for ACP child lifecycles, with runtime snapshots, workspace-scoped epochs, work leases, and bounded startup/teardown. A major serve-architecture improvement.

2. **#8415 — Coordinate caller-supplied session IDs**  
   [PR #8415](https://github.com/QwenLM/qwen-code/pull/8415)  
   Directly addresses [Issue #8411](https://github.com/QwenLM/qwen-code/issues/8411) by making session ID handling consistent across daemon transports and workspace generations.

3. **#8393 — Bind plan approval to its Todo revision**  
   [PR #8393](https://github.com/QwenLM/qwen-code/pull/8393)  
   `exit_plan_mode` approvals now carry the exact Todo plan ID and source tool-call ID, preventing WebShell from approving stale or mismatched plans.

4. **#8125 — Add required external tool guard provider**  
   [PR #8125](https://github.com/QwenLM/qwen-code/pull/8125)  
   Adds an opt-in pre-execution policy provider for managed `qwen serve` ACP deployments. Enables authenticated external guardrails for tool execution.

5. **#8399 — Recognize OpenAI SDK `APIUserAbortError` as an abort**  
   [PR #8399](https://github.com/QwenLM/qwen-code/pull/8399)  
   Fixes the `isAbortError` gap on OpenAI-compatible providers, so user cancellations are handled correctly instead of surfacing as failures.

6. **#8401 — Add declarative repository-context manifest**  
   [PR #8401](https://github.com/QwenLM/qwen-code/pull/8401)  
   Repositories can provide `.qwen/review-context.json` to make the review pipeline repository-aware without hardcoding repo-specific logic.

7. **#8416 — Scope review build/test to Maven modules and load CLAUDE.md rules**  
   [PR #8416](https://github.com/QwenLM/qwen-code/pull/8416)  
   Extends `/review` to Maven multi-module monorepos, mapping changed files to modules and loading project rules from `CLAUDE.md`.

8. **#7734 — Probe sandbox runtime before selecting it**  
   [PR #7734](https://github.com/QwenLM/qwen-code/pull/7734)  
   Sandbox runtime candidates are now verified with a `version` probe before becoming the active runtime, reducing false assumptions about PATH availability.

9. **#8171 — Configure background agent turn limits**  
   [PR #8171](https://github.com/QwenLM/qwen-code/pull/8171)  
   Adds a shared `memory.agentMaxTurns` setting for extraction, dream, remember, and skill-review agents, with `0` disabling the limit.

10. **#8350 — Support trusted private ASR base URLs**  
    [PR #8350](https://github.com/QwenLM/qwen-code/pull/8350)  
    Adds an exact allowlist for voice provider base URLs, letting managed deployments use private/HTTP ASR gateways while keeping the default deny behavior.

## Feature Request Trends

- **Daemon/serve as the central platform**  
  The strongest direction is making `qwen serve` a full interactive platform: TUI + daemon coexistence ([#4156](https://github.com/QwenLM/qwen-code/issues/4156)), workspace runtime ownership ([#8213](https://github.com/QwenLM/qwen-code/pull/8213)), external tool guards ([#8125](https://github.com/QwenLM/qwen-code/pull/8125)), and Plan & Review for daemon sessions ([#8389](https://github.com/QwenLM/qwen-code/issues/8389)).

- **External integrations and channels**  
  Users are requesting agent-facing communication and deployment integrations: email via IMAP/SMTP ([#8281](https://github.com/QwenLM/qwen-code/issues/8281)) and safe cloud deployment workflows ([#8291](https://github.com/QwenLM/qwen-code/issues/8291)).

- **Cross-runtime consistency**  
  Multiple requests target parity and consistency across TUI, Desktop, Web Shell, and CLI: Web Shell image drag-and-drop ([#8321](https://github.com/QwenLM/qwen-code/issues/8321)), voice address guard parity ([#8361](https://github.com/QwenLM/qwen-code/issues/8361)), and unified UI polish ([#7278](https://github.com/QwenLM/qwen-code/issues/7278)).

- **Smarter CI/review automation**  
  Repo-hygiene automation ([#7383](https://github.com/QwenLM/qwen-code/issues/7383)), declarative review context ([#8401](https://github.com/QwenLM/qwen-code/pull/8401)), and Maven-aware review builds ([#8416](https://github.com/QwenLM/qwen-code/pull/8416)) all point toward reducing maintainer overhead.

## Developer Pain Points

- **Session data loss and corruption**  
  Windows desktop sessions silently disappearing ([#8400](https://github.com/QwenLM/qwen-code/issues/8400)), concurrent session writers forking transcripts ([#7164](https://github.com/QwenLM/qwen-code/issues/7164)), and duplicate provider tool call IDs ([#8382](https://github.com/QwenLM/qwen-code/issues/8382)) are the most serious recurring issues.

- **OpenAI-compatible provider edge cases**  
  `APIUserAbortError` is misclassified ([#8398](https://github.com/QwenLM/qwen-code/issues/8398)), aborting can stop transcript persistence ([#8356](https://github.com/QwenLM/qwen-code/issues/8356)), and models dropping function-calling format can leak JSON as plain text ([#8207](https://github.com/QwenLM/qwen-code/issues/8207)).

- **Desktop and Windows friction**  
  `@`-file references fail on desktop ([#8123](https://github.com/QwenLM/qwen-code/issues/8123)), ConEmu/Cmder flickers with `node.exe` ([#8385](https://github.com/QwenLM/qwen-code/issues/8385)), and process identification is unreliable ([#8376](https://github.com/QwenLM/qwen-code/issues/8376)).

- **CI/autofix friction**  
  AutoFix can skip defects in otherwise approved reviews ([#8358](https://github.com/QwenLM/qwen-code/issues/8358)), main-branch CI can fail before tests report ([#8375](https://github.com/QwenLM/qwen-code/issues/8375)), and stale self-hosted runners require reconciliation ([#8371](https://github.com/QwenLM/qwen-code/issues/8371)).

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar).*