# AI CLI Tools Community Digest 2026-08-06

> Generated: 2026-08-06 02:13 UTC | Tools covered: 7

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

# Cross-Tool AI CLI Developer Tools Comparison Report — 2026-08-06

## 1. Ecosystem Overview

The AI CLI developer tools ecosystem is in a period of rapid maturation, with all major players shipping releases within the last 24–48 hours and communities actively reporting production-impacting bugs. Cross-cutting themes dominate: MCP (Model Context Protocol) integration fragility appears across Claude Code, Codex, Copilot CLI, and Gemini CLI; Windows desktop stability remains a systemic weakness for multiple tools; and silent data loss or corruption bugs are the most dangerous class of issues emerging. Communities are converging on demands for session portability, opt-in privacy defaults, and graceful degradation over hard failures. Meanwhile, tool differentiation is sharpening around deployment models (cloud-hosted vs. local-first), audience targeting (enterprise vs. individual developers), and architectural choices (Rust vs. TypeScript, TUI-first vs. IDE-integrated).

## 2. Activity Comparison

| Tool | Hot Issues (Today) | Open/Active PRs (Today) | Release Status | Dominant Issue Themes |
|---|---|---|---|---|
| **Claude Code** | 10 | 5 | v2.1.223 stable | Parser data loss, model behavior, desktop reliability |
| **OpenAI Codex** | 10 | 10 | 0.146.1 stable + 0.147.0-alpha.13 | Windows instability, /undo demand, MCP leaks |
| **Gemini CLI** | 10 | 10 | v0.54.0 stable; v0.55.0 preview + nightly | Subagent reliability, shell hangs, memory system friction |
| **Copilot CLI** | 10 | 0 (none updated) | v1.0.79-5 + patch releases | MCP incompatibilities, rendering regressions, Windows crashes |
| **Kimi Code CLI** | 3 | 3 | No release in 24h | File corruption, non-atomic tool execution |
| **OpenCode** | 10 | 10 | v1.18.14 stable | Session regression, VS Code extension demand, auth friction |
| **Qwen Code** | 10 | 10 | v0.21.6 nightly + desktop v0.1.0 | Security bypasses, CI reliability, desktop bugs |

## 3. Shared Feature Directions

- **Session portability & recovery (Claude Code, Codex, OpenCode, Gemini CLI):** Users want portable session transcripts checked into repos (Claude Code #81946), cross-project session pickers (OpenCode #31932), and `/undo` restoration (Codex #9203, 373 👍). Session continuity across modes (`-p` vs. interactive) is broken in Claude Code (#82536).

- **Opt-in privacy defaults (Claude Code, Codex, OpenCode):** Claude Code's session URLs in commits should be opt-in (#66504, 46 👍); Codex's auto-compaction is unpredictable; OpenCode users want control over auto-commit behaviors (#40348).

- **MCP ecosystem compatibility (Claude Code, Codex, Copilot CLI, Gemini CLI):** FastMCP servers fail on Copilot CLI (`-32602`); Claude Code drops parameters silently (#72228, #84362); Codex leaks MCP child processes (#12491); Gemini CLI has tool-scope limits (>128 tools = 400 error).

- **Windows & cross-platform parity (Claude Code, Codex, Copilot CLI, Qwen Code):** Case-sensitive path hashing on Windows (Claude Code #84354), native runtime crashes (Copilot CLI #4026), GPU-process crashes and Sysmon BSODs (Codex #25178, #31035), desktop startup crash (Qwen Code #8615).

- **Graceful degradation over hard failures (Kimi Code, Gemini CLI, Claude Code):** Kimi Code's "abort after side effects" (#2588) mirrors Gemini CLI's subagent false-success reporting (#22323) and Claude Code's silent parser field loss (#84362) — all share the theme of execution proceeding with incomplete data or mid-task failure.

- **Model behavior governance (Claude Code, Copilot CLI, Qwen Code):** Model quality complaints (Claude Code #77136), unsupported reasoning effort breaking subagents (Copilot CLI #4345), and model ID compatibility issues (Qwen Code #8584) indicate model configuration is becoming a UX problem.

- **Browser automation resilience (Claude Code, Gemini CLI):** Permission-prompt storms (Claude Code #84355, 813 dialogs/90min) and settings.json overrides ignored (Gemini CLI #22267) show browser-driven agents remain impractical for extended runs.

## 4. Differentiation Analysis

| Dimension | Claude Code | Codex | Gemini CLI | Copilot CLI | Kimi Code | OpenCode | Qwen Code |
|---|---|---|---|---|---|---|---|
| **Primary audience** | Power users, enterprises | Desktop-heavy, Windows users | Google ecosystem, GCA users | GitHub-centric enterprises | Chinese-market, ACP protocol | Go-subscription users, OSS community | Chinese-market, multi-platform |
| **Architecture** | TypeScript, marketplace plugins | Rust, app-server + desktop | TypeScript, agent frameworks | Rust, worktree sessions | TypeScript, ACP protocol | TypeScript, V2 data migration | TypeScript, Web Shell + Tauri desktop |
| **Deployment model** | Local + cloud | Cloud + desktop | Cloud (GCA) + local | GitHub-integrated | Local-first | Cloud (Go plan) + local | Hybrid: local + desktop |
| **Differentiator** | Marketplace governance, session URLs in commits | Cyber-specialty models, Guardian circuit-breaker | AST-aware tooling roadmap, native bash sandboxing vision | Worktree isolation, multi-session management | ACP (Agent Client Protocol) voice support | Local LAN provider discovery, crypto payments | Web Shell desktop re-architecture, Live Voice |
| **Weakest area** | Parser reliability (6.2% field loss) | Windows stability, MCP process leaks | Subagent trust (false success, hangs) | MCP server compatibility | Small community, limited feature surface | Session reliability after releases | Desktop v0.1.0 rough edges, CI instability |
| **Community engagement signal** | 46 👍 top issue | 373 👍 top issue (/undo) | 8 👍 top issue; 76 evals exist | 8 👍 top issue | 19 comments top FR | 134 👍 top issue | 8 comments top issue (security) |

## 5. Community Momentum & Maturity

- **Highest community engagement:** Codex leads with a 373-upvote single issue (#9203, /undo), indicating a large, vocal user base. Claude Code follows with sustained 46 👍 on a 2-month-old issue and daily new bug reports, reflecting heavy production usage.

- **Most rapid iteration:** Codex (10 PRs/day, stable + alpha parallel tracks) and Gemini CLI (10 PRs/day, multiple preview/nightly releases) are moving fastest. Copilot CLI shipped two patches within 24 hours.

- **Most stable release cadence:** Claude Code and OpenCode ship consistent stable releases with controlled feature rollouts; Kimi Code is quietest with no 24-hour release and only 3 active issues — the smallest community footprint.

- **Maturity signals:** Gemini CLI has 76 behavioral evals and a formal evaluation epic (#24353); Claude Code has marketplace governance with owner-wildcard support; OpenCode is executing V1→V2 data migration with resumable REST-triggered migration (#40723). These indicate structural investment beyond feature velocity.

## 6. Trend Signals

1. **Silent failure is the new critical bug class.** Across four tools (Claude Code, Kimi Code, Gemini CLI, Codex), the most severe issues involve execution proceeding with incomplete data, false success reporting, or side effects persisting after failure. Developers should prioritize validating tool outputs, not just tool invocations.

2. **Session data is the battleground.** Portability, recovery, opt-in traceability, and cross-project visibility of sessions dominate feature requests. Expect session-aware features (export, sharing, undo, migration) to be the next major differentiation axis.

3. **Windows remains the weakest platform.** Every tool with a desktop client has open, unresolved Windows-specific crashes or instability (Codex BSODs, Copilot native crashes, Qwen desktop startup crash, Claude Code path-hashing bugs). Windows-first developers face materially higher risk.

4. **MCP is stabilizing but not standardized.** Server-client compatibility failures (FastMCP `-32602`, OAuth 3LO `-32042`, policy fetch 401/403) indicate the protocol's implementation surface is still settling. Tool-agnostic MCP reliability tooling is an open opportunity.

5. **Model behavior is a UX concern, not just an API issue.** Toxicity, incoherence, unsupported reasoning efforts, and hallucinated web_search results (Copilot CLI #4093) are being reported at the CLI layer. Model selection and behavior guardrails are becoming product features.

6. **Security bypasses are emerging in tooling itself.** Qwen Code's read-only shell classifier bypass (#8582, P1) and credential leaks in sanitizers (#8136) signal that agentic tooling is creating new attack surfaces. Security review of permission/sandbox logic is critical for adoption in regulated environments.

7. **Community-driven convergence on "graceful degradation."** Kimi Code's PR #2592 (degrade unsupported media instead of aborting mid-task) and Gemini CLI's signal-forwarding fix (#28676) both address the same root complaint: tools must not leave systems in inconsistent states when something fails. This pattern is spreading as a design principle.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report

**Data as of 2026-08-06**

---

## 1. Top Skills Ranking

The following Skills received the most community attention via pull request activity:

### #514 — document-typography
**Function:** Typographic quality control for AI-generated documents — prevents orphan word wrap, widow paragraphs, and numbering misalignment in generated output.
**Discussion highlights:** Users emphasized that these issues affect every Claude-generated document and that current outputs frequently require manual typographic cleanup.
**Status:** Open — [View PR](https://github.com/anthropics/skills/pull/514)

### #723 — testing-patterns
**Function:** Comprehensive testing stack coverage — Testing Trophy model, AAA pattern, unit testing conventions, React component testing with Testing Library, and guidance on what to test vs. what NOT to test.
**Discussion highlights:** Community interest centered on the Testing Trophy model as a reliable framework for prioritizing test types.
**Status:** Open — [View PR](https://github.com/anthropics/skills/pull/723)

### #210 — frontend-design (improvement)
**Function:** Revises the existing frontend-design skill to improve clarity, actionability, and internal coherence; ensures each instruction is executable within a single conversation.
**Discussion highlights:** Contributors discussed the need for guidance specific enough to steer Claude behavior without being overly prescriptive.
**Status:** Open — [View PR](https://github.com/anthropics/skills/pull/210)

### #486 — ODT (OpenDocument)
**Function:** Creation, template filling, reading, and conversion of OpenDocument Format files (.odt, .ods); triggers on LibreOffice/ODF/ISO standard document requests.
**Discussion highlights:** Community noted strong demand for Linux-friendly document formats beyond docx/pdf.
**Status:** Open — [View PR](https://github.com/anthropics/skills/pull/486)

### #1302 — color-expert
**Function:** Self-contained color-expertise skill — color naming systems (ISCC-NBS, Munsell, XKCD, RAL), color space selection tables (OKLCH, OKLAB, CAM16), and gradients.
**Discussion highlights:** Built as a general-purpose knowledge resource applicable across design, data visualization, and branding tasks.
**Status:** Open — [View PR](https://github.com/anthropics/skills/pull/1302)

### #1367 — self-audit
**Function:** Mechanical file verification plus four-dimension reasoning audit in damage-severity priority order. Works with any project, stack, or model.
**Discussion highlights:** Strong interest in quality gates that operate before output delivery.
**Status:** Open — [View PR](https://github.com/anthropics/skills/pull/1367)

### #83 — skill-quality-analyzer + skill-security-analyzer (meta-skills)
**Function:** Quality analysis across five dimensions (structure, documentation, examples, resources) plus security analysis for Claude Skills; both intended as tooling to evaluate other skills.
**Status:** Open — [View PR](https://github.com/anthropics/skills/pull/83)

---

## 2. Community Demand Trends

The following directions show the strongest demand signals from Issues:

- **Security & Trust Management (highest urgency)** — Issue [#492](https://github.com/anthropics/skills/issues/492) (43 comments) exposed a trust-boundary vulnerability: community skills distributed under the `anthropic/` namespace are indistinguishable from official Anthropic skills. The community strongly wants provenance verification and namespace guards.

- **Skill Discovery & Reliability** — Issue [#556](https://github.com/anthropics/skills/issues/556) (12 comments, 7 👍) and its 10+ independent reproductions detail a systemic `run_eval.py` failure reporting 0% trigger rate across all queries. The effect: skill-description optimization systems are effectively blind, degrading all skill quality.

- **Organizational Sharing** — Issue [#228](https://github.com/anthropics/skills/issues/228) (16 comments, 8 👍) requests direct org-wide skill sharing without file downloads and manual uploads.

- **Context Window Efficiency** — Issue [#1487](https://github.com/anthropics/skills/issues/1487) highlights that the `claude-api` skill eagerly injects ~156k tokens in a single tool call, exhausting context. Skills must respect token budgets.

- **Duplicate/Clashing Plugin Installations** — Issue [#189](https://github.com/anthropics/skills/issues/189) (9 👍) flags identical skills in `document-skills` and `example-skills` plugins causing context bloat.

---

## 3. High-Potential Pending Skills

These open PRs received active community engagement and are likely to land soon:

- **[#1479](https://github.com/anthropics/skills/pull/1479) — plan-file-hygiene:** Lifecycle management for planning artifacts (addressed #1417). Addresses the recurring problem where planning/design documents accumulate across sessions with no cleanup or retirement strategy.

- **[#1367](https://github.com/anthropics/skills/pull/1367) — self-audit (v1.3.0):** Mechanical verification + four-dimension reasoning quality gate. Complements the quality-gate-pipeline proposal in Issue [#1385](https://github.com/anthropics/skills/issues/1385).

- **[#525](https://github.com/anthropics/skills/pull/525) — pyxel:** Retro/pixel-art/8-bit game development with Python, using the `pyxel-mcp` server and a write → run_and_capture → inspect → iterate workflow. Author is the Pyxel engine creator (kitao).

- **[#723](https://github.com/anthropics/skills/pull/723) — testing-patterns:** Cited earlier; one of the most complete testing-stack references proposed to date.

- **[#514](https://github.com/anthropics/skills/pull/514) — document-typography:** Cited earlier; answers a pervasive problem in document generation quality.

---

## 4. Skills Ecosystem Insight

The community's most concentrated demand is for **reliability infrastructure — evaluation correctness, quality gates, and trust boundary enforcement — over new feature skills**, with document-handling (ODT, typography) and testing-pattern skills as the leading functional gaps.

---

## Claude Code Community Digest — 2026-08-06

---

### 1. Today's Highlights

Claude Code v2.1.223 shipped with expanded marketplace governance, adding owner-wildcard support (`"owner/*"`) to both `strictKnownMarketplaces` and `blockedMarketplaces` managed settings. Meanwhile, the issue tracker saw a surge of reports around silent data loss in MCP tool-call parsing — two independent bugs (a parameter-drop issue and a malformed close-tag absorber) suggest systematic fragility in the tag-grammar parser. A highly-upvoted feature request from June (46 👍) demanding opt-in session URLs in commits/PRs continues to draw community support.

---

### 2. Releases

**v2.1.223**

- Added owner wildcard entries (`"owner/*"`) to `strictKnownMarketplaces` and `blockedMarketplaces` managed settings, allowing org-wide allow/block of marketplace repos.
- Added a warning when workflow agents, forked skills, slash commands, or resumed background agents operate with certain configuration states (details truncated in source).

---

### 3. Hot Issues

1. **[#66504 — Session URL appended to commit messages/PR descriptions by default — should be opt-in](https://github.com/anthropics/claude-code/issues/66504)**  
   *46 👍, 12 comments* — The community's most-supported open enhancement. Users want session traceability in commits, but object to it being default-on. The sustained upvote count indicates broad demand for a privacy/opt-in toggle.

2. **[#77136 — Opus 4.8's language is toxic; Opus 5.0 drives incoherence](https://github.com/anthropics/claude-code/issues/77136)**  
   *8 👍, 8 comments* — Model behavior complaints are escalating. Users report Opus 4.8 produces unpleasant/hostile phrasing, while Opus 5.0 suffers from coherence problems. High-stakes feedback for model tuning.

3. **[#83403 — Claude Desktop crashes near 5-hour usage limit, requires full reinstall](https://github.com/anthropics/claude-code/issues/83403)**  
   *7 comments* — A severe reliability bug: crashes after extended sessions leave the app in a broken state where only a full reinstall recovers. Critical for production users.

4. **[#82536 — `--continue` cannot find sessions created by `-p` (interactive resume)](https://github.com/anthropics/claude-code/issues/82536)**  
   *7 comments* — Workflow-breaking bug for scripted/headless users who want to resume interactive sessions. Session continuity between modes is missing.

5. **[#72228 — MCP tool calls silently drop parameters after long values](https://github.com/anthropics/claude-code/issues/72228)**  
   *5 comments* — Silent parameter truncation in MCP calls. Particularly dangerous because servers receive partial argument sets without error. Labeled with repro.

6. **[#83342 — Bundled ugrep balloons to 9–14 GB RSS](https://github.com/anthropics/claude-code/issues/83342)**  
   *4 comments* — Agent `grep` calls transparently route to bundled ugrep, which explodes to multi-GB memory usage on bounded-interval BRE patterns. This can OOM CI machines.

7. **[#84362 — Tag-grammar parser silently absorbs parameter blocks — 6.2% silent field loss](https://github.com/anthropics/claude-code/issues/84362)**  
   *New today* — A re-raise of stale-closed #44826 with measured 6.2% silent field loss on parameter-rich MCP calls when close tags are malformed. Combined with #72228, this points to a systematic parser reliability problem.

8. **[#84355 — Claude-in-Chrome prompts on every browser action; all bypass methods fail](https://github.com/anthropics/claude-code/issues/84355)**  
   *New today* — Users report 813 permission dialogs in 90 minutes. Settings, permission modes, extension approved-sites, and environment variables all fail to suppress prompts. Severe UX regression for browser automation.

9. **[#84354 — "Past Conversations" empty due to case-sensitive path hashing on Windows](https://github.com/anthropics/claude-code/issues/84354)**  
   *New today* — Windows path case-sensitivity causes session lookup to fail, making history appear empty. A platform-specific data-visibility bug.

10. **[#84359 — Usage panel incorrectly attributes Opus 5 usage to "Fable 5"](https://github.com/anthropics/claude-code/issues/84359)**  
    *New today* — Billing/usage attribution display bug. Community will care about this: misreported model usage makes quota tracking unreliable.

---

### 4. Key PR Progress

1. **[#84365 — fix(scripts): allow any user to prevent auto-close with thumbs down](https://github.com/anthropics/claude-code/pull/84365)**  
   Fixes #79146, aligning behavior with the dedupe bot's promise — any user's thumbs-down now prevents issue auto-closure.

2. **[#84364 — fix(hookify): fail closed on exceptions in pretooluse hook](https://github.com/anthropics/claude-code/pull/84364)**  
   Security fix: exceptions (ImportError, rule-eval failures) previously exited with status 0, allowing gated tools to execute. Now emits `permissionDecision: 'deny'`.

3. **[#84138 — fix: workaround for self-signed certificate error in Cowork](https://github.com/anthropics/claude-code/pull/84138)**  
   Closes #24470. Addresses Bun runtime not loading system CA certificates, causing "Self-signed certificate detected" on macOS without proxies.

4. **[#16929 — fix(code-review): respect --comment flag for GitHub posting](https://github.com/anthropics/claude-code/pull/16929)**  
   Long-standing PR (Jan 2026): `/code-review` was posting to GitHub by default, contradicting documented terminal-output default. This aligns behavior with `--comment` semantics.

5. **[#41661 — Add 14 Revolutionary Claude Code Plugins](https://github.com/anthropics/claude-code/pull/41661)**  
   Large plugin contribution (27 plugins total after update) covering security, performance, architecture, and fullstack automation. Still open after 4 months — may be awaiting maintainer review or scope negotiation.

---

### 5. Feature Request Trends

- **Opt-in session tracing (#66504)** — The most-upvoted request (46 👍): commit/PR context URLs should be opt-in, not default. Broader theme: **privacy defaults are misaligned with user expectations**.
- **Portable session transcripts (#81946)** — Users want conversation memory to be project-portable (checked into repos) while keeping scratch files local. Supports team-shared session context.
- **Disableable UI gestures (#84348)** — Left-arrow detach-to-background gesture is not rebindable; users want escape hatches from surprising TUI interactions.
- **Cross-machine device identification for browser extension (#77605)** — Security concern: connected Chrome browser can be driven cross-machine without reliable device binding.

**Trend summary:** The community is pushing hard on three fronts: (1) **opt-in/privacy controls** for session data, (2) **portable and shareable session memory**, and (3) **rebindable/disableable TUI gestures**.

---

### 6. Developer Pain Points

- **Silent data loss in tool-call parsing** — Two independent high-severity reports (#72228, #84362) show parameters being silently dropped from MCP calls. For agentic workflows, this is the most dangerous class of bug: execution proceeds with incomplete data and no error.
- **Model behavior inconsistency (#77136)** — Users report stark quality differences between Opus 4.8 and 5.0, with toxicity and incoherence complaints. Model selection is becoming a UX issue, not just an API concern.
- **Permission-prompt storms in browser automation (#84355, #74715)** — Persistent "Always allow" misconfigurations and prompt loops are making browser-driven agents impractical for extended runs.
- **Memory/resource blowups (#83342)** — Bundled ugrep reaching 9–14 GB RSS on ordinary BRE patterns is a landmine for agent loops invoking `grep`.
- **Cross-platform parity gaps (#84354, #82536)** — Case-sensitive path hashing on Windows and session-continuity gaps between `-p` and interactive modes reflect inconsistent cross-mode/cross-OS behavior.
- **Desktop reliability (#83403, #83744, #84333)** — Crashes requiring full reinstall, GPU-process crashes killing the app, and silent MSIX remediation states make the desktop client feel fragile for long sessions.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-08-06

## Today's Highlights
The Codex team shipped a patch release (0.146.1) with safer automatic-review defaults for cyber-capable models, while the 0.147.0 alpha line continues rapid iteration. Community attention remains focused on Windows desktop stability, with multiple open issues covering GPU-process crashes, WMI storms, and input lag. A high-demand feature request for restoring the `/undo` command in the TUI continues to dominate discussion with 373 upvotes.

## Releases
- **rust-v0.146.1** — Bug fix: applies safer automatic-review defaults for cyber-capable models and explains permission changes in the terminal interface. ([changelog](https://github.com/openai/codex/compare/rust-v0.146.0...rust-v0.146.1))
- **rust-v0.147.0-alpha.13** (and earlier alphas .12, .11, .10, .6.5) — Continued alpha iteration; no detailed changelog provided.

## Hot Issues
1. **[#9203: Please make "/undo" back](https://github.com/openai/codex/issues/9203)** — 373 👍, 70 comments. Users report data loss when Codex unintentionally deletes untracked files or modifies uncommitted work. Strong community demand for restoring the `/undo` TUI command.

2. **[#12491: MCP child processes not reaped — 1300+ zombies, 37GB leak](https://github.com/openai/codex/issues/12491)** — 32 comments. Codex.app GUI leaks MCP child processes after task completion, causing severe memory exhaustion. Critical for long-running desktop workflows.

3. **[#33776: ChatGPT.exe spawns hundreds of taskkill.exe/conhost.exe](https://github.com/openai/codex/issues/33776)** — 30 comments, 27 👍. Windows desktop triggers WMI failure storms and DWM degradation via runaway process spawning — a systemic performance issue.

4. **[#19425: Custom stdio MCP tools not exposed to Desktop threads](https://github.com/openai/codex/issues/19425)** — 29 comments. MCP server discovery succeeds, but tools are invisible to Desktop threads. Regression suspected in app-server 0.124.0-alpha.2.

5. **[#23979: Local project conversation history missing after update](https://github.com/openai/codex/issues/23979)** — 26 comments. Desktop update on macOS hid existing threads; data still present in `state_5.sqlite`. Users blocked from resuming active work.

6. **[#25178: Windows Computer Use screenshot fails (0x80004002)](https://github.com/openai/codex/issues/25178)** — 23 comments, 12 👍. `SetIsBorderRequired` failure on Windows 10 22H2 prevents all screenshot-based operations.

7. **[#31035: SysmonDrv.sys reinstalled; BSOD crashes](https://github.com/openai/codex/issues/31035)** — 23 comments. Windows desktop appears to reinstall Sysinternals Sysmon v13.22, leading to kernel dumps pointing at `SysmonDrv.sys`.

8. **[#37002: Unable to install after clicking Update](https://github.com/openai/codex/issues/37002)** — 20 comments. Fresh update path broken on macOS 12; install fails without clear error.

9. **[#35481: Codex Diff "Oops, an error has occurred" in VS Code](https://github.com/openai/codex/issues/35481)** — 18 comments, 49 👍. Diff view broken on Windows VS Code extension (closed, but heavily upvoted).

10. **[#32177: Text-log attachment triggers "Request blocked"](https://github.com/openai/codex/issues/32177)** — 14 comments, 16 👍. Attaching a plain-text log can poison subsequent turns in the session, requiring compaction to recover.

## Key PR Progress
1. **[#37191: Preserve legacy semantics during rollout migration](https://github.com/openai/codex/pull/37191)** — Prevents historical rollbacks, compaction checkpoints, and subagent copies from corrupting visible conversation or model context during migration.

2. **[#37190: Interrupt cyber model turns after one Guardian denial](https://github.com/openai/codex/pull/37190)** — Adds a circuit-breaker policy for cyber-specialty models, interrupting after a single Guardian denial while retaining existing thresholds for other models.

3. **[#37189: Track multi-agent usage hints in world state](https://github.com/openai/codex/pull/37189)** — Resumed sessions now retain current multi-agent usage instructions, even after config changes or when history predates hint tracking.

4. **[#37188: Reserve `tool_search` namespace for the search tool](https://github.com/openai/codex/pull/37188)** — Prevents namespace tools from shadowing the built-in search tool and records collisions for strict handling.

5. **[#37177: Move explicit skill selection into the skills crate](https://github.com/openai/codex/pull/37177)** — Decouples explicit mention selection from core skill-loading via a new `ExplicitSkillLookup` interface.

6. **[#37175: Add legacy rollout migration to paginated history](https://github.com/openai/codex/pull/37175)** — Adds `LocalThreadStore::migrate_rollouts` with dry-run/apply modes, thread selection, and throughput limiting.

7. **[#37168: Bound remote MCP handshake HTTP requests](https://github.com/openai/codex/pull/37168)** — Fixes a hang where a timed-out streamable HTTP handshake left the serial executor blocked.

8. **[#37166: Keep textarea cursors and rendering inside the viewport](https://github.com/openai/codex/pull/37166)** — Fixes TUI textarea overflow issues: continuation rows, overflowing spaces, and cursor alignment.

9. **[#37151: Coalesce concurrent Git status scans](https://github.com/openai/codex/pull/37151)** — Shares in-flight `git status --porcelain` calls among concurrent workspace metadata requests, reducing redundant I/O.

10. **[#37149: Project orchestrator skills through world state](https://github.com/openai/codex/pull/37149)** — Moves orchestrator skill catalog into world state so unchanged catalogs remain incremental across turns.

## Feature Request Trends
- **Session recovery (highest demand):** Restoring `/undo` in the TUI is the single most-upvoted request (373 👍). Users repeatedly cite irreversible file deletion or modification of uncommitted work.
- **MCP reliability:** Multiple requests for consistent tool exposure across Desktop threads, robust handshake timeouts, and proper child-process lifecycle management.
- **Context/compaction stability:** Users want predictable compaction behavior — no disconnects, no lost reasoning, no repeated auto-compaction loops from retained image payloads.
- **Cross-platform parity:** Windows-specific breakage (GPU crashes, sandbox failures, MSIX pwsh issues) is a recurring theme; users expect feature parity with macOS/Linux.

## Developer Pain Points
- **Windows desktop instability dominates:** GPU-process crashes from `vk_swiftshader.dll` Code Integrity blocks, WMI storms, repeated `taskkill.exe` spawning, and Sysmon reinstallation causing BSODs.
- **Data-loss anxiety:** Conversation history disappearing after updates and the missing `/undo` create real risk for daily work.
- **MCP process leaks:** Zombie processes and multi-GB memory leaks in GUI sessions degrade long-running workflows.
- **Approval-mode regression:** Existing tasks reverting to on-request approvals despite "Allow always" settings undermines trust in permission persistence.
- **Connectivity friction:** WebSocket retry storms and slow HTTP fallback penalize users behind proxies/firewalls.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-08-06

## Today's Highlights
A significant stable release (**v0.54.0**) landed alongside two preview/nightly versions, bringing critical agent stability and macOS sandbox fixes. The community remains focused on subagent reliability, with the top issues highlighting false-positive success reporting, generalist agent hangs, and memory system imperfections. Several high-quality community PRs are in review addressing signal forwarding, OAuth on Cloud Workstations, and stream robustness.

## Releases
- **[v0.54.0](https://github.com/google-gemini/gemini-cli/releases)** — New stable release; rollout of prior previews.
- **[v0.55.0-preview.1](https://github.com/google-gemini/gemini-cli/releases/tag/v0.55.0-preview.1)** — Preview with automations, changelog management, and release pipeline improvements.
- **[v0.55.0-nightly.20260806](https://github.com/google-gemini/gemini-cli/releases/tag/v0.55.0-nightly.20260806.g761f604c1)** — Nightly with fixes:
  - **macOS sandbox**: fallback to embedded seatbelt profiles when system ones are missing ([PR #28551](https://github.com/google-gemini/gemini-cli/pull/28551))
  - **PR generator core**: new environment config parser, command executor, and GitHub integration scaffolding.

## Hot Issues
Top 10 noteworthy issues by comment activity:

1. **[Subagent recovery after MAX_TURNS reported as GOAL success](https://github.com/google-gemini/gemini-cli/issues/22323)** (12 comments) — Critical bug: `codebase_investigator` reports `success` with `Termination Reason: "GOAL"` even when it hit the turn limit without analysis. Misleads the orchestrator and wastes pipeline cycles. P1, needs retesting.

2. **[Generalist agent hangs forever](https://github.com/google-gemini/gemini-cli/issues/21409)** (8 comments, 8 👍) — The generalist subagent hangs indefinitely on simple tasks (e.g., folder creation); users wait up to an hour before cancelling. Workaround exists (instruct model to not use subagents). P1, needs retesting.

3. **[Zero-Dependency OS Sandboxing & Post-Execution Intent Routing](https://github.com/google-gemini/gemini-cli/issues/19873)** (8 comments) — Proposal to leverage Gemini 3's native bash capabilities by sandboxing and routing intent post-execution instead of restricting shell use.

4. **[Robust component-level evaluations](https://github.com/google-gemini/gemini-cli/issues/24353)** (7 comments) — Epic for building on the 76 existing behavioral evals and expanding coverage across 6 Gemini models; needs evaluation infrastructure investment.

5. **[AST-aware file reads, search, and codebase mapping](https://github.com/google-gemini/gemini-cli/issues/22745)** (7 comments) — Epic exploring AST-aware tools to reduce token noise, make precise read calls, and improve navigation.

6. **[Gemini doesn't use skills and sub-agents enough](https://github.com/google-gemini/gemini-cli/issues/21968)** (6 comments) — Users report custom skills (gradle, git) are ignored unless explicitly instructed, even when clearly relevant. P2, needs retesting.

7. **[Auto Memory retries low-signal sessions indefinitely](https://github.com/google-gemini/gemini-cli/issues/26522)** (5 comments) — Background agent re-surfaces sessions it previously declined to read, causing unnecessary repeated extraction work.

8. **[Shell command stuck with "Waiting input"](https://github.com/google-gemini/gemini-cli/issues/25166)** (4 comments, 3 👍) — Simple CLI commands hang after completion, still showing "Awaiting user input". P1, medium effort.

9. **[Auto Memory: deterministic redaction & reduced logging](https://github.com/google-gemini/gemini-cli/issues/26525)** (4 comments) — Security bug: transcript content is sent to the model *before* redaction instructions take effect; logging may leak skill definitions.

10. **[Browser agent ignores settings.json overrides](https://github.com/google-gemini/gemini-cli/issues/22267)** (3 comments) — Browser Agent bypasses `maxTurns` and other settings from global/project configs despite `AgentRegistry` merging them. P2, needs retesting.

## Key PR Progress
Top 10 impactful PRs:

1. **[Forward termination signals to relaunched child process](https://github.com/google-gemini/gemini-cli/pull/28676)** — Fixes orphaned children on `kill -TERM` of bootstrap PID by forwarding SIGTERM/SIGHUP/SIGINT/SIGQUIT/SIGUSR1/SIGUSR2. Open, help wanted.

2. **[Preserve functionCall thoughtSignature when stripping thought parts](https://github.com/google-gemini/gemini-cli/pull/28607)** — Fixes v0.53.0 regression causing `API Error 400: Function call is missing a thought_signature`. Closed.

3. **[Don't abort sendStream on malformed tool arguments](https://github.com/google-gemini/gemini-cli/pull/28695)** — Guards `JSON.parse()` on string tool args; closes #28649. Closed.

4. **[Keep sendStream alive on malformed tool arguments](https://github.com/google-gemini/gemini-cli/pull/28660)** — Defensive parsing: rejects arrays/primitives/null, converts invalid args to structured `functionResponse` errors. Open — overlapping with #28695; needs reconciliation.

5. **[Unwrap nested gaxios streaming errors](https://github.com/google-gemini/gemini-cli/pull/28689)** — Improves quota/rate-limit error classification and fallback handling for Gemini Code Assist. Closed.

6. **[Dynamically resolve Cloud Workstations proxy redirect URI for OAuth](https://github.com/google-gemini/gemini-cli/pull/28688)** — Fixes OAuth failures in Cloud Workstations VMs where browser runs locally but CLI runs remote. Open.

7. **[Correct fallback on model capacity errors for GCA agent mode](https://github.com/google-gemini/gemini-cli/pull/28670)** — Fixes infinite retry loop on `MODEL_CAPACITY_EXHAUSTED` (HTTP 429) — now falls back to Flash. Closed.

8. **[Repair /compress session reload and quota-fallback tool response loss](https://github.com/google-gemini/gemini-cli/pull/28672)** — Two fixes: `/compress` failing with "Failed to load resumed session data", and tool responses lost on quota fallback. Closed.

9. **[Stop a new user message fusing into an unanswered tool response](https://github.com/google-gemini/gemini-cli/pull/28700)** — Fixes the "model finishes your sentence instead of answering" bug after stream failure or ESC interrupt. Closed.

10. **[Handle npm dist-tag deletion failures on restricted registries](https://github.com/google-gemini/gemini-cli/pull/28694)** — Handles `403 Forbidden` from Wombat Dressing Room during nightly release process. Closed.

## Feature Request Trends
- **Agent self-awareness**: Users want the CLI to understand its own flags, hotkeys, and mechanics to self-guide ([#21432](https://github.com/google-gemini/gemini-cli/issues/21432)).
- **Subagent observability**: Improved visibility and sharing of subagent trajectories via `/chat share` ([#22598](https://github.com/google-gemini/gemini-cli/issues/22598)).
- **AST-aware tooling**: Dedicated epic to explore AST-aware reads/search/mapping for precision and token efficiency ([#22745](https://github.com/google-gemini/gemini-cli/issues/22745), [#22746](https://github.com/google-gemini/gemini-cli/issues/22746)).
- **OS-level sandboxing**: Enable native bash workflows while keeping safety through sandboxing rather than tool restriction ([#19873](https://github.com/google-gemini/gemini-cli/issues/19873)).
- **Destructive behavior guardrails**: Model should prefer safe alternatives over `git reset --force` and risky DB operations ([#22672](https://github.com/google-gemini/gemini-cli/issues/22672)).
- **Browser agent resilience**: Automatic session takeover, lock recovery, and settings.json overrides ([#22232](https://github.com/google-gemini/gemini-cli/issues/22232), [#22267](https://github.com/google-gemini/gemini-cli/issues/22267)).

## Developer Pain Points
- **Subagent reliability**: False success signals, permanent hangs, and ignoring explicit settings erode trust in delegation — the most repeated theme this week.
- **Shell execution fragility**: Commands stuck at "Waiting input" after completion, interactive prompt deadlocks (e.g., vite), and model littering temp scripts across the workspace.
- **Memory system friction**: Auto Memory re-processing low-signal sessions, sending secrets to model context before redaction, and silently skipping invalid patches.
- **Tool-scope limits**: A 400 error when >128 tools are loaded; users expect agent to prune unused tools automatically ([#24246](https://github.com/google-gemini/gemini-cli/issues/24246)).
- **Observability gaps**: `/bug` reports lack subagent context; shared chat misses subagent trajectories — making debugging harder for end users and maintainers.
- **Configuration surprises**: `settings.json` overrides ignored by browser agent; symlinked agent files not recognized; subagents running despite being disabled since v0.33.0.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-08-06

## Today's Highlights

Two patch releases (v1.0.79-3, v1.0.79-5) landed within 24 hours, introducing worktree-based session isolation and multi-concurrent-session management from the Sessions tab. The community is actively reporting regressions around MCP initialization failures, view tool path validation, and web_search hallucination issues, with new reports surfacing daily.

## Releases

**v1.0.79-5** — **Added:** Manage multiple concurrent sessions from the Sessions tab and sidebar. **Improved:** Prompt pinning is now off by default; enable with `pinnedPrompts: true`. **Fixed:** Sandboxed wrapper builds (make and friends) now receive dev tool caches based on the build manifest.

**v1.0.79-4** — Pre-release.

**v1.0.79-3** — **Improved:** Use `/worktree new` to start a new session in a new worktree.

**v1.0.79-2** — **Improved:** Pinned prompt now sits one row higher, in the row the tab bar already reserves, preserving prompt shape while costing the timeline one row less. Pinned prompt is off by default on terminals under 30 rows; enable via `pinnedPrompts`.

## Hot Issues

1. **[#1799 — How to turn off alt-screen views?](https://github.com/github/copilot-cli/issues/1799)** — The alt-screen rendering mode is causing layout disruption for users. 12 comments, 8 👍, open since March. Community seeking a configuration toggle to revert to the original display mode.

2. **[#4202 — Built-in view reports "Path does not exist" for existing files in 1.0.73](https://github.com/github/copilot-cli/issues/4202)** — A regression starting in 1.0.72 breaks the built-in `view` tool on valid file paths. The user provides a controlled repro and notes 1.0.71 succeeds consistently. High-impact for tool reliability.

3. **[#4345 — Reasoning effort 'medium' not supported for claude-haiku-4.5](https://github.com/github/copilot-cli/issues/4345)** — Feature flags enabling medium effort default break sub-agent execution when model is Claude Haiku 4.5. Error thrown repeatedly during sub-agent execution. 4 👍 in 2 days.

4. **[#3172 — Strange "Somebody else is owning the clipboard" message](https://github.com/github/copilot-cli/issues/3172)** — A clipboard ownership race message appears at the status line and breaks layout. 7 👍 — one of the most-upvoted open issues — indicating broad irritation.

5. **[#4382 — Kernel execve ENOEXEC on Oracle Linux 10 x86_64](https://github.com/github/copilot-cli/issues/4382)** — npm-installed binary fails to execute on Oracle Linux 10 unless forced via `ld`. Newly filed triage issue with no comments yet; potentially a packaging ELF header issue.

6. **[#4370 — MCP initialization fails when server/discover returns -32602](https://github.com/github/copilot-cli/issues/4370)** — Copilot CLI 1.0.79-1 cannot connect to FastMCP-based servers because it requires `server/discover`, which FastMCP doesn't implement. Treating `-32602` as fatal blocks all MCP connectivity.

7. **[#4378 — Cloud agent MCP registry policy fetch 401/403 on GHEC data residency](https://github.com/github/copilot-cli/issues/4378)** — Enterprise customers on data residency instances have all user-configured MCP servers silently dropped; only platform defaults reach the model. Newly filed; significant enterprise impact.

8. **[#4093 — web_search returns fabricated answers with no grounding](https://github.com/github/copilot-cli/issues/4093)** — The built-in `web_search` tool is reported to produce confident, detailed, entirely fabricated answers when retrieval finds nothing relevant, instead of reporting "no results." Credibility risk for users relying on search.

9. **[#4374 — /mcp search fails with 400 Bad Request in Azure DevOps repos](https://github.com/github/copilot-cli/issues/4374)** — The interactive MCP registry browser fails whenever the git remote points to Azure DevOps. 4 👍 quickly; suggests broad impact on non-GitHub-remote users.

10. **[#4026 — Copilot CLI crashes repeatedly on Windows across versions](https://github.com/github/copilot-cli/issues/4026)** — Native runtime crashes during normal interactive use, reproducible across at least four versions since May 2026. Windows stability remains a persistent pain point.

## Key PR Progress

No pull requests were updated in the last 24 hours.

## Feature Request Trends

- **Prompt pinning UX refinements** — Recent releases iterate on pinned prompt placement and default behavior, responding to terminal-crowding feedback.
- **Worktree-based session isolation** — `/worktree new` introduces per-session worktrees, a direction toward better multi-task isolation.
- **Concurrent session management** — The Sessions tab now supports multiple concurrent sessions, aligning with user demand for richer session orchestration.
- **BYOM model discovery and switching** — [#4376](https://github.com/github/copilot-cli/issues/4376) requests in-session model switching for BYOM providers instead of requiring restart.
- **MCP server compatibility** — Multiple issues (#4370, #4378, #4371) point to demand for broader MCP server compatibility, including FastMCP, OAuth 3LO flows, and enterprise policy handling.

## Developer Pain Points

- **MCP integration fragility** — Recurring failures: unsupported methods (`-32602`), policy fetch 401/403 on GHEC, and OAuth 3LO `-32042` blocking tool invocation. Developers are hitting walls across MCP server types.
- **Terminal rendering regressions** — Alt-screen views (#1799), clipboard ownership messages (#3172), and pinned prompt layout issues continue to disrupt the interactive experience.
- **Tool reliability regressions** — The `view` tool path-exists regression (#4202) and the `web_search` hallucination issue (#4093) undermine confidence in built-in tools.
- **Windows crashes** — Persistent native-runtime crashes on Windows across multiple versions with no resolution since May (#4026).
- **Reasoning effort/model mismatch errors** — Feature flags forcing unsupported reasoning effort on models like Claude Haiku 4.5 cause repeated sub-agent failures (#4345).
- **Git-remote-dependent failures** — `/mcp search` failing on Azure DevOps remotes (#4374) and GitHub login not persisting in browser canvas (#4379) highlight over-coupling to GitHub-specific assumptions.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

## Kimi Code CLI Community Digest — 2026-08-06

### Today's Highlights

The community is converging on two critical issues: file corruption when handling non-UTF-8 bytes in `StrReplaceFile` and an abort-after-side-effect failure when models lack declared capabilities. Two open PRs directly target the capability problem—one fixing the mid-task abort behavior, another improving the error message—but both remain open. No new releases shipped in the last 24 hours.

### Releases

No new releases in the last 24 hours.

### Hot Issues

- **[#2591 — StrReplaceFile corrupts undecodable bytes outside the edited region](https://github.com/MoonshotAI/kimi-cli/issues/2591)** — `StrReplaceFile` decodes the entire file with `errors="replace"` before string editing, silently writing U+FFFD for any non-UTF-8 bytes anywhere in the file. This can quietly corrupt binary or mixed-encoding files during routine edits far from the actual change. High severity, no comments yet, filed yesterday.

- **[#2588 — Model declared without capabilities: an image-returning MCP tool aborts the run mid-task](https://github.com/MoonshotAI/kimi-cli/issues/2588)** — When a model in `config.toml` lacks `capabilities` and an MCP tool returns an image, the task aborts *after* tool side effects already executed, with an error that doesn't explain the fix. Two PRs now address halves of this issue.

- **[#1283 — Feature Request: Memory System - Persistent context across sessions](https://github.com/MoonshotAI/kimi-cli/issues/1283)** — Long-running request (since February) with 19 comments asking for automatic and manual memory: AI-managed notes plus user-defined instructions persisted across sessions. High community engagement, but no linked implementation yet.

### Key PR Progress

- **[#2592 — fix(soul): degrade unsupported tool media instead of aborting mid-task](https://github.com/MoonshotAI/kimi-cli/pull/2592)** — Directly resolves #2588's core problem: instead of raising `LLMNotSupported` after a tool already ran (leaving side effects applied), unsupported media now degrades gracefully. Prevents task interruption and wasted side effects.

- **[#2590 — fix(soul): name the config fix in the unsupported-capability error](https://github.com/MoonshotAI/kimi-cli/pull/2590)** — Partially addresses #2588 by improving error messaging: the user is now told exactly which capability is missing and what config change to make. Small, self-contained fix.

- **[#2589 — docs: mention qwen-audio-agent as a voice ACP client](https://github.com/MoonshotAI/kimi-cli/pull/2589)** — Documentation-only PR adding a voice-based ACP client mention to the ACP section. Author discloses affiliation with the project.

### Feature Request Trends

- **Persistent Memory System (#1283)** — The single most-requested feature direction: cross-session context retention that learns project patterns and user preferences over time.
- **Better error diagnostics for model configuration (#2588)** — Users want actionable error messages that tell them exactly what to fix in `config.toml`, not just what's wrong.
- **Graceful degradation over hard failures (#2588, #2592)** — The pattern of "run tool → fail after side effects" is unacceptable to the community; tools should degrade gracefully when model capabilities don't match data types.

### Developer Pain Points

- **Silent file corruption (#2591)** — String-based file editing is trying to handle arbitrary binary-encoded files, causing unrecoverable corruption (bytes → U+FFFD with no warning).
- **Non-atomic tool execution (#2588)** — Tool side effects persist even when the subsequent model call fails, leaving tasks in an inconsistent state with no rollback path.
- **Config-drift confusion (#2588, #2590)** — Errors about model capabilities frequently don't self-document the required config change, forcing developers into trial-and-error debugging of `config.toml`.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-08-06

## Today's Highlights

v1.18.14 ships with a streamlined xAI single-device-code login and improved provider error handling. The community continues to push for an official VS Code extension and Go plan usage APIs, while a batch of cleanup PRs from contributor kitlangton signals active core refactoring. A critical regression in `/sessions` was reported following the latest release, and work progresses on V2 data migration and workspace execution.

## Releases

**v1.18.14**
- **Core Improvements:** Simplified xAI login to a single device-code flow, optimized for headless and remote environments.
- **Bugfixes:** Preserved structured mid-stream provider errors for compatible retries; added retry logic for transient provider and network errors.

## Hot Issues

1. **[#16017 — Add Go plan usage/balance API endpoint](https://github.com/anomalyco/opencode/issues/16017)** — 126 👍, 32 comments. High demand for programmatic access to subscription usage beyond the dashboard. Long-running request (since March) with sustained community interest.

2. **[#11176 — Official OpenCode VS Code extension](https://github.com/anomalyco/opencode/issues/11176)** — 134 👍, 27 comments. Persistent top request despite third-party alternatives; users want native integration with editor workflows.

3. **[#39845 — DeepSeek V4 Flash suddenly requires China-hosted opt-in](https://github.com/anomalyco/opencode/issues/39845)** — 22 👍, 17 comments. Mid-session breakage due to unexpected regional model restrictions on Go subscription; a trust and reliability concern.

4. **[#23153 — Pay Go with crypto](https://github.com/anomalyco/opencode/issues/23153)** — 36 👍, 16 comments. Growing user base requesting alternative payment methods for the subscription service.

5. **[#34498 — Respect disable-model-invocation in SKILL.md frontmatter](https://github.com/anomalyco/opencode/issues/34498)** — 49 👍, 13 comments. Skill authors want parity with Claude Code's ability to prevent models from invoking certain skills directly.

6. **[#40759 — /sessions does not work anymore (v1.18.14 regression)](https://github.com/anomalyco/opencode/issues/40759)** — 0 👍, 2 comments. Switching sessions wipes chat history and context. Critical regression in the latest release; needs immediate triage.

7. **[#31932 — Cross-project session list/picker for TUI](https://github.com/anomalyco/opencode/issues/31932)** — 6 👍, 14 comments. Multi-repo developers need a global session picker; related duplicate discussion in #35581.

8. **[#37564 — "Auto mode" LLM model classifier auto-approval for permissions](https://github.com/anomalyco/opencode/issues/37564)** — 12 👍, 6 comments. Users want intelligent auto-approval classification similar to other agentic tools to reduce manual prompt fatigue.

9. **[#40348 — Global AGENTS.md rules repeatedly forgotten across sessions](https://github.com/anomalyco/opencode/issues/40348)** — 0 👍, 2 comments. Persistent frustration: global configuration constraints (e.g., "no auto-commit") are not consistently honored.

10. **[#40689 — Autocomplete skill invocations mid-prompt](https://github.com/anomalyco/opencode/issues/40689)** — 0 👍, 3 comments. Skills and commands should autocomplete not only at prompt start but anywhere in the input line.

## Key PR Progress

1. **[#40723 — feat(core): migrate v1 data to v2](https://github.com/anomalyco/opencode/pull/40723)** — Merged. Resumable REST-triggered V1 session migration with legacy credential import; updates the TUI migration flow.

2. **[#40784 — feat(core): hosted workspace execution with modal driver](https://github.com/anomalyco/opencode/pull/40784)** — Open. Introduces durable Workspace execution environments; Sessions named by `workspaceID` run against that environment via the existing runner graph.

3. **[#40787 — refactor(core): remove obsolete migration relics](https://github.com/anomalyco/opencode/pull/40787)** — Open. Deletes 175 lines of dead code while introducing a schema-owned `JobID` branded type.

4. **[#40781 — feat(app): export session as JSON from UI](https://github.com/anomalyco/opencode/pull/40781)** — Merged. Adds `/export` command palette action and dropdown entry for full transcript export.

5. **[#40768 — fix(mcp): survive cross-process OAuth refresh race](https://github.com/anomalyco/opencode/pull/40768)** — Open. Prevents login failures when two processes share MCP credential rows and race on token refresh.

6. **[#40769 — fix(mcp): reuse registered dynamic client on re-login](https://github.com/anomalyco/opencode/pull/40769)** — Open. Fixes redundant dynamic client registration by persisting client information across authorization flows.

7. **[#38790 — feat(app): add workspace flows to new layout](https://github.com/anomalyco/opencode/pull/38790)** — Open. Ports Q3 workspace flows: local/existing workspace selection with long-list search, branch context, and defaults.

8. **[#40765 — refactor(core): deduplicate Copilot endpoint routing](https://github.com/anomalyco/opencode/pull/40765)** — Open. Removes duplicate fallback logic by importing shared `shouldUseResponsesApi` from the AI package.

9. **[#27554 — feat(opencode): local LAN provider discovery + auto-discover models](https://github.com/anomalyco/opencode/pull/27554)** — Open. Long-running PR adding mDNS-based local provider discovery in `/connect`; community has waited since May.

10. **[#40772 — fix(opencode): report a missing auth method instead of crashing](https://github.com/anomalyco/opencode/pull/40772)** — Open. Guards against unhandled crashes when auth hooks are missing.

## Feature Request Trends

- **VS Code & Editor Integration:** The most-upvoted open feature (#11176) continues to dominate; desktop and web UI gaps (#40786) compound the demand.
- **Go Plan/Subscription APIs:** Users want programmable access to usage, balance, and payment flexibility (#16017, #23153); a reliability concern when models suddenly require regional opt-ins (#39845).
- **Session Management Redesign:** Strong interest in cross-project session pickers (#31932, #35581), mid-line autocomplete for commands and skills (#40689, #40719), and skill visibility in root autocomplete (#40720).
- **Workspace & Agent Orchestration:** Multi-agent workflow visualization (#40564), hosted workspace execution (#40784), and computer-use capabilities (#40782) show a push toward more autonomous, parallel execution models.
- **Local/Offline First:** LAN provider discovery (#27554) and bundled ripgrep for offline Windows (#31734) reflect a persistent desire to reduce dependency on remote services.

## Developer Pain Points

- **Configuration Not Respected:** Repeated reports that global `AGENTS.md` rules are forgotten, and `SKILL.md` frontmatter flags are ignored (#40348, #34498). This erodes trust in deterministic agent behavior.
- **Session/History Reliability:** The v1.18.14 regression where `/sessions` wipes context (#40759), empty Web UI history (#40399), and the absence of delete/archive options (#40786) all point to a fragile session store experience.
- **Provider Auth Friction:** Runtime issues with model availability changes (#39845), missing auth method crashes (#40772), and multi-process OAuth races (#40768) create unpredictable mid-session failures.
- **Tooling Gaps:** The agent prefers bash over structured tools (#14791), and features like cross-process MCP re-login (#40769) and autocomplete inside references (#34040) remain unresolved, slowing daily workflows.
- **Offline/Remote Usability:** Missing local binaries (ripgrep for Windows, #31734) and anonymous GitHub request failures in install scripts (#40590) highlight environment fragility in restricted networks.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-08-06

## Today's Highlights

Qwen Code shipped a new nightly release (v0.21.6-nightly.20260806) with test stability fixes, while the project's most pressing topics center on security—a read-only shell classifier vulnerability (P1) and a provider warning sanitizer credential leak. Community momentum is strong around desktop app re-architecture, with multiple feature requests pushing for a Web Shell-based Tauri desktop experience.

## Releases

**v0.21.6-nightly.20260806.cb3dc107f** — Nightly release containing a single test fix: deflaking the glob external-path test by using a dedicated empty directory instead of `/tmp` ([#8604](https://github.com/QwenLM/qwen-code/pull/8604)).

**v0.21.6** — Notable highlights:
- Experimental native Live Voice support for WebShell on macOS with real-time audio via global shortcut ([#7859](https://github.com/QwenLM/qwen-code/pull/7859))
- Web Shell keeps conversation turns expanded during active background work

**desktop-v0.1.0** — Qwen Code Desktop v0.1.0 release with CI fixes for the qwen-triage container jobs ([#7838](https://github.com/QwenLM/qwen-code/pull/7838)) and Web Shell preselection fixes.

## Hot Issues

1. **[#8582 — Read-only shell classifier auto-approves command substitution (P1, Security)](https://github.com/QwenLM/qwen-code/issues/8582)** — Both the AST-based classifier and runtime substitution gate can be bypassed using line continuations or `${var@P}` expansion, allowing arbitrary code execution in read-only mode. High severity due to security implications; 4 comments.

2. **[#8136 — Provider warning sanitizer truncates messages and leaks passwords (P2, Security)](https://github.com/QwenLM/qwen-code/issues/8136)** — The sanitizer mishandles URLs with ports and `@` in passwords, truncating messages and leaking credentials. A fix PR is already open ([#8408](https://github.com/QwenLM/qwen-code/pull/8408)); 8 comments make this the most-discussed issue.

3. **[#8615 — Desktop 0.1.0 Windows bundled runtime crashes on startup (P1)](https://github.com/QwenLM/qwen-code/issues/8615)** — EISDIR lstat error on `C:` when opening a workspace folder in the new Desktop v0.1.0. The 2 comments indicate fresh report status.

4. **[#8597 — CI /review reverse-audit fan-out hangs until timeout (P1)](https://github.com/QwenLM/qwen-code/issues/8597)** — 12 timeouts on Aug 4, 9 more on Aug 5, most burning the full 360-minute budget with a dominant failure mode in 4 of 5 runs. CI reliability concern.

5. **[#8557 — Terminal shrink reprints transcript blocks in scrollback (P3)](https://github.com/QwenLM/qwen-code/issues/8557)** — macOS/Warp rendering bug causing duplicated output when the terminal narrows. Related to tmux/rendering issues reported by multiple users.

6. **[#8580 — TUI flickers continuously in tmux < 3.5 (P2)](https://github.com/QwenLM/qwen-code/issues/8580)** — Root cause traced to Ink renderer's overflow handling guarded only by unqueried DEC 2026; full-screen clear+repaint ~2-3x/sec. Related issue [#8562](https://github.com/QwenLM/qwen-code/issues/8562) reports the same problem via SSH+tmux.

7. **[#8606 — VSCode companion file links resolve to workspace root (P2)](https://github.com/QwenLM/qwen-code/issues/8606)** — Edit/Write file links always resolve to `<workspace-root>/<basename>`, breaking navigation for any nested file path.

8. **[#8560 — Web Shell session deep-link refresh returns 401 with bearer token (P2)](https://github.com/QwenLM/qwen-code/issues/8560)** — Authentication regression when refreshing `/session/<id>` URLs with `qwen serve --token`.

9. **[#8538 — Desktop copy-response button non-functional on Windows (P2)](https://github.com/QwenLM/qwen-code/issues/8538)** — Clipboard remains unchanged across restarts, Windows reboots, and multiple test scenarios.

10. **[#8532 — CI logs make mocked disk-full errors look real (P3)](https://github.com/QwenLM/qwen-code/issues/8532)** — Error-path unit tests throw `new Error('disk full')` which looks like genuine runner ENOSPC in CI logs, confusing troubleshooting.

## Key PR Progress

1. **[#8501 — Report signal-terminated shell commands as errors](https://github.com/QwenLM/qwen-code/pull/8501)** — Fixes signal-terminated foreground commands resolving as clean exits; preserves normal PTY exit and cancellation semantics.

2. **[#8408 — Authority-scoped credential stripping in provider warning sanitizer](https://github.com/QwenLM/qwen-code/pull/8408)** — Fixes both port truncation and password leaks in the sanitizer that ships with issue #8136.

3. **[#7897 — Skip terminal redraw optimizer on WSL/ConPTY](https://github.com/QwenLM/qwen-code/pull/7897)** — Fixes the WSL + Windows Terminal streaming text duplication bug by detecting ConPTY; the oldest open PR actively iterated on.

4. **[#8353 — ESC cancels ongoing work before popping queued messages](https://github.com/QwenLM/qwen-code/pull/8353)** — When streaming, ESC now cancels the request globally instead of being consumed by input queue logic.

5. **[#8576 — Switch @ completion category tabs with bare arrow keys](https://github.com/QwenLM/qwen-code/pull/8576)** — Replaces Ctrl+arrow/Ctrl+Tab bindings with bare arrow key navigation when the tab bar is visible.

6. **[#8570 — Report zero-height VP items to release reserved space](https://github.com/QwenLM/qwen-code/pull/8570)** — Collapsed thinking blocks now immediately release vertical space in virtual viewport mode.

7. **[#8616 — Align session lifecycle with OpenTelemetry](https://github.com/QwenLM/qwen-code/pull/8616)** — Emits standard OTel `session.start`/`session.end` LogRecords with proper session ID and resumption semantics.

8. **[#8290 — Fail closed on zero inode file cache](https://github.com/QwenLM/qwen-code/pull/8290)** — Prevents shared `dev:0` cache collisions for filesystems where `fs.Stats.ino` is 0.

9. **[#8394 — Maven multi-module verification for /review](https://github.com/QwenLM/qwen-code/pull/8394)** — Adds deterministic Maven reactor detection with changed-file mapping to deepest module, plus module-ratio gating.

10. **[#8241 — Restore per-group session isolation for QQ Bot channel](https://github.com/QwenLM/qwen-code/pull/8241)** — Removes forced `sessionScope: 'single'` override that broke session isolation when `groupAllPolicy` was `keyword` or `all`.

## Feature Request Trends

- **Desktop re-architecture**: Multiple requests ([#8092](https://github.com/QwenLM/qwen-code/issues/8092), [#8596](https://github.com/QwenLM/qwen-code/issues/8596)) push to deprecate the Electron app, rename `desktop-shell` to `desktop`, and build entirely around Web Shell as the UI surface.
- **Mobile/remote access**: "Local Control" mode ([#8595](https://github.com/QwenLM/qwen-code/issues/8595)) requests QR-code pairing for phone access to local sessions.
- **Batch/async execution**: `/slow` or `/batch` mode ([#8605](https://github.com/QwenLM/qwen-code/issues/8605)) for lower-cost asynchronous agent runs.
- **Path flexibility**: Allowing `edit`/`write_file` to operate outside the current working directory ([#8581](https://github.com/QwenLM/qwen-code/issues/8581)).
- **Telemetry/SDK alignment**: OpenTelemetry session lifecycle alignment ([#8589](https://github.com/QwenLM/qwen-code/issues/8589)) and TypeScript SDK hook configuration support ([#8591](https://github.com/QwenLM/qwen-code/issues/8591)).

## Developer Pain Points

- **Terminal rendering glitches**: Flickering in tmux < 3.5, duplicate output on terminal resize, and WSL text duplication point to ongoing TUI rendering fragility across platforms.
- **Desktop app bugs**: Copy button broken on Windows, language switching inert, markdown links unclickable, and a startup crash on workspace open — the new Desktop v0.1.0 shows several rough edges.
- **Security and path handling**: The read-only classifier bypass and file-link resolution issues indicate areas where inputs are not being strictly validated; both have active PRs in progress.
- **CI reliability**: Review timeouts burning full 360-minute budgets and misleading disk-full error logs make CI signal noisy and expensive to maintain.
- **Model ID compatibility**: Anthropic dotted-minor aliases and missing Opus 5 token limits ([#8584](https://github.com/QwenLM/qwen-code/issues/8584)) reflect proxy-deployment friction with model parameter parsing.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar).*