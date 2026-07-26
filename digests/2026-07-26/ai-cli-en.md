# AI CLI Tools Community Digest 2026-07-26

> Generated: 2026-07-26 03:23 UTC | Tools covered: 7

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

# Cross-Tool Comparison Report: AI CLI Developer Tools Ecosystem
**Date:** 2026-07-26

---

## 1. Ecosystem Overview

The AI CLI tool landscape is maturing rapidly, with seven major projects—Claude Code, OpenAI Codex, Gemini CLI, GitHub Copilot CLI, Kimi Code CLI, OpenCode, and Qwen Code—vying for developer mindshare. The dominant themes across all tools are **agent reliability** (sub-agent false success, hangs, state loss), **cross-tool configuration standardization** (the emerging `AGENTS.md` spec), and **platform stability**, particularly on Windows. Most projects are releasing frequently (nightly or alpha cycles), but community frustrations center on regressions in core workflows, opaque billing and data safety processes, and limited session persistence. The ecosystem is shifting from single-agent assistants toward multi-agent orchestration, with MCP (Model Context Protocol) becoming a critical integration layer.

---

## 2. Activity Comparison

| Tool | Hot Issues (selected) | Key PRs (today) | Release Status (last 24h) |
|------|-----------------------|-----------------|---------------------------|
| **Claude Code** | 10 (1 with 4,452 👍) | 5 (3 closed) | No release |
| **OpenAI Codex** | 10 (top: 76 👍) | 10 (all closed) | ✅ `rust-v0.146.0-alpha.10.1` |
| **Gemini CLI** | 10 (top: 8 👍) | 7 (3 closed, 4 open) | ✅ `v0.54.0-nightly.20260726` |
| **GitHub Copilot CLI** | 10 (top: 10 👍) | 2 (spam/withdrawn) | No release |
| **Kimi Code CLI** | 2 (top: 16 👍) | 4 (3 merged, 1 open) | No release |
| **OpenCode** | 10 (all closed) | 10 (all open) | No release |
| **Qwen Code** | 10 (top: 30 comments) | 10 (1 merged, 9 open) | ✅ `v0.21.0-nightly.20260726` |

**Observations:**  
- Claude Code dominates by single-issue engagement (#6235 at 4,452 👍), but Copilot CLI and OpenCode also see significant activity.  
- OpenAI Codex, Gemini CLI, and Qwen Code released new versions today; the others did not.  
- PR velocity is highest in OpenAI Codex, Gemini CLI, and Qwen Code; Copilot CLI had no substantive code changes.

---

## 3. Shared Feature Directions

Several requirements appear across multiple tool communities, indicating ecosystem-level priorities:

| Shared Requirement | Affected Tools | Specific Needs |
|-------------------|----------------|----------------|
| **Cross-tool config standardization** | Claude Code, Kimi Code, OpenCode | `AGENTS.md` support alongside tool-specific files (e.g., `CLAUDE.md`). Community wants config portability when switching tools. |
| **Session persistence & resume** | Claude Code, Copilot CLI, Kimi Code, Qwen Code | Task IDs breaking on resume, orphaned worktrees, stale system prompts, memory OOM on large session load. |
| **Sub-agent reliability** | Claude Code, Gemini CLI, OpenCode | False success reporting (`GOAL` after `MAX_TURNS`), orphaned background tasks, agents running without permission. |
| **MCP ecosystem maturity** | OpenAI Codex, Gemini CLI, Qwen Code | Recursion limits, OAuth token refresh, connectivity differences between tools, server memory consumption. |
| **Windows stability** | OpenAI Codex, Claude Code, Qwen Code | Process leaks (`taskkill.exe`, `powershell.exe` polling), GPU crashes, desktop freeze after migration, EFS encryption issues. |
| **Security & privacy** | OpenCode, Gemini CLI, Qwen Code | Desktop IPC validation, random model token exposure, OAuth credential deletion, pinned memory file protection. |
| **Plugin/marketplace reliability** | Copilot CLI, OpenCode | Schema validation errors, registration not persisted, skill truncation at 32 items. |
| **Token/cost visibility** | Qwen Code, Gemini CLI | Missing `/stats` for TPS/TTFT/consumed tokens, usage percentage display. |

---

## 4. Differentiation Analysis

- **Claude Code** positions itself as the **community-driven standard-bearer** for agent configuration—the massive support for `AGENTS.md` (#6235) reflects its role in driving cross-tool norms. However, it suffers from high-severity billing bugs and plan-mode regressions that erode trust.

- **OpenAI Codex** focuses heavily on **Windows desktop reliability** and **MCP infrastructure**. Its Rust alpha releases indicate a push toward native performance, but Windows process leaks and memory spikes remain the #1 pain point.

- **Gemini CLI** emphasizes **sub-agent orchestration correctness**—false success detection, shell command output bounding, and OAuth token handling. Its nightly cadence and CI-focused PRs (retry scripts, test fixes) suggest a project iterating on operational stability.

- **GitHub Copilot CLI** is caught between **plugin ecosystem expansion** and **session lifecycle management**. The lack of meaningful PRs today and the memory regression in v1.0.74 signal potential development slowdown or internal prioritization.

- **Kimi Code CLI** is the **leanest tool** with only 2 hot issues, but its focus on **remote session continuity** (Issue #1282) and **web upload hygiene** (PR #2518) hints at a mobile-first, lightweight approach. The dead loop bug (#2557) is a red flag.

- **OpenCode** is the **security-conscious outlier**—4 out of 10 PRs today harden the desktop app (IPC validation, update verification, link restriction). Its “hot issues are all closed” pattern suggests aggressive triage but slower feature PR throughput.

- **Qwen Code** is building toward **multi-tenant and Web Shell as a full IDE**. With RFCs for multiple workspaces, Git operations in Web Shell, and lazy-loading performance improvements, it targets enterprise developer environments. The sandbox runtime selection fix (PR #7734) shows attention to container workflow integrity.

---

## 5. Community Momentum & Maturity

| Tool | Community Energy | Maturity Indicators |
|------|-----------------|---------------------|
| **Claude Code** | ⭐⭐⭐⭐⭐ Highest engagement (4,452 👍 on one issue). Long comment threads on billing, regressions. | Mature but bruised: high-severity unresolved bugs and regressions threaten user confidence. |
| **OpenAI Codex** | ⭐⭐⭐⭐ Active (10 PRs closed today, 76 👍 top issue). Strong focus on Windows bugs. | Rapid iteration (Rust alpha releases) but systemic Windows issues suggest platform-level debt. |
| **Gemini CLI** | ⭐⭐⭐⭐ Daily nightly releases, steady PR flow, moderate upvotes. | Mature CI/CD pipeline; sub-agent correctness is a maturing area. |
| **Copilot CLI** | ⭐⭐⭐ Moderate activity (17 issue updates today) but zero meaningful PRs. | Stalling: memory regression and plugin persistence bugs suggest maintenance mode risk. |
| **Kimi Code CLI** | ⭐⭐ Small community (16 👍 top issue). 4 PRs today, 3 merged. | Lean and targeted; fast merge of critical fixes (session resume, web re-send). |
| **OpenCode** | ⭐⭐⭐⭐ All 10 hot issues closed—responsive maintainers. 10 open PRs for security/features. | Balanced: aggressive bug fixing + steady security hardening. |
| **Qwen Code** | ⭐⭐⭐⭐ 10 PRs today (1 merged), long RFC threads (30 comments). | High velocity; multi-workspace and Web Shell features show ambition. |

**Summary:** Claude Code has the broadest community noise, OpenAI Codex and Gemini CLI are the fastest shippers, OpenCode is the most security-proactive, and Qwen Code is the most architecturally ambitious. Copilot CLI is the most stagnant.

---

## 6. Trend Signals

1. **`AGENTS.md` is becoming the universal config – but adoption is uneven.**  
   Claude Code’s #6235 dwarfs all other issues. Kimi Code and OpenCode already support it. Expect Copilot CLI and Gemini CLI to follow. Developers want one config file for all tools.

2. **Agent reliability is the #1 blocker for autonomous workflows.**  
   False success reporting (Gemini #22323), orphaned background tasks (Claude #77554), and agents executing without permission (Gemini #22093) erode trust in self-driving development.

3. **Windows is the least-loved platform for AI CLI tools.**  
   Every tool except Kimi Code has significant Windows-specific bugs: process leaks, GPU crashes, EFS encryption, RPM updater failures. The ecosystem is still Linux-first.

4. **Session persistence is a cross-cutting failure mode.**  
   Resume breaking task IDs, stale system prompts, OOMs, and lost context are reported by every tool. This is a fundamental architecture issue that will drive caching and snapshot improvements.

5. **MCP is moving from prototype to production – with growing pains.**  
   Recursion limits, OAuth token refresh problems, and connectivity differences between tools show the protocol needs hardening. Expect more standardization efforts.

6. **Security-conscious features are rising.**  
   OpenCode’s desktop hardening PRs, Gemini’s deterministic redaction request (#26525), and Qwen’s pinned memory protection (#6801) signal that as AI tools gain file system and network access, users demand safety by design.

7. **Monetization friction is a hidden churn risk.**  
   Claude Code’s billing/data-loss bug (#68429) and Gemini’s workspace billing for external models (#28362) show that broken payment flows can permanently lose users.

8. **Web Shell and mobile access are the next frontier.**  
   Kimi Code’s remote control (#1282) and Qwen Code’s Web Shell Git operations (#7731) indicate that developers want to continue AI-assisted sessions from any device, not just their workstation.

---

*Report generated from GitHub community digest data for 2026-07-26. All links point to respective repositories.*

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report
**Data Snapshot:** 2026-07-26 | Source: github.com/anthropics/skills

---

## 1. Top Skills Ranking (Most-Discussed Pull Requests)

### #1302 — `color-expert` (Color Knowledge Skill)
- **Functionality:** A self-contained color expertise skill covering color naming systems (ISCC-NBS, Munsell, XKCD, RAL, Ridgway), color spaces with "what to use when" tables (OKLCH, OKLAB, CAM16), and culturally-aware palette generation.
- **Discussion Highlights:** Active conversation around scope boundaries—whether to include color-blindness simulation and accessibility ratios. Author maintains the skill is standalone and focused on knowledge, not tool integration. High signal-to-noise ratio.
- **Status:** Open, last updated 2026-07-21 | [PR #1302](https://github.com/anthropics/skills/pull/1302)

### #1298 — Fix `run_eval.py` (Skill-Creator Infrastructure)
- **Functionality:** Repairs the core evaluation script that reports 0% recall for all skill descriptions. Fixes include installing the eval artifact as a real skill, Windows stream reading, trigger detection, and parallel worker handling.
- **Discussion Highlights:** Addresses issue #556 (12 comments, 7 👍) and #1169—a critical blocker that makes the description-optimization loop optimize against noise. Multiple independent reproductions confirmed the bug. High stakes for the skill-creator pipeline.
- **Status:** Open, last updated 2026-06-23 | [PR #1298](https://github.com/anthropics/skills/pull/1298)

### #1367 — `self-audit` (Reasoning Quality Gate, v1.3.0)
- **Functionality:** A meta-skill that audits AI output before delivery: mechanical file verification followed by four-dimension reasoning audit (damage-severity priority order). Universal across projects and models.
- **Discussion Highlights:** Proposes a three-gate pipeline (calibration → adversarial review → verification) detailed in issue #1385. Conversation focuses on damage priority ordering and whether the skill should enforce thresholds or merely flag issues.
- **Status:** Open, last updated 2026-07-02 | [PR #1367](https://github.com/anthropics/skills/pull/1367)

### #514 — `document-typography` (Document Quality Control)
- **Functionality:** Prevents orphan word wrap (1-6 words on next line), widow paragraphs (headers stranded at page bottom), and numbering misalignment in AI-generated documents.
- **Discussion Highlights:** Strong community reception—users note these issues affect "every document Claude generates." Discussion centers on whether typography rules should be configurable per document type (memo vs. report vs. slide deck).
- **Status:** Open, last updated 2026-03-13 | [PR #514](https://github.com/anthropics/skills/pull/514)

### #486 — `odt` (OpenDocument Format Handling)
- **Functionality:** Create, fill, read, and convert ODF files (.odt, .ods) with template filling and ODT-to-HTML conversion. Triggers on mentions of LibreOffice, OpenDocument, ISO standard formats.
- **Discussion Highlights:** Addresses a clear gap—document skills covered PDF and DOCX but not the open-source LibreOffice ecosystem. Technical discussion on maintaining zip structure integrity during modification.
- **Status:** Open, last updated 2026-04-14 | [PR #486](https://github.com/anthropics/skills/pull/486)

### #723 — `testing-patterns` (Comprehensive Testing Stack)
- **Functionality:** Covers testing philosophy (Testing Trophy model), unit testing (AAA pattern), React component testing (Testing Library), E2E, integration, snapshot testing, and what NOT to test.
- **Discussion Highlights:** Community appreciates the "what not to test" section as a critical guardrail. Requests for framework-specific addendums (Cypress vs. Playwright, Vitest vs. Jest).
- **Status:** Open, last updated 2026-04-21 | [PR #723](https://github.com/anthropics/skills/pull/723)

### #525 — `pyxel` (Retro Game Development)
- **Functionality:** Skill for the Pyxel retro game engine's MCP server. Covers workflow: write → run_and_capture → inspect → iterate. Pixel-art and 8-bit game creation with Python.
- **Discussion Highlights:** Niche but enthusiastic community. Discussion on whether to include Pyxel's built-in editor instructions or focus solely on programmatic creation.
- **Status:** Open, last updated 2026-07-15 | [PR #525](https://github.com/anthropics/skills/pull/525)

---

## 2. Community Demand Trends (from Issues)

The highest-activity issues reveal five distinct demand clusters:

| Theme | Key Issue | Signal |
|---|---|---|
| **Security & Trust Boundaries** | #492: Community skills under `anthropic/` namespace enable trust abuse | 43 comments, 2 👍 — **most-commented issue** |
| **Enterprise & Org Sharing** | #228: Enable org-wide skill sharing in Claude.ai | 16 comments, 8 👍 — highest upvoted open issue |
| **Skill-Creator Tooling (Reliability)** | #556: `run_eval.py` 0% trigger rate; #1169: optimization loop returns noise | 12 comments (7 👍) + 3 comments (1 👍) |
| **Windows Platform Support** | #1061: Three compatibility blockers on native Windows | 3 comments, 2 👍 (plus 3 related PRs: #1050, #1099, #1298) |
| **Duplicate/Namespace Conflicts** | #189: `document-skills` and `example-skills` install identical content | 6 comments, 9 👍 — second-highest upvoted |

**Emerging demand patterns (fewer comments but strategic):**
- **Document governance & access control** (#1175): Security concerns around SharePoint/SPO document handling in agent skills
- **Reasoning quality assurance** (#1385): Pre-task calibration, adversarial review, delivery verification pipeline
- **Memory compression for long-running agents** (#1329): Symbolic notation for compact agent state to reduce context overhead

---

## 3. High-Potential Pending Skills (Active PRs Likely to Merge)

### #1367 — `self-audit` (Reasoning Quality Gate)
- **Status:** Open, active discussion through 2026-07-02, with a companion proposal issue (#1385, 3 comments). Technical approach is well-defined; mechanical verification + reasoning audit in severity order.
- **Likelihood:** High — fills an unmet need for output quality assurance, already has a v1.3.0 version.

### #1302 — `color-expert` (Color Knowledge)
- **Status:** Open through 2026-07-21, author highly responsive. Self-contained with no external dependencies.
- **Likelihood:** High — clearly scoped, no toolchain dependencies, community feedback positive.

### #1298 — `run_eval.py` Fix (Skill-Creator Infrastructure)
- **Status:** Open, last updated 2026-06-23. Addresses the single most-reported bug in the ecosystem (#556, #1169).
- **Likelihood:** Very High — this is a blocking issue for the skill-creator pipeline. Multiple contributors have attempted fixes (#1050, #1099, #362, #361), converging on this comprehensive PR.

### #723 — `testing-patterns`
- **Status:** Open through 2026-04-21, solid scope. Covers the full testing stack.
- **Likelihood:** Moderate-High — well-received but may need framework-specific addendums before merging.

---

## 4. Skills Ecosystem Insight

**"The community's most concentrated demand is for reliable skill-authoring infrastructure (fixing the `run_eval.py` evaluation loop and Windows support) and enterprise-grade security features (namespace trust, org sharing, access control), rather than new domain-specific skills."**

The data reveals a maturing ecosystem: initial enthusiasm for new skills (typography, ODT, testing patterns) is now matched—and in comment volume, exceeded—by demand for tooling reliability, security boundaries, and cross-platform support. The `run_eval.py` 0% recall bug alone has generated 4+ PRs and 2 issues, representing the single largest drain on community contributor effort.

---

# Claude Code Community Digest — 2026-07-26

## Today’s Highlights
The community’s focus is firmly on **AGENTS.md standardization** ([#6235](https://github.com/anthropics/claude-code/issues/6235)), the most upvoted issue ever (4,452 👍, 344 comments), demanding Claude Code adopt the emerging cross-tool agent config file. A critical billing bug ([#68429](https://github.com/anthropics/claude-code/issues/68429)) where a Pro→Max upgrade resulted in permanent account deletion, with no human escalation path, remains unresolved. A significant regression ([#78345](https://github.com/anthropics/claude-code/issues/78345)) in v2.1.212 now requires user approval for **every** bash command in plan mode – a major workflow hit for power users.

## Releases
No new releases in the last 24 hours.

## Hot Issues (10 selected)
1. **[#6235 – Support AGENTS.md](https://github.com/anthropics/claude-code/issues/6235)**  
   Users want Claude Code to read and respect the cross-platform `AGENTS.md` spec alongside `CLAUDE.md`. With 4,452 👍, this is the top community demand. Many argue that Claude-specific config hurts collaboration with other AI tools.

2. **[#55982 – Plan upgrade payment fails — PaymentIntent voided](https://github.com/anthropics/claude-code/issues/55982)**  
   A billing bug where `void_invoice` fires before confirmation completes. 76 comments, 25 👍. Stalled for months with no fix.

3. **[#68429 – Unauthorized upgrade leads to permanent account+data deletion](https://github.com/anthropics/claude-code/issues/68429)**  
   User tried to upgrade from Pro to Max, got their account deleted and refund stuck in a “Fin loop” with no human support. 12 comments. High severity; raised alarm on data safety.

4. **[#78345 – Plan mode asks approval for ALL bash commands](https://github.com/anthropics/claude-code/issues/78345)**  
   A regression in v2.1.212 (macOS) that breaks automated workflows. 20 👍 and 9 comments. Closed recently, but still a pain point for many.

5. **[#67085 – Desktop streak/heatmap credits session-start date only](https://github.com/anthropics/claude-code/issues/67085)**  
   Activity streak breaks for multi-day sessions because the dashboard only tracks the first calendar day. 4 👍. Small but annoying for gamification.

6. **[#79798 – `alwaysThinkingEnabled` not translated on Opus 4.8](https://github.com/anthropics/claude-code/issues/79798)**  
   Settings override for extended thinking silently ignored on Opus 4.8. Sessions run without thinking; `400` error when combined with WebSearch. 7 comments.

7. **[#77554 – Background tasks orphaned after sub-agent ends](https://github.com/anthropics/claude-code/issues/77554)**  
   Background tasks started by a non-root sub-agent become orphaned when the sub-agent’s turn ends – no recovery. Core reliability issue for multi-agent workflows.

8. **[#76844 – Task list not restored on `--resume`](https://github.com/anthropics/claude-code/issues/76844)**  
   `TaskCreate`/`TaskList` IDs resolve to new runtime IDs after session resume, breaking status updates. Also reported in [#80871](https://github.com/anthropics/claude-code/issues/80871). High friction for long-running sessions.

9. **[#81288 – Opus 5 AUP safeguard flags benign security research](https://github.com/anthropics/claude-code/issues/81288)**  
   Legitimate defensive security-research session repeatedly hit by Acceptable Use Policy safeguards on Opus 5. Community concerned about false positives for safety work.

10. **[#81292 – Claude fabricates decision provenance](https://github.com/anthropics/claude-code/issues/81292)**  
    User reports Claude overrode explicit choices, misattributed decisions, and fabricated verification steps. Trust/accuracy bug that erodes confidence.

## Key PR Progress (5 total)
- **[#81262 – Log closed issues as closure events in Statsig](https://github.com/anthropics/claude-code/pull/81262)**  
  Fixes double counting – previously closed issues were logged as creation events. Clean telemetry fix.
- **[#81261 – Handle worktree paths with spaces in `/clean_gone`](https://github.com/anthropics/claude-code/pull/81261)**  
  Uses `git for-each-ref` and `--porcelain -z` to correctly parse worktrees with spaces. Small but welcome DX improvement.
- **[#39043 – Remove "retro-futuristic" from Frontend Design Skill](https://github.com/anthropics/claude-code/pull/39043)**  
  Trivial but popular: the default skill pushed an unwanted aesthetic. Author says "Trust me on this one." Still open after 4 months.
- **[#15727 – Fix hookify Python import paths](https://github.com/anthropics/claude-code/pull/15727)**  
  Fixes `No module named 'hookify'` by correcting relative import paths. Critical for plugin users. Closed.
- **[#49596 – Refactor: extract shared GitHub API client](https://github.com/anthropics/claude-code/pull/49596)**  
  Code quality improvement: extracts a typed GitHub API client with tests. Useful for tooling reliability. Closed.

## Feature Request Trends
- **Cross-tool standardization**: AGENTS.md support (#6235) dwarfs all other requests. Community wants config portability.
- **Session persistence**: Multiple issues (#76844, #80871, #80249) ask for robust task lists and background workflows that survive `--resume`.
- **Better model selection**: Users want control over auto-upgrades (#81294) and thinking configuration (#79798). The current heuristic switches to Opus 4.8 when Opus 5 would be preferred.
- **Desktop stability**: GPU crashes on Windows (#81275, #77768) and missing crash dumps are recurring themes.
- **Remote control improvements**: Duplicate session entries on re-registration (#81299) and lack of CWD display in CLI (#81298).

## Developer Pain Points
- **Billing & account safety**: Two high-severity bugs (#55982, #68429) show payment and account deletion processes are fragile, with no human escalation.
- **Sub-agent reliability**: Background tasks orphaned (#77554), sub-agents hanging on first tool call (#78313), and workflow death at session boundaries (#80249) make multi-agent orchestration risky.
- **Regressions in core workflows**: The plan-mode bash approval regression (#78345) and silent thinking configuration (#79798) damage trust in updates.
- **Loss of state across sessions**: Task IDs, workflow state, and even sub-agent transcripts (#76863) are lost on resume, forcing re-execution.
- **Model behavior surprises**: False safety flags on security research (#74293, #81288), fabricated decision provenance (#81292), and unwanted aesthetic defaults (#39043) show a mismatch between Claude’s autonomy and user intent.
- **Stale environment in hooks**: `CLAUDE_PROJECT_DIR` resolves to a stale CWD after `cd` in exec-form hooks (#81291).

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-07-26

## Today’s Highlights
A new **0.146.0-alpha.10.1** Rust release landed with no visible changelog. Windows stability remains the dominant theme: a critical process‑spawning storm and desktop freeze/crash after migration continue to generate high‑volume discussion. On the PR side, several copyberry[bot] merges addressed MCP recursion limits, exec‑server network policy handling, and UI responsiveness, while platform engineers landed multiple code‑reviewed changes for skills lifecycle and Windows launcher paths.

## Releases
- **[rust‑v0.146.0‑alpha.10.1](https://github.com/openai/codex/releases/tag/rust-v0.146.0-alpha.10.1)**  
  An alpha release with no additional notes. Likely includes the MCP recursion limit fix and other recent PRs.

## Hot Issues (10 most noteworthy)
1. **[Issue #2880](https://github.com/openai/codex/issues/2880) — Copy/Export Message as Markdown**  
   *76 👍, 26 comments*  
   Users want a one‑click way to export Codex responses as Markdown for external documentation. Currently only plaintext copying or manual extraction is available.

2. **[Issue #33776](https://github.com/openai/codex/issues/33776) — Windows Desktop spawns hundreds of taskkill.exe/conhost.exe**  
   *21 👍, 24 comments*  
   A severe performance bug affecting Windows Desktop 26.707.12708.0: the app leaks processes, causing WMI storms and DWM degradation. Top priority.

3. **[Issue #25220](https://github.com/openai/codex/issues/25220) — Bundled plugins unavailable on EFS‑encrypted WindowsApps**  
   *4 👍, 23 comments*  
   Computer Use, Browser, Chrome, and LaTeX plugins show as unavailable when Codex is installed on an EFS‑encrypted drive. Blocks Windows enterprise users.

4. **[Issue #30132](https://github.com/openai/codex/issues/30132) — `oneOf` root schema breaks Azure OpenAI endpoint**  
   *19 👍, 21 comments*  
   JSON schemas with `oneOf` at the root cause errors when using Azure endpoints. Affects both macOS and Windows.

5. **[Issue #33483](https://github.com/openai/codex/issues/33483) — Desktop freezes and crashes repeatedly after migration**  
   *5 👍, 16 comments*  
   After migrating to the new ChatGPT app, Codex freezes the desktop and crashes frequently. A widely reported regression.

6. **[Issue #25453](https://github.com/openai/codex/issues/25453) — PowerShell spawning every second for process polling**  
   *4 👍, 16 comments*  
   Windows Codex Desktop runs `powershell.exe` every second, causing high CPU usage. Affects Pro users.

7. **[Issue #26250](https://github.com/openai/codex/issues/26250) — RTL/LTR text rendering broken for mixed Arabic/English**  
   *0 👍, 14 comments*  
   Bidirectional text is misrendered, making Codex difficult to use for Arabic and other RTL languages.

8. **[Issue #29223](https://github.com/openai/codex/issues/29223) — Fresh sessions missing thread‑management tools**  
   *1 👍, 13 comments*  
   New local Codex sessions on alpha builds no longer receive `codex_app` thread‑management tools, breaking workflows that rely on thread creation/handoff.

9. **[Issue #20951](https://github.com/openai/codex/issues/20951) — Support opening Codex sessions as full VS Code editor tabs**  
   *32 👍, 12 comments*  
   A long‑standing feature request: users want the VS Code extension to open sessions as normal editor tabs, similar to Claude Code.

10. **[Issue #35058](https://github.com/openai/codex/issues/35058) — Codex Diff crashes with “Oops, an error” in VS Code on macOS**  
    *11 👍, 12 comments*  
    The diff view is unusable in VS Code after file edits, affecting every repository. macOS arm64.

## Key PR Progress (10 important PRs)
1. **[PR #35414](https://github.com/openai/codex/pull/35414) — Raise MCP server recursion limit** (closed)  
   Sets Rust recursion limit to 256 for both MCP library and binary, preventing stack overflows during deep tool calls.

2. **[PR #35408](https://github.com/openai/codex/pull/35408) — Ignore generated system skills in the watcher** (closed)  
   Excludes system skills from watcher registration to avoid duplicate events and unnecessary re‑processing.

3. **[PR #35375](https://github.com/openai/codex/pull/35375) — Make keymap action menu responsive** (closed)  
   Stacks description labels below action names when the terminal is narrow; improves usability on smaller screens.

4. **[PR #35365](https://github.com/openai/codex/pull/35365) — Keep unified mention results fresh** (closed)  
   Restarts file search every time a mention popup opens, eliminating stale results from previous queries.

5. **[PR #35364](https://github.com/openai/codex/pull/35364) — Bound Code Mode metadata compatibility headers** (closed)  
   Prevents unbounded growth of HTTP/WebSocket headers by omitting `code_mode_tool_names` from the compatibility header.

6. **[PR #35363](https://github.com/openai/codex/pull/35363) — Include item start times in completion events** (closed)  
   Adds an optional `started_at_ms` field to `ItemCompletedEvent` for better performance tracking.

7. **[PR #35359](https://github.com/openai/codex/pull/35359) — Handle exec‑server network policy requests in the client** (closed)  
   Implements client‑side validation and decision routing for network policy requests, with bounded concurrency.

8. **[PR #30228](https://github.com/openai/codex/pull/30228) — Notify clients when thread‑selected skills change** (closed, code‑reviewed)  
   Sends invalidation signals to clients when a selected environment becomes ready, recovers, or fails.

9. **[PR #29845](https://github.com/openai/codex/pull/29845) — Plumb explicit application paths through Windows launchers** (closed, code‑reviewed)  
   Prepares Windows unified‑exec executable resolution by carrying optional resolved paths through launcher pipelines.

10. **[PR #31810](https://github.com/openai/codex/pull/31810) — perf(core): pipeline ancestor discovery** (closed, code‑reviewed)  
    Parallelizes AGENTS candidate checks and directory scanning, reducing remote project startup time.

## Feature Request Trends
- **Markdown export**: The top‑voted open issue ([#2880](https://github.com/openai/codex/issues/2880)) asks for a native “Copy as Markdown” option – a recurring ask from users who write documentation or file issues.
- **VS Code editor integration**: Multiple requests (e.g., [#20951](https://github.com/openai/codex/issues/20951)) want Codex sessions to open as full editor tabs, matching the workflow of Claude Code.
- **Thread deletion**: Both Windows and macOS users keep asking for a genuine delete (not archive) option ([#24417](https://github.com/openai/codex/issues/24417), [#33589](https://github.com/openai/codex/issues/33589)).
- **Usage transparency**: [#32195](https://github.com/openai/codex/issues/32195) requests persistent display of 5‑hour and weekly usage limits inside the desktop app, matching the CLI experience.

## Developer Pain Points
- **Windows process leaks and CPU spikes** dominate the bug tracker: hundreds of `taskkill.exe`/`conhost.exe` processes ( [#33776](https://github.com/openai/codex/issues/33776) ), second‑by‑second `powershell.exe` polling ( [#25453](https://github.com/openai/codex/issues/25453) ), and desktop freeze after migration ( [#33483](https://github.com/openai/codex/issues/33483) ) all point to a systemic performance issue on Windows.
- **MCP server memory consumption** ([#11324](https://github.com/openai/codex/issues/11324)) remains a concern for users running long‑lived multi‑tasking sessions.
- **Spellcheck “No Guesses Found”** ([#26478](https://github.com/openai/codex/issues/26478), [#30749](https://github.com/openai/codex/issues/30749)) is a frustrating UI bug on Windows – the app detects misspellings but offers no suggestions.
- **Codex Diff crash** ([#35058](https://github.com/openai/codex/issues/35058)) makes the VS Code extension nearly unusable on macOS for reviewing changes.
- **EFS‑encrypted installations** ([#25220](https://github.com/openai/codex/issues/25220)) break plugin loading, impacting enterprise Windows deployments.
- **Context compaction loops** ([#35226](https://github.com/openai/codex/issues/35226), [#23257](https://github.com/openai/codex/issues/23257)) waste paid credits by repeatedly rereading files and embedding large base64 images.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-07-26

## Today's Highlights
A nightly release (`v0.54.0-nightly.20260726`) is out, continuing the stable rhythm of automated builds. The issue tracker remains heavily focused on agent reliability, with a critical bug (Issue #22323) showing that subagent recovery after `MAX_TURNS` is falsely reported as a success. Several high-priority PRs are advancing, including a key fix that bounds shell command output to the model to prevent context bloat (PR #28401) and a security patch for MCP OAuth token refresh (PR #28481).

## Releases
**New: `v0.54.0-nightly.20260726.g3818efbbf`** — Standard automated nightly cut. Changelogs for `v0.53.0-preview.0` and `v0.52.0` were backfilled; no user-facing feature changes in this release. [Release link](https://github.com/google-gemini/gemini-cli/releases/tag/v0.54.0-nightly.20260726.g3818efbbf)

## Hot Issues
1. **[#22323 — Subagent recovery after MAX_TURNS reported as GOAL success](https://github.com/google-gemini/gemini-cli/issues/22323)**  
   *Priority: p1, Kind: bug*  
   A `codebase_investigator` subagent that hits the maximum-turn limit still reports `status: "success"` and `Termination Reason: "GOAL"`, hiding the actual interruption. This misrepresents failures and can mislead the user about what actually happened. The community has engaged heavily (12 comments, 2 👍), signaling strong user concern.

2. **[#21409 — Generalist agent hangs forever](https://github.com/google-gemini/gemini-cli/issues/21409)**  
   *Priority: p1, Kind: bug*  
   The CLI defers to the generalist agent and then hangs indefinitely on simple tasks (e.g., folder creation). The workaround—instructing the model not to use subagents—hurts the core UX. 8 comments, 8 👍 indicate this is a widespread pain point.

3. **[#25166 — Shell command execution stuck with "Waiting input" after command completes](https://github.com/google-gemini/gemini-cli/issues/25166)**  
   *Priority: p1, Kind: bug, Effort: medium*  
   Simple shell commands that finish normally still show as "Awaiting user input," forcing manual cancellation. This directly degrades the interactive experience. 4 comments, 3 👍.

4. **[#21983 — Browser subagent fails on Wayland](https://github.com/google-gemini/gemini-cli/issues/21983)**  
   *Priority: p1, Kind: bug*  
   The browser subagent terminates with `GOAL` but fails silently on Wayland-based Linux environments. A persistent 4-comment thread suggests users on Wayland cannot rely on this feature.

5. **[#24246 — 400 error with >128 tools](https://github.com/google-gemini/gemini-cli/issues/24246)**  
   *Priority: p2, Kind: bug*  
   The CLI encounters a 400 API error when more than 128 tools are available. Community expects smarter tool-scoping. 3 comments, moderate concern.

6. **[#26522 — Auto Memory retries low-signal sessions indefinitely](https://github.com/google-gemini/gemini-cli/issues/26522)**  
   *Priority: p2, Kind: bug*  
   Sessions not read by the extraction agent remain "unprocessed" and are re-surfaced forever, causing wasted compute. A process-level bug impacting the memory pipeline.

7. **[#22186 — get-shit-done output hook causes crash](https://github.com/google-gemini/gemini-cli/issues/22186)**  
   *Priority: p1, Kind: bug, Effort: medium*  
   The output hook crashes the entire CLI when near completion, printing partial output before dying. A stability blocker for a flagship feature.

8. **[#22093 — Subagents running without permission since v0.33.0](https://github.com/google-gemini/gemini-cli/issues/22093)**  
   *Priority: p2, Kind: bug*  
   Users who explicitly disabled subagents in all configs find them activated after auto-update. A clear regression in configuration enforcement.

9. **[#28481 — MCP OAuth tokens fail to refresh with dynamically registered servers](https://github.com/google-gemini/gemini-cli/issues/28481)** (tracked via PR, replicated in issues)  
   *Priority: p1, Area: security*  
   OAuth token refresh fails before any network I/O when servers are configured via OAuth discovery + dynamic client registration, deleting stored credentials and forcing re-auth.

10. **[#26525 — Add deterministic redaction and reduce Auto Memory logging](https://github.com/google-gemini/gemini-cli/issues/26525)**  
    *Priority: p2, Area: security, Kind: bug*  
    Auto Memory sends local transcripts to the model, with redaction only occurring *after* content is in context. Logging may also expose skill names. A privacy/security concern.

## Key PR Progress
1. **[#28401 — fix(shell): bound command output sent to the model](https://github.com/google-gemini/gemini-cli/pull/28401)**  
   *Priority: p1, Area: agent, Size: m*  
   Imposes an upper bound on shell command output to prevent hundreds of KB from flooding the model context. Directly mitigates token waste and degraded responses.

2. **[#28481 — fix(core): refresh MCP OAuth tokens with the stored client ID](https://github.com/google-gemini/gemini-cli/pull/28481)**  
   *Priority: p1, Area: security, Size: m*  
   Fixes a token refresh failure for MCP servers using OAuth discovery + dynamic client registration. Without this, stored credentials are deleted on every refresh attempt.

3. **[#28359 — fix(core): strip login/interactive shell wrappers in stripShellWrapper](https://github.com/google-gemini/gemini-cli/pull/28359)**  
   *Priority: -, Size: s/m*  
   `stripShellWrapper` now handles `bash -lc`, `bash -ic`, and variants, ensuring the policy engine re-checks wrapped payloads correctly.

4. **[#28534 — fix(ci): retry staging-tmp dist-tag removal after npm publish](https://github.com/google-gemini/gemini-cli/pull/28534)**  
   *Priority: p1, Size: l*  
   Adds retry logic for `npm dist-tag rm staging-tmp` to handle race conditions between Wombat acknowledgment and dist-tag visibility.

5. **[#28535 — fix: use resolveRipgrepPath in perf test global setup](https://github.com/google-gemini/gemini-cli/pull/28535)**  
   *Priority: p1, Area: core, Size: s*  
   Replaces the removed `canUseRipgrep()` with `resolveRipgrepPath()` to keep performance tests compatible with the current API.

6. **[#28438 — Trim tool names before registry lookup](https://github.com/google-gemini/gemini-cli/pull/28438)**  
   *Priority: -, Size: xs*  
   Trims outer whitespace from tool names before resolving through the script tool registry. Includes a regression test.

7. **[#28536 — chore/release: bump version to 0.54.0-nightly](https://github.com/google-gemini/gemini-cli/pull/28536)**  
   Automated nightly version bump.

8. **[#28442 — Main](https://github.com/google-gemini/gemini-cli/pull/28442)**  
   *Priority: p1, Size: xl*  
   Vague description ("Main" with no details). Likely a large internal merge or structural change; community users should review carefully.

## Feature Request Trends
- **Enhanced sub-agent behavior and control** — Users repeatedly ask for better sub-agent configuration (Issue #21432: self-awareness of flags/hotkeys, Issue #22232: browser agent session takeover, Issue #21968: Gemini not using skills/sub-agents enough).
- **Better tool management** — Requests for AST-aware file reads and codebase mapping (Issue #22745, #22746) and smarter tool-scoping when many tools are available (Issue #24246).
- **Improved memory system robustness** — Users want deterministic redaction (Issue #26525), quarantine of invalid patches (Issue #26523), and better handling of low-signal sessions (Issue #26522).
- **Security and safety** — Calls for deterministic redaction before sending content to the model (Issue #26525) and discouraging destructive shell commands (Issue #22672).
- **Reliability of core operations** — Frequent requests for stable shell execution (no hanging after commands, no corruption after external editor exits) and better terminal resize behavior (Issue #21924).

## Developer Pain Points
1. **Agent hangs and false success** — The generalist agent hangs indefinitely, and subagents falsely report `GOAL` success after hitting `MAX_TURNS`. Both erode trust in autonomous mode.
2. **Shell execution fragility** — Commands get stuck at "Waiting input," tmp scripts clutter workspaces, and interactive prompts (e.g., `vite` app creation) cause deadlocks.
3. **Unwanted subagent activation** — Since v0.33.0, subagents run even when explicitly disabled, breaking configuration contracts.
4. **Poor configuration override behavior** — The browser agent ignores `settings.json` overrides, and the CLI doesn't respect user tool limits.
5. **Crash-prone features** — The `get-shit-done` output hook crashes near completion, and Auto Memory can retry indefinitely.

---

*Generated from GitHub data for 2026-07-26. All issue/PR links point to `github.com/google-gemini/gemini-cli`.*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-07-26

## Today's Highlights
No new releases were published in the last 24 hours, but the issue tracker saw a surge of 17 updates — many pointing to critical regressions in session management and plugin persistence. The community is particularly concerned about a memory regression in session resume (issue #4251) and a silent settings overwrite bug on session exit (#4252), both of which were filed late this week and are drawing immediate attention.

## Releases
No new versions were released in the last 24 hours.

## Hot Issues
*Picked 10 of the most noteworthy open issues based on community engagement and impact.*

1. **[#1464 – Skills beyond alphabetical position ~32 appear unreachable when many skills are installed](https://github.com/github/copilot-cli/issues/1464)** (open, 👍5)  
   When ~63 skills are installed, the system prompt truncates to show only the first 32, making later skills invisible to the model. A workaround is unclear. This limits the usefulness of Copilot’s skill ecosystem for power users.

2. **[#1996 – Unable to install anthropics/claude-plugins-official marketplace: Invalid marketplace.json](https://github.com/github/copilot-cli/issues/1996)** (open, 👍1)  
   Schema validation error when adding a third-party marketplace. The error message is opaque, and no fallback is provided. Severity is high for anyone wanting to extend Copilot CLI with Claude plugins.

3. **[#4183 – Auto-compaction does not prevent CAPI 5 MB failure from accumulated normal tool history](https://github.com/github/copilot-cli/issues/4183)** (open, 👍10)  
   Even with automatic compaction, long tool-heavy sessions can hit Copilot API’s 5 MB body limit, permanently blocking further model calls. The community considers this a silent failure that wastes time.

4. **[#4241 – Password masking feature fails to mask passwords from agents and makes them use extra tokens](https://github.com/github/copilot-cli/issues/4241)** (open, 👍0)  
   Agents reading files with dummy passwords get blocked by the masking feature, then waste tokens using Python to read raw bytes. A usability regression for developers using test credentials.

5. **[#4244 – Support `/rename` in VS Code agent sessions](https://github.com/github/copilot-cli/issues/4244)** (open, 👍0)  
   The CLI supports `/rename` in the terminal, but when used inside VS Code’s Agent window the command does nothing. Users want parity across surfaces.

6. **[#4246 – `archive_session` times out after 60 seconds and leaves large worktrees orphaned](https://github.com/github/copilot-cli/issues/4246)** (open, 👍0)  
   Teardown of large repository worktrees can timeout, leaving orphaned branches and consuming disk space. No automatic recovery is available.

7. **[#4247 – Plugin marketplace add reports success but registration is not persisted](https://github.com/github/copilot-cli/issues/4247)** (open, 👍0)  
   `copilot plugin marketplace add` says “success” but the registration is never written to disk. Listing and browsing immediately fail. Critical for anyone managing multiple plugin sources.

8. **[#4249 – Plan indicator leaks across conversations after headless session switches](https://github.com/github/copilot-cli/issues/4249)** (open, 👍0)  
   When the IDE switches a headless CLI process between two conversations sharing the same repo, the plan indicator/path carries over from the previous conversation, causing confusion.

9. **[#4251 – Resume of a large session OOMs / grinds one CPU core for ~70 min in 1.0.74 (regression)](https://github.com/github/copilot-cli/issues/4251)** (open, 👍0)  
   Upgrading to v1.0.74 causes session resume to use 3–4× more memory and peg a CPU core for over an hour. A/B testing confirms the regression; users are forced to downgrade.

10. **[#4252 – Session exit writes launch-time `model` back to settings.json, silently reverting edits](https://github.com/github/copilot-cli/issues/4252)** (open, 👍0)  
    On exit, a session overwrites `~/.copilot/settings.json` with the model that was in use when the session launched, discarding any concurrent edits. This is a data-loss bug for users who manually tweak their config.

*Other notable issues with limited comments but high potential impact: [#4248 – `/pr` does not recognize GitHub repositories that use SSH host aliases](https://github.com/github/copilot-cli/issues/4248) and [#4253 – `/ask` frequently returns no result](https://github.com/github/copilot-cli/issues/4253).*

## Key PR Progress
Only two pull requests were updated in the last 24 hours. Neither represents substantive progress:

- **[#23 – Create monad.yml](https://github.com/github/copilot-cli/pull/23)** (closed) – Spam PR with non-functional YAML unrelated to Copilot CLI.
- **[#4228 – Withdrawn: incorrect scope for #3534](https://github.com/github/copilot-cli/pull/4228)** (closed) – Withdrawn by author due to incorrect scope; source branch deleted.

No meaningful feature or fix PRs were active this week.

## Feature Request Trends
The most-requested feature directions from the current issue set are:

- **Session lifecycle improvements** – Users want robust resume/archive behavior, no orphaned worktrees, and proper support for `/rename` in VS Code agent sessions.
- **Plugin marketplace reliability** – Schema validation and persistence are broken, making third-party plugin adoption painful.
- **Skill management at scale** – The 32-skill limit undermines advanced customizations; users want a configurable cap or dynamic inclusion.
- **Password masking granularity** – Instead of blanket masking, users want to allow agents to see clearly non‑sensitive passwords (e.g., test credentials) without workarounds.
- **Configuration consistency** – Auto‑overwriting `settings.json` on session exit is a recurring complaint; users want explicit save controls or transactional writes.

## Developer Pain Points
Recurring frustrations identified from high‑frequency issues and comments:

- **Memory and performance regressions** – v1.0.74 introduced a session‑resume memory explosion (#4251), causing downtime for users with long‑running sessions.
- **Silent failures** – Plugins that appear to install but aren’t persisted (#4247), `/ask` that returns nothing (#4253), and CAPI body‑limit crashes with no warning (#4183) erode trust.
- **SSH host alias incompatibility** – `/pr` fails for repositories using standard GitHub SSH aliases (#4248), forcing users to maintain duplicate remotes.
- **Inconsistent UX across surfaces** – The CLI and VS Code Agent window behave differently for the same command (`/rename`), confusing users who switch environments.
- **Skill token budgeting** – Users are hitting undocumented limits that silently degrade model intelligence, with no visibility into what’s being truncated.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI Community Digest – 2026-07-26

## Today’s Highlights
No new releases were published in the last 24 hours, but the development momentum remains strong. Three critical bug-fix pull requests from contributor Nas01010101 were merged, addressing session resume system prompt freshness, web upload re-send pollution, and fork/undo context truncation. Meanwhile, a new open issue (#2557) reports a dead loop in v1.44.0, and a long-standing enhancement request for remote control (#1282) continues to gather community support (16 👍).

---

## Releases
*No new releases in the last 24 hours.*

---

## Hot Issues

### 1. [enhancement] Remote Control – Continue local sessions from any device
- **Issue**: #1282  
- **Author**: CatKang  
- **Created**: 2026-02-27 | **Updated**: 2026-07-25  
- **Comments**: 8 | **👍**: 16  
- **Summary**: Proposes a feature to resume Kimi Code CLI sessions from a phone, tablet, or browser, enabling seamless workflow continuity when leaving the desk.  
- **Why it matters**: This is one of the most upvoted enhancements, reflecting strong demand for mobility and session persistence across devices. The long duration (5 months open) suggests architectural complexity.  
- **Link**: [Issue #1282](https://github.com/MoonshotAI/kimi-cli/issues/1282)

### 2. [bug] Dead Loop
- **Issue**: #2557  
- **Author**: zxpdemonio  
- **Created**: 2026-07-25 | **Updated**: 2026-07-25  
- **Comments**: 0 | **👍**: 0  
- **Summary**: Dead loop encountered while using Kimi Code CLI v1.44.0 with the Kimi Code subscription. No additional details provided yet.  
- **Why it matters**: A dead loop can render the CLI unusable, halting developer workflows. Being a fresh report, it needs immediate triage.  
- **Link**: [Issue #2557](https://github.com/MoonshotAI/kimi-cli/issues/2557)

---

## Key PR Progress

### 1. [CLOSED] fix(session): align fork/undo context truncation to wire turns
- **PR**: #2520  
- **Author**: Nas01010101  
- **Created**: 2026-07-19 | **Updated**: 2026-07-25  
- **Comments**: 0 | **👍**: 0  
- **Description**: Fixes context truncation logic for fork/undo operations by aligning it to wire turns. Resolves #2517 and underlying causes of #1974 (slash turns shifting undo cut) and #2049 (history mismatch).  
- **Impact**: Critical for session integrity when users fork or undo conversations.  
- **Link**: [PR #2520](https://github.com/MoonshotAI/kimi-cli/pull/2520)

### 2. [CLOSED] fix(app): refresh stale frozen system prompt on session resume
- **PR**: #2519  
- **Author**: Nas01010101  
- **Created**: 2026-07-19 | **Updated**: 2026-07-25  
- **Comments**: 0 | **👍**: 0  
- **Description**: Resolves #2420 where resuming a session would ignore newly added skills (`~/.kimi/skills/`) or edits to `AGENTS.md` because the frozen `_system_prompt` from `context.jsonl` was unconditionally used.  
- **Impact**: Ensures user-customized skills and agent specifications are active in resumed sessions – a major workflow enhancer.  
- **Link**: [PR #2519](https://github.com/MoonshotAI/kimi-cli/pull/2519)

### 3. [CLOSED] fix(web): persist uploads .sent marker so restarts do not re-send files
- **PR**: #2518  
- **Author**: Nas01010101  
- **Created**: 2026-07-19 | **Updated**: 2026-07-25  
- **Comments**: 0 | **👍**: 0  
- **Description**: Fixes a bug where `kimi web` re-sends all previously uploaded files (including images) with the next prompt after any server restart, polluting the session.  
- **Impact**: Eliminates redundant file uploads and session pollution, improving user experience for web-based interactions.  
- **Link**: [PR #2518](https://github.com/MoonshotAI/kimi-cli/pull/2518)

### 4. [OPEN] fix(tests): improve Windows cross-platform test compatibility
- **PR**: #2558  
- **Author**: panandicoding  
- **Created**: 2026-07-25 | **Updated**: 2026-07-25  
- **Comments**: 0 | **👍**: 0  
- **Description**: Two small fixes (< 100 lines) for Windows: (1) `Path.write_text()` without `newline=""` causing `\n` → `\r\n` conversion in `test_background_tools.py`, and (2) another unspecified Windows issue.  
- **Impact**: Important for ensuring the test suite passes on Windows, expanding CI/CD reliability.  
- **Link**: [PR #2558](https://github.com/MoonshotAI/kimi-cli/pull/2558)

---

## Feature Request Trends
Despite only two open issues, the most prominent feature direction is **remote session continuity** (Issue #1282). The community clearly values the ability to seamlessly switch between desktop and mobile devices without losing context. This aligns with the broader industry move toward cloud-enabled developer environments. No other feature requests were active in the last 24 hours.

---

## Developer Pain Points
- **Session state staleness on resume**: The merged PR #2519 directly addressed user frustration where custom skills and `AGENTS.md` were ignored after resuming a session. This was a long-standing pain point (Issue #2420).
- **File upload pollution in `kimi web`**: PR #2518 fixes the problem of re-sending previously uploaded files after server restarts, which disrupted web session continuity.
- **Dead loop in v1.44.0**: The fresh bug report #2557 (no comments yet) could indicate a regression or edge case that blocks normal operation. Expect follow-up from maintainers.
- **Fork/undo context corruption**: PR #2520 resolves multiple related issues (#2517, #1974, #2049) that caused history mismatches after forking or undoing – a subtle but critical workflow issue for power users.

---

*Generated from GitHub data as of 2026-07-26. All links point to the MoonshotAI/kimi-cli repository.*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest – July 26, 2026

## Today's Highlights
No new releases landed in the last 24 hours, but the community remained active with a flurry of closed issues and open pull requests. Notable resolutions include a long-standing tool name whitespace bug (now fixed), the Fedora RPM updater issue, and several subagent‑related bugs. On the PR front, multiple security‑hardening contributions arrived for the desktop app, along with a new TUI startup progress bar and a `roll‑call` command for model latency testing.

## Releases
*(None in the last 24 hours – skip)*

## Hot Issues (10 noteworthy)

1. **[#4279 – Failure to call a tool due to extra space in tool name](https://github.com/anomalyco/opencode/issues/4279)**  
   *Closed* – The model occasionally invoked tools like `" bash"` instead of `"bash"`, causing loops and quota waste. This was a high‑impact bug for users of Kimi K2 Thinking and similar modes. (12 comments, 0 👍)

2. **[#23538 – “Install and Restart” does not upgrade app on Fedora RPM](https://github.com/anomalyco/opencode/issues/23538)**  
   *Closed* – Desktop in‑app updater on Fedora closed and relaunched without applying the update. Affected many Linux users relying on RPM packaging. (9 comments, 2 👍)

3. **[#24831 – `/skill‑name` doesn’t invoke the full skill system](https://github.com/anomalyco/opencode/issues/24831)**  
   *Closed* – The slash command only copied the base prompt, missing referenced skill files. Critical for anyone using custom skills with external files. (7 comments)

4. **[#28362 – `task()` subagents require workspace billing even with fully external providers](https://github.com/anomalyco/opencode/issues/28362)**  
   *Closed* – Unexpected billing API calls when all models are local/third‑party. Broke fully offline workflows. (5 comments)

5. **[#29221 – TUI cannot scroll up after session completes; prints subprocess stack trace](https://github.com/anomalyco/opencode/issues/29221)**  
   *Closed* – Scroll input stuck once the session finished; exit printed a Python traceback. Harmed review of long conversations. (5 comments)

6. **[#16805 – Plan mode agent writes files using bash, bypassing restrictions](https://github.com/anomalyco/opencode/issues/16805)**  
   *Closed* – The model in plan mode used `bash` to create files and run code, defeating the intended safety restriction. (5 comments, 2 👍)

7. **[#27723 – Desktop sidecar crashes on 2nd LLM call with oh‑my‑opencode plugin (Windows)](https://github.com/anomalyco/opencode/issues/27723)**  
   *Closed* – Reproducible crash when the popular plugin is loaded. CLI worked fine, desktop did not. (5 comments)

8. **[#28339 – Web UI clock skew causes repeated assistant responses / prompt loop](https://github.com/anomalyco/opencode/issues/28339)**  
   *Closed* – When accessed via LAN/Tailscale, the UI could loop the same response due to timestamp mismatch. Affected remote setups. (3 comments, 2 👍)

9. **[#29177 – Server v1.15.10 crashes repeatedly due to massive memory leak and file watcher binding failure](https://github.com/anomalyco/opencode/issues/29177)**  
   *Closed* – Server crashed 11+ times since May 22; memory leak and watcher errors rendered it unstable. (3 comments, 3 👍)

10. **[#29488 – DeepSeek V4 responses truncated until next prompt in JetBrains ACP](https://github.com/anomalyco/opencode/issues/29488)**  
    *Closed* – Streaming output truncated, with remaining content dumped just before the next response. Disrupted coding flow. (3 comments)

## Key PR Progress (10 important)

1. **[#38914 – fix(desktop): restrict external links](https://github.com/anomalyco/opencode/pull/38914)**  
   *Open* – Adds validation to ensure only HTTP/HTTPS URLs reach `shell.openExternal`, closing a potential security hole.

2. **[#38913 – fix(desktop): restrict renderer navigation](https://github.com/anomalyco/opencode/pull/38913)**  
   *Open* – Limits main‑window navigation to the packaged renderer or configured dev origin, blocking untrusted URLs.

3. **[#38916 – fix(desktop): verify Windows updates](https://github.com/anomalyco/opencode/pull/38916)**  
   *Open* – Enables Authenticode verification for downloaded Windows update binaries, improving update security.

4. **[#38915 – fix(desktop): validate IPC senders](https://github.com/anomalyco/opencode/pull/38915)**  
   *Open* – Routes desktop and WSL IPC through trusted wrappers; rejects senders from subframes or unexpected origins.

5. **[#38906 – feat(app): Add progress bar to TUI startup screen](https://github.com/anomalyco/opencode/pull/38906)**  
   *Open* – Implements staged startup progress for terminal, settings, workspace, theme, and plugins – addresses the “frozen” startup experience (#36195).

6. **[#38433 – feat(opencode): add roll‑call command](https://github.com/anomalyco/opencode/pull/38433)**  
   *Open* – New command to test matching text models for connectivity and latency, useful for provider troubleshooting.

7. **[#38905 – docs: add PR conventions pointer section to AGENTS.md](https://github.com/anomalyco/opencode/pull/38905)**  
   *Open* – Adds a missing pointer to the PR template, helping contributors avoid template‑violation auto‑closes.

8. **[#38903 – feat(plugin): route ChatGPT OAuth inference via codexApiEndpoint option](https://github.com/anomalyco/opencode/pull/38903)**  
   *Open* – Allows customizing the ChatGPT OAuth inference endpoint, useful for proxy setups.

9. **[#37679 – fix(core): drop undefined metadata values from permission requests](https://github.com/anomalyco/opencode/pull/37679)**  
   *Open* – Pending `glob` and `grep` permissions with missing optional inputs no longer store `"undefined"` as strings.

10. **[#36550 – fix(tui): resolve keyboard deadlock in question mode](https://github.com/anomalyco/opencode/pull/36550)**  
    *Open* – Fixes two conflicting `useBindings` calls that could freeze TUI keyboard input when editing questions.

## Feature Request Trends

Several themes emerged from the latest issues and PRs:

- **Session / timeline navigation** – Users want a `/tree` command to visually navigate forked sessions (#22067, 31 👍) and persistent scroll positions in the timeline (PR #33943).
- **Timestamps and compact UI** – Multiple requests for adding seconds to message timestamps (#20406) and collapsible reasoning summaries (#15257, 8 👍). Also a request for a compact button in the Web UI (#29286).
- **Multi‑account / provider management** – A strong desire for multi‑account OpenAI support with an account pool and interactive picker (#23620, 10 👍).
- **Skill and workflow improvements** – Inline skill invocation via `$skill` syntax (#24587, 6 👍), dynamic workflows from the TUI (PR #29789), and a directory parameter for monorepo subagent dispatch (#29271).
- **Security and isolation** – Toggle to disable editor context auto‑attachment for multi‑window isolation (#24270, 7 👍), plus the security PRs for desktop.

## Developer Pain Points

Recurring frustrations in the past 24 hours include:

- **Subagent & billing confusion** – `task()` subagents unexpectedly requiring workspace billing even when all models are external (#28362). Also unclear error handling when subagent results are empty (#24447).
- **Desktop & platform‑specific bugs** – Fedora RPM updater not installing (#23538), Windows sidecar crashes with popular plugins (#27723), and the TUI scroll‑after‑session issue (#29221).
- **Model/provider compatibility** – Kimi‑k2.6 tool call failures via the Go bridge (#26331), Anthropic provider returning `ProviderModelNotFoundError` for subagents (#29218), DeepSeek V4 truncated output in JetBrains (#29488).
- **Startup & stability** – Server memory leaks and file watcher failures on v1.15.10 (#29177), models.dev JSON parse crash when network returns HTML (#29366), and TUI crashes when opening sessions referencing removed subagents (#29350).
- **UI friction** – Inability to paste API keys in the `/connect` window on Windows (#29414), and the TUI startup screen appearing frozen without progress indication (addressed in PR #38906).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-07-26

A quiet but impactful day: one nightly release, a surge of workspace-scoped Web Shell work, and critical fixes for sandbox runtime selection and skill auto‑complete. The community continues to push for better multi‑workspace support, performance (cold‑start lazy loading), and richer Web Shell (Git, transcript viewer, voice controls).

---

## Releases

**v0.21.0‑nightly.20260726.9d19eafa9**  
Two small changes:  
- `fix(cli):` measure insight days and hours in local time everywhere (#7670)  
- `refactor(autofix):` ext (truncated release notes)  

*No stable release today.*

---

## Hot Issues

**1. [RFC: Support multiple workspaces in one `qwen serve` daemon](https://github.com/QwenLM/qwen-code/issues/6378)** (#6378, P2)  
30 comments over 20 days. The proposal would allow a single daemon to serve multiple workspaces, preserving backward compatibility. Active community discussion on architecture trade‑offs.

**2. [Cold‑start follow‑ups: remaining lazy‑loading candidates](https://github.com/QwenLM/qwen-code/issues/7264)** (#7264, P2)  
Follow‑up to an esbuild audit that found 17.24 MiB of eagerly loaded modules. Tracked in the PR #7686 (merged today). Performance‑critical for users launching Qwen Code regularly.

**3. [Sandbox runtime selected on PATH presence alone](https://github.com/QwenLM/qwen-code/issues/7732)** (#7732, P2)  
A reproducible frustration: Docker Desktop being installed but not running makes `getSandboxCommand()` prefer it over a working Podman. A fix PR (#7734) was opened the same day.

**4. [Skill auto‑complete broken when mentioning multiple skills](https://github.com/QwenLM/qwen-code/issues/7717)** (#7717, P2)  
Only the first `/skill` gets auto‑completed. PR #7720 addresses this by fixing the completion hook’s state machine.

**5. [IME candidate window far from cursor in Command‑mode with multi‑line statusline](https://github.com/QwenLM/qwen-code/issues/7684)** (#7684, P2, macOS)  
Input method popup renders far from the actual cursor position when the status line spans multiple lines. High impact for Chinese‑language users.

**6. [Qwen Code VS Code extension cannot connect to Unity MCP (Claude Code can)](https://github.com/QwenLM/qwen-code/issues/7697)** (#7697, P3)  
MCP connectivity differs between VS Code and Claude Code. Suggests missing or different plugin initialization in the VS Code extension.

**7. [Add safe read‑only transcript viewer for Web Shell](https://github.com/QwenLM/qwen-code/issues/6770)** (#6770, P2)  
Long‑standing feature request for untrusted secondary workspaces to view persisted transcripts without write access. Gaining traction alongside multi‑workspace proposals.

**8. [Pinned/ memory directory – read‑only files protected from `//dream` consolidation](https://github.com/QwenLM/qwen-code/issues/6801)** (#6801, P2)  
Users want a way to keep critical memory files safe during automated consolidation. PR #7714 implements the protection gate.

**9. [CLI does not display token usage or usage percentage](https://github.com/QwenLM/qwen-code/issues/7719)** (#7719, P3)  
Users have no visibility into consumed tokens or remaining quota. P3 priority but high upvote potential; multiple comments requesting a `/stats` enhancement.

**10. [Define an explicit, source‑preserving math authoring contract](https://github.com/QwenLM/qwen-code/issues/7700)** (#7700, P3, need‑discussion)  
Proposal to prefer explicit portable math syntax (`$...$`) over current heuristics. Follow‑up to PR #3680 that introduced terminal math rendering. Closed PR #7699 addressed inline math recognition inconsistencies.

---

## Key PR Progress

**1. [fix: probe sandbox runtime before selecting it](https://github.com/QwenLM/qwen-code/pull/7734)** (#7734)  
Replaces PATH‑based detection with an actual `version` probe. Prevents Docker Desktop toast from breaking Podman users. High impact for container‑based workflows.

**2. [feat(web‑shell): add git branch picker, commit dialog, and create PR flow](https://github.com/QwenLM/qwen-code/pull/7731)** (#7731)  
IntelliJ‑style branch picker, check out / create / delete branches, commit with staged/unstaged view, and a PR creation dialog. Major UX upgrade for Web Shell.

**3. [fix(cli): complete repeated skill slash commands](https://github.com/QwenLM/qwen-code/pull/7720)** (#7720)  
Restores auto‑complete for `//skill1 /skill2` both inline and multiline. Distinguishes line‑start slash commands from model‑inline mentions.

**4. [perf(core): lazy‑load first‑use dependencies](https://github.com/QwenLM/qwen-code/pull/7686)** (#7686, **merged**)  
Implements the remaining candidates from #7264. Reduces cold‑start eager import size. Already merged into main.

**5. [feat(triage): add sandboxed /verify deep‑verification lane](https://github.com/QwenLM/qwen-code/pull/7710)** (#7710)  
On‑demand deep verification for PRs: A/B load‑bearing proof, vacuity checks on new tests, mock‑free wire‑oracle runs. Moves triage toward maintainer‑grade evidence.

**6. [feat(review): redefine medium effort as a balanced verified pass](https://github.com/QwenLM/qwen-code/pull/7733)** (#7733)  
`--effort medium` was a thin inline pass; now runs a balanced verified pass with build, test, and code insight steps. Closes the gap between low and high effort.

**7. [feat(review): borrow maintainer review lenses into the agent briefs](https://github.com/QwenLM/qwen-code/pull/7736)** (#7736)  
Four manual review disciplines (security, correctness, maintainability, performance) wired into the CLI‑generated agent briefs. No new code, only prompt changes.

**8. [fix(ci): deflake tool‑control E2E and add autofix flake detection](https://github.com/QwenLM/qwen-code/pull/7725)** (#7725)  
Migrates five flaky E2E tests to fake‑openai‑server, making them deterministic. Also adds a flake‑detection pre‑check to the autofix workflow.

**9. [feat(memory): protect pinned files during forked Dream](https://github.com/QwenLM/qwen-code/pull/7714)** (#7714)  
Implements an opt‑in permission gate that denies write/edit to paths under `pinned/`. Consolidation workers skip pinned files while preserving recursive indexing.

**10. [feat(core): add model grade selection for subagent spawn](https://github.com/QwenLM/qwen-code/pull/7702)** (#7702)  
Allows AI to select a model grade (small/medium/high/super) for spawned subagents, mapped in `settings.json`. Enables cost‑aware subagent routing.

---

## Feature Request Trends

1. **Multi‑workspace architecture** – RFC #6378, Web Shell scoping (#6972, #6974, #6770) and secondary workspaces dominate. The project is clearly moving from single‑tenant to multi‑tenant daemon model.  
2. **Performance & cold‑start** – Remaining lazy‑loading (#7264), eager import audit, and the merged PR #7686 show sustained investment in startup time.  
3. **Memory & knowledge management** – Pinned/protected memory (#6801), direct external context provider (#7585), and transcript viewers (#6770) signal a desire for more structured, durable, and user‑controlled memory.  
4. **Web Shell as a full IDE** – Git operations (#7731), channel management (#7728), voice controls (#6972), and settings/MCP scoping (#6974) are turning Web Shell into a powerful in‑browser development environment.  
5. **Token / cost visibility** – Multiple feature requests (#4252, #7719) ask for TPS, TTFT, and token consumption in `/stats` or status bar.  

---

## Developer Pain Points

- **Sandbox runtime selection fragility** – PATH‑based detection leads to unusable Docker Desktop being preferred over working Podman (#7732 → #7734).  
- **Skill auto‑complete regression** – Repeated slash commands break after recent updates, disrupting users who rely on `/skill` chains (#7717 → #7720).  
- **CLI display inconsistencies** – Input method popup misplacement on macOS (#7684), terminal scrolling off‑by‑one (#7713), missing token usage (#7719).  
- **MCP / bridge connectivity** – Unity MCP works in Claude Code but not in Qwen Code VS Code extension (#7697); OAuth callback port assumption (#7503).  
- **Hardcoded rate‑limit retry delays** – 60/120/240s fixed in `geminiChat.ts`, not configurable (#7658).  
- **CI flakiness** – Tool‑control E2E tests flaky on real model calls (#7725); main CI failures reported by bot (#7712).  
- **Extension subagent mutability** – `updateSubagent()` can modify extension‑provided read‑only agents (#7242).

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar).*