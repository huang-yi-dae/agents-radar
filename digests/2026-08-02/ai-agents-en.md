# OpenClaw Ecosystem Digest 2026-08-02

> Issues: 500 | PRs: 500 | Projects covered: 13 | Generated: 2026-08-02 09:42 UTC

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

# OpenClaw Project Digest — 2026-08-02

## 1. Today's Overview

OpenClaw is under heavy triage load: 500 issues and 500 PRs were updated in the last 24 hours, with 48 issues closed and 76 PRs merged/closed. One new beta release shipped — **v2026.7.2-beta.7** — centered on state safety and crash recovery, signaling the maintainers' current focus on durability infrastructure. Activity is dominated by a large backlog of P1 bugs awaiting maintainer review; nearly every top issue carries `clawsweeper:needs-maintainer-review` and `clawsweeper:needs-product-decision` labels, suggesting an automated triage pipeline (clawsweeper) that is outrunning human capacity. Community engagement clusters around realtime voice, the Codex integration, MCP tool injection into subagents, and configurable streaming timeouts. Despite the backlog, the pipeline is moving: a P0 onboarding crash was closed and a broad set of CLI/WebChat/security PRs are ready for review.

📦 Release: [v2026.7.2-beta.7](https://github.com/openclaw/openclaw/releases)

---

## 2. Releases

**v2026.7.2-beta.7** (2026-08-02) — "State safety and recovery" release:

- **Quarantine store** that survives primary-database damage
- **Crash-recoverable SQLite snapshots**
- **Crash-durable filesystem publication**
- **Schema-upgrade data-loss rejection** (prevents migrations from silently destroying data)
- **Rollback-writer snapshot recovery**

No explicit breaking changes or migration notes were included in the release excerpt. Given the theme, operators on beta channels should verify their persistence layer after upgrade, especially around SQLite-backed registries.

---

## 3. Project Progress

76 PRs were merged/closed in the last 24 hours. Notable visible activity:

**Closed/merged:**
- [#114411](https://github.com/openclaw/openclaw/pull/114411) — `refactor(cli)`: consolidate security-sensitive regression fixtures (test-infra debt reduction)
- [#67366](https://github.com/openclaw/openclaw/issues/67366) — **P0 closed**: `TypeError` during `openclaw onboard` when replacing a Telegram token
- [#117762](https://github.com/openclaw/openclaw/issues/117762) — closed: frozen/unfinished chat session reports
- [#101788](https://github.com/openclaw/openclaw/issues/101788) — closed: one-shot run cleanup leaking Codex app-server processes (inverted `closeAndWait` condition)

**Ready for maintainer review (high-signal open PRs):**
- [#117923](https://github.com/openclaw/openclaw/pull/117923) — `fix(openai)`: prevent provisional realtime tool calls from running (addresses #116201)
- [#117268](https://github.com/openclaw/openclaw/pull/117268) — `fix(media-understanding)`: resolve inbound `media://` refs carried as attachment URL
- [#116489](https://github.com/openclaw/openclaw/pull/116489) — `feat(security)`: require acknowledgment for install policy warnings
- [#117932](https://github.com/openclaw/openclaw/pull/117932) — `perf(cli)`: keep read-only commands on cold paths (e.g., `gateway usage-cost --json` from 48.2s → ~1s)
- [#117928](https://github.com/openclaw/openclaw/pull/117928) — `feat(cli)`: consistent `--json` across reporting commands
- [#117936](https://github.com/openclaw/openclaw/pull/117936) — `feat(webchat)`: expand truncated assistant messages inline
- [#117921](https://github.com/openclaw/openclaw/pull/117921) — `fix(macos)`: rework onboarding handoff to dashboard custodian
- [#115277](https://github.com/openclaw/openclaw/pull/115277) — `fix(agents)`: materialize MCP for server-name `toolsAllow` globs (closes a cron/isolated-run gap)
- [#116900](https://github.com/openclaw/openclaw/pull/116900) — `fix(feishu)`: deliver `ask_user` question cards

**Durable Core series progressing:** PR [2/6](https://github.com/openclaw/openclaw/pull/111121) (opt-in shared-state foundation) and [3/6](https://github.com/openclaw/openclaw/pull/111278) (owner-first Gateway recovery) are both open and ready for maintainer look — a major infrastructure push toward "agent silence" on supported 7.1 paths.

---

## 4. Community Hot Topics

Most-commented issues (links to GitHub):

- [#116201](https://github.com/openclaw/openclaw/issues/116201) — **Realtime voice work can retain unbounded provider/consult state** (41 comments, P1, 🦞 diamond lobster). *Underlying need:* users are pushing realtime voice hard, but hit resource-retention walls; they want hard ownership bounds rather than soft item-count signals.

- [#91009](https://github.com/openclaw/openclaw/issues/91009) — **Codex PreToolUse hook spawns CPU-bound `openclaw-hooks` processes, stalling gateway RPC** (19 comments, 2👍, P1). *Underlying need:* Codex integration reliability is a top pain — hook relay processes burning 100% CPU each directly degrades production gateways.

- [#68596](https://github.com/openclaw/openclaw/issues/68596) — **Feature Request: configurable streaming watchdog timeout** (15 comments, 8👍, P2). *Underlying need:* extended-reasoning models (kimi-k2.5, DeepSeek-R1) trigger false-positive watchdog warnings; users want the threshold tunable.

- [#62505](https://github.com/openclaw/openclaw/issues/62505) — **[Bug]: Coding Agent never completes anything** (15 comments, 1👍, P1 regression). *Underlying need:* the core coding-agent value proposition is broken for affected users since 2026.4.2 — highest-trust regression.

- [#85030](https://github.com/openclaw/openclaw/issues/85030) — **MCP tools not injected into subagent (`sessions_spawn`) sessions** (10 comments, 6👍, P1). *Underlying need:* MCP ecosystem users expect tool inheritance across spawned sessions; currently all allow/deny mechanisms are ignored for subagents.

- [#73182](https://github.com/openclaw/openclaw/issues/73182) — **Reasoning default silently flipped to on for Claude models — doubles Anthropic spend** (7 comments, P1). *Underlying need:* cost transparency and default-behavior stability — silent config flips erode trust.

**Key takeaway:** the community is simultaneously pushing for (a) new realtime voice/MCP capabilities, and (b) hardening of the core agent loop, cost predictability, and resource bounds.

---

## 5. Bugs & Stability

Ranked by severity (fix PRs noted where visible):

**Critical / P0-P1 with security, data-loss, or crash-loop impact:**
- [#72418](https://github.com/openclaw/openclaw/issues/72418) — `shouldSkipBackendSelfPairing` lets loopback clients self-declare `GATEWAY_CLIENT` identity and bypass device pairing (CVSS 8.7/9.3, P1, security). No open fix PR visible.
- [#73182](https://github.com/openclaw/openclaw/issues/73182) — Silent reasoning default flip for Claude doubles API spend and leaks thinking blocks to chat (P1, security/spend). No fix PR visible.
- [#91009](https://github.com/openclaw/openclaw/issues/91009) — Codex hook relay spawns CPU-bound processes and stalls gateway RPC (P1, crash-loop). No fix PR visible.
- [#62505](https://github.com/openclaw/openclaw/issues/62505) — Coding Agent regression: never completes anything (P1, regression, message-loss). No fix PR visible.
- [#74986](https://github.com/openclaw/openclaw/issues/74986) — `openclaw infer` hangs indefinitely with child at 100% CPU and zero network I/O (P1, hang).
- [#114020](https://github.com/openclaw/openclaw/issues/114020) — Feishu/Telegram dispatch fails on 2026.7.2-beta.4: `runChannelInboundEvent requires runDispatchLifecycle` (P1, channel-wide breakage, beta regression).
- [#67136](https://github.com/openclaw/openclaw/issues/67136) — Write tool falsely reports success but no file is created (data loss, linked PR open).

**P1 session-state / message-loss cluster (recurring theme):**
- [#116201](https://github.com/openclaw/openclaw/issues/116201) — Realtime voice unbounded provider/consult retention — fix PR [#117923](https://github.com/openclaw/openclaw/pull/117923) ready.
- [#67777](https://github.com/openclaw/openclaw/issues/67777), [#92076](https://github.com/openclaw/openclaw/issues/92076) — Subagent completion delivery lost on timeout/drain/orphan paths or locked transcripts (both P1, `clawsweeper-recovery-stuck`).
- [#114211](https://github.com/openclaw/openclaw/issues/114211) — Matrix room agents loop on no-reply output and replay stale state (P1).
- [#114653](https://github.com/openclaw/openclaw/issues/114653) — `sessions_send`/`sessions_history` transient failures indistinguishable from policy denial (P1, bare `catch` swallows errors).

**P2 stability/ops:**
- [#75380](https://github.com/openclaw/openclaw/issues/75380) — `provider-payload.jsonl` / `cache-trace.jsonl` grow unbounded with no rotation policy (P1, disk/security).
- [#90595](https://github.com/openclaw/openclaw/issues/90595) — Cron "failed" notifications fire during hot reload/retries → alert fatigue.
- [#75380](https://github.com/openclaw/openclaw/issues/75380), [#71689](https://github.com/openclaw/openclaw/issues/71689) — SQLite corruption recovery for tasks registry (P1; release addresses this theme).

**Overall stability assessment:** the dominant failure clusters are (1) subagent completion/session-state delivery, (2) MCP tool exposure in spawned sessions, and (3) provider-integration lifecycle bugs (Codex hooks, realtime voice, channel dispatch). Several have open fix PRs in review, but many P1s remain stuck behind maintainer review.

---

## 6. Feature Requests & Roadmap Signals

**Most-supported community requests:**
- [#68596](https://github.com/openclaw/openclaw/issues/68596) — Configurable streaming watchdog timeout (8👍) — *likely in next release* given the open PR momentum and repeated complaints with reasoning models.
- [#85030](https://github.com/openclaw/openclaw/issues/85030) — MCP tool injection into subagents (6👍) — fix PR [#115277](https://github.com/openclaw/openclaw/pull/115277) targets the cron/isolated-run variant; broader fix still needed.
- [#81061](https://github.com/openclaw/openclaw/issues/81061) — `before_route_inbound_message` pre-routing hook for channel bridging/proxying (3👍).
- [#87660](https://github.com/openclaw/openclaw/issues/87660) — Lifecycle-aware LLM curation for `MEMORY.md` (2👍).
- [#71142](https://github.com/openclaw/openclaw/issues/71142) — Configurable Control UI upload size limit (hardcoded 5MB).
- [#71736](https://github.com/openclaw/openclaw/issues/71736) — Data-driven Control UI plugin contribution slots (RFC, SDK surface).
- [#71195](https://github.com/openclaw/openclaw/issues/71195) — OpenAI Realtime speech-to-speech parity for macOS Talk Mode (sub-second turns vs 1.7–4.9s STT chain).
- [#71712](https://github.com/openclaw/openclaw/issues/71712) — Agent-facing scheduling API with non-forgeable cron provenance.
- [#63392](https://github.com/openclaw/openclaw/issues/63392) — Per-agent backup/restore/clone.
- [#116615](https://github.com/openclaw/openclaw/issues/116615) — Config-free pre-mutation guard for native `apply_patch`.

**Signals from open PRs (likely next-version content):** WebChat inline message expansion, universal `--json` CLI support, CLI cold-path performance (9 commands currently 9.7–48s → ~1s), install-policy warning acknowledgments, buffered media output safety, and the 6-part **Durable Core** series (Gateway recovery, shared-state foundation).

---

## 7. User Feedback Summary

**Satisfaction drivers:** the new beta's state-safety focus (quarantine store, crash-recoverable snapshots) directly addresses long-standing corruption complaints like #71689; the community consistently rewards configurability (watchdog timeout, upload limits, chunk limits) and CLI ergonomics (`--json`, performance).

**Dissatisfaction / pain points:**
- **Silent failures** are the #1 trust killer: model switches failing silently (#58957), write tool lying about success (#67136), CLI silently resuming last session via `--channel last` (#71417), and silent fallback to embedded mode (#76492).
- **Regression anxiety:** "worked in 2026.4.2 and earlier" appears repeatedly (#62505, #67136); users are actively tracking when behavior changed.
- **Cost surprises:** the silent Claude reasoning-default flip (#73182) and unbounded diagnostic JSONL logs (#75380) both create real dollar/disk impact.
- **Alert fatigue:** cron failure notifications during hot reload/retry (#90595) and fake "no reply generated" fallbacks after successful thread-replies (PR #117176).
- **Extended-reasoning model friction:** watchdog false positives (#68596) show users are running R1/kimi-class models and the platform isn't tuned for them yet.
- **Accessibility:** screen readers announcing every streaming token (#65538) — a real UX regression for assistive-tech users.

**Use-case signals:** property agents automating WhatsApp (#74261), always-on home servers needing boot-without-login on macOS (#51860), and SDK dogfooding via OpenMeow (#74704) show a widening operator base beyond CLI power users.

---

## 8. Backlog Watch

Long-running, high-importance items needing maintainer attention:

- [#51860](https://github.com/openclaw/openclaw/issues/51860) — **Open since 2026-03-21** (P2, security): gateway install hardcodes `~/Library/LaunchAgents`, preventing boot-without-login on macOS. Stale.
- [#58957](https://github.com/openclaw/openclaw/issues/58957) — **Open since 2026-04-01** (P1, 🦞 diamond lobster): model switch fails silently on large carried-over context. Stale.
- [#62505](https://github.com/openclaw/openclaw/issues/62505) — **Open since 2026-04-07** (P1, regression): Coding Agent never completes. 15 comments, no fix PR.
- [#67777](https://github.com/openclaw/openclaw/issues/67777) — **Open since 2026-04-16** (P1, message-loss): subagent completion delivery can be lost. 11 comments, `clawsweeper-recovery-stuck`.
- [#73182](https://github.com/openclaw/openclaw/issues/73182) — **Open since 2026-04-28** (P1, security/spend): silent reasoning-default flip for Claude — doubles Anthropic spend.
- [#76492](https://github.com/openclaw/openclaw/issues/76492) — **Open since 2026-05-03** (P2, 🦞 diamond lobster): `openclaw agent` CLI silently falls back to embedded mode, masking gateway behavior. Stale.
- [#91009](https://github.com/openclaw/openclaw/issues/91009) — **Open since 2026-06-06** (P1, crash-loop): Codex hook relay CPU burn. 19 comments, 2👍, no fix PR.

**Process bottleneck:** nearly every top-50 issue carries `clawsweeper:needs-maintainer-review` and `clawsweeper:needs-product-decision` — even issues with clear repro steps and fix shapes. The `clawsweeper-recovery-stuck` label on several P1s suggests automated recovery attempts are failing repeatedly. If the maintainer review queue is the constraint, the 76-PR merge rate and P0 closure today indicate the team is working through it — but the >400 open issues with maintainer-review labels remain the single biggest project-health risk.

---

*Data sources: [OpenClaw issues](https://github.com/openclaw/openclaw/issues) · [OpenClaw PRs](https://github.com/openclaw/openclaw/pulls) · [OpenClaw releases](https://github.com/openclaw/openclaw/releases) — snapshot 2026-08-02.*

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report — Personal AI Assistant / Agent Open-Source Ecosystem
**Snapshot: 2026-08-02 (24-hour window)** · Prepared for technical decision-makers and developers

---

## 1. Ecosystem Overview

The personal AI assistant ecosystem remains hyper-concentrated around **OpenClaw** as the core reference implementation, with a family of "‑Claw/‑Paw" derivatives (ZeroClaw, IronClaw, NanoClaw, CoPaw, PicoClaw, and others) carving out specialized niches in security, protocol discipline, Apple-first channels, and Qwen-ecosystem alignment. Aggregate 24-hour activity across tracked projects approached **1,200 issue/PR updates**, with OpenClaw alone accounting for ~85%. The dominant engineering theme has shifted from feature breadth to **state durability and crash recovery** — OpenClaw shipped a quarantine store and crash-recoverable SQLite snapshots; ZeroClaw is redesigning memory separation; NanoBot is fixing session-consolidation data loss. A second ecosystem-wide theme is the **elimination of silent failures** (false-success write tools, swallowed errors, misleading cron results), and a third is **security hardening of tool surfaces** (SSRF, path traversal, symlink escapes, approval tiers). Cost transparency and protocol interop are rapidly rising as adoption gatekeepers.

---

## 2. Activity Comparison

*Figures = items updated in the last 24h. Health score = analyst assessment (1–10) of throughput, responsiveness, backlog hygiene, and signal quality.*

| Project | Issues (24h) | PRs (24h) | Closures (Issues/PRs) | Release (24h) | Health |
|---|---|---|---|---|---|
| **OpenClaw** | 500 | 500 | 48 / 76 | v2026.7.2-beta.7 | **7/10** — hyperactive but review-bottlenecked; 400+ items await maintainer review |
| **ZeroClaw** | 50 | 50 | 0 / 1 | v0.8.4 train in motion | **6/10** — active design/release phase; security PRs blocked on author action |
| **IronClaw** | 7 | 20 | 1 / 6 | none | **8/10** — strong architectural velocity; unresolved p95 latency regression |
| **NanoBot** | 3 (all closed) | 22 | 3 / 10 | none | **9/10** — same-day fixes, clean backlog, responsive maintainers |
| **NanoClaw** | 2 | 12 | 1 / 3 | v2.1.54 (breaking) | **8/10** — responsive merges; shipped migration-relevant release |
| **CoPaw** | 2 | 7 | 0 / 1 | none | **6/10** — consistent bug-fix cadence; unanswered questions |
| **LobsterAI** | 3 | 6 | 2 (stale) / 2 (deps) | none | **3/10** — stale-bot closing items; no maintainer bandwidth |
| **PicoClaw** | 1 | 1 | 0 / 1 | none | **4/10** — one merge; key Matrix bug carries `[stale]` label |
| **Moltis** | 0 | 1 | 0 / 0 | none | **5/10** — quiet; single fix pending review |
| **EasyClaw** | 0 | 0 | 0 / 0 | v1.8.84 | **5/10** — clean backlog, shipped release; zero community engagement |
| **NullClaw** | 0 | 0 | — | none | **1/10** — dormant |
| **TinyClaw** | 0 | 0 | — | none | **1/10** — dormant |
| **ZeptoClaw** | 0 | 0 | — | none | **1/10** — dormant |

---

## 3. OpenClaw's Position

**Advantages vs. peers**

- **Order-of-magnitude community scale**: 500 issues + 500 PRs updated in 24h ≈ 10× ZeroClaw (the next-largest) and ~45× IronClaw/NanoBot. Its 76 PRs merged/closed in one day exceeds the combined merge throughput of all other tracked projects.
- **Community gravity**: the ecosystem's highest-signal discussions (realtime voice, MCP subagent injection, Codex integration, watchdog timeouts) surface on OpenClaw first. The 🦞 diamond-lobster designations, 41-comment threads, and repeat "worked in 2026.4.2" regression reports indicate the largest and most demanding installed base.
- **Release velocity + durability investment**: v2026.7.2-beta.7 (quarantine store, crash-recoverable snapshots, rollback-writer recovery, migration data-loss rejection) is ahead of peers on the exact failure modes smaller projects are also fighting.
- **Automation**: the `clawsweeper` triage pipeline produces a labeled, data-driven backlog — novel at this scale, though it now outruns maintainer capacity.

**Technical approach differences**

OpenClaw is a breadth-first, gateway-centric platform: SQLite-backed registries, quarantine store for state-safety, a 6-part **Durable Core** series (opt-in shared state, owner-first Gateway recovery), and automated triage. Peers are more specialized: ZeroClaw and IronClaw apply Rust/contract rigor with RFC-driven or CI-gated discipline; NanoBot prioritizes WebUI UX speed; NanoClaw owns device/credential lifecycle; CoPaw aligns to the Qwen/Aliyun stack.

**Key risk**: more than 400 open issues carry `clawsweeper:needs-maintainer-review` / `needs-product-decision` labels, including P1s with clear repro steps (e.g., #62505 Coding Agent regression, #91009 Codex hook CPU burn). Pipeline throughput is healthy, but human review capacity is the binding constraint.

---

## 4. Shared Technical Focus Areas

Requirements emerging independently across multiple projects:

| Focus Area | Projects | Specific Needs |
|---|---|---|
| **Durable session/memory state** | OpenClaw, ZeroClaw, NanoBot, CoPaw, IronClaw | Crash-recoverable stores, quarantine on DB damage, separation of conversation history vs. curated memory, session-consolidation data-loss fixes, context-compression correctness |
| **Eliminating silent failures** | OpenClaw, ZeroClaw, NanoClaw, CoPaw, PicoClaw, LobsterAI | Write tool false-success, cron reporting `ok` while discarding output, swallowed empty model responses, credential expiry surfacing as confusing errors, Matrix sync dying silently, false-positive connectivity tests |
| **Security hardening of tool surfaces** | ZeroClaw, OpenClaw, NanoBot, NanoClaw, IronClaw | SSRF gates, path/symlink validation, per-sender rate limiting, trusted-proxy auth, device-pairing bypass fixes, fail-closed CI gates, credential-expiry alerts |
| **Cost control & provider transparency** | OpenClaw, ZeroClaw, IronClaw, CoPaw | Silent reasoning-default flips, unbounded diagnostic log growth, OpenRouter prompt-cache session IDs, cache-prefix byte stability, provider model-list accuracy |
| **Subagent / session composition** | OpenClaw, NanoBot | MCP tool inheritance into spawned sessions, subagent completion-delivery guarantees, per-subagent model presets, cross-session delegation |
| **Standard protocol interop** | ZeroClaw, NanoBot, IronClaw | OpenAI-compatible Chat Completions surface, Responses API reasoning-state preservation, A2A outbound, built-in provider catalog metadata |
| **Realtime voice** | OpenClaw, ZeroClaw | Resource-bounded realtime sessions, sub-second speech-to-speech (macOS Talk Mode), Gemini Live channel |

---

## 5. Differentiation Analysis

| Project | Feature Focus | Target Users | Architecture / Approach |
|---|---|---|---|
| **OpenClaw** | Breadth-first reference gateway: voice, MCP, 15+ channels, CLI/WebChat, durable core | Prosumers → enterprise operators | Gateway-centric, SQLite registries + quarantine store, clawsweeper automated triage, beta release train |
| **ZeroClaw** | Security posture + memory architecture; per-model capability metadata from models.dev | Security-conscious operators, large deployments | Rust microkernel (18 publishable crates), RFC-driven design, Claude Code-style approval tiers |
| **IronClaw** | Protocol/contract discipline; extension ecosystem (IronHub); CI determinism | NEAR-ecosystem and protocol-focused developers | Rust workspace, contract inversion onto `product_contracts`, strict fail-closed CI gates, merge-queue craft |
| **NanoBot** | WebUI daily-driver UX: cross-session search, Quick Chat, trusted-proxy auth | Self-hosters, multi-session/multi-model users | Python; fast-fix maintainer cadence (same-day merges); early adopter of OpenAI Responses reasoning state |
| **NanoClaw** | Apple-first channels (unified iMessage local/hosted), credential lifecycle, setup correctness | macOS individuals, security-conscious self-hosters | TypeScript; host/container DB single-writer rigor; Photon-backed hosted iMessage |
| **CoPaw** | Qwen/Aliyun alignment; skills/plugin reconciliation; context-compression fixes | Qwen-model developers, Chinese ecosystem | Python/AgentScope lineage; reconcile-based skill manifest management |
| **LobsterAI** | Enterprise IM (popo) connectivity; task-list sorting; cowork UI performance | Chinese enterprise users | Closed-ish maintenance; limited OSS engagement |
| **PicoClaw** | Matrix channel reliability; zh-TW localization | Self-hosters, small hardware | Minimal footprint; low activity |
| **EasyClaw** | Desktop↔web auth continuity (TK Copilot); credential hygiene in callback URLs | End-users of TK Copilot | Release-driven; no OSS issue/PR surface |

---

## 6. Community Momentum & Maturity

- **Tier 1 — Hyper-scale, bottlenecked**: **OpenClaw**. Unmatched throughput (500/500 daily updates, 76 PR closures) but maintainer review is the constraint; automated triage has created a 400+ item decision queue.
- **Tier 2 — Rapid, disciplined iteration**: **ZeroClaw** (v0.8.4 release train + accepted memory/security RFCs), **IronClaw** (Reborn Wave 2 contract-inversion refactor, 6 PRs merged), **NanoBot** (feature velocity + same-day bug fixes), **NanoClaw** (breaking release shipped, 3 merges, release automation hardening).
- **Tier 3 — Hardening / maintenance**: **CoPaw** (5-PR bug-fix cluster), **PicoClaw** (localization merge; one critical stale bug), **LobsterAI** (stale-bot cleanup, no fresh merges), **Moltis** (single fix pending), **EasyClaw** (release-only, zero engagement).
- **Tier 4 — Dormant**: **NullClaw**, **TinyClaw**, **ZeptoClaw** — no 24h activity.

**Maturity signal**: the ecosystem is bifurcating. Tier 1–2 projects are investing in durability, security, and UX; Tier 3 shows the classic fork-lifecycle pattern of declining contributor bandwidth. The Rust-based projects (ZeroClaw, IronClaw) exhibit the strongest engineering-process discipline (RFCs, CI gates, contract inversion), while NanoBot demonstrates the fastest bug-to-fix turnaround.

---

## 7. Trend Signals

1. **State durability is the new competitive moat.** OpenClaw's quarantine store and crash-recoverable snapshots, ZeroClaw's memory-separation RFC cluster (#9048/#9103/#6850), and NanoBot's session-consolidation data-loss fixes all converge on one requirement: **agents must survive crashes, migrations, and restarts without corrupting or losing conversation/memory state.** *For developers:* design persistent state with write-ahead recovery and explicit lifecycle separation from day one.

2. **Silent failures are the #1 trust killer across the ecosystem.** Six projects show users actively punished by invisible failures — the write tool lying about success (OpenClaw #67136), cron reporting `ok` while discarding output (ZeroClaw #9340), empty model responses swallowed (CoPaw #6601), Matrix chatting dying silently (PicoClaw #3203), credential expiry surfacing as "Read-only file system" (NanoClaw #3167). *For developers:* every failure path needs a visible, user-comprehensible surface; "fail loud" is now a product requirement.

3. **Cost transparency is a hard adoption gate.** Silent Claude reasoning-default flips doubling Anthropic spend (OpenClaw #73182), OpenRouter replaying system prompts every turn (ZeroClaw #9631), and prompt-cache churn from unstable prefixes (IronClaw #7012) show users actively auditing token economics. *For developers:* expose spend/cache telemetry, stabilize request prefixes, and never change default model behavior silently.

4. **The security perimeter has moved to the tool layer.** ZeroClaw's SSRF/path/symlink fix cluster, NanoBot's per-sender rate limiting, OpenClaw's device-pairing bypass (CVSS 8.7–9.3), and NanoClaw's DB single-writer rule collectively signal that **tool execution policies (allow/ask/deny, per-command confirmation, path validation) are the expected UX**, not a differentiator.

5. **Protocol interop unlocks existing client ecosystems.** ZeroClaw's Chat Completions RFC (#8603) is explicitly driven by demand from Open WebUI, LobeChat, Continue.dev, Aider, and LangChain users; NanoBot is preserving OpenAI Responses reasoning state; MCP tool propagation to subagents is a P1 across OpenClaw. *For developers:* implement standard protocols (OpenAI-compatible, MCP, A2A) rather than bespoke APIs — the client ecosystem is the growth channel.

6. **Agent composition is the next frontier — and reliability is the bottleneck.** Cross-session delegation (NanoBot #5211), MCP inheritance into spawned sessions (OpenClaw #85030), and subagent completion-delivery guarantees (OpenClaw #67777, NanoBot #5152) are all in flight. The capability exists; what's failing is **guaranteed delivery, state propagation, and resource bounds** across subagent boundaries.

7. **Edge/device agents are emerging as a distinct category.** macOS Talk Mode parity, unified iMessage backends, boot-without-login, rootless Docker support, and Matrix home-server resilience show the "personal" in personal AI becoming device-local. Small-hardware and privacy-conscious operators (property agents, home servers, rootless Docker users) are a growing constituency with distinct constraints.

**Bottom line for decision-makers**: OpenClaw remains the reference implementation and the safest baseline for breadth, but its review-queue bottleneck means high-value fixes can stall for months. ZeroClaw and IronClaw offer the strongest engineering discipline for security- and contract-sensitive deployments; NanoBot offers the best responsiveness-to-size ratio; NanoClaw is the most credible for Apple-centric operators. Across all projects, the winning bets are durable state, loud failures, transparent cost, and standard-protocol interop.

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot Project Digest — 2026-08-02

## 1. Today's Overview

NanoBot's activity level is high for this reporting window: 22 pull requests were updated, with 10 merged or closed and 12 remaining open for review. Three issues were closed — two resolved by merged fixes and one dismissed as invalid. No new release was published. The project continues to mature rapidly, with a strong focus on WebUI usability (cross-session search, Quick Chat, trusted-proxy auth), channel/provider parity, and defensive stability hardening. The merged PRs directly address two of the three reported bugs, showing responsive maintainer turnaround and a generally healthy, well-maintained project.

## 2. Releases

No new releases were published in the last 24 hours. There are no updated version notes, breaking changes, or migration steps to report for this window.

## 3. Project Progress

Among the 10 merged/closed PRs, the visible set shows substantial progress across four areas:

**Stability & correctness fixes**
- [PR #5183](https://github.com/HKUDS/nanobot/pull/5183) — `fix(cron): preserve manual run completion state`. Resolves [Issue #5163](https://github.com/HKUDS/nanobot/issues/5163) by protecting the live cron store during both scheduled and manual runs so WebUI/API reads can no longer overwrite completion status mid-run.
- [PR #5153](https://github.com/HKUDS/nanobot/pull/5153) — `fix(memory): handle non-string timestamp and missing role in raw_archive`. Resolves [Issue #4801](https://github.com/HKUDS/nanobot/issues/4801), a `KeyError` crash on malformed session entries.
- [PR #5200](https://github.com/HKUDS/nanobot/pull/5200) — `fix(exec): preserve wait targets across response truncation`. Ensures `write_stdin(wait_for=...)` still works when head/tail truncation omits the wait target.
- [PR #5208](https://github.com/HKUDS/nanobot/pull/5208) — `fix(dream): advance cursor when durable changes were made`. Stops the Dream cron job from reprocessing the same history batches when ephemeral agent runs end with non-clean stop reasons.

**Channels & provider behavior**
- [PR #5108](https://github.com/HKUDS/nanobot/pull/5108) — `fix(channels): add per-sender message rate limiting`. Adds debounce/throttle/cooldown controls so a paired user cannot consume unlimited LLM tokens — an important abuse-prevention hardening step.
- [PR #3732](https://github.com/HKUDS/nanobot/pull/3732) — `fix(providers): require api_base before local provider wins on keyword match`. Closes a silent provider-hijacking bug where local providers could claim cloud-hosted model keywords.

**Feature work**
- [PR #5172](https://github.com/HKUDS/nanobot/pull/5172) — `feat: preserve Responses reasoning state and compact context`. Adopts OpenAI Responses API capabilities (replaying opaque output-item chains, including encrypted reasoning) inspired by the ARC-AGI-3 report.

**WebUI & code hygiene**
- [PR #5209](https://github.com/HKUDS/nanobot/pull/5209) — `refactor(webui): reuse sidebar selection highlight`. Fixes visual flicker and makes sidebar/settings navigation highlights consistent.
- [PR #5199](https://github.com/HKUDS/nanobot/pull/5199) — `refactor(cli): narrow Pyright suppressions`. Replaces broad file-level type-check suppressions with line-level scoping.

## 4. Community Hot Topics

- **[Issue #5185 — "Nanobot returning tool calls code in responses" (4 comments)](https://github.com/HKUDS/nanobot/issues/5185)** — the most-commented item of the window. The user reported raw tool-call code appearing inside model responses. Closed as `[invalid, provider]`. The underlying need is likely better documentation or filtering of provider-specific tool-call rendering, rather than a product bug.
- **[PR #5139 — "Preserve media paths during session consolidation" (references issues #5118, #5135)](https://github.com/HKUDS/nanobot/pull/5139)** — tagged `priority: p1` and `conflict`, this fix addresses media files becoming unrecoverable after archiving. That two linked issues exist suggests multiple users have hit the same data-loss scenario.
- **[PR #5152 — "fix(subagent): mark partial completion results"](https://github.com/HKUDS/nanobot/pull/5152)** — a `regression`-tagged fix (priority p1) open for 5 days. It reflects churn in the subagent area, where new capability work is being balanced by correctness fixes.

## 5. Bugs & Stability

Ranked by severity:

- **High — [Issue #5163](https://github.com/HKUDS/nanobot/issues/5163): Manual cron runs lose completion state when WebUI polling reloads the store.** A race between `CronService.run_job()` and store-reading APIs caused successfully executed jobs to remain marked `Failed` in `jobs.json`. **Fix merged today via [PR #5183](https://github.com/HKUDS/nanobot/pull/5183).**
- **Medium — [Issue #4801](https://github.com/HKUDS/nanobot/issues/4801): Unprotected `message['role']` dict access — KeyError on malformed session entries.** Could crash memory formatting during raw-archive fallback or history cap enforcement. **Fix merged today via [PR #5153](https://github.com/HKUDS/nanobot/pull/5153).**
- **Medium — Media paths dropped during session consolidation** ([PR #5139](https://github.com/HKUDS/nanobot/pull/5139), fixing #5118/#5135). Archiving made uploaded files unrecoverable because breadcrumbs were synthesized from `media[]` but not persisted. Fix exists but is **blocked by merge conflicts**.
- **Low — [PR #5206](https://github.com/HKUDS/nanobot/pull/5206): Streamed responses logged twice.** Duplicate `Response to` log lines for every streamed message. An open fix proposes accumulating content in `TurnDelivery` so it is logged exactly once.
- **Informational — [Issue #5185](https://github.com/HKUDS/nanobot/issues/5185): Tool call code in responses.** Closed as invalid/provider-specific rendering; not a Nanobot defect.

## 6. Feature Requests & Roadmap Signals

Several open PRs indicate likely near-term roadmap items:

- **Cross-session workflows — [PR #5211](https://github.com/HKUDS/nanobot/pull/5211)**: adds `search_sessions`, `read_session`, `prompt_session` (user-authorized delegation into another conversation), and `@`-mention chat selection in the WebUI. A major collaboration/context feature.
- **WebUI UX overhaul — [PR #5184](https://github.com/HKUDS/nanobot/pull/5184) (Quick Chat + Temporary Chat), [PR #5202](https://github.com/HKUDS/nanobot/pull/5202) (preset switching menu), [PR #5194](https://github.com/HKUDS/nanobot/pull/5194) (session list performance)**: collectively push NanoBot toward a more polished, multi-session daily-driver experience.
- **Deployment security — [PR #5210](https://github.com/HKUDS/nanobot/pull/5210)**: opt-in tokenless trusted-proxy bootstrap auth for `/webui/bootstrap`, targeting Cloudflare Tunnel + Cloudflare Access deployments (priority p1).
- **Subagent model control — [PR #5207](https://github.com/HKUDS/nanobot/pull/5207)**: optional `preset` parameter on the `spawn` tool so subagents can run with a specific named model preset.
- **Ecosystem integration — [PR #5212](https://github.com/HKUDS/nanobot/pull/5212) (MiniMax music guidance) and [PR #5186](https://github.com/HKUDS/nanobot/pull/5186) (well-known `skills.sh` sources)**: broaden content discovery beyond GitHub-only sources.

**Prediction:** The cluster of WebUI-centric PRs (#5211, #5184, #5202, #5194) suggests a user-facing WebUI release within the next 1–2 weeks. The p1-labeled items (#5210, #5139) are the most likely to be merged or conflict-resolved first.

## 7. User Feedback Summary

- **Satisfaction signals:** All three issues in the window were closed, two with fixes merged the same day they were last updated. Reported bugs were triaged within roughly 1–7 days of creation — a responsive maintainer cadence.
- **Recurring pain point — session/history data integrity:** Issues #4801, #5163, and the #5118/#5135 media-loss reports all involve persisted conversation state. Users are actively archiving, polling, and re-opening sessions, exposing edge cases in consolidation and state management.
- **Misattributed provider behavior:** The #5185 report suggests some users interpret provider-specific raw tool-call rendering as a NanoBot bug. This is an opportunity for clearer documentation on provider output formatting.
- **Feature demand:** The popularity of productivity-oriented PRs (Quick Chat, cross-session delegation, preset switching) indicates real users are running multi-session, multi-model workflows and need better navigation and context controls.

## 8. Backlog Watch

- **[PR #5139](https://github.com/HKUDS/nanobot/pull/5139) — media path preservation fix (p1, with merge conflicts).** Open since 2026-07-28 and touching a data-loss bug affecting multiple users (#5118, #5135). Needs maintainer attention to resolve conflicts and land.
- **[PR #5152](https://github.com/HKUDS/nanobot/pull/5152) — subagent partial completion regression fix (p1).** Open since 2026-07-28 with no visible review comments in the data; a long review cycle on a regression fix is worth watching.
- **[PR #3732](https://github.com/HKUDS/nanobot/pull/3732) — provider keyword-hijacking fix.** Took roughly two and a half months from creation (2026-05-11) to closure (2026-08-01). The long lifecycle of this provider bug suggests similar p1 provider issues may experience slow turnaround.
- **No open issues are currently accumulating:** the three issues in this window are all closed, with their most recent updates within the last 24–48 hours, so there is no immediate unresolved issue backlog.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-08-02

## 1. Today's Overview
ZeroClaw is in a high-activity maintenance-and-design phase: 50 issues and 50 PRs were updated in the last 24 hours, with 47 issues and 49 PRs still open/active. No release shipped in this window, but the v0.8.4 release train is visibly moving — a version-bump PR ([#9648](https://github.com/zeroclaw-labs/zeroclaw/pull/9648)) and the main crates.io release-cut PR ([#9376](https://github.com/zeroclaw-labs/zeroclaw/pull/9376)) are both open and being actively updated. Activity clusters around three themes: security hardening for shell/browser/file tools, memory-architecture RFCs (conversation history vs. curated long-term memory), and per-model capability metadata for the provider catalog. One PR was merged/closed ([#8878](https://github.com/zeroclaw-labs/zeroclaw/pull/8878), per-model vision parsing), and one design RFC (Mixture-of-Agents provider, [#8568](https://github.com/zeroclaw-labs/zeroclaw/issues/8568)) was closed. The maintainer RFC decision queue remains the key bottleneck for a large block of accepted but not-yet-implemented designs.

## 3. Project Progress
- **Merged/closed PR:** [#8878 — feat(providers): narrow per-model vision catalog parsing](https://github.com/zeroclaw-labs/zeroclaw/pull/8878) was the single merged/closed PR this window. It lets `ModelEntry` deserialize the `modalities` block from models.dev, enabling per-model vision detection rather than relying on provider-family defaults. A broader follow-up, [#9650 — add modalities support to models.dev catalog parsing](https://github.com/zeroclaw-labs/zeroclaw/pull/9650), was opened the same day and also captures `limit` blocks — the vision work appears to be folding into a more complete capability-metadata implementation (tracked under #8733).
- **Release engineering for v0.8.4 is in motion:** [#9648](https://github.com/zeroclaw-labs/zeroclaw/pull/9648) bumps the workspace to `0.8.4` and regenerates installer/container/package/desktop/docs surfaces. The larger cut PR [#9376](https://github.com/zeroclaw-labs/zeroclaw/pull/9376) makes the workspace publishable to crates.io for the first time since the microkernel split (#5811): root package renamed `zeroclawlabs` → `zeroclaw`, 18 crates publishable, 5 stay private, plus changelog and crate removals.
- **Closed issues:** [#8568 — Mixture-of-Agents (MoA) virtual model provider](https://github.com/zeroclaw-labs/zeroclaw/issues/8568) was closed after 8 comments (watch for a follow-up PR or tracker note); [#9550 — broken LinkedIn link on org profile](https://github.com/zeroclaw-labs/zeroclaw/issues/9550) was fixed and closed.
- **PRs that advanced:** [#8877 — web sidebar tooltip fix](https://github.com/zeroclaw-labs/zeroclaw/pull/8877) was rebased onto master with an additional compact-viewport fix; [#8928 — zerocode Doctor log-path diagnostics](https://github.com/zeroclaw-labs/zeroclaw/pull/8928) now carries a combined fix for #8650 and a related Doctor diagnostic issue.

## 4. Community Hot Topics
Most-commented issues in the last 24h (comment counts are for issues; PR comment data was not populated):

1. **[#9048 — RFC: Separate conversation history from agent-curated long-term memory](https://github.com/zeroclaw-labs/zeroclaw/issues/9048)** (16 comments, accepted, risk:high). The hottest topic. Runtime/gateway/channel autosave writes turns into the memory backend as `MemoryCategory::Conversation`, mixing session history with curated memory. Underlying need: clear lifecycle separation between ephemeral conversation and durable, curated knowledge.
2. **[#8603 — RFC: ZeroClaw Chat Completions profile](https://github.com/zeroclaw-labs/zeroclaw/issues/8603)** (13 comments, needs-author-action). Strong demand for an OpenAI-protocol-compatible surface so Open WebUI, LobeChat, Continue.dev, Aider, LangChain, and OpenAI SDK clients can drive ZeroClaw agents — currently only WebSocket/ACP/webhooks are exposed.
3. **[#9127 — RFC: Abstract a `KeySource` trait](https://github.com/zeroclaw-labs/zeroclaw/issues/9127)** (13 comments, accepted, in-progress). Security-minded operators want master-key material classified by source/deployment form instead of a single credential-encryption path.
4. **[#8933 — RFC: Cross-turn conversation correlation for OTel export](https://github.com/zeroclaw-labs/zeroclaw/issues/8933)** (12 comments, accepted). Observability users want a stable `gen_ai.conversation.id` attribute carried across turn-lifecycle events.
5. **[#9103 — RFC: Separate authoritative memory storage from enrichment connectors](https://github.com/zeroclaw-labs/zeroclaw/issues/9103)** (11 comments) and **[#6850 — RFC: Decouple memory lifecycle policy from storage backends](https://github.com/zeroclaw-labs/zeroclaw/issues/6850)** (9 comments). Together with #9048, these form a **memory-architecture cluster** — the single most active design area in the project.
6. **[#7155 — RFC: Per-execution confirmation tier for high-risk shell commands + allow/ask/deny policy](https://github.com/zeroclaw-labs/zeroclaw/issues/7155)** (11 comments, p1, needs-maintainer-review). Users find tool-level `auto_approve`/wildcard approval too coarse and want Claude Code-style command patterns.

**Hot PRs by activity/labels:** the p1 security-fix cluster — [#9362 browser screenshot path validation](https://github.com/zeroclaw-labs/zeroclaw/pull/9362), [#8713 file_download SSRF gate](https://github.com/zeroclaw-labs/zeroclaw/pull/8713), [#9384 shell symlink escape hardening](https://github.com/zeroclaw-labs/zeroclaw/pull/9384) — plus the p0 WATI channel removal [#9571](https://github.com/zeroclaw-labs/zeroclaw/pull/9571).

## 5. Bugs & Stability
| Sev | Item | Status / Fix |
|---|---|---|
| **p0 (breaking change)** | [#9571 — Remove the WATI channel](https://github.com/zeroclaw-labs/zeroclaw/pull/9571): full module/feature/config/route/migration removal, size:XL. | PR open, needs-author-action. Existing WATI users need a migration path; likely lands in v0.8.4. |
| **p1 (security)** | [#9417 — WhatsApp Cloud `request_approval` leaks a live approval token on send failure/cancellation](https://github.com/zeroclaw-labs/zeroclaw/issues/9417) (S2). | In-progress; no dedicated fix PR visible in top-20 window. |
| **p1 (security)** | [#9362 — Browser tool `screenshot` accepts arbitrary path → arbitrary file write](https://github.com/zeroclaw-labs/zeroclaw/pull/9362). | Fix PR open, needs-author-action. |
| **p1 (security)** | [#8713 — `file_download` SSRF: no host classifier on endpoint URL](https://github.com/zeroclaw-labs/zeroclaw/pull/8713). Third SSRF surface from the 2026-07-03 internal audit. | Fix PR open, **stale-candidate**, needs-author-action. |
| **p1 (security)** | [#9384 — Shell/skill path guard bypassable via in-workspace symlink escapes](https://github.com/zeroclaw-labs/zeroclaw/pull/9384). | Partial defense-in-depth fix PR open (explicitly not a complete fix). |
| **p1 (functional)** | [#9340 — CLI-created cron jobs hardcode `delivery.mode = "none"`](https://github.com/zeroclaw-labs/zeroclaw/issues/9340): agent runs, tool output is silently discarded, run still recorded as `ok`. | In-progress/accepted; no direct fix yet. Related cron fix [#9494](https://github.com/zeroclaw-labs/zeroclaw/pull/9494) addresses the sibling problem of cron-started headless runs being stranded. |
| **p2 (channel)** | [#6157 — Nextcloud Talk uses wrong bot message API](https://github.com/zeroclaw-labs/zeroclaw/issues/6157) (S3). | Accepted/in-progress since Apr 27; no fix PR visible. |
| **p2 (runtime)** | [#9037 — Provider terminal marker `<eom>` leaks into transcript/history](https://github.com/zeroclaw-labs/zeroclaw/pull/9037). | Fix PR open, needs-author-action. |
| **p2 (channel)** | [#9634 — Telegram `mention_only` still handles non-mentioned group messages](https://github.com/zeroclaw-labs/zeroclaw/pull/9634). | Fix PR open; adds live-resolved `allow_groups` allowlist. |
| **p3 / CI / web** | [#8877 sidebar tooltip clipping](https://github.com/zeroclaw-labs/zeroclaw/pull/8877) (rebased) and [#8874 rustdoc theme CI fix](https://github.com/zeroclaw-labs/zeroclaw/pull/8874). | Both open; maintainer follow-up commits added. |

## 6. Feature Requests & Roadmap Signals
- **v0.8.4 (imminent):** The release-cut PRs ([#9648](https://github.com/zeroclaw-labs/zeroclaw/pull/9648), [#9376](https://github.com/zeroclaw-labs/zeroclaw/pull/9376)) plus in-flight features suggest this release will carry: WATI removal ([#9571](https://github.com/zeroclaw-labs/zeroclaw/pull/9571)), PowerShell as native Windows shell ([#9182](https://github.com/zeroclaw-labs/zeroclaw/pull/9182)), Anthropic stored OAuth profiles ([#9420](https://github.com/zeroclaw-labs/zeroclaw/pull/9420)), Slack visible lifecycle progress ([#8985](https://github.com/zeroclaw-labs/zeroclaw/pull/8985)), context-compaction ratio anchoring ([#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535)), and the provider-catalog parsing work ([#9650](https://github.com/zeroclaw-labs/zeroclaw/pull/9650) / [#8878](https://github.com/zeroclaw-labs/zeroclaw/pull/8878)).
- **New request with high ROI:** [#9631 — Send stable `session_id` to OpenRouter for prompt-cache savings](https://github.com/zeroclaw-labs/zeroclaw/issues/9631). OpenRouter replaying system prompts/tool schemas every turn is a real cost pain; a small, high-value change that fits the provider layer well.
- **v0.9.0 architecture signals:** the memory-cluster RFCs ([#9048](https://github.com/zeroclaw-labs/zeroclaw/issues/9048), [#9103](https://github.com/zeroclaw-labs/zeroclaw/issues/9103), [#6850](https://github.com/zeroclaw-labs/zeroclaw/issues/6850)), the auth/security pipeline RFCs ([#7141](https://github.com/zeroclaw-labs/zeroclaw/issues/7141), [#7142](https://github.com/zeroclaw-labs/zeroclaw/issues/7142), [#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996), [#6971](https://github.com/zeroclaw-labs/zeroclaw/issues/6971)), the OpenAI Chat Completions profile ([#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603)), A2A outbound client ([#9106](https://github.com/zeroclaw-labs/zeroclaw/issues/9106)), computer-use desktop control ([#6909](https://github.com/zeroclaw-labs/zeroclaw/issues/6909)), and the Gemini Live realtime speech channel ([#8780](https://github.com/zeroclaw-labs/zeroclaw/issues/8780)). The v0.9.0 coordination tracker ([#7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432)) is the place to watch for decisions.
- **Per-model capability metadata is a clear trend:** [#7100 (p1, per-model context-window/vision config)](https://github.com/zeroclaw-labs/zeroclaw/issues/7100) plus the models.dev parsing PRs show the project converging on truthful per-model capability data for budget checks and UI display.
- **Watch:** the MoA virtual provider RFC ([#8568](https://github.com/zeroclaw-labs/zeroclaw/issues/8568)) was closed — expect either a deferred decision note or resurrection as an implementation PR.

## 7. User Feedback Summary
- **Memory confusion is the top pain point:** users report that session/run history and curated long-term memory are mixed in the same backend paths, making lifecycle policy hard to reason about ([#9048](https://github.com/zeroclaw-labs/zeroclaw/issues/9048), [#9103](https://github.com/zeroclaw-labs/zeroclaw/issues/9103), [#6850](https://github.com/zeroclaw-labs/zeroclaw/issues/6850)).
- **Cost pain with OpenRouter:** a single conversation spawns dozens of LLM requests with system prompts/tool schemas replayed every turn; users want prompt-cache-friendly session IDs ([#9631](https://github.com/zeroclaw-labs/zeroclaw/issues/9631)).
- **Silent failures erode trust:** cron jobs report `ok` while discarding all output because delivery is hardcoded to `none` ([#9340](https://github.com/zeroclaw-labs/zeroclaw/issues/9340)). Users explicitly note nothing indicates the result went nowhere.
- **Interop demand is strong:** users want to use ZeroClaw from Open WebUI, LobeChat, Continue.dev, Aider, LangChain, and OpenAI SDK clients via the Chat Completions protocol ([#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603)).
- **Security expectations are rising:** requests for Claude Code-style allow/ask/deny shell policies ([#7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155)), safer empty-list semantics for WhatsApp groups ([#9397](https://github.com/zeroclaw-labs/zeroclaw/issues/9397)), and key-material classification ([#9127](https://github.com/zeroclaw-labs/zeroclaw/issues/9127)) indicate operators want granular, auditable control rather than broad tool-level toggles.
- **Channel-specific dissatisfaction:** Nextcloud Talk has been broken since April ([#6157](https://github.com/zeroclaw-labs/zeroclaw/issues/6157)); Telegram users want per-turn multi-message mode ([#8445](https://github.com/zeroclaw-labs/zeroclaw/issues/8445)) and correct mention-only handling ([#9634](https://github.com/zeroclaw-labs/zeroclaw/pull/9634)).

## 8. Backlog Watch
- **Long-unanswered bugs:** [#6157 — Nextcloud Talk bot API](https://github.com/zeroclaw-labs/zeroclaw/issues/6157) has been open/accepted since **April 27** with 8 comments and still no visible fix PR — the oldest unresolved channel bug in the active set.
- **Rusty RFCs needing maintainer review (open 2–3 months):** [#6850 memory lifecycle decoupling](https://github.com/zeroclaw-labs/zeroclaw/issues/6850) (since May 22), [#6909 computer-use desktop control](https://github.com/zeroclaw-labs/zeroclaw/issues/6909) (since May 25), [#7100 per-model capability config](https://github.com/zeroclaw-labs/zeroclaw/issues/7100, **p1**, since Jun 2), [#7141 pluggable inbound auth](https://github.com/zeroclaw-labs/zeroclaw/issues/7141, **p1**, since Jun 3), [#7155 shell confirmation tiers](https://github.com/zeroclaw-labs/zeroclaw/issues/7155, **p1**, since Jun 3), and [#7142 security decision pipeline](https://github.com/zeroclaw-labs/zeroclaw/issues/7142, since Jun 3).
- **Decision queue backlog:** the maintainer RFC tracker ([#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)) is the active decision surface, and a large block of accepted RFCs (e.g., [#9048](https://github.com/zeroclaw-labs/zeroclaw/issues/9048), [#9127](https://github.com/zeroclaw-labs/zeroclaw/issues/9127), [#8933](https://github.com/zeroclaw-labs/zeroclaw/issues/8933), [#8445](https://github.com/zeroclaw-labs/zeroclaw/issues/8445)) still needs implementation ownership or code-owner sign-off.
- **PRs blocked on author action — a project-health risk:** many high-priority security fixes are waiting on authors, including the SSRF gate ([#8713](https://github.com/zeroclaw-labs/zeroclaw/pull/8713), already `stale-candidate`), browser screenshot path validation ([#9362](https://github.com/zeroclaw-labs/zeroclaw/pull/9362)), shell symlink hardening ([#9384](https://github.com/zeroclaw-labs/zeroclaw/pull/9384)), and the larger refactors/release work ([#9319](https://github.com/zeroclaw-labs/zeroclaw/pull/9319), [#9420](https://github.com/zeroclaw-labs/zeroclaw/pull/9420), [#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535), [#9571](https://github.com/zeroclaw-labs/zeroclaw/pull/9571), [#9376](https://github.com/zeroclaw-labs/zeroclaw/pull/9376)). With 49 of 50 PRs still open and the v0.8.4 train moving, author follow-up is the gating factor for the next release.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw Project Digest — 2026-08-02

## 1. Today's Overview
PicoClaw saw low but non-zero activity on 2026-08-02: one issue was updated, and one pull request was closed/merged. No new releases were published. The open issue remains the Matrix sync reconnection bug, while the closed PR adds Traditional Chinese (zh-TW) localization. Overall project health is moderate — no new regressions appeared today, but the lingering Matrix resilience issue continues to need maintainer attention.

## 2. Releases
None. No releases were published in the last 24 hours.

## 3. Project Progress
- [#3261 — Add zh-TW locale and Traditional Chinese translations](https://github.com/sipeed/picoclaw/pull/3261) was closed/merged. The PR aimed to use Taiwanese terminology consistently across the WebUI and documentation, extending localization to setup and channel guidance. This would be a user-facing accessibility and i18n improvement if included in a future release.

No other PRs were merged or closed today.

## 4. Community Hot Topics
- [#3203 — Matrix sync loop has no reconnection logic](https://github.com/sipeed/picoclaw/issues/3203) is the most active item, with 7 comments and 2 👍 reactions. The discussion centers on a serious reliability failure: the Matrix `/sync` loop silently stops after network disruption or homeserver restart, and systemd cannot restart it because the main process stays alive. The underlying need is clear: PicoClaw's Matrix channel needs automatic reconnection and watchdog-friendly failure handling.

The zh-TW localization PR [#3261](https://github.com/sipeed/picoclaw/pull/3261) had no visible comment/reaction data, but its existence signals community demand for better non-English localization.

## 5. Bugs & Stability
- **High severity — [#3203](https://github.com/sipeed/picoclaw/issues/3203): Matrix sync loop has no reconnection logic.**  
  The Matrix channel dies permanently after network disruption or homeserver restart. There is no automatic reconnect, and because the main process remains alive, systemd's `Restart=on-failure` does not trigger. User impact is high: the bot appears running but stops syncing. No fix PR is currently linked. The issue is labeled `[stale]`, which may indicate it has not received maintainer triage despite recent discussion.

## 6. Feature Requests & Roadmap Signals
- **zh-TW / Traditional Chinese localization** is the only clear feature signal from today's activity. The closed PR [#3261](https://github.com/sipeed/picoclaw/pull/3261) suggests that users or contributors want full localization — not just UI strings, but also setup and channel guidance in Taiwanese terminology.
- **Matrix reconnection** is technically a bug report, but it implies a roadmap reliability requirement: production users expect long-running bridge channels to survive network/server interruptions without manual intervention.

If the zh-TW PR is truly merged, Traditional Chinese support could appear in the next PicoClaw release. The Matrix reconnection fix is likely to be scheduled if maintainers prioritize stability.

## 7. User Feedback Summary
- **Pain point:** Matrix users report silent bot death after network/server issues, which is especially damaging because standard process supervision does not detect the failure.
- **Satisfaction:** The multiple comments and upvotes on [#3203](https://github.com/sipeed/picoclaw/issues/3203) suggest frustration with the lack of automatic recovery.
- **Positive signal:** A contributor invested effort in zh-TW localization, showing community willingness to improve the project's accessibility and documentation breadth.

## 8. Backlog Watch
- [#3203 — Matrix sync loop has no reconnection logic](https://github.com/sipeed/picoclaw/issues/3203) remains the most important open item needing maintainer attention. It has been open since 2026-07-02, was updated as recently as 2026-08-01, has 7 comments and 2 👍, but still carries a `[stale]` label.
- [#3261 — Add zh-TW locale](https://github.com/sipeed/picoclaw/pull/3261) is now closed as `[stale]`. If this was an automated stale closure, maintainers should confirm whether the localization work should be revived or officially accepted, to avoid losing a valid contribution.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw Project Digest — 2026-08-02

## Today's Overview
NanoClaw is in an active maintenance and hardening cycle: 2 issues were updated in the last 24 hours (1 closed, 1 open), and 12 PRs were updated (9 open, 3 merged/closed). A new release, **v2.1.54**, was cut as a rollup of everything merged since v2.1.17, including a breaking iMessage channel unification. The project is also addressing setup-path correctness, credential expiry visibility, and database ownership invariants. Overall health is solid: most activity is focused on fixing real operator pain points rather than introducing broad new surface area.

## Releases
- **v2.1.54** — Rollup release covering **v2.1.18 through v2.1.54**, containing everything merged since the v2.1.17 tag.
  - **Breaking change:** iMessage has been unified into one `imessage` channel with two backends, configurable via `/add-imessage`:
    - **Local** — uses this Mac’s `chat.db` via the Chat SDK.
    - **Hosted** — uses native [Photon](https://photon.codes) via Spectr… (truncated in source).
  - **Migration note:** Operators using iMessage should re-check their channel configuration and use `/add-imessage` to select the desired backend. The previous fragmented iMessage setup has been consolidated.

## Project Progress
Three PRs were merged/closed in the last 24 hours:

- [#3170 — fix(setup): dispatch failure assist to the picked provider](https://github.com/nanocoai/nanoclaw/pull/3170)  
  Fixes setup failure assistance so it no longer defaults to offering the Claude CLI when a non-Claude provider was selected. Directly addresses issue #3169.

- [#3168 — fix(release): close post-merge safety gaps](https://github.com/nanocoai/nanoclaw/pull/3168)  
  Tightens release-process safety after merge, likely part of what enabled the v2.1.54 rollup release.

- [#3167 — feat(credentials): alert when a provider credential expires](https://github.com/nanocoai/nanoclaw/pull/3167)  
  Adds alerting when provider credentials expire. This was motivated by a real incident where a Codex ChatGPT credential expired and only produced a confusing WhatsApp error.

These merges show forward progress on setup reliability, release automation, and operational observability.

## Community Hot Topics
No issues/PRs in this data set show comments or reactions, so “hot topics” are inferred from recency and level of core-team involvement:

- [#3171 — The two qodo skills depend on an integration nothing sets up and intercept normal coding requests](https://github.com/nanocoai/nanoclaw/issues/3171)  
  Two bundled skills depend on a Qodo SaaS account that is never configured. They also intercept normal coding requests, which makes them a functional footgun for users.

- [#3176 — fix(release): retry post-publish readback](https://github.com/nanocoai/nanoclaw/pull/3176)  
  Recent release automation is being hardened; this PR adds retry logic to post-publish readback, indicating release verification has been flaky.

- [#3175 — fix: route command-gate denials through the delivery adapter, not outbound.db](https://github.com/nanocoai/nanoclaw/pull/3175)  
  A concurrency/correctness fix around how command-gate denial notices are delivered. The user concern is data integrity, specifically avoiding a second writer on a container-owned database.

Underlying needs across these topics: **better defaults, fewer unconfigured integrations, and safer release/database operations.**

## Bugs & Stability
Ranked roughly by severity:

1. **[#3171 — Qodo skills depend on an unconfigured integration and intercept requests](https://github.com/nanocoai/nanoclaw/issues/3171)**  
   *High severity for affected users.* Two bundled skills are nonfunctional unless a Qodo API key exists in `~/.qodo/config.json`, and they interfere with normal coding flows.
   - **Fix PR exists:** [#3172 — chore(skills): remove the two qodo skills](https://github.com/nanocoai/nanoclaw/pull/3172) (open).

2. **[#3175 — Host inserts into session outbound.db violate the DB single-writer rule](https://github.com/nanocoai/nanoclaw/pull/3175)**  
   *High severity for stability.* Command-gate denial notices were written directly by the host into a container-owned `outbound.db`, creating a second writer and risking corruption. The PR routes these through the delivery adapter instead.

3. **[#3166 — migrate-v2 calls removed `insertTask`](https://github.com/nanocoai/nanoclaw/pull/3166)**  
   *High severity for migration.* `setup/migrate-v2/tasks.ts` imports `insertTask`, but the module now exports `insertTaskRow`. The static ESM import causes the migration step to die immediately.
   - **Fix PR:** [#3166](https://github.com/nanocoai/nanoclaw/pull/3166) (open).

4. **[#3169 — Setup failures always offer to install Claude CLI for non-Claude providers](https://github.com/nanocoai/nanoclaw/issues/3169)**  
   *Medium severity / UX.* Choosing Codex or another provider still results in Claude CLI installation prompts and Anthropic sign-in flows.
   - **Fixed by:** [#3170](https://github.com/nanocoai/nanoclaw/pull/3170) (merged/closed).

5. **[#3174 — Rootless Docker agent containers are unusable](https://github.com/nanocoai/nanoclaw/pull/3174)**  
   *Medium severity for rootless Docker users.* Two independent failures prevent agent containers from running when the host user is not in the `docker` group.

6. **[#2956 — Duplicate delivery when final output repeats tool-sent content](https://github.com/nanocoai/nanoclaw/pull/2956)**  
   *Medium severity / delivery correctness.* If an agent sends a message via `send_message` and also repeats it in final output, the message is delivered twice.
   - **Fix PR open:** [#2956](https://github.com/nanocoai/nanoclaw/pull/2956).

## Feature Requests & Roadmap Signals
- **Credential expiry alerts** were merged in [#3167](https://github.com/nanocoai/nanoclaw/pull/3167), signaling the project is investing in proactive operational alerts rather than only reactive logs.
- **Rootless Docker support** is a concrete requested capability in [#3174](https://github.com/nanocoai/nanoclaw/pull/3174), important for users who deliberately keep agent accounts out of the `docker` group.
- **Removal of the bundled qodo skills** ([#3172](https://github.com/nanocoai/nanoclaw/pull/3172)) indicates the project is willing to cut bundled integrations that are not actively set up.
- **Best-effort reaction delivery** ([#3121](https://github.com/nanocoai/nanoclaw/pull/3121)) is another reliability-oriented change likely to move forward.

Likely candidates for next releases: **#3172** (cleanup), **#3175** (database integrity), **#3176** (release hardening), and possibly **#3174** (rootless Docker) if review completes quickly.

## User Feedback Summary
- **Setup is too Claude-centric:** Users selecting non-Claude providers are still pushed toward installing the Claude CLI and signing in to Anthropic. This creates real friction for Codex and other provider users ([#3169](https://github.com/nanocoai/nanoclaw/issues/3169)).
- **Bundled skills can be harmful when unconfigured:** The qodo skills intercept normal coding requests even though nothing sets up the required Qodo account. This is a strong signal that bundled skills need either zero-config behavior or clear enablement gates ([#3171](https://github.com/nanocoai/nanoclaw/issues/3171)).
- **Credential expiry is poorly communicated:** A provider credential expiring produced “Error: Reconnecting… Read-only file system” with no clear alert. The merged fix is a direct response to that user pain ([#3167](https://github.com/nanocoai/nanoclaw/pull/3167)).
- **Rootless Docker users are blocked:** Running agent containers is impossible on rootless Docker unless the user is in the `docker` group, which is a common security-conscious setup ([#3174](https://github.com/nanocoai/nanoclaw/pull/3174)).
- **Release verification has been flaky:** The need to retry post-publish readback suggests users/maintainers have seen release state be incorrectly reported or temporarily inconsistent ([#3176](https://github.com/nanocoai/nanoclaw/pull/3176)).

No explicit user satisfaction/dissatisfaction scores were included in the provided data.

## Backlog Watch
These PRs have been open for a while and are likely in need of maintainer attention:

- [#2956 — fix(agent-runner): suppress duplicate delivery when final output repeats tool-sent content](https://github.com/nanocoai/nanoclaw/pull/2956)  
  Open since **2026-07-05**; updated 2026-08-01.

- [#3090 — fix(templates): prepend all top-level context Markdown](https://github.com/nanocoai/nanoclaw/pull/3090)  
  Open since **2026-07-19**; updated 2026-08-01.

- [#3121 — Make reaction delivery best-effort](https://github.com/nanocoai/nanoclaw/pull/3121)  
  Open since **2026-07-23**; updated 2026-08-01.

All three touch correctness/reliability areas and have been recently updated but not merged. They deserve prompt maintainer review, especially #2956 and #3090, which have been in review for several weeks.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-08-02

## Today's Overview

IronClaw saw a very active 24-hour window: 7 issues and 20 pull requests were updated, with 6 PRs closed/merged and 1 issue closed. The project remains in the middle of a large “Reborn” Wave 2 architecture refactor, with a stack of contract-inversion and crate-splitting PRs moving through review. CI hardening and performance recovery are also prominent themes. No new releases were published in the last 24 hours. Overall, project health looks strong in terms of throughput, though the volume of stacked PRs and unresolved performance regressions indicates heavy maintainer coordination is still needed.

## Project Progress

Six PRs were closed/merged in the reporting window, and one tracking issue was closed.

- **#6998 — refactor(contracts): invert extension_host’s product-facing ports onto product_contracts (WS2.1)**  
  [nearai/ironclaw PR #6998](https://github.com/nearai/ironclaw/issues/6998)  
  Closes the first Wave 2 slot: `ironclaw_extension_host` now implements port definitions from `ironclaw_product_contracts` instead of depending on `ironclaw_product` directly.

- **#7002 — refactor(contracts): invert webui + openai_compat onto product_contracts (WS5)**  
  [nearai/ironclaw PR #7002](https://github.com/nearai/ironclaw/issues/7002)  
  Advances the WS5 port inversion work, with `#7000` already merged down into the branch.

- **#6996 — ci(gates): close #6963 — inventory-driven discovery + fail-closed across the remaining path-keyed gates**  
  [nearai/ironclaw PR #6996](https://github.com/nearai/ironclaw/issues/6996)  
  Closes [issue #6963](https://github.com/nearai/ironclaw/issues/6963), finishing the sweep of path-keyed CI gates that were left untouched by an earlier rewrite.

- **#6995 — docs(target-architecture): Wave 1 truth audit**  
  [nearai/ironclaw PR #6995](https://github.com/nearai/ironclaw/issues/6995)  
  Reconciles the Reborn target-architecture decision record with merged `main`, completing the Wave 1 documentation cleanup.

- **#6992 — fix(ci): pin comm to LC_ALL=C in reborn crate discovery**  
  [nearai/ironclaw PR #6992](https://github.com/nearai/ironclaw/issues/6992)  
  Fixes a locale-dependent `comm` failure in CI crate discovery.

- **#6761 — test: cover generic outbound registration**  
  [nearai/ironclaw PR #6761](https://github.com/nearai/ironclaw/issues/6761)  
  Adds a regression test for generic channel outbound-target registration.

Together, these closures show steady progress on the Reborn architecture plan, especially the WS2/WS5 port-inversion work and CI reliability efforts.

## Community Hot Topics

The most-discussed item in the last 24 hours is the now-closed CI tracking issue:

- **#6963 — Path-keyed CI gates that survive #6946**  
  [nearai/ironclaw Issue #6963](https://github.com/nearai/ironclaw/issues/6963)  
  7 comments. This issue tracked eight silently broken or loud-but-flat-keyed CI gates. The underlying need was CI determinism and fail-closed behavior: too many gates were resolving their scope from a literal flat crate tree and could silently no-op after restructuring. It was closed by #6996.

- **#6974 — libSQL thread_store_writes pathology: tool-heavy stress cases at p95 37-135s post-#6696**  
  [nearai/ironclaw Issue #6974](https://github.com/nearai/ironclaw/issues/6974)  
  2 comments. A performance regression issue split out of the larger Postgres capacity recovery work. It reflects strong concern about tail latencies after the row-native process journal change.

The large stacked PR series from BenKurrek — **#6998 → #7000 → #7003 → #7004/7005** — is also a hot coordination topic behind the scenes, though it has no visible comment count in this dataset.

## Bugs & Stability

Ranked by severity:

1. **#6974 — libSQL thread_store_writes pathology: tool-heavy stress cases p95 37-135s post-#6696**  
   [nearai/ironclaw Issue #6974](https://github.com/nearai/ironclaw/issues/6974)  
   High severity. Tool-heavy libSQL stress cases remain far above the 2.5s p95 target, with p95 latencies between 37–135s. This is split out of [PR #6973](https://github.com/nearai/ironclaw/issues/6973), which targets the broader Postgres API capacity regression caused by the row-native process journal (#6696). The libSQL-tool-heavy path itself is still open.

2. **#7011 — extension_manager: five pre-existing findings surfaced by the WS2.4 split**  
   [nearai/ironclaw Issue #7011](https://github.com/nearai/ironclaw/issues/7011)  
   Medium-high severity. Five correctness/testability findings in code moved byte-for-byte into the new `ironclaw_extension_manager`: a false `WriteFilesystem` effect, an untested lock predicate, two missing dispatch tests, and six dropped causes. These are latent bugs in relocated code and will likely need follow-up fixes.

3. **#6963 — Path-keyed CI gates that survive #6946**  
   [nearai/ironclaw Issue #6963](https://github.com/nearai/ironclaw/issues/6963)  
   Medium severity while open, now resolved. Eight discovered CI gate defects, including silent no-ops. Closed by [PR #6996](https://github.com/nearai/ironclaw/issues/6996).

4. **#7008 — Split the product_wire DTO family in ironclaw_product_contracts**  
   [nearai/ironclaw Issue #7008](https://github.com/nearai/ironclaw/issues/7008)  
   Low severity / maintainability. `product_wire.rs` is 1,923 lines, over the 1,500-line `large_file` threshold, and carries an arch-exempt annotation. This is a code-health debt that will need to be paid down.

## Feature Requests & Roadmap Signals

- **#7009 — Add OrcaRouter as a built-in LLM provider**  
  [nearai/ironclaw Issue #7009](https://github.com/nearai/ironclaw/issues/7009)  
  A concrete user-facing feature request. OrcaRouter is missing from `providers.json`, while OpenRouter, Together, Fireworks, Cerebras, and others are already present. This looks like a small, high-value addition and may land soon as a provider entry.

- **#7012 — Time awareness without prompt-cache churn: append-only rollover context and duration evidence**  
  [nearai/ironclaw Issue #7012](https://github.com/nearai/ironclaw/issues/7012)  
  A design-level roadmap item from a core contributor. It builds on the cache-prefix work in [PR #7001](https://github.com/nearai/ironclaw/issues/7001) and [PR #6997](https://github.com/nearai/ironclaw/issues/6997), and asks for a clearer temporal contract for runtime context. This is likely the next step in the prompt-cache optimization line.

- **#7010 — WS5: close the attachments row**  
  [nearai/ironclaw Issue #7010](https://github.com/nearai/ironclaw/issues/7010)  
  An architecture blocker: `ProjectScopedAttachmentReader` cannot move because it implements `LoopAttachmentReadPort`. This needs either a doc rewrite or a re-homing of the read port before the WS5 checklist item can close.

- **#7007 — Alert live-canary Slack channel on merge queue failures**  
  [nearai/ironclaw PR #7007](https://github.com/nearai/ironclaw/issues/7007)  
  Signals ongoing investment in merge-queue observability and CI alerting.

- **#6780 — feat(reborn-ironhub): deep-link register/install gateway + private manifest source**  
  [nearai/ironclaw PR #6780](https://github.com/nearai/ironclaw/issues/6780)  
  A larger feature still open: public register handshake and private manifest support for the IronHub extension flow.

Likely next-version candidates: **OrcaRouter provider support (#7009)** and a follow-up PR for **time-aware context rollover (#7012)** once #7001 and #6997 settle.

## User Feedback Summary

There is no direct user-satisfaction data in this window, but issue and PR activity exposes several real pain points:

- **LLM provider coverage**: A user explicitly reported that OrcaRouter is missing as a built-in provider, forcing custom routing workarounds (#7009).
- **Latency sensitivity**: The libSQL p95 pathology (#6974) is a clear user-impacting performance complaint, especially for tool-heavy agent workloads.
- **Prompt-cache churn**: The debate around system-prefix byte stability and minute-precision timestamps (#7012, #7001) reflects real friction caused by prompt-cache misses on repeated model calls.
- **Architecture friction**: The `ProjectScopedAttachmentReader` blocker (#7010) and extension-manager findings (#7011) indicate that internal refactors are surfacing latent design debt, though contributors are actively tracking and fixing it.

Overall, users and contributors appear engaged but are feeling the cost of rapid architectural change, especially around CI correctness and performance regressions.

## Backlog Watch

A few long-running or potentially blocked items deserve maintainer attention:

- **#5598 — chore: release**  
  [nearai/ironclaw PR #5598](https://github.com/nearai/ironclaw/issues/5598)  
  Open since **2026-07-03**, still updated in the reporting window. This release PR includes breaking changes in `ironclaw_common` and `ironclaw_skills`. A 30-day-old open release PR suggests the release process may be stalled or waiting on a decision.

- **#5981 — Reborn queued-message steering**  
  [nearai/ironclaw PR #5981](https://github.com/nearai/ironclaw/issues/5981)  
  Open since **2026-07-11**. A core queued-message steering feature forward-ported to current `main`, with turn-boundary races fixed. Long-lived and high-value; likely needs final review bandwidth.

- **#6780 — feat(reborn-ironhub): deep-link register/install gateway + private manifest source**  
  [nearai/ironclaw PR #6780](https://github.com/nearai/ironclaw/issues/6780)  
  Open since **2026-07-28**. This is a substantial feature and appears to be waiting on extension-host layout stabilization.

- **#6917 — fix(webui): open workspace file links in authenticated previews**  
  [nearai/ironclaw PR #6917](https://github.com/nearai/ironclaw/issues/6917)  
  Open since **2026-07-30**. A user-facing WebUI fix that needs review but has been quiet for several days.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI Project Digest — 2026-08-02

## 1. Today's Overview
LobsterAI saw minimal new activity on 2026-08-02: no releases, no newly created issues or PRs, and most updates came from stale-bot touches on older items. 3 issues were updated (2 closed as stale, 1 still open) and 6 PRs were updated (4 open, 2 closed dependency bumps). The lack of fresh merges and the number of open PRs from early April suggest maintainer bandwidth is limited. Project health appears stable, but the backlog is growing.

## 2. Releases
No new releases were published in the last 24 hours.

## 3. Project Progress
No feature or bugfix PRs were merged today. The only closed PRs were two automated dependency updates:

- [#1285 [CLOSED] chore(deps-dev): bump concurrently from 8.2.2 to 9.2.1](https://github.com/netease-youdao/LobsterAI/issues/1285)
- [#1286 [CLOSED] chore(deps-dev): bump tailwindcss from 3.4.19 to 4.2.2](https://github.com/netease-youdao/LobsterAI/issues/1286)

Two stale issues were also closed: [#1287](https://github.com/netease-youdao/LobsterAI/issues/1287) (IM connectivity test bug) and [#1289](https://github.com/netease-youdao/LobsterAI/issues/1289) (code-block collapse/expand feature request), both apparently by stale-bot rather than shipped fixes.

## 4. Community Hot Topics
The most-discussed items today, based on comment counts, were all issue threads with 1–2 comments:

- [#1287 [CLOSED] IM机器人对popo进行连通性测试时，appkey、appsecret、aes key全填1也能测试连接通过](https://github.com/netease-youdao/LobsterAI/issues/1287) — 2 comments. Underlying need: connectivity tests must actually validate credentials, not just return success.
- [#1289 [CLOSED] feat: 为长代码块添加折叠/展开功能，改善长内容可读性](https://github.com/netease-youdao/LobsterAI/issues/1289) — 2 comments. Desired feature: collapsible long code blocks to avoid overwhelming chat view.
- [#1217 [OPEN] 【bug】运行过程中偶发启动网关，影响正常使用](https://github.com/netease-youdao/LobsterAI/issues/1217) — 1 comment. Users report unexpected gateway restarts during normal use.

All three indicate recurring user concerns around trustworthiness, readability, and runtime stability.

## 5. Bugs & Stability
Two bugs were active in the update window, ranked by severity:

1. **High — Unexpected gateway restarts**  
   [#1217 [OPEN] 运行过程中偶发启动网关，影响正常使用](https://github.com/netease-youdao/LobsterAI/issues/1217)  
   Reports on Windows 10 with version 2026.3.26, occurring 3–5 times per day. No fix PR is linked or currently updated.

2. **Medium — IM connectivity test false positive**  
   [#1287 [CLOSED] IM机器人对popo进行连通性测试时，appkey、appsecret、aes key全填1也能测试连接通过](https://github.com/netease-youdao/LobsterAI/issues/1287)  
   Invalid credentials pass the connection test, meaning the test gives misleading results. This issue was closed as stale without a visible fix.

No regressions or crashes were reported in the last 24 hours.

## 6. Feature Requests & Roadmap Signals
The main explicit feature request is:

- [#1289 [CLOSED] feat: 为长代码块添加折叠/展开功能，改善长内容可读性](https://github.com/netease-youdao/LobsterAI/issues/1289) — Proposes automatic collapsing for code blocks between 15–200 lines to improve long-content readability. This is a strong UX improvement candidate for the next release.

Additionally, several open PRs signal internal roadmap priorities:

- [#1218 fix(定时任务): 重构任务列表排序规则](https://github.com/netease-youdao/LobsterAI/pull/1218) — meaningfully sort scheduled tasks by creation/run time.
- [#1219 perf(cowork): 消除会话列表和详情页的无效重渲染](https://github.com/netease-youdao/LobsterAI/pull/1219) — reduce redundant re-renders during streaming output.
- [#1220 perf(cowork): 消除 recentChats/conversationSearch 的 N+1 查询](https://github.com/netease-youdao/LobsterAI/pull/1220) — fix N+1 query patterns in chat summaries.

These suggest upcoming improvements in task management, UI performance, and chat history loading.

## 7. User Feedback Summary
Users are hitting practical usability and reliability issues:

- Long AI-generated code blocks make conversations very hard to read, and the existing 200-line limit does not help mid-length code blocks.
- IM credential validation is not trusted because invalid dummy values still pass connectivity tests.
- Random gateway restarts disrupt normal usage on Windows, with no reliable workaround mentioned.

No positive/negative satisfaction signals were updated in this window; the overall tone is feature-request and bug-report focused.

## 8. Backlog Watch
Several items have been open since April 1–2, 2026, marked stale, and still need maintainer attention:

- [#1215 [OPEN] fix(im): always rebuild chat handler on setConfig to avoid stale imSe…](https://github.com/netease-youdao/LobsterAI/pull/1215) — Important config-update bugfix waiting for review.
- [#1218 [OPEN] fix(定时任务): 重构任务列表排序规则](https://github.com/netease-youdao/LobsterAI/pull/1218) — Scheduled-task list sorting improvement.
- [#1219 [OPEN] perf(cowork): 消除会话列表和详情页的无效重渲染](https://github.com/netease-youdao/LobsterAI/pull/1219) — UI performance fix.
- [#1220 [OPEN] perf(cowork): 消除 recentChats/conversationSearch 的 N+1 查询](https://github.com/netease-youdao/LobsterAI/pull/1220) — Data-layer performance fix.
- [#1217 [OPEN] 【bug】运行过程中偶发启动网关](https://github.com/netease-youdao/LobsterAI/issues/1217) — High-impact bug with only 1 comment and no visible maintainer response.

These items are the most critical backlog risks; if not addressed soon, they may be auto-closed by the stale bot without merging or fixing.

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis Project Digest — 2026-08-02

## 1. Today's Overview
Moltis is in a low-activity maintenance window: no issues were updated in the last 24 hours, and no new releases were published. One pull request (#1182) is open and awaiting review, addressing session-management restrictions. With zero merged PRs and zero new issues, no feature work landed today and the project health appears stable but quiet.

## 2. Releases
*No new releases were published in this period.*

## 3. Project Progress
No pull requests were merged or closed in the last 24 hours. The single active PR is **[#1182 — fix(sessions): allow deleting and archiving the main session](https://github.com/moltis-org/moltis/pull/1182)** by shixi-li, which proposes to remove the `main` session guard in `delete_impl` and `is_archivable_entry` so the main session can be managed like any other, while preserving the current-active-channel-session archive restriction and `sessions.clear_all` behavior. This is an in-progress bug fix, not yet merged.

## 4. Community Hot Topics
There is no active community discussion in this window: zero issues were updated and the only PR (#1182) has no comments or reactions yet. It opened on 2026-08-01, so maintainer attention is likely still pending.

## 5. Bugs & Stability
No new bugs, crashes, or regressions were reported as issues in the last 24 hours. However, **[PR #1182](https://github.com/moltis-org/moltis/pull/1182)** targets a previously reported bug (**[#1132](https://github.com/moltis-org/moltis/issues/1132)**) where users could not delete or archive the main session. Severity: **moderate** — a functional restriction on standard session lifecycle operations. A fix exists and is open for review; no merged fix yet.

## 6. Feature Requests & Roadmap Signals
No new feature requests were submitted in this period. The fix in PR #1182 signals a roadmap direction toward **more flexible session lifecycle management**, suggesting that users expect the main session to behave like any other session rather than being a special protected entity.

## 7. User Feedback Summary
With zero issue activity, there is no explicit new user feedback in this window. The underlying demand visible through issue #1132 is that users want full control over session deletion/archiving, including the main session, and found the existing guard restrictive.

## 8. Backlog Watch
No long-unanswered issues or PRs are visible in the current data window. The only open item, **[PR #1182](https://github.com/moltis-org/moltis/pull/1182)**, is recent (created 2026-08-01) and is awaiting maintainer review — it should be prioritized to close out the reported limitation in issue #1132.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw Project Digest — 2026-08-02

## 1. Today's Overview
As of 2026-08-02, CoPaw/QwenPaw activity is moderate: 2 issues were updated in the last 24 hours (both still open) and 7 pull requests were touched, with 6 open and 1 closed. No new releases were published. Development focus remains on stability and bug fixes: PRs are addressing model response errors, context compression, skill tag persistence, and provider model list alignment. Community discussions highlight two themes: storage/maintenance bloat and the need for easier LLM tracing integration. Overall, the project is in an active bug-fix and hardening phase rather than a release/feature rollout phase.

## 2. Releases
No new releases in the last 24 hours.

## 3. Project Progress
One PR was closed today:

- [#6598 [CLOSED] fix(skills): preserve plugin-sourced skill tags across reconcile cycles (#6537)](https://github.com/agentscope-ai/QwenPaw/pull/6598)  
  Closed, with the same fix now re-opened as [#6632](https://github.com/agentscope-ai/QwenPaw/pull/6632). The proposed change prevents `reconcile_pool_manifest()` and `reconcile_workspace_manifest()` from removing plugin-sourced skill tags when the on-disk skill directory is absent. Although closed, the underlying fix is still being advanced via the newer PR.

Other open PRs updated today are not yet merged, but represent in-flight progress:
- [#6632 fix(skills): preserve plugin-sourced skill tags across reconcile cycles](https://github.com/agentscope-ai/QwenPaw/pull/6632)
- [#6631 fix(providers): align Aliyun coding plan models with official website](https://github.com/agentscope-ai/QwenPaw/pull/6631)
- [#6630 fix(agents): report empty model response to user instead of silently failing](https://github.com/agentscope-ai/QwenPaw/pull/6630)
- [#6629 fix(memory): trigger summarize on auto-compression when summarize_when_compact is enabled](https://github.com/agentscope-ai/QwenPaw/pull/6629)
- [#6628 fix(scroll): use SystemMsg for compressed memory placeholder in _rebuild_context](https://github.com/agentscope-ai/QwenPaw/pull/6628)

## 4. Community Hot Topics
The most active discussions are issue-based; no PRs have notable comment activity.

- [#6593 [OPEN] [enhancement] Add unified and professional QwenPaw cleanup page](https://github.com/agentscope-ai/QwenPaw/issues/6593) — 2 comments  
  User reports that long-running agents accumulate excessive data — auto-memory, tool outputs, collaboration artifacts, backups, and chat history — leading to storage bloat. The request is for a dedicated global cleanup UI with manual and automated options, plus improvements to the inbox.

- [#6627 [OPEN] [question] How to use loongsuite to trace](https://github.com/agentscope-ai/QwenPaw/issues/6627) — 1 comment  
  A user asks how to integrate `alibaba/loongsuite-python` with QwenPaw for LLM tracing. Documentation exists for AgentScope but not for QwenPaw specifically.

Underlying needs: users want better operational control over data lifecycle and first-class observability/tracing support.

## 5. Bugs & Stability
No new standalone bug issues were opened today, but several PRs are actively fixing reported bugs. Ranked by approximate severity:

1. **Silent empty model responses** — [Issue #6601](https://github.com/agentscope-ai/QwenPaw/issues/6601) / [PR #6630](https://github.com/agentscope-ai/QwenPaw/pull/6630)  
   Empty model responses (no content, no tool calls) are silently swallowed, especially near context limits. Fix PR makes the failure visible to users. High severity because users may not realize the agent has failed.

2. **Invalid `user` role in compressed context causes HTTP 400** — [Issue #6541](https://github.com/agentscope-ai/QwenPaw/issues/6541) / [PR #6628](https://github.com/agentscope-ai/QwenPaw/pull/6628)  
   Rollup compression injects `[context compressed]` as `role=user`, causing OpenAI-compatible APIs like DeepSeek to reject requests. Fix switches to `SystemMsg`. High severity for affected providers.

3. **Auto-compression ignores `summarize_when_compact`** — [Issue #6624](https://github.com/agentscope-ai/QwenPaw/issues/6624) / [PR #6629](https://github.com/agentscope-ai/QwenPaw/pull/6629)  
   Manual `/compact` triggers memory summarization, but auto-compression does not. Fix triggers summarize flow when configured. Medium severity.

4. **Plugin-sourced skill tags disappear after restart** — [Issue #6537](https://github.com/agentscope-ai/QwenPaw/issues/6537) / [PR #6632](https://github.com/agentscope-ai/QwenPaw/pull/6632)  
   Reconcile logic removes plugin-sourced skills because their directories are not found on disk. Fix preserves tags. Medium severity / workflow annoyance.

5. **Aliyun coding plan model list mismatch** — [Issue #6551](https://github.com/agentscope-ai/QwenPaw/issues/6551) / [PR #6631](https://github.com/agentscope-ai/QwenPaw/pull/6631)  
   The provider lists unsupported models (`glm-5.2`, `glm-5.1`) and misses supported ones like `qwen3.7-plus`. Fix aligns with official offering. Medium severity for Aliyun users.

## 6. Feature Requests & Roadmap Signals
The clearest roadmap signals come from issue #6593 and question #6627:

- **Unified data cleanup / maintenance UI** ([#6593](https://github.com/agentscope-ai/QwenPaw/issues/6593))  
  Users request a professional, global cleanup page to remove expired memories, temporary tool files, old backups, and conversation history without risking important data. This could indicate a future storage-management or "workspace hygiene" feature.

- **LLM tracing via LoongSuite** ([#6627](https://github.com/agentscope-ai/QwenPaw/issues/6627))  
  A concrete integration/observability request. If adopted, next versions might add tracing hooks or a documented setup path for LoongSuite.

- **Inline tool-card image gallery** ([PR #5490](https://github.com/agentscope-ai/QwenPaw/pull/5490))  
  An older, still-open feature PR improves how tool-produced images are displayed in the console. It has been updated recently and may see movement.

Given the current bug-fix focus, the next release will likely emphasize reliability and compatibility fixes rather than major new features.

## 7. User Feedback Summary
- **Storage bloat is a real pain point**: In [#6593](https://github.com/agentscope-ai/QwenPaw/issues/6593), a long-term user describes QwenPaw becoming "chaotic and bulky" after sustained agent use. They want safe, automated cleanup and express concern about manual deletion risking important data.
- **Tracing docs are missing**: [#6627](https://github.com/agentscope-ai/QwenPaw/issues/6627) shows users are trying to adopt external tracing tools but cannot find QwenPaw-specific guidance.
- **Silent failures erode trust**: The fixes in PRs #6630 and #6628 are motivated by user-visible failures: the agent appears to do nothing, or requests fail with confusing API errors. Users expect clearer error reporting and context-compatible messages.
- Overall satisfaction appears tied to reliability and long-term maintainability rather than new feature breadth.

## 8. Backlog Watch
- [#5490 [OPEN] feat(console): show tool-card images inline and add gallery navigation](https://github.com/agentscope-ai/QwenPaw/pull/5490)  
  Open since 2026-06-24 — over 5 weeks. No maintainer comments or merge activity, though it was updated on 2026-08-01. This feature PR likely needs review.

- [#6593 [OPEN] [enhancement] Add unified and professional QwenPaw cleanup page](https://github.com/agentscope-ai/QwenPaw/issues/6593)  
  Created 2026-07-31, updated 2026-08-01, with user comments but no visible maintainer response. Significant community interest in data hygiene.

- [#6627 [OPEN] [question] How to use loongsuite to trace](https://github.com/agentscope-ai/QwenPaw/issues/6627)  
  A support/documentation question that currently has no maintainer answer. Quick documentation examples could reduce onboarding friction.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

# EasyClaw Project Digest — 2026-08-02

**Data source:** [github.com/gaoyangz77/easyclaw](https://github.com/gaoyangz77/easyclaw)

## 1. Today's Overview

EasyClaw saw a quiet 24-hour period in terms of community activity: **0 issues and 0 pull requests** were updated, with no open/active items. The main highlight is the release of **v1.8.84 (“TK Copilot v1.8.84”)**, which ships two auth/user-experience improvements. No bugs, regressions, or community discussions were reported in the last day. Overall, the project appears in a stable maintenance phase, with activity centered on release delivery rather than issue triage or PR review.

## 2. Releases

**New release: [v1.8.84 — TK Copilot](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.84)**

Changes:

- Opening the TK Copilot website from Desktop now automatically uses the currently signed-in account.
- One-time login credentials are removed from localhost callback URLs immediately after use.

Chinese mirror:

- 从 Desktop 打开 TK Copilot 官网时自动沿用当前登录账号
- 一次性登录凭证使用后立即从 localhost 回调地址中清除

**Breaking changes:** None indicated.  
**Migration notes:** None provided. Installation instructions for macOS were included in the release notes, though the portion visible in the data source is truncated.

## 3. Project Progress

No PRs were merged or closed in the last 24 hours. There are **0 open PRs** and **0 merged/closed PRs** updated during this period. The functional progress for today comes entirely from the v1.8.84 release, specifically:

- Improved Desktop-to-web session continuity.
- Cleanup of temporary auth credentials from localhost callback URLs.

## 4. Community Hot Topics

No issues or pull requests were updated in the last 24 hours, and the repository reports **0 total latest issues / PRs**. There are no active community threads to analyze at this time. This suggests a low-engagement day rather than unresolved-but-quiet threads.

## 5. Bugs & Stability

No bugs, crashes, or regressions were reported or updated in the last 24 hours. The v1.8.84 release includes a security-related stability improvement: removing one-time login credentials from localhost callback URLs after use, which reduces the risk of credential leakage. No fix-PRs are pending because no new bugs were filed.

## 6. Feature Requests & Roadmap Signals

No explicit feature requests were captured in the last 24 hours. However, the v1.8.84 release signals a continued focus on:

- **Desktop ↔ web authentication continuity** — preserving the signed-in account when launching the website from the desktop app.
- **Credential hygiene** — proactively clearing short-lived auth tokens from callback URLs.

If this trend continues, the next release could deepen the local-desktop integration, possibly expanding browser-session reuse or adding more OAuth flow hardening.

## 7. User Feedback Summary

There was no direct user feedback in issues or PRs during this period. The release notes indirectly reflect two known user pain points:

- Users had to re-authenticate or manually select an account when moving from the Desktop app to the TK Copilot website.
- Local callback URLs retained temporary login credentials after use, a potential security concern.

v1.8.84 addresses both concerns, which should improve satisfaction around login convenience and security.

## 8. Backlog Watch

There are **0 open/active issues** and **0 open PRs** requiring maintainer attention. No long-unanswered items were detected in this digest window. The project’s backlog appears clear as of 2026-08-02.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar).*