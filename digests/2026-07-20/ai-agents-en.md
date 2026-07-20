# OpenClaw Ecosystem Digest 2026-07-20

> Issues: 346 | PRs: 500 | Projects covered: 13 | Generated: 2026-07-20 03:46 UTC

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

# OpenClaw Project Digest – 2026-07-20

## 1. Today's Overview
OpenClaw is in a high-activity period: **346 issues** were updated in the last 24 hours (237 open, 109 closed) and **500 pull requests** (372 open, 128 merged/closed). No new releases were published today. The project saw a strong influx of bug reports and feature requests, with several P1 regressions requiring urgent attention. Community engagement remains robust, with the top issue (#75 – Linux/Windows Clawdbot Apps) accumulating **114 comments** and **80 👍 reactions**. Maintainer responsiveness is visible, but a backlog of security‑sensitive features (masked secrets, permission manifests, pre‑response hooks) still awaits product decisions.

## 2. Releases
*No new releases were created today.*  
The latest available version remains the 2026.7.1 release (noted in several bug reports). No migration notes or breaking changes are reported for today.

## 3. Project Progress
Today **128 pull requests were merged or closed**. Notable changes among the top‑30 PRs include:

- **Security & Stability**:  
  - [#111210](https://github.com/openclaw/openclaw/pull/111210) (*closed*) – Fix Firecrawl search/scrape to reject malformed 2xx response envelopes.  
  - [#110725](https://github.com/openclaw/openclaw/pull/110725) (*open*) – Fix TTS speech requests hanging on stalled endpoints.  
  - [#110297](https://github.com/openclaw/openclaw/pull/110297) (*open*, P1) – Avoid synthetic context overflow in tool‑heavy sessions (closes #107655).  

- **Cron & Agent Orchestration**:  
  - [#110679](https://github.com/openclaw/openclaw/pull/110679) – Fix test‑performance‑agent hang when `git fetch` stalls (up to 240 min).  

- **Cross‑Platform & Compatibility**:  
  - [#111624](https://github.com/openclaw/openclaw/pull/111624) – Read POSIX drive paths on Windows (e.g., `/c/...`).  
  - [#111587](https://github.com/openclaw/openclaw/pull/111587) – Fix Kimi K3 1M context model selection.  

- **Channel & Plugin Fixes**:  
  - [#111617](https://github.com/openclaw/openclaw/pull/111617) – Skip PluralKit lookup for non‑webhook Discord messages.  
  - [#110535](https://github.com/openclaw/openclaw/pull/110535) – Stop stale MCP child processes with SIGKILL escalation.  

These changes touch critical areas: session compaction, provider compatibility, and message delivery reliability.

## 4. Community Hot Topics
The most active discussions (by comment count / reactions) reflect two dominant concerns: **cross‑platform support** and **agent security**.

| Issue | Title | Comments | Reactions | Link |
|-------|-------|----------|-----------|------|
| #75 | Linux/Windows Clawdbot Apps | 114 | 80 👍 | [open](https://github.com/openclaw/openclaw/issues/75) |
| #7707 | Memory Trust Tagging by Source | 17 | – | [open](https://github.com/openclaw/openclaw/issues/7707) |
| #10659 | Masked Secrets – Prevent Agent from Accessing Raw API Keys | 14 | 4 👍 | [open](https://github.com/openclaw/openclaw/issues/10659) |
| #13583 | Pre‑response enforcement hooks (hard gates) | 14 | 2 👍 | [open](https://github.com/openclaw/openclaw/issues/13583) |
| #79077 | Telegram bot‑to‑bot and guest‑bot modes | 11 | 8 👍 | [open](https://github.com/openclaw/openclaw/issues/79077) |
| #94846 | Cron isolated agentTurn skips delivery after recovered tool error | 12 | – | [open](https://github.com/openclaw/openclaw/issues/94846) |
| #109490 | Codex app‑server: turn interrupted after delegated message tool | 11 | – | [open](https://github.com/openclaw/openclaw/issues/109490) |

**Underlying needs**: Users are pushing for parity with macOS on Linux/Windows (#75), stronger security boundaries (#7707, #10659, #13583), and richer messaging channels (#79077, Telegram). The high reaction count on #75 (80 👍) signals it is the single most‑demanded feature.

## 5. Bugs & Stability
Several **P1 regressions** were reported or updated today, demanding immediate maintainer attention:

| Issue | Title | Severity | Fix PR Exists? |
|-------|-------|----------|----------------|
| #108075 | LLM request failed: provider rejected schema/tool payload (regression in 2026.7.1) | P1 | No |
| #109490 | Turn interrupted after delegated message tool `terminate:true` (2026.7.1) | P1 | No |
| #102006 | `exec` aborted run wedges subsequent calls (regression from PR #94412) | P1 | No |
| #108580 | Cron tool schema incompatible with llama.cpp grammar‑constrained tool calling (2026.7.1) | P1 | No |
| #111519 | Telegram DM replies fall back after stale DM‑scope cleanup (2026.7.2‑beta.3) | P1 | No |
| #111506 | Rapid‑fire requests cause session lock contention on heavy contexts | P2 | No |
| #94846 | Cron finalization treats recovered tool error as fatal | P2 | No |
| #70024 | Channel stop timeout leaves channel permanently dead | P1 | No |
| #85246 | UI Update button breaks Gateway when npm global + launchd deadlock | P1 | No |
| #89954 | Telegram getUpdates 409 cascade on IPv6 fallback | P1 (closed) | Yes (closed) |
| #108238 | Context usage mis‑reports cacheRead as totalTokens (Chinese report) | P1 (closed) | Yes |

**Notable fix‑in‑progress**:  
- [#110297](https://github.com/openclaw/openclaw/pull/110297) addresses the synthetic overflow issue (#107655).  
- [#111154](https://github.com/openclaw/openclaw/pull/111154) recovers disconnected gateway runs before rerunning.  
- [#111616](https://github.com/openclaw/openclaw/pull/111616) fixes compaction after tool‑only suffixes.

**Crash‑loop / gateway instability** is a recurring pattern: issues #99910 (Memory Dreaming pegs event loop), #102006 (wedged exec), #85246 (UI update deadlock), and #97970 (authentication conflict after update) all threaten uptime.

## 6. Feature Requests & Roadmap Signals
Long‑standing feature requests continue to gather momentum. The most likely candidates for the next minor release include:

- **Masked Secrets** (#10659) – Prevents agents from reading raw API keys; aligns with the broader security‑by‑design push.  
- **Pre‑response Enforcement Hooks** (#13583) – Hard gates for mandatory tool calls (quant/finance, ops).  
- **Denylist for Exec‑Approvals** (#6615) – “Allow everything except X” policies, complementing allowlists.  
- **Memory Trust Tagging** (#7707) – Tags memory entries by source to prevent poisoning.  

**New signals from today’s activity**:  
- **“Everything is a cron”** (#110950, opened 2026‑07‑18, 7 comments) – Unifies heartbeat, watchers, and scheduled automation under one primitive.  
- **Agent‑controlled session status** (PR #111583) – Lets agents set attention flags, TTL, and status in the sidebar.  
- **Sandbox isolation for plugin tools** (PR #111634) – Routes untrusted `fetch+extract` through Docker sandbox.  
- **AG‑UI channel** (PR #109203) – Enables OpenClaw to drive agents from protocol browsers like CopilotKit.  

These indicate a roadmap focused on **security hardening**, **cron unification**, and **channel expansion** beyond the current messaging platforms.

## 7. User Feedback Summary
**Common pain points** expressed across issues and PR comments:

- **Missing platform parity**: Linux/Windows desktop apps remain the top request (80 👍).  
- **Security & trust**: Users are worried about memory poisoning, secret leakage, and untrusted skills. Concrete feature requests (masked secrets, permission manifests, denylists) are critical to adoption.  
- **Agent orchestration fragility**: Cron isolated sessions, subagent result aggregation, and tool‑call delivery failures cause frustration in automated workflows.  
- **Channel limitations**: Telegram’s new bot‑to‑bot/guest‑bot features (#79077) and WhatsApp listen‑only mode (#78963) are demanded for real‑world use.  
- **UI/UX friction**: Missing Shift+Enter in TUI (#10118), confusing context overflow messages (#9409), and plugin version drift (#83337) degrade the experience.  

**Satisfaction signals**: High issue and PR activity (346 + 500) indicates a vibrant contributor community. Several closed bugs (e.g., #108075, #92905, #81525) show maintainers are actively reducing the regression list.

## 8. Backlog Watch
Issues and PRs that have remained open for months and require maintainer review or product decision:

| Issue / PR | Created | Comments | Last Updated | Notes |
|-----------|---------|----------|--------------|-------|
| #75 – Linux/Windows Clawdbot Apps | 2026‑01‑01 | 114 | 2026‑07‑19 | Needs product decision; highest‑reaction issue. |
| #7707 – Memory Trust Tagging | 2026‑02‑03 | 17 | 2026‑07‑19 | Stalled on security review and product decision. |
| #10659 – Masked Secrets | 2026‑02‑06 | 14 | 2026‑07‑20 | Still needs maintainer review and security review. |
| #13583 – Pre‑response Enforcement Hooks | 2026‑02‑10 | 14 | 2026‑07‑19 | Same situation; awaiting maintainer review. |
| #6615 – Denylist for Exec‑Approvals | 2026‑02‑01 | 8 | 2026‑07‑20 | Linked PR open; needs maintainer and security review. |
| #11665 – Webhook hook sessions reuse | 2026‑02‑08 | 10 | 2026‑07‑19 | Documented behavior does not work; linked PR open. |
| #39248 – `sandbox.mode: "non-main"` breaks subagent init | 2026‑03‑07 | 6 | 2026‑07‑19 | Long‑standing P1 bug with no fix in sight. |
| PR #102293 – 1Password SecretRef plugin | 2026‑07‑08 | – | 2026‑07‑20 | Waiting on author; size XL, high value for secret management. |
| #11955 – Memory/Context Improvements | 2026‑02‑08 | 5 | 2026‑07‑19 | Grouped feature request; needs product decision. |

These items are blocking key user workflows and should be prioritized in the next maintenance sprint. The **community’s loudest voice (#75 – cross‑platform apps)** has been unanswered for over six months, which risks losing potential Linux/Windows users to competing solutions.

---

*Digest generated 2026-07-20 from openclaw/openclaw GitHub data. All links point to the public repository.*

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report: Personal AI Agent Ecosystem

## 2026-07-20

---

## 1. Ecosystem Overview

The personal AI agent open-source ecosystem is experiencing a pronounced bifurcation between **high-velocity core projects driving architectural innovation** and **satellite projects at varying maturity levels**. Activity across the top-tier projects (OpenClaw, IronClaw, NanoClaw, CoPaw) indicates a landscape maturing beyond proof-of-concept into production-grade infrastructure: multi-channel support, security hardening, cross-platform parity, and persistent memory are now table stakes rather than differentiators. A notable 4 of 12 tracked projects recorded zero activity, suggesting consolidation pressures where community attention concentrates on a few actively maintained forks. The ecosystem's health is robust where it matters—core reference implementations and their direct derivatives continue to iterate aggressively—but fragmentation remains a risk for users selecting a platform for long-term investment.

---

## 2. Activity Comparison

| Project | Issues (24h) | PRs (24h) | Release Today | Health Score |
|---------|-------------|-----------|---------------|--------------|
| **OpenClaw** | 346 updated | 500 updated | No | **High** – intense activity, but regressions threaten stability |
| **IronClaw** | 7 updated | 50 updated (29 merged) | No | **Very High** – rapid refactoring, responsive bug fixes |
| **NanoClaw** | ~15 merged | 20 updated (15 merged) | No | **High** – exceptional PR throughput, WhatsApp fixes landed |
| **CoPaw** | 16 updated | 18 updated (4 merged) | No | **High** – healthy contributor base, version bump merged |
| **Zeroclaw** | 34 updated | 50 updated (2 merged) | No (v0.8.3 latest) | **Moderate** – S0 security bug unresolved |
| **NanoBot** | 7 updated | 33 updated (10 closed) | No | **Moderate** – responsive but lingering pre-release bugs |
| **PicoClaw** | 5 updated | 4 updated (1 closed) | No | **Low-Moderate** – critical MCP hang unfixed |
| **LobsterAI** | 3 stale updates | 3 stale updates | No | **Low** – zero maintainer activity, stale bugs |
| **Moltis** | 0 | 0 | **Yes** (nightly) | **Low** – no community engagement |
| **NullClaw** | 0 | 0 | No | **Inactive** |
| **TinyClaw** | 0 | 0 | No | **Inactive** |
| **ZeptoClaw** | 0 | 0 | No | **Inactive** |
| **EasyClaw** | 0 | 0 | No | **Inactive** |

*Note: Health Score reflects issue triage responsiveness, regression density, and maintainer engagement.*

---

## 3. OpenClaw's Position

**Advantages vs. peers:**
- **Largest community** by far: 346 issues and 500 PRs updated in 24h dwarfs all peers (next closest: IronClaw at 50 PRs). Top issue (#75) has 80 👍 reactions and 114 comments.
- **Most comprehensive feature surface**: Cron orchestration, memory trust tagging, masked secrets, cross-platform apps—no other project covers this breadth.
- **Most plugin/ecosystem investment**: Discord, Telegram, AG-UI channels, Docker sandbox isolation, 1Password integration.

**Technical approach differences:**
- OpenClaw follows a **monolithic reference architecture** (single repo, extensive configuration surface). Contrast with NanoClaw's **skill-based modularity** or IronClaw's **"reborn" refactoring** toward decomposed internal domains.
- Emphasizes **enterprise-grade security** (pre-response hooks, permission manifests, denylists) ahead of peers, though these features remain unimplemented.

**Community size comparison:**
- OpenClaw's 80+ reactions on a single feature request exceeds the *total* community engagement of NanoBot, PicoClaw, LobsterAI, and Moltis combined.
- However, **merge velocity lags behind IronClaw**: 128 merged/closed PRs vs IronClaw's 29 in 24h, but IronClaw's absolute count is smaller. OpenClaw's open PR backlog (372 open) signals review bottlenecks.

**Key vulnerability**: The **#75 cross-platform app request** has been unanswered for 7+ months (since Jan 2026). This single issue threatens to push Linux/Windows users to competitors like CoPaw (which already ships desktop builds) or NanoClaw (multi-channel focus).

---

## 4. Shared Technical Focus Areas

| Focus Area | Projects | Specific Needs Identified |
|------------|----------|--------------------------|
| **Security & Trust** | OpenClaw, Zeroclaw, CoPaw | Masked secrets (OC#10659), permission manifests (OC#13583), confused-deputy prevention (ZC#7947), exec approval denylists (OC#6615) |
| **Multi-Channel Expansion** | OpenClaw, NanoBot, NanoClaw, Zeroclaw | Telegram bot-to-bot (OC#79077), WhatsApp LID groups (NC#3038), WeChat/Feishu/Teams (NanoClaw), voice channels (ZC#7943) |
| **Performance & Caching** | NanoBot, IronClaw, CoPaw, OpenClaw | Ollama prompt cache (NB#4867), MCP driver parallelization (CP#6193), session compaction (OC#110297), prompt-cache metrics (PC#3251) |
| **Cross-Platform Parity** | OpenClaw, Zeroclaw, PicoClaw | Linux/Windows desktop apps (OC#75), Windows test failures (ZC#7462), Android launcher (PC#3182), Windows UTF-8 crashes (NB#4975) |
| **Agent Reliability** | OpenClaw, NanoBot, Zeroclaw, IronClaw | Agent repetition loops (CP#6241), lazy execution (NB#1459), cron delivery failures (OC#94846), turn interruption (OC#109490) |
| **Memory & Context** | OpenClaw, Zeroclaw, CoPaw | Memory trust tagging (OC#7707), persistent memory parity (ZC#8891), per-agent memory profiles (CP#6263), context overflow handling (OC#110297) |

**Notable absence**: No project is deeply investing in **multi-modal input** (beyond basic image support) or **agent-to-agent communication protocols**—these remain open spaces for differentiation.

---

## 5. Differentiation Analysis

| Dimension | OpenClaw | IronClaw | NanoClaw | CoPaw | Zeroclaw |
|-----------|----------|----------|----------|-------|----------|
| **Target User** | Advanced/power users, enterprise | Infrastructure engineers | Channel operators, skill developers | Desktop users, multi-agent orchestrators | Platform engineers |
| **Architecture** | Monolithic reference | Refactoring toward modular "reborn" | Skill-based modular (MCP servers) | Python-heavy, Tauri desktop | Plugin-oriented, WASM future |
| **Differentiator** | Breadth & community size | Internal architecture rigor | Multi-channel speed & WhatsApp LID | Desktop UX & workflow orchestration | Security & credential hardening |
| **Primary Channel** | Discord, Telegram | Chat API | Telegram, WhatsApp, Discord, Teams | Web UI, Desktop | CLI, Telegram |
| **Model Strategy** | Broad provider support | Anthropic-leaning | OpenAI-compatible via MCP | OpenAI-centric | Multiple providers |
| **Deployment** | Self-hosted (Docker/npm) | Self-hosted | Lightweight install | Desktop app (Tauri) | CLI-centric |

**Key differentiator summary**: OpenClaw wins on **ecosystem breadth** and **community gravity**; IronClaw on **engineering excellence** and **architecture refinement**; NanoClaw on **channel velocity** and **MCP extensibility**; CoPaw on **desktop UX** and **multi-agent workflow**; Zeroclaw on **platform engineering** and **security foundations**.

---

## 6. Community Momentum & Maturity

**Tier 1 – High-Velocity Iteration (releases every 1-4 weeks)**
- **OpenClaw**: Massive community, but review bottlenecks. Regressions (P1 bugs) are accumulating faster than fixes can land.
- **IronClaw**: Fastest merge rate per active issue. "Reborn" refactoring is transformative—project is shedding technical debt aggressively.
- **NanoClaw**: Exceptional PR throughput (15 merged today). Multi-channel foundation now complete; likely to stabilize next.

**Tier 2 – Active Development (releases every 4-8 weeks)**
- **CoPaw**: Healthy cadence, community bug reporters, version bump merged. Desktop focus is attracting users.
- **NanoBot**: Moderate activity, responsive issue closure. Performance issues (Ollama caching) being addressed.
- **Zeroclaw**: Active but S0 security bug unresolved. Windows parity gap is a blocker for broader adoption.

**Tier 3 – Low Activity / Maintenance**
- **PicoClaw**: Small team, critical bug (MCP hang) unfixed. Risk of user abandonment if not addressed soon.
- **LobsterAI**: Effectively dormant—no maintainer responses in months.
- **Moltis**: Nightly releases but zero community engagement. Purpose unclear.

**Tier 4 – Inactive**
- NullClaw, TinyClaw, ZeptoClaw, EasyClaw: No activity. Likely stalled or abandoned.

---

## 7. Trend Signals

### From Community Feedback Across Projects

1. **"Security is the next frontier"** — Across OpenClaw (#10659, #13583), Zeroclaw (#7947), and CoPaw (#6260), users are demanding **credential isolation, permission gating, and execution sandboxes** as prerequisites for production deployment. Expect security-focused releases from all Tier 1 projects within 2-3 months.

2. **"Multi-channel is not a feature, it's infrastructure"** — With NanoClaw merging Telegram, Discord, WeChat, and Teams this week alone, and OpenClaw fielding Telegram bot-to-bot requests, the ecosystem is converging that **any single-channel agent is obsolete**. Expect **channel abstraction layers** to become a standard architectural pattern.

3. **"Cold start performance is a dealbreaker"** — NanoBot's 60-second Ollama delays (#4867) and CoPaw's 8x serialization overhead (#6193) reveal that **local model inference latency is the #1 UX pain point**. Prompt caching and parallel initialization will be table stakes in next releases.

4. **"Agent reliability is fragile"** — Agent repetition loops (CoPaw #6241), lazy execution (NanoBot #1459), and cron delivery failures (OpenClaw #94846) point to a systemic gap in **agent behavior monitoring and circuit breakers**. Expect "agent health observability" as a new feature category.

5. **"Windows support is the growth bottleneck"** — Zeroclaw's 74 test failures (#7462), PicoClaw's Android bugs (#3182), and OpenClaw's #75 show that **Linux/macOS-first projects are hitting a ceiling**. Cross-platform CI and desktop app investment will determine which projects scale beyond developer enthusiasts.

### Value for AI Agent Developers

- **If building production agents today**: Start with OpenClaw for breadth, ironclaw for performance, or NanoClaw for multi-channel deployment. Monitor IronClaw's "reborn" architecture for patterns to adopt.
- **If contributing**: The biggest impact opportunities are **security features** (masked secrets, permission manifests) and **Windows/Android parity**—both have high community demand and low competition.
- **If investing in long-term platform**: Watch for consolidation. The 4 inactive projects suggest the ecosystem may coalesce around 2-3 reference implementations. OpenClaw's community gravity is strong, but its regression rate and backlog demand vigilance.

---

*Report generated from GitHub activity data for 2026-07-20 across 13 projects in the personal AI agent open-source ecosystem.*

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot Project Digest — 2026-07-20

## 1. Today's Overview

Activity remains high with **33 pull requests** and **7 issues** updated in the last 24 hours, indicating a healthy development cadence. Six of the seven issues were closed, and 10 PRs were merged or closed (23 remain open). No release was cut today. The community is actively contributing bug fixes, provider integrations, and architectural proposals, while several longstanding bugs and performance concerns continue to drive discussion. The project shows strong momentum in improving channel reliability (WhatsApp, Feishu, Telegram), prompt caching, and multi-agent capabilities.

## 2. Releases (None)

No new releases were published today. The latest release remains the previous version (not listed); no migration notes are applicable.

## 3. Project Progress

One PR was merged or closed in the top‑20 sample:

- **[PR #4996]** [closed] **Atlas Cloud provider support** — registered as a built‑in OpenAI‑compatible gateway, with API key handling, curated model entries, and documentation.  
  [HKUDS/nanobot PR #4996](https://github.com/HKUDS/nanobot/pull/4996)

Numerous open PRs are advancing features and fixes, including:

- **Dependency manifest migration** (#4995) — `nanobot plugins install <name>` and Docker build improvements.
- **Ollama prompt cache diagnostics** (#4998) — documentation guide.
- **Filesystem workspace checks** (#4987) — bind workspace validation to opened file handles.
- **ModelScope provider** (#4965) — new provider integration.
- **OAuth status visibility** (#4689) — CLI and WebUI warnings.

Six issues were **closed** today, suggesting fixes or resolutions were applied:

- #4867 – Enhancement: preserve exact prompt prefix for Ollama caching.
- #4823 – Bug: WhatsApp groups regression (closed, likely fixed).
- #4999 – Proposal: multi‑agent collaboration (closed as proposal?).
- #4991 – Bug: local triggers succeed after channel disabled.
- #4975 – Bug: UTF‑8 subprocess crash on Windows non‑UTF‑8 locales.
- #4980 – Bug: GitStore failure with different workspace directory.

## 4. Community Hot Topics

The most active discussions (by comment count and reactions):

- **[Issue #4867]** [closed] *Prompt caching for Ollama* — 11 comments, 0 👍. The user reported a **60‑second delay per turn** with Ollama, calling it “totally unusable” with 32 GB VRAM. This triggered a follow‑up PR (#4998) that documents diagnostic steps.  
  [HKUDS/nanobot Issue #4867](https://github.com/HKUDS/nanobot/issues/4867)

- **[Issue #1459]** [open, since March] *nanobot with codex-5.3-codex is lazy* — 6 comments, 2 👍. The user reports that the agent claims to read files but never actually executes. This issue has been unanswered for months and remains a pain point for model‑specific behaviors.  
  [HKUDS/nanobot Issue #1459](https://github.com/HKUDS/nanobot/issues/1459)

- **[Issue #4823]** [closed] *WhatsApp groups regression* — 4 comments. The community expressed frustration over group response routing breaking after v0.2.2. Now closed, suggesting a fix was applied.  
  [HKUDS/nanobot Issue #4823](https://github.com/HKUDS/nanobot/issues/4823)

Underlying needs: **Performance with local models** (Ollama) and **agent reliability** (lazy execution) are the two loudest user pain points.

## 5. Bugs & Stability

Three new bugs were reported and closed today, plus one still‑open bug from March:

| Issue | Severity | Description | Fix PR (if any) |
|-------|----------|-------------|-----------------|
| #4975 | **High** – crash | `CliAppManager` subprocess raises `UnicodeDecodeError` on Windows CP936/GBK locales when CLI programs output UTF‑8. | No specific PR, but closed (likely fixed). |
| #4980 | **High** – initialization failure | `GitStore` fails to initialize or create commits when workspace differs from working directory (relative path issue with Dulwich). | Possibly related to #4987 (filesystem checks) but not directly. |
| #4991 | **Medium** – resource waste | Local triggers report success after their target channel is disabled, consuming model usage. | Closed – fix likely in commit. |
| #1459 | **Medium** – functional bug | Agent with `codex-5.3-codex` does not execute commands, only reads. | No fix PR yet; open since March. |

Additionally, open PRs address related stability issues:

- **#4982** – fix Feishu hang when limit ≤ 0.
- **#4981** – fix Telegram hang when max_len ≤ 0.
- **#4987** – bind workspace checks to opened files (security/bug fix).
- **#4947** – keep sensitive URLs out of Jina Reader.

## 6. Feature Requests & Roadmap Signals

New feature requests and signals for future versions:

- **Prompt caching for Ollama** (#4867) – The closed issue and the companion documentation PR (#4998) strongly suggest **prompt cache diagnostics and optimization will land in the next release**.
- **Multi‑agent collaboration** (#4999) – A proposal to evolve subagents from task delegation to true multi‑agent with persistent identities and shared state. This is a major architectural direction.
- **New providers**: Atlas Cloud (#4996, merged), ModelScope (#4965, open), Nimble search (#4951), and custom Telegram Bot API base URL (#4919) – point to increasing provider extensibility.
- **Session‑scoped model presets** (#4866) – Binding model selection to sessions, with immutable runtime capture, is likely to be included soon.
- **Secure browser companion launch** (#4997) – A security‑focused WebUI feature.
- **OAuth status expiry warnings** (#4689) – Improves provider UX.

Predicted for next version: **Ollama caching diagnostics**, **new providers (Atlas Cloud, ModelScope)**, **session‑scoped model presets**, and possibly the **multi‑agent proposal** if community discussion gains traction.

## 7. User Feedback Summary

**Pain points:**

- Performance: “Extra 60 seconds to every single turn” with Ollama – “totally unusable” (The‑Markitecht, #4867).
- Reliability: “nanobot is lazy and doesn’t actually execute” – agent claims to read but doesn’t (intelliot, #1459).
- Regression: WhatsApp group responses breaking after update – “group allow is broken” (mxnbf, #4823).
- Bugs: Issues with UTF‑8, GitStore, and triggers causing silent failures or token waste (kuchazi‑yy, #4975, #4980, #4991).

**Satisfaction signals:**

- The fast closure of reported bugs (6 closed in 24h) indicates responsive maintainers.
- The multi‑agent proposal (#4999) and new provider PRs (#4996, #4965) show community investment and forward‑looking design.

**Use cases:** Local model inference (Ollama), multi‑channel deployment (WhatsApp, Feishu, Telegram), and advanced automation (subagents).

## 8. Backlog Watch

Issues and PRs that have remained open for an extended time without clear maintainer action:

| Item | Age | Status | Notes |
|------|-----|--------|-------|
| #1459 – Agent laziness with codex‑5.3‑codex | **4.5 months** (since Mar 2026) | Open, 2 👍 | No fix PR; repeated user frustration. |
| #4300 – Skill type requirements check | 5+ weeks (since Jun 11) | Open, conflict label | Needs conflict resolution and review. |
| #4223 – Weixin session reload after pause | 6+ weeks (since Jun 6) | Open, conflict label | Critical for Weixin channel reliability. |
| #4768 – QQ exponential backoff reconnect | 2 weeks (since Jul 6) | Open, conflict label | Duplicate of #4838? Both open. |
| #4689 – OAuth status and expiry warnings | 2.5 weeks (since Jul 3) | Open, conflict label | Important UX improvement, needs rebase. |

These items represent **unresolved reliability bugs** and **feature PRs that require maintainer attention** to merge. The presence of “conflict” labels suggests many PRs need rebasing or conflict resolution.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw Project Digest — 2026-07-20

## 1. Today's Overview
The Zeroclaw project remains highly active with **34 issues** and **50 pull requests** updated in the last 24 hours—indicating sustained contributor and maintainer engagement. The latest release (0.8.3) is being followed up by a maintenance train (v0.8.4, target July 31) and a larger v0.9.0 security/auth milestone. Key workstreams include a governance RFC on work lanes and label cleanup (#6808), a high-severity security bug in `execute_pipeline` (#7947), and ongoing platform parity efforts (Windows test failures #7462). Three issues and two PRs closed today, and several feature RFCs (e.g., memory separation #9048, KeySource trait #9127) are moving toward implementation.

## 2. Releases
**No new releases** in the last 24 hours. The most recent release remains **v0.8.3**; the v0.8.4 maintenance train (tracker #8357) is in progress with a target date of July 31.

## 3. Project Progress
Two pull requests were merged/closed today:
- **[#8499](https://github.com/zeroclaw-labs/zeroclaw/pull/8499)** — `fix(hardware): preserve inner error in serial and uno-q bridge timeout handlers` (merged)
- **[#8514](https://github.com/zeroclaw-labs/zeroclaw/pull/8514)** — `fix(aardvark-sys): preserve inner error in LibraryNotFound error chains` (merged)

Three issues were closed:
- **[#8958](https://github.com/zeroclaw-labs/zeroclaw/issues/8958)** — ACP agent selection via `?agent=` query param (feature implemented)
- **[#8363](https://github.com/zeroclaw-labs/zeroclaw/issues/8363)** — v0.8.3 tracker (completed milestone)
- **[#9017](https://github.com/zeroclaw-labs/zeroclaw/issues/9017)** — `--config-dir` ignored during CLI locale detection (bug fixed)

Notable open PRs nearing completion: **#8848** (SOP admission policy), **#9007** (structured history trimming), **#8854** (typed builders for provider crate), and **#8486** (OpenAI chat completions endpoint).

## 4. Community Hot Topics
The most active discussions (by comment count) reveal deep architectural and operational concerns:

- **[#6808](https://github.com/zeroclaw-labs/zeroclaw/issues/6808)** — RFC: Work Lanes, Board Automation, and Label Cleanup (14 comments)  
  *Governance RFC accepted and rolling out; it aims to reduce manual routing burden for maintainers.*

- **[#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)** — 74 test failures on Windows (10 comments)  
  *Unix-only commands, path semantics, and console encoding cause a large test gap. Users want CI matrix expansion.*

- **[#6641](https://github.com/zeroclaw-labs/zeroclaw/issues/6641)** — Turn-level OTel trace correlation (8 comments)  
  *Feature request to nest spans under a single turn trace; follow-up to prior OTel work.*

- **[#8891](https://github.com/zeroclaw-labs/zeroclaw/issues/8891)** — Persistent memory tracker (7 comments)  
  *Large multi-PR epic aiming to bring memory subsystem to parity with mature peers.*

- **[#9127](https://github.com/zeroclaw-labs/zeroclaw/issues/9127)** — RFC: Abstract `KeySource` trait (7 comments)  
  *Classifies master-key material by source/deployment form to improve credential encryption consistency.*

These threads indicate the community is focused on **platform maturity** (Windows, memory, security) and **developer experience** (work lanes, tracing, credentials).

## 5. Bugs & Stability
New and ongoing bugs reported in the last 24 hours, ranked by severity:

| Severity | Issue | Description | Fix PR exists? |
|----------|-------|-------------|----------------|
| **S0** – data loss/security | [#7947](https://github.com/zeroclaw-labs/zeroclaw/issues/7947) | `execute_pipeline` bypasses per-agent tool gating (confused deputy) | No |
| **S1** – workflow blocked | [#8505](https://github.com/zeroclaw-labs/zeroclaw/issues/8505) | Telegram channel not configurable; bot does not answer | No |
| **S1** – workflow blocked | [#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462) | 74 test failures on Windows (S2 but high severity in practice) | No (feature request #7461 for CI matrix) |
| **S2** – degraded | [#7808](https://github.com/zeroclaw-labs/zeroclaw/issues/7808) | CLI secret prompts give no feedback after paste | No |
| **S2** – degraded | [#9177](https://github.com/zeroclaw-labs/zeroclaw/issues/9177) | JIT loading fails for Qwen3.6-35B-A3B, manual load works | No |
| **S3** – minor | [#9117](https://github.com/zeroclaw-labs/zeroclaw/issues/9117) | ZeroCode won’t start on Windows without `ZEROCLAW_SOCKET` | No |
| **S2** – degraded | [#9017](https://github.com/zeroclaw-labs/zeroclaw/issues/9017) | `--config-dir` ignored during CLI locale detection | Closed (fixed) |

The **S0 security bug** (#7947) requires immediate maintainer attention. The Windows test failures (#7462) are a recurring pain point.

## 6. Feature Requests & Roadmap Signals
High-signal feature requests from the community this week:

- **Persistent memory parity** (#8891, #9048, #6850) — Multiple RFCs and trackers aiming to fully wire cross-session memory, separate conversation history from long-term memory, and decouple lifecycle from storage backends.
- **Platform expansion** (#7461, #7943) — Run tests on Windows/macOS CI, add realtime voice-host channel.
- **Security & credential hardening** (#9127, #7881) — KeySource trait, circuit breakers for provider fallback, intra-family fallback notices.
- **Plugin architecture** (#8850) — Move optional channels/tools from compile-time feature flags to WASM plugins.
- **Operator experience** (#7790) — Bring web dashboard surfaces into `zerocode` TUI.

Predictions for next release (v0.8.4 / v0.9.0):
- **Persistent memory** (at least partial #8891 components) likely to land in v0.8.4.
- **KeySource trait** (#9127) and **execute_pipeline fix** (#7947) are critical for v0.9.0 (auth/security milestone #7432).
- **OpenAI chat completions endpoint** (#8486) has a large XL PR open and could ship soon.
- **PowerShell as native shell on Windows** (#9182) was just opened and may merge quickly.

## 7. User Feedback Summary
Real user pain points expressed in recent issues/PRs:

- **Windows users** are struggling: 74 test failures, ZeroCode startup requires manual env work, and `runtime.shell` is silently ignored (addressed in new PR #9182).
- **Telegram channel** is broken for at least one user after following quickstart instructions (#8505).
- **CLI feedback** missing during secret entry (#7808); users want visual confirmation.
- **Security concerns**: The `execute_pipeline` bypass (#7947) is a serious confused-deputy risk.
- **Model loading fragility**: JIT loading fails for specific models (#9177), causing degraded experience.
- **Feature gaps**: Users want a llama.cpp model router (#7539), realtime voice host (#7943), and better memory curation.

Overall satisfaction is mixed: the project is actively addressing issues, but Windows support and channel stability remain weak points.

## 8. Backlog Watch
Items that have been open for a while or lack maintainer response:

| Issue/PR | Created | Last Update | Reason for watch |
|----------|---------|-------------|------------------|
| [#7947](https://github.com/zeroclaw-labs/zeroclaw/issues/7947) — S0 security bug | 2026-06-18 | 2026-07-19 | No fix PR; critical severity. |
| [#8505](https://github.com/zeroclaw-labs/zeroclaw/issues/8505) — Telegram channel blocked | 2026-06-29 | 2026-07-19 | No acknowledged fix; user waiting. |
| [#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462) — 74 Windows test failures | 2026-06-10 | 2026-07-20 | Long-standing platform blocker; companion feature request #7461 also open. |
| [#6850](https://github.com/zeroclaw-labs/zeroclaw/issues/6850) — Memory lifecycle RFC | 2026-05-22 | 2026-07-19 | Large architecture RFC with no PR yet; needs implementation. |
| PRs with `needs-author-action` label | Various | 2026-07-20 | e.g., #8438, #8324, #9105, #8486, #8966, #9166 — require author updates or maintainer review. |

The backlog shows that security and Windows parity are the most pressing areas lacking resolution.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw Project Digest — 2026-07-20

---

## 1. Today’s Overview
Project activity was moderate with **5 issues** and **4 pull requests** updated in the last 24 hours. One bug was fixed and closed (#3266), while two new bugs were opened, including a critical hang when MCP server connections fail (#3269). No new releases were published. The community continues to raise concerns about Android compatibility and provider configuration quirks, and several stale items remain unanswered.

---

## 2. Releases
No new releases were tagged in the last 24 hours.

---

## 3. Project Progress
- **Merged/Closed PRs:**
  - **#277** (closed) – `feat: update the make deps logic to prevent the project from frequently updating dependency package versions` – This long-standing dependency management improvement was finally merged or closed today, stabilizing the build process.
- **Fixed Issue:**
  - **#3266** (closed) – **Weixin channel passes images to non‑vision model** – A bug was fixed so that images sent via the Weixin channel are handled before being passed to a non‑vision model, preventing premature errors.
- **Open PRs advancing features:**
  - **#3267** – Fix for incorrect scope when refreshing antigravity tokens.
  - **#3202** – Normalization of agent/account IDs to strip leading/trailing underscores.
  - **#3251** – Capture of Anthropic prompt‑cache token metrics.

---

## 4. Community Hot Topics
The most discussed item is the long‑standing **Android version bug**:

- **[Issue #3182 – Android version [BUG] [stale]](https://github.com/sipeed/picoclaw/issues/3182)** (4 comments, 0 👍)  
  User reports inability to launch the service on Android despite full permissions; path cannot be changed. This issue has been open since June 26 and received the most attention in the community, indicating persistent demand for reliable Android support.

- **[Issue #3252 – splitKnownProviderModel strips provider prefix [BUG] [stale]](https://github.com/sipeed/picoclaw/issues/3252)** (1 comment)  
  A configuration bug where the provider prefix is incorrectly stripped when the model ID itself contains a known provider alias. This affects users with model names that overlap with aliases.

No other issues or PRs received comments today. The lack of reactions suggests these are niche but blocking problems.

---

## 5. Bugs & Stability

| **Severity** | **Issue** | **Description** | **Fix PR?** |
|--------------|-----------|-----------------|-------------|
| **Critical** | [#3269 – MCP server connection failure hangs agent loop](https://github.com/sipeed/picoclaw/issues/3269) | When an MCP server connection fails, the agent loop hangs, stopping chat replies entirely. No workaround or fix PR exists yet. | No |
| **High** | [#3268 – exec tool action parameter should default to "run"](https://github.com/sipeed/picoclaw/issues/3268) | The `exec` tool requires `action` as a required param, breaking LLM calls that omit it (the common case). A default value would fix many failed calls. | No |
| **Medium** | [#3252 – Provider prefix stripping](https://github.com/sipeed/picoclaw/issues/3252) | Misconfiguration of model IDs causing silent failures. | No |
| **Medium** | [#3182 – Android service startup](https://github.com/sipeed/picoclaw/issues/3182) | App cannot launch service on Android; user reports full permission but still fails. | No |
| **Fixed** | [#3266 – Weixin channel image handling](https://github.com/sipeed/picoclaw/issues/3266) | Closed after fix was applied. Non‑vision models no longer receive images directly. | Fixed in commit (no PR linked) |

The **MCP hang (#3269)** is the most urgent stability threat because it completely disables the chat interface.

---

## 6. Feature Requests & Roadmap Signals

- **Prompt‑cache metrics for Anthropic** (PR #3251) – Users and operators need visibility into whether Claude’s prompt cache is being used. This is likely to be merged in the next minor release.
- **Default `action` for exec tool** (Issue #3268) – A simple but impactful change that would reduce LLM call failures. Expect it to be addressed soon given the clear use case.
- **ID normalization improvements** (PR #3202) – Prevent agent/account ID errors caused by leading/trailing underscores. Already implemented in a PR awaiting merge.
- **antigravity token refresh scope** (PR #3267) – Fix for a permission error when using antigravity as an auth backend. Likely to be merged quickly to unblock users.

No new feature requests were filed today; the community focus remains on bugs and stability.

---

## 7. User Feedback Summary

- **Pain Points:**
  - Android users face a complete block (#3182) – cannot start the service at all.
  - Model configuration is fragile when provider names overlap with alias strings (#3252).
  - MCP server failures lead to silent hangs (#3269), creating a poor user experience.
  - The `exec` tool is hard to use with LLMs because the required `action` parameter is almost always `"run"` (#3268).

- **Satisfaction Indicators:**
  - The Weixin image handling bug was fixed quickly, showing responsiveness to channel‑specific issues.
  - No reports of regressions in the latest nightly build, suggesting overall stability for core features.

Users appear to be actively testing nightlies and reporting configuration/edge‑case bugs, indicating a engaged but frustrated community.

---

## 8. Backlog Watch

The following items have been **open for more than a week** without maintainer response, risking user dissatisfaction:

| **Item** | **Age** | **Comments** | **Why It Matters** |
|----------|---------|--------------|-------------------|
| [#3182 – Android version [stale]](https://github.com/sipeed/picoclaw/issues/3182) | 24 days | 4 | Android is a major platform; no official response since creation. |
| [#3252 – Provider prefix stripping [stale]](https://github.com/sipeed/picoclaw/issues/3252) | 8 days | 1 | Configuration bug affecting users with certain model names. |
| [#3251 – Anthropic prompt cache capture [stale PR]](https://github.com/sipeed/picoclaw/pull/3251) | 8 days | 0 | Feature PR for operator visibility; no review comments. |
| [#3202 – ID normalization [open PR]](https://github.com/sipeed/picoclaw/pull/3202) | 19 days | 0 | Code ready but not merged; fixes a documented constraint violation. |

These items should be prioritized by maintainers to prevent further community frustration and to demonstrate active project stewardship.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

**NanoClaw Project Digest – 2026-07-20**

---

## 1. Today’s Overview
NanoClaw sees very high activity today with **20 pull requests updated** in the last 24 hours, of which **15 were merged or closed**—a strong signal of accelerated development. Two fresh feature requests were filed, both reflecting community desires for deeper agent autonomy and standardized extensibility. No new releases were cut today. The project is clearly in an active integration phase, with multiple channel additions (Telegram, Discord, WeChat, Teams) and critical WhatsApp group-messaging fixes finally landing.

---

## 2. Releases
*No releases published on 2026-07-20.*

---

## 3. Project Progress – Merged/Closed PRs Today
The following significant PRs were merged or closed, marking substantial progress across channels, MCP integration, and stability:

| PR # | Title | Type | Notes |
|------|-------|------|-------|
| #2306 | **feat(yt-dlp-mcp): in-tree MCP server + /add-ytdlp installer** | Feature / Skill | Adds YouTube-DL MCP server for media downloading |
| #2278 | **feat: per-wiring channel permission (read \| write \| read+write)** | Feature / Skill | Granular channel access control |
| #2276 | **fix(channels): URL fallback in bridge when adapter omits fetchData** | Fix | Ensures graceful fallback for channel adapters |
| #2261 | **feat(mcp): /add-ffmpeg – ffmpeg/ffprobe MCP server for media transformation** | Feature / Skill | Media transformation via MCP |
| #3038 | **fix(whatsapp): don’t translate group participants to phone JIDs** | Fix | Resolves LID-mode group send stalls |
| #3008 | **fix(whatsapp): remove cachedGroupMetadata that breaks SKDM in LID groups** | Fix | Underlying cause of group encryption failures |
| #2870 | **fix(whatsapp): keep native participant addressing for group encryption** | Fix | Complementary WhatsApp LID fix |
| #2688 | **fix(whatsapp): stop translating group participants to phone JIDs** | Fix | Similar LID group fix (multiple approaches merged) |
| #2847 | **feat: support URL-based (remote) MCP servers** | Feature / Refactor | Enables HTTP/SSE MCP endpoints |
| #1087 | **feat: add Telegram channel, voice transcription, and message deduplication** | Feature / Skill | Full Telegram channel with whisper.cpp |
| #1921 | **feat: add /add-weixin skill — WeChat channel via iLink bot protocol** | Feature / Skill | WeChat integration |
| #1648 | **feat: add Microsoft Teams channel (/add-msteams)** | Feature / Skill | Teams channel via Bot Framework |
| #1594 | **feat: add WeChat channel skill** | Feature / Skill | Alternative WeChat integration |
| #1517 | **feat: add Discord channel with image attachment support** | Feature / Skill | Discord channel with multimodal content |
| #352 | **feat: add Telegram as a channel, replacing WhatsApp as default** | Feature / Skill | Early Telegram channel (now superseded by #1087) |

*All links: [PR #2306](https://github.com/nanocoai/nanoclaw/pull/2306), [#2278](https://github.com/nanocoai/nanoclaw/pull/2278), [#2276](https://github.com/nanocoai/nanoclaw/pull/2276), [#2261](https://github.com/nanocoai/nanoclaw/pull/2261), [#3038](https://github.com/nanocoai/nanoclaw/pull/3038), [#3008](https://github.com/nanocoai/nanoclaw/pull/3008), [#2870](https://github.com/nanocoai/nanoclaw/pull/2870), [#2688](https://github.com/nanocoai/nanoclaw/pull/2688), [#2847](https://github.com/nanocoai/nanoclaw/pull/2847), [#1087](https://github.com/nanocoai/nanoclaw/pull/1087), [#1921](https://github.com/nanocoai/nanoclaw/pull/1921), [#1648](https://github.com/nanocoai/nanoclaw/pull/1648), [#1594](https://github.com/nanocoai/nanoclaw/pull/1594), [#1517](https://github.com/nanocoai/nanoclaw/pull/1517), [#352](https://github.com/nanocoai/nanoclaw/pull/352)*

Today’s merges **solidify multi-channel support** (Telegram, Discord, WeChat, Teams) and **resolve a long-standing WhatsApp LID group delivery bug** with four complementary fixes. Remote MCP servers (HTTP/SSE) are now supported, and two new MCP skill servers (ffmpeg, yt-dlp) are available in-tree.

---

## 4. Community Hot Topics
Despite the high PR volume, discussion remains quiet — both open issues and open PRs carry **zero comments** today. The most notable activity is in the **core-team open PRs**, which indicate focused work:

- **[PR #3092 – feat: support remote Streamable HTTP MCP servers](https://github.com/nanocoai/nanoclaw/pull/3092)** – Extends the remote MCP support from #2847 with streaming. Underlying need: agents that can connect to cloud-hosted MCP services.
- **[PR #3088 – feat(ncl): surface unknown-sender holds in `ncl approvals list`](https://github.com/nanocoai/nanoclaw/pull/3088)** – Improves CLI visibility into pending sender approvals. Underlying need: operator tooling for approval workflows.
- **[PR #3094 – fix(telegram): retry transient bot identity lookup](https://github.com/nanocoai/nanoclaw/pull/3094)** – Reliability improvement for Telegram channel.
- **[PR #3093 – fix(chat): keep typing active for processing turns](https://github.com/nanocoai/nanoclaw/pull/3093)** – UX polish for chat interface.
- **[PR #3090 – fix(templates): prepend all top-level context Markdown](https://github.com/nanocoai/nanoclaw/pull/3090)** – Template rendering fix.

The two filed feature requests (#3091, #3089) have not yet attracted community discussion but signal grassroots interest.

---

## 5. Bugs & Stability
**High priority** – WhatsApp group delivery in LID-mode groups. Multiple fixes merged today (PRs #3038, #3008, #2870, #2688) finally address a bug that caused sent messages to be acknowledged by the server but never appear to group members. The root cause (incorrect JID translation in `cachedGroupMetadata`) is now resolved, significantly improving reliability for WhatsApp users.

**Medium priority** – Open fix PRs targeting edge-case glitches:
- Telegram bot identity lookup retry ([#3094](https://github.com/nanocoai/nanoclaw/pull/3094))
- Chat typing indicator for multi-turn processing ([#3093](https://github.com/nanocoai/nanoclaw/pull/3093))
- Missing top-level context in templates ([#3090](https://github.com/nanocoai/nanoclaw/pull/3090))

**Low priority / no new reports** – No crash or regression issues filed today.

---

## 6. Feature Requests & Roadmap Signals
Two new feature requests were opened:

- **[Issue #3091 – Feature request: standardize composable host extension hooks for skills (hosthooks)](https://github.com/nanocoai/nanoclaw/issues/3091)** – Users are asking for a formal hook system so community skills can interact with the host (router, container-runner, etc.) without string-patching core sources. This addresses a friction point as the skill ecosystem grows. **Likely roadmap**: could be adopted in a future release if maintainers see value in plugin-like architecture.

- **[Issue #3089 – Feature request: agent-driven skill learning, let NanoClaw create and refine its own skills from experience](https://github.com/nanocoai/nanoclaw/issues/3089)** – The agent would self-discover repetitive task patterns and generate skill files autonomously. This is a more ambitious, forward-looking feature. **Unlikely in near term**, but aligns with the project’s AI-agent ethos.

Combined with today’s merged PRs (remote MCP, multi-channel, media tools), the **near-term roadmap** appears focused on:
- Expanding MCP capabilities (remote, streaming, media)
- Finalizing multi-channel support (Telegram, Discord, WeChat, Teams all now merged)

---

## 7. User Feedback Summary
No explicit user comments are recorded today, but pain points and use cases are inferred from activity:

- **Pain point**: WhatsApp group messaging in LID-mode was broken for weeks. Multiple users submitted fixes (PRs by caburi00, gfnord, elancode, mcaldas) demonstrating real impact. Today’s merges should satisfy affected users.
- **Use case**: Community members are actively building channel integrations (Discord, Teams, WeChat, Telegram). The volume of skill PRs suggests strong demand for multi-platform presence.
- **Satisfaction**: The number of merged PRs (~15) indicates effective collaboration and responsive maintainers. Zero stale issues suggest no unresolved critical complaints.
- **Dissatisfaction potential**: The host hooks request (#3091) points to frustration with current hacky skill integration. If unaddressed, could deter skill developers.

---

## 8. Backlog Watch
No long-unanswered issues or PRs are currently identified. All open items are less than 24 hours old. However, the following older PRs were closed today after being open for weeks:
- **PR #352** (Telegram as default, open since February) – now closed, likely superseded by newer Telegram implementation.
- **PR #1087** (Telegram channel) – merged after 4 months.

This suggests the maintainers are actively clearing the backlog. No item demands immediate attention, but maintainers should monitor the two new feature requests (#3091, #3089) for community traction in the coming days.

---

**Project Health Score**: **High** – Strong contributor activity, critical bugs fixed, multi-channel foundation complete, and no pressing unresolved issues. Focus now shifts to stability polish and extending MCP/approval tooling.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-07-20

## 1. Today's Overview

IronClaw saw extremely high activity over the past 24 hours, with **50 pull requests updated** (29 merged/closed) and **7 open issues** all receiving updates. The project is in a rapid refactoring phase centered on the “reborn” architecture: multiple large-scale refactors (feature-flag cleanup, capability-result collapse, turn-state storage consolidation) landed on `main` today. At the same time, three user-facing bugs were reported—two around confusing chat error banners and a PDF MIME-type validation error—with fix PRs already opened. Overall project health is strong, with core team pushing through blocking technical debt while responding quickly to community-reported issues.

## 2. Releases

No new releases were published today.

## 3. Project Progress

The following major changes were **merged/closed** in the last 24 hours (representing the bulk of landed work):

- **`#6299` – Capability-result collapse (Slice C)** – Merged the stacked refactor that collapses `CapabilityOutcome` / mirror DTOs into `host_api::Resolution`, deleting redundant abstractions. ([PR #6299](https://github.com/nearai/ironclaw/pull/6299))
- **`#6296` – Delete 14 compile-time features, un-gate ~1,100 `#[cfg]` sites** – Phase 1 of feature cleanup: 38 features → 24, with 184 files touched (+767 / −2,424). Storage backends (libsql/postgres) deliberately left for later. ([PR #6296](https://github.com/nearai/ironclaw/pull/6296))
- **`#6271` – Resume replay payload host-side via ReplayPayloadStore** – Stage 2a-i of the capability-result collapse, wiring real durable stores in production. ([PR #6271](https://github.com/nearai/ironclaw/pull/6271))
- **`#6295` – Crash-consistency chaos suite + two defect fixes** – Phase 0 of turn-state consolidation (#6263), adds an acceptance oracle for async write-behind and fixes two crash-recovery bugs it uncovered. ([PR #6295](https://github.com/nearai/ironclaw/pull/6295))
- **`#6304` – Fix fingerprint credential setup in auth-gate record key** – Follow-up fix for a bug that landed when #6299 was merged before a review finding was applied. ([PR #6304](https://github.com/nearai/ironclaw/pull/6304))

Several open PRs continue important work (e.g., `#6303` auth-gate fingerprint fix, `#6298` async write-behind durability, `#6300` provider_factory re-threading), indicating the refactoring pipeline is still running.

## 4. Community Hot Topics

The issues with the most discussion and attention are all related to user-facing bugs and radical internal improvements:

- **`#6263` (9 comments)** – [InMemoryTurnStateStore retirement](https://github.com/nearai/ironclaw/issues/6263) – The last block of the `InMemory*Store` ratchet. This is a core infra refactoring that has generated significant developer discussion about crash-consistency and the async write-behind mode.
- **`#6189` (3 comments) / `#6190` (3 comments)** – [Stream retry leaves false error](https://github.com/nearai/ironclaw/issues/6189) and [Multiple conflicting error messages](https://github.com/nearai/ironclaw/issues/6190) – Both are bug_bash_P2 items causing user confusion. They have attracted fix PRs (`#6301`, `#6302`) from the `ironloopai[bot]` suggesting automated or community-driven fixes.
- **`#6274` (2 comments)** – [Finish DeploymentConfig](https://github.com/nearai/ironclaw/issues/6274) – A core architecture task to complete the composition config, indicating the project is closing this slice.
- **`#6284`** – [Error-recoverability endgame](https://github.com/nearai/ironclaw/issues/6284) – Defines a new recoverability contract; no comments yet but it’s a roadmap signal for imminent work.

The lack of user reactions (👍 all zero) suggests the community is not heavily voting, but the bug reports indicate active real-world usage.

## 5. Bugs & Stability

Three distinct bugs were reported or moved today, ranked by user impact:

| Severity | Issue | Description | Fix Status |
|----------|-------|-------------|------------|
| **High** | [#6257](https://github.com/nearai/ironclaw/issues/6257) / [#6290](https://github.com/nearai/ironclaw/issues/6290) | `Invalid value (attachments.mime_type)` error when sending/generating PDF files. Duplicate reports from same user (Michael Kelly). Blocks PDF workflow entirely. | No fix PR yet; investigation ongoing. |
| **High** | [#6189](https://github.com/nearai/ironclaw/issues/6189) | Retryable stream error (`Replay unavailable`) shown after successful completion, causing confusion. | Fix PR [#6302](https://github.com/nearai/ironclaw/pull/6302) open – treats final reply as success. |
| **Medium** | [#6190](https://github.com/nearai/ironclaw/issues/6190) | Multiple conflicting error banners (stream error + model context limit) shown for a single failed request. | Fix PR [#6301](https://github.com/nearai/ironclaw/pull/6301) open – consolidates errors per run. |

Additionally, the crash-consistency chaos suite (#6295) fixed two internal defects found during refactoring, improving overall runtime stability.

## 6. Feature Requests & Roadmap Signals

Several PRs and issues point toward the next minor release’s likely contents:

- **User onboarding UX** – PR [#6297](https://github.com/nearai/ironclaw/pull/6297) introduces an “onboard launcher” that automates setup, serves a Web UI, and auto-opens the browser. Combined with PR [#6289](https://github.com/nearai/ironclaw/pull/6289) (REPL thinking spinner + markdown rendering), the next version will likely have a polished new-user experience.
- **Turn-state durability** – Issue [#6263](https://github.com/nearai/ironclaw/issues/6263) and PR [#6298](https://github.com/nearai/ironclaw/pull/6298) (async write-behind) are clear roadmap items; after the crash-consistency oracle lands, the `InMemoryTurnStateStore` can be retired in production.
- **Error-recoverability endgame** – Issue [#6284](https://github.com/nearai/ironclaw/issues/6284) defines a new contract that every mid-run error must survive and be visible to the model. This will likely be the next major stability goal.

No new external feature requests were filed today; the focus remains on internal architecture simplification.

## 7. User Feedback Summary

Real user pain points surfaced in three reports:

- **PDF file handling** – Michael Kelly (via Slack `#x-ai-product-feedback`) reported that sending or generating PDFs causes an `Invalid value (attachments.mime_type)` error. This appears to be a regression or missing MIME handling for PDFs, possibly related to reading the file path.
- **Confusing error banners** – Two distinct reports (#6189, #6190) describe a bad UX where completed responses are shown alongside red error banners or where multiple error messages overlap. Users cannot determine whether their request succeeded.
- **False stream errors** – Even when a response completes, the chat displays “The chat stream hit a retryable error: Replay unavailable.” This undermines trust in the system.

No explicit positive feedback or satisfaction data is present in the GitHub data, but the rapid response with fix PRs indicates the team values these reports.

## 8. Backlog Watch

The following issues and PRs have been open for **extended periods** and may need maintainer attention:

- **`#4032`** – [Bump wasm group (wit-component, wit-parser)](https://github.com/nearai/ironclaw/pull/4032) – Open since **2026-05-25** (almost 2 months). A dependency update PR for the WASM toolchain. Rebasing may be needed.
- **`#5598`** – [Release PR](https://github.com/nearai/ironclaw/pull/5598) – Open since **2026-07-03** (17 days). This automated release PR is a candidate for the next version if the current refactoring wave settles.
- **`#5664`** – [Bump actions group with 16 updates](https://github.com/nearai/ironclaw/pull/5664) – Open since **2026-07-05** (15 days). A large CI dependency bump; may have merge conflicts with the CI changes in #6188.
- **`#6188`** – [Make release workflow Reborn compile-only](https://github.com/nearai/ironclaw/pull/6188) – Open since **2026-07-17** (3 days). Still open despite being “size: S, risk: medium”; it may be blocked by other refactoring PRs.

No long-unanswered community issues were identified; all issues filed today and earlier this week have received at least one comment or fix PR.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI Project Digest – 2026-07-20

## 1. Today's Overview
The project is in a **low-activity state**, with no new code merges, releases, or fresh issues/PRs in the past 24 hours. Three issues and three pull requests were updated yesterday (all of which are *stale*, last touched on 2026-07-19, created around 2026-04-02). One long-standing bug has been closed (#1352), but two open bugs and a feature request remain untouched. Maintenance work (dependency bumps) has stalled, and no maintainer responses have been posted for weeks. The project appears to be in a quiet phase, possibly awaiting maintainer bandwidth or community contributions.

## 2. Releases
No new releases were published. The latest release history shows no entries.

## 3. Project Progress
- **No PRs were merged or closed today** (the only closed PR, #1350, was already closed on an earlier date, last updated 2026-07-19).  
- The three PRs updated recently are all stale dependency bumps (concurrently, tailwindcss) and a closed skills-generation bug report (#1350). No feature advancements or bug fixes have landed in the codebase.

## 4. Community Hot Topics
The most active items (by comments) are:

- **#1352 – [CLOSED] “任务对话框，任务运行中，附件无法上传”**  
  *2 comments* | 👎 0  
  URL: [Issue #1352](https://github.com/netease-youdao/LobsterAI/issues/1352)  
  A user reported that attachments cannot be uploaded while a task dialog is running. Closed as stale; no resolution was documented.

- **#1287 – [OPEN] “[bug]设置-IM机器人对popo进行连通性测试时，appkey、appsecret、aes key全填1也能测试连接通过”**  
  *1 comment* | 👎 0  
  URL: [Issue #1287](https://github.com/netease-youdao/LobsterAI/issues/1287)  
  A security / validation bug: the IM bot connectivity test accepts dummy credentials (all “1”) as valid. No maintainer response or fix PR has been linked.

- **#1289 – [OPEN] “feat: 为长代码块添加折叠/展开功能”**  
  *1 comment* | 👎 0  
  URL: [Issue #1289](https://github.com/netease-youdao/LobsterAI/issues/1289)  
  A feature request to add collapsible long code blocks (15–200 lines) in the chat UI. The proposal is detailed (with line/character limits already existing for >200 lines). Community interest appears moderate.

**Underlying need**: Users are experiencing UI/UX friction (unresponsive upload, false validation, poor readability of long code blocks) and are calling for quality-of-life improvements. The lack of maintainer responses may frustrate early adopters.

## 5. Bugs & Stability
- **#1287 – [OPEN] Critical / Security**  
  IM bot connectivity test passes with dummy credentials. This is a **false‑positive validation** that could lead to misconfigured integrations. No fix PR exists.

- **#1352 – [CLOSED] Moderate / UX**  
  Attachment upload broken during task execution. Closed as stale without a documented fix – the bug may still persist in active code.

- **#1350 – [CLOSED] Moderate / UX**  
  Skills generation stalls with no progress indication, and the model misinterprets the same prompt compared to another platform. Closed; resolution unknown.

**Severity ranking**: #1287 (high – security/integration reliability) > #1352 (medium – functional UI) > #1350 (medium – user experience). All lack a confirmed fix.

## 6. Feature Requests & Roadmap Signals
- **#1289 – Code block folding** (still open, no maintainer comment)  
  This is the only explicit feature request updated in the last 24h. It has a well‑thought‑out implementation plan (line/character limit thresholds, auto‑collapse). Given the existing codebase already has a 200‑line limit, adding an intermediate fold would be a natural incremental improvement. **Prediction**: If maintainers resume active development, this feature is likely to appear in the next minor release (v0.x) because it directly improves the core chat experience.

No other roadmap signals (e.g., milestones, breaking changes, RFCs) are visible.

## 7. User Feedback Summary
- **Pain point #1**: Unreliable task UI – users cannot upload files during task execution (#1352).  
- **Pain point #2**: False‑positive IM validation leads to confusion and potential misconfiguration (#1287).  
- **Pain point #3**: Long AI‑generated code blocks force excessive scrolling; users want fold/expand (#1289).  
- **Pain point #4**: Skills generation is opaque and slow – no feedback during long operations, and the same prompt yields inconsistent results compared to other platforms (#1350).  

**Satisfaction**: No positive feedback noted; the community’s silence (lack of further comments) may indicate either low engagement or acceptance of the staleness.

## 8. Backlog Watch
The following items are **stale** (last updated 2026-07-19, created 2026-04-02) and still **open** – needing maintainer attention:

| Issue/PR | Type | Summary | Link |
|----------|------|---------|------|
| **#1287** | Bug (Open) | IM bot connectivity test accepts bogus keys | [Issue #1287](https://github.com/netease-youdao/LobsterAI/issues/1287) |
| **#1289** | Feature (Open) | Add code block collapse/expand | [Issue #1289](https://github.com/netease-youdao/LobsterAI/issues/1289) |
| **#1285** | Dependabot PR (Open) | Bump concurrently to 9.2.1 | [PR #1285](https://github.com/netease-youdao/LobsterAI/pull/1285) |
| **#1286** | Dependabot PR (Open) | Bump tailwindcss to 4.2.2 (breaking change from v3) | [PR #1286](https://github.com/netease-youdao/LobsterAI/pull/1286) |

All four have been open for **over 100 days** with zero maintainer responses. The pending dependency upgrades (especially tailwindcss v3→v4, a major version bump) could cause breaking changes if merged without migration audit. The project may be at risk of accumulating technical debt if these are left unresolved.

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

## Moltis Project Digest – 2026-07-20

### 1. Today's Overview
The Moltis project recorded **no new issues or pull requests** in the last 24 hours, indicating a quiet period with no active community contributions or bug reports. A single new release (`20260719.01`) was published, but its detailed changelog is not provided. Overall project activity this day is very low, which may reflect a stable phase or a lull in development; maintainer attention is not urgently required based on available data.

---

### 2. Releases
- **New Version**: [`20260719.01`](https://github.com/moltis-org/moltis/releases/tag/20260719.01) (published 2026-07-19)
  - No release notes, migration guides, or breaking changes were documented. The version number follows a date-based scheme (`YYYYMMDD.xx`), likely representing a nightly or automated build.
  - **Assessment**: Without changelog details, users should expect incremental improvements or bug fixes. No known breaking changes are signaled.

---

### 3. Project Progress
- **Merged/Closed PRs Today**: None.
- **Features fixed or advanced**: No changes were merged in the last 24 hours.

---

### 4. Community Hot Topics
- **Most active Issues/PRs**: None (0 issues, 0 PRs updated today).
- **Community needs**: No discussions or reactions to analyze. The absence of activity may indicate that users are either satisfied or not encountering new problems.

---

### 5. Bugs & Stability
- **New bug reports**: 0.
- **Regressions or crashes**: None reported.
- **Severity ranking**: No issues to rank. The project appears stable or lacking recent user testing.

---

### 6. Feature Requests & Roadmap Signals
- **User-requested features**: None filed today.
- **Prediction for next version**: Without any feature requests or developer signals, no near-term additions can be anticipated. Future releases likely focus on maintenance or undocumented improvements.

---

### 7. User Feedback Summary
- **Pain points / use cases**: No user feedback was captured in the last 24 hours.
- **Satisfaction**: Cannot be determined from available data. The lack of complaints might imply a stable experience, but it could equally indicate low engagement.

---

### 8. Backlog Watch
- **Long-unanswered issues/PRs**: None currently tracked. The project has zero open or pending items, suggesting a clean slate with no maintainer backlog.

---

*Generated from GitHub data for [`moltis-org/moltis`](https://github.com/moltis-org/moltis).*

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

Based on the GitHub data provided, here is the project digest for CoPaw.

***

### CoPaw Project Digest – 2026-07-20

#### 1. Today's Overview
Project activity remains high with 16 issues and 18 PRs updated in the last 24 hours, indicating a healthy and engaged contributor base. The development focus is split between stability fixes (context overflow, file path crashes, subprocess management) and performance enhancements (parallel driver initialization). While there is a strong influx of community bug reports involving edge cases and usability (e.g., Linux zoom, file preview in offline mode), core contributors are actively merging fixes, suggesting a resilient maintenance cadence. No new releases were cut today, but a version bump PR (v2.0.1b1) has been merged, signaling a likely release in the near future.

#### 2. Releases
**None.** No new releases were published in the last 24 hours.

#### 3. Project Progress
Four PRs were merged or closed today, primarily focused on bug fixes and release preparation.
- **[MERGED] fix(memoryspace): catch OSError in `_saved_tool_refs` is_file() check (#6247)**  
  A fix for a crash (`OSError: [Errno 36] File name too long`) when recalling history with large tool results. This resolves the root cause identified in issue #6246.
- **[MERGED] chore: bump version to 2.0.1b1 (#6266)**  
  A version bump to `2.0.1b1` has been prepared for the next beta release.
- **Two closed issues with non-PR fixes:**
  - **[CLOSED] Issue #6255** – A `BadRequestError` related to an invalid parameter.
  - **[CLOSED] Issue #6250** – The sandbox fallback action is being made configurable via a newly opened PR (#6256).

#### 4. Community Hot Topics
- **[HOT] MCP Driver Startup Performance (#6193)**  
  *Link: [Issue #6193](https://github.com/agentscope-ai/CoPaw/issues/6193)*  
  (4 comments, 0 👍)  
  This issue highlights a significant performance bottleneck where 8 MCP drivers initialized serially took ~40 seconds, compared to ~5 seconds in parallel. The underlying need is for a snappier initial boot experience, especially for users with complex multi-MCP setups. A parallelization PR (#6238) is already open and being reviewed.
- **[HOT] Agent Repeating Output and `memory_search` Infinite Loop (#6241)**  
  *Link: [Issue #6241](https://github.com/agentscope-ai/CoPaw/issues/6241)*  
  (2 comments, 0 👍)  
  This bug reports a critical agent loop failure where the agent repeatedly outputs the same text, and the `memory_search` tool gets stuck in an infinite loop. Community users are calling for a robust "repetition detection" mechanism at the framework level, rather than just a warning.
- **[HOT] Parallelizing MCP Driver Handlers (#6238)**  
  *Link: [PR #6238](https://github.com/agentscope-ai/CoPaw/pull/6238)*  
  (0 comments, 0 👍)  
  This PR, authored by `wananing`, directly addresses the performance issue in #6193 by initializing handlers concurrently with a concurrency limit of eight. Its presence shows the community is actively contributing solutions for performance regressions.

#### 5. Bugs & Stability
**High Severity (Active/Unresolved):**
- **Agent Repetition Lock & Infinite Loop (#6241):** A high-severity correctness bug. The agent can enter a state of repeated output and infinite memory search calls. No fix PR is linked yet.
- **Windows PATH Concatenation Dropping Separator (#6239):** A mid-severity platform-specific bug. The Windows backend omits the `;` between user and machine PATH segments, causing child processes to lose npm (and other) global commands.
- **OpenAI Max Tokens Configuration Not Applied (#6258):** Users report that the `max_output_tokens` setting is not being sent to OpenAI-compatible models.

**Medium/Low Severity (Often with Fix PRs):**
- **Context Overflow Crash in Scroll (#6267):** A fix PR is open to add a retry mechanism after a context overflow error, forcing a compaction to recover gracefully.
- **Deadline Offload Kills Subprocess (#6248):** A fix PR distinguishes between a user cancel (kill) and a deadline offload (keep alive), meaning subprocesses are no longer terminated on simple timeouts.
- **Linux Viewport Zoom Not Working (#6252):** A UI/UX bug for Linux Tauri desktop users where `Ctrl+` zoom shortcuts don't work.
- **File Preview Broken in Offline Code Mode (#6261):** A feature regression where file previewing fails without an internet connection.
- **Embedding Dimensions Not Sent to API (#6242):** A configuration binding bug where the "use_dimensions" switch is not exposed in the console. A fix PR (#6243) is open.

#### 6. Feature Requests & Roadmap Signals
- **Reusable Workflow Orchestration (#6163):** A high-demand feature request to define multi-step, auditable workflows using existing agent and cron primitives. This signals a move towards more structured, enterprise-grade automation.
- **Per-Agent Auto-Memory Profiles (#6263):** Users are asking for granularity in memory management, wanting different memory formats for companion agents (diary-style) vs. technical agents (topic-oriented). This is a strong indicator that the multi-agent ecosystem is maturing.
- **Minimize to System Tray (#6264):** A frequent quality-of-life request for desktop users. While minor, it reduces friction for long-running agent sessions.
- **Next Version Prediction:** Given the merged version bump PR and the high volume of merged fixes (especially the memory crash and version bump), a **v2.0.1b1 release** is imminent. This release is likely to include the scroll overflow recovery, the OSError fix, and the sandbox config additions.

#### 7. User Feedback Summary
- **Pain Point: Visual Noise in Results:** User `azear` (#6260) provides clear feedback that tool calls and thinking blocks "occupy the entire screen" and obscure the final result. They request collapsible sections, a feature seen in competing tools.
- **Pain Point: Cold Start Performance:** User `zsrmoyanzsr` (#6193) identified an 8x performance improvement opportunity, reflecting a general desire for faster application startup, especially for power users.
- **Satisfaction Signals:** The prompt merging of community-contributed bug fix PRs (e.g., #6247 from `zealonexp`) and the acceptance of first-time contributor PRs (#6259, #6243) indicate a project that is successfully fostering community contribution and trust.
- **Dissatisfaction Signal:** The existence of long-standing configuration loops (#6241) and non-functional settings (#6258) can erode user trust in the stability of core agent behaviors.

#### 8. Backlog Watch
- **[OPEN] Refactor ACP Module (#5796)**  
  *Link: [PR #5796](https://github.com/agentscope-ai/CoPaw/pull/5796)*  
  *Created: 2026-07-06 | Status: Under Review*  
  This large, structural refactor has been "Under Review" for two weeks. It aims to decouple slash commands, extract safety checks, and unify the bootstrap process. A decision (merge or close) is needed to prevent drift and manage technical debt.
- **[OPEN] Desktop Backend Graceful Shutdown (#6225)**  
  *Link: [PR #6225](https://github.com/agentscope-ai/CoPaw/pull/6225)*  
  *Created: 2026-07-17*  
  This PR addresses a stability issue where the Tauri shell forcefully kills the Python backend, risking data loss or corrupted state. It's been open for 3 days without reviewer comments. Given its importance for desktop stability, it warrants a review.

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