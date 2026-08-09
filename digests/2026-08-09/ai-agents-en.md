# OpenClaw Ecosystem Digest 2026-08-09

> Issues: 500 | PRs: 500 | Projects covered: 13 | Generated: 2026-08-09 01:23 UTC

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

# OpenClaw Project Digest — 2026-08-09

## Today's Overview

OpenClaw shows high activity with 500 issues and 500 PRs updated in the last 24 hours, including 51 closed issues and 186 merged/closed PRs. Two new releases (v2026.6.34 and v2026.6.33) shipped this week, both focused on hardening network, browser, and secret boundaries. The project continues to face persistent stability challenges around memory leaks, session-state corruption, and message delivery failures, with several P0 crash-loop issues still open. Maintainer presence is strong, as evidenced by multiple large refactors and infrastructure PRs from core team members (steipete) moving through the pipeline. The highest-engagement issue (#116277, DeepSeek v4 Flash silent reply failure) has accumulated 179 comments, indicating significant community impact.

## Releases

### v2026.6.34
- **Safer browser and network boundaries:** sandboxed browser routes, trusted DNS targets, custom browser origins, and loopback provider endpoints now reject unsafe access paths
- Contributors: @eleqtrizit, @brunowowk, @mosidevv, @pgondhi987

### v2026.6.33
- **Safer network and secret boundaries:** provider streams, Discord REST responses, browser fetches, OAuth paths, and logs now cap hostile response sizes and keep Telegram credentials out of diagnostics
- Contributors: @wangmiao0668000666, @Alix-007

No breaking changes or migration notes were included in either release.

## Project Progress

Merged/closed PRs today span several key areas:

- **Legacy migration consolidation:** [PR #120716](https://github.com/openclaw/openclaw/pull/120716) (closed) refactors Doctor to use a single code path for legacy-state migrations, eliminating parallel mechanisms for the same job across channel plugins.
- **Telegram polling fix:** [PR #120800](https://github.com/openclaw/openclaw/pull/120800) (closed) acquires the polling queue before starting the background worker, preventing orphaned HTTP listeners when queue initialization fails.
- **Google Chat UTF-8 hardening:** [PR #120239](https://github.com/openclaw/openclaw/pull/120239) (merged) rejects invalid UTF-8 in API JSON responses, preventing corrupted `name` identifiers from being used in later calls.
- **Google video JSON validation:** [PR #115465](https://github.com/openclaw/openclaw/pull/115465) (closed) rejects malformed video operation JSON to prevent raw parser error leaks.
- **Cron edit validation:** [PR #119879](https://github.com/openclaw/openclaw/pull/119879) (closed) rejects blank `--agent`/`--session-key` flags on cron edit.
- **CI watchdog extension:** [PR #120700](https://github.com/openclaw/openclaw/pull/120700) (closed) extends test watchdog timeouts for cold migration proofs on fork runners.
- **Test gating:** [PR #120798](https://github.com/openclaw/openclaw/pull/120798) (closed) gates the long-context live shard by opt-in to fix release profile reports.
- **Embedded-run session ownership:** [PR #120227](https://github.com/openclaw/openclaw/pull/120227) (closed) scopes session ownership by derived agent ID, fixing plugins calling `runEmbeddedAgent()` without an explicit agent ID.

## Community Hot Topics

- **[#116277 — DeepSeek v4 Flash silent reply failure (179 comments)](https://github.com/openclaw/openclaw/issues/116277)** — The single most active issue, reporting that the model silently fails to generate replies on Telegram group messages and posts a generic fallback. The massive comment count suggests either widespread impact or a long debugging thread.

- **[#7707 — Memory Trust Tagging by Source (31 comments)](https://github.com/openclaw/openclaw/issues/7707)** — Feature request to tag memory entries by trust level to prevent memory-poisoning attacks from untrusted content. Needs maintainer review, product decision, and security review.

- **[#44925 — Subagent completion silently lost (24 comments)](https://github.com/openclaw/openclaw/issues/44925)** — P1 bug where subagent orchestration loses results through multiple failure modes with no retry or notification.

- **[#91588 — Gateway Memory Leak / OOM crashes (22 comments)](https://github.com/openclaw/openclaw/issues/91588)** — P0 critical: RSS grows from 350MB to 15.5GB over 2-3 days, causing repeated OOM crashes and restart cycles.

- **[#80319 — QA tool-defaults suite conflates Codex-native tools (17 comments)](https://github.com/openclaw/openclaw/issues/80319)** — Community discussion clarifying a QA harness issue versus a real broad Codex runtime tool dropout.

The clustering around silent failures (DeepSeek replies, subagent completions, WhatsApp deliveries) points to a systemic concern with **observability of agent work** — users repeatedly cannot tell whether agents are working, stuck, or failed.

## Bugs & Stability

### P0 / Critical

- **[#91588 — Gateway Memory Leak (350MB→15.5GB, OOM crashes)](https://github.com/openclaw/openclaw/issues/91588)** — P0, 22 comments. RSS grows over days causing OOM kills and launchd-handoff restart cycles. No linked fix PR.

- **[#108435 — Gateway fails to start after update to 2026.7.1](https://github.com/openclaw/openclaw/issues/108435)** — P0 regression, 13 comments, 3 reactions. Affects systemd, ollama, and manual launches with "gateway did not start on 127.0..." error. No linked fix.

- **[#112395 — Startup migration preflight blocks gateway after 6.11→7.1 upgrade](https://github.com/openclaw/openclaw/issues/112395)** — P0 regression, 6 comments. State database appears healthy but empty; migration tables and leases are empty. No linked fix PR.

### P1 / High

- **[#44925 — Subagent completion silently lost](https://github.com/openclaw/openclaw/issues/44925)** — P1, 24 comments, 2 reactions. Multiple failure modes where results never reach the user. No linked fix.

- **[#96834 — WhatsApp inbound image wedges lane ~3min](https://github.com/openclaw/openclaw/issues/96834)** — P1, 14 comments. Native multimodal image injection wedges the message lane. No linked fix.

- **[#38327 — "Cannot convert undefined or null to object" with google-vertex/gemini-3.1-pro-preview](https://github.com/openclaw/openclaw/issues/38327)** — P1 regression, 13 comments, 3 reactions. Affects embedded agent on 2026.3.2. No linked fix.

- **[#74586 — AM embedded run aborts memory_search tool calls](https://github.com/openclaw/openclaw/issues/74586)** — P1, 13 comments. Classifies as timeout despite model completion. No linked fix.

- **[#86215 — Codex OAuth refresh failures wedge agents for hours](https://github.com/openclaw/openclaw/issues/86215)** — P1, 11 comments. No aggressive profile rotation or clear alerting. No linked fix.

- **[#106231 — Loop detection blocks exec but doesn't terminate stuck runs](https://github.com/openclaw/openclaw/issues/106231)** — P1, 10 comments. Agents burn resources for hours after loop detection. Has a linked open PR.

- **[#83959 — Codex app-server startup retries exhaust before replacement ready](https://github.com/openclaw/openclaw/issues/83959)** — P1, 10 comments. Has a linked open PR.

- **[#114020 — Feishu/Telegram dispatch fails after 2026.7.2-beta.4](https://github.com/openclaw/openclaw/issues/114020)** — P1, 6 comments. runChannelInboundEvent requires runDispatchLifecycle; all Feishu channels fail.

### Fix PRs in Flight

- **[PR #120443](https://github.com/openclaw/openclaw/pull/120443)** — Fixes Codex compaction ownership no-op (issues #119977, #119971), open.
- **[PR #120589](https://github.com/openclaw/openclaw/pull/120589)** — Backfills tool args when provider skips `input_json_delta` (fixes #120306), open.
- **[PR #119520](https://github.com/openclaw/openclaw/pull/119520)** — Removes deleted cron job sessions (closes #46369), open.

## Feature Requests & Roadmap Signals

Highly-active feature requests that may land in upcoming releases:

- **[#7707 — Memory Trust Tagging by Source](https://github.com/openclaw/openclaw/issues/7707)** — Security-driven memory provenance; tagged as needing product decision and security review. The security angle (memory poisoning) may escalate priority.

- **[#90916 — Topic-session families](https://github.com/openclaw/openclaw/issues/90916)** — One assistant across multiple named context lanes with isolated transcript context and shared family-level memory. This aligns with the project's runner/lane roadmap signals.

- **[#10687 — Fully dynamic model discovery (OpenRouter + beyond)](https://github.com/openclaw/openclaw/issues/10687)** — Static model catalogs are inadequate for fast-moving providers. High-value for users of OpenRouter and niche providers.

- **[#13219 — Per-model usage logging for cost tracking](https://github.com/openclaw/openclaw/issues/13219)** — Users want native cost tracking without parsing session JSONL. Simple to implement and highly requested.

- **[#49740 — Cron job auto-retry on failure](https://github.com/openclaw/openclaw/issues/49740)** — Failed cron jobs wait until next scheduled run; users want `--retry-count` and `--retry-delay`. Aligns with cron reliability work already in progress.

- **[#81061 — before_route_inbound_message hook](https://github.com/openclaw/openclaw/issues/81061)** — Pre-routing interception for channel bridging/proxying. Architectural hook that would unlock new plugin capabilities.

The runner/lanes roadmap (visible in [PR #120768](https://github.com/openclaw/openclaw/pull/120768) and [PR #120804](https://github.com/openclaw/openclaw/pull/120804)) suggests the project is actively building a unified placement/pairing system for cloud workers, desktop observers, and device pairing.

## User Feedback Summary

**Recurring pain point: silent failures.** Users frequently report that OpenClaw fails without any visible error, notification, or retry — the DeepSeek reply issue, subagent completions, WhatsApp deliveries, Slack thread replies, and cron failures all share this pattern. The crash-loop issues (#91588, #108435, #112395) indicate upgrade and long-run stability is a barrier to trust.

**Performance regressions:** Feishu streaming became nearly unusable after v2026.7.1 ([#108265](https://github.com/openclaw/openclaw/issues/108265)) with characters dribbling out slowly. Per-request auth (5.5s) and tool bundling (8.9s) dominate gateway TTFT ([#80131](https://github.com/openclaw/openclaw/issues/80131)), with 3 reactions suggesting broad interest. Gateway heap grows even at idle on macOS ([#87109](https://github.com/openclaw/openclaw/issues/87109)), causing silent cron failures under memory pressure.

**Positive signals:** Contributors acknowledge community-identified issues in PR descriptions (e.g., "Review feedback addressed" in #119879), and the project is shipping regular releases (two this week) with hardening fixes. The one-paste device pairing ([PR #120768](https://github.com/openclaw/openclaw/pull/120768)) and live Desktop observer for cloud workers ([PR #120727](https://github.com/openclaw/openclaw/pull/120727)) are ambitious features that could meaningfully improve UX.

## Backlog Watch

**Issues needing maintainer attention (no fix PR, active, high-severity):**

- **[#91588 — Gateway Memory Leak (P0)](https://github.com/openclaw/openclaw/issues/91588)** — Open since June 9, 22 comments, no linked fix. Critical resource issue with broad impact.

- **[#108435 — Gateway fails to start on 2026.7.1 (P0)](https://github.com/openclaw/openclaw/issues/108435)** — Open since July 15, 13 comments, 3 reactions. Upgrade-blocking regression with no fix path yet.

- **[#112395 — Migration preflight blocks 6.11→7.1 upgrade (P0)](https://github.com/openclaw/openclaw/issues/112395)** — Open since July 21, 6 comments. Upgrade-blocking regression.

- **[#86215 — Codex OAuth refresh wedges agents for hours (P1)](https://github.com/openclaw/openclaw/issues/86215)** — Open since May 24, 11 comments. Requires product decision on rotation strategy.

- **[#38327 — Gemini 3.1 pro preview crash (P1)](https://github.com/openclaw/openclaw/issues/38327)** — Open since March 6, 13 comments. Long-standing regression for a popular provider model.

**PRs awaiting maintainer action:**

- **[#120443 — Codex compaction fix](https://github.com/openclaw/openclaw/pull/120443)** — Open 1 day, P1, needs proof. Fixes dropped-turn symptoms; high priority given the number of Codex-related session issues.

- **[#119520 — Cron deleted job sessions cleanup](https://github.com/openclaw/openclaw/pull/119520)** — Open 4 days, P1, needs proof. Addresses session-management surface clutter (closes #46369).

- **[#97175 — Background maintenance blocking messages](https://github.com/openclaw/openclaw/pull/97175)** — Open since June 27, stale. Large P1 fix that has been awaiting proof for over a month; risk of merge conflicts growing.

---

## Cross-Ecosystem Comparison

# Cross-Project Ecosystem Report — 2026-08-09

## 1. Ecosystem Overview

The personal AI assistant and agent open-source landscape is maturing rapidly, with multiple projects shipping frequent releases while grappling with shared stability challenges. The ecosystem clusters around two architectural approaches: channel-first gateways (OpenClaw, ZeroClaw, NanoClaw) that prioritize multi-platform messaging integration, and framework-first runtimes (LobsterAI, CoPaw) that emphasize developer extensibility through MCP and provider support. A persistent cross-cutting theme is **observability of agent work** — users across nearly every project report silent failures where agents appear stuck or fail without notification. Security hardening is also a dominant concern, with several projects shipping dedicated releases focused on network, secret, and memory boundary enforcement. The ecosystem shows healthy contributor pipelines, but maintainer review bandwidth is emerging as a bottleneck across mid-sized projects.

## 2. Activity Comparison

| Project | Issues Updated (24h) | PRs Updated (24h) | Releases | Health Score | Notes |
|---|---|---|---|---|---|
| **OpenClaw** | 500 | 500 | 2 (v2026.6.34, v2026.6.33) | 7/10 | High velocity but P0 memory leak and startup regressions unresolved |
| **ZeroClaw** | 50 | 50 | 0 | 6/10 | Intense but 96% of items still open; security-critical bugs being triaged |
| **IronClaw** | 30 | 50 | 0 | 8/10 | Strong delivery: 24 issues closed, 32 PRs merged; Reborn migration progressing |
| **CoPaw** | 19 | 50 | 0 | 6/10 | 47 open PRs vs 3 merged — review bottleneck; beta-line bugs accumulating |
| **NanoClaw** | 8 | 6 | 0 | 7/10 | Steady sustainment; attachment bug and MCP expansion in flight |
| **NanoBot** | 5 | 9 | 0 | 7/10 | Responsive maintainers; 4 PRs merged; token transparency being addressed |
| **PicoClaw** | 3 | 4 | 0 | 6/10 | Stale PRs (6+ weeks) awaiting batch merge; WhatsApp channel dead |
| **Moltis** | 2 | 1 | 0 | 6/10 | Low throughput; Docker sandbox fix shipped, Apple Container bug new |
| **LobsterAI** | 1 | 3 | 0 | 4/10 | Maintainer bandwidth constrained; items stale 4+ months |
| **EasyClaw** | 0 | 3 | 5 (v1.8.88–v1.8.92) | 8/10 | Clean tracker, rapid release cadence, vendor-runtime focus |
| **NullClaw** | 0 | 0 | 0 | — | No activity |
| **TinyClaw** | 0 | 0 | 0 | — | No activity |
| **ZeptoClaw** | 0 | 0 | 0 | — | No activity |

## 3. OpenClaw's Position

OpenClaw is the clear ecosystem reference implementation. Its scale dwarfs peers: 500 issues and 500 PRs updated daily versus 5–50 for competitors. It ships releases weekly (two this week) with hardening-focused change sets. The project maintains strong maintainer presence with large refactors and infrastructure PRs from core team members moving through the pipeline. Its **channel breadth** (Telegram, Discord, WhatsApp, Feishu, Slack, Google Chat, Matrix) is the widest in the ecosystem. However, the community is experiencing real pain: a P0 gateway memory leak (350MB→15.5GB), startup regressions after updates, and a 179-comment thread on DeepSeek silent failures indicate that scale brings complexity and stability debt. The runner/lanes roadmap (device pairing, cloud worker observers) positions OpenClaw as the most ambitious in infrastructure terms, but the **unresolved P0 crash-loops are eroding user trust** and represent an opening for more stable alternatives.

## 4. Shared Technical Focus Areas

**Silent failure observability** (OpenClaw, ZeroClaw, NanoClaw, CoPaw): Users across four projects report agents failing without errors, notifications, or retries. Specific manifestations: DeepSeek silent reply failures (#116277), subagent completions lost (#44925), cron jobs discarding output (#9340), MCP connection failures crashing gateways (#5300), WhatsApp deliveries going dark. **The ecosystem lacks a standard for agent-work telemetry.**

**MCP reliability and expansion** (NanoBot, NanoClaw, PicoClaw, CoPaw): Remote HTTP/SSE MCP support, OAuth web-flow authorization for commercial MCP servers, and resilience against single-connection failures are active across four projects. NanoClaw merged remote MCP support today; NanoBot and PicoClaw are requesting OAuth flows for MCP.

**Token/cost transparency** (NanoBot, OpenClaw, IronClaw): Users demand per-call token accounting to identify waste. NanoBot merged per-iteration token logging; OpenClaw has a long-standing per-model usage logging request (#13219); IronClaw has a token accounting bug (#6989) where input tokens are estimated from reference string length.

**Channel attachment handling** (NanoClaw, PicoClaw, OpenClaw): Silent attachment loss on Google Chat, Signal, and WhatsApp are being reported independently. NanoClaw has two channels with broken attachment paths; PicoClaw's WhatsApp channel is permanently dead.

**Memory/context lifecycle** (OpenClaw, NanoClaw, CoPaw): Memory trust tagging to prevent poisoning (#7707), context-isolated session families (#90916), and memory-eviction workflow issues (#6811) all point to the need for more structured memory management beyond simple transcript persistence.

**Docker/container sandboxing** (Moltis, CoPaw, NanoClaw, OpenClaw): Docker plugin/marketplace outages (CoPaw), database lock contention on VirtioFS (NanoClaw), sandbox filesystem host-mount failures (Moltis), and Docker Compose deployment friction (ZeroClaw) indicate containerized deployment is a systemic weak point.

## 5. Differentiation Analysis

| Project | Primary Focus | Target User | Architecture Approach |
|---|---|---|---|
| **OpenClaw** | Channel gateway + agent runtime | Power users, self-hosters | Node.js, plugin-based, massive channel matrix, runner/lanes infrastructure |
| **ZeroClaw** | Security-hardened agent runtime | Enterprise, security-conscious | Rust, RSN-style RFC processes, workspace-internal path controls, egress policy (ADR-013) |
| **IronClaw** | Reborn migration, identity security | Existing user base, multi-user teams | Python, "run acts as its invoker" identity model, skills activated by model (not keyword scorer) |
| **CoPaw** | Developer SDK + desktop app | AI application developers | Python (agentscope), Tauri desktop client, MCP-centric, providers as first-class |
| **NanoBot** | Lightweight personal assistant | Individual users, MCP consumers | Small footprint, per-iteration token diagnostics, WebUI |
| **NanoClaw** | Channel-first personal assistant | Individual users | TypeScript, ChannelAdapter v2 architecture, `/add-<service>` skill pattern |
| **PicoClaw** | Multi-protocol bridge | IRC/DeltaChat/Simplex users | Protocol breadth focus, smaller scale |
| **EasyClaw** | Desktop-packaged OpenClaw | Chinese-market desktop users (Weixin/Feishu) | Bundled vendor runtime, rapid patch releases |
| **LobsterAI** | OpenAI-compatible framework | Developers seeking LiteLLM-style gateway | Chinese documentation, sql.js storage, slow maintenance |

The key architectural fork: **Node.js vs Python vs Rust**. OpenClaw and NanoClaw choose TypeScript/Node for plugin ecosystem richness; CoPaw and LobsterAI use Python for AI-SDK integration depth; ZeroClaw uses Rust for safety guarantees (e.g., hardware crate consolidation, leak detector heuristics).

## 6. Community Momentum & Maturity

**Tier 1 — High-velocity, shipping regularly:**
- **OpenClaw**: Two releases per week, 186 PRs merged daily, but stability debt accumulating (P0s open for 2+ months).
- **IronClaw**: 32 PRs merged, 24 issues closed in one day; strongest delivery-to-backlog ratio. Reborn migration is concluding with parity achieved.
- **EasyClaw**: Five releases in one day; clean tracker; effectively a well-oiled vendor-runtime distribution pipeline.

**Tier 2 — Rapidly iterating with review bottlenecks:**
- **ZeroClaw**: Feature-building and security-hardening phase, but 96% of PRs pending; large stacked PR sets (Anthropic fallback stack, infrastructure refactors).
- **CoPaw**: 47 open PRs vs 3 merged — external contributors outpacing maintainer bandwidth. Beta-line (2.1.0) is generating a steady stream of bug reports.
- **NanoClaw**: Steady merges (remote MCP, Strava) but attachment-handling systemic issues and config drift indicate post-refactor fragility.

**Tier 3 — Sustaining / maintenance-focused:**
- **NanoBot**: Small but responsive; token transparency work landing; MCP OAuth demand building.
- **PicoClaw**: Stale protocol PRs (6+ weeks) and a dead WhatsApp channel; backlog clearance needed.
- **Moltis**: Low throughput; one bug fixed, one new bug filed. Healthy but quiet.

**Tier 4 — Stalling:**
- **LobsterAI**: Four-month-old PRs and issues unaddressed; maintainer bandwidth evidently constrained.

**Inactive:** NullClaw, TinyClaw, ZeptoClaw — no activity in 24h.

## 7. Trend Signals

**1. Observability is the dominant unmet need.** Across OpenClaw (silent failures), ZeroClaw (cron jobs discarding output), NanoClaw (silent attachment loss), and CoPaw (MCP failures blocking conversations), users consistently cannot determine whether an agent is working, stuck, or failed. Any project that ships first-class agent-work telemetry (status indication, failure notifications, retry semantics) will differentiate strongly.

**2. MCP is becoming the universal integration standard.** Four projects are simultaneously extending MCP support: remote HTTP/SSE servers, OAuth web flows, connection failure isolation, and budget-aware schemas. The winners will treat MCP resilience (reconnect, error propagation, per-server isolation) as a first-class concern.

**3. Token cost visibility is a purchasing criterion.** Users are reporting "million token burns" and demanding per-call accounting. Projects that ship native cost tracking (not JSONL parsing) will retain cost-conscious users.

**4. Security hardening is moving from access control to data provenance.** OpenClaw's memory trust tagging (#7707), ZeroClaw's leak-detector false positives and `forbidden_paths` dead code, and IronClaw's "run acts as its invoker" identity model all point to the next security frontier: where did agent data come from, and who is authorized to see it.

**5. Containerized deployment reliability is a systemic gap.** Docker-specific bugs appear across five projects in this single digest period (plugin marketplaces down, DB lock contention, sandbox path failures, entrypoint permission errors, loopback binding). Agent users increasingly expect `docker compose up` to "just work."

**6. The ecosystem is bifurcating between an all-in-one approach (OpenClaw) and composable specialists (NanoClaw, PicoClaw, NanoBot).** The OpenClaw heavyweight model delivers breadth at the cost of stability; specialist tools are smaller but risk fragmentation. A middle path — stable core + pluggable channels — appears to be the most demanded architecture.

**7. Desktop and Chinese-market needs are underserved in Western-centric projects.** EasyClaw's rapid release cycle (5 versions/day) targeting Weixin/Feishu and CoPaw's Tauri desktop client suggest significant demand for local-first, non-Slack/Telegram integrations and packaged desktop experiences.

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot Project Digest – 2026-08-09

## 1. Today's Overview

NanoBot is showing active development with 5 issues and 9 pull requests updated in the last 24 hours. All 5 issues remain open, with no issues closed during this period. The PR pipeline is healthy: 4 PRs were merged/closed (addressing token diagnostics, code cleanup, and a WebUI bug fix), while 5 are still in review, including two flagged as P0/P2 priorities with merge conflicts. No new releases were published. The community is highly engaged around token consumption transparency and MCP (Model Context Protocol) reliability, with two dedicated PRs already landing to address token logging concerns.

## 2. Releases

No new releases were published in the last 24 hours.

## 3. Project Progress

Four pull requests were merged or closed:

- **[PR #5293 – feat(usage): log per-iteration token diagnostics](https://github.com/HKUDS/nanobot/pull/5293)** (closed) — Adds per-iteration token usage logging, directly addressing issue #5266. This provides granular visibility into which agent executions burn excessive tokens, complementing the existing daily aggregated statistics.
- **[PR #5296 – refactor: remove verified dead code](https://github.com/HKUDS/nanobot/pull/5296)** (closed) — Removes 19 repository-internal dead-code units, 11 production-unreachable test seams, and orphaned frontend assets while preserving six API-sensitive units for explicit compatibility decisions.
- **[PR #5294 – fix(webui): prevent image hover clipping](https://github.com/HKUDS/nanobot/pull/5294)** (closed) — Removes hover scaling and ring from assistant image previews that caused container clipping, while retaining zoom cursor, static border, and keyboard focus behavior, with regression tests added.
- **[PR #5252 – feat(webui): add temporary chat mode](https://github.com/HKUDS/nanobot/pull/5252)** (merged/closed) — Adds non-persistent temporary chat mode created lazily after the first message, supporting multiple concurrent temporary chats without session/history files.

## 4. Community Hot Topics

- **[Issue #5266 – Logs about token consumption](https://github.com/HKUDS/nanobot/issues/5266)** — 13 comments, the most active discussion. User reports million-token burns within 2 hours without noticeable activity. This triggered two follow-up PRs (#5293 and #5299), showing maintainers are responsive to community concerns.
- **[Issue #5297 – MCP OAuth web authorization support](https://github.com/HKUDS/nanobot/issues/5297)** — Request for OAuth web-flow authorization for MCP servers like XMind, including gateway-based remote auth. Reflects growing demand for connecting to commercial MCP services that require browser-based login.
- **[Issue #5300 – MCP connection failure isolation + cancel scope crash](https://github.com/HKUDS/nanobot/issues/5300)** — Reports a critical cross-task crash when a remote MCP returns HTTP 530 (Cloudflare error), causing gateway process death, task leaks, and extreme CPU usage.
- **[PR #4276 – Model-agnostic computer use tools](https://github.com/HKUDS/nanobot/pull/4276)** — Long-running PR (since June) adding computer_use and browser tools, still open. High community interest in expanding beyond text-based tool calling.

## 5. Bugs & Stability

Ranked by severity:

1. **[Critical – Issue #5300: MCP cancel scope cross-task crash](https://github.com/HKUDS/nanobot/issues/5300)** — When a remote MCP fails (HTTP 530), the anyio cancel scope raises a RuntimeError across tasks, crashing the gateway process, leaking tasks, and spiking CPU. No fix PR exists yet; this is a stability-critical bug affecting MCP reliability.
2. **[High – Issue #5295: Docker Compose deployment failure](https://github.com/HKUDS/nanobot/issues/5295)** — `entrypoint.sh: Permission denied` when deploying via docker compose per deployment docs. Gateway exits with code 2. Deployment is blocked for affected users.
3. **[Medium – PR #5271: Session stale background task overwrite](https://github.com/HKUDS/nanobot/pull/5271)** (open, P0, conflict) — Background tasks can overwrite session data after user runs `/new`, due to stale Session references across await points. Fix proposed but currently has merge conflicts needing resolution.
4. **[Medium – PR #5206: Duplicate streamed response logging](https://github.com/HKUDS/nanobot/pull/5206)** (open, P2, conflict) — Streamed responses logged twice, producing duplicate "Response to" lines. Fix ready but blocked by merge conflicts.
5. **[Low – PR #5294: Image hover clipping](https://github.com/HKUDS/nanobot/pull/5294)** — Fixed and merged; assistant image previews no longer hide image edges on hover.

## 6. Feature Requests & Roadmap Signals

- **Token transparency (Issue #5266)** — The top request this period. The community wants per-call token breakdowns to identify waste. PR #5293 (merged) and PR #5299 (open, showing recent token usage in WebUI) indicate this will land in the next release.
- **MCP OAuth web authorization (Issue #5297)** — Multiple users need browser-based OAuth for commercial MCP servers. This is a plausible near-term feature given MCP is a core component.
- **Budget model-visible MCP schemas (Issue #5298)** — Proposal to reduce context cost when many MCP tools are registered. Touches core architecture (`ToolRegistry`, `AgentRunner`); likely requires design discussion before implementation.
- **Temporary chat mode (PR #5252)** — Merged; non-persistent conversations will appear in the next release.
- **Model-agnostic computer use (PR #4276)** — Still open since June; if merged, would enable screenshot/mouse/keyboard and browser DOM automation for any tool-calling model.

## 7. User Feedback Summary

- **Token cost visibility is the dominant pain point.** Users report "million" token consumption in hours with no visible activity; they explicitly request call-level logging to trace waste. The project responded quickly with two PRs, but the underlying issue of excessive token burn remains unaddressed.
- **MCP remote connectivity is fragile.** Users hit Cloudflare 530 errors causing full gateway crashes (Issue #5300) and cannot configure OAuth-protected MCP servers (Issue #5297). Chinese-language requests suggest an international user base.
- **Docker deployment friction.** A user following official deployment docs hit a permission error that prevented the gateway from starting — a straightforward onboarding regression.
- **Positive signal:** One community member (chengyongru) contributed three merged/closed PRs in a day (dead code removal, WebUI token usage view, image hover fix), indicating a healthy contributor ecosystem.

## 8. Backlog Watch

- **[PR #4276 – computer_use + browser tools](https://github.com/HKUDS/nanobot/pull/4276)** — Open since 2026-06-10 (~2 months). Large feature with broad scope; needs maintainer review or explicit deferral decision.
- **[PR #5271 – session stale save prevention](https://github.com/HKUDS/nanobot/pull/5271)** — P0 priority with merge conflicts; prolonging this risks data corruption when users start new sessions mid-generation.
- **[PR #5206 – duplicate streamed response logging](https://github.com/HKUDS/nanobot/pull/5206)** — Open since 2026-08-01 with conflicts; fix for a visible log hygiene issue.
- **[Issue #5266 – token consumption logging](https://github.com/HKUDS/nanobot/issues/5266)** — While fix PRs exist, the core issue remains open; maintainers should confirm a final resolution path once #5299 lands.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

## 1. Today's Overview

ZeroClaw shows intense development activity with 50 issues and 50 PRs updated in the last 24 hours, though the backlog is substantial: 48 of 50 issues remain open and 48 of 50 PRs are still pending. The project is in a sustained feature-building and security-hardening phase, with large, overlapping PR stacks (notably JordanTheJet's infrastructure refactors and IftekharUddin's channel/provider work) moving through review. A recurring theme is security-critical bugs being actively triaged, many with high-risk and priority:p1 labels, alongside RSN-style architecture RFCs consolidating crates and streamlining governance. Notably, several recently filed issues (from 2026-08-07 and 2026-08-09) show high-quality bug reports with precise code citations and reproducible scenarios, suggesting a mature contributor base. The two closed issues today are both bug reports, including one (CPU spin) closed pending reproduction and another (aardvark-sys RFC) retired, indicating maintainers are actively processing incoming work.

## 2. Releases

No new releases were published in the last 24 hours.

## 3. Project Progress

Two PRs were closed/merged today:

- **[PR #9494](https://github.com/zeroclaw-labs/zeroclaw/pull/9494) — fix(sop): drive cron-started headless runs** (closed): This large PR (size:XL) addresses the critical bug where cron-triggered SOP runs stranded at step 1, holding concurrency slots forever. It routes cron-started runs through the shared headless run driver. Its canonical continuation, **[PR #9841](https://github.com/zeroclaw-labs/zeroclaw/pull/9841)**, now carries the fixes for the four blocking review findings plus an additional defect, rebased onto current master.

- **[PR #9798](https://github.com/zeroclaw-labs/zeroclaw/pull/9798) — docs(sop): document which agent executes SOP steps** (closed): This docs-only patch was explicitly **superseded by #9841**, as it captured temporary behavior that the runtime fix removes.

The primary feature advancement is the SOP headless execution fix progressing through review and being superseded by a more complete continuation branch.

## 4. Community Hot Topics

The most active discussions center on architecture and security, with an engaged core of repeat contributors:

- **[Issue #8043](https://github.com/zeroclaw-labs/zeroclaw/issues/8043) — RFC: Retire the standalone aardvark-sys crate** (11 comments, closed): The RFC process concluded, and the implementation PR [#9853](https://github.com/zeroclaw-labs/zeroclaw/pull/9853) is now open, removing `aardvark-sys` and `zeroclaw-robot-kit`. The community is consolidating hardware support.

- **[Issue #8424](https://github.com/zeroclaw-labs/zeroclaw/issues/8424) — RFC: Workspace-relative forbidden path patterns and optional .zeroclawignore** (11 comments): This RFC tackles a core security gap — protecting workspace-internal files like `.env` and `config.yaml` from AI agent access. It has become more urgent given the related unreachable `forbidden_paths` bug (#9815).

- **[Issue #8054](https://github.com/zeroclaw-labs/zeroclaw/issues/8054) — System prompt tool-availability mismatch across all entry points** (10 comments): A high-risk follow-up bug to a prior fix (#7756/#8053), highlighting that the "no tools available" system prompt problem extends beyond the direct runtime path to channels, gateway, WebSocket, multimodal, and /think entry points.

- **[Issue #8550](https://github.com/zeroclaw-labs/zeroclaw/issues/8550) — OpenAI-compatible chat completions endpoint** (6 comments): The community is requesting standard API compatibility so tools like Open WebUI and LobeChat can connect without custom protocol work.

Underlying needs: hardware crate consolidation, stronger workspace-internal security controls, consistent tool-availability signaling, and standard API interoperability.

## 5. Bugs & Stability

New bugs filed today (2026-08-09) and recent high-priority findings:

| Issue | Component | Severity | Summary |
|---|---|---|---|
| [#9855](https://github.com/zeroclaw-labs/zeroclaw/issues/9855) | Matrix channel | **S0** | Fails to resolve homeserver via `.well-known/matrix/client` delegation, bypassing standard discovery |
| [#9825](https://github.com/zeroclaw-labs/zeroclaw/issues/9825) | Leak detector | P1/High | High-entropy heuristic redacts public blockchain addresses, making payment-request URLs undeliverable |
| [#9815](https://github.com/zeroclaw-labs/zeroclaw/issues/9815) | forbidden_paths | P1/High | `forbidden_paths` is unreachable for any path under `allowed_roots` or the workspace — security control is dead code |
| [#9816](https://github.com/zeroclaw-labs/zeroclaw/issues/9816) | Anthropic provider | P1/High | All usage records report `cost_usd: 0.0`; daily/monthly budget caps can never fire |
| [#9805](https://github.com/zeroclaw-labs/zeroclaw/issues/9805) | SOP/cron | P1/High | Auto-mode SOP runs from channel/cron triggers never execute and rot as 'running' forever |
| [#9390](https://github.com/zeroclaw-labs/zeroclaw/issues/9390) | Emergency stop | P1/High | Emergency stop is a CLI-only state file that no runtime path reads |
| [#9387](https://github.com/zeroclaw-labs/zeroclaw/issues/9387) | Channel approvals | P1/High | Interactive approval responses accepted from _any_ chat member on Telegram, Slack, Lark, Matrix |
| [#9340](https://github.com/zeroclaw-labs/zeroclaw/issues/9340) | CLI cron | P1/High | CLI-created cron jobs hardcode `delivery.mode = "none"`, silently discarding all output |
| [#8731](https://github.com/zeroclaw-labs/zeroclaw/issues/8731) | MCP stdio | P1/High | Stdio MCP servers accumulate as zombie processes under active daemon PIDs |

**Fix PRs exist:** PR #9841 fixes the SOP/cron issue (#9805); PR #9853 addresses the crate consolidation; no fix PRs are yet open for the security-critical issues #9855, #9825, #9815, #9816, or #9387. The Matrix S0 issue (filed today) has no fix yet and is the most urgent open item.

## 6. Feature Requests & Roadmap Signals

Signals from today's activity point to several near-term features:

- **Workspace-internal security** ([#8424](https://github.com/zeroclaw-labs/zeroclaw/issues/8424)): A `.zeroclawignore` mechanism is likely imminent, especially given the dead `forbidden_paths` bug (#9815).
- **OpenAI-compatible endpoint** ([#8550](https://github.com/zeroclaw-labs/zeroclaw/issues/8550)): Standard API compatibility is in demand for ecosystem tooling.
- **Simplified web tools** ([#9824](https://github.com/zeroclaw-labs/zeroclaw/issues/9824)): A proposal to consolidate five overlapping web tools into three verbs (`web_fetch`, `web_research`, `http_request`), moving browser automation to opt-in.
- **Telegram multi-message mode** ([#8445](https://github.com/zeroclaw-labs/zeroclaw/issues/8445)) and **per-user session toggle** ([PR #9772](https://github.com/zeroclaw-labs/zeroclaw/pull/9772)): Channel UX improvements are progressing.
- **Config authoring for agents** ([PR #9828](https://github.com/zeroclaw-labs/zeroclaw/pull/9828)): An operator-approved policy-preview path for agents to author config, replacing raw shell `echo > config.toml` hacks.

The **Anthropic server-side fallback stack** (PRs #9265, #9266, #9268, #9272) is a large, stacked feature set that would allow Anthropic to serve declined turns with a fallback model inside a single API call, with notices surfaced across channels and web chat.

## 7. User Feedback Summary

User-reported pain points cluster around security false positives, workflow-blocking behavior, and silent failures:

- **Leak detector false positives**: Multiple users ([#9486](https://github.com/zeroclaw-labs/zeroclaw/issues/9486), [#9825](https://github.com/zeroclaw-labs/zeroclaw/issues/9825)) report the high-entropy detector redacting legitimate public blockchain addresses, making payment flows impossible. The `high_entropy_tokens=false` setting does not disable it on channel paths, and one report is in Russian, showing international usage.
- **Workflow blocking**: Exiting the web dashboard chat window interrupts running agent loops ([#8559](https://github.com/zeroclaw-labs/zeroclaw/issues/8559)), and Telegram typing indicators run indefinitely during approval waits, masking blocked turns as active work ([#9656](https://github.com/zeroclaw-labs/zeroclaw/issues/9656)).
- **Silent data loss**: CLI cron jobs discard all output without any error surface ([#9340](https://github.com/zeroclaw-labs/zeroclaw/issues/9340)).
- **Deployment friction**: Docker Compose gateway can remain loopback-bound behind a published port ([#9035](https://github.com/zeroclaw-labs/zeroclaw/issues/9035)), and the desktop command uses a dead download URL with no AppImage detection ([#9202](https://github.com/zeroclaw-labs/zeroclaw/issues/9202)).
- **Security audit quality**: Two issues ([#9390](https://github.com/zeroclaw-labs/zeroclaw/issues/9390), [#9387](https://github.com/zeroclaw-labs/zeroclaw/issues/9387)) were filed with every cited line verified against HEAD, indicating a security-conscious, rigorous user community.

Satisfaction signals are indirect: users are actively filing detailed bugs with precise citations and reproduction steps, and high-value PRs (like #9841) carry forward "distinguished contributor" labels, pointing to a healthy, committed contributor pipeline.

## 8. Backlog Watch

Issues and PRs needing attention:

- **Issue #9843** (closed, needs repro): The CPU spin bug report was **closed** despite reporting S2 degraded behavior. This may warrant a second look to ensure the underlying issue is captured for future investigation (r:needs-repro).
- **PR #9571** — chore(channels): remove the WATI channel (priority:p0, size:XL, open since 2026-07-30): A large removal PR marked p0 and `needs-author-action`. The author needs to respond to maintainer feedback to unblock a priority-zero item.
- **Issue #9496** — RFC: Streamline RFC scope, discussion, voting, and assignment (needs-maintainer-review): The RFC process itself is described as slower than the decisions it supports. This governance RFC is open and gated on maintainer review.
- **PR #9580** — refactor(infra): move network guard primitives to `zeroclaw-infra::net_guard` (size:L, `needs-author-action`): Stage 1 of plugin egress policy work (ADR-013), open since 2026-07-31; dependent work may be blocked.
- **Issue #7099** — Route `zeroclaw status` output through CLI i18n (priority:p3, in-progress since 2026-06-02): A long-running enhancement with no recent movement beyond updates.
- **PR #9785 and PR #9787** — CI credential rehearsal and AUR publish retry (both `needs-author-action`, high risk): CI reliability work that is in limbo awaiting author response.

The most important backlog item is **PR #9841**, the canonical SOP fix, as it unblocks a vulnerability-class bug holding concurrency slots forever; it must be driven to merge quickly.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw Project Digest — 2026-08-09

## Today's Overview

PicoClaw shows moderate activity with 3 issues and 4 PRs updated in the last 24 hours, though no new releases were published. The project's maintainers are actively reviewing a batch of stale-but-relevant PRs, including a large DeltaChat refactor and a Simplex channel implementation, suggesting a backlog clearance effort is underway. Two fresh PRs from contributor `grrowl` address urgent production issues: a WhatsApp client version failure and an agent-optimizer prefix-caching problem. Community feature requests continue to center on IRCv3 message handling and OAuth 2.1 support for MCP servers. Overall health appears stable, with meaningful contributor engagement but a need to merge long-pending PRs.

## Releases

No new releases were published in the last 24 hours. The most recent public version remains 0.3.1, referenced in a bug report.

## Project Progress

No PRs were merged or closed today. However, the following open PRs received updates (no explicit maintainer comments recorded):

- **#3321** — Fix (agent): Move dynamic context after history to preserve prefix caching (opened Aug 7, updated Aug 8). Aims to reduce token consumption and API cost by fixing cache invalidation ordering.
- **#3320** — Fix (deps): Bump `whatsmeow` to unblock WhatsApp "client outdated (405)" (opened Aug 7, updated Aug 8). Directly addresses a dead native WhatsApp channel.
- **#3222** — Refactor (deltachat): Cleanup implementation and documentation (−200 LOC). Removes legacy features, drops hardcoded relay lists in favor of official references, and replaces password-based auth with JSON-RPC secrets.
- **#3193** — Feature: Add Simplex channel type (new networking protocol support, opened Jun 27).

## Community Hot Topics

- **Issue #3287 — IRCv3 long message handling** (open, created Jul 22, 4 comments, [link](https://github.com/sipeed/picoclaw/issues/3287)): Users need PicoClaw to treat split IRCv3 fragments (>512 bytes) as one cohesive message. The community engagement indicates real workflow friction for heavy IRC users.
- **Issue #3302 — OAuth 2.1 support for MCP servers** (open, created Jul 30, 2 comments, [link](https://github.com/sipeed/picoclaw/issues/3302)): Follow-up to #2546; explicit "nice-to-have" roadmap priority, from a different user than the original request.
- **Issue #3292 — High CPU in chat input box (closed)** ([link](https://github.com/sipeed/picoclaw/issues/3292)): Was actively discussed before closure; appears resolved via internal fix, though the root cause and solution are not documented in the summary.

## Bugs & Stability

| Severity | Issue/PR | Description | Status |
|---|---|---|---|
| **High** | [PR #3320](https://github.com/sipeed/picoclaw/pull/3320) | WhatsApp channel permanently dead: "client outdated (405)" error triggers no reconnect | Fix PR pending review |
| **Medium** | [Issue #3292](https://github.com/sipeed/picoclaw/issues/3292) | Excessive CPU usage when input box is focused in web/Firefox UI | Closed (fix shipped) |
| **Low/Perf** | [PR #3321](https://github.com/sipeed/picoclaw/pull/3321) | Prefix-cache invalidation causes unnecessary token consumption | Fix PR pending review |

## Feature Requests & Roadmap Signals

- **OAuth 2.1 for MCP servers** ([#3302](https://github.com/sipeed/picoclaw/issues/3302)): Explicitly flagged as "Nice-to-Have / Enhancement." Expect follow-up in a minor version (0.4.x) rather than the next patch release.
- **IRCv3 long-message aggregation** ([#3287](https://github.com/sipeed/picoclaw/issues/3287)): Community consensus that split messages should be rejoined. Moderate implementation effort; plausible in the next minor release if maintainers accept the spoold-reassembly proposal.
- **Simplex channel** ([PR #3193](https://github.com/sipeed/picoclaw/pull/3193)): New protocol support ready in open PR; most likely to land alongside the DeltaChat cleanup when the maintainer batch-merges.

## User Feedback Summary

Users are relying on PicoClaw as a stable multi-protocol bridge and are sensitive to channel availability. The WhatsApp outage (405) caused a silent dead-connection state, which users flagged as unacceptable behavior — suggesting the need for more robust reconnect/error-reporting logic across all channels. The IRCv3 complaint shows users value protocol-correctness and advanced standards compliance. On the positive side, the DeltaChat refactor PR signals active codebase improvement. User sentiment is generally constructive but expectant on merge velocities for already-complete functionality.

## Backlog Watch

- **PR #3193 — Simplex channel type** (open since Jun 27, 6+ weeks stale): Fully-described new feature; lacks maintainer review comments or test feedback.
- **PR #3222 — DeltaChat cleanup/refactor** (open since Jul 3, 5+ weeks stale): Substantial improvement patch; potential merge conflicts risk increasing over time.
- **Issue #2546 (referenced by #3302) — OAuth original request**: Remains unresolved and is now driving duplicate requests; higher-level MCP ecosystem standards.

Maintainer action needed: batch-review and merge the two long-pending protocol PRs (#3193, #3222) to reduce fork divergence risk, and prioritize the two newer bug-fix PRs (#3320, #3321) for immediate stability.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw Project Digest — 2026-08-09

## Today's Overview

NanoClaw is in a sustainment phase with moderate activity: 8 issues and 6 PRs updated in the last 24 hours, with no new releases cut. Three issues were closed, including a fix for Docker session database lock contention and a Discord approval-button bug — two long-standing stability problems. Three new issues surfaced, including a serious attachment-handling defect for high-traffic channels (Google Chat) and a config drift inside a Dockerfile skill. Three PRs were merged, including remote MCP server support and a Strava integration, and two open PRs demonstrate continued momentum in channel expansion: Telegram rich rendering and Mattermost support.

## Releases

None.

## Project Progress

Three pull requests were merged or closed today:

- **[PR #2776 — `feat: support remote HTTP/SSE MCP servers`](https://github.com/nanocoai/nanoclaw/pull/2776)** — Closed. Extends `McpServerConfig` to a union type supporting both stdio and remote HTTP/SSE MCP servers, adds `McpServerRemoteConfig` with `type`, `url`, `headers`, and optional `instructions`, and updates `ncl groups config add-mcp-server` with `--type`, `--url`, and `--header` flags. This is a substantial capability expansion that unlocks third-party MCP offerings.
- **[PR #2777 — `feat: add /add-strava skill for official Strava MCP`](https://github.com/nanocoai/nanoclaw/pull/2777)** — Closed. Adds a skill that wires the official Strava MCP into agent groups via HTTP transport, including a host-side OAuth flow and auto-refreshing token module.
- **[PR #3199 — `Add Mattermost channel integration (v2 ChannelAdapter)`](https://github.com/nanocoai/nanoclaw/pull/3199)** — Closed. Fresh implementation against the current `ChannelAdapter`/`channel-registry.ts` contract, superseding an old pref-v2 PR targeting a dead architecture.

In parallel, two related PRs remain open — a refined Mattermost submission and the Telegram rich rendering feature (see below).

## Community Hot Topics

- **[Issue #3201 — Discord approval button clicks not registering](https://github.com/nanocoai/nanoclaw/issues/3201)** (2 comments, closed): Admin/owner approval cards on Discord never recorded the vote, causing every request to be rejected. This was the highest-engagement item today and has since been closed, presumably by the matching fix in PR #3185.
- **[PR #3185 — fix(discord): strip \n delimiter in webhook interaction custom_id](https://github.com/nanocoai/nanoclaw/pull/3185)** (still open): The fix for the above — the raw HTTP-interaction webhook path decodes `custom_id` incorrectly, splitting on a newline and resolving every button click to the wrong option. Demonstrates a tight issue-to-fix loop and a common failure pattern: the webhook path diverging from the gateway path.
- **[Issue #3200 — "The Cartographer" persona prompt](https://github.com/nanocoai/nanoclaw/issues/3200)** (1 comment, closed): A user submitted a fully specified cognitive-processing persona as a request to wire it into the system. It was closed, but it signals demand for first-class persona customization and structured memory/thought-management frameworks.
- **[PR #3202 — Add Mattermost channel integration](https://github.com/nanocoai/nanoclaw/pull/3202)** (0 comments, open): Supersedes/dovetails with the now-closed PR #3199. Community contributors are iterating quickly on a Mattermost channel — a clear demand signal for self-hosted/non-Slack chat support.

## Bugs & Stability

Ranked by severity:

1. **[Issue #3206 — Inbound attachments silently dropped on Google Chat](https://github.com/nanocoai/nanoclaw/issues/3206)** (high): `extractAttachmentFiles` gates staging on `isSafeAttachmentName(messageId)`, which rejects any value containing `/` or `\`. Google Chat message IDs natively contain `/`, so **every attachment from that channel is silently lost**. No fix PR exists yet; a one-line sanitization change in `src/session-manager.ts` resolves it. Pairs with the older issue #2528 (Signal attachments unreachable from the agent container) — this is the second channel where attachments are broken, so a systemic review of attachment paths is warranted.
2. **[Issue #3203 — codex provider emits an undeclared `file` ProviderEvent](https://github.com/nanocoai/nanoclaw/issues/3203)** (medium): Following `/add-codex` fails typecheck because the codex provider emits a `file` event not declared in `ProviderEvent`, and nothing consumes it — so codex-generated images are dropped even once it compiles. This blocks a user-facing feature on main and is a clear compile-contract/fidelity gap introduced by the provider refactor.
3. **[Issue #3204 — `add-opencode` skill is stale after `cli-tools.json` refactor](https://github.com/nanocoai/nanoclaw/issues/3204)** (medium): The skill still instructs editing the Dockerfile with `ARG` + `RUN pnpm install -g`, but the `cli-tools.json` refactor removed all per-CLI install blocks. The skill's own guard test asserts the old shape, so the test passes while the documented steps break the build. Indicates docs/skill drift after refactors — a test that validates the *new* shape is needed.
4. **[Issue #3177 — Docker cross-mount session database lock contention](https://github.com/nanocoai/nanoclaw/issues/3177)** (closed as fixed): SQLite DELETE journal mode on VirtioFS caused 29,000+ readonly errors and intermittent delivery failures. Closed today after a fix was merged.

## Feature Requests & Roadmap Signals

- **[Issue #3205 — Persistent group-scoped OneCLI secret assignment](https://github.com/nanocoai/nanoclaw/issues/3205)** (open, 0 comments): Flags an unresolved design fork: two contradictory directions survive for which vault secrets an agent gets at spawn, and neither is persisted per-group. This is an architectural-level feature request that needs maintainer arbitration, not another contributor patch.
- **[PR #2877 — Telegram native rich rendering via Bot API 10.1 `sendRichMessage`](https://github.com/nanocoai/nanoclaw/pull/2877)** (open): Integrates Telegram's new rich message API — a move toward modern, native rendering on Telegram. Waiting on review/merge.
- **[PR #3202 — Mattermost channel integration](https://github.com/nanocoai/nanoclaw/pull/3202)** (open): Community continues to push Mattermost support through; now on its second iteration. Given the freshness of the now-merged v2 adapter, this likely merges next.
- **Persona customization (Issue #3200)**: Though closed, the "Cartographer" persona submission points to unmet demand for structured external-memory/persona frameworks, not just prompt overrides.
- **Strava MCP (PR #2777, merged today)** and **remote HTTP/SSE MCP servers (PR #2776, merged today)** are strong signals that MCP-server support is becoming a first-class extensibility surface. Expect more `/add-<service>` skills on the roadmap.

## User Feedback Summary

- **Discord approvals are a fresh pain point**: The #3201 bug directly blocked admin workflows (config-update approvals) — a governance-critical failure. It was reported and fixed within 24h, a strong signal of maintainers' responsiveness.
- **Attachment handling is the top recurring complaint**: Two channels (Google Chat today, Signal since May) silently drop or hide attachments — users lose files without any error. This erodes trust in multi-channel support and warrants a coordinated fix.
- **Config drift from recent refactors**: The `add-opencode` issue, along with the codex provider typecheck failure, shows users are hitting breakage when following skill docs verbatim after internal refactors. The community expectation is that guard tests and skills stay in sync with the code, and today's report shows two violations.
- **Docker-on-macO/Linux remains a rough edge**: The database lock issue (closed today) was producing thousands of errors and intermittent failures — the kind of problem that undermines confidence in Docker-based installs. Its fix is a notable positive signal.

## Backlog Watch

- **[Issue #2528 — Signal attachments unreachable from agent container](https://github.com/nanocoai/nanoclaw/issues/2528)** (open since 2026-05-18, 0 comments): This is now the second channel with broken attachment handling (Google Chat surfaced today), meaning file ingestion is fragile across the board. Nearly three months without a maintainer response even as related attachment issues pile up; it deserves a systemic fix and a comment on the open state.
- **[Issue #3205 — Persistent group-scoped OneCLI secret assignment](https://github.com/nanocoai/nanoclaw/issues/3205)** (0 comments, open):Filed today and already identifies a design fork but received no maintainer reaction. If left unaddressed, this will block multi-user secret-scoping work downstream.
- **[Issue #3200 — "The Cartographer" persona submission](https://github.com/nanocoai/nanoclaw/issues/3200)** (closed with 1 comment): Closed quickly with no substantive resolution. Fine to close as not-a-bug, but if persona/extended-memory frameworks are on the roadmap, a maintainer note explaining the rejection or inviting a feature proposal would reduce friction for future contributors.
- **[PR #3185 — Discord custom_id delimiter fix](https://github.com/nanocoai/nanoclaw/pull/3185)** (open): This is the fix for the closed #3201 issue — that issue is already closed despite the fix still being open, which is confusing. The PR needs a merge or an explicit status update; leaving it open while marking the bug resolved risks the fix never landing.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-08-09

## 1. Today's Overview

IronClaw shows strong momentum with 30 issues and 50 PRs updated in the last 24 hours. The project closed 24 issues and merged/closed 32 PRs, indicating a healthy delivery cadence. The Reborn migration continues to be the dominant theme, with several Reborn parity and migration issues closing this period. Three new open issues were filed (Security validation path gap, coding tool surface replacement, and stress coverage expansion), and a major web-push notification PR and Slack progressive previews PR signal product-surface expansion.

## 2. Releases

No new releases were published during this period.

## 3. Project Progress

**Merged/Closed PRs (32)** — Highlights:

- **#7377** ([merged](https://github.com/nearai/ironclaw/pull/7377)) — `feat!: a run acts as its invoker` — Major security/identity change: runs now act as the invoking user, removing shared-route subject binding. Includes full review-hardening from the multi-agent audit.
- **#7382** ([merged](https://github.com/nearai/ironclaw/pull/7382)) — Scripted tool-call stress workload with durable write read-back (addresses #7360 phase 1).
- **#7389** ([merged](https://github.com/nearai/ironclaw/pull/7389)) — Fixed the `reborn-webui-v2-live-qa` lane by updating delivery verification to the new two-lane contract.
- **#7029** ([merged](https://github.com/nearai/ironclaw/pull/7029)) — Restored durable delivery claim with CAS in `Prepared → Sending` as sole authority for vendor-egress ownership.
- **#6938** ([merged](https://github.com/nearai/ironclaw/pull/6938)) — Skills activation now driven by the model, not a keyword scorer (part of epic #6941).
- **#7280** ([merged](https://github.com/nearai/ironclaw/pull/7280)) — Inspector browser/security/operator coverage with stable connection identity.

**Closed Issues** — 24 closed, including major Reborn milestones: #3280 (ProductWorkflow facade), #3286 (agent commands through Reborn), #3287 (memory/workspace migration), #3285 (external channel adapters), #3288 (capability lifecycle parity), #4470 (composition refactor into owned crates), #4539 (approvals parity epic), and #4382 (OAuth gate never re-fires).

## 4. Community Hot Topics

- **[#6989 — Token accounting bug (open, 5 comments)](https://github.com/nearai/ironclaw/issues/6989)** — ModelWorkRequest estimates input tokens from reference string length, not content. Part of the pi-harness adoption program. Active discussion on correction approach.
- **[#3280 — ProductWorkflow facade (closed, 7 comments)](https://github.com/nearai/ironclaw/issues/3280)** — Large coordination issue with 12 related issues; closed after completion.
- **PR #7398 — Web push notifications** ([open](https://github.com/nearai/ironclaw/pull/7398)) — XL-sized, medium risk, new first-party channel delivering W3C Web Push to browsers. High product-surface interest.
- **PR #7397 — Presence-based shared conversations** ([open](https://github.com/nearai/ironclaw/pull/7397)) — Builds on acting-identity ladder from #7377; enables safe owner-≠-actor daily operations in Slack/Telegram.

Underlying need: users consistently want IronClaw to reach them on their existing communication surfaces (browser, Slack, Telegram) and for the system to behave securely under multi-user, delegated-identity scenarios.

## 5. Bugs & Stability

**High severity:**

- **[#7391 — SafetyLayer::validate_input has no live caller (open, 0 comments)](https://github.com/nearai/ironclaw/issues/7391)** — The documented "Validate, Sanitize, Detect Leaks" stage is not wired into the Reborn turn path. Security-relevant gap; no fix PR yet.
- **[#6989 — Token accounting bug (open)](https://github.com/nearai/ironclaw/issues/6989)** — Incorrect token estimation from content reference string. Impacts cost and model-input correctness.

**Medium severity — fix PRs exist:**

- PR #7395 ([open](https://github.com/nearai/ironclaw/pull/7395)) — Fixes TOCTOU race in send-claim and allows failed-row reopen.
- PR #7352 ([open](https://github.com/nearai/ironclaw/pull/7352)) — Gate projection identities bound to gate ref; multiple gates on one run no longer collapse to one delivery identity.
- PR #7341 ([open](https://github.com/nearai/ironclaw/pull/7341)) — Restores scoped attachment reads and SSE tests after fetch/ReadableStream migration.

**Low severity — process/CI:**

- PR #7394 ([open](https://github.com/nearai/ironclaw/pull/7394)) — Fixes hardcoded crate prefixes in `SANDBOX_DOCKER_EXACT_PATHS`.

## 6. Feature Requests & Roadmap Signals

- **#6939 — Migration tool from legacy agent (Hermes/Openclaw)** ([open, 2 comments](https://github.com/nearai/ironclaw/issues/6939)) — User-reported switching costs; strong candidate for next-version tooling.
- **#7218 — Web Debug Inspector epic** ([open](https://github.com/nearai/ironclaw/issues/7218)) — Operator-only inspector with prompt, activity, and stats views; companion issues #7226 and #7225 closed.
- **#7392 — Replace coding tools with pinned omp contract** ([open](https://github.com/nearai/ironclaw/issues/7392)) — New epic filed today; likely next-version change.
- **#7360 — Expand stress coverage** ([open, 2 comments](https://github.com/nearai/ironclaw/issues/7360)) — Phase 1 merged; remaining phases target built-in tool and durable write paths.
- **#7398 — Web push notifications** ([open PR](https://github.com/nearai/ironclaw/pull/7398)) — Browser as first-party notification channel; likely to land next.

## 7. User Feedback Summary

- **[#6939](https://github.com/nearai/ironclaw/issues/6939)** — Explicit user-reported pain: migration from legacy agent products (Hermes/Openclaw) has high switching costs; users "would resist starting over with a clean slate."
- **[#7168 → #7171](https://github.com/nearai/ironclaw/pull/7171)** — Critical UX gap: installed skills vanished from Settings → Skills and could not be activated. The fix (#7171, skill activation via DB-backed tree, merged stack #6938) addresses a real user-visible failure.
- **[#7157 follow-ups](https://github.com/nearai/ironclaw/pull/7377)** — Live QA lanes broke after the acting-identity change; delivery verification now matches the new two-lane contract, reflecting some instability from large behavior changes.

## 8. Backlog Watch

- **[#3484 — Reborn Contributor Runway epic](https://github.com/nearai/ironclaw/issues/3484)** — Closed this cycle; long-running initiative concluded after ~3 months.
- **[#4539 — Reborn approvals parity epic](https://github.com/nearai/ironclaw/issues/4539)** — Closed; approval-loop parity achieved.
- **Active long-running items:** Reborn migration parent epic (#3031) continues; no stale issues appear abandoned — most items have recent activity.
- **Watch item:** #7391 (unwired SafetyLayer) is fresh (0 comments) and security-critical; needs maintainer triage promptly.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

**LobsterAI Project Digest — 2026-08-09**

---

## 1. Today's Overview

LobsterAI is in a low-activity maintenance phase. Over the last 24 hours, only one issue and three pull requests received updates, with zero new releases. While no new work has landed recently, the project shows ongoing community engagement through a stale LiteLLM integration PR that has been closed and two open PRs awaiting review. The repository continues to attract external contributions, including a documentation badge addition and a performance optimization for SQLite storage, but maintainer bandwidth appears limited given the age of the pending items.

---

## 2. Releases

None.

---

## 3. Project Progress

One pull request was merged/closed in the last 24 hours:

- **[PR #2193 — feat: add LiteLLM as AI gateway provider](https://github.com/netease-youdao/LobsterAI/pull/2193)** (CLOSED): This PR proposed integrating [LiteLLM](https://litellm.ai) as an AI gateway provider, allowing users to point the base URL at a LiteLLM proxy for access to 100+ LLM providers through a single OpenAI-compatible endpoint. The implementation reused the existing `chatWithOpenAICompatible` handler, requiring no new dependencies. The closure status is ambiguous (merged vs. rejected) but removes it from active consideration.

No other features advanced or were fixed in this period.

---

## 4. Community Hot Topics

Activity is minimal, with the following items drawing attention:

- **[Issue #1192 — 自定义已有工具的默认配置 (Customize default configuration for existing tools)](https://github.com/netease-youdao/LobsterAI/issues/1192)** — 1 comment: The user wants to hardcode default configurations (e.g., forcing headless browser mode) because LLM instruction-following is unreliable for remembering such settings. This highlights a desire for deterministic overrides that bypass model behavior.

- **[PR #1193 — perf(sqlite): eliminate write amplification with debounce + batch transactions](https://github.com/netease-youdao/LobsterAI/pull/1193)** — No comments: A technical contribution addressing SQLite write amplification caused by full `db.export()` + `fs.writeFileSync()` on every row mutation in `sql.js`. The proposed fix uses debounce and batch transaction strategies.

- **[PR #2294 — docs: add TakoAPI directory badge](https://github.com/netease-youdao/LobsterAI/pull/2294)** — No comments: Adds a directory badge to the README for discoverability on the TakoAPI open agent catalog.

The underlying need across these items is improved usability: deterministic tool configuration, persistence performance, and project visibility.

---

## 5. Bugs & Stability

No new bugs, crashes, or regressions were reported in the last 24 hours. The only performance-related item is the open **[PR #1193](https://github.com/netease-youdao/LobsterAI/pull/1193)**, which addresses a known architectural issue in SQLite persistence: every row mutation triggers a full database serialization and disk write, causing significant write amplification. This is a performance concern rather than a correctness bug, but it does impact scalability for long-running sessions.

---

## 6. Feature Requests & Roadmap Signals

One active feature request stands out:

- **[Issue #1192 — Default configuration overrides for built-in tools](https://github.com/netease-youdao/LobsterAI/issues/1192)**: The user requests the ability to hardcode default configurations (e.g., headless browser mode) to avoid relying on LLM memory/instruction-following. This suggests a broader architectural need for a deterministic configuration layer separate from conversational memory.

Predictions for the next release:
- **User-configurable tool defaults**: Given the explicit user pain point and its simplicity to implement, a per-tool default configuration file or settings panel is a likely candidate for the next version.
- **LiteLLM provider**: If PR #2193 was closed with intent to revise, a LiteLLM integration could appear in a future release to broaden provider support.

---

## 7. User Feedback Summary

User sentiment reflects frustration with LLM reliability for persistent operational settings. The request in **[Issue #1192](https://github.com/netease-youdao/LobsterAI/issues/1192)** represents a significant pain point: users want deterministic, non-negotiable configuration for tools, which the current "memory + instruction-following" approach fails to deliver consistently. The user explicitly notes that "大模型的指令跟随经常不好" (the model's instruction-following is often poor), indicating dissatisfaction with model-dependent behavior for infrastructure-level settings. This signals a preference for explicit, static configuration over learned or prompted behavior.

---

## 8. Backlog Watch

Several items require maintainer attention due to extended staleness:

- **[Issue #1192](https://github.com/netease-youdao/LobsterAI/issues/1192)** — Created 2026-04-01, last updated 2026-08-08: Open for over 4 months with only one comment and no maintainer response. The feature request remains unaddressed.

- **[PR #1193](https://github.com/netease-youdao/LobsterAI/pull/1193)** — Created 2026-04-01, last updated 2026-08-08: A substantive performance improvement PR languishing without review or comment for 4+ months.

- **[PR #2294](https://github.com/netease-youdao/LobsterAI/pull/2294)** — Created 2026-07-08, last updated 2026-08-08: A simple documentation addition awaiting review for over a month.

The clustering of "stale" labels and the absence of maintainer comments on any item suggests potential maintainer bandwidth constraints that could hinder the project's momentum.

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

**Moltis Project Digest — 2026-08-09**

**1. Today's Overview**
Moltis activity is low today with only two issues and one pull request updated in the last 24 hours. No new releases were published. The project resolved a long-standing Docker sandbox filesystem bug (PR #1105) after a two-month open period, closing the related issue #1096. However, a new bug (#1185) was filed concerning Apple Container 1.x sandbox detection, indicating potential regressions or compatibility gaps in container handling. Overall, the project shows a maintenance-focused cadence with fixes being progressed, though throughput is modest.

**2. Releases**
No new releases were published in the last 24 hours. This section is omitted.

**3. Project Progress**
- **PR #1105 (Merged/Closed): Fix Docker sandbox filesystem tool fallback** — [View PR](https://github.com/moltis-org/moltis/pull/1105). This change adds regression coverage for sandboxed Read/Write/Edit/MultiEdit operations on `/home/sandbox` and `workspace/data` paths. It introduces a fallback mechanism from translated Docker host paths to container operations when the gateway process cannot access the host mount, while preserving direct-host missing-list semantics. This closes the long-standing issue #1096 and stabilizes filesystem tooling in Docker environments.

**4. Community Hot Topics**
No issues or PRs today have generated active discussion (all have zero comments and reactions). The two items updated reflect transactional activity rather than community debate. The most significant underlying need is reliable sandboxed filesystem access across diverse container runtimes (Docker, Apple Container), as evidenced by the new bug #1185 which reports that Apple Container 1.x sandbox starts but Moltis incorrectly treats it as not running — a critical detection logic gap for macOS users.

**5. Bugs & Stability**
- **[High Severity] Issue #1185 (Open): Apple Container 1.x sandbox detection failure** — [View Issue](https://github.com/moltis-org/moltis/issues/1185). Reports that the sandbox process is running but Moltis misclassifies it as not running. This is a functional blocker for Apple Container users, potentially affecting all sandbox-dependent tools. No linked fix PR exists yet.
- **[Low Severity] Issue #1096 (Closed): Read/Write/Edit tools not working in Docker** — [View Issue](https://github.com/moltis-org/moltis/issues/1096). Resolved by the merged fix in PR #1105, which addresses the root cause of host-mount access failures.

**6. Feature Requests & Roadmap Signals**
No explicit feature requests were filed today. The trajectory from PR #1105 suggests the maintainers are prioritizing container runtime compatibility and filesystem tool robustness. Given the new Apple Container bug, the next version is likely to include a fix for cross-runtime sandbox state detection, potentially standardizing how Moltis verifies container health across Docker, Apple, and other runtimes.

**7. User Feedback Summary**
User pain points today center on container sandbox reliability. The new issue #1185 indicates dissatisfaction with Apple Container support, specifically a false-negative detection that prevents tool usage despite a healthy sandbox. The closure of #1096, which dated back to June, signals the maintainers did address a critical Docker workflow blocker, likely improving user satisfaction for Docker-centric deployments. No positive or negative sentiment was otherwise expressed in the collected data.

**8. Backlog Watch**
No long-unanswered issues or PRs currently demand maintainer attention beyond what was processed today. PR #1105 was successfully merged after ~2 months, and its companion issue was closed. The new issue #1185, reported yesterday, should be prioritized for maintainer triage to prevent an accumulation of unresolved Apple-runtime bug reports.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

**CoPaw Project Digest — 2026-08-09**

**1. Today's Overview**
CoPaw shows elevated activity with 19 issues and 50 PRs updated in the last 24 hours, reflecting a strong community contribution pipeline. Open PRs (47) vastly outnumber merges (3), indicating a bottleneck in review capacity. No new releases are available; the latest is v2.1.0b2. A significant cluster of bug reports targets the desktop client (Tauri) and the 2.1.0 beta line, particularly around MCP session handling, resource consumption, and provider compatibility. The project remains actively developed, but maintainer bandwidth appears stretched given the number of open items.

**2. Releases**
No new releases this period.

**3. Project Progress**
Three pull requests were merged or closed:
- **[PR #6836 (merged)](https://github.com/agentscope-ai/QwenPaw/pull/6836)** — `fix(mcp): wire read_timeout_seconds into MCP SDK ClientSession`: Fixes a bug where the configured timeout was not applied, causing potential indefinite hangs on MCP streams.
- **[PR #6835 (merged)](https://github.com/agentscope-ai/QwenPaw/pull/6835)** — `fix(llm): resolve KeyError '__aiter__' during auto-title generation`: Resolves a crash in chat auto-title generation when non-streaming providers return dict-like responses.
- **[Issue #6756 (closed)](https://github.com/agentscope-ai/QwenPaw/issues/6756)** — Bug related to `run_tool_batch` failing with "No toolkit available in current context".

**4. Community Hot Topics**
- **[Issue #6782 (9 comments)](https://github.com/agentscope-ai/QwenPaw/issues/6782)**: Docker 2.0.1 version shows plugin and app marketplaces as "under maintenance," rendering core features unusable. This is a high-visibility blocker for Docker users.
- **[Issue #6811 (5 comments)](https://github.com/agentscope-ai/QwenPaw/issues/6811)**: The OpenAI Responses provider ignores `disable_thinking` during context continuation and waits a full 60 seconds before canceling, blocking the main conversation. Highlights friction in the Scroll memory-eviction workflow.
- **[Issue #6490 (5 comments)](https://github.com/agentscope-ai/QwenPaw/issues/6490)**: Request to add Volcengine Agent Plan and Xiaomi MiMo Standard API as built-in providers, signaling user demand for a wider provider ecosystem beyond the mainstream US-based APIs.
- **[PR #6817](https://github.com/agentscope-ai/QwenPaw/pull/6817)**: New contribution integrating AnySearch as a built-in web search provider to replace Tavily, showing community interest in more robust and possibly cheaper search backends.

**5. Bugs & Stability**
The following issues were reported or updated today. Severity is ranked high to low.

- **High — [Issue #6822](https://github.com/agentscope-ai/QwenPaw/issues/6822)**: A transient network failure on a streamable HTTP MCP connection permanently blocks the active conversation after auto-reconnect. This is a critical liveness bug for MCP-heavy workflows. **Fix PRs exist: [#6825](https://github.com/agentscope-ai/QwenPaw/pull/6825) and [#6836](https://github.com/agentscope-ai/QwenPaw/pull/6836)**; the latter is merged.
- **High — [Issue #6814](https://github.com/agentscope-ai/QwenPaw/issues/6814)**: SIGBUS crash in `sqlite3WalFindFrame` when opening Scroll `history.db` on macOS. A hard crash that can lead to data loss or corruption of local chat history.
- **Medium — [Issue #6828](https://github.com/agentscope-ai/QwenPaw/issues/6828)**: Console frontend idles at ~20% CPU due to infinite CSS animations. Causes UI jank on desktop. **Fix PR ready: [#6834](https://github.com/agentscope-ai/QwenPaw/pull/6834), pending review.**
- **Medium — [Issue #6813](https://github.com/agentscope-ai/QwenPaw/issues/6813)**: `consume_model_response` raises `KeyError: '__aiter__'` on agent scope 2.x dict responses, breaking auto-title generation. **Fix merged in PR #6835.**
- **Medium — [Issue #6821](https://github.com/agentscope-ai/QwenPaw/issues/6821)**: Relay of `reasoning_content` fails for thinking-mode models (e.g., DeepSeek V4), returning a 400 error. Blocks usage of a popular model family.
- **Medium — [Issue #6812](https://github.com/agentscope-ai/QwenPaw/issues/6812)**: Google Gemini provider fails because tool schemas include a `$schema` field, which the API rejects.
- **Low/Medium — [Issue #6810](https://github.com/agentscope-ai/QwenPaw/issues/6810)**: Windows installer fails if a browser extension host locks files; installer should terminate blocking processes first.
- **Low — [Issue #6831](https://github.com/agentscope-ai/QwenPaw/issues/6831)**: macOS desktop build fails to detect Homebrew-installed ffmpeg due to PATH exclusion, disabling local Whisper.

**6. Feature Requests & Roadmap Signals**
- **Model Provider Expansion**: [Issue #6490](https://github.com/agentscope-ai/QwenPaw/issues/6490) requests Volt Engine and Xiaomi MiMo built-ins. Given the volume of provider-specific compatibility bugs (Gemini, DeepSeek), this remains a persistent roadmap item.
- **Prompt Caching**: **[PR #6668](https://github.com/agentscope-ai/QwenPaw/pull/6668)** brings opt-in GPT-5.6+ prompt caching, indicating cost-reduction focus for heavy users.
- **Model Fallback with Cooldown**: **[PR #6659 (Under Review)](https://github.com/agentscope-ai/QwenPaw/pull/6659)** proposes automatic failover for rate limits and timeouts, addressing a top pain point for reliability.
- **Better Approvals UX**: [Issue #6832](https://github.com/agentscope-ai/QwenPaw/issues/6832) and [Issue #6819](https://github.com/agentscope-ai/QwenPaw/issues/6819) both highlight approval-flow confusion — one requests natural-language descriptions, the other reports missing prompts. Likely a candidate for the next patch release.
- **Chat Cleanup**: [Issue #6827](https://github.com/agentscope-ai/QwenPaw/issues/6827) requests optional cleanup of temp files on chat deletion — a practical workspace hygiene feature.
- **Sub-Agent Model Switching**: [Issue #6838](https://github.com/agentscope-ai/QwenPaw/issues/6838) reports that sub-agents cannot use a separate model and face workspace config conflicts.

**7. User Feedback Summary**
Users report recurring pain points around the 2.1.0 beta desktop experience: idle CPU burn ([#6828](https://github.com/agentscope-ai/QwenPaw/issues/6828)), Whisper configuration friction ([#6831](https://github.com/agentscope-ai/QwenPaw/issues/6831)), and conversation display timing errors ([#6826](https://github.com/agentscope-ai/QwenPaw/issues/6826)). Community sentiment is mixed: the influx of first-time-contributor PRs (e.g., #6688, #6750, #6725, #6825) shows an engaged external community, but the dependency on such contributions to fix core MCP and LLM logic suggests maintainers may be resource-constrained. Docker users are particularly vocal about functional regressions ([#6782](https://github.com/agentscope-ai/QwenPaw/issues/6782)).

**8. Backlog Watch**
- **[Issue #6490 (Feature Request, open since 2026-07-27)](https://github.com/agentscope-ai/QwenPaw/issues/6490)**: Request for adding Volcengine and Xiaomi providers remains open with 5 comments and no linked PR, needing maintainer triage.
- **[PR #6659 (Model Fallback, under review since 2026-08-03)](https://github.com/agentscope-ai/QwenPaw/pull/6659)**: A high-value reliability feature has been sitting in review for six days.
- **[PR #6688 (Plugin Import Isolation, open since 2026-08-04)](https://github.com/agentscope-ai/QwenPaw/pull/6688)**: First-time contributor fix for a plugin install blocker has not been merged.
- **[PR #6750 (Session Identity Deadlock Fix, open since 2026-08-06)](https://github.com/agentscope-ai/QwenPaw/pull/6750)**: A community fix for front-end session issues remains unreviewed.
- **[Issue #6558 (Abnormally High CPU Usage, closed as stale on 2026-05-20)](https://github.com/agentscope-ai/QwenPaw/issues/4558)**: While closed, its theme resurfaced in #6828, suggesting the original fix may have been incomplete.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

**EasyClaw Project Digest — 2026-08-09**

**1. Today's Overview**

EasyClaw saw a quiet day for issue activity, with zero issues updated in the past 24 hours. However, development momentum is strong on the vendor/runtime integration front, with three pull requests merged, all focused on upgrading the bundled OpenClaw runtime and optimizing the desktop build pipeline. The project shipped five new releases (v1.8.88–v1.8.92) in a rapid cadence, indicating a mature and actively maintained codebase. The focus is clearly on stability for the Desktop product, with repeated fixes targeting gateway startup, session persistence, and platform compatibility (Weixin, Feishu). Overall project health appears solid, with a clean issue tracker and a continuous release flow.

**2. Releases**

Five new versions were published today (v1.8.88 through v1.8.92), each building on the previous for cumulative stability improvements.

- **v1.8.92** — Restores Weixin (WeChat) compatibility after an OpenClaw SDK import change; migrates configured workspace state to enable reliable gateway startup. ([Release Link](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.92))
- **v1.8.91** — Adds automatic migration of legacy agent workspace state before Gateway startup. ([Release Link](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.91))
- **v1.8.90** — Restores Feishu (Lark) message recipients and escalation card updates. ([Release Link](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.90))
- **v1.8.89** — Upgrades the bundled OpenClaw runtime with SQLite session improvements; stabilizes Desktop baseline and gateway startup behavior. ([Release Link](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.89))
- **v1.8.88** — Increases gateway memory headroom for more reliable Desktop sessions; persists routed cloud provider endpoints across Desktop restarts. ([Release Link](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.88))

**Migration Notes:** v1.8.91 introduces automatic migration of legacy workspace state, and v1.8.92 ensures configured state is carried over to the new gateway startup path. Users upgrading from older versions should ensure they run at least v1.8.91 before v1.8.92 to guarantee a clean state transition. No breaking changes are noted across these releases.

**3. Project Progress**

Three pull requests were merged today, all authored by gaoyangz77, reflecting a coordinated effort to upgrade the vendor runtime and stabilize the desktop build.

- **PR #37** — `fix(ci): cache complete vendor workspace builds` ([PR #37](https://github.com/gaoyangz77/rivonclaw/pull/37)): Improves CI caching for the `@openclaw/ai` workspace, rejects incomplete caches, and adds an explicit assertion for the packaged AI runtime entrypoint.
- **PR #36** — `fix(desktop): restore vendor package pruning` ([PR #36](https://github.com/gaoyangz77/rivonclaw/pull/36)): Prunes unexposed optional runtimes (memory-lancedb, MXC plugin) and removes hoisted Control UI-only dependencies to reduce packaged payload; enforces reduced payload contract.
- **PR #35** — `feat(vendor): upgrade OpenClaw with SQLite sessions` ([PR #35](https://github.com/gaoyangz77/rivonclaw/pull/35)): Pins OpenClaw to a specific commit; migrates sessions from legacy `sessions.json` to per-agent SQLite/WAL storage; runs official startup migrations for existing Desktop customers.

**4. Community Hot Topics**

There were no issues open or updated in the last 24 hours, and none of the merged PRs accumulated comments or reactions beyond the author's own activity. The absence of community engagement on the tracker suggests either a small but focused user base or that users are interacting via other channels (e.g., WeChat/Feishu groups, given the product's Chinese-market emphasis). No public discussion threads are available for analysis.

**5. Bugs & Stability**

No new bugs, crashes, or regressions were reported via the issue tracker today. However, the release notes reveal that recent regressions were silently fixed in this cycle: Weixin compatibility was broken by an upstream OpenClaw SDK import change (fixed in v1.8.92) and Feishu message recipients/escalation cards were not updating (fixed in v1.8.90). Both fixes are already shipped, so no user action is required. The other changes (memory headroom, endpoint persistence, CI cache invalidation) target long-term stability for Desktop sessions.

**6. Feature Requests & Roadmap Signals**

No explicit feature requests were filed today. The PR activity signals a clear roadmap focus on bundling and stabilizing the underlying OpenClaw runtime rather than adding new user-facing features. The SQLite session migration (PR #35) is a foundational change that will likely enable improved session history and state management in future versions. Expect the next releases to further polish the desktop build contract and possibly expose session management features built on the new SQLite storage layer.

**7. User Feedback Summary**

With no issue tracker activity, there is no direct user feedback to summarize. Indirect signals from the release notes suggest users depend on Weixin and Feishu integrations, and that Desktop session reliability is the primary pain point — both were actively addressed across all five releases. The repeated macOS Gatekeeper warnings in install notes suggest a common user-side frustration with the unsigned app, which the project acknowledges but has not resolved (likely due to code-signing costs rather than technical blockers).

**8. Backlog Watch**

The issue tracker is completely clear: there are zero open issues and zero open PRs. No items require maintainer attention. While this is a healthy state, it is worth monitoring whether the silence reflects low external usage of the open-source distribution, or if users are simply not filing bugs. The maintainer appears to be operating in a rapid-release cadence (five versions in one day), which suggests proactive internal testing is catching issues before users do.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar).*