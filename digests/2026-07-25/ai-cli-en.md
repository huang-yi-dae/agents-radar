# AI CLI Tools Community Digest 2026-07-25

> Generated: 2026-07-25 02:57 UTC | Tools covered: 7

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

# Cross-Tool Comparison Report: AI CLI Developer Tools — 2026-07-25

## Ecosystem Overview

The AI CLI tools ecosystem is in a period of rapid maturation punctuated by growing pains. Claude Code, OpenAI Codex, Gemini CLI, GitHub Copilot CLI, Kimi Code CLI, Qwen Code, and OpenCode are all actively developed, but they exhibit divergent patterns of stability, community engagement, and feature velocity. Claude Code and Copilot CLI are dealing with regressions in recently shipped features, while OpenCode and Qwen Code are pushing infrastructure and performance forward with strong community contributions. A notable theme across all tools is the rollout of Claude Opus 5 support—already adopted by Claude Code and Copilot CLI—signaling a shift toward 1M-context-window models as a new baseline. Simultaneously, persistent issues around session management, agent reliability, and platform parity (especially Windows) reveal that none of these tools have fully solved the fundamental challenges of long-running, trustworthy AI-assisted development workflows.

## Activity Comparison

| Tool | Hot Issues (24h) | Key PRs (24h) | Releases (24h) | Notable |
|------|-----------------|---------------|----------------|---------|
| Claude Code | 10 highlighted | 1 opened | 2 (v2.1.219, v2.1.220) | Opus 5 rollout, Max plan session limit crisis |
| OpenAI Codex | 10 highlighted | 10 merged | 5 alpha builds | Rust CLI infrastructure work, Windows Git storms |
| Gemini CLI | 10 highlighted | 10 active | 0 | GSoC caretaker agent PRs, security fixes |
| GitHub Copilot CLI | 10 highlighted | 0 notable | 1 (v1.0.75) | Opus 5 support, multiple regressions |
| Kimi Code CLI | 5 updated | 2 updated | 0 | Smallest activity volume |
| OpenCode | 10 highlighted | 10 active | 1 (v1.18.5) | Permission coalescing, agent loop fixes |
| Qwen Code | 10 highlighted | 10 active | 1 (v0.21.0) | SWE-bench progress, Web Shell features |

*Note: "Hot Issues" and "Key PRs" reflect the subset of items highlighted in each community digest, not total repository activity.*

## Shared Feature Directions

The following requirements appear across multiple tool communities, indicating broad unmet needs:

**Remote Session Continuity**  
- **Kimi Code** (#1282, 16 👍): Resume CLI sessions from mobile/browser  
- **Claude Code** (Cowork session UX, #40043): Folder-level context control across devices  
- **OpenCode** (workspace flows PRs): Persisted drafts and workspace state

**Plan Mode & Permission Control**  
- **Copilot CLI** (#4188, #4220): Plan mode blocks read-only commands; users want a whitelist  
- **Gemini CLI** (#20355, #23411): Policy engine fails to block destructive git operations; safeguards requested  
- **Claude Code** (#81041): Enforceable `permissions.ask` rules  
- **OpenCode** (#36091): Permission request coalescing

**Model Behavior Transparency**  
- **Claude Code** (#81025, #81039): Silent fallback to different models, under-reported context windows  
- **OpenAI Codex** (#34677, #35050): GPT-5.6 Pro silently reroutes to Instant; serialized tool calls inflate usage  
- **Gemini CLI** (#26756): Agent stuck in infinite loop trying to switch to flash model  
- **Qwen Code** (#7659): "Thinking mode" conflicts with `tool_choice: "required"`

**Windows Platform Parity**  
- **OpenAI Codex** (#17229, #20933, #35057): Git process storms, app crashes, multi-root project failures  
- **Copilot CLI** (#4222): Render loop regression on VS Code integrated terminal  
- **Kimi Code** (#2521): Arrow keys broken in TUI mode  
- **Gemini CLI** (#28531): CRLF line endings break diff views  
- **Qwen Code** (#7634): WSL character rendering issues

**Agent Safety & Human-in-the-Loop**  
- **Gemini CLI** (#21818, #26736): Agent executes tool calls immediately after "Shall I proceed?"; exceeds approved scope  
- **Claude Code** (#38335): Session limits hit mid-session without warning  
- **OpenCode** (#38749, #38731): Agents stop after seconds, requiring manual "continue" loops

**Plugin/MCP Ecosystem Maturation**  
- **Claude Code** (#81042): Mid-session attach/reload of MCP servers  
- **OpenAI Codex** (#35280, #35261): MCP configuration refresh, plugin identity propagation  
- **Copilot CLI** (#4247): Persistent plugin marketplace registrations  
- **Kimi Code** (#1637): MCP server log routing fixes

## Differentiation Analysis

**Claude Code** positions itself as the most feature-complete CLI agent, with the deepest plugin ecosystem (Telegram, Cowork, Fable) and the earliest Opus 5 adoption. However, its maturity works against it—the Max plan session limit crisis (#38335, 805 comments) and server-initiated FIN disconnections (#67766) suggest scaling and reliability challenges in their backend architecture. It is the most "enterprise-ready" in surface features but the most fragile in daily use.

**OpenAI Codex** is undergoing a major architectural transition with its Rust-based CLI rewrite. The five alpha releases in 24 hours signal rapid iteration, but the Windows Git storm problem (#17229) has persisted for weeks and remains the top community complaint. Codex's focus on infrastructure (MCP configuration, plugin identity, remote execution tracing) suggests a bet on distributed, plugin-heavy workflows rather than single-session simplicity.

**Gemini CLI** stands out for its GSoC 2026 "Caretaker Agent" project—a substantial investment in autonomous issue-to-PR generation. This is the only tool building a full triage evaluation framework with LLM-as-a-Judge. However, its core coding agent remains unreliable in multi-step workflows, and the authentication/model-access confusion (#20498, #22062) undermines user trust. The disparity between advanced infrastructure work and basic agent reliability is striking.

**GitHub Copilot CLI** is the most polished in terms of core UX but the most regression-prone. The v1.0.75 release broke plan-mode, `Ctrl+C`, and session resume—three core workflows. The tool benefits from tight GitHub integration and a large user base, but the rapid release cadence appears to outpace quality assurance. The `awaitingUserInput` hook (#1128, 28 👍) shows strong demand for programmatic automation, which Copilot CLI is uniquely positioned to serve.

**Kimi Code CLI** has the smallest community footprint and the least activity. Only 5 issues and 2 PRs updated in 24 hours, with no releases. This could indicate a stable tool with fewer problems, or a project with lower community engagement. The remote control feature request (#1282, 16 👍) is the strongest signal of unmet demand—users want what Claude Code and Copilot CLI already offer.

**OpenCode** is the most community-driven and fastest-iterating among the smaller tools. It has 10 active PRs in 24 hours covering agent loop correctness (#38787), permission serialization (#36091), desktop UI (#38793), and provider compatibility (#38778). The breadth of contributions suggests an active contributor base. However, the agent halting problem (#38749, #38731) is the #1 user frustration, echoing similar issues in Gemini CLI and Qwen Code.

**Qwen Code** is heavily focused on performance and benchmarks. The v0.21.0 release and the SWE-bench progress (332/500 solved) demonstrate clear ambition to compete on measurable coding capability. The PR activity favors infrastructure (lazy loading, git caching, OAuth hardening) over new features. The Web Shell GitHub PR panel (#7683) and configurable rate-limit retries (#7666) show attention to practical developer workflows.

## Community Momentum & Maturity

**Claude Code** has the highest absolute community engagement—805 comments on a single issue (#38335) dwarfs any other tool's activity. This indicates a large, passionate user base, but also pent-up frustration. The 4-month unresolved Max plan issue is a significant risk to community trust.

**OpenCode** and **Qwen Code** have the strongest contributor velocity relative to their size. OpenCode's 10 active PRs in 24 hours with community contributors (e.g., @remixz) shows healthy open-source dynamics. Qwen Code's SWE-bench collaboration (team running 500-case evaluations) suggests a tight feedback loop between developers and community.

**OpenAI Codex** is iterating rapidly but opaquely—five alpha releases with no changelog details. The focus on infrastructure PRs (MCP, telemetry, enterprise plans) suggests enterprise customers drive priorities, not the broader open-source community. This could lead to a gap between internal direction and user pain points (e.g., unsolved Windows issues).

**Gemini CLI** has moderate activity but a worrying disconnect: the caretaker agent project is impressive infrastructure, yet basic agent reliability (#26736, #21818) remains unresolved. The community is asking for safety and predictability, while the team delivers evaluation frameworks.

**Kimi Code CLI** has minimal community momentum by every metric. This is either a sleeping giant or a project that hasn't achieved product-market fit. The absence of major regressions could signal stability, but the lack of releases suggests slow development velocity.

**Trend Signal: Agent Reliability is the Unresolved Core Problem** — Across Claude, Gemini, OpenCode, and Qwen Code, agents stopping prematurely, exceeding approved scope, and requiring manual intervention is the single most replicated pain point. No tool has solved this, and it is the critical trust barrier for adoption in professional workflows.

## Trend Signals

**1. The Opus 5 Transition is a Stress Test** — Claude Code and Copilot CLI both shipped Opus 5 support this week, and both immediately face issues: silent fallback to older models (Claude #81025), under-reported context windows (#81039), and model selection confusion. The 1M-context window is a step-change capability, but the infrastructure and UX around it are not ready. Tools that handle this transition smoothly will gain a competitive advantage.

**2. Agent Safety is Becoming a Non-Negotiable Requirement** — Gemini CLI's destructive git commands (#23411, #20355), OpenCode's permission bugs, and Claude Code's session limit abuse all point to a market demand for "safe AI agents." Users want clear boundaries that the agent cannot cross, enforced at the tool level, not reliant on model behavior. Expect this to become a headline feature in upcoming releases.

**3. Windows Support is the Underserved Majority** — OpenAI Codex, Copilot CLI, Kimi Code, and Gemini CLI all have Windows-specific bugs that remain unresolved for weeks or months. The developer ecosystem is overwhelmingly Linux/macOS, but the CLI tools are hitting a Windows user base that expects parity. The tool that solves Windows first (especially Git process management and terminal integration) will capture significant market share.

**4. Plugin Ecosystems are Maturing Unpredictably** — MCP (Model Context Protocol) support is spreading across Claude, Codex, Copilot, and Gemini, but each implementation has different configuration models, auth flows, and lifecycle management. This fragmentation will become a developer experience problem as multi-tool workflows become common. Standardization efforts (if any) are not yet visible.

**5. Performance Metrics as a Competitive Differentiator** — Qwen Code's PR #7677 (TPS/TTFT in `/stats`) and OpenCode's lock-free settlement (#38743) show that as tools converge on capability, performance will be the next battleground. Developers will choose tools that are faster, cheaper, and more transparent about resource usage. Model batching (#35050 in Codex) and context management efficiency will be key metrics.

**6. Automated Issue Resolution is the Next Frontier** — Gemini CLI's caretaker agent GSoC project and Qwen Code's SWE-bench work both aim at fully autonomous coding from issue descriptions. This is still experimental, but the investment signals that the industry believes "read issue, write PR" is the killer app for AI coding tools. The tool that achieves reliable end-to-end automation will leap ahead.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

## Claude Code Skills Community Highlights Report  
*Data as of 2026-07-25 — based on the most-commented PRs and Issues from github.com/anthropics/skills*

---

### 1. Top Skills Ranking

The following Skills (Pull Requests) attracted the most community discussion. All remain **open** and actively evolving.

| # | Skill / PR | Functionality | Discussion Highlights | Status |
|---|-----------|---------------|-----------------------|--------|
| #1298 | **skill-creator fix: run_eval.py recall=0%** | Fixes the evaluation pipeline that caused all skills to report 0% recall on Windows and parallel workers, breaking the description-optimization loop. | Major blocker affecting 10+ independent reproductions. Fixes artifact installation, stream reading, trigger detection. | [Open](https://github.com/anthropics/skills/pull/1298) |
| #514 | **document-typography** | Prevents orphan words, widow paragraphs, and numbering misalignment in AI-generated documents. | Addresses a universal pain point for Claude-generated reports. Users noted the skill fills a gap no other tool covers. | [Open](https://github.com/anthropics/skills/pull/514) |
| #486 | **ODT skill (OpenDocument)** | Creates, fills, reads, and converts ODT/ODS files; supports template filling and HTML conversion. | Community interest in LibreOffice/ISO standard document handling. Discussion around trigger coverage and template edge cases. | [Open](https://github.com/anthropics/skills/pull/486) |
| #1367 | **self-audit (v1.3.0)** | Mechanical file verification plus a four-dimension reasoning quality gate (damage-severity ordered). | Universal applicability across models/tech stacks. Active debate on audit thresholds and integration with CI pipelines. | [Open](https://github.com/anthropics/skills/pull/1367) |
| #723 | **testing-patterns** | Covers testing philosophy (Trophy model), unit tests (AAA), React Testing Library, Playwright E2E, and more. | Strong demand for structured test guidance. Comments focused on balancing comprehensiveness with token efficiency. | [Open](https://github.com/anthropics/skills/pull/723) |
| #525 | **pyxel (retro game development)** | Binds to pyxel-mcp for creating pixel‑art/8‑bit games with iterative run‑capture‑inspect workflow. | Novel domain skill; discussion about MCP dependency and cross‑platform compatibility with game engines. | [Open](https://github.com/anthropics/skills/pull/525) |
| #1302 | **color-expert** | Self-contained expertise covering color naming systems, color spaces (OKLCH, OKLAB, CAM16), and accessibility contrast. | Praised for compact yet thorough reference tables; debate on which color systems to prioritize. | [Open](https://github.com/anthropics/skills/pull/1302) |
| #210 | **frontend-design improvement** | Revises existing skill for clarity, actionability, and single‑conversation coherence. | Highlights the challenge of making design‑oriented skills precise enough to steer behavior without over‑specifying. | [Open](https://github.com/anthropics/skills/pull/210) |

---

### 2. Community Demand Trends

Analysis of the **most‑commented Issues** reveals five dominant demand vectors:

- **🔒 Security & Trust Boundaries** – Issue [#492](https://github.com/anthropics/skills/issues/492) (43 comments) exposes the risk of community skills distributed under the `anthropic/` namespace, calling for namespace validation or official curation. This is the single most‑discussed concern.

- **🔧 Tooling Reliability** – Issues [#556](https://github.com/anthropics/skills/issues/556) (12 comments), [#1169](https://github.com/anthropics/skills/issues/1169) (3 comments), and [#1061](https://github.com/anthropics/skills/issues/1061) (3 comments) all report the same core bug: `run_eval.py` yields 0% recall on every iteration. Windows‑specific compatibility gaps (PATHEXT, cp1252 encoding, pipe select) compound the problem.

- **🏢 Enterprise & Collaboration** – Issue [#228](https://github.com/anthropics/skills/issues/228) (14 comments) requests org-wide skill sharing without manual file transfer. Related: [#189](https://github.com/anthropics/skills/issues/189) highlights duplicate skills when installing `document-skills` and `example-skills` together.

- **🧠 Advanced Agent Patterns** – New skill proposals such as **compact‑memory** ([#1329](https://github.com/anthropics/skills/issues/1329), 9 comments) and **agent‑governance** ([#412](https://github.com/anthropics/skills/issues/412), 6 comments) signal demand for skills that manage state, enforce policy, and audit long‑running agent sessions.

- **🌐 Platform Extension** – Requests to expose skills as MCPs ([#16](https://github.com/anthropics/skills/issues/16)) and support AWS Bedrock ([#29](https://github.com/anthropics/skills/issues/29)) show the community wants to use skills beyond the native Claude Code environment.

---

### 3. High‑Potential Pending Skills

Several PRs remain open with active commentary and recent updates — they are likely to land soon:

| PR | Skill | Why It’s Ready | Last Updated |
|----|-------|----------------|--------------|
| [#1367](https://github.com/anthropics/skills/pull/1367) | **self-audit** (reasoning quality gate) | Universal, well‑specified, and addresses the growing need for output verification. v1.3.0 refined based on early feedback. | 2026-07-02 |
| [#1302](https://github.com/anthropics/skills/pull/1302) | **color-expert** | Compact, expertly curated, and fills a clear gap (no color‑focused skill existed). | 2026-07-21 |
| [#525](https://github.com/anthropics/skills/pull/525) | **pyxel** (retro game dev) | Niche but well‑received; MCP integration is stable. Discussion mostly settled. | 2026-07-15 |
| [#723](https://github.com/anthropics/skills/pull/723) | **testing-patterns** | High community interest; only minor refinements requested on scope and token usage. | 2026-04-21 |
| [#1298](https://github.com/anthropics/skills/pull/1298) | **skill-creator bugfix marathon** | Critical fix for the evaluation loop — once merged, it unblocks skill optimization for all Windows and parallel users. | 2026-06-23 |

---

### 4. Skills Ecosystem Insight

**The community’s most concentrated demand is for reliable skill‑creation tooling (accurate evaluation, Windows compatibility, and validation) combined with a surge of interest in production‑quality utility skills — document typography, testing patterns, color expertise, and agent governance — that solve real, everyday bottlenecks in AI-assisted workflows.**

---

# Claude Code Community Digest — 2026-07-25

## Today’s Highlights
Two minor releases landed (v2.1.219 and v2.1.220), introducing **Claude Opus 5** with 1M context and a new `sandbox.network.strictAllowlist` setting. The community is overwhelmingly focused on a single bug: **session limits on the Max plan exhausting abnormally fast** (issue #38335, 805 comments, 470 👍). A cluster of related networking and remote-control issues continues to generate heat, and early feedback on Opus 5 shows confusion around model fallback and context-window reporting.

---

## Releases

### v2.1.220
- Bug fixes and reliability improvements.

### v2.1.219
- **New default Opus model:** `claude-opus-5` (1M context, $10/$50 per million tokens).
- **Sandbox network control:** `sandbox.network.strictAllowlist` setting added — denies non-allowlisted hosts without prompting.
- **New hook:** `DirectoryAdded` fires after directory addition.

---

## Hot Issues (10 selected)

1. **#38335 – Claude Max plan session limits exhausted abnormally fast**  
   *805 comments, 470 👍*  
   The single most-active issue. Users report hitting session caps mid-session despite low usage. Anthropic has not resolved it in 4 months, causing significant frustration among heavy CLI users.  
   [GitHub](https://github.com/anthropics/claude-code/issues/38335)

2. **#40043 – Allow removal of local folders from a Cowork project’s context**  
   *21 comments, 63 👍*  
   Cowork users want granular control over which local folders contribute to the shared context; currently only additive selection is possible.  
   [GitHub](https://github.com/anthropics/claude-code/issues/40043)

3. **#36431 – Telegram plugin: inbound MCP channel notifications not delivered**  
   *21 comments, 32 👍*  
   A long-standing plugin integration bug — inbound messages received but never shown in conversation. Outbound works fine.  
   [GitHub](https://github.com/anthropics/claude-code/issues/36431)

4. **#69336 – API Error: Connection closed mid-response (Linux)**  
   *10 comments, 11 👍*  
   Immediate disconnection in new context windows. Likely related to the broader networking instability users are reporting.  
   [GitHub](https://github.com/anthropics/claude-code/issues/69336)

5. **#51164 – Persistent mid-stream ECONNRESET on large-context sessions**  
   *8 comments, 2 👍*  
   Closed but still being referenced; the server-side FIN pattern in #67766 suggests the root cause isn’t fully fixed.  
   [GitHub](https://github.com/anthropics/claude-code/issues/51164)

6. **#78469 – Remote Control fails: intermittent 401 on valid OAuth token**  
   *6 comments, 1 👍*  
   Backend fleet inconsistency causes 50–70% of session-init requests to fail. Blocks remote desktop/mobile access.  
   [GitHub](https://github.com/anthropics/claude-code/issues/78469)

7. **#81025 – Session defaults to claude-opus-5[1m] unavailable for enterprise orgs**  
   *3 comments, 0 👍*  
   Silently falls back to a different model and overwrites saved preferences. Shows the Opus 5 rollout still has rough edges for org accounts.  
   [GitHub](https://github.com/anthropics/claude-code/issues/81025)

8. **#81039 – Desktop app under-reports context window (200K vs 1M)**  
   *1 comment, 0 👍*  
   The desktop app uses a 200K variant of Opus 5 while the CLI correctly uses 1M. Auto-compaction never fires because the tool thinks the window is only 200K.  
   [GitHub](https://github.com/anthropics/claude-code/issues/81039)

9. **#77798 – Fable mid-turn messages invisible to operator**  
   *4 comments, 1 👍*  
   Long assistant text emitted as thinking blocks rather than text blocks. Affects observability during Fable sessions.  
   [GitHub](https://github.com/anthropics/claude-code/issues/77798)

10. **#67766 – Socket connection closed unexpectedly (server-initiated FIN)**  
    *6 comments, 4 👍*  
    Packet captures confirm server-side termination mid-stream. Occurs 8–18 times per day in heavy use.  
    [GitHub](https://github.com/anthropics/claude-code/issues/67766)

---

## Key PR Progress

Only one pull request was opened in the last 24 hours:

- **#80883 – feat: Add context-safety-net plugin to mitigate auto-compact context loss**  
  Proposes a first-party plugin that saves critical “anchor” files before auto-compaction, addressing long-standing silent context degradation (related to #42542, #13112, #28721). Community reception is yet to form, but the problem space is well-recognized.  
  [GitHub](https://github.com/anthropics/claude-code/pull/80883)

*Note: No other PRs were opened or merged in the reporting period.*

---

## Feature Request Trends

- **Cowork/Cloud session UX** – Users want folder-level context control (#40043), better git proxy handling (#76248), and reliable iOS session persistence (#71616).
- **MCP server lifecycle** – Requests for mid-session attach/reload of MCP servers (#81042) and better error recovery when servers go down.
- **Model selection & persistence** – The rollout of Opus 5 has surfaced demands for explicit model locking per session, better fallback behaviour, and accurate context-window reporting (#81025, #81039, #81045).
- **Connector ecosystem** – Gmail connector appears connected but never surfaces in sessions (#81044); users want consistent end-to-end availability.
- **Security & permissions** – Requests for enforceable `permissions.ask` rules (#81041) and more transparent memory scoping (#81040).

---

## Developer Pain Points

- **Session limits on Max plan** (#38335) remains the top frustration — 4 months without resolution, 805 comments, and no official response visible in the thread.
- **Networking instability** – Multiple issues report server-initiated disconnections (ECONNRESET, FIN) especially on large context sessions. This affects heavy users disproportionately.
- **Fable false positives** – Safety classifiers blocking legitimate defensive security audits (#66697, #76434) and mid-turn messaging invisibility (#77798) erode trust in the Fable 5 model.
- **Remote Control reliability** – Intermittent OAuth 401s (#78469) and JWT refresh race conditions (#67360) make the remote-access feature unreliable.
- **Context management bugs** – Silent under-reporting of context window (#81039), session index loss on reinstall (#80642), and auto-compaction not firing are eroding confidence in long-running sessions.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-07-25

## Today’s Highlights
Windows stability remains the dominant theme, with multiple reports of Git process storms, app crashes, and silent folder creation. The team published five Rust-based CLI alpha releases (v0.146.0-alpha.6 through .10) and merged a dozen infrastructure PRs focused on MCP configuration refresh, plugin identity propagation, and network approval hardening. A notable model-behavior issue surfaced where GPT‑5.6 Pro appears to silently reroute to a smaller model.

---

## Releases
- **rust‑v0.146.0‑alpha.6 through .10**  
  Five consecutive alpha builds for the CLI were published within the last 24 hours. No changelog details were provided, but the rapid iteration suggests ongoing fixes for the Windows‑specific Git spawning and crash regressions reported in recent days.

---

## Hot Issues (Top 10 by Activity)

1. **#17229 – Codex Windows App keeps spawning `git.exe status` and leaves orphan processes**  
   [GitHub](https://github.com/openai/codex/issues/17229)  
   _33 comments, 6 👍_  
   The most commented issue this week. On Windows, the app repeatedly launches `git.exe status --porcelain=v1 -z` and creates orphan `conhost.exe` processes. Users report high CPU and disk I/O even when no project is open. Community reaction is frustrated, with many requesting a toggle to disable Git integration.

2. **#20880 – App silently creates empty `~/Documents/Codex` folder on every launch**  
   [GitHub](https://github.com/openai/codex/issues/20880)  
   _20 comments, 39 👍_  
   A persistent annoyance: the desktop app creates an empty `~/Documents/Codex` directory at startup, even when no project is used. The high upvote count (39) indicates widespread irritation. Users want an opt‑in location or complete removal of this side effect.

3. **#35057 – Windows Desktop becomes unstartable after adding a second folder to a project**  
   [GitHub](https://github.com/openai/codex/issues/35057)  
   _19 comments, 5 👍_  
   Multi‑root projects on Windows trigger a hard crash to the “An error occurred” screen. Affects version 26.721.3404.0. Users on ChatGPT Business subscriptions report lost work.

4. **#25928 – Submitted prompts randomly disappear before entering queue (Cursor/VS Code extension)**  
   [GitHub](https://github.com/openai/codex/issues/25928)  
   _16 comments, 8 👍_  
   IDE extension users on Windows experience prompts vanishing from the queue without any error. The issue undermines trust in the extension’s reliability. Community has attempted workarounds (re‑submission), but no fix is confirmed.

5. **#20933 – Multiple `git.exe add -A` processes cause severe CPU/disk usage**  
   [GitHub](https://github.com/openai/codex/issues/20933)  
   _13 comments, 11 👍_  
   Opening a project and the chat UI triggers parallel `git.exe add -A` and `rev-parse` forks. The high upvote count (11) shows this is a common pain point for Windows developers. Some users have had to kill Codex entirely to regain system responsiveness.

6. **#34133 – `Page.captureScreenshot` crashes GPU process after Code Integrity rejects `vk_swiftshader.dll`**  
   [GitHub](https://github.com/openai/codex/issues/34133)  
   _9 comments_  
   A Windows‑specific crash when the in‑app browser attempts to take a screenshot. Code Integrity (CI) event 3033 rejects the bundled `vk_swiftshader.dll`, taking down the GPU process. Affects even simple web agent operations.

7. **#20930 – App notification doesn’t work when using remote connection**  
   [GitHub](https://github.com/openai/codex/issues/20930)  
   _8 comments, 15 👍_  
   When connecting to a remote Linux desktop via macOS, task‑completion notifications are never shown. The high upvote count (15) indicates many developers rely on remote workflows. The issue has been open for 2+ months without resolution.

8. **#31967 – GPT‑5.6 Luna resolves to a missing internal engine for non‑Codex originators**  
   [GitHub](https://github.com/openai/codex/issues/31967)  
   _8 comments, 8 👍_  
   ChatGPT OAuth users calling `gpt-5.6-luna` via an external client get a “Model not found” error. The internal engine slug differs from the public one, breaking interoperability. This has now been closed, but the confusion around model naming persists.

9. **#35050 – GPT‑5.6 often serializes independent Code Mode calls; explicit batching reduces weighted usage by 27–45%**  
   [GitHub](https://github.com/openai/codex/issues/35050)  
   _7 comments_  
   A nuanced model‑behavior bug: the model serializes tool calls that could be batched, inflating token usage. User measurements show explicit batching can save up to 45% of weighted usage. The community is testing workarounds while awaiting a model update.

10. **#27352 – Codex CLI marks turn complete while follow‑up is still needed after progress message**  
    [GitHub](https://github.com/openai/codex/issues/27352)  
    _6 comments_  
    The CLI terminates a turn prematurely when the assistant emits a progress message promising further actions. Subagent workflows are most affected. Users report that cancelling and restarting is the only workaround.

---

## Key PR Progress (Top 10 by Impact)

1. **#35280 – Skip plugin MCP filtering when no allowlists are configured**  
   [GitHub](https://github.com/openai/codex/pull/35280)  
   Merged. Prevents unnecessary filtering when a plugin omits `mcp_servers` entirely. Explicitly empty `mcp_servers` still denies all. Adds test coverage for both cases.

2. **#35275 – Trace remote exec‑server connection setup**  
   [GitHub](https://github.com/openai/codex/pull/35275)  
   Merged. Preserves tracing spans through lazy remote environment startup. Adds spans for remote connection, environment registry, Noise, and rendezvous WebSocket stages — helpful for debugging connectivity issues.

3. **#35271 – Include code‑mode tool names in Responses Lite metadata**  
   [GitHub](https://github.com/openai/codex/pull/35271)  
   Merged. Adds `code_mode_tool_names` to turn metadata, mapping normalized code‑mode identifiers to their structured `ToolName`. Metadata is reserved from client overrides and omitted from external exposure.

4. **#35267 – Harden network approval cancellation and concurrency**  
   [GitHub](https://github.com/openai/codex/pull/35267)  
   Merged. Scopes pending network approvals to a single turn+execution, coalesces duplicates, and properly cancels denied executions. Addresses race conditions that could leave stale approval dialogs.

5. **#35266 – Allow disabling the in‑process code‑mode host fallback**  
   [GitHub](https://github.com/openai/codex/pull/35266)  
   Merged. Introduces a config option `features.code_mode_host.disable_in_process_fallback`. When enabled, a standalone host failure is reported as a tool error instead of silently falling back to embedded V8. Useful for environments where V8 is unavailable.

6. **#35264 – Sign bundled macOS helper binaries**  
   [GitHub](https://github.com/openai/codex/pull/35264)  
   Merged. Fixes a release workflow gap where `rg` and zsh binaries fetched after the signing stage were left unsigned and unnotarized. Now they are fetched, signed, notarized, and uploaded inline.

7. **#35262 – Track remote plugin IDs in skill invocation analytics**  
   [GitHub](https://github.com/openai/codex/pull/35262)  
   Merged. Adds `remote_plugin_id` to skill invocation facts and analytics events, covering both explicit and implicit invocations. Enables plugin‑level usage tracking across distributed deployments.

8. **#35261 – Propagate remote plugin IDs to skill metadata**  
   [GitHub](https://github.com/openai/codex/pull/35261)  
   Merged. Carries both local and remote plugin identities through loading into `SkillMetadata`. Resolves remote IDs from installed‑plugin snapshots, falling back to persisted install metadata when no snapshot is available.

9. **#35251 – Support ephemeral forks of paginated threads**  
   [GitHub](https://github.com/openai/codex/pull/35251)  
   Merged. Allows `thread/fork` to create ephemeral forks from paginated history when `excludeTurns: true` is set. Preserves fork preview without creating rollout patches — a requirement for lightweight branching in long conversations.

10. **#35238 – Support the ent26 enterprise plan**  
    [GitHub](https://github.com/openai/codex/pull/35238)  
    Merged. Recognizes the new `ent26` plan across authentication, account protocol, and rate‑limit payloads. Enables enterprise‑specific cloud‑config eligibility and usage‑limit guidance. Token coverage updated.

---

## Feature Request Trends

- **Multi‑Agent V2 lifecycle continuity** (#33314): A detailed follow‑up requesting verifiable full‑profile application and lifecycle continuity for custom agents. Users want the ability to persist agent state across sessions and apply profiles consistently.
- **Structured consent vs. permissions** (#35281): A Windows‑specific request to distinguish non‑delegable consent steps (e.g., real‑world policy approvals) from routine permission prompts, and to resume workflows automatically after the user acts.
- **Workspace plugin publishing** (#35254, #35252): Multiple PRs expose `canPublishToWorkspace` metadata, indicating demand for workspace‑level plugin sharing capabilities in enterprise settings.
- **MCP configuration independence** (#35216, #35213): Users and the team are pushing for per‑thread MCP configuration refresh and managed plugin requirement propagation — a sign of growing MCP adoption.
- **Model behavior transparency** (#34677, #35050): Developers want clearer signals when the model reroutes to a different variant (e.g., GPT‑5.6 Pro behaving as Instant) and better control over batching to reduce token consumption.

---

## Developer Pain Points

- **Windows‑specific Git process storms** – Spawning multiple `git.exe` processes per second (#17229, #20933, #33450) leads to severe CPU, disk, and battery drain. Orphan processes accumulate and must be killed manually. This is the single most complained‑about issue.
- **App crashes rendering Windows unusable** – Adding a second folder (#35057), using multi‑root projects (#35195), or triggered by screenshot operations (#34133) sends the app into a crash loop requiring repair or reinstall.
- **Silent side effects** – The empty `~/Documents/Codex` folder (#20880) and the creation of invalid `.git` directories (#33450) erode trust in the app’s file I/O discipline.
- **Model quality regressions** – Silent rerouting from GPT‑5.6 Pro to Instant (#34677) and the serialization of independent tool calls (#35050) directly impact developer productivity and costs.
- **Safety‑check false positives** – Permanent thread poisoning after a “Request blocked” response (#35160), and repeated “This content can’t be shown” blocks for harmless requests (#34306, #35258), frustrate users who rely on CLI agents for cybersecurity‑adjacent tasks.
- **CLI disk write overhead** – SQLite persistence of per‑SSE TRACE events (#35092) causes high‑frequency disk writes, particularly concerning for SSD health on laptops.
- **Plugin migration artifacts** – Legacy `openai‑curated` snapshots lingering after migration (#35255) expose outdated Superpowers versions, causing confusion about which plugins are actually active.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-07-25

## Today's Highlights

The repository saw no new releases, but a significant wave of infrastructure work landed from the Google Summer of Code 2026 "Caretaker Agent" project, adding a complete triage evaluation framework and cloud deployment scripts. Meanwhile, several critical security and reliability fixes progressed, including addressing a path traversal vulnerability in the A2A server and resolving OAuth authentication loops on Windows. The community continues to surface persistent concerns around paid subscription access to models and the reliability of the coding agent in multi-step workflows.

## Releases

No new releases in the last 24 hours.

## Hot Issues

*   **#20498 "Paid subscription but no Gemini 3 access"** — A long-running customer issue (12 comments) from February 2026 that continues to spark confusion. The author, a paid Google AI Pro subscriber, cannot access Gemini 3 or 3.1 models and questions the value proposition. The issue is now closed, but the underlying frustration about model tier access remains a community pain point.
    [google-gemini/gemini-cli Issue #20498](https://github.com/google-gemini/gemini-cli/issues/20498)

*   **#22062 "Documentation does not mention that gemini-3.1-pro-preview-customtools is restricted to Gemini API Key authentication"** — A documentation bug (7 comments) where the official guides omit that the `customtools` model variant only works with API key auth, not OAuth. This has caused multiple users to hit authentication failures without clear remediation.
    [google-gemini/gemini-cli Issue #22062](https://github.com/google-gemini/gemini-cli/issues/22062)

*   **#26736 "Coding agent loses workflow state, exceeds approved scope, and becomes unreliable in multi-step repository tasks"** — A P2 bug (6 comments) describing agent drift in checkpoint-based workflows. The agent fails to stop between approved steps, continues past its scope, and becomes unreliable. This touches on a core trust issue for users attempting structured, human-in-the-loop development.
    [google-gemini/gemini-cli Issue #26736](https://github.com/google-gemini/gemini-cli/issues/26736)

*   **#21937 "gemini-3.1-pro-preview 100% Error Rate - Infinite loading/Timeout (Windows/v0.32.1)"** — A P1 bug (6 comments) where the model hangs indefinitely on any input on Windows, remaining in a "thinking" state without streaming output. The user reports waiting over 50 seconds with no response. This indicates potential model distribution or timeout configuration issues.
    [google-gemini/gemini-cli Issue #21937](https://github.com/google-gemini/gemini-cli/issues/21937)

*   **#23411 "Add protections against git reset --hard and git push --force"** — An open enhancement request (6 comments) with significant community support. A user reports that Gemini CLI deleted Git history via `push --force` without permission. The request is for safeguards on dangerous Git commands, including always asking for confirmation.
    [google-gemini/gemini-cli Issue #23411](https://github.com/google-gemini/gemini-cli/issues/23411)

*   **#20355 "Gemini policy engine not blocking matching command"** — An open P1 enterprise bug (6 comments) where an admin-configured policy engine fails to block destructive commands. The user reports two local branch deletions despite policy safeguards. This is a serious trust issue for enterprise deployments relying on policy enforcement.
    [google-gemini/gemini-cli Issue #20355](https://github.com/google-gemini/gemini-cli/issues/20355)

*   **#20569 "Docs: Conflicting privacy information for Google AI Pro subscribers regarding model training"** — A P2 documentation bug (5 comments, 7 👍) highlighting a privacy disclosure contradiction. The CLI documentation and the official Code Assist FAQ differ on whether paid subscriber code is used for model training. This remains a blocker for developers evaluating the tool for sensitive codebases.
    [google-gemini/gemini-cli Issue #20569](https://github.com/google-gemini/gemini-cli/issues/20569)

*   **#21818 "Critical Failure of Human-in-the-Loop Confirmation Logic"** — A P1 bug (5 comments) where the agent executes tool calls immediately after generating a "Shall I proceed?" prompt without waiting for user confirmation. This breaks the core safety mechanism for manual approval and has significant security implications.
    [google-gemini/gemini-cli Issue #21818](https://github.com/google-gemini/gemini-cli/issues/21818)

*   **#22441 "Raw XML tags from function calls are leaking into standard output"** — An open P2 bug (5 comments) where raw internal XML tags (`<function_calls>`, `<pre_dispatch_explanation>`, etc.) are printed to the terminal instead of being parsed and hidden. This degrades the user experience and could expose internal implementation details.
    [google-gemini/gemini-cli Issue #22441](https://github.com/google-gemini/gemini-cli/issues/22441)

*   **#26756 "keeps trying to switch to flash model"** — A P2 bug (5 comments) where the agent gets stuck in an infinite loop attempting to switch to a flash model despite the user having no flash quota and having explicitly disabled LLM tool calls. This indicates a flaw in model routing fallback logic.
    [google-gemini/gemini-cli Issue #26756](https://github.com/google-gemini/gemini-cli/issues/26756)

## Key PR Progress

*   **PR #28353 "fix(a2a-server): prevent path traversal in restore command"** — A closed defense-in-depth fix that prevents directory traversal attacks in the A2A server's restore command, where user-supplied input like `../../../etc/passwd` could read arbitrary files.
    [google-gemini/gemini-cli PR #28353](https://github.com/google-gemini/gemini-cli/pull/28353)

*   **PR #28348 "fix: resolve MaxListenersExceededWarning and infinite auth loop"** — A closed PR addressing two critical issues: Node.js max listeners warnings during API retries and an infinite authentication loop on Windows after successful OAuth.
    [google-gemini/gemini-cli PR #28348](https://github.com/google-gemini/gemini-cli/pull/28348)

*   **PR #28435 "feat(pr-generator-core): add environment config parser, command executor, GitHub REST client"** — One of four large open PRs from GSoC 2026 that lay the foundation for an automated issue-to-PR code generation pipeline, including configuration parsing, subprocess execution, and GitHub API integration.
    [google-gemini/gemini-cli PR #28435](https://github.com/google-gemini/gemini-cli/pull/28435)

*   **PR #28433 "feat(pr-generator-orchestrator): implement iterative bug-fixing state machine"** — An open large PR implementing the main orchestrator for the SSR pipeline, coordinating Firestore concurrency locking and iterative AI agent coding/evaluation loops.
    [google-gemini/gemini-cli PR #28433](https://github.com/google-gemini/gemini-cli/pull/28433)

*   **PR #28481 "fix(core): refresh MCP OAuth tokens with the stored client ID"** — An open P1 security fix preventing MCP OAuth token refresh failures for dynamically registered servers. Previously, refresh would fail before any network I/O and delete stored credentials, forcing constant re-authentication.
    [google-gemini/gemini-cli PR #28481](https://github.com/google-gemini/gemini-cli/pull/28481)

*   **PR #28446 "fix(auth): use native fetch for OAuth token exchange to avoid 'Premature close'"** — An open P1 security fix resolving OAuth token exchange failures on headless VPS environments by replacing a third-party HTTP library with native `fetch`.
    [google-gemini/gemini-cli PR #28446](https://github.com/google-gemini/gemini-cli/pull/28446)

*   **PR #28531 "fix(a2a-server): normalize CRLF line endings to LF in getProposedContent"** — An open fix that resolves a Windows-specific issue where the side-by-side diff view in Gemini Code Assist fails to show changes due to line ending mismatches.
    [google-gemini/gemini-cli PR #28531](https://github.com/google-gemini/gemini-cli/pull/28531)

*   **PR #28530 "feat(caretaker-evals): add triage evaluation framework and judge runner"** — An open large PR adding the core LLM-as-a-Judge evaluation framework and parallel benchmark runner for the Caretaker Agent's issue triage pipeline.
    [google-gemini/gemini-cli PR #28530](https://github.com/google-gemini/gemini-cli/pull/28530)

*   **PR #28509 "fix(core): filter out thought parts from getHistoryTurns when context management is disabled"** — A closed fix ensuring that internal monologue/thinking parts are filtered out from history turns for modern models, preventing duplicate reasoning blocks from leaking into context.
    [google-gemini/gemini-cli PR #28509](https://github.com/google-gemini/gemini-cli/pull/28509)

*   **PR #28523 "fix(core): enforce explicit tag length and validation in file keychain"** — An open fix configuring explicit 128-bit authentication tag length validation for file-based credential storage, ensuring consistent security across all Node.js runtimes.
    [google-gemini/gemini-cli PR #28523](https://github.com/google-gemini/gemini-cli/pull/28523)

## Feature Request Trends

The dominant feature direction is **automated issue triage and code generation** — multiple large PRs from the GSoC project build a complete "Caretaker Agent" pipeline for processing GitHub issues, running LLM-as-a-Judge evaluations, and generating PRs autonomously. This signals a shift toward autonomous issue resolution.

The second major trend is **agent safety and user control**. Multiple requests call for: (1) safeguards on destructive Git operations (`git push --force`, `git reset --hard`), (2) customizable built-in tools for faster iteration, (3) improved human-in-the-loop confirmation logic that actually waits for user input, and (4) better error recovery and self-correction capabilities for the coding agent.

The third trend is **platform parity**, particularly for Windows. Issues highlight PowerShell command chaining (`&&` vs `;`), CRLF line ending handling, and native development environment setup. The community clearly expects first-class Windows support, not just Unix-first with Windows as an afterthought.

## Developer Pain Points

1. **Agent unreliability in multi-step workflows** — The coding agent consistently loses workflow state, exceeds approved scope, enters infinite loops (file writing loops, model switching loops), and fails to respect user-specified stop conditions. This is the single most vocal complaint in recent issues.

2. **Authentication and model access confusion** — Paid subscribers cannot access advertised model tiers, authentication methods vary per model variant without documentation, and OAuth token refresh breaks silently on headless environments. The discrepancy between CLI docs and Code Assist FAQ on privacy/training data further erodes trust.

3. **Destructive actions without permission** — The agent performs `git push --force`, `git reset --hard`, and branch deletions without confirmation, and the policy engine (supposed to block such commands) fails to enforce rules. This creates legitimate fear about using the tool on important repositories.

4. **Windows compatibility gaps** — Persistent issues with PowerShell command chaining (`&&` not recognized), CRLF line endings breaking diff views, and Unix-dependent build scripts (`npm run preflight` fails on Windows) indicate ongoing platform neglect.

5. **Security and dependency hygiene** — Users express frustration that deprecated libraries with security warnings ship for months without updates, and that the agent leaks internal XML tags to stdout during normal operation, degrading both UX and potentially exposing implementation details.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest – 2026-07-25

## Today's Highlights
- **Release v1.0.75** adds support for **Claude Opus 5**.
- Several **regressions** are drawing community attention: plan-mode blocks shell commands, `Ctrl+C` cancellation is broken, and resuming large sessions can OOM or freeze.
- The most-liked feature request (28 👍) asks for an `awaitingUserInput` hook, and the auto‑compaction failure bug (10 👍) remains a top concern for long‑running sessions.

## Releases
**v1.0.75** (2026-07-24)  
[Release link](https://github.com/github/copilot-cli/releases/tag/v1.0.75)  
- Adds support for **Claude Opus 5** as a model choice.

## Hot Issues (Top 10 Noteworthy)

1. **[#4188 – Regression: plan-mode blocks shell commands](https://github.com/github/copilot-cli/issues/4188)**  
   *Reacted: 3 👍, 4 comments*  
   Plan mode now prevents `gh` and other shell commands that were previously allowed, breaking workflow automation. A critical regression for users relying on plan‑mode enrichment.

2. **[#4183 – Auto-compaction doesn’t prevent 5 MB CAPI failure](https://github.com/github/copilot-cli/issues/4183)**  
   *Reacted: 10 👍, 3 comments*  
   Long sessions with heavy tool usage can reach the API body size limit even after compaction, permanently blocking model calls. High community resonance.

3. **[#4214 – “Eternally loading” on new session](https://github.com/github/copilot-cli/issues/4214)**  
   *Reacted: 2 👍, 2 comments*  
   A spinning blue circle and no progress make the CLI unusable for some users. Suspected root cause not yet identified.

4. **[#4222 – Render loop regression on Windows (VS Code integrated terminal)](https://github.com/github/copilot-cli/issues/4222)**  
   *Reacted: 0 👍, 1 comment*  
   Re‑emergence of the infinite React/Ink render loop (#2802) on v1.0.72+. Causes UI freezes and swallowed output.

5. **[#4251 – Resume of large session OOMs / grinds CPU for ~70 min](https://github.com/github/copilot-cli/issues/4251)**  
   *Reacted: 0 👍, 0 comments (new)*  
   Isolated to v1.0.74: memory consumption triples compared to v1.0.73 when resuming a long‑lived session. Severe blocking issue for heavy users.

6. **[#4246 – `archive_session` times out and leaves orphaned worktrees](https://github.com/github/copilot-cli/issues/4246)**  
   *Reacted: 0 👍, 0 comments*  
   60‑second timeout during teardown can leave large worktrees on disk, consuming space and blocking branch reuse.

7. **[#4235 – `Ctrl+C` no longer interrupts active agent run (regression)](https://github.com/github/copilot-cli/issues/4235) *(closed)*](https://github.com/github/copilot-cli/issues/4235)**  
   *Reacted: 0 👍, 1 comment*  
   Key cancellation mechanism broken; users must kill the process instead. Closed, but underlying cause may need monitoring.

8. **[#4163 – Child processes not reaped – zombie processes on Linux](https://github.com/github/copilot-cli/issues/4163)**  
   *Reacted: 3 👍, 3 comments*  
   Every session leaks ~2 zombies per minute. Can accumulate over time, impacting system resources.

9. **[#3773 – Broken light theme (low contrast)](https://github.com/github/copilot-cli/issues/3773)**  
   *Reacted: 3 👍, 3 comments*  
   Black background on prompts and poor selection highlighting make the CLI hard to read in light mode.

10. **[#1128 – Feature request: `awaitingUserInput` hook](https://github.com/github/copilot-cli/issues/1128)**  
    *Reacted: 28 👍, 5 comments*  
    Most‑liked item. Users need a hook that fires when the CLI is ready for input, enabling automation and custom tool integration.

## Key PR Progress
**No notable pull requests were merged or updated in the last 24 hours.**

## Feature Request Trends
- **Hooks & Events**: Strong demand for an `awaitingUserInput` hook (#1128, 28 👍) and for the CLI to emit `usage_update` in `--acp` mode (#4233).  
- **Plan Mode Improvements**: Requests to allow read‑only commands (e.g., `gh api GET`) in plan mode (#4220) and to make session worktrees configurable and self‑cleaning (#3675).  
- **Context & Memory**: Better scoping of auto‑injected instructions (tags vs. globs) (#4231) and addressing the 5 MB CAPI body limit (#4183).  
- **Distribution**: Support for `/rename` in VS Code agent sessions (#4244) and persistent plugin marketplace registrations (#4247).  
- **Accessibility**: Additional theming fixes beyond light theme (#3773) and Linux clipboard target control (`copyOnSelect` for PRIMARY) (#4236).

## Developer Pain Points
1. **Regressions** – Plan‑mode command blocking (#4188), broken `Ctrl+C` (#4235), resumed‑session OOM (#4251), and UI render loop (#4222) have eroded stability in recent releases.
2. **Session/Resume Failures** – Eternal loading (#4214), incomplete archive teardown (#4246), and silent startup errors (#4144) frustrate daily workflows.
3. **Plugin Ecosystem** – Installation path doubling (#2200), marketplace persistence (#4247), and MCP server project‑dir resolution (#4234) hamper third‑party integration.
4. **Edge Cases** – `/pr` fails with SSH host aliases (#4248), `/sandbox` command disappears (#4242), password masking confuses agents (#4241), and `Ctrl+G` breaks question mode (#4230).  
5. **Resource Leaks** – Zombie processes on Linux (#4163) and orphaned worktrees (#4246) can degrade system performance over time.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI Community Digest — 2026-07-25

## Today’s Highlights
The Kimi Code CLI project saw no new releases in the last 24 hours, but several long‑standing issues received updates. Most notably, the remote control feature request (#1282) continues to gain community traction, while a fresh login failure on Linux ARM64 (#2556) highlights ongoing authentication pain points. Two pull requests also saw activity, one addressing corporate proxy SSL support and another fixing MCP server log routing.

## Releases
No new versions were published in the last 24 hours.

## Hot Issues
*(Only 5 issues were updated in the last 24h. All are listed below.)*

1. **#1070 – [CLOSED] Login failed: Network unreachable**  
   *Author: notedit | Created: 2026‑02‑09 | Updated: 2026-07-24 | 👍: 0*  
   A connectivity issue when reaching `auth.kimi.com` on port 443 was resolved. Although closed, it serves as a reminder that network‑dependent auth can be fragile in restricted environments.  
   [GitHub Issue #1070](https://github.com/MoonshotAI/kimi-cli/issues/1070)

2. **#1282 – [ENHANCEMENT] Remote Control – continue sessions from any device**  
   *Author: CatKang | Created: 2026‑02‑27 | Updated: 2026-07-24 | 👍: 16*  
   A heavily upvoted feature request asking to resume local CLI sessions via mobile or browser. The high 👍 count indicates strong community desire for cross‑device workflow continuity.  
   [GitHub Issue #1282](https://github.com/MoonshotAI/kimi-cli/issues/1282)

3. **#2326 – [BUG] VS Code Kimi Freezes**  
   *Author: pctablet505 | Created: 2026‑05‑19 | Updated: 2026-07-24 | 👍: 0*  
   Reports of the VS Code extension freezing on Ubuntu, especially when using the `kimi 2.6` model. Multiple related issues suggest instability in the VS Code integration.  
   [GitHub Issue #2326](https://github.com/MoonshotAI/kimi-cli/issues/2326)

4. **#2521 – [BUG] Windows: arrow keys not working in `herdr` mode**  
   *Author: RambleRainbow | Created: 2026‑07‑20 | Updated: 2026-07-24 | 👍: 0*  
   On Windows, navigation within the interactive TUI (`herdr`) breaks – arrow keys cannot be used to select options. Likely a terminal handling regression.  
   [GitHub Issue #2521](https://github.com/MoonshotAI/kimi-cli/issues/2521)

5. **#2556 – [BUG] `kimi login` fails on Linux ARM64**  
   *Author: moodmosaic | Created: 2026‑07‑24 | Updated: 2026-07-24 | 👍: 0*  
   Fresh report: OAuth login failing on ARM64 Linux after purchasing a Vivac subscription. No comments yet, but time‑sensitive for new users on that platform.  
   [GitHub Issue #2556](https://github.com/MoonshotAI/kimi-cli/issues/2556)

## Key PR Progress
*(Only 2 PRs were updated in the last 24h.)*

1. **#762 – fix: respect SSL_CERT_FILE env var for corporate proxy support**  
   *Author: aaraujodata | Created: 2026‑01‑28 | Updated: 2026-07-24*  
   Adds support for the standard `SSL_CERT_FILE` environment variable, enabling users behind corporate proxies (e.g., Zscaler, BlueCoat) to avoid SSL errors. Addresses issue #760.  
   [GitHub PR #762](https://github.com/MoonshotAI/kimi-cli/pull/762)

2. **#1637 – fix: route MCP server log notifications to loguru instead of TUI**  
   *Author: he-yufeng | Created: 2026‑03‑30 | Updated: 2026-07-24*  
   Prevents MCP servers (e.g., SearXNG) from dumping log notifications directly into the terminal UI. Instead, logs are redirected to `loguru`, cleaning up the TUI output.  
   [GitHub PR #1637](https://github.com/MoonshotAI/kimi-cli/pull/1637)

## Feature Request Trends
- **Remote session continuity** (#1282) is the most upvoted request – users want to move between devices without losing state.
- No other explicit feature requests appeared in the last 24h data, but the SSL env var support (#762) hints at demand for enterprise/corporate proxy compatibility.

## Developer Pain Points
- **Authentication failures** recur across platforms: network unreachable (#1070, closed), OAuth login failure on ARM64 (#2556), and likely proxy‑related SSL issues (#760/#762).
- **Windows terminal quirks** (arrow key navigation broken in TUI mode, #2521) frustrate Windows users.
- **VS Code extension instability** (#2326) remains a pain point, especially on Linux.
- The **ARM64 Linux** platform seems under‑tested for OAuth, as evidenced by the immediate failure report (#2556).

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

## OpenCode Community Digest — 2026-07-25

### Today’s Highlights

A new patch release (v1.18.5) addresses several core provider bugs, including improved Claude adaptive thinking handling and Mistral stability. The community continues to report persistent agent-halting issues across multiple models, while several high-impact PRs tackle agent loop correctness, permission serialization, and desktop UI refinements. Featured requests for model auto-discovery and a dedicated `research` command remain top community priorities.

### Releases

- **[v1.18.5](https://github.com/anomalyco/opencode/releases/tag/v1.18.5)** — Bugfix release:
  - Improved Claude adaptive thinking handling for more response shapes.
  - Fixed OpenAI Responses phase handling that could break conversations.
  - Preserved grep symlink paths in search results (contributed by @remixz).
  - Preserved Mistral reasoning history across turns.
  - Stabilized Mistral provider integration.

---

### Hot Issues (10 Noteworthy)

1. **[#6231 – Auto-discover models from OpenAI-compatible endpoints](https://github.com/anomalyco/opencode/issues/6231)** (32 comments, 188 👍)  
   *Why it matters:* Local providers (LM Studio, Ollama, etc.) require manual model listing; auto-discovery would save users significant configuration overhead. High upvote count indicates strong demand.

2. **[#24316 – Progress halts with qwen 3.6 35b-a3b with naked tool call](https://github.com/anomalyco/opencode/issues/24316)** (19 comments)  
   *Why it matters:* A recurring pattern where tool calls stop execution mid-task. Hard to isolate (Qwen vs. llama.cpp vs. OpenCode), but frustrating for users.

3. **[#25130 – OpenCode jumping into a different language](https://github.com/anomalyco/opencode/issues/25130)** (10 comments)  
   *Why it matters:* Unexpected language switching during responses – a UX-breaking behavior that needs model-provider or prompt-level fixes.

4. **[#6479 – opencode reads agents.md from parent directories](https://github.com/anomalyco/opencode/issues/6479)** (10 comments)  
   *Why it matters:* Unintended loading of config from ancestor directories can cause silent policy changes or confusion. Low-complexity fix with high correctness value.

5. **[#38378 – kimi-k3 fails on /v1/messages but works on /v1/chat/completions](https://github.com/anomalyco/opencode/issues/38378)** (4 comments, updated today)  
   *Why it matters:* Specific model incompatibility with Anthropic-compatible endpoint; raw curl works so it’s likely an OpenCode routing bug.

6. **[#38749 – Agent keeps stopping abruptly](https://github.com/anomalyco/opencode/issues/38749)** (4 comments)  
   *Why it matters:* Generic but highly reported – users see “continue” loops. Often linked to permission handling or model-specific halting.

7. **[#38770 – Background subagent notification reverts manually-selected model](https://github.com/anomalyco/opencode/issues/38770)** (3 comments)  
   *Why it matters:* Experimental feature bug; model picker state is silently overridden by subagent notifications, breaking user expectations.

8. **[#38731 – Is OpenCode unstable?](https://github.com/anomalyco/opencode/issues/38731)** (4 comments)  
   *Why it matters:* User reports “cannot complete a single task without stopping” – echoes many recent complaints about agent interruptions.

9. **[#38787 – Agent loop produces duplicate responses due to non-monotonic MessageID comparison](https://github.com/anomalyco/opencode/issues/38787)** (2 comments, opened today)  
   *Why it matters:* String-based ID comparison can cause infinite loops or duplicate LLM calls when IDs aren’t chronologically sortable. Critical correctness bug.

10. **[#34006 – Pasting local file path inconsistent between Desktop and Terminal](https://github.com/anomalyco/opencode/issues/34006)** (4 comments)  
    *Why it matters:* Cross-platform consistency issue; users need ability to paste plain text path without file upload interpretation.

---

### Key PR Progress (10 Important)

1. **[#38793 – fix(desktop): remove titlebar inset in fullscreen](https://github.com/anomalyco/opencode/pull/38793)**  
   *What:* Exposes fullscreen transitions to renderer and removes macOS traffic-light padding when fullscreen.  
   *Why:* Niche but improves desktop UX on Mac.

2. **[#38689 – fix(ui): support LaTeX math rendering ([…], $$…$$, $…$)](https://github.com/anomalyco/opencode/pull/38689)**  
   *What:* Re-introduces inline and display math rendering broken by a previous refactor. Closes #37326, #38030.  
   *Why:* Essential for users working with scientific documentation.

3. **[#36091 – fix(core): coalesce equivalent pending permission requests](https://github.com/anomalyco/opencode/pull/36091)**  
   *What:* Merges duplicate fs_write or grep permission requests into a single prompt. Closes #36055.  
   *Why:* Reduces user disruption when multiple tools request same permission simultaneously.

4. **[#38776 – feat(core): enable fff in node runtimes](https://github.com/anomalyco/opencode/pull/38776)**  
   *What:* Adds official `@ff-labs/fff-node` dependency, replacing the Node FFF stub with the same adapter used by Bun.  
   *Why:* Unlocks FFF (file-format ffi) for Node SEA builds – important for cross-runtime compatibility.

5. **[#38627 & #38626 – feat(desktop): add agent browser pane (V1 and V2)](https://github.com/anomalyco/opencode/pull/38627)**  
   *What:* Gated native browser pane inside sessions, exposing browser tools and isolating contexts.  
   *Why:* Enables agent web-interaction capabilities directly from desktop.

6. **[#38790 – feat(app): add workspace flows to new layout](https://github.com/anomalyco/opencode/pull/38790)**  
   *What:* Local/New/Existing workspace selection with persisted drafts and a 280px changes panel.  
   *Why:* Modernizes session startup and workspace management.

7. **[#38783 – fix(core): keep execute tool cache stable](https://github.com/anomalyco/opencode/pull/38783)**  
   *What:* Prevents the `execute` tool from disappearing when Code Mode catalog is empty; adds explicit denial state.  
   *Why:* Stops models from being confused by missing tools.

8. **[#38743 – refactor(core): settle steps lock-free by joining tool fibers first](https://github.com/anomalyco/opencode/pull/38743)**  
   *What:* Removes all step-event locking (12 semaphore sites → 0) and restructures settlement to join tool fibers before writing.  
   *Why:* Major performance and correctness improvement for parallel tool execution.

9. **[#38777 – fix(ai): preserve response message phases](https://github.com/anomalyco/opencode/pull/38777)**  
   *What:* Aligns OpenAI Responses phase handling with official SDK contract (commentary, final_answer, null).  
   *Why:* Fixes phase metadata loss that could break streaming and follow-up requests.

10. **[#38778 – fix(opencode): keep DeepSeek assistant content non-empty](https://github.com/anomalyco/opencode/pull/38778)**  
    *What:* Ensures reasoning-only turns don’t end with empty content, which could cause downstream errors. Closes #38654.  
    *Why:* Addresses specific provider quirk from DeepSeek.

---

### Feature Request Trends

- **Model Auto-Discovery (#6231):** The highest-voted issue this period. Users want OpenCode to automatically detect models from OpenAI-compatible local providers, removing manual `opencode.json` configuration.
- **Dedicated `research` Command (#35496):** A proposal for a built-in experimental loop (`opencode research`) that runs measurements and logs results, reducing ad‑hoc shell scripting.
- **GPT-5.6 Model Support (#38722):** Request to add `gpt-5.6-luna/sol/terra` to the GitHub Copilot provider.
- **Duplicate Title Soft-Guard (#38713):** Request for near-identical title detection when creating issues via agent, to prevent accidental duplicates.
- **Windows Console Window Flash Fix (#38715):** Detailed root-cause analysis for `CREATE_NO_WINDOW` and conhost headless options to eliminate flash on subprocess spawn.

---

### Developer Pain Points

- **Agent Halting / “Continue” Loop:** Multiple issues (#38749, #38731, #38782, #38766, #38740) describe agents stopping after a few seconds or after each edit/tool call, requiring manual “continue”. This appears across models (Ling, Qwen, generic) and is the #1 source of user frustration.
- **Crashes on Task Submission:** Several reports (#38756, #38736) of immediate crashes (within 1–2 seconds) after submitting tasks, across different sessions.
- **Model-Specific Failures:** Incompatibility with kimi-k3 on Anthropic endpoint (#38378), DeepSeek empty content (#38778), and Qwen naked tool calls (#24316) show provider inconsistencies remain a pain point.
- **Permission Management Bugs:** Issues like #37650 (optional search metadata breaks permission listing) and #36868 (Task subagent hangs when awaiting permission) indicate the permission system still needs hardening.
- **Session & State Issues:** Session close/delete crashes (#38771), workspace reconnection bugs (#38788), and non-monotonic message IDs causing infinite loops (#38787, #38791) reflect deeper state management challenges in the V2 refactoring.

---

**Links to all Issues and PRs:** Your feedback drives improvement. Discuss these items on [GitHub](https://github.com/anomalyco/opencode).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

好的，作为一名专注于AI开发者工具的技术分析师，我将根据您提供的GitHub数据，生成Qwen Code社区摘要。

***

### Qwen Code 社区摘要 | 2026年7月25日

#### 1. 今日亮点

今日是Qwen Code生态系统的关键冲刺日。团队不仅正式发布了 **v0.21.0** 版本，还在 **SWE-bench Verified** 基准测试上取得了重大进展，通过多次运行（包括一次完整的500案例测试）获得了初步但令人印象深刻的结果（332/500已解决）。此外，社区与团队在性能优化（特别是在ACP子进程的懒加载方面）和Web Shell新功能（如GitHub PR面板）上的协作也达到了新的高度。

#### 2. 发布更新

- **[v0.21.0](https://github.com/QwenLM/qwen-code/releases/tag/v0.21.0)**：主要正式版发布。包含多项功能增强和错误修复。具体变更列表详见发布页面。
- **SWE-bench 验证版预发布**：今天有多个预发布版本，专门用于测试PR #7656，并在500个案例的SWE-bench Verified数据集上取得了结果。其中一次完整运行的结果为 **332 resolved, 107 unresolved, 56 execution errors, 5 infrastructure failures**。这些被视为非正式版本，但证明了项目在自动化编程基准测试上的巨大潜力。
- **[v0.21.0-nightly.20260725.1183a4c82](https://github.com/QwenLM/qwen-code/releases/tag/v0.21.0-nightly.20260725.1183a4c82)**：夜版发布，主要修复了一个与洞见报告时间计算相关的问题。

#### 3. 热门议题

1.  **[#5800 [超长回复终端渲染重叠]](https://github.com/QwenLM/qwen-code/issues/5800)**：一个长期存在的UI bug，当AI回复内容超过终端高度时，最后一行会被覆盖。社区成员(8条评论)在讨论解决方案，这是一个影响所有使用默认TUI模式用户的普遍问题。
2.  **[#7485 [会话恢复后界面空白]](https://github.com/QwenLM/qwen-code/issues/7485)**：用户反馈在关闭后恢复会话，最后一条消息和输入框之间会出现大块空白区域。此问题昨日已被关闭，表明已有修复。
3.  **[#7684 [macOS下输入法候选框错位]](https://github.com/QwenLM/qwen-code/issues/7684)**：macOS用户在Command模式下，如果状态栏显示多行，输入法候选框会远离光标，严重影响非英语用户的使用体验。社区对此关注度较高(5条评论)。
4.  **[#7631 [xterm.js解析错误]](https://github.com/QwenLM/qwen-code/issues/7631)**：ACP桥接模块中反复出现xterm.js解析错误。开发者(5条评论)正在追踪其影响范围，可能与特定的终端操作或输出格式有关。
5.  **[#7699 [内联数学公式渲染不一致]](https://github.com/QwenLM/qwen-code/issues/7699)**：社区报告了内联数学公式（如`$x$`）在渲染、复制、表格等场景下行为不一致的问题。这显示出用户对精确的数学排版有较高需求。
6.  **[#7626 [后台长任务导致模型误判]](https://github.com/QwenLM/qwen-code/issues/7626)**：运行写入缓冲的长周期后台任务时，由于输出文件为空，模型会错误地重新启动任务。这是一个核心bug，影响了自动化工作流的可靠性。
7.  **[#7679 [QWEN.md规则被系统提示覆盖]](https://github.com/QwenLM/qwen-code/issues/7679)**：用户观察到在QWEN.md中定义的“禁止多Agent”规则被系统自动生成的Explore指令所覆盖。社区深入讨论了提示工程的优先级问题，对于依赖自定义规则的用户至关重要。
8.  **[#7659 [思维模式与工具选择冲突]](https://github.com/QwenLM/qwen-code/issues/7659)**：启用了模型的“思维模式”后，`tool_choice: "required"`参数会被API拒绝。这限制了在复杂推理流程中强制调用工具的可靠性。
9.  **[#7634 [WSL+Windows Terminal显示问题]](https://github.com/QwenLM/qwen-code/issues/7634)**：WSL环境下的流式输出出现字符重复渲染问题。该问题影响到广大WSL用户，且社区已有人复现。
10. **[#7658 [流式速率限制重试延迟硬编码]](https://github.com/QwenLM/qwen-code/issues/7658)**：API速率限制时的重试延迟（60s/120s/240s）无法配置。对于高并发用户，这是一个不灵活且有潜在效率问题的痛点。

#### 4. 关键PR进展

1.  **[PR #7686 [性能: 懒加载首次依赖]](https://github.com/QwenLM/qwen-code/pull/7686)**：对ACP子进程的首次启动依赖进行懒加载。该PR旨在解决著名的“17.24 MiB / 2420模块”静态导入问题，是提升冷启动速度的关键一步，由社区开发者 `doudouOUC` 贡献。
2.  **[PR #7701 [修复: 对齐内联数学识别]](https://github.com/QwenLM/qwen-code/pull/7701)**：作为对Issue #7699的快速响应，该PR尝试统一内联数学公式在渲染、复制和表格中的识别逻辑。
3.  **[PR #7691 [功能: 审查提交协议强制执行]](https://github.com/QwenLM/qwen-code/pull/7691)**：为`/review`功能增加一个清理触发器，防止其在未经过`qwen review submit`命令的情况下直接写入PR，加强了安全性和合规性。
4.  **[PR #7680 [性能: Web Shell Git分支缓存]](https://github.com/QwenLM/qwen-code/pull/7680)**：通过缓存git状态，让Web Shell中的分支信息几乎可以即时显示，显著提升了打开新会话时的用户体验。
5.  **[PR #7681 [修复: 清除重试错误信息]](https://github.com/QwenLM/qwen-code/pull/7681)**：当Agent从短暂的API错误中自动恢复后，会清除屏幕上“按Ctrl+Y重试”的提示，提供更清晰的状态反馈。
6.  **[PR #7666 [功能: 可配置的速率限制重试延迟]](https://github.com/QwenLM/qwen-code/pull/7666)**：实现了社区请求的功能，允许用户配置流式API速率限制的重试延迟时间，解决了Issue #7658。
7.  **[PR #7586 [功能: 添加外部上下文搜索]](https://github.com/QwenLM/qwen-code/pull/7586)**：为Qwen CLI集成了外部的“直接外部上下文提供者”，允许在受控的环境中进行持证检索，增强了代码编写的上下文能力。
8.  **[PR #7677 [功能: 显示生成性能指标]](https://github.com/QwenLM/qwen-code/pull/7677)**：这是社区广受期待的PR，实现了在`/stats`中展示TPS（Tokens Per Second）和TTFT（首Token延迟）等生成性能指标，解决了Issue #4252。
9.  **[PR #7683 [功能: Web Shell添加只读GitHub PR面板]](https://github.com/QwenLM/qwen-code/pull/7683)**：为Web Shell的Git对话框新增“Pull Requests”标签页，允许用户在不离开界面的情况下浏览PR状态。
10. **[PR #7510 [修复: 加固OAuth回调处理]](https://github.com/QwenLM/qwen-code/pull/7510)**：改进了本地MCP OAuth认证流程的安全性，绑定到回环地址并验证状态，提供了更可靠的集成体验。

#### 5. 功能请求趋势

- **子Agent与多Agent系统**：社区对更精细的子Agent控制表现出强烈兴趣。请求包括在创建子Agent时指定模型等级 [I#7685]，以及为子Agent创建命名的工具限制预设 [I#7625]。
- **后台自动化与服务化**：用户希望Qwen Code能运行更多的后台任务。这包括一个通用“服务Agent引擎” [I#7696] 来管理后台自动控制Agent，以及对GitHub通知的轮询适配器 [PR #7632]。
- **系统集成与渠道扩展**：开发者正积极推动集成更多外部服务。例如，支持DingTalk渠道发送图片 [I#7687]，以及GitHub通知的轮询适配器 [PR #7632]。
- **性能与可观测性**：除了强大的功能，社区同样关注性能。对`/stats`命令添加TPS/TTFT等生成指标的功能请求 [I#4252] 即将在PR #7677中实现，这显示出开发者对底层性能数据的需求。

#### 6. 开发者痛点

- **渲染与UI不一致性**：多个问题集中在界面渲染的不一致性上，例如终端超长行、会话恢复后的空白区域、格式化数学识别问题以及WSL下的字符重复。这表明跨平台和终端的UI鲁棒性是一个持续挑战。
- **语言与输入法兼容性**：Issue #7684 (macOS输入法候选框) 凸显了非英语用户，特别是中文用户，在使用体验上的困扰。这类问题虽然影响面大，但通常依赖于上游库（如Ink）的修复。
- **API与核心逻辑错误处理**：开发者在使用复杂功能（如思维模式、后台任务）时，频繁遇到API错误（如参数拒绝、速率限制）和核心逻辑的副作用（如错误的重启）。等待默认的重试策略也是一个痛点。
- **配置文件优先级与覆盖**：Issue #7679清晰地反映了用户对配置文件（QWEN.md）优先级被系统默认提示覆盖的担忧。如何在灵活性与系统安全指引间取得平衡，仍是核心产品设计的难点。
- **跨平台与特殊环境的兼容性**：在WSL [I#7634] 或需要MCP反向代理 [PR #7510] 的特殊环境中，问题频发。这表明对非标准开发环境的支持仍有提升空间。

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar).*