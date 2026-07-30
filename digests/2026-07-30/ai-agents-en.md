# OpenClaw Ecosystem Digest 2026-07-30

> Issues: 500 | PRs: 500 | Projects covered: 13 | Generated: 2026-07-30 02:41 UTC

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

# OpenClaw Project Digest — 2026-07-30

## Today’s Overview

OpenClaw saw extremely high activity with **500 issues** and **500 pull requests** updated in the last 24 hours, indicating intense community and development engagement. Of these, **450 issues remain open/active** and **50 were closed**; on the PR side, **404 are open** and **96 were merged or closed**. There were **no new releases** today. The overall project health is mixed: while many regressions and stability issues are being actively worked on via linked PRs, several **P1 and P0 bugs** continue to impact core functionality such as message delivery, session state, and gateway reliability. The “clawsweeper” bot labels frequently appear on high-severity items still awaiting maintainer or product decisions, suggesting a backlog of critical triage decisions.

## Releases

No new releases were published today.

## Project Progress

Today saw **96 PRs merged or closed**, addressing a diverse set of areas:

- **Stability fixes**: `apply-patch` now preserves original bytes on tolerant match (#116169); timeout race in gateway resolved (#116186); Telegram model picker no longer silently drops long model IDs (#98694); Beam mirror upload no longer leaks HTTP response bodies (#116185); Feishu abort signal added to prevent orphan agents on timeout (#115774); xAI credit-exhaustion 403s correctly classified as billing instead of auth (#115881, #115871).
- **Memory & context**: Memory compaction no longer deletes user notes under promotion-style headings (#116180); stale QMD file hints retained after docid misses (#113515); memory multi-slot architecture PR (#88504) remains open but signals architectural progress.
- **Channel improvements**: WhatsApp inbound message drops fixed when backlog exceeds 450 (#116179); Signal daemon port alignment with httpUrl (#116181); tool lines now shown under progress status headline across Discord, Matrix, Slack, Telegram (#116143); preview streaming kept quiet and non-blocking (#97671).
- **Other**: ACP bindings no longer lose first turn (#97649); duplicate subagent resumes after gateway restart prevented (#115947); gateway heap growth mitigation continues through followup queue persistence PR (#82572, still open).

## Community Hot Topics

The following issues and PRs generated the most discussion and reactions this week:

- **#115326** (18 comments) – **Crash-loop breaker suppresses Discord/WhatsApp permanently** – A regression where the crash-loop breaker stays active even after documented recovery, leaving critical channels unusable. The community is frustrated by the lack of a self-healing path.
- **#91009** (18 comments, 2 👍) – **Codex PreToolUse native hook relay spawns CPU-bound processes** – Multiple short-lived `openclaw-hooks` processes consume 100% CPU, stalling the gateway. This long-standing issue (since June 6) has a linked open PR but no maintainer resolution.
- **#86996** (15 comments, 2 👍) – **Active Memory + Codex app-server path causes long latency** – The combination of Active Memory, Honcho, and lossless-claw leads to severe performance degradation even on simple Telegram DMs.
- **#39476** (13 comments) – **A2A sessions_send causes duplicate messages** – A core agent-to-agent protocol bug where target agent’s response doubles the original message in the requester channel. Stale but still open with a linked PR.
- **#90354** (11 comments, 1 👍) – **Feature request: bounded/validated append semantics for pre-compaction memory flush** – Users want guardrails to prevent oversized or noisy appends from corrupting memory.
- **#91363** (10 comments, 6 👍) – **Isolated cron consistently fails with “LLM request failed”** – High-reaction issue showing isolated cron jobs never reach the provider, blocking any scheduled tasks.
- **#88657** (10 comments, 1 👍) – **DeepSeek V4 Flash incomplete turn** – Regression in 2026.5.27/28 where model produces zero payloads despite tools being called.
- **#86215** (10 comments, 1 👍) – **Codex OAuth refresh failures wedge agent for hours** – Lack of aggressive profile rotation or clear alerting when OAuth fails.

**Underlying needs**: The community is demanding **reliable message delivery** (Discord, WhatsApp, Telegram), **stable cron/scheduled jobs**, **better error handling and alerting for auth failures**, and **performance stability** under load (memory, codex hook spawning, gateway CPU usage). There is a clear desire for **self-healing mechanisms** and **operator-visible diagnostics**.

## Bugs & Stability

Key bugs reported or updated today, ranked by severity:

- **P0 – Upgrade corruption**: #95515 (closed) – Upgrade from 2026.6.8→2026.6.9 corrupts email channel config with spurious `groupAllowFrom` field, causing crash loop. Fixed via linked PR.
- **P1 – Crash-loop breaker permanent (Discord/WhatsApp)**: #115326 – No fix PR yet, needs maintainer review. Blocks two major channels.
- **P1 – Codex PreToolUse CPU spikes**: #91009 – Open since June 6, linked PR open; may require product decision.
- **P1 – Active Memory + Codex latency**: #86996 – Same pattern, linked PR open, recovery stuck.
- **P1 – Isolated cron fails**: #91363 – “LLM request failed” with no provider usage; linked PR seems needed.
- **P1 – Codex OAuth refresh wedge**: #86215 – Hours-long wedge without alerting; linked PR unclear.
- **P1 – Subagent wake compacts parent at low context**: #86684 (regression) – Parent session compacted despite ample context; maintainer review needed.
- **P1 – SQLite transcript cleanup blocks event loop**: #112423 – Synchronous I/O on gateway thread; no fix PR yet.
- **P1 – Memory_search metadata missing (intermittent)**: #90361 – Search/reindex race with local hotfix; linked PR open.
- **P1 – Gateway heap grows unbounded, OOM killed**: #89315 – Long-running deployments on systemd affected; no linked fix PR.
- **P1 – Telegram lane guarded after timeout**: #91456 – Direct message delay; linked PR open.
- **P1 – MCP loopback not reconnecting after gateway restart**: #98435 – `recovered=1` but CLI loses transport; fix PR open.
- **P2 – Windows CLI Scheduled Task not staying running**: #91144 – Foreground works, scheduled task fails; linked PR open.
- **P2 – Active memory injection crashes prompt cache hit rate (99.9%→22%)**: #91223 – No fix PR yet.
- **P2 – Zombie process accumulation**: #97616 – Hook/tool child processes unreaped; maintainer review needed.
- **P2 – Thinking tags leak on heartbeat interrupt**: #90692 – Post-delivery corruption; linked PR open.
- **P2 – Session transcript projection livelock under sustained writes**: #115908 – Blocks main thread for tens of seconds; needs maintainer review.
- **P2 – Detached native Codex subagents lose hooks when parent releases**: #111010 – Linked PR? None yet.

**Observations**: Many P1/P2 bugs are **regressions** (identified by label) and several have been open for weeks or months. The project has a healthy number of fix PRs in flight, but some critical items (crash-loop breaker, heap OOM, isolated cron) lack clear resolution paths or are awaiting product decisions.

## Feature Requests & Roadmap Signals

Notable feature requests with community support:

- **Bounded/validated memory flush** (#90354, 11 comments, 1 👍) – Likely to be picked up in next minor release given its impact on data integrity.
- **Gateway lifecycle hooks** (#43454, 8 comments, 1 👍) – onSubagentComplete, onToolCallThreshold, onTurnComplete – This would enable community plugins for sophisticated workflow control.
- **Pre-routing inbound message hook** (#81061, 8 comments, 3 👍) – Important for channel bridging/proxying; community strongly supports.
- **Slack Modal Support** (#88154, 7 comments, 1 👍) – Would unlock interactive workflows; high demand from Slack-heavy deployments.
- **Per-model usage logging for cost tracking** (#13219, 7 comments, 1 👍) – Essential for production cost management; likely to be prioritized.
- **Suppress sub-agent announce** (#8299, 7 comments, 1 👍) – Config option to prevent unwanted sub-agent summaries.
- **Capture image-generation usage metadata** (#85461, 6 comments, 1 👍) – for cost transparency.

**Predictions for next release**: The “bounded memory flush” and “gateway lifecycle hooks” are architecturally aligned with ongoing memory improvements (see #88504 multi-slot memory PR). Cost tracking (#13219) may land as part of diagnostics exporters work (see #116000). Slack modal support is lower probability due to complexity but has strong support.

## User Feedback Summary

- **Pain Points:** 
  - **Reliability of core channels** (Discord, WhatsApp, Telegram, Feishu) is a recurring theme – crash-loop breakers, dropouts, guarded lanes, and OAuth failures leave users without service.
  - **Performance degradation** under Active Memory, Codex integration, or high load (gateway heap OOM, CPU spike from hook processes, event loop stalling).
  - **Cron/scheduled tasks** are broken for many (isolated cron fails, heartbeat failure, alert fatigue from false positives).
  - **Upgrades** can corrupt config (P0 email channel) or leave stale systemd services that fight each other (#79375).
  - **Windows/Linux platform gaps** – Windows Scheduled Task doesn’t stay running (#91144), Linux systemd OOM kills (#89315).
- **Satisfaction:** 
  - Users appreciate the rapid fire of fix PRs (96 merged today).
  - Community participation is high, with detailed bug reports and reproduction steps.
  - Some long-standing issues (A2A duplicates #39476, memory poisoning #69943) have been closed or have fix PRs, showing progress.

## Backlog Watch

Issues and PRs that have been open for a long time without resolution, needing maintainer attention:

- **#39476** – A2A sessions_send duplicate messages (open since March 8, 2026, 13 comments, linked PR open but no maintainer review). Stale and potentially a protocol design flaw.
- **#8299** – Suppress sub-agent announce (open since Feb 3, 2026, 7 comments, linked PR open but no product decision). Simple config request that would reduce friction.
- **#9607** – Himalaya skill: missing email formatting philosophy (open since Feb 5, 2026, 5 comments, linked PR open). Documentation improvement stuck.
- **#43454** – Gateway lifecycle hooks (open since March 11, 2026, 8 comments, linked PR open but no maintainer review). Important architectural feature.
- **#81061** – Hook: before_route_inbound_message (open since May 12, 2026, 8 comments, 3 👍). Strong community support, linked PR open.
- **#88504** – Multi-slot memory role architecture (open since May 31, 2026, large PR, still needs proof). Critical for memory system evolution.
- **#82572** – Persist followup queues across gateway restarts (open since May 16, 2026, large PR, still needs proof). Addresses data loss on restart.

**Maintainer attention needed**: The `clawsweeper:needs-maintainer-review` label appears on many P1 bugs and feature PRs, indicating a triage bottleneck. The backlog of over 50 items with this label suggests the project would benefit from additional maintainer capacity or prioritization sweeps.

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report: Personal AI Agent Open-Source Ecosystem

## 1. Ecosystem Overview

The personal AI agent open-source ecosystem is experiencing intense fragmentation and maturation, with projects collectively processing over 700 issues and 700 pull requests daily across a dozen-plus repositories. The space is splitting into two distinct camps: "Claw" lineage projects (OpenClaw and its Rust reimplementations ZeroClaw, NanoClaw, NullClaw) that focus on universal agent infrastructure and multi-channel delivery, and independent innovators (Moltis, CoPaw) exploring specialized interaction patterns like ACP protocols and PWA notifications. A core tension is emerging between architectural purity (Rust rewrites, separation of concerns) and practical stability, with several projects struggling to balance rapid feature addition with regression management. The ecosystem remains highly active but shows signs of maintainer bandwidth bottlenecks, particularly around triage decisions and long-standing RFCs.

## 2. Activity Comparison

| Project | Issues Updated (24h) | PRs Updated (24h) | Release Status | Health Score | Key Signal |
|---------|---------------------|-------------------|----------------|--------------|------------|
| **OpenClaw** | 500 (450 open) | 500 (404 open) | No release | ⚠️ 5/10 | High velocity but critical P0/P1 bugs unchecked |
| **IronClaw** | 50 (21 open) | 50 (39 open) | No release (rc.1) | ✅ 7/10 | Strong closure rate, systematic QA |
| **CoPaw** | 29 (24 open) | 49 (38 open) | No release | ⚠️ 5/10 | Multiple regressions, CI blocking forks |
| **ZeroClaw** | 50 | 50 | No release | ✅ 7/10 | Active RFC decisions, clean issue closure |
| **NanoBot** | 5 | 27 | No release | ✅ 8/10 | High merge rate, strict type enforcement |
| **LobsterAI** | 0 | 16 (13 merged) | No release | ✅ 8/10 | Stable, proactive UX fixes |
| **Moltis** | 0 | 5 (2 merged) | No release | ✅ 9/10 | No bugs, all PRs recent |
| **NanoClaw** | 1 | 9 (6 merged) | No release | ⚠️ 6/10 | One high-severity bug open |
| **NullClaw** | 1 | 4 (2 merged) | No release | ⚠️ 5/10 | Critical scheduler bug open 2+ months |
| **PicoClaw** | 1 | 2 (0 merged) | v0.3.1 | 🔴 3/10 | Near-dormant, stale PRs |
| **EasyClaw** | 0 | 0 | **v1.8.83 released** | ✅ 7/10 | Quiet but shipping |
| **ZeptoClaw** | 0 | 0 | N/A | 🔴 2/10 | No activity |
| **TinyClaw** | 0 | 0 | N/A | 🔴 2/10 | No activity |

**Health Score Methodology**: Merged/closed ratio, severity of open bugs, community responsiveness, maintainer review cadence.

## 3. OpenClaw's Position

**Advantages vs. Peers**:
- **Community scale**: 10x the issue/PR volume of any competitor (500 vs. 50 for the next largest). This creates a faster cycle of bug discovery and patch submission.
- **Channel breadth**: Supports 12+ messaging platforms (Discord, WhatsApp, Telegram, Feishu, Signal, Matrix, Slack) vs. most peers covering 3-5. Telegram and WhatsApp fixes appear across every digest.
- **Fix velocity**: 96 PRs merged/closed in 24 hours — roughly 4x the next fastest project (CoPaw at 11, IronClaw at 11). This suggests a large contributor base.

**Technical Approach Differences**:
- **Monolithic vs. modular**: OpenClaw retains a unified expression module (`expression_core`) and memory system (`active memory`) that competitors are splitting into separate concerns (ZeroClaw's RFC #9048 for conversation vs. long-term memory separation).
- **Bot-driven triage**: The `clawsweeper` labeling bot manages issue categorization, but results in a triage backlog (50+ items labeled `needs-maintainer-review`) that smaller projects avoid by having fewer issues.
- **Rust competition**: Three projects (ZeroClaw, NanoClaw, NullClaw) are Rust reimplementations of OpenClaw concepts, citing performance and type safety. This creates a fragmented ecosystem where OpenClaw remains the reference but loses architectural advantage.

**Community Size Comparison**:
| Metric | OpenClaw | IronClaw | CoPaw | ZeroClaw |
|--------|----------|----------|-------|----------|
| Daily active contributors (estimated from PRs) | >50 | ~15 | ~10 | ~10 |
| Open PRs | 404 | 39 | 38 | Not specified |
| Longest-standing P1 bug (days) | 54 (#91009) | 2 (#6786) | 5 (#6460) | 10 weeks (#6724) |

## 4. Shared Technical Focus Areas

Across 8+ projects, these requirements emerge independently:

**1. Memory and Context Management**
- **OpenClaw**: Memory compaction corrupts user notes (#116180), multi-slot memory architecture PR (#88504)
- **CoPaw**: Memory compression evicts early-session events (#6555), reranker support (#6398)
- **NanoBot**: Session consolidation drops media paths (#5118), idle compaction preservation (#5167)
- **NullClaw**: Configurable recall limits (#979)
- **ZeroClaw**: RFC for separating conversation history from long-term memory (#9048)
- **Underlying need**: Current memory systems mix ephemeral and durable state, leading to data loss. Projects are converging on explicit architectural separation.

**2. Channel Reliability (especially Telegram, Discord, Slack)**
- **OpenClaw**: Crash-loop breaker suppresses Discord/WhatsApp (#115326), Telegram lane guarded (#91456)
- **ZeroClaw**: Telegram long-poll offset advancement (#9314), Signal/Voice empty credential crashloop (#6724)
- **NanoClaw**: Telegram rich messages silently dropped (#3151)
- **NanoBot**: Telegram polling stall recovery (#5156)
- **Moltis**: Slack acknowledgment reactions (#1166)
- **Underlying need**: Multi-channel delivery remains the core value proposition but introduces complexity that single-platform agents avoid. Users demand zero-maintenance channel reliability.

**3. A2A / MCP Protocol Interoperability**
- **OpenClaw**: A2A sessions_send duplicates (#39476), MCP loopback reconnect (#98435)
- **ZeroClaw**: A2A outbound client RFC (#9106), MCP stdio timeout fix (#9186)
- **CoPaw**: MCP server reconnect (#6524), ACP new_session missing models (#6529)
- **Moltis**: ACP integration over stdio (#1169)
- **Underlying need**: Agent-to-agent communication standards are stabilizing (ACP, A2A), but implementations vary across projects. Interoperability testing between ecosystems is absent.

**4. Security and Authentication**
- **OpenClaw**: Codex OAuth refresh wedge (#86215), xAI 403 misclassification (#115881)
- **ZeroClaw**: KeySource trait RFC (#9127), empty credential crash (#6724)
- **Moltis**: Per-account operator lists (#1170)
- **IronClaw**: Multi-tenant signing (#6813, #6818, #6822)
- **Underlying need**: Enterprise deployments require credential lifecycle management (rotation, revocation, vault integration) that current projects handle ad-hoc.

**5. Windows and Platform Compatibility**
- **OpenClaw**: Windows Scheduled Task (#91144), systemd OOM on Linux (#89315)
- **ZeroClaw**: Windows compilation fix (#9422), Windows verbatim path (#9497)
- **CoPaw**: NSIS installer infinite loop (#6534), high DPI scaling (#6549)
- **NanoBot**: PowerShell 5.1 encoding bug (#5159)
- **Underlying need**: Desktop and server platform gaps remain a top complaint, especially for hobbyist/edge deployments.

## 5. Differentiation Analysis

| Dimension | OpenClaw | IronClaw | CoPaw | ZeroClaw | Moltis |
|-----------|----------|----------|-------|----------|--------|
| **Primary language** | Python | Rust | Python/TypeScript | Rust | Rust |
| **Target user** | Enthusiasts, multi-channel | Enterprise, signing | Chinese market, Qwen | Developers, CLI | Developers, PWA |
| **Key feature** | 12+ channel support | Reborn architecture | Workspace checkpoints | OpenAI adapter | ACP/stdio agent |
| **Memory model** | Active Memory + Honcho | Not specified | Shadow Git store | Conversation vs. long-term split (RFC) | LiveChatService |
| **Deployment** | Gateway + containers | Railway, systemd | Desktop app | CLI, container | CLI, PWA |
| **Plugin system** | Codex hooks, MCP | Builtin skills | App Center, MCP | Compile-time features | Instrumentation pipeline |
| **Observability** | OTel via diagnostics | Coverage gates | Not prominent | OTel export RFC | Langfuse, OTLP |
| **Windows support** | Partial (CRON broken) | Clippy fix only | Installer issues | Compilation fixed | Not mentioned |
| **Chinese localization** | Feishu only | Not mentioned | Core focus (QQ, Feishu) | Not mentioned | Not mentioned |

**Key Differentiating Insights**:
- **OpenClaw** is the "general purpose" option: broadest but highest regression risk. Serves as the upstream reference but suffers from architectural debt.
- **IronClaw** focuses on **production hardening**: QA gate infrastructure, hermetic testing, coverage enforcement. Its Reborn architecture is a ground-up rewrite, suggesting the original codebase was not enterprise-ready.
- **CoPaw** targets the **Chinese AI agent market** with QQ, Feishu, and Aliyun integration — a region OpenClaw and others serve poorly. Its workspace checkpoints are unique.
- **ZeroClaw** is the most **architecturally ambitious**: RFC-driven design for memory, key management, and A2A. Likely to influence OpenClaw's road map but currently behind in features.
- **Moltis** fills the **simple, secure agent** niche: no bug reports, clean security model, focused on Slack and PWA. Lowest complexity, highest reliability.

## 6. Community Momentum & Maturity

| Tier | Projects | Characteristics |
|------|----------|-----------------|
| **Tier 1: Rapid Iteration** | OpenClaw, IronClaw, CoPaw | 50+ PRs/day, multiple P0/P1 bugs, active regression cycles, maintainer bandwidth bottleneck |
| **Tier 2: Steady Growth** | ZeroClaw, NanoBot, LobsterAI, Moltis | 10-50 PRs/day, few critical bugs, merging features predictably, lower triage pressure |
| **Tier 3: Maintenance** | NanoClaw, NullClaw | <10 PRs/day, one high-severity bug open, features stalled but bugs fixed |
| **Tier 4: Dormant** | PicoClaw, ZeptoClaw, TinyClaw | <1 PR/day, no releases, stale PRs, may be abandoned |

**Maturation Signals**:
- **Regression velocity**: OpenClaw and CoPaw show the highest regression rates — signs of rapid development outpacing testing. IronClaw's investment in hermetic testing (#6524) directly addresses this.
- **Release cadence**: Only EasyClaw shipped a release in this window. Most projects are in "merge fast, release later" mode, which delays stability for downstream users.
- **First-time contributors**: CoPaw and NullClaw both saw PRs from first-time contributors, indicating healthy barrier-to-entry for new developers.
- **RFC adoption**: ZeroClaw's RFC culture (5+ active RFCs) suggests more thoughtful design than OpenClaw's issue-driven model.

## 7. Trend Signals

From aggregate community feedback across 13 projects, the following industry trends emerge for AI agent developers:

1. **Multi-Agent Orchestration is the Next Frontier**: NanoBot's Issue #5000 (multi-agent collaboration) and ZeroClaw's A2A outbound RFC (#9106) both signal that subagent-as-task-delegation is insufficient. Users want persistent agent identities, shared state, and recovery mechanisms. This will likely become the default architecture within 12 months.

2. **Memory as a First-Class Persistence Problem**: The recurring pattern of "conversation history lost" (OpenClaw #69943, CoPaw #6542, NanoBot #5118) reveals that current in-memory/vector approaches are insufficient for production. Expect adoption of git-based or journaled storage (CoPaw's workspace checkpoints #6269 is the most mature example).

3. **Reliability Over Features**: The highest-reacted issues across all projects are not missing features but **broken core functionality**: Discord crash-loops, Telegram silent drops, cron jobs that fail silently. Users are willing to trade new bells and whistles for channels that "just work."

4. **Observability is Becoming Table Stakes**: IronClaw's coverage gates, ZeroClaw's OTel correlation RFC (#8933), and Moltis's Langfuse/OTLP instrumentation all point to a maturation where agents must be debuggable and monitorable. Cost tracking (OpenClaw #13219, Moltis #1174) is a subset of this trend.

5. **Platform Lock-In Fear is Driving Interoperability**: The OpenAI-compatible endpoint push (ZeroClaw #8550, #8603) and A2A/ACP protocol adoption reflect user desire to avoid vendor lock-in. Agents that can switch between providers (NanoBot's dual-engine quota fallback #3057) will have competitive advantage.

6. **Edge and Low-Resource Deployments Remain Underserved**: PicoClaw targeting Raspberry Pi and OpenClaw's systemd OOM issues (#89315) show that Raspberry Pi/edge users are a vocal minority. Projects that optimize for 4GB RAM deployments (via Rust or better memory management) will capture the hobbyist market.

7. **Chinese Market is Distinct**: CoPaw's deep integration with WeChat/Feishu/QQ and its focus on Chinese filename handling (#6453) reveals that localization is not just translation — it's integration with local platforms. The "global" agents (OpenClaw, ZeroClaw) treat Feishu as just another channel, missing the ecosystem depth.

**Value for AI Agent Developers**:
- **If building for production**: Adopt IronClaw's QA philosophy or Moltis's security model. Avoid OpenClaw's regression-heavy cycle unless you have dedicated ops.
- **If building for the Chinese market**: Fork or contribute to CoPaw — it has the deepest local integration.
- **If building multi-agent systems**: Watch ZeroClaw's RFCs and NanoBot's multi-agent proposal (#5000). The architectural decisions made in the next 3 months will define the standard.
- **If running at home on a Pi**: PicoClaw is your only option, but expect maintenance lag. Consider contributing to fix #3301.

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot Project Digest — 2026-07-30

## 1. Today's Overview
The project is highly active on 30 July, with 27 pull requests updated and 5 issues handled in the last 24 hours. The team merged three WebUI regression fixes, enforced BasedPyright strict type checking project-wide, and closed two bugs. A major new proposal for multi-agent collaboration (Issue #5000) continues to draw community discussion. Overall, NanoBot shows strong momentum in both stability hardening and feature expansion.

## 2. Releases
No new releases were published today. No release notes or migration guides are available.

## 3. Project Progress
**Merged/closed PRs today:**

- [#5164 [CLOSED]](https://github.com/HKUDS/nanobot/pull/5164) – **fix(webui): prevent redundant thread and media reloads** – Reduces unnecessary re-renders and short-lived token rotation effects.
- [#5158 [CLOSED]](https://github.com/HKUDS/nanobot/pull/5158) – **refactor: enforce BasedPyright strict type checking** – Makes all 273 modules strict-clean; adds strict checking to the CI toolchain.
- [#5165 [CLOSED]](https://github.com/HKUDS/nanobot/pull/5165) – **fix(webui): avoid false microphone silence errors** – Ensures MediaRecorder output is sent to transcription even when waveform samples appear silent.
- [#5116 [CLOSED]](https://github.com/HKUDS/nanobot/pull/5116) – **feat(webui): add skill marketplaces and management** – Introduces a Discover view for community skills (skills.sh, SkillHub), install history, and sparklines.
- [#5118 [CLOSED]](https://github.com/HKUDS/nanobot/issues/5118) – **Bug: Session consolidation drops uploaded media paths** – Fixed via [#5139](https://github.com/HKUDS/nanobot/pull/5139) (still open, awaiting merge).
- [#5159 [CLOSED]](https://github.com/HKUDS/nanobot/issues/5159) – **Bug: Windows PowerShell 5.1 ExecTool corrupts non-ASCII pipeline input** – Quick fix submitted independently.

## 4. Community Hot Topics
- **[Issue #5000 – Proposal: evolve the current subagent system toward multi-agent collaboration](https://github.com/HKUDS/nanobot/issues/5000)**  
  *6 comments, 0 reactions*  
  The most-discussed item today. Author argues that current subagentry is merely task delegation and proposes persistent identities, shared state, and true multi-agent orchestration. The community is actively debating scope and implementation trade-offs.

- **[PR #5034 – feat(goal): add durable state-graph planning and recovery](https://github.com/HKUDS/nanobot/pull/5034)**  
  *Open since Jul 22, no recent comments, but high priority and conflict label*  
  An ambitious enhancement to `/goal` flow that would preserve structured execution plans and recovery paths—complementing the multi-agent vision.

## 5. Bugs & Stability
**Open bugs reported today:**

| Severity | Issue | Description | Fix PR |
|----------|-------|-------------|--------|
| **High** | [#5163](https://github.com/HKUDS/nanobot/issues/5163) | Manual cron runs lose completion state when WebUI polling reloads the store – race between `CronService.run_job()` and concurrent API reads. | None yet |
| **Medium** | [#5161](https://github.com/HKUDS/nanobot/issues/5161) | Refactoring request: narrow file-level Pyright suppressions after strict mode enforced. | Part of [#5158](https://github.com/HKUDS/nanobot/pull/5158) (already merged) |
| **Low** | [#5118](https://github.com/HKUDS/nanobot/issues/5118) | Session consolidation drops uploaded media paths (closed, fix pending review in [#5139](https://github.com/HKUDS/nanobot/pull/5139)). | [#5139](https://github.com/HKUDS/nanobot/pull/5139) (open) |

**Other stability fixes in progress:**  
- [#5169](https://github.com/HKUDS/nanobot/pull/5169) – Adds JSON truncation rejection and circuit-breaker for tool retry loops.  
- [#5167](https://github.com/HKUDS/nanobot/pull/5167) – Preserves original messages during idle compaction (prevents history loss).  
- [#5166](https://github.com/HKUDS/nanobot/pull/5166) – Prevents inherited goal permission from persisting outside allowed scope.  
- [#5151](https://github.com/HKUDS/nanobot/pull/5151) – Releases idle session locks to prevent memory leaks.  
- [#5150](https://github.com/HKUDS/nanobot/pull/5150) – Bounds buffered session output in exec tool to avoid unbounded memory.

## 6. Feature Requests & Roadmap Signals
- **Multi-agent collaboration** ([#5000](https://github.com/HKUDS/nanobot/issues/5000)) – The strongest signal for the next major version. Likely to be scheduled for v2.x after current stability push.
- **Durable goal planning with state graphs** ([#5034](https://github.com/HKUDS/nanobot/pull/5034)) – Complementary to multi-agent; would give long-running tasks recovery capability.
- **Stable resource path aliases** ([#5131](https://github.com/HKUDS/nanobot/pull/5131)) – Aims to decouple internal paths from configuration, making agent/media/package references portable.
- **Custom Telegram Bot API base URL** ([#4919](https://github.com/HKUDS/nanobot/pull/4919)) – Enterprise and self-hosted gateways request; open since Jul 14.

User requests (from issues) lean toward **persistent identities, better Windows support, and reliable cron automation**. Given the merge velocity, at least the resource aliases and custom Telegram URL are likely candidates for the next release.

## 7. User Feedback Summary
- **Pain points:**  
  - File media paths lost after session consolidation (resolved, fix pending merge).  
  - PowerShell 5.1 encoding breakage for non-ASCII text on Windows (fixed).  
  - Microphone audio falsely detected as silence in WebUI (fixed).  
  - Manual cron runs showing stale “Failed” state due to race condition (open).  
- **Satisfaction:** Users appreciate the rapid turn-around of regression fixes; no negative reactions on closed issues.  
- **Use cases:** The proposal for multi-agent collaboration signals advanced use cases (orchestration, delegated workflows) beyond simple chat.

## 8. Backlog Watch
The following important items have been open for >10 days without direct maintainer response or merge:

- **[#4812](https://github.com/HKUDS/nanobot/issues/4812) – fix(memory): use .get() for role key** (Jul 6, open, PR attached but conflict-labeled).  
  *Memory module crashes on malformed history entries missing `role` key – a simple defensive fix that has stalled for three weeks.*
- **[#4919](https://github.com/HKUDS/nanobot/pull/4919) – feat(telegram): support custom Bot API base URL** (Jul 14, open, conflict).  
  *Required for enterprise deployments behind custom gateways; PR has not been reviewed or updated.*
- **[#5094](https://github.com/HKUDS/nanobot/pull/5094) – fix(providers): use canonical OpenRouter app URL** (Jul 26, open, conflict).  
  *Updates HTTP-Referer header for OpenRouter attribution; trivial change but unmerged.*
- **[#5156](https://github.com/HKUDS/nanobot/pull/5156) – fix(telegram): recover from silently stalled polling** (Jul 29, open).  
  *Production bug where Telegram bot stops receiving messages after transient network blips – no maintainer comments yet.*

These items are low risk/high value and could be closed with minimal review effort.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-07-30

## 1. Today’s Overview

ZeroClaw continues at high velocity: **50 issues** and **50 pull requests** were updated in the last 24 hours, reflecting sustained community and maintainer engagement. No new releases are recorded, but several high‑priority RFCs and features are converging. The project remains focused on architectural refinements (memory separation, runtime‑owned sessions, plugin systems) and interoperability (OpenAI‑compatible endpoint, A2A outbound client). Bug fixes are landing steadily, especially in MCP, Telegram, and credential‑handling paths. A notable cluster of activity surrounds the **OpenAI Chat Completions adapter** (PR #8486, issues #8550 / #8603) and a **KeySource trait for master‑key material** (issue #9127). Project health is robust, though a handful of long‑standing bugs (empty‑credential crash loops, layer inversion) still await resolution.

---

## 2. Releases

**No new releases** were published in the last 24 hours. The latest shipped version remains as reported previously. No migration notes or breaking changes to document.

---

## 3. Project Progress

The following pull requests were **closed or merged** in the last 24 hours (from the top‑20 PR list and closed issues):

| PR # | Title | Summary | URL |
|------|-------|---------|-----|
| #9205 | feat(sop): centralize fan‑in ingress adapters | Delivers a shared `SopIngress` adapter for external deliveries (engine/audit handle validation, payload capping, target selection). | [zeroclaw-labs/zeroclaw PR #9205](https://github.com/zeroclaw-labs/zeroclaw/pull/9205) |
| #9542 | docs(security): document untrusted review input | Adds explicit prompt‑injection hygiene doctrine for AI PR‑review skills. | [zeroclaw-labs/zeroclaw PR #9542](https://github.com/zeroclaw-labs/zeroclaw/pull/9542) |
| #9495 | fix(channels): resolve aliases for one‑off sends | Fixes `zeroclaw channel send --channel-id type.alias` failing with “Unknown channel”. | [zeroclaw-labs/zeroclaw PR #9495](https://github.com/zeroclaw-labs/zeroclaw/pull/9495) |

**Closed issues** (selected) advanced the project:
- **#9186** (MCP stdio response‑id mismatch / 30s hard timeout) — closed.  
- **#9278** (context compression defaults true but runtime ignores it) — closed.  
- **#9422** (zeroclaw‑config cannot compile on Windows) — closed.  
- **#9508** (security: harden AI PR‑review against prompt injection) — closed.  
- **#8810** (Telegram documentation errors) — closed.  
- **#9239** (config patch –json plaintext errors) — closed.  
- **#7269** (docs build warning noise) — closed.  
- **#8581** (centralize SOP ingress adapters) — closed.

These closures represent tangible progress in stability, documentation, and core infrastructure.

---

## 4. Community Hot Topics

The most active issues (by comment count) reveal the community’s top architectural concerns:

| Issue | Title | Comments | URL |
|-------|-------|----------|-----|
| #9048 | **RFC: Separate conversation history from agent‑curated long‑term memory** | 11 | [zeroclaw-labs/zeroclaw Issue #9048](https://github.com/zeroclaw-labs/zeroclaw/issues/9048) |
| #9127 | **RFC: Abstract a `KeySource` trait — classify master‑key material by source / deployment form** | 9 | [zeroclaw-labs/zeroclaw Issue #9127](https://github.com/zeroclaw-labs/zeroclaw/issues/9127) |
| #9106 | **RFC: A2A outbound client (A2ATool)** | 6 | [zeroclaw-labs/zeroclaw Issue #9106](https://github.com/zeroclaw-labs/zeroclaw/issues/9106) |
| #8603 | **RFC: OpenAI Chat Completions compatibility adapter** | 6 | [zeroclaw-labs/zeroclaw Issue #8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603) |
| #8933 | **RF C: Add cross‑turn conversation correlation to OTel export** | 6 | [zeroclaw-labs/zeroclaw Issue #8933](https://github.com/zeroclaw-labs/zeroclaw/issues/8933) |
| #8550 | **[Feature]: Add OpenAI‑compatible chat completions endpoint** | 5 | [zeroclaw-labs/zeroclaw Issue #8550](https://github.com/zeroclaw-labs/zeroclaw/issues/8550) |

**Analysis**:  
- **Memory architecture** (#9048) is the most discussed topic. Users want a clean split between ephemeral conversation history and durable, curator‑managed long‑term memory. The current mixing in `MemoryCategory::Conversation` is seen as a blocker for deterministic memory management.  
- **Security & key management** (#9127) reflects growing enterprise interest – with 93 `#[secret]` fields, a declarative `KeySource` trait would allow different key provisioning strategies (env, vault, TPM) without hardcoded assumptions.  
- **Interoperability** dominates: A2A outbound (#9106) and OpenAI‑compatible API (#8603, #8550) are the two biggest integration requests. The large PR #8486 (still open) is the primary implementation for the OpenAI endpoint.  
- **Observability** (#8933) shows demand for OpenTelemetry correlation across conversation turns, essential for production monitoring.  

On the PR side, the **OpenAI endpoint** (#8486) and the **goal controller** (#8687) are large, long‑running efforts attracting community attention.

---

## 5. Bugs & Stability

The following bugs were reported or updated in the last 24 hours, ranked by severity:

| Severity | Issue | Summary | Fix PR exists? |
|----------|-------|---------|----------------|
| **P1 – Workflow blocked** | [#9340](https://github.com/zeroclaw-labs/zeroclaw/issues/9340) | CLI‑created cron jobs hardcode `delivery.mode = "none"`; output is silently discarded. | Not yet identified. |
| **P1 – Workflow blocked** | (Closed today) [#9186](https://github.com/zeroclaw-labs/zeroclaw/issues/9186) | MCP stdio: response id ignored, 30s timeout vs tool budget, mutex held for whole call. | Closed (fixes landed). |
| **P2 – Degraded** | [#9486](https://github.com/zeroclaw-labs/zeroclaw/issues/9486) | High‑entropy detector redacts Solana wallet addresses; `high_entropy_tokens=false` bypass not respected on channel path. | Under discussion. |
| **P2 – Degraded** | [#9506](https://github.com/zeroclaw-labs/zeroclaw/issues/9506) | Email channel cannot preserve CC recipients or send Reply All. | No fix PR yet. |
| **P2 – Degraded** | [#9462](https://github.com/zeroclaw-labs/zeroclaw/issues/9462) | zeroclaw‑plugins lib unit tests behind `plugins‑wasmtime` feature never execute in CI. | Being investigated. |
| **P2 – Degraded** | [#6724](https://github.com/zeroclaw-labs/zeroclaw/issues/6724) | Enabled Signal/Voice channel with empty credentials can crashloop the supervisor. | No fix yet (open since May). |
| **P3 – Minor** | (Closed) [#9422](https://github.com/zeroclaw-labs/zeroclaw/issues/9422) | zeroclaw‑config cannot compile on Windows (`cfg(unix)` issue). | Closed. |

**Notable fix PRs in flight** (not yet merged):
- [#9423](https://github.com/zeroclaw-labs/zeroclaw/pull/9423) – Stop reporting an unanswerable approval as user denial (affects all channels).  
- [#9497](https://github.com/zeroclaw-labs/zeroclaw/pull/9497) – Strip Windows verbatim prefix before passing paths to external grep.  
- [#9314](https://github.com/zeroclaw-labs/zeroclaw/pull/9314) – Advance Telegram long‑poll offset only after successful delivery.  
- [#9229](https://github.com/zeroclaw-labs/zeroclaw/pull/9229) – Make interactive Ctrl+C state‑aware.  
- [#9075](https://github.com/zeroclaw-labs/zeroclaw/pull/9075) – Persist model catalog to cache on `models refresh`.  

Overall, the bug tracker is actively managed. The P1 cron‑job delivery issue (#9340) is the most urgent outstanding defect.

---

## 6. Feature Requests & Roadmap Signals

The following user‑requested features have high community traction and are likely candidates for the next release:

| Issue | Feature | Likelihood for next version |
|-------|---------|----------------------------|
| [#8550](https://github.com/zeroclaw-labs/zeroclaw/issues/8550) / [#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603) | **OpenAI Chat Completions endpoint** | **High** – PR #8486 is open and actively reviewed. A release candidate could ship soon. |
| [#9106](https://github.com/zeroclaw-labs/zeroclaw/issues/9106) | **A2A outbound client (A2ATool)** | **Moderate** – RFC with 6 comments, maintainer review pending. |
| [#9048](https://github.com/zeroclaw-labs/zeroclaw/issues/9048) | **Separate conversation history from long‑term memory** | **Moderate** – Most‑commented RFC. Would be a breaking architectural change. |
| [#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) | **Runtime‑owned conversation sessions and transport adapters** | **Moderate** – Foundation for many other features. |
| [#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) | **Unified attachment architecture for web chat and channels** | **Moderate** – Addresses cross‑channel consistency. |
| [#8780](https://github.com/zeroclaw-labs/zeroclaw/issues/8780) | **Realtime speech‑to‑speech channel for Gemini Live** | **Low** – Early RFC, requires provider‑specific integration. |
| [#8568](https://github.com/zeroclaw-labs/zeroclaw/issues/8568) | **Mixture‑of‑Agents (MoA) virtual model provider** | **Low** – Needs maintainer review. |
| [#8850](https://github.com/zeroclaw-labs/zeroclaw/issues/8850) | **Move optional channels & tools from compile‑time features to runtime WASM plugins** | **Low** – Accepted tracker, but implementation spans many PRs. |

The **OpenAI endpoint** is the closest to completion and would unlock integration with Open WebUI, LobeChat, and LangChain. The memory separation (#9048) and runtime‑owned sessions (#9487) are foundational refactors that could appear after the next release.

---

## 7. User Feedback Summary

Real pain points expressed in recent issues:

- **CLI cron jobs silently discard output** (#9340) – A user discovered that scheduling a task via the CLI produces a run marked `ok` but never delivers results. They called it “invisible failure.”  
- **Telegram documentation misleading** (#8810, closed) – A user reported the Telegram example code in the docs does not work as written. The issue was labelled S2 (degraded behavior) and has been closed, indicating the docs were corrected.  
- **Solana wallet addresses redacted** (#9486) – An agent with a Solana MCP server could not report wallet addresses because the high‑entropy detector replaced them with `[REDACTED_HIGH_ENTROPY_TOKEN]`. The user asked clearly: “why can’t my agent state my own wallet?”  
- **Email cannot Reply All** (#9506) – A user trying to use ZeroClaw for email automation found that CC lists are not preserved, making it impossible to maintain original recipient lists.  
- **Windows compilation broken** (#9422, closed) – A blocking issue for Windows users; unit tests could not compile. It was fixed promptly.  
- **MCP timeout and disconnect** (#9186, closed) – An S1 bug where the MCP stdio transport had a 30s hard timeout while tools expected 180–600s, causing workflow block. Fixed.  

Satisfaction signals: The quick turnaround on Windows compilation and MCP fixes suggests responsive maintenance. The number of RFCs (rather than support questions) indicates an engaged community pushing for advanced features.

---

## 8. Backlog Watch

The following important issues and pull requests have been open for an extended period and may need maintainer attention:

| Item | Opened | Status | Why it matters |
|------|--------|--------|----------------|
| [#6724](https://github.com/zeroclaw-labs/zeroclaw/issues/6724) – Empty credentials crashloop supervisor | 2026‑05‑16 (10 weeks) | P3, no‑stale | Repeated supervisor restarts every ~2s when a channel block is enabled without credentials. Affects dashboard UX. |
| [#6864](https://github.com/zeroclaw-labs/zeroclaw/issues/6864) – Invert zeroclaw‑channels → runtime dependency | 2026‑05‑23 (9 weeks) | P2, no‑stale | Architectural layering issue that blocks cleaner runtime ownership. Has 2 comments, accepted. |
| [#8288](https://github.com/zeroclaw-labs/zeroclaw/issues/8288) – SOP milestone: control plane to 5/5 | 2026‑06‑24 (5 weeks) | P2, no‑stale | Epic tracker for 13 SOP capabilities. One merged PR (#9205) made progress, but many items remain. |
| [#8568](https://github.com/zeroclaw-labs/zeroclaw/issues/8568) – Mixture‑of‑Agents virtual model provider | 2026‑07‑01 (4 weeks) | needs‑maintainer‑review, P2, no‑stale | Interesting feature, no maintainer sign‑off yet. |
| [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) – Maintainer decision queue for RFCs | 2026‑07‑04 (3.5 weeks) | P2, no‑stale | Meta‑issue that itself needs decisions – could be streamlined. |
| **PR #8486** – OpenAI chat completions endpoint | 2026‑06‑29 (4.5 weeks) | Open, XL size, needs‑author‑action? | Largest PR in flight. If it stalls, the OpenAI feature will miss the next release. |

The maintainer team has been active but may want to prioritise the decision queue (#8692) to clear the backlog of RFCs awaiting triage.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw Project Digest – 2026-07-30

## Today's Overview

Activity on **PicoClaw** remained low over the past 24 hours, with only one issue updated and two pull requests touched—none of which advanced to a merged or closed state. No new releases were published, and the project’s pulse is currently quiet. The single open issue (#3301) reports a functional regression affecting chat dispatch rules, while the two open PRs (one stale, one feature-oriented) continue to await review or further work. Overall, the project appears to be in a maintenance lull with no major forward momentum today.

## Releases

No new releases were made in the last 24 hours. The latest known version remains **v0.3.1** (as referenced in issue #3301). No changelog, breaking changes, or migration notes to report.

## Project Progress

No pull requests were merged or closed today. Both open PRs remain in their existing state:

- **#3283** – *fix(dingtalk): support picture/image message inbound* – Last updated 2026-07-29, still open and marked as stale. No review or merge activity today.
- **#1951** – *chore: move installation scripts from docs repo to here* – Last updated 2026-07-29, opened March 2026. No merge activity.

No features advanced or bugs were fixed in the last 24 hours.

## Community Hot Topics

The only issue updated in the last 24 hours is **#3301** ([link](https://github.com/sipeed/picoclaw/issues/3301)), which reports a critical functional bug (see Bugs & Stability). It has no comments or reactions yet, but it is the most active item by virtue of being the sole update.

The two open PRs—**#3283** (DingTalk image support, last updated yesterday) and **#1951** (installation scripts relocation, last updated yesterday)—have no new comments or reactions today. The underlying needs are:
- **#3283**: Users on the DingTalk channel are unable to receive image messages; the PR adds inbound picture handling with token caching for the DingTalk OpenAPI.
- **#1951**: Contributors want installation documentation scripts moved from a separate docs repo into the main codebase for easier maintenance.

## Bugs & Stability

One bug was reported today (in the last 24-hour window):

- **#3301** ([link](https://github.com/sipeed/picoclaw/issues/3301)) – **[BUG] /clear and session auto-compression don't work in chats routed to non-default agent via dispatch rules**
  - **Severity**: High – impacts core chat functionality (history clearing and memory compression) when using dispatch rules, a key multi-agent feature.
  - **Environment**: PicoClaw v0.3.1, DeepSeek via OpenCode Go, Raspberry Pi, Discord/Telegram channels.
  - **Reproduction**: Routing a chat to a non-default agent via dispatch rules breaks the `/clear` command and automatic session compression. No fix PR exists yet.
  - **No other regressions or crashes** were reported in the last 24 hours.

## Feature Requests & Roadmap Signals

No new feature requests were filed today. The existing open PRs hint at future direction:

- **DingTalk image support** (#3283) – If merged, would add picture message handling to the DingTalk channel, addressing a user-visible gap.
- **Installation scripts consolidation** (#1951) – A housekeeping change that would simplify onboarding for new users.

Based on backlog, the next version (v0.3.2 or v0.4.0) could include these improvements along with a fix for the dispatch rule bug (#3301), if prioritized.

## User Feedback Summary

Real user pain points are limited to the single bug report:

- **Pain Point**: Users employing dispatch rules (to route different chats to different agents) lose the ability to clear session history or benefit from automatic compression. This suggests that multi-agent routing is being actively used and that the regression is causing frustration.
- **Use Case**: A Raspberry Pi deployment with Discord and Telegram channels, using DeepSeek model – typical of hobbyist/edge AI assistant setups.
- **Satisfaction**: No positive feedback surfaced today; the only signal is a negative one (bug report).

## Backlog Watch

Two items require maintainer attention due to age or staleness:

- **#1951** ([link](https://github.com/sipeed/picoclaw/pull/1951)) – *chore: move installation scripts from docs repo to here*  
  - Created: 2026-03-24 (over 4 months ago). Last updated 2026-07-29 (but no review/merge). This PR has been open for an unusually long time; maintainers should decide whether to merge or close.
- **#3283** ([link](https://github.com/sipeed/picoclaw/pull/3283)) – *fix(dingtalk): support picture/image message inbound*  
  - Created: 2026-07-22, last updated 2026-07-29. Already marked as stale. If no review happens soon, it may become abandoned.

No other long-unanswered important issues were observed in the last 24-hour window.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw Project Digest — 2026-07-30

## Today's Overview
Activity is steady with **9 pull requests updated** in the last 24 hours, 6 of which were closed or merged. One new issue was filed, and no releases were published. The project shows a healthy mix of infrastructure improvements (hardened container images, documentation linking), bug fixes (Slack thread reload, agent-runner binding), and a major feature branch (dual-engine quota fallback) still under review. The single open issue is a **high-severity Telegram integration bug** that silently drops rich message content, likely affecting users copying formatted text.

## Releases
No new versions were released in the last 24 hours. The latest release remains unknown (not provided).

## Project Progress – Merged/Closed PRs
Three PRs were closed today (2026-07-30) after being updated:

- **#3152 – link architecture docs from README** (closed)  
  *Docs* – Adds links to `REQUIREMENTS.md` and `SECURITY.md` in the README Architecture section.  
  [nanocoai/nanoclaw PR #3152](https://github.com/nanocoai/nanoclaw/pull/3152)

- **#3014 – fix(agent-runner): bound `hasIdenticalSend` to the turn in flight** (closed)  
  *Bug fix* – Prevents cross-turn deduplication errors in agent message sending.  
  [nanocoai/nanoclaw PR #3014](https://github.com/nanocoai/nanoclaw/pull/3014)

- **#2476 – Feat/restart no nanoclaw** (closed)  
  *Feature* – Adds a restart capability without requiring the full `nanoclaw` binary/lifecycle, likely improving operator tooling.  
  [nanocoai/nanoclaw PR #2476](https://github.com/nanocoai/nanoclaw/pull/2476)

Two additional PRs were closed in the past 48 hours and updated yesterday:

- **#3150 – setup: fetch a hardened agent image instead of building it** (closed)  
  *Infrastructure* – Introduces pulling a prebuilt, hardened image from the Echo registry, reducing build times and attack surface.  
  [nanocoai/nanoclaw PR #3150](https://github.com/nanocoai/nanoclaw/pull/3150)

- **#2440 – fix(poll-loop) + feat(agent): session routing fix and pre-compaction notification** (closed)  
  *Combined fix+feature* – Corrects session routing when containers restart mid-poll and adds early compaction warnings.  
  [nanocoai/nanoclaw PR #2440](https://github.com/nanocoai/nanoclaw/pull/2440)

- **#2904 – fix(slack): reload thread history from platform on @mention** (closed)  
  *Bug fix* – Ensures Slack bots in `mention` mode see the full thread context when re-tagged.  
  [nanocoai/nanoclaw PR #2904](https://github.com/nanocoai/nanoclaw/pull/2904)

## Community Hot Topics
Only one issue is currently active and open. The most notable discussion this period revolves around a critical Telegram integration problem. No PR comments or reactions were recorded in the last 24 hours, so the community focus is concentrated on the single open issue.

- **#3151 (OPEN) – Telegram rich_message silently dropped**  
  Reports that messages composed with rich formatting via Bot API 10.1 arrive completely empty (no text, no attachments, no pipeline errors). The issue is filed by a user and has received zero comments, suggesting it may have just surfaced. No fix PR exists yet.  
  [nanocoai/nanoclaw Issue #3151](https://github.com/nanocoai/nanoclaw/issues/3151)

Three open PRs remain under active development:

- **#3145 – fix(db): backfill destinations for existing wirings** (OPEN)  
  Migration 021 to add missing channel destinations to existing messaging-group wirings. Aims to preserve existing data without breaking current setups.  
  [nanocoai/nanoclaw PR #3145](https://github.com/nanocoai/nanoclaw/pull/3145)

- **#3057 – Dual-engine quota fallback: Claude→Codex overflow, handoff recaps, proactive quota warning** (OPEN)  
  A large feature branch providing automatic fallback from Claude to Codex on quota exhaustion, live in production since July 6. This is a significant roadmap item.  
  [nanocoai/nanoclaw PR #3057](https://github.com/nanocoai/nanoclaw/pull/3057)

- **#3149 – fix(cli): add `--rw` flag to groups config add-mount** (OPEN)  
  Adds a read-write mount flag to the CLI’s groups configuration command, likely addressing a use case for mounting directories with write access.  
  [nanocoai/nanoclaw PR #3149](https://github.com/nanocoai/nanoclaw/pull/3149)

## Bugs & Stability
| Issue / PR | Severity | Description | Fix Available? |
|---|---|---|---|
| **#3151** – Telegram rich_message empty | **High** | Bot API 10.1 formatted content is silently dropped, no error. Affects all pasted rich text. | No fix PR yet |
| **#2904** (closed) – Slack thread reload | **Medium** | `mention` mode missed thread context on re-tag | Fixed (merged) |
| **#3014** (closed) – `hasIdenticalSend` binding | **Medium** | Cross-turn deduplication bug | Fixed (merged) |
| **#3149** (open) – CLI missing `--rw` flag | **Low** | Inability to set mount as read-write | PR in review |
| **#3145** (open) – Missing DB destinations | **Medium** | Wirings missing channel destinations | PR in review |

No crashes, regressions, or security advisories were reported today.

## Feature Requests & Roadmap Signals
The most prominent feature under active development is **dual-engine quota fallback** (PR #3057), which provides automatic switching between Claude and Codex when Claude quota is exhausted. Given it has been battle-tested in production since July 6, it is expected to merge in the next release.

The **hardened agent image** approach (PR #3150, merged) signals a shift toward secure, prebuilt distribution — this may become the default in a future version, with local building as fallback.

The **restart without nanoclaw binary** (PR #2476, merged) hints at better Docker / container lifecycle support.

Based on open PRs, upcoming features may include:
- Database migration tooling for wirings (PR #3145)
- Improved CLI filesystem mount control (PR #3149)

## User Feedback Summary
- **Pain point – Telegram rich messages lost** (Issue #3151): The most direct user feedback is from a user reporting that copied/pasted formatted content from web pages arrives empty. This is a silent failure with no error logs, likely frustrating for any Telegram-integrated workflows.
- **Positive signals**: The community is actively contributing fixes (Slack thread reload, binding improvements) and the project maintains a high velocity of merged PRs, indicating a healthy development cycle.
- No explicit satisfaction/dissatisfaction data beyond the open issue.

## Backlog Watch
No issues or PRs appear to have been unanswered for an extended period. However, the following items may benefit from maintainer attention:

- **PR #3057** – The dual-engine feature branch has been open since July 15 and is still awaiting review or final merge. Given its production usage, a decision on inclusion in the next release is likely needed.
- **Issue #3151** – Filed yesterday with no response; given severity, a maintainer reply or triage label would help set expectations.

No long-dormant issues or PRs were identified in the provided data.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw Project Digest — 2026-07-30

## Today’s Overview

Activity is moderate, with one open issue and four pull requests updated in the last 24 hours. The scheduler authorization bug (Issue #915) remains the most prominent problem, but a dedicated fix PR (#980) was opened today to persist the paired token to disk, directly addressing the root cause. Two PRs were merged/closed: a new Grok CLI provider (PR #981) and an earlier version of configurable memory recall (PR #961). No new releases were published. The project appears to be in a steady feature‑addition and bug‑fix cycle, with maintainer attention required on the pending scheduler fix and the open memory‑config PR.

## Releases

None in the reporting window.

## Project Progress

Two pull requests were merged or closed today:

- **[PR #981 — feat(provider): add grok-cli provider for xAI Grok CLI](https://github.com/nullclaw/nullclaw/pull/981)** (merged) – Adds a new CLI‑based provider that delegates to the local `grok` binary, following the same spawn‑per‑request pattern as the `codex-cli` provider. This expands the set of supported backends for users who prefer xAI Grok.

- **[PR #961 — feat(memory): add configurable auto-recall, recall_limit, max_context_bytes](https://github.com/nullclaw/nullclaw/pull/961)** (closed, superseded by #979) – Introduced three new `memory` config keys for controlling memory enrichment behaviour. Although closed, its replacement PR #979 is now open and should be tracked as the current implementation vehicle.

## Community Hot Topics

The single open issue is the most active:

- **[Issue #915 — [bug] Problem with scheduler unauthorized](https://github.com/nullclaw/nullclaw/issues/915)**  
  *Author: scabros | Comments: 3 | 👍: 1*  
  User reports that the scheduler tool fails with an unauthorized error when running NullClaw on Ubuntu with an external Ollama host (Qwen3.6:27b on RTX 3090). The LLM and tool calling work otherwise, but the scheduler is broken in both Telegram and CLI. Underlying need: the scheduler’s authentication token is never written to disk during `/pair`, so subsequent cron calls cannot authenticate against the gateway. The issue is old (May 15) but gained a fix PR today, making it the community’s primary focus.

## Bugs & Stability

**High Severity – Scheduler Unauthorized (Issue #915)**  
This bug blocks the entire scheduler feature for users with external LLM hosts. The root cause is clearly identified: the `/pair` endpoint stores the token hash only in memory, while the cron tool reads from a file that never gets created. A fix is proposed in **PR #980**, which persists the paired token to disk during pairing. The PR is open and under review; once merged, stability should improve markedly for that use case.

No other crashes or regressions were reported in the last 24 hours.

## Feature Requests & Roadmap Signals

- **Configurable Memory Recall (PR #979, open)** – Adds three new JSON config keys under `memory`: `auto_recall` (bool, default `true`), `recall_limit` (u32, default `5`), and `max_context_bytes` (u32, default `2048`). This gives users finer control over how many memory entries are injected per request and whether memory enrichment runs at all. It directly responds to power‑user requests for performance tuning and context window management.

- **Grok CLI Provider (PR #981, merged)** – Indicates ongoing expansion of provider support beyond Ollama and OpenAI. Users running the xAI Grok CLI can now use it natively, reducing friction for those already invested in that ecosystem.

Both features are likely to appear in the next minor release, especially the memory config once the open PR is finalized.

## User Feedback Summary

The primary user pain point is the scheduler authentication failure with external LLM hosts. The reporter (scabros) runs a real‑world setup (Ubuntu, Ollama, Qwen, RTX 3090) and describes the feature as “not working.” This indicates dissatisfaction with the current pairing/token flow. On the positive side, tool calling and general LLM functionality work well, suggesting core stability is acceptable when scheduler is not used. No other explicit satisfaction or praise was recorded in the last day.

## Backlog Watch

- **[Issue #915 — Scheduler unauthorized](https://github.com/nullclaw/nullclaw/issues/915)** (created 2026‑05‑15, last updated 2026‑07‑29) – Despite having an open fix PR (#980), this issue has been open for over two months. Maintainers should prioritise review and merging of PR #980 to resolve this long‑standing complaint.

- **[PR #979 — Configurable memory recall](https://github.com/nullclaw/nullclaw/pull/979)** (open, created 2026‑07‑29) – No comments yet, but it is a direct successor to the previously closed PR #961. Needs maintainer review to avoid further delays on a feature that has already gone through one iteration.

No other issues or PRs appear abandoned in the backlog.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-07-30

## 1. Today's Overview

IronClaw remains in an intense development phase, with **50 issues** and **50 pull requests** updated in the past 24 hours. Of those issues, **21 remain open** and **29 were closed**, while **11 PRs were merged or closed** and **39 are still open**. No new releases were published. Activity is heavily concentrated around the **Reborn architecture** (runtime presets, WebUI command palette, signing infrastructure) and **QA/stabilisation** (Gemini tool-calling bugs, service availability, automation reliability). The project is clearly investing in hardening the Reborn beta while also shipping new features like multi-tenant signing and a refactored WebUI design system.

## 2. Releases

**No new releases today.** The last version remains `1.0.0-rc.1`. A pending release PR (#5598) proposing `ironclaw_common` 0.5.0 (breaking) and `ironclaw_skills` 0.4.0 (breaking) has been open since July 3.

## 3. Project Progress

**Merged/closed PRs today (11 total):**

- [#6890](https://github.com/nearai/ironclaw/pull/6890) — Fix Windows clippy for legacy skill backfill imports (non-functional fix)
- [#6776](https://github.com/nearai/ironclaw/pull/6776) — Add WebUI v2 smoke coverage for tool dispatch, cancellation, approval gates and auth-gate resume via real HTTP/SSE
- [#6691](https://github.com/nearai/ironclaw/pull/6691) — Refactor composition assembly into focused builders, reducing `ironclaw_reborn_composition` by 9,421 lines
- Several bugs were also closed (see section 5)

**Key features advanced:**

- **Reborn WebUI:** Command palette (PR-2, #6891), role-filtered slash commands sharing the channel door policy
- **Signing stack:** Groups 7 and 8 of multi-tenant signing (PRs #6813, #6818, #6822) — Ledger clear-signing product, trust enrollment, KMS ship-gate
- **CI & coverage:** PR #6889 enforces WS11 coverage and critical mutation gates across 15 production crates
- **WebUI design system:** PR #6836 re-derives `@ironclaw/ui` package as a clean workspace refactor
- **Streaming stability:** PR #6876 fixes event-loss window by keeping one projection subscription alive for the full SSE connection

## 4. Community Hot Topics

**Most discussed issues (by comment count):**

- [#6524](https://github.com/nearai/ironclaw/issues/6524) *"Epic: Hermetic capability and journey testing platform"* (4 comments) — A foundational epic aiming to mechanically answer whether every capability and critical user journey has deterministic coverage. Reflects a systematic need for test infra that goes beyond harvested traces.
- [#6786](https://github.com/nearai/ironclaw/issues/6786) *"provider_id='gemini' 400s on every tool call — builtin tool schemas ship empty 'type'"* (3 comments) — High-priority QA bug; the `functionDeclarations` schema lacks `type` field, breaking all Gemini tool calls. Underlying need for provider-side schema validation.
- [#6790](https://github.com/nearai/ironclaw/issues/6790) *"Restart during pending Codex device authorization blocks WebUI"* (2 comments) — Highlights a design tension between CLI device flow and WebUI startup; suggests need for async auth state recovery.
- [#3045](https://github.com/nearai/ironclaw/issues/3045) and [#3044](https://github.com/nearai/ironclaw/issues/3044) (both closed, 3 comments each) — Runtime presets and local developer profiles for Reborn, now delivered. Community interest in simplified configuration.

**Pull requests have no recorded comments** (all show `undefined`), indicating discussion may be happening offline or on closed PRs.

## 5. Bugs & Stability

**Active bugs (critical):**

| Issue | Severity | Description | Fix PR exists? |
|-------|----------|-------------|----------------|
| [#6786](https://github.com/nearai/ironclaw/issues/6786) | **P1** | Gemini tool calls 400 — empty `type` in schema | No |
| [#6880](https://github.com/nearai/ironclaw/issues/6880) | **P1** | Gemini OAuth tool schemas bypass `shape_tool_schema` | No |
| [#6790](https://github.com/nearai/ironclaw/issues/6790) | **P1** | Codex device auth during restart blocks WebUI entirely | No |
| [#6879](https://github.com/nearai/ironclaw/issues/6879) | **P1** | Automation runs execute as plain chat turns, hit-or-miss results | No |
| [#6877](https://github.com/nearai/ironclaw/issues/6877) | **P2** | Channel command gating — missing activation guard for fallback identity lane | No |
| [#6887](https://github.com/nearai/ironclaw/issues/6887) | **P2** | `ironclaw_reborn_composition` test suite intermittently red under parallelism (timeout, not logic) | No |

**Resolved today:** Several P1 bugs were closed, including:
- [#6815](https://github.com/nearai/ironclaw/issues/6815) — Turn-state store latch degraded forever after write-behind flush failure (required restart). Fixed in today's merges.
- [#6805](https://github.com/nearai/ironclaw/issues/6805) — Instance returns `service_unavailable` every ~30 minutes (Railway). Closed.
- [#6720](https://github.com/nearai/ironclaw/issues/6720) — Task runs indefinitely, stop button fails to cancel. Closed.
- [#6806](https://github.com/nearai/ironclaw/issues/6806) — Automations don't show in web chat. Closed.
- [#5712](https://github.com/nearai/ironclaw/issues/5712) — `tool_search` discloses full unnarrowed capability catalog. Closed.
- [#6348](https://github.com/nearai/ironclaw/issues/6348) — Gmail extension automatically authorized after reinstall. Closed.

## 6. Feature Requests & Roadmap Signals

**Upcoming / in-flight features from today's data:**

- **Hermetic testing platform** ([#6524](https://github.com/nearai/ironclaw/issues/6524)): Epic for deterministic coverage of all capabilities and journeys. Likely to produce a new test harness in next few releases.
- **Reborn signings groups 7-8** ([#6813](https://github.com/nearai/ironclaw/issues/6813), [#6818](https://github.com/nearai/ironclaw/issues/6818), [#6822](https://github.com/nearai/ironclaw/issues/6822)): Multi-tenant isolation, trust registration, Ledger clear-signing product. These are close to completion and will likely ship in the next release.
- **WebUI command palette** ([#6891](https://github.com/nearai/ironclaw/pull/6891)): PR-2 of command train; role-filtered slash commands. Expected in next beta.
- **WebUI workspace refactor** ([#6836](https://github.com/nearai/ironclaw/pull/6836)): New `@ironclaw/ui` design system package. Indicates a push toward a more reusable, maintainable UI layer.
- **Process journal kernel move** ([#6666](https://github.com/nearai/ironclaw/issues/6666)): Move journal logic from `ironclaw_turns` to `ironclaw_processes`. Architectural change likely to land in the next minor version.
- **Channel porting** ([#3577](https://github.com/nearai/ironclaw/issues/3577)): Still open since May – port v1 channels to Reborn ProductAdapters. This is a long-standing roadmap item; progress expected as Reborn matures.

**Predictions for next release (v1.0.0-rc.2 or similar):** The breaking changes noted in the pending release PR (#5598) for `ironclaw_common` and `ironclaw_skills` may finally ship, bundled with the signing stack, command palette, and coverage gates.

## 7. User Feedback Summary

**Pain points reported today (from issues):**

- **Gemini integration is broken**: Two separate bugs (#6786, #6880) make all tool calls for Gemini (both API key and OAuth) fail with 400s. This is a blocker for users relying on Gemini providers.
- **Service instability**: The `service_unavailable` bug (#6805) caused intermittent ~30-minute outages on the Railway QA instance. While fixed, it reflects fragility in the turn-scheduler and state store.
- **Automations unreliable**: Automation runs often execute as plain chat turns or produce no output (#6879, #6806). Users cannot rely on scheduled automations.
- **Cancellation unreliable**: The stop button failing to cancel tasks (#6720) suggests the cancellation semantics defined in [#3238](https://github.com/nearai/ironclaw/issues/3238) may not be fully implemented.
- **UI friction**: Browser-native confirmations (now replaced by shared dialog in PR #6852), approval gate carry-over (#6850), and command visibility issues.

**Positive signals:** The rapid closure of 29 issues and 11 PRs indicates the team is responsive. The QA bug bash process (epic #6892) shows systematic effort. Users of the WebUI beta will benefit from the new command palette and smoother streaming.

## 8. Backlog Watch

**Issues that may need maintainer attention:**

- [#3577](https://github.com/nearai/ironclaw/issues/3577) *“Track v1 (ironclaw) ports for legacy channels”* — Created May 13, last updated July 29. Still open with 1 comment. No visible progress on porting the remaining channels beyond Telegram.
- [#6887](https://github.com/nearai/ironclaw/issues/6887) *“ironclaw_reborn_composition test suite is intermittently red”* — Open since yesterday, no fix PR yet. A potential CI headache.
- Dependent bot PRs: [#6361](https://github.com/nearai/ironclaw/pull/6361) (serde/serde_json bump) and [#6428](https://github.com/nearai/ironclaw/pull/6428) (tokio ecosystem) have been open for 9–10 days without merging. These are low-risk dependency updates that could accumulate merge conflicts.
- [#5598](https://github.com/nearai/ironclaw/pull/5598) *“chore: release”* — The release PR has been open since July 3 with breaking changes. It is likely waiting for the current feature train to land before cutting a release. Should be tracked for coordination.

---

*Data snapshot: 2026-07-30 13:00 UTC. All links point to the nearai/ironclaw GitHub repository.*

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI Project Digest — 2026-07-30

## 1. Today's Overview
Project activity remained moderate with **16 PRs updated in the last 24 hours**, of which **3 are open** and **13 were merged or closed**. No new issues were created during this period. The highlight is the successful merge of `release/2026.7.24` (PR #2407) and a new daily check-in feature (PR #2408) targeting a follow-up release. Several cowork‑related stability fixes and a reverted feature (run‑safety contract) were also merged, indicating continued attention to polish and reliability. There are **no new releases** to report.

## 2. Releases
*None.* No new versions or tags were published in the last 24 hours.

## 3. Project Progress
### Merged / Closed PRs (13 total)
- **Release branch merged**:  
  - `[CLOSED] Release/2026.7.24` ([#2407](https://github.com/netease-youdao/LobsterAI/pull/2407)) — bundled several fixes and features for the July 24 release cycle.
- **Cowork improvements** (multiple fixes):  
  - `fix(cowork): improve side chat input handling` ([#2406](https://github.com/netease-youdao/LobsterAI/pull/2406)) — accumulated text excerpts, removed length limit, retained safety checks.  
  - `feat(cowork): add selected text tags to side chat` ([#2405](https://github.com/netease-youdao/LobsterAI/pull/2405)) — removable context tags, direct sending, state safeguards.  
  - `fix(cowork): render export modal above sidebar` ([#2376](https://github.com/netease-youdao/LobsterAI/pull/2376)) — portal-based modal to avoid z‑index conflicts.  
  - `fix(cowork): prevent scroll jumps on session refresh` ([#2364](https://github.com/netease-youdao/LobsterAI/pull/2364)) — scoped refresh events.  
  - `fix(cowork): prevent periodic IM message flicker` ([#2363](https://github.com/netease-youdao/LobsterAI/pull/2363)) — better history reconciliation.  
  - `fix(cowork): open email diagnostics in a new chat` ([#2346](https://github.com/netease-youdao/LobsterAI/pull/2346)).
- **Auth & window stability**:  
  - `fix(auth): preserve local callback across login retries` ([#2360](https://github.com/netease-youdao/LobsterAI/pull/2360)).  
  - `fix(window): align Windows caption button hover colors` ([#2355](https://github.com/netease-youdao/LobsterAI/pull/2355)).  
  - `chore(updater): reduce automatic update check interval` ([#2347](https://github.com/netease-youdao/LobsterAI/pull/2347)) — from 12h to 2h.
- **Refactoring & reverts**:  
  - `Refactor/kimi k3 auto only compat` ([#2404](https://github.com/netease-youdao/LobsterAI/pull/2404)).  
  - `revert(openclaw): remove run-safety-contract gate for no-progress token burn` ([#2403](https://github.com/netease-youdao/LobsterAI/pull/2403)) — reverted a problematic feature (PR #2400) due to release-blocking issues (receipt keying, false‑success followups, compaction runId handling).  
  - `[stale] fix(cowork): true LRU eviction for LLM memory judge cache` ([#1322](https://github.com/netease-youdao/LobsterAI/pull/1322)) — a long‑standing cache bug finally closed.

### Open PRs (3)
- `[OPEN] feat(activity): add native daily check-in experience` ([#2408](https://github.com/netease-youdao/LobsterAI/pull/2408)) — targets `release/2026.7.30`.  
- `[OPEN] chore(deps-dev): bump electron group` ([#1277](https://github.com/netease-youdao/LobsterAI/pull/1277)) — dependabot, still pending.  
- `[OPEN][stale] fix(scheduledTask): 修复定时任务首次执行结果不推送到 UI` ([#1232](https://github.com/netease-youdao/LobsterAI/pull/1232)) — stale, no recent activity.

## 4. Community Hot Topics
There are **no new issues**, and the few existing PRs have **no comments or reactions**. The community discussion remains quiet. The most notable activity is the newly opened daily check‑in feature PR (#2408), but it has not yet attracted feedback.  
- No high‑engagement discussions to report.

## 5. Bugs & Stability
The following bugs were addressed in the last 24 hours (all merged):
- **Medium severity**: Cowork side‑chat input handling improved (selected text accumulation, removal of length limit) — PR #2406.  
- **Medium severity**: Scroll jumps on session refresh (PR #2364).  
- **Medium severity**: Periodic IM message flicker (PR #2363).  
- **Medium severity**: Auth callback not preserved across login retries (PR #2360).  
- **Low severity**: Email diagnostics opening in stale chat (PR #2346).  
- **Low severity**: Windows caption button hover color misalignment (PR #2355).  

A **high‑severity regression** was avoided by reverting the “run‑safety‑contract” feature (PR #2403) before it could reach release. The revert restored previous token‑burn behavior and updated the DeepSeek cache probe spec.

No new bugs were reported today; all fixes are already merged.

## 6. Feature Requests & Roadmap Signals
- **Native daily check‑in** (PR #2408) is a clear roadmap item targeting `release/2026.7.30`. It adds configurable activity entry surfaces, an H5 container, login‑aware state, and gift visuals. Likely to be included in the next release.  
- **Cowork side‑chat enhancements** (PR #2405, PR #2406) — selected text tags and improved input handling — have been merged and will ship with the next release.  
- No external feature requests or roadmap signals were recorded in the past 24 hours.

## 7. User Feedback Summary
No direct user feedback (issues or comments) was captured today. Inferred pain points from the merged fixes include:
- **Cowork side‑chat usability**: users experienced missing text selection context, scroll jumps, and flickering IM messages.  
- **Login reliability**: repeated login attempts could break the callback flow.  
- **Update frequency**: the update check interval was shortened from 12h to 2h, suggesting users wanted quicker awareness of updates.

Overall, the team is proactively addressing reported issues and polishing the cowork experience.

## 8. Backlog Watch
Two PRs require maintainer attention:
- **`[stale] fix(scheduledTask): 修复定时任务首次执行结果不推送到 UI`** ([#1232](https://github.com/netease-youdao/LobsterAI/pull/1232)) — open since **2026-04-01**, no updates in 4 months. The fix addresses a first‑run notification bug in scheduled tasks. Should be reviewed and merged to avoid user confusion.  
- **`[OPEN] chore(deps-dev): bump the electron group`** ([#1277](https://github.com/netease-youdao/LobsterAI/pull/1277)) — pending since April, updates Electron from 40.2.1 to 43.2.0 and electron‑builder. While no security alerts are mentioned, long‑stale dependency bumps can lead to compatibility or security debt.

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis Project Digest – 2026-07-30

## 1. Today’s Overview
The Moltis project shows steady development activity with **5 pull requests updated in the last 24 hours**, of which **2 were merged/closed** and **3 remain open** for further work. No new issues were filed or updated today, and no releases were published. The merged PRs deliver significant infrastructure improvements—ACP agent exposure over stdio and reliable PWA push notifications—while the open PRs focus on enhancing Slack integration, tightening security boundaries, and adding comprehensive instrumentation. The absence of bug reports or regressions suggests the codebase is stable, with maintainer attention clearly directed toward feature expansion and hardening.

## 2. Releases
*No new releases have been published.*

## 3. Project Progress
Two PRs were merged/closed today, advancing platform capabilities:

- **PR #1169 (merged) – Feature: ACP integration over stdio**  
  Exposes Moltis as an Agent Communication Protocol (ACP) agent via the `moltis acp` command, routing prompts through the cancellable `LiveChatService` path. Includes session isolation, bounded prompts/history/output/concurrency, and deterministic final-text reconciliation.  
  [PR #1169](https://github.com/moltis-org/moltis/pull/1169)

- **PR #1173 (merged) – Feature: Reliable PWA push notifications**  
  Makes push notifications reliable, private, ordered, and non-disruptive across tabs and devices. Adds re-alerting for new messages in the same chat, generic privacy-safe titles, rich formatting stripping, and an app-wide unread badge.  
  [PR #1173](https://github.com/moltis-org/moltis/pull/1173)

## 4. Community Hot Topics
No issues or PRs have attracted multiple comments or reactions (data shows `Comments: undefined` and `👍: 0` for all entries). However, the three open PRs updated today represent the most active areas of discussion:

- **PR #1166 – Slack: per-message acknowledgment reactions, phases, reconnect supervision, and Block Kit**  
  Extends Slack acknowledgment reactions (from PR #1165) with lifecycle safety under queueing, cancellation, retries, callback bursts, and delivery failures. Underlying need: Slack bots lack a typing indicator, so reaction-based progress signals must be robust in high-latency/error-prone environments.  
  [PR #1166](https://github.com/moltis-org/moltis/pull/1166)

- **PR #1170 – Fix: gate privileged tools behind per-account operators list**  
  Separates channel access from command privilege, enforcing an explicit per-account `operators` list across all execution paths. Addresses a security concern where allowlisted senders could reach host commands.  
  [PR #1170](https://github.com/moltis-org/moltis/pull/1170)

- **PR #1174 – Feature: instrumentation and feedback collection infrastructure**  
  Adds backend-neutral agent instrumentation, Langfuse v4 export, operational OTLP backends, and end-user reaction feedback. Includes streaming/non-streaming parity, provider failover attribution, and cache-aware token usage.  
  [PR #1174](https://github.com/moltis-org/moltis/pull/1174)

## 5. Bugs & Stability
No new bugs were reported via issues today. Stability improvements are embedded in the merged and open PRs:

- **High severity – Privileged tool escalation** (addressed by PR #1170, open)  
  Prior architecture allowed any allowlisted channel sender to reach privileged shell and host commands. The fix introduces a separate `operators` list, hardening against unauthorized host access.  
  [PR #1170](https://github.com/moltis-org/moltis/pull/1170)

- **Medium severity – Disruptive PWA notifications** (fixed in PR #1173, merged)  
  Notifications could interrupt users across tabs and devices, lacked ordering, and revealed private content. The merged PR resolves these issues, improving reliability and user experience.

## 6. Feature Requests & Roadmap Signals
Based on the three open PRs under active development, the following features are likely candidates for the next release:

- **Slack Block Kit & improved reaction lifecycle** (#1166) – expected to finalize per-message acknowledgment patterns, making Slack integration production-ready.
- **Per-account operator lists** (#1170) – indicates a trend toward finer-grained security models, possibly leading to role-based access controls.
- **Full instrumentation & feedback pipeline** (#1174) – signals a push toward observability and user feedback collection, which may underpin future analytics and quality-of-service features.

These features align with user needs for enterprise Slack deployments, secure multi-tenant setups, and telemetry-driven improvement cycles.

## 7. User Feedback Summary
No explicit user feedback (comments, reactions, or issues) was recorded in the last 24 hours. Inferred pain points from the PRs themselves:

- Slack bot users need reliable progress signals without typing indicators (addressed by #1166).
- Deployment operators want to restrict privileged commands to specific administrators, even when other users have channel access (addressed by #1170).
- PWA users expect non-intrusive, ordered, and privacy-safe notifications (addressed by #1173).
- Developers require instrumented agents for debugging, cost tracking, and performance monitoring (addressed by #1174).

The absence of newly filed issues may indicate general satisfaction or that most concerns are being captured as PR discussions rather than standalone issues.

## 8. Backlog Watch
No long-unanswered issues or PRs are present. All open PRs (#1166, #1170, #1174) are recent (created July 24–27) and have received updates today from the maintainer (`penso`). The maintainer is actively addressing each item, so no items currently require additional maintainer attention. The project’s backlog appears well-managed.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw Project Digest – 2026-07-30

## 1. Today's Overview
The CoPaw project is in a highly active state with **29 issues** and **49 pull requests** updated in the last 24 hours. Community engagement is strong: 24 open/active issues and 38 open PRs signal sustained development effort. However, the absence of new releases suggests the team is focused on bug fixes and feature integration rather than cutting a new version. A notable trend is the number of **regression bugs** (e.g., #6537, #6245) and infrastructure issues (CI blocking forks, NSIS installer loop), indicating that recent changes may have introduced stability regressions. Overall, the project is vibrant but needs attention to critical blockers and user-reported pain points.

## 2. Releases
**No new releases** in the last 24 hours. The latest release remains at none (likely QwenPaw 2.0.1 desktop as referenced in several issues). No migration notes or version bumps to report.

## 3. Project Progress
**11 pull requests** were closed or merged in the past day. Among those visible in the top-20 by comments:
- [**#6553** (feat: redesign app center)](https://github.com/agentscope-ai/CoPaw/pull/6553) – Split App Center into My Apps / Official / App Market tabs, added featured badges and redesigned cards.
- [**#6269** (feat: workspace checkpoint management)](https://github.com/agentscope-ai/CoPaw/pull/6269) – Introduced recoverable conversation history via shadow Git store.
- [**#6479** (fix: sync MiniMax model baseline)](https://github.com/agentscope-ai/CoPaw/pull/6479) – First-time contributor PR updating hardcoded model lists.

Additional closed PRs (not in the top-20) include fixes for token usage flush (#6522), mission arg parsing (#6523), and MCP tool name sanitization (#6561). Features advancing include **native GUI automation** (Windows/macOS, #6424), **user context transparency** (#6525), and **memory reranker support** (#6398).

## 4. Community Hot Topics

| Issue/PR | Comments | Topic |
|----------|----------|-------|
| [**#6537**](https://github.com/agentscope-ai/CoPaw/issues/6537) | 9 | Regression: Skill tags disappear after restart |
| [**#6460**](https://github.com/agentscope-ai/CoPaw/issues/6460) | 4 | High CPU on Edge+Wayland (QwenPaw 2.0.1) |
| [**#6524**](https://github.com/agentscope-ai/CoPaw/issues/6524) | 3 | MCP server restart fails auto-reconnect |
| [**#6056**](https://github.com/agentscope-ai/CoPaw/issues/6056) (closed) | 3 | Background offload kills subprocess immediately |
| [**#6542**](https://github.com/agentscope-ai/CoPaw/issues/6542) | 3 | Flash crash causes total conversation history loss |

The most heated issue is **#6537** (Skill tags lost on restart) – a regression from a previous fix (#3270). Users are reporting data persistence failures directly affecting daily workflows. The **#6460** (High CPU) thread suggests a rendering/WebSocket issue on Wayland, indicating cross-platform performance concerns.

## 5. Bugs & Stability
### Critical (data loss / blocking)
- [**#6542**](https://github.com/agentscope-ai/CoPaw/issues/6542) – Flash crash causes total history loss; suggest automatic save mechanism. (Open, no fix PR)
- [**#6537**](https://github.com/agentscope-ai/CoPaw/issues/6537) – Skill tags disappear after restart; saved but not restored. (Open)
- [**#6555**](https://github.com/agentscope-ai/CoPaw/issues/6555) – Memory compression evicts early-session events before daily summary; fix PR [**#6564**](https://github.com/agentscope-ai/CoPaw/pull/6564) prepared.

### High (core functionality broken)
- [**#6524**](https://github.com/agentscope-ai/CoPaw/issues/6524) – MCP session lost after server restart requires manual reconnect.
- [**#6565**](https://github.com/agentscope-ai/CoPaw/issues/6565) – Shell command multi-line conversion to spaces and PIPE deadlock; fix PR [**#6566**](https://github.com/agentscope-ai/CoPaw/pull/6566) (first-time contributor).
- [**#6541**](https://github.com/agentscope-ai/CoPaw/issues/6541) – Context compression uses `role=user` causing DeepSeek model errors.
- [**#6557**](https://github.com/agentscope-ai/CoPaw/issues/6557) – MCP tool names starting with `-` rejected by strict API providers; fix PR [**#6561**](https://github.com/agentscope-ai/CoPaw/pull/6561).
- [**#6529**](https://github.com/agentscope-ai/CoPaw/issues/6529) – ACP new_session response missing models field, breaking client discovery.
- [**#6533**](https://github.com/agentscope-ai/CoPaw/issues/6533) – `/mission` command TypeError due to missing parameter.

### Medium (UX or platform-specific)
- [**#6534**](https://github.com/agentscope-ai/CoPaw/issues/6534) – Windows NSIS installer infinite loop (self-detection).
- [**#6544**](https://github.com/agentscope-ai/CoPaw/issues/6544) – Feishu audio transcription silently fails.
- [**#6547**](https://github.com/agentscope-ai/CoPaw/issues/6547) – Misplaced cursor in coding editor.
- [**#6549**](https://github.com/agentscope-ai/CoPaw/issues/6549) – Input box obscured at high DPI scaling.
- [**#6551**](https://github.com/agentscope-ai/CoPaw/issues/6551) – Aliyun coding plan model list mismatch.
- [**#6510**](https://github.com/agentscope-ai/CoPaw/issues/6510) – Chinese file path URL-encoded in Feishu channel.
- [**#6563**](https://github.com/agentscope-ai/CoPaw/issues/6563) – CI workflow blocks all fork PRs (real-behavior-proof.yml).

## 6. Feature Requests & Roadmap Signals
### Highly requested (likely to land soon)
- [**#6453**](https://github.com/agentscope-ai/CoPaw/issues/6453) – Preserve Chinese filenames in upload hints; fix PR [**#6567**](https://github.com/agentscope-ai/CoPaw/pull/6567) already submitted.
- [**#6408**](https://github.com/agentscope-ai/CoPaw/issues/6408) – `/undo` command to retract previous message (similar to Cherry Studio).
- [**#6560**](https://github.com/agentscope-ai/CoPaw/issues/6560) – Comprehensive chat UX improvements (copy, ESC stop, undo, mission mode, scroll performance, session ID, context transfer).
- [**#6568**](https://github.com/agentscope-ai/CoPaw/issues/6568) – Global shortcut to summon a floating quick-input box (like Doby/Raycast).

### Niche but valued
- [**#6475**](https://github.com/agentscope-ai/CoPaw/issues/6475) – `notice_after_complete` tool to let agent acknowledge long tasks and continue chatting.
- [**#6421**](https://github.com/agentscope-ai/CoPaw/issues/6421) – QQ channel streaming output support.
- [**#6559**](https://github.com/agentscope-ai/CoPaw/issues/6559) – Parent-child session grouping for forked conversations.

**Roadmap signals**: The merged [#6269](https://github.com/agentscope-ai/CoPaw/pull/6269) (workspace checkpoints) addresses the “flash crash history loss” complaint. The [#6424](https://github.com/agentscope-ai/CoPaw/pull/6424) (computer use GUI automation) and [#6398](https://github.com/agentscope-ai/CoPaw/pull/6398) (reranker for ReMe memory) indicate the project is investing in advanced agent capabilities and memory performance.

## 7. User Feedback Summary
**Pain points**:
- **Data persistence** – Users report skill tags lost (#6537), conversation history lost on crash (#6542), and memory compression deleting early events (#6555). Trust in data integrity is a recurring theme.
- **Chinese localization** – File uploads rename Chinese files (#6453), Feishu channel encodes Chinese paths (#6510), and UI buttons are hidden on Windows with 150% scaling (#6549). Power users in China feel underserved.
- **UI/UX friction** – Missing copy/undo/stop features (#6560), unwanted session forking (#6559), mode switching losing messages (#6558), and cursor input anomalies (#6547) degrade the desktop experience.
- **MCP reliability** – Server restart breaks connections without manual intervention (#6524); hyphens in tool names crash strict APIs (#6557).
- **Shell tools** – Multi-line commands break (#6565), background offload kills processes (#6056), and coordinator deadlines cause permanent session blocks (#6245).

**Satisfaction indicators**: Users are actively submitting PRs (multiple first-time contributors) and filing detailed bug reports with reproduction steps. The community values QwenPaw but expects higher stability.

## 8. Backlog Watch
The following issues and PRs have been open for several days without maintainer response or clear resolution plan:

| Item | Age | Reason for Concern |
|------|-----|-------------------|
| [**#6460**](https://github.com/agentscope-ai/CoPaw/issues/6460) (High CPU Edge+Wayland) | 5 days | No clear fix; high impact for Linux users. |
| [**#6524**](https://github.com/agentscope-ai/CoPaw/issues/6524) (MCP reconnect) | 2 days | Core MCP functionality; affects remote server users. |
| [**#6555**](https://github.com/agentscope-ai/CoPaw/issues/6555) (Memory loss) | 1 day | Fix PR #6564 exists but not yet merged; could cause permanent data loss if left open. |
| [**#6557**](https://github.com/agentscope-ai/CoPaw/issues/6557) (Hyphen tool names) | 1 day | Fix PR #6561 exists; should be fast-tracked to unblock Kimi API users. |
| [**#6312**](https://github.com/agentscope-ai/CoPaw/pull/6312) (Configurable theme module draft) | 9 days | No maintainer feedback; contributor may lose momentum. |
| [**#6563**](https://github.com/agentscope-ai/CoPaw/issues/6563) (CI blocks fork PRs) | 1 day | High priority: blocks all external contributions. |

The CI bug (#6563) and the installer infinite loop (#6534) are the most urgent operational blockers. The team should address these to maintain contributor trust and release pipeline health.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

# EasyClaw Project Digest — 2026-07-30

## 1. Today's Overview
No GitHub activity was recorded in the past 24 hours: zero issues or pull requests were opened, closed, or updated. However, a new release (v1.8.83) was published, introducing improvements to desktop session recovery, affiliate model handling, and hosted Expert chat flows. The absence of community interaction suggests a quiet maintenance phase, with development effort concentrated on packaging the latest changes rather than addressing new feedback or bug reports.

## 2. Releases
**New Release: [v1.8.83 – TK Copilot v1.8.83](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.83)**  
- **Changes include:**
  - Recover authenticated desktop subscriptions after session refresh
  - Surface independent affiliate model availability and improve campaign guidance
  - Refine the hosted Expert chat, onboarding, sign-in, and image attachment experience
- **Breaking changes:** None mentioned.
- **Migration notes:** No special steps required; update via standard upgrade path.

## 3. Project Progress
No pull requests were merged or closed today. The only deliverable is the v1.8.83 release, which bundles fixes and enhancements directly without an associated PR being tracked in the 24‑hour window.

## 4. Community Hot Topics
No issues or pull requests were active in the last 24 hours. There are currently zero open issues or PRs in the repository. Community discussion (if any) is not visible on GitHub.

## 5. Bugs & Stability
No bug reports, crashes, or regressions were filed today. The latest release focuses on session recovery and UX refinements, which may address underlying stability concerns, but no specific fixes are documented as bug-related.

## 6. Feature Requests & Roadmap Signals
No user-submitted feature requests were recorded today. Based on the release content, the project team appears to be prioritizing:
- Session persistence for authenticated desktop users
- Affiliate/campaign management improvements
- Chat and onboarding UX polish

These areas are likely candidates for the next minor release (v1.8.84 or v1.9.0). No roadmap signals from the community are available.

## 7. User Feedback Summary
No feedback (comments, reactions, or pain points) was posted on GitHub today. The release notes do not reference specific user complaints; the changes aim to “refine” and “improve” existing workflows, suggesting incremental quality-of-life enhancements rather than critical issue resolution.

## 8. Backlog Watch
There are no open issues or pull requests that have gone unanswered. The repository’s backlog is effectively empty as of this digest date. Maintainers should monitor whether new community activity emerges after the release.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar).*