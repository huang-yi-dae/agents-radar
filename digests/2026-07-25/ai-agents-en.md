# OpenClaw Ecosystem Digest 2026-07-25

> Issues: 464 | PRs: 500 | Projects covered: 13 | Generated: 2026-07-25 02:57 UTC

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

# OpenClaw Project Digest — 2026-07-25

## Today’s Overview
The project remains highly active with 464 issues and 500 PRs updated in the last 24 hours. Of those, 356 issues are open/active and 296 PRs were merged or closed, reflecting strong ongoing development across the gateway, agents, channels, and CLI domains. No new releases were cut today; development continues toward the 2026.7.x series. The pulse is dominated by infrastructure stability work, with several P0/P1 regressions under active diagnosis and a steady flow of feature PRs landing.

## Releases
*No new releases today.*

## Project Progress
**296 PRs merged or closed** in the last 24 hours. Notable closed items from the top-30 PR list:

- **fix(qa): retain runtime tool evidence after agent completion** (#113470, `steipete`) – Closed. Prevents release-validation race conditions.
- **fix(qa): capture multi-session runtime tools** (#113467, `vincentkoc`) – Closed. Backports main fix to beta branch for reliable `session_status` reporting.
- **feat(scripts): add watch-pr-ci CI watcher with mergeable and attach prechecks** (#112821, `steipete`) – Closed. New CI debugging utility.
- **fix(sessions): preserve CLI sessions with provider overrides** (#113001, `jincheng-xydt`) – Open but ready for maintainer review (linked to closed issue #112908).
- **fix(uninstall): remove the OpenClaw shell-completion block on uninstall** (#112631, `MatthewSynthia`) – Open, flagged as needs proof.

Several feature PRs advanced today, including lease-bound metadata for session spawns (#112589), live subtitles for session preambles (#112958), and the Buzz channel plugin (#113419). A major 1Password plugin PR (#102293) is now awaiting author response.

## Community Hot Topics
Issues with the highest engagement (comments + 👍) over the past 24 hours:

- **#102020**: “Second message in a session fails with 'reply session initialization conflicted'” (16 comments, 1 👍) – A cross-channel bug triggered after the first turn completes, affecting both Signal and da… (likely Discord/Telegram). Persistent core session-handling issue.
- **#86996**: “Active Memory + Codex app-server path causes long response latency, hook timeouts, startup aborts, and gateway event-loop stalls” (14 comments, 2 👍) – Labelled `diamond lobster`. Severe performance degradation with `active-memory` enabled. Multiple fixes attempted but still under product decision.
- **#94228**: “Native Anthropic path: replaying historical `thinking` blocks bricks long tool-use threads” (14 comments, 2 👍) – `platinum hermit` severity. Tool-use threads eventually hit 400 errors due to invalid thinking block signatures. Needs a live repro.
- **#92043**: “180s compaction timeout is a single wall clock over the whole chunk pipeline” (13 comments, 3 👍) – Legitimate long compactions fail repeatedly because the timeout does not account for partial progress. Linked to multiple open PRs.
- **#107220** *(closed)*: “2026.7.1 gateway crash-loop: legacy memory sidecar `meta`/`chunks` conflicts are fatal while `files` conflicts auto-resolve” (10 comments, 1 👍) – Upgrade blocker, now closed with a fix.
- **#110950** *(closed)*: “Everything is a cron — unify heartbeat, watchers, and scheduled automation” (10 comments, 2 👍) – Feature request closed as part of roadmap consolidation.

The underlying need across these hot topics is **session-state reliability and performance under realistic workloads** – multi-turn interactions, memory-heavy setups, and long tool-use threads continue to expose edge cases in timeout handling, provider compatibility, and resource cleanup.

## Bugs & Stability
Several high-impact bugs were active today, ranked by severity:

- **P1** – **#113306** (SQLite snapshot restore lacks end-to-end crash and identity guarantees) – *created 2026-07-24, updated today*. Behaviour bug where snapshot creation can report success but leave dangling parent directories and identity guards. File publication fix PR #113453 is linked.
- **P1** – **#106786** (gpt-5.6 models advertised on ChatGPT-OAuth route, silently fall back at runtime) – Users see no error message when the model is rejected by the provider. Updated today.
- **P0** – **#103148** (fix(sessions): enforce exact owner equality for all parent session use) – PR still open; addresses a security boundary flaw. Updated today.
- **Regression (P1)** – **#111519** (Telegram DM replies fall back after stale DM-scope cleanup in 2026.7.2-beta.3) – Updated today, needs more info from reporter.
- **Regression (P1)** – **#111498** (Main agent blocked by persistent workspace-state migration after Anthropic auth recovery) – Updated today, needs info.
- **Regression (P1)** – **#112906** (`` renders broken in v2026.7.1, rich messages regression) – Updated yesterday, but still active.

Fixes are in progress for many of these: #112620 aims to stop stable tool argument churn; #112584 stops closed-loop voice-call turns after TTS failure; #113001 preserves CLI sessions with provider overrides; and the moonshot/anyOf schema fix (#113462) addresses provider-specific tool schema compatibility.

## Feature Requests & Roadmap Signals
Active feature requests gaining traction:

- **#110950** (Everything is a cron – unify heartbeat, watchers, and scheduled automation) – Now closed: indicates the team is moving toward a unified cron primitive.
- **#12219** (Skill Permission Manifest Standard – `skill.yaml`) – Still open with 6 comments; security-focused feature to declare skill permissions.
- **#7722** (Filesystem Sandboxing Config – `tools.fileAccess`) – 10 comments, 4 👍. Security sandboxing for tool execution remains a high-demand item.
- **#45758** (Support YAML as config file format) – 8 comments, 2 👍. Lower priority but consistent user request.
- **#10687** (Fully dynamic model discovery – OpenRouter + beyond) – 10 comments, 3 👍. Users want automatic model catalog updates without manual `models.json`.
- **#113464** (publish host style variables to embedded MCP apps) – New PR today, likely to land in the next beta.

**Prediction for next release (2026.7.x):** The cron unification (#110950) is already closed; dynamic model discovery (#10687) and YAML config (#45758) may not be ready yet. The session lease-bound metadata (#112589) and MCP style variables (#113464) are likely candidates for the next beta.

## User Feedback Summary
Real pain points expressed in today’s activity:

- **Reliability under memory pressure**: Users with `active-memory` enabled report slow responses and gateway stalls (#86996). Workarounds exist but satisfaction is low.
- **Telegram and Discord message loss**: Multiple reports of messages being silently dropped after recovery or upgrade (#111519, #43549, #91564). Users feel this is a regression.
- **Tool output emptiness**: A regression in 2026.6.11 where tool outputs (exec, web_fetch) return empty after the first call per turn (#98528, now closed). User satisfaction improved with the fix.
- **Model fallback silence**: When primary models fail (e.g., GPT-5.6 rejected by provider), the system silently switches to fallback without notifying the user (#106786). Users demand explicit error messaging.
- **Upgrade migration pains**: Cron store migration from JSON to SQLite (#90378) and workspace-state migration (#111498) caused unexpected failures. Users want smoother, documented migration paths.
- **Request for better debugging tools**: `/models test-fallback` command (#6599) and exposed resolved backend model (#51441) remain open, indicating users want more transparency into which model is actually serving their requests.

Overall satisfaction is tempered by regression density, but the community acknowledges the rapid pace of fixes.

## Backlog Watch
Long-unanswered items needing maintainer attention (sorted by age, impact):

- **#7722** (Filesystem Sandboxing – `tools.fileAccess`) – *created 2026-02-03, 10 comments, 4 👍*. Still open, labelled `needs-maintainer-review` and `needs-security-review`. A top security feature request with no assignee.
- **#12219** (Skill Permission Manifest Standard) – *2026-02-09, 6 comments*. Needs product decision and security review.
- **#10687** (Dynamic model discovery) – *2026-02-06, 10 comments, 3 👍*. Labelled `needs-maintainer-review`. High demand but no progress since creation.
- **#6599** (/models test-fallback command) – *2026-02-01, 6 comments, 1 👍*. Labelled `needs-maintainer-review` and `needs-product-decision`.
- **#8299** (Config option to suppress sub-agent announce) – *2026-02-03, 8 comments, 1 👍*. User-reported UX friction, needs product decision.
- **#38520** (Pre-compaction agent notification and deferral) – *2026-03-07, 6 comments*. Important for stateful workflows, labelled `needs-maintainer-review`.
- **#47975** (Subagent sessions persist after completion) – *2026-03-16, 10 comments, 1 👍*. Stale but `P1` – session-state issue causing unresponsive main sessions.
- **#45494** (Cron agent jobs silently time out during LLM API outages) – *2026-03-13, 9 comments*. P1 regression, needs live repro and maintainer review.

Many of these have been stale for months despite high severity labels. The recent surge in P0/P1 activity suggests the team is currently prioritizing acute regressions over long-standing feature requests, but the backlog of product decisions and security reviews remains a risk for project health.

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report — 2026-07-25

## 1. Ecosystem Overview

The personal AI assistant open-source ecosystem remains highly fragmented but increasingly convergent. The 11 tracked projects span a spectrum from mature, full-stack frameworks (OpenClaw, ZeroClaw) to lightweight embeddable agents (NanoBot, PicoClaw) and specialized vertical tools (LobsterAI, CoPaw). A clear pattern has emerged: **community focus is shifting from feature velocity to reliability, security, and production readiness.** Multiple projects are experiencing upgrade regressions and performance degradation under memory-heavy workloads, suggesting the ecosystem is maturing past proof-of-concept into real-world deployment. The gap between feature-rich reference implementations (OpenClaw, ZeroClaw) and user-friendly alternatives (NanoBot, IronClaw) continues to widen, with each camp addressing different pain points in the deployment lifecycle.

---

## 2. Activity Comparison

| Project | Issues Updated (24h) | PRs Updated (24h) | Release Status | Health Score |
|---------|---------------------|-------------------|----------------|--------------|
| **OpenClaw** | 464 | 500 | Active dev, no new release | **Good** — High velocity, but regression density concerning |
| **NanoBot** | 3 (issues closed) | 24 | **v0.2.2**, v0.3.0 imminent | **Excellent** — Responsive triage, rapid fix cycles |
| **ZeroClaw** | 45 | 50 | **v0.8.3** | **Good** — Strong security response, but P0 bugs linger |
| **PicoClaw** | 2 | 8 | **v0.3.1** | **Good** — Steady maintenance, quick CPU bug fix |
| **NanoClaw** | 0 | 7 | No new release | **Fair** — Low throughput, zero merges today |
| **NullClaw** | — | — | — | **Inactive** — No activity |
| **IronClaw** | 32 | 50 | Active dev toward v1 | **Excellent** — Structured bug bash, clear v1 roadmap |
| **LobsterAI** | 19 | 7 | **2026.7.23** (recent) | **Fair** — Release day profile, but accumulated backlog |
| **TinyClaw** | — | — | — | **Inactive** — No activity |
| **Moltis** | 0 | 3 | No new release | **Stable/Quiet** — Focused Slack feature work |
| **CoPaw** | 45 | 32 | **v2.0.1** + **v2.0.1-beta.3** | **Good** — High release cadence, but v2.0 regressions |
| **ZeptoClaw** | 2 | 2 | No new release | **Fair** — CI blocked, but targeted security fix |
| **EasyClaw** | 0 | 0 | **v1.8.80** (today) | **Stable** — Zero open issues, minimal engagement |

*Health Score*: Qualitative assessment based on velocity, regression density, community response time, and backlog age.

---

## 3. OpenClaw's Position

**Advantages vs peers:**
- **Scale:** 464 issues and 500 PRs updated in 24 hours — an order of magnitude larger than any competitor. This is the clear reference implementation, with unmatched breadth of channel support (Signal, Discord, Telegram, etc.).
- **Community depth:** Persistent engagement on complex issues (e.g., 16 comments on session conflict bugs, 14 comments on active-memory performance). The community includes active debugging and shared repro scenarios.
- **Maturity:** 2026.7.x series shows long-running stability work with P0/P1 regressions tracked and fix PRs in progress.
- **Feature surface:** Micro-agent channels, lease-bound metadata, live subtitles for session preambles — features not seen in any other project.

**Technical approach differences:**
- **Architecture:** OpenClaw uses a gateway + sidecar memory model with explicit session lifecycle management, contrasting with NanoBot's simpler agent-runtime model. ZeroClaw shares this architectural complexity but is less mature.
- **Provider handling:** OpenClaw's gpt-5.6 fallback bug (#106786) highlights the cost of complex model routing; simpler projects (PicoClaw, ZeptoClaw) avoid this by supporting fewer providers.
- **Tool system:** OpenClaw has a rich tool-call framework (micro-agents, channel plugins) that peers lack, but this introduces race conditions (e.g., #102020 session initialization) not seen in leaner alternatives.

**Community size comparison:**
- **Largest:** OpenClaw (500+ daily PRs) > ZeroClaw (50 daily PRs) > IronClaw/CoPaw (30-50 daily PRs) > NanoBot (24 daily PRs) > others.
- **Most responsive:** NanoBot and IronClaw show faster mean time to close issues; OpenClaw's scale creates longer tail on less critical issues.
- **External contributor share:** NanoBot shows external hobbyist contributors; OpenClaw's PR authors are mostly maintainer team members (steipete, vincentkoc, jincheng-xydt).

---

## 4. Shared Technical Focus Areas

The following pain points and requirements appear across multiple projects, indicating ecosystem-wide challenges:

| Requirement | Affected Projects | Specific Pain |
|-------------|------------------|---------------|
| **Session-state reliability across turns** | OpenClaw (#102020), ZeroClaw (#47975 subagent persistence), CoPaw (#5980 v2.0 regression), LobsterAI (#1849 infinite NO_REPLY) | Multi-turn interactions frequently break after first completion, causing silent failures or infinite loops |
| **Memory system performance under load** | OpenClaw (#86996, active-memory stalls), CoPaw (#6307 2s overhead per reply), NanoBot (#4867 60s Ollama delay) | Heavy memory/multi-model setups cause 2-60s extra latency per turn, defeating real-time interaction value |
| **Provider/model fallback transparency** | OpenClaw (#106786 GPT-5.6 silent fallback), ZeroClaw (#9340 cron output silently dropped), IronClaw (#6645 Slack silent failures) | Systems hide failures, leaving users with broken workflows and no diagnostic path |
| **Tool output reliability** | OpenClaw (#98528 empty tool outputs), CoPaw (#6405 MCP tool not found), ZeroClaw (#9247 shell symlink bypass) | Tool executions lose context, return empty results, or bypass security boundaries |
| **Channel parity (streaming, typing indicators)** | PicoClaw (#3201 QQ streaming missing), Moltis (#1165 Slack typing indicator), ZeptoClaw (#648 Telegram streaming) | Users expect real-time feedback across all channels; most projects support only 2-3 fully |
| **Security hardening for subprocess/tool execution** | ZeroClaw (#9247 shell workspace bypass, #8519 WASM CVEs), ZeptoClaw (#645 secret leakage), OpenClaw (#7722 filesystem sandboxing), NanoBot (#1073 config key loss) | Growing awareness that tool execution surfaces need explicit sandboxing, credential isolation, and audit |
| **Configuration/dependency management** | ZeroClaw (#9236 config alias dropping), PicoClaw (#3246 MQTT TLS disabled by default), NanoBot (#1073 config key preservation) | Users report configuration values silently dropped or not migrated across upgrades |
| **CRON/scheduled task resilience** | OpenClaw (#9203 compaction timeouts), ZeroClaw (#9340 cron output dropped), CoPaw (#6401 history overwritten) | Scheduled automation is increasingly popular but breaks under corner cases (timeouts, upgrades) |

---

## 5. Differentiation Analysis

| Dimension | OpenClaw | ZeroClaw | NanoBot | IronClaw | CoPaw | LobsterAI |
|-----------|----------|----------|---------|----------|-------|-----------|
| **Core philosophy** | Reference full-stack agent framework | Commercial-grade infrastructure with RFC governance | Lightweight, embeddable agent | v1 production release focus | Mini-app platform (PawApp) | Desktop-first with IM bot focus |
| **Target user** | Developers, integrators, power users | Enterprise/devops teams | Hobbyists, small-scale deployments | Hosted agent providers | Chinese-language users, team collaboration | Chinese market, multi-platform deployment |
| **Architecture** | Gateway + sidecar memory (complex) | Daemon-owned SOP control plane | Single agent runtime (simple) | Extension-host based, capability testing | Staged compaction, Scroll context manager | OpenClaw fork with custom UI |
| **Key strength** | Breadth (500+ channels/plugins) | Security design docs, governance RFCs | Speed of iteration (24 PRs/day) | Structured v1 planning, bug bashing | Built-in Kanban, Zalo channel | Stable IM bot experience (per user feedback) |
| **Key weakness** | Regression density at scale | Long-open RFCs without decision | Context loss bugs (#4064), Ollama perf | Slack/Telegram unreliability (P1) | v2.0 regressions (SSH offline, 2s overhead) | Critical DeepSeek V4 bug (3 months open) |
| **Community language** | English-dominant | English-dominant | English/Chinese | English-dominant | Chinese-dominant | Chinese-dominant |
| **Security maturity** | Growing (filesystem sandboxing requested) | High (WASM CVEs tracked, VI credential verification) | Low (no sandbox mentioned) | Medium (extension model, but bug bash shows real issues) | Low (conversation history corruption) | Low (email path traversal open 3 months) |

---

## 6. Community Momentum & Maturity

### Tier 1: Rapid iteration with active bug bashes
- **OpenClaw** (500+ daily PRs) — fastest velocity ecosystem-wide, but regression density threatens user trust.
- **ZeroClaw** (50 daily PRs) — structured governance (work lanes, plugin catalog RFCs) suggests long-term planning, but large architectural changes (goal management, plugin unification) are slow to land.
- **IronClaw** (50 daily PRs, bug bash today) — most organized path to v1; structured issue triage (P1/P2 severity) and clear release checklist.
- **CoPaw** (45 issues, 32 PRs) — high release cadence (v2.0.1 + beta.3 same day) but v2.0 regressions cause community friction.

### Tier 2: Stable maintenance with focused feature work
- **NanoBot** (24 PRs/day) — healthiest velocity-to-quality ratio; responsive triage, clear v0.3.0 target. Risk is one-man-show maintenance team.
- **PicoClaw** (8 PRs/day) — solid maintenance, quick CPU bug fix, but limited feature ambition.
- **LobsterAI** — release day profile today, but 3-month-old security fixes and critical bugs persist. Risk of stagnation.

### Tier 3: Low activity / consolidation
- **NanoClaw** — zero merges, low throughput, looks like secondary fork.
- **Moltis** — only 3 PRs from same author; Slack-only focus suggests niche utility.
- **ZeptoClaw** — CI-blocked, single-contributor dynamics.
- **EasyClaw** — zero open issues, but zero community engagement suggests abandoned or closed-source shift.
- **NullClaw, TinyClaw** — functionally inactive.

### Key Insight:
The ecosystem is **bimodal**: a few high-velocity projects (OpenClaw, ZeroClaw, IronClaw, CoPaw) are driving architectural advances, while many smaller projects provide specialized value (easy setup, specific channel support). The risk is that **feature differentiation masks shared reliability problems** — every project struggles with session persistence and memory performance, but none has solved it completely.

---

## 7. Trend Signals

### 1. Reliability > Novelty
Across all active projects, the dominant community conversations are about **reliability regressions** (v2.0 upgrades breaking SSH, session init conflicts, silent message drops) rather than new feature requests. Users want tools that *don't break* more than they want new capabilities. This signals ecosystem maturation: early adopters are integrating these agents into daily workflows and hitting production-grade requirements.

### 2. Memory Systems Under Scrutiny
Active-memory (OpenClaw #86996), context window optimization (NanoBot #4867), and compilation timeouts (OpenClaw #92043) are the most-difficult performance bottlenecks. **This is the ecosystem's hardest unsolved problem.** No project has a performant, scalable memory solution; those who crack this (dynamic context, KV-cache-friendly prompting, or staged compaction) will have a significant competitive advantage.

### 3. User Control Over Model Selection
Silent fallback (OpenClaw), opaque model routing (LobsterAI #1988 forced provider), and stale model listings (IronClaw #6642) are generating persistent frustration. Users want **explicit, inspectable model routing** — they want to know which model serves each request and why. This suggests a market for tools that give end-users transparency into AI decisions, beyond just the final output.

### 4. Security Hardening is Accelerating
ZeroClaw's WASM CVE tracking, sandboxing RFCs, and credential verification fixes; ZeptoClaw's subprocess secret scrub; and OpenClaw's filesystem sandboxing request (#7722) point to a **rapidly rising security baseline**. Within 6-12 months, "no sandboxing" will be a disqualifying feature for production deployments. Projects without security roadmaps (NanoBot, PicoClaw, LobsterAI) will face growing friction.

### 5. Streaming is Becoming Table Stakes
Real-time feedback (typing indicators, streaming responses, acknowledgment reactions) is no longer a "nice-to-have." Moltis (#1165), ZeptoClaw (#648), PicoClaw (#3201), and IronClaw (#6649 tool activity panel timing) all address this gap. Users equate "no streaming" with "broken" — this expectation is universal across all projects.

### 6. Multi-Model / Multi-Provider Parity
Several projects are building provider-agnostic gateways: LobsterAI (#2193 LiteLLM PR), OpenClaw (model discovery #10687), and NanoBot (xAI search #5050). **The winning projects will be those that decouple from specific model providers.** This trend is driven by API outages, pricing changes, and model quality variance.

### 7. Configuration Management is a Hidden Pain Point
ZeroClaw (#8834 config aliases dropped), PicoClaw (#3246 MQTT defaults), and NanoBot (#1073 config key preservation) all report configuration durability issues. This is a **systemic UX failure** across the ecosystem — configuration systems were designed for initial setup, not ongoing lifecycle management (upgrades, rollbacks, migration). Expect a unified "config as code" approach to emerge.

---

**Value for AI Agent Developers:**
- **If building for production:** Prioritize session reliability and memory performance over new channels. The most common failure mode is multi-turn interaction breakage.
- **If targeting developers:** Invest in explicit model routing transparency — users will debug your system when it fails, and they need the tools to do so.
- **If targeting enterprise:** Ship with sandboxing (filesystem, subprocess, network) and configuration validation from day one. The ZeroClaw governance model is instructive.
- **If targeting end-users:** Ensure streaming and typing indicators work on every channel. The absence of real-time feedback is the most common source of user frustration across all projects surveyed.

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot Project Digest – 2026-07-25

## 1. Today's Overview
The project saw intense development activity with **24 pull requests updated** in the last 24 hours, **19 of which were merged or closed**. No new releases were cut. Community discussion remains focused on a critical caching issue with Ollama, while the maintainer team advanced major work across the WebUI, agent system, provider integrations, and branding. One open bug (#4064) concerning runtime context loss for pending messages continues to require attention. Overall, the project is in a healthy state with rapid iteration and responsive issue triage.

## 2. Releases
**No new releases** since the last digest. The latest tagged version is **v0.2.2**. A preparatory PR (#5081) for v0.3.0 was opened, bumping version numbers and fixing a model badge width issue, suggesting the next release is imminent.

## 3. Project Progress
The 19 merged/closed PRs today span several key areas:

- **WebUI & User Experience**  
  - **Smooth streaming Markdown reveal** (#4696, open but active) – pacing, rAF scheduling, and tail animation.  
  - **Model preset switching from the composer** (#5077) – long-press drag to cycle presets.  
  - **Responsive layout fixes** (#5060, #5031) – mobile composer overlap, settings navigation.  
  - **Show quoted context after follow-up send** (#5071) – dedicated markers for quoted assistant text.  
  - **Honor custom gateway port with Vite** (#5076).  
  - **First-time setup launched in WebUI** (#5078) – desktop installers skip terminal onboarding.  
  - **Branding migration to SVG** (#5080, #5079) – README, favicon, sidebar assets.

- **Agent & Tooling**  
  - **Carry authorized tasks through verification** (#5075) – treat clear user requests as authorization for coding/artifact tasks.  
  - **Support inline subagent consultation** (#5074) – optional `wait` argument on spawn tool.  
  - **Preserve multimodal tool outputs** (#5073) – fix base64 image serialization.  
  - **Deliver non-streamed finalization responses** (#5049) – regression fix from #2365.  
  - **Streamdown for agent activity** (#4963) – unified one-line logging for all tool types.

- **Provider & Channel Fixes**  
  - **Fix Weixin streaming** (#4567) – added `streaming` field to `WeixinConfig`, dodging non-stream relay bug.  
  - **Surface xAI hosted X Search activity** (#5050) – structured events for `x_search`.  
  - **Migration TODOs pinned** (#5053) – clean-up warnings for v0.2.4.

## 4. Community Hot Topics
The most active discussion is on **Issue #4867** (23 comments):  
**[CLOSED] [enhancement] Preserve exact prompt prefix to enable caching in Ollama and others** – users report that Nanobot adds ~60 seconds to every turn when using Ollama, making the experience “totally unusable” even with 32 GB of VRAM. The request is to keep the prompt prefix identical across turns to leverage Ollama’s KV-cache. The issue was closed, likely resolved or merged into upcoming work. Link: [Issue #4867](https://github.com/HKUDS/nanobot/issues/4867)

Other active threads:  
- **Issue #4637** (4 comments) – Telegram long message split renders only final trunk; closed as stale.  
- **Issue #4064** (1 comment, 1 👍) – open bug about pending mid-turn messages losing sender/channel/chat context.

## 5. Bugs & Stability
| Severity | Issue/PR | Description | Status |
|----------|----------|-------------|--------|
| **High** | #4064 | Pending mid-turn messages injected as plain user content, losing runtime identity metadata. | Open, no fix PR yet. |
| **High** | #4867 | 60s delay per turn with Ollama due to non-cached prompt prefix. | Closed (likely fixed in an upcoming PR). |
| **Medium** | #4637 | Telegram long message splits – only final trunk renders. | Closed as stale. |
| **Medium** | #5049 (PR) | Non-streamed finalization responses skipped for streaming channels – regression. | Merged fix. |
| **Low** | #4567 (PR) | Weixin channel silently dropped `streaming` config. | Merged fix. |
| **Low** | #5073 (PR) | Multimodal tool outputs (e.g., images) serialized into inert JSON text. | Merged fix. |
| **Low** | #5071 (PR) | Quoted context not included after follow-up send. | Merged fix. |

## 6. Feature Requests & Roadmap Signals
- **Ollama prompt caching** (#4867) – high demand; likely targeted for v0.3.0.  
- **Cron grace window** (#3035, open PR since April) – allows at‑type tasks to run if slightly expired.  
- **Preserve unknown config keys** (#1073, open PR since February) – prevents data loss on custom provider configs.  
- **Branding assets** (#5079, #5080) – SVG migration shows polish for public release.  
- **First-time setup in WebUI** (#5078) – signals a push toward easier onboarding.  
- **Inline subagent consultation** (#5074) – indicates growing sophistication of agent orchestration.  
- **xAI search integration** (#5050) – expands provider coverage beyond standard APIs.

These trends suggest the next release (v0.3.0) will emphasize **performance (caching), stability (context loss), and user experience (WebUI polish)**.

## 7. User Feedback Summary
Real pain points expressed in issues:  
- **“Totally unusable with Ollama and 32 GB of VRAM”** – the 60‑second per turn overhead is the most vocal complaint.  
- **Telegram long message rendering** – only the last trunk appears, making agent messages illegible.  
- **Pending message context loss** – users (e.g., `hamb1y`) report that queued mid‑turn messages are treated as ordinary user messages, breaking multi-turn interactions.

Satisfaction signals: high PR merge velocity and responsive triage (3 issues updated, 2 closed). No negative feedback about recent WebUI changes; PR descriptions indicate thorough testing and regression coverage.

## 8. Backlog Watch
Two long‑open PRs need maintainer attention due to conflicts and age:

- **PR #3035** (created 2026-04-11, last updated today) – “fix(cron): introduce grace window for at‑type tasks.” Marked `[conflict]`. This PR addresses a real scheduling bug and has been open for over three months.  
  [PR #3035](https://github.com/HKUDS/nanobot/pull/3035)

- **PR #1073** (created 2026-02-23, last updated today) – “fix: preserve unknown config keys when saving.” Also marked `[conflict]`. Preventing data loss is critical for users with custom provider setups.  
  [PR #1073](https://github.com/HKUDS/nanobot/pull/1073)

Additionally, **Issue #4064** (open since 2026-05-29) has only one comment and needs a fix PR or maintainer response to confirm root cause.

---

**Overall project health**: Very active, with a clear focus on quality-of-life improvements and provider robustness. The main risk is the unresolved context‑loss bug (#4064) and the two stale PRs that may require rebasing.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest – 2026-07-25

## Today's Overview

ZeroClaw is in a high-activity period: 45 issues and 50 pull requests were updated in the last 24 hours, with 8 issues and 9 PRs closed/merged. No new releases were published. The project is advancing multiple large architectural changes—goal management infrastructure, a unified plugin catalog, and security hardening across sandboxing, credential verification, and workspace boundaries. Community engagement remains strong, particularly around governance RFCs and security-critical bug reports. The backlog of accepted trackers (e.g., v0.9.0 auth/security queue, SOP milestone) shows sustained progress, while several high-severity bugs reported this week already have fix PRs in review.

## Releases

*None.* No new releases were recorded. The latest published version remains v0.8.3.

## Project Progress

Notable closures and merges in the last 24 hours:

- **CI/deps**: [PR #9305](https://github.com/zeroclaw-labs/zeroclaw/pull/9305) was merged – bump `anchore/sbom-action` from v0.17.9 to v0.24.0 in the actions-all group.
- **Config**: [Issue #9240](https://github.com/zeroclaw-labs/zeroclaw/issues/9240) (save_dirty drops writes with dots in map keys) was closed – likely fixed in a recent merge (not visible in the PR list).
- **Sandbox**: [Issue #9204](https://github.com/zeroclaw-labs/zeroclaw/issues/9204) (Landlock sandbox restricts the daemon itself) was closed; the fix was submitted via [PR #9114](https://github.com/zeroclaw-labs/zeroclaw/pull/9114) (still open, awaiting merge).
- **Delegate tool**: [Issue #7623](https://github.com/zeroclaw-labs/zeroclaw/issues/7623) (Codex OAuth sub-agent still fails) was closed after #7266.
- **Config aliases**: [Issue #8834](https://github.com/zeroclaw-labs/zeroclaw/issues/8834) (config set cannot create aliases outside providers.*) closed.
- **Shell tool**: [Issue #6434](https://github.com/zeroclaw-labs/zeroclaw/issues/6434) (shell calls refused at full autonomy) closed.

Active large PRs that continue to advance:
- **Goal management** – four stacked PRs by vrurg ([#8746](https://github.com/zeroclaw-labs/zeroclaw/pull/8746) fix self-resume loops, [#8996](https://github.com/zeroclaw-labs/zeroclaw/pull/8996) preserve running goals across reload, [#8689](https://github.com/zeroclaw-labs/zeroclaw/pull/8689) add goal command admission, [#8687](https://github.com/zeroclaw-labs/zeroclaw/pull/8687) add goal controller and verifier) – all still open and under review.
- **Landlock sandbox fix**: [PR #9114](https://github.com/zeroclaw-labs/zeroclaw/pull/9114) (allow various devices/files) awaits merge.
- **SSRF fix for file_download**: [PR #8713](https://github.com/zeroclaw-labs/zeroclaw/pull/8713) adds opt-in `allowed_private_hosts`.
- **Secrets & encrypted state for plugins**: [PR #8857](https://github.com/zeroclaw-labs/zeroclaw/pull/8857) adds scoped secrets.
- **Binary resource exchange (ACP/MCP)**: PRs [#9195](https://github.com/zeroclaw-labs/zeroclaw/pull/9195) and [#9196](https://github.com/zeroclaw-labs/zeroclaw/pull/9196) add `resource.blob` support in prompts and tool calls.

## Community Hot Topics

| Issue/PR | Comments | Topic |
|----------|----------|-------|
| [#6808](https://github.com/zeroclaw-labs/zeroclaw/issues/6808) – RFC: Work Lanes, Board Automation, and Label Cleanup | 14 | Governance RFC to reduce maintainer toil; accepted and rollout in progress. |
| [#6489](https://github.com/zeroclaw-labs/zeroclaw/issues/6489) – "Everything is a plugin" unified catalog | 4 | Long-term architectural direction to collapse separate integration and plugin concepts. |
| [#8396](https://github.com/zeroclaw-labs/zeroclaw/issues/8396) – RFC: Make wire protocol first-class in provider construction | 3 | Proposed formalization of provider construction to avoid confusion over protocol vs. provider config. |
| [#9348](https://github.com/zeroclaw-labs/zeroclaw/issues/9348) – WhatsApp Web responds to all DMs/groups in business mode | 2 | Security misconfiguration – a locked-down config behaves as fully open. |
| [#9328](https://github.com/zeroclaw-labs/zeroclaw/issues/9328) – Verifiable intent evaluates constraints without verifying credential chain | 1 | Security vulnerability in VI evaluation logic. Fix PR #9327 submitted. |
| [#9330](https://github.com/zeroclaw-labs/zeroclaw/issues/9330) – RFC: AI-assisted PR pre-review and re-review | 1 | Proposal to use CI results for AI review while keeping human approval. |

The most active discussion remains the governance RFC (#6808) on work lanes, board automation, and label cleanup – a response to growing project complexity and maintainer burnout. The "Everything is a plugin" RFC (#6489) signals a foundational shift toward a unified plugin catalog, which will affect all integrations and tools going forward.

## Bugs & Stability

**High-severity bugs reported in the last 24 hours** (S0/S1):

| Issue | Severity | Description | Fix PR exists? |
|-------|----------|-------------|----------------|
| [#9348](https://github.com/zeroclaw-labs/zeroclaw/issues/9348) | S1 – security risk | WhatsApp Web answers every DM and group under `mode = business`; an empty `allowed_groups` permits all groups instead of none. | No |
| [#9247](https://github.com/zeroclaw-labs/zeroclaw/issues/9247) | S0 – data loss / security risk | Shell tool workspace boundary bypass via symlinks. No fix PR yet. | No |
| [#9340](https://github.com/zeroclaw-labs/zeroclaw/issues/9340) | S1 – workflow blocked | CLI-created cron jobs hardcode `delivery.mode = "none"`, discarding all output silently. | Yes – [PR #9350](https://github.com/zeroclaw-labs/zeroclaw/pull/9350) adds delivery flags. |
| [#9328](https://github.com/zeroclaw-labs/zeroclaw/issues/9328) | S1 – security risk | Verifiable-intent `evaluate_constraints` checks constraints without verifying the credential chain. | Yes – [PR #9327](https://github.com/zeroclaw-labs/zeroclaw/pull/9327) fixes fail-closed. |
| [#9290](https://github.com/zeroclaw-labs/zeroclaw/issues/9290) | S1 – workflow blocked | Windows desktop installer crashes at launch with missing `TaskDialogIndirect`. | No |
| [#8519](https://github.com/zeroclaw-labs/zeroclaw/issues/8519) | P1 – security | Remaining `wasmtime-wasi` CVEs after reconciling cargo-audit ignores; open since June 30. | Ongoing |

**Other new bugs** (P2/P3, lower severity): [#9285](https://github.com/zeroclaw-labs/zeroclaw/issues/9285) (nested set_prop masks invalid values), [#9315](https://github.com/zeroclaw-labs/zeroclaw/issues/9315) (Telegram file-download retry classification), [#9323](https://github.com/zeroclaw-labs/zeroclaw/issues/9323) (execution-tree iteration budget ownership).

The project is actively responding to security issues: two fix PRs (#9350, #9327) were submitted on the same day as their corresponding bug reports.

## Feature Requests & Roadmap Signals

New feature proposals submitted today:

- [#9335](https://github.com/zeroclaw-labs/zeroclaw/issues/9335) – Support data-wrapped OpenAI-compatible chat responses (some endpoints wrap payload in `"data"`).
- [#9338](https://github.com/zeroclaw-labs/zeroclaw/pull/9338) – PR adding Crusoe Managed Inference as a first-class provider family (new integration).
- [#9349](https://github.com/zeroclaw-labs/zeroclaw/pull/9349) – Report per-turn `cost_usd` in AgentEnd events (observability improvement).
- [#9351](https://github.com/zeroclaw-labs/zeroclaw/pull/9351) – Surface unconfigured model context window instead of a silent stub.

Roadmap signals from earlier RFCs that continue to draw attention:

- **Unified plugin catalog** (#6489) – a phased plan that would collapse integrations and wasm plugins into a single system. Likely to be a major effort for v0.9 or v1.0.
- **Work lanes and board automation** (#6808) – accepted and in rollout, will change how the project triages issues.
- **Goal management** – the four-PR stack (#8687–#8996) is a substantial new capability for the agent runtime. If merged, it will allow `goal_start`, `goal_resume`, and goal persistence across reloads. This is likely for v0.9.0.
- **v0.9.0 auth/security/breaking-change tracker** (#7432) – consolidates all breaking work. Expected in the next major release.

## User Feedback Summary

**Pain points voiced in new issues:**

- **WhatsApp misconfiguration** (#9348): A config that reads as locked down (empty `allowed_groups`) behaves as fully open. User frustrated that a security‑conscious setup actually exposes the agent to all inbound messages.
- **Cron output lost** (#9340): CLI-created cron jobs run but discard output silently. User likely discovered this after relying on scheduled jobs for automation.
- **Windows desktop crash** (#9290): Fresh install on Windows fails immediately for newcomm – a showstopper for Windows users.
- **Shell tool workspace bypass** (#9247): Symlink attack reported as S0 by vshanbha – indicates users are exploring or relying on workspace boundaries for security.
- **Config alias dropping** (#9236, #8834): `config set` creates Telegram aliases that vanish after reload – a persistent configuration reliability issue that has now been closed for one sub-case but remains for others.

**General sentiment**: Users are actively testing boundary cases (security, configuration, cron reliability) and reporting issues promptly. The project’s response time to bugs is good – several fix PRs appeared the same day as the bug report.

## Backlog Watch

The following important issues have been open for an extended period with no recent maintainer activity or remain in "needs-author-action" state:

| Issue | Created | Summary | Status |
|-------|---------|---------|--------|
| [#8519](https://github.com/zeroclaw-labs/zeroclaw/issues/8519) | 2026-06-30 | Reconcile cargo-audit ignores and remediate wasmtime-wasi CVEs | P1, accepted, last comment today, but no fix PR merged yet. |
| [#7904](https://github.com/zeroclaw-labs/zeroclaw/issues/7904) | 2026-06-17 | SKILL.md `always: true` frontmatter broken in compact prompt mode | P2, accepted, last updated 07/24, no PR. |
| [#7872](https://github.com/zeroclaw-labs/zeroclaw/issues/7872) | 2026-06-17 | QQ group replies missing msg_id for passive replies (tracker) | P1, accepted, updated 07/24. Tracker referencing merged fix; needs close-out. |
| [#8228](https://github.com/zeroclaw-labs/zeroclaw/issues/8228) | 2026-06-23 | DingTalk channel streaming message support | Accepted, risk high, last comment 07/24. No PR. |
| [#8288](https://github.com/zeroclaw-labs/zeroclaw/issues/8288) | 2026-06-24 | SOP milestone: daemon-owned SOP control plane to 5/5 | Tracker, last updated 07/24, milestone incomplete. |
| [#8691](https://github.com/zeroclaw-labs/zeroclaw/issues/8691) | 2026-07-04 | Restore ADR baseline and audit accepted RFC decision records | Tracker, status no-stale, updated 07/24. |
| [#9246](https://github.com/zeroclaw-labs/zeroclaw/issues/9246) | 2026-07-21 | RFC: Preserve Todo tracker configuration during ZeroCode ownership migration | Accepted, status in-progress, needs maintainer review? |

Several large PRs (vrurg's goal stack, #8713 SSRF fix, #8857 secrets) are also in "needs-author-action" state. Maintainers should review these to prevent stall-out.

---

*Digest generated from GitHub data on 2026-07-25. All links point to the zeroclaw-labs/zeroclaw repository.*

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw Project Digest — 2026-07-25

## 1. Today's Overview
The project shows moderate activity with 2 issues and 8 pull requests updated in the last 24 hours. One new bug report (#3292) about high CPU usage in the chat input box was quickly addressed by a merged fix PR (#3293). Several older PRs (mostly refactoring, security hardening, and i18n additions) were also merged or closed, indicating ongoing maintenance. No new releases were published today; the latest version remains 0.3.1.

## 2. Releases
No new releases in the last 24 hours.

## 3. Project Progress
The following PRs were merged or closed today (2026-07-25), all marked as closed:

- **#3293** (merged) – Fix bug of input box on chat page, likely resolving the high CPU usage issue reported in #3292.
- **#3247** (merged) – Adds Czech translations for code wrap options (i18n update).
- **#3246** (merged) – Security and robustness hardening: MQTT TLS verification enabled by default, OAuth timeouts, bounded search reads.
- **#3245** (merged) – Refactors `escapeXML` in skills loader to use a single-pass `strings.NewReplacer`, reducing allocations.
- **#3244** (merged) – Similar refactor in seahorse summary XML assembly, reducing allocations.
- **#3243** (merged) – Uses `strings.Builder` in seahorse compaction helpers to eliminate O(n²) string concatenation.
- **#323** (closed) – Fix for Discord channel handling character limits and typing status (older PR, closed today).

These changes collectively improve performance, memory usage, security, and multilingual support.

## 4. Community Hot Topics
- **[Issue #3201 – Support streaming output for QQ channel](https://github.com/sipeed/picoclaw/issues/3201)** (4 comments)  
  *Status: Closed (stale)*  
  Users requested real-time token-by-token output for the QQ channel, similar to Telegram and WebSocket. The issue was closed due to inactivity, but the need remains as only two channels currently support streaming.

- **[Issue #3292 – CPU usage too high when focus on input box](https://github.com/sipeed/picoclaw/issues/3292)** (0 comments)  
  *Status: Open*  
  A recently reported bug affecting web chat users in Firefox. The fix PR #3293 was merged same day, so this issue may be resolved soon.

No other issues or PRs have significant discussion threads today.

## 5. Bugs & Stability
| Severity | Issue | Description | Fix PR |
|----------|-------|-------------|--------|
| **High** | [#3292](https://github.com/sipeed/picoclaw/issues/3292) | CPU usage spikes when chat input box is focused (web interface, Firefox) | [#3293](https://github.com/sipeed/picoclaw/pull/3293) (merged) |
| Low | N/A | No other fresh bugs reported today. |

The high CPU usage bug appears to be fixed in the latest merge.

## 6. Feature Requests & Roadmap Signals
- **Streaming support for QQ channel** (originally #3201) – Although closed as stale, this feature request aligns with the ongoing trend of adding streaming capabilities. It may reappear if maintainers prioritize channel parity.
- **Internationalization** – Multiple locale additions today (Czech, Traditional Chinese [pending at #3261]) suggest active community interest in broader language support. The next version (0.3.2) could include these locales.
- **Security defaults** – The MQTT TLS fix (#3246) indicates a shift toward safer defaults, which may influence future configuration guidelines.

## 7. User Feedback Summary
- **Pain points**:  
  - High CPU usage while typing in the web UI (reported by @Acdfmwaopuio).  
  - Missing streaming output on QQ channel (expressed in closed issue #3201).  
- **Satisfaction signals**:  
  - Community contributors are actively submitting performance improvements and security fixes.  
  - No negative feedback about the current release (0.3.1) beyond the CPU bug.

## 8. Backlog Watch
- **[PR #3261 – Add zh-TW locale and Traditional Chinese translations](https://github.com/sipeed/picoclaw/pull/3261)** (Open, stale)  
  Created on 2026-07-16, last updated 2026-07-24. No comment yet from maintainers. This PR is ready for review and would extend coverage to Traditional Chinese users.
- **[Issue #3292 – CPU usage bug](https://github.com/sipeed/picoclaw/issues/3292)** (Open)  
  While a fix PR has been merged, the issue itself remains open. Maintainers should close it after verifying the fix.

No other long-unanswered items appear in today’s data.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

## NanoClaw Project Digest — 2026-07-25

### 1. Today’s Overview
Development momentum remained steady over the past 24 hours, with **7 pull requests** updated (6 open, 1 closed) and **zero new issues** or releases. The single closed PR (#3123) was a mistaken submission, meaning no code was actually merged. Activity is concentrated on fixing stability and compatibility gaps, as well as one notable feature addition. No user-reported bugs or feature requests were opened today, indicating a relatively quiet period for community feedback. The project appears to be in a consolidation phase, with core contributors addressing technical debt ahead of the next release.

### 2. Releases
**No new releases** this day. The latest available release remains unchanged.

### 3. Project Progress
The only closed PR today (#3123) was a mistaken change titled *“Pacific changes. Wrong PR.”* by `iamarunkumark` – no actual feature or fix was merged. All other open PRs remain in review. Key in-flight improvements include:
- [PR #3126](https://github.com/nanocoai/nanoclaw/pull/3126) – Fixes agent-runner to never deliver silence when a nudged chat turn stays bare.
- [PR #3122](https://github.com/nanocoai/nanoclaw/pull/3122) – Compatibility fixes for OpenCode: main compatibility, custom-endpoint transport, and memory parity.
- [PR #3093](https://github.com/nanocoai/nanoclaw/pull/3093) – Keeps typing indicator active while processing turns in chat.
- [PR #3090](https://github.com/nanocoai/nanoclaw/pull/3090) – Prepends all top-level context Markdown in templates.

No functional progress was rolled into the main branch today.

### 4. Community Hot Topics
With zero issue comments and no reactions on any PR, community discussion is minimal. The most actively touched PRs are those with `core-team` attention:
- [PR #3125](https://github.com/nanocoai/nanoclaw/pull/3125) – *“feat: per-agent-group timezone override”* (by `Koshkoshinsk`). This is the only feature-oriented PR and has caught core-team interest.
- [PR #3122](https://github.com/nanocoai/nanoclaw/pull/3122) and [#3126](https://github.com/nanocoai/nanoclaw/pull/3126) – Both carry `core-team` and `fix` labels, signaling high-priority review.

The lack of community comments may reflect that these are internal or early-stage contributions; maintainers are likely focusing on polishing core functionality.

### 5. Bugs & Stability
No new bug reports were filed today. However, several open fix PRs target existing stability issues:
- **Medium severity**: Silence delivery on nudged chat turns ([PR #3126](https://github.com/nanocoai/nanoclaw/pull/3126)) – could cause user confusion if the agent appears unresponsive.
- **Medium severity**: Unavailable MCP servers not reported ([PR #3124](https://github.com/nanocoai/nanoclaw/pull/3124)) – missing error feedback degrades user experience with external tools.
- **Low severity**: Chat typing indicator dropped during processing ([PR #3093](https://github.com/nanocoai/nanoclaw/pull/3093)) – cosmetic but affects perceived responsiveness.
- **Low severity**: Template context ordering bug ([PR #3090](https://github.com/nanocoai/nanoclaw/pull/3090)) – may cause incomplete context injection.

All fixes have PRs awaiting merge; no regressions or crashes have been reported.

### 6. Feature Requests & Roadmap Signals
The only feature request visible in today’s data is [PR #3125](https://github.com/nanocoai/nanoclaw/pull/3125) – **per-agent-group timezone override** added by a core contributor. This allows users to set an IANA timezone per group via `container_configs`, with resolution cascading to a global default. Given the `core-team` label and the implementation already including migration 020, this feature has a high likelihood of being included in the next release. No other user-requested features were submitted.

### 7. User Feedback Summary
No new issues or comments were recorded today, so direct user feedback is unavailable. The absence of new bug reports suggests that existing users are either satisfied or not actively providing feedback. The ongoing fix PRs (especially the chat silence and MCP server errors) may address pain points that have been raised in prior weeks.

### 8. Backlog Watch
There are **no long-unanswered issues** because the project currently has **zero open issues** flagged as needing attention. Among PRs, several have been open since July 19 (e.g., #3090, #3093) and still await review or merge. While they have `core-team` labels, their age (6 days) may be worth monitoring to avoid stagnation. The mistaken PR #3123 was promptly closed, showing maintainer responsiveness. Overall, the backlog is healthy, but closing the older fix PRs would improve momentum.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-07-25

## Today's Overview

The project continues at a very high activity level, with **32 issues** and **50 PRs** updated in the last 24 hours. No new releases were published today. The v1 launch checklist remains the dominant focus, with a significant number of bug reports from a structured bug bash (P1/P2 tagged issues) and ongoing work on reliability epics, skill infrastructure, and WebUI polish. The team is actively closing issues (6 closed) and merging/landing PRs (20 merged/closed), indicating good momentum toward a stable release.

## Releases

No new releases or versions were published in the last 24 hours.

## Project Progress

**Merged/Closed PRs** (20 total) advanced several areas:

- **Developer Experience**: [#6663](https://github.com/nearai/ironclaw/pull/6663) makes `cargo run` default to the WebUI serve command, improving the local dev loop. [#6664](https://github.com/nearai/ironclaw/pull/6664) tightens e2e capability coverage metrics to count per outcome instead of per capability, eliminating false positives.
- **Architecture Refactoring**: [#6616](https://github.com/nearai/ironclaw/pull/6616) shrinks the composition extension host by moving generic host glue into `ironclaw_extension_host`, reducing duplication.
- **Accessibility**: [#6624](https://github.com/nearai/ironclaw/pull/6624) traps and restores keyboard focus in the extension configuration modal (fixes #6621).

**Closed Issues** (6) include v1-launch-checklist items around Slack OAuth configuration ([#6544](https://github.com/nearai/ironclaw/issues/6544)), upgrade blocking pre-v1.0.0 ([#6656](https://github.com/nearai/ironclaw/issues/6656)), CLI availability ([#6521](https://github.com/nearai/ironclaw/issues/6521)), and a Slack OAuth binding resolution ([#6614](https://github.com/nearai/ironclaw/issues/6614)). The epics for Pluggable Memory Providers ([#6482](https://github.com/nearai/ironclaw/issues/6482)) and Manifest V3 contract ([#6490](https://github.com/nearai/ironclaw/issues/6490)) were also closed, signalling completed design phases.

## Community Hot Topics

Most active issues by comment count:

1. **[#6284](https://github.com/nearai/ironclaw/issues/6284)** (5 comments) – Epic: “error-recoverability endgame — the model recovers from 100% of the errors it sees.” The deep interest reflects a critical reliability requirement: ensuring mid-run errors never cause agent failure and always give the model actionable feedback.
2. **[#6544](https://github.com/nearai/ironclaw/issues/6544)** (4 comments, closed) – Missing UI/CLI for a Slack OAuth redirect URI. The discussion highlights friction in hosted agent configuration.
3. **[#6524](https://github.com/nearai/ironclaw/issues/6524)** (3 comments) – Epic for a hermetic capability and journey testing platform. The community (and team) want deterministic coverage guarantees for every supported user journey.

The underlying need is clear: users and contributors are pushing for **guaranteed reliability** (error recovery) and **testability** (hermetic testing) as core architectural pillars before v1 shipping.

## Bugs & Stability

A major bug bash ran today, producing several **P1** and **P2** issues. Severity ranking:

**P1 (critical)** – All from the bug bash on the Railway staging instance:

- [#6645](https://github.com/nearai/ironclaw/issues/6645) – Slack `send_message` reports success but DM never delivered.
- [#6644](https://github.com/nearai/ironclaw/issues/6644) – Telegram replies delivered to wrong user message.
- [#6643](https://github.com/nearai/ironclaw/issues/6643) – Telegram messages accepted but never processed after pairing.

**P2 (high)** – Several observable UI and model behaviour issues:

- [#6649](https://github.com/nearai/ironclaw/issues/6649) – Tool activity panel appears after response instead of during execution.
- [#6648](https://github.com/nearai/ironclaw/issues/6648) – Tool failure messages are duplicated and inconsistent.
- [#6646](https://github.com/nearai/ironclaw/issues/6646) – Agent ignores Google Sheets actions, reports only email results.
- [#6651](https://github.com/nearai/ironclaw/issues/6651) – Agent repeats question text after responding (UI bug).
- [#6650](https://github.com/nearai/ironclaw/issues/6650) – Agent fabricates AQI data from mixed/cached web sources.
- [#6620](https://github.com/nearai/ironclaw/issues/6620) – Completed automation filter flashes full loading skeleton.
- [#6623](https://github.com/nearai/ironclaw/issues/6623) – Chat failure messages ignore selected language (i18n).
- [#6642](https://github.com/nearai/ironclaw/issues/6642) – CLI `models list` shows stale provider/model after TUI switch.

**Fixes in progress**: No fix PRs are yet associated with these P1/P2 bugs, but the systematic bug bash suggests they are being promptly triaged. The accessibility fix [#6624](https://github.com/nearai/ironclaw/pull/6624) (closing #6621) is a positive signal of parallel polish work.

## Feature Requests & Roadmap Signals

Several new epics and design docs indicate near-term roadmap priorities:

- **Reliability**: [#6284](https://github.com/nearai/ironclaw/issues/6284) (error recoverability) and [#6530](https://github.com/nearai/ironclaw/pull/6530) (pre-termination warning turns) aim to ensure the model never crashes and gets fair warning before shutdown.
- **Skill System**: [#6565](https://github.com/nearai/ironclaw/issues/6565) (reliable skill discovery, routing, activation) and [#6641](https://github.com/nearai/ironclaw/issues/6641) (skill self-creation design doc) point to a major push toward autonomous skill generation and accurate routing.
- **Infrastructure**: [#6666](https://github.com/nearai/ironclaw/issues/6666) (move process journal kernel into `ironclaw_processes`) and [#6524](https://github.com/nearai/ironclaw/issues/6524) (hermetic testing platform) reflect ongoing architectural consolidation for scalability and testability.
- **WebUI Performance**: [#6628](https://github.com/nearai/ironclaw/issues/6628) (improve bundle size) with sub-items [#6629](https://github.com/nearai/ironclaw/issues/6629) (route code splitting), [#6630](https://github.com/nearai/ironclaw/issues/6630) (asset compression/caching), and [#6631](https://github.com/nearai/ironclaw/issues/6631) (markdown/streaming render performance) – likely intended for the v1 final polish.

Prediction: The next version (v1.0.0-rc.9 or later) will include the skill self-creation design doc output, improved WebUI load times, and at least partial fixes for the bug bash P1 items.

## User Feedback Summary

Real user pain points surfaced today:

- **Slack/Telegram integration** is unreliable: messages either silently fail, go to the wrong thread, or become unresponsive after pairing. This is a critical blocker for hosted agents.
- **Model hallucination with real-world data**: The AQI fabrication ([#6650](https://github.com/nearai/ironclaw/issues/6650)) shows the model is pulling from mixed/cached web sources without proper attribution.
- **UI confusion**: Duplicate question text, late tool activity display, and language-mismatch errors degrade the user experience.
- **Configuration friction**: The Slack OAuth redirect URI absence (now closed) and stale CLI model listing ([#6642](https://github.com/nearai/ironclaw/issues/6642)) add friction for power users.

Overall, satisfaction is tempered by functional gaps in communication channels and model behaviour, but the structured bug bash and quick closure of several v1-launch-checklist issues show the team is responsive.

## Backlog Watch

The following long-standing open PRs or issues may need maintainer attention:

- **Attested signing PRs** (May 2026): [#4058](https://github.com/nearai/ironclaw/pull/4058), [#4054](https://github.com/nearai/ironclaw/pull/4054), [#4055](https://github.com/nearai/ironclaw/pull/4055), [#4060](https://github.com/nearai/ironclaw/pull/4060), [#4104](https://github.com/nearai/ironclaw/pull/4104) – All authored by `zmanian` with no update in over a month. These implement KMS fail-closed, trust enrollment, and multi-tenant tests. They are likely deferred due to v1 launch prioritisation, but could become stale conflicts.
- **Release PR** [#5598](https://github.com/nearai/ironclaw/pull/5598) (opened Jul 3) – Contains breaking changes in `ironclaw_common` and `ironclaw_skills`. Not merged; may be waiting for v1 readiness.
- **Dependency bumps**: [#6428](https://github.com/nearai/ironclaw/pull/6428) and [#6361](https://github.com/nearai/ironclaw/pull/6361) (both opened Jul 20-21) are pending review. Dependabot PRs are low risk but should not languish.
- **WebUI design system** [#5563](https://github.com/nearai/ironclaw/pull/5563) (since Jul 2) – A large PR adding a design system and playground; still open with no recent comments.

These items do not appear to be blockers for v1 but should be triaged to avoid accumulating technical debt.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

Okay, here is the project digest for LobsterAI (netease-youdao/LobsterAI) based on the data provided for 2026-07-25.

---

## LobsterAI Project Digest – 2026-07-25

### 1. Today's Overview

Today shows a moderately active project with a clear "release day" profile. While there are 19 active Issues and 7 open Pull Requests updated in the last 24 hours, there is a notable lack of resolution: **zero Issues were closed** and only **one PR was merged**. The community remains engaged, but many conversations are on long-standing, unresolved bug reports and feature requests. The core development pace seems focused on polishing a recently released version (2026.7.23) rather than pushing for a high volume of new features or fixes. The project's health is stable but shows signs of strain from an accumulated backlog.

### 2. Releases

A new version was released on 2026-07-23: **LobsterAI 2026.7.23**.
This release focuses on three main areas: enhancing the user experience for AI avatar creation, improving the collaboration ("cowork") tool's note-taking capabilities, and refining the application's build and packaging structure.

- **Key Changes:**
    - **UI/UX:** `feat(skin): improve AI skin creation flow` – A user-facing improvement to the process of creating and customizing AI agent appearances.
    - **Cowork:** `feat(cowork): 支持浏览器多注释附件` (Support multiple note attachments in Cowork) – Adds the ability to attach multiple browser notes, suggesting a focus on richer, more complex collaboration sessions.
    - **Build System:** `feat(build): add explicit channel entry points for Wind` – A technical improvement to the build pipeline, likely aimed at better handling deployment channels.

**No breaking changes or migration notes were found.**

### 3. Project Progress

Only one Pull Request was merged or closed today, indicating a quiet day for core feature development.

- **Merged PR:**
    - **[[CLOSED] #2382: fix(cowork): improve model timeout handling](https://github.com/netease-youdao/LobsterAI/pull/2382)**
        - **Author:** btc69m979y-dotcom
        - **Summary:** This is a stability-focused fix for the "Cowork" feature. It addresses model response timeouts by extending the server timeout (to 330s), better categorizing errors, and showing a local waiting hint after 30 seconds. This directly addresses a common class of user-facing bugs (e.g., `Issue #1849`).

### 4. Community Hot Topics

The community is most engaged with critical bugs and deep architectural concerns. The most active threads are all open for significant periods, suggesting unresolved frustration.

- **[Issue #1813: DeepSeek V4 无法使用 LLM request failed](https://github.com/netease-youdao/LobsterAI/issue/1813)** (7 comments)
    - **Analysis:** This is the most active issue, reporting a critical `LLM request failed` error for DeepSeek V4 users. The "provider rejected the request schema" error points to a compatibility issue that has persisted for three months. This is a top-priority blocker for any user trying to utilize DeepSeek's latest model.
- **[Issue #1849: "追问时会出现无限NO_REPLY" (Infinite NO_REPLY on follow-up)](https://github.com/netease-youdao/LobsterAI/issue/1849)** (3 comments)
    - **Analysis:** Users are experiencing broken conversation flows where the AI produces no output or just a few words. The reporter's log analysis points to a race condition where the backend task is marked complete while the model is still generating. This degrades the core product experience. Notably, the merged PR #2382 directly attempts to fix this class of bug.
- **[Issue #2041: 最大的瓶颈不是进化算法，而是记忆系统](https://github.com/netease-youdao/LobsterAI/issue/2041)** & **[Issue #2040: OpenClaw 的五大薄弱点](https://github.com/netease-youdao/LobsterAI/issue/2040)** (1 comment each)
    - **Analysis:** These two issues, opened by the same user, represent deep, high-quality community feedback. `#2040` is a systematic critique of the project's underlying OpenClaw engine, highlighting major architectural shortcomings (memory, security, cost, deployment). `#2041` narrows this down to the question of a functional memory system. These are not simple bugs but rather signals for long-term strategic planning from the maintainers.

### 5. Bugs & Stability

The project is experiencing several serious, long-standing bugs. No new critical bugs appear to have been introduced today.

| Severity | Issue | Description | Fix PR Exists? |
| :--- | :--- | :--- | :--- |
| **Critical** | [#1813: DeepSeek V4 无法使用](https://github.com/netease-youdao/LobsterAI/issue/1813) | LLM request fails for DeepSeek V4. Blocks use of a major model. | No |
| **Critical** | [#1849: 追问时无限NO_REPLY](https://github.com/netease-youdao/LobsterAI/issue/1849) | Chat completions fail after follow-up queries. | **Yes** - [#2382](https://github.com/netease-youdao/LobsterAI/pull/2382) (Merged today) |
| **High** | [#1796: Write tool execution always fail](https://github.com/netease-youdao/LobsterAI/issue/1796) | Write/Edit tools are completely broken for the user. | No |
| **High** | [#1993: AI engine connection lost issue](https://github.com/netease-youdao/LobsterAI/issue/1993) | Persistent connection loss in the desktop app but not in IM Bot. | No |
| **Medium** | [#1878: IM机器人 微信接口 配置扫码后无法输入验证码](https://github.com/netease-youdao/LobsterAI/issue/1878) | Crucial WeChat bot configuration step is missing a UI component. | No |
| **Medium** | [#1971: 会话页面向上滚动异常](https://github.com/netease-youdao/LobsterAI/issue/1971) | UI scroll bug in chat sessions, especially with long content like Mermaid diagrams. | No |

### 6. Feature Requests & Roadmap Signals

User feature requests are focused on expanding customization, interoperability, and improving visual design.

- **Top User Requests:**
    - **[#1836: 整体界面能够找专业的设计重新设计美化一下吗](https://github.com/netease-youdao/LobsterAI/issue/1836)** – A strong desire for a professional UI/UX redesign, with the user citing it as "too ugly" compared to competitors.
    - **[#1880: 希望增加Hermes Agent功能](https://github.com/netease-youdao/LobsterAI/issue/1880)** & **[#2016: 建议增加openhuman引擎功能](https://github.com/netease-youdao/LobsterAI/issue/2016)** – Requests to integrate external agent frameworks (Hermes Agent, OpenHuman).
    - **[#1797: 建议增加对话删除功能](https://github.com/netease-youdao/LobsterAI/issue/1797)** – A request for batch deletion of conversations to manage context.

- **Roadmap Signals:**
    - The new release (2026.7.23) shows investment in **improving AI avatar creation** and **enhancing the Cowork experience**, suggesting these are current development pillars.
    - The open PR **[#2193: feat: add LiteLLM as AI gateway provider](https://github.com/netease-youdao/LobsterAI/pull/2193)** is a significant strategic move towards provider agnosticism. It would allow users to easily connect to 100+ LLM providers, potentially mitigating issues like the one in `#1988` (forced model provider).
    - **Prediction for Next Version:** Given the merged fix `#2382` and the community pain, the next version will likely focus on **refining the Cowork feature's reliability**. The presence of the `LiteLLM` PR also suggests it is a high-priority feature ready for integration.

### 7. User Feedback Summary

User sentiment is mixed, reflecting a powerful but rough-around-the-edges tool.

- **Satisfaction:** Users who use the IM Bot (e.g., WeChat) report a **stable and usable experience**, with one user specifically noting "If I use IM Bot, the connection is stable" (`Issue #1993`). This indicates that the core agent functionality is solid.
- **Dissatisfaction & Pain Points:**
    - **Fragility & Complexity:** There is a strong undercurrent of frustration with the product's complexity and instability. Issues like `#1849` (infinite NO_REPLY) and `#1813` (DeepSeek failure) make core workflows unreliable.
    - **UI/UX is a Major Weakness:** The request for a professional redesign (`#1836`) is a clear signal that the user interface is a competitive disadvantage. Minor UI bugs like the blank loading state (`#1920`) and scrolling issues (`#1971`) compound this perception.
    - **Impedance for Power Users:** Power users are hitting advanced technical blocks, such as the **security vulnerabilities** (email path traversal), **forced model provider** selection (`#1988`), and **difficult local deployment** (`#2017`).

### 8. Backlog Watch

Several important Issues and PRs are "stale" (tagged or no recent maintainer activity) and risk becoming blockers for the project's stability and security.

- **Critical Security Backlog:**
    - **PRs #1831, #1832, #1833, #1835**: A series of security fixes authored by `kayo5994` have been open for **three months** (since April 27). These address sensitive log leakage, IPC access control, and XSS vulnerabilities. Their staleness for a security-focused project is a growing risk.
- **Important Bug Fix PRs:**
    - **[PR #1879: fix: preserve manually-added plugin load paths on config sync](https://github.com/netease-youdao/LobsterAI/pull/1879)** – Open for nearly 3 months. Silently dropping user's manual plugin configurations is a significant UX and stability issue for advanced users. Needs maintainer review.
- **High-Value Feature Request:**
    - **[Issue #1880: 希望增加Hermes Agent功能](https://github.com/netease-youdao/LobsterAI/issue/1880)** – This request has no maintainer activity for 3 months. Integrating third-party agent backbones like Hermes is a clear roadmap signal for evolving the platform.
- **Deep, Unresolved Technical Issues:**
    - **[Issue #2036](https://github.com/netease-youdao/LobsterAI/issue/2036)** and **[Issue #2039](https://github.com/netease-youdao/LobsterAI/issue/2039)** discuss deep architectural limitations of the OpenClaw engine (missing events, schema bugs for Dreaming mode). These require attention from the core maintainers to unblock the project's vision.

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis Project Digest – 2026-07-25

## 1. Today's Overview
The Moltis project saw no new releases, no merged pull requests, and no issue activity in the last 24 hours. Activity is concentrated on three open pull requests (authored by *penso*) that introduce significant Slack integration improvements and a documentation governance rule. The codebase remains in a feature-development phase for Slack capabilities, with no reported regressions or crashes. Overall project health appears stable, though community engagement on these PRs is minimal (zero comments and reactions so far).

## 2. Releases
*No new releases were published today.* The latest release remains unchanged; no migration notes or breaking changes to report.

## 3. Project Progress
No PRs were merged or closed today. The following open PRs represent active development:

- **PR #1165** ([open](https://github.com/moltis-org/moltis/pull/1165)) – *feat(slack): acknowledge messages with reactions and add reaction triggers*  
  Introduces Slack acknowledgment reactions (solving the missing typing-indicator problem) and inbound reaction triggers. Also fixes a confirmed wrong-message bug in threaded replies.

- **PR #1166** ([open](https://github.com/moltis-org/moltis/pull/1166)) – *feat(slack): phase reactions, reconnect supervision, Block Kit, and a premature-ack bugfix*  
  Follow-up to #1165, adding eight Slack improvements including phased reactions, reconnection supervision, Block Kit support, and a fix for a premature acknowledgment bug.

- **PR #1167** ([open](https://github.com/moltis-org/moltis/pull/1167)) – *docs: forbid Claude session URLs in commits and PRs*  
  Extends the `CLAUDE.md` git-workflow rules to explicitly prohibit `Claude-Session:` / AI-assistant session links in commit messages and PR descriptions.

## 4. Community Hot Topics
No issues or PRs have accumulated comments or reactions today. The three open PRs (listed above) represent the entirety of project discussion. Given the zero engagement, there is no community “hot topic” to analyze. The underlying need is clear from the PR content: **better user feedback in Slack** (acknowledgment reactions, phased reactions) and **stronger operational stability** (reconnect supervision, bug fixes).

## 5. Bugs & Stability
Two bugs have been identified and fixed in open PRs:

- **Wrong-message bug in threaded replies** (PR #1165) – fix included in the Slack feature PR. Severity: medium (could cause misrouted replies).
- **Premature-acknowledgment bug** (PR #1166) – fix for Slack messages being acknowledged before processing completes. Severity: medium (user experience degradation).

No new bugs, crashes, or regressions were reported today beyond these two. Both fix PRs are still open; once merged, they will resolve the issues.

## 6. Feature Requests & Roadmap Signals
All current feature work is focused on the Slack integration. The three PRs signal the following upcoming capabilities:

- **Slack acknowledgment reactions** (replacing missing typing indicator)
- **Inbound reaction triggers** (allow Slack users to interact via emoji reactions)
- **Phased reactions** (progressive status feedback)
- **Reconnection supervision** (improve Slack connection resilience)
- **Block Kit support** (rich message formatting)
- **Documentation governance** (forbid AI‑assistant session links in commits)

These features are likely to appear in the next release, pending PR review and merge. No external user feature requests are visible in this snapshot.

## 7. User Feedback Summary
The only directly addressed user pain point comes from the PR summaries: **Slack bots cannot show a typing indicator**, leaving users unaware that their message has been received. The acknowledgment reactions and phased reactions are a direct response to this gap. No other user satisfaction/dissatisfaction signals are present in the data.

## 8. Backlog Watch
No issues exist in the backlog (total open issues: 0). All three open PRs are recent (created July 24–25) and authored by the same contributor, so no long-unanswered items require maintainer attention.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw Project Digest — 2026-07-25

## 1. Today’s Overview

CoPaw saw very high activity on 2026-07-25, with **45 issues** and **32 PRs** updated in the last 24 hours (23 open issues, 22 closed; 20 open PRs, 12 merged/closed). Two new releases were published: a stable **v2.0.1** (including the PawApp SDK with a built-in Kanban app) and a polishing **v2.0.1-beta.3** focusing on chat performance stability. The community is highly engaged, but a significant number of regressions and missing features from the v2.0.0 ramp-up are being reported, indicating the project is in a consolidation phase. Maintainers have responded with several targeted fix PRs, and the feature request queue (especially community-driven suggestions) continues to grow.

---

## 2. Releases

### v2.0.1 (latest stable)
- **PawApp Platform & SDK**: A new mini-app framework allowing plugins to build rich interactive UIs on top of QwenPaw. Ships with a built-in **Kanban task board** app for project management.
- **Track PR**: [#6150](https://github.com/agentscope-ai/QwenPaw/pull/6150) (referenced in changelog)

### v2.0.1-beta.3 (pre-release)
- **Performance**: Stabilised chat options memoization and reduced SSE re-parsing ([#6393](https://github.com/agentscope-ai/QwenPaw/pull/6393))
- **Chore**: Version bump to v2.0.1 and date update.

**Breaking changes / migration notes**: None reported with these releases. Users migrating from v1.x should consult the full v2.0.0 migration guide (not included in this day’s data), but several open issues highlight regressions that may affect upgrades.

---

## 3. Project Progress

Today’s merged/closed PRs show progress on infrastructure, stability, and feature hardening:

| Merged/Closed PR | Summary |
|------------------|---------|
| [#6323](https://github.com/agentscope-ai/QwenPaw/pull/6323) | **Staged compaction & durable task continuity** for the Scroll context manager (improves conversation history) |
| [#6118](https://github.com/agentscope-ai/QwenPaw/pull/6118) | **Zalo Bot channel** added as a built-in channel (long-polling, no public webhook required) |
| [#5698](https://github.com/agentscope-ai/QwenPaw/pull/5698) | **Adapted `run_tool_batch`** to AgentScope 2.0 APIs and added control-flow support |
| [#6401](https://github.com/agentscope-ai/QwenPaw/issues/6401) (closed) | Bug fix for **scheduled task overwriting session history** (linked to a fix) |
| [#6341](https://github.com/agentscope-ai/QwenPaw/issues/6341) (closed) | **Channel deletion bug** — fixed default channel assignment after deletion |
| [#6451](https://github.com/agentscope-ai/QwenPaw/issues/6451), [#6450](https://github.com/agentscope-ai/QwenPaw/issues/6450), [#6449](https://github.com/agentscope-ai/QwenPaw/issues/6449) — [#6439](https://github.com/agentscope-ai/QwenPaw/issues/6439) | **13 feature-request issues closed** with “Close-and-review-later” label, signalling maintainers are evaluating them for a future roadmap (see §6). |

Several other open PRs are under review and nearing merge (e.g., [#6459](https://github.com/agentscope-ai/QwenPaw/pull/6459) – SQLite history hardening; [#6409](https://github.com/agentscope-ai/QwenPaw/pull/6409) – malformed tool call JSON fix).

---

## 4. Community Hot Topics

The most active issues (by comment count) reveal two principal community concerns: **regressions from v2.0.0** and **performance degradation**:

1. **[#5980 – Missing features: SSH Offline, Profiles returning 404](https://github.com/agentscope-ai/QwenPaw/issues/5980)** (7 comments)  
   *User reports critical features (SSH Offline, Profile management) are completely inaccessible in v2.0.0, returning 404 errors.*  
   **Underlying need**: Regression that blocks workflows. No fix PR is yet linked.

2. **[#6307 – v2.0 introduces ~2s fixed overhead per reply](https://github.com/agentscope-ai/QwenPaw/issues/6307)** (7 comments)  
   *Architectural change in the request pipeline adds a 2-second overhead independent of model latency.*  
   **Underlying need**: Performance regression – users expect v1.x parity.

3. **[#6258 – OpenAI model max tokens not effective](https://github.com/agentscope-ai/QwenPaw/issues/6258)** (3 comments, updated today)  
   *`max_tokens` parameter ignored for OpenAI-compatible models.*  
   **Underlying need**: Basic generation control broken.

4. **[#2999 – Repeated MCP client registration leads to task cancellation](https://github.com/agentscope-ai/QwenPaw/issues/2999)** (3 comments, open since April 2026)  
   *Each chat request re-registers MCP clients, causing CancelledError when MCP server is slow.*  
   **Underlying need**: MCP tool integration reliability.

5. **[#6405 – MCP Tool not found after v2.0 upgrade](https://github.com/agentscope-ai/QwenPaw/issues/6405)** (3 comments)  
   *Tool name format changes to `[mcp-key]__[tool_name]` but agent cannot find it.*  
   **Underlying need**: MCP migration friction.

---

## 5. Bugs & Stability

| Severity | Issue | Description | Fix PR Exists? |
|----------|-------|-------------|----------------|
| **Critical** | [#5980](https://github.com/agentscope-ai/QwenPaw/issues/5980) | v2.0.0 regression – SSH Offline and Profiles return 404 (features present in v1.x) | No |
| **Critical** | [#6307](https://github.com/agentscope-ai/QwenPaw/issues/6307) | ~2s fixed overhead per conversational reply, independent of model latency | No |
| High | [#6401](https://github.com/agentscope-ai/QwenPaw/issues/6401) | Scheduled tasks with `share_session: true` overwrite existing conversation history | Closed (fix merged) |
| Medium | [#6258](https://github.com/agentscope-ai/QwenPaw/issues/6258) | OpenAI model `max_tokens` not respected | No |
| Medium | [#6405](https://github.com/agentscope-ai/QwenPaw/issues/6405) | MCP tools not found after upgrade (naming mismatch) | No |
| Medium | [#6460](https://github.com/agentscope-ai/QwenPaw/issues/6460) | High CPU usage on Edge+Wayland when viewing sessions with ComfyUI results | No |
| Low | [#6457](https://github.com/agentscope-ai/QwenPaw/issues/6457) | Task mode produces excessive chat entries in history | No |

Additionally, active PRs addressing stability:
- [#6459](https://github.com/agentscope-ai/QwenPaw/pull/6459) – Harden SQLite persistence, backups, and concurrent writes.
- [#6409](https://github.com/agentscope-ai/QwenPaw/pull/6409) – Fix malformed `<tool_call>` JSON parsing in local models.
- [#6410](https://github.com/agentscope-ai/QwenPaw/pull/6410) – Strip annotated null schemas for Gemini provider.
- [#6412](https://github.com/agentscope-ai/QwenPaw/pull/6412) – Preserve multiline PowerShell commands.

---

## 6. Feature Requests & Roadmap Signals

A large batch of **13 feature requests** from community member `Hazemaan` were closed today with the label “Close-and-review-later”, indicating maintainers have noted them for future planning. Key items include:

- **Built-in Knowledge Base (RAG)** ([#6432](https://github.com/agentscope-ai/QwenPaw/issues/6432)) – Drag-and-drop document ingestion with automatic retrieval.
- **Multi-model agent runs** ([#6455](https://github.com/agentscope-ai/QwenPaw/issues/6455)) – Run multiple models independently and aggregate results.
- **Undo/redo last message** ([#6408](https://github.com/agentscope-ai/QwenPaw/issues/6408)) – `/undo` command to replace previous turn.
- **Agent isolation** ([#6461](https://github.com/agentscope-ai/QwenPaw/issues/6461)) – Prevent agents from reading/writing each other’s memory.
- **Web search toggle** ([#6450](https://github.com/agentscope-ai/QwenPaw/issues/6450)), **Assistant picker** ([#6451](https://github.com/agentscope-ai/QwenPaw/issues/6451)), **Per-chat parameter overrides** ([#6449](https://github.com/agentscope-ai/QwenPaw/issues/6449)) – Chat UX improvements.
- **Embedded mini-apps** ([#6448](https://github.com/agentscope-ai/QwenPaw/issues/6448)), **Notes with AI** ([#6447](https://github.com/agentscope-ai/QwenPaw/issues/6447)), **OCR** ([#6446](https://github.com/agentscope-ai/QwenPaw/issues/6446)), **Image generation** ([#6445](https://github.com/agentscope-ai/QwenPaw/issues/6445)), **Translation panel** ([#6444](https://github.com/agentscope-ai/QwenPaw/issues/6444)) – Expanded productivity features.
- **Lazy agent loading** ([#6443](https://github.com/agentscope-ai/QwenPaw/issues/6443)), **Parallel sub-agents** ([#6442](https://github.com/agentscope-ai/QwenPaw/issues/6442)), **One-click MCP install** ([#6441](https://github.com/agentscope-ai/QwenPaw/issues/6441)), **Backup & restore** ([#6440](https://github.com/agentscope-ai/QwenPaw/issues/6440)), **Multi-user roles** ([#6439](https://github.com/agentscope-ai/QwenPaw/issues/6439)) – Infrastructure and team features.

**Prediction for next version (v2.1+):** Given the volume of “Close-and-review-later” closures aligned with user demand, items like **Undo/redo**, **Web search toggle**, and **Agent isolation** are likely candidates for the next minor release. The built-in RAG and OCR features may appear as plugin-based additions.

---

## 7. User Feedback Summary

**Satisfaction**:
- The PawApp SDK and Kanban app (v2.0.1) are seen as valuable new capabilities.
- Community appreciation for quick patch releases (beta.3) fixing SSE and memo issues.

**Dissatisfaction & Pain Points**:
- **v2.0.0 regression** – two critical features (SSH offline, profiles) are simply gone.
- **Performance** – consistent reports of multi-second overhead per reply, making v2.0 slower than v1.x.
- **MCP friction** – tools not found after upgrade, repeated registration causing cancellations.
- **Task/cron side effects** – scheduled tasks corrupting session history (now fixed) and generating excessive log entries.
- **Lack of undo/edit** – users want the ability to correct a previous message without clearing context.
- **Agent isolation** – a privacy/security concern with multi-agent deployments.

**Use Cases Observed**:
- Personal assistants (single agent for daily work).
- Group chat bots (QwenPaw QQ integration) for community Q&A.
- Project management (Kanban) and multimedia creation (ComfyUI integration).
- Scheduled automation tasks (cron-based agent runs).

---

## 8. Backlog Watch

The following important issues and PRs have been open for a long time without significant maintainer response or resolution:

| Item | Age | Status | Comments |
|------|-----|--------|----------|
| [#2999](https://github.com/agentscope-ai/QwenPaw/issues/2999) – **Repeated MCP client registration leads to task cancellation** | Created 2026-04-06 (~110 days) | Open, no assignment, updated 2026-07-24 | Affects all MCP users; high severity but no linked PR. |
| [#5692](https://github.com/agentscope-ai/QwenPaw/pull/5692) – **Memory reranker for reme0.4** | Created 2026-07-01 (24 days) | Open, under review, no merge | Important memory improvement; could unblock RAG use cases. |
| [#5980](https://github.com/agentscope-ai/QwenPaw/issues/5980) – **v2.0.0 missing features (SSH offline, profiles 404)** | Created 2026-07-12 (13 days) | Open, 7 comments, no maintainer response | Highly active; expected to be addressed soon. |
| [#6307](https://github.com/agentscope-ai/QwenPaw/issues/6307) – **2s overhead per reply** | Created 2026-07-21 (4 days) | Open, 7 comments, no maintainer response | Performance regression needs root cause analysis. |

**Recommendation**: Maintainers should prioritize responding to or assigning [#2999](https://github.com/agentscope-ai/QwenPaw/issues/2999) and [#5980](https://github.com/agentscope-ai/QwenPaw/issues/5980) to reassure the community that these regressions are being handled. The high performance impact of [#6307](https://github.com/agentscope-ai/QwenPaw/issues/6307) also warrants a prompt investigation.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

# ZeptoClaw Project Digest — 2026-07-25

## 1. Today's Overview
ZeptoClaw saw moderate activity, with two issues and two pull requests updated in the last 24 hours. A critical **P1-critical** CI issue (#646) was identified that currently blocks all open PRs due to new Rust 1.97.1 Clippy warnings and vulnerable dependencies. On the positive side, a **P2-high** Telegram streaming feature was completed and merged via PR #648, and a runtime security fix for subprocess secret leaks (#645) is under active review. No new releases were cut today.

## 2. Releases
**None** – No new versions were published in the last 24 hours.

## 3. Project Progress
**Merged/Closed PRs:**
- **[#648 – feat(telegram): stream gateway responses](https://github.com/qhkm/zeptoclaw/pull/648)** (closed)  
  Implements real‑time Telegram response streaming via progressive message edits. Reuses the existing `StreamEvent` path, buffers deltas, preserves forum‑topic and reply routing, and handles UTF‑16 overflow and fallback on editing failures. This completes the feature requested in issue #647.

**Open PR (in progress):**
- **[#645 – fix(runtime): scrub subprocess secrets and reap timed-out process trees](https://github.com/qhkm/zeptoclaw/pull/645)**  
  Addresses two security/stability issues: (1) shell commands inheriting the full process environment (leaking provider keys to model‑authored commands) and (2) timeout‑dropped futures not reaping descendant processes (including Docker containers). This PR is open and awaiting review/merge; it introduced the CI baseline failures tracked in #646.

## 4. Community Hot Topics
- **[#646 – chore(ci): restore Clippy and cargo-deny checks on current toolchain](https://github.com/qhkm/zeptoclaw/issues/646)**  
  *P1-critical* | 2 comments | Updated yesterday  
  The most active discussion today centers on CI breakage. PR #645 exposed five new Clippy warnings (Rust 1.97.1) and two vulnerable versions of `quick-xml` and `lopdf`. The maintainer (`qhkm`) is the only participant so far. The underlying need is to keep CI green and unblock further contributions—this is the top priority for project health.

## 5. Bugs & Stability
| Severity | Issue/PR | Description | Fix Status |
|----------|----------|-------------|------------|
| **P1-critical** | [#646 (open)](https://github.com/qhkm/zeptoclaw/issues/646) | CI pipeline fails on current toolchain (Clippy warnings + vulnerable crate versions). Blocks all CI checks. | No fix PR yet; tracked as a chore to restore checks. |
| **P2-high** | [#645 (open PR)](https://github.com/qhkm/zeptoclaw/pull/645) | Subprocess secret leakage and unreaped process trees (timeout path). | Fix proposed and under review; CI issues caused by this PR are blocking merge. |

No crashes or regressions reported beyond these two items.

## 6. Feature Requests & Roadmap Signals
- **Telegram streaming** (merged in #648) is now complete. This aligns with previous roadmap hints about improving real‑time gateway responses.
- **Subprocess security hardening** (#645) is likely to land next, as it is a required dependency before other PRs can pass CI.
- No new user‑requested features were filed today. The CI fix (#646) is a prerequisite for any further contributions, so the next minor release will likely focus on stability (fix Clippy warnings and bump/downgrade dependencies).

## 7. User Feedback Summary
No explicit user feedback was recorded in the last 24 hours (no external comments on issues/PRs). However, the very existence of #645 and #646 indicates two implicit pain points:
- **Secret leakage risk**: Users (or the maintainer) identified that runtime shell commands expose all environment variables, including API keys, to model‑authored scripts – a serious security concern.
- **CI reliability**: Developers are blocked from contributing while Clippy and cargo‑deny checks fail. This frustrates the contribution pipeline and delays feature delivery.

Satisfaction is neutral; the merged Telegram streaming feature (#647/#648) likely meets a previously expressed need for real‑time message updates.

## 8. Backlog Watch
No long‑unanswered issues or PRs exist at this time. All open items (#645, #646) are recent (created July 23–24) and are receiving maintainer attention. The project is in a healthy state of active triage.

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

# EasyClaw Project Digest – 2026-07-25

**Data Snapshot:** 0 issues/PRs updated in last 24h, 1 new release (v1.8.80). No open issues or pull requests.

---

## 1. Today's Overview

EasyClaw saw minimal community activity over the past 24 hours, with no new or updated issues or pull requests. The only development signal is a single patch release (v1.8.80), which focuses on internal workflow refinements for affiliate teams and domain routing updates. The project currently has zero open issues or pull requests, indicating a stable but low‑engagement period. Maintainers appear to be in a maintenance phase, addressing operational improvements rather than feature expansion or bug fixes.

## 2. Releases

### v1.8.80 – TK Copilot v1.8.80
- **Released:** 2026-07-25
- **Changes:**
  - Refine affiliate team workflows and protected creator imports.
  - Route desktop website links to the new TK domains.
- **Breaking Changes:** None noted.
- **Migration Notes:** No migration steps required; update via normal channel.
- **Installation note (macOS):** Users may encounter the trust warning "RivonClaw is damaged and can't be opened" – a common macOS Gatekeeper issue (workaround: allow in System Preferences).

**GitHub:** [Release v1.8.80](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.80)

## 3. Project Progress

No pull requests were merged or closed in the last 24 hours. The only code changes are those bundled in the v1.8.80 release. No feature advancements or fixes beyond the release notes were observed.

## 4. Community Hot Topics

No issues or pull requests have active discussions today. The community is not currently debating any specific feature, bug, or design topic on the GitHub tracker.

## 5. Bugs & Stability

No new bugs, crashes, or regressions were reported in the last 24 hours. The project shows no open stability concerns in the tracker. The v1.8.80 release does not mention any bug fixes, suggesting the release is purely a workflow/domain update.

## 6. Feature Requests & Roadmap Signals

No feature requests were submitted or discussed today. Based on the release content, the current focus is on operational polish (affiliate workflows, domain routing). No signals point toward specific features in the next version.

## 7. User Feedback Summary

With no new issues or PRs, no user pain points or satisfaction signals were recorded today. The release note’s mention of protected creator imports may relate to user requests for better affiliate management, but no direct feedback is available in the tracker.

## 8. Backlog Watch

No unanswered issues or stale pull requests are currently in the backlog. The project’s issue tracker is entirely clear, indicating maintainer responsiveness in previous cycles or a lack of user activity. No items require maintainer attention at this time.

---

**Overall Assessment:** EasyClaw is in a quiet phase with a single minor release. The project appears healthy but idle from a community engagement standpoint. Monitor for new issues or PRs in the coming days to gauge renewed activity.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar).*