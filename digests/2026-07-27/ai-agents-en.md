# OpenClaw Ecosystem Digest 2026-07-27

> Issues: 352 | PRs: 500 | Projects covered: 13 | Generated: 2026-07-27 03:33 UTC

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

# OpenClaw Project Digest — 2026-07-27

## Today’s Overview

OpenClaw saw very high activity over the past 24 hours, with **352 issues** and **500 PRs** updated. Of those, **241 issues remain open** and **111 were closed**, while **348 PRs were merged or closed** and **152 remain open**. No new releases were published today, indicating the project is deep in a bug-fix and feature iteration phase. The community remains engaged on long-standing cross-platform support requests, and maintainers are actively processing a large backlog of session-state and message-loss regressions. Despite the churn, the project shows healthy development velocity with many fixes and small features advancing.

## Releases

No new releases today.

## Project Progress

**348 pull requests were merged or closed** in the last 24 hours, signaling sustained development throughput. Notable merged/closed PRs from the top 30 list include:

- **#105806** – `fix(recovery): reclaim terminal-phase reply operations in stuck-session recovery` (merged)  
- **#114247** – `refactor(meetings): close manual action state` (merged)  
- **#92760** – `CLI openclaw status shows 200K context window due to standalone resolution copy` (closed)  
- **#113474** – Gateway crash loop on Raspberry Pi 5 (closed issue, fix likely merged)

Many other PRs are in review or awaiting proof, including a large refactor to retire `TOOLS.md` into an `AGENTS.md` section (#113966) and a fix for model‑list loading after API‑key onboarding (#114258).

## Community Hot Topics

The most active discussions reflect persistent user pain points around cross‑platform availability and session reliability.

- **#75 [Linux/Windows Clawdbot Apps]** (115 comments, 80 👍)  
  Long‑running feature request for desktop apps on Linux and Windows, matching the existing macOS and mobile coverage. Strong community demand for years.  
  [Issue #75](https://github.com/openclaw/openclaw/issues/75)

- **#99241 [Tool outputs render as image attachments, unreadable to agent]** (24 comments, 2 👍)  
  P1 bug affecting long‑running / ANSI‑heavy workflows where tool results collapse into image placeholders, breaking agent context.  
  [Issue #99241](https://github.com/openclaw/openclaw/issues/99241)

- **#102020 [Second message fails with “reply session initialization conflicted”]** (15 comments, 1 👍)  
  Cross‑channel bug (Signal, etc.) that blocks multi‑turn conversations.  
  [Issue #102020](https://github.com/openclaw/openclaw/issues/102020)

- **#86519 [Agent repeats identical replies 2‑10x on Telegram after 5.20 update]** (13 comments, 1 👍)  
  Regression causing duplicate message delivery, partially mitigated but not fully fixed.  
  [Issue #86519](https://github.com/openclaw/openclaw/issues/86519)

- **#6615 [Add denylist support for exec‑approvals]** (9 comments, 8 👍)  
  Feature request for “allow everything except X” security policies, popular among power users.  
  [Issue #6615](https://github.com/openclaw/openclaw/issues/6615)

## Bugs & Stability

The most severe active bugs primarily involve session state corruption, message loss, and crash loops. Several have fix PRs in review.

| Priority | Issue | Summary | Fix PR Exists? |
|----------|-------|---------|----------------|
| **P0** | #90378 | Cron store migration to SQLite silently breaks job delivery.mode – `announce` causes channel errors | Linked PR open |
| **P1** | #113434 | Codex sessions.reset reuses retired session ID; catalog scans exhaust RAM (2026.7.2‑beta.4) | No fix PR yet |
| **P1** | #112423 | Large SQLite transcript cleanup blocks gateway event loop | No fix PR yet |
| **P1** | #108473 | `cron` tool schema with unanchored regex breaks llama.cpp tool‑calling (regression) | No fix PR yet |
| **P1** | #99241 | Tool outputs rendered as image attachments – agent cannot read stdout/stderr | No fix PR yet |
| **P1** | #102020 | Second message fails with “reply session initialization conflicted” | No fix PR yet |
| **P1** | #86519 | Agent sends duplicate replies on Telegram (regression, partially fixed) | No full fix PR |
| **P1** | #86996 | Active Memory + Codex app‑server causes long latency, hook timeouts, crash loops | No fix PR yet |
| **P1** | #92043 | 180s compaction timeout is a single wall clock; legitimate long compactions fail every turn | No fix PR yet |
| **P1** | #85251 | Codex app‑server goes silent after `notification:turn/started` – session wedges | No fix PR yet |
| **P1** | #111519 | Telegram DM replies fall back after stale DM‑scope cleanup (regression in beta.3) | No fix PR yet |
| **P2** | #67419 | Bootstrap files re‑injected every turn wasting 20‑30% tokens | No fix PR yet |

Several bugs have associated PRs (e.g., #113315 has linked PR #? not shown, but labels indicate `linked-pr-open`). The project appears to be prioritizing stability, with many P1 bugs filed in the last two months still awaiting resolution.

## Feature Requests & Roadmap Signals

Community‑requested features that are likely to shape future releases:

- **#75 – Linux/Windows Clawdbot Apps** – High demand, but no active PR; may remain in backlog until maintainer capacity increases.  
- **#6615 – Exec‑approval denylist** – Popular security enhancement; linked PR open? (not shown).  
- **#11665 – Webhook multi‑turn support** – Bug report with feature aspect; `sessionKey` reuse not implemented as documented.  
- **#42026 – Distributed Agent Runtime** – RFC to split control plane from agent compute; could become a major architectural change.  
- **#67413 – Per‑agent dreaming configuration** – Allows independent memory‑core scheduling to avoid OOM.  
- **#15032 – Per‑spawn tool restrictions for sub‑agents** – PR #78441 is an active attempt to address this.  
- **#38520 – Pre‑compaction notification and deferral** – Proposal to make context compaction safer for long workflows.

Based on PR activity, **#15032** (per‑spawn tool restrictions via PR #78441) and **#11665** (webhook multi‑turn) have active implementations and may land in the next minor release.

## User Feedback Summary

Real user pain points from today’s issues include:

- **Cross‑platform gaps** – Users on Linux/Windows cannot use native OpenClaw apps, relying on terminal or web UI only.  
- **Session reliability** – Repeated identical replies, silent message drops, and “session initialization conflicted” errors degrade trust in the assistant.  
- **Memory and context management** – Tool output readability, context bloat from bootstrap files, and compaction timeouts frustrate power users.  
- **Integration friction** – Telegram quote/reply support requires runtime patching; WhatsApp sticker sending is missing; LINE size caps cause silent failures.  
- **Upgrade regressions** – Several users report that updates (e.g., 5.20, 6.1, 7.2‑beta.3) introduce new bugs without clear migration paths.

Overall satisfaction remains mixed – the project is feature‑rich but stability regressions are a recurring theme.

## Backlog Watch

Several important issues and PRs have been waiting for maintainer action for weeks or months:

- **#75** (Linux/Windows apps) – Created 2026‑01‑01, 115 comments, 80 👍 – needs product decision and maintainer review.  
- **#99241** (tool output readability) – Created 2026‑07‑02, P1 – needs live repro and product decision.  
- **#102020** (session initiation conflict) – Created 2026‑07‑08, P1 – needs maintainer review and info.  
- **#86519** (duplicate replies) – Created 2026‑05‑25, P1 – needs maintainer review and product decision.  
- **#86996** (Active Memory + Codex latency) – Created 2026‑05‑26, P1 – needs maintainer review and product decision.  
- **#90378** (cron migration silent breakage) – Created 2026‑06‑04, P0 – needs maintainer review and product decision.  
- **PR #78441** (per‑spawn tool restrictions) – Created 2026‑05‑06 – needs proof and maintainer look.  
- **PR #82572** (persist followup queues across restarts) – Created 2026‑05‑16 – needs proof.  
- **PR #100886** (SenseAudio web_search provider) – Created 2026‑07‑06 – waiting on author after review.

Maintainers are encouraged to prioritize these items to unblock community contributions and restore user confidence.

---

## Cross-Ecosystem Comparison

# Cross-Project Ecosystem Comparison Report
**Date:** 2026-07-27  
**Scope:** 13 open-source AI agent / personal assistant projects

---

## 1. Ecosystem Overview

The personal AI agent open-source ecosystem is experiencing **divergent maturity trajectories**, with a clear split between high-velocity core platforms (OpenClaw, NanoBot, CoPaw) and stalled or low-activity satellite projects. The landscape is dominated by **stability and security hardening** across active projects, with session reliability, credential management, and cross-platform support emerging as universal pain points. A notable trend is the **convergence on MCP (Model Context Protocol)** as a core integration standard, while simultaneously revealing fragmentation in transport implementations. The ecosystem is shifting from "feature velocity" to "production readiness," as evidenced by the high volume of bug-fix PRs and security patches across all major projects. However, the gap between flagship and niche projects is widening, suggesting consolidation pressure in the coming quarters.

---

## 2. Activity Comparison

| Project | Issues (Open/Total Updated) | PRs (Merged/Total Updated) | Release Today | Health Score | Trend |
|---------|---------------------------|---------------------------|---------------|--------------|-------|
| **OpenClaw** | 241 open / 352 updated | 348 merged / 500 updated | ❌ | **B** (Active, high backlog) | Rapid iteration, stability regressions |
| **NanoBot** | 2 open / 10 updated | 27 merged / 33 updated | ❌ | **A-** (Healthy, fast fixes) | Focused stabilization sprint |
| **ZeroClaw** | ~48 open / 50 updated | 2 merged / 50 updated | ❌ | **C** (High risk, many blockers) | Intense stabilization before v0.8.4 |
| **PicoClaw** | 3 open / 4 updated | 1 merged / 7 updated | ❌ | **B-** (Moderate, slow review) | Targeted fixes, contributor-driven |
| **NanoClaw** | 2 open / 2 new | 2 merged / 8 updated | ❌ | **B** (Active patch cycle) | Fixing migration regressions |
| **NullClaw** | 1 open / 1 updated | 0 merged / 0 updated | ❌ | **D** (Stalled, critical crash) | Maintainer bottleneck |
| **IronClaw** | 5 open / 5 updated | 6 merged / 19 updated | ❌ | **A** (Strong, systematic) | Architecture-focused development |
| **LobsterAI** | 2 open / 2 updated | 0 merged / 8 updated | ❌ | **C-** (Stalled, stale PRs) | Potential maintainer pause |
| **Moltis** | 0 new / 0 updated | 0 merged / 7 updated | ❌ | **B** (Quiet but progressing) | Integration expansion |
| **CoPaw** | ~16 open / 22 updated | 6 merged / 20 updated | ❌ | **B+** (High engagement, bugs) | Post-v2.0 stabilization surge |
| **TinyClaw** | – | – | – | **Inactive** | No activity |
| **ZeptoClaw** | – | – | – | **Inactive** | No activity |
| **EasyClaw** | – | – | – | **Inactive** | No activity |

**Health Score Key:** A = Strong, B = Good, C = Concerning, D = Critical, Inactive = No recent activity

---

## 3. OpenClaw's Position

**Advantages vs. Peers:**
- **Scale and velocity:** With 500 PRs updated in 24 hours, OpenClaw operates at 10–25x the activity level of any peer. This reflects both a massive contributor base and a complex codebase requiring constant maintenance.
- **Ecosystem centrality:** As the core reference implementation, OpenClaw defines the architectural patterns (session model, tool interface, memory management) that projects like NanoBot, ZeroClaw, and PicoClaw inherit or adapt.
- **Community size:** Issue engagement metrics (115 comments on #75, 80 👍) indicate a user base orders of magnitude larger than niche projects.

**Technical Approach Differences:**
- OpenClaw employs a **monolithic reference architecture** with extensive plugin/extension surfaces, while NanoBot and IronClaw favor **modular, composable designs** (NanoBot's extension platform PR #5098, IronClaw's composition refactor #6691).
- OpenClaw's **session-state model** is more complex but more feature-rich than simpler alternatives (NullClaw, PicoClaw), which trade capability for reliability.
- OpenClaw's **backlog of 241 open issues** vs. NanoBot's 2 creates a different contributor experience: OpenClaw offers more entry points but also more risk of overlooked contributions.

**Community Size Comparison:**
- **Tier 1 (Massive):** OpenClaw
- **Tier 2 (Large):** CoPaw, ZeroClaw
- **Tier 3 (Medium):** NanoBot, IronClaw, PicoClaw, NanoClaw
- **Tier 4 (Small):** NullClaw, LobsterAI, Moltis
- **Tier 5 (Inactive):** TinyClaw, ZeptoClaw, EasyClaw

**Risk:** OpenClaw's high bug count (241 open) relative to output suggests potential **technical debt accumulation** that could slow future velocity.

---

## 4. Shared Technical Focus Areas

The following requirements emerge across multiple projects, indicating ecosystem-wide pain points:

| Focus Area | Affected Projects | Specific Needs |
|------------|------------------|----------------|
| **Session Reliability** | OpenClaw, NanoBot, ZeroClaw, NanoClaw, NullClaw | Duplicate replies, silent message drops, session initialization conflicts, crash loops |
| **MCP Protocol Compatibility** | NanoBot, ZeroClaw, PicoClaw, CoPaw | JSON Pointer normalization, transport flexibility (SSE vs streamable HTTP), schema validation |
| **Cross-Platform Support** | OpenClaw, ZeroClaw, CoPaw, LobsterAI | Linux/Windows desktop apps, Windows test suites, macOS blank-window bugs |
| **Credential/Security Hardening** | ZeroClaw, IronClaw, CoPaw, Moltis | API key leaks, sandbox isolation, privileged command gating, credential rotation |
| **Memory & Context Management** | OpenClaw, NanoBot, ZeroClaw, CoPaw | Tool output readability, compaction timeouts, context bloat, vector store feedback |
| **Message Pipeline Robustness** | NanoBot, NanoClaw, PicoClaw, CoPaw | SplitMessage hangs, cron job delivery, pending queue preservation |
| **Channel Integration Coverage** | OpenClaw, ZeroClaw, CoPaw, Moltis | Telegram multimedia, WhatsApp LID bypass, LINE size caps, Matrix E2EE |
| **Configuration Observability** | ZeroClaw, CoPaw, IronClaw, LobsterAI | Silent config corruption, missing feedback on embedding status, opaque credit exhaustion |

**Notable:** No project has solved session reliability comprehensively; this remains the industry-wide "last mile" problem for production AI agents.

---

## 5. Differentiation Analysis

| Dimension | OpenClaw | NanoBot | ZeroClaw | CoPaw | IronClaw | Moltis |
|-----------|----------|---------|----------|-------|----------|--------|
| **Target User** | Power users / devs | DevOps / integrators | Security-focused devs | Teams / enterprise | Researchers / platform builders | Individual / small team |
| **Architecture** | Monolithic reference | Modular extension | Safety-first sandbox | v2 post-migration | Composable assembly | Integration hub |
| **Primary Channel** | Multi-platform | WebUI + chat | CLI + sandbox | Desktop + web | API + web | PWA + chat |
| **Security Model** | Permission system | Hardened downloads | Landlock sandbox | Plugin system | Credential isolation | Operator gating |
| **Memory Strategy** | Codex + Active Mem | Dream cursor | pgvector optional | ReMe embedding | Recoverability matrix | Zvec backend |
| **Differentiator** | Ecosystem standard | Rapid fix velocity | Security rigor | Enterprise v2.0 | Error recovery | Integration breadth |
| **Weakest Area** | Backlog management | Feature depth | CI/test coverage | Migration smoothness | User feedback loop | Community engagement |

**Key insight:** Projects are diverging on **security philosophy** – ZeroClaw and IronClaw invest heavily in sandboxing and isolation, while OpenClaw and CoPaw prioritize feature breadth with layered permission models.

---

## 6. Community Momentum & Maturity

**Tier 1 – Rapid Iteration (High Velocity, Some Instability):**
- **OpenClaw** – Massive throughput but 241 open issues suggest "velocity at cost" tradeoff. Community remains engaged but frustrated by regressions.
- **CoPaw** – Strong post-v2.0 contributor growth (first-time PRs, i18n contributions). Bugs are being reported and fixed within days, indicating healthy lifecycle.

**Tier 2 – Focused Stabilization (Moderate Velocity, Quality-First):**
- **NanoBot** – Exceptional fix-to-bug ratio (27 merged PRs / 10 issues). Fastest turnaround on critical bugs. Model for "lean, responsive" maintenance.
- **IronClaw** – Systematic, architecture-driven development. Low bug count but high-impact changes. Slow release cadence but high quality.
- **ZeroClaw** – Intense prep for v0.8.4. High risk (API key leak, 74 Windows test failures) but active community addressing blockers.

**Tier 3 – Measured Progress (Low-Moderate Velocity, Niche Focus):**
- **PicoClaw** – Contributor-dependent, but strong security and provider additions. Review bottleneck may slow community momentum.
- **NanoClaw** – Core-team driven, fixing migration regressions. Small but consistent output.
- **Moltis** – Quiet but purposeful integration expansion. Low community noise may indicate internal team focus.

**Tier 4 – Stalled / At-Risk:**
- **LobsterAI** – 3 months of stale PRs, critical bug unresolved. Risk of community abandonment.
- **NullClaw** – Single critical crash unfixed for 11 days. Maintainer responsiveness is a red flag.

**Inactive:**
- **TinyClaw, ZeptoClaw, EasyClaw** – No activity. Likely abandoned or deeply dormant.

---

## 7. Trend Signals

**From Community Feedback & Bug Patterns:**

1. **"Session reliability is the new frontier"** – Across all active projects, the top complaints are about message loss, duplicate replies, and session initialization failures. The ecosystem has solved "can it run" and is now grappling with "can it sustain a conversation for 50+ turns without error."

2. **Credential exhaustion is an unsolved UX problem** – IronClaw (#6690) and ZeroClaw (#9386) both highlight that when API credits run out or keys leak, the system provides poor feedback. This is a **design gap**: AI agents need graceful degradation and clear error narratives, not crashes or silent hangs.

3. **MCP is winning, but transport fragmentation is the next battle** – Every major project adopts MCP, but implementations diverge on SSE vs. Streamable HTTP, JSON Pointer handling, and schema validation. The ecosystem needs a **shared conformance suite** to prevent fragmentation from becoming a tax on integrators.

4. **Windows and ARM remain second-class citizens** – ZeroClaw's 74 Windows test failures, OpenClaw's lack of native Windows apps, and NullClaw's aarch64 crash all point to **Linux-first bias**. As personal AI agents move to edge devices (Raspberry Pi, laptops), this becomes a market constraint.

5. **Security hardening is shifting left** – Multiple projects now treat sandbox isolation (ZeroClaw Landlock), image download validation (NanoBot), and credential scoping (IronClaw) as **core architecture** rather than bolt-on features. This signals maturation toward enterprise readiness.

6. **The "per-agent configuration" pattern is emerging** – NanoBot (#1012), OpenClaw (#15032), and NanoClaw (#3125) all explore per-agent or per-group customization of tools, models, and timezones. This suggests a market demand for **multi-tenant agent deployments** where different agents serve different purposes with distinct constraints.

7. **First-time contributors are a health signal** – CoPaw's i18n PR from a new contributor and PicoClaw's community-submitted Exa provider indicate that projects with **clear contribution pathways** (good first issues, documentation) attract external talent. Projects like LobsterAI and NullClaw, which lack contributor activity, may need to invest in onboarding.

---

**Bottom Line for Technical Decision-Makers:**

- **Choose OpenClaw** for ecosystem compatibility and maximum feature surface – but budget for stability overhead.
- **Choose NanoBot** if you need a stable, quickly fixable base with minimal surprises.
- **Choose ZeroClaw** for security-sensitive deployments where sandboxing is non-negotiable.
- **Choose CoPaw** for team/enterprise deployments with need for collaboration features.
- **Monitor IronClaw** for its error-recoverability approach – this may become an industry pattern.
- **Avoid** NullClaw and LobsterAI until maintainer responsiveness improves.

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot Project Digest — 2026-07-27

## Today's Overview
The project saw exceptionally high activity over the past 24 hours, with **33 PRs updated** (27 merged/closed) and **10 issues updated** (8 closed). No new releases were published. The rapid closure of bugs across critical areas—session handling, MCP tool schemas, memory management, and security hardening—indicates a focused push to stabilise the codebase. Two open PRs introducing a **unified extension platform** and **persistent unread-activity tracking** signal that feature work continues in parallel with bugfixing.

## Releases
No new releases today.

## Project Progress
**27 PRs were merged or closed** in the last 24 hours, covering fixes, security enhancements, and small features.

### Notable Merged PRs
- **Session & Heartbeat**  
  - [PR #4928](https://github.com/HKUDS/nanobot/pull/4928): Fix heartbeat routing for unified sessions (closes [#4924](https://github.com/HKUDS/nanobot/issues/4924)).  
  - [PR #5004](https://github.com/HKUDS/nanobot/pull/5004): Tolerate unsupported directory `fsync` on shared filesystems.

- **Memory & Length Recovery**  
  - [PR #5054](https://github.com/HKUDS/nanobot/pull/5054): Advance Dream cursor past no-op batches (fixes [#5041](https://github.com/HKUDS/nanobot/issues/5041)).  
  - [PR #5056](https://github.com/HKUDS/nanobot/pull/5056): Preserve all output segments after token-limit truncation (fixes [#5051](https://github.com/HKUDS/nanobot/issues/5051)).

- **MCP & Provider Compatibility**  
  - [PR #5057](https://github.com/HKUDS/nanobot/pull/5057): Normalise local JSON‑Pointer `$ref` in MCP tool schemas so strict providers (Kimi/Moonshot) accept them (fixes [#5040](https://github.com/HKUDS/nanobot/issues/5040)).

- **Security & File Handling**  
  - [PR #5014](https://github.com/HKUDS/nanobot/pull/5014): Reject oversized file reads (100 MiB cap) before loading into memory (fixes [#4785](https://github.com/HKUDS/nanobot/issues/4785)).  
  - [PR #5095](https://github.com/HKUDS/nanobot/pull/5095): Harden image URL downloads with redirect validation and DNS pinning.  
  - [PR #5101](https://github.com/HKUDS/nanobot/pull/5101): Honour provider proxy for image URL downloads.

- **Message Pipeline**  
  - [PR #5084](https://github.com/HKUDS/nanobot/pull/5084): Preserve runtime context for pending mid-turn messages (related to [#4064](https://github.com/HKUDS/nanobot/issues/4064)).

- **Channel Improvements**  
  - [PR #4446](https://github.com/HKUDS/nanobot/pull/4446): DingTalk: `disable_private_chat` config and sender mention in group replies.  
  - [PR #5069](https://github.com/HKUDS/nanobot/pull/5069): Ignore connection confirmations after user cancellation (WeChat/Feishu).

- **CLI & Sandbox**  
  - [PR #4939](https://github.com/HKUDS/nanobot/pull/4939): Support Codex OAuth in Quick Start.  
  - [PR #4625](https://github.com/HKUDS/nanobot/pull/4625): Allow extra `bwrap` bind roots (closes [#4107](https://github.com/HKUDS/nanobot/issues/4107)).  
  - [PR #4854](https://github.com/HKUDS/nanobot/pull/4854): Add opt-in RTK command rewriter for `exec`.

- **Performance**  
  - [PR #5036](https://github.com/HKUDS/nanobot/pull/5036): Make idle compaction scan interval configurable (reduces CPU usage on low-power devices).

### Open PRs of Interest
- [PR #5103](https://github.com/HKUDS/nanobot/pull/5103) (open): Preserve unread activity across WebUI reconnects—addresses a discovery gap from [#5102](https://github.com/HKUDS/nanobot/issues/5102).  
- [PR #5098](https://github.com/HKUDS/nanobot/pull/5098) (open): Unified extension platform—first-class, governed capability subsystem.  
- [PR #4301](https://github.com/HKUDS/nanobot/pull/4301) (open, conflict): Cache skills loader entries and metadata.

## Community Hot Topics
- **[Issue #5102](https://github.com/HKUDS/nanobot/issues/5102)** (closed, 2 comments): WebUI cron job push “lost”—confirmed that replies are persisted but the unread indicator didn’t fire. Led to [PR #5103](https://github.com/HKUDS/nanobot/pull/5103).  
- **[Issue #4924](https://github.com/HKUDS/nanobot/issues/4924)** (closed, 4 comments): Heartbeat routing failed with `unifiedSession: true` and no regular sessions. Fixed promptly by [PR #4928](https://github.com/HKUDS/nanobot/pull/4928).  
- **[Issue #4792](https://github.com/HKUDS/nanobot/issues/4792)** (open, 2 comments): `/stop` command permanently discards pending queue messages. No fix yet; high user concern about message loss.  
- **[Issue #1012](https://github.com/HKUDS/nanobot/issues/1012)** (open, stale, 2 comments): Request for configurable subagent profiles (tools, skills, model). Still no maintainer response after five months.

*Underlying needs:* Users demand reliable message delivery, transparent session state, and the ability to specialise subagents. The heartbeat and cron issues highlight pain points in multi‑channel deployments.

## Bugs & Stability
Bugs reported/closed today, ranked by severity:

1. **Critical: `/stop` message loss** ([#4792](https://github.com/HKUDS/nanobot/issues/4792)) — open, no fix yet. Pending messages are drained but never re‑published.  
2. **High: MCP schema incompatibility with Kimi/Moonshot** ([#5040](https://github.com/HKUDS/nanobot/issues/5040)) — closed by [PR #5057](https://github.com/HKUDS/nanobot/pull/5057).  
3. **High: Oversized file reads cause OOM** ([underlying #4785](https://github.com/HKUDS/nanobot/issues/4785)) — closed by [PR #5014](https://github.com/HKUDS/nanobot/pull/5014).  
4. **Medium: Heartbeat routing in unified sessions** ([#4924](https://github.com/HKUDS/nanobot/issues/4924)) — closed.  
5. **Medium: Length recovery lost earlier segments** ([#5051](https://github.com/HKUDS/nanobot/issues/5051)) — closed by [PR #5056](https://github.com/HKUDS/nanobot/pull/5056).  
6. **Medium: Dream no‑op batches starve history** ([#5041](https://github.com/HKUDS/nanobot/issues/5041)) — closed by [PR #5054](https://github.com/HKUDS/nanobot/pull/5054).  
7. **Low: Pending mid‑turn context loss** ([#4064](https://github.com/HKUDS/nanobot/issues/4064)) — closed by [PR #5084](https://github.com/HKUDS/nanobot/pull/5084).  
8. **Low: Directory `fsync` errors on virtual filesystems** — closed by [PR #5004](https://github.com/HKUDS/nanobot/pull/5004).  
9. **Low: Null pairing maps crash** — closed by [PR #5088](https://github.com/HKUDS/nanobot/pull/5088).  
10. **Low: Connection cancellation credentials leak** — closed by [PR #5069](https://github.com/HKUDS/nanobot/pull/5069).

## Feature Requests & Roadmap Signals
- **Subagent profiles** ([#1012](https://github.com/HKUDS/nanobot/issues/1012)) — five‑month‑old request; no maintainer response. Likely to be revisited if the extension platform ([PR #5098](https://github.com/HKUDS/nanobot/pull/5098)) gains traction.  
- **Configurable bwrap bind mounts** ([#4107](https://github.com/HKUDS/nanobot/issues/4107)) — closed by [PR #4625](https://github.com/HKUDS/nanobot/pull/4625), now available.  
- **Unified extension platform** ([PR #5098](https://github.com/HKUDS/nanobot/pull/5098)) — major architecture work, likely targeted for the next minor release.  
- **Preserve unread activity across WebUI reconnects** ([PR #5103](https://github.com/HKUDS/nanobot/pull/5103)) — small UX improvement, may land soon.  
- **Idle compaction interval** ([PR #5036](https://github.com/HKUDS/nanobot/pull/5036)) — merged today; Raspberry Pi users benefit immediately.

**Prediction for next release:** The extension platform, unread‑activity fix, and the suite of session/memory fixes merged this week.

## User Feedback Summary
- **Pain points:**  
  - Reliability of cron push notifications (UI gap, now acknowledged).  
  - `/stop` causing permanent message loss (still unresolved).  
  - Session heartbeat failures when using `unifiedSession` (fixed).  
  - Token‑limit recovery truncating earlier content (fixed).  
  - Lack of subagent specialisation (long‑standing request).  
- **Satisfaction signals:**  
  - Rapid turnaround on MCP compatibility, file‑read OOM, and Dream‑batch bugs.  
  - Security hardening (image download, proxy) welcomed.  
  - New DingTalk features (private chat gating, sender mention) fill a gap.  
- **Use cases:**  
  - Running NanoBot on low‑power devices (Raspberry Pi) with idle compaction tuning.  
  - Multi‑channel setups (WebUI, WeChat, Feishu, DingTalk) requiring consistent state.  
  - Deployments with restricted providers (Kimi/Moonshot) and custom tool schemas.

## Backlog Watch
- **[Issue #1012](https://github.com/HKUDS/nanobot/issues/1012)** — Subagent profiles. Opened 2026‑02‑22, no maintainer comment. Community interest (2 comments) but no concrete proposal. Risk of being superseded by the extension platform.  
- **[Issue #4792](https://github.com/HKUDS/nanobot/issues/4792)** — `/stop` message loss. Open since 2026‑07‑06, high severity, no fix PR yet. Urgent attention needed.  
- **[PR #4301](https://github.com/HKUDS/nanobot/pull/4301)** — Skills loader caching. Open since 2026‑06‑11, marked with a conflict. Needs rebase/conflict resolution and review.  
- **[Issue #5102](https://github.com/HKUDS/nanobot/issues/5102)** (closed) — While closed, its underlying discovery gap (unread activity) is being addressed by [PR #5103](https://github.com/HKUDS/nanobot/pull/5103). Maintainers followed up well.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-07-27

## Today’s Overview
ZeroClaw experienced **very high activity** over the last 24 hours: 50 issues and 50 pull requests were updated, with 2 PRs merged/closed and no new release. The community is engaged on a wide range of blockers—from **74 failing Windows tests** to **critical API key leaks** in Gemini error handling. CI and security hardening dominate the conversation, with several high-risk patches in flight. The project remains in an intense stabilization phase ahead of an expected v0.8.4 release, currently tracked in PR #9376.

## Releases
**No new releases today.** (The last release was v0.8.3; the v0.8.4 cut is being prepared in PR #9376.)

## Project Progress
Two PRs were merged/closed today:

- **PR #9233 (closed/merged)** — *fix(runtime/security): Prevent Landlock locks ZeroClaw itself*. This corrects a severe bug where the Landlock sandbox accidentally restricted the daemon process after the first sandboxed shell command, causing subsequent tool executions to fail. [View PR](https://github.com/zeroclaw-labs/zeroclaw/pull/9233)
- A second PR (not shown in top 20) also merged; likely a small docs or test fix.

Otherwise, the bulk of PR activity remains open, with many awaiting author action (`needs-author-action` label) or further review.

## Community Hot Topics
The most commented issues reveal pressing stability and integration concerns:

1. **#7462** (14 comments) — *74 test failures on Windows*. The test suite is Linux-only in CI; contributors highlight Unix-only commands, path semantics, and console encoding issues. This is a long-standing blocker (created June 10). [Issue #7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)

2. **#9101** (7 comments) — *Consolidate release attestation mechanisms*. Three parallel signing stories (cosign, GitHub attestations, slsa) shipped in v0.8.3, causing CI redundancy and confusion. This P1 enhancement proposes a unified story. [Issue #9101](https://github.com/zeroclaw-labs/zeroclaw/issues/9101)

3. **#5514** (6 comments) — *Batch Telegram media groups into one multimodal turn*. Users sending multiple images get multiple agent responses; a UX annoyance. [Issue #5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514)

4. **#6157** (6 comments) — *Nextcloud Talk use correct bot message API*. The current bot API URL incorrectly constructs requests, causing replies to fail. [Issue #6157](https://github.com/zeroclaw-labs/zeroclaw/issues/6157)

5. **#8654** (5 comments) — *Skill-review fork panics (out-of-range slice) → daemon SIGSEGV*. A high-risk crash after tool-heavy turns. [Issue #8654](https://github.com/zeroclaw-labs/zeroclaw/issues/8654)

## Bugs & Stability
Several critical and high-severity bugs were active today:

- **S1 (workflow blocked):**
  - #8559: Agents stop when exiting the web dashboard chat window. The agent loop is interpreted as user interruption. [Issue #8559](https://github.com/zeroclaw-labs/zeroclaw/issues/8559)
  - #8560: `browser_open` hangs the agent turn when no display is available; also affects TTS and ffmpeg channels. [Issue #8560](https://github.com/zeroclaw-labs/zeroclaw/issues/8560)
  - #7527: macOS desktop app reopens blank or without a window. Blocked on `needs-repro`. [Issue #7527](https://github.com/zeroclaw-labs/zeroclaw/issues/7527)
  - #9085: Nested runtime panic when pgvector is enabled (memory backend). [Issue #9085](https://github.com/zeroclaw-labs/zeroclaw/issues/9085)
  - #9035: Docker Compose gateway can remain loopback-bound behind a published port. [Issue #9035](https://github.com/zeroclaw-labs/zeroclaw/issues/9035)

- **Security-related (critical):**
  - #9386 (updated today): Gemini API key appears in request URL, survives `sanitize_api_error`, and is posted into the chat. **API key leak**. [Issue #9386](https://github.com/zeroclaw-labs/zeroclaw/issues/9386)
  - #8973: Landlock blocks shell access to `/dev/null` on Fedora. Fix PR #9114 and follow-up #9233 are in progress. [Issue #8973](https://github.com/zeroclaw-labs/zeroclaw/issues/8973)
  - #6350: WhatsApp Web `allowed-numbers` bypassed for LID-based contacts; messages silently dropped. [Issue #6350](https://github.com/zeroclaw-labs/zeroclaw/issues/6350)
  - #8519: `cargo audit` and `cargo deny` ignore lists drift; several wasmtime-wasi CVEs need remediation. [Issue #8519](https://github.com/zeroclaw-labs/zeroclaw/issues/8519)

- **Other high-risk bugs:**
  - #8642: MCP/tool-schema cloning drives unbounded RSS growth in agent loop. [Issue #8642](https://github.com/zeroclaw-labs/zeroclaw/issues/8642)
  - #8731: Stdio-based MCP servers accumulate as zombie processes under daemon PIDs. [Issue #8731](https://github.com/zeroclaw-labs/zeroclaw/issues/8731)
  - #9089: Tool output does not support `[AUDIO:]` markers (only `[IMAGE:]`). [Issue #9089](https://github.com/zeroclaw-labs/zeroclaw/issues/9089)

Fix PRs are available for several of these: #9114 (landlock sandbox), #9233 (merged), #8826 (SSRF in `image_gen`), #9181 (Nextcloud Talk bot API), #9385 (WhatsApp Web approval). The **API key leak (#9386)** currently has no associated fix PR.

## Feature Requests & Roadmap Signals
Notable enhancement requests and directional signals:

- **#9101** (P1): Release attestation consolidation — likely to land in v0.8.4.
- **#7108** (P2): Improve Rust build caching and CI critical path — targets faster PR CI.
- **#7461** (P2): Run test suite on Windows and macOS — a direct response to the Windows failure bug (#7462).
- **#7099** (P3): Route `zeroclaw status` output through CLI i18n — ongoing internationalisation work.
- **#8409** (P2): Cron shell jobs should support raw stdout output — requested by community members.
- **PR #8337** (size:XL): Herdr agent observability integration — a large, feature-level addition that could land in a future release.
- **PR #9419**: Credential rotation after rate limits — improves resilience of reliable provider mode.

The roadmap signals that **cross-platform CI**, **unified attestation**, and **observability** are near-term priorities.

## User Feedback Summary
Real user pain points expressed in issues and PRs:

- **Installation friction**: `install.sh` selects generic Linux binary on Android/Termux (#7911). Users report confusion.
- **Documentation inaccuracies**: Telegram example documentation is wrong, with incorrect command output (#8810). Nextcloud Talk bot API docs need updating.
- **Configuration surprises**: `models_cache.json` is never written, but the doctor hint recommends `zeroclaw models refresh` which cannot resolve it (#9046).
- **Missing feedback**: CLI secret prompts give no visual feedback after paste (#7808). Users find this disorienting.
- **Service interruptions**: Agents stop when web dashboard is closed (#8559); browser_open hangs indefinitely (#8560); Docker gateway unreachable (#9035).
- **Security concerns**: API key leak (#9386) and silent message drops (#6350) erode trust.

Overall satisfaction is mixed—the community is actively contributing fixes, but the number of S1/S2 bugs indicates the software is not yet production-ready for all platforms.

## Backlog Watch
Issues and PRs that have been open for a long time or are waiting for maintainer attention:

- **#7462** (created June 10, 14 comments, P1, no-stale): Still no fix for Windows test failures. CI runs only on Linux. A dedicated OS matrix PR (#7461) exists but is still open.
- **#5514** (April 8, P2, in-progress): Telegram media group batching has been open for over 3 months—users are waiting.
- **#6350** (May 3, P1, in-progress): WhatsApp Web LID contact bypass—serious silent failure, in progress but lingering.
- **#7527** (June 12, P1, `needs-repro`): macOS desktop blank window. Cannot be fixed without reproduction.
- **#7911** (June 18, P2): Android/Termux installation bug—no solution yet.
- **PR #8337** (June 26, `needs-author-action`): Large herdr integration stalled since author hasn’t responded to review comments.
- **PR #8826** (July 8, `needs-author-action`): SSRF fix for `image_gen` tool awaiting author changes.

Maintainers should prioritize unblocking the `needs-author-action` PRs and closing the long-standing Windows CI gap.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw Project Digest – 2026-07-27

## 1. Today’s Overview
Activity picked up moderately over the past 24 hours, with 4 issues updated (3 open, 1 closed) and 7 pull requests updated (6 open, 1 merged). No new releases were cut. The community submitted several targeted fixes for stability and security, while two new feature proposals—a native Exa web search provider and an AI Router preset—signal growing interest in expanding provider integrations. The single merged PR closed a Go toolchain vulnerability, reflecting ongoing maintenance rigor.

## 2. Releases
No new releases were published today. The latest stable version remains unchanged.

## 3. Project Progress
One pull request was merged today:

- **[PR #3248]** – **fix: bump Go to 1.25.12 to remediate stdlib vulnerabilities** (merged/closed)  
  Bumps the pinned Go toolchain from 1.25.11 to 1.25.12, addressing two `govulncheck` findings (`crypto/tls` and `os`). This is a low-risk security patch that keeps CI pipelines safe.

In addition, the following issue was closed:

- **[Issue #3252]** – **splitKnownProviderModel strips provider prefix when model ID contains known provider alias** (closed)  
  A bug in `pkg/providers/factory.go` that caused incorrect provider prefix stripping for model IDs that themselves contain a known alias. The fix appears to have been shipped prior to today’s digest.

## 4. Community Hot Topics
Activity was spread across multiple items, but none accumulated more than 2 comments. The most discussed topics:

- **[Issue #3252]** – *splitKnownProviderModel strips provider prefix* (closed, 2 comments)  
  The bug drew attention from users who configure custom model IDs. Now resolved.

- **[Issue #3264]** – *[BUG] SplitMessage hangs on oversized fenced-code info string* (1 comment)  
  A real-world hang that blocks message splitting when a code fence info string exceeds the chunk size. The community quickly produced a fix (PR #3295, see §5).

- **[PR #3299]** – *Add native Exa web search provider* (0 comments yet)  
  A substantial new feature contributed by a community member, adding Exa as a native `web_search` provider with configurable date range filters. This is the first native integration of its kind and likely to generate discussion once reviewed.

- **[PR #3297]** – *fix(security): harden remote prompt and exec boundaries* (0 comments yet)  
  A security-oriented PR that moves remote sender metadata to a normalized envelope, disables remote exec by default, and requires per-call approval. It includes a config schema migration (v4). This is a notable step toward safer multi-user deployments.

**Underlying needs:** Users are asking for more provider choice (Exa, AI Router) and for stronger security guarantees in remote/collaborative scenarios.

## 5. Bugs & Stability
Several bugs were addressed or remain open:

| Severity | Issue | Description | Fix Status |
|----------|-------|-------------|------------|
| **High** | **[#3264]** | `SplitMessage` hangs when a fenced-code info string exceeds `maxLen`. The loop never progresses, blocking message splitting. | Fix PR **[#3295]** is open (by ErzerLP). Adds bounded fallback raw split. |
| **Medium** | **[#3265]** | Gateway startup fails with error “channel deltachat has unknown type deltachat” even when deltachat is not configured. Appears to be a config parsing regression. | No fix PR yet. Maintainer attention needed. |
| **Medium** | **[#3267]** | Token refresh for antigravity provider fails due to incorrect scope parameter in refresh request, causing `PERMISSION_DENIED` on secondary auth. | Fix PR **[#3267]** is open (by sarff), addresses scope bug. |
| **Low** | **[#3202]** | `NormalizeAgentID` and `NormalizeAccountID` do not strip leading/trailing underscores, violating documented regex (`^[a-z0-9]...`). | Fix PR **[#3202]** open (by Osamaali313), stale since July 1. |

**Today’s security fix (PR #3248)** closes two stdlib CVEs – no active exploitation reported.

## 6. Feature Requests & Roadmap Signals
Two notable feature requests surfaced today, both with contributed implementations:

- **[Issue #3298]** – *Add AI Router as an OpenAI-compatible provider preset*  
  The author maintains AI Router and volunteers to contribute a preset. This would let users select “AI Router” directly rather than configuring a generic OpenAI endpoint. Likely to be included in the next minor release.

- **[PR #3299]** – *Add native Exa web search provider*  
  A full implementation with config, docs, and date-range support. If merged, it adds a powerful web search backend without needing a custom tool. Strong candidate for the upcoming release.

Other roadmap signals: The security hardening PR (#3297) and the Czech i18n completion (#3296) indicate ongoing investment in both safety and localization. The next version will likely bundle the Exa provider, the AI Router preset, and the security schema migration, together with the SplitMessage hang fix and token scope fix.

## 7. User Feedback Summary
Real user pain points reflected in recent issues:

- **Provider prefix stripping** – users with model IDs containing known provider aliases (e.g., “openai-gpt-4”) had their config silently corrupted. (Resolved.)
- **Gateway crash without deltachat config** – a confusing startup failure that wastes debugging time. Still open.
- **Message splitting hang** – a hard-to-diagnose freeze when using code blocks with long info strings. Fix pending review.
- **Token refresh failure with antigravity** – users of that provider experience persistent auth errors after the initial login. Fix in review.
- **Need for easier provider selection** – the AI Router request shows users want one-click integration rather than manual endpoint setup.

Overall, users are actively contributing fixes and features, suggesting reasonable satisfaction with the project’s responsiveness, though a few blocking bugs (especially #3265) remain unpatched.

## 8. Backlog Watch
Items that have lingered without maintainer action:

- **[PR #3202]** – *fix(routing): strip leading/trailing underscores in ID normalization*  
  Opened July 1, last updated July 26. No maintainer comments. The bug violates the documented contract for agent/account IDs. Stale but important for correctness.

- **[Issue #3265]** – *Gateway startup fails with ‘channel deltachat has unknown type deltachat’*  
  Opened July 19, last updated July 26. No maintainer comment or fix PR. This is a critical startup regression for anyone not using deltachat. Needs triage.

- **[Issue #3267 / PR #3267]** – Token refresh scope bug  
  The PR is from the same author as the issue; maintainer review is pending (last updated July 26). The fix itself is small and well-scoped.

These items would benefit from explicit maintainer feedback or prioritisation to avoid slowing down the contributor pipeline.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw Project Digest — 2026-07-27

## 1. Today’s Overview
NanoClaw saw moderate activity over the last 24 h, with two new issues (both open) and eight pull requests (two merged). A notable breakage surfaced around the recent explicit-destinations migration, where existing chat groups silently lose replies. On the positive side, a duplicate-reply fix and a timezone-override feature were merged, and several PRs targeting stability and engagement consistency remain open. No release was published today. The project is clearly in an active patch cycle, with core-team members addressing regressions while pushing forward new capabilities.

## 2. Releases
None.

## 3. Project Progress
Two pull requests were merged/closed today:

- **#3028 (Fix)** — [fix: avoid duplicate replies after send_message](https://github.com/nanocoai/nanoclaw/pull/3028)  
  Prevents the final summary from triggering a re-wrap nudge when `send_message` already wrote a chat reply in the same provider round. Merged and closed.

- **#3125 (Feature, core team)** — [feat: per-agent-group timezone override](https://github.com/nanocoai/nanoclaw/pull/3125)  
  Adds an optional IANA timezone override per agent group, stored via migration 020. Includes CLI commands and approval gating. Merged and closed.

These represent incremental stability improvements and a new configuration capability that will allow groups to operate in different timezones without global changes.

## 4. Community Hot Topics
All issues and PRs currently have zero comments, so activity is measured by recency and substance. The most discussed or pressing items:

- **[#3140] Explicit-destinations migration: pre-existing wirings have no own-chat destination — all replies silently dropped after update**  
  https://github.com/nanocoai/nanoclaw/issues/3140  
  Affects every existing chat group after the breaking change; no workaround mentioned.

- **[#3136] `sendToDestination` stamps a foreign `in_reply_to` on outbound rows, silently losing messages to destinations with no inbound history**  
  https://github.com/nanocoai/nanoclaw/issues/3136  
  A subtle routing bug that can cause message loss in multi-destination scenarios.

- **[#3137] Fix engagement consistency and expose self-serve wiring controls (core team)**  
  https://github.com/nanocoai/nanoclaw/pull/3137  
  Open PR addressing accumulated context handling and wiring inspection for group-scoped agents.

The underlying need across both issues is better user understanding of and control over destination routing, especially after a major breaking change.

## 5. Bugs & Stability
Three distinct bugs were reported or fixed today, ranked by severity:

**High severity — silent message loss**  
- **[#3140]** Replies to long-standing chat groups are dropped after the explicit-destinations update. No fix PR exists yet.  
- **[#3136]** Outbound messages can be lost when a destination has no inbound history because `sendToDestination` incorrectly reuses a foreign `in_reply_to` ID. No fix PR exists yet.

**Medium severity**  
- **[#3139]** WhatsApp shared-number mode incorrectly silences the owner (“don’t blanket-drop fromMe messages”). A fix PR is open.  
  https://github.com/nanocoai/nanoclaw/pull/3139

**Low severity / internal**  
- **[#3126]** `never deliver silence, never deliver <internal> thinking` — a fix PR already open.  
  https://github.com/nanocoai/nanoclaw/pull/3126  
- **[#3138]** Chat SDK falls back to fetch(url) when attachment has no fetchData. Fix PR open.  
  https://github.com/nanocoai/nanoclaw/pull/3138

The two high-severity issues (#3140 and #3136) are likely top priorities for the core team to address in the coming days.

## 6. Feature Requests & Roadmap Signals
- **#3050 (Open PR)** — [feat(setup): add Dial to the channel picker + wizard/skills](https://github.com/nanocoai/nanoclaw/pull/3050)  
  A new channel integration (Dial) that follows the skill template. This could land in the next minor release.

- **#3125 (Merged today)** — per-agent-group timezone override is now available, likely debuting in the next container release.

- **#3137 (Open PR)** — Self-serve wiring controls and engagement-policy updates for group-scoped agents suggest a trend toward giving users (and agents) more configuration autonomy.

Based on commit velocity, the next version will likely include the Dial channel (if #3050 is reviewed) and the wiring-controls feature from #3137.

## 7. User Feedback Summary
Real pain points expressed in today’s issues:

- A user upgrading an existing install found that all agent replies in long-standing chat groups were silently dropped after the explicit-destinations migration (Issue #3140). No error was logged beyond an “Unknown destination” warning in the poll-loop.
- Another user reported that messages to destinations without prior inbound history vanish because `sendToDestination` stamps a foreign `in_reply_to` (Issue #3136), breaking A2A return-path routing.
- On the WhatsApp channel, an owner using shared-number mode found themselves silenced — a fix is already open.

Satisfaction signals are sparse; the tone of the issues suggests frustration with breaking-change side effects. The timezone override (PR #3125) may satisfy a long-standing request for per-group configuration.

## 8. Backlog Watch
- **#3050** — Feature PR for Dial channel (opened Jul 14, last updated Jul 26). Awaiting maintainer review or merge. If no action, risks stalling.
- **#3122** — [fix(opencode): main compatibility, custom-endpoint transport, memory parity](https://github.com/nanocoai/nanoclaw/pull/3122) (opened Jul 23, core team). Still open with no comments; may require attention before the next release.
- **#3126** — [fix(agent-runner): never deliver silence / internal thinking](https://github.com/nanocoai/nanoclaw/pull/3126) (opened Jul 24, core team). Open for three days; could use a review to avoid queue buildup.

No issues older than two weeks appear to be unanswered, but the core team should prioritize the two high-severity bugs (#3140, #3136) before they affect more users.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw Project Digest — 2026-07-27

## Today’s Overview

The project is currently in a low-activity state. In the last 24 hours, only one open issue was updated, and no pull requests or releases were merged or published. The sole active issue, #976, describes a critical crash (SIGSEGV) on every inbound Telegram message, causing a crash-loop for users running NullClaw as a systemd gateway service. This bug has been open for 11 days with no published fix PR, indicating a potential bottleneck in maintainer response. Overall project health is stable in terms of ongoing development, but a major stability concern remains unaddressed.

## Releases

*No new releases in the last 24 hours.*

## Project Progress

- **Merged/Closed PRs today:** 0  
  No features, fixes, or documentation changes advanced today.

## Community Hot Topics

- **[Issue #976 – SIGSEGV on every inbound Telegram message](https://github.com/nullclaw/nullclaw/issues/976)** (Open)  
  Author: wonhotoss | Created: 2026-07-16 | Updated: 2026-07-26 | Comments: 3  
  This is the only active discussion. The user reports a reproducible crash on aarch64 Linux when running NullClaw v2026.5.29 as a gateway service. The issue describes a stack overflow in the inbound worker thread (spawned with ~512 KB stack). The three comments likely include diagnostic exchange and possibly a workaround suggestion, but no maintainer confirmation of a fix. The underlying need is for a stable Telegram integration – currently the service is unusable for any inbound messaging.

## Bugs & Stability

- **Critical Crash (Severity: High)**  
  **Issue #976: SIGSEGV on every inbound Telegram message** – [Link](https://github.com/nullclaw/nullclaw/issues/976)  
  Every inbound Telegram message causes a segfault due to a stack overflow in the inbound worker thread. The crash prevents any automated reply and forces constant restart cycles when using `Restart=always`. No fix PR exists yet. This is the most pressing stability issue in the project.

- No other bugs, crashes, or regressions were reported in the last 24 hours.

## Feature Requests & Roadmap Signals

No feature requests or roadmap signals were identified in the last 24 hours. All community activity is focused on the critical crash bug.

## User Feedback Summary

- **Pain Point:** A user running NullClaw as a systemd service on aarch64 Linux experiences a total service failure. Every inbound Telegram message causes a segfault, making the gateway feature completely non-functional. The user expresses dissatisfaction through the crash-loop nature of the issue.
- **Use Case:** Telegram gateway automation – the user expects reliable message handling and reply generation. Current behavior drops all messages and restarts, leading to message loss.
- **Satisfaction:** Low – the bug has been open for 11 days without a published fix, and the issue has received 3 comments (likely including user attempts to debug and possibly a maintainer inquiry).

## Backlog Watch

- **Issue #976 – SIGSEGV on every inbound Telegram message** (Open since 2026-07-16)  
  [Link](https://github.com/nullclaw/nullclaw/issues/976)  
  This issue requires immediate maintainer attention. It has been open for 11 days with no resolution, no assigned fix PR, and the bug renders a core feature (Telegram gateway) inoperable on a common platform (aarch64). The lack of any merged pull request or public acknowledgment of a planned fix is concerning for project responsiveness.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-07-27

## 1. Today’s Overview

A busy day with **5 issues** and **19 pull requests** updated, of which **6 PRs were merged/closed** — a strong signal of sustained core- and community-led development. Activity centers on the **error‑recoverability endgame** (epic #6284), sandbox credential security, and a major refactor of the composition layer. No releases were cut. Dependency bot updates continue to account for a significant share of PR activity (11 of 19), while three large functional PRs from core and new contributors are under review.

## 2. Releases

**No new releases** in the last 24 hours. The most recent release candidate is tracked in the open chore-release PR [#5598](https://github.com/nearai/ironclaw/pull/5598) (last updated 2026-07-26), which includes breaking API changes to `ironclaw_common` and `ironclaw_skills`.

## 3. Project Progress

Six pull requests were closed or merged today:

- **#6679 – Harden struct ratchet and remove dead Gemini API** – Merged. Strengthens the struct‑consistency checker with `syn`‑based parsing and adds regression coverage. Dead Gemini API code removed.  
- **#6677 – Compile‑forced recoverability conformance matrix (§11.7 / #6284)** – Closed (likely merged into #6684). Adds an exhaustive `RecoverabilityClass` enum and classifier for seven error types.  
- **#6365 – [reference] P2b: per‑user hosted‑MCP discovery** – Closed after being superseded by the cleaner rebase [#6683](https://github.com/nearai/ironclaw/pull/6683).  
- **#5369 – Fix suppress Cranelift debug log floods** – Merged. Adds Cranelift/Wasmtime compiler targets to the Reborn log guard.  
- **#6640, #4032 – Dependency bumps** – Routine updates of the `everything‑else` and `wasm` groups.

**Key features advanced** – The error‑recoverability epic (#6284) moved forward with the collapse of five failure‑kind enums into one (#6684), and the per‑user MCP discovery feature gained a clean rebase on `main` (#6683). Signed‑agent‑intent attestation (#6672) and sandbox credential placeholder registration (#6689) are in active review.

## 4. Community Hot Topics

- **Epic #6284 – Error‑recoverability endgame** – 8 comments. The most‑commented item, reflecting strong team alignment around making every mid‑run error recoverable. The ongoing PRs #6684 and #6681 are direct outcomes.  
- **Issue #6690 – Out of NEAR AI credits: chat hangs on "thinking…"** – New today, 0 comments but immediate user‑experience concern. No fix yet.  

Other issues and PRs have zero comments, indicating steady but quiet progression. The open chore-release PR [#5598](https://github.com/nearai/ironclaw/pull/5598) continues to attract attention as a potential breaking release.

## 5. Bugs & Stability

**Critical**:
- **[#6690 – Out‑of‑credits chat hang](https://github.com/nearai/ironclaw/issues/6690)** – When credits are exhausted, the web interface freezes on a “thinking…” indicator with no notification. **No fix PR exists yet.** Severity: high – blocks all user interaction without diagnostic feedback.

**Medium**:
- **[#6682 – Daily failure taxonomy](https://github.com/nearai/ironclaw/issues/6682)** – Reports model‑quality partial completions dominating the bench run. Not a code bug but indicates the recoverability gap the epic aims to close.  
- **[#6652 – systemd `WorkingDirectory=` quoting](https://github.com/nearai/ironclaw/pull/6652)** – Open PR fixing `Loaded: bad-setting` after `ironclaw onboard`. Fix is under review.

**Low**:
- **[#6686 – Retire `DockerProcessSandboxBackend`](https://github.com/nearai/ironclaw/issues/6686)** – Dead code proposal, no fix needed.

**Fixed today**: Cranelift log flood (#5369) and struct ratchet hardening (#6679).

## 6. Feature Requests & Roadmap Signals

- **Error recoverability** – Epic #6284 is the clearest roadmap signal: the team is building a unified failure vocabulary (#6684) and conformance matrix (#6677) to ensure the model recovers from every error. This will likely ship in the next major release.
- **Sandbox credential isolation** – PR [#6689](https://github.com/nearai/ironclaw/pull/6689) introduces a placeholder token system (`icsbx_`) that never exposes real secrets inside the container. A security‑critical addition.
- **Composition refactoring** – PR [#6691](https://github.com/nearai/ironclaw/pull/6691) extracts monolith assembly into focused builders, removing `local_dev` vocabulary. Expect improved modularity.
- **Per‑user hosted‑MCP discovery** – [#6683](https://github.com/nearai/ironclaw/pull/6683) (rebased) brings per‑thread connector tools for worker agents. Likely targeted for next minor release.
- **Attested signing (Phase B)** – [#6672](https://github.com/nearai/ironclaw/pull/6672) implements signed intents and per‑agent key lifecycle. A foundation for Ledger revival.

User requests beyond these are limited; most issues are internal technical debt or regression tracking.

## 7. User Feedback Summary

Direct user feedback is sparse, but the following pain points were recorded:

- **Credits exhaustion silence** – [#6690](https://github.com/nearai/ironclaw/issues/6690) highlights that users are left hanging with no explanation when credits run out. Expected: a clear error message or redirect to re‑fund.
- **Model‑quality partial completions** – [#6682](https://github.com/nearai/ironclaw/issues/6682) shows that the agent produces valid but incomplete work in 82 non‑passing bench cases. This reduces trust in autonomous task completion.
- **Developer friction** – [#6688](https://github.com/nearai/ironclaw/issues/6688) notes overlapping safe‑text wrappers (`SafeSummary`, `LoopSafeSummary`, etc.), indicating code duplication that slows contributors.

Overall satisfaction cannot be inferred from the data, but the issues suggest that while the system is powerful, polish around error communication and model reliability still needs attention.

## 8. Backlog Watch

Items that have been open for an extended period without apparent maintainer resolution:

| Item | Opened | Last Updated | Notes |
|------|--------|--------------|-------|
| [#5598 – chore: release](https://github.com/nearai/ironclaw/pull/5598) | 2026-07-03 | 2026-07-26 | Release PR with breaking changes; still pending review/aciton. |
| [#5664 – bump actions group (16 updates)](https://github.com/nearai/ironclaw/pull/5664) | 2026-07-05 | 2026-07-26 | Large CI dependency update; open 22 days. |
| [#6428 – bump tokio‑ecosystem group](https://github.com/nearai/ironclaw/pull/6428) | 2026-07-21 | 2026-07-26 | Open 6 days – moderate urgency. |
| [#6361 – bump serialization group](https://github.com/nearai/ironclaw/pull/6361) | 2026-07-20 | 2026-07-26 | Open 7 days. |
| [#6685 – bump wasm group](https://github.com/nearai/ironclaw/pull/6685) | 2026-07-26 | 2026-07-26 | Very recent, but Wasm dependencies often need careful review. |

The release PR (#5598) is the most notable backlog item: it contains API‑breaking changes and has been open for 24 days without merge or rejection. It may be blocked by the ongoing refactors or dependency updates. Maintainers should prioritize triaging this to unblock downstream consumers.

*Digest generated from GitHub activity data of `nearai/ironclaw` for 2026-07-27.*

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI Project Digest — 2026-07-27

## Today’s Overview
The project shows low activity over the past 24 hours, with only 2 issues and 8 PRs updated, all of which are stale (created in early April 2026). No new releases or merges occurred in this period. The single closed item is a long-standing feature request for Linux support (closed after 4 months), while the remaining open items—including a critical gateway restart bug and seven open PRs—remain unchanged, indicating a potential pause in active development or maintainer bandwidth. Overall project health appears stable but with a growing backlog of unresolved technical debt.

## Releases
- **No new releases** in the last 24 hours. The last known version is 2026.4.1 (referenced in Issue #1243). No migration notes or changelogs to report.

## Project Progress
- **Merged/Closed PRs (1):**
  - [#1325 [CLOSED] feat(ui): 为新建对话图标按钮添加悬停提示](https://github.com/netease-youdao/LobsterAI/pull/1325) — Added tooltip to “New Conversation” icon button across multiple views (Cowork, Agents, MCP). A small but user-facing UX improvement.

- **No other PRs were merged or closed today.** All other 7 PRs remain open and stale since April 1–2, 2026.

## Community Hot Topics
- **Most discussed Issue:**
  - [#273 [CLOSED] [Suggestion] 能否开发Ubuntu Linux版本？](https://github.com/netease-youdao/LobsterAI/issues/273) (2 comments, closed 2026-07-26) — Request for Linux support. The closure suggests the request was either fulfilled elsewhere or rejected. No resolution details are visible from the metadata.

- **No PRs received comments in the last 24h.** The lack of discussion on open PRs (e.g., #1247, #1249, #1252) may indicate community disengagement or maintainer review backlog.

## Bugs & Stability
- **High Severity:**
  - [#1243 [OPEN] [BUG] qwen-portal-auth 插件配置循环写入导致网关频繁重启](https://github.com/netease-youdao/LobsterAI/issues/1243) — Describes a critical bug where the `qwen-portal-auth` plugin causes the OpenClaw gateway to restart every 5–20 minutes. Affects all models (including non-Qwen), impacts user experience severely. No fix PR is linked, though PR #1247 ([fix openclaw model switch recovery after provider limits](https://github.com/netease-youdao/LobsterAI/pull/1247)) may address related gateway restart logic but remains unmerged. **No progress in 3 months.**

- **Medium/Low Severity:**
  - No new bugs reported today. The i18n fix (PR #1257) and DiffView rendering fix (PR #1249) remain unmerged, indicating unresolved UI inconsistencies.

## Feature Requests & Roadmap Signals
- **Linux Support (closed):** The closure of #273 may hint at a planned or existing Linux build, but no release confirms it. Could be a roadmap item for next version.
- **Natural Language Cron (PR #1256):** Adds LLM-based cron expression generation from natural language. Shows ongoing interest in reducing user friction for scheduled tasks.
- **Unsaved Changes Confirmation (PR #1252, #1258):** Two separate PRs address the same UX issue in the scheduled task form—an indication the maintainers value user data loss prevention.
- **Gateway Stability (PR #1247, #1259):** Optimizations to gateway bundling and model switch recovery are in the pipeline, likely for the next release.

## User Feedback Summary
- **Pain Points:**
  - Gateway instability (Issue #1243) – highly disruptive; users report repeated restarts and pop-up alerts.
  - Lack of Linux support (Issue #273) – closed, but no official announcement about availability.
  - Missing UI tooltips (PR #1325) – basic edge-case UX, now fixed in merged PR.
  - DiffView not rendering in Cowork sessions (PR #1249) – users cannot see visual diffs when AI edits files.
- **Satisfaction Indicators:**
  - The community appears tolerant of long wait times (stale issues since April) but continues to submit improvements. No signs of heated complaints.

## Backlog Watch
- **Critical Bug – No Fix Merged:**
  - [#1243 – qwen-portal-auth loop restart](https://github.com/netease-youdao/LobsterAI/issues/1243) – open since April 1, 2026. The associated fix PR #1247 has not been reviewed or merged. **Requires immediate maintainer attention.**

- **Stale Open PRs (7 items, all from April 1–2, 2026):**
  - [#1247 – fix openclaw model switch recovery](https://github.com/netease-youdao/LobsterAI/pull/1247) – directly tied to the above bug.
  - [#1249 – fix DiffView rendering](https://github.com/netease-youdao/LobsterAI/pull/1249)
  - [#1252 – unsaved changes confirmation](https://github.com/netease-youdao/LobsterAI/pull/1252)
  - [#1256 – natural language cron](https://github.com/netease-youdao/LobsterAI/pull/1256)
  - [#1257 – missing i18n keys](https://github.com/netease-youdao/LobsterAI/pull/1257)
  - [#1258 – unsaved changes dialog (alternate)](https://github.com/netease-youdao/LobsterAI/pull/1258)
  - [#1259 – gateway bundling optimization](https://github.com/netease-youdao/LobsterAI/pull/1259)

All of these are uncontroversial improvements or fixes. Their prolonged staleness suggests a bottleneck in code review or CI, or a shift in maintainer focus. Without action, the risk of technical divergence and community frustration grows.

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis Project Digest — 2026-07-27

## 1. Today's Overview
The Moltis project saw no new issues or releases in the last 24 hours, but seven open pull requests were updated, all authored or revised today. Activity is concentrated on expanding the platform's integration surface — adding an ACP agent mode, improving Slack reliability with Block Kit and reconnect supervision, enhancing PWA push notifications, and hardening security for privileged commands. No PRs were merged or closed, indicating a day of refinement and review rather than delivery.

## 2. Releases
None this period.

## 3. Project Progress
**No PRs were merged or closed today.** All seven PRs updated remain open, including:
- [#1172 – fix(web): hide archived cron sessions by default](https://github.com/moltis-org/moltis/pull/1172) (author: shixi-li)
- [#1170 – fix(channels): gate /sh and privileged tools behind a per-account operators list](https://github.com/moltis-org/moltis/pull/1170) (author: penso)

These represent work-in-progress fixes and features that have not yet been integrated.

## 4. Community Hot Topics
All PRs have zero comments and zero reactions, making it difficult to gauge community engagement. Among the seven, the most technically notable are:

- [#1158 – feat(memory): add zvec vector database memory backend](https://github.com/moltis-org/moltis/pull/1158) – an experimental alternative memory backend using Zvec and redb, feature-gated.
- [#1169 – feat(acp): expose Moltis as an ACP agent over stdio](https://github.com/moltis-org/moltis/pull/1169) – inverts the existing ACP client role, enabling external harnesses (Zed, buzz-acp) to use Moltis as an agent.
- [#1173 – feat(pwa): make push notifications reliable and non-disruptive](https://github.com/moltis-org/moltis/pull/1173) – fixes silent replacement of notifications and adds `renotify`.

The lack of discussion may indicate these are early-stage PRs still awaiting review, or that the community is small and primarily tracks via commits rather than comments.

## 5. Bugs & Stability
Two fix-oriented PRs address stability and security:

- **High Severity – [#1170](https://github.com/moltis-org/moltis/pull/1170)**: `/sh` command allowed arbitrary host execution for any channel member passing the access gate. The fix gates privileged tools behind a per-account operators list, preventing unauthorised command execution on multi-user instances (Discord, group chats). A new PR exists; no merge yet.
- **Medium Severity – [#1172](https://github.com/moltis-org/moltis/pull/1172)**: Archived cron sessions were shown by default, cluttering the Cron tab. Fix hides them by default while preserving a toggle, plus adds Playwright regression tests.

No new crash or regression reports are recorded today.

## 6. Feature Requests & Roadmap Signals
The PRs hint at upcoming capabilities likely to land in the next release:

- **Memory backend extensibility** ([#1158](https://github.com/moltis-org/moltis/pull/1158)): Zvec + redb backend, indicating interest in supporting local, embedder-hosted vector memory.
- **ACP bidirectional support** ([#1169](https://github.com/moltis-org/moltis/pull/1169)): Moltis as an ACP agent over stdio opens the door for integration with third-party ACP harnesses and multi-agent orchestrators.
- **Slack interaction improvements** ([#1166](https://github.com/moltis-org/moltis/pull/1166)): Per-message acknowledgment reactions, phase feedback, Block Kit rendering, and reconnect supervision – critical for production Slack bots.
- **UI unification** ([#1171](https://github.com/moltis-org/moltis/pull/1171)): Moving ACP selection into the chat model picker simplifies the UI and removes redundant options.

These features align with maturing Moltis from a personal assistant into a platform that can be embedded in team chat and external agent systems.

## 7. User Feedback Summary
No direct user feedback (issues, comments, reactions) was recorded today. However, the PR descriptions imply real pain points: PWA notifications silently failing, Slack bots lacking typing indicators, archived cron sessions causing visual clutter, and the lack of operator access control for `/sh`. The fixes address these without reported complaints, suggesting proactive development based on the team’s own experience or beta tester reports.

## 8. Backlog Watch
No long-unanswered issues or PRs were identified in today’s data. The oldest open PR updated in the last 24 hours is [#1158](https://github.com/moltis-org/moltis/pull/1158) (created 2026-07-17, last updated 2026-07-26). It remains open with no comments, which may warrant a review ping if it stalls further. Otherwise, the project queue appears well-maintained.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw Project Digest — 2026-07-27

## 1. Today's Overview

CoPaw continues its rapid post-v2.0 evolution with **22 issues and 20 pull requests updated in the last 24 hours**, reflecting strong community engagement and a high volume of bug reports. No new releases were published today. The project is in a phase of intensive stabilization: many issues describe regressions from the v1 → v2 migration, MCP transport inconsistencies, and missing features. On the positive side, **6 pull requests were merged/closed**, including custom provider renaming, Windows test script fixes, and new integration test suites. Several first-time contributors are submitting localization and bug-fix PRs, indicating a healthy open-source contributor funnel.

## 2. Releases

*No new releases were recorded in the last 24 hours.*

## 3. Project Progress (Merged/Closed PRs Today)

Six pull requests were merged or closed today, reflecting efforts in documentation, UI polish, test coverage, and small features:

- **#6477** (closed) – docs(faq): align zh sub‑section headings with en – Fixed heading formatting inconsistencies in Chinese FAQ.
- **#6488** (closed) – fix(console): keep sidebar settings gear visible when collapsed – Ensures the simple/full-mode toggle is always accessible on mobile.
- **#6426** (closed) – feat(models): allow renaming custom providers – Adds an optional `name` field to `ProviderConfigRequest` so users can rename custom API providers after initial setup (closes [#6414]).
- **#6365** (closed) – fix(console): run test scripts on Windows – Replaces POSIX inline environment‑variable syntax with cross‑platform `vitest run` invocation, enabling Windows contributors to run tests.
- **#6417** (closed) – test(integration): Sprint 4.3+4.4 – workspace-git / coding-project / skill-pool auto-sync – Adds integration coverage for three previously uncovered v2.0 surfaces (test‑only).
- **#6415** (closed) – test(e2e): add skill auto-sync cases – Adds end‑to‑end tests for the skill auto‑sync feature.

## 4. Community Hot Topics

The most active issues and PRs (by comment count) reveal strong user engagement around migration pains and configuration gaps:

| Item | Type | Comments | Summary |
|------|------|----------|---------|
| [#5980] | Issue (closed) | 8 | v1→v2 migration missing SSH offline functionality and profile 404 errors. |
| [#6155] | Issue (closed) | 5 | Multiple embedding config bugs after upgrading from 1.x to 2.0.0 (e.g., `pass_dimensions` mapping). |
| [#6470] | Issue (open) | 4 | MCP driver hard‑codes SSE client, ignoring `transport: streamable_http` config. **Three nearly identical issues** (#6468, #6469) were filed and closed, but the core bug remains open. |
| [#6342] | Issue (closed) | 3 | User asks how to verify ReMe embedding is actually working when no vector store files appear. |
| [#6239] | Issue (open) | 3 | Windows backend drops semicolons when concatenating User + Machine PATH, breaking npm global tools. |

**Underlying needs:**  
- Users upgrading from v1 to v2 experience feature regressions and configuration breakage — clearer migration guides and compatibility testing are needed.  
- MCP transport configuration is fragile and hardcoded; flexibility for Streamable HTTP is a high‑demand requirement for system integrators.  
- The embedding pipeline lacks observable feedback — users want visible indicators or logs that vector search is active.

## 5. Bugs & Stability

A significant number of bugs were reported today, ranked by severity:

### Critical
- **MCP Driver Ignores Transport Config** [#6470] – Hardcoded `sse_client` breaks all servers configured with `streamable_http`. A test PR [#6483] adds regression coverage but does not fix the root cause. *Severity: high – blocks MCP usage for non‑SSE backends.*
- **`view_video` Returns Success but Sends Nothing to LLM** [#6474] – No formatter serialises video DataBlocks into the API request, so models never receive video. *Severity: high – multimodal pipeline broken.*

### High
- **Plugin Agent Kanban Fails to Install** [#6473] – `ModuleNotFoundError: No module named 'qwenpaw.pawapp'` on Desktop 2.0.1. Blocks plugin ecosystem.
- **Matrix E2EE Encryption Unusable** [#6476] – Python 3.12 builds of legacy `olm` fail; `vodozemac` is installed but not probed. A fix PR [#6486] is open.
- **Cron Tasks Misfire After Idle Event Loop** [#6471] – APScheduler `AsyncIOScheduler` stops firing when no HTTP/WebSocket traffic. A keepalive fix PR [#6481] is open.

### Medium
- **Windows PATH Concatenation Drops Semicolons** [#6239] – Child processes lose npm global tools. No fix PR yet.
- **Unbound SSE Replay Buffer Causes High CPU** [#6460] – On Wayland/Edge, long sessions with large tool outputs cause repeated reconnect + full replay loops. A fix PR [#6485] caps the buffer and adds stream heartbeat.
- **UI Lag When Switching Agents** [#6482] – Console stutters and shows stale chat content after switching.
- **JSON Files Missing Line Numbers in Programming Mode** [#6472] – Regression from 2.0.0 to 2.0.1.

### Low
- **`nohup` Commands Never Return** [#6480] – Shell process detached via `&`/`nohup` leaves agent stuck.
- **Connection Test Failure on AgentScope Platform** [#6464] – All models return API errors; dropdown empty.
- **Task Mode History Explosion** [#6457] – Unclear why many conversations appear for a single task run.

## 6. Feature Requests & Roadmap Signals

Several feature requests and enhancement PRs signal upcoming areas of development:

- **Custom Provider Renaming** [#6414] – Already implemented in merged PR [#6426]. Will ship with the next release.
- **Traditional Chinese (zh-TW) Localization** [#6478] – A first‑time contributor has submitted a full i18n PR [#6484] covering console and website. Likely to be accepted soon.
- **Cron Task Safety Defaults & Notification Granularity** [#6458] – Users want the “Tool Execution Safety Check” to default to ON for cron tasks, with per‑tool notifications. Not yet implemented.
- **`notice_after_complete` Tool** [#6475] – Enables the agent to defer a response while running a long background task (e.g., `nohup`). Shows demand for asynchronous workflow patterns.
- **Visual Context Compression** (PawFocus) – PR [#6456] introduces a visual context compression mechanism for long agent histories. Under review.
- **Unified Browser SDK** – PR [#6276] aims to unify browser control behind a single SDK with control‑plane/execution‑plane split. Still open; indicates future platform expansion.

**Prediction for next minor release:** i18n zh‑TW, custom provider rename, and at least one of the MCP/cron fixes are likely to land.

## 7. User Feedback Summary

**Real user pain points (from issue comments):**  
- **v2.0 upgrade is disruptive** – Missing SSH offline, profile 404, embedding config regressions. Users with invested workflows feel forced to upgrade.  
- **Configuration is opaque** – No feedback when ReMe embedding is enabled; no way to verify vector indexing.  
- **Plugin ecosystem reliability** – Official plugin (Agent Kanban) fails out of the box; matrix encryption broken.  
- **MCP protocol lock‑in** – Power users running mixed‑transport MCP servers cannot use QwenPaw without workarounds.  
- **Windows experience lags** – PATH handling, test scripts, and sandbox support are less mature than Linux/macOS.

**Signs of satisfaction / community health:**  
- Multiple first‑time contributors submitting thoughtful PRs (i18n, MCP tests, cron keepalive, docs fixes).  
- Users are willing to translate and contribute back without waiting for maintainers.  
- The volume of detailed bug reports (with reproduction steps, environment, and logs) indicates an engaged user base that cares about the project.

## 8. Backlog Watch

These items have remained open for several days and may need maintainer attention:

- **#6239** – Windows PATH semicolon drop (open since 2026‑07‑18, no fix PR). Affects all Windows users with npm/pip global tools.  
- **#6276** – Unified browser SDK (open since 2026‑07‑20, under review). Large feature that could impact multiple subsystems; maintainer review is critical.  
- **#6330** – Website improvements: GA fix, nav/downloads UI, hero version (open since 2026‑07‑22). Website changes have low risk but unaddressed for five days.  
- **#6387** – On‑demand channel installation and version repair (open since 2026‑07‑23). Could improve plugin installation reliability (#6473 is a symptom).  
- **#6458** – Cron safety defaults (open since 2026‑07‑24). Feature request with clear design, no implementation started yet.

*None of these show maintainer comments in the last 24 hours; they may be overlooked in the flurry of new activity.*

---

*Generated at 2026-07-27 from CoPaw public GitHub data (github.com/agentscope-ai/CoPaw). Project reference: QwenPaw.*

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