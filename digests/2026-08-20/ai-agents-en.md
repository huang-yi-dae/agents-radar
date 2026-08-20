# OpenClaw Ecosystem Digest 2026-08-20

> Issues: 307 | PRs: 500 | Projects covered: 13 | Generated: 2026-08-20 04:55 UTC

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

# OpenClaw Project Digest — 2026-08-20

## 1. Today's Overview

OpenClaw saw a very high level of activity over the last 24 hours: 307 issues were updated (254 open/active, 53 closed) and 500 PRs were touched (428 open, 72 merged/closed), with no new releases published. The project remains in a heavy stabilization phase, with two P0 gateway-startup regressions affecting 2026.7.x upgrades, a concentrated cluster of P1 message-delivery and session-state bugs, and an active wave of model-selection and auth-provider fix PRs. Maintainer review appears to be the main bottleneck: many P1 issues carry `needs-maintainer-review` or `needs-product-decision` labels with linked but unmerged fix PRs. No release shipped today, so the large volume of merged work is accumulating toward the next version.

## 2. Releases

No new releases were published in the last 24 hours.

## 3. Project Progress

72 PRs were merged or closed in the last 24 hours. Notable completed items visible in the top-traffic set:

- [PR #126531](https://github.com/openclaw/openclaw/pull/126531) — fix(models): preserve Codex selection for catalog-seeded models (closes #126525). Users who explicitly selected the Codex harness for an OpenAI model were silently running through the embedded harness.
- [PR #126492](https://github.com/openclaw/openclaw/pull/126492) — fix: preserve GPT-5.6 Max and Ultra through Codex (follow-up to #126182). Requested reasoning effort was being silently omitted or downgraded.
- [PR #116489](https://github.com/openclaw/openclaw/pull/116489) — feat(security): require acknowledgement for install policy warnings; `security.installPolicy` commands can now return `warn`, and interactive CLI installs require the exact target name to continue.
- [PR #120900](https://github.com/openclaw/openclaw/pull/120900) — feat(ui): review install policy warnings in the Control UI with an `acknowledgeInstallPolicyWarning: true` option.
- [PR #126303](https://github.com/openclaw/openclaw/pull/126303) — fix(ui): balance completed-work spacing in the Control UI (closes #126302).

Closed issues today include the orchestration refactor [Issue #104871](https://github.com/openclaw/openclaw/issues/104871), overflow-recovery user-message duplication [Issue #66443](https://github.com/openclaw/openclaw/issues/66443), session bloat from `skillsSnapshot`/`systemPromptReport` [Issue #45718](https://github.com/openclaw/openclaw/issues/45718), and the multi-agent `infer image generate` owner-selection failure [Issue #124926](https://github.com/openclaw/openclaw/issues/124926).

The open-PR pipeline is heavily focused on: model/harness selection correctness, gateway cold-start recovery, Android↔gateway RPC compatibility, Control UI refresh stability, memory index freshness, and subagent delivery accounting.

## 4. Community Hot Topics

- [Issue #48003](https://github.com/openclaw/openclaw/issues/48003) — **Steer mode does not inject messages mid-turn for main sessions** (P1, diamond lobster, 20 comments, 4 👍). `messages.queue.mode: "steer"` queues messages until the turn completes instead of injecting at tool boundaries. The most-discussed issue and a top pain point for interactive control.
- [Issue #38327](https://github.com/openclaw/openclaw/issues/38327) — **"Cannot convert undefined or null to object" with google-vertex/gemini-3.1-pro-preview on 2026.3.2** (P1, 14 comments, 3 👍). A long-running auth/model regression that still draws heavy engagement.
- [Issue #108435](https://github.com/openclaw/openclaw/issues/108435) — **Gateway fails to start after update to 2026.7.1** (P0, diamond lobster, 14 comments, 3 👍). Fails under systemd, ollama, and manual launch with "gateway did not start on 127.0...".
- [Issue #53628](https://github.com/openclaw/openclaw/issues/53628) — **`${XDG_CONFIG_HOME}` not processed when installing a skill** (P3, 14 comments). Docker-based users hit config-path indirection during clawhub skill installs.
- [Issue #113306](https://github.com/openclaw/openclaw/issues/113306) — **SQLite snapshot restore lacks end-to-end crash and identity guarantees** (P1, 13 comments). Restore can report success without durable parent-directory linking or final identity guards.
- [Issue #88657](https://github.com/openclaw/openclaw/issues/88657) — **DeepSeek V4 Flash incomplete turns (`payloads=0, tools=2, stopReason=stop`)** (P2, 11 comments). Regression between 2026.5.26 and 2026.5.27/28 via OpenRouter.

The underlying need across these threads is production reliability: users are running real gateways and are highly sensitive to upgrade regressions, silent message loss, and auth/model-path failures.

## 5. Bugs & Stability

Two P0 release-blocking regressions are open:

- [Issue #108435](https://github.com/openclaw/openclaw/issues/108435) — **Gateway crash-loop after upgrade to 2026.7.1**; fails under systemd, ollama, and manual launch (diamond lobster, `impact:crash-loop`, `impact:ux-release-blocker`).
- [Issue #112395](https://github.com/openclaw/openclaw/issues/112395) — **Startup migration preflight blocks gateway after 6.11 → 7.1 upgrade**; migration tables and leases are empty while the state DB appears healthy (P0, diamond lobster, `ux-release-blocker`).

High-severity P1 issues updated in the last 24h:

- [Issue #48003](https://github.com/openclaw/openclaw/issues/48003) — steer mode not injecting messages mid-turn (`impact:message-loss`).
- [Issue #113306](https://github.com/openclaw/openclaw/issues/113306) — SQLite snapshot restore identity/crash guarantees (`impact:data-loss`).
- [Issue #123799](https://github.com/openclaw/openclaw/issues/123799) — production operators need upgrade/backport guidance for the Codex compact 404 on 2026.5.12; related #123706 closed as already-implemented on main.
- [Issue #97680](https://github.com/openclaw/openclaw/issues/97680) — beta-tagged updates leave official external plugins on the `latest` dist-tag instead of the requested beta.
- [Issue #90944](https://github.com/openclaw/openclaw/issues/90944) — `sessions_yield` resume reply recorded but not delivered; users receive the child raw summary instead of the parent reply.
- [Issue #80498](https://github.com/openclaw/openclaw/issues/80498) — subagent completion announcements premature or duplicated after tool-use turns.
- [Issue #83598](https://github.com/openclaw/openclaw/issues/83598) — `anthropic:claude-cli` OAuth refresh still dead-ends the main lane in 2026.5.12 despite the #73682 fix.
- [Issue #77249](https://github.com/openclaw/openclaw/issues/77249) — Slack socket-mode reconnect supervisor hangs on zombie WSS with no event/log emitted.
- [Issue #119454](https://github.com/openclaw/openclaw/issues/119454) — stuck-session recovery self-suppresses (`action=observe_only reason=active_embedded_run`) and wedges the lane until restart.
- [Issue #124284](https://github.com/openclaw/openclaw/issues/124284) — subagent spawn fails with vLLM openai-completions + thinking since 2026.8.1-beta.2; the new `wrapStreamFnWithProviderPromptState` wrapper interferes with vLLM.

Active fix PRs for related stability issues: [PR #126523](https://github.com/openclaw/openclaw/pull/126523) (gateway cold restart stalls with restored subagent runs), [PR #126540](https://github.com/openclaw/openclaw/pull/126540) (Android app cannot send messages against 2026.7.1-2 gateway), [PR #126424](https://github.com/openclaw/openclaw/pull/126424) (keep conversation delivery within agent bindings), [PR #126535](https://github.com/openclaw/openclaw/pull/126535) (memory status ignores offline source drift), [PR #126497](https://github.com/openclaw/openclaw/pull/126497) (TUI stale running state after run completion), and [PR #126402](https://github.com/openclaw/openclaw/pull/126402) (Control UI config form corrupts 64-bit id strings).

## 6. Feature Requests & Roadmap Signals

Long-standing feature asks that continue to receive traffic:

- [Issue #16555](https://github.com/openclaw/openclaw/issues/16555) — TTL/expiry for delivery queue messages to prevent stale entries flooding channels on restart (P1, diamond lobster).
- [Issue #33975](https://github.com/openclaw/openclaw/issues/33975) — fallback approval mode + model attribution in messages (P2).
- [Issue #45501](https://github.com/openclaw/openclaw/issues/45501) — configurable `session.resetPrompt` startup message (P3).
- [Issue #9912](https://github.com/openclaw/openclaw/issues/9912) — `maxTurns`/`maxToolCalls` limit for agent iterations (P2).
- [Issue #7476](https://github.com/openclaw/openclaw/issues/7476) — WhatsApp sticker send support (P3).
- [Issue #10944](https://github.com/openclaw/openclaw/issues/10944) — configurable `parseMode` for Telegram (P3).
- [Issue #79168](https://github.com/openclaw/openclaw/issues/79168) — content-based prompt-injection scanning on tool output (P2, security).
- [Issue #42276](https://github.com/openclaw/openclaw/issues/42276) — line-overwrite reasoning stream display.
- [Issue #37842](https://github.com/openclaw/openclaw/issues/37842) — graph-aware loop detection for `sessions_send` (triangular/polygonal cascades bypass `maxPingPongTurns`).
- [Issue #95840](https://github.com/openclaw/openclaw/issues/95840) — `contextPruning mode: cache-ttl` never fires on OpenAI models because `isCacheTtlEligibleProvider` excludes OpenAI.

Features actively moving in PRs — likely candidates for the next release — include: generic QR-based plugin setup steps ([PR #119341](https://github.com/openclaw/openclaw/pull/119341) and [PR #118169](https://github.com/openclaw/openclaw/pull/118169) for Signal first-account linking), recovery of offline device placements ([PR #126284](https://github.com/openclaw/openclaw/pull/126284)), Browser Harness as the preferred model action engine ([PR #126255](https://github.com/openclaw/openclaw/pull/126255)), staged slash-command arguments in the Control UI composer ([PR #123356](https://github.com/openclaw/openclaw/pull/123356)), and a delivery-target option for `/v1/responses` callers so HTTP-driven subagent completions can be delivered ([PR #126501](https://github.com/openclaw/openclaw/pull/126501)).

## 7. User Feedback Summary

The dominant user sentiment is concern about upgrade reliability. Production operators report being blocked by the 2026.7.1 gateway startup failure ([#108435](https://github.com/openclaw/openclaw/issues/108435)) and the 6.11 → 7.1 migration preflight block ([#112395](https://github.com/openclaw/openclaw/issues/112395)); one operator explicitly requested operational backport guidance after a fix landed only on main ([#123799](https://github.com/openclaw/openclaw/issues/123799)). Model-path regressions continue to frustrate users: DeepSeek V4 Flash incomplete turns ([#88657](https://github.com/openclaw/openclaw/issues/88657)), Vertex/Gemini "undefined or null to object" ([#38327](https://github.com/openclaw/openclaw/issues/38327)), and vLLM subagent spawn breakage ([#124284](https://github.com/openclaw/openclaw/issues/124284)). Message-delivery complaints cluster around subagents and `sessions_yield` — users receiving the wrong output or no output at all ([#90944](https://github.com/openclaw/openclaw/issues/90944), [#80498](https://github.com/openclaw/openclaw/issues/80498)). A multi-agent fleet maintainer reported that `infer image generate` was unusable without an explicit agent selector ([#124926](https://github.com/openclaw/openclaw/issues/124926), closed today). On the positive side, the quick fixes for Codex selection and GPT-5.6 Max/Ultra reasoning effort ([#126531](https://github.com/openclaw/openclaw/pull/126531), [#126492](https://github.com/openclaw/openclaw/pull/126492)) and the security install-policy acknowledgement feature ([#116489](https://github.com/openclaw/openclaw/pull/116489), [#120900](https://github.com/openclaw/openclaw/pull/120900)) show responsive iteration on both correctness and admin safety.

## 8. Backlog Watch

Long-running issues and PRs that remain unanswered or stuck and need maintainer attention:

- [Issue #30381](https://github.com/openclaw/openclaw/issues/30381) — chatCompletions should ignore request `model` when `x-openclaw-agent-id` is present (P2, diamond lobster, open since 2026-03-01, `clawsweeper-recovery-stuck`).
- [Issue #16555](https://github.com/openclaw/openclaw/issues/16555) — delivery-queue TTL/expiry (P1, diamond lobster, open since 2026-02-14, `recovery-stuck`).
- [Issue #77249](https://github.com/openclaw/openclaw/issues/77249) — reconnect supervisor hangs on zombie WSS with no log event (P1, diamond lobster, open since 2026-05-04).
- [Issue #15022](https://github.com/openclaw/openclaw/issues/15022) — coalesce interleaved text blocks into a single outbound message (P2, diamond lobster, open since 2026-02-12).
- [Issue #37842](https://github.com/openclaw/openclaw/issues/37842) — graph-aware loop detection for `sessions_send` (P2, diamond lobster, open since 2026-03-06).
- [Issue #9607](https://github.com/openclaw/openclaw/issues/9607) — Himalaya skill doc gaps and incorrect command syntax (P3, platinum hermit, open since 2026-02-05).
- [Issue #7476](https://github.com/openclaw/openclaw/issues/7476) — WhatsApp sticker send support (P3, diamond lobster, open since 2026-02-02).

Stale or needs-proof PRs waiting for weeks to months:

- [PR #84758](https://github.com/openclaw/openclaw/pull/84758) — subagents execution-backend placement contract (open since 2026-05-21, `needs proof`).
- [PR #95847](https://github.com/openclaw/openclaw/pull/95847) — credit requester-consumed descendant subagent completions (open since 2026-06-22, `needs proof`).
- [PR #112326](https://github.com/openclaw/openclaw/pull/112326) — prevent reverse `sessions_send` on A2A target turns (open since 2026-07-21, `needs proof`).
- [PR #96011](https://github.com/openclaw/openclaw/pull/96011) — guard Skill Workshop `create` proposals from existing-skill patch content (open since 2026-06-23, `waiting on author`).
- [PR #111922](https://github.com/openclaw/openclaw/pull/111922) — filter assistant process chatter from memory dreams (stale, open since 2026-07-20, ready for maintainer look).

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report — Personal AI Assistant / Agent Ecosystem
**Date:** 2026-08-20

---

## 1. Ecosystem Overview

The personal AI assistant open-source landscape remains heavily fragmented around the "Claw" family (OpenClaw and its derivatives) plus independent platforms (IronClaw, CoPaw, Moltis, EasyClaw), with activity concentrated in a few high-velocity cores and long tails of dormant or maintenance-only projects. The dominant theme across all active projects is **production reliability**: upgrade regressions, message-delivery correctness, auth/model-path failures, and state-persistence integrity account for most high-severity issues. Release cadence is bimodal — IronClaw and EasyClaw shipped stable releases this cycle, while OpenClaw, ZeroClaw, and CoPaw accumulated large merge volumes toward upcoming cuts. Community governance is becoming a bottleneck in the largest projects, with maintainer review queues and RFC decision backlogs explicitly called out in OpenClaw, ZeroClaw, and CoPaw digests.

---

## 2. Activity Comparison

| Project | Issues Updated (closed) | PRs Updated (merged/closed) | Release Status | Health Score (1–5) |
|---|---|---|---|---|
| OpenClaw | 307 (53) | 500 (72) | None (accumulating toward next) | 3.5 |
| NanoBot | 3 (0) | 20 (7) | None | 3.5 |
| ZeroClaw | 26 (1) | 50 (7) | None (v0.8.5 tracker, target Aug 30) | 3.0 |
| PicoClaw | 1 (1) | 5 (2) | None | 2.5 |
| NanoClaw | 3 (0) | 33 (23) | None | 4.5 |
| NullClaw | 0 | 1 (0) | None | 1.5 |
| IronClaw | 15 (6) | 39 (18) | **v1.3.0 stable shipped** | 4.5 |
| LobsterAI | 2 (0) | 9 (8, mostly stale-sweep) | None | 2.5 |
| TinyClaw | 0 | 0 | None | 1.0 |
| Moltis | 1 (1) | 4 (4) | 20260818.10 (Aug 18) | 4.0 |
| CoPaw | 19 (16) | 45 (26) | None (2.1.0-beta in circulation) | 4.5 |
| ZeptoClaw | 0 | 0 | None | 1.0 |
| EasyClaw | 0 | 0 | **3 releases (v1.8.101–103)** | 3.0 |

**Notes:** Health score reflects merge velocity, blocker load, backlog hygiene, and release cadence. OpenClaw's raw volume is 10–100× any peer, but two open P0 release-blockers and a `needs-maintainer-review` bottleneck cap its score. NanoClaw, IronClaw, and CoPaw show the best velocity-to-backlog ratios. TinyClaw and ZeptoClaw are fully inactive.

---

## 3. OpenClaw's Position

- **Community size:** OpenClaw operates at a different scale entirely — 307 issues and 500 PRs touched daily versus 3–50 PRs for all peers. It is the reference implementation that the NanoClaw/ZeroClaw/PicoClaw/NullClaw family forks from, giving it de facto standards-setting power over skills, channels, gateway architecture, and the "diamond lobster" severity taxonomy.
- **Advantages:** Broadest channel/integration surface; the strongest security feature momentum this cycle (install-policy acknowledgement in CLI and Control UI); responsive model-path fixes (Codex harness selection, GPT-5.6 reasoning-effort preservation) merged same-day; the only project with explicit P0/`impact:release-blocker` escalation discipline.
- **Technical approach:** Gateway-centric architecture with a Control UI, a skills ecosystem, and a delivery-queue/message-routing layer. Its current weakness is the same as its strength — the surface area is so large that upgrade regressions (two P0 startup failures on the 2026.7.x line) and subagent/session-state bugs concentrate here before anywhere else.
- **Differentiation:** Competitors are either smaller forks reducing scope (ZeroClaw's lighter-core RFC), platform-specific rebuilds (NanoClaw on Node.js), or independent architectures (IronClaw's multi-tenant model, CoPaw's Qwen/agentscope stack). None match OpenClaw's breadth, but IronClaw and CoPaw surpass it in merge-to-release discipline this cycle.

---

## 4. Shared Technical Focus Areas

1. **Upgrade & startup reliability** — OpenClaw (P0 gateway crash-loop #108435, migration preflight #112395; operators requesting backport guidance #123799), IronClaw (1.2→1.3 `activation_state` crash-loop, fixed in v1.3.0), NanoClaw (Node 26 passes check but `better-sqlite3` fails to build, #3359), EasyClaw (Gateway session recovery in v1.8.103), CoPaw (Windows launch failure #3177).
2. **Message-delivery correctness** — OpenClaw (`sessions_yield` replies undelivered #90944; premature subagent completion announcements #80498; steer-mode mid-turn injection #48003), NanoClaw (Dial SMS falsely marked delivered #3353), CoPaw (undownloadable image URL bricks conversation #7110), Moltis (WhatsApp replies to bot dropped in mention mode, fixed #1217).
3. **Auth/OAuth/model-path failures** — OpenClaw (Vertex/Gemini "undefined or null to object" #38327; Anthropic CLI OAuth refresh #83598), NanoBot (Docker OAuth login broken by non-root permission model #5444), ZeroClaw (Anthropic OAuth PR #9420), IronClaw (Copilot MCP extension `auth_required` install failure #7745), NanoClaw (unverifiable stored sign-in must fail closed #3339).
4. **Install/onboarding robustness** — ZeroClaw (Windows `TaskDialogIndirect` failure #9290/#10111; Android/Termux generic-binary selection #7911; degraded `config init` #9436), NanoClaw (headless/CI install leaves 0-byte files #3354), LobsterAI (macOS `sha256sum` packaging break #1555), CoPaw (home-directory wipe report #2884).
5. **Memory & state persistence integrity** — NanoBot (Dream cursor stuck after recovered tool errors → duplicate edits #5441; token-estimation errors prevent consolidation #5402), CoPaw (corrupt `envs.json` silently overwritten #7118; auto-compression bypasses summarization #6624), OpenClaw (SQLite snapshot restore lacks crash/identity guarantees #113306), NanoClaw (agent mailbox seam/registry #3349).
6. **Security hardening** — Moltis (CWE-306 unauthenticated vault unlock/recovery, fixed #1216), OpenClaw (install-policy warning acknowledgement), ZeroClaw (shell-child confinement escape PR #9827; SOP permission contract RFC #9598), CoPaw (SSRF/bounded-download protections for remote media #7146).
7. **Tool/context limit configurability** — ZeroClaw (fixed 50K-char tool-result truncation cluster #10114–10116), NanoBot (prompt-token estimation undercounts by 30–50%, #5403), OpenClaw (`contextPruning cache-ttl` never fires on OpenAI #95840), CoPaw (hardcoded 5s embedding health-check timeout #7156).

---

## 5. Differentiation Analysis

| Project | Primary Target User | Architectural Distinction | Feature Focus |
|---|---|---|---|
| OpenClaw | Power users / production operators | Self-hosted gateway + Control UI + skills; largest channel matrix | Breadth, model-path correctness, delivery reliability |
| NanoBot (HKUDS) | TUI/WebUI hobbyists, autonomous-agent operators | Lightweight Python, Herdr-hosted panes, Dream memory cron | TUI polish, memory compaction, monetized-agent experiments |
| ZeroClaw | Developers wanting a lean core | RFC-driven modularization; SOP process orchestration; goal mode | Security confinement, install reliability, governance reform |
| PicoClaw (Sipeed) | Embedded/low-footprint users | Minimal binary (Sipeed vendor), Telegram/LINE channels | Telegram UX, honest config warnings, routed-agent memory |
| NanoClaw | Node.js/TypeScript developers, Slack-first teams | Node/TS stack, `better-sqlite3`, provisioning/approval flows | Slack agents (gated install), SMS/voice (Dial), setup robustness |
| IronClaw (Near) | Multi-tenant enterprise/platform teams | Durable inbox contracts, per-user sandboxes, capability normalization | Notifications, CI discipline, upgrade safety |
| LobsterAI (NetEase Youdao) | Chinese desktop users | Desktop GUI clients, Windows/mac installers, engine overlay | Agent-settings UX, Windows distribution hardening |
| Moltis | Privacy/security-sensitive small deployments | Minimal, security-first HTTP layer | Vault auth, WhatsApp group correctness, tool-policy configurability |
| CoPaw (agentscope) | Chinese-language agent developers | Qwen/agentscope stack, ReMe memory, computer-use | Skill CLI, Chinese filename preservation, self-hosted Hub, marketplace |
| EasyClaw | E-commerce affiliate operators (TK Copilot) | Closed-loop release model, no public issue surface | Feishu integration, Gateway recovery, Affiliate workflows |

---

## 6. Community Momentum & Maturity

**Tier 1 — High-velocity, rapidly iterating:**
- **NanoClaw** (23 PRs merged, core-team same-day bugfixes), **CoPaw** (26 merged, 16 issues closed, 8 straight red E2E runs unbroken), **IronClaw** (18 merged plus a stable v1.3.0 release). These three show the healthiest merge-to-open ratios and direct issue→PR closure patterns.

**Tier 2 — Steady with structural constraints:**
- **OpenClaw** — massive throughput but stabilize-in-place: 72 merges against 428 open PRs, two P0s, and maintainer review explicitly named as the bottleneck.
- **NanoBot** — meaningful feature merges (TUI, memory perf, `ask_clarification`) but a growing conflict pile blocks P0/P1 stability work.
- **ZeroClaw** — high PR volume with a dedicated v0.8.5 stabilization tracker, yet RFC decision queues and `waiting-on-author` PRs throttle progress.
- **Moltis** — small but exemplary: zero open items at end of day, security issue closed by same-day fix.
- **EasyClaw** — shipping rapidly (3 releases) but entirely release-driven with no observable community feedback loop.

**Tier 3 — Low/dormant:**
- **PicoClaw** (stale PRs, one fix after a 5-month issue lifecycle), **LobsterAI** (stale-sweep masquerading as progress — 6 of 8 closed PRs were unmerged April-era items), **NullClaw/TinyClaw/ZeptoClaw** (one open PR or zero activity).

**Maturity signals:** OpenClaw and ZeroClaw are in stabilization/governance phases typical of post-growth projects; IronClaw and Moltis demonstrate the cleanest release discipline; CoPaw and NanoClaw are in active expansion with frictional edges (CI, install paths) that indicate scaling pains.

---

## 7. Trend Signals

1. **Upgrade reliability is now a product requirement, not a bug category.** Operators blocked by OpenClaw's 2026.7.1 startup failure, IronClaw's 1.2→1.3 crash-loop, and NanoClaw's Node 26 build break reveal a systemic gap: version checks validate lower bounds, not dependency matrices. Expect demand for upgrade-testing matrices, backport policies, and rollback guarantees.
2. **Monetized and unattended autonomous operation is emerging.** NanoBot's paid x402/ScanPay MCP proposal and EasyClaw's affiliate-automation business model signal a shift from personal-assistant to revenue-generating-agent deployments, which will drive demands for billing, audit trails, and payment-provider abstractions.
3. **Memory is becoming a first-class subsystem with integrity guarantees.** NanoBot's Dream cursor corruption, CoPaw's ReMe/Scroll gaps, OpenClaw's snapshot-restore identity issues, and ZeroClaw's truncation design flaws all point to the same need: memory pipelines need transactional semantics, idempotent cursors, and configurable token accounting — not heuristic compaction.
4. **Multi-agent/subagent delivery accounting remains unsolved.** Wrong-output, no-output, and duplicated-output bugs recur across OpenClaw (#90944, #80498), IronClaw (run outcomes), and NanoClaw (agent mailbox seam). HTTP-driven and cross-agent delivery targets are actively being designed (OpenClaw PR #126501).
5. **Local/on-device tooling is a rising constraint.** IronClaw's 40-day-old loopback-MCP blocker (#5998) finally received a fix PR; OpenClaw's memory status and ZeroClaw's proxy selectors show similar on-device integration friction. Developers want local MCP, local models, and offline-capable agents.
6. **Security posture is shifting from access control to supply-chain and install-time safety.** OpenClaw's install-policy acknowledgement, ZeroClaw's confinement-escape fix, Moltis's vault CWE-306, and CoPaw's SSRF protections indicate hardening across the install→runtime→tool-execution chain.
7. **For AI agent developers, the actionable takeaways:** (a) treat install-time and upgrade-time paths as first-class CI citizens (headless, non-login shell, Docker non-root, Node/OS matrix); (b) make delivery status observable and retryable rather than optimistic; (c) design memory and session state with crash-safe, idempotent write patterns; (d) expect maintainer-review latency in the largest projects and prefer projects with demonstrated issue→PR→merge closure rates (IronClaw, Moltis, CoPaw, NanoClaw) for time-sensitive contributions.

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

## 1. Today's Overview

NanoBot shows steady, healthy activity on 2026-08-20: 3 issues were updated (all still open) and 20 pull requests received updates, with 7 PRs merged or closed. The closing of 7 PRs today — spanning TUI/UX improvements, WebUI shutdown behavior, memory compaction performance, and a new `ask_clarification` tool — indicates active feature work progressing through review. The open-PR queue (13 items) includes several high-priority fixes (P0/P1) that are marked as having conflicts, suggesting maintainer attention is needed to land critical stability work. No new releases were published today. Overall, the project is in a productive phase with a meaningful volume of merged work, though the backlog of conflicting high-severity PRs is a growing risk.

## 2. Releases

No new releases were published in the last 24 hours.

## 3. Project Progress

Seven PRs were merged or closed today:

- **[#5449 — fix(tui): keep navigation commands in Herdr panes](https://github.com/HKUDS/nanobot/pull/5449)** (closed): Preserves native TUI conversation navigation (`/sessions`, `/new-chat`, `/branch`) inside Herdr-hosted panes, clarifying that Herdr owns terminal topology while nanobot owns sessions/chats/branches.
- **[#5448 — feat(tui): start fresh chats in launch workspace](https://github.com/HKUDS/nanobot/pull/5448)** (closed): TUI launches now start in a fresh WebSocket session using the command launch directory as the initial workspace, while preserving explicit `--session`/`--workspace` overrides; removes obsolete last-session persistence.
- **[#5443 — fix(tui): expose /exit in command menu](https://github.com/HKUDS/nanobot/pull/5443)** (closed): Makes the existing `/exit` behavior discoverable via the slash-command menu, completion, and discovery, routing through the existing local shutdown path.
- **[#5440 — perf(memory): reuse conversation prefix for local compaction](https://github.com/HKUDS/nanobot/pull/5440)** (closed): Builds idle/token-overflow/`/new` consolidation requests from the ordinary model-facing prefix and appends a temporary instruction, preserving structured tool calls while disabling tool execution.
- **[#5438 — fix(webui): return promptly after Ctrl-C](https://github.com/HKUDS/nanobot/pull/5438)** (closed): Fixes slow WebUI shutdown by releasing client leases with `wait_for_stop=False` on both foreground exit paths and leaving on-demand gateway shutdown to the monitor.
- **[#5341 — fix(skills): make weather workflow Windows-safe](https://github.com/HKUDS/nanobot/pull/5341)** (closed): Replaces bare `curl` in the weather skill example to avoid PowerShell's `Invoke-WebRequest` alias, preventing first-command failures on Windows.
- **[#4527 — Add ask_clarification tool](https://github.com/HKUDS/nanobot/pull/4527)** (closed): Adds a built-in `ask_clarification` tool with focused question/type/context/options parameters, short-circuits agent turns when clarification is requested, and renders results correctly in the WebUI.

## 4. Community Hot Topics

Comment/reaction activity is currently low (0 comments across all items), but several threads stand out by priority, age, or novelty:

- **[Issue #5447 — Paid security-scan MCP integration (nanobot + ScanPay x402)](https://github.com/HKUDS/nanobot/issues/5447)**: A user operating an "autonomous agent revenue stack" proposes integrating nanobot with ScanPay (a Solana x402 micropayment security scanner at 0.0007 SOL per scan) and an AgentBridge job system. This is a novel commercial/monetized-agent use case and the most notable new feature request today.
- **[PR #5271 — fix(session): prevent stale background task saves (priority: p0, conflict)](https://github.com/HKUDS/nanobot/pull/5271)**: The only P0 item in the queue. It addresses stale background work overwriting sessions after `/new`; despite its severity, it is marked with conflicts and has been open since 2026-08-06.
- **[PR #4853 — feat(tools): add nano_timer core tool (priority: p1, conflict)](https://github.com/HKUDS/nanobot/pull/4853)**: Open since 2026-07-08, this dependency-free time/timezone/calendar tool remains the longest-pending P1 feature and is blocked on conflicts.

Underlying needs: users are pushing nanobot toward (a) monetizable autonomous operation (paid MCP/x402 scanning), (b) reliable background/state handling for long-running agents, and (c) better time-aware tooling.

## 5. Bugs & Stability

Two new bugs were reported in the last 24 hours, both with fix PRs already in the queue:

- **[Issue #5444 — Failed to login OpenAI via OAuth in Docker](https://github.com/HKUDS/nanobot/issues/5444)** (new): OAuth login flow fails inside Docker — the redirect callback is served but token exchange breaks. Two fix PRs target the same root cause (OAauth token storage writing to unmanaged paths that are read-only after dropping to the non-root user): [#5446 — route OpenAI Codex OAuth storage through nanobot's data dir](https://github.com/HKUDS/nanobot/pull/5446) and [#5445 — fix(docker): persist OAuth client data](https://github.com/HKUDS/nanobot/pull/5445). Note: PR #5446's summary explicitly references the `PermissionError` on `/home/...` in Docker, confirming a permission issue rather than a protocol issue.
- **[Issue #5441 — Dream: recovered tool error permanently blocks the memory cursor](https://github.com/HKUDS/nanobot/issues/5441)** (new): A Dream run that successfully commits memory edits can still be rejected as "did not complete" if any tool event errored, leaving `memory/.dream_cursor` stale. Subsequent runs then reprocess the same history batch, duplicating edits. [Fix PR #5442](https://github.com/HKUDS/nanobot/pull/5442) advances the cursor when tool errors were recovered and reports why a run didn't complete.

Pre-existing stability fixes still awaiting merge (all open with conflicts): [#5271 (P0, stale background task saves)](https://github.com/HKUDS/nanobot/pull/5271), [#5403 (P1, incorrect prompt-token estimation prevents memory consolidation)](https://github.com/HKUDS/nanobot/pull/5403), [#5379 (memory consolidation truncation is lossy)](https://github.com/HKUDS/nanobot/pull/5379), and [#5257 (sustained-goal continuation loops when turn goes idle)](https://github.com/HKUDS/nanobot/pull/5257).

## 6. Feature Requests & Roadmap Signals

- **[Issue #5447 — Paid security-scan MCP integration](https://github.com/HKUDS/nanobot/issues/5447)**: Requests enabling nanobot to consume paid MCP/x402 services (Solana micropayments per scan). If accepted, this could land as an MCP-client payment extension in a future release, though it likely requires architecture discussion for crypto payment support.
- **[PR #5420 — feat(webui): turn observability and safe recovery](https://github.com/HKUDS/nanobot/pull/5420)** (open): Projects each turn into one answer surface with ordered reasoning/tool activity, accumulated provider usage, and explicit interrupted-work recovery.
- **[PR #5408 — feat(webui): follow-up suggestions](https://github.com/HKUDS/nanobot/pull/5408)** (open): Ephemeral, chat-scoped follow-up suggestions after successful WebUI turns, with a strict provider-neutral line protocol (DeerFlow-style composer behavior).
- **[PR #5405 — feat(skills): manual-only invocation](https://github.com/HKUDS/nanobot/pull/5405)** (open): Adds `disable-model-invocation: true` frontmatter so side-effectful skills (deploy/publish) are user-only.
- **[PR #4853 — nano_timer core tool](https://github.com/HKUDS/nanobot/pull/4853)** (open, P1): UTC/local time, timezone, and calendar fields as a dependency-free core tool.

Near-term release prediction: the WebUI UX cluster (turn observability + follow-up suggestions) plus the TUI polish PRs merged today suggest the next release will focus on interface usability. The P0/P1 memory and session safety fixes are likely to be prioritized for inclusion once conflicts are resolved, since they address data-corruption and context-window risks.

## 7. User Feedback Summary

- **Docker OAuth pain point ([#5444](https://github.com/HKUDS/nanobot/issues/5444))**: The non-root user model in the Docker image breaks OAuth login because credential writes go to unmanaged platformdirs; users cannot log in to OpenAI at all in containers. Two independent contributors submitted fixes, signaling real friction.
- **Memory corruption risk in Dream ([#5441](https://github.com/HKUDS/nanobot/issues/5441))**: A rejected-but-committed Dream run causes repeated duplicate edits on every subsequent run. This is a data-integrity problem that erodes user trust in autonomous memory features; the author of the issue also submitted the fix PR, indicating a motivated user-contributor base.
- **Monetization intent ([#5447](https://github.com/HKUDS/nanobot/issues/5447))**: Users are operating autonomous agent revenue stacks and want nanobot to interoperate with paid security-scanning services — a signal that the project is being adopted in production/commercial settings, not just personal assistant use.

Overall, users are relying on nanobot for long-running, unattended operation (Dream cron, background tasks, sustained goals), and the reported bugs cluster around exactly those production concerns: state persistence, OAuth/reliability in Docker, and idempotent memory handling.

## 8. Backlog Watch

Items needing maintainer attention, ranked by priority and age:

- **[PR #5271 — fix(session): prevent stale background task saves (P0, conflict)](https://github.com/HKUDS/nanobot/pull/5271)**: Open since 2026-08-06; highest-severity PR in queue but marked with conflicts. Should be resolved and merged first.
- **[PR #4853 — feat(tools): add nano_timer core tool (P1, conflict)](https://github.com/HKUDS/nanobot/pull/4853)**: Open since 2026-07-08 — the oldest open PR. Conflict status is blocking a long-awaited dependency-free time tool.
- **[PR #5403 — fix(memory): use API-reported prompt tokens (P1, conflict)](https://github.com/HKUDS/nanobot/pull/5403)**: Fixes context-window overflow because local tiktoken estimation undercounts by 30–50%; consolidation never triggers. References issue #5402.
- **[PR #5379 — fix(memory): preserve full consolidation input](https://github.com/HKUDS/nanobot/pull/5379)**: Lossless bounded chunks replacing lossy truncation; complements #5403.
- **[PR #5405 — feat(skills): support manual-only invocation](https://github.com/HKUDS/nanobot/pull/5405)**: Conflicting and open since 2026-08-16; important for safe deployment/publish skills.
- **[Issue #5447 — Paid security-scan MCP integration](https://github.com/HKUDS/nanobot/issues/5447)**: No maintainer response yet; a first-response/design-guidance comment would help set expectations for this forward-looking request.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

## 1. Today's Overview

ZeroClaw logged heavy activity on 2026-08-20: 26 issues were updated (25 open, 1 closed) and 50 PRs were touched (43 open, 7 merged/closed), with no release shipped. The project remains in a high-throughput stabilization and review cycle, with several large, high-risk PRs (security confinement, Anthropic OAuth, channel authorization) waiting on maintainer or author action. New bug clusters emerged around deterministic tool-result truncation, plugin-install recoverability, and a flaky parallel-runtime test, while the v0.8.5 stabilization tracker keeps the release line pointed at August 30. The volume of `needs-maintainer-review` RFCs and a dedicated maintainer decision queue indicate review throughput is the current bottleneck.

## 2. Releases

No new releases in this window. The last shipped baseline remains v0.8.4; the v0.8.5 finite weekly stabilization line is tracked in [Issue #9459](https://github.com/zeroclaw-labs/zeroclaw/issues/9459).

## 3. Project Progress

Seven PRs were merged or closed in the last 24 hours (the specific PRs are not named in the top-20 active sample). The one visible closure is [Issue #9470](https://github.com/zeroclaw-labs/zeroclaw/issues/9470), the accepted task to correct Reliable fallback telemetry attribution and stale fallback notices, marking that observability fix complete.

Substantial open PRs continued advancing through review:
- [PR #9126](https://github.com/zeroclaw-labs/zeroclaw/pull/9126) — plugin typed instance-config validation (large, high-risk, core/agent/runtime).
- [PR #9827](https://github.com/zeroclaw-labs/zeroclaw/pull/9827) — stops shell children escaping validated confinement across sandbox backends (large, p1).
- [PR #9428](https://github.com/zeroclaw-labs/zeroclaw/pull/9428) — sender authorization for Bluesky and Reddit inbound channels (p1, XL).
- [PR #9378](https://github.com/zeroclaw-labs/zeroclaw/pull/9378) — persists failed/cancelled ACP turn transcripts, the fix for the S1 transcript-loss bug.
- [PR #10163](https://github.com/zeroclaw-labs/zeroclaw/pull/10163) — anchors the flaky `process_stats` rapid-resample test to its timing premise.

## 4. Community Hot Topics

- [Issue #6165](https://github.com/zeroclaw-labs/zeroclaw/issues/6165) — *RFC: Prefer a lighter ZeroClaw core through external integrations* (17 comments, risk:high, needs-maintainer-review). The longest-running architecture debate; underlying need is reducing core configuration/surface area by moving long-tail integrations out-of-tree.
- [Issue #8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) — *Maintainer decision queue for RFCs and design issues* (13 comments). A governance signal that RFC and design decisions are piling up faster than maintainers can dispose of them.
- [Issue #9598](https://github.com/zeroclaw-labs/zeroclaw/issues/9598) — *RFC: Define the SOP capability permission contract* (8 comments, risk:high). Seeking final authority for `required_permissions` in SOP; a v0.9.0 target.
- [Issue #8586](https://github.com/zeroclaw-labs/zeroclaw/issues/8586) — *refactor(gateway): centralize webhook channel message dispatch* (7 comments, in-progress). Community interest in consolidating webhook ingress lifecycle.
- [Issue #7911](https://github.com/zeroclaw-labs/zeroclaw/issues/7911) — *install.sh selects a generic Linux binary on Android/Termux* (4 comments). Real install pain for Android users, now with a docs clarification PR ([PR #10160](https://github.com/zeroclaw-labs/zeroclaw/pull/10160)).
- [Issue #9702](https://github.com/zeroclaw-labs/zeroclaw/issues/9702) — *RFC: Goal mode v2 — durable continuation and paired Web controls* (4 comments, risk:high).
- [Issue #9990](https://github.com/zeroclaw-labs/zeroclaw/issues/9990) — *RFC: Calibrate PR risk and security approval requirements* (4 comments, risk:high).

## 5. Bugs & Stability

Newly surfaced (created/updated within the window):

- [Issue #10114](https://github.com/zeroclaw-labs/zeroclaw/issues/10114), [Issue #10115](https://github.com/zeroclaw-labs/zeroclaw/issues/10115), [Issue #10116](https://github.com/zeroclaw-labs/zeroclaw/issues/10116) — a related S2 cluster on tool-result truncation: a fixed 50,000-character cap unrelated to the model context window, invisible truncation outside the model's context, and byte-wise middle-out cutting instead of spilling to a file handle. No fix PR yet; the cluster suggests the `results_collect.rs` truncation path needs a design change.
- [Issue #10162](https://github.com/zeroclaw-labs/zeroclaw/issues/10162) — `plugin install` persists the package before config-entry seeding and cannot retry the seed phase, leaving partially installed plugins.
- [Issue #10161](https://github.com/zeroclaw-labs/zeroclaw/issues/10161) — `process_stats` rapid-resample test flakes under the Parallel Runtime Test gate; [PR #10163](https://github.com/zeroclaw-labs/zeroclaw/pull/10163) fixes the test.
- [Issue #10111](https://github.com/zeroclaw-labs/zeroclaw/issues/10111) — new user report of the Windows `TaskDialogIndirect` entry-point failure, duplicating [Issue #9290](https://github.com/zeroclaw-labs/zeroclaw/issues/9290).
- [Issue #10106](https://github.com/zeroclaw-labs/zeroclaw/issues/10106) — exact proxy selectors reject supported transcription services (`groq`, `openai`, `deepgram`, etc.).

Active high-severity bugs:

- [Issue #9333](https://github.com/zeroclaw-labs/zeroclaw/issues/9333) (S1) — failed ACP turns disappear after switching sessions; fix PR [PR #9378](https://github.com/zeroclaw-labs/zeroclaw/pull/9378) is open but needs author action.
- [Issue #9290](https://github.com/zeroclaw-labs/zeroclaw/issues/9290) (S1) — Windows desktop installer fails at launch with missing `TaskDialogIndirect`; awaiting a fix.
- [Issue #10042](https://github.com/zeroclaw-labs/zeroclaw/issues/10042) (S1, CI) — MSRV system dependency installation can consume the full job timeout.
- [Issue #9929](https://github.com/zeroclaw-labs/zeroclaw/issues/9929) (S2, p1, blocked) — headless SOP step turns get a session path but are never persisted.
- [Issue #9436](https://github.com/zeroclaw-labs/zeroclaw/issues/9436) (S2, p1) — `config init` writes template sections that fail the strict loader; still reproduces on `master`.
- [Issue #10089](https://github.com/zeroclaw-labs/zeroclaw/issues/10089) — ZeroCode ignores terminal-native bracketed paste while an agent turn is running.

## 6. Feature Requests & Roadmap Signals

- [Issue #6165](https://github.com/zeroclaw-labs/zeroclaw/issues/6165) — lighter core via external integrations is the strongest architectural signal; likely to shape post-v0.8.5 modularization.
- [Issue #9702](https://github.com/zeroclaw-labs/zeroclaw/issues/9702) — Goal mode v2 with durable continuation and paired browser controls; a v0.9.0-era candidate alongside the SOP contract.
- [Issue #9598](https://github.com/zeroclaw-labs/zeroclaw/issues/9598) — SOP capability permission contract, explicitly targeting v0.9.0.
- [Issue #9990](https://github.com/zeroclaw-labs/zeroclaw/issues/9990) — calibrating PR risk/security approval requirements, a process RFC that would change contributor friction.
- [Issue #10041](https://github.com/zeroclaw-labs/zeroclaw/issues/10041) — isolated, non-attesting Blacksmith debugging lane for CI.
- [Issue #10159](https://github.com/zeroclaw-labs/zeroclaw/issues/10159) — verify pinned release tools on native runners before the next release.
- The [v0.8.5 tracker](https://github.com/zeroclaw-labs/zeroclaw/issues/9459) shows weekly release cuts through August 30; the webhook dispatch centralization ([#8586](https://github.com/zeroclaw-labs/zeroclaw/issues/8586)) and Reliable telemetry corrections are the most likely candidates for the next cut.

## 7. User Feedback Summary

- **Windows installation is the loudest pain point**: two reports ([#9290](https://github.com/zeroclaw-labs/zeroclaw/issues/9290), [#10111](https://github.com/zeroclaw-labs/zeroclaw/issues/10111)) of the desktop app failing instantly with a missing `TaskDialogIndirect` entry point; the v0.8.3 installer is affected and this remains unresolved for users.
- **Android/Termux users** ([#7911](https://github.com/zeroclaw-labs/zeroclaw/issues/7911)) get a generic Linux binary instead of a usable Android build; docs are being updated, but the underlying packaging gap remains.
- **Onboarding degradation** ([#9436](https://github.com/zeroclaw-labs/zeroclaw/issues/9436)): fresh installs start with a degraded config and `config migrate` exits 1 — a poor first-run experience still reproducible on master.
- **ZeroCode TUI users** ([#10089](https://github.com/zeroclaw-labs/zeroclaw/issues/10089)) lose paste functionality during agent turns, interrupting real workflows.
- Maintainers and contributors are signaling process fatigue: the RFC decision queue ([#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)), the risk-calibration RFC ([#9990](https://github.com/zeroclaw-labs/zeroclaw/issues/9990)), and the lighter-core proposal ([#6165](https://github.com/zeroclaw-labs/zeroclaw/issues/6165)) all reflect a desire for lower governance overhead and a smaller core.

## 8. Backlog Watch

- [Issue #6165](https://github.com/zeroclaw-labs/zeroclaw/issues/6165) — open since April 27, 17 comments, `needs-maintainer-review`, risk:high. The longest-pending architecture decision in the queue.
- [Issue #8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) — the maintainer decision tracker itself is accumulating unresolved RFCs; acceptance/rejection throughput is the constraint.
- [PR #9451](https://github.com/zeroclaw-labs/zeroclaw/pull/9451) — DORA telemetry retirement, `do-not-merge`, open since July 27, awaiting maintainer review.
- [PR #9419](https://github.com/zeroclaw-labs/zeroclaw/pull/9419) and [PR #9420](https://github.com/zeroclaw-labs/zeroclaw/pull/9420) — credential rotation and Anthropic OAuth support, both large, high-risk, `do-not-merge`, open since July 26.
- [PR #10035](https://github.com/zeroclaw-labs/zeroclaw/pull/10035) — heartbeat MCP child symlink fixture test, `do-not-merge`, small but stalled.
- [PR #9427](https://github.com/zeroclaw-labs/zeroclaw/pull/9427) — LINE group authorization, `stale-candidate`, blocked on its dependency [#9428](https://github.com/zeroclaw-labs/zeroclaw/pull/9428).
- PRs waiting on author action: [PR #10034](https://github.com/zeroclaw-labs/zeroclaw/pull/10034), [PR #9428](https://github.com/zeroclaw-labs/zeroclaw/pull/9428), [PR #9433](https://github.com/zeroclaw-labs/zeroclaw/pull/9433), [PR #9378](https://github.com/zeroclaw-labs/zeroclaw/pull/9378), [PR #9827](https://github.com/zeroclaw-labs/zeroclaw/pull/9827) — several are p1 security or data-loss fixes whose review progress is blocked on author responses.
- [Issue #9929](https://github.com/zeroclaw-labs/zeroclaw/issues/9929) — headless SOP persistence bug is accepted but `blocked`, with no fix PR attached.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw Project Digest — 2026-08-20

## 1. Today's Overview
PicoClaw saw moderate activity over the last 24 hours: 1 issue was closed, and 5 pull requests were touched, of which 2 were closed/merged and 3 remain open. No new releases were published. The closed issue (#1305) resolves a longstanding bug from March where a startup banner polluted STDOUT and broke shell completion generation. Feature work is progressing on the Telegram channel (interactive command UX, topic support) and model fallback configuration, though three PRs are flagged as stale and need maintainer review. Overall project health is stable, with active bug triage but a slightly aging open-PR queue.

## 2. Releases
No new releases were published in the reporting window.

## 3. Project Progress
Two PRs were closed/merged today:
- **[#3341 — feat(telegram): add interactive command UX and formatted ephemeral fallback](https://github.com/sipeed/picoclaw/pull/3341)** (As-tsaqib) — Overhauls the Telegram command experience by removing the need for full CLI-style subcommand grammar (e.g. for `/memory`), simplifies the verbose `/help` output, and adds formatted ephemeral fallback for structured content.
- **[#3200 — feat(models): add configurable default fallback chain](https://github.com/sipeed/picoclaw/pull/3200)** (lc6464) — Introduces a dedicated default-chain workflow on the web UI's models page, letting users set a default model, add/reorder fallback models, and persist the chain via the backend API. This PR was stale (open since July 1) before being closed.

Three PRs remain open and actively updated:
- **[#3329 — fix(line): warn on inert webhook_host / webhook_port instead of seeding them](https://github.com/sipeed/picoclaw/pull/3329)** — Fixes misleading LINE channel configuration.
- **[#3316 — fix: routed-agent context management](https://github.com/sipeed/picoclaw/pull/3316)** — Addresses routed agents losing conversation history.
- **[#3315 — Support topics in private bot chats](https://github.com/sipeed/picoclaw/pull/3315)** — Fixes Telegram topic handling for private chats.

## 4. Community Hot Topics
The most active item was **[Issue #1305 — [BUG] new banner print to STDOUT, break completion flow](https://github.com/sipeed/picoclaw/issues/1305)** (4 comments, closed) — Reported in March, it documents how the banner introduced by PR #1008 corrupts `picoclaw completion zsh` output, breaking shell completion scripts. The long lifecycle (March → August) suggests the fix took months to land.

**[PR #3329 — warn on inert webhook_host / webhook_port](https://github.com/sipeed/picoclaw/pull/3329)** addresses the closely related underlying need: users want configuration fields to either work or produce clear warnings rather than silently doing nothing. The PR argues that `line.settings.webhook_host`/`webhook_port` are declared, defaulted, and env-bound but never read, since the LINE channel mounts `WebhookPath()` on the shared gateway server. This reflects broader community demand for honest, observable configuration behavior.

## 5. Bugs & Stability
- **High — Routed-agent context loss ([PR #3316](https://github.com/sipeed/picoclaw/pull/3316))**: Routed agents in Discord channels do not remember previous messages; history, summarization, compression, and seahorse bootstrap are not respected, and auto-compaction never triggers. Open PR exists; fix still pending. 
- **Medium — Banner breaks shell completion ([Issue #1305](https://github.com/sipeed/picoclaw/issues/1305))**: STDOUT banner output corrupts generated completion scripts. Fixed and closed today.
- **Medium — Inert LINE webhook settings ([PR #3329](https://github.com/sipeed/picoclaw/pull/3329), fixes #3328)**: `webhook_host`/`webhook_port` are seeded and env-bound but never read, giving users a false sense of configuration. Fix PR open; not yet merged.

## 6. Feature Requests & Roadmap Signals
The following feature signals are likely candidates for the next release:
- **Telegram interactive command UX ([PR #3341](https://github.com/sipeed/picoclaw/pull/3341))**: Closed today — a strong signal this lands next, reducing CLI-style friction for `/memory` and streamlining `/help`.
- **Telegram topics in private bot chats ([PR #3315](https://github.com/sipeed/picoclaw/pull/3315))**: Extends topic support beyond forum supergroups to private chats via `IsTopicMessage`; complements the Telegram UX work.
- **Configurable default model fallback chain ([PR #3200](https://github.com/sipeed/picoclaw/pull/3200))**: Web UI-driven fallback model ordering, closed today — likely in the next version given its web-facing scope.

## 7. User Feedback Summary
- **Scripting needs clean stdout**: The banner bug (#1305) shows users rely on PicoClaw emitting machine-readable output (completion scripts), and any stray STDOUT text is a breaking regression.
- **Telegram UX friction**: Users find full subcommand grammar for `/memory` cognitively heavy and `/help` output overly verbose; the community response is a push toward interactive, formatted commands.
- **Context loss in routed agents**: A real user pain point — dispatch-rule configurations result in amnesiac agents and no auto-compaction, degrading long-running conversations.
- **Config transparency**: Users dislike settings that silently do nothing (LINE `webhook_host`/`webhook_port`); the preferred behavior is an explicit warning over silent seeding.

## 8. Backlog Watch
- **[PR #3316 — routed-agent context management](https://github.com/sipeed/picoclaw/pull/3316)**: Open since 2026-08-03, flagged `[stale]`; addresses a high-impact memory bug and needs maintainer attention.
- **[PR #3315 — Telegram topics in private chats](https://github.com/sipeed/picoclaw/pull/3315)**: Open since 2026-08-03, flagged `[stale]`; a focused, low-risk fix that has not received review.
- **[PR #3329 — LINE webhook config warning](https://github.com/sipeed/picoclaw/pull/3329)**: Open since 2026-08-11, no comment activity; pending merge for an issue-fixing change.
- **[PR #3200 — model fallback chain](https://github.com/sipeed/picoclaw/pull/3200)**: Open since 2026-07-01, flagged `[stale]` before being closed today; worth confirming it was merged rather than abandoned.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw Project Digest — 2026-08-20

## 1. Today's Overview
NanoClaw saw a high-activity day: 33 PRs updated in the last 24 hours, with 23 merged or closed and 10 still open. Three new issues were filed, all centered on setup robustness and SMS delivery accuracy. The core team landed a significant reorganization of the Slack channel (base adapter vs. agents feature), several provisioning/approvals hardening fixes, and a Telegram group picker. No new releases were published. Overall project health looks strong, with the main risk集中于 install-time failures on current Node runtimes and headless environments.

## 2. Releases
No new releases in the last 24 hours.

## 3. Project Progress
Merged/closed PRs advanced several areas:

- **Slack architecture split** — [#3358](https://github.com/nanocoai/nanoclaw/pull/3358) splits the payload: `/add-slack` now ships the base adapter only, while the agents feature lives in `/slack-agent-flow`; companion [#3357](https://github.com/nanocoai/nanoclaw/pull/3357) makes `--slack-agents` install the full agents feature (child bots, a2a rooms, canvases, DM onboarding).
- **Slack invite handling** — [#3342](https://github.com/nanocoai/nanoclaw/pull/3342) declines owner-absent channel invites instead of escalating them as approve/reject cards.
- **Provisioning & approvals** — [#3340](https://github.com/nanocoai/nanoclaw/pull/3340) records the delivering instance on `pending_approvals`; [#3344](https://github.com/nanocoai/nanoclaw/pull/3344) adds optional request-origin metadata on app creation; [#3345](https://github.com/nanocoai/nanoclaw/pull/3345) forwards client version metadata on Slack service requests.
- **Bug fixes** — [#3339](https://github.com/nanocoai/nanoclaw/pull/3339) fails closed when a stored sign-in can't be verified; [#3341](https://github.com/nanocoai/nanoclaw/pull/3341) derives the Slack service from the credential's issuer; [#3025](https://github.com/nanocoai/nanoclaw/pull/3025) raises the agent SDK's 32,000 output-token cap.
- **Telegram** — [#3351](https://github.com/nanocoai/nanoclaw/pull/3351) adds an approved group connection picker via `/connect_group`.

Still open and moving: Cursor Agent SDK provider with `/add-cursor` setup skill ([#3356](https://github.com/nanocoai/nanoclaw/pull/3356), [#3355](https://github.com/nanocoai/nanoclaw/pull/3355)), agent mailbox seam and registry ([#3349](https://github.com/nanocoai/nanoclaw/pull/3349)), and Node runtime support ([#3360](https://github.com/nanocoai/nanoclaw/pull/3360)).

## 4. Community Hot Topics
Issue/PR discussion is minimal (all three new issues have 0 comments), but the most active topics by recent updates are:

- **[#3359 — Node 26 passes check_node but better-sqlite3 11.10.0 cannot build](https://github.com/nanocoai/nanoclaw/issues/3359)** — fresh macOS arm64 + Homebrew Node 26.7.0 aborts at bootstrap. Underlying need: Node version checks must validate against the dependency matrix, not just a lower bound.
- **[#3354 — 0-byte channel files and PATH-ordered onecli check on headless installs](https://github.com/nanocoai/nanoclaw/issues/3354)** — setup assumes a login/interactive shell; fails on non-login SSH sessions. Underlying need: install must be robust in CI/headless contexts.
- **[#3353 — Dial outbound SMS recorded as delivered despite carrier rejection](https://github.com/nanocoai/nanoclaw/issues/3353)** — delivery status is never revisited after carrier rejection, leaving `status = 'delivered'` and untouched retry budgets.
- **Long-running feature PRs** — the Dial channel adapter and setup picker ([#3041](https://github.com/nanocoai/nanoclaw/pull/3041), [#3050](https://github.com/nanocoai/nanoclaw/pull/3050), open since July 14) and the CLI `--rw` flag for `groups config add-mount` ([#3149](https://github.com/nanocoai/nanoclaw/pull/3149), open since July 29) remain the most heavily awaited contributions.

## 5. Bugs & Stability
Three bugs were reported in the last 24 hours, ranked by severity:

1. **High — [#3359](https://github.com/nanocoai/nanoclaw/issues/3359): Node 26 passes the version check but `better-sqlite3` can't compile.** Blocks fresh installs on current Homebrew Node. Fix exists in open PR [#3360](https://github.com/nanocoai/nanoclaw/pull/3360) (upgrade to better-sqlite3 13.0.3, raise host minimum from Node 20 to Node 22).
2. **Medium — [#3353](https://github.com/nanocoai/nanoclaw/issues/3353): Dial SMS falsely marked delivered.** Carrier rejections after acceptance don't update the session row or retry budget. No fix PR yet.
3. **Medium — [#3354](https://github.com/nanocoai/nanoclaw/issues/3354): Setup leaves 0-byte channel files on failed `git show` copy; onecli check runs before its own PATH fix.** Corrupts installs on non-login/headless machines. No dedicated fix PR yet; related setup-hardening PR [#3249](https://github.com/nanocoai/nanoclaw/pull/3249) remains open.

Also fixed today: **#3339** (unverifiable stored sign-in was treated as passed) and **#3341** (Slack install token and Slack service were configured independently and never paired).

## 6. Feature Requests & Roadmap Signals
In-flight features point to a packed next release:

- **Cursor Agent SDK provider** ([#3356](https://github.com/nanocoai/nanoclaw/pull/3356), [#3355](https://github.com/nanocoai/nanoclaw/pull/3355)) — new provider support with setup skill.
- **Agent mailbox seam and registry** ([#3349](https://github.com/nanocoai/nanoclaw/pull/3349)) — shared by NanoClaw and the agents it runs; SQLite remains the included implementation.
- **Dial channel (SMS + AI voice calls)** ([#3041](https://github.com/nanocoai/nanoclaw/pull/3041), [#3050](https://github.com/nanocoai/nanoclaw/pull/3050)) — still pending; bug [#3353](https://github.com/nanocoai/nanoclaw/issues/3353) will need to be addressed before it can be considered stable.
- **Node 22 minimum + better-sqlite3 13** ([#3360](https://github.com/nanocoai/nanoclaw/pull/3360)) — a clear roadmap shift toward current runtimes and a resolution for #3359.
- **Slack agents gated install** ([#3357](https://github.com/nanocoai/nanoclaw/pull/3357)) — merged; base Slack experience is now the default, with `--slack-agents` for the full feature set.

Prediction: the next release will likely include the Node 22 baseline, the Slack agents split, the Cursor provider payload, and the Telegram group picker.

## 7. User Feedback Summary
Real user pain points this cycle come from `glifocat`, who hit setup failures on a fresh macOS arm64 machine and a clean headless box:

- The Node check's lower-bound-only logic gives false confidence on Node 26, then fails at native module compile time.
- Setup assumes login shells: `~/.local/bin` missing from PATH breaks a pre-PATH onecli check, and `git show` failures leave 0-byte channel files without cleanup.
- Dial users need delivery status to reflect actual carrier outcomes, including rejection handling and retry semantics.

On the positive side, core-team fix velocity is high — multiple provisioning and Slack bugs were identified and merged the same day, indicating responsive maintenance and a project in active, healthy development.

## 8. Backlog Watch
Items needing maintainer attention:

- **[#3149](https://github.com/nanocoai/nanoclaw/pull/3149) — `--rw` flag for `groups config add-mount`** (open since 2026-07-29, ~3 weeks). Straightforward CLI fix awaiting review.
- **[#3041](https://github.com/nanocoai/nanoclaw/pull/3041) and [#3050](https://github.com/nanocoai/nanoclaw/pull/3050) — Dial channel adapter and setup picker** (open since 2026-07-14, ~5 weeks). Large feature PRs that need maintainer review and now have a related bug (#3353) to reconcile.
- **[#3249](https://github.com/nanocoai/nanoclaw/pull/3249) — handle existing Node outside the supported range** (open since 2026-08-14). Directly relevant to #3359 and needs coordination with the Node-runtime PR #3360 to avoid conflicting changes.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw Project Digest — 2026-08-20

## 1. Today's Overview
Activity is minimal: no issues were updated in the last 24 hours and no releases were published. One pull request (#989) is open, addressing a broken star history chart in the README, with no merges or closures recorded today. The project appears to be in a low-maintenance phase, with the single open PR awaiting review or merge. No new bugs, feature requests, or community discussions surfaced through the issue tracker.

## 2. Releases
No new releases were published in the last 24 hours.

## 3. Project Progress
No pull requests were merged or closed today. The only activity is PR #989, which remains open:

- [#989 [OPEN] fix: restore broken star history chart](https://github.com/nullclaw/nullclaw/pull/989) — Submitted by FaintFlower; proposes replacing the GitHub stargazer API dependency with star-history.dera.page so the README chart renders correctly.

## 4. Community Hot Topics
- [#989 fix: restore broken star history chart](https://github.com/nullclaw/nullclaw/pull/989) — The only active PR. It addresses a functional regression in the project's README: the star history chart stopped rendering because the GitHub stargazer API it depends on is subject to access restrictions. The contributor proposes a token-free alternative service with a verified chart URL. This indicates ongoing community interest in keeping the project's public-facing documentation accurate and visually functional, even amid low overall activity.

## 5. Bugs & Stability
- **Medium severity:** Broken star history chart in README, caused by reliance on the GitHub stargazer API being access-restricted. The chart fails to render for visitors. A fix exists in open PR [#989](https://github.com/nullclaw/nullclaw/pull/989); no other bugs, crashes, or regressions were reported in the last 24 hours.

## 6. Feature Requests & Roadmap Signals
No feature requests were filed or updated in the last 24 hours. The only roadmap-adjacent signal is PR #989, which is a maintenance fix rather than a new feature. No data suggests specific additions for the next version.

## 7. User Feedback Summary
Feedback data is limited to the single PR contribution. The author's pain point is the reliance on the GitHub stargazer API for README rendering, which breaks without a token — a friction point for both maintainers and visitors viewing the repository. The proposed solution (switching to a token-free chart service) suggests mild dissatisfaction with the current setup and a preference for dependency-light alternatives.

## 8. Backlog Watch
- [#989 fix: restore broken star history chart](https://github.com/nullclaw/nullclaw/pull/989) — Open since 2026-08-19 with no comments or maintainer response observed. As the only outstanding PR, it warrants maintainer attention to confirm the alternative chart service is acceptable and to merge or provide feedback, so the README regression is resolved.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-08-20

## 1. Today's Overview

High-activity day: 15 issues updated (9 open, 6 closed) and 39 PRs updated (21 open, 18 merged/closed), capped by the stable release of **ironclaw-v1.3.0**. The notification system made the biggest advance — the durable inbox contracts, storage, and product APIs merged (#7697) with three follow-up PRs (run outcomes, run gates, WebUI notification center) still open. The capability-response-normalization effort progressed with two of three PRs merged (#7686, #7692), and a CI-stability fix (#7756) landed to stop merge-queue timeouts caused by unbounded `apt-get` operations. New v1.4.0-scoped work is underway on persistent per-user sandboxes (#7732 / #7751) and bounded automation creation preflight (#7742 / #7743).

## 2. Releases

**ironclaw-v1.3.0** (2026-08-19) — stable promotion of `1.3.0-rc.2`, including all RC1/RC2 scope.

- **Fixed:** Upgrades from 1.2 now accept and preserve the released extension `activation_state` field instead of crash-looping during state application.
- **Breaking changes:** None indicated — this is a stability/upgrade-fix promotion.
- **Migration notes:** The 1.2→1.3 upgrade path is the explicitly validated fix; users still on 1.2 should upgrade to resolve the `activation_state` crash-loop.

## 3. Project Progress

Merged/closed PRs today:

- **#7754** — Release promotion `1.3.0-rc.2` → `1.3.0` (version + lockfile only, no behavior change). https://github.com/nearai/ironclaw/pull/7754
- **#7756** — CI fix: bounded every unbounded CI operation (apt hangs, uncapped jobs, external downloads); addresses merge-queue timeouts across 69 cancelled runs / 1,193 jobs. https://github.com/nearai/ironclaw/pull/7756
- **#7752** — Subagent activation provenance, `activate()` primitive, and derived autonomous-wake cap (slice 1). Foundation for background subagents with no production behavior change yet. https://github.com/nearai/ironclaw/pull/7752
- **#7697** — Durable user inbox and product APIs: typed notification contracts, per-recipient storage, pagination, unread counts, read/archive lifecycle. https://github.com/nearai/ironclaw/pull/7697
- **#7692** — Normalized provider failures and auth diagnostics for model context (PR 2 of the capability-response-normalization plan). https://github.com/nearai/ironclaw/pull/7692
- **#7686** — Centralized capability outcome processing in `ironclaw_host_runtime` (PR 1 of the same plan; behavior-preserving). https://github.com/nearai/ironclaw/pull/7686
- **#6994** — OOBE automation-tasks prototype (WebUI carousel, inline cards, agent-mode pill), gated behind an off-by-default flag; closes onboarding epic #7044. https://github.com/nearai/ironclaw/pull/6994

Correspondingly closed issues: #7044 (channel-first onboarding epic), #7688 (notification inbox contracts), #7681 (Slack unlinked-user connect message), #7602 (Tier 2 lease-fence token cache), #7603 (Tier 3 checkpoint batching), #6993 (OOBE backend wiring).

## 4. Community Hot Topics

- **#7732 — Epic: Persistent per-user sandbox with iron-proxy** (7 comments, the most-commented item this cycle). Discusses replacing create/remove-per-command Docker containers with a reusable per-user container; `/workspace` persistence per `(tenant, user)`; loop executors deferred. Directly tied to open PR #7751 (Step 1, Docker Exec). https://github.com/nearai/ironclaw/issues/7732
- **#5998 — No transport for local/on-device MCP servers** (open since 07-11; 1 comment). `stdio` is rejected and loopback HTTP is denied, blocking local MCP development entirely. Now has a proposed fix from a new contributor: PR #7757. https://github.com/nearai/ironclaw/issues/5998
- **#7603 — Tier 3: Batch BeforeModel checkpoints** (2 comments; closed). Performance-driven issue estimating −14 rows/turn by batching checkpoint writes; closed with the tier work. https://github.com/nearai/ironclaw/issues/7603

Underlying needs: developers want on-device/local tooling (MCP over loopback), persistent per-user compute environments, and reduced database write pressure per turn.

## 5. Bugs & Stability

Ranked by severity:

1. **#7748 — "IronClaw got confused and stopped working"** (open). User-reported complete work stoppage via Slack; no repro details and no fix PR yet — highest severity due to total failure, but under-investigated. https://github.com/nearai/ironclaw/issues/7748
2. **#7745 — Copilot MCP extension install fails** (P2, qa-bug). `auth_required` error, duplicate catalog entries (`mcp-gh-copilot-mcp` vs. a second Copilot entry), and unclear token type. Blocks a flagship extension install on Railway QA. No fix PR yet. https://github.com/nearai/ironclaw/issues/7745
3. **#7744 — Cron job UI missing edit and test buttons** (P3, qa-bug). Users can view jobs and status but cannot edit or manually trigger them; no fix PR yet. https://github.com/nearai/ironclaw/issues/7744
4. **#7760 — Unpinned lineage-drop in `AgentTurnProcessStateMetadata::from_state`** (open). Deliberate dropping of subagent lineage on state-derived rewrites is not covered by tests; needs a pin to prevent accidental behavior change. https://github.com/nearai/ironclaw/issues/7760
5. **CI merge-queue timeouts** — every stall traced to unbounded `apt-get` (69 runs, 1,193 jobs affected); fixed and merged in #7756. https://github.com/nearai/ironclaw/pull/7756

Also fixed via the 1.3.0 release: 1.2→1.3 upgrade crash-loop on the extension `activation_state` field.

## 6. Feature Requests & Roadmap Signals

- **Persistent per-user sandbox** (#7732, v1.4.0 epic; PR #7751 implements Step 1 with reusable per-user containers and Docker Exec). Strong next-version candidate. https://github.com/nearai/ironclaw/issues/7732
- **Local MCP server on literal loopback IP** (#5998; PR #7757 by a new contributor). Long-requested capability for on-device MCP; likely to land soon if reviewed. https://github.com/nearai/ironclaw/pull/7757
- **Bounded automation creation preflight** (#7742; PR #7743). Adds a `ready` / `needs_setup` / `needs_input` protocol to distinguish authoring from executing automations; part of #6879. https://github.com/nearai/ironclaw/issues/7742
- **Notification product surface** — inbox backend merged (#7697); open PRs #7699 (actionable run gates), #7700 (authoritative run outcomes), #7698 (generalized WebUI notification center) point to full notification UX in the next release. https://github.com/nearai/ironclaw/pull/7699
- **WASM typed tool response, guest migration, and dispatch-error cleanup** (#7711) — final PR of the capability-response-normalization stack. https://github.com/nearai/ironclaw/pull/7711
- **Design System / Storybook epic** (#7038) and **IronHub agent-link operator surface** (#7516) remain open longer-term signals. https://github.com/nearai/ironclaw/issues/7038

Prediction: v1.4.0 will likely bundle persistent sandboxes, the notification center/run-gate UX, automation preflight, and loopback-MCP support.

## 7. User Feedback Summary

- **Reliability complaint:** A Slack user (bianca.guimaraes-chadwick) reported "It just got confused and stopped working" — a clear satisfaction risk, currently lacking repro detail (#7748). https://github.com/nearai/ironclaw/issues/7748
- **Slack onboarding privacy:** Unlinked users received a public connect notice in shared channels plus a manual round trip; fixed and closed (#7681). https://github.com/nearai/ironclaw/issues/7681
- **Local-development blocker:** Users cannot connect MCP servers running on the same machine (stdio rejected, loopback HTTP denied) — a recurring pain point since July (#5998). https://github.com/nearai/ironclaw/issues/5998
- **Cron management gap:** Users can view cron jobs but not edit or test them from the UI (#7744). https://github.com/nearai/ironclaw/issues/7744
- **Extension install friction:** Copilot MCP install fails with confusing auth/token requirements and duplicate catalog entries (#7745). https://github.com/nearai/ironclaw/issues/7745

## 8. Backlog Watch

- **#5998 — Local MCP transport** (open 40 days). Now has a fix PR (#7757) from a new contributor; needs maintainer review to avoid further stall. https://github.com/nearai/ironclaw/issues/5998
- **#7516 — Operator surface for IronHub agent link** (open since 08-12, new contributor). WebUI cannot complete an agent link without CLI access; PR awaiting attention. https://github.com/nearai/ironclaw/pull/7516
- **#7456 — Profile-agnostic durable storage** (open since 08-10, core contributor, risk: medium). Restructures Reborn storage roots and security envelope; no activity in the last day. https://github.com/nearai/ironclaw/pull/7456
- **#7038 — Design System / Storybook epic** (open since 08-03). Large UX proposal package still awaiting momentum; referenced proposal PR #7257. https://github.com/nearai/ironclaw/issues/7038

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI Project Digest — 2026-08-20

## 1. Today's Overview

The project saw moderate activity: 9 PRs were updated (8 closed, 1 still open) and 2 issues were touched, both remaining open. Most of the closed PRs are April-era items (`#1545`–`#1560`) that were swept in a stale-triage pass, suggesting maintainers are actively cleaning an aging backlog rather than shipping those changes — notably, the feature request in `#1552` remains open despite a linked implementation PR being closed. The genuinely fresh work is on Windows installer tooling (`#2511`, `#2512`, authored 2026-08-19), which indicates active build/distribution engineering. No new releases were published. Overall, the project is healthy but in a "consolidation" phase: backlog hygiene + Windows packaging hardening, with no release cadence activity.

## 2. Releases

None in this window.

## 3. Project Progress

The 8 closed PRs break into two distinct groups:

**Fresh Windows installer work (2026-08-19/20):**
- **[#2511 — fix(installer): support silent upload-first web builds](https://github.com/netease-youdao/LobsterAI/pull/2511)** — Adds a two-pass Windows web-installer flow that reuses an already-uploaded NOS-hosted package, rebuilds only the signed WebSetup stub, and enforces a before/after SHA-256 invariant so the stub pass cannot invalidate the uploaded payload.
- **[#2512 — fix(installer): hide banner for dictbind silent package](https://github.com/netease-youdao/LobsterAI/pull/2512)** — Suppresses the plugin-owned silent banner only for the dictbind double-click-silent channel, preserving existing behavior for other silent install paths and keeping UAC/RequestExecutionLevel unchanged.

**April-era PRs closed in the stale sweep (not merged per remaining open linked issues):**
- **[#1545 — fix(agent): sync activeSkillIds immediately when updating current agent's skills](https://github.com/netease-youdao/LobsterAI/pull/1545)** — Fixes the agent settings panel not refreshing Active Skill Badges until switching agents; root cause was `updateAgent()` not updating `state.skill.activeSkillIds`.
- **[#1546 — feat(engine-overlay): 引擎启动超时后显示取消启动和查看日志按钮](https://github.com/netease-youdao/LobsterAI/pull/1546)** — After 30s of engine startup, shows "Cancel startup" and "View logs" escape buttons instead of forcing a 5-minute hard timeout.
- **[#1553 — feat(cowork): Write 工具文件卡片及分屏预览面板](https://github.com/netease-youdao/LobsterAI/pull/1553)** — Inline file card for Write tool results plus a resizable 320–900px preview panel (Markdown, HTML sandbox iframe, SVG, images, syntax-highlighted code). Linked to `#1552`, which is **still open** — this PR did not merge.
- **[#1555 — fix: npm run dist:mac:x64打包失败](https://github.com/netease-youdao/LobsterAI/pull/1555)** — macOS lacks `sha256sum`; adds `shasum` compatibility in `build-openclaw-runtime.sh`.
- **[#1557 — feat(settings): 设置面板侧栏支持搜索筛选分类](https://github.com/netease-youdao/LobsterAI/pull/1557)** — Search box in the settings sidebar with NFKC-normalized, AND-matched Chinese/English keyword filtering; auto-switches tab when the selected one is filtered out.
- **[#1560 — fix: 修复Agent编辑后点击原Agent无法切换回聊天界面的问题](https://github.com/netease-youdao/LobsterAI/pull/1560)** — `SidebarAgentList.handleSwitch` early-returned on the already-selected agent, stranding users on the "My Agents" screen after editing.

## 4. Community Hot Topics

- **[#1556 — [OPEN] doc bug: IM机器人配置指南404](https://github.com/netease-youdao/LobsterAI/issues/1556)** — Most-commented item (2 comments). Users are hitting a 404 on the IM bot configuration guide at `lobsterai.youdao.com`. Underlying need: broken documentation is hurting onboarding for IM integration, a core LobsterAI use case.
- **[#1552 — [OPEN] feat: AI产物 Markdown 预览及文件卡片支持](https://github.com/netease-youdao/LobsterAI/issues/1552)** — 1 comment. Users want inline file card + preview after Write tool calls, citing poor UX when agents generate Markdown/HTML/code: reading content into chat wastes context, and switching to the file manager is disruptive. This is the clear community priority for agent-output ergonomics.

## 5. Bugs & Stability

Ranked by severity:

1. **Mac packaging broken (High)** — `npm run dist:mac:x64` fails on macOS because the runtime build script assumes `sha256sum`, which macOS doesn't ship. Fix exists in **[#1555](https://github.com/netease-youdao/LobsterAI/pull/1555)** (closed; needs verification/re-merge against current main).
2. **Scheduled task notification state bug (Medium)** — **[#1547](https://github.com/netease-youdao/LobsterAI/pull/1547)** (OPEN): after selecting an IM channel then saving "不通知" (no notification), re-editing the task shows the previous IM channel instead of "none". Root cause traced to inconsistent handling of `delivery.mode` in `TaskForm.tsx`. A +2-line fix is ready but not yet merged.
3. **Agent switch dead-end (Medium/Low)** — Editing an agent and clicking the previously selected agent doesn't return to chat. Fixed in **[#1560](https://github.com/netease-youdao/LobsterAI/pull/1560)** (closed stale; fix still needed).
4. **Stale Active Skill Badges (Low)** — Skill list changes don't reflect in the UI until manual agent switch. Fix in **[#1545](https://github.com/netease-youdao/LobsterAI/pull/1545)** (closed stale).
5. **Docs 404 (Low) — [#1556](https://github.com/netease-youdao/LobsterAI/issues/1556)** — IM configuration guide returns 404. No fix PR yet.

## 6. Feature Requests & Roadmap Signals

- **AI artifact preview is the strongest roadmap signal.** Issue [#1552](https://github.com/netease-youdao/LobsterAI/issues/1552) and its associated PR [#1553](https://github.com/netease-youdao/LobsterAI/pull/1553) cover file cards, Markdown/HTML/SVG/code preview, and a split-pane panel. Although the PR was stale-closed, the spec is complete and the underlying need persists — expect this to be re-implemented in an upcoming release, possibly with the FilePreviewPanel architecture from `#1553`.
- **Settings UX improvements appear committed.** Sidebar search/filter ([#1557](https://github.com/netease-youdao/LobsterAI/pull/1557)) and engine-overlay escape controls ([#1546](https://github.com/netease-youdao/LobsterAI/pull/1546)) address long-standing usability complaints about the settings panel and startup hangs.
- **Windows distribution expansion.** The August installer PRs ([#2511](https://github.com/netease-youdao/LobsterAI/pull/2511), [#2512](https://github.com/netease-youdao/LobsterAI/pull/2512)) signal investment in silent/upload-first web installers and channel-specific packaging (dictbind) — likely preparing for broader or automated Windows rollout.
- **Feedback from raw April dates:** the delayed re-emergence of old fixes (Apr → Aug) suggests the team is merging long-pending robustness work into a single larger release rather than shipping incrementally.

## 7. User Feedback Summary

- **Documentation integrity:** direct report of a broken IM configuration guide link, with user-provided screenshot — dissatisfaction with docs availability for a key integration feature.
- **Workflow pain in agent-generated files:** users dislike pasting large file contents into chat to preview agent output; they want in-app preview and file cards immediately after Write calls. The request explicitly calls out writing/document-generation scenarios as currently poor experiences.
- **Configuration persistence confusion:** the scheduled-task notification bug (`#1547`) shows settings silently reverting/not honoring "none", eroding trust in saved configuration.
- **Navigation friction:** the agent-edit-then-click bug (`#1560`) and stale skill badges (`#1545`) are small but recurrent UI inconsistencies that interrupt flow in the agent management workflow.
- **Positive signal:** the detailed, well-scoped feature requests (with screenshots and exact acceptance criteria) suggest a technically engaged user base that is collaborating constructively with maintainers.

## 8. Backlog Watch

- **[#1547 — fix(scheduledTask) OPEN PR](https://github.com/netease-youdao/LobsterAI/pull/1547)** — The only non-stale open PR. Reviewed-ready, tiny (+2 lines), fixes a real configuration bug. Needs maintainer review/merge before the next snapshot.
- **[#1556 — doc 404 (OPEN, stale since Apr, 2 comments)](https://github.com/netease-youdao/LobsterAI/issues/1556)** — Unanswered for over 4 months. A doc-fix PR would be trivial and resolves visible community frustration.
- **[#1552 — file preview feature (OPEN, stale since Apr)](https://github.com/netease-youdao/LobsterAI/issues/1552)** — Its implementation PR was swept as stale; the issue needs an explicit decision: re-open the feature branch, assign to a milestone, or close with a rationale.
- **April stale-sweep casualties** — PRs [#1545](https://github.com/netease-youdao/LobsterAI/pull/1545), [#1546](https://github.com/netease-youdao/LobsterAI/pull/1546), [#1553](https://github.com/netease-youdao/LobsterAI/pull/1553), [#1555](https://github.com/netease-youdao/LobsterAI/pull/1555), [#1557](https://github.com/netease-youdao/LobsterAI/pull/1557), [#1560](https://github.com/netease-youdao/LobsterAI/pull/1560) contain fully specified fixes (mac packaging, agent switch, skill sync, settings search, startup overlay) that were closed without merge. The mac packaging fix (`#1555`) is especially time-sensitive. If still valid against current main, they should be rebased and re-opened rather than lost.

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

## Moltis Project Digest — 2026-08-20

### 1. Today's Overview
Moltis saw a fully merged, zero-open-items day. Four pull requests were closed and merged, the only recently reported open issue was closed by its fix, and a new release (20260818.10) was published. All activity landed in the mainline with no remaining open PRs or active issues at end of day. The work focused on security hardening and WhatsApp channel correctness, indicating a mature maintenance phase with fast turnaround on bug reports.

### 2. Releases
- **20260818.10** — published 2026-08-18. No changelog details are included in the available data. The release predates the fixes merged in this window (Aug 19–20), so those changes are expected in a subsequent build.

### 3. Project Progress
All four PRs updated in the last 24 hours were merged/closed:

- **[PR #1216](https://github.com/moltis-org/moltis/pull/1216) — fix(httpd): require authentication for vault unlock and recovery** — Closes the CWE-306 security issue where vault unlock/recovery endpoints had no authentication.
- **[PR #1217](https://github.com/moltis-org/moltis/pull/1217) — fix(whatsapp): treat a reply to the bot as addressing it** — Fixes dropped messages in group chats when `mention_mode = "mention"`; replies are now recognized as directed at the bot.
- **[PR #1218](https://github.com/moltis-org/moltis/pull/1218) — fix(whatsapp): stop hardcoding the push name to "Moltis"** — Bot identity in WhatsApp presence/group chats now reflects the configured bot name instead of a hardcoded value.
- **[PR #1219](https://github.com/moltis-org/moltis/pull/1219) — fix(channels): make the untrusted-turn tool ceiling configurable** — Corrects a side effect of #1170 that denied all tools to untrusted turns in shared chats, making the ceiling configurable and restoring unreachable tool-policy layers.

### 4. Community Hot Topics
No issues or PRs accumulated comments or reactions in the last 24 hours. The two active topic clusters were:

- **Vault endpoint security** — [Issue #1177](https://github.com/moltis-org/moltis/issues/1177) drew the fix [PR #1216](https://github.com/moltis-org/moltis/pull/1216). Underlying need: trust/safety of authentication-critical HTTP endpoints.
- **WhatsApp group behavior** — [PR #1217](https://github.com/moltis-org/moltis/pull/1217) and [PR #1218](https://github.com/moltis-org/moltis/pull/1218) from the same contributor address the underlying need for reliable, correctly-labeled bot presence in group chats.

### 5. Bugs & Stability
- **Critical** — [Issue #1177](https://github.com/moltis-org/moltis/issues/1177) (CWE-306): `POST /api/auth/vault/unlock` and `POST /api/auth/vault/recovery` accepted unauthenticated remote calls because `/api/auth/` was blanket-allowlisted, enabling brute-force vault attacks. Fix merged in [PR #1216](https://github.com/moltis-org/moltis/pull/1216).
- **Medium** — [PR #1217](https://github.com/moltis-org/moltis/pull/1217): WhatsApp group replies to the bot were dropped as "bot was not mentioned," breaking conversational flow in mention mode. Fixed.
- **Medium** — [PR #1219](https://github.com/moltis-org/moltis/pull/1219): Regression from #1170 made untrusted-turn tool policy a hardcoded deny-all, removing public-audience tools and making policy layers 4–5 unreachable in some shared contexts. Now configurable and fixed.
- **Low** — [PR #1218](https://github.com/moltis-org/moltis/pull/1218): Hardcoded WhatsApp push name misidentified bots in group chats. Fixed.

### 6. Feature Requests & Roadmap Signals
No explicit user feature requests were filed in this window. The main roadmap signal is **[PR #1219](https://github.com/moltis-org/moltis/pull/1219)**, which converts a hardcoded tool-policy ceiling into a configurable setting — indicating continued investment in granular, per-channel tool policy and audience-based trust boundaries. The cluster of WhatsApp fixes also signals ongoing hardening of channel integrations; further channel-level configurability is a reasonable expectation for the next version.

### 7. User Feedback Summary
No direct user comments, reactions, or qualitative feedback landed in the last 24 hours. Reconstructed pain points from the data: users reported a serious security exposure with vault unlock/recovery endpoints ([#1177](https://github.com/moltis-org/moltis/issues/1177)) and experienced broken WhatsApp group interactions where replies to the bot were ignored and bot identity was wrong. The fast close of the security issue and the same-day merging of all fixes indicate a responsive maintainer team, which is a positive satisfaction signal.

### 8. Backlog Watch
No open issues or open PRs remain. The backlog is clear; there are no long-unanswered items requiring maintainer attention.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw Project Digest — 2026-08-20

## 1. Today's Overview

CoPaw saw a high-activity day with 45 PRs updated (26 merged/closed, 19 open) and 19 issues touched (16 closed, 3 open). No new releases were published, so the project is operating on QwenPaw 2.1.0-beta/2.0.1 as the latest available versions. A strong bug-fix wave landed today covering remote media download failures, corrupt `envs.json` handling, uploaded filename preservation, and skill deduplication. Feature work remains active, including a self-hosted multi-user Hub, a unified marketplace, and a MiniMax M3 provider addition. Maintenance health is generally solid, though CI flakiness and E2E test stability required two dedicated fix PRs.

## 2. Releases

No new releases were published in the last 24 hours. The most recent versions in circulation remain QwenPaw 2.0.1 (stable desktop/pip) and 2.1.0-beta, with 2.1.0 referenced in bug reports as carrying the ReMe 0.4.1.5 and agentscope 2.0.4.post1 stack.

## 3. Project Progress

The following PRs were merged/closed today and advanced the codebase:

- **[fix(envs): preserve corrupt files and write envs atomically](https://github.com/agentscope-ai/QwenPaw/pull/7135)** (#7135) — Fixes [#7118](https://github.com/agentscope-ai/QwenPaw/issues/7118), where an unparseable `envs.json` was silently overwritten, losing all stored environment variables.
- **[fix(view_image): freeze remote images before persisting tool results](https://github.com/agentscope-ai/QwenPaw/pull/7146)** (#7146) — Remote `view_image` URLs are now downloaded with bounded size/timeout/redirect/SSRF protections and persisted as immutable Base64 blocks, preventing broken links from destroying conversation turns.
- **[fix: recover from remote media download timeouts](https://github.com/agentscope-ai/QwenPaw/pull/7138)** (#7138) — Addresses conversations getting stuck when a provider returns `Timeout while downloading url`.
- **[fix(files): preserve uploaded filenames in hints](https://github.com/agentscope-ai/QwenPaw/pull/6492)** (#6492) — Closes [#6453](https://github.com/agentscope-ai/QwenPaw/issues/6453); the console now retains browser-supplied original filenames (e.g., Chinese names) in user-facing messages instead of UUID-prefixed paths.
- **[refactor(cli): refactor skill CLI, add search, add batch enable/disable](https://github.com/agentscope-ai/QwenPaw/pull/7140)** (#7140) — Adds searchable filtering to `qwenpaw skills config` and batch enable/disable, addressing [#7090](https://github.com/agentscope-ai/QwenPaw/issues/7090).
- **[fix(skill): remove skill bound duplication](https://github.com/agentscope-ai/QwenPaw/pull/7097)** (#7097) — Deduplicates workspace and bound skills by SKILL.md frontmatter name, resolving [#7073](https://github.com/agentscope-ai/QwenPaw/issues/7073).
- **[refactor(config): make agent config loading async by default](https://github.com/agentscope-ai/QwenPaw/pull/7114)** (#7114) — Promotes `load_agent_config_async` to the public `load_agent_config` API and moves sync loading to a private method.
- **[fix(memory): avoid noisy inbox notifications for unchanged jobs](https://github.com/agentscope-ai/QwenPaw/pull/7115)** (#7115) — Auto-Memory/Auto-Dream now stay silent when a job runs successfully with no actual changes; only meaningful updates or failures notify users.
- **[feat(computer-use): observe related window surfaces](https://github.com/agentscope-ai/QwenPaw/pull/7037)** (#7037) — Computer Use now observes up to three related windows (menus, drop-downs, owned dialogs) while keeping the selected window as the stable target.
- **[fix(xiaoyi): report proactive send failures and normalize session IDs](https://github.com/agentscope-ai/QwenPaw/pull/7147)** (#7147) — XiaoYi channel now surfaces delivery failures and handles `xiaoyi:`-prefixed session IDs correctly.
- **[ci(datapaw): add a standalone version-driven release pipeline](https://github.com/agentscope-ai/QwenPaw/pull/7089)** (#7089) — Datapaw plugin gets its own release pipeline independent of main QwenPaw cadence.
- **[fix(e2e): dismiss Try Desktop Mode onboarding overlay before tests](https://github.com/agentscope-ai/QwenPaw/pull/7157)** (#7157) — Unbreaks the nightly E2E job, red for 8 consecutive runs since #6645 introduced the overlay.
- **[test(unit): widen timing tolerance for flaky sandbox offload test](https://github.com/agentscope-ai/QwenPaw/pull/7155)** (#7155) — Stabilizes `test_sandbox_slow_setup_does_not_consume_offload_budget`.
- **[fix(website): home WorksForYou & update blog & add QwenPaw Creator blog](https://github.com/agentscope-ai/QwenPaw/pull/7038)** (#7038) — Website content updates.

## 4. Community Hot Topics

- **[#2884 — Personal directory wiped after installing CoPaw on Ubuntu 22.04](https://github.com/agentscope-ai/QwenPaw/issues/2884)** — 27 comments, the most active issue by far. The user reports near-total deletion of their home directory contents and the software itself on the day of installation. The issue is closed but was still being updated as recently as August 19, indicating an ongoing discussion around root-cause attribution (CoPaw behavior vs. external compromise).
- **[#6826 — Assistant message end time displays incorrectly](https://github.com/agentscope-ai/QwenPaw/issues/6826)** — 4 comments. A 2-minute real thinking time is shown as a few seconds in the UI; QwenPaw 2.0.1, Windows 11, pip install.
- **[#6847 — Qwenpaw gets killed by antivirus while WorkBuddy does not](https://github.com/agentscope-ai/QwenPaw/issues/6847)** — 4 comments. Users report antivirus software force-terminating Qwenpaw during task execution; likely a false-positive or behavioral-trigger concern affecting production trust.
- **[#7013 — Unified tool panel, web service preview and interactive terminal for Chat](https://github.com/agentscope-ai/QwenPaw/issues/7013)** — 3 comments, open. A substantial UX proposal for an agent development workbench (file preview, diffs, local web services, web terminal).
- **[#7110 — Undownloadable image URL renders an entire conversation unusable](https://github.com/agentscope-ai/QwenPaw/issues/7110)** — 3 comments. Model-hallucinated or network-blocked image links permanently break the session until `/clear`; fixed by PRs #7138 and #7146.

## 5. Bugs & Stability

Ranked by severity:

1. **Potential data loss — [#2884 directory content cleared on Ubuntu 22.04](https://github.com/agentscope-ai/QwenPaw/issues/2884)** (27 comments, closed) — The most severe report, alleging home-directory deletion after a fresh install. Old (April) but still being updated; warrants a maintainer post-mortem or public explanation to settle user concern.
2. **Silent env var loss — [#7118 corrupt envs.json is swallowed and overwritten](https://github.com/agentscope-ai/QwenPaw/issues/7118)** — Fixed by [#7135](https://github.com/agentscope-ai/QwenPaw/pull/7135), which preserves the corrupt file for inspection and switches to atomic writes.
3. **Conversation bricking — [#7110 undownloadable image link kills session](https://github.com/agentscope-ai/QwenPaw/issues/7110)** — Fixed by [#7138](https://github.com/agentscope-ai/QwenPaw/pull/7138) (remote media download timeouts) and [#7146](https://github.com/agentscope-ai/QwenPaw/pull/7146) (immutable Base64 image freezing).
4. **Embedding health check failure — [#7156 health check times out even when backend is warm; timeout hardcoded](https://github.com/agentscope-ai/QwenPaw/issues/7156)** — Open, new today. With QwenPaw 2.1.0, a warm Ollama backend (0.5s embed) still fails the 5s health check (10.4s elapsed), silently degrading to BM25-only retrieval. The hardcoded timeout in `reme/...` needs a config knob.
5. **Antivirus termination — [#6847 process killed by security software](https://github.com/agentscope-ai/QwenPaw/issues/6847)** — Closed with 4 comments; a compatibility/packaging issue that erodes user confidence.
6. **Memory pipeline gap — [#6624 auto-compression (Scroll) does not trigger `summarize_when_compact`](https://github.com/agentscope-ai/QwenPaw/issues/6624)** — Closed; manual `/compact` works but automatic token-threshold eviction bypasses the memory summarization flow.
7. **UI timing — [#6826 message end time shows seconds instead of actual thinking duration](https://github.com/agentscope-ai/QwenPaw/issues/6826)** — Closed; cosmetic but misleading for users evaluating model performance.
8. **No startup — [#3177 CoPaw app cannot launch on Windows](https://github.com/agentscope-ai/QwenPaw/issues/3177)** — Closed; garbled wrapper output (`锘緻echo` / `芒聙聶`) suggests a UTF-8 BOM/encoding defect in the CLI wrapper batch file.

## 6. Feature Requests & Roadmap Signals

- **Skill management UX (shipped)** — Search/filter and batch enable/disable in the skill CLI ([#7090](https://github.com/agentscope-ai/QwenPaw/issues/7090)) landed via [#7140](https://github.com/agentscope-ai/QwenPaw/pull/7140). A concurrent open issue asks for the same search/filter experience in the GUI skill import page.
- **Chinese filename preservation (shipped)** — [#6453](https://github.com/agentscope-ai/QwenPaw/issues/6453) closed by [#6492](https://github.com/agentscope-ai/QwenPaw/pull/6492): uploaded Chinese filenames now survive into LLM context hints.
- **Agent workbench — [#7013 unified tool panel, Web service preview, interactive terminal](https://github.com/agentscope-ai/QwenPaw/issues/7013)** — Open, cross-cutting feature touching core, console, and channels; the strongest roadmap signal for a more complete agent development loop.
- **DingTalk context modes — [#7158 configurable per-group shared vs. isolated contexts](https://github.com/agentscope-ai/QwenPaw/issues/7158)** — New today; a channel-specific collaboration feature, likely candidate for 2.1.x.
- **Self-hosted multi-user Hub — [#7112 open PR](https://github.com/agentscope-ai/QwenPaw/pull/7112)** — Opt-in control plane running isolated QwenPaw instances for local accounts via `qwenpaw hub`; could become a flagship enterprise-facing feature.
- **Unified marketplace — [#6880 open PR](https://github.com/agentscope-ai/QwenPaw/pull/6880)** — Consolidates app/plugin/skill marketplaces under a shared `/market` page.
- **Deep research/execution — [#3074](https://github.com/agentscope-ai/QwenPaw/issues/3074) and [#3260](https://github.com/agentscope-ai/QwenPaw/issues/3260)** — Users continue to request DeerFlow-style harness/longGraph orchestration and ACP/Codex/OpeCode support. Repeated asks signal demand for structured deep-research workflows.
- **Proactive memory — [#3082 make the agent consult memory.md when uncertain](https://github.com/agentscope-ai/QwenPaw/issues/3082)** — Wants "checking the map" to be a standing behavior, not dependent on context overflow.
- **Custom storage paths — [#3018 user config path customization](https://github.com/agentscope-ai/QwenPaw/issues/3018)** — Closed but still relevant for power users managing skills/core files/agents across machines.
- **MiniMax M3 — [#4881 open PR](https://github.com/agentscope-ai/QwenPaw/pull/4881)** — Adds MiniMax-M3 as the default built-in model for both CN and international endpoints.
- **CI gating — [#6764 open PR](https://github.com/agentscope-ai/QwenPaw/pull/6764)** — Makes required status checks mandatory on `main` after a regression was merged with three failing test jobs; important for long-term stability.

## 7. User Feedback Summary

- **Chinese-language user base dominates the conversation**, with 17 of 19 issues written in Chinese. Localization and CJK filename handling are recurring themes — [#6453](https://github.com/agentscope-ai/QwenPaw/issues/6453) was directly addressed by a merge today, which is positive signal.
- **Serious trust concern around data safety**: the #2884 report (home directory wiped, 27 comments) remains the loudest unresolved fear, even though the issue is technically closed. No maintainer explanation is visible in the provided data.
- **Security software conflicts (#6847)** and **browser automation weakness (#3261)** are eroding user willingness to rely on QwenPaw for long-running or unattended tasks.
- **Memory behavior is a top expectation**: users are frustrated when the agent forgets or when automatic compression does not follow the configured summarization rules (#6624, #3082).
- **Satisfaction signals**: users are actively requesting richer professional workflows (workbench, Hub, marketplace, DingTalk shared context), which suggests the existing UX is approaching production-ready and the community wants the next level of collaboration and control.

## 8. Backlog Watch

- **[#2884 — directory wipe report, 27 comments, closed but unresolved narrative](https://github.com/agentscope-ai/QwenPaw/issues/2884)** — The highest-signal item needing a maintainer follow-up or official statement; silence allows FUD to persist.
- **[#5861 — macOS packaged backend cannot discover user-installed tools (open PR since July 8)](https://github.com/agentscope-ai/QwenPaw/pull/5861)** — First-time contributor PR fixing login-shell PATH inheritance for Finder/Dock launches; awaiting review for over six weeks.
- **[#4881 — MiniMax M3 provider addition (open PR since June 1)](https://github.com/agentscope-ai/QwenPaw/pull/4881)** — A small, well-scoped change that has been under review for over two months.
- **[#6764 — CI gate on main (open PR since August 6)](https://github.com/agentscope-ai/QwenPaw/pull/6764)** — Defends against another regression-by-merge (already happened once with #6418); needs prioritization.
- **[#6880 — unified marketplace (open PR since August 10)](https://github.com/agentscope-ai/QwenPaw/pull/6880)** — Large UX consolidation under review; no visible roadmap commitment.
- **[#7150 — stalled LLM stream detection (open, new)](https://github.com/agentscope-ai/QwenPaw/pull/7150)** — Fixes the indefinite "Thinking" state when an upstream stream stops without closing; important for production reliability.
- **[#7112 — self-hosted multi-user Hub (open PR)](https://github.com/agentscope-ai/QwenPaw/pull/7112)** — Significant architectural addition currently without maintainer discussion in the visible data.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

# EasyClaw Project Digest — 2026-08-20

## 1. Today's Overview
EasyClaw published three consecutive releases (v1.8.101, v1.8.102, v1.8.103) within the observation window, indicating an active release cadence, but saw zero Issue or PR activity in the last 24 hours. All three releases focus on iterative hardening rather than new headline features, with emphasis on Feishu (Lark) integration stability, Gateway session management, and Affiliate collaboration workflows. The repo's open-source community surface (Issues/PRs) is currently dormant, with all observable progress occurring through version releases. Overall project health is stable; the project is shipping regularly but lacks visible community contribution momentum in this window.

## 2. Releases
Three new versions were published — [v1.8.101](https://github.com/gaoyangz77/easyclaw/releases), [v1.8.102](https://github.com/gaoyangz77/easyclaw/releases), [v1.8.103](https://github.com/gaoyangz77/easyclaw/releases). No breaking changes or migration notes were included; each release is an incremental improvement over the prior.

- **v1.8.103 — TK Copilot:** Improves Feishu final replies, Gateway session recovery, and Affiliate collaboration consistency.
- **v1.8.102 — TK Copilot:** Improves differential update reliability, Feishu connection stability, Affiliate offer editing, and Gateway execution approvals.
- **v1.8.101 — TK Copilot:** Improves Affiliate campaign terms, per-shop Working Agendas, device assignments, WMS validation, and Gateway provider persistence.

The fast succession of three patch-level versions suggests a rolling-fix workflow where issues are addressed and shipped quickly rather than batched into larger releases.

## 3. Project Progress
No Pull Requests were merged or closed in the last 24 hours, and no PRs are currently open. However, the three releases indicate forward movement in several subsystems:
- **Gateway/execution layer:** session recovery (v1.8.103), execution approvals (v1.8.102), provider selection persistence (v1.8.101).
- **Feishu integration:** final reply handling (v1.8.103), connection stability (v1.8.102).
- **Affiliate/达人 workflows:** collaboration consistency (v1.8.103), offer editing (v1.8.102), campaign terms (v1.8.101).
- **Infrastructure:** per-shop Working Agendas, device assignment, and WMS validation (v1.8.101); differential update reliability (v1.8.102).

## 4. Community Hot Topics
No Issues or PRs were active in the last 24 hours, so there are no threads to analyze for community discussion, reactions, or needs. The repository's discussion surface is effectively quiet at this snapshot.

## 5. Bugs & Stability
No bugs, crashes, or regressions were reported via Issues in the last 24 hours. Indirectly, the releases contain stability-focused fixes that indicate previously known problem areas: Feishu connection drops, Gateway session loss, and unreliable differential updates. The rapid release of v1.8.102 and v1.8.103 immediately after v1.8.101 suggests the maintainers are actively patching regressions or stability issues introduced by newly shipped changes, though no public bug reports exist to confirm severity.

## 6. Feature Requests & Roadmap Signals
No explicit feature requests were filed in the observation window. Roadmap signals must be inferred from release notes:
- Deeper **Affiliate (达人) collaboration tooling** — campaign terms, offer editing, and consistency fixes are receiving repeated attention, suggesting this is an actively evolving business area.
- **Per-shop Working Agendas** and **device assignments** are newer capabilities that may expand in scope.
- **WMS validation** integration hints at supply-chain/warehouse use cases being explored.
- **Gateway execution approvals** point toward a governance/approval workflow layer that may get more features in upcoming versions.
- Given the pattern of three rapid releases, the next version (v1.8.104 or v1.9.x) will likely contain further Feishu and Gateway reliability fixes rather than major new functionality.

## 7. User Feedback Summary
With no Issues or PRs in the window, direct user feedback is unavailable. Indirect signals from release notes suggest recurring pain points: users relying on Feishu for final replies experienced connection instability; Gateway sessions were being lost, requiring recovery logic; and Affiliate collaboration state was inconsistent across sessions. The repeated "Improve/改善" phrasing across all three releases indicates a reactive maintenance mode, where reported frictions are being addressed incrementally. No signals of satisfaction or dissatisfaction can be assessed from this snapshot.

## 8. Backlog Watch
No open Issues or PRs exist in the observable data, so there are no long-unanswered threads requiring maintainer attention. The absence of a backlog suggests either a clean queue, or that issue reporting is happening outside the GitHub tracker (e.g., private channels), which is consistent with the project's release-driven, closed-loop maintenance pattern.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar).*