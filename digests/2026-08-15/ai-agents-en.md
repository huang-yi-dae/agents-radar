# OpenClaw Ecosystem Digest 2026-08-15

> Issues: 500 | PRs: 500 | Projects covered: 13 | Generated: 2026-08-15 01:01 UTC

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

# OpenClaw Project Digest — 2026-08-15

## Today's Overview

OpenClaw shows high-velocity activity with 500 issues and 500 PRs updated in the last 24 hours. The project maintains a large open backlog (488 open issues, 403 open PRs) with a modest closure rate (12 issues, 97 PRs closed/merged today). The most pressing concerns center on recurring silent message-loss failures, memory leaks causing OOM crashes, and a significant wave of Control UI redesign PRs from a single contributor. No new releases were published today.

## Releases

No new releases published today.

## Project Progress

97 PRs were merged or closed today. Notable merged/closed items:

- **Security install policy acknowledgements** — PR [#116489](https://github.com/openclaw/openclaw/pull/116489) merged; requires explicit operator acknowledgement when an external `security.installPolicy` command returns `warn` for suspicious plugin/skill installs.
- **Maintenance cap test consolidation** — PR [#123909](https://github.com/openclaw/openclaw/pull/123909) closed; removed duplicate total-cap regression tests.
- **xAI startup validation fix** — PR [#123904](https://github.com/openclaw/openclaw/pull/123904) closed; fixes empty-config Gateway startup baseline to include the enabled-by-default xAI plugin.

Actively advancing work includes a large UI refinement series by `vyctorbrzezowski` — covering session identity in chat headers, sidebar navigation consolidation, incognito session clarity, and transactional sidebar customization — plus a multi-account Microsoft Teams support PR ([#112811](https://github.com/openclaw/openclaw/pull/112811)) and Slack default-account SecretRef resolution ([#121495](https://github.com/openclaw/openclaw/pull/121495)).

## Community Hot Topics

- **Silent reply failures persist** — Issue [#121058](https://github.com/openclaw/openclaw/issues/121058) (94 comments): The community's top concern. Users report that closing #116277 did not resolve silent reply failures; monitoring crons continue logging occurrences. Strong signal that a root cause remains unidentified.
- **Memory trust tagging by source** — Issue [#7707](https://github.com/openclaw/openclaw/issues/7707) (51 comments): Feature request to tag memory entries by trust origin to prevent memory poisoning attacks from untrusted web content. High demand reflects security awareness.
- **Per-agent cost budget enforcement** — Issue [#42475](https://github.com/openclaw/openclaw/issues/42475) (25 comments): Operators want gateway-level daily/monthly cost caps per agent.
- **Critical gateway memory leak** — Issue [#91588](https://github.com/openclaw/openclaw/issues/91588) (24 comments): RSS grows from 350MB to 15.5GB over days, causing repeated OOM kill/restart cycles.
- **Codex hook CPU stall** — Issue [#91009](https://github.com/openclaw/openclaw/issues/91009) (20 comments): `openclaw-hooks` processes consume 100%+ CPU each and stall gateway RPC.
- **UI redesign demand** — Issue [#75947](https://github.com/openclaw/openclaw/issues/75947) (8 comments): Users describe the UI as "hard to navigate," "dense," and "too much like raw config" — a clear call for UX improvements; the active PR series directly addresses this.

## Bugs & Stability

Ranked by severity:

**P0 / Critical:**
- **Gateway memory leak → OOM crash loop** — [#91588](https://github.com/openclaw/openclaw/issues/91588): RSS 350MB→15.5GB over 2–3 days; repeated launchd-handoff restarts. No fix PR linked.
- **File tools strip leading `@` from destination paths** — [#119270](https://github.com/openclaw/openclaw/issues/119270): silent writes/deletes to wrong files; data-loss risk. Open.
- **Live docs ahead of release** — [#48920](https://github.com/openclaw/openclaw/issues/48920): docs describe features not in the latest stable version; release-blocking regression.

**P1 / High:**
- **Codex PreToolUse hook CPU spin + RPC stall** — [#91009](https://github.com/openclaw/openclaw/issues/91009): multiple CPU-bound processes per call. Open.
- **Cron agent turns stall on DeepSeek** — [#121953](https://github.com/openclaw/openclaw/issues/121953): `[cron:]` prefix deprioritized by DeepSeek edge; stalls of tens of seconds to minutes. Open.
- **Steer mode fails to inject mid-turn** — [#48003](https://github.com/openclaw/openclaw/issues/48003): messages queue until turn completes, defeating steer mode. Linked PR open.
- **Conversation history lost on Ollama/custom providers** — [#120563](https://github.com/openclaw/openclaw/issues/120563): every turn gets fixed-size context; no prior-turn memory. Open.
- **Heap growth at idle on macOS** — [#87109](https://github.com/openclaw/openclaw/issues/87109): heap 558MB→1073MB+; cron jobs silently fail under memory pressure. Open.
- **Unbound legacy session keys inherit default agent** — PR [#123222](https://github.com/openclaw/openclaw/pull/123222) fixes this; in review.
- **WhatsApp foreground reply fence drops replies** — [#92186](https://github.com/openclaw/openclaw/issues/92186): replies visible in dashboard, never delivered. Open.
- **Cron `delivery.mode="none"` silent no-op** — [#113181](https://github.com/openclaw/openclaw/issues/113181): status=ok but delivered=false. Open.
- **LINE silent message loss** — [#86012](https://github.com/openclaw/openclaw/issues/86012): reply token expiry with no push fallback. Linked PR open.

**P2 / Moderate:** Matrix room one-way routing ([#122625](https://github.com/openclaw/openclaw/issues/122625)), compaction safeguard body eviction ([#122618](https://github.com/openclaw/openclaw/issues/122618)), WebChat reasoning stream missing for Kimi/DeepSeek ([#88079](https://github.com/openclaw/openclaw/issues/88079)), Telegram sticker handling ([#120735](https://github.com/openclaw/openclaw/issues/120735)).

## Feature Requests & Roadmap Signals

Several features show strong community demand and are likely candidates for upcoming versions:

- **Memory trust tagging by source** ([#7707](https://github.com/openclaw/openclaw/issues/7707)) — addresses memory-poisoning attack surface; likely to gain traction given security impact labels.
- **Per-agent cost budget enforcement** ([#42475](https://github.com/openclaw/openclaw/issues/42475)) — gateway-level spend caps; high operator value.
- **Dynamic model discovery (OpenRouter+)** ([#10687](https://github.com/openclaw/openclaw/issues/10687)) — static catalog is a known friction point.
- **Agent-triggered context compaction** ([#6757](https://github.com/openclaw/openclaw/issues/6757)) — self-compact tool; filed by an agent autonomously.
- **UI quality overhaul** ([#75947](https://github.com/openclaw/openclaw/issues/75947)) — actively being addressed by the large PR series in review; likely to land soon.
- **Task flow lifecycle hook events** ([#87362](https://github.com/openclaw/openclaw/issues/87362)) — plugin observability via hooks.
- **Multi-account Teams** ([#112811](https://github.com/openclaw/openclaw/pull/112811)) — in active review, likely near merge.

## User Feedback Summary

Recurring pain points from the community this week:

- **Silent failures are the top frustration**: users repeatedly report messages/agent outputs that never arrive, with no error surfaced ("no queued reply payload," "status=ok but delivered=false," "silently lost").
- **Memory instability undermines trust**: long-running gateways degrade and OOM-crash, with cron jobs silently failing under pressure.
- **Custom/Ollama provider parity gaps**: conversation history not sent to the model; users feel second-class vs. built-in providers.
- **Docs/release mismatch**: users follow live docs and hit features absent from stable builds.
- **UI usability criticism**: multiple users describe the Control UI as dense, hard to navigate, and "too much like AI-generated code or raw config."
- **Positive signal**: UI contributors are actively addressing layout, session identity, and sidebar clarity — suggesting maintainers are responsive to UX complaints.

## Backlog Watch

Issues/PRs that have gone long without maintainer closure or clear resolution, requiring attention:

- **Issue #121058** — Silent reply failures (94 comments, open since Aug 9, prior fix ineffective): highest-visibility unresolved issue.
- **Issue #7707** — Memory trust tagging (51 comments, open since Feb 3): long-running feature request with security implications; no maintainer decision evident.
- **Issue #91588** — Gateway memory leak (P0, open since Jun 9, 24 comments): critical stability bug with no linked fix PR.
- **Issue #10687** — Dynamic model discovery (10 comments, open since Feb 6): maintainer-labeled, needs product decision.
- **Issue #48920** — Live docs ahead of release (P0 regression, open since Mar 17): release-blocker still unresolved.
- **Issue #123073** — dev-channel update fails (`EUNSUPPORTEDPROTOCOL`, P1, open 2 days): blocks dev-channel users from updating; fix shape is clear and queueable.
- **PR #121797** — Cron toolsAllow MCP suppression warning: needs proof, open since Aug 11; awaits author response.
- **PR #122155 / #122177** — Two competing PRs fixing the same browser shared-tab reconnect bug (#122121); maintainers should reconcile.

---

## Cross-Ecosystem Comparison

# Cross-Project Ecosystem Comparison Report — 2026-08-15

## 1. Ecosystem Overview

The personal AI assistant open-source ecosystem is experiencing rapid divergence across three axes: reliability engineering (silent failures, memory leaks, cron stalls), security hardening (trust boundaries, command policies, credential handling), and user experience (chat-surface parity, UI polish, protocol interoperability). Projects are converging on similar architectural patterns—gateway-centric agent loops, plugin/skill systems, MCP connectivity, multi-channel ingestion—while differentiating on deployment footprint, provider support, and interaction model. The dominant community pain points are consistent across projects: silent message loss, memory instability, Windows parity gaps, and the need for finer-grained operational control (cost caps, per-command permissions). A clear trend toward structured execution contracts, observability instrumentation, and connector persistence indicates the ecosystem is maturing from interactive chat tools toward dependable autonomous agents.

---

## 2. Activity Comparison

| Project | Open Issues | Open PRs | 24h PR Activity (merged/closed) | Release Status | Health Score |
|---|---|---|---|---|---|
| **OpenClaw** | 488 | 403 | 97 | No release | ⚠️ Moderate-High (high velocity, but P0 memory leak + silent failures unresolved) |
| **NanoBot** | ~15 | ~14 | 8 | No release | ✅ High (fast fix turnaround, focused WebUI campaign) |
| **ZeroClaw** | ~33 | ~50 | 3 | No release | ⚠️ Moderate-High (large RFC backlog, Windows test failures) |
| **PicoClaw** | 3 | 4 | 5 | No release | ✅ High (small backlog, stale bot active, critical fix submitted within 24h) |
| **NanoClaw** | 2 | ~7 | 3 | No release | ✅ Moderate-High (CI/signing focus, two setup-blocking bugs) |
| **NullClaw** | 0 | 0 | 1 | No release | ✅ High (zero backlog, clean triage) |
| **IronClaw** | 25 | ~46 | 23 | 1.2.0 (stable, merged back today) | ✅ High (fast merge rate, structured epic-driven development) |
| **LobsterAI** | ~5 | ~27 | 22 | 2026.8.14 shipped today | ✅ High (steady releases, active UI iteration) |
| **Moltis** | 0 | 2 | 0 | No release | ✅ Moderate (quiet, but two substantial connectors in review) |
| **CoPaw** | 12 | 26 | 15 | 2.1.0 (no new release) | ⚠️ Moderate-High (rapid fix PRs, but 2.1.0-era regressions piling) |
| **TinyClaw** | — | — | — | — | ⏸️ Inactive (24h no activity) |
| **ZeptoClaw** | — | — | — | — | ⏸️ Inactive (24h no activity) |
| **EasyClaw** | — | — | — | — | ⏸️ Inactive (24h no activity) |

---

## 3. OpenClaw's Position

OpenClaw is the clear reference implementation of the ecosystem, with an order-of-magnitude larger backlog (488 issues, 403 PRs) than any peer. Its advantages are: (1) the broadest channel and provider coverage—including multi-account Teams, Slack SecretRef resolution, and LINE/WhatsApp/Telegram deep integrations; (2) a large contributor base with sustained throughput (97 PRs merged/closed in one day); and (3) a fast-moving UI redesign series directly addressing the most-cited usability complaints. Its technical approach centers on a gateway-based agent loop with plugin hooks (Codex, PreToolUse, cron), memory trust tagging, and security-aware install policy enforcement—a more complex surface than peers, but also a richer target for reliability risks. The project's weaknesses are identical to its strengths: breadth produces P0 memory leaks, silent message loss, and provider-specific stalls that have gone weeks without root-cause fixes. Community size dwarfs peers (94-comment threads vs. single-digit on most others), and that scale amplifies every regression. The bottom line: OpenClaw is the ecosystem's innovation engine, but stability debt is threatening its trust advantage.

---

## 4. Shared Technical Focus Areas

Across five or more projects, the following requirements are recurring:

1. **Structured execution contracts / deterministic runs** — IronClaw (#6879), CoPaw (#6958), ZeroClaw (#9999), OpenClaw (#121058) — all moving from raw prompt-driven turns to typed failure modes, outcome persistence, and explicit deliver/suppress semantics.

2. **Memory and context lifecycle management** — OpenClaw (#7707 trust tagging, #6757 agent-triggered compaction), CoPaw (#7030 title sync), IronClaw (#7664 pluggable memory), Moltis (#1190 durable connectors), LobsterAI (#1154 memory pollution tests) — need for source-trusted, persistent, and bounded memories.

3. **Windows and cross-platform parity** — ZeroClaw (#7462, 74 failures), NanoClaw (#3246), NanoBot (#5382), OpenClaw (#87109, macOS heap growth), CoPaw (#3045 desktop) — CI gaps and OS-specific defects consistently undermine installs and daily use.

4. **Cost and resource governance** — OpenClaw (#42475 per-agent cost caps), CoPaw (response API changes), ZeroClaw (#9996 atomic action budgets), NanoBot (timeout handling) — demand for per-agent/per-command operational guardrails.

5. **Session / identity consistency** — CoPaw (#7011 session crossover), OpenClaw (#123222 session key inheritance, #48003 steer mode), NanoBot (#5271 stale-session overwrites), Moltis (#1195 opaque per-run IDs) — multi-UI, multi-account identity boundaries are a common source of data-loss bugs.

6. **MCP and connector reliability** — PicoClaw (#3269 MCP hang), IronClaw (#7665 MCP OAuth), ZeroClaw (#8603 protocol profile), OpenClaw (MCP crash issues), CoPaw (#6405 MCP naming) — an ecosystem-wide broken dependency point.

7. **UI/UX modernization** — OpenClaw (#75947), NanoBot (#5395/#5393), LobsterAI (#2490/#2498), IronClaw (#7569/#7565), CoPaw (console organization) — near-universal recognition that control surfaces must move from config-dense to task-oriented.

---

## 5. Differentiation Analysis

| Project | Primary Differentiator | Target User | Architecture Emphasis |
|---|---|---|---|
| **OpenClaw** | Breadth — everything integrated, all channels, all providers | Power users / enterprise ops | Gateway + plugin hooks + broad multimodal surfaces |
| **IronClaw** | Reliability-first — structured automations, run tracking | Ops teams running unattended agents | Epic-driven, QA-bash culture, execution-contract specs |
| **ZeroClaw** | RFC-driven architecture, security posture | Self-hosters wanting governance | Formal RFC process, security policy pipelines, identity milestones |
| **NanoBot** | Python-first, WebUI polish, marketplace skills | Developer tinkerers | Lightweight core + rich frontend, native TS terminal UI emerging |
| **CoPaw** | Chinese-market integrations (OneBot, Feishu, DingTalk) | Chinese-platform workflows | AgentScope-based, dynamic skill system |
| **LobsterAI** | Sidebar + cowork UI, Team Edition | Multi-agent visual workflows | Renderer/sidebar-centric experience, browser annotation artifacts |
| **PicoClaw** | Embedded/edge (Go, $10 hardware, <10MB RAM) | Low-power homelab | Minimal memory footprint, constrained channels |
| **Moltis** | Durable connector persistence (CalDAV, Gmail, Slack) | Privacy-focused professionals | Provider-owned schemas, atomic snapshots, opaque IDs |
| **NanoClaw** | Signature-approval CI/signing pipeline | Security-sensitive low-touch deploys | Hardened image verification, reproducible builds |
| **NullClaw** | Minimalism, clean backlog | Deployment-flexibility seekers | SQLite-backed memory, configurable paths |

---

## 6. Community Momentum & Maturity

**Tier 1 — High-velocity, feature-shipping:** OpenClaw, IronClaw, CoPaw, LobsterAI — all merging double-digit PRs daily, with structured epics and regression response measured in hours. IronClaw leads in maturity (release line management, QA-bash cycles); OpenClaw leads in raw contributor volume but is riskier operationally.

**Tier 2 — Steady, focused iteration:** NanoBot, ZeroClaw, PicoClaw — moderate merge rates, but clearly active. NanoBot is executing a deliberate WebUI modernization; ZeroClaw is bottlenecked on RFC review (several accepted proposals stuck 11+ weeks); PicoClaw is in maintenance-and-stabilization with healthy stale-bot hygiene.

**Tier 3 — Stable/simmering:** NanoClaw, NullClaw, Moltis — low issue counts, minimal churn, infrastructure-grade work. NanoClaw is reliability-focused (CI/signing); NullClaw is backlog-clean; Moltis is quiet but shaping production-grade connectors.

**Tier 4 — Inactive:** TinyClaw, ZeptoClaw, EasyClaw — no activity in 24h; likely dormant or waiting for maintainer attention.

**Maturity assessment:** The ecosystem shows a bimodal distribution — a few projects with deep contributor pipelines and structured release management (OpenClaw, IronClaw, LobsterAI) versus many small projects where individual maintainer availability determines velocity. The RFC-heavy projects (ZeroClaw) risk losing momentum to faster-moving peers if review queues stay backed up.

---

## 7. Trend Signals

1. **From chat to contracts:** The strongest signal across OpenClaw, IronClaw, and ZeroClaw is the shift toward typed execution outcomes, deterministic delivery semantics, and persistent run records. Agents are being re-architected as dependable workers, not conversational toys. Expect the next wave of tooling to standardize on execution contracts.

2. **Security as a first-class feature:** Memory trust tagging (OpenClaw), shell command tiering (ZeroClaw), per-run opaque IDs (Moltis), signature verification (NanoClaw), and atomic action budgets (ZeroClaw) all point to a hardening phase. Builders who ship security primitives early will win operator trust.

3. **Cross-platform is a moat:** Windows/macOS failure clusters across five projects suggest a recurring cost of ignoring OS-specific subtleties. Projects with CI coverage beyond Linux (IronClaw's Windows fixes, NanoBot's `os.replace()` retry) are converting reliability into adoption.

4. **User demand for observability:** Live task cards in Slack (Moltis, IronClaw's Slack-to-Console bridge), multi-agent activity filters (LobsterAI), and per-session identity clarity (OpenClaw, CoPaw) show that users want to *see* what agents are doing, not just receive outputs. Opaque automation is unacceptable.

5. **Protocol interoperability is unlocking clients:** ZeroClaw's Chat Completions RFC, LongClaw's OpenAI-compatible work, and OpenClaw's provider adaptability signal that the ecosystem is moving toward standards-driven client adoption (Open WebUI, LobeChat, Aider). The agent gateway is becoming a protocol compliance layer, not just a chat relay.

6. **Memory is the next battleground:** Pluggable memory over MCP (IronClaw), durable connectors with bounded local search (Moltis), trust-tagged memories (OpenClaw), and agent-triggered compaction all point to memory as the strategic differentiator for agent persistence and safety. The project that cracks source-attributed, privacy-safe, and bounded memory will set the de facto standard.

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

## 1. Today's Overview

NanoBot shows steady development velocity with 22 PRs updated in the last 24 hours, split between 14 still-open and 8 merged or closed. The project is in a heavy WebUI enhancement cycle, with multiple PRs touching session organization, localization, and chat experience polish. Two bugs were closed with corresponding fix PRs, though the fix for the Anthropic stream timeout issue (PR #5392) was submitted and closed the same day, indicating a fast turnaround on user-reported regressions. There are no new releases in this window, meaning recent fixes and features remain unreleased to the broader user base.

## 2. Releases

No new releases were published during this reporting window.

## 3. Project Progress

Eight PRs were merged or closed today:

- **Fix Anthropic stream idle timeout issue** ([#5392](https://github.com/HKUDS/nanobot/pull/5392)) — closed as a fix for issue #5391: `NANOBOT_STREAM_IDLE_TIMEOUT_S` was being applied as a total timeout on the no-callback path, killing long-but-active generations on the Anthropic provider. The fix makes it an inactivity-only timeout.
- **Refine WebUI conversation groups and shared shapes** ([#5395](https://github.com/HKUDS/nanobot/pull/5395)) — closes with consistent group terminology, localized grouping workflow, drag-and-drop of conversations into groups, and shared shape scale across WebUI controls.
- **Polish sidebar and session transitions** ([#5393](https://github.com/HKUDS/nanobot/pull/5393)) — split from #5358, this is a UI-only PR improving sidebar hierarchy, connector lines, tab treatment, and folder presentation with a clean history directly on main.
- **Surface OAuth status and expiry warnings** ([#4689](https://github.com/HKUDS/nanobot/pull/4689)) — marked `invalid` and closed; the PR for issue #4679 was not accepted as-is. Interested users should watch for a future revision.
- **Support explicit context loading in skills** ([#5018](https://github.com/HKUDS/nanobot/pull/5018)) — closed; this would have made the `skill_names` input on `ContextBuilder` functional so direct callers could preload explicitly requested skills, but it did not merge.
- **Agent/knowledge graph** ([#5390](https://github.com/HKUDS/nanobot/pull/5390)) — closed, listed as a chore, abstract-only with no PR body or implementation details.

## 4. Community Hot Topics

The most active discussion items today:

- **Pyright strict-mode cleanup** — Issue [#5161](https://github.com/HKUDS/nanobot/issues/5161) (open, 1 comment) and its fix PR [#5396](https://github.com/HKUDS/nanobot/pull/5396) (open, touches 8+ tool files). The project is incrementally narrowing file-level suppression directives in search of strict type-safety across `nanobot/`. This is a maintainability push driven by the team itself rather than a community pain point.

- **Stale background task session overwrites** ([#5271](https://github.com/HKUDS/nanobot/pull/5271), priority p0) — the highest-severity open PR. It addresses data loss where stale background work overwrites a session after `/new` or lifecycle replacement. No comments in the last 24h but the p0 tag signals this is a team-critical fix.

- **WebUI polish and localizations** — PR #5367 (localize agent activity), #5356 (setup flows), #5389 (drag-and-drop session organization), and #5358 (session collaboration via mentions) are all open and receiving updates. These follow the merged #5395 and #5393, showing a focused campaign to modernize the WebUI.

## 5. Bugs & Stability

Three bug threads were active today, ranked by severity:

1. **Stale background task saves overwriting session data** ([#5271](https://github.com/HKUDS/nanobot/pull/5271), p0) — a fix exists and is open; risk of silent data loss after `/new` makes this the most urgent item in flight.

2. **Anthropic stream idle timeout killing long generations** ([#5391](https://github.com/HKUDS/nanobot/issues/5391)) — **fixed** by [#5392](https://github.com/HKUDS/nanobot/pull/5392), closed same day. Users running long generations on Anthropic with the no-callback path were being cut off prematurely at 90s regardless of token output.

3. **File-cap archive failure mutating session before persistence** ([#5378](https://github.com/HKUDS/nanobot/issues/5378)) — closed; `Session.enforce_file_cap()` mutates the live session before the archive callback. If the callback raised, the in-memory session was already out of sync with what would be persisted. The fix prevents the mutation before persistence.

4. **Windows `os.replace()` transient PermissionError** ([#5382](https://github.com/HKUDS/nanobot/pull/5382), p2) — a fix is open, retrying `os.replace()` on transient WinError 5 during heartbeat cron saves. Two confirmed crashes in a single gateway log highlight real Windows-user impact.

## 6. Feature Requests & Roadmap Signals

Strong signals in the open PR queue point to a WebUI-heavy roadmap:

- **WebUI collaboration via session mentions** ([#5358](https://github.com/HKUDS/nanobot/pull/5358)) — stable server-owned `@name` per session, mention picker, peer identity colors, and explicit self-mention. This is a large collaboration feature that suggests multi-user/session workflows, a likely near-term release target.

- **Drag-and-drop session organization** ([#5389](https://github.com/HKUDS/nanobot/pull/5389)) — reordering standalone sessions, creating groups by drag-and-drop, and keeping the pane-based layout consistent. This piggybacks on the grouped session work from [#5393](https://github.com/HKUDS/nanobot/pull/5393) and [#5395](https://github.com/HKUDS/nanobot/pull/5395), which are already merged.

- **Interactive particle hero background** ([#5340](https://github.com/HKUDS/nanobot/pull/5340)) — a canvas-based visual enhancement for the empty-thread hero; likely to land as part of UI polish.

- **Native TypeScript terminal UI** ([#4329](https://github.com/HKUDS/nanobot/pull/4329)) — rebuilding `nanobot agent` as a native TypeScript/OpenTUI client while keeping the Python gateway as the single implementation of the agent loop. Still open and updated today, suggesting continued work on the terminal product direction.

- **Marketplace skills shadowing builtins** ([#5309](https://github.com/HKUDS/nanobot/pull/5309)) — allows marketplace skills to override bundled ones with the same name; addresses an ecosystem-level install bug where the marketplace marked every skill as installed.

- **MCP SDK v2 migration** ([#5179](https://github.com/HKUDS/nanobot/pull/5179), p1) — migration to the v2 high-level `Client` API with legacy SSE compatibility, preserving SSRF/dns/security safeguards. Important infrastructure modernization likely to land soon.

## 7. User Feedback Summary

Users surfaced three concrete pain points in the last 24 hours:

- **Anthropic timeout behavior is confusing and harmful** — the 90s idle timeout silently killed long-but-active generations. The same env var acted as a total timeout on the no-callback path, so users pushing long generations hit hard cutoffs. The fix landed quickly, which should restore confidence in long-generation workflows.

- **Windows stability remains fragile** — `JsonlSessionStore.save()` crashed the entire gateway on transient `[WinError 5] Access is denied` during heartbeat cron saves. Two confirmed crashes in one log indicate intermittent reliability problems for Windows users under cron-driven saves.

- **Session/file-cap edge case on partial failure** — when the archive callback raised, the in-memory session had already discarded overflow data while persistence failed, causing divergence between what the user sees and what is on disk. This was closed as fixed, but it highlights that archive failures are a real operational concern.

## 8. Backlog Watch

- **Weather Skill PR** ([#4145](https://github.com/HKUDS/nanobot/pull/4145), opened 2026-06-01, ~2.5 months) — a combined multi-file contribution adding an example weather skill, new READMEs, and tests. Still open and updated today; it has been sitting for a long time and likely needs a maintainer decision on whether the example ecosystem should include more skills.

- **Mark partial completion results** ([#5152](https://github.com/HKUDS/nanobot/pull/5152), opened 2026-07-28) — a regression fix for subagent result announcement and sibling task counting; still open with no comments. The fix is important for correctness of agent state when tasks still run.

- **Native TypeScript terminal UI** ([#4329](https://github.com/HKUDS/nanobot/pull/4329), opened 2026-06-13, ~2 months) — the long-lived terminal product work. It receives updates and attention but is still far from merge; it involves a substantial cross-language client and gateway split, worthy of an explicit roadmap commitment from maintainers.

- **Weather Skill issue #3958** — referenced by PR #4145, the original issue remains unresolved in the backlog. The user-visible problem of no supported weather skill is now tied to a long-pending PR.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-08-15

## Today's Overview

ZeroClaw remains in a high-velocity stabilization and architecture phase, with 50 PRs and 33 issues updated in the last 24 hours. No new releases were published, and activity is concentrated on hardening security boundaries, fixing cross-platform test failures, and driving multiple accepted RFCs toward implementation. The maintainer decision queue (#8692) continues to process a large backlog of high-risk architecture proposals, with several RFCs (goal mode, chat completions profile, runtime-owned sessions) still awaiting final maintainer review. The project shows healthy contributor diversity, with multiple distinguished and trusted contributors shipping substantial work across channels, security, and runtime components.

## Releases

No new releases in the last 24 hours.

## Project Progress

No PRs were merged in the last 24 hours; all 50 updated PRs remain open, with 3 closed. Notable PRs advancing toward merge:

- **[#9999 — fix(compatible): classify output-limited terminal responses](https://github.com/zeroclaw-labs/zeroclaw/pull/9999)** (vrurg): Classifies OpenAI-compatible `finish_reason: "length"` as a typed output-token-limit failure, addressing the incomplete-terminal-response problem from #9421. Git-stacked on #9447.
- **[#9996 — fix(security): make action budget accounting atomic](https://github.com/zeroclaw-labs/zeroclaw/pull/9996)** (Audacity88): Reserves sender-scoped action-budget capacity atomically before tool side-effects, preventing parallel calls from exceeding `max_actions_per_hour`.
- **[#10002 — fix(tools): accept camelCase segments in google_workspace validation](https://github.com/zeroclaw-labs/zeroclaw/pull/10002)** (JordanTheJet): Fixes charset validation rejecting valid Google API camelCase identifiers.
- **[#9986 — feat(agents): export an agent to a portable bundle](https://github.com/zeroclaw-labs/zeroclaw/pull/9986)** (SheaHawkins): Adds `zeroclaw agents export` producing portable agent bundles with manifest, config closure, and workspace tree.
- **[#9985 — ci(runners): extend Blacksmith to msrv, parallel-runtime-test, installer-drift](https://github.com/zeroclaw-labs/zeroclaw/pull/9985)** (JordanTheJet): Stacked on #9962, extends Blacksmith runner toggle to remaining compute-bound Linux jobs.
- **[#9994 — feat(zerocode): add transcript copy context menu](https://github.com/zeroclaw-labs/zeroclaw/pull/9994)** (Audacity88): Adds explicit copy context menu for ZeroCode transcripts and code blocks.

## Community Hot Topics

- **[#8303 — RFC: Goal mode v1 (22 comments, 1 👍)](https://github.com/zeroclaw-labs/zeroclaw/issues/8303)**: The most active discussion. The RFC proposes bounded foreground Matrix work but was revised to decouple restart handoff, channel admission, Web, and async child work from the first delivery. Commenters are pushing to narrow scope further before acceptance.
- **[#7155 — RFC: Per-execution confirmation tier for high-risk shell commands (20 comments)](https://github.com/zeroclaw-labs/zeroclaw/issues/7155)**: Revision 3 narrows the normative proposal to a reconciled shell-policy contract. High engagement reflects operator demand for finer-grained command control.
- **[#8603 — RFC: ZeroClaw Chat Completions profile (19 comments)](https://github.com/zeroclaw-labs/zeroclaw/issues/8603)**: Users want OpenAI-protocol compatibility to unlock clients like Open WebUI, LobeChat, and Aider. This is a strong interoperability signal.
- **[#7141 — RFC: Pluggable inbound authentication and canonical principals (16 comments)](https://github.com/zeroclaw-labs/zeroclaw/issues/7141)**: Rev 8 of the identity milestone proposal; accepted but still iterating on OIDC and provider boundaries.
- **[#7462 — 74 test failures on Windows (15 comments)](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)**: High visibility bug affecting Windows users; CI gap on Linux-only test runs is a recurring frustration.
- **[#9487 / #9488 — Runtime-owned sessions and unified attachments (14 comments each)](https://github.com/zeroclaw-labs/zeroclaw/issues/9487)**: Companion RFCs from NiuBlibing defining runtime ownership boundaries for sessions and attachments. Paired with #9600 in a three-RFC ratification.

## Bugs & Stability

**S1 — Workflow blocked:**
- **[#9421 — Incomplete terminal responses reported as successful](https://github.com/zeroclaw-labs/zeroclaw/issues/9421)** (vrurg, in-progress): Providers can end a turn without a trustworthy final answer while runtime presents success. Fix PR [#9999](https://github.com/zeroclaw-labs/zeroclaw/pull/9999) addresses the OpenAI-compatible `length` finish case.

**S2 — Degraded behavior:**
- **[#7462 — 74 test failures on Windows](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)** (NiuBlibing, accepted): Unix-only test commands, path semantics, and console encoding (code page 936) cause widespread failures. CI only runs Linux; no fix PR linked yet. Related PR [#10001](https://github.com/zeroclaw-labs/zeroclaw/pull/10001) gates non-UTF-8 browser path fixtures to Linux.
- **[#9486 — High-entropy detector redacts Solana wallet addresses](https://github.com/zeroclaw-labs/zeroclaw/issues/9486)** (koshak01, accepted): `high_entropy_tokens=false` does not stop redaction on Telegram channel path, breaking MCP server workflows.

**S3 — Minor:**
- **[#9983 — Fallback model without vision misreports cause of error](https://github.com/zeroclaw-labs/zeroclaw/issues/9983)** (Alanaktion): Vision-required requests fail with misleading messaging when fallback lacks vision.

**Test/CI flakiness:**
- **[#9965 — cron custom-shell test hits ETXTBSY under parallel runtime gate](https://github.com/zeroclaw-labs/zeroclaw/issues/9965)** (AngryPacifist, accepted, p1): Race condition causes red required checks on unrelated PRs (e.g., #9963).

## Feature Requests & Roadmap Signals

Strong convergence on security and runtime architecture as the dominant roadmap themes. Likely candidates for next release (v0.8.5, stabilizing through August 30):

- **Shell command policy tiering** (#7155): allow/ask/deny patterns per command — very likely, scope narrowed and accepted.
- **Chat Completions protocol profile** (#8603): high demand from ecosystem clients; needs maintainer review.
- **Telegram /model provider-grouped picker** (#9895, accepted): UX improvement for mobile users with many routes.
- **Discord role-based authorization** (#9970, in-progress): additive to user-ID allowlist.
- **Shell dialect in system prompt** (#9788, blocked, p3): small prompt improvement awaiting unblock.
- **Agent export bundles** (#9986): portable agent migration — likely to land.
- **Action budget atomicity** (#9996): security hardening for rate-limit enforcement — likely to merge soon.

## User Feedback Summary

- **Windows support is a persistent pain point**: The 74-failure test suite (#7462) has 15 comments and no fix PR. Users on Windows are effectively second-class.
- **Redaction false positives break real workflows**: Solana wallet addresses being redacted on Telegram (#9486) is a concrete example of security controls harming legitimate use. The leak detector needs allowlisting or scoped disabling.
- **Mobile UX matters**: The Telegram /model picker request (#9895) reflects real friction on mobile with many provider routes.
- **Interoperability demand is high**: Chat Completions protocol (#8603) and transitive OAuth support (#9420) are both requests to integrate ZeroClaw with the broader AI client ecosystem.
- **Spam/promotional issues are being closed quickly**: #9982 (hosted memory pitch) was closed as wontfix — maintainers are responsive at triage.

## Backlog Watch

- **[#6971 — RFC: Security posture, credential boundaries, universal ingress policy](https://github.com/zeroclaw-labs/zeroclaw/issues/6971)**: 11 comments, accepted, `needs-maintainer-review` since May 27. High-risk security RFC that has been waiting ~11 weeks for review.
- **[#6954 — RFC: Provenance, conversation binding, reply contract for internal turns](https://github.com/zeroclaw-labs/zeroclaw/issues/6954)**: 11 comments, `needs-maintainer-review` since May 26. Revision 2 landed August 5; waiting for maintainer decision.
- **[#9002 — fix(gateway): keep agent turns alive after viewer disconnect](https://github.com/zeroclaw-labs/zeroclaw/pull/9002)** (IftekharUddin): Open since July 11, p1, `needs-maintainer-review`. Addresses a real UX bug (dashboard disconnect kills work) but has been waiting over a month.
- **[#9281 — fix(config): roll back auto-created map aliases when config set fails](https://github.com/zeroclaw-labs/zeroclaw/pull/9281)** (IftekharUddin): Open since July 23, p1, `needs-maintainer-review`. Transactional config-write fix; stalled for 3+ weeks.
- **[#7897 — RFC: Apply security policy/channel config updates without full daemon reload](https://github.com/zeroclaw-labs/zeroclaw/issues/7897)**: Accepted since June 17, p3, no implementation PR linked yet.
- **[#8621 / #7142 — Security decision pipeline RFCs](https://github.com/zeroclaw-labs/zeroclaw/issues/7142)**: Both accepted for v0.9.0 but no implementation movement visible; risk of slipping the security milestone.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

**PicoClaw Project Digest — 2026-08-15**

## Today's Overview
PicoClaw is in a maintenance and stabilization phase with no new releases but significant development activity: 9 PRs updated in the last 24 hours (4 open, 5 closed/merged) against only 3 issues. The project shows healthy throughput, with stale-labeled PRs being merged and active fixes progressing. Notably, a critical bug fix for MCP server connection failures (which caused the agent loop to hang) was submitted as PR #3337, directly addressing the most pressing open issue #3269. The stale bot is actively cleaning up old items, but 4 PRs remain open, including a significant DeltaChat refactor and a model fallback chain feature that have been pending for over a month.

## Releases
No new releases were published in this period.

## Project Progress
Five PRs were closed/merged in the last 24 hours, primarily from the stale queue:
- **PR #3271** (merged): Updated default model names across 9 providers to July 2026 latest versions (OpenAI gpt-5.6 series, Anthropic, etc.), verified against official documentation.
- **PR #3270** (merged): Added DashScope (Alibaba Cloud) TTS provider and WeChat audio file sending capability, improving multimodal output for Chinese platforms.
- **PR #3279** (merged): Fixed a tool-call format leakage bug in the seahorse component's `partsToReadableContent` method that caused raw tool-call formats to leak into LLM summaries for user messages.
- **PR #3283** (merged): Added DingTalk picture/image message inbound support, including OpenAPI token caching and graceful degradation.
- **PR #3303** (merged): Bumped `actions/stale` GitHub Action from v10 to v11.

## Community Hot Topics
- **#3269 [BUG] MCP server failure hangs the agent loop** (5 comments, 1 👍) — The most active discussion, filed by ruiyigen on July 20, describes how a failed MCP server connection causes the chat interface to become unresponsive. A fix PR (#3337) was submitted the same day as this digest, but the issue remains open. [Issue Link](https://github.com/sipeed/picoclaw/issues/3269) | [Fix PR](https://github.com/sipeed/picoclaw/pull/3337)

## Bugs & Stability
- **CRITICAL (fix in review):** MCP server connection failure causes complete agent loop hang and unresponsive chat interface (#3269). Submitted fix PR #3337 proposes wrapping `ensureMCPInitialized` error in `AgentLoop.Run` to continue execution rather than exiting. The fix is high priority due to total service outage impact.
- **MODERATE (fix merged):** Tool-call format leakage into user-facing LLM summaries via seahorse's `partsToReadableContent` (fixed in #3279) — a source of confusing model output.
- **MINOR (stale):** DingTalk image messages unsupported (fixed in #3283) and exec tool ignoring per-run timeout and boolean options (open PR #3319 addressing this).

## Feature Requests & Roadmap Signals
- **Model fallback chains** (open PR #3200) — adding configurable default model fallback chains with persistence through the backend API. This feature has broad appeal for reliability.
- **DeltaChat implementation cleanup** (open PR #3222) — dropping legacy features, refining invite links, and adding full DeltaChat documentation, indicating ongoing multi-channel maturity.
- **DashScope TTS + WeChat audio** (PR #3270) — merged; demonstrates the project's focus on Chinese-market integrations.
- **Telegram session management** (issue #3307, closed as stale) — requested feature for session list/switch in Telegram, mirroring Web UI capabilities; got closed by stale bot without implementation or maintainer response.

## User Feedback Summary
- **Pain point:** MCP server failures are catastrophic — users lose the chat interface entirely (issue #3269). The project responded with a quick fix (within ~24 hours of the last update), showing good responsiveness.
- **Pain point:** Tool-call format leakage causes confusing model behavior; fixed in #3279. The urgency indicates real-world degradation of user experience.
- **Feature interest:** Users are pushing for session management parity across all chat channels (Telegram, etc.) — not just Web UI (issue #3307).
- **Developer appreciation:** One user (Rehanasharmin) submitted a detailed code review praising architecture choices for the Go/embedded form factor (running on $10 hardware, <10MB RAM), though the item was closed as stale.
- **Satisfaction signal:** The volume of merged PRs contributing improvements (TTS, images, model updates) suggests an actively maintained project with an engaged contributor community.

## Backlog Watch
- **PR #3337 (fix for critical MCP hang)** — submitted 2026-08-14; needs prompt review and merge to resolve the critical issue #3269. [PR Link](https://github.com/sipeed/picoclaw/pull/3337)
- **PR #3200 (model fallback chains, open 45 days)** — awaiting maintainer attention; feature could be valuable for production users. [PR Link](https://github.com/sipeed/picoclaw/pull/3200)
- **PR #3222 (DeltaChat cleanup, open 43 days)** — large refactor with breaking changes to DeltaChat config; needs review for risk assessment. [PR Link](https://github.com/sipeed/picoclaw/pull/3222)
- **Issue #3269 (critical MCP hang)** — has a fix PR but remains open; should be tracked for closure. [Issue Link](https://github.com/sipeed/picoclaw/issues/3269)

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

**NanoClaw Project Digest — 2026-08-15**

---

## 1. Today's Overview

NanoClaw shows a steady flow of activity with 11 PRs updated in the last 24 hours and 2 active issues. The project remains in a bug-fixing and hardening phase rather than feature expansion, with a notable cluster of PRs targeting setup reliability, container runtime behavior on Windows, and cron scheduling edge cases. The core-team's signature-approval pipeline using draft PRs for live-fire testing (all closed unmerged) signals active CI/security infrastructure work. No new releases were published today.

---

## 2. Releases

None.

---

## 3. Project Progress

**Merged/Closed PRs (3 total):**

- **[#3242 — [core-team] DO NOT MERGE — live-fire test of the signature approver](https://github.com/nanocoai/nanoclaw/pull/3242)** *(closed unmerged, gavrielc)* — exercised the full image verification chain against a pinned previous hardened build.
- **[#3243 — [core-team] verify-agent-image: arming auto-merge is not a verdict](https://github.com/nanocoai/nanoclaw/pull/3243)** *(closed, gavrielc)* — fixed an issue where the CI verification job failed on `enable auto-merge` errors unrelated to the image's validity. This is an important infrastructure correction for accurate CI signals.
- **[#3244 — [core-team] DO NOT MERGE — live-fire the signature approver (take 2)](https://github.com/nanocoai/nanoclaw/pull/3244)** *(closed unmerged, gavrielc)* — confirmed the approval script goes green on drafts and posts an approving review.

No end-user feature work was merged today; attachment-handling fixes remain open (see Backlog Watch).

---

## 4. Community Hot Topics

No issues or PRs show significant comment/reaction counts today. The most substantive activity is:

- **[#3248 — setup.sh "Node missing or too old" branch cannot handle too old](https://github.com/nanocoai/nanoclaw/issues/3248)** — flags a real UX bug in the wizard; a fix PR ([#3249](https://github.com/nanocoai/nanoclaw/pull/3249)) already exists.
- **[#3245 — Prebuilt agent image requires AVX2 → SIGILL on older CPUs](https://github.com/nanocoai/nanoclaw/issues/3245)** — affects low-power Intel Atoms (Celeron J6413/N5105), likely a meaningful subset of home-lab and small-server users.

---

## 5. Bugs & Stability

Ranked by severity:

1. **High — [#3245: Bun binary in prebuilt image requires AVX2 → SIGILL](https://github.com/nanocoai/nanoclaw/issues/3245)** — crashes at runtime on any x64 CPU without AVX2 (e.g., Intel Tremont/Elkhart Lake Atoms). Affects the default recommended install path (`NANOCLAW_HARDENED_IMAGE=true`). No fix PR referenced yet.
2. **Medium — [#3248: setup.sh cannot handle an existing, too-old Node](https://github.com/nanocoai/nanoclaw/issues/3248)** — install-node.sh short-circuits if *any* Node exists, defeating the version check in setup.sh. Fix PR exists: **[#3249](https://github.com/nanocoai/nanoclaw/pull/3249)**.
3. **Medium — [#3246: orphan cleanup silently no-ops on Windows](https://github.com/nanocoai/nanoclaw/pull/3246)** — POSIX single quotes break `execSync` via `cmd.exe`; fix PR submitted by jsboige.
4. **Low — [#3247: malformed cron string re-errors every sweep tick](https://github.com/nanocoai/nanoclaw/pull/3247)** — recurring parse failures log repeatedly; the PR retires the malformed row instead.

---

## 6. Feature Requests & Roadmap Signals

Two open feature-level PRs from OmriBenShoham are the only roadmap signals in flight:

- **[#3041 — Dial channel adapter (SMS + AI voice calls)](https://github.com/nanocoai/nanoclaw/pull/3041)** and **[#3050 — Dial in channel picker + wizard/skills](https://github.com/nanocoai/nanoclaw/pull/3050)** — pending phone-channel integration; both open for a month without merge, likely awaiting maintainer review.

Next-version prediction: No new features appear imminent. Maintainers are focused on setup reliability, CI hardening, and the agent-image signing pipeline; expect these to land before new channel work.

---

## 7. User Feedback Summary

- **Setup friction on non-AVX2 hardware** (from #3245): users following the wizard's recommended path hit a hard crash; the issue requests a fallback baseline build or a compatibility check earlier in setup.
- **Setup friction with pre-existing systems** (from #3248): users with an old Node installed get a broken installation flow that never actually installs the required version.
- **Windows parity** (from #3246): container cleanup silently failing on Windows erodes trust in the install's self-maintenance.
- No positive or negative end-user satisfaction signals were logged today.

---

## 8. Backlog Watch

- **[#2427 — fix: attachment issues (b1ek)](https://github.com/nanocoai/nanoclaw/pull/2427)** — open since **May 12**; no activity today beyond an update. Attachment handling is clearly a longer-running problem; 11 weeks without merge merits attention.
- **[#2752 — stage inbound attachments that expose only a url (Discord)](https://github.com/nanocoai/nanoclaw/pull/2752)** — open since **June 12**; addresses Discord attachments never reaching the agent readably. Tied to the same attachment theme; these two PRs together suggest the area needs a maintainer decision.
- **[#3041](https://github.com/nanocoai/nanoclaw/pull/3041) / [#3050](https://github.com/nanocoai/nanoclaw/pull/3050) (Dial channel)** — 30+ days open with no maintainer engagement; either needs review or a documented deferral.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

**NullClaw Project Digest — 2026-08-15**

### 1. Today's Overview
NullClaw experienced minimal activity in the last 24 hours, with no new issues opened or updated and no releases published. The project saw the closure of one pull request, which merged a configuration enhancement for the SQLite memory engine. The low volume of issue traffic suggests a stable period with no immediate user-reported problems, though the single PR indicates active development continues on infrastructure. Overall, the project remains in a steady state with focused engineering efforts rather than broad community engagement today.

### 2. Releases
No new releases were published during this reporting period. There are no changelog entries or migration notes to report.

### 3. Project Progress
- **[PR #986 — GEN-548: make SQLite memory database path configurable](https://github.com/nullclaw/nullclaw/pull/986)** (merged/closed) — This change adds a `memory.database_path` configuration option for SQLite-backed primary memory engines. The implementation preserves the default location (`<workspace>/memory.db`) when the setting is empty, resolves relative paths from the workspace directory, and supports absolute paths for read-only workspace deployments. Documentation for the new setting was included. This addresses a limitation for users running NullClaw in restricted or read-only filesystem environments.

### 4. Community Hot Topics
There were no issues or pull requests with significant comment threads or reactions in the last 24 hours. The single merged PR (see Project Progress) had zero reactions and no recorded community discussion. The absence of lively debate on the repository suggests the community is either satisfied with the current direction or engaged primarily through other channels (e.g., Discord, forums).

### 5. Bugs & Stability
No new bugs, crashes, or regressions were reported or fixed in this period. The repository shows no open issues requiring urgent triage today.

### 6. Feature Requests & Roadmap Signals
No direct feature requests were filed in the last 24 hours. However, the motivation behind **PR #986** (configurable memory database path) signals a growing need amongst users for deployment flexibility—specifically, supporting read-only workspace volumes and custom storage locations for persistent memory. This aligns with broader trends toward containerized and ephemeral deployments. Given that this item was already merged, the next likely roadmap item building on this will be additional storage backend options (e.g., Postgres or Redis) for the memory layer, enabling distributed or high-availability setups.

### 7. User Feedback Summary
With zero issues reported or discussed in the period, there is no direct user feedback to analyze. The closure of PR #986 without negative commentary implies the current changes were uncontroversial. The implied use case behind the merged patch—running NullClaw in environments where the workspace filesystem is immutable—indicates a professional or enterprise adoption pattern. Lack of complaints may reflect satisfaction, or simply a low-volume day for the project.

### 8. Backlog Watch
There are no open issues or pull requests in need of maintainer attention, as the repository currently shows zero open items. The project maintains a clean backlog, suggesting that maintainers are effectively triaging incoming work and that no user reports have been left unresolved for extended periods.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

**IronClaw Project Digest — 2026-08-15**

---

## 1. Today's Overview

IronClaw is in an active development and stabilization phase, marked by the closure of two major tracking epics (#7414: Dogfooding & QA fixing, #7520: retiring superseded WebUI surfaces) and a significant number of merged fixes across release, auth, extension, and Telegram integrations. The momentum is heavily focused on the automation reliability epic (#6879) for v1.3.0, with a structured sub-issue train actively advancing design and implementation in parallel. A large volume of QA-driven bug reports (5 new `bug_bash_P2` issues) indicate a systematic dogfooding effort. The community appears highly active, with 25 issues and 46 PRs touched in the last 24 hours and a strong merge rate (23 PRs merged/closed), reflecting a healthy, fast-moving project.

## 2. Releases

No new releases were published in the last 24 hours. The most recent stable version remains **IronClaw 1.2.0**, which was released on a `release/2026-08-11` line that was successfully merged back into `main` today (PR #7657), bringing forward state-preserving migrations and various stability fixes.

## 3. Project Progress

This was a high-velocity day for merged code, with 23 PRs merged/closed. Key advances include:

- **Release Integration**:
    - PR #7657: Merged the validated 1.2.0 release line back into `main`, including startup migrations and Windows fixes.
    - PR #7663: Forward-ported independent 1.2 fixes (thread-index repair, Windows reliability, runtime `curl` healthchecks) to `main` without legacy migration.

- **Agent Execution & Automations** (v1.3.0):
    - PR #7634: Completed the switchover to unbound/prepared-context turns, including a 71-clause conformance audit against design docs.
    - PR #7651: Introduced deterministic `[SILENT]` suppression for scheduled runs with explicit `deliver`/`suppress` choices at trigger creation.
    - PR #7650: Added persistence of semantic execution outcomes, replacing a hidden reconciler with exact-run settlement events.
    - Issue #7532 (Closed): Landed structured execution specs for reliable scheduled automations, a core part of the #6879 epic.

- **Performance & Scale**:
    - PR #7628: Removed heartbeat journal churn by stopping the appending of heartbeat rows, significantly reducing DB write pressure.
    - PR #7652: Shipped a measurement harness to accurately profile production DB write workloads, establishing a baseline for the #7591 epic.

- **Integration & Platform**:
    - PR #7668: Fixed extension provider auth diagnostics, preserving error messages and auth context through the tooling pipeline.
    - PR #7665: Added support for origin-scoped hosted MCP OAuth for the MKT1 shape.
    - PR #7658: Fixed Telegram 2FA gate recognition on migrated DCs and clarified where login codes are sent.

- **Frontend & UX**:
    - Issue #7569 (Closed): Introduced a shared `SearchField` component for list filtering.
    - Issue #7565 (Closed): Fixed i18n coverage gaps across WebUI routes.
    - Issue #7183 (Closed): Implemented per-user LLM model selection, addressing a previously admin-only constraint.

## 4. Community Hot Topics

- **Automation Reliability (#6879)** — [Link](https://github.com/nearai/ironclaw/issues/6879)
    - **Analysis:** This epic is the clear focus, driving the majority of new PRs and issues. The community (specifically core maintainers) is addressing the fundamental issue of unreliable unattended runs by moving from raw prompts to structured execution contracts. The high volume of linked issues and PRs indicates that this is a top priority for making IronClaw a trusted autonomous agent, not just an interactive chat tool.

- **Slack-to-Console Bridge (#7656)** — [Link](https://github.com/nearai/ironclaw/issues/7656)
    - **Analysis:** Closed today, this requested feature aims to bridge the UX gap between the Slack surface and the Console. By tying Slack responses back to Console runs with deep links and metadata, it signals a push towards better observability and cross-platform parity, a key need for enterprise users managing all interactions in one place.

- **Pluggable Memory Architecture (#7664)** — [Link](https://github.com/nearai/ironclaw/issues/7664)
    - **Analysis:** The desire to bind external memory systems by configuration (with Mnesis as the first consumer) is a strong signal for extensibility and user choice. This aligns with the project's open-source ethos and allows for memory solutions to evolve independently, a likely theme for future releases beyond v1.3.

## 5. Bugs & Stability

There are 5 new QA-reported bugs marked as `[bug_bash_P2, qa-bug]`, describing a day of systematic testing on the `qa-testing-libsql` instance:

- **[P2] Extensions visible as installed for other users (#7659)** — [Link](https://github.com/nearai/ironclaw/issues/7659). This is a potential multi-tenancy and privacy issue, possibly caused by state leakage in the UI layer. No dedicated fix PR is open yet, though related work on extension cards is underway (#7666).

- **[P2] Slack UI shows "Reconnect" despite active connection (#7660)** — [Link](https://github.com/nearai/ironclaw/issues/7660). It's a misleading UI state that requires a page refresh. The fix likely exists in the merged PR #7666, which explicitly addresses this issue ("tell the truth on cards").

- **[P2] MP4 attachment fails in Telegram (#7662)** — [Link](https://github.com/nearai/ironclaw/issues/7662). A functional regression in the attachment pipeline where a recognized `video/mp4` file fails validation with `invalid_value`. The error likely stems from the `attachments.mime_type` field; no direct fix PR has been observed yet.

- **[P2] Telegram phone-mode login code not received (#7667)** — [Link](https://github.com/nearai/ironclaw/issues/7667). A critical linking issue where after a DC migration (`PHONE_MIGRATE_1`), the code never arrives in the Telegram service chat. The recent fix PR #7658 may address only the QR-scan path, so this raw-TL send path remains an issue.

- **Additionally, a critical `docx` generation bug was closed (#6869)** — [Link](https://github.com/nearai/ironclaw/issues/6869). After user reports of corrupt files, a fix was found and validated using `python-docx`, and the workflow now includes verification.

## 6. Feature Requests & Roadmap Signals

- **Structured Ask User Cards (#7653)** — [Link](https://github.com/nearai/ironclaw/issues/7653). This is a strong signal for a richer, OMP-inspired interaction model in the WebUI. It's likely a v1.3.0 feature, moving beyond basic chat responses to structured question prompts.

- **Pluggable Memory over MCP (#7664)** — [Link](https://github.com/nearai/ironclaw/issues/7664). The associated PR #7661 (MCP-backed memory provider) was updated today and is an important architectural shift. While the `ironclaw_memory_mcp` crate is a draft, it points toward a clear roadmap item for a more modular and extensible memory system. This may land in v1.3.0 or shortly after.

- **Per-User LLM Model Selection (#7183 was closed)** — [Link](https://github.com/nearai/ironclaw/issues/7183). The closure of this feature is a significant roadmap validation. It addresses a core need for both individual power-users and enterprises seeking flexibility, indicating the project is listening to deployment-level feedback from the Champions program.

## 7. User Feedback Summary

- **Agent Reliability:** The primary dissatisfaction stems from automation being "hit-or-miss" (#6879). Users like "Davin Basi" find IronClaw unreliable for beyond-chat tasks, unlike competitors (ChatGPT and Claude), who can "do this easily". This is the core complaint driving the entire v1.3.0 automation epic.

- **Generated File Integrity:** Direct feedback from a user (Davin Basi) confirms broken `.docx` output is a real and frustrating issue. The issue was closed (fixed), indicating that user reports are quickly picked up and resolved.

- **Configuration & Control:** The closure of the per-user model selection issue (#7183) signals that admin-only LLM configuration was a limitation. Users are interested in having greater agency over their workspace's runtime, a standard expectation in modern AI tools.

## 8. Backlog Watch

- **PR #7255 — docs(governance): evaluate the APDD kit** ([Link](https://github.com/nearai/ironclaw/pull/7255)). Open since August 5th, this docs-only PR from a regular contributor evaluates a governance framework. With no comments and significant time in review, it may be deprioritized behind roadmap-critical code changes and could benefit from maintainer feedback.

- **PR #7378 & #7379 — doc-fact contract tests and release deploy workflow** ([Link](https://github.com/nearai/ironclaw/pull/7378), [Link](https://github.com/nearai/ironclaw/pull/7379)). These two PRs from an experienced contributor address documentation integrity and the docs-vs-release skew. They have been open since August 7th without comments, despite the project actively shipping releases, which risks propagating stale docs.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI Project Digest — 2026-08-15

## 1. Today's Overview

LobsterAI shipped a new release (2026.8.14) and maintained a high velocity of merged PRs: 22 of 27 PRs updated in the last 24 hours were closed or merged. Activity was concentrated on the cowork, openclaw, and renderer areas, with notable feature work on sidebar UI, browser annotation previews, and skill management fixes. Two stale issues remain open from earlier this year, signaling some backlog debt in testing and URL construction. Overall, the project shows a healthy cadence of releases and steady feature iteration.

## 2. Releases

**LobsterAI 2026.8.14** ([release](https://github.com/netease-youdao/LobsterAI/releases))

Key changes:
- Sidebar: support for check-in and banner carousel ([PR #2411](https://github.com/netease-youdao/LobsterAI/pull/2411))
- Sidebar: multi-agent task activity filter ([PR #2418](https://github.com/netease-youdao/LobsterAI/pull/2418))

No breaking changes or migration notes were disclosed in the release notes.

## 3. Project Progress

22 PRs were merged or closed in the last 24 hours. Notable merged work:

- **Team Edition & release merge**: [PR #2498](https://github.com/netease-youdao/LobsterAI/pull/2498) merged the 2026.7.30 release branch into main (67 commits, 264 files changed). Introduces Team Edition account and quota flows, refreshes Skills and Connectors experience.
- **Browser annotation preview**: [PR #2490](https://github.com/netease-youdao/LobsterAI/pull/2490) renders browser-annotation screenshots as numbered attachment cards in user messages with a dedicated artifact panel view.
- **Skill key fix**: [PR #2491](https://github.com/netease-youdao/LobsterAI/pull/2491) and [PR #2483](https://github.com/netease-youdao/LobsterAI/pull/2483) fixed skill `entries` keying by frontmatter name instead of directory-derived IDs, making UI skill toggles work reliably.
- **Cowork UX fixes**: [PR #2499](https://github.com/netease-youdao/LobsterAI/pull/2499) keeps turn processes expanded until an answer exists; [PR #2496](https://github.com/netease-youdao/LobsterAI/pull/2496) keeps badge popovers within viewport.
- **Typography update**: [PR #2495](https://github.com/netease-youdao/LobsterAI/pull/2495) bumps default UI/code font sizes with a one-time migration.
- **Account UI**: [PR #2492](https://github.com/netease-youdao/LobsterAI/pull/2492) and [PR #2494](https://github.com/netease-youdao/LobsterAI/pull/2494) refine credits icon style and color alignment.
- **i18n polish**: [PR #2497](https://github.com/netease-youdao/LobsterAI/pull/2497) improves cowork goal and steer copy wording.
- **Session export**: [PR #2493](https://github.com/netease-youdao/LobsterAI/pull/2493) fixes session export image and card toggle UI.

## 4. Community Hot Topics

- **[Issue #1154](https://github.com/netease-youdao/LobsterAI/issues/1154) — Unit tests for commandSafety and coworkMemoryJudge** (open, 1 comment): Flags missing Vitest coverage for two security-critical modules. Highlights risk of silent destructive commands or memory pollution. Signals growing community concern about safety guarantees.
- **[Issue #2489](https://github.com/netease-youdao/LobsterAI/issues/2489) — "快更新v4pro！" (Update v4pro quickly!)** (open, 1 comment): A terse feature request demanding a v4 Pro update. Reflects user anticipation for a new model version.
- **[PR #2374](https://github.com/netease-youdao/LobsterAI/pull/2374) — Permanent setting to hide sidebar ad banner** (open): Community-driven request ([Issue #2342](https://github.com/netease-youdao/LobsterAI/issues/2342)) to let users permanently disable ads; currently only one-time dismissal is possible.

## 5. Bugs & Stability

No critical or high-severity bugs were reported in the last 24 hours. Minor issues fixed today:

- **Skill toggle regression** — directory/frontmatter mismatch made UI skill toggles silently ineffective. Fixed in [PR #2491](https://github.com/netease-youdao/LobsterAI/pull/2491) and [PR #2483](https://github.com/netease-youdao/LobsterAI/pull/2483).
- **Cowork folding regression** — turns that ended mid-wait collapsed into empty duration lines. Fixed in [PR #2499](https://github.com/netease-youdao/LobsterAI/pull/2499).
- **Badge popover positioning** — popovers could exceed viewport and sit above later messages. Fixed in [PR #2496](https://github.com/netease-youdao/LobsterAI/pull/2496).
- **OpenClaw URL construction issue** — stale [PR #1153](https://github.com/netease-youdao/LobsterAI/pull/1153) reports a Google Gemini `/v1` baseURL path bug causing missing `/` separator in URL; remains open and unaddressed.

## 6. Feature Requests & Roadmap Signals

- **Sidebar ad-banner control**: [PR #2374](https://github.com/netease-youdao/LobsterAI/pull/2374) requests a permanent opt-out for the ad banner; likely to land pending review.
- **Multi-agent task activity filter**: Already merged in [PR #2418](https://github.com/netease-youdao/LobsterAI/pull/2418) — a signal that more multi-agent observability features are on the roadmap.
- **v4 Pro support**: [Issue #2489](https://github.com/netease-youdao/LobsterAI/issues/2489) suggests early demand for next-generation model integration; v4 Pro availability may be the next major release feature.
- **In-session page search (Ctrl+F)**: [PR #1155](https://github.com/netease-youdao/LobsterAI/pull/1155) proposes full text-node search with TreeWalker and CSS Custom Highlight API; still open, may see revival in upcoming milestones.

## 7. User Feedback Summary

- **Visibility of ad dismissal**: Users want permanent control over ads, not just per-banner dismissal ([PR #2374](https://github.com/netease-youdao/LobsterAI/pull/2374)).
- **Concern over safety-critical modules**: Community explicitly requests unit tests for `commandSafety.ts` and `coworkMemoryJudge.ts` to prevent silent destructive actions and memory pollution ([Issue #1154](https://github.com/netease-youdao/LobsterAI/issues/1154)).
- **Model freshness**: Users are vocal about wanting v4 Pro support ([Issue #2489](https://github.com/netease-youdao/LobsterAI/issues/2489)).
- **UX consistency**: Reports of broken font sizing and skill toggle behavior highlight friction in the interface; both were addressed in today’s merged PRs.

## 8. Backlog Watch

- **[Issue #1154](https://github.com/netease-youdao/LobsterAI/issues/1154)** (open since 2026-03-31, stale): Missing tests for safety-critical modules. No maintainer response documented. High importance given the explicit risk of destructive command execution.
- **[PR #1153](https://github.com/netease-youdao/LobsterAI/pull/1153)** (open since 2026-03-31, stale): Gemini `/v1` baseURL path bug resulting in malformed API requests. Ticket references failing integration with Google Gemini; requires maintainer review.
- **[PR #1155](https://github.com/netease-youdao/LobsterAI/pull/1155)** (open since 2026-03-31, stale): In-session search feature, fully implemented with i18n and highlighter. Long idle; may need rebase and maintainer decision to merge or close.
- **[PR #2460](https://github.com/netease-youdao/LobsterAI/pull/2460) / [PR #2465](https://github.com/netease-youdao/LobsterAI/pull/2465)** (dependabot): Dependency bumps for `rimraf` and `vite` with major version jumps; could introduce breaking changes and need testing before merge.

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

## Today's Overview

Moltis shows a quiet but active development phase on 2026-08-15, with no new issues filed and no releases published, yet two open pull requests remain in the pipeline, signaling ongoing feature work. The project continues to prioritize connector infrastructure and platform integrations, with PR #1190 (durable calendar, channel, and email connectors) having seen its most recent update on August 14 and PR #1195 (Slack native live task cards) newly opened today. No issues are currently open or active, which reflects a clean backlog but also suggests either low user traffic or effective resolution in earlier days. The absence of merged or closed PRs in the last 24 hours indicates that maintainers are still iterating on the two featured PRs rather than landing new code. Overall, the project appears healthy but in a simmering state, with focus shifting toward real-time channel integration and provider-scoped data handling.

## Releases

No new releases were published on 2026-08-15. There are no changelog entries, breaking changes, or migration notes to report for this period.

## Project Progress

No PRs were merged or closed in the last 24 hours. However, two PRs remain open and represent significant progress in adjacent areas: **PR #1195** ([link](https://github.com/moltis-org/moltis/pull/1195)), opened today by *penso*, introduces Slack-native live task/plan cards rendered within the existing response stream, adding channel-neutral tool lifecycle updates, opaque per-run IDs for card privacy, and terminal error cleanup for failed streams. **PR #1190** ([link](https://github.com/moltis-org/moltis/pull/1190)), opened on August 11 and updated yesterday, advances durable provider-neutral connector persistence with atomic snapshots, scheduling, projections, and bounded local full-text search, plus read-only CalDAV, Gmail, Himalaya v2, and channel-history datasets. Together these indicate active extension of Moltis toward production-grade integration surfaces.

## Community Hot Topics

No issues or PRs have generated significant comment traffic or reactions in the last 24 hours; both entries show zero reactions and no comment data. The most notable active topics remain the two open PRs themselves: **PR #1195** ([link](https://github.com/moltis-org/moltis/pull/1195)) addresses real-time visibility of a running assistant's tool actions inside Slack, which speaks to a user need for operational transparency when watching a background task complete. **PR #1190** ([link](https://github.com/moltis-org/moltis/pull/1190)) targets persistent, provider-bound connections to calendars, email, and channel history—pointing at a need for long-lived, private, and searchable assistant memory across external work systems. Since neither PR has collected comments or reactions yet, community discourse appears limited, but the underlying use cases (live task observability and durable multi-source context) are clear product signals.

## Bugs & Stability

No bugs, crashes, regressions, or stability concerns were reported or referenced in any issue or PR over the last 24 hours, nor are there any open issues describing defect-level problems. The only stability-adjacent note appears inside **PR #1195** ([link](https://github.com/moltis-org/moltis/pull/1195)), which explicitly handles "terminal error cleanup on failed streams," suggesting the author identified a potential failure mode in the Slack card rendering path and has proactively included corrective logic—though that PR has not yet been merged. There are no known severity-ranked user-facing bugs to track at this time.

## Feature Requests & Roadmap Signals

User-driven feature requests are nil for this period, but the two open PRs encode clear roadmap signals: Slack-native live task cards (PR #1195, [link](https://github.com/moltis-org/moltis/pull/1195)) and durable calendar/channel/email connectors with provider-scoped trust (PR #1190, [link](https://github.com/moltis-org/moltis/pull/1190)). The trajectory suggests the next release of Moltis will likely include (a) real-time, privacy-scoped tool-activity rendering directly inside Slack (and possibly other channels given the "channel-neutral lifecycle" design) and (b) a persistent connector layer for external data sources—likely enabling long-running agents that can plan, schedule, and read from email/calendar while maintaining bounded local search. The design elements (opaque IDs, provider-owned schemas, no copied credentials) point toward an intentional security posture. A future version is also likely to generalize the Slack-specific card logic into a reusable provider-neutral rendering mechanism.

## User Feedback Summary

With zero open issues and zero comments across PRs, direct user feedback is absent this cycle. What can be inferred comes from the PR authors' intent: users want to see what the assistant is doing live (task card visibility in Slack), they need persistent context from their own tools (email, calendar, channel history), and they expect privacy-safe handling—both in terms of per-run opaque IDs (PR #1195) and provider-owned schemas with no copied credentials (PR #1190). There is no evidence of dissatisfaction, feature complaints, or usage friction logged in this window. The absence of open bugs and dense, well-scoped PRs implies either a satisfied user base or one that has not yet engaged heavily; nothing in the data signals churn or negativity.

## Backlog Watch

There are no long-unanswered issues or stale PRs awaiting maintainer attention in the current dataset. Both open PRs (#1195, #1190) were updated within the last 2 days and appear to be actively maintained. No issue has gone unanswered, and no PR is sitting without review. The most senior item is **PR #1190**, open since August 11, but it received its last update on August 14, indicating ongoing progress. No items in this repository currently require escalation or flagging for maintainer response.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw Project Digest — 2026-08-15

## Today's Overview

CoPaw (QwenPaw) shows a high-velocity development day: 50 issues updated (38 closed, 12 active) and 41 PRs updated (15 merged/closed, 26 open), with no new releases. The queue is dominated by 2.1.0-era bug reports (MCP tool resolution, tool-result duplication, session-cancellation races) paired with a wave of same-day fix PRs, indicating active regression response. Feature development continues on multiple fronts: dynamic skill systems, per-session model overrides, computer-use window observation, and console UI organization all received new PRs.

## Releases

No new releases in the last 24 hours. The latest known version remains 2.1.0 (referenced in issues #7016, #6958).

## Project Progress

Merged/closed PRs today (15 total) include:

- **feat(onebot): localize inbound media before agent processing** (#6715) — aligns OneBot media handling with AgentScope 2.0 `DataBlock` pipeline
- **feat(channels): support interactive configurators for plugin channels** (#6943) — restores `get_configurator()` support in the CLI channel flow
- **feat(skill-system): dynamic skill loading + auto-unload + frontmatter fix** (#7031 and #7029) — introduces `load_skill`/`unload_skill`/`check_skill_status` tools, 5-round idle auto-unload, and frontmatter parsing fixes
- **feat(auto-title-sync): auto-memory linked chat title refresh + observability** (#7030) — dynamic titles that update as auto-memory produces new entries
- **docs: add whisper installation instructions** (#2105) — `--extras whisper` documentation for local STT
- **chore(deps): bumping agentscope to 2.0.6** (#6908, open) — compatibility tracking

## Community Hot Topics

1. **[#3045 — Auto model fetch broken on Windows desktop v1.0.1]** (8 comments, closed) — A recurring model-configuration issue; the root cause appears to be the transition to the Responses API.
2. **[#7011 — Console stop request cancels an active Feishu session under multiple UI sessions]** (5 comments, open) — A concurrency bug with session identity crossover across UI sessions, with follow-up investigation today.
3. **[#2418 — Skills-hub management page request]** (7 comments, closed) — Users want in-app discovery/download of mainstream skills; aligns with the new dynamic-skill PRs.
4. **[#2846 — Auto-update and correct Windows taskbar icon]** (6 comments, closed) — Persistent desktop UX asks; the taskbar icon issue remains open as a separate concern.
5. **[#7010 — QwenPaw app cannot run as a background daemon over SSH]** (6 comments, closed) — Users need headless/daemon mode for server deployments.

## Bugs & Stability

| Severity | Issue | Status | Fix PR |
|---|---|---|---|
| **High** | **#7016 — Tool call 404 during streaming sessions** — frontend repeatedly polls `/offload` for already-evicted tool calls in 2.1.0 | OPEN | None yet |
| **High** | **#7011 — Console stop cancels active Feishu session** — session identity crossing between UI sessions (2.1.0) | OPEN | None yet |
| **High** | **#6958 — FastMCP tool result written twice to file** — duplicate structured/unstructured copies after truncation (2.1.0b4) | OPEN | [#6969](https://github.com/agentscope-ai/QwenPaw/pull/6969) — avoid duplicate tool result when MCP returns structuredContent (under review) |
| **Medium** | **#7025 — QwenPaw Creator plugin breaks all other plugins** — install causes cascade failure | OPEN | None yet |
| **Medium** | **#6405 — MCP "Tool not found" after 2.0 upgrade** — tool naming changed to `[mcp-key]__[tool_name]` but lookup fails | CLOSED | None cited |
| **Medium** | **#6951 — Scroll compression hides pre-compression history on re-entry** — UI shows only eviction index/tail | CLOSED | None cited |
| **Low** | **#7040 — Multiple copy typos ("Stopp Running")** | CLOSED | None (invalid) |

## Feature Requests & Roadmap Signals

| Request | Signal | Likelihood |
|---|---|---|
| **Per-session model overrides** (#5992) | PR open with positive description | **High** — likely in next minor |
| **Dynamic skill loading + auto-unload** (#7033/#7029) | Merged today | **High** — lands in 2.1.x |
| **Chat title auto-sync with memory** (#7032/#7030) | Merged today | **High** — lands in 2.1.x |
| **Conversation splitting / selective message deletion** (#4001, #4436) | Multiple open requests, no PR | Medium |
| **GGUF local model download & run** (#6433) | Low recent activity | Medium |
| **Computer use support** (#5551 + #7037) | New PR "observe related window surfaces" | Medium — back-end pieces advancing |
| **Daemon/background mode** (#7010) | Closed as question; repeated request | Medium |
| **Responses API support for OpenAI-compatible providers** (#944, #3002, #2737) | Long-standing; recurring closed issues | Medium — ecosystem pressure |

## User Feedback Summary

- **Pain point — desktop update flow**: multiple users (#2846, #3464) describe uninstall/reinstall as the only update path; requests for auto-update are consistent.
- **Pain point — plugin/MCP instability**: #7025 (Creator plugin breaks all plugins) and #6405 (MCP tool not found after 2.0) suggest a fragile plugin boundary post-2.0 refactor.
- **Pain point — daemon/headless operation**: #7010 highlights SSH/server deployment pain; users expect `qwenpaw app` to detach like a service.
- **Positive signal**: the fast turnaround on skill-system PRs (#7033, #7031, #7029) and the per-session override work (#5992) shows maintainers are shipping long-requested agent-runtime features.

## Backlog Watch

- **[#5992 — Per-session model overrides]** (opened 2026-07-12, `first-time-contributor`, Under Review) — remains open for over a month; high-request feature directly aligning with multiple closed feature requests.
- **[#6302 — Unify provider discovery, model metadata, routing, and agent controls]** (opened 2026-07-21) — large architectural PR, open with no comments; needs maintainer review.
- **[#4436 — Conversation splitting to new session]** (opened 2026-05-16) — no maintainer response or linked PR.
- **[#4001 — Delete single messages in conversation]** (opened 2026-05-02) — no maintainer response; paired with #4436 for transcript-management features.

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