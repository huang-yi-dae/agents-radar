# OpenClaw Ecosystem Digest 2026-08-03

> Issues: 500 | PRs: 500 | Projects covered: 13 | Generated: 2026-08-03 15:58 UTC

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

# OpenClaw Project Digest — 2026-08-03

## 1. Today's Overview

OpenClaw remains highly active: 500 issues were updated in the last 24 hours (458 open/active, 42 closed), and 500 PRs were updated (403 open, 97 merged/closed). No new releases were published in this window. The community is engaged, with several issues reaching 10–17 comments, but there is obvious reliability debt: many P1 bugs around multi-agent execution, session state, channel delivery, and memory remain open for months and still await maintainer review or product decisions. At the same time, the open PR queue shows strong ongoing development across agents, channels, providers, and CI infrastructure. Overall project health is active but stretched by triage load and unresolved high-severity issues.

## 2. Releases

None. There were no new releases in the last 24 hours, and the "Latest Releases" section is empty.

The newest versions referenced in issue/PR data are `2026.7.1-2`, `2026.7.2-beta.5`, and `2026.6.11`, so the next stable release may consolidate pending beta fixes — but no release notes or migration guidance are available in this digest window.

## 3. Project Progress

In the last 24 hours, 97 PRs moved to merged/closed and 42 issues were closed. The provided snapshot does not itemize each merged PR, but the visible open PR queue shows significant progress across major areas:

- **Agents & session state**
  - [#116551](https://github.com/openclaw/openclaw/pull/116551) — align aggregate tool-result recovery budget
  - [#115447](https://github.com/openclaw/openclaw/pull/115447) — fail closed on newer schema in `doctor repair`
  - [#117352](https://github.com/openclaw/openclaw/pull/117352) — preserve cancellation at tool execution boundary
  - [#117340](https://github.com/openclaw/openclaw/pull/117340) — preserve structured timeout task outcomes in cron
  - [#118310](https://github.com/openclaw/openclaw/pull/118310) — honor keyed agents in standalone memory operations

- **Channels & messaging**
  - [#117603](https://github.com/openclaw/openclaw/pull/117603) — preserve streamed partials on Telegram run failure
  - [#117954](https://github.com/openclaw/openclaw/pull/117954) — honor disabled WhatsApp self-chat admission
  - [#118148](https://github.com/openclaw/openclaw/pull/118148) — fix bundled channels rejecting documented `responsePrefix` override

- **Providers & integrations**
  - [#117504](https://github.com/openclaw/openclaw/pull/117504) — honor custom Bedrock embedding endpoints without region drift
  - [#111782](https://github.com/openclaw/openclaw/pull/111782) — route Bedrock Mantle OpenAI Responses models correctly
  - [#117319](https://github.com/openclaw/openclaw/pull/117319) — validate DeepInfra inline video before decoding
  - [#102054](https://github.com/openclaw/openclaw/pull/102054) — transfer typed Codex generated images
  - [#110429](https://github.com/openclaw/openclaw/pull/110429) — bound Comfy `workflowPath` file reads

- **UI, CLI, CI & tooling**
  - [#115000](https://github.com/openclaw/openclaw/pull/115000) — discard escape hatch for stuck cloud-session recovery
  - [#118687](https://github.com/openclaw/openclaw/pull/118687) — speed up managed image cache browser proof
  - [#118602](https://github.com/openclaw/openclaw/pull/118602) — hydrate on unprivileged cloud sandboxes
  - [#118598](https://github.com/openclaw/openclaw/pull/118598) — route around saturated Blacksmith capacity
  - [#118738](https://github.com/openclaw/openclaw/pull/118738) — warn before native runtime upgrade failures

One notable closed issue was [#87660](https://github.com/openclaw/openclaw/issues/87660), a memory lifecycle proposal for `MEMORY.md` curation — a sign that memory-related roadmap work is moving.

## 4. Community Hot Topics

Most-commented issues in the last 24 hours:

- [#22438](https://github.com/openclaw/openclaw/issues/22438) — Tiered bootstrap file loading for progressive context control (17 comments)  
  *Community need:* avoid wasting token budget on bootstrap files that agents never reference.

- [#43367](https://github.com/openclaw/openclaw/issues/43367) — Multi-agent orchestration unstable: config overwrites, session-lock failures, detached child work (14 comments, 1👍)  
  *Community need:* reliable parallel agent runs from the CLI.

- [#42475](https://github.com/openclaw/openclaw/issues/42475) — Per-agent cost budget enforcement at gateway level (14 comments, 1👍)  
  *Community need:* operators want hard daily/monthly cost caps before dispatch.

- [#41744](https://github.com/openclaw/openclaw/issues/41744) — Feishu read-image tool result loses media before outbound delivery (13 comments)  
  *Community need:* media attachments must survive channel delivery.

- [#40001](https://github.com/openclaw/openclaw/issues/40001) — Write tool lacks append mode, causing cron sessions to destroy shared files (12 comments, 1👍)  
  *Community need:* append semantics to prevent silent data loss.

- [#91363](https://github.com/openclaw/openclaw/issues/91363) — Isolated cron consistently fails with "LLM request failed" (11 comments, 6👍)  
  *Community need:* isolated cron jobs must actually reach the model provider.

- [#27445](https://github.com/openclaw/openclaw/issues/27445) — `announceTarget` option for sub-agent completion routing (11 comments, 5👍)  
  *Community need:* main-agent orchestration of multi-step workflows.

- [#90414](https://github.com/openclaw/openclaw/issues/90414) — `agentmemory__memory_search` returns "index metadata is missing" (10 comments, 2👍)  
  *Community need:* trustworthy persistent memory lookups.

- [#72015](https://github.com/openclaw/openclaw/issues/72015) — `active-memory` blocks replies and QMD boot can overload gateways (10 comments, 2👍)  
  *Community need:* memory plugins must not degrade normal replies.

**Underlying theme:** users are asking for more control over context, cost, memory, and agent orchestration — but the same areas are also the source of many unresolved reliability bugs.

## 5. Bugs & Stability

Highest-severity / highest-impact bugs reported or updated in the last 24 hours:

- [#40001](https://github.com/openclaw/openclaw/issues/40001) — [P1, data loss] `write` tool overwrites shared files; no append mode. Marked `clawsweeper:linked-pr-open`.
- [#43367](https://github.com/openclaw/openclaw/issues/43367) — [P1] Multi-agent orchestration unstable: concurrent config overwrites, session-lock failures, detached child work. Marked `clawsweeper:linked-pr-open`.
- [#91363](https://github.com/openclaw/openclaw/issues/91363) — [P1] Isolated cron fails before provider request; no fix PR visible, 6👍.
- [#72015](https://github.com/openclaw/openclaw/issues/72015) — [P1] `active-memory` blocks replies; QMD boot can overload multi-agent gateways. No fix PR visible.
- [#41744](https://github.com/openclaw/openclaw/issues/41744) — [P1] Feishu read-image media lost before final outbound payload. Marked `clawsweeper:linked-pr-open`.
- [#97616](https://github.com/openclaw/openclaw/issues/97616) — [P1] Hook/tool child processes are not reaped, causing zombie accumulation and runtime degradation.
- [#109145](https://github.com/openclaw/openclaw/issues/109145) — [P1] Gateway HTTP server listens but does not accept connections on `2026.7.1-beta.5`.
- [#43374](https://github.com/openclaw/openclaw/issues/43374) — [P1] All LLM API calls time out simultaneously under 4-agent Telegram concurrency.
- [#41165](https://github.com/openclaw/openclaw/issues/41165) — [P1] Telegram DMs still land in `agent:main:main`, polluting the heartbeat/main session. Marked `clawsweeper:linked-pr-open`.
- [#97983](https://github.com/openclaw/openclaw/issues/97983) — [P1] iOS/WebChat messages append to transcript but do not trigger assistant replies.
- [#83598](https://github.com/openclaw/openclaw/issues/83598) — [P1] `anthropic:claude-cli` OAuth refresh still dead-ends the main lane despite prior fix.
- [#115700](https://github.com/openclaw/openclaw/issues/115700) — [P1] `chat.send` rejected with "thread switched branches" after model completes. Marked `clawsweeper:linked-pr-open`.
- [#116022](https://github.com/openclaw/openclaw/issues/116022) — [P1] `/new` reuses stable session ID and cannot recover a retired Codex binding tombstone. Marked `clawsweeper:linked-pr-open`.
- [#115037](https://github.com/openclaw/openclaw/issues/115037) — [P1] Synthetic "No response requested." on resume triggers model fallback. Marked `clawsweeper:linked-pr-open`.
- [#98702](https://github.com/openclaw/openclaw/issues/98702) — [P1] Inherited OpenAI OAuth rejected at provider for built-in runtime while main succeeds.
- [#114653](https://github.com/openclaw/openclaw/issues/114653) — [P1] `sessions_send` visibility lookup failures are indistinguishable from policy denial, with no log/retry.
- [#40611](https://github.com/openclaw/openclaw/issues/40611) — [P1] Heartbeat drift retry fix blocks Telegram during active conversations.
- [#75380](https://github.com/openclaw/openclaw/issues/75380) — [P1, ops/security] `provider-payload.jsonl` and `cache-trace.jsonl` grow unbounded without rotation.

Also notable regressions and security/ops issues:

- [#115001](https://github.com/openclaw/openclaw/issues/115001) — [P2] Hybrid memory search returns spurious `1.0` similarity scores via FTS LIKE-fallback hard-coded textScore.
- [#115152](https://github.com/openclaw/openclaw/issues/115152) — [P2] Regression: `bootstrapMaxChars` / `bootstrapTotalMaxChars` deleted on every restart.
- [#116010](https://github.com/openclaw/openclaw/issues/116010) — [P2] All persistent sessions capped at 128k context regardless of model. Marked `clawsweeper:linked-pr-open`.
- [#92516](https://github.com/openclaw/openclaw/issues/92516) — [P2, security] Self-hosted channel plugins cannot use `openKeyedStore`; no supported trust path.
- [#90414](https://github.com/openclaw/openclaw/issues/90414) — [P2] `agentmemory__memory_search` persistently reports missing index metadata.
- [#115450](https://github.com/openclaw/openclaw/issues/115450) — [P2] Hook timeout releases the lane but leaves hook child processes alive. Marked `clawsweeper:linked-pr-open`.

**Stability takeaway:** many P1 issues are still waiting for maintainer review, product decisions, or live repros. A subset have linked PRs, but several serious failures — especially cron reliability, auth/OAuth refresh, and memory plugin behavior — remain unfixed in the visible queue.

## 6. Feature Requests & Roadmap Signals

High-engagement feature requests that may influence the next release:

- [#22438](https://github.com/openclaw/openclaw/issues/22438) — Tiered bootstrap file loading. Strong interest (17 comments), linked PR open.
- [#42475](https://github.com/openclaw/openclaw/issues/42475) — Per-agent cost budget enforcement at gateway level. Linked PR open.
- [#27445](https://github.com/openclaw/openclaw/issues/27445) — `announceTarget` for sub-agent completion routing. 5👍, linked PR open.
- [#67413](https://github.com/openclaw/openclaw/issues/67413) — Per-agent dreaming configuration. 5👍, addresses memory spikes/OOM kills.
- [#33413](https://github.com/openclaw/openclaw/issues/33413) — Slack tool-level progress in assistant thread status. 3👍.
- [#28300](https://github.com/openclaw/openclaw/issues/28300) — Control UI theme customization system. 5👍.
- [#33975](https://github.com/openclaw/openclaw/issues/33975) — Fallback approval mode + model attribution in messages. Linked PR open.
- [#92672](https://github.com/openclaw/openclaw/issues/92672) — Rate-limit fallback should send a user-visible error + immediate switch notification. RFC, 1👍.
- [#38568](https://github.com/openclaw/openclaw/issues/38568) — Inject current context window % into system prompt runtime section.
- [#39022](https://github.com/openclaw/openclaw/issues/39022) — Per-model turn limits with auto-revert.
- [#45323](https://github.com/openclaw/openclaw/issues/45323) — Slack-style @mention autocomplete in Control UI chat.
- [#33102](https://github.com/openclaw/openclaw/issues/33102) — Config support for TUI `--deliver` flag default.

**Likely near-term roadmap signals:** context/cost governance is the strongest recurring theme. The tiered bootstrap loading, per-agent cost budgets, and embedded-run budget PR ([#114866](https://github.com/openclaw/openclaw/pull/114866)) all point toward more operator control over context and spend. The `announceTarget` and per-agent dreaming requests suggest continuing investment in multi-agent orchestration and memory lifecycle.

## 7. User Feedback Summary

Real user pain points visible in this snapshot:

- **Context window and token waste:** users with large workspaces say bootstrap files burn tokens on every session and every sub-agent/cron run ([#22438](https://github.com/openclaw/openclaw/issues/22438)).
- **Runaway cost risk:** operators want hard per-agent daily/monthly caps at the gateway ([#42475](https://github.com/openclaw/openclaw/issues/42475)).
- **Silent data loss:** the `write` tool's lack of append mode overwrites shared memory files in cron sessions ([#40001](https://github.com/openclaw/openclaw/issues/40001)).
- **Multi-agent runs are unreliable in practice:** concurrent config writes, session-lock failures, detached child work, and simultaneous LLM timeouts make parallel orchestration risky ([#43367](https://github.com/openclaw/openclaw/issues/43367), [#43374](https://github.com/openclaw/openclaw/issues/43374)).
- **Memory subsystem trust issues:** `agentmemory` errors, active-memory interference, hybrid search false positives, and compactions ignoring `mode: "off"` undermine confidence in memory ([#90414](https://github.com/openclaw/openclaw/issues/90414), [#72015](https://github.com/openclaw/openclaw/issues/72015), [#115001](https://github.com/openclaw/openclaw/issues/115001), [#48579](https://github.com/openclaw/openclaw/issues/48579)).
- **Auth/OAuth friction:** CLI OAuth refresh dead-ends and inherited OAuth profiles are rejected, blocking legitimate agent traffic ([#83598](https://github.com/openclaw/openclaw/issues/83598), [#98702](https://github.com/openclaw/openclaw/issues/98702), [#75782](https://github.com/openclaw/openclaw/issues/75782)).
- **Channel/mobile delivery gaps:** Feishu media loss, iOS/WebChat no-reply behavior, and Telegram session pollution are serious end-user-facing bugs ([#41744](https://github.com/openclaw/openclaw/issues/41744), [#97983](https://github.com/openclaw/openclaw/issues/97983), [#41165](https://github.com/openclaw/openclaw/issues/41165)).

**Sentiment:** dissatisfaction is concentrated around reliability and silent failures, especially in cron, memory, auth, and mobile channels. At the same time, feature requests are receiving meaningful upvote counts (`#91363`: 6👍, `#27445`: 5👍, `#67413`: 5👍, `#28300`: 5👍), indicating a community that is still enthusiastic about OpenClaw's direction but increasingly vocal about stability debt.

## 8. Backlog Watch

Important issues that have been open for a long time and still need maintainer attention or product decisions:

- [#22438](https://github.com/openclaw/openclaw/issues/22438) — open since Feb 21, 17 comments, `needs-product-decision`, linked PR open.
- [#27445](https://github.com/openclaw/openclaw/issues/27445) — open since Feb 26, 11 comments, 5👍, `needs-product-decision`, linked PR open.
- [#40001](https://github.com/openclaw/openclaw/issues/40001) — open since Mar 8, P1 data loss, 12 comments, `needs-maintainer-review`, `needs-product-decision`, linked PR open.
- [#41744](https://github.com/openclaw/openclaw/issues/41744) — open since Mar 10, P1 Feishu media loss, `needs-live-repro`, linked PR open.
- [#42475](https://github.com/openclaw/openclaw/issues/42475) — open since Mar 10, P2 cost budgets, 14 comments, `needs-product-decision`, linked PR open.
- [#43367](https://github.com/openclaw/openclaw/issues/43367) — open since Mar 11, P1 multi-agent instability, 14 comments, `needs-maintainer-review`, `needs-product-decision`, `needs-live-repro`, linked PR open.
- [#41165](https://github.com/openclaw/openclaw/issues/41165) — open since Mar 9, P1 Telegram routing, `needs-maintainer-review`, `needs-product-decision`, `needs-live-repro`, linked PR open.
- [#72015](https://github.com/openclaw/openclaw/issues/72015) — open since Apr 26, P1 active-memory reliability, 10 comments, `needs-maintainer-review`, `needs-product-decision`, `needs-live-repro`.
- [#90414](https://github.com/openclaw/openclaw/issues/90414) — open since Jun 4, P2 agentmemory failure, 10 comments, `needs-maintainer-review`, `needs-product-decision`, `needs-live-repro`.
- [#91363](https://github.com/openclaw/openclaw/issues/91363) — open since Jun 8, P1 isolated cron failure, 11 comments, 6👍, `needs-maintainer-review`, no fix PR visible.

These items are particularly important because they combine high user engagement, P1 severity or data-loss impact, and maintainer-blocking labels. Several also have linked PRs waiting for approval, so the bottleneck in these cases is review/decision capacity rather than lack of proposed fixes.

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report — Personal AI Assistant / Agent OSS Ecosystem
**Date:** 2026-08-03 | **Data window:** Last 24 hours

---

## 1. Ecosystem Overview

The personal AI assistant open-source landscape is **highly active but unevenly healthy**. The largest project (OpenClaw) shows enormous community engagement yet carries significant reliability debt, while mid-sized projects (NanoBot, ZeroClaw, IronClaw, CoPaw) demonstrate fast iteration and rapid PR merges. Activity clusters around three persistent themes: **multi-agent orchestration, persistent memory, and provider/channel compatibility**. Notably, security issues — webhook fail-closed behavior, auth/OAuth persistence, and WASM egress policy — are surfacing as blocking concerns across multiple projects. A common bottleneck is **maintainer review capacity**: several projects report stale community PRs, RFCs awaiting decisions, and issues with linked-but-unreviewed fixes. Overall, the ecosystem is past the "demo" phase and entering an **operational reliability phase**, where silent failures, data loss, and cost governance matter more than feature breadth.

---

## 2. Activity Comparison

| Project | Issues Updated (24h) | PRs Updated (24h) | Merged/Closed PRs | Release Status | Health Score | Notes |
|---|---|---|---|---|---|---|
| **OpenClaw** | 500 (42 closed) | 500 (97 merged) | 97 | None (last: 2026.7.x beta) | ⭐⭐☆☆☆ (6/10) | Massive volume; many P1s open for months; review bottleneck |
| **IronClaw** | 35 (8 closed) | 50 (16 merged) | 16 | None | ⭐⭐⭐☆☆ (6.5/10) | Deep refactor; QA bug-bash surfaced P1s; strong merge cadence |
| **ZeroClaw** | 50 (7 closed) | 50 (8 merged) | 8 | **v0.8.4** (262 commits, 49 contributors) | ⭐⭐⭐⭐☆ (7.5/10) | Shipping steadily; P0 webhook security gap; RFC queue backlog |
| **CoPaw (QwenPaw)** | 22 | 50 | 24 | **v2.1.0-beta.1** | ⭐⭐⭐☆☆ (6.5/10) | Very active; high-severity desktop/delivery bugs open |
| **NanoBot** | 1 (1 closed) | 33 (24 merged) | 24 | None | ⭐⭐⭐⭐⭐ (9/10) | Cleanest health: quick merges, 0 open issues in window, targeted fixes |
| **NanoClaw** | 2 (0 closed) | 9 (5 merged) | 5 | None | ⭐⭐⭐⭐☆ (7.5/10) | Healthy throughput; 2 uncovered infra bugs (SQLite locking, Node version) |
| **NullClaw** | 1 (0 closed) | 5 (2 merged) | 2 | None | ⭐⭐⭐⭐☆ (7.5/10) | Focused streaming work; 1 long-running scheduler bug unresolved |
| **PicoClaw** | 3 (0 closed) | 8 (2 closed) | 2 | None (last: v0.3.1) | ⭐⭐⭐☆☆ (6/10) | Small but engaged; stale PRs; 2 high-impact fixes pending review |
| **LobsterAI** | 2 touched | 6 merged | 6 | None | ⭐⭐⭐☆☆ (6.5/10) | Internal delivery strong; external PRs stale since April |
| **Moltis** | 0 | 1 (0 merged) | 0 | None | ⭐⭐⭐⭐☆ (7/10) | Calm; one large MCP-management PR in review; no bug influx |
| **EasyClaw** | 0 | 0 | 0 | **v1.8.85** | ⭐⭐⭐⭐☆ (7/10) | Quiet but shipping; maintenance-only mode; macOS Gatekeeper caveat |
| **TinyClaw** | 0 | 0 | 0 | None | N/A | No activity |
| **ZeptoClaw** | 0 | 0 | 0 | None | N/A | No activity |

> Health score blends triage responsiveness, unresolved-severity burden, and merge throughput. NanoBot is the reference for healthy project hygiene; OpenClaw is the reference for scale-with-debt.

---

## 3. OpenClaw's Position

**Advantages:**

- **Scale leader by a wide margin:** 500 issues + 500 PRs updated daily dwarfs every peer (next closest: ~50/50 for ZeroClaw and IronClaw). This represents both the largest contributor base and the largest real-world deployment surface.
- **Channel breadth:** Telegram, WhatsApp, Feishu, Discord, iOS/WebChat and more — peers are still filling in gaps (NanoClaw's Dial/iMessage, CoPaw's WeChat/Feishu).
- **Reference-architecture gravity:** Community feature requests (announceTarget, tiered bootstrap, per-agent cost budgets, memory lifecycle) are being adopted as roadmap signals across the ecosystem — OpenClaw is effectively *setting the agenda*.
- **Provider reach:** Bedrock, DeepInfra, Comfy, Codex, Anthropic CLI — the integration surface is unmatched.

**Technical approach differences:**

- OpenClaw uses a **session/heartbeat model with aggregated tool-result recovery** and a large agent-runtime surface, while peers trend toward **lighter gateways** (NanoBot's declarative provider capabilities, NullClaw's streaming-first design, Moltis' MCP-centric model).
- OpenClaw's architecture carries **more historical baggage**: many P1s reference session-lock failures, heartbeat drift, and channel state pollution — symptoms of a monolith scaled quickly. Peers building greenfield (ZeroClaw's Reborn-style RFCs, IronClaw's refactor) are avoiding these patterns.

**Community size comparison:**

| Metric | OpenClaw | ZeroClaw | IronClaw | CoPaw |
|---|---|---|---|---|
| Issue/PR daily volume | 1,000 | 100 | 85 | 72 |
| Release cadence | None in window | v0.8.4 (262 commits) | None (refactor phase) | v2.1.0-beta.1 |
| Community engagement | 10–17 comments/issue | 6–15 comments/issue | 2–15 comments/issue | 3–11 comments/issue |

**Vulnerability:** OpenClaw's chief risk is **maintainer triage capacity**. Multiple P1 issues (cron reliability, active-memory blocking, OAuth dead-ends) carry no visible fix PR, while dozens of linked PRs wait for review. This is precisely the failure mode smaller projects avoid by merging fast (NanoBot closed 24 PRs with 1 issue touched).

---

## 4. Shared Technical Focus Areas

Requirements emerging independently across multiple projects:

| Focus Area | Projects | Specific Needs |
|---|---|---|
| **Multi-agent orchestration** | OpenClaw, ZeroClaw, CoPaw, LobsterAI | Reliable parallel runs, session-lock integrity, sub-agent completion routing, goal-mode durability, explicit collaboration config (PROFILE.md), agent-to-agent protocol (A2A outbound) |
| **Persistent memory trust** | OpenClaw, ZeroClaw, NanoBot, CoPaw | Memory search correctness, plugin non-interference, idle-session archiving (Dream), compaction honoring mode flags, append-mode write semantics to prevent data loss |
| **Provider compatibility & capability abstraction** | NanoBot, OpenClaw, NullClaw, PicoClaw, CoPaw | Declarative per-provider capabilities, serialization resilience (reasoning items, multimodal content), provider fallback with cooldown, OpenAI-compatible API surfaces |
| **Cost & context governance** | OpenClaw, CoPaw | Per-agent hard cost caps, tiered bootstrap loading to avoid token waste, prompt caching parameters, context-window % visibility |
| **Shell/tool execution reliability** | OpenClaw, CoPaw, PicoClaw | Timeout enforcement (long-running commands), allow-list precedence, orphan process reaping, silent tool-failure loop termination, append mode for shared files |
| **Channel delivery correctness** | OpenClaw, IronClaw, CoPaw, ZeroClaw, NanoClaw | Media preservation (Feishu), mobile no-reply bugs, Telegram formatting/session routing, WeChat cron silent failures, iMessage opt-in semantics |
| **Auth/OAuth persistence** | OpenClaw, IronClaw, ZeroClaw, NanoBot | OAuth refresh not dead-ending, inherited-token acceptance, repeated re-auth elimination, pluggable inbound identity |
| **Cron/scheduling reliability** | OpenClaw, NanoBot, NullClaw | Fail-fast validation of expressions, isolated cron reaching provider, scheduler authorization for external hosts |
| **MCP ecosystem maturity** | Moltis, NanoClaw, IronClaw | Managed MCP server lifecycle (install/rollback), remote Streamable HTTP transports, hosted-MCP default alignment |
| **CI/Release infrastructure** | ZeroClaw, IronClaw, CoPaw, NanoBot | MSRV pin correctness, coverage-gate behavior, E2E test flakiness, dependency bump review |

---

## 5. Differentiation Analysis

| Project | Core Focus | Target Users | Architecture Signature |
|---|---|---|---|
| **OpenClaw** | Universal agent runtime; the "default" personal AI assistant | Power users, self-hosters, enterprise ops | Monolithic runtime with session/heartbeat state; huge channel/provider surface |
| **NanoBot** | **Gateway/provider correctness** + lightweight WebUI assistant | Developers on Python stacks; multi-provider users | Python/asyncio; declarative provider capability refactor; rapid merge discipline |
| **ZeroClaw** | **Security-hardened runtime** with goal mode and persistent-memory parity | Security-conscious self-hosters; matrix/chat users | RFC-driven architecture; WASM plugins, runtime-owned security pipeline, A2A interop; Rust-based build |
| **IronClaw** | **Reborn refactor** toward platform stability; WebUI v2 + design system | SME General Assistant use case; hosted-service providers | Intentional architecture renovation; hermetic testing; E2E coverage focus |
| **CoPaw (QwenPaw)** | **China-market desktop assistant**; Qwen/AgentScope ecosystem | Chinese desktop users; Feishu/WeChat workflows | Desktop app (WebView2, NSIS installer); bundled-Python strategy; API payload optimization |
| **NanoClaw** | **Node.js agent with channel-first UX** | Node.js developers; iMessage/Dial users | Lightweight Node runtime; engagement-consistency logic; remote MCP support |
| **NullClaw** | **Streaming transport purity** | Self-hosters using external Ollama/LLM hosts | SSE streaming tool-call parsing; curl-based secure proxy transport; API-level tool calls during streaming |
| **PicoClaw** | **Minimal local agent**; shell-execution safety | Hobbyists, lightweight deployments | Small surface; allow-list config semantics; i18n polish |
| **LobsterAI** | **NetEase-backed desktop client**; Cowork multi-agent UI | Chinese desktop users; NSIS-distributed | Electron-based; product-led-growth features (credit campaigns); multi-agent sidebar UX |
| **Moltis** | **MCP server lifecycle management** | Developers managing many MCP servers | Vault integration; managed Git repository bundles; onboarding simplification |
| **EasyClaw** | **TikTok affiliate workflow automation** | TikTok 达人/affiliate operators | Desktop client; GraphQL compatibility maintenance; minimal community layer |

The ecosystem splits into two camps: **horizontal runtimes** (OpenClaw, ZeroClaw, IronClaw, NanoBot) competing on breadth and reliability, and **vertical/niche agents** (LobsterAI, EasyClaw, CoPaw) tied to specific markets or platforms.

---

## 6. Community Momentum & Maturity

**Tier 1 — Rapid iteration, high engagement, strained:**
- **OpenClaw** — Maximum velocity, maximum debt. 97 PRs merged in 24h but P1 backlog persists for months. Community remains enthusiastic (upvotes, multi-comment threads), but maintainer review is the gating resource.
- **IronClaw** — Refactor-phase intensity. 50 PRs updated daily; epics closing; QA bug-bash generating actionable issues. Momentum is high and *directionally intentional*, unlike OpenClaw's firefighting profile.
- **ZeroClaw** — Shipping + architecting simultaneously. v0.8.4 (262 commits) plus RFC-driven v0.9.0 planning. Contributor momentum strong; risk is decision latency on security-critical RFCs.
- **CoPaw (QwenPaw)** — Feature velocity (24 closed PRs) with a cluster of high-severity bugs — a project growing fast but accumulating compatibility risk.

**Tier 2 — Healthy, responsive, stabilizing:**
- **NanoBot** — Best hygiene in the ecosystem: 24 PRs merged, 1 issue closed, zero open issues in window. Fast follow-up on edge cases (IME, cron validation, UTF-8 hardening).
- **NanoClaw** — Steady 5 merges/day; two uncovered infra issues (SQLite on Docker mounts, Node version) are the only drag.
- **NullClaw** — Focused and healthy. Streaming tool-call milestone landed; two transport-hardening PRs in review.

**Tier 3 — Moderate / slow-burn:**
- **PicoClaw** — Community engaged but maintainer bandwidth limited; 6 items stale since late July.
- **LobsterAI** — Internal velocity fine; external contributor backlog (April PRs) signals weak community-loop closure.
- **Moltis** — Stable, low-noise; one strategic PR in flight.

**Tier 4 — Quiet / inactive:**
- **EasyClaw** — Released v1.8.85 but zero community traffic; effectively a maintained single-vendor tool.
- **TinyClaw, ZeptoClaw** — No observable activity.

---

## 7. Trend Signals

**1. Reliability is the new feature.** Across every active project, the most-upvoted complaints are silent failures: cron jobs reporting success without delivering, approvals timing out as "denials," tool failures looping invisibly, WebView2 black-screens. Users are no longer impressed by agentic breadth; they want **provable execution**. This is the strongest product opportunity for any project that can instrument execution paths (IronClaw's error-recoverability epic is the best articulation of this).

**2. Cost and context governance are becoming purchase criteria.** OpenClaw's tiered bootstrap, per-agent cost caps, and context-window injection; CoPaw's prompt-caching parameters; NanoBot's declarative capabilities — all point to operators demanding **hard limits and predictable token spend** before scaling agents into production.

**3. Memory is evolving from vector store to policy system.** The next memory wave is not better embeddings but **lifecycle control**: what gets retained, when it's archived vs. dropped, who can read it, and how it interacts with session flow (per-agent dreaming, idle-session archiving, invalidate-based forgetting). Projects with the most mature memory roadmaps — ZeroClaw's Hindsight stack, NanoBot's Dream, OpenClaw's MEMORY.md curation — will define the standard.

**4. Agent-to-agent protocols are moving from research to product.** ZeroClaw's A2A outbound client, OpenClaw's sub-agent routing, CoPaw's PROFILE.md collaboration gaps, and LobsterAI's multi-agent sidebar all indicate cross-agent communication is becoming a user-facing requirement, not an academic one.

**5. OpenAI-compatible API surfaces are table stakes.** ZeroClaw's Chat Completions RFC, PicoClaw's AI Router preset, NanoBot's OpenAI-compatible gateway providers — the ecosystem is converging on **interop as distribution**. Projects without a compatible API surface will be excluded from the Open WebUI/LobeChat/Continue.dev tooling ecosystem.

**6. Provider switching is harder than providers admit.** Serialization failures when replaying histories across providers (NanoBot's Gemini/DeepSeek fixes), OAuth refresh dead-ends, runtime-pinned models (CoPaw's agentscope incompatibility) — the ecosystem is absorbing the cost of **model-agnosticism**. Declarative capability metadata (NanoBot PR #5204) is the emerging solution pattern.

**7. Security is shifting left from network to agent internals.** Webhook fail-closed behavior (ZeroClaw P0), WASM egress policy, credential leakage through diagnostics (IronClaw), and plugin trust paths (OpenClaw) — agent security is no longer just authentication; it is **capability and data-flow policy inside the agent**.

**Value for AI agent developers:** Build with declarative provider capabilities, memory lifecycle controls, and explicit cost governors from day one. Treat silent failure as a P0 — instrument every path where a user believes work happened but it did not. And plan for interop: an OpenAI-compatible surface and an A2A/MCP story are no longer optional differentiators; they are prerequisites for ecosystem relevance.

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot Project Digest — 2026-08-03

## Today's Overview

High maintenance activity and strong momentum: 33 PRs were updated in the last 24 hours, with 24 merged/closed and 9 still open, while only 1 issue was updated and it is now closed. The work was heavily focused on bug fixing and hardening across provider compatibility, WebUI input/UX edge cases, cron validation, and memory reliability. No new releases were published. The fast merge/close rate and quick follow-up on reported edge cases indicate a healthy, actively maintained project. No open issues remain in the last 24-hour window.

## Releases

No new releases were published in the 2026-08-03 window, so there are no release notes, breaking-change warnings, or migration instructions to report.

## Project Progress

The 24 merged/closed PRs show broad stability work. Highlights from the top 20 PRs by activity:

**Provider & model compatibility**
- [fix(providers): keep DeepSeek reasoning items wire-valid (#5214)](https://github.com/HKUDS/nanobot/pull/5214) — closed; prevents Serde-style deserialization failures for DeepSeek reasoning content.
- [fix(providers): handle string items when applying prompt cache markers (#5219)](https://github.com/HKUDS/nanobot/pull/5219) — closed; fixes `TypeError: 'str' object is not a mapping`.
- [fix(providers): preserve list content when merging same-role messages (#5220)](https://github.com/HKUDS/nanobot/pull/5220) — closed; stops data loss of multimodal/list content during role-alternation merging.
- [feat(providers): add Eden AI as an OpenAI-compatible gateway provider (#4861)](https://github.com/HKUDS/nanobot/pull/4861) — closed; adds a new built-in provider.
- [feat(codex): support OAuth and custom Responses mode in openai_codex (#1550)](https://github.com/HKUDS/nanobot/pull/1550) — closed; resolves a 5-month-old provider-flexibility request.
- [docs(providers): add ModelScope section (#5038)](https://github.com/HKUDS/nanobot/pull/5038) — closed; documents new provider setup and usage.

**WebUI & UX fixes**
- [fix(webui): complete i18n audit (#5227)](https://github.com/HKUDS/nanobot/pull/5227) — closed; key/interpolation parity and hardcoded UI strings.
- [fix(webui): show actual local trigger messages (#5228)](https://github.com/HKUDS/nanobot/pull/5228) — closed; session popover now shows real trigger content.
- [fix(webui): stabilize thread during IME input (#5229)](https://github.com/HKUDS/nanobot/pull/5229) — closed; fixes composition-mode scroll/autosize issues.
- [fix(webui): dismiss mobile keyboard after send (#5226)](https://github.com/HKUDS/nanobot/pull/5226) — closed; improves mobile chat UX.

**Backend, cron, memory, and installation**
- [fix(cron): validate expression syntax in _validate_schedule_for_add (#5141)](https://github.com/HKUDS/nanobot/pull/5141) — closed; rejects invalid expressions before persistence.
- [fix(cron): reject invalid cron expressions when adding schedules (#5224)](https://github.com/HKUDS/nanobot/pull/5224) — closed as duplicate of #5141.
- [fix(memory): harden history tail read against invalid UTF-8 (#5221)](https://github.com/HKUDS/nanobot/pull/5221) — closed; prevents tail-parse crashes on `history.jsonl`.
- [fix(gateway): close agent resources deterministically on stop (#5215)](https://github.com/HKUDS/nanobot/pull/5215) — closed; eliminates asyncio teardown noise/stalls.
- [fix(plugins): use uv when pip is unavailable (#5213)](https://github.com/HKUDS/nanobot/pull/5213) — closed; fixes plugin management in `uv tool` environments.

## Community Hot Topics

No issues or PRs in the sampled data accumulated public comments or reactions, so “popularity” is better measured by scope and follow-up activity. The most substantive discussions and development efforts are in:

- [refactor(providers): declare Responses capabilities (#5204)](https://github.com/HKUDS/nanobot/pull/5204) — open, priority P1; refactors provider-name checks into declarative capabilities.
- [feat(session): add cross-session search and mentions (#5211)](https://github.com/HKUDS/nanobot/pull/5211) — open; adds user-facing cross-session conversation access.
- [feat(memory): archive idle sessions for Dream (#5231)](https://github.com/HKUDS/nanobot/pull/5231) — open; extends Dream’s memory input beyond recent protected sessions.

Underlying demand: users want a more reliable multi-provider assistant, better long-term memory, and cross-session continuity rather than brand-new features.

## Bugs & Stability

Ranked approximately by severity:

1. **Frontend module loading fails with MIME type `text/plain`** — [Issue #5190](https://github.com/HKUDS/nanobot/issues/5190) — closed. A startup-blocking WebUI bug where JavaScript module scripts are served as `text/plain`.
2. **Gemini rejects unsigned tool calls during provider replay** — [fix(providers): drop unsigned tool calls when replaying to Gemini (#5230)](https://github.com/HKUDS/nanobot/pull/5230) — open; fixes `400 INVALID_ARGUMENT` when histories are reused across providers.
3. **DeepSeek reasoning items break request serialization** — [PR #5214](https://github.com/HKUDS/nanobot/pull/5214) — fixed.
4. **String content items break prompt-cache marker injection** — [PR #5219](https://github.com/HKUDS/nanobot/pull/5219) — fixed.
5. **Same-role message merging drops multimodal content** — [PR #5220](https://github.com/HKUDS/nanobot/pull/5220) — fixed.
6. **Invalid cron expressions create silently dead schedules** — [PR #5141](https://github.com/HKUDS/nanobot/pull/5141) — fixed; duplicate [PR #5224](https://github.com/HKUDS/nanobot/pull/5224) also closed.
7. **Gateway shutdown can stall on subprocess teardown** — [PR #5215](https://github.com/HKUDS/nanobot/pull/5215) — fixed.
8. **Memory tail read crashes on invalid UTF-8** — [PR #5221](https://github.com/HKUDS/nanobot/pull/5221) — fixed.
9. **WebUI input issues: IME thread jumps and mobile keyboard not dismissing** — [PR #5229](https://github.com/HKUDS/nanobot/pull/5229) and [PR #5226](https://github.com/HKUDS/nanobot/pull/5226) — fixed.
10. **Telegram fenced-code corruption with special-char language tags** — [fix(telegram): keep fenced code intact when language has special chars (#5222)](https://github.com/HKUDS/nanobot/pull/5222) — open.

## Feature Requests & Roadmap Signals

The open and recently closed PRs point toward a few likely roadmap items:

- **Declarative provider capability profiles** — [PR #5204](https://github.com/HKUDS/nanobot/pull/5204) suggests the project is moving toward cleaner provider abstraction, with routing and fallback behavior declared per provider.
- **Cross-session search and @-mentions** — [PR #5211](https://github.com/HKUDS/nanobot/pull/5211) is a strong user-facing feature candidate for the next WebUI release.
- **Dream memory archiving for idle sessions** — [PR #5231](https://github.com/HKUDS/nanobot/pull/5231) addresses a real gap in long-term memory and is likely to be merged if review passes.
- **New gateway providers** — Eden AI (#4861) and ModelScope docs (#5038) show continued provider ecosystem growth.
- **Codex dual-mode support** — #1550 closes an older request for OAuth + custom Responses in `openai_codex`.

Prediction: the next NanoBot version may include cross-session references, richer Dream memory input, and the new Responses capability metadata.

## User Feedback Summary

Real user pain points visible in this window include:

- **Frontend fails to boot** when the server serves JavaScript with the wrong MIME type ([#5190](https://github.com/HKUDS/nanobot/issues/5190)).
- **Provider-switching fragility**: histories containing tool calls or reasoning items from other providers break request serialization ([#5214](https://github.com/HKUDS/nanobot/pull/5214), [#5230](https://github.com/HKUDS/nanobot/pull/5230)).
- **Silent cron failures** when invalid expressions were accepted ([#5141](https://github.com/HKUDS/nanobot/pull/5141)).
- **Plugin installation breaks in `uv tool` environments** without pip ([#5213](https://github.com/HKUDS/nanobot/pull/5213)).
- **Mobile and IME WebUI friction** ([#5226](https://github.com/HKUDS/nanobot/pull/5226), [#5229](https://github.com/HKUDS/nanobot/pull/5229)).

Satisfaction signals are indirect but positive: community contributors are submitting targeted fixes, and maintainers are closing them quickly. No overt dissatisfaction was recorded in comments or reactions in the last 24 hours.

## Backlog Watch

No long-unanswered issues are visible: the only issue updated in this window was closed, and the open PRs are all recent. That said, a few open PRs may need maintainer attention soon:

- [PR #5204: refactor(providers): declare Responses capabilities](https://github.com/HKUDS/nanobot/pull/5204) — priority P1 and labeled with `conflict`; likely needs review/merge help.
- [PR #5230: fix(providers): drop unsigned tool calls when replaying to Gemini](https://github.com/HKUDS/nanobot/pull/5230) — priority P1, opened 2026-08-03.
- [PR #5222: fix(telegram): keep fenced code intact when language has special chars](https://github.com/HKUDS/nanobot/pull/5222) — open bugfix with clear user impact.

Notably, the long-running [PR #1550](https://github.com/HKUDS/nanobot/pull/1550), created on 2026-03-05, was finally closed in this window, showing that even older provider-related PRs can reach resolution.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-08-03

## 1. Today's Overview

ZeroClaw is in a high-activity phase: **50 issues** and **50 PRs** were updated in the last 24 hours, with **7 issues closed** and **8 PRs merged/closed**. The project also shipped **v0.8.4**, a maintenance and hardening release, while the goal-mode implementation split and the Hindsight memory stack continue to move through review. Issue activity is dominated by architecture RFCs — OpenAI-compatible Chat Completions, A2A outbound traffic, runtime-owned auth/sessions — alongside several security-critical bugs in gateway webhook handling and audit logging. Maintainer review demand remains high, and the backlog contains multiple accepted or long-running RFCs waiting for decisions.

---

## 2. Releases

### v0.8.4
**Released 2026-08-03** — maintenance and hardening release spanning **262 commits** from **49 contributors**.

Reported areas of focus:
- Expanded memory and SOP control planes
- Improved provider and channel reliability
- Stronger sandbox and credential boundaries
- Desktop and release-pipeline hardening

No explicit breaking-change or migration notes were included in the provided release summary.

---

## 3. Project Progress

The visible merged/closed PRs from the last 24 hours are mostly the **goal-mode implementation split**, coordinated under tracker [#8681](https://github.com/zeroclaw-labs/zeroclaw/issues/8681):

- [#8687](https://github.com/zeroclaw-labs/zeroclaw/pull/8687) — `feat(runtime): add goal controller and verifier`
- [#8688](https://github.com/zeroclaw-labs/zeroclaw/pull/8688) — `feat(runtime): add trusted goal tools and delegation boundaries`
- [#8689](https://github.com/zeroclaw-labs/zeroclaw/pull/8689) — `feat(channels): add goal command admission`
- [#8746](https://github.com/zeroclaw-labs/zeroclaw/pull/8746) — `fix(goal): stop active goal self-resume loops`
- [#8996](https://github.com/zeroclaw-labs/zeroclaw/pull/8996) — `fix(goal): preserve running goals across daemon reload`

These closures mark a substantial step forward for bounded, durable goal execution: controller/verifier support, trusted goal tools, channel `/goal` admission, self-resume loop fixes, and persistence across daemon reloads.

Other notably active in-flight PRs include the **Hindsight memory stack**:

- [#9063](https://github.com/zeroclaw-labs/zeroclaw/pull/9063) — Hindsight backend + config + factory (stack 1/7)
- [#9065](https://github.com/zeroclaw-labs/zeroclaw/pull/9065) — recall/injection tuning + Hindsight recall filter (stack 3/7)
- [#9066](https://github.com/zeroclaw-labs/zeroclaw/pull/9066) — consolidation + dedup correctness (stack 4/7)
- [#9067](https://github.com/zeroclaw-labs/zeroclaw/pull/9067) — hindsight retention/forget via invalidate PATCH (stack 5/7)
- [#9068](https://github.com/zeroclaw-labs/zeroclaw/pull/9068) — synchronous Hindsight retain by default, async opt-in (stack 6/7)
- [#9069](https://github.com/zeroclaw-labs/zeroclaw/pull/9069) — per-agent backend + memory count (stack 7/7)

Also updated recently: [#9634](https://github.com/zeroclaw-labs/zeroclaw/pull/9634) fixing Telegram mention-only group handling, and [#9701](https://github.com/zeroclaw-labs/zeroclaw/pull/9701) adding WebSocket keepalive pings.

---

## 4. Community Hot Topics

Most active issues by comment count:

- [#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603) — **RFC: ZeroClaw Chat Completions profile** (15 comments)  
  Demand for exposing agent capabilities through the OpenAI Chat Completions protocol, opening ZeroClaw to Open WebUI, LobeChat, Continue.dev, Aider, LangChain, and the OpenAI SDK.

- [#8303](https://github.com/zeroclaw-labs/zeroclaw/issues/8303) — **RFC: Goal mode v1 — bounded foreground Matrix work** (11 comments, 1 👍)  
  Community interest in durable multi-turn user objectives, despite earlier implementation scope pressure.

- [#8681](https://github.com/zeroclaw-labs/zeroclaw/issues/8681) — **Tracker: Goal mode implementation split stack** (10 comments)  
  Coordination point for the goal-mode PR split now largely landing.

- [#9106](https://github.com/zeroclaw-labs/zeroclaw/issues/9106) — **RFC: A2A outbound client (A2ATool)** (10 comments)  
  Users want ZeroClaw agents to proactively call external A2A-compliant agents, not just receive A2A requests.

- [#7141](https://github.com/zeroclaw-labs/zeroclaw/issues/7141) — **RFC: Pluggable inbound authentication and canonical principals** (9 comments)  
  Security/architecture discussion around OIDC, pluggable identity providers, and canonical principal handling.

- [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) — **Tracker: Maintainer decision queue for RFCs and design issues** (8 comments)  
  Meta-signal that the community feels RFCs need faster maintainer decisions.

- [#8891](https://github.com/zeroclaw-labs/zeroclaw/issues/8891) — **Tracker: Persistent memory wire-up** (7 comments)  
  Multi-PR effort to bring persistent memory to parity with mature agent runtimes.

- [#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) — **RFC: Runtime-owned conversation sessions and transport surface adapters** (7 comments)  
  Push to centralize session ownership and admission semantics.

- [#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) — **RFC: Unified attachment architecture for web chat and channels** (6 comments)

- [#7142](https://github.com/zeroclaw-labs/zeroclaw/issues/7142) — **RFC: Runtime-owned security decision pipeline and restrictive overlays** (6 comments)  
  Security architecture targeting v0.9.0.

Underlying needs: **ecosystem interop** (OpenAI protocol, A2A), **durable goal execution**, **stronger identity/security boundaries**, **memory parity**, and **more responsive maintainer review**.

---

## 5. Bugs & Stability

Ranked by severity:

- **[P0 / S0 — data loss / security risk]** [#9565](https://github.com/zeroclaw-labs/zeroclaw/issues/9565)  
  **Gateway webhook handlers do not fail closed** for WhatsApp Cloud, Linq, and WATI. Attacker-controllable messages can be dispatched into the agent without authenticating the caller. Status: in-progress. No fix PR appears in the visible top-20 PR list.

- **[P1 — audit-trail integrity]** [#9642](https://github.com/zeroclaw-labs/zeroclaw/issues/9642)  
  An approval that **times out is recorded as an explicit operator denial**, falsifying the audit trail. This changes what logs say a human did. Status: in-progress.

- **[P1 — WASM security]** [#9395](https://github.com/zeroclaw-labs/zeroclaw/issues/9395)  
  Plugin `wasi:http` egress has **no destination policy and no configuration knob**. Status: accepted.

- **[P1 — CI/build]** [#9690](https://github.com/zeroclaw-labs/zeroclaw/issues/9690)  
  Containerfile StageX pin ships **rustc 1.95.0, below the declared MSRV**; the `all-features` container variant has been unbuildable since 2026-07-08. This surfaced in the v0.8.4 release run but is not a release regression. Status: in-progress/accepted.

- **[P1 — workflow blocked]** [#9425](https://github.com/zeroclaw-labs/zeroclaw/issues/9425)  
  Running SOP jobs have **no operator cancellation path** in the web dashboard. Status: in-progress/accepted.

- **[P2 — minor channel bug]** [#9198](https://github.com/zeroclaw-labs/zeroclaw/issues/9198)  
  Discord typing indicator remains **stuck after dashboard daemon reload**. Status: in-progress/accepted.

- **[P2 — search reliability]** [#5316](https://github.com/zeroclaw-labs/zeroclaw/issues/5316)  
  Accepted feature/bug work for **SearXNG support and DuckDuckGo CAPTCHA detection** remains open, with help wanted.

---

## 6. Feature Requests & Roadmap Signals

Strong roadmap signals from active RFCs and accepted feature work:

- **OpenAI-compatible Chat Completions API**  
  [#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603) remains the strongest interop request and would unlock many existing LLM client tools.

- **A2A outbound collaboration**  
  [#9106](https://github.com/zeroclaw-labs/zeroclaw/issues/9106) would let ZeroClaw agents call external A2A agents, complementing the existing A2A server.

- **Goal mode v1**  
  The implementation split tracker [#8681](https://github.com/zeroclaw-labs/zeroclaw/issues/8681) is nearly complete, with multiple goal-mode PRs now closed. This is likely to land in the next release cycle.

- **Memory parity**  
  Tracker [#8891](https://github.com/zeroclaw-labs/zeroclaw/issues/8891) and the Hindsight memory PR stack are actively moving forward.

- **Security architecture for v0.9.0**  
  [#7142](https://github.com/zeroclaw-labs/zeroclaw/issues/7142) targets v0.9.0, and [#7141](https://github.com/zeroclaw-labs/zeroclaw/issues/7141) covers pluggable inbound auth. These are likely to shape the next major release.

- **Runtime-owned conversation sessions**  
  [#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) and [#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) propose centralizing session/attachment handling.

- **Observability enhancements**  
  [#7232](https://github.com/zeroclaw-labs/zeroclaw/issues/7232) proposes richer events and OTel trace correlation; PR [#9556](https://github.com/zeroclaw-labs/zeroclaw/pull/9556) adds a Langfuse observer backend.

- **SOP/ZeroCode dashboard visibility**  
  [#9682](https://github.com/zeroclaw-labs/zeroclaw/issues/9682) is a scoped MVP for SOP run-status icons, with supporting client work in [#9683](https://github.com/zeroclaw-labs/zeroclaw/issues/9683).

- **Retiring the Lucid memory connector**  
  [#9644](https://github.com/zeroclaw-labs/zeroclaw/issues/9644) proposes removal at v0.9.0 due to upstream dormancy.

Prediction: **v0.9.0** will likely include goal-mode completion, persistent-memory parity, the security decision pipeline, and possibly the Chat Completions profile if the RFC is accepted quickly.

---

## 7. User Feedback Summary

Contributor-reported pain points center on:

- **Interop gaps**: no OpenAI-compatible API ([#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603)), no outbound A2A ([#9106](https://github.com/zeroclaw-labs/zeroclaw/issues/9106)).
- **Security confidence**: webhook handlers not failing closed ([#9565](https://github.com/zeroclaw-labs/zeroclaw/issues/9565)), WASM egress policy missing ([#9395](https://github.com/zeroclaw-labs/zeroclaw/issues/9395)).
- **Trustworthy audit logs**: approval timeouts recorded as denials ([#9642](https://github.com/zeroclaw-labs/zeroclaw/issues/9642)).
- **Operational control**: no stop/cancel path for running SOPs ([#9425](https://github.com/zeroclaw-labs/zeroclaw/issues/9425)).
- **Channel UX**: stuck Discord typing indicator ([#9198](https://github.com/zeroclaw-labs/zeroclaw/issues/9198)) and Telegram approval buttons that remain mutable after click ([#6565](https://github.com/zeroclaw-labs/zeroclaw/issues/6565)).
- **Privacy/search reliability**: desire for SearXNG support and CAPTCHA handling for DuckDuckGo ([#5316](https://github.com/zeroclaw-labs/zeroclaw/issues/5316)).

Satisfaction signals are indirect: reaction counts are sparse, with 👍 on goal-mode RFC [#8303](https://github.com/zeroclaw-labs/zeroclaw/issues/8303) and Telegram approval UX [#6565](https://github.com/zeroclaw-labs/zeroclaw/issues/6565). The volume of active RFCs and contributor PRs suggests strong external engagement, but maintainer response time is a recurring concern via [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692).

---

## 8. Backlog Watch

Issues that appear to need maintainer attention or closure decisions:

- [#5316](https://github.com/zeroclaw-labs/zeroclaw/issues/5316) — **SearXNG + web-search failure recovery**  
  Accepted since April 2026, help wanted, still no implementation PR.

- [#6998](https://github.com/zeroclaw-labs/zeroclaw/issues/6998) — **RFC: Schema-validated memory consolidation with bounded fallback**  
  Open since May 29, needs maintainer review, high risk.

- [#7141](https://github.com/zeroclaw-labs/zeroclaw/issues/7141) — **RFC: Pluggable inbound authentication and canonical principals**  
  Open since June 3, priority P1, in-progress but needs maintainer review.

- [#7142](https://github.com/zeroclaw-labs/zeroclaw/issues/7142) — **RFC: Runtime-owned security decision pipeline and restrictive overlays**  
  Open since June 3, needs maintainer review, v0.9.0 target.

- [#7232](https://github.com/zeroclaw-labs/zeroclaw/issues/7232) — **RFC: Structured Observability Enhancement**  
  Open since June 5, needs maintainer review.

- [#7822](https://github.com/zeroclaw-labs/zeroclaw/issues/7822) — **RFC: WASM plugin lifecycle hook subscriptions**  
  Open since June 17, needs maintainer review.

- [#8303](https://github.com/zeroclaw-labs/zeroclaw/issues/8303) — **RFC: Goal mode v1**  
  The implementation has largely landed via split PRs, but the RFC itself still carries `needs-maintainer-review`; it may need formal closure or revision.

- [#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603) — **RFC: ZeroClaw Chat Completions profile**  
  Very active, high-risk, needs maintainer decision.

- [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) — **Maintainer decision queue tracker**  
  The backlog of RFCs waiting on maintainers is itself a project-health signal.

Overall, ZeroClaw is shipping steadily and has strong contributor momentum. The main risks are **security hardening gaps in gateway/webhook paths**, **audit-trail integrity**, and a **large set of high-risk RFCs awaiting maintainer decisions**.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw Project Digest — 2026-08-03

## Today's Overview

PicoClaw shows moderate activity in the last 24 hours: 3 issues were updated (all still open), 8 PRs were updated, and 2 PRs were closed. No new releases were published, and the latest known user-reported version remains v0.3.1. The project is receiving steady community contributions, but several older PRs and issues remain marked as `[stale]`, suggesting maintainer review capacity may be a bottleneck. The most notable developments are around shell-command allow-list fixes and a proposed fix for silent tool-failure loops.

## Releases

No new releases were published in this window. No changelog, migration notes, or breaking-change information is available.

## Project Progress

**Closed/merged today:**

- [PR #3310 – Feat/auto pr](https://github.com/sipeed/picoclaw/pull/3310) — closed; marked as automated by "picoclanker".
- [PR #3313 – Fix: agent not able to execute shell command added to customAllowPatterns](https://github.com/sipeed/picoclaw/pull/3313) — closed with the same fix re-submitted as [PR #3314](https://github.com/sipeed/picoclaw/pull/3314), which remains open.

**Open contributions advancing the project:**

- [PR #3314 – Fix customAllowPatterns precedence](https://github.com/sipeed/picoclaw/pull/3314) — fixes default deny patterns overriding user allow patterns, e.g. for `git push`.
- [PR #3312 – Stop turn early on repeated identical tool failure](https://github.com/sipeed/picoclaw/pull/3312) — addresses silent agent loops.
- [PR #3297 – Harden remote prompt and exec boundaries](https://github.com/sipeed/picoclaw/pull/3297) — security-focused config/schema changes.
- [PR #3299 – Add native Exa web search provider](https://github.com/sipeed/picoclaw/pull/3299) — adds a new `tools.web` provider.
- [PR #3295 – Prevent SplitMessage hang on oversized fence headers](https://github.com/sipeed/picoclaw/pull/3295) — fixes channel-message splitting edge case.
- [PR #3296 – Complete Czech code wrap labels](https://github.com/sipeed/picoclaw/pull/3296) — i18n polish.

## Community Hot Topics

No PRs have explicit comment counts in this dataset, and no issue has more than 1 comment. The most active / notable discussions are:

- [Issue #3298 – Add AI Router as an OpenAI-compatible provider preset](https://github.com/sipeed/picoclaw/issues/3298)  
  A maintainer of AI Router offers to contribute a named provider preset. Underlying need: users want first-class support for OpenAI-compatible routers instead of manually configuring `api_base`.

- [Issue #3294 – `/list models` only shows the current model](https://github.com/sipeed/picoclaw/issues/3294)  
  User expectation mismatch: the command is described as "Configured models", but only lists the active model. Underlying need: better model-list visibility and management.

- [Issue #3311 – Repeated identical tool failure loops silently](https://github.com/sipeed/picoclaw/issues/3311)  
  Newest issue, zero comments yet, but likely high-impact: agents can run for minutes before the user gets no answer. A fix PR already exists.

## Bugs & Stability

Ranked by severity:

1. **High — Silent tool-failure loop**  
   [Issue #3311](https://github.com/sipeed/picoclaw/issues/3311) reports that repeated identical tool errors cause the agent to spin silently until `max_tool_iterations`, with no final answer.  
   Fix PR: [PR #3312](https://github.com/sipeed/picoclaw/pull/3312) — open, not yet merged.

2. **High/Medium — `customAllowPatterns` not honored**  
   [PR #3314](https://github.com/sipeed/picoclaw/pull/3314) fixes a bug where default deny patterns always took precedence, preventing users from allowing commands such as `git push`. The earlier [PR #3313](https://github.com/sipeed/picoclaw/pull/3313) was closed in favor of this one.

3. **Medium — `SplitMessage` hang**  
   [PR #3295](https://github.com/sipeed/picoclaw/pull/3295) fixes a hang when a fenced-code info string exceeds `maxLen`. Still open and marked stale.

4. **Security-related — Remote prompt/exec boundaries**  
   [PR #3297](https://github.com/sipeed/picoclaw/pull/3297) proposes hardening remote prompts and execution policy. Not a bug report, but important for stability/security posture.

No crashes or regressions were explicitly reported in this window.

## Feature Requests & Roadmap Signals

- [Issue #3298 – AI Router provider preset](https://github.com/sipeed/picoclaw/issues/3298)  
  A contributor-owned feature request. If accepted, it would make AI Router selectable as a named provider preset rather than a manual `openai` + `api_base` workaround.

- [PR #3299 – Native Exa web search provider](https://github.com/sipeed/picoclaw/pull/3299)  
  Adds Exa as a native `tools.web` / `web_search` provider. This signals continued investment in more web-search backend options.

- [PR #3296 – Czech localization completion](https://github.com/sipeed/picoclaw/pull/3296)  
  Small i18n improvement; likely low-risk and mergeable with review.

**Prediction:** The next PicoClaw version may include the tool-failure loop fix, the `customAllowPatterns` fix, and possibly the Exa web search provider if maintainer review proceeds.

## User Feedback Summary

Real user pain points visible in this data:

- **Silent failures are unacceptable** — users expect an answer after a tool failure, not minutes of invisible retries ([#3311](https://github.com/sipeed/picoclaw/issues/3311)).
- **Allow-listing is confusing** — users expect `customAllowPatterns` to override defaults, and it currently does not ([PR #3314](https://github.com/sipeed/picoclaw/pull/3314)).
- **Model management visibility is weak** — `/list models` should list all configured models, not just the active one ([#3294](https://github.com/sipeed/picoclaw/issues/3294)).
- **Provider integrations matter** — users want named presets for OpenAI-compatible routers and native search providers ([#3298](https://github.com/sipeed/picoclaw/issues/3298), [PR #3299](https://github.com/sipeed/picoclaw/pull/3299)).

No explicit praise or positive sentiment was captured in this dataset.

## Backlog Watch

The following items are marked `[stale]` or have been untouched since around 2026-07-26 and may need maintainer attention:

- [Issue #3298 – AI Router provider preset](https://github.com/sipeed/picoclaw/issues/3298) — last updated 2026-08-02.
- [Issue #3294 – `/list models` behavior](https://github.com/sipeed/picoclaw/issues/3294) — last updated 2026-08-02.
- [PR #3297 – Security hardening of remote prompt/exec boundaries](https://github.com/sipeed/picoclaw/pull/3297) — open since 2026-07-26.
- [PR #3296 – Czech i18n completion](https://github.com/sipeed/picoclaw/pull/3296) — open since 2026-07-26.
- [PR #3295 – SplitMessage hang fix](https://github.com/sipeed/picoclaw/pull/3295) — open since 2026-07-26.
- [PR #3299 – Exa web search provider](https://github.com/sipeed/picoclaw/pull/3299) — open since 2026-07-26.

These items represent a mix of bug fixes, security improvements, and user-visible features that could meaningfully improve project health if reviewed and merged.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw Project Digest — 2026-08-03

## Today's Overview

NanoClaw showed active but maintenance-focused momentum: 9 pull requests were updated in the last 24 hours, with 5 moving to closed/merged status and 4 remaining open. Issue volume was low at 2 open issues, but both point to real stability concerns: a Node.js startup `SyntaxError` and SQLite lock contention on Docker cross-mount filesystems. No new release was cut today, so the merged/closed PRs are likely destined for the next release or patch. Maintainer throughput appears healthy, though the two open infrastructure issues have no visible fix PRs yet. Overall project health is stable, with feature work continuing alongside stabilization.

## Releases

No new releases are available for 2026-08-03.

## Project Progress

Five PRs were closed/merged in the last 24 hours:

- **[#3180 — fix(update): surface hardened image migration](https://github.com/nanocoai/nanoclaw/pull/3180)**  
  Closed. Addresses update-path robustness for hardened/container image migration.

- **[#3137 — Fix engagement consistency and expose self-serve wiring controls](https://github.com/nanocoai/nanoclaw/pull/3137)**  
  Closed. Keeps accumulated messages as context without triggering warm-container follow-up turns, lets group-scoped agents inspect wirings and request approved engagement-policy updates, and rejects invalid JavaScript engagement regexes.

- **[#3181 — fix(imessage): opt in via first message to the assigned line](https://github.com/nanocoai/nanoclaw/pull/3181)**  
  Closed. Changes iMessage channel onboarding so a user opts in by sending the first message to the assigned line.

- **[#3143 — Preserve resolved approval card content](https://github.com/nanocoai/nanoclaw/pull/3143)**  
  Closed. Resolved approval cards now retain title/request details and show a muted decision/actor or timeout status instead of losing their original body.

- **[#3178 — Closed: opened against wrong repository](https://github.com/nanocoai/nanoclaw/pull/3178)**  
  Closed without upstream change. No code impact.

## Community Hot Topics

Comment/reaction data is limited, but the most notable discussion points are:

- **[#3179 — SyntaxError: `node:util` does not provide `styleText`](https://github.com/nanocoai/nanoclaw/issues/3179)**  
  The only issue with an actual comment today. The user hit a startup crash in `@clack/core` because `styleText` is not available in their `node:util`. This usually indicates an older Node.js runtime.

- **[#3177 — Session database lock contention on Docker cross-mount filesystems](https://github.com/nanocoai/nanoclaw/issues/3177)**  
  No comments yet, but the report is severe: 29,000+ `readonly` errors and delivery failures caused by SQLite DELETE journal mode not propagating across Docker mounts.

- **[#3092 — Support remote Streamable HTTP MCP servers](https://github.com/nanocoai/nanoclaw/pull/3092)**  
  Open and updated today. Shows continued community interest in MCP interoperability beyond local transports.

The underlying needs are: Node runtime compatibility, reliable Docker/persistent-storage behavior, more self-service agent controls, and broader external tool/MCP connectivity.

## Bugs & Stability

Bugs reported or fixed today, ranked by severity:

1. **High — SQLite lock contention on Docker mounts**  
   [#3177](https://github.com/nanocoai/nanoclaw/issues/3177)  
   Session databases (`inbound.db`, `outbound.db`) hit severe locking failures on Docker-mounted filesystems, causing thousands of errors and intermittent delivery failures. No fix PR is visible yet.

2. **Medium — Node.js startup crash: missing `styleText` export**  
   [#3179](https://github.com/nanocoai/nanoclaw/issues/3179)  
   The runtime fails to start because `node:util` does not provide `styleText`. This is an environment/Node-version compatibility issue rather than a core logic bug, but it blocks basic usage for affected users. No fix PR is linked yet.

3. **Fixed — Resolved approval cards losing content**  
   [#3143](https://github.com/nanocoai/nanoclaw/pull/3143)  
   Closed PR that fixes terminal/persistent approval cards so resolved cards retain their title and request details.

## Feature Requests & Roadmap Signals

The open PRs and issues suggest the following likely roadmap directions:

- **Dial channel integration**  
  [#3041](https://github.com/nanocoai/nanoclaw/pull/3041) adds a Dial channel adapter for SMS + AI voice calls, and [#3050](https://github.com/nanocoai/nanoclaw/pull/3050) adds Dial to the channel picker and setup wizard/skills. Both are open and appear ready for maintainer review.

- **Remote MCP server support**  
  [#3092](https://github.com/nanocoai/nanoclaw/pull/3092) proposes support for remote Streamable HTTP MCP servers, which would expand NanoClaw’s integration ecosystem.

- **Context/Markdown handling improvements**  
  [#3090](https://github.com/nanocoai/nanoclaw/pull/3090) is a fix to prepend all top-level context Markdown. This is more of a correctness improvement than a feature but is important for agent context quality.

The next NanoClaw version may reasonably include Dial channel support and remote MCP server support if these PRs are merged.

## User Feedback Summary

User feedback today centers on practical reliability and compatibility pain points:

- The `styleText` SyntaxError in [#3179](https://github.com/nanocoai/nanoclaw/issues/3179) indicates that some users are running NanoClaw on Node.js versions that do not export `styleText`, causing immediate startup failure.
- The Docker SQLite lock contention report in [#3177](https://github.com/nanocoai/nanoclaw/issues/3177) highlights real production pain for users on macOS/Linux Docker setups with cross-mount filesystems.
- Contributor demand remains strong for channel expansion — specifically Dial for SMS/voice — and for supporting modern remote MCP servers.
- The quick close of wrong-repository PR [#3178](https://github.com/nanocoai/nanoclaw/pull/3178) suggests contributor onboarding is active, but somewhat noisy.

Overall, users appear engaged, but unresolved infrastructure issues could become sources of dissatisfaction if they are not triaged quickly.

## Backlog Watch

Items that may need maintainer attention:

- **[#3177 — Docker SQLite lock contention](https://github.com/nanocoai/nanoclaw/issues/3177)**  
  High-severity bug, opened 2026-08-02, with zero comments. Needs maintainer triage and likely a fix PR.

- **[#3050 — Dial channel picker + wizard/skills](https://github.com/nanocoai/nanoclaw/pull/3050)**  
  Open since 2026-07-14, updated 2026-08-02. Feature-ready but still awaiting review.

- **[#3041 — Dial channel adapter (SMS + AI voice)](https://github.com/nanocoai/nanoclaw/pull/3041)**  
  Open since 2026-07-14, updated 2026-08-02. Companion PR to #3050; also needs review.

- **[#3092 — Remote Streamable HTTP MCP servers](https://github.com/nanocoai/nanoclaw/pull/3092)**  
  Open since 2026-07-19, updated 2026-08-03. No visible maintainer comments; important for MCP ecosystem support.

- **[#3090 — Prepend all top-level context Markdown](https://github.com/nanocoai/nanoclaw/pull/3090)**  
  Open since 2026-07-19, updated 2026-08-02. A straightforward fix that could affect prompt/context quality across many agents.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw Project Digest — 2026-08-03

## Today’s Overview

NullClaw showed moderate maintenance activity on 2026-08-03: 1 issue was updated, 5 pull requests received updates, and no release was published. Two streaming tool-call PRs (#964, #965) moved to closed/merged status, while two new proxy/transport hardening fixes (#982, #983) remain open. A long-running scheduler bug (#915) is still active and remains the main community discussion point. Meanwhile, one Dependabot dependency update (#956) is waiting for review. Overall, the project appears healthy, with current work focused on transport reliability and streaming tool-call maturity.

## Releases

None. No new releases were published in the last 24 hours.

## Project Progress

Two PRs moved to closed/merged status today:

- **#965 — Structured streaming tool-call support for SSE parser**  
  URL: https://github.com/nullclaw/nullclaw/pull/965  
  This companion PR enables `tools[]` + `tool_choice: "auto"` in streaming requests and handles servers that emit model-produced XML in `delta.content`. It completes the root streaming tool-call fix by making SSE-parsed structured tool calls usable by the agent.

- **#964 — Enable native API-level tool calls during streaming**  
  URL: https://github.com/nullclaw/nullclaw/pull/964  
  This PR preserves structured tool-call deltas in `StreamChatResult`, allowing the agent to execute a pure streamed tool response. It also adjusts provider-wide capability checks that previously prevented API-level tool calls during streaming.

Together, these PRs represent a significant advance in streaming tool-call support: streamed responses can now contain executable structured tool calls instead of relying on XML content alone.

## Community Hot Topics

The most active issue is **#915 — [bug] Problem with scheduler unauthorized**  
URL: https://github.com/nullclaw/nullclaw/issues/915

- Author: `scabros`
- Created: 2026-05-15
- Updated: 2026-08-03
- Comments: 4
- Reactions: 👍 1

This issue is the only active issue updated in the last 24 hours. The user reports that the scheduler is not working in Telegram chat or other contexts while using an external Ollama host, even though general tool calling works. The underlying need appears to be better scheduler authorization handling for external LLM hosts, plus clearer diagnostics for why scheduler requests are rejected as “unauthorized.”

No PR comment counts were reported for the updated pull requests.

## Bugs & Stability

Ranked by potential impact:

1. **High — #915: Scheduler unauthorized with external Ollama host**  
   URL: https://github.com/nullclaw/nullclaw/issues/915  
   The scheduler fails with an “unauthorized” error when NullClaw is connected to an external Ollama instance. This blocks scheduled automation for users running `qwen3.6:27b` on separate machines. No dedicated fix PR has been linked yet.

2. **Medium — #982: Telegram Bot API proxy path may fail**  
   URL: https://github.com/nullclaw/nullclaw/pull/982  
   This open PR fixes Telegram Bot API POST requests when `channels.telegram.accounts.<id>.proxy` is configured. The live channel probe already fails on this path, so this is a known stability gap. The fix routes proxied requests through the existing curl transport while retaining native HTTP for direct connections.

3. **Medium — #983: Provider requests may miss secure curl path when pinned resolve is available**  
   URL: https://github.com/nullclaw/nullclaw/pull/983  
   This open PR routes non-streaming provider POSTs through the existing secure curl path when a pinned resolve entry exists. It also keeps credential headers out of `argv` by reusing a temp header file. This is a security/stability hardening fix for proxied provider requests.

Both fixes are open rather than merged, so they are not yet part of mainline behavior.

## Feature Requests & Roadmap Signals

No new user feature-request issues were filed in the last 24 hours. The strongest roadmap signal comes from the closed/merged PRs:

- **Native API-level tool calls during streaming** (#964) and **structured SSE tool-call parsing** (#965) point to an upcoming release with significantly better streaming agent behavior. These changes will likely enable more robust tool execution in streamed responses.
- **Dependency maintenance** is also active: PR #956 bumps Alpine from 3.23 to 3.24 in the Docker image group.  
  URL: https://github.com/nullclaw/nullclaw/pull/956

## User Feedback Summary

The main user signal today comes from **#915**:

- The user reports that NullClaw works correctly with an external Ollama host, and that “tool calling in general also works mostly fine.”
- The specific pain point is the scheduler, which fails with an “unauthorized” error in Telegram chat and other interfaces.
- This indicates dissatisfaction limited to scheduler functionality, while general LLM and tool-calling satisfaction remains positive.

The user’s setup is Linux/Ubuntu with `qwen3.6:27b` on an RTX 3090 over a local network, which is a common self-hosted deployment pattern. The issue suggests a need for better scheduler authentication or permission handling when talking to external Ollama hosts.

## Backlog Watch

Two items deserve maintainer attention:

- **#915 — Scheduler unauthorized**  
  URL: https://github.com/nullclaw/nullclaw/issues/915  
  Open since 2026-05-15, updated 2026-08-03, with 4 comments and 1 👍. Still unresolved and no fix PR attached. This is the longest-running user-facing blocker in the current active set.

- **#956 — Dependabot: Alpine 3.23 → 3.24**  
  URL: https://github.com/nullclaw/nullclaw/pull/956  
  Open since 2026-06-15 and still awaiting review/merge. Low risk dependency update, but long open time suggests maintainer bandwidth may be limited.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-08-03

## 1. Today's Overview

IronClaw saw very high activity on 2026-08-03: 35 issues were updated in the last 24 hours (27 open, 8 closed), and 50 PRs were updated (34 open, 16 merged/closed). No new release was published. The project remains deep in the **Reborn architecture refactor**, with PRs merging sandbox/MCP contracts, moving the model gateway into `loop_host`, and unblocking WebUI E2E coverage. A fresh QA bug-bash surfaced several P1/P2 user-facing reliability issues, while the team also closed two large epics around error recoverability and hermetic testing. Overall project health is active but strained: momentum is strong, yet multiple high-severity bugs and CI/coverage regressions need attention.

## 2. Releases

None. No new IronClaw releases were published in the last 24 hours, so there are no release notes, breaking changes, or migration notes to report.

## 3. Project Progress

### Closed/merged PRs visible today
- [PR #7047](https://github.com/nearai/ironclaw/pull/7047) — **Install the packages the catalog already publishes.** Fixes a real install gap where catalog entries published `files` but only `SKILL.md` was installed. Closed.
- [PR #6780](https://github.com/nearai/ironclaw/pull/6780) — **Deep-link register/install gateway + private manifest source.** Re-port of the IronHub extension-host gateway. Closed.
- [PR #7050](https://github.com/nearai/ironclaw/pull/7050) — **Recover hosted Postgres API capacity regressed by the row-native process journal.** Rebases and carries forward the reviewed fix from #6973. Closed.

### Notable issue closures
- [Issue #6284](https://github.com/nearai/ironclaw/issues/6284) — **Epic: error-recoverability endgame.** Closed after defining the full recoverability contract.
- [Issue #6524](https://github.com/nearai/ironclaw/issues/6524) — **Epic: Hermetic capability and journey testing platform.** Closed.
- [Issue #6635](https://github.com/nearai/ironclaw/issues/6635) — Docker image build restored in CI. Closed.
- [Issue #6902](https://github.com/nearai/ironclaw/issues/6902) — Projects page fabricated metrics fixed. Closed.
- [Issue #6915](https://github.com/nearai/ironclaw/issues/6915) — Workspace file links in assistant messages now reportedly fixed. Closed.
- [Issue #7015](https://github.com/nearai/ironclaw/issues/7015) — Staking page UI bug closed.

## 4. Community Hot Topics

Most-commented issues in the last 24h:

- [Issue #6284](https://github.com/nearai/ironclaw/issues/6284) — **Error-recoverability endgame epic** (15 comments). Underlying need: every mid-run error must be survivable, visible to the model, actionable, and never reported as a false non-success. This is a core architectural contract, not just a bug list.
- [Issue #6524](https://github.com/nearai/ironclaw/issues/6524) — **Hermetic capability and journey testing platform** (4 comments). Underlying need: IronClaw wants deterministic, machine-verifiable proof that every supported capability and critical journey is covered.
- [Issue #7060](https://github.com/nearai/ironclaw/issues/7060) — **Platform-owned WIT and extension package changes fail the Reborn scope classifier** (2 comments). Underlying need: the Reborn planner introduced by #7019 needs to route platform-owned paths correctly or it blocks legitimate changes.
- [Issue #7015](https://github.com/nearai/ironclaw/issues/7015) — **Staking page UI bug** (1 comment). User-reported feedback with sparse repro details; closed quickly.

No PRs in the visible data had notable comment counts this window.

## 5. Bugs & Stability

Bugs and regressions surfaced in the last 24h, ranked roughly by severity:

| Severity | Issue | Summary | Related fix / status |
|---|---|---|---|
| P1 | [Issue #7074](https://github.com/nearai/ironclaw/issues/7074) | Multi-tool meeting research fails after calendar data is retrieved; model tries to call an unavailable function. | Open, bug-bash |
| P1 | [Issue #7069](https://github.com/nearai/ironclaw/issues/7069) | Google services require repeated authentication even after the user completes OAuth. | Open, bug-bash |
| P2 | [Issue #7075](https://github.com/nearai/ironclaw/issues/7075) | Agent ignores a follow-up question after a failed run and resumes the old task. | Open, bug-bash |
| P2 | [Issue #7073](https://github.com/nearai/ironclaw/issues/7073) | Agent leaks internal tool names and delivery routing logic in user-facing responses. | Open, bug-bash |
| P2 | [Issue #7072](https://github.com/nearai/ironclaw/issues/7072) | Telegram messages render raw Markdown instead of formatted text. | Open, bug-bash |
| P2 | [Issue #7071](https://github.com/nearai/ironclaw/issues/7071) | “Reconnecting” status flashes during every streaming chunk. | Open, bug-bash |
| Correctness | [Issue #7068](https://github.com/nearai/ironclaw/issues/7068) | Hosted MCP `destructiveHint` defaults to `false` when omitted; MCP spec defaults it to `true`. | Open |
| Correctness | [Issue #7045](https://github.com/nearai/ironclaw/issues/7045) | Telegram voice notes and stickers fail the entire update parse (`InvalidExternalRef`). | Open, needs owner decision |
| Security | [Issue #7041](https://github.com/nearai/ironclaw/issues/7041) | WASM guest diagnostics can expose detectable secrets through runtime, model causes, and tracing. | [PR #7048](https://github.com/nearai/ironclaw/pull/7048) |
| Reliability | [Issue #7031](https://github.com/nearai/ironclaw/issues/7031) | Failed lazy-delivery recovery is not retried within a coordinator lifetime. | Related: [PR #7028](https://github.com/nearai/ironclaw/pull/7028), [PR #7029](https://github.com/nearai/ironclaw/pull/7029) |
| CI | [Issue #7060](https://github.com/nearai/ironclaw/issues/7060) | Reborn scope classifier rejects platform-owned `wit/**` and extension-package paths. | [PR #7063](https://github.com/nearai/ironclaw/pull/7063) |
| CI | [Issue #7036](https://github.com/nearai/ironclaw/issues/7036) | Changed-coverage gate does not run on ordinary PRs; first verdict lands in the merge queue. | Open; related [PR #7066](https://github.com/nearai/ironclaw/pull/7066) |

Also active: [PR #7070](https://github.com/nearai/ironclaw/pull/7070) fixes five red WebUI v2 E2E tests, including an SSE keep_alive cursor bug and admin load-more retry.

## 6. Feature Requests & Roadmap Signals

Several roadmap-shaping epics and feature requests were touched today:

- [Issue #7046](https://github.com/nearai/ironclaw/issues/7046) — **Configure all tools, channels, and extensions from AI chat.** Signals a major shift away from WebUI-only configuration.
- [Issue #7044](https://github.com/nearai/ironclaw/issues/7044) — **Onboarding to channel-first approach.** Focus is reducing first-run friction for the SME General Assistant use case.
- [Issue #7038](https://github.com/nearai/ironclaw/issues/7038) — **Epic: Storybook + AI-first Design System.**
- [Issue #7042](https://github.com/nearai/ironclaw/issues/7042) — **Design System Phase 2: DESIGN.md governance & guidelines.**
- [Issue #7053](https://github.com/nearai/ironclaw/issues/7053) — **Close Critical E2E Coverage Gaps**, with sub-issues:
  - [Issue #7054](https://github.com/nearai/ironclaw/issues/7054) — First-run LLM onboarding E2E.
  - [Issue #7055](https://github.com/nearai/ironclaw/issues/7055) — Project lifecycle and membership E2E.
  - [Issue #7056](https://github.com/nearai/ironclaw/issues/7056) — Automation lifecycle E2E.
- [Issue #6734](https://github.com/nearai/ironclaw/issues/6734) — Agent access to its own documentation was closed, but the capability is now likely absorbed into the broader channel-first/AI-configuration direction.

**Prediction:** The next version will likely emphasize first-run onboarding, channel-first setup, stronger shipping-binary E2E coverage, and early design-system governance.

## 7. User Feedback Summary

Direct user feedback was limited but included:

- [Issue #7015](https://github.com/nearai/ironclaw/issues/7015) — Staking page UI bug, filed with minimal repro details and closed quickly.

The larger signal comes from the QA bug-bash on the Railway test instance. These are user-visible experience problems:

- Telegram formatting is broken: raw Markdown instead of rendered text ([#7072](https://github.com/nearai/ironclaw/issues/7072)).
- The UI constantly flashes “Reconnecting” during normal streaming ([#7071](https://github.com/nearai/ironclaw/issues/7071)).
- The agent exposes internal tool/delivery details instead of plain-language answers ([#7073](https://github.com/nearai/ironclaw/issues/7073)).
- Users must re-authenticate for every Google service ([#7069](https://github.com/nearai/ironclaw/issues/7069)).
- Failed runs cause the agent to ignore the user’s next question ([#7075](https://github.com/nearai/ironclaw/issues/7075)).
- Multi-tool workflows break mid-task after successful data retrieval ([#7074](https://github.com/nearai/ironclaw/issues/7074)).

Overall, users seem to value the agent’s breadth, but reliability, polished messaging, and auth persistence are current pain points.

## 8. Backlog Watch

Potentially important items that need maintainer attention or a decision:

- [PR #5598](https://github.com/nearai/ironclaw/pull/5598) — **`chore: release`** has been open since 2026-07-03. It contains API breaking changes for `ironclaw_common` 0.5.0 and `ironclaw_skills` 0.4.0. This release PR is unusually old and blocks or delays release visibility.
- [Issue #7045](https://github.com/nearai/ironclaw/issues/7045) — Telegram voice notes/stickers fail the update parse; explicitly waiting for an owner’s decision on which side should move.
- [PR #6957](https://github.com/nearai/ironclaw/pull/6957) — **IronHub installed-package lifecycle** has been open since 2026-07-31; large feature with persistence and update operations.
- [PR #6933](https://github.com/nearai/ironclaw/pull/6933) — **Bind installs to verified package identity** has been open since 2026-07-30 and builds on #6780.
- [PR #6968](https://github.com/nearai/ironclaw/pull/6968) — **Progressive-disclosure canary metrics** has been open since 2026-07-31.
- [PR #6953](https://github.com/nearai/ironclaw/pull/6953) — **Reduce GitHub PR-prioritization tool churn** has been open since 2026-07-31.
- [Issue #7036](https://github.com/nearai/ironclaw/issues/7036) — Changed-coverage gate behavior is a “know what green means” issue but was intentionally left open as CI policy.

The concentration of large PRs waiting from late July suggests a review bottleneck despite strong merge activity today.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI Project Digest — 2026-08-03

## 1. Today's Overview

LobsterAI saw active maintenance work on 2026-08-03, with no new release published. Six pull requests were closed/merged, covering a multi-agent sidebar filter, a startup credit campaign, a Windows NSIS installer reliability fix, and several related “BTW tools” changes that were ultimately reverted. Two long-lived issues were touched and remain open: a private-deployment Kimi2.5 bug and a request for Markdown session export, both labeled `[stale]`. The project is still carrying several community PRs from early April that need maintainer review. Overall project health is moderate: steady internal feature delivery, but a growing backlog of externally contributed fixes.

## 2. Releases

No new releases were published in the last 24 hours.

## 3. Project Progress

Six PRs moved to closed/merged today:

- **[#2418 — feat(sidebar): add multi-agent task activity filter](https://github.com/netease-youdao/LobsterAI/pull/2418)**  
  Adds a Codex-inspired task activity filter to the sidebar for quickly finding tasks that need attention across multiple agents. Includes a filter button, collapsed-sidebar behavior, and a blue indicator.

- **[#2419 — feat(activity): add startup credit campaign](https://github.com/netease-youdao/LobsterAI/pull/2419)**  
  Adds a configurable startup credit campaign experience to the desktop client, apparently for a NetEase user acquisition campaign. Includes a startup popup, persistent new-conversation-page entry, login continuation, and claim flow.

- **[#2420 — fix(nsis): re-kill survivor processes on every stop poll round](https://github.com/netease-youdao/LobsterAI/pull/2420)**  
  Fixes a Windows NSIS installer issue where `Stop-Process` was only issued once before polling, allowing survivor processes to escape shutdown. The fix re-runs `Stop-Process` every poll round and logs process details if the shutdown gate still times out.

- **[#2421](https://github.com/netease-youdao/LobsterAI/pull/2421), [#2422](https://github.com/netease-youdao/LobsterAI/pull/2422), [#2423](https://github.com/netease-youdao/LobsterAI/pull/2423) — BTW-tools fix and revert**  
  Multiple PRs by `liuzhq1986` touched renderer, docs, main, openclaw, cowork, and artifacts. One of them, **[#2423](https://github.com/netease-youdao/LobsterAI/pull/2423)**, explicitly reverts the “fix btw tools” work. The churn suggests the original fix was problematic or no longer desired, and the underlying issue may still need follow-up.

## 4. Community Hot Topics

Community comment/reaction activity is low today, but two stale issues are the most notable discussion points:

- **[Issue #1206 — [bug] 私有化部署的kimi2.5模型分析文档会重复处理或回复进度](https://github.com/netease-youdao/LobsterAI/issues/1206)**  
  The reporter describes a private deployment of Kimi2.5 that repeats the current action/progress message while analyzing documents. The user is unsure whether to wait or whether the system is stuck. Switching models resolves the problem. Underlying need: more deterministic progress reporting and clearer wait states for locally deployed models.

- **[Issue #1213 — [功能建议] 为会话详情添加「导出为 Markdown」功能](https://github.com/netease-youdao/LobsterAI/issues/1213)**  
  Session details currently only support image export, which is inconvenient for editing, sharing, and searching. The request is to add a “Export as Markdown” action to the session detail menu. This has a corresponding open implementation PR: **[#1214](https://github.com/netease-youdao/LobsterAI/pull/1214)**.

## 5. Bugs & Stability

Ranked by severity:

1. **Kimi2.5 private deployment duplicate progress reporting** — **[Issue #1206](https://github.com/netease-youdao/LobsterAI/issues/1206)**  
   Medium-to-high impact for affected private-deployment users: document analysis workflows repeat progress messages and create ambiguity about execution state. No fix PR is visible yet.

2. **Windows NSIS installer survivor processes** — **[PR #2420](https://github.com/netease-youdao/LobsterAI/pull/2420)**  
   A real install/uninstall reliability bug. The fix was closed today, so this stability issue appears resolved for the next build.

3. **Web-search blocked by unsupported Chrome flags** — **[PR #1209](https://github.com/netease-youdao/LobsterAI/pull/1209)**  
   External Chrome flags such as `--disable-blink-features=AutomationControlled` can contaminate the web-search skill. The PR diagnoses the root cause and blocks unsupported flags, but it remains open since 2026-04-01.

4. **Custom provider limit hard-capped at 10** — **[PR #1212](https://github.com/netease-youdao/LobsterAI/pull/1212)**  
   Not a crash, but a functional limitation. The renderer hard-codes `custom_0` through `custom_9`, preventing users from preserving older provider configs while adding new ones. The fix raises the limit to 20 and is still open.

No new regressions were reported in the 24-hour window.

## 6. Feature Requests & Roadmap Signals

- **Markdown export for sessions** — requested in **[Issue #1213](https://github.com/netease-youdao/LobsterAI/issues/1213)** and implemented in **[PR #1214](https://github.com/netease-youdao/LobsterAI/pull/1214)**. The PR is ready but stale; likely candidate for the next minor release if reviewed.

- **One-click retry for Cowork errors** — **[PR #1208](https://github.com/netease-youdao/LobsterAI/pull/1208)** adds a retry button to error bubbles for transient failures like 429s, network errors, and server errors. This directly improves real user workflow and is another strong next-release candidate.

- **Increase custom providers from 10 to 20** — **[PR #1212](https://github.com/netease-youdao/LobsterAI/pull/1212)** addresses a user-facing config limitation.

- **Merged roadmap signal: multi-agent task activity filter** — **[PR #2418](https://github.com/netease-youdao/LobsterAI/pull/2418)** suggests the project is investing in multi-agent task management UX.

- **Merged roadmap signal: startup credit campaign** — **[PR #2419](https://github.com/netease-youdao/LobsterAI/pull/2419)** points toward product-led growth and campaign onboarding.

Prediction: The next version is likely to include the multi-agent sidebar filter, the NSIS Windows fix, and possibly Markdown export or the retry button if maintainers pick up the stale PRs.

## 7. User Feedback Summary

Real user pain points visible today:

- **Private-deployment users** face model-specific behavior with Kimi2.5: repeated progress messages make it hard to know whether the client is working or stuck. Users currently work around it by switching models, which is not a real fix.
- **Session export is too limited**: users want Markdown, not just images, so they can reference, edit, and search conversation history.
- **Cowork error recovery is awkward**: after 429/network failures, users must retype and resend their last message instead of simply retrying.
- **Custom provider management is unnecessarily restrictive**: the 10-provider cap blocks users from migrating while preserving existing configurations.
- No explicit positive/negative satisfaction metrics are present in the data, but the volume of merged internal PRs suggests the project is still actively iterating.

## 8. Backlog Watch

The following long-open items need maintainer attention:

| Item | Type | Created | Status |
|---|---|---|---|
| [#1206 — Kimi2.5 repeated progress bug](https://github.com/netease-youdao/LobsterAI/issues/1206) | Bug | 2026-04-01 | `[stale]`, no fix PR |
| [#1213 — Markdown export request](https://github.com/netease-youdao/LobsterAI/issues/1213) | Feature | 2026-04-01 | `[stale]`, has open PR [#1214](https://github.com/netease-youdao/LobsterAI/pull/1214) |
| [#1208 — Cowork retry button](https://github.com/netease-youdao/LobsterAI/pull/1208) | PR / feature | 2026-04-01 | Open, needs review |
| [#1209 — Web-search Chrome flags fix](https://github.com/netease-youdao/LobsterAI/pull/1209) | PR / bugfix | 2026-04-01 | Open, needs review |
| [#1212 — Raise custom provider limit to 20](https://github.com/netease-youdao/LobsterAI/pull/1212) | PR / enhancement | 2026-04-01 | Open, needs review |
| [#1214 — Markdown export implementation](https://github.com/netease-youdao/LobsterAI/pull/1214) | PR / feature | 2026-04-01 | Open, closes #1345 |
| [#1277 — Dependabot Electron group bump](https://github.com/netease-youdao/LobsterAI/pull/1277) | PR / dependencies | 2026-04-02 | Open; bumps Electron 40.2.1 → 43.2.0 |

These items are mostly over four months old and several are marked `[stale]`. Without maintainer review, they may be automatically closed or continue to linger as unresolved community contributions.

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

## Moltis Project Digest — 2026-08-03

### 1. Today's Overview
Moltis is in a low-activity phase: no issues were updated in the last 24 hours, and there are no open or closed issues on record. One pull request (#1183) was updated, remaining open with no merge or close activity. No new releases were published. The project appears stable but not dormant, with focused ongoing work around MCP server management and onboarding simplification. Overall health looks calm, with no reported user-facing regressions or bug influx.

### 2. Releases
None. No new Moltis releases were published in the last 24 hours.

### 3. Project Progress
- **Merged/closed PRs today:** 0
- **Open PR updated today:**
  - [#1183 [OPEN] feat(mcp): add managed repository bundles](https://github.com/moltis-org/moltis/pull/1183)
    - Author: penso
    - Created: 2026-08-02
    - Updated: 2026-08-03
    - Summary: Adds managed Git repository bundles for discovering, previewing, installing, updating, rolling back, and removing MCP servers. Also supports HTTPS credentials, pinned managed SSH transport, vault lifecycle integration, imported repository-backed MCP configurations, and simplifies web onboarding.

No features were merged or closed today, but #1183 represents meaningful forward progress on MCP lifecycle management.

### 4. Community Hot Topics
There is no highly active community discussion today: no issues and no PR comments/reactions were recorded. The only notable item is **PR #1183**, which, while lacking comments, signals strong interest in:
- Managing MCP servers as reproducible, versioned “bundles”
- Secure transport and credential handling (HTTPS credentials, pinned SSH)
- Integration with vault-based lifecycle management
- Reducing onboarding friction for web users

Link: [#1183](https://github.com/moltis-org/moltis/pull/1183)

### 5. Bugs & Stability
No bugs, crashes, regressions, or stability concerns were reported in the last 24 hours. There are no open bug-related issues or fix PRs to track. Project stability appears clean.

### 6. Feature Requests & Roadmap Signals
The dominant roadmap signal is **managed repository bundles for MCP servers**, as seen in PR #1183. If this PR is merged, the next Moltis version could include:
- Discover/preview/install/update/rollback/remove flows for MCP servers
- Secure credential management via HTTPS and pinned SSH
- Tighter integration with Moltis vault lifecycle
- Simpler web onboarding for importing repository-backed MCP configurations

This suggests a near-term release focused on MCP ecosystem maturity and enterprise-ready configuration management.

### 7. User Feedback Summary
No direct user feedback was captured in the last 24 hours. There were no issue comments, PR comments, or reactions to analyze. Satisfaction/dissatisfaction cannot be assessed from current data. The lack of bug reports and the presence of a structured feature PR suggest a stable period, but no user sentiment signal is available.

### 8. Backlog Watch
No long-unanswered issues or stale PRs are currently visible. The only open PR, #1183, was recently updated and is likely awaiting maintainer review. Given its scope — MCP server lifecycle management and onboarding UX — maintainer attention should be directed toward reviewing and potentially merging it to avoid stagnation.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw Project Digest — 2026-08-03

**Project:** QwenPaw (tracked by CoPaw)  
**Data window:** Issues/PRs updated in last 24h  

## 1. Today's Overview

On 2026-08-03, QwenPaw showed high activity: 22 issues and 50 PRs updated in the last 24 hours, plus a new `v2.1.0-beta.1` release. The release focuses on chat channel identity and inbox approval visibility, while the PR queue is dominated by fixes for shell-command reliability, ACP notification races, CI gates, and desktop/agentscope compatibility. Six visible PRs reached a closed state, including several CI fixes and a desktop Python-bundling change. However, high-impact bugs remain open, including WebView2 crash black-screens, silent WeChat cron delivery failures, and incompatibilities with `agentscope 2.0.4.post1`. Overall, the project is very active and community-engaged, but stability and compatibility regressions are the main themes requiring maintainer attention.

## 2. Releases

### v2.1.0-beta.1
- **Release:** [agentscope-ai/QwenPaw v2.1.0-beta.1](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.1.0-beta.1)
- **Key changes:**
  - `fix(chat)`: prevent stale channel identity leaking into new chats — [PR #6382](https://github.com/agentscope-ai/QwenPaw/pull/6382)
  - `feat(inbox)`: wobble sidebar inbox on new approvals & color-code badge dot
- **Breaking changes / migration notes:** none were included in the release notes.
- **Status:** beta; installation verification tracked in [Issue #6656](https://github.com/agentscope-ai/QwenPaw/issues/6656).

## 3. Project Progress

Out of 24 merged/closed PRs in the window, the visible top-20 set includes six closed PRs:

- [PR #6653](https://github.com/agentscope-ai/QwenPaw/pull/6653) — `fix(ci)`: fence-aware section extraction in real-behavior-proof (fixes #6626)
- [PR #6646](https://github.com/agentscope-ai/QwenPaw/pull/6646) — `fix(ci)`: fetch PR body via API for fork PRs in real-behavior-proof
- [PR #6654](https://github.com/agentscope-ai/QwenPaw/pull/6654) — `fix(ci)`: cap playwright below 1.62 so macOS desktop verify passes
- [PR #6579](https://github.com/agentscope-ai/QwenPaw/pull/6579) — `fix(desktop)`: use bundled Python for script execution (addresses #6160)
- [PR #6203](https://github.com/agentscope-ai/QwenPaw/pull/6203) — `fix(utils)`: bound and hide the Windows tasklist liveness probe
- [PR #6609](https://github.com/agentscope-ai/QwenPaw/pull/6609) — fix `spawn_subagent` schema (fixes #6588; a newer open PR #6658 also targets this issue)

Notable open PRs under review/development:

- [PR #6659](https://github.com/agentscope-ai/QwenPaw/pull/6659) — model fallback with cooldown mechanism
- [PR #6658](https://github.com/agentscope-ai/QwenPaw/pull/6658) — normalize empty `batch` placeholders to `None`
- [PR #6650](https://github.com/agentscope-ai/QwenPaw/pull/6650) — reduce Skill API payloads via lightweight list + detail endpoints
- [PR #6651](https://github.com/agentscope-ai/QwenPaw/pull/6651) — file/folder management REST API for the Files page
- [PR #6652](https://github.com/agentscope-ai/QwenPaw/pull/6652) — enforce `max_iterations` server-side in MissionGate
- [PR #6623](https://github.com/agentscope-ai/QwenPaw/pull/6623) — fix ACP race causing final text loss

## 4. Community Hot Topics

Most-discussed issues by comment count:

- [Issue #6537](https://github.com/agentscope-ai/QwenPaw/issues/6537) — **Skill tags disappear on restart** (regression of #3270) — 11 comments  
  Underlying need: user-managed skill metadata must survive startup/reconciliation.

- [Issue #6649](https://github.com/agentscope-ai/QwenPaw/issues/6649) — **Support GPT-5.6 prompt caching parameters** — 8 comments  
  Underlying need: users want lower latency/cost for multi-turn agent loops with newer models.

- [Issue #6588](https://github.com/agentscope-ai/QwenPaw/issues/6588) — **`spawn_subagent` treats empty `batch` placeholders as batch mode** — 6 comments  
  Underlying need: robust tool-call behavior across Responses-compatible model providers.

- [Issue #6160](https://github.com/agentscope-ai/QwenPaw/issues/6160) — **Can QwenPaw bundle an independent Python runtime?** — 4 comments  
  Underlying need: desktop users without a global Python interpreter need a self-contained execution environment.

- [Issue #6655](https://github.com/agentscope-ai/QwenPaw/issues/6655) — **Console channel does not render approval prompts** — 3 comments  
  Underlying need: non-web channels need visible security-approval UX, not silent 300s timeouts.

No significant 👍 reaction data was present in the dataset; comment count was the primary activity signal.

## 5. Bugs & Stability

Ranked by severity:

| Severity | Issue | Impact | Fix status |
|---|---|---|---|
| High | [#6647](https://github.com/agentscope-ai/QwenPaw/issues/6647) | Desktop UI goes fully black when WebView2 crashes; no recovery path | No fix PR visible |
| High | [#6614](https://github.com/agentscope-ai/QwenPaw/issues/6614) | WeChat cron push silently fails (`ret=-2`, invalid `context_token`); jobs report success; ~44M tokens burned | No fix PR visible |
| High | [#6612](https://github.com/agentscope-ai/QwenPaw/issues/6612) | QwenPaw 2.0.1 incompatible with `agentscope 2.0.4.post1`: proactive crashes and tool-permission deadlock | Partial: [#6616](https://github.com/agentscope-ai/QwenPaw/pull/6616) fixes CLI message type; no full fix visible |
| High | [#6619](https://github.com/agentscope-ai/QwenPaw/issues/6619) | `"ToolCallBlock" object has no field "extra_content"` crash in stream response parsing | No fix PR visible |
| High | [#6608](https://github.com/agentscope-ai/QwenPaw/issues/6608) | Long-running shell commands bypass `shell_command_timeout` and block Feishu sessions; orphan subprocesses on cancel | No fix PR visible |
| Medium | [#6537](https://github.com/agentscope-ai/QwenPaw/issues/6537) | Skill tags disappear on restart; regression of #3270 | No fix PR visible |
| Medium | [#6589](https://github.com/agentscope-ai/QwenPaw/issues/6589) | Huge `execute_shell_command` stdout freezes the UI | No fix PR visible |
| Medium | [#6625](https://github.com/agentscope-ai/QwenPaw/issues/6625) | ACP delegate sometimes returns "completed without text output" when notifications race response | Fix PR: [#6623](https://github.com/agentscope-ai/QwenPaw/pull/6623) open |
| Medium | [#6588](https://github.com/agentscope-ai/QwenPaw/issues/6588) | Empty `batch` placeholders treated as batch mode | Fix PRs: [#6658](https://github.com/agentscope-ai/QwenPaw/pull/6658) open, [#6609](https://github.com/agentscope-ai/QwenPaw/pull/6609) closed |
| Medium | [#6565](https://github.com/agentscope-ai/QwenPaw/issues/6565) | `execute_shell_command` collapses newlines outside quotes; PIPE background processes hang | No fix PR visible |
| Medium | [#6633](https://github.com/agentscope-ai/QwenPaw/issues/6633) / [#6635](https://github.com/agentscope-ai/QwenPaw/issues/6635) | MB-level uncompressed API payloads cause console timeouts on slow networks | Partial: [#6650](https://github.com/agentscope-ai/QwenPaw/pull/6650) reduces skill payloads |
| Medium | [#6624](https://github.com/agentscope-ai/QwenPaw/issues/6624) | Auto-compact (Scroll) does not trigger `summarize_when_compact` memory flow | No fix PR visible |
| Medium | [#6655](https://github.com/agentscope-ai/QwenPaw/issues/6655) | Console channel approval prompts are not rendered; commands silently time out | Closed as question; no fix PR visible |
| Low/CI | [#6626](https://github.com/agentscope-ai/QwenPaw/issues/6626) | Real-behavior-proof gate strips fenced Evidence blocks | Fix PR: [#6653](https://github.com/agentscope-ai/QwenPaw/pull/6653) closed |

## 6. Feature Requests & Roadmap Signals

Notable user-requested features:

- [Issue #6649](https://github.com/agentscope-ai/QwenPaw/issues/6649) — GPT-5.6 prompt caching parameters (`prompt_cache_key`, `prompt_cache_options`, `prompt_cache_breakpoint`)
- [Issue #6642](https://github.com/agentscope-ai/QwenPaw/issues/6642) — Drag-and-drop should read the original file path instead of uploading/copying into media
- [Issue #6643](https://github.com/agentscope-ai/QwenPaw/issues/6643) — Task outputs should be stored in per-task directories, not all in `media/`
- [PR #6651](https://github.com/agentscope-ai/QwenPaw/pull/6651) — Full file/folder management REST API for the Files page
- [PR #6659](https://github.com/agentscope-ai/QwenPaw/pull/6659) — Automatic model fallback with cooldown
- [PR #6515](https://github.com/agentscope-ai/QwenPaw/pull/6515) — Add Volcengine Agent Plan and Xiaomi MiMo Standard API as built-in providers
- [Issue #6621](https://github.com/agentscope-ai/QwenPaw/issues/6621) — Multi-agent collaboration guidance is missing; users must manually edit `PROFILE.md`

Likely next-version candidates based on open PRs: model fallback (#6659), `spawn_subagent` argument normalization (#6658), ACP race fix (#6623), skill list payload optimization (#6650), file management API (#6651), and server-side mission iteration limits (#6652).

## 7. User Feedback Summary

- **Persistence regressions hurt trust:** users are frustrated that skill tags disappear after restart ([#6537](https://github.com/agentscope-ai/QwenPaw/issues/6537)).
- **Silent failures are a recurring theme:** WeChat cron jobs report `success` but never deliver ([#6614](https://github.com/agentscope-ai/QwenPaw/issues/6614)); console approvals are invisible to users ([#6655](https://github.com/agentscope-ai/QwenPaw/issues/6655)).
- **Desktop environment needs are strong:** Chinese Windows users want a bundled Python runtime instead of depending on a system interpreter ([#6160](https://github.com/agentscope-ai/QwenPaw/issues/6160)); PR #6579 appears to address this.
- **File management is a UX pain point:** users want direct original-path drag-and-drop and cleaner per-task output organization ([#6642](https://github.com/agentscope-ai/QwenPaw/issues/6642), [#6643](https://github.com/agentscope-ai/QwenPaw/issues/6643)).
- **Multi-agent onboarding is confusing:** one user reported 50+ conversations before discovering that agents do not auto-collaborate without explicit `PROFILE.md` instructions ([#6621](https://github.com/agentscope-ai/QwenPaw/issues/6621)).
- **Positive signals:** multiple first-time contributor PRs are moving through review, and the v2.1.0-beta.1 release shows ongoing UI/chat polish.

Overall, sentiment is mixed: users appreciate the fast development cadence, but reliability issues around shell execution, desktop crashes, and silent delivery failures are causing real friction.

## 8. Backlog Watch

These items appear to need maintainer attention:

- [PR #2199](https://github.com/agentscope-ai/QwenPaw/pull/2199) — **Model fallback with cooldown**, open since 2026-03-24; a newer duplicate ([#6659](https://github.com/agentscope-ai/QwenPaw/pull/6659)) was opened today. Maintainers should consolidate.
- [Issue #6612](https://github.com/agentscope-ai/QwenPaw/issues/6612) — **QwenPaw 2.0.1 vs `agentscope 2.0.4.post1` incompatibility**: proactive crashes and tool-permission deadlock; several related issues point to the same dependency mismatch.
- [Issue #6619](https://github.com/agentscope-ai/QwenPaw/issues/6619) — **Stream response crash** with `ToolCallBlock` missing `extra_content`; likely related to the same agentscope version drift.
- [Issue #6608](https://github.com/agentscope-ai/QwenPaw/issues/6608) — **Long-running shell commands bypass timeout** and block Feishu sessions indefinitely; important for real automation use cases.
- [Issue #6565](https://github.com/agentscope-ai/QwenPaw/issues/6565) — **`execute_shell_command` newline handling and PIPE background process hang**; affects Unix/Linux users.
- [PR #6616](https://github.com/agentscope-ai/QwenPaw/pull/6616) — **`qwenpaw task` never runs a task**; open since 2026-07-31 and high-impact for CLI users.
- [PR #6302](https://github.com/agentscope-ai/QwenPaw/pull/6302) — **Large provider discovery/routing unification patch**, open since 2026-07-21; may need splitting or a maintainer decision.
- [Issue #6624](https://github.com/agentscope-ai/QwenPaw/issues/6624) — **Auto-compression memory flow discrepancy**; needs maintainer clarification on intended behavior.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

## EasyClaw Project Digest — 2026-08-03

### 1. Today's Overview
Activity in the EasyClaw repository was minimal over the last 24 hours: **0 issues** and **0 pull requests** were updated, with no open or recently closed items tracked. The only notable event was the release of **v1.8.85**, indicating that while community activity is quiet, the project is still being actively maintained. The release focuses on compatibility alignment rather than new features. Overall project health appears stable, with no pending community discussions or contributor churn in this window.

### 2. Releases
- **[v1.8.85 — TK Copilot v1.8.85](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.85)**
  - **Change:** Keep Desktop affiliate workflows aligned with the latest GraphQL input requirements.
  - **更新内容:** 让桌面端达人工作流与最新 GraphQL 输入要求保持一致.
  - **Breaking changes:** None indicated.
  - **Migration notes:** None provided.
  - **Known caveat:** The release notes mention that macOS Gatekeeper may show the error `"'RivonClaw' is damaged and can't be opened"` for unsigned builds — users need to bypass Gatekeeper manually.

### 3. Project Progress
No pull requests were merged or closed in the last 24 hours. As such, no feature advancements or bug fixes from PRs can be documented for this period.  
See: [Open/merged PRs on GitHub](https://github.com/gaoyangz77/easyclaw/pulls)

### 4. Community Hot Topics
No issues or pull requests with comments or reactions were recorded in the last 24 hours. There are currently **0 active issues** and **0 active PRs** in the data set, so there is no community discussion to highlight.  
See: [EasyClaw Issues](https://github.com/gaoyangz77/easyclaw/issues)

### 5. Bugs & Stability
No new bugs, crashes, or regressions were reported or updated in the last 24 hours. The only stability-adjacent note is the existing macOS Gatekeeper warning for unsigned binaries, which is mentioned in the v1.8.85 release notes but was not filed as a GitHub issue in this window.  
See: [EasyClaw Issues](https://github.com/gaoyangz77/easyclaw/issues)

### 6. Feature Requests & Roadmap Signals
No explicit feature requests were captured in the last 24 hours. The v1.8.85 change — aligning Desktop affiliate workflows with latest GraphQL input requirements — suggests that the project is currently oriented toward maintaining API compatibilities rather than introducing new user-facing features. The next version will likely continue this maintenance path unless community demand shifts.

### 7. User Feedback Summary
No direct user feedback, complaints, or satisfaction signals were recorded in the last 24 hours. However, the release notes themselves acknowledge a recurring installation friction point: macOS Gatekeeper blocking unsigned builds. This could be a pain point for macOS users, especially those who receive the "'RivonClaw' is damaged" message.

### 8. Backlog Watch
There are no long-unanswered or important issues/PRs visible in the current data. With **0 open issues** and **0 open PRs**, the repo currently has no obvious backlog items requiring maintainer attention.  
See: [EasyClaw Issues](https://github.com/gaoyangz77/easyclaw/issues) · [EasyClaw Pull Requests](https://github.com/gaoyangz77/easyclaw/pulls)

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar).*