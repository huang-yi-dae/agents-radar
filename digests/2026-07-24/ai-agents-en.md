# OpenClaw Ecosystem Digest 2026-07-24

> Issues: 298 | PRs: 500 | Projects covered: 13 | Generated: 2026-07-24 02:57 UTC

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

# OpenClaw Project Digest for 2026-07-24

## 1. Today's Overview
OpenClaw remains in a high-activity phase with **298 issues** and **500 pull requests** updated in the last 24 hours. Of those issues, **205 are open/active** and **93 closed**; PRs show **317 open** and **183 merged or closed**, indicating sustained contribution volume. No new releases were published today, but the project is processing critical bug reports and significant code changes across agents, channels, localization, and security boundaries. The overall health is stable but under pressure from several high-severity regressions and long-standing feature requests that continue to accumulate comments.

## 2. Releases
*None today.* The last published release remains `2026.7.2-beta.3` (referenced in issue #111519). No migration notes or breaking changes are applicable for this digest.

## 3. Project Progress
In the last 24 hours, **183 pull requests were merged or closed**. Notable among the top-30 updated PRs:

- **`#113201`** (closed) – Refactored embedded attempt terminal outcomes by collapsing abort, timeout, and cleanup state into a single lifecycle field, reducing surface for contradictory states.
- **`#113202`** (closed) – Fixed iOS release upload rejecting its own planned build number, unblocking App Store deployments.
- **`#112661`** (open) – Fixes isolated cron jobs that lost authorized tools when a senderless run resolved wildcard policies again.
- **`#112877`** (open) – Prevents healthy agent/subagent runs from being expired when command-lane saturation left them queued beyond the inactivity TTL.
- **`#113190`** (open) – Fixes subagent completion deadlock after `sessions_yield` by stripping trailing assistant messages left by prior tool work.
- **`#111528`** (open) – Fixes false mid-turn overflow recovery that could persistently truncate tool results on tool-result-heavy turns.
- **`#112380`** (open) – Fixes Google image generation when a provider base URL is omitted (empty string validation error).
- **`#97881`** (open) – Fixes `openclaw doctor --fix` auth migration that silently dropped secret refs and OAuth fields.
- **`#89039`** (open) – Prevents silent message loss from `EmbeddedAttemptSessionTakeoverError` when SDK retries cause fingerprint mismatches.
- **`#113204`** (open) – Avoids shared SQLite corruption when CLI starts while Gateway is running (fixes issue #101290).

These changes address session stability, cron tool authorization, queuing, auth migration, and database safety.

## 4. Community Hot Topics
Top issues by comment count and reactions reflect deep user concern around **message loss, session reliability, and migration pain**:

- **`#44925`** (22 comments, 2👍) – Subagent completion silently lost on timeout, no retry or notification. Users report this as a diamond-lobster severity issue affecting production stability.
- **`#102020`** (15 comments, 1👍) – Second message in a fresh session fails with "reply session initialization conflicted" across Signal and Telegram. Cross-channel blocker.
- **`#94228`** (14 comments, 2👍) – Native Anthropic path: replaying historical `thinking` blocks bricks long tool-use threads with HTTP 400 `Invalid signature in thinking block`.
- **`#92043`** (13 comments, 3👍) – 180s compaction timeout is a single wall clock over the whole chunk pipeline with no partial-progress reuse, causing legitimate compactions to fail identically every turn.
- **`#108435`** (10 comments, 2👍) – "update to openclaw 2026.7.1: gateway fails to start" – a P0 regression affecting systemd and manual launch.
- **`#110950`** (9 comments, 2👍, CLOSED) – Feature request to "unify heartbeat, watchers, and scheduled automation" as cron jobs. Closed but indicates strong interest in simplifying automation.
- **`#67419`** (9 comments, 2👍) – Session context bloat: bootstrap files re-injected every turn wasting 20–30% tokens.
- **`#7524`** (5 comments, 4👍) – Feature request for `groupScope` option to consolidate group sessions into main chat (highest reaction count).
- **`#99481`** (5 comments, 3👍) – Tool result channel becomes empty after several calls on `2026.7.1-beta.1`.

**Underlying needs**: reliability of subagent orchestration, session recovery, compaction fairness, and graceful migration across versions.

## 5. Bugs & Stability
Several critical and high-severity bugs were reported or escalated this period:

| Severity | Issue | Summary | Fix PR Exists? |
|----------|-------|---------|----------------|
| **P0** | #108435 | Gateway fails to start after updating to 2026.7.1 (regression) | No linked fix yet |
| **P0** | #90378 | Cron store silently migrated from JSON to SQLite on upgrade, new jobs default to wrong delivery mode causing channel errors | Linked PR open |
| **P1** | #44925 | Subagent completion silently lost on timeout (no retry, no auto-restart) | No new fix PR |
| **P1** | #94228 | Anthropic `thinking` blocks cause permanent bricking of long tool-use sessions | Linked PR open |
| **P1** | #92043 | 180s compaction timeout per chunk pipeline with no progress reuse | Linked PR open |
| **P1** | #108580 | Cron tool schema incompatible with llama.cpp grammar-constrained tool calling (regression in 2026.7.1) | Linked PR open |
| **P1** | #111519 | Telegram DM replies fall back after stale DM-scope cleanup in 2026.7.2-beta.3 | No linked fix |
| **P1** | #98435 | MCP loopback transport does not auto-reconnect on CLI side after gateway restart | No linked fix |
| **P1** | #102020 | Second message fails with session initialization conflicted | No linked fix |
| **P2** | #94536 | Commitment marked 'sent' but never delivered (second case, PR #92231 incomplete) | No linked fix |
| **P2** | #81514 | Cron isolated-job status non-deterministic when agent recovers from tool error | No linked fix |
| **P2** | #97826 | `sendVideo` omits width/height for large videos → wrong aspect ratio | Linked fix in open PR |

Several of these bugs have corresponding open PRs (#94228, #92043, #90378, #108580), but many remain unaddressed. The project's `clawsweeper` label system indicates `needs-live-repro`, `needs-product-decision`, or `no-new-fix-pr` for many blockers.

## 6. Feature Requests & Roadmap Signals
The most demanded features (by reaction count and activity) suggest the community is pushing for:

- **`#110950`** (CLOSED) – "Everything is a cron" unification of heartbeat, watchers, and scheduled automation. Likely to appear in a future release given its design scope and closure by a maintainer.
- **`#7524`** (4👍) – `groupScope` option to consolidate group sessions into main chat. Highest reaction count, repeated requests.
- **`#8299`** – Config option to suppress sub-agent announcement (currently requires model to output `ANNOUNCE_SKIP`). Fits with broader subagent reliability themes.
- **`#87325`** – Azure Foundry GPT Realtime Talk support via gateway relay. Security review needed.
- **`#6599`** – `/models test-fallback` command to verify fallback chain without real failure.
- **`#38520`** – Pre-compaction agent notification, structured handoff window, deferral mechanism.
- **`#49259`** – Prune stale orphaned sessions from Dashboard.
- **`#42651` / `#42648`** – Memory MVP: ingestion helpers and write pipeline with deduplication/merge. Predictable for next version as memory-core is already active.
- **`#38568`** – Inject context window % into system prompt runtime section.
- **`#12219`** – Skill Permission Manifest Standard (skill.yaml). Security-boundary implications.
- **`#45390`** – Session TTL / max lifetime for automatic rotation.
- **`#41418`** – Global `--dry-run` flag to prevent all tool calls from executing.
- **`#43673`** – First-class org/team deployment with RBAC and manifests.

**Roadmap prediction**: The "everything is a cron" unification (#110950) and Memory MVP (#42651/42648) are most likely to land next, given maintainer involvement and existing groundwork. Group chat consolidation (#7524) and context window injection (#38568) are community favorites with achievable scope.

## 7. User Feedback Summary
Real user pain points expressed in the data:

- **Silent message/subagent loss** (#44925, #102020, #94536, #89039) – Users report production workflows where completions vanish without notification, causing mistrust in autonomous operations.
- **Regressions after minor updates** (#108435, #111519, #108580, #98672) – Frequent "beta release blocker" labeled bugs indicate upgrade fear; users want more rigorous default-config testing.
- **Compaction and context management** (#92043, #67419, #48579, #41949) – Token waste, long compaction timeouts, and inability to disable compaction plague large-context deployments.
- **Migration confusion** (#90378, #97881) – Silent schema changes and lost auth fields cause manual recovery work.
- **UI and formatting regressions** (#112696, #49205, #46748) – Control UI avatar loading, log timezone display, and Open WebUI sync issues affect daily usability.
- **Multi-agent and group chat friction** (#7524, #91799, #48641) – Discord/MCP tool access and group isolation limit collaboration.

Satisfaction signals: High engagement (500 PRs, many merged) shows active community contribution and maintainer responsiveness. The diamond lobster and platinum hermit severity ratings reflect mature quality standards.

## 8. Backlog Watch
Long-standing issues (stale or awaiting maintainer review) that have not seen fix PRs and may affect users:

| Issue | Age | Summary | Status |
|-------|-----|---------|--------|
| #8299 | Since Feb 2026 | Config option to suppress sub-agent announce | Needs product decision |
| #87325 | Since May 2026 | Azure Foundry GPT Realtime support | Needs security review |
| #6599 | Since Feb 2026 | Add `/models test-fallback` command | Needs maintainer review |
| #7524 | Since Feb 2026 | groupScope to consolidate group sessions | Needs security review, linked PR open |
| #7540 | Since Feb 2026 | WhatsApp call events support | Needs security review, live repro |
| #38520 | Since Mar 2026 | Pre-compaction notification and deferral | Needs product decision |
| #38568 | Since Mar 2026 | Inject context window % into system prompt | Needs product decision |
| #12219 | Since Feb 2026 | Skill Permission Manifest Standard | Needs security review |
| #42648 | Since Mar 2026 | Memory write pipeline with deduplication | Needs product decision |
| #45390 | Since Mar 2026 | Session TTL / max lifetime | Needs product decision |
| #49259 | Since Mar 2026 | Prune stale orphaned sessions from Dashboard | Needs product decision |
| #43673 | Since Mar 2026 | Org/team deployment scaffolding and RBAC | Needs security review |
| #41372 | Since Mar 2026 | Field report with 25 findings from production | Needs live repro + further analysis |
| #42273 | Since Mar 2026 | `backup create` stalls on large installations | Needs live repro |
| #43374 | Since Mar 2026 | All LLM API calls time out simultaneously (concurrency) | Needs live repro |
| #48579 | Since Mar 2026 | Context pruning mode 'off' not preventing compactions | Needs live repro |
| #102081 | Since Jul 2026 | Exec allowlist auto-execute unavailable on darwin (macOS) | Needs security review, live repro |
| #108435 | Since Jul 2026 | Gateway fails to start on 2026.7.1 (P0) | No fix PR yet; urgent |
| #111519 | Since Jul 2026 | Telegram DM regression on 2026.7.2-beta.3 | Needs info from reporter |

These items represent significant technical debt and potential user dissatisfaction. The `clawsweeper:needs-maintainer-review` label dominates, suggesting maintainer bandwidth is spread thin across high-severity bugs.

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report: Personal AI Assistant Open-Source Ecosystem

## 1. Ecosystem Overview

The personal AI assistant open-source ecosystem is maturing rapidly, with seven of thirteen tracked projects showing high activity levels on 2026-07-24. The landscape is dominated by the OpenClaw family (OpenClaw, ZeroClaw, PicoClaw, NanoClaw) and its derivatives, but distinct specialisations are emerging: Rust-based security-hardened runtimes (ZeroClaw), lightweight WebUI-focused agents (NanoBot), enterprise-scale extension platforms (IronClaw), and collaborative workplace agents (LobsterAI, CoPaw). A shared intensification of effort around multi-agent orchestration, session reliability, and security hardening indicates the ecosystem is moving from proof-of-concept to production-grade deployments. Two projects (NullClaw, TinyClaw, EasyClaw) remain dormant, while ZeptoClaw is in a focused safety-improvement phase.

## 2. Activity Comparison

| Project | Issues Updated (open/closed) | PRs Updated (merged/closed) | New Release? | Health Score |
|---------|-----------------------------|-----------------------------|-------------|--------------|
| **OpenClaw** | 298 (205 open, 93 closed) | 500 (317 open, 183 merged) | No | High |
| **ZeroClaw** | 50 (45 open, 5 closed) | 50 (1 merged, 49 open) | No | Medium |
| **CoPaw** | 30 (18 open, 12 closed) | 50 (21 merged, 29 open) | v2.0.1-beta.2 | High |
| **IronClaw** | 31 (6 closed) | 50 (19 merged) | No | High |
| **LobsterAI** | 3 (all stale) | 50 (50 merged) | No | High |
| **NanoBot** | 8 (5 closed) | 38 (32 merged) | No | High |
| **Moltis** | 2 (1 open) | 5 (5 merged) | 2 releases | High |
| **NanoClaw** | 1 (1 open) | 10 (4 merged) | No | Medium |
| **PicoClaw** | 2 (both closed) | 14 (6 merged) | No | Medium |
| **ZeptoClaw** | 2 (2 open) | 1 (0 merged) | No | Low |
| **NullClaw** | 0 | 0 | No | Inactive |
| **TinyClaw** | 0 | 0 | No | Inactive |
| **EasyClaw** | 0 | 0 | No | Inactive |

**Note:** Health Score reflects combination of activity volume, merge velocity, bug turnaround, and community engagement. High = rapid iteration with responsive maintainers; Medium = active but with significant unresolved issues; Low = limited activity or critical blockers; Inactive = no detectable activity.

## 3. OpenClaw's Position

**Advantages vs Peers:**
- **Community scale:** 298 issues and 500 PRs in 24 hours – 6–10× larger than any single peer project.
- **Reference implementation status:** As the core project from which ZeroClaw, PicoClaw, and NanoClaw derive, OpenClaw sets architectural patterns that propagate through the ecosystem.
- **Breadth of coverage:** Supports 20+ channels, subagent orchestration, cron automation, memory MVP, and extensive LLM provider integrations. No other project matches this feature surface.

**Technical Approach Differences:**
- Uses Python-based runtime with SQLite for persistence (shared with NanoBot, CoPaw); ZeroClaw uses Rust for memory-safety; IronClaw uses TypeScript/Node with extension lifecycle.
- Relies on a monolithic agent loop with session-based context management; ZeroClaw implements A2A protocol for modular multi-agent communication.
- Community contribution model: open-core with external PRs; IronClaw is more centrally managed (Near AI).

**Community Size Comparison:**
- OpenClaw: 200+ active contributors per day, 20K+ GitHub stars (estimated).
- Next tier (CoPaw, ZeroClaw, IronClaw): 20–50 contributors/day, 2K–5K stars.
- Smaller projects: 1–10 contributors/day, <500 stars.

**Weakness:** High regression rate (P0 gateway startup failure, message loss bugs) and long backlog of feature requests (120+ items with `needs-maintainer-review`) erode trust despite high activity.

## 4. Shared Technical Focus Areas

Multiple projects are independently converging on the same requirements:

| Requirement | Projects | Specific Needs |
|-------------|----------|---------------|
| **Session reliability & recovery** | OpenClaw, ZeroClaw, NanoBot, CoPaw, IronClaw | Subagent timeout handling, silent message loss, session initialization conflicts, mid-session crashes |
| **Security hardening** | ZeroClaw, NanoBot, ZeptoClaw, Moltis, CoPaw | Environment scrubbing, subprocess timeout reaping, credential encryption, allowlist validation, OTP self-approval |
| **Multi-agent orchestration** | OpenClaw, ZeroClaw, LobsterAI, CoPaw | Per-agent model binding, A2A protocol, group session consolidation, subagent announcements |
| **Memory/context management** | OpenClaw, CoPaw, NanoBot | Context window bloat, compaction fairness, MEMORY.md write failures, structured handoff |
| **Cross-platform & container support** | OpenClaw, ZeroClaw, IronClaw, CoPaw, Moltis | Windows startup failure, Docker hot-update, Podman compatibility, macOS symlink issues |
| **Performance regressions** | OpenClaw, CoPaw | 2s fixed overhead per reply, 180s compaction timeout, token waste from bootstrap re-injection |
| **Tool execution stability** | OpenClaw, ZeroClaw, CoPaw, NanoBot | Tool result truncation, web_fetch garbage output, tool_call argument pollution, length recovery |
| **UX/WebUI improvements** | NanoBot, IronClaw, CoPaw | Topic-based chats, session date display, disconnected-state lockout, simplified mode toggle |

**Implication:** Developers building cross-project tools or libraries should prioritise these shared pain points as they represent the ecosystem's consensus on critical gaps.

## 5. Differentiation Analysis

| Dimension | OpenClaw | ZeroClaw | NanoBot | IronClaw | CoPaw | Moltis | ZeptoClaw |
|-----------|----------|----------|---------|----------|-------|--------|-----------|
| **Primary language** | Python | Rust | TypeScript | TypeScript | Python | Python | Rust |
| **Target user** | Advanced developers, self-hosters | Production operators, security-minded | Casual users, Web UI | Enterprise teams, cloud-hosted | AgentScope/Qwen ecosystem | Slack/chat integrators | Minimalists, safety-critical |
| **Feature focus** | Breadth (channels, subagents, cron) | Security, A2A, multi-agent | Simplicity, UX polish | Extension lifecycle, product launch | Memory, governance, desktop | Context commands, Slack OTP | Subprocess isolation |
| **Architecture style** | Monolithic agent loop | Modular, Rust-native | Lightweight web app | Plugin-based extension system | v2.0 rewrite with memory core | Minimal, plugin-supported | Minimal runtime |
| **Release cadence** | Frequent betas | Infrequent, stabilized | No new release | Pre-launch | Beta (v2.0.1-beta.2) | Daily patch releases | No release |
| **Community model** | Open contribution | Core team + PRs | Core team + PRs | Centralized (Near AI) | Core team + PRs | Core team | Solo maintainer |

**Key Insight:** The ecosystem is fragmenting by deployment scenario. OpenClaw remains the generalist; ZeroClaw targets security-conscious operators who accept Rust complexity; IronClaw is the commercial product path; CoPaw focuses on the AgentScope community with advanced memory; NanoBot serves the simplest use case.

## 6. Community Momentum & Maturity

**Activity Tiers:**

- **Tier 1 – High momentum / rapidly iterating:** OpenClaw, ZeroClaw, CoPaw, IronClaw, LobsterAI  
  *All have 50+ PRs/day, multiple open PRs addressing critical bugs, and active maintainer response.*  
  *Risk: Overheating – OpenClaw and CoPaw show regression density that may require a stabilization release.*

- **Tier 2 – Moderate momentum / stabilizing:** NanoBot, NanoClaw, Moltis, PicoClaw  
  *Steady merge velocity with fewer open issues. Moltis and NanoBot have closed most recent bugs. PicoClaw and NanoClaw are lowering backlog.*

- **Tier 3 – Low / dormant:** NullClaw, TinyClaw, EasyClaw  
  *Zero activity in 24h; users should assume these projects are unmaintained.*

- **In transition:** ZeptoClaw  
  *Critical issues opened, but PR velocity is low. Single maintainer may need help to sustain.*

**Maturity indicators:**
- OpenClaw: Mature but fragile (high issue count, many regressions).
- ZeroClaw: Hardening phase (S0 data-loss bugs, many open PRs).
- CoPaw: Post-major-release instability (v2.0 regressions, but rapid patching).
- IronClaw: Pre-launch scramble (blockers common, but focus is clear).
- LobsterAI: Production maintenance (50 merged PRs, no new features).
- Moltis: Small but healthy (daily releases, quick fixes).
- NanoBot: Stable with incremental improvements (topic chats, security fixes).

## 7. Trend Signals

| Trend | Evidence | Value for AI Agent Developers |
|-------|----------|-------------------------------|
| **Multi-agent orchestration is the top unmet need** | A2A protocol (#3566, 7👍), groupScope (#7524, 4👍), per-agent model binding (#1265), subagent completion loss (#44925) | Invest in cross-agent communication patterns; standardise handoff protocols early |
| **Security is shifting from optional to mandatory** | Subprocess environment scrubbing (ZeptoClaw#644), shell guard bypass (NanoBot#4592), KeySource trait (ZeroClaw#9127), TOTP for critical tools (#3767) | Build security into agent runtimes by default – environment isolation, credential encryption, allowlist-based access control |
| **Session persistence reliability is the #1 user pain point** | Message loss on timeout (multiple), initialization conflicts, database corruption (LobsterAI#1273), compaction failures | Implement idempotent message delivery, retry with backoff, and crash-recovery mechanisms; avoid synchronous file I/O in hot paths |
| **Context management is becoming a core system component** | Memory MVP (OpenClaw#42651), context bloat (#67419), compaction fairness (#92043), ReAct context mixing (CoPaw#6407) | Treat context as a first-class resource with lifecycle hooks, pre-compaction notifications, and structured memory writes |
| **Cross-platform desktop and container support is maturation barrier** | Windows installer failures, Docker hot-update, Podman support, macOS darwin issues | Invest in CI matrix testing across platforms; containerise as default deployment mode |
| **UX simplification is critical for adoption** | Topic chats (NanoBot#5070), session date display (Moltis#1162), Full Mode confusion (CoPaw#6413), WebChat disconnected state (IronClaw#6592) | Reduce configuration surface; provide sensible defaults; surface only essential controls to new users |
| **A2A / inter-agent protocol standardisation is emerging** | ZeroClaw A2A client PR (#9324), OpenClaw groupScope, LobsterAI per-agent binding | Align with emerging standards (A2A RFC) to ensure future interoperability |

**Bottom Line:** The ecosystem is healthy but fractured. Developers building on any of these projects should plan for: (1) session persistence as a reliability bottleneck, (2) security hardening as a prerequisite for production, (3) multi-agent patterns becoming the norm, and (4) context management as the next competitive differentiator.

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot Project Digest — 2026-07-24

## 1. Today’s Overview

NanoBot saw a high-velocity day with **38 PRs updated** (32 merged/closed) and **8 issues updated** (5 closed). The focus was on WebUI polish, security hardening, and bug fixes across channels, file tools, and session management. No new releases were cut, but the codebase absorbed multiple feature enhancements (topic-based chat presentation, simplified model presets) alongside critical fixes for workspace scope, length recovery, and shell command guards. Community engagement remains strong, with two feature-request issues attracting the most discussion.

---

## 2. Releases

No new versions were released today.

---

## 3. Project Progress – Merged/Closed PRs

Over three dozen pull requests were merged or closed, reflecting intense development. Key advances include:

- **WebUI enhancements**: `#5070` presents chats as user-facing topics with full locale support; `#5061` simplifies model preset settings by introducing reusable presets and an explicit call order; `#5060` polishes responsive layouts and settings search; `#5058` unifies settings and dark mode surfaces.
- **Workspace & security fixes**: `#5065` allows media directory access when `restrictToWorkspace` is enabled; `#4594` fixes shell guard’s failure to block absolute paths after `=` (e.g., `curl --output=/etc/passwd`); `#4889` adds an explicit allowlist for destructive priority commands (`/restart`, `/stop`) in channels.
- **Session & execution stability**: `#5066` retains stale exec sessions after cleanup failure to allow retries; `#5068` tolerates files removed during `list_sessions()` enumeration; `#4901` replaces JSON round-trip copies with `deepcopy` in WebUI transcript handling.
- **Channel & tool fixes**: `#5055` advances markdown splitting in Telegram for long single-line fenced code blocks; `#5039` preserves DOCX table content during document extraction.
- **Test infrastructure**: `#5063` and `#5064` fix workspace scope tests to use `python3` instead of `python` for Linux compatibility.
- **Other**: `#5056` (open) improves length recovery by accumulating output segments; `#5067` keeps the WebUI composer model badge in sync with settings.

All merged PR links:  
https://github.com/HKUDS/nanobot/pull/5070  
https://github.com/HKUDS/nanobot/pull/5061  
https://github.com/HKUDS/nanobot/pull/5065  
https://github.com/HKUDS/nanobot/pull/4889  
https://github.com/HKUDS/nanobot/pull/4594  
https://github.com/HKUDS/nanobot/pull/5055  
https://github.com/HKUDS/nanobot/pull/5066  
https://github.com/HKUDS/nanobot/pull/5068  
https://github.com/HKUDS/nanobot/pull/4901  
https://github.com/HKUDS/nanobot/pull/5060  
https://github.com/HKUDS/nanobot/pull/5058  
https://github.com/HKUDS/nanobot/pull/5039  
https://github.com/HKUDS/nanobot/pull/5064  
https://github.com/HKUDS/nanobot/pull/5063  
https://github.com/HKUDS/nanobot/pull/5067

---

## 4. Community Hot Topics

The most active discussions centred on user-facing features and browser compatibility:

- **#4253 – Support overriding model per conversation** (6 comments, closed)  
  A user wants to alternate between a fast OpenRouter preset and a local (private, slow) llama.cpp preset depending on task sensitivity. The request was well-received and closed with a note that the new simplified model preset system (`#5061`) may address the use case.  
  https://github.com/HKUDS/nanobot/issues/4253

- **#5059 – Browser version support inquiry** (4 comments, closed)  
  A Chinese-speaking user asked which browser versions are officially supported. While the issue was closed without a code change, it signals demand for explicit browser compatibility documentation.  
  https://github.com/HKUDS/nanobot/issues/5059

- **#4858 – Refactor dynamic tool provider lifecycle out of AgentLoop** (2 comments, open)  
  An architectural issue proposing to extract MCP-specific state from `AgentLoop`. The discussion indicates maintainers are considering a more modular design.  
  https://github.com/HKUDS/nanobot/issues/4858

---

## 5. Bugs & Stability

Several bugs were reported or fixed today, ranked by severity:

| Severity | Issue | Description | Fix PR |
|----------|-------|-------------|--------|
| **P0** | – (PR #4987) | Filesystem workspace checks may be bypassed via symlinks; PR proposes binding validation to opened file handles | Open (`#4987`) |
| **P1** | #5051 | AgentRunner length recovery loses earlier segments – only last continuation is retained | Open (`#5056`) |
| **P1** | #5028 | Media path conflicts with workspace restrictions when files are uploaded via Feishu | Open (no fix PR yet) |
| **P1** | #5042 | Cron schedule of `null` quarantines entire job store, dropping sibling jobs | Open (`#5042`) |
| **P1** | #5062 | Test uses `python` command, fails on Ubuntu/Debian without `python-is-python3` | Fixed (`#5063`, `#5064`) |
| **P1** | #4592 | Shell guard fails to block paths after `=` (e.g., `--output=/etc/passwd`) | Fixed (`#4594`) |
| **P2** | #4940 | Legacy session filename format loses `workspace_scope` metadata after restart | Fixed |

All open bug-fix PRs are actively being reviewed. Note that #4987 (filesystem symlink guard) carries a `priority: p0` label and is the most critical open security item.

---

## 6. Feature Requests & Roadmap Signals

- **Model per conversation** (#4253, closed) – While closed, the underlying need for flexible model switching is addressed in the new preset system (`#5061`) which introduces reusable presets and explicit call ordering. Likely to land in the next minor release.
- **Browser version support** (#5059, closed) – No code change, but indicates a documentation gap.
- **Chats as topics** (#5070, merged) – A major UX overhaul that will appear in the next release, making conversation management more intuitive.
- **Dynamic tool provider lifecycle** (#4858, open) – An architectural refactoring that, if implemented, will improve modularity of MCP and other external tool integrations. Could be a v0.3 milestone.

---

## 7. User Feedback Summary

- **Pain points**: Users with mixed model environments (fast vs. private) find it inconvenient to manually switch presets. The workspace + media path conflict (#5028) frustrates Feishu users who expect uploaded files to remain accessible. The length-recovery issue (#5051) causes silent output loss in long conversations.
- **Satisfaction**: The rapid turnaround on shell-guard bypass (#4592) and the addition of topic-based chats (#5070) demonstrate responsive maintenance. The test infrastructure fix (#5062) shows attention to Linux distribution compatibility.
- **Use cases**: The community leans heavily on multi-model setups (local + cloud), channel integrations (Telegram, Feishu), and document-heavy workflows (DOCX tables in #5039).

---

## 8. Backlog Watch

No issues have gone unanswered for an extended period. The oldest open issue with ongoing attention is:

- **#4858 – Refactor dynamic tool provider lifecycle** (opened 2026-07-09, updated today) – While not stale, it has only 2 comments and no assignee yet. Maintainers may wish to tag a champion.

All other open issues are recent (July 22–23) and have active PRs or comments. The project backlog appears well managed.

---

*All data sourced from GitHub repository HKUDS/nanobot, snapshot as of 2026-07-24.*

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-07-24

## Today's Overview
ZeroClaw saw elevated activity with **50 issues and 50 pull requests updated** in the past 24 hours. The bug-fixing velocity is high — 5 issues were closed, and 1 PR was merged/closed — but the **vast majority of work remains in-progress**, with 45 open issues and 49 open PRs. The project is clearly in a **stabilisation and hardening phase** ahead of a potential v0.9.0 release: multiple S0/S1 severity bugs have been reported and are actively being patched. No new releases were published today. The A2A protocol interoperability ([#3566](https://github.com/zeroclaw-labs/zeroclaw/issues/3566)) and the v0.9.0 security tracker ([#7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432)) remain long-running coordination magnets.

## Releases
None.

## Project Progress
Only **one PR was merged or closed** today (details not visible in the top-20 list). Among the **49 open PRs**, several address critical blocking bugs and are likely to be merged soon:
- **HTTP fan-in for SOP** ([#9203](https://github.com/zeroclaw-labs/zeroclaw/pull/9203)) – adds authenticated `POST /sop/*` endpoints.
- **Telegram multi-message streaming** ([#8561](https://github.com/zeroclaw-labs/zeroclaw/pull/8561)) – a large feature adding paced multi-message delivery.
- **Runtime hardening** – fixes for shared budget wrap‑around ([#9201](https://github.com/zeroclaw-labs/zeroclaw/pull/9201)), cron job timeouts ([#9320](https://github.com/zeroclaw-labs/zeroclaw/pull/9320)), and config flush races ([#9297](https://github.com/zeroclaw-labs/zeroclaw/pull/9297), [#9310](https://github.com/zeroclaw-labs/zeroclaw/pull/9310), [#9299](https://github.com/zeroclaw-labs/zeroclaw/pull/9299)).
- **A2A outbound client** ([#9324](https://github.com/zeroclaw-labs/zeroclaw/pull/9324)) – Phase 1 of the A2A RFC, adding tools and config.
- **Fix for ZeroCode streamed turns** ([#9325](https://github.com/zeroclaw-labs/zeroclaw/pull/9325)) – makes small local models (e.g. Ollama) treat user input as conversation, not log payloads.

## Community Hot Topics
The most active issues by comment count and reactions highlight **interoperability, security, and multi‑agent routing**:

- **A2A protocol interoperability** ([#3566](https://github.com/zeroclaw-labs/zeroclaw/issues/3566)) – 9 comments, 7 👍. The community strongly backs native A2A support. This is the top-voted feature and now has a Phase 1 PR ([#9324](https://github.com/zeroclaw-labs/zeroclaw/pull/9324)).
- **KeySource trait for master‑key material** ([#9127](https://github.com/zeroclaw-labs/zeroclaw/issues/9127)) – 7 comments, RFC stage. Addresses a gap in credential encryption classification.
- **Multi-Agent Routing** ([#2767](https://github.com/zeroclaw-labs/zeroclaw/issues/2767) – **closed**) – 7 comments, 9 👍. Already implemented and closed, but the high reaction count shows strong demand.
- **Log to stderr** ([#4721](https://github.com/zeroclaw-labs/zeroclaw/issues/4721) – **closed**) – 5 comments. A simple but appreciated ergonomic fix.
- **LeakDetector false positives** ([#4832](https://github.com/zeroclaw-labs/zeroclaw/issues/4832) – **closed**) – 5 comments. Community‑requested config toggle for high‑entropy redaction.

**Underlying needs:** Users want secure, interoperable multi‑agent deployments (A2A, multi‑profile) combined with reliable credential management and usable defaults.

## Bugs & Stability
**High‑severity (S0–S1) bugs reported in the last 24h:**

| Issue | Severity | Description | Fix PR |
|-------|----------|-------------|--------|
| [#9188](https://github.com/zeroclaw-labs/zeroclaw/issues/9188) | S0 – data loss | Telegram long‑poll advances offset before successful delivery; voice/attachment failures lose messages. | None yet |
| [#9187](https://github.com/zeroclaw-labs/zeroclaw/issues/9187) | S0 – data loss | WeChat sync cursor persisted before message enqueue; crash loses inbound messages. | None yet |
| [#9192](https://github.com/zeroclaw-labs/zeroclaw/issues/9192) | S1 – blocked | `shared_budget` TOCTOU can wrap `AtomicUsize`; `SopEngine::finish_run` panics under mutex. | [#9201](https://github.com/zeroclaw-labs/zeroclaw/pull/9201) |
| [#9191](https://github.com/zeroclaw-labs/zeroclaw/issues/9191) | S1 – blocked | Cron agent jobs have no wall‑clock timeout; in‑flight locks never released. | [#9320](https://github.com/zeroclaw-labs/zeroclaw/pull/9320) |
| [#9207](https://github.com/zeroclaw-labs/zeroclaw/issues/9207) | S1 – blocked | `web_fetch` returns garbage for gzip/brotli/deflate responses. | None yet |
| [#9204](https://github.com/zeroclaw-labs/zeroclaw/issues/9204) | S1 – blocked | Landlock sandbox restricts the daemon itself (regression from [#5153](https://github.com/zeroclaw-labs/zeroclaw/issues/5153)). | None yet |
| [#9290](https://github.com/zeroclaw-labs/zeroclaw/issues/9290) | S1 – blocked | Windows desktop installer fails at launch with missing `TaskDialogIndirect`. | None yet |
| [#9236](https://github.com/zeroclaw-labs/zeroclaw/issues/9236) | S1 – blocked | Fresh Telegram aliases are dropped after config reload. | None yet |
| [#9284](https://github.com/zeroclaw-labs/zeroclaw/issues/9284) | S2 – degraded | Config flush can overwrite concurrent writes. | [#9297](https://github.com/zeroclaw-labs/zeroclaw/pull/9297) |

**Additional bugs** include: nested `set_prop` masking invalid values ([#9285](https://github.com/zeroclaw-labs/zeroclaw/issues/9285), S3, fix in [#9310](https://github.com/zeroclaw-labs/zeroclaw/pull/9310)); ZeroCode keystroke lag ([#9092](https://github.com/zeroclaw-labs/zeroclaw/issues/9092), S2); Discord typing indicator stuck after daemon reload ([#9198](https://github.com/zeroclaw-labs/zeroclaw/issues/9198), S3); and `zeroclaw desktop` not detecting installed AppImage ([#9202](https://github.com/zeroclaw-labs/zeroclaw/issues/9202), S3, fix in [#9291](https://github.com/zeroclaw-labs/zeroclaw/pull/9291)).

**Security vulnerability:** A weekly `npm audit` ([#9235](https://github.com/zeroclaw-labs/zeroclaw/issues/9235)) reports 3 high/critical findings in `@redocly/openapi-core` — no fix PR yet.

## Feature Requests & Roadmap Signals
The most prominent roadmap driver is **A2A protocol interoperability** ([#3566](https://github.com/zeroclaw-labs/zeroclaw/issues/3566)). A first PR ([#9324](https://github.com/zeroclaw-labs/zeroclaw/pull/9324)) lands outbound client config, wire model, and tools. The **v0.9.0 tracker** ([#7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432)) consolidates auth, security hardening, multi‑agent boundaries, and breaking changes.

Other user‑requested features that are likely to land in the next release:
- **KeySource trait** ([#9127](https://github.com/zeroclaw-labs/zeroclaw/issues/9127)) – RFC in progress for classifying master‑key material.
- **TOTP for cross‑channel critical tools** ([#3767](https://github.com/zeroclaw-labs/zeroclaw/issues/3767)) – P1, accepted, high risk.
- **Schema‑validated tool calls for memory consolidation** ([#4760](https://github.com/zeroclaw-labs/zeroclaw/issues/4760)) – P2, aims to replace fragile prompt‑based JSON.
- **Workspace file and memory change history** ([#3672](https://github.com/zeroclaw-labs/zeroclaw/issues/3672)) – high caller demand for auditability of agent self‑modification.
- **Signal “Note to Self” processing** ([#9158](https://github.com/zeroclaw-labs/zeroclaw/issues/9158)) – a small but welcome channel improvement.
- **Eval results dashboard and trend tracking** ([#9228](https://github.com/zeroclaw-labs/zeroclaw/issues/9228)) – deferred from an earlier tracker; would provide longitudinal pass‑rate trends.

## User Feedback Summary
**Pain points:**
- **Logging to stdout** ([#4721](https://github.com/zeroclaw-labs/zeroclaw/issues/4721)) – fixed and closed; users can now pipe output cleanly.
- **LeakDetector false positives** ([#4832](https://github.com/zeroclaw-labs/zeroclaw/issues/4832)) – fixed with a config toggle.
- **Message lifecycle hooks** ([#3696](https://github.com/zeroclaw-labs/zeroclaw/issues/3696)) – requested for memory integration and logging without prompt hacking.
- **Agent self‑modification history** ([#3672](https://github.com/zeroclaw-labs/zeroclaw/issues/3672)) – users want to track changes to `SOUL.md` and `AGENTS.md`.
- **Windows desktop installer** ([#9290](https://github.com/zeroclaw-labs/zeroclaw/issues/9290)) – launch failure blocks new Windows users.
- **Multi‑agent / multi‑profile workspace** ([#2767](https://github.com/zeroclaw-labs/zeroclaw/issues/2767)) – closed but the high 👍 count shows strong demand for isolated agent environments.

**Satisfaction signals:** The rapid closure of the logging and LeakDetector issues suggests the maintainers are responsive to common complaints. The A2A and multi‑agent routing work aligns with community expectations for interoperability.

## Backlog Watch
Several **long‑standing open items** need maintainer attention or community follow‑up:

- **A2A interoperability** ([#3566](https://github.com/zeroclaw-labs/zeroclaw/issues/3566)) – opened 2026‑03‑15, still open. A large phase‑1 PR ([#9324](https://github.com/zeroclaw-labs/zeroclaw/pull/9324)) was just submitted, so this is now progressing.
- **Message lifecycle hooks** ([#3696](https://github.com/zeroclaw-labs/zeroclaw/issues/3696)) – opened 2026‑03‑16, no PR yet.
- **TOTP for critical tools** ([#3767](https://github.com/zeroclaw-labs/zeroclaw/issues/3767)) – opened 2026‑03‑17, high risk P1, no PR.
- **Workspace change history** ([#3672](https://github.com/zeroclaw-labs/zeroclaw/issues/3672)) – opened 2026‑03‑16, no PR.
- **v0.9.0 auth/security tracker** ([#7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432)) – opened 2026‑06‑09, coordination surface with many sub‑items still open.
- **Signal “Note to Self”** ([#9158](https://github.com/zeroclaw-labs/zeroclaw/issues/9158)) – opened 2026‑07‑19, has a simple fix outlined but no PR.
- **npm audit failure** ([#9235](https://github.com/zeroclaw-labs/zeroclaw/issues/9235)) – automated bot issue, no maintainer response yet.
- **PRs with `needs-author-action` label:** [#8438](https://github.com/zeroclaw-labs/zeroclaw/pull/8438), [#8561](https://github.com/zeroclaw-labs/zeroclaw/pull/8561), [#8966](https://github.com/zeroclaw-labs/zeroclaw/pull/8966), [#9201](https://github.com/zeroclaw-labs/zeroclaw/pull/9201), [#9182](https://github.com/zeroclaw-labs/zeroclaw/pull/9182), [#9291](https://github.com/zeroclaw-labs/zeroclaw/pull/9291), [#8838](https://github.com/zeroclaw-labs/zeroclaw/pull/8838) – these contributions are waiting on author revisions or maintainer re‑review.

**Risk note:** The S0 data‑loss bugs on Telegram and WeChat ([#9188](https://github.com/zeroclaw-labs/zeroclaw/issues/9188), [#9187](https://github.com/zeroclaw-labs/zeroclaw/issues/9187)) have no associated fix PRs yet. If left unaddressed, they could cause user trust erosion in channel reliability.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw Project Digest – 2026-07-24

## Today’s Overview
The PicoClaw project shows moderate activity over the last 24 hours. Two stale bug reports were closed, and 14 pull requests received updates – 6 were merged or closed, while 8 remain open. The majority of PR activity comes from automated dependency bumps, but there are also meaningful feature additions and a critical session-history fix. No new releases were published. Overall project health appears stable with ongoing maintenance and incremental feature work.

## Releases
*None – no releases were created in the last 24 hours.*

## Project Progress
Six pull requests were merged or closed today, including several that advance the codebase:

- **[#3118 – Add remote Pico WebSocket mode to picoclaw agent](https://github.com/sipeed/picoclaw/pull/3118)** (merged) – Introduces an optional `--remote` flag to allow the agent to connect to a Pico via WebSocket, enabling remote agent operation without changing local behavior.
- **[#3115 – Fix inline data URL media extraction for generic tool output](https://github.com/sipeed/picoclaw/pull/3115)** (merged) – Fixes a session-history corruption bug where `data:image/…` strings inside plain-text tool output were incorrectly treated as media attachments.
- **[#3237 – build(deps): bump golang.org/x/sync](https://github.com/sipeed/picoclaw/pull/3237)** (closed/merged)
- **[#3236 – build(deps): bump github.com/github/copilot-sdk/go](https://github.com/sipeed/picoclaw/pull/3236)** (closed/merged)
- **[#3238 – build(deps): bump aws-sdk-go-v2/config](https://github.com/sipeed/picoclaw/pull/3238)** (closed/merged)
- **[#3235 – build(deps): bump github.com/pion/rtp](https://github.com/sipeed/picoclaw/pull/3235)** (closed/merged)

The remote agent mode and the data URL fix are the most notable user-facing improvements this period.

## Community Hot Topics
Issue activity is low; the two closed issues each received moderate discussion:

- **[#2796 – [BUG] History shows only the last user message in multi-message conversations](https://github.com/sipeed/picoclaw/issues/2796)** – 7 comments. Users reported that when revisiting a conversation with multiple user messages, only the final message is visible. The issue was auto-closed as stale after two months of inactivity.
- **[#3195 – [BUG] OpenAI GPT does not work on NanoKVM with default config](https://github.com/sipeed/picoclaw/issues/3195)** – 4 comments. A user on NanoKVM v2.4.0 could not make GPT-5.4 work following official documentation. Also closed as stale.

No PRs attracted comments or reactions.

## Bugs & Stability
Two bugs were closed as stale today, though no explicit fix PRs were linked:

| Issue | Severity | Summary |
|-------|----------|---------|
| [#2796](https://github.com/sipeed/picoclaw/issues/2796) | Medium | History display bug – only last user message visible in multi-message conversations. |
| [#3195](https://github.com/sipeed/picoclaw/issues/3195) | High | OpenAI GPT integration broken on NanoKVM with the default configuration, preventing any interaction. |

A related session corruption bug was fixed in **[PR #3115](https://github.com/sipeed/picoclaw/pull/3115)** (merged today), addressing a root cause of data-loss in tool output handling, which may indirectly improve issues like #2796.

## Feature Requests & Roadmap Signals
Open PRs indicate upcoming features likely to land in the next release:

- **[#3200 – feat(models): add configurable default fallback chain](https://github.com/sipeed/picoclaw/pull/3200)** – Allows users to set a default model and define a fallback chain in the web UI, persisted via backend API. This is a user-requested enhancement for model reliability.
- **[#3222 – refactor(deltachat): cleanup implementation, documentation](https://github.com/sipeed/picoclaw/pull/3222)** – Reduces code size by ~200 lines, drops legacy features, and adds `show_invite_link`. Improvements to the Delta Chat integration.

These features align with ongoing project goals of better model configuration and cleaner protocol support.

## User Feedback Summary
User pain points from the two closed issues:

- **History visibility**: Multi-message conversations lose earlier user messages – a UI/UX regression affecting daily chat use.
- **NanoKVM compatibility**: New hardware integration (NanoKVM 2.4.0) fails out-of-the-box with OpenAI GPT, indicating a gap in default configuration or documentation.

Both issues were resolved? – they were closed as stale, meaning no active fix was confirmed. However, the merged data URL fix (PR #3115) addresses a related corruption problem, which may alleviate some of the history concerns.

Overall user sentiment is mixed: functional improvements are appreciated, but basic bugs persist and stale issues may discourage reporters.

## Backlog Watch
Several open pull requests warrant maintainer attention:

- **Feature/refactor PRs:**
  - [#3200 – Configurable fallback chain](https://github.com/sipeed/picoclaw/pull/3200) (open since July 1, last updated July 23) – Needs review and testing.
  - [#3222 – Delta Chat refactor](https://github.com/sipeed/picoclaw/pull/3222) (open since July 3, last updated July 23) – Requires maintainer approval.

- **Dependency bumps (auto-generated, but still need human review):**
  - [#3263 – actions/setup-node v6→7](https://github.com/sipeed/picoclaw/pull/3263) (open since July 16)
  - [#3262 – actions/setup-go v6→7](https://github.com/sipeed/picoclaw/pull/3262) (open since July 16)
  - [#3291 – copilot-sdk bump](https://github.com/sipeed/picoclaw/pull/3291) (open since July 23)
  - [#3290 – aws config bump](https://github.com/sipeed/picoclaw/pull/3290) (open since July 23)
  - [#3289 – pion/rtp bump](https://github.com/sipeed/picoclaw/pull/3289) (open since July 23)
  - [#3288 – bedrockruntime bump](https://github.com/sipeed/picoclaw/pull/3288) (open since July 23)

No outstanding issues remain unanswered – the two stale issues were auto-closed. The maintainers should prioritize reviewing the open feature PRs (#3200, #3222) to avoid further drift.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw Project Digest — 2026-07-24

## 1. Today’s Overview
Activity remains steady with one open bug and ten pull requests updated in the last 24 hours. Four PRs were merged or closed, including two significant infrastructure changes (Matrix native E2EE adapter and Telegram thread support). The core team is actively fixing concurrency and stability issues, as seen in the open duplicate-container race condition and several targeted fixes. No new releases were published today; the project continues to refine its container orchestration and messaging integration layers.

## 2. Releases
No new releases. *Omit section.*

## 3. Project Progress (Merged/Closed PRs)

- **[#2892] fix(telegram): enable thread support**  
  Merged. Sets `supportsThreads: true` for the Telegram adapter, allowing forum/topic threads to be properly tracked by the agent bridge.  
  [PR #2892](https://github.com/nanocoai/nanoclaw/pull/2892)

- **[#2844] feat(matrix): native persistent E2EE adapter via matrix-bot-sdk**  
  Merged. Replaces the previous Chat SDK bridge with a native Matrix adapter using `matrix-bot-sdk` and Rust-based crypto (`@matrix-org/matrix-sdk-crypto-nodejs`), providing persistent end-to-end encryption. Closes #2843.  
  [PR #2844](https://github.com/nanocoai/nanoclaw/pull/2844)

- **[#3120] fix: keep typing indicator alive through a single long tool call**  
  Merged. Prevents the typing indicator from timing out prematurely during long-running tool operations, improving user experience on platforms that expose typing state.  
  [PR #3120](https://github.com/nanocoai/nanoclaw/pull/3120)

- **[#3115] fix(onecli): block legacy Gmail API routes**  
  Merged. Adds idempotent global blocks for legacy Gmail traffic (`www.googleapis.com` paths) to prevent policy bypasses when using the OneCLI tool. Includes verification steps and reconciliation notes for existing installs.  
  [PR #3115](https://github.com/nanocoai/nanoclaw/pull/3115)

## 4. Community Hot Topics

- **[Issue #2466] Duplicate container spawn race on wakeContainer** (1 open, 2 comments)  
  The only open issue updated today. Describes a race condition where running a script to inject a message and calling `wakeContainer` concurrently with the host sweep results in two identical containers spawning, each processing the same message independently. The label suggests this is a low-priority hardening item.  
  [Issue #2466](https://github.com/nanocoai/nanoclaw/issues/2466)

- **[PR #3119] fix(container-runner): reconcile untracked orphan containers** (open, actively discussed)  
  Proposes a solution to the same duplicate-container problem observed on a continuously running host. One agent group reached three concurrent containers due to a cron-triggered sweep. The fix reconciles orphan containers to enforce a single-container-per-group policy. Likely to be the primary resolution for #2466.  
  [PR #3119](https://github.com/nanocoai/nanoclaw/pull/3119)

- **[PR #2971] Add ncc utility skill: host operational and health CLI** (open, community contribution)  
  A utility skill for host-level operations and health checks, submitted by community contributor zivisaiah. Under review since July 7.  
  [PR #2971](https://github.com/nanocoai/nanoclaw/pull/2971)

## 5. Bugs & Stability

- **Medium severity – Duplicate container spawn race**  
  Issue #2466 reports a race condition leading to duplicate agent containers. A fix PR (#3119) is already open and addresses the root cause by reconciling orphan containers. No crashes reported.

- **Low severity – Typing indicator timeout**  
  Merged PR #3120 resolves an issue where the typing indicator would prematurely stop during long tool calls.

- **Low severity – Reaction delivery reliability**  
  Open PR #3121 proposes making reaction delivery “best-effort,” suggesting the current implementation may drop or fail on reactions under certain conditions.

No regressions or critical crashes were reported today.

## 6. Feature Requests & Roadmap Signals

- **Matrix native E2EE (merged)** – The merge of PR #2844 signals that persistent end-to-end encryption is now a core capability for Matrix users, replacing the older Chat SDK bridge. This will likely be included in the next release.

- **OpenCode compatibility (PR #3122, open)** – A core-team fix to improve compatibility with OpenCode’s main branch, custom endpoint transport, and memory parity. Indicates ongoing alignment with the OpenCode ecosystem.

- **NCC utility skill (PR #2971)** – A community-skill adding a host operational CLI. If merged, it becomes part of the skill library in the next version.

- **Unknown slash command handling (PR #2346, open since May 8)** – Fixes a bug where unknown slash commands were treated as passthrough, causing silent drops. Still awaiting review; a candidate for next release if prioritized.

## 7. User Feedback Summary

No explicit feedback in issues or PRs today. However, the following implicit pain points are evident:

- **Container duplication** – The race condition described in #2466 is a reliability concern for users running persistent agents. The fix in #3119 directly addresses this.
- **Gmail policy bypass** – The OneCLI fix (#3115) was needed because existing installations could inadvertently allow legacy Gmail API traffic; users relying on Gmail integration would have experienced inconsistent behavior.
- **Typing indicator reliability** – Users on platforms that show typing state (e.g., Telegram, Matrix) likely noticed the indicator disappearing during long tool calls; PR #3120 corrects this.

Overall satisfaction appears high given the steady stream of merges and the responsiveness of the core team to open issues.

## 8. Backlog Watch

- **[Issue #2466] Duplicate container spawn race**  
  Opened May 14, 2026; still open with a fix PR (#3119) in progress. This is the oldest open bug and should be resolved soon.

- **[PR #2346] fix(formatter): treat unknown slash commands as normal chat**  
  Opened May 8, 2026; no maintainer activity in over two months. This fix addresses a silent message-drop bug and could benefit from review to avoid user confusion.

- **[PR #2971] Add ncc utility skill**  
  Awaiting maintainer review since July 7. Community contributions like this should be acknowledged to encourage further submissions.

**No other long-dormant items** require immediate attention. The project maintains a healthy cadence of reviews and merges.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-07-24

## 1. Today’s Overview

IronClaw is in a high-velocity launch-preparation phase, with **31 issues** and **50 PRs** touched in the last 24 hours. The “Reborn” architecture simplification continues, and a growing `v1-launch-checklist` backlog is driving rapid bug fixes and configuration improvements. Six issues were closed and 19 PRs were merged, signalling strong forward momentum. However, several blocking issues (Telegram silence, Windows startup failure, and still-unresolved v1 integration gaps) demand immediate attention.

## 2. Releases

**None** – no new versions were published in the last 24 hours.

## 3. Project Progress

Key PRs that were merged (or closed) today moved several critical features and fixes to completion:

- **Extension lifecycle & channel delivery overhaul** – PR [#6520](https://github.com/nearai/ironclaw/pull/6520) (XL, closed) made extension readiness and configuration fully generic, separating tenant admin config from user OAuth membership. This is a foundational change for the v1 product experience.
- **Legacy extension sources removed** – PR [#6594](https://github.com/nearai/ironclaw/pull/6594) (XL, closed) deleted the obsolete `tools-src/` and `channels-src/` trees, cleaning the workspace and CI scoping.
- **WebChat “Disconnected” lockout fixed** – PR [#6592](https://github.com/nearai/ironclaw/pull/6592) (XL, closed) diagnosed two independent bugs (rate-limit budget accounting and SSE navigation race) that caused persistent reconnection issues.
- **Slack / Telegram QA fixes** – PRs [#6602](https://github.com/nearai/ironclaw/pull/6602) (XS), [#6603](https://github.com/nearai/ironclaw/pull/6603) (S), [#6606](https://github.com/nearai/ironclaw/pull/6606) (M), [#6607](https://github.com/nearai/ironclaw/pull/6607) (M), and [#6608](https://github.com/nearai/ironclaw/pull/6608) (XS) resolved post-merge regressions in extension setup, admin-group mapping, and pairing prompt rendering.
- **Final-reply delivery resilience** – PR [#6604](https://github.com/nearai/ironclaw/pull/6604) (L, open) addresses a live incident where a run’s channel was removed mid-run, falling back to web-app delivery.
- **Operator reset script** – PR [#6601](https://github.com/nearai/ironclaw/pull/6601) (L, closed) added a self-contained `reset-extension-state.sh` that preserves admin configuration while clearing user-level state.

Architecture simplification issues closed: [#6389](https://github.com/nearai/ironclaw/issues/6389) (collapse `build_local_runtime` and `build_production_shaped` into one `build_runtime(cfg)`) and [#6274](https://github.com/nearai/ironclaw/issues/6274) (finish `DeploymentConfig`). The heartbeat MVP is being defined (issues [#6569](https://github.com/nearai/ironclaw/issues/6569), [#6570](https://github.com/nearai/ironclaw/issues/6570), [#6571](https://github.com/nearai/ironclaw/issues/6571)) and a “Reborn rename” initiative is underway (issues [#6550](https://github.com/nearai/ironclaw/issues/6550)–[#6552](https://github.com/nearai/ironclaw/issues/6552)).

## 4. Community Hot Topics

| Issue / PR | Comments | Topic |
|---|---|---|
| [#6389](https://github.com/nearai/ironclaw/issues/6389) | 11 (closed) | Collapse two runtime-assembly paths into one – architectural simplification |
| [#6274](https://github.com/nearai/ironclaw/issues/6274) | 5 (closed) | `DeploymentConfig` as main compositon config, now finished |
| [#6524](https://github.com/nearai/ironclaw/issues/6524) | 3 (open) | Epic for a hermetic capability/journey testing platform |
| [#4548](https://github.com/nearai/ironclaw/issues/4548) | 2 (open) | Duplicate `model` field serialised when tools present with DeepSeek (HTTP 400) |
| [#6544](https://github.com/nearai/ironclaw/issues/6544) | 2 (closed) | No UI/CLI to configure Slack redirect URI – fixed in companion work |
| [#6522](https://github.com/nearai/ironclaw/issues/6522) | 2 (open) | IronClaw needs Telegram setup instructions |

The **most active** is #6389 (runtime collapse), which drove a significant refactor. The #6524 testing platform epic signals the team is investing in deterministic coverage, while #4548 remains a frustrating user-facing API integration bug.

## 5. Bugs & Stability

### Critical (blocking workflows)
- **[#6605](https://github.com/nearai/ironclaw/issues/6605)** – Telegram inbound silently dead after extension reinstall (new today, no fix PR yet). A webhook secret is missing from channel config on reinstall.
- **[#6590](https://github.com/nearai/ironclaw/issues/6590)** – `ironclaw serve` fails on Windows with “workspace root must not overlap default skill root”. Local development on Windows is blocked.
- **[#6581](https://github.com/nearai/ironclaw/issues/6581)** – 429 Too Many Requests on WebChat SSE – **fixed** by PR #6592.

### High (breaks specific flows)
- **[#6548](https://github.com/nearai/ironclaw/issues/6548)** – Hosted staging auth wall blocks Telegram/Slack webhooks – **closed** with a workaround.
- **[#6544](https://github.com/nearai/ironclaw/issues/6544)** – Slack redirect URI not persistable – **closed** (fixed via the #6520 ecosystem).
- **[#4575](https://github.com/nearai/ironclaw/issues/4575)** – `systemd` service error right after `ironclaw onboard` on Ubuntu (new, no fix yet).

### Medium (annoyances)
- **[#4548](https://github.com/nearai/ironclaw/issues/4548)** – Duplicate `model` field with DeepSeek tools (still open, 2 comments, age 46 days).
- **[#6591](https://github.com/nearai/ironclaw/issues/6591)** – `ironclaw service restart` fails on hosted staging (workaround via UI).

## 6. Feature Requests & Roadmap Signals

Three large epic issues were created in the last 48 hours that define the near-term roadmap:

- **[#6524](https://github.com/nearai/ironclaw/issues/6524)** – Hermetic capability and journey testing platform. Suggests the team wants to mechanically verify every supported capability.
- **[#6565](https://github.com/nearai/ironclaw/issues/6565)** – Reliable Skill Discovery, Routing, and Activation. Lays out a plan to move beyond a flat model-directed skill list.
- **[#6578](https://github.com/nearai/ironclaw/issues/6578)** – Admin-Managed Agents as UserId Subjects. Enables tenant-wide non-human identities for product agents.

Additional “Reborn rename” issues (e.g., [#6550](https://github.com/nearai/ironclaw/issues/6550), [#6551](https://github.com/nearai/ironclaw/issues/6551), [#6552](https://github.com/nearai/ironclaw/issues/6552)) and the heartbeat MVP (issues [#6569](https://github.com/nearai/ironclaw/issues/6569)–[#6571](https://github.com/nearai/ironclaw/issues/6571)) are strong candidates for the next minor release.

## 7. User Feedback Summary

- **Configuration gaps** – Users (sergeiest, thisisjoshford) repeatedly report missing CLI/UI points for Slack redirect URIs, Google OAuth, Telegram setup, and environment variable persistence. Several have been fixed, but the pattern shows the configuration surface is still incomplete.
- **WebUI stability** – The “Reconnecting” notification and 429 rate-limit issue (fixed today) caused confusion. User sergeiest noted no functional impact but a poor UX.
- **Platform parity** – Windows startup failure (#6590) and missing `ironclaw` CLI on hosted staging (#6521) block developer and operator workflows.
- **Extension lifecycle** – Telegram’s silent death after reinstall (#6605) was discovered by matiasbenary; the team responded the same day, indicating high engagement with real user bugs.

## 8. Backlog Watch

These items have remained open for an extended period or lack maintainer response and **should be prioritised**:

| Issue | Age | Reason for Concern |
|---|---|---|
| [#4548](https://github.com/nearai/ironclaw/issues/4548) | 46 days (since 2026-06-08) | Duplicate `model` field with DeepSeek tools – blocks users of a major provider. No PR attached. |
| [#6521](https://github.com/nearai/ironclaw/issues/6521) | 2 days | `ironclaw` CLI unavailable on hosted staging – blocks operator debugging. No PR or comment from maintainers. |
| [#6522](https://github.com/nearai/ironclaw/issues/6522) | 2 days | Lack of Telegram setup instructions – despite ongoing Telegram QA. No resolution yet. |
| [#6534](https://github.com/nearai/ironclaw/issues/6534) | 2 days | Google OAuth config can’t be applied on hosted deployments – no fix PR. |
| [#6575](https://github.com/nearai/ironclaw/issues/6575) | 1 day | `systemd` service error after `onboard` – fresh but blocking for Ubuntu users. |
| PR [#3997](https://github.com/nearai/ironclaw/pull/3997) | 61 days | Attested signing stack (PR13) – re-ported to current main but still open. Critical for production signing capabilities. |

---

*Digest generated from GitHub data up to 2026-07-24 23:59 UTC.*

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI Project Digest — 2026-07-24

## 1. Today's Overview
The project saw exceptionally high development activity with **50 pull requests merged or closed** in the last 24 hours, while the issue tracker remained quiet with only **3 open issues** (all stale, updated yesterday). No new releases were published. The PR volume indicates a heavy maintenance sprint, primarily focused on **OpenClaw runtime patches**, **scheduled-task routing fixes**, **build stability**, and **cowork session performance**. The absence of new releases suggests these fixes are being accumulated for the next version.

## 2. Releases
**No new releases** were published today.

## 3. Project Progress
The 50 merged/closed PRs advanced several areas:

| Area | Key Improvements |
|------|-----------------|
| **OpenClaw** (`area: openclaw`) | 12+ patches backported to the pinned v2026.6.1 runtime: critical tool-loop termination (#2331, #2330), user-turn cache stability (#2219), task workspace isolation (#2260), plugin approval routing (#2217), DeepSeek prompt cache stability (#2258), fallback max-token limits (#2232), subagent child tool history sync (#2299) |
| **Scheduled Tasks** (`fix(scheduled-task)`) | Gateway-backed run history restoration (#2231), IM group task routing and ID casing preservation (#2306, #2314), normalized legacy jobs |
| **Cowork** (`area: cowork`) | Improved large-session rendering (collapsed tool-result reduced from 64K→16K, diagnostics export (#2264)), repaired subagent panel timestamps (#2261), agent display names for subagents (#2305) |
| **Build & Windows** (`area: build`, `platform: windows`) | Windows binary signing via internal service (#2327), self-healing installer for interrupted `win-resources.tar` extraction (#2326), null-byte stripping ES2020 compatibility (#2309) |
| **Other** | Serialized concurrent browser launches to prevent Chrome leaks (#2328), revert of a model restriction fix (#2340) |

All PRs are closed/merged; no open PRs remain.

## 4. Community Hot Topics
Community discussion was minimal. The only three issues received **1 comment each** and **no reactions**, suggesting low engagement or that users are waiting for maintainer responses.

- **#1263** — [Duplicate scheduled tasks with API rate limit errors](https://github.com/netease-youdao/LobsterAI/issues/1263)  
  *User reports two identical tasks appear on UI, both hitting GitHub API rate limits.* Underlying need: better deduplication or rate-limit handling in scheduled tasks.

- **#1265** — [Per-agent IM bot & model binding](https://github.com/netease-youdao/LobsterAI/issues/1265)  
  *Requests that each agent can be bound to a different IM bot and model (e.g., one for dispatching, another for PPT generation).* Signals demand for multi-agent orchestration capabilities.

- **#1273** — [SQL.js WASM memory crash and database corruption risk](https://github.com/netease-youdao/LobsterAI/issues/1273)  
  *Reports `memory access out of bounds` under high-frequency writes, with non-atomic `fs.writeFileSync` leading to corrupt databases.* This is a critical stability issue (see next section).

None of these issues have been assigned or commented on by maintainers.

## 5. Bugs & Stability
**High severity:**
- **#1273** — SQL.js WASM memory out-of-bounds crash + database corruption. The issue describes a **non-recoverable** crash during high-frequency write scenarios. No fix PR is visible in today’s merge list. This remains an open risk for users with long Cowork sessions or high message throughput.

**Medium severity:**
- **#1263** — Duplicate scheduled tasks and API rate limit errors. May be partially addressed by PRs #2306 and #2314 (IM group routing fixes), but the duplication root cause and rate-limit handling are not explicitly fixed.

**Low severity:**
- Several OpenClaw loop and abort handling fixes (#2331, #2330) were merged today, directly targeting infinite loops and aborted tool runs that could cause agent hangs.

Overall, the 50 merged PRs are heavily weighted toward stability patches, indicating the team is actively addressing bug reports even if the exact GitHub issues aren’t linked.

## 6. Feature Requests & Roadmap Signals
The strongest signal is **#1265** — multi-agent IM and model binding. This aligns with recent Cowork enhancements (subagent support, display names) and the general trend toward agent teams. Given the active OpenClaw patching, this feature may appear in the next minor release.

Other signals:
- Improved diagnostics (PR #2264 added a raw session ZIP export for debugging) suggests the team values user-friendliness for error reporting.
- The revert of PR #2337 (model restriction fix) indicates some API-level changes are still in flux.

No major new feature PRs were merged today; the focus remains on stabilizing existing functionality.

## 7. User Feedback Summary
- **Pain points:** Duplicate tasks with rate-limit errors (#1263), inability to assign different models to different agents (#1265), severe data loss risk from database corruption (#1273).
- **Use cases:** Multi-agent teams with distinct roles; high-frequency Cowork sessions; IM integration with WeCom and DingTalk.
- **Satisfaction:** Likely low due to the database corruption issue and lack of maintainer responses on open issues. However, the high volume of merged fixes may improve trust.

## 8. Backlog Watch
All three open issues are **stale** (created April 2, last updated July 23) and have no maintainer comments:

1. **#1273** (SQL.js crash & corruption) — **Critical.** No fix PR, no assignment. Should be prioritized; users may be experiencing data loss.
2. **#1265** (per-agent IM/model binding) — **Feature request** with moderate effort; could be scheduled for next release.
3. **#1263** (duplicate scheduled tasks) — **Bug** with low severity but annoying UX. May be partially fixed by recent PRs, but not explicitly addressed.

No PRs are open, and no other long-unanswered items exist in the provided data.

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis Project Digest — 2026-07-24

## 1. Today's Overview
Moltis saw elevated activity over the past 24 hours: two issues were updated (one remains open), five pull requests were merged, and two new releases were published. All five PRs are closed or merged, indicating a focused push on bug fixes and feature completeness. The project appears healthy, with maintainers actively addressing community-reported problems and security improvements. The sole open issue concerns Podman runtime incompatibility, which remains unresolved.

## 2. Releases
Two releases were published today: **20260723.03** and **20260723.02**. No release notes or changelogs are provided in the data feed, so the exact changes between these versions cannot be detailed. They likely contain fixes and improvements from the five merged PRs listed below. Users are advised to update to the latest version (20260723.03) and consult the repository’s release history for any potential breaking or migration notes.

## 3. Project Progress
All five pull requests updated in the last 24 hours were merged or closed:

- **#1124** – *Add context command support for chat turns* (author: gptme-thomas). Introduces an optional `chat.context_command` that runs before each turn, appending stdout to the prompt. Useful for dynamic runtime context injection without manual copy-pasting. Includes config schema, template, validation, and documentation.
- **#1162** – *fix(web): show dates for older sessions* (author: shixi-li). Resolves bug #1108 where session list only showed times for past-day sessions. Now displays “Yesterday”, weekday labels, and full calendar dates (with year when needed) for older sessions.
- **#1164** – *fix(slack): allow operator-approved API base hosts* (author: penso). Moves Slack API base URL validation into the shared channels crate and adds an operator-controlled `MOLTIS_SLACK_API_BASE_URL_ALLOWLIST` environment variable for internal proxy support while keeping cloud metadata endpoints blocked.
- **#1163** – *fix(slack): challenge unknown allowlist DMs with OTP* (author: penso). Fixes empty allowlist semantics (for DMs and channels) that could expose access. Introduces OTP self-approval for non-allowlisted DM users, and corrects similar empty-allowlist bypasses in Microsoft Teams and Matrix.
- **#1161** – *chore(deps): bump astro from 7.0.9 to 7.1.3 in /docs* (dependabot). Routine dependency update for the documentation site.

## 4. Community Hot Topics
Community engagement on issues and PRs is low. The most notable item is the open bug:

- **[#1095] [Bug]: Podman is not working via Moltis** — opened by RokkuCode on 2026-06-03, last updated 2026-07-23, one comment. No reactions or assignee. The user reports that Podman (an alternative to Docker) fails to integrate. The underlying need is broader container runtime support, which is critical for users running rootless or daemonless setups.

No PRs or issues accumulated reactions or multiple comments.

## 5. Bugs & Stability
One new bug was fixed today, and one older bug remains open.

**Fixed:**
- **#1108** – Session list displayed only time (no date) for past-day sessions. Fixed by PR #1162 (merged). *Severity: Low (UI clarity).*

**Open (active):**
- **#1095** – Podman not working. *Severity: Medium (affects users of Podman, a common Docker alternative).* No fix PR exists yet.

Additional stability improvements were made via Slack-related fixes (PRs #1164, #1163) which close potential security gaps in allowlist handling.

## 6. Feature Requests & Roadmap Signals
The merged PR #1124 (context command support) is a new feature that enhances chat turn automation. This suggests the team is investing in making Moltis more programmable for deployment use cases.

PR #1163 introduces OTP self-approval for Slack DMs, pointing toward a self-service security model. No explicit feature requests appear in the issue tracker this week, but the Podman bug (#1095) could signal demand for broader container runtime compatibility in an upcoming release.

## 7. User Feedback Summary
User-reported pain points:
- **Podman incompatibility** (RokkuCode): Frustration that a widely used container runtime is unsupported.
- **Date display in session list** (IlyaBizyaev): UI confusion when sessions span days.

Both are bugs rather than feature requests. The quick turnaround on the date display fix (opened June 5, fixed July 23 via #1162) indicates responsiveness to usability issues. No expressions of satisfaction/dissatisfaction beyond the bug reports.

## 8. Backlog Watch
The following issue has been open for over seven weeks without a fix or assignee:

- **[#1095] Podman is not working via Moltis** — opened 2026-06-03, last updated 2026-07-23, no assignee. The project maintainers should prioritize triaging this bug, as it affects users relying on non-Docker container runtimes. A fix PR or at least a workaround guidance would reduce community frustration.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw Project Digest — 2026-07-24

## 1. Today's Overview
CoPaw is undergoing an intense development surge following the release of **v2.0.1-beta.2**, with **30 issues** updated (18 open, 12 closed) and **50 pull requests** (29 open, 21 merged/closed) in the past 24 hours. The project shows a healthy mix of rapid bug-fixing, feature expansion, and community engagement, though several stability and performance regressions from the v2.0 transition are drawing significant attention. The release pipeline is active, with multiple CI and chore PRs targeting the v2.0.1 stable milestone.

## 2. Releases
**New version: [v2.0.1-beta.2](https://github.com/agentscope-ai/CoPaw/releases/tag/v2.0.1-beta.2)**  
*Published 2026-07-23*

### What’s Changed
- **CI/unified release:** `feat(ci): unified release orchestrator gating web on desktop build` by @yutai78786 (#6329)
- **Runtime fix:** `fix(runtime): rotate text message on new reasoning block` by @zhaozhuang521 (#6310)
- Additional unreviewed changes listed in the release notes (truncated in source data).

### Breaking Changes & Migration Notes
- No breaking changes documented in the release. The beta appears to focus on stabilizing the release pipeline and runtime behavior.

## 3. Project Progress
In the last 24 hours, **21 PRs were merged or closed**. Key work includes:

- **Governance & Security:**
  - `fix(governance): honor audit_level=none before persisting events` (#6368) — stops unnecessary SQLite writes when auditing is disabled.
  - `fix(governance): approval dialog UI risk` (#6354) — design fix to reduce accidental permanent permission grants.
- **Memory & Context:**
  - `fix(memory): guide failed memory edits` (#6351) — agents now reload and rewrite MEMORY.md after a failed edit instead of infinite retries.
- **Desktop & CI:**
  - `fix(desktop): graceful shutdown` (#6219) — replaces force-kill with proper teardown on Windows.
  - `feat(providers): add AIOnly as built-in provider` (#6268) — new inference provider with 190+ models.
- **Chores & Release Prep:**
  - `chore: bump version to v2.0.1` (#6404) and `chore: update date for v2.0.1 release` (#6416) — stable release imminent.

## 4. Community Hot Topics
Most active discussions (sorted by comment count):

| Issue/PR | Title | Comments | Link |
|----------|-------|----------|------|
| #6307 | [Performance] v2.0 introduces ~2s fixed overhead per reply | **6** | [Issue](https://github.com/agentscope-ai/QwenPaw/issues/6307) |
| #6344 | [Feature] Docker hot-update to avoid container rebuilds | **3** | [Issue](https://github.com/agentscope-ai/QwenPaw/issues/6344) |
| #6342 | [Question] ReMe embedding – how to verify vector storage? | **3** | [Issue](https://github.com/agentscope-ai/QwenPaw/issues/6342) |
| #6363 | [Bug] Tool_call arguments polluted, breaks all execution | **3** | [Issue](https://github.com/agentscope-ai/QwenPaw/issues/6363) |
| #6407 | [Bug] ReAct context mixes tool_result into assistant messages | **2** | [Issue](https://github.com/agentscope-ai/QwenPaw/issues/6407) |
| #6405 | [Question] MCP tool "not found" after v2.0 upgrade | **2** | [Issue](https://github.com/agentscope-ai/QwenPaw/issues/6405) |

**Underlying needs:**  
- **#6307** reveals performance regression that hits every interaction, a top priority for user experience.  
- **#6344** reflects a common Docker user pain point: frequent updates destroying local runtime installations.  
- **#6342** indicates documentation gaps for memory features.  
- **#6363** shows brittle tool-call parsing for certain models (GLM, DeepSeek). Several fix PRs are already open (see Bugs section).

## 5. Bugs & Stability
Reported bugs from today’s activity, ranked by severity:

| Severity | Issue | Description | Fix PR Exists? |
|----------|-------|-------------|----------------|
| **Critical** | [#6363](https://github.com/agentscope-ai/QwenPaw/issues/6363) | Tool_call arguments polluted with markdown/XML – all tool execution fails for some models | PR #6395 (coercion fix) |
| **Critical** | [#6307](https://github.com/agentscope-ai/QwenPaw/issues/6307) | 2-second overhead per reply in v2.0 (performance regression) | No direct fix yet |
| **High** | [#6407](https://github.com/agentscope-ai/QwenPaw/issues/6407) | ReAct agent mixes tool_result into assistant messages – breaks OpenAI API validation | No fix PR |
| **High** | [#6405](https://github.com/agentscope-ai/QwenPaw/issues/6405) | MCP tool "not found" after v2.0 upgrade | Investigation needed |
| **Medium** | [#6406](https://github.com/agentscope-ai/QwenPaw/issues/6406) | Windows shell command collapses multiline PowerShell | PR #6412 (fix submitted) |
| **Medium** | [#6401](https://github.com/agentscope-ai/QwenPaw/issues/6401) | Scheduled tasks overwrite existing conversation history | None |
| **Medium** | [#6239](https://github.com/agentscope-ai/QwenPaw/issues/6239) | Windows PATH concatenation drops semicolons – child processes miss npm globals | None |
| **Low** | [#6379](https://github.com/agentscope-ai/QwenPaw/issues/6379) | Official plugin blocked by governance policy (false positive) | None |
| **Low** | [#6386](https://github.com/agentscope-ai/QwenPaw/issues/6386) | Repeated tool calls with specific GGUF model | None |

**Additional note:** Bug [#6376](https://github.com/agentscope-ai/QwenPaw/issues/6376) reports `loop` feature crashes the entire process in v2.0.0.post3/4 – declared closed but suggests insufficient stress testing.

## 6. Feature Requests & Roadmap Signals
Most requested features from today's issues:

| Issue | Request | Likelihood for Next Release |
|-------|---------|----------------------------|
| [#6344](https://github.com/agentscope-ai/QwenPaw/issues/6344) | Docker web-side hot-update (AstrBot-like) | Medium – high community demand, but architectural change |
| [#6392](https://github.com/agentscope-ai/QwenPaw/issues/6392) | Per-agent token usage statistics | Low – maintainer suggests plugin development |
| [#6377](https://github.com/agentscope-ai/QwenPaw/issues/6377) | Expose agent as API with defined request/response bodies | Medium – aligns with plugin/SDK direction |
| [#6413](https://github.com/agentscope-ai/QwenPaw/issues/6413) | Simplify UI: remove "Full Mode" confusion | Likely – UX polish for v2.0 line |
| [#6408](https://github.com/agentscope-ai/QwenPaw/issues/6408) | Undo/redo last conversation round (like Cherry Studio) | Medium – common UX ask |
| [#6403](https://github.com/agentscope-ai/QwenPaw/issues/6403) | RobotFramework syntax highlighting in Coding Mode | Low – niche |
| [#6380](https://github.com/agentscope-ai/QwenPaw/issues/6380) | Optimize update process for HDD users (currently 1.5 hours) | Likely – pain point for NAS/HDD users |

**Roadmap signals:** Multiple open PRs point to upcoming stable v2.0.1. The `feat(computer-use)` PR (#5187) for Windows GUI automation and `feat(browser)` unified browser SDK (#6276) indicate major feature tracks still in development.

## 7. User Feedback Summary
Real user sentiments captured from issues:

- **Performance dissatisfaction:** "v2.0 introduces ~2s fixed overhead" – users are noticing the regression immediately.
- **Docker frustration:** Frequent updates destroy manually installed tools (Node, ffmpeg, LibreOffice) – a core pain for self-hosted users.
- **Configuration confusion:** The "Full Mode" vs "Simplified Mode" UI is widely reported as confusing; users want a simple gear icon to access settings.
- **Security policy overreach:** Official plugin `generate_image_gpt` blocked by governance policy – user finds it ironic that first-party content is banned.
- **Update time:** HDD users report 1.5-hour update cycles, making adoption painful for NAS environments.
- **Positive signals:** Community is contributing first-time PRs (e.g., #6412 Windows multiline fix) and feature proposals (AIOnly provider added).

## 8. Backlog Watch
Issues and PRs that have been open for extended periods without maintainer resolution:

| Item | Created | Last Updated | Priority | Link |
|------|---------|--------------|----------|------|
| [#2999](https://github.com/agentscope-ai/QwenPaw/issues/2999) [Bug] Repeated MCP client registration leads to task cancellation | 2026-04-06 | 2026-07-24 | High | Still open after 3+ months. Causes CancelledError for slow MCP servers. |
| [#3015](https://github.com/agentscope-ai/QwenPaw/issues/3015) [Bug] MEMORY.md write failure causes infinite retry loop | 2026-04-07 | 2026-07-23 | High | Partially addressed by PR #6351 (merged today) but root cause may remain. |
| [#6239](https://github.com/agentscope-ai/QwenPaw/issues/6239) [Bug] Windows PATH concatenation drops semicolons | 2026-07-18 | 2026-07-23 | Medium | No attention from maintainers; affects npm/pip child processes. |
| [#5187](https://github.com/agentscope-ai/QwenPaw/pull/5187) [PR] Windows desktop GUI automation | 2026-06-14 | 2026-07-24 | Major | Large PR under review – no activity from reviewers in 2+ weeks. |
| [#6323](https://github.com/agentscope-ai/QwenPaw/pull/6323) [PR] Staged compaction for Scroll context | 2026-07-21 | 2026-07-24 | High | Under Review but no reviewer comments yet. |

**Notable:** Two issues (#2999 and #3015) have been open since early April – they affect core reliability and should be prioritized for the v2.0.1 stable release.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

# ZeptoClaw Project Digest – 2026-07-24

## Today’s Overview
ZeptoClaw saw moderate activity in the last 24 hours with two critical issues opened and one pull request submitted. Both issues are labelled `P1-critical` and relate to safety and CI reliability, indicating a focused effort on hardening the project. The open PR (#645) directly addresses one of these bugs by scrubbing subprocess environments and improving timeout handling, suggesting that the team is responsive to high-severity problems. No new releases were published, and no pull requests were merged or closed during the period. Overall, the project remains in a stable maintenance phase with clear attention to security and stability.

## Releases
*No new releases in the last 24 hours.*

## Project Progress
- **No merged or closed PRs today.**  
  The only open PR is #645 (see below), which targets two of the most pressing issues currently tracked. Its progress is being treated as the project’s main forward movement today.

## Community Hot Topics
With zero comments or reactions on any item, the “hot topics” are defined solely by the severity of the issues and the direct relevance of the PR. The following items represent the entire active conversation on the repository.

- **[#646 – chore(ci): restore Clippy and cargo-deny checks on current toolchain](https://github.com/qhkm/zeptoclaw/issues/646)**  
  Opened by qhkm. This is a chore issue that blocks CI. While no user commentary exists, the underlying need is clear: the project must bring its CI pipeline back to green after toolchain upgrades and new dependency vulnerabilities were exposed.

- **[#644 – bug(safety): scrub subprocess environments and terminate process trees on timeout](https://github.com/qhkm/zeptoclaw/issues/644)**  
  Opened by qhkm. A critical safety bug where runtime subprocesses inherit ZeptoClaw’s full environment and timeouts do not properly reap descendant processes. This directly affects security and reliability for users running model-authored commands.

- **[#645 – fix(runtime): scrub subprocess secrets and reap timed-out process trees](https://github.com/qhkm/zeptoclaw/pull/645)**  
  Opened by qhkm. This pull request is the direct fix for issue #644. It also includes Docker-specific cleanup. The absence of comments suggests either internal review is underway or the maintainer is working solo.

## Bugs & Stability
Two critical issues were reported today, both ranked `P1-critical`.

- **#644 – subprocess environment leak and timeout reaping**  
  *Severity: Critical* – Exposes provider keys and unrelated credentials to shell commands, and can leave zombie processes after timeouts. A fix PR (#645) already exists, indicating high priority.  
  *Link: [Issue #644](https://github.com/qhkm/zeptoclaw/issues/644)

- **#646 – CI pipeline broken by Clippy warnings and vulnerable dependencies**  
  *Severity: Critical* – Prevents CI from passing for any PR. The issue documents five new Clippy warnings in Rust 1.97.1 and two vulnerable dependencies (quick-xml 0.39.2, lopdf 0.40.0). No fix PR has been opened yet, but the chore is straightforward.  
  *Link: [Issue #646](https://github.com/qhkm/zeptoclaw/issues/646)

No regressions or stability regressions beyond these two were noted.

## Feature Requests & Roadmap Signals
No explicit feature requests were visible in today’s data. The activity is exclusively focused on bug fixes and CI maintenance. The emphasis on safety and security suggests that upcoming releases will prioritise hardening over new functionality. If any user-requested features exist in the backlog, they were not updated in the last 24 hours.

## User Feedback Summary
There are no direct user comments or reactions today. However, the content of the two critical issues reveals implicit user pain points:
- Users running code execution (shell commands via ZeptoClaw) are at risk of credential leakage if their environment is not scrubbed.
- Users relying on ZeptoClaw’s timeout mechanism may encounter leaked processes or resource exhaustion because process trees are not fully reaped.

These are serious operational concerns that, once fixed, will significantly improve trust in the platform.

## Backlog Watch
No long-unanswered issues or PRs were observed in today’s data. The project appears to be actively managing its backlog with no items older than 24 hours needing maintainer attention. The most recent activity (issues #644, #646 and PR #645) is all from the same author (qhkm), suggesting the maintainer is driving the critical fixes personally.

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

No activity in the last 24 hours.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar).*