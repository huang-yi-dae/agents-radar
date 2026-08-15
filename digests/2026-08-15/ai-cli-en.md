# AI CLI Tools Community Digest 2026-08-15

> Generated: 2026-08-15 01:01 UTC | Tools covered: 7

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

# Cross-Tool AI CLI Comparison Report — 2026-08-15

## 1. Ecosystem Overview

The AI CLI tools landscape continues to consolidate around three priorities: reliability of long-running agent sessions, observability of multi-agent workflows, and OS-level integration stability. Windows and macOS desktop performance regressions dominate community complaints across Claude Code, Codex, and Copilot CLI, indicating that Electron-based surfaces remain the weakest link. Simultaneously, all major tools are converging on permission and sandbox hardening as a strategic differentiator rather than a compliance checkbox. The most active development areas are session lifecycle management (restore, archive, handoff) and converging review/retry loops that currently consume excessive developer attention.

## 2. Activity Comparison

| Tool | Issues (Hot/Tracked) | PRs (Active) | Release Status |
|---|---|---|---|
| Claude Code | 10 tracked (1 critical, 4 features) | 4 open | v2.1.233 (stable, frequent) |
| OpenAI Codex | 10 tracked (7 Windows/macOS perf) | 10 merged/active | 5 alpha releases (rust-v0.148.0-alpha.14–18) |
| Gemini CLI | 10 tracked (5 P1 bugs) | 9 merged/active | v0.56.0-nightly (nightly cadence) |
| Copilot CLI | 10 tracked (3 MCP OAuth regressions) | 3 closed/merged | v1.0.81-0 (stable, 2 releases in 24h) |
| Kimi Code CLI | 4 tracked (2 memory-system requests) | None | No new releases |
| OpenCode | 10 tracked (1 critical ID bug) | 10 merged/active | No new releases (patch releases via main) |
| Qwen Code | 10 tracked (3 CI E2E failures) | 10 merged/active | v0.21.12 (stable) + preview/nightly |

## 3. Shared Feature Directions

- **Session lifecycle management** (Claude Code #30869, #85272; Codex #24287, #34026; Copilot CLI #4477; Kimi #2269): Users across four tools are demanding unarchive/restore, reliable stop behavior, and cross-device session handoff. This is the strongest shared signal.
- **Multi-agent orchestration visibility** (Claude Code #24537, #75863; Gemini #22598; Copilot CLI #4306): A unified hierarchical dashboard of subagent activity is requested across three major tools, with background-task panels and trajectory-sharing as concrete asks.
- **Memory persistence and context management** (Kimi #1283, #1478; Claude Code #79217; Gemini #26522): Automatic project pattern extraction, user-defined memory layers, and configurable memory caps are being requested across tools with varying maturity.
- **MCP configuration compatibility** (Copilot CLI #4480, #4439; OpenCode #42662): Both tools are encountering OAuth and config-format friction from servers built for other frameworks — a sign of ecosystem fragmentation.
- **Permission profile granularity** (Codex PR #38673, #38651; Claude Code settings; Gemini #22093): Per-environment permission profiles, parallel to thread-level granularity, are being actively built in Codex and requested in Claude Code.

## 4. Differentiation Analysis

| Tool | Core Focus | Target User | Technical Approach |
|---|---|---|---|
| **Claude Code** | Deep IDE/desktop entanglement, subagent orchestration, security-guidance filtering | Enterprise developers, security-sensitive orgs | Node.js; heavy MCP ecosystem; opt-in gateway identity forwarding |
| **OpenAI Codex** | Cross-platform desktop stability, sandbox hardening, Rust-based TUI | Power users on Windows/macOS desktops; CI via Rust core | Rust core; Electron shell; gRPC-based architecture; per-environment permission snapshots |
| **Gemini CLI** | Agent reliability under constraints, PTY/resource hygiene | Linux-first developers; agent-intense workflows | TypeScript/Node; MessageBus architecture; silent retries with capacity TTL |
| **Copilot CLI** | GitHub-native integration, worktree/autopilot flows | GitHub-centric teams; enterprise orgs | JS/TS; GitHub Apps integrations; model catalog from GitHub settings |
| **Kimi Code CLI** | Persistent context, large-project navigation | Chinese-speaking developers; bilingual workflows | Bilingual-first; agent.md memory layer; SGLang backend support |
| **OpenCode** | Provider-agnostic protocol, local-first inference, TUI polish | Self-hosters; multi-provider users; local model runners | Go-based; V2 HTTP protocol; mDNS provider discovery; pluggable plugin system |
| **Qwen Code** | Web Shell first-class surface, autofix/review automation, benchmarks | Chinese cloud ecosystem; SWE-bench/terminal-bench evaluators | Python; Web Shell frontend; autofix agents; DingTalk integration |

## 5. Community Momentum & Maturity

**Rapid iteration:** OpenAI Codex is shipping 5 alpha releases every 24 hours with intense sandbox/permission work — the fastest cadence in the field. Qwen Code merges 10 substantial PRs per digest and now operates an internal autofix agent fleet to close its own issues.

**High engagement:** Claude Code has the most active issue discussions (63+ comments on a single Advisor bug, 96 upvotes) and the most sustained complaints around security filtering — indicating a large, vocal enterprise-user base. Copilot CLI's closed MCP regressions at 6 upvotes each understate impact due to rapid closure.

**Stable but slower:** Kimi Code CLI shows minimal PR/issue activity but a clear, disciplined roadmap signal around memory systems. Gemini CLI is in a bug-fixing phase with strong PR discipline (10 PRs targeting exact issues).

**Emerging risk:** Codex's Windows desktop performance cluster (7 issues with system-wide stutter) could erode trust; community demands for rollback are blunt and growing.

## 6. Trend Signals

- **Autofix loops are becoming a product feature.** Qwen Code's work on convergent review rounds, deferral queues, and round-aware posting bars is pioneering tooling for AI-driven code review that actually terminates. Expect this meta-pattern to migrate to other tools.
- **Session restoration and crash hygiene are the new trust battlegrounds.** Claude Code's mouse-tracking crash bug and OpenCode's 48-bit ID wraparound both reveal that degradation of session state is a top-3 user complaint. Robust recovery is a differentiator.
- **Security filters are overshooting on legitimate work.** Claude Code's clustered false-positive reports and Copilot CLI's OAuth tightening both suggest that safety mechanisms need dual-use aware calibration — or they will drive power users to switch tools.
- **Desktop performance regressions recur across vendors.** Electron/Chromium polling architectures are implicated in Codex, Claude Code, and Copilot CLI Windows issues. Raw process-spawn polling, HID discovery on main thread, and keychain-call stalls are anti-patterns to avoid in any new implementation.
- **Billing transparency is rising as a trust metric.** Unexpected $1,000 charges (Claude Code) and quota-to-token variance (17–20x) are generating disproportionate community conversation. Predictable quota burn is a product requirement.
- **Model catalog drift between server-side config and CLI behavior is systemic.** Copilot CLI and OpenCode both report org-enabled models missing from the CLI's picker. The fix pattern — forcing cache resets — is a stopgap; server-pushed catalog sync is the likely long-term solution.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report
**Data as of 2026-08-15 | Source: github.com/anthropics/skills**

---

## 1. Top Skills Ranking

The following are the most-discussed Skill submissions, ranked by community attention (comments + issue references):

### 1. `skill-creator` Windows & Evaluation Fixes (Multiple PRs)
**PRs:** [#1298](https://github.com/anthropics/skills/pull/1298) by MartinCajiao, [#1099](https://github.com/anthropics/skills/pull/1099) by joshuawowk, [#1050](https://github.com/anthropics/skills/pull/1050) by gstreet-ops
**Status:** All Open
**Functionality:** The `skill-creator` meta-skill's evaluation pipeline (`run_eval.py`, `run_loop.py`, `improve_description.py`) is broken—it reports 0% recall on every query, rendering the description-optimization loop useless. PRs target three core issues: the eval artifact not being installed as a real skill, Windows incompatibility with subprocess pipes (`[WinError 10038]`), and lack of `PATHEXT` handling for `claude.cmd`.
**Discussion Highlights:** Tied to Issues [#556](https://github.com/anthropics/skills/issues/556) and [#1169](https://github.com/anthropics/skills/issues/1169) with 12 and 3 comments respectively. The root problem is that no query ever triggers the skill being tested, making the entire eval loop optimize against noise. Multiple independent reproductions confirm this is the single most impactful bug in the repository—it blocks all data-driven Skill description improvements.

### 2. `document-typography` — Typographic Quality Control
**PR:** [#514](https://github.com/anthropics/skills/pull/514) by PGTBoos
**Status:** Open
**Functionality:** A quality-control Skill that catches orphan word wrap (1–6 words spilling to the next line), widow paragraphs (section headers stranded at page bottom), and numbering misalignment in AI-generated documents.
**Discussion Highlights:** Targets a universal pain point: Claude-generated documents consistently exhibit these typographic defects, but users rarely think to ask for typographic cleanup. The Skill is positioned as a post-processing gate for any document-generation workflow.

### 3. `pdf` — Case-Sensitive File Reference Fix
**PR:** [#538](https://github.com/anthropics/skills/pull/538) by Lubrsy706
**Status:** Open
**Functionality:** Fixes 8 case-sensitivity mismatches in `skills/pdf/SKILL.md` where `REFERENCE.md` is referenced instead of `reference.md`. Breaks skill operation on case-sensitive filesystems (Linux/macOS).
**Discussion Highlights:** Demonstrates the ecosystem's attention to spec-compliance details across OS platforms. No conceptual debate—pure correctness fix with high adoption value.

### 4. `odt` — OpenDocument Text Creation & Conversion
**PR:** [#486](https://github.com/anthropics/skills/pull/486) by GitHubNewbie0
**Status:** Open
**Functionality:** Covers creating, filling, reading, and converting OpenDocument Format files (.odt, .ods), including HTML round-tripping. Triggers on any OpenDocument/LibreOffice/ISO-standard mention.
**Discussion Highlights:** Addresses the enterprise-adjacent demand for LO/OOXML interoperability. Long open period (since March) suggests maintainers are reviewing scope carefully—the PR proposes a broad platform skill rather than a narrow utility.

### 5. `frontend-design` — Clarity & Actionability Overhaul
**PR:** [#210](https://github.com/anthropics/skills/pull/210) by justinwetch
**Status:** Open
**Functionality:** Major revision of the frontend-design skill to ensure every instruction is executable in a single conversation, with specific guidance to steer behavior rather than vague principles.
**Discussion Highlights:** Represents the community's push to convert document-like skills into operational, context-efficient instructions. Overlaps with Issue [#202](https://github.com/anthropics/skills/issues/202) which critiques `skill-creator` for the same anti-pattern.

### 6. `servicenow` — Enterprise Platform Skill
**PR:** [#568](https://github.com/anthropics/skills/pull/568) by Vanka07
**Status:** Open
**Functionality:** Broad ServiceNow platform assistant covering ITSM, ITOM, ITAM/SAM, FSM, HRSD/CSM, SPM/PPM, Vulnerability Response, Security Incident Response, and IntegrationHub.
**Discussion Highlights:** Patterns with the `odt` and `document-typography` PRs: community members are submitting deep enterprise-domain skills, betting that Claude Code adoption is spreading to corporate environments. Longest-lived open PR (since March), suggesting maintainers are cautious about scope.

### 7. `pyxel` — Retro Game Development
**PR:** [#525](https://github.com/anthropics/skills/pull/525) by kitao
**Status:** Open
**Functionality:** Skill for [pyxel-mcp](https://github.com/kitao/pyxel-mcp), an MCP server for the Pyxel retro/pixel-art game engine. Covers the write → run-and-capture → inspect → iterate loop.
**Discussion Highlights:** Notable because the author is also the MCP server maintainer. Represents the ecosystem's growing pattern of MCP-server authors shipping companion Claude Code Skills for adoption and discoverability.

---

## 2. Community Demand Trends

From issue activity, the most-anticipated Skill directions are:

**A. Skill-Ecosystem Meta-Tools (Highest Demand)**
The dominant demand is for meta-skills that improve the Skills ecosystem itself: `skill-quality-analyzer`, `skill-security-analyzer`, and `skill-creator` reliability fixes receive the most concentrated attention. The community wants tooling to validate, test, and secure Skills before distribution.

**B. Enterprise/Domain Integration Skills**
Multiple issues and PRs target SharePoint Online handling, ServiceNow platforms, and ODT/OpenDocument formats. The demand comes from enterprise developers who need Claude to operate legacy business tools with proper access-control awareness.

**C. Trust-Boundary & Security Governance**
Issue [#492](https://github.com/anthropics/skills/issues/492) (43 comments, the most-commented issue in the repo) flags that community skills distributed under the anthropic namespace create a trust-boundary vulnerability. Related proposals like `agent-governance` (Issue [#412](https://github.com/anthropics/skills/issues/412)) show demand for Skills that enforce policy and audit agent behavior.

**D. Context-Window Efficiency**
Issue [#1487](https://github.com/anthropics/skills/issues/1487) reports `claude-api` skill injecting ~156k tokens in a single tool call. Combined with Issue [#189](https://github.com/anthropics/skills/issues/189) (duplicate skills inflating context), the community is actively demanding Skills that are lean and avoid eager context consumption. The compact-memory proposal (Issue [#1329](https://github.com/anthropics/skills/issues/1329)) takes the opposite approach: symbolic notation to reduce prose overhead in long-running agents.

**E. Org-Wide Sharing & Distribution**
Issue [#228](https://github.com/anthropics/skills/issues/228) (8 👍, 16 comments) requests direct org-wide skill sharing in Claude.ai, showing that Skills have outgrown personal experimentation and are becoming team infrastructure.

---

## 3. High-Potential Pending Skills

These active PRs are strong candidates for near-term merge based on community traction and maintainer responsiveness:

- **[#1298](https://github.com/anthropics/skills/pull/1298) — `skill-creator` eval fix (MartinCajiao):** The most visibly demanded fix in the ecosystem. The scope is broad (eval artifact install, Windows streaming, trigger detection, parallel workers) and directly unblocks #556 and #1169. The author consolidated feedback from the other run_eval PRs; merge likelihood is high.

- **[#1538](https://github.com/anthropics/skills/pull/1538) — Spec-compliance fix (bechor25):** The most recent fix PR, addressing two skills that fail `skills-ref validate` against the very spec this repo maintains. Low-risk, high-correctness fix that brings `template/SKILL.md` naming in line with its directory.

- **[#514](https://github.com/anthropics/skills/pull/514) — `document-typography` (PGTBoos):** A universal post-processing skill with zero domain friction. Likely to merge because it is orthogonal to all existing skills and addresses a defect every document-generation workflow hits.

- **[#538](https://github.com/anthropics/skills/pull/538) — PDF case-sensitivity fix (Lubrsy706):** Correctness fix with no behavioral debate. Merge is straightforward unless the issue list reveals conflicting changes to the same file.

- **[#541](https://github.com/anthropics/skills/pull/541) — DOCX `w:id` collision fix (Lubrsy706):** Fixes document corruption when tracked changes collide with existing bookmarks. Tied to the well-documented OOXML whitespace-corruption issue (#12); likely to merge alongside #538.

- **[#1367](https://github.com/anthropics/skills/pull/1367) — `self-audit` reasoning quality gate (YuhaoLin2005):** A meta-skill for auditing AI output before delivery, with mechanical verification and four-dimension reasoning audit. Backed by a proposal issue (#1385) with active discussion. Represents the governance direction the community is pushing toward.

---

## 4. Skills Ecosystem Insight

The community's most concentrated demand is for **reliable, spec-compliant tooling to create, validate, and secure Skills themselves** — meta-skills and fixes to the Skill authoring/eval pipeline — rather than for any single domain-specific Skill.

---

## Claude Code Community Digest — 2026-08-15

### Today's Highlights

v2.1.233 ships GitLab merge request support for `--worktree` and agent views, plus an opt-in `forward_user_identity` setting for gateway proxies. However, the community is increasingly vocal about false-positive cyber-safety blocks halting legitimate security and reverse-engineering work, with several closed issues surfacing a pattern. A new Windows Git Bash regression in 2.1.232 causing unsuppressable permission prompts is the fastest-gaining bug.

### Releases

- **v2.1.233**
  - Added GitLab merge request URL support to `--worktree` flag and `claude agents` view (MRs render as `!N`)
  - Added opt-in `forward_user_identity` apps gateway setting on Anthropic upstreams to send signed-in user identity as headers (for proxies)
  - Source: [v2.1.233](https://github.com/anthropics/claude-code/releases/tag/v2.1.233)

### Hot Issues

1. **[BUG] No response from API error when Advisor is triggered** — Samjin | 63 comments | 96 👍
   This long-standing issue (open since June) finally saw updates today. Users on `sonnet` base models hit an unhandled error path when the Advisor feature triggers, leaving the session in a retry loop. High engagement indicates a widespread impact on daily workflows. [Issue #69238](https://github.com/anthropics/claude-code/issues/69238)

2. **[BUG] Windows Git Bash: static-analysis false-positives on read-only cd-compound commands** — Aura-Intel | 9 comments | 9 👍
   Introduced in 2.1.232, auto-mode permissions now flag read-only `cd` compound commands, causing constant, unsuppressible permission prompts on Windows Git Bash. Users report identical behavior across two independent machines — a textbook regression with clear repro. [Issue #86619](https://github.com/anthropics/claude-code/issues/86619)

3. **[Bug][cyber] ClAudit false-positive in DJI — req_011CcV5LqSNPbmMRzwBV5iGx** — sworrl | 3 comments | Closed
   A clustered set of closed issues (also #71986, #71985, #71978, #71965, #71966) all from the same user, documenting repeated cybersecurity-filter false-positives: blocked drone firmware downloads, white-box AES reverse-engineering, and even OG-tag updates. These were all closed (likely as not-actionable), but they paint a concerning picture of over-aggressive filtering. [Issue #71992](https://github.com/anthropics/claude-code/issues/71992)

4. **[FEATURE] Unarchive Claude Code sessions in desktop app option** — reyewon | 29 comments | 57 👍
   Closed today: users want the ability to unarchive sessions in the desktop app. The volume of comments (29) and upvotes (57) suggests archived sessions are accumulating without recovery paths, hindering long-lived projects. [Issue #30869](https://github.com/anthropics/claude-code/issues/30869)

5. **[FEATURE] Agent Hierarchy Dashboard — unified real-time visualization** — woodrowpearson | 16 comments | 17 👍
   Cross-cutting enhancement request covering TUI + Desktop + IDE views. The community wants a real-time, hierarchical view of multi-agent workflows, reflecting growing adoption of subagent orchestration patterns. [Issue #24537](https://github.com/anthropics/claude-code/issues/24537)

6. **[BUG] Crash leaves the terminal in mouse-tracking mode** — ThatDragonOverThere | 2 comments
   Clever bug report: the TUI's restore handler is registered for graceful exit only, so a crash never disables mouse-tracking mode. After any crash, raw escape sequences flood the shell prompt on every mouse event. Poor crash hygiene with frustrating recovery. [Issue #84029](https://github.com/anthropics/claude-code/issues/84029)

7. **[BUG] Persistent ECONNRESET / "Connection lost mid-response" on all Code surfaces** — MaksymLapshyk | 2 comments
   On Windows 11 (v2.1.229), all Claude Code surfaces throw ECONNRESET mid-response while raw HTTPS to `api.anthropic.com` is healthy. Flagged as duplicate, it continues to gain attention — likely a proxy/TLS/keep-alive issue with the Node client. [Issue #86473](https://github.com/anthropics/claude-code/issues/86473)

8. **[BUG] Same-day 17x variance in tokens charged per weekly quota point** — nico-view | 2 comments
   Billing transparency concern: token-to-quota conversion varies wildly (up to 20x Max) within a single day. Users cannot reliably predict quota burn — a cost-forecasting nightmare for heavy users. [Issue #84607](https://github.com/anthropics/claude-code/issues/84607)

9. **[Billing][Bug] $995.67 in two Individual-plan auto-recharges after included limits reset** — COOLak | 1 comment
   A billing incident where auto-recharges fired twice post-reset. The 1-comment count understates severity: a ~$1,000 unexpected charge is the worst possible user experience. Expect escalation. [Issue #83062](https://github.com/anthropics/claude-code/issues/83062)

10. **[FEATURE] VSCode extension: add a "Background Tasks" panel (parity with Desktop app)** — codegor | 6 comments | 8 👍
    VS Code users are asking for feature parity with the Desktop app's background tasks panel, which they rely on for concurrent work visibility. A clear signal that the extension is mission-critical for multi-tasking developers. [Issue #75863](https://github.com/anthropics/claude-code/issues/75863)

### Key PR Progress

1. **[OPEN] fix(security-guidance): preserve Python probe errors** — aayush598
   Fixes #86709: `sg-python.sh` now preserves stderr when probing Python interpreters, so users see actual diagnostics instead of a generic "no interpreter found" message. Direct UX improvement for Python environment setup. [PR #86746](https://github.com/anthropics/claude-code/pull/86746)

2. **[OPEN] feat: add shell completions (bash, zsh, fish) that stay in sync with the installed CLI** — 5hal1n
   Adds `completions/` with tab-completion for bash (stock macOS 3.2-compatible), zsh, and fish, plus install documentation. Addresses a long-standing gap in CLI ergonomics. [PR #86626](https://github.com/anthropics/claude-code/pull/86626)

3. **[OPEN] Create pylint.yml** — KrypticKode007
   A minimal CI workflow addition requesting Python linting. Unclear maintainer interest, but signals community willingness to contribute to repo health. [PR #83890](https://github.com/anthropics/claude-code/pull/83890)

4. **[OPEN] add the missing source to claude code** — tornikeo
   A long-open (since March) documentation/source fix. Stale PR, low importance for the core product. [PR #41611](https://github.com/anthropics/claude-code/pull/41611)

### Feature Request Trends

- **Archival & session-lifecycle management:** Users strongly request unarchiving sessions and ways to view/restore archived projects (e.g., #30869, #85272 — "Archiving removes it with no way to view or restore").
- **Multi-agent orchestration visibility:** A unified Agent Hierarchy Dashboard (#24537) and VSCode Background Tasks parity (#75863) both point to a need for better observability of parallel agents.
- **Configuration flexibility for memory & limits:** Making the MEMORY.md 200-line/25KB cap configurable (#79217) and resuming agent sessions in workflows (#86089) reflect power users hitting hardcoded constraints.
- **Disable prompt suggestions:** Requests to disable in-app prompt suggestions (#66117) show a desire for cleaner, less opinionated UI.
- **Persistent browser contexts via MCP:** The Browser Agent MCP lacks listability of persisted contexts (#86807) — a gap vs. Browserbase for automation users.

### Developer Pain Points

- **Cybersecurity filter false-positives are the #1 systemic complaint.** Six issues in this digest are from a single user (`sworrl`) whose legitimate drone-firmware and reverse-engineering work was halted. Separately, `rennf93` reports WAF development (rate-limiting, IP-banning code) triggering the dual-use safeguard repeatedly, forcing model-switches over 5 days. The pattern: the filter is too aggressive on security-related code, interrupting authorized work.
- **Windows-specific regressions keep recurring.** Git Bash permission prompts (#86619) and ECONNRESET mid-response (#86473) are active, reproducible, and cross-cutting. Windows remains the platform where regressions cluster.
- **Crash and recovery hygiene is weak.** The mouse-tracking bug (#84029) is emblematic of a deeper issue: cleanup handlers are registered only for graceful paths. Users are left with damaged terminals after crashes.
- **Billing transparency is a growing trust issue.** A ~$1,000 auto-recharge incident (#83062) and wild token-to-quota variance (#84607) both shook user trust. The 17x variance number has been picked up as a talking point.
- **Desktop app stability concerns on macOS:** A ~107s startup beachball caused by `ReadMacOSKeychainCertificates` on the main thread (#76079) is still open — a blocking perf issue for desktop users.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-08-15

## Today's Highlights

The Codex team shipped five rapid-fire `rust-v0.148.0-alpha` releases (alpha.14 through alpha.18) with minimal public notes, signaling intense internal iteration. Meanwhile, the community is squarely focused on a Windows desktop performance crisis: multiple new issues report system-wide stutter, input lag, and kernel-pool leaks following the latest `26.810.x` app releases. On the development side, a substantial wave of TUI startup improvements and sandbox permission hardening merged, including a fix for Thai text deletion in the composer and per-environment permission profiles.

## Releases

**rust-v0.148.0-alpha.14 → alpha.18** — Five new alpha releases in the last 24 hours with no detailed changelogs. The rapid cadence suggests active stabilization of the Rust CLI core. Users should expect the usual alpha risk; watch for breaking changes in session restore and TUI behavior.

## Hot Issues

1. **Windows 11 system-wide mouse lag + 10% CPU idle CPU** — [#38583](https://github.com/openai/codex/issues/38583)  
   New in `26.813.12317`, the ChatGPT/Codex Windows app causes persistent mouse lag and CPU usage even when idle. This is the newest entry in a worrying trend of recent releases degrading Windows performance.

2. **Entire PC stutters; exit fixes it immediately** — [#38554](https://github.com/openai/codex/issues/38554)  
   User reports that the `26.810.4967.0` update makes *the entire PC* stutter, and fully quitting Codex resolves it instantly. 8 comments in the first day; community is demanding a rollback.

3. **Mouse stutter without elevation** — [#38546](https://github.com/openai/codex/issues/38546)  
   Another `26.810.x` Windows report: severe cursor stutter occurs when the app runs *without* admin elevation, implicating permission-bound polling or HID behavior rather than a simple rendering bug.

4. **Chrome native host retry loop consumes a CPU core** — [#38510](https://github.com/openai/codex/issues/38510)  
   Post-update regression where the Chrome native host enters a retry loop, pegging a CPU core and causing keyboard/mouse lag. Points to a broken handshake between the app and bundled Chromium.

5. **New Codex release "very unstable", crashes constantly on macOS** — [#38637](https://github.com/openai/codex/issues/38637)  
   `26.810.41047` on macOS crashes within minutes and can't open long chats. Community reaction is blunt: "Please revert."

6. **macOS severe performance regression: 100%+ CPU, 10+ GB RAM** — [#38468](https://github.com/openai/codex/issues/38468)  
   Another `26.810.41047` complaint, this time on Apple Silicon. UI hangs and memory ballooning suggest a leak introduced in this exact build.

7. **Codex App freezes/stutters on Windows 11 Pro** — [#20214](https://github.com/openai/codex/issues/20214)  
   The oldest open issue on this digest (since April) with **101 comments and 84 upvotes**. Persistent freezing despite "sufficient" resources (Ryzen 5, 32 GB). This remains the community's most-flagged unresolved Windows bug.

8. **PowerShell spawning every second causes high CPU** — [#25453](https://github.com/openai/codex/issues/25453)  
   Desktop spawns short-lived `powershell.exe` processes each second for full-process polling. Long-standing (May), still open. Combining this with the new `26.8xx` lag reports suggests the polling architecture is a prime suspect.

9. **Codex Desktop stuck in "Thinking"; Stop fails** — [#24287](https://github.com/openai/codex/issues/24287)  
   Accepted prompts get stuck with no UI escape; turns can even disappear after restart. Frustrating session management bug that has eluded a fix since May.

10. **HID discovery blocks Electron main thread** — [#33912](https://github.com/openai/codex/issues/33912)  
    `Work Louder/Codex Micro` HID device discovery blocks the entire app on Windows. Community notes that a niche hardware integration shouldn't be able to freeze the whole app.

## Key PR Progress

1. **[#38673](https://github.com/openai/codex/pull/38673) — Honor per-environment permission profiles**  
   Resolves `permission_profile` per environment config; Ready environments can override thread permissions, while FromThread configs inherit. This is a meaningful step for security-minded multi-workspace setups.

2. **[#38651](https://github.com/openai/codex/pull/38651) — Move permission profile snapshots into the protocol**  
   Defines a shared protocol model for permission snapshots, decoupling the sandbox logic from concrete permission implementations. Cleaner architecture for auditability and forward-compat.

3. **[#38660](https://github.com/openai/codex/pull/38660) — Enforce managed deny-read rules in the Windows sandbox**  
   Windows sandbox now fails closed if it cannot preserve filesystem deny rules; unreadable paths stay unreadable across setup refreshes. Directly hardens the sandbox against bypasses.

4. **[#38650](https://github.com/openai/codex/pull/38650) — Canonicalize default namespaces in gRPC subscription filters**  
   Normalizes tool invocations and subscription filters; treats missing/empty namespaces as aliases for `functions`. Prevents silent notification-matching failures.

5. **[#38645](https://github.com/openai/codex/pull/38645) — Deliver gRPC code-mode notifications without truncation**  
   Removes the arbitrary 1,024-byte limit and truncation suffix on notifications. Oversized multibyte text now arrives intact — important for long code-mode outputs.

6. **[#38664](https://github.com/openai/codex/pull/38664) — Resolve local JSON Schema refs in Code Mode**  
   Fixes `$ref` resolution so Code Mode no longer renders document-local references as `unknown`. Generated TypeScript declarations now include referenced input/structured-output shapes.

7. **[#38642](https://github.com/openai/codex/pull/38642) — Keep the composer editable during TUI startup**  
   Adds a provisional composer that captures text and cursor position while config and app-server init run. Users can draft prompts immediately rather than waiting for the main TUI.

8. **[#38641](https://github.com/openai/codex/pull/38641) — Harden TUI startup input handling**  
   Prevents buffered keys/control sequences during bootstrap from accidentally selecting or confirming actions, while preserving intentional typeahead.

9. **[#38639](https://github.com/openai/codex/pull/38639) — Render initial TUI session header before input**  
   Drains queued app events until the header is installed before handling input; also fixes a leading-separator layout glitch. Polishes the startup UX.

10. **[#38662](https://github.com/openai/codex/pull/38662) — Delete Thai combining marks one at a time**  
    Backspace now removes Thai vowel/tone marks individually instead of the whole grapheme cluster. Editorial fix for IME-heavy languages.

## Feature Request Trends

- **Repository-aware task handoff** ([#34582](https://github.com/openai/codex/issues/34582)): Users want sanitized, cross-workspace context transfer between Codex App and CLI, with shared state contracts.
- **Smart stop behavior in session management**: Multiple issues (e.g., [#24287](https://github.com/openai/codex/issues/24287), [#34026](https://github.com/openai/codex/issues/34026)) demand that "Stop" reliably cancels ongoing turns and that stuck "Thinking" states be recoverable.
- **Diagnostics for Git project association** ([#24484](https://github.com/openai/codex/issues/24484)): Users want clear warnings when Git safe.directory/ownership errors break project association, rather than silent failures.
- **Restore removed commit attribution** ([#31619](https://github.com/openai/codex/issues/31619)): CLI users are asking to bring back commit attribution in generated patches/commits.
- **Broader model availability on Bedrock** ([#37160](https://github.com/openai/codex/issues/37160)): Ultra reasoning toggle is missing for GPT-5.6 on Amazon Bedrock; catalog stops at Max.

## Developer Pain Points

- **Windows desktop performance is the #1 complaint.** The cluster of `26.8xx` regressions (#38583, #38554, #38546, #38510) all describe system-wide stutter, mouse lag, and CPU pegging. Root-cause hypotheses from the community center on process polling (#25453), Chrome native-host retries, and HID discovery (#33912). With #20214 at 101 comments, trust in Windows desktop stability is eroding.
- **The macOS `26.810.41047` build is also implicated.** Crashes, 100%+ CPU, and multi-GB memory spikes (#38637, #38468) suggest a cross-platform leak or regression introduced in that release.
- **Sandbox/permission complexity is a recurring theme.** Users are hitting confusing permission fallbacks and network/execution policy gaps; the PR wave (#38673, #38651, #38660) indicates active work here, but user-facing docs/tooling still lag.
- **Rate-limit and quota UI remains opaque.** Users report weekly limits not resetting on time and compact operations returning 404s (#37442, #38323), adding friction to long-running workflows.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest - 2026-08-15

## Today's Highlights
A surge of automated "SSR Agent" PRs landed today, addressing long-standing bugs around subagent recovery, TUI hangs, and TypeScript build failures. The most impactful fix targets issue #22323, where subagents hitting `MAX_TURNS` were incorrectly reporting `GOAL` success, masking real interruptions. Community-reported pain points around agent hangs, shell command stalls, and PTY resource leaks continue to dominate the issue tracker.

## Releases
- **v0.56.0-nightly.20260814.gc0d192452** - Includes e2e test stabilization for file-system-interactive tests on slow runners, and implements context-aware silent retries with availability TTL for capacity errors (PR #28793).

## Hot Issues
1. **[#22323: Subagent recovery after MAX_TURNS is reported as GOAL success](https://github.com/google-gemini/gemini-cli/issues/22323)** - P1 bug where `codebase_investigator` subagent reports `status: "success"` despite hitting the turn limit. This masks real failures and undermines trust in agent outcomes. A fix PR (#28815) is already in review.

2. **[#21409: Generalist agent hangs forever](https://github.com/google-gemini/gemini-cli/issues/21409)** - High-impact (8 👍) issue where deferring to the generalist agent causes indefinite hangs, even for trivial tasks like folder creation. Users report waiting up to an hour before cancelling.

3. **[#25166: Shell command execution gets stuck with "Waiting input"](https://github.com/google-gemini/gemini-cli/issues/25166)** - P1 bug where the CLI hangs after simple shell commands complete, showing "Awaiting user input" indefinitely. This is a core workflow blocker.

4. **[#21968: Gemini does not use skills and sub-agents enough](https://github.com/google-gemini/gemini-cli/issues/21968)** - Anecdotal but consistent reports that the model ignores custom skills and sub-agents unless explicitly instructed, limiting the value of these features.

5. **[#26522: Stop Auto Memory from retrying low-signal sessions indefinitely](https://github.com/google-gemini/gemini-cli/issues/26522)** - Auto Memory re-processes low-value sessions forever if the extraction agent skips them, wasting tokens and compute.

6. **[#21983: Browser subagent fails in Wayland](https://github.com/google-gemini/gemini-cli/issues/21983)** - P1 bug where the browser agent fails on Wayland display servers, breaking automation for Linux users with modern display setups.

7. **[#22093: (Sub)agents running without permission since v0.33.0](https://github.com/google-gemini/gemini-cli/issues/22093)** - Regression where subagents execute despite agents being disabled in all configurations. Users expected only MCP functionality.

8. **[#24246: Gemini CLI encounters 400 error with > 128 tools](https://github.com/google-gemini/gemini-cli/issues/24246)** - API limit errors when too many tools are enabled. Users expect smarter scoping of tools rather than brute-force enabling everything.

9. **[#22672: Agent should stop/discourage destructive behavior](https://github.com/google-gemini/gemini-cli/issues/22672)** - Model occasionally uses destructive commands like `git reset --force` when safer alternatives exist, risking data loss in complex workflows.

10. **[#20079: ~/.gemini/agents/filename.md not recognized if symlink](https://github.com/google-gemini/gemini-cli/issues/20079)** - P2 bug where symlinked agent definition files are silently ignored, breaking dotfile management setups.

## Key PR Progress
1. **[PR #28815: Preserve original termination reason during subagent recovery](https://github.com/google-gemini/gemini-cli/pull/28815)** - Fixes #22323 by ensuring `MAX_TURNS` and `TIMEOUT` terminations are not misreported as `GOAL` success even when `complete_task` succeeds during grace recovery.

2. **[PR #28812: Prevent indefinite TUI hang by adding execution timeouts](https://github.com/google-gemini/gemini-cli/pull/28812)** - Fixes #21477 by adding timeouts to `getProcessInfo()`'s `execAsync` calls, which could hang indefinitely on bare Linux terminals at "Initializing...".

3. **[PR #28814: Fix TypeScript strict-null errors in integration tests](https://github.com/google-gemini/gemini-cli/pull/28814)** - Resolves build failures caused by strict-null violations in integration test files.

4. **[PR #28813: Add composite flag to packages/cli tsconfig](https://github.com/google-gemini/gemini-cli/pull/28813)** - Fixes #21911 where root builds failed because `evals/tsconfig.json` referenced `../packages/cli` without `"composite": true` configured.

5. **[PR #28816: Fix silent hang in MessageBus.request when publish fails](https://github.com/google-gemini/gemini-cli/pull/28816)** - Fixes #22588 by properly registering failure handlers on `this.publish()` floating promise, which previously caused 60-second silent hangs.

6. **[PR #28817: Retain executing subagent tool calls in hook state](https://github.com/google-gemini/gemini-cli/pull/28817)** - Fixes #22589 where first-seen subagent tool calls in `Executing` status were dropped before entering hook state.

7. **[PR #20916: Prevent PTY file descriptor leak in ShellExecutionService](https://github.com/google-gemini/gemini-cli/pull/20916)** - Long-running PR (since March) finally merged, fixing system-wide PTY exhaustion (macOS `kern.tty.ptmx_max` = 511) by properly closing PTY masters after process exit.

8. **[PR #27154: Synchronously delete active PTY entries to prevent memory leak](https://github.com/google-gemini/gemini-cli/pull/27154)** - Fixes critical FD leak by moving `activePtys.delete(ptyPid)` out of a Promise `.then()` where background log stream failures prevented cleanup.

9. **[PR #28738: Allow agents to call agents](https://github.com/google-gemini/gemini-cli/pull/28738)** - Implements #22092 by letting subagents delegate to other subagents via `tools:` frontmatter, enabling recursive delegation workflows.

10. **[PR #28819: Fix misleading admin error for personal accounts](https://github.com/google-gemini/gemini-cli/pull/28819)** - Fixes #24587 where personal account users selecting unavailable models saw enterprise-specific error messages that confused the actual problem.

## Feature Request Trends
- **Agent self-awareness and control**: Multiple requests (#21432, #21968, #22672) ask for agents to better understand their own capabilities, use available skills proactively, and avoid destructive operations.
- **Subagent delegation**: Requests for subagents to spawn other subagents (#22092, PR #28738), and for subagent trajectories to be visible and shareable via `/chat share` (#22598).
- **AST-aware tooling**: An EPIC (#22745) proposes AST-aware file reads, searches, and codebase mapping to reduce token noise and improve navigation precision.
- **Zero-dependency sandboxing**: Proposal (#19873) to leverage Gemini 3's native bash affinity with OS-level sandboxing and post-execution intent routing.
- **Robust evaluation infrastructure**: EPIC (#24353) outlining the need for component-level behavioral evaluations beyond the current 76 tests across 6 model versions.

## Developer Pain Points
- **Hangs and indefinite stalls**: Recurring theme across generalist agent (#21409), shell execution (#25166), MessageBus (#22588), and TUI initialization (#21477) — the CLI frequently hangs without clear errors or timeout recovery.
- **Agent reliability and truthfulness**: The `MAX_TURNS` misreporting (#22323) erodes trust in agent status reporting. Users need accurate termination reasons to debug failures.
- **Resource leaks in long-running sessions**: PTY file descriptor exhaustion (#15945, PR #20916) and memory leaks (PR #27154) make the CLI unstable for heavy daily use.
- **Configuration not respected**: Regressions where subagents run despite being disabled (#22093), settings.json overrides ignored (#22267), and symlinked agent files not recognized (#20079) frustrate users who invested in custom setups.
- **Tool/session bloat**: The 400 error with >128 tools (#24246) and Auto Memory's infinite retry behavior (#26522) highlight scaling issues as users add more plugins and sessions.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**Date: 2026-08-15**

---

## Today's Highlights
Release v1.0.81-0 and v1.0.80 shipped within the last 24 hours, both containing model configuration updates. A cluster of new issues highlights two recurring pain points: a pattern of MCP OAuth regressions across recent versions (affecting Atlassian and GitLab servers) and multiple reports of model availability inconsistencies between GitHub settings and CLI behavior, particularly around Claude models.

---

## Releases
Two new versions were published in the last 24 hours:

- **v1.0.81-0** (2026-08-15) — Model configuration updates.
- **v1.0.80** (2026-08-14) — Model configuration updates; includes fixes for a `-w` worktree session restart conflict ([#4493](https://github.com/github/copilot-cli/issues/4493)) and an ongoing MCP OAuth regression ([#4490](https://github.com/github/copilot-cli/issues/4490)).

---

## Hot Issues
1. **[#4480: Atlassian MCP OAuth fails with "Incompatible authorization server"](https://github.com/github/copilot-cli/issues/4480)** — *Closed.* Regression from v1.0.71; reconnect to Atlassian MCP fails during OAuth discovery. High community engagement (6 👍) indicates many users are blocked on this integration.

2. **[#4345: Reasoning effort 'medium' unsupported for claude-haiku-4.5](https://github.com/github/copilot-cli/issues/4345)** — When specific feature flags are active, sub-agent execution repeatedly fails with a model configuration error. Points to a mismatch between server-side feature flag rollout and client-side model parameter validation.

3. **[#4390: Enabled org models missing from catalogue](https://github.com/github/copilot-cli/issues/4390)** — Anthropic models (Sonnet 5, Opus 5) and Kimi K3 explicitly enabled in Copilot Business settings are unavailable in the CLI. This blocks enterprise teams relying on their org's approved model set.

4. **[#4422: All Claude models disabled under CLI model selection](https://github.com/github/copilot-cli/issues/4422)** — Personal Enterprise account users report Claude models disappear from selection despite being enabled in settings. Persistent across version rollbacks, suggesting a server-side or cache issue.

5. **[#4439: GitLab MCP OAuth metadata rejected (RFC 8414 issuer mismatch)](https://github.com/github/copilot-cli/issues/4439)** — Self-managed GitLab MCP server authentication fails with the same class of OAuth issuer validation error as the Atlassian regression. Indicates a broad MCP OAuth compatibility problem.

6. **[#4499: Fatal "Committing semi space failed" OOM in autopilot](https://github.com/github/copilot-cli/issues/4499)** — Long-running autopilot session crashes with a V8 heap OOM despite the heap being far from its limit; points to a host-RAM commit failure rather than a heap-size issue, likely a memory-management bug.

7. **[#4306: Subtasks freeze and stop responding](https://github.com/github/copilot-cli/issues/4306)** — Autopilot fleet mode sessions eventually stop responding when looping between agents. Community reports indicate a need for more robust agent loop handling.

8. **[#4491: /spawn template contradicts its singular-spawn contract](https://github.com/github/copilot-cli/issues/4491)** — The expanded prompt template can instruct the agent to reuse an existing session, potentially leading to unwanted cross-session writes. This is a safety concern for session isolation.

9. **[#4346: MCP registry policy fetch returns 403 in CI](https://github.com/github/copilot-cli/issues/4346)** — *Closed.* GITHUB_TOKEN authentication fails to fetch MCP registry policies, blocking non-default MCP servers in GitHub Actions. Critical for CI adoption.

10. **[#4497: (PR) Handle fork PR associations in invalid-label writer](https://github.com/github/copilot-cli/pull/4497)** — Not strictly an issue, but a key PR addressing how the repository's automation handles fork-originated pull requests, which is part of the maintenance surface area.

---

## Key PR Progress
1. **[#4497: Handle fork PR associations in invalid-label writer](https://github.com/github/copilot-cli/pull/4497)** — *Open.* Improves the invalid-label automation to operate correctly when GitHub omits PR association data for fork workflow runs, requiring exactly one open PR for safety.

2. **[#4496: Verify pull request workflow migration](https://github.com/github/copilot-cli/pull/4496)** — *Closed.* A canary PR containing documentation-only changes to verify the new PR automation works for fork-originated contributions before final cleanup.

3. **[#4449: Migrate pull request automation away from pull_request_target](https://github.com/github/copilot-cli/pull/4449)** — *Closed.* Replaces the `pull_request_target` trigger with a no-permission signal for mergeable PRs and an issue-scoped write token for closing invalid issues, reducing the security surface of CI automation.

---

## Feature Request Trends
- **Plugin dependency management** ([#4487](https://github.com/github/copilot-cli/issues/4487)): Requests for a formal dependency model for marketplace plugins, including automatic installation of inter- and intra-marketplace dependencies.
- **Expanded model parameter control** ([#4495](https://github.com/github/copilot-cli/issues/4495)): Users want direct control over new model reasoning parameters (e.g., GPT-5.6 `reasoning.mode`) rather than only effort levels.
- **Improved model catalog refresh behavior** ([#4494](https://github.com/github/copilot-cli/issues/4494)): The CLI should reflect newly enabled org models without requiring manual cache/login clears — a recurring theme across this snapshot.
- **OTLP protocol export flexibility** ([#2934](https://github.com/github/copilot-cli/issues/2934)): Telemetry should respect standard `OTEL_EXPORTER_OTLP_PROTOCOL` environment variables rather than silently defaulting to JSON over HTTP.
- **Clarified startup instructions** ([#4475](https://github.com/github/copilot-cli/issues/4475)): The startup message "No copilot-instructions.md found" is ambiguous about whether it refers to repo-scoped or user-scoped guidance.

---

## Developer Pain Points
- **Recurring MCP OAuth regressions**: Three separate issues ([#4480](https://github.com/github/copilot-cli/issues/4480), [#4439](https://github.com/github/copilot-cli/issues/4439), [#4490](https://github.com/github/copilot-cli/issues/4490)) report similar RFC 8414 issuer mismatch failures across Atlassian and GitLab MCP servers, with versions regressing between 1.0.78 and 1.0.80. This is a top integration-blocking issue.
- **Model availability inconsistency**: Multiple reports ([#4390](https://github.com/github/copilot-cli/issues/4390), [#4422](https://github.com/github/copilot-cli/issues/4422), [#4494](https://github.com/github/copilot-cli/issues/4494)) indicate a disconnect between org-level model settings and the CLI's effective catalog, often requiring manual cache resets.
- **Session reliability issues**: Added to the known autopilot freeze (#4306) are a session-loss bug when hitting stop ([#4477](https://github.com/github/copilot-cli/issues/4477)), a fatal OOM crash ([#4499](https://github.com/github/copilot-cli/issues/4499)), and `/restart` failing in worktree sessions ([#4493](https://github.com/github/copilot-cli/issues/4493)) — collectively pointing to stability concerns in long-running or concurrent usage.
- **Conference permission timing**: Edit permission requests now time out if not responded to quickly ([#4486](https://github.com/github/copilot-cli/issues/4486)), which is disruptive for developers managing multiple parallel sessions.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI Community Digest — 2026-08-15

## Today's Highlights
The Kimi Code CLI community continues to place heavy emphasis on **persistent memory systems**, with two active issues (#1283, #1478) gathering sustained discussion about automatic context retention and project pattern recall. Although no new releases or pull requests landed in the last 24 hours, the issue tracker reveals a clear roadmap signal: users are pushing for **cross-device session continuity** (#2269) and better long-term project memory, indicating that context management is the primary friction point in large-scale usage.

## Releases
No new releases were published in the last 24 hours.

## Hot Issues

1. **[#1283 — Feature Request: Memory System - Persistent context across sessions](https://github.com/MoonshotAI/kimi-cli/issues/1283)**  
   The most-discussed open issue (39 comments). Users want both automatic (AI-managed) and manual memory for project patterns and preferences. High engagement suggests this is a top-priority roadmap item.

2. **[#1478 — 优化记忆层 / Memory layer optimization](https://github.com/MoonshotAI/kimi-cli/issues/1478)**  
   A bilingual request (Chinese/English) describing pain points when working on large projects. The author references an `agent.md` file but finds the current memory layer insufficient and undocumented. Updated today, signaling active community interest.

3. **[#2269 — Remote Control / Multi-Device Session Handoff](https://github.com/MoonshotAI/kimi-cli/issues/2269)**  
   Requests the ability to start a session on one device and continue on another (laptop, web, mobile). Low comment count but resonated enough to gain a 👍, indicating a niche but valid workflow gap.

4. **[#1136 — Shell tool: version-aware PowerShell context](https://github.com/MoonshotAI/kimi-cli/issues/1136)**  
   Closed enhancement PR detailing three critical Shell tool issues on Windows with Kimi K2.5 (SGLang), particularly ambiguous shebang handling during pass-1 command generation. Relevant for Windows users and agent reliability.

## Key PR Progress

No pull requests were updated or created in the last 24 hours. The most recent activity remains the closed enhancement PR [#1136](https://github.com/MoonshotAI/kimi-cli/issues/1136) outlined above, which addressed Windows-specific Shell command generation defects.

## Feature Request Trends
The dominant feature direction is **context persistence**. Concretely:
- **Memory system**: Automatic memory (AI-managed notes) plus manual memory (user-defined instructions) for project-specific patterns and user preferences.
- **Session continuity**: Cross-device handoff and remote control of active sessions.
- **Documentation**: Users explicitly request better reference docs for the memory layer (`agent.md` is insufficient).

Secondary trend: **Windows Shell robustness**, with calls for version-aware PowerShell compatibility and fewer ambiguous command generation failures.

## Developer Pain Points
- **Large project context loss**: The recurring "painful when working on big projects" complaint indicates that current memory mechanisms fail to maintain awareness across long or complex sessions.
- **Missing/undocumented memory features**: Developers are unaware of memory capabilities or find them non-functional—pointing to both feature gaps and doc gaps.
- **Cross-environment workflow friction**: Users shifting between laptop, desktop, web, or mobile cannot seamlessly continue a CLI session, forcing manual context re-establishment.
- **Windows platform reliability**: Specific Shell tool defects degrade agent performance on Windows, especially with newer K2.5 models, undermining trust in cross-platform parity.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-08-15

## Today's Highlights

A critical 48-bit timestamp wraparound in the ID generator (`#42608`) wedged all pre-existing sessions on August 14, causing a wave of "unresponsive agent" reports that were quickly patched. Concurrently, multiple users hit "Free usage exceeded" errors on OpenCode Zen's DeepSeek V4 Flash Free model, sparking discussion about quota reset behavior. The core team merged a substantial batch of contributor PRs focused on TUI polish, protocol hardening, and V2 documentation refresh.

## Releases

No new releases in the last 24 hours.

## Hot Issues

1. **[#42608 — 48-bit ID timestamp wraparound wedges pre-existing sessions](https://github.com/anomalyco/opencode/issues/42608)** — Critical: all sessions created before 2026-08-14 12:39:55 UTC silently stopped processing prompts due to a timestamp overflow in the ID generator. Root cause for a spike of "agent stopped responding" reports. Closed within hours.

2. **[#42013 — "Free usage exceeded, subscribe to Go" error](https://github.com/anomalyco/opencode/issues/42013)** — Users on DeepSeek V4 Flash Free via OpenCode Zen are locked out with a confusing billing error. High engagement (10 comments, 4 👍) with users reporting the quota never resets.

3. **[#36997 — Desktop App v1.18.1 hides Plan/Build agent switching UI](https://github.com/anomalyco/opencode/issues/36997)** — The new layout design (`newLayoutDesigns: true`) removes the agent mode toggle, leaving users unable to see or switch between Plan and Build modes. Tab key navigation also broken. 6 👍 indicates significant community frustration.

4. **[#42605 — Session remains open but agent doesn't process subsequent prompts](https://github.com/anomalyco/opencode/issues/42605)** — Desktop users report the agent stalls after task completion and a question. Now believed linked to the ID wraparound; users should verify against the fix.

5. **[#42083 — GitHub Copilot provider shows zero models](https://github.com/anomalyco/opencode/issues/42083)** — On Arch package 1.18.15, `github-copilot` auth succeeds but the model picker never lists Copilot models. `opencode models github-copilot` returns "Provider not found." Blocks a major provider path.

6. **[#42657 — TUI lag with multi-subagent sessions (97% CPU on render thread)](https://github.com/anomalyco/opencode/issues/42657)** — Profiling with 2–4 concurrent subagents shows the render thread pegged at 97% CPU, causing 1–3 second input delay across all tested terminals. Performance-critical for power users.

7. **[#42626 — Bash tool subprocess SIGKILL on many small stdout writes](https://github.com/anomalyco/opencode/issues/42626)** — Running `pytest tests/` inside WSL kills the subprocess with SIGKILL when streaming many small writes, breaking a common test workflow. Memory: 19 GB total reported, suggesting a buffer/pipe issue.

8. **[#42385 / #42215 — DeepSeek V4 Flash Free returns FreeUsageLimitError](https://github.com/anomalyco/opencode/issues/42385)** — Multiple reports of the free model rejecting requests with `FreeUsageLimitError` even after the 24-hour quota window. Users report intermittent success, pointing to a server-side quota state bug.

9. **[#42677 — `opencode run` saves empty assistant message and exits 0](https://github.com/anomalyco/opencode/issues/42677)** — Headless mode with Ollama occasionally ends by saving a stop message with 118 tokens counted but zero parts, then exits successfully. Silent data corruption for automated pipelines.

10. **[#38791 — Run loop never exits when message IDs aren't time-sortable](https://github.com/anomalyco/opencode/issues/38791)** — `SessionPrompt.runLoop` compares message IDs as plain strings; third-party-imported sessions that don't sort chronologically cause infinite loops until the provider returns 400. Affects session import tooling.

## Key PR Progress

1. **[#42673 — fix(tui): ignore stray releases on new session controls](https://github.com/anomalyco/opencode/pull/42673)** — Prevents accidental new-session creation when dragging text selects into the tab strip; closes a long-standing UX annoyance.

2. **[#42669 — fix(plugin): derive promise adapter from protocol schemas](https://github.com/anomalyco/opencode/pull/42669)** — Replaces hand-written Promise plugin API translation with a schema-driven adapter from the canonical V2 `HttpApi` contract, covering session titles, branded IDs, DateTime handling, and nullable fields.

3. **[#42667 — fix(core): unify patch path resolution](https://github.com/anomalyco/opencode/pull/42667)** — Aligns the V2 patch tool with the `LocationMutation` service already used by write/edit, fixing project-relative path and permission inconsistencies.

4. **[#42666 — fix(app): use location VCS state](https://github.com/anomalyco/opencode/pull/42666)** — New-session Git state now derives from the directory-scoped VCS store, matching the TUI data model; adds fallback to global project metadata and regression coverage.

5. **[#42628 — refactor(protocol): harden simulation wire contract](https://github.com/anomalyco/opencode/pull/42628)** — The canonical `@opencode-ai/protocol/simulation` module now exposes typed backend notifications and models JSON-RPC responses as an exact success/error union, preparing for standalone Drive schema deletion.

6. **[#42663 — feat(core): persist web search provider selection](https://github.com/anomalyco/opencode/pull/42663)** — Web search provider consent moves from KV state to the first file-backed config document, enabling a fixed provider list and persistent user preference.

7. **[#42662 — fix(mcp): fail loudly on MCP server config missing type](https://github.com/anomalyco/opencode/pull/42662)** — Closes #41229: MCP configs written for Claude Code (missing `type`/`enabled`) now produce clear errors instead of silent misconfiguration.

8. **[#42649 — docs(core): refresh session architecture](https://github.com/anomalyco/opencode/pull/42649)** — V2 session docs updated to match current implementation: generic inbox, write-ahead execution claims, bounded restart recovery, retry behavior, and frozen chronological instruction ordering.

9. **[#42646 — fix(tui): preserve transparent tab backgrounds](https://github.com/anomalyco/opencode/pull/42646)** — Fixes the tab shadow replacing transparent terminal themes with an opaque full-width stripe; preserves transparency without changing opaque theme shadows.

10. **[#27554 — feat(opencode): local LAN provider discovery + auto-discover models](https://github.com/anomalyco/opencode/pull/27554)** — Long-running feature PR adding mDNS-based local OpenAI-compatible server discovery in `/connect` plus automatic model listing from `/v1/models`. Closes #6231 and #27553; in review since May.

## Feature Request Trends

- **Provider Auto-Discovery** — Heavy demand for automatic model discovery from OpenAI-compatible endpoints (`/v1/models`) and LAN-based provider detection (with mDNS), eliminating manual `opencode.json` model lists.
- **Runtime Permission Toggling** — Request for an `/approve on|off` slash command to toggle step-by-step permission approval per session without restarting, mirroring Claude Code's workflow.
- **External Provider Integrations** — Requests for new providers (Nara Router) and fixing existing ones (Ollama Cloud auth login, GitHub Copilot model listing).
- **Performance Optimization** — Persistent calls for context cache invalidation improvements when switching modes or during compaction, especially for local inference with vLLM/Ollama.

## Developer Pain Points

- **Billing and Quota Confusion** — A cluster of issues around OpenCode Zen free-tier quotas: users locked out by `FreeUsageLimitError` that never resets, confusing "subscribe to Go" messaging, and purchased credits not appearing. Multiple reports in multiple languages (EN/FR/DE/中文), suggesting a systemic quota-state bug.
- **Session Reliability After Long Idle** — Recurring pattern of sessions becoming unresponsive after hours of inactivity or overnight, with agents ignoring new prompts. The ID wraparound explains some cases, but users report the pattern predates it.
- **Mode-Switching Visibility** — The new desktop layout hiding Plan/Build agent switching is a top-voted regression; users need clear visual indication of active agent and keyboard shortcuts to switch.
- **External Tool Interop Gaps** — MCP configs written for Claude Code silently misbehave without `type`/`enabled` fields; web search requires an undocumented env var on Go models; Bash tool kills long-running test suites with SIGKILL on high-output streams.
- **TUI Performance Under Load** — Concurrent subagent sessions peg the render thread, making the interface unusable; theme re-detection also fails in multiplexed terminals that replay host palettes.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-08-15

## Today's Highlights

The Web Shell frontend continues to mature with workspace file upload support landing in preview releases, alongside a new diff growth brake in autofix reviews to prevent runaway patch sizes. However, the autofix/review subsystem is generating a significant volume of follow-up work — several PRs are already on their fifth or seventh review round, and the team is actively shipping convergence tooling to keep those loops from expanding indefinitely. CI stability on main remains a live concern with multiple E2E failures reported and triaged by the dev bot.

## Releases

**v0.21.12-preview.4** — Web Shell workspace file uploads via drag-and-drop or the @ file panel with progress tracking ([#8874](https://github.com/QwenLM/qwen-code/pull/8874)), plus a fix to preserve standalone session targets ([#9038](https://github.com/QwenLM/qwen-code/pull/9038)).

**v0.21.12-preview.3** — Same Web Shell upload and session-target fixes as preview.4, released ahead of it.

**v0.21.11-nightly.20260815.c396fe3d12** — Deny-by-default footprint gate and positional window censuses in autofix ([#9156](https://github.com/QwenLM/qwen-code/pull/9156)).

**v0.21.12** — Stable release including workspace file uploads and a diff growth brake for autofix reviews.

**E2E validation releases** (`dsw-eas-tb-e2e-20260814-*`) — Benchmark runs against SWE-bench Verified and Terminal-Bench 2.0, reporting a partial score of 89 on Terminal-Bench in r6.

## Hot Issues

1. **[#8678](https://github.com/QwenLM/qwen-code/issues/8678) — Session restore timeout handling (P1, CLOSED)** — Large session restores that time out were killing the active session. Closed as partially addressed and superseded after a long discussion around request-scoped timeouts and attachment fencing.
2. **[#8051](https://github.com/QwenLM/qwen-code/issues/8051) — Bound multi-workspace daemon resource usage (P2, OPEN)** — Count-only limits on workspaces and sessions don't bound actual bytes held by request bodies or WebSocket buffers. Community asking for memory-aware enforcement.
3. **[#9143](https://github.com/QwenLM/qwen-code/issues/9143) / [#9159](https://github.com/QwenLM/qwen-code/issues/9159) / [#9160](https://github.com/QwenLM/qwen-code/issues/9160) — Main CI E2E failures (P1, OPEN)** — Three separate failures in 24 hours, including flaky `qwen-serve-live-journal-recovery` tests. Tracked per-commit, with autofix agents already assigned.
4. **[#9002](https://github.com/QwenLM/qwen-code/issues/9002) — Python SDK rejects `permission_mode="auto"` (P3, OPEN)** — Client-side validation is stricter than the CLI, blocking a supported mode. Simple consistency bug with 6 comments of community traction.
5. **[#6806](https://github.com/QwenLM/qwen-code/issues/6806) — Status line doesn't refresh after /compress (P2, OPEN)** — The context-usage percentage stays stale until the next model request. Long-standing UI bug, open since July.
6. **[#8582](https://github.com/QwenLM/qwen-code/issues/8582) — Read-only shell classifier auto-approves command substitution (P1, CLOSED)** — Security issue: `isShellCommandReadOnlyAST` misses substitution hidden via line continuations or `${var@P}`. High severity, closed after fix.
7. **[#8871](https://github.com/QwenLM/qwen-code/issues/8871) — ACP child process fails in serve mode (P2, OPEN)** — `qwen serve` spawns ACP with an `--acp` flag the child can't parse, causing auth failures. Needs triage.
8. **[#9026](https://github.com/QwenLM/qwen-code/issues/9026) — `NO_TOOL_RESULT_PROGRESS` hard-fails headless runs (P2, OPEN)** — Valid quiet model endings after tool results trip the guard, burn retry budgets, and abort runs. Directly addressed by PR #9196.
9. **[#9146](https://github.com/QwenLM/qwen-code/issues/9146) — `utils/` is not a leaf layer (P2, OPEN)** — 107 upward imports from 51 files create cyclic directory graphs in core and CLI. Community-identified structural debt.
10. **[#2128](https://github.com/QwenLM/qwen-code/issues/2128) — Unbounded memory growth from UI History (P1, OPEN)** — Open since March, the `useHistoryManager.history` array grows without limit in long sessions. Still unresolved after five months.

## Key PR Progress

1. **[#9183](https://github.com/QwenLM/qwen-code/pull/9183) — Scale reverse-audit round cap to diff topology** — One cap per review topology instead of one for all: ten rounds on small diffs, five on chunked, three on huge. Finishability ruling for the review loop.
2. **[#9118](https://github.com/QwenLM/qwen-code/pull/9118) — Round-aware convergence posture for posted findings** — Raises the posting bar as review rounds accumulate, so review→fix→re-review converges by default instead of widening the diff.
3. **[#9189](https://github.com/QwenLM/qwen-code/pull/9189) — Defer verified out-of-footprint findings to a follow-up queue** — Adds a fourth outcome to the autofix review: verified-but-out-of-scope findings go to a machine-readable queue instead of blocking the PR.
4. **[#9196](https://github.com/QwenLM/qwen-code/pull/9196) — Accept quiet post-tool-result completions after retry exhaustion** — Fixes the `NO_TOOL_RESULT_PROGRESS` guard misfiring on valid silent endings, avoiding wasted retry budgets.
5. **[#9122](https://github.com/QwenLM/qwen-code/pull/9122) — Improve Web Shell sidebar session management** — Hover previews, expandable folders (5 rows), fade/scroll for long titles, and clearer running-state indicators.
6. **[#9163](https://github.com/QwenLM/qwen-code/pull/9163) — Confine ledger/evidence reads to contained regular files** — Single open primitive with `O_NOFOLLOW` + `fstat` + bound reads, closing the R2-2 audit family from #9091.
7. **[#9136](https://github.com/QwenLM/qwen-code/pull/9136) — Bound workflow meta evaluation with vm timeout** — A non-returning `meta` literal now surfaces as malformed-meta instead of wedging the process.
8. **[#9121](https://github.com/QwenLM/qwen-code/pull/9121) — Fix main agent tracing edge cases** — Telemetry correctness follow-up, addressing tracing gaps in the main agent loop.
9. **[#9167](https://github.com/QwenLM/qwen-code/pull/9167) — DingTalk outbound file delivery** — Validates files under workspace/temp, uploads via DingTalk media API, and sends native file messages.
10. **[#9082](https://github.com/QwenLM/qwen-code/pull/9082) — Force-push release branch on retry** — Fixes stale release branch failures: retries now force-push to replace failed attempts instead of dying on remote conflicts.

## Feature Request Trends

- **Web Shell as a first-class surface** — File uploads, sidebar management, transcript-based HTML export, and even an Electron host proposal ([#9186](https://github.com/QwenLM/qwen-code/issues/9186), [#9168](https://github.com/QwenLM/qwen-code/issues/9168)).
- **Bounded daemon resource usage** — Beyond count limits, the community wants byte-level memory bounds for sessions, request bodies, and WebSocket buffers ([#8051](https://github.com/QwenLM/qwen-code/issues/8051), [#2128](https://github.com/QwenLM/qwen-code/issues/2128)).
- **Review-loop automation hygiene** — Convergent review rounds, deferral queues, round-aware posting bars, and topology-scaled caps. The autofix team is systematically industrializing the review process.
- **Channel expansion** — DingTalk file delivery, channel policy redesigns, and session isolation improvements signal broader platform distribution work.

## Developer Pain Points

- **Review round explosion** — Multiple PRs hit 5–7 review rounds; several issues exist solely to track "deferred suggestions" so PRs can converge. The team is actively building tooling to stop this, but it's clearly the top workflow friction.
- **CI flakiness on main** — Three E2E failures in 24 hours, including live-journal-recovery tests that fail intermittently. Each failure spawns a bot issue with autofix agents attached, adding noise.
- **Config drift between SDK and CLI** — The `permission_mode="auto"` rejection ([#9002](https://github.com/QwenLM/qwen-code/issues/9002)) highlights a recurring class: SDK validation is stricter than the CLI and silently blocks documented features.
- **Security-sensitive shell handling** — Read-only classifier bypasses and ACP child-process argument failures both touch shell execution, a high-stakes area that keeps regressing.
- **Long-standing memory issues** — The unbounded UI History issue ([#2128](https://github.com/QwenLM/qwen-code/issues/2128)) has been open since March and is still unresolved, despite P1 priority and community demand.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar).*