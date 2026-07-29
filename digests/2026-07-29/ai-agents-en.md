# OpenClaw Ecosystem Digest 2026-07-29

> Issues: 500 | PRs: 500 | Projects covered: 13 | Generated: 2026-07-29 02:56 UTC

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

# OpenClaw Project Digest — 2026-07-29

## Today’s Overview
The project saw extremely high activity: **500 issues** and **500 PRs** were updated in the last 24 hours, with **220 open issues** and **229 open PRs**. Across the same window, **280 issues** and **271 PRs** were closed or merged, indicating a strong fix-and-release cadence. A new beta release, **v2026.7.2-beta.5**, landed today, focusing on **state safety and crash recovery**. The development pulse remains intense, with many community-reported regressions (especially from the 2026.7.x series) being addressed in parallel.

---

## Releases
- **v2026.7.2-beta.5** – [openclaw/openclaw releases](https://github.com/openclaw/openclaw/releases)
  - **Highlights:** 
    - **State safety & recovery:** quarantine store for primary-database damage, crash-recoverable SQLite snapshots, crash-durable filesystem publication, schema-upgrade data-loss rejection, and rollback-writer snapshot recovery.
    - No explicit breaking changes or migration notes in the provided data; the release is a beta patch intended to harden data persistence.
  - *Implication:* Users experiencing session/data corruption from earlier betas should test this version.

---

## Project Progress
**Today’s merged/closed pull requests** (key selections from the 271 closed/merged):

- **#115350** – `fix(telegram): media_group album splits into separate agent turns under durable ingress` – closes #115325, now merged.
- **#115474** – `fix: prevent duplicate agent turns and slow Codex harness runs` – merged, related to #114574.
- **#115496** – `fix(ui): stabilize Workboard form-state E2E` – CI flake resolution.
- **#115493** – `fix(agents): throw CompactionError when summarization fails` – ensures explicit error instead of silent fallback.
- **#115350** – (also listed, see above).
- **#114172** – `fix(auto-reply): strip sentence-attached trailing NO_REPLY` – merged, improves reply reliability.
- **#111666** – `fix(cron): exclude lane waits from setup timeout` – merged, prevents spurious timeout.
- **#108075, #108182, #113434, #112696, #91532, #106403** – several P1/P2 regressions closed today, including issues related to LLM provider rejection, Control UI regression, Codex session crashes, and cron false positives.

The merged PRs focus on **Telegram album handling, Codex/E2E reliability, agent compaction errors, and cron job robustness**.

---

## Community Hot Topics
Most active issues (by comment count and reactions) this week:

| Issue | Comments | 👍 | Summary |
|-------|----------|----|---------|
| [#75 – Linux/Windows Clawdbot Apps](https://github.com/openclaw/openclaw/issues/75) | 115 | 80 | Long-standing request for desktop apps on Linux/Windows (macOS and mobile exist). **Underlying need:** cross-platform parity for the “Clawdbot” node application. |
| [#7707 – Memory Trust Tagging by Source](https://github.com/openclaw/openclaw/issues/7707) | 23 | 0 | Tag memory entries by trust level to prevent poisoning. **Need:** security against injection attacks via untrusted web scrapes/third-party skills. |
| [#91588 – Gateway Memory Leak (OOM)](https://github.com/openclaw/openclaw/issues/91588) | 20 | 1 | P0 – RSS grows from 350MB to 15.5GB over days, causing OOM crashes. **Critical stability concern.** |
| [#96857 – Tool text outputs degrade to “(see attached image)”](https://github.com/openclaw/openclaw/issues/96857) | 15 | 4 | Agent receives placeholders instead of actual text output – blind agent issue. |
| [#10659 – Masked Secrets](https://github.com/openclaw/openclaw/issues/10659) | 14 | 4 | Prevent agent from reading raw API keys. **Security + prompt injection mitigation.** |
| [#115326 – Crash-loop breaker suppresses Discord/WhatsApp permanently](https://github.com/openclaw/openclaw/issues/115326) | 12 | 0 | Reported today – regression that locks out channels permanently. |
| [#11665 – Webhook session reuse for multi-turn](https://github.com/openclaw/openclaw/issues/11665) | 11 | 0 | documented but broken feature – `sessionKey` consistency not working. |
| [#108075 – LLM request failed: provider rejected schema/tool payload](https://github.com/openclaw/openclaw/issues/108075) | 11 | 1 | P1 regression – closed today. |
| [#113434 – Codex sessions.reset reuses retired session, RAM exhaustion](https://github.com/openclaw/openclaw/issues/113434) | 10 | 0 | P1 – closed today with fix. |
| [#6615 – Denylist support for exec-approvals](https://github.com/openclaw/openclaw/issues/6615) | 10 | 8 | “Allow everything except X” policy – strong community support. |

**Key takeaway:** Security (memory tagging, masked secrets, denylist) and reliability (memory leaks, crash loops) dominate community discussion.

---

## Bugs & Stability
**Critical (P0/P1) bugs reported or active today:**

- **#91588** – Gateway Memory Leak (P0) – **still open** – RSS growth to 15.5GB over days → OOM. No fix PR yet linked. *Impact: production-destroying.*
- **#113434** – Codex sessions reset reused retired session → RAM exhaustion (P1) – **closed today** with fix.
- **#108075** – LLM provider rejected schema/tool payload (P1) – **closed today** – regression in 2026.7.1.
- **#115326** – Crash-loop breaker permanently disables Discord/WhatsApp (P1) – **open** – reported 2026-07-28, no fix PR yet.
- **#114137** – Visible channel turns dispatch with no queued reply payloads (P1) – **open** – text persisted but never delivered.
- **#113323** – LLM idle timeout aborts runs during reasoning-token streaming (P1) – **closed today** – fix merged.
- **#98435** – MCP loopback transport not re-handshaking after gateway restart (P1) – **open** – recovered=1 misleading.
- **#88955** – qqbot WebSocket reconnection fails with "Outbound not configured" (P1) – **open** – regression.

**Regression reports from 2026.7.x:** Several issues point to 2026.7.1 and 2026.7.2-beta.x breaking prior behavior – particularly around tool schemas, Control UI navigation, Telegram/Signal message delivery, and session recovery. The high volume of closed regressions suggests maintainers are actively patching.

---

## Feature Requests & Roadmap Signals
Top user-requested features that could appear in the next minor release:

| Feature | Issue | Priority | Likelihood |
|---------|-------|----------|------------|
| **Linux/Windows Clawdbot Apps** | [#75](https://github.com/openclaw/openclaw/issues/75) | P2 | Moderate – highest 👍 count (80) but no recent maintainer comment. |
| **Memory Trust Tagging** | [#7707](https://github.com/openclaw/openclaw/issues/7707) | P2 | Moderate – security urgency may push it up. |
| **Masked Secrets** | [#10659](https://github.com/openclaw/openclaw/issues/10659) | P1 | High – security + prompt injection protection is aligned with roadmap. |
| **Denylist for exec-approvals** | [#6615](https://github.com/openclaw/openclaw/issues/6615) | P2 | Moderate – high community support (8 👍). |
| **Filesystem Sandboxing** | [#7722](https://github.com/openclaw/openclaw/issues/7722) | P2 | Low – stalled with questions. |
| **Sub-agent announce suppression** | [#8299](https://github.com/openclaw/openclaw/issues/8299) | P2 | Low – niche use case. |
| **Model fallback on context length exceeded** | [#9986](https://github.com/openclaw/openclaw/issues/9986) | P2 | Moderate – fallback logic could be extended. |
| **WhatsApp sticker send support** | [#7476](https://github.com/openclaw/openclaw/issues/7476) | P2 | Low – niche. |

**Prediction:** The next version (v2026.7.3 or v2026.8) will likely include **masked secrets** and **memory trust tagging** given the security focus in recent releases. Linux/Windows apps remain a high-visibility item but require significant client-side work.

---

## User Feedback Summary
- **Pain Points:**
  - Memory leaks (#91588) – “repeated OOM crashes make the gateway unusable after 2–3 days.”
  - Tool output placeholders (#96857) – “agent becomes blind to command outputs.”
  - Crash-loop breaker lockout (#115326) – “documented recovery fails with WebSocket 1006.”
  - Missing Control UI pages (#108182) – “Skill Proposals and Dreaming gone after upgrade.”
  - Windows zombie processes (#74378) – “node.exe remains alive after every CLI command.”
  - Telegram/Signal message delivery failures (#114137, #111519) – “text persisted but never delivered.”
- **Satisfaction Signals:**
  - Issue #73537: “Thank you for OpenClaw… it has genuinely become part of our daily workflow.”
  - Frequent acknowledgments that the project is “beta” but production-grade for many.
- **Recurring Theme:** Users are pushing for **production stability labels** (#73537) to track which releases are safe for unsupervised operation.

---

## Backlog Watch
Issues and PRs that have been open for weeks/months without maintainer action, now accumulating comments and risk:

- **#75** (Linux/Windows Apps) – open since 2026-01-01, 115 comments, no fix PR. Requires native app development.
- **#7707** (Memory Trust Tagging) – open since 2026-02-03, needs maintainer review and product decision.
- **#10659** (Masked Secrets) – open since 2026-02-06, needs security review; linked PR open (#?).
- **#6615** (Denylist for exec-approvals) – open since 2026-02-01, needs maintainer review; linked PR open.
- **#7722** (Filesystem Sandboxing) – open since 2026-02-03, needs live repro and maintainer review.
- **#73537** (Production-readiness stability labels) – open since 2026-04-28, needs a decision.
- **#90098** (Stack-safe large attachment handling) – open since 2026-06-04, linked PR open.
- **#98790** (Concurrent agent-to-agent turn forks session tree) – open since 2026-07-01, P1, needs live repro and maintainer review.
- **#102268** (Silent empty tool results in long Sonnet sessions) – open since 2026-07-08, P1, needs live repro.
- **#115001** (Hybrid memory search spurious 1.0 similarity scores) – open since 2026-07-28, new but with strong evidence.

**Recommendation:** Maintainers should prioritize #91588 (memory leak – P0) and #115326 (crash-loop breaker – P1) for immediate fixes, then revisit the older security features (#7707, #10659) that have been pending for five months.

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report: Personal AI Assistant Open-Source Ecosystem

## 2026-07-29

---

## 1. Ecosystem Overview

The personal AI assistant open-source landscape is in a phase of intense maturation, with the six actively developed projects processing a combined **~660 issues and ~720 pull requests** daily. The ecosystem is converging on shared concerns around **production reliability** (memory leaks, crash recovery, session persistence), **security hardening** (credential masking, memory poisoning prevention, sandbox escapes), and **multi-channel delivery** (Telegram, WhatsApp, Discord, Slack, enterprise IM). While OpenClaw remains the reference implementation with the largest community, specialized forks (NanoBot, Zeroclaw, PicoClaw, IronClaw, CoPaw) are carving distinct niches in performance, platform support, and enterprise feature sets. Two projects (NullClaw, TinyClaw, EasyClaw) show no recent activity, indicating consolidation around the stronger implementations.

---

## 2. Activity Comparison

| Project | Issues (24h) | PRs (24h) | Release Today | Health Score |
|---------|------------|-----------|---------------|--------------|
| **OpenClaw** | 500 updated (220 open) | 500 updated (229 open, 271 merged) | ✅ v2026.7.2-beta.5 | **Strong** – massive throughput, rapid regression fixes |
| **NanoBot** | 7 updated (5 open) | 40 updated (21 merged) | ❌ | **High** – focused WebUI/security work, quick turnover |
| **Zeroclaw** | 49 updated (42 open) | 50 updated (0 merged) | ❌ | **Moderate** – high issue volume, but zero PR merges signals bottleneck |
| **PicoClaw** | 4 updated (1 open) | 10 updated (3 merged) | ❌ | **Moderate** – small team, active but slow on older items |
| **NanoClaw** | 1 open | 10 updated (4 merged) | ❌ | **Moderate** – steady maintenance, low community engagement |
| **IronClaw** | 50 updated (16 closed) | 50 updated (15 merged) | ❌ | **Strong** – epic-driven development, high merge velocity |
| **LobsterAI** | 1 new | 5 merged | ❌ | **Moderate** – incremental fixes, low community discussion |
| **Moltis** | 0 updated | 8 updated (2 merged) | ❌ | **Moderate** – active feature branches, low reactivity |
| **CoPaw** | 13 updated (3 closed) | 50 updated (17 merged) | ❌ | **High** – rapid iteration, aggressive test coverage improvement |
| **ZeptoClaw** | 0 updated | 2 updated (1 merged) | ❌ | **Low** – only automated dependency bumps |
| **NullClaw / TinyClaw / EasyClaw** | 0 | 0 | ❌ | **Inactive** – no development in 24h |

---

## 3. OpenClaw's Position

**Advantages over peers:**
- **Community scale** – 500 daily issues/PRs is **10x** the next most active project (IronClaw/CoPaw at ~50 each). This provides the fastest bug discovery and fix cycle.
- **Release maturity** – Beta releases multiple times weekly (v2026.7.2-beta.5 today) with explicit changelogs and migration notes. Only OpenClaw ships beta releases with this cadence.
- **Security feature depth** – Masked secrets, memory trust tagging, crash-loop breakers, denylist approvals – no peer project has this breadth of production security features.
- **Multi-channel breadth** – Telegram, Discord, WhatsApp, Signal, SMS – broader channel support than any fork.

**Technical approach differences:**
- **Core reference architecture** – OpenClaw uses a monolithic gateway with plugin-based skill/skill-marketplace model. Peers like Zeroclaw (Rust) and NanoBot (Python) are pursuing WASM plugin isolation or extension platforms respectively.
- **State safety** – The new crash-recoverable SQLite snapshots and quarantine store in beta.5 are unique to OpenClaw; no peer project has equivalent durability guarantees.
- **Testing coverage** – OpenClaw has 220 open issues and 229 open PRs, indicating a highly active but somewhat overwhelmed triage pipeline. CoPaw's explicit coverage gates (`fail_under=50`) are more disciplined.

**Community size comparison:**
- While precise contributor counts aren't available, **OpenClaw's issue #75 (Linux/Windows apps) has 115 comments and 80 👍** – no single issue in any peer project exceeds this reaction count. OpenClaw likely has **5-10x** the active user base of the next largest fork.

**Weaknesses:**
- **Memory leak (P0, #91588)** – unresolved for days; RSS growth to 15.5GB is production-breaking. No peer project has a comparable critical open bug.
- **PR backlog** – 229 open PRs indicates maintainer bandwidth is stretched. Zeroclaw's 0 merged PRs today is worse, but OpenClaw's volume is qualitatively different.

---

## 4. Shared Technical Focus Areas

The following requirements are emerging across **three or more projects**, signaling ecosystem-wide priorities:

| Focus Area | Projects Affected | Specific Needs | Priority |
|------------|------------------|----------------|----------|
| **Memory/resource leak prevention** | OpenClaw (#91588), NanoBot (#5118 media paths), Zeroclaw (#8654 fork panic), CoPaw (#6542 crash loss) | Session output bounds, archive reliability, crash persistence | **Critical** – production-destroying |
| **Security credential hardening** | OpenClaw (#10659 masked secrets, #7707 memory tagging), Zeroclaw (#9127 KeySource RFC), CoPaw (#6461 agent isolation) | Prevent API key leakage, cross-agent memory access, prompt injection | **High** – trust boundary |
| **MCP integration & reliability** | OpenClaw (#98435 loopback timeout), NanoBot (#5138 stdio shutdown), Zeroclaw (#9521 MCP images), CoPaw (#6524 session recovery) | Re-handshake after restart, session recovery, multiplex fixes | **High** – operational |
| **Channel message delivery reliability** | OpenClaw (#114137 undelivered turns, #115326 crash-loop lockout), NanoBot (#5149 WhatsApp audio, #5156 Telegram stalls), Zeroclaw (#6724 channel crashloop) | Persistent delivery, reconnection, audio support | **High** – user-facing |
| **Agent isolation & privacy** | OpenClaw (#7707 memory tagging), Zeroclaw (#9127 KeySource), CoPaw (#6461 cross-agent data access, #6509 sub-agent collisions) | Per-session/agent memory isolation, credential binding | **Medium-High** – multi-tenant |
| **Context window management** | OpenClaw (#9986 model fallback), Zeroclaw (#9332 context meter undercount), CoPaw (#6541 compression role bug) | Progressive disclosure, accurate metering, fallback chains | **Medium** – reliability |

**Common community request:** A **production-readiness label** or stability tier system (OpenClaw #73537) has surfaced as a shared unmet need, indicating users across projects want clearer guidance on release safety.

---

## 5. Differentiation Analysis

| Dimension | OpenClaw | NanoBot | Zeroclaw | PicoClaw | IronClaw | CoPaw |
|-----------|----------|---------|----------|----------|----------|-------|
| **Primary language** | TypeScript/Node.js | Python | Rust (with WASM plugins) | Python | Rust | TypeScript/Tauri |
| **Target user** | Power users, self-hosters | Developers, small teams | Enterprise, security-conscious | Enterprise IM users (Chinese market) | Enterprise, community managers | Developers, multi-model users |
| **Channel focus** | Broad (Telegram, Discord, WhatsApp, Signal) | WebUI-focused, WhatsApp, Telegram | Telegram, Nextcloud, Slack | Feishu, DingTalk (Chinese IM) | Slack-primary, Telegram, WebUI | WebUI, QQ (Chinese), Feishu |
| **Architecture** | Monolithic gateway + skill plugins | Python core + extension platform | Rust core + WASM plugin runtime | Python core + lightweight runtime | Rust core + IronHub registry | Tauri desktop + cloud sync |
| **Unique strength** | Beta release cadence, state safety | WebUI polish, WebRTC, skill marketplace | Performance, WASM isolation, security RFCs | Enterprise IM support (Chinese) | Error-recoverability epic, Slack integration | Visual context compression, computer use |
| **Key differentiator** | Reference implementation breadth | User experience innovation | Security-first architecture | Platform localization | Reliability engineering | Desktop native + Chinese market |
| **Current bottleneck** | Maintainer bandwidth (229 open PRs) | Stale PRs on extensions | Zero PR merges today | Android compatibility (#3182) | Multiple P1 bugs open | Configuration corruption (Windows) |

**Notable architectural divergence:**
- **Zeroclaw** is pursuing a **WASM plugin model** for channels/tools (#8850 RFC), which could enable hot-loading without recompilation – a fundamental departure from OpenClaw's monolithic plugin system.
- **CoPaw** is investing heavily in **desktop native** (Tauri, computer use automation) which no other project matches at this depth.
- **IronClaw** is building a **catalog/registry system** (IronHub) for third-party skills, similar to OpenClaw's skill marketplace but with different governance (tenant publication API, per-user credential binding).

---

## 6. Community Momentum & Maturity

**Tier 1 – Rapid iteration (50+ daily PRs, feature velocity high):**
- **OpenClaw** (500 PRs/day, beta releases) – **Most active ecosystem**, but the volume creates noise and regressions. The 2026.7.x series is causing significant user friction.
- **IronClaw** (50 PRs/day, epic-driven) – **High velocity with structure**. The error-recoverability, hermetic testing, and messaging epics suggest a defined roadmap toward a 2.0 release.
- **CoPaw** (50 PRs/day, 17 merged) – **Rapid growth**. Strong test coverage investment and multiple high-impact features in PR (per-session model overrides, computer use, checkpoint management).

**Tier 2 – Active development (10-20 daily PRs, steady progress):**
- **NanoBot** (40 PRs/day, 21 merged) – **Stabilizing** from rapid growth to maintenance mode. WebUI polished; extension platform is the next horizon.
- **Zeroclaw** (50 PRs/day, 0 merged) – **Review bottleneck indicated**. High activity in branches but no merges suggests maintainer capacity is constrained or a release freeze is in effect.
- **Moltis** (8 PRs/day, feature branches open) – **Infrastructure stage**. Building Slack, ACP, observability, and benchmarking foundations rather than shipping polish.

**Tier 3 – Stable moderate activity:**
- **PicoClaw** (10 PRs/day, 3 merged) – **Niche stability**. Focused on Chinese IM providers; slow on Android bug (#3182).
- **NanoClaw** (10 PRs/day, 4 merged) – **Low engagement**. Single open feature request (#1350, GitHub Copilot) represents the only community discussion.
- **LobsterAI** (5 PRs merged) – **Incremental maintenance**. No significant user feedback or roadmap signals.
- **ZeptoClaw** (2 PRs, automated only) – **Maintenance mode**. No development beyond dependency bumps.

**Tier 4 – Inactive:**
- NullClaw, TinyClaw, EasyClaw – **Effectively archived**.

**Maturity assessment:**
- **Production-grade**: OpenClaw (with caveats on memory leak), IronClaw (strong epic structure), NanoBot (stabilizing)
- **Beta/candidate**: Zeroclaw (high activity but no merges), CoPaw (rapid but corrupting configs), Moltis (infrastructure stage)
- **Maintenance**: PicoClaw, NanoClaw, LobsterAI, ZeptoClaw

---

## 7. Trend Signals

**Extracted from community feedback across all projects:**

1. **Production stability is the #1 unmet need.** Users across OpenClaw (#73537), Zeroclaw (#9284 config races), and CoPaw (#6542 crash loss) are demanding stability labels, crash recovery, and zero-data-loss guarantees. The ecosystem is past the "it works on my machine" phase.

2. **Security is becoming non-negotiable for adoption.** Four projects (OpenClaw, Zeroclaw, NanoBot, CoPaw) have active issue threads about credential leakage, memory poisoning, or agent isolation. The `KeySource` trait RFC in Zeroclaw (#9127) and masked secrets in OpenClaw (#10659) signal that security is moving from nice-to-have to core architecture.

3. **Multi-model fallback is an expected feature.** Users in NanoClaw (#1350), OpenClaw (#9986), and CoPaw (#6541) are frustrated with provider-specific failures (rate limits, schema changes, context exhaustion). The next wave of features will include **automatic fallback chains, quota-aware routing, and transparent provider switching**.

4. **Platform-specific bugs dominate user frustration.** Windows installer failures (CoPaw #6520, LobsterAI #2402), Android launch failures (PicoClaw #3182), and headless OAuth breakage (PicoClaw #3280) are disproportionately common for open-source projects that primarily develop on macOS/Linux. **Cross-platform CI becomes a competitive advantage.**

5. **The MCP protocol is becoming a standard integration point.** All major projects are investing in MCP: session recovery (CoPaw), loopback reliability (OpenClaw), STDIO multiplexing (Zeroclaw, NanoBot), and image content blocks (Zeroclaw #9521). **MCP compatibility is now table stakes** for any project that wants ecosystem extensibility.

6. **Chinese enterprise IM (Feishu, DingTalk, QQ) is an underserved market.** PicoClaw and CoPaw are the only projects with significant Chinese IM support. The 1.4B+ WeChat/QQ user base and growing Feishu/DingTalk enterprise adoption represent a massive gap for OpenClaw and its forks.

7. **Agent isolation and multi-tenant architecture are early-stage.** Only CoPaw (#6461) has detailed user reports of cross-agent data leakage. As multi-agent deployments grow, this will become a critical trust boundary feature – currently the ecosystem lacks a consistent solution.

**Value for AI agent developers:**
- **Invest in crash-recovery and state durability** – the community consistently rewards reliability over new features.
- **Prioritize cross-platform CI** – Windows/Android bugs drive the most user frustration.
- **Build security into the architecture, not as a layer** – the trend toward credential masking, memory tagging, and agent isolation suggests security-first design wins.
- **Adopt MCP early** – it's becoming the de facto integration standard; projects without robust MCP support will lose ecosystem share.
- **Consider the Chinese market** – Feishu/DingTalk/QQ support is a clear differentiator with no dominant player yet.

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot Project Digest — 2026-07-29

---

## 1. Today's Overview

NanoBot saw heavy development activity over the past 24 hours, with **40 PRs** updated (21 merged/closed) and **7 issues** touched (5 still open). The project remains in an active maintenance and feature cycle—no new releases were published today, but the sheer volume of bug fixes, regression patches, and documented enhancements suggests a stable release candidate may be close. Core areas receiving attention include WebUI reliability (session reconciliation, streaming visibility, model preset handling), memory and executor safety, MCP SDK compatibility, and the early stages of a multi-agent evolution and an extension platform.

---

## 2. Releases

**None** in the last 24 hours. No migration notes or changelogs to report.

---

## 3. Project Progress

Of the **21 merged/closed PRs** (from the top 20 listed), the following themes dominated:

- **WebUI stability and UX**  
  - `#5113` – Stabilized repeated model preset rows  
  - `#5119` – Softened model selector emphasis  
  - `#5130` – Reconcile chats after browser resume  
  - `#5140` – Keep streaming tail visible  
  - `#5142` – Open threads at latest message  
  - `#5143` – Animate reasoning drawer transitions  
  - `#5148` – Added image-aware model presets  

- **Agent loop and exec safety**  
  - `#5134` – Prevent gateway crash when stopping active tasks (snapshot before cancel)  
  - `#5150` – Bound buffered session output (head/tail budget)  
  - `#5151` – Release idle session locks (WeakValueDictionary)  
  - `#5152` – Mark partial completion results for subagent  

- **Infrastructure and CI**  
  - `#5144` – Scope PR path detection to head changes  
  - `#5132` – Documentation: moved README title  

- **Pairing store and providers**  
  - `#5155` – Handle null approved map safely (fix `AttributeError`)  
  - `#5154` – Handle primitive items in Responses API parser  
  - `#5153` – Handle non-string timestamp and missing role in raw_archive  

- **Bigger feature work still open**  
  - `#5116` (open) – Skill marketplaces and management (WebUI)  
  - `#5098` (open) – Unified extension platform  
  - `#5131` (open) – Stable resource path aliases  

---

## 4. Community Hot Topics

| Item | Type | Reactions | Comments | Topic |
|------|------|-----------|----------|-------|
| [#5000](https://github.com/HKUDS/nanobot/issues/5000) | Issue (open) | 0 👍 | 5 | Multi-agent collaboration proposal |
| [#5](https://github.com/HKUDS/nanobot/issues/5) | Issue (closed) | 3 👍 | 7 | `uv install` documentation improvement |
| [#1332](https://github.com/HKUDS/nanobot/issues/1332) | Issue (closed) | 0 👍 | 4 | High token consumption on simple messages |

**Analysis:**  
- Issue **#5000** (multi-agent collaboration) generated discussion despite no upvotes, indicating developer interest in evolving the subagent system toward persistent identities and shared state.  
- The closed issue **#5** (uv install) received the most reactions (3 👍) and comments (7), showing strong user appetite for faster, more reliable installation via `uv`.  
- **#1332** (token consumption) echoes a persistent pain point about excessive input tokens even for trivial queries—though closed as stale, the underlying efficiency concern remains relevant.

---

## 5. Bugs & Stability

Bugs reported or regressions addressed today, ranked by severity:

| Severity | Issue / PR | Summary | Fix status |
|----------|------------|---------|------------|
| **Critical** | [#5118](https://github.com/HKUDS/nanobot/issues/5118) | Session consolidation drops uploaded media paths stored in `media[]` but not inlined — files become unrecoverable after archive. | Open (no fix PR yet) |
| **Critical** | [#5133](https://github.com/HKUDS/nanobot/issues/5133) | `finish_reason='length'` with tool_calls and blank content is misrouted to empty-response retry instead of length recovery. | Open (no fix PR yet) |
| **High** | [#5149](https://github.com/HKUDS/nanobot/issues/5149) | No audio output on WhatsApp; bot receives but does not send audio files. | Open (diagnosed with logs) |
| **High** | [#5138](https://github.com/HKUDS/nanobot/issues/5138) | MCP stdio shutdown bugs: cancel-scope teardown error and stdout protocol pollution. | Open (tracking migration to MCP SDK v2) |
| **Medium** | [#5156](https://github.com/HKUDS/nanobot/pull/5156) (open) | Telegram polling silently stalls after transient network blips. | Fix PR open (recover with heartbeat) |
| **Medium** | [#5155](https://github.com/HKUDS/nanobot/pull/5155) (open) | `get_approved` crashes if pairing store JSON contains `"approved": null`. | Fix PR open |
| **Medium** | [#5154](https://github.com/HKUDS/nanobot/pull/5154) (open) | Responses API parser crashes on primitive items in SSE output. | Fix PR open |
| **Medium** | [#5153](https://github.com/HKUDS/nanobot/pull/5153) (open) | Memory raw archiving crashes on non-string timestamps or missing `role`. | Fix PR open |
| **Low** | [#5152](https://github.com/HKUDS/nanobot/pull/5152) (open) | Subagent partial results not marked correctly (model may infer unfinished work). | Fix PR open |

Several regressions from recent changes were already patched today (e.g., #5134 gateway crash, #5150 exec output bound, #5151 session lock leak).

---

## 6. Feature Requests & Roadmap Signals

- **Multi-agent collaboration** ([#5000](https://github.com/HKUDS/nanobot/issues/5000)) – Proposal to give subagents persistent identities, shared state, and full inter-agent communication. Likely to shape the next major version if adopted.
- **Extension platform** ([#5098](https://github.com/HKUDS/nanobot/pull/5098)) – Adds a native Python extension boundary. Still open and in conflict; could land in v0.x if resolved.
- **Skill marketplaces** ([#5116](https://github.com/HKUDS/nanobot/pull/5116)) – Discover, install, and manage skills directly from WebUI (skills.sh + SkillHub). High-priority feature for power users.
- **Resource path aliases** ([#5131](https://github.com/HKUDS/nanobot/pull/5131)) – Stable human-readable paths for agent, media, and package directories. Useful for skills and prompts.
- **Image-aware model presets** ([#5148](https://github.com/HKUDS/nanobot/pull/5148) – merged) – Already landed support for toggling image input support per preset.

**Prediction for next version:** Multi-agent collaboration (#5000) may be partially addressed by the extension platform (#5098). Skill marketplace (#5116) is likely near merge. Audio output fix (#5149) and MCP v2 upgrade (#5138) are blockers for channel reliability and will likely be prioritized.

---

## 7. User Feedback Summary

- **Pain points**  
  - High token consumption for trivial queries ([#1332](https://github.com/HKUDS/nanobot/issues/1332)) – users frustrated by excessive input token usage.  
  - **No audio output on WhatsApp** ([#5149](https://github.com/HKUDS/nanobot/issues/5149)) – a real feature gap affecting a major channel.  
  - **Media path loss during archive** ([#5118](https://github.com/HKUDS/nanobot/issues/5118)) – uploaded files become unrecoverable, a data loss concern.  
  - **Telegram silent polling stall** ([#5156](https://github.com/HKUDS/nanobot/pull/5156)) – bot goes deaf without warning, noticed in production.

- **Satisfaction signals**  
  - The community positively received the `uv install` documentation request ([#5](https://github.com/HKUDS/nanobot/issues/5)) – 3 👍 indicate eagerness for faster installs.  
  - Quick turnaround on WebUI regressions (streaming tail, chat reconciliation) shows development team responsiveness.

- **Use cases**  
  - Users rely on NanoBot as a multi-channel assistant (WhatsApp, Telegram, WebUI).  
  - Skill and extension ecosystem is highly desired for customization.  
  - Token efficiency remains a top concern for cost-conscious users.

---

## 8. Backlog Watch

| Item | Age | Type | Last update | Action needed |
|------|-----|------|-------------|---------------|
| [#1332](https://github.com/HKUDS/nanobot/issues/1332) – token consumption (closed stale) | ~5 months | Issue | 2026-07-28 (re-touched) | Although closed, the token efficiency problem persists; maintainer should consider reopening or consolidating with a new issue. |
| [#5](https://github.com/HKUDS/nanobot/issues/5) – uv install (closed) | ~6 months | Issue | 2026-07-28 (comments) | Already resolved via documentation? No follow-up PR found. Ensure `uv` instructions are live. |
| [#5000](https://github.com/HKUDS/nanobot/issues/5000) – multi-agent proposal | 9 days | Issue | 2026-07-28 | No maintainer reply yet. Needs a roadmap response. |
| [#5098](https://github.com/HKUDS/nanobot/pull/5098) – extension platform | 3 days | PR (open, conflict) | 2026-07-28 | Needs conflict resolution and design sign-off. |
| [#5116](https://github.com/HKUDS/nanobot/pull/5116) – skill marketplaces | 2 days | PR (open) | 2026-07-28 | Review and test; high community interest. |
| [#5131](https://github.com/HKUDS/nanobot/pull/5131) – resource path aliases | 1 day | PR (open, conflict) | 2026-07-28 | Conflict needs resolution; feature aligns with extension efforts. |

No critical issues older than 7 days remain unanswered; the project is actively triaging new items quickly.

---

*Generated from GitHub data as of 2026-07-29 23:59 UTC.*

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw Project Digest — 2026-07-29

## 1. Today's Overview

The Zeroclaw project saw **high activity** with **49 issues updated** (42 open, 7 closed) and **50 pull requests updated** (all still open) in the last 24 hours. No new releases were published. The effort is concentrated on **bug fixes, security hardening, and architectural RFCs**, with several critical‑priority (P1) issues being actively addressed. The zero‑merged‑PR figure indicates that while work is progressing in branches, the maintainer review queue is not yet yielding merges for fixes or features.

## 2. Releases

No new releases were shipped today. The latest stable version remains **0.8.3** (as referenced in issue #9357). One bug report (#9474) noted a breaking change in the auth profile store that required migration from pre‑rename stores; that issue was closed, implying the fix is available in master but not yet in a tagged release.

## 3. Project Progress

**Merged/closed PRs today: 0**  
**Issues closed today: 7** (from data overview)

Several important bugs were resolved (all closed without a corresponding merged PR in the 24‑hour data — may have been merged earlier or fixed directly on master):

- **#9357** – Flaky test `cargo test -p zeroclaw-runtime --lib` that poisoned global mutex → **closed**
- **#9474** – Auth profile store failing due to missing `model_provider` migration → **closed**
- **#9471** – Retirement of dormant cron test module → **closed** (task)
- **#9380** – Vendored wit drift causing registration failure → **closed**

No feature branches were merged today.

## 4. Community Hot Topics

The most engaged issues (by comment count) highlight deep technical discussions and pressing user needs:

| Issue | Comments | Summary |
|-------|----------|---------|
| [#9127](https://github.com/zeroclaw-labs/zeroclaw/issues/9127) RFC: `KeySource` trait for master‑key material classification | 8 | A structural proposal to classify master‑key sources by deployment form, affecting 93 secret fields and 59 credential‑classified fields. Underlying need: **stronger security guarantees for credential storage** across different deployment environments. |
| [#6157](https://github.com/zeroclaw-labs/zeroclaw/issues/6157) Nextcloud Talk wrong bot message API | 6 | Users cannot send responses via Nextcloud Talk because the bot secret is incorrectly passed. Needs fix to use correct OCS API endpoint. |
| [#9357](https://github.com/zeroclaw-labs/zeroclaw/issues/9357) Flaky test poisoning global mutex (closed) | 6 | Test flakiness in runtime library that blocked CI and cascaded failures. High severity, now resolved. |
| [#8654](https://github.com/zeroclaw-labs/zeroclaw/issues/8654) Skill‑review fork panic – out‑of‑range slice | 5 | Production crash (SIGSEGV) after tool‑heavy turns. Underlying need: **robust skill‑review process that doesn’t take down the entire agent daemon**. |
| [#6724](https://github.com/zeroclaw-labs/zeroclaw/issues/6724) Empty Signal/Voice channel credentials → crashloop | 4 | Supervisor crash loop when channels are enabled without credentials. Needs safety checks before booting channel orchestrators. |
| [#8850](https://github.com/zeroclaw-labs/zeroclaw/issues/8850) Move optional channels/tools to runtime WASM plugins | 4 | A major architectural shift to reduce compile‑time feature flags and enable plugin hot‑loading. Signals **direction for future extensibility**. |
| [#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) RFC: Runtime‑owned conversation sessions (new) | 3 | Proposes making the runtime the single owner of conversation lifecycle, with WebSocket/dashboard/channels as transport adapters. |
| [#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) RFC: Unified attachment architecture (new) | 3 | Proposes a common attachment model for web chat and channels, enabling consistent file/image handling. |

Two fresh RFCs (#9487, #9488) were opened on 2026‑07‑28 and already have 3 comments each, indicating immediate interest from the community and maintainers.

## 5. Bugs & Stability

**Critical‑priority (P1) bugs active today:**

- **[#9492](https://github.com/zeroclaw-labs/zeroclaw/issues/9492)** – `auth refresh` dead‑ends when external client rotated the OpenAI‑Codex refresh token. **No fix PR visible**.
- **[#9383](https://github.com/zeroclaw-labs/zeroclaw/issues/9383)** – npm audit failed with 6 high/critical vulnerabilities (`@redocly/openapi-core`, etc.). Automated CI blocker. **No fix PR visible**.
- **[#9284](https://github.com/zeroclaw-labs/zeroclaw/issues/9284)** – Config flush can overwrite concurrent writes. **No fix PR visible**, though PR [#9281](https://github.com/zeroclaw-labs/zeroclaw/pull/9281) (config rollback on failed set) partially addresses similar concerns.
- **[#8654](https://github.com/zeroclaw-labs/zeroclaw/issues/8654)** – Skill‑review fork panic (SIGSEGV) – open, risk:high. **No fix PR visible**.

**High‑severity (P2) bugs with open fix PRs:**

- **[#6724](https://github.com/zeroclaw-labs/zeroclaw/issues/6724)** – Empty channel credentials crashloop → **PR not yet linked** but community is aware.
- **[#9332](https://github.com/zeroclaw-labs/zeroclaw/issues/9332)** – Multimodal context meter undercount for image‑heavy requests → **no fix PR**.
- **[#9486](https://github.com/zeroclaw-labs/zeroclaw/issues/9486)** – High‑entropy detector redacts Solana wallet addresses even with `high_entropy_tokens=false` → **no fix PR**.
- **[#8758](https://github.com/zeroclaw-labs/zeroclaw/issues/8758)** – Agent returns idle after context exhaustion without terminal status → **no fix PR**.
- **[#8760](https://github.com/zeroclaw-labs/zeroclaw/issues/8760)** – Daemon‑owned agent output leaks to daemon stdout → **no fix PR**.

**Security‑related bugs with fix PRs in review:**

- **[#9401](https://github.com/zeroclaw-labs/zeroclaw/pull/9401)** – Preserve shell cwd across sandbox wrappers (Seatbelt, Firejail, Bubblewrap). Fix provided.
- **[#9410](https://github.com/zeroclaw-labs/zeroclaw/pull/9410)** – Default command audit logging to disabled (fixes #9391). In review.

**Test/CI issues:**

- **[#9462](https://github.com/zeroclaw-labs/zeroclaw/issues/9462)** – Plugin unit tests behind `plugins-wasmtime` feature never execute in CI – **open**.

## 6. Feature Requests & Roadmap Signals

**Major architectural RFCs – likely candidates for the next minor release (0.9.x):**

- **[#8850](https://github.com/zeroclaw-labs/zeroclaw/issues/8850)** – Move optional channels/tools to runtime WASM plugins. A large refactor that would fundamentally change the binary distribution model; already has an accepted RFC tracker.
- **[#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487)** – Runtime‑owned conversation sessions and transport adapters. This would simplify the gateway layer and enable better session lifecycle management.
- **[#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488)** – Unified attachment architecture for web chat and channels. Enables consistent image/file handling across all channel surfaces.

**Other high‑impact features underway:**

- **[#9521](https://github.com/zeroclaw-labs/zeroclaw/issues/9521)** – Map MCP `type:image` content blocks into the vision pipeline (new today). Would allow MCP servers to send images to vision‑capable providers.
- **[#9178](https://github.com/zeroclaw-labs/zeroclaw/issues/9178)** – ACP embedded resource blob + `deliver_file` (closed after implementation – feature merged). Now in master, likely in next release.
- **[#9171](https://github.com/zeroclaw-labs/zeroclaw/issues/9171)** – Make ZeroCode modifier semantics independent of key characters. Improves macOS/Windows compatibility.

**User‑facing enhancements in PR (open):**

- **[#9242](https://github.com/zeroclaw-labs/zeroclaw/pull/9242)** – End‑to‑end Telegram setup guide (docs).
- **[#9311](https://github.com/zeroclaw-labs/zeroclaw/pull/9311)** – Surface dangling `peer_groups.*.channel` refs as structured warnings (config diagnostics).
- **[#9476](https://github.com/zeroclaw-labs/zeroclaw/pull/9476)** – Authenticated operator cancellation for running SOP jobs (web dashboard).
- **[#8985](https://github.com/zeroclaw-labs/zeroclaw/pull/8985)** – Slack lifecycle progress updates while agent is working.

## 7. User Feedback Summary

**Real pain points reported today:**

1. **Channel misconfiguration leads to silent failures** (e.g., #6724 crashloop, #6157 wrong API, #9486 Solana addresses redacted). Users want better validation and user‑visible error messages.
2. **Auth profile migration breaks** (#9474) – a user upgrading from pre‑rename stores lost access to provider credentials. “Workflow blocked” severity.
3. **Context meter inaccuracy** (#9332) – image‑heavy requests cause agent to collapse due to over‑estimated context usage, spoiling long conversations.
4. **No feedback on declined channel messages** (#9465) – when precheck refuses, senders see only an emoji reaction and think the agent is broken. PR [#9478](https://github.com/zeroclaw-labs/zeroclaw/pull/9478) provides a fix.
5. **Nextcloud Talk integration broken** (#6157) – bot secret misused; users cannot deploy on Nextcloud.
6. **Skill‑review crashes the daemon** (#8654) – production users lose their agent pod during heavy tool usage.
7. **Config flush races** (#9284) – concurrent config writes can be lost, especially in dashboard‑ or API‑heavy deployments.

**Satisfaction signals:** The project is responsive – most reported bugs are accepted quickly (status:accepted), and RFCs receive prompt discussion. The volume of open PRs (50) indicates an active development team, though slow merging may be a bottleneck.

## 8. Backlog Watch

**Issues needing maintainer attention** (marked with `needs-maintainer-review` or `status:no-stale` without recent maintainer action):

| Issue | Days since last update | Risk | Reason |
|-------|------------------------|------|--------|
| [#9127](https://github.com/zeroclaw-labs/zeroclaw/issues/9127) `KeySource` trait RFC | 1 day (created 2026-07-18, updated 2026-07-28) | High | Security‑critical design; still in review |
| [#9397](https://github.com/zeroclaw-labs/zeroclaw/issues/9397) WhatsApp `allowed_groups` permit‑none RFC | 2 days | High | Security issue; maintainer has not triaged |
| [#9464](https://github.com/zeroclaw-labs/zeroclaw/issues/9464) Anthropic OAuth alias contract RFC | 2 days | High | Needs maintainer‑review label; affects provider integration |
| [#9323](https://github.com/zeroclaw-labs/zeroclaw/issues/9323) Execution‑tree iteration budget RFC | 5 days | High | No maintainer signature yet |
| [#8691](https://github.com/zeroclaw-labs/zeroclaw/issues/8691) ADR baseline tracker | 25 days (no‑stale) | Low | Long‑running cleanup – no recent maintainer check‑in |
| [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) Maintainer decision queue tracker | 25 days (no‑stale) | Medium | Coordination overhead; may be blocking RFC acceptance |

**PRs with `needs-author-action` and no response from author:**

- [#9419](https://github.com/zeroclaw-labs/zeroclaw/pull/9419) – Credential rotation after rate limits (P2, XL) – author @IftekharUddin may need to address feedback.
- [#9325](https://github.com/zeroclaw-labs/zeroclaw/pull/9325) – Streamed user turns formatting – awaiting author action.
- [#9405](https://github.com/zeroclaw-labs/zeroclaw/pull/9405) – MCP per‑server custom CA trust – awaiting author.
- [#9304](https://github.com/zeroclaw-labs/zeroclaw/pull/9304) – Omit `reasoning_effort` on tool requests – awaiting author.
- [#9418](https://github.com/zeroclaw-labs/zeroclaw/pull/9418) – MCP stdio multiplex fix (P1, XL) – awaiting author; major blocker for concurrent MCP tool calls.

---

*Digest generated from GitHub data on 2026-07-29. All links point to the zeroclaw-labs/zeroclaw repository.*

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw Project Digest — 2026-07-29

**Data source:** [sipeed/picoclaw](https://github.com/sipeed/picoclaw)  
**Analysis period:** 2026-07-28 to 2026-07-29 (activity in the last 24 hours)

---

## 1. Today's Overview

The PicoClaw project shows moderate activity with **4 issues** and **10 pull requests** updated in the last day. Three issues were closed (including a high-priority security replacement for libolm), while one Android compatibility bug remains open. Three pull requests were merged/closed, addressing Feishu media handling, model resolution logic, and Anthropic prompt caching. Seven PRs remain open, including several fresh features such as an Exa web search provider and configurable fallback chains. No new releases were published. The project is actively fixing bugs and adding features, though a number of older “stale” items still await maintainer review.

---

## 2. Releases

*No new releases were tagged in this period.*

---

## 3. Project Progress

**Merged/Closed Pull Requests (today):**

| PR | Description | Summary |
|---|---|---|
| [#3256](https://github.com/sipeed/picoclaw/pull/3256) | fix(feishu): send audio and video with native message types | Audio/Video uploads on Feishu now use native message types instead of generic file attachments, making them directly playable. |
| [#3254](https://github.com/sipeed/picoclaw/pull/3254) | fix(agent): prefer verbatim model matches over provider-alias splits | Model reference resolution now prioritises exact matches, preventing unintended provider-alias split wins that could break configuration. |
| [#3228](https://github.com/sipeed/picoclaw/pull/3228) | fix(anthropic-messages): send SystemParts as system blocks with cache_control | The Anthropic Messages provider now supports per-block `cache_control` markers, fixing prompt caching on that provider. |

**Closed Issues (today):**

| Issue | Summary |
|---|---|
| [#3088](https://github.com/sipeed/picoclaw/issues/3088) | **[Feature] use vodozemac instead of libolm** – the unmaintained `libolm` dependency is being replaced by the official `vodozemac` library; this high-priority, help-wanted request was closed, suggesting the migration is underway or complete. |
| [#3255](https://github.com/sipeed/picoclaw/issues/3255) | **[BUG] DingTalk chat list preview shows fixed “PicoClaw”** – the preview text now correctly reflects message content instead of a hardcoded string. |
| [#3300](https://github.com/sipeed/picoclaw/issues/3300) | **[Bug] 工具集缺失 read_file 导致每次对话死锁** – missing `read_file` tool caused every conversation to deadlock; the bug was quickly resolved (likely via a tool addition). |

---

## 4. Community Hot Topics

- **#3088** [Feature: use vodozemac instead of libolm](https://github.com/sipeed/picoclaw/issues/3088) – **10 comments, 2 👍** – This long-running, high-priority issue generated the most discussion. The underlying need is to replace an unmaintained cryptographic library with a secure, official alternative. Closed today, indicating the community’s voice was heard.

- **#3182** [Android version launch failure](https://github.com/sipeed/picoclaw/issues/3182) – **5 comments** – Users are unable to start the service on Android despite granting full permissions. The issue is still open and stale, reflecting ongoing frustration with mobile platform support.

- **#3300** [Missing `read_file` tool deadlock](https://github.com/sipeed/picoclaw/issues/3300) – **0 comments but created today and closed immediately** – A Chinese-speaking user discovered a critical deadlock caused by the absence of a `read_file` tool when following instructions to read `RULES.md`. The quick resolution shows good responsiveness, but the problem reveals a documentation/guidance gap for custom rule files.

- **#3299** [Add native Exa web search provider](https://github.com/sipeed/picoclaw/pull/3299) – **New feature PR** – A fresh pull request adding Exa as a web search backend. It has not yet gathered many comments, but it signals growing demand for alternative search providers beyond the default.

---

## 5. Bugs & Stability

| Bug | Severity | Status | Notes |
|---|---|---|---|
| **#3300** – Deadlock due to missing `read_file` tool | **High** | Closed (fixed) | Any attempt to use custom rules via `AGENT.md` forcing `read_file` of `RULES.md` would cause a hang. Fixed promptly. |
| **#3182** – Android service launch failure | **Medium** | Open, stale | Affects Android users who cannot start the PicoClaw service. No fix PR linked yet. |
| **#3255** – DingTalk preview text | **Low** | Closed (fixed) | Cosmetic bug in chat list preview; now corrected. |
| **#3280** – OAuth login fails on headless/remote setups | **High** | Open PR | PR [#3280](https://github.com/sipeed/picoclaw/pull/3280) addresses four distinct causes of callback failures. An existing fix is under review. |
| **#3279** – Tool-call format leakage into LLM summaries | **Medium** | Open PR | PR [#3279](https://github.com/sipeed/picoclaw/pull/3279) fixes a seahorse variant of a known bug where tool-call format leaks into user messages. |
| **#3251** – Promp cache token usage not captured in Anthropic providers | **Low** | Open PR | Operators cannot verify cache effectiveness; PR proposed. |

**Stability assessment:** The project is actively fixing regressions. The most impactful bug (deadlock) was resolved quickly. The Android issue remains a notable gap.

---

## 6. Feature Requests & Roadmap Signals

**Recently closed / merged:**
- Replacement of `libolm` with `vodozemac` (security & maintainability) – likely merged into the codebase.
- Feishu native media types and Anthropic prompt caching improvements – now part of the codebase.

**Open PRs that are strong candidates for the next version:**

- [#3200](https://github.com/sipeed/picoclaw/pull/3200) **Configurable default fallback chain** – allows users to set a model priority order via the web UI. This is a highly requested user experience improvement.
- [#3299](https://github.com/sipeed/picoclaw/pull/3299) **Native Exa web search provider** – expands search provider options beyond the default.
- [#3280](https://github.com/sipeed/picoclaw/pull/3280) **OAuth login robustness** – essential for headless/remote deployments.
- [#3251](https://github.com/sipeed/picoclaw/pull/3251) **Anthropic prompt cache metrics** – operational visibility improvement.

**Predicted next release features:** Fallback chain configuration, Exa search provider, and the OAuth fixes are likely to be bundled into the next version, along with the already-merged bug fixes.

---

## 7. User Feedback Summary

**Pain points:**

- **Mobile support:** Android users cannot run the service (#3182), a recurring complaint that has been open for over a month.
- **Custom rules integration:** Users want to split prompts into separate files (e.g., `RULES.md`) but the system only supports `AGENT.md`; the deadlock (#3300) showed the danger of workarounds.
- **Authentication friction:** Headless/remote OAuth flows break after user consent, burning authorization codes and forcing restarts (#3280).
- **Chat preview quirks:** DingTalk users saw a fixed “PicoClaw” label instead of message content (#3255), which was fixed.

**Satisfaction indicators:**

- High-priority security request (#3088) was actioned, signalling maintainer responsiveness.
- Feishu users gained native audio/video playback instead of file downloads (#3256).
- Model resolution bugs (#3254) that could silently break configurations were corrected.

**Use cases driving development:** Enterprise IM integration (DingTalk, Feishu), remote headless operation, multi-model fallback reliability, and community-driven security upgrades.

---

## 8. Backlog Watch

The following items have been open for an extended period and require maintainer attention:

| Item | Age | Reason for Concern |
|---|---|---|
| **#1951** – Move installation scripts from docs repo to here | 128 days (since March 24) | A straightforward build-enhancement PR that has received no review. Stale. |
| **#3182** – Android version launch failure | 33 days (since June 26) | Unresolved bug affecting mobile users. Stale. |
| **#3280** – OAuth login fixes (PR) | 8 days (since July 21) | Already marked stale, even though it addresses a critical auth flow. |
| **#3279** – Seahorse tool-call leakage (PR) | 8 days (since July 21) | Stale, despite being a bug fix. |
| **#3251** – Anthropic cache token capture (PR) | 17 days (since July 12) | Stale, no progress. |
| **#3200** – Configurable fallback chain (PR) | 28 days (since July 1) | Important feature, marked stale. |
| **#3299** – Exa web search provider (PR) | 3 days (since July 26) | Very new, but already no activity. |

**Recommendation:** The project would benefit from a maintainer sweep of stale PRs, especially #3280 and #3200 which have high user impact. The Android bug (#3182) should be prioritised to improve platform coverage.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw Project Digest – 2026-07-29

## Today's Overview
Project activity is **moderate**, with 1 open issue and 10 pull requests updated in the last 24 hours (4 merged/closed, 6 open). No new releases were published. The community remains focused on stability improvements (zombie reaping, webhook port handling, merge audit) while a long-standing feature request for GitHub Copilot SDK integration shows sustained interest. Several open PRs target core reliability, including a large quota-fallback feature that has been battle-tested in production.

## Releases
None. No versions were tagged or released in the observed period.

## Project Progress
Four pull requests were **merged/closed** today:

- **[#3060 – fix(container): add `--init` to agent container spawn args](https://github.com/nanocoai/nanoclaw/pull/3060)**  
  Merged. Resolves zombie processes by ensuring PID 1 acts as a reaper inside containers. Also updates documentation to match the corrected behavior.

- **[#1255 – feat: add MiniMax OAuth (Coding Plan) as model provider](https://github.com/nanocoai/nanoclaw/pull/1255)**  
  Merged (closed as merged). Adds a new AI backend option (MiniMax) via OAuth, removing the dependency on an Anthropic API key or Claude subscription.

- **[#2197 – fix(update-nanoclaw): guard merge state to prevent silent single-parent commits](https://github.com/nanocoai/nanoclaw/pull/2197)**  
  Merged. Prevents `/update-nanoclaw` from silently producing a flat commit instead of a true merge when run on customized forks.

- **[#1136 – feat(update-nanoclaw): add auto-merge audit and container smoke test](https://github.com/nanocoai/nanoclaw/pull/1136)**  
  Merged. Adds safety checks that catch code silently dropped during upstream merges (a discovered hard regression).

These contributions strengthen container isolation, expand provider options, and harden the update workflow.

## Community Hot Topics

- **[#1350 – Add GitHub Copilot SDK as alternative AI backend](https://github.com/nanocoai/nanoclaw/issues/1350)**  
  *Open since March 2026, updated today* – 8 👍, 3 comments. The most‑upvoted open issue. Users are requesting native support for GitHub Copilot models (GPT‑4.1, etc.) as an alternative to the current Claude-only backend. The underlying need is provider flexibility and reduced dependency on a single AI vendor.

- **[#3057 – Dual-engine quota fallback: Claude→Codex overflow, handoff recaps, proactive quota warning](https://github.com/nanocoai/nanoclaw/pull/3057)**  
  *Open, updated yesterday* – A large feature branch that has been running in production on WhatsApp since July 6. It implements automatic fallback from Claude to Codex when quotas are exhausted, with agent group configuration and migration support. The high activity and production usage signal strong community demand for reliability and resilience.

## Bugs & Stability
Several bug‑fix PRs were opened or updated today, ranked by severity:

| Priority | Issue/PR | Description |
|----------|----------|-------------|
| **High** | [#3147 – fix(agent-runner): keep destination reply context local](https://github.com/nanocoai/nanoclaw/pull/3147) | Prevents reply context from leaking across destinations in messaging groups. |
| **High** | [#3148 – fix: honor `WEBHOOK_PORT` from .env](https://github.com/nanocoai/nanoclaw/pull/3148) | Ensures proper configuration precedence for the webhook port, fixing a regression where `.env` values were ignored. |
| **Medium** | [#3145 – fix(db): backfill destinations for existing wirings](https://github.com/nanocoai/nanoclaw/pull/3145) | Adds migration 021 to provision missing channel destinations, preventing broken messaging‑group wirings. |
| **Medium** | [#3143 – [Fix] Preserve resolved approval card content](https://github.com/nanocoai/nanoclaw/pull/3143) | Fixes approval cards so resolved items retain their title/details and muting instead of disappearing. |
| **Low** | [#3146 – scripts: repair two dev scripts that rotted](https://github.com/nanocoai/nanoclaw/pull/3146) | Fixes `test-v2-host.ts` (failed before spawning) and a second script that drifted from the current architecture. |

All five fix PRs are open and awaiting review or merge.

## Feature Requests & Roadmap Signals
- **GitHub Copilot SDK** (#1350) – Strongest signal; likely to appear in a future release if maintainers act on community demand.
- **Dual‑engine quota fallback** (#3057) – Already in production testing; could become part of the next stable release.
- **MiniMax OAuth backend** (#1255) – Merged today, expanding provider choices beyond Claude.
- **Update-nanoclaw safety improvements** (#2197, #1136) – Merged today, reflecting ongoing focus on upgrade reliability.

## User Feedback Summary
- **Satisfaction** – Users benefit from the fallback system (#3057) and appreciate the proactive quota warnings.
- **Dissatisfaction** – The limitation to a single AI backend (Claude) is a recurring pain point, as seen in the 8 reactions on #1350.
- **Pain points** – Zombie processes (#3060, now fixed), silent merge failures (#2197, now fixed), and non‑functional dev scripts (#3146) indicate friction in development and operation.

## Backlog Watch
- **[#1350 – GitHub Copilot SDK integration](https://github.com/nanocoai/nanoclaw/issues/1350)**  
  Open since March 22, 2026. Updated today with no maintainer response. With 8 👍 and 3 comments, it is the most requested feature and remains unassigned. This is the highest‑priority item needing maintainer attention.

- **[#3057 – Dual‑engine quota fallback](https://github.com/nanocoai/nanoclaw/pull/3057)**  
  Open since July 15, 2026. While it has seen recent updates, it is still awaiting final merge. Given its production readiness, a decision (merge or request changes) would reduce community uncertainty.

No other issues or PRs older than one month are currently unanswered.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-07-29

---

## 1. Today’s Overview

The project saw extremely high activity with **50 issues and 50 pull requests updated in the last 24 hours**, including 16 closed issues and 15 merged/closed PRs. No new releases were published today. Development is concentrated on several major epics: **error-recoverability endgame**, **hermetic capability/journey testing**, **extension governance**, **provider-neutral messaging operations**, and **IronHub integration for the Reborn stack**. Multiple large PRs were merged that address security (TOCTOU fixes), infrastructure (lifecycle state collapse, composition refactoring), and new features (centralized channel ingress, messaging framework). Bug reports indicate several regressions and reliability issues, with the most critical being intermittent `service_unavailable` errors on the QA instance and a turn-state store latch that required a manual restart.

---

## 2. Releases

No new releases were published today.

---

## 3. Project Progress

**Merged/Closed Pull Requests (15 total today)** — Notable closures include:

- **[PR #6816](nearai/ironclaw PR #6816)** — **Channel ingress centralization**: moved auth, approval, and product-command classification into a single host-owned path shared by Slack, Telegram, and future channel adapters. Adds a fail-closed manifest allowlist for commands.
- **[PR #6696](nearai/ironclaw PR #6696)** — **(Open, but large)** — Collapses lifecycle state into the row-native process journal. Makes `ironclaw_processes` the lifecycle authority, using transactional cursors and bounded claim pagination. (DB migration, still in review.)
- **[PR #6691](nearai/ironclaw PR #6691)** — **(Open)** — Refactors composition assembly, reducing `ironclaw_reborn_composition` by ~9,421 lines. Splits monoliths into focused builders.
- **[PR #6740](nearai/ironclaw PR #6740)** — **(Open)** — TLS termination seam for the sandbox egress proxy. Ported from `sandbox/shell-integration` to `main`.
- **[PR #6746](nearai/ironclaw PR #6746)** — **(Open)** — Sandbox Docker-connect retry, egress allowlist, and shell limits (slice 1 of 4).
- **[PR #6780](nearai/ironclaw PR #6780)** — **(Open)** — Deep-link register/install gateway for IronHub, plus private manifest source support.
- **[PR #6831](nearai/ironclaw PR #6831)** — **(Open)** — Standardized messaging framework: host-owned vocabulary of 16 core + 13 reserved operations, canonical input/output schemas, and an 11-code error taxonomy.
- **[PR #6836](nearai/ironclaw PR #6836)** — **(Open)** — WebUI design system extracted into `@ironclaw/ui` workspace package.

**Closed Issues (16 issues closed today)** — Several sub-tasks under major epics were completed:

- **Extension governance epic (#6486)**: Issues [#6511](nearai/ironclaw Issue #6511), [#6512](nearai/ironclaw Issue #6512), [#6509](nearai/ironclaw Issue #6509) — tenant publication API, policy precedence, per-user credential binding.
- **Messaging epic (#6484)**: Issues [#6500](nearai/ironclaw Issue #6500), [#6501](nearai/ironclaw Issue #6501), [#6502](nearai/ironclaw Issue #6502) — provider-neutral operation profiles, manifest opt-in, Slack migration.
- **External conversation binding epic (#6485)**: Issues [#6506](nearai/ironclaw Issue #6506), [#6507](nearai/ironclaw Issue #6507), [#6508](nearai/ironclaw Issue #6508) — canonical binding contract, channel provenance in WebUI, synchronized history.
- **Journey catalog epic (#6487)**: Issues [#6516](nearai/ironclaw Issue #6516), [#6517](nearai/ironclaw Issue #6517), [#6518](nearai/ironclaw Issue #6518) — critical journey definition, coverage gaps, release gates.

---

## 4. Community Hot Topics

The most discussed issue remains the **error-recoverability endgame epic**:

- **[Issue #6284](nearai/ironclaw Issue #6284)** — *“[EPIC] error-recoverability endgame — the model recovers from 100% of the errors it sees”* — **15 comments**. This epic defines a recoverability contract and has spawned multiple PRs today (see Bugs & Stability). The community is highly engaged on this because it directly impacts model reliability and user trust.

Other active discussions:

- **[Issue #6524](nearai/ironclaw Issue #6524)** — *“Epic: Hermetic capability and journey testing platform”* — **3 comments**. This epic aims to answer whether every capability and journey has deterministic coverage. It has already driven several PRs (e.g., [#6823](nearai/ironclaw PR #6823), [#6825](nearai/ironclaw PR #6825), [#6828](nearai/ironclaw PR #6828)).
- **[Issue #6820](nearai/ironclaw Issue #6820)** — *“IronHub: agent reaches for an unsigned catalog URL when discovery disappoints”* — **2 comments**. A trust-boundary issue discovered during live preview; split from IronHub work.
- **[Issue #6814](nearai/ironclaw Issue #6814)** — *“Third-party skills still trip the prompt content denylist on 1.0.0: ‘API key’ in a description kills every run”* — **1 comment**. A regression that blocks all third-party skills containing “API key” – a live pain point for users.

*Underlying need*: The community is pushing for **bulletproof error handling, deterministic testing, and trust in the platform’s security boundaries** (catalog signing, content filtering).

---

## 5. Bugs & Stability

Several bugs were reported today, ranked by severity:

| Severity | Issue | Description | Fix PR Exists? |
|----------|-------|-------------|----------------|
| **🟢 P1 (Critical)** | [#6805](nearai/ironclaw Issue #6805) | Railway QA instance returns `service_unavailable` every ~30 min, affecting all functions. | Not yet assigned. |
| **🟢 P1 (Critical)** | [#6815](nearai/ironclaw Issue #6815) | Turn-state store latches degraded forever after one write-behind flush failure; requires manual restart. Instance was down ~30 min. | Possible connection to PR #6696 (lifecycle state refactor) but no direct fix. |
| **🟡 P2 (High)** | [#6814](nearai/ironclaw Issue #6814) | Third-party skills with “API key” in description fail every run due to prompt content denylist (regression since #5258). | No fix PR yet. |
| **🟡 P2 (High)** | [#6835](nearai/ironclaw Issue #6835) | MCP auth failures never raise a re-auth gate; mis-classified as `Client`. Found via fault-profile tests. | No direct PR; related testing PR #6825 covers fault profiles. |
| **🟡 P2 (High)** | [#6833](nearai/ironclaw Issue #6833) | Notion tool fails to install (hang/error). | No fix PR. |
| **🟡 P2 (High)** | [#6834](nearai/ironclaw Issue #6834) | Slack integration setup fails for near.foundation accounts. | No fix PR yet (though channel ingress refactor PR #6816 may address). |
| **🟠 Medium** | [#6806](nearai/ironclaw Issue #6806) | Automations output not shown in web chat; user must navigate to separate page. | No fix PR. |
| **🟠 Medium** | [#6807](nearai/ironclaw Issue #6807) | `NetworkTargetPattern` validators not enforced at type level (92 struct literal sites). | No fix PR. |

**Other reported stability issues**:  
- [#6829](nearai/ironclaw Issue #6829) — Telegram forum-topic delivery has no whole-path coverage (coverage gap, not a runtime bug).  
- [#6821](nearai/ironclaw Issue #6821) — IronHub search returns free-text matches as complete catalog listing.  
- [#6807](nearai/ironclaw Issue #6807) — Type-level enforcement missing for network target patterns.

**Fixed today via merged PRs**:  
- **[PR #6817](nearai/ironclaw PR #6817)** — Fixed four TOCTOU containment escapes in local filesystem (local-backend).  
- **[PR #6824](nearai/ironclaw PR #6824)** — Stopped silent retries on model-stage failures that cannot succeed (fixes retry-burn).  
- **[PR #6826](nearai/ironclaw PR #6826)** — Fixed mis-classification of rate limits as auth failures and stopped retrying missing models.  
- **[PR #6832](nearai/ironclaw PR #6832)** — Bounded recovery per RUN, not per stage (part of error-recoverability epic).

---

## 6. Feature Requests & Roadmap Signals

Requests and enhancements reported today:

- **[Issue #6837](nearai/ironclaw Issue #6837)** — *“Add minimal info-level logging for growth/usage stats”* — Enhancement request: currently zero `info!` calls in `crates/ironclaw_analytics`. Likely to be included in next release.
- **[Issue #6810](nearai/ironclaw Issue #6810)** — *“Make progressive tool disclosure default-on without degrading everyday tool use”* — Enhancement for Reborn, already in review. Would become default behavior in next major version.
- **[Issue #6829](nearai/ironclaw Issue #6829)** — *Telegram forum-topic delivery coverage* — Not a feature request but a coverage gap that blocks complete testing. Likely to be addressed in upcoming sprint.
- **[Issue #6821](nearai/ironclaw Issue #6821)** — *IronHub search: free-text matches read as catalog listing* — This is a bug but also a UX gap; fix may improve agent trust in catalog searches.

**Prediction for next release**:  
The next version (likely 1.1.0 or 2.0.0) will include:
- Progressive tool disclosure (from #6810)
- Standardized messaging framework (PR #6831)
- IronHub deep-link installation (PR #6780)
- Centralized channel ingress (PR #6816)
- Continued error-recoverability improvements
- Hermetic testing platform (epic #6524) – may be partially shipped as infrastructure.

---

## 7. User Feedback Summary

Real user pain points reported this period:

- **Third-party skill blockage**: Users cannot install or use any third-party skill containing “API key” in the description (Issue #6814). Workaround not available.
- **Slack setup failure**: Users on `near.foundation` accounts cannot complete Slack integration (Issue #6834).
- **Notion install failure**: The Notion tool installation either hangs or fails silently (Issue #6833).
- **Automation output invisible**: Automations run but their output is hidden from the web chat; users must navigate to a separate screen (Issue #6806).
- **Intermittent service unavailability**: A QA instance (Railway) goes down every ~30 minutes, affecting all users on that deployment (Issue #6805).
- **Turn-state store lockups**: After a flush failure, the entire store degrades until a manual restart, causing extended downtime (Issue #6815).

Positive signals: No explicit satisfaction feedback in today’s data.

---

## 8. Backlog Watch

Long-unanswered or important items needing maintainer attention:

- **[PR #5659](nearai/ironclaw PR #5659)** — *“fix(reborn): tool-disclosure surface narrowed by allow-set (3 leak vectors)”* — Opened **July 5**, still open. This is a **security fix** (production change) that addresses three leak vectors in tool disclosure. It has been open for 24 days and requires review/merge to close critical trust-boundary gaps.
- **[PR #5598](nearai/ironclaw PR #5598)** — *“chore: release”* — Opened **July 3**, still open. This automated release PR contains breaking changes in `ironclaw_common` and `ironclaw_skills`. Pending review or manual intervention, it may block the next official release.
- **[Issue #6284](nearai/ironclaw Issue #6284)** — *Error-recoverability endgame* — While active, this epic has been open since **July 19** and drives many PRs. It is not stale, but its complexity may delay completion.
- **[Issue #6524](nearai/ironclaw Issue #6524)** — *Hermetic testing platform* — Opened **July 22**, still active with multiple sub-tasks open. Coordination across workstreams is needed.

No critical issue has gone unanswered for more than a few days; the development team appears responsive.

---

*Generated from GitHub data for 2026-07-29. See [nearai/ironclaw](https://github.com/nearai/ironclaw) for full details.*

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI Project Digest — 2026-07-29

## 1. Today's Overview

The project saw moderate activity over the past 24 hours, with five pull requests merged and one new open issue. No new releases were published. The merged PRs focused on stability fixes (Windows installer redirect, runtime safety contract enforcement) and a new feature (isolated side-chat panel). Three issues remain open, two of which are stale bugs with no recent maintainer activity. Overall, the project appears to be in a steady maintenance and incremental feature development phase.

## 2. Releases

No new releases were recorded today.

## 3. Project Progress

Five pull requests were merged/closed in the last 24 hours, all by **fisherdaddy** except one by **liuzhq1986**:

- **[#2402]** [CLOSED] `fix(update): reject Windows installer redirects instead of trusting response.url` — Improves update reliability on Windows.  
- **[#2400]** [CLOSED] `fix(openclaw): enforce runtime/config safety-contract gate to stop false-stop token burn` — Prevents the bundled OpenClaw runtime from running without LobsterAI’s safety policy; also retires `prompt-exposure-budget` as a terminal kind.  
- **[#2399]** [CLOSED] `feat(renderer): hide sites nav entry outside test mode` — UI polish to conditionally display site navigation.  
- **[#2398]** [CLOSED] `fix(installer): drive Skills backup outcome from helper exit codes` — Corrects a false positive in legacy Skills backup detection on Windows.  
- **[#2397]** [CLOSED] `feat(cowork): add isolated /btw side chat` — Introduces a floating, resizable side-chat panel for selected assistant text, with drag/resize/stop/follow-up capabilities; the `/btw` execution is isolated from the main conversation.  

One PR remains open: **[#1233]** `feat(model): add official site links and API Key guidance for model providers` (stale, from Apr 1).

## 4. Community Hot Topics

The most active issue is **[#2401]** (created Jul 28), asking whether the PDF/DOCX/PPTX/XLSX skills are from Anthropic’s official set and whether they can be used commercially. It has one comment and is still open. This reflects user uncertainty around licensing and origin of built-in skills.

Other issues with comments:  
- **[#1236]** – Stale bug about plugin ID mismatch warnings (1 comment).  
- **[#2071]** – Stale bug about scheduled task creation errors (1 comment).

No single issue has more than 1 comment, indicating low community discussion volume today.

## 5. Bugs & Stability

No new bug reports were filed in the last 24 hours. Two existing stale bugs remain:

- **[#1236]** (Apr 1, updated Jul 28) – **Plugin ID mismatch warning**. Severity: **Low**. Startup configuration warning, no functional impact. No dedicated fix PR, though similar config safety improvements were merged in #2400.  
- **[#2071]** (May 28, updated Jul 28) – **Scheduled task creation error**. Severity: **Medium**. User included a screenshot showing an error; no reproduction steps or logs provided. No fix PR identified.

Several of today’s merged PRs address stability:  
- #2402 – fix Windows installer redirect trust.  
- #2400 – runtime safety contract gate.  
- #2398 – corrects faulty backup outcome detection.

## 6. Feature Requests & Roadmap Signals

- **Issue #2401** requests clarification on skill licensing and origin (Anthropic vs. custom). This could signal demand for more transparent skill attribution and licensing documentation.  
- **PR #1233** (open since Apr) proposes adding official website links and API Key guidance for model providers. If merged, this would improve user onboarding for custom model configuration.  
- **PR #2397** (merged today) delivers an isolated side-chat (`/btw`), which may be a stepping stone toward more advanced side-panel or multi-thread interaction features.

Based on current activity, the next version is likely to include the side-chat feature, the runtime safety contract, and possibly the provider link/guidance UI improvements (if PR #1233 is revived).

## 7. User Feedback Summary

- **Commercial use concern**: The author of #2401 is evaluating whether LobsterAI’s built-in skills (PDF, PPTX etc.) can be legally used in a commercial product. This indicates growing enterprise interest and a need for clear licensing documentation.  
- **Configuration friction**: #1236 reports a persistent startup warning due to plugin ID mismatch. Users find this annoying, albeit non-blocking.  
- **Task creation failure**: #2071 reports an unreproduced error when creating scheduled tasks. The lack of reproduction steps limits diagnosis; the user likely expects a fix in a stable version.

Overall, users are encountering moderate friction from configuration issues and unclear licensing, but the project’s rapid PR turnaround on correctness (e.g., installer, runtime safety) suggests maintainers are responsive.

## 8. Backlog Watch

The following long-open items need maintainer attention:

- **[#1236]** (Apr 1) – Plugin ID mismatch warning. Stale for 3+ months. No assignee.  
- **[#2071]** (May 28) – Scheduled task creation error. Stale for 2 months. No assignee.  
- **[#1233]** (Apr 1) – PR adding provider links and API key guidance. Stale; needs review and testing.  

These represent accumulated technical debt and potential user dissatisfaction if left unresolved.

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis Project Digest — 2026-07-29

## Today’s Overview

The project saw eight pull requests updated in the last 24 hours (six open, two merged/closed) and one previously open issue resolved. Activity remains high across several areas: Slack integration, ACP (Agent Communication Protocol) exposure, instrumentation/observability, PWA push notifications, and infrastructure for benchmarking. The single issue from June was closed today via a corresponding fix PR, indicating maintainer responsiveness. No new releases were cut, but the volume and diversity of open PRs suggest a feature-dense release cycle is in progress.

## Releases

No new releases were published in the last 24 hours.

## Project Progress

Two PRs were merged/closed today:

- **[PR #1172](https://github.com/moltis-org/moltis/pull/1172) — fix(web): hide archived cron sessions by default** (author: shixi-li)  
  Applies the existing archived-session preference to the Cron tab so that archived runs are no longer shown by default. Adds a Playwright regression test for hiding, showing, and re-hiding archived cron sessions. This directly closes issue [#1111](https://github.com/moltis-org/moltis/issues/1111).

- **[PR #1171](https://github.com/moltis-org/moltis/pull/1171) — Move ACP selection into the chat model picker** (author: penso)  
  Relocates installed ACP clients into the composer model selector alongside provider-backed models, removing the historical header ACP selector. Preserves per-session binding, ACP-only auto-binding, unavailable-client handling, and reasoning controls.

Six PRs remain open and were updated today, representing significant feature work:

- **[PR #1166](https://github.com/moltis-org/moltis/pull/1166)** — Slack per-message acknowledgment reactions, phases, reconnect supervision, and Block Kit  
- **[PR #1170](https://github.com/moltis-org/moltis/pull/1170)** — Gate privileged tools behind a per-account operators list  
- **[PR #1169](https://github.com/moltis-org/moltis/pull/1169)** — Expose Moltis as an ACP agent over stdio  
- **[PR #1174](https://github.com/moltis-org/moltis/pull/1174)** — Add instrumentation and feedback collection infrastructure (Langfuse v4, OTLP, reaction feedback)  
- **[PR #1173](https://github.com/moltis-org/moltis/pull/1173)** — Make PWA push notifications reliable and non-disruptive  
- **[PR #1175](https://github.com/moltis-org/moltis/pull/1175)** — Add Terminal-Bench chat runner (`moltis-ctl chat`)

## Community Hot Topics

No issues or PRs attracted comments or reactions beyond zero in the observed data. The only issue active in the last 24 hours, [#1111](https://github.com/moltis-org/moltis/issues/1111), was a bug report that has now been closed. The PRs with the most recent activity are those by `penso` (five of the six open PRs), indicating ongoing architectural work on Slack, ACP, instrumentation, and PWA. The underlying need across these PRs is to harden Moltis for multi-channel, observable, and operator-friendly deployments.

## Bugs & Stability

One bug fix was merged today:

- **Bug: Archiving a cron session has no visible effect** (Issue [#1111](https://github.com/moltis-org/moltis/issues/1111)) — closed by PR [#1172](https://github.com/moltis-org/moltis/pull/1172).  
  Severity: **Low‑Medium**. The UI did not reflect the archived state when toggling the “Show archived” control for cron sessions. The fix applies the same session-preference logic already used in other tabs. No regression risk.

Another security/privacy fix is in open review:

- **[PR #1170](https://github.com/moltis-org/moltis/pull/1170)** — Tightens access to privileged shell tools (`/sh`, etc.) by introducing a per-account `operators` list. This prevents channel senders who passed an access allowlist from reaching host commands. Severity: **High** if exploited, but the PR includes enforcement across commands, callbacks, queue replay, and external execution.

No new crashes, regressions, or new bug reports were filed in the last 24 hours.

## Feature Requests & Roadmap Signals

User‑visible feature work visible in open PRs points to the following likely inclusions in the next release:

- **Slack bot usability** — per-message acknowledgment reactions (since Slack lacks a typing indicator), phase feedback, Block Kit rendering, and reconnection supervision.  
- **Agent interoperability** — Moltis can now be exposed as an ACP agent over stdio, enabling external tools to chat via the same cancellable pipeline.  
- **Observability** — backend-neutral instrumentation with Langfuse v4 export, OTLP operational backends, and end-user reaction feedback for chat completions.  
- **PWA reliability** — push notifications become private, non-disruptive across tabs, with re‑alerts for newer messages.  
- **Benchmarking** — a `moltis-ctl chat` command and Terminal-Bench wrapper for automated chat evaluation.

No explicit user‑submitted feature requests appear in the issue tracker; the activity is purely driven by internal development priorities. However, the Slack enhancements and ops/privilege separation directly address real‑world deployment pain points.

## User Feedback Summary

Direct user feedback is minimal in the visible data. The sole reporter of issue [#1111](https://github.com/moltis-org/moltis/issues/1111) expressed frustration that archiving a cron session showed no visible effect—a clear usability pain point that has now been resolved. The absence of new bug reports or feature requests suggests the current development cycle is staying ahead of community needs, or that feedback is primarily gathered through other channels.

## Backlog Watch

No long‑standing unanswered issues or PRs were identified. All open PRs are recent (created within the last six days) and receiving maintainer attention. The one issue that had been open since 2026-06-06 ([#1111](https://github.com/moltis-org/moltis/issues/1111)) was closed today. The project looks well‑maintained with no concerning backlog items.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw Project Digest — 2026-07-29

## 1. Today's Overview

CoPaw (formerly QwenPaw) experienced **high activity** over the past 24 hours: **13 issues** were updated (10 open, 3 closed) and **50 pull requests** were touched (33 open, 17 merged/closed). No new releases were published. The community is actively reporting bugs — particularly around data persistence, agent isolation, and platform-specific installers — while the development team continues to merge quality-of-life improvements, test infrastructure, and new features like visual context compression and per-session model overrides. The project is in a rapid iteration phase with strong contributor engagement.

## 2. Releases

*No new releases were published in the last 24 hours.* The latest version remains **CoPaw 2.0.1** (visible in issue reports). A pre-release `2.1.0b1` is referenced in a plugin compatibility fix (PR #6532), suggesting a new minor version is under active development.

## 3. Project Progress (Merged/Closed PRs Today)

**17 pull requests** were merged or closed today. Notable advancements include:

- **Visual Context Compression** (#6456) – Merged. Introduces `PawFocus` visual compression for long agent histories, with profitability gating and exact-content recovery.
- **Skill URL import** (#6517) – Merged. Adds ability to import skills from URLs with examples.
- **Driver unit tests + coverage gate** (#6489) – Merged. Brings Driver subsystem from 0% to a baseline coverage floor (`fail_under=50`).
- **Plugin compatibility max-version check disabled** (#6532) – Merged. Temporary workaround for pre-release version normalization, unblocking plugin updates.
- **Website improvements** – Several PRs merged: fixed Google Analytics measurement (#6330), updated homepage for v2.0 (#5940), added blog content and developer day collection (#5825, #5758, #3332).
- **Bug fixes closed**: #6501 (documented development install missing test extra), #6403 (RobotFramework syntax highlighting), #6474 (`view_video` not delivering video to LLM).

**Key trend**: The team is investing heavily in **test coverage**, **website refresh**, and **context management** features.

## 4. Community Hot Topics

| Issue/PR | Comments | Reactions | Topic |
|----------|----------|-----------|-------|
| [#6524](https://github.com/agentscope-ai/QwenPaw/issues/6524) | 3 | 0 | MCP server restart breaks client session; requires manual `list mcp` to reconnect. |
| [#6537](https://github.com/agentscope-ai/QwenPaw/issues/6537) | 2 | 0 | Skill tags disappear after restart (regression of #3270) – saved to `skill.json` but lost on manifest reconciliation. |
| [#6520](https://github.com/agentscope-ai/QwenPaw/issues/6520) | 2 | 0 | `agent.json` systematic corruption (BOM, missing quotes, double-encoding) causing complete system failure on Windows. |
| [#6461](https://github.com/agentscope-ai/QwenPaw/issues/6461) | 2 | 2👍 | Agent isolation: shared memory between agents allows cross-agent data access, causing privacy leaks in multi-bot deployments. |
| [#6509](https://github.com/agentscope-ai/QwenPaw/issues/6509) | 2 | 0 | Sub-agent cross-calling and session context file collisions – need full isolation per sub-agent and per-session. |

**Underlying user needs**: Reliability of persistent state (tags, config, MCP sessions), agent-level privacy and security, and robust error handling when external services restart.

## 5. Bugs & Stability

Ranked by severity:

| Severity | Issue | Description | Fix PR Exists? |
|----------|-------|-------------|----------------|
| **Critical** | [#6520](https://github.com/agentscope-ai/QwenPaw/issues/6520) | `agent.json` corruption on Windows leads to complete system failure. BOM/missing quotes/double-encoding across 20+ fields. | ✅ [#6528](https://github.com/agentscope-ai/QwenPaw/pull/6528) (fix: safe reading with BOM handling, atomic writes) |
| **High** | [#6524](https://github.com/agentscope-ai/QwenPaw/issues/6524) | MCP Server restart breaks session – client reuses stale `mcp-session-id`, cannot recover tools. | Not yet |
| **High** | [#6541](https://github.com/agentscope-ai/QwenPaw/issues/6541) | Scroll context compression injects `[context compressed]` block as `role=user` causing DeepSeek API `MODEL_EXECUTION_ERROR` (should be `role=system`). | ✅ Related: [#6540](https://github.com/agentscope-ai/QwenPaw/pull/6540) (sanitizer for orphan tool messages, but not specific to this role issue) |
| **High** | [#6534](https://github.com/agentscope-ai/QwenPaw/issues/6534) | Windows NSIS installer infinite loop: "still running" dialog matches installer process itself, making installation impossible. | Not yet |
| **Medium** | [#6537](https://github.com/agentscope-ai/QwenPaw/issues/6537) | Skill tags lost on restart despite correct API storage – regression of #3270. | Not yet |
| **Medium** | [#6529](https://github.com/agentscope-ai/QwenPaw/issues/6529) | ACP `new_session` response missing `models` field; external clients cannot discover available models. | ✅ [#6531](https://github.com/agentscope-ai/QwenPaw/pull/6531) |
| **Medium** | [#6542](https://github.com/agentscope-ai/QwenPaw/issues/6542) | Flash crash causes dialog history loss – no real-time persistence. | Not yet (feature request) |
| **Low** | [#6533](https://github.com/agentscope-ai/QwenPaw/issues/6533) | `/mission` command throws `TypeError` due to mismatched keyword argument in patched function. | Not yet |

**Overall stability**: Several **configuration and persistence bugs** are affecting Windows users especially. The MCP session recovery issue is a core reliability gap. The team has quickly produced fix PRs for the most critical ones (#6520, #6529, #6540), which is positive.

## 6. Feature Requests & Roadmap Signals

| Request | Issue/PR | Likely Next Version |
|---------|----------|---------------------|
| **Per-session model overrides** | [#5992](https://github.com/agentscope-ai/QwenPaw/pull/5992) (PR open) | ✅ **2.1.0** – Already implemented, waiting review |
| **Sub-agent / agent isolation** | [#6509](https://github.com/agentscope-ai/QwenPaw/issues/6509), [#6461](https://github.com/agentscope-ai/QwenPaw/issues/6461) | **High priority** – Multiple user requests, privacy concern |
| **Workspace checkpoint management** | [#6269](https://github.com/agentscope-ai/QwenPaw/pull/6269) (PR open) | Likely **2.1.0** – Shadow Git-based recovery |
| **Computer use (desktop GUI automation)** | [#6424](https://github.com/agentscope-ai/QwenPaw/pull/6424) (PR open, large) | **Future major** – Accessibility-first, Tauri control |
| **Auto-save on crash / real-time dialog persistence** | [#6542](https://github.com/agentscope-ai/QwenPaw/issues/6542) | Likely **2.1.1** or earlier – easy win for stability |
| **User context transparency (user_id, metadata pass-through)** | [#6525](https://github.com/agentscope-ai/QwenPaw/pull/6525) (PR open) | Likely **2.1.0** – Important for multi-tenant deployments |
| **Cancellation-safe lifecycle hooks** | [#6527](https://github.com/agentscope-ai/QwenPaw/pull/6527) (PR open) | Likely **2.1.0** – Persists partial state on cancel |
| **Model discovery infrastructure** | [#6302](https://github.com/agentscope-ai/QwenPaw/pull/6302) (PR open) | Likely **2.2.0** – Foundation for provider model lists |

**Prediction**: The next release (2.1.0) will likely include **per-session model overrides, user context pass-through, checkpoint management, and the visual compact feature** (already merged). Agent isolation is controversial and may take longer to design properly.

## 7. User Feedback Summary

**Positive signals**:
- Community is actively contributing – first-time contributors submitting PRs for bug fixes (#6528, #6531, #6331).
- The Visual Compact and computer-use features are ambitious and welcomed.
- Developers are investing in test infrastructure and plugin compatibility.

**Pain points** (direct user quotes):
- *“群成员通过@群聊中的qq机器人的方式，居然可以知道我另一个单聊中的智能体中的记忆，甚至可以用对话进行操作，造成隐私泄露”* (Agent isolation lacking – privacy leak between agents)
- *“QwenPaw 在运行过程中偶发闪退，导致当前会话的对话历史全部丢失”* (Crashes lose conversation history)
- *“MCP Server 重启后客户端无法自动恢复，需执行 list mcp 才能重新连接”* (MCP session recovery is manual)
- *“Windows Installer infinite loop -> installation impossible”* (Windows setup broken)
- *“agent.json suffered systemic corruption”* (Config file corruption on Windows)

**Common themes**: Reliability, data integrity, platform-specific bugs (Windows), and privacy in multi-agent setups.

## 8. Backlog Watch

| Issue/PR | Since | Stalled? | Why Attention Needed |
|----------|-------|----------|----------------------|
| [#5992](https://github.com/agentscope-ai/QwenPaw/pull/5992) – Per-session model overrides | Jul 12 (17 days) | No recent reviewer activity | Large feature PR – needs maintainer review to unblock 2.1.0. |
| [#6151](https://github.com/agentscope-ai/QwenPaw/pull/6151) – Background tool call refactor | Jul 15 (14 days) | No merge | Fixes three bugs & improves frontend control; important for stability. |
| [#6269](https://github.com/agentscope-ai/QwenPaw/pull/6269) – Workspace checkpoints | Jul 20 (9 days) | No recent commits | Could address crash-related history loss if merged. |
| [#6302](https://github.com/agentscope-ai/QwenPaw/pull/6302) – Model discovery infrastructure | Jul 21 (8 days) | No merge | Large foundational change – needs design review. |
| [#6424](https://github.com/agentscope-ai/QwenPaw/pull/6424) – Computer use (Windows/macOS) | Jul 24 (5 days) | Active updates | Large feature – potential integration complexity. |

**Observation**: Several feature PRs have been open for 1–2 weeks without maintainer feedback. The team is currently busy with bug fixes and website tasks; a dedicated review session for these PRs is advisable to avoid stalling the roadmap.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

# ZeptoClaw Project Digest — 2026-07-29

## Today’s Overview
The ZeptoClaw repository saw minimal activity in the last 24 hours. No issues were updated, and only two pull requests—both automated dependency bumps—were touched. One PR (bumping Rust from 1.95 to 1.96) was closed/merged, while another (jumping to 1.97) remains open. No new releases were published. Overall, the project appears to be in a low-activity maintenance phase, with no feature work, bug reports, or community discussions surfacing recently.

## Releases
No new releases were created in the last 24 hours (or in the recorded data). The latest release history remains unchanged.

## Project Progress
- **Merged/Closed PRs (last 24h):**  
  - **#613** – `chore(deps): bump rust from 1.95-slim-trixie to 1.96-slim-trixie` (closed) – This automated dependency update by Dependabot was merged, updating the Rust base Docker image to version 1.96-slim-trixie.  
    [PR #613](https://github.com/qhkm/zeptoclaw/pull/613)

- **Open PRs (updated last 24h):**  
  - **#649** – `chore(deps): bump rust from 1.95-slim-trixie to 1.97-slim-trixie` (open) – A second Dependabot PR proposes moving directly to Rust 1.97-slim-trixie, likely following the merge of #613.  
    [PR #649](https://github.com/qhkm/zeptoclaw/pull/649)

No manual feature contributions or bug fixes were advanced today.

## Community Hot Topics
No issues or PRs with comments or reactions were recorded in the last 24 hours. The two open/closed PRs received zero comments and zero 👍 reactions. The repository currently lacks active community discourse.

## Bugs & Stability
No bugs, crashes, or regressions were reported today. The project shows no new stability concerns.

## Feature Requests & Roadmap Signals
No feature requests or roadmap signals were submitted in the observed period. Given the lack of community input, the next version’s direction remains unclear.

## User Feedback Summary
No user pain points, use cases, or satisfaction signals were recorded today. The absence of issue reports or discussions suggests either a stable user base with no pressing problems or low engagement.

## Backlog Watch
No long-unanswered important issues or PRs were identified. The only open item is the Dependabot PR #649, which is fresh and awaiting maintainer review or merge. No stale items require maintainer attention.

---

**Overall Assessment:** ZeptoClaw is in a quiet maintenance phase with only automated dependency updates occurring. The project appears stable but lacks recent community activity or feature development.

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

No activity in the last 24 hours.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar).*