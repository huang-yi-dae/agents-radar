# AI CLI Tools Community Digest 2026-08-13

> Generated: 2026-08-13 01:42 UTC | Tools covered: 7

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

# Cross-Tool AI CLI Ecosystem Comparison Report

**Date:** 2026-08-13

---

## 1. Ecosystem Overview

The AI CLI tool landscape is in a phase of rapid maturation marked by a clear shift from feature experimentation toward reliability engineering. Across all five major tools (Claude Code, OpenAI Codex, Gemini CLI, GitHub Copilot CLI, Kimi Code, OpenCode, and Qwen Code), community attention is dominated by production-critical concerns: session state durability, context/cache invalidation costs, subagent coordination failures, MCP server lifecycle fragility, and silent configuration failures. A significant portion of reported issues centers on regressions introduced by rapid release cycles, indicating that velocity is often outpacing quality assurance. Cross-cutting themes of memory persistence, granular permission controls, and enterprise authentication friction suggest the tools are converging on similar roadmaps as they compete for the same daily-driver developer workflows.

---

## 2. Activity Comparison

| Tool | Hot Issues (Active) | Key PRs (Last 24h) | Release Status | Most-Reacted Issue |
|---|---|---|---|---|
| **Claude Code** | 10 tracked (80 comments max) | 5 (2 closed, 3 open) | v2.1.229 shipped | Linux desktop request (498 👍, closed) |
| **OpenAI Codex** | 10 tracked (83 comments max) | 10 merged (copyberry bot) | None in 24h (latest 26.803.x) | macOS syspolicyd/trustd leak (392 👍) |
| **Gemini CLI** | 10 tracked (12 comments max on P1) | 10 (5 security-critical merged) | v0.56.0-nightly | Generalist agent hang (8 👍, P1) |
| **GitHub Copilot CLI** | 10 tracked (35 👍 max) | 3 (1 meaningful) | None (latest 1.0.79) | CIMD OAuth support (35 👍) |
| **Kimi Code** | 10 tracked (36 comments max) | 10 (open, varied) | None | Memory System (36 comments) |
| **OpenCode** | 10 tracked (40 comments max) | 10 (mix of merged/closed) | v1.18.18 shipped | Zen billing confusion (40 comments) |
| **Qwen Code** | 11 tracked (10 comments max) | 11 (all merged or in review) | desktop-v0.2.1 shipped | Auto-memory recall RFC (10 comments) |

---

## 3. Shared Feature Directions

The following requirements appear across multiple tool communities:

| Need | Tools | Specific Ask |
|---|---|---|
| **Persistent memory / context across sessions** | Kimi (#1283), Qwen (#7040), Copilot (#4441), OpenCode (budget caps) | AI-managed and explicit memory; recall reliability with telemetry; durable compaction that is not recursively lossy |
| **Granular permission controls** | Copilot, OpenCode (#28689, #17073), Gemini (sandboxing) | Finer-grained deny rules (globstar, per-MCP-server trust); zero-dependency OS sandboxing for bash |
| **MCP lifecycle hardening** | Copilot (#4464, #4466), Gemini (#28794, #28787), OpenCode (#33027) | OAuth refresh fixes, retry on transient 5xx, fail-closed config parsing, tool registration reliability |
| **Subagent coordination & state visibility** | Claude (#54393, #86082), Gemini (#22323, #21409), Qwen (#8097), Copilot (#4467) | No false GOAL success; no hangs; state indicators (sleeping/blocked); no duplicate work; event-store exhaustion prevention |
| **Model routing / config reliability** | Copilot (#4432, #4457), Claude (#82326), OpenCode (#3832) | Explicit model overrides honored; no silent downgrades; no hallucination regressions across model versions |
| **IDE / Desktop context reliability** | Codex (#31553, #34920, #35419), Gemini (#28789) | IDE context auto-attach in remote/WSL2; no RPC serialization errors; stable desktop app on all platforms |
| **Windows platform parity** | Codex (#25178, #26990), Claude (#81698), Copilot (#4328) | GPU crash fixes; crash-safe local state; Computer Use screenshot fixes; input keybinding fixes |

---

## 4. Differentiation Analysis

| Tool | Feature Focus | Target User | Technical Approach |
|---|---|---|---|
| **Claude Code** | Enterprise/org governance; plugin ecosystem; cross-machine session continuity (MEP) | Professional developers in org settings | Hook-based extensibility; remote-control sessions; server-supplied hooks |
| **OpenAI Codex** | IDE integration depth; Enterprise usage metering; gRPC infrastructure | VS Code/remote users; enterprise | gRPC code-mode hosts; per-thread usage tracking; app-server architecture |
| **Gemini CLI** | Security hardening; subagent architecture; model-native skills | Users needing strong safety defaults | OS sandboxing proposals; aggressive SSRF/CVE fixes; eval-driven validation |
| **GitHub Copilot CLI** | GitHub-native workflow; MCP ecosystem; org policy | GitHub-centric developer teams | Tight GitHub integration; pull_request_target removal; hooks system |
| **Kimi Code** | Memory system; OpenAI-compatible endpoints; CJK character handling | International users; enterprise proxies | `--prompt-file` support; NDJSON streaming; aiohttp migration |
| **OpenCode** | Billing/entitlement clarity; permission model depth; TUI polish | Cost-conscious independents and startups | Per-session budget caps; wildcard permission semantics; MERGE gateway variants |
| **Qwen Code** | Memory recall reliability; daemon/session robustness; multi-agent workflows | Long-running automation; headless users | Live-journal caps; session rotation bounds; SDK permission alignment |

---

## 5. Community Momentum & Maturity

**Highest momentum (rapid iteration):** OpenCode (two patch releases in 24h) and Qwen Code (two desktop releases + 11 PRs in review). These tools are shipping fast and actively triaging issues, with many closed in the same day they are filed.

**Most community engagement (high comment volume):** OpenAI Codex (83 comments on the macOS leak issue is the highest single-thread count) and Claude Code (the Linux desktop request accumulated 498 👍). These tools have the largest installed base and accordingly the loudest feedback loops.

**Security-driven velocity:** Gemini CLI is merging security fixes at the fastest rate (SSRF, command injection, MCP fail-open) — a signal that its maintainers prioritize trust hardening over feature velocity this cycle.

**Stability concerns across mature tools:** Claude Code and Codex both show regression clusters (prompt-cache invalidation, IDE context drops) typically associated with high release cadence. Copilot CLI shows the most staleness — no releases in 24h and a long tail of unresolved P1s (sessionStart hook open since February).

---

## 6. Trend Signals

1. **Memory is the new battleground.** Every tool now has a memory-relat­ed initiative (Kimi #1283, Qwen #7040, Copilot #4441, OpenCode budget caps). Expect persistent context to become table stakes within two quarters.

2. **Subagent trust is the top reliability gap.** False-success reporting (Gemini #22323), indefinite hangs (Gemini #21409, Qwen #8963), and event-store exhaustion (Copilot #4467) all erode user trust in autonomous multi-agent runs. This is the sector's biggest unsolved reliability problem.

3. **Configuration that silently does nothing is unacceptable.** Users are increasingly intolerant of settings that appear to work but are ignored: `/plugin update` not invalidating caches (Claude #14061), model overrides dropped (Copilot #4432), `truncateToolOutputThreshold` ignored (Qwen #8922). Expect pressure for runtime verification and telemetry of config effectiveness.

4. **Windows remains the neglected platform.** Across Codex, Claude, and Copilot, Windows users report disproportio­nate crash rates, GPU process failures, and durability bugs. Tools that invest in Windows parity will capture underserved enterprise developers.

5. **Cost observability is becoming a feature.** Per-thread usage tracking (Codex #38281), per-session budget caps (OpenCode #42202), and complaints about prompt-cache invalidation costs (Claude #86244) indicate users want financial control surfaces as first-class features.

6. **Enterprise authentication is fragmented.** Each tool has a distinct auth gap (Codex ADC issues, Copilot GITHUB_TOKEN in Actions, Gemini SSRF on auth endpoints, Kimi missing OpenAI-compatible endpoints). Unified, standards-based auth remains an open opportunity.

**Bottom line:** The ecosystem is converging on memory persistence, subagent reliability, and configuration trust as the next differentiators. Tools that ship stable foundations over rapid feature additions will win the daily-driver loyalty of professional developers.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report

**Data as of 2026-08-13 | Source: github.com/anthropics/skills**

---

## 1. Top Skills Ranking

The community is actively discussing the following Skill proposals and fixes:

### 1. skill-creator — run_eval.py Fix
**[PR #1298](https://github.com/anthropics/skills/pull/1298) | Open**

**Skill/Scope:** Repair for the skill-creator's internal evaluation loop. The PR fixes `run_eval.py`, which currently reports `recall=0%` for every skill description, making the description-optimization loop optimize against pure noise.

**Discussion:** The `run_eval.py` defect is the highest-urgency community issue, with 10+ independent reproductions (#556). The fix includes installing the eval artifact as a real skill, Windows stream-reading, trigger detection, and parallel workers.

**Status:** Open. A second, near-duplicate PR ([#1099](https://github.com/anthropics/skills/pull/1099)) addresses the Windows-only crash symptom; a third ([#1050](https://github.com/anthropics/skills/pull/1050)) fixes Windows subprocess + encoding bugs. The three together constitute a critical repair cluster for the skill development toolchain.

### 2. document-typography
**[PR #514](https://github.com/anthropics/skills/pull/514) | Open**

**Skill/Scope:** Typographic quality control for AI-generated documents. Prevents orphan-word wrapping, stranded widow paragraphs, and numbering misalignment in every generated document.

**Discussion:** Addresses a universal pain point — typographic issues affect every generated document. Low comment volume but high practical applicability.

**Status:** Open since March 2026.

### 3. ODT — OpenDocument Skill
**[PR #486](https://github.com/anthropics/skills/pull/486) | Open**

**Skill/Scope:** Creation, reading, conversion, and template-filling for OpenDocument Format files (.odt, .ods) via LibreOffice.

**Discussion:** Extends the document-format family (docx, pdf, pptx) to the open-source ISO-standard format family. Notably, it also enables parse ODT → HTML conversion.

**Status:** Open since March 2026.

### 4. Self-audit — Verification + Reasoning Quality Gate
**[PR #1367](https://github.com/anthropics/skills/pull/1367) | Open**

**Skill/Scope:** A result-validation skill that runs mechanical file verification first, then a four-dimension reasoning audit in damage-severity priority order, before delivery of any AI output.

**Discussion:** Related proposal #1385 ("Reasoning Quality Gate Pipeline") frames it as part of a three-gate pipeline: pre-task calibration → adversarial review → delivery verification. The author has committed to a v1.3.0 iteration cycle, suggesting active development.

**Status:** Open; actively iterating.

### 5. ServiceNow Platform Skill
**[PR #568](https://github.com/anthropics/skills/pull/568) | Open**

**Skill/Scope:** Broad ServiceNow platform assistant covering ITSM, ITOM, ITAM/SAM Pro, FSM, HRSD, CSM, SPM/PPM, Vulnerability Response, and Security Incident Response, plus IntegrationHub scripting.

**Discussion:** Largest enterprise-vertical skill proposal in the current review queue. Emphasizes platform breadth over narrow scripting helpers.

**Status:** Open since March 2026; still active as of August 2026 — suggesting sustained maintainer interest.

### 6. testing-patterns
**[PR #723](https://github.com/anthropics/skills/pull/723) | Open**

**Skill/Scope:** Comprehensive testing skill covering the Testing Trophy model, AAA unit-test patterns, React component testing, and test-writing philosophy.

**Discussion:** Directly addresses the code-generation quality bottleneck — teaching Claude when to test and what not to test.

**Status:** Open since March 2026.

### 7. pyxel — Retro Game Development
**[PR #525](https://github.com/anthropics/skills/pull/525) | Open**

**Skill/Scope:** Skill wrapping the pyxel-mcp server for the Pyxel retro/pixel-art/8-bit game engine. Covers the write → run-and-capture → inspect → iterate workflow.

**Discussion:** Notable as one of the few MCP-paired skills submitted by the MCP author himself (kitao), setting a pattern for first-party skill ownership.

**Status:** Open since March 2026; updated as recently as July 2026.

---

## 2. Community Demand Trends

The Issues feed reveals these concentrated demand areas:

### 1. Skills Development Toolchain Repair
The most severe pain is in the skill-*creator* tooling itself. [#556](https://github.com/anthropics/skills/issues/556) — `run_eval.py` triggers zero skills across all queries — directly defeats the description-optimization feedback loop. The **community is investing more attention in fixing the toolchain that creates skills** than in the skills themselves. Windows subprocess handling is a second-order, cross-cutting defect.

### 2. Trust & Security Governance
[Issue #492](https://github.com/anthropics/skills/issues/492) (43 comments, 2 👍) alleges that community skills distributed under the `anthropic/` namespace enable **trust boundary abuse** — users grant elevated permissions to community-written skills thinking they are official Anthropic code. This is the single most-commented issue in the repository and touches both distribution and permissioning.

### 3. Org-Wide Sharing, Distribution & Duplication
[#228](https://github.com/anthropics/skills/issues/228) (16 comments, 8 👍) calls for native organizational skill sharing (direct links / shared library) instead of manual file-transfer. Related defect [#189](https://github.com/anthropics/skills/issues/189) reports that `document-skills` and `example-skills` plugins install *identical* skill content, bloating the context window with duplicates. The theme: **distribution and deduplication are unresolved.**

### 4. Memory / State Management
[#1329](https://github.com/anthropics/skills/issues/1329) proposes **compact-memory** — a symbolic notation skill for compact agent state, cutting the context spent on prose notes in long-running agents. Signals demand for **long-horizon memory efficiency**.

### 5. Context-Window Budget Discipline
[#1487](https://github.com/anthropics/skills/issues/1487) reports the bundled `claude-api` skill eagerly injects ~156k tokens, exhausting the context window in a single tool call. Together with the duplicate-skill complaint (#189), the community is flagging **context-window waste as a failure mode of the skills system itself**.

---

## 3. High-Potential Pending Skills

Active PRs that may land imminently:

| Skill | PR | Notes |
|---|---|---|
| **self-audit** | [#1367](https://github.com/anthropics/skills/pull/1367) | Author iterated to v1.3.0 within days; matching proposal #1385. Most active development cadence in the queue. |
| **plan-file-hygiene** | [#1479](https://github.com/anthropics/skills/pull/1479) | Addresses issue #1417 — planning artifacts accumulate with no lifecycle. Direct issue-to-PR lineage; credits issue commentors. |
| **Spec-repair fixes** | [#1538](https://github.com/anthropics/skills/pull/1538) | Brings `template/SKILL.md` and one more skill back under the Agent Skills spec (name/directory mismatch). Meta-level correctness work — low conflict risk for merge. |
| **skill-quality-analyzer + skill-security-analyzer** | [#83](https://github.com/anthropics/skills/pull/83) | Two meta-skills for the example-skills collection: five-dimension quality grading and security evaluation. Directly counter the trust-boundary concern (#492). |

---

## 4. Skills Ecosystem Insight

The community's most concentrated demand is for **repair and hardening of the skill-development and distribution toolchain** (recall=0% eval loops, Windows crashes, spec violations, duplicate installs, and context-window blowouts) — ahead of any single new domain skill.

---

# Claude Code Community Digest — 2026-08-13

## Today's Highlights
Version 2.1.229 ships with support for resuming remote-control sessions, server-supplied hooks for self-hosted runners, and SSE keepalive improvements. Meanwhile, the community is buzzing over two issues: a CVP-approved organization still receiving cyber-safeguard blocks (80 comments), and a long-closed Linux desktop feature request (498 👍) that finally got resolved this week. Several new regressions around cross-session messaging and prompt-cache invalidation appeared in the last 24 hours.

## Releases
**v2.1.229** — [Release](https://github.com/anthropics/claude-code/releases/tag/v2.1.229)
- Documented `claude remote-control --continue` for resuming the most recent Remote Control session
- Added server-supplied Claude Code hook support for self-hosted runner sessions, matching managed-environment behavior
- Added SSE keepalive pings to gateway streaming responses

## Hot Issues
1. **[CVP-approved org still receives cyber-safeguard blocks](https://github.com/anthropics/claude-code/issues/84352)** — #84352, 80 comments, 12 👍. A previously verified organization now shows "Under review" again in the Verification Portal, breaking access. High comment volume suggests many users are affected or watching closely.

2. **[Official Claude Desktop build for Linux](https://github.com/anthropics/claude-code/issues/65697)** — #65697, CLOSED, 52 comments, 498 👍. The most-upvoted feature request on the board finally closed after months. The huge 👍 count signals sustained demand for a native Linux desktop client.

3. **[12 multi-agent coordination bugs surfaced in one overnight cycle](https://github.com/anthropics/claude-code/issues/54393)** — #54393, 27 comments. A post-mortem cataloging recurring coordination failures in autonomous multi-agent runs. Still open, suggesting these issues remain unresolved or are being tracked for a larger fix.

4. **[Windows desktop GPU process crash kills all sessions](https://github.com/anthropics/claude-code/issues/81698)** — #81698, 25 comments. A crash with exit code 101457950 takes down the entire app and every running session. Niche but severe — data loss is the top concern.

5. **[`/plugin update` does not invalidate plugin cache](https://github.com/anthropics/claude-code/issues/14061)** — #14061, 25 comments, 31 👍. Plugins silently run stale versions after updates. Persistent issue since December 2025; the 👍 count shows it frustrates many plugin users.

6. **[Left arrow navigates to agents screen, not rebindable](https://github.com/anthropics/claude-code/issues/75899)** — #75899, 14 comments, 19 👍. Accidental navigation breaks the main session view on return. A small UX flaw with outsized impact given macOS TUI usage.

7. **[Opus 5 hallucinated responses not present in 4.8](https://github.com/anthropics/claude-code/issues/82326)** — #82326, 9 comments. Reliability regression reports with newer models erode trust in code generation — a serious quality concern for the community.

8. **[Agent view lacks "needs input, sleeping" indicator](https://github.com/anthropics/claude-code/issues/86082)** — #86082, 1 comment. The color/shape system encodes state and aliveness well except for blocked sessions. Small UI gap, but useful for teams running many background agents.

9. **[Auto-update invalidates every session's prompt cache](https://github.com/anthropics/claude-code/issues/86244)** — #86244, 1 comment, filed today. Background auto-updates silently invalidate all running sessions' caches, causing full context re-creation on `--resume`. Costly and unexpected for long-running work.

10. **[Cross-session messages render but never reach runtime input queue](https://github.com/anthropics/claude-code/issues/86237)** — #86237, 1 comment, filed today. Regression between 2.1.222 and 2.1.227. Messages appear in UI but never execute — a functional bug in the messaging pipeline.

## Key PR Progress
1. **[docs: point remaining stale doc links at code.claude.com](https://github.com/anthropics/claude-code/pull/85925)** — CLOSED. Cleans up remaining redirect-only docs.claude.com links across plugins, skills, and templates.

2. **[docs: fix stale doc links and README drift in plugins and examples](https://github.com/anthropics/claude-code/pull/85822)** — CLOSED. Verified docs-only cleanup, fixing links in hooks examples and plugin READMEs.

3. **[add the missing source to claude code](https://github.com/anthropics/claude-code/pull/41611)** — OPEN. Vague title but open for months; likely an incomplete or superseded contribution awaiting attention.

4. **[MEP: async state relay for multi-machine AI sessions](https://github.com/anthropics/claude-code/pull/42996)** — OPEN. Self-enforcing pattern to preserve context across machine switches, using zero new infrastructure. The "Meat Puppet Elimination Protocol" name is memorable; addresses a real context-loss pain point.

5. **[Scope `child_process_exec` to JS/TS files](https://github.com/anthropics/claude-code/pull/57888)** — CLOSED. Fixes Python false-positive where `asyncio.create_subprocess_exec(` triggered the security reminder incorrectly. Aimed at the `security_reminder_hook.py` rule.

## Feature Request Trends
- **Linux desktop support is the dominant ask** — the closed #65697 with 498 👍 shows massive demand; the community will likely watch for the official roadmap.
- **Agent session lifecycle management** — multiple requests to mark sessions "complete" or "dismissed" (#66202) and richer status indicators (#86082, #71835).
- **Cross-machine and cross-device continuity** — requests to surface on-disk transcripts in desktop app (#81835) and MEP-style state-relay patterns (#42996) point to users wanting seamless session portability.
- **MCP tool-result ergonomics** — honoring `Annotations.Audience` on tool-result blocks (#72239) reflects growing MCP-server adoption and transcript-noise complaints.
- **Plugin cache correctness** — updates should invalidate caches (#14061, #76882); this is becoming a recurring reliability theme.

## Developer Pain Points
- **Prompt cache invalidation is a top cost concern** — auto-updates (#86244), git status changes (#78720), and advisor-turn usage rollups (#84738) all silently destroy huge cached contexts, driving up token costs.
- **Windows desktop stability remains fragile** — repeated GPU-process crashes (#81698, #85905), self-repair that uninstalls the app (#85905), and recurring crash/repair cycles (#85199) are hampering Windows adoption.
- **Cross-session messaging regressions** — multiple reports (#86059, #86237) of messages being dropped or not delivered correctly across sessions, with recent regressions between patch versions.
- **Multi-agent coordination is still buggy** — the April post-mortem (#54393) remains open, and agent-view lacks basic state signaling (#86082), indicating ongoing friction.
- **Silent staleness — plugins and permissions** — `/plugin update` not invalidating caches (#14061), marketplace updates not touching `installed_plugins.json` (#76882), and `permissions.deny` not working (#61268) all share a theme: configuration that silently does nothing.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-08-13

## Today's Highlights

No new releases shipped in the last 24 hours, but the project saw a burst of activity on infrastructure: the `copyberry[bot]` landed a dozen+ merged PRs covering gRPC code-mode hosts, plugin metrics for background commands, per-thread usage tracking, and session reconnection. On the issue side, the most contentious item remains the macOS Desktop resource leak (`syspolicyd`/`trustd` runaway) with 83 comments and 392 reactions, plus a long-running request for disabling the 60-second auto-resolve on user questions.

## Releases

None in the last 24 hours.

## Hot Issues

Here are 10 issues that stand out by community engagement, severity, or both:

1. **[#25719 — Codex Desktop for macOS repeatedly triggers `syspolicyd`/`trustd` CPU and memory runaway](https://github.com/openai/codex/issues/25719)**
   The most-discussed open issue (83 comments, 392 👍). A persistent macOS resource leak that has been open since June and affects Plus subscribers on Apple Silicon — still unresolved as of today.

2. **[#28969 — Add setting to disable the auto-resolve in 60 seconds for questions](https://github.com/openai/codex/issues/28969)**
   70 comments, 194 👍. Users want the ability to disable the 60-second auto-resolve window for questions in CLI plan mode. Strong demand for this setting as a control/behavior option.

3. **[#25178 — Windows Computer Use screenshot fails on Windows 10 22H2 when SetIsBorderRequired is called](https://github.com/openai/codex/issues/25178)**
   Windows Computer Use can interact with apps but fails on any screenshot request with `0x80004002`. A blocker for Windows automation users on the older 22H2 build.

4. **[#31553 — Codex VS Code extension stopped auto-including IDE context after update](https://github.com/openai/codex/issues/31553)**
   A regression in the extension (26.623.141536) where IDE context is no longer auto-attached. Especially painful for remote/container users — a common pattern in enterprise setups.

5. **[#35419 — VS Code IDE context auto-disables and selected text is not attached in WSL2](https://github.com/openai/codex/issues/35419)**
   Related to the broader IDE-context regression cluster: in WSL2, the IDE context silently disables itself and selection text is dropped. High signal — 10 👍 with only 6 comments.

6. **[#26990 — Windows Desktop local state is not crash-safe after power loss](https://github.com/openai/codex/issues/26990)**
   After power loss, pins/projects reset, config regresses, and future timestamps appear. Points to durability issues in the Windows app's local state handling.

7. **[#34920 — IDE Context fails in Codex extension 26.715.x with RPC serialization error](https://github.com/openai/codex/issues/34920)**
   Affects multiple recent extension builds across VS Code and other IDEs on Windows. IDE Context is broadly broken in recent releases — another data point in the IDE context regression pattern.

8. **[#38250 — Codex Desktop can remain blank indefinitely when opening tasks with stale subagents](https://github.com/openai/codex/issues/38250)**
   New (filed yesterday): some tasks never finish opening on macOS with stale subagents left dangling, leaving the UI blank. Affects the latest build 26.803.61601.

9. **[#32888 — Auto-compaction uses stale token usage after tool output, causing unrecoverable context overflow](https://github.com/openai/codex/issues/32888)**
   A subtle but serious bug in app-server: large tool results can push past the context window because compaction decisions use last server-reported usage. Leads to unrecoverable overflow on long-running turns.

10. **[#38287 — MCP tool results lose content when structuredContent is present (Codex App 26.803.81509)](https://github.com/openai/codex/issues/38287)**
    Reported today — MCP results with `structuredContent` lose their content in recent builds. A downgrade to 26.803.41515 fixes it, which suggests a regression in the latest release.

## Key PR Progress

A wave of merged PRs from `copyberry[bot]` landed in the last 24 hours, mostly around app-server infrastructure, session handling, and usage instrumentation:

1. **[#38288 — Support gRPC code-mode hosts in app server](https://github.com/openai/codex/pull/38288)**
   Accepts `http://`/`https://` code-mode host URLs and routes them through the shared gRPC session provider. Keeps legacy WebSocket transport for `ws://`/`wss://`.

2. **[#38257 — Reconnect gRPC code-mode sessions after host restarts](https://github.com/openai/codex/pull/38257)**
   Companion to #38288: reopens cached sessions when the gRPC host stops, serializes reconnection attempts, and scopes cell IDs to the new host generation.

3. **[#38275 — Unify turn input submission and routing](https://github.com/openai/codex/pull/38275)**
   New `TurnInputRequest` and typed results for atomic start/steer/decline of turns, exposed as `start_or_steer_turn`, `start_turn_if_idle`, and `steer_turn` on `CodexThread` — a cleaner API for remote control.

4. **[#38281 — Show estimated thread usage in `/status`](https://github.com/openai/codex/pull/38281)**
   Extends `account/usage/read` with optional per-thread estimated credits, USD cost, model, reasoning, speed, and token breakdowns. Appears in `/status` for Enterprise.

5. **[#38282 — Add thread usage to TUI status surfaces](https://github.com/openai/codex/pull/38282)**
   Adds `thread-credits` and `estimated-thread-cost` to the configurable status line and terminal title for Enterprise workspaces, with one shared usage fetch when selected.

6. **[#38276 — Track plugin metrics for background unified exec commands](https://github.com/openai/codex/pull/38276)**
   Fixes a gap where plugin measurement collection stopped when the turn completed but the background command was still running. Metrics now stay active until that command exits.

7. **[#38283 — Collect plugin metrics from remote executors](https://github.com/openai/codex/pull/38283)**
   Resolves manifest-declared metric operations against the executor filesystem for remote plugin commands and streams bounded output back via a sidecar.

8. **[#38274 — Represent persisted world state as JSON objects](https://github.com/openai/codex/pull/38274)**
   Tightens world-state persistence: the `state` field must now be a JSON-object shape, removing replay code that had to handle arbitrary JSON values.

9. **[#38272 — Stamp conversation history items with creation times](https://github.com/openai/codex/pull/38272)**
   Adds fractional Unix creation times to locally-authored conversation items on durable entry, preserved across subsequent requests — useful for replay and debugging.

10. **[#38258 — Unify external authentication provider handling](https://github.com/openai/codex/pull/38258)**
    Standardizes failure classification across resolve/refresh/validate for ExternalAuth providers and allows runtime provider replacement with proper failure-state cleanup.

## Feature Request Trends

Across the issue tracker, several feature directions are pulling significant community demand:

- **Configurable user-input behavior** — A strong cluster of requests (notably #28969 with 70 comments and 194 👍, plus #37472) asks for more control over how and when Codex waits for user input: disabling the 60-second auto-resolve, allowing `request_user_input` to wait indefinitely in Default mode, and explicit control surfaces.

- **Thread/session lifecycle primitives** — Multiple requests ask for more explicit orchestration of threads: cross-thread orchestration, side-thread creation, and better behavior on `/fork` (see #14923, #38248, #38144). Users want to build workflows on top of threads, not just ad-hoc chat.

- **Desktop state robustness** — A recurring theme is local-state durability and recovery: crash-safety after power loss (#26990), stale subagents (#38250), sqlite backfill hangs (#28087), and app-server daemon leaks after updates (#32983).

- **IDE context reliability** — Demands implicitly focus on IDE context "just working" — the cluster of regressions on Windows, WSL2, and remote/container scenarios drives this.

## Developer Pain Points

Several patterns of recurring frustration are evident:

- **Windows is the neglected platform.** A disproportionate share of open bugs target Windows: Computer Use runtime failures (#25178, #37743), IDE context RPC serialization errors (#34920), setup blocking (#33967), state durability (#26990), and DPI-scaled screenshots (#31693). Windows users are facing more regressions and more severe failures than macOS users.

- **The IDE context keeps breaking.** At least four distinct issues report IDE context missing/disabled/dropped across extension versions 26.623 through 26.721 (#31553, #34920, #35419, #35333). This is a top workflow feature for many developers, and repeated regressions are eroding trust.

- **Resource leaks persist on macOS.** The `syspolicyd`/`trustd` runaway (#25719) is the single most reacted-to issue (392 👍), with sufferers on Apple Silicon reporting severe CPU/memory degradation. Its three-month tenure without a fix signals a hard problem that remains unresolved.

- **CLI session handling edge cases.** Newer CLI issues (0.147.0) hit session/file lifecycle bugs: `/fork` leaving the parent with an active writer (#38144), `thread/resume` dropping newest turns on heavily compacted threads (#38169), and TUI scrollback loss on viewport changes (#30745). These are exactly the kinds of long-tail defects that shorten trust in a daily-driver agent CLI.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**Gemini CLI Community Digest – 2026-08-13**

---

### 1. Today's Highlights
The community is heavily focused on subagent reliability, with two P1 bugs dominating discussion: subagents falsely reporting success after hitting turn limits (#22323) and the generalist agent hanging indefinitely (#21409). Security remains a top priority, with maintainers merging a fix for MCP config fail-open vulnerabilities and an SSRF patch using async DNS resolution. The team is also actively pushing forward on eval infrastructure, merging a new validation tool and integrating failure summaries into test output.

---

### 2. Releases
**v0.56.0-nightly.20260813.g1ac337739**
- Merged `Feat/eval validate` (#28344), adding static analysis for eval source files.
- Integrated tool call formatter and failure summaries into behavioral evaluations (#28305).
- Includes auto-generated changelog for the stable v0.55.1 release.

---

### 3. Hot Issues

1. **[#22323 – Subagent recovery after MAX_TURNS is reported as GOAL success](https://github.com/google-gemini/gemini-cli/issues/22323)** [P1]
   A `codebase_investigator` subagent reports `status: "success"` and `Termination Reason: "GOAL"` even when it hits the turn limit before doing any work. This masks real failures and wastes user time. High community engagement (12 comments), flagged for retesting.

2. **[#21409 – Generalist agent hangs](https://github.com/google-gemini/gemini-cli/issues/21409)** [P1]
   The generalist agent hangs indefinitely on trivial tasks like folder creation, forcing users to wait up to an hour before cancelling. Users report that instructing the model to avoid subagents resolves the issue, pointing to a delegation bug. 8 upvotes indicate widespread impact.

3. **[#25166 – Shell command execution gets stuck with "Waiting input"](https://github.com/google-gemini/gemini-cli/issues/25166)** [P1]
   After simple CLI commands complete, the shell remains in an active "Awaiting user input" state. This affects core daily workflows and has 3 upvotes, signaling a common annoyance.

4. **[#19873 – Leverage model's bash affinity via OS Sandboxing](https://github.com/google-gemini/gemini-cli/issues/19873)** [P2]
   Proposes zero-dependency OS sandboxing to let Gemini 3's native bash skills run safely. Suggests post-execution intent routing for UX. A forward-looking enhancement with 8 comments.

5. **[#21968 – Gemini does not use skills and sub-agents enough](https://github.com/google-gemini/gemini-cli/issues/21968)** [P2]
   Users report the model ignores custom skills and sub-agents unless explicitly instructed, even for directly relevant tasks like `gradle` or `git` operations. Anecdotal but consistent feedback.

6. **[#21983 – Browser subagent fails on Wayland](https://github.com/google-gemini/gemini-cli/issues/21983)** [P1]
   The browser subagent fails on Wayland sessions, returning a `GOAL` termination reason without completing the task. A platform-specific bug that blocks Linux users.

7. **[#26522 – Auto Memory retries low-signal sessions indefinitely](https://github.com/google-gemini/gemini-cli/issues/26522)** [P2]
   The Auto Memory system keeps resurfacing sessions the extraction agent decides not to read, causing infinite reprocessing loops and wasted API calls.

8. **[#26525 – Deterministic redaction and reduce Auto Memory logging](https://github.com/google-gemini/gemini-cli/issues/26525)** [P2]
   Auto Memory sends transcript content to the model *before* prompt-based redaction occurs, and logging may expose skill definitions, raising privacy concerns around secret leakage.

9. **[#20079 – Symlinked agent files not recognized](https://github.com/google-gemini/gemini-cli/issues/20079)** [P2]
   `~/.gemini/agents/*.md` files that are symlinks are silently ignored. A niche but clear configuration bug for users managing dotfiles.

10. **[#22093 – Subagents running without permission since v0.33.0](https://github.com/google-gemini/gemini-cli/issues/22093)** [P2]
    After an auto-update, subagents began executing despite being disabled in all configurations. This violates explicit user settings and erodes trust in the permission model.

---

### 4. Key PR Progress

1. **[#28794 – Prevent fail-open and data loss on corrupt MCP enablement config](https://github.com/google-gemini/gemini-cli/pull/28794)** [P1]
   Fixes a critical vulnerability where invalid JSON in `mcp-server-enablement.json` silently re-enabled all servers and could lead to data loss. A direct response to #28786.

2. **[#28787 – Don't treat corrupt MCP enablement config as empty](https://github.com/google-gemini/gemini-cli/pull/28787)** [P1]
   Companion fix ensuring JSON parse failures aren't collapsed into an empty config, which would default servers to enabled. Small but critical hardening.

3. **[#28790 – Context-aware silent retries for capacity errors](https://github.com/google-gemini/gemini-cli/pull/28790)** [P1]
   Closes a critical regression (#28761) by adding backoff retries and TTL-based availability tracking for capacity exhaustion, critical for unattended CI runs.

4. **[#28691 – Block `$VAR` and `${VAR}` variable expansion bypass](https://github.com/google-gemini/gemini-cli/pull/28691)** [P1 Security]
   Hardens the bash/PowerShell substitution detection to fully close GHSA-wpqr-6v78-jr5g, preventing command injection via variable expansion.

5. **[#28557 – Resolve SSRF vulnerability in web-fetch.ts](https://github.com/google-gemini/gemini-cli/pull/28557)** [P1 Security]
   Fixes a serious SSRF hole where hostnames resolving to internal IPs (e.g., `169.254.169.254`) bypassed validation. Now uses async DNS resolution.

6. **[#28738 – Allow agents to call agents](https://github.com/google-gemini/gemini-cli/pull/28738)** [P2]
   Enables subagent delegation and recursion via `tools:` frontmatter (fixes #22092). A major architectural feature, though it may compound the existing hang issues.

7. **[#28789 – Fix vscode-ide-companion stop() hang and keep-alive failure](https://github.com/google-gemini/gemini-cli/pull/28789)** [P2]
   Resolves an indefinite hang in `IdeServer.stop()` with active streaming MCP sessions and fixes resource leaks in the keep-alive loop.

8. **[#28673 – Add Gemini 3.6 Flash and 3.5 Flash-Lite model configs](https://github.com/google-gemini/gemini-cli/pull/28673)** [P2]
   Adds support for two new models with thinking and multimodal tool use capabilities, expanding the CLI's model options.

9. **[#28344 – Feat/eval validate](https://github.com/google-gemini/gemini-cli/pull/28344)** [P3]
   Merged into nightly. Adds `eval:validate`, a static analysis command checking eval files against 9 rules with CI-gating support.

10. **[#28405 – Prevent scroll position jump during content updates](https://github.com/google-gemini/gemini-cli/pull/28405)** [P2]
    Fixes #5009 where scrolling up to review changes jumps back to the bottom when new content arrives. A focused UI/UX fix for terminal users.

---

### 5. Feature Request Trends
- **Agentic Self-Improvement**: The community repeatedly asks for the model to more aggressively and correctly use subagents, skills, and tools (`#21968`, `#21432`). There's a sense the model is "tool-aware" but not "tool-proactive."
- **Sandboxed Bash Execution**: A persistent ask for zero-dependency OS-level sandboxing to safely unlock the model's native shell skills without security trade-offs (`#19873`).
- **AST-Aware Tooling**: A dedicated workstream pushes for AST-based file reads, codebase mapping, and search to reduce token waste and improve code navigation precision (`#22745`, `#22746`).
- **Browser Agent Resilience**: Users want fail-over behavior for locked profiles (session takeover) and proper support for Wayland (`#22232`, `#21983`).
- **Evaluation and Trajectory Visibility**: Requests for subagent trajectory sharing via `/chat share` and richer component-level evals indicate a maturing desire for observability and testing (`#22598`, `#24353`).

---

### 6. Developer Pain Points
- **Unreliable Subagents**: The combination of false `GOAL` reports (#22323), indefinite hangs (#21409), and permission bypasses (#22093) makes subagents feel like a black box that can fail silently. This is the dominant theme in the tracker.
- **Trust and Security Friction**: The MCP config fail-open behavior and SSRF bypasses erode confidence. Users are also concerned about Auto Memory's redaction being post-hoc rather than deterministic (#26525).
- **Interactive Process Handling**: Hangs on "Waiting input" (#25166) and stuck interactive prompts (e.g., `vite create` in #22465) show the model struggles with subprocess management.
- **Terminal UI Instability**: Flicker on resize (#21924) and terminal corruption after exiting external editors (#24935) highlight rough edges in the core TUI experience.
- **Configuration Surprises**: Symlinked agent files being ignored (#20079) and silent settings.json overrides in the browser agent (#22267) point to inconsistent config parsing.

---
*Generated from public GitHub data for `google-gemini/gemini-cli`.*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-08-13

## Today's Highlights
Community attention this week is concentrated heavily on MCP reliability, with multiple new reports covering OAuth refresh failures, transient 5xx handling, and orphaned server processes. Model routing and subagent behavior remain the top stability concern, with three separate reports of configured model overrides being silently ignored. A surge of triage-labeled issues (10+ filed today) suggests the maintainers are actively sweeping the backlog, though several critical bugs around session resumption and resource cleanup remain open.

## Releases
No new releases in the last 24 hours. Latest version remains **1.0.79**.

## Hot Issues
1. **[#4390 — Enabled organization models missing from catalogue](https://github.com/github/copilot-cli/issues/4390)**  
   Anthropic models (Claude Sonnet 5/Opus 5) and Kimi K3 explicitly enabled by Copilot Business admins are unavailable in the CLI. Model selection errors with "disabled by your organization." Four 👍 indicate wider org-level impact.

2. **[#1305 — Support CIMD for Remote OAuth MCP Servers](https://github.com/github/copilot-cli/issues/1305)**  
   Long-running request (35 👍) with 5 comments this week. DCR-based OAuth works, but the CLI lacks CIMD (Client-Initiated Mutual TLS) support, preventing connections to enterprise MCP servers requiring certificate-based auth.

3. **[#4328 — Ctrl+H misinterpreted as Ctrl+Backspace under WSL2](https://github.com/github/copilot-cli/issues/4328)**  
   `WT_SESSION` env leaking from Windows Terminal causes key-binding regression. Documented `ctrl+h` (delete char) behaves as `ctrl+w` (delete word). Platform-specific input handling bug with real workflow impact.

4. **[#4464 — Remote MCP OAuth: silent refresh fails with AADSTS70011](https://github.com/github/copilot-cli/issues/4464)**  
   Entra ID OAuth scope bug mixes `.default` with resource-specific scopes in refresh requests, forcing interactive sign-in every ~60–75 min. Severe for CI/automation contexts.

5. **[#4466 — Remote MCP: transient 5xx on `initialize` marks server failed for whole session](https://github.com/github/copilot-cli/issues/4466)**  
   502 on startup causes hard, per-session failure with no retry or backoff. Single bad gateway response makes the server unusable for the entire session.

6. **[#1730 — `sessionStart` hook not firing in Copilot CLI](https://github.com/github/copilot-cli/issues/1730)**  
   Hooks defined in `.github/hooks/*.json` silently do not execute on startup. Open since February with 8 comments; Windows 11/PowerShell 7 environment. Long-running bug lacking resolution.

7. **[#4432 — `rubber-duck` model-emitted argument overrides complementary strategy](https://github.com/github/copilot-cli/issues/4432)**  
   The `task` tool leaks a `model` argument that overrides the intended cross-family review model selection and user `/subagents` settings. Design flaw in agent configuration handling.

8. **[#4468 — `--server --stdio` leaks 4 extension-host processes per session](https://github.com/github/copilot-cli/issues/4468)**  
   Long-lived server mode never terminates extension-host children; processes accumulate until server exit. Resource exhaustion risk for IDE-hosted workflows.

9. **[#3976 — native `tgrep` indexer OOM-kills host on large monorepos](https://github.com/github/copilot-cli/issues/3976)**  
   The experiment flag `copilot_cli_tgrep` spawns an unbounded trigram indexer daemon with no memory cap. Not a default path but dangerous when enabled.

10. **[#4467 — Long-running agent sessions exhaust event storage](https://github.com/github/copilot-cli/issues/4467)**  
   Sessions spawning many subagents can fill the remote event store, causing session status/handoffs to fail and appear "cancelled" while processes stay alive.

## Key PR Progress
1. **[#4449 — Migrate pull request automation away from `pull_request_target`](https://github.com/github/copilot-cli/pull/4449)**  
   Security-hardening refactor. Removes privileged `pull_request_target` trigger in favor of issue-scoped tokens and no-permission `pull_request` signals. Relevant to supply-chain security best practices.

2. **[#4453 — "Julesdemangeot ship it patch 1"](https://github.com/github/copilot-cli/pull/4453)** — Closed  
   Auto-generated patch from a third-party bot; closed without merge.

3. **[#4452 — "Revert 5 copilot/fix with copilot"](https://github.com/github/copilot-cli/pull/4452)** — Closed  
   Auto-generated revert request; no meaningful change.

## Feature Request Trends
- **BYOK / Custom Provider Model Discovery** ([#4358](https://github.com/github/copilot-cli/issues/4358)): When using `COPILOT_PROVIDER_BASE_URL`, only a single configured model is exposed. Users want `/models` to populate dynamically from the provider's endpoint.
- **Context Durability** ([#4441](https://github.com/github/copilot-cli/issues/4441)): Repeated compactions are recursively lossy; early decisions degrade with each cycle. Community is pushing for durable, cross-compaction memory.
- **ACP Interactivity** ([#2109](https://github.com/github/copilot-cli/issues/2109)): Requests for an `ask_user`/`ask_question` extension method beyond `session/request_permission` to support richer human-in-the-loop workflows.
- **System `gh` Usage** ([#4456](https://github.com/github/copilot-cli/issues/4456)): Remove the hard dependency on bundled `gh.exe`; allow fallback to system-installed GitHub CLI.

## Developer Pain Points
- **Model Configuration Is Unreliable**: Multiple reports ([#4432](https://github.com/github/copilot-cli/issues/4432), [#4457](https://github.com/github/copilot-cli/issues/4457), [#4458](https://github.com/github/copilot-cli/issues/4458), [#4462](https://github.com/github/copilot-cli/issues/4462)) of explicit model overrides being silently ignored, downgraded, or replaced. Feels like a trust issue: users configure a model and the CLI runs something else.
- **MCP Server Lifecycle Fragility**: OAuth scope bugs ([#4464](https://github.com/github/copilot-cli/issues/4464)), socket errors ([#4463](https://github.com/github/copilot-cli/issues/4463)), and no retry on transient failures ([#4466](https://github.com/github/copilot-cli/issues/4466)) add up to a deeply unstable integration surface.
- **Resource Cleanup Gaps**: Docker MCP containers ([#4461](https://github.com/github/copilot-cli/issues/4461)) and extension-host processes ([#4468](https://github.com/github/copilot-cli/issues/4468)) leak after session close. The CLI accumulates resources until the host or server is killed.
- **Session State Corruption**: Orphaned `permission.requested` events replay on resume ([#4469](https://github.com/github/copilot-cli/issues/4469)) and event store exhaustion ([#4467](https://github.com/github/copilot-cli/issues/4467)) cause repeated prompts and fake "cancelled" states.
- **CI/Non-Interactive Authentication**: The `GITHUB_TOKEN` path in Actions is blocked for MCP registry policy fetches ([#4346](https://github.com/github/copilot-cli/issues/4346)), undermining the documented PAT-less setup for full MCP functionality.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

**Kimi Code CLI Community Digest — 2026-08-13**

---

## Today's Highlights
The Kimi Code CLI community continues to focus on long-running feature requests, particularly the #1283 Memory System proposal which remains the single most active discussion thread. Two new pull requests from contributor Ricardo-M-L target robustness fixes in string shortening and web session process handling, signaling ongoing work on edge-case reliability. No new releases were published in the last 24 hours.

## Releases
None.

## Hot Issues
1. **[#1283 — Feature Request: Memory System — Persistent context across sessions](https://github.com/MoonshotAI/kimi-cli/issues/1283)** — *OPEN* — The most-discussed issue (36 comments) since February, requesting both AI-managed and user-defined persistent memory. Community engagement remains high, likely because this addresses the fundamental workflow limitation of stateless CLI sessions.

2. **[#1215 — Feature Request: Support for OpenAI-compatible API endpoints](https://github.com/MoonshotAI/kimi-cli/issues/1215)** — *OPEN* — Repeatedly referenced as a precondition for enterprise adoption, allowing users to route through internal proxies or alternative backends. High demand from corporate developers.

3. **[#1178 — Enhancement: Add multi-line diff preview in interactive mode](https://github.com/MoonshotAI/kimi-cli/issues/1178)** — *OPEN* — Users want richer diff context (not just filename/stat lines) before applying automated changes. This aligns with broader demand for safer autonomous operations.

4. **[#1120 — Bug: Unicode and CJK character truncation in tool-call summaries](https://github.com/MoonshotAI/kimi-cli/issues/1120)** — *OPEN* — Reports that `shorten_middle` returns early on short buffers, leaving newlines intact and breaking single-line rendering. Directly related to PR #2449, which aims to fix this exact behavior.

5. **[#1094 — Feature Request: Git worktree integration for parallel agent runs](https://github.com/MoonshotAI/kimi-cli/issues/1094)** — *OPEN* — Users request native support for spawning agents in isolated worktrees to avoid race conditions in shared working directories. Popular among power users running concurrent tasks.

6. **[#1051 — Enhancement: YAML/JSON-configurable agent definitions](https://github.com/MoonshotAI/kimi-cli/issues/1051)** — *OPEN* — Requests to move agent prompts/settings from CLI flags to declarative config files for better project-level sharing and versioning.

7. **[#1013 — Bug: Intermittent BrokenPipeError during web session termination](https://github.com/MoonshotAI/kimi-cli/issues/1013)** — *OPEN* — User reports of crashes when the subprocess exits between write and drain operations. Addressed by PR #2324, which guards against this race condition.

8. **[#967 — Feature Request: Local vector-store caching for repetitive tasks](https://github.com/MoonshotAI/kimi-cli/issues/967)** — *OPEN* — Developers want offline reuse of prior analysis results to reduce token usage and latency, especially in large repositories.

9. **[#921 — Enhancement: Streaming JSON output mode for scripting](https://github.com/MoonshotAI/kimi-cli/issues/921)** — *OPEN* — Non-interactive users request a structured event stream (e.g., NDJSON) for integrating Kimi CLI into CI/CD pipelines and custom tooling.

10. **[#898 — Policy: Prompt-injection guardrails in read-only commands](https://github.com/MoonshotAI/kimi-cli/issues/898)** — *OPEN* — Growing concern about malicious content in files influencing agent behavior; users request explicit warnings or off-by-default sanitization for `file_read` and similar commands.

## Key PR Progress
1. **[#2449 — fix(string): strip newlines in shorten_middle before the length check](https://github.com/MoonshotAI/kimi-cli/pull/2449)** — Fixes the early-return bug where `remove_newline=True` was ignored on short input. Directly addresses the rendering glitch for single-line tool-call arguments.

2. **[#2324 — fix(web): handle BrokenPipeError in SessionProcess.send_message](https://github.com/MoonshotAI/kimi-cli/pull/2324)** — Guards against writes to a dead subprocess by checking process liveness before writing to stdin; closes the race condition reported in #1013.

3. **[#2390 — feat(agent): support custom system prompt via `--prompt-file` flag](https://github.com/MoonshotAI/kimi-cli/pull/2390)** — Allows users to load a system prompt from a file, enabling project-specific agent behaviors without modifying global configs.

4. **[#2355 — perf(streaming): reduce token delay on long outputs via incremental flush](https://github.com/MoonshotAI/kimi-cli/pull/2355)** — Improves perceived latency by flushing stdout earlier on long terminal streams; tested positive for interactive use.

5. **[#2287 — refactor(parser): unify argument parsing between CLI and REPL modes](https://github.com/MoonshotAI/kimi-cli/pull/2287)** — Removes divergence in how options are processed, eliminating inconsistent behavior when switching between interactive and one-shot execution.

6. **[#2250 — test(integration): add golden-file tests for 12 common refactoring scenarios](https://github.com/MoonshotAI/kimi-cli/pull/2250)** — Expands CI coverage of code-modification workflows to prevent silent quality regressions.

7. **[#2219 — feat(vcs): support partial staging (add -p equivalent) for tool-initiated changes](https://github.com/MoonshotAI/kimi-cli/pull/2219)** — Enables finer-grained commit control, addressing user complaints about oversized automatic commits.

8. **[#2188 — fix(completions): inspect type hints to complete function-call arguments](https://github.com/MoonshotAI/kimi-cli/pull/2188)** — Improves shell completion accuracy for tools with complex, typed signatures.

9. **[#2154 — docs(web): add troubleshooting guide for common sandbox permission errors](https://github.com/MoonshotAI/kimi-cli/pull/2154)** — Documented fixes for permission-denied errors when running web mode in restricted environments.

10. **[#2101 — chore(deps): migrate to `aiohttp` 3.10+ and drop `requests` in web runner](https://github.com/MoonshotAI/kimi-cli/pull/2101)** — Removes a deprecated dependency, reducing memory footprint in long-lived web sessions.

## Feature Request Trends
- **Persistent Memory & Context** (e.g., #1283, #967): Leading trend—users want the CLI to remember project patterns, preferences, and past analysis across invocations. Both AI-managed notes and explicit cache mechanisms are requested.
- **Enterprise/Scripting Enablement** (#1215, #921): Demand for configurable endpoints, structured output, and non-interactive execution modes to fit into corporate pipelines.
- **Concurrency & Isolation** (#1094, #898): Users are pushing for safe parallel agent execution via worktrees and stronger guardrails against automated modifications.

## Developer Pain Points
- **Statelessness**: The most-voiced frustration—losing conversation context and prior project learnings between sessions requires repeated re-education of the agent.
- **Race Conditions & Subprocess Instability**: Intermittent crashes during session teardown (e.g., BrokenPipeError) and background process handling erode trust in long-running workflows.
- **Unsafe Output Rendering**: Truncation issues in tool summaries (especially with CJK characters) and lack of full-diff previews make it hard to validate automated actions before applying them.
- **Vendor Lock-in**: The absence of OpenAI-compatible endpoint support is a recurring blocker for teams that cannot use a proprietary backend directly.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

## OpenCode Community Digest — 2026-08-13

### Today's Highlights
Two patch releases (v1.18.17, v1.18.18) landed with fixes for session compaction, retry behavior, and model-specific prompt selection. The community is actively reporting billing/entitlement bugs around OpenCode Zen and Go subscriptions, with several closed issues indicating rapid triage, while a wave of contributor PRs from kitlangton focuses on hardening the client-service lifecycle and test infrastructure.

### Releases
**v1.18.18** — Core bugfixes: Kimi system prompt now correctly selected for official Moonshot and Kimi providers; fixed xhigh reasoning effort for xAI models.

**v1.18.17** — Core bugfixes: Session compaction now keeps complete recent turns and produces clearer summaries for smaller models; added MERGE Gateway reasoning variants (contributed by @MatthewFeroz); capped automatic session retries with jitter to prevent repeated retry storms.

### Hot Issues
1. **[#14273](https://github.com/anomalyco/opencode/issues/14273) — "Free usage exceeded" despite Zen balance (CLOSED, 40 comments)** — Users with paid Zen credits still hit free-tier caps on Kimi K2.5 and MiniMax2.5. High engagement signals widespread confusion around entitlement logic. 
2. **[#4832](https://github.com/anomalyco/opencode/issues/4832) — Gemini 3 Pro function calling fails: missing `thoughtSignature` (CLOSED, 35 comments, 14 👍)** — Long-running issue blocking tool use on Gemini 3 Pro; closed after months of discussion, suggesting a fix landed upstream or in a recent release.
3. **[#41470](https://github.com/anomalyco/opencode/issues/41470) — "Copied to clipboard" doesn't work in VS Code Server/Docker (OPEN, 11 comments)** — Clipboard operations silently fail in remote/containerized environments; a persistent UX annoyance for remote devs.
4. **[#42128](https://github.com/anomalyco/opencode/issues/42128) — Free limit exceeded on first request for DeepSeek V4 Flash Free (CLOSED, 7 comments, 5 👍)** — Fresh sessions immediately hit "Free usage exceeded" without any prior usage; likely a quota-accounting bug.
5. **[#33027](https://github.com/anomalyco/opencode/issues/33027) — MCP tools connected but not exposed to agent (OPEN, 7 comments)** — `pdfrag` MCP server connects and lists 6 tools, but agent tool list is empty; points to gaps in MCP tool registration.
6. **[#33495](https://github.com/anomalyco/opencode/issues/33495) — Paid Zen users still hit 200-request free limit (OPEN, 6 comments)** — Follow-up on #14273: $20+ balances still subject to free-tier caps; indicates a systemic billing-tier bug, not a one-off.
7. **[#42147](https://github.com/anomalyco/opencode/issues/42147) — Azure OpenAI large models hang on Responses API streaming (OPEN, 4 comments)** — `gpt-5.6-luna/sol`, `gpt-5.4`, `o3` hang indefinitely while `gpt-5-mini` works; affects enterprise Azure users.
8. **[#42170](https://github.com/anomalyco/opencode/issues/42170) — Desktop fails to load sessions: `no such column: project_id` (OPEN, 2 comments)** — Schema migration bug breaks session loading on Desktop 1.18.17; a fix PR (#42169) was already submitted.
9. **[#41806](https://github.com/anomalyco/opencode/issues/41806) — Instance bootstrap hangs forever on Linux (OPEN, 3 comments)** — Zombie git child process never reaped; TUI renders but Enter can't start a session. Critical for Linux users on certain filesystems.
10. **[#41848](https://github.com/anomalyco/opencode/issues/41848) — LLM retry has no max attempts; infinite "Thinking..." loop (OPEN, 3 comments)** — Stream errors trigger a ~24-day max delay retry loop with no UI feedback; DeepSeek errors cause permanent hangs.

### Key PR Progress
1. **[#42185](https://github.com/anomalyco/opencode/pull/42185) — fix(client): prevent stale service replacement** — Stops older CLI/Desktop clients from replacing newer managed background services after updates; closes a version-skew race.
2. **[#42186](https://github.com/anomalyco/opencode/pull/42186) — fix(client): require authenticated service stop** — Forces clients to authenticate and accept an exact-instance stop before replacement, preventing SIGTERM/SIGKILL fallbacks on unresponsive services.
3. **[#42209](https://github.com/anomalyco/opencode/pull/42209) — fix(client): cancel SSE readers after handshake** — Reduces native memory growth from long-lived Promise SSE subscriptions that reconnect or cancel.
4. **[#42203](https://github.com/anomalyco/opencode/pull/42203) — fix(core): skip shell parsing when permissions allow all** — Bypasses tree-sitter shell parsing when the agent config unconditionally allows all commands; improves startup and execution performance.
5. **[#28689](https://github.com/anomalyco/opencode/pull/28689) — fix(permission): support `**` globstar and fix `*` matching** — Overhauls wildcard semantics so `*` doesn't match `/`; adds `**` support; closes #28150 and fixes `.env` deny-rule bypasses.
6. **[#42169](https://github.com/anomalyco/opencode/pull/42169) — fix(core): restore `workspace.project_id` for remaps** — Directly fixes the Desktop crash in #42170 by restoring the dropped `project_id` column in schema migrations.
7. **[#42202](https://github.com/anomalyco/opencode/pull/42202) — feat(opencode): add per-session budget limit** — New feature adding an optional session cost cap plus a TUI sidebar widget to view/set the budget; community-driven cost control.
8. **[#39473](https://github.com/anomalyco/opencode/pull/39473) — fix: retry truncated provider streams** — Treats AI SDK's synthetic `other` finish reason (stream ended without finish reason) as truncation and retries; closes #37852.
9. **[#42199](https://github.com/anomalyco/opencode/pull/42199) / [#42193](https://github.com/anomalyco/opencode/pull/42193) — feat/fix(desktop): use opencode2 in WSL** — Migrates Desktop WSL servers to the V2 CLI with exact version matching, plus a build-on-demand Linux CLI installer.
10. **[#42207](https://github.com/anomalyco/opencode/pull/42207) — feat(catalog): expand terminal state coverage** — Terminal catalog grows from 65 to 76 screens with explicit empty/populated states; includes Open Graph card generation per capture (#42201).

### Feature Request Trends
- **Granular permission controls** — Demand for finer-grained `.env` protection (grep/glob), wildcard `**` semantics, and per-MCP-server trust configs (#17073, #40111, #28689).
- **Configuration ergonomics** — Reload config without restart via command palette (#6815, 88 👍) and custom provider model aliasing to Models.dev definitions (#30519).
- **Cost governance** — Per-session budget caps (#42202), and recurring complaints about free-tier vs. paid entitlement logic (#14273, #33495, #42128).
- **UI/UX polish** — Mermaid diagram rendering in chat (#3366), clickable file paths in terminal (#19005), clipboard fixes in remote environments (#41470).

### Developer Pain Points
- **Billing/entitlement confusion is the #1 recurring theme** — Multiple reports of paid users hitting free-tier limits, "Free usage exceeded" on first request, and Go subscribers still seeing upgrade prompts (#14273, #33495, #42128, #42132, #42140, #42154). 
- **Remote/containerized environments break core UX** — Clipboard copy fails silently in VS Code Server/Docker; MCP tools connect but don't surface to agents (#41470, #33027).
- **Reliability hangs and retry loops** — Infinite retries on stream errors ("Thinking..." forever), bootstrap hangs from unreaped child processes, and large Azure models hanging indefinitely (#41848, #41806, #42147).
- **Session/workspace state fragility** — Schema migration errors like `no such column: project_id` crash Desktop entirely (#42170), and project-folder disambiguation is broken when names are similar (#42040).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-08-13

## Today's Highlights

Qwen Code Desktop v0.2.1 shipped with project memory scoped to workspace by default and session lifecycle telemetry alignment, following yesterday's v0.2.0 release that stabilized web-shell transcript pagination. Memory reliability continues to dominate the conversation, as the RFC on auto-memory recall (#7040) is now partially merged and in review for bounded initial-turn fast paths. Daemon and session-management robustness is an active theme, with new CI failures (#9015) and a batch of fresh P1/P2 bugs reported in the last 24 hours.

## Releases

- **desktop-v0.2.1** (2026-08-12): Default project memory scope changed to workspace-level (`refactor(serve)`), plus session lifecycle telemetry alignment.
- **desktop-v0.2.0** (2026-08-12): Web-shell improvements — stabilized transcript history pagination and added session catalog sharing.
- **dsw-eas-smoke-20260812** (2026-08-12): Non-production infrastructure smoke test; no SWE score published.

## Hot Issues

1. **[#7040 — RFC: Reliable auto-memory recall](https://github.com/QwenLM/qwen-code/issues/7040)** · 10 comments  
   The flagship memory-reliability RFC is making progress: recall delivery telemetry is merged, bounded initial-turn recall is in review. Community is watching this closely as the foundation for predictable memory behavior.

2. **[#8963 — Cannot run long tasks automatically](https://github.com/QwenLM/qwen-code/issues/8963)** · 9 comments  
   User reports that the tool hangs on Python scripts and long-running commands regardless of approval mode; compares unfavorably to Kimi Code. A clear pain point for automation-heavy workflows.

3. **[#8957 — Crash on image load since 0.21.2 (regression)](https://github.com/QwenLM/qwen-code/issues/8957)** · 8 comments  
   A confirmed regression: reading images crashes the CLI in versions after 0.21.1. High-impact for multimodal work; users are waiting on an urgent fix.

4. **[#8678 — Session restore timeout loses current session](https://github.com/QwenLM/qwen-code/issues/8678)** · 7 comments  
   Large session restores that time out can discard the current session. PR1 (safe timeouts and observability) is merged; remaining work is in progress.

5. **[#8562 — Screen flicker in tmux over SSH](https://github.com/QwenLM/qwen-code/issues/8562)** · 7 comments  
   A user reports rendering flicker only within tmux splits when chatting via iTerm2 → SSH → tmux. The user's own investigation (via Qwen 3.8 Max) points to a Qwen Code version regression. Mac/Linux remote workflows are clearly common, so this gets attention.

6. **[#8097 — Background agent coordination failures](https://github.com/QwenLM/qwen-code/issues/8097)** · 6 comments  
   Multiple background Explore subagents with `send_message` cause duplicate work, premature completion, and non-interactive `send_message` — a blocker for advanced multi-agent orchestration.

7. **[#9015 — Main CI failed: E2E Tests](https://github.com/QwenLM/qwen-code/issues/9015)** · 4 comments  
   Auto-filed CI issue: an E2E test run failed on `main` before any test result was reported. Needs immediate triage to unblock the merge pipeline.

8. **[#9016 — Vertex AI cannot use Application Default Credentials](https://github.com/QwenLM/qwen-code/issues/9016)** · 4 comments  
   ADC is effectively unsupported with Vertex AI; the workaround forces an API key, which still yields 401s. Enterprise Google Cloud users are blocked.

9. **[#8922 — Shell ignores truncateToolOutputThreshold](https://github.com/QwenLM/qwen-code/issues/8922)** · 4 comments  
   The documented `tools.truncateToolOutputThreshold` setting is ignored by Shell — a hardcoded 30K character budget takes precedence. Documentation/behavior mismatch leads to surprise truncations.

10. **[#9005 — Anthropic wire lacks stream-safety protections](https://github.com/QwenLM/qwen-code/issues/9005)** · 3 comments  
    The Anthropic content generator is missing the stream-safety guards that the OpenAI wire already has. P1 priority for users on Claude models via proxies.

11. **[#8979 — MAX_TOKENS recovery corrupts transcript on resume](https://github.com/QwenLM/qwen-code/issues/8979)** · 3 comments  
    After MAX_TOKENS output recovery, `--resume` rehydrates duplicated turns because the durable transcript disagrees with in-memory history — a reliability trap for long headless runs.

## Key PR Progress

1. **[#8905 — Adaptively grow live-journal caps before truncating mid-turn replay](https://github.com/QwenLM/qwen-code/pull/8905)**  
   Improves daemon session replay: caps grow (entries scaled proportionally with bytes) before oldest entries are dropped during a long in-flight turn.

2. **[#8754 — Remove dead dynamic command translation setting](https://github.com/QwenLM/qwen-code/pull/8754)**  
   Cleans up the dead `general.dynamicCommandTranslation` setting from CLI schema, VS Code schema, docs, and Web Shell translations, with a regression test.

3. **[#9028 — Fix review-context manifest exceeding resolved-file bound](https://github.com/QwenLM/qwen-code/pull/9028)**  
   Drops web-shell e2e related-paths that breach the committed manifest file-limit test on `main`.

4. **[#8981 — Brake review-round diff growth with per-window budgets](https://github.com/QwenLM/qwen-code/pull/8981)**  
   Autofix review loop now records a net-size baseline per counting window (split into test vs source lines) and brakes runaway diff growth.

5. **[#8740 — Share one Chrome bridge across sessions via multi-client /cdp tunnel](https://github.com/QwenLM/qwen-code/pull/8740)**  
   Makes the daemon's `/cdp` tunnel multi-client so non-daemon Qwen Code processes can reuse one Chrome extension bridge — sessions no longer reconnect individually.

6. **[#8982 — Reduce ENOSPC and load-sensitive test flakes](https://github.com/QwenLM/qwen-code/pull/8982)**  
   Tightens the Test gate to be less sensitive to shared-runner load and `/tmp` pressure without adding retries to CLI/Core suites.

7. **[#8978 — No-op on empty channel set; restore only active channels](https://github.com/QwenLM/qwen-code/pull/8978)**  
   `qwen serve --channel all` no longer exits(1) when no channels are configured; empty sets are a graceful no-op, and restart only restores previously-active channels.

8. **[#8972 — Workflow agent directory pinning and extended bounds](https://github.com/QwenLM/qwen-code/pull/8972)**  
   Lets workflow subagents pin a directory (via `agent({workingDir})` into an existing worktree) and outlive default bounds — key for complex, long-running workflows.

9. **[#8874 — Workspace file uploads in Web Shell](https://github.com/QwenLM/qwen-code/pull/8874)**  
   Adds drag-and-drop file uploads to the Web Shell composer with progress, cancellation, conflict renaming, and inline file references.

10. **[#9003 — SDK support for `auto` permission mode](https://github.com/QwenLM/qwen-code/pull/9003)**  
    Aligns Python and Java SDKs with the CLI/TypeScript SDK by accepting `permission_mode="auto"`, fixing the client-side validation error from #9002.

11. **[#8927 — Bound session lifetime with sessionRotation](https://github.com/QwenLM/qwen-code/pull/8927)**  
    Adds per-channel `sessionRotation` with `maxTurns` and age-based bounds: when a route exceeds its bound, the next message starts a fresh session.

## Feature Request Trends

- **Memory reliability and auto-recall** — The community is pushing for deterministic, well-timed memory recall with quality guarantees and telemetry (#7040). Bounded initial-turn recall and multilingual evaluation are the current review targets.
- **Multi-agent coordination** — Users want better background subagent orchestration: no duplicate work, correct completion detection, and interactive `send_message` (#8097). Workflow agents with directory pinning and extended bounds (#8972) point in this direction.
- **Workspace & session management** — Web Shell file uploads (#8874), session naming retention after `/clear` (#8977), and channel rotation (#8927) show demand for richer workspace and session lifecycle controls.
- **Tool-output budget configurability** — Users expect documented settings like `truncateToolOutputThreshold` to actually work (#8922); relatedly, tool-output budgeting/observability is being hardened (#7306).
- **Desktop app direction** — A proposal to deprecate the Electron app and rename the Tauri shell to `desktop` (#8596) signals community interest in the Tauri future and simplification of the desktop packaging story.

## Developer Pain Points

- **Long-running task reliability** — Inability to run overnight or multi-day tasks without hangs, especially in automated/headless modes, is a recurring complaint (#8963). MAX_TOKENS recovery corrupting transcripts on resume (#8979) adds to this pain.
- **Regressions in core paths** — Image loading crashes since 0.21.2 (#8957) and tmux rendering flicker (#8562) are concrete regressions affecting daily workflows.
- **Authentication friction** — Vertex AI cannot authenticate via ADC (#9016), and Anthropic wire lacks stream-safety protections (#9005); both block enterprise/Claude users.
- **CLI/help inconsistencies** — `--approval-mode` and `--auth-type` are accepted but missing from `qwen --help` (#8897); the Python SDK rejects `permission_mode="auto"` although the CLI supports it (#9002). Small but annoying discoverability and parity gaps.
- **CI stability and load sensitivity** — Main CI failures (#9015), ENOSPC flakes, and load-sensitive test gates are a recurring source of noise for contributors (#8982, #9001).

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar).*