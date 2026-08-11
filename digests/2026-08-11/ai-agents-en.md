# OpenClaw Ecosystem Digest 2026-08-11

> Issues: 500 | PRs: 500 | Projects covered: 13 | Generated: 2026-08-11 01:22 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [NanoBot](https://github.com/HKUDS/nanobot)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [NanoClaw](https://github.com/qwibitai/nanoclaw)
- [NullClaw](https://github.com/nullclaw/nullclaw)
- [IronClaw](https://github.com/nearai/ironclaw)
- [LobsterAI](https://github.com/netease-youdao/LobsterAI)
- [TinyClaw](https://github.com/TinyAGI/tinyclaw)
- [Moltis](https://github.com/moltis-org/moltis)
- [CoPaw](https://github.com/agentscope-ai/CoPaw)
- [ZeptoClaw](https://github.com/qhkm/zeptoclaw)
- [EasyClaw](https://github.com/gaoyangz77/easyclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest — 2026-08-11

## 1. Today's Overview

OpenClaw is under heavy maintenance load, with 500 issues and 500 PRs updated in the last 24 hours. The backlog remains large, with 410 open issues and 336 open PRs, while 90 issues and 164 PRs were closed or merged, indicating substantial triage activity. The project is in a beta stabilization phase for the 2026.8.1 release line, with multiple release-validation and backport PRs in flight, alongside a major refactor consolidating coercion helpers across the codebase. No new releases were published today; the focus is on regressions introduced in recent betas, particularly around message duplication, silent failures, session state, and auth provider reliability.

## 2. Releases

No new releases published in this window.

## 3. Project Progress

14 PRs were closed/merged, with several closing notable bug and debt items:

- **[PR #121743](https://github.com/openclaw/openclaw/pull/121743)** — Signed a rebased 2026.8.1 beta.2 candidate after the prior staging PR failed release policy, moving the candidate to canonical head for CI evaluation.
- **[PR #120853](https://github.com/openclaw/openclaw/pull/120853)** — Backported session selection behavior to the 2026.8.1 release line so `/model <alias>` and `/<alias>` commands match `main` behavior.
- **[PR #121782](https://github.com/openclaw/openclaw/pull/121782)** — Fixed orphaned subagent delivery polling and delayed yield wakes (verification findings F5/F6).
- **[PR #121767](https://github.com/openclaw/openclaw/pull/121767)** — Burned 35 export-name collision debt entries so one exported spelling maps to one behavior.
- **[PR #121783](https://github.com/openclaw/openclaw/pull/121783)** — Added nameable exported types to test helpers, fixing CI reliability on cold builds.

## 4. Community Hot Topics

- **[Issue #121058 — Silent reply failures still recurring](https://github.com/openclaw/openclaw/issues/121058)** (47 comments, created 2026-08-09): A prior fix (#116277) didn't resolve silent reply failures; a monitoring cron is still logging occurrences. High urgency because it's an unresolved regression in core delivery.
- **[Issue #7707 — Memory Trust Tagging by Source](https://github.com/openclaw/openclaw/issues/7707)** (34 comments, open since 2026-02-03): Long-running feature request to tag memory by trust origin to prevent prompt-injection memory poisoning. The sustained discussion signals it's a high-value roadmap item.
- **[Issue #22438 — Tiered bootstrap file loading](https://github.com/openclaw/openclaw/issues/22438)** (18 comments, open since 2026-02-21): Users want progressive context control to avoid wasting tokens on unused files in large workspaces.
- **[Issue #86519 — Duplicate Telegram replies after 5.20 update](https://github.com/openclaw/openclaw/issues/86519)** (15 comments, closed): Duplicate replies (2–10x per message) were tracked as a P1 regression; upgrades reduced but didn't fully fix.
- **[Issue #27445 — announceTarget for sub-agent routing](https://github.com/openclaw/openclaw/issues/27445)** (12 comments, 5 👍): Request to route sub-agent completion announces to the parent session, enabling multi-step orchestration.

## 5. Bugs & Stability

High-severity regressions remain a dominant theme:

- **P1 — [Silent reply failures still recurring](https://github.com/openclaw/openclaw/issues/121058)**: Core delivery failure persists after a claimed fix, with 47 comments.
- **P1 — [Subagent sessions persist; main session unresponsive](https://github.com/openclaw/openclaw/issues/47975)**: Multiple subagent spawns leave the main session stuck; linked to lifecycle management defects.
- **P1 — [iOS/WebChat messages don't trigger replies](https://github.com/openclaw/openclaw/issues/97983)**: Transcript updates but no assistant delivery; controlled runs also fail with `--deliver`.
- **P1 — [Transcript projection livelock](https://github.com/openclaw/openclaw/issues/115908)**: Sustained writes stall the main thread for tens of seconds, blocking all transports.
- **P1 — [Zombie child processes](https://github.com/openclaw/openclaw/issues/97616)**: Hook/tool child processes are leaked and accumulate, degrading runtime.
- **P1 — [Codex OAuth refresh 10s timeout](https://github.com/openclaw/openclaw/issues/89278)**: OAuth refresh succeeds but the cron/heartbeat path fails with a timeout.
- **P1 — [Gateway cold start regression ~2.5x](https://github.com/openclaw/openclaw/issues/119087)**: 2026.7.2-beta.7 is 2.5x slower than 2026.7.1-beta.1 on 1-vCPU containers.

Several P1 issues have open fix PRs: duplicate Telegram messages (PR #120491 send budget guard), gateway cold start (PR #121299 scoped model refresh), and auth profile quota coupling (PR #121278).

## 6. Feature Requests & Roadmap Signals

- **Per-agent cost budget enforcement** ([#42475](https://github.com/openclaw/openclaw/issues/42475)): Gateway-level daily/monthly caps to prevent runaway spend; likely to land given operator demand.
- **Per-spawn tool restrictions for sub-agents** ([#15032](https://github.com/openclaw/openclaw/issues/15032)): Enables DMZ-style prompt-injection defense; linked PR is open.
- **append mode for write tool** ([#40001](https://github.com/openclaw/openclaw/issues/40001)): Prevents cron sessions from overwriting shared files — a clear data-loss fix likely to be prioritized.
- **Model fallback on context-length exceeded** ([#9986](https://github.com/openclaw/openclaw/issues/9986)): Users expect failover when a model's context is exhausted, not a freeze.
- **Tiered bootstrap file loading** ([#22438](https://github.com/openclaw/openclaw/issues/22438)): Progressive context loading for large workspaces; directly reduces token costs.
- **Context window % in system prompt** ([#38568](https://github.com/openclaw/openclaw/issues/38568)): Agents could self-regulate if they know usage headroom.

## 7. User Feedback Summary

The dominant pain points are reliability in production channels: silent reply drops, duplicate messages across Telegram/Feishu, cron jobs silently timing out, and auth failures that dead-end all traffic. Self-hosted operators report friction with plugin trust boundaries ([#92516](https://github.com/openclaw/openclaw/issues/92516)) and no way to exclude sensitive files from backups ([#40786](https://github.com/openclaw/openclaw/issues/40786)). Users also want more visibility and control: tool-level progress in Slack threads ([#33413](https://github.com/openclaw/openclaw/issues/33413)), suppression of transient tool warnings ([#39406](https://github.com/openclaw/openclaw/issues/39406)), and a config default for `--deliver` in the TUI ([#33102](https://github.com/openclaw/openclaw/issues/33102)). The volume of long-lived, unresolved P1s (some open for months) is a clear source of dissatisfaction.

## 8. Backlog Watch

Long-standing, unresolved items that need maintainer attention:

- **[Issue #7707 — Memory Trust Tagging by Source](https://github.com/openclaw/openclaw/issues/7707)** (open since 2026-02-03, 34 comments): Security-relevant feature with no fix PR; still needs a product decision.
- **[Issue #15032 — Per-spawn tool restrictions](https://github.com/openclaw/openclaw/issues/15032)** (open since 2026-02-12, 7 comments): Important for prompt-injection defense; linked PR open but no maintainer review.
- **[Issue #9986 — Fallback on context length exceeded](https://github.com/openclaw/openclaw/issues/9986)** (open since 2026-02-05, 5 comments): Long-requested reliability fix with no clear owner.
- **[PR #97175 — Context-engine maintenance blocking messages](https://github.com/openclaw/openclaw/pull/97175)** (open since 2026-06-27, stale): P1-labeled fix flagged stale, still needs proof; risks ongoing message blocking in active sessions.
- **[Issue #97616 — Zombie child process leak](https://github.com/openclaw/openclaw/issues/97616)** (open since 2026-06-29, P1): Runtime degradation for long-running gateways; no fix PR yet.

---

## Cross-Ecosystem Comparison

# Cross-Project Ecosystem Comparison Report — 2026-08-11

## 1. Ecosystem Overview

The personal AI assistant open-source landscape remains in a reliability-first phase, with the majority of active projects prioritizing bug fixes, security hardening, and stability over new feature velocity. Cross-project convergence is visible around MCP ecosystem support, session/message integrity, and cost observability, driven by real production failures (token-burning loops, silent message drops, gateway crashes). The sector shows healthy contribution pipelines, with several projects (OpenClaw, CoPaw, ZeroClaw) sustaining 40-50 PRs updated per day and attracting first-time contributors. However, maintainer review bandwidth remains a systemic bottleneck, with multiple high-severity fixes stalling in conflict-flagged queue across nearly every project. Governance automation (size labels, RFC pipelines, doc-truth verification) is emerging as a secondary trend as projects scale past manual processes.

## 2. Activity Comparison

| Project | Issues Updated (24h) | PRs Updated (24h) | PRs Merged/Closed (24h) | Releases (24h) | Open Issues | Open PRs | Health Score* |
|---|---|---|---|---|---|---|---|
| **OpenClaw** | 500 | 500 | 164 | None | 410 | 336 | 6.5/10 |
| **ZeroClaw** | 50 | 50 | 1 | None | — | — | 5.5/10 |
| **IronClaw** | 50 | 50 | — | v1.1.1-rc.1 (prev day) | 25 | 33 | 7.0/10 |
| **CoPaw (QwenPaw)** | 40 | 50 | 19 | None | — | — | 7.5/10 |
| **NanoBot** | — | 23 | 10 | None | — | 13 | 7.0/10 |
| **NanoClaw** | — | — | 10 | None | — | 10 | 7.0/10 |
| **PicoClaw** | 4 | — | 7 | None | — | — | 6.5/10 |
| **LobsterAI** | — | — | 20 | None | — | 14 | 7.5/10 |
| **Moltis** | 3 | 2 | 0 | None | 3+ | 2 | 5.0/10 |
| **EasyClaw** | 0 | 0 | 0 | v1.8.96, v1.8.97 | 0 | 0 | 7.5/10 |
| **NullClaw** | 1 | 1 | 0 | None | — | 1 | 5.5/10 |
| **TinyClaw** | — | — | — | — | — | — | Inactive |
| **ZeptoClaw** | — | — | — | — | — | — | Inactive |

*Health Score is a composite of merge throughput, release cadence, responsiveness to critical issues, and backlog hygiene (scale: 0-10).

## 3. OpenClaw's Position

**Advantages:** OpenClaw's scale dwarfs all peers — 500 issues and 500 PRs touched daily versus 50 for the next-most-active projects — indicating the largest contributor base and community mindshare in the ecosystem. It operates as the de facto reference implementation, with derivatives (ZeroClaw, NanoClaw, PicoClaw, TinyClaw, ZeptoClaw, IronClaw) clearly forking from its architecture. The project maintains active backport/release-stabilization pipelines (2026.8.1 beta line) and burns tech debt systematically (35 export-name collisions resolved in a single PR).

**Technical approach differences:** OpenClaw's architecture is transport-agnostic and heavily channel-integrated (Telegram, Feishu, iOS/WebChat, LINE, Bluesky, Reddit, WhatsApp), whereas peers tend to specialize (Moltis on Apple containers, CoPaw on desktop Tauri + Chinese IME, LobsterAI on Electron cowork). OpenClaw also runs the most sophisticated governance machinery: release-policy checks, verification findings tracking, and tiered triage.

**Community size comparison:** OpenClaw's community is roughly 10x larger by activity volume than the nearest peer. Its pain points scale accordingly — long-lived P1s (some open for months) generate more comments (47 on a single silent-failure issue) than entire projects' daily traffic.

**Weaknesses:** Backlog bloat (410 open issues, 336 open PRs) creates triage latency. Silent-reply failures and duplicate-message regressions persist across releases, eroding user trust. Several P1s lack fix PRs despite being open for months (zombie processes, iOS delivery).

## 4. Shared Technical Focus Areas

| Focus Area | Projects | Specific Needs |
|---|---|---|
| **MCP reliability & modernization** | NanoBot, ZeroClaw, IronClaw, CoPaw, NanoClaw | SDK v2 migration (NanoBot #5179), remote Streamable HTTP servers (NanoClaw #3092/#3221), connection crash isolation (NanoBot #5300), custom CA trust for remote servers (ZeroClaw #9339), tool-name mangling bugs (CoPaw #6405), numeric string coercion (CoPaw #6839), IronHub/custom MCP compatibility (IronClaw 1.1.1-rc.1) |
| **Session/message integrity** | OpenClaw, NanoClaw, CoPaw, ZeroClaw | Silent message drops (OpenClaw #121058, NanoClaw #3226), duplicate deliveries (OpenClaw #86519, NanoClaw #3228), message ID reuse (NanoClaw #3226), session save races (NanoBot #5271), orphaned subagent polling (OpenClaw PR #121782) |
| **Cost & token control** | NanoBot, CoPaw, ZeroClaw, OpenClaw | Runaway task token burn (NanoBot #5324: 10M+ tokens in 23 min), per-agent cost budgets (OpenClaw #42475), bounded sustained-goal continuation (NanoBot #5257), per-model context-window config (ZeroClaw RFC #7100), context-length fallback (OpenClaw #9986), tiered bootstrap loading (OpenClaw #22438) |
| **Security hardening** | ZeroClaw, NanoClaw, PicoClaw, CoPaw, OpenClaw | Knowledge-graph isolation (ZeroClaw S0 #9647), git risk-classifier bypass (ZeroClaw S0 #9627), pairing lockout (ZeroClaw #9389), Telegram pairing code strength (NanoClaw #3225/#3229), remote prompt/exec boundaries (PicoClaw #3297), memory trust tagging (OpenClaw #7707), per-spawn tool restrictions (OpenClaw #15032), antivirus false positives (CoPaw #6847) |
| **Auth provider reliability** | OpenClaw, IronClaw, CoPaw | OAuth refresh timeouts (OpenClaw #89278), Slack reconnect broken states (IronClaw #5882, #6834), qwen-portal-auth config write loops (LobsterAI #1243) |
| **Streaming & UI polish** | OpenClaw, IronClaw, CoPaw, NanoBot | No streaming output (CoPaw #6820), idle CPU burn from CSS animations (CoPaw #6828), working indicators (IronClaw #7446), WebUI streaming stability (IronClaw 1.1.1-rc.1), message repetition during reasoning (NanoBot #5327) |
| **Sub-agent orchestration** | OpenClaw, ZeroClaw | Per-spawn tool restrictions (OpenClaw #15032), announceTarget routing (OpenClaw #27445), DAG-based task planning (ZeroClaw PR #9554), subagent lifecycle defects (OpenClaw #47975) |
| **Provider interoperability** | ZeroClaw, PicoClaw, IronClaw, CoPaw | OpenAI-compatible gateway endpoints (ZeroClaw PR #8486), AI Router presets (PicoClaw #3298), strict-provider wire-format sanitization (CoPaw #6809), slashed model ID prefix preservation (LobsterAI #2452) |
| **Doc-truth & governance automation** | IronClaw, ZeroClaw, OpenClaw | Doc-truth verification pipeline (IronClaw #7317, 5-PR series), PR size label automation (ZeroClaw PR #9867), RFC ratification bottlenecks (ZeroClaw #8692), work-lane governance (ZeroClaw #6808) |

## 5. Differentiation Analysis

| Project | Primary Focus | Target User | Architecture Differentiator |
|---|---|---|---|
| **OpenClaw** | Full-featured general agent | Enterprise/self-hosted operators, power users | Transport-agnostic, massive channel matrix, deep workflow engine; heavyweight and feature-dense |
| **ZeroClaw** | Security-hardened agent | Multi-agent deployments, security-conscious teams | Explicit per-agent knowledge-graph isolation (though flawed per S0 #9647), risk-classified git verbs, rigorous RFC governance |
| **IronClaw** | Stabilized commercial-contract agent | Production teams needing reliable channel integrations | Release-candidate discipline, doc-truth guarantees, CI artifact hygiene; near.foundation affiliation |
| **CoPaw** | Desktop-first agent (Tauri) | Chinese-speaking desktop users, local-first | Native Windows/macOS desktop experience, Chinese IME support, ReMe memory search; broad provider support |
| **NanoBot** | Lightweight agent | Developers, MCP-heavy workflows | WebSocket-first security posture, WebUI refinement focus, active bilingual community (ZH/EN) |
| **NanoClaw** | Reliability-focused agent | Users needing guaranteed message delivery | Same lineage as OpenClaw but with explicit focus on silent-failure elimination, CSPRNG pairing codes |
| **PicoClaw** | Lightweight/edge agent | Raspberry Pi and constrained hardware users | Lower resource footprint, Telegram-first channel rendering |
| **LobsterAI** | Desktop cowork agent | Users wanting integrated file collaboration | Electron-based cowork workspace, right-click file menus, Windows pip shim repair; note: "OpenClaw runtime fixes" suggests it embeds OpenClaw |
| **Moltis** | Framework-level agent runtime | Developers building agent platforms | Apple Container backend specialization; session-management primitives; slow moving |
| **EasyClaw** | Vertical copilot (TK-affiliate) | Affiliate/customer-service operators | Closed distribution, short-iteration releases, no public issue tracker; likely Discord-driven support |

## 6. Community Momentum & Maturity

**Tier 1 — High velocity, active stabilization (daily 20+ PR merges, release engineering active):** OpenClaw (β stabilization, massive triage), CoPaw (v2.1.0 pre-release hardening, 19 merges/24h), LobsterAI (20 merges/24h, active dependency modernization), IronClaw (patch RC shipped, 50 PRs/day).

**Tier 2 — Moderate velocity, feature/refactor phase (5-15 PR merges/day, targeted fixes):** NanoBot (WebUI refactor, MCP focus), NanoClaw (coordinated bug-fix sprint, refactoring), PicoClaw (maintenance, Telegram/i18n), ZeroClaw (security-audit response, but merge velocity constrained by review capacity — 1 merge/24h on 50 PRs touched).

**Tier 3 — Low activity, maintenance mode:** NullClaw (minimal daily touch, two-month-old dep PR untouched), Moltis (stalled feature PR 4+ months, no merges), EasyClaw (shipping releases but zero GitHub community surface).

**Tier 4 — Inactive:** TinyClaw, ZeptoClaw (no activity in 24h window; potential zombie projects).

**Notable cross-cutting pattern:** ZeroClaw's low merge-to-activity ratio (1 merge on 50 PRs touched) vs OpenClaw's high throughput (164 on 500) suggests either stricter review standards or serious maintainer bandwidth constraints — worth watching, as security-critical S0 issues (knowledge-graph isolation) sit there without fix PRs.

**Dependabot hygiene is a universal lagging indicator:** NullClaw (2-month-old Alpine bump), Moltis (build failures from stale URLs), LobsterAI (major-version cluster blocked in review), and OpenClaw's backport pressure all show dependency management is under-invested across the ecosystem.

## 7. Trend Signals

1. **MCP has crossed from "nice-to-have" to "production-critical infrastructure"** — Every major project is actively working on MCP reliability, from SDK migrations to crash isolation to auth flows, while users are adopting remote/cloud MCP servers at scale. Interop bugs (tool-name mangling, numeric coercion) are now top pain points. **Value for developers:** MCP is the de facto tooling standard; investing in MCP-first agent design is mandatory, and providers should expect strict wire-format compliance.

2. **Cost visibility and runaway-spend prevention is a top-3 user demand** — The NanoBot incident (10M+ tokens in 23 min, half a month's quota) crystallized a systemic fear. Cross-project demand includes per-agent budgets, sustained-goal caps, per-model context-window config, and token-usage records APIs. **Value:** Building cost-aware agents (budget enforcement, fallback on context exhaustion, bounded loops) is not just a feature — it is a trust requirement for commercial adoption.

3. **Silent failures are the #1 trust killer** — Across OpenClaw, NanoClaw, CoPaw, and ZeroClaw, the most damaging bugs are those where "the user never gets a reply" (NanoClaw's "indistinguishable from the agent ignored me" framing, OpenClaw's P1 reply drops). The market is moving toward fail-loud designs: explicit user-facing warnings when messages are dropped, non-silent tool-failure feedback, and mandatory delivery receipts. **Value:** For agent developers, treating silent failures as P0-class defects and instrumenting every delivery path with observability is a differentiator.

4. **Security boundaries lag behind multi-agent architecture** — ZeroClaw's knowledge-graph isolation gap (S0) and OpenClaw's long-running trust-tagging request highlight that multi-agent deployments are happening before the security models are ready. Per-spawn tool restrictions, memory trust attribution, and channel-level authorization are recurring asks. **Value:** For platform builders, security boundaries (not just capabilities) will decide which agent frameworks enterprises adopt.

5. **Bilingual (Chinese/English) communities are becoming the norm** — CoPaw, NanoBot, and LobsterAI all have active Chinese-speaking users filing detailed reports; CoPaw's IME crash blocks a whole language community from its primary input path. **Value:** Agents targeting global markets need first-class CJK IME handling and East-Asian channel/DM integrations, not afterthought localization.

6. **Governance is scaling pain** — ZeroClaw's RFC queue bottleneck, IronClaw's doc-truth pipeline, and OpenClaw's debt-burning approach represent an industry-wide push to systematize how agent-project decisions are made and documented. **Value:** As agent tooling matures, projects with clear governance and doc-verification will outlast those with ad-hoc maintenance.

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

## NanoBot Project Digest — 2026-08-11

### 1. Today's Overview

NanoBot shows strong, sustained development velocity with 23 PRs updated in the last 24 hours and 10 merged/closed, indicating an active maintainer and contributor pipeline. The project is in a refinement phase: substantial refactoring work landed across the WebUI (settings architecture, WebSocket mutation security), along with targeted bug fixes (no-op file edits, background session save races, Weixin QR login). The MCP ecosystem remains the hottest area, with a major SDK v2 migration PR still open and critical bug reports around MCP connection failures. Three of four issues were closed today, showing responsive maintainer engagement, though the 13 open PRs — several flagged with conflicts — represent a growing queue that may strain review bandwidth.

### 2. Releases

No new releases published in the last 24 hours.

### 3. Project Progress

Ten PRs merged or closed, reflecting significant forward motion:

- **WebUI Security Hardening** — PR #5317 moves all WebUI state-changing mutations from GET/query-string requests onto the authenticated WebSocket connection (bridge rejects unauthenticated mutations), closing a P1 security gap. PR #5319 replaces reflective runtime-state access with an explicit `RuntimeControl` protocol, including credential redaction.
- **WebUI Architecture Refactor** — PR #5321 makes the gateway the owner of settings services with serialized atomic RMW operations; PR #5318 extracts deterministic event projection helpers with shared fixtures; PR #5315 improves UX recovery, empty states, and auth challenge flow.
- **Agent/File Integrity** — PR #5325 closes issue #5324 by rejecting `edit_file` calls with identical old/new text, preventing the token-burning infinite loop.
- **Weixin Provider Fix** — PR #5310 fixes forced QR login to perform a genuinely fresh QR flow instead of restoring stale credentials.

### 4. Community Hot Topics

- **Issue #5297 — MCP OAuth web authorization** (bilingual, [3 comments](https://github.com/HKUDS/nanobot/issues/5297), closed): User needs to configure MCP servers requiring webpage authorization (e.g., Xmind) and proposes gateway-mediated authorization for remote access. Closed by PR #5316 (browser OAuth for remote servers).
- **Issue #5324 — Dream memory infinite loop** ([2 comments](https://github.com/HKUDS/nanobot/issues/5324), closed): Detailed bilingual report of a 23-minute runaway task consuming 10M+ tokens; root cause identified as no-op `edit_file` acceptance, fixed in PR #5325. High user visibility due to resource cost.
- **PR #5179 — MCP SDK v2 migration** (open, pending): Long-running effort to migrate MCP integration to v2, currently flagged with conflicts; touches critical transport paths. This is the single highest-leverage PR in the open queue.

The underlying need across these items: production reliability of the MCP plugin ecosystem (auth, failure isolation, SDK currency) is the community's top concern.

### 5. Bugs & Stability

Ranked by severity:

1. **Dream memory infinite loop** (#5324, closed, fix merged: #5325) — **P0-class**: unbounded token consumption (10M+ tokens, ~half-month quota) in a 23-minute runaway session. Root cause (no-op edits accepted) fixed and regression-tested.
2. **MCP connection failure crashes gateway** (#5300, closed) — **P0-class**: Remote MCP HTTP 530 triggers `RuntimeError: Attempted to exit cancel scope...`, crashing the gateway process with leaked tasks, CPU spikes, and no failure isolation. Closed within 2 days; fix likely in the pending SDK v2 migration (#5179).
3. **Message repetition during reasoning** (#5327, open, new) — **P1**: Random duplicate phrase output ("Good points, let me investigate...") during reasoning; moderate user-visible noise, no fix PR yet.
4. **Stale background task overwrites session data** (#5271, open with P0 priority label): `/new` during an in-flight `chat_with_retry` can cause background title generation to clobber fresh session state; fix PR has conflict flags and needs finalization.
5. **Sustained-goal unbounded continuation** (#5257, open): active goals bypass `_MAX_INJECTION_CYCLES`, letting models burn tokens on idle loops; fix PR exists but shows conflict status.

### 6. Feature Requests & Roadmap Signals

- **Browser OAuth for remote MCP servers** — landed in PR #5316 (closed) with one-click presets for Xmind, Notion, Linear. This directly addresses issue #5297 and will likely appear in the next release.
- **OrcaRouter as a named gateway provider** — PR #5328 (open) adds a multi-model routing gateway with zero-trust security; a quick, self-contained provider addition that could merge soon.
- **Tabbed workbench UI** — PR #5322 (open) introduces Tab/Pane multi-session layouts with drag-to-tab grouping; a significant UX evolution that is more likely mid-term.
- **Structured token usage records** — PR #5299 (open) persists per-day token usage records with an authenticated API endpoint, directly enabling user-side cost auditing (valuable given the #5324 token-burn incident).

### 7. User Feedback Summary

Users are running NanoBot in production-like conditions and hitting real resource-cost issues: one user lost half a month's token quota to a single runaway loop (#5324), and another's gateway process crashed with CPU spikes due to unisolated MCP failures (#5300). Chinese-speaking users are active and filing detailed bilingual reports, a sign of a growing international community. Demand clusters around MCP ecosystem reliability (auth flows, connection isolation, SDK version currency), plus cost observability (token usage records PR). The Dream memory feature generates enthusiasm but requires guardrails. The community's persistence on the MCP SDK v2 migration (#5179, 12 days open) and quick maintainer turnaround (2-day close on the Dream loop) suggest a healthy, responsive project with high user trust.

### 8. Backlog Watch

- **PR #5179 — MCP SDK v2 migration** (open since 2026-07-30, conflict-flagged): Core dependency upgrade blocking other MCP fixes; needs conflict resolution and review priority.
- **PR #5271 — Session save race fix** (P0-labeled, conflict-flagged): Addresses data-loss scenario; high priority label but conflict status is stalling it.
- **PR #5257 — Bounded sustained-goal continuation** (P2, conflict-flagged): Cost-control fix; risks being lost in the queue.
- **Issue #5327 — Message repetition while reasoning** (open, 0 comments, new): No maintainer response yet; likely a lower-severity but user-visible annoyance worth triaging.
- **PR #5323 — Settings backend split by domain** (open, conflict-flagged): One of three interrelated WebUI refactoring PRs from the same contributor; conflicts need reconciliation to avoid drift between them.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-08-11

## 1. Today's Overview

ZeroClaw shows a heavily active development cycle with 50 issues and 50 PRs updated in the last 24 hours, though no new releases were published. The project is mid-RFC-ratification on workflow governance (#6808), while a substantial security audit wave from late July (issues #9389–#9397) remains in-progress across multiple channels including LINE, Bluesky, Reddit, and WhatsApp. The backlog contains multiple S0/S1-severity security bugs still awaiting fixes, particularly around knowledge-graph isolation (#9647), git write-verb policy bypass (#9627), and unauthenticated pairing lockout (#9389). Only one PR was merged/closed in the period (#8301, a hardware test-only change), suggesting velocity is constrained by review capacity rather than contribution volume, with many PRs flagged `needs-author-action`.

## 2. Releases

No new releases were published in the last 24 hours. The project remains at v0.8.3, with RFC #6808 tracking rollout toward 0.8.0-beta-1+.

## 3. Project Progress

Only one PR was closed/merged in the last 24 hours:

- **[PR #8301 — test(hardware): cover catalog tool name format](https://github.com/zeroclaw-labs/zeroclaw/pull/8301)** (closed): Adds a regression test ensuring all catalog tool names are lower_snake_case ASCII identifiers. Test-only change, no production code affected.

Notable PRs currently open with significant feature work:

- **[PR #8486 — feat(gateway): add OpenAI chat completions endpoint](https://github.com/zeroclaw-labs/zeroclaw/pull/8486)**: Adds an OpenAI-compatible REST endpoint to the gateway, enabling integration with LangChain, Continue.dev, Aider, and the OpenAI SDK. Large surface (size:XL), high risk.
- **[PR #9182 — feat(runtime): support PowerShell as the native shell on Windows](https://github.com/zeroclaw-labs/zeroclaw/pull/9182)**: Routes `powershell`/`pwsh` through `-NoProfile -NonInteractive -Command` on Windows, preserving `cmd.exe` as default.
- **[PR #9002 — fix(gateway): keep agent turns alive after viewer disconnect](https://github.com/zeroclaw-labs/zeroclaw/pull/9002)**: Detaches dashboard WebSocket as viewer/controller so navigation or network loss does not cancel running agent turns.
- **[PR #9013 — refactor(config)!: move TodoWrite display config from the daemon into zerocode](https://github.com/zeroclaw-labs/zeroclaw/pull/9013)**: Breaking change moving display-only config to the client side.
- **[PR #9867 — ci(labels): automate PR size labels](https://github.com/zeroclaw-labs/zeroclaw/pull/9867)**: Adds a CI workflow and Python classifier to auto-calculate `size:*` labels on PR updates, complementing issue #9345.

## 4. Community Hot Topics

The most active discussions (by comment count) reveal a community focused on governance, security hardening, and config semantics:

- **[Issue #6808 — RFC: Work Lanes, Board Automation, and Label Cleanup](https://github.com/zeroclaw-labs/zeroclaw/issues/6808)** (23 comments): Governance RFC covering work routing, board automation, and label conventions. Under discussion for nearly three months, with ratification deferred while rollout proceeds. Indicates maintainers are actively revising contribution and review workflows.
- **[Issue #7100 — RFC: Per-model capability & context-window config](https://github.com/zeroclaw-labs/zeroclaw/issues/7100)** (13 comments): Proposes explicit `vision` and `context_window` fields per model alias to fix misreported capability and incorrect 32k fallback. Addresses a common operator pain point with provider defaults.
- **[Issue #8692 — Maintainer decision queue for RFCs and design issues](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)** (12 comments): Tracker issue to centralize pending maintainer decisions. Useful signal that the RFC pipeline is a bottleneck.
- **[Issue #9397 — RFC: Treat empty WhatsApp Web `allowed_groups` as permit-none](https://github.com/zeroclaw-labs/zeroclaw/issues/9397)** (12 comments): Security RFC from the July audit wave. Proposes fail-closed default for WhatsApp group allowlists; currently an empty list admits all groups.
- **[Issue #9530 — RFC: Define risk precedence for test-only changes in high-risk paths](https://github.com/zeroclaw-labs/zeroclaw/issues/9530)** (7 comments): Conflicting docs on how to label test-only changes in high-risk paths. Governance cleanup item affecting contributor experience.
- **[PR #8546 — fix(cli): localize status fragments](https://github.com/zeroclaw-labs/zeroclaw/pull/8546)** (open, `stale-candidate`): 32 days without author response; the most commented-on PR with review feedback pending.

**Underlying community needs**: The volume of governance-focused issues (work lanes, risk-label precedence, RFC streamlining) suggests the project is scaling past what manual maintainer processes can handle. The security audit wave (issues #9389–#9397 by belumume) has produced a consistent set of high-quality findings that the community is actively tracking, indicating a security-conscious contributor base.

## 5. Bugs & Stability

New and active bugs by severity:

**S0 — Data loss / security risk:**

- **[Issue #9647 — Knowledge graph has no per-agent attribution](https://github.com/zeroclaw-labs/zeroclaw/issues/9647)**: Any agent can read/mutate another agent's knowledge. In-progress, high risk, no fix PR yet.
- **[Issue #9627 — git write verbs bypass the risk classifier via global options](https://github.com/zeroclaw-labs/zeroclaw/issues/9627)**: `-C` and `--git-dir` let unsafe git verbs evade the approval gate. In-progress, no fix PR.
- **[Issue #9855 — Matrix channel fails `.well-known/matrix/client` delegation](https://github.com/zeroclaw-labs/zeroclaw/issues/9855)**: Homeserver API base URL built directly from config, bypassing standard discovery. Accepted, no fix PR yet. Affects Matrix users on delegated homeservers.

**S1 — Workflow blocked:**

- **[Issue #9207 — web_fetch returns garbage for compressed responses](https://github.com/zeroclaw-labs/zeroclaw/issues/9207)**: gzip/brotli/deflate responses are not decompressed, yielding unusable binary data. In-progress, no fix PR.
- **[Issue #9425 — Running SOP jobs have no operator cancellation path](https://github.com/zeroclaw-labs/zeroclaw/issues/9425)**: Dashboard can list but not stop running SOPs. In-progress, no fix PR.
- **[Issue #9035 — Docker Compose gateway can remain loopback-bound behind a published port](https://github.com/zeroclaw-labs/zeroclaw/issues/9035)**: Connection refused despite proper bridging. In-progress, no fix PR.
- **[Issue #9779 — sops_dir documented default is not honoured by the daemon](https://github.com/zeroclaw-labs/zeroclaw/issues/9779)**: SOPs silently never load when relying on the documented default. Accepted, high risk, no fix PR. New in last few days.
- **[Issue #9393 — Bluesky and Reddit have no sender authorization](https://github.com/zeroclaw-labs/zeroclaw/issues/9393)**: No gate covers these channels. In-progress.
- **[Issue #9395 — plugin wasi:http egress has no destination policy](https://github.com/zeroclaw-labs/zeroclaw/issues/9395)**: No config knob for egress restrictions. In-progress.

**S2 — Degraded behavior:**

- **[Issue #9768 — daemon reload is not on SIGUSR1; degraded-security warning sends a signal that kills the daemon](https://github.com/zeroclaw-labs/zeroclaw/issues/9768)**: Docs tell operators to do the wrong thing. Accepted.
- **[Issue #9796 — cron parent help prints invalid add-at/add-every/once examples](https://github.com/zeroclaw-labs/zeroclaw/issues/9796)**: Accepted, low risk.
- **[Issue #8999 — ZeroCode streamed user turns look like log/API payloads to small local models](https://github.com/zeroclaw-labs/zeroclaw/issues/8999)**: Ollama/llama3.2 misinterprets greetings as protocol data. In-progress.

**S3 — Minor:**

- **[Issue #9844 — dashboard CPU metric does not identify the measured process](https://github.com/zeroclaw-labs/zeroclaw/issues/9844)**: Accepted, low risk.

**Security audit findings still in-progress (no fix PRs):** #9389 (pairing lockout on attacker-controlled header), #9391 (command audit logging enabled but writes nothing), #9392 (LINE group messages skip allowlist and pairing).

**Fix PRs that exist for related issues:** PR #9110 (Lark constant-time comparison), PR #8713 (SSRF gate for file_download), PR #9900 (OpenAI Codex non-streaming retry fix, new).

## 6. Feature Requests & Roadmap Signals

Strong signals for what is coming next:

- **OpenAI-compatible gateway** (PR #8486): Large PR to expose Chat Completions protocol over the gateway. High demand — integrates with the broader LLM tool ecosystem.
- **DAG-based task planning** (PR #9554): New `dag_plan_execute` tool for sequential/parallel task plans with template-based definitions. Suggests movement toward more structured agent workflows.
- **Per-model capability and context-window config** (RFC #7100): Explicit `vision` and `context_window` fields per model alias. Likely in next minor release given P1 priority and accepted status.
- **PR size/risk label automation** (PR #9867 + issue #9345): CI will auto-calculate size labels from diff metadata. Governance automation continues.
- **PowerShell as native Windows shell** (PR #9182): Addresses Windows parity; likely to land after review.
- **Hailo-Ollama native provider** (PR #9109): Dedicated provider for Hailo-Ollama `/api/chat` and `/api/tags`. Niche hardware enablement.
- **Custom CA trust for remote MCP servers** (issue #9339): Accepted direction, in-progress. Likely in a future 0.9.x.
- **Single-message progress drafts for Matrix** (PR #8443): Editable progress drafts per turn for Matrix. Large PR, awaiting author action.

## 7. User Feedback Summary

- **Security concerns dominate**: Multiple users (belumume, metalmon) filed detailed, line-cited security audits. The knowledge-graph isolation issue (#9647) was rated S0 by the reporter, indicating trust boundaries are a real concern for multi-agent deployments.
- **Windows users need better shell support**: PR #9182 directly addresses a long-standing gap; community interest is implied by the principal-contributor effort.
- **Small local models are being used in production**: Issue #8999 (Ollama + llama3.2 misinterpreting ZeroCode Chat turns) suggests users are running ZeroCode against modest local hardware and hitting format/labeling problems.
- **Operators are hitting silent config failures**: Issue #9779 (SOPs silently never load) and issue #9035 (Docker gateway unreachable) both caused confusing, hard-to-diagnose behavior. These erode trust in default configurations.
- **Web dashboard UX issues**: WebChat auto-scroll overriding manual scroll during streaming (#9562) and missing SOP cancellation (#9425) are both active complaints.
- **External tool interoperability is a theme**: The OpenAI-compatible endpoint (PR #8486) and MCP custom CA support (#9339) reflect real demand for ZeroClaw to work as part of a larger toolchain.

## 8. Backlog Watch

Items needing maintainer attention, ordered by urgency:

- **[Issue #9647 — Knowledge graph has no per-agent attribution (S0)](https://github.com/zeroclaw-labs/zeroclaw/issues/9647)**: Open since Aug 1, high risk, no assignee, no fix PR. Data isolation is core to multi-agent safety.
- **[Issue #9627 — git write verbs bypass risk classifier (S0)](https://github.com/zeroclaw-labs/zeroclaw/issues/9627)**: Open since Aug 1, high risk, in-progress label but no visible fix.
- **[Issue #9389 — unauthenticated POST /api/pair keys lockout on attacker-supplied header](https://github.com/zeroclaw-labs/zeroclaw/issues/9389)**: Open since Jul 26. The pairing endpoint is a security boundary; this weakens brute-force protection.
- **[Issue #9391 — command audit logging defaults to enabled and writes nothing](https://github.com/zeroclaw-labs/zeroclaw/issues/9391)**: Open since Jul 26. Silent security-control failure — operators believe audit logs exist when they do not.
- **[Issue #9035 — Docker Compose gateway loopback-bound](https://github.com/zeroclaw-labs/zeroclaw/issues/9035)**: Open since Jul 13. Common deployment path broken for some users; no reproducer comment yet.
- **[PR #8546 — fix(cli): localize status fragments](https://github.com/zeroclaw-labs/zeroclaw/pull/8546)**: Open since Jun 30, flagged `stale-candidate` and `needs-author-action`. Small i18n fix that has been waiting over a month for author response.
- **[PR #8576 — env-var fallback for OpenAI STT credentials](https://github.com/zeroclaw-labs/zeroclaw/pull/8576)**: Open since Jul 1, `stale-candidate`. Fixes a real config gap; blocked on author action.
- **[Issue #9383 — npm audit failed with 6 high/critical findings](https://github.com/zeroclaw-labs/zeroclaw/issues/9383)**: Open since Jul 26, P1, no fix PR. Dependency vulnerability in the web/CI surface.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

## Today's Overview

PicoClaw shows a moderately active maintenance cycle with 7 PRs merged/closed and 4 issues updated in the last 24 hours, though no releases were cut. The project is processing a backlog of stale items from late July and early August, with several fixes landing for Telegram rendering, lockfile integrity, and security hardening. Two open PRs await review, including a fix for the stuck-agent tool loop issue and a shell allow-pattern bug. Existing issues cluster around agent dispatch rules, model listing, and silent tool failure behavior.

## Releases

No new releases were published in the last 24 hours.

## Project Progress

Seven PRs were merged or closed, showing progress across several domains:

- **feat(telegram): render tables with native rich messages** ([#3327](https://github.com/sipeed/picoclaw/pull/3327)) — merged; Telegram replies now render GFM tables and supported HTML `<table>` blocks as native rich messages instead of monospaced code blocks.
- **fix(web): remove duplicate pnpm lock entries** ([#3326](https://github.com/sipeed/picoclaw/pull/3326)) — merged; removes duplicate `semver@7.8.5` mappings that broke `pnpm install --frozen-lockfile`.
- **fix(security): harden remote prompt and exec boundaries** ([#3297](https://github.com/sipeed/picoclaw/pull/3297)) — merged; enforces origin policy at exec time, defaults remote exec to disabled, migrates configs to schema v4.
- **fix(channels): prevent SplitMessage hang on oversized fence headers** ([#3295](https://github.com/sipeed/picoclaw/pull/3295)) — merged; fallback to bounded raw split so progress is always made.
- **i18n: complete Czech code wrap labels** ([#3296](https://github.com/sipeed/picoclaw/pull/3296)) — merged.
- **fix: merge PR #1466 #1465** ([#1547](https://github.com/sipeed/picoclaw/pull/1547)) — closed.
- **feat(config): support model-specific max_tokens and fix config key co…** ([#2132](https://github.com/sipeed/picoclaw/pull/2132)) — closed; decouples Lookup Key from Runtime ID for model overrides.

## Community Hot Topics

- **Issue #3301** ([link](https://github.com/sipeed/picoclaw/issues/3301)) — `/clear` and session auto-compression fail for chats routed to non-default agents via dispatch rules. 3 comments; the interaction between dispatch routing and session lifecycle appears confusing to users.
- **Issue #3298** ([link](https://github.com/sipeed/picoclaw/issues/3298)) — Request to add AI Router as a named OpenAI-compatible provider preset. 2 comments; maintainer of AI Router offered to contribute the preset. Closed.
- **Issue #3294** ([link](https://github.com/sipeed/picoclaw/issues/3294)) — `/list models` only shows the current model, not all configured models. 2 comments; user expects the command to reflect the full configured `model_list`. Closed.
- **Issue #3311** ([link](https://github.com/sipeed/picoclaw/issues/3311)) — Silent tool failure loops where identical errors repeat up to `max_tool_iterations` with no answer delivered. 1 comment; correlates directly with open fix PR #3312.

## Bugs & Stability

Ranked by severity:

1. **Silent tool failure loops** ([#3311](https://github.com/sipeed/picoclaw/issues/3311)) — High severity. A turn can spin for minutes with the same failing tool call (e.g., `git` without credentials) before hitting `max_tool_iterations`, and the user never receives a reply. Fix PR [#3312](https://github.com/sipeed/picoclaw/pull/3312) is open.
2. **`customAllowPatterns` ineffective in `guardCommand`** ([#3314](https://github.com/sipeed/picoclaw/pull/3314)) — Medium severity. Default deny patterns take precedence, blocking commands like `git push` even when explicitly allow-listed. Open PR addresses this.
3. **SplitMessage hangs on oversized fence headers** ([#3295](https://github.com/sipeed/picoclaw/pull/3295)) — Medium severity. Regression fix merged with bounded raw split fallback.
4. **`/list models` shows only current model** ([#3294](https://github.com/sipeed/picoclaw/issues/3294)) — Low severity. CLI mismatch between expectation and output; closed.
5. **`/clear` and auto-compression fail with dispatch routing** ([#3301](https://github.com/sipeed/picoclaw/issues/3301)) — Low severity. Session behaviors break for non-default agent chats; still open.

## Feature Requests & Roadmap Signals

- **Named AI Router provider preset** ([#3298](https://github.com/sipeed/picoclaw/issues/3298)) — Users want more ready-made provider presets beyond generic `openai`; AI Router maintainer volunteered the contribution. Low effort, high convenience value; the project was receptive.
- **Model-specific `max_tokens` overrides** ([#2132](https://github.com/sipeed/picoclaw/pull/2132)) — Config key decoupling and granular overrides shown to work; closed but carries road-mappable capability.
- **Native rich table rendering in Telegram** ([#3327](https://github.com/sipeed/picoclaw/pull/3327)) — Merged; indicates an active push toward richer channel message types (tables, structured content) rather than code blocks.

## User Feedback Summary

- Users on constrained hardware (Raspberry Pi) and real-world channels (Telegram, Discord) are hitting reliability boundaries: silent agent loops and session state quirks undermine trust in the assistant as a dependable operator.
- There's active interest in provider interoperability (AI Router preset) and configurability (model-specific limits, allow patterns), suggesting power users treat PicoClaw as a general-purpose agent platform rather than a chat toy.
- Shell command allow-list behavior (#3314) generated a bug-report-plus-fix from the same author, showing engaged troubleshooting but also frustration that "according to the tests it should have worked."
- Community contributions remain steady across security, i18n, and channel rendering — a healthy signal for project momentum.

## Backlog Watch

- **PR #3314** ([link](https://github.com/sipeed/picoclaw/pull/3314)) — Fix for `customAllowPatterns` not working; open 8 days, no comments. Affects shell command execution for agent workflows; needs maintainer review.
- **PR #3312** ([link](https://github.com/sipeed/picoclaw/pull/3312)) — Fix for silent tool failure loops; open 9 days. No interaction since creation; high user impact documented in issue #3311.
- **Issue #3301** ([link](https://github.com/sipeed/picoclaw/issues/3301)) — Open 13 days; dispatch-rule routing breaks `/clear` and auto-compression. No fix PR linked; may require architecture-level work on session binding.
- **Issue #3311** ([link](https://github.com/sipeed/picoclaw/issues/3311)) — Open 9 days; documented in production over Telegram. Untriaged; fix is ready in PR #3312 but unmerged.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

**1. Today's Overview**

NanoClaw is in a high-velocity development and hardening phase. Activity is heavily concentrated on reliability fixes, with 10 PRs merged/closed and 10 still open in the last 24 hours. The project is addressing critical issues around silent message loss, security hardening for Telegram pairing, and large-scale refactoring of the host/container architecture. Despite the lack of new releases, the core team is aggressively merging refactors and bug fixes, indicating a strong push toward codebase hygiene and stability rather than feature velocity. The presence of multiple overlapping PRs touching the same areas (e.g., Telegram, session DB) suggests a coordinated bug-fixing sprint.

**2. Releases**

No new releases were published in the last 24 hours.

**3. Project Progress**

The project closed 10 PRs today. Merged efforts are heavily weighted toward refactoring and hygiene, with notable exceptions being direct stability fixes.

- **Refactoring (Merged):** A series of PRs by zvi-fried landed, integrating cleaner architecture seams for skills and host services: `refactor(host): unify module lifecycle hooks` ([#3214](https://github.com/nanocoai/nanoclaw/pull/3214)), `refactor(db): add module migration registry` ([#3212](https://github.com/nanocoai/nanoclaw/pull/3212)), `refactor(channels): register question renderers` ([#3213](https://github.com/nanocoai/nanoclaw/pull/3213)), and `refactor: add host seams for skill-owned capabilities` ([#3186](https://github.com/nanocoai/nanoclaw/pull/3186)).
- **Docs:** A documentation PR defining a single-responsibility integration rule for skills was merged ([#3211](https://github.com/nanocoai/nanoclaw/pull/3211)).
- **Stability/Permissions:** A critical fix redacting DM resolution logs was merged to prevent leaking user IDs and handles into logs ([#3215](https://github.com/nanocoai/nanoclaw/pull/3215)), followed by an enhancement to make these privacy-safe logs opt-in ([#3222](https://github.com/nanocoai/nanoclaw/pull/3222)).
- **Feature (Core):** A significant fix to deduplicate turn-scoped chat delivery was merged, addressing a potential duplicate-message bug within a single agent turn ([#3228](https://github.com/nanocoai/nanoclaw/pull/3228)).
- **Closed:** A PR regarding Telegram and container environment variables was closed without merging ([#3219](https://github.com/nanocoai/nanoclaw/pull/3219)), and a documentation note on `install_packages` limitations was closed ([#3216](https://github.com/nanocoai/nanoclaw/pull/3216)).

**4. Community Hot Topics**

The most active conversation is centered on the integrity of inbound message handling.

- [#3226](https://github.com/nanocoai/nanoclaw/issues/3226) **Inbound messages silently dropped when a platform reuses a message id:** This issue defines the root cause of a major reliability concern. It is a direct bug report from a user (dweekly) and links to a corresponding fix PR. The underlying need is for absolute reliability in message ingestion; users cannot tolerate "silent ignores" from their AI assistant without any feedback loop.
- [#3075](https://github.com/nanocoai/nanoclaw/issues/3075) **Silent log loss + duplicate-insert errors:** This older issue (created 2026-07-17, updated 2026-08-10) remains open and is likely related to the session-DB bug addressed by the community. The extended lifecycle of this issue suggests it is a complex, systemic problem that took time to isolate and address.

**5. Bugs & Stability**

Three distinct bugs, clustered around data integrity and security, are the focus of the day.

- **High Severity:** **Session DB message loss** ([#3226](https://github.com/nanocoai/nanoclaw/issues/3226)). Platform ID reuse causes inbound messages to be dropped before reaching the agent. This is the "worst" class of bugs because it is silent and causes total failure of the assistant's response. A fix PR exists and is open ([#3224](https://github.com/nanocoai/nanoclaw/pull/3224)).
- **High Severity:** **Silent log loss and duplicate inserts after long uptime** ([#3075](https://github.com/nanocoai/nanoclaw/issues/3075)). This encompasses a similar data-loss scenario as #3226, plus a claim of logging failure after long uptimes. The connection to #3226 suggests these are two manifestations of the same underlying session-database robustness issue.
- **Medium Severity:** **Scheduled-task errors are silently dropped** ([#3223](https://github.com/nanocoai/nanoclaw/issues/3223)). When a scheduled task fails, the error message is unroutable and gets dropped. This is a visibility problem—operators are never notified of failures, undermining the reliability of automation.
- **Security Fix:** **Predictable Telegram pairing codes** ([#3229](https://github.com/nanocoai/nanoclaw/pull/3229), ([#3225](https://github.com/nanocoai/nanoclaw/pull/3225))). Two PRs address the weakness of 4-digit Math.random() codes and permissive file permissions, upgrading to a CSPRNG and 6-digit codes. This is a critical security hardening step for the Telegram channel.

**6. Feature Requests & Roadmap Signals**

There are strong roadmap signals pointing toward a unified "Agent Plugin" format and broader MCP compatibility.

- **Agent Templates → Agent Plugins:** PR #3220 ([#3220](https://github.com/nanocoai/nanoclaw/pull/3220)) is a major engine change that converts the "template" feature from a simple directory into a formalized "Agent Plugin 1.0.0" format, including security hardening for stamp-time symlinks and secrets. This suggests a push toward a more robust and official plugin ecosystem.
- **Remote MCP Server Support:** Two linked PRs are working to add support for remote Streamable HTTP MCP servers ([#3092](https://github.com/nanocoai/nanoclaw/pull/3092), [#3221](https://github.com/nanocoai/nanoclaw/pull/3221)), extending support from local stdio-only processes to remote cloud-hosted MCP servers. This is a significant modernization for integrating external tools.

**7. User Feedback Summary**

User feedback is currently centered on critical reliability pain points rather than feature requests.

- **"The agent ignored me" is unacceptable:** Issues [#3226](https://github.com/nanocoai/nanoclaw/issues/3226) and [#3075](https://github.com/nanocoai/nanoclaw/issues/3075) highlight that users are experiencing silent message loss, which erodes trust in the system. The phrasing in #3226 directly captures this: *"From the user's side this is indistinguishable from 'the agent ignored me'."* This indicates a demand for either guaranteed delivery or, at minimum, a user-visible warning when a message is dropped.
- **Scheduled automation needs visibility:** Issue [#3223](https://github.com/nanocoai/nanoclaw/issues/3223) reflects a need for operators to have reliable feedback on automated workflows. Silent failure in scheduled tasks is seen as a major operational blind spot.
- **Security in community channels:** The multiple PRs addressing Telegram pairing code security ([#3225](https://github.com/nanocoai/nanoclaw/pull/3225), [#3229](https://github.com/nanocoai/nanoclaw/pull/3229)) signal a community-driven attention to security hardening for public-facing channels.

**8. Backlog Watch**

- **Issue #3075 ([#3075](https://github.com/nanocoai/nanoclaw/issues/3075)):** The "Silent log loss + inbound message duplicate-insert errors" issue remains one of the highest-signal bugs. While PR #3224 likely fixes the duplicate-insert component, the "silent log loss" part of the issue remains unresolved and may require separate investigation.
- **PR #2909 ([#2909](https://github.com/nanocoai/nanoclaw/pull/2909)):** The long-running PR for the setup wizard template flow has been open since July. While PR update activity is present, it remains unmerged alongside the related "Agent Plugin" format change (PR #3220). These two large features are likely blocking each other and will require careful coordination to land. This long approval time may indicate a need for maintainer attention to unblock the feature.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

## NullClaw Project Digest — 2026-08-11

### 1. Today's Overview

NullClaw's activity over the last 24 hours is minimal, with two items touched: one long-standing issue was closed, and one dependency update PR (Dependabot) received attention. The issue closure (#700) resolves a feature request from March to add an `a2a_call` client tool, which is a significant, albeit long-delayed, milestone for the project's A2A interoperability story. The only other movement is a routine Alpine base image bump for Docker images, which remains open. Overall, the project is in a quiet but steady maintenance phase with no new releases and no signs of urgent community distress.

### 2. Releases

No new releases were published in the last 24 hours or are pending from this activity period.

### 3. Project Progress

- **Issue #700 (Closed):** The feature request to add an `a2a_call` client tool for calling remote agents was officially closed. While this closure represents completion of a requested capability, no associated PR appears in today's data, suggesting the closure may have been due to external implementation or a decision not to pursue it. Users can now reference the closure as a definitive answer on the tool's status. ([Link](https://github.com/nullclaw/nullclaw/issues/700))

### 4. Community Hot Topics

- **[Issue #700](https://github.com/nullclaw/nullclaw/issues/700) — Add a2a_call client tool:** The only item with a comment (1) and a reaction (1 👍). The underlying need is for bidirectional A2A communication—the project already serves the A2A protocol, but users require a client-side implementation to enable agent-to-agent interactions across instances (as described in the use case of two nullclaw instances acting as a doorman and a private personal agent). The closure without a visible PR merge may prompt follow-up questions or an alternative implementation path from the community.

- **[PR #956](https://github.com/nullclaw/nullclaw/pull/956) — Dependabot Alpine 3.23 → 3.24 bump:** A routine dependency update that has been open since mid-June. Lack of movement on a two-month-old dependency PR could indicate maintainer bandwidth constraints or a deliberate pinning strategy.

### 5. Bugs & Stability

No bugs, crashes, or regressions were reported or fixed in the last 24 hours. No new stability concerns were raised.

### 6. Feature Requests & Roadmap Signals

The primary feature signal is the closure of the `a2a_call` client tool request (#700). While the issue is closed, the demand for client-side A2A functionality was validated by user interest (reaction and comment). If the closure was due to a decision to defer, the next minor version may still include an `a2a_call` tool if a corresponding PR was merged quietly. If not, users may raise renewed requests. Look for official A2A client support in upcoming releases—it remains the clearest roadmap signal from this dataset.

### 7. User Feedback Summary

The single piece of actionable user feedback from this period is from Issue #700: a user running two nullclaw instances expressed the practical need for cross-instance agent communication. The request highlights a real-world use case of delegation (public doorman + private personal agent) and marks an asymmetry in the project: server support for A2A exists, but client capabilities lag. The 👍 reaction suggests at least one other user shares this need. The prompt closure (after months of non-activity with no visible PR) may be perceived as a soft rejection, so maintaining visibility on the roadmap could mitigate any negative sentiment.

### 8. Backlog Watch

- **[PR #956](https://github.com/nullclaw/nullclaw/pull/956) — Docker Alpine bump:** Open and untouched for nearly two months (created 2026-06-15, last updated 2026-08-10). This is a dependency hygiene item that should be merged or closed to avoid security/staleness issues in Docker images. Low complexity, likely a quick resolution for a maintainer.
- **[Issue #700](https://github.com/nullclaw/nullclaw/issues/700):** Newly closed, no longer needs attention, but the absence of a linked implementation PR means maintainers should verify the closure reasoning is documented to prevent duplicate requests.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-08-11

## Today's Overview

IronClaw is in an active patch-and-stabilize phase for the 1.1 line, with 50 issues and 50 PRs updated in the last 24 hours. A release candidate patch (v1.1.1-rc.1) shipped yesterday addressing channel delivery, MCP compatibility, WebUI streaming, and migration safety. The project shows 33 open PRs and 25 open issues, indicating sustained development velocity, with a notable concentration of work on Telegram completeness, durable storage profile-agnosticism, and doc-truth verification. Three new contributors (theredspoon among them) have active PRs, suggesting healthy community intake.

## Releases

**ironclaw-v1.1.1-rc.1** (2026-08-10) — Urgent patch candidate for the 1.1 line focusing on:
- Channel delivery and pairing fixes
- IronHub/custom MCP compatibility
- WebUI streaming stability
- Durable retrieval improvements
- Safe upgrades from both supported stable predecessors

**Breaking change for 1.0.0 users:** Upgrading requires stopping all writers before migration.

## Project Progress

- **#7474** (XL, core) — Batch fix for three Railway-QA bugs where the agent asserted unverified state (automation status, per-caller extension auth, recalled memory). One commit per issue, each reproduced deterministically before fix.
- **#7336** (CLOSED, L) — Loop-host deduplication of consumed steering replays, preventing duplicate assistant replies from delayed queued-message replays.
- **#7446** (CLOSED, XL) — Rich working indicator for channel runs: varied working copy, reactions, failure states, and progress nudges across Slack and Telegram.
- **#7381** (CLOSED, XS) — Doc-truth pipeline design record added, completing the doc-truth PR series (5/5).
- **#7376** (OPEN) — Extends the guidance path-reference gate to cover the `docs/` surface, Mintlify pages, the `docs/zh/` locale mirror, and the living contract corpus.
- **#7442** (OPEN) — Installation of companion files published for IronHub skills, with digest verification (takeover of #7076 preserving original author commit).
- **#7471** (OPEN) — Lease-expiry recovery for hosted runs; isolates the journal heartbeat pool from data-plane traffic to prevent `lease_expired` failures.
- **#7472** (OPEN) — Removes dead `has_reborn_tests` output from CI classify-test-scope script.
- **#7470** (OPEN) — Restores listability for unprojected thread index rows in the sidebar.

## Community Hot Topics

- **[#7137 — live-canary shard artifacts 700MB-1.5GB](https://github.com/nearai/ironclaw/issues/7137)** (12 comments): CI workflow uploading >5GB artifacts across 13 bundles; storage quota burn and slow downloads. Contributor theredspoon responded with PR #7466 trimming artifacts. The need: efficient CI triage without bloated artifact retention.
- **[#7145 — WS2 extension_host → loops re-layer](https://github.com/nearai/ironclaw/issues/7145)** (4 comments): Sizing the re-layer from the four-port residue, not file count; demonstrates architectural maturity and measurement-driven decisions.
- **[#7317 — Doc-Truth Verification Pipeline proposal](https://github.com/nearai/ironclaw/issues/7317)** (3 comments): Breaking changes shipped without doc updates; real examples of `origin_gate_matrix` becoming mandatory without docs. Addressed by design record PR #7381.
- **[#6257 — PDF attachment MIME error](https://github.com/nearai/ironclaw/issues/6257)** (3 comments): User-reported failure sending/generating PDFs with `Invalid value (attachments.mime_type)`.
- **[#7147 — Two architecture ratchets carry untracked slack](https://github.com/nearai/ironclaw/issues/7147)** (3 comments): Multiple PRs holding different baseline values; tracking gaps in architecture enforcement.

## Bugs & Stability

1. **[#7473 — Connect-nudge duplicate throttle release bug](https://github.com/nearai/ironclaw/issues/7473)** (OPEN): `post_notice` collapses "delivered with no vendor ref" into "not delivered," allowing duplicate nudges. Fix PR #7475 exists (OPEN, new contributor).
2. **[#7447 — Agent fails after too many tool calls](https://github.com/nearai/ironclaw/issues/7447)** (OPEN): Agent stuck in redundant fetch-retry loop rather than paginating; burns tool-call/turn budget.
3. **[#7467 — Reborn storage profile-dependence](https://github.com/nearai/ironclaw/issues/7467)** (OPEN, epic): Profile changes make deployments appear empty, stranding history, secrets, and settings. Fix PR #7456 (XL) open.
4. **[#7471 — Hosted runs die with `lease_expired`](https://github.com/nearai/ironclaw/issues/7471)** (via PR): Heartbeat shares Postgres pool with data-plane traffic; starvation causes user-visible failures. Fix PR open.
5. **[#6257 — PDF attachment MIME error persists](https://github.com/nearai/ironclaw/issues/6257)** (OPEN since 2026-07-19): No fix PR linked; user-facing error on PDF send/generate.
6. **[#5882 — Slack reconnect auth flow broken state](https://github.com/nearai/ironclaw/issues/5882)** (CLOSED): Repeated Slack reconnects leave "Waiting for Slack..." indefinitely; only removal/reinstall recovers.
7. **[#6834 — Slack setup fails](https://github.com/nearai/ironclaw/issues/6834)** (CLOSED): near.foundation account Slack integration setup fails; connection/auth flow incomplete.

## Feature Requests & Roadmap Signals

- **Extensions vNext** ([#7354](https://github.com/nearai/ironclaw/issues/7354), v1.3.0): Web Push, Rich Messaging, Telegram User Sessions, and Signal — ambitious near-term scope targeting 2026-08-14 for web push notifications.
- **AI-driven admin configuration** ([#7046](https://github.com/nearai/ironclaw/issues/7046)): Configure tools, channels, and extensions from AI chat as Admin; aligns with channel-first onboarding (#7044).
- **Storybook + AI-first Design System** ([#7038](https://github.com/nearai/ironclaw/issues/7038), v1.3.0): Full proposal package with theming, assets, interactions, IA.
- **Profile-agnostic durable state** ([#7467](https://github.com/nearai/ironclaw/issues/7467)): Epic to migrate legacy profile roots; likely v1.3.0 given active XL PR.
- **Custom/arbitrary MCP server support** ([#6727](https://github.com/nearai/ironclaw/issues/6727)): Closed as part of 1.1.0 scope; release notes confirm IronHub/custom MCP compatibility in 1.1.1-rc.1.
- **Company Brain FDE** ([#7465](https://github.com/nearai/ironclaw/issues/7465)): New epic, no description yet — early signal of org-focused knowledge management.
- **Tool-search fair discovery** ([#7410](https://github.com/nearai/ironclaw/issues/7410), OPEN): Bounded complete input signatures from `tool_search`, removing mandatory `tool_describe` round trips.

## User Feedback Summary

- **PDF generation failing** ([#6257](https://github.com/nearai/ironclaw/issues/6257)): Users cannot send or generate PDF files; MIME validation rejects valid use case. Long-standing (since July 19) with no fix linked.
- **AGENTS.md edits not reflected in system prompt** ([#3762](https://github.com/nearai/ironclaw/issues/3762), suggested P1, v1.3.0): Users editing identity files in web UI see saved changes but unchanged system prompt behavior.
- **Slack integration fragility** ([#5882](https://github.com/nearai/ironclaw/issues/5882), [#6834](https://github.com/nearai/ironclaw/issues/6834)): Repeated reconnects break auth permanently; single setup attempts fail without recovery path.
- **Agent tool-call budget exhaustion** ([#7447](https://github.com/nearai/ironclaw/issues/7447)): Real user pain — agent loops on redundant queries instead of paginating, failing tasks.
- **Doc drift frustration** ([#7317](https://github.com/nearai/ironclaw/issues/7317)): Breaking changes shipped without doc updates; community calling for systematic doc-truth enforcement (now progressing via 5-PR series).

## Backlog Watch

- **[#3762 — AGENTS.md edit → system prompt update](https://github.com/nearai/ironclaw/issues/3762)**: Open since 2026-05-18; suggested P1 with v1.3.0 tag. No linked PR. Customer-facing, conversation-affecting behavior change.
- **[#6257 — PDF MIME error](https://github.com/nearai/ironclaw/issues/6257)**: Open since 2026-07-19 with confirmed user report; no fix PR; silently blocking PDF workflows.
- **[#7137 — live-canary artifact bloat](https://github.com/nearai/ironclaw/issues/7137)**: 12 comments; PR #7466 exists but the issue remains open with artifact sizes still large.
- **[#5101 — Reuse cargo-component installer in live canary](https://github.com/nearai/ironclaw/pull/5101)**: Open PR since 2026-06-20, risk medium, still awaiting merge after 7+ weeks; contributor: new.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI Project Digest — 2026-08-11

## Today's Overview

LobsterAI shows strong release-engineering momentum with 20 PRs merged/closed in the past 24 hours, dominated by cowork-area UX refinements, OpenClaw runtime fixes, and a broad dependency modernization sweep (Vite, React 19, Mermaid, rimraf). The lone stale bug report (#1243, qwen-portal-auth config loop) was closed this cycle, though no fix PR is linked. 14 PRs remain open — mostly Dependabot bumps waiting on CI — plus two feature PRs and a provider-prefix fix under review. No new releases shipped, but the high merge velocity signals healthy integration throughput.

## Releases

No new releases in the last 24 hours.

## Project Progress

Active development continues on the cowork workspace and the OpenClaw integration layer:

- **Cowork file handling (#2471, #2473):** Non-image attachments are now rendered as clickable file-type cards after submission (icon + name + type), matching the rich preview shown pre-submit. A new right-click context menu for local file links adds open-with, save-as, copy-path, copy-contents, copy-image, and reveal-in-folder actions, backed by a new `dialog:saveFileCopy` IPC handler. The inline reveal action was removed from MarkdownContent consumers in favor of the unified menu.
- **Cowork UX (#2472, #2469, #2468):** Activity groups can now be collapsed; a new shortcut collapses agent tasks and modifier shortcuts now work while typing; streaming loading indicators were unified into a single component.
- **OpenClaw stability (#2454, #2470):** Fixed the tool-loop guard killing legitimate polling, and provider/LLM runtime failures (e.g. idle timeout failover) arriving via late chat-error callbacks are no longer swallowed by the deferred-final handler.
- **Windows runtime (#2467):** Stale/wrong pip shims surviving runtime upgrades are now repaired — shim templates were extracted into a shared `pythonPipShim` module and both packaging and app startup converge to the current templates.
- **Renderer init (#2466):** IPC stall during renderer initialization now retries instead of hanging.

## Community Hot Topics

The only issue activity is the closed stale bug #1243 ([qwen-portal-auth 插件配置循环写入导致网关频繁重启](https://github.com/netease-youdao/LobsterAI/issues/1243)) — gateway restarts every 5–20 minutes triggered by auto-changing plugin config. It sat untouched for over four months and was auto-closed, which may frustrate the reporter. No PR is linked, so the underlying fix status is unclear.

On the PR side, the dependency stack is the dominant conversation: dependabot PRs #1766/#2465 (Vite 5.4→8.x), #1764/#2464 (React DOM 18→19.2.x), #1763/#2463 (@vitejs/plugin-react 4→6), #2462 (mermaid 10→11, major), #2461 (eslint-plugin-react-hooks 5→7), #2460 (rimraf 5→6), #2459 (@nodesecure/js-x-ray 14→16, major). These are routine automation, but the majors carry breaking-change risk and are the main open reviewer queue.

## Bugs & Stability

One bug was active in the last 24 hours (now closed as stale):

- **[High, unverified] #1243 — qwen-portal-auth config write loop → web gateway restart every 5–20 min (Win10/11).** No fix PR identified. Severity was high (regular restarts affect all models, not just Qwen), but the issue aged out without resolution. OpenClaw fixes in #2454 and #2470 address adjacent stability areas (tool-loop guard, swallowed provider errors) and may indirectly cover part of this class of problem, but the portal-auth loop itself is not addressed in today's merged PRs.

## Feature Requests & Roadmap Signals

No new user feature requests outside issue traffic this date. The merged cowork PRs (#2471, #2473, #2472, #2469) suggest file-centric collaboration is a roadmap focus — richer attachment handling, context menus, and task management. Continued dependency upgrades (React 19, Vite 8, Mermaid 11) signal modernization of the renderer stack is underway and likely lands in the next release. The still-open #2452 (preserve provider prefix for slashed model IDs like `deepseek-ai/DeepSeek-V4-Flash`) addresses a concrete multi-provider correctness bug and is likely a near-term merge.

## User Feedback Summary

The only user-reported pain point is the qwen-portal-auth gateway restart loop, reported with detailed steps and environment info. The issue's silent staleness may signal a gap in triage responsiveness. No positive or negative feedback threads were posted in the last 24 hours. PR activity suggests internal focus on polish (file UX, loading states, keyboard shortcuts) rather than addressing user-facing regressions — a healthy sign for release quality.

## Backlog Watch

- **[#1243 (closed stale, unresolved)]** — Gateway restart loop caused by qwen-portal-auth config writes. Auto-closed with no linked fix; if reproducible, the portal-auth plugin needs a config-diff guard to prevent write loops. Consider reopening or documenting acceptance criteria. [GitHub](https://github.com/netease-youdao/LobsterAI/issues/1243)
- **[#2452 (open, 4 days, no comments)]** — Provider-prefix loss for slashed model IDs in OpenClaw sessions. This is a correctness fix for multi-provider setups and has no review discussion yet — worth prompting for reviewer attention. [GitHub](https://github.com/netease-youdao/LobsterAI/pull/2452)
- A batch of dependent major-version PRs (React 19, Vite 8, plugin-react, mermaid) awaits review; given the minor-bump duplicates remain open alongside them (#2465 vs #1766, #2464 vs #1764), a decision on which version target to adopt would unblock resolution of the older, otherwise-superseded PRs.

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

**Moltis Project Digest – 2026-08-11**

### 1. Today's Overview
Moltis is in a moderately active maintenance phase, with 3 issues and 2 pull requests updated in the last 24 hours. No new releases were published, and no PRs were merged or closed, indicating a stall in feature integration. Activity is concentrated on bug triage, particularly surrounding the Apple Container 1.x backend, which is the subject of two of the three open issues. A long-running feature PR for interactive browser viewing remains open after more than four months, suggesting potential review bottlenecks.

### 2. Releases
None.

### 3. Project Progress
No PRs were merged or closed in the last 24 hours. The open PRs show no movement toward merge:
- **PR #1182** *fix(sessions): allow deleting and archiving the main session* (Open, last updated today) – Aims to remove the restriction preventing deletion/archival of the default `main` session.
- **PR #531** *feat(browser): interactive browser viewing UI with CDP screencast* (Open, last updated yesterday) – Introduces live browser viewing and interaction via CDP.

### 4. Community Hot Topics
The most active discussion item is a bug report regarding the Apple Container sandbox lifecycle:
- **[Issue #1185: Bug – Apple Container 1.x sandbox starts but Moltis treats it as not running](https://github.com/moltis-org/moltis/issues/1185)** (3 comments, created 2026-08-08). The user is confused by a state mismatch where the sandbox process is alive but the platform reports it as dead. This suggests a fundamental polling or status-detection error in the backend integration, which is likely blocking user workflows.

### 5. Bugs & Stability
Three bugs are currently open, all reported in the last few days. Ranked by severity and user impact (potential to block core functionality):
1.  **High – [Issue #1185: Apple Container sandbox state misreporting](https://github.com/moltis-org/moltis/issues/1185)** – The system falsely marks a running sandbox as inactive, likely preventing interaction or causing duplicate spawn attempts. No linked fix PR exists.
2.  **Medium – [Issue #1188: Resource limits not applied for apple-container backend](https://github.com/moltis-org/moltis/issues/1188)** – Configuration for CPU/memory limits is ignored on the Apple Container backend, leading to potential resource exhaustion. No fix PR identified.
3.  **Low – [Issue #1189: Sandbox build failing due to wrong gogcli GitHub URL](https://github.com/moltis-org/moltis/issues/1189)** – A build-time dependency fails due to an outdated repository URL. This is likely a quick fix but currently blocks new sandbox creation for affected users.

### 6. Feature Requests & Roadmap Signals
- **Interactive Browser UI (PR #531)**: The ongoing development of live browser session viewing and control signals a planned UX enhancement for the Settings > Browser page. Despite being open since March, its continued activity suggests it remains a priority feature slated for a future release.
- **Session Management (PR #1182)**: The fix to allow deletion of the main session addresses long-standing friction in session lifecycle management, indicating a push toward more flexible user control.

### 7. User Feedback Summary
Implicit feedback from the bug reports suggests significant friction with the **Apple Container backend**, which appears to be a common deployment target for several users. The primary pain points are reliability (state detection) and configuration completeness (resource limits). Additionally, the build failure (#1189) highlights that the project’s dependency maintenance is currently affecting the user experience. The active PR on session management responds to user frustration regarding the inability to clean up the default `main` session.

### 8. Backlog Watch
The following items require maintainer attention due to age or inactivity:
- **[PR #531: Interactive browser viewing UI](https://github.com/moltis-org/moltis/pull/531)** – Open since 2026-03-31 (over 4 months). Major feature; needs review or explicit status update to avoid community frustration.
- **[Issue #1185: Apple Container state misreporting](https://github.com/moltis-org/moltis/issues/1185)** – Though recently updated, the issue has been active for 3 days without a maintainer response or assignment.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw Project Digest — 2026-08-11

## 1. Today's Overview

CoPaw (QwenPaw) shows a very active development period with 40 issues and 50 PRs updated in the last 24 hours, split roughly 60/40 between open and closed/merged work. The project is clearly in a pre-release stabilization phase for v2.1.0, evidenced by release-note preparation PRs, a growing pile of bug reports specifically targeting 2.1.0b2 regressions (IME crashes, CPU burn at idle, thinking-model relay failures), and a steady stream of first-time contributor PRs (4 of the top 20 by recency) suggesting healthy community onboarding. No new releases were cut today; the focus is on hardening before the v2.1.0 stable ship. The 19 closed/merged PRs indicate strong throughput, but the volume of open bugs across desktop, providers, and the Creator plugin suggests polish work is still needed in several areas.

## 2. Releases

No new releases published in the last 24 hours.

## 3. Project Progress

Nineteen PRs were merged or closed in the last 24 hours. Notable items:

- **[PR #6809 — fix(providers): sanitize Chat Completions content for strict providers](https://github.com/agentscope-ai/CoPaw/pull/6809)** — Closed. Fixes wire-format issues where internal envelope fields and Responses-API text types leaked into Chat Completion requests, addressing the StepFun interoperability bug (#6803).
- **[PR #6878 — feat(console): add hidden-folders toggle to project directory picker](https://github.com/agentscope-ai/CoPaw/pull/6878)** — Closed. Adds a visibility toggle for hidden folders in the directory picker.
- **[PR #6615 — fix(config): handle corrupted agent config and invalid JSON in load_agent_config](https://github.com/agentscope-ai/CoPaw/pull/6615)** — Closed (first-time contributor). Prevents raw UnicodeDecodeError/JSONDecodeError propagation from corrupt agent.json files.
- **[PR #6398 — feat: add reranker support for ReMe memory search (backend)](https://github.com/agentscope-ai/CoPaw/pull/6398)** — Closed. Adds pluggable reranker support to ReMe memory search with over-fetch + rerank + cap-back pipeline.

New open PRs of note include the **IME event fix** (#6889), a **Creator plugin aggregation** (#6870) that bumps the plugin significantly, and a **unified marketplace page** (#6880) consolidating apps, plugins, and skills under one route.

## 4. Community Hot Topics

- **[#6782 — Docker 2.0.1: plugin/app market stuck on "maintenance" (9 comments)](https://github.com/agentscope-ai/CoPaw/issues/6782)** — The longest-running thread this cycle. Users of the Docker distribution cannot access plugin or app marketplaces at all. High user impact, no fix PR yet.
- **[#6803 — OpenAI-compatible chat requests rejected by strict providers, e.g. StepFun 400 (6 comments)](https://github.com/agentscope-ai/CoPaw/issues/6803)** — Closed. Wire-format contamination broke strict providers; fixed by #6809.
- **[#6811 — Responses continuation summary ignores disable_thinking and misreports 60s cancellation (5 comments)](https://github.com/agentscope-ai/CoPaw/issues/6811)** — Scroll eviction triggers a blocking summary call with the main model, violating the disable_thinking setting and producing confusing timeouts. Backend logic bug; no linked fix yet.
- **[#6826 — Assistant message completion time displays incorrectly in UI (5 comments)](https://github.com/agentscope-ai/CoPaw/issues/6826)** — Real thinking time (2min) shows as a few seconds in the UI. A fix PR exists: **[#6845 — fix(chats): preserve assistant completion time](https://github.com/agentscope-ai/CoPaw/pull/6845)**, currently under review.
- **[#4237 — In-chat observability for running shell commands: see/kill/extend timeout (4 comments)](https://github.com/agentscope-ai/CoPaw/issues/4237)** — Open enhancement since May. Users want a running-commands panel with kill and timeout-extension controls. Unaddressed.
- **[#6405 — MCP tools "Tool not found" after 2.0 upgrade (4 comments)](https://github.com/agentscope-ai/CoPaw/issues/6405)** — MCP tool name mangling (`[mcp-key]__[tool_name]`) results in "Tool not found"; root cause unclear. Open.

## 5. Bugs & Stability

Bugs reported in the last 24h, ranked by severity:

1. **Console UI crash on Chinese IME compositionEnd during agent run** ([#6885](https://github.com/agentscope-ai/CoPaw/issues/6885), new, 2 comments) — v2.1.0b2 makes message queue unusable with Chinese IME; agent running + Stop button visible triggers the crash. **Fix PR exists:** [#6889](https://github.com/agentscope-ai/CoPaw/pull/6889).
2. **SIGBUS in sqlite3WalFindFrame opening Scroll history.db (WAL) on macOS** ([#6814](https://github.com/agentscope-ai/CoPaw/issues/6814), 4 comments) — Native crash in SQLite WAL page lookup. Critical for macOS desktop users. No fix PR yet.
3. **Gemini compaction error: missing thought_signature in functionCall parts** ([#6867](https://github.com/agentscope-ai/CoPaw/issues/6867), new, 2 comments) — Context compaction produces invalid Gemini function-call payloads (400). No fix PR yet.
4. **reasoning_content relay fails for thinking-mode models → 400 BadRequestError** ([#6821](https://github.com/agentscope-ai/CoPaw/issues/6821), 3 comments) — Multi-turn thinking-model conversations break; reasoning_content must be passed back but isn't. No fix PR yet.
5. **Console frontend idle repaint ~20% CPU from infinite CSS animations** ([#6828](https://github.com/agentscope-ai/CoPaw/issues/6828), 2 comments) — ai-copilot-blink + offscreen antd spinner cause constant repaint and UI jank on desktop. Cosmetic but costly. No fix PR.
6. **consume_model_response raises KeyError: '__aiter__'** ([#6813](https://github.com/agentscope-ai/CoPaw/issues/6813), 2 comments) — Chat auto-title generation fails against agentscope 2.x ChatResponse dict subclasses. No fix PR.
7. **Frontend only shows complete model output post-hoc, no streaming** ([#6820](https://github.com/agentscope-ai/CoPaw/issues/6820), 4 comments) — User-visible regression: no live output of text, tool calls, or thinking; everything appears only when done.
8. **Windows install/update fails because NSIS won't overwrite locked files** ([#6810](https://github.com/agentscope-ai/CoPaw/issues/6810), 3 comments) — v2.1.0b1 auto-update hangs; b2 manual install throws 4+ "cannot write" errors from locked python-runtime files; browser extension NM host holds locks.

## 6. Feature Requests & Roadmap Signals

- **Auto-Dream integration resilience** ([#6841](https://github.com/agentscope-ai/CoPaw/issues/6841)) — Single LLM schema failure marks whole task as error. **Fix PR exists:** [#6884](https://github.com/agentscope-ai/CoPaw/pull/6884) — likely to land and be in v2.1.0.
- **ReMe4 roadmap timeline question** ([#6840](https://github.com/agentscope-ai/CoPaw/issues/6840)) — User asks for 2.1.0b2 ReMe Light → full ReMe4 (Auto-Link, tri-modal search, 4-category digest weights) timeline. Backend reranker work (#6398) just merged, so ReMe4 is actively progressing.
- **Auto-refresh session title after auto-memory update** ([#6881](https://github.com/agentscope-ai/CoPaw/issues/6881)) — Small UX ask; plausible for a future minor.
- **Configurable MCP tool-call timeout** ([#6724](https://github.com/agentscope-ai/CoPaw/issues/6724)) — Per-client timeout field + call-level guard. MCP reliability is a recurring pain (see #6405), so this has a good chance.
- **Window size/position memory** ([#4634](https://github.com/agentscope-ai/CoPaw/issues/4634), since May) — **Fix PR exists:** [#6877](https://github.com/agentscope-ai/CoPaw/pull/6877) using Tauri's window-state plugin. Likely in v2.1.0.
- **Background task panel default-collapsed** ([#6876](https://github.com/agentscope-ai/CoPaw/issues/6876), closed) — Feature request to fold the background-task panel; closed, possibly tracked elsewhere.

## 7. User Feedback Summary

- **Docker marketplace is completely broken** for 2.0.1 ([#6782](https://github.com/agentscope-ai/CoPaw/issues/6782)) — "always shows maintenance." A distribution-channel blocker causing broad dissatisfaction.
- **Desktop idle CPU burn** ([#6828](https://github.com/agentscope-ai/CoPaw/issues/6828)) — "holds the WebKit renderer at ~18–22% CPU and WindowServer at ~19–27% (normal <5%)" with visible UI jank. Users perceive it as unprofessional resource waste.
- **Chinese IME users cannot use the message queue at all in 2.1.0b2** ([#6885](https://github.com/agentscope-ai/CoPaw/issues/6885)) — Regressive; a whole language community's input method breaks the primary input path.
- **Antivirus false positives / forced process kills** ([#6847](https://github.com/agentscope-ai/CoPaw/issues/6847)) — "Qwenpaw在执行任务的时候，经常会被杀软拦截，甚至强制关停Qwenpaw进程." Competing tool WorkBuddy does not trigger this, implying QwenPaw's behavior or packaging looks suspicious.
- **3+ hour idle leads to hang, only fix is kill + restart** ([#6780](https://github.com/agentscope-ai/CoPaw/issues/6780)) — Self-hosted users report the process dies after tens of minutes idle.
- **MCP string arguments are coerced to numbers** ([#6839](https://github.com/agentscope-ai/CoPaw/issues/6839)) — "总是将像数字的字符串以数字格式传参" — e.g. asset codes like `0.123456` are passed as numbers, failing APIs. Reliable MCP interop remains a major user concern.
- **prompts.py lies about memory sync** ([#6853](https://github.com/agentscope-ai/CoPaw/issues/6853)) — Dream never writes to MEMORY.md despite docs claiming it; users who rely on this lose memory. Trust-damaging mismatch between docs and behavior.
- **Workspace pollution**: agents generate many .py/.sh files in the workspace root ([#6866](https://github.com/agentscope-ai/CoPaw/issues/6866), closed) — user asks if prompt-hinting a temp dir works; expects a cleaner built-in sandbox.

## 8. Backlog Watch

- **[#4237 — In-chat observability for running shell commands — see/kill/extend timeout](https://github.com/agentscope-ai/CoPaw/issues/4237)** — Open since 2026-05-12. Four comments, no maintainer response. Long-running commands are a blind spot; users want kill and timeout controls. Stale and unaddressed.
- **[#6585 — Toggle to disable the "characters received" dynamic readout under chat box](https://github.com/agentscope-ai/CoPaw/issues/6585)** — Open since 2026-07-30. Users find the flickering counter painful; simple UI toggle request still unanswered.
- **[#6405 — MCP tools "Tool not found" after 2.0 upgrade](https://github.com/agentscope-ai/CoPaw/issues/6405)** — Open since 2026-07-23 with 4 comments. Combined with #6839 (numeric string coercion), MCP compatibility deserves maintainer focus.
- **[#6683 — qwenpaw-creator install fails: No module named 'utils.env' (plugin top-level module name collision)](https://github.com/agentscope-ai/CoPaw/issues/6683)** — Open since 2026-08-04. Blocked by plugin namespace pollution; affects official plugin installs.
- **[#6780 — 2.0.1 hangs after tens of minutes idle; only process kill/restart recovers](https://github.com/agentscope-ai/CoPaw/issues/6780)** — Open since 2026-08-07. No maintainer reply; likely a backend/scroll issue and a stability blocker for long-running self-hosted use.
- **[PR #5992 — Add per-session model overrides (first-time contributor)](https://github.com/agentscope-ai/CoPaw/pull/5992)** — Open since 2026-07-12. No comments from maintainers; not merged or closed. The feature (per-session model selection) is broadly useful, but the PR has gone silent for a month — needs review or explicit closure.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

**Date: 2026-08-11**

---

## 1. Today's Overview

EasyClaw development is active, focused on distribution and reliability rather than new feature work. While no issues or pull requests were updated in the last 24 hours, the project shipped two consecutive releases (v1.8.96 and v1.8.97), indicating a stable sprint cadence. The releases target incremental improvements to the TK Copilot workflow—specifically desktop client tutorials and backend reliability for customer-service sessions and affiliate tasks. The lack of open community discussion (0 active issues) suggests a small user base or that users are routing feedback through other channels (e.g., Discord/Telegram). Overall, the project is healthy and shipping consistently.

## 2. Releases

Two new versions were published (no breaking changes or specific migration steps noted for either).

- **[v1.8.97 - TK Copilot v1.8.97](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.97)**: Adds updated desktop application and affiliate workflow tutorials. This is documentation-focused, likely responding to user confusion regarding setup or usage.
- **[v1.8.96 - TK Copilot v1.8.96](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.96)**: Improves customer-service session startup and affiliate task retry reliability. This addresses backend stability, likely reducing failed session initiations and improving automated retry logic for affiliate operations.

Both releases include a known macOS Gatekeeper warning note: users may see "'RivonClaw' is damaged and can't be opened," which is a false positive due to the app being unsigned.

## 3. Project Progress

No pull requests were merged or closed in the last 24 hours. However, the release of v1.8.96 indicates that code committed earlier in the sprint has been successfully integrated and shipped. Specifically, the reliability improvements to customer-service session startup and affiliate task retry logic are now live for all users.

## 4. Community Hot Topics

No issues or PRs are currently active or open, so there are no community discussions to analyze. The absence of a feedback loop on GitHub is notable; the maintainer is shipping releases without visible public prompts, suggesting feature direction is driven by internal testing or private user groups.

## 5. Bugs & Stability

No new bugs, crashes, or regressions were reported in the last 24 hours. The primary stability concern—the macOS Gatekeeper warning blocking app launch—was addressed in the release notes for both v1.8.96 and v1.8.97 with clear instructions for users to bypass the warning via System Settings. This is a recurring documentation issue rather than a code defect.

## 6. Feature Requests & Roadmap Signals

No explicit feature requests were logged on GitHub. Based on the release cadence, the next likely version (v1.8.98) may focus on deploying the newly added "updated desktop" tutorials to a broader audience or further stabilizing the affiliate workflow, given that v1.8.96 addressed retry reliability and v1.8.97 documented it.

## 7. User Feedback Summary

While public feedback is unavailable, the release notes imply specific user pain points:

- **Setup Friction**: Users struggled to configure the desktop app and affiliate workflows, prompting the new tutorial release (v1.8.97).
- **Session Stability**: Customer-service session startups were failing or slow, requiring the retry and startup reliability fixes in v1.8.96.
- **Mac Trust Issues**: Users are likely confused by the "damaged app" error; the maintainer has issued clear remediation steps, which should reduce support tickets.

Overall, users are actively using the desktop client and affiliate features, with the maintainer responding quickly to reliability gaps.

## 8. Backlog Watch

No lingering open issues or PRs require maintainer attention. The GitHub tracker is completely clear (0 open items).

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar).*