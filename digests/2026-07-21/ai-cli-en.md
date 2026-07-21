# AI CLI Tools Community Digest 2026-07-21

> Generated: 2026-07-21 03:21 UTC | Tools covered: 7

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

# Cross-Tool AI CLI Ecosystem Comparison Report

**Date:** 2026-07-21  
**Prepared by:** Senior Technical Analyst, AI Developer Tools

---

## 1. Ecosystem Overview

The AI CLI tool landscape on July 21, 2026 shows a market in active, uneven maturation. **Claude Code** remains the most feature-rich and community-voluminous tool but is struggling with a backlog of unresolved regressions—most critically a nine-month-old permissions bug and unbounded sub-agent token consumption. **OpenAI Codex** is iterating rapidly on its Rust-based CLI (three alpha releases today) while wrestling with platform-specific stability on Windows and a tense trade-off between encryption and audit transparency. **Gemini CLI** is undergoing a significant security hardening cycle, with two RCE-related PRs merged alongside fixes for agent hangs—signaling a shift from feature velocity to reliability. **GitHub Copilot CLI** shipped conservative patch fixes for sub-agent hangs and keyboard shortcuts, maintaining a narrower scope as a lightweight shell assistant. **Kimi Code CLI** shows minimal activity, suggesting either stability or a paused development cycle. **OpenCode** and **Qwen Code** demonstrate the strongest Chinese-ecosystem momentum, with OpenCode shipping adaptive thinking support and Qwen Code focused on autofix pipeline robustness. Across all tools, community feedback converges on shared pain points: sub-agent control, context window management, MCP reliability, and cross-platform parity.

---

## 2. Activity Comparison

| Tool | Notable Issues (24h) | Active PRs (24h) | Release Status |
|---|---|---|---|
| **Claude Code** | 10 (high engagement, 689👍 on #826) | 10 (PR Activity moderate) | ✅ v2.1.216 patch released |
| **OpenAI Codex** | 10 (99👍 on #28058) | 10 (all merged by copyberry[bot]) | ✅ 3 Rust alpha releases |
| **Gemini CLI** | 10 | 10 (2 SECURITY, 1 FEAT, 6 FIX) | ✅ Nightly build |
| **Copilot CLI** | 10 (1 closed) | 0 updated today | ✅ v1.0.73, v1.0.72 patches |
| **Kimi Code CLI** | 5 (low volume) | 3 (contributed by community) | ❌ No release today |
| **OpenCode** | 10 (50 total updated) | 10 (50 total updated) | ✅ v1.18.4 released |
| **Qwen Code** | 10 | 10 | ✅ v0.20.0-nightly released |

**Key observation:** Claude Code and OpenAI Codex dominate raw engagement volume. OpenCode and Qwen Code show the highest PR throughput. Gemini CLI's security-focused PRs signal a strategic pivot. Kimi Code is notably quiet.

---

## 3. Shared Feature Directions

### A. Subagent Governance & Cost Control
*Demand emerging across **Claude Code**, **Codex**, **Gemini CLI**, **Copilot CLI**, **OpenCode**, **Qwen Code***
- Recursive/unbounded sub-agent spawning (#68110 in Claude Code, #12491 zombie leak in Codex)
- Configurable reasoning effort and depth limits (#43083 in Claude Code, #22323 false success reporting in Gemini CLI)
- Token budget management and audit trails (#28058 encryption breaking observability in Codex)
- Per-tool execution timeouts (#36869 in OpenCode)

### B. Context Window & Compaction Customization
*Requested in **Claude Code**, **Codex**, **Copilot CLI**, **OpenCode**, **Kimi Code***
- Automatic compaction thresholds (#1688 in Copilot CLI, #28611 after-compaction hooks in OpenCode)
- 5MB CAPI body limit failures (#4183 in Copilot CLI)
- Post-compaction context corruption (#2523 in Kimi Code, #19267 infinite compaction in OpenCode)
- Quadratic message normalization fix (#216 in Claude Code — now fixed)

### C. Security / Permissions / Sandboxing
*Active in **Claude Code**, **Codex**, **Gemini CLI**, **Copilot CLI**, **Qwen Code***
- `bypassPermissions` broken for 9 months (#39523 in Claude Code) — worst offender
- RCE prevention (#28470, #28319 in Gemini CLI — merged today)
- Windows sandboxing support (#34423 in Codex)
- BYOK API fragility (#4196 in Copilot CLI)
- Permission profiles per environment (#34398 in Codex)

### D. MCP Tool Ecosystem Maturity
*Pain point across **Claude Code**, **Codex**, **Gemini CLI**, **OpenCode**, **Qwen Code***
- MCP server discovery timeouts (>128 tools crash, #24246 in Gemini CLI)
- MCP prompt listing regressions (#28579 in OpenCode)
- Tool/resource listing stalls (#7147 in Qwen Code)
- MCP tool resolution in subagents (#79621 in Claude Code)

### E. Windows / WSL Cross-Platform Parity
*Disproportionately problematic for **Codex**, **Copilot CLI**, **Kimi Code**, **OpenCode***
- UI stuttering and freezes (#20214 in Codex, 60 comments)
- Clipboard failures (#3622 in Copilot CLI)
- Path mapping corruption (#28094 in Codex)
- TUI initialization failures on ARM64 (#19130 in OpenCode)
- Session migration gaps (#2522 in Kimi Code)

### F. Session & State Portability
*Requested in **Claude Code**, **Codex**, **Gemini CLI**, **Kimi Code**, **OpenCode***
- Multi-account profile switching (#18435 in Claude Code, 668👍)
- Session persistence after sleep/resume (#17769 in OpenCode)
- Symlinked agent file recognition (#20079 in Gemini CLI)
- Session data migration (~/.kimi-code to ~/.kimi, #2522 in Kimi Code)

---

## 4. Differentiation Analysis

| Dimension | Claude Code | OpenAI Codex | Gemini CLI | Copilot CLI | OpenCode | Qwen Code |
|---|---|---|---|---|---|---|
| **Feature Focus** | Workflow composition (skills, subagents, hooks) | Multi-agent transparency, sandboxing, proxy management | Security hardening, A2A server architecture | Lightweight shell assistant, GitHub integration | Multi-provider flexibility, TUI+Web dual UI | Autofix pipeline, thinking model support |
| **Target User** | Power developers building complex CI workflows | Enterprise/security-conscious teams | Google Cloud ecosystem developers | GitHub-centric individual developers | Chinese-ecosystem & multi-provider users | Qwen/AliCloud ecosystem, CI-heavy teams |
| **Technical Approach** | Heavy sub-agent orchestration, MCP-first | Rust-based CLI, encryption-first, multi-architecture | Workflow-level security enforcement, A2A protocol | Minimalist, low-ceremony, GitHub-native | Bun/Node.js, async-first, Nix support | TokenPlan auth, DashScope integration |
| **Community Health** | Largest but frustrated (9-month unaddressed bugs) | Active but dominated by bot merges | Growing with security focus | Stable, smaller, conservative | Very active (50 issues/day), Chinese-heavy | Active with nightly CI cadence |
| **Differentiator** | Richest hook/skill ecosystem | Strongest multi-agent audit/encryption | Fastest security hardening velocity | Lowest complexity / fastest setup | Widest provider compatibility (Kimi, Anthropic, OpenAI) | Deepest autofix/CI integration |
| **Biggest Risk** | Permission system broken for 9 months | Windows stability eroding trust | Agent hangs stall core workflows | Plan-mode regression blocks power users | Long-running task reliability regression | Thinking flag conflicts blocking model support |

---

## 5. Community Momentum & Maturity

**High Momentum (Rapid iteration, high engagement):**
- **OpenCode** — 100 total issues+PRs updated in 24h, v1.18.4 shipped, highest community contribution rate among non-OpenAI/Anthropic tools. Growing Chinese-ecosystem leadership.
- **Claude Code** — Despite unresolved regressions (#39523, #68110), community engagement remains massive (689👍 on scroll bug). Maturity shows in deep workflow feature set but risks user erosion if core bugs persist.
- **Qwen Code** — Nightly release cadence, multiple autofix improvements merged, P1 bugs fixed within 24h (#7332→#7333). Strong CI-focused development velocity.

**Moderate Momentum (Steady development):**
- **OpenAI Codex** — High issue volume (99👍 on #28058) but PRs are overwhelmingly bot-automated (copyberry[bot]). Developer momentum is real but reactive; strategic focus on sandboxing and proxy management.
- **Gemini CLI** — Security pivot is decisive (2 critical PRs merged today) but agent reliability issues (#21409, #25166) remain unresolved. Maturity is increasing but feature breadth trails Claude Code.

**Lower Momentum (Conservative or paused):**
- **Copilot CLI** — Small patch releases, no PRs today, simple scope. Stable but not stretching.
- **Kimi Code** — Only 5 issues and 3 PRs in 24h, no release. Either stable or stalled — insufficient data to determine which.

---

## 6. Trend Signals for Developers

**1. Subagent Governance is the defining unsolved problem.**  
Every major tool has reports of unbounded fan-out, false success reporting, token waste, and zombie processes. Developers should prioritize tools that offer depth limits, reasoning effort controls, and budget enforcement—or build their own wrappers.

**2. Context management is moving from "automatic" to "configurable."**  
Compaction thresholds, post-compaction hooks, and manual control over what survives context are being demanded across Claude Code, Copilot CLI, and OpenCode. Expect tool vendors to expose more levers in Q3-Q4 2026.

**3. Security vs. observability tension is intensifying.**  
Codex's encrypted audit trail regression (#28058, 99👍) is a canary: encryption without opt-in transparency destroys developer trust. Tools that offer granular audit visibility (while encrypted at rest) will win enterprise adoption.

**4. Windows/WSL remains the weakest platform across the board.**  
Windows-specific issues dominate Codex, Copilot CLI, Kimi Code, and OpenCode trackers. Any team with significant Windows developer presence should budget for platform-specific friction and advocate loudly for parity.

**5. MCP ecosystem is outgrowing tool implementations.**  
All tools struggle with MCP server discovery timeouts, prompt listing regressions, and configuration limits. The MCP ecosystem is maturing faster than individual CLI tools can support—expect standard proposals for tool registration, timeout configuration, and resource discovery.

**6. "Plan mode" backlash is brewing.**  
Copilot CLI and Qwen Code both report regressions where plan mode blocks legitimate read-only shell commands. The pendulum may swing back from restrictive plan-first paradigms toward more fluid agent autonomy—or toward clearly documented classification rules.

**7. Chinese-ecosystem tools are closing the gap.**  
OpenCode and Qwen Code show equivalent or superior velocity to Western counterparts, especially in autofix pipelines, multi-provider support, and community contributions. Developers building for global audiences should monitor these tools for innovation that may cross-pollinate.

---

*Report generated from community digest data dated 2026-07-21. Metrics reflect issues and PRs updated in the preceding 24 hours.*

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report
**Data Snapshot:** 2026-07-21 | **Source:** github.com/anthropics/skills

---

## 1. Top Skills Ranking

The following are the most-discussed Skill submissions (PRs) based on sustained community attention, depth of technical discussion, and downstream impact.

**#1 — `fix(skill-creator): run_eval.py always reports 0% recall`** ([PR #1298](https://github.com/anthropics/skills/pull/1298))
- **Functionality:** Fixes the skill optimizer's evaluation pipeline — the core toolchain that authors use to tune skill descriptions. Patches four root causes: eval artifact installation, Windows stream I/O, trigger detection logic, and parallel worker coordination.
- **Discussion Highlights:** Ties together 10+ independent reproductions of the same bug across Issues #556, #1169, and #1061. The fix effectively unblocks the entire skill-creation workflow for Windows users and restores recall-based optimization.
- **Status:** Open | Author: MartinCajiao | Created: 2026-06-10

**#2 — `Add document-typography skill`** ([PR #514](https://github.com/anthropics/skills/pull/514))
- **Functionality:** A quality-control skill that prevents orphan word wrap, widow paragraphs, and numbering misalignment in AI-generated documents. Addresses a universal pain point across all document types Claude produces.
- **Discussion Highlights:** Community resonated with the "invisible" quality issue — users rarely request typographic fixes, but poor typography degrades perceived output quality. PR generated significant conversation around scope boundaries and when the skill should auto-apply vs. require invocation.
- **Status:** Open | Author: PGTBoos | Created: 2026-03-04

**#3 — `Add skill-quality-analyzer and skill-security-analyzer`** ([PR #83](https://github.com/anthropics/skills/pull/83))
- **Functionality:** Two meta-skills for evaluating other skills. The quality analyzer scores across five dimensions (Structure & Documentation, Instruction Clarity, Robustness, Coverage, Security Best Practices). The security analyzer audits skills for trust boundary violations, unsafe tool usage, and prompt injection risks.
- **Discussion Highlights:** Early mover in the "skill governance" space. Discussion focused on whether meta-analysis skills should be official Anthropic tooling or community-maintained. Sparked Issue #492 on namespace trust boundaries.
- **Status:** Open | Author: eovidiu | Created: 2025-11-06

**#4 — `Add ODT skill — OpenDocument text creation and template filling`** ([PR #486](https://github.com/anthropics/skills/pull/486))
- **Functionality:** Full OpenDocument Format support (.odt, .ods) for LibreOffice ecosystems — document creation, template filling, and ODT-to-HTML conversion. Targets enterprise and European government users where ODF is mandatory.
- **Discussion Highlights:** The longest-running open PR with sustained interest. Community contributors expanded the original scope to include .ods (spreadsheet) support. Discussion revealed that ODF support was a blocker for several enterprise deployments.
- **Status:** Open | Author: GitHubNewbie0 | Created: 2026-03-01

**#5 — `Improve frontend-design skill clarity and actionability`** ([PR #210](https://github.com/anthropics/skills/pull/210))
- **Functionality:** A thorough revision of the frontend-design skill to ensure every instruction is precise, executable within a single conversation, and specific enough to steer Claude's design decisions without over-constraining creativity.
- **Discussion Highlights:** Exemplar PR for skill quality standards. Community debate centered on how much design specificity belongs in a skill vs. leaving creative freedom to the model. Established patterns for skill refactoring that later PRs referenced.
- **Status:** Open | Author: justinwetch | Created: 2026-01-05

**#6 — `fix(docx): prevent tracked change w:id collision`** ([PR #541](https://github.com/anthropics/skills/pull/541))
- **Functionality:** Fixes document corruption in the DOCX skill when tracked changes conflict with existing bookmarks’ `w:id` IDs. The root cause was hardcoded low IDs that collided with common document structures.
- **Discussion Highlights:** Revealed nuanced OOXML specification requirements. The fix required understanding the shared ID space across bookmarks, tracked changes, comments, and move ranges. Considered a critical reliability fix for enterprise document workflows.
- **Status:** Open | Author: Lubrsy706 | Created: 2026-03-06

---

## 2. Community Demand Trends

From the most active Issues, the community's top anticipated Skill directions:

| Trend | Evidence | Signal Strength |
|---|---|---|
| **Security & Trust Boundaries** | Issue #492 (43 comments) — community skills under `anthropic/` namespace impersonate official skills. Rising concern about permission escalation. | 🔴 Critical |
| **Org-wide Skill Distribution** | Issue #228 (14 comments) — users cannot share skills within organizations. Need for shared libraries and direct installation links. | 🟠 High |
| **Multi-platform Compatibility** | Issues #556, #1061, #1169 (cumulative 18+ comments) — run_eval and skill-creator tooling is unusable on Windows. Three separate bug reports with identical symptoms. | 🟠 High |
| **Skill Lifecycle Management** | Issue #62 (10 comments) — skills disappear from Claude without warning after file renames. Users need persistent skill storage and recovery. | 🟡 Medium |
| **MCP Integration** | Issue #16 (4 comments) — community wants Skills exposed as MCPs for programmatic invocation and cross-tool interoperability. | 🟢 Emerging |
| **Governance & Audit** | Issues #412, #1385 — proposal for agent governance safety patterns and a reasoning quality gate pipeline. Growing interest in AI output verification before delivery. | 🟢 Emerging |

**Key Insight:** The most urgent demand is not for new Skill content, but for **tooling reliability and trust infrastructure** — fixing the evaluation pipeline, securing the namespace, and enabling organizational sharing.

---

## 3. High-Potential Pending Skills

These open PRs have active discussion threads, represent clear community need, and are likely to land in the near term:

- **`feat(skills): add self-audit — mechanical verification + reasoning quality gate`** ([PR #1367](https://github.com/anthropics/skills/pull/1367)) — Author: YuhaoLin2005. A comprehensive output auditing skill that verifies file existence, then runs a four-dimension reasoning audit in damage-severity priority order. Universal across projects and tech stacks. Most recent high-effort PR. *Status: Open (2026-06-28)*

- **`fix(skill-creator): Windows subprocess + encoding bugs`** ([PR #1050](https://github.com/anthropics/skills/pull/1050)) & ([PR #1099](https://github.com/anthropics/skills/pull/1099)) — Two independent fixes for the same core issue: `subprocess.Popen` fails on Windows because `claude.cmd` isn't resolved via `PATHEXT`, and cp1252 encoding breaks multi-byte reads. Combined, these unblock all Windows skill authors. *Status: Open (2026-04-27)*

- **`Add testing-patterns skill`** ([PR #723](https://github.com/anthropics/skills/pull/723)) — Author: 4444J99. Comprehensive testing coverage including the Testing Trophy model, AAA pattern, React Testing Library strategies, and E2E with Playwright. Addresses a gap in the skills collection for quality engineering workflows. *Status: Open (2026-03-22)*

- **`fix(skill-creator): run_eval trigger detection misses real skill name`** ([PR #1323](https://github.com/anthropics/skills/pull/1323)) — Author: Polluelo978. Patches the trigger-matching logic that fails to detect actual skill invocations, causing 0% recall across all candidates. Complements PR #1298's broader run_eval fix. *Status: Open (2026-06-16)*

- **`Add Pyxel skill for retro game development`** ([PR #525](https://github.com/anthropics/skills/pull/525)) — Author: kitao. Skill wrapping the Pyxel MCP server for retro/pixel-art game creation with Python. Iterative workflow: write → run_and_capture → inspect → refine. Niche but with a dedicated community following. *Status: Open (2026-03-05)*

---

## 4. Skills Ecosystem Insight

**The community's most concentrated demand is not for new Skill domains, but for reliable tooling infrastructure — fixing the skill evaluation pipeline that governs description optimization, establishing trust boundaries and security auditing, and enabling organizational distribution — with the self-audit/reasoning quality gate emerging as the next frontier in skill-based output governance.**

---

# Claude Code Community Digest — 2026-07-21

**Today's Highlights**  
A new patch release (v2.1.216) addresses a long-standing performance regression in long sessions with a quadratic message normalization fix. The community continues to escalate two major pain points: the **bypass permissions** mode remains broken after nine months (#39523), and the **recursive sub-agent** fan-out bug (#68110) is causing unexpected token burn. A wave of reports around the `code-review` skill and MCP tool resolution suggest recent changes have introduced regressions in workflow composition.

---

## Releases

**v2.1.216** – [View release](https://github.com/anthropics/claude-code/releases/tag/v2.1.216)  
- Added `sandbox.filesystem.disabled` setting to skip filesystem isolation while keeping network egress control.  
- Fixed a performance bug where message normalization cost grew **quadratically** with the number of turns, causing multi-second stalls and slow session resumes.  
- Changelog entry cut off; further details pending.

---

## Hot Issues (10 Noteworthy)

1. [#826 – Console scrolling to top when Claude adds text](https://github.com/anthropics/claude-code/issues/826)  
   *353 comments, 689 👍* – A persistent macOS/iTerm2 bug where the terminal scrolls to the top of history on new output. Open for 15 months; high community frustration.

2. [#18435 – Multiple Claude account profile switching in Desktop](https://github.com/anthropics/claude-code/issues/18435)  
   *149 comments, 668 👍* – The most-upvoted feature request: manage multiple accounts (personal/work) with easy switching. No movement from team.

3. [#73365 – Advisor always "unavailable" with Fable 5 (Opus 4.8)](https://github.com/anthropics/claude-code/issues/73365)  
   *85 comments, 159 👍* – Advisor broken on Windows across all sessions since v2.1.198. Big impact on users relying on the advisor model.

4. [#39523 – Bypass permissions mode "fundamentally broken"](https://github.com/anthropics/claude-code/issues/39523)  
   *32 comments, 18 👍* – Meta-issue tracking 12+ duplicates over 9 months. `bypassPermissions` simply does not work; official docs suggest workarounds that also fail.

5. [#43083 – Configurable reasoning effort for subagents](https://github.com/anthropics/claude-code/issues/43083)  
   *19 comments, 42 👍* – Request to set `reasoning_effort` (low/medium/high) when dispatching subagents, not just `model`. Desired for cost/quality control.

6. [#68110 – Sub-agents recursively spawn unbounded children](https://github.com/anthropics/claude-code/issues/68110)  
   *12 comments, 10 👍* – A `general-purpose` sub-agent with access to the Agent tool can create an exponential fan-out tree, burning tokens with no depth limit. High urgency.

7. [#61021 – Text selection broken in VS Code terminal](https://github.com/anthropics/claude-code/issues/61021)  
   *12 comments, 8 👍* – Recent change made it impossible to copy text from VS Code terminal when Claude Code is running. Affects many Windows users.

8. [#64592 – Cowork VM service fails to start on Windows 11](https://github.com/anthropics/claude-code/issues/64592)  
   *12 comments* – Fresh reproduction; all built-in recovery fails. Workaround: manually enable Windows Virtual Machine Platform. Several related closed issues.

9. [#79023 – Agent cannot invoke `/code-review` skill from custom skills (v2.1.215)](https://github.com/anthropics/claude-code/issues/79023)  
   *6 comments, 10 👍* – Regression: custom skills that call `/code-review` now break. Blocks CI PR workflows that rely on skill composition.

10. [#79622 – Sandbox settings reference omits `sandbox.filesystem.disabled`](https://github.com/anthropics/claude-code/issues/79622)  
    *1 comment* – Documentation gap for today’s new setting. Important for users who want filesystem access but keep network restrictions.

---

## Key PR Progress (10)

1. [#79620 – TTS read-aloud hook for accessibility](https://github.com/anthropics/claude-code/pull/79620)  
   Implements a production-ready text-to-speech hook (Piper/`say`/PowerShell) with markdown stripping and code-skip heuristic. Addresses #79542.

2. [#79636 – Fix `hookify.` prefix in example rule filenames](https://github.com/anthropics/claude-code/pull/79636)  
   Corrects shipped examples to match the required `hookify.` prefix, fixing a file-discovery bug. Closes #79143.

3. [#79635 – Fix Contributing section in PR Review Toolkit readme](https://github.com/anthropics/claude-code/pull/79635)  
   Points users to the in-repo `agents/` directory instead of a private internal repo. Closes #79137.

4. [#79387 – Add error message when `edit-issue-labels.sh` called without args](https://github.com/anthropics/claude-code/pull/79387)  
   Tiny UX fix – script now prints a clear stderr message instead of silent exit.

5. [#79385 – Honor any user's thumbs-down on auto-close bot, not just author](https://github.com/anthropics/claude-code/pull/79385)  
   Fixes bot promise vs. implementation mismatch; any user 👎 will prevent auto-close.

6. [#66650 – Use full author name in PR Review Toolkit manifest](https://github.com/anthropics/claude-code/pull/66650)  
   Consistency fix: changes "Daisy" to "Daisy Hollman" across bundled plugins. *Closed, merged.*

7. [#74722 – Support conventional branch naming in `/commit-push-pr`](https://github.com/anthropics/claude-code/pull/74722)  
   Adds optional `conventional` argument to name branches as `type/description` inferred from diff.

8. [#78532 – Fix GCP gateway Terraform: PG16 edition and optional ALB](https://github.com/anthropics/claude-code/pull/78532)  
   Fixes Cloud SQL deployment failure on PG16+ (defaults to ENTERPRISE_PLUS) and adds optional internal ALB.

9. [#1 – Create SECURITY.md](https://github.com/anthropics/claude-code/pull/1)  
   The very first PR to the repo, adding a security policy. *Closed, merged.*

---

## Feature Request Trends

- **Account & identity management** (#18435, 668👍) – Desktop app profile switching for multiple Claude accounts is the single most-demanded feature.
- **Subagent control** (#43083, #68110) – Users want configurable reasoning effort, depth limits, and better cost management for subagents.
- **Accessibility & hands-free** (#79542, #79620) – Built-in TTS read-aloud is gaining traction; a community PR is already submitted.
- **Remote control / proxy flexibility** (#76653, 9👍) – Loopback proxy support blocked by `ANTHROPIC_BASE_URL` restriction for non-Anthropic hosts.
- **Skill composition** (#79023, #79560) – Users need built-in skills like `code-review` to be invocable from custom skills for automated workflows.

---

## Developer Pain Points

- **Permissions system broken** – `bypassPermissions` has been non-functional since July 2025 (#39523). No resolution despite 12+ duplicates.
- **Recursive sub-agent explosions** – `general-purpose` agents can spawn infinitely (#68110), wasting tokens and stalling sessions.
- **Advisor reliability** – Advisor model is consistently "unavailable" on Windows (#73365). Affects many users.
- **Copy/paste in VS Code terminal** – Broken for several weeks (#61021); basic usability issue.
- **Cowork VM service on Windows** – Persistent startup failure requiring manual workaround (#64592).
- **MCP tool resolution in subagents** – Background subagents cannot resolve MCP tools (#79621) and orphaned browser processes accumulate (#78551).
- **Code-review skill regression** – Recent changes broke skill-to-skill invocation (#79023, #79560), breaking CI pipelines.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-07-21

---

## Today's Highlights

The Codex team shipped three new Rust alpha releases (0.145.0-alpha.25 through .28) while the community continues to wrestle with persistent bugs in conversation context handling, Windows performance, and multi-agent session management. A hot issue on Codex replying to earlier messages (Issue #8648) has generated 82 comments and 58 reactions, and a regression in encrypted multi-agent audit trails (Issue #28058) has earned 99 upvotes, signaling strong developer demand for reliable agent transparency. On the PR front, the copyberry bot landed a dozen merges focused on proxy resolution, permission profiles, and sandboxing improvements.

---

## Releases

Three new Rust alpha builds were published today, all with the same generic changelog:

- **[rust-v0.145.0-alpha.25](https://openai/codex/releases/tag/rust-v0.145.0-alpha.25)** — Release 0.145.0-alpha.25
- **[rust-v0.145.0-alpha.27](https://openai/codex/releases/tag/rust-v0.145.0-alpha.27)** — Release 0.145.0-alpha.27
- **[rust-v0.145.0-alpha.28](https://openai/codex/releases/tag/rust-v0.145.0-alpha.28)** — Release 0.145.0-alpha.28

No detailed release notes were provided; these appear to be continuous integration or hotfix iterations on the Rust-based Codex CLI components.

---

## Hot Issues

### 1. [#8648 — Codex replies to earlier messages instead of latest one](https://openai/codex/issue/8648)
*82 comments, 58 👍*
A long-standing bug (opened January 2026) where the assistant responds to an earlier message in multi-turn conversations. The issue remains open after seven months, with heavy community engagement suggesting this is a core reliability blocker.

### 2. [#20214 — Windows 11 Pro: app frequently freezes/stutters despite sufficient resources](https://openai/codex/issue/20214)
*60 comments, 68 👍*
Users report persistent UI stuttering on Ryzen-based Windows machines with 32GB RAM. High upvote count indicates a widespread Windows performance problem that has not been resolved since April.

### 3. [#28058 — Regression: encrypted MultiAgentV2 messages remove readable task audit trail](https://openai/codex/issue/28058)
*26 comments, 99 👍*
The highest-voted issue today. A recent encryption change (#26210) made multi-agent message payloads opaque, breaking observability. Developers are demanding that audit trails remain readable even with encryption enabled.

### 4. [#12491 — MCP child processes not reaped after task completion — 1300+ zombies, 37GB leak](https://openai/codex/issue/12491)
*26 comments, 4 👍*
A severe resource leak in the GUI wrapper that leaves zombie processes and consumes tens of gigabytes of memory. Low reaction count but high severity; signals a systemic process management bug in the Codex.app on all platforms.

### 5. [#21753 — Full Claude Code Hook Parity (29+)](https://openai/codex/issue/21753)
*28 comments, 21 👍*
An umbrella tracker requesting complete automation surface parity with Claude Code hooks. Community wants every major lifecycle event exposed as a hook, reflecting demand for deeper scriptability and CI integration.

### 6. [#12862 — CLI: add --worktree and --tmux flags for one-command isolated sessions](https://openai/codex/issue/12862)
*20 comments, 97 👍*
Second-highest voted issue. Users want to spin up isolated git worktrees in tmux with a single command — a workflow many already script manually. Strong signal for ergonomic multi-session tooling.

### 7. [#31836 — Projects Sort By "Last updated" only sorts tasks within groups, not projects](https://openai/codex/issue/31836)
*24 comments, 26 👍*
A UI inconsistency in the desktop app where the sort control is deceptive. Community frustration stems from wasted time re-finding projects.

### 8. [#28094 — Windows/WSL: Desktop rewrites /home paths as C:\home, breaks project associations](https://openai/codex/issue/28094)
*21 comments, 2 👍*
Path mapping regression affecting WSL users. Valid Linux paths get corrupted to Windows-style paths, destroying project-chat associations. A critical bug for the Windows developer subset.

### 9. [#25271 — Computer Use cannot determine Chrome URL on Windows](https://openai/codex/issue/25271)
*20 comments, 8 👍*
The browser automation feature (Computer Use) fails to read the current tab URL in Chrome on Windows. Hinders automated web workflows for Windows-based power users.

### 10. [#25463 — Project threads disappear from UI but remain readable on disk as JSONL](https://openai/codex/issue/25463)
*17 comments, 1 👍*
Conversations vanish from the GUI while the underlying data persists as session files. A silent data-loss bug that undermines trust in the desktop app's project management.

---

## Key PR Progress

### 1. [#34441 — Add buffered code-mode exec yields](https://openai/codex/pull/34441)
*Merged by copyberry[bot]*
Introduces `code_mode_buffered_exec` feature flag. Default `exec` yield time increases from 10s to 30s when enabled, reducing premature model interruptions during long-running code executions.

### 2. [#34451 — Attribute external agent imports by provider](https://openai/codex/pull/34451)
*Merged by copyberry[bot]*
Adds optional `providerId` to external agent import analytics, enabling finer attribution of migration sources without affecting the migration source selector logic.

### 3. [#34449 — Make external session detection limits configurable](https://openai/codex/pull/34449)
*Merged by copyberry[bot]*
Adds `maxSessionAgeDays` and `maxSessions` to external-agent config. Previously hardcoded to 30-day/auto limits; now manageable per deployment.

### 4. [#34447 — Add a route-aware HTTP client pool](https://openai/codex/pull/34447)
*Merged by copyberry[bot]*
Fixes a subtle bug where PAC/proxy resolution could select different routes per request. The new pool ensures correct URL association while reusing transport clients.

### 5. [#34436 — Honor managed permission profiles in network proxy resolution](https://openai/codex/pull/34436)
*Merged by copyberry[bot]*
Ensures that network proxy configuration defined in `requirements.toml` permission profiles is actually applied when that profile is active. Previously ignored.

### 6. [#34435 — Resolve outbound proxy routes explicitly](https://openai/codex/pull/34435)
*Merged by copyberry[bot]*
Makes system proxy discovery non-blocking and deterministic by resolving to explicit environment proxy or direct connection, preventing repeated discovery and inconsistent behavior.

### 7. [#34434 — Support catalog messages for non-request approval policies](https://openai/codex/pull/34434)
*Merged by copyberry[bot]*
Adds model-catalog approval message variants for `never` and `unless_trusted` policies, making approval UI messages consistent with the active policy.

### 8. [#34398 — Support per-environment permission profiles](https://openai/codex/pull/34398)
*Merged by pakrym-oai*
A significant architecture change: each selected environment can now override the thread's `PermissionProfile`. Affects shell, exec, patch, filesystem, approval, and network decisions. Enables fine-grained sandboxing per environment.

### 9. [#34423 — Support Windows sandboxing in the exec server](https://openai/codex/pull/34423)
*Merged by copyberry[bot]*
Adds Windows sandbox backend support for the exec server, using a shared native process launcher that selects between sandbox session, PTY, or pipe-based launch. Critical for Windows security parity.

### 10. [#34416 — Show completed hook warnings in TUI headers](https://openai/codex/pull/34416)
*Merged by copyberry[bot]*
Improves TUI output by rendering the first line of completed hook warnings in the hook header with `says:` format, with remaining lines indented. Better visibility into hook results.

---

## Feature Request Trends

- **Hook/Automation Surface Parity**: The most-requested direction (Issue #21753, 29+ items) is achieving full hook parity with Claude Code, covering every major lifecycle event. Developers want programmable pre/post hooks for CI and custom workflows.
- **One-Command Isolated Sessions**: The `--worktree` + `--tmux` proposal (Issue #12862, 97 👍) reflects a strong desire for ephemeral, isolated agent sessions without manual environment setup.
- **Configurable Timeouts & Behavior**: Multiple issues (#34455, #34431) ask for tunable timeouts on `request_user_input`, exec yields, and session detection limits. Power users want to escape hardcoded defaults.
- **Bidirectional ChatGPT-Codex Handoff**: Issue #32519 proposes shared project context between ChatGPT (mobile) and Codex (desktop), allowing seamless task handoff from ideation to execution.
- **Better Windows Cross-Platform Support**: Windows-specific issues dominate the bug tracker; the community is requesting native WSL integration, proper path handling, and sandboxing parity with macOS/Linux.

---

## Developer Pain Points

- **Context Compaction Loops & Token Waste**: Issue #26656 reports that context compaction re-compacts already compacted contexts, consuming tokens in a loop. This is a high-frequency frustration among plugin users on Windows.
- **Windows Performance & Stability**: Multiple issues (#20214, #34025, #34351) describe freezes, taskkill.exe storms, and flickering on Windows 11, even on high-spec machines. The community is losing patience with platform-specific regressions.
- **Agent Audit Trail Opacity**: The encryption regression (Issue #28058, 99 👍) highlights a fundamental tension between security and observability. Developers need to inspect what agents did, even in encrypted sessions.
- **Session/Thread Data Loss**: Issues #25463, #28276, #31836 reveal that threads and projects silently disappear, fail to archive, or cannot be sorted properly. Trust in the desktop app's data persistence is eroding.
- **MCP Process Management**: Zombie processes and memory leaks (Issue #12491) continue to plague long-running agent sessions. The community is calling for proper reaping of child processes and resource cleanup after task completion.
- **Model Behavior Regressions**: GPT-5.6 Sol (Issue #34395) entered an infinite loop consuming 80% of a Pro user's usage allowance. Agents stopping mid-turn for no reason (Issue #34033) are also reported. Model reliability remains a top frustration.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-07-21

## Today's Highlights

Agent reliability and security hardening dominate today's activity, with two critical PRs addressing **RCE vulnerabilities in the A2A server** and a **high-impact fix for shell execution stalls**. Meanwhile, a longstanding bug where subagents falsely report success after hitting turn limits continues to attract attention from maintainers, underscoring the community's growing concern over agent transparency.

## Releases

- **[v0.52.0-nightly.20260721.gacae7124b](https://github.com/google-gemini/gemini-cli/releases/tag/v0.52.0-nightly.20260721.gacae7124b)** — Routine nightly build. No user-facing changes noted.

## Hot Issues

1. **#22323 — [BUG] Subagent recovery after MAX_TURNS reported as GOAL success**  
   *[github.com/google-gemini/gemini-cli/issues/22323](https://github.com/google-gemini/gemini-cli/issues/22323)*  
   A `codebase_investigator` subagent triggers max turns but still emits `status: "success"` with `Termination Reason: "GOAL"`. This misleads users into thinking a thorough analysis occurred. 12 comments, 2 👍. **Why it matters:** Erodes trust in agent introspection—critical for debugging complex workflows.

2. **#21409 — [BUG] Generalist agent hangs forever**  
   *[github.com/google-gemini/gemini-cli/issues/21409](https://github.com/google-gemini/gemini-cli/issues/21409)*  
   Deferring to the generalist agent (e.g., for folder creation) causes indefinite hangs. User reports waiting up to an hour. Workaround: explicitly disabling subagents. 7 comments, 8 👍. **Why it matters:** Blocks basic agent orchestration, a core CLI capability.

3. **#25166 — [BUG] Shell command execution stuck on "Waiting input" after completion**  
   *[github.com/google-gemini/gemini-cli/issues/25166](https://github.com/google-gemini/gemini-cli/issues/25166)*  
   Simple commands (e.g., `ls`) finish but CLI remains in a hung state. 4 comments, 3 👍. **Why it matters:** Directly impacts daily workflows; appears repeatedly across user reports.

4. **#21983 — [BUG] Browser subagent fails on Wayland**  
   *[github.com/google-gemini/gemini-cli/issues/21983](https://github.com/google-gemini/gemini-cli/issues/21983)*  
   Browser agent terminates with `GOAL` but provides no useful output on Wayland compositors. 4 comments, 1 👍. **Why it matters:** Blocks Linux users on modern display servers.

5. **#23571 — [BUG] Model creates tmp scripts in random spots**  
   *[github.com/google-gemini/gemini-cli/issues/23571](https://github.com/google-gemini/gemini-cli/issues/23571)*  
   When restricted to shell execution, the model generates edit scripts scattered across directories, making cleanup painful. 3 comments. **Why it matters:** Workspace hygiene is a recurring pain point for developers.

6. **#24246 — [BUG] 400 error with >128 tools**  
   *[github.com/google-gemini/gemini-cli/issues/24246](https://github.com/google-gemini/gemini-cli/issues/24246)*  
   CLI crashes when too many tools are registered. **Why it matters:** Scalability ceiling for power users with large MCP tool ecosystems.

7. **#20079 — [BUG] Symlinked agent files not recognized**  
   *[github.com/google-gemini/gemini-cli/issues/20079](https://github.com/google-gemini/gemini-cli/issues/20079)*  
   `~/.gemini/agents/` ignores symlinks, breaking version-managed agent definitions. 4 comments. **Why it matters:** Blocks dotfile management and shared agent config setups.

8. **#19873 — [ENHANCEMENT] Zero-Dependency OS Sandboxing & Intent Routing**  
   *[github.com/google-gemini/gemini-cli/issues/19873](https://github.com/google-gemini/gemini-cli/issues/19873)*  
   Proposes leveraging Gemini's native bash affinity with POSIX tool chains, sandboxed without external dependencies. 8 comments. **Why it matters:** High-impact architectural shift that could simplify the security model.

9. **#22672 — [BUG] Agent should discourage destructive behavior**  
   *[github.com/google-gemini/gemini-cli/issues/22672](https://github.com/google-gemini/gemini-cli/issues/22672)*  
   Model occasionally uses `git reset --force` or risky DB operations when safer alternatives exist. 3 comments, 1 👍. **Why it matters:** Safety-critical—one bad command can wipe work.

10. **#21968 — [BUG] Gemini doesn't use skills/sub-agents enough**  
    *[github.com/google-gemini/gemini-cli/issues/21968](https://github.com/google-gemini/gemini-cli/issues/21968)*  
    Custom skills (gradle, git) exist but are rarely invoked autonomously. **Why it matters:** Undermines the value of user-written skills; manual prompting required.

## Key PR Progress

1. **#28470 — [SECURITY] Enforce workspace trust and task isolation to prevent RCE**  
   *[github.com/google-gemini/gemini-cli/pull/28470](https://github.com/google-gemini/gemini-cli/pull/28470)*  
   Refactors the A2A server startup sequence to prevent zero-click RCE in untrusted workspaces. Size: XL. **Why it matters:** Critical security hardening—blocks environment poisoning attacks.

2. **#28319 — [SECURITY] Enforce path trust check prior to environment loading**  
   *[github.com/google-gemini/gemini-cli/pull/28319](https://github.com/google-gemini/gemini-cli/pull/28319)*  
   Ensures workspace trust is validated *before* environment variables are loaded. Merged. **Why it matters:** Defense-in-depth complement to #28470.

3. **#28389 — [FIX] Real-world time budget to prevent infinite-loop agent transitions**  
   *[github.com/google-gemini/gemini-cli/pull/28389](https://github.com/google-gemini/gemini-cli/pull/28389)*  
   Adds a shared deadline to `sendMessageStream` and `processTurn` to break event-driven infinite loops. Size: S. **Why it matters:** Directly addresses the "generalist agent hangs" bug (#21409).

4. **#28397 — [PERF] Remove synchronous I/O from shell tool critical path**  
   *[github.com/google-gemini/gemini-cli/pull/28397](https://github.com/google-gemini/gemini-cli/pull/28397)*  
   Replaces `fs.mkdtempSync`/`fs.existsSync` with async `fs/promises` to eliminate UI stuttering. **Why it matters:** Improves terminal rendering performance during shell operations.

5. **#28394 — [FIX] Remove temp files on background process exit**  
   *[github.com/google-gemini/gemini-cli/pull/28394](https://github.com/google-gemini/gemini-cli/pull/28394)*  
   Stops leaking temporary directories when shell commands execute with `is_background: true`. **Why it matters:** Solves a resource leak that fills temp folders over time.

6. **#28388 — [FIX] Scope `tools.core` wildcard deny to built-in tools**  
   *[github.com/google-gemini/gemini-cli/pull/28388](https://github.com/google-gemini/gemini-cli/pull/28388)*  
   Previously, setting `tools.core: []` silently disabled all MCP tools. Adds `builtinOnly` field to PolicyRule. **Why it matters:** Fixes a subtle security bypass / usability footgun.

7. **#28469 — [FIX] Rotate session ID on model fallback to prevent stateful API errors**  
   *[github.com/google-gemini/gemini-cli/pull/28469](https://github.com/google-gemini/gemini-cli/pull/28469)*  
   When falling back to `gemini-2.5-flash`, rotates session ID to avoid `[API Error: Please submit a new query]`. **Why it matters:** Unblocks users when primary model is rate-limited.

8. **#28410 — [FIX] Shorten MCP tools/list discovery timeout**  
   *[github.com/google-gemini/gemini-cli/pull/28410](https://github.com/google-gemini/gemini-cli/pull/28410)*  
   Previously, a non-responsive MCP server froze CLI for 10 minutes at startup. Short default timeout ensures fast failure. **Why it matters:** Major UX improvement for MCP-heavy configurations.

9. **#28431 — [FEAT] Cloud Run job, Workflows definition, and Dockerfile for PR generator**  
   *[github.com/google-gemini/gemini-cli/pull/28431](https://github.com/google-gemini/gemini-cli/pull/28431)*  
   Infrastructure layer for the SSR Code Generation Pipeline (Eventarc-triggered Cloud Workflow). **Why it matters:** Foundation for automated PR generation from issues.

10. **#28411 — [FEAT] Post comment before auto-closing feature requests**  
    *[github.com/google-gemini/gemini-cli/pull/28411](https://github.com/google-gemini/gemini-cli/pull/28411)*  
    Triage worker now explains *why* an issue is being auto-closed (focus on core stability). **Why it matters:** Improves contributor experience; reduces friction from bot-driven closures.

## Feature Request Trends

- **AST-aware tooling** (#22745, #22746): Strong interest in using Abstract Syntax Trees for precise file reads, method-boundary detection, and codebase mapping—reducing token waste and turn count.
- **Zero-dependency sandboxing** (#19873): Calls to leverage Gemini's native bash proficiency with POSIX tooling in a sandboxed environment, removing reliance on Docker or VMs for safe execution.
- **Agent self-awareness** (#21432): Requests for the CLI to introspect its own flags, hotkeys, and capabilities, acting as its own documentation and user guide.
- **Browser agent resilience** (#22232): Automatic session takeover and lock recovery for persistent browser profiles, preventing stuck states when orphaned processes exist.
- **Subagent trajectory sharing** (#22598): Making subagent execution logs visible via `/chat share` to enable better debugging and evaluation reviews.

## Developer Pain Points

- **Agent hangs and stalls** (#21409, #25166, #22465): Frequent reports of agents freezing after command completion or at interactive prompts. Workarounds exist (disable subagents) but are not user-friendly.
- **Permission and safety gaps** (#22093, #22672): Subagents executing without explicit permission after updates, and models issuing destructive commands (`git reset --force`) without safeguards.
- **Terminal rendering issues** (#21924, #24935): Flicker, corruption after external editor exits, and poor resize behavior remain unresolved for months.
- **Tool/turn limits misinterpreted** (#22323, #24246): Agents falsely report success after hitting caps, and large tool sets cause 400 errors—both degrade reliability without clear error signaling.
- **Memory system fragility** (#26522, #26523, #26525): Auto Memory retries low-signal sessions indefinitely, silently skips invalid patches, and logs secrets before redaction—raising both UX and security concerns.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-07-21

## Today’s Highlights
Two patch releases (v1.0.73, v1.0.72) landed yesterday, fixing a sub-agent hang with `agentStop` and adding authentication opt‑in inside the CLI. On the issue tracker, a long‑standing keyboard shortcut bug was finally closed, while several regressions (plan‑mode blocking shell commands, custom instructions not loading) and a critical TUI automation breakage have surfaced. Community attention is converging on context‑window management, platform‑specific clipboard failures, and the reliability of BYOK / sub‑agent workflows.

## Releases
**v1.0.73** (2026-07-20)  
- Anthropic subagents now continue correctly when additional directories are configured.  
- Relative links in custom agent instructions are resolved from the agent file location.

**v1.0.72** (2026-07-20)  
- Fixed an infinite loop in `agentStop` hooks: the CLI now ends the turn after 8 consecutive blocks, and hooks receive a `stop_hook_active` flag to self‑limit.  
- Opt‑in Git and GitHub authentication is now available inside the CLI.

## Hot Issues (10 Noteworthy)

1. **[#1481 – SHIFT + ENTER should spawn a line break, but executes the prompt (CLOSED)](https://github.com/github/copilot-cli/issues/1481)**  
   A commonly requested UX fix—SHIFT+ENTER now behaves like other chat UIs. The issue had 27 comments and 17 👍, showing broad relief. Closed yesterday.

2. **[#3622 – Copy to clipboard silently fails on Windows](https://github.com/github/copilot-cli/issues/3622)**  
   Clipboard operations appear to succeed but don’t update the contents. Reported working in v1.0.48; a regression. 4 👍 and still open.

3. **[#2181 – Regression: COPILOT_CUSTOM_INSTRUCTIONS_DIR not loading all instructions](https://github.com/github/copilot-cli/issues/2181)**  
   Instruction files from multiple directories are ignored since v1.0.9. A serious regression for teams using custom instructions. 1 👍, updated today.

4. **[#1688 – Add configurable auto-compaction threshold to config.json](https://github.com/github/copilot-cli/issues/1688)**  
   Users of high‑capacity models (e.g., Claude Opus 4.6) hit latency degradation before built‑in compaction triggers. 5 👍 indicate strong demand for tuning context management.

5. **[#3747 – Unrecoverable timeouts when WAITFOR DELAY appears in prompt or file](https://github.com/github/copilot-cli/issues/3747)**  
   Any mention of “WAITFOR DELAY” (MSSQL) causes total failure across all models. 1 👍; a quiet poison‑pill bug that can derail sessions.

6. **[#4188 – Regression on plan‑mode blocking shell commands](https://github.com/github/copilot-cli/issues/4188)**  
   Plan mode now forbids shell commands that were previously used to enrich plans (e.g., `gh`). Users consider this a regression. 1 👍.

7. **[#4196 – BYOK completions wire API fails with `reasoning_content` in streaming deltas](https://github.com/github/copilot-cli/issues/4196)**  
   When using a BYOK provider that emits `reasoning_content`, the CLI retries 5 times and fails. Blocks BYOK users with reasoning models.

8. **[#4195 – Code‑review task agents can mutate the shared parent worktree](https://github.com/github/copilot-cli/issues/4195)**  
   Despite being described as read‑only, `code-review` agents have been observed editing files. A security / correctness issue.

9. **[#4183 – Auto‑compaction does not prevent CAPI 5 MB failure from accumulated tool history](https://github.com/github/copilot-cli/issues/4183)**  
   Long tool‑heavy sessions hit a 5 MB serialization limit even with compaction enabled. 2 👍; a critical performance blocker for power users.

10. **[#4180 – Interactive TUI ignores all keyboard input written to its PTY](https://github.com/github/copilot-cli/issues/4180)**  
    When run inside programmatic PTYs (tmux, `expect`, orchestrators), the TUI only responds to Ctrl+C. Blocks automation and orchestration workflows.

## Key PR Progress
No pull requests were updated in the last 24 hours.

## Feature Request Trends
The most requested feature directions from recent issues include:

- **Configurable context‑window management** – automatic compaction thresholds, CAPI body‑limit awareness, and deferred tool‑schema reporting (#1688, #4183, #4189).
- **Model‑switching shortcuts** – quickly toggle between model presets and effort levels without deep menu navigation (#4190, #4182).
- **Improved mouse / keyboard integration** – clickable enqueued entries (#4179), image pasting in `/btw` (#4181), and session creation from `/btw` results (#4182).
- **BYOK model selection for background agents** – both in desktop app and CLI sandbox environments (#4192, #4193).
- **Better clipboard and terminal rendering** – reliable cross‑platform clipboard, path display fixes (#4184, #4191).

## Developer Pain Points
Several recurring frustrations emerge from the past 24 hours of issue activity:

- **Regressions in core workflows** – plan‑mode blocking shell commands (#4188) and custom instructions not loading (#2181) erode trust after upgrades.
- **Platform‑specific clipboard failures** – Windows (#3622) and WSL+tmux (#4191) clipboard silently fail, undermining copy‑paste‑driven workflows.
- **BYOK and sub‑agent fragility** – API failures with `reasoning_content` (#4196), `--add-dir` breaking Claude sub‑agents (#4185), and code‑review agents mutating state (#4195) create uncertainty for multi‑model setups.
- **Terminal / automation gaps** – the TUI ignoring PTY input (#4180) blocks integration with orchestration tools, a common pattern for advanced users.
- **Hard‑coded behavior** – one issue (#4194) expresses general frustration with lack of configurability, reflecting a desire for more user‑control across the board.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI Community Digest — 2026-07-21

## Today's Highlights
A cluster of session‑management fixes lands this week: two PRs from contributor Nas01010101 address frozen system prompts on resume (#2519) and fork/undo context truncation alignment (#2520). Meanwhile, Sreekant13 opened a targeted bug report and fix for `StrReplaceFile` miscounting replacements in chained edits (#2526 → #2524). On the user side, the persistent `429 engine_overloaded` error on remote servers (#2209) remains unresolved after two months, now with five comments and three thumbs‑up. No new releases were shipped in the past 24 hours.

## Releases
**No new releases in the last 24 hours.** The latest stable version remains `v1.49.0` (as referenced in issue #2522).

## Hot Issues
*(Only 5 issues were updated in the last 24h; all are listed below.)*

- **#2526 – `StrReplaceFile` reports too few total replacements for chained edits**  
  *Open* · by Sreekant13 · 0 comments · 0 👍  
  Bug: sequential edits count replacements against the original file instead of the running (progressively edited) content, causing under‑reported totals. A fix PR (#2524) was submitted on the same day.  
  → [MoonshotAI/kimi-cli Issue #2526](https://github.com/MoonshotAI/kimi-cli/issues/2526)

- **#2525 – Goal mode: no‑op continuation fires indefinitely while waiting on external conditions**  
  *Open* · by zedi2000 · 0 comments · 0 👍  
  In goal mode, the agent repeatedly re‑injects the full goal‑mode prompt every few seconds when waiting for external conditions (e.g. remote training job), burning tokens and filling context. No fix has been proposed yet.  
  → [MoonshotAI/kimi-cli Issue #2525](https://github.com/MoonshotAI/kimi-cli/issues/2525)

- **#2523 – Context compaction bug: Kimi Code reopens an already completed and deleted task**  
  *Open* · by Frogzter · 0 comments · 0 👍  
  User reports that after context compaction, the CLI re‑opens a previously completed and deleted task, leading to confusion. The issue includes a PDF diagnostic. Running v0.6.3 (older version).  
  → [MoonshotAI/kimi-cli Issue #2523](https://github.com/MoonshotAI/kimi-cli/issues/2523)

- **#2522 – Windows: old `kimi-code` sessions not migrated to `.kimi` after upgrade; `kimi migrate` command missing**  
  *Open* · by sunnywang666 · 0 comments · 0 👍  
  On Windows, upgrading from the legacy `kimi-code` client to `kimi` v1.49.0 does not migrate session data from `%USERPROFILE%\.kimi-code` to the new `%USERPROFILE%\.kimi` directory. The `kimi migrate` command is absent.  
  → [MoonshotAI/kimi-cli Issue #2522](https://github.com/MoonshotAI/kimi-cli/issues/2522)

- **#2209 – [bug] Cloud server deployment of kimi CLI: no reply, persistent 429 engine_overloaded for >48 hours**  
  *Open* · by yuermodi · 4 comments · 3 👍  
  Long‑standing issue (since May 2026) affecting Linux x86_64 remote servers. Upgrading from v1.24.0 to v1.41.0 did not resolve the throttling. Community has up‑voted this issue and posted diagnostic files, but no fix has been released.  
  → [MoonshotAI/kimi-cli Issue #2209](https://github.com/MoonshotAI/kimi-cli/issues/2209)

## Key PR Progress
*(Only 3 PRs were updated in the last 24h; all are listed below.)*

- **#2524 – fix(tools): count StrReplaceFile replacements against the running content**  
  *Open* · by Sreekant13 · 0 comments  
  Precisely resolves #2526 by tracking the current content after each edit before counting replacements. Ensures chained edits report accurate totals.  
  → [MoonshotAI/kimi-cli PR #2524](https://github.com/MoonshotAI/kimi-cli/pull/2524)

- **#2520 – fix(session): align fork/undo context truncation to wire turns**  
  *Open* · by Nas01010101 · 0 comments  
  Resolves #2517 and also fixes #1974 (wire‑only slash turns shifting the undo cut) and likely the root cause of #2049 (history mismatch after forks/undos). Includes a dedicated regression test.  
  → [MoonshotAI/kimi-cli PR #2520](https://github.com/MoonshotAI/kimi-cli/pull/2520)

- **#2519 – fix(app): refresh stale frozen system prompt on session resume**  
  *Open* · by Nas01010101 · 0 comments  
  Resolves #2420. Currently, resuming a session uses the `_system_prompt` frozen in `context.jsonl`, ignoring new skills added to `~/.kimi/skills/` or edits to `AGENTS.md`. This PR forces a refresh of the system prompt on resume.  
  → [MoonshotAI/kimi-cli PR #2519](https://github.com/MoonshotAI/kimi-cli/pull/2519)

## Feature Request Trends
The five recent issues do not contain explicit feature requests. However, the broader context (as seen in the PRs and older issues) points to developer desire for:

- **Better session lifecycle management** – Users want seamless migration between old/new config paths (#2522) and automatic refresh of dynamic configurations (skills, AGENTS.md) when resuming sessions (#2519 / #2420).
- **Smarter goal‑mode execution** – The indefinite token‑burning loop in goal mode (#2525) highlights a need for pacing or state‑aware polling to avoid unnecessary API calls.

## Developer Pain Points
Recurring frustrations observed in the last 24h:

- **Persistent 429 throttling on remote servers** (#2209) – Still unresolved after >2 months, affecting headless/Linux deployments. Community diagnostic files uploaded.
- **Session migration gaps on Windows** (#2522) – Legacy users cannot carry over old workflow data, and the `migrate` command is missing entirely.
- **Context corruption after compaction** (#2523) – Deleted tasks reappearing undermines core task‑management trust.
- **Goal mode inefficiency** (#2525) – Wastes tokens and context budget while waiting for external events; no built‑in back‑off mechanism.
- **Chained tool counting bugs** (#2526) – Breaks accurate logging and user feedback in automated editing workflows.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-07-21

---

## Today’s Highlights

OpenCode **v1.18.4** shipped with adaptive thinking support for Kimi models and several provider-side fixes. Community activity remains high, with 50 issues and 50 PRs updated in the past 24 hours. Notable topics include persistent Windows ARM64 TUI failures, a newly proposed per-tool execution timeout in PR #36869, and growing demand for reliable session state across restarts and network changes.

---

## Releases

### v1.18.4
- **Improvement:** Adaptive thinking controls for Kimi models on Anthropic-compatible providers, with summarized reasoning output by default (@chouqin).
- **Bugfixes:**
  - Reduced OpenAI provider header timeouts during slow connection setup.
  - Respect provider-defined reasoning options in configuration.

---

## Hot Issues (10 Most Noteworthy)

1. **[#19130 – Windows ARM64 native: OpenTUI fails to initialize with bun:ffi dlopen TinyCC error](https://github.com/anomalyco/opencode/issues/19130)**  
   *Open (11 comments, 8👍)*  
   The native ARM64 binary works for CLI commands but TUI crashes on Windows 11 ARM64. Deep integration issue with bun’s FFI layer; community is actively debugging.

2. **[#28611 – [FEATURE] Way for user to have custom prompt for AFTER compaction](https://github.com/anomalyco/opencode/issues/28611)**  
   *Closed (10 comments)*  
   Users want to inject instructions after context compaction to preserve critical behavior. Highlights a common need for fine-grained control over the compaction process.

3. **[#27902 – kimi-for-coding provider gets 429 engine overloaded due to missing User-Agent header](https://github.com/anomalyco/opencode/issues/27902)**  
   *Closed (10 comments, 9👍)*  
   Kimi’s coding gateway rejects requests from non-whitelisted agents. The fix was to set a proper User-Agent; merged into recent releases.

4. **[#14894 – Web UI: No response displayed after input message sent](https://github.com/anomalyco/opencode/issues/14894)**  
   *Closed (9 comments)*  
   Messages appear in TUI but not in Web UI. Persisted as a long-standing sync bug between the two UIs.

5. **[#19267 – Agent stuck in infinite loop (Minimax-2.7, any mode)](https://github.com/anomalyco/opencode/issues/19267)**  
   *Closed (8 comments)*  
   Sessions get infinitely compacted. Reported for Minimax models; points to a regression in context management that survived multiple versions.

6. **[#28568 – Recent versions lose ability to handle long-running tasks](https://github.com/anomalyco/opencode/issues/28568)**  
   *Closed (5 comments)*  
   A detailed Chinese-language report: v1.14–1.15 can’t sustain large, complex tasks. Models “drop things” and go off-track. Community echoes similar frustrations.

7. **[#28579 – Regression: MCP prompts no longer listed after connecting MCP server](https://github.com/anomalyco/opencode/issues/28579)**  
   *Closed (5 comments)*  
   MCP server connects, but its prompts are invisible. Tools may still work, but discoverability is broken – a regression that impacts plugin ecosystems.

8. **[#17769 – Session state stale after device sleep/resume — heartbeat mismatch causes premature SSE disconnect](https://github.com/anomalyco/opencode/issues/17769)**  
   *Closed (5 comments, 7👍)*  
   Web UI shows stuck sessions after laptop sleep or tab backgrounding. High community resonance; fix required deeper SSE lifecycle handling.

9. **[#17846 – --log-level DEBUG fails to log anything](https://github.com/anomalyco/opencode/issues/17846)**  
   *Open (4 comments, 2👍)*  
   On macOS, when 10 log files exist, debug logging silently dies – a log rotation bug that frustrates debugging.

10. **[#28726 – Agent-level opencode/ model validation fails after v1.15.6 — falls back to wrong provider](https://github.com/anomalyco/opencode/issues/28726)**  
    *Closed (2 comments)*  
    After update, agents with `opencode/minimax-m2.5-free` show “not valid” and silently switch providers – a silent misconfiguration that could go unnoticed.

---

## Key PR Progress (10 Important Pull Requests)

1. **[#36869 – feat(opencode): per-tool execution timeout with abort + session recovery](https://github.com/anomalyco/opencode/pull/36869)**  
   *Open*  
   Adds configurable timeouts for built-in and MCP tools to prevent agent loops from wedging. Aborts hang and recovers session – a major reliability improvement.

2. **[#38031 – feat: Supplement the missing Chinese translation](https://github.com/anomalyco/opencode/pull/38031)**  
   *Open*  
   Completes Chinese locale – simple but valuable for the growing non-English user base.

3. **[#38026 – fix(server): allow authenticated CORS preflight](https://github.com/anomalyco/opencode/pull/38026)**  
   *Open*  
   Ensures browser preflight requests pass through password-protected servers; critical for web UI security.

4. **[#38014 – fix(core): resolve npm plugin entry point as file URL on Windows](https://github.com/anomalyco/opencode/pull/38014)**  
   *Open (closes #38021)*  
   Fixes `import.meta.resolve()` returning raw path instead of `file://` on Windows – unblocks npm-based plugins on the platform.

5. **[#38019 – fix(opencode): bound shell output after exit](https://github.com/anomalyco/opencode/pull/38019)**  
   *Open*  
   Closes a race where child process output after exit could be lost; adds 500ms EOF wait window. Stable shell interaction.

6. **[#37647 – feat(nix): build opencode2 (TUI) alongside opencode](https://github.com/anomalyco/opencode/pull/37647)**  
   *Open*  
   Provides both `opencode` and `opencode2` in Nix builds – eases migration for Nix users.

7. **[#37219 – fix(opencode): ignore node_modules during config and skill discovery](https://github.com/anomalyco/opencode/pull/37219)**  
   *Open (closes #30337)*  
   Prevents glob scans from traversing `node_modules` under `.opencode/`, reducing scan time and avoiding false positives.

8. **[#38016 – fix(core): improve patch errors](https://github.com/anomalyco/opencode/pull/38016)**  
   *Open*  
   Introduces typed parser errors for patch malformations – much clearer failure feedback during file editing.

9. **[#38006 – feat(codemode): support JSON callbacks](https://github.com/anomalyco/opencode/pull/38006)**  
   *Open*  
   Adds `JSON.parse` revivers and `JSON.stringify` replacers inside CodeMode – closes a long-standing parity gap with standard JSON processing.

10. **[#33136 – fix(core): reasoning text infinitely repeats](https://github.com/anomalyco/opencode/pull/33136)**  
    *Closed*  
    Adds a circuit breaker for repeated tokens in reasoning streams – a targeted fix for an annoying UI/UX bug.

---

## Feature Request Trends

- **Context compaction customization:** Several requests (#28611, #28568) ask for post-compaction user instructions and control over what survives compaction.
- **Session & state portability:** Users want global session listing (#16116), session persistence when projects move, and centralized config/cache path documentation (#28600).
- **Surgical editing:** #24511 proposes hash-anchored edits to avoid sending full file context; high token-cost savings for large files.
- **Agent team delegation:** #33144 (merged) introduces nested subagent delegation; community is eager for multi-agent orchestration.
- **UI persistency:** Sidebar resizing (#23896) and topbar disappearance (#28653) indicate ongoing desire for robust responsive layouts.

---

## Developer Pain Points

- **Regression in long-running task reliability:** Multiple reports (#28568, #19267) highlight that recent versions (1.14–1.15) fail to sustain complex, multi-file tasks — models lose focus, drop steps, and produce incomplete results.
- **Flaky SSE connections:** Sleep/resume (#17769) and silent drops (#28729) cause sessions to appear stuck or hang client readers indefinitely.
- **Configuration silent failures:** Undocumented fields, ignored plugin mutations (#20940), and invisible agent validation errors (#28726, #28733) waste developer time.
- **Platform-specific breakage:** Windows ARM64 TUI (#19130), macOS log rotation (#17846), and Windows CORS preflight (#38026) show uneven platform polish.
- **MCP prompt regression:** MCP prompts are no longer listed (#28579) – a direct hit to plugin usability.
- **Infinite compaction loops:** Minimax models specifically trigger infinite compact cycles (#19267), suggesting model-specific context management bugs.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest – 2026-07-21

## Today's Highlights
A nightly release (`v0.20.0-nightly.20260721`) rolled out with autofix improvements, including label-driven takeover and a fix for forced-dispatch no-ops. The community surfaced several critical bugs around thinking-only models (P1 issues #7284, #7332) that blocked internal side queries – a fix PR (#7333) has already been merged. Meanwhile, a new RFC on reliable auto-memory recall (#7040) continues to gather feedback, signalling growing interest in context-aware agent memory.

## Releases
**v0.20.0-nightly.20260721.cda0e0348** ([Release](https://github.com/QwenLM/qwen-code/releases/tag/v0.20.0-nightly.20260721.cda0e0348))  
- `feat(autofix):` label-driven takeover and release  
- `fix(autofix):` forced-dispatch green no-op  
- Additional autofix stability improvements

## Hot Issues (10 noteworthy)
1. **#7040 – RFC: Reliable auto-memory recall**  
   *7 comments* – Core memory maintainer narrowed scope to improve recall paths for all users without becoming an enterprise governance platform. Community discussing timing, quality, and telemetry.  
   [Issue](https://github.com/QwenLM/qwen-code/issues/7040)

2. **#7147 – MCP server never successfully gets tool/resource listing**  
   *6 comments* – Fastmail MCP server authentication works but tool listing times out. Affects users integrating external MCP providers.  
   [Issue](https://github.com/QwenLM/qwen-code/issues/7147)

3. **#6414 – VSCode: Failed to connect to Qwen agent**  
   *5 comments* – Persisting connection failure across versions; user reported with screenshot. Likely ACP process or environment issue.  
   [Issue](https://github.com/QwenLM/qwen-code/issues/6414)

4. **#7316 – OpenAI toolCall breaks `subAgent` entirely**  
   *3 comments* – When using `isolation: "worktree"`, some OpenAI-compatible models send empty `working_dir`, causing schema validation failure and blocking subagent usage.  
   [Issue](https://github.com/QwenLM/qwen-code/issues/7316)

5. **#7284 – Side-query forces `enable_thinking=false`**  
   *3 comments, P1* – `runSideQuery` sends `enable_thinking: false` to TokenPlan endpoints that require `true`, causing 400 errors. Affects web_fetch, classifiers, etc.  
   [Issue](https://github.com/QwenLM/qwen-code/issues/7284)

6. **#7332 – BadRequestError on thinking-only models**  
   *2 comments, P1* – Internal operations (context compaction, goal judge) force `enable_thinking: false` on models like `qwen3.8-max-preview`, leading to 400 errors.  
   [Issue](https://github.com/QwenLM/qwen-code/issues/7332)

7. **#7315 – Agent tool schema forces mutually exclusive parameters**  
   *2 comments* – `working_dir` and `isolation` both become required when using OpenAI-compatible providers, breaking subagent launches.  
   [Issue](https://github.com/QwenLM/qwen-code/issues/7315)

8. **#6949 – Plan mode blocks unclassified read-only shell commands**  
   *2 comments* – Trusted CLI through `python3` flagged as dangerous; also bypasses exit confirmation. Highlights need for better shell command classification.  
   [Issue](https://github.com/QwenLM/qwen-code/issues/6949)

9. **#7306 – Harden tool-output budgeting, observability, and artifact lifecycle**  
   *2 comments* – Multiple truncation paths cause inconsistent tool output sizes; proposes unified budgeting and better observability.  
   [Issue](https://github.com/QwenLM/qwen-code/issues/7306)

10. **#7347 – feat(skills): add overridable `defaultDisabled` separate from `skills.disabled`**  
    *1 comment* – Current hard denylist prevents enabling skills in project settings if disabled in user settings. Suggests separate default override.  
    [Issue](https://github.com/QwenLM/qwen-code/issues/7347)

## Key PR Progress (10 important)
1. **#7364 – `feat(autofix): resolve the review threads its findings implemented`**  
   Autofix loop now automatically closes review threads it has addressed, reducing human re-review burden.  
   [PR](https://github.com/QwenLM/qwen-code/pull/7364)

2. **#7351 – `fix(autofix): retry verification-gate crash instead of burying agent's fix`**  
   Distinguishes gate rejection from gate crash; crashes are retried so agent work isn't lost.  
   [PR](https://github.com/QwenLM/qwen-code/pull/7351)

3. **#7333 – `fix(core): skip enable_thinking=false for thinking-only models` (Merged)**  
   Directly addresses #7332 – internal operations no longer force `enable_thinking: false` on models that require it.  
   [PR](https://github.com/QwenLM/qwen-code/pull/7333)

4. **#7303 – `fix(core): support qwen3.8 side queries on DashScope`**  
   Treats `qwen3.8-max-preview` as mandatory-thinking; side queries respect model requirements.  
   [PR](https://github.com/QwenLM/qwen-code/pull/7303)

5. **#7382 – `fix(autofix): refuse a non-main takeover out loud`**  
   Prevents silent refusal when an autofix/takeover label is applied to non-`main` branches.  
   [PR](https://github.com/QwenLM/qwen-code/pull/7382)

6. **#7355 – `feat(autofix): render managed fleet into scan's run summary`**  
   Adds per-PR decision table to autofix scan summaries for easier health monitoring.  
   [PR](https://github.com/QwenLM/qwen-code/pull/7355)

7. **#7313 – `fix(web-shell): restore scheduled task reference interactions`**  
   Restores scrolling, text cursor, and hover colors in prompt pickers for extensions/skills/MCP.  
   [PR](https://github.com/QwenLM/qwen-code/pull/7313)

8. **#7247 – `fix(autofix): retry model API error instead of stranding PR`**  
   Model-side errors (403/429/5xx) now trigger retry rather than being treated as a final evaluation.  
   [PR](https://github.com/QwenLM/qwen-code/pull/7247)

9. **#7380 – `feat(web-shell): show subagent sessions in detail panel`**  
   Agent task cards now open a dedicated surface with full transcript and SSE stream, keeping main conversation clean.  
   [PR](https://github.com/QwenLM/qwen-code/pull/7380)

10. **#7280 – `feat(auth): add Singapore Token Plan region`**  
    Adds Singapore (International) region to `/auth` and VS Code companion subscription plan definitions.  
    [PR](https://github.com/QwenLM/qwen-code/pull/7280)

## Feature Request Trends
- **Memory system improvements** – RFC #7040 seeks reliable auto-memory recall with telemetry, quality metrics, and deterministic evaluation (#7335).  
- **MCP integration maturity** – Users demand robust MCP tool/resource listing (#7147), prompt argument handling (#7314), and general stability.  
- **Thinking model compatibility** – Multiple requests for proper handling of models that require `enable_thinking: true` (internal ops, side queries).  
- **Subagent & tool call reliability** – Reports of parameter conflicts (#7315), token loss (#7377), and background response drops (#7334).  
- **Configuration flexibility** – Skills disabling override (#7347), SDK workspace display names (#7170), and CODEOWNERS for core modules (#7299).  
- **Observability & budgeting** – Tool-output truncation consistency (#7306), planning evidence validation (#7208).  

## Developer Pain Points
- **Thinking flag conflicts** – Repeated 400 errors from `enable_thinking: false` on thinking-only models (#7284, #7332, #7359, #7366) – highest urgency this week.  
- **VSCode/ACP connectivity** – Failed agent connections persist across versions (#6414, #7056), often tied to ACP process exits or environment issues.  
- **MCP server instability** – Timeouts on tool/resource listing (#7147); optional parameters silently dropped (#7314).  
- **Session & model switching** – Daemon sessions invalidated after model switch (#7023); bearer tokens lost on web-shell refresh (#7301).  
- **Tool call validation** – Mutual exclusion of `working_dir`/`isolation` (#7315), empty strings from models (#7316), and parameter loss in long sessions (#7377).  
- **Autofix loop fragility** – Verification gate crashes (#7351), model API errors stranding PRs (#7247), and silent refusals on non-main branches (#7382).

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar).*