# OpenClaw Ecosystem Digest 2026-08-17

> Issues: 500 | PRs: 500 | Projects covered: 13 | Generated: 2026-08-17 01:03 UTC

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

# OpenClaw Project Digest — 2026-08-17

## 1. Today's Overview

OpenClaw shows a heavily loaded but healthily active development cycle: exactly 500 issues and 500 PRs were updated in the last 24 hours, with 460 open/active issues and 394 open PRs, indicating a high-volume triage and review workload. Issue resolution velocity is moderate (40 closed issues, 106 merged/closed PRs), while bug reports continue to concentrate in session-state integrity, message-delivery guarantees, and gateway event-loop blocking — suggesting reliability hardening is the current focus. Maintainer bandwidth appears to be a bottleneck: a large fraction of top issues are tagged `clawsweeper:needs-maintainer-review` and `clawsweeper:needs-product-decision`, many dating back months. A single new release artifact (`pr-124528-profiles`) was published, which is a diagnostic CPU-profile bundle rather than a versioned product release.

## 2. Releases

**pr-124528-profiles** (diagnostic artifact, not a versioned release)

- CPU profiles captured from the bounded three-node, twelve-concurrent-turn Gateway rig for PR #124528.
- Contains representative "before" and exact-head "after" Gateway profiles used for the event-loop hotspot comparison.
- No breaking changes, migration notes, or user-facing feature deltas; intended for maintainer performance analysis.

## 3. Project Progress

Merged/closed PRs in the last 24 hours (106 total) include notable fixes and features:

- **#120900** (closed): Admin review of install-policy warnings in Control UI — `plugins.install` now accepts `acknowledgeInstallPolicyWarning: true` for deliberate bypass.
- **#111870** (closed): Fixed `@openclaw/codex` failing to register in CLI context (`TypeError: undefined 'openSyncKeyedStore'`).
- **#92433** (closed): Fixed subagent completion being silently dropped when announce steers into a requester run that ends before processing.
- **#121058** (closed): Addressed recurring silent reply failures despite prior fix #116277 — though issue remains open as P1 for monitoring.
- **#124914** (open, ready for maintainer look): Gates RSS diagnostics to runtime limits, closing #119189 — stops healthy large-heap Gateways from repeatedly logging false memory-pressure warnings.
- **#124902** (open, waiting on author): Honors selected model for managed-worktree session titles instead of routing through agent default.
- **#124948** (open, ready for maintainer look): `doctor` now surfaces legacy-config copy failures instead of silently swallowing `EACCES`/`ENOSPC`.
- **#122985** (open, ready for maintainer look): Chat transcript no longer jumps when composer grows past height limit.
- **#121116** (open, ready for maintainer look): MS Teams stops retrying non-idempotent activity creates on 408/5xx — prevents duplicate message delivery.

The `steipete` maintainer series (124902, 124910, 124913, 124914, 124947, 124948, 124949, 124950) signals a focused pass on gateway correctness, agent runtime image delivery, TTS structured fields, and UI refactoring.

## 4. Community Hot Topics

- **[#121058 — Silent reply failures still recurring](https://github.com/openclaw/openclaw/issues/121058)** (97 comments, closed-but-recurring, P1): The single most-discussed issue. Users report the fix for silent reply loss was ineffective; monitoring cron still logs occurrences. Underlying need: a durable, verifiable delivery guarantee for the final reply payload.
- **[#44925 — Subagent completion silently lost](https://github.com/openclaw/openclaw/issues/44925)** (31 comments, diamond lobster, P1): Multiple failure patterns (E31/E42/E45) with no retry, no notification, no auto-restart. Users need fail-safe subagent orchestration with observable completion.
- **[#42475 — Per-agent cost budget enforcement](https://github.com/openclaw/openclaw/issues/42475)** (26 comments, P2): Operators want gateway-level daily/monthly caps to prevent runaway spend without external monitoring.
- **[#48003 — Steer mode does not inject mid-turn](https://github.com/openclaw/openclaw/issues/48003)** (21 comments, diamond lobster, P1): `messages.queue.mode: "steer"` fails at tool boundaries; users want real-time steering into active runs.
- **[#22438 — Tiered bootstrap file loading](https://github.com/openclaw/openclaw/issues/22438)** (19 comments, P2): Users want progressive context control to avoid wasting token budget on files agents never reference.

Recurring theme across top threads: **silent loss** (messages, subagent results, tool parameters) and **event-loop stalls** from synchronous SQLite/transcript work. Community sentiment is frustrated by recurring regressions in delivery reliability.

## 5. Bugs & Stability

High-severity bugs updated in the last 24h, ranked:

1. **[#121058 — Silent reply failures recurring (P1, message-loss)](https://github.com/openclaw/openclaw/issues/121058)** — Recurrence despite closure of #116277; no queued reply payload. No fix PR yet; needs root-cause re-opening.
2. **[#44925 — Subagent completion silently lost (P1, diamond lobster)](https://github.com/openclaw/openclaw/issues/44925)** — Three distinct failure patterns with no retry/notification. No new fix PR; open since March.
3. **[#115908 — Session transcript projection livelock (P1, diamond lobster)](https://github.com/openclaw/openclaw/issues/115908)** — Non-converging rebuild cycle blocks Node main thread for tens of seconds, stalling all channel transports. No fix PR referenced.
4. **[#112423 — SQLite transcript cleanup blocks event loop (P1, diamond lobster)](https://github.com/openclaw/openclaw/issues/112423)** — Full materialization/compression/I/O on gateway thread during cleanup. PR #115138 (memory-map reads) is open but unmerged.
5. **[#100941 — Gateway drops concurrent tool-to-gateway WebSockets (P1, diamond lobster)](https://github.com/openclaw/openclaw/issues/100941)** — 1006 closure under parallel fan-out (~48 concurrent calls); misleading "Gateway-crashed" error. No fix PR.
6. **[#97616 — Zombie child process leak (P1, message-loss, crash-loop)](https://github.com/openclaw/openclaw/issues/97616)** — Unreaped hook/tool children accumulate, causing runtime degradation. No fix PR.
7. **[#87744 — Codex-backed Telegram turns timeout on turn/completed (P1)](https://github.com/openclaw/openclaw/issues/87744)** — Work done but terminal event never fires; sessions fail before delivering final answer.
8. **[#46786 — `tools.elevated.enabled: true` breaks exec routing (P1, security)](https://github.com/openclaw/openclaw/issues/46786)** — All exec calls route to gateway host instead of sandbox; security regression. No fix PR.

Stability observation: the same failure classes (silent drops, event-loop stalls, zombie processes) recur across issues, suggesting systemic reliability debt in the gateway core rather than isolated defects.

## 6. Feature Requests & Roadmap Signals

High-signal feature requests updated in the last 24h:

- **[#42475 — Per-agent cost budgets at gateway level (P2, 26 comments)](https://github.com/openclaw/openclaw/issues/42475)** — Likely near-term given operator demand and existing `session-cost-usage.ts` hooks.
- **[#22438 — Tiered bootstrap file loading (P2, 19 comments)](https://github.com/openclaw/openclaw/issues/22438)** — Strong fit for token-budget pain; plausible next-version candidate.
- **[#6757 — Agent-triggered context compaction (P2, diamond lobster)](https://github.com/openclaw/openclaw/issues/6757)** — Self-compact tool requested; complements existing `/compact` command.
- **[#45508 — Self-hosted STT/TTS in webchat (P2)](https://github.com/openclaw/openclaw/issues/45508)** — Route webchat voice through gateway instead of browser Speech API.
- **[#88154 — Slack Modal support (P2)](https://github.com/openclaw/openclaw/issues/88154)** — First-class structured input via Slack modals; multi-step workflows requested.
- **[#50093 — WhatsApp backfill after reconnection (P1)](https://github.com/openclaw/openclaw/issues/50093)** — Missed messages during outage are silently lost; delivery guarantee feature.

Absent a formal roadmap, signal strength (comment volume + diamond-lobster rating + maintainer labels) suggests cost controls, context compaction, and channel delivery guarantees are the most likely next-version themes. The `steipete` PR cluster (TTS structured fields #124913, image artifact delivery #124910, plugin tools for Codex #124947) hints at a near-term release focused on agent-runtime parity and speech/media capability.

## 7. User Feedback Summary

Recurring pain points expressed across top issues:

- **Silent failures are the #1 complaint** (97-comment thread #121058; #44925; #92433): Users cannot trust that replies, subagent results, or tool calls will land. Repeated "fixed but still broken" cycles erode confidence.
- **Event-loop stalls punish real workloads** (#115908, #112423, #100941): Large transcripts, SQLite cleanup, and parallel tool fan-out freeze the gateway; users report tens-of-seconds stalls and dropped channel transports.
- **Context/token management friction** (#22438, #6757, #110190): Runtime context carrier misplacement wastes reasoning tokens (severe model confusion reported with `ollama`/qwen3-coder); users want self-compact and tiered bootstrap.
- **Channel-specific gaps** (Feishu drop on archived sessions #108865, WhatsApp backfill #50093, Teams duplicate sends #121116, Slack modals #88154): Users expect channel-native UX and delivery guarantees.
- **Provider/auth issues** (#38327 Vertex null-conversion crash; #56217 1Password crash-loop rate-limit exhaustion; #107378 MiniMax billing misreport): Cost and reliability pain at the provider boundary.
- **Operational visibility** (#45565 lifecycle warnings to dedicated channel; #120449 loopDetection warnings server-side only): Users want actionable, routed telemetry instead of log-only noise.

Satisfaction drivers: active maintainer presence (steipete PRs addressing long-standing issues), responsive `doctor` improvements, and WebChat UI polish. Dissatisfaction drivers: stale high-priority bugs with no fix PR after months (`clawsweeper:needs-maintainer-review` on most P1s).

## 8. Backlog Watch

Long-standing, high-importance items still awaiting maintainer action (all carrying `clawsweeper:needs-maintainer-review` or `clawsweeper:needs-product-decision`):

- **[#44925 — Subagent completion silently lost](https://github.com/openclaw/openclaw/issues/44925)** — Open since 2026-03-13, P1, diamond lobster, no new fix PR.
- **[#46786 — `tools.elevated.enabled` security regression](https://github.com/openclaw/openclaw/issues/46786)** — Open since 2026-03-15, P1, security impact, needs security review.
- **[#87561 — Durable final fallback delivery semantics](https://github.com/openclaw/openclaw/issues/87561)** — Open since 2026-05-28, maintainer-labeled, P1 — a parent issue for many message-loss reports.
- **[#87744 — Codex-backed Telegram turn timeouts](https://github.com/openclaw/openclaw/issues/87744)** — Open since 2026-05-28, P1, needs live repro.
- **[#115908 — Transcript projection livelock](https://github.com/openclaw/openclaw/issues/115908)** — Open since 2026-07-29, P1, diamond lobster, no fix PR; event-loop stall is critical-path.
- **[#100941 — WebSocket drops under parallel fan-out](https://github.com/openclaw/openclaw/issues/100941)** — Open since 2026-07-06, P1, diamond lobster, no fix PR.
- **[#42475 — Per-agent cost budgets](https://github.com/openclaw/openclaw/issues/42475)** — Open since 2026-03-10, P2, 26 comments, needs product decision.
- **[#114612 — SQLite unbounded growth (memory tables)](https://github.com/openclaw/openclaw/issues/114612)** — Open since 2026-07-27, P2, dedupe parent, will fill disk over time; no retention policy.

Backlog risk: a substantial fraction of P1 reliability bugs have been open 3–5 months without fix PRs, and the `needs-product-decision` tag on many means maintainers are bottlenecked on triage, not code. The high volume (500 issues/PRs updated/24h) suggests the project is at risk of triage saturation; automated tooling (clawsweeper) is active but human review capacity is the constraint.

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report — 2026-08-17

## 1. Ecosystem Overview

The personal AI assistant open-source ecosystem is in a consolidation-and-reliability phase, with the top projects (OpenClaw, NanoBot, ZeroClaw, NanoClaw) simultaneously shipping architecture-level changes while grappling with recurring message-delivery reliability bugs and event-loop stalls. Core-platform work dominates: streaming-centric delivery paths, cross-session context, container/delivery engine refactors, and provider unification PRs are being merged across four major projects this week. Security hardening is a shared theme, with SSRF fixes (PicoClaw, ZeroClaw), IPC authorization (LobsterAI), and egress policy (ZeroClaw) actively landing. Community demand is converging on token-cost visibility and control, OpenAI-protocol interoperability, and fail-safe delivery semantics — signaling a shift from "can the agent do the task" to "can the operator trust and afford the agent in production."

## 2. Activity Comparison

| Project | Issues (24h) | PRs (24h) | Merged/Closed PRs | New Release | Health Score | Notes |
|---|---|---|---|---|---|---|
| OpenClaw | 500 updated (460 open) | 500 updated (394 open) | 106 | Diagnostic artifact only | 6.5/10 | High volume, high recurrence of P1 reliability bugs, maintainer bottleneck |
| NanoBot | 15 updated (11 open) | 500 updated (499 open) | 1 | None | 4.5/10 | Massive PR backlog (most `[conflict]`), maintainer bandwidth critical constraint |
| ZeroClaw | 48 updated | 50 updated | 4 | None | 8/10 | Active RFC governance, security series progressing, CI hardening in flight |
| NanoClaw | 1 (closed, false positive) | 32 updated | 13 | None | 8.5/10 | Maintainer-driven, architectural PRs landing cleanly; only 1 issue open |
| PicoClaw | 3 updated | 5 updated | 1 | None | 7/10 | Focused SSRF hardening; one critical bug (Slack media) unpatched |
| IronClaw | 1 new | 9 updated | 2 | None | 7.5/10 | Fast response to issue #7681 (same-day PR); routine dependency churn |
| LobsterAI | 10 updated | 17 updated | 9 | None | 6.5/10 | Security fixes merged; 4-month backlog items unresolved |
| Moltis | 3 updated | 6 updated | 5 | None | 8.5/10 | Stable, stabilization-focused; compile break fixed same-day |
| CoPaw | 10 updated | 10 updated | 2 | None | 7.5/10 | Healthy contributor pipeline; rapid bug-fix turnaround |
| NullClaw | 0 | 0 | 0 | None | N/A | No activity |
| TinyClaw | 0 | 0 | 0 | None | N/A | No activity |
| ZeptoClaw | 0 | 0 | 0 | None | N/A | No activity |
| EasyClaw | 0 | 0 | 0 | None | N/A | No activity |

## 3. OpenClaw's Position

OpenClaw remains the ecosystem's reference implementation and volume leader, processing roughly 10x the issue/PR traffic of the next most active project (NanoBot) and engaging a far larger contributor base. Its technical advantage is breadth: channel adapters (Telegram, Teams, WhatsApp, Slack, Feishu), a diamond-lobster severity-rating system, an active bot-driven triage tool (clawsweeper), and maintainer `steipete` making focused correctness passes this week (TTS structured fields, image artifact delivery, plugin tools for Codex). The gap versus peers is reliability debt: silent reply loss (#121058, 97 comments), subagent completion loss (#44925), and event-loop stalls (SQLite cleanup, transcript livelock) are P1s open for months without fix PRs. NanoClaw's container/delivery-engine refactor (#3284, mid-turn streaming as the single delivery door) directly addresses the class of problem OpenClaw's users are complaining about — OpenClaw's message-loss threads are the market pain that NanoClaw's architecture is already solving. Community trust in OpenClaw is eroding due to "fixed but still broken" cycles; meanwhile ZeroClaw and IronClaw are demonstrating faster maintainer response times on this week's issues (same-day fixes).

## 4. Shared Technical Focus Areas

**Message Delivery Guarantees & Silent-Loss Prevention** — OpenClaw (#121058, #44925, #92433: silent reply/subagent loss, no retry), NanoClaw (#3284: mid-turn streaming as single delivery door, eliminating duplicate sends; #3255: wrong-channel delivery fix), ZeroClaw (#6954 RFC: reply contract for internally initiated turns), CoPaw (#7048: cron update silent no-op). Multiple projects are treating "no silent failure" as a correctness requirement.

**Token-Cost Visibility & Budget Controls** — OpenClaw (#42475 per-agent cost budgets, #22438 tiered bootstrap), NanoBot (#5266 million-token burn with no traceability, #2463 prompt-cache-breaking prefix reconstruction), CoPaw (#7003 memory token reduction), NanoClaw (document memory persistence). Cost-accounting is now a first-class feature ask, not an add-on.

**Context & Memory Architecture** — OpenClaw (#6757 agent-triggered compaction), NanoClaw (#3278 save_document memory tool, #3257 cross-session context module), ZeroClaw (#6998 schema-validated memory consolidation, #9745 per-agent knowledge-graph attribution), CoPaw (#7065 chat history truncation). Persistent, scoped, cost-aware memory is a cross-platform priority.

**Security Hardening at Provider/Network Boundaries** — PicoClaw (#3322–#3324 SSRF via media downloads across all channels), ZeroClaw (#9580 merged, #9137/#9582/#9584 egress policy series, #6971 security RFC), LobsterAI (#1831–#1833 log redaction, IPC key-level auth, URL scheme whitelist), NanoBot (#5305 exec allowlist bypass, closed). Channel-adjacent network access and tool-execution boundaries are under active audit everywhere.

**Protocol Interoperability** — ZeroClaw (#8603, 22 comments: OpenAI Chat Completions compatibility for Open WebUI/LobeChat/Continue.dev/Aider/LangChain), Moltis (#1204: MiniMax ACP agent kind), PicoClaw (#3302: OAuth 2.1 for MCP servers), OpenClaw (#87744: Codex integration). Projects are increasingly treating external-protocol compatibility as a growth lever.

**CI/Test Reliability** — ZeroClaw (#9965, #10006, #10013: flaky parallel-runtime tests), Moltis (#1193 fanout timeout flake fixed this week). Flaky gates are blocking unrelated PRs in both projects.

## 5. Differentiation Analysis

| Project | Core Differentiator | Target User | Architecture Emphasis |
|---|---|---|---|
| OpenClaw | Reference implementation; widest channel coverage; largest community; early-comer advantage | Power users and operators needing many integrations | Gateway-centric, plugin channels, bot-driven triage |
| NanoBot | Practical task automation (cron, skills); fast time-to-value | SMB operators, task-scheduling users | Skill scheduler, Docker CLI, pragmatic feature plate |
| ZeroClaw | Governance-driven architecture; RFC-first development; WASM plugin philosophy | Enterprise operators, security-conscious developers | RFC ratification, WASM plugin sandboxing, egress policy |
| NanoClaw | Container-message-delivery correctness; multi-session agent groups; proactive architecture (v2 spec) | Developers building multi-agent deployments | Container/delivery engine, streaming-only content path, cross-session fan-out |
| PicoClaw | Lightweight multi-channel bot platform; embed-friendly | Developers embedding agent into chat apps | Channel adapters, SSRF hardening, media handling |
| IronClaw | Bot-driven development workflow; automation-first repository operation | Teams running bot-led semi-autonomous development | Automator/implementer/reviewer/resolver bot-loop, dependency automation |
| LobsterAI | Desktop GUI polish; semantic-file memory; IM-integrated UX | Individual desktop users (Windows/macOS) | Electron desktop, IM agent instances, local memory/semantic retrieval |
| Moltis | Rust-compiled reliability; local-first toolchain; AC P external agents | Rust developers, local-first privacy advocates | Rust gateway, CalDAV/vault integration, paused-clock testing discipline |
| CoPaw | Qwen-ecosystem alignment; game-dev/user features; DataPaw runtime | Qwen users, game developers, Chinese-market users | Provider unification, OAuth2 MCP servers, DataPaw analysis workspace |

## 6. Community Momentum & Maturity

**Tier 1 — Rapid iteration, healthy maintainer bandwidth:** NanoClaw (13 PRs merged/24h, architecture refactors landing, clean triage), Moltis (compile break fixed same day, flaky test stabilized, stable cadence), CoPaw (first-time contributors shipping fixes within 24h of issue reports).

**Tier 2 — Active but bottlenecked:** OpenClaw (high throughput but maintainer-review-starved P1s, recurring regressions), ZeroClaw (strong RFC governance and security momentum, but decision-queue overloaded — #8692 tracker), IronClaw (responsive, but trivial dependency-churn dominated).

**Tier 3 — Triage saturation:** NanoBot (499 open PRs, mostly stale `[conflict]`; one closed issue took 5 months to resolve).

**Tier 4 — Security-focused consolidation:** PicoClaw (focused hardening, one critical bug open), LobsterAI (security fixes merged, but 4-month-old user issues unaddressed).

**Inactive:** NullClaw, TinyClaw, ZeptoClaw, EasyClaw — no activity; effectively dormant.

The ecosystem is bifurcating: maintainer-led projects (NanoClaw, Moltis, ZeroClaw) are shipping architecture while community-driven projects (OpenClaw, NanoBot) are shipping volume but accumulating tech debt.

## 7. Trend Signals

**"Silent failure" is the industry's #1 trust killer.** Across OpenClaw, NanoBot, CoPaw, and IronClaw, users report operations that return success but don't act — silent reply drops, no-op cron updates, unpersisted OAuth tokens, attachments that become bare markers. Delivery-guarantee semantics (at-least-once, verifiable completion) are becoming the differentiator between trustworthy and untrustworthy agent platforms.

**Token cost is now an operator pain point, not just a cost issue.** NanoBot's "millions of tokens burned with no visible activity" (#5266) and OpenClaw's cost-budget requests (#42475) reflect a market shift: as agents do real work, operators need meter-level visibility and enforcement. Prompt-cache correctness (NanoBot #2463) is directly tied to cost, meaning subtle history-reconstruction bugs are now money bugs.

**Open protocol compatibility is a growth moat.** ZeroClaw's #8603 RFC (OpenAI Chat Completions profile, 22 comments) and PicoClaw's OAuth 2.1 for MCP show that projects winning ecosystem integration (Open WebUI, LobeChat, Continue.dev, Aider, LangChain) will capture users who want to retain their existing client tools. Agent-platform lock-in is losing to protocol adoption.

**Architectural simplification is replacing feature accretion.** NanoClaw's "mid-turn streaming as the single delivery door" (#3284) and ZeroClaw's #6165 RFC (lighter core through external integrations) both attack complexity as the root of reliability bugs. Multi-channel, multi-delivery-path architectures are being consolidated into single, verifiable delivery paths.

**Security reviews moved from perimeter to internal boundaries.** The SSRF hardening across PicoClaw's media downloads, ZeroClaw's plugin egress policy, and LobsterAI's IPC key-level authorization shows the ecosystem is treating channel adapters, plugin networks, and desktop IPC as first-class attack surfaces.

**For AI agent developers:** These trends mean production agent deployments will demand (a) observable, verifiable delivery (no silent drops), (b) per-agent cost budgeting and cache-correct history, (c) OpenAI-protocol compatibility for client tooling, and (d) simplified, single-path delivery architecture. Building toward these now will future-proof agent products against the ecosystem's next wave.

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

**NanoBot Project Digest — 2026-08-17**

---

## 1. Today's Overview

NanoBot shows moderate activity with 15 issues updated in the last 24 hours (11 open, 4 closed) and a striking 500 PRs updated, though only 1 was merged/closed while 499 remain open. The giant PR backlog (mostly labeled `[conflict]`) suggests maintainer bandwidth is a bottleneck, while a security advisory and several token-accounting bugs indicate ongoing stability efforts. No new releases were published today, and the project appears to be in a consolidation phase with several architectural refactors in progress.

---

## 2. Releases

No new releases were published in the last 24 hours.

---

## 3. Project Progress

Only 1 PR was merged/closed today:

- **[#4329 — feat(cli): add native TypeScript terminal UI (CLOSED)**](https://github.com/HKUDS/nanobot/pull/4329) — This PR was previously mistakenly marked merged when its head briefly appeared on `main`, but `main` was restored and the PR was closed. A replacement PR carries the same commit history forward: **[#5406](https://github.com/HKUDS/nanobot/pull/5406)**.

Closed issues today (4 total) include a Gemini model regression ([#2185](https://github.com/HKUDS/nanobot/issues/2185)), an `exec.allowPatterns` security bypass ([#5305](https://github.com/HKUDS/nanobot/issues/5305)), Matrix thread context handling ([#5275](https://github.com/HKUDS/nanobot/issues/5275)), and a cron scheduler crash ([#5373](https://github.com/HKUDS/nanobot/issues/5373)).

---

## 4. Community Hot Topics

The most active discussions in the last 24 hours:

- **[#2463 — Architectural prompt-prefix preservation issue (15 comments)**](https://github.com/HKUDS/nanobot/issues/2463) — Open since March. Users report that nanobot's persisted conversation history does not match the exact prompt prefix sent to the model, conflicting with OpenAI's prompt-caching expectations. This is a deep architectural issue affecting cost and correctness.

- **[#5266 — Token consumption logging (14 comments)**](https://github.com/HKUDS/nanobot/issues/5266) — Users report millions of tokens burned with no visible user activity, requesting per-call token logging for traceability.

- **[#2185 — Gemini regression (9 comments)**](https://github.com/HKUDS/nanobot/issues/2185) — Closed today; upgrade from 0.1.4 to 0.1.4post5 broke gemini-3-flash-preview usage.

- **[#4864 — Endless loop with complete_goal tool (6 comments, 1 reaction)**](https://github.com/HKUDS/nanobot/issues/4864) — Gateway serialization bug causing tool parameter parsing failures.

- **[#4467 — Dream skill duplication (3 comments, 1 reaction)**](https://github.com/HKUDS/nanobot/issues/4467) — Users want Dream to update existing workspace skills instead of creating duplicates each run.

Underlying themes: prompt-caching/getting token costs under control, and better tool/skill lifecycle management.

---

## 5. Bugs & Stability

Ranked by severity:

1. **[#5305 (Critical, CLOSED) — `exec.allowPatterns` allowlist bypass enables chained shell command execution**](https://github.com/HKUDS/nanobot/issues/5305) — Security advisory; allowlist bypass allows API users to execute unauthorized shell segments. Closed today, but no linked fix PR is visible in the data.

2. **[#4864 (High) — Endless loop for `<tool_call> <function=complete_goal>`**](https://github.com/HKUDS/nanobot/issues/4864) — Recent gateway change broke tool parameter serialization, causing infinite retry loops.

3. **[#5373 (High, CLOSED) — Cron scheduler dies permanently after single persistence failure**](https://github.com/HKUDS/nanobot/issues/5373) — Timer task exceptions kill the scheduler; `_arm_timer()` sits outside the `try/finally`, so no next tick fires.

4. **[#5402 (Medium) — Token consolidation never triggers because tiktoken underestimates actual token counts**](https://github.com/HKUDS/nanobot/issues/5402) — Consolidation is effectively dead code in production scenarios.

5. **[#5377 (Medium) — Consolidation truncates archive input but advances past the full message batch**](https://github.com/HKUDS/nanobot/issues/5377) — Data loss risk: truncated messages are skipped in subsequent consolidations.

6. **[#2185 (Medium, CLOSED) — Regression breaking gemini-3-flash-preview with Ollama**](https://github.com/HKUDS/nanobot/issues/2185) — Resolved in today's closed set.

---

## 6. Feature Requests & Roadmap Signals

New feature requests and enhancements this week point toward three priorities:

- **Budgeting and context efficiency** — [#5402](https://github.com/HKUDS/nanobot/issues/5402) and [#5298](https://github.com/HKUDS/nanobot/issues/5298) (budget MCP tool schemas for large tool sets) suggest the next release will focus heavily on token/context optimization.

- **Agent-initiated interactions and richer channels** — [#5289](https://github.com/HKUDS/nanobot/issues/5289) (Telegram stickers and agent-initiated reactions) and [#1306](https://github.com/HKUDS/nanobot/pull/1306) (voice/audio for Discord) indicate channel-feature parity work.

- **Skill lifecycle management** — [#5404](https://github.com/HKUDS/nanobot/issues/5404) proposes `disable-model-invocation` for skills, and [#4467](https://github.com/HKUDS/nanobot/issues/4467) asks Dream to update rather than duplicate skills. Both are likely candidates for the next minor release.

---

## 7. User Feedback Summary

Users are frustrated primarily by **unpredictable token consumption** — one report describes millions of tokens burned in two hours with no visible activity ([#5266](https://github.com/HKUDS/nanobot/issues/5266)). A related complaint is that prompt caching is undermined by incorrect prompt-prefix reconstruction ([#2463](https://github.com/HKUDS/nanobot/issues/2463)), which directly increases costs.

Power users maintaining custom skills are dissatisfied with skill duplication and lack of model-invocation control ([#4467](https://github.com/HKUDS/nanobot/issues/4467), [#5404](https://github.com/HKUDS/nanobot/issues/5404)). The security bypass ([#5305](https://github.com/HKUDS/nanobot/issues/5305)) is a trust concern for API-facing deployments. On the positive side, closed issues on Matrix threading and the Gemini regression indicate responsive triage.

---

## 8. Backlog Watch

- **[#2463 — Prompt-prefix preservation architectural issue (Since March)**](https://github.com/HKUDS/nanobot/issues/2463) — 15 comments, no resolution. This blocks reliable prompt caching and directly impacts user costs.

- **[#2185 — Gemini regression (Closed today, but took 5 months)**](https://github.com/HKUDS/nanobot/issues/2185) — Highlights slow regression resolution; community would benefit from faster triage.

- **499 open PRs, most marked `[conflict]`** — The PR queue is severely backlogged. Notable examples awaiting attention: [#1149](https://github.com/HKUDS/nanobot/pull/1149) (PromptGuard for injection detection, opened February), [#1205](https://github.com/HKUDS/nanobot/pull/1205) (KV cache reuse), and [#1072](https://github.com/HKUDS/nanobot/pull/1072) (CancelledError in tool execution, which can crash the agent process).

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-08-17

## 1. Today's Overview

ZeroClaw shows a heavily active development cycle with 48 issues and 50 PRs updated in the last 24 hours, indicating strong maintainer and contributor engagement. Architecture work dominates the agenda, with three large RFCs actively debating core protocol changes: the Chat Completions profile (#8603), unified attachment architecture (#9488), and ephemeral agent swarms (#10025). The project is mid-rollout of a significant governance RFC for work lanes and board automation (#6808), and a multi-PR plugin egress security hardening effort continues to progress. CI stability is receiving focused attention, with three test-fixture reliability tasks (#9965, #10006, #10011) and two bug fixes addressing flaky tests under the parallel runtime gate. The repo remains in a 0.8.x series with no new release published today.

## 2. Releases

No new releases were published in this window.

## 3. Project Progress

Four PRs were merged or closed in the last 24 hours:

- **[#9580 — fix(security): harden built-in HTTP egress on the shared network guard](https://github.com/zeroclaw-labs/zeroclaw/pull/9580)** (closed) — Merged security hardening for the built-in HTTP egress boundary, rejecting non-global IPv4/IPv6 addresses and moving shared network-classification primitives into `zeroclaw-infra::net_guard`, providing the foundation for the plugin egress policy stages.
- **[#9416 — docs(tools): document that AllToolsResult.tools is the pre-filter registry](https://github.com/zeroclaw-labs/zeroclaw/pull/9416)** (closed) — Small documentation fix clarifying the contract of `AllToolsResult.tools` versus `unfiltered_tool_arcs`.
- **[#9953 — [Bug]: SOP step schema validation rejects a double-encoded output object instead of unwrapping it](https://github.com/zeroclaw-labs/zeroclaw/issues/9953)** (closed) — Fixed a runtime bug where auto-mode SOP steps rejected double-encoded JSON output objects rather than unwrapping them.
- One additional PR is counted as closed/merged, bringing the total to four.

Relatedly, the plugin egress security series advances: #9580's merge unblocks #9137 (shared egress policy foundation), #9582 (host-owned egress policy on plugin `wasi:http`), and #9584 (egress grant ceremony for plugin install/list), all waiting on review.

## 4. Community Hot Topics

The most active discussion threads reveal the community's focus on protocols, security boundaries, and governance:

- **[#6808 — RFC: Work Lanes, Board Automation, and Label Cleanup](https://github.com/zeroclaw-labs/zeroclaw/issues/6808)** (23 comments) — Ratified governance RFC guiding how work is triaged, with label cleanup and automation rollout in progress. It underpins the project's escalating RFC throughput.
- **[#8603 — RFC: ZeroClaw Chat Completions profile](https://github.com/zeroclaw-labs/zeroclaw/issues/8603)** (22 comments) — Strong demand for OpenAI-protocol compatibility so clients like Open WebUI, LobeChat, Continue.dev, Aider, and LangChain can talk to ZeroClaw. The high engagement signals a strategic integration priority.
- **[#9488 — RFC: Unified attachment architecture for web chat and channels](https://github.com/zeroclaw-labs/zeroclaw/issues/9488)** (17 comments) — Proposes standardizing how attachments flow across all channels, a cross-cutting concern that touches gateway, runtime, web UI, and security.
- **[#6954 — RFC: Provenance, conversation binding, and reply contract for internally initiated agent turns](https://github.com/zeroclaw-labs/zeroclaw/issues/6954)** (14 comments) — Defines how cron- or daemon-initiated turns bind to conversations and reply, a correctness gap affecting reliability.
- **[#6971 — RFC: Security posture, credential boundaries, and universal ingress policy](https://github.com/zeroclaw-labs/zeroclaw/issues/6971)** (14 comments) — Security architecture RFC covering credentials, isolation, ingress trust, and tool approval.
- **[#6165 — RFC: Prefer a lighter ZeroClaw core through external integrations](https://github.com/zeroclaw-labs/zeroclaw/issues/6165)** (14 comments) — Debate over pulling long-tail integrations out of the core to reduce configuration and security surface.
- **[#8692 — [Tracker]: Maintainer decision queue for RFCs and design issues](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)** (13 comments) — Active tracker showing maintainers are processing many design decisions; 13 comments here reflect how overloaded the decision queue is.
- **[#8780 — RFC: Realtime speech-to-speech channel for Gemini Live](https://github.com/zeroclaw-labs/zeroclaw/issues/8780)** (13 comments, revised 2026-08-16) — Rewritten as a broker contract for realtime voice channels, aiming to add Gemini Live as the first implementation.
- **[#10025 — RFC: zeroclaw swarm — ephemeral agent swarms with a crush-style TUI](https://github.com/zeroclaw-labs/zeroclaw/issues/10025)** (1 comment, filed 2026-08-16) — New proposal to spin up ephemeral multi-agent teams around a single goal with an interactive TUI front-end, targeting the gap where no orchestrator exists.

## 5. Bugs & Stability

No new bugs were filed today, but several in-flight issues were updated and three stability tasks are active:

**High severity (P1):**
- **[#9965 — [Task]: runtime-written executable test fixtures hit ETXTBSY under the parallel runtime gate](https://github.com/zeroclaw-labs/zeroclaw/issues/9965)** — Flaky CI failure (`ETXTBSY`) in the cron scheduler test. Fix in progress; related to #10011 and #10006.
- **[#10006 — [Task]: endpoint_lock_is_held_through_guard_cleanup flakes under the Parallel Runtime Test gate on unrelated PRs](https://github.com/zeroclaw-labs/zeroclaw/issues/10006)** (status: in-progress) — Race condition causing red required checks on unrelated PRs; actively being fixed.
- **[#10013 — [Bug]: Edge TTS cancellation test can miss fake child startup under parallel load](https://github.com/zeroclaw-labs/zeroclaw/issues/10013)** — Intermittent CI failure in TTS channel tests.
- **[#9655 — [Bug]: approval cards carry no position, so back-to-back cards from one message are indistinguishable before tapping](https://github.com/zeroclaw-labs/zeroclaw/issues/9655)** — Operator confusion when multiple tool calls on one Telegram message produce identical approval cards; the tap target is ambiguous.
- **[#9811 — [Bug]: /health reports a channel healthy that has never connected](https://github.com/zeroclaw-labs/zeroclaw/issues/9811)** — Health endpoint reports `healthy` for a Telegram channel with an invalid bot token that has never successfully connected.

**Medium severity (P2):**
- **[#10020 — [Bug]: Agentic independent delegates ignore the target thinking policy](https://github.com/zeroclaw-labs/zeroclaw/issues/10020)** (status: in-progress) — Delegate calls with `mode = "independent"` resolve the target agent profile but fail to apply its `thinking` configuration.
- **[#10037 — [Bug]: POST /api/cron silently stores invalid session_target as isolated](https://github.com/zeroclaw-labs/zeroclaw/issues/10037)** (status: in-progress) — API accepts undocumented `session_target` values and silently falls back to `"isolated"` instead of rejecting.
- **[#10019 — [Docs]: Align the prompt-injection deprecation deadline after Schema V4](https://github.com/zeroclaw-labs/zeroclaw/issues/10019)** — Documentation mismatch across locales and config warnings after the Schema V4 change.

Fix PRs exist for the CI flake cluster: #10011 directly addresses the runtime-written fixture pattern in the daemon heartbeat test, and #10006 is in-progress.

## 6. Feature Requests & Roadmap Signals

Multiple accepted features are queued and likely to land in the next release:

- **[#6998 — [Feature]: Schema-validated memory consolidation with bounded fallback](https://github.com/zeroclaw-labs/zeroclaw/issues/6998)** (status: accepted) — Replace fragile prompt-based JSON parsing with schema-validated memory consolidation.
- **[#7881 — [Feature]: Add provider fallback circuit breakers](https://github.com/zeroclaw-labs/zeroclaw/issues/7881)** (status: accepted) — Quarantine repeatedly failing providers to keep the fallback chain healthy.
- **[#7883 — [Feature]: Expose intra-family provider fallback notices](https://github.com/zeroclaw-labs/zeroclaw/issues/7883)** (status: accepted) — Surface when fallback serves from a different model within the same provider family.
- **[#7887 — [Feature]: Add date-range conditional schedules for cron jobs](https://github.com/zeroclaw-labs/zeroclaw/issues/7887)** (status: accepted) — Allow cron jobs to switch to a more frequent conditional schedule during bounded date ranges.

Strong roadmap signals from active RFCs likely to shape 0.9.x:
- **OpenAI Chat Completions compatibility** (#8603) — Would unlock the broader LLM tool ecosystem.
- **Ephemeral agent swarms** (#10025) — A new TUI-driven orchestration layer.
- **Unified attachment architecture** (#9488) — Cross-channel attachment standardization.
- **Realtime speech-to-speech channels** (#8780) — First implementation targeting Gemini Live.
- **WASM plugin lifecycle hooks** (#7822) — Third-party plugins subscribing to agent lifecycle events.

## 7. User Feedback Summary

The community demonstrates sophisticated operator and maintainer expectations:

- **Protocol interoperability is the top demand**: The #8603 thread (22 comments) is driven by real users of Open WebUI, LobeChat, Continue.dev, Aider, and LangChain who cannot use ZeroClaw through their preferred clients today.
- **Multi-agent orchestration is a stated gap**: #10025's swarm RFC begins with "config surgery" as the current alternative for standing up a small team of agents, calling out that `GoalTaskRecord` and `TaskStatus::Paused` exist in the control plane but nothing orchestrates them.
- **Security posture is actively scrutinized**: The egress hardening series (#9580 merged, #9582/#9584 open) and the security-posture RFC (#6971) show users expect enterprise-grade controls for plugin network access, credential boundaries, and ingress policy.
- **Operator experience issues surface in daily use**: The approval-card ambiguity (#9655) on Telegram, the false-healthy channel status (#9811), and the silent cron `session_target` fallback (#10037) all reflect real operator confusion in production-like scenarios.
- **Memory and knowledge isolation**: #6998 (schema-validated memory consolidation) and the open PR #9745 (per-agent knowledge-graph attribution) respond to users hitting fragile memory behavior and cross-agent data leakage.
- **CI reliability is an active pain point**: Three issues (#9965, #10006, #10013) describe flaky gates blocking unrelated PRs, and maintainers have responded with dedicated tasks to harden fixtures.

## 8. Backlog Watch

Several issues and PRs have been waiting for maintainer or author action and merit attention:

- **[#8396 — RFC: Make wire protocol first-class in provider construction and onboarding](https://github.com/zeroclaw-labs/zeroclaw/issues/8396)** (7 comments, needs-author-action) — Open since 2026-06-27 without maintainer review, a structural proposal that would simplify provider onboarding.
- **[#7822 — [RFC]: WASM plugin lifecycle hook subscriptions (PluginCapability::Hook)](https://github.com/zeroclaw-labs/zeroclaw/issues/7822)** (5 comments, needs-author-action) — Open since 2026-06-17; third-party plugin visibility into agent lifecycle events remains unimplemented.
- **[#9109 — feat(providers): add native Hailo-Ollama support](https://github.com/zeroclaw-labs/zeroclaw/pull/9109)** (needs-author-action) — Large XL PR for on-device AI hardware support, stalled since mid-July.
- **[#9126 — feat(plugins): validate typed instance config](https://github.com/zeroclaw-labs/zeroclaw/pull/9126)** (needs-author-action) — XL PR requiring closed Draft 2020-12 schemas for plugin configs; key to plugin safety, block for the plugin ecosystem.
- **[#9002 — fix(gateway): keep agent turns alive after viewer disconnect](https://github.com/zeroclaw-labs/zeroclaw/pull/9002)** (needs-author-action) — XL bug fix addressing a critical UX failure where navigation or network loss cancels in-flight agent work; open since 2026-07-11.
- **[#9745 — fix(memory): add per-agent attribution and scoping to the knowledge graph](https://github.com/zeroclaw-labs/zeroclaw/pull/9745)** (needs-author-action) — XL security fix for cross-agent memory leakage; open since 2026-08-04.
- **[#9854 — fix(providers): derive context-window discovery from the family registry](https://github.com/zeroclaw-labs/zeroclaw/pull/9854)** (needs-author-action) — XL correction replacing a hand-written eight-name list with registry-driven discovery.
- **[#9137 — feat(plugins): add shared egress policy foundation](https://github.com/zeroclaw-labs/zeroclaw/pull/9137)** (needs-maintainer-review) — The base layer for the plugin egress security series; this and its dependents (#9582, #9584) put plugin network access security on hold until reviewed.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

**Date:** 2026-08-17

## 1. Today's Overview
PicoClaw shows a healthy level of activity with 3 issues and 5 PRs updated in the last 24 hours. The project is actively focused on security hardening, particularly around SSRF protections for media downloads across multiple channels (WeChat, WeCom, QQ, Telegram, Discord, LINE, Slack). A single PR (#3193) was closed, representing a feature addition for a new "simplex" channel type. A new critical bug was reported today regarding Slack media uploads failing due to missing file size metadata.

## 2. Releases
No new releases were published in the last 24 hours. No changelog or migration information is available.

## 3. Project Progress
- **#3193 (CLOSED):** PR "Added simplex channel type" by `dim` was merged/closed. This introduces a new communication channel for the platform, expanding its integration capabilities. The PR was marked as a new feature and was part of the 4 open ones at time of closure.

## 4. Community Hot Topics
- **Issue #3302 (OAuth 2.1 for MCP servers):** With 3 comments, this feature request continues to attract discussion. Users are seeking better authentication compatibility for MCP servers, referencing a prior issue (#2546). The requests highlight a growing need for modern, enterprise-grade auth standards in the agent ecosystem.
- **Issue #3325 (Telegram table rendering):** Active discussion around improving Telegram message formatting to use native table UI introduced in Bot API 10.1. Contributors are eager to move beyond MarkdownV2 limitations to deliver richer, structured data to end-users. The request is marked as an enhancement.

## 5. Bugs & Stability
- **High Severity — Issue #3338 (Slack media uploads fail):** Reported today, `SendMedia` fails to set `FileSize` in `slack.UploadFileParameters`, leading to all uploads failing with `file size cannot be 0` before network calls. The issue blocks any image or file sharing to Slack. No associated fix PR exists yet.
- **Medium Severity — PR #3322 (SSRF on inbound media downloads):** An open fix addresses a security vulnerability where crafted media URLs in QQ/Telegram/Discord/LINE/Slack could reach loopback or private hosts. The PR adds `BlockPrivateTargets` hardening via `utils.DownloadFile`. The underlying issue remains open and is being actively patched.
- **Medium Severity — PR #3323 & #3324 (WeCom/Weixin SSRF risks):** Two open fixes address similar SSRF vulnerabilities in WeCom and Weixin media downloads. They propose switching to `CreateSafeHTTPClient` and validating URLs before fetching. The fixes are siblings of #3322, indicating a broader security audit of media handling.

## 6. Feature Requests & Roadmap Signals
- **OAuth 2.1 for MCP servers (Issue #3302):** Marked as a "Nice-to-Have", this request indicates a push towards modern authentication for MCP servers, likely becoming a priority if enterprise users demand it.
- **Native Exa web search provider (PR #3299):** An open PR proposes adding Exa as a native provider for `tools.web`, with support for date filters and API key auth. If merged, it would expand the search capabilities to a newer, AI-focused API.
- **Telegram native tables (Issue #3325):** With the Bot API evolving, this enhancement is likely to be picked up in a future release to improve UX for structured data display.

## 7. User Feedback Summary
- **Blocked Slack integration:** A user reports that Slack media uploads are completely broken (`file size cannot be 0`). This is a functional regression that prevents core collaboration features from working, causing immediate dissatisfaction.
- **Security-conscious community:** Multiple PRs from `SashaMIT` address SSRF vulnerabilities, indicating users are actively auditing and fixing security gaps in media handling across channels. This suggests a developer community that values secure defaults and hardened network clients.
- **Desire for richer messaging:** Users are pushing for native Telegram table rendering, showing a clear preference for high-fidelity messaging output over plain text fallback.

## 8. Backlog Watch
- **PR #3299 (Native Exa web search provider):** Open for over 3 weeks without recent maintainer comments. The PR adds significant functionality but appears stalled, needing review or feedback from maintainers.
- **PR #3193 (Added simplex channel type):** Closed after a long period (created June 27, closed August 16). While closed, the long time-to-merge suggests maintainers may have a heavy backlog or are selective about channel integrations.
- **Issue #3302 (OAuth 2.1):** Open since July 30 with 3 comments but no maintainer response. This request is gaining traction but lacks an official roadmap commitment.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

**NanoClaw Project Digest — 2026-08-17**

---

## 1. Today's Overview

NanoClaw is in a period of intense core-platform development. The last 24 hours saw 32 pull requests updated, with 13 merged/closed, reflecting a highly active maintainer-driven push. Work concentrated on the container/delivery engine, cross-session context management, channel adapter capabilities, and permissions. Only one issue was updated (closed as filed in error), and no new releases were cut, indicating the team is consolidating a large batch of changes before the next version tag.

---

## 2. Releases

No new releases were published in the last 24 hours. No changelog, migration, or breaking-change notes to report.

---

## 3. Project Progress

Thirteen PRs were merged or closed, representing significant advances across the stack:

- **[PR #3284 — Container: Mid-Turn Streaming as the Single Delivery Door](https://github.com/nanocoai/nanoclaw/pull/3284)** *(closed)*: Enforces that for streaming providers (`emitsMidTurnText`), mid-turn stream output is the only content delivery path. The final result message no longer sends content, eliminating duplicate sends without persistent dedupe state.
- **[PR #3262 — Chat SDK Bridge Agent-Mode DM Surface](https://github.com/nanocoai/nanoclaw/pull/3262)** *(closed)*: Captures app context and normalizes DM thread IDs for platforms where DMs materialize as conversation threads; wires a `dm-opened` hook.
- **[PR #3259 — Setup/Tooling Wizard Fixes](https://github.com/nanocoai/nanoclaw/pull/3259)** *(closed)*: Fixes skill-apply step-ordinal display, surfaces headless-browser URLs, and improves inherit-script extraction.
- **[PR #3260 — `decline_notify` Unknown-Sender Policy](https://github.com/nanocoai/nanoclaw/pull/3260)** *(closed)*: New fourth policy for DM-shaped surfaces: the bot politely declines unknown senders and sends the owner a one-line FYI instead of a full approval card.
- **[PR #3261 — Optional Adapter Capabilities](https://github.com/nanocoai/nanoclaw/pull/3261)** *(closed)*: Adds capability-gated `setTyping` (with status line), `setThreadTitle`, and `setSuggestedPrompts` to the channel adapter surface.
- **[PR #3263 — Hot-Start Registered Adapter](https://github.com/nanocoai/nanoclaw/pull/3263)** *(closed)*: `startChannelAdapter(key)` replays the four boot steps for newly registered adapters without full restart.
- **[PR #3264 — Delivery Batch Preview Hook](https://github.com/nanocoai/nanoclaw/pull/3264)** *(closed)*: `registerDeliveryBatchPreview` lets modules observe an entire undelivered batch (e.g., for prefetching) without being able to break delivery.
- **[PR #3265 — `suppressCreatedNotify` Option](https://github.com/nanocoai/nanoclaw/pull/3265)** *(closed)*: `createAgent` now accepts an option to suppress only the success notification, keeping all error notifications intact.
- **[PR #3266 — Channel Card Interceptor Seam](https://github.com/nanocoai/nanoclaw/pull/3266)** *(closed)*: New pre-card interception point in the registration approval flow, allowing modules to auto-handle or deliberately ignore escalations.
- **[PR #3283 — Preserve Structured Chat Links](https://github.com/nanocoai/nanoclaw/pull/3283)** *(closed)*: Fixes the shared formatter to append hidden, deduplicated URLs from `links[]` when the Chat SDK provides them.
- **[PR #3278 — Save Word/PDF Documents to Memory](https://github.com/nanocoai/nanoclaw/pull/3278)** *(closed)*: First story of the Document Memory epic — new `save_document` MCP tool persists `.docx`/`.pdf` files to durable agent memory.
- **[PR #1251 — OpenMail Email Channel Skill](https://github.com/nanocoai/nanoclaw/pull/1251)** *(closed)*: Older PR (from March) finally closed; adds `/add-openmail` for email capabilities in channel, tool, and notify modes.

---

## 4. Community Hot Topics

The most active discussion centers on **core-team architecture PRs** refining the container and delivery engine:

- **[PR #3254 — Two-Phase Inbound Batch Selection](https://github.com/nanocoai/nanoclaw/pull/3254)**: Addresses a subtle but critical bug where a backlog of context rows could push a due task out of the capped batch, causing the wake to fire without the work reaching the agent.
- **[PR #3257 — Cross-Session Context Module](https://github.com/nanocoai/nanoclaw/pull/3257)**: Designs how messages fan out to sibling sessions, how DMs get backfilled, and how echoes are pruned — plus a new `ncl sessions history` CLI command.
- **[PR #3256 — Detached Conversations](https://github.com/nanocoai/nanoclaw/pull/3256)**: Introduces `detached_at` so removed platform conversations retain wiring/session rows instead of being deleted, while delivery refuses sends into them.

These PRs together signal the team is hardening multi-session, multi-instance behavior — the core scalability story for agent groups.

---

## 5. Bugs & Stability

A handful of bug-fix PRs are in flight. Severity ranking (high to low):

1. **[PR #3254 — Context Rows Crowding Out Due Tasks](https://github.com/nanocoai/nanoclaw/pull/3254)** *(open)* — **High.** The wake fires but work never reaches the agent; the fix (two-phase selection: due triggers first, then context fill) exists but is unmerged.
2. **[PR #3255 — Wrong Channel for Outbound Delivery](https://github.com/nanocoai/nanoclaw/pull/3255)** *(open)* — **High.** With multiple adapter instances sharing an address, delivery could target an arbitrary sibling row instead of the sender's own channel. Fix PR in review.
3. **[PR #3281 — CLI Tasks Blind to Legacy Sessions](https://github.com/nanocoai/nanoclaw/pull/3281)** *(open, fixes #3233)* — **Medium.** Agent-scoped `ncl tasks` miss pre-2.1.54 legacy sessions due to overly strict session matching.
4. **[PR #2752 — Discord Attachments Never Reach Agent](https://github.com/nanocoai/nanoclaw/pull/2752)** *(open, since June)* — **Medium.** Discord attachments (pasted text/images) become bare `[file: ...]` markers with no bytes; fix PR has been waiting ~2 months for review.
5. **[PR #3280 — Empty String Instead of NULL in Group Config](https://github.com/nanocoai/nanoclaw/pull/3280)** *(open)* — **Low-Medium.** `--model ""` stores empty string rather than NULL, leaking into `container.json` and confusing the runtime.
6. **[PR #3282 — Telegram Pairing Code With Spaces](https://github.com/nanocoai/nanoclaw/pull/3282)** *(open)* — **Low.** Cosmetic UX bug when pasting the displayed space-separated pairing code.

---

## 6. Feature Requests & Roadmap Signals

- **Document Memory + Fill-In Editing (PR #3278)**: The merged `save_document` tool is labeled "Story 1.1" of a larger epic (`spec-document-memory`, `architecture-nanoclaw-v2-2026-08-16`). Expect more memory/document tooling in upcoming releases.
- **Cross-Session Context (PR #3257)**: Fan-out, DM backfill, and echo pruning are in active review — a strong signal that multi-session agent groups are a v2 priority.
- **Rich Presence / Capability-Gated Adapters (PR #3261)**: Status-bearing typing indicators, thread titles, and suggested prompts suggest deeper platform-integration polish is coming.

---

## 7. User Feedback Summary

- **Pain Point — Discord attachments unusable**: The June PR #2752 has sat unanswered for two months; users on Discord still cannot see attachment contents. This is the longest-standing unaddressed user-facing bug.
- **Pain Point — Config footguns**: `ncl groups config update` cannot unset a value (`--model ""` breaks runtime expectations), and Telegram setup rejects its own displayed pairing code when pasted verbatim — both small but real UX frictions.
- **Feature demand — Email integration**: The OpenMail skill (PR #1251) finally closed after ~5 months, suggesting sustained external interest in email channels for agents.

---

## 8. Backlog Watch

- **[PR #2752 — Discord Attachment Staging](https://github.com/nanocoai/nanoclaw/pull/2752)** — Opened June 12, still no maintainer response. High user impact (Discord is a flagship channel); needs triage or explicit deferral.
- **[PR #1251 — OpenMail Email Skill](https://github.com/nanocoai/nanoclaw/pull/1251)** — Closed after ~5 months; watch for follow-up bugs or integration issues as users adopt it.
- **No new unreferenced issues** are awaiting attention — the single issue today (#3271) was a false positive from a wrong-repo post.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

**IronClaw Project Digest — 2026-08-17**

**1. Today's Overview**  
IronClaw shows moderate activity over the past 24 hours, with 1 new open issue and 9 PRs updated. While 7 PRs remain open, the project merged 2 PRs (a dependency bump and a core cleanup task). The most significant development is a new feature PR (#7682) directly addressing the sole open issue (#7681) regarding Slack unlinked-user onboarding — a deliberately fast response, indicating a highly responsive maintainer workflow this cycle. All other activity is dominated by routine Dependabot automated dependency renovations, with no new releases or version tags cut.

**2. Releases**  
None.

**3. Project Progress**  
- **#7683** (merged, XS, core): Removed retired IronLoop network settings (`network_access` fields) from the trusted repository configuration, preserving all existing automated Implement, Tester, Review, and Resolve behaviors. This is a housekeeping/tech-debt cleanup for the bot-driven workflow.
- **#7632** (merged/closed, M, low risk): Automated dependency bump across 4 packages in the `everything-else` group (`base64`, `toml`, `rstest`, `jsonschema`), improving compatibility and security posture.

**4. Community Hot Topics**  
- **#7681** [Issue, Open]: "Slack: unlinked-user connect message is public and requires a manual round trip" — The only new issue. It flags two real UX flaws: the bot’s connection prompt is publicly visible in shared channels (privacy leak) and the flow forces the user into a manual multi-step web-app connection without context. The attached PR (#7682) is already open, signaling the maintainers are actively treating this as a priority.
- **#7682** [PR, Open]: "fix(slack): deliver the unlinked-user connect nudge privately, with a one-click connect link" — This PR is the direct fix for the above issue, intending to deliver the nudge via DM and embed a context-preserving one-click link. This is the single most important community-facing change in this digest.

**5. Bugs & Stability**  
No crashes, regressions, or high-severity runtime bugs were reported in the last 24 hours. The only user-facing flaw is the **Slack onboarding privacy and friction issue (#7681)**. Severity: **Medium** (privacy exposure + poor UX, not a system outage). A fix PR (#7682) is already submitted and pending review, with no known conflicts with the open dependency bumps.

**6. Feature Requests & Roadmap Signals**  
- **(Expected Next Version)** Slack unlinked-user private onboarding with one-click linking: The combination of Issue #7681 + PR #7682 strongly indicates a near-term feature release focused on smoother Slack channel integrations. The one-click connect link implies an internal lightweight tokenized handoff mechanism.
- **(Potential Future)** Deterministic automation result routing: PR #7651 (still open, XL size) introduces `result_delivery` suppression logic for automations, allowing workflows to "only notify on match/change" with deterministic fallback. This is a maturing automation-control feature that will likely land after the Slack fix, reflecting a trend toward giving users granular control over bot output noise.

**7. User Feedback Summary**  
The only direct user pain point captured this cycle is the **public, context-losing Slack connection message (Issue #7681)**: users in a shared channel are outed as unlinked, and the follow-up flow is manual and disorienting (“what's the link to connect you?”). Satisfaction signals are indirect but positive: the maintainers immediately acted on this report within 24 hours, and the new PR (#7682) is scoped to fix both privacy and context continuity. There is no feedback indicating dissatisfaction with core agent behavior.

**8. Backlog Watch**  
- **#7406** [PR, Open, since Aug 9]: CI dependency bump (`actions` group, 4 updates). It includes `anthropics/claude-code-action`, which is critical for the IronLoop workflow; though marked medium risk, it has not been merged in over a week — worth checking for CI test failures or maintainer reluctance.
- **#7020** [PR, Open, since Aug 2]: `tokio-tungstenite` 0.29.0 → 0.30.0 bump. Longest-pending dependency update; the major version change may require code adjustments in WebSocket handling, but no maintainer comments have surfaced.
- **#7262** [PR, Open, since Aug 5]: `wasm` group update (`wit-component` / `wit-parser` 0.254.0 → 0.256.0). Quietly sitting for 12 days; likely needs a maintainer check for breaking WebAssembly toolchain changes.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI Project Digest — 2026-08-17

## 1. Today's Overview

LobsterAI shows moderate activity with 10 issues and 17 PRs updated in the last 24 hours. No new releases were published, and the majority of updated items are stale-tracked issues from April 2026, indicating a potential backlog of long-standing community concerns. However, 9 PRs have been closed or merged, with a strong cluster of security-focused fixes (PRs #1831–#1833) and UI/UX improvements that appear to be advancing the codebase. A notable new PR (#2452) addresses provider prefix preservation for slashed model IDs, signaling continued support for custom model configurations. The project appears to be in a stabilization phase, with recent work targeting security hardening and resolving user-reported regressions.

## 2. Releases

No new releases were published in the last 24 hours. The most recent release history is not available from the provided data.

## 3. Project Progress

Nine PRs were merged or closed during this period:

- **Security hardening (3 merged PRs):** PR [#1831](https://github.com/netease-youdao/LobsterAI/pull/1831) adds log redaction for sensitive data in main process and IM modules; PR [#1832](https://github.com/netease-youdao/LobsterAI/pull/1832) restricts `store:*` IPC access with key-level authorization; PR [#1833](https://github.com/netease-youdao/LobsterAI/pull/1833) adds a scheme whitelist for `shell.openExternal` to block `file:`, `javascript:`, `data:`, and other dangerous protocols.
- **Agent & IM improvements:** PR [#1690](https://github.com/netease-youdao/LobsterAI/pull/1690) adds confirmation modals before deleting IM instances (DingTalk, Feishu, QQ). PR [#1691](https://github.com/netease-youdao/LobsterAI/pull/1691) introduces Agent template import/export via JSON files. PR [#1693](https://github.com/netease-youdao/LobsterAI/pull/1693) improves the model setup entry flow and preserves draft input when no model is configured. PR [#1760](https://github.com/netease-youdao/LobsterAI/pull/1760) adds image avatar support for custom agents alongside existing emoji avatars.
- **Bug fixes:** PR [#1715](https://github.com/netease-youdao/LobsterAI/pull/1715) fixes missing `session_id` in OpenClaw server-side proxy requests, resolving a multi-session concurrency identification issue. PR [#1835](https://github.com/netease-youdao/LobsterAI/pull/1835) removes duplicate system error messages when `continueSession` fails.

## 4. Community Hot Topics

The most active discussion remains Issue [#1813](https://github.com/netease-youdao/LobsterAI/issues/1813) (8 comments, closed): "DeepSeek V4 cannot be used — LLM request failed: provider rejected the request schema or tool payload." This indicates users are eager to use new model versions (DeepSeek V4) but encountering compatibility issues with the tool-calling payload schema.

Issue [#1698](https://github.com/netease-youdao/LobsterAI/issues/1698) (3 comments, open) highlights a port conflict and process race condition when installing the "ZhiQi Emperor Crab" extension alongside LobsterAI — a recurring theme of ecosystem interoperability problems.

Issue [#1744](https://github.com/netease-youdao/LobsterAI/issues/1744) (3 comments, open) is a bug report that failed to upload an attachment, suggesting possible friction in the issue-reporting workflow.

PR [#2452](https://github.com/netease-youdao/LobsterAI/pull/2452) (open, updated today) fixes provider prefix preservation for model IDs containing slashes (e.g., `custom_0` + `deepseek-ai/DeepSeek-V4-Flash`), likely addressing the root cause behind some model configuration failures reported in Issue #1813.

## 5. Bugs & Stability

The following bugs and stability issues were updated in the last 24 hours, ranked by severity:

- **High — DeepSeek V4 integration failure (Issue [#1813](https://github.com/netease-youdao/LobsterAI/issues/1813), closed):** Provider rejects the request schema/tool payload. This blocks use of a major model family. PR [#2452](https://github.com/netease-youdao/LobsterAI/pull/2452) may be a partial fix, but the schema rejection itself may require deeper changes.
- **High — Gateway port conflict and process race (Issue [#1698](https://github.com/netease-youdao/LobsterAI/issues/1698), open):** Reproducible 100% of the time when installing "ZhiQi Emperor Crab" while LobsterAI is running. No linked fix PR yet.
- **Medium — Write/Edit tool execution always fails (Issue [#1796](https://github.com/netease-youdao/LobsterAI/issues/1796), closed):** User reports Write/Edit tools failing persistently for days, even after app updates. Closed as stale, but no resolution mentioned.
- **Medium — Diff display broken after update (Issue [#1783](https://github.com/netease-youdao/LobsterAI/issues/1783), open):** User located a bug in `extractDiffFromToolInput` function that fails to extract `oldText`/`newText` from the edit tool input, breaking the diff view.
- **Low — Windows install icon appears white and non-functional (Issue [#1714](https://github.com/netease-youdao/LobsterAI/issues/1714), open):** ~50% probability of broken icon during installation on Windows 11.

The security-focused merged PRs ([#1831](https://github.com/netease-youdao/LobsterAI/pull/1831), [#1832](https://github.com/netease-youdao/LobsterAI/pull/1832), [#1833](https://github.com/netease-youdao/LobsterAI/pull/1833)) address critical vulnerabilities in log exposure, IPC privilege escalation, and unsafe URL handling — these are closed and presumably shipped or pending release.

## 6. Feature Requests & Roadmap Signals

From open issues updated recently:

- **Email connection via OAuth2 (Issue [#1745](https://github.com/netease-youdao/LobsterAI/issues/1745)):** User requests support for Microsoft Outlook's modern authentication, as plain app passwords are blocked. This suggests the IM/email integration layer needs broader auth support.
- **Temperature control for LLM calls (Issue [#1688](https://github.com/netease-youdao/LobsterAI/issues/1688)):** User wants to dynamically adjust the temperature parameter in conversations via keywords. This signals interest in finer-grained model parameter controls.
- **Conversation batch deletion (Issue [#1797](https://github.com/netease-youdao/LobsterAI/issues/1797), closed):** User requested batch deletion of conversations to maintain context quality.

PRs in flight that may land soon: skeleton loading screens ([#1769](https://github.com/netease-youdao/LobsterAI/pull/1769)), enhanced empty states ([#1770](https://github.com/netease-youdao/LobsterAI/pull/1770)), and text-to-speech for AI replies ([#1682](https://github.com/netease-youdao/LobsterAI/pull/1682)). Given that 9 PRs closed today, several feature PRs remain open and could be merged soon.

## 7. User Feedback Summary

- **Positive:** Users appreciate the rapid iteration — one user with the diff bug (Issue [#1783](https://github.com/netease-youdao/LobsterAI/issues/1783)) performed deep code analysis of the app.asar to identify the root cause, demonstrating strong community technical engagement.
- **Negative:** The recurring "stale" label on closed issues suggests that some user problems may not be fully resolved before being closed — e.g., Write/Edit tool failures (Issue [#1796](https://github.com/netease-youdao/LobsterAI/issues/1796)) and DeepSeek V4 issues (Issue [#1813](https://github.com/netease-youdao/LobsterAI/issues/1813)) were closed despite incomplete resolutions.
- **Frustration points:** Windows installation reliability (Issue [#1714](https://github.com/netease-youdao/LobsterAI/issues/1714)), ecosystem extension conflicts (Issue [#1698](https://github.com/netease-youdao/LobsterAI/issues/1698)), and OAuth2 restrictions on major email providers (Issue [#1745](https://github.com/netease-youdao/LobsterAI/issues/1745)) are the most common pain points.
- **Honor:** Issue [#1797](https://github.com/netease-youdao/LobsterAI/issues/1797) received 1 thumbs-up, indicating some community support for batch conversation deletion.

## 8. Backlog Watch

The following items have been open for ~4 months (since April 2026) and need maintainer attention:

- **Issue [#1698](https://github.com/netease-youdao/LobsterAI/issues/1698) (gateway port conflict):** Open since 2026-04-15, 100% reproducible, blocking ecosystem extension usage, no linked PR.
- **Issue [#1745](https://github.com/netease-youdao/LobsterAI/issues/1745) (OAuth2 email support):** Open since 2026-04-19, blocks Outlook users entirely, no acknowledgments or linked PRs.
- **Issue [#1783](https://github.com/netease-youdao/LobsterAI/issues/1783) (diff regression):** Open since 2026-04-21, root cause identified by the user, no maintainer response in the visible thread.
- **Issue [#1688](https://github.com/netease-youdao/LobsterAI/issues/1688) (temperature control):** Open since 2026-04-15, minimal engagement (1 comment).
- **Stale PRs:** PRs [#1765](https://github.com/netease-youdao/LobsterAI/pull/1765) (dependency bump), [#1769](https://github.com/netease-youdao/LobsterAI/pull/1769) (skeleton loading), [#1770](https://github.com/netease-youdao/LobsterAI/pull/1770) (empty states) have been open since April without merge or closure — these are low-risk UI improvements that could reduce visible backlog if processed.

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

**Moltis Project Digest — 2026-08-17**

---

## 1. Today's Overview
Moltis is in a healthy, stabilization-focused phase. The project saw three issues and six pull requests updated in the last 24 hours, with five PRs merged or closed and only one still open. A critical compile break on `main` was identified and addressed with two stacked fixes, and a flaky gateway test was stabilized by running it on a paused clock. No new releases were published during the reporting period.

---

## 2. Releases
No new releases were published in the last 24 hours. No changelog, migration, or breaking-change notes to report.

---

## 3. Project Progress
Five pull requests were merged or closed, covering several areas:

- **Gateway runtime fix**: [PR #1201](https://github.com/moltis-org/moltis/pull/1201) resolved a compile break on `main` by threading `start_background_tasks` into the memory runtime builder, fixing a broken refactor in `init_memory.rs` that left the crate uncompilable.
- **Test stability**: [PR #1203](https://github.com/moltis-org/moltis/pull/1203) fixed the flaky `fanout_is_bounded_and_times_out_a_hung_endpoint` gateway test by running it on a paused clock, eliminating the race condition (closes [Issue #1193](https://github.com/moltis-org/moltis/issues/1193)).
- **CalDAV correctness**: [PR #1147](https://github.com/moltis-org/moltis/pull/1147) improved CalDAV handling by using an RFC 4791 `calendar-query` REPORT to honor `list_events` time ranges, instead of fetching all resources.
- **Vault security hardening**: [PR #1186](https://github.com/moltis-org/moltis/pull/1186) fixed a recovery phrase hashing inconsistency by normalizing the phrase before hashing, so stored hashes match the normalization already applied during KEK derivation.
- **Channel activity logging**: [PR #1093](https://github.com/moltis-org/moltis/pull/1093) added per-account, per-channel, and per-user `activity_log` visibility settings (`all`, `errors_only`, `off`) with a clear override priority chain.

---

## 4. Community Hot Topics
- **MiniMax Code ACP agent integration** ([PR #1204](https://github.com/moltis-org/moltis/pull/1204), open): Proposes adding a named `acp-minimax-code` external-agent kind, including default executable detection and config docs. This signals continued interest in expanding the agent registry with third-party coding agents.
- **Heartbeat scheduling bug** ([Issue #1205](https://github.com/moltis-org/moltis/issues/1205), open): Reports that the heartbeat runs continuously, ignoring configured active hours. No comments or reactions yet, but it touches user-configurable runtime behavior.
- **CI format gate failure** ([Issue #1202](https://github.com/moltis-org/moltis/issues/1202), open): Main is blocked on the `Format` job because two files exceed the 1500-line limit. This is a low-effort, high-urgency housekeeping issue.

---

## 5. Bugs & Stability
Ranked by severity:

1. **Compile break on `main`** — `moltis-gateway` would not compile due to a missing `start_background_tasks` value. Severity: critical (blocks all downstream work). Fix landed via [PR #1201](https://github.com/moltis-org/moltis/pull/1201).
2. **Flaky fanout timeout test** ([Issue #1193](https://github.com/moltis-org/moltis/issues/1193)) — Intermittent failures only under full-suite load caused by a race condition. Severity: moderate (CI reliability). Fix landed via [PR #1203](https://github.com/moltis-org/moltis/pull/1203).
3. **Heartbeat ignores active hours** ([Issue #1205](https://github.com/moltis-org/moltis/issues/1205)) — Runs continuously, disregarding configured active hours. Severity: moderate (user-facing battery/resource waste). No fix PR exists yet.
4. **CI format gate red** ([Issue #1202](https://github.com/moltis-org/moltis/issues/1202)) — Two large files trip the size check, blocking the Format job. Severity: low (process blocker). No fix PR exists yet.

---

## 6. Feature Requests & Roadmap Signals
- **Wider agent ecosystem support**: The MiniMax Code PR ([PR #1204](https://github.com/moltis-org/moltis/pull/1204)) points to a clear roadmap direction — supporting more third-party coding agents via the ACP protocol. Expect more agent-kind additions in the near term.
- **Granular activity log controls**: The merged [PR #1093](https://github.com/moltis-org/moltis/pull/1093) suggests a broader push toward per-entity settings and user-level override flexibility. A follow-up may extend this pattern to other visibility or notification toggles.

---

## 7. User Feedback Summary
- **Scheduling behavior**: A user reported that the heartbeat runs even when active hours are configured, indicating real-world reliance on time-based operational windows. The bug report suggests users expect background operations to respect explicit scheduling.
- **Low-friction configuration**: The MiniMax Code contribution emphasizes automatic executable detection and simple TOML setup, consistent with a user base that values out-of-the-box agent support over manual wiring.
- **CLI/Vault usability**: The recovery phrase normalization fix ([PR #1186](https://github.com/moltis-org/moltis/pull/1186)) addresses a real friction point where users entering phrases in lowercase or with dashes would fail to match stored hashes. This indicates users actively interact with vault recovery flows.

---

## 8. Backlog Watch
- **[Issue #1193 — Flaky test](https://github.com/moltis-org/moltis/issues/1193)**: Open from 2026-08-13; resolved by PR #1203. Monitor for re-occurrence under full-suite load.
- **[Issue #1202 — Format CI gate](https://github.com/moltis-org/moltis/issues/1202)**: Open since 2026-08-16, blocking the main branch's Format job. No PR attached yet; needs maintainer attention.
- **[Issue #1205 — Heartbeat scheduling](https://github.com/moltis-org/moltis/issues/1205)**: New, no comments or reactions yet; triage needed to confirm and assign a fix.
- **No long-stale PRs or issues** were detected in the last 24 hours; older items (e.g., PR #1093, opened June 3) have since been merged.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw Project Digest — 2026-08-17

## 1. Today's Overview

CoPaw (QwenPaw) shows a moderately active development day: 10 issues and 10 PRs were updated in the last 24 hours, with 4 issues closed and 2 PRs merged/closed. The project remains responsive to user-reported bugs — most notably, two independent PRs (#7055, #7064) were submitted to fix a cron CLI prompt-update bug (issue #7048), one of which was already merged. Community engagement is driven heavily by first-time contributors (6 of 8 open PRs), indicating a healthy external contribution pipeline. No new releases were published during this window. The overall project health appears stable, with active triage and rapid iteration on both bug fixes (video handling, OAuth refresh tokens, image rendering) and feature work (DataPaw app runtime, provider unification).

## 2. Releases

No new releases were published in the last 24 hours.

## 3. Project Progress

Two PRs were merged/closed today:

- **[#7064 — fix(cli): sync top-level text on cron update --text for agent jobs](https://github.com/agentscope-ai/QwenPaw/pull/7064)** (closed, first-time contributor, under review) — Fixes a CLI bug where `qwenpaw cron update --text` reported success but did not actually update the prompt on agent-type jobs.
- **[#7055 — fix(cli): sync top-level text on agent cron --text update (#7048)](https://github.com/agentscope-ai/QwenPaw/pull/7055)** (closed, under review) — Duplicate/companion fix to #7064 for the same issue; both address the silent no-op on cron text updates.

**Active feature work still in review:** [#6940](https://github.com/agentscope-ai/QwenPaw/pull/6940) introduces a native **DataPaw app runtime** with a durable analysis workspace (open, ready for human review); [#6302](https://github.com/agentscope-ai/QwenPaw/pull/6302) is a large effort to unify provider discovery, model metadata, routing, and agent controls (open since July 21, still accumulating).

## 4. Community Hot Topics

The most active issues this window (3 comments each):

- **[#7063 — Crash on agent tool-call execution (`async for` TypeError)](https://github.com/agentscope-ai/QwenPaw/issues/7063)** — Closed. A reproducible crash in `_execute_tool_call` caused by iterating a coroutine with `async for`. The specificity (stack trace and root-cause analysis provided) and prompt closure suggest effective debugging culture.
- **[#7003 — Memory for QwenPaw agents — 97.5% fewer tokens (ViBo)](https://github.com/agentscope-ai/QwenPaw/issues/7003)** — Closed. A third-party proposal to integrate the "ViBo" memory solution. High star count (33.7k) was cited; closed — possibly declined or handled elsewhere.
- **[#7048 — `cron update --text` returns success but prompt not updated](https://github.com/agentscope-ai/QwenPaw/issues/7048)** — Closed. Rapidly picked up by two PR authors within 24h; demonstrates a responsive contributor community.

Underlying need: users want transparent CLI behavior (no silent failures) and lower-cost agent memory; both are recurring themes.

## 5. Bugs & Stability

Ranked by severity:

1. **[#7063 — Agent tool-call crash (`TypeError` on coroutine)](https://github.com/agentscope-ai/QwenPaw/issues/7063)** — High severity; crashes every tool call on v2.1.0. **Closed** — fix verified or shipped.
2. **[#7074 — Frequent runtime crash; page refresh needed to restart](https://github.com/agentscope-ai/QwenPaw/issues/7074)** — High severity (frequent, Windows). Root cause not yet identified; session state load error visible in logs.
3. **[#7048 — Cron `--text` update silently no-ops](https://github.com/agentscope-ai/QwenPaw/issues/7048)** — Medium; misleading success output. **Fix PRs #7055/#7064 closed**.
4. **[#7065 — Chat history truncated after 7 rounds](https://github.com/agentscope-ai/QwenPaw/issues/7065)** — Medium; history only shows last 3–4 turns; likely pagination bug.
5. **[#6471 — Cron misfire after long idle (APScheduler)](https://github.com/agentscope-ai/QwenPaw/issues/6471)** — Medium; closed but relevant for background tasks.

**Open fix PRs for related bugs:** #7070 (video frames on OpenAI Responses path), #7069 (data-URL images missing on history reload), #7066 (rotated refresh_token not persisted for OAuth2 MCP servers), #7071 (hardcoded 2 MB video cap).

## 6. Feature Requests & Roadmap Signals

- **[#7052 — plugin API `system_prompt` override permission](https://github.com/agentscope-ai/QwenPaw/issues/7052)** — Enterprise use case: hide company prompts from end users. Likely to be considered for plugin permission model improvements.
- **[#7062 — per-agent/per-session `reasoning_effort` override](https://github.com/agentscope-ai/QwenPaw/issues/7062)** — Aligns with the ongoing provider/model unification work in PR #6302; plausible inclusion in next release.
- **[#7068 — richer language support for file viewer (C#, shaders)](https://github.com/agentscope-ai/QwenPaw/issues/7068)** — Developer-facing quality-of-life improvement for game-dev workflows; low-risk UI addition.
- **[#7073 — skill-name deduplication between workspace and built-in skills](https://github.com/agentscope-ai/QwenPaw/issues/7073)** — Prevents duplicate loading conflicts; small but correctness-relevant change.

Next-version prediction: per-agent `reasoning_effort` (via the unified control plane) and skill deduplication are the most likely candidates given active infrastructure work.

## 7. User Feedback Summary

Common pain points this window:

- **Silent failures** — cron updates returning success without applying changes (#7048) erode trust; users explicitly noted the discrepancy between CLI output and actual state.
- **Persistence gaps** — chat history disappearing after reload (#7065), video not being passed to models in history (#7069, #7059), and non-persistent OAuth tokens (#7053) point to a recurring "state loses data" pattern.
- **Instability on Windows** — the frequent crash requiring page refresh (#7074) suggests session-state I/O fragility under real usage.
- **Tool-call robustness** — a hard crash on every tool call (#7063) is the kind of bug that destroys user confidence; it was closed quickly, but occurred on a released version (v2.1.0).
- Positive signal: users are actively filing detailed, well-structured bug reports with logs, stack traces, and reproduction steps — a sign of engaged, technical users (game devs, CLI power users, enterprise teams).

## 8. Backlog Watch

- **[#6302 — Unify provider discovery, model metadata, routing, and agent controls](https://github.com/agentscope-ai/QwenPaw/pull/6302)** — Open since 2026-07-21 (27 days); large scope, no recent comments. Needs maintainer review or a scoping decision.
- **[#6940 — Native DataPaw app runtime and durable analysis workspace](https://github.com/agentscope-ai/QwenPaw/pull/6940)** — Open since 2026-08-12; large feature PR (UI screenshots provided) awaiting human review. Long idle relative to its size.
- **[#6471 — APScheduler cron misfire after long idle](https://github.com/agentscope-ai/QwenPaw/issues/6471)** — First reported 2026-07-26; closed today without visible fix PR. If not actually fixed, this is a recurring risk for background-task users.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

No activity in the last 24 hours.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar).*