# OpenClaw Ecosystem Digest 2026-08-18

> Issues: 500 | PRs: 500 | Projects covered: 13 | Generated: 2026-08-18 01:01 UTC

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

# OpenClaw Project Digest — 2026-08-18

## 1. Today's Overview

OpenClaw continues to show a very high level of activity, with 500 issues and 500 PRs updated in the past 24 hours. However, the project appears to be in a **stability-critical phase**: only 20 issues were closed versus 480 still open/active, and while 133 PRs were merged or closed, 367 remain open. Most P1/P2 issues share recurring root causes—message delivery loss, session-state corruption, crash loops, and provider auth failures—with many lacking fix PRs and still awaiting maintainer or product decisions. There were no new releases today. The maintainer team appears to be reviewing a steady stream of UI refinement PRs from community contributors, but the high number of `needs-maintainer-review` and `needs-product-decision` labels on long-standing critical bugs suggests a growing backlog risk.

## 2. Releases

None.

## 3. Project Progress

No new PRs were merged or closed today according to the provided data; all PRs in the snapshot are either open or closed with no merge timestamp visible. That said, notable closed PRs in the recent window (up to the last 24h) represent significant progress:

- **[#120900 — feat(ui): review install policy warnings](https://github.com/openclaw/openclaw/pull/120900)** *(closed)* — Adds an authenticated admin path in the Control UI to review and acknowledge install-policy warnings before continuing plugin installs.
- **[#116489 — feat(security): require acknowledgement for install policy warnings](https://github.com/openclaw/openclaw/pull/116489)** *(closed)* — An external `security.installPolicy` command can now return `warn`, requiring operator confirmation for suspicious plugin/skill installs; includes CLI and interactive flows.
- **[#122764 — fix(queue): arbitrate shared capacity across grouped lanes](https://github.com/openclaw/openclaw/pull/122764)** *(closed)* — Fixes #122763; moves shared-slot ownership to a capacity-group dispatcher and improves concurrency handling across lanes.
- **[#117977 — fix(skills): authorize configured canonical workshop roots](https://github.com/openclaw/openclaw/pull/117977)** *(closed)* — Adds explicit `skills.workshop.writableRoots` configuration.

Several open PRs are actively advancing, most notably **#124303 — fix(sessions): track context window provenance** (P1, XL) and **#116253 — fix(embedded-runner): flush partial streaming output** (P1, XL), both are labeled "waiting on author" or "needs proof."

## 4. Community Hot Topics

The most active discussions continue to revolve around **reliability of sessions and agent behavior**, with several long-running issues drawing high comment counts:

- **[#77598 — Track live dev agent behavior and trajectory](https://github.com/openclaw/openclaw/issues/77598)** — 23 comments; a running-notes issue monitoring a dev agent's behavior in production; signals community interest in observability of agent trajectories.
- **[#91009 — Codex PreToolUse native hook relay spawns CPU-bound processes](https://github.com/openclaw/openclaw/issues/91009)** — 20 comments, 2 👍; high CPU consumption and gateway RPC stalls due to hook process spawns.
- **[#68596 — Configurable streaming watchdog timeout](https://github.com/openclaw/openclaw/issues/68596)** — 15 comments, 8 👍; users with long-reasoning models (DeepSeek-R1, kimi-k2.5) hit false "no stream updates" resets.
- **[#62505 — Coding Agent never completes anything (regression)](https://github.com/openclaw/openclaw/issues/62505)** — 15 comments; agent regressed from working in 2026.4.2; P1, source repro available.
- **[#38327 — "Cannot convert undefined or null to object" with google-vertex/gemini-3.1-pro-preview](https://github.com/openclaw/openclaw/issues/38327)** — 14 comments, 3 👍; P1 regression blocking users after upgrade to 2026.3.2.

Underlying pattern: the community is actively running OpenClaw in production-like settings and reports **message loss, session recovery failures, and provider-auth wedges** as the most disruptive problems.

## 5. Bugs & Stability

Ranked by severity, the following critical bugs were active in the last 24h:

**P1 — Regressions and blocker-class bugs:**
- **[#91009 — Codex hook relay spawns CPU-bound processes](https://github.com/openclaw/openclaw/issues/91009)** — 100%+ CPU per process, gateway RPC stalls. No fix PR linked.
- **[#62505 — Coding Agent never completes anything](https://github.com/openclaw/openclaw/issues/62505)** — Regression since 2026.4.2; agent produces no output. No fix PR linked.
- **[#38327 — Vertex/Gemini "undefined or null to object"](https://github.com/openclaw/openclaw/issues/38327)** — Regression in 2026.3.2; affecting any message with embedded agent. No fix PR linked.
- **[#74586 — memory_search aborted as timeout despite completion](https://github.com/openclaw/openclaw/issues/74586)** — impacts active-memory plugin; no fix PR linked.
- **[#53408 — write/exec tool params silently dropped after long conversations](https://github.com/openclaw/openclaw/issues/53408)** — Behavior bug; needs live repro. No fix PR linked.
- **[#97616 — Zombie process leak from hooks/tools](https://github.com/openclaw/openclaw/issues/97616)** — Regression; causes runtime degradation.
- **[#86215 — Codex OAuth refresh failures wedge agents for hours](https://github.com/openclaw/openclaw/issues/86215)** — No clear alerting or profile rotation. No fix PR linked.
- **[#70903 — Persistent provider cooldown after billing recovery](https://github.com/openclaw/openclaw/issues/70903)** — P0-labeled; users remain blocked even after topping up credit.

**P2 — Significant stability issues:**
- **[#67777 — Subagent completion delivery lost on timeout/drain](https://github.com/openclaw/openclaw/issues/67777)** — message loss; no fix PR.
- **[#53540 — "Network connection lost" when tool params are large](https://github.com/openclaw/openclaw/issues/53540)** — embedded runner failure; no fix PR.
- **[#71689 — Tasks registry restore fails on malformed SQLite](https://github.com/openclaw/openclaw/issues/71689)** — Gateway startup failure; data loss risk; no fix PR.
- **[#51429 — Hardcoded `/Users/wangtao` working path in published code](https://github.com/openclaw/openclaw/issues/51429)** — user-visible misbehavior; source repro identified; no fix PR.

**Fix PRs in flight for known bugs:**
- **[#125484 — fix(gateway): persist session cwd in transcript](https://github.com/openclaw/openclaw/pull/125484)** — addresses session cwd mismatch.
- **[#125261 — fix(gateway): read only the visible-message tail for session previews](https://github.com/openclaw/openclaw/pull/125261)** — fixes main-thread freeze on long sessions.
- **[#124303 — fix(sessions): track context window provenance](https://github.com/openclaw/openclaw/pull/124303)** — addresses session-state invalidation at model/runtime change.
- **[#116253 — flush partial streaming output before run budget abort](https://github.com/openclaw/openclaw/pull/116253)** — prevents loss of partial assistant output.

## 6. Feature Requests & Roadmap Signals

Prominent feature requests that are likely under consideration for near-term releases:

- **[#68596 — Configurable streaming watchdog timeout threshold](https://github.com/openclaw/openclaw/issues/68596)** — highly requested (8 👍); necessary for long-reasoning models; moderate implementation risk; likely candidate.
- **[#67419 — Session context bloat from bootstrap files](https://github.com/openclaw/openclaw/issues/67419)** — 20–30% token waste; optimization that could ship with context-window provenance work (#124303).
- **[#67413 — Per-agent dreaming configuration](https://github.com/openclaw/openclaw/issues/67413)** — 5 👍; avoids OOM kills; low risk; plausible.
- **[#60572 — Multi-Slot Memory Architecture](https://github.com/openclaw/openclaw/issues/60572)** — architecturally substantial; likely deferred but aligns with memory reliability themes.
- **[#63990 — Multi-index embedding memory with model-aware failover](https://github.com/openclaw/openclaw/issues/63990)** — consistent with active-memory reliability complaints; plausible in a later release.
- **[#42840 — MathJax/LaTeX support in Control UI](https://github.com/openclaw/openclaw/issues/42840)** — 10 👍; small-to-medium UI effort; likely to be picked up by UI contributors given the steady stream of UI PRs.
- **[#45758 — YAML config support](https://github.com/openclaw/openclaw/issues/45758)** — moderate demand; potentially controversial given existing JSON5 migration.

**UI-related feature PRs in progress** (from the community) suggest the next web UI release will include: slug command argument staging (**#123356**), a redesigned tool-call transcript activity (**#125240**), simplified Markdown tables (**#125219**), and an "Ask OpenClaw" toggle move (**#125486**).

## 7. User Feedback Summary

- **Production reliability is the dominant concern.** Multiple users describe agents as "working for weeks" and then breaking after upgrades. The recurring themes are message loss, stuck sessions, silent tool-parameter drops, and provider-auth wedges that last for hours with no clear alerting.
- **Positive sentiment for the product's utility:** Users in #73537 and #62505 describe OpenClaw as a "family and business assistant" and "genuinely part of our daily workflow," and the Stream watchdog issue (#68596) has 8 👍, indicating deep adoption in heavy daily use.
- **Frustration with silent failures:** Several reports (#58957, #112196, #107814) highlight cases where the system fails without a visible error, making it hard for users to distinguish "model issue" vs. "OpenClaw bug."
- **Internationalization and localization gaps remain:** Chinese users report hardcoded English UI and even a hardcoded `/Users/wangtao` path, underscoring the need for i18n and quicker review of behavior-level bugs.

## 8. Backlog Watch

The following older issues remain open without a linked fix PR and are still awaiting maintainer action (most carry `needs-maintainer-review` and `needs-product-decision`):

- **[#62505 — Coding Agent never completes anything](https://github.com/openclaw/openclaw/issues/62505)** — P1 regression since April; 15 comments; no fix PR.
- **[#38327 — Vertex/Gemini "undefined or null to object"](https://github.com/openclaw/openclaw/issues/38327)** — P1 regression since March; 14 comments; no fix PR.
- **[#53408 — write/exec tool params silently dropped](https://github.com/openclaw/openclaw/issues/53408)** — P1 since March; 11 comments; no fix PR.
- **[#67777 — Subagent completion delivery lost](https://github.com/openclaw/openclaw/issues/67777)** — P1 since April; 12 comments; no fix PR.
- **[#70903 — Persistent provider cooldown after billing recovery](https://github.com/openclaw/openclaw/issues/70903)** — P0-labeled; 7 comments; no fix PR.
- **[#50093 — WhatsApp missed-message backfill after reconnect](https://github.com/openclaw/openclaw/issues/50093)** — P1 since March; 13 comments; no fix PR.
- **[#71689 — Tasks registry restore fails on malformed SQLite](https://github.com/openclaw/openclaw/issues/71689)** — P1; data-loss risk; no fix PR.
- **[#51429 — Hardcoded engineering path in published release](https://github.com/openclaw/openclaw/issues/51429)** — P2; 12 comments; 0 👍; no fix PR.

These issues share a common pattern: they are tagged with `clawsweeper:no-new-fix-pr` and `clawsweeper:needs-product-decision`, meaning the fix shape is unclear or a product decision is pending. Given the breadth and age of these items, **prioritizing session-state/message-loss reliability and auth-provider resilience should be the immediate roadmap focus.**

---

## Cross-Ecosystem Comparison

# Cross-Project Ecosystem Comparison Report — 2026-08-18

## 1. Ecosystem Overview

The personal AI assistant open-source landscape is in a high-velocity, reliability-critical phase. Projects are shipping features rapidly, but the dominant theme across all communities is production-grade stability: message delivery loss, session-state corruption, provider auth failures, and silent tool-call regressions appear consistently across OpenClaw, NanoBot, NanoClaw, and CoPaw. The ecosystem is bifurcating into two architectural philosophies: heavyweight agent orchestration platforms (OpenClaw, ZeroClaw, IronClaw, Moltis) and lightweight chat-integration agents (NanoBot, PicoClaw, TinyClaw). Multi-channel support, session isolation, and memory reliability are emerging as the core differentiators, while cost-control and governance features are gaining prominence as users deploy agents with real budgets and production workloads.

## 2. Activity Comparison

| Project | Issues Updated | PRs Updated | Releases | Health Score | Notes |
|---|---|---|---|---|---|
| OpenClaw | 500 | 500 | None | **2/10** — 480 open issues, 20 closed; 133 PRs merged; multiple P0/P1 regressions without fix PRs; backlog risk growing |
| NanoBot | 3 | 15 | None | **8/10** — 5 PRs merged; critical Telegram polling fix landed; healthy issue-to-fix ratio |
| ZeroClaw | 50 | 50 | None | **7/10** — 15 PRs merged; security fixes landing fast; RFC process being streamlined |
| PicoClaw | 3 | 4 | None | **7/10** — 3 PRs merged incl. critical tool-loop fix; low activity but responsive |
| NanoClaw | 4 | 42 | None | **8/10** — 25 PRs merged; high velocity on channel-layer wave; new regressions have fix PRs already |
| NullClaw | 0 | 1 | None | **5/10** — Zero activity; single Dependabot PR stale 64 days |
| IronClaw | 29 | 44 | v1.3.0-rc.1 | **6/10** — 16 PRs merged; but RC1 has critical boot regression blocking upgrades |
| LobsterAI | 7 | 21 | None | **7/10** — 18 PRs merged; efficient review pipeline; backlog-clearing |
| Moltis | 3 | 9 | None | **8/10** — 6 PRs merged; healthy maintenance rhythm; 2-month-old feature PRs merged |
| CoPaw | 13 | 33 | None | **8/10** — 20 PRs merged; maintainers responsive; several bugs fixed same-day |
| TinyClaw | 0 | 0 | None | **3/10** — No activity |
| EasyClaw | 0 | 0 | v1.8.100 | **6/10** — Quiet but shipping releases; no open backlog |

## 3. OpenClaw's Position

OpenClaw remains the ecosystem's reference implementation with the largest community by an order of magnitude (500 issues and PRs updated daily versus 10–50 for peers). Its advantages: broadest provider matrix, deepest plugin ecosystem, and mature Control UI with community-contributed polish. However, that scale is a double-edged sword — the project is straining under reliability debt. P1 regressions (agent produces no output since v2026.4.2, provider auth failures, session corruption) sit unresolved for months, while peers like NanoBot and CoPaw ship equivalent fixes within days. OpenClaw's technical approach differs from peers in its session-context provenance tracking and configurable streaming watchdog, but these features are still in-flight PRs, not shipped. The community is highly invested (users describe it as "genuinely part of our daily workflow") yet increasingly frustrated by silent failures. In short: OpenClaw dominates mindshare and capability surface area, but its stability gap relative to smaller competitors is the ecosystem's most urgent risk.

## 4. Shared Technical Focus Areas

| Focus Area | Projects | Specific Needs |
|---|---|---|
| **Session/Message Reliability** | OpenClaw, NanoBot, NanoClaw, CoPaw, PicoClaw | Message delivery loss after timeout/drain; session-state corruption on upgrade; silent tool-call loops; context window invalidation at model change; subagent completion delivery |
| **Provider Resilience** | OpenClaw, ZeroClaw, CoPaw, PicoClaw | Gemini/Vertex parameter errors; auth token refresh failures causing multi-hour wedges; persistent cooldown after billing recovery; wrong model logged after fallback |
| **Memory & Context Management** | OpenClaw, Moltis, CoPaw, LobsterAI | Context bloat from bootstrap files (20–30% token waste); multi-slot memory architecture; session cwd persistence; context provenance tracking |
| **Cost Control & Budget Guardrails** | NanoBot, ZeroClaw, OpenClaw | Spend firewalls for runaway loops; atomic action-budget accounting (race conditions in parallel tool execution); bounded attachment downloads |
| **Channel Consistency** | CoPaw, PicoClaw, NanoClaw | Per-channel model isolation; consistent error behavior across Telegram/WeChat/Slack/IRC; media URL expiry poisoning sessions; split long-message reassembly |
| **Local & External Model Support** | LobsterAI, Moltis, OpenClaw | Ollama local models unusable; external agent model/effort selection; Podman parity with Docker; chat-completions protocol compatibility for Open WebUI |
| **Observability & Logging** | OpenClaw, LobsterAI, ZeroClaw, IronClaw | Agent trajectory tracking; log redaction of API keys; misleading failure logs after fallback; silent failures indistinguishable from model issues |
| **Multi-Agent Orchestration** | CoPaw, LobsterAI, ZeroClaw | Single-window agent collaboration; MD-based workflow orchestration; goal-mode bounded multi-turn work; A2A standardization |

## 5. Differentiation Analysis

| | Feature Focus | Target Users | Technical Architecture |
|---|---|---|---|
| **OpenClaw** | Broadest ecosystem; UI polish; plugin marketplace | Hobbyists to production power users | Monolithic gateway + Control UI; community-driven provider plugins |
| **NanoBot** | Speed and lightweight chat; TUI; WebUI interactivity | Individual users; streamlined daily assistant | Lightweight gateway; TypeScript TUI; fast feature iteration |
| **ZeroClaw** | Security-hardening; RFC-driven governance | Enterprise/security-conscious operators | Rust core? (CPAL, Clippy signals); RFC process for every architectural change |
| **NanoClaw** | Channel-layer refactoring; driver seams for non-Docker runtimes | Docker-centric production users | Session-driver abstraction; Slack per-thread; bridge extension hooks |
| **IronClaw** | Performance engineering; WASM tools; notification inbox | Self-hosters, performance-sensitive users | WASM sandbox; write-pressure optimization; libSQL backend |
| **LobsterAI** | Electron desktop; Chinese-market LLM providers (Qwen); partner ecosystem | Chinese-market desktop users | Electron shell + OpenClaw bundled; per-agent working dirs; Qwen provider focus |
| **Moltis** | External agent aggregation; browser automation breadth | Advanced multi-agent users | Rust; shadow-DOM piercing; external-agent model/effort selection |
| **CoPaw** | AgentScope AI integration; Chinese IM channels (Feishu, DingTalk, WeChat) | Chinese-market enterprise users | DataPaw runtime; catalog-driven (future) provider routing; PowerContext memory |
| **TinyClaw / NullClaw** | Minimal footprint; no sustained development | Niche / experimentation | Unclear; dormant |

## 6. Community Momentum & Maturity

**Tier 1 — Rapidly iterating (high velocity, responsive maintainers):**
- **NanoClaw** (25 PRs merged/day; core-team channel wave; regressions get fix PRs same-day)
- **CoPaw** (20 PRs merged/day; 5 bugs fixed in-window; healthy first-time contributor pipeline)
- **IronClaw** (16 PRs merged/day; executing a structured write-pressure epic with sub-issues; active QA dogfooding sprint)

**Tier 2 — Moderate pace with healthy PR pipelines:**
- **LobsterAI** (18 PRs merged; efficient review; clearing April backlog)
- **ZeroClaw** (15 PRs merged; security fixes fast; RFC governance deliberate but slow)
- **NanoBot** (5 PRs merged; small but responsive)
- **Moltis** (6 PRs merged; two long-lived features finally merged — healthy but slow PR review)

**Tier 3 — Stability-critical / at risk:**
- **OpenClaw** — Massive volume but 480 open issues versus 20 closed; P1 regressions dating to March/April without fix PRs; maintainer reviews backlogged. Community trust eroding despite product utility.
- **NullClaw** — Effectively dormant (0 issues, 0 PRs, 1 stale Dependabot PR at 64 days).
- **TinyClaw** — No activity.

**Tier 4 — Maintenance-only:**
- **EasyClaw** — Quiet but shipping scheduled releases; no community interaction.
- **PicoClaw** — Minimal but landing critical fixes when needed.

## 7. Trend Signals

1. **Reliability is the #1 differentiator, not features.** Across every active project, the most vocal user pain is silent failure: agents hanging, messages lost, sessions corrupted, tool params dropped, auth wedges with no alerting. Projects that ship fixes fast (NanoBot, CoPaw, NanoClaw) are earning trust; those that don't (OpenClaw) are bleeding it.

2. **Cost governance is moving from nice-to-have to must-have.** NanoBot received a spend-firewall request tied to commercialization anxiety; ZeroClaw fixed an atomic budget-accounting race; CoPaw fixed a false context-full warning from miscounted image tokens. Users are deploying agents with real money at risk and want guardrails.

3. **The Chinese-market ecosystem is a substantial parallel track.** CoPaw, LobsterAI, and half of OpenClaw's Chinese-language issues point to a large, active user base running agents on WeChat, DingTalk, Feishu, QQ, and Weixin. Per-channel configuration isolation and bilingual support are emerging requirements that Western-centric roadmaps may miss.

4. **Observability is the next frontier.** OpenClaw's trajectory-tracking issue, ZeroClaw's misleading fallback logs, and LobsterAI's log redaction all signal the same need: operators want to know *why* an agent did what it did, and they need logs that don't leak secrets or lie about which model served the request.

5. **Multi-agent and interop are coming.** CoPaw's single-window collaboration request, LobsterAI's MD-based workflow request, ZeroClaw's goal-mode RFC, and the VOKO A2A proposal all point to agents orchestrating agents. The ecosystem is moving from single-assistant to agent fleets.

6. **External tool interoperability is a growth lever.** ZeroClaw's chat-completions RFC (Open WebUI, LobeChat, Continue.dev, Aider, LangChain), Moltis's external-agent model selection, and IronClaw's ACP serve command all target the same goal: letting users plug the assistant into their existing AI toolchain rather than replacing it.

7. **Upgrade regression risk is systemic.** Almost every project reported regressions introduced by recent releases: OpenClaw's agent-breaking since v2026.4.2, CoPaw's MCP tool-name failures after v2.0, NanoClaw's task-in-chat breakage in v2.1.48, IronClaw's RC1 boot crash. The trend: ships fast, breaks fast. The projects winning are those that can patch same-day and maintain migration stories.

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot Project Digest — 2026-08-18

## 1. Today's Overview

NanoBot saw a high-velocity development day with 15 pull requests updated in the last 24 hours, indicating a very active maintenance and feature cycle. Notably, 5 PRs were merged or closed, including critical fixes for Telegram polling stalls (#5156, #5301) and a major CLI enhancement introducing a native TypeScript terminal UI (#5406). The issue tracker is comparatively quiet with 3 updated issues, highlighted by an open bug concerning an endless loop in goal completion (#4864) and a new feature request for a hybrid spend firewall (#5409). The project shows a healthy mix of cross-platform stability fixes (Windows, macOS) and new user-facing features, particularly around the WebUI.

## 2. Releases

No new releases were published in the last 24 hours.

## 3. Project Progress

The project saw significant progress with several key PRs merged or closed:

- **CLI Enhancements (#5406 - Merged)**: Introduced a native TypeScript terminal UI, superseding the previous PR #4329 which had been incorrectly marked as merged. This brings a more polished, cross-terminal TUI experience and consolidates the CLI architecture.
- **Telegram Stability (#5156, #5301 - Merged)**: Fixed the critical issue #5171 where Telegram polling would stall silently and permanently after transient network failures. The merged fixes bridge stdlib logging into loguru and add a liveness check, with a larger watchdog rebuild planned for the future.
- **Gateway Fixes (#5416 - Closed)**: Stabilized process identities on macOS by replacing locale-dependent `ps lstart` commands with native `proc_pidinfo` birth timestamps, improving the reliability of gateway client lease management.
- **Goal Handling (#5410 - Closed)**: Fixed a bug where the agent would repeat clarification replies when a sustained goal was active, ensuring continuation is only injected at the actual tool-call budget boundary.

## 4. Community Hot Topics

The most engaging discussion continues around the bug causing an endless loop for tool calls, with 7 comments and 1 reaction:

- **[Issue #4864 - Endless loop for `<tool_call> <function=complete_goal>`](https://github.com/HKUDS/nanobot/issues/4864)**: The community is actively investigating a regression where the gateway parses the `recap` parameter as a bare string instead of a JSON object, causing the `complete_goal` tool to fail repeatedly. This indicates users are hitting real-world friction with complex tool-call serialization, and the recent update introduced a breaking change.

## 5. Bugs & Stability

Three distinct bug areas were addressed or reported today, ranked by severity:

- **High - Telegram Polling Stall (#5171 - Closed)**: The bug where the bot permanently stops receiving messages after a network blip is now fixed by PRs #5156 and #5301. This was a severe reliability issue causing silent message loss.
- **High - Endless Loop in Goal Completion (#4864 - Open)**: A critical bug causing an infinite loop due to incorrect tool parameter parsing. **Fix Status:** No fix PR is linked yet; it remains an active open issue.
- **Medium - Gateway Process Identity (#5416 - Closed)**: Fixed a macOS-specific bug where locale-dependent process start times could be parsed incorrectly, leading to unstable process identities.
- **Medium - Windows Skill Compatibility (#5341 - Open)**: A fix is in progress to make the weather workflow Windows-safe by handling the PowerShell `curl` alias issue, which could cause the first weather command to fail.

## 6. Feature Requests & Roadmap Signals

Several new feature requests and enhancements are signaling the project's roadmap direction:

- **Hybrid Spend Firewall (Issue #5409 - New)**: A user has requested a hybrid spend firewall to prevent infinite loops from bankrupting LLM budgets as the project commercializes. This strongly suggests that cost-control and rate-limiting are becoming critical features for power users.
- **WebUI Session Messaging (PR #5358 - Open)**: Introduces server-owned `@name` handles for persisted WebUI sessions, allowing users to message other sessions via mentions. This indicates a move toward more complex, multi-session interactions.
- **WebUI Follow-up Suggestions (PR #5408 - Open)**: Proposes generating ephemeral, chat-scoped follow-up suggestions after successful turns, enhancing the interactive experience.
- **WebUI Side Conversations (PR #5364 - Open)**: Adds the ability to open temporary side conversations next to the current topic, with support for parallel sending and isolated drafts.

These WebUI features suggest the next version of NanoBot will likely focus heavily on enhancing the chat interface's interactivity and session management. The spend firewall request, while new, could become a priority given the commercial focus.

## 7. User Feedback Summary

User activity highlights a few key pain points and desires:

- **Frustration with Tool-Call Regressions**: The discussion on issue #4864 reflects user frustration with recent updates that broke tool parameter serialization, interrupting their workflows.
- **Reliability Concerns with Chat Integrations**: The Telegram polling bug (#5171) highlights a major pain point where silent failures lead to missed messages, a critical issue for users relying on the bot for real-time communication.
- **Strong Demand for Cost Controls**: The new feature request for a spend firewall (#5409) indicates user anxiety about unexpected LLM costs from runaway agent loops, especially as the project moves toward commercialization.
- **Desire for Advanced WebUI Features**: Multiple PRs for session messaging, side conversations, and follow-up suggestions show a clear user demand for a more sophisticated and flexible WebUI experience.

## 8. Backlog Watch

- **[PR #5341 - Windows-safe weather workflow](https://github.com/HKUDS/nanobot/pull/5341)**: This PR has been open for a week and has a conflict flag. It addresses a cross-platform skill compatibility bug that could affect a notable portion of users. Needs maintainer attention to resolve the conflict and merge.
- **[Issue #4864 - Endless loop for complete_goal](https://github.com/HKUDS/nanobot/issues/4864)**: While active, this high-severity bug remains open without a linked fix PR. It represents a regression in the gateway's tool handling and will likely require prompt attention in the next development cycle.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

## Today's Overview

ZeroClaw remains in an intensive security-hardening and architecture-ratification phase, with 50 issues and 50 PRs updated in the last 24 hours. The project is actively processing RFCs (several with multi-revision histories) and merging security-focused bug fixes. Velocity is high: 15 PRs were closed/merged in the last day, with key fixes landing for Gemini API key exposure, atomic budget accounting, and channel download bounds. The RFC process itself is undergoing revision (#9496), reflecting a deliberate effort to maintain governance velocity alongside technical changes. Six issues were closed in the last day, including two security bugs and one CI follow-up, while new issues continue to be filed around edge-case behaviors in providers and ZeroCode. No releases were cut today; the project appears to be mid-cycle in significant groundwork for v0.9.0.

## Releases

None.

## Project Progress

The 24-hour window saw 15 merged/closed PRs, with standout contributions:

- **[#9996](https://github.com/zeroclaw-labs/zeroclaw/pull/9996)** — Atomic action budget accounting, fixing a race condition in `RateLimitedTool` (parallel tool execution could exceed `max_actions_per_hour`).
- **[#9973](https://github.com/zeroclaw-labs/zeroclaw/pull/9973)** — Removed Gemini API keys from URLs and warmup requests, sending them via the documented `x-goog-api-key` header instead.
- **[#10000](https://github.com/zeroclaw-labs/zeroclaw/pull/10000)** — Bounded QQ and Mattermost attachment downloads, fixing unbounded memory reads.
- **[#9993](https://github.com/zeroclaw-labs/zeroclaw/pull/9993)** — Stopped implicit file reads in email attachment handling; outbound MIME attachments are now built only from explicit data payloads.
- **[#9612](https://github.com/zeroclaw-labs/zeroclaw/pull/9612)** — WhatsApp Cloud approval token now registers in the process-global guard map before any early exit, preventing orphaned tokens.
- **[#9765](https://github.com/zeroclaw-labs/zeroclaw/pull/9765)** — SOP definitions now load from the shared workspace, not the data_dir, fixing a config scope mistake.
- **[#10039](https://github.com/zeroclaw-labs/zeroclaw/pull/10039)** — Extracted a shared Clippy runner script across every CI workflow (closes #7884).
- **[#9398](https://github.com/zeroclaw-labs/zeroclaw/pull/9398)** — Added a scheduled macOS/Windows test workflow for both nightly and PR-triggered runs.
- **[#9547](https://github.com/zeroclaw-labs/zeroclaw/pull/9547)** — Upgraded CPAL 0.15 → 0.18 with full Voice Wake migration.
- **[#9544](https://github.com/zeroclaw-labs/zeroclaw/pull/9544)** — Delegated agent targets now honor configured provider fallbacks, fixing a significant reliability gap.
- **[#10010](https://github.com/zeroclaw-labs/zeroclaw/pull/10010)** — Fixed an ETXTBSY race in cron tests by replacing runtime-written scripts with a symlink to a PATH-resolved `sh`.

## Community Hot Topics

- **[#6808 RFC: Work Lanes, Board Automation, Label Cleanup (23 comments)](https://github.com/zeroclaw-labs/zeroclaw/issues/6808)** — A governance RFC currently in rollout, aiming to automate issue routing and reduce manual maintainer overhead. This signals growing project scale.
- **[#8603 RFC: ZeroClaw Chat Completions profile (23 comments)](https://github.com/zeroclaw-labs/zeroclaw/issues/8603)** — The community strongly wants OpenAI-protocol compatibility to unlock Open WebUI, LobeChat, and other tools. This is the highest-demand external-interop request today.
- **[#8303 RFC: Goal mode v1 (22 comments)](https://github.com/zeroclaw-labs/zeroclaw/issues/8303)** — Bounded foreground Matrix work across multiple turns; community is refining the control-plane scope to keep the first delivery small.
- **[#7155 RFC: Shell command confirmation tier (20 comments)](https://github.com/zeroclaw-labs/zeroclaw/issues/7155)** — Revision 3 narrows the normative scope to a reconciled shell-policy contract. Operationally important for safe CLI use.
- **[#9487/#9488 RFC pair: Runtime-owned sessions and unified attachments (19/18 comments)](https://github.com/zeroclaw-labs/zeroclaw/issues/9487)** — These two RFCs, both authored by NiuBlibing, propose a major architectural boundary shift for web chat and channels. Ratification appears close, but both remain under `needs-maintainer-review`.

## Bugs & Stability

Ranked by severity:

1. **High (S2) — Coding-agent tools charge action budget twice** ([#9594](https://github.com/zeroclaw-labs/zeroclaw/issues/9594), closed today): The `SecurityPolicy::enforce_tool_operation` call happened two times per invocation. Fixed by PR #9996.
2. **High (S2) — `RateLimitedTool` budget check is non-atomic** ([#9849](https://github.com/zeroclaw-labs/zeroclaw/issues/9849), closed today): Parallel tool calls could jointly exceed the hourly action limit due to check-before/record-after ordering. Fixed by PR #9996.
3. **High — Gemini API keys exposed in URLs** (PR #9973, merged): Keys were visible in generation and warmup URLs and URL-based diagnostics.
4. **High — QQ and Mattermost unbounded downloads** (PR #10000, merged): No bound on inbound attachment sizes when `Content-Length` was missing.
5. **High — Email implicit file reads** (PR #9993, merged): Empty MIME payloads could turn display filenames into local file reads.
6. **Medium — Failure logs claim requested model instead of pinned fallback model** ([#10023](https://github.com/zeroclaw-labs/zeroclaw/issues/10023), open): Reliable provider logs misstate the served model; diagnostic accuracy issue, no fix PR yet.

## Feature Requests & Roadmap Signals

- **Chat Completions protocol support** ([#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603)): Strongly requested; would make ZeroClaw a drop-in for the OpenAI tool ecosystem. Likely targeted for v0.9.x.
- **Agent export/import bundles** (PR #9986): New `zeroclaw agents export <alias>` CLI command added. This is a practical portability feature; look for it in the next minor release.
- **Per-execution shell confirmation tier** ([#7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155)): Claude Code-style allow/ask/deny policy. A high-priority security feature that maintainers have already scoped.
- **WhatsApp `allowed_groups` permit-none default** ([#9397](https://github.com/zeroclaw-labs/zeroclaw/issues/9397)): Would change default behavior from "allow all" to "deny all" — a breaking change users should track for v0.9.0.
- **Option-Backspace word deletion in ZeroCode** ([#10059](https://github.com/zeroclaw-labs/zeroclaw/issues/10059)): Minor UX improvement; it is labeled `good first issue`, likely to land soon.
- **Goal mode v1** ([#8303](https://github.com/zeroclaw-labs/zeroclaw/issues/8303)): Bounded, durable multi-turn foreground work. This is a core product capability signal for the v0.9 line.

## User Feedback Summary

- Users widely agree the RFC process is slow; [RFC #9496](https://github.com/zeroclaw-labs/zeroclaw/issues/9496) (Streamline RFC scope) directly reflects this. The proposal is to shorten the minimum discussion window and reduce unanimity requirements for non-architectural decisions.
- The Chat Completions request is driven by sharp, concrete use cases: Open WebUI, LobeChat, Continue.dev, Aider, and LangChain integration. The fact that 23 comments formed almost entirely around protocol design rather than feasibility suggests strong demand.
- There is a consistent concern about diagnosis/observability: pinned fallback provider logs claim to use the requested model (wrong); retry and cooldown messages are misleading. This matters to operators managing reliability settings.
- Security fixes landed with an unusually high volume and speed, suggesting security-related issues get high maintainer velocity and community support — a positive health signal.
- Community-driven RFC revisions (e.g., #7155 and #9487) show contributors are actively responding to maintainer scope reviews, which indicates functional contributor-maintainer collaboration.

## Backlog Watch

- **[#8692 Maintainer decision queue tracker for RFCs/design issues](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)** — Created 2026-07-04; the central place for RFCs needing maintainer decisions. Several items (e.g., #6165, #9487, #9488) remain under `needs-maintainer-review`. This tracker is the best signal for stalled items.
- **[#6165 RFC: Prefer a lighter ZeroClaw core through external integrations](https://github.com/zeroclaw-labs/zeroclaw/issues/6165)** — Open since 2026-04-27 (over 3 months) with 15 comments and no maintainer verdict yet.
- **[#6954 RFC: Provenance, conversation binding, and reply contract for internal turns](https://github.com/zeroclaw-labs/zeroclaw/issues/6954)** — Open since 2026-05-26, status `accepted` but still awaiting design follow-through.
- **[#6653 Host-architecture policy for emulated installs](https://github.com/zeroclaw-labs/zeroclaw/issues/6653)** — Open since 2026-05-14 with only 7 comments; a narrow but important edge-case for multi-arch deployment.
- **[#10011 Avoid runtime-written executables in daemon heartbeat tests](https://github.com/zeroclaw-labs/zeroclaw/issues/10011)** — Open and labeled `in-progress`, but the referencing test still has a lingering fixture design problem; status unclear.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

## PicoClaw Project Digest — 2026-08-18

### 1. Today's Overview

PicoClaw shows steady activity with 7 items updated in the last 24 hours: 3 issues (2 open, 1 closed) and 4 pull requests (1 open, 3 merged/closed). No new releases were published. The most significant progress is the merged fix for silent tool-failure loops, which addresses a critical production bug. Two long-stale PRs were also closed, clearing backlog. A new bug was reported with Google Antigravity's response handling, requiring investigation.

---

### 2. Releases

**No new releases were published in this period.**

---

### 3. Project Progress

Three PRs were merged or closed, advancing the following areas:

- **[#3312 — fix(agent): stop turn early on repeated identical tool failure](https://github.com/sipeed/picoclaw/pull/3312)** *(merged, stale)* — Fixes the agent looping silently to `max_tool_iterations` when a tool repeatedly fails with the same error. The agent now stops early and surfaces the issue to the user. This resolves the production bug described in issue #3311.
- **[#271 — fix: env overrides when config.json is missing + regression test](https://github.com/sipeed/picoclaw/pull/271)** *(merged, stale)* — Ensures environment variables override defaults when `config.json` is absent (e.g., Fly deployments). Previously the app would silently use the wrong default model, causing startup failure.
- **[#2606 — feat: enhance Weixin channel support and configuration](https://github.com/sipeed/picoclaw/pull/2606)** *(merged, stale)* — Adds multi-instance support for the Weixin channel, dynamic instance handling, better validation, and error handling for illegal channel names.

All three were authored weeks or months ago but were merged/closed today, indicating maintainer backlog cleanup.

---

### 4. Community Hot Topics

- **[Issue #3287 — Better support long messages in IRC](https://github.com/sipeed/picoclaw/issues/3287)** — 6 comments. Author requests PicoClaw treat split IRCv3 messages (over 512 bytes) as a single cohesive message. The central need is message-fragment reassembly for IRC channels—relevant for users running PicoClaw over IRC with real conversation lengths. No maintainer response yet; the "[stale]" label suggests it needs attention.

- **[Issue #3311 — Repeated identical tool failure loops silently to max_tool_iterations](https://github.com/sipeed/picoclaw/issues/3311)** — 2 comments. Production issue over Telegram: the agent never replied after a tool error. The conversation highlights user trust erosion when the agent silently hangs. **This issue has been fixed by merged PR #3312.**

---

### 5. Bugs & Stability

**High severity:**

- **[Issue #3311 — Silent infinite tool-failure loop](https://github.com/sipeed/picoclaw/issues/3311)** — User never receives an answer when a tool fails with the same error repeatedly. Confirmed in production over Telegram. **Fix merged as PR #3312.**
- **[Issue #3339 — Antigravity returns generic 429 despite valid OAuth and model discovery](https://github.com/sipeed/picoclaw/issues/3339)** — Google Antigravity authentication works, but every generation request returns `RESOURCE_EXHAUSTED`. No workaround provided. This appears to block Antigravity integration entirely for the reporter. No fix PR yet.

**Medium severity:**

- **[PR #3340 — Slack media upload fails because FileSize is zero-valued](https://github.com/sipeed/picoclaw/pull/3340)** — `SendMedia` built `UploadFileParameters` without `FileSize`; slack-go v0.23.1 rejects it pre-network. **Fix proposed, open.**

---

### 6. Feature Requests & Roadmap Signals

- **[Issue #3287 — IRC long-message support](https://github.com/sipeed/picoclaw/issues/3287)** — Request to treat split IRC messages as one cohesive unit. This is a clear roadmap signal for IRC channel improvements; likely candidate for a future release targeting channel robustness.

- **[PR #2606 — Weixin channel multi-instance support](https://github.com/sipeed/picoclaw/pull/2606)** — Enables running multiple Weixin instances with dynamic directory handling. The merge suggests the maintainers are investing in Weixin as a first-class channel.

**Prediction for next version:** the IRC long-message fragment reassembly feature is the most likely candidate, given the explicit request and low implementation complexity.

---

### 7. User Feedback Summary

- **Pain point:** silent agent hangs with no user feedback when tool errors repeat — reported as severely impacting production usability.
- **Pain point:** Antigravity integration unusable for generation, even with valid credentials.
- **Pain point:** environment-only deployments fail because env overrides were not applied when `config.json` is absent — now fixed.
- **Use case signal:** users rely on PicoClaw across multiple platforms (Telegram, Weixin, Slack, IRC), and expect consistent behavior and clear errors across all channels.
- **Satisfaction:** no explicit praise or gratitude was expressed in the sampled data; tone is utilitarian and bug-focused.

---

### 8. Backlog Watch

- **[Issue #3287 — IRC long-message support](https://github.com/sipeed/picoclaw/issues/3287)** — Open since 2026-07-22, 6 comments, stale-labeled. Needs maintainer triage or a feasibility response.
- **[Issue #3339 — Antigravity 429 error](https://github.com/sipeed/picoclaw/issues/3339)** — Open, zero comments, reported today. Needs verification and likely upstream API investigation.
- **[PR #3340 — Slack FileSize fix](https://github.com/sipeed/picoclaw/pull/3340)** — Open since 2026-08-17, no maintainer review yet. Minor but blocks Slack media uploads in the current release.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw Project Digest — 2026-08-18

## Today's Overview

NanoClaw shows a high-velocity development day fueled by the core team's channel-layer wave, with 42 PRs touched in the last 24 hours (25 merged/closed vs. 17 open). The "channels" refactor series — spanning Slack integration, driver seams, and event hooks — dominates the merge queue, indicating sustained architectural investment. On the issue side, 4 items were active, including one closed documentation fix and the immediate attention to two task-delivery regressions reported by the same community member. No new releases were cut today, with the project continuing on the 2.1.x line as significant refactoring lands behind feature branches.

## Releases

No new releases were published in the reporting window.

## Project Progress

25 PRs were merged or closed in the last 24 hours, concentrated heavily in the channel-layer initiative:

- **Channels wave A & B ([#3305](https://github.com/nanocoai/nanoclaw/pull/3305), [#3309](https://github.com/nanocoai/nanoclaw/pull/3309))**: Landed the shared Slack Web API client library, canvas action cluster, defaults factory, membership handling, onboarding flows, and an a2a guard — establishing Slack as per-thread everywhere.
- **Adapter session-mode declarations ([#3304](https://github.com/nanocoai/nanoclaw/pull/3304))**: Added optional `sessionMode` to adapter-declared per-context defaults, enabling thread-per-conversation sessions for thread-based platforms.
- **Bridge extension seams**: Merged a series of additive registration hooks — inbound-policy registration ([#3292](https://github.com/nanocoai/nanoclaw/pull/3292)), session-created hook ([#3293](https://github.com/nanocoai/nanoclaw/pull/3293)), post-delivery hook with first-delivery context ([#3294](https://github.com/nanocoai/nanoclaw/pull/3294)), membership-event hook ([#3295](https://github.com/nanocoai/nanoclaw/pull/3295)), and additive MCP tool extension ([#3296](https://github.com/nanocoai/nanoclaw/pull/3296)).
- **Setup wizard extension points ([#3297](https://github.com/nanocoai/nanoclaw/pull/3297))**: Added per-channel pre-steps and companion-skill declarations to the setup wizard, enabling programmatic credential binding.
- **Stability fix**: Restored the slack-formatting container skill that was silently dropped during the upstream-main merge ([#3310](https://github.com/nanocoai/nanoclaw/pull/3310)).

## Community Hot Topics

- **Issue #3301 — *"Tasks firing in chat sessions run one-door: logs dropped, replies eaten, series unlisted"*** ([link](https://github.com/nanocoai/nanoclaw/issues/3301)): Filed by glifocat, this regression from #2988 details how task rows inside chat sessions lose logs, eat replies, and vanish from series. The report is detailed, with zero comments yet, and directly targets behavior introduced in 2.1.48.
- **Issue #3203 — *"codex provider emits an undeclared `file` ProviderEvent"*** ([link](https://github.com/nanocoai/nanoclaw/issues/3203)): Reported by mshirel and active on the providers branch — the `/add-codex` flow fails typechecking and silently drops generated images. One comment suggests it is drawing attention around the codex dependency refresh ([#3299](https://github.com/nanocoai/nanoclaw/pull/3299)).
- **Issue #3289 — *"Bound pending-message polling for accumulated backlogs"*** ([link](https://github.com/nanocoai/nanoclaw/issues/3289)): Performance concern from glifocat, noting `getPendingMessages()` loads every due row into memory, presenting a scalability hazard under backlog accumulation.

## Bugs & Stability

- **High severity — Task rows in chat sessions lose logs, replies, and series listing ([#3301](https://github.com/nanocoai/nanoclaw/issues/3301))**: Introduced in 2.1.48, this regression affects every pre-existing task row on affected installs. Fix exists in PR [#3303](https://github.com/nanocoai/nanoclaw/pull/3303), which preserves run logs for task rows firing in chat sessions.
- **Medium severity — Codex provider events drop generated images ([#3203](https://github.com/nanocoai/nanoclaw/issues/3203))**: Undeclared `file` event fails the container typecheck and items are silently lost. The companion pin bump ([#3299](https://github.com/nanocoai/nanoclaw/pull/3299)) is open but does not address the event contract issue.
- **Medium severity — Unbounded pending-message polling ([#3289](https://github.com/nanocoai/nanoclaw/issues/3289))**: Performance/scale issue tied to backlogged queues. Fix PR [#3291](https://github.com/nanocoai/nanoclaw/pull/3291) proposes bounding the polling.
- **Low severity — Unescaped attachment type in agent-facing XML ([#3300](https://github.com/nanocoai/nanoclaw/pull/3300))**: An open fix from torbenstruever addressing a minor XML escaping gap.
- **Low severity — Root-cause fix found for OneCLI bind address ([#3302](https://github.com/nanocoai/nanoclaw/pull/3302))**: Open PR correcting a default gateway bind address misconfiguration.

## Feature Requests & Roadmap Signals

- **Session-runtime driver seam ([#3306](https://github.com/nanocoai/nanoclaw/pull/3306))**: A new `src/drivers/` abstraction separating session semantics from execution, currently purely additive with Docker as the built-in realization. This suggests future non-Docker runtimes and is the likely spine of the next major version.
- **Session lifecycle through the driver seam ([#3307](https://github.com/nanocoai/nanoclaw/pull/3307))**: Stacked on #3306, routing spawn/adoption/supervision/restart through the seam. The "selection is dormant" note indicates the built-in Docker driver remains active, but the groundwork is laid.
- **Group-over-folder safety refusal ([#3308](https://github.com/nanocoai/nanoclaw/pull/3308))**: Guardrails preventing silent adoption of leftover or operator-placed directories when creating groups.
- **Local web chat channel ([#3298](https://github.com/nanocoai/nanoclaw/pull/3298))**: A loopback-only web chat adapter with a browser UI — a new channel type that could ship in an upcoming increment.
- **Runtime driver selection plus scheduled-task error routing ([#3311](https://github.com/nanocoai/nanoclaw/pull/3311))**: Directs errors from scheduled tasks to the operator instead of copying batch routing fields, correcting a delivery gap.

## User Feedback Summary

- **Regression sensitivity**: glifocat's reports on task-in-chat degradation and polling bounds indicate users are closely tracking 2.1.48 behavior changes, with concrete impact on workflow reliability (lost logs, eaten replies).
- **Install-path friction**: The closed issue [#1143](https://github.com/nanocoai/nanoclaw/issues/1143) notes documentation still references a removed `/data/env` path, a practical onboarding hurdle for skill authors.
- **Merge hygiene**: A contributor flagged a silent loss of a skill file during merge resolution ([#3310](https://github.com/nanocoai/nanoclaw/pull/3310)), which the core team corrected byte-identically — a positive signal for responsiveness, though it underscores merge-review risk in high-velocity cycles.

## Backlog Watch

- **Issue #3203 — Codex provider event contract** ([link](https://github.com/nanocoai/nanoclaw/issues/3203)): Open for nine days with one comment; blocks image generation reliability for Codex-powered agents and intersects with the open pin-bump PR. Given the 2026-08-31 model retirement deadline, this warrants accelerated attention.
- **Issue #3289 — Pending-message polling bound** ([link](https://github.com/nanocoai/nanoclaw/issues/3289)): Filed one day ago with no comments; the fix PR (#3291) is open. Needs maintainer review to avoid prolonged exposure for high-backlog users.
- **Issue #3301 — Task-in-chat regression** ([link](https://github.com/nanocoai/nanoclaw/issues/3301)): Filed the same day with zero comments; fix PR exists. No maintainer response yet, though the core-team PRs around it suggest the fix may be under internal scrutiny.

---
*Data window: 2026-08-17 to 2026-08-18 · Source: GitHub (nanocoai/nanoclaw)*

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

## NullClaw Project Digest — 2026-08-18

### 1. Today's Overview
NullClaw is in a low-activity state with no new issues, releases, or merged pull requests in the last 24 hours. A single dependency bump PR (alpine 3.23 → 3.24 in the docker-images group) remains open, with no review or merge activity since its last update. The project shows a quiet period with zero user-reported issues and no feature development activity. The only ongoing motion is automated dependency management, requiring maintainer attention to clear the backlog. Overall, the project is stable but appears to be in a maintenance-only phase.

### 2. Releases
No new releases were published in the last 24 hours.

### 3. Project Progress
No pull requests were merged or closed in the last 24 hours. No features were advanced, and no fixes were landed during this period.

### 4. Community Hot Topics
There are no active discussions with meaningful comment counts or reactions. The only recent item is [PR #956](https://github.com/nullclaw/nullclaw/pull/956), a Dependabot-generated dependency bump for the Docker base image (`alpine` from 3.23 to 3.24). This PR has been open for over two months (created 2026-06-15) and has received no engagement—indicating either a low-priority dependency or a lack of maintainer bandwidth for routine maintenance.

### 5. Bugs & Stability
No bugs, crashes, or regressions were reported in the last 24 hours. There are no open stability-related issues tracked at this time.

### 6. Feature Requests & Roadmap Signals
No new feature requests were submitted in the last 24 hours. The only signal is the pending base-image upgrade ([PR #956](https://github.com/nullclaw/nullclaw/pull/956)), which suggests an intent to keep the Docker distribution current. No roadmap signals or user-driven feature suggestions are present in the data.

### 7. User Feedback Summary
No user feedback, pain points, or use-case discussions are present in the last 24 hours. There are no open issues or PR comment threads reflecting satisfaction or dissatisfaction.

### 8. Backlog Watch
[PR #956 — ci(deps): bump alpine from 3.23 to 3.24](https://github.com/nullclaw/nullclaw/pull/956) is the sole backlog item. It has been open for 64 days without review or merge. As a routine dependency update, it poses low risk, but the prolonged inactivity suggests a need for maintainers to either merge it or close it to keep the queue clean.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-08-18

## Today's Overview

IronClaw is in an intense development and stabilization phase, with 29 issues and 44 PRs updated in the last 24 hours. The project just cut **ironclaw-v1.3.0-rc.1** (2026-08-17), but a critical boot regression ([#7720](https://github.com/nearai/ironclaw/issues/7720)) was reported against it within hours, indicating the RC is not yet release-ready. Significant engineering effort is split between reducing durable DB write pressure (epic [#7591](https://github.com/nearai/ironclaw/issues/7591)), a broad notification-inbox overhaul ([#7687](https://github.com/nearai/ironclaw/issues/7687)–[#7691](https://github.com/nearai/ironclaw/issues/7691)), and a QA dogfooding sprint (epic [#7685](https://github.com/nearai/ironclaw/issues/7685)) that surfaced multiple UX and authentication gaps. Core contributors are highly active, with 16 PRs merged or closed today.

## Releases

**ironclaw-v1.3.0-rc.1** (2026-08-17) — Release notes are empty. Installation via `curl`/PowerShell scripts is available.

⚠️ **Known regression in this RC:** Upgrading from 1.2.x causes a crash-loop on boot due to an unknown field `activation_state` in the v2 extension installation row ([#7720](https://github.com/nearai/ironclaw/issues/7720)). Migration from 1.2.x is currently **blocked** until a fix ships.

## Project Progress

**Merged/closed PRs (16 total):**
- **fix(slack): address multi-agent review findings on #7682** ([#7710](https://github.com/nearai/ironclaw/pull/7710)) — Hardened the Slack unlinked-user connect-link landing and folded in review findings.
- **fix(release): forward-port 1.2 fixes and thread repair** ([#7663](https://github.com/nearai/ironclaw/pull/7663)) — Windows filesystem/release-smoke reliability, clean Windows JSON output, runtime `curl` healthchecks, and thread-index projection repair.
- **feat(wasm): typed WIT tool response and bundled guest migration** ([#7703](https://github.com/nearai/ironclaw/pull/7703)) — Superseded by [#7711](https://github.com/nearai/ironclaw/pull/7711), which adds the typed tool response, guest migration, and dispatch-error cleanup as the final PR of the capability-response-normalization stack ([#7627](https://github.com/nearai/ironclaw/issues/7627)).

**Closed issues (6 total):**
- **Type the design-system component boundary** ([#7637](https://github.com/nearai/ironclaw/issues/7637)) — Explicit prop types added to shared design-system components.
- **feat(automations): deterministic no-delivery outcome** ([#7647](https://github.com/nearai/ironclaw/issues/7647)) — `[SILENT]`-style suppression contract for scheduled runs.
- **Tier 1 write-pressure fixes** ([#7594](https://github.com/nearai/ironclaw/issues/7594)) — Loop milestone sink routed through `CoalescingEventSink`.
- **Tier 2 write-pressure fixes** ([#7598](https://github.com/nearai/ironclaw/issues/7598)) — Capability invocation-state writes collapsed to gate/terminal edges.
- **Tier 3 write-pressure fixes** ([#7605](https://github.com/nearai/ironclaw/issues/7605)) — Message lookup-index sibling rows folded into message rows.

**Key open feature PRs advancing:**
- **feat: add durable backend suggestions** ([#7694](https://github.com/nearai/ironclaw/pull/7694)) — New product-surface-neutral `suggestions.*` operations with async generation.
- **feat: add native structured output finalization** ([#7693](https://github.com/nearai/ironclaw/pull/7693)) — Provider-neutral immutable output contract for turn/run context.
- **perf(agent-loop): opt-in BeforeModel checkpoint batching** ([#7712](https://github.com/nearai/ironclaw/pull/7712)) — Side-effect-safe batching, gated on prior checkpoint kind.
- **fix(resources): stop libSQL write-lane starvation** ([#7717](https://github.com/nearai/ironclaw/pull/7717)) — Fixes the cascading resource-governor journal stall ([#7714](https://github.com/nearai/ironclaw/issues/7714)).

## Community Hot Topics

- **Issue #7275** (closed, 4 comments): "[Reborn: verify explicit persistent memory recall across conversations in production](https://github.com/nearai/ironclaw/issues/7275)" — User-reported failure of cross-conversation memory, despite existing persistent memory tooling. Closed, but the underlying reliability concern remains a watch item.
- **Issue #7591** (epic, 3 comments): "[Reduce durable DB write pressure ~60% while keeping multi-worker safety](https://github.com/nearai/ironclaw/issues/7591)" — The central performance epic driving 6+ sub-issues and at least 3 open PRs ([#7709](https://github.com/nearai/ironclaw/pull/7709), [#7712](https://github.com/nearai/ironclaw/pull/7712), [#7717](https://github.com/nearai/ironclaw/pull/7717)). The team is actively executing on this roadmap.
- **Issue #7701** (2 comments): "[Collapse resource-governor reserve+reconcile into one post-call spend write](https://github.com/nearai/ironclaw/issues/7701)" — Follow-up gap found after epic creation, indicating the write-pressure audit is thorough and iterative.
- **Issue #3762** (2 comments): "[Editing AGENTS.md in the web UI does not update the system prompt](https://github.com/nearai/ironclaw/issues/3762)" — Long-standing customer-facing bug (since May) with no linked fix PR. This is the oldest open issue in the set and deserves attention.

## Bugs & Stability

Ranked by severity:

1. **Critical — 1.3.0-rc.1 crash-loops on boot after 1.2.x upgrade** ([#7720](https://github.com/nearai/ironclaw/issues/7720)). Process exits 1 during composition; HTTP and SSH ports go dead. **No fix PR yet — blocks all 1.2.x → 1.3.0 upgrades.**
2. **High — libSQL write-lane starvation cascades through resource governor** ([#7714](https://github.com/nearai/ironclaw/issues/7714)). Authority invalidation every ~40s under PinchBench load; permanent reservation leaks; capability calls die with mislabeled errors. **Fix PR exists:** [#7717](https://github.com/nearai/ironclaw/pull/7717).
3. **Medium — Add MCP server flow missing bearer key auth and transport options** ([#7716](https://github.com/nearai/ironclaw/issues/7716)). QA-reported gap in the MCP onboarding flow.
4. **Medium — Telegram connection flow lacks bot/personal-account consent** ([#7715](https://github.com/nearai/ironclaw/issues/7715)). User cannot choose which mode they connect; unclear which is active.
5. **Medium — Obligation audit records never attached in production** ([#7702](https://github.com/nearai/ironclaw/issues/7702)). Violates documented host-api contract; audit records are missing entirely (opposite of a write-pressure problem).
6. **Low — Unbounded shutdown flush and latching pending_flush_error** ([#7705](https://github.com/nearai/ironclaw/issues/7705)). Shutdown can hang on a wedged event backend. Non-blocking findings from PR #7631.
7. **Low — Side-effect-outstanding inferred from checkpoint kind is unsafe** ([#7707](https://github.com/nearai/ironclaw/issues/7707)). Integration test proved the #7603 approach wrong; this issue tracks the correct fix.

## Feature Requests & Roadmap Signals

- **GitHub Projects v2 field manipulation** ([#7719](https://github.com/nearai/ironclaw/issues/7719)) — Core team member requested; blocked updating priority fields despite correct labels. Tool-surface gap; likely to land as a follow-up.
- **Durable user notification inbox** ([#7687](https://github.com/nearai/ironclaw/issues/7687)) — Epic-scale frontend+backend overhaul with 5 sub-issues ([#7688](https://github.com/nearai/ironclaw/issues/7688)–[#7691](https://github.com/nearai/ironclaw/issues/7691)). High signal: this is a designed, multi-PR feature in flight.
- **Slack unlinked-user private connect nudge** ([#7681](https://github.com/nearai/ironclaw/issues/7681)) — UX improvement with fix PR already in review ([#7682](https://github.com/nearai/ironclaw/pull/7682), follow-up [#7710](https://github.com/nearai/ironclaw/pull/7710)).
- **Run-now for automations** ([#7708](https://github.com/nearai/ironclaw/pull/7708)) — Manual-fire path preserving schedules, with WebUI support. Likely in 1.3.0.
- **Durable backend suggestions** ([#7694](https://github.com/nearai/ironclaw/pull/7694)) — Async suggestion generation via the unbounded runner. Likely in 1.3.0.
- **Native structured output finalization** ([#7693](https://github.com/nearai/ironclaw/pull/7693)) — Provider-neutral immutable output contract. Likely in 1.3.0.
- **OOBE automation-tasks prototype** ([#6994](https://github.com/nearai/ironclaw/pull/6994)) — Long-running onboarding workstream, gated behind `oobe_suggestions` flag.
- **ACP serve command** ([#7513](https://github.com/nearai/ironclaw/pull/7513)) — Agent Communication Protocol support for external tools (Copilot CLI, VS Code). Contributor: new.
- **Nostr host functions for WASM tools** ([#7184](https://github.com/nearai/ironclaw/pull/7184)) — Schnorr signing in the sandbox. Contributor: new.

## User Feedback Summary

- **Upgrade pain is immediate:** The 1.3.0-rc.1 boot regression ([#7720](https://github.com/nearai/ironclaw/issues/7720)) will erode trust in the RC if not fixed promptly.
- **QA dogfooding found real UX gaps:** MCP auth ([#7716](https://github.com/nearai/ironclaw/issues/7716)) and Telegram mode selection ([#7715](https://github.com/nearai/ironclaw/issues/7715)) are concrete friction points in the setup flows.
- **Slack users in shared channels get unwanted public exposure** ([#7681](https://github.com/nearai/ironclaw/issues/7681)) when connecting their account — privacy-relevant and actively being addressed.
- **AGENTS.md editing not reflected in system prompts** ([#3762](https://github.com/nearai/ironclaw/issues/3762)) remains unresolved since May — a silent correctness bug for users relying on identity-file edits.
- **Cross-conversation memory recall reliability** ([#7275](https://github.com/nearai/ironclaw/issues/7275)) was closed after verification, suggesting the fix held.
- **Benchmark failures** ([#7704](https://github.com/nearai/ironclaw/issues/7704)) show the largest fixable defect is a storage write-lane contention issue — consistent with the write-pressure epic.

## Backlog Watch

- **[#3762](https://github.com/nearai/ironclaw/issues/3762) — AGENTS.md edits do not update system prompt** (open since 2026-05-18, suggested P1, v1.4.0). Oldest open issue in the set; customer-facing with a clear repro. No linked PR.
- **[#7184](https://github.com/nearai/ironclaw/pull/7184) — Nostr host functions for WASM tools** (open since 2026-08-04). Long-stalled PR from a new contributor. Needs review decision or explicit closure.
- **[#7513](https://github.com/nearai/ironclaw/pull/7513) — ACP serve command** (open since 2026-08-11). Stalled for a week; good external-tooling value.
- **[#7406](https://github.com/nearai/ironclaw/pull/7406) — Dependabot actions group bump** (open since 2026-08-09). Routine dependency updates not yet merged; risk of drift.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI Project Digest - 2026-08-18

## Today's Overview

LobsterAI shows moderate activity today with 7 open issues and 21 PRs updated in the last 24 hours. Development momentum is strong—18 PRs were merged or closed versus only 3 still open, indicating an efficient review pipeline. The project is processing a significant batch of older PRs from April, many of which are being merged now, suggesting a backlog-clearing effort. Notable new work includes DeepSeek Harness (dsh) runtime integration, an OrcaRouter provider addition, and several Electron UX fixes. No new releases were published during this period. Overall, the project appears healthy with steady contributor engagement across both new features and maintenance.

## Releases

No new releases were published in the last 24 hours.

## Project Progress

18 PRs were merged or closed today, spanning several areas:

**New Integrations & Features:**
- [#2506](https://github.com/netease-youdao/LobsterAI/pull/2506) - docs: add DeepSeek Harness (dsh) runtime setup instructions
- [#2505](https://github.com/netease-youdao/LobsterAI/pull/2505) - feat: dsh process launcher
- [#2502](https://github.com/netease-youdao/LobsterAI/pull/2502) - Feat: dsh engine integration (macOS, build, renderer, main)
- [#2504](https://github.com/netease-youdao/LobsterAI/pull/2504) - [OPEN] feat: add OrcaRouter provider integration, mirroring OpenRouter wiring end-to-end
- [#1663](https://github.com/netease-youdao/LobsterAI/pull/1663) - feat(openclaw): upgrade OpenClaw to v2026.4.12, upgrade openclaw-weixin plugin to 2.1.8
- [#1668](https://github.com/netease-youdao/LobsterAI/pull/1668) - feat(agent): per-agent independent working directory configuration with fallback to OpenClaw default

**Electron & UI Improvements:**
- [#2503](https://github.com/netease-youdao/LobsterAI/pull/2503) - fix(electron): add edit context menu (Cut/Copy/Paste/Select All) for text inputs
- [#2501](https://github.com/netease-youdao/LobsterAI/pull/2501) - fix(skills): portal upgrade progress overlay renders through document.body with improved logging
- [#1642](https://github.com/netease-youdao/LobsterAI/pull/1642) - feat: add right-click menu for Windows directory context menu integration

**UX/Cowork Enhancements (batch of April PRs merged):**
- [#1636](https://github.com/netease-youdao/LobsterAI/pull/1636) - feat(cowork): floating "scroll to bottom" button in chat window
- [#1637](https://github.com/netease-youdao/LobsterAI/pull/1637) - feat(cowork): "regenerate" button for AI replies
- [#1639](https://github.com/netease-youdao/LobsterAI/pull/1639) - fix(i18n): internationalize hardcoded English tooltips
- [#1640](https://github.com/netease-youdao/LobsterAI/pull/1640) - feat(tool-result): copy button for tool execution results
- [#1641](https://github.com/netease-youdao/LobsterAI/pull/1641) - feat(modal): all modals support Esc key to close
- [#1675](https://github.com/netease-youdao/LobsterAI/pull/1675) - feat(cowork): group session list by time period (pinned → today → yesterday → 7 days → 30 days → monthly)

**Bug Fixes & Maintenance:**
- [#1661](https://github.com/netease-youdao/LobsterAI/pull/1661) - fix(log): redact sensitive information (API keys, tokens) from exported logs
- [#1667](https://github.com/netease-youdao/LobsterAI/pull/1667) - fix(Settings): migrate Qwen console links from Lingji to Bailian
- [#1669](https://github.com/netease-youdao/LobsterAI/pull/1669) - feat: fix model provider settings UX (test-connection disable logic, custom provider display name)

**Dependencies:**
- [#1277](https://github.com/netease-youdao/LobsterAI/pull/1277) - [OPEN] chore(deps-dev): bump electron group (electron 40.2.1 → 43.4.0, electron-builder)

## Community Hot Topics

- [#2500](https://github.com/netease-youdao/LobsterAI/issues/2500) — **VOKO: Cross-platform instant messaging and group collaboration for AI Agents** (1 comment, created today). An open-source project author is proposing integration for A2A standardization across Agent frameworks and IM channels. Signals growing interest in interoperable agent communication.

- [#1653](https://github.com/netease-youdao/LobsterAI/issues/1653) — **groupPolicy keeps being overwritten to allowlist** (2 comments, stale). User reports group policy being silently overwritten every few minutes—a persistent configuration bug.

- [#1635](https://github.com/netease-youdao/LobsterAI/issues/1635) — **Ollama local models unusable** (1 comment, stale). Local Ollama models (qwen3, gemma4) fail with errors, while the same models work fine in CherryStudio with MCP support. This is a long-standing blocker for local-model users.

- [#1644](https://github.com/netease-youdao/LobsterAI/issues/1644) — **Feature request: MD-based workflow orchestration** (1 comment, stale). User wants the main agent to organize other agents into complex workflows, noting agents currently can't perceive each other's existence. This reflects demand for multi-agent orchestration.

## Bugs & Stability

| Severity | Issue | Description | Fix Status |
|----------|-------|-------------|------------|
| **High** | [#1635](https://github.com/netease-youdao/LobsterAI/issues/1635) | Ollama local models completely unusable; errors on qwen3, gemma4 | No fix PR identified; open since April |
| **Medium** | [#1653](https://github.com/netease-youdao/LobsterAI/issues/1653) | groupPolicy silently overwritten to allowlist periodically | No fix PR identified; open since April |
| **Medium** | [#1662](https://github.com/netease-youdao/LobsterAI/issues/1662) | Only SSE-based MCP engines work; other MCP engines not found/usable | No fix PR identified; open since April |
| **Low** | [#1643](https://github.com/netease-youdao/LobsterAI/issues/1643) | Manual scheduled task save shows "unsaved content" error — but save succeeds | No fix PR identified |
| **Low** | [#1671](https://github.com/netease-youdao/LobsterAI/issues/1671) | MD-to-Word conversion gets cut off with "sse response finish reason: full" | No fix PR identified |

Note: Today's merged PRs included **log redaction** ([#1661](https://github.com/netease-youdao/LobsterAI/pull/1661)) and **Electron context menu** ([#2503](https://github.com/netease-youdao/LobsterAI/pull/2503)), but no fixes targeting the reported open bugs above.

## Feature Requests & Roadmap Signals

- **Agent interoperability**: Both the VOKO proposal ([#2500](https://github.com/netease-youdao/LobsterAI/issues/2500)) and the MD-based workflow request ([#1644](https://github.com/netease-youdao/LobsterAI/issues/1644)) point to growing demand for agents that can discover, communicate with, and orchestrate each other. The recently merged per-agent working directory PR ([#1668](https://github.com/netease-youdao/LobsterAI/pull/1668)) partially addresses agent isolation but not inter-agent communication.

- **Provider ecosystem expansion**: The OrcaRouter integration PR ([#2504](https://github.com/netease-youdao/LobsterAI/pull/2504)) shows active work on expanding LLM gateway support, continuing the pattern of OpenRouter-style integrations.

- **DeepSeek Harness (dsh) integration**: Multiple merged PRs today ([#2502](https://github.com/netease-youdao/LobsterAI/pull/2502), [#2505](https://github.com/netease-youdao/LobsterAI/pull/2505), [#2506](https://github.com/netease-youdao/LobsterAI/pull/2506)) suggest the dsh engine is a strategic addition for the next release.

## User Feedback Summary

- **Local model support is a pain point**: The Ollama issue ([#1635](https://github.com/netease-youdao/LobsterAI/issues/1635)) has persisted for 4 months, and users note that competing clients (CherryStudio) handle the same models and MCP without issues.

- **Configuration reliability concerns**: The groupPolicy overwrite issue ([#1653](https://github.com/netease-youdao/LobsterAI/issues/1653)) suggests silent config mutation is eroding trust in configuration persistence.

- **Satisfaction signals**: The batch of UX PRs merged today (scroll-to-bottom, regenerate buttons, Esc-to-close, copy buttons, i18n fixes) address long-standing usability feedback and were well-scoped, indicating contributor responsiveness to community needs.

- **Multi-agent orchestration desired**: Users want hierarchical agent management with workflow definition capabilities ([#1644](https://github.com/netease-youdao/LobsterAI/issues/1644)), which is currently missing from the product.

## Backlog Watch

The following items are stale (created April, last touched April or earlier) and deserve maintainer attention:

- [#1635](https://github.com/netease-youdao/LobsterAI/issues/1635) — **Ollama local models unusable** (open ~4 months, 1 comment): high-impact bug for local-model users with no maintainer response.
- [#1653](https://github.com/netease-youdao/LobsterAI/issues/1653) — **groupPolicy silently overwritten** (open ~4 months, 2 comments): configuration integrity bug.
- [#1662](https://github.com/netease-youdao/LobsterAI/issues/1662) — **Only SSE MCP engines work** (open ~4 months): MCP compatibility gap.
- [#1671](https://github.com/netease-youdao/LobsterAI/issues/1671) — **MD-to-Word truncation error** (open ~4 months): document conversion reliability.
- [#1643](https://github.com/netease-youdao/LobsterAI/issues/1643) — **Scheduled task save false error** (open ~4 months): minor UX bug with confusing messaging.
- [#1644](https://github.com/netease-youdao/LobsterAI/issues/1644) — **Feature: MD-based workflow orchestration** (open ~4 months): roadmap-relevant feature request.
- [#1660](https://github.com/netease-youdao/LobsterAI/pull/1660) — **PR: non-main agent welcome area shows agent name/description** (open since April, no recent comments): an unimplemented UX improvement that could be merged or closed.
- [#1277](https://github.com/netease-youdao/LobsterAI/pull/1277) — **Dependabot: electron group bump** (open since April): an in-progress dependency upgrade with review pending.

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

## Today's Overview

Moltis shows moderate activity today with 9 pull requests touched and 3 issues updated. The project is in a healthy maintenance rhythm: two long-running features merged this week (external agent model/effort selection and shadow DOM piercing for browser automation), one security-adjacent dependency batch landed, and the team closed the WebUI RPC timeout feature request. The format CI gate failure was resolved with a merged fix. Three PRs remain open — two heartbeat correctness fixes from Lstarsky0 and a larger Files library + Settings browser feature from penso — suggesting active feature development alongside bug fixing. The project is handling technical debt and user-facing features concurrently, with no release cut in the last 24 hours.

## Releases

No new releases were published in the last 24 hours.

## Project Progress

Six pull requests were merged or closed in the last 24 hours:

- **[PR #1125 — Support model and effort selection for external agents](https://github.com/moltis-org/moltis/pull/1125)** (merged): Adds first-class `models = [...]` and `efforts = [...]` config for external-agent providers, exposed in `/model` grouped under `external-agent/<kind>`, with persisted metadata. This closes a long-standing capability gap for external agent tuning.
- **[PR #1103 — Fix(browser): pierce shadow DOM lookups efficiently](https://github.com/moltis-org/moltis/pull/1103)** (merged): Browser snapshot and ref-based lookup paths now pierce shadow DOM efficiently — an important fix for automating modern web apps that rely on web components.
- **[PR #1204 — Feat: add MiniMax Code ACP agent](https://github.com/moltis-org/moltis/pull/1204)** (merged): Adds `acp-minimax-code` external-agent kind backed by `mcode acp`, with default executable detection, agent registry inclusion, docs, and config validation updates.
- **[PR #1130 — Feat: make webui rpc timeout configurable](https://github.com/moltis-org/moltis/pull/1130)** (merged): Fixes issue #1127 — the WebUI RPC timeout is now configurable.
- **[PR #1207 — Chore(deps): bump cargo group with 4 updates](https://github.com/moltis-org/moltis/pull/1207)** (merged): Updates `wasmtime-wasi`, `cmov`, `quinn-proto`, and `serde_with`.
- **[PR #1087 — Chore(deps): bump tar from 0.4.45 to 0.4.46](https://github.com/moltis-org/moltis/pull/1087)** (merged): Minor dependency bump in the cargo group.

## Community Hot Topics

The most active item today is **[Issue #1095 — Podman is not working via Moltis](https://github.com/moltis-org/moltis/issues/1095)**, open since June 3rd with 2 comments and no reactions. Despite being two months old, it remains the only open bug report being actively discussed. The low comment count relative to the issue's age suggests either a niche use case or a hard-to-reproduce problem — but the fact it's still open and being updated today means maintainers have not dismissed it. The underlying need is container-runtime parity: Moltis supports Docker well, and users expect Podman to work as a drop-in replacement.

The merged **[PR #1125](https://github.com/moltis-org/moltis/pull/1125)** for external agent model/effort selection and the long-lived **[PR #1103](https://github.com/moltis-org/moltis/pull/1103)** for shadow DOM piercing both took over two months from creation to merge, indicating they were substantive, review-heavy changes. Their closure signals the maintainers are working through a deep backlog of quality-of-life improvements.

## Bugs & Stability

**[Issue #1202 — Format CI gate is red on main: two files over the 1500-line limit](https://github.com/moltis-org/moltis/issues/1202)** (closed) — Reported and fixed today. `scripts/check-file-size.sh` failed on `main` due to two files exceeding the 1500-line limit, both introduced in commit `9b47001a`: `crates/memory-zvec/src/store.rs` (1799 lines) and `crates/gateway/src/methods/services/admin.rs` (1531 lines). This is a code organization concern rather than a runtime crash — large files are a maintainability smell — but it also means a recent change merged with oversized files. The quick fix indicates the team treats CI health as a priority.

**[Issue #1095 — Podman is not working via Moltis](https://github.com/moltis-org/moltis/issues/1095)** (open) — The only genuine runtime bug in today's data. The report is two months old with only 2 comments, so severity is unclear. There is no linked fix PR, so this may be an environment-specific integration issue. Ranked medium severity: it breaks a supported workflow for users, but there is no indication of data loss or crashes.

No regressions were reported today.

## Feature Requests & Roadmap Signals

Two feature requests saw movement this week:

- **[PR #1206 — Add managed Files library and Settings browser](https://github.com/moltis-org/moltis/pull/1206)** (open) — This is the most significant roadmap signal: a persistent, data-directory-backed Files library with authenticated streamed list/upload/download/create/move/delete APIs, a Finder-style Settings browser, `MOLTIS_FILES_DIR` discovery, and read-only-by-default mounts for Docker, Podman, and Apple Containers. This is a large feature touching state, APIs, and multi-runtime container mounting. If merged, it gives Moltis a built-in managed file system and a first-party settings UI.
- **[PR #1208 — Fix(cron): honor heartbeat active hours when the scheduler fires](https://github.com/moltis-org/moltis/pull/1208)** (open) — Fixes the `heartbeat.active_hours` feature having no effect, catching a silent functional gap in an existing shipping feature.

The MiniMax Code ACP agent merge also signals continued investment in external agent support — the maintainers are positioning Moltis as an aggregator across competing agent ecosystems.

## User Feedback Summary

- **Podman incompatibility** (Issue #1095): A user reports they cannot run Moltis with Podman. The issue has seen little discussion, which might mean few others are hitting it, but the user's workflow is blocked.
- **WebUI RPC timeout**: User `khimaros` requested configurable RPC timeout (Issue #1127), and it was delivered via PR #1130. This is a positive signal: a niche but legitimate configuration need was heard and shipped.
- **Heartbeat scheduling**: PR #1208 reveals `active_hours` silently did nothing, meaning users who configured it believed their heartbeats were suppressed during off-hours when they were not. This is a trust-eroding silent failure — though no user has filed it as a bug, the fix PR exists, indicating the maintainers are proactively correcting it.
- **Editor-driven workflow**: The shadow DOM fix (PR #1103) and external agent model/effort selection (PR #1125) directly affect daily agent usage, and both are now merged — a net positive for user experience.

## Backlog Watch

- **[Issue #1095 — Podman is not working via Moltis](https://github.com/moltis-org/moltis/issues/1095)** (open since June 3, 2026) — This is the only open bug in the last 24h, updated today. It has not been labeled or explicitly triaged in the visible data. With no linked PR after two months, it risks becoming a stale bug. Maintainers should either reproduce it, add a `needs-repro` label, or request more environment details.

No other issues or PRs in the recent window show signs of being long-neglected, which suggests healthy issue triage overall.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw Project Digest — 2026-08-18

## 1. Today's Overview

CoPaw showed elevated activity over the past 24 hours with 33 PRs updated (20 merged/closed) and 13 issues touched (5 closed), indicating a steady maintenance and feature cadence. No new releases were published — the project remains on v2.1.0, with the bulk of activity focused on bug fixes, community contributions, and integrations. Notable trends: multiple first-time contributors landed PRs (AnySearch integration, PowerContext memory, language unification), and several v2.1.0-specific regressions were reported, mostly around MCP tool naming, media handling, and plugin hooks. The maintainer team appears responsive: many recently reported bugs already have fix PRs open or merged. The project is in a healthy, actively-maintained state with meaningful community engagement.

## 2. Releases

No new releases in this window. The project remains on v2.1.0 (with users reporting v2.0.0post3 docker images in the wild).

## 3. Project Progress

Merged/closed PRs this window demonstrate coordinated polish across Console UI, data handling, and PawaApp experiences:

- **AnySearch web search integration** ([#6817](https://github.com/agentscope-ai/QwenPaw/pull/6817), merged) — pluggable `web_search` backend with built-in MCP client, replacing Tavily; includes MCP env-ref header binding fixes.
- **DataPaw native app + durable workspace** ([#6940](https://github.com/agentscope-ai/QwenPaw/pull/6940), merged) — adds native DataPaw runtime with persistent analysis workspace; companion CI pipeline PR ([#7089](https://github.com/agentscope-ai/QwenPaw/pull/7089)) follows up to give datapaw its own version-driven release pipeline.
- **Console improvements**: media download controls ([#7036](https://github.com/agentscope-ai/QwenPaw/pull/7036)), compact background-task list with scroll hint ([#7083](https://github.com/agentscope-ai/QwenPaw/pull/7083)), context-usage ring refresh after `/compact` ([#6975](https://github.com/agentscope-ai/QwenPaw/pull/6975)), removal of `/approve`/`/deny` hints from i18n placeholders ([#6981](https://github.com/agentscope-ai/QwenPaw/pull/6981)).
- **Token accounting fix**: image base64 no longer counted as text tokens, preventing false context-full warnings ([#6968](https://github.com/agentscope-ai/QwenPaw/pull/6968)).
- **PawApp UX**: newly installed PawApps now open without manual page reload ([#7017](https://github.com/agentscope-ai/QwenPaw/pull/7017)).
- **GitPanel styles**: fixed incorrect `ant-` CSS prefix that broke tabs styling ([#5151](https://github.com/agentscope-ai/QwenPaw/pull/5151)), a long-running issue closed after ~2 months.

Open PRs still in flight: catalog-driven provider system with capability-aware routing ([#6302](https://github.com/agentscope-ai/QwenPaw/pull/6302)), session-scoped multi project directories ([#6976](https://github.com/agentscope-ai/QwenPaw/pull/6976)), persistent workspace artifact cards ([#6719](https://github.com/agentscope-ai/QwenPaw/pull/6719)), Volcengine + Xiaomi MiMo built-in providers ([#6515](https://github.com/agentscope-ai/QwenPaw/pull/6515)), and antivirus-blocking fixes for the sandbox ([#6986](https://github.com/agentscope-ai/QwenPaw/pull/6986)).

## 4. Community Hot Topics

Most active discussions this window, ranked by engagement:

- **[Issue #6405](https://github.com/agentscope-ai/QwenPaw/issues/6405) "MCP tool always says Tool not found after 2.0 upgrade"** (7 comments, closed) — Chinese-language report; tool names renamed to `[mcp-key]__[tool_name]` but resolution fails in v2.0.0post3 docker. Points to possible MCP naming/registration regressions post-upgrade.
- **[Issue #7011](https://github.com/agentscope-ai/QwenPaw/issues/7011) "Console stop request cancels active Feishu session under multiple UI sessions"** (6 comments, open) — safety-critical session identity bug; cross-session identity leakage allows one UI session's stop to kill another's active Feishu conversation. Author updated with fresh incident evidence; still unresolved.
- **[Issue #6925](https://github.com/agentscope-ai/QwenPaw/issues/6925) "Agent collaboration in a single conversation window"** (3 comments, open) — feature request; users find forced per-collaboration session creation and manual switching disruptive. Indicates UX friction in multi-agent workflows.
- **[Issue #7085](https://github.com/agentscope-ai/QwenPaw/issues/7085) "Per-channel independent model configuration"** (3 comments, open) — need for model isolation across DingTalk/WeChat/Console channels; current global `active_model` scope forces channel-wide changes.

## 5. Bugs & Stability

Bugs reported in the last 24h, ranked by severity:

1. **Agent tool-call crash (severity: critical, fixed)** — [#7063](https://github.com/agentscope-ai/QwenPaw/issues/7063): `TypeError: 'async for' requires coroutine` in `_execute_tool_call`; agentscope returns coroutine where async generator expected. Crash is consistent (必现). Closed as invalid — likely user-side version mismatch, but warrants verification.
2. **Pydantic dynamic class error blocking console startup (severity: high, open)** — [#7082](https://github.com/agentscope-ai/QwenPaw/issues/7082): `_StructuredOutputDynamicClass is not fully defined` during agent/toolkit init; MODEL_EXECUTION_ERROR in console channel. No fix PR yet.
3. **QQ image URL expiry poisoning sessions (severity: high, fixed)** — [#7088](https://github.com/agentscope-ai/QwenPaw/issues/7088): OneBot v11 passes short-lived signed QQ image URLs to LLM API; 2h expiry causes HTTP 400 and stale URLs poison every subsequent reply. Closed — mitigation likely URL localization (see PR #7087).
4. **Plugin runtime hooks lost after workspace reload (severity: medium, fixed)** — [#7077](https://github.com/agentscope-ai/QwenPaw/issues/7077): `register_runtime_hook()`/`register_skill_provider()` callbacks lost when workspace replaced during reload after hot-install. Closed.
5. **Image attachments lost on session reload (severity: medium, fixed)** — [#7051](https://github.com/agentscope-ai/QwenPaw/issues/7051): Console shows broken thumbnails after reopen; backend serves data URL but frontend fails to render.
6. **Historical conversation unclickable with single history entry (severity: low, open)** — [#7084](https://github.com/agentscope-ai/QwenPaw/issues/7084): clicking a single prior conversation does nothing until a second conversation exists.

## 6. Feature Requests & Roadmap Signals

- **Per-channel model isolation** ([#7085](https://github.com/agentscope-ai/QwenPaw/issues/7085)): DingTalk/WeChat/console channels need independent model configuration — likely candidate for a future provider-routing release, especially given the catalog-driven provider system in PR [#6302](https://github.com/agentscope-ai/QwenPaw/pull/6302) aims to unify model routing.
- **Single-window agent collaboration** ([#6925](https://github.com/agentscope-ai/QwenPaw/issues/6925)): users want inter-agent conversations contained in one session with no manual switching.
- **Scheduled task run details** ([#7075](https://github.com/agentscope-ai/QwenPaw/issues/7075)): users request start time, duration, end time, and result for each scheduled-task execution (not just failure alerts).
- **PowerContext long-term memory backend** ([#7079](https://github.com/agentscope-ai/QwenPaw/issues/7079), PR [#7080](https://github.com/agentscope-ai/QwenPaw/pull/7080) open): pluggable memory extension via existing `BaseMemoryManager` and `@memory_registry` — aligns with the abstraction-driven architecture.
- **qwenpaw-creator 404 on model config** ([#7076](https://github.com/agentscope-ai/QwenPaw/issues/7076)): configuration endpoint returning 404 in v2.1.0; likely an endpoint regression, needs triage.

## 7. User Feedback Summary

- **Upgrade friction is real**: v2.0→2.1 upgrades continue surfacing MCP tool-not-found behavior ([#6405](https://github.com/agentscope-ai/QwenPaw/issues/6405)), a pattern suggesting migration documentation gaps. Users are on different versions (`2.0.0post3` docker vs `2.1.0`) and hitting inconsistencies.
- **Session/media reliability concerns**: multiple reports of broken image thumbnails ([#7051](https://github.com/agentscope-ai/QwenPaw/issues/7051)), poisoned sessions from stale media URLs ([#7088](https://github.com/agentscope-ai/QwenPaw/issues/7088)), and session identity leakage across UIs ([#7011](https://github.com/agentscope-ai/QwenPaw/issues/7011)) — recurring thread of memory/session-state management as a top pain point.
- **Configuration granularity demand**: users want per-channel and per-agent control surfaces (models, memory) rather than global settings — evidence of growing production usage with mixed workloads.
- **Chinese-speaking users are a substantial cohort** (at least 8 of 13 issues are in Chinese); bilingual issue handling seems functional but may be a support bottleneck for triage speed.

## 8. Backlog Watch

- **[PR #6302](https://github.com/agentscope-ai/QwenPaw/pull/6302) "Unify provider discovery, model metadata, routing, and agent controls"** — open since 2026-07-21, ~4 weeks without merge. This is the largest architectural change in flight; it directly addresses per-channel routing, fallback behavior, and model selection UX. Stale risk is moderate — worth checking for review blockers.
- **[PR #6515](https://github.com/agentscope-ai/QwenPaw/pull/6515) "Volcengine Agent Plan and Xiaomi MiMo V2.5 API"** — open since 2026-07-28; two new built-in providers pending. Low complexity, likely blocked by the broader provider unification ([#6302](https://github.com/agentscope-ai/QwenPaw/pull/6302)) to avoid conflicting metadata formats.
- **[Issue #7011](https://github.com/agentscope-ai/QwenPaw/issues/7011) cross-session cancellation bug** — confirmed with new evidence on 08-14, still unresolved. Given it can abruptly terminate active IM sessions, this deserves elevated triage. No linked fix PR yet.
- **[PR #5151](https://github.com/agentscope-ai/QwenPaw/pull/5151) GitPanel tab style fix** — took ~2 months from June to merge; signals possible PR review latency for some areas, though recent activity shows improved velocity.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

**EasyClaw Project Digest – 2026-08-18**

**1. Today's Overview**
Project activity is minimal, with zero Issues or Pull Requests updated in the last 24 hours. A single new release, v1.8.100, was published, indicating active maintenance despite the quiet community channels. No new bug reports or feature requests were submitted today. The project remains stable with a focus on expanding partnership and affiliate tooling rather than addressing reported defects.

**2. Releases**
- **[v1.8.100 – TK Copilot](https://github.com/gaoyangz77/easyclaw/releases)** (Published 2026-08-18)
  - **Changes:** Expands affiliate collaboration workflows and introduces the ability to bind outreach devices to Business Developers. Includes improvements to bundled Desktop plugin support.
  - **Breaking Changes:** None identified in the release notes.
  - **Migration Notes:** None specified; standard update procedures apply.

**3. Project Progress**
No Pull Requests were merged or closed in the last 24 hours. No feature-specific code changes were merged to the main branch during this period.

**4. Community Hot Topics**
No Issues or PRs were active with comments or reactions within the last 24 hours. There are currently no publicly tracked community discussions requiring analysis.

**5. Bugs & Stability**
No bugs, crashes, or regressions were reported today. The release of v1.8.100 addresses plugin support improvements, which may implicitly fix undisclosed desktop integration issues; however, no tracked GitHub issues correspond to this change.

**6. Feature Requests & Roadmap Signals**
No new feature requests were submitted. The release of v1.8.100 signals a roadmap focus on enhancing partnership ecosystems and device management capabilities. It is likely that future versions will continue to refine the Business Developer outreach workflow and expand compatibility for bundled plugins.

**7. User Feedback Summary**
No direct user feedback is available for this period. The sole feedback loop is the release notes, which do not document user-reported pain points. Given the low issue volume, user satisfaction appears latent, with no overt dissatisfaction expressed publicly today.

**8. Backlog Watch**
No long-unanswered Issues or PRs are awaiting maintainer attention. The issue and PR trackers are empty, indicating a fully processed backlog.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar).*