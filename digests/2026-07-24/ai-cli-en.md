# AI CLI Tools Community Digest 2026-07-24

> Generated: 2026-07-24 02:57 UTC | Tools covered: 7

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [GitHub Copilot CLI](https://github.com/github/copilot-cli)
- [Kimi Code CLI](https://github.com/MoonshotAI/kimi-cli)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Qwen Code](https://github.com/QwenLM/qwen-code)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## Cross-Tool Comparison

# AI CLI Tools Cross-Tool Comparison Report – 2026-07-24

## 1. Ecosystem Overview

The AI CLI developer tools ecosystem continues to mature rapidly, with six major tools showing distinct trajectories. **Network reliability and session stability** remain the dominant cross-cutting concern—every tool reports connection-drop, hang, or recovery issues. **Plugin/MCP ecosystem expansion** is accelerating, but integration reliability (tool exposure failures, initialization bugs) lags behind user demand. **Windows support** remains a consistent pain point across all tools except those built on Rust, while **context management** (compaction, token limits, session bloat) is emerging as the next frontier for agent workflow reliability. The ecosystem is bifurcating between tools optimized for **interactive development** (Claude Code, Copilot CLI) and those pushing toward **autonomous agent workflows** (OpenAI Codex, Gemini CLI, OpenCode).

---

## 2. Activity Comparison

| Tool | Hot Issues (noteworthy) | Key PRs (meaningful) | Release Status | Dominant Theme |
|---|---|---|---|---|
| **Claude Code** | 10 | 4 (2 merged, 2 open) | No release | Billing/network bugs dominate; MCP & IDE ergonomics requested |
| **OpenAI Codex** | 10 | 10 (all open, feature-focused) | 2 alpha releases (v0.146.0) | Windows stability crisis; WebSocket & proxy infrastructure build-out |
| **Gemini CLI** | 10 | 10 (7 merged, 3 open) | No release | Agent loop hangs; security fixes merged; "Antigravity" pipeline emerging |
| **Copilot CLI** | 10 | 2 (0 meaningful) | **v1.0.74** shipped | Session bloat critical bug; MCP spec support delivered |
| **Kimi Code CLI** | 6 | **15** (10 meaningful) | No release | Massive bug-fix wave: MCP, Windows, shell completion, hooks |
| **OpenCode** | 10 | 10 (all feature/API migration) | No release | Model auto-discovery surge; 2.0 API migration wave by core contributor |
| **Qwen Code** | 10 | 10 (feature + perf fixes) | **Nightly** (v0.20.1) | Update-check failures; ACP performance optimization; channel integrations |

**Key observations:**
- **Kimi Code CLI** had the highest code-change velocity (15 PRs in 24h), all fixes.
- **OpenAI Codex** is the most active in infrastructure modernization (WebSocket, proxy, Guardian).
- **Gemini CLI** merged 7 PRs (highest merge rate), focusing on security and agent-loop resilience.
- **Copilot CLI** shipped a release but had zero substantive community PRs—development appears internal.
- **Claude Code** had the most community frustration (ECONNRESET, Fable 5 billing bug, 50+ comment threads).

---

## 3. Shared Feature Directions

### MCP / Plugin Ecosystem Expansion (All Tools)
- **Session-level identifiers** – Claude Code (#41836), Kimi Code (#2548), Copilot CLI (#3125) all need per-session MCP routing
- **Tool exposition reliability** – Copilot CLI (#4089: Atlassian MCP exposes zero tools), Qwen Code (#7147: tool listing times out)
- **Shared process pooling** – OpenAI Codex (#20883), Kimi Code (#2538) request MCP servers shared across sessions, not per-chat

### Remote Session Control (4 of 7 Tools)
- Claude Code (#29006, 👍114): Control CLI from Desktop app
- Kimi Code (#1282, 👍16): Continue sessions from phone/tablet/browser
- OpenCode (#33163): Mobile companion for monitoring terminal output
- Copilot CLI (#4143): Inherit MCP tools from VS Code instance

### Windows Support (5 of 7 Tools)
- Claude Code: ECONNRESET macOS (#5674), WSL disconnections (#69415), duplicate TUI rendering (#49985)
- OpenAI Codex: 7 performance bugs in top 10—UI stuttering, taskkill storms, WMI exhaustion (#20214, #34260)
- Gemini CLI: No specific issues but shell completion fixes (PR #2549)
- OpenCode: `@` file references fail (#29859), file tree expansion broken (#36743)
- Qwen Code: No explicit Windows issues (likely Node.js cross-platform)

### Context / Session Management (6 of 7 Tools)
- Copilot CLI: Deleted binaries bloat session past CAPI 5 MB limit (#4097, critical)
- OpenAI Codex: Auto-compaction leaves context ~80% full (#35032)
- Claude Code: No `/compact` escape from bloated sessions
- Gemini CLI: "Invalid Argument" errors on context overflow (#22942)
- OpenCode: Conversations lost after sidebar collapse (#38572)
- Qwen Code: Status-line percentage doesn't refresh after `/compress` (#6806)

### Auto-Update / Versioning Pain (3 of 7 Tools)
- Qwen Code: Cluster of "registry error" failures (#7515, #7520, #7543) due to npm 12/mise
- Claude Code: Each session downloads full ~265 MB binary independently (#79942)
- Copilot CLI: Stale sessions running old binary post-update (#4199)

---

## 4. Differentiation Analysis

| Dimension | Claude Code | OpenAI Codex | Gemini CLI | Copilot CLI | Kimi Code | OpenCode | Qwen Code |
|---|---|---|---|---|---|---|---|
| **Core language** | TypeScript | Rust | Go/TypeScript? | Go | Python | TypeScript (Tauri?) | TypeScript (Node.js) |
| **Primary UX** | Terminal TUI | Desktop app + CLI | CLI | CLI (GitHub integration) | CLI + Desktop | Desktop + CLI | CLI + Web shell |
| **Target user** | Individual devs | Power/agent devs | GCP/enterprise devs | GitHub ecosystem | Chinese market, mobile-first | Open-source, local-first | Enterprise, Alibaba cloud |
| **Agent autonomy** | Medium | High (Guardian, subagents) | High (YOLO mode) | Medium | Low (interactive) | Medium-High | Medium |
| **MCP support** | Built-in | Built-in (exec-server) | Not primary | Plugin spec v1 | Plugin system | Built-in | Channel-based |
| **Windows quality** | Poor (TUI bugs) | Critical (WMI exhaustion) | Moderate | Moderate (resume hang) | Improving (UTF-8 fix) | Poor (@ ref fails) | Good (Node cross-platform) |
| **Release cadence** | Slow (no release today) | Fast (2 alphas/day) | Moderate | Moderate (v1.0.74) | Fast (15 PRs today) | Moderate (API migration) | Fast (nightly) |
| **Unique strength** | Session context | Autonomous safety (Guardian) | Git worktree isolation | GitHub integration | Mobile agent concepts | Model auto-discovery | Channel integrations |

**Key differentiators:**
- **OpenAI Codex** is the most ambitious in agent autonomy architecture—Guardian V2, WebSocket remote execution, subagent orchestration—but this complexity is causing Windows stability to collapse.
- **Gemini CLI** leans hardest into security (TOCTOU fixes, trust dialog disclosure) and agent-loop resilience (stagnation circuit breaker), reflecting Google's enterprise emphasis.
- **Copilot CLI** is the most conservative but most reliable in interactive use; its MCP plugin spec v1 support is a deliberate, well-scoped addition.
- **Kimi Code CLI** is rapidly closing quality gaps with a massive bug-fix sprint, positioning itself as a reliable multi-platform option.
- **OpenCode** excels at community engagement (187👍 on model auto-discovery) and is undergoing a major API migration for 2.0 readiness.
- **Qwen Code** is investing in enterprise integrations (ARMS telemetry, WeChat/Telegram channels) and cold-start performance, distinct from the Western-focused tools.

---

## 5. Community Momentum & Maturity

| Tool | Community Activity | Issue Resolution | Innovation Velocity | Maturity Level |
|---|---|---|---|---|
| **Claude Code** | **High** (50+ comment threads, 👍114 feature) | **Low** (ECONNRESET 1 year open, Fable 5 billing bug unresolved) | Low | **Mature but stalled** – Established user base frustrated by unresolved bugs |
| **OpenAI Codex** | **High** (75 comments on Windows stutter, 154👍 on auto-resolve) | **Medium** (alpha releases + PRs but critical bugs persist) | **High** (WebSocket, Guardian V2, proxy routing) | **Growing rapidly** – Most innovative but bleeding edge |
| **Gemini CLI** | **Medium** (31 comments on hang bug, 55👍 on editor vars) | **High** (7 PRs merged today, security fixes prioritized) | **Medium** (Antigravity pipeline, agent resilience) | **Maturing** – Stable core, security-conscious, enterprise-ready |
| **Copilot CLI** | **Medium** (12 comments on session bloat, 5👍 on tool inheritance) | **Medium** (v1.0.74 shipped, critical bugs remain open) | **Low** (2 PRs, 0 substantive) | **Stable** – GitHub ecosystem lock-in, internal development |
| **Kimi Code CLI** | **Low** (16👍 top issue, mostly 0 comment issues) | **Very High** (15 PRs, all fixes, rapid iteration) | **High** (rapid quality improvements) | **Emerging** – Smaller community but aggressive improvement |
| **OpenCode** | **Medium** (187👍 on model discovery, 30 comments) | **Medium** (API migration PRs, 2.0 bugs persist) | **Medium** (Kimi OAuth, roll-call command) | **Growing** – Strong open-source community, 2.0 transition |
| **Qwen Code** | **Medium** (7 comments on prompt reprocessing, cluster of update bugs) | **Medium** (nightly releases, active PRs) | **High** (channels, ACP perf, Java SDK) | **Maturing** – Enterprise features advancing, community smaller |

**Takeaway:** No tool has both high community activity and high issue resolution—users are frustrated everywhere. OpenAI Codex and Kimi Code CLI show the highest velocity of PR merges, suggesting teams actively responding. Claude Code has the most engagement but the least progress on long-standing issues.

---

## 6. Trend Signals

### 1. The "MCP Integration Tax" is Real
Every tool that adopts plugin/MCP architectures is hit by reliability regressions—tool exposition failures, session multiplexing gaps, initialization deadlocks. **The industry is learning that plugin ecosystems require deep runtime investment** beyond just defining a spec.

### 2. Windows is the New Linux Pain Point
Five years ago, "Linux support" was the cry. Today, **Windows stability is the #1 platform blocker** for three of seven tools. OpenAI Codex's WMI exhaustion (7 bugs in top 10) and Claude Code's TUI regressions signal a market failure to deliver parity.
*Recommendation:* Any tool targeting enterprise developers must prioritize Windows or explicitly limit to macOS/Linux.

### 3. Session Bloat is the Next Token Limit Crisis
As agents become autonomous (long-running tasks, multi-turn conversations), **unbounded session growth** is hitting hard limits: Copilot CLI's 5 MB CAPI cap, OpenAI Codex's 80% compaction floor, Claude Code's no-recovery session state. Tools need **intelligent context management** (selective summarization, checkpointing, graceful degradation) to sustain long-running agents.

### 4. Remote Control is Becoming Table Stakes
Four tools independently arrived at the same feature request: **session persistence across devices**. This signals a fundamental shift from "terminal tool you babysit" to "agent you delegate and monitor." The ability to approve tool calls from a phone or browser while code runs headless is the new UX expectation.

### 5. Financial AI Agents are Emerging
Kimi Code's discussion on A-share quantitative trading (#2555) and Qwen Code's enterprise channel integrations suggest **domain-specific agent deployments** are moving beyond code generation. Expect features for financial data pipelines, real-time market monitoring, and regulatory compliance hooks.

### 6. Open-Source Model Auto-Discovery is Overdue
OpenCode's #6231 (187👍) for auto-discovering local models from LM Studio/Ollama reflects a **growing user base that wants to BYO model without config**. As local LLMs improve, tools that offer friction-free model switching will win mindshare.

### 7. The "Quiet Quitting" of Interactive Workflows
Multiple issues describe **agents hanging without feedback** ("This is taking a bit longer," blinking spinners, loading loops). Users are increasingly willing to tolerate delays but not ambiguity. **Transparent agent state** (thinking vs. stuck vs. waiting) is becoming a UX requirement, not a nice-to-have.

---

**Bottom line for technical decision-makers:** 
- **For reliability today:** Copilot CLI (stable, limited scope) or Gemini CLI (security-conscious, agent-loop fixes)
- **For innovation potential:** OpenAI Codex (WebSocket, Guardian, but Windows-critical) or Kimi Code CLI (rapid improvement, mobile-first mindset)
- **For open-source community:** OpenCode (model auto-discovery, API migration) or Claude Code (largest community, but unresolved pain)
- **For enterprise with Alibaba/GCP ties:** Qwen Code (channels, ARMS telemetry) or Gemini CLI (enterprise security, GCP deployment scripts)

The ecosystem is converging on MCP/plugin support, remote session control, and Windows parity—but **no tool has solved all three yet**.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report

*Data from github.com/anthropics/skills, snapshot 2026-07-24*

---

## 1. Top Skills Ranking

The following PRs received the highest community discussion volume. They represent both new Skill submissions and critical fixes to the Skill development toolchain.

| Rank | PR | Skill / Focus | Discussion Highlights | Status |
|------|----|---------------|-----------------------|--------|
| 1 | [#1298](https://github.com/anthropics/skills/pull/1298) | **fix(skill-creator): run_eval recall 0%** – repairs the evaluation pipeline so the description-optimisation loop no longer optimizes against noise. Touches Windows stream reading, trigger detection, and parallel workers. | Core blocker for anyone using the official skill-creator meta-skill. Multiple independent reproductions (see #556). | Open |
| 2 | [#514](https://github.com/anthropics/skills/pull/514) | **document-typography** – prevents orphan words, widowed headings, and numbering misalignment in AI-generated documents. | Broad relevance: every Claude-generated document suffers these issues. High-quality, focused scope. | Open |
| 3 | [#486](https://github.com/anthropics/skills/pull/486) | **ODT skill** – creates, fills, reads, and converts OpenDocument Format files (.odt, .ods). Bridges LibreOffice and ISO-standard document workflows. | Community demand for non-Microsoft office formats. Discussion around template filling and HTML round-tripping. | Open |
| 4 | [#210](https://github.com/anthropics/skills/pull/210) | **frontend-design skill revision** – rewrites the existing skill for clarity and actionability; ensures every instruction is executable within a single conversation. | Addresses long-standing frustration with vague skill instructions. 22+ comments debating specificity vs. flexibility. | Open |
| 5 | [#83](https://github.com/anthropics/skills/pull/83) | **skill-quality-analyzer + skill-security-analyzer** – meta-skills that evaluate other skills across structure, documentation, security, and five quality dimensions. | Early meta-skill concept. Discussion focused on scoring methodology and false-positive rates. | Open |
| 6 | [#1367](https://github.com/anthropics/skills/pull/1367) | **self-audit (v1.3.0)** – a universal skill that mechanically verifies file outputs, then runs a four-dimension reasoning quality gate before delivery. | Novel “quality gate” paradigm. Mixed reception: powerful for rigor, concern about token overhead. | Open |
| 7 | [#723](https://github.com/anthropics/skills/pull/723) | **testing-patterns** – covers the full testing stack: philosophy (Trophy model), unit tests with AAA pattern, React Testing Library, Playwright e2e, and CI integration. | One of the most requested skill categories. Community aligned on breadth but asked for more language-agnostic examples. | Open |
| 8 | [#525](https://github.com/anthropics/skills/pull/525) | **pyxel skill** – retro game development using the Pyxel engine and its MCP server. Enables iterative game creation (write → run → capture → inspect). | Niche but enthusiastic reception. Author is the Pyxel creator (`kitao`), lending credibility. Discussion of MCP integration patterns. | Open |

**Notable runner-up:** [#1302 (color-expert)](https://github.com/anthropics/skills/pull/1302) – color naming systems, spaces, and palettes; received sustained discussion through July.

---

## 2. Community Demand Trends

From the top issues (sorted by comments), three clear demand vectors emerge:

| Demand | Key Issues | Sentiment |
|--------|------------|-----------|
| **🛡️ Security & Trust** | [#492](https://github.com/anthropics/skills/issues/492) – community skills under `anthropic/` namespace enable trust boundary abuse (43 comments, 2 👍). Discussion: need for sandboxing, explicit permission scopes, and an official Anthropic seal. | **High urgency** – the most commented issue. Tension between openness and safety. |
| **🔧 Skill-Creator Reliability** | [#556](https://github.com/anthropics/skills/issues/556) – `run_eval.py` 0% trigger rate (12 comments, 7 👍). [#1061](https://github.com/anthropics/skills/issues/1061) – Windows compatibility (3 comments). [#1169](https://github.com/anthropics/skills/issues/1169) – recall always 0%. | **Critical blocker** – the official skill-creation toolchain does not function correctly on Windows or even on Unix in many cases. Has spawned 5+ fix PRs (#1298, #1099, #1050, #362, #361). |
| **🧩 New Skill Directions** | [#412](https://github.com/anthropics/skills/issues/412) – agent-governance (safety patterns). [#1329](https://github.com/anthropics/skills/issues/1329) – compact-memory (symbolic agent state). [#1385](https://github.com/anthropics/skills/issues/1385) – reasoning quality gate pipeline. [#228](https://github.com/anthropics/skills/issues/228) – org-wide skill sharing (14 comments, 7 👍). | **Strong interest** in skills that manage AI behavior (governance, memory, quality gates) and in enterprise distribution infrastructure. |
| **📦 Distribution & Management** | [#189](https://github.com/anthropics/skills/issues/189) – duplicate skills from overlapping plugins (6 comments, 9 👍). [#62](https://github.com/anthropics/skills/issues/62) – skills disappearing after file rename. | **Usability friction** – skills are easy to lose or duplicate, especially in multi-plugin setups. |

---

## 3. High-Potential Pending Skills

These open PRs have active comment threads and address clearly articulated community needs. They are likely to merge in the near term.

- **[document-typography](https://github.com/anthropics/skills/pull/514)** (#514) – fixes a universal pain point in AI documents. Low code complexity, high impact. Maintainer active.
- **[testing-patterns](https://github.com/anthropics/skills/pull/723)** (#723) – fills a glaring gap in the skill collection. The author has engaged with feedback and updated examples.
- **[color-expert](https://github.com/anthropics/skills/pull/1302)** (#1302) – well-scoped, references authoritative sources (ISCC-NBS, Munsell, OKLCH). Recent updates suggest imminent merge.
- **[self-audit](https://github.com/anthropics/skills/pull/1367)** (#1367) – polarizing but innovative. The four-dimension reasoning audit is a novel contribution; mechanical verification portion is uncontroversial.
- **[SAP-RPT-1-OSS predictor](https://github.com/anthropics/skills/pull/181)** (#181) – enterprise-adjacent skill using SAP’s open source tabular model. Has been open since Dec 2025 with periodic updates.

Also notable: [#509 (CONTRIBUTING.md)](https://github.com/anthropics/skills/pull/509) is not a skill but a community health document that directly addresses the repo’s 25% GitHub community score. It has strong support and is expected to merge.

---

## 4. Skills Ecosystem Insight

**The community’s most concentrated demand at the Skills level is for reliable tooling to create, evaluate, and distribute skills themselves**, as evidenced by the fact that 7 of the top 20 PRs by comments are bug fixes to the skill-creator pipeline (run_eval, subprocess, YAML parsing, UTF-8 handling), while the most active issues (#492, #556, #228) center on security trust, broken evaluation, and organizational sharing — all foundational infrastructure rather than end-user skills content. This suggests the ecosystem is still maturing: contributors are investing heavily in the platform’s stability before shifting focus to skill breadth.

---

# Claude Code Community Digest – 2026-07-24

## Today’s Highlights

A major billing/config bug around Fable 5 on Max plans dominates community discussion, with three separate reports escalating from a silent downgrade to contradictory availability messages. Meanwhile, persistent `ECONNRESET` and “connection closed mid‑response” errors on macOS and Linux remain the most‑commented bug cluster, making large sessions unreliable for many users. On the PR side, two quality‑of‑life fixes landed for the repository’s own automation scripts.

## Releases

No new releases were published in the last 24 hours. The latest version remains at the most recent tag (no version bump today).

## Hot Issues (10 most noteworthy)

1. **[#5674 – Persistent ECONNRESET Errors on macOS Network Connections](https://github.com/anthropics/claude-code/issues/5674)**  
   *50 comments, 👍47*  
   A long‑standing bug on macOS that causes frequent connection resets, disconnecting tasks. The problem does not reproduce on Windows or Linux on the same network. Community frustration is high as the issue has been open for nearly a year.

2. **[#79337 – Fable 5 prompts ‘usage credits required’ on Max plan](https://github.com/anthropics/claude-code/issues/79337)**  
   *40 comments, 👍12*  
   Since July 20 – the day Fable 5 became standard on Max – users are silently downgraded to Opus 4.8 with a “usage credits” error. Multiple duplicates exist, indicating a widespread billing/entitlement bug.

3. **[#29006 – Enable Remote Control for Claude Code sessions in Claude Desktop](https://github.com/anthropics/claude-code/issues/29006)**  
   *35 comments, 👍114*  
   The most upvoted feature request this week. Users want to control CLI sessions (e.g., approve tool calls) from the Desktop app, enabling headless/remote workflows without always watching the terminal.

4. **[#69415 – API Error: Connection closed mid-response (VS Code / WSL)](https://github.com/anthropics/claude-code/issues/69415)**  
   *33 comments, 👍65*  
   Frequent mid‑response disconnections make Claude Code “unusable for any task” on Windows via WSL. Affected users have tried different networks, VPNs, and reinstallations with no success.

5. **[#41836 – No session/conversation identifier sent to MCP servers](https://github.com/anthropics/claude-code/issues/41836)**  
   *14 comments, 👍24*  
   MCP servers cannot distinguish concurrent sessions, making per‑conversation state impossible. This blocks multi‑session patterns that Claude Code’s own workflow features encourage.

6. **[#28986 – Show active model and thinking mode indicators in VS Code panel](https://github.com/anthropics/claude-code/issues/28986)**  
   *13 comments, 👍61*  
   When working in VS Code, users have no visible cue which model is being used or whether thinking mode is enabled, leading to confusion about cost and behavior.

7. **[#64961 – Opus 4.7/4.8 token usage regressed 2-3x after update; disconnects frequently](https://github.com/anthropics/claude-code/issues/64961)**  
   *10 comments, 👍5*  
   A severe cost regression: actual token consumption jumped 2‑3x, combined with frequent disconnections on Opus 4.8. Users report burning through quota quickly.

8. **[#80016 – Windows: Filesystem extension handshake succeeds but tools/call never dispatched](https://github.com/anthropics/claude-code/issues/80016)**  
   *9 comments*  
   A regression in Claude Desktop on Windows where the filesystem MCP extension stops working mid‑session, even after reinstall. Similar to a previously closed issue (#22299).

9. **[#49985 – Conversation rendered/duplicated multiple times in terminal (v2.1.112)](https://github.com/anthropics/claude-code/issues/49985)**  
   *8 comments, 👍22*  
   On Windows, the TUI renders duplicate full conversation views, making the terminal scroll back unusable. Reproduced across multiple versions.

10. **[#64968 – Syntax highlighting in VS Code extension chat panel](https://github.com/anthropics/claude-code/issues/64968)**  
    *7 comments, 👍21*  
    Code blocks in the chat panel show as plain monochrome text, ignoring language tags. Re‑opened request after earlier auto‑closures.

## Key PR Progress (all 4 open PRs)

1. **[#41611 – Add the missing source to Claude Code](https://github.com/anthropics/claude-code/pull/41611)**  
   A long‑dormant PR that adds a missing source attribution. Still open after 4 months; no recent activity noted.

2. **[#42604 – Remove “retro-futuristic” recommendation from Frontend Design Skill](https://github.com/anthropics/claude-code/pull/42604)**  
   A lighthearted cleanup PR, now closed. Not merged.

3. **[#80508 – Fix pagination in auto-close-duplicates script](https://github.com/anthropics/claude-code/pull/80508)**  
   Fixes a bug where comments and reactions weren’t paginated, causing the duplicate detection script to miss data beyond the first 30 items. Essential for maintaining issue hygiene.

4. **[#80495 – Fix `/ralph-loop` parsing prompt text as shell code](https://github.com/anthropics/claude-code/pull/80495)**  
   A security/stability fix: the `/ralph-loop` command was substituting user prompt text directly into shell execution, causing failures for everyday inputs. Now treated as literal text.

## Feature Request Trends

Based on the last 24h issue activity, the most requested directions are:

- **Remote session control** – The ability to approve, monitor, and interact with CLI sessions from the Desktop app or a web interface (#29006, 👍114).
- **IDE transparency** – Visible model/thinking indicators (#28986, 👍61) and syntax highlighting (#64968, 👍21) in the VS Code extension.
- **MCP / Skills improvements** – Per‑session identifiers for MCP servers (#41836), symlink support for commands (#80754), and dynamic skill discovery without reload (#72631).
- **Workflow resilience** – Graceful fallback when structured output retries are exhausted (#75086), and cheaper PDF reading (#80449).

## Developer Pain Points

- **Network instability** – ECONNRESET on macOS (#5674) and “connection closed mid‑response” across platforms (#69415, #69336) remain the top blockers, with no fix in sight.
- **Fable 5 billing confusion** – Multiple reports (#79337, #79341, #80382, #80749) of Max plan users incorrectly being asked to pay usage credits, with silent model downgrades. The bug appears to be a regression tied to the July 20 Fable 5 rollout.
- **Auto‑updater inefficiency** – Each running session downloads the full ~265 MB binary independently; no cross‑session lock (#79942).
- **MCP tool cap at 256** – Custom remote MCP connectors lose tools or are capped at exactly 256 across all connectors, a regression since mid‑July (#77704).
- **Windows‑specific TUI and extension issues** – Duplicate conversation rendering (#49985), WSL disconnections (#69415), and Chrome extension allowlist behaviour (#74696) continue to frustrate Windows users.

---

*Generated from GitHub issue/PR activity for anthropics/claude-code on 2026-07-24.*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-07-24

## Today's Highlights
Windows stability remains the dominant theme, with seven performance and sandbox bugs in the top 10 hottest issues. Two new alpha releases (0.146.0-alpha.5 and 0.146.0-alpha.3.1) landed, while a flurry of PRs from `copyberry` bot introduced WebSocket transport, proxy-aware exec-server routing, and a Guardian V2 feature flag. Community demand for configurable auto‑resolve and MCP process pooling continues to grow.

## Releases
- **[rust‑v0.146.0‑alpha.5](https://github.com/openai/codex/releases/tag/rust-v0.146.0-alpha.5)** – Latest alpha release.
- **[rust‑v0.146.0‑alpha.3.1](https://github.com/openai/codex/releases/tag/rust-v0.146.0-alpha.3.1)** – Patch alpha release.

Both are incremental pre‑release builds; no detailed changelogs were published in the data.

## Hot Issues (10 noteworthy)

1. **[#20214 – Codex App freezes/stutters on Windows 11 despite sufficient resources](https://github.com/openai/codex/issues/20214)**  
   *75 comments, 72 👍* – The highest‑activity issue. Users report frequent UI stuttering on high‑end hardware. Community suspects background WMI polling.

2. **[#28969 – Add setting to disable 60‑second auto‑resolve for questions](https://github.com/openai/codex/issues/28969)**  
   *56 comments, 154 👍* – Overwhelming demand for user‑controlled resolution timeouts. Currently blocks workflow for long‑running CLI tasks.

3. **[#3355 – Error sending request after MacBook sleep](https://github.com/openai/codex/issues/3355)**  
   *41 comments, 23 👍* – Persistent connectivity failure on Darwin after lid close. Still unfixed after nearly a year.

4. **[#4003 – Patched files have mixed line endings on Windows](https://github.com/openai/codex/issues/4003)**  
   *28 comments, 71 👍* – `apply_patch` does not preserve original line endings, breaking workflows on CRLF projects.

5. **[#34260 – Unbounded `taskkill.exe`/`conhost.exe` cleanup storm exhausts WMI](https://github.com/openai/codex/issues/34260)**  
   *28 comments, 9 👍* – Windows Desktop enters a process‑cleanup loop, consuming all WMI quota and freezing the machine.

6. **[#25453 – `powershell.exe` spawned every second for process polling](https://github.com/openai/codex/issues/25453)**  
   *15 comments, 3 👍* – High CPU usage due to excessive PowerShell invocations. A symptom of the underlying WMI dependency.

7. **[#20883 – MCP servers started per session instead of per project](https://github.com/openai/codex/issues/20883)**  
   *15 comments, 4 👍* – Resource waste when opening multiple chats in the same project. Community requests a shared process pool.

8. **[#35032 – Auto‑compaction leaves context ~80% full, causing repeat compaction](https://github.com/openai/codex/issues/35032)**  
   *13 comments* – Long‑running agents waste usage on successive compaction cycles when the meter doesn’t drop below 80%.

9. **[#30712 – `apply_patch` fails on Windows due to split writable roots](https://github.com/openai/codex/issues/30712)**  
   *12 comments, 12 👍* – Sandbox misconfiguration forces agents to fall back to PowerShell file writes, bypassing safe edit path.

10. **[#13036 – Support display of multiple chats](https://github.com/openai/codex/issues/13036)**  
    *12 comments, 8 👍* – Users want multi‑threaded workspaces in the desktop app for parallel agent workflows.

## Key PR Progress (10 important)

1. **[#35078 – Add WebSocket transport to code‑mode host](https://github.com/openai/codex/pull/35078)**  
   Introduces a `--listen` option accepting `ws://IP:PORT`, enabling remote code‑mode connections over WebSocket.

2. **[#35065 – Avoid duplicating deferred sources in tool search](https://github.com/openai/codex/pull/35065)**  
   Removes redundant context by omitting tool listings already advertised by deferred world state.

3. **[#35063 – Track deferred tool namespaces in world state](https://github.com/openai/codex/pull/35063)**  
   Adds `deferred_tool_world_state` feature (disabled by default) to expose namespaces and descriptions to the model.

4. **[#35059 – Decouple exec‑server HTTP from reqwest types](https://github.com/openai/codex/pull/35059)**  
   Replaces `ReqwestHttpClient` with `RouteAwareHttpClient`, using transport‑neutral types for better abstraction.

5. **[#35056 – Route exec‑server WebSockets through configured proxies](https://github.com/openai/codex/pull/35056)**  
   Ensures remote environment connections honor Codex’s outbound proxy policy, including reconnection.

6. **[#35054 – Allow disabling the `update_plan` tool](https://github.com/openai/codex/pull/35054)**  
   Adds `tools.update_plan.enabled` config option (default on) to let users remove the plan‑update tool from the agent’s toolbox.

7. **[#35049 – Register the Guardian V2 feature flag](https://github.com/openai/codex/pull/35049)**  
   Adds `GuardianV2` to the feature registry for automatic approval reviews, disabled by default.

8. **[#35048 – Track app/read request duration](https://github.com/openai/codex/pull/35048)**  
   Records `codex.apps.read.duration_ms` with `include_tools` tagging for observability.

9. **[#35036 – Preserve Windows sandbox proxy settings in guardian sessions](https://github.com/openai/codex/pull/35036)**  
   Fixes proxy‑port loss when Guardian review commands run inside the sandbox.

10. **[#35031 – Enforce writer ownership for thread archive and deletion](https://github.com/openai/codex/pull/35031)**  
    Prevents concurrent archive/delete operations on paginated threads by acquiring writer ownership.

## Feature Request Trends
- **User‑controllable auto‑resolve** (#28969, 154 👍) – The strongest demand is for a configuration toggle to disable the 60‑second automatic resolution of questions.
- **MCP process pooling** (#20883) – Users want MCP servers shared across sessions within the same project, not per chat.
- **Multi‑chat workspaces** (#13036) – Desire for split/parallel chat interfaces in desktop apps, especially for multi‑agent workflows.
- **Tool configurability** – PR #35054 reflects growing interest in toggling individual tools (e.g., `update_plan`) on/off.
- **Disable sidebar auto‑expand** (#31538) – Mouse‑hover sidebars are a nuisance for full‑screen developers.
- **Bidirectional text rendering** (#26250) – Arabic/English mixed text support is requested for international users.

## Developer Pain Points
- **Windows performance regressions dominate** – Issues #34260, #25453, #34879, #33786, and #34730 all describe CPU/WMI exhaustion, taskkill storms, or complete UI freezes on Windows 10/11. Multiple reports point to WmiPrvSE as the root cause.
- **Sandbox instability on Windows** – #30712, #34290, and #35032 highlight broken `apply_patch`, split writable roots, and intermittent hanging.
- **Connectivity after sleep** (#3355, #34891) – macOS and Windows both experience session loss or image generation failures after system sleep.
- **Context compaction inefficiency** (#35032) – Long‑running agents burn through usage because compaction fails to free meaningful context space.
- **CLI auto‑resolve lock‑in** (#28969) – Users on large tasks cannot prevent premature resolution, disrupting continuous workflows.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-07-24

## Today's Highlights

Six weeks after the last fresh issue wave (mid-March), the project continues to process a large backlog. While no new releases arrived in the last 24 hours, several long-standing `priority/p1` bugs around agent loops and model hangs remain active, with the community showing notable frustration around `gemini-3.1-pro-preview` reliability. On the positive side, multiple security-conscious PRs (trust dialog disclosure, TOCTOU race fixes) were merged, and a new code generation pipeline ("Antigravity") is taking shape across several open PRs.

---

## Releases

No new releases in the last 24 hours.

---

## Hot Issues

1. **[#22415 — CLI hangs indefinitely on "This is taking a bit longer" with gemini-3.1-pro-preview](https://github.com/google-gemini/gemini-cli/issues/22415)**
   *P1, Bug, 31 comments, 27 👍.* The most active issue. Users report the CLI hangs in a retry loop without returning results. Abnormal interaction summaries suggest runaway API consumption. Closed 2026-07-24 but the community frustration is palpable.

2. **[#1698 — Add support for VISUAL/EDITOR environment variable](https://github.com/google-gemini/gemini-cli/issues/1698)**
   *P2/P3, Feature, 14 comments, 55 👍.* Long-running (since June 2025) ask to respect standard Unix editor variables instead of a hardcoded list. Still the most upvoted open ask despite bot-triaged status.

3. **[#23260 — Agent enters infinite reasoning loop when blocked by workspace restriction](https://github.com/google-gemini/gemini-cli/issues/23260)**
   *P1, Bug, 7 comments.* Agent fails to ask for user access when blocked by directory permissions, instead looping indefinitely. Marked possible duplicate of #22415.

4. **[#22583 — Race condition in ProjectRegistry.save() causes ENOENT](https://github.com/google-gemini/gemini-cli/issues/22583)**
   *P1, Bug, 6 comments, 2 👍.* Two concurrent startup tasks write to the same temp file without locking. Real race condition affecting v0.33.0.

5. **[#22947 — Updated model doing an awful lot of buffering](https://github.com/google-gemini/gemini-cli/issues/22947)**
   *P1, Bug, 4 comments, 1 👍.* Model sits buffering with no feedback on whether it's stuck or thinking. High priority but closed as stale.

6. **[#16980 — Stop using .gitignore to control file access](https://github.com/google-gemini/gemini-cli/issues/16980)**
   *P3, Feature, 16 comments, 12 👍.* Strong community demand to decouple CLI file access from Git's ignore rules. Users want explicit `.gemini-ignore` separation.

7. **[#20889 — ask_user in screen reader mode doesn't provide way to answer](https://github.com/google-gemini/gemini-cli/issues/20889)**
   *P2, Bug, 12 comments.* Accessibility issue: blind users cannot interact with the `ask_user` tool. Closed but highlights ongoing accessibility gaps.

8. **[#26414 — YOLO mode still asks for subagent approvals](https://github.com/google-gemini/gemini-cli/issues/26414)**
   *P2, Bug, 5 comments.* Even with `--yolo`, subagents prompt for manual approval on read operations. Defeats the purpose of YOLO mode.

9. **[#22420 — Lack of Skill Composition / Progressive Disclosure](https://github.com/google-gemini/gemini-cli/issues/22420)**
   *P2, Bug, 5 comments.* Project-level skills with same name as global skills cause "Skill conflict detected" errors. No graceful composition or override mechanism.

10. **[#22906 — gemini-3.1-flash-lite-preview not supported?](https://github.com/google-gemini/gemini-cli/issues/22906)**
    *P2, Bug, 4 comments, 3 👍.* Documented model names fail at runtime with "Model not found" errors — confusing for users trying the latest preview models.

---

## Key PR Progress

1. **[#28346 — Fix trust dialog disclosure for runnable hooks](https://github.com/google-gemini/gemini-cli/pull/28346)**
   *Merged.* Closes a security issue where non-runnable hook entries were incorrectly shown as executable. Adds warnings for command hooks in project settings.

2. **[#28330 — Fix IDE companion token file mode TOCTOU window](https://github.com/google-gemini/gemini-cli/pull/28330)**
   *Merged.* Closes a time-of-check/time-of-use vulnerability where auth token files were briefly world-readable between `writeFile` and `chmod`.

3. **[#28434 — Implement Antigravity agent runner and prompt templates](https://github.com/google-gemini/gemini-cli/pull/28434)**
   *Open, size/l.* Introduces headless AI agents for iterative code generation and quality assurance. Part of a new SSR pipeline.

4. **[#28525 — Add GCP deployment script for caretaker agent services](https://github.com/google-gemini/gemini-cli/pull/28525)**
   *Open, size/m.* Adds Cloud Run deployment for triage/ingestion agents. Part of the caretaker automation initiative.

5. **[#28331 — Conscious stagnation detection for resilient agentic loops](https://github.com/google-gemini/gemini-cli/pull/28331)**
   *Merged.* Critical fix for agent loops terminating prematurely after `/rewind` or text-only responses. Introduces a "Stagnation Circuit Breaker."

6. **[#28328 — Don't flag non-auth 401 substrings as auth errors](https://github.com/google-gemini/gemini-cli/pull/28328)**
   *Merged.* Fixes false positives where `localhost:4012` or "exit status 401" triggered OAuth fallback. Important for error handling reliability.

7. **[#28327 — Only percent-decode file:// URLs in resolveToRealPath](https://github.com/google-gemini/gemini-cli/pull/28327)**
   *Merged.* Fixes corruption of filenames like `report%202026.txt` or directories named `100%_complete`.

8. **[#28519 — Prevent infinite auth loop by awaiting credential save](https://github.com/google-gemini/gemini-cli/pull/28519)**
   *Open, P1.* Addresses a bug where OAuth credentials not saved synchronously cause infinite re-auth loops.

9. **[#28183 — Preserve terminal focus when closing diff tabs in VS Code companion](https://github.com/google-gemini/gemini-cli/pull/28183)**
   *Open, P1, help wanted.* After approving edits, focus is stolen from the terminal. Simple UX fix with high impact for heavy users.

10. **[#28344 — Add eval:validate command for CI gating](https://github.com/google-gemini/gemini-cli/pull/28344)**
    *Merged, size/xl.* Static analysis command validating eval source files against 9 rules. Practical for CI pipelines to catch eval quality issues.

---

## Feature Request Trends

- **Editor Environment Variable Support** ([#1698](https://github.com/google-gemini/gemini-cli/issues/1698), 55 👍): The single most-requested feature: respect `VISUAL`/`EDITOR` instead of a hardcoded editor list. Heavily upvoted but bot-triaged with no action.

- **File Access Decoupling** ([#16980](https://github.com/google-gemini/gemini-cli/issues/16980), 12 👍): Users want `.gitignore` to control Git behavior only, while Gemini CLI should use its own `.gemini-ignore`. The current overlap is confusing and limiting.

- **Skill Composition / Progressive Disclosure** ([#22420](https://github.com/google-gemini/gemini-cli/issues/22420)): Skills sharing names between project-level and global configs produce opaque "conflict" errors. Community wants hierarchical resolution or override support.

- **Git Worktree Isolation** ([#22658](https://github.com/google-gemini/gemini-cli/issues/22658)): Part of an epic for concurrent task filesystem isolation. Users want Gemini CLI to create and manage Git worktrees automatically for parallel code changes.

- **Context Management / Compression Improvements** ([#22942](https://github.com/google-gemini/gemini-cli/issues/22942)): Users hit "Invalid Argument" errors when context window is exceeded, and manual `/compact` or `/compress` fail to recover sessions.

---

## Developer Pain Points

- **Agent Loops and Hang Behavior**: Multiple P1 issues ([#22415](https://github.com/google-gemini/gemini-cli/issues/22415), [#23260](https://github.com/google-gemini/gemini-cli/issues/23260), [#22669](https://github.com/google-gemini/gemini-cli/issues/22669)) describe agents getting stuck in retry loops or silent hangs. The "This is taking a bit longer" message is a recurring frustration, and restarting sessions often doesn't help.

- **Model Switching / Fallback Surprises** ([#22457](https://github.com/google-gemini/gemini-cli/issues/22457), [#22906](https://github.com/google-gemini/gemini-cli/issues/22906)): The CLI silently switches from user-specified models to `gemini-2.5-flash` mid-task. Preview model names that are documented fail with "not found" errors.

- **YOLO Mode Not Fully Reliable** ([#26414](https://github.com/google-gemini/gemini-cli/issues/26414)): Even in YOLO mode, subagents prompt for manual approval. This undermines trust in the autonomy feature.

- **Race Conditions and State Corruption** ([#22583](https://github.com/google-gemini/gemini-cli/issues/22583), [#22806](https://github.com/google-gemini/gemini-cli/issues/22806)): Concurrent startup tasks corrupt `projects.json`, and background command detection has a fragile 200ms timer window. These point to concurrency issues in an increasingly multi-agent architecture.

- **Preview Model Instability**: Multiple issues target `gemini-3.1-pro-preview` specifically — hangs, buffering, premature termination. The community is eager for the new model but clearly hitting quality gates.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-07-24

## Today’s Highlights
The team shipped **v1.0.74** with official support for [Open Plugin Spec v1](https://github.com/github/copilot-cli/releases/tag/v1.0.74) manifests and MCP server reconnection fixes. A critical bug ([#4097](https://github.com/github/copilot-cli/issues/4097)) where deleted binary files permanently bloat session history past CAPI’s 5 MB limit has drawn community attention. A new regression ([#4235](https://github.com/github/copilot-cli/issues/4235)) breaking `Ctrl+C` cancellation during agent runs is already flagged by users.

## Releases
**v1.0.74** (2026-07-23)  
- Added support for Open Plugin Spec v1 manifests and `mcp.json` configuration.  
- Fixed `?` key being captured as text when `/search` bar is open.  
- IDE integration now reconnects reliably after CLI reloads MCP servers or changes directory.  
- Multi-turn subagent timeline improvements.

**v1.0.74-4** (2026-07-23)  
- Same plugin spec support.  
- Subagent timelines now indicate whether prompts came from the main agent or another subagent.  
- Restores stable IDE reconnection on MCP server reloads.

## Hot Issues (10 noteworthy)
- [#3767 – Oversized attachment permanently wedges session](https://github.com/github/copilot-cli/issues/3767) (closed, 12 💬)  
  Attachments pushing requests over CAPI’s 5 MB native limit cause unrecoverable failures. No recovery available.

- [#4097 – `apply_patch` stores deleted binary in session history](https://github.com/github/copilot-cli/issues/4097) (open, 4 💬, 👍5)  
  Deleting a large binary via `apply_patch` stores the entire binary as a diff. Subsequent requests permanently exceed the CAPI limit, with no `/compact` escape. Critical memory issue.

- [#4089 – Atlassian MCP server connects but exposes zero tools](https://github.com/github/copilot-cli/issues/4089) (open, triaged, 4 💬)  
  OAuth succeeds, but tools never appear in agent sessions. Other HTTP MCP servers work fine. Platform: Windows.

- [#4165 – `copilot --resume` hangs on Windows cold start](https://github.com/github/copilot-cli/issues/4165) (open, 3 💬, 👍1)  
  `--resume` from PowerShell stays at “Resuming session…” indefinitely. Manual workaround via `copilot` then `/resume`.

- [#4206 – Environment footer stuck on “Loading:” under org MCP policy](https://github.com/github/copilot-cli/issues/4206) (open, triaged, 3 💬, 👍2)  
  Built-in GitHub MCP handshake stalling; footer never completes even though `/env` shows everything loaded.

- [#4143 – CLI should inherit MCP tools from connected VS Code instance](https://github.com/github/copilot-cli/issues/4143) (open, triaged, 2 💬, 👍5)  
  Strong community ask: when CLI is attached to VS Code, MCP tools from VS Code extensions (e.g., MSSQL Agent) should be available to CLI sessions.

- [#4235 – Ctrl+C no longer cancels active agent run (regression)](https://github.com/github/copilot-cli/issues/4235) (open, 0 💬)  
  Pressing Ctrl+C during an agent turn does not abort the operation. Previously worked. High impact for interactive use.

- [#4214 – Session eternally loading with blinking blue circle](https://github.com/github/copilot-cli/issues/4214) (open, 1 💬, 👍1)  
  New sessions start stuck at “Loading: 1 skill”. User reports Copilot cannot self-fix and suggests potential charging issues.

- [#4233 – Emit `usage_update` in `--acp` mode](https://github.com/github/copilot-cli/issues/4233) (open, 1 💬, 👍2)  
  ACP clients cannot show context-window or AI-credit usage because the CLI never emits `usage_update`, despite computing this data internally for `/context`.

- [#4199 – Stale sessions keep running old binary after update; idle sessions never trim heap](https://github.com/github/copilot-cli/issues/4199) (open, 0 💬)  
  Multiple terminal tabs running different CLI versions after an in-CLI update; an idle session held ~460 MB for hours. Memory leak risk.

## Key PR Progress
Only two PRs were updated in the last 24 hours, neither representing substantive code changes:

- [#3163 – ViewSonic monitor](https://github.com/github/copilot-cli/pull/3163) (open) – Appears to be an off-topic or spam PR referencing a monitor model; no review activity.
- [#4228 – Withdrawn: incorrect scope for #3534](https://github.com/github/copilot-cli/pull/4228) (closed) – Withdrawn because the fix targeted documentation instead of the private clipboard runtime implementation.

No meaningful code contributions were merged today.

## Feature Request Trends
- **MCP ecosystem expansion**: Multiple requests to inherit MCP tools from VS Code ([#4143]), support MCP resource subscriptions ([#3073]), and enable mid-turn tool-list updates ([#3125]). Users want seamless MCP plugin integration.
- **Plugin & agent enhancements**: Requests for `updatedPrompt` output in hooks ([#3713]), domain/category tags for instruction scoping ([#4231]), and the ability to edit answers in `$EDITOR` during question mode ([#4230]).
- **ACP (Agent Client Protocol) parity**: Feature requests for `usage_update` emission ([#4233]) and enterprise authentication support ([#3161]) to match interactive CLI capabilities.

## Developer Pain Points
- **Session bloat & recovery**: Large attachments and deleted binary files permanently push sessions past CAPI’s 5 MB limit, with no recovery mechanisms. `/compact` is insufficient.
- **MCP tooling friction**: Silent tool-exposure failures (e.g., Atlassian MCP), mismatched tool lists mid-turn, and BigInt serialization errors (`#4211`) degrade reliability.
- **Platform-specific bugs**: Windows resume hang ([#4165]), Alpine/musl auto-update downloading wrong package ([#3696]), and X11 clipboard issues ([#4236]) frustrate non-macOS users.
- **Interactive workflow regressions**: The `Ctrl+C` cancellation regression ([#4235]) and the persistent “Loading:” footer stall ([#4206]) hamper daily productivity.
- **Rendering glitches**: Hook `ask` decisions showing raw JSON instead of diff ([#4135]), and MCP tool failure labels rendering one character per line ([#4238]), reduce terminal UX quality.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI Community Digest — 2026-07-24

**Today's Highlights**  
A massive wave of 15 pull requests landed over the past 24 hours, primarily fixing MCP session handling, Windows compatibility, and shell completion quirks. Meanwhile, the community continues to push for remote session control (Issue #1282, 16 👍) and a new discussion emerged on applying Kimi’s Agent architecture to A-share quantitative trading (Issue #2555). No new releases were published today.

---

## Releases  
*None in the last 24 hours.*

---

## Hot Issues

1. **[#1282] Feature Request: Remote Control – Continue local sessions from any device**  
   *Author: CatKang | 16 👍 | 6 comments*  
   **Why it matters:** Users want to step away from their desk and pick up a Kimi CLI session from a phone/tablet/browser without losing context. This is the most upvoted open issue, indicating strong community demand for seamless workflow continuity.  
   [Issue #1282](https://github.com/MoonshotAI/kimi-cli/issues/1282)

2. **[#2555] Discussion: A-share quantification + AI Agent practice – what to learn from Kimi’s Agent ideas**  
   *Author: yupeng012 | 0 comments (just opened)*  
   **Why it matters:** A brand‑new discussion bridging Kimi CLI with financial trading agents. The author shares real‑world lessons (e.g., using PnL as the sole feedback metric, parameter‑driven vs hard‑coded signals). Could spark cross‑domain feature requests.  
   [Issue #2555](https://github.com/MoonshotAI/kimi-cli/issues/2555)

3. **[#2553] /plugins crashes with TypeError when ≥2 plugins installed (v0.29.0, Windows)**  
   *Author: tovipy-png | 0 comments*  
   **Why it matters:** A clear crash on the plugin management screen, blocking power users who rely on multiple plugins. The issue reproduces consistently with the latest binary.  
   [Issue #2553](https://github.com/MoonshotAI/kimi-cli/issues/2553)

4. **[#2552] Poor font kerning for Cyrillic text in Kimi Desktop chat markdown**  
   *Author: Serg2000Mr | 0 comments*  
   **Why it matters:** Affects readability for Cyrillic‑speaking users. While minor, it degrades the desktop UX for a significant user base.  
   [Issue #2552](https://github.com/MoonshotAI/kimi-cli/issues/2552)

5. **[#2545] Synchronize queued prompts to backend for better phone UX with Kimi Web**  
   *Author: vilicvane | 0 comments*  
   **Why it matters:** Mobile users frequently background the browser; unsent queued prompts are lost. This is a low‑effort UX win that would retain prompts even when the phone is locked.  
   [Issue #2545](https://github.com/MoonshotAI/kimi-cli/issues/2545)

6. **[#2538] kimi-datasource plugin worker pool blocks all sessions on timeout**  
   *Author: cloxichjc | 0 comments*  
   **Why it matters:** A critical concurrency bug – when one session hangs on a datasource call (e.g., Yahoo Finance), all other sessions freeze. Blocks multi‑tasking workflows.  
   [Issue #2538](https://github.com/MoonshotAI/kimi-cli/issues/2538)

---

## Key PR Progress

1. **[#2554] fix(tools): count StrReplaceFile replacements against running content**  
   *Author: ayaangazali*  
   The success message for `StrReplaceFile` previously counted replacements against the original file content instead of the content after previous replacements. Self‑contained correctness fix.  
   [PR #2554](https://github.com/MoonshotAI/kimi-cli/pull/2554)

2. **[#2548] fix(mcp): reuse initialized client sessions**  
   *Author: lihailong00*  
   Keeps MCP client sessions alive for the toolset lifetime, reusing the active session for repeated calls. Prevents secondary `initialize` failures from strict stdio servers.  
   [PR #2548](https://github.com/MoonshotAI/kimi-cli/pull/2548)

3. **[#2551] fix(shell): search past file completion limit**  
   *Author: lihailong00*  
   Extends `@` file completion to look beyond the default 1000 entries, using bounded scanning (10,000 max) with fragment‑based fallback caches. Improves completion accuracy in large repos.  
   [PR #2551](https://github.com/MoonshotAI/kimi-cli/pull/2551)

4. **[#2550] fix(kosong): propagate message serialization options**  
   *Author: lihailong00*  
   Ensures Pydantic `exclude_none` propagates through `Message.content`, omitting empty media IDs while preserving default dumps. Fixes a silent inconsistency in structured output.  
   [PR #2550](https://github.com/MoonshotAI/kimi-cli/pull/2550)

5. **[#2549] fix(shell): index tracked vendor files**  
   *Author: lihailong00*  
   Allows Git‑tracked files under `vendor/` to appear in `@` completion, while still excluding untracked vendor trees and `node_modules`. Solves a long‑standing gap for projects that version vendor dependencies.  
   [PR #2549](https://github.com/MoonshotAI/kimi-cli/pull/2549)

6. **[#2547] fix(windows): configure stdio as UTF-8**  
   *Author: lihailong00*  
   Sets Windows stdout/stderr to UTF-8 at CLI startup when the stream supports `reconfigure`. Fixes broken output on cp936 streams without affecting redirected output.  
   [PR #2547](https://github.com/MoonshotAI/kimi-cli/pull/2547)

7. **[#2546] fix(print): escape markup in echoed stdin prompts**  
   *Author: lihailong00*  
   Prevents Rich markup interpretation of user input (e.g., `[/login]`), rendering stdin prompts literally while keeping the model’s version unchanged.  
   [PR #2546](https://github.com/MoonshotAI/kimi-cli/pull/2546)

8. **[#2543] fix(hooks): notify on permission prompts**  
   *Author: lihailong00*  
   Re‑enables the documented `permission_prompt` notification hook, which was missing for manual approval. Prevents silent permission blocks in automated workflows.  
   [PR #2543](https://github.com/MoonshotAI/kimi-cli/pull/2543)

9. **[#2541] fix(mcp): continue after deferred startup failure**  
   *Author: lihailong00*  
   Prevents an optional MCP startup failure from aborting the interactive turn – catches `MCPRuntimeError` at the defer boundary while keeping critical errors visible.  
   [PR #2541](https://github.com/MoonshotAI/kimi-cli/pull/2541)

10. **[#2540] fix(media): normalize ICO images to PNG**  
    *Author: lihailong00*  
    Converts ICO image payloads to PNG before sending to the model, preserving metadata. Fixes a crash when users paste icon files.  
    [PR #2540](https://github.com/MoonshotAI/kimi-cli/pull/2540)

---

## Feature Request Trends

- **Remote session continuity** – The most‑requested feature (#1282, 16 👍) would allow users to transfer a live Kimi CLI session to another device (phone, tablet, browser). This resonates with the mobile‑first workflow crowd.
- **Background prompt sync** – Issue #2545 asks for queued prompts to be sent to the backend even when the browser is backgrounded, a common pain point for phone users.
- **Agent integration for financial quantification** – Issue #2555 introduces a discussion about using Kimi’s Agent approach for real‑world A‑share trading. While early, it hints at demand for domain‑specific agent tooling.

---

## Developer Pain Points

- **Plugin stability** – Two separate reports highlight crashes or deadlocks when using multiple plugins: the `/plugins` screen crashes on Windows with ≥2 plugins (#2553), and the `kimi-datasource` worker pool blocks all sessions on a single timeout (#2538).
- **Windows‑specific text rendering** – Poor kerning for Cyrillic characters in the desktop chat panel (#2552) and a previous Windows UTF-8 stdout issue (addressed in PR #2547) show ongoing platform‑specific quality concerns.
- **Mobile & offline UX** – Queued prompts not being sent when the browser is backgrounded (#2545) points to a lack of mobile‑first design, affecting users who switch apps frequently.
- **MCP and shell edge cases** – Multiple fixes in this batch (MCP session reuse, file completion limits, vendor indexing) reveal underlying reliability issues in tool‑call orchestration and file navigation that impact daily productivity.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest – 2026-07-24

## Today’s Highlights
No new releases landed in the last 24 hours, but the community remains very active. A long‑standing feature request for auto‑discovering models from OpenAI‑compatible providers (#6231) has surged to 187 👍 and 30 comments, reflecting strong demand for friction‑free local model integration. Meanwhile, multiple 2.0‑era bugs (reconnect herds, TUI crashes) are being actively investigated, and a wave of PRs by **Brendonovich** migrates core app packages to the current API.

---

## Releases
No new releases in the last 24 hours.

---

## Hot Issues

1. **#6231 – Auto‑discover models from OpenAI‑compatible endpoints**  
   *Requires*: manual `opencode.json` model lists → users want LM Studio / Ollama / llama.cpp model auto‑detection.  
   **187 👍, 30 comments** – highest community engagement.

2. **#37012 – Keep legacy layout option**  
   Users push back against the new UI, citing easy access from the main window and workspace support.  
   **30 👍, 29 comments** – clear attachment to the old layout.

3. **#37716 – Internal Server Error (Closed)**  
   Occurs with different models using OpenCode Go. Reproduced on Desktop v1.18.3.  
   **5 👍, 26 comments** – widespread impact.

4. **#25848 – Add session renaming**  
   Wanted: `/rename` command or CLI support to manually name sessions.  
   **0 👍, 11 comments** – consistent, low‑noise request.

5. **#37326 – Math equations not rendered**  
   Model output containing LaTeX or math is not displayed.  
   **1 👍, 7 comments** – affects documentation‑heavy workflows.

6. **#6284 – Support for RTL languages (Closed)**  
   Arabic/Hebrew text in input or agent replies is broken.  
   **8 👍, 6 comments** – accessibility blocker.

7. **#36285 – 2.0: managed‑service restart causes reconnect herd (Closed)**  
   Service restart disconnects all TUIs, cold‑boots graphs, delays SSE readiness.  
   **0 👍, 5 comments** – critical 2.0 performance issue.

8. **#38255 – Discrepancy between usage dashboards**  
   Monthly limit shows 100% but granular dashboard shows ~$10 used.  
   **0 👍, 5 comments** – billing confusion.

9. **#29859 – @ symbol fails on Windows**  
   File references via `@` never show suggestions on any directory.  
   **0 👍, 4 comments** – major platform bug.

10. **#36766 – Truncated OpenAI tool arguments**  
    Native Responses path finalizes tool calls with truncated JSON; TUI terminates without clear error.  
    **0 👍, 4 comments** – core LLM integration bug.

Full list: [top 30 issues by comment count](https://github.com/anomalyco/opencode/issues?q=is%3Aissue+sort%3Acomments-desc)

---

## Key PR Progress

1. **#38600 – feat(core): add Kimi Code OAuth**  
   *`opencode-agent[bot]`* – RFC 8628 device flow for Kimi Code, including `X‑Msh‑*` headers.  
   [PR](https://github.com/anomalyco/opencode/pull/38600)

2. **#38596 – fix(core): share one tool snapshot per request**  
   *`kitlangton`* – Ensures tool definitions are captured once per request, fixing registration order issues. (Closed)  
   [PR](https://github.com/anomalyco/opencode/pull/38596)

3. **#38433 – feat(opencode): add roll‑call command**  
   *`cbrunnkvist`* – Tests connectivity/latency for matching text models. Closes #13711.  
   [PR](https://github.com/anomalyco/opencode/pull/38433)

4. **#38463 – feat(app): support current pty transport**  
   *`Brendonovich`* – Migrates PTY lifecycle and shell discovery to the compatible API.  
   [PR](https://github.com/anomalyco/opencode/pull/38463)

5. **#38460 – feat(app): support current review data**  
   *`Brendonovich`* – Accepts new file‑diff records in app/session UI; migrates VCS review requests.  
   [PR](https://github.com/anomalyco/opencode/pull/38460)

6. **#38465 – feat(app): migrate discovery workflows**  
   *`Brendonovich`* – Normalizes provider, project, MCP, and directory picker workflows.  
   [PR](https://github.com/anomalyco/opencode/pull/38465)

7. **#38461 – feat(app): migrate session interactions**  
   *`Brendonovich`* – Routes prompts, forks, archival, and permissions through the compatible API.  
   [PR](https://github.com/anomalyco/opencode/pull/38461)

8. **#38466 – feat(app): render current session timeline**  
   *`Brendonovich`* – Constructs timeline rows from current session messages; projects tool/shell messages.  
   [PR](https://github.com/anomalyco/opencode/pull/38466)

9. **#38592 – fix: session changes panel always empty**  
   *`oguzeray`* – Fixes `Session.diff()` stub and fallback; closes #32852.  
   [PR](https://github.com/anomalyco/opencode/pull/38592)

10. **#35311 – fix(core): multiple clones of same repo are different projects**  
    *`belisoful`* – Changes project key to avoid duplicate projects for same repo. Closes 14 related issues.  
    [PR](https://github.com/anomalyco/opencode/pull/35311)

---

## Feature Request Trends

- **Model auto‑discovery** (#6231) – Users want OpenCode to detect models from local OpenAI‑compatible providers without manual config.
- **UI layout preservation** (#37012, #38525) – Strong demand for keeping the legacy layout or adding project/dialog hierarchy with session naming.
- **RTL language support** (#6284) – Accessibility need for Arabic/Hebrew.
- **Provider OAuth expansion** (#37630) – Auto‑login for Kimi/Moonshot, following Anthropic/OpenAI patterns.
- **Sub‑agent visibility** (#37267) – Dedicated view for sub‑agent outputs and status, separate from main agent logs.
- **Mobile companion** (#33163) – Connect mobile device to monitor terminal output and accept tasks.
- **Spinner verb customization** (#38599) – Replace “Thinking” spinner with user‑defined verbs for parody.

---

## Developer Pain Points

- **Permission UX** – “Always Allow” not respected (#37880), permission requests ignored in `--auto` mode with sub‑agents (#36868).
- **Session management** – Conversations lost after sidebar collapse (#38572), “Session Changes” panel always empty (#38592).
- **Platform‑specific bugs** – `@` file references fail on Windows (#29859), file tree expansion broken in V2 Desktop on Windows (#36743), Unix socket paths cause tool errors (#38544).
- **Resource leaks** – Cancelled sub‑agents leave orphaned child processes at 100% I/O (#38564); main thread freeze at 100% CPU (#38565).
- **Billing confusion** – Discrepancy between monthly limit and granular usage dashboards (#38255).
- **Renderer crashes** – Desktop v1.18.4 crash on launch (`data.lsp` TypeError, #38577); TUI crash from `undefined` state content (#38574).
- **npm platform restriction** – FreeBSD users unable to install due to `os` constraint (#38591).

*Generated from GitHub data: anomalyco/opencode . All items reflect activity in the 24 hours leading up to 2026-07-24.*

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-07-24

This digest covers the past 24 hours of activity across the Qwen Code repository (43 issues, 50 PRs updated).

---

## 1. Today’s Highlights

A new nightly release (v0.20.1-nightly.20260724) ships with telemetry test coverage for daemon metrics and a general performance pass. The community is seeing a cluster of update‑check failures tied to npm 12 and mise shell wrappers, alongside a notable performance regression where full prompt reprocessing occurs more frequently. Several PRs aim to improve ACP child‑process startup speed and add new channel integrations (GitHub polling, workspace management API).

---

## 2. Releases

**[v0.20.1-nightly.20260724.7d17c44a3](https://github.com/QwenLM/qwen-code/releases/tag/v0.20.1-nightly.20260724.7d17c44a3)** — Latest nightly.  
Changes include a test for daemon metrics‑init ordering (PR #7456) and a general performance improvement (“perf”). No breaking changes or major feature additions.

---

## 3. Hot Issues (Top 10 by Relevance)

1. **[#5736 – More full prompt reprocessing in recent update?](https://github.com/QwenLM/qwen-code/issues/5736)**  
   *Labels: performance, caching*  
   Users report that after a recent update, continuation conversations trigger full prompt re‑processing more often. Community concern is high (7 comments, 1 👍). Could impact latency for local LLM users.

2. **[#7147 – MCP server never successfully get tool and resource listing](https://github.com/QwenLM/qwen-code/issues/7147)**  
   *Labels: tools, MCP*  
   Authentication works, but tool listing times out when using external MCP servers (e.g., Fastmail). Blocks MCP integration for many users.

3. **[#7599 – Workspace artifacts created via record_artifact have no managedId](https://github.com/QwenLM/qwen-code/issues/7599)**  
   *Labels: core, artifacts*  
   Internally created workspace artifacts lack a `managedId`, breaking the `artifact_changed` SSE event. Core bug affecting workspace artifact workflows.

4. **[#7485 – TUI: large blank area between last message and input after resume](https://github.com/QwenLM/qwen-code/issues/7485)**  
   *Labels: UI, session management*  
   After `qwen resume`, the terminal shows a blank gap. Annoying UI regression that disrupts chat flow.

5. **[#7264 – Cold-start follow-ups: remaining lazy-loading candidates from ACP eager-closure audit](https://github.com/QwenLM/qwen-code/issues/7264)**  
   *Labels: performance, core*  
   Identifies 17.24 MiB / 2420 modules parsed on every cold start. Performance improvement opportunity eagerly awaited by power users.

6. **[#6014 – Agent no longer shows which file it read](https://github.com/QwenLM/qwen-code/issues/6014)**  
   *Labels: UI, rendering*  
   Recent version removed file paths from `read_file` messages — now shows only “read 1 file”. Downgrade in transparency that frustrates developers.

7. **[#6806 – Status line context percentage does not refresh after /compress](https://github.com/QwenLM/qwen-code/issues/6806)**  
   *Labels: UI, token management*  
   Running `/compress` reduces token count, but the footer percentage stays unchanged until the next model request. Small but common annoyance.

8. **[#7515 / #7520 / #7543 – Update check fails with “registry error”](https://github.com/QwenLM/qwen-code/issues/7515)** (cluster)  
   *Labels: CLI, installation*  
   Multiple users report broken `/update` and startup checks. Root causes include mise bash wrappers (#7543) and npm 12 compatibility (#7520). Affects all users on latest Node/npm.

9. **[#7590 – WeChat channel cannot be used](https://github.com/QwenLM/qwen-code/issues/7590)**  
   *Labels: integration*  
   Chinese WeChat channel reports an `AcpBridge` internal error when sending messages. Blocks a large user base.

10. **[#7616 – Do we really need this many E2E tests?](https://github.com/QwenLM/qwen-code/issues/7616)**  
    *Labels: testing, CI*  
    A developer question about CI flakiness: most E2E failures are non‑deterministic. Sparks discussion on test quality vs. quantity.

---

## 4. Key PR Progress (Top 10)

1. **[#7633 – fix(cli): align all TUI icon columns to a uniform 2-col width](https://github.com/QwenLM/qwen-code/pull/7633)**  
   Fixes visual misalignment of tool status icons (`✓`, `✗`) relative to assistant message prefix. Small but noticeable polish.

2. **[#7635 – feat(core): Align GenAI request telemetry with ARMS](https://github.com/QwenLM/qwen-code/pull/7635)**  
   Standardises telemetry format to Alibaba Cloud ARMS. Important for enterprise observability.

3. **[#7594 – perf(cli): Propagate compile cache to ACP children](https://github.com/QwenLM/qwen-code/pull/7594)**  
   Reuses Node’s module compile cache in ACP subprocesses, reducing cold‑start parsing by reusing already‑compiled modules. Directly addresses performance issues like #7264.

4. **[#7539 – fix(cli): clean orphaned managed npm update artifacts](https://github.com/QwenLM/qwen-code/pull/7539)**  
   Cleans stale staging files before an update, preventing state corruption. Related to the update‑check bug cluster.

5. **[#7637 – feat(serve): expose workspace Channel management API](https://github.com/QwenLM/qwen-code/pull/7637)**  
   Adds CRUD and lifecycle actions for workspace channels. Lays groundwork for multi‑channel server deployments.

6. **[#7632 – feat(channels): GitHub polling adapter with notification-as-wakeup architecture](https://github.com/QwenLM/qwen-code/pull/7632)**  
   New channel adapter that polls GitHub notifications and replies to @mentions. Uses a wake‑up pattern to avoid constant polling.

7. **[#7471 – feat(web-shell): add git mode selector for new session creation](https://github.com/QwenLM/qwen-code/pull/7471)**  
   Lets users choose between current branch, new branch, or no git workflow when starting a session. Improves web‑shell usability.

8. **[#7603 – fix(sdk-java): Harden daemon transport reliability](https://github.com/QwenLM/qwen-code/pull/7603)**  
   Adapts Java SDK to restart‑safe event cursor contract. Prevents data loss after daemon restarts.

9. **[#7268 – feat(serve): Hot-reload workspace trust changes](https://github.com/QwenLM/qwen-code/pull/7268)**  
   Without restart, trust‑policy changes immediately affect trusted/untrusted workspace behaviour. Needed for administrative workflows.

10. **[#7607 – feat(core): add configurable image generation models](https://github.com/QwenLM/qwen-code/pull/7607)**  
    Lets users select a dedicated image‑generation provider, invoke via `/model --image`. Built‑in approval gate for safety.

---

## 5. Feature Request Trends

- **Enterprise external memory**: Issues [#7449](https://github.com/QwenLM/qwen-code/issues/7449) and [#7585](https://github.com/QwenLM/qwen-code/issues/7585) propose official profiles for connecting to external knowledge bases (memory, context providers). Indicates growing demand for production‑grade integrations.
- **Channel expansion**: PRs for GitHub polling (#7632), WeChat fixes (#7590), and Telegram topic routing (#7609) show the community wants broader chat‑platform support.
- **TUI & CLI ergonomics**: Requests for VSCode terminal output (#7578), cancel‑prompt restoration (#7138), and session @‑mentions (#7302) reflect desire to make the CLI feel more like an IDE.
- **CI stability**: Issue [#7616](https://github.com/QwenLM/qwen-code/issues/7616) questions the value of flaky E2E tests. Expect discussion around test reduction or mocking.

---

## 6. Developer Pain Points

- **Update‑check failures** dominate the day: multiple reports of “registry error” due to npm 12 changes and mise shell wrappers. Any fix is urgent.
- **Performance regressions** in prompt reprocessing (#5736) and cold‑start parsing (#7264) frustrate users of local/smaller models.
- **TUI regressions** after resume (#7485), missing file names (#6014), and status‑line staleness (#6806) erode daily‑driver trust.
- **Channel integration bugs** (WeChat #7590, Telegram #7609, MCP timeout #7147) block real‑world use for specific platforms.
- **Mobile browser incompatibility** (#5958) and flickering in terminals (#6137) remain unresolved for many.

*Generated from QwenLM/qwen-code GitHub activity, 2026-07-23T00:00Z – 2026-07-24T00:00Z.*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar).*