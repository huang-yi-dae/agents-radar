# AI CLI Tools Community Digest 2026-08-17

> Generated: 2026-08-17 01:03 UTC | Tools covered: 7

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

**Date:** 2026-08-17

---

## 1. Ecosystem Overview

The AI CLI tool ecosystem is maturing rapidly, with five major players (Claude Code, OpenAI Codex, Gemini CLI, GitHub Copilot CLI, OpenCode, Qwen Code) all shipping nightly or near-daily releases while grappling with a common set of reliability challenges. The dominant themes across all tools are session lifecycle management (idle-session usage drains, silent context loss, stuck states), multi-agent orchestration reliability (false success reporting, undelivered tasks, misrouted messages), and platform-specific regressions (Windows desktop performance, macOS sandbox fragility, tmux compatibility). Security and trust concerns are rising: silent autonomous behavior during incidents, sandbox bypasses, and permission-scope violations are among the highest-voted issues. Billing and quota transparency is an emerging cross-cutting pain point, with users across tools reporting confusion about usage accounting, plan fallbacks, and rate-limit semantics.

---

## 2. Activity Comparison

| Tool | Issues Today | PRs Today | Release Status | Notable Activity Pattern |
|---|---|---|---|---|
| Claude Code | 10 tracked; 3+ new | 3 updated, none merged | No new release | Bug-report heavy; top-voted issue on silent autonomous behavior |
| OpenAI Codex | 10 tracked; 1 new | 17 merged | No new release | Highest PR throughput; TUI ergonomics + sandbox hardening focus |
| Gemini CLI | 10 tracked | 4 merged, 5 open | Nightly `v0.56.0-nightly.20260816` | SSR Agent PR cluster fixing P1 reliability bugs |
| GitHub Copilot CLI | 10 tracked; 4+ new | None significant | No new release | Regression-heavy; OAuth/MCP breakage across 1.0.78–1.0.80 |
| Kimi Code CLI | 4 tracked | 2 merged, 1 closed | No new release | Low activity; long-standing UX gaps (session delete, cron UI) |
| OpenCode | 10 tracked | 10 merged | No new release | Strong contributor velocity; TUI + Desktop app fixes |
| Qwen Code | 10 tracked; 5+ new | 5 open, 1 closed | Nightly `v0.21.11-nightly` | Multi-agent orchestration bug cluster; CI/CD self-hardening |

**Key observations:** OpenAI Codex is the fastest-moving (17 PRs merged in 24h), followed by OpenCode (10 merged) and Qwen Code/Gemini CLI (5–6 each). Claude Code and Copilot CLI show lower PR velocity but higher issue engagement — a signal of maintenance load or release bottlenecks. Gemini CLI and Qwen Code both ship nightly releases, indicating continuous delivery pipelines.

---

## 3. Shared Feature Directions

| Feature Direction | Tools | Specific Needs |
|---|---|---|
| **Session lifecycle management** | Claude Code, Copilot CLI, Kimi Code, OpenCode | CLI-level session delete/archive commands; un-archive/restore UI; project identity in TUI status line; per-project session isolation; predictable session duration controls |
| **Configurable approval/timeout behavior** | Claude Code, Copilot CLI | AskUserQuestion timeout configurable/disableable; edit-permission timeout extension or removal; opt-out for auto-commit/auto-push/auto-PR in background agents |
| **Multi-agent orchestration reliability** | Gemini CLI, Qwen Code, Copilot CLI | Subagent false success on MAX_TURNS; task assignment delivery guarantees; message routing correctness; child-agent status accuracy |
| **Billing & quota transparency** | Claude Code, OpenAI Codex, OpenCode, Copilot CLI | Clear plan/balance active-state indicators; predictable fallback behavior; accurate reset dates; explanation of idle-session usage accumulation |
| **Sandbox & permission hardening** | Claude Code, OpenAI Codex, OpenCode | OS-level sandboxing for native bash; permission profile migration (legacy `:project_roots`); move-operation permission checks; editor buffer isolation |
| **Headless/remote-first workflows** | OpenAI Codex, OpenCode | Mobile control of always-on Linux hosts; auto-sync projects across devices; programmatic model discovery (`--list-models`) |
| **TUI productivity** | OpenAI Codex, Claude Code, Copilot CLI | Undo/redo in prompt editor; keyboard shortcuts for model/reasoning-effort switching; compact command history display; working-directory commands |

---

## 4. Differentiation Analysis

| Tool | Target User | Technical Focus | Distinguishing Features |
|---|---|---|---|
| **Claude Code** | Enterprise/devops; high-stakes autonomous operation | Security rules engine, sandboxing, TUI stability | `security-patterns.json` glob rules; background agents with auto-PR; Fable 5 model integration; plan-based usage economics |
| **OpenAI Codex** | Desktop-app users; Windows-heavy; SSH-centric | TUI performance micro-optimizations, sandbox ACLs, remote control | Windows desktop app; mobile remote-steering; MCP lifecycle; Azure Responses API support |
| **Gemini CLI** | Research/agent developers | Agent execution semantics, SSR (self-repair) agents, eval infrastructure | SSR Agent pattern (self-healing PRs); Auto Memory feature; ACP token accounting; behavioral eval suite (76 tests) |
| **Copilot CLI** | GitHub-centric CI/CD users | MCP OAuth compliance, plugin ecosystem, SDK server | Repository-level `enabledPlugins`; plugin dependency model; Slack integration; session archiving |
| **Kimi Code CLI** | Web-runner users; scripters | Minimal footprint, Web runner stability, cron tasks | `--starting-prompt` flag; CronCreate scheduled tasks; session folders under `~/.kimi/sessions/` |
| **OpenCode** | Terminal power-users; self-hosters | TUI state-machine correctness, provider-agnostic billing, Desktop app | Zen/Go plan balance fallback; 25-line shell progress streaming; mouse-escape-sequence teardown; multi-provider routing |
| **Qwen Code** | Multi-agent team orchestrators; CI/CD maintainers | Agent-team protocol, review automation, web-shell UI | Team task dispatch semantics; PAT-bearing job isolation; review worktree leases; autofix footprint gates; bilingual (CN/EN) UX |

**Notable technical divergence:** Gemini's SSR Agent pattern (self-healing PRs that fix the tool's own bugs) is unique and highly effective. OpenAI Codex invests heavily in performance micro-optimizations (alloc-free hyperlink decoration, avoiding clone allocations). Qwen Code treats review automation as a first-class engineering discipline with operational telemetry for convergence control. Claude Code's security-patterns glob system is the most sophisticated rules engine, but also a source of silent-failure risk.

---

## 5. Community Momentum & Maturity

| Tool | Community Energy | Iteration Speed | Maturity Signals |
|---|---|---|---|
| **OpenAI Codex** | High; 17 PRs/day; 106-comment Windows thread | Very fast | Mature PR pipeline; regression-prone but rapidly patched; strong maintainer involvement |
| **OpenCode** | High; consistent contributor velocity; 49👍 top UX issue | Fast | Growing feature surface; Desktop app maturing; billing logic still fragmented |
| **Gemini CLI** | Moderate; maintainer-driven bug filing; SSR Agent initiative | Fast (nightly) | P1 bug resolution via self-repair PRs; eval-suite expansion signals long-term investment |
| **Claude Code** | High engagement; top-voted trust/safety issue | Slow (3 PRs/24h, none merged) | Mature feature set; release cadence bottleneck; stale-issue bot frustrating users |
| **Qwen Code** | Moderate; multi-agent bug cluster; CI/CD hardening | Fast (nightly) | Agent-team orchestration still stabilizing; review automation unusually sophisticated |
| **Copilot CLI** | Moderate; regression-heavy week | Slow (no significant PRs) | Enterprise adoption visible (Atlassian, Azure); OAuth compliance churn; Windows under-tested |
| **Kimi Code CLI** | Low; 4 tracked issues; long-standing gaps | Slow | Smallest community; Web runner focus; session management gaps persist since April |

**Maturity ranking (operational stability):** Gemini CLI > OpenCode > OpenAI Codex > Qwen Code > Claude Code > Copilot CLI > Kimi Code.

**Iteration ranking (velocity):** OpenAI Codex > OpenCode ≈ Qwen Code ≈ Gemini CLI > Claude Code ≈ Copilot CLI > Kimi Code.

---

## 6. Trend Signals

**For tool developers:**
1. **Autonomous-agent trust is the next battleground.** Claude Code's #66960 (16-min silent tool calls during incident response, highest-voted open issue) and Gemini's #22323 (false success on MAX_TURNS) both signal that users demand transparency and honest failure reporting from autonomous agents. Expect stricter audit logging and termination-reason preservation to become table stakes.
2. **Session lifecycle is a first-class product surface.** Idle-session usage drains (Claude Code), auto-archived sessions with no restore UI (Copilot CLI), and missing session delete commands (Kimi Code) are recurring complaints. Tools that treat sessions as durable, user-controllable workspaces will win trust.
3. **Billing/usage accounting is under-specified.** The 1M context-window availability dispute (Codex), Go-plan balance fallback failures (OpenCode), and reset-date inaccuracies (Copilot CLI) indicate that usage semantics are not being proactively communicated or correctly implemented.
4. **Windows is an underserved platform.** Codex's 85👍 Windows stutter thread, Copilot's socket error 10013, and Kimi's D-drive path resolution all point to inadequate Windows testing. Cross-platform parity is a differentiator.
5. **TUI state-machine robustness is critical.** Stuck 'thinking' spinners (OpenCode), frozen `/permissions` nav (Claude Code), phantom "Waiting input" (Gemini), and mouse-escape garbage after exit (OpenCode) are all state-machine bugs that destroy trust in daily-driver tools.

**For developers evaluating tools:**
- **Gemini CLI** offers the most reliable agent-execution semantics, with SSR-self-healing and an expanding eval suite — best for research/agent development.
- **OpenAI Codex** is the fastest-moving and best for TUI ergonomics, but Windows users should monitor the performance issue threads.
- **Claude Code** remains the most feature-rich for enterprise security workflows, but release cadence and silent-behavior issues warrant caution for autonomous operation.
- **OpenCode** is the strongest open alternative with excellent contributor velocity, but billing fallback logic needs monitoring.
- **Copilot CLI** is best for GitHub-centric shops, but OAuth regression churn (1.0.78 → 1.0.80) suggests waiting for a stable release.
- **Qwen Code** is ideal for multi-agent orchestration experiments; expect breakage as the team protocol stabilizes.
- **Kimi Code** is the least mature; prefer others unless Web-runner or cron-task features are uniquely valuable.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

## Claude Code Skills Community Highlights — 2026-08-17

---

### 1. Top Skills Ranking

Most-discussed open PRs by community engagement, listed in approximate order of attention:

**1. skill-creator fix: run_eval.py recall bug** — [PR #1298](https://github.com/anthropics/skills/pull/1298)
- **Author:** MartinCajiao | **Status:** Open
- **Function:** Fixes the `skill-creator` evaluation pipeline (`run_eval.py`, `run_loop.py`, `improve_description.py`) which reports `recall=0%` for every skill description. The optimization loop is described as "currently optimizing against noise."
- **Discussion:** Builds on reproducible failures documented in [Issue #556](https://github.com/anthropics/skills/issues/556) (10+ independent reproductions). Related parallel fixes exist: [PR #1099](https://github.com/anthropics/skills/pull/1099) (Windows subprocess pipe crash) and [PR #1050](https://github.com/anthropics/skills/pull/1050) (1-line Windows/PATHEXT fix). Highly active cluster of fixes around the same broken subsystem.

**2. document-typography skill** — [PR #514](https://github.com/anthropics/skills/pull/514)
- **Author:** PGTBoos | **Status:** Open
- **Function:** Typographic quality control for AI-generated documents: orphan word wrapping, widow paragraph headers, numbering misalignment. Targets defects common to Claude-generated output.

**3. pdf skill case-sensitive file references** — [PR #538](https://github.com/anthropics/skills/pull/538)
- **Author:** Lubrsy706 | **Status:** Open
- **Function:** Fixes 8 case-sensitivity mismatches in `skills/pdf/SKILL.md` (`REFERENCE.md` → `reference.md`, `FORMS.md` → `forms.md`) that break on case-sensitive filesystems.

**4. ODT skill** — [PR #486](https://github.com/anthropics/skills/pull/486)
- **Author:** GitHubNewbie0 | **Status:** Open
- **Function:** OpenDocument Format (.odt, .ods) creation, template filling, and ODT→HTML conversion, triggered by LibreOffice/ODF/ISO-standard requests.

**5. docx tracked change `w:id` collision fix** — [PR #541](https://github.com/anthropics/skills/pull/541)
- **Author:** Lubrsy706 | **Status:** Open
- **Function:** Fixes document corruption when DOCX skill adds tracked changes to existing bookmarks — hardcoded low IDs collide with user bookmarks in OOXML shared ID space.

**6. skill-creator YAML unquoted description warning** — [PR #539](https://github.com/anthropics/skills/pull/539)
- **Author:** Lubrsy706 | **Status:** Open
- **Function:** Pre-parse validation in `quick_validate.py` to catch unquoted `description` fields containing `:` — prevents silent YAML parsing failures that truncate descriptions.

**7. self-audit skill** — [PR #1367](https://github.com/anthropics/skills/pull/1367)
- **Author:** YuhaoLin2005 | **Status:** Open
- **Function:** Two-stage output auditing: mechanical file verification (every claimed output file exists), followed by a four-dimension reasoning audit with damage-severity prioritization. Framework-agnostic. Related proposal: [Issue #1385](https://github.com/anthropics/skills/issues/1385) (three-gate quality pipeline).

---

### 2. Community Demand Trends

**Highest-signal demand: fixing the skill-creator evaluation tooling.** The single largest cluster of PRs and issues targets `run_eval.py`'s broken trigger detection: [Issue #556](https://github.com/anthropics/skills/issues/556) (12 comments) plus [PRs #1298](https://github.com/anthropics/skills/pull/1298), [#1099](https://github.com/anthropics/skills/pull/1099), and [#1050](https://github.com/anthropics/skills/pull/1050). The community cannot trust skill-description optimization while the evaluation signal is noise.

**Enterprise platform coverage.** Strong interest in platform-specific skills: [ServiceNow](https://github.com/anthropics/skills/pull/568) (scripting, SecOps, CSDM, IntegrationHub), [SAP-RPT-1-OSS tabular model](https://github.com/anthropics/skills/pull/181), and SharePoint Online security/context-window concerns ([Issue #1175](https://github.com/anthropics/skills/issues/1175)).

**Skill sharing and distribution.** Org-wide sharing requested in [Issue #228](https://github.com/anthropics/skills/issues/228) (8 👍, 16 comments); duplicate-on-install problems in [Issue #189](https://github.com/anthropics/skills/issues/189) (9 👍).

**Security and trust boundary.** [Issue #492](https://github.com/anthropics/skills/issues/492) — community skills distributed under the `anthropic/` namespace impersonate official skills, enabling privilege escalation. 43 comments, 2 👍 — the most-commented issue in the repository.

**Quality-gate/self-audit skills.** Multiple proposals for structured output verification before delivery ([PR #1367](https://github.com/anthropics/skills/pull/1367), [Issue #1385](https://github.com/anthropics/skills/issues/1385), [Issue #412](https://github.com/anthropics/skills/issues/412) on agent governance).

---

### 3. High-Potential Pending Skills

Actively discussed PRs that may land soon:

- **[ServiceNow platform skill](https://github.com/anthropics/skills/pull/568)** — Broad platform assistant: ITSM, ITOM, ITAM/SAM, FSM, HRSD/CSM, Vulnerability Response, SecOps; updated as recently as 2026-08-12.
- **[self-audit skill](https://github.com/anthropics/skills/pull/1367)** — Mechanical file verification + 4-dimension reasoning quality gate; updated 2026-07-02.
- **[pyxel retro game development skill](https://github.com/anthropics/skills/pull/525)** — Wraps the pyxel-mcp server; updated 2026-07-15.
- **[accounting/testing-patterns skill](https://github.com/anthropics/skills/pull/723)** — Full-stack testing guidance: Testing Trophy model, AAA pattern, React Testing Library, edge cases.
- **[plan-file-hygiene skill](https://github.com/anthropics/skills/pull/1479)** — Lifecycle management for accumulated planning artifacts; addresses [Issue #1417](https://github.com/anthropics/skills/issues/1417).
- **[Spec-compliance fixes for two existing skills](https://github.com/anthropics/skills/pull/1538)** — Recent (2026-08-09); brings `template/SKILL.md` and another skill back under the Agent Skills spec.

---

### 4. Skills Ecosystem Insight

The community's most concentrated demand is for reliability — both **fixing the broken skill-creator evaluation pipeline** (making skill development itself trustworthy) and **adding verification/audit skills** (making Claude's output trustworthy before delivery).

---

# Claude Code Community Digest — 2026-08-17

## Today's Highlights

The community is heavily focused on two fronts: usage accounting anomalies under Fable 5 (idle sessions consuming the full 5-hour window, silent tool-call bursts during incident response, and plan-level access questions) and TUI regressions (frozen `/permissions` navigation, non-configurable AskUserQuestion timeout). A new bug report on Fable 5's 16-minute silent tool-call span during an incident-response session is the top-voted issue this week. On the PR side, a security-critical fix corrects glob matching in `security-patterns.json` (top-level files were silently excluded from rules), and a second PR repairs invalid YAML frontmatter that was gutting agent metadata.

## Releases

No new releases in the last 24 hours.

## Hot Issues

1. **[#66960 — Fable 5 model behavior: 16 min of silent tool calls, then AskUserQuestion about never-shared findings during incident response](https://github.com/anthropics/claude-code/issues/66960)**
   Highest-voted open issue (22 👍, 15 comments). During a live incident where a third-party agent had destroyed a workspace, Claude Code ran silent tool calls for 16 minutes and then surfaced a question about findings it had never presented. Community is treating this as a critical trust/safety failure for autonomous operation.

2. **[#73468 — macOS sandbox unusable: Seatbelt profile passed inline via 'sandbox-exec -p' exceeds ARG_MAX with many git worktrees](https://github.com/anthropics/claude-code/issues/73468)**
   Reproduced bug with 8 comments, 5 👍. Every sandboxed command fails with `E2BIG` even for trivial calls like `printf ok` once worktree count grows. The sandbox becomes 100% broken — not a degradation.

3. **[#87224 — /permissions arrow-key navigation inert when auto-mode denials are present (2.1.221, macOS)](https://github.com/anthropics/claude-code/issues/87224)**
   Filed today. The `/permissions` menu renders but arrow keys do nothing; flagged as a still-live reproduction of #57659 which was closed `NOT_PLANNED` by staleness bot. Community frustration with stale-issue closure is compounding the bug report.

4. **[#73163 — Make AskUserQuestion timeout configurable](https://github.com/anthropics/claude-code/issues/73163)**
   Closed as duplicate, but 10 👍 and 5 comments. The 60-second auto-continue in AskUserQuestion keeps picking unintended defaults. Two more duplicates (#73324, #73367) were filed in the same week, confirming broad demand.

5. **[#73305 — Keep Claude Fable 5 included in the Max plan after July 7 (not usage-credits-only)](https://github.com/anthropics/claude-code/issues/73305)**
   Plan economics complaint with 9 comments. Users argue Fable 5's move to usage-credits-only undermines the Max plan value proposition, especially for heavy code-review workloads.

6. **[#82744 — Claude Code usage increases in an idle open session without new prompts](https://github.com/anthropics/claude-code/issues/82744)**
   Newly filed (July 30) but already trending in this digest window: users report usage climbing in sessions with zero new prompts, matching the theme of several now-closed "session limit" reports (#83095, #83372).

7. **[#73197 — Add a setting to disable background agents' auto-commit / auto-push / auto-PR](https://github.com/anthropics/claude-code/issues/73197)**
   v2.1.198 made auto-commit/auto-push/auto-PR the default for background agents. Users running propose-only workflows want an opt-out; 5 👍, 3 comments, currently open.

8. **[#72856 — Claude GitHub integration needs org-installation-only mode and must not access repos outside selected app installation](https://github.com/anthropics/claude-code/issues/72856)**
   Security-scoped enhancement: the integration appears to access repos beyond the explicitly selected app installation. Enterprise users flag this as a compliance blocker.

9. **[#72549 — Post-compaction: a no-argument "mode" skill is re-read as active after the user's in-chat disable is dropped from the summary](https://github.com/anthropics/claude-code/issues/72549)**
   Another compaction-summary bug: user disables a skill in-chat, but after context compaction the skill re-activates because the disable instruction was dropped. Same class as #50724, which was already closed.

10. **[#73162 — Show the current project/codebase identity in the CLI UI by default](https://github.com/anthropics/claude-code/issues/73162)**
    Long-standing UX gaps: running multiple sessions per terminal makes it hard to tell which project a session belongs to. Marked `stale` but still open.

## Key PR Progress

Only 3 PRs were updated in the last 24 hours; none are merged yet.

1. **[#87079 — fix(security-guidance): make ** glob patterns match zero-depth paths](https://github.com/anthropics/claude-code/pull/87079)**
   High-priority security fix. Delegation to `fnmatch` means `**/*.ts` requires a literal `/`, silently excluding top-level files from `security-patterns.json` rules. Since these are security rules, the failure mode is silent non-coverage for exactly the files most likely to be missed.

2. **[#87077 — fix(pr-review-toolkit): repair invalid YAML frontmatter in all agents](https://github.com/anthropics/claude-code/pull/87077)**
   Every agent's description was a single unquoted scalar containing dialogue lines (e.g., `Daisy: "..."`), which YAML parses as a nested mapping. Result: agents load with empty frontmatter (no name, description, or model). This silently broke metadata for the entire PR-review toolkit.

3. **[#87125 — Create python-package-conda.yml](https://github.com/anthropics/claude-code/pull/87125)**
   A CI workflow addition for conda-based Python packaging. No discussion yet; low signal.

## Feature Request Trends

- **Configurable AskUserQuestion timeout**: The single most repeated request this window (3 separate issues: #73163, #73324, #73367). The 60-second fixed timeout keeps picking default answers before users can respond; requests to make it configurable, disableable, or extendable to 5–10 minutes.
- **Project identity in TUI**: Users running multiple sessions want the project name shown in the status line or prompt by default (#73162).
- **Org-level GitHub integration isolation**: Enterprise users want an org-installation-only mode with strict repo-scope enforcement (#72856).
- **Opt-out for background-agent auto-PR**: Propose-only workflows are being violated by default auto-commit/push/PR behavior (#73197).
- **Multi-repo audit support**: Single-session batching of multiple repositories for Fable-driven security audits (#73274).

## Developer Pain Points

- **Idle-session usage drains**: The dominant cluster of complaints. Multiple "You've hit your session limit" issues (#82598, #83042, #84406, #82911, #83372, #83910, #83946) describe sessions consuming the full 5-hour window without user input. Reports note: CLI left open overnight, "continue" eating the whole window instantly, and Fable 5 depleting sessions in 5 minutes without being used. Several reports (e.g., #82744, #83095) specifically blame cached token reads in idle sessions.
- **Compaction context loss**: Skills disabled in-chat silently re-activating after compaction (#72549) — a known class of bug (#50724) that keeps resurfacing in new forms.
- **Silent autonomous behavior**: Fable 5's 16-minute silent tool-call span during incident response (#66960) is the highest-voted open issue, reflecting a broader concern about agent transparency during high-stakes operations.
- **TUI input regressions**: Frozen `/permissions` arrow-key navigation (#87224) and the AskUserQuestion timeout cluster both point to TUI maintenance regressions in recent 2.1.22x releases.
- **Sandbox fragility on macOS**: The ARG_MAX failure (#73468) makes the sandbox entirely unusable in worktree-heavy repos — an all-or-nothing failure rather than graceful degradation.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-08-17

## Today's Highlights
No new releases shipped in the last 24 hours, but the project saw a burst of activity: **17 pull requests** landed, mostly focused on TUI ergonomics (working-directory commands, Vim history-up, editor keymap sharing), performance optimizations (alloc-free hyperlink decoration, avoiding history span clones), and sandbox/permission hardening (legacy `:project_roots` support, per-environment shell variable policies, external editor buffer isolation). On the issue tracker, **Windows desktop app performance** remains the dominant pain point, with mouse stutter and process leaks drawing the most engagement, while a newly filed report questions the documented 1M context window availability.

## Releases
No new releases in the last 24 hours.

## Hot Issues

1. **[#20214 — Codex App freezes/stutters on Windows 11 Pro](https://github.com/openai/codex/issues/20214)** — 106 comments, 85 👍. The longest-running Windows performance complaint remains unresolved. Users report stutters despite ample resources (Ryzen 5, 32 GB RAM), and the sustained engagement suggests this is a systemic desktop-app issue rather than a hardware problem.

2. **[#38546 — Desktop app causes system-wide mouse stutter without elevation](https://github.com/openai/codex/issues/38546)** — 31 comments, 13 👍. Newer report from Aug 14 describing severe cursor stutter on Windows, specifically when running non-elevated. High community resonance given the broad impact.

3. **[#25319 — Scope VS Code chats to current workspace/project](https://github.com/openai/codex/issues/25319)** — 29 comments, 62 👍. Strongly requested enhancement: chat/thread history in the IDE extension leaks across projects. Users want per-project isolation. Opened as a fresh request with OpenAI maintainer involvement.

4. **[#23200 — Headless remote Linux hosts for Codex mobile](https://github.com/openai/codex/issues/23200)** — 18 comments, 48 👍. Users want Codex mobile to control always-on Linux servers without requiring a desktop machine to remain online. Popular use case for SSH-centric workflows.

5. **[#18018 — Codex runs after weekly limit reached, credits not consumed](https://github.com/openai/codex/issues/18018)** — 16 comments. Closed, but noteworthy for billing inconsistency: the client continues running after quota exhaustion without spending remaining credits — a confusing UX that drew active discussion.

6. **[#37487 — CLI sends empty tool descriptions to Azure Responses API](https://github.com/openai/codex/issues/37487)** — 12 comments. Regression in CLI 0.147.0 affecting Azure users: empty tool descriptions break downstream tool-call handling. Enterprise-relevant.

7. **[#28248 — Windows sandbox fails reads with "deny-read ACLs" after power outage](https://github.com/openai/codex/issues/28248)** — 11 comments, 6 👍. A power loss during an active task corrupts sandbox state, causing all read operations to fail. Users report needing manual intervention to recover.

8. **[#34652 — File-edit approval buttons unresponsive in Remote SSH on Windows app](https://github.com/openai/codex/issues/34652)** — 10 comments. Approval flow broken specifically for Remote SSH conversations in the Windows desktop app, while CLI approval works — pointing to an app-server event handling issue.

9. **[#2379 — Undo/redo typing in TUI](https://github.com/openai/codex/issues/2379)** — 8 comments, 32 👍. Long-standing (since Aug 2025) feature request for Cmd-Z/Shift-Cmd-Z in the prompt editor. Small ask with consistent demand.

10. **[#32797 — Codex Desktop retains five MCP/Node process batches (147 node.exe, 13.9 GiB)](https://github.com/openai/codex/issues/32797)** — 7 comments. Severe memory leak: a single session spawns multiple MCP process batches that are never reaped, consuming ~14 GiB of RAM. Ties into the broader Windows MCP lifecycle complaints.

## Key PR Progress

1. **[#38921 — Compact successful command activity in the TUI](https://github.com/openai/codex/pull/38921)** — Groups consecutive successful commands into a compact `Ran N commands` entry, preserving full transcripts while drastically decluttering the TUI display.

2. **[#38918 — Improve `codex doctor` network diagnostics](https://github.com/openai/codex/pull/38918)** — Probes the configured Responses endpoint with route-aware HTTP client (proxy, custom CA). Classifies TLS, proxy auth, resolution, and timeout failures into actionable categories.

3. **[#38916 — Honor legacy `:project_roots` permission entries](https://github.com/openai/codex/pull/38916)** — Fixes a silent security regression: permission profiles written before the rename to `:workspace_roots` were being ignored, potentially dropping filesystem restrictions.

4. **[#38894 — Add working-directory commands to the TUI](https://github.com/openai/codex/pull/38894)** — New `/cd [path]` command changes directory for idle local sessions while preserving conversation history; relative paths resolve from current directory, omitting path selects `~`. Reloads project config on change.

5. **[#38907 — Edit queued messages with Vim history-up](https://github.com/openai/codex/pull/38907)** — In Vim normal mode with an empty composer, history-up restores the latest queued follow-up for editing; submission replaces the queued message instead of duplicating it.

6. **[#38902 — Honor per-environment shell variable policies](https://github.com/openai/codex/pull/38902)** — Carries `ShellEnvironmentPolicy` per resolved `EnvironmentConfig` so shell commands, user shell tasks, and unified exec all respect the currently selected turn environment's variable policy.

7. **[#38830 — Isolate external editor buffers from sandbox-writable paths](https://github.com/openai/codex/pull/38830)** — Security fix: editor buffers (which hold composer text) are now written under a protected `editor` path, never exposed by restricted filesystem policies.

8. **[#38827 — Add endpoint protection checks to `codex doctor`](https://github.com/openai/codex/pull/38827)** — Detects macOS/Windows endpoint protection products (AV/EDR) that can interfere with Codex and explains which exclusions to verify — addressing a recurring support pain point.

9. **[#38823 — Avoid allocating per character when decorating hyperlinks](https://github.com/openai/codex/pull/38823)** — Stack-buffer encodes characters during hyperlink decoration, eliminating a temporary `String` allocation per character. Performance micro-fix for large TUI transcript rendering.

10. **[#38840 — Identify Mac mini hosts in remote control handshakes](https://github.com/openai/codex/pull/38840)** — Sends `x-codex-host-device-kind: mac_mini` in the remote-control WebSocket handshake for proper device identification in remote steering scenarios.

## Feature Request Trends

- **Workspace/project scoping**: Users repeatedly ask for session and thread isolation per project/workspace, both in the VS Code extension and the desktop sidebar (connections → projects → threads).
- **Headless/remote-first workflows**: Strong demand for controlling always-on Linux hosts from Codex mobile, plus better thread organization for remote connections.
- **TUI productivity**: Undo/redo in the prompt editor and keyboard shortcuts for switching reasoning effort/model are the top editor-quality-of-life requests.
- **MCP lifecycle management**: Users want UI-level enable/disable controls for MCP servers (not just `config.toml`) and are hitting process-leak bugs that make existing setups unstable.
- **Context window transparency**: A newly filed issue (#38917) challenges the documented 1M context window for GPT-5.6 Sol as unavailable in practice — expect configuration guidance to become a priority.

## Developer Pain Points

- **Windows desktop app performance** is the most glaring issue: mouse stutter, freezes, MCP/Node process leaks (147 node.exe / 13.9 GiB), and sandbox ACL corruption after power events. The volume and engagement on these threads indicate a degradation in experience for a significant Windows user base.
- **Sandbox reliability on Windows** specifically — elevated setup payloads hitting CreateProcess limits (os error 206) and filesystem restrictions going stale after crashes are recurring failure modes.
- **Remote session approval flows** are fragile: approval buttons unresponsive in Remote SSH conversations, and context compaction intermittently 404s, breaking session continuity.
- **Rate-limit UX confusion**: Two issues this week touch on weekly quota behavior (runs past limit without consuming credits; allowance refills postponing reset dates) — users are struggling to trust and predict billing/usage semantics.
- **Documentation/implementation gaps**: The reported 1M context window not working in practice, and `codex doctor` not catching network/endpoint protection issues, frustrate users who hit these walls during onboarding or enterprise rollout.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

## Gemini CLI Community Digest — 2026-08-17

### 1. Today's Highlights

A nightly release (`v0.56.0-nightly.20260816`) is out, though the changelog is empty beyond the version bump. The issue tracker is dominated by **agent reliability problems**: a high-severity bug where subagents silently report success after hitting `MAX_TURNS` (hiding real interruptions) is now in retesting, and there's an active **SSR Agent** PR fixing it. Notably, a PR adding a `--list-models` JSON flag and a fix for ACP token accounting were merged, improving non-interactive tooling and cost transparency.

### 2. Releases

- **v0.56.0-nightly.20260816.g2a87e7be1** — Nightly release. No significant changes detailed in the changelog beyond the version bump.

### 3. Hot Issues

1. **#22323** — [Subagent recovery after MAX_TURNS is reported as GOAL success, hiding interruption](https://github.com/google-gemini/gemini-cli/issues/22323) (P1, 12 comments, 2👍) — A `codebase_investigator` subagent reported `status: "success"` despite hitting its turn limit. This is a critical correctness bug that gives users false confidence in agent output. The community is actively discussing it, and it's now marked for retesting, with an **SSR Agent** PR (#28815) addressing it.

2. **#21409** — [Generalist agent hangs](https://github.com/google-gemini/gemini-cli/issues/21409) (P1, 8 comments, 8👍) — The generalist agent hangs indefinitely on simple tasks like folder creation, forcing users to wait up to an hour before cancelling. The highest-reacted issue in the digest, indicating significant user pain. A workaround (instructing the model not to defer) exists but is not a fix.

3. **#19873** — [Leverage model's bash affinity via Zero-Dependency OS Sandboxing](https://github.com/google-gemini/gemini-cli/issues/19873) (P2, 8 comments, 1👍) — Proposes using the model's native `bash` skills safely via OS-level sandboxing instead of the current tool-restricted approach. This is a major architectural idea that would improve both capability and security.

4. **#25166** — [Shell command execution gets stuck with "Waiting input"](https://github.com/google-gemini/gemini-cli/issues/25166) (P1, 4 comments, 3👍) — After executing simple CLI commands, the shell hangs, showing an "Awaiting user input" state even though the command has completed. A persistent core reliability bug that breaks workflows.

5. **#24353** — [Robust component level evaluations](https://github.com/google-gemini/gemini-cli/issues/24353) (P1, 7 comments) — This EPIC tracks the expansion of the behavioral eval suite (currently 76 tests across 6 models). It's a maintainer-only epic indicating a significant investment in testing infrastructure to prevent regressions like the ones in this digest.

6. **#22745** — [Assess the impact of AST-aware file reads, search, and mapping](https://github.com/google-gemini/gemini-cli/issues/22745) (P2, 7 comments, 1👍) — An EPIC investigating how AST-aware tools could improve precision and reduce token noise. The community is interested but this is a long-horizon investigation.

7. **#21968** — [Gemini does not use skills and sub-agents enough](https://github.com/google-gemini/gemini-cli/issues/21968) (P2, 6 comments) — A common complaint: the model doesn't proactively use custom skills or sub-agents unless explicitly told to. This undermines the value proposition of custom agents and is a frequent user frustration.

8. **#26522** — [Stop Auto Memory from retrying low-signal sessions indefinitely](https://github.com/google-gemini/gemini-cli/issues/26522) (P2, 5 comments) — The background memory extraction agent gets stuck retrying sessions it has already decided to skip, wasting resources. Part of a broader set of Auto Memory bugs filed by a single maintainer, suggesting active development but also a rough edge.

9. **#26525** — [Add deterministic redaction and reduce Auto Memory logging](https://github.com/google-gemini/gemini-cli/issues/26525) (P2, 4 comments) — A security concern: Auto Memory sends transcript content to the model before redaction, and logs can contain sensitive info. This is a privacy/security issue in a feature that is otherwise designed to be helpful.

10. **#26523** — [Surface or quarantine invalid Auto Memory inbox patches](https://github.com/google-gemini/gemini-cli/issues/26523) (P2, 3 comments) — The memory inbox silently skips invalid patches, making the system opaque and hard to debug. This results in lost memory with no user feedback.

### 4. Key PR Progress

1. **#28815** — [SSR Agent: Preserve original termination reason during subagent recovery](https://github.com/google-gemini/gemini-cli/pull/28815) (P1, fixes #22323) — Directly targets the top issue: when a subagent hits `MAX_TURNS` or `TIMEOUT` but calls `complete_task` in a grace turn, the `LocalAgentExecutor` now preserves the true termination reason instead of reporting success.

2. **#28812** — [SSR Agent: Prevent indefinite TUI hang by adding execution timeouts](https://github.com/google-gemini/gemini-cli/pull/28812) (P1, fixes #21477) — Adds timeouts to `getProcessInfo()` which uses `execAsync` for `ps`. This addresses bare Linux terminal hangs at "Initializing..." where the process call never returns.

3. **#28848** — [fix(cli): handle refreshAuth failures gracefully in non-interactive mode](https://github.com/google-gemini/gemini-cli/pull/28848) — Prevents a raw stack trace and exit code 1 when `refreshAuth()` fails in `--prompt` mode, instead providing a clean, actionable error with the dedicated auth error exit code.

4. **#28843** — [feat(cli): add --list-models flag to print available models as JSON](https://github.com/google-gemini/gemini-cli/pull/28843) — **Merged.** Allows programmatic model discovery for integrations and orchestrators without entering the interactive REPL, following the same early-exit pattern as `--help` and `--version`.

5. **#28840** — [fix(acp): populate cached/thought tokens in PromptResponse usage field](https://github.com/google-gemini/gemini-cli/pull/28840) — **Merged.** Fixes ACP clients overestimating cost (~3x) by adding `cachedContentTokenCount` and thought tokens to `_meta.quota` in `PromptResponse`.

6. **#28844** — [docs(cli): add Homebrew deprecation notice and update existing-user message](https://github.com/google-gemini/gemini-cli/pull/28844) — **Merged.** Adds a deprecation notice for the `homebrew-core` install path, directing users to npm instead to avoid installing a non-updating version.

7. **#28814** — [SSR Agent: Fix TypeScript strict-null errors in integration tests](https://github.com/google-gemini/gemini-cli/pull/28814) (P2, fixes #21919) — Fixes multiple TypeScript strict-null property and union type errors in integration test files, improving build reliability for contributors.

8. **#28813** — [SSR Agent: Add composite flag to packages/cli tsconfig](https://github.com/google-gemini/gemini-cli/pull/28813) — **Closed.** Fixes root build/typecheck failures caused by `evals/tsconfig.json` referencing `packages/cli` without it being composite.

9. **#28847** — [SSR Agent: Update /clear command docs to include context reset](https://github.com/google-gemini/gemini-cli/pull/28847) (P3, fixes #19239) — Corrects documentation that incorrectly stated `/clear` only clears the visual screen, clarifying that it also resets agent context.

10. **#28820** — [SSR Agent: Clarify privacy notice wording and selection options](https://github.com/google-gemini/gemini-cli/pull/28820) (P2, fixes #26120) — Fixes misleading and contradictory privacy notice copy in the opt-out UI, ensuring users can actually see the correct selection options.

### 5. Feature Request Trends

- **AST-Aware Codebase Tooling:** Multiple EPICs (#22745, #22746) explore AST-aware file reads, searches, and codebase mapping. The goal is to reduce token usage and improve precision, but it remains in the investigation stage.
- **Agent Self-Awareness & Proactivity:** Users want the model to be more proactive with its own tools, using skills and sub-agents without explicit instruction (#21968) and to have better self-knowledge of its own flags and behavior (#21432).
- **Improved Agent Sandboxing & Safety:** A push for OS-level sandboxing to let the model use its native `bash` skills safely (#19873) alongside requests to discourage destructive commands like `git reset --force` (#22672).
- **Programmatic Interfaces & Tooling:** The `--list-models` flag (#28843) and ACP token fixes (#28840) point to a growing demand for better non-interactive, programmatic use of the CLI.

### 6. Developer Pain Points

- **Unreliable Sub-Agent Execution:** The most significant pain point. Sub-agents hang (#21409), report false success (#22323), and ignore configuration overrides (#22267). The model also doesn't use them proactively (#21968), undermining user-configured workflows.
- **Broken Shell Interactions:** The CLI frequently gets stuck after executing simple commands, showing a phantom "Waiting input" state (#25166). This is compounded by issues like the generalist agent hanging on simple tasks.
- **Auto Memory Rough Edges:** A suite of bugs (#26516, #26522, #26523, #26525) shows the Auto Memory feature is being actively developed but is still buggy, with issues around infinite retries, silent failures, and security concerns with prompt redaction.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-08-17

## 1. Today's Highlights

Authentication and MCP integrations continue to dominate the issue tracker, with multiple OAuth regressions reported across versions 1.0.78–1.0.80, including a Windows-specific socket error and an RFC 8414 issuer-mismatch failure. A new memory-pressure watchdog bug is forcing aggressive conversation compaction at low context usage, causing sessions to loop until OOM. No new releases were published in the last 24 hours; the community is waiting on fixes for the reported regressions.

## 2. Releases

No new releases were published in the last 24 hours.

## 3. Hot Issues

1. **Atlassian MCP OAuth broken in 1.0.80 (RFC 8414 regression)** — [#4490](https://github.com/github/copilot-cli/issues/4490)  
   OAuth authentication against Atlassian MCP servers fails in v1.0.80 due to strict issuer validation, working in v1.0.78. High impact for enterprise users relying on Atlassian integrations; only 1 comment so far, awaiting maintainer acknowledgment.

2. **MCP OAuth intermittently fails on Windows with socket error 10013** — [#4463](https://github.com/github/copilot-cli/issues/4463)  
   Windows-specific permission-denied socket errors prevent browser authorization flow from opening. Affects all remote HTTP MCP servers, not just one provider. Community impact is broad given Windows adoption.

3. **Memory-pressure watchdog force-compacts at 23% context, then loops to OOM** — [#4506](https://github.com/github/copilot-cli/issues/4506)  
   The watchdog triggers on process memory, not context pressure, recovering ~0.003% tokens while repeatedly compacting until out-of-memory. Long-running sessions become unusable. No comments yet; triage-tagged.

4. **Repository-level `enabledPlugins` ignored in `copilot -p` mode** — [#4507](https://github.com/github/copilot-cli/issues/4507)  
   Non-interactive prompt mode ignores `.github/copilot/settings.json` overrides applied correctly in interactive mode and `plugins list`. Causes CI/CD pipelines to behave differently from local sessions.

5. **Resumed session retains stale connection item IDs** — [#4505](https://github.com/github/copilot-cli/issues/4505)  
   After resuming a session post-interruption, every prompt fails with `CAPIError: 400 input item ID does not belong to this connection`. `/fork` does not recover it either — session is effectively lost.

6. **`account.getQuota` returns request timestamp as `resetDate`** — [#4504](https://github.com/github/copilot-cli/issues/4504)  
   JSON-RPC quota snapshots report the wrong reset date, breaking tooling that monitors quota windows. Small but precise correctness bug with clear repro steps.

7. **Concurrent tool calls during MCP token refresh cancel each other** — [#4472](https://github.com/github/copilot-cli/issues/4472)  
   Each concurrent call spawns a new `rmcp` service on token refresh, causing in-flight calls to fail with "transport closed." Manifests under load or parallel sub-agent usage.

8. **Plugin updates fail with "Access is denied" when other sessions are open** — [#4488](https://github.com/github/copilot-cli/issues/4488)  
   File locks from unrelated VS Code or CLI sessions block plugin updates on Windows. Surfaces the lack of a robust plugin update mechanism under concurrency.

9. **claude-haiku-4.5 sub-agent fails: reasoning effort 'medium' not supported** — [#4473](https://github.com/github/copilot-cli/issues/4473)  
   CLI routes sub-agent tasks to models with unsupported reasoning-effort parameters. Silent model capability mismatch breaks agentic workflows.

10. **SDK server reports ready without auth token, Slack sessions fail generically** — [#4503](https://github.com/github/copilot-cli/issues/4503) (CLOSED)  
    Server reports ready before `COPILOT_SDK_AUTH_TOKEN` initialization, causing vague "couldn't create a session" errors in Slack DMs. Closed within 24h — pending verification of fix.

## 4. Key PR Progress

No significant PR activity was recorded in the last 24 hours. One PR (#3163, "ViewSonic monitor") is open but appears unrelated to the codebase (likely noise or mis-filed). The issue list shows no corresponding merged or in-flight fixes for the top reported bugs yet.

## 5. Feature Request Trends

- **Session management improvements** — Multiple requests for un-archiving sessions ([#4502](https://github.com/github/copilot-cli/issues/4502)), restore UI for silently archived chats ([#4474](https://github.com/github/copilot-cli/issues/4474)), and preserving the selected agent upon resume ([#4489](https://github.com/github/copilot-cli/issues/4489)). Sessions are still treated as ephemeral, but users increasingly rely on them as durable workspaces.
- **Plugin dependency model** — [#4487](https://github.com/github/copilot-cli/issues/4487) calls for inter/intra-marketplace dependency specification, so plugins can declare and auto-install dependencies. Gaining traction as the plugin ecosystem grows.
- **Higher-fidelity permission prompts** — [#4486](https://github.com/github/copilot-cli/issues/4486) reports edit-permission requests timing out when not answered immediately, with users requesting removal or extension of these timeouts.

## 6. Developer Pain Points

- **MCP + OAuth regression churn** — Recurring issues across versions (1.0.78 worked, 1.0.80 broke; Windows-specific failures; concurrent refresh races). Developers report integration breakage without clear upgrade guidance.
- **Silent data loss in session lifecycle** — Sessions auto-archived without UI to restore ([#4474](https://github.com/github/copilot-cli/issues/4474)), stale connection IDs killing resumed sessions ([#4505](https://github.com/github/copilot-cli/issues/4505)), and no recovery path — each results in irrecoverable work.
- **Config inconsistency across modes** — `enabledPlugins` behaves differently in interactive vs. `-p` mode ([#4507](https://github.com/github/copilot-cli/issues/4507)); users cannot trust settings to apply uniformly.
- **Windows concurrency and file locking** — Plugin updates and OAuth both fail under concurrent sessions on Windows ([#4488](https://github.com/github/copilot-cli/issues/4488), [#4463](https://github.com/github/copilot-cli/issues/4463)); platform-specific issues remain under-tested.
- **Watchdog and resource-management surprises** — The memory-pressure watchdog compacting at 23% context ([#4506](https://github.com/github/copilot-cli/issues/4506)) is a new failure mode that degrades long-running sessions without user control.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

## Kimi Code CLI Community Digest — 2026-08-17

### Today's Highlights
No releases were published in the last 24 hours. Community activity centers on long-standing pain points: session management lacks a user-facing delete command, and scheduled tasks created via `CronCreate` remain invisible in the TUI. Two important PRs from Ricardo-M-L address Web runner stability and string rendering bugs in tool call summaries.

### Releases
No new releases in the last 24 hours.

### Hot Issues

- **[#1783] Feature Request: Add /delete command to remove sessions** — [Link](https://github.com/MoonshotAI/kimi-cli/issues/1783)  
  Users currently must manually delete folders under `~/.kimi/sessions/`. Requested for session list hygiene, disk cleanup, and secure deletion of sensitive sessions. Six comments, one 👍, open since April — indicating a persistent gap in session lifecycle management.

- **[#2600] Windows PowerShell 7 default D-drive startup breaks kimi code path resolution** — [Link](https://github.com/MoonshotAI/kimi-cli/issues/2600)  
  When PowerShell 7 defaults to a non-C drive, kimi code fails to find the correct working directory. Affects Windows users with custom shell configurations; five comments in five days — actively discussed, no fix yet.

- **[#1478] Memory layer optimization and documentation gap for large projects** — [Link](https://github.com/MoonshotAI/kimi-cli/issues/1478)  
  A long-standing complaint (since March) about the absence of a proper memory layer. The user references an alternative layout (`SOUL.md`, `MEMORY.md`, daily memory files) as a reference model, but kimi only appears to use `agent.md`. Critical for multi-session projects.

- **[#2605] CronCreate tasks have no user-visible management UI** — [Link](https://github.com/MoonshotAI/kimi-cli/issues/2605)  
  Scheduled tasks created by the model via `CronCreate` are persisted under `~/.kimi-code/cron/` but there is no `/cron` command or `/tasks` panel entry. Users must hand-edit JSON files — a clear usability gap in the TUI.

### Key PR Progress

- **[#864] `--starting-prompt` flag to prompt without exit** — [Link](https://github.com/MoonshotAI/kimi-cli/pull/864)  
  Adds `--starting-prompt` / `-s` to allow inline prompt submission without exiting the interactive session. Closes issue #887. Closed in the last 24h — status (merged vs. rejected) not visible, but the feature directly improves scripting and quick-question flows.

- **[#2324] fix(web): handle BrokenPipeError in SessionProcess.send_message** — [Link](https://github.com/MoonshotAI/kimi-cli/pull/2324)  
  Guards against the subprocess exiting between `start()` and the actual `stdin` write in `src/kimi_cli/web/runner/process.py`. Prevents crashes in the Web runner when the process dies mid-send — reliability fix.

- **[#2449] fix(string): strip newlines in `shorten_middle` before the length check** — [Link](https://github.com/MoonshotAI/kimi-cli/pull/2449)  
  Fixes incorrect early return: the function returns before collapsing newlines when input is short, causing multi-line tool call key arguments to render as multi-line in single-line summaries. A subtle but visible UI bug.

### Feature Request Trends

- **Session lifecycle commands** — Repeated requests for `/delete`, `/remove`, and general session management surfaced in #1783 and related discussions.
- **User-visible cron/scheduled task management** — #2605 highlights the need for a first-class `/cron` command or integration into `/tasks`.
- **Memory layer improvements** — #1478 calls for long-term memory, project-level context persistence, and better documentation for existing memory-related files.
- **Windows & cross-platform path handling** — #2600 reflects a broader class of shell/default-directory compatibility issues.

### Developer Pain Points

- **No CLI for session deletion** — Manually editing `~/.kimi/sessions/` is fragile and error-prone.
- **Invisible cron jobs** — Tasks created by the model are effectively "write-only"; no audit trail in the UI.
- **Memory/context loss in large projects** — Without a persistable memory layer, multi-session work on large codebases is a common frustration.
- **Path resolution on non-standard Windows configs** — Non-C-drive defaults break startup, affecting a subset of Windows users.
- **Web runner crashes** — `BrokenPipeError` in process communication (addressed by PR #2324) suggests flaky behavior when the subprocess exits unexpectedly.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-08-17

## Today's Highlights

The OpenCode community is grappling with a cluster of reliability issues—stuck "thinking" states, silent session failures, and provider billing/fallback problems dominate the issue tracker. On the development side, contributor activity is strong, with a wave of merged fixes for TUI edge cases, shell progress handling, and permission UX, plus several Desktop app UI improvements from Hona. A notable new PR targets high CPU usage from the session spinner, a long-standing pain point for users.

## Releases

No new releases were published in the last 24 hours.

## Hot Issues

1. **[#7957: [UX] Ctrl+C should not exit OpenCode - conflicts with universal copy shortcut](https://github.com/anomalyco/opencode/issues/7957)** — 49 👍, 16 comments. This long-standing issue (open since January) remains the most upvoted UX complaint. Pressing `Ctrl+C` exits the entire TUI instead of copying text, which users hit constantly by habit. The high comment count suggests a lively debate on whether to remap exit to `Ctrl+D` or require a confirmation.

2. **[#41470: "Copied to clipboard" doesn't work in VSCode Server (Docker)](https://github.com/anomalyco/opencode/issues/41470)** — 16 comments. Copying text inside OpenCode running in VSCode Server shows a success message but doesn't actually reach the system clipboard. This breaks a core workflow for remote-development users and undermines trust in the action feedback loop.

3. **[#36506: All paid OpenCode Zen models fail with 'Upstream request failed' — free models work](https://github.com/anomalyco/opencode/issues/36506)** — 11 comments, 3 👍. A service-side issue where every paid Zen model fails while free tiers work fine, suggesting a routing or quota bug in the Zen gateway. Users are confused because the error message gives no actionable detail, and they cannot switch to paid models at all.

4. **[#13626: [FEATURE]: Auto-sync projects in web UI from server](https://github.com/anomalyco/opencode/issues/13626)** — 15 👍, 11 comments. Users want OpenCode Web to automatically pull projects from the server when opening on a new device or browser, instead of manually configuring or re-discovering sessions. This is a strong signal that the web UI is being used as a primary interface.

5. **[#26602: Desktop hits 5-minute Headers Timeout Error with slow local providers](https://github.com/anomalyco/opencode/issues/26602)** — 11 comments. The Desktop app aborts local OpenAI-compatible provider requests at exactly 5 minutes, even when `"timeout": false` is explicitly set in config. Local model users with long generations (e.g., 32k context, deep reasoning) are unable to complete requests, making the Desktop client unusable for them.

6. **[#33318: [URGENT] Zen paid balance still hits FreeUsageLimitError / daily free usage limit](https://github.com/anomalyco/opencode/issues/33318)** — 9 comments. Users with a paid Zen balance of $20 are still being blocked by the free usage limit. This indicates the balance spend-down path is not properly engaged when the daily free tier is exhausted, effectively locking out paying customers mid-session.

7. **[#20458: bug: mouse escape sequences garbled after TUI exit](https://github.com/anomalyco/opencode/issues/20458)** — 4 👍, 7 comments. After exiting the TUI, mouse escape sequences (e.g., `35;89;19M...`) are dumped as raw text into the terminal. This corrupts the shell state and requires a `reset` to recover, a nasty frission for users in tmux or screen. The issue notes this is separate from the in-session garbling (#3199), suggesting the root cause is in the raw-mode teardown, not rendering.

8. **[#33318 / #42938: Go plan usage blocks models despite Zen balance fallback](https://github.com/anomalyco/opencode/issues/42938)** — Paid users on the Go plan report that reaching 100% usage blocks models for 12 hours, even with $39.89 in Zen balance and "Use balance" enabled. The documented fallback to Zen balance is not happening, so users are locked out of their primary models each month.

9. **[#40468: stuck in busy forever after toolcall](https://github.com/anomalyco/opencode/issues/40468)** — 5 comments. Users report the TUI entering an eternal busy spinner after a tool call, where even double-ESC cannot interrupt. The process is alive but unresponsive to input, requiring a full restart. This is a TUI-state-machine issue that causes lost work.

10. **[#34499: Wispr Flow dictation is not inserted into OpenCode input inside VS Code integrated terminal](https://github.com/anomalyco/opencode/issues/34499)** — 2 👍, 2 comments. Dictation works in other terminals but not in the VS Code integrated terminal on Windows. This points to specific raw-mode/input-handling differences that block text injection, frustrating users who rely on voice input as an accessibility or speed aid.

## Key PR Progress

1. **[#42952: fix(app): reduce session spinner CPU usage](https://github.com/anomalyco/opencode/pull/42952)** — Replaces 25 per-dot CSS opacity animations with a single pre-rendered APNG timeline. This directly addresses the high CPU overhead of the busy spinner that users observe with `top` and `htop`, improving battery life and fan noise on laptops.

2. **[#42949: fix(app): render code mode executions](https://github.com/anomalyco/opencode/pull/42949)** — Adds a dedicated Desktop renderer for Code Mode executions, showing child tool progress, input summaries, failed-call states, and runtime errors. This closes a visual blind spot where Code Mode work was invisible or ambiguously rendered.

3. **[#42944: fix(app): correct background subagent status](https://github.com/anomalyco/opencode/pull/42944)** — Classifies V2 background subagents only after the parent tool completes with a running child result, and stops the progress indicator when the child session becomes idle. This fixes false "running" badges that persisted after the work was done.

4. **[#42945: fix(app): clarify skill timeline presentation](https://github.com/anomalyco/opencode/pull/42945)** — Shows the skill icon, label, separator, and resolved skill name in timeline tool rows, with muted text for skill details. This makes it clearer which skill was invoked and what it did, reducing confusion in longer sessions.

5. **[#42948: chore(util): log spawned processes](https://github.com/anomalyco/opencode/pull/42948)** — Logs every cross-spawn process launch with executable, arguments, and working directory (excluding env vars and stdin). This adds much-needed diagnostics for investigating process churn and "who is running what" in complex sessions.

6. **[#42049: fix(tui): hide background badge on interrupted shells](https://github.com/anomalyco/opencode/pull/42049)** — The `Background` badge now renders only when a completed tool explicitly reports a detached running state. Fixes a misleading UI where interrupted or foreground shells displayed a "Background" badge.

7. **[#41144: fix(tui): clarify saved permission copy](https://github.com/anomalyco/opencode/pull/41144)** — Renames the persistent permission choice from "Allow always" to "Always allow" and corrects the description to note saved rules apply per-project. This removes incorrect claims about rules disappearing on restart.

8. **[#37392: fix(core): surface refusal category and explanation on content filter](https://github.com/anomalyco/opencode/pull/37392)** — Maps Anthropic `stop_reason: "refusal"` to a detailed `content-filter` finish instead of one hardcoded message. Users will finally see *why* a response was refused (category + explanation), improving debuggability and trust.

9. **[#37374: fix(core): stream shell progress tail](https://github.com/anomalyco/opencode/pull/37374)** — Publishes shell progress as a replacement snapshot of the latest 25 output lines with a truncation notice pointing to the full output path. This keeps logs bounded and avoids unbounded growth in long-running shell tools.

10. **[#37386: fix: check apply_patch move destinations](https://github.com/anomalyco/opencode/pull/37386)** — `apply_patch` now requests edit permission using both source *and* destination paths for moves. Previously, it only asked for the source, so a move into a new directory bypassed permission checks. This is a correctness/security hardening fix.

## Feature Request Trends

- **Session Management**: The most active theme. Requests include session favorites/pinning for quick access (#42940), persistent ordered session review navigation (#42863), and auto-syncing projects in the web UI from the server (#13626). Users want sessions to be first-class, persistent, and navigable objects, not ephemeral CLI artifacts.
- **Billing & Usage Transparency**: Users are increasingly requesting clearer visibility into which plan (free/Go/Zen) is active, when fallbacks trigger, and why they get blocked (#42938, #33318, #36506). The requests stop short of explicit dashboard features but demand that documented behavior (e.g., "Use balance" fallback) actually works.
- **Account Management**: Users are asking for self-service email updates (#42928) as they migrate away from services like Gmail. This is a practical identity-management gap.
- **Shell/Terminal Integration**: Continued interest in better integration with external tools: dictation (Wispr Flow, #34499) and clipboard workflows (Ctrl+C, #7957; VSCode Server clipboard, #41470). The theme is "works everywhere else in my terminal, why not in OpenCode?"

## Developer Pain Points

- **Stuck States are the #1 Reliability Frustration**: Multiple open issues describe sessions permanently stuck in "thinking…" or busy states with no visible error and no way to recover except restart (#32366, #40468, #40625, #36370). The combination of silent failures and no interrupt path is eroding user trust.
- **Silent Failures on Empty or 500 Responses**: When providers return empty completions (finish: unknown, 0 tokens) or intermittent 500 errors, OpenCode drops the response without surfacing an error (#41469, #38644). Users see the spinner, then nothing, with no log entry they can act on.
- **Billing/Quota Handling is Confusing and Buggy**: The cascade of issues around Go plan limits, Zen balance fallback, and free-tier limits (#42938, #33318, #36506) indicates a fragmented quota system with inconsistent enforcement. Users cannot predict when they'll be blocked or why their balance isn't used.
- **Terminal State Corruption**: Mouse escape sequence garbage after TUI exit (#20458) corrupts the shell, requiring a `reset`. Combined with the Ctrl+C exit trap (#7957), exiting OpenCode is a risky operation that can ruin the terminal session.
- **Process Leaks and High CPU**: V2 headless commands leak a 13.1 MiB `libopentui.so` in temp per invocation (#37671), and the session spinner consumes outsized CPU (#42952). These are resource-usage pain points that make OpenCode feel heavy for routine CLI tasks.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-08-17

---

## Today's Highlights

Qwen Code's agent-team orchestration and multi-agent features are the current development epicenter, with a dense cluster of new bugs filed by community members around task dispatch, message routing, and session stability. Concurrently, a substantial CI/CD hardening initiative is underway to isolate PAT-bearing jobs, lock review worktree leases, and contain command growth budgets. The daily `v0.21.11-nightly` release continues shipping, with a notable autofix footprint gate landed and a full DSW E2E benchmark rerun completed.

---

## Releases

**v0.21.11-nightly.20260817.195128a17a** — Nightly release with:
- **feat(autofix):** Deny-by-default footprint gate and positional window censuses ([PR #9156](https://github.com/QwenLM/qwen-code/pull/9156))

Additionally, the DSW EAS full E2E rerun was completed (referencing v0.21.12), covering SWE-bench Verified (500) and Terminal-Bench 2.0 (89) after scoping the package proxy to verifier dependency egress.

---

## Hot Issues

1. **[#9276 — Team members cannot send ordinary messages to their leader](https://github.com/QwenLM/qwen-code/issues/9276)** *(P2, bug)* — A critical multi-agent workflow defect where normal completions are misrouted as shutdown requests. High community engagement with 5 comments; signals a fundamental message-routing bug in the team protocol.

2. **[#9282 — Manual team task assignment persists without dispatching work](https://github.com/QwenLM/qwen-code/issues/9282)** *(P2, bug)* — `task_update({status: 'in_progress', owner: 'alice'})` succeeds but never delivers the task to the owner. A silent workflow failure that undermines manual team coordination.

3. **[#9291 — Unsupported image MIME can abort a Responses-compatible session](https://github.com/QwenLM/qwen-code/issues/9291)** *(P2, bug)* — `.heic` images forwarded as data URIs crash sessions. A robustness gap in image handling with an active PR (#9295) already targeting it.

4. **[#9290 — Interactive session crashes when opening an errored agent-team tab](https://github.com/QwenLM/qwen-code/issues/9290)** *(P2, bug, welcome-pr)* — A single render error in an incomplete team tab kills the entire session. Community member `netbrah` continues to surface multi-agent UI fragility.

5. **[#9283 — Agent-team prompts contradict automatic delivery and promise unavailable peer summaries](https://github.com/QwenLM/qwen-code/issues/9283)** *(P2, bug)* — Prompt/runtime mismatch: documentation promises features the runtime doesn't deliver and omits behaviors it does. Confusing for agent developers; a fix PR (#9284) is already in flight.

6. **[#9089 — PAT-bearing jobs share a host with untrusted branch code](https://github.com/QwenLM/qwen-code/issues/9089)** *(P1, security)* — Maintainer-flagged security issue requiring runner-level isolation. High severity; ongoing discussion around GitHub Actions architecture.

7. **[#9281 — task_list treats blank optional filters as active filters](https://github.com/QwenLM/qwen-code/issues/9281)** *(P2, bug)* — Empty strings in optional filter fields return `No tasks found.` instead of being treated as absent. A subtle but workflow-breaking tool behavior.

8. **[#8962 — cannot use qwen under tmux](https://github.com/QwenLM/qwen-code/issues/8962)** *(P2, UI bug)* — Long-standing flickering/performance issue under tmux and remote sessions; continues to affect developer productivity. Open since August 12 with 3 comments.

9. **[#5966 — Chinese IME fails intermittently in UI v0.19.3](https://github.com/QwenLM/qwen-code/issues/5966)** *(P2, UI bug)* — Persistent input-method failure; Chinese-speaking users cannot type properly, no error shown. Open since June with a welcome-pr tag.

10. **[#9278 — `/review` publish-time convergence advisory](https://github.com/QwenLM/qwen-code/issues/9278)** *(P2, feature)* — An in-progress design to break the "review loop" growth spiral by moving convergence control from LLM prose to operational telemetry. A significant internal engineering investment.

---

## Key PR Progress

1. **[#9263 — feat(review): review shell and CI scripts against the lanes that run them](https://github.com/QwenLM/qwen-code/pull/9263)** *(open, autofix/takeover)* — Adds a third path rule to the review skill requiring lane inventory before analysis; closes a gap where shell/CI scripts were reviewed in isolation.

2. **[#9295 — fix(core): omit image media the model endpoint cannot safely consume](https://github.com/QwenLM/qwen-code/pull/9295)** *(open)* — Direct fix for #9291: filters unsupported MIME types and undecodable bytes before forwarding.

3. **[#9284 — fix(core): align agent-team prompts and TeamCreate description with actual delivery](https://github.com/QwenLM/qwen-code/pull/9284)** *(open)* — Resolves #9283's prompt/runtime contradictions; updates docs to match the IDLE-forward behavior.

4. **[#9289 — fix(core): dispatch manually assigned team tasks to their owner](https://github.com/QwenLM/qwen-code/pull/9289)** *(open)* — Direct dispatch path for `task_update` with owner; closes the silent-failure gap from #9282.

5. **[#9292 — fix(cli): contain agent-tab render errors instead of exiting the session](https://github.com/QwenLM/qwen-code/pull/9292)** *(open)* — Moves agent-tab rendering behind non-fatal boundaries; addresses #9290's crash-on-error behavior.

6. **[#9211 — fix(review): lock the PR review worktree lease against concurrent sessions](https://github.com/QwenLM/qwen-code/pull/9211)** *(closed)* — Worktree lease now doubles as a lock; prevents mid-run deletion by concurrent sessions (#9205).

7. **[#9272 — fix(review): name each certification bar and defer degrade notes past admission](https://github.com/QwenLM/qwen-code/pull/9272)** *(open, autofix/takeover)* — Landed deferred suggestions from #9259; adds named certification bars and defers degrade notes to post-admission.

8. **[#9262 — feat(autofix): audit the approach instead of stopping on growth-budget breach](https://github.com/QwenLM/qwen-code/pull/9262)** *(open, autofix/takeover)* — On budget breach, the round now audits the approach rather than cold-stopping; keeps automation productive.

9. **[#9254 — fix(web-shell): show a boot fallback instead of a white screen](https://github.com/QwenLM/qwen-code/pull/9254)** *(open)* — Dependency-free boot watchdog renders a bilingual fallback with error and reload button on resource-load failures.

10. **[#9122 — feat(web-shell): improve sidebar session management](https://github.com/QwenLM/qwen-code/pull/9122)** *(open, autofix/takeover)* — Hover previews, smart truncation, running-session indicators, and search within the session sidebar.

---

## Feature Request Trends

- **Multi-agent team orchestration** — The dominant theme (5+ issues): message delivery guarantees, task assignment semantics, prompt accuracy, and UI resilience for agent teams.
- **CI/CD self-hardening** — Heavy investment in review automation: worktree leases, growth budgets, path-guard hardening, and convergence advisories.
- **Authentication expansion** — [#9275](https://github.com/QwenLM/qwen-code/issues/9275) requests GitHub Copilot sign-in; ecosystem adapter integrations ([#9294](https://github.com/QwenLM/qwen-code/issues/9294)) also appearing.
- **Session lifetime controls** — `sessionRotation` PR (#8927) adds per-channel session bounds, reflecting demand for predictable session management.
- **Review output quality** — Bilingual digests, body-limit budgeting, and Aone Code provider support are all actively in-flight.

---

## Developer Pain Points

- **Multi-agent workflow fragility** — Recurring issues (#9276, #9282, #9283) where the team runtime silently misbehaves: undelivered tasks, misrouted messages, and contradictory prompts. Trust in automated team orchestration is at stake.
- **UI stability on the terminal** — Tmux flickering (#8962) and intermittent Chinese IME failure (#5966) persist for weeks, directly impacting non-English-speaking developers' daily work.
- **Review loop growth spirals** — Community-visible friction: PRs running 5–17 review rounds with dozens of findings (#9264, #9280, #9285). Maintainers acknowledge the loop-control problem and are building operational tooling to address it.
- **Crash-on-error boundaries** — Multiple session-killing defects (#9290, #9291) where a single bad input ends the developer's interactive session — a frustrating experience for a daily-driver tool.
- **Silent configuration pitfalls** — Hard-coded file modes ignoring umask (#9250) and blank filters treated as active (#9281) are small but confusing behaviors that erode trust in tool semantics.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar).*