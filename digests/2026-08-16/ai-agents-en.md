# OpenClaw Ecosystem Digest 2026-08-16

> Issues: 500 | PRs: 500 | Projects covered: 13 | Generated: 2026-08-16 01:05 UTC

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

# OpenClaw Project Digest — 2026-08-16

## 1. Today's Overview

OpenClaw shows very high activity with 500 issues and 500 PRs updated in the last 24 hours, though only 22 issues and 56 PRs were closed/merged—suggesting heavy triage and review volume with a moderate throughput bottleneck. The project released v2026.8.1-beta.2 featuring secret egress host binding and GPT-5.6 Ultra runtime switching. The issue tracker remains dominated by P1-class reliability bugs centered on message loss, session-state corruption, and subagent orchestration failures, with several long-standing "diamond lobster" rated issues still awaiting maintainer decisions. A notable cluster of Windows-specific bugs (cron jobs, CLI process leaks, test teardown failures) indicates platform parity remains a challenge. The community is actively contributing PRs across channels (Telegram, Slack, Feishu, WhatsApp) and core subsystems (memory, sessions, gateway), though many PRs are waiting on author revisions or maintainer review.

## 2. Releases

**v2026.8.1-beta.2** (2026-08-16)

- **Secret egress host binding**: Shared-store secrets are now bound to exact HTTPS destination hosts across CLI, Gateway RPC, and Control UI. Unbound sentinel substitution fails closed before plaintext egress—a security hardening measure contributed by @shakkernerd.
- **GPT-5.6 Ultra and runtime switching**: New model support with improved runtime switching capabilities.

No explicit breaking changes or migration notes were included in the release notes.

## 3. Project Progress

Today's 56 closed/merged PRs advanced several fronts, though the data shows most PRs remain open pending review. Notable close-to-merge or ready-for-review contributions include:

- **Windows cron fix** (#124293): Fixes durable fence process identity on Windows preventing all cron jobs (heartbeats, reminders) from running.
- **Session restart recovery** (#121478): Preserves paired restart session refs during gateway restarts.
- **Memory persistence** (#120989): Makes persistence promises receipt-backed—prevents false "fact saved" confirmations.
- **Memory ranking candidates** (#121287): Stops ranking candidates that promotion is guaranteed to reject in Memory Core deep sleep.
- **Gateway rollback compatibility** (#120987): Keeps Gateway rollback-compatible after additive SQLite columns.
- **Slack duplicate commentary** (#121004): Prevents duplicate commentary delivery in Slack progress drafts.
- **Feishu per-chat queue lane** (#124214): Releases the queue lane at turn adoption for rapid follow-up messages (#54409).
- **Codex supervision** (#121760): Prevents catalog continuation when supervision is disabled.
- **Context window provenance** (#124303): Tracks and persists context window provenance across command, auto-reply, and cron paths.
- **Gateway sidecar startup** (#124309): Keeps core available while sidecars start, preventing control-plane disconnects.

## 4. Community Hot Topics

- **[#121058 — Silent reply failures recurring after #116277 closed](https://github.com/openclaw/openclaw/issues/121058)** (96 comments, closed): The community remains frustrated that a P1 message-loss issue was closed while monitoring still logs new occurrences. The underlying need is for durable verification that fixes actually work before issues are closed.
- **[#116201 — Realtime voice unbounded provider/consult state](https://github.com/openclaw/openclaw/issues/116201)** (66 comments, open): Resource retention in realtime voice sessions under slow/bursty provider behavior. Needs hard ownership bounds.
- **[#7707 — Memory Trust Tagging by Source](https://github.com/openclaw/openclaw/issues/7707)** (53 comments, open): Community strongly wants memory poisoning protection via trust-level tagging of memory entries by origin. A long-standing ask (since Feb) that keeps drawing engagement.
- **[#25592 — Text between tool calls leaks to messaging channels](https://github.com/openclaw/openclaw/issues/25592)** (49 comments, open): Internal processing output is being delivered as visible messages to Slack/iMessage. High-impact UX problem.
- **[#44925 — Subagent completion silently lost on timeout](https://github.com/openclaw/openclaw/issues/44925)** (29 comments, open): Multiple failure modes where subagent results are silently lost with no retry, no notification, no auto-restart.
- **[#121953 — Cron agent stalls on DeepSeek due to prefix deprioritization](https://github.com/openclaw/openclaw/issues/121953)** (20 comments, open): DeepSeek's API edge deprioritizes requests whose first user message starts with `[cron:`. A provider-specific edge case with real user impact.

## 5. Bugs & Stability

**Critical (P1, message/data loss or session-state corruption):**

- **Silent reply failures still recurring** (#121058, closed but still occurring): Monitoring cron logs new occurrences since closure—message loss persists.
- **Subagent completion silently lost** (#44925): No retry, no notification on timeout; multiple failure patterns documented. No fix PR yet.
- **Text between tool calls leaks to messaging channels** (#25592): Internal narration delivered as visible messages. Linked PR open.
- **sessions_yield wake compacts parent branch at low context** (#86684): Parent session compacted unexpectedly during subagent handling; regression with linked PR open.
- **Feishu read image tool loses media** (#41744): Media attachment lost before final outbound payload. Linked PR open.
- **MS Teams conversation store SQLite empty after migration** (#94939): 0-byte SQLite orphans references, breaks proactive sends. Linked PR open.
- **Realtime voice unbounded state** (#116201): Resource retention under slow/bursty conditions.

**Moderate (P1/P2, impact: crash-loop / session-state / auth):**

- **Gateway cold start regressed ~2.5x** (#119087): 1-vCPU container regression from 2026.7.1 to 2026.7.2.
- **Cron agent turns stall on DeepSeek** (#121953): Prefix deprioritization causing tens-of-seconds delays.
- **Windows cron jobs never run** (#124293 — fix PR open): Durable fence cannot read process identity.
- **dev-channel update fails with EUNSUPPORTEDPROTOCOL** (#123073): Updater uses npm but repo requires pnpm for `workspace:*` deps.
- **All LLM calls time out simultaneously** (#43374): Multi-agent concurrency bottleneck; APIs reachable via curl but all requests time out.
- **Auto-update leaves stale hashed bundle imports** (#85844): Running gateway references removed filenames after update.
- **launchd plist hides all gateway stderr** (#90711): 5.28 regression; diagnostics invisible.
- **Memory_search corpus=all times out** (#92633): Individual corpora succeed; "all" fails consistently at 15s.
- **Gateway cold start regression** (#119087): 2.5x slower; no PR yet.

**Windows-specific (growing cluster):** CLI processes remain alive (#74378), vitest teardown EBUSY (#119796), cron never runs (#124293).

## 6. Feature Requests & Roadmap Signals

- **Memory Trust Tagging by Source** (#7707, open since Feb, 53 comments): Strongest roadmap signal. Memory poisoning protection is a recurring theme.
- **Per-Agent TTS/STT overrides** (#66252, open since Apr): Multi-language/multi-voice support for agents.
- **YAML config support** (#45758, open since Mar): Alternative to JSON5 config.
- **Pace-aware rate limiting** (#45771, open since Mar): In high demand for autonomous agents.
- **/models test-fallback command** (#6599, open since Feb): Verify fallback chain without waiting for failure.
- **Slack-style @mention autocomplete** (#45323, open since Mar): Control UI UX improvement.
- **Kubernetes docs update** (#91455, open since Jun): Users find current instructions awkward.
- **SQLite transcript seams** (#79902, open since May): Companion-friendly access to runtime state.

Likely candidates for next release: memory trust tagging is the most commented feature request. The Windows cron fix (#124293) is merge-ready and addresses a severe platform bug.

## 7. User Feedback Summary

- **Frustration with premature issue closure**: #121058 shows users losing confidence in the fix process when monitoring continues to log failures after issues are closed.
- **Production users need operational guidance fast**: #123799 explicitly asks for upgrade/backport guidance for production affected by a known bug; such requests indicate documentation and release-notice gaps.
- **Silent failure modes are the top pain point**: Recurring themes across issues—silent reply loss, silent subagent loss, silent channel failures—show the community values explicit notifications, retries, and error visibility.
- **Windows parity issues**: Multiple reports of Windows-specific bugs (CLI hangs, cron failures, test failures) suggest the platform support needs dedicated attention.
- **Model/provider quirks are real**: DeepSeek prefix deprioritization (#121953) and OpenCode Zen 429s (#124317) show production users hit provider-specific edge cases that require OpenClaw-level workarounds.
- **Positive signals**: Community members actively submit tested PRs with reproduction steps and proof; the "ready for maintainer look" status across many PRs shows a healthy contributor pipeline.

## 8. Backlog Watch

- **[#7707 — Memory Trust Tagging by Source](https://github.com/openclaw/openclaw/issues/7707)** (open since Feb 3, 53 comments): Needs product decision; high community engagement.
- **[#25592 — Text between tool calls leaks to messaging channels](https://github.com/openclaw/openclaw/issues/25592)** (open since Feb 24, 49 comments): P1 message leak; linked PR open but needs maintainer review.
- **[#44309 — One-way dispatch mode for A2A handoffs](https://github.com/openclaw/openclaw/issues/44309)** (open since Mar 12, marked stale): Needs maintainer decision; community still thinks it's valuable.
- **[#30381 — chatCompletions ignores request model with x-openclaw-agent-id](https://github.com/openclaw/openclaw/issues/30381)** (open since Mar 1, marked stale): P2 auth-provider issue; comments indicate unresolved friction.
- **[#119087 — Gateway cold start regression](https://github.com/openclaw/openclaw/issues/119087)** (open since Aug 4): P1 regression; no PR yet despite clear reproduction and impact.
- **[#82662 — Isolated cron agentTurn fails with setup timeout](https://github.com/openclaw/openclaw/issues/82662)** (open since May 16): P1 regression affecting memory-core; 8 comments, all fallback models exhausted.
- **[#67419 — Bootstrap files re-injected every turn (20-30% token waste)](https://github.com/openclaw/openclaw/issues/67419)** (open since Apr 15): P2 token efficiency issue; no fix PR despite clear waste.
- **[#91223 — Active memory injection breaks prompt cache hit rate](https://github.com/openclaw/openclaw/issues/91223)** (open since Jun 7): 99.9% → 22% cache hit collapse; needs live repro and product decision.

---

## Cross-Ecosystem Comparison

# Cross-Project Ecosystem Comparison Report — 2026-08-16

## 1. Ecosystem Overview

The personal AI assistant open-source landscape is in a high-velocity maturation phase, with the reference implementation (OpenClaw) processing over 1,000 issues and PRs in a single day while a dense field of derivatives, forks, and adjacent projects iterate on distinct architectures and use cases. Reliability concerns dominate across the ecosystem — silent message loss, session-state corruption, memory persistence gaps, and subagent orchestration failures appear consistently across nearly every active project. Simultaneously, the community is pushing hard on feature frontiers: cross-session context sharing, memory trust/poisoning protection, provider protocol compatibility (especially OpenAI-compatible surfaces), channel expansion (Telegram, WhatsApp, Slack, Feishu, Discord), and security hardening around plugin/skill boundaries and secrets handling. The ecosystem shows clear stratification: a few high-throughput core projects with massive community engagement, a middle tier of actively-developed specialized forks, and a long tail of dormant or low-activity projects.

## 2. Activity Comparison

| Project | Issues Updated | PRs Updated | Releases | Health Score | Notes |
|---|---|---|---|---|---|
| **OpenClaw** | 500 | 500 | v2026.8.1-beta.2 | 7/10 | Very high triage volume; throughput bottleneck; P1 reliability bugs persist |
| **NanoBot** | 1 new | 16 | None | 8/10 | Healthy balance of features/fixes; responsive maintainers; clean-up phase |
| **ZeroClaw** | 50 | 50 | None | 6/10 | RFC-heavy design phase; maintainer review is bottleneck |
| **NanoClaw** | 0 new | 22 | None | 8/10 | Core-team-driven; no community issues; intensive feature work |
| **NullClaw** | 1 new | 1 | None | 7/10 | Light but directional; consolidating; proxy request is clear signal |
| **IronClaw** | 27 (21 closed) | 5 merged | None | 8/10 | High-velocity; strong backlog closure; performance-focused |
| **LobsterAI** | 18 (16 stale-closed) | 6 | None | 5/10 | Maintenance/housekeeping mode; stale sweep; login bug open |
| **Moltis** | 2 closed | 16 (14 merged) | None | 8/10 | High-velocity integration; security hardening; large features landing |
| **PicoClaw** | 0 | 2 open (stale) | None | 3/10 | Low activity; critical WhatsApp fix unmerged; single-contributor pattern |
| **CoPaw** | 9 new | 11 (0 merged) | None | 5/10 | Review bottleneck; bug spike; first-time contributor influx |
| **TinyClaw** | — | — | — | — | No activity |
| **ZeptoClaw** | — | — | — | — | No activity |
| **EasyClaw** | — | — | — | — | No activity |

## 3. OpenClaw's Position

**Advantages:** OpenClaw remains the ecosystem's reference implementation with unmatched community scale — 500 issues and 500 PRs touched in 24 hours dwarfs every other project by an order of magnitude. It has the broadest channel support (Telegram, Slack, Feishu, WhatsApp, Discord, iMessage), the most mature subagent orchestration, and the largest contributor pipeline. The maintainer team ships frequent beta releases with meaningful features (secret egress binding, GPT-5.6 Ultra switching) and has a clear P1 bug taxonomy that the rest of the ecosystem often mirrors.

**Technical approach differences:** OpenClaw's core differentiator is its gateway/memory/sessions abstraction with deep multi-channel integration. Its architecture is the de facto standard — derivatives like NanoClaw and ZeroClaw explicitly build compatible layers. However, OpenClaw's scale brings challenges: the triage-to-merge ratio is poor (500 updated vs. 56 merged), and the "diamond lobster" rated issues suggest a backlog of unresolved architectural decisions. Windows parity remains a known weakness.

**Community size comparison:** OpenClaw's community engagement (measured in comments per issue — 96 on #121058, 66 on #116201) far exceeds the next tier. ZeroClaw's most-commented issue (#8603) has 21 comments; NanoBot's busiest PR has none. OpenClaw effectively owns the community conversation, while smaller projects trade in that shadow.

## 4. Shared Technical Focus Areas

| Focus Area | Projects | Specific Needs |
|---|---|---|
| **Memory persistence & trust** | OpenClaw (#7707), LobsterAI (#2046), NanoBot (#5377), ZeroClaw (#9103) | Trust tagging by source, cross-session recall, lossless consolidation, session metadata persistence |
| **Silent failure elimination** | OpenClaw (#121058, #44925), NanoBot (#5371), CoPaw (#7048) | Explicit notifications on message/subagent loss, retries, error visibility, no silent no-ops |
| **Session state integrity** | OpenClaw (#86684), NanoBot (#5271), NanoClaw (#3255, #3256), Moltis (#1132) | Stale-save prevention, detached conversation lifecycle, delivery row resolution, main-session management |
| **Provider/API compatibility** | ZeroClaw (#8603), OpenClaw (#43374, #121953), CoPaw (#7059), NullClaw (#988) | OpenAI-compatible surfaces, provider-specific quirks, proxy support, model-preset unification |
| **Channel expansion & parity** | NanoClaw (Telegram), ZeroClaw (#9488), PicoClaw (WhatsApp), OpenClaw (Windows) | Attachment handling, per-channel behavior unification, platform-specific bug fixes |
| **Cron/scheduling reliability** | OpenClaw (#124293), NanoBot (#5376), ZeroClaw (#9320), CoPaw (#7055) | Windows cron fixes, scheduler resilience, wall-clock timeouts, per-job model selection |
| **Security hardening** | Moltis (#1180, #1179), OpenClaw (secret egress), NanoBot (#5369), ZeroClaw (#6971) | Path traversal, plugin trust boundaries, secrets binding, unified ingress policy |
| **UI/UX polish** | LobsterAI (#1836), CoPaw (#3915, #7058), OpenClaw (#45323) | Virtual scrolling, skeleton states, native context strategy selector restoration |

## 5. Differentiation Analysis

| Project | Distinguishing Architecture | Target Users | Unique Focus |
|---|---|---|---|
| **OpenClaw** | Gateway/memory/sessions core with multi-channel adapters | Power users, self-hosters, enterprise pilots | Breadth of channels, subagent orchestration, gateway RPC |
| **NanoBot** | Lightweight, WebUI-first with session collaboration | Individual developers, small teams | Session mentions, side conversations, drag-and-drop organization |
| **ZeroClaw** | RFC-driven, transport-agnostic (WebSocket/ACP) | Operators requiring auditable security | Chat Completions profile, attachment unification, security posture |
| **NanoClaw** | Channel abstraction layer with container runtime | Agent-container operators | Cross-session context fan-out, heartbeat/stuck-container logic, Telegram migration |
| **IronClaw** | Performance-optimized core with coding-tool contracts | QA-heavy teams | DB write reduction, thread index coalescing, trajectory benchmarks |
| **Moltis** | Feature-gated modularity with security-first mindset | Security-conscious adopters | Durable connectors (CalDAV/Gmail), Coder sandbox, path-traversal hardening |
| **LobsterAI** | NetEase-backed, plugin-enabled | Chinese-market users, paid-tier subscribers | Memory system improvement, membership login, plugin config preservation |
| **CoPaw** | Console-first with cron CLI and MCP integration | Automation-focused operators | Video context handling, OAuth2 refresh, per-cron model overrides |
| **PicoClaw** | Minimal fork, single-contributor | WhatsApp-dependent users | Dependency freshness, prefix caching efficiency |
| **NullClaw** | Simplest core, local-first | Enterprise-restricted networks | Proxy support, long-loop efficiency |

## 6. Community Momentum & Maturity

**Tier 1 — Rapid iteration (high velocity, frequent merges):** OpenClaw (very high activity but merge bottleneck), Moltis (14 merged PRs in 24h), NanoClaw (13 maintainer-authored PRs in 24h), IronClaw (5 merged PRs, 21 issues closed), NanoBot (7 PRs merged).

**Tier 2 — Moderate activity (design or consolidation phase):** ZeroClaw (RFC-heavy — 6 merged PRs but 50+ RFCs awaiting review — maintainer attention is the bottleneck), CoPaw (9 new issues, 0 merged PRs — review bottleneck, first-time contributor influx).

**Tier 3 — Low activity / dormant:** LobsterAI (maintenance mode, 16 stale-closed issues), PicoClaw (2 stale PRs, critical WhatsApp fix unmerged for over a week), NullClaw (1 issue, 1 PR, both fresh), TinyClaw, ZeptoClaw, EasyClaw (no activity).

**Trend:** The ecosystem is bifurcating. High-velocity projects (Moltis, NanoClaw, IronClaw) are shipping security and reliability fixes aggressively. Design-phase projects (ZeroClaw) are risking RFC fatigue — the volume of open RFCs with no maintainer decision threatens momentum. Low-activity projects (PicoClaw) with critical unmerged fixes are actively losing user trust.

## 7. Trend Signals

**1. Silent failure is the #1 trust killer.** Across OpenClaw (#121058, #44925), NanoBot (#5371), CoPaw (#7048), the most emotionally charged feedback concerns failures that produce no error, no retry, no notification. Developers building agents must treat explicit error surfaces as a core feature, not a nicety — the community is actively losing confidence in tools that fail silently.

**2. Memory trust and provenance is the next major battlefront.** OpenClaw's #7707 (memory trust tagging by source, 53 comments since Feb), LobsterAI's #2046, and NanoBot's consolidation-loss bugs all point to the same need: agents must know *where* a memory came from and *whether* it can be trusted. This is a prerequisite for real-world deployment where prompt-injection and data poisoning are realistic threats.

**3. Protocol compatibility is a growth lever.** ZeroClaw's most-commented RFC (#8603) asks for OpenAI Chat Completions compatibility, explicitly naming Open WebUI, LobeChat, Continue.dev, Aider, and LangChain as desired integrations. Interoperability with the existing tooling ecosystem is a stronger adoption driver than novel features.

**4. Cross-session and multi-session workflows are emerging as table stakes.** NanoClaw's cross-session context fan-out (#3257), NanoBot's session mentions (#5358) and side conversations (#5364), and Moltis's session lifecycle management all point to users wanting agents that operate across parallel, related conversations — not just single-threaded chats.

**5. Security hardening is shifting from feature to requirement.** Moltis's path-traversal and node-pairing fixes, OpenClaw's secret egress binding, and ZeroClaw's ingress-policy RFC all respond to a community that is increasingly security-auditing the tools it adopts. Contributors explicitly state they won't use tools until security fixes land.

**6. Platform parity is a retention risk.** Windows-specific bugs (OpenClaw's cron, CLI process leaks; LobsterAI's desktop connectivity) and macOS 3.2 bash issues (Moltis) indicate that cross-platform support is a recurring source of user pain. Projects that ignore platform parity will lose users to competitors that don't.

**7. Cost and token efficiency are becoming visible pain points.** OpenClaw's bootstrap re-injection (#67419, 20-30% token waste) and prompt-cache collapse (#91223, 99.9% → 22% cache hit rate), PicoClaw's prefix-caching PR, and NanoClaw's context-row crowding all reflect production users hitting real dollar costs. Efficiency is a differentiator, not a footnote.

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot Project Digest — 2026-08-16

## Today's Overview

NanoBot is in a highly active development phase, with 16 PRs updated in the last 24 hours and multiple feature branches progressing in parallel. The project shows a healthy balance of feature work, bug fixes, and stability improvements, with maintainers actively reviewing and merging contributions. Significant attention is focused on WebUI capabilities, session state reliability, and provider expansion. The closing of 7 PRs with only 1 new issue shows a clean-up phase combining feature completion with defensive bug fixing.

## Releases

No new releases published in this period.

## Project Progress

Seven PRs were merged or closed, marking significant progress across several areas:

- **Provider expansion (#5328, CLOSED)**: Added OrcaRouter as a named gateway provider, bringing 150+ models from leading vendors behind a single OpenAI-compatible endpoint, plus gateway-level zero-trust security.
- **WebUI turn-state fixes (#5371, CLOSED)**: Copy and fork actions are now hidden until the containing Agent turn ends, resolving conflicting completion signals in the UI.
- **Security hardening (#5369, CLOSED)**: Plugin skill roots are now revalidated after package changes, eliminating a vulnerability where cached skill directories could remain readable from a restricted project after in-place replacement.
- **Memory/performance improvements (#5370, CLOSED)**: The per-session file state lifecycle is now properly bounded, preventing unbounded memory growth and stale state persisting across session boundaries.
- **Scheduler resilience (#5376, CLOSED)**: Cron scheduler no longer dies permanently when job-store persistence fails (e.g., disk full, permission change).
- **WebUI refinements (#5397, #5399, CLOSED)**: Added macOS-style Shift range selection in sidebar bulk-delete, preserved turn identity through reasoning-only activity, and clarified model preset display names vs. stable command names.

## Community Hot Topics

- **[#5358: Session collaboration via mentions](https://github.com/HKUDS/nanobot/pull/5358)**: Open PR adding session-to-session @mentions with stable server-owned names, composer mention picker integration, and stable identity colors. The breadth of this feature and continued refinement suggests strong community interest in multi-session workflows.
- **[#5291: Persist subagent conversation transcripts](https://github.com/HKUDS/nanobot/pull/5291)**: Open PR addressing a long-standing transparency gap—full subagent tool-call histories are currently lost after completion. Users want auditability and reviewability of agent work.
- **[#5364: Temporary side conversations](https://github.com/HKUDS/nanobot/pull/5364)**: Open PR introducing `/side` for transient conversations beside the current topic, with tab switching and parallel sending. Community demand for non-linear, exploratory chat workflows is evident.

## Bugs & Stability

- **[BACKLOG — P0] #5271: Stale background task saves overwrite session data**: [Open PR](https://github.com/HKUDS/nanobot/pull/5271) addresses sessions being overwritten after `/new` or lifecycle replacement. This is the highest-priority issue due to potential data loss.
- **[P2] #5377: Consolidation truncates archive input but advances past full batch**: [Open Issue](https://github.com/HKUDS/nanobot/issues/5377) describing a data-loss bug in memory consolidation—truncated input with full-batch state advancement. Fix PR [#5379](https://github.com/HKUDS/nanobot/pull/5379) implements lossless bounded chunks with a full test suite.
- **[P2] #5401: WebUI mutations not reconnect-safe**: [Open PR](https://github.com/HKUDS/nanobot/pull/5401) addresses mutations potentially executing twice or being lost across reconnects, with request-ID-based replay protection.
- **Resolved this period**: Cached-skill-root stale reads (#5369), unbounded file-state lifecycle (#5370), cron scheduler death on persistence failure (#5376), and premature assistant-action display (#5371).

## Feature Requests & Roadmap Signals

- **[#5358: Session collaboration via mentions](https://github.com/HKUDS/nanobot/pull/5358)** — likely to merge soon given its maturity, enabling users to reference and link sessions from the composer.
- **[#5389: Drag-and-drop session organization](https://github.com/HKUDS/nanobot/pull/5389)** — visual session management with grouping and reordering, flagged as conflict-pending, suggesting it needs rebasing against recent layout changes.
- **[#5364: Temporary side conversations](https://github.com/HKUDS/nanobot/pull/5364)** — a promising addition for exploratory workflows, also marked with conflicts.
- **[#5398: DashScope native protocol support](https://github.com/HKUDS/nanobot/pull/5398)** — new provider integration extending beyond OpenAI-compatible endpoints, indicating continued provider diversity.
- **[#5400: Unify model preset names](https://github.com/HKUDS/nanobot/pull/5400)** — upcoming refactor establishing canonical preset names across config, WebUI, and commands, with inline rename UX.

## User Feedback Summary

- **Frustration with lost context**: The subagent transcript persistence request (#5291) and the consolidation truncation bug (#5377) both point to users wanting their agent's reasoning and data fully preserved—lossless memory is a clear priority.
- **Confusing completion signals**: The WebUI copy/fork display bug (#5368) was quickly identified and fixed, indicating users interact heavily with per-message actions and need clear turn boundaries.
- **Desire for multi-threaded workflows**: Multiple open PRs (#5358, #5364, #5389) serve the same underlying need—users want to organize, reference, and run multiple sessions in parallel without losing state.
- **Feature velocity is appreciated**: Model preset naming ambiguities (#5399) and selection edge cases (#5397) received targeted fixes within days of being surfaced, signaling responsive maintainers.

## Backlog Watch

- **[#5271: Stale background task saves overwrite session data](https://github.com/HKUDS/nanobot/pull/5271)** — flagged priority P0 with open conflicts; this data-safety PR deserves immediate attention.
- **[#5291: Persist subagent transcripts](https://github.com/HKUDS/nanobot/pull/5291)** — open for 9 days with no maintainer activity; medium priority with valuable auditability wins.
- **[#5364: Temporary side conversations](https://github.com/HKUDS/nanobot/pull/5364)** — marked with conflicts; needs rebasing support to stay mergeable.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-08-16

## 1. Today's Overview

ZeroClaw shows heavy RFC-driven architectural activity, with 50 issues and 50 PRs updated in the last 24 hours. The project is in a design-heavy phase: a large share of open issues are `type:rfc` proposals targeting v0.9.0, several of which are being actively revised with new revisions. Maintainer attention is the primary bottleneck, with numerous RFCs awaiting maintainer review and several PRs blocked on `needs-author-action`. A recently merged stack of five PRs (by IftekharUddin) closed out the Anthropic refusal/fallback feature family, marking the most significant completed work. No new releases were published in this window.

## 2. Releases

No new releases were published in this window.

## 3. Project Progress

Six PRs were merged or closed in the last 24 hours. The standout is a stacked series by IftekharUddin completing the **Anthropic refusal/fallback feature**:

- **#9262 — Surface native Anthropic refusals as typed errors** ([link](https://github.com/zeroclaw-labs/zeroclaw/pull/9262)): HTTP 200 safety refusals with `stop_reason: "refusal"` are now typed `AnthropicRefusalError` instead of silent empty success.
- **#9263 — Route refusals through client-side fallback entries** ([link](https://github.com/zeroclaw-labs/zeroclaw/pull/9263)): The reliability layer now recognizes refusals as non-retryable and routes them through configured fallback models.
- **#9265 — Opt-in Anthropic server-side fallback requests** ([link](https://github.com/zeroclaw-labs/zeroclaw/pull/9265)): New `server_fallback_models` config field on `[providers.anthropic]`.
- **#9266 — Detect Anthropic server-side fallback responses** ([link](https://github.com/zeroclaw-labs/zeroclaw/pull/9266)): Reads native signals to report which model actually served the turn.
- **#9268 — Surface safeguard fallback notices** ([link](https://github.com/zeroclaw-labs/zeroclaw/pull/9268)): Channel orchestrator now surfaces the recorded safeguard notice to end users.

This stack was predicated on trusted provider reliability telemetry; new PR **#10003** (open) extends this work by accounting for Reliable rejected attempts exactly.

## 4. Community Hot Topics

- **#8603 — RFC: OpenAI-compatible Chat Completions profile** ([link](https://github.com/zeroclaw-labs/zeroclaw/issues/8603), 21 comments). Most-commented item. Demand is clear: users want to plug ZeroClaw into the existing OpenAI-ecosystem tooling (Open WebUI, LobeChat, Continue.dev, Aider, LangChain). This is a strong signal for an HTTP/SSE surface alongside the existing WebSocket/ACP transports.
- **#9487 — RFC: Runtime-owned conversation sessions and transport adapters** ([link](https://github.com/zeroclaw-labs/zeroclaw/issues/9487), 17 comments). NiuBlibing is driving an ownership-boundary redesign, ratifying boundaries across #9487/#9488/#9600. Underlying need: a coherent session model across all transports (web, ACP, channels) without duplicating state.
- **#9488 — RFC: Unified attachment architecture** ([link](https://github.com/zeroclaw-labs/zeroclaw/issues/9488), 16 comments). Companion to #9487. Users need a single way to handle files/images across web chat and channels; the current per-channel behavior is fragmenting the design.
- **#6954 — RFC: Internally initiated agent turns** ([link](https://github.com/zeroclaw-labs/zeroclaw/issues/6954), 13 comments). Long-running design discussion (since May) on how cron/automation-initiated turns bind to conversations and produce replies.
- **#6971 — RFC: Security posture and universal ingress policy** ([link](https://github.com/zeroclaw-labs/zeroclaw/issues/6971), 13 comments). Operators want a single inspectable/auditable security model rather than piecemeal controls.

## 5. Bugs & Stability

No new bug reports were filed in the last 24 hours; the bug activity is follow-up work on known issues:

- **#9965 — Cron custom-shell test hits ETXTBSY** ([link](https://github.com/zeroclaw-labs/zeroclaw/issues/9965), accepted, P1). Flaky test failing unrelated PRs under the Parallel Runtime Test gate. Author (AngryPacifist) was blocked by the cron lock bug that PR #9320 fixes; not the author's fault. The known fix likely lands with the wider cron timeout work.
- **#7527 — macOS desktop app blank window on reopen** ([link](https://github.com/zeroclaw-labs/zeroclaw/issues/7527), closed). Closed in this window; the cause was determined and the issue resolved.
- **#9002 — Gateway: agent turns cancelled on viewer disconnect** ([link](https://github.com/zeroclaw-labs/zeroclaw/pull/9002), open, P1). Fix PR in review; treats the dashboard WebSocket as viewer/controller rather than owner of the turn. Still needs author action.
- **#9320 — Cron jobs hang without wall-clock timeout** ([link](https://github.com/zeroclaw-labs/zeroclaw/pull/9320), open, P1). Fix PR exists but needs author action.

## 6. Feature Requests & Roadmap Signals

Three RFCs stand out as likely v0.9.0 candidates given their revision activity and maintainer/community engagement:

- **#8603 — Chat Completions profile** ([link](https://github.com/zeroclaw-labs/zeroclaw/issues/8603)): most-commented issue in the repo. If accepted, this unlocks integration with the entire OpenAI tool ecosystem and would be a major adoption driver.
- **#8780 — Realtime speech-to-speech (Gemini Live)** ([link](https://github.com/zeroclaw-labs/zeroclaw/issues/8780)): rewritten to a broker contract (v2, updated 2026-08-16). Active design effort suggests maintainer interest; a realtime voice channel would be a differentiator.
- **#9103 — Separate authoritative memory from enrichment connectors** ([link](https://github.com/zeroclaw-labs/zeroclaw/issues/9103)): clean architectural split (Lucid as connector, not backend). Low controversy, high value; likely to be accepted with minor revision.
- **#9810 — Agent Plugins 1.0 standard support** ([link](https://github.com/zeroclaw-labs/zeroclaw/issues/9810)): vendor-neutral plugin packaging (`plugin.json` + `skills/` + `mcp.json`). Ecosystem play; likely if maintainers want community plugin growth.

## 7. User Feedback Summary

- **Tooling compatibility is the #1 ask.** The most-commented issue (#8603) is about speaking OpenAI's protocol. Users explicitly name the tools they want to use ZeroClaw with (Open WebUI, LobeChat, Continue.dev, Aider, LangChain).
- **Cron is under-documented and under-powered.** #7762 (4 comments) asks for both docs and per-job model selection ("run it on the cheapest agent"). Suggests users are already using cron in production and want cost control.
- **Channel ergonomics matter.** Discord thread mode (#7849), WeCom proactive messaging (#7824), and attachment handling (#9488) all show users pushing channels beyond simple reply bots.
- **Security false positives hurt usability.** #9825: the leak detector redacts public blockchain addresses, breaking payment-request URLs. The detector works as designed — but the design needs publish-safe exceptions. Shows real tension between safety defaults and legitimate use.

## 8. Backlog Watch

Items that have been open a long time and need maintainer decision or attention:

- **#6954 — RFC: Internally initiated agent turns** ([link](https://github.com/zeroclaw-labs/zeroclaw/issues/6954), open since 2026-05-26, 13 comments). Rev 2 written 2026-08-05, still `needs-maintainer-review`. This blocks cron correctness work.
- **#6971 — RFC: Security posture and universal ingress policy** ([link](https://github.com/zeroclaw-labs/zeroclaw/issues/6971), open since 2026-05-27, 13 comments). Still `needs-maintainer-review`; core security architecture.
- **#6909 — RFC: Computer-use desktop support** ([link](https://github.com/zeroclaw-labs/zeroclaw/issues/6909), open since 2026-05-25, 9 comments). `needs-author-action` since May; no maintainer response visible in the data.
- **#7108 — CI cached Rust builds** ([link](https://github.com/zeroclaw-labs/zeroclaw/issues/7108), open since 2026-06-02, accepted). 15–20 min CI per PR is an accepted problem with no merged fix; PR #9867 (size-label automation) is adjacent but not the critical-path fix.
- **#7762 — Cron docs and per-job model selection** ([link](https://github.com/zeroclaw-labs/zeroclaw/issues/7762), open since 2026-06-16, accepted). No PR attached; small, high-value documentation + config work.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

**PicoClaw Project Digest — 2026-08-16**

**1. Today's Overview**
PicoClaw is in a low-activity state, with zero new issues, releases, or merged pull requests in the last 24 hours. Two pull requests remain open, both flagged as stale, awaiting maintainer review or testing. The project shows a clear focus on reliability fixes for external integrations, specifically WhatsApp and model context caching. No regressions or new bug reports have surfaced, indicating a stable baseline, but the lack of maintainer movement on open PRs is a potential bottleneck.

**2. Releases**
No new releases were published this period.

**3. Project Progress**
No pull requests were merged or closed in the last 24 hours. The two open PRs remain pending review:
- **PR #3321** ([link](https://github.com/sipeed/picoclaw/pull/3321)): Proposes moving dynamic context blocks after conversation history to preserve prefix caching efficiency.
- **PR #3320** ([link](https://github.com/sipeed/picoclaw/pull/3320)): Updates the `whatsmeow` dependency to resolve a critical WhatsApp channel failure.

**4. Community Hot Topics**
There are no issues or PRs with significant comment activity or reactions to analyze today. Both open PRs, **#3321** ([link](https://github.com/sipeed/picoclaw/pull/3321)) and **#3320** ([link](https://github.com/sipeed/picoclaw/pull/3320)), have zero comments and zero reactions, suggesting they are technical fixes submitted by a contributor (grrowl) that have not yet attracted broader community discussion.

**5. Bugs & Stability**
No new bugs, crashes, or regressions were reported in the last 24 hours. However, a critical unresolved stability issue is documented in **PR #3320** ([link](https://github.com/sipeed/picoclaw/pull/3320)): the native WhatsApp channel is completely non-functional due to a client version rejection (`Client outdated (405)`), with no automatic reconnect. The project is actively working on a dependency bump to fix this, but the fix is unmerged and the channel remains dead.

**6. Feature Requests & Roadmap Signals**
No explicit feature requests were filed today. The technical direction is set by the two open PRs: **PR #3321** ([link](https://github.com/sipeed/picoclaw/pull/3321)) signals an optimization for cost and latency (prefix caching), which is likely a precursor to larger-scale deployment or heavy multi-turn usage. **PR #3320** ([link](https://github.com/sipeed/picoclaw/pull/3320)) is a dependency refresh to restore service, which is a required maintenance step before any new features on the WhatsApp channel can be considered.

**7. User Feedback Summary**
No direct user feedback (comments, reactions, or new issues) was recorded in this period. The only implied user pain point derives from **PR #3320** ([link](https://github.com/sipeed/picoclaw/pull/3320)): users relying on the WhatsApp integration are currently unable to use the channel at all. The PR author's detailed description indicates a functional outage rather than a minor annoyance.

**8. Backlog Watch**
Both open PRs require urgent maintainer attention to prevent staleness and service degradation:
- **PR #3320** ([link](https://github.com/sipeed/picoclaw/pull/3320)): Restores WhatsApp functionality; blocking a core channel. Critical.
- **PR #3321** ([link](https://github.com/sipeed/picoclaw/pull/3321)): Performance/cost optimization; non-urgent but important for scalability.

Both have been open for over a week and are marked stale, increasing the risk of merge conflicts or abandonment. The project shows a pattern of single-contributor submissions with low community engagement, which may be a risk to long-term maintenance.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

**NanoClaw Project Digest — 2026-08-16**

---

## 1. Today's Overview

NanoClaw saw intensive development today with 22 pull requests updated in a single day, a substantial throughput spike. While no new releases were cut and no new issues were filed, the core team led by gavrielc pushed 13 PRs across channels, permissions, database, and container runtime areas. The project is maturing its channel abstraction layer with Telegram integration, while a cluster of PRs (#3254, #3255, #3256, #3257) indicates strong attention to multi-session, cross-session context, and conversation lifecycle correctness. Of the 3 closed PRs today, one was a post-merge fix (#3268) resolving a poll-loop leak, and two were functional integrations (#37, #2752 — for details, see Section 3). A broad refactor contribution (#37) proposing a rename to "DotClaw" and a full WhatsApp-to-Telegram switch was finalized, though it may conflict with a separate, newer Telegram adapter PR (#3269).

---

## 2. Releases

No new releases were published today (latest release date is not defined in the provided data). No breaking changes or migration notes are available for this cycle.

---

## 3. Project Progress

- **#37 — [CLOSED] Rename to DotClaw and switch from WhatsApp to Telegram** ([PR #37](https://github.com/nanocoai/nanoclaw/pull/37)) — A project-wide rename from `nanoclaw` to `dotclaw` and a full switch from WhatsApp to Telegram using the Telegraf library. Removes all WhatsApp auth code, old logos, and favicons; adds new launchd plist and setup scripts. Given two other Telegram-related PRs are aligned to active work in the same area (#3269), the merge signals the Telegram direction is now official, with a potential project rename baked into the next release.
- **#3268 — [CLOSED] fix(poll-loop): stopped loops leaked their active query's follow-up poller** ([PR #3268](https://github.com/nanocoai/nanoclaw/pull/3268)) — A critical core fix: `runPollLoop` only checked the abort signal between iterations, but loops parked inside `processQuery` leaked the active query and its 500ms follow-up poller. Stopping a loop now cleanly cancels in-flight work, preventing zombie pollers.
- **#2752 — [CLOSED] fix: stage inbound attachments that expose only a url (Discord)** ([PR #2752](https://github.com/nanocoai/nanoclaw/pull/2752)) — Previously the agent saw only bare `[file: message.txt]` / `[image: foo.png]` fragments from Discord, never receiving bytes or a path; the chat-sdk bridge now stages URL-only attachments for the agent.

**Additionally, 19 PRs remain open and were updated today across the following areas:**
- **Channels/Telegram (3):** Telegram channel adapter with pairing flow and Markdown sanitizer (#3269); drop of the legacy-Markdown sanitizer that downgraded bold to italic (#3250); a Chat SDK bridge for DM surface normalization and context events (#3262); and optional adapter capabilities for setTyping, thread titles, and suggested prompts (#3261).
- **Permissions & Delivery (4):** A registerChannelCardInterceptor seam (#3266), a `decline_notify` unknown-sender policy (#3260), a `registerDeliveryBatchPreview` hook (#3264), and a fix to outbound delivery resolving the sender's own channel row instead of a sibling instance (#3255).
- **Cross-session context (2):** A cross-session context module with fan-out and DM backfill plus `ncl sessions history` (#3257); and a database layer adding `detached_at` to messaging_groups (migration 022) with delivery refusal into detached conversations (#3256).
- **Container & Agent runtime (4):** Two-phase inbound batch selection to prevent context rows crowding out tasks (#3254); a heartbeat stall fix for rate-limited conditions (#3251); an idle container fix exempting no-heartbeat-file containers from the absolute-ceiling kill (#3252); and an option for `createAgent` to suppress only the created-notify message (#3265).
- **Tooling & Model config (2):** Skill-apply heading-ordinal strip + headless browser URL surfacing (#3259); and honoring the group reasoning effort in the model config for opencode (#3253).

---

## 4. Community Hot Topics

All 22 PRs show 0 comments, so there is no community hot topic by comment count. By volume of forward motion, three clusters stand out as signaling the roadmap:

- **Telegram-channel completions (#3269, #3250, #37):** With a new adapter PR, a legacy sanitizer removal, and a closed project-wide rename to switch to Telegram, the platform migration is now a top priority. Watch [PR #3269](https://github.com/nanocoai/nanoclaw/pull/3269) and [PR #3250](https://github.com/nanocoai/nanoclaw/pull/3250) together — the old sanitizer must not be merged back after `#3269` lands.
- **Multi-session stability (#3254, #3255, #3256, #3257):** Four PRs in one day target correctness across concurrent sessions, including detached-conversation state and cross-session context fan-out. The motivation is clear: any given agent group can run many sessions in a room, and the project is hardening data selection, delivery row resolution, and lifecycle state handling. See [PR #3254](https://github.com/nanocoai/nanoclaw/pull/3254) and [PR #3255](https://github.com/nanocoai/nanoclaw/pull/3255).
- **Heartbeat & container-stuck logic (#3251, #3252, #3268):** A wave of correctness fixes around idle/stuck detection and poller cleanup demonstrates real-world flakiness in long-running agent processes is being actively debugged. See [PR #3251](https://github.com/nanocoai/nanoclaw/pull/3251) and [PR #3268](https://github.com/nanocoai/nanoclaw/pull/3268).

---

## 5. Bugs & Stability

Ranked by severity:

1. **CRITICAL — Heartbeat stall during rate-limiting** ([PR #3251](https://github.com/nanocoai/nanoclaw/pull/3251)) — Container heartbeat only touched on API events; during Claude API rate-limits or hangs, the agent could be falsely killed as stale after 30+ minutes. Fix is open.
2. **HIGH — Zombie poll-leak on stopped loops** ([PR #3268](https://github.com/nanocoai/nanoclaw/pull/3268)) — Stopped `runPollLoop` could leak the active query and its follow-up poller, causing resource buildup. **Fixed and merged today.**
3. **HIGH — Idle-container kill bypass** ([PR #3252](https://github.com/nanocoai/nanoclaw/pull/3252)) — A container with no `.heartbeat` file is permanently exempt from the absolute-ceiling kill, regardless of how long it runs. Fix puts the ceiling back into effect.
4. **MEDIUM — Discord attachments never reach agent** ([PR #2752](https://github.com/nanocoai/nanoclaw/pull/2752)) — Both pasted text (auto-converted to `message.txt`) and images showed as bare placeholders with no bytes. **Fixed and merged** (staging URL-only attachments).
5. **MEDIUM — Context rows crowd out real tasks** ([PR #3254](https://github.com/nanocoai/nanoclaw/pull/3254)) — Backlogged `trigger=0` context rows newer than a due task could push the task out of the batch; the wake fired but the agent never saw the work. Fix changes selection to two-phase.
6. **MEDIUM — Incorrect channel row resolution in delivery** ([PR #3255](https://github.com/nanocoai/nanoclaw/pull/3255)) — `deliverMessage` could route to a sibling instance row instead of the sender's own when multiple bot identities shared a room.
7. **MEDIUM — Telegram bold rendered as italic** ([PR #3250](https://github.com/nanocoai/nanoclaw/pull/3250)) — Legacy Markdown sanitizer downgrades `**bold**` to italic. A known workaround to be removed once new adapter is in place.
8. **LOW — Skill-apply step caption ordinals wrong** ([PR #3259](https://github.com/nanocoai/nanoclaw/pull/3259)) — Authoring ordinals (`2.`/`2)`) were taken verbatim from SKILL.md captions, producing misleading step numbers in multi-skill skips.

---

## 6. Feature Requests & Roadmap Signals

All features opening today came from maintainers, signaling the roadmap:

- **Cross-session context visibility** — `ncl sessions history` and automatic fan-out of relevant context to sibling sessions ([PR #3257](https://github.com/nanocoai/nanoclaw/pull/3257)) will likely ship as the flagship feature for agent-group UX.
- **Conversation lifecycle awareness** — `detached_at` plus delivery refusal into detached conversations ([PR #3256](https://github.com/nanocoai/nanoclaw/pull/3256)) is a stepping stone for later re-engagement logic.
- **Hot-start for newly registered adapters** — a `startChannelAdapter(key)` registry method assumes adapters may be added at runtime, no restart required ([PR #3263](https://github.com/nanocoai/nanoclaw/pull/3263)).
- **Unknown-sender policy `decline_notify`** — fourth policy for DMs: bot politely declines unknown senders plus one-line owner FYI, without interrupting an admin with an approval card ([PR #3260](https://github.com/nanocoai/nanoclaw/pull/3260)).
- **Rich presence via typing status, thread titles, suggested prompts** — per-adapter capability widening from bare "typing..." to contextual status lines, tool-derived vs agent-authored, and platform suggestion chips ([PR #3261](https://github.com/nanocoai/nanoclaw/pull/3261)).
- **Batch delivery previews** — a `registerDeliveryBatchPreview` hook for prefetching expensive dependencies across a whole undelivered batch before per-row delivery ([PR #3264](https://github.com/nanocoai/nanoclaw/pull/3264)).

Given the density and consistency of this feature set, the next minor release will likely land soonest on the **cross-session context** and the **channel adapter capability surface** (as part of the Telegram rollout), followed by the container-lifecycle management where visibility hooks are the goal.

---

## 7. User Feedback Summary

No user-submitted issues or feature requests arrived today; all 22 PRs were authored by maintainers or the core team. The one plausible community touchpoint is [PR #2752](https://github.com/nanocoai/nanoclaw/pull/2752) (Discord attachments), which was fixed and closed today, indicating real-world user pain on missing attachment data was acknowledged and addressed. The type of work in this batch — adapter hot-starting, channel row resolution, poll-loop cancellations, heartbeat robustness — is consistent with operator pain reported for steadily-running agent containers over long sessions rather than end-user API feedback.

---

## 8. Backlog Watch

Most open PRs are recent (created 2026-08-15), so nothing is long-stale by date. One older PR still open after ~2 months:

- **#2752 — [CLOSED] fix: stage inbound attachments that expose only a url (Discord)** — closed today; no longer a backlog item.

No other long-unanswered issues or PRs were identified in today's data. The remaining 19 open PRs are all under 24 hours old and have no comments, so no maintainer attention is flagged as overdue. Note that **[PR #37](https://github.com/nanocoai/nanoclaw/pull/37)** was merged (closed) and contains a wholesale rename of the project to `dotclaw` — maintainers should verify that downstream links, documentation, and any external integrations are coordinated for the switch, given older references (`nanocoai/nanoclaw`) may still appear in install instructions.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

**NullClaw Project Digest — 2026-08-16**

**1. Today's Overview**
Activity is light but directional. One new enhancement request (#988) addresses missing proxy support, and one open PR (#987) targets long-running agent loop efficiency. No releases and no merged PRs today indicate the project is in a consolidating phase rather than a shipping burst. The absence of closed issues or merged PRs suggests maintainers are currently focused on review or larger refactors. Overall, health is stable with a clear forward-looking signal on infrastructure (proxies) and performance (loop hygiene).

**2. Releases**
No new releases for this reporting period. No version changes, migration notes, or breaking changes to report.

**3. Project Progress**
No merged or closed PRs were recorded in the last 24 hours. The single open PR (#987) proposes meaningful internal improvements to the agent loop: splitting the system prompt into a cache-friendly stable prefix with a variable timestamp tail, compressing tool outputs before history injection (with full outputs preserved for observers), and adding per-turn identical-call loop detection. These changes target performance and stability for long local runs.

**4. Community Hot Topics**
Both the open issue and PR are new (created 2026-08-15) and have zero comments or reactions so far. No discussion threads are active, so no concentrated community debate exists yet. The two items reflect distinct underlying needs: #988 signals enterprise or restricted-network users who require HTTP/SOCKS proxy support to reach providers, while #987 addresses power users running heavy local tool workloads who need tighter resource and context management.

**5. Bugs & Stability**
No bugs, crashes, or regressions were reported in the last 24 hours. The only stability-adjacent item is PR #987, which proactively addresses potential context bloat and repeated-call inefficiency in long agent loops.

**6. Feature Requests & Roadmap Signals**
One explicit feature request is open: **#988 — HTTP(S) and SOCKS(5h) proxy support for providers**. This is a common enterprise requirement, likely paired with existing authentication or compliance needs. Given its straightforward scope relative to the provider abstraction layer, proxy support is a strong candidate for a near-term minor release.

**7. User Feedback Summary**
The only direct user input today is the proxy request, indicating a user (or organization) currently blocked from using NullClaw behind a firewall or corporate proxy. This is a real deployment blocker rather than a nicety. No negative feedback, bug reports, or complaints about existing features were filed, suggesting baseline satisfaction among active users is unchanged.

**8. Backlog Watch**
No long-unanswered issues or PRs meet the "long-unanswered" threshold in this window. Both items (#987, #988) are fresh, opened on 2026-08-15, and await maintainer review. PR #987 is the higher-effort item and would benefit from maintainer eyes to unblock the proposed performance improvements.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

**IronClaw Project Digest — 2026-08-16**

**1. Today's Overview**

IronClaw shows a high-velocity development cycle with significant consolidation activity. A total of 27 issues were updated, with 21 now closed, indicating strong progress on the backlog. The project is in a major optimization phase, with multiple performance-focused PRs merged to reduce database write amplification, heartbeat journal churn, and thread-index rewrite overhead. Concurrently, the team is addressing live QA infrastructure defects and stack-level reliability issues in the capability dispatch layer. Core contributor activity is high, with a significant number of Large and XL-sized PRs in flight targeting the automations, coding-tool contracts, and the prepared-context turns switchover.

**2. Releases**

No new releases were published in this period.

**3. Project Progress**

Five PRs were closed/merged today, showing a strong focus on performance and data hygiene:

- **Database Write Reduction:** PR #7629 (`perf: reduce trigger and outbound state writes`), authored by serrrfirat, is merged. It gates `prune_run_history` to only the initial fire claim, removing correlated-subquery DELETEs from every running-row update.
- **Heartbeat Journal Churn Elimination:** PR #7628 (`perf(processes): remove heartbeat journal churn`), by serrrfirat, is merged, stopping permanent journal row appends per heartbeat and widening the turn-runner heartbeat interval.
- **Thread Index Coalescing:** PR #7676 (`perf(threads): coalesce thread index touches`), by serrrfirat, is closed. It combines bursty per-thread activity touches into bounded writes, reducing up to 7 full CAS row rewrites per turn to ≤1.
- **Codebase Knowledge Refresh:** The CI bot (ironclaw-ci[bot]) merged PR #7670, refreshing the committed codebase-memory bootstrap snapshot.
- **Prepared-Context Turn Switchover:** PR #7634 (`feat(unbound-turns): complete the switchover to prepared-context turns`), by BenKurrek, is closed after a 71-clause conformance audit, completing the migration to the new model.

**4. Community Hot Topics**

The most actively discussed item this period is the **Trajectory Benchmark System** (Issue #467, created by zmanian), which collected 4 comments. This long-running issue (open since March) pushes for a dual-layer quality evaluation system (hard assertions + LLM-as-judge) on real agent trajectories. Its continued relevance highlights a persistent need for objective, automated quality measurement but contrasts with the current focus on reducing DB load, suggesting benchmarking might still be on the horizon.

Also noteworthy are 7 new issues by henrypark133, each derived from review threads on PR #7634. They represent a cluster of technical-debt and reliability follow-ups—symbol-level dependency allowlists (#7674), BudgetLedger accounting refinements (#7673), and typed ToolChoice (#7672)—that indicate rigorous design review practices, though they have not yet gathered community comments.

**5. Bugs & Stability**

Three new defects were reported today, with two directly impacting test infrastructure:

- **High Severity — Gmail-to-Sheet Flake Cascade (Issue #7675):** This issue by henrypark133 describes an intermittent resource-class capability failure in `qa_6c_gmail_to_sheet_live_chat` that cascades and fails the entire provider-contracts session. It is a harness reliability problem rather than a product bug. Open PR #7679 (`fix(live-qa)`) directly targets this class of harness defects.
- **Medium Severity — Live Canary Redness (PR #7679):** While not an issues list entry, this PR documents that 30/30 scheduled Live Canary runs were red due to three separate harness bugs and one liveness proxy issue, all failing correct product behavior. The PR is fixing these.
- **Medium Severity — Stack Overflow in Tests (Issue #7671):** The capability dispatch decorator chain overflowed the default 2 MiB test-thread stack, fixed by chain-boxing in commit `f1f396cd8`. This is a test-infra reliability issue, now closed by a follow-up.

**6. Feature Requests & Roadmap Signals**

The architectural direction is clearly signaled by PR #7491 (`omp core-tool contract + engines + benchmark arm`), which consolidates the coding-tool surface to exactly six bare names (`read`, `write`, `edit`, `glob`, `grep`, `bash`). This simplifies the tool interface for models and removes legacy spellings, an expected breaking change for agent configurations.

The open PR #7651 (`feat(automations)`) introduces deterministic result-delivery suppression based on user wording. This is likely to be in the next release, as it refines automation behavior for cleaner notifications (only-notify-on-match/change/result).

Open feature areas also point to a hardening phase: **IronHub Agent Link UI** (PR #7516, by contributor neo-sky) adds an operator surface to complete WebUI-based agent linking, unblocking deployments.

**7. User Feedback Summary**

The dominant user pain points are embedded in the triage of infrastructure and performance issues. The closed issue #6821 highlights a UX failure where IronHub search results were read as a complete catalog listing, leading the agent to report only 3 tools out of 18 installed. The flaky live-canary runs (Issue #7675, PR #7679) caused red deployment signals that did not reflect actual product state, which is a critical confidence issue for users relying on the QA pipeline. The push to eliminate dead code (Issue #6726) and reduce write amplification (Issues #7595, #7596) suggests maintainers are balancing feature velocity with system stability and runtime cost.

**8. Backlog Watch**

- **Long-Standing Feature Request (since March):** Issue #467 remains open with 4 comments and no linked PR. It is a foundational benchmarking system that is likely a prerequisite for scaling quality assurance. This near-5-month-old issue is due for a maintainer update or prioritization.
- **Operational Gaps (since June/July):** Several closed issues today were marked as "reborn" or related to production behavior. While they are closed, they recommend focused implementation PRs. Specifically, Issue #5588 (from July) and Issue #4992 about Railway automation failures were closed today, likely consolidated into the larger switchover, but their associated implementation work is not yet visible in the PRs.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

**LobsterAI Project Digest — 2026-08-16**

---

## 1. Today's Overview

LobsterAI shows a steady maintenance cadence with 18 issues and 6 PRs touched in the last 24 hours, though no new releases were published. The vast majority of the 18 updated issues (16) were closed as stale, indicating the maintainers are actively sweeping the backlog — a healthy housekeeping signal. Two issues remain open, both touching on the broader theme of **Agent memory systems and authentication reliability**. The PR front is dominated by four open dependabot CI bumps (two months old and stale), balanced by two functional code changes: one merged fix for plugin load path preservation and one closed fix for cron yield descendant finalization. Overall, the project is in a stable maintenance phase with a clear emphasis on cleaning up old debt rather than shipping new features.

---

## 2. Releases

No new releases were published in the last 24 hours. The most recent release remains prior to the reporting window; no changelog, migration notes, or breaking changes need to be communicated in this digest.

---

## 3. Project Progress

**Merged PR — Plugin Load Path Preservation (#1879)**
- **Status:** Closed/Merged
- **Link:** [PR #1879](https://github.com/netease-youdao/LobsterAI/pull/1879)
- **What advanced:** This fix addresses a config sync bug where LobsterAI would overwrite `openclaw.json`'s `plugins.load.paths` with only the managed third-party extension directory, silently dropping manually added paths (e.g., from `pm install` of community plugins like `memory-lancedb-pro`). The fix preserves manually-added paths during sync, which is a meaningful repair for users running custom plugin setups.

**Closed PR — Cron Yield Descendant Finalization (#2234)**
- **Status:** Closed (not merged; state unclear from data)
- **Link:** [PR #2234](https://github.com/netease-youdao/LobsterAI/pull/2234)
- **What was attempted:** A fix for the `sessions_yield` flow where child agent completions were not driving the parent agent to continue execution. The PR also adds a yield continuation loop in the cron finalization phase and covers three test scenarios (parallel, cron parallel, cron serial). Its closure without merge suggests either the work was superseded or needs more review.

---

## 4. Community Hot Topics

The most active discussions revolve around long-standing product direction and two live user-facing defects.

**1. Agent Memory System Gaps (2 active threads)**
- [Issue #2046](https://github.com/netease-youdao/LobsterAI/issues/2046) — Open; a detailed product proposal on persistence of session metadata, hierarchical memory, and automatic cross-session recall.
- [Issue #2041](https://github.com/netease-youdao/LobsterAI/issues/2041) — Closed as stale; an internal analysis of the memory system's weakness compared to an ideal long-term-memory framework.
- **Analysis:** The community's strongest undercurrent is memory — users want the agent to persist, retrieve, and associate knowledge across sessions. This is likely a top roadmap candidate.

**2. Membership Login Failures (#1903) — OPEN**
- **Link:** [Issue #1903](https://github.com/netease-youdao/LobsterAI/issues/1903)
- **Activity:** 3 comments; 2 thumbs-up.
- **Analysis:** Users report frequent login failures that block access to paid NetEase models. This is a revenue-affecting bug that directly degrades the paid tier experience and needs maintainer attention.

**3. UI/UX Polish Requests (batch of stale-closed issues)**
- [Issue #1836](https://github.com/netease-youdao/LobsterAI/issues/1836) — Request for professional UI redesign; the user explicitly compared the app to competitors and called it "too ugly."
- [Issue #1920](https://github.com/netease-youdao/LobsterAI/issues/1920) and [Issue #1921](https://github.com/netease-youdao/LobsterAI/issues/1921) — Both request cosmetic improvements to loading states and empty states (adding skeleton screens, icons, subtitles).
- **Analysis:** There is a visible pattern of users valuing visual polish as a competitive differentiator. These requests were closed as stale, but their recurrence signals continued dissatisfaction with the UI layer.

---

## 5. Bugs & Stability

**High Severity — Membership Login Failures (OPEN)**
- [Issue #1903](https://github.com/netease-youdao/LobsterAI/issues/1903) — Recurring login failure for members. Blocking access to paid NetEase models. No fix PR referenced.
- **Impact:** Directly blocks paid features; highest revenue and user-retention risk.

**Medium Severity — Streaming Cutoff / Infinite NO_REPLY (Closed as stale)**
- [Issue #1849](https://github.com/netease-youdao/LobsterAI/issues/1849) — Task is prematurely completed while the model continues outputting, causing blank pages and infinite `NO_REPLY` results.
- **Status:** Stale-closed; no evidence of a follow-up fix.

**Medium Severity — AI Engine Connection Lost (Closed as stale)**
- [Issue #1993](https://github.com/netease-youdao/LobsterAI/issues/1993) — Desktop app persistently reports "AI engine connection lost" while IM bot works stable. No fix surfaced.
- **Status:** Stale-closed; still a suspect stability gap for desktop users.

**Medium Severity — Scroll Breakage with Long Content (Closed as stale)**
- [Issue #1971](https://github.com/netease-youdao/LobsterAI/issues/1971) — Virtual scrolling breaks when a session contains very long elements (e.g., large Mermaid diagrams), causing infinite re-render loops and unresponsive scrolling.
- **Status:** Stale-closed; root cause already identified via repeated destroy/re-render of virtual list items.

**Low Severity — Security/Config Issues (Closed as stale)**
- [Issue #1885](https://github.com/netease-youdao/LobsterAI/issues/1885) — Path traversal vulnerability in the IMAP/SMTP email skill's attachment downloader (unsanitized filenames).
- [Issue #1988](https://github.com/netease-youdao/LobsterAI/issues/1988) — Configuration force-overwrite bug where `qwen3.6-plus` gets remapped to NetEase's own model, breaking the coding plan.
- **Status:** Both stale-closed without confirmed fixes.

---

## 6. Feature Requests & Roadmap Signals

**High-Priority Signal — Agent Memory System (backed by 3 distinct issue threads)**
- [Issue #2046](https://github.com/netease-youdao/LobsterAI/issues/2046) (open) requests session metadata persistence to the filesystem, automatic agent-readable history, and cross-session retrieval.
- [Issue #2039](https://github.com/netease-youdao/LobsterAI/issues/2039) (stale-closed) documents a bug in the `/dreaming on` switch caused by an upstream OpenClaw schema issue.
- [Issue #2041](https://github.com/netease-youdao/LobsterAI/issues/2041) (stale-closed) is an internal analysis of memory-system gaps.
- **Prediction:** Memory persistence and cross-session awareness is the single strongest roadmap signal in this batch. The upcoming version will likely include an improved memory-core integration that writes session titles/metadata to disk and enables agent-side retrieval.

**Medium Signal — Plugin Ecosystem Usability**
- [PR #1879](https://github.com/netease-youdao/LobsterAI/pull/1879) (merged) fixed a config sync pain point for community plugins. Combined with [Issue #2036](https://github.com/netease-youdao/LobsterAI/issues/2036) (stale-closed) requesting new gateway events for real-time state broadcasting, the project appears to be improving extensibility for third-party plugins.

**Low Signal — Additional Engines and Integrations**
- [Issue #1880](https://github.com/netease-youdao/LobsterAI/issues/1880) (stale-closed) — request to add Hermes Agent support alongside OpenClaw.
- [Issue #2016](https://github.com/netease-youdao/LobsterAI/issues/2016) (stale-closed) — request to add the openhuman engine.
- **Prediction:** These are stretch goals; likely not in the immediate next release unless community demand grows.

---

## 7. User Feedback Summary

**Strongest Pain Point — Memory and Continuity**
- Multiple users across issues (#2046, #2041, #2039) express frustration that the agent "starts from zero" on every task, doesn't remember or associate prior sessions, and cannot link related conversation context. This is the most vocal and emotionally weighted feedback in the current window.

**Second Pain Point — Paid-Tier Accessibility**
- Users report that membership login failures (#1903) make paid NetEase models unusable, effectively breaking their paid experience.
- A separate but related complaint (#1988) states that the system force-overwrites `qwen3.6-plus` configuration to NetEase's own model and errors out on insufficient quota.

**Recurring Dissatisfaction — Desktop App Stability**
- Conflicting stability: desktop app shows "AI engine connection lost" while IM bot works fine (#1993); local installs fail to start or authenticate (#2017); WeChat IM bot can't be configured because no input UI appears for the 6-digit verification code (#1878).

**UX/Visual Design Complaints**
- Users consistently flag the UI as visually dated compared to competitors (#1836), with specific requests for skeleton loading screens (#1920) and richer empty states (#1921).

**Security Awareness Is Present**
- A path traversal vulnerability in the email attachment skill was reported (#1885) — the community is actively auditing the codebase, which is both a risk signal and a sign of engaged trust.

---

## 8. Backlog Watch

**Open Issues Needing Maintainer Action**

1. **Membership Login Failures (#1903) — OPEN, 3 comments, 2 👍**
   - [Link](https://github.com/netease-youdao/LobsterAI/issues/1903) — Oldest open item in this window (created 2026-05-07). Blocks paid users; no maintainer response visible. High priority.

2. **Agent Memory System Proposal (#2046) — OPEN, 2 comments**
   - [Link](https://github.com/netease-youdao/LobsterAI/issues/2046) — Detailed proposal with prioritized action items; still unanswered. Contains actionable and high-valued feedback that aligns with existing internal analysis (#2041).

**Stale-Closed Issues Likely to Resurface**

3. **Email Skill Path Traversal (#1885) — stale-closed, no fix confirmed**
   - [Link](https://github.com/netease-youdao/LobsterAI/issues/1885) — Security-related; has been closed without a verified patch. Watch for regressions or future exploitation.

4. **Qwen Model Config Force-Overwrite (#1988) — stale-closed, no fix referenced**
   - [Link](https://github.com/netease-youdao/LobsterAI/issues/1988) — Recurs as a config-sync bug pattern; merged PR #1879 may partially address it but was not explicitly linked.

**Open PRs Needing Maintainer Review**

5. **Four stale dependabot PRs (#2164, #2165, #2166, #2167)** — all created 2026-06-15, stale for two months — [example: #2164](https://github.com/netease-youdao/LobsterAI/pull/2164). The `actions/stale` bump is particularly relevant if the team wants the bot to handle its own staleness better, but the manual triage is still pending.

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

**Moltis Project Digest — 2026-08-16**

**1. Today's Overview**
Moltis is in a high-velocity integration phase, with 16 PRs updated in the last 24 hours (14 closed/merged). The project shows strong momentum across three fronts: security hardening (zip/model path traversal, node pairing signatures), OS-level compatibility (macOS/bash 3.2 fixes), and large feature additions (new connector suite, Slack native cards, Coder remote sandbox). Two dependency bumps (npm/yarn) were processed automatically. No release was cut today, despite the volume of merged work. The two closed issues indicate a healthy bug-triage loop, with fixes landing quickly.

**2. Releases**
No new releases were published during this window. A release note may be expected shortly given the volume of merged features (connectors, sandbox backend, UI integrations).

**3. Project Progress**
- **Security:** Merged PR #1180 hardening model and zip paths against arbitrary file write and code execution. Merged PR #1179 binding node pairing signatures to server-issued challenges, closing a critical verification gap.
- **Session Management:** Merged PR #1182 allowing users to delete/archive the `main` session, resolving issue #1132.
- **Build/DevOps:** Merged PR #1191 fixing sandbox builds by updating the gogcli module path to the new `openclaw` org. Merged PR #1192 updated the wacrawl skill’s install metadata for the same org move. Merged PR #1194 hardened shell scripts against unbound array expansions for macOS bash 3.2.
- **Memory & Persistence:** Merged PR #1158 adding a feature-gated `zvec` vector database memory backend (experimental, enabled by default in `full`).
- **Connectors:** Merged PR #1190 introducing durable, provider-neutral calendar, channel, and email connectors with local full-text search and atomic snapshots.
- **Integrations:** Merged PR #1195 adding Slack native live plan/task cards with privacy-safe per-run IDs. Merged PR #1198 routing OpenAI reasoning tool calls through the Responses API while preserving Chat Completions behavior for compatible providers.
- **Search & UX:** Merged PR #1196 fixing ClawHub skill search timeouts. Merged PR #1197 enabling agent chat initiation from the command palette.

**4. Community Hot Topics**
- **PR #1158 (`zvec` memory backend):** Though closed, this experiment drew attention as a community-led alternative backend using Zvec/redb with a local llama-cpp embedding server. It signals user desire for self-hosted, customizable memory solutions.
- **PR #1190 (Durable connectors):** A large architectural addition covering CalDAV, Gmail, and Himalaya v2. The scope and long review cycle (Aug 11–16) indicate active maintainer investment in extensibility.
- **PR #1180 (Security hardening):** Critical fixes for arbitrary file write via malicious zip or HuggingFace repos. This addresses severe trust-boundary issues and is the most significant security work in this window.

**5. Bugs & Stability**
- **High:** Zip extraction and HuggingFace model path traversal allowing arbitrary file overwrite (PR #1180, merged — fix available). Malicious repos could overwrite user config/credentials leading to code execution.
- **Medium:** Node pairing signature verification missing, allowing callers to supply their own key/challenge (PR #1179, merged — fix available).
- **Low:** `main` session could not be deleted/archived (Issue #1132, fixed in PR #1182).
- **Low:** Sandbox build failure due to moved gogcli GitHub org (Issue #1189, fixed in PR #1191).
- **Low:** macOS bash 3.2 crashes in `just local-validate-full` (PR #1194, merged — fixed).

**6. Feature Requests & Roadmap Signals**
- **Remote sandboxing:** PR #1199 (open) adds a Coder remote workspace sandbox backend, suggesting a roadmap push toward remote/cloud execution environments.
- **Vault resilience:** PR #1186 (open) proposes normalizing recovery phrases before hashing for vault unsealing — likely to be merged to improve key recovery UX.
- **Memory extensibility:** PR #1158 hints at a plugin-style backend architecture for memory, which could be formalized in upcoming releases.
- **Performance:** PR #1196’s fix for ClawHub search timeouts suggests ongoing work on scalability and RPC efficiency.

**7. User Feedback Summary**
- **Security consciousness:** Contributor tsauvajon explicitly notes wanting to use Moltis only after security fixes land, reflecting growing community concern about trust boundaries in AI-assisted workflows.
- **macOS usability:** User reports immediate crashes on macOS due to bash 3.2 incompatibility, indicating a broader macOS user base than previously accounted for.
- **Self-hosting preference:** The `zvec` backend PR shows users are running Moltis with independently hosted embedding servers (llama-cpp), suggesting demand for decoupled model infrastructure.
- **Org migrations:** Multiple fixes (gogcli, wacrawl) resulted from upstream org renames, indicating the project relies on a fast-moving ecosystem of Go-based tools.

**8. Backlog Watch**
- **PR #1199 (open, Coder sandbox):** In review since Aug 15; no comments yet. May need maintainer validation or feature scope discussion before merge.
- **PR #1186 (open, vault recovery phrase normalization):** Open since Aug 9; touches security-sensitive hashing logic, likely awaiting deeper review.
- **Issue #1132 (closed today):** While resolved, its 2-month lifespan highlights a gap in session lifecycle management that was previously unaddressed. No other long-running items are currently open.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw Project Digest — 2026-08-16

## Today's Overview

Moderate activity day with 10 issues and 11 PRs updated in the last 24 hours. Notably, no PRs were merged or closed today — all 11 remain open, suggesting a review bottleneck. Issue volume spiked significantly (9 new issues opened today, mostly bug reports), concentrated in the Console UI, video attachment handling, and cron CLI areas. First-time contributors are highly active, accounting for 6 of the 11 open PRs. The backlog includes one long-running enhancement from April (#3915) and a closed Matrix E2E encryption bug (#6476) that was resolved.

## Releases

No new releases today.

## Project Progress

No PRs were merged or closed today. All 11 open PRs remain in review or draft status, including:

- **#6940** — Native DataPaw app runtime and durable analysis workspace (open since Aug 12, first-time contributor)
- **#6302** — Unifies provider discovery, model metadata, routing, and agent controls (open since Jul 21, largest scoped PR in flight)
- **#6623** — Fixes ACP transport race condition causing final text loss (under review since Aug 1)

Key fixes awaiting merge: **#7061** (video delivery on OpenAI Responses API), **#7055** (cron `--text` update silent failure), and **#7057** (subprocess PATH for user-local binaries).

## Community Hot Topics

- **#3915** — Virtual scrolling for Console WebUI (1 👍, 3 comments): Long-running performance complaint from April; users report severe lag with long conversations. A pagination PR (#7049) directly addresses this and may be the chosen solution.
- **#6476** — Matrix E2E encryption (3 comments, closed): User documented step-by-step olm/vodozemac installation workaround; resolved.
- **#7061 / #7059 / #7060** — Video context bugs: One user (xiaoka76) filed two bugs and submitted a fix PR, generating active cross-referenced discussion.

## Bugs & Stability

Top issues by severity, all opened today:

1. **#7051** (High) — Console chat images lost on session reload; broken thumbnails served as data URLs. No fix PR yet.
2. **#7059** (High) — `view_video` tool-result frames silently dropped on OpenAI Responses API; model never receives video. Fix PR exists: **#7061**.
3. **#7053** (Medium) — OAuth2 refresh never persists rotated refresh_token; remote MCP degrades to manual re-auth permanently. No fix PR.
4. **#7048** (Medium) — `qwenpaw cron update --text` returns success but prompt never changes. Fix PR exists: **#7055**.
5. **#7060** (Medium) — `view_video` inline cap hardcoded at 2 MB; provider `max_inline_media_bytes` ignored. No fix PR.
6. **#6476** (Fixed) — Matrix E2E encryption resolved via documented olm/vodozemac installation.

## Feature Requests & Roadmap Signals

- **#7058** — Restore native context strategy option in web UI; v2.1.0 removed the selector but backend still supports it. Signals a regression from UI simplification — likely in next patch.
- **#7056** — Background task callback/notification mechanism; users want push notifications instead of polling `check_agent_task`.
- **#7052** — Plugin API `system_prompt` permission control; corporate user wants to hide prompt from end users.
- **#7050** — Per-cron-job model override picker (PR submitted); likely small UI addition for next release.
- **#7049** — Pagination for `GET /chats/{chat_id}` (PR submitted); likely to land and address #3915 performance concerns.

## User Feedback Summary

- **Console usability regression**: Users report the removal of the native context strategy selector as a step backward (#7058). Performance complaints about long conversations persist (#3915).
- **Video support is broken for a subset**: `view_video` silently fails or omits frames on OpenAI Responses API providers (#7059), and the 2 MB hard cap produces confusing placeholder text (#7060). A fix is ready but unmerged.
- **Cron CLI is unreliable**: `--text` updates silently no-op (#7048) — a trust-damaging bug for automation users.
- **MCP OAuth2 is fragile**: Rotating refresh tokens break remote MCP integrations permanently (#7053).
- **Matrix channel is maturing**: E2E encryption fix (#6476) closed, and a PR (#7001) proposes per-sender session isolation in group rooms — suggesting active real-world Matrix usage.

## Backlog Watch

- **#6302** (open since Jul 21) — Large unification PR for provider discovery/model routing; no reviewer activity visible in the last 24h. This is the most significant architectural PR in flight and needs maintainer attention.
- **#6623** (open since Aug 1, under review) — ACP transport race-condition fix; no merge progress in two weeks.
- **#3915** (open since Apr 28) — Virtual scrolling request; 1 👍 and 3 comments, still unaddressed at the design level, though #7049 may resolve it indirectly.

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