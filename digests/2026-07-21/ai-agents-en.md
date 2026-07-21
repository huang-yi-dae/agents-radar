# OpenClaw Ecosystem Digest 2026-07-21

> Issues: 355 | PRs: 500 | Projects covered: 13 | Generated: 2026-07-21 03:21 UTC

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

# OpenClaw Project Digest — 2026-07-21

## 1. Today's Overview

OpenClaw remains in a period of intense development and stabilization. In the last 24 hours, **355 issues were updated** (226 open, 129 closed) and **500 pull requests were updated** (375 open, 125 closed/merged), signaling a project at full throttle. The absence of new releases suggests the team is consolidating fixes and features in the `main` branch ahead of a planned cut. The issue tracker is dominated by **P1 reliability bugs** — context overflows, message loss, and session stalls — many of which have claw-sweeper labels requesting maintainer review or product decisions. The high PR volume (125 closed/merged today) indicates steady progress on both bug fixes and new capabilities, but the queue of 375 open PRs points to a heavy review bottleneck. Community engagement remains strong, with several long-running feature discussions accumulating double-digit comments and reactions.

## 2. Releases

**None** – No new releases were published in the last 24 hours.

## 3. Project Progress

**Merged/Closed PRs (125 today)** – While the full list is not enumerated, the top 30 by comment count includes several that were closed/merged today:

- **PR #112034** – `fix(ui): clear stuck Needs review after completed turns` (closed, size XL) — Resolves a Web UI issue where false "Needs review" rows persisted after delivery confirmation.
- **PR #111977** – `feat(dashboard): widget presentation contract, shared frame inset, and intrinsic auto height` (closed, size L) — Standardizes widget rendering across chat and board surfaces.
- **PR #111793** – `chore(ui): refresh control ui locales` (closed, size XS) — Automated locale synchronization.
- **PR #106635** – `fix(clickclack): redact REST error details` (closed, size XS) — Prevents credential leak in error messages.
- **PR #108238** – Bug fix (closed) for context usage miscalculation in 2026.7.1 that misidentified `cacheRead` as total tokens.

**Notable open PRs with proof sufficient and ready for maintainer look:**
- `fix(auth): decouple plugin synthetic-auth from profile fallback` (#110179, P1)
- `fix(network): guarded fetch callers can leave responses streaming` (#111277, P2)
- `fix(memory-core): bound dreaming markdown reads` (#110450, P2)
- `fix(browser): retire durable tab rows whose browser never returns` (#111307, P2)
- `fix(admin-http-rpc): time out incomplete request bodies` (#104564, P2)

These indicate ongoing work on security, resource cleanup, and edge-case resilience.

## 4. Community Hot Topics

The most active issues (by comment count and reactions) reveal deep user concerns around reliability and security:

| Issue | Comments | 👍 | Summary |
|-------|----------|---|---------|
| [#99241 – Tool outputs sometimes render as image attachments](https://github.com/openclaw/openclaw/issues/99241) | 23 | 2 | Long-running tool results collapse into unreadable image placeholders, breaking agent cognition. |
| [#88312 – Regression: Codex turn-completion stall](https://github.com/openclaw/openclaw/issues/88312) *(closed)* | 22 | 5 | Multi-tool agent turns stall on 2026.5.27; previously fixed by #85107 now regressed. |
| [#7707 – Memory trust tagging by source](https://github.com/openclaw/openclaw/issues/7707) | 20 | 0 | Feature request to prevent memory poisoning from untrusted content. |
| [#87744 – Telegram turns time out waiting for turn/completed](https://github.com/openclaw/openclaw/issues/87744) | 17 | 3 | Codex-backed Telegram sessions repeatedly fail on 2026.5.27. |
| [#58450 – Agent promises follow-up without starting action](https://github.com/openclaw/openclaw/issues/58450) | 16 | 4 | Agent appears to commit to background tasks that never execute. |

**Underlying needs:** Users are demanding **reliable session continuity**, **secure memory handling**, and **transparent agent behavior**. The high engagement on regression and memory-poisoning issues indicates trust is at stake. The community is proactively identifying patterns (e.g., "platinum hermit" rated issues) that need architectural fixes rather than quick patches.

## 5. Bugs & Stability

**Critical/P1 regressions and stability issues (active, not closed):**

| Issue | Rating | Impact | Fix PR Exists? |
|-------|--------|--------|----------------|
| [#88312 – Codex turn-completion stall *(closed)*](https://github.com/openclaw/openclaw/issues/88312) | 🐚 Platinum Hermit | Session stall, message loss | Previously fixed by #85107, now regressed – re-fix needed. |
| [#87744 – Telegram timeouts](https://github.com/openclaw/openclaw/issues/87744) | 🦞 Diamond Lobster | Message loss, crash loop | No linked PR yet. |
| [#63216 – Repeated hard resets despite high reserveTokensFloor](https://github.com/openclaw/openclaw/issues/63216) *(closed)* | 🐚 Platinum Hermit | Session state loss, retry loop | Closed but pattern persists? |
| [#86996 – Active Memory + Codex causes long latency and gateway stalls](https://github.com/openclaw/openclaw/issues/86996) | 🦞 Diamond Lobster | Message loss, auth provider issues, crash loop | No linked PR; fix shape clear. |
| [#78562 – Repeated tool-loop context overflows after compaction](https://github.com/openclaw/openclaw/issues/78562) | 🦞 Diamond Lobster | Session state loss | No linked PR; fix shape clear. |
| [#86733 – Gateway process alive but event loop frozen](https://github.com/openclaw/openclaw/issues/56733) | 🐚 Platinum Hermit | All HTTP requests timeout | No linked PR. |
| [#108238 – Context usage miscalculation in 2026.7.1 *(closed)*](https://github.com/openclaw/openclaw/issues/108238) | 🦀 Challenger Crab | False compaction triggers | Closed (fix merged). |

**Key stability themes:**
- **Context management** remains the top pain point – compaction loops, miscalculated usage, and silent abandonments.
- **Telegram and Matrix channel reliability** is degraded, with several P1 bugs blocking message delivery.
- **Node.js v26 gzip decompression issue** (#79752, closed) was a blocker for Discord users; now fixed.

## 6. Feature Requests & Roadmap Signals

Several enhancement issues have high community interest or maintainer traction:

| Issue | Rating | Summary | Predictor |
|-------|--------|---------|-----------|
| [#7707 – Memory trust tagging by source](https://github.com/openclaw/openclaw/issues/7707) | 🦞 Diamond Lobster | Tag memory entries by origin trust level. | Strong “needs-product-decision” label – likely to be scoped for next minor release. |
| [#10659 – Masked secrets for API keys](https://github.com/openclaw/openclaw/issues/10659) | 🦞 Diamond Lobster | Agents use keys without seeing them. | Fix shape clear + needs-security-review – high priority given recent credential leaks. |
| [#12219 – Skill permission manifest (skill.yaml)](https://github.com/openclaw/openclaw/issues/12219) | 🌊 Off-meta Tidepool | Standardize permission declarations for skills. | Part of broader security push; may land after masked secrets. |
| [#10142 – session:end internal hook event](https://github.com/openclaw/openclaw/issues/10142) | 🦞 Diamond Lobster | Workflow orchestration integration. | Linked PR open – likely in next release. |
| [#9912 – maxTurns/maxToolCalls config](https://github.com/openclaw/openclaw/issues/9912) | 🦞 Diamond Lobster | Limit agent iterations to prevent runaway loops. | High demand from model behavior issues – plausible inclusion. |
| [#84527 – Add Antigravity CLI (agy) backend](https://github.com/openclaw/openclaw/issues/84527) | 🌊 Off-meta Tidepool | Replace deprecated `google-gemini-cli`. | Urgent due to Google's June 18 deadline – must be in next release. |

**Roadmap prediction:** The next release (likely 2026.7.x) will prioritize **secret management** (masked secrets, skill permissions), **session API enhancements** (session:end hook, transcript curation), and **backend migration** (Antigravity CLI). Reliability fixes for context and channel integrations are almost certain.

## 7. User Feedback Summary

**Pain points** (from issue descriptions and comments):
- “_Agent promises follow-up but never starts action_” (#58450) – Users feel misled when agents claim background tasks that don't execute.
- “_Tool errors and transient failures are noisy_” (#39406, #8299) – Users want control over announcement suppression.
- “_Context compaction loops make Telegram sessions unusable_” (#78562) – Repeated compaction without progress degrades trust.
- “_Memory poisoning is a real threat_” (#7707) – Users worry about trusting scraped content.
- “_Hard resets despite high reserveTokensFloor_” (#63216) – Configuration inconsistencies undermine durability.
- “_Google Chat space messages silently ignored_” (#58514) – Platform parity is a recurring frustration.

**Satisfaction signals:**
- Community is actively contributing with well-structured bug reports (many include `clawsweeper:source-repro` and `clawsweeper:needs-live-repro`).
- High reaction counts (👍) on regressions show users appreciate transparency and urgency.
- Many closed issues are marked with `clawsweeper:fix-shape-clear` indicating maintainers have a clear path forward.

**Overall sentiment:** Users are deeply invested but **experiencing a rough patch** of reliability regressions since the 2026.5.x releases. The community's willingness to provide detailed repro steps and test environments suggests strong resilience, but the volume of P1 bugs and the backlog of open PRs indicates maintainers are stretched.

## 8. Backlog Watch

**Long-unanswered important issues needing maintainer attention** (based on stale label, high rating, and no linked PR):

| Issue | Created | Rating | Last Update | Why Concern |
|-------|---------|--------|-------------|-------------|
| [#58450 – Agent promises follow-up without action](https://github.com/openclaw/openclaw/issues/58450) | 2026-03-31 | 🐚 Platinum Hermit | 2026-07-20 | Stale, P2, but impacts user trust; no maintainer review. |
| [#51473 – (not listed) placeholder] | | | | |
| [#58775 – Google Vertex provider broken](https://github.com/openclaw/openclaw/issues/58775) | 2026-04-01 | 🦪 Silver Shellfish | 2026-07-20 | Stale, P2, waiting product decision; blocks Vertex users. |
| [#58514 – Google Chat space messages ignored](https://github.com/openclaw/openclaw/issues/58514) | 2026-03-31 | 🐚 Platinum Hermit | 2026-07-20 | Stale, P1, needs maintainer review. |
| [#60381 – Browser tool: force click and evaluate](https://github.com/openclaw/openclaw/issues/60381) *(closed)* | 2026-04-03 | 🐚 Platinum Hermit | 2026-07-20 | Closed without resolution? Wait for confirmation. |
| [#55139 – (not listed) placeholder] | | | | |
| [#56733 – Gateway event loop frozen](https://github.com/openclaw/openclaw/issues/56733) | 2026-03-29 | 🐚 Platinum Hermit | 2026-07-20 | Stale, P1, no linked PR; critical for WSL2 users. |
| [#8299 – Suppress subagent announce](https://github.com/openclaw/openclaw/issues/8299) | 2026-02-03 | 🦞 Diamond Lobster | 2026-07-21 | Enhancement with 8 comments, needs product decision. |

**Call to action:** Issues with `clawsweeper:needs-maintainer-review` and `clawsweeper:needs-product-decision` labels have been pending for **3-5 months**. The community is actively contributing workable repros; unblocking these decisions would accelerate closure and improve project health.

---

*Generated from GitHub data snapshot of openclaw/openclaw on 2026-07-21.*

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report: AI Agent Open-Source Ecosystem

## 1. Ecosystem Overview

The open-source personal AI assistant ecosystem is characterized by intense development velocity, with major projects like OpenClaw, IronClaw, and CoPaw processing hundreds of issues and PRs daily. While the ecosystem as a whole is maturing—evidenced by increasing attention to security, memory management, and multi-agent collaboration—many projects are still grappling with reliability regressions, particularly around context handling and session continuity. A clear bifurcation is emerging: large, feature-rich reference implementations (OpenClaw, IronClaw) that carry significant technical debt, and smaller, more focused projects (NanoBot, NanoClaw) that iterate faster on niche use cases. The community is increasingly vocal about the need for stable, trustworthy agents, with trust tagging, credential protection, and transparent behavior surfacing as cross-cutting demands.

## 2. Activity Comparison

| Project          | Issues Updated (24h) | PRs Updated (24h) | PRs Merged/Closed (24h) | Release Status (24h) | Health Score |
|-----------------|---------------------|-------------------|------------------------|----------------------|--------------|
| OpenClaw        | 355 (226 open, 129 closed) | 500 (375 open, 125 merged/closed) | 125 | No new release | High activity, high bug load, bottlenecked |
| NanoBot         | 6 (2 closed, 4 open) | 29 (17 open, 12 merged/closed) | 12 | No new release | Healthy, responsive |
| ZeroClaw        | 39 (not specified) | 50 (not specified) | 12 (9 issues closed) | v0.8.3 (no update) | High velocity, active |
| PicoClaw        | 10 (4 open, rest not specified) | 10 (5 merged/closed) | 5 | No new release | Moderate, some stale items |
| NanoClaw        | 6 (all open) | 20 (14 open, 6 merged/closed) | 6 | No new release | Healthy, responsive |
| NullClaw        | 0 | 0 (1 open PR) | 0 | No new release | Static, low activity |
| IronClaw        | 43 (40 open, 3 closed) | 50 (23 open, 27 merged/closed) | 27 | No new release | Very high activity, turbulent |
| LobsterAI       | 0 | 15 (4 open, 11 merged) | 11 | No new release | Solid, stable |
| TinyClaw        | 0 | 0 | 0 | – | Inactive |
| Moltis          | 0 | 0 | 0 | – | Inactive |
| CoPaw (QwenPaw) | 24 (16 open, 8 closed) | 41 (31 open, 10 merged/closed) | 10 | No new release | High activity |
| ZeptoClaw       | 0 | 0 | 0 | – | Inactive |
| EasyClaw        | 0 | 0 | 0 | Two releases (v1.8.77, v1.8.76) | Quiet, delivering |

**Notes**: Health Score is qualitative based on activity level, responsiveness to bugs, and backlog size. NullClaw, TinyClaw, Moltis, and ZeptoClaw show no meaningful development.

## 3. OpenClaw’s Position

OpenClaw remains the largest and most active project by a wide margin, with 355 issues and 500 PRs handled daily—roughly 7–10× the volume of its nearest competitor (IronClaw, CoPaw). This scale brings both advantages and challenges:

- **Advantages**: Largest community (dominant number of contributors and users); broadest feature set; reference implementation status; deepest integration support (Telegram, Matrix, Discord, etc.).
- **Technical approach**: Monolithic core with extensive plug-in architecture; heavy reliance on context compaction and memory management; sophisticated rating system (Platinum Hermit, Diamond Lobster) for triage.
- **Pain points**: High regression ratio (many P1 bugs re-emerging); review bottleneck (375 open PRs); community trust eroding due to session stalls and message loss.

Compared to peers, OpenClaw is the “stock” everyone builds upon but also the most fragile. Projects like NanoBot and NanoClaw are deliberately leaner, offering cleaner codebases with fewer regressions but narrower scope.

## 4. Shared Technical Focus Areas

The following requirements appear across multiple projects, indicating systemic ecosystem gaps:

| Focus Area | Projects Affected | Specific Needs |
|------------|------------------|----------------|
| **Memory/Context Management** | OpenClaw, ZeroClaw, CoPaw, NanoBot | Context overflow prevention, compaction loops, memory poisoning prevention, trust tagging by source |
| **Security & Credential Hardening** | OpenClaw, NanoBot, NanoClaw, PicoClaw, IronClaw | Masked secrets, API key protection, OAuth consent replay, role/approval correctness |
| **Multi-Agent / Subagent Reliability** | OpenClaw, ZeroClaw, NanoBot, CoPaw | Agent-to-agent communication (A2A), persistent identities, subagent loop prevention |
| **Channel Stability** | OpenClaw (Telegram, Matrix), NanoBot (QQ, Feishu), PicoClaw (Matrix), IronClaw (Telegram UI) | Reconnection logic, silent message loss, timeout handling |
| **Self-Hosting & Deployment Simplification** | OpenClaw, NanoBot, NanoClaw, EasyClaw | One-click deploy templates (Render, Dokploy), systemd integration, mobile support |
| **Local Model Performance** | OpenClaw, NanoBot, CoPaw | Ollama caching, prompt reuse diagnostics, local embedding config |
| **Cross-Platform Parity** | OpenClaw, ZeroClaw, IronClaw, PicoClaw | Windows test coverage, Android support, platform-specific packaging |

## 5. Differentiation Analysis

Each project occupies a distinct niche:

- **OpenClaw**: All-encompassing reference implementation; targets developers and power users; most complex feature surface.
- **IronClaw**: Undergoing a major architectural rebuild (Tier B / Reborn); focuses on production-grade streaming and extension ecosystem (IronHub).
- **ZeroClaw**: Emphasis on Standard Operating Procedures (SOP) control plane and persistent memory; strong alignment with agent evaluation harness.
- **CoPaw (QwenPaw)**: Deep integration with Alibaba Cloud ecosystem (Qwen models, Feishu, DashScope); strong on memory (ReMe) and reasoning duplication fixes.
- **NanoBot**: Lightweight, multi-provider agent; rapid feature cycles (caldav, deploy templates); strong community contributions.
- **NanoClaw**: Security-first design with granular role/approval system; channel-focus on LINE, Dial, WhatsApp.
- **PicoClaw**: Mobile and multi-platform focus (Android, Japanese localization); deferred MCP tool reliability.
- **LobsterAI**: Windows desktop client with silent updates, browser annotation (Cowork), and AI skin creation.
- **EasyClaw**: Enterprise-oriented with Feishu integration, merchant security, affiliate proposal workflows.

**Key architectural difference**: OpenClaw, ZeroClaw, and IronClaw are monolithic with plug-in systems; NanoBot, NanoClaw, and PicoClaw are more modular and lean. CoPaw and EasyClaw are ecosystem-locked (Alibaba, NetEase).

## 6. Community Momentum & Maturity

The ecosystem can be grouped into four tiers:

**Tier 1 – High Velocity (Rapid Iteration, Some Instability)**  
- *OpenClaw, IronClaw, ZeroClaw, CoPaw*  
  These projects process dozens to hundreds of PRs daily, ship features frequently, but suffer from regressions and backlog strain. IronClaw is in a major migration; ZeroClaw is building out SOP/memory parity; CoPaw is fixing reasoning bugs.

**Tier 2 – Moderate Velocity (Stable, Feature-Addition Phase)**  
- *NanoBot, NanoClaw, LobsterAI, PicoClaw*  
  These projects merge 5–12 PRs per day, have responsive maintainers, and maintain cleaner backlogs. They are expanding channels, security, and deployment options without destabilizing core.

**Tier 3 – Stable Delivery (Low Community Activity, Reliable Releases)**  
- *EasyClaw*  
  No open issues or PRs; releases are pushed by maintainers directly. The project is mature but may lack external contribution dynamics.

**Tier 4 – Inactive / Stalled**  
- *NullClaw, TinyClaw, Moltis, ZeptoClaw*  
  No development activity in the past day (or longer). These may be abandoned or in maintenance-only mode.

**Overall maturity**: The ecosystem is approaching middle adulthood – features are rich, but reliability and security are the new frontier. The most active projects are now paying down technical debt (IronClaw’s monolith deletion, ZeroClaw’s memory overhaul).

## 7. Trend Signals

From community feedback and feature requests across projects, the following industry trends are emerging:

1. **Memory Trustworthiness**: Users increasingly demand that memory entries be tagged by source trust level (OpenClaw #7707, ZeroClaw #8891, CoPaw #6222). Memory poisoning is a real concern as agents autonomously scrape content.

2. **Credential Transparency**: The move toward masked secrets and role-based approval (NanoClaw #3097–3100, OpenClaw #10659, NanoBot #4803) signals that security is no longer an afterthought.

3. **Multi-Agent Orchestration**: A2A protocol (ZeroClaw #3566) and subagent evolution (NanoBot #5000) point toward a future where agents interact as peers, not just tools.

4. **Local Model Parity**: Ollama prompt caching (NanoBot #4867) and offline embedding configurations (CoPaw #6242) show users want to reduce cloud dependency without sacrificing performance.

5. **Deployment as a Feature**: One-click deploy templates (NanoBot #4937, #1503), systemd lifecycle fixes (PicoClaw #3276), and Android support (PicoClaw #3182) indicate a shift from developer-only to end-user self-hosting.

6. **Channel Reliability**: Telegram, Matrix, and QQ/Feishu sessions remain frustratingly fragile. Projects that solve reconnection logic and message loss first will win trust.

**Value for AI agent developers**: Invest in context management algorithms, secure credential storage (e.g., environment variables over plaintext), and resilient channel integration. The market is moving toward agents that are both powerful and predictable.

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot Project Digest — 2026-07-21

## Today's Overview

The project saw high activity with **29 pull requests updated** in the last 24 hours (12 merged/closed, 17 open) and **6 issues updated** (2 closed, 4 open). No new releases were published today. The maintenance focus remains on **bug fixes and stability improvements**, particularly around session handling, channel reliability, and security hardening. Community contributions continue to grow, with several long-standing feature requests (e.g., Dokploy template, multi-agent collaboration) now attracting implementation PRs. Overall project health is strong, with maintainers actively reviewing and merging PRs at a rapid pace.

---

## Releases

*No new releases were published in the last 24 hours.*

---

## Project Progress — Merged/Closed PRs

**12 PRs were merged or closed today**, contributing to both feature additions and critical bug fixes:

### Key Merged Improvements

| PR | Summary | Impact |
|----|---------|--------|
| [#5004](https://github.com/HKUDS/nanobot/pull/5004) | `fix(session): tolerate unsupported directory fsync` | Prevents crashes on shared filesystems that reject `fsync` on directories; adds regression tests. |
| [#5008](https://github.com/HKUDS/nanobot/pull/5008) | `fix(providers): keep all images when merging consecutive multimodal user turns` | Fixes album/multi-image flows where only the last image was preserved. |
| [#4937](https://github.com/HKUDS/nanobot/pull/4937) | `feat: add one-click deploy to render support` | Enables deployment to Render via a Blueprint (gateway + WebUI, persistent storage). |
| [#4993](https://github.com/HKUDS/nanobot/pull/4993) | `refactor(agent): unify internal turn lifecycle` | Eliminates duplicated logic for system messages and subagent results; reduces code complexity. |
| [#4768](https://github.com/HKUDS/nanobot/pull/4768) | `fix(qq): add exponential backoff to WebSocket reconnect loop` | Replaces fixed 5-second retry with backoff, reducing flood of error logs during DNS failures. |
| [#4982](https://github.com/HKUDS/nanobot/pull/4982) | `fix(feishu): avoid hang in fallback text chunks when limit ≤ 0` | Prevents infinite loop in `_fallback_text_chunks` for non-positive `limit`. |
| [#4981](https://github.com/HKUDS/nanobot/pull/4981) | `fix(telegram): avoid hang in markdown split when max_len ≤ 0` | Prevents infinite loop in `_split_telegram_markdown` for non-positive `max_len`. |
| [#4998](https://github.com/HKUDS/nanobot/pull/4998) | `docs(ollama): document tool prompt cache diagnostics` | Adds guide for diagnosing Ollama prompt-cache reuse; links from cookbook and provider docs. |

### Other Merged/Closed PRs
- [#5004](https://github.com/HKUDS/nanobot/pull/5004) (closed)
- [#5008](https://github.com/HKUDS/nanobot/pull/5008) (closed)
- [#4937](https://github.com/HKUDS/nanobot/pull/4937) (closed)
- [#4993](https://github.com/HKUDS/nanobot/pull/4993) (closed)
- [#4768](https://github.com/HKUDS/nanobot/pull/4768) (closed)
- [#4982](https://github.com/HKUDS/nanobot/pull/4982) (closed)
- [#4981](https://github.com/HKUDS/nanobot/pull/4981) (closed)
- [#4998](https://github.com/HKUDS/nanobot/pull/4998) (closed)
- [#4988](https://github.com/HKUDS/nanobot/pull/4988) (open) — not merged today
- [#5009](https://github.com/HKUDS/nanobot/pull/5009) (open) — not merged today
- [#5010](https://github.com/HKUDS/nanobot/pull/5010) (open) — not merged today
- [#5007](https://github.com/HKUDS/nanobot/pull/5007) (open) — not merged today

### Deploy & Infrastructure
- [#4937](https://github.com/HKUDS/nanobot/pull/4937) (Render deploy template) **merged**.
- [#5007](https://github.com/HKUDS/nanobot/pull/5007) (Dokploy one-click deploy) remains **open**.

---

## Community Hot Topics

The most active discussions this update center on **performance, security, and the future of agent collaboration**.

### Most Active Issue

| Issue | Comments | Status | Summary |
|-------|----------|--------|---------|
| [#4867](https://github.com/HKUDS/nanobot/issues/4867) | 15 | **Closed** | Enhancement request: preserve exact prompt prefix to enable caching in Ollama. User reports 60-second delay per turn due to missing cache reuse. |

**Analysis**: The 15-comment discussion reflects strong demand for **Ollama performance optimization**. The issue was closed, indicating a solution may be under way or documented via PR [#4998](https://github.com/HKUDS/nanobot/pull/4998).

### Growing Feature Demands

| Issue | Comments | Status | Summary |
|-------|----------|--------|---------|
| [#5000](https://github.com/HKUDS/nanobot/issues/5000) | 1 | **Open** | Proposal to evolve subagent system toward true multi-agent collaboration with persistent identities and shared state. |
| [#1503](https://github.com/HKUDS/nanobot/issues/1503) | 1 | **Open** | Request for a Dokploy one-click deploy template (since March 2026). PR [#5007](https://github.com/HKUDS/nanobot/pull/5007) now addresses this. |
| [#4803](https://github.com/HKUDS/nanobot/issues/4803) | 1 | **Open** | Security issue: API keys stored as plaintext in config. Now accompanied by PR [#5010](https://github.com/HKUDS/nanobot/pull/5010) for documentation improvements. |

**Underlying needs**: Users want **better performance with local models**, **easier self-hosting for non-technical users**, **secure credential management**, and **richer multi-agent capabilities** beyond simple task delegation.

---

## Bugs & Stability

### High Severity

| Issue | Severity | Status | Details | Fix PR |
|-------|----------|--------|---------|--------|
| [#4864](https://github.com/HKUDS/nanobot/issues/4864) | **Critical** | Open | Endless loop when `complete_goal` tool is called because gateway parses `recap` parameter as bare string instead of JSON object. | No linked fix PR yet. |
| [#4803](https://github.com/HKUDS/nanobot/issues/4803) | **High** | Open | API keys, bot tokens, and passwords stored as plaintext in `~/.nanobot/config.json` despite `repr=False`. Needs `exclude=True` in Pydantic model. | PR [#5010](https://github.com/HKUDS/nanobot/pull/5010) (documentation, not code fix). |
| [#5004](https://github.com/HKUDS/nanobot/issues/5004) (PR) | **High** | Merged | Session system crashes on shared filesystems that reject `fsync` on directories. Fixed by tolerating `EINVAL`. | [#5004](https://github.com/HKUDS/nanobot/pull/5004) (merged). |
| [#5005](https://github.com/HKUDS/nanobot/issues/5005) (PR) | **Medium** | Open | Blanket recursive `rm` deny rule blocks legitimate cleanup commands. Fix replaces with target-aware guard. | [#5005](https://github.com/HKUDS/nanobot/pull/5005) (open). |

### Medium Severity (Fixed Today)

| Issue | Severity | Status | Details |
|-------|----------|--------|---------|
| [#4767](https://github.com/HKUDS/nanobot/issues/4767) | Medium | **Closed** | QQ channel WebSocket reconnect loop with fixed 5-second interval floods logs on DNS failure. Fixed in [#4768](https://github.com/HKUDS/nanobot/pull/4768). |
| [#4982](https://github.com/HKUDS/nanobot/issues/4982) / [#4981](https://github.com/HKUDS/nanobot/issues/4981) | Medium | **Closed** | Infinite loops in Feishu and Telegram text splitting when `limit`/`max_len` ≤ 0. Fixed in [#4982](https://github.com/HKUDS/nanobot/pull/4982) and [#4981](https://github.com/HKUDS/nanobot/pull/4981). |

### Ongoing Open Bugs
- [#4954](https://github.com/HKUDS/nanobot/pull/4954) (open): WebUI subagent turns not visible when delivered late. PR under review.
- [#4988](https://github.com/HKUDS/nanobot/pull/4988) (open): Background (cron/local trigger) turns produce unwanted placeholder text when model returns empty.
- [#4928](https://github.com/HKUDS/nanobot/pull/4928) (open): Heartbeat routing to unified sessions fails when last channel is not properly persisted.
- [#4945](https://github.com/HKUDS/nanobot/pull/4945) (open): Project instructions loaded from wrong directory; default prompt includes unnecessary scaffolding.

---

## Feature Requests & Roadmap Signals

### Likely to Appear in Next Version

| Feature | Request/PR | Status | Reasoning |
|---------|------------|--------|-----------|
| **Multi-agent collaboration** | [#5000](https://github.com/HKUDS/nanobot/issues/5000) | Open, no PR yet | High visibility (issue #5000 milestone); aligns with existing subagent refactoring work. |
| **Dokploy one-click deploy** | [#1503](https://github.com/HKUDS/nanobot/issues/1503) / [#5007](https://github.com/HKUDS/nanobot/pull/5007) | Open PR | Non-technical users have been requesting since March; PR now submitted. |
| **Guarded tool gateway for channels** | [#5006](https://github.com/HKUDS/nanobot/pull/5006) | Open PR | Adds opt-in tool execution context for channels, closing security gap [#4911](https://github.com/HKUDS/nanobot/issues/4911). |
| **Feishu `groupPolicy: listen`** | [#5009](https://github.com/HKUDS/nanobot/pull/5009) | Open PR | Enables context-only group ingestion without LLM turn until @mention. |
| **Custom Telegram Bot API** | [#4919](https://github.com/HKUDS/nanobot/pull/4919) | Open PR | Allows self-hosted Bot API servers or enterprise gateways. |
| **Security documentation for API keys** | [#5010](https://github.com/HKUDS/nanobot/pull/5010) | Open PR | Recommends env-var references over plaintext keys. |

### Predictions
- The **Ollama caching improvement** from [#4867](https://github.com/HKUDS/nanobot/issues/4867) will likely be integrated into a future release, building on the diagnostics doc from [#4998](https://github.com/HKUDS/nanobot/pull/4998).
- The **multi-agent vision** may seed a larger design discussion in the next milestone, given the core refactoring done in [#4993](https://github.com/HKUDS/nanobot/pull/4993).

---

## User Feedback Summary

### Pain Points Expressed

1. **Ollama local model performance** ([#4867](https://github.com/HKUDS/nanobot/issues/4867)): "extra 60 seconds to every single turn" — *totally unusable with 32GB VRAM*. User is frustrated but states same models run fine in other tools.
2. **Endless loop in tool_call** ([#4864](https://github.com/HKUDS/nanobot/issues/4864)): `complete_goal` keeps erroring because gateway parsing changed. Affects production use of goal-based agents.
3. **Plaintext API key storage** ([#4803](https://github.com/HKUDS/nanobot/issues/4803)): Security-conscious users uncomfortable with secrets in config file, despite `repr=False`.
4. **QQ channel reconnect noise** ([#4767](https://github.com/HKUDS/nanobot/issues/4767)): Fixed today via [#4768](https://github.com/HKUDS/nanobot/pull/4768). Users will appreciate quieter logs.
5. **Deployment complexity** ([#1503](https://github.com/HKUDS/nanobot/issues/1503)): "non tech people can install it easily and faster" – PR [#5007](https://github.com/HKUDS/nanobot/pull/5007) aims to resolve.

### Satisfaction Signals

- Community is actively contributing **code and documentation** (e.g., [#5004](https://github.com/HKUDS/nanobot/pull/5004), [#5008](https://github.com/HKUDS/nanobot/pull/5008), [#5007](https://github.com/HKUDS/nanobot/pull/5007)).
- **High PR velocity** (12 merged/closed today) indicates maintainers are responsive and trusted.
- Issue [#4867](https://github.com/HKUDS/nanobot/issues/4867) closed with resolution presumably underway; users who participated may feel heard.

---

## Backlog Watch

| Issue/PR | Created | Last Updated | Priority | Reason for Concern |
|----------|---------|--------------|----------|--------------------|
| [#1503](https://github.com/HKUDS/nanobot/issues/1503) | 2026-03-04 | 2026-07-20 | Medium | Long-dormant feature request (4.5 months) now has PR [#5007](https://github.com/HKUDS/nanobot/pull/5007) – needs maintainer review. |
| [#4803](https://github.com/HKUDS/nanobot/issues/4803) | 2026-07-06 | 2026-07-20 | **High** (Security) | Only 1 comment; PR [#5010](https://github.com/HKUDS/nanobot/pull/5010) is documentation-only, not a code fix. The underlying code still stores plaintext. Requires either a merge of a code fix or further discussion. |
| [#4864](https://github.com/HKUDS/nanobot/issues/4864) | 2026-07-09 | 2026-07-21 | **High** (Bug) | Endless loop bug; no fix PR yet. 4 comments, 1 reaction. Needs investigation and assignee. |
| [#5000](https://github.com/HKUDS/nanobot/issues/5000) | 2026-07-20 | 2026-07-20 | Medium | New proposal; no maintainer response. Could be a strategic direction – warrants early acknowledgment. |

**Maintainer Attention Required**:  
- **Code fix for [#4864](https://github.com/HKUDS/nanobot/issues/4864)** is the most urgent, as it causes infinite loops in agent execution.  
- **Merge or iterate on [#5007](https://github.com/HKUDS/nanobot/pull/5007)** (Dokploy template) to close a long-standing feature gap.  
- **Advance [#5006](https://github.com/HKUDS/nanobot/pull/5006)** (guarded tool gateway) which directly improves security and is linked to issue [#4911](https://github.com/HKUDS/nanobot/issues/4911).

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-07-21

## 1. Today’s Overview

ZeroClaw continues at high velocity with **39 issues** and **50 pull requests** touched in the last 24 hours. Activity is concentrated around three major workstreams: the **SOP (Standard Operating Procedure) control plane** (issues #8581, #8288, PR #8848, #8880), **persistent memory subsystem parity** (tracker #8891, PRs #8898, #8897, #8900), and the new **agent evaluation harness** (#7065 with follow-ups #9228, #9227, #9226). The project closed **9 issues** and **12 PRs** in the past day, indicating steady integration. No new releases were published. The community is actively discussing governance (RFC #6808) and cross-platform testing gaps (#7462 on Windows failures).

## 2. Releases

No new releases in the last 24 hours. The current version remains **0.8.3** (the latest referenced in the RFC #6808).

## 3. Project Progress (Merged/Closed PRs Today)

12 pull requests were merged or closed in the last day, representing tangible improvements across several domains:

- **Memory subsystem** — Multiple PRs advanced the persistent memory epic:
  - **#8900** (merged): Typed memory classification and gated typed‑facts extraction.
  - **#8898** (merged): Durable global memories now reach semantic recall across sessions.
  - **#8897** (merged): Opt‑in retrieval cache decorator over agent memory.
- **SOP stability** — **#9030** (merged): Re‑assembles the step agent’s policy on the live nested‑step path, fixing a regression in SOP visual authoring.
- **ZeroCode (TUI) fixes** — **#8837** (closed): History trimming occurring silently even with pruning disabled, resolved. **#9117** (closed): ZeroCode not starting on Windows without `ZEROCLAW_SOCKET` env var. **#8664** (closed): Markdown fences copied along with code blocks. **#8644** (closed): Code turn completing with no visible output. **#8765** (closed): Queue overlays inheriting terminal background. **#8944** (closed): Transcript mouse copy blocking text selection.
- **Provider/Agent fixes** — **#8675** (closed): Malformed tool‑call arguments sent to OpenAI‑format providers causing 400 errors. **#9078** (closed): Serial transport desynchronized after non‑matching response ID.
- **CI/Testing** — **#9079** (closed): CI coverage added for shared firmware protocol crate.

## 4. Community Hot Topics

The most active conversations involve long‑standing strategic decisions and critical blocking issues:

- **#6808** (14 comments, RFC) — *Work Lanes, Board Automation, and Label Cleanup*  
  A governance RFC proposing standardized labels and automated board management to reduce maintainer overhead. Accepted and rollout in progress.  
  [GitHub](https://github.com/zeroclaw-labs/zeroclaw/issues/6808)

- **#7462** (10 comments, Bug) — *74 test failures on Windows*  
  Unix‑only test commands and path semantics break the Windows test suite. The CI only runs on Linux. This is a **priority P1** issue blocking Windows contributor confidence.  
  [GitHub](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)

- **#3566** (9 comments, 👍7) — *Agent‑to‑Agent (A2A) Protocol Support*  
  The most upvoted feature request. Users want native inter‑agent communication over the open A2A v0.3.0 protocol. Listed under the v0.9.0 milestone (#7432).  
  [GitHub](https://github.com/zeroclaw-labs/zeroclaw/issues/3566)

- **#8891** (6 comments) — *Persistent memory tracker*  
  Coordinates the multi‑PR rollout for cross‑session memory parity with other agent runtimes. Currently tracking 18 open items.  
  [GitHub](https://github.com/zeroclaw-labs/zeroclaw/issues/8891)

## 5. Bugs & Stability

Several high‑severity bugs were reported today:

| Issue | Severity | Component | Summary |
|-------|----------|-----------|---------|
| **#9204** | S1 — Workflow blocked | security/sandbox | Landlock sandbox locks ZeroClaw itself, causing SQLite memory access failures. |
| **#9207** | S1 — Workflow blocked | tools: `web_fetch` | Gzip/brotli/deflate compressed responses return garbage binary data to agents. |
| **#9192** | S1 — Workflow blocked | runtime/daemon | `shared_budget` TOCTOU can wrap `AtomicUsize`; `SopEngine::finish_run` unwrap panics under mutex. |
| **#9216** | S1 — Workflow blocked | tooling/ci | Comment‑hygiene gate fails on master due to issue refs in source comments. |
| **#9206** | S0 — Data loss / security risk | runtime/daemon | Cron `agent` jobs intermittently resolve `workspace_dir` to `/` instead of the real workspace. |
| **#9198** | S3 — Minor | channel | Discord typing indicator stuck permanently after daemon reload from web dashboard. |
| **#9202** | S3 — Minor | zerocode/tui | `zeroclaw desktop` uses dead download URL and fails to detect installed AppImage on Linux. |

Notable regression – **#8837** (history trimming with pruning disabled) was fixed in the same day (#8837 closed). Several Windows‑specific bugs (#9117) were also closed.

## 6. Feature Requests & Roadmap Signals

- **#3566** (A2A Protocol) continues to be the community’s most‑requested feature (👍7). It is tracked in the v0.9.0 milestone (#7432) alongside auth/security hardening.
- **#7065** (Agent evaluation harness) gained three follow‑up issues today: **#9228** (results dashboard/trend tracking), **#9227** (LLM‑judge calibration tooling), and **#9226** (memory seeding for eval sandbox). This indicates the feature is moving from initial implementation to hardening and tooling – likely part of a near‑term minor release.
- **#9178** (ACP embedded resource blob + `deliver_file`) – newer request enabling agents to return workspace files as ACP embedded resources with a stable URI.
- **#8581** (SOP ingress adapter layer for fan‑in sources) is in progress and will simplify new channel integrations.

Predictions for next release (likely 0.9.0-beta):  
- Persistent memory parity (tracker #8891) is nearly complete (PRs merged today).  
- SOP control plane features (admission, approval broker) are active but still open.  
- A2A support (#3566) and agent evaluation harness (#7065) may land in 0.9.0 or a subsequent 0.10.0.

## 7. User Feedback Summary

Real user pain points surfaced in the last 24 hours include:

- **Windows support gap** — #7462 (74 failing tests) and #9117 (ZeroCode not starting without env var) reflect continued friction for Windows users. The CI runs only Linux, leaving Windows as a second‑class citizen.
- **Data loss risk** — #9206 (cron `agent` jobs resolving workspace to `/`) is a severity S0 issue; one user reports *“data loss / security risk”*.
- **Agent confusion** — #8837 reported that history trimming occurs even with pruning disabled, causing the agent to lose context mid‑session without explanation. This bug is now closed.
- **Tool reliability** — #9207 shows `web_fetch` returning garbage for compressed responses, blocking agents from reading common web pages.
- **ZeroCode UX annoyances** — Several minor TUI bugs were fixed today (copy, overlays, empty output), suggesting users are actively dogfooding the interface.

Overall satisfaction is moderate: the project ships fixes rapidly, but Windows users and those dependent on web fetching or security sandboxing still face blocking issues.

## 8. Backlog Watch

Issues and PRs that may need maintainer attention due to age or stalled status:

- **#6685** (SOP HTTP fan‑in documented but not wired) — Created 2026‑05‑15, last updated 2026‑07‑20. Still open with status `in-progress`. A dedicated PR or milestone assignment would clarify progress.
- **#8313** (Skills default to compact injection) — Open since 2026‑06‑25, tagged `needs-author-action`. The author has not responded to review comments; this PR could be merged or closed.
- **#8855** (Mirror built‑in channels via plugin `provides`) — Also `needs‑author‑action` since 2026‑07‑08. Large XL‑sized PR that may require maintainer to take over or nudge the contributor.
- **#8713** (Add `allowed_private_hosts` opt‑in to `file_download` SSRF gate) — Open since 2026‑07‑04, still `needs‑author‑action`. Security‑related fix that should be prioritised.

These items risk becoming stale; a maintainer check‑in would be beneficial.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw Project Digest — 2026-07-21

## 1. Today's Overview

PicoClaw saw moderate activity over the past 24 hours, with 10 issues and 10 PRs updated. Of the 4 open issues, 3 are recently filed (within the last 2 days) and represent real user blockers: an Android launch failure, a Matrix sync loop without reconnection, and a Launcher lifecycle mismatch for systemd deployments. Five PRs were merged/closed, including a critical fix for deferred MCP tool visibility and a Japanese localization that is still open. No new releases were cut, but the merged tool-fix PR (#3277) addresses a long-standing agent stability issue. Community interest is concentrated on cross-language support and OAuth reliability.

## 2. Releases

No new releases were published. The latest release remains v0.3.1 (or earlier). The project is in active development on the `main` branch.

## 3. Project Progress

Five PRs were merged or closed in the last 24 hours:

- **[PR #3277 (closed) — fix(tools): deferred-tool visibility heal + sliding TTL + SSE tool-call index fix](https://github.com/sipeed/picoclaw/pull/3277)**  
  Addresses a critical bug where deferred MCP tools lost visibility on process restart or TTL expiry, causing the model to call tools that no longer existed in the request. The fix introduces a sliding TTL and indexes SSE tool-calls correctly.

- **[PR #3192 (closed) — chore(docker): bump goreleaser base images from alpine:3.21 to 3.23](https://github.com/sipeed/picoclaw/pull/3192)**  
  Trivial dependency bump for consistency.

- **[PR #3191 (closed) — chore: remove duplicate build/ entry in .gitignore](https://github.com/sipeed/picoclaw/pull/3191)**  
  Cleanup of duplicate configuration.

- **[PR #276 (closed) — Docs/improve readme](https://github.com/sipeed/picoclaw/pull/276)**  
  Polished README wording and branding consistency.

- **[PR #277 (closed) — feat: update the `make deps` logic to prevent frequent dependency version updates](https://github.com/sipeed/picoclaw/pull/277)**  
  Stabilises dependency management in development workflows.

## 4. Community Hot Topics

The most active discussions (by comments or reactions) are:

- **[Issue #3182 (open) — [BUG] Android version](https://github.com/sipeed/picoclaw/issues/3182)**  
  *4 comments, 0 👍*  
  User cannot launch the service on Android despite full permissions. The app fails to change the path and the service won't start. No maintainer response yet.

- **[Issue #3203 (open, stale) — Matrix sync loop has no reconnection logic](https://github.com/sipeed/picoclaw/issues/3203)**  
  *3 comments, 1 👍*  
  After network disruption, the `/sync` loop dies silently and never reconnects. The main process stays alive, so systemd does not restart it. This is a high-severity reliability issue for Matrix-channel users.

- **[Issue #3272 (open) — Feature: Add Japanese localization to PicoClaw WebUI and Launcher](https://github.com/sipeed/picoclaw/issues/3272)**  
  *0 comments* (but has an associated PR #3273)  
  Request for Japanese UI. The author contributed a full translation in PR #3273, indicating strong interest from the Japanese community.

**Underlying needs:** Users are demanding stable mobile support (Android), resilient channel connectivity (Matrix), and broader language accessibility (Japanese). The lack of official responses on the Android and Matrix issues may be eroding trust.

## 5. Bugs & Stability

Several bugs were reported or closed in the last 24 hours, ranked by severity:

- **Critical — [Issue #3278 (closed) — Antigravity OAuth login blocked by Google](https://github.com/sipeed/picoclaw/issues/3278)**  
  Google refuses sign-in due to OAuth 2.0 policy non-compliance. This blocks all users of the antigravity provider. Closed without a visible fix commit — likely a configuration change on the developer side is required, but users are left stranded.

- **High — [Issue #3274 (closed) — Antigravity INVALID_ARGUMENT regression](https://github.com/sipeed/picoclaw/issues/3274)**  
  A regression on `main` where `tool_schema_transform: "simple"` no longer works for the antigravity provider. The issue was closed with 2 comments, but no accompanying PR is shown; the fix may have been backported or is still pending.

- **High — [Issue #3275 (closed) — model_list entries lose api_keys after config rewrites](https://github.com/sipeed/picoclaw/issues/3275)**  
  When using the Launcher WebUI or running `auth login`, api_key fields in `model_list` entries get silently dropped. This is a data-loss bug that could break production deployments.

- **Medium — [Issue #3203 (open, stale) — Matrix sync loop dead after disruption](https://github.com/sipeed/picoclaw/issues/3203)**  
  No reconnection logic. A fix PR is not yet visible. The issue is marked stale.

- **Low — [Issue #3182 (open) — Android version not launching](https://github.com/sipeed/picoclaw/issues/3182)**  
  Mobile users are affected, but no recent maintainer activity.

**Note:** The closed bugs (#3274, #3275, #3278) all lack a linked fix PR in the provided data, raising questions about whether the fixes are committed or just acknowledged.

## 6. Feature Requests & Roadmap Signals

Community-requested features with implementation progress:

- **Japanese Localization** ([Issue #3272](https://github.com/sipeed/picoclaw/issues/3272), [PR #3273 (open)](https://github.com/sipeed/picoclaw/pull/3273))  
  A full 968-line translation has been contributed. Likely to land in the next minor release.

- **DashScope TTS + WeChat Audio** ([PR #3270 (open)](https://github.com/sipeed/picoclaw/pull/3270))  
  Adds Alibaba Cloud TTS and WeChat file-sending capabilities. Strong signal for Asia-Pacific use cases.

- **Launcher: Externally Managed Gateway** ([Issue #3276 (open)](https://github.com/sipeed/picoclaw/issues/3276))  
  Headless server users want the Launcher to detect an existing systemd gateway service and not try to manage its lifecycle. No PR yet.

- **Conversation Cache Breakpoints for Anthropic** ([Issue #3229 (closed, proposal)](https://github.com/sipeed/picoclaw/issues/3229))  
  A detailed proposal for rolling cache control to reduce token costs. Although closed, the idea may inspire future caching improvements.

**Prediction for next version:** Japanese localization (PR #3273) and the deferred-tool fix (PR #3277) are likely candidates. DashScope TTS could follow if merged soon.

## 7. User Feedback Summary

Real user pain points extracted from issues and PRs:

- **Android usability is broken** – the Android version cannot start its service, making the mobile app unusable for a reporter who already granted full permissions.
- **OAuth friction with Google** – the antigravity provider was blocked entirely, and the closure without a clear fix leaves users uncertain.
- **Configuration corruption** – credentials silently dropped when using the WebUI, a serious trust issue for operators managing many models.
- **Matrix channels are fragile** – a network blip kills the sync loop forever, requiring manual restart. Users running headless setups cannot easily recover.
- **Language barrier** – Japanese users find the CLI and WebUI English-only despite translated docs; strong demand for a native UI.

Satisfaction signals are harder to find; the high volume of bug reports and lack of maintained responses on the Android/Matrix issues suggest frustration among early adopters.

## 8. Backlog Watch

Issues and PRs that are stale or have not received maintainer attention for an extended period:

- **[Issue #3203 (open, stale) — Matrix sync loop reconnection](https://github.com/sipeed/picoclaw/issues/3203)**  
  Last updated 2026-07-20, but stale-labeled and no fix PR. A silent failure that affects reliability.

- **[Issue #3182 (open) — Android launch failure](https://github.com/sipeed/picoclaw/issues/3182)**  
  Created 2026-06-26, last updated 2026-07-20. No maintainer comment. Critical for mobile users.

- **[PR #3254 (open, stale) — fix(agent): prefer verbatim model matches](https://github.com/sipeed/picoclaw/pull/3254)**  
  Open since 2026-07-13, labeled stale. Improves model resolution logic and could fix silent misrouting of queries.

- **[PR #3251 (open, stale) — fix(providers): capture prompt cache token usage in Anthropic](https://github.com/sipeed/picoclaw/pull/3251)**  
  Open since 2026-07-12, labeled stale. Operators need cache metrics to optimise costs; this PR has no maintainer review.

These items represent lingering technical debt and community needs that could grow into larger problems if left unaddressed. Maintainers are encouraged to prioritise the Android and Matrix bugs to prevent user churn.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw Project Digest – 2026-07-21

## 1. Today's Overview

Yesterday saw sustained development velocity: **6 new issues** (all open) and **20 PRs updated** (14 open, 6 merged/closed). Activity is split between **security hardening** of the role/approval system (four closely related issues and four matching fix PRs) and **channel‑feature work** (LINE, Dial, WhatsApp fixes). The project remains in a healthy state with a responsive core team; six PRs were merged, several from first‑time contributors. No new releases were cut.

## 2. Releases

No new releases appeared in the last 24 h. The latest release remains the previous tag; users on `main` will pick up the changes described below when the next version ships.

## 3. Project Progress

Six PRs were closed or merged yesterday:

- **#3110** – `feat(container): bake caldav-mcp into the agent image` – adds CalDAV MCP server to the base container, enabling `/add-caldav-tool` skill.
- **#3108** – `fix(chat-sdk-bridge): rehydrate inbound attachments when adapters carry no fetchData` – fixes an issue where attachments from Telegram voice/audio notes were silently dropped (see #2888).
- **#3107** – `fix(add-whatsapp-cloud): copy the adoption module and document the row re‑key` – companion to #3106, ensures existing installs can adopt the re‑keyed `messaging_groups` rows.
- **#3087** – `fix(whatsapp): engage mention-mode wirings on typed @‑mentions in groups` – corrects group mention handling for WhatsApp.
- **#1110** – `fix: update container-runtime tests to match implementation` – long‑standing test cleanup, now merged.
- **#2642** – `fix(add-telegram): pin chat-adapter to 4.26.0 to match installed chat` – resolves version mismatch that broke Telegram installation.

Key feature advances still in review: LINE channel adapter (#2918, 17 days old), Dial SMS/voice channel (#3041, #3050), and on‑device voice transcription (#2459, 69 days old).

## 4. Community Hot Topics

The most active discussion centres on **security and role management**. Four issues filed by @k-fls (#3097–#3100) each have zero comments but have **immediate, matching fix PRs** (#3101–#3104) that together form a coherent security update:

- **#3097** – `Role grant silently confers GLOBAL admin when --group is omitted` → PR #3101 (require explicit `--scope`)
- **#3098** – `Approval cards for ncl commands echo the raw command line, not the effect` → PR #3102 (structured approval cards)
- **#3099** – `Approval routing ignores privilege and can route a role-change to its own target` → PR #3103 (privilege‑proportional routing)
- **#3100** – `Revoking the sole remaining owner is not prevented` → PR #3104 (refuse revocation of last owner)

The **LINE channel request** (#3096) has one comment and is already backed by a full PR (#2918). The **WhatsApp migration bug** (#3105) has a companion fix (#3106/#3107). No single item attracted many reactions, but the volume of security scrutiny signals strong community interest in access‑control correctness.

## 5. Bugs & Stability

Severity ranking of bugs reported yesterday (most critical first):

- **[Critical] #3100 – No root of trust after revoking sole owner**  
  The CLI allows deleting the last `owner` row, leaving the system permanently locked. **Fix PR #3104** already submitted.

- **[High] #3099 – Approval routed to target of role change**  
  Self‑approval of privilege escalation is possible (e.g., revoking `admin` from user X sends approval to X). **Fix PR #3103** submitted.

- **[High] #3097 – Silent global admin grant**  
  Omitting `--group` on `ncl roles grant` gives global admin without warning. **Fix PR #3101** requires explicit `--scope`.

- **[High] #3105 – WhatsApp cloud upgrade strands `messaging_groups` rows**  
  Existing installs that pick up the re‑keyed instance silently lose WhatsApp connectivity. **Fix PR #3106** (open) and **#3107** (merged) provide a migration path.

- **[Medium] #3098 – Raw command line in approval cards**  
  Approvers see `ncl roles-revoke --user ...` instead of a human‑readable effect. **Fix PR #3102** submitted.

Fix PRs exist for every reported bug. The attachment‑rehydration fix (#3108) addresses a subtler bug affecting Telegram voice notes (see #2888). The imessage attachment fix (#3109) remains open.

## 6. Feature Requests & Roadmap Signals

New feature requests:

- **#3096** – `/add-line` skill for LINE Official Account channel (Japan/Thailand/Taiwan’s dominant messenger). Already implemented as PR #2918.
- **Dial channel** – Two PRs (#3041, #3050) add SMS and AI voice calls via the Dial adapter, with setup wizard integration.

Previously filed but still active:

- **On‑device voice transcription** (#2459, since May) – whisper.cpp without cloud API.
- **Traditional Chinese README** (#2950, since July 4).
- **CalDAV tool** (shipped in #3110, now baked into image).

Prediction for next minor release: the security bundle (#3101–#3104) is likely to land first because of its severity; LINE channel (#2918) and Dial (#3041) could follow if reviews complete soon. The WhatsApp migration fix (#3106) is already in progress.

## 7. User Feedback Summary

Users are reporting concrete pain points:

- **Security uncertainty**: The role/approval issues show that admins find the CLI ambiguous and error‑prone. The lack of confirmation for global admin grants and the ability to lock out the last owner are seen as serious design flaws.
- **WhatsApp upgrade pain**: Existing WhatsApp Cloud users who follow the “update skills” flow lose the channel without warning (#3105). A migration script is now being developed.
- **Attachment handling gaps**: Telegram voice notes and iMessage attachments arrive without data – the agent can’t process them. Two fix PRs (#3108 merged, #3109 open) address this.
- **Positive signals**: The community responds quickly with fixes. Multiple contributors (glifocat, k‑fls, cfis) submitted well‑structured PRs within hours of bug reports. LINE and Dial contributors are actively engaging with maintainers.

## 8. Backlog Watch

Items that need maintainer attention:

- **PR #2459 – On‑device voice transcription** (May 13, 69 days old)  
  A large feature skill adding whisper.cpp support across all Chat SDK channels. No maintainer review has been recorded. Likely needs a rebase and discussion on integration with the existing whisper skill (#2317).

- **PR #3044 – fix(channels): download inbound attachments that lost fetchData** (Jul 14, 7 days old)  
  Alternative approach to #3108, but still open. May become redundant after #3108 was merged; should be closed or marked superseded.

- **PR #3060 – fix(container): add --init to agent container spawn args** (Jul 16, 5 days old)  
  Addresses zombie process accumulation. No maintainer response yet. A straightforward fix that should be merged quickly.

- **Issues #3097–#3100** all have pending fix PRs – they should be linked and the PRs reviewed as a batch.

None of these appear abandoned, but the attention of the core team is clearly split across many threads. A triage label update (e.g., `needs‑review`, `superseded`) would improve transparency.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw Project Digest — 2026-07-21

## 1. Today’s Overview

Project NullClaw saw minimal activity in the last 24 hours, with no new issues reported and no pull requests merged or closed. The only activity is an existing open pull request (#956) that was last updated yesterday, proposing an upgrade of the base Docker image from Alpine 3.23 to 3.24. No releases were cut, and there were no closed or merged PRs. This low-activity day suggests either a stable phase with no critical bugs or a period of reduced contributor engagement. Overall project health appears static, with no urgent matters to address.

## 2. Releases

No new releases were published today. The latest release remains unknown from the provided data.

## 3. Project Progress

- **No merged or closed pull requests today.**  
- The only open PR (#956) is a dependency update that has not been merged.

## 4. Community Hot Topics

- **PR #956** – [dependencies, docker] ci(deps): bump alpine from 3.23 to 3.24 in the docker-images group  
  *Author:* dependabot[bot] · *Created:* 2026-06-15 · *Updated:* 2026-07-20 · *Comments:* None · 👍: 0  
  **Link:** [nullclaw/nullclaw PR #956](https://github.com/nullclaw/nullclaw/pull/956)

  This is the only active discussion item. It is a routine automated dependency bump with no community reactions or comments. The underlying need is to keep the CI/CD pipeline and Docker images up-to-date with the latest Alpine base image for security and compatibility.

## 5. Bugs & Stability

No bugs, crashes, or regressions were reported today. The project shows no active stability issues based on the available data.

## 6. Feature Requests & Roadmap Signals

No user-submitted feature requests or roadmap discussions were recorded in the last 24 hours. The absence of such signals may indicate that contributors are either satisfied with the current feature set or that the project is in a maintenance-only phase.

## 7. User Feedback Summary

No user feedback (e.g., comments, reactions, issues) was captured today. Without direct sentiment data, user satisfaction cannot be assessed. The lack of complaints could imply stability, but also a low active user base.

## 8. Backlog Watch

- **Open PR #956** (Alpine 3.23 → 3.24) has been open for over a month (since June 15, 2026) with no maintainer review or merge. While it is a minor dependency update, the long delay in merging may indicate a need for maintainer attention to avoid accumulating technical debt or security gaps.  
  **Link:** [nullclaw/nullclaw PR #956](https://github.com/nullclaw/nullclaw/pull/956)

No other long-unanswered issues or PRs were identified.

---

*Generated from GitHub data snapshot as of 2026-07-21.*

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-07-21

## Today's Overview

The project saw very high activity on July 21, with 43 issues updated (40 open, 3 closed) and 50 pull requests updated (23 open, 27 merged/closed). The dominant theme is the **Tier B deletion of the v1 legacy monolith** (`src/`) and the corresponding cutover to the Reborn stack, which triggered several follow-up gap analyses and hotfix PRs. At the same time, a major bug bash (P1/P2) is ongoing, surfacing numerous streaming, UI, and authorization issues. No new releases were published today.

## Releases

*No releases were cut on 2026-07-21.*

---

## Project Progress — Merged/Closed PRs Today

The following significant PRs were merged or closed:

- **#6375** – [refactor(tier-b): delete v1 legacy monolith (src/) and cut deploy over to Reborn](https://github.com/nearai/ironclaw/pull/6375) *(XL, risk: high)* – The largest structural change of the day. Removes the entire `src/` tree and repoints production deploy configs to the Reborn stack. Closes Tier B of the Reborn migration.
- **#6382** – [refactor(turns): simplify filesystem_store — retire blob store, dedup transitions, decompose the giant files](https://github.com/nearai/ironclaw/pull/6382) *(XL, risk: low)* – A deep maintenance pass on `ironclaw_turns`, removing dead parallel store implementations and decomposing oversized files.
- **#6383** – [fix(release): strip "Reborn" codename from 1.0.0-rc.1 release + fix MSI blocker](https://github.com/nearai/ironclaw/pull/6383) *(XS, risk: low)* – Hotfix for the blocked release candidate.
- **#6378** – [chore(runner): remove dead feature flags (libsql-secrets, filesystem-goal-store)](https://github.com/nearai/ironclaw/pull/6378) *(L, risk: low)* – Continues cleanup after #6374.
- **#6379** – [fix(tier-b): repair post-merge red main (release-plz + replay-gate legacy refs)](https://github.com/nearai/ironclaw/pull/6379) – Immediate fix for CI failures caused by #6375.
- **#6288, #6186, #6381** – Multiple dependency bumps (futures, tokio, agent-client-protocol, rustls, serde, etc.).
- **#6178, #6179** – Two bug fixes (automation error banner dismissability, settings import false success) closed.

---

## Community Hot Topics

The most active discussions (by comment count) reflect core integration pain points:

- **#6274** [Finish DeploymentConfig as the main composition config (§4.4/§5.6/§5.11)](https://github.com/nearai/ironclaw/issues/6274) – 4 comments. The central refactoring effort to eliminate deployment-mode branching, which PRs #6387 and #6388 are executing.
- **#6190** [Multiple conflicting error messages displayed for a single failed request](https://github.com/nearai/ironclaw/issues/6190) – 4 comments. Users see both streaming and context limit errors simultaneously, making root cause unclear. P2 bug.
- **#6189** [Retryable stream error leaves completed response in failed state](https://github.com/nearai/ironclaw/issues/6189) – 4 comments. A persistent red error banner appears even after a successful completion, confusing users. P2 bug.
- **#6369** [Tier B follow-up: gaps left by v1 (src/) retirement](https://github.com/nearai/ironclaw/issues/6369) – 3 comments. Tracks missing capabilities like in-chat commands and CLI flags after the monolith deletion.
- **#2277** [V2: ACP-backed child thread backends for delegated external agents](https://github.com/nearai/ironclaw/issues/2277) – 2 comments, 1 👍. Long-standing feature request to delegate work to Codex/Droid/OpenCode via ACP. Still lacking implementation.

The underlying needs are clear: users want a **stable, predictable streaming experience** (#6190, #6189) and a **complete Reborn feature set** (#6369) after the legacy removal. The delegation feature (#2277) remains a highly desired but unaddressed roadmap item.

---

## Bugs & Stability

The ongoing bug bash has surfaced numerous P1 and P2 issues. The most critical:

### P1 (Critical)
- **#6360** – [Provider onboarding has no way to navigate back](https://github.com/nearai/ironclaw/issues/6360). CLI onboarding locks users into a provider selection with no back button.
- **#6348** – [Gmail extension is automatically authorized without user consent after reinstall](https://github.com/nearai/ironclaw/issues/6348). OAuth consent is skipped on reinstall, granting access silently.

### P2 (High)
- **#6350** – Assistant unexpectedly switches response language (e.g., English prompt → Ukrainian output).
- **#6351** – Runs fail with “checkpoint unavailable/unreachable” errors for multi-tool requests.
- **#6353** – Long assistant messages truncated without expansion option.
- **#6352** – Streamed response replays in a loop after returning to the page.
- **#6349** – Telegram chat history rendered inconsistently in WebUI (duplicate prompts, gaps).
- **#6362** – Duplicate “Test connection” and “Fetch models” buttons cause UX confusion.
- **#6359** – Test `reborn_trace_first_party_tool_coverage` reads real `$HOME`, fails locally but passes in CI.
- **#6347** – Slack instance-readiness test coverage missing (harness forces Slack to be configured).

### Note
Several of these bugs are addressed by newly opened fix PRs (e.g., #6376 adds streaming retry resilience, #6335 was already closed with a host-authored capability remediation fix). The Gmail auto-authorization (#6348) and replay loop (#6352) still await resolution.

---

## Feature Requests & Roadmap Signals

The following enhancement issues signal the near-term roadmap:

- **#6320** – [IronHub extension install flow](https://github.com/nearai/ironclaw/issues/6320) (for Reborn-native extension discovery/activation).
- **#6384** – [Prioritized backlog for in-chat command coverage](https://github.com/nearai/ironclaw/issues/6384) (feeds #3286; Reborn’s missing commands).
- **#6325** – [Thread-scoped MCP sessions and programmatic MCP config](https://github.com/nearai/ironclaw/issues/6325) (based on #6244).
- **#6324** – [WebUI workspace redesign and chat-first onboarding](https://github.com/nearai/ironclaw/issues/6324) (based on #6162/#6163).
- **#6389** – [Collapse build_local_runtime + build_production_shaped into one build_runtime(cfg)](https://github.com/nearai/ironclaw/issues/6389) (§5.11).

These align with the phase §5.x milestones in the Reborn architecture simplification document. The next release (likely 1.0.0-rc.2 or later) will probably include **DeploymentConfig consolidation** (#6274 / #6388), **IronHub install flow** (#6320), and some of the **WebUI redesign** (#6324).

---

## User Feedback Summary

Real user pain points extracted from bug reports and issues:

- **Streaming reliability is low** – Users see false error banners (#6189), overlapping error messages (#6190), and replay loops (#6352). The response is often displayed as “failed” even when successful.
- **Language confusion** – A surprising P2 bug where the assistant replies in a language unrelated to the prompt (#6350). Likely a model context contamination issue.
- **Truncated output** – Long assistant messages are silently cut off with no expansion mechanism (#6353). Frustrating for summaries and tables.
- **UI inconsistency across channels** – Telegram chat history is rendered with gaps and duplications in WebUI (#6349).
- **Permission/consent surprises** – Reinstalling the Gmail extension silently re-authorizes access (#6348), raising privacy concerns.
- **Onboarding friction** – No back navigation during CLI provider selection (#6360) and duplicate buttons (#6362) indicate poor UX design.
- **Positive signals** – The rapid pace of fixes (e.g., #6335 closed, #6376 for streaming) shows the team is responsive. The v1 deletion (#6375) is a big step forward in architecture.

---

## Backlog Watch

Issues and PRs that have remained unanswered for an extended period:

- **#2277** – [ACP-backed child thread backends for delegated external agents](https://github.com/nearai/ironclaw/issues/2277) *(Created April 10, last updated July 20)* – This is a major feature (delegation to Codex/Droid/OpenCode) with only 2 comments. It has a 👍, indicating community interest, yet no assignee or milestone. Needs scoping or a decision to defer.
- **#5598** – [Chore: release](https://github.com/nearai/ironclaw/pull/5598) *(Open since July 3)* – The automated release PR for crate version bumps is still open with breaking changes; likely blocked by the Tier B deletion chaos.
- **#5664** – [Deps bump actions group](https://github.com/nearai/ironclaw/pull/5664) *(Open since July 5)* – 16 dependency updates pending. Should be merged to keep CI green.
- **#6329** – [Decompose extension_lifecycle.rs (8,789 lines)](https://github.com/nearai/ironclaw/issues/6329) – Filed July 20, no comments yet. This is a code quality issue that will grow in importance.

The #2277 feature request is the most concerning due to its age and strategic value for agent interoperability. Maintainers should provide a status update or timeline.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI Project Digest – 2026-07-21

## Today’s Overview
The project saw no new issues or releases in the last 24 hours, but a very active batch of 15 pull requests were updated, 11 of which were merged. This indicates a concentrated burst of development work, primarily focused on feature additions and bug fixes across the Windows desktop client, the Cowork (browser annotation) system, and the AI skin creation flow. The 4 remaining open PRs are all stale dependency bumps (Electron, React, Headless UI, react-syntax-highlighter) opened in April, which have gone unresolved for nearly four months and may require maintainer review to avoid accumulating further technical debt. Overall project health appears solid, with a productive merge cadence and no new regressions reported.

## Releases
None in the last 24 hours.

## Project Progress
**Merged/Closed PRs (11)**
- **Windows silent updates** ([#2368](https://github.com/netease-youdao/LobsterAI/pull/2368)) – Launches NSIS installer with `/S` via PowerShell `Start-Process`, auto-relaunches after install; surfaces UAC decline as a localized error.
- **Windows build channel entry points** ([#2367](https://github.com/netease-youdao/LobsterAI/pull/2367)) – Adds `scripts/dist-win-channel.cjs` and `scripts/dist-win-web.cjs` to pass env vars explicitly per build, preventing leaks between builds.
- **Browser multi‑annotation attachments (Cowork)** ([#2366](https://github.com/netease-youdao/LobsterAI/pull/2366)) – Adds browser annotation protocol, webview preload, and screenshot storage IPC. Supports batch annotation creation, draft attachment handling, and structured context passing in Cowork messages. Hides plain image attachments in favor of annotation count badges.
- **Config hot‑reload via RPC ack** ([#2365](https://github.com/netease-youdao/LobsterAI/pull/2365)) – Delivers configuration hot‑reload through RPC acknowledgement instead of file‑based triggers.
- **Cowork scroll jump fix** ([#2364](https://github.com/netease-youdao/LobsterAI/pull/2364)) – Scopes refresh events by session ID and preserves loaded message history.
- **AI skin creation flow** ([#2361](https://github.com/netease-youdao/LobsterAI/pull/2361)) – Adds persistent entry in Appearance settings, first‑use onboarding, and keeps the AI Skin Designer flow available across turns.
- **Cron UI bug fix** ([#2362](https://github.com/netease-youdao/LobsterAI/pull/2362)) – Fixes a UI issue in the cron scheduling interface.
- **Periodic IM message flicker fix** ([#2363](https://github.com/netease-youdao/LobsterAI/pull/2363)) – Compares matching history windows during reconciliation to prevent flicker.
- **Auth callback preservation across retries** ([#2360](https://github.com/netease-youdao/LobsterAI/pull/2360)) – Reuses the active callback server for repeated login attempts, adds safe lifecycle diagnostics.
- **Artifact panel layout stability** ([#2359](https://github.com/netease-youdao/LobsterAI/pull/2359)) – Sets stable keys to avoid subtree rebuilds and synchronizes input area height to reduce flicker.
- **POPO connectivity test real API validation** ([#1349](https://github.com/netease-youdao/LobsterAI/pull/1349)) – Replaces placeholder validation with actual POPO API call to verify appKey/appSecret, fixing the bug where invalid credentials always passed.

## Community Hot Topics
No issues were created or updated in the last 24 hours. The most discussed items remain the 4 open dependabot PRs (see **Backlog Watch**). All 11 merged PRs had zero comments, indicating a smooth, low‑discussion merge process.

## Bugs & Stability
All bug fixes reported in the last 24 hours were addressed and merged:
- **POPO connectivity test** – high severity: false‑positive validation allowed incorrect credentials. Fixed in [#1349](https://github.com/netease-youdao/LobsterAI/pull/1349).
- **Cowork scroll jumps** – medium severity: session refresh caused unwanted scrolling. Fixed in [#2364](https://github.com/netease-youdao/LobsterAI/pull/2364).
- **IM message flicker** – medium severity: periodic reconciliation caused visible flicker. Fixed in [#2363](https://github.com/netease-youdao/LobsterAI/pull/2363).
- **Artifact panel layout flicker** – low severity: preview panel and input area height instability. Fixed in [#2359](https://github.com/netease-youdao/LobsterAI/pull/2359).
- **Cron UI bug** – low severity: cosmetic/functional issue. Fixed in [#2362](https://github.com/netease-youdao/LobsterAI/pull/2362).
- **Auth callback loss on retry** – medium severity: login retries would fail due to reused callback server state. Fixed in [#2360](https://github.com/netease-youdao/LobsterAI/pull/2360).

No new crashes or regressions were reported.

## Feature Requests & Roadmap Signals
Several features landed in the last 24 hours, signaling the team’s current priorities:
- **Windows silent install/update** – indicates focus on enterprise and user‑friendly deployment.
- **Browser multi‑annotation attachments** – expands Cowork’s capabilities, likely in response to user need for richer context sharing.
- **AI skin creation workflow** – persistence and onboarding improvements suggest a push to make AI customization more accessible.
- **Build channel isolation** – improves development and release engineering, hinting at imminent beta/stable channel distinctions.

No external user requests were filed as issues in this window, but the merged features strongly align with end‑user pain points (silent updates, better annotation handling, stable UI).

## User Feedback Summary
While no direct user comments are available in this data, the bugs fixed reveal real pain points:
- False‑positive POPO validation wasted user time; fix ensures accurate diagnostics.
- Scroll jumps and flicker in Cowork and artifact panels degraded workflow smoothness.
- Auth retry failures caused login frustration.
- Inability to attach multiple browser annotations to Cowork messages was a missing capability now addressed.

Satisfaction is inferred from the swift merge of fixes and features.

## Backlog Watch
- **dependabot PRs** (all opened 2026-04-02, untouched since):
  - [#1277](https://github.com/netease-youdao/LobsterAI/pull/1277) – bump `electron` from 40.2.1 to 43.1.1 and `electron-builder`. **Over 110 days stale.** Major version jump may require migration efforts.
  - [#1282](https://github.com/netease-youdao/LobsterAI/pull/1282) – bump `@headlessui/react` from 1.7.19 to 2.2.9. Large breaking change potential.
  - [#1283](https://github.com/netease-youdao/LobsterAI/pull/1283) – bump `react` from 18.3.1 to 19.2.4. React 19 introduces significant changes (e.g., new hook rules, concurrent features).
  - [#1284](https://github.com/netease-youdao/LobsterAI/pull/1284) – bump `react-syntax-highlighter` from 15.6.6 to 16.1.1.
- These PRs have no maintainer activity and are labelled `[stale]`. They represent a growing dependency lag that should be addressed soon, especially the React and Electron updates, which will likely be needed for security and compatibility with new features.

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

# QwenPaw Project Digest – 2026-07-21

## 1. Today's Overview
The QwenPaw project shows very high development activity: **24 issues** were updated (16 open, 8 closed) and **41 pull requests** were updated (31 open, 10 merged/closed) in the last 24 hours. No new releases were published. The community is actively reporting bugs and requesting features, while the maintainer team is responding with targeted fixes and substantial new feature PRs—including a new `qwenpaw-creator` app and a unified browser SDK. The project health appears strong, with clear prioritisation of both stability and innovation.

## 2. Releases
No new releases were published today. The last version mentioned in the data is `2.0.0.post3` (and `2.0.1b1` in some issues). No migration notes are available.

## 3. Project Progress – Merged/Closed PRs Today
10 pull requests were closed or merged today. Notable advances:

- **#6290** – Fix GGUF download check by adapting to ModelScope SDK key change (fixes #6288).  
- **#6235** – Enhance ReMe Light memory index maintenance: switched from automatic on-start rebuild to explicit maintenance, added console/API controls, and integrated upstream improvements (index self-heal, concurrent write protection, Markdown chunking).  
- **#6150** – Add PawApp SDK and a kanban app plugin, laying groundwork for plugin-based app ecosystem.  
- **#6151** – Refactor background tool call offload with dual-deadline architecture (`offload_deadline` + `kill_deadline`) to fix cancel-signal and hint injection bugs.  
- **#6278** – Expose structured failure outcomes for built-in tools so the model can reliably distinguish success from failure.  
- **#6291** – Load Monaco editor from local bundle instead of CDN, enabling offline code preview (fixes #6261).  
- **#6280** – Fix reasoning duplication bug: AgentScope 2.0’s multi-iteration assistant `Msg` now correctly segments thinking blocks per tool call (fixes #6257 and #6282).  

Additional closed PRs addressed Langfuse trace IDs (#6277), Windows tasklist liveness probe (#6203), and session-level usage indicators (#6195).

## 4. Community Hot Topics
The most active discussions this week (by comment count):

- **#6257** – [OPEN] Multiple tool calls produce identical thinking output *(13 comments)*. Users report that when the agent calls several tools in one turn, all thinking blocks contain the same repeated text. This bug confuses the agent and wastes tokens. A fix is now in #6280 (merged).  
- **#5961** – [CLOSED] v2.0.0 loop execution bug *(8 comments)*. Agent repeatedly writes/deletes without finishing tasks. Closed as fixed in later versions.  
- **#4873** – [OPEN] Two subagents cause infinite polling and cannot be interrupted from Feishu *(5 comments)*. Persistent issue since June, with no resolution yet.  
- **#5958** – [CLOSED] Can AgentScope permission control be used in QwenPaw? *(4 comments)*. Community interest in access control, but no official answer yet.

The underlying need across hot threads is **reliable multi-turn, multi-tool reasoning** and **agent orchestration stability**—users depend on QwenPaw for complex workflows and are hitting concurrency and duplication problems.

## 5. Bugs & Stability
**Severity: High**
- **#6282** – *Reasoning relay repeats the first thinking block across AgentScope 2 tool iterations* (open). Caused by shared formatter corruption. Fix merged in #6280.  
- **#6197** – *Desktop frozen binary hangs on startup when `nvidia-smi` hangs* (open). Blocks Windows users with unstable NVIDIA drivers. No fix PR yet.  
- **#6257** – *Duplicate thinking output* (open, fixed by #6280). High impact on agent reasoning quality.

**Severity: Medium**
- **#6273** – *Unify task tracking and same-session concurrency semantics* (open). Different entry points produce inconsistent behaviour (serial vs. concurrent).  
- **#6242** – *Embedding dimensions setting not sent to OpenAI-compatible APIs because `use_dimensions` not exposed* (open). Users cannot fully configure ReMe Light memory via Console.  
- **#6255** – *Chat error `BadRequestError` 400 in task_tracker* (closed). Likely a transient provider mismatch.  
- **#6288** – *Local model download failures* (closed). Fixed in #6290.

**Severity: Low**
- **#6246** – *Filename too long crash in `recall_history`* (closed). Edge case with large tool results.  
- **#6286** – *Token waste from always-loaded built-in tool descriptions* (closed as feature request). Users want to disable/customise.

Most high-severity bugs are receiving PRs quickly, indicating a responsive maintainer team.

## 6. Feature Requests & Roadmap Signals
Several user-requested features point toward future releases:

- **Session management**: Custom grouping/folders (#6287, #6289), mobile web console (#6281), and per-session model overrides (#5992 PR). Likely to appear in 2.1.0.  
- **New providers**: AIOnly (#6268, PR contributed), `qwen3.8-max-preview` for Aliyun (#6285). Suggests expanding the provider ecosystem.  
- **Human-in-the-loop**: `ask_user_question` tool (#6274) – high value for safety-critical use cases. Could be added as built-in.  
- **Time awareness**: Auto-attach current time to context (#6283) to prevent date confusion. Simple but impactful.  
- **Editable agent mode**: User-customisable agent behaviour (#6270, PR open). Enables power users to fine-tune reasoning loops.

The roadmap appears to be prioritising **user-facing flexibility** (folders, providers, memory controls) and **safety/extensibility** (permission control, HITL).

## 7. User Feedback Summary
Real user pain points expressed in today’s data:

- **Token inefficiency**: “22 built-in tools consume ~8K–10K tokens every request” (#6286). Users want to disable unused tools.  
- **Memory confusion**: Two overlapping memory systems (MEMORY.md vs. Dream digests) cause confusion (#6222).  
- **Multi-agent instability**: Subagents cause infinite polling (#4873) and concurrency issues (#6273).  
- **Model download blocker**: Users on `v2.0.0 post3` cannot download any local model (#6288, fixed).  
- **Offline limitations**: Console coding page fails without internet (#6261, fixed).  
- **CSS theme inconsistencies**: `ant-` vs `qwenpaw-` prefixes cause broken styling (#5688).

Positive signals: multiple contributors are submitting PRs (including first-time contributors #6157, #5992, #6203), indicating an engaged community. The fast turnaround on critical bugs suggests developer trust is maintained.

## 8. Backlog Watch
The following issues and PRs are long-standing and need maintainer attention:

- **#4873** (2026-06-01) – *Two subagents cause infinite polling and cannot be interrupted from Feishu*. No fix PR, 5 comments, high impact for Feishu users.  
- **#5688** (2026-07-01) – *CSS prefix mismatch `ant-` vs `qwenpaw-`*. Affects custom themes. No activity beyond initial question.  
- **#6101** (2026-07-14) – *Inconsistent conversation reset lifecycle across agent modes*. 1 comment, complex refactor.  
- **#5187** (2026-06-14) – *Windows desktop GUI automation with UIA + Tauri control mode*. Large PR, still open, no update in 2 weeks.  
- **#6157** (2026-07-15) – *Chrome extension plugin with native messaging bridge*. Depends on #6276 (unified browser PR), which is also open.  
- **#5882** (2026-07-09) – *Integrate OMP workflow modes*. Large feature PR, no recent maintainer interaction.

These items represent community-proposed features or persistent bugs that could become friction points if left unresolved. The maintainers may want to triage them in the upcoming sprint.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

# EasyClaw Project Digest – 2026-07-21

## 1. Today's Overview
EasyClaw saw no open issues or pull requests updated in the last 24 hours, indicating a quiet day for community activity. However, the project kept its development momentum with **two new releases** (v1.8.77 and v1.8.76) pushed today. The releases focus on security hardening for merchant external imports, interactive Feishu escalation responses, and improvements to affiliate proposal workflows. The repository currently has **zero open issues** and **zero open PRs**, suggesting maintainers have cleared the backlog or the project is in a maintenance phase. Overall, the project appears healthy with active delivery but low community engagement in the past day.

## 2. Releases
Two new versions were released today:

- **v1.8.77** – *RivonClaw v1.8.77*
  - **Changes:** Strengthen safeguards around merchant external imports.
  - **Breaking Changes:** None noted.
  - **Migration Notes:** No special migration steps required; the update is a security patch.
  - [Release link](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.77)

- **v1.8.76** – *RivonClaw v1.8.76*
  - **Changes:**
    - Add interactive Feishu escalation responses and recover merged-forward quoted cards.
    - Unify affiliate relationship timelines and keep pending proposals out of agent context.
    - Improve affiliate proposal revision dispatch and queued checkpoint recovery.
  - **Breaking Changes:** None indicated.
  - **Migration Notes:** The update is backward-compatible; users are advised to upgrade to benefit from the new Feishu integration and proposal reliability improvements.
  - [Release link](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.76)

## 3. Project Progress
No pull requests were merged or closed today. The only progress recorded comes from the two releases, which were presumably merged and tagged directly by maintainers. Key features advanced in these releases include:
- Security hardening for merchant external imports.
- Interactive Feishu (飞书) escalation responses.
- Recovery of merged-forward quoted cards.
- Unification of affiliate relationship timelines.
- Improved proposal revision dispatch and checkpoint recovery.

## 4. Community Hot Topics
No issues or pull requests were updated in the last 24 hours. The repository currently has **zero open issues** and **zero open PRs**, so there are no active community discussions to highlight. This may indicate that recent releases have addressed outstanding concerns, or that community interest is low. Maintainers should monitor for new incoming feedback.

## 5. Bugs & Stability
No bugs, crashes, or regressions were reported in the last 24 hours. The v1.8.77 release explicitly targets security hardening, which may close latent vulnerabilities. No fix PRs are pending. Stability appears good based on the absence of new issue reports.

## 6. Feature Requests & Roadmap Signals
No feature requests were filed today. The recent releases (v1.8.76 and v1.8.77) already include features that align with common user asks:
- **Interactive Feishu escalation** – likely responding to users needing better notification workflows.
- **Affiliate proposal improvements** – aimed at users managing complex affiliate relationships.
- **Security hardening** – a clear response to user concerns about external imports.

Given the zero-backlog state, the next version could focus on additional platform integrations (e.g., WeChat Work, Slack) or further automation of agent context management. No concrete roadmap signals were observed today.

## 7. User Feedback Summary
No direct user feedback (comments, reactions) was captured in the last 24 hours because no issues or PRs were active. The release notes suggest that users were concerned with:
- Security of merchant external imports (addressed in v1.8.77).
- Reliability of Feishu card workflows and merged-forward messages (addressed in v1.8.76).
- Consistency of affiliate proposal timelines and agent context pollution (addressed in v1.8.76).

Satisfaction levels cannot be measured from available data, but the quick successive releases imply the project team is responsive to reported pain points.

## 8. Backlog Watch
There are **no long-unanswered issues or PRs** in the repository. The entire queue is empty. While this reflects efficient maintenance, it also means there are no community contributions waiting for review. Maintainers may want to proactively solicit feature ideas or encourage external contributions to keep the project vibrant.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar).*