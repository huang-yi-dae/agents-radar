# OpenClaw Ecosystem Digest 2026-08-06

> Issues: 500 | PRs: 500 | Projects covered: 13 | Generated: 2026-08-06 02:13 UTC

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

# OpenClaw Project Digest — 2026-08-06

## 1. Today's Overview

OpenClaw shows a high-activity period with 500 issues and 500 PRs updated in the last 24 hours, signaling sustained community engagement. The open issue count (432) far exceeds closed ones (68), indicating a growing backlog that maintainers are actively triaging. The most critical P0 issues — a database migration failure blocking gateway startup (#119263) and managed media cleanup deleting files on unreadable stores (#119090) — have recent activity, though the latter was already closed as fixed. While feature development continues across diagnostics, CLI improvements, and channel integration (Feishu, Slack, ClickClack), the cluster of P1 issues around session-state integrity, message delivery reliability, and codex integration remains the most significant area of concern for stability.

## 2. Releases

No new releases were published in the last 24 hours.

## 3. Project Progress

Six pull requests were merged or closed in the last 24 hours, reflecting targeted fixes and operational improvements:

- **Fix `auto-reply`: mark truncated row lists in /export-session warnings** – Merged (#119793, perf(agents): index subagent recovery ownership) addresses quadratic ownership-check cost during restart recovery by using the registry index. This is an operational performance improvement for large recovery sets.
- **Fix test: Doctor E2E follows current repair contracts** (#119812) corrects the broad Gateway E2E aggregate that reported 29 Doctor failures after the contribution lifecycle began re-entering plugin-metadata snapshots.
- **Feat: AI safety/quality event taxonomy (#82548)** (#107744, closed) — a large (XL) PR that was ultimately closed without merge, indicating the extensive observability taxonomy work for safety decisions did not land.
- **Feat(diagnostics): chain gateway traces into runs** (#92161, closed) — also closed without merge; the effort to chain gateway diagnostic traces into embedded agent runs was not completed.
- **Fix `auto-reply`: mark truncated row lists** (#119230, closed) — fixes misleading warnings in `/export-session` where capped row lists appeared complete; marks them clearly as truncated.
- **Fix `auto-reply`: mark truncated row lists in export-session warnings** – Listed as closed in the PR data; this fix ensures operator visibility into data truncation.

Additionally, a 5-issue cluster (#53540, #67419, #85251, #90098, #118846) saw PRs merged referencing fixes, though the specific PRs are not listed in the closed set.

## 4. Community Hot Topics

The most active issues reveal deep concerns about core reliability and session integrity:

- **Realtime voice unbounded state** (#116201, 59 comments, 🐚 platinum hermit) — The top issue by far, authored by vincentkoc, tracks resource limits in voice sessions expressed as counts rather than ownership bounds, causing retained provider/consult state under slow conditions. It's a P1 requiring live repro and product decisions.
- **Memory Trust Tagging by Source** (#7707, 27 comments, 🌊 off-meta tidepool) — A long-standing feature request (Feb 2026) still open, proposing trust levels for memory entries to prevent poisoning. The 27 comments show significant community interest in this security enhancement.
- **Subagent completion silently lost** (#44925, 25 comments, 🦞 diamond lobster) — A P1 bug where subagent results are lost with no retry or notification, impacting Telegram forum mode. Filed in March, it remains open with no fix PR.
- **Gateway main thread saturation** (#118846, 19 comments, closed) — P1 crash-loop issue caused by plugin-metadata snapshotting and fs statting; was recently closed, presumably fixed.
- **Duplicate Telegram replies post-5.20** (#86519, 13 comments, 🐚 platinum hermit) — Regression causing 2-10x duplicate replies; upgrade to 5.22 reduced but didn't eliminate; remains open as P1.

## 5. Bugs & Stability

Several high-severity bugs were reported or remain active, ranked by severity:

**P0 (Critical)** :
- **Agent DB v14→v15 migration fails** (#119263, 🦞 diamond lobster) — `no such column: entry_valid` in canonical index repair rolls back the entire transaction, gateway refuses to start. This is an `impact:ux-release-blocker` with a linked open PR (#118506).
- **Managed media cleanup fails open** (#119090, 🦞 diamond lobster, closed) — Unreadable session store resolves to null, causing permanent deletion of generated media. Closed, indicating a fix was shipped.

**P1 (High)** :
- **Realtime voice unbounded provider/consult state** (#116201) — P1 with 59 comments, no fix PR yet.
- **Subagent completion silently lost** (#44925) — P1, no retry/notification on timeout; no fix PR.
- **Duplicate Telegram replies** (#86519) — P1 regression, persists after partial fix.
- **SQLite snapshot restore lacks crash guarantees** (#113306) — P1, reports success without durable directory linking.
- **Large SQLite transcript cleanup blocks gateway** (#112423) — P1, blocks event loop.
- **Codex app-server silent turns** (#85251, #109490) — Two P1 bugs where codex turns go silent or are interrupted after delegated tools, losing promised work.
- **Slack thread replies not delivered** (#96692) — P1, linked fix PR (#119737) by ClawSweeper bot to require confirmed thread placement.
- **Gateway thread starvation** (#118846) — P1, marked closed (fixed).
- **Loop detection doesn't terminate stuck runs** (#106231) — P1, linked PR open.
- **Codex binding tombstone bricking sessions** (#116022) — P1, linked fix PR #118506.
- **Session context bloat** (#67419) — P1, 20-30% tokens wasted on bootstrap file re-injection.

**P2 (Medium)** — Includes hardcoded workspace path (#51429, 12 comments), memory trust tagging (#7707), cron job stalls (#91892), Discord message edit/delete support (#53654), and Google Antigravity bans from tool schema reloading (#44134).

## 6. Feature Requests & Roadmap Signals

Several notable feature requests signal roadmap direction:

- **Memory Trust Tagging by Source** (#7707) — Tagging memory entries by origin trust level to prevent poisoning. High interest (27 comments), awaiting security review and product decision.
- **Visible agent-to-agent messaging** (#50798) — For ACP thread-bound sessions without route pollution; P2 awaiting maintainer review.
- **Discord messageUpdate/messageDelete support** (#53654) — Edit-to-reprocess and delete-to-cancel; P2, needs product decision.
- **TTL for delivery queue messages** (#16555) — Prevent stale entries flooding channels on restart; P2, with linked PR in progress.
- **Denylist for exec-approvals** (#6615, 8 👍) — Complement allowlist with "allow everything except X" policies; security review needed.
- **Rate-limit fallback user notification** (#92672, closed) — The proposal for user-visible errors and immediate switch notifications was closed, possibly as already-fixed later.

**Prediction:** The P0 migration fix and the codex tombstone reclaim fix (PRs #118506, #119681) are strong candidates for the next release. The memory trust tagging (#7707) and session bootstrap deduplication (#67419) are likely candidates for upcoming minor releases given the continued community interest.

## 7. User Feedback Summary

The most frequent user pain points center on **message delivery reliability** — duplicate replies (#86519, #77306, #116512), lost subagent completions (#44925), undelivered Slack thread replies (#96692), and black-holed Telegram topics (#91564). These are compounded by **session state fragility**, where sessions become permanently unusable (#116022, #91564) or work is silently lost (#109490, #107873). Users also express frustration with **surprising behavior changes** — the hardcoded `/Users/wangtao` path (#51429, 12 comments) shows strong negative sentiment about code review quality. On the positive side, several fixes were acknowledged: the gateway thread starvation (#118846) and managed media cleanup (#119090) were both closed as fixed, indicating responsive maintainer action on P0s. Several feature requests with multiple upvotes (exec-approvals denylist +8, AWS deployment guide +4) suggest users actively want more production-ready deployment and security controls.

## 8. Backlog Watch

Several long-standing issues require maintainer attention:

- **Memory Trust Tagging** (#7707, opened 2026-02-03, 27 comments) — After 6 months, still awaiting security review and product decision, despite being flagged as a security issue.
- **Subagent completion silently lost** (#44925, opened 2026-03-13, 25 comments) — P1 bug impacting core functionality with no fix PR after nearly 5 months.
- **Duplicate Telegram replies** (#86519, opened 2026-05-25) — P1 regression since v5.20; persists in 5.22 with no definitive fix.
- **Cron jobs stall during model calls** (#91892, opened 2026-06-10) — `model_call:stream_progress` never completes; P2 but affecting scheduled workflows.
- **CLI stops reading ~/.env** (#79263, opened 2026-05-08) — Breaks shell-based tests post-upgrade; flagged as security-relevant and recovery-stuck.
- **Feature: Native announceTarget for subagents** (#101248, PR open since 2026-07-07) — Large PR (XL) for subagent completion routing with extended review, still in "needs proof" state; may be stalled.
- **QA primary proof for containers & external app SDK** (#118785, opened 2026-08-03) — A maintainer-led tracking issue (vincentkoc) for 54 IDs that may show systemic audit gaps; low public visibility but high maintenance relevance.
- **Persistent file-based provider cooldown** (#70903, opened 2026-04-24) — P0-flagged billing cooldown persisting across restarts; no fix PR after 3+ months.

These long-open P1s around message delivery and session state should be prioritized to maintain trust in the platform's stability.

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report — Personal AI Assistant Open-Source Ecosystem
**Date: 2026-08-06**

---

## 1. Ecosystem Overview

The personal AI assistant open-source ecosystem is in a period of intense concurrent development, with flagship projects (OpenClaw, ZeroClaw, IronClaw) processing 500+ issues and PRs daily, while smaller projects maintain steady, focused maintenance cycles. The ecosystem is converging on reliability and production-hardening: message delivery integrity, session state durability, MCP tool ecosystem stability, and configurable model fallback chains dominate activity across projects. Security hardening is accelerating, with WebAuthn validation, credential-chain verification, and memory-trust tagging appearing as recurring themes. The landscape shows clear stratification: core reference implementations (OpenClaw) drive the architecture, while derivatives (ZeroClaw, NanoClaw, IronClaw) execute targeted hardening and feature expansion, and newer entrants (ZeptoClaw, EasyClaw) remain dormant. A notable shift toward OpenAI-compatible API surfaces (ZeroClaw Chat Completions, NanoBot provider toggles) signals a push for ecosystem interoperability.

---

## 2. Activity Comparison

| Project | Open Issues | Open PRs | Closed/Merged (24h) | Release Status (24h) | Health Score (1–5) | Notes |
|---|---|---|---|---|---|---|
| **OpenClaw** | 432 (68 closed) | ~500 touched | ~6 merged | No release | ★★☆☆☆ | Growing P0/P1 backlog; message-delivery & session-state reliability concerns |
| **ZeroClaw** | 40 active (10 closed) | 49 open, 1 merged | 1 merged | No release | ★★★☆☆ | Heavy RFC governance; review bottleneck; strong security hardening |
| **PicoClaw** | 0 new | 3 open + 1 closed | 1 closed (OAuth) | No release | ★★★★☆ | Stable maintenance; 5-month review cycles; slow but steady |
| **IronClaw** | ~43 touched | ~50 touched | 18 merged, 10 closed | v1.1.0-rc.1 (Aug 3) | ★★★★☆ | RC phase; QA bug-bash surfacing agent-truthfulness defects |
| **NanoBot** | 4 open | 15 updated | 7 merged | No release | ★★★★☆ | Rapid fix turnaround; active feature dev (Temporary Chat, MCP Apps) |
| **NanoClaw** | ~2 long-standing open | 10 open | 2 merged | No release | ★★★☆☆ | Focused hardening; LXC installer bug unresolved 3+ months |
| **NullClaw** | 0 new | 2 in review | 0 | No release | ★★★★☆ | Two targeted runtime fixes in review; no new issues |
| **LobsterAI** | 3 open | 12 closed | 12 merged | **2026.8.5 released** | ★★★★☆ | Shipped patch; fixed gateway lock + shutdown hangs |
| **CoPaw (QwenPaw)** | ~20 open | ~28 open | 5 merged | No release (v2.1.0-beta) | ★★★★☆ | Active fix wave; first-time contributions merged |
| **TinyClaw / Moltis / ZeptoClaw / EasyClaw** | 0 | 0 | 0 | No activity | — | Dormant (no activity in last 24h) |

---

## 3. OpenClaw's Position

**Advantages vs. peers:**

- **Scale & community gravity:** 500 issues/PRs touched daily — 10x the activity of IronClaw (50) and ZeroClaw (100). Represents de-facto reference architecture for the ecosystem; derivatives (ZeroClaw, NanoClaw) directly fork/branch from its core concepts.
- **Mature channel coverage:** Telegram, Slack, Discord, Feishu, ClickClack, voice sessions — broader than any peer. The P1 Slack-thread fix was crowdsourced via bot (ClawSweeper), demonstrating an automated contribution pipeline at scale.
- **Diagnostic breadth:** Doctor E2E suites, gateway trace-chaining PRs, event-taxonomy work (though the latter failed to land).

**Technical approach differences:**

- **Monolithic core with plugin-metadata snapshots:** OpenClaw uses an agent DB with schema migrations (currently v14→v15) and per-session recovery ownership indexes — a heavier, more stateful architecture than NanoBot's session-request-scoped grants or ZeroClaw's control-plane/gateway separation.
- **P0 fragility risk:** The v14→v15 migration failure (#119263) blocks gateway startup entirely — an architecture-level risk; peers (IronClaw, ZeroClaw) are adopting more modular, containerized boundaries (sandbox profiles, host/container seams).

**Community size comparison:** OpenClaw's issue volume (432 open) is 50x NanoBot's (4) and 10x ZeroClaw's (40), reflecting an order-of-magnitude larger user base, but also a **backlog that is growing faster than it closes** (432 open vs 68 closed). Maintainer attention appears strained — subagent completion loss (#44925) has been P1 for 5 months.

---

## 4. Shared Technical Focus Areas

| Requirement | OpenClaw | ZeroClaw | IronClaw | NanoBot | CoPaw | LobsterAI |
|---|---|---|---|---|---|---|
| **Message delivery reliability** (dedup, retry, no silent loss) | ★★★ (P1 cluster) | — | ★★ (cross-channel leak) | — | ★★ (SSE retry) | — |
| **Session-state integrity** (context bloat, durable snapshots, crash recovery) | ★★★ (P1 cluster) | ★★ (sessions RFC) | ★ (delivery claims) | — | ★★ (tool-call history issues) | ★★ (prompt duplication, 4,425 chars) |
| **MCP tool ecosystem stability** (validation, error handling, timeout config) | — | — | ★★★ (endpoint validation, auth guessing) | ★★ (error envelope mishandling) | ★★★ (periodic tool failure, timeout drop) | — |
| **Model fallback / routing** (multi-provider failover, dynamic model choice) | ★ (recovery index) | ★ (OpenRouter streaming bug) | — | ★★ (provider-native toggles) | ★★ (fallback config UI + routing request) | — |
| **Security hardening** (authN, credential verification, memory trust) | ★★ (memory trust tagging) | ★★★ (WebAuthn, forbidden paths, intent-chain verification) | — | — | — | — |
| **Config-as-code / declarative management** | — | ★★ (RFC phase) | ★★ (epic #3036) | — | — | ★★ (openclaw.json overwrite) |
| **Agent truthfulness / hallucination control** | — | — | ★★★ (QA cluster: fabricated status, false connections) | — | — | — |
| **OpenAI-compatible API surface** | — | ★★★ (Chat Completions RFC) | — | — | — | — |

**Cross-cutting insight:** The most urgent ecosystem-wide need is **reliable message and state delivery with explicit failure visibility**. OpenClaw's silent-loss P1s, IronClaw's hallucinated connection claims, CoPaw's stuck UI states, and NanoBot's goal-loop spam all share a root cause: agents cannot distinguish "processing" from "stalled" and fail silently.

---

## 5. Differentiation Analysis

| Project | Core Focus | Target User | Architecture |
|---|---|---|---|
| **OpenClaw** | Full-featured reference assistant; broad channel + voice + codex integrations | Self-hosters, power users | Monolithic core, DB-backed sessions, plugin-metadata snapshots |
| **ZeroClaw** | Production-hardened control plane; RFC-governed security & auth | Enterprise/ops teams | Gateway/control-plane separation, WebAuthn, sandboxed runtime |
| **IronClaw** | Extension reach (MCP, IronHub marketplace, cross-channel attachments) | Growing install base | WASM-based skills, sandbox profiles (Docker/Railway), delivery claims |
| **NanoBot** | Lightweight, fast-iterating chatbot/agent for messaging channels | Individual users, small teams | Session-grant tool auth; WebUI-first; channel adapters (WhatsApp, Matrix) |
| **NanoClaw** | Hardening via container separation; host/agent seams | Experienced users, LXC/proxmox hosts | Container-based isolation, single-writer DB invariant |
| **CoPaw (QwenPaw)** | Console-centric multi-model agent w/ deep tool recursion | Developers, Qwen/LLM workflow users | Agent-vs-tool recursion; artifact canvas; MCP-heavy |
| **LobsterAI** | Desktop client for OpenClaw; engagement features | End users of desktop AI apps | Electron-style main/renderer split; OpenAI-compat proxy |
| **PicoClaw** | Minimal, focused CLI agent (Anthropic-tuned) | CLI-first users | Slim; OAuth streaming; fallback chains |

**Architecture divergence:** The critical split is **monolithic (OpenClaw, LobsterAI) vs. containerized/sandboxed (NanoClaw, IronClaw, ZeroClaw)**. The latter group is actively fixing database-write-path violations, host/container seams, and daemon ownership — suggesting the ecosystem is moving toward isolation as a reliability and security strategy, while OpenClaw's single-process model is beginning to show P0 strain around migration and cleanup.

---

## 6. Community Momentum & Maturity

**Tier 1 — Rapid iteration (daily merges, active user feedback, weekly release cadence unless blocked):**
- **IronClaw** — 18 PRs merged in 24h; in RC phase; QA bug-bash drives prioritized fixes. Highest velocity-to-quality ratio.
- **LobsterAI** — 12 merged, shipped patch release in 24h. Strong stability-focused release discipline.
- **CoPaw** — 5 merged, 20+ active issues; first-time contributors merged. Healthy contributor pipeline.

**Tier 2 — High activity with structural friction (large backlog, some stale items):**
- **OpenClaw** — Massive volume but 432 open issues and multi-month P1s (#44925, #86519) indicate **maintainer bandwidth is the bottleneck**. Still the reference implementation.
- **ZeroClaw** — Active but RFC-review-latency is high (RFCs take 1–2+ months). 49 open PRs vs 1 merged suggests review-pipeline saturation.
- **NanoClaw** — Healthy contributor flow but core bugs (#2006, #2528) are 3+ months old; review cycle prioritization needed.

**Tier 3 — Stabilizing / low activity:**
- **NanoBot** — Small issue count, rapid fixes, but low volume. Consolidating toward WebUI feature set.
- **NullClaw / PicoClaw** — Focused maintenance; slow but deliberate review. No new bugs; risk of stagnation.

**Tier 4 — Dormant:** TinyClaw, Moltis, ZeptoClaw, EasyClaw (no activity).

**Momentum signal:** IronClaw, LobsterAI, and CoPaw are the only projects **converting community feedback into merged fixes within 24 hours**. OpenClaw and ZeroClaw, despite scale, have notification-latency gaps (users silently blocked for months).

---

## 7. Trend Signals

1. **Agent truthfulness is the next quality frontier.** IronClaw’s QA cluster (fabricated automation status, false GitHub-connection claims, guessed MCP auth) points to a systemic gap: agents **report state they have not verified**. Expect tool-use verification, capability probing, and "I don't know" fallbacks to become standard features.

2. **MCP is becoming a reliability bottleneck — not a convenience layer.** Across CoPaw (periodic tool loss, dropped timeouts), IronClaw (invalid endpoints, auth guessing), and NanoBot (error-envelope misclassification), the ecosystem is converging on a need for **MCP client hardening**: endpoint validation, timeout config, error taxonomy, and retry semantics.

3. **Config-as-code pressure is building.** ZeroClaw's RFC #9346 (unified catalog), IronClaw's epic #3036 (tenant blueprints), SteelClaw-adjacent demand for declarative config — plus LobsterAI's `openclaw.json` overwrite complaint — signal that operators want schema-backed, auditable, versionable configuration instead of hand-edited dotfiles.

4. **Model fallback chains are becoming a base expectation.** CoPaw shipped fallback config; PicoClaw has a fallback chain PR; ZeroClaw fixed OpenRouter streaming body-drop; NanoBot added provider-native toggles. Users are building production workflows and tolerating no single-provider outage.

5. **Session memory hygiene is a differentiator.** OpenClaw (memory trust tagging, 27 comments), ZeroClaw (provenance/reply contracts RFC), CoPaw (context compaction stripping thinking blocks), Nabobot's Temporary Chat — across the ecosystem, the question "what should the model remember and trust?" is moving to center stage.

6. **Cross-channel attachment durability is a persistent gap.** IronClaw added durable attachments; NanoClaw's Signal-media bug is 3 months old; LobsterAI's Slack-thread attachments fail. Files, images, PDFs crossing channels remains fragile across the board — a high-value hardening target.

7. **First-time contributor success is a health indicator.** CoPaw merged first-timer fix (DeepSeek `reasoning_content`); NanoClaw and NanoBot both have community-authored fixes in review. Projects with low contributor-barrier (CoPaw, NanoBot, IronClaw) are gaining momentum; OpenClaw's bot-driven contributions (ClawSweeper) suggest scale but also a risk of depersonalized maintenance.

---

*Prepared 2026-08-06 from community digest data. Metrics reflect 24h windows; health scores are analyst estimates, not official project values.*

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot Project Digest — 2026-08-06

## 1. Today's Overview
NanoBot is in a highly active development cycle, with 15 pull requests updated in the last 24 hours and 4 open issues being tracked. The project shows strong momentum across multiple fronts: a new provider integration (Meta-Search Tool) was successfully merged, a significant security fix for credential leak prevention is in review, and a major WebUI feature set (Temporary Chat mode, interactive project terminal) is progressing through the PR pipeline. Merge activity is healthy (7 PRs closed/merged), with core maintainers (chengyongru) driving the majority of changes. The issue tracker remains light, but several user-facing bugs around goal continuation and audio handling indicate real-world usage is surfacing edge cases.

## 2. Releases
No new releases were published in the last 24 hours.

## 3. Project Progress
The following PRs were merged or closed during this period:

- **[PR #5234 - feat(agent): integrate mst-python as a metasearch provider](https://github.com/HKUDS/nanobot/pull/5234)** — Adds a new web search provider that aggregates results from DuckDuckGo, Google, Brave, and Bing using Reciprocal Rank Fusion. This materially improves search coverage for agents.
- **[PR #5203 - fix(whatsapp): detect outbound media content before dispatch](https://github.com/HKUDS/nanobot/pull/5203)** — Fixes a dispatch bug that relied on file extensions rather than content sniffing; unsupported audio now falls back to document delivery.
- **[PR #5238 - refactor(session): remove request-scoped access grants](https://github.com/HKUDS/nanobot/pull/5238)** — Simplifies the tool authorization model by removing the session-read grant layer, making `Tool.enabled()` the single construction-time switch.
- **[PR #5249 - refactor(webui): improve visual consistency](https://github.com/HKUDS/nanobot/pull/5249)** — Standardizes menus, popovers, and dialogs with a two-level elevation system; removes replay animations from persisted messages.
- **[PR #5250 - fix(webui): feather clipped activity edges](https://github.com/HKUDS/nanobot/pull/5250)** — Adds direction-aware fade effects to clipped agent activity panes for a clearer visual boundary.
- **[PR #5254 - feat: add provider-native request switches](https://github.com/HKUDS/nanobot/pull/5254)** — Adds WebUI toggles for OpenAI Codex Fast mode, web search, and Grok X Search via raw `extraBody` modifications.

## 4. Community Hot Topics
- **[Issue #5149 - "no audio?" (4 comments)](https://github.com/HKUDS/nanobot/issues/5149)** — The most engaged discussion this cycle. A user reports that WhatsApp audio file delivery fails; the log points to a neonize ffmpeg warning. The topic remains open, though the related fix PR #5203 was merged. Active community interest suggests this is a common integration pain point.
- **[Issue #5237 - "MCP tool returns 'data not found' envelope" (2 comments)](https://github.com/HKUDS/nanobot/issues/5237)** — A subtle but critical bug: when an MCP server returns a business error envelope with `isError=false`, the agent treats it as success and stalls until timeout. This touches misclassification at the tool boundary and is likely to gain more traction as MCP adoption grows.
- **[PR #5259 - "enforce memory-only temporary sessions"](https://github.com/HKUDS/nanobot/pull/5259)** — Stacked on top of the Temporary Chat PR, this is actively discussed and reviewed, signaling that session memory hygiene is a high-priority concern for the maintainers.

## 5. Bugs & Stability

| Severity | Issue/PR | Description |
|----------|----------|-------------|
| High | [Issue #5237](https://github.com/HKUDS/nanobot/issues/5237) | MCP business errors with `isError=false` are treated as success; agent loops until timeout. Not yet fixed. |
| High | [Issue #5256](https://github.com/HKUDS/nanobot/issues/5256) | `/goal` produces dozens of repeated replies while waiting for user input. Fix exists: [PR #5257](https://github.com/HKUDS/nanobot/pull/5257) (bound goal continuation when idle). |
| Medium | [Issue #5149](https://github.com/HKUDS/nanobot/issues/5149) | Outbound WhatsApp audio delivery broken. Fix merged in PR #5203 (media detection before dispatch). |
| Medium | [PR #5248](https://github.com/HKUDS/nanobot/pull/5248) | Matrix room joins fail on Continuwuity due to empty POST body. Fix submitted but still open. |
| Low | [PR #5260](https://github.com/HKUDS/nanobot/pull/5260) | Runtime files inside tracked workspace dirs pollute memory artifacts. Fix submitted, not yet merged. |

The repository shows a healthy pattern: bug reports are quickly followed by targeted fix PRs. However, the high-severity MCP error-envelope issue remains open with no linked fix yet.

## 6. Feature Requests & Roadmap Signals
- **[Enhancement #5251 - MCP Apps host support in the WebUI](https://github.com/HKUDS/nanobot/issues/5251)** — This is the clearest roadmap signal: users want MCP servers to attach interactive UI components (from the official `io.modelcontextprotocol/ui` extension) instead of rendering results purely as text or images. Given the recent MCP integration work, this is a strong candidate for the next minor release.
- **Temporary Chat mode is actively being built** — Both PR #5252 (feature) and PR #5259 (memory enforcement) are open and progressing. Expect this to land soon and likely appear in the next release.
- **Provider-specific toggles (PR #5254)** and a **shared project terminal (PR #5253)** are both WebUI features under active development, indicating an emphasis on user-facing workflow enhancements over pure backend changes.
- **Truthful API status for externally-managed servers (draft PR #5255)** suggests improvements to operational transparency are under consideration.

## 7. User Feedback Summary
**Pain points:**
- **Goal-loop frustration:** A user reports that a single `/goal` message triggers dozens of near-identical replies, stopping only after manual intervention. This is a visible user-facing failure of agent self-regulation, and the submitted fix (PR #5257) is a direct response.
- **Invisible MCP failures:** When an external tool returns a business error in a success envelope, the agent silently spins until timeout, wasting tokens and latency. The tool-boundary semantics are clearly misaligned with real MCP server behavior.
- **Audio delivery on WhatsApp:** A user acting as the integrator expects audio files to be received by contacts, but delivery fails. The merged fix (PR #5203) addresses this by content-based detection, suggesting the root cause was format misclassification.

**Positive signals:** The WebUI refactors (visual consistency, edge feathering) indicate the maintainers are investing in polish at a high rate, and the rapid turnaround on the WhatsApp media fix (August 1 → August 5) shows responsiveness to integration issues.

## 8. Backlog Watch
- **[Issue #5237 - MCP error envelope mishandling](https://github.com/HKUDS/nanobot/issues/5237)** — Only 1 day old, but severe in impact (silent timeouts on every MCP failure). No fix PR yet. Needs early maintainer attention.
- **[PR #5248 - Matrix room join empty body fix](https://github.com/HKUDS/nanobot/pull/5248)** — Submitted August 4, still open. Low-difficulty, targeted bug fix that unblocks Continuwuity homeservers; at risk of being buried under PR volume.
- **[Issue #5149 - Audio delivery on WhatsApp](https://github.com/HKUDS/nanobot/issues/5149)** — Open since July 28; the fix was merged, but the issue itself has not been closed. Maintainers should verify the fix resolves the reporter’s scenario and close the loop.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-08-06

## 1. Today's Overview

ZeroClaw shows a high-activity day focused on security hardening, RFC governance, and architectural decision-making. 50 issues and 50 PRs were updated in the last 24 hours, with 10 issues closed and 1 PR merged, while 40 issues remain active. The project is in a heavy RFC/review phase, with many significant proposals (auth, sessions, tool policy, chat completions) awaiting maintainer decisions. A steady stream of new bug reports indicates an active testing community, particularly around security boundaries, channel authorization, and cron system behavior. Notably, 49 PRs remain open, indicating a potential bottleneck in review capacity relative to contribution volume.

## 2. Releases

No new releases were published in the last 24 hours.

## 3. Project Progress

One PR was closed/merged in the last 24 hours:
- **[#9750 [CLOSED] fix(service): bound launcher-owned daemon logs](https://github.com/zeroclaw-labs/zeroclaw/pull/9750)** — A large (XL) fix that replaces unbounded fixed-file daemon redirection with a shared service supervisor using bounded nonblocking queues, keeping each launcher-owned capture file at or below 8 MiB. A follow-up PR, **[#9773 fix(service): bound launchd daemon logs](https://github.com/zeroclaw-labs/zeroclaw/pull/9773)**, was opened to apply the same treatment to macOS LaunchAgent logs.

Several new PRs were opened today that advance security and correctness work:
- **[#9781 fix(runtime): validate WebAuthn assertion data](https://github.com/zeroclaw-labs/zeroclaw/pull/9781)** — Rejects malformed authenticator data, binds assertions to the configured relying-party ID, and requires the User Present flag.
- **[#9776 feat(security): extend forbidden_paths with workspace-relative glob patterns](https://github.com/zeroclaw-labs/zeroclaw/pull/9776)** — Implements the proposal from RFC #8424 with a new `ForbiddenPatternSet` categorizing entries into globs, exact paths, directory prefixes, and basenames.
- **[#9777 fix(channels): accept Signal source UUID senders](https://github.com/zeroclaw-labs/zeroclaw/pull/9777)** — Deserializes Signal's `sourceUuid` envelope field so phone-number-private senders retain usable identity.
- **[#9778 docs(foundations): reconcile revision histories](https://github.com/zeroclaw-labs/zeroclaw/pull/9778)** — Backfills omitted revision rows for FND-001 through FND-005.

## 4. Community Hot Topics

The most active discussions revolve around the project's RFC process and architectural direction:

- **[#6808 RFC: Work Lanes, Board Automation, and Label Cleanup](https://github.com/zeroclaw-labs/zeroclaw/issues/6808)** (18 comments) — A governance-heavy RFC in its 24th revision, indicating a long, careful review process. Authors are actively refining scope with maintainer input.
- **[#8303 RFC: Goal mode v1 — bounded foreground Matrix work](https://github.com/zeroclaw-labs/zeroclaw/issues/8303)** (18 comments, 1 👍) — The community is pushing for a durable, bounded user-objective mode that spans multiple agent turns, but maintainers appear cautious about scope creep beyond the core control-plane need.
- **[#8603 RFC: ZeroClaw Chat Completions profile](https://github.com/zeroclaw-labs/zeroclaw/issues/8603)** (16 comments) — Strong desire for OpenAI-compatible HTTP exposure to integrate with Open WebUI, LobeChat, Continue.dev, Aider, and similar clients. This is a high-impact feature for ecosystem adoption.
- **[#7155 RFC: Per-execution confirmation tier for high-risk shell commands](https://github.com/zeroclaw-labs/zeroclaw/issues/7155)** (16 comments) — Users demand a Claude Code-style allow/ask/deny policy, which speaks to a broader need for safety without sacrificing automation flexibility.
- **[#7141 RFC: Pluggable inbound authentication and canonical principals](https://github.com/zeroclaw-labs/zeroclaw/issues/7141)** (12 comments) — Deep discussion on OIDC and identity architecture, now at Revision 8 after two months of iteration.

Underlying need: The community wants ZeroClaw to be production-hardened for real-world deployment — authentication, authorization, safe shell execution, and OpenAI-compatible APIs. The RFC process is active and engaged, but **slow**: most RFCs have been in review for 1–2 months, which may frustrate contributors.

## 5. Bugs & Stability

**High severity (S1 — workflow blocked):**
- **[#9775 [Bug]: OpenRouter streaming requests drop provider_extra](https://github.com/zeroclaw-labs/zeroclaw/issues/9775)** — The `stream_chat` path bypasses `merge_extra_body`, causing every configured `provider_extra` to be lost on streaming requests. No fix PR open yet.

**High severity (S2 — degraded behavior, security):**
- **[#9328 [Bug]: verifiable-intent evaluates constraints without verifying the credential chain](https://github.com/zeroclaw-labs/zeroclaw/issues/9328)** — `vi_verify`'s `evaluate_constraints` checks L2 constraints against caller-supplied fulfillment without cryptographic chain verification. Accepted, no fix PR yet.
- **[#9768 [Bug]: daemon reload is not on SIGUSR1, and the degraded-security warning tells operators to send a signal that kills the daemon](https://github.com/zeroclaw-labs/zeroclaw/issues/9768)** — Documentation/behavior mismatch that could cause operators to kill their daemon instead of reloading it.
- **[#9697 [Bug]: ZeroCode cannot connect to daemon launched by Windows Task Scheduler](https://github.com/zeroclaw-labs/zeroclaw/issues/9697)** — A regression-ish issue in `zerocode/tui` where the daemon never becomes ready. Accepted, no fix PR yet.

**Medium severity:**
- **[#8642 [Bug]: MCP/tool-schema cloning drives unbounded RSS growth in the agent loop](https://github.com/zeroclaw-labs/zeroclaw/issues/8642)** — Known memory-growth path causing OOM in WSL2. Accepted and in-progress.
- **[#9779 [Bug]: sops_dir documented default is not honored — SOPs silently never load](https://github.com/zeroclaw-labs/zeroclaw/issues/9779)** — Configuration default mismatch causes silent subsystem failure, and cron/channel loops depending on SOPs will never fire.
- **[#9780 [Bug]: cron-triggered SOPs cannot do network work](https://github.com/zeroclaw-labs/zeroclaw/issues/9780)** — No HTTP capability in SOP capability set; shell.exec and notify.channel are unsatisfiable placeholders.

**Fixed today:**
- **[#9462 [CLOSED] zeroclaw-plugins lib unit tests behind the plugins-wasmtime feature never execute in CI](https://github.com/zeroclaw-labs/zeroclaw/issues/9462)** — CI gap closed.
- **[#7467 [CLOSED] Support cursor navigation while editing string settings in Zerocode](https://github.com/zeroclaw-labs/zeroclaw/issues/7467)** — UX improvement landed.
- **[#6350 [CLOSED] WhatsApp Web — allowed-numbers bypassed for LID-based contacts](https://github.com/zeroclaw-labs/zeroclaw/issues/6350)** — Security-critical channel bug resolved.

## 6. Feature Requests & Roadmap Signals

Strong roadmap signals point toward a **v0.9.0 milestone focused on auth, security, and breaking changes**, tracked in **[#7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432)**. Likely candidates for the next version:

- **OpenAI-compatible Chat Completions API** ([#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603)) — High-value for ecosystem integrations; expect to land after the auth/gateway work.
- **Pluggable inbound auth and canonical principals** ([#7141](https://github.com/zeroclaw-labs/zeroclaw/issues/7141)) — Rev 8, actively refined; likely to land in v0.9.0 as a breaking change.
- **Runtime-owned conversation sessions and transport surface adapters** ([#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487)) — A major architectural shift; the related ownership boundary (with #9488 and #9600) is ratified, but implementation is large.
- **Shell command policy (allow/ask/deny)** ([#7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155)) — Narrowed scope confirms it's about to move; likely to appear soon.
- **Workspace-relative forbidden path globs** — Already implemented in PR [#9776](https://github.com/zeroclaw-labs/zeroclaw/pull/9776), so RFC #8424 is effectively shipping today.
- **Stored Anthropic OAuth profiles** — PR [#9420](https://github.com/zeroclaw-labs/zeroclaw/pull/9420) is large (XL) and needs author action; RFC #9464 is in-progress and awaiting maintainer confirmation.

## 7. User Feedback Summary

- **Positive:** The community is deeply engaged with the project's governance — multiple contributors draft, revise, and co-author RFCs with maintainers. PRs carry detailed, well-structured summaries, and the contributor ladder (principal, distinguished, trusted) suggests a healthy recognition system.
- **Pain point — review latency:** Many PRs are tagged `needs-author-action` and have been open for weeks ([#8826](https://github.com/zeroclaw-labs/zeroclaw/pull/8826) since July 8, [#8928](https://github.com/zeroclaw-labs/zeroclaw/pull/8928) since July 10, [#8496](https://github.com/zeroclaw-labs/zeroclaw/pull/8496) since June 29). This suggests either author response gaps or maintainer bandwidth constraints.
- **Pain point — configuration defaults that silently do nothing:** Multiple issues (#9779, #9780) report documented defaults that the daemon ignores silently, causing hard-to-diagnose failures.
- **Pain point — cost:** Users are concerned about LLM API costs (see [#9631](https://github.com/zeroclaw-labs/zeroclaw/issues/9631) on OpenRouter prompt caching), indicating real production usage with significant token volumes.

## 8. Backlog Watch

- **[#6909 RFC: Computer-use support for desktop screen interaction and input control](https://github.com/zeroclaw-labs/zeroclaw/issues/6909)** — Open since May 25, 8 comments, tagged `needs-author-action`. A huge feature (desktop automation) with an unmaintained area. No visible movement toward implementation.
- **[#6954 RFC: Provenance, conversation binding, and reply contract for internally initiated agent turns](https://github.com/zeroclaw-labs/zeroclaw/issues/6954)** — Open since May 26, 9 comments, revised on Aug 5 with four boundary clarifications. Still awaiting maintainer review despite ratification correction.
- **[#8424 RFC: Workspace-relative forbidden path patterns and optional .zeroclawignore](https://github.com/zeroclaw-labs/zeroclaw/issues/8424)** — Tagged `needs-author-action`; PR [#9776](https://github.com/zeroclaw-labs/zeroclaw/pull/9776) implements the core proposal, but the issue itself remains unclosed. Needs final review and closure.
- **[#8832 RFC: Plugin-owned Kanban board for agent work](https://github.com/zeroclaw-labs/zeroclaw/issues/8832)** — Open since July 8, 8 comments, no maintainer decision yet. Related to #6808 governance work; possibly blocked by the Work Lanes RFC.
- **[#9346 RFC: Unified package/capability/config/runtime-state catalog contract](https://github.com/zeroclaw-labs/zeroclaw/issues/9346)** — 3 comments in 2 weeks, needs maintainer review (`needs-maintainer-review` label). Given its cross-cutting scope (packages, capabilities, config), it likely needs a dedicated design session.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

## Today's Overview

PicoClaw shows moderate activity on 2026-08-05, with 4 pull requests updated in the last 24 hours but no new releases and no newly opened or updated issues. The project is in a healthy maintenance phase, with activity concentrated on feature development rather than bug fixing. Notably, three open PRs have remained in progress for extended periods (ranging from 4 to 5 months), suggesting a slower review cycle. The single merged PR (#926) represents a significant capability addition for Anthropic authentication. No issues were reported or updated, indicating the project is currently stable from a user-reported bug perspective.

## Releases

No new releases were published in the last 24 hours. The latest release information is not available in this data set.

## Project Progress

PR [#926](https://github.com/sipeed/picoclaw/pull/926) was closed on 2026-08-05 after being authored on 2026-02-28, marking a major milestone for the project after a ~5-month review cycle. This PR adds Anthropic OAuth setup-token login (`sk-ant-oat01-*` tokens) as an alternative to API keys, introduces a `--setup-token` flag and interactive login menu, integrates Anthropic usage endpoint data into `auth status` (displaying 5-hour and 7-day utilization), and adds streaming support for OAuth tokens. Given the closure status, this likely represents a merged feature that substantially expands Anthropic integration capabilities.

## Community Hot Topics

No issues or PRs have gathered significant comments or reactions, with all PRs showing 0 👍 reactions. The most substantive ongoing discussion areas include:

- **[PR #3200](https://github.com/sipeed/picoclaw/pull/3200) — Configurable default fallback chain for models**: This long-running PR (opened 2026-07-01) addresses model reliability. The underlying need is users wanting automated model fallback behavior in the web UI, prioritizing which models are tried when the default fails, with persistence through the backend API. This indicates production usage where model outages are a concern.

- **[PR #1951](https://github.com/sipeed/picoclaw/pull/1951) — Moving installation scripts to the main repo**: This process-oriented PR consolidates documentation infrastructure, suggesting the project is maturing its developer experience and installation flow. The related docs PR reference indicates coordination between repos.

## Bugs & Stability

A single bug-related item surfaced today:

- **[PR #3318](https://github.com/sipeed/picoclaw/pull/3318) — Unparseable `pnpm-lock.yaml` (Medium severity)**: The lockfile lists `semver@7.8.5` twice under `packages:` and `snapshots:` sections, causing YAML duplicate mapping key errors (`ERR_PNPM_BROKEN_LOCKFILE`) that prevent pnpm from working. This is a build/developer-experience blocker for anyone using the web frontend with pnpm. The fix PR was opened by nuestraai and is currently open awaiting review. This is not a runtime bug but blocks local development and CI workflows.

## Feature Requests & Roadmap Signals

The open PRs signal strong roadmap directions:

- **Model fallback chains** ([PR #3200](https://github.com/sipeed/picoclaw/pull/3200)): Configurable default fallback chains for models with persistence via backend API. This likely lands in the next release given the dedicated web-UI workflow designed for it. The feature includes setting default models, adding fallback models, reordering chains, and saving the full configuration.

- **Anthropic OAuth support** ([PR #926](https://github.com/sipeed/picoclaw/pull/926)): Now closed, this adds setup-token login and streaming support for OAuth tokens. Users can expect this in the upcoming release, representing enhanced authentication flexibility and usage monitoring.

- **Consolidated installation scripts** ([PR #1951](https://github.com/sipeed/picoclaw/pull/1951)): Moving install scripts into the main repo suggests an upcoming focus on simplifying onboarding, possibly setting up for more automated install methods.

## User Feedback Summary

While no direct issues were filed in the last 24 hours, the PR activity reveals user pain points:

- **Authentication friction**: The Anthropic OAuth setup-token feature directly addresses users who prefer OAuth tokens over API keys, likely for security or session management reasons. The usage endpoint display suggests users want visibility into their token consumption (5-hour and 7-day windows).

- **Model reliability**: The fallback chain request implies users are experiencing model failures/outages and want automated failover rather than manual intervention.

- **Build environment friction**: The broken `pnpm-lock.yaml` indicates users attempting to set up the web frontend are hitting immediate blockers, though the fix is straightforward.

No explicit satisfaction signals (reactions, positive comments) were captured in this data set.

## Backlog Watch

- **[PR #1951](https://github.com/sipeed/picoclaw/pull/1951) — Installation scripts migration**: Open since 2026-03-24 (~4.5 months), this PR awaits maintainer review/merge. The feature is low-risk but has been stalled, potentially blocking other documentation work.

- **[PR #3200](https://github.com/sipeed/picoclaw/pull/3200) — Fallback chain feature**: Open since 2026-07-01 (~5 weeks), this substantial feature has not received maintainer feedback. Given its scope (web UI + backend persistence), it may need design review before merging.

- **[PR #3318](https://github.com/sipeed/picoclaw/pull/3318) — pnpm-lockfile fix**: Opened just today; needs quick maintainer review as it blocks all pnpm-based workflows on the frontend.

- **[PR #926](https://github.com/sipeed/picoclaw/pull/926)**: Closed after 5 months, demonstrating that long-lived PRs do eventually get resolved. However, the review cadence suggests maintainers may be under-resourced relative to contribution volume.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

**NanoClaw Project Digest – 2026-08-06**

### 1. Today's Overview
NanoClaw is in a period of moderate, focused activity. While no new releases were published, the project saw a healthy flow of 12 Pull Requests updated in the last 24 hours, with 2 being merged/closed and 10 remaining in active review. Development efforts are concentrated on core reliability fixes—specifically database write-path integrity, attachment handling, and channel adapter robustness—alongside a steady stream of new utility skill contributions. Two long-standing bugs (Signal attachments and Docker permissions) remain open and are now over two months old, suggesting they are proving nontrivial to resolve. The project's health is stable, with a clear focus on hardening critical infrastructure through internal refactors and bug fixes rather than chasing new features.

### 2. Releases
No new releases were published during this period. The latest release remains the last tagged version before August 6, 2026.

### 3. Project Progress
Two Pull Requests were merged or closed in the last 24 hours, both addressing core agent-runner logic:
- **[#3187 – fix(agent-runner): disallow built-in SendMessage so agent-to-agent messaging works]** (Merged). Added a guard in the agent runner to prevent the built-in `SendMessage` tool from being invoked directly, which was likely interfering with the established agent-to-agent communication path.
- **[#3175 – fix: route command-gate denials through the delivery adapter, not outbound.db]** (Closed). This PR was closed, likely in favor of its updated twin, **#3192**, which remains open and proposes the same fix. **#3192** addresses a critical data-integrity issue where the host process was writing directly into a container-owned `outbound.db`, violating the project’s single-writer invariant and risking database corruption.

### 4. Community Hot Topics
The most actively discussed items are the two long-standing open bugs, both of which have accumulated comments over time and continue to be updated:
- **[#2528: Signal channel: image/PDF attachments unreachable from agent container]** (Open) – Reports that media files sent via Signal arrive on the host but cannot be accessed from within the agent container. Related fix PR **#3156** (carry channel attachments as structured parts) has been flagged as “follows-guidelines” and is open, signaling an active effort to solve this problem.
- **[#2006: Fresh install on Debian 12 LXC: docker socket permission denied]** (Open) – A fresh install on a Proxmox LXC container fails when the setup script tries to use Docker after adding the user to the group, as the new group membership doesn’t apply to the current shell session. This is a common Linux user-management pitfall that appears to have a straightforward fix in the installation shell script.

The sheer volume of open PRs (10) suggests active contributions from the community, with many submitted in the last two days, indicating a vibrant contributor base.

### 5. Bugs & Stability
One new bug fix was submitted, while the severity of existing issues remains high due to their age and impact on core functionality:
- *(High/New)* **PR #3187 (Merged)** – Fixed a bug where the built-in `SendMessage` tool was incorrectly allowed, breaking agent-to-agent messaging in the agent runner.
- *(High/Open)* **Issue #2528** – Signal attachments are unreachable from inside the agent container, rendering image/PDF file analysis impossible over that channel. An open PR (#3156) specifically targets this fix.
- *(High/Open)* **Issue #2006** – Fresh installs on Debian 12 LXC fail due to Docker socket permission denial during the setup process, preventing users from getting the system running.
- *(Medium/Open)* **PR #3191** – Uncovers a robustness gap where WhatsApp `setup()` hangs indefinitely if the session is logged out, blocking the entire host startup.
- *(Medium/Open)* **PR #3188** – MCP servers spawned as child processes do not inherit critical environment variables like `HTTPS_PROXY`, which could cause connectivity and TLS failures in proxied environments.

### 6. Feature Requests & Roadmap Signals
The project is receiving a steady stream of new skill and channel additions, which indicates a strong focus on extensibility for the upcoming release:
- **New Utility Skills**: The project is clearly gathering more utility skills, with submissions for **Tavily MCP tool** (#3190), **add-why** (explains a single message) (#3189), and removal of stale **Qodo/Google MCP skills** (#3172). This suggests a roadmap toward a richer, modular ecosystem.
- **New Channel Support**: **[PR #3050: add Dial to the channel picker]** is a significant, long-running feature designed to add Dial as a fully-supported channel, integrating it into the setup wizard and skill runner. Its continued activity suggests it is a major feature candidate for the next release.
- **Infrastructure Refactor**: The numerous “host seams for skill-owned capabilities” (#3186) and the database write-path fix (#3192) point to an architectural focus on separating host and container responsibilities to improve stability and security.

### 7. User Feedback Summary
The following insights reflect user experiences and pain points observed in this period:
- **Setup friction for new users**: New users on containerized environments (LXC) hit immediate, frustrating blockers with Docker permissions during initial setup, preventing them from even getting started.
- **File/media handling is a common need**: The Signal attachment bug suggests users actively rely on the bot in group chats for file analysis, and have valuable use cases (like analyzing shared images or PDFs) that are currently broken.
- **Operational reliability matters**: Contributors are prioritizing fixing hangs and hangs-related bugs (e.g., WhatsApp startup) over new features, a strong signal that the community values the assistant as a always-on, dependable background service.
- **Contributor activity is healthy**: A surge of new PRs within the last 48 hours indicates strong community engagement, with contributors adhering to the specified contribution guidelines (“follows-guidelines”).

### 8. Backlog Watch
The following items are older, unresolved, and likely require maintainer attention to either fix, provide guidance, or reject:
- **[#2006: Fresh install on Debian 12 LXC: docker socket permission denied]** – This bug is over three months old (created 2026-04-25) and is a critical onboarding blocker in common Proxmox environments. Silence on a fix is concerning for user trust.
- **[#2528: Signal channel: image/PDF attachments unreachable]** – This issue is nearly three months old (created 2026-05-18) and involves a core supported channel. While a fix PR exists (#3156), its review-cycle needs to be prioritized.
- **[#3050: feat(setup): add Dial to the channel picker]** – This substantial feature PR has been open for over three weeks (created 2026-07-14). Given its complexity and label ["PR: Feature, PR: Skill, follows-guidelines"], it requires thorough maintainer review and could be a hallmark feature of the next major release.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw Project Digest — 2026-08-06

## 1. Today's Overview
NullClaw shows steady, focused maintenance activity. Two runtime-stability pull requests were updated in the last 24 hours, both authored by the same contributor addressing long-standing channel polling and session stack issues. No new releases or issues were created today, indicating a stable period with targeted work rather than a broad feature push. The project appears healthy, with the maintainer actively reviewing infrastructure-level fixes that address user-reported outages.

## 2. Releases
No new releases published this period.

## 3. Project Progress
No PRs were merged or closed today. Two open PRs advanced the codebase toward fixing known runtime instability:
- **#985** — Proposed fix to give the agent turn path a dedicated 16 MiB stack, decoupling it from the 2 MiB heavy runtime stack constant, addressing a suspected stack overflow in session processing.
- **#984** — Fix for Telegram/Matrix channels going silent after idle periods, correcting the supervisor loop's inability to detect and age out dead polling threads.

## 4. Community Hot Topics
Both active PRs directly respond to prior user-reported bugs (#976 and #972), indicating the community's most pressing concerns are runtime reliability:
- **[PR #985: fix(runtime): give the agent turn path a 16 MiB stack](https://github.com/nullclaw/nullclaw/pull/985)** — Addresses a likely crash/stack overflow in the agent turn execution path.
- **[PR #984: fix(channels): let poll failures age out a dead polling thread](https://github.com/nullclaw/nullclaw/pull/984)** — Targets silent failures of Telegram and Matrix integrations after prolonged idle periods.

The underlying need is clearly for headless/always-on operation reliability—users expect the agent to remain responsive across days without gateway restarts.

## 5. Bugs & Stability
Two stability issues are being actively remediated:
- **High severity (fix in progress via #985):** Session turn path stack size aliased to the heavy runtime stack (2 MiB), likely causing stack exhaustion during complex agent turns.
- **High severity (fix in progress via #984):** Telegram/Matrix polling threads die silently after idle nights; supervisor logic failed to detect the dead threads, requiring full gateway restarts. Structural blind spot in the supervisor code.

Both have open fix PRs; no crash reports were newly filed today.

## 6. Feature Requests & Roadmap Signals
No new feature requests surfaced in the last 24 hours. The focus remains on hardening existing infrastructure. Based on the two fix PRs, the near-term roadmap likely prioritizes runtime resource isolation (dedicated stacks) and more robust channel-supervision logic. Users may expect the next minor release to include these reliability fixes with no breaking changes.

## 7. User Feedback Summary
While no direct comments were recorded today, the referenced issues (#976, #972) reveal clear user pain points:
- **Pain point:** Agents crash or misbehave during extended turn execution (suspected stack overflow).
- **Pain point:** Long-running gateway processes lose connectivity to messaging channels after idle periods, with no self-recovery.
- **Satisfaction signal:** The contributor's prompt response with targeted root-cause analysis and fixes suggests an engaged maintainer-community loop; users are likely satisfied with the diagnostic quality.

## 8. Backlog Watch
No long-unanswered issues or PRs are in the current active set requiring maintainer attention. The two open PRs have been updated recently and are moving through the review pipeline. No stale items were flagged in the last 24 hours.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-08-06

## 1. Today's Overview

IronClaw is in an active development and stabilization phase, with 43 issues and 50 PRs touched in the last 24 hours. The project is preparing its 1.1.0 release candidate (v1.1.0-rc.1 published August 3rd) with a strong focus on extension reach, including MCP server registration, IronHub deep links, durable file attachments, and Slack slash commands. A significant burst of QA bug-bash findings (8 issues filed by `joe-rlo`) highlights reliability concerns around agent truthfulness and MCP endpoint validation. The team is also converging on several large architectural efforts: the Skills epic (#6941), the config-as-code epic (#3036), and the Storybook/design-system initiative (#7038).

## 2. Releases

**ironclaw-v1.1.0-rc.1** (2026-08-03)

- **Headline features:** Registering arbitrary hosted MCP servers; installing from IronHub deep links; durable file attachments that cross channels; Slack `/ironclaw` slash commands.
- **Quality focus:** A broad pass on making failures legible (improved error messaging and diagnostics).
- **Migration notes:** No breaking changes or specific migration steps were documented in the release notes.

## 3. Project Progress

- **Merged/Closed PRs (18):**
  - **#7261** — `fix(ci): resolve release canary temp path` — Fixes a zero-job failure in the tag-only release workflow introduced by #7256; adds a workflow sabotage contract.
  - **#7196** — `chore(deps): bump the wasm group` — Updates `wasmtime-wasi`, `wit-component`, and `wit-parser`.
  - **#6831** — `feat(reborn): standardized messaging framework` — Host-owned standard ops with canonical contracts: 16 core operations, 13 reserved names, canonical schemas, and a 12-code error taxonomy.
- **Closed Issues (10):** Mostly E2E coverage epics (#7053, #7056, #4632, #6394, #6892) and CI stabilization (#7244), indicating continued maturation of the test and release infrastructure.
- **In-flight (open) large efforts:** Skills selection overhaul (#6938, #6745), durable delivery claims (#7029, #7028), sandbox profiles for Docker/Railway (#7214), and the Web Debug Inspector (#7230).

## 4. Community Hot Topics

- **[#3036 — Epic: Configuration-as-Code for IronClaw Reborn](https://github.com/nearai/ironclaw/issues/3036)** — 7 comments, 1 👍. Long-running epic (since April) requesting declarative tenant blueprints and use-case harnesses; addresses operator pain around hand-editing `.env`, workspace docs, and settings with no schema or audit trail. High demand signal for a unified config system.
- **[#7194 — Admin-allowed shared channel as outbound delivery target](https://github.com/nearai/ironclaw/issues/7194)** — 3 comments. Requests that the delivery layer (the sanctioned final-reply router) be able to target admin-approved shared Slack channels, not just DMs/private channels.
- **[#6257 — PDF attachment mime_type validation bug](https://github.com/nearai/ironclaw/issues/6257)** — 2 comments. Blocking users from sending/generating PDF files; suspected type-validation issue with `attachments.mime_type`.
- **QA Bug-Bash cluster (8 issues by `joe-rlo`)** — Active conversation around agent reliability. Key themes: the agent fabricates state (#7246), falsely claims connections exist (#7247), guesses MCP auth types (#7251), and accepts invalid MCP endpoints (#7248).

## 5. Bugs & Stability

**P1 (High):**
- **[#7246 — Agent hallucinates automation status](https://github.com/nearai/ironclaw/issues/7246)** — Claims automations run despite UI showing none. Agent-truthfulness defect.
- **[#7247 — Agent falsely claims GitHub is connected](https://github.com/nearai/ironclaw/issues/7247)** — No auth-state verification; next GitHub call fails.

**P2 (Medium):**
- **[#7248 — Invalid MCP endpoint accepted, run fails](https://github.com/nearai/ironclaw/issues/7248)** — Unverified endpoint registered as installed; agent loops on discovery.
- **[#7249 — Slack DM result delivered to Telegram](https://github.com/nearai/ironclaw/issues/7249)** — Cross-channel delivery leak; run summary goes to the wrong platform.
- **[#7250 — DeepWiki MCP misleading auth guidance](https://github.com/nearai/ironclaw/issues/7250)** — Speculates about auth instead of reporting actual network failure.
- **[#7251 — Agent guesses MCP authentication type](https://github.com/nearai/ironclaw/issues/7251)** — Asks user to choose auth instead of discovering/invoking the flow.
- **[#7209 — Regression gate can't see node:assert style](https://github.com/nearai/ironclaw/issues/7209)** — CI defect failing correct frontend PRs.

**P3 (Low):**
- **[#6257 — PDF mime_type validation error](https://github.com/nearai/ironclaw/issues/6257)** — 2 comments; suspected type-validation issue with attachments.
- **[#7254 — Cannot access Slack feedback-thread attachments](https://github.com/nearai/ironclaw/issues/7254)** — Files in feedback threads not downloadable.
- **[#7204 — WebUI composer focus papercuts](https://github.com/nearai/ironclaw/issues/7204)** — Already closed with a fix.

**Fix PRs in flight:** #7028 (preserve terminal status during delivery recovery), #7029 (restore durable delivery claim), #7048 (sanitize WASM guest diagnostics) — address delivery and sandbox reliability.

## 6. Feature Requests & Roadmap Signals

- **MCP endpoint validation & auth flow** (from QA bugs #7248, #7250, #7251) — Strong signal that MCP UX needs a real discovery/initiation flow and stricter validation. Likely targeted for a 1.1.x patch or 1.2.
- **Skill self-creation/selection** — Epic #6941 and PRs #6938, #6745, #7171 push toward model-driven skill choice and DB-backed skill mounts; core to the 1.1.0 line.
- **Config-as-Code** (#3036, open since April) — Tenant blueprints and use-case harnesses; could appear as a post-1.1 epic.
- **Web Debug Inspector** (#7218, #7230) — Operator-only tool for prompt/activity/model/tool introspection; in active implementation.
- **IronHub integration** (#6731) — Runtime tool/skill marketplace; tracked under v1.1.0.
- **Design System + Storybook** (#7038 + PRs #7039, #7043, #7255) — Governance-adjacent but signals investment in UI consistency.

## 7. User Feedback Summary

- **Positive:** Extension reach (MCP, IronHub, attachments, Slack commands) in the RC is the headline value; durable file attachments and cross-channel behavior are called out as wins.
- **Pain points:**
  - **Agent truthfulness** (automation status, GitHub connection, MCP capabilities) — users cannot trust agent-reported state; silent hallucination is the top complaint.
  - **MCP onboarding** — the agent "guesses" auth types and accepts invalid endpoints; users want discovery and verification, not speculation.
  - **Cross-channel routing** — a Slack DM's result landing in Telegram is a jarring, confusing failure.
  - **Configuration fragility** — operators want declarative, schema-backed config instead of hand-editing scattered files.
  - **Regression gate friction** — frontend-only PRs fail CI due to assertion-style detection, wasting maintainer time.

## 8. Backlog Watch

- **[#5101 — Reuse cargo-component installer in live canary](https://github.com/nearai/ironclaw/pull/5101)** — Open since June 20; low-risk CI improvement, 47 days old.
- **[#741 — Bedrock streaming via `converse_stream()`](https://github.com/nearai/ironclaw/issues/741)** — Open since March 8; still unaddressed, an AWS-provider capability gap.
- **[#3036 — Config-as-Code Epic](https://github.com/nearai/ironclaw/issues/3036)** — 100 days old; strategic and still in scoping.
- **[#6578 — Admin-Managed Agents as UserId Subjects](https://github.com/nearai/ironclaw/issues/6578)** — Open since July 23; no comments beyond the author, represents an identity-model expansion that may need design attention.
- **[#7231 — "APPROVE" comments never submit real GitHub approvals](https://github.com/nearai/ironclaw/issues/7231)** — New but silent; blocks PRs in the merge queue and needs a tooling fix (likely in the `skills/` review surfaces).

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI Project Digest — 2026-08-06

## Today's Overview
LobsterAI shipped a new patch release (2026.8.5) with three merged features and closed 12 PRs within 24 hours, indicating steady delivery velocity. Activity was concentrated in the renderer and cowork areas, with substantial stability improvements to window lifecycle, shutdown behavior, and OpenClaw gateway lock handling. Three issues remain open and active, two of which were filed today and center on system prompt duplication and skill toggle reliability — both pointing to persistent user frustration with prompt management. The project shows a healthy mix of feature polish, infrastructure hardening, and active community-driven bug reporting.

## Releases
**LobsterAI 2026.8.5** — Released 2026-08-05

**What's Changed:**
- **feat(activity):** Native daily check-in experience added (PR #2408)
- **feat(enterprise):** Account-scoped auth and service flows isolated (PR #2409)
- Style updates

No breaking changes or migration notes were included in the release notes. This is a minor feature and polish release.

## Project Progress
Twelve PRs were merged or closed today, spanning three areas:

- **Stability hardening (main process):**
  - PR #2437 — Hardened window lifecycle and shutdown: OpenAI-compat proxy and HTML preview server now have drain timers and hard deadlines, preventing lingering keep-alive sockets from stalling app quit. Main window activation is also gated on first render.
  - PR #2436 — Fixed OpenClaw gateway lock poisoning: two race conditions (force-kill during lock-file write and gateway-initiated restarts) could leave the single-instance lock file corrupted, delaying respawns up to 30s.

- **Activity/campaign polish (renderer):**
  - PR #2432 — Disabled auto-popup of the World Cup final reward poster; manual claiming retained.
  - PR #2433 — Cropped poster asset, localized claim failure messages, and added campaign rebinding before retry.
  - PR #2438 / #2439 — Replaced startup credit poster artwork, including a version with the close icon.

- **Cowork/UI:**
  - PR #2435 — Added title-bar conversation search button, reusing the sidebar search workflow with responsive styling and query-aware navigation.

- **Dependency bumps (merged after long staleness):**
  - PR #1279 — cross-env 7.0.3 → 10.1.0
  - PR #1280 — react-dom 18.3.1 → 19.2.4
  - PR #1281 — vite 5.4.21 → 8.0.9

## Community Hot Topics
- **[Issue #2441 — Skill toggle silently fails due to directory-vs-frontmatter name mismatch; openclaw.json gets overwritten]** (filed 2026-08-05, 0 comments)
  https://github.com/netease-youdao/LobsterAI/issues/2441
  Two related problems bundled in one report: the skill toggle is written by directory name while OpenClaw matches by frontmatter `name`, so toggles fail silently when they differ; additionally, `openclaw.json` is overwritten wholesale with no persistent user edit surface. The author's framing — "users cannot persistently prune the system prompt for every new conversation" — reflects a deeper concern about control over model context.

- **[Issue #2440 — Desktop injects 4,425 chars of duplicated system prompt, 78% identical to AGENTS.md]** (filed 2026-08-05, 0 comments)
  https://github.com/netease-youdao/LobsterAI/issues/2440
  Detailed with trajectory data showing an injected `[LobsterAI system instructions]` block that repeats workspace-managed AGENTS.md content nearly verbatim. The author measured exact duplication and calls out that the model is forced to read the same instructions twice per session.

- **[Issue #1200 / PR #1201 — NIM superTeam `teamTypeNum` hardcoded wrong, group names fail to resolve]** (Issue filed 2026-04-01, PR still open, 1 comment)
  https://github.com/netease-youdao/LobsterAI/issues/1200
  https://github.com/netease-youdao/LobsterAI/pull/1201
  Oldest active item. The issue documents a one-line fix (incorrect team type codes for superTeam vs p2p), but has been stale for over four months with no maintainer response.

## Bugs & Stability
Ranked by severity:

1. **OpenClaw gateway lock poisoning** (PR #2436 — **fixed today**)
   Two races left the lock file corrupted, causing failed gateway respawns for up to 30s. This could recur every restart on affected systems. Fix merged.

2. **App quit hangs from lingering sockets** (PR #2437 — **fixed today**)
   Long-lived keep-alive connections (notably from the OpenClaw gateway) could stall shutdown indefinitely. Fix adds hard deadlines to server shutdown.

3. **NIM superTeam group name resolution broken** (Issue #1200, PR #1201 — **open, 4+ months**)
   Incorrect `teamTypeNum` values cause @-mentions in superTeams to render the raw ID instead of the group name. Fix is a one-line change in PR #1201, but has not been merged.

4. **System prompt duplication on desktop** (Issue #2440 — **new, no fix yet**)
   Duplicate injection of 4,425 characters (78% identical to AGENTS.md content) bloats every first user message. Reported with exact trajectory evidence. No fix or triage response yet.

5. **Skill toggle silently ineffective** (Issue #2441 — **new, no fix yet**)
   Toggle written against directory names while OpenClaw matches on frontmatter names; also, `openclaw.json` is overwritten without preserving user edits. No maintainer response yet.

6. **Main window activation races** (PR #2437 — **fixed today**)
   Focus/second-instance show requests could fire before first render; now queued until render completes.

## Feature Requests & Roadmap Signals
- **User control over system prompt / context window** (Issues #2440, #2441)
  Both issues filed today converge on a single demand: users want persistent, user-editable control over what enters each conversation's context. The skill-toggle mismatch and prompt duplication both stem from opaque config handling. Expect an upcoming feature around a unified prompt/skill management UI or a user-overridable config layer.

- **Conversation search in title bar** (PR #2435)
  Already implemented today; likely appears in the next release.

- **Native daily check-in** (PR #2408, released)
  The activity system is growing beyond web-based campaigns into native experiences, suggesting continued investment in engagement features.

- **Account-scoped auth isolation** (PR #2409, released)
  Enterprise-focused isolation of auth/service flows signals an ongoing push for multi-account and org-level support.

## User Feedback Summary
- **Pain points raised today:**
  - Context bloat: system instructions duplicated verbatim into every session, forcing the model to process redundant text (Issue #2440).
  - Configuration opacity: skill toggles appear to work but silently don't; user edits to `openclaw.json` are erased (Issue #2441).
  - Long-standing group-name bug in NIM superTeams remains unresolved after months (Issue #1200).

- **Satisfaction signals:**
  - The responsiveness and detail of the bug reports (with exact line numbers, trajectory samples, and repro steps) indicate an engaged, technically sophisticated user base that cares about the product's quality.
  - The earlier shutdown/hang fixes (PR #2436, #2437) directly address previously reported stability pain; the project is closing those loops within the same release cycle.

- **Overall:** Users are actively testing edge cases and are frustrated by silent configuration failures, but the fast-fix turnaround on stability issues suggests trust in the maintenance pipeline — provided new issues receive triage quickly.

## Backlog Watch
- **[PR #1201 / Issue #1200 — NIM teamTypeNum fix]** — Open since 2026-04-02, one-line fix ready, stale for 4+ months.
  https://github.com/netease-youdao/LobsterAI/pull/1201
  High priority: a trivial fix affects a visible user-facing behavior (group names in @-mentions). It has survived at least three milestone cycles without attention.

- **[Issue #2440 — System prompt duplication]** — Filed today, zero maintainer response yet.
  https://github.com/netease-youdao/LobsterAI/issues/2440
  Watch closely: high-quality repro data (trajectory JSONL, measured duplication ratio) and likely to collect reactions quickly.

- **[Issue #2441 — Skill toggle / openclaw.json overwrite]** — Filed today, zero maintainer response yet.
  https://github.com/netease-youdao/LobsterAI/issues/2441
  Watch closely: combines a bug with a design gap; discussion of "persistent user pruning surface" may spawn a feature proposal.

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw Project Digest — 2026-08-06

## 1. Today's Overview

CoPaw (QwenPaw) is in a high-activity state with 49 PRs and 20 issues updated in the last 24 hours, indicating a strong development cycle. The project shows a healthy 21:28 merged-to-open PR ratio, suggesting steady progress against an active queue of work. Bug reports are concentrated around reliability concerns—MCP tool stability, streaming resilience, and session state integrity—which are actively addressed by a corresponding wave of fix PRs. Two capability-cache and auto-update defect PRs from first-time contributors were merged, signaling a welcoming and responsive maintainer community. No new releases were published this period; the project is between v2.0.1 and v2.1.0-beta versions.

## 2. Releases

None this period.

## 3. Project Progress

Five PRs were closed/merged, marking significant progress on stability and UX:

- **feat(console): add LLM fallback configuration UI for agent and global models page** (#5598) — Adds per-agent and global fallback model configuration to the console UI, closing the loop on the model resilience features.
- **feat(backend): per-agent and global LLM model fallback with safe retry boundaries** (#5597) — Backend counterpart enabling automatic failover to backup models on transient/permission errors. Retries stay within the active model; fallback is a distinct boundary.
- **feat(console): add global responsive utility classes** (#5462) — Introduces shared responsive patterns to eliminate duplicated `@media` rules in console pages.
- **fix(channel): yield failed AgentResponse on console errors to unblock UI** (#5447) — Fixes console channel leaving the UI in a perpetual waiting state on model/runtime errors by properly yielding the failure.
- **fix: force relay reasoning_content for DeepSeek models** (#6675) — First-time contributor fix ensuring DeepSeek thinking-mode always receives `reasoning_content`, resolving #6667/#6541. Critically, this includes a workaround where QwenPaw's context compaction strips historical `ThinkingBlock`s.

## 4. Community Hot Topics

- **[#6684: 增加频道的重试功能 (channel retry feature)](https://github.com/agentscope-ai/QwenPaw/issues/6684)** — 4 comments, open 2 days.
  - **Underlying need:** Operational reliability for self-hosted Matrix channels. The agent races the Matrix server on startup and lacks retries or health checks, forcing manual re-save of channels on every server restart.
- **[#6436: The Right Model for Every Message: Automatic Model Routing](https://github.com/agentscope-ai/QwenPaw/issues/6436)** — 3 comments, open 13 days.
  - **Underlying need:** Request-level model routing by complexity/input type (small local model for simple turns, vision for images, large for hard reasoning) instead of pinning agents to one model. Signals a strong user desire for dynamic, cost-aware inference topologies.
- **[#6732: mcp工具规律性失效 (MCP tools fail periodically)](https://github.com/agentscope-ai/QwenPaw/issues/6732)** — 2 comments, 1 day old.
  - **Underlying need:** MCP tool registration silently degrades after hours, requiring container restart. A core reliability gap for all MCP-heavy workflows.
- **[#6480: nohup command agent hangs](https://github.com/agentscope-ai/QwenPaw/issues/6480)** — 2 comments, open 11 days.
  - **Underlying need:** Background process handling (`nohup` / `&`) in shell tool calls leaves the agent stuck non-idle — a fundamental usability blocker for long-running tasks.

## 5. Bugs & Stability

Ranked by user-impact severity:

- **MCP tools fail periodically, require container restart** (#6732, 1 day, no fix PR) — Silent tool registration loss breaks all MCP functions after hours; no fix identified yet. **Reported today; no associated fix PR found.**
- **400 "tool" role must follow tool_calls on long console sessions with heavy tool usage** (#6726, 1 day, no fix PR) — Accumulated 20–30+ tool call pairs in context cause upstream rejection. **Fix PR not yet identified; active area of concern.**
- **TypeError: replace() on execute_shell_command when model passes sandbox_config** (#6731, 1 day, no fix PR) — Crash is reproducible on main; tool schema advertises an arg the implementation cannot accept.
- **SSE in-stream 503 errors during streaming are not retried** (#6708, 1 day, **fix PR #6714 open** — retry SSE errors with status codes in messages).
- **Background forked subagent falsely reports completed when worktree finalization fails** (#6722, 1 day, **fix PR #6725 open** — report fork finalization failures in background tasks).
- **Cron pause/resume not persisted across restarts** (#6690, closed 1 day ago — likely fixed; verify state in release notes).
- **400 invalid_request_error on session history with thinking blocks + tool calls** (#6707, 1 day, **fix PR #6721 open** — retry reasoning-content errors for AgentScope messages).

**Fixed this period:**
- `test_auto_update_persists_targets` deterministic KeyError (#6716) — closed as invalid; likely resolved by PR #6729.

## 6. Feature Requests & Roadmap Signals

Actively requested features inflowing:

- **Persistent workspace artifact cards** (PR #6719) — Detects and materializes agent files as chat cards. This shipped alongside the artifact canvas request below, likely to land next minor release.
- **Live artifact canvas** (#6730) — Side-panel HTML rendering of agent deliverables in-console; consolidation with artifact cards in #6719 is the likely immediate path.
- **MCP call timeout configurability** (#6724) — `MCPClientConfig.timeout` silently dropped by Pydantic; `call_tool` unbounded. Needed guardrail for production; also a likely candidate for the v2.1.0 line.
- **Automatic model routing** (#6436) — Long-standing (13 days) and computationally complex; a candidate for upcoming major release, since it spans provider discovery + agent config + routing.
- **WeChat approval prompts in Chinese** (#6728) — Small i18n polish after #6695 fixed WeChat approval interactions; likely quick win for next patch.
- **Token metering at agent level** (#6392, closed 1 day ago — likely resolved via open PR(s), follow up on merge).

## 7. User Feedback Summary

- **Frustration with the "完整模式"/"精简模式" split in UI** (#6413, closed) — Users find the mode labels confounding; the config icon is the intuitive entry point. UX regression feedback, now closed (likely addressed in console UI rework).
- **Pain with large tool outputs freezing history** (#6700, closed) — A 1–2MB tool output made the console unresponsive; truncated outputs and history pagination requested. Closed 1 day ago (fix delivered; likely via PR #5447 or upstream context handling).
- **OpenRouter multimodal probe overwrites documented capability with false** (#6687, open) — Multi-modal capability mis-detection breaks expected behavior; PR #6723 (capability cache expiry + clear on model switch) is the direct fix pending.
- **Browser SDK target crashes in 2.1.0b1** (#6698, open) — Isolated Playwright session fails on every `open()` call; CLI users report regression in beta quality.
- **Positive contributors' signals:** PR #6525 (user context transparency) is a comprehensive feature; responses to the code review are moving quickly.

## 8. Backlog Watch

Items requiring maintainer attention (no recent activity or unresolved):

- **#6698 — Browser SDK `open()` always fails in v2.1.0b1** (1 day old, no fix PR). High impact but maybe not triaged; no prompt response found.
- **#6525 — User context transparent passthrough for Chat API → Agent → Tool → MCP → SKILL CLI** (9 days open, updated today, needs review/rebase).
- **#6302 — Unify provider discovery, model metadata, routing, and agent controls** (16 days open, updated today): major architecture consolidation; likely needs design sign-off and is at risk of stalling.
- **#6687 — OpenRouter multimodal probe overwrites documented capabilities** (2 days open, direct fix #6723 is pending review).
- **#6724 — MCP tool-call timeout config (1 day open)**: silently dropped field is a tripping hazard for advanced configs.

Oldest open PRs with no comments in top‑20 activity: #3874 (feat(model): refine retry logic, open 102 days) and #5462 (closed today). PR #3874 shows no activity for 102 days — needs triage/close or rebase.

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