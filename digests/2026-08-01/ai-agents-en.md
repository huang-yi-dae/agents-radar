# OpenClaw Ecosystem Digest 2026-08-01

> Issues: 500 | PRs: 500 | Projects covered: 13 | Generated: 2026-08-01 03:22 UTC

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

# OpenClaw Project Digest — 2026-08-01

**Data snapshot:** 500 issues updated (461 open/active, 39 closed) · 500 PRs updated (377 open, 123 merged/closed) · 0 new releases

---

## 1. Today's Overview

OpenClaw is in a period of very high activity, with 500 issues and 500 PRs touched in the last 24 hours and a healthy merge rate of roughly 25% of updated PRs (123 merged/closed). However, the project remains under strain from a cluster of severe reliability bugs: a P0 gateway memory leak ([#91588](https://github.com/openclaw/openclaw/issues/91588)) and several P1 session-state/message-delivery regressions continue to dominate maintainer attention. The day saw meaningful forward progress: four fix PRs were closed (Ollama provider routing, stale lifecycle aborts, and two Codex `CODEX_HOME` OAuth isolation PRs), and at least a dozen new fix PRs entered the review queue. No new releases shipped, so all fixes are pending the next cut. Community energy is concentrated on cross-platform desktop support ([#75](https://github.com/openclaw/openclaw/issues/75), 116 comments, 80 👍) and on security-hardening features (masked secrets, memory trust tagging).

---

## 2. Releases

**None.** No new releases were published on 2026-08-01.

---

## 3. Project Progress

**Closed/merged PRs today (fixes that are effectively ready to ship):**

- [PR #117171 — fix(ollama): honor canonical model requests and pull completion](https://github.com/openclaw/openclaw/pull/117171) — Replaces the deprecated `name` field with the documented `model` contract for Ollama inspection/download endpoints; addresses discovery and paired-node setup failures.
- [PR #117168 — fix(agents): prevent fallback after stale lifecycle abort](https://github.com/openclaw/openclaw/pull/117168) — Closes [#116418](https://github.com/openclaw/openclaw/issues/116418), where a primary Ollama model was silently skipped because the attempt belonged to a stale Gateway lifecycle.
- [PR #110020 — fix(coding-agent): scope CODEX_HOME to prevent OAuth collision with OpenClaw](https://github.com/openclaw/openclaw/pull/110020) and [PR #109782 — isolate Codex CLI CODEX_HOME in skill launch forms](https://github.com/openclaw/openclaw/pull/109782) — Both close [#109704](https://github.com/openclaw/openclaw/issues/109704), eliminating `refresh_token_reused` OAuth conflicts when OpenClaw and the bundled Codex CLI share ChatGPT credentials.

**Also closed today:** issues [#116418](https://github.com/openclaw/openclaw/issues/116418) (Ollama routing), [#116391](https://github.com/openclaw/openclaw/issues/116391) (WebChat history disappearing across calendar days), [#116409](https://github.com/openclaw/openclaw/issues/116409) (duplicate inbound transcript writes on all channels), and [#116868](https://github.com/openclaw/openclaw/issues/116868) (SQLite sessions falling back to frozen legacy JSONL).

**Notable new PRs awaiting maintainer review (P1/P2, ready or needing proof):**

- [PR #117177 — fix(exec): preserve approved command output when sessions resume](https://github.com/openclaw/openclaw/pull/117177) — closes [#41152](https://github.com/openclaw/openclaw/issues/41152)
- [PR #116934 — fix(matrix): preserve messages sent during crash downtime](https://github.com/openclaw/openclaw/pull/116934) and [PR #117008 — fix(matrix): recover durable sends after response loss](https://github.com/openclaw/openclaw/pull/117008)
- [PR #117185 — fix(codex): preserve authoritative turn completion and final output](https://github.com/openclaw/openclaw/pull/117185) and [PR #117186 — fix(xai): preserve authoritative realtime response outcomes](https://github.com/openclaw/openclaw/pull/117186)
- [PR #117179 — fix(google): stop runaway realtime transcript growth](https://github.com/openclaw/openclaw/pull/117179) — related to [#116201](https://github.com/openclaw/openclaw/issues/116201)
- [PR #117151 — fix(process): clean attached Unix descendants on cancellation](https://github.com/openclaw/openclaw/pull/117151) — closes [#116240](https://github.com/openclaw/openclaw/issues/116240)
- [PR #116666 — fix(queue): prevent cron saturation from starving hook dispatch](https://github.com/openclaw/openclaw/pull/116666)

---

## 4. Community Hot Topics

- **[Issue #75 — Linux/Windows Clawdbot Apps](https://github.com/openclaw/openclaw/issues/75)** — *116 comments, 80 👍.* The single most-engaged issue in the project. Users want feature parity with the macOS app on Linux and Windows. Open since January; still awaiting a product decision. Relates to the broader theme of desktop/mobile node parity.

- **[Issue #91588 — Critical: Gateway Memory Leak (P0)](https://github.com/openclaw/openclaw/issues/91588)** — *23 comments.* RSS growth from ~350 MB to 15.5 GB over 2–3 days causing repeated OOM kill/restart cycles. The most severe open stability issue; users are effectively unable to run long-lived gateways without manual restarts.

- **[Issue #7707 — Feature Request: Memory Trust Tagging by Source](https://github.com/openclaw/openclaw/issues/7707)** — *23 comments.* Proposes tagging memory entries by origin (user vs. web scrape vs. third-party skill) to prevent memory-poisoning attacks. Reflects growing security awareness in the community.

- **[Issue #116201 — Realtime voice can retain unbounded provider/consult state (P1)](https://github.com/openclaw/openclaw/issues/116201)** — *18 comments.* Voice sessions accumulate superseded consult work and large provider frames under slow/stalled conditions. A fix for the Google provider is already up ([PR #117179](https://github.com/openclaw/openclaw/pull/117179)).

- **[Issue #10659 — Feature Request: Masked Secrets (P1)](https://github.com/openclaw/openclaw/issues/10659)** — *15 comments, 4 👍.* Agents should use API keys without being able to read them. Tagged needs-security-review; a likely candidate for an upcoming release.

- **[Issue #51429 — Hardcoded workspace path merged into code](https://github.com/openclaw/openclaw/issues/51429)** — *13 comments.* A user found OpenClaw creating `/Users/wangtao` on their machine. High-visibility trust/code-quality concern, though low technical severity (P2).

**Underlying needs:** cross-platform parity, long-running process reliability, and defense against credential/memory exposure. The memory leak and delivery-failure issues are generating sustained pressure for a stability-focused release.

---

## 5. Bugs & Stability

Ranked by severity:

| Severity | Issue | Summary | Fix status |
|---|---|---|---|
| **P0** | [#91588](https://github.com/openclaw/openclaw/issues/91588) | Gateway memory leak: RSS 350 MB → 15.5 GB, OOM crash loops | No fix PR yet; related heap report [#87109](https://github.com/openclaw/openclaw/issues/87109) |
| **P1** | [#116201](https://github.com/openclaw/openclaw/issues/116201) | Realtime voice retains unbounded provider/consult state | [PR #117179](https://github.com/openclaw/openclaw/pull/117179) (Google provider) |
| **P1** | [#115908](https://github.com/openclaw/openclaw/issues/115908) | Transcript projection reconcile livelocks main thread under sustained writes, stalling all channels | Needs live repro |
| **P1** | [#114137](https://github.com/openclaw/openclaw/issues/114137) | Visible Signal turns complete with final text persisted but never delivered | Needs product decision |
| **P1** | [#86519](https://github.com/openclaw/openclaw/issues/86519) | Telegram duplicate identical replies (2–10×) after 5.20 update; regression persists in 5.22 | Needs live repro |
| **P1** | [#113306](https://github.com/openclaw/openclaw/issues/113306) | SQLite snapshot restore lacks crash/identity guarantees, can report false success | Needs maintainer review |
| **P1** | [#45494](https://github.com/openclaw/openclaw/issues/45494) | Cron jobs silently time out during sustained LLM API outages instead of fast-failing | Needs live repro |
| **P1** | [#51396](https://github.com/openclaw/openclaw/issues/51396) | `clearUnboundScopes` strips operator scopes for non-local token-auth clients (security regression) | Linked PR open |
| **P1** | [#97616](https://github.com/openclaw/openclaw/issues/97616) | Leaked unreaped hook/tool child processes → zombie accumulation | Related [PR #117151](https://github.com/openclaw/openclaw/pull/117151) (descendant cleanup) |
| **P1** | [#46786](https://github.com/openclaw/openclaw/issues/46786) | `tools.elevated.enabled: true` breaks exec routing — all exec calls go to gateway host | Needs security review + live repro |
| **P1** | [#70024](https://github.com/openclaw/openclaw/issues/70024) | Channel stop timeout leaves channel permanently dead (`running: true` with stale store entries) | Linked PR open |
| **P1** | [#48810](https://github.com/openclaw/openclaw/issues/48810) | Compaction retry creates orphan fork in parentId chain, breaking chain reconstruction | Needs live repro |
| **P1** | [#96692](https://github.com/openclaw/openclaw/issues/96692) | Slack thread replies generated but not delivered when origin tuple is lost | Source repro available |
| **P1** | [#86012](https://github.com/openclaw/openclaw/issues/86012) | LINE messages silently lost due to reply token expiry; no push fallback | Needs info |
| **P1** | [#116242](https://github.com/openclaw/openclaw/issues/116242) | Codex supervision redaction only covers 4 token-prefix classes; AWS/Google/JWT credentials can leak | Related [PR #117185](https://github.com/openclaw/openclaw/pull/117185) |
| **P1** | [#114255](https://github.com/openclaw/openclaw/issues/114255) | Restart mid-run leaves session `status=running`; Telegram spool retries forever | Source repro available |
| **P1** | [#115476](https://github.com/openclaw/openclaw/issues/115476) | Context refresh after compaction replays old Telegram `message_id` (missing dedup) | Needs info |
| **P2** | [#115001](https://github.com/openclaw/openclaw/issues/115001) | Hybrid memory search returns spurious 1.0 similarity scores via FTS LIKE-fallback hardcoded textScore | Source repro; maintainer question open |
| **P2** | [#77930](https://github.com/openclaw/openclaw/issues/77930) | Discord channel not loaded in 2026.5.4+ (regression matrix documented) | Linked PR open |
| **P2** | [#51429](https://github.com/openclaw/openclaw/issues/51429) | Hardcoded `/Users/wangtao` workspace path shipped in release | Needs maintainer review |

**Summary:** Stability remains the dominant theme. The P0 memory leak and a long tail of P1 message-delivery/session-state bugs are the main blockers to a healthy stable release. Today's closed PRs show maintainers are actively clearing regressions, but several P1s remain stuck awaiting live repro or product decisions.

---

## 6. Feature Requests & Roadmap Signals

**Most-supported requests (by 👍 and comment volume):**

- **[#75 — Linux/Windows desktop apps](https://github.com/openclaw/openclaw/issues/75)** — 80 👍. Strongest product signal; likely a roadmap commitment though no timeline is visible.
- **[#10659 — Masked secrets (P1, security)](https://github.com/openclaw/openclaw/issues/10659)** — 4 👍. Agents use keys without seeing them. Tagged `needs-security-review`; plausible for next release given the security focus of recent PRs.
- **[#45608 — Pre-reset agentic memory flush](https://github.com/openclaw/openclaw/issues/45608)** — 4 👍. `/new` and daily reset should flush memory the same way compaction does, so users don't lose distilled context.
- **[#10687 — Fully dynamic model discovery (OpenRouter + beyond)](https://github.com/openclaw/openclaw/issues/10687)** — 3 👍. Static model catalogs are causing visible pain; related to [#109017](https://github.com/openclaw/openclaw/issues/109017) (Anthropic catalog never pulls new models).
- **[#7707 — Memory trust tagging by source](https://github.com/openclaw/openclaw/issues/7707)** — 0 👍 but 23 comments; security-driven and complements masked secrets.
- **[#67419 — Stop re-injecting bootstrap files every turn](https://github.com/openclaw/openclaw/issues/67419)** — 2 👍. 20–30% token waste per session; a clear cost-saving efficiency win.
- **[#9986 — Trigger model fallback on context-length exceeded](https://github.com/openclaw/openclaw/issues/9986)** — Currently fallback only fires on API errors, not context overflow.
- **[#13219 — Per-model usage logging for cost tracking](https://github.com/openclaw/openclaw/issues/13219)** — Ops-facing request with no aggregated view today.
- **[#90916 — Topic-session families](https://github.com/openclaw/openclaw/issues/90916)** — Architectural ask for multi-lane context isolation; lower priority but conceptually aligned with compaction/memory work.
- **[#113251 — Image viewing in webchat file viewer](https://github.com/openclaw/openclaw/issues/113251)** — Small UX gap, cheap to ship.
- **[#81913 — Stable plugin SDK surface for installed-skill workflows](https://github.com/openclaw/openclaw/issues/81913)** — Ecosystem enablement for third-party plugins.

**Prediction:** The next release will likely land the already-closed Ollama/Codex fixes plus the in-flight P1 stability PRs ([#117177](https://github.com/openclaw/openclaw/pull/117177), [#116934](https://github.com/openclaw/openclaw/pull/116934), [#117185](https://github.com/openclaw/openclaw/pull/117185), [#117179](https://github.com/openclaw/openclaw/pull/117179), [#117151](https://github.com/openclaw/openclaw/pull/117151)). Feature-wise, masked secrets ([#10659](https://github.com/openclaw/openclaw/issues/10659)) and dynamic model discovery ([#10687](https://github.com/openclaw/openclaw/issues/10687)) are the strongest near-term candidates because they are P1-tagged and repeatedly raised; Linux/Windows apps ([#75](https://github.com/openclaw/openclaw/issues/75)) remain a larger, longer-lead effort.

---

## 7. User Feedback Summary

**Recurring pain points:**

- **Memory growth and OOM kills** are the #1 operational complaint ([#91588](https://github.com/openclaw/openclaw/issues/91588), [#87109](https://github.com/openclaw/openclaw/issues/87109)). Users describe silent cron failures and event-loop starvation under memory pressure — a production-reliability issue.
- **Silent message loss** across channels undermines trust: Telegram duplicates ([#86519](https://github.com/openclaw/openclaw/issues/86519)), LINE tokens expiring with no fallback ([#86012](https://github.com/openclaw/openclaw/issues/86012)), Slack thread replies never delivered ([#96692](https://github.com/openclaw/openclaw/issues/96692)), Matrix loops and lost sends ([#114211](https://github.com/openclaw/openclaw/issues/114211)).
- **Session state corruption** after restarts and compaction ([#114255](https://github.com/openclaw/openclaw/issues/114255), [#48810](https://github.com/openclaw/openclaw/issues/48810)) makes users re-explain work or lose context entirely.
- **Trust and security anxiety:** the hardcoded `/Users/wangtao` path ([#51429](https://github.com/openclaw/openclaw/issues/51429)) drew alarmed community response; users also want credential isolation ([#10659](https://github.com/openclaw/openclaw/issues/10659)) and memory-poisoning defenses ([#7707](https://github.com/openclaw/openclaw/issues/7707)).
- **Cross-platform gap:** Linux/Windows users feel excluded from the polished macOS/desktop experience ([#75](https://github.com/openclaw/openclaw/issues/75)).

**Positive signals:** The community is technically engaged — reporters are providing root-cause analyses, regression matrices, and even fix PRs (e.g., [#117177](https://github.com/openclaw/openclaw/pull/117177) preserves a contributor's commit). Maintainers closed 39 issues and 123 PRs today, including two independently-submitted Codex OAuth fixes ([#110020](https://github.com/openclaw/openclaw/pull/110020), [#109782](https://github.com/openclaw/openclaw/pull/109782)), indicating responsive stewardship. Non-English reports (Chinese-language issues [#51429](https://github.com/openclaw/openclaw/issues/51429), [#87109](https://github.com/openclaw/openclaw/issues/87109)) show a global user base.

---

## 8. Backlog Watch

Items that have been open for extended periods or are blocked on maintainer action:

- **[#75 — Linux/Windows apps](https://github.com/openclaw/openclaw/issues/75)** — Open since Jan 1, 116 comments, 80 👍. No maintainer response pattern visible; needs a product decision on platform scope.
- **[#91588 — P0 gateway memory leak](https://github.com/openclaw/openclaw/issues/91588)** — Open since June 9; the highest-severity issue in the project with no fix PR yet. Should be the top prioritization signal.
- **[#10659 — Masked secrets](https://github.com/openclaw/openclaw/issues/10659)** — Open since Feb; P1 + `needs-security-review`; long wait for a security review.
- **[#10687 — Dynamic model discovery](https://github.com/openclaw/openclaw/issues/10687)** — Open since Feb; 3 👍; recurring complaints about static catalogs ([#109017](https://github.com/openclaw/openclaw/issues/109017)).
- **[#45494 — Cron silent timeouts](https://github.com/openclaw/openclaw/issues/45494)** — Open since March; P1 regression, still needs a live repro.
- **[#51396 — Operator scopes stripped for token-auth clients](https://github.com/openclaw/openclaw/issues/51396)** — Open since March; P1 security regression with a linked PR open.
- **[#48810 — Compaction orphan fork](https://github.com/openclaw/openclaw/issues/48810)** — Open since March; P1 data-chain corruption; needs live repro.
- **[#70024 — Channel stop timeout leaves channel dead](https://github.com/openclaw/openclaw/issues/70024)** — Open since April; P1 with a linked PR open; multiple code paths identified.
- **[#86012 — LINE silent message loss](https://github.com/openclaw/openclaw/issues/86012)** — Open since May; P1; await `needs-info` from reporter.
- **[#90098 — Stack-safe large attachment handling](https://github.com/openclaw/openclaw/issues/90098)** — Open since June; P1; linked PR open.
- **[#97616 — Zombie child process leak](https://github.com/openclaw/openclaw/issues/97616)** — Open since June; P1 regression; related process-cleanup PR in review.
- **[#116242 — Codex redaction coverage gap](https://github.com/openclaw/openclaw/issues/116242)** — Open July 30; P1 security; fix in flight via [#117185](https://github.com/openclaw/openclaw/pull/117185) but needs live repro confirmation.

Many of the above carry `clawsweeper:needs-maintainer-review` or `clawsweeper:needs-product-decision` triage labels, suggesting maintainer bandwidth — rather than lack of reports — is the primary bottleneck. The backlog watch list is heavily weighted toward P1 reliability and security items that have been waiting 1–5 months for a definitive fix.

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report — Personal AI Assistant Ecosystem

**Date:** 2026-08-01 | **Coverage:** Last 24 hours, 13 projects tracked

---

## 1. Ecosystem Overview

The open-source personal AI assistant landscape is in a consolidation-and-stabilization phase: while feature development continues (new channel adapters, provider integrations, WebUI polish), the dominant engineering energy across virtually every active project is now directed at reliability — memory leaks, silent message loss, session-state corruption, and credential/security hardening. The ecosystem is bifurcating into two architecture camps: a reference-style monolithic gateway model (OpenClaw and its derivatives) versus a newer generation of ground-up redesigns (IronClaw's crate-based Rust refactor, ZeroClaw's RFC-driven design, NanoClaw's lightweight Docker-centric runtime). Notably, **no project shipped a release in this 24-hour window**, despite 180+ merged PRs across the ecosystem — indicating a broad holding pattern awaiting stability fixes. A third of the tracked projects are effectively dormant, while the top three projects (OpenClaw, IronClaw, CoPaw) account for roughly 90% of all merged PR activity.

---

## 2. Activity Comparison

| Project | Issues Updated | PRs Updated | PRs Merged/Closed | Release | Health Score* |
|---|---|---|---|---|---|
| **OpenClaw** | 500 | 500 | 123 | None | 6/10 |
| **IronClaw** | 36 | 50 | 29 | None (chore: release PR open since Jul 3) | 6/10 |
| **ZeroClaw** | 50 | 50 | 10 | None | 6/10 |
| **CoPaw** | 16 | 34 | 10 | None (2.0.1 current) | 6/10 |
| **LobsterAI** | 4 | 12 | 11 | Release branch prepped, not tagged | 6/10 |
| **NanoClaw** | 8 | 10 | 4 | None | 7/10 |
| **NanoBot** | 4 | 13 | 6 | None | 8/10 |
| **Moltis** | 2 | 6 | 2 | None | 7/10 |
| **PicoClaw** | 2 | 3 | 0 | None | 5/10 |
| **NullClaw** | 0 | 1 | 0 | None | 7/10 |
| **TinyClaw** | 0 | 0 | 0 | None | 3/10 |
| **ZeptoClaw** | 0 | 0 | 0 | None | 3/10 |
| **EasyClaw** | 0 | 0 | 0 | None | 3/10 |

*Health score composites merge throughput, open-bug severity, review responsiveness, and community engagement velocity. Scores are degraded for unresolved P0/P1 security or data-loss issues, even when activity is high.

---

## 3. OpenClaw's Position

**Advantages.** OpenClaw remains the undisputed ecosystem center of gravity: its 500 issues + 500 PRs touched in 24 hours represents ~10× the activity of the next-busiest project (IronClaw, at 86 combined). Merge discipline is strong (123 PRs closed, ~25% of all updated PRs). It serves as the reference implementation that many peers explicitly build against — LobsterAI's entire digest concerns stabilizing the OpenClaw runtime, and NanoClaw positions itself as a lightweight alternative, validating OpenClaw's architectural influence. Community depth is unmatched: the Linux/Windows desktop request (#75) alone has 116 comments and 80 👍 — more engagement than most peer projects receive across their entire tracker.

**Technical approach differences.** OpenClaw uses a central gateway with lifecycle-aware sessions and a provider-agnostic abstraction layer for channels (Telegram, Slack, Matrix, Signal, LINE) and model backends (Ollama, Codex, xAI, Google). Its weakness is visible under sustained load: the P0 gateway memory leak (350 MB → 15.5 GB RSS) and a long tail of P1 message-delivery regressions. Competitors differ meaningfully: IronClaw is re-architecting into separable contracts/crates (Rust, multi-tenant); ZeroClaw is still in RFC-driven design rather than shipping; CoPaw bets on the AgentScope 2.0 framework; NanoClaw trades features for a Docker-centric minimal footprint.

**Community size comparison.** OpenClaw's community is roughly an order of magnitude larger than any peer, but also exposes the classic reference-project tension: high engagement generates high report volume, and maintainer bandwidth (not awareness) is the binding constraint. Several peer projects with small communities show proportionally better triage turnaround (e.g., NanoBot merged 6 of 13 PRs in a day; Moltis and NanoClaw each merged ~40% of updated PRs).

---

## 4. Shared Technical Focus Areas

Requirements emerging independently across multiple projects — strong signals for any agent developer building on this ecosystem:

| Focus Area | Projects | Specific Needs |
|---|---|---|
| **Memory architecture redesign** | OpenClaw, ZeroClaw, CoPaw, IronClaw | Separate conversation history from curated long-term memory (ZeroClaw #9048, #6850); memory trust-tagging by source (OpenClaw #7707); flush-before-compaction to prevent data loss (CoPaw #6555); cross-user memory scoping (IronClaw P0 #6900) |
| **Credential & secret security** | OpenClaw, ZeroClaw, NanoClaw, Moltis, IronClaw | Masked secrets so agents use keys without reading them (OpenClaw #10659); log redaction of tokens/credentials (NanoClaw #3161, ZeroClaw #8918); per-account operator privilege separation (Moltis #1170); key-source abstraction (ZeroClaw #9127) |
| **Message-delivery reliability** | OpenClaw, NanoBot, CoPaw, NanoClaw, IronClaw | Silent message loss and duplicates across Telegram, WeChat/Weixin, Slack, LINE, Matrix; reliable session recovery after auth expiry (NanoBot #5195, OpenClaw #86012, CoPaw #6614) |
| **Shell/exec safety & lifecycle** | OpenClaw, ZeroClaw, CoPaw | Per-execution shell confirmation tiers (ZeroClaw #7155); command timeouts + orphan subprocess cleanup (CoPaw #6608, OpenClaw #97616/#117151); output streaming/truncation instead of UI freeze (CoPaw #6589, #6512) |
| **Cross-platform & deployment flexibility** | OpenClaw, NanoClaw, CoPaw, NanoBot | Linux/Windows desktop parity (OpenClaw #75); run-without-Docker and K8s runtimes (NanoClaw #1225, #2354); Windows file-system edge cases (CoPaw #6520); minimal-Linux support (NanoBot #5187) |
| **Provider/model agility** | OpenClaw, NanoBot, NullClaw, PicoClaw, CoPaw | Dynamic model discovery beyond static catalogs (OpenClaw #10687); per-session model switching (NanoBot #5198); configurable fallback chains (PicoClaw #3200); new provider backends (DeepSeek, Grok CLI, NVIDIA NIM) |
| **Context-length & token efficiency** | OpenClaw, CoPaw, LobsterAI | Stop re-injecting bootstrap files every turn (OpenClaw #67419); explicit empty-response errors near context limits (CoPaw #6601); prompt-cache byte-stability (LobsterAI #2413/#2415, IronClaw #6984–#6990) |

---

## 5. Differentiation Analysis

| Project | Primary Focus | Target Users | Architecture Signature |
|---|---|---|---|
| **OpenClaw** | Full-featured reference agent; all channels, all providers | General users, power users, self-hosters | Monolithic gateway + lifecycle-aware sessions + provider/channel adapters |
| **IronClaw** | Multi-tenant, production-grade agent platform | Enterprises, managed deployments | Rust; crate-based contract extraction; Hosted-MCP; admin console |
| **ZeroClaw** | Design/RFC-driven next-gen agent | Architecture-minded adopters, plugin developers | Pre-1.0; plugin/Wasm roadmap; memory lifecycle debates; OTel observability |
| **CoPaw (QwenPaw)** | Desktop-first agent with AgentScope 2.0 alignment | Qwen-model users, desktop (macOS/Windows) users | AgentScope framework + Scroll context protocol + desktop apps |
| **NanoClaw** | Minimal, secure, Docker-centric agent | Security-conscious tinkerers, constrained environments | Container-isolated; Apple Container experiment; host-direct runner requests |
| **NanoBot** | Channel-stability-focused assistant | Personal WeChat/Weixin, Slack, Termux users | Pragmatic: JSONL→SQLite migration; per-channel session fixes |
| **LobsterAI** | OpenClaw runtime derivative (Netease/Youdao) | OpenClaw users needing managed/cache-optimized runtime | DeepSeek prompt-cache optimization; side-chat (BTW) protocol; stale-maintenance workflow |
| **Moltis** | Buzz/Nostr-workspace integration | Block/Buzz workspace users, self-hosters | NIP-29 group chat; security-hardening PR queue |
| **NullClaw** | CLI-provider aggregation | Users with local CLI CLIs (codex, gemini, claude, grok) | Spawn-per-request CLI delegation; minimal core |
| **PicoClaw** | Multi-channel lightweight agent (Sipeed) | IoT/embedded tinkerers, IRC/DeltaChat/Simplex users | Channel breadth over provider depth; small footprint |

---

## 6. Community Momentum & Maturity

**Tier 1 — High velocity (rapid iteration, but stability-constrained):**
- **OpenClaw** — Massive throughput; actively clearing regressions but carrying the ecosystem's only P0 (memory leak, 37 days open). Its next release will be a bellwether for the ecosystem.
- **IronClaw** — Fastest merge discipline (29 PRs closed/24h); executing a disciplined Wave 1 refactor, but carries 3 unfixed security/privacy P0/P1 issues and an 29-day-old release PR — architectural velocity is outpacing user-facing bug triage.
- **CoPaw** — Responsive (10 PRs merged, several critical fixes in review) but absorbing a regression cluster from the AgentScope 2.0 migration; Windows corruption + compatibility bugs signal a mid-migration maturity dip.
- **ZeroClaw** — 50+ items/day but mostly design-phase; review queue (#8692 tracker) is the documented gating bottleneck. Momentum is real but not yet shipping.

**Tier 2 — Steady state (healthy cadence, low drama):**
- **NanoBot** — Best health score in the ecosystem: high merge rate (46%), no critical open issues, rapid turnaround on community reports (Termux fix merged same-day).
- **NanoClaw** — Solid, security-conscious; deployment-flexibility requests accumulating faster than maintainer response.
- **LobsterAI** — Effective engineering (cache-stability fixes merged) but process risk: stale-closed 5 fully-implemented community PRs, which can erode contributor trust.
- **Moltis** — Small but disciplined; three security PRs awaiting review indicate review bandwidth is the constraint.

**Tier 3 — Quiet maintenance:**
- **PicoClaw, NullClaw** — Low volume; active feature PRs (Simplex, Grok CLI) awaiting maintainer time. Risk: 3+ days without maintainer engagement on NullClaw's only open PR.

**Tier 4 — Dormant:**
- **TinyClaw, ZeptoClaw, EasyClaw** — Zero activity in window; monitor for abandonment or seasonal contribution cycles.

---

## 7. Trend Signals

1. **Stability is the new feature.** Across every active project, the top blockers are memory leaks, silent message loss, session corruption, and subprocess leaks — not missing features. The 2026 agent market is shifting from demo-ability to long-running production trust; developers should budget for reliability engineering, not just capability breadth.

2. **Memory architecture is the next competitive battleground.** Four independent projects (OpenClaw, ZeroClaw, CoPaw, IronClaw) are actively redesigning how conversation history, curated long-term memory, and compaction interact. The winning pattern will likely be: separate raw transcripts from curated memory, tag memory by provenance, and guarantee crash-safe persistence. Expect memory-related APIs to become a differentiator within 2–3 releases.

3. **Security is becoming an adoption gate, not an afterthought.** The cluster of requests around masked secrets, memory-poisoning defenses, credential isolation, privilege-tiered shell execution, and artifact-path hardening indicates users are deploying agents into production environments with real blast-radius concerns. Projects that ship auditable security primitives (operator allowlists, key isolation, log redaction) will win enterprise and security-conscious users.

4. **Docker-only deployment is a ceiling.** NanoClaw's repeated "run without Docker" requests, the K8s/Sealos deployment thread praising the project but requiring alternatives, and OpenClaw's Linux/Windows desktop demand all point to the same need: **deployment flexibility is a first-class requirement**. Container abstraction (native runner, K8s runtime, Apple Container) is emerging as a roadmap theme.

5. **Multi-provider is table stakes; dynamic discovery is the differentiator.** Static model catalogs are generating visible pain (OpenClaw #109017, #10687). Users expect agents to discover, route, and fall back across providers dynamically — per-session, not per-install. The CLI-provider pattern (NullClaw's codex/gemini/claude/grok delegates) shows users want to compose agents from whatever local/cloud backends they already have.

6. **Prompt-cache stability is a real cost lever.** LobsterAI's DeepSeek cache-hit-rate collapse (~100% → 57%) and IronClaw's prompt-cache accounting cluster are early indicators that token cost optimization is moving from prompt-engineering into runtime infrastructure. Byte-stable prompt projection and accurate token accounting will become standard engineering requirements.

7. **Community contributors are writing production code; maintainer review is the ecosystem's shared bottleneck.** The pattern recurs across projects: fully implemented community PRs waiting weeks (PicoClaw #3193, NullClaw #981), ready-to-merge security fixes parked (Moltis #1170/#1180), and — worst case — complete implementations stale-closed without merging (LobsterAI's sidebar PRs, 5 months of OAuth work). For ecosystem health, maintainer review velocity may now matter more than raw contributor influx.

---

**Bottom line for decision-makers:** The ecosystem is converging on reliability, memory architecture, and security as the defining 2026 problems. OpenClaw remains the reference point but is slowed by its own scale; IronClaw and ZeroClaw offer the most deliberate architectural futures; NanoBot and Moltis demonstrate that small projects with disciplined review can achieve the healthiest per-PR throughput. Anyone building on this ecosystem should assume that **message delivery, session persistence, and credential handling must be treated as critical infrastructure** — and that the next 90 days will likely produce a stability-focused release wave across all major projects.

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

## NanoBot Project Digest — 2026-08-01

### 1. Today's Overview

NanoBot showed high development activity over the past 24 hours: 4 issues were updated and 13 pull requests were touched, with 6 PRs closed/merged and no new releases. The project’s main focus was reliability, including a Weixin/WeChat session-expiry fix, Slack thread scoping, WebUI scroll behavior, Termux timezone support, and the large migration of session storage from JSONL to SQLite. Several new p1 bug-fix PRs and a DeepSeek provider feature PR are now open and awaiting review. Overall, the project is healthy and actively improving channel stability, platform compatibility, and WebUI experience.

### 2. Releases

No new releases were published for NanoBot on 2026-08-01.

### 3. Project Progress

Six PRs were closed/merged today:

- [PR #5173 — feat(session): migrate session storage from JSONL to SQLite](https://github.com/HKUDS/nanobot/pull/5173)  
  Major storage milestone: `sessions.db` is now the only runtime session store, JSONL files are transactionally imported on first startup, and existing JSONL files remain as rollback backups. WebUI session listing and Dream pruning now route through `SessionManager`.

- [PR #5196 — fix(weixin): recover refreshed state after session expiry](https://github.com/HKUDS/nanobot/pull/5196)  
  Fixes [#5195](https://github.com/HKUDS/nanobot/issues/5195). Weixin channel now reloads persisted state after a 60-minute session pause, preventing permanent silent expiry loops.

- [PR #5189 — fix(config): install timezone data on all platforms](https://github.com/HKUDS/nanobot/pull/5189)  
  Fixes [#5187](https://github.com/HKUDS/nanobot/issues/5187). Adds `tzdata` as a standard-library fallback for minimal Linux hosts like Termux while preserving strict invalid-timezone validation.

- [PR #5192 — fix(slack): scope channel thread openers to their own session](https://github.com/HKUDS/nanobot/pull/5192)  
  Fixes an issue where new Slack threads inherited the channel-wide session until their first reply, causing unrelated threads to share opening context.

- [PR #5193 — fix(webui): preserve user scroll ownership near tail](https://github.com/HKUDS/nanobot/pull/5193)  
  Improves thread-follow behavior by keeping scroll control with the user until explicit forward intent at the live-tail boundary.

- [PR #4223 — fix(weixin): reload session state after pause expiry](https://github.com/HKUDS/nanobot/pull/4223)  
  A longer-lived Weixin fix PR from June was closed today, likely superseded by the more complete [#5196](https://github.com/HKUDS/nanobot/pull/5196).

No new features were merged today except the underlying storage migration, but the merged bug fixes materially improve channel and WebUI reliability.

### 4. Community Hot Topics

The most-commented item today was:

- [Issue #5195 — [bug] [weixin] Re-scan QR login overwrites new token with old one in stop(), causing immediate errcode -14](https://github.com/HKUDS/nanobot/issues/5195)  
  2 comments, 0 reactions.  
  This issue captured real user pain around Weixin login refresh: after re-scanning a QR code, the restarted channel could pick up the old session token, immediately hit `errcode -14`, and pause for 60 minutes. The underlying need was reliable long-running session recovery for personal WeChat channels. This is now believed fixed by [#5196](https://github.com/HKUDS/nanobot/pull/5196).

Other PRs and issues did not accumulate public comments in the reported window, but the high volume of p1/p2 bug-fix PRs suggests active maintainer and contributor engagement.

### 5. Bugs & Stability

Ranked by potential impact:

- **High — Weixin session-expiry loop**  
  [Issue #5195](https://github.com/HKUDS/nanobot/issues/5195) was a serious channel-stability bug: a refreshed QR login could be overwritten by the old token, causing immediate `errcode -14` and a 60-minute pause. Fix PR [#5196](https://github.com/HKUDS/nanobot/pull/5196) was closed/merged.

- **High (open) — Malformed persisted session summary could break compaction**  
  [PR #5201 — fix(session): tolerate malformed persisted session summary](https://github.com/HKUDS/nanobot/pull/5201) is a p1 fix that makes `AutoCompact.prepare_session()` tolerate missing or malformed `_last_summary` fields. Open, awaiting review.

- **High (open) — Exec `wait_for` targets lost under response truncation**  
  [PR #5200 — fix(exec): preserve wait targets across response truncation](https://github.com/HKUDS/nanobot/pull/5200) is a p1 fix ensuring `write_stdin(wait_for=...)` searches the bounded internal output limit correctly. Open, awaiting review.

- **Medium — In-session model switching broken**  
  [Issue #5198 — Not possible to change models in a specific session unless reconfiguring the entire instance](https://github.com/HKUDS/nanobot/issues/5198)  
  Users cannot switch models per-session via the WebUI model blip or the `/model` command as expected. No fix PR exists yet.

- **Medium — Windows cannot load JavaScript modules due to MIME type**  
  [Issue #5190 — Module script loading fails with MIME type "text/plain"](https://github.com/HKUDS/nanobot/issues/5190)  
  Windows registry maps `.js` to `text/plain`, so Python’s `mimetypes` detection breaks frontend module loading. Fix [PR #5191](https://github.com/HKUDS/nanobot/pull/5191) is open and needs review.

- **Fixed — Termux timezone failure**  
  [Issue #5187 — `nanobot` doesn't work in Termux](https://github.com/HKUDS/nanobot/issues/5187) was resolved via [PR #5189](https://github.com/HKUDS/nanobot/pull/5189).

### 6. Feature Requests & Roadmap Signals

- [PR #5197 — feat(providers): support DeepSeek Responses API](https://github.com/HKUDS/nanobot/pull/5197)  
  Actively open p1 feature that routes `deepseek-v4-flash` through DeepSeek’s native Responses API while reusing existing streaming and function-tool machinery. This is a strong candidate for the next version.

- [PR #5184 — feat(webui): add Quick Chat and Temporary Chat](https://github.com/HKUDS/nanobot/pull/5184)  
  Adds persistent Quick Chat as a first-class WebUI entry and opt-in Temporary Chat with in-memory history. Signals growing WebUI product thinking around disposable vs. persistent conversations.

- [PR #5194 — perf(webui): reduce JSONL session list overhead](https://github.com/HKUDS/nanobot/pull/5194)  
  Even after the SQLite migration, this performance PR improves WebUI session listing by caching workspace-scope snapshots. Signals ongoing scale and performance work.

- [Issue #5198 — per-session model switching](https://github.com/HKUDS/nanobot/issues/5198)  
  The user request for per-session model selection, modeled after commercial SaaS AI UIs, could become a UX roadmap item if maintainers prioritize it.

### 7. User Feedback Summary

- **Weixin/WeChat users** reported a painful session-expiry failure after QR re-login: the system silently paused for 60 minutes. The fix in [#5196](https://github.com/HKUDS/nanobot/pull/5196) directly addresses this frustration.
- **Termux/minimal Linux users** could not start NanoBot at all due to missing timezone data; this was quickly fixed with `tzdata` fallback support.
- **Windows users** cannot reliably run the WebUI because JavaScript files are served as `text/plain`; this is still unresolved pending review of [#5191](https://github.com/HKUDS/nanobot/pull/5191).
- **Slack users** were affected by channel threads sharing one channel-wide session; the threading fix in [#5192](https://github.com/HKUDS/nanobot/pull/5192) should eliminate context bleed.
- **Power users** want the ability to switch models per-session without reconfiguring the entire instance, indicating a demand for more flexible model routing and interactive control.

### 8. Backlog Watch

- [Issue #5198 — model switching per session](https://github.com/HKUDS/nanobot/issues/5198)  
  Open, no comments, no fix PR yet. This is a clear user-facing feature gap and needs maintainer design input.

- [Issue #5190 — Windows MIME type bug](https://github.com/HKUDS/nanobot/issues/5190)  
  The bug remains open, and fix [PR #5191](https://github.com/HKUDS/nanobot/pull/5191) is waiting for review. This blocks Windows developers from using the WebUI.

- [PR #5184 — Quick Chat / Temporary Chat](https://github.com/HKUDS/nanobot/pull/5184)  
  Large WebUI feature PR, open with no public comments. Needs maintainer attention or reviewer feedback.

- [PR #5197 — DeepSeek Responses API support](https://github.com/HKUDS/nanobot/pull/5197)  
  p1 provider feature opened July 31; should be prioritized for review alongside the p1 bug-fix PRs.

- [PR #5200 and PR #5201](https://github.com/HKUDS/nanobot/pull/5200)  
  Both are p1 bug fixes for core session/exec reliability and should be merged promptly to avoid compounding issues.

- [PR #4223 — old Weixin reload fix](https://github.com/HKUDS/nanobot/pull/4223)  
  This PR stayed open for almost two months before being closed today. Its closure reduces long-lived PR noise, but similar stale PRs should be watched in the future.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-08-01

## 1. Today's Overview
ZeroClaw saw sustained high activity in the last 24 hours: 50 issues were updated (45 open/active, 5 closed) and 50 PRs were updated (40 open, 10 merged/closed). No new release was published. The project remains in a heavy design-and-RFC phase, with the most active discussions centered on memory architecture, security posture, plugin/Wasm strategy, and observability. A large portion of open work is pending maintainer review, which continues to be a visible bottleneck.

## 2. Releases
No new releases were published in this window. This section is intentionally omitted.

## 3. Project Progress
The aggregate data indicates 10 PRs were merged or closed in the last 24 hours, but the top-comment PR list is dominated by open, in-review work, so specific merged PR titles are not available in this digest. Notable open PRs advancing important areas include:

- **Provider/runtime fixes**: [PR #9606](https://github.com/zeroclaw-labs/zeroclaw/pull/9606) honors runtime proxy for OpenAI Responses; [PR #9603](https://github.com/zeroclaw-labs/zeroclaw/pull/9603) preserves Ollama dev template contracts.
- **Gateway/security fixes**: [PR #9604](https://github.com/zeroclaw-labs/zeroclaw/pull/9604) enforces Linq webhook alias ownership; [PR #8918](https://github.com/zeroclaw-labs/zeroclaw/pull/8918) redacts Slack tokens in the leak detector.
- **Install/config UX**: [PR #9605](https://github.com/zeroclaw-labs/zeroclaw/pull/9605) collects required webhook settings in Quickstart; [PR #9267](https://github.com/zeroclaw-labs/zeroclaw/pull/9267) generates canonical installation docs.
- **Memory stack**: The Hindsight memory PR series ([#9063](https://github.com/zeroclaw-labs/zeroclaw/pull/9063), [#9064](https://github.com/zeroclaw-labs/zeroclaw/pull/9064), [#9065](https://github.com/zeroclaw-labs/zeroclaw/pull/9065), [#9067](https://github.com/zeroclaw-labs/zeroclaw/pull/9067), [#9068](https://github.com/zeroclaw-labs/zeroclaw/pull/9068), [#9069](https://github.com/zeroclaw-labs/zeroclaw/pull/9069)) remains open with multiple `needs-author-action` flags.
- **CI expansion**: [PR #9398](https://github.com/zeroclaw-labs/zeroclaw/pull/9398) adds advisory macOS and Windows test jobs.

## 4. Community Hot Topics
The most-discussed issues reveal three underlying themes: memory architecture, security controls, and inter-agent/interop capabilities.

- [Issue #9048 — RFC: Separate conversation history from agent-curated long-term memory](https://github.com/zeroclaw-labs/zeroclaw/issues/9048) — 14 comments. Strongest signal that session history and durable memory are still conflated in implementation paths.
- [Issue #9127 — RFC: Abstract a `KeySource` trait](https://github.com/zeroclaw-labs/zeroclaw/issues/9127) — 11 comments. Debate over how master-key material should be classified and sourced across deployment forms.
- [Issue #7155 — RFC: Per-execution confirmation tier for high-risk shell commands](https://github.com/zeroclaw-labs/zeroclaw/issues/7155) — 9 comments, P1. Users want a middle ground between blanket shell approval and full blocking.
- [Issue #8933 — RFC: Cross-turn conversation correlation for OTel](https://github.com/zeroclaw-labs/zeroclaw/issues/8933) — 9 comments. Observability export needs conversation-level IDs.
- [Issue #9106 — RFC: A2A outbound client (`A2ATool`)](https://github.com/zeroclaw-labs/zeroclaw/issues/9106) — 8 comments. Users want agents to proactively call external A2A-compliant agents.
- [Issue #6850 — RFC: Decouple memory lifecycle policy from storage backends](https://github.com/zeroclaw-labs/zeroclaw/issues/6850) — 7 comments. Repeated architectural concern around where memory consolidation/govnernance should live.
- [Issue #6909 — RFC: Computer-use support for desktop interaction](https://github.com/zeroclaw-labs/zeroclaw/issues/6909) — 7 comments. Demand for secure desktop control via screen/accessibility/input.

## 5. Bugs & Stability
Closed and open bug reports in this window, ranked roughly by severity:

- **[Issue #8973 — Landlock blocks shell access to `/dev/null` on Fedora](https://github.com/zeroclaw-labs/zeroclaw/issues/8973)** — High risk, P1, S2 degraded behavior. Shell tool fails whenever Landlock sandbox is enabled. Closed, but no associated fix PR was visible in the top list.
- **[Issue #6724 — Enabled Signal/Voice Call channel with empty credentials can crashloop supervisor](https://github.com/zeroclaw-labs/zeroclaw/issues/6724)** — High risk, P3, crashloop every ~2 seconds. Closed.
- **[PR #9606 — Fix: honor runtime proxy for OpenAI Responses](https://github.com/zeroclaw-labs/zeroclaw/pull/9606)** — High-risk bug fix for proxy configuration being silently ignored in the OpenAI Responses path.
- **[PR #9604 — Fix: enforce Linq webhook alias ownership](https://github.com/zeroclaw-labs/zeroclaw/pull/9604)** — High-risk gateway/security fix preventing unowned or disabled aliases from falling through to the wrong agent.
- **[PR #8918 — Fix: redact Slack tokens in leak detector](https://github.com/zeroclaw-labs/zeroclaw/pull/8918)** — High-risk security fix; maintainer repaired the branch after author-action deadline.
- **[PR #9449 — Fix: preserve JSONL rows during schema migration](https://github.com/zeroclaw-labs/zeroclaw/pull/9449)** — Medium/high risk log migration bug.
- **[PR #9037 — Fix: strip trailing provider terminal markers from streamed assistant text](https://github.com/zeroclaw-labs/zeroclaw/pull/9037)** — Addresses leaked `<eom>` markers into transcripts and history.
- **[PR #7960 — Fix: gate `execute_pipeline` sub-tool execution with per-agent `ToolAccessPolicy`](https://github.com/zeroclaw-labs/zeroclaw/pull/7960)** — High-risk policy-bypass bug where denied tools could still be invoked as pipeline steps.

Most bug fixes have open PRs attached, though several are blocked on `needs-author-action` or maintainer review.

## 6. Feature Requests & Roadmap Signals
The roadmap is heavily shaped by RFCs and large stacked PRs. Strong next-version candidates include:

- **OpenAI-compatible chat completions**: [Issue #8550](https://github.com/zeroclaw-labs/zeroclaw/issues/8550) already has a large in-progress implementation, [PR #8486](https://github.com/zeroclaw-labs/zeroclaw/pull/8486). This would unlock Open WebUI, LobeChat, LangChain, Aider, and OpenAI SDK clients.
- **Memory architecture decisions**: [Issue #9048](https://github.com/zeroclaw-labs/zeroclaw/issues/9048) and [Issue #6850](https://github.com/zeroclaw-labs/zeroclaw/issues/6850) are core design debates that will shape the Hindsight memory stack PRs.
- **Security hardening**: [Issue #9127](https://github.com/zeroclaw-labs/zeroclaw/issues/9127) (`KeySource`), [Issue #7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155) (shell policy tiers), and [Issue #6971](https://github.com/zeroclaw-labs/zeroclaw/issues/6971) (security UX/runtime boundaries) are all still awaiting maintainer decisions.
- **Plugin ecosystem**: [Issue #6489](https://github.com/zeroclaw-labs/zeroclaw/issues/6489) (“Everything is a plugin”), [Issue #8135](https://github.com/zeroclaw-labs/zeroclaw/issues/8135) (Wasm-first runtime), and [Issue #7822](https://github.com/zeroclaw-labs/zeroclaw/issues/7822) (Wasm hook subscriptions) point to a major plugin-architecture push.
- **Agent capability expansion**: [Issue #8303](https://github.com/zeroclaw-labs/zeroclaw/issues/8303) (goal mode), [Issue #6909](https://github.com/zeroclaw-labs/zeroclaw/issues/6909) (computer use), and [Issue #9106](https://github.com/zeroclaw-labs/zeroclaw/issues/9106) (A2A outbound) are popular but less mature.

The OpenAI endpoint is most likely to land soon because it already has an implementation PR. Most RFCs remain in `needs-maintainer-review`, so no firm next-release commitment can be inferred.

## 7. User Feedback Summary
Users and contributors are consistently asking for:

- **Finer-grained control**: Shell tools need an explicit allow/ask/deny policy rather than all-or-nothing approval ([#7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155)).
- **Cleaner memory semantics**: Conversation history and curated long-term memory should not be mixed in the same backend path ([#9048](https://github.com/zeroclaw-labs/zeroclaw/issues/9048), [#6850](https://github.com/zeroclaw-labs/zeroclaw/issues/6850)).
- **Interoperability**: Users want OpenAI-compatible endpoints ([#8550](https://github.com/zeroclaw-labs/zeroclaw/issues/8550)) and A2A outbound collaboration ([#9106](https://github.com/zeroclaw-labs/zeroclaw/issues/9106)).
- **Less manual config friction**: Empty channel credentials crashloop the supervisor ([#6724](https://github.com/zeroclaw-labs/zeroclaw/issues/6724)), webhook setup misses required settings ([PR #9605](https://github.com/zeroclaw-labs/zeroclaw/pull/9605)), and model capability/context config is inconsistent ([#7100](https://github.com/zeroclaw-labs/zeroclaw/issues/7100)).
- **Better coding-agent support**: LSP integration ([#5907](https://github.com/zeroclaw-labs/zeroclaw/issues/5907)) and AI-assisted PR review ([#9330](https://github.com/zeroclaw-labs/zeroclaw/issues/9330)) show growing interest in agent-assisted development workflows.

No explicit satisfaction/dissatisfaction data was available; the overall tone of the issue tracker is constructive and architecture-focused.

## 8. Backlog Watch
These issues are either old, high-priority, or `needs-maintainer-review` and have not received a maintainer decision:

- [Issue #6489 — “Everything is a plugin” unified catalog tracker](https://github.com/zeroclaw-labs/zeroclaw/issues/6489) — Created May 6, still open.
- [Issue #6850 — Decouple memory lifecycle policy from storage backends](https://github.com/zeroclaw-labs/zeroclaw/issues/6850) — Created May 22, updated Aug 1, needs maintainer review.
- [Issue #5907 — Opt-in LSP support for ZeroCode](https://github.com/zeroclaw-labs/zeroclaw/issues/5907) — Created Apr 19, 5 comments, needs author action.
- [Issue #6909 — Computer-use support for desktop screen interaction](https://github.com/zeroclaw-labs/zeroclaw/issues/6909) — Created May 25, needs maintainer review.
- [Issue #6971 — Security UX, runtime credential boundaries, and isolation defaults](https://github.com/zeroclaw-labs/zeroclaw/issues/6971) — Created May 27, needs maintainer review.
- [Issue #6996 — Granular sandbox policy: filesystem and network](https://github.com/zeroclaw-labs/zeroclaw/issues/6996) — Created May 28, needs maintainer review.
- [Issue #7100 — Per-model capability and context-window config](https://github.com/zeroclaw-labs/zeroclaw/issues/7100) — P1, created Jun 2, needs maintainer review.
- [Issue #7155 — Per-execution shell confirmation tier](https://github.com/zeroclaw-labs/zeroclaw/issues/7155) — P1, created Jun 3, needs maintainer review.
- [Issue #7897 — Apply security policy/config updates without full daemon reload](https://github.com/zeroclaw-labs/zeroclaw/issues/7897) — Created Jun 17, needs maintainer review.
- [Issue #8135 — Wasm-first plugin runtime](https://github.com/zeroclaw-labs/zeroclaw/issues/8135) — Created Jun 22, needs maintainer review.
- [Issue #8187 — Capability-gated WASI hardware host functions](https://github.com/zeroclaw-labs/zeroclaw/issues/8187) — Created Jun 22, needs maintainer review.

The maintainer decision queue tracker ([#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)) remains open and active, reinforcing that RFC review capacity is currently the project’s main gating factor.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw Project Digest — 2026-08-01

## 1. Today's Overview
PicoClaw is in a **low-activity but not idle** state: 2 issues and 3 pull requests were updated in the last 24 hours, all still open. No new releases were published and no PRs were merged or closed during this period. The project continues to see active community-driven feature development, especially around additional chat channels and model configuration. Maintenance attention appears to be concentrated on existing long-running PRs rather than new throughput. Overall, the project is healthy but currently waiting on maintainer reviews and merge decisions.

## 2. Releases
No new releases were published on 2026-08-01. There are no changelog entries, breaking changes, or migration notes to report.

## 3. Project Progress
No PRs were merged or closed in the last 24 hours. However, several open PRs received updates, indicating ongoing development:

- **#3222 – refactor(deltachat): cleanup implementation, documentation -200LOC**  
  [https://github.com/sipeed/picoclaw/pull/3222](https://github.com/sipeed/picoclaw/pull/3222)  
  Continues to be refined; aims to clean up Delta Chat support, remove legacy features, and improve documentation.

- **#3193 – Added simplex channel type**  
  [https://github.com/sipeed/picoclaw/pull/3193](https://github.com/sipeed/picoclaw/pull/3193)  
  New feature PR, still open. It would add Simplex as a supported channel.

- **#3200 – feat(models): add configurable default fallback chain**  
  [https://github.com/sipeed/picoclaw/pull/3200](https://github.com/sipeed/picoclaw/pull/3200)  
  Adds a user-configurable model fallback chain in the web UI, persisted via the backend API.

No feature was finalized today, but these three PRs are strong candidates for future merges.

## 4. Community Hot Topics
The most active issue by comment count is:

- **#3287 – [Feature] Better support long messages in IRC**  
  Author: superuser-does | Created: 2026-07-22 | Updated: 2026-07-31 | Comments: 2  
  [https://github.com/sipeed/picoclaw/issues/3287](https://github.com/sipeed/picoclaw/issues/3287)  
  Users want IRCv3 long messages to be treated as a single cohesive message rather than split at the 512-byte boundary. This reflects a real usability gap for IRC integrations.

Also active:

- **#3292 – [BUG] CPU usage too high when focus on input box in chat interface**  
  Author: Acdfmwaopuio | Created: 2026-07-24 | Updated: 2026-07-31 | Comments: 1  
  [https://github.com/sipeed/picoclaw/issues/3292](https://github.com/sipeed/picoclaw/issues/3292)  
  A bilingual bug report describing high CPU usage when the input box is selected in Firefox. It has a stale label, but was updated recently.

## 5. Bugs & Stability
One bug was active in the last 24 hours:

- **#3292 – CPU usage too high when focus on input box**  
  Severity: **Medium** — user-facing performance issue, not a crash or data loss.  
  The issue is still open with no linked fix PR. The presence of a `[stale]` label is concerning: this may need maintainer attention to avoid being closed automatically despite recent user reports.

No crashes, regressions, or security-related bugs were reported in the current window.

## 6. Feature Requests & Roadmap Signals
The following feature-related signals may shape the next PicoClaw milestone:

- **IRCv3 long message handling** – Issue #3287 requests better handling of messages over 512 bytes, with newlines treated as continuations of a single message. This is a clear roadmap candidate for IRC channel improvements.
- **Simplex channel support** – PR #3193 adds a new channel type, indicating community demand for more messaging networks beyond IRC/Delta Chat.
- **Configurable model fallback chain** – PR #3200 would improve the web UI model management, suggesting the maintainers are working on a more flexible AI provider configuration.
- **Delta Chat cleanup and documentation** – PR #3222 points to consolidation work on existing integrations rather than new features.

If maintainer bandwidth allows, **Simplex support** and **model fallback chains** are the most likely features to land in a future release. The IRC long-message feature will likely follow after those larger PRs are merged.

## 7. User Feedback Summary
- **IRC users** are clearly frustrated by long-message truncation/splitting. The underlying need is to preserve message integrity when interacting with IRCv3 clients.
- **Web UI users** report performance problems: focusing the input box causes excessive CPU usage, which is a noticeable UX regression, especially in Firefox.
- **Developers** are actively contributing functionality (Simplex, fallback chains), which signals strong community investment and interest in PicoClaw as a multi-channel personal AI assistant.

No explicit satisfaction/dissatisfaction ratings were recorded, but the issues themselves indicate two concrete pain points: chat protocol compatibility and UI efficiency.

## 8. Backlog Watch
Several important PRs/issues need maintainer attention:

- **#3193 – Added simplex channel type** (opened 2026-06-27)  
  [https://github.com/sipeed/picoclaw/pull/3193](https://github.com/sipeed/picoclaw/pull/3193)  
  Open for over a month with no visible maintainer review comments. Needs review or explicit next steps.

- **#3222 – refactor(deltachat): cleanup implementation, documentation** (opened 2026-07-03)  
  [https://github.com/sipeed/picoclaw/pull/3222](https://github.com/sipeed/picoclaw/pull/3222)  
  A large refactor (-200 LOC) still awaiting merge/review.

- **#3200 – feat(models): add configurable default fallback chain** (opened 2026-07-01)  
  [https://github.com/sipeed/picoclaw/pull/3200](https://github.com/sipeed/picoclaw/pull/3200)  
  Useful quality-of-life feature, but has not yet received maintainer feedback.

- **#3292 – CPU usage too high when input focused** (label: stale)  
  [https://github.com/sipeed/picoclaw/issues/3292](https://github.com/sipeed/picoclaw/issues/3292)  
  The stale label may put this existing bug at risk of being ignored. It should be re-triaged or assigned.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

## NanoClaw Project Digest — 2026-08-01

### 1. Today’s Overview
NanoClaw showed moderate-high activity over the last 24 hours: 8 issues and 10 PRs were updated, 4 PRs were closed/merged, and no new releases were published. The community is actively pushing for more flexible deployment options beyond Docker, including Kubernetes, Apple Container, and host-direct execution. Security hardening also remains a key theme, with a new high-priority Telegram pairing bug and an existing interactive-card spoofing issue still open. Overall project health is solid, but several long-running deployment and Apple Container branch-sync issues need maintainer follow-up.

### 2. Releases
No new releases in the last 24 hours.

### 3. Project Progress
Four PRs were closed/merged in this period:

- [#3165 Codex/copilot changes](https://nanocoai/nanoclaw/pull/3165) — closed/merged.
- [#3163 fix(release): restore the v2.1.54 release path](https://nanocoai/nanoclaw/pull/3163) — release pipeline fix, closed/merged.
- [#1678 docs(skills): update voice transcription skills for Telegram + Linux](https://nanocoai/nanoclaw/pull/1678) — documentation improvement, closed/merged.
- [#3076 feat(imessage): unified local+hosted adapter targeting spectrum-ts v11](https://nanocoai/nanoclaw/pull/3076) — iMessage adapter feature, closed/merged.

No major new feature PRs were merged today; the period’s closed work was primarily release-path repair, docs updates, and the iMessage adapter consolidation.

### 4. Community Hot Topics
- [#1184 Challenges deploying nanoclaw in restricted K8s environments (Sealos)](https://nanocoai/nanoclaw/issues/1184) — 3 comments, 1 👍. User praises NanoClaw’s minimalist, lightweight approach but needs production deployment on restricted Kubernetes/Sealos.
- [#1732 feat: native runner mode — bypass Docker for host-tool access](https://nanocoai/nanoclaw/issues/1732) — 3 comments. Requests direct host integration for tmux, headed browsers, and macOS APIs, which Docker isolation currently blocks.
- [#1225 Run it without docker](https://nanocoai/nanoclaw/issues/1225) — 2 comments. Simple but popular request: support no-Docker usage on Windows and Linux.
- [#2354 feat: Kubernetes container runtime for agent spawning](https://nanocoai/nanoclaw/issues/2354) — 1 comment, 1 👍. Proposes spawning agent containers as Kubernetes pods instead of local Docker.

**Underlying need:** users want container/deployment flexibility beyond local Docker, including K8s, native host execution, and Apple Container environments.

### 5. Bugs & Stability
Ranked by severity:

- **High — [#3162 Telegram pairing is silently broken for the whole process lifetime if boot-time getMe fails](https://nanocoai/nanoclaw/issues/3162)** — newly reported, no fix PR yet. A single failed HTTP call at boot can permanently block pairing codes with no user-facing error.
- **Security — [#2923 ask_user_question card can be defaced by a forged click before origin authz](https://nanocoai/nanoclaw/issues/2923)** — display/integrity spoofing issue; a fix PR [#2651](https://nanocoai/nanoclaw/pull/2651) is open but not merged.
- **High-impact / Apple Container — [#2588 skill/apple-container branch is substantially out of sync with mainline](https://nanocoai/nanoclaw/issues/2588)** — documented `/convert-to-apple-container` skill fails immediately against current main.
- **Medium / Apple Container — [#2589 host.docker.internal in OneCLI proxy URL doesn’t resolve from inside the microVM](https://nanocoai/nanoclaw/issues/2589)** — Apple Container lacks `--add-host` support, breaking agent-container networking.
- **Security / logging — [#3161 fix: redact secrets from host structured logs](https://nanocoai/nanoclaw/pull/3161)** — open PR addressing verbatim credential serialization into `nanoclaw.log`; not yet merged.

### 6. Feature Requests & Roadmap Signals
Strong roadmap signals around container-runtime abstraction and new channel integrations:

- [#1732 Native runner mode](https://nanocoai/nanoclaw/issues/1732) — host-tool access without Docker.
- [#2354 Kubernetes container runtime](https://nanocoai/nanoclaw/issues/2354) — per-session agent pods on user-provided clusters.
- [#1225 Run without Docker](https://nanocoai/nanoclaw/issues/1225) — broader platform support.
- [#2809 Apple Container runtime + remote OneCLI gateway](https://nanocoai/nanoclaw/pull/2809) — open PR for macOS Apple Container support.
- [#3041 Dial channel adapter (SMS + AI voice calls)](https://nanocoai/nanoclaw/pull/3041) — open feature PR.
- [#3164 Hosted iMessage (Photon) with working registration flow](https://nanocoai/nanoclaw/pull/3164) — open feature PR superseding #2999.

**Prediction:** the next release will likely include container-runtime abstraction improvements (Apple Container, possibly Kubernetes) and at least one new channel adapter, while security fixes such as log redaction and origin validation remain strong merge candidates.

### 7. User Feedback Summary
- **Positive:** [#1184](https://nanocoai/nanoclaw/issues/1184) explicitly praises NanoClaw as a lightweight, secure alternative to “bloated agent frameworks” and calls the existing code-agent approach “brilliant.”
- **Pain point — Docker requirement:** users on Windows/Linux without Docker ([#1225](https://nanocoai/nanoclaw/issues/1225)) and host-integration use-cases like tmux/headed browsers/macOS APIs ([#1732](https://nanocoai/nanoclaw/issues/1732)) feel blocked by the current Docker-only runtime.
- **Apple Container friction:** users attempting the Apple Container conversion report broken branches and unresolved networking ([#2588](https://nanocoai/nanoclaw/issues/2588), [#2589](https://nanocoai/nanoclaw/issues/2589)).
- **Trust concerns:** silent Telegram pairing failure ([#3162](https://nanocoai/nanoclaw/issues/3162)) and interactive-card display spoofing ([#2923](https://nanocoai/nanoclaw/issues/2923)) are both security-relevant issues that could undermine user confidence if not fixed promptly.

### 8. Backlog Watch
Items that may need maintainer attention due to age, importance, or lack of clear resolution:

- [#1184 K8s/Sealos deployment challenge](https://nanocoai/nanoclaw/issues/1184) — open since March 17, 3 comments, 1 👍; no merged solution.
- [#1225 Run without Docker](https://nanocoai/nanoclaw/issues/1225) — open since March 18, simple request with no apparent fix.
- [#1732 Native runner mode](https://nanocoai/nanoclaw/issues/1732) — open since April 10, growing use-case pressure.
- [#2354 Kubernetes container runtime](https://nanocoai/nanoclaw/issues/2354) — open since May 8, 1 👍; directly connected to #1184.
- [#2588 Apple Container branch out of sync](https://nanocoai/nanoclaw/issues/2588) / [#2589 host.docker.internal not resolved](https://nanocoai/nanoclaw/issues/2589) — open since May 22, both block Apple Container users.
- [#2923 ask_user_question spoofing with open fix PR #2651](https://nanocoai/nanoclaw/issues/2923) — security issue open since July 4; the associated hardening PR has been open since May 30.

These items represent the clearest gaps between community expectations and the current Docker-centric, mainline-only release experience.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw Project Digest — 2026-08-01

## 1. Today's Overview

Activity over the last 24 hours was minimal: zero issues were updated (open or closed), and only one pull request, [#981](https://github.com/nullclaw/nullclaw/pull/981), received updates. No new releases were published. The single piece of movement is an open community PR adding a `grok-cli` provider for xAI's Grok CLI, which continues a clear pattern of expanding backend support alongside existing `codex-cli`, `gemini-cli`, and `claude-cli` providers. With no merged PRs and no bug reports, the project appears to be in a quiet but stable maintenance phase. Overall health looks good: no regressions surfaced, and contribution flow—while light today—is active at the feature level.

## 2. Releases

No new releases were published on 2026-08-01. There are no changelog entries, breaking changes, or migration notes to report.

## 3. Project Progress

No PRs were merged or closed in the last 24 hours, so no features or fixes landed today. The notable in-flight item is:

- **[#981 [OPEN] feat(provider): add grok-cli provider for xAI Grok CLI](https://github.com/nullclaw/nullclaw/pull/981)** — authored by `valonmulolli`, created on 2026-07-29, last updated 2026-07-31. This adds an optional provider that delegates to a locally installed `grok` CLI using the same spawn-per-request architecture as the existing Codex, Gemini, and Claude CLI providers.

This PR indicates forward progress on provider diversity, even though it has not yet been reviewed or merged.

## 4. Community Hot Topics

With zero issues and only one PR active (and no comment/reaction data recorded), the only topic of note is **[PR #981](https://github.com/nullclaw/nullclaw/pull/981)**. Although it has no visible comments or reactions, its content speaks to an underlying demand: users want to plug xAI's Grok CLI into NullClaw as a first-class backend. The PR deliberately mirrors the established `codex-cli` / `gemini-cli` / `claude-cli` pattern, which suggests the community values consistency and low integration friction when adding new model providers.

## 5. Bugs & Stability

No bugs, crashes, or regressions were reported or updated in the last 24 hours. No fix PRs are pending. Stability metrics for this window are effectively a clean bill of health.

## 6. Feature Requests & Roadmap Signals

The strongest roadmap signal is **[PR #981](https://github.com/nullclaw/nullclaw/pull/981)**, a community-driven request to add Grok CLI support. Because it follows an already-established provider template, the integration cost is likely low, and it has a credible path to landing in the next minor release. Looking ahead, the repeated pattern of community-contributed CLI providers may prompt maintainers to consider generalized scaffolding or documentation for adding new CLI backends, which would accelerate this kind of contribution in the future.

## 7. User Feedback Summary

Direct user feedback in this window is sparse. The primary signal is the existence of PR #981, which reflects a real use case: users running the xAI `grok` CLI locally want NullClaw to interoperate with it as an optional backend. No complaints, bug reports, or negative feedback were recorded in the last 24 hours—satisfaction data is effectively neutral-to-positive, driven by active feature contribution rather than friction reports.

## 8. Backlog Watch

- **[PR #981 [OPEN] feat(provider): add grok-cli provider for xAI Grok CLI](https://github.com/nullclaw/nullclaw/pull/981)** — Open since 2026-07-29 and last updated 2026-07-31, this PR has gone roughly three days without visible maintainer engagement (no comments or reactions recorded). It is the only open PR in the current data set and warrants a maintainer review: either a merge, a request for changes, or explicit feedback on scope. Long waits on a well-structured, pattern-following contribution can discourage future community PRs, so this is the primary item to watch.

---

*Data sources: [github.com/nullclaw/nullclaw](https://github.com/nullclaw/nullclaw) — issues, PRs, and releases as of 2026-08-01.*

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-08-01

## 1. Today's Overview

IronClaw is in a **high-intensity engineering and stabilization phase**: 36 issues and 50 PRs were updated in the last 24 hours (7 issues closed, 29 PRs closed/merged), while **no new releases** were cut. The dominant theme is the “Wave 1” target-architecture refactor — extracting loop, extension, and product contracts into separate crates — alongside the first issues from a new pi-agent harness adoption program focused on prompt-cache stability and token accounting. The tracker also shows a meaningful backlog of **security/privacy P0/P1 bugs** around cross-user memory scoping, shared home directories, and Hosted-MCP metadata exposure. Overall, the project is moving fast, but user-facing bug triage and long-running PR review are becoming bottlenecks.

## 2. Releases

**No new releases published in this window.**

The only release-related signal is the still-open `chore: release` PR [#5598](https://github.com/nearai/ironclaw/pull/5598), which has been sitting open since 2026-07-03 and may be waiting on the current Wave 1 refactor to land.

## 3. Project Progress

The most significant closed/merged PRs in the last 24 hours:

- [#6967](https://github.com/nearai/ironclaw/pull/6967) — **WS1.1**: completed the turn vocabulary in `ironclaw_host_api` and retired the turns shims.
- [#6975](https://github.com/nearai/ironclaw/pull/6975) — **WS1.2**: extracted `ironclaw_loop_contracts` and flipped `ironclaw_agent_loop` onto it.
- [#6977](https://github.com/nearai/ironclaw/pull/6977) — **WS1.3**: extracted `ironclaw_extension_contracts` and closed dual import paths.
- [#6980](https://github.com/nearai/ironclaw/pull/6980) — **WS1.4**: extracted `ironclaw_product_contracts` and landed the adapter half it unblocks.
- [#6979](https://github.com/nearai/ironclaw/pull/6979) — reconciled target-architecture docs with the hosted MCP registration work.
- [#6930](https://github.com/nearai/ironclaw/pull/6930) — registered hosted MCP servers into tenant runtime, including auth detection and lifecycle integration.
- [#6908](https://github.com/nearai/ironclaw/pull/6908) — paginated the admin users list, fixing cursor handling and adding load/failure/retry states.
- [#4022](https://github.com/nearai/ironclaw/pull/4022) — fixed a regression where HTTP response errors were treated as run-aborting instead of recoverable tool errors.
- [#3942](https://github.com/nearai/ironclaw/pull/3942) — refactored `PilotAllowlist` into a serde-driven enum with caller-level error-branch tests.

Still open and advancing the same Wave 1 workstream:

- [#6981](https://github.com/nearai/ironclaw/pull/6981) — WS1.5: consolidate sealed evidence minting behind witness grants.
- [#6982](https://github.com/nearai/ironclaw/pull/6982) — WS1.6 + WS1.7: narrow `ironclaw_common` and shed the product→runner edge.
- [#6991](https://github.com/nearai/ironclaw/pull/6991) — adds the pi-agent harness deep-dive and IronClaw adoption plan.
- [#6992](https://github.com/nearai/ironclaw/pull/6992) — fixes locale-sensitive `comm` behavior in reborn crate discovery.

## 4. Community Hot Topics

Most discussed issues by comment count:

- [#6284](https://github.com/nearai/ironclaw/issues/6284) — **15 comments**: the “error-recoverability endgame” epic. The underlying need is agent self-healing: every mid-run error must be model-visible, actionable, and non-fatal.
- [#6963](https://github.com/nearai/ironclaw/issues/6963) — **5 comments**: tracking issue for eight path-keyed CI/dev gates that were not rewritten by #6946. Underlying concern: the flat `crates/ironclaw_*` tree shape is a fragile assumption after refactors.
- [#6524](https://github.com/nearai/ironclaw/issues/6524) — **4 comments**: epic for a hermetic capability and journey testing platform. Need: deterministic, machine-checkable coverage for every supported capability.
- [#6940](https://github.com/nearai/ironclaw/issues/6940) — **2 comments**: IronHub skill CTA returns 404 for every skill. Likely a broken user-facing link path with unclear ownership.
- [#6920](https://github.com/nearai/ironclaw/issues/6920) — **2 comments**: closed issue establishing target-architecture baselines, dependency cleanup, and exception ratchets.

The discussion pattern suggests the community/maintainers are focused on **reliability engineering** (error recovery, hermetic tests, CI survival) rather than only feature velocity.

## 5. Bugs & Stability

Ranked by severity:

1. [#6900](https://github.com/nearai/ironclaw/issues/6900) — **P0 security**: shared-channel default subject binding collapses all users into the operator’s memory namespace, causing a cross-user memory leak. No fix PR yet.
2. [#6778](https://github.com/nearai/ironclaw/issues/6778) — **Security/privacy**: Hosted-MCP tool catalogs are published per extension ID, not per installation, exposing metadata across users on multi-principal servers. No fix PR yet.
3. [#6866](https://github.com/nearai/ironclaw/issues/6866) — **Privacy**: all users share the same home directory and can see other users’ workspaces. No fix PR yet.
4. [#6974](https://github.com/nearai/ironclaw/issues/6974) — **Performance**: libSQL `thread_store_writes` shows p95 37–135s in tool-heavy stress cases after #6696. Related Postgres recovery work is in [#6973](https://github.com/nearai/ironclaw/pull/6973), but this libSQL pathology is still open.
5. [#6940](https://github.com/nearai/ironclaw/issues/6940) — IronHub skill CTA returns 404 across all skills.
6. [#6902](https://github.com/nearai/ironclaw/issues/6902) — Projects page displays fabricated metrics (`$0.00 spend`, `0 pending gates`, etc.) as real data. Fix PR [#6906](https://github.com/nearai/ironclaw/pull/6906) is open.
7. [#6972](https://github.com/nearai/ironclaw/issues/6972) — new-account email authentication not working after signup.
8. [#6978](https://github.com/nearai/ironclaw/issues/6978) — `reborn-tests.yml` `workflow_dispatch` runs structurally fail the Tests (Reborn) roll-up because `critical-mutation` is skipped but disallowed.
9. [#6947](https://github.com/nearai/ironclaw/issues/6947) — `classify-test-scope.sh` mis-buckets `ironclaw_product` as legacy-only due to a pre-existing glob bug.
10. [#6976](https://github.com/nearai/ironclaw/issues/6976) — Linux `service install` does not enable user lingering, breaking unattended/headless operation.
11. [#6989](https://github.com/nearai/ironclaw/issues/6989) — token accounting bug: `ModelWorkRequest::for_assistant` estimates input tokens from the content reference string length rather than the referenced content.

A separate **prompt-cache correctness cluster** was filed as part of the pi-harness adoption program: [#6984](https://github.com/nearai/ironclaw/issues/6984), [#6985](https://github.com/nearai/ironclaw/issues/6985), [#6986](https://github.com/nearai/ironclaw/issues/6986), [#6987](https://github.com/nearai/ironclaw/issues/6987), [#6990](https://github.com/nearai/ironclaw/issues/6990). These are P0/P1 cache-stability and compaction issues, not yet fixed.

## 6. Feature Requests & Roadmap Signals

Notable user-requested features and roadmap signals:

- [#6939](https://github.com/nearai/ironclaw/issues/6939) — migration tool to port legacy Hermes/Openclaw agent setup and memory into IronClaw.
- [#6983](https://github.com/nearai/ironclaw/issues/6983) — add `hub` as an alias for the `ironhub` CLI subcommand.
- [#6971](https://github.com/nearai/ironclaw/issues/6971) — clarify and standardize “Tools” vs “Extensions” terminology.
- [#6854](https://github.com/nearai/ironclaw/issues/6854) — replace “Reborn” branding with “Ironclaw 1.0” on the extensions page.
- [#6578](https://github.com/nearai/ironclaw/issues/6578) — epic for admin-managed agents as UserId subjects.
- [#6941](https://github.com/nearai/ironclaw/issues/6941) — epic for model-discoverable, model-usable, self-created skills that actually pay off.
- [#6991](https://github.com/nearai/ironclaw/pull/6991) and issues #6984–#6990 — pi-agent harness adoption, focused on prompt caching, compaction budgets, and token accounting.

**Likely next-version candidates:** the low-risk UX/consistency items — `hub` alias ([#6983](https://github.com/nearai/ironclaw/issues/6983)), terminology cleanup ([#6971](https://github.com/nearai/ironclaw/issues/6971)), and “Ironclaw 1.0” branding ([#6854](https://github.com/nearai/ironclaw/issues/6854)) — could ship in the next release. Larger items like the migration tool ([#6939](https://github.com/nearai/ironclaw/issues/6939)) and skills epic ([#6941](https://github.com/nearai/ironclaw/issues/6941)) are more likely to land after the 1.0 baseline.

## 7. User Feedback Summary

User-reported pain points in this window are mostly **functional breakages and privacy concerns**:

- [#6940](https://github.com/nearai/ironclaw/issues/6940) — IronHub skill CTA is broken for every skill (404).
- [#6972](https://github.com/nearai/ironclaw/issues/6972) — email authentication fails after creating a new account.
- [#6866](https://github.com/nearai/ironclaw/issues/6866) — all users see the same home directory and other users’ workspaces.
- [#6939](https://github.com/nearai/ironclaw/issues/6939) — switching from Hermes/Openclaw to IronClaw is costly because existing setup and memory cannot be migrated.
- [#6971](https://github.com/nearai/ironclaw/issues/6971) — users are confused about whether the product should standardize on “Tools” or “Extensions.”
- [#6854](https://github.com/nearai/ironclaw/issues/6854) — external-facing extension descriptions still use internal “Reborn” branding.

No positive or satisfaction-oriented feedback items were captured in this 24-hour slice.

## 8. Backlog Watch

Items that appear stuck or need maintainer attention:

- [#5598](https://github.com/nearai/ironclaw/pull/5598) — `chore: release` PR open since 2026-07-03. Whether it is waiting on the refactor or blocked on CI, it needs a merge/rebase or an explicit hold.
- [#5981](https://github.com/nearai/ironclaw/pull/5981) and [#5982](https://github.com/nearai/ironclaw/pull/5982) — queued-message steering and budget approval-as-blocked-gate PRs, open since 2026-07-11 and still not merged despite being ported to current `main`.
- [#6831](https://github.com/nearai/ironclaw/pull/6831) — standardized messaging framework with canonical contracts, open since 2026-07-28 and not yet merged.
- [#6778](https://github.com/nearai/ironclaw/issues/6778) — Hosted-MCP cross-user metadata exposure, filed 2026-07-28 with only one comment.
- [#6866](https://github.com/nearai/ironclaw/issues/6866) — shared home directory / workspace privacy issue, filed 2026-07-29 with zero comments.

The main project-health risk is **not velocity** — it is the combination of a long-open release PR, several security/privacy issues without fix PRs, and large feature PRs waiting in review.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI Project Digest — 2026-08-01

**Data source:** github.com/netease-youdao/LobsterAI | **Coverage:** last 24h (2026-07-31)

---

## 1. Today's Overview

LobsterAI showed moderate maintenance activity over the past 24 hours: 4 issues and 12 PRs were updated, with no new releases published. All 4 issues were closed (all stale-labelled), and 11 of 12 PRs were closed/merged, leaving exactly 1 open PR. The substantive engineering effort focused on OpenClaw runtime stability — fixing a DeepSeek prefix-cache hit-rate collapse (~100% → ~57%), preventing BTW tool-protocol leakage, and preparing a Release/2026.7.31 branch. The remaining activity was a large stale-item cleanup of April-era community contributions, which is a double-edged hygiene signal: backlog cleanliness improved, but several fully implemented community features were closed without merging, which may warrant a maintainer response.

## 2. Releases

No new releases were published in the last 24 hours. A release preparation PR ([#2416 "Release/2026.7.31"](https://github.com/netease-youdao/LobsterAI/pull/2416)) was closed, indicating a version cut is in flight but has not yet been tagged. No breaking changes or migration notes are available.

## 3. Project Progress

Notable merged/closed PRs today:

- **OpenClaw / prompt-cache stability**
  - [#2413 fix(openclaw): keep live prompt tool-result history byte-stable across turns](https://github.com/netease-youdao/LobsterAI/pull/2413) — stops live prompt projection from reapplying a fixed 4x aggregate char cap on every request, which was rewriting already-cached history and destroying DeepSeek cache hit rates.
  - [#2415 fix(openclaw): drop aggregate cap in live tool-result prompt projection](https://github.com/netease-youdao/LobsterAI/pull/2415) — companion fix passing `aggregateMaxCharsOverride=null` so unchanged history stays byte-stable.
- **OpenClaw / protocol hygiene**
  - [#2414 fix(cowork): prevent BTW tool protocol leakage](https://github.com/netease-youdao/LobsterAI/pull/2414) — sanitizes provider tool-call markup from side-chat results, returns stable guidance when a side question requires tools, and preserves error metadata through the OpenClaw gateway.
- **Renderer / UX**
  - [#2417 fix(sites): add copy success feedback](https://github.com/netease-youdao/LobsterAI/pull/2417) — reuses the conversation copy icon/interaction for site URLs and share codes.
  - [#1321 fix(settings): dismiss overlays when switching settings tabs (#1307)](https://github.com/netease-youdao/LobsterAI/pull/1321) — fixes cowork memory editor / model test modals remaining mounted as full-window overlays after tab switches.
- **Release engineering**
  - [#2416 Release/2026.7.31](https://github.com/netease-youdao/LobsterAI/pull/2416) — release branch preparation.
- **Closed as stale (not merged):** [#172 Antigravity OAuth integration](https://github.com/netease-youdao/LobsterAI/pull/172), [#1308 isolate home-screen input draft per agent](https://github.com/netease-youdao/LobsterAI/pull/1308), [#1315 sidebar drag-resize](https://github.com/netease-youdao/LobsterAI/pull/1315), [#1318 sidebar kbd shortcut hints](https://github.com/netease-youdao/LobsterAI/pull/1318), [#1320 session-list skeleton loading](https://github.com/netease-youdao/LobsterAI/pull/1320).

## 4. Community Hot Topics

No PRs accumulated new comments, and all issues carry the same comment count (2), so the "hottest" signal is a pattern rather than any single thread. Community contributor **MaoQianTu** filed three side-bar UX feature requests in early April and submitted complete, small-diff implementations for all three — and then saw both the issues and the PRs closed as stale on 2026-07-31:

- [#1314 Sidebar drag-to-resize](https://github.com/netease-youdao/LobsterAI/issues/1314) + [#1315 implementation](https://github.com/netease-youdao/LobsterAI/pull/1315)
- [#1317 Keyboard shortcut kbd hints on sidebar buttons](https://github.com/netease-youdao/LobsterAI/issues/1317) + [#1318 implementation](https://github.com/netease-youdao/LobsterAI/pull/1318)
- [#1319 Session-list skeleton loading state](https://github.com/netease-youdao/LobsterAI/issues/1319) + [#1320 implementation](https://github.com/netease-youdao/LobsterAI/pull/1320)

Underlying needs: users want a more customizable, informative, and polished sidebar (resizable 180–480px width, platform-aware shortcut hints for Ctrl+N/Ctrl+F discovery, and no "暂无历史记录" empty-state flash during app startup). MaoQianTu even wrote the code; the stale closure of both issue and PRs is a process flag worth investigating — either these changes were intentionally deferred/rejected or the stale bot mis-filed ready-to-merge work. Also closed stale: [#1311 Table rendering: raw tags on wrapped lines + hover-to-expand for truncated long text](https://github.com/netease-youdao/LobsterAI/issues/1311), a concrete rendering-quality complaint.

## 5. Bugs & Stability

Ranked by severity:

1. **High — DeepSeek long-session cache hit-rate collapse (~100% → ~57%)** — Live prompt projection reapplied a fixed aggregate char cap on every request, rewriting unchanged tool-result history as new results arrived and breaking prefix-cache stability. Fixed in [#2413](https://github.com/netease-youdao/LobsterAI/pull/2413) and [#2415](https://github.com/netease-youdao/LobsterAI/pull/2415).
2. **Medium — BTW tool protocol leakage** — Side-chat results could leak provider tool-call markup into the main conversation and mishandle tool-requiring side questions. Fixed in [#2414](https://github.com/netease-youdao/LobsterAI/pull/2414).
3. **Medium — Settings tab overlay lockout (#1307)** — Cowork memory editor / model connection-test modals stayed mounted as `absolute inset-0` overlays after switching settings tabs, making the UI appear read-only. Fixed in [#1321](https://github.com/netease-youdao/LobsterAI/pull/1321).
4. **Open — Cron yield descendant finalization** — After `sessions_yield`, child-agent completion events fail to drive the parent agent, and yielding-state steering can write completion events into an already-ended run. Fix exists in [#2234](https://github.com/netease-youdao/LobsterAI/pull/2234) but remains **open** — the only open PR, now 31 days old and stale-labelled.

## 6. Feature Requests & Roadmap Signals

User-requested features visible in this window (all currently closed-stale, meaning they are *not* confirmed for the next release):

- [Sidebar drag-to-resize (180–480px, col-resize handle) — #1314](https://github.com/netease-youdao/LobsterAI/issues/1314)
- [Sidebar keyboard shortcut kbd hints — #1317](https://github.com/netease-youdao/LobsterAI/issues/1317)
- [Session-list skeleton loading to distinguish "loading" from "empty" — #1319](https://github.com/netease-youdao/LobsterAI/issues/1319)
- [Table rendering: strip raw tags on wrapped cells; hover-to-expand truncated long text — #1311](https://github.com/netease-youdao/LobsterAI/issues/1311)
- [Per-agent home-screen input draft isolation — #1308 (PR)](https://github.com/netease-youdao/LobsterAI/pull/1308)
- [Antigravity OAuth integration + OpenAI-compatible proxy support — #172 (PR)](https://github.com/netease-youdao/LobsterAI/pull/172)

**Prediction:** With [#2416 Release/2026.7.31](https://github.com/netease-youdao/LobsterAI/pull/2416) in flight, the next tag will focus on OpenClaw stability (cache stability, BTW leakage). None of the UI features above are likely to ship in that release unless the stale closures are reversed and the PRs re-reviewed.

## 7. User Feedback Summary

- **Sidebar fixed at 240px is a friction point** — too wide on small screens, too narrow on large screens, and truncates long session titles with no way to widen (MaoQianTu, [#1314](https://github.com/netease-youdao/LobsterAI/issues/1314)).
- **Shortcuts are undiscoverable** — Ctrl+N / Ctrl+F exist but are invisible in the UI; users must open Settings to find them ([#1317](https://github.com/netease-youdao/LobsterAI/issues/1317)).
- **Startup flash confuses users** — the session list renders "暂无历史记录" before data arrives, making users think history is lost ([#1319](https://github.com/netease-youdao/LobsterAI/issues/1319)).
- **Table quality complaints** — wrapped cells display raw HTML tags; truncated long text has no hover tooltip ([#1311](https://github.com/netease-youdao/LobsterAI/issues/1311)).
- **Positive engagement signal** — community members are doing full implementation work, not just filing requests (MaoQianTu implemented 3 of their own requests; #1308 arrived with a fix). The stale-closing of these PRs without merge risks contributor discouragement.

## 8. Backlog Watch

- **[#2234 fix(openclaw): cron yield descendant finalization — OPEN, stale-labelled, 31 days](https://github.com/netease-youdao/LobsterAI/pull/2234)** — The only open PR. Fixes a complex, real bug (yield-continuation loops for cron parallel/serial child agents) and includes a 3-scenario test plan. Needs maintainer review or explicit stale-resolution.
- **[#172 feat(oauth): Antigravity OAuth integration — closed stale after ~5 months](https://github.com/netease-youdao/LobsterAI/pull/172)** — A large OAuth subsystem (main-process state machine, SQLite profile persistence, OpenAI-compatible proxy support) was never merged. If Antigravity support is still on the roadmap, this deserves revival or a documented rejection.
- **[#1315 / #1318 / #1320 — implemented community PRs closed stale](https://github.com/netease-youdao/LobsterAI/pull/1315)** — Three fully implemented, small-diff UI enhancements were closed without merge. Maintainers should explicitly triage: merge, reject with reason, or return to the author.
- **[#1307 settings overlay bug](https://github.com/netease-youdao/LobsterAI/issues/1307)** — Addressed by #1321, but the issue itself does not appear in the closed list yet; confirm closure if verified fixed.

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis Project Digest — 2026-08-01

## 1. Today's Overview

As of 2026-08-01, Moltis had a moderately active day: 2 issues and 6 pull requests were updated, with no new releases. The activity split between feature completion and security hardening, with merged/closed PRs for Nostr group chat support and Markdown copy/export. Four PRs remain open, three of which are security-focused fixes submitted by external contributors. Overall project health looks stable, though the volume of open security PRs suggests maintainer review bandwidth may be a bottleneck.

## 2. Releases

No new releases were published in this period.

## 3. Project Progress

Two PRs were closed/merged in the last 24 hours:

- **feat(nostr): add NIP-29 group chat support for Buzz channels** ([#1168](https://github.com/moltis-org/moltis/pull/1168)) — Adds NIP-29 group chat support for Buzz, Block’s open-source Nostr-based workspace. This significantly expands Moltis’s channel compatibility.
- **feat(web): add Markdown copy and session export** ([#1176](https://github.com/moltis-org/moltis/pull/1176)) — Adds Markdown preservation when copying assistant replies and a session-level “Save as Markdown” export action.

The closed enhancement issue **Add copy + export as Markdown** ([#1131](https://github.com/moltis-org/moltis/issues/1131)) aligns directly with the merged web export PR, indicating a user-requested feature has now landed.

## 4. Community Hot Topics

There were no issues or PRs with high comment counts in this window, but the most substantive activity is concentrated in security and capability PRs:

- **fix(channels): gate /sh and privileged tools behind a per-account operators list** ([#1170](https://github.com/moltis-org/moltis/pull/1170)) — Addresses a privilege-escalation concern by separating channel access from privileged operator rights. This is likely the most impactful open PR for deployments using multi-account channels.
- **fix(security): harden model and zip paths** ([#1180](https://github.com/moltis-org/moltis/pull/1180)) — Addresses arbitrary file write via malicious zip or HuggingFace repos, which is a critical security class.

Underlying community needs: stronger security guarantees for self-hosted deployments, safer model/artifact handling, and broader chat protocol support.

## 5. Bugs & Stability

- **Issue #1181: “[Bug]: Issue with GPT 5.6 Luna”** ([#1181](https://github.com/moltis-org/moltis/issues/1181)) — Open bug report, no comments yet. Severity is currently unknown due to limited context, but it is the only active bug issue updated today.
- **Security bug classes with fix PRs:** Two open PRs fix serious security issues that could lead to privilege escalation and arbitrary file write:
  - [#1170](https://github.com/moltis-org/moltis/pull/1170) restricts privileged tools and `/sh` to an explicit operators list.
  - [#1180](https://github.com/moltis-org/moltis/pull/1180) hardens zip extraction and model path validation to prevent overwriting trusted files and potential code execution.
  - [#1179](https://github.com/moltis-org/moltis/pull/1179) verifies node pairing signatures, preventing callers from supplying their own key or challenge.

These are not yet merged, so the underlying vulnerabilities should be treated as active until the fixes land.

## 6. Feature Requests & Roadmap Signals

- **Markdown copy/export** — Requested in [#1131](https://github.com/moltis-org/moltis/issues/1131), implemented in [#1176](https://github.com/moltis-org/moltis/pull/1176). Now likely available in the web UI.
- **Nostr NIP-29 group chat support** — Closed in [#1168](https://github.com/moltis-org/moltis/pull/1168). This points toward deeper Buzz/Nostr workspace integration in upcoming builds.
- **Zvec vector database memory backend** ([#1158](https://github.com/moltis-org/moltis/pull/1158)) — Still open and feature-gated behind the `zvec` Cargo feature. It may become an optional memory backend in a future release, but likely needs more review.

## 7. User Feedback Summary

- A user explicitly requested Markdown copy/export functionality ([#1131](https://github.com/moltis-org/moltis/issues/1131)); it has now been implemented and closed, which should be a positive signal for web UI users.
- A contributor stated they want to use Moltis but need security fixes merged first ([#1179](https://github.com/moltis-org/moltis/pull/1179)). This indicates community trust depends on quickly addressing security review gaps.
- The new GPT 5.6 Luna bug report ([#1181](https://github.com/moltis-org/moltis/issues/1181)) suggests some users are actively testing newer model integrations and may be encountering compatibility issues.

## 8. Backlog Watch

- **feat(memory): add zvec vector database memory backend** ([#1158](https://github.com/moltis-org/moltis/pull/1158)) — Open since 2026-07-17, with no visible maintainer comments in the data. This is a substantial experimental feature that may need maintainer attention.
- **fix(channels): gate /sh and privileged tools behind operators list** ([#1170](https://github.com/moltis-org/moltis/pull/1170)) — Open since 2026-07-26; security-relevant and should be prioritized for review.
- **fix(gateway): verify node pairing signatures** ([#1179](https://github.com/moltis-org/moltis/pull/1179)) and **fix(security): harden model and zip paths** ([#1180](https://github.com/moltis-org/moltis/pull/1180)) — Both opened 2026-07-31; they address serious security issues and should be reviewed and merged promptly.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw Project Digest — 2026-08-01

## 1. Today's Overview
CoPaw (QwenPaw) showed a high level of maintenance and community activity over the last 24 hours: 16 issues were updated (11 open/active, 5 closed) and 34 PRs were updated (24 open, 10 merged/closed). No new release was published; the project remains on QwenPaw 2.0.1 for desktop and server deployments. The most visible work is concentrated on stability: Windows `agent.json` corruption, AgentScope 2.0 compatibility breaks, shell-command hangs/UI freezes, and memory/compression data loss each have active or recently merged fix PRs. Community engagement is moderate, with the most active issue being a regression around Skill tags disappearing on restart (10 comments). Overall, the project is responsive but is currently absorbing a cluster of regression and compatibility reports, likely related to the AgentScope 2.0 migration.

## 2. Releases
No new releases were published on 2026-08-01.

## 3. Project Progress
A number of fixes and feature PRs advanced through review or were closed/merged in the last 24 hours. Visible closed PRs include:

- **#6573 — fix(audio): restore transcription for channel audio messages** — [PR #6573](https://github.com/agentscope-ai/QwenPaw/pull/6573)  
  Fixes Feishu audio messages silently failing transcription after the AgentScope 2.0 migration.
- **#6592 — fix(memory): flush Auto-Memory before Scroll context eviction** — [PR #6592](https://github.com/agentscope-ai/QwenPaw/pull/6592)  
  Addresses #6555, where Dream/daily memory generation missed early-session events after context compression.
- **#6606 — fix(read_file): accept numeric string line ranges** — [PR #6606](https://github.com/agentscope-ai/QwenPaw/pull/6606)  
  Small tool-schema compatibility fix for `read_file`.

Other notable PRs still open or under review:

- **#6609 — Fix spawn subagent schema** — [PR #6609](https://github.com/agentscope-ai/QwenPaw/pull/6609)  
  Fixes #6588 by making `batch` non-required in `spawn_subagent` schema.
- **#6610 — fix: shell command execution hangs and UI freezes** — [PR #6610](https://github.com/agentscope-ai/QwenPaw/pull/6610)  
  Targets #6608 and #6589 with timeout capping and subprocess cleanup.
- **#6615 — fix(agentscope): resolve compatibility and config loading issues** — [PR #6615](https://github.com/agentscope-ai/QwenPaw/pull/6615)  
  Fixes #6612, addressing `Msg` vs `UserMsg` API changes and tool-permission deadlocks.
- **#6528 — fix: resolve agent.json corruption** — [PR #6528](https://github.com/agentscope-ai/QwenPaw/pull/6528)  
  Fixes #6520 with BOM-safe JSON reading and write hardening.
- **#6611 — refactor(context): align Scroll and memory with AgentScope lifecycle** — [PR #6611](https://github.com/agentscope-ai/QwenPaw/pull/6611)  
  Consolidates Scroll as the sole context protocol and aligns memory lifecycle with AgentScope 2.0.
- **#6618 — fix(console): remove forced UTC timestamp normalization in session list** — [PR #6618](https://github.com/agentscope-ai/QwenPaw/pull/6618)  
  Fixes session timestamps displaying in UTC instead of local time.

Feature-oriented PRs also continue to move, including NVIDIA NIM provider support (#6526), a global-hotkey quick-input window (#6607), desktop workspace shortcut (#6306), and provider/metadata unification (#6302).

## 4. Community Hot Topics
Most active issues by comment count:

- **#6537 — Skill tags disappear on restart (regression of #3270)** — [Issue #6537](https://github.com/agentscope-ai/QwenPaw/issues/6537) — 10 comments  
  The highest-activity item. Users report that Skill tags saved via `PUT /skills/pool/{name}/tags` are lost during manifest reconciliation on startup or build. This is a regression, so community attention is high and maintainer confirmation is still pending.

- **#6601 — QwenPaw does not report empty-response errors** — [Issue #6601](https://github.com/agentscope-ai/QwenPaw/issues/6601) — 5 comments  
  Long sessions approach context limits, the model returns empty responses, and QwenPaw silently hangs. Users are asking for framework-level detection and explicit errors.

- **#6588 — `spawn_subagent` single-task mode is unusable because `batch` is exposed as required** — [Issue #6588](https://github.com/agentscope-ai/QwenPaw/issues/6588) — 4 comments  
  A schema-generation bug that makes foreground single subagents impossible. A fix PR (#6609) already exists.

- **#6520 — agent.json systematic corruption: BOM, missing quotes, double-encoding** — [Issue #6520](https://github.com/agentscope-ai/QwenPaw/issues/6520) — 3 comments  
  Critical Windows-specific corruption causing complete system failure. Fix PR #6528 is open.

- **#6589 — `execute_shell_command` large output freezes UI** — [Issue #6589](https://github.com/agentscope-ai/QwenPaw/issues/6589) — 3 comments  
  Frontend console tries to render tens of thousands of lines at once, blocking the UI thread.

- **#6512 — `execute_shell_command` large output truncation / suggestion for file or streaming** — [Issue #6512](https://github.com/agentscope-ai/QwenPaw/issues/6512) — 3 comments  
  Long outputs are silently truncated, sometimes triggering `Internal error`. Users want automatic file fallback or streaming.

Underlying needs: reliability of shell tooling, robust handling of Windows filesystem edge cases, long-context session resilience, and better transparency when the system fails silently.

## 5. Bugs & Stability
Ranked by severity:

| Severity | Issue | Description | Fix status |
|---|---|---|---|
| **Critical** | [#6520](https://github.com/agentscope-ai/QwenPaw/issues/6520) | `agent.json` systematic corruption: BOM, missing quotes, double-encoding; causes complete system failure on Windows. | PR #6528 open |
| **Critical** | [#6612](https://github.com/agentscope-ai/QwenPaw/issues/6612) | QwenPaw 2.0.1 incompatible with agentscope 2.0.4.post1: crashes in proactive subsystem and tool-permission deadlock. | PR #6615 open |
| **High** | [#6608](https://github.com/agentscope-ai/QwenPaw/issues/6608) | Long-running shell commands bypass timeout, block Feishu session for 1.5h, leave orphan subprocesses on cancel. | PR #6610 open |
| **High** | [#6589](https://github.com/agentscope-ai/QwenPaw/issues/6589) | `execute_shell_command` with very long stdout freezes the frontend UI completely. | PR #6610 open |
| **High** | [#6601](https://github.com/agentscope-ai/QwenPaw/issues/6601) | No empty-response error; long sessions lose all response ability near context limit. | No dedicated fix PR visible |
| **High** | [#6537](https://github.com/agentscope-ai/QwenPaw/issues/6537) | Skill tags disappear after restart — regression of #3270. | No fix PR visible |
| **Medium** | [#6588](https://github.com/agentscope-ai/QwenPaw/issues/6588) | `spawn_subagent` schema requires `batch`, making single-task mode unusable. | PR #6609 open |
| **Medium** | [#6555](https://github.com/agentscope-ai/QwenPaw/issues/6555) | Dream/memory compression misses early-session events before daily `memory/YYYY-MM-DD.md` generation. | PR #6592 closed; PR #6564 open |
| **Medium** | [#6558](https://github.com/agentscope-ai/QwenPaw/issues/6558) | Multiple chat session UI integrity issues: lost messages on switch, instruction drift, replies re-render from scratch. | No fix PR visible |
| **Medium** | [#6614](https://github.com/agentscope-ai/QwenPaw/issues/6614) | WeChat cron push silently never delivers: task reports success but WeChat returns `ret=-2` / `context_token` invalid. | No fix PR visible |
| **Low/Medium** | [#6529](https://github.com/agentscope-ai/QwenPaw/issues/6529) | ACP `new_session` response missing `models` field; clients cannot discover available models. | No fix PR visible |
| **Low** | [#6544](https://github.com/agentscope-ai/QwenPaw/issues/6544) | Feishu audio messages silently fail transcription in 2.x. | Fixed by PR #6573 (closed) |

## 6. Feature Requests & Roadmap Signals
Several feature signals are present in the issue/PR tracker:

- **Shell command output handling** — [#6512](https://github.com/agentscope-ai/QwenPaw/issues/6512) asks for truncation, auto-write-to-file, or streaming for large outputs. Combined with #6589/#6608, this is a clear reliability/UX pain point likely to be addressed next.
- **Desktop app polish** — [#6587](https://github.com/agentscope-ai/QwenPaw/issues/6587) requests renaming “QwenPaw Desktop” to “QwenPaw”; [#6260](https://github.com/agentscope-ai/QwenPaw/issues/6260) asks for collapsible thinking/tool-call sections so results are more prominent. PR #6607 adds a global-hotkey quick-input window, and PR #6306 adds a workspace shortcut to the sidebar.
- **Provider expansion** — [#6526](https://github.com/agentscope-ai/QwenPaw/pull/6526) adds NVIDIA NIM provider support; [#6302](https://github.com/agentscope-ai/QwenPaw/pull/6302) unifies provider discovery and model metadata.
- **AI review bot improvement** — [#6550](https://github.com/agentscope-ai/QwenPaw/pull/6550) enhances the CI review bot with per-file change maps and fewer false alarms.
- **Memory/context overhaul** — [#6611](https://github.com/agentscope-ai/QwenPaw/pull/6611) refactors Scroll/memory around AgentScope 2.0 lifecycle, which could become a foundation for more stable long-term memory.

Likely next-version candidates: shell command timeout/streaming/truncation fixes, AgentScope 2.0 compatibility corrections, memory flush-before-compression improvements, and desktop UX updates.

## 7. User Feedback Summary
User-reported pain points this week cluster into five areas:

1. **Silent failures** — WeChat cron jobs report `success` but never deliver (#6614); Feishu audio transcription fails silently (#6544); empty model responses are not surfaced (#6601). Users are frustrated by “green check” behavior that hides real failures.
2. **Windows stability** — `agent.json` corruption (#6520) and desktop UI layout issues (#6549) indicate Windows-specific hardening is still needed.
3. **Shell command reliability** — Hanging sessions, orphan subprocesses, UI freezes, and truncated output (#6608, #6589, #6512) affect users running real data-migration and report-generation workloads.
4. **Memory/data loss** — Users are upset that early-session work can be permanently lost from daily memory files after context compression (#6555).
5. **UI/UX quality** — Users want the agent’s final deliverables to be more prominent, with thinking and tool-call processes collapsible (#6260), and they find naming/desktop behavior odd (#6587).

There is minimal explicit positive feedback in the visible data, which is typical for a bug-dense window. The strongest satisfaction signal is that contributors are actively submitting first-time PRs, including multiple new-contributor fixes for critical issues.

## 8. Backlog Watch
Items that may need maintainer attention:

- **#6537 — Skill-tag regression with 10 comments and no linked fix** — [Issue #6537](https://github.com/agentscope-ai/QwenPaw/issues/6537)  
  High visibility, but no PR assigned yet.
- **#6260 — Result-presentation enhancement** — [Issue #6260](https://github.com/agentscope-ai/QwenPaw/issues/6260)  
  Open since 2026-07-19 with a 👍 reaction; a UX direction request that could influence roadmapping.
- **#6306 — Desktop workspace shortcut PR** — [PR #6306](https://github.com/agentscope-ai/QwenPaw/pull/6306)  
  Open since 2026-07-21, closes #6083; appears uncontroversial but has not been merged.
- **#6302 — Provider discovery/model metadata unification** — [PR #6302](https://github.com/agentscope-ai/QwenPaw/pull/6302)  
  Large architectural PR open since 2026-07-21; needs maintainer review given scope.
- **#6203 — Windows `tasklist` liveness probe: bound and hide** — [PR #6203](https://github.com/agentscope-ai/QwenPaw/pull/6203)  
  Open since 2026-07-16, labeled `first-time-contributor`, `Under Review`, `ready-for-human-review`; appears ready for a maintainer pass.
- **#6529 — ACP `new_session` missing `models` field** — [Issue #6529](https://github.com/agentscope-ai/QwenPaw/issues/6529)  
  Closed? The issue is marked CLOSED but no fix PR is visible in the top-20 list; maintainers should confirm resolution is truly released.

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