# OpenClaw Ecosystem Digest 2026-07-28

> Issues: 500 | PRs: 500 | Projects covered: 13 | Generated: 2026-07-28 02:49 UTC

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

# OpenClaw Project Digest – 2026-07-28

## 1. Today's Overview

OpenClaw continues at a very high activity level: **500 issues and 500 PRs** were updated in the last 24 hours, with 252 issues closed and 213 PRs merged or closed. The project is tackling several critical and high-priority bugs — notably a **P0 gateway memory leak** (RSS grows to 15.5GB, causing OOM kills), a **P0 state migration blocker** (beta.2 upgrade blocks startup), and a **P1 Codex session reuse exhaustion** bug discovered on the latest beta. On the feature side, the community strongly supports multi-platform coverage (Linux/Windows apps), security hardening (masked secrets, memory trust tagging), and filesystem sandboxing. No new releases were published today, but a sizeable batch of maintainer-led PRs — including large fixes for cron/Workboard lifecycle, channels state machine unification, and TUI safety — are under review or ready for merge.

## 2. Releases

No new releases today. The latest publicly available version appears to be **2026.7.2-beta.4** (referenced in issue #113434). Users on beta.1→beta.2 should be aware of the migration bug described in #109867 (index created before column, blocking startup); a fix is queued.

## 3. Project Progress

Today's merged/closed PRs that represent notable progress:

- **#109867 (P0) – Migration bug fix** – closed; fixes the `agent_id` index creation ordering that blocked gateway startup after beta.2 upgrade.
- **#103917 (P1) – Gateway crash on deleted subagent workspace** – closed; unhandled `FsSafeError` now handled gracefully.
- **#113606 (closed) – LINE webhook error details** – now preserved instead of `[object Object]`.
- **#109672 (closed) – AWS Guardrail “Something went wrong”** – improved error logging/reporting.
- **#110065 (closed) – Compaction config schema mismatch** – `compaction.enabled` now accepted by the config schema.

Key open PRs that advanced today (ready for maintainer review or awaiting proof):

- **#114865** (steipete) – Large fix preventing cron and Workboard lifecycle regressions (card order, session capture).
- **#114775** (steipete) – Unifies channels status state machine for WhatsApp, Zalo, etc.
- **#114869** (steipete) – TUI fixes: hides bearer tokens, prevents out-of-order streamed replies.
- **#114841** (omarshahine) – Renames the agent `cron` tool to `automations` (product-aligned naming).
- **#114688** (steipete) – Adds per-run stats (code-mode engagement, round trips, cost) to agent JSON envelopes.
- **#114877** / **#114876** (steipete) – First-class Nodes API and MCP namespace unification in Code Mode.
- **#82572** (jewseppi) – Persists followup queues across gateway restarts (large, still waiting on author).
- **#114799** (obviyus) – Fixes auto-reply no-visible-reply fallback via a turn ledger.

## 4. Community Hot Topics

| Issue/PR | Comments | Reactions | What’s driving the conversation |
|----------|----------|-----------|---------------------------------|
| [#75 – Linux/Windows Clawdbot Apps](https://openclaw/openclaw Issue #75) | 115 | 👍80 | Long-standing demand for desktop clients beyond macOS/iOS/Android. Users want parity for daily workflows on Win/Linux. |
| [#7707 – Memory Trust Tagging by Source](https://openclaw/openclaw Issue #7707) | 22 | 👍0 | Framework to tag memories by trust level based on origin to prevent poisoning. Moderately active, discussing implementation details. |
| [#91588 – Critical Gateway Memory Leak (P0)](https://openclaw/openclaw Issue #91588) | 21 | 👍1 | RSS grows to 15.5GB over days; OOM kills the gateway. Users reporting severe impact. Fix is top priority. |
| [#10659 – Masked Secrets (prevent agent seeing raw API keys)](https://openclaw/openclaw Issue #10659) | 15 | 👍4 | High security interest. Proposal to allow agents to *use* keys without *seeing* them. |
| [#86519 – Telegram duplicate replies (P1 regression)](https://openclaw/openclaw Issue #86519) | 14 | 👍1 | After 5.20 update, agent sends 2–10x duplicate replies. Partially mitigated in 5.22 but not fully fixed. **Fix PR #114869 may address related stream ordering issues.** |
| [#96857 – “(see attached image)” placeholder degradation](https://openclaw/openclaw Issue #96857) | 14 | 👍4 | Tool text outputs replaced with literal placeholders, blinding the agent. Closed as stale — may need re-evaluation. |
| [#74484 – Gateway pairing scope deadlock](https://openclaw/openclaw Issue #74484) | 13 | 👍2 | CLI stuck in scope deadlock; cannot approve/reject over-scoped repair requests. Closed – likely fixed. |
| [#94846 – Cron isolated agentTurn false error after tool recovery](https://openclaw/openclaw Issue #94846) | 13 | 👍1 | Completed cron runs erroneously marked as error due to recovered tool error being classified as fatal. |
| [#113306 – SQLite snapshot restore lacks crash guarantees](https://openclaw/openclaw Issue #113306) | 12 | 👍0 | Snapshot create/restore may report success without durable linking. **No fix PR yet.** |
| [#87318 – Amazon Bedrock Haiku 4.5 inference profile ARN not supported](https://openclaw/openclaw Issue #87318) | 12 | 👍1 | Closed as stale – but user reports still valid. |

**Underlying needs:** The community consistently asks for **cross-platform client support**, **security hardening** (memory tagging, secret masking, sandboxing), and **reliability fixes** for session/memory/streaming issues.

## 5. Bugs & Stability

**Critical (P0):**

- **[#91588](https://openclaw/openclaw Issue #91588) – Gateway memory leak (RSS 350MB → 15.5GB over days, OOM kills).** Heavily reported; no fix PR yet, but likely being worked on as a top priority.
- **[#109867](https://openclaw/openclaw Issue #109867) – State migration creates index before column, blocks gateway startup.** Closed – fix applied.
- **[#113434](https://openclaw/openclaw Issue #113434) – Codex sessions.reset reuses retired session ID; catalog/file scans exhaust RAM (beta.4).** Open; **no fix PR yet** – maintainer attention needed.

**High (P1):**

- **[#102020](https://openclaw/openclaw Issue #102020) – Second message in session fails with "reply session initialization conflicted".** Closed – fix likely in recent builds.
- **[#86519](https://openclaw/openclaw Issue #86519) – Telegram duplicate replies after 5.20 update.** Partially fixed; open PR #114869 may resolve underlying stream ordering.
- **[#113323](https://openclaw/openclaw Issue #113323) – LLM idle timeout aborts reasoning-token streaming on local reasoning models.** Open; no fix yet.
- **[#94251](https://openclaw/openclaw Issue #94251) – Ollama remote provider streaming not consumed; model_call never progresses.** Open; **linked PR #108716 may address transport override issue but not fully.**
- **[#87109](https://openclaw/openclaw Issue #87109) – Gateway heap grows to 1GB+ at idle on macOS; cron jobs fail silently.** Open; related to memory pressure.
- **[#94939](https://openclaw/openclaw Issue #94939) – 6.x state migration leaves conversation store SQLite empty (0 bytes) – orphans references.** Open; linked PR exists but needs live repro.
- **[#87756](https://openclaw/openclaw Issue #87756) – Regression: prompt-launched Lobster workflow hangs on nested `/tools/invoke`.** Open; no fix yet.
- **[#85844](https://openclaw/openclaw Issue #85844) – Auto-update leaves stale hashed bundle imports – gateway misbehavior.** Open; needs product decision.
- **[#85251](https://openclaw/openclaw Issue #85251) – Codex app-server emits turn/started then goes silent; session wedges 360s.** Open; stuck session recovery workaround exists but root cause unknown.
- **[#97178](https://openclaw/openclaw Issue #97178) – Gateway install adds duplicate LaunchAgent; restart storm on macOS.** Open; linked PR in progress.
- **[#90098](https://openclaw/openclaw Issue #90098) – Stack-safe large attachment handling for Control UI – `Maximum call stack` on large PDFs.** Open; needs linked PR.

**Medium (P2):**

- [#67419](https://openclaw/openclaw Issue #67419) – Session context bloat: bootstrap files re-injected every turn (20–30% token waste). Open.
- [#90414](https://openclaw/openclaw Issue #90414) – `agentmemory__memory_search` returns "index metadata is missing" persistently. Open.
- [#81514](https://openclaw/openclaw Issue #81514) – Cron isolated job status non-deterministic when agent recovers from tool error. Closed – likely fixed.
- [#113306](https://openclaw/openclaw Issue #113306) – SQLite snapshot restore lacks end-to-end crash guarantees. Open; no fix PR.

## 6. Feature Requests & Roadmap Signals

**Strong community interest – likely candidates for next stable release:**

- **Linux/Windows Clawdbot Apps** ([#75](https://openclaw/openclaw Issue #75)) – 115 comments, 80👍. The most upvoted feature request. Given maintainer activity, a Windows/Linux release may be in the roadmap.
- **Masked Secrets** ([#10659](https://openclaw/openclaw Issue #10659)) – P1 enhancement with linked PR #114390 (unescape newlines in write tool) and #114825 (classify Google invalid API keys as auth) show security focus. Likely to land soon.
- **Memory Trust Tagging by Source** ([#7707](https://openclaw/openclaw Issue #7707)) – P2 but high profile; aligns with security roadmap.
- **Filesystem Sandboxing Config** ([#7722](https://openclaw/openclaw Issue #7722)) – P2, popular; would complement masked secrets.
- **Exec-approvals denylist support** ([#6615](https://openclaw/openclaw Issue #6615)) – P2, 8👍. Simple addition with high user value.
- **Webhook hook sessions multi-turn** ([#11665](https://openclaw/openclaw Issue #11665)) – P2 with linked PR open; likely to be resolved.
- **Skill Permission Manifest Standard** ([#12219](https://openclaw/openclaw Issue #12219)) – P2, aligns with trust & safety vision.
- **OpenRouter cost exposure** ([#9016](https://openclaw/openclaw Issue #9016)) – P2, useful for cost-aware agents.

**New features appearing in today’s PRs suggest roadmap direction:**

- Code Mode Nodes API ([#114877](https://openclaw/openclaw PR #114877), [#114876](https://openclaw/openclaw PR #114876))
- Agent tool renaming `cron` → `automations` ([#114841](https://openclaw/openclaw PR #114841))
- Per-run stats in agent JSON ([#114688](https://openclaw/openclaw PR #114688))
- Followup queue persistence ([#82572](https://openclaw/openclaw PR #82572))

These indicate work on **developer experience**, **naming consistency**, and **operational resilience**.

## 7. User Feedback Summary

**Satisfaction:** Users appreciate the breadth of features and active development. The community is engaged, filing detailed bug reports with reproduction steps and environment info.

**Pain points (recurring themes):**

1. **Memory leaks and crashes** – Gateway memory ballooning (P0 #91588), heap growth at idle (#87109), OOM kills on macOS (#97178), Codex session reuse exhaustion (#113434). Many users report production-impacting instability.
2. **Message delivery/reliability** – Duplicate replies on Telegram (#86519), session initialization conflicts (#102020), stalled WhatsApp sessions (#84569), silent failures on cron (#87109), attachment processing stack overflows (#90098).
3. **Configuration friction** – Model fallback not triggered on context overflow (#9986), bootstrap files bloating context (#67419), restrictive config schema (#110065), hot reload losing included models (#99773).
4. **Third-party integration gaps** – Amazon Bedrock inference profile ARN not supported (#87318), Ollama remote streaming not consumed (#94251), LINE webhook errors opaque (#113606), WhatsApp sticker support missing (#7476).
5. **Accessibility** – TUI uses emojis/symbols that confuse screenreaders (#9637), Shift+Enter not supported for multiline (#10118).

**Use cases:** AI assistant integration with multiple channels (Telegram, WhatsApp, Slack, LINE, Nextcloud), cron automation, agent sub-agents, memory search, code mode development, and MCP server extensions.

## 8. Backlog Watch

Issues and PRs that have been open for **5+ months** or lack maintainer review despite high activity:

| Issue/PR | Age | Status | Why it matters |
|----------|-----|--------|----------------|
| [#75 – Linux/Windows apps](https://openclaw/openclaw Issue #75) | Since 2026-01-01 | Open, tagged `needs-product-decision` | Most-commented issue; strategic platform gap. |
| [#7707 – Memory Trust Tagging](https://openclaw/openclaw Issue #7707) | Since 2026-02-03 | Open, `needs-maintainer-review` & `needs-product-decision` | Security feature with clear use case. No maintainer engagement. |
| [#10659 – Masked Secrets](https://openclaw/openclaw Issue #10659) | Since 2026-02-06 | Open, multiple review tags | High interest, but stuck on product decision and security review. |
| [#6615 – Exec-approvals denylist](https://openclaw/openclaw Issue #6615) | Since 2026-02-01 | Open, `needs-maintainer-review` & `needs-product-decision` | Simple feature; likely low effort but blocked. |
| [#7722 – Filesystem sandboxing](https://openclaw/openclaw Issue #7722) | Since 2026-02-03 | Open, `needs-live-repro` & `needs-product-decision` | Requires live reproduction to proceed. |
| [#67419 – Session context bloat](https://openclaw/openclaw Issue #67419) | Since 2026-04-15 | Open, `needs-live-repro` | Performance issue affecting all multi-turn conversations. |
| [#8299 – Suppress sub-agent announce](https://openclaw/openclaw Issue #8299) | Since 2026-02-03 | Open, `needs-product-decision` | Users struggle with unwanted announce summaries; simple config toggle would help. |
| [#9016 – OpenRouter cost exposure](https://openclaw/openclaw Issue #9016) | Since 2026-02-04 | Open, `needs-product-decision` | Useful for cost tracking; no movement. |
| [#10687 – Dynamic model discovery (OpenRouter)](https://openclaw/openclaw Issue #10687) | Since 2026-02-06 | Open, `needs-live-repro` | Essential for providers with fast-changing model catalogs. |
| [#113306 – SQLite snapshot restore guarantees](https://openclaw/openclaw Issue #113306) | Since 2026-07-24 | Open, no fix PR | Recent but critical data-loss bug; needs immediate attention. |

**Note:** Several high-priority issues from #113306 onwards are recent and already flagged for maintainer review. The backlog of older (Feb–Apr) feature requests with `needs-product-decision` suggests a need for product roadmap clarity and prioritization.

---

## Cross-Ecosystem Comparison

Here is the cross-project comparison report based on the community digest summaries for 2026-07-28.

---

## Cross-Project Comparison Report: Personal AI Agent Ecosystem

**Date:** 2026-07-28  
**Period:** Last 24 hours

### 1. Ecosystem Overview

The personal AI assistant and agent open-source landscape is characterized by high-velocity iteration and a clear maturation divide. A cluster of core projects—**OpenClaw, NanoBot, IronClaw, and CoPaw**—exhibit very high activity, with hundreds of issues and pull requests updated daily, reflecting their roles as foundational runtimes and community hubs. A second tier, including **ZeroClaw and LobsterAI**, is heavily security-focused and grappling with production stability, while smaller or specialized projects like **PicoClaw, NanoClaw, Moltis, and EasyClaw** show steady but lower-volume progress. Notably, projects like **NullClaw, TinyClaw, and ZeptoClaw** registered no activity, signaling either feature completion or dormancy. Across the board, shared pain points around **memory management, cross-platform support, and third-party integration reliability** dominate community feedback.

### 2. Activity Comparison

| Project | Issues Updated (24h) | PRs Updated (24h) | Release Today? | Health Score (Qualitative) |
|---------|----------------------|-------------------|----------------|----------------------------|
| **OpenClaw** | 500 (252 closed) | 500 (213 closed) | No | Very High – intense activity, critical bugs in flight |
| **NanoBot** | 64 (63 closed) | 34 (20 closed) | No | Very High – major cleanup/consolidation |
| **ZeroClaw** | 48 (4 closed) | 50 (8 closed) | No | Moderate – security audit blockers |
| **PicoClaw** | 6 (0 closed) | 4 (0 closed) | No | Low – no merges, bugs pending |
| **NanoClaw** | 0 | 10 (1 closed) | No | Moderate – focused PR activity |
| **NullClaw** | 0 | 1 (0 closed) | No | Low – essentially idle |
| **IronClaw** | 38 | 50 (19 closed) | Yes (v1.0.0) | Very High – post-release bug bash |
| **LobsterAI** | 9 (0 closed) | 9 (6 closed) | No | Moderate – critical data bug |
| **TinyClaw** | 0 | 0 | No | None – no activity |
| **Moltis** | 0 | 5 (0 closed) | No | Low – steady but slow |
| **CoPaw** | 50 (31 closed) | 50 (13 closed) | No | Very High – responsive triage |
| **ZeptoClaw** | 0 | 0 | No | None – no activity |
| **EasyClaw** | 0 | 0 | Yes (v1.8.82) | Stable – shipping features |

### 3. OpenClaw’s Position

OpenClaw maintains a **dominant position** in the ecosystem by both community size and technical scope.

- **Community Size:** The digest reports 500 issues and 500 PRs updated in a single day, with feature requests like [#75 (Linux/Windows apps)](https://openclaw/openclaw Issue #75) attracting 115 comments and 80+ reactions. This is 10x the activity of the next busiest project (IronClaw, CoPaw).  
- **Technical Approach:** OpenClaw is a **monolithic gateway-runtime** architecture, unifying agent lifecycle, memory, channels, and tool execution. Its code mode (Nodes API), cron/automations engine, and per-run stats (PR #114688) point toward a focus on developer workflows and operational observability.  
- **Advantages:**  
  - **Ecosystem breadth:** Supports the widest range of channels (Telegram, WhatsApp, LINE, Slack, Nextcloud).  
  - **Enterprise-grade features:** Memory trust tagging (#7707), masked secrets (#10659), and followup queue persistence (#82572) address production security and reliability.  
  - **Platform ambition:** The strong community demand for Linux/Windows desktop apps suggests OpenClaw is positioning as a cross-platform OS for agents, not just a chat tool.
- **Gaps vs. Peers:**  
  - **Security audit depth:** ZeroClaw has a more systematic security audit backlog (credential leaks, authorization bypasses).  
  - **Release cadence:** IronClaw shipped v1.0.0; OpenClaw has not released since `2026.7.2-beta.4`.  
  - **Memory backend diversity:** NanoBot and Moltis are experimenting with alternative vector stores (Zvec, GitStore), while OpenClaw remains SQLite-centric (though it has PostgreSQL progress via ZeroClaw’s #9251).

### 4. Shared Technical Focus Areas

The following requirements appear across **multiple projects**, indicating industry-wide pain points:

| Focus Area | Projects Affected | Specific Needs |
|------------|------------------|----------------|
| **Memory Leaks & Runtime Stability** | OpenClaw (#91588 – P0 15.5GB leak), IronClaw (#6720 – stop button fails), ZeroClaw (#9357 – flaky runtime test), LobsterAI (#2393 – accelerator corruption) | Uncontrolled memory growth, silent data corruption, OOM kills. |
| **Security Hardening** | OpenClaw (masked secrets #10659, memory tagging #7707), ZeroClaw (6+ credential leak/authorization gaps), NanoClaw (webhook bind #3144), Moltis (/sh operator gating #1170) | API key leaks, unauthenticated endpoints, allowlist bypass. |
| **Cross-Platform / Windows Support** | OpenClaw (Linux/Windows apps #75), ZeroClaw (PowerShell #9182, Windows compilation #9422), LobsterAI (PowerShell 5.1 #2396, Chinese usernames #2390), CoPaw (native Windows sandbox) | Desktop apps, shell compatibility, CI failures on Windows. |
| **Third-Party Channel Reliability** | OpenClaw (Telegram duplicates #86519), LobsterAI (DingTalk streaming #5603), CoPaw (Feishu replies #5757, DingTalk images #5593) | Dropped or duplicate messages, slow streaming, opaque error responses. |
| **Developer Experience (DX) / Task Automation** | OpenClaw (cron→automations rename, per-run stats), NanoBot (skills marketplace, SDK host integration), IronClaw (error recoverability epic #6284), LobsterAI (artifact share/deploy) | Task lifecycle, cost tracking, tool naming consistency, marketplace. |
| **Long-Running & Scheduled Tasks** | OpenClaw (followup queue persistence #82572), ZeroClaw (cron discarding output #9340), LobsterAI (24-hour timeout #2062), NanoClaw (cron/Scheduled messages) | Silent failure, no operator cancellation, output visibility. |

### 5. Differentiation Analysis

| Dimension | OpenClaw | NanoBot | ZeroClaw | IronClaw | CoPaw | LobsterAI |
|-----------|----------|---------|----------|----------|-------|-----------|
| **Target User** | Power users, developers, multi-channel assistants | Community, tinkerers, multi-model users | Security-conscious, enterprise, compliance | Early adopters, bleeding-edge runtime | Chinese-language market, channel-heavy | Casual users, Chinese UI, TikTok/e-commerce |
| **Architecture** | Modular gateway + runtime, code mode Nodes API | Lightweight runtime, high PR velocity | Security audit + PostgreSQL backend | Ground-up rewrite (v1.0.0), monolith | Multi-agent, third-party agent integration | Electron desktop, accelerator performance |
| **Key Differentiator** | Ecosystem breadth (most channels, most features) | Rapid cleanup + skills marketplace | Systematic security hardening | Full rewrite with error recoverability | Channel depth (Feishu, DingTalk, WeChat) | E-commerce integration, artifact share/deploy |
| **Maturity** | Beta (2026.7.2-beta.4), high activity, stable core | Stable with rapid patch cycles | 0.8.3, pre-v0.9.0 security tracker | v1.0.0 – new codebase | Active patches, v2.0.x | v1.8.82 – mature but narrow |
| **Risk** | Memory leak #91588, stale product decisions | Unaddressed `/stop` data loss (#4792) | S0 security bypass (#8279) | Post-release bug bash (P1 stop failure) | CPU spike on Linux/Wayland (#6460) | Accelerator data corruption (#2393) |

### 6. Community Momentum & Maturity

**Tier 1 – Rapidly Iterating (High Momentum):**  
- **OpenClaw, NanoBot, IronClaw, CoPaw** – All show 50+ issues/PRs updated daily, with dozens closed. These projects are absorbing community contributions at scale and shipping code across multiple areas (bugs, features, docs).  
- **NanoBot** stands out for closing 63 of 64 updated issues – a sign of aggressive triage.  
- **IronClaw’s** v1.0.0 release signals a major milestone, with the team now in bug-bash mode.

**Tier 2 – Active but Stabilizing:**  
- **ZeroClaw** – High PR/issue volume (48/50) but moderate health due to security audit blockers. The project is in a self-imposed security harden phase.  
- **LobsterAI** – Moderate activity, but the critical data corruption bug (#2393) threatens trust.  
- **NanoClaw, Moltis, EasyClaw** – Steady, lower-volume development. EasyClaw shipped two releases today, indicating a mature release pipeline.

**Tier 3 – Idle / Stalled:**  
- **NullClaw, TinyClaw, ZeptoClaw** – No activity in 24 hours. NullClaw has a single stale Dependabot PR. These projects are likely feature-complete or abandoned.

### 7. Trend Signals

Several industry-wide trends emerge from the community feedback and project direction:

1. **The “Agent OS” Model is the Endgame:** OpenClaw’s push for Linux/Windows desktop apps, combined with IronClaw’s monolith rewrite and ZeroClaw’s PostgreSQL backend, points toward agents becoming a persistent operating environment, not just a chat interface. The demand for memory trust tagging, filesystem sandboxing, and long-running cron jobs reinforces this.

2. **Security is the #1 Gate for Production:** The volume of credential leak reports (ZeroClaw’s auditor, OpenClaw’s masked secrets, Moltis’s operator gating) shows that current agent architectures leak secrets at multiple layers. Expect token vaults, permission manifests (#12219), and zero-trust tool execution to become table stakes.

3. **Channel Dominance is Fragmented, Not Universal:** While OpenClaw supports the most channels, individual projects (CoPaw for Feishu/DingTalk, EasyClaw for TikTok, Moltis for Discord) are carving out specialized niches. No single project achieves parity across all channels, and reliability gaps (duplicate messages, slow streaming) are the common complaint.

4. **Developer Experience is the New Battleground:** OpenClaw’s per-run stats, tool renaming (`cron`→`automations`), and code mode Nodes API; NanoBot’s skills marketplace; and IronClaw’s error recoverability epic all signal that **the competitive moat is shifting from “can it chat” to “can I build with it”**. Feature parity for task automation, cost monitoring, and composable tools is emerging as the core differentiator.

5. **Chinese Market Ecosystem is Maturing Independently:** CoPaw (QwenPaw), LobsterAI, and EasyClaw show deep integration with Chinese platforms (DingTalk, Feishu, WeChat, TikTok) and Chinese-language UX. They are less concerned with global channel parity (e.g., Telegram, WhatsApp) and more focused on local reliability and e-commerce workflows. This bifurcation suggests two parallel ecosystems are forming.

6. **Memory Management Remains the Achilles’ Heel:** From OpenClaw’s 15.5GB RSS leak to LobsterAI’s accelerator corruption and NanoBot’s Dream memory integrity fixes, all projects struggle with memory. Session context bloat, re-injected bootstrap files, and SQLite snapshot guarantees (#113306) are unresolved across the board. This is likely the single largest technical debt item for the entire ecosystem.

**For AI Agent Developers:** The most valuable bets are (a) building on OpenClaw for breadth and community, (b) adopting ZeroClaw’s security patterns as a baseline, and (c) investing early in memory management, task orchestration, and multi-channel reliability—these are the cross-cutting challenges that will define the next 12 months of the ecosystem.

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot Project Digest – 2026-07-28

## 1. Today’s Overview

The project showed **very high activity** with 64 issues updated (63 closed, 1 still open) and 34 pull requests updated (20 merged/closed, 14 open). This indicates a major cleanup and integration push – most reported problems from previous weeks have been addressed and many pending PRs were merged. No new release was cut today, suggesting the maintainers are consolidating changes for a future stable release. The single remaining open issue and the 14 open PRs (mostly feature or refactoring) point to ongoing development that is likely to land in the next few days.

## 2. Releases

**No new releases** were published today. The latest available version remains as previously released.

## 3. Project Progress

**20 Pull Requests were merged or closed today**, covering a wide range of improvements:

- **Core & Memory**  
  - Fixed `GitStore` returning hex-of-hex object IDs ([#5126](https://github.com/HKUDS/nanobot/pull/5126) – merged)  
  - Preserved Dream input integrity during memory consolidation ([#5114](https://github.com/HKUDS/nanobot/pull/5114) – merged)  
  - Added a method to read document attachments on demand (PDF, DOCX, etc.) ([#5122](https://github.com/HKUDS/nanobot/pull/5122) – merged)  

- **WebUI**  
  - Stabilized repeated model preset rows in the composer ([#5113](https://github.com/HKUDS/nanobot/pull/5113) – merged)  
  - Fixed composer resize scroll jitter ([#5121](https://github.com/HKUDS/nanobot/pull/5121) – merged)  
  - Softened model selector emphasis ([#5119](https://github.com/HKUDS/nanobot/pull/5119) – merged)  
  - Switched model presets directly from the composer ([#5077](https://github.com/HKUDS/nanobot/pull/5077) – merged)  

- **Documentation & Debugging**  
  - Improved the README landing page ([#5123](https://github.com/HKUDS/nanobot/pull/5123) – merged)  
  - Added `LLM_LOGGING` environment variable for request/response debug logging ([#1683](https://github.com/HKUDS/nanobot/pull/1683) – merged)  

- **Other**  
  - Refactoring to remove redundant runtime scaffolding ([#5127](https://github.com/HKUDS/nanobot/pull/5127) – open, in review)  
  - Many smaller fixes for session consolidation, idle-compaction timestamps, and tool error handling (see §5).

## 4. Community Hot Topics

The most actively discussed issues (by comment count) all received closure today, indicating that maintainers engaged heavily with the community:

| Issue | Comments | Subject |
|-------|----------|---------|
| [#1991](https://github.com/HKUDS/nanobot/issues/1991) | 9 | Request for **multiple custom model providers** (closed, likely addressed in upcoming release) |
| [#3123](https://github.com/HKUDS/nanobot/issues/3123) | 8 | **Cron/scheduled message sending** – messages sent by cron cannot be queried later (closed) |
| [#2570](https://github.com/HKUDS/nanobot/issues/2570) | 7 | **Ollama local config** giving 404 error (closed after resolution) |
| [#2329](https://github.com/HKUDS/nanobot/issues/2329) | 6 | **Custom provider works on CLI but breaks on Feishu channel** (closed) |
| [#2373](https://github.com/HKUDS/nanobot/issues/2373) | 5 | **MiniMax API error** with function arguments (closed) |
| [#1174](https://github.com/HKUDS/nanobot/issues/1174) | 5 | **Memory consolidation failure** when using local models (closed) |

**Underlying needs:** Users are pushing for **more flexible model configuration** (multiple custom providers, easier local model setup) and **better cross-channel consistency** (cron, streaming, custom providers). The high closure rate suggests the team is actively resolving these pain points.

## 5. Bugs & Stability

Today’s updates addressed several bugs, with the most critical receiving immediate fix PRs:

- **High severity**  
  - **Permanent message loss on `/stop` command** ([#4792](https://github.com/HKUDS/nanobot/issues/4792)) – pending queue messages are silently discarded. *No fix PR identified yet.*  
  - **`suppress(Exception)` swallows tool validation errors** ([#4805](https://github.com/HKUDS/nanobot/issues/4805)) – errors in `prepare_call` are hidden. *No fix PR identified yet.*  

- **Medium severity**  
  - **Session consolidation drops uploaded media paths** ([#5120](https://github.com/HKUDS/nanobot/pull/5120)) – fix PR is open and under review.  
  - **Invalid idle-compaction timestamps cause session list errors** ([#5117](https://github.com/HKUDS/nanobot/pull/5117)) – fix PR open.  

- **Low severity / already fixed**  
  - **GitStore hex-of-hex bug** – fixed and merged ([#5126](https://github.com/HKUDS/nanobot/pull/5126)).  
  - **WebUI composer scroll jitter** – fixed ([#5121](https://github.com/HKUDS/nanobot/pull/5121)).  
  - **Dream memory integrity** – fixed ([#5114](https://github.com/HKUDS/nanobot/pull/5114)).  

The bugs #4792 and #4805 remain unaddressed; both could lead to silent data loss or misbehavior and should be prioritised.

## 6. Feature Requests & Roadmap Signals

Several feature requests and early-stage PRs indicate the direction of the next major version:

- **Multiple custom model presets** – Issue [#1991](https://github.com/HKUDS/nanobot/issues/1991) (closed) and PR [#5077](https://github.com/HKUDS/nanobot/pull/5077) (merged) already allow switching presets from the composer. Full multi-custom support may land soon.
- **Skills marketplace & management** – PR [#5116](https://github.com/HKUDS/nanobot/pull/5116) (open) adds a discoverable skills.sh marketplace and install-from-UI workflow.
- **Unified extension platform** – PR [#5098](https://github.com/HKUDS/nanobot/pull/5098) (open) introduces a native Python extension boundary, bridging the gap between skills, apps, and MCP.
- **LINE Messaging API channel** – PR [#5115](https://github.com/HKUDS/nanobot/pull/5115) (open) adds support for LINE, expanding the channel ecosystem.
- **Dream read-only sessions** – PR [#5112](https://github.com/HKUDS/nanobot/pull/5112) (open) makes Dream runs visible in WebUI as read-only log sessions.
- **SDK host integration** – PR [#5111](https://github.com/HKUDS/nanobot/pull/5111) (open) exposes context providers and runtime events for external system integration.
- **Configurable emoji in system prompt** – Issue [#2747](https://github.com/HKUDS/nanobot/issues/2747) (closed) requests a config toggle for the cat emoji.

Predictions: The **skills marketplace** and **extension platform** are likely to appear in the next minor release (v0.2.x), while channel additions like LINE will follow.

## 7. User Feedback Summary

Real user pain points surfaced in the last 24h include:

- **Configuration frustrations** – Several users struggled with Ollama, LM Studio, and custom providers, often receiving “No API key configured” errors despite correct settings (e.g., [#2570](https://github.com/HKUDS/nanobot/issues/2570), [#1947](https://github.com/HKUDS/nanobot/issues/1947), [#1478](https://github.com/HKUDS/nanobot/issues/1478)). Many of these were resolved through improved documentation or config fixes.
- **Cross-channel inconsistency** – Custom providers working on CLI but failing on channels like Feishu (e.g., [#2329](https://github.com/HKUDS/nanobot/issues/2329)) and progress notifications missing on Feishu ([#3166](https://github.com/HKUDS/nanobot/issues/3166)).
- **Cron & scheduled messages** – Users reported that cron-sent messages cannot be followed up on ([#3123](https://github.com/HKUDS/nanobot/issues/3123)) and that workspace switching does not stop old cron jobs ([#2358](https://github.com/HKUDS/nanobot/issues/2358)).
- **Memory consolidation issues** – Especially with local models, consolidation can take too long or fail completely ([#1174](https://github.com/HKUDS/nanobot/issues/1174)).

Overall satisfaction appears moderate to high given the rapid closure rate, though the recurring config and cross-channel issues highlight areas needing more robust testing and clearer defaults.

## 8. Backlog Watch

Of the 64 issues updated today, 63 were closed – leaving only **1 open issue**. That issue is not among the top-30 by comment count, so its subject is not available in this data. The 14 open PRs include several important fixes and features that are under active review:

| PR | Subject | Status |
|----|---------|--------|
| [#5127](https://github.com/HKUDS/nanobot/pull/5127) | Core refactor – remove redundant scaffolding | Open, needs review |
| [#5110](https://github.com/HKUDS/nanobot/pull/5110) | `status` command become actionable | Open |
| [#5111](https://github.com/HKUDS/nanobot/pull/5111) | SDK host integration extensions | Open |
| [#5122](https://github.com/HKUDS/nanobot/pull/5122) | On-demand document attachment reading | Open |
| [#5112](https://github.com/HKUDS/nanobot/pull/5112) | Dream read-only sessions in WebUI | Open |
| [#4667](https://github.com/HKUDS/nanobot/pull/4667) | Protect user skills from Dream writes | Open (since July 2) |
| [#5120](https://github.com/HKUDS/nanobot/pull/5120) | Fix media path dropping during consolidation | Open |
| [#5117](https://github.com/HKUDS/nanobot/pull/5117) | Fix invalid timestamps in idle compaction | Open |
| [#5116](https://github.com/HKUDS/nanobot/pull/5116) | Skills.sh marketplace in WebUI | Open |
| [#5115](https://github.com/HKUDS/nanobot/pull/5115) | LINE Messaging API channel | Open |
| [#5098](https://github.com/HKUDS/nanobot/pull/5098) | Unified extension platform | Open (since July 26) |

The most significant backlog item is PR [#4667](https://github.com/HKUDS/nanobot/pull/4667) (protect user skills from Dream writes), which has been open since July 2 and conflicts with recent code changes. Two unaddressed bugs of high severity (#4792, #4805) also need maintainer attention. No extremely long-running neglected issues stand out.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-07-28

## Today's Overview

ZeroClaw has seen extremely high activity in the last 24 hours: **48 issues** (44 open, 4 closed) and **50 pull requests** (42 open, 8 merged/closed) were updated. The project remains in a heavy security audit phase, with multiple high-risk vulnerabilities reported (credential leaks, authorization bypasses, unauthenticated endpoints) primarily from contributor `belumume`. CI/test reliability is also a major focus, with several flaky test failures and platform-specific compilation issues. No new releases were published; the latest stable version remains **0.8.3**. Overall project health is **moderate**: core features are advancing, but the volume of security and stability bugs suggests a strong need for a dedicated patch release.

## Releases

**No new releases** have been published in this window. The latest release remains `0.8.3` (build `05780f44`). Given the number of critical security issues filed, a **v0.9.0** release is anticipated to include a substantial security hardening pass, as tracked in issue [#7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432).

## Project Progress

**8 PRs merged/closed** in the last 24 hours:

- **[#9388](https://github.com/zeroclaw-labs/zeroclaw/pull/9388)** – Retired `CONTRIBUTORS.md` and grounded maintainer roles in governance document FND-003.  
- **[#9251](https://github.com/zeroclaw-labs/zeroclaw/pull/9251)** (merged) – **PostgreSQL as the first supported session backend** — a major infrastructure milestone.  
- **[#9429](https://github.com/zeroclaw-labs/zeroclaw/issues/9429)** (closed) – Fixed `zeroclaw-channels` tests that used fixed wall-clock timeouts, reducing CI flakiness on slow runners.  
- **[#9238](https://github.com/zeroclaw-labs/zeroclaw/issues/9238)** (closed) – Fixed `config_save_isolation` skipping all test files on Windows.  
- Other closed PRs include minor doc and config fixes (e.g., [#9407](https://github.com/zeroclaw-labs/zeroclaw/pull/9407), [#9445](https://github.com/zeroclaw-labs/zeroclaw/pull/9445), [#9446](https://github.com/zeroclaw-labs/zeroclaw/pull/9446), [#9472](https://github.com/zeroclaw-labs/zeroclaw/pull/9472)).

The **PostgreSQL backend** and **Windows PowerShell shell support** (PR [#9182](https://github.com/zeroclaw-labs/zeroclaw/pull/9182)) are notable open PRs that have moved forward.

## Community Hot Topics

### Most Active Issues (by comment count)

| Issue | Title | Comments | Link |
|-------|-------|----------|------|
| #9357 | **Runtime test flaky 19/20 times, poisons global mutex** | 5 | [🔗](https://github.com/zeroclaw-labs/zeroclaw/issues/9357) |
| #8973 | **Landlock blocks shell on Fedora** | 4 | [🔗](https://github.com/zeroclaw-labs/zeroclaw/issues/8973) |
| #9386 | **Gemini API key leak via unsanitized error message** | 4 | [🔗](https://github.com/zeroclaw-labs/zeroclaw/issues/9386) |
| #9363 | **Config metadata not localized in ZeroCode TUI** | 3 | [🔗](https://github.com/zeroclaw-labs/zeroclaw/issues/9363) |
| #8279 | **Delegate tool bypasses parent tool allowlist** | 3 | [🔗](https://github.com/zeroclaw-labs/zeroclaw/issues/8279) |
| #9393 | **Bluesky/Reddit no sender authorization** | 3 | [🔗](https://github.com/zeroclaw-labs/zeroclaw/issues/9393) |

### Most Active Pull Requests (by comment count)

| PR | Title | Comments | Link |
|----|-------|----------|------|
| #9439 | fix(tests): keep channel regression within Windows stack | 0 (but most recent) | [🔗](https://github.com/zeroclaw-labs/zeroclaw/pull/9439) |
| #9416 | docs(tools): document AllToolsResult.tools registry | — | [🔗](https://github.com/zeroclaw-labs/zeroclaw/pull/9416) |
| #9412 | fix(observability): pair display markers in order | — | [🔗](https://github.com/zeroclaw-labs/zeroclaw/pull/9412) |
| #8966 | feat(agent): carry live provider identity on usage events | — | [🔗](https://github.com/zeroclaw-labs/zeroclaw/pull/8966) |
| #9424 | fix(runtime): reject semantic-empty terminal completions | — | [🔗](https://github.com/zeroclaw-labs/zeroclaw/pull/9424) |
| #9447 | fix(anthropic): classify incomplete terminal responses | — | [🔗](https://github.com/zeroclaw-labs/zeroclaw/pull/9447) |

**Underlying needs:** The community is strongly focused on **security hardening** (API key leaks, authorization gaps, unauthenticated endpoints) and **test reliability** (flaky tests, platform-specific failures). The high engagement on #8279 (allowlist bypass) and #9357 (flaky runtime test) indicates these are blocking for real-world deployments.

## Bugs & Stability

### Critical & High-Severity Bugs Reported

| Severity | Issue | Description | Fix PR Exists? |
|----------|-------|-------------|----------------|
| **S1 – Workflow Blocked** | [#9474](https://github.com/zeroclaw-labs/zeroclaw/issues/9474) | Auth profile store fails to load – `model_provider` rename breaks old stores | No |
| **S1 – Workflow Blocked** | [#9425](https://github.com/zeroclaw-labs/zeroclaw/issues/9425) | Running SOP jobs have no operator cancellation path | No |
| **S1 – Workflow Blocked** | [#9421](https://github.com/zeroclaw-labs/zeroclaw/issues/9421) | Incomplete terminal responses reported as successful | PR [#9424](https://github.com/zeroclaw-labs/zeroclaw/pull/9424), [#9447](https://github.com/zeroclaw-labs/zeroclaw/pull/9447) |
| **S2 – Degraded Security** | [#9386](https://github.com/zeroclaw-labs/zeroclaw/issues/9386) | Gemini API key leaks through error message into chat | No |
| **S2 – Degraded Security** | [#9393](https://github.com/zeroclaw-labs/zeroclaw/issues/9393) | Bluesky/Reddit channels have no sender authorization | No |
| **S2 – Degraded Security** | [#9417](https://github.com/zeroclaw-labs/zeroclaw/issues/9417) | WhatsApp Cloud approval token leaked on failure | No |
| **S2 – Degraded Security** | [#9392](https://github.com/zeroclaw-labs/zeroclaw/issues/9392) | LINE group messages skip allowlist and pairing handshake | No |
| **S2 – Degraded Security** | [#9390](https://github.com/zeroclaw-labs/zeroclaw/issues/9390) | Emergency stop state file never read by runtime | No |
| **S2 – Degraded Security** | [#9389](https://github.com/zeroclaw-labs/zeroclaw/issues/9389) | Unauthenticated POST /api/pair keys lockout on attacker-supplied header | No |
| **S2 – Degraded** | [#9357](https://github.com/zeroclaw-labs/zeroclaw/issues/9357) | Runtime test fails 19/20 runs, poisons global mutex | No |
| **S2 – Degraded** | [#9422](https://github.com/zeroclaw-labs/zeroclaw/issues/9422) | zeroclaw-config cannot compile on Windows | No |
| **S2 – Degraded** | [#9340](https://github.com/zeroclaw-labs/zeroclaw/issues/9340) | CLI-created cron jobs discard output (delivery.mode=none) | No |

**Notable security bug cluster:** Issues [#9386](https://github.com/zeroclaw-labs/zeroclaw/issues/9386), [#9393](https://github.com/zeroclaw-labs/zeroclaw/issues/9393), [#9417](https://github.com/zeroclaw-labs/zeroclaw/issues/9417), [#9392](https://github.com/zeroclaw-labs/zeroclaw/issues/9392), [#9390](https://github.com/zeroclaw-labs/zeroclaw/issues/9390), [#9389](https://github.com/zeroclaw-labs/zeroclaw/issues/9389) were all filed by the same auditor (`belumume`) on 2026-07-26. These represent **systematic security deficiencies** across channels, gateway, and runtime.

## Feature Requests & Roadmap Signals

### Notable Feature Requests / RFCs

- **[#8983](https://github.com/zeroclaw-labs/zeroclaw/issues/8983)** – **Category-scoped memory sharing**: Allow sibling agents to share only selected memory categories, not all rows. Highly requested for multi-agent patterns.  
- **[#9463](https://github.com/zeroclaw-labs/zeroclaw/issues/9463)** – **WASM memory plugins**: Wire channel and memory WASM plugins into runtime backend selection (currently only tool plugins work).  
- **[#9330](https://github.com/zeroclaw-labs/zeroclaw/issues/9330)** – **AI-assisted PR pre-review**: Use CI results to trigger AI review while keeping human approval for high-risk changes.  
- **[#9464](https://github.com/zeroclaw-labs/zeroclaw/issues/9464)** – **Anthropic OAuth stored-profile contract**: RFC for explicit `auth_mode = "oauth"` path.

### Roadmap Signals

- **[#7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432)** – **v0.9.0 security tracker** continues to accumulate breaking-change items (auth, tool policy, gateway boundaries).  
- **[#8288](https://github.com/zeroclaw-labs/zeroclaw/issues/8288)** – **SOP milestone tracker**: Daemon-owned SOP control plane to 5/5 capability; several open PRs target this.

**Prediction for next version:** The next release (v0.9.0) will likely include the **PostgreSQL session backend**, **security hardening patches** for credential leaks and authorization, and **PowerShell shell support** on Windows. The Anthropic OAuth contract and WASM memory plugins may be deferred to v0.10.

## User Feedback Summary

**Real Pain Points:**

- **Security gaps worry adopters:** Multiple issues expose API keys, allow unauthenticated pairing, or let channels skip allowlists. Users deploying ZeroClaw in production will be blocked until these are fixed.
- **Test flakiness hurts developer trust:** The runtime test that fails 19/20 times (#9357) is a top complaint; other platform-specific failures (Windows, macOS) increase CI debt.
- **Shell access limited on Fedora:** The Landlock sandbox breaks shell tool on Fedora (#8973), affecting a significant Linux user base.
- **Cron job output silently discarded:** Agents run on schedule but deliver output to nowhere (#9340) – a confusing experience for automation users.
- **No cancellation for long-running SOP jobs:** Operators cannot stop a stuck or erroneous job from the dashboard (#9425).
- **Missing written feedback on channel rejection:** Inbound messages that fail precheck only get a reaction emoji; sender sees no explanation (#9465).

**Satisfaction signals:** The community is actively contributing with many high-quality PRs (e.g., #9251, #9182, #8966), indicating strong engagement and trust in the project direction.

## Backlog Watch

### Issues Needing Maintainer Attention

| Issue | Age | Description | Reason for Attention |
|-------|-----|-------------|----------------------|
| [#8279](https://github.com/zeroclaw-labs/zeroclaw/issues/8279) | 2026-06-24 (34 days) | Delegate bypasses parent tool allowlist (S0 security risk) | No fix PR yet; labelled `no-stale`. |
| [#8973](https://github.com/zeroclaw-labs/zeroclaw/issues/8973) | 2026-07-11 (17 days) | Landlock blocks shell on Fedora | No fix PR; `status:in-progress` but no assignee. |
| [#8720](https://github.com/zeroclaw-labs/zeroclaw/issues/8720) | 2026-07-04 (24 days) | Bedrock Nova 2 Lite caching error cannot be disabled | Needs config feature or workaround. |
| [#9340](https://github.com/zeroclaw-labs/zeroclaw/issues/9340) | 2026-07-24 (4 days) | CLI cron jobs have `delivery.mode = "none"` | Simple fix available? |
| [#7808](https://github.com/zeroclaw-labs/zeroclaw/issues/7808) | 2026-06-16 (42 days) | CLI secret prompts give no feedback after paste | Closed but issue persists? (Closed as complete?) Check status. |

### PRs Needing Author Action (Stale)

- [#8784](https://github.com/zeroclaw-labs/zeroclaw/pull/8784) – refactor(runtime): split-history loop contract (opened 2026-07-07, last updated 2026-07-28) – `needs-author-action`.  
- [#8966](https://github.com/zeroclaw-labs/zeroclaw/pull/8966) – feat(agent): carry live provider identity – `needs-author-action`.  
- [#9182](https://github.com/zeroclaw-labs/zeroclaw/pull/9182) – feat(runtime): PowerShell shell support – `needs-author-action`.  
- [#9362](https://github.com/zeroclaw-labs/zeroclaw/pull/9362) – fix(browser): validate screenshot path – `needs-author-action`.  
- [#9424](https://github.com/zeroclaw-labs/zeroclaw/pull/9424) – fix(runtime): reject empty terminal completions – `needs-author-action`.  
- [#8443](https://github.com/zeroclaw-labs/zeroclaw/pull/8443) – feat(matrix): single-message progress drafts – `needs-author-action`.

These PRs represent significant feature/security improvements that risk stagnation if authors do not respond to review feedback.

**Tracker of trackers:** Issue [#7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432) (v0.9.0 auth/security) and [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) (maintainer decision queue) are the central coordination points for breaking changes. Maintainers should prioritize resolving the security bug cluster and the S1 blockers before the next release.

---

*Data sourced from GitHub data snapshot for 2026-07-28. All links point to zeroclaw-labs/zeroclaw.*

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

Here is the project digest for PicoClaw on 2026-07-28, generated from the provided GitHub data.

---

# PicoClaw Project Digest – 2026-07-28

## Today’s Overview
Activity on the PicoClaw repository remains moderate, with **6 open issues** and **4 open pull requests** updated within the last 24 hours. No new releases were published. The community continues to surface quality-of-life improvements (localization, default fallback chains) and stability concerns (MCP connection hangs, UI lag). Notably, a fresh bug report (#3300) highlights a recurring tool-missing deadlock, while a stale feature request (#3276) and PR (#3200) signal ongoing interest in better server deployment and model fallback configuration. No PRs were merged or closed today, indicating a slower pace of code integration.

## Releases
**None.** No new releases were created in the report period.

## Project Progress
**Merged/closed PRs today: 0** – no code changes were integrated.  
All four open PRs remain active and under review:

- **#3273** – Adds Japanese localization (community contribution responding to #3272).  
- **#3271** – Updates default model names across nine providers (e.g., OpenAI, Anthropic) to July 2026 latest.  
- **#3270** – Introduces DashScope TTS provider and WeChat audio file sending.  
- **#3200** – Adds a configurable default fallback chain for models in the WebUI (stale, open since July 1).

No feature branches advanced to merge today.

## Community Hot Topics
The most active discussions (by number of comments and cross-referencing) are:

- **#3276** – [Feature] Launcher: support externally-managed gateway & graceful handling of unknown channel types *(1 comment, 0 👍)*  
  The author describes friction when running both `picoclaw gateway` and `picoclaw-launcher` as systemd services. The underlying need is **better lifecycle decoupling** for headless server deployments.  
  [Link to Issue](https://github.com/sipeed/picoclaw/issues/3276)

- **#3272 / #3273** – Japanese localization request and corresponding PR. The issue has 1 comment and the PR is actively being reviewed. Shows demand for i18n beyond English/Chinese.  
  [Issue #3272](https://github.com/sipeed/picoclaw/issues/3272) | [PR #3273](https://github.com/sipeed/picoclaw/pull/3273)

- **#3269** – [BUG] MCP server connection failure hangs agent loop, causing chat stop. The issue reports a hard hang with no recovery, which has drawn attention due to its impact on user experience.  
  [Link to Issue](https://github.com/sipeed/picoclaw/issues/3269)

- **#3300** – (Created today) Toolset missing `read_file` causes deadlock when user instructs AI to read `RULES.md`. The author describes a workaround that fails because the required tool doesn’t exist. This bug echoes earlier discussions about tool completeness.  
  [Link to Issue](https://github.com/sipeed/picoclaw/issues/3300)

## Bugs & Stability
**High severity:**

1. **#3269** – MCP server connection failure → agent loop hangs → UI stops responding. No known fix PR. Severity: **Critical** – blocks all chat usage after a transient MCP failure.  
   [Issue #3269](https://github.com/sipeed/picoclaw/issues/3269)

2. **#3300** – Missing `read_file` tool causes systematic deadlock when agent is instructed to read an external rules file. User attempted a workaround that failed. Severity: **High** – prevents a common customization pattern.  
   [Issue #3300](https://github.com/sipeed/picoclaw/issues/3300)

3. **#3281** – Web UI chat input becomes very laggy with long history. Severity: **Medium** – degrades user experience but not blocking.  
   [Issue #3281](https://github.com/sipeed/picoclaw/issues/3281)

4. **#3268** – `exec` tool’s `action` parameter required with no default; LLM calls fail if parameter omitted. Proposed fix: default to `"run"`. Severity: **Medium** – impacts reliability of tool calling for AI agents.  
   [Issue #3268](https://github.com/sipeed/picoclaw/issues/3268)

*No fix PRs exist for any of these bugs yet.*

## Feature Requests & Roadmap Signals
The following features were requested this period and may appear in future releases:

- **Japanese localization** (#3272) – clear community demand; PR #3273 already submitted.
- **Configurable default fallback chain** for models in WebUI (#3200) – PR exists; likely for next minor release.
- **External gateway management** via systemd (#3276) – reflects need for production-grade headless deployment.
- **DashScope TTS & WeChat audio** (#3270) – extends platform integrations; useful for Chinese developers.

Prediction: #3273 (i18n) and #3271 (model name updates) are low-risk and could merge soon. #3200 and #3270 may require additional design review.

## User Feedback Summary
- **Pain points:** Users report stability issues (MCP hangs, UI lag) and missing core tools (`read_file`). The headless server deployment is described as “friction point” due to lifecycle assumptions.
- **Use cases:** Headless Ubuntu VM deployments, multi-language UI (Japanese), custom rules via `RULES.md`, AI agent tool reliability.
- **Satisfaction:** Generally neutral; the project is actively used but bugs and missing features hinder adoption for production or non-English users.

## Backlog Watch
The following issues/PRs have not received maintainer attention for an extended period:

- **#3200** (PR, open since July 1) – Configurable fallback chain. No comments from maintainer. Could block upcoming model management improvements.  
  [PR #3200](https://github.com/sipeed/picoclaw/pull/3200)

- **#3276** (Issue, open since July 20) – Launcher/gateway lifecycle for systemd. Only one comment from author. Maintainer feedback is needed to decide whether to accept the proposed approach.  
  [Issue #3276](https://github.com/sipeed/picoclaw/issues/3276)

- **#3268** (Issue, open since July 19) – `exec` tool default action. Single comment suggests a quick fix, but no maintainer acknowledgment.  
  [Issue #3268](https://github.com/sipeed/picoclaw/issues/3268)

*These items risk stalling if not triaged soon.*

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw Project Digest – 2026-07-28

## Today’s Overview
NanoClaw saw no new issues or releases in the last 24 hours, but development remained active with **10 pull requests updated**, including one merge/close. The project’s pulse is centered around polish and interoperability: three fix PRs addressing real-world deployment pain points (webhook binding, attachment paths, skill selection logic) and one feature addition for configurable webhook addresses. A group‑chat engagement consistency PR and a new channel integration (Dial) also advanced. Overall, the project is in a healthy maintenance‑plus‑feature state, with the community contributing both utility skills and core fixes.

## Releases
No new releases were published in this period.

## Project Progress
One pull request was merged or closed today:

- **[#2598 – fix: load per-group CLAUDE.local.md by adding ‘local’ to settingSources](https://github.com/nanocoai/nanoclaw/pull/2598)** (closed, authored by jonnychesthair-crypto)  
  Resolves a long‑standing bug where per‑group customisation files (`CLAUDE.local.md`) were not being loaded, because the `local` source was missing from the setting‑resolution chain.

No other PRs were merged today.

## Community Hot Topics
All PRs in the list show `undefined` for comments and 0 reactions, so activity is hard to gauge by volume. However, several PRs touch on recurring user needs:

- **[#3144 – feat(webhook): configurable bind address via WEBHOOK_HOST](https://github.com/nanocoai/nanoclaw/pull/3144)** (new, open)  
  Addresses the common request to limit the webhook server to a specific interface (e.g. `127.0.0.1`) instead of binding to `0.0.0.0`. This is a direct response to security/hardening concerns in production deployments.

- [#3137 – Fix engagement consistency and expose self‑serve wiring controls](https://github.com/nanocoai/nanoclaw/pull/3137) (open, core-team)  
  Allows group agents to inspect and update their own engagement‑policy wiring – a feature long requested by teams managing complex multi‑agent setups.

- [#3050 – Add Dial to the channel picker + wizard/skills](https://github.com/nanocoai/nanoclaw/pull/3050) (open)  
  Integrates the Dial communication channel, expanding the supported platform set beyond standard chat services.

The lack of high‑interaction threads may indicate that most discussion happens on closed issues or that the project’s PR review process is quiet. The focus on production hardening and multi‑channel support suggests the community values reliable, secure deployments.

## Bugs & Stability
Several fix PRs were active today, addressing real user‑facing issues:

| Severity | Bug / Issue | Fix PR | Notes |
|----------|-------------|--------|-------|
| **High** | **Signal image/file attachments silently fail** – the path used in message text was never mounted into the agent container, preventing the Read tool from opening PDFs, text files, etc. | [#3142](https://github.com/nanocoai/nanoclaw/pull/3142) (open) | Fix redirects attachments through the mounted inbox. This is a critical usability issue for any Signal‑using deployment. |
| **Medium** | **Resolved approval cards lose their body content** – once resolved, buttons disappear but title and details are also lost, making audit trails incomplete. | [#3143](https://github.com/nanocoai/nanoclaw/pull/3143) (open, core-team) | Fix preserves the original body and shows muted decision/actor instead of buttons. Important for governance. |
| **Medium** | **container.json skill selection ignored for CLAUDE.md fragments** – when using container‑level skill selection, the correct `.md` fragments were not being injected. | [#3141](https://github.com/nanocoai/nanoclaw/pull/3141) (open) | Fix aligns compose behavior with documented configuration schema. |
| **Low** | **Unknown slash commands silently dropped** – commands not recognized by the formatter were classified as `passthrough`, causing the agent to discard the message entirely. | [#2346](https://github.com/nanocoai/nanoclaw/pull/2346) (open, since May) | Fix treats them as normal chat, restoring the user’s intent. |

All bugs have open fix PRs, but none have been merged yet today.

## Feature Requests & Roadmap Signals
The following emerged in today’s PR activity and are likely candidates for the next minor release:

- **Configurable webhook bind address** (#3144) – a one‑liner that greatly improves deployment security.
- **Self‑serve engagement wiring for group agents** (#3137) – enables power users to adjust agent behaviour without core‑team intervention.
- **Dial channel integration** (#3050) – broadens the platform support and signals continued investment in multi‑channel architectures.
- **Host operational & health CLI utility skill** (#2971, open) – provides a standalone tool for host monitoring, reflecting user demand for better observability.
- **Group typing indicators and outbound reactions for Signal** (#2685, open) – feature completeness for the Signal integration.

Given the maturity of #3144 and the core‑team involvement in #3137, these two are likely to land first.

## User Feedback Summary
User pain points evident from PR descriptions and titles:

- **Webhook security** – several users have requested the ability to bind the webhook server to a specific IP. The default `0.0.0.0` is unsuitable for production environments with restricted network policies.
- **Signal attachment handling** – a clear breakage: non‑image attachments (PDFs, documents) were unreachable, making the Signal channel effectively broken for file sharing. This has likely caused frustration for teams relying on it.
- **Missing local overrides** – the `CLAUDE.local.md` per‑group loading bug meant customised instructions were ignored, forcing users to work around it manually.
- **Invisible engagement policies** – group agents could not inspect or modify their own wiring, making it hard for non‑maintainers to tune responses.

Satisfaction signals are less visible, but the large number of open skill PRs (e.g. #2971, #3050) suggests a healthy contributor community that finds the extension model easy to work with.

## Backlog Watch
The following long‑standing pull requests remain open and could benefit from maintainer attention:

- **[#2346 – fix(formatter): treat unknown slash commands as normal chat](https://github.com/nanocoai/nanoclaw/pull/2346)** (opened 2026‑05‑08, last updated 2026‑07‑27)  
  A simple but impactful fix for user confusion. No comments or reactions – may need a second review.

- **[#2685 – docs(signal): group typing, outbound reactions, quote‑reply fix](https://github.com/nanocoai/nanoclaw/pull/2685)** (opened 2026‑06‑04, last updated 2026‑07‑27)  
  Primarily documentation, but it also implies the underlying feature code is already merged. Could be merged to close the feature documentation gap.

Neither has been tagged with a maintainer response. A quick triage comment would help move them forward.

---

*Digest generated from GitHub data available as of 2026‑07‑28 23:59 UTC.*

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw Project Digest — 2026-07-28

## 1. Today’s Overview
Project activity remains very low, with no new issues or releases in the last 24 hours. The only update is a single open pull request from Dependabot that bumps the base Docker image from Alpine 3.23 to 3.24; no merged or closed PRs occurred today. This calm state suggests a stable codebase with little active development or community engagement at the moment. Overall project health appears neutral, though the lack of maintainer responses to the open dependency PR may indicate a slow review cycle.

## 2. Releases
No new releases were published today. The latest release information is unavailable.

## 3. Project Progress
No pull requests were merged or closed today. The single open PR—[#956](https://github.com/nullclaw/nullclaw/pull/956)—remains unmerged and is a routine dependency update. No feature advancements or bug fixes were recorded.

## 4. Community Hot Topics
**Only active item:**  
- **[PR #956](https://github.com/nullclaw/nullclaw/pull/956)** – “ci(deps): bump alpine from 3.23 to 3.24 in the docker-images group”  
  *Author:* dependabot[bot] · *Opened:* 2026-06-15 · *Updated:* 2026-07-27 · *Comments:* 0 · *Reactions:* 0  
  *Analysis:* This is an automated dependency bump that keeps the Docker image up-to-date. No community discussion has occurred, indicating that users are either satisfied with the change or unaware of it. The underlying need is maintaining security and compatibility with the latest Alpine base image.

## 5. Bugs & Stability
No bugs, crashes, or regressions were reported in the last 24 hours. The project appears to be stable, with no open issues indicating defects.

## 6. Feature Requests & Roadmap Signals
No user-submitted feature requests or roadmap signals were observed in today’s data. The absence of issues suggests either a feature-complete project or a lack of active user feedback channels.

## 7. User Feedback Summary
There is no user feedback (comments, reactions, or issues) available for today. The community is either quiet or content with the current state of the project.

## 8. Backlog Watch
No long-unanswered issues or PRs demanding maintainer attention were identified. The open PR [#956](https://github.com/nullclaw/nullclaw/pull/956) (opened on 2026-06-15) could benefit from a review or merge to keep the dependency chain current, but it is not critically aged. No other items in the backlog require immediate action.

---

*Data source: GitHub repository nullclaw/nullclaw, snapshot taken 2026-07-28.*

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest – 2026-07-28

## Today’s Overview
Project activity remains **very high** with 38 issues and 50 pull requests updated in the past 24 hours, plus one major release. The landmark **IronClaw v1.0.0** shipped yesterday (2026-07-27) as a ground-up rebuild of the agent runtime, storage, extension host, and Web UI. The team is now deep into bug-bash and launch-checklist mode: new `v1-launch-checklist` issues and P1 bugs dominate today’s updates, while several large-scale refactors (failure vocabulary, composition assembly, extension lifecycle) continue to merge. The project is clearly focused on stabilization and feature completeness ahead of public launch.

## Releases
- **ironclaw-v1.0.0** (2026-07-27): First stable release of the rearchitected IronClaw. This is **not** an increment on the 0.29.x line—it is a full rewrite. The v1 monolith builds as the `ironclaw` binary; the legacy version is available as `ironclaw-legacy`.  
  > *No breaking-change or migration notes were published in the release description.*  
  > [View Release](https://github.com/nearai/ironclaw/releases/tag/ironclaw-v1.0.0)

## Project Progress
**Merged/closed PRs today (19 of 50 updated)** – selected notable merges:

- **#6692** – `docs: restructure the docs site around the shipped 1.0 binary` – Also fixed a security exposure: 33 internal doc paths were served publicly. *(Closed)*  
  [PR #6692](https://github.com/nearai/ironclaw/pull/6692)
- **#6684** – `refactor(reborn): one failure vocabulary — collapse five failure-kind enums into host_api FailureKind with fate projections` – A core architectural change under epic #6284; fixes 6 wrong-terminal/mis-retry bugs. *(Closed)*  
  [PR #6684](https://github.com/nearai/ironclaw/pull/6684)
- **#6723** – `sandbox: add unwired credential-firewall primitives (CA + obligation staging)` – Adds two foundational primitives for the persistent sandbox program. *(Closed)*  
  [PR #6723](https://github.com/nearai/ironclaw/pull/6723)
- **#6687** – `build(deps): bump everything-else group with 33 updates` – Routine dependency bump. *(Closed)*  
  [PR #6687](https://github.com/nearai/ironclaw/pull/6687)

Other active PRs of note:
- **#6691** (open) – Composition assembly refactor (−9,394 lines).  
- **#6696** (open) – DB migration collapsing lifecycle state into process journal.  
- **#6695** (open) – Sandbox leaf-scoped mount containment.  
- **#6697** (open) – Fix finish-reason reporting in LLM adapters (epic #6284).  
- **#6724** (open) – Rebuild memory provider contract around declared capabilities.

## Community Hot Topics
The most active issue remains:

- **#6284** – `[EPIC] error-recoverability endgame` – 14 comments. The goal is that **every** mid-run error satisfies a five-part recoverability contract. This epic is driving multiple PRs (#6684, #6697) and is a core quality initiative.  
  [Issue #6284](https://github.com/nearai/ironclaw/issues/6284)

Other well-discussed items:
- **#6524** – `Hermetic capability and journey testing platform` (3 comments) – Underlies the nightly reversed-order journey tests.  
- **#6581** – `429 Too Many Requests on agent-stg` (3 comments) – Blocking WebChat v2 live updates.  
- **#6522** – `IronClaw not aware how to setup Telegram locally` (2 comments) – Lack of documentation frustrates users.

## Bugs & Stability
**New bugs reported today (2026-07-28) – ranked by severity:**

| Severity | Issue | Summary | Fix PR? |
|----------|-------|---------|---------|
| **P1**  | [#6720](https://github.com/nearai/ironclaw/issues/6720) | Task runs indefinitely, **Stop button fails** to cancel execution on staging instance | None yet |
| **P1**  | [#6719](https://github.com/nearai/ironclaw/issues/6719) | Conversation history fails to load after backend errors (503) and CSP violations | None yet |
| **P1**  | [#6718](https://github.com/nearai/ironclaw/issues/6718) | Streaming only resumes after switching pages – continuous streaming broken | None yet |
| **P2**  | [#6741](https://github.com/nearai/ironclaw/issues/6741) | Extension OAuth for Gmail/Calendar fails after completing sign-in flow | None yet |
| **P2**  | [#6581](https://github.com/nearai/ironclaw/issues/6581) | 429 Too Many Requests on SSE event channel (still open) | None yet |
| **P3**  | [#6717](https://github.com/nearai/ironclaw/issues/6717) | Agent gives incorrect Telegram pairing instructions after successful pairing | None yet |
| **P3**  | [#6716](https://github.com/nearai/ironclaw/issues/6716) | Model claims Slack integration unavailable, hallucinates limitations | None yet |
| **P3**  | [#6575](https://github.com/nearai/ironclaw/issues/6575) | `systemd` service error after `ironclaw onboard` (Ubuntu) – *Closed* | Fixed in release? |

Additionally, daily failure taxonomy **#6707** reveals systematic ClawBench defects.

## Feature Requests & Roadmap Signals
Requests filed today reflect **UX polish and infrastructure expansion**:

- **#6743** – Add in-app feedback / bug report widget to WebUI.  
- **#6742** – Add user profile details view in WebUI (name, email, account).  
- **#6734** – Give IronClaw agent access to its own documentation for accurate tool/channel configuration.  
- **#6731** – Integrate IronHub (marketplace for tools/skills).  
- **#6727** – Support connecting custom MCP servers (currently only two bundled).  
- **#6725** – Design migration path from legacy to v1.

These align with the larger epics: **#6481** (Unified Manifest-Driven Extension Platform), **#6482** (Pluggable Memory Providers), **#6483** (Telegram Hardening), and **#6484** (Shared Messaging Capability Layer). **Next version likely** will include custom MCP server support, user profile view, and feedback widget, given they are simple UX additions.

## User Feedback Summary
Users express frustration around **setup and configuration guidance**:
- Telegram pairing: the agent gives incorrect or misleading instructions even after success. *[#6717, #6716]*
- Missing documentation for Telegram setup in the WebUI. *[#6522]*
- Lack of user profile page leaves users unsure which account is active. *[#6742]*
- No in-app feedback channel forces users to external platforms. *[#6743]*

On the positive side, the community is actively participating in bug bashing, suggesting strong engagement.

## Backlog Watch
Items that may need maintainer attention:

- **PR #5598** – `chore: release` – Open since July 3, 2026. This release automation PR could be blocking crate version bumps.  
  [PR #5598](https://github.com/nearai/ironclaw/pull/5598)
- **PR #6428** – `build(deps): bump tokio-ecosystem` – Open since July 21, pending merge.  
- **PR #6361** – `build(deps): bump serialization group` – Open since July 20.  
- **PR #6685** – `build(deps): bump wasm group` – Open since July 26.

These dependency bumps are low-risk and should be merged soon to avoid drift.

Also, **Issue #4548** (closed) – duplicate `model` field with DeepSeek – was a critical bug that appears to have been fixed, but its closure should be verified.

---

*Data as of 2026-07-28 23:59 UTC. All links point to `github.com/nearai/ironclaw`.*

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI Project Digest — 2026-07-28

## 1. Today’s Overview
LobsterAI saw moderate activity on 2026-07-28, with **9 issues updated** (all open, none closed) and **9 pull requests updated** (6 merged/closed, 3 still open). No new releases were published. The community reported several significant bugs, including a **critical data corruption issue** in the accelerator, an **installation failure**, and **exec tool shell wrapper problems** on Windows. On the development side, the team merged fixes for tool‑loop termination and email attachment path traversal, along with a new feature for artifact share/deploy. The backlog contains a few long‑stale items that may require maintainer attention. Overall, the project is actively maintained but faces stability challenges that could erode user trust if not addressed quickly.

## 2. Releases
*None in the last 24 hours.*

## 3. Project Progress (Merged/Closed PRs Today)
Six pull requests were merged or closed, reflecting both bug fixes and feature work:

- **[#2394 – [area: docs, platform: windows] Fix/windows install manual overwrite blocked](https://github.com/netease-youdao/LobsterAI/pull/2394)** – Resolved a Windows installation issue where the update process could be blocked due to insufficient permissions during backup.
- **[#2389 – fix(email): prevent attachment path traversal](https://github.com/netease-youdao/LobsterAI/pull/2389)** – Sanitised attachment filenames to prevent directory traversal; includes cross‑platform security tests.
- **[#2388 – feat(artifacts): 新增预览工具栏分享与部署入口](https://github.com/netease-youdao/LobsterAI/pull/2388)** – Added share and deploy buttons in the artifact preview toolbar, with unit tests for deployment target detection.
- **[#2386 – fix(agentEngine): terminate no-progress tool loops before token budget exhaustion](https://github.com/netease-youdao/LobsterAI/pull/2386)** – Prevents runaway tool calls that waste tokens when the agent makes no progress.
- **[#2387 – Feat/2026.7.20 sites](https://github.com/netease-youdao/LobsterAI/pull/2387)** – A feature PR (merged) that likely adds site‑related functionality (details sparse in description).
- **[#1323 – fix(cowork): narrow input-too-long error classification](https://github.com/netease-youdao/LobsterAI/pull/1323)** – Correctly distinguishes “input too long” errors from unrelated `max_tokens` parameter issues.

## 4. Community Hot Topics
While no issue or PR attracted a high number of comments, several items stand out due to their severity or longevity:

- **[#2395 – 无法安装](https://github.com/netease-youdao/LobsterAI/issues/2395)** – Installation fails with “user skills could not be backed up.” Created today, it already has a fix PR ([#2394](#)) merged, so this should be resolved in the next build.
- **[#2393 – LobsterAI 加速器在字符串改写时把 `\f` 字节对替换为 `\x0C` (form feed)，导致文件数据静默损坏](https://github.com/netease-youdao/LobsterAI/issues/2393)** – A **critical data‑corruption bug** reported yesterday; no fix PR exists yet. The accelerator replaces literal `\f` with the form‑feed character, silently corrupting any file containing such escape sequences (e.g., `\foo`).
- **[#1237 – Settings 关闭无确认，API Key 等配置静默丢失](https://github.com/netease-youdao/LobsterAI/issues/1237)** – An old issue (April) about settings being silently discarded when the user clicks away without saving. A corresponding PR ([#1241](https://github.com/netease-youdao/LobsterAI/pull/1241)) has been open for months but not merged.
- **[#1240 – 现有大模型受限后无法切换到其他大模型](https://github.com/netease-youdao/LobsterAI/issues/1240)** – A stale issue describing how API rate‑limiting on one model blocks all other agents, causing total application paralysis.

The underlying need is clear: users want **robust error handling and graceful degradation** when APIs become unavailable, and they want **data integrity guarantees** when the accelerator manipulates strings.

## 5. Bugs & Stability (Ranked by Severity)

### 🔴 Critical
- **[#2393 – Accelerator corrupts data by replacing literal `\f` with form‑feed character](https://github.com/netease-youdao/LobsterAI/issues/2393)**  
  *Impact:* Any file written via the `write` tool that contains `\firecrawl`, `\foo`, etc. will be silently damaged. 100% reproducible. No fix PR yet.

### 🟠 High
- **[#2395 – Installation fails (user skills backup error)](https://github.com/netease-youdao/LobsterAI/issues/2395)**  
  *Impact:* Prevents users from updating the software. Fixed by PR [#2394](#) (merged today).

- **[#2396 – exec tool defaults to PowerShell 5.1, causing Linux commands / special‑character scripts to fail silently](https://github.com/netease-youdao/LobsterAI/issues/2396)**  
  *Impact:* Commands like `grep`, `node -e`, `pwsh -Command` break on Windows 11. No fix PR yet.

- **[#2390 – exec tool hard‑codes `powershell.exe` and breaks with Chinese‑character usernames](https://github.com/netease-youdao/LobsterAI/issues/2390)**  
  *Impact:* Users with non‑ASCII usernames cannot execute shell commands. Related to #2396.

### 🟡 Medium
- **[#1240 – API rate‑limiting on one model blocks all agents](https://github.com/netease-youdao/LobsterAI/issues/1240)**  
  *Impact:* Application enters an unrecoverable “restricted” state until the limit expires. No fix yet.

- **[#2062 – Task exceeds maximum allowed duration (24‑hour runs fail)](https://github.com/netease-youdao/LobsterAI/issues/2062)**  
  *Impact:* Long‑running tasks are auto‑stopped with a “timed out” error, confusing users about whether the task continues in background.

## 6. Feature Requests & Roadmap Signals

### User‑Requested Features
- **[#2392 – 定时任务没办法选择使用哪个agent，也没法选择使用的skill](https://github.com/netease-youdao/LobsterAI/issues/2392)**  
  *Request:* Allow scheduled tasks to pick a specific agent and skill. Essential for automation workflows.
- **[#2391 – 技能可以重命名](https://github.com/netease-youdao/LobsterAI/issues/2391)**  
  *Request:* Simple but common need – let users rename skills.
- **[#1239 – AI 任务完成时闪烁任务栏/Dock 图标提醒用户](https://github.com/netease-youdao/LobsterAI/pull/1239)**  
  *Feature (open PR):* Flash taskbar icon on task completion/error. Stale since April, but still valuable for user experience.
- **[#1241 – Settings 关闭无确认，API Key 等配置静默丢失](https://github.com/netease-youdao/LobsterAI/pull/1241)**  
  *Feature (open PR):* Add “unsaved changes” confirmation dialog. Blocks issue #1237.

### Roadmap Signals
The merged PRs today – especially **[#2388 (artifact share/deploy)](https://github.com/netease-youdao/LobsterAI/pull/2388)** and **[#2387 (sites)](https://github.com/netease-youdao/LobsterAI/pull/2387)** – indicate that the team is investing in **artifact sharing and deployment capabilities**, likely aiming to make LobsterAI a platform for building and distributing AI‑powered tools. The `sites` feature may bring web‑hosted artifacts.

*Prediction:* The next minor release (2026.7.x) will likely include:
- Installation fix (already merged)
- Email attachment security (merged)
- Artifact toolbar share/deploy (merged)
- Possibly the settings confirmation dialog (PR #1241) and skill rename (if prioritized).

## 7. User Feedback Summary
Real user pain points surfaced in today’s issues:

- **Installation reliability** – A user could not update because of a backup failure; the error message was not actionable.
- **Data integrity** – A user discovered that simple string patterns like `\foo` corrupt their `MEMORY.md` files. This is a trust‑breaking issue for anyone using LobsterAI to manage documents.
- **Shell compatibility** – Windows users with PowerShell 7 or special characters (Chinese usernames) face silent failures when using the `exec` tool.
- **API limitation propagation** – One user reported that a single model’s rate limit can freeze the entire application, making it impossible to switch to another working API.
- **Long‑running tasks** – Users attempt 24‑hour automation but get abrupt “timed out” errors without clarity on whether the task continues.

Overall sentiment appears **frustrated but engaged** – the community is providing detailed bug reports with logs and reproduction steps, indicating a high level of investment in the product. The accelerator corruption bug, if not fixed quickly, could cause significant user churn.

## 8. Backlog Watch
Several issues and PRs remain unanswered for months and may need maintainer attention:

- **[#1237 – Settings silent discard (stale since April)](https://github.com/netease-youdao/LobsterAI/issues/1237)** – No activity beyond a comment in July. A fix PR exists but is not merged.
- **[#1240 – Model limitation propagation (stale since April)](https://github.com/netease-youdao/LobsterAI/issues/1240)** – Critical usability bug with no triage or fix.
- **[#2062 – Task timeout (stale since May)](https://github.com/netease-youdao/LobsterAI/issues/2062)** – User seeking clarification; no maintainer response.
- **[#1277 – Dependabot electron update (open since April)](https://github.com/netease-youdao/LobsterAI/pull/1277)** – Automated dependency bump that has not been merged for nearly 4 months; may introduce security or compatibility issues.
- **[#1239 – Flash taskbar notification (open PR since April)](https://github.com/netease-youdao/LobsterAI/pull/1239)** – Feature PR with no review activity.

The staleness of these items suggests either a maintenance bottleneck or a shift in development priorities. Addressing the settings dialog and model‑propagation issues would directly improve user experience and reduce frustration.

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis Project Digest – 2026-07-28

## Today's Overview

Project activity was moderate, with **5 pull requests updated** in the last 24 hours but **no new releases** and **no issues updated** (0 open/active). All PRs remain open; none were merged or closed today, indicating that the team is actively working on multiple feature branches and fixes without a merge burst. The most recent update was on PR #1158 (zvec memory backend), which was touched today. Overall, the project is in a steady development phase, with ongoing investments in new backends, protocol exposure, security hardening, and observability.

## Releases

No new releases were published today. The last known release remains unchanged. Users relying on the latest stable builds should check the repository for any pre-release tags or binary distribution channels.

## Project Progress

No pull requests were merged or closed today. All five open PRs represent work in progress:

- **#1158** – *feat(memory): add zvec vector database memory backend* – Experiment with a new memory backend using Zvec + redb, feature-gated behind `zvec` (enabled by default in `full`).  
- **#1169** – *feat(acp): expose Moltis as an ACP agent over stdio* – Adds `crates/acp` to let other ACP harnesses use Moltis as their agent (previously Moltis was only an ACP client).  
- **#1170** – *fix(channels): gate /sh and privileged tools behind a per-account operators list* – Security fix to restrict potentially dangerous `/sh` commands to authorized operators only.  
- **#1173** – *feat(pwa): make push notifications reliable and non-disruptive* – Fixes silent replacement of notifications by enabling `renotify`, plus other reliability improvements.  
- **#1174** – *Add instrumentation and feedback collection infrastructure* – Introduces an `ObservationSink` fanout system with pluggable backends and end-user feedback collection.

## Community Hot Topics

No issues or PRs had recorded comment counts or reactions. However, two PRs stand out as likely to generate discussion:

- **#1169** (ACP agent exposure) – Opens the possibility for Moltis to be used inside other agent harnesses (Zed, buzz-acp, etc.). This is a significant architectural shift and may attract interest from integrators.  
- **#1170** (operator authorisation for `/sh`) – Addresses a clear security concern on public Discord guilds. Users and maintainers of multi-user deployments will find this critical.

Both PRs lack comments, suggesting either initial draft state or low community engagement so far. External contributors or users are encouraged to review and provide feedback.

## Bugs & Stability

The project shows two bug-fix PRs:

- **#1170** – **Severity: High** – `/sh` command was accessible to any channel member, enabling arbitrary host command execution on shared instances. This is a significant security vulnerability, addressed by adding a per-account operators list.  
- **#1173** – **Severity: Medium** – PWA push notifications silently replaced earlier messages (no sound/alert) due to missing `renotify` flag. Also improvements for session-based tagging and non-disruptive updates.

No new bug reports (issues) were filed today. The existing PRs already contain the fixes; merging them will resolve these stability and security issues.

## Feature Requests & Roadmap Signals

The current PR set reveals several forward-looking features:

- **New memory backend (Zvec/redb)** – #1158. Indicates interest in alternative vector stores beyond the default, possibly for performance or embedding model compatibility. Likely to be included in the next release once tested.  
- **ACP agent exposure** – #1169. A natural extension from being an ACP client to being a full agent. This aligns with the growing ecosystem of ACP-compatible tools and could become a core capability.  
- **Instrumentation & feedback** – #1174. Suggests a move toward observability and user feedback loops, essential for production deployments. May be paired with analytics dashboards in later versions.

No direct user-requested features were logged, but these PRs likely stem from internal needs or community discussions. The instrumentation and feedback infrastructure ( #1174 ) is particularly notable for enabling data-driven improvements.

## User Feedback Summary

No explicit user feedback (comments, reviews, or issues) was recorded today. Indirect signals from PR descriptions:

- **Pain points addressed**:  
  - Security: `/sh` without operator gating in group chats ( #1170 ).  
  - UX: PWA notification failures ( #1173 ).  
- **Use cases**:  
  - Running Moltis with custom embedding models and local `llama-cpp-server` ( #1158 ).  
  - Using Moltis as an agent inside any ACP-compatible harness ( #1169 ).  
- **Satisfaction**: Not measurable. The absence of new issues suggests no urgent user complaints were filed in the last 24 hours.

## Backlog Watch

No long-standing open issues or PRs were identified. All five open PRs are recent (created July 17–27) and are being actively updated. The only PR that is older is #1158 (July 17), but it received an update today, indicating it is still in progress. Maintainers appear responsive, and no item requires urgent attention from the community.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw / QwenPaw Project Digest – 2026-07-28

## 1. Today's Overview

The QwenPaw project (formerly CoPaw) shows **very high activity** over the last 24 hours, with **50 issues and 50 pull requests updated**, reflecting a steady maintenance and development cadence. **31 issues were closed** (mostly bug reports and questions) and **13 PRs were merged/closed**, indicating responsive triage and iterative improvements. No new releases were published today. The majority of open PRs are under review or tagged as “ready-for-human-review”, suggesting a large batch of features is nearing completion. The community continues to contribute detailed bug reports and feature requests, with several long-standing integration and performance issues being addressed.

## 2. Releases

No new releases today.

## 3. Project Progress

Merged/closed PRs in the last 24 hours (13 total) include several important fixes and documentation improvements:

- **#6491** – `fix(desktop): bundle PawApp SDK modules` – Resolves a runtime import error (`No module named 'qwenpaw.pawapp'`) when installing plugins from the App Center on the Desktop app. This fix directly addresses bug #6473 (now closed).
- **#6462** – `docs(sandbox): clarify native Windows sandbox support` – Updates documentation to reflect that QwenPaw now supports native Windows sandbox backends (AppContainer, restricted-token) without requiring WSL2.

Additionally, opened PRs that advanced further in review include:
- **#6516** – `perf(console): reduce initial load and collapsed tool card cost` – Switches page modules to lazy factory pattern to improve loading performance.
- **#6504** – `feat: unify project directories and file workspace` – Treats project directories as shared agent context, improving tool integration.
- **#6511** – `fix(crons): migrate existing final-mode jobs to stream on upgrade` – Prevents silent message loss for cron jobs after a dispatch mode change.

**Key feature advances**: #6397 (third-party agent architecture integrating Codex, Qoder, Skills, MCP) and #6276 (unified browser SDK for any backend) remain open under review, signaling near-term integration.

## 4. Community Hot Topics

The most active issues (by comment count) reveal three clusters of user concerns:

1. **Feishu/Lark integration problems** – Issue #5757 (14 comments, closed): replies stop after the first message; workaround involves restarting the bot. Underlying cause appears to be session state management in the Feishu channel.
2. **Streaming performance on browser** – Issue #5725 (6 comments, closed): console UI lags heavily during streaming output. Users compare unfavorably with DeepSeek’s web experience.
3. **Infinite image compression loop** – Issue #4895 (5 comments, closed): repeated re-compression of uploaded images causing hallucination loops. This has been fixed in a prior version.

Other high-interest items:
- **#5090** (5 comments, closed): safety tool bypass – agent circumvented `rm` block via Python script.
- **#5259** (5 comments, closed): Windows vector index persistence failure.
- **#5561** (5 comments, closed): long Feishu messages not delivered, forced to send as files.

These issues indicate that **channel-level reliability and UI performance** remain the top community pain points, though all were closed with either fixes or workarounds.

## 5. Bugs & Stability

**Critical/Ongoing open bugs** (updated in the last 24h):

- **#6460** – `QwenPaw 2.0.1 首页/会话在 Edge+Wayland 下单标签高 CPU 占用` – High CPU usage on a single tab when viewing large session results. Likely caused by WebSocket push or rendering of large result sets. No fix PR yet.
- **#6324** – `[bug]: 大模型的响应被截断` – Model response truncation (reported with MiniMax-M3). Unclear if client-side or server-side truncation.
- **#6258** – `[bug]: openai 模型最大输出token不生效` – The `max_tokens` setting is ignored for OpenAI-compatible models. Impact: users cannot control output length.
- **#6457** – `[bug]: 任务模式运行历史记录过多` – Task mode generates excessive conversation history entries, cluttering the UI.
- **#6324**, #6457, #6460 have only 3 comments each, suggesting they are not yet widely reproduced.

**Closed bugs today**:
- **#6473** (Plugin "Agent Kanban" fails to install on Desktop 2.0.1) – Fixed by PR #6491.
- **#6239** (Windows PATH concatenation drops semicolon) – Fixed by a previous PR, now confirmed closed.
- **#6467** (Server node fails to deploy) – Closed as user misunderstanding.

**Severity ranking**:
1. #6460 (CPU) – performance/reliability for Linux users under Wayland.
2. #6258 (max tokens ignored) – functional regression for OpenAI users.
3. #6324 (truncation) – core functionality issue.

## 6. Feature Requests & Roadmap Signals

Several feature requests from the community, alongside in-progress PRs, indicate the project’s near-term direction:

**From Issues (user-requested)**:
- **#5427** – Kimi K2 Code (Anthropic-compatible endpoint) support – Not yet implemented.
- **#5593** – DingTalk image messages should use `media_id` for preview (currently downgraded to files).
- **#5609** – Custom model protocol support for non-standard endpoints (e.g., `/v1/images/generations`).
- **#5603** – DingTalk streaming output is too slow (character-by-character) – multiple users frustrated.

**From PRs (project-driven)**:
- **#6515** – Adds **Volcengine Agent Plan** and **Xiaomi MiMo** as built-in providers – likely to land in next minor release.
- **#6397** – Third-party agent architecture (Codex, Qoder, Skills, MCP) – large new capability.
- **#6276** – Unified browser SDK – one abstraction for Playwright, Puppeteer, etc.
- **#6424** – Native desktop GUI automation (computer use) for Windows/macOS.
- **#6284** – QwenPaw Creator app for script→video workflow.
- **#6337** – Expose AGUI protocol via SSE endpoint.

**Prediction**: The next version (v2.1?) will likely include **Volcengine/MiMo providers**, the **unified browser engine**, and **third-party agent integration** as flagship features. Community-requested DingTalk improvements and custom protocol support may appear in subsequent patches.

## 7. User Feedback Summary

**Common pain points**:
- **Messaging channel integration**: Feishu, DingTalk, and WeChat issues dominate recent bug reports. Users report dropped replies, incomplete messages, and slow streaming.
- **Performance**: Console UI lag during streaming, high memory usage, and CPU spikes on Linux/Wayland.
- **Memory/compression**: Context compression loses critical messages (e.g., channel identification), and vector index persistence fails on Windows.
- **Model compatibility**: OpenAI `max_tokens` not honored, custom providers fail after upgrade, and Ollama cloud models unreachable.

**Satisfaction indicators**:
- Many issues are **closed within days** (e.g., #6473 closed in 2 days, #6239 in 9 days), showing responsive triage.
- The project actively releases patches (v1.1.x, v2.0.x) indicating rapid iteration.
- Users appreciate the depth of debugging (e.g., #4895 detailed reproduction, #4968 memory leak investigation).

**Overall sentiment**: The community is engaged and technical, providing high-quality reports. While there are stability rough edges, especially around third-party channels and browser UI, the maintainers demonstrate strong commitment to fixing them.

## 8. Backlog Watch

Issues and PRs that may need maintainer attention:

- **#5514** – `fix chat input queue session id migration` (open since June 25, 2026). This PR targets input queue isolation but has not been merged or reviewed in a month. High risk of merge conflicts.
- **#6068** – `fix(scroll): preserve session IDs during history migration` (open since July 13). Awaiting review; critical for Scroll history migration.
- **#6324** (response truncation, open since July 22) – Low comment count but unresolved – may need reproduction from maintainers.
- **#6460** (high CPU, open since July 25) – New bug, no fix PR yet – should be prioritized due to performance impact.
- **#6258** (max tokens ignored, open since July 19) – Straightforward regression; needs debug or confirmation.

No issues older than one month were updated in the last 24h, suggesting the team is keeping up with aging tickets. The main backlog risk is **#5514** and **#6068**, which have been idle for weeks.

---

*Digest generated from GitHub data for [agentscope-ai/QwenPaw](https://github.com/agentscope-ai/QwenPaw) on 2026-07-28.*

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

# EasyClaw Project Digest – 2026-07-28

## 1. Today's Overview
The EasyClaw (TK Copilot) project shows a calm day with **zero new or updated issues** and **zero pull request activity** in the last 24 hours. Two new releases (v1.8.81 and v1.8.82) were published, indicating that development has recently shipped significant features. The absence of open/active issues or PRs suggests the maintainers may be in a testing or stabilization phase following these releases. Overall project health appears stable, with no immediate community friction or bug reports.

## 2. Releases
Two versions were released today, both focusing on TikTok Shop affiliate and customer service tooling.

### v1.8.82 – TK Copilot v1.8.82
- **What’s New**  
  - Show relevant order context directly in customer service conversations.  
  - Add live shop analytics and refine affiliate campaign operations.  
  - Improve chat media rendering and intentional silent agent completion handling.  

- **Breaking Changes**: None indicated.  
- **Migration Notes**: No special migration steps mentioned; update from v1.8.81 should be seamless.

### v1.8.81 – TK Copilot v1.8.81
- **What’s New**  
  - Redesign affiliate campaign planning, search, and campaign operations.  
  - Improve creator management and preserve campaign attribution through desktop registration.  
  - Add structured one-shot agent utilities and improve customer service no-reply recovery.  

- **Breaking Changes**: None indicated.  
- **Migration Notes**: No migration notes provided; likely backward-compatible.

## 3. Project Progress
No pull requests were merged or closed in the last 24 hours. The latest progress is captured entirely in the two new releases (see section 2). Features advanced in those releases include customer service context enhancement, affiliate campaign redesign, and live analytics.

## 4. Community Hot Topics
No issues or pull requests were updated in the last 24 hours. Consequently, there are no active discussions with high comment or reaction counts to report. The community appears to be silent, possibly awaiting user feedback after the new releases.

## 5. Bugs & Stability
No bugs, crashes, or regressions were reported in the last 24 hours. The project appears stable with no new defect tickets.

## 6. Feature Requests & Roadmap Signals
No feature requests were filed or discussed in the last 24 hours. Based on the pattern of recent releases (affiliate campaign tools, customer service improvements), the next version may continue to refine creator management or add deeper analytics integration. However, no concrete signals are available today.

## 7. User Feedback Summary
No user feedback (comments, reviews, or reactions) was recorded in the last 24 hours. The lack of issues suggests either high satisfaction with the latest releases or a low volume of active users voicing concerns. The releases themselves address common pain points (order context in CS, campaign planning), which likely targets positive user sentiment.

## 8. Backlog Watch
There are no long-unanswered issues or PRs requiring maintainer attention at this time. The project’s issue tracker is clean.

---

**Data Source**: [github.com/gaoyangz77/easyclaw](https://github.com/gaoyangz77/easyclaw)  
**Analysis Period**: 2026-07-27 00:00 UTC – 2026-07-28 00:00 UTC

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar).*