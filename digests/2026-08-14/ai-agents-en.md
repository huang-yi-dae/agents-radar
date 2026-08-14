# OpenClaw Ecosystem Digest 2026-08-14

> Issues: 500 | PRs: 500 | Projects covered: 13 | Generated: 2026-08-14 01:40 UTC

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

# OpenClaw Project Digest — 2026-08-14

## 1. Today's Overview

OpenClaw is in a high-activity cycle, with 500 issues and 500 PRs updated in the last 24 hours. Open issue volume (338) significantly outpaces merged/closed activity (162), and the project has zero new releases, indicating a heavy maintenance and stabilization phase rather than feature delivery. P1-severity bugs dominate the tracker, with a strong cluster of subagent completion delivery failures, session-stuck states, and multi-agent orchestration reliability issues. The PR queue is active with 388 open PRs, a large share authored by `steipete` targeting Web UI defects, suggesting a focused QA/UI-hardening campaign underway. Several long-standing "diamond lobster" rated issues remain open with no new fix PRs, signaling sustained community frustration on reliability fronts.

## 2. Releases

No new releases were published in this window.

## 3. Project Progress

No PRs were merged in this 24-hour dataset window (all listed PRs are open). Notable PRs awaiting maintainer action include UX fixes to the Control UI (`fix(ui): composer Enter-send wedges dead`, #123249; `fix(ui): session rail announces elapsed clock to screen readers`, #123240; `fix(ui): unread badge latches un-clearable`, #123252), gateway session-state fixes (`fix(gateway): sessions stuck showing phantom active run until restart`, #123192), and provider transport improvements (`fix(ai): recover OpenAI WebSocket turns after compaction rejection`, #123398). On the feature side, `feat(anthropic): opt-in server-side compaction` (#123402) is a meaningful candidate for reduced prompt-cache churn but remains in review.

## 4. Community Hot Topics

- **[#121058 — Silent reply failures still recurring after #116277 closed](https://github.com/openclaw/openclaw/issues/121058)** (92 comments) — The single hottest thread. Users report the "silent reply" delivery failure keeps occurring even after the prior fix shipped; a monitoring cron is logging new occurrences. Signals the root cause is not yet addressed, and community is actively tracking regressions.
- **[#7707 — Memory Trust Tagging by Source](https://github.com/openclaw/openclaw/issues/7707)** (48 comments, P2, security-tagged) — Community is deeply interested in defense against memory-poisoning attacks; issue remains open since February with no maintainer action, a long-standing roadmap signal.
- **[#25592 — Text between tool calls leaks to messaging channels](https://github.com/openclaw/openclaw/issues/25592)** (48 comments, P1, "diamond lobster") — High-engagement bug: internal agent narration/processing is being sent as visible user-facing messages, polluting chat channels. Unresolved since February.
- **[#44925 — Subagent completion silently lost](https://github.com/openclaw/openclaw/issues/44925)** (27 comments, P1) — Requires retry, notification, and auto-restart on timeout; users emphasize data-loss impact in Telegram forum-mode workflows.

## 5. Bugs & Stability

Ranked by severity and community impact:

| Severity | Issue | Summary | Fix PR? |
|----------|-------|---------|---------|
| 🔴 Critical | [#121058](https://github.com/openclaw/openclaw/issues/121058) | Silent reply failures recur after #116277; no queued payload | None |
| 🔴 Critical | [#43747](https://github.com/openclaw/openclaw/issues/43747) | Memory management chaos — inconsistent chunking/storage across installs | None |
| 🔴 Critical | [#44925](https://github.com/openclaw/openclaw/issues/44925) | Subagent completion silently lost on timeout; no retry/notify | None |
| 🟠 High | [#25592](https://github.com/openclaw/openclaw/issues/25592) | Internal agent text leaking to Slack/iMessage | None |
| 🟠 High | [#123073](https://github.com/openclaw/openclaw/issues/123073) | `openclaw update` fails on dev channel — workspace:* protocol unsupported | None |
| 🟠 High | [#91363](https://github.com/openclaw/openclaw/issues/91363) | Isolated cron consistently fails with "LLM request failed" | None |
| 🟠 High | [#97616](https://github.com/openclaw/openclaw/issues/97616) | Leaked hook/tool child processes; zombie accumulation | None |
| 🟡 Medium | [#115421](https://github.com/openclaw/openclaw/issues/115421) | Schema-downgrade recovery quarantines state DB — cron jobs lost | None |
| 🟡 Medium | [#111498](https://github.com/openclaw/openclaw/issues/111498) | Main agent blocked by persistent workspace-state migration | None |
| 🟡 Medium | [#89278](https://github.com/openclaw/openclaw/issues/89278) | Codex OAuth refresh succeeds but cron/heartbeat fail with 10s timeout | None |

**Regression cluster (previously working behavior):** `#43747` (memory), `#111498` (Anthropic auth), `#89278` (Codex OAuth), `#97616` (zombie processes), `#77733` (`/new` no longer triggers persona greeting).

## 6. Feature Requests & Roadmap Signals

Strong, repeated asks cluster around session reliability, delivery guarantees, and configuration depth:

- **[#7707 — Memory Trust Tagging](https://github.com/openclaw/openclaw/issues/7707)** (P2, security) — Likely a future milestone given repeated security reviewers' attention; an explicit anti-poisoning control.
- **[#16555 — TTL/Expiry for Delivery Queue Messages](https://github.com/openclaw/openclaw/issues/16555)** — Long-open, ties to the silent-delivery issues; could be prioritized if the current debugging effort lands.
- **[#45771 — Pace-aware rate limiting](https://github.com/openclaw/openclaw/issues/45771)** — Autonomous-loop cost/rate-limit awareness; still open, with a proposal drafted.
- **[#45758 — YAML config support](https://github.com/openclaw/openclaw/issues/45758)** (8 comments, 2 reactions) — Community wants this; low implementation cost, but no maintainer movement.
- **[#45508 — Self-hosted STT/TTS in webchat](https://github.com/openclaw/openclaw/issues/45508)** — Privacy-focused voice UI request; no maintainer comment.
- **[#41366 — Durable natural-language rule learning](https://github.com/openclaw/openclaw/issues/41366)** — Multi-agent group-chat behavior consistency; a product-level decision is still pending.

**Prediction:** Given the volume of delivery/session-loss issues, the next release is likely to include delivery-queue hardening (TTL, retry, fallback paths) and gateway session-lifecycle fixes before new feature work.

## 7. User Feedback Summary

Dominant user pain points are data-loss, message-loss, and silent failures in production multi-agent setups:

- **Frustration:** Recurring "silent reply" and "silent subagent loss" issues across multiple issue threads (#121058, #44925, #67777, #92433) — users report losing assistant replies or subagent completions with no notification, retry, or auto-restart.
- **Concern:** Memory-storage inconsistency across installs (#43747) is a trust issue — users cannot predict where their data is stored or how it's managed.
- **Channel-specific regressions:** Telegram, Discord, and WhatsApp routing/lane-guard bugs (#41165, #44502, #91456, #54488) frustrate daily chat users; lane starvation can delay inbound messages for 20–30 minutes.
- **Positive signal:** Dev-channel WebSocket recovery (#121605) and mobile UI dark-mode fixes (#123408) show responsive UI work; the `steipete` PR batch reflects active investment in the Control UI experience.

## 8. Backlog Watch

- **[#7707 — Memory Trust Tagging](https://github.com/openclaw/openclaw/issues/7707)** — Open since Feb 3, 48 comments; after ~6 months, still no maintainer reply or milestone. Security-sensitive.
- **[#25592 — Text-between-tool-calls leakage](https://github.com/openclaw/openclaw/issues/25592)** — Open since Feb 24; a "diamond lobster" P1 with no fix PR open. Long-standing UX integrity defect.
- **[#43747 — Memory chaos](https://github.com/openclaw/openclaw/issues/43747)** — Open since Mar 12; a "platinum hermit" regression, unresolved across 5 months.
- **[#45758 — YAML config support](https://github.com/openclaw/openclaw/issues/45758)** — Low-effort config-format ask, open since Mar 14; no maintainer signal.
- **[#78493 — `sudo openclaw update` ownership corruption](https://github.com/openclaw/openclaw/issues/78493)** — "Diamond lobster" P1, open since May 6, stable-maturity; can make doctor overwrite configs destructively. No linked PR.
- **[#42273 — `backup create` stalls on 4GB+ directories](https://github.com/openclaw/openclaw/issues/42273)** (closed as already-fixed) — **Note:** marked closed, but issue body describes data-loss on large installs; verify fix availability in release.
- **[#79165 — Graduated crash-recovery ladder](https://github.com/openclaw/openclaw/issues/79165)** — Open since May 8, P2 feature with no maintainer response; important for unattended gateway deployments.

---

## Cross-Ecosystem Comparison

# Cross-Project Ecosystem Comparison Report — 2026-08-14

## 1. Ecosystem Overview

The personal AI assistant open-source landscape is split between high-activity core projects conducting heavy maintenance cycles (OpenClaw, Zeroclaw, CoPaw) and smaller projects shipping incremental feature releases (EasyClaw, PicoClaw). Reliability remains the dominant theme: silent message loss, session-stuck states, and subagent completion failures appear across OpenClaw, NanoBot, and CoPaw simultaneously, indicating systemic challenges in multi-agent orchestration. A major architectural shift is underway in IronClaw's "Reborn" epic, which commits to pluggable foreign agent loops (claude-code, codex) rather than monolithic agent implementations. Security hardening is accelerating across the board, with verified-intent credential chains, shell-policy contracts, and CSPRNG fixes landing in Zeroclaw, NanoClaw, and others. Memory systems, long-term persistence, and cross-session context reliability are emerging as the next competitive frontier, with proposals like ViBo and durable connectors appearing in multiple projects.

## 2. Activity Comparison

| Project | Issues (updated/24h) | PRs (updated/24h) | Merged/Closed (24h) | Release Status | Health Score* |
|---|---|---|---|---|---|
| OpenClaw | 500 | 500 | 162 | None (0 new) | 3.0/10 |
| Zeroclaw | 50 | 50 | 10 | v0.9.0 milestone pending | 5.5/10 |
| CoPaw (QwenPaw) | 42 | 50 | 19 | v2.1.0 (stable) shipped | 6.5/10 |
| NanoBot | 12 | 31 | 9 | None | 7.0/10 |
| IronClaw | 50 | 50 | ~10 | v1.2.0 (stable) shipped | 7.5/10 |
| NanoClaw | — | 19 | 13 | v2.2.0 shipped | 7.5/10 |
| LobsterAI | — | 11 | 6 | None (RC imminent) | 6.0/10 |
| PicoClaw | 3 | 9 | 3 (all Dep. bots) | None | 5.0/10 |
| Moltis | 1 | 4 | 0 | None | 6.5/10 |
| EasyClaw | 0 | 0 | 0 | v1.8.98 + v1.8.99 shipped | 8.5/10 |
| NullClaw | 0 | 0 | 0 | — | — |
| TinyClaw | 0 | 0 | 0 | — | — |
| ZeptoClaw | 0 | 0 | 0 | — | — |

*Health score = composite of bug-fix velocity, critical-issue backlog size, release cadence, and maintainer responsiveness; 10 = healthiest.

## 3. OpenClaw's Position

**Advantages:** OpenClaw is the reference implementation and largest project by an order of magnitude, with 500+ issues and PRs touched daily. Its gateway abstraction supports the widest channel matrix (Telegram, Discord, WhatsApp, Slack, iMessage) and it has the largest contributor base including a focused UI-hardening campaign from `steipete`. Its Control UI is receiving dedicated investment.

**Technical approach differences:** OpenClaw treats the agent as a session-managed gateway with channel adapters, whereas IronClaw is re-architecting toward a kernel-plus-foreign-harness model and CoPaw is betting on a desktop OS-shell metaphor (windowed apps, taskbar). OpenClaw's approach is more mature but brittle — the scale of governance over multiple channels creates a larger reliability surface.

**Community size:** OpenClaw dwarfs peers. CoPaw has 33.7k stars and a strong Chinese-language community; OpenClaw's issue volume alone (338 open issues) is larger than most peers' total contributions. However, OpenClaw's maintainer responsiveness lags peers: critical bugs like #121058 (silent reply failures) and #43747 (memory chaos) have remained open for months, and the diamond-lobster-rated issues signal sustained community frustration relative to its maturity.

**Key conclusion:** OpenClaw is the ecosystem leader but at risk of ceding trust on reliability fronts NanoBot and NanoClaw are actively fixing faster.

## 4. Shared Technical Focus Areas

| Focus Area | Projects | Specific Needs |
|---|---|---|
| **Subagent/multi-agent reliability** | OpenClaw, CoPaw, Zeroclaw, NanoClaw | Completion delivery guarantees, retry/notify on timeout, no silent data loss |
| **Message delivery guarantees** | OpenClaw, NanoBot, CoPaw | Delivery-queue TTL, per-run session isolation, gateway crash recovery |
| **Memory systems & persistence** | OpenClaw, NanoBot, IronClaw, CoPaw, Moltis, LobsterAI | Memory trust tagging, source attribution, cross-session recall, consolidation correctness, durable connectors/history |
| **Security hardening** | Zeroclaw, NanoClaw, CoPaw, OpenClaw | Verified credential chains, shell-policy contracts (allow/ask/deny), CSPRNG for pairing codes, plugin authorization |
| **MCP/tool ecosystem** | Zeroclaw, NanoBot, NanoClaw, Moltis, OpenClaw | Schema budgeting for large toolsets, MCP cwd support, metadata preservation, per-server disabled tools |
| **Config & adaptability** | OpenClaw, Zeroclaw, PicoClaw, CoPaw | YAML support, hyphenated aliases, dynamic model override, backward-compatible provider paths |
| **Multi-channel UX consistency** | OpenClaw, CoPaw, LobsterAI, IronClaw | Unified UI patterns, tunnel/route isolation, channel lane-guard fixes |
| **Model flexibility** | PicoClaw, CoPaw, Zeroclaw | Non-whisper transcription, per-task model routing, carrier-agnostic providers |

## 5. Differentiation Analysis

| Project | Primary Focus | Target User | Architecture Distinction |
|---|---|---|---|
| **OpenClaw** | Broadest channel coverage, reference agent gateway | Power users needing many messaging channels | Gateway with per-channel adapters; heavy config; Control UI |
| **Zeroclaw** | Architecture correctness, security boundaries, RFC-driven design | Advanced/extreme users, plugin developers | Modular core with strict separation; v0.9.0 milestone = major hardening |
| **CoPaw** | Desktop OS-shell experience, Chinese-cloud integration | Consumers, Chinese users, desktop workflows | Windows/macOS desktop app; windowed app management; Aliyun/WeChat ecosystem |
| **NanoBot** | Infrastructure reliability, rapid bug-fix cycles | Developers running headless gateways in production | Fast stabilization of critical paths (cron, session persistence, Windows crash fixes) |
| **IronClaw** | Reborn kernel-with-foreign-harnesses, capability mediation | Enterprise/deployment orchestrators | Pluggable agent-loop architecture; disposable containers; conformance suite |
| **NanoClaw** | Supply-chain integrity, template/plugin scaffolding, release discipline | Teams running multi-agent fleets | Signature-verified agent images, CI gating, in-place template updates |
| **LobsterAI** | UI coherence, engagement mechanics, enterprise readiness | Chinese-market end users, org deployments | Electron-ish desktop; skills/MCP/cowork unified management layer |
| **PicoClaw** | Lightweight single-agent assistant, embedded/small-device | Hobbyists, small-device users | Minimal footprint; whisper-ASR (currently); simple pip install |
| **Moltis** | Historical context ingestion, durable connectors | Users wanting cross-platform memory and long-term data access | CalDAV + Slack/Discord/Matrix/Teams history datasets; full-text search |
| **EasyClaw** | Affiliate/creator workflows, per-device attribution | TikTok/Affiliate marketers | Niche vertical; TK Copilot releases; lightweight MCP-based UX |

## 6. Community Momentum & Maturity

**Tier 1 — Peak activity, major architectural bets:** OpenClaw (massive but stuck in maintenance; no release cadence), Zeroclaw (RFC-heavy, security hardening, converging on v0.9.0), IronClaw (executing Rebom epic; 20-issue fanout actively advanced).

**Tier 2 — Rapid iteration with fast fix cycles:** NanoBot (critical bugs get PRs within hours; high-health near-term), NanoClaw (release discipline and supply-chain hardening; v2.2.0 shipped), CoPaw (high-velocity, integrated releases; Chinese community driving feature demand).

**Tier 3 — Steady consolidation:** LobsterAI (UI coherence pass with 6 merges/day; enterprise edition), Moltis (small but focused integration work; feature PR pending review).

**Tier 4 — Low activity / maintenance-focused:** PicoClaw (mostly Dependabot churn; one critical frontend fix stalled), EasyClaw (quiet, shipping iterative releases with no issue traffic).

**Tier 5 — Dormant:** NullClaw, TinyClaw, ZeptoClaw — no activity in window.

**Maturity insight:** No project except EasyClaw and NanoClaw is in a stable, low-bug state. The ecosystem as a whole is still maturing: reliability debt (silent failures, memory consistency) is high even in leading projects, but the fastest-maturing projects (NanoBot, NanoClaw, IronClaw) are investing heavily in testing, CI gates, and fix-velocity.

## 7. Trend Signals

**Legend for AI agent developers:**

- **Delivery guarantees and subagent reliability are table-stakes, not differentiators.** If you ship agents that can lose a reply or subagent completion silently, your users will file bugs as severe as any security issue (#121058, #44925, #6921, #5373). Expect every serious agent framework to adopt per-run isolation, retry-with-notification, and crash-recovery ladders in 2026.

- **The "kernel" architecture is taking hold.** IronClaw's Reborn (claude-code/pi/codex as pluggable loops), Zeroclaw's typed peer policies, and NanoClaw's Agent Plugins 1.0 all point to a future where agent frameworks orchestrate foreign/harness agents rather than bundle their own loop. Developers should design for interchangeability and vendor-neutral plugin standards.

- **Security is expanding beyond network layers into agent-level trust boundaries.** Verified-intent credential chains (Zeroclaw), shell-policy allow/ask/deny tiers (#7155), memory-poisoning defenses (#7707), and signature-verified agent images (NanoClaw) signal that the attack surface now includes the agent's own actions and memory — not just APIs and channels.

- **Cross-session memory is the #1 unsolved problem across the ecosystem.** Multiple projects are converging on memory trust tagging, durable connectors/history ingestion (Moltis), consolidation correctness (NanoBot, OpenClaw), and third-party memory providers (ViBo proposals in both NanoBot and CoPaw). The developer who nails cross-session recall without context pollution wins a major competitive edge.

- **The desktop-OS metaphor for agents is gaining traction.** CoPaw's QwenPaw OS Shell (windowed apps, taskbar, notifications, saved layouts) suggests the next UX horizon is an agent desktop environment rather than a chat sidebar. IronClaw's capability socket and egress edge similarly move toward capability-mediated, process-bound UX.

- **AI-agent UX transparency is a growing user demand.** Users want to see what the agent is doing (LobsterAI's "run now" feedback, CoPaw's compression-visible transcripts, OpenClaw's text-leak complaints) and to control state (PicoClaw's dynamic model override, session-scoped dirs, per-device attribution). Silent agent behavior is unacceptable across all projects with active communities.

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

**NanoBot Project Digest — 2026-08-14**

---

## 1. Today's Overview

NanoBot is in a high-velocity stabilization and feature-development cycle. Activity on 2026-08-13 was intense: 12 issues were updated (11 remain open) and 31 PRs were touched, with 9 merged or closed. The project is currently focused on hardening session persistence (Windows transient errors, file-cap archive failures, memory consolidation), fixing a critical cron scheduler death bug, and addressing a security advisory around the `exec` tool. Several long-pending feature PRs from June (heartbeat configuration, dream consolidation) were also merged or progressed, indicating maintainers are clearing backlog.

---

## 2. Releases

No new releases were published in the last 24 hours.

---

## 3. Project Progress

Nine PRs were merged or closed today. Notable items include:

- **[#5381](https://github.com/HKUDS/nanobot/pull/5381) — feat(webui): add native workspace folder picker** (merged): Adds native macOS/Windows/Linux folder selection for locally hosted WebUI sessions, advertised only when the gateway is loopback-bound.
- **[#5384](https://github.com/HKUDS/nanobot/pull/5384) — fix(webui): restore transcript-only session history** (merged): Restores WebUI sidebar discovery for persisted display transcripts without a canonical session JSONL.
- **[#5374](https://github.com/HKUDS/nanobot/pull/5374) / [#5375](https://github.com/HKUDS/nanobot/pull/5375) — fix(cron): keep scheduler alive when job-store persistence fails** (merged/closed): Resolves the critical scheduler-death bug; #5376 is the final open iteration.
- **[#4556](https://github.com/HKUDS/nanobot/pull/4556) — feat(dream): wire up model_override for Dream consolidation** (merged): Fixes [#4029](https://github.com/HKUDS/nanobot/issues/4029), applying `DreamConfig.model_override` at runtime.
- **[#4550](https://github.com/HKUDS/nanobot/pull/4550) — fix(cron): use per-run session key to prevent context sharing across cron runs** (merged): Fixes [#4082](https://github.com/HKUDS/nanobot/issues/4082); each cron run now gets an isolated session.

Feature areas receiving active PR work include: session collaboration, MCP schema budgeting, Telegram sticker replies, MCP Apps metadata preservation, and Matrix SAS verification flow.

---

## 4. Community Hot Topics

The most active discussions center on infrastructure robustness and security:

- **[Issue #5373](https://github.com/HKUDS/nanobot/issues/5373) — Cron scheduler dies permanently after a single job-store persistence failure**: 1 comment. A single `_save_store()` exception escapes the `try/finally`, killing the scheduler permanently. Actively addressed by PRs #5374/#5375/#5376.
- **[Issue #5298](https://github.com/HKUDS/nanobot/issues/5298) — Budget model-visible MCP schemas for large tool sets**: 1 comment. Context cost concerns for large MCP tool sets; a corresponding implementation PR [#5388](https://github.com/HKUDS/nanobot/pull/5388) is now open.
- **[Issue #5306](https://github.com/HKUDS/nanobot/issues/5306) — `exec.allowPatterns` shell-chain bypass security advisory** (closed): Users can bypass command restrictions via shell chains. Closed — likely fixed internally.

---

## 5. Bugs & Stability

Several bugs were reported or fixed today, ranked by severity:

| Severity | Issue | Description | Fix PR |
|----------|-------|-------------|--------|
| **Critical** | [#5373](https://github.com/HKUDS/nanobot/issues/5373) | Cron scheduler dies permanently after one persistence failure (disk full, permission change, locked file). | [#5376](https://github.com/HKUDS/nanobot/pull/5376) (open), [#5374](https://github.com/HKUDS/nanobot/pull/5374)/[#5375](https://github.com/HKUDS/nanobot/pull/5375) (closed) |
| **High** | [#5378](https://github.com/HKUDS/nanobot/issues/5378) | File-cap archive failure mutates the live session before persistence, losing overflow data permanently. | [#5380](https://github.com/HKUDS/nanobot/pull/5380) (open) |
| **High** | [#5377](https://github.com/HKUDS/nanobot/issues/5377) | Consolidation truncates archive input but advances past the full message batch, silently losing message suffixes. | [#5379](https://github.com/HKUDS/nanobot/pull/5379) (open) |
| **Medium** | [#5382](https://github.com/HKUDS/nanobot/pull/5382) | `os.replace()` crashes on transient Windows `[WinError 5] Access is denied` during heartbeat session save, killing the gateway. | [#5382](https://github.com/HKUDS/nanobot/pull/5382) (open) |
| **Low/Test** | [#5349](https://github.com/HKUDS/nanobot/pull/5349) | Two settings tests fail deterministically in a ~5-hour daily window due to missing `timezone_name` (fixes #5348). |

All high-severity bugs have fix PRs already open, indicating fast maintainer response.

---

## 6. Feature Requests & Roadmap Signals

Strong roadmap signals this cycle include:

- **MCP Apps host support in WebUI** ([#5251](https://github.com/HKUDS/nanobot/issues/5251)): User requests first-class MCP Apps rendering; a related metadata-preservation PR [#5386](https://github.com/HKUDS/nanobot/pull/5386) is open — likely groundwork for a follow-up.
- **Memory system for agents** ([#5372](https://github.com/HKUDS/nanobot/issues/5372)): User proposes ViBo, a persistent memory provider. This signals demand for cross-session memory beyond current consolidation features.
- **QwenCloud provider path** ([#5350](https://github.com/HKUDS/nanobot/issues/5350)): Request for a backward-compatible QwenCloud provider alongside existing DashScope support — aligns with international user growth.
- **WebUI localization of agent activity text** ([#5366](https://github.com/HKUDS/nanobot/issues/5366)): Requests i18n for agent-generated UI text (e.g., "Working for…"), improving accessibility for non-English users.
- **WebUI UX polish** ([#5368](https://github.com/HKUDS/nanobot/issues/5368)): Hide copy/fork actions while an Agent turn is still running — small but valuable UX fix.

---

## 7. User Feedback Summary

Users are actively reporting real-world pain points:

- **Reliability concerns are dominant**: Persistent scheduler death, message loss on consolidation, and session mutation on archive failure are all serious issues that can cause silent data loss. Users are engaged enough to provide detailed stack traces and root-cause analysis.
- **Windows users face unique instability**: The transient `WinError 5` crash on heartbeat session save was confirmed twice in one gateway log, causing full gateway crashes.
- **Security awareness is high**: The `exec.allowPatterns` bypass report (now closed) was filed with a detailed advisory, showing users actively audit the security surface.
- **Feature appetite is leaning toward memory and multimodal inputs**: The ViBo memory proposal and Telegram sticker support request both indicate users want richer interaction models.
- **Internationalization needs are emerging**: The WebUI localization request signals growing non-English-speaking adoption.

---

## 8. Backlog Watch

Long-standing items needing maintainer attention:

- **[#4841](https://github.com/HKUDS/nanobot/issues/4841) — Matrix: bot device shows as 'untrusted' in Element** (open since 2026-07-07): No cross-signing or bot-initiated SAS verification path. A fix PR [#5385](https://github.com/HKUDS/nanobot/pull/5385) is now open — watch for merge.
- **[#4549](https://github.com/HKUDS/nanobot/pull/4549) / [#4551](https://github.com/HKUDS/nanobot/pull/4551) — Heartbeat `model_override` and `isolatedSession` config**: Open since 2026-06-26; both are feature-complete but still unmerged after ~7 weeks. Likely candidates for the next release.
- **[#5358](https://github.com/HKUDS/nanobot/pull/5358) — Session collaboration via mentions**: Open since 2026-08-12, providing a stable server-owned `@name` for sessions. Large feature; combined with concurrency fixes in [#5383](https://github.com/HKUDS/nanobot/pull/5383), maintainers appear to be consolidating session infrastructure first.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw Project Digest — 2026-08-14

## Today's Overview

Zeroclaw shows a highly active development cycle with 50 issues and 50 PRs updated in the last 24 hours. The project is currently in a heavy RFC and architecture-definition phase, with multiple high-priority (P1) security fixes landing or in flight. Maintainer review is a bottleneck: 8 open items explicitly await maintainer attention, and several large PRs (XL-sized) have been open for weeks. The v0.9.0 milestone appears to be a major coordination point, with dedicated trackers for auth, security, gateway boundaries, and breaking changes. Ten PRs were merged or closed in the period, spanning CI fixes, security hardening, documentation, and bug fixes. No new releases were published.

## Releases

No new releases in the last 24 hours. The project is coordinating toward v0.9.0, tracked in issue #7432, which covers auth, security hardening, gateway boundaries, A2A/multi-agent work, tool policy, and breaking changes.

## Project Progress

Ten PRs were merged or closed in the reporting window:

- **pr #9966** — [fix(container): match nested fixture manifests by glob](https://github.com/zeroclaw-labs/zeroclaw/pull/9966): fixes Dockerfile pre-fetch stage for nested workspace crates (P1, closed).
- **pr #9969** — [fix(gateway): contain filesystem dashboard assets](https://github.com/zeroclaw-labs/zeroclaw/pull/9969): canonicalizes asset paths and blocks symlink escapes from the distribution root (P1 security, closed).
- **pr #9709** — [fix(tts): clean up Edge TTS temp output on every error path](https://github.com/zeroclaw-labs/zeroclaw/pull/9709): closes issue #9706; now removes temp audio files on all failure paths (closed).
- **pr #9705** — [fix(config): allow config set on existing hyphenated cron aliases](https://github.com/zeroclaw-labs/zeroclaw/pull/9705): fixes #9652 where `config set` rejected cron aliases containing hyphens (closed).
- **pr #9639** — [docs(architecture): document provider routing lifecycle](https://github.com/zeroclaw-labs/zeroclaw/pull/9639): source-grounded page on profile construction, fallback order, cooldowns, and streaming recovery (closed).
- **pr #9674** — [fix(infra): preserve session queue serialization during eviction](https://github.com/zeroclaw-labs/zeroclaw/pull/9674): registers session requests while slot map is locked to prevent idle-eviction races (P1, closed).
- **pr #9932** — [ci(codeql): drop rust/hard-coded-cryptographic-value](https://github.com/zeroclaw-labs/zeroclaw/pull/9932): suppresses 27 all-false-positive CodeQL alerts on `cfg(test)` code (closed).
- **pr #9984** — [ci validation: rust-cache useblacksmith path](https://github.com/zeroclaw-labs/zeroclaw/pull/9984): temporary validation PR for Blacksmith runner caching; explicitly do-not-merge (closed).
- **#9643 (issue)** — [Docs: wit/VERSIONING.md enum variant classification](https://github.com/zeroclaw-labs/zeroclaw/issues/9643): closed; documented that adding an enum variant breaks previously compiled plugins (P1 docs).
- **#9978 (issue)** — Design ideas from DeepSeek Harness for the permission/sandbox roadmap, closed as discussion.

## Community Hot Topics

- **#8303 — RFC: Goal mode v1 (bounded foreground Matrix work)** — [issue](https://github.com/zeroclaw-labs/zeroclaw/issues/8303), 20 comments, opened 2026-06-24. Wants durable multi-turn user objectives in the control plane, but earlier proposal over-scoped. Commenters are pushing to split restart handoff, channel admission, Web, and async child work out of the first delivery.
- **#7155 — RFC: Per-execution confirmation tier for high-risk shell commands** — [issue](https://github.com/zeroclaw-labs/zeroclaw/issues/7155), 18 comments. The most actively iterated RFC: narrowed to a shell-policy contract (allow/ask/deny) and is in Core vote. This is the project’s flagship tool-permission policy work.
- **#8692 — Maintainer decision queue tracker for RFCs** — [issue](https://github.com/zeroclaw-labs/zeroclaw/issues/8692), 13 comments. Community is using this to surface the backlog of RFCs awaiting maintainer decision.
- **#6850 — RFC: Decouple memory lifecycle policy from storage backends** — [issue](https://github.com/zeroclaw-labs/zeroclaw/issues/6850), 12 comments. Proposes separating the `Memory` trait’s storage operations from consolidation/governance lifecycle decisions.
- **#9328 — Bug: verifiable-intent evaluates constraints without verifying credential chain** — [issue](https://github.com/zeroclaw-labs/zeroclaw/issues/9328), 12 comments. Security gap where `evaluate_constraints` trusts caller-supplied fulfillment objects without cryptographic chain verification.

The underlying need across these hot topics is architectural tightening: separating concerns (memory lifecycle, goal execution scope), closing security gaps in trust boundaries (shell policy, verifiable intent), and improving the project’s RFC decision throughput.

## Bugs & Stability

Five new bug reports were filed in the period, plus three bug-fix PRs closed:

- **#9389 (closed) — unauthenticated POST /api/pair keys lockout on attacker-supplied header** — [issue](https://github.com/zeroclaw-labs/zeroclaw/issues/9389). P1 security; pairing lockout could be bypassed by spoofing a header. Closed (fix presumably merged).
- **#9328 (open) — verifiable-intent evaluates constraints without verifying credential chain** — [issue](https://github.com/zeroclaw-labs/zeroclaw/issues/9328). P2, high risk, 12 comments. Attacker-controlled fulfillment objects pass constraint checks without cryptographic chain verification. Active discussion; no fix PR yet.
- **#9929 (open) — headless SOP step turns never persisted to session store** — [issue](https://github.com/zeroclaw-labs/zeroclaw/issues/9929). P1, accepted, blocked. Headless runs get session paths but writes are lost. No fix PR yet.
- **#9951 (closed) — WeChat channel code and 51 lib unit tests never compile or execute in CI** — [issue](https://github.com/zeroclaw-labs/zeroclaw/issues/9951). P2 CI gap; `channel-wechat` feature absent from all CI feature sets. Closed.
- **#9366 (closed) — WhatsApp Web accepts approval_timeout_secs and never reads it** — [issue](https://github.com/zeroclaw-labs/zeroclaw/issues/9366). P2 config bug; setting validates but has no effect on the WhatsApp Web transport. Closed.
- **#9710 (closed) — desktop: clean up temporary screenshot files on every exit** — [issue](https://github.com/zeroclaw-labs/zeroclaw/issues/9710). P3 minor; two early-return paths leak temp files. Closed with PR #9709’s pattern.

Security hardening also advanced via closed PRs #9969 (dashboard asset path containment) and #9674 (session eviction race).

## Feature Requests & Roadmap Signals

Four RFCs were newly opened or updated in the window:

- **#9945 — browser tool exposes only 16 of 100+ agent-browser commands** — [issue](https://github.com/zeroclaw-labs/zeroclaw/issues/9945). P2, blocked, accepted. Users need iframes, dialogs, tabs, and form controls. Likely candidates for v0.9.0.
- **#9880 — Type resolved peer policy instead of `Vec<String>` grants/denies grammar** — [issue](https://github.com/zeroclaw-labs/zeroclaw/issues/9880). P2, blocked, awaiting maintainer review. Replaces string-grammar `!`/`*` policy with typed structs.
- **#9887 — Downscale oversized images instead of dropping; allow 0 to disable limits** — [issue](https://github.com/zeroclaw-labs/zeroclaw/issues/9887). P2, blocked, accepted. Current hard reject of images >5 MiB is unhelpful for legitimate large payloads.
- **#9810 — Load Agent Plugins 1.0 skill and MCP packages** — [issue](https://github.com/zeroclaw-labs/zeroclaw/issues/9810). P2, blocked, awaiting maintainer review. Vendor-neutral plugin standard support (`plugin.json` + `skills/` + `mcp.json`).

New feature PRs open for review: #9986 (agent export to portable bundle), #9109 (native Hailo-Ollama provider), #9420 (Anthropic stored OAuth profiles). The strongest roadmap signal is the Agent Plugins standard (vendor-neutral plugin ecosystem) and typed policy structures replacing string grammars. Weekly lettered releases were requested in #9712 (closed) and would reduce time-to-user for fixes.

## User Feedback Summary

- **Security-conscious power users** are actively auditing the codebase: #9389 and #9328 were found through manual code review, and #7155 (shell command policy) has gone through three revisions with maintainer scope feedback; user NiuBlibing is separately collecting ideas from DeepSeek Harness (#9978) for the permission roadmap.
- **Self-hosting operators** report config friction: hyphenated cron aliases rejected by `config set` (#9652, fixed), bare `vision_model_provider` values not resolving to V3 alias refs (PR #9707), and OpenRouter prompt-cache misses due to missing stable `session_id` (#9631).
- **Cost and scale concerns** dominate: #9631 calls out dozens of LLM requests per conversation re-sending the same system prompt/tool schemas; #9945 notes the browser tool is a fraction as capable as its backend.
- **Mobile channel ergonomics** are a recurring theme: #9895 asks for provider-grouped paginated Telegram pickers, and #9366 shows config accepted but silently ignored on WhatsApp Web.
- **Release-process dissatisfaction**: #9712 requests weekly lettered cuts within a numbered line; the current release workflow rejects suffixes. That issue is now closed, so the path forward may already be decided.

## Backlog Watch

Items open for 2+ weeks without maintainer response, all still awaiting maintainer review or author action:

- **#7155 — shell command confirmation tier RFC** (6+ weeks, 18 comments, in Core vote) — [issue](https://github.com/zeroclaw-labs/zeroclaw/issues/7155). The highest-visibility RFC; maintained but still needs final accept/decline.
- **#6850 — memory lifecycle policy RFC** (12+ weeks, 12 comments, needs author action) — [issue](https://github.com/zeroclaw-labs/zeroclaw/issues/6850). Stalled on author revision.
- **#5907 — opt-in LSP support for ZeroCode** (16+ weeks, needs author action) — [issue](https://github.com/zeroclaw-labs/zeroclaw/issues/5907). No maintainer response recorded in the data; community interest persists.
- **#7929 — unify slash-command registries across UI/TUI/runtime** (8+ weeks, needs author action) — [issue](https://github.com/zeroclaw-labs/zeroclaw/issues/7929).
- **#9323 — execution-tree iteration budget ownership** (3+ weeks, needs author action) — [issue](https://github.com/zeroclaw-labs/zeroclaw/issues/9323). `ToolLoop.shared_budget` is effectively dead config.
- **#8713 — SSRF gate for file_download (PR, open 6+ weeks, XL, needs author action)** — [pr](https://github.com/zeroclaw-labs/zeroclaw/pull/8713). High-risk security fix still unmerged.
- **#9013 — move TodoWrite display config out of daemon into zerocode (PR, open 5+ weeks, breaking change)** — [pr](https://github.com/zeroclaw-labs/zeroclaw/pull/9013). Waiting on review; would be a breaking change.
- **#9420 — Anthropic stored OAuth profiles (PR, open 3+ weeks, XL)** — [pr](https://github.com/zeroclaw-labs/zeroclaw/pull/9420). Large surface (19 labels) awaiting maintainer review.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

## Today's Overview

PicoClaw is showing steady maintenance activity with 12 total items updated in the last 24 hours (3 issues, 9 PRs). No new releases were published, indicating the project is in a stabilization phase between version bumps. The majority of PR activity is automated dependency updates from Dependabot, covering AWS SDK, Anthropic SDK, and Matrix client libraries, while the human-driven contribution focuses on a critical frontend build fix. The issue tracker has received two new feature requests and one unresolved performance bug. Project health appears stable, with maintainers actively closing superseded dependency PRs and processing incoming automation.

## Releases

No new releases were published in this period. The latest issue references version 0.3.1, suggesting the project is currently between minor releases.

## Project Progress

Three PRs were closed/merged in the last 24 hours, all of which were superseded Dependabot updates:

- **PR #3305** ([link](https://github.com/sipeed/picoclaw/pull/3305)) — AWS Bedrock Runtime dependency bump (`1.56.2`), closed as the newer PR #3336 (`1.57.1`) supersedes it.
- **PR #3306** ([link](https://github.com/sipeed/picoclaw/pull/3306)) — AWS Config dependency bump (`1.32.33`), closed in favor of newer PR #3335 (`1.32.35`).
- **PR #3304** ([link](https://github.com/sipeed/picoclaw/pull/3304)) — Anthropic SDK dependency bump (`1.61.0`), closed as PR #3334 (`1.62.0`) supersedes it.

No feature work or manual bug fixes were merged this cycle.

## Community Hot Topics

The most active discussion item is the Web UI performance issue:

- **Issue #3281** ([link](https://github.com/sipeed/picoclaw/issues/3281)) — *[BUG] Web UI chat input is very laggy when history has a little bit long* — 5 comments, 1 reaction. Author reports severe input lag in the Web UI as conversation history grows, on version 0.3.1. This is the only issue with meaningful community engagement and represents a real usability concern affecting everyday workflows.

Dependency PRs (#3336, #3335, #3334, #3332, #3333) are active but carry no comments or reactions, as is typical for automated updates.

## Bugs & Stability

One bug is currently reported:

- **Issue #3281** ([link](https://github.com/sipeed/picoclaw/issues/3281)) — *Web UI chat input lag with long history* — **Severity: Medium-High**. The input box becomes progressively slower as session history accumulates, degrading the core chat experience in the web client. No fix PR has been opened yet. The issue has been open since July 21 and remains unresolved, though it received an update on August 13, suggesting maintainer awareness. Given the absence of a fix PR, this may require architectural changes to how history is rendered or virtualized.

## Feature Requests & Roadmap Signals

Two new feature requests were filed on August 13:

1. **Issue #3331** ([link](https://github.com/sipeed/picoclaw/issues/3331)) — **Generalized audio transcription support**. User requests the ability to use any model with an `/audio/transcriptions` endpoint, not just `*-whisper-*` models, which are considered outdated and slow. Proposes a `whisper-transcription` config flag. This signals a desire for more flexible voice-input options and modern model support.

2. **Issue #3330** ([link](https://github.com/sipeed/picoclaw/issues/3330)) — **Dynamic model override in subagent tools**. User requests the ability to specify a model at call time for `delegate`, `spawn`, and `subagent` tools, rather than being locked into statically configured models. This is a power-user feature enabling finer-grained control over model routing in multi-agent workflows.

**Predictions for next version**: The dynamic model override feature (#3330) is low-complexity (likely a parameter addition) and addresses a clear architectural gap; it may be picked up quickly. Whisper flexibility (#3331) touches the ASR pipeline and is moderate complexity — likely version 0.4.x. The Web UI lag fix (#3281) is the most probable candidate for priority inclusion given its user-facing impact.

## User Feedback Summary

- **Pain point — Web UI degradation**: User reports the Web UI becomes nearly unusable for long sessions, specifically typing in the input box. This indicates frontend rendering inefficiency with growing DOM/history size.
- **Pain point — ASR model lock-in**: User finds the whisper-only transcription path restrictive and slow, wanting access to newer/alternative transcription models.
- **Need — Model customization**: User wants runtime model selection for subagent calls, reflecting a power-user pattern of mixing cheap/fast and expensive/powerful models depending on subtask complexity.
- **No positive feedback or satisfaction signals** were recorded in this window; the only sentiment present is feature-driven and bug-driven dissatisfaction.

## Backlog Watch

- **Issue #3281** ([link](https://github.com/sipeed/picoclaw/issues/3281)) — Web UI input lag — Open for 24 days with 5 comments and no fix PR. This is the most prominent unresolved issue and directly impacts daily UX. Maintainer attention is recommended to at least triage or acknowledge scope.

- **PR #3318** ([link](https://github.com/sipeed/picoclaw/pull/3318)) — *fix(web): repair unparseable pnpm-lock.yaml* — Open for 9 days, updated August 13, and tagged as `[stale]`. This is a critical fix: the YAML lockfile with duplicate mapping keys breaks pnpm resolution entirely, blocking web frontend installs and builds. Despite being labeled stale, it has not been merged or commented on. This deserves immediate maintainer review since it blocks the frontend toolchain for contributors and CI.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

## NanoClaw Project Digest — 2026-08-14

### 1. Today's Overview
NanoClaw is in an active release and CI-hardening cycle following the v2.2.0 release on Aug 13, with 19 PRs updated in the last 24 hours (13 closed/merged, 6 open) and 13 releases shipped this year. The core team, led by gavrielc, is focused on completing the agent-image verification and promotion pipeline, gating merges on non-forgeable signatures, and making the verification job a required status check. Community contributions (CSPRNG fix for Telegram pairing codes, plugin MCP cwd support, docs fixes) continue to merge alongside core-team infrastructure work. One open bug (unknown-sender approval storm) and one long-running feature PR (backlog watch) remain outstanding. Two closed issues reflect a smooth release process with final fixes completing.

### 2. Releases
- **v2.2.0** ([PR #3237](https://github.com/nanocoai/nanoclaw/pull/3237)): Introduces the ability to **update template-stamped plugins in place**. Running `ncl groups create --template <ref>` on a group that already carries the template's plugin now updates in place instead of creating a duplicate agent. A dry run prints a plan of every plugin-owned surface (plugin files, skills, MCP config, etc.). Breaking change: agent groups created via `--template` now receive a **bare UUID id** (missing the `ag-` prefix), which is fixed in a subsequent patch, but any external tooling that relied on the `ag-` prefix pattern must account for this.

### 3. Project Progress
- **Agent-image verification and promotion loop** (core-team): `verify-agent-image` now runs on every PR so it can gate merges ([#3238](https://github.com/nanocoai/nanoclaw/pull/3238)); pinned the publisher identity and check attestations per architecture ([#3158](https://github.com/nanocoai/nanoclaw/pull/3158)); opened the agent-image bump PR from a dispatch ([#3240](https://github.com/nanocoai/nanoclaw/pull/3240)); repinned the agent image to hardened-2026-08-13 ([#3236](https://github.com/nanocoai/nanoclaw/pull/3236)); and enabled auto-approving a pin bump when the publisher signature is verified ([#3241](https://github.com/nanocoai/nanoclaw/pull/3241), off by default, reports-plan-only unless `AGENT_IMAGE_AUTO_APPROVE=true`).
- **Agent templates / Agent Plugins 1.0.0** ([#3220](https://github.com/nanocoai/nanoclaw/pull/3220), [#2909](https://github.com/nanocoai/nanoclaw/pull/2909)): Merged — templates are now Agent Plugins 1.0.0 directories with stamp-time symlink/caps/secret hardening; setup wizard includes the template flow and first-agent stamping.
- **Plugin MCP working-directory support** ([#3231](https://github.com/nanocoai/nanoclaw/pull/3231)): Codex and OpenCode config writers now honor the plugin's MCP cwd; the TOML writer emits `cwd` above the `[.env]` sub-table header to avoid corruption.
- **Security fix**: Telegram pairing codes now use `crypto.randomInt` instead of `Math.random()` and widen from 4 to 5 digits; 4-digit codes remain accepted for compatibility ([#3229](https://github.com/nanocoai/nanoclaw/pull/3229)).
- **DB migration 021** ([#3145](https://github.com/nanocoai/nanoclaw/pull/3145)): Backfills missing channel destinations for existing messaging-group wirings without overwriting custom names.
- **Per-server disabledTools** in `McpServerConfig` ([#2624](https://github.com/nanocoai/nanoclaw/pull/2624)): Merged after a long cycle.
- **Docs fix** ([#3230](https://github.com/nanocoai/nanoclaw/pull/3230)): Removal docs no longer point to the retired data/env mirror.

### 4. Community Hot Topics
- **[Issue #3235 — Unknown-sender approval storm](https://github.com/nanocoai/nanoclaw/issues/3235)** (open, 0 comments): When `unknown_sender_policy = 'request_approval'` is set, automated senders (webhooks, bots) generate unbounded, un-approvable approval cards; denials don't persist. This is the highest-severity open user-facing issue.
- **[PR #3242 — live-fire test of the signature approver](https://github.com/nanocoai/nanoclaw/pull/3242)** (draft, do-not-merge): An intentional smoke test that moves the pin to a previous hardened build to exercise the verify → approve-agent-image → cosign verify → approving-review chain. Signals that the maintainers are stress-testing their own release pipeline.
- **[PR #2346 — Unknown slash commands treated as normal chat](https://github.com/nanocoai/nanoclaw/pull/2346)** (open since May 8): User-facing fix ensuring unrecognized slash commands fall through to `category: 'none'` instead of hitting the Agent SDK's Claude Code passthrough and being silently dropped. Moderate user impact; unanswered for 3+ months.

### 5. Bugs & Stability
1. **Unknown-sender approval storm** (open, [Issue #3235](https://github.com/nanocoai/nanoclaw/issues/3235)): Unbounded approval cards from webhook/bot senders; denials don't persist. Severity: high — can spam operators indefinitely. **No fix PR yet.**
2. **Template-stamped groups get bare UUID id** (closed, [Issue #3234](https://github.com/nanocoai/nanoclaw/issues/3234), 1 comment): Bare UUID breaks OneCLI `ensureAgent` (rejects IDs starting with a digit). Shipped in v2.2.0; fixed in a follow-up that restores the `ag-` prefix.
3. **Verify-agent-image CI failures were silent** (fixed via [#3158](https://github.com/nanocoai/nanoclaw/pull/3158), [#3238](https://github.com/nanocoai/nanoclaw/pull/3238)): Signature verification was skipped on every run due to nonexistent env vars; path-filtering meant it never reported, so it could never gate. These were invisible CI bugs, now fixed.
4. **Telegram pairing codes via `Math.random()`** (fixed via [#3229](https://github.com/nanocoai/nanoclaw/pull/3229)): Predictable codes were a security risk; now use CSPRNG.

### 6. Feature Requests & Roadmap Signals
- **Bounded stdin JSON for CLI** ([PR #3218](https://github.com/nanocoai/nanoclaw/pull/3218), open): A generic `--stdin-json` input mode for host and container `ncl` clients, enabling structured arguments without changing the request frame. Likely to land in a future minor release.
- **`/add-hindsight` memory wrapper** ([PR #2420](https://github.com/nanocoai/nanoclaw/pull/2420), open since May 11): Bundles an MCP wrapper to bridge Hindsight long-term memory. A significant memory feature that remains unmerged after 3 months.
- **Signature-based auto-approval** ([#3241](https://github.com/nanocoai/nanoclaw/pull/3241)): Off-by-default `AGENT_IMAGE_AUTO_APPROVE=true` suggests a future release will make signature-verified pin bumps fully unattended.
- **Silver bullet for the approval flow**: The `unknown_sender_policy` design needs to distinguish human from bot senders; given the severity, expect a policy-level fix (e.g., `silent_drop` or a bot-allowlist) in the next patch.

### 7. User Feedback Summary
- **Pain point — approval-card flooding**: A user with `unknown_sender_policy = 'request_approval'` reports being inundated by unapprovable cards from recurring webhooks; denials don't stick, forcing manual intervention. This is the clearest unmet need today.
- **Pain point — template ID inconsistency**: The v2.2.0 release shipped a regression where `--template` groups get bare UUIDs, breaking external tooling that expects the `ag-` prefix.
- **Good signal — release maturity**: The core team's do-not-merge smoke tests and plan-only auto-approve mode indicate a deliberate, test-heavy release process that catches issues before they reach users.
- **Long-lived friction — unknown slash commands**: An open fix for treating unknown `/commands` as normal chat has been stalled for three months, suggesting either low maintainer bandwidth or unclear acceptance criteria.

### 8. Backlog Watch
- **[PR #2346 — Unknown slash commands as normal chat](https://github.com/nanocoai/nanoclaw/pull/2346)** (open since May 8): Simple fix, now 3+ months stale. Needs a maintainer review or explicit closure.
- **[PR #2420 — /add-hindsight memory wrapper](https://github.com/nanocoai/nanoclaw/pull/2420)** (open since May 11): Large feature, bundled MCP wrapper; has seen activity but remains unmerged. Potential next-version memory feature.
- **[Issue #3235 — Unknown-sender approval storm](https://github.com/nanocoai/nanoclaw/issues/3235)** (open, 0 comments): No maintainer response yet; at high severity, this needs a triage label and a design decision on how to treat automated senders.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-08-14

## Today's Overview

IronClaw shipped stable release **v1.2.0** and is deep into the "Reborn" architectural re-cut, with the pluggable-agent-loop epic (#7482) driving a coordinated burst of 20 sub-issues and consolidated implementation tracks. Activity is at a peak: 50 issues and 50 PRs updated in the last 24 hours, including a dense cluster of new workstream breakdowns (egress edge, foreign-harness execution, capability access) filed by `serrrfirat`. The team also merged a large perf-stability batch: heartbeat journal churn removal, trigger/outbound state-write reductions, and a doc-truth CI contract suite. Two new user-facing bugs landed (custom MCP auth blocking, GitHub extension false "connected" state) but both are low-severity and have no fix PRs yet.

## Releases

**[ironclaw-v1.2.0](https://github.com/nearai/ironclaw/releases)** — promoted from `1.2.0-rc.3` on 2026-08-13 via [PR #7625](https://github.com/nearai/ironclaw/pull/7625). Key fix in this stable cut: the runtime container image now installs `curl` so in-container HTTP healthchecks can execute, fixing orchestrator worker-probe failures. All RC1 feature work is included. No breaking changes or migration steps are noted.

## Project Progress

**Major merged/closed PRs today:**

- **[#7625](https://github.com/nearai/ironclaw/pull/7625)** — release promo to 1.2.0 (closed)
- **[#7531](https://github.com/nearai/ironclaw/pull/7531)** — repeated-call detection made advisory-only, replacing the sliding-window heuristic with a 3-consecutive-identical-call check (closed)
- **[#7581](https://github.com/nearai/ironclaw/pull/7581)** — bundled MCP state refresh after OAuth discovery; fixes extensions showing `setup_needed` for active tools (closed)
- **[#7590](https://github.com/nearai/ironclaw/pull/7590)** — live-canary bundled-skill marker ownership alignfix; first run of the new verdict narration caught the root cause (closed)
- **[#7579](https://github.com/nearai/ironclaw/pull/7579)** — widened live-canary slack grant to manifest union; QA lanes no longer crash at slack connect (closed)
- **[#7163](https://github.com/nearai/ironclaw/pull/7163)** — structural edit of docx/xlsx/pptx + PDF render from HTML, fixing #7109's text-log regression (closed)
- **[#7376](https://github.com/nearai/ironclaw/pull/7376)** — doc-truth PR 2/5: extends guidance path-reference gate to the docs surface (closed)

**Open PRs advancing Rebom:**

- **[#7633](https://github.com/nearai/ironclaw/pull/7633)** — unbound-turns: prepared-context accept door, unbound run lane, kernel binding-ref deletion
- **[#7631](https://github.com/nearai/ironclaw/pull/7631)** — coalescing event sink for host-runtime events and durable milestones
- **[#7629](https://github.com/nearai/ironclaw/pull/7629)** — trigger run-history retention pruning moved to initial fire claim
- **[#7628](https://github.com/nearai/ironclaw/pull/7628)** — heartbeat journal churn removal, keeping lease timestamps authoritative
- **[#7630](https://github.com/nearai/ironclaw/pull/7630)** — per-turn Postgres write measurement stress preset
- **[#7548](https://github.com/nearai/ironclaw/pull/7548)** — structured execution contracts for scheduled automations

## Community Hot Topics

The epic **["Pluggable agent loops" #7482](https://github.com/nearai/ironclaw/issues/7482)** is the singular focus, with 6 comments and a 20-issue fan-out:

- **[#7621](https://github.com/nearai/ironclaw/issues/7621)** — egress edge (iron-proxy adoption, audit bridge, model passthrough)
- **[#7622](https://github.com/nearai/ironclaw/issues/7622)** — foreign-harness execution (HarnessDriver, executor, agent images)
- **[#7623](https://github.com/nearai/ironclaw/issues/7623)** — capability access (sandbox socket, ic CLI, conformance suite, profile routing)
- **[#7624](https://github.com/nearai/ironclaw/issues/7624)** — v0 ACP harness executor (claude-code as loop, dev-only yolo) — explicitly the only work item to build right now; the three consolidated issues above are a deferred ladder

The underlying need: **IronClaw as a kernel**, not a monolith. The team is committing to off-the-shelf agent loops (claude-code, pi, codex) with a conformance contract, disposable containers, and grant-time credential mediation. This is a major architectural bet and today's data shows execution is underway, not just planned.

Also active: **[#6257](https://github.com/nearai/ironclaw/issues/6257)** (closed bug, 4 comments) and **[#2117](https://github.com/nearai/ironclaw/issues/2117)** (bridge daemon, 2 comments, 1 👍).

## Bugs & Stability

| Severity | Issue | Status | Fix PR |
|---|---|---|---|
| **Medium** | **[#7626](https://github.com/nearai/ironclaw/issues/7626)** — custom MCP requiring browser/email auth hangs on connect | Open, 0 comments | None yet |
| **Medium** | **[#7627](https://github.com/nearai/ironclaw/issues/7627)** — GitHub extension shows "connected" after invalid credentials (uses "1") | Open, 0 comments | None yet |
| **Low** | **[#7589](https://github.com/nearai/ironclaw/issues/7589)** — NEAR AI Cloud Sonnet-5 500 errors for 3 days (closed, likely resolved upstream) | Closed | n/a |
| **Low** | **[#7185](https://github.com/nearai/ironclaw/issues/7185)** — memory not reliably recalled across conversations; multiple Champions testers observed | Open, 2 comments | None yet |

No new regressions were introduced; the release fixes the container-healthcheck regression that blocked v1.2.0-rc.3.

## Feature Requests & Roadmap Signals

**User-facing requests (likely in upcoming minor releases):**

- **[#7580](https://github.com/nearai/ironclaw/issues/7580)** — expose IronClaw Reborn version in the web UI (open, small)
- **[#2117](https://github.com/nearai/ironclaw/issues/2117)** — `ironclaw-bridge` local file/MCP bridge daemon for cloud-hosted deployments (open, size L, 1 👍 — this is a recurring request pattern for local-first use cases like Obsidian vaults)

**Architectural signals (Reborn epic — the roadmap itself):**

- The Reborn workstreams define the roadmap: **WS1** egress proxy + audit, **WS3** foreign-harness execution (claude-code/pi/codex), **WS4** capability socket + `ic` CLI, **WS5** integration policy records, **WS6** conformance suite + profile routing.
- The *deferred ladder* design (#7621–#7623 only proceed if #7624 validates) is a deliberate risk-reduction strategy.

## User Feedback Summary

- **Champions weekly check-in** (via #7185): multiple testers report cross-conversation memory is unreliable — legal, and other domains can't reference prior context. Persisting.
- **PDF generation/sending** reported fixed via closed #6257.
- **Vanilla vendors/integrations** are the scale story — users want ~30-line config integrations, not hand-authored WASM packages (#7617), meaning distribution/onboarding pain remains.
- **Auth-flow friction** is surfacing: browser/email-verification MCPs block (#7626) and the GitHub extension's fake-connect state erodes trust (#7627).
- Users still can't find the running version from the web UI (#7580) — a small but real discoverability gap.

## Backlog Watch

- **[#2117](https://github.com/nearai/ironclaw/issues/2117)** — `ironclaw-bridge` local file/MCP access for cloud deployments. Open since 2026-04-07, only 2 comments, 1 👍. With the Reborn re-cut in flight, this request risks being deprioritized indefinitely; worth a maintainer re-triage to either commit or explicitly defer with rationale.
- **[#7185](https://github.com/nearai/ironclaw/issues/7185)** — cross-conversation memory reliability. Open since 2026-08-04, 2 comments, no linked PR despite being user-visible across multiple independent testers. This is a trust-critical issue that is not getting visible attention.
- **[#7184](https://github.com/nearai/ironclaw/pull/7184)** — Nostr host functions for WASM tools, open since 2026-08-04 with no reviewer activity visible; appears stalled.
- **[#7513](https://github.com/nearai/ironclaw/pull/7513)** — ACP serve CLI command (streaming + cancel), open 3 days from a new contributor, no comments; needs maintainer eyes.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI Project Digest — 2026-08-14

## 1. Today's Overview

LobsterAI is in a strong consolidation phase, with 11 PRs updated in the last 24 hours and 6 successfully merged or closed. The project is clearly prioritizing frontend/UI coherence, with three of today's merges dedicated to unifying the styling and interaction patterns across skills, MCP connectors, and the cowork management interface. A notable development is the merging of an "evergreen daily check-in" feature for the activity system, suggesting continued investment in user engagement mechanics. Concurrently, a significant enterprise edition PR was merged, indicating progress on commercial offerings. While there are no new releases today, the volume of merged work suggests that a release candidate may be imminent.

## 2. Releases

None.

## 3. Project Progress

Today’s merged and closed PRs show a clear focus on UI unification and prompt/engagement features:

- **Unified Interfaces for Skills, MCP, and Kits** — PR [#2487](https://github.com/netease-youdao/LobsterAI/pull/2487) merged skills and MCP views into a single "skills-and-connectors" view, while PR [#2486](https://github.com/netease-youdao/LobsterAI/pull/2486) refactored MCP cards and detail modals to match the styling of kits and skills. This removes visual fragmentation across three major management UIs.
- **Cowork Management UI Rework** — PR [#2488](https://github.com/netease-youdao/LobsterAI/pull/2488) closed a refactor of the cowork "BTW" (by-the-way) and management UI, completing the picture of a broader UI consistency push.
- **Evergreen Daily Check-in** — PR [#2485](https://github.com/netease-youdao/LobsterAI/pull/2485) converted the daily check-in activity from a one-off campaign into an evergreen, always-available feature, and moved the points entry to a web-based detail page instead of in-app expansion.
- **Enterprise Edition** — PR [#2484](https://github.com/netease-youdao/LobsterAI/pull/2484) merged an enterprise-focused change spanning renderer, docs, main, and OpenClaw areas, though the PR description lacks detail.
- **Scheduled Task Fix** — PR [#1232](https://github.com/netease-youdao/LobsterAI/pull/1232) fixed a bug where the first execution of a scheduled task never pushed its result to the UI due to a zero-value guard (`previousRunAtMs > 0`) in the polling logic.

## 4. Community Hot Topics

The only issue with engagement today is **Issue #1162** — *"[stale] 为 openclawMemoryFile 和 openclawLocalTimeContextPrompt 补充 Vitest 单元测试"* — with 1 comment. This issue requests adding 75 Vitest unit tests to two previously untested core modules: the OpenClaw memory file (MEMORY.md) manager, which handles read/write, CRUD, SQLite migration, and workspace-switch sync, and the local-time-context prompt generator. The [associated PR #1165](https://github.com/netease-youdao/LobsterAI/pull/1165) is open with the full test suite implemented. The underlying need here is mature test coverage for the memory subsystem — a high-risk area where false negatives could cause silent data loss or memory pollution. The "stale" tag but 5-month-long open window suggests this issue, while important, may not be on the critical path.

## 5. Bugs & Stability

Two bug fixes were addressed today, though both originated much earlier:

- **Medium: Scheduled task first-run result not pushed to UI** (PR [#1232](https://github.com/netease-youdao/LobsterAI/pull/1232)) — The first execution of a scheduled task never surfaced its result in real time because the update detection condition required both the old and new timestamps to be nonzero. This was closed today, eliminating a confusing "silent first run" behavior.
- **Medium: OpenClaw skill enable toggle silently ineffective** (PR [#2483](https://github.com/netease-youdao/LobsterAI/pull/2483)) — The PR keys skill entries by parsed frontmatter `name` rather than directory name, fixing a mismatch where UI enable/disable overrides were resolved by the wrong identifier. That PR currently remains open.

Two long-standing stale PRs that address real bugs remain open:
- **High: Duplicate custom agent names allowed** — PR [#1166](https://github.com/netease-youdao/LobsterAI/pull/1166) prevents ambiguous agent lists by blocking duplicate names at creation time.
- **Medium: "Run now" feedback gap in scheduled tasks** — PR [#1163](https://github.com/netease-youdao/LobsterAI/pull/1163) adds optimistic UI updates, IPC response improvements, and Gateway state sync.

Two other stale PRs (#1156, #1165) add test coverage for safety-critical modules.

## 6. Feature Requests & Roadmap Signals

- **Evergreen engagement features** — The conversion of the daily check-in to an evergreen state (PR [#2485](https://github.com/netease-youdao/LobsterAI/pull/2485)) signals that **gamification/engagement mechanics are planned as permanent product features**, not time-boxed marketing campaigns. Expect points, streaks, or other retention mechanics to become a regular part of the roadmap.
- **Deeper enterprise support** — The merged (but low-detail) enterprise edition PR [#2484](https://github.com/netease-youdao/LobsterAI/pull/2484) suggests the team is hardening the product for org-level deployments. This may foreshadow SSO, admin consoles, or team management features in upcoming releases.
- **Unified management UI as a platform** — The consistent merging of MCP/skills/kits/cowork interfaces into a single design system position the management layer as an extensible surface where new connector types can be added without fragmented UI paradigms.

## 7. User Feedback Summary

Direct user feedback is sparse today, with no new issues posted in the last 24 hours. The strongest signals come from the stale open PRs, which reflect persistent pain points:

- **Users need to know an action actually happened** — The scheduled-task "run now" issue (#1163) and the first-run no-feedback bug (#1232) both point to dissatisfaction with silent failures and slow polling-based state updates.
- **Users worry about irreversible mistakes** — The stalled PR #1156 calls out that uncovered dangerous-command detection logic could allow an AI to silently run `rm -rf` or `git push --force`, showing that users are anxious about AI autonomy safety; untested memory-write gating (PR #1165) adds to that concern.
- **Duplicate agents create distrust** — The slow-to-merge fix for duplicate agent names (PR #1166) indicates users were already hitting ambiguous, messy agent lists in practice.
- **Silent configuration failures** — The skill-key mismatch issue (#2441, addressed in PR #2483) shows that users toggled skills believing they were controlling behavior when the configuration was being resolved under a different key.

The overall mood in today’s data is that the community is pushing for **safety, predictability, and test coverage** of core memory and execution logic — a sign of a maturing user base relying on the tool for production use.

## 8. Backlog Watch

The following items are the most important open threads that have now gone stale for roughly 4.5 months and deserve prioritization or explicit closure:

- **PR #1165** — 75 Vitest tests for the memory-file and time-context modules (associated with issue #1162, the only issue with comments today). This is the single largest test-coverage win queued up and touches the most safety-critical code paths in the project.
- **PR #1156** — Tests for `commandSafety` and `coworkMemoryJudge`; closes the gap on dangerous-command detection and memory-write quality gating.
- **PR #1163** — Adds immediate feedback to the "run now" action in scheduled tasks and aligns context-menu styling with the rest of the UI.
- **PR #1166** — Prevents duplicate custom agent names. This is a small-scope fix that improves day-to-day usability, and its age suggests renderer tests may be needed before it can merge.
- **PR #2483** — Groups OpenClaw skill entries by frontmatter name; this one is not yet stale, but is important for ensuring skill-toggle behavior matches user intent.

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

**Moltis Project Digest — 2026-08-14**

### 1. Today's Overview
Moltis is in a steady maintenance and integration cycle, with no new releases published in the last 24 hours. The repository shows a healthy but moderate level of activity: four pull requests are open and being updated, while one issue was filed regarding a flaky test. The focus of current work is on compatibility fixes for macOS tooling and correcting upstream dependency paths that shifted to the `openclaw` organization. A significant feature PR introducing durable connectors and CalDAV support remains open and in active review. Overall, the project is processing infrastructure drift and test reliability issues without indications of major regressions or user-blocking defects.

### 2. Releases
No new releases were published in the last 24 hours. This section is omitted.

### 3. Project Progress
No pull requests were merged or closed in the last 24 hours. However, several open PRs saw updates and represent significant progress:
- **[PR #1194](https://github.com/moltis-org/moltis/pull/1194)**: Fix for macOS bash 3.2 compatibility in `just local-validate-full` by guarding empty bash array expansions against `unbound variable` errors.
- **[PR #1191](https://github.com/moltis-org/moltis/pull/1191)**: Fixes `moltis sandbox build` failures by updating the `gogcli` Go module path from the `steipete` org to the `openclaw` org.
- **[PR #1192](https://github.com/moltis-org/moltis/pull/1192)**: Corrects the `wacrawl` skill install metadata to point to the `openclaw` organization, resolving a broken Go install fallback.

### 4. Community Hot Topics
The most active item is the feature-rich **[PR #1190](https://github.com/moltis-org/moltis/pull/1190)** (updated 2026-08-13), which introduces a broad set of durable connectors and channel history capabilities. It adds:
- Provider-neutral connector persistence, atomic snapshots, scheduling, projections, and local full-text search.
- Read-only CalDAV datasets, plus message-history datasets for Slack, Discord, Matrix, and Microsoft Teams without storing channel credentials.
- Prompt-related improvements.

This PR signals strong demand for long-term memory, cross-platform data ingestion, and privacy-preserving credential handling. The underlying need appears to be extending Moltis from a reactive assistant into a persistent, context-aware platform capable of accessing and indexing historical user data across disparate services.

### 5. Bugs & Stability
One bug was reported in the last 24 hours, ranking as **moderate severity**:
- **[Issue #1193](https://github.com/moltis-org/moltis/issues/1193)**: `moltis-gateway` push fanout test is flaky under full-suite load, failing intermittently (2 of 3 runs) on an idle 10-core macOS machine despite a 1.855s execution time. This indicates a timing/race condition in the test logic rather than a production defect. No fix PR exists yet, but the test isolation issue is contained.

Additional **low-severity** environment-specific bugs were addressed via the open PRs listed above (macOS bash array expansion, Go module path drift), but no user-facing runtime stability issues were reported.

### 6. Feature Requests & Roadmap Signals
The clearest roadmap signal comes from **[PR #1190](https://github.com/moltis-org/moltis/pull/1190)**, which, once merged, will likely land in the next minor version. Predicted next-version features include:
- Durable, restart-safe connector state with atomic snapshots.
- CalDAV read-only datasets for calendar ingestion.
- Historical message retrieval from Slack, Discord, Matrix, and Teams without needing stored channel credentials.
- Bounded local full-text search over ingested data.

No new user feature requests were filed as issues in the last 24 hours; all signals are embedded in the open PR itself.

### 7. User Feedback Summary
No direct user comments or reactions were recorded in the last 24 hours. Indirect signals from the open PRs suggest users are experiencing friction in two areas: (1) build/tooling failures on macOS due to bash version differences, and (2) broken sandbox builds caused by upstream repository reorganizations (`gogcli`, `wacrawl`). The swift creation of targeted fix PRs (all authored by `Lstarsky0`) indicates that maintainers are responsive and that the community values rapid repair of environment-specific tooling issues.

### 8. Backlog Watch
The primary item warranting maintainer attention is **[Issue #1193](https://github.com/moltis-org/moltis/issues/1193)** (flaky push fanout test). While not critical, it has no linked fix and may need a test-level timeout adjustment or synchronization primitive change. The feature-rich **[PR #1190](https://github.com/moltis-org/moltis/pull/1190)** has been open since 2026-08-11 (three days) and, given its breadth (new connectors, search, scheduling), should be prioritized for review to avoid accumulating merge conflicts with the ongoing infrastructure fixes. No other issues or PRs appear stale or lacking maintainer response.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw Project Digest — 2026-08-14

## Today's Overview

CoPaw (QwenPaw) shows high activity with 42 issues and 50 PRs touched in the last 24 hours, culminating in the **v2.1.0 release** featuring the new QwenPaw OS Shell desktop environment. The project released v2.1.0 (stable) and v2.1.0-beta.5, closing out a release cycle that brought windowed app management, unified app catalogs, and conversation fixes. Community engagement is strong on both bug reporting (Chinese-language reports dominate) and feature requests, with several first-time contributors submitting PRs across Matrix channel isolation, provider capability templates, and session-scoped project directories. However, a **duplicate high-severity security incident report** (#6992, #6993) alleging unauthenticated plugin installation APIs and port exposure was filed and closed, requiring immediate maintainer verification.

## Releases

**v2.1.0** (released 2026-08-13/14) — Stable release featuring:

- **QwenPaw OS Shell**: Open apps in movable, resizable windows with a launcher, taskbar, notifications, and saved layouts (#6645)
- Unified app catalog across App Center and installed/marketplace apps
- Fix for chat handling of dict-like model responses (#6813)
- Simplified long-term memory guidance (#6942)
- Website documentation updates

**v2.1.0-beta.5** — Pre-release with bug fixes for chat model responses, memory guidance simplification, and docs/website fixes.

These releases are incremental improvements over 2.1.0-beta.x; no breaking changes or migration notes were published.

## Project Progress

Merged/closed PRs in the last 24 hours (19 total) include:

- **#6884 — Resilient Auto-Dream integration** (merged, first-time contributor `huiyiyichen`): Tolerates malformed LLM structured output instead of failing the entire task
- **#6387 — Optional channel dependencies on demand** (merged): Channel-specific SDKs moved out of default dependency set
- **#6652 — Server-side max_iterations enforcement in MissionGate** (merged, fixes #6505): Prevents controller LLM dispatching sub-agents indefinitely; root cause was `MissionGate.check()` not enforcing limits server-side
- **#6636 — Chat history pagination + GZip compression** (merged, fixes #6635): Fixes 30s timeouts on slow networks for long chats (1MB+) where the history endpoint returned all messages unpaginated
- **#6994/#6989 — Release notes for v2.1.0** (merged/closed)
- **#6992/#6993 — Security incident reports closed** (as noted below)

Open PRs under active review include: OneBot media localization (#6715), Matrix session/memory isolation per group sender (#7001), spawn parent-child linkage persistence (#7004), provider capability templates for custom models (#6823), and a "pawport" import flow from Codex/Qoder (#6960).

## Community Hot Topics

- **[#6921 — Agent stops mid-task without notification](https://github.com/agentscope-ai/QwenPaw/issues/6921)** (6 comments, open): The most-reported bug this period. Users report the agent outputs planning messages like "Now 2.1, 3.1, 3.2. Let me do all three." then stops silently, requiring a "continue" prompt. Affects QwenPaw 2.1beta2 on Windows 11. Root cause appears related to model output patterns, not yet diagnosed by maintainers.

- **[#6973 — Aliyun Bailian token plan support](https://github.com/agentscope-ai/QwenPaw/issues/6973)** (5 comments, open): User asks whether QwenPaw Creator can use Aliyun Bailian's token-based pricing plans; reflects growing demand for Chinese cloud provider integration.

- **[#6811 — OpenAI Responses shutdown/thinking issue](https://github.com/agentscope-ai/QwenPaw/issues/6811)** (5 comments, closed): Continuation summary ignores `disable_thinking` and misreports 60-second cancellation as malformed output. Closed, indicating fix landed.

- **[#6853 — Documentation lies about memory sync](https://github.com/agentscope-ai/QwenPaw/issues/6853)** (5 comments, closed): `prompts.py` claims dream process syncs digests to MEMORY.md but this was never implemented. Closed — related docs PR (#6997) now refreshes memory documentation.

- **Security incident reports #6992/#6993** (3/1 comments, both closed as invalid): Duplicate reports claiming port 8088 exposure and unauthenticated plugin APIs. The closure suggests maintainers verified and dismissed the claims, but the community may follow up if details were not adequately addressed.

## Bugs & Stability

| Severity | Issue | Description | Fix Status |
|----------|-------|-------------|------------|
| **High** | [#6992/#6993](https://github.com/agentscope-ai/QwenPaw/issues/6992) | Alleged security vulnerabilities: 0.0.0.0:8088 exposure, unauthenticated plugin installation, SSH backdoor vector | Closed as invalid — maintainers should publish a statement if this was a false positive to prevent confusion |
| **High** | [#6916](https://github.com/agentscope-ai/QwenPaw/issues/6916) (closed) | Plugins can silently create cron jobs and inject user-visible messages without approval (QwenPaw 2.1.0b3) | Closed — fix likely in 2.1.0 |
| **Medium** | [#6921](https://github.com/agentscope-ai/QwenPaw/issues/6921) | Agent stops after planning, no notification, needs "continue" prompt | **Open, no fix PR** — most impactful active bug |
| **Medium** | [#6951](https://github.com/agentscope-ai/QwenPaw/issues/6951) | After Scroll compression, pre-compression chat history invisible in UI; only internal eviction index shown | **Open, no fix PR** |
| **Medium** | [#7008](https://github.com/agentscope-ai/QwenPaw/issues/7008) | Anthropic model rejects long chat history with false "sensitive image" error (1026) | **Open** — model-side false positive blocking legitimate sessions |
| **Medium** | [#6768](https://github.com/agentscope-ai/QwenPaw/issues/6768) (closed) | Infinite loop after multi-step task, session blocked for hours; root cause: `max_iterations` not enforced | Fixed by merged PR #6652 |
| **Low** | [#6966](https://github.com/agentscope-ai/QwenPaw/issues/6966) | Telegram `/new` doesn't rotate session ID; context fills indefinitely via scroll history.db | **Open** |
| **Low** | [#7007](https://github.com/agentscope-ai/QwenPaw/issues/7007) | Windows Desktop TUI fails with "transport: Connection closed" — packaged exe rejects `-m qwenpaw acp` | **Open** |
| **Low** | [#6955](https://github.com/agentscope-ai/QwenPaw/issues/6955) | Intermittent startup crash on Windows (pip install, v2.0.1) | **Open** |
| **Low** | [#7005](https://github.com/agentscope-ai/QwenPaw/issues/7005) | Enabling Shabox breaks UV cache writes (~/.cache/uv) | **Open** — workaround: add `Write(~/.cache/uv/**)` to policy.yaml |

## Feature Requests & Roadmap Signals

Active feature requests with meaningful traction:

- **[#7003 — ViBo memory compression proposal](https://github.com/agentscope-ai/QwenPaw/issues/7003)** (2 comments): Third-party proposal for encrypted memory with 97.5% token reduction
- **[#6970 — Embeddable chat UI + API key URL param + session search](https://github.com/agentscope-ai/QwenPaw/issues/6970)**: Enterprise user requests standalone chat page without sidebar/header, and advanced session filtering — signals enterprise embedding demand
- **[#7002 — Server-side thin proxy client](https://github.com/agentscope-ai/QwenPaw/issues/7002)**: Wants lightweight client that connects to server-deployed QwenPaw with desktop-control capability
- **[#6995 — QWENPAW_CHANNEL env var for subprocesses](https://github.com/agentscope-ai/QwenPaw/issues/6995)**: Channel context propagation for external scripts
- **[#6976 — Session-scoped multi project directories](https://github.com/agentscope-ai/QwenPaw/pull/6976)** (open PR): Binds chat to ordered project directory list; likely candidate for v2.2.0
- **[#6960 — Pawport import flow from Codex/Qoder](https://github.com/agentscope-ai/QwenPaw/pull/6960)** (open PR): Migration path from competing agents; strong onboarding signal

The v2.1.0 QwenPaw OS Shell (windowed apps, taskbar, notifications) suggests the roadmap is steering toward a full desktop operating system metaphor for agent interactions.

## User Feedback Summary

**Pain points (Chinese-language reports dominate):**
- Silent task interruptions after planning requiring manual "continue" (#6921) — most complained-about issue
- Antivirus software terminating QwenPaw processes during task execution (#6847) — Windows trust concerns with file/process activity
- Context compression destroying user-visible transcripts (#6951) — users want compression to affect only model input, not display
- Startup crashes and instability on Windows (#6955)
- Confusing chat history behavior in task mode (#6457)

**Positive signals:**
- Community actively contributing first-time PRs (4+ new contributors this week)
- 33.7k stars acknowledged in proposals (#7003)
- Users building integrations (CopilotKit polling: #6882)
- Feature requests show sophisticated enterprise use cases (embedding, server deployments, session filtering)

**Language note:** Significant portion of issue traffic is in Chinese; maintainers respond bilingually, which the community appears to accept.

## Backlog Watch

| Item | Age | Status | Why It Matters |
|------|-----|--------|----------------|
| [#6921](https://github.com/agentscope-ai/QwenPaw/issues/6921) — Silent task stopping | 2 days | Open, 6 comments, no fix PR | Highest-impact active bug; repeated user reports suggest systemic issue |
| [#6951](https://github.com/agentscope-ai/QwenPaw/issues/6951) — Scroll compression hides history | 2 days | Open, no maintainer response | Regressions in core conversation UX |
| [#6853](https://github.com/agentscope-ai/QwenPaw/issues/6853) — Dream/MEMORY.md docs mismatch | Closed | Fix shipped in docs PR #6997 | Requires verification that implementation now matches docs |
| [#6047](https://github.com/agentscope-ai/QwenPaw/issues/6047) — New chat reopens old session | 32 days | Closed | Stale chats.json ordering fix may need regression check in 2.1.0 |
| [#6100](https://github.com/agentscope-ai/QwenPaw/issues/6100) — Lost workspace on upgrade | 31 days | Closed | Upgrade path safety for agent.json |
| [#7003](https://github.com/agentscope-ai/QwenPaw/issues/7003) — ViBo memory proposal | 1 day | Open, 2 comments | No maintainer response yet; worth acknowledging to encourage ecosystem contributions |
| [#6302](https://github.com/agentscope-ai/QwenPaw/pull/6302) — Unify provider discovery/routing | 24 days | Open PR, still in review | Large architectural PR; merging would simplify custom provider setup — worth prioritization given related issue volume |

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

**EasyClaw Project Digest — 2026-08-14**

**1. Today's Overview**

EasyClaw is in a low-activity state, with zero issue or pull request updates in the last 24 hours. Despite the quiet development cycle, the project shipped two consecutive releases (v1.8.98 and v1.8.99), indicating active maintenance and iterative feature deployment. The focus of recent updates centers on the Affiliate/creator workflows, specifically adding product knowledge context and cloud LLM usage attribution per device. The project appears to be in a stable phase with no reported regressions or ongoing community troubleshooting, and current development effort is directed at feature enrichment rather than bug fixing.

**2. Releases**

Two new versions were released:

- **[v1.8.99 — TK Copilot](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.99)** : Introduces per-device attribution for cloud LLM usage and improves safeguards on Affiliate and Product Knowledge forms. No breaking changes or migration notes included.
- **[v1.8.98 — TK Copilot](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.98)** : Adds Product Knowledge support and provides exact per-agenda product context for Affiliate workflows. No breaking changes or migration notes included.

Both releases include macOS Gatekeeper workaround instructions for the "‘RivonClaw’ is damaged and can’t be opened" error, which remains a recurring installation friction point for end users.

**3. Project Progress**

No pull requests were merged or closed in the last 24 hours. The functional progress evident today comes entirely through the two releases: v1.8.98 established the infrastructure for embedding product knowledge into Affiliate agendas, and v1.8.99 builds on that by adding device-level usage tracking for cloud LLM calls and hardening form inputs. These changes advance the product's data accuracy and traceability for creator workflows.

**4. Community Hot Topics**

No issues or pull requests were updated today, so there are no active community threads to report. There is no visible community discussion or controversy to surface at this time.

**5. Bugs & Stability**

No new bugs, crashes, or regressions were reported in the last 24 hours. The only known friction point is the macOS Gatekeeper warning for unsigned binaries, which is documented in both release notes with standard workarounds (right-click → Open). This is a minor installation-level inconvenience, not a runtime stability issue, and no user-generated bug reports are pending.

**6. Feature Requests & Roadmap Signals**

No explicit feature requests were filed today. Based on the release trajectory, the roadmap is clearly oriented toward deepening the Affiliate/creator module. The progression from product knowledge context (v1.8.98) to granular usage metering (v1.8.99) suggests the next likely increment is a dashboard or analytics view that visualizes the per-device LLM usage data, possibly for quota management or billing transparency. Additionally, the repeated macOS notarization issue may prompt a future packaging fix to eliminate Gatekeeper warnings.

**7. User Feedback Summary**

No new user feedback was captured today. The absence of issue traffic indicates that recent releases have not introduced visible regressions. The persistent macOS installation warning, noted in consecutive release notes, suggests this is a known, tolerated UX friction rather than a blocker, as there are no complaints logged against it.

**8. Backlog Watch**

There are no outstanding open issues or pull requests requiring maintainer attention. The project backlog is clear, with an empty issue tracker and no pending feature branches. Maintainer focus should remain on the existing release cadence and monitoring for feedback on the newly introduced Product Knowledge and device attribution features.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar).*