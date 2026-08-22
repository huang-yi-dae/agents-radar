# OpenClaw Ecosystem Community Daily — 2026-08-23

> Generated: 2026-08-23 02:30 (GMT+8) | Coverage: OpenClaw + 12 peer projects
> This digest is produced by the agents-radar local automation. All summaries, comparisons, and writing are done by the executing agent — no external LLM API was called.

- [OpenClaw](https://github.com/openclaw/openclaw)
- [NanoBot](https://github.com/HKUDS/nanobot)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [NanoClaw](https://github.com/qwibitai/nanoclaw)
- [NullClaw](https://github.com/nullclaw/nullclaw)
- [IronClaw](https://github.com/nearai/ironclaw)
- [LobsterAI](https://github.com/netease-youdao/LobsterAI)
- [TinyClaw](https://github.com/TinyAGI/tinyclaw)
- [CoPaw](https://github.com/agentscope-ai/CoPaw)
- [Moltis](https://github.com/moltis-org/moltis)
- [ZeptoClaw](https://github.com/qhkm/zeptoclaw)
- [EasyClaw](https://github.com/gaoyangz77/easyclaw)

---

## Cross-Ecosystem Comparison

# OpenClaw Cross-Ecosystem Comparison Report (2026-08-23)

## 1. Ecosystem Overview

The clearest signal across the OpenClaw ecosystem today: **security governance has graduated from "add a toggle" to "rebuild the trust model."** Zeroclaw pushed three stages of its `#8289` security epic in a single day — [#10248](https://github.com/zeroclaw-labs/zeroclaw/pull/10248) (canonical principals and shared authorization resolution, stage 2), [#10259](https://github.com/zeroclaw-labs/zeroclaw/pull/10259) (enforce authenticated principals over RPC, native + peercred, stage 3), and [#10255](https://github.com/zeroclaw-labs/zeroclaw/pull/10255) (`oidc.<alias>` token validation provider, stage 5). These are not scattered patches but a systematic rework that makes **"who is calling" a first-class citizen**. On the same day Moltis opened [#1230](https://github.com/moltis-org/moltis/issues/1230) (optional fail-closed error policy for mutating security hooks) and CoPaw landed [#7214](https://github.com/agentscope-ai/CoPaw/pull/7214) (documenting Access Policy as a fifth security layer) — three independent projects tightening the permission boundary from three angles on the same day.

Activity distribution remains sharply bimodal. **Zeroclaw (91 PRs) and OpenClaw core (54 PRs / 46 issues) lead**, followed by IronClaw (19 PRs), NanoClaw (16 PRs), and NanoBot (11 PRs). Meanwhile **NullClaw, TinyClaw, and ZeptoClaw have posted 0 issues / 0 PRs for multiple consecutive days and can be treated as de facto abandoned** (latest releases dated 2026-05-29, 2026-03-26, and 2026-04-07 respectively). EasyClaw is a special case: zero issues and zero PRs, yet it shipped five versions (v1.8.108 → v1.8.112) across 08-21 and 08-22 — **a pure release pipeline with no visible collaboration**, and its releases actually point at `gaoyangz77/rivonclaw` (the repo has been renamed).

## 2. Project Activity Comparison (last 24h)

| Project | Active Issues (new) | PRs (new) | Latest Release | Assessment |
|---------|--------------------|-----------|----------------|------------|
| **OpenClaw** | 46 (3) | 54 (22) | v2026.8.1-beta.2 (08-15) | High-intensity mainline polish |
| **Zeroclaw** | 9 (4) | **91 (12)** | v0.8.4 (08-02) | #1 by PR volume, security epic advancing |
| IronClaw | 9 (5) | 19 (8) | ironclaw-v1.3.0 (08-19) | CI/CD plus onboarding, in parallel |
| NanoClaw | 0 (0) | 16 (7) | v2.2.0 (08-13) | Purely PR-driven, multi-bot wiring |
| NanoBot | 0 (0) | 11 (6) | v0.3.0 (07-25) | Observability rework |
| PicoClaw | 2 (1) | 6 (0) | v0.3.1 (06-30) | Slow cadence, fixing MCP stability |
| LobsterAI | 2 (0) | 6 (0) | 2026.8.18 | Chinese-user-driven feature fills |
| CoPaw | 5 (2) | 5 (1) | v2.1.1-beta.1 (08-20) | Multimodal limits + security layering |
| Moltis | 1 (1) | 2 (2) | 20260820.01 (08-20) | Small but steady, security hook policy |
| EasyClaw | 0 (0) | 0 (0) | **v1.8.112 (08-22)** | Frequent releases, zero public collaboration |
| NullClaw | 0 (0) | 0 (0) | v2026.5.29 | **De facto abandoned (~3 months)** |
| TinyClaw | 0 (0) | 0 (0) | v0.0.20 (03-26) | **De facto abandoned (~5 months)** |
| ZeptoClaw | 0 (0) | 0 (0) | v0.9.2 (04-07) | **De facto abandoned (~4.5 months)** |

## 3. OpenClaw Core: Performance and Trustworthy Delivery Are Today's Two Threads

The most-discussed OpenClaw PR today is [#123535](https://github.com/openclaw/openclaw/pull/123535) "avoid session directory refresh storms" — **153💬, the highest discussion count in the entire ecosystem**. Pair it with [#127379](https://github.com/openclaw/openclaw/issues/127379) (the `/models` command pins the gateway main thread at 100%+ CPU because `buildModelsProviderData` is rebuilt repeatedly) and [#72717](https://github.com/openclaw/openclaw/issues/72717) (introduce a SQLite FTS index for `wiki_search` to speed up synthetic queries), and the pattern is obvious: **the mainline is paying down a specific class of performance debt — redundant rebuilds.**

The second thread is **contextual correctness of message delivery**. Today's new PRs [#127962](https://github.com/openclaw/openclaw/pull/127962) (preserve gateway context for inbound turns) and [#127797](https://github.com/openclaw/openclaw/pull/127797) (unify synchronous message hooks, 8💬), plus the already-merged [#126424](https://github.com/openclaw/openclaw/pull/126424) (scope session delivery to agent bindings) and [#124548](https://github.com/openclaw/openclaw/pull/124548) (persist sender identity for DM turns), form a single chain: **in multi-channel, multi-agent setups, "who does this message belong to and who should answer it" must be reliable.** Today's new issue [#128003](https://github.com/openclaw/openclaw/issues/128003) (subagent completion announcements never fire on OpenAI-compatible HTTP sessions, reporting "In-process gateway di…") is the gap in that chain.

Two **self-diagnosis distortion** problems deserve separate mention: [#87637](https://github.com/openclaw/openclaw/issues/87637) (`openclaw doctor` reports memory search as disabled while memory-core dreaming is actually running) and today's new PR [#127998](https://github.com/openclaw/openclaw/pull/127998) (Doctor's permission-fix suggestions list already-disabled automations). **A diagnostic tool whose story disagrees with system reality is more dangerous than having no diagnostics at all** — the same meta-problem as Gemini #22323 ("failure reported as success") on the CLI side today.

## 4. Peer Project Differentiation

- **Zeroclaw**: **#1 by PR volume today (91 active / 12 new) and the only project in the ecosystem doing systematic security rework.** Stages 2/3/5 of the `#8289` epic all advanced the same day (canonical principals, RPC authenticated principals, OIDC token validation), together with [#9574](https://github.com/zeroclaw-labs/zeroclaw/pull/9574) (authorization approval responder) and [#9203](https://github.com/zeroclaw-labs/zeroclaw/pull/9203) (authenticated HTTP fan-in), forming a complete identity-to-authorization path. The second thread is **context and token accounting**: [#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535) (anchor context compaction to a ratio of the model window, 22💬), [#9713](https://github.com/zeroclaw-labs/zeroclaw/pull/9713) (expose token accounting on history-trim events, 25💬), and [#9447](https://github.com/zeroclaw-labs/zeroclaw/pull/9447) (classify incomplete terminal responses, 20💬). **#9447 and today's empty-response complaint on the OpenCode CLI side are two ends of the same problem — one files the bug, the other writes the fix.** The standout provider work is [#9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109) (native Hailo-Ollama support, 44💬), pointing at local/edge inference. On governance, [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) (maintainer RFC decision-queue tracker, 13💬) and [#8396](https://github.com/zeroclaw-labs/zeroclaw/issues/8396) (RFC: make the wire protocol a first-class concept in provider construction and onboarding, 9💬) show the project has reached a scale that needs explicit process.
- **IronClaw**: today shows **CI/CD infrastructure and onboarding experience advancing in parallel.** On CI it landed four PRs, T1–T4: [#7821](https://github.com/nearai/ironclaw/pull/7821) (single setup-rust composite action: pinned toolchain, mold, centralized build profiles), [#7817](https://github.com/nearai/ironclaw/pull/7817) (nextest test pipeline, full failure signal, unthrottled on PRs), [#7819](https://github.com/nearai/ironclaw/pull/7819) (converge PR/queue checks, planner drift guard, default-features clippy on PRs), and [#7809](https://github.com/nearai/ironclaw/pull/7809) (normalize preflight: unified gate list, worktree safety hooks, self-printing REPRO) — **the classic "the team got big enough that we must pave the road first" signal.** On product, the highest-discussion items are [#7650](https://github.com/nearai/ironclaw/pull/7650) (derive run outcome from runtime evidence, 45💬) and [#7818](https://github.com/nearai/ironclaw/pull/7818) (subagent background mode: receipt-based spawn, per-child delivery, activation and self-healing sweeps). On onboarding it opened four issues in a row ([#7815](https://github.com/nearai/ironclaw/issues/7815) close the connect→suggest→thread loop, [#7812](https://github.com/nearai/ironclaw/issues/7812) suggestion generation should respect user-level tool permissions and use read-only tools, [#7823](https://github.com/nearai/ironclaw/issues/7823) Notion install fails, [#7822](https://github.com/nearai/ironclaw/issues/7822) Slack configuration fails) — **integration success rate is its most honest current bottleneck.**
- **NanoClaw**: 0 issues / 16 PRs, the **most purely PR-driven project** in the ecosystem. Today's new PRs cluster tightly around multi-bot and provider wiring: [#3438](https://github.com/qwibitai/nanoclaw/pull/3438) (config wizard offers "add another Telegram bot" when one already exists), [#3437](https://github.com/qwibitai/nanoclaw/pull/3437) (matching docs plus instance-aware pairing), [#3435](https://github.com/qwibitai/nanoclaw/pull/3435) (thread adapter instance through pairing, first-agent init, and the CLI welcome flow), and [#3355](https://github.com/qwibitai/nanoclaw/pull/3355) + [#3356](https://github.com/qwibitai/nanoclaw/pull/3356) (add an `/add-cursor` provider skill and a Cursor Agent SDK payload). On the engineering side, [#3442](https://github.com/qwibitai/nanoclaw/pull/3442) (validate `runtimeTier` via driver-isolated capability checks and pick a tier accordingly) and [#3443](https://github.com/qwibitai/nanoclaw/pull/3443) (drop better-sqlite3 from `onlyBuiltDependencies` and use its bundled prebuilds) are pragmatic trade-offs. Positioning: **the integration layer for many IM channels and many agent providers.**
- **NanoBot** (★47,283, the highest-starred peer): all 11 PRs today point at **observability and session lifecycle**: [#5486](https://github.com/HKUDS/nanobot/pull/5486) (unify turn observability, merged), [#5487](https://github.com/HKUDS/nanobot/pull/5487) (WebUI file-preview path fix plus subagent activity and lifecycle replay), [#5420](https://github.com/HKUDS/nanobot/pull/5420) (user-controlled turn resume), [#5483](https://github.com/HKUDS/nanobot/pull/5483) (prevent deleted sessions from being recreated by delayed messages), and [#5471](https://github.com/HKUDS/nanobot/pull/5471) (ephemeral runs must not mutate session state). There is also [#5484](https://github.com/HKUDS/nanobot/pull/5484) (flag MCP responses that return `isError=false` while carrying a business-error envelope) — **detecting "looks successful, actually failed" is today's recurring cross-ecosystem theme.** [#5156](https://github.com/HKUDS/nanobot/pull/5156) (recover from silently stalled Telegram polling, merged) is the same idea.
- **CoPaw**: the main thread is **multimodal limits and security layering**. [#7201](https://github.com/agentscope-ai/CoPaw/issues/7201) (per-provider `max_image_bytes` / `max_video_bytes` / `max_audio_bytes`) and [#7212](https://github.com/agentscope-ai/CoPaw/issues/7212) (inlining images whose pixel dimensions exceed provider limits crashes the request) are cause and effect — **missing limits turn directly into crashes.** [#7214](https://github.com/agentscope-ai/CoPaw/pull/7214) writes Access Policy into the README as a fifth security layer. Chinese-language UX feedback remains dense: [#7196](https://github.com/agentscope-ai/CoPaw/issues/7196) (always showing the reasoning trace is a serious visual distraction; make collapse-by-default configurable), [#7213](https://github.com/agentscope-ai/CoPaw/issues/7213) (session output always contains meaningless blank lines), and [#7043](https://github.com/agentscope-ai/CoPaw/issues/7043) (auto-run `chcp 65001` to switch to UTF-8 at startup, closed). On operations, [#7050](https://github.com/agentscope-ai/CoPaw/pull/7050) (per-cron-job model override selector) and [#7190](https://github.com/agentscope-ai/CoPaw/pull/7190) (PyPI runtime paths, one-command docker-compose demo, env inheritance) lower the self-hosting bar.
- **PicoClaw**: slow but effective. The core bug [#3269](https://github.com/sipeed/picoclaw/issues/3269) (a failed MCP server connection hangs the agent loop and takes down PicoClaw chat with it, 1👍/6💬) already has a matching fix in PR [#3337](https://github.com/sipeed/picoclaw/pull/3337). Today's new issue [#3343](https://github.com/sipeed/picoclaw/issues/3343) (after a failed turn the tool-feedback animation edits the same Telegram message forever) is the same "failure paths don't clean up" family. [#3222](https://github.com/sipeed/picoclaw/pull/3222) (deltachat implementation refactor, ~200 lines removed, 16💬) reflects its embedded-oriented preference for minimalism.
- **LobsterAI** (NetEase Youdao): entirely **driven by Chinese-language user requests**, with an extremely fast loop — [#1213](https://github.com/netease-youdao/LobsterAI/issues/1213) "add export-to-Markdown for session details" was filed and then implemented and merged via [#1214](https://github.com/netease-youdao/LobsterAI/pull/1214). Other fixes are equally close to daily use: [#1208](https://github.com/netease-youdao/LobsterAI/pull/1208) (manual retry button for transient errors), [#1212](https://github.com/netease-youdao/LobsterAI/pull/1212) (raise the custom-provider cap to 20), [#1205](https://github.com/netease-youdao/LobsterAI/pull/1205) (error toast when session rename fails), and [#1206](https://github.com/netease-youdao/LobsterAI/issues/1206) (on-prem kimi2.5 reprocesses analysis documents, closed). **"Filed today, merged today" is its biggest differentiator.**
- **Moltis**: small project, clear direction. All three items today are new: [#1230](https://github.com/moltis-org/moltis/issues/1230) (optional fail-closed error policy for mutating security hooks — **whether a failing hook defaults to allow or deny is a foundational security-model choice**), [#1229](https://github.com/moltis-org/moltis/pull/1229) (support Browserless v2 containers), and [#1231](https://github.com/moltis-org/moltis/pull/1231) (re-resolve the current MCP client after a service restart). That last one and OpenClaw [#68187](https://github.com/openclaw/openclaw/issues/68187) (SSE-backed MCP sessions remain stale after a service restart and report "Session not found") **are the exact same bug independently reproduced in two projects — MCP restart semantics are shared ecosystem-wide debt.**
- **The three abandoned projects (NullClaw / TinyClaw / ZeptoClaw)**: 0 issues / 0 PRs for multiple consecutive days, latest releases 3–5 months old. **Recommend down-weighting them in future selection and tracking.**
- **EasyClaw**: five releases across 08-21 to 08-22 (v1.8.108 → v1.8.112), but zero issues and zero PRs, and releases point at `gaoyangz77/rivonclaw` (repo renamed). **Frequent releases plus zero public collaboration means community health cannot be judged from public signals.**

## 5. Trend Signals Worth Watching

- **"Looks successful, actually failed" is now the ecosystem's #1 meta-problem.** It appeared independently in at least five places today: OpenClaw #87637 (doctor misreports memory search as disabled) and #128003 (subagent completion announcements never fire), NanoBot #5484 (`isError=false` while carrying a business-error envelope), Zeroclaw #9447 (incomplete terminal responses classified), and PicoClaw #3343 (animation edits forever after a failed turn). **Once agents run unattended for long stretches, "failures must be loud" matters more than "failures must not happen"** — the same root as Gemini #22323 and Qwen #9733 on the CLI side today.
- **The security model is being upgraded from "feature toggle" to "identity infrastructure."** Zeroclaw's canonical-principals / RPC-auth / OIDC three stages, Moltis's fail-closed hook policy, CoPaw's fifth security layer, and OpenClaw's install-policy warning acknowledgement requirement ([#116489](https://github.com/openclaw/openclaw/pull/116489), 49💬, merged) — **four projects tightening permissions at four levels on the same day means the risk of "agents hold real execution power" is now broadly understood.**
- **MCP restart and session semantics are shared technical debt.** Moltis #1231 and OpenClaw #68187 independently reproduce the same bug, and PicoClaw #3269 shows a failed MCP connection can hang an entire agent loop. **The MCP ecosystem lacks a shared "connection invalidation → rebuild → idempotent recovery" convention, so every project re-learns it the hard way.**
- **Performance debt has a highly consistent shape: redundant rebuilds.** OpenClaw #123535 (session directory refresh storms, 153💬), #127379 (`buildModelsProviderData` rebuilt repeatedly, pinning CPU), and #72717 (`wiki_search` lacks an FTS index) share the exact shape of OpenCode #44127 (redundant git subprocess spawns) and Codex #20864 (full scan of the sessions directory) on the CLI side. **Agent frameworks are broadly still in the "recompute everything each time" phase; caching and incrementality are the next clear optimization dividend.**
- **The ecosystem tail is thinning out naturally.** Of 13 peers, three are de facto abandoned and one has only a release pipeline; roughly eight show genuine ongoing collaboration. **The "claw family" explosion is over; consolidation has begun.**

---

## Per-Project Details

### OpenClaw ([openclaw/openclaw](https://github.com/openclaw/openclaw))

**Latest release**: [v2026.8.1-beta.2](https://github.com/openclaw/openclaw/releases/tag/v2026.8.1-beta.2) (08-15); latest stable is v2026.7.1-2 (08-04).

**High-discussion PRs**

| PR | Discussion | Summary |
|----|-----------|---------|
| [#123535](https://github.com/openclaw/openclaw/pull/123535) | **153💬** | Avoid session directory refresh storms — highest in the ecosystem |
| [#116489](https://github.com/openclaw/openclaw/pull/116489) | 49💬 (merged) | Install-policy warnings require explicit acknowledgement |
| [#123975](https://github.com/openclaw/openclaw/pull/123975) | 45💬 | typecheck hangs forever when tsgo stalls instead of failing |
| [#120900](https://github.com/openclaw/openclaw/pull/120900) | 44💬 (merged) | UI support for reviewing install-policy warnings |
| [#123189](https://github.com/openclaw/openclaw/pull/123189) | 28💬 | Restore embedded channel runs in chat startup projection |
| [#126618](https://github.com/openclaw/openclaw/pull/126618) | 25💬 | Tool Search directory/tools wrap native read/exec in tool_call |
| [#117114](https://github.com/openclaw/openclaw/pull/117114) | 21💬 | Isolate `pnpm link` so it cannot pollute source-checkout updates; warn on broken self-links |
| [#126424](https://github.com/openclaw/openclaw/pull/126424) | 19💬 (merged) | Scope session delivery to agent bindings |
| [#118067](https://github.com/openclaw/openclaw/pull/118067) | 19💬 | Discord support for private provider endpoints |
| [#124548](https://github.com/openclaw/openclaw/pull/124548) | 18💬 | Persist sender identity for DM turns |

**Key issues**

- [#127379](https://github.com/openclaw/openclaw/issues/127379) — The `/models` command pins the gateway main thread at 100%+ CPU because `buildModelsProviderData` is rebuilt repeatedly.
- [#87637](https://github.com/openclaw/openclaw/issues/87637) (2👍 / 3💬) — **`openclaw doctor` reports memory search as disabled while memory-core dreaming is actually running — diagnostic distortion.**
- [#125570](https://github.com/openclaw/openclaw/issues/125570) — Applying a Skill Workshop update overwrites the live skill's description, silently breaking its triggers.
- [#124099](https://github.com/openclaw/openclaw/issues/124099) — After upgrading to 2026.8.1-beta.2, a `SessionCanonicalKeyMigrationRequiredError` loop appears and trigger-pending rows are affected.
- [#68187](https://github.com/openclaw/openclaw/issues/68187) — SSE-backed MCP sessions remain stale after a service restart and report "Session not found".
- [#72717](https://github.com/openclaw/openclaw/issues/72717) — Introduce a SQLite FTS index for `wiki_search` to speed up synthetic queries.
- [#88334](https://github.com/openclaw/openclaw/issues/88334) — Gateway should refresh the auth epoch immediately after credential rotation.
- [#45184](https://github.com/openclaw/openclaw/issues/45184) — Skip dispatch when a message @-mentions another account's bot.
- [#33102](https://github.com/openclaw/openclaw/issues/33102) — Allow the TUI to configure a default for `--deliver`.
- [#119254](https://github.com/openclaw/openclaw/issues/119254) — Design a WhatsApp `poll_vote_received` plugin hook.

**Opened today (3 issues / 22 PRs, selected)**

- [#128003](https://github.com/openclaw/openclaw/issues/128003) — Subagent completion announcements never fire on OpenAI-compatible HTTP sessions.
- [#128006](https://github.com/openclaw/openclaw/issues/128006) — ACPX direct-agent startup lacks a persistent process-lease override (no upstream lifecycle hook).
- [#128005](https://github.com/openclaw/openclaw/issues/128005) — Android `location.get` ignores `maxAgeMs` when falling back to live positioning.
- PR [#127797](https://github.com/openclaw/openclaw/pull/127797) (8💬) — Unify synchronous message hooks.
- PR [#127998](https://github.com/openclaw/openclaw/pull/127998) (6💬) — **Doctor's permission-fix suggestions list already-disabled automations (diagnostic accuracy fix).**
- PR [#127962](https://github.com/openclaw/openclaw/pull/127962) (6💬) — Preserve gateway context for inbound turns.
- PR [#128004](https://github.com/openclaw/openclaw/pull/128004) (merged) — Share the format scope for schema validation (performance).
- PR [#128001](https://github.com/openclaw/openclaw/pull/128001) — Propagate the caller's abort into the ACP spawn.

### Zeroclaw ([zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw))

**Latest release**: v0.8.4 (08-02). **#1 by PR volume in the ecosystem today (91 active / 12 new).**

**The `#8289` security epic (three stages advanced the same day)**

- PR [#10248](https://github.com/zeroclaw-labs/zeroclaw/pull/10248) — Canonical principals and shared authorization resolution (stage 2).
- PR [#10259](https://github.com/zeroclaw-labs/zeroclaw/pull/10259) — Enforce authenticated principals over RPC, native + peercred (stage 3).
- PR [#10255](https://github.com/zeroclaw-labs/zeroclaw/pull/10255) — `oidc.<alias>` token validation provider (stage 5).

**High-discussion PRs**

| PR | Discussion | Summary |
|----|-----------|---------|
| [#9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109) | 44💬 | Native Hailo-Ollama support (edge inference) |
| [#9707](https://github.com/zeroclaw-labs/zeroclaw/pull/9707) | 33💬 | Migrate bare `vision_model_provider` to dotted alias references |
| [#9713](https://github.com/zeroclaw-labs/zeroclaw/pull/9713) | 25💬 | Expose token accounting on history-trim events |
| [#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535) | 22💬 | Anchor context compaction to a ratio of the model window |
| [#9447](https://github.com/zeroclaw-labs/zeroclaw/pull/9447) | 20💬 | **Classify incomplete terminal responses (the fix side of the CLI empty-response problem)** |
| [#9772](https://github.com/zeroclaw-labs/zeroclaw/pull/9772) | 20💬 | `per_user_session` toggle for shared Telegram group sessions |
| [#9203](https://github.com/zeroclaw-labs/zeroclaw/pull/9203) | 19💬 | Authenticated HTTP fan-in |
| [#9281](https://github.com/zeroclaw-labs/zeroclaw/pull/9281) | 18💬 | Roll back auto-created map aliases when `config set` fails |
| [#9574](https://github.com/zeroclaw-labs/zeroclaw/pull/9574) | 17💬 | Authorization approval responder |
| [#9291](https://github.com/zeroclaw-labs/zeroclaw/pull/9291) | 17💬 | Detect installed AppImages and use an available desktop download URL |

**Governance and items opened today**

- [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) (13💬) — Tracker for the maintainer RFC and design-issue decision queue.
- [#8396](https://github.com/zeroclaw-labs/zeroclaw/issues/8396) (9💬) — RFC: make the wire protocol a first-class concept in provider construction and onboarding.
- [#10141](https://github.com/zeroclaw-labs/zeroclaw/issues/10141) — "Please make sessions usable."
- New issues today: [#10251](https://github.com/zeroclaw-labs/zeroclaw/issues/10251) (17 telegram `listen_*` tests depend on wall-clock timeout assertions), [#10257](https://github.com/zeroclaw-labs/zeroclaw/issues/10257) (`cron update --command` writes an unused column on agent jobs), [#10249](https://github.com/zeroclaw-labs/zeroclaw/issues/10249) (duplicate webhook handling logs a caller-controlled idempotency key verbatim), [#10261](https://github.com/zeroclaw-labs/zeroclaw/issues/10261).
- New PRs today: [#10256](https://github.com/zeroclaw-labs/zeroclaw/pull/10256) (redact duplicate idempotency keys from logs, addresses #10249), [#10258](https://github.com/zeroclaw-labs/zeroclaw/pull/10258) (map command patches onto the agent job prompt), [#10260](https://github.com/zeroclaw-labs/zeroclaw/pull/10260) (fail RPC calls on disconnect).

### IronClaw ([nearai/ironclaw](https://github.com/nearai/ironclaw))

**Latest release**: [ironclaw-v1.3.0](https://github.com/nearai/ironclaw/releases/tag/ironclaw-v1.3.0) (08-19), preceded by rc.1 / rc.2 (08-17 / 08-18).

**High-discussion product PRs**

- [#7650](https://github.com/nearai/ironclaw/pull/7650) (45💬) — Derive run outcome from runtime evidence.
- [#7818](https://github.com/nearai/ironclaw/pull/7818) — Subagent background mode: receipt-based spawn, per-child delivery, activation and self-healing sweeps.
- [#7516](https://github.com/nearai/ironclaw/pull/7516) (14💬) — Operator surface for IronHub agent link.
- [#7257](https://github.com/nearai/ironclaw/pull/7257) (11💬) — WebUI design-system proposal, plan, and checklist (Epic #7038).
- [#7816](https://github.com/nearai/ironclaw/pull/7816) — Add refresh and connect entries to the OOBE suggestions drawer.

**CI infrastructure, four in a row (T1–T4, all opened today)**

- [#7821](https://github.com/nearai/ironclaw/pull/7821) — Single setup-rust composite action: pinned toolchain, mold, centralized build profiles (T1).
- [#7817](https://github.com/nearai/ironclaw/pull/7817) — nextest test pipeline, full failure signal, unthrottled on PRs (T2).
- [#7820](https://github.com/nearai/ironclaw/pull/7820) — Merge probe for the scope-isolation test suite (T2 follow-up).
- [#7819](https://github.com/nearai/ironclaw/pull/7819) — Converge PR / queue checks: planner drift guard, default-features clippy on PRs (T3).
- [#7809](https://github.com/nearai/ironclaw/pull/7809) — Normalize preflight: unified gate list, worktree safety hooks, self-printing REPRO (T4).

**Onboarding / integration issues (5 opened today)**

- [#7815](https://github.com/nearai/ironclaw/issues/7815) — Onboarding suggestions: cumulative net-new work needed to close the connect → suggest → thread loop.
- [#7812](https://github.com/nearai/ironclaw/issues/7812) — Onboarding suggestions should respect user-level tool permissions and use read-only tool access for generation.
- [#7823](https://github.com/nearai/ironclaw/issues/7823) — Notion install fails in IronClaw.
- [#7822](https://github.com/nearai/ironclaw/issues/7822) — Slack users cannot complete Slack configuration in IronClaw.
- [#7813](https://github.com/nearai/ironclaw/issues/7813) — Title is clipped when the suggestions panel appears.

### NanoClaw ([qwibitai/nanoclaw](https://github.com/qwibitai/nanoclaw))

**Latest release**: v2.2.0 (08-13). 0 issues / 16 PRs — purely PR-driven.

- [#3438](https://github.com/qwibitai/nanoclaw/pull/3438) — Config wizard offers "add another Telegram bot" when one is already configured.
- [#3437](https://github.com/qwibitai/nanoclaw/pull/3437) — Docs for the add-another-bot path, instance-aware pairing, and wiring.
- [#3435](https://github.com/qwibitai/nanoclaw/pull/3435) — Thread adapter instance through pairing, first-agent init, and the CLI welcome flow.
- [#3355](https://github.com/qwibitai/nanoclaw/pull/3355) / [#3356](https://github.com/qwibitai/nanoclaw/pull/3356) — Add an `/add-cursor` provider skill; add a Cursor Agent SDK payload.
- [#3434](https://github.com/qwibitai/nanoclaw/pull/3434) — Polling adapters no longer start a webhook server.
- [#3446](https://github.com/qwibitai/nanoclaw/pull/3446) — Auto-drop automation senders in the unknown-sender gate.
- [#3442](https://github.com/qwibitai/nanoclaw/pull/3442) — Validate `runtimeTier` via driver-isolated capability checks and pick a tier accordingly.
- [#3443](https://github.com/qwibitai/nanoclaw/pull/3443) — Remove better-sqlite3 from `onlyBuiltDependencies` and use its bundled prebuilds.
- [#3441](https://github.com/qwibitai/nanoclaw/pull/3441) — Preserve files when `git show` fails.
- [#3431](https://github.com/qwibitai/nanoclaw/pull/3431) — Correct pairing-card copy to six digits.

### NanoBot ([HKUDS/nanobot](https://github.com/HKUDS/nanobot)) ★47,283

**Latest release**: v0.3.0 (07-25). 0 issues / 11 PRs, themed on observability and session lifecycle.

- [#5486](https://github.com/HKUDS/nanobot/pull/5486) (merged) — Unify turn observability.
- [#5487](https://github.com/HKUDS/nanobot/pull/5487) — WebUI file-preview path fix plus subagent activity and lifecycle replay.
- [#5420](https://github.com/HKUDS/nanobot/pull/5420) — Add user-controlled turn resume.
- [#5484](https://github.com/HKUDS/nanobot/pull/5484) — **Flag MCP responses that return `isError=false` while carrying a business-error envelope.**
- [#5483](https://github.com/HKUDS/nanobot/pull/5483) — Prevent deleted sessions from being recreated by delayed messages.
- [#5471](https://github.com/HKUDS/nanobot/pull/5471) — Ensure ephemeral runs do not mutate session state.
- [#5485](https://github.com/HKUDS/nanobot/pull/5485) — Restore LangSmith tracing for native providers.
- [#5156](https://github.com/HKUDS/nanobot/pull/5156) (merged) — Recover from silently stalled Telegram polling.
- [#3294](https://github.com/HKUDS/nanobot/pull/3294) (merged) — Optional dream kill switch plus custom Phase 1/2 template paths.

### CoPaw ([agentscope-ai/CoPaw](https://github.com/agentscope-ai/CoPaw))

**Latest release**: v2.1.1-beta.1 (08-20); stable v2.1.0 (08-13).

- [#7196](https://github.com/agentscope-ai/CoPaw/issues/7196) (1👍 / 2💬) — Always showing the reasoning trace is a serious visual distraction; make collapse-by-default configurable.
- [#7201](https://github.com/agentscope-ai/CoPaw/issues/7201) — Per-provider `max_image_bytes` / `max_video_bytes` / `max_audio_bytes` limits.
- [#7212](https://github.com/agentscope-ai/CoPaw/issues/7212) — Inlining images whose pixel dimensions exceed provider limits crashes the request (cause-and-effect with #7201).
- [#7213](https://github.com/agentscope-ai/CoPaw/issues/7213) — Session output always contains meaningless blank lines.
- [#7043](https://github.com/agentscope-ai/CoPaw/issues/7043) (closed) — Auto-run `chcp 65001` at startup to switch to a UTF-8 environment.
- PR [#7214](https://github.com/agentscope-ai/CoPaw/pull/7214) — Document Access Policy as a fifth security layer in the README.
- PR [#7054](https://github.com/agentscope-ai/CoPaw/pull/7054) — Chrome support for remote bridge endpoints on LAN/network browsers.
- PR [#7050](https://github.com/agentscope-ai/CoPaw/pull/7050) — Per-cron-job model override selector.
- PR [#7190](https://github.com/agentscope-ai/CoPaw/pull/7190) — PyPI runtime paths for qwenpaw-data, one-command docker-compose demo, and env inheritance.
- PR [#6808](https://github.com/agentscope-ai/CoPaw/pull/6808) — Console shows markdown files for custom profiles.

### PicoClaw ([sipeed/picoclaw](https://github.com/sipeed/picoclaw))

**Latest release**: v0.3.1 (06-30), nightly (07-02).

- [#3269](https://github.com/sipeed/picoclaw/issues/3269) (1👍 / 6💬) — **A failed MCP server connection hangs the agent loop and takes down the whole PicoClaw chat.** Matching fix: PR [#3337](https://github.com/sipeed/picoclaw/pull/3337).
- [#3343](https://github.com/sipeed/picoclaw/issues/3343) (opened today) — After a failed turn the tool-feedback animation edits the same Telegram message forever.
- PR [#3222](https://github.com/sipeed/picoclaw/pull/3222) (16💬) — deltachat implementation refactor and docs cleanup, ~200 lines net removed.
- PR [#3319](https://github.com/sipeed/picoclaw/pull/3319) (merged) — Respect exec timeouts and boolean run options.

### LobsterAI ([netease-youdao/LobsterAI](https://github.com/netease-youdao/LobsterAI))

**Latest release**: 2026.8.18 (08-18). Driven by Chinese-language user requests, with a very short file-to-merge loop.

- [#1213](https://github.com/netease-youdao/LobsterAI/issues/1213) (closed) — Add "export to Markdown" for session details → implemented and merged via PR [#1214](https://github.com/netease-youdao/LobsterAI/pull/1214).
- [#1206](https://github.com/netease-youdao/LobsterAI/issues/1206) (closed) — On-prem kimi2.5 reprocesses analysis documents or repeats progress replies.
- PR [#1208](https://github.com/netease-youdao/LobsterAI/pull/1208) (merged) — Add a manual retry button for transient errors such as rate limiting.
- PR [#1212](https://github.com/netease-youdao/LobsterAI/pull/1212) (merged) — Raise the custom-provider cap to 20.
- PR [#1205](https://github.com/netease-youdao/LobsterAI/pull/1205) (merged) — Show an error toast when session rename fails.
- PR [#1209](https://github.com/netease-youdao/LobsterAI/pull/1209) (merged) — Fix web-search blocking unsupported Chrome flags.
- PR [#2452](https://github.com/netease-youdao/LobsterAI/pull/2452) — Preserve provider information for model ids containing slashes.

### Moltis ([moltis-org/moltis](https://github.com/moltis-org/moltis))

**Latest release**: 20260820.01 (08-20). All three items today are new.

- [#1230](https://github.com/moltis-org/moltis/issues/1230) — **Optional fail-closed error policy for mutating security hooks (deny rather than allow when a hook errors).**
- PR [#1229](https://github.com/moltis-org/moltis/pull/1229) (1👍 / 3💬) — Support Browserless v2 containers.
- PR [#1231](https://github.com/moltis-org/moltis/pull/1231) (1👍 / 2💬) — **Re-resolve the current MCP client after a service restart (an independent reproduction of OpenClaw #68187).**

### Low-Activity / Stalled Projects

| Project | Latest Release | Stalled For | Activity Today |
|---------|---------------|-------------|----------------|
| [EasyClaw](https://github.com/gaoyangz77/easyclaw) | v1.8.112 (08-22) | — | **5 releases in a row but 0 issues / 0 PRs**; releases actually point at `gaoyangz77/rivonclaw` (renamed) |
| [NullClaw](https://github.com/nullclaw/nullclaw) | v2026.5.29 | ~3 months | 0 / 0 |
| [ZeptoClaw](https://github.com/qhkm/zeptoclaw) | v0.9.2 (04-07) | ~4.5 months | 0 / 0 |
| [TinyClaw](https://github.com/TinyAGI/tinyclaw) | v0.0.20 (03-26) | ~5 months | 0 / 0 |

---

*This digest is generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar). All content is fetched live from GitHub's public API and written by the executing agent — no external LLM was called.*
