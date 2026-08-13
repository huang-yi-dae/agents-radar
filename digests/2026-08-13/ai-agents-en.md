# OpenClaw Ecosystem Digest 2026-08-13

> Issues: 500 | PRs: 500 | Projects covered: 13 | Generated: 2026-08-13 01:42 UTC

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

# OpenClaw Project Digest — 2026-08-13

## 1. Today's Overview

OpenClaw remains highly active with 500 issues and 500 PRs updated in the last 24 hours, though new releases were absent. The project shows a strong maintainer presence, with 13 PRs authored by maintainer steipete alone, addressing UI polish, session model resolution, and subagent stop control. However, the issue tracker reveals persistent reliability concerns centered on subagent completion delivery, silent message loss, and session-lane starvation — several "diamond lobster" rated issues remain open for weeks or months. Community engagement is robust, with high-comment threads on recurring silent reply failures (#121058, 91 comments) and memory trust tagging (#7707, 45 comments). The ratio of open to closed items suggests a healthy triage pipeline, but a substantial backlog of maintainer-reviewed features awaits product decisions.

## 2. Releases

No new releases were published in the last 24 hours. The most recent stable channel remains at an unspecified version, with users referencing 2026.7.1-2 as the latest confirmed build in issue reports.

## 3. Project Progress

Several PRs were merged or closed today, primarily focused on infrastructure and testing improvements:

- **#122904 (merged)** — Documented session and transcript fetching in the openclaw-debugging skill, addressing a knowledge gap for agents debugging chat-session references.
- **#122901 (merged)** — Stubbed plugin metadata snapshot in onboard-inference test, reducing test runtime significantly by avoiding cold-discovery of all bundled plugin manifests.
- **#122557 (merged)** — Fixed Matrix plugin live-preview draft redaction, keeping streamed drafts visible until the replacement reply is confirmed delivered.
- **#122556 (merged)** — Companion Matrix fix ensuring drafts remain visible until delivery confirmation, with the author deliberately not auto-closing the related issue pending further design review.
- **#122888 (open)** — Restored gateway network qualification in E2E harness after a prepared suspension broke WebSocket upgrade expectations.
- **#122885 (open)** — Fixed CI so affected extension suites run when the changed-test planner falls back, closing a gap where mixed package/extension changes could pass without extension test coverage.
- **#122891 (open)** — Improved CLI spawn test startup time by importing execution test support directly.

A notable cluster of maintainer-authored fixes landed as open PRs, addressing session model resolution bugs (#122910, #122907), subagent stop control (#122909), and internal recovery prompts leaking into transcripts (#122908).

## 4. Community Hot Topics

The most active discussions reveal three dominant themes: reliability of message delivery, memory architecture, and multi-agent orchestration.

- **#121058 — Silent reply failures still recurring after #116277 closed (91 comments, open)** — The monitoring cron continues logging new occurrences of silent-reply failures despite the prior fix. This is the single most-commented issue and signals an incomplete root-cause resolution. **Link:** https://github.com/openclaw/openclaw/issues/121058
- **#7707 — Feature: Memory Trust Tagging by Source (45 comments, open, P2)** — Users request tagging memory entries by trust level based on origin to prevent memory poisoning attacks from untrusted web scrapes or third-party skills. This has broad security and session-state implications. **Link:** https://github.com/openclaw/openclaw/issues/7707
- **#44925 — Subagent completion silently lost (26 comments, open, P1)** — Multiple failure patterns (completion announce fails, no retry, no notification) cause silent subagent result loss. Demonstrated by a Telegram forum bot on Ubuntu 24.04. **Link:** https://github.com/openclaw/openclaw/issues/44925
- **#77598 — Track live dev agent behavior and trajectory (23 comments, open, maintainer)** — Running observational notes from a 24-hour watch of a maintainer's dev agent on 2026-05-04. Community interest in real agent behavior remains high. **Link:** https://github.com/openclaw/openclaw/issues/77598
- **#39604 — Feature: allowPrivateNetwork for web_fetch (14 comments, closed, 12 👍)** — Users strongly supported an opt-in private-network access key. Closed as already-fixed. **Link:** https://github.com/openclaw/openclaw/issues/39604

## 5. Bugs & Stability

The most severe open bugs revolve around silent message loss and session-state corruption. No fixes were merged today for the top-tier items.

| Severity | Issue | Summary | Fix PR? |
|----------|-------|---------|---------|
| **Critical (P1, diamond lobster)** | #92433 | Subagent completion silently dropped when announce steers into a requester run that ends before processing — recovery stuck | None |
| **Critical (P1, diamond lobster)** | #67777 | Subagent completion delivery lost on direct-announce timeout, drain, or orphan prune | None |
| **Critical (P1, diamond lobster)** | #111498 | Main agent blocked by persistent workspace-state migration after Anthropic auth recovery | None |
| **Critical (P1, diamond lobster)** | #97983 | iOS/WebChat messages append to transcript but do not trigger assistant replies | None |
| **Critical (P1, diamond lobster)** | #121058 | Silent reply failures still recurring despite closed fix — monitoring cron logs new occurrences | None |
| **High (P1, silver/gold)** | #89278 | Codex OAuth refresh succeeds but cron/heartbeat fail with 10s auth refresh timeout | None |
| **High (P1, silver)** | #91363 | Isolated cron consistently fails with "LLM request failed" at model-call-started phase | None |
| **High (P1, silver)** | #47975 | Subagent sessions persist after completion; main session becomes unresponsive | None |
| **High (P1, silver)** | #43374 | All LLM API calls time out simultaneously under multi-agent concurrency despite reachable APIs | None |
| **Medium (P1, gold shrimp)** | #97616 | Unreaped hook/tool child processes accumulate as zombies, degrading runtime | None |

Three P0/P1 PRs await maintainer review and directly address stability gaps: **#119909** (highWaterBytes 0 deletes all session history, P0), **#122613** (stale GitHub results after token rotation, P1), and **#122684** (CLI image hydration from agent workspaces, P1). A Discord ingress unblock PR (**#122878**) and Matrix draft-preservation fixes also target message-delivery reliability.

## 6. Feature Requests & Roadmap Signals

The most upvoted and discussed feature requests point to memory security, cost transparency, and voice architecture:

- **Memory Trust Tagging by Source (#7707, 45 comments)** — Tagging memory by origin trust level to prevent poisoning. Given the security framing and community traction, this is a strong candidate for the next minor release.
- **Expose OpenRouter usage cost to agent runtime (#9016, 8 comments)** — Per-message cost tracking from OpenRouter responses, enabling agents to append cost info to replies. Low complexity, likely to attract maintainer pickup.
- **Self-hosted STT/TTS provider support in webchat (#45508, 8 comments)** — Route webchat TTS/STT through the gateway instead of the browser Speech API. The recent Codex realtime voice PR (#119001, open, XL) suggests voice is an active development area, making this a plausible near-term addition.
- **YAML as config file format (#45758, 9 comments)** — Alternative to JSON5. Low-risk ergonomic improvement that has remained P3 for five months.
- **Durable natural-language rule learning + multi-mention reply semantics (#41366, 8 comments)** — Workspace-level rule consistency across agents. Tied to the broader multi-agent stability theme.
- **Built-in pace-aware rate limiting (#45771, 7 comments)** — Autonomous agents burning through rate limits. Complements the multi-agent timeout issues (#43374) and may gain priority as concurrency matures.

The cluster of maintainer-authored UI PRs today (**#122905–#122909**) signals imminent fixes for model picker resolution, new-session attachment previews, and GitHub project selection behavior — likely landing in the next patch.

## 7. User Feedback Summary

User sentiment is a mix of frustration with recurring reliability issues and appreciation for the project's feature velocity. The most vocal pain points:

- **Silent failures erode trust**: The 91-comment thread on #121058 describes ongoing silent reply failures after a claimed fix, with users running monitoring crons to detect recurrences. The "silent" nature — no error, no retry, no notification — is consistently cited as the most damaging aspect.
- **Subagent orchestration is fragile**: Multiple reports (#44925, #43367, #67777, #92433) describe lost results, config overwrites, session-lock failures, and detached child work. One user (waliddafif) summarized it as making multi-agent runs "unreliable in practice."
- **Memory management inconsistency**: Users report wildly different memory behaviors across agents (#43747): one stores to SQLite with chunking/embedding, another behaves differently — no unified mental model.
- **Positive signals**: The accessibility fix for screen readers (#65538) and the Feishu file-send fix (#42820) were both closed as fixed, indicating maintainers are addressing niche-but-real UX concerns. The already-fixed Slack thread status improvement (#33413) also closed positively.

## 8. Backlog Watch

Several high-activity, high-severity items remain open without maintainer response or fix PRs for extended periods:

- **#7707 — Memory Trust Tagging by Source (created 2026-02-03, 45 comments)** — 6+ months open, labeled `needs-maintainer-review` and `needs-product-decision`. No linked PR after half a year of discussion.
- **#43367 — Multi-agent orchestration instability (created 2026-03-11, P1, 14 comments)** — 5 months open with `linked-pr-open`, but the core cluster of config overwrites and session-lock failures remains unaddressed.
- **#44925 — Subagent completion silently lost (created 2026-03-13, P1, 26 comments)** — 5 months open with zero linked PRs. One of the most-reported failure patterns.
- **#43747 — Memory management is in chaos (created 2026-03-12, 11 comments)** — Regression-tagged, 5 months open, still `needs-info` and `needs-product-decision`.
- **#97983 — iOS/WebChat messages don't trigger replies (created 2026-06-30, P1, 9 comments)** — 6 weeks open, diamond-lobster rated, no fix PR yet.
- **#50199 — Skill priority configuration (created 2026-03-19, 8 comments)** — 5 months open, P3, `needs-product-decision` only — no maintainer review has occurred.
- **#75782 — Embedded-run auth stage takes 10–15s synchronously (created 2026-05-01, 8 comments)** — 3+ months open, P2, blocks event loop regardless of auth profile state.

---

## Cross-Ecosystem Comparison

# Cross-Project Ecosystem Comparison Report — 2026-08-13

## 1. Ecosystem Overview

The personal AI assistant open-source landscape is dominated by a small number of high-velocity projects (OpenClaw, IronClaw, CoPaw, NanoBot, ZeroClaw) with strong maintainer presence and rapid release cadence, while a long tail of smaller projects (PicoClaw, NanoClaw, LobsterAI) iterate at a more measured pace. The dominant themes across all active projects are reliability of message delivery, subagent orchestration stability, and security hardening (credential leakage, workspace boundary enforcement, SSRF prevention). The ecosystem is converging on a shared architectural pattern: a core agent loop with pluggable channel adapters (Telegram, Discord, Slack, WhatsApp, Signal, Matrix), MCP-based tooling, and session-based memory management. Cross-platform desktop support remains a persistent weak point, with Windows and macOS stability issues reported across nearly every project.

## 2. Activity Comparison

| Project | Issues (24h) | PRs (24h) | Release Status | Health Score |
|---|---|---|---|---|
| OpenClaw | 500 updated | 500 updated (13 by maintainer) | No release; users on 2026.7.1-2 | ★★★☆☆ — Active but 5 critical P1 bugs open for weeks/months |
| NanoBot | 8 updated (4 open, 4 closed) | 36 updated (19 open, 17 merged/closed) | No release | ★★★★☆ — Fast shipping, security-focused, rapid issue closure |
| ZeroClaw | Not specified | 19 merged/closed | No release; v0.8.3 latest | ★★★☆☆ — Strong contributor roster, heavy P1/P2 backlog, Windows crisis |
| PicoClaw | 2 stale issues active | 3 open PRs, 0 merged | No release | ★★★☆☆ — Stable but slow merge cadence |
| NanoClaw | 4 updated | 10 updated | No release | ★★★★☆ — Clear maintainer direction, major migration in flight |
| NullClaw | 0 | 0 | — | No activity |
| IronClaw | 41 updated (29 open) | 50 updated (31 open, 19 merged/closed) | **2 release candidates yesterday** (v1.2.0-rc.2, rc.3) | ★★★★☆ — High velocity, but QA bug-bash reveals P1 Telegram issues |
| LobsterAI | 6 updated (0 new) | 8 updated (7 merged/closed) | 2026.8.12 released recently | ★★★☆☆ — Release wave done; all issues stale (Mar–May) |
| TinyClaw | 0 | 0 | — | No activity |
| Moltis | 0 | 0 | — | No activity |
| CoPaw | 30 updated | 43 updated (16 merged/closed) | v2.1.0-beta.4 shipped | ★★★★☆ — Pre-release momentum, active bug fixing |
| ZeptoClaw | 0 | 0 | — | No activity |
| EasyClaw | 0 | 0 | — | No activity |

## 3. OpenClaw's Position

OpenClaw remains the reference implementation and community hub of the ecosystem, with issue/PR volume (500+ each per day) an order of magnitude higher than the nearest peer (IronClaw at ~41/50). Its primary advantages are: (1) the largest contributor base with credible maintainer engagement (13 PRs from steipete alone in one day), (2) the broadest channel and platform coverage, and (3) a mature skill/plugin ecosystem that smaller projects often mirror. Technically, OpenClaw uses a session-lane model with subagent orchestration and a debugging skill, whereas IronClaw is pursuing a "Reborn" refactor with a design-system package, and CoPaw (QwenPaw) is deeply integrated with the AgentScope 2.x runtime — reflecting different architectural lineages (Claw-derivative vs. framework-native). Despite this, OpenClaw's reliability reputation is under pressure: the same silent-reply and subagent-completion-loss bugs recur across months, and the project publishes no releases in the reporting window while IronClaw ships two release candidates in one day. OpenClaw's community size and long-term momentum keep it dominant, but its gap in shipping cadence is notable.

## 4. Shared Technical Focus Areas

- **Silent message/subagent result loss** — OpenClaw (#121058, #44925, #67777, #92433), NanoClaw (Signal PR #2689), CoPaw (#6921). The most damaging class of bug: failures with no error, retry, or notification.
- **Multi-agent/session orchestration instability** — OpenClaw (#43367), CoPaw (#6918, #6927), ZeroClaw RFC (#8832 Kanban), IronClaw (concurrent capability batches, #7407). The ecosystem is pushing toward more robust multi-agent workflows.
- **Security hardening: credential leakage, SSRF, workspace boundaries** — NanoBot (PR #5258, #5279, #5329), ZeroClaw (#8713, #9362/#8741), CoPaw (plugin permission gaps, #6916). Consistent tightening of agent-side security expectations.
- **Cross-platform desktop reliability** — ZeroClaw (Windows #9290, macOS #7527), LobsterAI (Windows plugin junctions #2479, macOS icon crash #2478), CoPaw (Windows startup crash #6955, antivirus kills #6847), IronClaw (Windows fsync semantics in rc.2). Windows remains the weakest platform across the board.
- **Memory management and trust** — OpenClaw (#7707 memory trust tagging), ZeroClaw (#6998 schema-validated memory consolidation), CoPaw (memory pipeline corrections, PR #6942). A shared desire for structured, trustworthy memory.
- **Observability and cost transparency** — OpenClaw (#9016 OpenRouter cost exposure), ZeroClaw (Langfuse #9556, herdr #8337), NanoClaw (#2504 `ncl status`), IronClaw (stress coverage #7360).
- **TTS/voice output and channel parity** — NanoBot (#4010), OpenClaw (#45508 self-hosted STT/TTS). Consistent demand for bidirectional voice.

## 5. Differentiation Analysis

| Project | Feature Focus | Target User | Technical Architecture |
|---|---|---|---|
| **OpenClaw** | Broadest channel/platform coverage; skill ecosystem | General power users, self-hosters | Session-lane model, subagent orchestration, plugin registry |
| **IronClaw** | NEAR AI integration, cloud inference, design-system-driven WebUI | NEAR ecosystem users, cloud-native | "Reborn" refactor, cargo-dist releases, `@ironclaw/ui` package |
| **CoPaw (QwenPaw)** | AgentScope 2.x integration, computer-use automation, chat-first UX | Qwen/AgentScope developers | Framework-native (AgentScope), chat-optimized, community plugins |
| **NanoBot** | Lightweight, security-hardened core; channel breadth | Developers wanting minimal, safe agent | Declarative provider routing, security-by-default posture |
| **ZeroClaw** | Hardened enterprise reliability, governance, LSP/ZeroCode | Enterprise/advanced users, Rust-savvy | Rust core, plugin-owned capabilities, RFC-driven governance |
| **NanoClaw** | Template-driven setup, agent plugins 1.0.0, channel breadth | Onboarding-focused users | Setup wizard, plugin directory format, codex/opencode MCP |
| **PicoClaw** | Lightweight routing, web search providers | Embedded/low-resource users | Focused on agent routing and search modularity |
| **LobsterAI** | Desktop app UX, model configuration | Desktop-first users | Electron renderer, gateway pattern, skills manager |

## 6. Community Momentum & Maturity

**Tier 1 — Rapidly iterating (daily merges, release cadence):**
- **IronClaw** — two release candidates in 24 hours, 19 PRs merged; RC phase with active QA.
- **CoPaw** — beta.4 shipped, 16 PRs merged; pre-release push toward v2.1.0.
- **NanoBot** — 17 PRs merged; security hardening and provider expansion at pace.

**Tier 2 — High volume but shipping bottlenecks:**
- **OpenClaw** — massive issue/PR churn, 13 maintainer PRs authored but no release, critical fixes unmerged; community size is healthy but delivery velocity is the constraint.
- **ZeroClaw** — consistent merge stream (19 PRs) with strong repeat contributors, but a large P1/P2 accepted backlog, a Windows test-failure crisis, and a maintainer-decision queue signal governance stalls.

**Tier 3 — Steady but slower:**
- **NanoClaw** — clear direction (Agent Plugins migration) with stacked dependency; community contributions ongoing.
- **LobsterAI** — post-release wave; all open issues are stale, and the only open PR (hide internal agent sessions) has awaited review for 4+ months.

**Tier 4 — Inactive or no activity this window:**
- **NullClaw, TinyClaw, Moltis, ZeptoClaw, EasyClaw** — no updates; likely dormant or low-signal projects.

## 7. Trend Signals

- **Reliability over features**: The most-voted and most-commented issues across all projects are silent failures — no error, no retry, no notification. The community is running monitoring crons (OpenClaw #121058) to detect what the software hides. For agent developers, this is a clear mandate: fail loudly, retry automatically, and surface recovery paths in the UI.
- **Security is a hard requirement, not an afterthought**: NanoBot's credential-leak fix and ZeroClaw's SSRF gate were user-reported and promptly addressed; CoPaw users explicitly demand permission boundaries for plugin cron/message injection. Agent trust depends on the agent respecting boundaries — both against third parties and against itself (session-history protection).
- **The "silent black box" subagent problem is universal**: Users across OpenClaw, CoPaw, and NanoClaw report being unable to trace, review, or audit subagent behavior and results. There is consistent demand for per-subagent transcripts, delivery confirmation, and status visibility.
- **Cross-platform desktop support is the weakest link**: Windows and macOS bugs (installers, icons, fsync, blank windows, antivirus kills) are widespread and severe. For any project targeting desktop users, investing in CI matrices (ZeroClaw #7461) and platform-specific testing is a clear differentiator.
- **Memory architecture is the next frontier**: Memory trust tagging (OpenClaw), schema-validated memory (ZeroClaw), and memory-prompt accuracy (CoPaw) all point toward users treating memory as a first-class security and correctness surface. Expect more movement here in the coming months.
- **Observability and cost transparency are emerging as decision factors**: OpenRouter cost exposure, Langfuse backends, status commands, and stress-coverage expansion signal that deployment-scale users need answers to "what is my agent doing, and what does it cost?" before scaling usage.

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot Project Digest — 2026-08-13

## 1. Today's Overview

NanoBot shows a high-activity period with 8 issues updated (4 open, 4 closed) and 36 PRs updated (19 open, 17 merged/closed) in the last 24 hours. The project is shipping rapidly, with significant focus on security hardening — including fixes for credential leakage to third-party readers, workspace boundary bypasses, and Docker privilege management. Developer investment is split between infrastructure stability (session lifecycle, MCP provider refactoring) and new feature work (DeepSeek V4 Pro support, TypeScript terminal UI, WebUI session collaboration). No new releases were published today.

## 2. Releases

No new releases were published in the reporting period.

## 3. Project Progress

Seventeen PRs were merged or closed today, reflecting strong forward momentum across several areas:

- **AI Provider Expansion:** PR #5362 adds DeepSeek V4 Pro support through the native Responses API, including an explicit `reasoning.effort: "none"` toggle, and PR #5204 (still open) refactors provider routing to use a declarative `ResponsesCapabilities` profile for OpenAI, GitHub Copilot, and DeepSeek.
- **Security Fixes (merged):**
  - PR #5329 fixes shell tilde expansion workspace-boundary bypasses in `ExecTool`, including named-user paths and input redirections.
  - PR #5258 keeps credential-bearing URLs (userinfo, token/signature query params) away from the remote Jina reader and inspects the local redirect chain before forwarding.
  - PR #5320 restores the minimal capabilities needed for Docker root bootstrap while retaining `cap_drop: ALL` and `no-new-privileges`.
  - PR #5218 hardens `ExecTool` path guarding around redirection and grouping delimiters.
  - PR #5279 moves session transcripts out of the agent workspace to prevent prompt-injection read/write access.
- **Gemini Compatibility (merged):** PR #5230 preserves imported tool calls with signature fallback, fixing replay failures when conversations are transferred from providers without native Gemini signatures.

## 4. Community Hot Topics

The most active discussion item is **Issue #5327** (closed, 11 comments) about Nanobot randomly repeating the same phrase while reasoning. The community engaged deeply on root-cause analysis, and the discussion closed quickly (created Aug 10, closed Aug 12), suggesting a resolution was reached.

Active long-running discussions include:

- **Issue #4010 — Text-to-speech / voice output support** (open, 3 comments, 3 👍) — the highest-reacted open issue, requesting the natural counterpart to existing voice input support. The 3 upvotes over ~3 months indicate sustained but modest interest.
- **Issue #5350 — QwenCloud provider support** (open, created Aug 12) — requests a backward-compatible QwenCloud path alongside existing DashScope support, noting that DashScope provider IDs, keys, and saved configs remain in active use.

PR #5291 (open, updating subagent conversation transcript persistence) also draws attention as it addresses the inability to review subagent tool calls and reasoning after background runs finish.

## 5. Bugs & Stability

Eight issues were updated today, with fixes actively landing for most severity levels:

| Severity | Issue | Status | Fix |
|----------|-------|--------|-----|
| Medium | #5327 — repeated same message during reasoning | **Closed** | Resolved (merged discussion) |
| Medium | #5295 — Docker Compose failure: `entrypoint.sh: Permission denied` | **Closed** | PR #5320 merged (capability restoration) |
| Medium | #5348 — token-usage tests fail in 5hr/day window (UTC vs local timezone) | Open | No fix PR yet |
| Medium | #4884 — WebFetch leaks full URLs to Jina, incl. credentials | **Closed** | PR #5258 merged |
| Low | #4858 — MCP lifecycle leaks into `AgentLoop` (refactor, P2) | **Closed** | Refactor landed |

The timezone-dependent test failure in #5348 is the most notable unresolved bug — it is deterministic but narrow-windowed, and likely a test-layer issue rather than a user-facing defect.

## 6. Feature Requests & Roadmap Signals

Several features in flight or requested suggest clear roadmap direction:

- **DeepSeek V4 Pro** (PR #5362, merged) — new provider support that will be in the next release.
- **TypeScript Terminal UI** (PR #4329, open) — a native OpenTUI client rebuild for `nanobot agent`. Large, long-running PR; likely to land in a future minor/major release.
- **WebUI session collaboration via mentions** (PR #5358, open) — stable `@name` identity for sessions and peer-session selection. The author (chengyongru) is a frequent contributor, so this is likely merged soon.
- **Session transcript persistence for subagents** (PR #5291, open) — reviewable history of background subagent runs.
- **Voice output (TTS)** (Issue #4010) — the most-upvoted open feature request. No PR exists yet, but the issue itself notes the channel-side infrastructure (voice notes) is largely in place. Could be a roadmap candidate.
- **QwenCloud provider compatibility** (Issue #5350, created Aug 12) — new request, no PR activity in reporting window.

## 7. User Feedback Summary

User-reported pain points center on three themes:

1. **Deployment friction:** Issue #5295 shows a concrete Docker Compose failure for users following `deployment.md` exactly. The error (`entrypoint.sh: Permission denied`) appeared despite a published deployment guide, signalling a gap between documentation and the security-hardening changes (privilege drops) that shipped recently. The fix was merged quickly, which is positive.
2. **Conversation correctness:** Repeated-message behavior in reasoning (Issue #5327) undermines trust in agent output quality; the rapid resolution suggests this was a high-priority fix. Subagent transcript persistence (PR #5291) also addresses a "black box" complaint where background agent work is invisible and unreviewable.
3. **Security/privacy expectations:** Credential leakage through WebFetch to a third-party service (Issue #4884) and session-history exposure to the agent (PR #5279) both indicate that users expect privacy boundaries even against the agent itself. Both were closed with fixes promptly.

Satisfaction signals include quick maintainer turnaround (issues closed within hours to days), explicit prioritization labels (p0–p2), and a consistent stream of merged security fixes with tests added.

## 8. Backlog Watch

The following high-signal items have been open for extended periods without maintainer action:

- **PR #4878 — Auto-discovery for agent hooks** (open since Jul 10, conflict label, 33 days) — proposes hook registration via `pkgutil` scanning + `entry_points`, mirroring existing channels/tools patterns. Low complexity, clear scope, but appears stalled despite the author matching existing patterns.
- **PR #4329 — Native TypeScript terminal UI** (open since Jun 13, 61 days) — expected to take time due to scope, but has a conflict label and touches both the gateway and a new client. No maintainer-comment data available in this window.
- **Issue #5275 — Matrix "reply in thread" dedicated context** (open since Aug 6, 7 days) — a channel-parity gap where Matrix threads should behave like Discord/Slack thread contexts, but only one comment so far and no linked PR.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-08-13

## 1. Today's Overview

ZeroClaw is in a period of intense maintenance and hardening activity, with a backlog heavily weighted toward high-risk (P1/P2) fixes across security, cross-platform stability, and reliability. The project has a substantial number of accepted but unresolved issues requiring maintainer attention, alongside a steady stream of high-quality PRs from a strong roster of repeat contributors. The current focus appears to be on addressing significant technical debt — including a Windows test failure crisis and multiple security hardening gaps — while advancing governance and observability features. With zero releases in the last 24 hours, momentum is concentrated on stabilization and feature completion rather than public delivery.

## 2. Releases

No new releases were published in the last 24 hours. The most recent release remains v0.8.3.

## 3. Project Progress

The last 24 hours saw 19 merged or closed PRs, indicating solid progress on closing out long-running branches. Notable merges include:

- **Security hardening for browser tool**: PRs #9362 and #8741 (both closed) validate screenshot destination paths against workspace policy, closing an arbitrary file write escape. The PR is tagged high severity (S1) and was authored by wangmiao0668000666 — a principal contributor.
- **Terminal marker cleanup**: PR #9695 and #9037 (both closed) strip provider terminal markers like `<eom>` from streaming and non-streaming response paths, preventing them from leaking into transcripts, persisted history, and downstream channel delivery.
- **Foreground daemon feedback restored**: PR #9040 (closed) restores the seven-line operator echo lost in a prior change, fixing the blank-terminal problem for `zeroclaw daemon` startup.
- **Telegram channel limits**: PR #8963 (closed) caps Telegram bot commands at 100 to avoid `BOT_COMMANDS_TOO_MUCH` rejection from the API.
- **Performance fix**: PR #8937 (closed) stream-hashes tool args in the loop detector, avoiding per-call deep clones.
- **CI scoping fix**: PR #8874 (closed) properly scopes `rustdoc --default-theme` away from `cargo test --doc`.
- **MCP access policy**: PR #8496 (closed) centralizes deferred-MCP access policy as a single source of truth.

Open PRs awaiting review or merge include major features like the Langfuse observability backend (#9556), credential rotation after rate limits (#9419), WASM plugin wall-clock deadline (#9403), JSONL session migration retry-safety (#9715), and a herdr agent reporting integration (#8337).

## 4. Community Hot Topics

The most engaging discussions reveal heavy operational and architectural concerns:

- **[Issue #7462 — 74 test failures on Windows](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)** (14 comments): Unix-only test commands, path semantics, and console encoding cause 74 failures on Windows 11 Chinese locale. CI only runs on Linux, so this is invisible to automated checks. This is paired with feature request #7461 to add macOS/Windows matrices to CI.
- **[Issue #8692 — Maintainer decision queue tracker](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)** (13 comments): A central tracker logging RFCs, design issues, and release-policy questions awaiting maintainer attention. Signals a need for more structured governance.
- **[Issue #8832 — Plugin-owned Kanban board](https://github.com/zeroclaw-labs/zeroclaw/issues/8832)** (9 comments): An RFC proposing a plugin-owned Kanban domain for coordinating agent work, leveraging host-owned generic capabilities. Suggests demand for more sophisticated multi-agent orchestration.
- **[Issue #9101 — Consolidate release attestation mechanisms](https://github.com/zeroclaw-labs/zeroclaw/issues/9101)** (9 comments) — v0.8.3 shipped with three parallel provenance/signing mechanisms from two PRs that didn't see each other. This is a release-pipeline hygiene issue pointing to CI siloing.
- **[PR #8713 — SSRF gate for file_download](https://github.com/zeroclaw-labs/zeroclaw/pull/8713)** (large, high-risk, open): Adds `allowed_private_hosts` opt-in to the file download tool's SSRF gate. The PR sits in the open queue with the `needs-author-action` label.

The underlying need across these: users and contributors are pushing for a more robust, cross-platform, and secure core, plus clearer governance and decision velocity.

## 5. Bugs & Stability

Several high-severity bugs are open and demanding attention:

- **[Issue #9290 — Windows desktop installer fails with missing TaskDialogIndirect (S1)](https://github.com/zeroclaw-labs/zeroclaw/issues/9290)**: The v0.8.3 Windows desktop binary is broken at launch. This is a showstopper for the Windows desktop experience. No fix PR appears linked yet.
- **[Issue #7527 — macOS desktop app blank window (S1)](https://github.com/zeroclaw-labs/zeroclaw/issues/7527)**: The macOS app can open to a blank page or lose its window after restart. Tagged `r:needs-repro` and `needs-author-action`, so it lacks confirmation.
- **[Issue #9207 — web_fetch returns garbage for compressed responses (S1)](https://github.com/zeroclaw-labs/zeroclaw/issues/9207)**: gzip/brotli/deflate responses come back as unparsable binary data, blocking agents from reading many sites. Tagged `in-progress`, but no linked fix PR surfaced in this data.
- **[Issue #9340 — CLI-created cron jobs discard output (S1)](https://github.com/zeroclaw-labs/zeroclaw/issues/9340)** (closed in the dataset): delivery is hardcoded to `None`, silently discarding all results. Closed but with no visible fix PR in this window — worth verifying how.
- **[Issue #7462 — 74 Windows test failures (S2)](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)**: Pervasive cross-platform test breakage remains the largest stability/quality gap.
- **[Issue #9198 — Discord typing indicator stuck (S3)](https://github.com/zeroclaw-labs/zeroclaw/issues/9198)**: Stuck "typing…" indicator after daemon reload from dashboard.
- **[Issue #9202 — `zeroclaw desktop` uses dead URL, fails to detect AppImage (S3)](https://github.com/zeroclaw-labs/zeroclaw/issues/9202)**: Linux desktop tooling has stale install detection.

Security bugs form a notable cluster: the SSRF gap on file_download (#8713) and browser screenshot path escape (#9362/#8741) show security hardening is an active thread. The bitmaps advisory waiver (RUSTSEC-2026-0247) in [#9899](https://github.com/zeroclaw-labs/zeroclaw/issues/9899) remains an unresolved blocking dependency issue.

## 6. Feature Requests & Roadmap Signals

The feature pipeline points to a strong future emphasis on governance, observability, and multi-surface parity:

- **Governance & workflow**: [RFC: zerocode local pre-submission gate (#8078)](https://github.com/zeroclaw-labs/zeroclaw/issues/8078) would enforce the contributor bar locally before code leaves the machine. Combined with [RFC voting protocol PR (#9499)](https://github.com/zeroclaw-labs/zeroclaw/pull/9499) and the maintainer-decision tracker (#8692), ZeroClaw is professionalizing its OSS governance.
- **Multi-agent orchestration**: The [plugin-owned Kanban board RFC (#8832)](https://github.com/zeroclaw-labs/zeroclaw/issues/8832) and the [execution-tree iteration budget ownership (#9323)](https://github.com/zeroclaw-labs/zeroclaw/issues/9323) suggest deeper agent-work coordination features are on the horizon.
- **Observability**: [Langfuse backend (#9556)](https://github.com/zeroclaw-labs/zeroclaw/pull/9556) and [herdr agent reporting (#8337)](https://github.com/zeroclaw-labs/zeroclaw/pull/8337) both in open PRs — expect rich tracing and agent-status visibility to land soon.
- **Cross-platform parity**: Windows/macOS CI matrices (#7461) and Windows self-update test coverage (#7910) are accepted, suggesting platform reliability is a near-term priority.
- **Coding workflows**: [Opt-in LSP support for ZeroCode (#5907)](https://github.com/zeroclaw-labs/zeroclaw/issues/5907) — requested explicitly to reduce model hallucination — is a strong candidate for the next minor release.
- **Memory and search improvements**: Schema-validated memory consolidation (#6998) and complete SearXNG configuration (#5316) remain accepted and would materially improve agent reliability.

## 7. User Feedback Summary

The most salient user pain points, expressed via concrete bug reports:

- **Windows is a second-class citizen**: Chinese-locale Windows user reports 74 test failures, broken console encoding, and a desktop installer that won't launch. The message is clear: Windows support is aspirational rather than functional today.
- **Agents routinely lose or corrupt output**: CLI cron silently discards all tool output (#9340); web_fetch can't decode common compressed responses (#9207); terminal markers leak into transcripts, persisted history, and downstream channel delivery (#9006/#9695). These erode trust in the agent's ability to produce dependable results.
- **Search and web reliability problems**: DuckDuckGo CAPTCHAs and a request for SearXNG indicate that web-search-dependent agents fail in the field (#5316).
- **Desktop experience is fragile across OSes**: Blank windows on macOS (#7527), dead download URLs and missing AppImage detection on Linux (#9202), broken installer on Windows (#9290) — a consistent cross-platform desktop quality gap.
- **Community desire for better governance**: The maintainer-decision queue (#8692) and repeated RFC-voting improvements (#9499) suggest contributors feel the RFC and acceptance pipeline is slow or opaque.

Satisfaction signals are indirect but positive: a strong core of repeat contributors (wangmiao0668000666, IftekharUddin, Audacity88, JordanTheJet) are submitting large, complex, high-risk PRs — a sign of sustained trust and commitment to the project's direction.

## 8. Backlog Watch

These issues and PRs are important but have stalled, often awaiting author or maintainer action:

- **[Issue #6653 — Host-architecture policy for emulated installs (P3, needs-author-action)](https://github.com/zeroclaw-labs/zeroclaw/issues/6653)**: Open since 2026-05-14 with 7 comments; the superseded PR is closed, but the tracker remains unresolved.
- **[Issue #5907 — Opt-in LSP support for ZeroCode (P2, needs-author-action)](https://github.com/zeroclaw-labs/zeroclaw/issues/5907)**: Highly requested by a user who wants better local-code generation; no movement since April.
- **[Issue #7929 — Unify slash-command registries across surfaces (P2, needs-author-action)](https://github.com/zeroclaw-labs/zeroclaw/issues/7929)**: Acknowledged drift between web UI, ZeroCode, and channel runtime is a real integration hazard.
- **[Issue #6998 — Schema-validated memory consolidation (P2, needs-maintainer-review)](https://github.com/zeroclaw-labs/zeroclaw/issues/6998)**: Fragile JSON prompt-parsing path is a known reliability issue; review is pending.
- **[PR #9002 — Keep agent turns alive after viewer disconnect (P1, needs-maintainer-review)](https://github.com/zeroclaw-labs/zeroclaw/pull/9002)**: Fix for a likely workflow-blocking dashboard behavior; sits awaiting maintainer review for over a month.
- **[Issue #9323 — Execution-tree iteration budget ownership (P2, needs-author-action)](https://github.com/zeroclaw-labs/zeroclaw/issues/9323)**: Core architecture gap — the shared budget is never supplied in production; remains in limbo despite high risk.
- **[Issue #8367 — Derived capability readiness (P3, blocked)](https://github.com/zeroclaw-labs/zeroclaw/issues/8367)**: Blocked and stale since late June; an agent cannot tell "unsupported" from "disabled" capabilities.
- **[Issue #9899 — Triage and remove bitmaps advisory waiver (P1, blocked)](https://github.com/zeroclaw-labs/zeroclaw/issues/9899)**: Security CI is currently failing on RUSTSEC-2026-0247. This tracker is blocked and demands immediate maintainer attention.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

**PicoClaw Project Digest — 2026-08-13**

## Today's Overview
PicoClaw is in a steady-state development phase with no new releases shipped this period. Activity is moderate: two stale bug issues remain open and active, while three pull requests are awaiting review or merge, none of which were merged or closed in the last 24 hours. The project is focused on polishing the agent routing subsystem, Telegram topic support, and expanding web search provider options. Maintainers appear to be prioritizing backlog review over fast-tracking new merges, as evidenced by the accumulation of open PRs.

## Releases
No new releases were published in the last 24 hours.

## Project Progress
No pull requests were merged or closed in the last 24 hours. The three open PRs represent pending work that has not yet advanced to the main branch. These include a significant fix for routed-agent context management, a Telegram topic enhancement for private chats, and a new Exa web search provider integration.

## Community Hot Topics
- **[#3281: Web UI chat input is very laggy with longer history](https://github.com/sipeed/picoclaw/issues/3281)** — 4 comments, 1 👍. This issue is actively discussed, indicating users are hitting performance degradation in the web interface as sessions grow. The underlying need is a smoother, more scalable frontend for long conversations, possibly requiring virtualization or incremental rendering.
- **[#3269: MCP server failure hangs the agent loop](https://github.com/sipeed/picoclaw/issues/3269)** — 4 comments, 1 👍. A critical reliability concern where a failed MCP connection stalls the entire agent, freezing chat responses. This touches on fault tolerance and health-checking in the agent loop.

## Bugs & Stability
1. **High — [#3269: MCP server connection failure hangs the agent loop](https://github.com/sipeed/picoclaw/issues/3269)** — This is a systemic stability bug affecting all channels (Discord, Web, etc.). Severity is high because it fully blocks agent responses with no automatic recovery. No fix PR is currently open.
2. **Medium — [#3281: Web UI input lag with long chat history](https://github.com/sipeed/picoclaw/issues/3281)** — A performance regression, not a crash, but it degrades UX enough to make the interface nearly unusable in data-rich sessions. No fix PR is open.

## Feature Requests & Roadmap Signals
- **PR #3299: Native Exa web search provider** — Adding Exa as a `tools.web` provider expands the search backend options and is likely to be merged soon, as it follows the existing provider pattern. This signals a roadmap focus on flexible, modular search integrations.
- **PR #3315: Topics in private bot chats** — A niche Telegram feature but important for users leveraging forum-topic mode in private group contexts. This could indicate broader multi-platform parity improvements.
- **PR #3316: Routed-agent context management** — Fixes history, summarization, and compaction for routed agents. This is a core quality-of-life fix and strongly signals a roadmap emphasis on robust multi-agent dispatch semantics.

## User Feedback Summary
Users are reporting real friction in two main areas: session scalability and external service failure handling. The laggy Web UI issue suggests disappointment with the frontend’s handling of moderately long contexts. The MCP hang issue reflects frustration with brittle integrations — a single service failure should not lock the whole system. Positively, the presence of contributor-driven PRs (e.g., Exa provider, Telegram topics) shows a healthy ecosystem of users willing to build features they need rather than just filing requests.

## Backlog Watch
- **PR #3316: Routed-agent context management** — Open since 2026-08-03, 10 days without merge. This is a critical bug fix for routed agents; further delay risks compounding user-reported confusion around agent memory behavior.
- **PR #3299: Exa web search provider** — Open since 2026-07-26, 18 days in review. This is a clean, additive feature; maintainers should consider a decision soon to avoid PR staleness.
- **Issue #3269: MCP hang** — Though not neglected (4 comments), it lacks a linked fix. The project should prioritize a maintainer response or investigation update to prevent user churn.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

**NanoClaw Project Digest — 2026-08-13**

**1. Today's Overview**

Project activity is moderate, with 4 issues and 10 PRs updated in the last 24 hours. The core team is actively driving a major architectural migration (Agent Plugins 1.0.0, PR #3220) that has a stacked dependency of setup-wizard work waiting to merge. Community contributions continue steadily, particularly around channel integrations (Telegram, Dial, Signal, WhatsApp) and quality-of-life skill fixes. No new releases were published in this window. Overall, the project is in a healthy state with clear maintainer direction and a responsive core team.

**2. Releases**

No new releases were published in the last 24 hours.

**3. Project Progress**

- **Merged/Closed:** PR #3086 (closed) — **fix(whatsapp): validate recipient exists before sending**. Prevents false-success delivery logs when a recipient number is not registered on WhatsApp, by validating the recipient before invoking Baileys' `sendMessage`.
- **Active Core Work:** PR #3220 ([core-team] agent templates become Agent Plugins 1.0.0 directories) is the central engine change; it includes security hardening (stamp-time symlink/caps/secret hardening) and a format migration for templates. This is a stacked with PR #2909 (setup wizard template flow and first-agent stamping), expected to merge after.
- **Feature Development:** PR #3050 (add Dial channel to picker/wizard), PR #3193 (Telegram Chat SDK update for rich messages), and PR #3231 (codex/opencode plugin MCP cwd support) all remain open and active.

**4. Community Hot Topics**

- **Issue #2504** — `ncl status` command for lightweight operational health check. Open since May, with 1 comment. It addresses a gap between `sessions list` (no health signals) and the external `/add-dashboard` skill. Indicates community desire for built-in, lightweight observability without external dependencies.
- **PR #3220** and **PR #2909** (both core-team) — the Agent Plugins migration train. Heavy attention and a clear dependency chain; this is the most structurally significant ongoing effort, signaling a shift from ad-hoc templates to a formal plugin directory format.
- **PR #2346** — fix(formatter): treat unknown slash commands as normal chat. Open since May 8. The issue (SDK silently dropping responses) is a meaningful usability bug; the long open duration suggests formatter logic complexity.

**5. Bugs & Stability**

- **High — Issue #3234:** Agent groups created via `--template` get a bare UUID (no `ag-` prefix), causing OneCLI `ensureAgent` to reject the identifier. Affects template-based group creation only. No fix PR linked yet.
- **High — Issue #3233:** Agent-scoped `ncl tasks` is blind to pre-2.1.54 recurring tasks after migration. Legacy rows are not rehomed, breaking list/get/pause/resume/cancel for existing users upgrading. No fix PR linked yet.
- **Medium — PR #3086 (closed/fixed):** WhatsApp false-delivery logs resolved.
- **Medium — PR #2689 (open):** Signal DM platform ID inconsistency and `isMention` flag dropped; first messages silently lost and messaging groups never registered. Fix proposed but not yet merged.
- **Low — PR #2346 (open):** Unknown slash commands are silently dropped due to misclassification as passthrough.

**6. Feature Requests & Roadmap Signals**

- **Issue #3232:** Proposal to add QwenCloud as an optional provider skill via `/add-qwencloud`, following the existing provider-skill modular pattern. Low implementation cost; likely candidate for a future release if a maintainer or contributor picks it up.
- **Issue #2504:** `ncl status` command — aligns with the project's trend toward operational self-awareness; could be paired with future dashboard/skill improvements.
- **PR #3050:** Dial channel support — reflects steady expansion of supported messaging platforms beyond the common set.

**7. User Feedback Summary**

- Recurring pain point: **operational visibility** (Issue #2504) — users want quick health checks without external setup.
- Upgrade friction: **post-migration breakage** (Issue #3233) — users report features that simply stop working after a version bump, pointing to a need for a more robust migration path for task data.
- Silent failures: WhatsApp (PR #3086) and Signal (PR #2689) both demonstrate that delivery and group-registration failures were previously invisible to users, undermining trust in channel reliability.
- Mixed experience with agent templates: the `ag-` prefix bug (Issue #3234) creates a confusing edge case where a documented workflow (template) produces an unusable agent ID.

**8. Backlog Watch**

- **PR #2346** (open since 2026-05-08): formatter fix for unknown slash commands. Long-standing, user-visible bug with a proposed solution; worth maintainer review or explicit closure.
- **Issue #2504** (open since 2026-05-15): `ncl status` feature request. Only 1 comment; could use a maintainer response on feasibility or intended direction.
- **PR #2689** (open since 2026-06-04): Signal channel fixes. Significant functional gaps (silently dropped DMs); the longer it sits, the longer Signal users face unreliable messaging behavior.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-08-13

## Today's Overview

IronClaw is in an active release-candidate phase with two patch releases shipped yesterday (v1.2.0-rc.2 and v1.2.0-rc.3), both addressing container healthcheck and Windows filesystem issues. Development velocity is high: 41 issues were updated in the last 24 hours (29 open/active) and 50 PRs were touched (31 open, 19 merged/closed). A significant QA bug-bash is underway, with over a dozen new Telegram-related bugs filed yesterday alone, signaling a focused push on channel reliability ahead of v1.2.0 stable. The project continues to show strong architectural discipline, with multiple large PRs (XL size) advancing the Reborn refactor across storage, tooling, and the WebUI design system.

## Releases

Two release candidates shipped yesterday, both patch-level fixes on the 1.2.0 line:

- **ironclaw-v1.2.0-rc.3** (2026-08-12): Fixed the runtime container image to install `curl`, enabling orchestrator healthchecks (`curl -fsS http://localhost:3000/`) to execute. Previously the image shipped no HTTP client, so probes could never run and containers were never marked healthy.
- **ironclaw-v1.2.0-rc.2** (2026-08-12): Fixed Windows first-start filesystem publication to use native atomic rename semantics instead of hard links, and tolerate unsupported directory syncs. Release smoke runs now preserve the Windows account identity required to secure the standalone secrets key.

No breaking changes or migration notes were announced for either release candidate.

## Project Progress

Nineteen PRs were merged or closed in the last 24 hours. Notable advances:

- **Container reliability** — [#7555](https://github.com/nearai/ironclaw/pull/7555) (closed) forward-ported the `curl` installation fix from the 1.1.0-rc.1 release line onto the current branch, addressing the healthcheck failure that blocked orchestration.
- **Release infrastructure** — [#7560](https://github.com/nearai/ironclaw/pull/7560) (closed) added retry logic for the cargo-dist installer download after the rc.3 release failed 18 seconds in due to a flaky network connection. [#7427](https://github.com/nearai/ironclaw/pull/7427) (closed) prepared 1.1.1-rc.1 with backported fixes for IronHub/custom MCP, WebUI, retrieval, runtime credentials, Slack, and Telegram.
- **Admin configuration UX** — [#7550](https://github.com/nearai/ironclaw/pull/7550) (closed) added per-field help text to admin configuration forms (manifest fields now support an optional `description` rendered as a hint), with the Telegram manifest as the first consumer. Also rewrote channel setup documentation.
- **Google extension efficiency** — [#5503](https://github.com/nearai/ironclaw/pull/5503) (closed, experiment) added compact capability surfaces: `gmail.fetch_message_summaries` for inbox triage without full-message fanout, plus compact Google Calendar equivalents.
- **WebUI design system** — [#6836](https://github.com/nearai/ironclaw/pull/6836) (closed) re-derived the `@ironclaw/ui` workspace package cleanly from latest main, superseding earlier attempts, built in five reviewable layers.

## Community Hot Topics

The most active discussions center on infrastructure-scale changes rather than surface-level issues:

- **[#7360 — Expand stress coverage across built-in and durable write paths](https://github.com/nearai/ironclaw/issues/7360)** (3 comments) — The nightly API-capacity workload only exercises conversation persistence and read endpoints; its mock model never returns tool calls, so regressions in built-in capability writes can ship untested. This signals a systematic effort to harden the write path under load.
- **[#7407 — Execute BatchPolicy::Parallel capability batches concurrently](https://github.com/nearai/ironclaw/issues/7407)** (3 comments, closed) — The agent loop computes a parallel batch policy for multi-tool-call turns, but production executes every batch sequentially. The fix adds bounded concurrency to `invoke_capability_batch` with zero model-facing changes.
- **[#7554 — Custom MCP server add flow shows validation error](https://github.com/nearai/ironclaw/issues/7554)** (1 comment) — User-reported via Slack: the Custom MCP flow shows a red validation error and refuses to add the server. Filed as a bug, current status open.

The underlying need across all three is reliability of the extension/tool surface — the project is investing heavily in making capability invocation correct, concurrent, and well-tested.

## Bugs & Stability

A large QA bug-bash wave landed yesterday, dominated by Telegram channel issues. Ranked by severity:

**P1 (critical):**
- **[#7538 — Telegram agent becomes completely stuck after GIF/sticker](https://github.com/nearai/ironclaw/issues/7538)** — Session becomes permanently unresponsive after non-text media; even text messages stop getting replies.
- **[#7536 — Multi-user access flow broken (“Invalid secret”)](https://github.com/nearai/ironclaw/issues/7536)** — Users created from the Admin UI receive credentials but cannot open the UI.
- **[#7535 — Telegram webhook not activated after saving bot config](https://github.com/nearai/ironclaw/issues/7535)** — Bot only starts working after a full redeploy; "Forbidden" errors observed.

**P2 (high):**
- **[#7541 — Agent cannot send generated files as Telegram attachments](https://github.com/nearai/ironclaw/issues/7541)** — Agent provides local workspace path as a Markdown link instead of the file itself.
- **[#7539 — User message appears after agent starts working](https://github.com/nearai/ironclaw/issues/7539)** — Conversation flow appears out of order in the WebUI.
- **[#7540 — Long Telegram messages split and partially missed](https://github.com/nearai/ironclaw/issues/7540)** — Only the first segment of a split message is processed.
- **[#7542 — Agent unaware conversation is already in Telegram](https://github.com/nearai/ironclaw/issues/7542)** — Offers "Want this delivered to your Telegram?" while already in Telegram.
- **[#7543 — Routine succeeds but message not delivered first run](https://github.com/nearai/ironclaw/issues/7543)** — Recurring routine generates the summary but delivery fails on first execution.
- **[#7544 — Agent exposes internal reasoning to user](https://github.com/nearai/ironclaw/issues/7544)** — Raw planning steps and tool documentation leak into chat output.
- **[#7545 — Agent falsely claims no crypto market data available](https://github.com/nearai/ironclaw/issues/7545)** — Refuses multi-token price queries despite general HTTP tooling.
- **[#7451 — Agent incorrectly asks for credentials](https://github.com/nearai/ironclaw/issues/7451)** — Requests API keys when none should be needed.
- **[#7508 — GitHub MCP startup gives confusing endpoint prompt](https://github.com/nearai/ironclaw/issues/7508)** — Reports "already registered" then raises endpoint verification concerns.

**P3 (low):**
- **[#7546 — Agent ignores Telegram stickers](https://github.com/nearai/ironclaw/issues/7546)** — Silent, no acknowledgement.
- **[#7547 — Instance upgrade fails during egress apply](https://github.com/nearai/ironclaw/issues/7547)** — Container switches successfully but egress apply errors on staging.

Fix PRs exist for several: the webhook activation issue may relate to [#7550](https://github.com/nearai/ironclaw/pull/7550)'s Telegram manifest work, and the release-line backports in [#7427](https://github.com/nearai/ironclaw/pull/7427) mention Telegram fixes. No direct fix PRs are yet linked against the P1 Telegram stuck-state or multi-user access bugs.

## Feature Requests & Roadmap Signals

- **[#7537 — Generic per-request thinking/effort control](https://github.com/nearai/ironclaw/issues/7537)** — A per-request thinking level mapped to provider-native parameters (DeepSeek V4 Flash via NEAR AI is the trigger case). This is a cross-cutting LLM-path feature likely to land soon given the explicit trigger case from the 0731 checkpoint.
- **[#7517 — Cloud.near.ai staking path for Google/GitHub sign-ins](https://github.com/nearai/ironclaw/issues/7517)** — Users want to attach a NEAR wallet to an existing Google/GitHub account to stake for inference; currently Stripe is the only credit path.
- **[#7044 — Onboarding to channel-first approach](https://github.com/nearai/ironclaw/issues/7044)** — Epic (v1.4.0) focused on the blank-slate first-run experience; backend wiring is being tracked in [#6993](https://github.com/nearai/ironclaw/issues/6993). The OOBE automation-tasks prototype PR [#6994](https://github.com/nearai/ironclaw/pull/6994) is open with an off-by-default flag.
- **[#7038 — Epic: Storybook + AI-first Design System](https://github.com/nearai/ironclaw/issues/7038)** — Multi-phase effort (v1.3.0); phases 1–3 have open PRs ([#7039](https://github.com/nearai/ironclaw/pull/7039), [#7043](https://github.com/nearai/ironclaw/pull/7043), [#7558](https://github.com/nearai/ironclaw/pull/7558)) moving toward a first-class `@ironclaw/ui` package.
- **[#7520 — Epic: retire superseded WebUI surfaces](https://github.com/nearai/ironclaw/issues/7520)** — Remove frontend code from retired v1/engine-v2 surfaces, explicitly excluding unfinished features (Jobs) that may get Reborn implementations.

The thinking/effort control feature is the most likely candidate for the next minor release given its concrete provider trigger and generic design.

## User Feedback Summary

The dominant user pain point this week is **Telegram channel reliability and UX**. QA-reported bugs cluster around media handling (stuck sessions on GIFs/stickers), message ordering confusion, split-message processing, attachment delivery, and context-awareness (the agent not knowing it is already in Telegram). These indicate real end-user friction in a primary channel, not cosmetic issues.

The **multi-user access failure** ([#7536](https://github.com/nearai/ironclaw/issues/7536), P1) is a serious blocker for collaboration use cases — the instance cannot be shared reliably, which undermines a core value proposition.

On the positive side, the admin configuration help-text work ([#7550](https://github.com/nearai/ironclaw/pull/7550)) directly addresses operator confusion about form fields, and the Google extension compact capabilities ([#5503](https://github.com/nearai/ironclaw/pull/5503)) were requested for efficiency. The Custom MCP validation error ([#7554](https://github.com/nearai/ironclaw/issues/7554)) blocks extension adoption for affected users.

Satisfaction signals are mixed: the team is shipping fixes rapidly (two release candidates in one day), but the volume of P1/P2 Telegram bugs suggests the channel is not yet production-grade.

## Backlog Watch

- **[#5508 — Slack delivery target not found despite active connection](https://github.com/nearai/ironclaw/issues/5508)** — Open since July 1 (42 days). QA-reported P2; new routines cannot find the Slack delivery target even though old routines work. No linked fix PR despite the [#7427](https://github.com/nearai/ironclaw/pull/7427) backport mentioning Slack fixes. This may indicate an incomplete fix.
- **[#6541 — WebUI constantly reconnecting](https://github.com/nearai/ironclaw/issues/6541)** — Open since July 23 (21 days). Labeled v1-launch-checklist; confusing but non-blocking. Closed yesterday, but the label suggests it is on the critical path for launch. Closed as of the last 24h.
- **[#7383 — chore: track decomposition of tool_disclosure_port.rs (4.4k lines)](https://github.com/nearai/ironclaw/issues/7383)** — Closed, but signals a maintenance debt item: a single 4.4k-line file violates the architecture rule (>3,000 lines requires a decomposition tracking issue). The closing of the tracking issue without a visible decomposition PR may warrant follow-up.
- **[#7042 — Design System Phase 2: DESIGN.md governance](https://github.com/nearai/ironclaw/issues/7042)** — Open since August 3 (10 days); part of the v1.3.0 epic, with [#7043](https://github.com/nearai/ironclaw/pull/7043) open but showing no recent commits — may need maintainer attention to keep the epic timeline.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

## LobsterAI Project Digest — 2026-08-13

### 1. Today's Overview
LobsterAI shows moderate activity, with 6 issues and 8 PRs updated in the last 24 hours. Development velocity is healthy, driven primarily by a coordinated release wave (PR #2480) and a cluster of bug fixes landing simultaneously. Notably, all 7 closed/merged PRs were updated on 2026-08-12, indicating a focused push for the 2026.8.12 release. User issue activity is low (no new issues opened today), and all issues in the queue are marked stale, dating back to March–May 2026. Maintainer attention appears split between advancing the frontend UI and resolving cross-platform Windows/macOS compatibility issues reported by users.

### 2. Releases
No new releases were published in the last 24 hours. The most recent release referenced in PR activity is **2026.8.12** (via PR #2480). No breaking changes or migration notes are available at this time.

### 3. Project Progress
Seven PRs were closed/merged today, indicating a successful release push:
- **[#2482](https://github.com/netease-youdao/LobsterAI/pull/2482)** — *feat: skills manager split mine builtin tabs* (area: renderer). Splits skills manager UI into "Mine" and "Builtin" tabs, a UX improvement for skill organization.
- **[#2481](https://github.com/netease-youdao/LobsterAI/pull/2481)** — *feat(sidebar): move task search to header actions* (area: renderer, cowork). Replaces labeled search entry with an icon-only action; aligns appearance/layout across macOS/Windows; adds diagnostics and regression coverage.
- **[#2480](https://github.com/netease-youdao/LobsterAI/pull/2480)** — *Release/2026.8.12* (area: renderer, main). Release branch merge; body appears partially templated.
- **[#2479](https://github.com/netease-youdao/LobsterAI/pull/2479)** — *fix(plugins): preserve junctions during Windows install* (area: main). Fixes `EPERM` symlink failures on Windows by staging installs on the same volume and atomically renaming into place; also validates manifests and restores valid previous plugin versions on failure.
- **[#2478](https://github.com/netease-youdao/LobsterAI/pull/2478)** — *fix(shell): avoid unsupported large file icon size on macOS/Windows* (area: main). Fixes Electron crash/failure when calling `app.getFileIcon` with size `'large'` on macOS; only uses `'large'` on Linux.
- **[#2475](https://github.com/netease-youdao/LobsterAI/pull/2475)** — *fix(model-selector): give each model its own thinking level* (area: renderer). Fixes a bug where thinking strength was global across models (setting one model's level reset another's); each model now retains its own setting.
- **[#1233](https://github.com/netease-youdao/LobsterAI/pull/1233)** — *feat(model): add official website links & API key guides for model providers* (stale, closed). Resurrects PR #731 with code-review fixes—links to provider websites and "Get API Key" shortcuts, with i18n support. Also merges two duplicate URL tables into one.

### 4. Community Hot Topics
Activity is low across all issues today, with no issue receiving more than 2 comments:
- **[#2071](https://github.com/netease-youdao/LobsterAI/issues/2071)** — *创建定时任务错误 (Scheduled task creation error)* — Closed. Reported on 2026.5.27 build; screenshot attached. A closed status suggests either a fix has been shipped or the issue was resolved in a recent release.
- **[#1179](https://github.com/netease-youdao/LobsterAI/issues/1179)** — *3.31版本强制沙箱怎么关？(How to disable forced sandbox in 3.31?)* — Open. User reports version 3.31 forces sandbox mode with no visible toggle; rollback to 3.30 restores normal behavior. This is a potential usability regression.
- **[#1236](https://github.com/netease-youdao/LobsterAI/issues/1236)** — *[bug] 插件 ID 不匹配警告 (MCP-bridge plugin ID mismatch warning)* — Closed. Config warning on every gateway restart due to a mismatch between the configuration `entry key` and the plugin manifest's declared ID. No regression signal at this time.
- **[#1180](https://github.com/netease-youdao/LobsterAI/issues/1180)** — *修改自建agent可能会触发网关反复重启 (Editing a custom agent may trigger repeated gateway restarts)* — Open. Reproducible on 2026.3.31; editing a custom agent's icon triggers a restart loop; deleting the agent restores stability.

### 5. Bugs & Stability
Ranked by severity:

1. **High — Recurring gateway restart loop** ([#1180](https://github.com/netease-youdao/LobsterAI/issues/1180), open). Editing a custom agent's icon triggers repeated gateway restarts; deleting the agent resolves it. Likely a configuration-watch or event-feedback bug in the agent editor. No linked fix PR yet.
2. **High — Forced sandbox mode in v3.31** ([#1179](https://github.com/netease-youdao/LobsterAI/issues/1179), open). Users report no way to disable the sandbox after update; rollback as workaround. No fix PR observed.
3. **Medium — Plugin ID mismatch warning on startup** ([#1236](https://github.com/netease-youdao/LobsterAI/issues/1236), closed). Non-fatal but noisy; warning shown at every gateway start. Closed without a visible fix PR, so it is unclear whether a fix shipped.
4. **Medium — Scheduled task creation error** ([#2071](https://github.com/netease-youdao/LobsterAI/issues/2071), closed). Reported for build 2026.5.27; closed status suggests a fix was included in a newer release.
5. **Low — App remains functional after uninstall** ([#1173](https://github.com/netease-youdao/LobsterAI/issues/1173), open). Windows uninstall leaves the running LobsterAI window operational and able to send messages; the user raised a privacy/backdoor concern. This is expected Windows behavior (processes survive uninstall while running) but should be communicated clearly.

Today's merged PRs [#2479](https://github.com/netease-youdao/LobsterAI/pull/2479) and [#2478](https://github.com/netease-youdao/LobsterAI/pull/2478) directly address Windows/macOS stability issues from earlier reports (plugin install failures and icon-size crashes).

### 6. Feature Requests & Roadmap Signals
- **Multiple custom model providers** ([#1174](https://github.com/netease-youdao/LobsterAI/issues/1174), open, stale). User requests the ability to configure more than one custom model provider while preserving old ones. This aligns with recent model-selector improvements (PR #2475) and the added provider links (PR #1233), signaling active investment in model configuration UX. It is plausible this lands in a future release.
- **Per-model thinking level** (PR #2475) shipped today, indicating the team is iterating on model-selector ergonomics—this supports the idea that further provider-configuration enhancements are likely.
- **OpenClaw main agent session hidden** (PR #1181, open since 2026-04-01). A long-standing fix to hide internal agent sessions from the user-facing cowork list. It remains open and is the only open PR, suggesting it may be blocked or awaiting review.

### 7. User Feedback Summary
- **Frustration with forced changes**: The sandbox complaint ([#1179](https://github.com/netease-youdao/LobsterAI/issues/1179)) reflects user dissatisfaction with removal of configuration choices in updates. This mirrors an earlier complaint about being forced into default security postures without clear opt-out paths.
- **Uninstall behavior confusion** ([#1173](https://github.com/netease-youdao/LobsterAI/issues/1173)): A user raised concerns about the app continuing to run after uninstall, phrasing it as a potential backdoor. This indicates a trust/communication gap—users are not informed that uninstall does not terminate already-running processes.
- **Configuration warnings erode trust**: The plugin ID mismatch warning ([#1236](https://github.com/netease-youdao/LobsterAI/issues/1236)) may seem minor, but recurring warnings at every startup tend to make users question install integrity.
- **Positive momentum on model configuration**: Users have been actively requesting multi-provider support and better per-model controls. The merged PRs addressing per-model thinking levels and provider links directly respond to these needs, which should improve satisfaction among power users.

### 8. Backlog Watch
- **[PR #1181](https://github.com/netease-youdao/LobsterAI/pull/1181)** — *fix(cowork): hide OpenClaw main agent sessions from session list*. Open since 2026-04-01 (4+ months), with no reviewer activity visible. This addresses a real user-facing confusion issue (internal agent sessions appearing in the cowork list). It needs maintainer review or explicit closure.
- **[#1179](https://github.com/netease-youdao/LobsterAI/issues/1179)** — *Forced sandbox in v3.31*. Open since 2026-03-31 (4.5 months), with 2 comments and no maintainer response. High-impact usability regression with no workaround other than version rollback. Needs an official response or documentation of the sandbox rationale.
- **[#1174](https://github.com/netease-youdao/LobsterAI/issues/1174)** — *Multiple custom model providers*. Open since 2026-03-31, 1 comment, no maintainer signal. A clean feature request with clear use cases; it should either be triaged into the roadmap or acknowledged.
- **[#1180](https://github.com/netease-youdao/LobsterAI/issues/1180)** — *Gateway restart loop when editing custom agents*. Open since 2026-03-31, 1 comment, no maintainer response. This is a stability issue that likely affects other users; it deserves reproduction attempts or a fix-backport to the 3.31 line.
- All six issues in the queue are flagged `stale`, indicating the maintainers have not actively triaged these older items for some time.

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw Project Digest — 2026-08-13

## 1. Today's Overview

CoPaw (QwenPaw) is in a highly active pre-release phase, with 30 issues and 43 PRs updated in the last 24 hours. A new beta release (v2.1.0-beta.4) shipped with bug fixes for file previews, tool descriptions, and dark mode styling. The project shows strong momentum toward v2.1.0 final, with significant activity around context compression fixes, memory pipeline corrections, and multi-agent session stability. Major community concerns cluster around agent task interruption, session management bugs, and plugin permission security gaps.

## 2. Releases

**v2.1.0-beta.4** ([release](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.1.0-beta.4))

Changes:
- `fix(files)`: repair previews and dark mode styling ([PR #6915](https://github.com/agentscope-ai/QwenPaw/pull/6915))
- `fix(tools)`: correct `read_file` tool description ([PR #6898](https://github.com/agentscope-ai/QwenPaw/pull/6898))
- Version bump to 2.1.0b4

No breaking changes or migration notes are associated with this patch release.

## 3. Project Progress

**Merged/Closed PRs (16 total):**

- **`fix(chats): handle dict-like model responses`** — [PR #6816](https://github.com/agentscope-ai/QwenPaw/pull/6816) merged for issue [#6813](https://github.com/agentscope-ai/QwenPaw/issues/6813), fixing `KeyError: '__aiter__'` in auto-title generation when using AgentScope 2.x `ChatResponse` dict subclasses
- **`fix(agents): sanitize tool messages before model calls`** — [PR #6540](https://github.com/agentscope-ai/QwenPaw/pull/6540) merged, fixing orphaned tool results reaching providers (issue [#6407](https://github.com/agentscope-ai/QwenPaw/issues/6407))
- **`fix(computer-use): improve macOS element activation`** — [PR #6913](https://github.com/agentscope-ai/QwenPaw/pull/6913) merged, addressing transient menus and composite accessibility elements
- **`fix(creator)`: composer-gate improvements** — [PR #6937](https://github.com/agentscope-ai/QwenPaw/pull/6937) merged, including DAG production hardening, vendor runtime bootstrap, and fail-closed plugin packaging
- **`chore: update release notes for v2.1.0`** — [PR #6944](https://github.com/agentscope-ai/QwenPaw/pull/6944) merged
- **Revert of dict-like model responses fix** — [PR #6956](https://github.com/agentscope-ai/QwenPaw/pull/6956) closed, reverting PR #6816 (likely due to regressions—see Bugs section)

**Active PRs Under Review (highlights):**

- **`fix(#6826): display actual assistant reply completion time`** — [PR #6938](https://github.com/agentscope-ai/QwenPaw/pull/6938) by yutai78786, ready for human review
- **`fix(#6541): use SystemMsg for scroll compression placeholder`** — [PR #6947](https://github.com/agentscope-ai/QwenPaw/pull/6947) by yutai78786, fixes DeepSeek `MODEL_EXECUTION_ERROR`
- **`feat(pawapp): add native DataPaw app runtime`** — [PR #6940](https://github.com/agentscope-ai/QwenPaw/pull/6940) by cyruszhang (first-time contributor), introducing a durable analysis workspace
- **`perf: stabilize LLM prefix cache`** — [PR #6953](https://github.com/agentscope-ai/QwenPaw/pull/6953) by lovedheart (first-time contributor), sorting tool schemas and splitting `env_context` fields
- **`fix(providers): coerce string-typed tool args`** — [PR #6936](https://github.com/agentscope-ai/QwenPaw/pull/6936) by yutai78786, addressing issue [#6839](https://github.com/agentscope-ai/QwenPaw/issues/6839)
- **`feat(channels): add MiniMax TTS support`** — [PR #6954](https://github.com/agentscope-ai/QwenPaw/pull/6954) by octo-patch
- **`fix(memory): simplify long-term memory guidance`** — [PR #6942](https://github.com/agentscope-ai/QwenPaw/pull/6942) by jinliyl, closes [#6853](https://github.com/agentscope-ai/QwenPaw/issues/6853)
- **`docs: bilingual long-term memory blog`** — [PR #6949](https://github.com/agentscope-ai/QwenPaw/pull/6949) and **`docs: Files workspace blog`** — [PR #6950](https://github.com/agentscope-ai/QwenPaw/pull/6950) by jinliyl

## 4. Community Hot Topics

1. **`prompts.py lies to agents`** — [Issue #6853](https://github.com/agentscope-ai/QwenPaw/issues/6853) (5 comments). Documentation mismatch between memory prompt claims and actual Dream pipeline behavior. Actively being addressed in [PR #6942](https://github.com/agentscope-ai/QwenPaw/pull/6942).

2. **Task stops without notice** — [Issue #6921](https://github.com/agentscope-ai/QwenPaw/issues/6921) (5 comments). Agent frequently stops mid-task after outputting planning phrases like "Now 2.1, 3.1, 3.2. Let me do all three." with no visible error, requiring user to say "继续" to resume. High-impact usability bug on v2.1 beta 2.

3. **MCP tool numeric string coercion** — [Issue #6839](https://github.com/agentscope-ai/QwenPaw/issues/6839) (4 comments). MCP tool calls pass numeric-looking strings as numbers, causing schema validation failures. Fix PR [#6936](https://github.com/agentscope-ai/QwenPaw/pull/6936) under review.

4. **Idle crash after tens of minutes** — [Issue #6780](https://github.com/agentscope-ai/QwenPaw/issues/6780) (4 comments). v2.0.1 freezes when unused, requiring process kill and restart.

5. **Inter-agent message session explosion** — [Issue #6918](https://github.com/agentscope-ai/QwenPaw/issues/6918) (2 comments). Each inter-agent message spawns a new agent session, causing duplicate "shadow instances." Related enhancement request [#6925](https://github.com/agentscope-ai/QwenPaw/issues/6925) asks for collaborative agent conversations within a single session window.

## 5. Bugs & Stability

**High Severity:**

- **`sync.py` orphaned rows in history DB** — [Issue #6926](https://github.com/agentscope-ai/QwenPaw/issues/6926) (closed). Session snapshots imported under random `AgentState` UUID instead of real session_id; 18–50% of rows orphaned in every agent. Will require a migration/backfill script for affected users.
- **Network recovery failure** — [Issue #6932](https://github.com/agentscope-ai/QwenPaw/issues/6932). After transient network interruption, QwenPaw fails to recover; all LLM requests persistently fail with `httpx.ConnectTimeout` until manual restart. Reproduced twice in one day.
- **Rollback of title-generation fix** — [PR #6956](https://github.com/agentscope-ai/QwenPaw/pull/6956) reverted [PR #6816](https://github.com/agentscope-ai/QwenPaw/pull/6816), re-opening [Issue #6813](https://github.com/agentscope-ai/QwenPaw/issues/6813) likely due to regressions.
- **Agent stops silently mid-task** — [Issue #6921](https://github.com/agentscope-ai/QwenPaw/issues/6921). No fix PR yet.

**Medium Severity:**

- **Scroll compression erases transcript** — [Issue #6951](https://github.com/agentscope-ai/QwenPaw/issues/6951). After context compression, pre-compression chat history invisible in UI, showing only internal eviction index. Fix PR [#6947](https://github.com/agentscope-ai/QwenPaw/pull/6947) addresses a related DeepSeek error but not the visibility issue.
- **Timeout state not reset** — [Issue #6955](https://github.com/agentscope-ai/QwenPaw/issues/6955). Intermittent startup crash on Windows (pip install, v2.0.1). Stack trace in asyncio `windows_events.py`.
- **Multi-subagent dead loops** — [Issue #6927](https://github.com/agentscope-ai/QwenPaw/issues/6927). Dead-loop hangs when invoking multiple subagents.
- **Front-end renderer collapses long tool output** — [Issue #6852](https://github.com/agentscope-ai/QwenPaw/issues/6852) (closed). Multi-line outputs become an unreadable blob.
- **History/input bar bug** — [Issue #6928](https://github.com/agentscope-ai/QwenPaw/issues/6928). Historical messages cannot scroll; editing selected text deletes following content.

**Low Severity / Cosmetic:**
- **Tool config resets after upgrade** — [Issue #6957](https://github.com/agentscope-ai/QwenPaw/issues/6957). Plugin API keys need reconfiguration after version upgrades.
- **Admin console UTC timestamps** — [Issue #6948](https://github.com/agentscope-ai/QwenPaw/issues/6948). Ignores `user_timezone` config.
- **ASSISTANT message end time wrong** — [Issue #6826](https://github.com/agentscope-ai/QwenPaw/issues/6826). Fixed in [PR #6938](https://github.com/agentscope-ai/QwenPaw/pull/6938).

## 6. Feature Requests & Roadmap Signals

1. **Inbox delivery for agent reports** — [Issue #6917](https://github.com/agentscope-ai/QwenPaw/issues/6917). Agents should proactively deliver structured reports to user's inbox (not scroll-lost chat), with unread badges. Moderate effort; high alignment with personal-assistant vision; plausible for a 2.x minor release.

2. **Folder-based project workspace** — [Issue #6929](https://github.com/agentscope-ai/QwenPaw/issues/6929) (closed as enhancement). Users want to base conversations on a folder (like Codex) — preview files in workspace, select content into conversation, reference prior agent conversations. Signals UX gap in current workspace model.

3. **Per-session model overrides** — [PR #5992](https://github.com/agentscope-ai/QwenPaw/pull/5992) still under review after over a month. Opt-in alternative models per conversation, disabled by default. Ancillary to the roadmap.

4. **Agent channel plugin config parity** — [Issue #6924](https://github.com/agentscope-ai/QwenPaw/issues/6924). Custom channel plugins lost interactive config menus since v2.0, limited to basic input fields. Regression concern for plugin ecosystem.

5. **LongHorizon-Harness direction** — [Issue #6923](https://github.com/agentscope-ai/QwenPaw/issues/6923). Suggestion to consider state-drift prevention on long tasks. An external signal that long-horizon reliability is a competitive frontier.

## 7. User Feedback Summary

- **Task interruption is the most common complaint**: multiple users report agents stopping prematurely after stating a plan, sometimes with no message at all. This damages trust and is the highest-frequency negative experience in v2.1 beta.
- **Version upgrades repeatedly break configuration**: users are frustrated by losing plugin configs on each upgrade and needing to reconfigure, which slows adoption of new betas.
- **Multi-agent collaboration UX confusion**: users are confused by new sessions per agent message, having to switch agents to see their conversation content. The current design places an excessive cognitive load on users during agent orchestration.
- **Stability on Windows is a concern**: repeated crash reports on v2.0.1 (idle freeze, startup crashes) plus antivirus interference suggest ongoing reliability issues on that platform.
- **Documentation mismatches erode trust**: users notice when prompt files describe behaviors that were never implemented.
- **Security concern is raised**: plugins can silently create cron jobs and inject messages without approval (Issue #6916) — user expectations of a permission boundary are not being met.

## 8. Backlog Watch

1. **`feat(onebot): localize inbound media before agent processing`** — [PR #6715](https://github.com/agentscope-ai/QwenPaw/pull/6715), open since Aug 5, has been under review for over a week with no update. A maintainer review identified 8 issues that are unaddressed.
2. **`fix(summary): honor disable_thinking and interruption`** — [PR #6818](https://github.com/agentscope-ai/QwenPaw/pull/6818), open since Aug 8, "[Under Review]" with no updates in 4 days.
3. **`feat(console, tui): expose system commands in slash autocomplete`** — [PR #5869](https://github.com/agentscope-ai/QwenPaw/pull/5869), open since Jul 8 — over a month without review progress. With the 2.1.0 release cycle, this UX issue is at risk of slipping further.
4. **`fix(acp): prevent final text loss`** — [PR #6623](https://github.com/agentscope-ai/QwenPaw/pull/6623), open since Aug 1, under review with no recent activity.
5. **`Add per-session model overrides`** — [PR #5992](https://github.com/agentscope-ai/QwenPaw/pull/5992), open since Jul 12, under review for a month — needs a decision (merge or close).
6. **`QwenPaw killed by antivirus`** — [Issue #6847](https://github.com/agentscope-ai/QwenPaw/issues/6847) (4 comments, open since Aug 9). Some agent executions are flagged and killed by security software while comparable tools are not. Likely requires code-signing or behavioral changes.

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