# OpenClaw Ecosystem Digest 2026-07-23

> Issues: 459 | PRs: 500 | Projects covered: 13 | Generated: 2026-07-23 03:19 UTC

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

# OpenClaw Project Digest – 2026-07-23

## 1. Today’s Overview
The OpenClaw repository is experiencing very high activity, with **459 issues** and **500 pull requests** updated in the last 24 hours. Of these, 311 issues remain open/active, and 296 PRs are open — indicating a vibrant but heavily burdened review pipeline. No new releases were published today. The project is clearly in a rapid development phase, but the volume of open items, many labelled `clawsweeper:needs-maintainer-review` or `needs-product-decision`, suggests maintainers are stretched thin. Several critical regressions (P0/P1) were reported today, particularly around gateway startup, session state, and channel reliability.

## 2. Releases
**No new releases** were published today. The most recent version mentioned across issues is `2026.7.2` and `2026.7.1`, with several regressions reported against these builds. Operators are advised to monitor the [Releases page](https://github.com/openclaw/openclaw/releases) for upcoming fixes.

## 3. Project Progress
In the last 24 hours, **204 PRs were merged or closed**. Notable merged/closed PRs include:

- **#112850** – Refactored Telegram and iMessage config schemas to plugin-owned modules, decoupling them from the core config layer.
- **#112841** – Fixed release validation for frozen extended-stable candidates, unblocking CI.
- **#111861** – Implemented a canonical session lineage model (creation provenance, fork ancestry, typed row contract).
- **#112782** – Hoisted duplicated channel doctor migration helpers into a shared utility, improving maintainability.
- **#112744** – Fixed phantom iPad nodes on Apple Silicon Macs for the iOS app.
- **#112627** – Stopped `openclaw gateway call` from running local state migrations at bootstrap, preventing migration conflicts.
- **#112678** – Moved implicit `main` agent fallback into load-time roster injection, cleaning up 38 runtime sites.

These PRs demonstrate focused effort on architecture refinement, CI reliability, and channel plugin consistency.

## 4. Community Hot Topics
The most engaged discussions reflect frustration with missing cross-platform features and demanding security/policy requirements:

- **[#75 – Linux/Windows Clawdbot Apps](https://github.com/openclaw/openclaw/issues/75)** (115 comments, 80 👍) – The top-voted issue by far. Users urgently want desktop apps for Linux and Windows comparable to the existing macOS app. This is a long-standing request (created Jan 1, 2026) and remains open with no fix PR.
- **[#85333 – `openclaw doctor --fix` 4–5x slower regression](https://github.com/openclaw/openclaw/issues/85333)** (17 comments) – A performance regression introduced in 2026.5.20 causing severe slowdowns in production VPS deployments.
- **[#13583 – Pre-response enforcement hooks (hard gates)](https://github.com/openclaw/openclaw/issues/13583)** (16 comments, 2 👍) – Request for mechanical tool-call enforcement, especially for high-stakes finance/security workflows. Labeled `diamond lobster`, indicating high value.
- **[#91009 – Codex native hook relay CPU-bound process spawn](https://github.com/openclaw/openclaw/issues/91009)** (15 comments) – A critical bug where Codex integration spawns unconstrained `openclaw-hooks` processes.
- **[#10659 – Masked Secrets](https://github.com/openclaw/openclaw/issues/10659)** (15 comments, 4 👍) – Strong support for preventing agents from viewing raw API keys, addressing prompt injection risks.
- **[#96857 – Tool text outputs replaced by “(see attached image)” placeholders](https://github.com/openclaw/openclaw/issues/96857)** (13 comments, 4 👍) – A confusing bug that blinds agents to normal command output.

The community is actively shaping security and desktop experience priorities.

## 5. Bugs & Stability
Today’s updated issues reveal several **high-severity bugs**, many with regressions. Ranking by severity (P0 > P1 > P2):

### P0 (Regression, release-blocker or catastrophic)
- **[#108435 – Gateway fails to start after update to 2026.7.1](https://github.com/openclaw/openclaw/issues/108435)** (9 comments) – Gateway won’t start via systemd, Ollama, or manual launch. Impact: crash-loop on all platforms. No fix PR linked yet.
- **[#98674 – Mac app install icon unclickable](https://github.com/openclaw/openclaw/issues/98674)** (5 comments) – .dmg install image doesn’t scale on Mac mini, preventing installation. Closed today, likely with a fix.

### P1 (High impact, active discussion)
- **[#91009 – Codex PreToolUse native hook relay CPU-bound stalls](https://github.com/openclaw/openclaw/issues/91009)** – Causes gateway RPC stalls and potential crash-loop. Linked PR #112000 (refactoring prompt labels) may address root cause.
- **[#92043 – 180s compaction timeout is a single wall clock with no partial-progress reuse](https://github.com/openclaw/openclaw/issues/92043)** (12 comments) – Legitimately long compactions fail identically every turn.
- **[#85103 – Model fallback chain not triggered on provider-wide quota exhaustion](https://github.com/openclaw/openclaw/issues/85103)** – Closed today; likely fixed.
- **[#90840 – Subagent raw output delivered to chat user instead of parent summary](https://github.com/openclaw/openclaw/issues/90840)** – Regression that breaks agent hierarchy.
- **[#108580 – Cron tool schema incompatible with llama.cpp grammar-constrained tool calling](https://github.com/openclaw/openclaw/issues/108580)** (6 comments) – 2026.7.1 regression blocking local inference users.
- **[#86031 – Windows gateway listens but health probes time out](https://github.com/openclaw/openclaw/issues/86031)** – Telegram polling stall on Windows.

### P2 (Moderate impact)
- **[#87318 – Amazon Bedrock inference profile ARN not supported](https://github.com/openclaw/openclaw/issues/87318)** – Haiku 4.5 profile not routed correctly.
- **[#87807 – sessions_spawn fails with missing scope operator.write](https://github.com/openclaw/openclaw/issues/77807)** – Closed; fix likely merged.
- **[#99773 – Hot reload drops include-defined models](https://github.com/openclaw/openclaw/issues/99773)** – Causes “Unknown model” errors until restart.
- **[#87980 – `exec` tool corrupts shell redirect arguments](https://github.com/openclaw/openclaw/issues/87980)** – Blocks use of `2>&1` etc.
- **[#95606 – Memory system cannot delete stale memories](https://github.com/openclaw/openclaw/issues/95606)** – Conflicting entries persist after correction.

Several of these bugs have linked open PRs (e.g., #91009, #92043, #108580) but none have been merged today. The high ratio of regressions suggests the rapid release cycle is introducing stability gaps.

## 6. Feature Requests & Roadmap Signals
The most requested features point to **security hardening**, **platform expansion**, and **session control**:

- **Cross-platform desktop apps** (#75) – Linux/Windows Clawdbot is the #1 community desire. Likely to be prioritized once gateway stability improves.
- **Hard enforcement hooks** (#13583) – Mandatory pre-response tool-call rules for security-critical workflows. High-value for enterprise adoption.
- **Masked secrets** (#10659) – Prevent agent from viewing raw API keys. Addresses a common audit finding and prompt injection vector.
- **`maxTurns` / `maxToolCalls` limit** (#9912) – Configuration option to bound infinite agent loops. Requested by users of providers like KIMI K2.
- **Context window percentage in system prompt** (#38568) – Inject runtime context usage for agent self-awareness.
- **`session:end` hook** (#10142) – Signal session completion for workflow orchestration (e.g., Temporal).
- **Portable agent policy settings** (PR #112773) – New PR adds `alsoAllow`, `deny`, and bounded memory-search policies to Claw manifests.
- **Session visibility states** (PR #112787) – Makes sessions read-only, restricts to collaborators, or hides work-in-progress from other operators.

Expect **masked secrets** and **session visibility states** to land in the next release (2026.7.x), while **desktop apps** remain a longer-term roadmap item.

## 7. User Feedback Summary
Real user sentiment is a mix of **frustration with regressions** and **appreciation for new capabilities**:

- **Pain points** – The most vocal complaints centre on performance regressions (`doctor --fix` slowdown), gateway crash-loops after updates, and channel-specific silent drops (Telegram, WhatsApp, LINE, Discord). Accessibility users are also affected by the screen reader streaming bug (#65538).
- **Security concerns** – Several users report being uncomfortable with the current “soft” enforcement of tool policies and want mechanical gates. The masked secrets feature is seen as essential for production deployments.
- **Configuration friction** – Users report frustration with `doctor --fix` failing atomically (#77802), hot reload losing models (#99773), and plugin trust issues for self-hosted containers (#92516).
- **Positive signals** – The PR activity shows the team is actively addressing many of these issues, and the rapid iteration is valued by users who appreciate new features like session lineage and canonical lineage.

Overall, satisfaction is moderate; the community is engaged but increasingly vocal about reliability.

## 8. Backlog Watch
Several important issues and PRs remain open for extended periods without maintainer action:

- **#75 – Linux/Windows Clawdbot Apps** – Created Jan 1, 2026 (7+ months open). Needs product decision and security review. Holds the most comments and reactions.
- **#13583 – Pre-response enforcement hooks** – Open since Feb 10, 2026 (5+ months). Multiple labels including `needs-product-decision` and `needs-security-review`.
- **#10659 – Masked Secrets** – Open since Feb 6, 2026 (5+ months). Similarly blocked on maintainer decisions.
- **#9912 – maxTurns feature** – Open since Feb 5, 2026 (5+ months). `needs-maintainer-review`.
- **#38568 – Context window % in system prompt** – Open since Mar 7, 2026 (4+ months). `needs-product-decision`.
- **#41199 – Agent-to-agent communication tool parameter conflicts** – Open since Mar 9, 2026 (4+ months). Linked PR open but needs live reproduction.
- **#112000 – Refactor prompt labels (PR)** – Waiting on author (`status: ⏳ waiting on author`). Could unblock several related bugs.
- **#91729 – Fix msteams streamed prefix double-post** – Needs real behavior proof and has not progressed since June 9.
- **#104018 – Readiness conditions and providers** – An XL PR with `merge-risk: 🚨 compatibility` that has been open since July 11 and is crucial for deployment health monitoring.

These items represent a significant backlog that, if unaddressed, may lead to community fatigue. Prioritizing #75 and the security-related features (#13583, #10659) would likely yield the highest user satisfaction.

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report — 2026-07-23

## 1. Ecosystem Overview

The personal AI assistant open-source ecosystem is experiencing a period of intense, fragmented growth. Activity across the seven most active projects exceeds 1,100 issues and 720 pull requests updated in a single day, with OpenClaw alone accounting for roughly 40% of all activity. While the ecosystem is rich in innovation—spanning session lineage models, provider unification, goal runtimes, and multi-agent collaboration proposals—the rapid release cycles are introducing significant stability regressions across multiple projects. Maintainer bandwidth appears to be the primary bottleneck, with many critical features (masked secrets, cross-platform desktop apps, enforcement hooks) and important PRs languishing for weeks. The community is increasingly vocal about reliability, security hardening, and cross-platform parity, signaling that the ecosystem is maturing beyond early adoption into production deployment concerns.

---

## 2. Activity Comparison

| Project | Issues Updated (Total) | Open Issues | PRs Updated (Total) | PRs Merged/Closed | Release Today | Health Signal |
|---|---|---|---|---|---|---|
| **OpenClaw** | 459 | 311 | 500 | 204 | No | Overloaded but rapidly iterating; high regression risk |
| **CoPaw** | 27 | 19 | 50 | 16 | v2.0.0.post4 | Post-release stabilization mode; active bug squashing |
| **Zeroclaw** | 50 | 40 | 50 | 0 | No | Resource-constrained; high backlog of accepted but unassigned work |
| **NanoBot** | 5 | 4 | 61 | 38 | No | Accelerating; strong PR velocity with community contributions |
| **IronClaw** | 50 | 36 | 50 | 25 | No | Pre-launch QA phase; foundation complete, UX gaps remain |
| **PicoClaw** | 3 | 2 | 5 | 2 | No | Moderate activity; niche focus, slow maintainer response |
| **NullClaw** | 1 | 0 | 1 | 1 | No | Maintenance phase; two critical Discord bugs closed |
| **LobsterAI** | 1 | 0 | 5 | 5 | No | Healthy; backlog cleared, rapid fix turnaround |
| **NanoClaw** | 1 | 1 | 3 | 0 | No | Low activity; security docs concern, open PRs unmerged |
| **Moltis** | 0 | 0 | 1 | 0 | No | Quiet; single open UI PR, no community engagement |
| **TinyClaw** | 0 | 0 | 0 | 0 | No | Inactive |
| **ZeptoClaw** | 0 | 0 | 0 | 0 | No | Inactive |
| **EasyClaw** | 0 | 0 | 0 | 0 | No | Inactive |

**Notable**: Three projects show zero activity—TinyClaw, ZeptoClaw, and EasyClaw—suggesting they may be dormant or in a maintenance hold.

---

## 3. OpenClaw's Position

**Advantages**: OpenClaw dominates the ecosystem in scale, with **459 issues** and **500 PRs** updated—roughly 3–4× the volume of the next most active project (Zeroclaw, IronClaw). It has the most mature feature set, including canonical session lineage, channel plugin decoupling, and an extensive hook system. The PR #112850 (Telegram/iMessage config decoupling) and #111861 (session lineage) demonstrate architectural sophistication that peers are still designing.

**Technical approach**: OpenClaw takes a "monorepo reference implementation" strategy, centralizing core agent, gateway, and channel code. This contrasts with NanoBot's modular provider-first approach and Zeroclaw's heavy emphasis on multi-tenant RBAC and Landlock sandboxing. OpenClaw's architecture is more opinionated about session management and config schemas.

**Community size**: With 80 👍 on the cross-platform desktop app issue (#75) alone—more reactions than any other project's top issue—OpenClaw clearly commands the largest user community. However, this also means it bears the brunt of user frustration: 311 open issues and 296 open PRs indicate the maintenance team is stretched thin. The ratio of open-to-closed PRs (296:204 today) is the highest among active projects, suggesting a growing review bottleneck.

**Key weakness**: OpenClaw has the most P0/P1 regressions (10+) among all projects, including a gateway crash-loop (#108435) that affects all platforms. Its rapid release cadence (2026.7.1, 2026.7.2) is introducing regressions faster than they can be fixed. In contrast, NanoBot had no P0 issues today, and IronClaw's QA-driven approach has surfaced fewer severity-1 bugs.

---

## 4. Shared Technical Focus Areas

Several requirements are emerging independently across multiple projects, indicating ecosystem-wide needs:

| Focus Area | Projects | Specific Needs |
|---|---|---|
| **Security hardening** | OpenClaw (#10659, #13583), Zeroclaw (#5775, #5842, #6250, #5842), NanoClaw (#3118), IronClaw (#6534) | Masked secrets, hard enforcement hooks, per-skill permissions, OAuth config fidelity, credential isolation docs |
| **Multi-agent collaboration** | NanoBot (#5000), OpenClaw (session lineage, subagent output fix #90840), IronClaw (stateful lifecycle #6535) | Persistent subagent identities, shared task state, delegation boundaries |
| **Cross-platform desktop apps** | OpenClaw (#75), Zeroclaw (Windows test failures #7462), PicoClaw (no specific issue but gateway-centric) | Linux/Windows GUI parity with macOS |
| **Session/state management** | OpenClaw (session lineage #111861, visibility states PR #112787), NanoBot (session-scoped presets #4866), Zeroclaw (goal runtime PR stack) | Session persistence, read-only/hidden states, configurable limits |
| **Performance regressions** | OpenClaw (#85333 doctor --fix slowdown), CoPaw (#6307 2s overhead per reply), NanoBot (#5036 idle compaction CPU), Zeroclaw (#5808 tool schema overhead) | Avoiding context budget overflow, faster startup, lower CPU idle usage |
| **Provider schema compatibility** | NanoBot (#5040 MCP $ref rejection), CoPaw (#6363 tool call markdown pollution), OpenClaw (#108580 cron schema incompatibility) | Robust schema transformation for strict providers (Kimi, Moonshot, GLM) |

---

## 5. Differentiation Analysis

| Dimension | OpenClaw | Zeroclaw | CoPaw | NanoBot | IronClaw |
|---|---|---|---|---|---|
| **Primary focus** | General-purpose agent reference impl | Security-hardened, multi-tenant deployment | Consumer/creator agent (script-to-video) | Modular provider + channel integration | Enterprise subscription agent (Reborn) |
| **Target user** | Individual developers, self-hosters | Enterprises, security-conscious ops | Content creators, non-technical users | Developers integrating AI into messaging | End-users paying for SaaS agent |
| **Key architectural choice** | Monorepo, canonical core | Provider unification + goal runtime | Loop-optimized reasoning + Qwen integration | Session-scoped presets, modular channels | ProductSurface facade, extension runtime |
| **Deployment model** | Local gateway, Ollama, systemd | Linux-first, Landlock-contrained | Docker, CLI, Windows | WebUI, messaging channels, PWA | SaaS, container-supervised (NEAR AI) |
| **Language/framework** | Go/Rust (implied) | Rust | Python (Qwen ecosystem) | TypeScript/Node.js | Rust (ironclaw_outbound crate) |
| **Community contribution model** | Community-driven (59% open issues) | Maintainer bottleneck (0 PRs merged today) | Fast merge of first-time contributors | Strong contributor velocity (38 merges) | QA-driven, foundation record-keeping |
| **Risk profile** | High regression rate, review bottleneck | High backlog, stalled PRs | Post-release crash bug (#6376) | Moderate, well-targeted fixes | Pre-launch, UX gaps remain |

**Key insight**: No project occupies the same niche. OpenClaw is the most feature-complete but most burdened; Zeroclaw is the security-first alternative but slow to ship; CoPaw is the most user-focused with the fastest contributor onboarding; NanoBot is the most modular/integration-heavy; IronClaw is the only SaaS-oriented project. There is no direct duplication of core architecture or target audience.

---

## 6. Community Momentum & Maturity

**Tier 1: Rapidly iterating (high churn, high regression risk)**
- **OpenClaw** – Highest absolute activity, most regressions, largest community. In "rapid development phase" with 204 merges today but 296 open PRs. The 7+ month old #75 (desktop apps) signals that even high-demand features get deferred when maintainers are overwhelmed.
- **Zeroclaw** – 0 merges today despite 50 PRs updated. The "accepted but unassigned" label on multiple issues (e.g., #7462, #5808, #5937) indicates a systematic bottleneck. The stacked goal-runtime PRs (#8687–#8996) are all blocked on author action.
- **CoPaw** – Post-release v2.0.0.post4 with high merging velocity (16 PRs) but a critical crash bug (#6376) and mounting feature requests. The rapid merges of first-time contributor PRs suggest an intentional onboarding strategy, but release quality is suffering.

**Tier 2: Stabilizing (foundation complete, UX polish underway)**
- **IronClaw** – 25 merges, 14 issues closed (mostly retrospective "Completed foundation" records). The v1-launch-checklist QA is surfacing real UX gaps (Telegram, OAuth), but the ProductSurface architecture and extension runtime are delivered. This is the closest to a "ship ready" state.
- **NanoBot** – 38 merges (highest volume after OpenClaw) with no P0 bugs. Community contributions are strong, and the multi-agent collaboration proposal (#5000) signals a planned roadmap. Model presets session-scoping (#4866) is a maturing design choice.
- **NullClaw** – Closed two critical Discord gateway bugs with one PR. Minimal activity but targeted fixes; appears stable.

**Tier 3: Maintenance / low activity**
- **PicoClaw** – Two stale PRs (#3163, #3222) unmerged for weeks. Hook bug (#3258) unacknowledged. Activity is moderate but maintainer responsiveness is poor.
- **LobsterAI** – Cleaned entire backlog today (5 PRs merged, 1 stale issue closed). Healthy but low volume; appears to be in a maintenance window.
- **NanoClaw** – Security doc concern (#3118) unresolved, Telegram rich formatting PR (#2877) open 25 days. Community engagement minimal.
- **Moltis** – Single open UI PR, no community interaction. Dormant.

**Dormant**: TinyClaw, ZeptoClaw, EasyClaw – no activity.

---

## 7. Trend Signals

**1. Security hardening is the top unmet need across the ecosystem.** OpenClaw's #13583 (hard enforcement hooks) and #10659 (masked secrets), Zeroclaw's #5775 (per-skill permissions) and #5842 (Codex sandbox warnings), and NanoClaw's #3118 (credential isolation documentation) all point to the same conclusion: production deployments require mechanical gates, not soft prompts. Projects that ship masked secrets and enforcement hooks first will gain enterprise trust.

**2. Multi-agent collaboration is the next architectural frontier.** NanoBot's #5000 (subagent → multi-agent proposal) and OpenClaw's session lineage model (#111861) and subagent output fix (#90840) indicate that the ecosystem is moving beyond single-agent chat toward persistent agent hierarchies with shared state. This is a 6–12 month structural shift; no project has shipped a complete solution.

**3. Cross-platform gaps are becoming critical blockers.** OpenClaw's #75 (80 👍) and Zeroclaw's #7462 (74 Windows test failures) show that the macOS-first assumption is alienating large user bases. Projects that deliver Linux/Windows desktop parity and CI-parity testing will capture significant mindshare.

**4. Performance wins matter more than feature depth at this stage.** CoPaw's #6307 (~2s overhead regression), OpenClaw's #85333 (4–5× `doctor --fix` slowdown), and NanoBot's #5036 (30–40% CPU on Raspberry Pi) show users are feeling the pain of accumulated architectural complexity. The next phase of ecosystem maturity will likely reward projects that optimize startup time, idle resource usage, and context budget efficiency over adding new channels or plugins.

**5. Provider diversity drives fragmentation but also innovation.** The schema compatibility issues across NanoBot (#5040, $ref rejection), CoPaw (#6363, markdown in tool calls; #6358, system role placement), and OpenClaw (#108580, cron schema) reveal that the ecosystem is struggling to standardize tool-calling interfaces across providers (Kimi, Moonshot, GLM, DeepSeek, Claude). A standardized provider adapter layer could become a key differentiator for any project that builds it.

**6. Developer experience (API-first, CLI, CI) is increasingly valued.** IronClaw's ProductSurface routing and OpenClaw's release validation CI (#112841) and readiness conditions (#104018) reflect a shift from "does it work?" to "can I deploy, monitor, and automate it?" The requests for per-job model overrides (CoPaw #6316) and programmatic API access (CoPaw #6377) confirm that power users want to integrate AI agents into larger workflows.

**For AI agent developers**: The ecosystem is still in a "build fast and break things" phase, but the window for poor stability is closing. Developers should prioritize projects with active regression fixes and strong contributor velocity (NanoBot, IronClaw) over the most feature-rich (OpenClaw) unless they have the operational capacity to manage frequent updates. Multi-agent and security features are worth tracking but not yet production-ready across any project. Cross-platform support remains a gap—Linux and Windows developers may need to use gateway-only modes or containerized deployments until desktop parity arrives.

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot Project Digest – 2026-07-23

## 1. Today's Overview
NanoBot saw very high development activity over the last 24 hours, with **61 pull requests** updated (**38 merged/closed**, 23 open) and **5 issues** updated (4 open, 1 closed). No new releases were published. The project continues to accelerate, with a strong focus on provider integrations (xAI Grok OAuth), channel improvements (Telegram multi-bot, Feishu, DingTalk), WebUI performance, and bug fixes across cron, Slack, and Feishu. Community contributions are prominent, especially from maintainers and regular contributors.

## 2. Releases
*No new releases in the last 24 hours.* The last available release remains the one prior to this date.

## 3. Project Progress
**38 pull requests were merged or closed** in the last 24 hours. Notable merges include:

- **[PR #4866 – feat(agent): make model presets session‑scoped](https://github.com/HKUDS/nanobot/pull/4866)** (merged, priority p1) – a significant change that makes model‑preset selection session‑scoped, persists only explicit per‑session overrides, and ensures consistent `LLMRuntime` usage across the turn lifecycle.
- Several bug‑fix PRs landed, hardening the pairing module, cron store, and Feishu/Slack markdown rendering (see §6).

Many open PRs are close to merging, including those for xAI Grok OAuth ([#5035](https://github.com/HKUDS/nanobot/pull/5035)), Telegram multi‑bot ([#5033](https://github.com/HKUDS/nanobot/pull/5033)), and WebUI fallback model display ([#5017](https://github.com/HKUDS/nanobot/pull/5017)).

## 4. Community Hot Topics
The most active discussion this period centers on **multi‑agent collaboration**:

- **[Issue #5000 – Proposal: evolve the current subagent system toward multi‑agent collaboration](https://github.com/HKUDS/nanobot/issues/5000)** (open, 4 comments) – the only issue with multiple comments. The author argues that subagents lack persistent identities and shared task state, and proposes a more flexible multi‑agent architecture. This signals strong community interest in deeper agent‑coordination features.

Other open issues have received zero comments, indicating that the community is focused on the active PR ecosystem rather than issue threads.

## 5. Bugs & Stability
Several bugs were reported and are being addressed with dedicated fix PRs. Ranked by severity:

1. **[Issue #5041 – Bug: completed no‑op Dream batches can starve all later history](https://github.com/HKUDS/nanobot/issues/5041)** (open, high severity) – a clean Dream run without durable‑memory diff fails to advance `.dream_cursor`, causing the same batch to be selected repeatedly and starving later history entries. No fix PR yet, but is distinct from known #4055.

2. **[Issue #5040 – MCP tool schema with non‑`#/$defs/` $ref forwarded verbatim — one tool disables entire model on strict providers](https://github.com/HKUDS/nanobot/issues/5040)** (open, high severity) – Kimi/Moonshot (Moonshot) providers reject self‑referential `$ref` schemas, blocking the entire model. No fix PR yet; likely requires schema transformation.

3. **[Issue #5028 – media路径和workspace限制冲突](https://github.com/HKUDS/nanobot/issues/5028)** (open, medium severity) – files uploaded via Feishu are stored outside the workspace‑restricted area, causing access failures when workspace limits are enabled. Native speaker report, likely impacts Feishu users.

4. **[Issue #4948 – WebUI loses visibility when late subagent completion starts a system turn](https://github.com/HKUDS/nanobot/issues/4948)** (closed, fixed) – the bug was resolved, likely via a recent merge.

Recent fix PRs that address stability:

- **[PR #5044 – fix(pairing): treat null approved channel lists as empty](https://github.com/HKUDS/nanobot/pull/5044)** (open, priority p1) – prevents crash on `null` channel entries.
- **[PR #5043 – fix(cron): skip null runHistory elements when loading jobs.json](https://github.com/HKUDS/nanobot/pull/5043)** (open, priority p1) – avoids `TypeError` quarantine of entire cron store.
- **[PR #5042 – fix(cron): default null schedule when loading jobs.json](https://github.com/HKUDS/nanobot/pull/5042)** (open, priority p1) – prevents drop of sibling jobs on null schedule.
- **[PR #5045 – fix(slack): keep fenced markdown tables intact](https://github.com/HKUDS/nanobot/pull/5045)** (open, priority p2) – prevents table corruption inside code fences.
- **[PR #5046 – fix(feishu): keep fenced markdown tables out of card tables](https://github.com/HKUDS/nanobot/pull/5046)** (open, priority p2) – equivalent fix for Feishu.

## 6. Feature Requests & Roadmap Signals
Several feature requests and proposals landed in the last 24 hours, pointing toward the next minor version:

- **[Issue #5000](https://github.com/HKUDS/nanobot/issues/5000)** – **multi‑agent collaboration** from subagent evolution. Likely to influence the agent roadmap in subsequent releases.
- **[PR #5035](https://github.com/HKUDS/nanobot/pull/5035)** – **xAI Grok OAuth** with capability‑gated X Search. New provider support for `grok‑4.5`.
- **[PR #5033](https://github.com/HKUDS/nanobot/pull/5033)** – **Telegram multi‑bot** in WebUI, with per‑bot token validation and configuration.
- **[PR #5047](https://github.com/HKUDS/nanobot/pull/5047)** – **Parallel Search MCP preset** (free, no API key) – a quick win for search capabilities.
- **[PR #5036](https://github.com/HKUDS/nanobot/pull/5036)** – **configurable idle compaction scan interval** – directly addresses user feedback on Raspberry Pi CPU usage.
- **[PR #5009](https://github.com/HKUDS/nanobot/pull/5009)** – **Feishu groupPolicy: listen** – context‑only group ingest without an LLM turn.

Predictions: the next release will likely include **xAI Grok provider**, **Telegram multi‑bot**, the **Feishu listen mode**, and the **idle compaction tuning**. Multi‑agent collaboration (#5000) is more structural and may take longer.

## 7. User Feedback Summary
Real user pain points emerged from issues and PR comments:

- **CPU usage on Raspberry Pi** ([PR #5036](https://github.com/HKUDS/nanobot/pull/5036)) – the idle compaction scan consumes 30‑40% CPU on low‑power devices. Contributor khmylov proposed making the interval configurable.
- **Feishu file path conflict** ([Issue #5028](https://github.com/HKUDS/nanobot/issues/5028)) – files uploaded via Feishu not respecting workspace restrictions, causing feedback loops (“无法读取之前上传的文件”).
- **MCP schema incompatibility** ([Issue #5040](https://github.com/HKUDS/nanobot/issues/5040)) – strict LLM providers (Kimi/Moonshot) reject self‑referential `$ref` schemas, blocking tool usage entirely.
- **Dream batch starvation** ([Issue #5041](https://github.com/HKUDS/nanobot/issues/5041)) – not advancing cursor after no‑op runs can halt history processing indefinitely.

Overall dissatisfaction is moderate, with dedicated PRs addressing some issues. No strong positive feedback recorded in the last 24h.

## 8. Backlog Watch
Several important open PRs and issues have been waiting for maintainer attention for weeks or months:

| Item | Age | Status | Notes |
|------|-----|--------|-------|
| [#2584 – Feature/xiaozhi support](https://github.com/HKUDS/nanobot/pull/2584) | ~4 months (Mar 28) | Open, conflict label | Xiaozhi voice gateway + ESP32 MCP tools. Stalled; needs rebase and review. |
| [#4439 – feat(tools): add read‑only search_history tool](https://github.com/HKUDS/nanobot/pull/4439) | ~1 month (Jun 21) | Open, conflict label | Recalling memory via search. Still conflicts with `main`. |
| [#4689 – feat(providers): surface OAuth status and expiry warnings](https://github.com/HKUDS/nanobot/pull/4689) | ~20 days (Jul 3) | Open, conflict label | Adds status visibility for OAuth providers. Awaiting merge. |
| [#4494 – feat(webui): PWA support and mobile swipe gesture](https://github.com/HKUDS/nanobot/pull/4494) | ~1 month (Jun 24) | Open, conflict label | Mobile enhancements. Branch was deleted once and reopened. |
| [#4446 – feat(dingtalk): gate private chats and mention sender](https://github.com/HKUDS/nanobot/pull/4446) | ~1 month (Jun 22) | Open | Two DingTalk improvements, no conflict label but still open. |

These items indicate that the maintainer team is currently prioritizing provider/channel integrations and critical bug fixes over older feature branches. The “conflict” labels suggest many need manual rebase to stay mergeable.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw Project Digest — 2026-07-23

## 1. Today’s Overview
The project remains highly active with **50 issues** and **50 PRs** updated in the past 24 hours. While no new releases were published and **zero PRs were merged**, the community continues to drive forward a large volume of work — 40 of the updated issues remain open. Notable activity clusters around **security hardening**, **Windows compatibility**, **provider architecture refactoring**, and the **goal runtime** feature set. The stable issue backlog contains several high-priority items that have been accepted but remain unassigned, indicating a healthy but resource-constrained development pace.

## 2. Releases
No new releases were cut today. The latest release on GitHub remains unknown (no release data provided).

## 3. Project Progress
**No pull requests were merged or closed today** (0 merged/closed out of 50 updated PRs). However, **10 issues were closed** in the last 24h, suggesting that some work items reached resolution via external commits or maintainer action. Notable closed issues:
- [#6641](https://zeroclaw-labs/zeroclaw/issues/6641) — Turn-level OTel trace correlation (enhancement, risk:medium)
- [#6289](https://zeroclaw-labs/zeroclaw/issues/6289) — Prompt-triggered install suggestions for missing skills (enhancement, risk:high)
- [#6557](https://zeroclaw-labs/zeroclaw/issues/6557) — Reconcile runtime model switching with provider structure (enhancement, risk:medium)
- [#5840](https://zeroclaw-labs/zeroclaw/issues/5840) — Multi-chunk reasoning replay fidelity for streamed tool turns (enhancement, risk:medium)
- [#5752](https://zeroclaw-labs/zeroclaw/issues/5752) — Replace hardcoded provider timeout values with configurable parameters (enhancement, risk:medium)

These closures indicate progress in observability, skill discoverability, model switching, provider reliability, and streaming tool fidelity.

## 4. Community Hot Topics
The most active discussions (highest comment counts) center on critical architectural and stability issues:

- **[#5937](https://zeroclaw-labs/zeroclaw/issues/5937)** (12 comments, risk:high) — *Refactor: Unify providers architecture and reqwest client management*. This long-running enhancement (accepted since April) has widespread implications for how all AI providers manage HTTP clients and configuration. The open 12-comment thread suggests the scope is still being debated.

- **[#7462](https://zeroclaw-labs/zeroclaw/issues/7462)** (12 comments, risk:high) — *74 test failures on Windows — Unix-only test commands, path semantics, console encoding*. A high-severity bug (S2) blocking CI coverage on Windows. The issue has been active since June and remains open despite the maintainer tag “accepted”. Community concern is high given the impact on cross-platform support.

- **[#5982](https://zeroclaw-labs/zeroclaw/issues/5982)** (10 comments, risk:high) — *Per-sender RBAC for multi-tenant agent deployments*. A requested feature that would allow a single ZeroClaw instance to serve multiple user classes with isolated workspaces. The proposal is detailed and has garnered steady discussion.

- **[#5808](https://zeroclaw-labs/zeroclaw/issues/5808)** (9 comments, risk:high) — *Defer built-in tool schemas to reduce the fixed prompt floor*. A workflow-blocking (S1) issue where default context budget is exceeded by 3.3× on first LLM iteration due to tool schema overhead. This is a performance-critical request.

Among PRs, several large cross-cutting changes (all with `size:XL`) are drawing attention but have no comments listed in the data:
- [#8996](https://zeroclaw-labs/zeroclaw/pull/8996) — *fix(goal): preserve running goals across daemon reload*
- [#8746](https://zeroclaw-labs/zeroclaw/pull/8746) — *fix(goal): stop active goal self-resume loops*
- [#8689](https://zeroclaw-labs/zeroclaw/pull/8689) — *feat(channels): add goal command admission*
- [#8688](https://zeroclaw-labs/zeroclaw/pull/8688) — *feat(runtime): add trusted goal tools and delegation boundaries*

These four PRs form a stacked goal‑runtime overhaul. They all carry the `needs-author-action` label, indicating the author has yet to address reviewer feedback. Their sheer scope (size:XL, risk:high) makes them critically important to the roadmap.

## 5. Bugs & Stability
Several new or freshly active bugs threaten stability:

- **Critical (risk:high)**  
  - [#7462](https://zeroclaw-labs/zeroclaw/issues/7462) — 74 test failures on Windows (S2 degraded behavior). No fix PR yet.  
  - [#6724](https://zeroclaw-labs/zeroclaw/issues/6724) — Enabled Signal/Voice Call channel with empty credentials can crashloop the supervisor. Accepted but no fix PR.  
  - [#5869](https://zeroclaw-labs/zeroclaw/issues/5869) — Security advisory cluster from rumqttc transitive dependency (RUSTSEC), status `blocked`. No fix PR.  
  - [#9235](https://zeroclaw-labs/zeroclaw/issues/9235) — npm audit failed with 3 high/critical findings in @redocly/openapi-core. PR [#9270](https://zeroclaw-labs/zeroclaw/pull/9270) submitted to fix this.  
  - [#6548](https://zeroclaw-labs/zeroclaw/issues/6548) — Channel runtime command replies bypass Fluent localization (S3 minor, but affects all non-English users). No fix PR yet.

- **Fix PRs in progress**  
  - [#9233](https://zeroclaw-labs/zeroclaw/pull/9233) (risk:high, size:M) — Fix Landlock restricting ZeroClaw daemon itself; currently open.  
  - [#9197](https://zeroclaw-labs/zeroclaw/pull/9197) (risk:medium, size:XS) — Prevent channel supervisor restart loop during Ctrl+C shutdown.  
  - [#9056](https://zeroclaw-labs/zeroclaw/pull/9056) (risk:medium, size:M) — Surface cause-specific provider failure diagnostics (fix for #9001).  
  - [#9153](https://zeroclaw-labs/zeroclaw/pull/9153) (risk:medium, size:S) — Fix Matrix voice message transcription not being enabled.  
  - [#9180](https://zeroclaw-labs/zeroclaw/pull/9180) (risk:medium, size:XS) — Propagate msg_id on QQ group replies to prevent permission errors.

- **Security**  
  - [#5842](https://zeroclaw-labs/zeroclaw/issues/5842) — Warn when Codex CLI `extra_args` weaken sandbox boundaries (accepted, risk:high).  
  - [#5775](https://zeroclaw-labs/zeroclaw/issues/5775) — Per-skill security permissions for `allow_scripts` / `allowed_commands` (accepted, risk:high).  
  - [#6250](https://zeroclaw-labs/zeroclaw/issues/6250) — Enforce gateway config authentication at route layer (P1, risk:high). All lack assigned PRs.

## 6. Feature Requests & Roadmap Signals
The most frequently requested capabilities (often with accepted label) that are likely to land in the next release (v0.9.0 or later):

- **Provider & Config Unification** — #5937 (unify providers architecture) and #6557 (model switching reconciliation) are central to v0.8.0 hardening. Both were accepted; #6557 already closed.
- **Multi-Tenant RBAC** — #5982 (per-sender RBAC) is a major security enhancement for enterprise deployments.
- **Prompt Floor Reduction** — #5808 (defer tool schemas) is critical for users of smaller context windows.
- **Skills & Plugin Discovery** — #6289 (prompt-triggered install suggestions) was closed, suggesting it may have been implemented.
- **PDF Reading** — #5745 (safely fetch remote PDFs for bounded reading) remains open with risk:high.
- **Tool Cancellation** — #5836 (cooperative cancellation for tool execution) addresses a UX pain point.
- **LSP Support** — #5907 (opt-in LSP for coding workflows) is a long-standing RFC.
- **Node Fleet Management** — #6390 (CLI to register remote daemons) and #6391 (real heartbeat tracking) indicate a push toward multi-machine deployments.
- **Hailo-Ollama Native Support** — PR [#9109](https://zeroclaw-labs/zeroclaw/pull/9109) (size:XL, risk:high) would add hardware-accelerated local inference.
- **Anthropic Refusals** — PR [#9262](https://zeroclaw-labs/zeroclaw/pull/9262) surfaces native safety refusals as typed errors, improving reliability with Anthropic models.

Based on issue acceptance and open PRs, **v0.9.0 is likely to include**: unified provider architecture, prompt floor reduction (deferred schemas), per-skill security permissions, gateway auth middleware, and goal runtime features (admission, controller, verifier). The stacked PR series by vrurg [#8687–#8996](https://zeroclaw-labs/zeroclaw/pulls?q=author%3Avrurg) is a strong candidate for the next major release.

## 7. User Feedback Summary
Pain points and use cases expressed in the top issues:

- **Cross‑Platform Gaps** — The 74 Windows test failures ([#7462](https://zeroclaw-labs/zeroclaw/issues/7462)) frustrate Windows users and block CI parity. The issue has 12 comments, indicating strong community interest.
- **Context Budget Exceeded** — Users with smaller context windows (e.g., 32K) are blocked on first conversation turn ([#5808](https://zeroclaw-labs/zeroclaw/issues/5808)). The proposed deferring of built‑in tool schemas would help but hasn’t been implemented.
- **Configuration Discovery** — Users find it hard to discover available skills and plugins ([#6289](https://zeroclaw-labs/zeroclaw/issues/6289), closed). The closure suggests a solution (e.g., install suggestions) may now be live.
- **Localization Deficiencies** — Non‑English users see hard‑coded English strings in channel runtime replies ([#6548](https://zeroclaw-labs/zeroclaw/issues/6548)).
- **Crash‑Loop UX** — Enabling Signal or Voice Call channels without credentials causes the supervisor to restart every ~2 seconds ([#6724](https://zeroclaw-labs/zeroclaw/issues/6724)).
- **TUI Editing** — Users want arrow‑key navigation and alias renaming in Zerocode TUI ([#7467](https://zeroclaw-labs/zeroclaw/issues/7467), [#7468](https://zeroclaw-labs/zeroclaw/issues/7468)) — both open with risk:medium.
- **LM Studio Flexibility** — Users need configurable LM Studio server URLs (not hardcoded localhost) for remote or non‑standard setups ([#6260](https://zeroclaw-labs/zeroclaw/issues/6260)).
- **Goal Runtime** — The parallel PR stack by vrurg addresses user requests for persistent goals across daemon reload and self‑resume prevention — a high‑demand feature.

Overall sentiment is **constructive but impatient**: many high‑risk features have been accepted for months without a dedicated implementation. The community is actively contributing PRs to close those gaps.

## 8. Backlog Watch
Several important items are languishing with no assignee or recent movement:

- **#5869** — *security: rumqttc dependency advisory cluster* (created April 18, status `blocked`). This blocks `cargo deny` and exposes the project to known CVEs. No PR or assignee.
- **#5842** — *Warn when Codex CLI extra_args weaken sandbox* (accepted April 17, risk:high). No PR activity.
- **#5775** — *Per‑skill security permissions* (accepted April 15, risk:high). No PR.
- **#5907** — *RFC: Opt‑in LSP support* (created April 19). No implementation yet.
- **#5745** — *Safely fetch remote PDFs* (created April 15). No PR.
- **#5836** — *Cooperative cancellation for tools* (created April 17). No PR.
- **#6390** and **#6391** — Node CLI and heartbeat tracking (created May 5). Both accepted but no PR.
- **#6250** — *Enforce gateway authentication at route layer* (P1, risk:high, created May 1). No PR despite being labeled `quickstart`.

**PRs needing author action** (labeled `needs-author-action`):  
- #8996, #8746, #8689, #8687, #8688 (all by vrurg, large goal changes)  
- #9075, #9056, #8966, #9109, #9153, #9180 — various fixes and providers waiting on author updates.

These represent the biggest risk to delivery if authors fail to respond, but also the highest opportunity for progress if they do.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw Project Digest — 2026-07-23

## 1. Today's Overview
Project activity remains moderate with 3 issues and 5 pull requests updated in the last 24 hours. No new releases were published. Two PRs were merged or closed: one fixing a Go vulnerability scanning issue and another reverting a documentation error. The community is raising both bugs and feature requests, though maintainer responses appear slow on older items. The backlog contains two significant PRs that have been open for weeks without maintainer action.

## 2. Releases
No new releases were published today.

## 3. Project Progress
**Merged/Closed PRs today:**
- [#3286](https://github.com/sipeed/picoclaw/pull/3286) — `fix: update Go and x/text for govulncheck` (merged). A security-related dependency update to resolve `govulncheck` findings.
- [#3285](https://github.com/sipeed/picoclaw/pull/3285) — `docs: remove picopaw` (closed). Reverts a previous documentation change (PR #3096) to correct an error.

**Open PRs with recent updates:**
- [#3283](https://github.com/sipeed/picoclaw/pull/3283) — `fix(dingtalk): support picture/image message inbound`. Adds image message handling for DingTalk channel. Open since 2026-07-22.

No major features were merged today. The two stale PRs (see Backlog Watch) represent significant work still awaiting review.

## 4. Community Hot Topics
- **[Issue #3258](https://github.com/sipeed/picoclaw/issues/3258) — [BUG] Process Hook before_tool modify not working** (1 comment, open since 2026-07-15). The user reports that tool hooks fail due to deserialization errors, discarding the `decision` field and misparsing arguments. This is a functional blocker for users relying on custom hooks.
- **[Issue #3257](https://github.com/sipeed/picoclaw/issues/3257) — Add stateless/no-history mode for gateway sessions** (1 comment, open since 2026-07-15). A request to allow fresh conversations in gateway mode (similar to `picoclaw agent --session`). The user explains the limitation when using `picoclaw gateway` with channel-based sessions.
- **[Issue #3287](https://github.com/sipeed/picoclaw/issues/3287) — Better support long messages in IRC** (0 comments, opened 2026-07-22). User asks for IRCv3 long message reassembly since IRC splits messages at 512 bytes.

These issues highlight real-world usage friction around hooks, session management, and cross-channel message handling.

## 5. Bugs & Stability
| Severity | Bug | Status | Fix PR? |
|----------|-----|--------|---------|
| **High** | [#3258](https://github.com/sipeed/picoclaw/issues/3258) — `before_tool` hook fails: decision field discarded, args misparsed | Open, stale (labeled `[stale]`) | None yet |
| **Low** | [#3286](https://github.com/sipeed/picoclaw/pull/3286) — Go vulnerability (addressed by dependency update) | Merged | Yes (merged) |
| **Medium** | [#3283](https://github.com/sipeed/picoclaw/pull/3283) — DingTalk image support (new feature, not a regression) | Open | Under review |

No crash or regression was reported today. The hook bug (#3258) is the most critical, as it impacts a core extensibility mechanism.

## 6. Feature Requests & Roadmap Signals
Community-requested features from issues:
- **Stateless gateway sessions** ([#3257](https://github.com/sipeed/picoclaw/issues/3257)) — likely to be addressed in a future release given its simplicity.
- **IRC long message reassembly** ([#3287](https://github.com/sipeed/picoclaw/issues/3287)) — a channel-specific enhancement.

Features already in progress via open PRs:
- **AWS Bedrock prompt caching** ([PR #3163](https://github.com/sipeed/picoclaw/pull/3163)) — uses Converse API cache points for cost savings. Open since 2026-06-23, stale.
- **DeltaChat refactor** ([PR #3222](https://github.com/sipeed/picoclaw/pull/3222)) — drops legacy code, renames methods, updates documentation. Open since 2026-07-03, stale.

These two PRs are strong candidates for the next minor release if maintainers review and merge them.

## 7. User Feedback Summary
Users are actively deploying PicoClaw in production-like environments (Telegram, IRC, DingTalk, gateway). Key pain points:
- **Tool hooks broken** (#3258) — affects custom workflows and automation.
- **No clean way to statelessly use the gateway** (#3257) — forces workarounds or history accumulation.
- **IRC message handling** (#3287) — needs proper reassembly for coherence.

Satisfaction is not directly measured, but the presence of detailed bug reports and feature requests suggests an engaged user base willing to invest time in improving the project.

## 8. Backlog Watch
Two important PRs have been open for weeks with no maintainer response:
- **[PR #3163](https://github.com/sipeed/picoclaw/pull/3163) — feat(bedrock): leverage Converse prompt caching** (open since 2026-06-23, last updated 2026-07-22). Labelled `[stale]`. Adds significant optimization for AWS Bedrock users.
- **[PR #3222](https://github.com/sipeed/picoclaw/pull/3222) — refactor(deltachat): cleanup implementation** (open since 2026-07-03, last updated 2026-07-22). Labelled `[stale]`. Reduces codebase by ~200 lines and improves DeltaChat integration.

Both need maintainer review or feedback to avoid being abandoned. Additionally, the hook bug ([#3258](https://github.com/sipeed/picoclaw/issues/3258)) and stateless mode request ([#3257](https://github.com/sipeed/picoclaw/issues/3257)) have only received one comment each and would benefit from maintainer acknowledgment or triage.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw Project Digest — 2026-07-23

## 1. Today’s Overview
Activity remains very low over the past 24 hours, with only one open issue and three open pull requests receiving updates but no items closed or merged. No new releases were published. The project appears to be in a quiet maintenance phase, with contributors focusing on polishing existing features rather than shipping new milestones. The single security-related issue and several long-running PRs suggest that developer attention is spread across documentation accuracy and feature integration.

## 2. Releases
*No new releases were published in the last 24 hours.*

## 3. Project Progress
**No pull requests were merged or closed today.** The three updated PRs all remain open:
- **#3070** (Fix WhatsApp sender identity divergence) – Last updated 2026-07-22, awaiting review/merge.
- **#3117** (feat: add-omarchy-statusbar – Waybar status indicator) – New utility skill submitted, needs maintainer feedback.
- **#2877** (feat: Telegram native rich rendering via sendRichMessage) – Open since June 28, updated yesterday but still not merged.

While no code was integrated, the continued activity on these PRs signals ongoing community contributions.

## 4. Community Hot Topics
Because all items carry zero comments and zero reactions, community engagement remains minimal. The most notable discussions (by recency of update) are:

- **Issue #3118** – *SECURITY.md overclaims per-group credential isolation*  
  [nanocoai/nanoclaw#3118](https://github.com/nanocoai/nanoclaw/issues/3118)  
  Filed by bradfeld, this issue points out a factual inaccuracy in the project’s security documentation regarding OAuth credential isolation on self-hosted OneCLI gateways. Although it has no comments yet, the topic touches on trust and correctness of security claims, which is critical for self-hosted users.

- **PR #2877** – *feat(telegram): native rich rendering via Bot API 10.1 sendRichMessage*  
  [nanocoai/nanoclaw#2877](https://github.com/nanocoai/nanoclaw/pull/2877)  
  A feature that has been open for nearly a month and received its last update yesterday. It would enable rich message formatting in Telegram, a frequent user request.

## 5. Bugs & Stability
**No new bugs, crashes, or regressions were reported today.**  
The only active issue (#3118) is a documentation inaccuracy rather than a runtime bug. It is low severity but has implications for user trust in security features. No fix PR exists yet.

## 6. Feature Requests & Roadmap Signals
- **PR #3117** – *Waybar status indicator* – A utility skill that adds a system status bar widget for NanoClaw. Useful for power users running agents locally. Likely to be merged if it passes review, as it doesn’t touch core code.
- **PR #2877** – *Telegram rich rendering* – A significant enrichment of the Telegram channel. Its long open duration suggests complexity or maintainer bandwidth constraints, but it remains a strong candidate for the next release.
- **PR #3070** – *WhatsApp sender identity fix* – Addresses a consistency issue between native and cloud WhatsApp paths. This is more of a bug fix than a feature, but it improves reliability.

No roadmap items or version targets were mentioned in the data.

## 7. User Feedback Summary
User feedback is scarce in the provided data. The only direct user input comes from the issue author bradfeld, who expressed concern about misleading security documentation. This may reflect a broader pain point among self-hosted users who rely on accurate isolation guarantees. The lack of comments/reactions elsewhere suggests either a small active user base or that most users are satisfied with the current state of the project.

## 8. Backlog Watch
Two open PRs have remained unanswered for an extended period and may require maintainer attention:

| Item | Created | Last Updated | Summary |
|------|---------|--------------|---------|
| **PR #2877** – Telegram rich rendering | 2026-06-28 | 2026-07-22 | Feature has been open 25 days, no maintainer review. |
| **PR #3070** – WhatsApp identity fix | 2026-07-16 | 2026-07-22 | Bug fix open 7 days; no feedback from core team. |

Both PRs are properly formatted and follow guidelines. Reviewing and either merging or providing constructive feedback would reduce contributor friction and demonstrate project responsiveness.

---

*Generated from GitHub data provided for NanoClaw (github.com/nanocoai/nanoclaw) as of 2026-07-23.*

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw Project Digest — 2026-07-23

## 1. Today's Overview
NullClaw saw low but focused activity in the last 24 hours, with one issue closed and one pull request closed, both addressing critical Discord gateway reliability problems. No new releases were published. The project remains in a maintenance phase, resolving two severe runtime defects that could cause bots to go permanently deaf or crash. Overall health is stable but warrants attention to latent connectivity issues.

## 2. Releases
*No new releases today.*

## 3. Project Progress
One pull request was merged/closed today:

- **PR #978** ([link](nullclaw/nullclaw PR #978)) — *discord: run typing thread on the heavy runtime stack*  
  Fixes a process abort caused by the typing-indicator thread using an undersized stack (512 KB) while performing HTTPS requests (TLS handshake with large memcpys). The fix moves the thread to the heavy runtime stack, preventing crashes on typing events.

## 4. Community Hot Topics
Only two items were updated in the last 24 hours, both closed with low engagement (1 comment each). The underlying issue is Discord real-time event handling reliability.

- **Issue #977** ([link](nullclaw/nullclaw Issue #977)) — *Discord gateway goes permanently deaf after exactly one MESSAGE_CREATE*  
  The bot handles the first inbound message, responds, then silently stops dispatching further events. Heartbeats continue, but no new events are processed until a restart. This was reported as 100% reproducible. The underlying need is a robust event loop that does not silently drop frames.

- **PR #978** (same as above) — while not directly fixing the deafness bug, it addresses a related crash scenario; community interest centered on runtime stability.

## 5. Bugs & Stability
| Bug | Severity | Status | Fix PR |
|-----|----------|--------|--------|
| Discord gateway goes permanently deaf after one MESSAGE_CREATE (#977) | **Critical** – bot loses all functionality without warning | **Closed** (fixed, though no details on resolution provided in data) | Unknown (not linked in PR #978) |
| Typing thread crash due to 512 KB stack overflow (#978) | **High** – process abort on typing events | **Closed** with fix merged | PR #978 |

Both bugs affect core Discord bot functionality. The deafness issue (#977) is especially severe because it is silent and requires a restart. No regression or new crash was reported today.

## 6. Feature Requests & Roadmap Signals
No explicit feature requests were opened today. The two recent closures focus on reliability, suggesting the immediate roadmap is hardening the Discord gateway and thread stack management. Future versions may include configurable event queue buffering or watchdog timers to detect silent failures.

## 7. User Feedback Summary
- **Pain points**: Users report bots becoming unresponsive without visible errors (Issue #977) and unexpected crashes when typing indicators are used (PR #978).
- **Use cases**: Running long-lived Discord bots that must remain responsive to all event types.
- **Satisfaction**: Mixed – both issues were promptly acknowledged and closed, but the underlying fragility of gateway event handling may erode confidence.

## 8. Backlog Watch
No long-unanswered issues or PRs were explicitly highlighted in today's data. However, maintainers should monitor for any reopened reports related to gateway event loss, as the root cause of #977 (how it was fixed) is not documented in the available data. A future regression or incomplete fix could resurface.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-07-23

## 1. Today’s Overview

The IronClaw project saw high activity over the past 24 hours, with 50 issues and 50 PRs updated and a balanced mix of both open and closed work (14 issues closed, 25 PRs merged/closed). The bulk of closures came from a wave of “Completed foundation” issues filed by BenKurrek, formally recording the delivery of key subsystems (e.g., Telegram support, extension runtime, OAuth hardening, memory lifecycle) that had already been merged in prior weeks. At the same time, the QA-driven **v1-launch-checklist** bug bash uncovered several blocking defects, especially around Telegram and Google OAuth configuration, and multiple PRs are already in flight to address them. No new releases were published today.

## 2. Releases

No new releases today.

## 3. Project Progress

Twenty-five pull requests were merged or closed in the last 24 hours, advancing the **ProductSurface** architecture refactor, test infrastructure, and CI improvements. Notable merged PRs include:

- **[PR #6538](https://github.com/nearai/ironclaw/pull/6538)** — Routes OpenAI-compatible Chat Completions and Responses through the new `ProductSurface` facade, replacing the old `ProductWorkflow` dependency.
- **[PR #6529](https://github.com/nearai/ironclaw/pull/6529)** — Moves the outbound delivery-target catalog into a dedicated `ironclaw_outbound` crate, separating neutral types from Reborn-specific adapters.
- **[PR #6480](https://github.com/nearai/ironclaw/pull/6480)** — Continues ProductSurface conversion for operator, project, admin, automation, and view APIs, adding API-only operator setup capabilities.
- **[PR #6441](https://github.com/nearai/ironclaw/pull/6441)** — Introduces the `ProductSurface` trait and migrates WebUI, auth, and composition bundle to depend on it rather than the old `RebornServicesApi`.
- **[PR #6535](https://github.com/nearai/ironclaw/pull/6535)** — Adds a pure turn/run lifecycle reference model with stateful operation coverage (submit, claim, resume, cancel, fail, race-claim, etc.).
- **[PR #6537](https://github.com/nearai/ironclaw/pull/6537)** — CI improvement: full Reborn test and E2E gates now run on `release-fix-*` PR branches.
- **[PR #6540](https://github.com/nearai/ironclaw/pull/6540)** — Adds runtime environment mask helpers to prevent ambient `NEARAI_*` variables from leaking into tests.
- **[PR #6444](https://github.com/nearai/ironclaw/pull/6444)** — Refreshes Reborn ProductSurface routing design documentation.

Additionally, a dozen infrastructure issues were formally closed as “Completed foundation” — these are retrospective records for changes that had already landed, covering Telegram channel support ([#6498](https://github.com/nearai/ironclaw/issues/6498)), generic extension runtime ([#6495](https://github.com/nearai/ironclaw/issues/6495)), per-user extension lifecycle ([#6513](https://github.com/nearai/ironclaw/issues/6513)), Slack routing reference ([#6505](https://github.com/nearai/ironclaw/issues/6505)), and more.

## 4. Community Hot Topics

- **[Issue #6284 — Error-recoverability endgame (epic)](https://github.com/nearai/ironclaw/issues/6284)**  
  *4 comments, 0 reactions*  
  Defines a contract that every mid-run error must be survivable, visible to the model, and actionable. This epic signals a strong push toward reliability; the lack of additional discussion suggests consensus.

- **[Issue #6105 — Extension/channel lifecycle state-machine test](https://github.com/nearai/ironclaw/issues/6105)**  
  *3 comments, 0 reactions*  
  Calls for automated testing of install→connect→disconnect→reconnect→uninstall flows, motivated by repeated regressions in Slack lifecycle across multiple QA waves. This reflects the team’s desire to lock down stability before launch.

Other issues with 1–2 comments include configurable skills/tools ([#5459](https://github.com/nearai/ironclaw/issues/5459)), capability admin parity ([#3288](https://github.com/nearai/ironclaw/issues/3288)), and several v1-launch checklist items. No PRs generated notable discussion today.

## 5. Bugs & Stability

Several bugs surfaced from the ongoing QA bug bash, mostly around Telegram and OAuth configuration:

- **[Issue #6475 — Telegram /pair command not recognized (P1)](https://github.com/nearai/ironclaw/issues/6475)**  
  The agent treats the `/pair` command as ordinary text, trapping the user in a pairing loop. No fix PR yet.

- **[Issue #6474 — Telegram delivery channel not configurable in Delivery Defaults (P1)](https://github.com/nearai/ironclaw/issues/6474)**  
  Only “Web app only” is exposed; users cannot select Telegram or Slack. No fix PR yet.

- **[Issue #6478 — Agent ignores connected Telegram, redirects to Slack authorization (P2)](https://github.com/nearai/ironclaw/issues/6478)**  
  The agent incorrectly triggers Slack auth even when Telegram is already connected. No fix PR yet.

- **[Issue #6523 — Agent fails to create during onboarding with test flag](https://github.com/nearai/ironclaw/issues/6523)**  
  Selecting the “test build” flag prevents deployment. No fix PR yet.

- **[Issue #6534 — Google OAuth config can’t be applied in hosted deployments](https://github.com/nearai/ironclaw/issues/6534)**  
  The config can be saved via WebUI but is not consumed at runtime. Partial fix in progress via **[PR #6533](https://github.com/nearai/ironclaw/pull/6533)** (container-supervised mode) and **[PR #6531](https://github.com/nearai/ironclaw/pull/6531)** (runtime application of admin OAuth config, still open).

- **[Issue #6522 — No setup instructions for Telegram](https://github.com/nearai/ironclaw/issues/6522)**  
  User is left without guidance on how to connect Telegram. No fix PR yet.

- **[Issue #6521 — IronClaw CLI not available on agent staging](https://github.com/nearai/ironclaw/issues/6521)**  
  Already closed; presumably fixed earlier.

The volume of P1/P2 bugs suggests the launch checklist is surfacing real usability gaps. Several PRs are addressing the OAuth and container execution paths, but Telegram-specific bugs remain unaddressed.

## 6. Feature Requests & Roadmap Signals

Longer-term feature requests and epics continue to shape the roadmap:

- **Error-recoverability epic ([#6284](https://github.com/nearai/ironclaw/issues/6284))** — Likely to drive several PRs in the coming weeks, as it defines the contract for making every error recoverable.
- **Extension/channel lifecycle test ([#6105](https://github.com/nearai/ironclaw/issues/6105))** — May be implemented soon to prevent regressions.
- **Configurable skills/tools ([#5459](https://github.com/nearai/ironclaw/issues/5459))** — Would allow admins and users to install and scope WASM tools and skills. Progress noted in linked issues.
- **Attested-signing + Ledger hardware wallet support ([#6532](https://github.com/nearai/ironclaw/issues/6532))** — A newly filed design document proposing blockchain transaction execution without unilateral money movement. This is early-stage but could become a major feature if adopted.
- **Secret-lease + egress proxy daemon ([#6472](https://github.com/nearai/ironclaw/issues/6472))** — Part of sandboxing infrastructure, already has a plan and is likely to appear in a release soon.

Predictions: The next release (1.0.0-rc.2 or similar) will likely include ProductSurface routing completion, the OAuth config runtime fixes, and a subset of Telegram lifecycle fixes. The error-recoverability epic is too large for the immediate next release but will be a major theme after launch.

## 7. User Feedback Summary

User pain points are concentrated in the Telegram and Slack extension experiences:

- “Telegram setup is confusing — no instructions provided, `/pair` command gets ignored, and the agent sometimes redirects to Slack.” (from #6522, #6475, #6478)
- “I cannot select Telegram or Slack as a delivery channel in the Delivery Defaults page.” (from #6474)
- “Onboarding fails when I try to use the test build flag.” (from #6523)
- “I saved Google OAuth config in the admin page, but the agent still doesn’t use it.” (from #6534)

These indicate that while the extension runtime foundation is solid, the user-facing configuration and discovery flows are still rough. The completion records for Telegram and OAuth foundations suggest the plumbing is in place, but the UX polish is lagging.

## 8. Backlog Watch

The following important issues have been open for an extended period without recent maintainer activity:

- **[Issue #1519 (2026-03-21) — Routine notifications lack context in user’s chat thread](https://github.com/nearai/ironclaw/issues/1519)**  
  When a routine sends a notification, it goes to a separate conversation rather than the user’s main chat thread. This is a fundamental UX gap that has been open for four months.

- **[Issue #1330 (2026-03-18) — Tool schema discovery: expose message routing and attachment semantics](https://github.com/nearai/ironclaw/issues/1330)**  
  The `message` tool schema does not make runtime routing rules clear to the model, causing confusion. Open for over four months.

- **[Issue #2246 (2026-04-10) — Unify extension model: MCP tools as single-tool extensions](https://github.com/nearai/ironclaw/issues/2246)**  
  MCP servers flood the tool list and there is no deduplication for multiple providers. This refactoring has been open for three months.

- **[Issue #3288 (2026-05-06) — Production/scoped capability lifecycle admin parity](https://github.com/nearai/ironclaw/issues/3288)**  
  Preserving extension/skill lifecycle UX while moving ownership into typed services. Part of the Reborn refactoring; still open after two and a half months.

These issues touch core user experience and architecture. Their age suggests they are not blockers for the v1 launch, but they should be revisited soon to avoid accumulating technical debt.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI Project Digest — 2026-07-23

## Today's Overview
Project activity remained moderate with **5 pull requests merged/closed** and **1 stale issue resolved** in the last 24 hours. No new releases were published, indicating a continued focus on bug fixes and incremental improvements rather than major version bumps. All recent PRs were merged promptly, and no open issues or PRs are currently awaiting review, reflecting healthy maintainer responsiveness. The project shows steady progress on both stability hardening and feature refinement, particularly in the Windows installer, OpenClaw, and cowork modules.

---

## Project Progress
Five pull requests were merged or closed today:

- **Windows Installer Hardening** ([#2377](https://github.com/netease-youdao/LobsterAI/pull/2377)) — `fisherdaddy` strengthened the update mechanism for Windows, addressing installer security and reliability.
- **Cowork Export Modal Fix** ([#2376](https://github.com/netease-youdao/LobsterAI/pull/2376)) — `liuzhq1986` fixed a stacking context issue by mounting the export options modal via a body portal, preventing it from being hidden behind the sidebar.
- **OpenClaw OOM Crash Guard** ([#2375](https://github.com/netease-youdao/LobsterAI/pull/2375)) — `fisherdaddy` added protections against oversized transcript memory exhaustion, blocking turns before loading large transcripts and handling stale gateway reconnects after heap-OOM recovery.
- **Scheduled Task Enhancements (merged from stale PR)** ([#1347](https://github.com/netease-youdao/LobsterAI/pull/1347)) — `swuzjb` contributed a major feature update: Cron custom scheduling with a visual builder, Agent/Model binding, and unified form UX. This PR was closed after being merged with the main branch.
- **Skills Management (merged from stale PR)** ([#1346](https://github.com/netease-youdao/LobsterAI/pull/1346)) — `leefinder` aligned a previous skills management feature with official requirements; also closed as merged.

The latter two PRs (#1347, #1346) were originally created in early April and finally merged today, indicating long-running feature branches now integrated.

---

## Community Hot Topics
Only one issue was updated in the last 24 hours:

- **#1348 – “定时任务名称重复没有校验”** (Duplicate scheduled task names not validated) — [Closed (stale)](https://github.com/netease-youdao/LobsterAI/issues/1348)  
  Author: `xuzx-code` · Created: 2026-04-02 · 2 comments · 0 👍  
  This issue was closed as stale after several months. It reported a missing validation for duplicate task names in the scheduled task module. Given that the related scheduled task feature PR (#1347) was merged today, this validation gap may have been addressed.

No other issues or PRs received comments or reactions, suggesting low community engagement on recent activity.

---

## Bugs & Stability
One stability fix of **high severity** was merged:

- **Oversized Transcript OOM Crashes** ([PR #2375](https://github.com/netease-youdao/LobsterAI/pull/2375)) — The OpenClaw module could crash due to JavaScript heap out-of-memory when loading very large transcripts. The fix blocks turns before loading oversized transcripts, classifies the crash type, and ignores stale gateway client generations after heap-OOM restart to prevent zombie reconnects. This is a critical reliability improvement for users handling long meeting recordings or transcriptions.

No new bugs were reported in the last 24 hours.

---

## Feature Requests & Roadmap Signals
The merged PRs today strongly indicate two areas of focus for the upcoming release:

1. **Scheduled Task Customization** — The Cron custom scheduling feature (visual builder, raw expression support, Agent/Model binding) from PR #1347 is a significant enhancement to LobsterAI’s automation capabilities. It addresses long-standing user needs for flexible job scheduling.
2. **Skills Management** — The skills management feature (PR #1346) suggests LobsterAI is expanding modular capabilities, likely enabling third-party skill plugins or user-defined agent behaviors.

Both features are now merged, so the next minor version release is likely to include them.

---

## User Feedback Summary
Due to minimal activity in the last 24 hours, direct user feedback is limited. The only closed issue (#1348) highlights a past pain point: lack of validation for duplicate scheduled task names. The fix for OOM crashes (PR #2375) indirectly addresses user complaints about instability when processing large transcripts. No explicit satisfaction or dissatisfaction signals were recorded.

---

## Backlog Watch
No long-unanswered issues or PRs remain open. The only stale issue (#1348) was resolved today. The maintainers have processed all pending work within the last 24 hours, indicating a clean backlog. However, it is worth monitoring whether the OOM crash fix (PR #2375) fully resolves transcript-handling stability; any follow-up reports may emerge in the coming days.

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis Project Digest – 2026-07-23

## 1. Today's Overview

Project activity was minimal over the past 24 hours. No new issues were opened or closed, and no releases were published. A single open pull request (#1162) received an update, focusing on improved date formatting for session history in the web UI. Overall, the repository appears to be in a quiet phase, with no new backlog items or urgent discussions surfacing.

## 2. Releases

No new releases were published today.

## 3. Project Progress

No pull requests were merged or closed in the last 24 hours. The only open PR that was updated is:

- **#1162 – fix(web): show dates for older sessions**  
  Author: shixi-li | Updated: 2026-07-22  
  [GitHub](https://github.com/moltis-org/moltis/pull/1162)  
  *Summary:* This change improves the session date display in the web client by keeping localized “HH:MM” for today’s sessions, showing “yesterday” or weekday labels for recent prior days, and falling back to a calendar date (including the year when needed) for older sessions. The PR adds browser coverage for four date buckets.

## 4. Community Hot Topics

No issues or pull requests accumulated comments or reactions in the last 24 hours. The only open PR (#1162) has zero comments, indicating that the community has not yet engaged with it.

## 5. Bugs & Stability

No new bugs, crashes, or regressions were reported today.

## 6. Feature Requests & Roadmap Signals

No feature requests were submitted or discussed in the last 24 hours. The open PR #1162 addresses a quality-of-life improvement for date handling rather than a new feature, so no roadmap signals can be inferred.

## 7. User Feedback Summary

No explicit user feedback (comments, reactions, or issue reports) was recorded in the last 24 hours.

## 8. Backlog Watch

There are no long-unanswered issues or pull requests that currently require maintainer attention. The oldest open item is PR #1162, which was created less than two days ago and has no comments or review requests yet.

---

**Overall Health Assessment:** The Moltis project is experiencing a low-activity period. The single open PR shows incremental maintenance work, but the absence of community interaction or new contributions suggests either a stable state or a temporary lull. No urgent issues or regressions are pending.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw Project Digest – 2026-07-23

## 1. Today's Overview

CoPaw saw very high activity over the last 24 hours, with **27 issues updated** (19 open, 8 closed) and **50 pull requests updated** (34 open, 16 merged/closed). The team released **v2.0.0.post4**, which optimizes agent reasoning to reduce redundant thinking loops and duplicate tool invocations. However, the post-release period has also surfaced several regressions and stability concerns, particularly around the new loop functionality and performance overhead in v2.0. Community contributions remain strong, with multiple first-time contributors submitting fixes across governance, file handling, mission parsing, and console testing.

## 2. Releases

**v2.0.0.post4** – [Release page](https://github.com/agentscope-ai/CoPaw/releases/tag/v2.0.0.post4)  
Changes: Optimized agent reasoning to mitigate redundant thinking loops and duplicate tool invocations.  
No breaking changes or migration notes were documented in the release. The release also triggered an installation verification duty issue [#6338](https://github.com/agentscope-ai/CoPaw/issues/6338) which passed all platforms.

## 3. Project Progress

Of the **16 merged/closed PRs** in the last 24 hours, notable contributions include:

- **#6357** ([PR](https://github.com/agentscope-ai/CoPaw/pull/6357)) – Fixed Console approval dialog UI to prioritize one-time approval over "always allow", reducing accidental permanent permission grants (closed).
- **#6367** ([PR](https://github.com/agentscope-ai/CoPaw/pull/6367)) – Stabilized the Console Gate coverage test by extending timeout under V8 instrumentation (closed).
- **#6375** ([PR](https://github.com/agentscope-ai/CoPaw/pull/6375)) – Fixed token usage persistence to retry after transient write failures instead of silently losing data (closed).
- **#6317** ([PR](https://github.com/agentscope-ai/CoPaw/pull/6317)) – Hardened OMP workspace/fork/deny-all gates with regression tests (open, but includes merged commits).
- **#6369**, **#6373**, **#6371**, **#6365**, **#6352**, **#6348**, **#6351** – Multiple fixes from first-time contributor `patrick-andstar` addressing queue state cleanup, file download fallback, Windows test scripts, mission directory collision, malformed user stories, and memory edit guidance (all open or closed).

Key feature work advanced in open PRs includes:

- **#6337** – Exposing AG-UI protocol via `/protocol/agui/chat` SSE endpoint.
- **#6284** – New `qwenpaw-creator` app plugin for script-to-video creation.
- **#6302** – Safe model discovery infrastructure with first provider integrations.
- **#6353** – Per-job model overrides for cron jobs.

## 4. Community Hot Topics

The most active discussions (by comment count) centered on regressions and missing features:

- **#5218** ([Issue](https://github.com/agentscope-ai/CoPaw/issues/5218), 18 comments, closed) – Sub-agent context compaction causing process freeze. Although closed, the issue highlights underlying concerns about memory management in complex agent trees.
- **#6322** ([Issue](https://github.com/agentscope-ai/CoPaw/issues/6322), 8 comments, closed) – Platform domain redirecting to ad pages on mobile networks. Community members noted inconsistent behavior between carriers.
- **#6314** ([Issue](https://github.com/agentscope-ai/CoPaw/issues/6314), 8 comments, open) – `RemoteProtocolError: peer closed connection` – detailed packet analysis points to QwenPaw actively closing connections. Needs investigation.
- **#6307** ([Issue](https://github.com/agentscope-ai/CoPaw/issues/6307), 5 comments, open) – ~2s fixed overhead per reply in v2.0 vs v1.x, attributed to architectural changes in request processing. High-priority for performance-sensitive users.
- **#6362** ([Issue](https://github.com/agentscope-ai/CoPaw/issues/6362), 2 comments, open) – MiniMax-M3 model unable to recognize images when used via built-in provider (Anthropic-compatible protocol). Related to earlier closed issue #5135.

Underlying needs: Users are demanding better stability in multi-agent scenarios, transparent error handling, and performance parity with v1.x. The MiniMax vision problem appears long-standing.

## 5. Bugs & Stability

New bugs reported today, ranked by severity:

| Issue | Severity | Description | Fix PR Exists? |
|-------|----------|-------------|----------------|
| [#6376](https://github.com/agentscope-ai/CoPaw/issues/6376) | **Critical** | v2.0.0.post3/4 – loop functionality crashes the main process. User requests stress testing before release. | No |
| [#6374](https://github.com/agentscope-ai/CoPaw/issues/6374) | **High** | Token usage persistence does not retry after transient write failures – risks losing usage data. | Yes – [#6375](https://github.com/agentscope-ai/CoPaw/pull/6375) (merged) |
| [#6372](https://github.com/agentscope-ai/CoPaw/issues/6372) | **High** | Idle cleanup can remove a newly recreated queue state, leading to inconsistent state. | Yes – [#6373](https://github.com/agentscope-ai/CoPaw/pull/6373) (open) |
| [#6363](https://github.com/agentscope-ai/CoPaw/issues/6363) | **High** | Tool call arguments polluted with markdown fences / XML tags breaking all tool execution for GLM-5-Turbo, DeepSeek-V3. | Yes – [#6364](https://github.com/agentscope-ai/CoPaw/pull/6364) (open) |
| [#6362](https://github.com/agentscope-ai/CoPaw/issues/6362) | **Medium** | MiniMax-M3 cannot recognize images, returns hallucinated text. | No |
| [#6358](https://github.com/agentscope-ai/CoPaw/issues/6358) | **Medium** | Context injection as `role='system'` causes ValueError on GLM/OpenAI APIs because system role appears mid-conversation. | Yes – [#6360](https://github.com/agentscope-ai/CoPaw/pull/6360) (open) |
| [#6355](https://github.com/agentscope-ai/CoPaw/issues/6355) | **Medium** | Mission parser splits quoted `--verify` commands, breaking verification. | Yes – [#6356](https://github.com/agentscope-ai/CoPaw/pull/6356) (open) |
| [#6361](https://github.com/agentscope-ai/CoPaw/issues/6361) | **Low** | Console test scripts fail on Windows due to POSIX environment variable syntax. | Yes – [#6365](https://github.com/agentscope-ai/CoPaw/pull/6365) (open) |
| [#6366](https://github.com/agentscope-ai/CoPaw/issues/6366) | **Low** | Console coverage test can timeout under V8 instrumentation. | Yes – [#6367](https://github.com/agentscope-ai/CoPaw/pull/6367) (merged) |
| [#6370](https://github.com/agentscope-ai/CoPaw/issues/6370) | **Low** | Downloader fallback `wget` → `curl` → `urllib` does not handle `TimeoutExpired`. | Yes – [#6371](https://github.com/agentscope-ai/CoPaw/pull/6371) (open) |

Despite many fix PRs being open, the main process crash issue ([#6376](https://github.com/agentscope-ai/CoPaw/issues/6376)) lacks a known fix and is the most concerning.

## 6. Feature Requests & Roadmap Signals

Notable feature requests from the community:

- **Per-job model overrides for cron** ([#6316](https://github.com/agentscope-ai/CoPaw/issues/6316)) – Already implemented in PR [#6353](https://github.com/agentscope-ai/CoPaw/pull/6353), likely to land in v2.0.1.
- **Drag-and-drop file upload in chat** ([#6297](https://github.com/agentscope-ai/CoPaw/issues/6297), closed with a request on Windows) – High demand for document/image upload (contract review use case). May appear in upcoming console improvements.
- **Docker hot-update without container rebuild** ([#6344](https://github.com/agentscope-ai/CoPaw/issues/6344)) – Proposed to avoid losing runtime environments on each update. Likely to be considered for a future Docker-focused release.
- **Multi-user / organization deployment** ([#6335](https://github.com/agentscope-ai/CoPaw/issues/6335)) – No response yet; signals growing enterprise interest.
- **API for specific task automation** ([#6377](https://github.com/agentscope-ai/CoPaw/issues/6377)) – User wants to expose agent tasks as HTTP APIs with controlled request/response formats.

These requests indicate a shift from personal assistant toward enterprise and developer-oriented use cases. The per-job model override and API endpoints are already in the pipeline.

## 7. User Feedback Summary

Real pain points voiced in the last 24 hours:

- **Performance regression**: "Upgrading from v1.x to v2.0 introduces ~2s fixed overhead per reply" ([#6307](https://github.com/agentscope-ai/CoPaw/issues/6307)). Users expect v2.0 to be at least as fast.
- **Stability concerns**: "v2.0.0.post3 and post4 run frequently crash due to new loop function – please do stress testing before release" ([#6376](https://github.com/agentscope-ai/CoPaw/issues/6376)). Frustration with release quality.
- **Broken MiniMax vision**: User reports that MiniMax-M3 cannot recognize any images, outputting hallucinated text ([#6362](https://github.com/agentscope-ai/CoPaw/issues/6362)). This issue was also reported earlier in v1.1.11 ([#5135](https://github.com/agentscope-ai/CoPaw/issues/5135)) and closed without satisfactory resolution.
- **Tool execution failures**: Models like GLM-5-Turbo and DeepSeek-V3 break entirely due to markdown fences in tool_call arguments ([#6363](https://github.com/agentscope-ai/CoPaw/issues/6363)). Aggravates users relying on Chinese LLM providers.
- **Docker update friction**: Users running long-lived bots cannot update without losing Node, ffmpeg, LibreOffice installations ([#6344](https://github.com/agentscope-ai/CoPaw/issues/6344)).
- **Missing multi-user support**: One user asked about company-wide deployment, noting current design is single-user ([#6335](https://github.com/agentscope-ai/CoPaw/issues/6335)).
- **Approval UI safety**: A user flagged that the "Always Allow" button is more visually prominent than "Just Once", risking accidental permanent grants ([#6354](https://github.com/agentscope-ai/CoPaw/issues/6354)). This was promptly fixed in PR #6357.

Overall satisfaction is mixed – the rapid iteration is appreciated but stability and regression testing need improvement.

## 8. Backlog Watch

Issues/PRs that have been inactive for a significant period or lack maintainer attention:

- **#5135** ([Issue](https://github.com/agentscope-ai/CoPaw/issues/5135)) – MiniMax-M3 vision bug (reported June 11, closed but effectively unresolved as the same problem reappears in #6362). May need a real fix rather than a close.
- **#6176** ([Issue](https://github.com/agentscope-ai/CoPaw/issues/6176)) – Cron CLI update resets runtime/metadata fields (reported July 16, closed but without a clear mitigations for all cases). Users may still hit this.
- **#6338** ([Issue](https://github.com/agentscope-ai/CoPaw/issues/6338)) – Release verification duty for v2.0.0.post4 – passed but no manual sign-off from maintainers visible.
- **#6342** ([Issue](https://github.com/agentscope-ai/CoPaw/issues/6342)) – User unable to verify ReMe embedding model effectiveness; no answer from maintainers yet. Requires documentation or diagnostic improvements.

None of these are critically stale, but the recurrence of the MiniMax vision bug suggests the previous closure was premature. Maintainers should re-open #5135 or address #6362 with a comprehensive fix.

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