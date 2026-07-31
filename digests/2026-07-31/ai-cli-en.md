# AI CLI Tools Community Digest 2026-07-31

> Generated: 2026-07-31 03:23 UTC | Tools covered: 7

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

# Cross-Tool Comparison Report — AI CLI Developer Tools
**Digest date:** 2026-07-31

---

## 1. Ecosystem Overview

The AI CLI tool landscape on 2026-07-31 shows a mature but fast-moving field: seven major tools (Claude Code, OpenAI Codex, Gemini CLI, GitHub Copilot CLI, Kimi Code CLI, OpenCode, Qwen Code) are all actively triaging community feedback, with most engineering energy going into reliability and security hardening rather than new capability demos. Only three releases shipped in the window (Copilot CLI v1.0.77, OpenCode v1.18.10, Qwen nightly), while PR queues at Codex, Gemini, OpenCode, and Qwen remain deep — indicating sustained iteration under the surface. The dominant cross-cutting themes are Windows platform instability, session/state corruption bugs that fail silently, context-window management, and a growing expectation that sessions, settings, and usage data follow users across CLI, desktop, mobile, and web surfaces. Security is emerging as a first-class concern, with an active SSRF fix (CVSS 8.6) in Gemini CLI and a credential-leak sanitizer fix in Qwen Code.

---

## 2. Activity Comparison

| Tool | Hot Issues (digest-highlighted) | Key PRs (24h) | Release Shipped (24h) |
|---|---|---|---|
| Claude Code | 10 (top: #36151, 530👍) | 0 substantive | None |
| OpenAI Codex | 10 (top: #35058, 100👍) | 10 | None |
| Gemini CLI | 10 (P1 hangs, SSRF #28555) | 13 (10 key + 3 notable) | None |
| GitHub Copilot CLI | 10 | 0 | **v1.0.77** |
| Kimi Code CLI | 3 | 1 | None |
| OpenCode | 10 (out of ~50 updated) | 10 | **v1.18.10** |
| Qwen Code | 10 | 10 | **v0.21.1-nightly** |

*Note: "Hot Issues" counts issues highlighted in each digest, not total tracker volume. OpenCode alone saw ~50 issues updated in the window.*

**Interpretation:** OpenCode, Qwen, Gemini, and Codex are in active sprint mode (10+ PRs in-flight each). Claude Code has the strongest raw community engagement but no release/PR movement in the window. Copilot CLI shipped but its PR queue was quiet. Kimi is the least active on all axes.

---

## 3. Shared Feature Directions

These requirements are appearing independently across multiple tool communities:

- **Cross-surface session/context continuity** — Users expect conversations, settings, and projects to follow them across CLI, desktop, mobile, and web.
  - Claude Code: #13843 (claude.ai → CLI context), #42050 (unified sessions)
  - OpenAI Codex: #34804 (remote sessions across machines)
  - Qwen Code: #8092 (reuse Web Shell as desktop UI)

- **Rate-limit / AI-credit transparency** — Custom status lines, reset windows, near-limit warnings.
  - Claude Code: #77846 (per-model rate limits in statusLine)
  - OpenAI Codex: #24080, #32707 (missing 5-hour bucket)
  - Copilot CLI: #4295 (AI-credit near-limit warning, IDE parity)

- **Persistent memory / cross-session context** — AI-managed and user-defined memory that survives sessions.
  - Kimi: #1283 (memory system)
  - Gemini: #26522 / #26525 (Auto Memory retry/redaction cluster)
  - Claude Code: #35150 (programmatic context clear + continuation prompt)

- **Context compaction done right** — Provider-native compaction vs. lossy local summarization.
  - OpenCode: #5200 (OpenAI Responses API compaction)
  - Gemini: #28566 (surface `InvalidStreamError` → suggest `/compress`)
  - Claude Code: #63566 (bundled skill saturates context unconditionally)

- **Subagent observability and control** — Trajectories, termination reasons, status endpoints, tool-execution outcomes.
  - Claude Code: #78217 (managed defaults for subagents)
  - Gemini: #22598, #21763 (subagent trajectories in share/bug reports)
  - Copilot CLI: #4293 (sub-agents returning empty with no error)
  - Qwen Code: #8128, #8180 (subagent status endpoints, tool execution telemetry)

- **Windows reliability** — The most repeated pain point across tools.
  - Codex: 4 of top-10 issues (BSOD/Sysmon, PowerShell polling, sandbox 1920, OneDrive)
  - Claude Code: #80444 (GPU crash leaves MSIX unlaunchable)
  - Qwen Code: #7972 (crashes on 0.21.1), #8146 (LM Studio)

- **MCP ecosystem robustness** — OAuth refresh, argument schema preservation, process lifecycle.
  - Gemini: #28481 (MCP OAuth token refresh)
  - Copilot CLI: #4301 (array-or-string union args stringified)
  - OpenCode: #30123 (30 orphaned MCP processes)

- **Session/state corruption repair** — Wedged sessions, poisoned turns, broken resume.
  - Codex: #32177 (text-log blocks all subsequent turns), #31754 (resume fails after upgrade)
  - Copilot CLI: #3767 (oversized attachment wedges session), #4306 (subtasks freeze)
  - OpenCode: #28507 (infinite empty-message loop), #30054 (history lost after upgrade)
  - Claude Code: #82772 (accepted turn never dispatched), #82773 (grep empty on NUL bytes)

---

## 4. Differentiation Analysis

**Claude Code** is the most enterprise-workflow-oriented: hooks, skills, subagents, and policy automation are central, and the highest-reaction issue in the entire ecosystem today is a mobile account-switching request — signaling a user base that wants the same power across surfaces. However, a year-old hooks regression (#6305) remains open, and v2.1.220 introduced silent failures that undermine trust.

**OpenAI Codex** carries the heaviest Windows platform burden (kernel BSODs, sandbox failures, process-spawning storms) and the most plan/pricing friction (Pro/Plus rate-limit complaints). Its PR queue is internally focused: sandbox event normalization, connector runtime refactors, streaming performance — architecture work that will pay off in reliability.

**Gemini CLI** is the most security- and agent-reliability-focused. It has the clearest P1 triage discipline (hangs, deadlocks, SSRF, EOL upgrades) and is investing in user-facing agent observability (MAX_TURNS misreported as GOAL success is explicitly a trust issue). The Auto Memory and AST-aware tooling epics are the most ambitious feature bets in this cohort.

**GitHub Copilot CLI** is positioning as the IDE-parity challenger: v1.0.77 shipped web OAuth as default, Ctrl+G editing of `ask_user` answers, and sandbox-bypass control. Its community consistently compares it unfavorably with VS Code and Claude Code on credit visibility, VCS-agnostic Rewind, and keyboard navigation — a clear gap-and-catch-up dynamic.

**OpenCode** is the extensibility play: plugin hot-reload, provider-agnostic model config, TUI ergonomics, and a PR queue focused on model-layer correctness (input limits, Gemini thinking levels, xAI mapping, containing Codex behavior inside the OpenAI plugin). It treats provider flexibility as the core value proposition.

**Qwen Code** is the fastest shipper (nightly cadence) with the most architectural ambition per PR: Goal v3 lifecycle in the TUI, daemon adapter state isolation, Agent View supervisor runtime, PR Autofix watchers. Its weakness is Windows/desktop stability and a cluster of Anthropic converter correctness bugs — ironic for a tool that must interoperate with the ecosystem's de-facto message format.

**Kimi Code CLI** is the least differentiated: its only substantive request is a memory system, and its bug reports (429 overloads, intermittent freezes) are issues the other tools have already partially addressed. Community signal is too thin to identify a strategic direction.

---

## 5. Community Momentum & Maturity

- **Most active PR queues (rapid iteration):** OpenCode, Qwen Code, Gemini CLI, OpenAI Codex — each with 10+ in-flight or landed PRs in the 24h window.
- **Highest community engagement:** Claude Code, by a wide margin — 530👍 on a single mobile-account issue (#36151), plus 148 comments. Its users are deeply invested but shipping velocity is not matching demand.
- **Fastest shippers:** OpenCode and Copilot CLI both shipped user-facing releases; Qwen maintains nightly cadence.
- **Maturity gradient (rough):** Claude Code ≈ Copilot CLI (enterprise-scale deployment, broad issue surface) → OpenAI Codex → Gemini CLI → OpenCode ≈ Qwen Code (fast-following, architecture still consolidating) → Kimi Code CLI.

---

## 6. Trend Signals

1. **Windows is the weakest link across every tool.** Kernel-level BSODs (Codex/Sysmon), unlaunchable MSIX packages (Claude), desktop crashes (Qwen), and sandbox failures after upgrades appear across all vendors. Cross-tool opportunity: Windows hardening is an underserved differentiator.

2. **Silent failures are the new trust killer.** Dropped user turns, empty subagent outputs, misleading "GOAL success" telemetry, wedged sessions, and 429s that permanently poison sessions erode confidence faster than visible bugs. Tools that surface actionable recovery paths (e.g., Gemini's `InvalidStreamError` propagation suggesting `/compress`) are the right pattern.

3. **Cross-surface continuity is becoming a baseline assumption.** Users no longer accept session/context silos between CLI, desktop, mobile, and web. This is the single most consistent feature demand across Claude, Codex, and Qwen communities.

4. **Rate-limit and credit transparency is an unsolved problem everywhere.** Multiple communities independently request reset windows, balance visibility, and near-limit warnings. Vendors treating usage as opaque are accumulating resentment.

5. **Agent security is moving from nice-to-have to P1.** SSRF via DNS resolution bypass (Gemini, CVSS 8.6), credential leaks in provider-warning sanitizers (Qwen), workflow supply-chain PoCs (Gemini), and sandbox bypass semantics (Copilot) show that agent tool execution is now being security-audited by the community.

6. **Subagents are becoming a first-class orchestration primitive, but observability lags.** Users want trajectories, tool-execution status, and honest termination reasons — not just final summaries. This is the clearest greenfield for tooling innovation.

7. **Provider-agnostic flexibility is the open-source differentiator.** OpenCode and Qwen are actively supporting Modal discovery, Gemini thinking levels, LM Studio, GHES, and BYO-key auth; vendor-locked CLIs (Claude, Codex, Copilot, Gemini) are being measured against this flexibility.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights  
**Data snapshot: 2026-07-31 · anthropics/skills**  
*Note: PR ranking follows the repository’s comment-sorted order; exact comment counts were not exposed in the snapshot.*

---

## 1. Top Skills Ranking

All PRs below are **open** as of the snapshot.

### 1. fix(skill-creator): run_eval.py always reports 0% recall — [#1298](https://github.com/anthropics/skills/pull/1298)
- **Functionality:** Repairs the skill-creator evaluation pipeline (`run_eval.py`, `run_loop.py`, `improve_description.py`). Installs the eval artifact as a real skill, fixes Windows stream reading, trigger detection, and parallel worker behavior.
- **Discussion highlights:** Directly addresses [#556](https://github.com/anthropics/skills/issues/556) and 10+ independent reproductions. The description-optimization loop was effectively optimizing against noise (`recall=0%` for every skill).
- **Status:** Open.

### 2. Add document-typography skill — [#514](https://github.com/anthropics/skills/pull/514)
- **Functionality:** Typographic quality control for AI-generated documents: orphan word wrap, widow paragraphs, section-header stranding, and numbering misalignment.
- **Discussion highlights:** Strongly relevant to every document Claude generates; users rarely request typography explicitly, so the skill proactively prevents common document-quality defects.
- **Status:** Open.

### 3. fix(pdf): correct case-sensitive file references in SKILL.md — [#538](https://github.com/anthropics/skills/pull/538)
- **Functionality:** Fixes 8 case-sensitivity mismatches in `skills/pdf/SKILL.md` (`REFERENCE.md` → `reference.md`, `FORMS.md` → `forms.md`).
- **Discussion highlights:** Important for case-sensitive filesystems; prevents skill breakage on Linux/macOS and CI environments.
- **Status:** Open.

### 4. Add ODT skill — OpenDocument text creation and conversion — [#486](https://github.com/anthropics/skills/pull/486)
- **Functionality:** Creates, fills, reads, and converts OpenDocument files (`.odt`, `.ods`), including ODT→HTML parsing and template filling.
- **Discussion highlights:** Expands official document-format coverage beyond PDF/DOCX; strongly requested for open-source, ISO-standard, and LibreOffice workflows.
- **Status:** Open.

### 5. Improve frontend-design skill clarity and actionability — [#210](https://github.com/anthropics/skills/pull/210)
- **Functionality:** Revises the frontend-design skill so every instruction is actionable in a single conversation; improves internal coherence and behavioral specificity.
- **Discussion highlights:** Community interest in making existing skills more execution-ready rather than merely educational.
- **Status:** Open.

### 6. Add skill-quality-analyzer and skill-security-analyzer to marketplace — [#83](https://github.com/anthropics/skills/pull/83)
- **Functionality:** Two meta-skills: one evaluates skills across structure/documentation/resource quality, the other analyzes security and trust boundaries.
- **Discussion highlights:** Aligns with the security concerns raised in [#492](https://github.com/anthropics/skills/issues/492); helps authors validate skills before distribution.
- **Status:** Open.

### 7. fix(docx): prevent tracked change w:id collision with existing bookmarks — [#541](https://github.com/anthropics/skills/pull/541)
- **Functionality:** Prevents document corruption when the DOCX skill adds tracked changes to files with existing bookmarks; properly handles the shared OOXML `w:id` space.
- **Discussion highlights:** Critical for round-tripping real-world documents; hardcoded low IDs previously collided with bookmarks/comments.
- **Status:** Open.

### 8. fix(skill-creator): warn on unquoted description with YAML special characters — [#539](https://github.com/anthropics/skills/pull/539)
- **Functionality:** Adds pre-parse validation in `quick_validate.py` to detect unquoted `description` fields containing `:` before `yaml.safe_load()` runs.
- **Discussion highlights:** Prevents silent frontmatter truncation, a common authoring failure that breaks skill descriptions.
- **Status:** Open.

---

## 2. Community Demand Trends

From the most-commented issues, the community’s strongest demands are:

- **Skill lifecycle & tooling reliability**  
  Issues such as [#556](https://github.com/anthropics/skills/issues/556), [#1169](https://github.com/anthropics/skills/issues/1169), [#1061](https://github.com/anthropics/skills/issues/1061), [#62](https://github.com/anthropics/skills/issues/62), and [#189](https://github.com/anthropics/skills/issues/189) show broad frustration with broken evaluation, Windows incompatibility, disappearing skills, and duplicate plugin content. Users want dependable authoring, validation, and installation tooling.

- **Security, trust & governance**  
  [#492](https://github.com/anthropics/skills/issues/492) (community skills under the `anthropic/` namespace), [#412](https://github.com/anthropics/skills/issues/412) (agent-governance skill), and [#1175](https://github.com/anthropics/skills/issues/1175) (SharePoint permission/security) indicate demand for security-aware skills and official trust boundaries.

- **Enterprise collaboration & distribution**  
  [#228](https://github.com/anthropics/skills/issues/228) requests org-wide skill sharing in Claude.ai; [#29](https://github.com/anthropics/skills/issues/29) asks for AWS Bedrock support; [#16](https://github.com/anthropics/skills/issues/16) proposes exposing Skills as MCPs. The community wants Skills to work across teams, platforms, and protocols.

- **Context-window & token efficiency**  
  [#1487](https://github.com/anthropics/skills/issues/1487) reports the `claude-api` skill injecting ~156k tokens in one call; [#189](https://github.com/anthropics/skills/issues/189) flags duplicate skill content; [#1329](https://github.com/anthropics/skills/issues/1329) proposes a compact-memory notation. Token budget control is a major pain point.

- **Authoring quality & best practices**  
  [#202](https://github.com/anthropics/skills/issues/202) calls for skill-creator to be updated to operational best practices, and [#1385](https://github.com/anthropics/skills/issues/1385) proposes a reasoning-quality gate pipeline. Users want the official tooling to enforce higher-quality, more efficient skills.

---

## 3. High-Potential Pending Skills

These open PRs are active, discussion-rich, and represent likely near-term additions to the Skills ecosystem:

- **[Add testing-patterns skill — #723](https://github.com/anthropics/skills/pull/723)**  
  Comprehensive testing skill: Testing Trophy model, unit-testing patterns, React Testing Library, E2E testing, and “what not to test” guidance.

- **[Add pyxel skill for retro game development — #525](https://github.com/anthropics/skills/pull/525)**  
  Integrates with `pyxel-mcp` for retro/pixel-art/8-bit game creation in Python, covering the full write → run_and_capture → inspect → iterate loop.

- **[Add self-audit skill — #1367](https://github.com/anthropics/skills/pull/1367)**  
  Mechanical file verification plus a four-dimension reasoning audit before delivery; designed to be universal across projects and models.

- **[Add color-expert skill — #1302](https://github.com/anthropics/skills/pull/1302)**  
  Self-contained color expertise: naming systems, color-space selection tables, OKLCH/OKLAB gradients, and accessibility-oriented color choices.

- **[Add plan-file-hygiene skill — #1479](https://github.com/anthropics/skills/pull/1479)**  
  Addresses lifecycle management for planning artifacts, preventing accumulation of stale planning files in long-running agent projects.

- **[Add SAP-RPT-1-OSS predictor skill — #181](https://github.com/anthropics/skills/pull/181)**  
  Wraps SAP’s open-source tabular foundation model for predictive analytics on SAP business data.

- **[Add skill-quality-analyzer and skill-security-analyzer — #83](https://github.com/anthropics/skills/pull/83)**  
  Already a top-ranked PR; its meta-skill approach makes it a strong candidate for fast merging because it directly improves community skill quality and safety.

---

## 4. Skills Ecosystem Insight

The community’s most concentrated demand at the Skills level is not for any single new domain — it is for **trustworthy, reliable, and token-efficient Skills infrastructure**: fixing skill-creator evaluation, securing distribution and trust boundaries, preventing context-window bloat, and making Skills safely shareable across teams and platforms.

---

# Claude Code Community Digest — 2026-07-31

## Today’s Highlights
No release shipped in the last 24h. The repo remains dominated by a very active mobile-account-switching request (#36151) and a long-running hook-execution regression (#6305). Several new v2.1.220 reports describe silent failures — dropped user turns and grep wrappers returning empty output on NUL-containing text files — which are worth watching closely.

## Releases
None in the last 24h.

## Hot Issues

1. **#36151 – Multi-account switching in Claude Mobile app without shared email**  
   148 comments, 530 👍. Currently the highest-reaction issue in the repo, showing strong demand for separate mobile accounts without requiring a shared email.  
   https://github.com/anthropics/claude-code/issues/36151

2. **#6305 – Pre/PostToolUse hooks not executing on macOS**  
   38 comments, 16 👍. A core hook-system bug open for almost a year; still affects automation and policy workflows.  
   https://github.com/anthropics/claude-code/issues/6305

3. **#13843 – Share conversation context from Claude.ai to Claude Code**  
   26 comments, 103 👍. Request to carry planning/context from claude.ai into CLI sessions; a recurring workflow-integration ask.  
   https://github.com/anthropics/claude-code/issues/13843

4. **#35150 – Programmatic context clear + continuation prompt for tools/skills**  
   13 comments. Closed/stale, but the idea of letting tools reset context and inject a continuation prompt keeps coming up for long-running tasks.  
   https://github.com/anthropics/claude-code/issues/35150

5. **#80444 – Windows desktop app GPU crash leaves MSIX package unlaunchable**  
   10 comments. Opening the in-app Browser tab can crash the GPU process hard enough that the app won’t start until repaired. Highest severity on Windows this week.  
   https://github.com/anthropics/claude-code/issues/80444

6. **#64624 – Real-time steering: send message mid-generation without queueing**  
   9 comments, 17 👍. Users want to nudge an in-progress generation instead of waiting or Escape-cancelling; docs allegedly describe this but it isn’t implemented.  
   https://github.com/anthropics/claude-code/issues/64624

7. **#79824 – Artifact sharing fails: “This version can't be shared publicly”**  
   8 comments, 15 👍. Persists across republish and new artifacts, blocking a primary sharing workflow.  
   https://github.com/anthropics/claude-code/issues/79824

8. **#42050 – Unified sessions, settings & projects across Desktop, Mobile, CLI**  
   6 comments, 27 👍. Mirrors #13843 and the mobile-account ask; users increasingly expect state to follow them across all Claude surfaces.  
   https://github.com/anthropics/claude-code/issues/42050

9. **#77846 – Expose `rate_limits.model_scoped` in statusLine stdin**  
   6 comments. StatusLine scripts can already see 5-hour/7-day limits; adding per-model weekly windows (e.g. Fable) would improve custom plan/usage UIs.  
   https://github.com/anthropics/claude-code/issues/77846

10. **#63566 – `/claude-api` bundled skill saturates context unconditionally**  
    6 comments, 7 👍. A neutral question can spike context usage ~77%, making an official bundled skill a serious context-budget hazard.  
    https://github.com/anthropics/claude-code/issues/63566

## Key PR Progress
No substantive PR activity in the last 24h. The only PR touched was **#82555 – “Claude/youtube instagram mcp yn2u6s”**, already closed and appearing unrelated/spammy.  
https://github.com/anthropics/claude-code/pull/82555

## Feature Request Trends
- **Cross-surface continuity**: Users want sessions, settings, and conversation context to move seamlessly between Claude.ai, Desktop, Mobile, and CLI (#13843, #42050).
- **Programmatic session/context management**: Tools, hooks, and skills should be able to clear context, inject continuation prompts, and rename sessions (#35150, #72404).
- **More observable usage/limits**: Custom statuslines and automation want finer-grained rate-limit data and configurable memory index limits (#77846, #79217).
- **Managed defaults for subagents**: A “managed default” model for subagents is requested so orchestration settings are consistent without manual per-agent config (#78217).

## Developer Pain Points
- **Context-window fragility**: Bundled skills and long sessions still consume/overflow context unpredictably, and there is no sanctioned “save state + continue later” mechanism (#63566, #80787, #35150).
- **Hook reliability**: Hooks fail to run or run twice depending on how skills/slash commands load tools (#6305, #73774).
- **Silent failures in 2.1.220**: A user turn was accepted, dequeued, and never dispatched (#82772); the Bash-tool grep wrapper silently returns nothing on text files with a stray NUL byte because ugrep treats them as binary (#82773).
- **State/sync bugs**: On Windows, scheduled tasks re-fire after restart and even run disabled tasks (#74055); iOS Code sessions auto-archive and become inaccessible (#71616); Cowork conversations disappeared across Desktop/Web/Android (#81658).
- **Packaging/platform breakage**: Windows GPU crash can make the installed MSIX package unlaunchable until repair (#80444), and “auto-update failed – run claude doctor” shows no actual problem (#82408).
- **Misleading labels and blocked operations**: Subagents with `tools: []` are advertised as “All tools” (#82562); `/fork` is blocked in `--dangerously-skip-permissions` sessions even though the restriction check is inverted (#79575).

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-07-31

## Today’s Highlights

No new releases landed in the last 24 hours. Community attention is concentrated on Windows reliability issues, with multiple high-traffic reports covering sandbox failures, Sysmon/BSOD crashes, and performance problems. Meanwhile, the most-liked issue is a macOS VS Code **Codex Diff** crash, and the PR queue shows steady internal progress on sandbox event normalization, app-server protocol exports, and streaming performance.

## Releases

None in the last 24 hours.

## Hot Issues

1. **[#35058 — Codex Diff crashes with “Oops, an error has occurred” in VS Code on macOS](https://github.com/openai/codex/issues/35058)**  
   The top issue this week: Codex Diff is unusable in VS Code after edits on Apple Silicon. 39 comments and 100 👍 make it the clearest “fix me first” signal in the current tracker.

2. **[#31035 — Windows Codex Desktop reinstalls SysmonDrv v13.22; WinDbg points to SysmonDrv.sys BSODs](https://github.com/openai/codex/issues/31035)**  
   A severe Windows kernel-stability report: Codex Desktop appears to re-enable Sysmon after forced uninstall, and multiple crash dumps implicate `SysmonDrv.sys`. 22 comments show significant user stress around repeated BSODs.

3. **[#25453 — Windows Codex Desktop spawns powershell.exe every second for process polling](https://github.com/openai/codex/issues/25453)**  
   A performance bug causing constant PowerShell process creation and high CPU usage. 20 comments confirm this is not an isolated environment issue.

4. **[#35420 — Codex stream repeatedly disconnects when workspace is OneDrive-backed and OneDrive is degraded](https://github.com/openai/codex/issues/35420)**  
   Windows users lose active Codex sessions when OneDrive misbehaves. The 17-comment thread focuses on poor error handling around cloud-backed workspace paths.

5. **[#20570 — Windows sandbox: `CreateProcessAsUserW failed: 1920` after upgrading Codex](https://github.com/openai/codex/issues/20570)**  
   A long-running Windows sandbox regression affecting CLI users after upgrades. 15 comments and 11 👍 indicate widespread impact for native Windows sandbox users.

6. **[#15723 — Background subprocesses/subagents do not wake the calling agent on completion](https://github.com/openai/codex/issues/15723)**  
   A core agentic-behavior bug: background agents finish but never wake the parent agent, breaking autonomous workflows. 13 comments from API-key and Linux users highlight its impact on scripting and multi-agent setups.

7. **[#32177 — Text-log attachment can trigger “Request blocked” and poison subsequent turns](https://github.com/openai/codex/issues/32177)**  
   Attaching a plain-text log can permanently corrupt the current session’s request flow. 12 comments and 12 👍 make this one of the more resonant session-state bugs this week.

8. **[#26930 — Reasoning level resets from xhigh/high to low after delegations/continuations](https://github.com/openai/codex/issues/26930)**  
   Pro users report that reasoning effort silently drops mid-thread after delegation. Frustrating because it changes output quality without any user action.

9. **[#31754 — Regression in codex-cli 0.143.0: `Unknown parameter: input[...].namespace`](https://github.com/openai/codex/issues/31754)**  
   Existing conversations fail in 0.143.0 but work in 0.142.0. This is a classic “upgrade broke my sessions” CLI regression, important for anyone relying on `codex resume`.

10. **[#34306 — “This content can't be shown” false positive on cybersecurity requests](https://github.com/openai/codex/issues/34306)**  
    A safety-check false positive blocks legitimate technical work. 7 comments and 5 👍 suggest growing concern about over-conservative content filters in CLI/Pro workflows.

## Key PR Progress

1. **[#31817 — Update models.json](https://github.com/openai/codex/pull/31817)**  
   Automated model metadata refresh; keeps the CLI/extension model lists current with newly available models.

2. **[#31922 — core: add tool-free thread mode](https://github.com/openai/codex/pull/31922)**  
   Adds an opt-in `tool_free` feature for lightweight helper threads, preventing MCP startup and tool enumeration for non-tool work like title generation.

3. **[#31458 — exec-server: route remote network policy decisions](https://github.com/openai/codex/pull/31458)**  
   Code-reviewed PR improving proxy-policy routing for remote executors, with fail-closed behavior on disconnect or missing deciders.

4. **[#31591 — Enable parallel tool calls for Codex Apps](https://github.com/openai/codex/pull/31591)**  
   Adds a disabled-by-default `codex_apps_parallel_tool_calls` feature, letting the host-owned Codex Apps MCP server run tool calls in parallel while preserving third-party MCP behavior.

5. **[#31471 — Extract apps cache logic into ConnectorRuntimeManager](https://github.com/openai/codex/pull/31471)**  
   Refactors Codex Apps tool caching into a runtime manager scoped by account, user, workspace mode, and Codex home. A foundation PR for better connector lifecycle handling.

6. **[#31472 — codex-mcp: serialize connector runtime refreshes](https://github.com/openai/codex/pull/31472)**  
   Adds a shared refresh lock and a `hard_refresh_codex_apps_runtime` API, avoiding duplicate `tools/list` calls during concurrent MCP refreshes.

7. **[#36217 — Run code mode exclusively through the standalone host](https://github.com/openai/codex/pull/36217)**  
   Moves code-mode execution into a dedicated `codex-code-mode-runtime` crate and removes the embedded fallback. Cleaner runtime isolation for code-mode users.

8. **[#36207 — Record normalized sandbox violation events](https://github.com/openai/codex/pull/36207)**  
   Filesystem denials and managed-network blocks get a structured event shape, improving auditability and enforcement debugging.

9. **[#36194 — Avoid shifting bytes in streaming output buffers](https://github.com/openai/codex/pull/36194)**  
   Fixes avoidable O(n²) work when decoding framed streaming output. Relevant for high-throughput unified exec and relay streams.

10. **[#36188 — Make thread history projection resilient to malformed rollouts](https://github.com/openai/codex/pull/36188)**  
    Fixes history projection after a failed rollout append with a same-ordinal retry, preventing future conversation history from being lost.

## Feature Request Trends

- **Rate-limit transparency and fairness**  
  Users want richer CLI status tokens with reset times, balance, and plan type ([#24080](https://github.com/openai/codex/issues/24080)), while Pro users are upset by a disappearing 5-hour bucket ([#32707](https://github.com/openai/codex/issues/32707)) and Plus users are requesting increased or secondary rate limits ([#36213](https://github.com/openai/codex/issues/36213)).

- **Cross-device workspace continuity**  
  Remote Codex sessions work but aren’t yet a seamless multi-device experience; developers want the same repositories, sessions, and context to follow them across machines ([#34804](https://github.com/openai/codex/issues/34804)).

- **Better project/workspace organization**  
  Sidebar project sorting is reported broken ([#33077](https://github.com/openai/codex/issues/33077)), and symlinked project paths are treated as separate projects, causing thread visibility issues ([#31895](https://github.com/openai/codex/issues/31895)).

## Developer Pain Points

- **Windows remains the roughest platform.** Recurring themes include sandbox runner failures after upgrades ([#20570](https://github.com/openai/codex/issues/20570)), kernel-level BSODs linked to Sysmon ([#31035](https://github.com/openai/codex/issues/31035)), constant PowerShell polling ([#25453](https://github.com/openai/codex/issues/25453)), OneDrive-related disconnects ([#35420](https://github.com/openai/codex/issues/35420)), and app-server memory leaks that can break RDP/RPC/SSH ([#29317](https://github.com/openai/codex/issues/29317)).

- **Rate-limit and plan frustration is high.** Several reports combine technical confusion with emotional frustration: missing usage buckets, unfair Plus limits, and no way to see exact reset windows ([#32707](https://github.com/openai/codex/issues/32707), [#36213](https://github.com/openai/codex/issues/36213), [#24080](https://github.com/openai/codex/issues/24080)).

- **Session and state corruption bugs are hurting trust.** Examples include reasoning level silently resetting ([#26930](https://github.com/openai/codex/issues/26930)), text-log attachments blocking all subsequent turns ([#32177](https://github.com/openai/codex/issues/32177)), CLI resume failures after upgrade ([#31754](https://github.com/openai/codex/issues/31754)), and thread-fork storage amplification ([#35647](https://github.com/openai/codex/issues/35647)).

- **False-positive safety blocks are an emerging concern.** Legitimate security/cybersecurity-related development tasks are being blocked with opaque “content can’t be shown” errors, with no clear remediation path ([#34306](https://github.com/openai/codex/issues/34306)).

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-07-31

## Today's Highlights

No new releases landed in the past 24 hours; the maintainer queue remains focused on agent reliability and security hardening. A newly reported SSRF vulnerability in `web-fetch` (CVSS 8.6) already has a P1 fix PR open, while several long-running P1 hangs — generalist agent stalls, shell "Waiting input" deadlocks, and subagent MAX_TURNS misreporting — continue under retesting. The PR queue shows steady security hygiene work (Node EOL upgrades, MCP OAuth refresh) alongside core lifecycle fixes for auth loops and settings load ordering.

## Hot Issues

1. **[#22323 — Subagent MAX_TURNS recovery reported as GOAL success](https://github.com/google-gemini/gemini-cli/issues/22323)** · 12 comments · P1, bug
   `codebase_investigator` reports `status: "success"` / `Termination Reason: "GOAL"` even when it hit the turn limit before analyzing anything. Misleading termination telemetry hides real interruptions and erodes trust in agent reporting.

2. **[#21409 — Generalist agent hangs forever](https://github.com/google-gemini/gemini-cli/issues/21409)** · 8 comments · 8👍 · P1, bug
   Any deferral to the generalist agent hangs indefinitely — users report waiting up to an hour before cancelling even trivial tasks like folder creation. Instructing the model not to defer is the only current workaround. High community impact.

3. **[#25166 — Shell command stuck on "Waiting input" after completion](https://github.com/google-gemini/gemini-cli/issues/25166)** · 4 comments · 3👍 · P1, bug
   Simple CLI commands that finish successfully remain visually active and "awaiting user input," blocking progress. A recurring P1 core issue marked effort/medium.

4. **[#28555 — SSRF via DNS resolution bypass in web-fetch](https://github.com/google-gemini/gemini-cli/issues/28555)** · 2 comments · P2, security
   `isPrivateIp()` validates literal IPs synchronously, so hostnames resolving to internal ranges (e.g., `169.254.169.254`) bypass SSRF protection entirely. Reported at CVSS 8.6; a fix PR is already open.

5. **[#21968 — Gemini doesn't use skills and sub-agents enough](https://github.com/google-gemini/gemini-cli/issues/21968)** · 6 comments · P2, bug
   Even with well-described gradle/git skills available, the model won't invoke them unless explicitly told. Anecdotal but recurring behavioral gap that limits the value of custom skills.

6. **[#26522 — Auto Memory retries low-signal sessions indefinitely](https://github.com/google-gemini/gemini-cli/issues/26522)** · 5 comments · P2, bug
   Sessions the extraction agent deliberately skips as low-signal are never marked processed, so they resurface in every pass — a wasteful background-loop bug.

7. **[#26525 — Auto Memory needs deterministic redaction and less logging](https://github.com/google-gemini/gemini-cli/issues/26525)** · 4 comments · P2, security
   Transcript content is sent to the extraction model before any redaction occurs, and skill contents can be logged. Privacy-relevant gap in the memory pipeline.

8. **[#24353 — Robust component-level evaluations](https://github.com/google-gemini/gemini-cli/issues/24353)** · 7 comments · P1, epic
   Follow-up to the behavioral-evals initiative: 76 tests now run across 6 Gemini models, but component-level coverage needs to expand. A quality-infrastructure epic for preventing regressions like the hangs above.

9. **[#22745 — AST-aware file reads, search, and mapping](https://github.com/google-gemini/gemini-cli/issues/22745)** · 7 comments · P2, epic
   Explores AST-aware tooling to read method bounds in one call, reduce token noise, and improve codebase navigation — with linked investigation [#22746](https://github.com/google-gemini/gemini-cli/issues/22746).

10. **[#22093 — Subagents running without permission since v0.33.0](https://github.com/google-gemini/gemini-cli/issues/22093)** · 3 comments · P2, bug
    Users with agents disabled in all configs saw generalist subagents become active after auto-update; only MCP functionality was expected. A permission regression that breaks user trust.

## Key PR Progress

1. **[#28557 — Fix SSRF via async DNS resolution in web-fetch](https://github.com/google-gemini/gemini-cli/pull/28557)** · P1, security, size/s
   Resolves #28555 by replacing the synchronous `isPrivateIp()` with `isPrivateIpAsync`, blocking hostnames that resolve to internal ranges.

2. **[#28519 — Prevent infinite auth loop by awaiting credential save](https://github.com/google-gemini/gemini-cli/pull/28519)** · P1, core, size/s
   Fixes #28430: `oauth_creds.json` writes are now awaited, preventing a loop where the CLI re-auths repeatedly.

3. **[#28566 — Propagate InvalidStreamError details to the UI](https://github.com/google-gemini/gemini-cli/pull/28566)** · P1, core/agent
   Surfaces error `type`/`message` from core to CLI hooks, enabling actionable suggestions such as using `/compress` when context is exhausted.

4. **[#28581 — Skip diff hunk markers during @-file processing](https://github.com/google-gemini/gemini-cli/pull/28581)** · P2, core/agent
   Prevents `@@` hunk markers from triggering two recursive workspace-wide glob searches per hunk — fixing `minimatch`/`path-scurry` heap growth on large diff prompts.

5. **[#28603 — Upgrade sandbox Dockerfile to Node 22](https://github.com/google-gemini/gemini-cli/pull/28603)** · P1, security, size/xs
   Resolves #28584: Node 20 reached EOL on 2026-04-30, and the sandbox executes model-directed commands on a now-unsupported runtime.

6. **[#28602 — Update Docker base image to node:24-slim](https://github.com/google-gemini/gemini-cli/pull/28602)** · size/s
   Refreshes builder/runtime images and fixes the runtime stage to copy generated CLI packages from the builder.

7. **[#28481 — Refresh MCP OAuth tokens with stored client ID](https://github.com/google-gemini/gemini-cli/pull/28481)** · P1, security, size/m
   Fixes token refresh for OAuth-discovered MCP servers; the previous failure path deleted stored credentials, forcing re-auth on every run.

8. **[#28551 — Fall back to embedded macOS seatbelt profiles](https://github.com/google-gemini/gemini-cli/pull/28551)** · size/l
   Fixes a critical startup crash when running sandbox mode (`-s`) on macOS/gMac where static `.sb` profiles are missing from runfiles or the bundle.

9. **[#28596 — Add `--list-all-sessions` option](https://github.com/google-gemini/gemini-cli/pull/28596)** · P3, core, size/l
   Lists chat sessions across all registered workspaces, grouped by workspace path — a quality-of-life win for users who lose track of sessions across directories.

10. **[#28599 — Classify capacity exhaustion as terminal](https://github.com/google-gemini/gemini-cli/pull/28599)** · size/s, closed
    Prevents client-side hangs on `MODEL_CAPACITY_EXHAUSTED` (HTTP 429) for preview models by triggering the fallback chain immediately. Closed for now — worth watching for a resubmit.

**Also notable:** [#28597](https://github.com/google-gemini/gemini-cli/pull/28597) fixes a load-order race where `.env` was parsed after settings placeholder expansion; [#28505](https://github.com/google-gemini/gemini-cli/pull/28505) fixes six broken docs cross-reference links; [#28594](https://github.com/google-gemini/gemini-cli/pull/28594) is a closed security PoC demonstrating a `workflow_run` supply-chain vulnerability in `trigger_e2e.yml`.

## Feature Request Trends

- **Subagent observability and control**: expose subagent trajectories via `/chat share` ([#22598](https://github.com/google-gemini/gemini-cli/issues/22598)), include subagent context in `/bug` reports ([#21763](https://github.com/google-gemini/gemini-cli/issues/21763)), and improve the agent's self-awareness of its own CLI flags/hotkeys ([#21432](https://github.com/google-gemini/gemini-cli/issues/21432)).
- **Browser agent resilience**: automatic session takeover and lock recovery for persistent profiles ([#22232](https://github.com/google-gemini/gemini-cli/issues/22232)) and honoring `settings.json` overrides such as `maxTurns` ([#22267](https://github.com/google-gemini/gemini-cli/issues/22267)).
- **AST-aware codebase tooling**: paired epics ([#22745](https://github.com/google-gemini/gemini-cli/issues/22745), [#22746](https://github.com/google-gemini/gemini-cli/issues/22746)) investigating AST-aware reads, search, and mapping using tools like tilth/glyph.
- **Auto Memory quality and privacy**: a cluster of issues ([#26516](https://github.com/google-gemini/gemini-cli/issues/26516), [#26522](https://github.com/google-gemini/gemini-cli/issues/26522), [#26523](https://github.com/google-gemini/gemini-cli/issues/26523), [#26525](https://github.com/google-gemini/gemini-cli/issues/26525)) covering retry loops, invalid patch quarantine, deterministic redaction, and reduced logging.
- **Safety guardrails**: discourage destructive git/DB operations ([#22672](https://github.com/google-gemini/gemini-cli/issues/22672)) and smarter tool scoping when >128 tools cause 400 errors ([#24246](https://github.com/google-gemini/gemini-cli/issues/24246)).

## Developer Pain Points

- **Hangs and stalls dominate**: generalist agent deferral hangs ([#21409](https://github.com/google-gemini/gemini-cli/issues/21409)), shell commands stuck at "Waiting input" after completion ([#25166](https://github.com/google-gemini/gemini-cli/issues/25166)), getting stuck at interactive prompts (Vite scaffold, [#22465](https://github.com/google-gemini/gemini-cli/issues/22465)), and get-shit-done output hook crashes ([#22186](https://github.com/google-gemini/gemini-cli/issues/22186)).
- **Misleading success states**: MAX_TURNS interruptions reported as GOAL success hide real failures ([#22323](https://github.com/google-gemini/gemini-cli/issues/22323)).
- **Permission surprises**: subagents activating despite disabled settings after v0.33.0 ([#22093](https://github.com/google-gemini/gemini-cli/issues/22093)).
- **Tools/skills underutilized**: the model ignores installed skills and subagents unless explicitly instructed ([#21968](https://github.com/google-gemini/gemini-cli/issues/21968)).
- **Workspace clutter**: restricting shell execution causes the model to scatter temporary edit scripts across directories, complicating clean commits ([#23571](https://github.com/google-gemini/gemini-cli/issues/23571)).
- **Browser/platform instability**: Wayland failures ([#21983](https://github.com/google-gemini/gemini-cli/issues/21983)) and ignored settings overrides ([#22267](https://github.com/google-gemini/gemini-cli/issues/22267)) hamper browser-agent workflows.
- **Terminal fidelity**: resize flicker ([#21924](https://github.com/google-gemini/gemini-cli/issues/21924)) and screen corruption after exiting external editors in `terminalBuffer` mode ([#24935](https://github.com/google-gemini/gemini-cli/issues/24935)) remain open.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-07-31

## Today’s Highlights

GitHub Copilot CLI shipped **v1.0.77**, making browser-based OAuth the default login flow on local interactive terminals, adding **Ctrl+G** editing of `ask_user` freeform answers, and enabling unconditional autopilot approval to disable sandboxing for the session when bypass is allowed. The community is also surfacing several pain points around session stability — wedged sessions, sub-agent silent failures, typing latency, and AI-credit visibility — many of which lack a clear workaround yet.

## Releases

- **[v1.0.77](https://github.com/github/copilot-cli/releases/tag/v1.0.77)** (2026-07-30)
  - Unconditional autopilot approval now disables sandbox for the current session when bypass is allowed.
  - `Ctrl+G` opens your editor to edit `ask_user` freeform answers without closing the prompt.
  - Browser-based web OAuth login flow is now the default for `copilot login` on local interactive terminals.
  - Device-code flow remains the default on remote/headless terminals; use `--web-flow` / `--device-code` or the interactive `/login` command to choose.

- **[v1.0.77-0](https://github.com/github/copilot-cli/releases/tag/v1.0.77-0)** (2026-07-30)
  - Adds the same web OAuth flow as the default for local interactive terminals.
  - Includes support for forcing a login mode via `--web-flow` / `--device-code` and the interactive `/login` command.

## Hot Issues

1. **[#3767 — Oversized attachment permanently wedges session](https://github.com/github/copilot-cli/issues/3767)**  
   A 9.1 MB request exceeds the 5 MB CAPI Responses native limit, and the session is left unrecoverable. This is a severe reliability issue for rich-context workflows; 13 comments show significant community attention.

2. **[#1381 — “Rewind is not available because you’re not in a git repository”](https://github.com/github/copilot-cli/issues/1381)**  
   Users of non-git VCS tools like Jujutsu/jj cannot use Rewind even though the VS Code Copilot supports it. 10 👍 make this one of the most popular open feature gaps.

3. **[#4295 — AI Credits Near-Limit Warning](https://github.com/github/copilot-cli/issues/4295)**  
   Feature-parity request: Visual Studio 2026 shows near-limit AI-credit warnings in chat; developers want the same visibility in Copilot CLI. The 8-comment thread indicates real concern about surprise credit consumption.

4. **[#4293 — Sub-agents with full tool access return empty with no error](https://github.com/github/copilot-cli/issues/4293)**  
   The `task` tool returns absolutely nothing when the target agent type has the full tool set, while restricted-tool agent types work. Silent failure makes agent workflows very hard to debug.

5. **[#4305 — “Failed to convert JavaScript value ‘Undefined’ into rust type ‘String’”](https://github.com/github/copilot-cli/issues/4305)**  
   Users on v1.0.76 hit this almost immediately on commands like `/model auto`. It was closed quickly, but the crash-on-normal-input pattern is concerning.

6. **[#4113 — ACP mode does not implement session/close](https://github.com/github/copilot-cli/issues/4113)**  
   ACP clients cannot release sessions because the `session/close` capability is missing. 3 👍 despite no comments — this is a protocol-level gap for ACP integrations.

7. **[#4299 — Increasing typing latency over long sessions](https://github.com/github/copilot-cli/issues/4299)**  
   Long sessions with background agents become nearly unusable due to typing latency. Important for developers who run long-lived autonomous workflows.

8. **[#4301 — MCP tool arguments with array-or-string union schema are stringified](https://github.com/github/copilot-cli/issues/4301)**  
   MCP tools declaring `anyOf: [array, string]` receive stringified arguments before reaching the server. This breaks MCP servers with flexible input schemas.

9. **[#4310 — Bad default: engine falls back to 128K token budget](https://github.com/github/copilot-cli/issues/4310)**  
   Routed models without capability limits silently get a hardcoded 128K-token context budget, which can trigger premature compaction even on 1M-token models. This needs better model-capability detection.

10. **[#4306 — Subtasks freeze and stop responding](https://github.com/github/copilot-cli/issues/4306)**  
   In autopilot `/fleet` loops, subtasks freeze mid-session with no clear recovery. Highly disruptive for users orchestrating multi-agent skills.

## Key PR Progress

No pull requests were updated in the last 24 hours according to the data source. Nothing to report for this digest.

## Feature Request Trends

- **AI-credit visibility and limits**: Users want near-limit warnings and investigation into sessions that appear to consume credits after visible tasks finish ([#4295](https://github.com/github/copilot-cli/issues/4295), [#4308](https://github.com/github/copilot-cli/issues/4308), [#4309](https://github.com/github/copilot-cli/issues/4309)).
- **Alternative/enterprise auth**: Support for bearer-token BYO-K auth is requested for compliance-restricted environments ([#4300](https://github.com/github/copilot-cli/issues/4300)); web OAuth is a welcome step but not an enterprise panacea.
- **Sandbox/tool configurability**: Requests for configuring sandbox tool allowlists and bypass behavior continue ([#4298](https://github.com/github/copilot-cli/issues/4298)); the v1.0.77 autopilot sandbox-bypass change addresses part of this.
- **VCS-agnostic features**: Rewind should not depend on git ([#1381](https://github.com/github/copilot-cli/issues/1381)).
- **Terminal/interactive UX parity**: The community is asking for fixes to sidebar keyboard navigation, iTerm2 paste, `COLORTERM` injection on resumed sessions, and transcript rendering ([#4304](https://github.com/github/copilot-cli/issues/4304), [#4296](https://github.com/github/copilot-cli/issues/4296), [#4294](https://github.com/github/copilot-cli/issues/4294), [#4311](https://github.com/github/copilot-cli/issues/4311)).

## Developer Pain Points

- **Sessions degrade over time**: Wedged sessions from oversized attachments ([#3767](https://github.com/github/copilot-cli/issues/3767)), blank transcript rendering ([#4311](https://github.com/github/copilot-cli/issues/4311)), freezing subtasks ([#4306](https://github.com/github/copilot-cli/issues/4306)), and rising latency ([#4299](https://github.com/github/copilot-cli/issues/4299)) make long-running work fragile.
- **Silent failures with no diagnostics**: Sub-agents returning empty output ([#4293](https://github.com/github/copilot-cli/issues/4293)) and subtasks freezing without errors are especially hard to investigate.
- **Configuration/regression fragility**: Log-level values other than `"all"`/`"default"` crash on launch ([#4297](https://github.com/github/copilot-cli/issues/4297)); MCP unions are corrupted before reaching servers ([#4301](https://github.com/github/copilot-cli/issues/4301)); resumed sessions unexpectedly inject `COLORTERM=truecolor` ([#4294](https://github.com/github/copilot-cli/issues/4294)).
- **Missing parity with IDE/Claude Code**: Developers repeatedly compare Copilot CLI unfavorably with the IDE experience for credit warnings, paste handling, keyboard navigation, and git-independent rewind ([#4295](https://github.com/github/copilot-cli/issues/4295), [#4296](https://github.com/github/copilot-cli/issues/4296), [#4304](https://github.com/github/copilot-cli/issues/4304), [#1381](https://github.com/github/copilot-cli/issues/1381)).

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI Community Digest — 2026-07-31

## Today's Highlights
No new releases landed in the last 24 hours, but the community is actively discussing a long-running memory-system feature request and two fresh stability/availability bugs. The only PR in the window addresses a subtle `asyncio` task-lifetime bug in the hooks system, which could resolve hard-to-diagnose callback failures.

## Releases
_No new releases in the last 24 hours._

## Hot Issues

1. [#1283 [enhancement] Memory System — Persistent context across sessions](https://github.com/MoonshotAI/kimi-cli/issues/1283)  
   Open since February, updated July 30. Requests both automatic memory (AI-managed notes) and manual memory (user-defined instructions) to persist project patterns and preferences across sessions. This is the most substantive feature request in the current queue, with 7 comments and no reactions yet.

2. [#2571 [bug] LLM Overloaded! Can't use Kimi at all](https://github.com/MoonshotAI/kimi-cli/issues/2571)  
   Reported on version 1.49.0 with Moderato and Kimi K3 on macOS. The CLI receives HTTP 429 errors from the LLM provider, making the tool completely unusable. Only 1 comment so far, but this highlights serious reliability concerns for paid users.

3. [#2570 [bug] CLI intermittently freezes with spinning moon; correlated with browser tab state](https://github.com/MoonshotAI/kimi-cli/issues/2570)  
   Occurs on Windows 11 with version 0.29.2 and KIMI K3 HIGH. The CLI becomes unresponsive and shows a “spinning moon” indicator, with behavior apparently linked to browser tab state. No comments yet; likely deserves investigation around login/session handling.

## Key PR Progress
Only one PR was updated in the last 24 hours:

- [#2565 fix(hooks): keep a strong reference to fire-and-forget hook triggers](https://github.com/MoonshotAI/kimi-cli/pull/2565)  
  By LHMQ878, fixes [#2564](https://github.com/MoonshotAI/kimi-cli/issues/2564). `asyncio` holds running tasks in a `WeakSet`, so a fire-and-forget hook task can be garbage-collected before completion. This PR keeps a strong reference and is important for hook reliability. No comments yet.

## Feature Request Trends
- **Persistent memory / cross-session context** is the clearest request: users want the CLI to remember project patterns, user preferences, and manually defined instructions across sessions.
- **Graceful handling of provider overloads** is emerging from bug reports: a 429 error should not completely block CLI usage.
- **CLI stability around login/browser state** is a recurring concern, especially when the tool becomes unresponsive and requires manual recovery.

## Developer Pain Points
- **Provider 429/overload errors** can completely interrupt developer workflows, with no fallback or queuing behavior.
- **Intermittent freezes** with a “spinning moon” are hard to reproduce and appear correlated with browser tab state, making debugging difficult.
- **Async hook task lifetime issues** can cause callbacks or exceptions to be silently lost, as addressed by the open PR #2565.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-07-31

## Today’s Highlights
OpenCode shipped **v1.18.10** with automatic Modal model discovery and a round of desktop UX polish. The PR queue is heavy on model-layer correctness: input limit handling, Gemini thinking levels, xAI native option mapping, and containing Codex behavior inside the OpenAI plugin. Community attention is split between long-running feature requests like configurable `/compact` and a nagging TUI loop error that continues to frustrate users.

## Releases
### [v1.18.10](https://github.com/anomalyco/opencode/releases)
- **Core:** Discover available Modal models automatically. (@devennavani)
- **Desktop:**
  - Prevent adding the same attachment more than once.
  - Always show the new session button.
  - Improved toast notifications: better stacking, dismissal, and mobile layout.
  - Refined tab hover and active states.

## Hot Issues
Selected from 50 updated issues; the following had the most community engagement or signal the highest-impact problems.

- [**#38801** — `message="exiting loop"`](https://github.com/anomalyco/opencode/issues/38801) — 17 comments. A long-running TUI frustration; user reports only workable with `step=80` until the loop error appears. High visibility despite zero upvotes.
- [**#5200** — `/compact` should be configurable to use OpenAI Responses API 'compaction'](https://github.com/anomalyco/opencode/issues/5200) — 28 👍, 11 comments. Popular request: use OpenAI’s native compaction endpoint instead of local summarization.
- [**#39771** — Fast failure on network errors and concise error output](https://github.com/anomalyco/opencode/issues/39771) — 3 comments. Network operations hang for 60–120s with no fallback, especially problematic where GitHub HTTPS is blocked.
- [**#30123** — MCP server processes not cleaned up on exit + eagerly starts all servers](https://github.com/anomalyco/opencode/issues/30123) — 2 comments. Reports of 30 orphan `node.exe` processes; stdio MCP servers all start at launch even when unused.
- [**#28507** — Dead loop: infinite empty assistant messages after tool call](https://github.com/anomalyco/opencode/issues/28507) — 3 comments. Agent loop enters infinite `tokens: 0` messages; only manual compaction recovers.
- [**#30054** — Historical chat sessions disappear after `opencode web` upgrade](https://github.com/anomalyco/opencode/issues/30054) — 5 👍, 2 comments. Upgrade regression from v1.15.11 → v1.15.13 losing all chat history in web UI.
- [**#28011** — `edit` tool frequently gets `[Tool execution was interrupted]`](https://github.com/anomalyco/opencode/issues/28011) — 6 comments. Regression after v1.15.x where consecutive edits to the same file fail.
- [**#29963** — Linux PRIMARY selection (middle-click paste) support](https://github.com/anomalyco/opencode/issues/29963) — 4 👍, 4 comments. TUI only targets `CLIPBOARD`, breaking expected Linux middle-click behavior.
- [**#30071** — Modalities config support for OpenAI-compatible providers](https://github.com/anomalyco/opencode/issues/30071) — 4 comments. Vision/image input is broken by default with LM Studio, LocalAI, AnyScale, etc.
- [**#30087** — OTel spans lost because `AppRuntime` is not disposed before `process.exit()`](https://github.com/anomalyco/opencode/issues/30087) — 3 comments. `opencode run` never flushes OTel spans due to premature process exit.

## Key PR Progress
- [**#39797** — fix(core): respect model input limits](https://github.com/anomalyco/opencode/pull/39797) — Adds `input` limits to model resolution and compacts against the tighter of input limit vs. context-minus-output budget.
- [**#39796** — feat(ai): support Gemini thinking levels](https://github.com/anomalyco/opencode/pull/39796) — Maps Google AI SDK `thinkingConfig` into native Gemini options, including `thinkingBudget` and `thinkingLevel`.
- [**#39795** — fix(opencode): spawn configured posix shell directly on Windows](https://github.com/anomalyco/opencode/pull/39795) — Fixes bash tool when `"shell": "C:/msys64/usr/bin/bash.exe"` is configured on Windows.
- [**#39734** — refactor(core): contain Codex in OpenAI plugin](https://github.com/anomalyco/opencode/pull/39734) — Moves ChatGPT/Codex routing fully into the OpenAI plugin and removes Codex-specific behavior from the generic model resolver.
- [**#39764** — feat(plugin): add session request hook](https://github.com/anomalyco/opencode/pull/39764) — Exposes `session.request` to plugins, allowing mutation of final LLM URLs, headers, and serialized request bodies.
- [**#39776** — feat(tui): hot-reload local TUI plugins](https://github.com/anomalyco/opencode/pull/39776) — Editing a local TUI plugin now takes effect live; broken plugins are contained instead of crashing the app.
- [**#39791** — fix(session): stop retrying fixed-window usage quotas](https://github.com/anomalyco/opencode/pull/39791) — Prevents futile retries on 429 responses for 5-hour/weekly/monthly quotas. Closes #39790.
- [**#39788** — fix(github): honor GHES REST and GraphQL endpoints](https://github.com/anomalyco/opencode/pull/39788) — GitHub Action clients now respect GHES endpoint variables instead of ignoring them.
- [**#39786** — fix(app): register new workspace and open project shortcuts in the new layout](https://github.com/anomalyco/opencode/pull/39786) — Restores `cmd+o`/project open and new-worktree shortcuts missing from the new UI layout.
- [**#39792** — docs: document V1 plugin export format and auto-load constraints](https://github.com/anomalyco/opencode/pull/39792) — Clarifies that file-based plugins must use `export default { id, server }`, not the legacy async function export.

## Feature Request Trends
- **Configurable compaction** — Users want `/compact` to delegate to provider-native compaction APIs (e.g., OpenAI Responses API “compaction”) rather than local summarization. ([#5200](https://github.com/anomalyco/opencode/issues/5200))
- **Provider capability/modality configuration** — Several requests ask for explicit vision/video input and model-modality options for OpenAI-compatible providers. ([#30071](https://github.com/anomalyco/opencode/issues/30071), [#21273](https://github.com/anomalyco/opencode/issues/21273))
- **Linux desktop/TUI ergonomics** — Support for PRIMARY selection and middle-click paste. ([#29963](https://github.com/anomalyco/opencode/issues/29963))
- **Better resilience/error handling** — Fast failure on network errors, continuing subagents after HTTP failures, and not retrying fixed-window quotas. ([#39771](https://github.com/anomalyco/opencode/issues/39771), [#30154](https://github.com/anomalyco/opencode/issues/30154), [#39791](https://github.com/anomalyco/opencode/pull/39791))
- **Deeper provider/resource management** — More detailed model provider management in the desktop app and LAN-based local provider discovery. ([#29885](https://github.com/anomalyco/opencode/issues/29885), [#27554](https://github.com/anomalyco/opencode/pull/27554))

## Developer Pain Points
- **Orphaned child processes** — MCP server processes are not cleaned up on exit/restart, accumulating dozens of stale processes. ([#30123](https://github.com/anomalyco/opencode/issues/30123), [#30073](https://github.com/anomalyco/opencode/issues/30073))
- **Session degradation** — Long conversations become extremely laggy or enter infinite empty-message loops; compaction is often the only escape. ([#30101](https://github.com/anomalyco/opencode/issues/30101), [#28507](https://github.com/anomalyco/opencode/issues/28507))
- **Telemetry gaps** — OTLP traces are silently dropped in `opencode run` because the runtime isn’t disposed before exit. ([#30087](https://github.com/anomalyco/opencode/issues/30087), [#13438](https://github.com/anomalyco/opencode/issues/13438))
- **Tool-call reliability** — The `edit` tool is interrupted on consecutive calls after v1.15.x, and local Ollama subagents sometimes return tool calls as text instead of executing them. ([#28011](https://github.com/anomalyco/opencode/issues/28011), [#21181](https://github.com/anomalyco/opencode/issues/21181))
- **Provider integration friction** — Cryptic `ProviderInitError` failures with corporate npm registries, invalid API parameters with GLM/ZAI, and ECONNRESETs with z.ai. ([#30069](https://github.com/anomalyco/opencode/issues/30069), [#29334](https://github.com/anomalyco/opencode/issues/29334), [#15350](https://github.com/anomalyco/opencode/issues/15350))

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-07-31

## Today's Highlights

The nightly release stream continues with v0.21.1, mostly CI hardening plus a web-shell fix. On the issue tracker, the loudest signals today are a cluster of Anthropic converter correctness bugs, several Windows/desktop stability reports, and ongoing concerns about workspace/worktree state isolation. In PRs, the project is moving forward on VP-mode crash visibility, daemon adapter state isolation, Goal v3 in the TUI, and richer telemetry.

## Releases

**v0.21.1-nightly.20260731.702932cc7** ([release](https://github.com/QwenLM/qwen-code/releases/tag/v0.21.1-nightly.20260731.702932cc7))

- `fix(ci)`: add default bash shell to container jobs in qwen-triage ([#7838](https://github.com/QwenLM/qwen-code/pull/7838))
- `fix(web-shell)`: listed as `fix(web-shell): pre` — the release-note title is truncated in the export, but this is a web-shell fix.

## Hot Issues

- [#8124 Startup banner sometimes missing top lines on first paint](https://github.com/QwenLM/qwen-code/issues/8124) — Intermittent TUI first-paint rendering bug, with 9 comments. The title correlation with pending provider updates suggests deeper startup-ordering problems.
- [#7966 如何获取会话中创建了哪些文件？](https://github.com/QwenLM/qwen-code/issues/7966) — Users want to attribute created files back to sessions, including files generated indirectly by code execution. Key workflow gap for auditability.
- [#8083 design(core): make derived Config context ownership explicit](https://github.com/QwenLM/qwen-code/issues/8083) — Architecture proposal to remove ad hoc `Object.create(base)` overrides for subagents, scoped memory, and approval-mode configs.
- [#8092 Build a lower-maintenance desktop app around Web Shell](https://github.com/QwenLM/qwen-code/issues/8092) — Feature request to reuse Web Shell as the desktop UI surface instead of maintaining a separate product implementation.
- [#8136 Provider warning sanitizer truncates messages containing a port, and leaks a password containing `@`](https://github.com/QwenLM/qwen-code/issues/8136) — Security bug in `sanitizeProviderWarning`; malformed URLs can cause credential leakage into `/status` payloads.
- [#8162 Anthropic converter: stale thinking signatures not pruned on historical turns after a sibling tool_use is removed](https://github.com/QwenLM/qwen-code/issues/8162) — Part of a cluster of Anthropic converter/history-trimming bugs reported by the same author.
- [#8138 worktree settings.json writes to project root .qwen instead of worktree's .qwen](https://github.com/QwenLM/qwen-code/issues/8138) — Git worktree users get settings written to the wrong `.qwen` directory, breaking per-worktree configuration.
- [#8146 Desktop app not work with LMStudio](https://github.com/QwenLM/qwen-code/issues/8146) — Windows desktop client appears to send nothing to the LM Studio API despite showing activity. Popular local-model integration pain point.
- [#8102 proposal(core): deterministic tool-execution boundaries for a trustworthy agent runtime](https://github.com/QwenLM/qwen-code/issues/8102) — Proposal to keep the model outside the trust boundary and deterministically constrain, authorize, observe, and evaluate model actions.
- [#7972 0.21.1使用 奔溃3次](https://github.com/QwenLM/qwen-code/issues/7972) — Windows crash reports on 0.21.1; linked to VP-mode stability work and currently waiting on more information.

## Key PR Progress

- [#8178 feat(channels): isolate daemon adapter state by workspace](https://github.com/QwenLM/qwen-code/pull/8178) — Gives each daemon-managed channel a stable, workspace-owned state directory with sanitized prefixes and hash suffixes.
- [#8088 fix(cli): prevent silent VP-mode crash by adding uncaughtException handler and error visibility](https://github.com/QwenLM/qwen-code/pull/8088) — Does not claim to fix all crashes, but makes future VP-mode crashes visible instead of silent.
- [#8059 feat(hooks): add SessionDelete event](https://github.com/QwenLM/qwen-code/pull/8059) — Emits `deleted_session_id` on explicit session deletion from interactive `/delete` and ACP `deleteSession`.
- [#8050 fix: make the test suite portable on Windows](https://github.com/QwenLM/qwen-code/pull/8050) — Aligns runtime paths and assertions for Windows while preserving POSIX-only semantics.
- [#8137 fix(cli): scope warning credential stripping to the URL authority](https://github.com/QwenLM/qwen-code/pull/8137) — Fixes the sanitizer bug in #8136 by parsing URLs properly instead of using `indexOf` heuristics.
- [#8180 feat(telemetry): Track tool execution outcomes](https://github.com/QwenLM/qwen-code/pull/8180) — Adds `executionStatus` to distinguish whether `invocation.execute()` was entered and succeeded vs. the final terminal status.
- [#8005 feat(cli): adopt Goal v3 in interactive TUI](https://github.com/QwenLM/qwen-code/pull/8005) — Adds canonical `/goal` lifecycle commands, persistent lifecycle cards, Goal-aware resume/branch recovery, and a two-lane input queue.
- [#8121 feat(core): add current PR Autofix watcher](https://github.com/QwenLM/qwen-code/pull/8121) — Opt-in `/autofix` watcher for the current branch's open PR, with `propose-only`, `auto-commit`, and `auto-push` modes.
- [#8057 feat(skills): add disabled skill levels](https://github.com/QwenLM/qwen-code/pull/8057) — Lets users disable `project`, `user`, `extension`, or `bundled` skill levels before filesystem access.
- [#7799 feat(cli): Add agent view supervisor runtime](https://github.com/QwenLM/qwen-code/pull/7799) — Stack base for Agent View: local supervisor socket, JSON-line control protocol, session metadata store, and startup/shutdown handling.

## Feature Request Trends

- **Lower-maintenance desktop packaging** — Reuse Web Shell as the desktop UI instead of maintaining a separate desktop client ([#8092](https://github.com/QwenLM/qwen-code/issues/8092)).
- **Trustworthy agent runtime** — Deterministic tool-execution boundaries and better attribution of created files to sessions ([#8102](https://github.com/QwenLM/qwen-code/issues/8102), [#7966](https://github.com/QwenLM/qwen-code/issues/7966)).
- **More lifecycle automation** — Auto-fix CI workflows, SessionDelete hooks, and PR Autofix watchers ([#4362](https://github.com/QwenLM/qwen-code/issues/4362), [#8059](https://github.com/QwenLM/qwen-code/pull/8059), [#8121](https://github.com/QwenLM/qwen-code/pull/8121)).
- **Observability and monitoring** — Subagent status endpoints, tool execution outcomes, and GenAI latency tracing ([#8128](https://github.com/QwenLM/qwen-code/issues/8128), [#8180](https://github.com/QwenLM/qwen-code/pull/8180), [#8150](https://github.com/QwenLM/qwen-code/pull/8150)).
- **Configurability and isolation** — Memory agent max turns, disabled skill levels, and per-worktree settings ([#8168](https://github.com/QwenLM/qwen-code/issues/8168), [#8057](https://github.com/QwenLM/qwen-code/pull/8057), [#8138](https://github.com/QwenLM/qwen-code/issues/8138)).

## Developer Pain Points

- **Windows stability and integration** — Repeated issues with crashes on 0.21.1, LM Studio connectivity, standalone installer failures, and first-paint bugs ([#7972](https://github.com/QwenLM/qwen-code/issues/7972), [#8146](https://github.com/QwenLM/qwen-code/issues/8146), [#7118](https://github.com/QwenLM/qwen-code/issues/7118), [#8124](https://github.com/QwenLM/qwen-code/issues/8124)).
- **Anthropic converter correctness** — Multiple reports around orphaned `tool_use`/`thinking` blocks, unsanitized IDs, and `tool_result` ordering after history trimming ([#8162](https://github.com/QwenLM/qwen-code/issues/8162), [#8161](https://github.com/QwenLM/qwen-code/issues/8161), [#8160](https://github.com/QwenLM/qwen-code/issues/8160), [#8159](https://github.com/QwenLM/qwen-code/issues/8159)).
- **Flaky E2E CI** — A steady stream of auto-filed CI failures in SDK TypeScript permission-control and system-control tests, plus cron/sessionUpdate tests ([#8133](https://github.com/QwenLM/qwen-code/issues/8133), [#8173](https://github.com/QwenLM/qwen-code/issues/8173), [#8153](https://github.com/QwenLM/qwen-code/issues/8153), [#8076](https://github.com/QwenLM/qwen-code/issues/8076)).
- **Workspace/worktree state isolation** — Users and maintainers are hitting issues where settings, daemon adapter state, or managed memory leak across worktrees/workspaces ([#8138](https://github.com/QwenLM/qwen-code/issues/8138), [#8178](https://github.com/QwenLM/qwen-code/pull/8178), [#8056](https://github.com/QwenLM/qwen-code/pull/8056)).

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar).*