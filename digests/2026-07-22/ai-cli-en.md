# AI CLI Tools Community Digest 2026-07-22

> Generated: 2026-07-22 02:57 UTC | Tools covered: 7

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

# AI CLI Developer Tools: Cross-Tool Comparison Report
**Date:** 2026-07-22 | **Scope:** 7 major AI CLI tools

---

## 1. Ecosystem Overview

The AI CLI tools landscape in mid-2026 is characterized by rapid iteration tempered by reliability challenges. All seven tools shipped updates within the past 24–72 hours, yet the dominant themes are regressions, platform-specific instability, and the struggle to integrate the Model Context Protocol (MCP) at scale. A clear stratification is emerging: established tools (Claude Code, OpenAI Codex) are grappling with technical debt and Windows regressions, while newer entrants (OpenCode, Qwen Code) focus on UI/UX modernization and subagent workflows. The forced migration of Gemini CLI to Antigravity has created trust erosion, highlighting a growing tension between ecosystem consolidation and developer autonomy. Cross-tool pain points—MCP reliability, Windows performance, billing transparency—suggest that the industry has not yet converged on robust infrastructure patterns for agentic CLI tools.

---

## 2. Activity Comparison

| Tool | Hot Issues (Past 24h) | PRs (Past 24h) | Release Status | Community Engagement (High 👍 Issues) |
|---|---|---|---|---|
| **Claude Code** | 10 | 10 | ✅ v2.1.217 shipped | Top-voted: #34255 (99👍) — Remote control reconnection |
| **OpenAI Codex** | 10 | 10 | ✅ v0.145.0 stable | #19504 (18👍) — RTL support; #33776 (13👍) — Windows WMI storms |
| **Gemini CLI** | 10 | 10 | ⚠️ Nightly only (v0.52.0) | #27314 (3👍) — Standalone CLI demand; #27356 (4👍) — Keep Google One |
| **GitHub Copilot CLI** | 10 | 1 (stray) | ✅ v1.0.74-0 shipped | #1305 (26👍) — MCP OAuth; #4012 (17👍) — BYOK reasoning |
| **Kimi Code CLI** | 5 (all) | 1 | ⏸️ No new release | #2474 (2👍) — UI flickering on Linux |
| **OpenCode** | 10 | 10 | ⏸️ No new release | #6231 (182👍) — Auto-model discovery; #20695 (90👍) — Memory megathread |
| **Qwen Code** | 10 | 10 | ✅ v0.20.1 shipped | #7156 (11 comments) — Subagent model mutation (closed) |

**Data quality note:** Issue/PR counts are filtered to "noteworthy" items in each digest; total repository activity may be higher.

---

## 3. Shared Feature Directions

### 3.1 MCP Reliability & Full Protocol Support (All tools)
- **Claude Code:** 4+ open bugs on silently dropped tool calls (#79992, #78826, #79971) — tools accepted by model but never dispatched to server
- **Copilot CLI:** #1305 requests OAuth DCR for remote MCP servers; #1518 asks for resources & prompts primitives (only tools implemented)
- **Gemini CLI:** #20990 — OAuth2.1 dynamic client registration fails
- **Kimi Code CLI:** #2531 — Moonshot API rejects MCP tool schemas (HTTP 400)
- **OpenCode:** #34652 — Anthropic returns nested JSON arrays instead of real arrays

**Common need:** Standardized schema normalization layer, transparent diagnostics when MCP tools fail, OAuth refresh handling, and full primitive support (tools + resources + prompts).

### 3.2 Windows Performance & Stability (Claude Code, Codex, Copilot CLI, Kimi Code)
- **Codex:** #33776 — 287+ orphaned `taskkill.exe`/`conhost.exe` processes causing WMI storms, CPU 100%, system freeze. Multiple duplicates.
- **Claude Code:** #76357 — MSIX update fails requiring reboot; #72215 — fullscreen scroll broken on Windows; #79606 — sandbox regression breaks root installs
- **Copilot CLI:** #2282 — "Failed to connect to MCP server" after WinGet install
- **Kimi Code CLI:** #2529 — NumPad number keys not working on Windows

**Common need:** Windows-specific process management hygiene, sandbox compatibility, input abstraction across platforms, and update mechanisms that don't brick the app.

### 3.3 Session Management & State Persistence (Claude Code, Codex, Copilot CLI, Qwen Code)
- **Claude Code:** #34255 — Remote control reconnection (99👍, 57 comments); #75037 — Background agent session termination/lost tasks
- **Codex:** 0.145.0 shipped paginated thread history with resume, search, and sub-agent support
- **Copilot CLI:** v1.0.74-0 improved resume search matching (whitespace differences)
- **Qwen Code:** #7156 — Subagent model mutation causing context overflow (P1, closed); #5540 — request to resume completed background sub-agents

**Common need:** Cross-session state consistency, fork/resume from any point, sub-agent lifecycle management with clear ownership, and reliable reconnection after disconnects.

### 3.4 UI/UX Customization & Accessibility (Claude Code, Codex, Copilot CLI, OpenCode)
- **Claude Code:** #25042 (31👍) — auto-scroll control; emoji autocomplete shipped; #79995 — system theme on Linux
- **Codex:** #19504 (18👍) — RTL text support for Arabic/Hebrew (longest-standing request)
- **Copilot CLI:** #4212 — dark-on-dark rendering in tmux; #4213 — dropped key events on pane focus loss
- **OpenCode:** #37012 (27👍) — keep legacy layout; #16349 (10👍) — swap left/right panels; #6231 (182👍) — auto-discover models from providers

**Common need:** Configurable layout/scroll behavior, platform-native theming, RTL text support, terminal rendering robustness, and model discovery UX.

### 3.5 Billing & Usage Transparency (Claude Code, Copilot CLI, OpenCode, Gemini CLI)
- **Claude Code:** #75757 — Subagents billed after spend limit; #79916, #79687 — Fable 5 unavailable despite valid subscription
- **Copilot CLI:** #4005 — billing entity not selected blocking memory saves; #4207 — per-agent credit usage breakdown requested
- **OpenCode:** #37790 — Stripe payment succeeded but balance shows "Insufficient"; #38216+ — Go subscription outage across multiple models
- **Gemini CLI:** #27191 — quota shows 100% used without actual usage; #27187 — client-side 429 routing loop burns tokens

**Common need:** Real-time usage dashboards, per-agent/subagent billing attribution, clear error messages for quota/rate limits, and reliable subscription state in offline scenarios.

---

## 4. Differentiation Analysis

| Dimension | Claude Code | OpenAI Codex | Gemini CLI | Copilot CLI | OpenCode | Qwen Code | Kimi Code |
|---|---|---|---|---|---|---|---|
| **Primary User** | Enterprise AI devs | Collaborative developers | Google Cloud devs | GitHub-native teams | Startup/indie devs | Multilingual enterprise | Asian market (CN) |
| **Key Differentiator** | Rich plugin/MCP ecosystem | IDE-agnostic agent | Google service integration | GitHub ecosystem lock-in | Desktop+TUI dual UI | CUA driver + subagent orchestration | Moonshot API focus |
| **Architecture** | Python/JS hybrid, plugin hooks | Rust-based, HTTP client abstraction | Language-agnostic, Antigravity push | Go-based, MCP-first | Bun/TypeScript, web-first | Rust core, CUA Rust driver | Python-based |
| **Maturity** | Most mature ecosystem, high complexity | High maturity, facing Windows debt | Transitioning to new platform | Stable core, growing feature set | Rapid iteration, early stability | Active expansion, good PR velocity | Niche, low community |
| **Community Sentiment** | Mixed — powerful but buggy | Frustrated — Windows regressions | Anxious — platform migration | Skeptical — regressions in recent releases | Enthusiastic — active feature requests | Positive — responsive maintainers | Low engagement |
| **Unique Strength** | `--bg` agents, Twilight plugin system | /import from Cursor/Claude Code | Evals infrastructure (coverage reports) | Fleet subagents, model plan mode | Layout flexibility, auto-model discovery | Autofix label system, vendor-neutral drivers | Simplicity, Moonshot API performance |
| **Unique Weakness** | MCP tool-drop systemic | WMI process storms | Antigravity migration backlash | Zombie processes, tgrep OOM | Go subscription outages | VS Code connection failures (Win) | Schemas rejected by own API |

---

## 5. Community Momentum & Maturity

### High Velocity / Rapid Iteration
- **Qwen Code** — Shipped 3 releases in 24h (v0.20.1, preview, nightly). 10 PRs in progress, including CODEOWNERS intelligence, subagent discoverability, web-shell rendering optimization. Strong maintainer responsiveness (closed #7156 root cause promptly).
- **OpenCode** — 10 active PRs despite no release. Clock-skew fix, malformed patch rejection, tool progress liveliness, Windows Bun.serve fix. High community engagement: #6231 (182👍) is the most-upvoted feature in the entire sample.

### High Maturity / Scale Challenges
- **Claude Code** — Most complex ecosystem (plugins, MCP, remote control). Top-voted bug (#34255, 99👍) has 57 comments with no fix; MCP tool-drop cluster (4+ issues) suggests a systemic architectural weakness. Strong feature velocity (emoji autocomplete, AWS gateway) offset by reliability debt.
- **OpenAI Codex** — 0.145.0 is a major feature release (paginated history, Cursor import), but Windows process management (#33776, 287+ orphan processes) is the most severe single regression in the ecosystem. 10 PRs merged today, all focused on HTTP client abstraction — indicating foundational refactoring.

### Transitioning / Uncertain
- **Gemini CLI** — Community sentiment is at its lowest. No standalone CLI future (Antigravity forced migration). 4 of top 10 issues directly question the project's survival. Quota/429 instability and shell execution bugs further erode trust. Despite RCE fix in nightly, the product direction is a liability.

### Low Engagement / Niche
- **Kimi Code CLI** — Only 5 issues and 1 PR in 24h. No release. Bug count is low but severity is high (Moonshot API rejects own tool schemas — a fundamental platform dependency failure). Not a priority tool for decision-makers.

### Key Metrics Summary
| Tool | Community Volume | Issue Resolution Speed | Release Cadence | Sentiment |
|---|---|---|---|---|
| Claude Code | Very High | Moderate | Fast (daily) | 🟡 Neutral |
| OpenAI Codex | High | Moderate | Fast (weekly) | 🟡 Strained |
| Gemini CLI | Medium | Slow | Slow (nightly) | 🔴 Negative |
| Copilot CLI | Medium | Slow | Fast (weekly) | 🟡 Neutral |
| OpenCode | High | Fast | Slow | 🟢 Positive |
| Qwen Code | High | Very Fast | Very Fast (multiple) | 🟢 Positive |
| Kimi Code | Low | Slow | None | 🔴 Inactive |

---

## 6. Trend Signals

### 6.1 MCP is Becoming the Universal Integration Layer — But Reliability Lags
Every major tool is investing in MCP, but the failure modes are multiplying: silent drops (Claude Code), schema rejections (Kimi Code), OAuth failures (Gemini CLI, Copilot CLI), and incomplete protocol support (Copilot CLI lacks resources/prompts). **Takeaway:** Standardizing MCP client implementations and error propagation across providers will be a prerequisite for ecosystem trust. Expect shared middleware (e.g., schema validators, retry layers) to emerge as open-source projects.

### 6.2 Windows Is the Undisputed Pain Point for Agentic Tools
The Codex WMI storm (#33776) is the most dramatic example, but Claude Code (sandbox regression, MSIX fails), Copilot CLI (MCP connection after WinGet), and Kimi Code (NumPad) all have Windows-specific blockers. Google appears to have deprioritized Gemini CLI on Windows entirely. **Takeaway:** Any AI CLI tool targeting enterprise must invest in Windows process management, input abstraction, and sandbox compatibility. The gap between macOS/Linux and Windows experience is widening, not narrowing.

### 6.3 Agent Autonomy Without Safeguards Breeds Distrust
Subagent model mutation (Qwen Code #7156), runaway token consumption on 429s (Gemini CLI #27187), zombie processes (Copilot CLI #4163), and unbounded memory in indexers (Copilot CLI #3976) all point to insufficient resource governance. **Takeaway:** The next competitive differentiator will be deterministic guardrails: maximum tool output budgets, subagent token caps, process cleanup on disconnect, and memory limits for daemons. Tools that ship these first will gain enterprise trust.

### 6.4 User Agency Is the Counter-Trend to Ecosystem Lock-In
The Gemini CLI → Antigravity migration is generating the most passionate negative response in the dataset. Conversely, OpenCode's #6231 (auto-discover any OpenAI-compatible provider) is the single most-upvoted feature across all tools. **Takeaway:** Developers want BYO-model flexibility, not platform dependence. Tools that embrace provider-agnostic architectures (Copilot CLI's BYOK, OpenCode's provider auto-discovery, Qwen Code's vendor-neutral CUA driver) are better positioned for the long term.

### 6.5 UI/UX Parity Between Desktop and Web Is a Growing Expectation
OpenCode's new layout exposes workspaces/worktrees missing on Web; Qwen Code's web-shell is adding git mode selectors and rendered previews; Claude Code shipped emoji autocomplete; Codex added paginated history. **Takeaway:** CLI-only is no longer sufficient. Users expect rich web and desktop companions with feature parity. The tools winning community sentiment (OpenCode, Qwen Code) are those investing in both TUI and web-shell experiences.

### 6.6 Billing / Subscription State Is a Trust-Critical Surface
Four of seven tools have active billing bugs. Stripe payments not reflected (OpenCode), subagents billed after limit (Claude Code), phantom full quotas (Gemini CLI), billing entity not selected (Copilot CLI). **Takeaway:** Billing is the most sensitive user touchpoint. False positives (blocking paid users) or false negatives (charging after limit) immediately erode trust. Tools should prioritize idempotent payment verification, offline state caching, and transparent error messages.

---

## Summary for Decision-Makers

| If you need... | Recommended tool | Reason | Cautious about... |
|---|---|---|---|
| Most mature ecosystem with plugin extensibility | **Claude Code** | Rich MCP/plugin support, fast releases | MCP reliability debt; Windows sandbox |
| Best Windows experience today | **Qwen Code** (followed by Claude Code) | Least Windows issues in the set; active platform fixes | Still has VS Code connection failures |
| Provider-agnostic, BYO-model flexibility | **OpenCode** | 182👍 for auto-model discovery; Bun/TypeScript | Go subscription outages; early-stage |
| GitHub-native workflow integration | **Copilot CLI** | Fleet subagents, model plan mode, stable core | Zombie processes; tgrep OOM; regressions in recent releases |
| Collaborative, multi-platform IDE tool | **OpenAI Codex** | Paginated history, sub-agent support, Cursor import | Windows WMI storms are temporarily blocking |
| Enterprise with Google Cloud dependency | **Gemini CLI** (short-term) | RCE fix, best evals infrastructure | Product direction uncertain; Antigravity migration |
| Minimal risk / low complexity | **Kimi Code CLI** (not recommended) | Smallest attack surface | Own API rejects tool schemas; effectively abandoned |

**Bottom line:** The AI CLI tools market is in a reliability consolidation phase. Feature velocity is high across the board, but platform stability—especially on Windows—and MCP interoperability are the two gates that will separate long-term winners from also-rans. The most strategically positioned tools (OpenCode, Qwen Code) are those investing in provider-agnostic architectures and user-facing UI/UX while simultaneously addressing the systemic reliability gaps that plague the incumbents.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report
*Data: github.com/anthropics/skills | Snapshot: 2026-07-22*

---

## 1. Top Skills Ranking

The community's most-discussed pull requests reveal a pronounced focus on **skill-creator tooling reliability** and **document format skills**:

1. **#1298 — fix(skill-creator): run_eval.py always reports 0% recall** *(MartinCajiao, OPEN)*  
   Addresses a critical regression where the evaluation script reports `recall=0%` for every description, rendering the optimization loop useless. This PR surfaced `#556` (10+ independent reproductions) and fixes Windows pipe handling and trigger detection logic.  
   → [PR #1298](https://github.com/anthropics/skills/pull/1298)

2. **#514 — Add document-typography skill** *(PGTBoos, OPEN)*  
   A quality-control skill for AI-generated documents: fixes orphan word wrap, widow paragraphs, and numbering misalignment. Community interest stems from the universality of these formatting defects across all Claude document output.  
   → [PR #514](https://github.com/anthropics/skills/pull/514)

3. **#486 — Add ODT skill (OpenDocument text/template creation)** *(GitHubNewbie0, OPEN)*  
   Fills an interoperability gap: creating, filling, and converting `.odt`/`.ods` files for LibreOffice ecosystems. Discussion centered on template-filling ergonomics and HTML round-tripping.  
   → [PR #486](https://github.com/anthropics/skills/pull/486)

4. **#210 — Improve frontend-design skill clarity and actionability** *(justinwetch, OPEN)*  
   A thorough revision ensuring every instruction in the frontend-design skill is actionable within a single conversation. Highlights the community's expectation for skills to be precise execution guides, not reference docs.  
   → [PR #210](https://github.com/anthropics/skills/pull/210)

5. **#83 — Add skill-quality-analyzer and skill-security-analyzer (meta-skills)** *(eovidiu, OPEN)*  
   Two meta-skills for evaluating other skills: quality analysis across five dimensions (structure, documentation, etc.) and security analysis. Signals growing interest in skill governance and quality gates.  
   → [PR #83](https://github.com/anthropics/skills/pull/83)

6. **#1367 — Add self-audit skill: mechanical verification + reasoning audit** *(YuhaoLin2005, OPEN)*  
   A delivery-verification skill that checks claimed output files exist, then performs a four-dimension reasoning audit in damage-severity order. Universal across projects and models. Very recent, actively discussed.  
   → [PR #1367](https://github.com/anthropics/skills/pull/1367)

7. **#723 — Add testing-patterns skill** *(4444J99, OPEN)*  
   Comprehensive testing coverage (Testing Trophy model, unit testing, React Testing Library, E2E patterns). Addresses a clear gap: no dedicated testing guidance existed in the official collection.  
   → [PR #723](https://github.com/anthropics/skills/pull/723)

8. **#525 — Add pyxel skill for retro game development** *(kitao, OPEN)*  
   Integrates with the Pyxel retro game engine MCP server. Notable because it bridges skills with MCP tooling, and is the author's own project—a pattern the community is watching.  
   → [PR #525](https://github.com/anthropics/skills/pull/525)

**Status**: All eight PRs remain **open** and actively receiving comments as of the snapshot date. None have been merged yet, reflecting a high bar for skill inclusion.

---

## 2. Community Demand Trends

From the most-commented issues, five clear demand directions emerge:

| Theme | Key Issues | Signal |
|---|---|---|
| **Security & Trust Boundaries** | #492 *(43 comments)* — Community skills under `anthropic/` namespace enable impersonation, trust boundary abuse | Highest-engagement issue. Demand for namespace governance, signing, or verification badges |
| **Enterprise/Skill Sharing** | #228 *(14 comments)* — Org-wide skill sharing, shared libraries, direct sharing links | Strong backing (7 👍). Current download-and-upload workflow is untenable for teams |
| **Skill-Creator Reliability** | #556, #1169, #1061 *(12-3 comments)* — `run_eval.py` 0% recall, Windows subprocess failures, YAML parsing bugs | Multiple independent reproductions. The tooling pipeline is the top friction point for skill authors |
| **Duplicate Content Management** | #189 *(6 comments)* — `document-skills` and `example-skills` install identical skills | 9 👍. Users want deduplication and clear boundaries between plugin packages |
| **New Domain: Agent Governance** | #412 *(6 comments)* — Safety patterns, policy enforcement, audit trails for AI agent systems | Explicit gap identified: no governance skill exists in the current collection |

**Latent demand areas** from lower-comment issues: compact-memory symbolic notation (#1329), reasoning quality gate pipelines (#1385), and SharePoint/enterprise document handling (#1175).

---

## 3. High-Potential Pending Skills

These PRs combine active discussion, clear utility, and maintainer responsiveness:

| PR | Skill | Why It's High-Potential |
|---|---|---|
| [#1298](https://github.com/anthropics/skills/pull/1298) | skill-creator fix | Addresses the #1 blocker for the entire skill authoring workflow. Multiple prior attempts (#1099, #1050) paved the way |
| [#1367](https://github.com/anthropics/skills/pull/1367) | self-audit | First skill to address output verification. PR author has a companion issue (#1385) for an extended pipeline |
| [#539](https://github.com/anthropics/skills/pull/539) | YAML unquoted description validation | Continues from #361 by same logic; incremental, low-risk, high-defect-prevention value |
| [#1302](https://github.com/anthropics/skills/pull/1302) | color-expert | Narrow scope, well-defined trigger conditions, expertise-level domain coverage |
| [#514](https://github.com/anthropics/skills/pull/514) | document-typography | Solves a universal pain point; discussion is focused on edge cases rather than concept rejection |
| [#525](https://github.com/anthropics/skills/pull/525) | pyxel game development | Distinctive because it ties skills to MCP—a pattern likely to be replicated |

**Observation**: The skill-creator fix PRs (#1298, #1323, #1099, #1050) collectively represent >12,000 words of debugging discussion. The community is investing significant effort to unblock the authoring pipeline.

---

## 4. Skills Ecosystem Insight

**The community's most concentrated demand is for *tooling that makes skills reliable, auditable, and shareable*—specifically fixing the skill-creator evaluation pipeline, adding quality gates (self-audit, security analysis), and enabling enterprise distribution—before expanding into new domain skills like document typography or game development.**

---

# Claude Code Community Digest – 2026-07-22

## Today’s Highlights
- **v2.1.217 shipped** with emoji shortcode autocomplete (type `:heart:` → ❤️) and warnings for transcript write failures or disabled session saving.
- **A cluster of MCP tool-call drop bugs** (#79992, #78826, #79971) is generating alarm: tools are accepted by the model but silently never reach the local server, with no error surfaced to the user.
- The **long-running remote-control reconnection issue** (#34255, 99👍, 57 comments) remains the most-voted open bug, with no fix in sight.

## Releases
- **[v2.1.217](https://github.com/anthropics/claude-code/releases/tag/v2.1.217)** – Emoji shortcode autocomplete in the prompt input (disable via `emojiCompletionEnabled` setting). Added warnings when transcript writes are failing (e.g., disk full) or when session saving is off due to an inher.

## Hot Issues (10 noteworthy)
1. **[#34255](https://github.com/anthropics/claude-code/issues/34255)** – Remote Control automatic reconnection doesn’t work; connection drops silently with no recovery. **99👍, 57 comments.** Top-voted open issue, affects macOS and iOS.
2. **[#25042](https://github.com/anthropics/claude-code/issues/25042)** – Feature request to control auto-scroll behavior when submitting questions. **31👍, 12 comments.** Highly desired UI customization.
3. **[#72215](https://github.com/anthropics/claude-code/issues/72215)** – Fullscreen render mode on Windows: no scrollbar, arrow/PageUp/PageDown keys do nothing once output exceeds one screen. **4👍, 6 comments.** Blocks output review.
4. **[#76357](https://github.com/anthropics/claude-code/issues/76357)** – Windows MSIX update fails with “Another program is currently using this file”; app unlaunchable until reboot. **4👍, 6 comments.** Critical reliability issue for Windows Desktop users.
5. **[#78826](https://github.com/anthropics/claude-code/issues/78826)** – MCP server connects successfully but its tools are never exposed to the model. **0👍, 5 comments.** MCP integration broken for remote HTTP servers (e.g., Gmail MCP).
6. **[#79992](https://github.com/anthropics/claude-code/issues/79992)** – Filesystem-class MCP tool calls silently dropped on macOS between approval gate and local server dispatch. **0👍, 4 comments.** Recent regression (started overnight July 21→22).
7. **[#79921](https://github.com/anthropics/claude-code/issues/79921)** – Claude Code sessions freeze locally until another session receives input (Desktop & VS Code only). **0👍, 3 comments.** Strange concurrency bug, no web repro.
8. **[#75037](https://github.com/anthropics/claude-code/issues/75037)** – Background agent sessions (`claude --bg`): fast termination, worker crash-loop on attach, lost task records. **0👍, 3 comments.** Undermines long-running automation workflows.
9. **[#75757](https://github.com/anthropics/claude-code/issues/75757)** – Subagents billed after monthly spend limit exceeded; false clean review result on agent failures. **0👍, 3 comments.** Billing and trust issue.
10. **[#79606](https://github.com/anthropics/claude-code/issues/79606)** – Sandbox regression in v2.1.216: default `--cap-drop ALL` breaks all Bash on root installs (`write /proc/self/uid_map: Operation not permitted`). **0👍, 1 comment.** Serious regression for root-level deployments.

## Key PR Progress (10 important)
1. **[#80008](https://github.com/anthropics/claude-code/pull/80008) [OPEN]** – Twilight plugin: spec-first design/implement skills with a durable focus stack. Demonstrates a powerful plugin strategy (requires significant rework before acceptance).
2. **[#79898](https://github.com/anthropics/claude-code/pull/79898) [CLOSED]** – AWS gateway deployment example assets for running Claude apps gateway on Amazon Bedrock. Sibling to existing GCP examples.
3. **[#79620](https://github.com/anthropics/claude-code/pull/79620) [OPEN]** – Text-to-speech read-aloud hook for accessibility. Multi-platform (Piper/say/PowerShell), code-skip heuristic, markdown-aware.
4. **[#79645](https://github.com/anthropics/claude-code/pull/79645) [OPEN]** – Fix: read rule and transcript files as UTF-8 (was platform-default cp1252 on Windows). Addresses #77270.
5. **[#79644](https://github.com/anthropics/claude-code/pull/79644) [OPEN]** – Fix: quote `${CLAUDE_PLUGIN_ROOT}` in plugin hook commands – fixes failures when path contains spaces (macOS `~/Library/Application Support/…`).
6. **[#79647](https://github.com/anthropics/claude-code/pull/79647) [OPEN]** – Fix: resolve imports independent of plugin directory name – makes hookify work even if plugin folder is not literally named `hookify`.
7. **[#79873](https://github.com/anthropics/claude-code/pull/79873) [OPEN]** – Fix: `event: prompt` rules never fire – payload key mismatch (`user_prompt` vs `prompt`). Critical for prompt-rule users.
8. **[#79889](https://github.com/anthropics/claude-code/pull/79889) [OPEN]** – Fix: make hook entrypoints runnable without `CLAUDE_PLUGIN_ROOT` – improves plugin development ergonomics.
9. **[#79640](https://github.com/anthropics/claude-code/pull/79640) [OPEN]** – Fix: use `disable-model-invocation` for user-only commands (ralph-wiggum) – corrects erroneous frontmatter key.
10. **[#78532](https://github.com/anthropics/claude-code/pull/78532) [OPEN]** – GCP gateway: optional internal ALB + PG16 Cloud SQL edition fix – makes Terraform example deployable with newer PostgreSQL versions.

## Feature Request Trends
- **UI/UX customization** – Multiple requests for configurable scroll behavior (#25042), system theme following on Linux (#79995), and emoji autocomplete (shipped in v2.1.217).
- **Session cross-linking** – Users want to link Claude Code sessions with claude.ai chats (#76440) for content continuity and context transfer.
- **MCP reliability & transparency** – Calls for better diagnostics when MCP tools are dropped, and for explicit status indicators (many MCP bugs filed this week).
- **Agent/subagent management** – Requests for adjustable subagent token budgets (#78460), clearer billing attribution for subagents, and availability of task tools in interactive sessions (#78769).

## Developer Pain Points
- **MCP tool calls silently dropped** – At least four distinct issues (#79992, #78826, #79971, #80012) report tools being accepted by the model but never reaching the server, or responses lost – a systemic reliability gap weakening the MCP ecosystem.
- **Keyboard/input unresponsiveness** – AskUserQuestion tool fails to accept keyboard or mouse input in multiple terminal UIs (#70577, #79325, #78306) – blocks interactive workflows and frustrates power users.
- **Background agent instability** – Fast session termination, crash-loops on attach, lost completion records (#75037) – undermines confidence in long-running automation and CI/CD use.
- **Subagent token cap too low** – Subagents are capped at 8,000 output tokens while the main loop is not; high-effort thinking tasks exhaust the budget before emitting anything (#78460).
- **Billing confusion** – Subagents billed after spend limit (#75757), Fable 5 unavailable in CLI despite valid Max subscription (#79916, #79687), Max upgrade not reflected in weekly limits (#79773) – trust-eroding billing inconsistencies.
- **Windows-specific regressions** – Update fails requiring reboot (#76357), fullscreen scroll broken (#72215), sandbox regression breaking root installs (#79606) – Windows stability remains a pain point.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-07-22

## Today’s Highlights
Codex 0.145.0 ships with experimental paginated thread history, expanded import from Cursor/Claude Code, and sub-agent support—a major step for long-running collaborative sessions. However, Windows users are experiencing a surge of critical performance regressions: unbounded `taskkill.exe` and `conhost.exe` storms are exhausting WMI, spiking CPU to 100%, and freezing machines. The community has filed multiple duplicates, and the team merged several HTTP-client refactoring PRs today that may underpin future stability fixes.

## Releases

- **`rust-v0.145.0` (stable)** — New features include:
  - Experimental paginated thread history with efficient resume, search, persisted names, sub-agent support, and memories.
  - Expanded `/import` to migrate Cursor and Claude Code settings, MCP servers, plugins, sessions, commands, and project configuration.
- **Alpha releases** `0.145.0-alpha.28`, `alpha.29`, and `alpha.30` — internal testing iterations.

[Full release list](https://github.com/openai/codex)

## Hot Issues (10 most noteworthy)

1. **[#33776 – Windows Desktop spawns hundreds of `taskkill.exe`/`conhost.exe`, causing WMI storms and DWM degradation](https://github.com/openai/codex/issues/33776)**  
   *17 comments, 13 👍*  
   High-severity bug affecting app version 26.707.12708.0. Community reports 287+ orphaned processes that exhaust WMI provider quota. Multiple duplicates follow.

2. **[#34260 – Unbounded `taskkill` cleanup loop exhausts WMI](https://github.com/openai/codex/issues/34260)**  
   *15 comments, 8 👍*  
   Related to #33776 but describes a runaway loop that leaves hundreds of processes alive even after the app is idle. Impact: entire system UI becomes unresponsive.

3. **[#30527 – Windows Codex triggers Microsoft Defender high CPU after update](https://github.com/openai/codex/issues/30527)**  
   *16 comments, 13 👍*  
   Users on Win10 with thin hardware see Behavior Monitoring CPU spikes. Likely caused by repeated file-system scans.

4. **[#29499 – High CPU in WMI Provider Host after startup](https://github.com/openai/codex/issues/29499)**  
   *12 comments, 14 👍*  
   Reproducible on Win11 with Pro x20 subscription. 14 upvotes signal widespread frustration.

5. **[#29911 – Codex creates empty `.git` directories, then repeatedly scans them](https://github.com/openai/codex/issues/29911)**  
   *10 comments, 8 👍*  
   Empty `.agent` folders mistakenly treated as Git repos, triggering infinite Git probes and Defender CPU usage.

6. **[#34014 – Standalone Windows app triggers WMI 90-100% CPU, but VS Code extension works fine](https://github.com/openai/codex/issues/34014)**  
   *9 comments, 7 👍*  
   Same project works in extension; standalone app causes WMI Provider Host saturation. Points to app-specific process-spawning logic.

7. **[#30926 – Kernel token/“Toke” object growth via repeated `git.exe` creation](https://github.com/openai/codex/issues/30926)**  
   *9 comments*  
   ETW traces implicate Codex GUI process in sustained kernel object allocation, potentially a memory leak vector.

8. **[#19504 – Add full RTL (Right-To-Left) text support for Arabic & Hebrew](https://github.com/openai/codex/issues/19504)**  
   *18 comments, 18 👍*  
   Long-standing request with strong community support. Arabic text alignment, punctuation, and reading direction are broken in both Codex and Chat panels.

9. **[#21563 – Inconsistent RTL rendering for Persian/Farsi messages](https://github.com/openai/codex/issues/21563)**  
   *8 comments, 8 👍*  
   Duplicate of #19504 with focus on mixed Persian/English text. Users request a per-language direction setting.

10. **[#28078 – Xcode 27 beta sign-in fails for ChatGPT Pro accounts requiring OTP](https://github.com/openai/codex/issues/28078)**  
    *13 comments, 11 👍*  
    Pro accounts with email OTP cannot sign into Xcode extension, while ChatGPT Go accounts work. Blocks professional Mac developers.

## Key PR Progress (10 important merges)

1. **[#34667 – Document `PathUri` drive letter canonicalization](https://github.com/openai/codex/pull/34667)**  
   Adds clarity for cross-platform path handling, important for Windows sandboxing.

2. **[#34664 – Preserve approvals reviewer when forking threads](https://github.com/openai/codex/pull/34664)**  
   Fixes a regression where forking a persisted thread lost the approvals reviewer assignment.

3. **[#34655 – Honor configured proxy routes for auth refreshes](https://github.com/openai/codex/pull/34655)**  
   Ensures token refresh requests respect system proxy configuration—critical for enterprise environments.

4. **[#34654 – Render turn diffs for foreign environment paths](https://github.com/openai/codex/pull/34654)**  
   Enables diff display when paths come from remote (e.g., Windows) environments, preserving `PathUri` through applied patches.

5. **[#34651 – Migrate core test support to the shared HTTP client](https://github.com/openai/codex/pull/34651)**  
   Moves test infrastructure off direct `reqwest` onto the central `codex-http-client`, reducing tech debt.

6. **[#34650 – Require auth managers to receive routing configuration](https://github.com/openai/codex/pull/34650)**  
   Mandates explicit `AuthRouteConfig` for all auth managers, preventing silent proxy fallback issues.

7. **[#34649 – Propagate resolved proxy policy through auth routing](https://github.com/openai/codex/pull/34649)**  
   Carries the application’s resolved proxy policy into auth requests so they no longer reconstruct defaults independently.

8. **[#34645 – Always assign response item IDs](https://github.com/openai/codex/pull/34645)**  
   Ensures IDs for all response items (streamed, forked, compacted) are stable across history persistence. Foundation for paginated history.

9. **[#34644 – Verify Git plugin SHA checkouts](https://github.com/openai/codex/pull/34644)**  
   Prevents a race where Git interprets a commit SHA as a branch name, delivering an unintended plugin version. Hardens supply-chain integrity.

10. **[#34643 – Migrate login HTTP construction to `HttpClient`](https://github.com/openai/codex/pull/34643)**  
    Final step in moving all raw `reqwest` usage into the shared client abstraction, enabling consistent proxy and diagnostic handling.

## Feature Request Trends

- **Full RTL text direction support** is the most upvoted feature gap (issues #19504, #21563, and earlier duplicates). Users need proper Arabic, Hebrew, and Persian rendering in both the editor and conversation panels.
- **Cross-platform parity** (especially Windows vs. macOS/Linux) remains a top unspoken request: many Windows-specific bugs essentially ask for feature-level equivalence in process management, Git integration, and sandboxing.
- **Persistent, named thread histories** (addressed in 0.145.0) were heavily anticipated. The community expects more granular search and memory controls in future releases.

## Developer Pain Points

- **Windows performance meltdowns** dominate the bug tracker. Unbounded `taskkill.exe` workflows, WMI Provider Host CPU saturation, and `conhost.exe` orphans make the app unusable for many. The ecosystem response (15+ issue duplicates) indicates a systemic regression that requires immediate attention.
- **Git integration is overly aggressive** on Windows: empty `.git` directory creation, repeated `ls-files` scans, `write-tree` polling loops, and kernel token growth all stem from the app’s constant Git probing. Users want configurable scanning intervals or opt-out for large repos.
- **Authentication friction** with Xcode extension + ChatGPT Pro OTP (#28078) and proxy routing gaps (#34655, #34650) frustrate developers who rely on non-default auth flows.
- **Sandbox reliability** issues (e.g., `apply_patch` failures under WindowsApps, elevated sandbox startup failures, and Computer Use plugin session conflicts) reduce trust in automated tool execution.

---

*Generated from GitHub data for `openai/codex` on 2026-07-22.*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest – 2026-07-22

## Today's Highlights
A critical security fix for remote code execution (RCE) in the a2a-server backend landed in today's nightly release. Community frustration continues over the forced transition to the Antigravity ecosystem, with multiple high-traffic issues questioning the CLI's future and citing severe quota/usage regressions. A flurry of infrastructure PRs is also advancing a new automated PR generation pipeline.

## Releases
**v0.52.0-nightly.20260722.gc776c665b** – [Full Changelog](https://github.com/google-gemini/gemini-cli/compare/v0.52.0-nightly.20260721.gacae7124b...v0.52.0-nightly)
- **Security fix**: Enforced workspace trust and task isolation in the a2a-server to prevent zero-click RCE ([PR #28470](https://github.com/google-gemini/gemini-cli/pull/28470)).

## Hot Issues (Top 10 by community impact)

1. **[#27314] – Bring back standalone Gemini CLI or support full legacy workflow with stable OAuth**  
   Comments: 11 | 👍: 3  
   The most upvoted feature request. Users are frustrated by the forced unification into the Antigravity ecosystem, calling it a "severe regression." The author wants the lightweight CLI restored or at least a stable OAuth path that doesn't require Antigravity.  
   [Issue Link](https://github.com/google-gemini/gemini-cli/issues/27314)

2. **[#19979] – Migrate policy configuration from TOML to CUELang**  
   Comments: 10 | 👍: 0  
   Enterprise users argue that TOML hits fundamental limits for complex policies, pushing for CUELang as a proper policy language. Despite no upvotes, the discussion is active and includes detailed technical arguments.  
   [Issue Link](https://github.com/google-gemini/gemini-cli/issues/19979)

3. **[#20990] – MCP OAuth2.1 Dynamic client registration fails**  
   Comments: 9 | 👍: 1  
   A blocking bug for MCP server integrations: the `registrationUrl` is dropped during WWW-Authenticate discovery, preventing dynamic client registration per RFC 8414.  
   [Issue Link](https://github.com/google-gemini/gemini-cli/issues/20990)

4. **[#27265] – Gemini CLI will soon be replaced by Antigravity CLI? (Chinese)**  
   Comments: 7 | 👍: 0  
   A user asks (in Chinese) whether Gemini CLI is being killed and if quota will become as restrictive as Antigravity's. Reflects widespread anxiety among non-English-speaking users.  
   [Issue Link](https://github.com/google-gemini/gemini-cli/issues/27265)

5. **[#27191] – Quota shows 100% used without actual usage**  
   Comments: 6 | 👍: 2  
   High frustration: CLI stops responding even when no requests are made. Screenshots show a false full quota bar. P2 platform bug affecting productivity.  
   [Issue Link](https://github.com/google-gemini/gemini-cli/issues/27191)

6. **[#27187] – Client-side 429 routing loop causes runaway token consumption**  
   Comments: 3 | 👍: 0  
   Critical bug on paid Tier 1 AI Studio keys: hitting server capacity triggers an infinite retry loop, burning tokens and exhausting billing caps. P2 agent area.  
   [Issue Link](https://github.com/google-gemini/gemini-cli/issues/27187)

7. **[#25166] – Shell command execution gets stuck with "Waiting input" after completion**  
   Comments: 4 | 👍: 3  
   A P1 core bug: simple CLI commands hang while the UI displays "Awaiting user input" even though the command has finished. High reproducibility.  
   [Issue Link](https://github.com/google-gemini/gemini-cli/issues/25166)

8. **[#27205] – Aggressive scanning of .venv in custom skills (ignores .gitignore)**  
   Comments: 5 | 👍: 0  
   When developing Python skills with `uv`, the `.venv` directory is automatically shared with the model, bypassing ignore files. P2 agent bug.  
   [Issue Link](https://github.com/google-gemini/gemini-cli/issues/27205)

9. **[#27356] – Keep Google One for Gemini CLI**  
   Comments: 3 | 👍: 4  
   A sentiment-driven request: users want Gemini CLI to remain in Google One subscriptions because "Antigravity limits are unusable." The highest emoji ratio signals strong feeling.  
   [Issue Link](https://github.com/google-gemini/gemini-cli/issues/27356)

10. **[#27327] – Will Gemini CLI be maintained?**  
    Comments: 3 | 👍: 0  
    Directly references [Google's blog post](https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/) announcing the transition. Users seek clarity on whether the open-source project will continue.  
    [Issue Link](https://github.com/google-gemini/gemini-cli/issues/27327)

## Key PR Progress (Top 10 by significance)

1. **[#28470] – fix(a2a-server): enforce workspace trust and task isolation to prevent RCE** (CLOSED, size/xl)  
   Merged into the nightly release. Rewrites the a2a-server backend to prevent zero-click RCE and environment poisoning in untrusted workspaces.  
   [PR Link](https://github.com/google-gemini/gemini-cli/pull/28470)

2. **[#28403] – fix(core): block $VAR and ${VAR} variable expansion bypass** (OPEN, P1/security, size/m)  
   Fixes incomplete checks in `detectBashSubstitution()` and `detectPowerShellSubstitution()` that allowed variable expansion to circumvent the security gate for GHSA-wpqr-6v78-jr5g. Includes CI hardening.  
   [PR Link](https://github.com/google-gemini/gemini-cli/pull/28403)

3. **[#28401] – fix(shell): bound command output sent to the model** (OPEN, P1/agent, size/m)  
   Places an upper bound on shell command output forwarded to the model, preventing token blowup from large outputs (e.g., `find /`, verbose builds).  
   [PR Link](https://github.com/google-gemini/gemini-cli/pull/28401)

4. **[#28472] – fix(core): sequentially verify cached credentials and restore GOOGLE_APPLICATION_CREDENTIALS fallback** (OPEN, size/m)  
   Resolves a critical authentication fallback regression in Gemini Code Assist Agent Mode that caused fatal exit code 41 in VS Code.  
   [PR Link](https://github.com/google-gemini/gemini-cli/pull/28472)

5. **[#28469] – fix(core): rotate session ID on model fallback to prevent stateful API errors** (OPEN, size/m)  
   Rotates the active session ID when falling back to `gemini-2.5-flash`, fixing a `"Please submit a new query to continue with the Flash model"` blocking error.  
   [PR Link](https://github.com/google-gemini/gemini-cli/pull/28469)

6. **[#28305] – feat(evals): add tool call formatter and integrate failure summaries** (CLOSED, size/l)  
   Introduces a numbered timeline of agent tool calls (with arguments, status, errors) directly in console failure output – significantly improving debug experience for eval failures.  
   [PR Link](https://github.com/google-gemini/gemini-cli/pull/28305)

7. **[#28169] – feat(evals): add eval coverage report command** (CLOSED, size/l)  
   Adds `eval:coverage` command to report what built-in tools are covered by behavioral evals. Cross-references eval inventory with tool registry.  
   [PR Link](https://github.com/google-gemini/gemini-cli/pull/28169)

8. **[#28433] – feat(pr-generator-orchestrator): implement iterative bug-fixing state machine and container worker entrypoint** (OPEN, size/l)  
   Part of a new SSR pipeline: coordinates Firestore locking, AI coding/eval loops, ESLint analysis, diff limit verification, and auto-PR creation.  
   [PR Link](https://github.com/google-gemini/gemini-cli/pull/28433)

9. **[#28411] – feat(caretaker-triage): post comment before auto-closing issues** (OPEN, size/s)  
   Improves bot transparency: posts an explanatory comment before attaching the `auto-close` label, giving users a path to reopen if misclassified.  
   [PR Link](https://github.com/google-gemini/gemini-cli/pull/28411)

10. **[#28474] – feat(core): add skill name dimension to tool call telemetry** (OPEN, P3/enterprise, size/m)  
    Addresses long-standing request [#18189](https://github.com/google-gemini/gemini-cli/issues/18189) by adding a `skill_name` dimension to tool call metrics.  
    [PR Link](https://github.com/google-gemini/gemini-cli/pull/28474)

## Feature Request Trends
- **Standalone/legacy workflow preservation**: Multiple issues (#27314, #27356, #27327) explicitly ask to keep the old CLI working independently of Antigravity, citing restrictive quotas and broken UX.
- **Policy language evolution**: #19979 (TOML→CUELang) and #27185 (custom external safety checkers) signal enterprise demand for more expressive, programmable policy engines.
- **Better agent observability**: #27162 (routing logs), #26522 (Auto Memory retry behavior), and #19259 (regex in skills) all point to a need for more transparent agent decision-making.
- **Eval infrastructure expansion**: PRs #28305 and #28169 suggest the team is investing in comprehensive evaluation tooling, a trend echoed by the EPIC #24353 (component-level evaluations).

## Developer Pain Points
1. **Antigravity transition anxiety** – The most vocal pain: users fear the CLI is being deprecated and that quota/limits will become unusable (#27314, #27265, #27327).
2. **Quota/429 instability** – Bugs showing phantom full quota (#27191) and infinite retry loops on 429s (#27187) directly block daily work.
3. **Shell execution reliability** – Hanging commands (#25166) and broken `&&` on Windows (#27097) erode trust in the agent's ability to run simple tasks.
4. **OAuth/token management** – Silent token refresh failures (#21956), failed MCP OAuth (#20990), and credential fallback regressions (#28472) disrupt long-running sessions.
5. **Ignored ignore files** – The agent repeatedly violating `.gitignore`/`.geminiignore` (#27205) causes accidental large context uploads and wasted tokens.
6. **Session and state bugs** – Resumed sessions missing shell output (#21066), session ID not rotating on fallback (#28469), and Auto Memory retrying low-signal sessions (#26522) all degrade the user experience.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest – 2026-07-22

## Today's Highlights
Version **1.0.74-0** shipped with a new `/model plan` command to pick a model while in plan mode, plus improved resume search matching. Community attention remains focused on MCP (Model Context Protocol) integration gaps, a regression in plan-mode shell execution, and multiple reliability issues (zombie processes, OOM crashes, stuck loaders) that are eroding developer trust in recent releases.

## Releases
**v1.0.74-0** (released within the last 24h)  
- **Added** – `/model plan` (or `/model --plan`) to select a model for plan mode; pass a model id, `off` to clear, or no id to open a picker. Reverts to the session model when leaving plan mode.  
- **Improved** – Resume search now matches session titles even when whitespace differs.  

[View release](https://github.com/github/copilot-cli/releases/tag/v1.0.74-0)

## Hot Issues (10 noteworthy)
1. **[#1305](https://github.com/github/copilot-cli/issues/1305) – Support CIMD for Remote OAuth MCP Servers**  
   *High demand (👍26)* – Remote MCP servers protected by OAuth need Dynamic Client Registration (DCR) support. Without it, enterprise setups requiring device-code flows are blocked.  
2. **[#2282](https://github.com/github/copilot-cli/issues/2282) – [CLOSED] Not Able to connect to MCP servers**  
   *11 comments* – Windows users hitting “Failed to connect to MCP server” errors, especially after using WinGet. Closed but root cause may reappear in new versions.  
3. **[#4188](https://github.com/github/copilot-cli/issues/4188) – Regression on plan-mode**  
   *2 👍, 3 comments* – Latest release blocks shell commands in plan mode (e.g., `gh` CLI), which were previously allowed. Community calls this a regression that breaks workflows.  
4. **[#2193](https://github.com/github/copilot-cli/issues/2193) – Default model configuration for /fleet subagents**  
   *14 👍* – Users want the ability to set a default model for fleet subagents globally or per project, avoiding repetitive prompt tuning.  
5. **[#4012](https://github.com/github/copilot-cli/issues/4012) – BYOK: reasoning effort not supported for model "glm-5.2:cloud"**  
   *17 👍* – When using a custom BYOK model, the `--reasoning-effort max` flag fails with an error. Points to a gap in BYOK configuration validation.  
6. **[#4183](https://github.com/github/copilot-cli/issues/4183) – Auto-compaction does not prevent CAPI 5 MB failure**  
   *5 👍* – Long sessions can hit the independent 5 MB body limit even when context-token capacity is fine. Auto‑compaction doesn’t address this, causing permanent failure.  
7. **[#4163](https://github.com/github/copilot-cli/issues/4163) – Zombie processes accumulate under copilot PID**  
   *0 👍 but critical* – Child processes left as zombies (~2/min) after each tool execution. Impact grows with session length, risking PID exhaustion.  
8. **[#3976](https://github.com/github/copilot-cli/issues/3976) – Native `tgrep` indexer OOM-kills the host**  
   *0 👍* – The trigram indexer daemon can consume unbounded memory on large monorepos, leading to host OOM kills. No memory cap exists.  
9. **[#4206](https://github.com/github/copilot-cli/issues/4206) – Environment footer stuck on “Loading:” forever**  
   *2 👍, 1 comment* – New triage issue: the status footer never completes when the built-in GitHub MCP handshake stalls under org MCP policy. Affects 1.0.73 on macOS.  
10. **[#1518](https://github.com/github/copilot-cli/issues/1518) – Support MCP resources and prompts**  
    *14 👍* – MCP servers offer three primitives (tools, resources, prompts); Copilot CLI only implements tools. Community strongly requests full MCP parity.

## Key PR Progress
Only one pull request was updated in the last 24 hours:  
- **[#3163](https://github.com/github/copilot-cli/pull/3163) – ViewSonic monitor** (author: tijuks)  
  *Created 2026-05-06, last updated 2026-07-21* – This PR appears to be a stray or test submission (description references “initiate GitHub action //runners” with no relation to CLI code). No meaningful code changes to report today.

## Feature Request Trends
The most-requested feature directions from the issue tracker:

- **MCP expansion** – Support for MCP resources/read, prompts, subscriptions, and OAuth refresh‑token flows ([#1518](https://github.com/github/copilot-cli/issues/1518), [#1803](https://github.com/github/copilot-cli/issues/1803), [#3073](https://github.com/github/copilot-cli/issues/3073), [#1305](https://github.com/github/copilot-cli/issues/1305), [#4203](https://github.com/github/copilot-cli/issues/4203)).
- **Model customization** – Per‑subagent default model settings ([#2193](https://github.com/github/copilot-cli/issues/2193)), BYOK reasoning-effort parity ([#4012](https://github.com/github/copilot-cli/issues/4012)), and handling `reasoning_content` in streaming responses ([#4196](https://github.com/github/copilot-cli/issues/4196)).
- **Agent improvements** – Aliases for `skill` tool in custom agents ([#4209](https://github.com/github/copilot-cli/issues/4209)), inline agent chaining ([#4208](https://github.com/github/copilot-cli/issues/4208)), and per‑agent credit usage breakdown ([#4207](https://github.com/github/copilot-cli/issues/4207)).
- **File/runtime discovery** – Extend `.agents` conventions to instructions, hooks, and non‑Git folders ([#4204](https://github.com/github/copilot-cli/issues/4204)).
- **Retry configuration** – Make Autopilot request‑error retry count configurable ([#4210](https://github.com/github/copilot-cli/issues/4210)).

## Developer Pain Points
Recurring frustrations from the community:

- **Regressions** – Plan‑mode shell execution blocked in recent versions ([#4188](https://github.com/github/copilot-cli/issues/4188)) and broken `view` tool in 1.0.73 ([#4202](https://github.com/github/copilot-cli/issues/4202)).
- **MCP reliability** – Connection failures on Windows ([#2282](https://github.com/github/copilot-cli/issues/2282)), stalled loading from org policies ([#4206](https://github.com/github/copilot-cli/issues/4206)), BigInt serialization errors ([#4211](https://github.com/github/copilot-cli/issues/4211)), and OAuth refresh not silently exercised ([#4203](https://github.com/github/copilot-cli/issues/4203)).
- **Resource exhaustion** – Zombie processes ([#4163](https://github.com/github/copilot-cli/issues/4163)), tgrep OOM ([#3976](https://github.com/github/copilot-cli/issues/3976)), and CAPI 5 MB body limit not mitigated by auto‑compaction ([#4183](https://github.com/github/copilot-cli/issues/4183)).
- **Terminal/UI issues** – Dark‑on‑dark rendering in tmux ([#4212](https://github.com/github/copilot-cli/issues/4212)), dropped key events when pane loses focus ([#4213](https://github.com/github/copilot-cli/issues/4213)), and eternal loading spinner ([#4214](https://github.com/github/copilot-cli/issues/4214), [#4215](https://github.com/github/copilot-cli/issues/4215)).
- **BYOK & enterprise** – Billing entity not selected blocking memory saves ([#4005](https://github.com/github/copilot-cli/issues/4005)), registry policy rejecting required runtime headers ([#4205](https://github.com/github/copilot-cli/issues/4205)), and missing tiktoken file in remote‑SSH scenarios ([#4201](https://github.com/github/copilot-cli/issues/4201)).

*Community digest compiled from github.com/github/copilot-cli on 2026-07-22.*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

Here is the **Kimi Code CLI Community Digest** for **2026-07-22**.

---

## Kimi Code CLI Community Digest | 2026-07-22

**1. Today's Highlights**

Today was a slow day on the release front, but the community surfaced a critical API integration bug: the Moonshot API is rejecting MCP tool schemas due to format mismatches. Meanwhile, a new PR aims to fix a blocking issue in shell mode, where detached child processes cause the CLI to hang indefinitely.

**2. Releases**

No new releases in the last 24 hours. The latest stable version remains **1.49.0**.

**3. Hot Issues (5 of 5 total)**

The following issues were updated in the last 24 hours, covering API compatibility, UI rendering bugs, and model performance regressions.

- **[#2531] MCP tool names & schemas rejected by Moonshot API (HTTP 400)**
    - **What:** The Moonshot API rejects tool definitions with invalid JSON schemas (specifically `anyOf` formatting). The fix requires client-side sanitization.
    - **Why it matters:** This is a critical blocker for any developer using MCP tools or non-trivial function schemas with the K3 model.
    - **Reaction:** 1 comment, no upvotes yet, but high priority due to API error volume.
    - **[Link](https://github.com/MoonshotAI/kimi-cli/issues/2531)**

- **[#2474] [bug] CLI interface constantly shakes/re-renders entire conversation**
    - **What:** On Linux (x86_64), the terminal UI flickers and re-renders the full conversation history, making the CLI unusable.
    - **Why it matters:** A severe UX regression affecting version 0.19.2. Likely related to terminal diffing or rendering loops.
    - **Reaction:** 2 upvotes, indicating multiple users affected. Low comment count suggests the root cause is not yet clear.
    - **[Link](https://github.com/MoonshotAI/kimi-cli/issues/2474)**

- **[#2529] [bug] Numpad number keys not working on Windows**
    - **What:** The numeric keypad (NumPad) on Windows keyboards does not register input in the CLI, likely due to unbound keycodes.
    - **Why it matters:** A platform-specific input bug that breaks common developer workflows on Windows.
    - **Reaction:** No upvotes yet, but reported on the latest version (0.28.1) with a clear reproduction path.
    - **[Link](https://github.com/MoonshotAI/kimi-cli/issues/2529)**

- **[#2528] [bug] Shell mode output is too long**
    - **What:** Running `!` in shell mode produces excessively long, unformatted output (possibly stderr from Git or CLI itself).
    - **Why it matters:** Breaks the shell mode experience, making it harder to parse command results.
    - **Reaction:** Reported against `k3` model on Windows. No upvotes yet.
    - **[Link](https://github.com/MoonshotAI/kimi-cli/issues/2528)**

- **[#2527] [bug] K2.5 tool calling completely broken + infinite loop in goal mode**
    - **What:** The K2.5 model fails to execute any tool calls, returning "Tool not found" for all formats. This also causes an infinite loop in goal mode.
    - **Why it matters:** A fundamental regression for K2.5 users. Goal mode is unusable without working tool calling.
    - **Reaction:** Reported with a detailed reproduction path, but no upvotes yet.
    - **[Link](https://github.com/MoonshotAI/kimi-cli/issues/2527)**

**4. Key PR Progress (1 of 1 total)**

- **[#2530] fix(shell): stop blocking until timeout when a detached child holds the pipes**
    - **What:** Fixes a race condition where the shell mode waits indefinitely for stdout/stderr from a detached child process (e.g., `some_daemon & echo done`), instead of respecting the exit code of the main command.
    - **Why it matters:** This resolves a common annoyance where backgrounded processes in shell mode cause the entire CLI to hang until the default timeout expires.
    - **Reaction:** 0 comments, opened by `ayaangazali`. Linked to issue #2468.
    - **[Link](https://github.com/MoonshotAI/kimi-cli/pull/2530)**

**5. Feature Request Trends**

No explicit feature requests were filed today. However, the data reveals an implicit demand for:
- **Robust tool calling compatibility** across all models (K2.5, K3).
- **Stable terminal UI rendering** (no flickering on Linux).
- **Better shell mode output handling** (truncation/formatting).

**6. Developer Pain Points**

- **API Schema Strictness:** The Moonshot API is rejecting valid but non-standard JSON schemas (e.g., `anyOf`). Developers need explicit documentation or client-side sanitization to avoid 400 errors.
- **Model-Specific Regressions:** K2.5 users are facing total tool calling failure and infinite loops, suggesting a dependency mismatch between the CLI's execution engine and the model's tool output format.
- **Windows Input Gaps:** The NumPad key issue highlights that keyboard input is not fully abstracted across platforms.
- **Shell Mode Deadlock:** Until PR #2530 is merged, any shell command that spawns a detached process will cause the CLI to block until the timeout expires.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — July 22, 2026

## Today's Highlights

A surge of reports indicates a widespread **OpenCode Go subscription outage** — users on the Go plan consistently receive `Request blocked by upstream provider` errors across multiple models, while free-tier models continue to work without issue (issues #38216, #38195, #38218, #38219). Separately, community discussion around the **layout transition remains heated**, with fresh complaints that Web profiles can't opt out of the new tabs-on-top layout and that workspaces/worktrees are entirely missing from it (#37012, #37546, #38124). On the fix side, several promising PRs landed or advanced today, including a **clock-skew response loop fix** (#38213), a **malformed patch hunk rejection** (#38188), and a **tool progress liveliness rework** (#38217).

---

## Releases

*No new releases in the last 24 hours.*

---

## Hot Issues (10 selected)

1. **Memory Megathread** (#20695) — 119 comments, 90 👍  
   *Ongoing since April.* The central collection point for heap-snapshot-based memory debugging. Maintainers explicitly ask users not to suggest LLM-generated solutions. Still active daily with new snapshot attachments.  
   → [Issue #20695](https://github.com/anomalyco/opencode/issues/20695)

2. **Keep Legacy Layout Option** (#37012) — 27 comments, 27 👍  
   *Opened July 15.* Strong sentiment for preserving the old single-window layout. Users cite easy access to all features from the main window and workspace/worktree support as missing in the new layout.  
   → [Issue #37012](https://github.com/anomalyco/opencode/issues/37012)

3. **Auto-discover Models from OpenAI-compatible Providers** (#6231) — 26 comments, 182 👍  
   *Opened December 2025.* The highest-voted open feature request. Users want automatic model discovery from local providers (LM Studio, Ollama) instead of manually listing models in `opencode.json`. Massive upvote count suggests broad demand.  
   → [Issue #6231](https://github.com/anomalyco/opencode/issues/6231)

4. **Auto-compaction Loop Prevents Responses** (#30680) — 15 comments, *closed today*  
   *Critical bug.* OpenCode enters a compaction loop even in empty folders, consuming tokens and never generating responses. The closure (noted as closed today) suggests a fix may have been shipped or is pending verification.  
   → [Issue #30680](https://github.com/anomalyco/opencode/issues/30680)

5. **Error: no such column: name** (#31119) — 14 comments, 15 👍  
   *SQLite schema regression.* Users returning after a version update hit a DB migration error that renders the app unusable. Affects v1.16.2 — a potentially wide-impact bug if many users are on that version.  
   → [Issue #31119](https://github.com/anomalyco/opencode/issues/31119)

6. **Go Subscription Paid but Shows "Insufficient Balance"** (#37790) — 10 comments  
   *Payment/billing bug.* Stripe payment succeeded but workspace balance not updated. Likely a webhook or fulfillment race condition. Blocking paid users from the service.  
   → [Issue #37790](https://github.com/anomalyco/opencode/issues/37790)

7. **WSL Notification Server Crash on Desktop Launch** (#37481) — 7 comments, *closed today*  
   *Windows-specific.* Desktop app fatally errors when a persisted tab references a WSL sidecar that hasn't finished booting. Leaves the app in a blank/dead state.  
   → [Issue #37481](https://github.com/anomalyco/opencode/issues/37481)

8. **Swap Left/Right Panel Layout** (#16349) — 6 comments, 10 👍  
   *UX request.* Users want the ability to move the chat panel from left to right (or vice versa). Two PRs (desktop + TUI) are open and linked to this issue, indicating maintainer buy-in.  
   → [Issue #16349](https://github.com/anomalyco/opencode/issues/16349)

9. **Display Total Cost for Session** (#4925) — 10 comments, 9 👍, *closed today*  
   *Feature tracking.* Users want combined cost display for sub-agent sessions (currently only primary agent tokens shown). The closure suggests this may have been implemented or deprioritized in favor of a broader metrics redesign.  
   → [Issue #4925](https://github.com/anomalyco/opencode/issues/4925)

10. **Tool Calls Fail with SchemaError on Anthropic Provider** (#34652) — 5 comments  
    *Provider-specific bug.* `todowrite` and similar tools fail when Anthropic returns nested array arguments as JSON strings instead of real arrays. Not reproducible with OpenAI. Affects all built-in tools with array parameters.  
    → [Issue #34652](https://github.com/anomalyco/opencode/issues/34652)

---

## Key PR Progress (10 selected)

1. **fix: stop clock-skew response loops** (#38213) — *Opened today* by quark-zju  
   Closes two issues (#24476, #25270). Prevents server from confusing client and server clock differences for malicious behavior, which was causing infinite response retry loops.  
   → [PR #38213](https://github.com/anomalyco/opencode/pull/38213)

2. **fix(session): edge-trigger build-switch reminder** (#38067) — *Updated today* by Duo-Huang  
   Closes #38066. Instead of scanning full session history for "operational mode has changed" reminders, uses an edge-trigger approach — much more efficient for long sessions.  
   → [PR #38067](https://github.com/anomalyco/opencode/pull/38067)

3. **fix: make tool progress live-only** (#38217) — *Opened today* by kitlangton  
   Renders running tool progress as a live replacement snapshot (not durable session history). Suppresses unchanged shell snapshots. Improves deterministic shell fixture performance from 36.8s to 0.4s.  
   → [PR #38217](https://github.com/anomalyco/opencode/pull/38217)

4. **fix(core): reject malformed patch hunks** (#38188) — *Updated today* by rekram1-node  
   Rejects invalid add/delete/update hunk body lines with specific errors instead of silently skipping them. Addresses a class of silent corruption bugs in codegen.  
   → [PR #38188](https://github.com/anomalyco/opencode/pull/38188)

5. **fix(opencode): use Bun.serve for HTTP on native Windows** (#38225) — *Opened today* by zzzhang1127  
   Closes #38220. Replaces `node:http.createServer()` with `Bun.serve()` because Node's HTTP server under Bun can bind a port without accepting connections on Windows.  
   → [PR #38225](https://github.com/anomalyco/opencode/pull/38225)

6. **feat(desktop): add setting to swap panel layout side** (#34419) — *Updated today* by ultrinnan  
   Closes #16349 (desktop portion). Adds a toggle in Settings → Appearance to swap chat and editor panels. Uses `md:flex-row-reverse` — desktop-only.  
   → [PR #34419](https://github.com/anomalyco/opencode/pull/34419)

7. **feat(tui): add sidebar_position config option** (#18497) — *Updated today* by amosbird  
   Closes #16349 (TUI portion). Adds `sidebar_position` to `tui.json` to move sidebar left or right. Includes documentation updates.  
   → [PR #18497](https://github.com/anomalyco/opencode/pull/18497)

8. **fix(provider): route MiniMax M3 thinking controls** (#38214) — *Opened today* by rekram1-node  
   Sends NVIDIA and Lilac MiniMax M3 thinking toggles through `chat_template_kwargs.thinking_mode`. Preserves existing `thinking.type: adaptive` for direct MiniMax and passthrough providers.  
   → [PR #38214](https://github.com/anomalyco/opencode/pull/38214)

9. **fix(app): show shell output while a command runs** (#37097) — *Updated today* by HopelessLoop  
   Expands shell tool output by default while running (previously collapsed with only a spinner). After completion, it collapses back. Matches existing TUI behavior.  
   → [PR #37097](https://github.com/anomalyco/opencode/pull/37097)

10. **fix(desktop): use custom titlebar on Linux** (#37620) — *Updated today* by cyrasafia  
    Closes #36225. Extends custom titlebar configuration to Linux Electron windows (previously only macOS/Windows). Replaces native GTK decorations.  
    → [PR #37620](https://github.com/anomalyco/opencode/pull/37620)

---

## Feature Request Trends

- **Layout Flexibility**: The most vocal community demand right now. Users want the option to keep the legacy single-window layout (#37012, 27 comments, 27 👍) AND the ability to swap left/right panel positioning (#16349, 10 👍). New tab-on-top layout is particularly contentious on Web where there's no revert UI and no workspace/worktree support (#37546).

- **Model Management UX**: #6231 (182 👍) — auto-discover models from OpenAI-compatible providers — is the single most-upvoted open issue. Additionally, #38228 (opened today) requests custom model ordering, aliases, favorites, and default model setting. Together they represent a desire for better multi-provider model management.

- **Session UX Improvements**: #37381 asks for a prompt queue and interrupt controls in the composer. #37054 (PR) adds "full session fork" option to the web fork dialog. #4925 (now closed) requested session cost display for sub-agents. Users want more control and transparency in long sessions.

- **Workspaces/Worktrees on Web**: #37546 highlights that the new layout on Web completely lacks git worktree support — a critical feature for users managing multiple branches simultaneously.

---

## Developer Pain Points

- **OpenCode Go Subscription Outage**: The dominant pain point today. Multiple users report that Go-tier models fail with `Request blocked by upstream provider` / `401 AuthError` / `Upstream request failed` while free models work (#38195, #38216, #38218, #38219, #38209). Some users also see billing mismatches where Stripe payment succeeded but balance shows insufficient (#37790). This suggests either a proxy routing issue, API key validation problem, or upstream provider configuration change on the Go proxy side.

- **Settings Not Persisting / Not Applying**: #38154 reports that the "Auto-accept permissions" toggle in Settings → General has no runtime effect. Combined with #37481 (WSL sidecar crash) and #30680 (auto-compaction loop), there's a pattern of settings-store bugs that users find deeply frustrating — settings appear correct but the app behaves differently.

- **Provider Schema Incompatibilities**: #34652 (Anthropic nested JSON arrays), #33041 (Google numeric enum values), and #35181 (MiniMax thinking type values) all show that provider-specific schema quirks cause hard failures. The community would benefit from a more robust schema normalization layer.

- **Desktop/Web Feature Parity Gaps**: The new layout rollout exposed that Web is missing features that Desktop has (workspaces, layout revert toggle). Desktop itself has platform-specific gaps — Linux custom titlebar (#37620) and WSL notification server (#37481) are recent examples. Users expect consistent behavior across all platforms.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

Here is the Qwen Code community digest for 2026-07-22, based on the provided GitHub data.

---

## Qwen Code Community Digest – 2026-07-22

### 1. Today's Highlights

Today marks the release of **v0.20.1**, a stable minor version featuring a new label-driven autofix mechanism and a major overhaul of the cross-platform CUA driver. A critical bug fix addresses the **subagent model context overflow** issue (#7156), where the main session's model was silently mutated by subagent execution, a persistent pain point. On the infrastructure side, a new **CODEOWNERS intelligence router** (#7469) is proposed to streamline the core review process by replacing a broad maintainer list with an automated, change-aware routing system.

### 2. Releases

Three releases were published in the last 24 hours:

- **[v0.20.1](https://github.com/QwenLM/qwen-code/releases/tag/v0.20.1)**: A significant stable release. Highlights include:
    - **Feature**: `feat(autofix): label-driven takeover and release; fix forced-dispatch green no-op` (#7165). This introduces a more intelligent, label-based system for triggering automated fix PRs (autofix).
    - **Feature**: **`cua-driver-rs-v0.7.3`**: A new version of the Computer Use Agent (CUA) driver is now vendored. It provides prebuilt binaries for macOS (codesigned + notarized), Linux (x86_64 & arm64), and Windows (x86_64 & arm64), with enhanced relative-coordinate support. No breaking changes are reported.
- **[v0.20.0-preview.0]()** & **[v0.20.0-nightly.20260722.b98306b7e]()**: Both contain a single patch: `test(telemetry): Cover daemon metrics init ordering and document metricReader asymmetry` (#7456).

### 3. Hot Issues (Top 10)

Here are the most critical issues discussed in the last 24 hours, sorted by community engagement:

1.  **[#7156 [CLOSED] Bug: Subagent mutates main session model — context overflow recurrence](https://github.com/QwenLM/qwen-code/issues/7156)**
    - *Significance:* This was a high-priority (P1) bug where a fix for model-override clearing (#7119) was incomplete. The subagent’s model silently overrode the main session's model, leading to context overflow errors. The closure indicates a root cause fix is in place.
    - *Comments:* 11

2.  **[#7316 [CLOSED] Bug: OpenAI toolCall incompatibility with subAgent tool](https://github.com/QwenLM/qwen-code/issues/7316)**
    - *Significance:* A critical cross-platform issue: the `working_dir` or `isolation` schema sent to OpenAI-compatible models causes tool calls to fail with mutually exclusive fields, completely breaking subagent functionality for non-Qwen providers.
    - *Comments:* 5

3.  **[#7056 [OPEN] VS Code Extension Connection Failure](https://github.com/QwenLM/qwen-code/issues/7056)**
    - *Significance:* A recurring and frustrating issue for Windows users. The Qwen ACP process for the VS Code companion extension exits unexpectedly (exit 0), with a known workaround being requested.
    - *Comments:* 5

4.  **[#7306 [OPEN] Harden tool-output budgeting, observability, and artifact lifecycle](https://github.com/QwenLM/qwen-code/issues/7306)**
    - *Significance:* A major umbrella issue for Phases 2–4 of system hardening. Phase 1 is merged (#7323), but further work is needed on wire-level observability and budget evolution to prevent runaway tool outputs.
    - *Comments:* 4

5.  **[#7427 [OPEN] Web-Shell Artifact Panel Error Spam](https://github.com/QwenLM/qwen-code/issues/7427)**
    - *Significance:* A pure UI bug causing persistent error toasts ("Load artifacts failed") on the artifact panel. This degrades the user experience significantly during session auto-refresh.
    - *Comments:* 4

6.  **[#5540 [OPEN] Allow resuming a completed background sub-agent](https://github.com/QwenLM/qwen-code/issues/5540)**
    - *Significance:* A long-standing feature request blocking complex agent workflows. Currently, `send_message` to a completed agent fails. This feature is necessary for stateful, long-running automation.
    - *Comments:* 4

7.  **[#7287 [OPEN] Auto-memory MEMORY.md not registered in FileReadCache](https://github.com/QwenLM/qwen-code/issues/7287)**
    - *Significance:* A subtle bug affecting the auto-memory system. The model reads `MEMORY.md` but the session doesn't register the read, causing the first `write_file` to be rejected. This breaks the fundamental "read, then write" workflow.
    - *Comments:* 3

8.  **[#7332 [CLOSED] BadRequestError with thinking-only models](https://github.com/QwenLM/qwen-code/issues/7332)**
    - *Significance:* A high-priority (P1) compatibility bug. Internal operations (like context compaction) force `enable_thinking=false` on models that *require* thinking, causing a 400 error.
    - *Comments:* 2

9.  **[#7472 [OPEN] DingTalk Integration: Preserve non-bot mention metadata](https://github.com/QwenLM/qwen-code/issues/7472)**
    - *Significance:* For enterprise users using the DingTalk integration, bot messages that also mention other users lose the `@name` text. This is a data-privacy and context-corruption issue for group chats.
    - *Comments:* 1

10. **[#7452 [OPEN] cronParser deviation from vixie semantics](https://github.com/QwenLM/qwen-code/issues/7452)**
    - *Significance:* A classic edge-case bug: the cron parser documents "vixie" behavior but deviates for `*/N` step schedules in the day-of-week/month fields, which could cause unexpected scheduling behavior for automated tasks.
    - *Comments:* 2

### 4. Key PR Progress (Top 10)

These pull requests represent the most impactful code changes currently in development or recently merged.

1.  **[#7469 [OPEN] feat(ci): replace broad CODEOWNERS with intelligent core review router](https://github.com/QwenLM/qwen-code/pull/7469)**
    - *Feature/Analysis:* Replaces a static list of 4 maintainers for `packages/core` with a GitHub Action. The system analyzes the changes and routes review requests to the most relevant maintainer, reducing notification noise and waiting times.

2.  **[#7408 [OPEN] perf(web-shell): optimize long session rendering](https://github.com/QwenLM/qwen-code/pull/7408)**
    - *Feature:* Prevents performance degradation in the Web Shell by bounding live-session memory growth. When a transcript exceeds 500 blocks, it auto-archives older segments to maintain responsiveness.

3.  **[#7471 [OPEN] feat(web-shell): add git mode selector for new session creation](https://github.com/QwenLM/qwen-code/pull/7471)**
    - *Feature:* Adds a new "git mode" selector to the Web Shell composer. Users can now choose between "Current branch", "New branch", or "New worktree" directly before starting a session, simplifying branch management workflows.

4.  **[#7467 [OPEN] feat(web-shell): add rendered file previews](https://github.com/QwenLM/qwen-code/pull/7467)**
    - *Feature:* A quality-of-life upgrade for the Web Shell review panel. HTML files are previewed in a sandboxed iframe, and Markdown files use the existing renderer, offering a preview action directly in the diff panel.

5.  **[#7468 [OPEN] fix(core): record auto-memory index reads in FileReadCache](https://github.com/QwenLM/qwen-code/pull/7468)**
    - *Fix:* Directly addresses issue #7287. This PR registers the `MEMORY.md` read in the cache, allowing the subsequent `write_file` call to succeed, thus fixing the auto-memory update workflow.

6.  **[#7458 [OPEN] fix(serve): detect stale SSE cursors across daemon restarts](https://github.com/QwenLM/qwen-code/pull/7458)**
    - *Fix:* A robust fix for the Web Shell's SSE (Server-Sent Events) system. It introduces an "epoch token" to detect stale connections after a daemon restart, preventing duplicate or lost messages during reconnect.

7.  **[#7460 [OPEN] fix(core): make fork subagents discoverable](https://github.com/QwenLM/qwen-code/pull/7460)**
    - *Feature/Fix:* Standardizes the definition of "fork" subagents (those with inherited parent context). It ensures they are discoverable via a new `subagent_type` field and clarifies when their results arrive via background notifications.

8.  **[#7279 [OPEN] feat(core): propagate trusted daemon invocation context](https://github.com/QwenLM/qwen-code/pull/7279)**
    - *Feature:* Foundation work for secure daemon operation. It adds a trusted context (version, sessionId, etc.) for daemon-originated prompts, allowing the system to authenticate internal vs. external requests.

9.  **[#7393 [OPEN] feat(core): add memory recall delivery telemetry](https://github.com/QwenLM/qwen-code/pull/7393)**
    - *Feature:* Improves observability for the auto-memory system. This adds a telemetry event to confirm whether selected memories were actually delivered to the model, helping debug cases where the memory system seems ineffective.

10. **[#7380 [CLOSED] feat(web-shell): show subagent sessions in detail panel](https://github.com/QwenLM/qwen-code/pull/7380)**
    - *Feature:* A major UI improvement. Subagent session details are no longer inlined in the main chat. Instead, they appear in a dedicated detail panel with its own SSE stream, drastically reducing cognitive load and making parent transcripts much more readable.

### 5. Feature Request Trends

Aggregating from open issues, the community is clearly pushing for improvements in the following areas:

- **Session Management & Model Switching:** There is a strong demand for more robust model handling, especially preventing model mutations between parent/sub-agents (#7156), and better error handling for incompatible model parameters (#7332).
- **UI/Web Shell Enhancements:** The community wants a more powerful and stable Web Shell. Key themes include a **workspace selector** (#6700, #7430), a **"Start In" context selector** (local vs. worktree) (#6701), and the **git mode selector** now proposed in #7471. Performance under long sessions (#7408) is also a key concern.
- **Subagent & Tool Ecosystem:** The desire for "rewindable" or **resumable sub-agents** (#5540) is a recurring theme, critical for building autonomous workflows. There is also a focus on better schema handling for cross-provider compatibility (#7316, #7315).
- **Automation & Background Tasks:** Beyond sub-agents, there is interest in **cron-level precision for scheduled tasks** (#7452) and a more robust **daemon channel system** (#7388) for reliable notification delivery.
- **Developer Experience & Performance:** High interest in **cold-start performance** (#7264) and **observability** (#7306, #7393). The **intelligent CODEOWNERS** PR (#7469) also highlights a community desire for more efficient project governance.

### 6. Developer Pain Points

Several recurring issues are causing frustration for the developer community:

- **Cross-Session Model Mutation (Critical):** The bug in #7156 and its incomplete fix in #7119 represent a major pain point. Users lose trust in the system when their configured model is silently overridden by a subagent.
- **Cross-Provider Compatibility:** The recurring issues with OpenAI-compatible APIs (#7316, #7315) are a major hurdle for users who want to bring their own models or use cheaper alternatives.
- **State Persistence and Cache Inconsistency:** The auto-memory cache bug (#7287) and the token usage reporting accuracy issue (#7384) highlight a broader concern about data integrity and caching reliability.
- **Observability Gaps:** The "black box" nature of certain operations is a persistent frustration. The request for memory delivery telemetry (#7393) and the broader hardening of tool-output observability (#7306) are direct responses to this.
- **Platform and Configuration Friction:** Issues like the VS Code connection failure on Windows (#7056), the Docker sandbox workspace path issue (#7139), and the cumbersome `--token` flag handling in the Web Shell (#7301, #7398) show that setup and onboarding still have sharp edges.
- **High-Impact UI Bugs:** The "Load artifacts failed" error spam (#7427) and the lack of a workspace selector (#6700) are simple but extremely impactful bugs that degrade the daily user experience.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar).*