# AI CLI Tools Community Digest 2026-08-16

> Generated: 2026-08-16 01:05 UTC | Tools covered: 7

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

# Cross-Tool AI CLI Comparison Report — 2026-08-16

## 1. Ecosystem Overview

The AI CLI development landscape is converging on three systemic challenges: session/memory persistence, Windows desktop reliability, and agent permission models. All six tools shipped no stable releases in the last 24 hours, indicating a stabilization phase after recent release trains. Sub-agent reliability and context management are now the primary battlegrounds, with each tool investing in behavioral evaluation suites to prevent regressions. Billing transparency and quota metering are emerging as trust-critical issues across both commercial and open-source tools.

## 2. Activity Comparison

| Tool | Hot Issues | PRs (24h) | Release Status (24h) | Notable Signal |
|------|-----------|-----------|---------------------|----------------|
| Claude Code | 10 tracked; 5 new filed | 3 external | No new releases | #27302 at 229 comments/346 👍 (multi-account Connectors) |
| OpenAI Codex | 10 tracked | 10 merged/updated | 2 alpha releases (_alpha.19/.20) | Windows stutter cluster (#20214, #38546, #38750) |
| Gemini CLI | 10 tracked | 10 open/updated | 1 nightly | Subagent MAX_TURNS misreport (P1, #22323) |
| GitHub Copilot CLI | 10 tracked | 2 | No new releases (stable 1.0.80) | MCP OAuth regression pair (#4480/#4490) |
| Kimi Code CLI | 4 tracked | 2 | No new releases | Quota reduction suspicion (#2604) |
| OpenCode | 10 tracked | 10 merged/updated | No new releases | Billing sync failures (#37790) and endpoint instability |
| Qwen Code | 10 tracked | 10+ merged/updated | 1 preview + 1 nightly | CI E2E failure wave on main; review-pipeline hardening |

## 3. Shared Feature Directions

**Memory as a first-class, synced feature** — Claude Code (#87027, #87028, #87023), Gemini CLI (#26522 auto-memory loop), and Kimi Code (#1283, oldest/most-voted issue) all face demands for persistent, cross-session memory that survives restarts and syncs across machines.

**Non-interrupting agent interaction** — Claude Code (#50246 message queue, #13354 session continuation) and OpenCode (#7801 Plan→Build auto-switch) both have requests to let agents complete work without derailment.

**Multi-account and workspace scoping** — Claude Code (#27302 multi-account Connectors) and OpenAI Codex (#3550 workspace-scoped sessions, closed) reflect demand for session/identity isolation in collaborative workflows.

**Quota/budget awareness** — Kimi Code (#2603 quota-driven compaction, #2604 opaque quota reduction), OpenCode (#24879 mid-tier plan, #32911 Deepseek overbilling), and Copilot CLI (#4500 prompt-cache defeat) all show cost-control as a growing requirement.

**Windows packaging/reliability** — Claude Code (#80444, #85199, #87024), Codex (#20214, #38546, #38719), and Copilot CLI (#4499 OOM) each carry Windows-specific crash/stutter/installer regressions.

**Containerized/isolated execution** — OpenCode (Docker blueprint workspaces PR #42831, Incus provider) and Qwen Code (#9089 runner isolation for PAT-bearing jobs) both see sandboxing as a security answer.

## 4. Differentiation Analysis

- **Claude Code** targets professional/agency users with deep enterprise integration (Salesforce/Drive Connectors), but its local-file memory model and Windows MSIX packaging are the weakest links. The permission-model issues (silent auto-approvals, `dontAsk` denying writes) point to a trust gap in headless/CI scenarios.
- **Codex** invests most in infrastructure quality: gRPC health endpoints, storage diagnostics in `codex doctor`, trace-context propagation, and Guardian permission unification. The Windows stutter cluster is its dominant liability, indicating the Chromium desktop shell needs attention. Its Rust-based rewrite suggests a long-term performance bet.
- **Gemini CLI** is evaluation-driven: 76+ behavioral evals with new coverage for task graphs, error recovery, and multi-tool chains. Its P1 subagent misreporting bug (#22323) is the most dangerous failure mode across all tools — a false "success" that masks turn-limit truncation. Security posture is strong (SSRF fix, Docker base upgrades), and it is the only tool with a maintainer-run nightly testing pipeline.
- **Copilot CLI** is the leanest operation (2 PRs/day), likely reflecting a smaller team or slower cadence. Its MCP OAuth reliability issues (#4480/#4490) and NixOS bash regression (#3392, 3 months open) suggest platform coverage gaps. The `/spawn` template bug (#4491) is a security-relevant flaw — cross-session writes without approval — that other tools have not reported.
- **Kimi Code** has the smallest community footprint (4 hot issues, 2 PRs) and the most concerning trust issue: suspected silent quota reduction (#2604) with wire-level evidence. The 1M-token context window that disables compaction (#2603) is a cost trap unique to its K3 model. Its roadmap is dominated by a single memory-system feature request (#1283) that remains open after many weeks.
- **OpenCode** has the highest issue volume and a large contributor base (10 PRs/day), with a pragmatic mix of UX fixes (mobile CSS, numeric timestamps) and architectural work (Docker isolation, per-session budgets). Its reliability pain is upstream: endpoint instability, grok-4.5 breakage across providers, and billing sync bugs. The Deepseek overbilling report (#32911) and permission-rule non-enforcement are red flags for trust.
- **Qwen Code** is the most internally-focused this cycle: a dense cluster of `/review` pipeline fixes (worktree races, overlap detection, schema friction) and CI hardening, rather than user-facing features. The P1 security issue (#9089 — PAT-bearing jobs sharing runners with untrusted code) is architecturally unsolvable within GitHub Actions, requiring runner isolation. Its SWE-bench/Terminal-Bench smoke pipeline is a mature quality gate.

## 5. Community Momentum & Maturity

**Most active / rapidly iterating:** OpenCode (10 PRs/day, growing contributor base, broad feature surface) and Qwen Code (10+ PRs/day, preview+nightly releases, CI stabilization). **Deep infrastructure investment:** Codex (Rust rewrite, diagnostics, tracing). **Evaluation-driven maturity:** Gemini CLI (behavioral eval suite expanding). **Enterprise stability focus:** Claude Code (large but slow-moving issue threads, few PRs, no releases). **Lowest velocity:** Copilot CLI (2 PRs, no releases) and Kimi Code (2 PRs, no releases). Claude Code's #27302 (229 comments, 346 👍) is the single most-voted issue across all tools, indicating a loud but perhaps unaddressed professional-user segment. Gemini's P1 #22323 and Qwen's #9089 are the highest-severity engineering problems.

## 6. Trend Signals

1. **Agent transparency is the next trust frontier.** Gemini's false-success bug (#22323) and Claude Code's silent permission auto-approvals (#77212) both undermine user confidence in autonomous execution. Expect tooling to introduce explicit "state-of-the-world" reporting and auditable permission trails.
2. **Memory is moving from files to services.** Claude Code's local-file memory is hitting scale limits (multi-agent, cross-machine). The next step is synced, account-level memory with schema guards — and tools that ship it first will win long-running autonomous workflows.
3. **Windows is the reliability battleground.** Every tool except Qwen (web-shell focus) has at least one Windows packaging, performance, or crash issue. The pattern (GPU crashes, MSIX repair loops, stutter, crashpad storms) suggests a platform-level opportunity for a tool that gets Windows right.
4. **Billing transparency is becoming a dealbreaker.** Kimi's suspected quota cut (#2604), OpenCode's Deepseek overbilling (#32911), and billing-sync failures (#37790) all erode trust in metering. Users are instrumenting wire traffic to verify charges. Expect demand for real-time usage dashboards and quota-driven features (compaction, alerts).
5. **Context budget is a first-class design constraint.** Kimi's 1M-token window that disables compaction, Copilot's prompt-cache defeat (#4500), and Qwen's prefix-cache re-prefill (#9230) all show that context handling is now a performance and cost issue, not just a quality one. "Budget-aware" agents are the next feature category.
6. **Security hardening is shifting from code to infrastructure.** SSRF via DNS bypass (Gemini), PAT-on-shared-runners (Qwen), and cross-session writes without approval (Copilot) each require architectural fixes (sandboxing, runner isolation, approval gates) rather than patches. Containerized/isolated execution (OpenCode Docker/Incus, Gemini sandbox) is the emerging consensus direction.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report
**Data as of 2026-08-16**

---

## 1. Top Skills Ranking

**1. `skill-creator` evaluation loop fixes** — [PR #1298](https://github.com/anthropics/skills/pull/1298), [PR #1099](https://github.com/anthropics/skills/pull/1099), [PR #1050](https://github.com/anthropics/skills/pull/1050)
The most actively discussed cluster. Three independent PRs target `run_eval.py`'s critical **0% recall bug** (Issue #556): the description-optimization loop scores every skill against noise, making `recall=0%` a constant. PR #1298 installs the eval artifact as a real skill, fixes Windows stream reading, trigger detection, and parallel workers. PRs #1099 and #1050 address Windows-specific subprocess crashes ([WinError 10038], `claude.cmd` PATHEXT issues). *Status: All open; duplicated fixes suggest a maintainer merge is likely.*

**2. Document typography skill** — [PR #514](https://github.com/anthropics/skills/pull/514) by PGTBoos
Prevents orphan word wrap, widow paragraphs, and numbering misalignment in AI-generated documents. Broad utility — every generated document risks these defects. *Status: Open since Mar 2026.*

**3. ODT (OpenDocument) skill** — [PR #486](https://github.com/anthropics/skills/pull/486) by GitHubNewbie0
Create, fill, read, and convert `.odt`/`.ods` files, including ODT→HTML parsing. Fills a clear gap next to the existing DOCX/PDF skills. *Status: Open since Mar 2026.*

**4. ServiceNow platform skill** — [PR #568](https://github.com/anthropics/skills/pull/568) by Vanka07
Broad platform assistant covering ITSM, ITOM, ITAM/SAM, FSM, HRSD/CSM, SPM/PPM, SecOps, and IntegrationHub. The longest-lived discussion thread (updated Aug 2026), signaling sustained enterprise interest. *Status: Open since Mar 2026.*

**5. Self-audit skill** — [PR #1367](https://github.com/anthropics/skills/pull/1367) by YuhaoLin2005
Mechanical file verification followed by a four-dimension reasoning audit in damage-severity order. Universal across projects and models. Complements a related proposal (Issue #1385). *Status: Open since Jun 2026.*

**6. testing-patterns skill** — [PR #723](https://github.com/anthropics/skills/pull/723) by 4444J99
Comprehensive testing stack coverage: Testing Trophy philosophy, AAA pattern, React Testing Library, and edge cases. Directly serves a widely expressed community need. *Status: Open since Mar 2026.*

**7. pyxel retro game development skill** — [PR #525](https://github.com/anthropics/skills/pull/525) by kitao
MCP-server-backed skill for the Pyxel retro game engine; covers the write → run_and_capture → inspect → iterate workflow. *Status: Open since Mar 2026.*

**8. Plan-file-hygiene skill** — [PR #1479](https://github.com/anthropics/skills/pull/1479) by tonydzi
Addresses the lifecycle problem of accumulating planning artifacts (Issue #1417): plans, specs, and task files linger with no cleanup policy. *Status: Open since Jul 2026.*

---

## 2. Community Demand Trends

**Security and trust boundaries** (highest urgency). Issue [#492](https://github.com/anthropics/skills/issues/492) (43 comments) exposes a vulnerability: community skills distributed under the `anthropic/` namespace impersonate official skills, enabling a trust-boundary abuse where users grant elevated permissions unknowingly. The community demands namespace governance and provenance verification.

**Skill-sharing infrastructure**. Issue [#228](https://github.com/anthropics/skills/issues/228) (16 comments, 8 👍) calls for org-wide skill sharing in Claude.ai — a shared library or direct link instead of manual `.skill` file transfer via Slack/Teams.

**Reliable skill evaluation**. Issue [#556](https://github.com/anthropics/skills/issues/556) (12 comments, 7 👍) plus related issues confirm the community's strongest demand: a working evaluation loop for skill descriptions, which currently produces meaningless 0% recall scores.

**Duplicate-skill management**. Issue [#189](https://github.com/anthropics/skills/issues/189) (6 comments, 9 👍) reports that `document-skills` and `example-skills` plugins install identical content, polluting the context window.

**Context-window efficiency**. Issue [#1487](https://github.com/anthropics/skills/issues/1487) documents the `claude-api` skill eagerly injecting ~156k tokens in a single call — community attention is converging on the boundary between skill utility and resource exhaustion.

**Format coverage gaps**. Active discussion around ODT (PR #486), ServiceNow (PR #568), and typographic quality (PR #514) signals enterprise document and platform skills as a persistent demand vector.

---

## 3. High-Potential Pending Skills

| Skill | PR | Signal |
|---|---|---|
| `self-audit` (v1.3.0) | [#1367](https://github.com/anthropics/skills/pull/1367) | Recently updated (Jul 2026), paired with a detailed proposal (Issue #1385); author actively iterating |
| `plan-file-hygiene` | [#1479](https://github.com/anthropics/skills/pull/1479) | Directly addresses a named community problem (Issue #1417); credits discussion participants, indicating collaborative momentum |
| `ServiceNow` platform skill | [#568](https://github.com/anthropics/skills/pull/568) | Sustained 5-month update thread (latest Aug 2026) — the author is responding to feedback; enterprise scope is substantial |
| `testing-patterns` | [#723](https://github.com/anthropics/skills/pull/723) | Broad coverage of a high-demand topic; no competing PRs |
| `pyxel` retro game skill | [#525](https://github.com/anthropics/skills/pull/525) | Produced by the pyxel-mcp author (kitao); domain authority plus MCP integration make this a quality candidate |

---

## 4. Skills Ecosystem Insight

The community's most concentrated demand is **reliable skill creation infrastructure** — a working description-evaluation loop and trust-safe distribution — rather than any single new skill's capabilities, with enterprise document/platform skills as the strongest secondary signal.

---

# Claude Code Community Digest — 2026-08-16

**Data Source:** [anthropics/claude-code](https://github.com/anthropics/claude-code)

---

## Today's Highlights

The community conversation centers on three connected themes: memory systems (the gap between claude.ai and Claude Code, and cross-machine sync), the fragility of Windows desktop deployments (GPU crashes, broken installers, and a Cowork regression), and long-standing permission-model gaps for headless agents. The most active thread remains the multi-account Connector request at 229 comments and 346 👍, with five fresh enhancement issues filed in the last 24 hours—three of them from a single Windows user.

---

## Releases

No new versions were published in the last 24 hours.

---

## Hot Issues

1. **[Support multiple Connector accounts (same connector, different accounts) in Claude and Claude Code on the web](https://github.com/anthropics/claude-code/issues/27302)** — #27302 | 229 comments, 346 👍
   The most-discussed open feature request. Users need to rotate between accounts (e.g., personal vs. client) for the same connector (Salesforce, Google Drive, etc.) without re-authenticating. High engagement indicates this is a daily workflow blocker for agency/professional users.

2. **[Continue when the session limit reached](https://github.com/anthropics/claude-code/issues/13354)** — #13354 | 78 comments, 197 👍
   A long-standing request to avoid losing context when hitting session limits. The community keeps it alive because the workaround (manual `--continue` or `/compact`) is error-prone in long-running tasks.

3. **[Message queue mode — queue messages instead of interrupting active tasks](https://github.com/anthropics/claude-code/issues/50246)** — #50246 | 56 comments, 197 👍
   Users want to queue follow-up instructions mid-task instead of derailing the current run. This reflects a broader frustration with the interrupt-only interaction model.

4. **[Windows Desktop app 1.24012.1: fatal GPU-process crash; MSIX package unlaunchable until Repair](https://github.com/anthropics/claude-code/issues/80444)** — #80444 | 34 comments
   A crash via the in-app Browser tab leaves the app in `appxState=2` (broken), requiring a full Repair. Reproduced across two NVIDIA driver versions. The failure mode—app becomes unlaunchable—is the worst part.

5. **[Claude Desktop repeatedly crashes and requires “Advanced Options → Repair” on Windows](https://github.com/anthropics/claude-code/issues/85199)** — #85199 | 23 comments
   Another Windows crash-and-repair loop, reinforcing that MSIX packaging and crash recovery on Windows is a systemic problem, not an edge case.

6. **[Cowork bash dies with "not supported on this device"](https://github.com/anthropics/claude-code/issues/87024)** — #87024 | 1 comment
   Filed yesterday: a regression (~Aug 5–6) on Windows where Cowork's bash fails on installs that worked for months. The `msix_required` enforcement is now blocking legacy installs, with no upgrade path. This is a release-train regression flagged within 24 hours.

7. **[claude setup-token tokens rejected with 400 no body](https://github.com/anthropics/claude-code/issues/86986)** — #86986 | 1 comment
   Freshly-minted tokens via `claude setup-token` fail on first request with a silent 400. Reproduces locally and in CI on a Max 20x account. Critical for anyone automating CI/CD with Claude Code.

8. **[Memory-file Write/Edit destroys all frontmatter when YAML parse fails](https://github.com/anthropics/claude-code/issues/76868)** — #76868 | CLOSED
   A data-loss bug: failed YAML parse on a memory file writes an empty stub instead of rejecting. The `originSessionId` stamper is the culprit. Closed now, but the pattern (silent destructive fallback) is worth watching for regressions.

9. **[@import in ancestor-directory CLAUDE.md is never expanded](https://github.com/anthropics/claude-code/issues/79046)** — #79046
   Only the cwd-level CLAUDE.md processes `@path` imports; ancestor files ignore them. Affects multi-level monorepos and contradicts documented memory behavior.

10. **[Linux Desktop: GPU process launch retries at ~9,000/sec, writes 346 GB to syslog in 24h](https://github.com/anthropics/claude-code/issues/83453)** — #83453
    A runaway retry loop that fills the disk via syslog. Severity is extreme (storage exhaustion), yet it's getting little community attention—likely Linux-desktop users are a minority.

---

## Key PR Progress

Note: Only 3 PRs were updated in the last 24h—all are external.

1. **[#84600 — Enable frontend-design plugin at project scope](https://github.com/anthropics/claude-code/pull/84600)** — CLOSED
   Registers the official marketplace and enables `frontend-design` via `.claude/settings.json`. This is a config-only PR, not a code change, but it demonstrates the new plugin/skill flow working for project-scoped enablement.

2. **[#82981 — Claude/automatizar inventario insumos w4n98s](https://github.com/anthropics/claude-code/pull/82981)** — OPEN
   No description. Likely a workflow/config PR or a test of the automation API.

3. **[#86870 — fix: prevent false-positive CVP status changes during authorized security research](https://github.com/anthropics/claude-code/pull/86870)** — OPEN
   Adds context checks (session metadata, authorized-lab flags) to `security-guidance/hooks/review_api.py` so authorized security research doesn't trip false-positive CVP status changes. Relevant to anyone running security-focused agents.

---

## Feature Request Trends

**1. Memory as a first-class, synced, cross-product feature—not local files.**
- [#87027 Account-level sync for user config and auto memory](https://github.com/anthropics/claude-code/issues/87027)
- [#87028 No context path between claude.ai and Claude Code](https://github.com/anthropics/claude-code/issues/87028)
- [#87023 Field report: cross-session memory at multi-agent scale](https://github.com/anthropics/claude-code/issues/87023)
- [#77898 A single stub transcript hides all 33 sessions in /resume](https://github.com/anthropics/claude-code/issues/77898)

Users are hitting the limits of local, file-based memory. The demand is moving from "make files work" to "sync it and make it cross-product."

**2. Non-interrupting interaction models for agents.**
- [#50246 Message queue mode](https://github.com/anthropics/claude-code/issues/50246)
- [#13354 Continue at session limit](https://github.com/anthropics/claude-code/issues/13354)

**3. Multi-account support.**
- [#27302 Multiple Connector accounts](https://github.com/anthropics/claude-code/issues/27302)

**4. Windows packaging and reliability.**
- [#80444, #85199, #86999, #87024] — Installer PATH issues, GPU crash loops, MSIX repair loops, and Cowork regressions.

**5. Headless/agent permission model.**
- [#74567 `--permission-mode dontAsk` denies Write/Edit regardless of allowlists](https://github.com/anthropics/claude-code/issues/74567)

---

## Developer Pain Points

**1. Windows remains a second-class citizen.**
- MSIX packages that become unlaunchable after a crash ([#80444](https://github.com/anthropics/claude-code/issues/80444), [#85199](https://github.com/anthropics/claude-code/issues/85199))
- The native installer not adding `~\.local\bin` to PATH ([#86999](https://github.com/anthropics/claude-code/issues/86999))
- Cowork breaking on legacy installs with no upgrade path ([#87024](https://github.com/anthropics/claude-code/issues/87024))

**2. Silent permission behavior undermines trust.**
- `permissionDecision: "ask"` auto-approved under `bypassPermissions` ([#77212](https://github.com/anthropics/claude-code/issues/77212))
- `allow` not suppressing prompts for compound `cd … || cd …` commands ([#77110](https://github.com/anthropics/claude-code/issues/77110))
- `--permission-mode dontAsk` denying Write/Edit regardless of allowlist ([#74567](https://github.com/anthropics/claude-code/issues/74567))

**3. Hook contract instability across minor releases.**
- 2.1.210 regression: prompt-hook `deny` stops the whole turn instead of returning a tool error ([#78527](https://github.com/anthropics/claude-code/issues/78527))
- Identical hooks (settings + plugin) firing twice, concurrently ([#76297](https://github.com/anthropics/claude-code/issues/76297))

**4. The macOS/CLI auth layer is fragile.**
- Keychain credential blobs with blanked tokens, causing login loops ([#84331](https://github.com/anthropics/claude-code/issues/84331))
- `setup-token` mints rejected with opaque 400s ([#86986](https://github.com/anthropics/claude-code/issues/86986))

**5. Context and memory are too easy to lose or corrupt.**
- One 416-byte stub file empties the entire project's `/resume` list ([#77898](https://github.com/anthropics/claude-code/issues/77898))
- Memory-file writes destroy frontmatter when YAML parse fails ([#76868](https://github.com/anthropics/claude-code/issues/76868))
- No cross-machine, cross-product continuity for config or memory ([#87027](https://github.com/anthropics/claude-code/issues/87027), [#87028](https://github.com/anthropics/claude-code/issues/87028))

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest
**2026-08-16**

---

## Today's Highlights

The Codex team shipped two alpha releases (v0.148.0-alpha.19 and .20) and merged a series of infrastructure PRs focused on session stability, TUI polish, and hook/MCP engine improvements. A critical cluster of Windows desktop performance issues has escalated this week, with multiple new reports of system-wide cursor stutter and idle CPU spikes—now the dominant community concern.

---

## Releases

- **[rust-v0.148.0-alpha.19](https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.19)** — Alpha release with no public changelog details.
- **[rust-v0.148.0-alpha.20](https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.20)** — Alpha release with no public changelog details.

---

## Hot Issues

1. **[#20214 — Codex App frequently freezes/stutters on Windows 11 Pro](https://github.com/openai/codex/issues/20214)**
   The longest-running Windows performance complaint (104 comments, 85 👍). Users report stutters despite ample system resources. The issue remains open after months, signaling a hard-to-reproduce or deeply rooted problem.

2. **[#3550 — Scope Codex chats to VS Code projects/workspaces](https://github.com/openai/codex/issues/3550)**
   Closed but heavily upvoted (79 👍). A long-requested organizational feature—users want chat sessions scoped to workspaces, not globally shared. The closure suggests a solution shipped or was deprioritized.

3. **[#38546 — ChatGPT/Codex desktop app causes system-wide mouse stutter](https://github.com/openai/codex/issues/38546)**
   New report of severe OS-level cursor stutter while running without elevation. 25 comments in 2 days—the issue is gaining traction quickly and matches a broader pattern of Windows input-freeze complaints.

4. **[#28109 — Windows Desktop: brief mouse/input freezes after opening Codex](https://github.com/openai/codex/issues/28109)**
   Closed, but with 23 comments and 14 👍. Input freezes tied to large session directories—likely a session-loading performance fix went in, but the related issue family persists.

5. **[#25921 — Codex Desktop generates Crashpad pending dumps without limit (~5GB/day)](https://github.com/openai/codex/issues/25921)**
   Silent disk-space killer. Users report unbounded `.dmp` growth in `~/Library/Application Support`. High-impact bug for macOS users with small SSDs.

6. **[#38750 — System-wide stutter while Codex is idle; exiting restores responsiveness](https://github.com/openai/codex/issues/38750)**
   Fresh report (9 comments, same-day). The app causes stutter even with zero active tasks—strong evidence of a background loop or timer bug in the desktop runtime.

7. **[#38719 — Idle ChatGPT.exe loop causes cursor stutter after Aug 15 update](https://github.com/openai/codex/issues/38719)**
   Regression report tied to a specific update. 7 comments; users pinpointed the exact build (`26.810.6296.0`). Critical for release-blocker triage.

8. **[#18629 — Desktop threads poisoned by inline base64 tool images](https://github.com/openai/codex/issues/18629)**
   Long-standing bug (since April). Inline image payloads bloat session history, causing `400 Bad Request` on resume and inflated token usage. 12 comments, still open.

9. **[#31433 — Codex leaves valid rollout files unindexed; lacks reindex repair](https://github.com/openai/codex/issues/31433)**
   Windows-specific session-state corruption: valid files exist but aren't indexed, and there's no built-in repair command. 12 comments; users want a `codex doctor`-style fix.

10. **[#34614 — Duplicate MCP suites accumulate; termination misses child processes](https://github.com/openai/codex/issues/34614)**
    Windows process-leak bug: `cmd.exe`/`node.exe` grandchildren survive session termination because the Job Object pattern isn't used on the MCP spawn path. 9 comments; a clear engineering fix is identified in-repo.

---

## Key PR Progress

1. **[#38806 — Add a health endpoint to the code-mode gRPC listener](https://github.com/openai/codex/pull/38806)**
   Serves `GET /healthz` over HTTP/1.1 and HTTP/2, while keeping gRPC methods HTTP/2-only. Improves observability for code-mode deployments.

2. **[#38795 — Add storage diagnostics to `codex doctor`](https://github.com/openai/codex/pull/38795)**
   Reports free space for `CODEX_HOME` and the worktree, warns below 5 GiB, fails below 1 GiB, and flags untrusted Dev Drives on Windows. Directly addresses the disk-bloat issue family.

3. **[#38785 — Keep active-turn model settings stable across updates](https://github.com/openai/codex/pull/38785)**
   Prevents mid-turn model configuration changes. Thread settings now apply to the next turn, not the current sampling request.

4. **[#38774 — Use paginated history for persistent exec threads](https://github.com/openai/codex/pull/38774)**
   Persistent `codex exec` threads now use paginated history; falls back to legacy for stores without support. Relevant to large-session performance issues.

5. **[#38743 — Scope TUI app directory state to the active context](https://github.com/openai/codex/pull/38743)**
   Invalidates stale app data when account, workspace, or thread changes. Fixes ghost apps appearing in the TUI picker.

6. **[#38705 — Add MCP tool handler support to the hooks engine](https://github.com/openai/codex/pull/38705)**
   Enables synchronous `mcp_tool` hook handlers, with nested placeholder expansion and JSON type preservation. A meaningful extension to the hook system.

7. **[#38704 — Normalize CRLF line endings in pasted text](https://github.com/openai/codex/pull/38704)**
   Fixes double line breaks when pasting Windows-style text into the TUI composer. Small but high-QoL fix for Windows users.

8. **[#38701 — Route permission requests through shared Guardian approvals](https://github.com/openai/codex/pull/38701)**
   Unifies `request_permissions` into the Guardian approval path, with preserved cancellation semantics. Simplifies the permission model across hooks and tools.

9. **[#38690 — Propagate request trace context through exec-server relays](https://github.com/openai/codex/pull/38690)**
   Adds W3C `traceparent`/`tracestate` to relay frames, including split encrypted records. Improves distributed tracing for exec-server deployments.

10. **[#38682 — Surface misalignment policy violations as typed errors](https://github.com/openai/codex/pull/38682)**
    Recognizes `misalignment_policy_violation` from response streams and HTTP 400/403, marks them non-retryable. Better error semantics for policy-based failures.

---

## Feature Request Trends

- **Workspace-scoped sessions**: [#3550](https://github.com/openai/codex/issues/3550) (closed) reflects strong demand for project/workspace isolation in the VS Code extension. Users want to separate chats by codebase, not a global list.
- **Session storage controls**: Multiple issues ([#34337](https://github.com/openai/codex/issues/34337), [#30779](https://github.com/openai/codex/issues/30779), [#35470](https://github.com/openai/codex/issues/35470)) request configurable limits, pruning, and compaction for rollout/session history.
- **Explicit cache controls**: [#37674](https://github.com/openai/codex/issues/37674) asks for native cache-control options on Bedrock, pointing to growing demand for cost-optimization knobs in cloud deployments.

---

## Developer Pain Points

- **Windows desktop performance is the #1 issue**: The cluster of stutter/freeze reports ([#20214](https://github.com/openai/codex/issues/20214), [#38546](https://github.com/openai/codex/issues/38546), [#38750](https://github.com/openai/codex/issues/38750), [#38719](https://github.com/openai/codex/issues/38719), [#38518](https://github.com/openai/codex/issues/38518)) points to a systemic problem in the Chromium-based desktop shell—idle CPU loops, input-starving reads, and crashpad storms.
- **Unbounded session storage**: Repeatedly reported on both Windows and macOS. Users are surprised by tens-to-hundreds of GiB of session JSONL, crash dumps, and duplicated images. The new `codex doctor` diagnostics are a step in the right direction.
- **Session corruption/poisoning**: Inline base64 images and unindexed rollout files break resume flows, causing `400`/`404` errors or silently dropped history.
- **Process cleanup gaps**: MCP and Computer Use subprocesses leak on Windows and macOS ([#34614](https://github.com/openai/codex/issues/34614), [#38760](https://github.com/openai/codex/issues/38760)), degrading system responsiveness and requiring manual kills.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**Gemini CLI Community Digest – 2026-08-16**

**1. Today's Highlights**
The Gemini CLI team is heavily focused on hardening sub-agent and memory systems, with maintainer-only bug reports covering agent hangs, misreported success states, and unreliable task tracking. Security is also a priority, with open PRs addressing an SSRF vulnerability, Docker base image upgrades, and a proposed fix to warn users on silent preview model substitution. The community continues to drive for greater agent autonomy, stability, and transparent behavior.

**2. Releases**
- **v0.56.0-nightly.20260815.g2a87e7be1**: Test fix migrating `process.env` to `vi.stubEnv` in a2a-server tests. [Changelog](https://github.com/google-gemini/gemini-cli/compare/v0.56.0-nightly.20260814.gc0d192452...v0.56.0)

**3. Hot Issues**
1. **Subagent recovery after MAX_TURNS reported as success** ([#22323](https://github.com/google-gemini/gemini-cli/issues/22323)): A critical P1 bug where subagents hit their turn limit but report a "GOAL" success, masking interruptions. This undermines trust in agent reporting, with 12 comments and strong community interest.
2. **Generalist agent hangs** ([#21409](https://github.com/google-gemini/gemini-cli/issues/21409)): Persistent issue causing indefinite hangs on simple tasks (e.g., folder creation), forcing users to disable subagent delegation entirely. High engagement with 8 👍.
3. **Zero-Dependency OS Sandboxing & Intent Routing** ([#19873](https://github.com/google-gemini/gemini-cli/issues/19873)): Major enhancement proposal to leverage the model's native bash skills with secure OS-level sandboxing, improving performance and command execution intent.
4. **Robust component-level evaluations** ([#24353](https://github.com/google-gemini/gemini-cli/issues/24353)): An epic focused on expanding behavioral evals (currently 76) across the agent platform, critical for systematic quality improvements.
5. **Model fails to use skills and sub-agents** ([#21968](https://github.com/google-gemini/gemini-cli/issues/21968)): Anecdotal but significant report that Gemini avoids custom skills and sub-agents unless explicitly forced, limiting user customization value.
6. **Auto Memory low-signal retry loop** ([#26522](https://github.com/google-gemini/gemini-cli/issues/26522)): Background extraction agent can loop indefinitely on low-signal sessions, wasting resources and clogging the memory pipeline.
7. **Shell command stuck on "Waiting input"** ([#25166](https://github.com/google-gemini/gemini-cli/issues/25166)): After simple commands complete, the CLI hangs showing the command as active, a core reliability issue disrupting workflows (3 👍).
8. **Subagents running without permission** ([#22093](https://github.com/google-gemini/gemini-cli/issues/22093)): Post-v0.33.0 regression where subagents are invoked despite agent mode being disabled in config, a permission/control concern for users.
9. **AST-aware file reads & codebase mapping** ([#22745](https://github.com/google-gemini/gemini-cli/issues/22745)): Epic exploring AST-aware tools for precise codebase navigation, potentially reducing token usage and error-prone reads.
10. **Browser agent ignores settings.json** ([#22267](https://github.com/google-gemini/gemini-cli/issues/22267)): Browser subagent fails to apply configuration overrides (e.g., `maxTurns`), limiting customization and causing unexpected behavior.

**4. Key PR Progress**
1. **Warn on silent preview model substitution** ([#28828](https://github.com/google-gemini/gemini-cli/pull/28828)): Fixes silent downgrade from `gemini-3.1-pro-preview` when user lacks entitlements, adding a much-needed warning.
2. **Fix false authentication errors for "401" substrings** ([#28827](https://github.com/google-gemini/gemini-cli/pull/28827)): Prevents unrelated values containing "401" from being misclassified as auth failures, reducing false negatives.
3. **Evals for task graph & error recovery** ([#28823](https://github.com/google-gemini/gemini-cli/pull/28823)): Adds behavioral evals for task dependency management, file 404 recovery, and shell failure retry logic.
4. **Evals for multi-tool chains & security** ([#28824](https://github.com/google-gemini/gemini-cli/pull/28824)): New evals covering complex tool sequences, large file context safety, and sensitive file boundary enforcement.
5. **Evals for task planning & tracking** ([#28822](https://github.com/google-gemini/gemini-cli/pull/28822)): Behavioral tests for `write_todos`, `complete_task`, and tracker status queries.
6. **Improve Vertex AI 401 error message** ([#28679](https://github.com/google-gemini/gemini-cli/pull/28679)): Enhances DX by providing specific guidance when standard API keys are mistakenly used with Vertex AI auth.
7. **Fix fallback for preview model 404s** ([#28608](https://github.com/google-gemini/gemini-cli/pull/28608)): Config now falls back to stable models when a preview model 404s with Gemini API key auth, improving resilience.
8. **Prevent SSRF via DNS bypass in web-fetch** ([#28725](https://github.com/google-gemini/gemini-cli/pull/28725)): Critical fix (CVSS 8.6) blocking malicious domains that resolve to private/loopback IPs.
9. **Upgrade sandbox Dockerfile to node:22-slim** ([#28726](https://github.com/google-gemini/gemini-cli/pull/28726)): Migrates base images from EOL Node 20 to Node 22 for continued security patches.
10. **Add `.opencode` to `.gitignore`** ([#28769](https://github.com/google-gemini/gemini-cli/pull/28769)): Housekeeping PR to prevent OpenCode IDE configuration from being tracked.

**5. Feature Request Trends**
- **Agent Runtime Reliability**: Requests cluster around fixing hangs, crashes, and misreported states in sub-agent execution, which are prerequisites for trusting autonomous workflows.
- **Enhanced Transparency & Control**: Users demand deeper visibility into subagent trajectories (`/chat share`), better permission enforcement, and clearer warnings on model/behavior changes.
- **Proactive Agent Behavior**: A clear push for the agent to naturally utilize its tools (skills, sub-agents) without explicit user prompts, improving autonomy and efficiency.
- **Systemic Quality via Evals**: A strong trend toward expanding behavioral test coverage to prevent regressions, covering tool chains, memory safety, and security boundaries.
- **Security-First Execution**: Multiple requests propose OS-level sandboxing and better redaction to safely enable the model's preferred bash-centric workflows.

**6. Developer Pain Points**
- **Unpredictable Agent Hangs & Exit Failures**: The most frequent and frustrating issues, with hangs occurring in both the generalist agent and post-command execution ("Waiting input" state), severely disrupting workflows.
- **Misleading Feedback & Reporting**: Subagents reporting "success" on turn limits or crashing without context (bug reports lacking subagent details) erodes developer trust in the output.
- **Config and Permission Ignorance**: Users are annoyed when the agent ignores explicit settings (e.g., disabled agents, `maxTurns` overrides) or executes destructive commands, leading to a loss of control.
- **Resource & Context Inefficiency**: Complaints about the model creating scattered temp scripts, leaking sensitive memory content to model context, and consuming tokens on low-signal data highlight a need for smarter and safer resource management.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest - 2026-08-16

## Today's Highlights

Two MCP OAuth regressions (#4480 closed, #4490 open) affecting Atlassian connections are drawing attention, suggesting a reliability gap in recent releases. A concerning `/spawn` prompt template bug (#4491) that can silently write to unrelated sessions and a hard-coded 60s MCP initialize timeout (#4421) are the most technically significant open issues this week.

## Releases

No new releases in the last 24 hours. Latest stable version is 1.0.80.

## Hot Issues

1. **[#3392 - Bash tool breaks on NixOS with version ≥1.0.49](https://github.com/github/copilot-cli/issues/3392)** [OPEN]
   A regression lasting 3 months — bash process fails to start on NixOS. 4 comments, 9 upvotes; community is actively investigating with strace output. High signal for Linux platform maintainers.

2. **[#4480 - Atlassian MCP OAuth fails with "Incompatible authorization server" on 1.0.79](https://github.com/github/copilot-cli/issues/4480)** [CLOSED]
   Regression from 1.0.71 breaking Atlassian remote MCP connections. Closed but tracks closely with the open #4490, indicating the fix may not have fully resolved the issue.

3. **[#4421 - MCP initialize handshake has a fixed 60s budget, no retry](https://github.com/github/copilot-cli/issues/4421)** [OPEN]
   npx-launched stdio servers fail ~29% of sessions with no recovery. Hard-coded timeout without retry/backoff is a systemic reliability concern for MCP adoption.

4. **[#4491 - /spawn template contradicts singular-spawn contract; no approval gate for cross-session writes](https://github.com/github/copilot-cli/issues/4491)** [OPEN]
   Security-relevant: the prompt template can turn "create child session" into "inject context into an unrelated running session." Lacks an approval gate on the resulting cross-session write.

5. **[#4493 - /restart fails in sessions created with -w](https://github.com/github/copilot-cli/issues/4493)** [OPEN]
   `copilot -w` sessions crash on `/restart` due to an option conflict between worktree flag and existing session ID. A straightforward UX bug in a core workflow.

6. **[#4494 - Newly enabled model remains unavailable until local cache is cleared](https://github.com/github/copilot-cli/issues/4494)** [OPEN]
   Model catalog staleness blocks newly enabled models in both CLI and VS. Likely affects many users silently; no comments yet, suggesting under-reporting.

7. **[#4499 - Fatal "Committing semi space failed" OOM with V8 heap at only 0.6/4.3 GB](https://github.com/github/copilot-cli/issues/4499)** [OPEN]
   Autopilot crash on Windows where host-RAM commit failure, not heap limit, is the culprit. Points to memory-mapping issues on the Node runtime layer.

8. **[#4501 - Codespaces ships Copilot CLI 1.0.3; update only works with sudo](https://github.com/github/copilot-cli/issues/4501)** [OPEN]
   Fresh Codespaces image is stale, and non-root `copilot update` silently fails. Affects onboarding experience for new users.

9. **[#4500 - BYOK autopilot turn re-serializes transcript items, breaking prompt caching](https://github.com/github/copilot-cli/issues/4500)** [OPEN]
   nudge turns rebuild the input array instead of resending prior items byte-for-byte, defeating BYOK prompt caching. Performance/cost issue with clear reproduction.

10. **[#4495 - Add support for GPT-5.6 reasoning.mode parameter](https://github.com/github/copilot-cli/issues/4495)** [OPEN]
    Feature request for selecting "standard" vs "pro" reasoning mode on GPT-5.6. No comments yet, but signals growing BYOK demand for newer model capabilities.

## Key PR Progress

Only 2 PRs updated this period:

1. **[#4497 - Handle fork PR associations in invalid-label writer](https://github.com/github/copilot-cli/pull/4497)** [OPEN]
   Fixes the trusted invalid-label automation for fork PRs where GitHub omits the pull request association; falls back to trusted workflow-run metadata with single-PR validation.

2. **[#4449 - Migrate pull request automation away from pull_request_target](https://github.com/github/copilot-cli/pull/4449)** [CLOSED]
   Security-hardening migration: replaces `pull_request_target` with issue-scoped tokens and a no-permission `pull_request` signal for mergeable PR handling.

## Feature Request Trends

- **Context tier control in ACP** (#4275): parity with interactive `/model` picker — repeatedly requested for non-interactive use.
- **Un-archive sessions** (#4502): ability to reverse accidental "Done" archival without data loss.
- **GPT-5.6 reasoning.mode support** (#4495): BYOK users want access to "pro" reasoning mode.
- **Protobuf OTLP export** (#2934): better OpenTelemetry interoperability beyond JSON-only payloads.

## Developer Pain Points

- **MCP OAuth reliability**: two regressions within a week on Atlassian connections; users report "worked in 1.0.78" but broken in 1.0.79/1.0.80.
- **MCP initialization fragility**: fixed timeouts without retry cause permanent session failures (~29% of npx-launched sessions).
- **Session management friction**: `/restart` conflicts with worktrees, accidental archival is irreversible, and `/spawn` can target unrelated sessions without approval.
- **Unexpected state staleness**: cached model catalogs and stale Codespaces binaries force manual intervention (clearing cache, `sudo`), disrupting CI and onboarding pipeline.
- **Model downgrade behavior**: silent downgrading of requested subagent models via the Task tool (#3565) continues to frustrate users wanting fine-grained model control.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

**Kimi Code CLI Community Digest — 2026-08-16**

---

### 1. Today's Highlights
Community attention is split between two critical areas: a suspected unannounced reduction in effective API quota for paid subscribers (Issue #2604), and a feature request for quota-aware context compaction (#2603) that would address runaway token usage on the new 1M-token K3 model. A long-pending PR (#2524) fixing a silent bug in the `StrReplaceFile` replacement counter is now open and ready for merge.

---

### 2. Releases
No new releases in the last 24 hours.

---

### 3. Hot Issues

- **[#1283] Feature Request: Memory System — Persistent context across sessions** — The oldest and most-voted issue remains open with 40 comments. Users continue to demand a persistent memory layer (AI-managed + manual) for retaining project patterns and user preferences. High community consensus; likely a roadmap-level feature.  
  [GitHub](https://github.com/MoonshotAI/kimi-cli/issues/1283)

- **[#2604] Effective weekly allowance appears reduced ~3–5× without announcement** — A Vivace-tier user provides wire-level JSONL data showing a sudden drop in allowed weekly tokens. The absence of an official changelog or service notice is escalating trust concerns. 2 comments so far; likely to attract rapid attention from other paid users.  
  [GitHub](https://github.com/MoonshotAI/kimi-cli/issues/2604)

- **[#2603] Quota-aware compaction: trigger on a token budget, not only max context window** — With K3’s 1M context window, standard compaction triggers are effectively disabled. Users on the substitution plan want compaction to respect the plan’s token *quota*, not just model limits. Zero comments but a precise, high-impact design proposal.  
  [GitHub](https://github.com/MoonshotAI/kimi-cli/issues/2603)

- **[#1155] openai_legacy provider drops reasoning content, causing APIEmptyResponseError** — A closed bug; the fix is presumably in. Relevant for users pointing at vllm/sglang backends. Notably, the lack of comments suggests it was dealt with silently, which may frustrate those affected.  
  [GitHub](https://github.com/MoonshotAI/kimi-cli/issues/1155)

---

### 4. Key PR Progress
(Only 2 PRs in the last 24h; both noted below.)

- **[#2524] fix(tools): count StrReplaceFile replacements against the running content** — Open, in review. Fixes a real correctness bug: sequential edits were counting replacements against the original file, causing failed or mis-reported edits for chained operations. Small, focused fix.  
  [GitHub](https://github.com/MoonshotAI/kimi-cli/pull/2524)

- **[#2506] fix(kosong): raise a clear error on circular $ref in deref_json_schema** — Merged/closed. Adds an explicit error instead of an infinite loop. Self-contained fix, under the 100-line guideline.  
  [GitHub](https://github.com/MoonshotAI/kimi-cli/pull/2506)

---

### 5. Feature Request Trends
- **Persistent Memory System** (#1283): The single most-requested feature; repeated across weeks with many comments. Users want both automatic and explicit memory.
- **Quota-aware context compaction** (#2603): A new trend tied to the K3 1M-token window. On subscription tiers, users expect the CLI to be “budget-aware” not just “context-window-aware.”
- **Reasonable and transparent quota enforcement** (#2604): While an issue rather than a request, the desire for *predictable, published allowances* is a clear implicit requirement.

---

### 6. Developer Pain Points
- **Opaque quota / metering changes** — The #2604 report is a trust-breaker; users are now actively instrumenting the client to verify billing behavior.
- **1M-token context window creates hidden cost traps** — Without quota-driven compaction (#2603), agentic loops can silently exhaust subscription budget.
- **Silent handling of bug reports** — Issue #1155 shows fixes landing without community-facing notes; users on custom backends are left guessing whether their issue is resolved.
- **Provider-specific correctness for reasoning streams** — The openai_legacy gap (#1155) highlights the fragility of multi-backend support, particularly for reasoning/model-native fields.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-08-16

## Today's Highlights
Service reliability is the dominant theme this week: multiple users report "Upstream request failed: Endpoint is unavailable" errors and workspace dashboard outages, while grok-4.5 continues to fail across OpenCode Go and Zen providers. On the development front, the core team landed important performance fixes including batched streamed session deltas and memory leak corrections, while contributors are actively building infrastructure for Docker and Incus workspace providers, per-session budgets, and voice input.

## Releases
No new releases in the last 24 hours.

## Hot Issues

1. **[#37790: OpenCode Go subscription paid but workspace shows "Insufficient balance"](https://github.com/anomalyco/opencode/issues/37790)** — User paid via Stripe, but the workspace refuses access. Active thread with 14 comments spanning nearly a month suggests billing sync issues remain unresolved.

2. **[#24879: Feature request for Go Pro tier ($20) with first-month discounts](https://github.com/anomalyco/opencode/issues/24879)** — 11 upvotes. Users hit monthly caps and want a mid-tier option between Go and Zen pay-as-you-go, plus promotional pricing. Strong demand signal for flexible billing.

3. **[#42143: "Why does Opencode require subscription when website says 100% free?"](https://github.com/anomalyco/opencode/issues/42143)** — Confusion over the free vs. paid model. Documentation and messaging misalignment is driving frustration.

4. **[#7801: Plan Mode + Question tool should auto-switch to Build mode](https://github.com/anomalyco/opencode/issues/7801)** — 31 upvotes, the highest community support this week. Users want the agent to automatically transition from planning to execution when a question is resolved.

5. **[#27924: Infinite compaction loop when compression fails to reduce context](https://github.com/anomalyco/opencode/issues/27924)** — A serious loop: overflow → compact → still overflow → repeat forever. Happens when compression state is lost or the context can't shrink below the token limit.

6. **[#40206: grok-4.5 broken on OpenCode Go since Aug 2](https://github.com/anomalyco/opencode/issues/40206)** — Persistent 500 errors via the Chat Completions API. Related reports at #40886 and #42802 confirm the same model fails on Zen with HTTP 503 and "Unexpected server error."

7. **[#42750: "Upstream request failed: Endpoint is unavailable"](https://github.com/anomalyco/opencode/issues/42750)** — API endpoint unavailability with infinite retries. Mirrored by #42757 and #42799, which also reports the `/workspace` dashboard returning 500 with database "transaction pool connection limit exceeded" errors.

8. **[#35649: Links wrapped across lines not clickable in Kitty terminal](https://github.com/anomalyco/opencode/issues/35649)** — OSC 8 hyperlinks break when URLs wrap. Duplicated by #42805, suggesting this is a real accessibility/usability gap.

9. **[#37671: V2 CLI headless commands load OpenTUI and leak native temp files](https://github.com/anomalyco/opencode/issues/37671)** — Commands like `--version` and `--help` load a 13.1 MiB `libopentui.so` into temp and never clean up. Resource leak that compounds with repeated calls.

10. **[#32911: Deepseek API burning too many tokens](https://github.com/anomalyco/opencode/issues/32911)** — Community-tested evidence (via Reddit) of overbilling in 1.17.x releases. Users are paying for tokens they shouldn't be.

## Key PR Progress

1. **[#42831: Docker blueprint workspaces](https://github.com/anomalyco/opencode/pull/42831)** — New local Docker workspace provider with immutable blueprint snapshots. The coordinator and model loop stay outside containers; subagents fork into isolated child containers that stop when idle.

2. **[#27554: Local LAN provider discovery](https://github.com/anomalyco/opencode/pull/27554)** — Open for 3 months. Adds mDNS-based auto-discovery of local OpenAI-compatible servers in `/connect` with automatic model detection. Closes two long-standing issues.

3. **[#42811: Session viewed state](https://github.com/anomalyco/opencode/pull/42811)** — Moves unread state from per-TUI local files into the Session model, so multiple clients converge on the same view state instead of disagreeing.

4. **[#42836: Prefer default agent's model for new ACP sessions](https://github.com/anomalyco/opencode/pull/42836)** — Fixes `session/new` in ACP to use the configured default agent's model rather than the config-level default, which could diverge.

5. **[#42833: Prevent variant select overlap on mobile](https://github.com/anomalyco/opencode/pull/42833)** — The reasoning-effort dropdown in the v2 prompt input overlapped the send button on 320–390px viewports. Simple, targeted CSS fix.

6. **[#42823: Per-session budget limit](https://github.com/anomalyco/opencode/pull/42823)** — Adds a `budget` field to sessions with a corresponding DB migration, plus `PATCH /session/:id` support. Pairs with the companion UI PR #42824 adding a budget panel and voice input button.

7. **[#42832: Scope Promise event iterators](https://github.com/anomalyco/opencode/pull/42832)** — Fixes an unowned stream bridge in the plugin Promise adapter. Now each async iterator gets its own Effect scope and queue, with terminal resolution so buffered events can't escape after unsubscribe.

8. **[#42826: Batch streamed session deltas](https://github.com/anomalyco/opencode/pull/42826)** — Previously every text, reasoning, and tool-input fragment was published as its own event. Batching reduces public event overhead and helps long sessions scale.

9. **[#42825: Release virtualized timeline elements](https://github.com/anomalyco/opencode/pull/42825)** — Fixes a memory leak where TanStack Virtual's `elementsCache` retained disconnected DOM nodes. One long session kept ~37,500 detached nodes in memory.

10. **[#42828: Numeric event timestamps](https://github.com/anomalyco/opencode/pull/42828)** — V2 event `created` values switch from `DateTime.Utc` to epoch milliseconds, eliminating round-trip conversions and improving serialization performance.

## Feature Request Trends

- **Billing flexibility**: Users want tiered plans between Go and Zen, per-session budgets, and clearer communication of subscription status.
- **Workspace isolation**: Docker and Incus provider PRs point toward containerized, forkable workspaces as a key direction.
- **Plan/Build mode automation**: The community strongly wants the agent to auto-switch from Plan to Build mode when it needs to use tools.
- **Local and LAN providers**: Auto-discovery of local servers via mDNS remains a heavily requested capability.
- **Mobile and voice input**: Growing interest in voice dictation and mobile-friendly UI fixes.

## Developer Pain Points

- **Endpoint instability**: Recurring "Endpoint is unavailable" and "Failed to fetch" errors suggest flaky upstream connectivity, especially recently.
- **Model-specific breakage**: grok-4.5 has been flaky for two weeks across Go and Zen providers with no transparent fix or status update.
- **Context compaction loops**: When compression doesn't shrink context, sessions can loop infinitely with no escape.
- **Temp file leaks**: V2's CLI loads native TUI libraries for headless commands and leaks 13 MB per invocation.
- **Token overbilling**: Deepseek token consumption issues erode trust in usage tracking.
- **Permission rules ignored**: Declared `permission.ask` rules aren't enforced at runtime, causing safety concerns for some agent workflows.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-08-16

## Today's Highlights

The Qwen Code team continues its aggressive autofix and review-pipeline hardening push, with a dense cluster of `/review` subsystem fixes landing (overlap detection, worktree isolation, retirement logic, schema friction). Meanwhile, the CI E2E test suite has seen a wave of failures on `main`, triggering a batch of P1 bug reports, and a new preview release (v0.21.12-preview.5) is out. The SWE-bench + Terminal-Bench smoke test chain has stabilized after several iterations, with all recent runs reporting SUCCESS.

## Releases

- **v0.21.12-preview.5** ([changelog](https://github.com/QwenLM/qwen-code/compare/v0.21.12...v0.21.12-preview.5)) — Preview release with no detailed change notes beyond the version bump; likely a stabilization/rolling update.
- **v0.21.11-nightly.20260816.5677823abb** — Nightly build shipping `feat(autofix): deny-by-default footprint gate and positional window censuses` ([PR #9156](https://github.com/QwenLM/qwen-code/pull/9156)).
- **Smoke test chain** (`dsw-eas-tb-smoke-*`, r1–r5) — Successive end-to-end validations of the Release → SWE-bench Verified → Publisher → Terminal-Bench 2.0 pipeline. Final runs report **SWE-bench Verified SUCCEEDED** (1/1 resolved, 0 errors) and **Terminal-Bench 2.0 SUCCEEDED** (1/1 completed), with the benchmark reference pinned to v0.21.12.

## Hot Issues

1. **[#7427 — Web-shell artifact panel spams 'Load artifacts failed' on auto-refresh](https://github.com/QwenLM/qwen-code/issues/7427)**
   Persistent toast errors on background refresh in the `qwen serve` web shell. A regression pin PR ([#9227](https://github.com/QwenLM/qwen-code/pull/9227)) is already up, confirming the spam no longer reproduces on main. Community: 5 comments.

2. **[#9253 — Web Shell dev tabs white-screen after dev-server/daemon restarts](https://github.com/QwenLM/qwen-code/issues/9253)**
   Fresh P2: long-open dev-mode tabs go blank after Vite/daemon restarts with no recovery UI. A boot fallback PR ([#9254](https://github.com/QwenLM/qwen-code/pull/9254)) landed the same day. Community: 2 comments.

3. **[#9250 — `qwen serve` host writer hard-codes new-file mode 0600 (ignores umask)](https://github.com/QwenLM/qwen-code/issues/9250)**
   Security/UX: `write_file`, `edit`, and `notebook_edit` unconditionally create files with 0600, ignoring the daemon umask and offering no configuration. Community: 4 comments, no fix in flight yet.

4. **[#9230 — Follow-up suggestion side query defeats server-side prefix caching](https://github.com/QwenLM/qwen-code/issues/9230)**
   Performance regression on prefix-caching servers (e.g., llama.cpp): main session re-prefills the entire context on every turn (~0% cache reuse) because the follow-up suggestion query reorders/schedules turns by LRU. Community: 3 comments.

5. **[#9198 — `qwen` runs out of memory after a week-long session](https://github.com/QwenLM/qwen-code/issues/9198)**
   OOM on a 1 TB server after ~7 days of continuous use, with the tmux UI becoming unresponsive afterward. User notes Qwen Code is the only tool exhibiting this; Kimi Code runs fine. Status: need-information. Community: 3 comments.

6. **[#9089 — Autofix PAT-bearing jobs share a host with untrusted branch code](https://github.com/QwenLM/qwen-code/issues/9089)**
   P1 security: autofix steps with PAT run on the same runner pool as untrusted branch code. Author states this **cannot be solved within a GitHub Actions step** and requires runner-level isolation. Community: 4 comments, ongoing.

7. **[#9218 — `/review --new-findings` rejects the Step 6 findings artifact (path collision)](https://github.com/QwenLM/qwen-code/issues/9218)**
   The presubmit gate's `--new-findings` flag collides with the skill's own example file path, causing false rejections. One of five review-pipeline issues filed in the last 24h. Community: 4 comments.

8. **[#9208 — `/review` overlap-drop swallows ledger re-posts and drops distinct same-line claims](https://github.com/QwenLM/qwen-code/issues/9208)**
   The presubmit overlap detector is content-blind: it drops any finding at a matching `(path, line)`, including carried-id re-posts. Ledger state is lost deterministically. PR [#9212](https://github.com/QwenLM/qwen-code/pull/9212) is in progress. Community: 3 comments.

9. **[#9205 — Concurrent same-PR reviews race on the fixed worktree path](https://github.com/QwenLM/qwen-code/issues/9205)**
   `fetch-pr` writes to a fixed `.qwen/tmp/review-pr-<n>` path; a second review of the same PR deletes the first's worktree mid-run (5 unvouched deletions observed). Community: 3 comments.

10. **[#9200 — User frustration: inconsistent behavior with identical local-module tasks](https://github.com/QwenLM/qwen-code/issues/9200)**
    A candid community post comparing Qwen Code unfavorably to a deprecated tool ("iflow cli"), claiming identical tasks on the same local module produce wildly different traces. Status: need-information; 4 comments, generating visibility on execution consistency.

## Key PR Progress

1. **[#9255 — fix(ci): keep a fallback comment when the PR review runner dies](https://github.com/QwenLM/qwen-code/pull/9255)**
   Adds a preflight health probe and a fallback comment so a dead review job leaves an explanation instead of silence.

2. **[#9254 — fix(web-shell): show a boot fallback instead of a white screen](https://github.com/QwenLM/qwen-code/pull/9254)**
   Dependency-free boot watchdog in `index.html`; renders a bilingual, theme-aware error with a reload button when assets fail to load.

3. **[#9212 — fix(review): exempt carried-id re-posts from the presubmit overlap drop](https://github.com/QwenLM/qwen-code/pull/9212)**
   Makes the overlap gate id-aware: existing comments carrying the same ledger id (`R<round>-<n>`) are additive, not dropped.

4. **[#9235 — fix(serve): redact skill bodies from the Web Shell event surface](https://github.com/QwenLM/qwen-code/pull/9235)**
   Stops sending full SKILL.md bodies to browser-facing events; only native clients that display/edit skills receive them.

5. **[#9247 — fix(review): budget the composed body against GitHub's review limit](https://github.com/QwenLM/qwen-code/pull/9247)**
   `compose-review` now trims in a fixed order (deferrals → disclosures → blockers) to stay inside the 65,536-char GitHub cap.

6. **[#9227 — test(web-shell): pin silent failure of background artifact refreshes (#7427)](https://github.com/QwenLM/qwen-code/pull/9227)**
   Regression pin confirming the toast-spam no longer exists on main (the refresh path now swallows failures silently). Closes the loop on #7427.

7. **[#9153 — feat(review): wire --resume through /review, review run and the CI retry](https://github.com/QwenLM/qwen-code/pull/9153)**
   Completes the resume series: `/review` accepts `--resume` on PR targets (warn-and-ignore elsewhere), and `review run` + CI retry now carry it.

8. **[#9216 — feat(release): user-facing bilingual digest for release notes](https://github.com/QwenLM/qwen-code/pull/9216)**
   Turns the finalize step from a PR list into a user-facing digest: the model groups changes into capability themes with plain-language intros.

9. **[#9183 — feat(review): scale the reverse-audit round cap to the diff topology](https://github.com/QwenLM/qwen-code/pull/9183)**
   Round cap is now topology-aware: 10 (small diff), 5 (chunked), 3 (huge) — huge tier checked first as a finishability ruling.

10. **[#9213 — fix(review): fix silent reverse-audit retirement failures and keep non-converged evidence](https://github.com/QwenLM/qwen-code/pull/9213)**
    Dry-receipt parser now accepts sentence punctuation (period/comma/semicolon, either width); retirement failures become observable instead of silent.

## Feature Request Trends

- **Review pipeline ergonomics** — The loudest theme this cycle: `/review` is powerful but fragile at the edges. Requests cluster around schema stability (source tags, state field types, `locations[]` shape), resume/extensibility (`--resume`, topology-aware round caps), and output quality (plain-prose comments, size budgeting, user-facing digests).
- **Web-shell resilience** — Recurring asks for visible errors instead of white screens / silent toast spam, plus retaining manual session names after `/clear`.
- **Session lifetime governance** — Session rotation (`maxTurns`/time-based bounds) and empty-channel graceful handling are moving from proposals to implemented PRs.
- **Security hardening** — Redaction of skill bodies from browser event surfaces; runner-level isolation for PAT-bearing jobs; umask-respecting file modes.
- **Caching & performance** — Ensure follow-up suggestion queries don't defeat server-side prefix caching; investigate long-session OOM behavior.

## Developer Pain Points

- **CI instability on `main`** — Multiple E2E failures tracked per-commit (#9248, #9159, #9241, #9239, #9237) with P1 priority and autofix approved; the community is being asked to bake in resilience rather than fix one-off flakes.
- **Review-pipeline brittleness** — Five separate issues (#9205–#9209, #9219) describe distinct failure modes in one subsystem: worktree races, swallowed ledger posts, schema friction at the last gate, exact-line-only overlap matching, and mutation probes corrupting the shared worktree. The sheer density signals ergonomics debt.
- **Nondeterminism in execution traces** — Users report same-task, same-module runs producing very different traces; one report (#9200) openly questions reliability compared to older tools.
- **Context-cache inefficiency** — Repeated full re-prefills on prefix-cache-aware servers is a measurable performance tax; no fix confirmed yet.
- **Long-running process degradation** — OOM after week-long sessions, tmux UI corruption, and white-screen death after dev-server restarts are emerging as a class of "longevity" bugs on the web shell and daemon side.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar).*