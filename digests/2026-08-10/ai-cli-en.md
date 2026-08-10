# AI CLI Tools Community Digest 2026-08-10

> Generated: 2026-08-10 01:25 UTC | Tools covered: 7

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

# AI CLI Tools Cross-Tool Comparison Report — 2026-08-10

## 1. Ecosystem Overview

The AI CLI tool landscape is experiencing rapid maturation characterized by three simultaneous pressures: safety-classifier reliability, cross-platform stability, and multi-agent orchestration. Claude Code's server-side "ClAudit" false-positive cluster (13+ issues in hours) highlights the risks of opaque, non-overridable safety layers, while GitHub Copilot CLI's MCP handshake and fail-closed policy issues expose fragility in enterprise integration layers. Simultaneously, the community is converging on a shared feature vocabulary—session portability, native model fallback, agent-to-agent delegation, and configurable status lines—suggesting feature parity is now the baseline expectation. Windows remains the weakest platform across all tools, with crash loops, Computer Use failures, and installer bugs dominating bug reports.

## 2. Activity Comparison

| Tool | New/Active Issues | Active PRs | Release Status |
|---|---|---|---|
| Claude Code | 10 hot issues (13+ ClAudit cluster) | 4 PRs | No release in 24h |
| OpenAI Codex | 10 hot issues | 6 PRs (5 closed, 1 open) | No release in 24h |
| Gemini CLI | 10 hot issues (2 P1 bugs) | 10 PRs | Nightly v0.56.0 released |
| GitHub Copilot CLI | 10 hot issues (25 new total) | 0 PRs | No release in 24h |
| Kimi Code CLI | 2 issues with activity | 1 PR | No release in 24h |
| OpenCode | 10 hot issues | 10 PRs | No release in 24h |
| Qwen Code | 10 hot issues | 10 PRs | Nightly v0.21.8 released |

## 3. Shared Feature Directions

The following requirements appear across multiple tool communities:

- **Session portability**: Claude Code (#28745, 76👍), Codex (#5609, 63👍), Copilot CLI (#2751), and Qwen Code (#8678) all face session location/resume limitations. Users expect conversations to survive directory moves, sync across devices, and restore without data loss.

- **Native model fallback/failover**: OpenCode (#7602, 107👍) and Gemini CLI's tool-scoping issues (#24246) point to a shared need for automatic fallback chains across model IDs/providers when rate limits or errors occur.

- **Agent-to-agent delegation**: Gemini CLI (#28738 PR, #22092) and Qwen Code (#8718, #8804 `/coordinate`) are actively building subagent-to-subagent communication, while Copilot CLI (#4420) struggles with parallel tool-call correlation—a prerequisite for reliable delegation.

- **Configurable HUD/status line**: Codex (#17827, 150👍) and Copilot CLI (#4418) both request shell-script-driven status bars mirroring Claude Code's configurable UI.

- **Localization**: Claude Code (#31413) and Copilot CLI (#4407, zh-CN) independently request i18n/l10n support.

- **MCP reliability**: Copilot CLI (handshake timeouts, fail-closed policies), Qwen Code (#8784, optional stream rejection kills connection), and Kimi Code (#739, Google GenAI metadata rejection) all report MCP integration fragility.

- **Auto-memory/persistent context**: Gemini CLI (Auto Memory retry loops, redaction concerns #26522/#26525) and Kimi Code (#1283, Memory System) both pursue long-term context persistence.

- **Subagent permission/steering visibility**: Copilot CLI (#4420), Gemini CLI (#22093, subagents running without permission), OpenCode (#13715, nested permission hangs), and Codex (#33885, child thread corrections) all struggle with subagent permission rendering and enforcement.

## 4. Differentiation Analysis

**Claude Code** is positioning as the enterprise safety-first tool, but its server-side ClAudit classifier (Opus 4.8) is actively damaging trust—false positives with no override mechanism. It leads in plugin/skills spec compliance work (PRs #85243, #85323) but lags in agent-to-agent delegation.

**OpenAI Codex** is the most community-responsive on quality-of-life PRs (TUI wrapping, gRPC transport, bounded path resolution) but its desktop app is the least stable on Windows (crash loops, Computer Use failures). Its strongest community demand—customizable status line—mirrors Claude Code's existing capability, suggesting Codex is playing catch-up on UI configurability.

**Gemini CLI** is investing most aggressively in delegated intelligence: agent-to-agent calls (#28738), AST-aware tooling (#22745), and a caretaker-agent self-maintenance pattern. Its P1 issues around subagent success misreporting and generalist hangs indicate the delegation layer is outpacing reliability.

**GitHub Copilot CLI** is enterprise-integration-focused but its MCP layer is the most fragile in the ecosystem: hard-coded handshake budgets, fail-closed interim policies, and silent prompt drops. Model availability confusion (enabled models missing from catalogue) suggests organizational entitlement plumbing is broken.

**Kimi Code CLI** is minimal-activity but users express a strong desire for persistent memory context (#1283) and configurable streaming timeouts (#2598). It appears to be a smaller-footprint tool with fewer integration surfaces.

**OpenCode** is a V2-architecture builder focused on infra: Go relay reliability, session durability/archival, and renderer performance (75.5% memory reduction). Its Go relay leading-space bug is a simple but systemic validation failure, and free-tier rate-limit confusion indicates billing/accounting bugs.

**Qwen Code** is the most feature-velocity tool: nightly releases, native multi-agent coordination (|coordinate|), Goal v3 state machines, and workflow-engine orchestration. Its focus on deterministic workflow orchestration over model-driven improvisation is distinctive.

## 5. Community Momentum & Maturity

**Most active communities (by issue volume and reactions):** OpenCode (110👍 clipboard bug, 107👍 fallback) and Codex (150👍 status line) have the highest single-issue engagement. Gemini CLI has sustained P1 discussion with moderate reactions. Claude Code's ClAudit cluster demonstrates scale (13+ issues in hours) but the most-voted feature (#28745, 76👍) is a long-standing usability gap.

**Rapid iteration:** Qwen Code (nightly releases, 10 PRs) and Gemini CLI (nightly, 10 PRs) are shipping fastest. OpenCode is also PR-dense (10) despite no release. Copilot CLI had zero PRs in 24h—the least active PR pipeline.

**Maturity signals:** Claude Code and Codex are in stability-hardening phases (regressions, false positives, silent failures). Qwen Code and Gemini CLI are in feature-acceleration phases with growing reliability debt. Copilot CLI is in an integration-brittleness phase. Kimi Code is lowest-activity, likely a smaller team or narrower scope.

## 6. Trend Signals

- **Safety layers are becoming a liability**: Claude Code's ClAudit false-positive cluster and Copilot CLI's fail-closed MCP window both demonstrate that opaque, non-overridable safety policies actively disrupt paid users and erode trust. Expect community push for user-controllable safety thresholds and local-first policy evaluation.

- **Multi-agent orchestration is the next battleground**: Qwen Code (|coordinate|), Gemini CLI (agent-to-agent PR), and OpenCode (nested permission fixes) are all moving toward hierarchical task decomposition. The key differentiator will be reliable permission propagation and state correlation—currently the weakest link.

- **Windows support is the universal weak point**: Crash loops (Codex, Gemini CLI), installer failures (Qwen), and Computer Use failures (Codex) suggest Windows is an afterthought across the ecosystem. Tools that invest in Windows CI and native testing will capture enterprise share.

- **Persistent memory is the untapped differentiator**: Kimi Code (#1283), Gemini CLI (Auto Memory), and OpenCode (daemon with memory recall, #41453) all pursue cross-session context. No tool has solved it cleanly; the ones that do will win long-running workflow users.

- **MCP must become bulletproof**: Copilot's handshake budget, Qwen's optional-stream rejection, and Kimi's provider metadata rejection all point to MCP as the integration layer most likely to fail silently. Expect spec-compliant probes, retry/backoff, and graceful degradation to become compliance requirements.

- **Streaming determinism is a debugging prerequisite**: Kimi's silent hangs without wire logging (#2598) and Codex's dead WebSocket after network loss (#33163) reveal that streaming session management is a debugging black box. Configurable idle timeouts and guaranteed wire-protocol persistence will become baseline expectations.

- **Status-line and UI configurability are table stakes**: Codex (150👍) and Copilot CLI (#4418) both request what Claude Code already offers. Expect shell-script-driven HUDs (token usage, model, branch) and localization to become feature-parity criteria in enterprise RFPs.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

**Report Date: 2026-08-10**

---

## 1. Top Skills Ranking

The most-discussed PRs cluster around a single dominant topic: the broken evaluation loop in the `skill-creator` skill. Four of the top five PRs by comment volume are independent fixes for the same underlying bug.

- **[PR #1298 — Fix `run_eval.py` Recall=0% Bug & Windows Compatibility](https://github.com/anthropics/skills/pull/1298)** (MartinCajiao, OPEN) — The highest-attention PR. Fixes the evaluation harness that reports `recall=0%` on every skill description, rendering the description-optimization loop useless. Addresses issues #556 and #1169. Discussion focuses on Windows stream handling, trigger detection, and parallel worker isolation. **Status: OPEN**

- **[PR #514 — Add `document-typography` Skill](https://github.com/anthropics/skills/pull/514)** (PGTBoos, OPEN) — Proposes a quality-control skill for AI-generated documents: orphan word wrap, widow paragraphs, and numbering misalignment. Discussion emphasizes that these typographic defects affect nearly every Claude-generated document and users rarely request fixes explicitly. **Status: OPEN**

- **[PR #538 — Fix Case-Sensitive File References in PDF Skill](https://github.com/anthropics/skills/pull/538)** (Lubrsy706, OPEN) — Corrects 8 case-sensitivity mismatches in `skills/pdf/SKILL.md` (`REFERENCE.md` → `reference.md`, `FORMS.md` → `forms.md`). Breaks on case-sensitive filesystems (Linux, macOS). Low-complexity, high-impact fix. **Status: OPEN**

- **[PR #486 — Add ODT Skill](https://github.com/anthropics/skills/pull/486)** (GitHubNewbie0, OPEN) — Adds OpenDocument Format support: create, fill, read, and convert `.odt`/`.ods` files, plus ODT-to-HTML conversion. Triggers on 'ODT', 'ODS', 'LibreOffice', and related terms. **Status: OPEN**

- **[PR #210 — Improve `frontend-design` Skill Clarity](https://github.com/anthropics/skills/pull/210)** (justinwetch, OPEN) — Revisions to make every instruction actionable within a single conversation and steer behavior without ambiguity. Discussion centers on specificity thresholds: instructions that are too generic do not change model behavior. **Status: OPEN**

- **[PR #541 — Fix DOCX Tracked Change ID Collision](https://github.com/anthropics/skills/pull/541)** (Lubrsy706, OPEN) — Fixes document corruption when adding tracked changes to files with existing bookmarks. Root cause: OOXML `w:id` is a shared ID space across bookmarks, tracked changes, and comments; hardcoded low IDs collide. **Status: OPEN**

---

## 2. Community Demand Trends

- **Skill-Creator Reliability (Priority #1)** — The community's largest pain point is `run_eval.py` reporting 100% precision / 0% recall on every test query, making the description-optimization loop optimize against noise. Multiple independent reproductions (issues #556, #1169) and four separate fix PRs (#1298, #1323, #1261, #1050) confirm this is systemic, not environmental.

- **Document Trust Boundaries** — Issue #492 (43 comments, the most-discussed issue) demands: community skills must not be distributed under the `anthropic/` namespace. Users report granting elevated permissions to skills they believed were official Anthropic releases. The community wants clear namespace separation and trust badges.

- **Document Format Robustness** — High activity around ODT creation, PDF case-sensitivity, and DOCX ID collisions. The demand is for document skills that do not corrupt files, preserve formatting, and work cross-platform (Linux/macOS case-sensitive paths).

- **Context Window Efficiency** — Issue #1487 (156k-token injection by `claude-api` skill) and issue #189 (duplicate skills installed by `document-skills` and `example-skills`) signal demand for leaner skills that do not eagerly consume context.

- **Org-Wide Skill Sharing** — Issue #228 (16 comments, 8 👍) requests direct skill sharing within organizations instead of manual `.skill` file downloads sent via Slack/Teams.

**Neglected demand that no PR addresses yet:** skill versioning, rollback, and conflict resolution when a user has multiple skills with overlapping trigger descriptions.

---

## 3. High-Potential Pending Skills

These PRs have active discussion, address clearly-articulated needs, and are likely to merge:

- **[PR #1099 — Fix `run_eval.py` Windows Subprocess Crash](https://github.com/anthropics/skills/pull/1099)** (joshuawowk, OPEN) — Fixes `[WinError 10038]` flood on Windows that records every query as "not triggered." 1-2 line fix; directly unblocks Windows skill-creator users.

- **[PR #1050 — Fix Windows Subprocess + Encoding Bugs](https://github.com/anthropics/skills/pull/1050)** (gstreet-ops, OPEN) — Fixes `subprocess.Popen(["claude", ...])` failing with `[WinError 2]` because the CLI ships as `claude.cmd` on Windows. Also 1-line fixes; complements #1099.

- **[PR #1323 — Fix Trigger Detection Missing Real Skill Name](https://github.com/anthropics/skills/pull/1323)** (Polluelo978, OPEN) — Fixes the eval loop bailing on the first non-Skill tool and missing real trigger names. Directly addresses the recall=0% root cause from a different angle than #1298.

- **[PR #1261 — Isolate Trigger-Eval Command Files from Live Project](https://github.com/anthropics/skills/pull/1261)** (alvingarcia, OPEN) — Fixes #1260: the eval writes synthetic command files into the user's live `.claude/commands/` directory, causing concurrent Claude Code sessions to pick them up mid-eval. Isolates eval artifacts from production.

- **[PR #1367 — Add `self-audit` Skill v1.3.0](https://github.com/anthropics/skills/pull/1367)** (YuhaoLin2005, OPEN) — Mechanical file verification + four-dimension reasoning quality gate before delivery. Universal across tech stacks. Active discussion; author also filed proposal issue #1385 for a broader quality-gate pipeline.

- **[PR #1302 — Add `color-expert` Skill](https://github.com/anthropics/skills/pull/1302)** (meodai, OPEN) — Self-contained color expertise: naming systems (ISCC-NBS, Munsell, RAL), color spaces with a "what to use when" table, and CAM16. Discussion ongoing since late June.

---

## 4. Skills Ecosystem Insight

The community's most concentrated demand is fixing the broken `skill-creator` evaluation harness so that skills can be reliably tested and optimized — every other ecosystem pain point (Windows support, trigger detection, project isolation) is downstream of that single failure.

---

**Claude Code Community Digest — 2026-08-10**

---

## 1. Today's Highlights

A significant cluster of new reports (filed 2026-08-09) describes a **server-side cybersecurity classifier ("ClAudit") repeatedly false-positiving on routine, authorized work**, halting sessions mid-task. The flagging model has been upgraded to Opus 4.8, and users report the classifier cannot be overridden via `/model`. Additionally, a new bug report details **denied tool calls executing anyway** (PowerShell), and a long-standing feature request for **resuming conversations across directories** continues to gain traction with 76 👍.

---

## 2. Releases

No releases in the last 24 hours.

---

## 3. Hot Issues

1. **[#67246 — Safety-classifier model switch (Fable 5 → Opus 4.8) fires on benign content and can't be overridden with /model](https://github.com/anthropics/claude-code/issues/67246)** — 12 comments, 3 👍. Users report Opus 4.8 flags normal engineering discussion (e.g., "cybersecurity or biology") and silently forces a model switch. Despite the notice admitting false positives are expected, there is no working override mechanism. High severity: blocks workflow on benign tasks.

2. **[#28745 — Allow resuming conversations from different directories](https://github.com/anthropics/claude-code/issues/28745)** — 11 comments, 76 👍. One of the most-voted open feature requests. Conversations are bound to their originating directory; if that directory is moved/deleted, the session becomes unreachable. Community asks for detached/resumable sessions independent of the filesystem path.

3. **[#31413 — UI language localization support](https://github.com/anthropics/claude-code/issues/31413)** — 13 comments, 8 👍. Request for i18n/l10n of the Claude Code UI (menus, messages, etc.). Gaining steady community interest since March.

4. **[#85240 — Remote Control: responses never render in browser until manual page refresh](https://github.com/anthropics/claude-code/issues/85240)** — 5 comments. Reproducible across iPad Safari/Chrome and macOS Safari for every response. Remote Control page is effectively broken for these environments; only a manual refresh yields output.

5. **[#83760 — A denied tool call was executed anyway (PowerShell tool ran despite "deny")](https://github.com/anthropics/claude-code/issues/83760)** — 2 comments. Permission model bug: "deny" action is ignored for certain tool calls. Critical safety concern for the permission/prompt-engineering pipeline.

6. **[#85008 — VSCode: forking copies the conversation but never attaches the new tab to it](https://github.com/anthropics/claude-code/issues/85008)** — 2 comments. Forked conversations become blank; new tab is invisible in session list. Regression of #31831; still reproducible on 2.1.226.

7. **[#81100 — Desktop app: 30-day retention sweep deletes the only copy of Desktop transcripts](https://github.com/anthropics/claude-code/issues/81100)** — 2 comments. Distinct from CLI data-loss bug #59248: retention sweep leaves "ghost entries" that error on click. Root cause not yet identified.

8. **[#81658 — Cross-platform sync failure (Desktop/Web/Android) causing Cowork conversations to disappear](https://github.com/anthropics/claude-code/issues/81658)** — 4 comments. Users report conversations/chats vanish; suspected server-side incident, but no official acknowledgment yet.

9. **[#85375–#85392 — Series of ClAudit (Opus 4.8) false-positive reports](https://github.com/anthropics/claude-code/issues/85375)** — 13+ separate issues filed within hours on 2026-08-09; each halts a legitimate session. This is a systemic safety-filter reliability problem that is actively disrupting paid users.

10. **[#85413 — Claude Desktop auto-update relaunches the app and silently kills live session hosts](https://github.com/anthropics/claude-code/issues/85413)** — 0 comments yet. On macOS, auto-update restarts the process without permission, killing long-running sessions/jobs. No disable option.

---

## 4. Key PR Progress

1. **[#85409 — security-guidance: update default model refs from Opus 4.7/Sonnet 4.6 to Opus 5/Sonnet 5](https://github.com/anthropics/claude-code/pull/85409)** — Corrects hardcoded model references in the security-guidance plugin to current models. Review model default now Opus 5; fallback Sonnet 5.

2. **[#85323 — fix(plugin-dev): parse block scalar agent descriptions](https://github.com/anthropics/claude-code/pull/85323)** — Fixes YAML block-scalar parsing defect from #83803. `validate-agent.sh` now measures multiline `description: |`/`>` from indented content, not the marker.

3. **[#85243 — fix(skills): use spec-conformant names in the plugin-dev and hookify skills](https://github.com/anthropics/claude-code/pull/85243)** — Eight bundled skills declare title-cased names containing spaces (e.g., "Writing Hookify Rules"). Aligns SKILL.md `name:` fields with spec.

4. **[#17395 — Plugin: Add `agent-session-commit` plugin to incrementally iterate on `AGENTS.md`](https://github.com/anthropics/claude-code/pull/17395)** — Adds `AGENTS.md` as authoritative project instructions, makes `CLAUDE.md` a pointer; new plugin supports manual (`/session-commit`) and automatic (Stop hook) iteration. Closed (not merged), but notable for the project-instructions pattern.

*Note: only 4 PRs were active/updated in the last 24h.*

---

## 5. Feature Request Trends

- **Session portability / resumability** (#28745, 76 👍): Sessions should be resumable from any directory or after the original path is gone. Likely the most-requested single enhancement.
- **UI localization** (#31413): Growing demand for non-English UI support, driven by the international community.
- **Pinned-session protection in the Desktop client** (#62104): Users want archive/delete commands blocked on pinned sessions, including over MCP.
- **Agent/skills spec compliance**: PRs #85243 and #85323 reflect community pressure for spec-conformant plugin/skill metadata and validation tooling.

---

## 6. Developer Pain Points

- **Safety-classifier false positives (signal: critical)**: Opus 4.8-powered "ClAudit" routinely halts legitimate sessions on benign content, with no override. High-frequency, high-severity, and recurring across users.
- **Tool-permission enforcement bugs**: Denied tool calls executing anyway (#83760). Undermines trust in the permission system.
- **Data loss / retention issues**: Desktop retention sweep deletes transcripts fully (#81100); sync failures make conversations disappear (#81658). Users cannot rely on persistence.
- **Fork/resume fragility in editors**: VSCode fork still blank (#85008); directory-bound sessions remain unresumable (#28745).
- **Auto-update killing long-running processes** (#85413): Desktop updates relaunch without consent and terminate live session hosts — unacceptable for headless/remote operation.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**OpenAI Codex Community Digest — 2026-08-10**

**1. Today's Highlights**
The Codex ecosystem this week is dominated by Windows-specific stability issues, with multiple reports of Computer Use failures (`EnumWindows` errors, `node_repl exec context not found`) and a silent crash loop in the desktop app. On the positive side, several quality-of-life PRs landed, including gRPC TCP transport for the code-mode host, bounded Cursor project path resolution, and a fix for TUI composer whitespace wrapping. A long-standing performance complaint around slow thread switching continues to attract attention, with a new report of a ~5-second owner-discovery timeout before any unloaded chat opens.

**2. Releases**
No new releases were published in the last 24 hours.

**3. Hot Issues**
1. **#17827 — Customizable status line** (👍 150, 39 comments) — The most upvoted open feature request. Users want a Claude Code-style configurable status bar (token usage, model name, git branch) via shell scripts. High demand with no maintainer response yet.
   https://github.com/openai/codex/issues/17827

2. **#11011 — Switching between threads is very slow** (👍 19, 21 comments) — Long-running performance regression in the desktop app. Multiple users confirm sluggish thread switching after updates; the issue has been open since February.
   https://github.com/openai/codex/issues/11011

3. **#23527 — Mobile does not show SSH remote projects** (👍 19, 13 comments) — Codex mobile fails to list SSH remote projects visible on the connected Mac host. Blocks remote workflows for mobile users.
   https://github.com/openai/codex/issues/23527

4. **#37398 — 5-second delay opening unloaded chats** (👍 6, 6 comments) — New report of fixed owner-discovery timeout (~5s) before chat display, even for small transcripts. Fresh regression, high impact for daily use.
   https://github.com/openai/codex/issues/37398

5. **#5609 — Sync chats across ChatGPT, VSCode, web** (👍 63, 6 comments) — Long-standing request for unified conversation history across all Codex surfaces (web, IDE, desktop, Codespaces). Strong community support.
   https://github.com/openai/codex/issues/5609

6. **#37595 — Computer Use list_windows fails on Windows** (5 comments) — `EnumWindows` error `0x80070003` when interrupt marker path is absent. New and actively updated; a duplicate (#37734) was closed, indicating the team is triaging.
   https://github.com/openai/codex/issues/37595

7. **#37281 — Computer Use get_window_state fails** (👍 3, 3 comments) — Windows window inspection fails with `node_repl exec context not found`. Computer Use on Windows is effectively broken for state capture.
   https://github.com/openai/codex/issues/37281

8. **#37752 — Desktop app silent crash loop on Windows 11** (2 comments) — App exits ~25s after launch, even with a blank profile; CLI works fine. Critical blocker for Windows desktop users.
   https://github.com/openai/codex/issues/37752

9. **#33163 — CLI reuses dead WebSocket after network loss** (2 comments) — After idle network loss, the CLI continues using a dead Responses WebSocket, breaking the next turn. Transport liveness bug in CLI.
   https://github.com/openai/codex/issues/33163

10. **#33885 — MultiAgentV2: allow child thread corrections** (👍 6, 2 comments) — Request to let parent threads steer/correct sub-agent threads. Post-0.145.0 regression makes child threads read-only; community wants steering back.
    https://github.com/openai/codex/issues/33885

**4. Key PR Progress**
1. **#37747 — Bound Cursor project path resolution** (CLOSED) — Fixes recursive directory scanning when resolving Cursor project paths. Probes a bounded set of candidates; stops after match. Prevents pathological filesystem walks.
   https://github.com/openai/codex/pull/37747

2. **#37745 — Add gRPC TCP transport to code-mode host** (CLOSED) — Adds `grpc://IP:PORT` support via `--listen`, prints bound HTTP endpoint to stdout for port discovery. Enables remote code-mode connections.
   https://github.com/openai/codex/pull/37745

3. **#37723 — Report I/O subtypes for session config import failures** (CLOSED) — Appends stable `std::io::ErrorKind` categories (invalid_data, not_found, permission_denied) to failure subtypes. Improves error reporting and debuggability.
   https://github.com/openai/codex/pull/37723

4. **#37709 — Keep wrapped composer whitespace with following text** (CLOSED) — Fixes TUI composer overflow where whitespace occupied a separate blank row. Grapheme-safe wrapping keeps breakable Unicode whitespace attached to text.
   https://github.com/openai/codex/pull/37709

5. **#37654 — Advertise environment config read support** (CLOSED) — Adds `environmentConfigRead` capability to exec-server for local executors, defaults to false for legacy. Enables environment configuration reads.
   https://github.com/openai/codex/pull/37654

6. **#31817 — Update models.json** (OPEN) — Automated daily update of model metadata, keeping canonical model lists current.
   https://github.com/openai/codex/pull/31817

**5. Feature Request Trends**
- **Customizable TUI/status line** (#17827): Strong demand for shell-script-driven status bars showing token usage, model, git branch — mirroring Claude Code.
- **Cross-platform chat sync** (#5609): Unified history across ChatGPT web, VSCode, desktop, and Codespaces.
- **Inbound MCP notifications** (#15299): External channels pushing messages into active CLI sessions via MCP.
- **Model alias mapping** (#21594): Enterprise gateway model names mapped to canonical Codex metadata.
- **Automation catch-up policy** (#24327): Missed scheduled runs should run on next wake/start.
- **Sub-agent steering** (#33885): Allow parent threads to correct and steer child agents in MultiAgentV2.

**6. Developer Pain Points**
- **Windows desktop instability**: Silent crash loops (#37752), Computer Use failures (#37595, #37281), and terminal integration issues (#37104) make Windows the most problematic platform.
- **Performance regressions**: Slow thread switching (#11011) and fixed owner-discovery timeouts (#37398) degrade daily desktop use.
- **Remote workflow gaps**: Mobile missing SSH remote projects (#23527), and desktop failing to resume remote threads (`already has an active writer` — #37403).
- **Session/config flakiness**: Worktree init failures (#28204), background exec deleting system skills (#19265), and I/O error handling lacking detail (addressed by #37723).
- **Skill validation failures**: Bundled skill validator fails due to missing PyYAML in Windows bundled Python (#24195).

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-08-10

## Today's Highlights

The Gemini CLI team shipped nightly release v0.56.0-nightly.20260810.gcf22ac7e8, with the majority of today's activity centered on dependency updates and bug fixes targeting agent reliability. Notably, several long-standing P1 issues around subagent recovery misreporting success and generalist agent hangs remain open and actively discussed, while a new PR enabling agents to call other agents could address a frequently requested capability.

## Releases

- **v0.56.0-nightly.20260810.gcf22ac7e8** — Automated nightly release with no notable feature changes. [Full changelog](https://github.com/google-gemini/gemini-cli/compare/v0.56.0-nightly.20260809.gcf22ac7e8...v0.56.0-nightly.20260810.gcf22ac7e8)

## Hot Issues

1. **[#22323 — Subagent recovery after MAX_TURNS reported as GOAL success](https://github.com/google-gemini/gemini-cli/issues/22323)** — P1 bug where `codebase_investigator` subagent reports `status: "success"` despite hitting turn limits. This masks real interruptions and misleads users about completed work. 12 comments, 2 reactions.

2. **[#21409 — Generalist agent hangs forever](https://github.com/google-gemini/gemini-cli/issues/21409)** — P1 issue where delegation to the generalist agent causes indefinite hangs, even for basic operations like folder creation. Users report waiting up to an hour before cancelling. 8 comments, 8 👍 — highest community engagement today.

3. **[#24353 — Robust component level evaluations](https://github.com/google-gemini/gemini-cli/issues/24353)** — Epic tracking the expansion of behavioral eval tests (currently 76 tests across 6 Gemini models) to improve component-level reliability. 7 comments.

4. **[#22745 — Assess AST-aware file reads, search, and mapping](https://github.com/google-gemini/gemini-cli/issues/22745)** — Investigation into whether AST-aware tools can reduce token noise, improve read precision, and enable faster codebase navigation. 7 comments, 1 👍.

5. **[#25166 — Shell command execution gets stuck with "Waiting input"](https://github.com/google-gemini/gemini-cli/issues/25166)** — P1 bug where simple CLI commands hang after completion, remaining stuck in an "Awaiting user input" state. 4 comments, 3 👍.

6. **[#21968 — Gemini does not use skills and sub-agents enough](https://github.com/google-gemini/gemini-cli/issues/21968)** — Anecdotal but impactful: the model ignores custom skills/sub-agents unless explicitly instructed, despite having relevant tools available. 6 comments.

7. **[#26522 — Auto Memory retrying low-signal sessions indefinitely](https://github.com/google-gemini/gemini-cli/issues/26522)** — Memory system flaw where low-signal sessions are never marked processed, leading to repeated retry loops. 5 comments.

8. **[#26525 — Add deterministic redaction and reduce Auto Memory logging](https://github.com/google-gemini/gemini-cli/issues/26525)** — Security concern: local transcripts are sent to the extraction model before redaction occurs, and skill names may be logged. 4 comments.

9. **[#22093 — Subagents running without permission since v0.33.0](https://github.com/google-gemini/gemini-cli/issues/22093)** — Regression where subagents activate despite being disabled in all configurations. 3 comments.

10. **[#24246 — 400 error with > 128 tools](https://github.com/google-gemini/gemini-cli/issues/24246)** — Gemini CLI fails with 400 errors when more than 128 tools are available; users expect smarter tool scoping. 3 comments.

## Key PR Progress

1. **[#28758 — chore/release: bump version to 0.56.0-nightly.20260810.gcf22ac7e8](https://github.com/google-gemini/gemini-cli/pull/28758)** — Automated version bump for today's nightly.

2. **[#28744 — fix(acp): don't start fresh chat before resuming, it poisons the session file](https://github.com/google-gemini/gemini-cli/pull/28744)** — P1 fix preventing session corruption when resuming chats via ACP. Closes #28693.

3. **[#28738 — Allow agents to call agents](https://github.com/google-gemini/gemini-cli/pull/28738)** — Large PR enabling subagent-to-subagent delegation via `tools:` frontmatter, including recursion. Closes #22092. Labeled `help wanted`.

4. **[#28743 — fix(core): preserve resolved model config systemInstruction and tools](https://github.com/google-gemini/gemini-cli/pull/28743)** — Fixes overwriting of model-specific system instructions and tools during streaming.

5. **[#26540 — fix(core): resolve policy engine bugs affecting tool approvals](https://github.com/google-gemini/gemini-cli/pull/26540)** — Fixes regex null-byte issues and approval persistence problems in permissive modes (`YOLO`, `AUTO_EDIT`). Still open after 3 months.

6. **[#28742 — fix(caretaker-agent): use spec-valid names for two triage-worker skills](https://github.com/google-gemini/gemini-cli/pull/28742)** — Renames skills with underscores to comply with Agent Skills specification.

7. **[#28757 — chore(deps): bump js-yaml from 4.1.1 to 5.2.3](https://github.com/google-gemini/gemini-cli/pull/28757)** — Major version bump with security fixes.

8. **[#28746 — chore(deps): bump the npm-dependencies group with 74 updates](https://github.com/google-gemini/gemini-cli/pull/28746)** — Large-scale dependency refresh including simple-git, @modelcontextprotocol/sdk updates.

9. **[#28749 — chore(deps): bump @google/genai from 1.30.0 to 2.15.0](https://github.com/google-gemini/gemini-cli/pull/28749)** — Significant version jump for the core Gemini SDK.

10. **[#28750 — chore(deps): bump dotenv-expand from 12.0.3 to 1000.0.0](https://github.com/google-gemini/gemini-cli/pull/28750)** — Notable major version change; watch for compatibility issues.

## Feature Request Trends

- **Agent-to-agent delegation** — Multiple issues and PRs (#28738, #22092) request the ability for agents to invoke other agents, including recursion and hierarchical task decomposition.
- **AST-aware tooling** — Investigation (#22745, #22746) into using AST-aware tools for codebase mapping and precise method-bound reads to reduce token waste and improve navigation.
- **Enhanced memory system** — Auto Memory improvements (#26516, #26522, #26523, #26525) focusing on security, handling invalid patches, and avoiding indefinite retries.
- **Improved agent self-awareness** — Requests (#21432) for the CLI to accurately understand its own flags, hotkeys, and capabilities to act as its own expert guide.
- **Subagent trajectory visibility** — Desire (#22598) to expose and share subagent execution trajectories via `/chat share` for easier review and evaluation.
- **Browser agent resilience** — Automatic session takeover and lock recovery (#22232) for `browser_agent` persistent sessions.

## Developer Pain Points

- **Hangs and stalls** — Multiple reports of indefinite hangs (#21409), shell commands stuck in "Waiting input" (#25166), and crashes from output hooks (#22186) erode trust in agent reliability.
- **Permission enforcement regressions** — Subagents running despite being disabled (#22093) raises safety concerns.
- **False success reporting** — Subagents reporting success after hitting MAX_TURNS (#22323) breaks user confidence in task completion status.
- **Tool count limits** — Hitting 400 errors with >128 tools (#24246) hampers complex workflows with many MCP tools.
- **Configuration overrides ignored** — Browser Agent ignoring `settings.json` overrides (#22267) and symlinked agent files not recognized (#20079) frustrate power users.
- **Destructive command usage** — Agents occasionally using `git reset` or `--force` when safer options exist (#22672), prompting calls for better guardrails.
- **Cleanup overhead** — Models scattering temp scripts across arbitrary directories (#23571) creates significant workspace cleanup burden.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**Date:** 2026-08-10

## 1. Today's Highlights
The Copilot CLI community is experiencing a surge of stability and reliability concerns. A significant batch of new issues (25 total) reveals critical problems with MCP server connectivity, including a hard-coded handshake budget that permanently drops servers, and a managed-settings fail-closed policy that briefly blocks all MCP tools. Model availability is also a major pain point, with multiple reports of Claude models being silently disabled despite appearing enabled in organizational settings.

## 2. Releases
No new releases were published in the last 24 hours.

## 3. Hot Issues
- [**#4421: MCP initialize handshake has a fixed, non-configurable 60s budget with no retry**](https://github.com/github/copilot-cli/issues/4421) - npx-launched stdio servers fail ~29% of sessions due to a hard-coded 60-second handshake limit. The CLI logs a failure and never respawns the server, with no retry or backoff. This is a critical reliability blocker for MCP workflows.

- [**#4419: Managed-settings interim fail-closed uses an empty allow list and permanently drops user MCP servers**](https://github.com/github/copilot-cli/issues/4419) - While resolving managed settings, the CLI installs a deny-everything policy. Any user MCP server registering in that window is permanently rejected, even on accounts with no managed policy at all. High impact for enterprise users.

- [**#2751: `/remote` fails on organization repos with "could not resolve repository"**](https://github.com/github/copilot-cli/issues/2751) - Org-owned repositories fail to resolve in remote sessions (v1.0.28). 13 upvotes and 8 comments suggest this is a broadly felt enterprise pain point. The issue remains open with no clear fix date.

- [**#4410: `/agent` pop-up treats `.github\agents\AGENTS.md` as a custom agent**](https://github.com/github/copilot-cli/issues/4410) - The agent picker misinterprets a documented repository guidance file as a user-defined custom agent, then errors on its missing frontmatter. Confusing UX that conflates two separate concepts.

- [**#4422: All Claude models disabled under CLI model selection**](https://github.com/github/copilot-cli/issues/4422) - A user on a personal Enterprise account lost access to all Claude models (sonnet 5, 4.8) overnight, despite them appearing enabled in settings. Rolling back the CLI version did not help. Suggests a server-side configuration or entitlement bug.

- [**#4423: Kickoff prompt silently dropped when a new session is created**](https://github.com/github/copilot-cli/issues/4423) - When a session is created with an initial prompt, the worktree and CLI session are created, but the prompt is lost. The agent sits idle forever. Silent data loss in a core workflow.

- [**#4390: Enabled organization models missing from catalogue (Claude Sonnet 5/Opus 5 and Kimi K3)**](https://github.com/github/copilot-cli/issues/4390) - Models explicitly enabled by an organization are missing from the effective catalogue. Selecting them reports "This model is disabled by your organization," a confusing mismatch between admin configuration and CLI behavior.

- [**#4420: Parallel tool calling non-deterministic response order results in confused bots**](https://github.com/github/copilot-cli/issues/4420) - The harness loses request-response correlation for parallel tool calls, returning responses without the original request or with a caller-defined context. This can produce corrupted agent state.

- [**#4416: Parallel explore subagent fan-out dies to per-model 429s**](https://github.com/github/copilot-cli/issues/4416) - The `explore` subagent defaults to a single lightweight model (claude-haiku-4.5) for all parallel fan-out calls, hitting a tight per-model rate limit. No backoff or auto-switch to an eligible alternative model is implemented.

- [**#4256: Add cache_control breakpoints to Anthropic requests to reuse expensive context**](https://github.com/github/copilot-cli/issues/4256) - Requests to Anthropic do not set `cache_control` breakpoints, so system prompts and tool definitions are reprocessed on every turn. This is a cost and performance optimization request that community members want prioritized. Closed with 2 comments.

## 4. Key PR Progress
No pull requests were updated in the last 24 hours.

## 5. Feature Request Trends
- **Customizable Model Steering (Auto-mode):** Requests to configure minimum/maximum model strength and model bias within auto-mode ([#4411](https://github.com/github/copilot-cli/issues/4411), [#4412](https://github.com/github/copilot-cli/issues/4412)). Users want granular control over model selection logic.
- **Cancelable Queue Operations:** The ability to remove or cancel enqueued messages before execution ([#1857](https://github.com/github/copilot-cli/issues/1857)) — a long-standing request with 26 👍 indicating strong community demand.
- **Non-GitHub Remote Sessions:** Extending `/remote` to work with GitLab, Bitbucket, and other git hosts ([#2922](https://github.com/github/copilot-cli/issues/2922)).
- **Configurable Session HUD:** Users want a configurable heads-up display for session state, references, and branch info ([#4418](https://github.com/github/copilot-cli/issues/4418)).
- **Localization (zh-CN):** A request for Chinese UI localization for the desktop app and CLI integration ([#4407](https://github.com/github/copilot-cli/issues/4407)).

## 6. Developer Pain Points
- **MCP Reliability:** The most acute pain point. Issues with the `server/discover` method ([#4370](https://github.com/github/copilot-cli/issues/4370)), hard-coded timeouts with no retry ([#4421](https://github.com/github/copilot-cli/issues/4421)), OAuth 3LO failures ([#4371](https://github.com/github/copilot-cli/issues/4371)), and an interim deny-all policy ([#4419](https://github.com/github/copilot-cli/issues/4419)) paint a picture of a fragile MCP integration layer.
- **Model Availability Confusion:** Multiple reports of models being disabled or missing despite being enabled in admin settings ([#4390](https://github.com/github/copilot-cli/issues/4390), [#4422](https://github.com/github/copilot-cli/issues/4422)). This creates trust issues and forces users to debug configuration mismatches.
- **Silent Failures:** The kickoff prompt drop ([#4423](https://github.com/github/copilot-cli/issues/4423)) and the remote-control feature failing opaquely with HTTP 422 ([#4409](https://github.com/github/copilot-cli/issues/4409)) highlight a trend of silent or poorly-indicated failures that waste developer time.
- **Rate Limiting on Subagent Fan-Out:** The tight per-model rate limits for parallel `explore` subagents ([#4416](https://github.com/github/copilot-cli/issues/4416)) impede large-scale parallel operations.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

**Kimi Code CLI Community Digest — 2026-08-10**

---

### 1. Today's Highlights
The community is closely watching the long-standing **Memory System** request (#1283) which remains the top-voted feature proposal, now actively discussed after 6 months. A newly filed critical bug **#2598** reveals silent hangs in ACP/print streaming mode where completed responses never terminate and logs fail to persist, indicating a robustness gap that extends beyond the previously patched Esc key scenario. The only update today is in PR #739, which addresses a compatibility fix for Google GenAI provider.

---

### 2. Releases
No new releases published in the last 24 hours.

---

### 3. Hot Issues

1. **#2598 – ACP/print Streaming Silent Hang**  
   *New* | The most severe issue today. Describes a scenario where `kimi acp` completes streaming content but never receives `[DONE]`, causing silent hangs. Worse, the partial response is **not written to wire.jsonl**, and the next prompt silently replaces the hung session. Community notes a lack of idle timeout configuration as the root design gap.  
   [Issue Link](https://github.com/MoonshotAI/kimi-cli/issues/2598)

2. **#1283 – Memory System (Persistent Context)**  
   *Open, 27 comments* | The most active feature request. Users demand automatic AI-managed notes and manual user instructions persisted across sessions. High interest signals a strong need for persistent project context and user preferences.  
   [Issue Link](https://github.com/MoonshotAI/kimi-cli/issues/1283)

> **Note:** The data feed contained only these 2 issues with recent activity. Lower-activity issues and historical PRs are not included in this digest.

---

### 4. Key PR Progress

1. **#739 – Strip JSON Schema Metadata from Google GenAI Tool Parameters**  
   *Open* | Fixes a validation failure (resolves #734) when using MCP tools (e.g., Exa) with Google GenAI provider. Removes standard JSON Schema metadata fields that the provider rejects. Important for cross-provider MCP reliability.  
   [PR Link](https://github.com/MoonshotAI/kimi-cli/pull/739)

> **Note:** This was the only PR with updates in the 24-hour period.

---

### 5. Feature Request Trends
- **Persistent Memory & Context**: The top recurring theme. Developers want the tool to retain project patterns, user commands, and session knowledge automatically (AI-driven) and manually (user-defined). Longevity and cross-session consistency are primary desires.
- **Streaming Reliability**: Emerging from bug reports—requests for configurable idle timeouts and guaranteed wire-protocol logging, pointing to a broader demand for deterministic, opaque streaming behavior.

---

### 6. Developer Pain Points
- **Silent Failures in Streaming**: The most critical issue. Hangs without errors, missing terminal frames, and silent drop of log data create a "black box" experience that complicates debugging and automation.
- **Provider Compatibility Friction**: MCP tooling works inconsistently across different model providers (e.g., Google GenAI vs. standard), forcing developers to rely on workarounds.
- **Lack of Configuration Surface**: Users are frustrated that critical operational parameters (e.g., idle timeout) are not exposed in config, making it impossible to recover from "hung" states without manual intervention.

---

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-08-10

## Today's Highlights

A cluster of critical issues has emerged around the OpenCode Go relay service, with multiple verified reports (issues #41300, #41306, #41314, #41322) confirming that the gateway injects a leading space into the `deepseek-v4-flash` model string, causing HTTP 400 errors across direct API calls, desktop clients, and the Hermes agent. On the infrastructure side, a long-standing bug where permission prompts from nested subagent chains silently hang the TUI has been fixed in PR #36046, closing issue #13715, and a permanent fix for the leading-space bug is likely imminent given the volume of duplicate reports. The most liked issue remains the clipboard copy bug (#4283) with 110 reactions, while native model fallback support (#7602) continues to gain traction with 107 reactions.

## Releases

No new releases in the last 24 hours.

## Hot Issues

1. **[#4283: Copy To Clipboard is not working](https://github.com/anomalyco/opencode/issues/4283)** — 122 comments, 110 👍. Users report text selection from responses cannot be copied to clipboard on multiple OS versions. The high comment count and reactions indicate a widespread and widely-impacting regression.

2. **[#7602: [FEATURE]: Native Model Fallback / Failover Support](https://github.com/anomalyco/opencode/issues/7602)** — 29 comments, 107 👍. High demand for defining fallback chains between different model IDs (e.g., "if model A errors or rate-limits, retry with model B"). Currently only same-model provider fallback is supported, which limits resilience for long-running agents.

3. **[#785: Is there a way to disable streaming mode?](https://github.com/anomalyco/opencode/issues/785)** — 29 comments, 38 👍. Users with proxies that do not support streaming need a non-streaming mode. The issue persists for over a year, suggesting a long-standing gap in configurability.

4. **[#24649: OpenCode Go: clarify which models are self-hosted vs. proxied](https://github.com/anomalyco/opencode/issues/24649)** — 17 comments, 32 👍. Closed as resolved. Users want clarity on infrastructure claims in Go plan documentation—specifically whether models are self-hosted or proxied through third parties, critical for trust and compliance.

5. **[#12472: Native Claude Code hooks compatibility](https://github.com/anomalyco/opencode/issues/12472)** — 17 comments, 38 👍. Users want native support for Claude Code's `PreToolUse`, `PostToolUse`, and `Stop` hooks defined in `~/.claude/settings.json`. OpenCode already supports Claude Code rules and skills; hooks are the missing piece for full migration.

6. **[#34743: ACP from Xcode 27 beta uses default model ignoring config](https://github.com/anomalyco/opencode/issues/34743)** — 15 comments. When using opencode as a custom ACP agent in Xcode 27 beta, the default model (`big-pickle`) is used instead of the model configured in `opencode.json` or selected in the TUI. Local providers like LMStudio and Ollama are affected.

7. **[#13715: Permission asks from nested subagent sessions silently hang](https://github.com/anomalyco/opencode/issues/13715)** — 11 comments, 24 👍. When a subagent spawns another subagent that requires permission (e.g., bash), the permission prompt is emitted but never rendered in the TUI, causing indefinite hangs. **Fixed in PR #36046.**

8. **[#30221: "terminated" error on OpenCode Go subscription](https://github.com/anomalyco/opencode/issues/30221)** — 9 comments. All active sessions under the Go subscription consistently terminate with an `UnknownError` containing "terminated", regardless of model or activity. Direct API endpoints (Deepseek, Z.AI) work fine, pointing to a flaw in the Go relay.

9. **[#39838: DeepSeek V4 Flash suddenly stopped working](https://github.com/anomalyco/opencode/issues/39838)** — 9 comments, 11 👍. Now closed, but the model recently stopped working for users. Related to the model-name leading-space bug described in #41306 and #41314.

10. **[#41300: Leading space in model name when using opencode-go/deepseek-v4-flash](https://github.com/anomalyco/opencode/issues/41300)** — 6 comments. Verified bug where the Console Go relay prepends a space to `deepseek-v4-flash`, causing upstream validation failures. Affects OpenCode Desktop v1.18.15 on Windows 11. Multiple duplicates (#41306, #41314, #41322) confirm the bug persists even after #41211 was closed.

## Key PR Progress

1. **[#41460: chore: merge dev into v2](https://github.com/anomalyco/opencode/pull/41460)** — Ports applicable `dev` changes into the V2 branch, preserving V2-only architecture (App, Desktop, Core, TUI, SDK, server) and carrying over RTL/localization coverage and native V2 session export.

2. **[#37584: fix(session): bound consecutive overflow compaction cycles](https://github.com/anomalyco/opencode/pull/37584)** — Closes #27924. Prevents infinite retry loops when a provider rejects a turn due to context overflow, bounding the compaction retry cycle.

3. **[#40427: [beta] experimental perf improvements](https://github.com/anomalyco/opencode/pull/40427)** — Reduces renderer entry memory from 7.45 MB to 1.82 MB (-75.5%) in benchmark tests, targeting TUI/App performance with immutable database snapshots and fixed 24-hour corpus windows.

4. **[#41350: feat(app): add animated BusyWave loading indicator](https://github.com/anomalyco/opencode/pull/41350)** — Replaces the shimmering 'Thinking' label with a busy-wave effect inspired by the TUI; stays persistent even when 'show thinking' is disabled.

5. **[#39358: feat(session): add durable session archival](https://github.com/anomalyco/opencode/pull/39358)** — Adds first-class, idempotent session archive operations in V2, recording a `session.archived` fact and projecting the timestamp into session info. Archival is intentionally separate from session deletion.

6. **[#41452: fix(core): align Copilot response continuation](https://github.com/anomalyco/opencode/pull/41452)** — Aligns stateless Copilot Responses continuation with the official VS Code Copilot client; persists final reasoning item IDs and omits response item IDs from stateless reconstruction while preserving tool `call_id`.

7. **[#40997: refactor(core): replace integration prompts with forms](https://github.com/anomalyco/opencode/pull/40997)** — Migrates integration-specific prompt schemas (GitHub Copilot, Azure, Cloudflare) to shared `Form.Fields` definitions; validates OAuth and key answers in Core and persists key answers as provider configuration.

8. **[#41450: fix(core): derive fallback message for empty AI SDK provider errors](https://github.com/anomalyco/opencode/pull/41450)** — Fixes cases where `AI_APICallError` has an empty message but carries structured details; the TUI now displays meaningful fallback messages instead of blank errors.

9. **[#41455: fix(tui): include attachment path in model context](https://github.com/anomalyco/opencode/pull/41455)** — Closes #41454. Preserves local attachment `source.path` as a text part before the binary image in model context, helping providers that require paths.

10. **[#36046: fix(tui): show permission prompts from nested subagent chains](https://github.com/anomalyco/opencode/pull/36046)** — Closes #13715. Resolves a long-standing hanging issue where permission requests from nested subagents were never rendered in the TUI, causing indefinite waits.

## Feature Request Trends

- **Multi-window/tab support for the desktop app** (#14657): Users want multiple windows or tabs for managing multiple servers simultaneously instead of slow full-UI reloads on server switch.
- **Persistent session daemon with memory recall** (#41453): A proposal for a persistent background daemon that maintains workspace context and enables "zero-tool-call memory recall" across sessions.
- **Better interaction UX**: Requests include sending prompts only via a button (not Enter) (#16226), adding `/clear` in favor of `/new` (#38392), configurable default code concealment state (#35093), and image paste/drag-and-drop support in the `question` tool UI (#31791).

## Developer Pain Points

- **OpenCode Go relay reliability** — The most acute issue this cycle. Multiple users report HTTP 400 errors due to a leading space injected before `deepseek-v4-flash` in the model string (#41300, #41306, #41314, #41322). The fix for #41211 was insufficient, and billing/subscription activation issues (#41430) compound frustration.
- **clipboard/copy-paste regressions** — Two separate issues (#4283, #39588) report broken copy behavior in the TUI and the VS Code extension on macOS, indicating a platform-level clipboard integration problem.
- **Free-tier rate-limit confusion** — Users report inconsistent "Free Usage Exceeded" errors despite having balance (#32971, #41448), suggesting unclear or buggy rate-limit accounting on Zen free models.
- **Model option forwarding gaps** — Two issues (#27361, #41294) confirm `reasoning.effort`/`options` are silently dropped for custom `@ai-sdk/openai-compatible` and `@ai-sdk/openai` providers in headless mode, breaking reproducible configuration.
- **TUI stability on Windows and macOS** — Reports of the TUI freezing on a blank screen at startup on macOS (#41284) and hanging indefinitely on Windows unless run as Administrator (#41436) point to lingering platform-specific terminal interaction bugs.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-08-10

## Today's Highlights

The Qwen Code project continues its rapid development cadence with a focus on multi-agent coordination, workflow orchestration, and SDK/daemon stability. Notably, a new nightly release (v0.21.8-nightly.20260810) shipped with Qoder plugin extension support, while a new `/coordinate` command and a Turn-based SessionRuntime RFC signal a strategic push toward unified session management and multi-agent collaboration. Meanwhile, Windows desktop stability (EISDIR crash fix) and web-shell rendering bugs dominated bug-fix activity.

## Releases

**v0.21.8-nightly.20260810.55e20db328** — Nightly release featuring:
- `feat(core)`: Support for Qoder plugin extensions ([PR #8661](https://github.com/QwenLM/qwen-code/pull/8661))
- CI automation: Auto-assign issues to area owners

## Hot Issues

1. [#8718 — RFC: Native coordination for independent Qwen sessions](https://github.com/QwenLM/qwen-code/issues/8718) — A P2 feature request for a leader-worker model across independent sessions, enabling interactive dispatch of 2-3 workers with correlated state observation. Reflects growing community interest in multi-agent workflows. 8 comments.

2. [#8784 — Streamable HTTP: optional GET/SSE stream rejection kills MCP connection](https://github.com/QwenLM/qwen-code/issues/8784) — A P2 bug where Qwen Code's MCP client probes optional server-push streams and a 404 on that probe severs the entire connection. Critical for MCP spec compliance and integration reliability. 5 comments.

3. [#8823 — Hidden unrecognized diagnostics mutate and evict transcript state](https://github.com/QwenLM/qwen-code/issues/8823) — A daemon/SDK bug where unrecognized events are normalized into debug events that still enter shared transcript reducers, causing state corruption in Web Shell rendering. 3 comments.

4. [#8678 — Preserve current session when large restore times out](https://github.com/QwenLM/qwen-code/issues/8678) — P1 session-management fix where session restore timeouts can lose the current session state. Partially addressed by PR #8691; continued tracking for remaining scope. 2 comments.

5. [#8659 — TUI flickering/screen tearing in web-based terminals](https://github.com/QwenLM/qwen-code/issues/8659) — Web terminals (e.g., Alibaba Cloud Workbench) suffer from full-screen ANSI redraws in Virtualized History mode. A `welcome-pr` issue with 4 comments; community seeking fallback for `TERM` without `COLORTERM`.

6. [#7118 — Windows standalone installer fails on Get-FileHash resolution](https://github.com/QwenLM/qwen-code/issues/7118) — Installer SHA-256 verification fails when `powershell.exe` can't resolve `Get-FileHash`, forcing npm fallback. P2, `welcome-pr`, 3 thumbs-up reflecting significant Windows user impact.

7. [#8756 / #8822 — Main CI E2E failures (monitor tool, extensions-install)](https://github.com/QwenLM/qwen-code/issues/8822) — Repeated CI flakes in `cli/monitor.test.ts` and `cli/extensions-install.test.ts`. Autofix-labeled; surfaced alongside broader test-infrastructure hardening PRs.

8. [#8775 — Proposal: unify session reasoning loops on a Turn-based SessionRuntime](https://github.com/QwenLM/qwen-code/issues/8775) — Identifies duplication across TUI, headless, ACP, serve, and AgentCore loops; proposes a unified runtime. Directly complements #8718's coordination RFC. 2 comments.

9. [#8769 — Rebuild /review orchestration on workflow engine](https://github.com/QwenLM/qwen-code/issues/8769) — Proposes migrating /review Step 3–5 fan-out/verification from model-driven to deterministic workflow-engine execution, improving reproducibility. 4 comments.

10. [#8595 — "Local Control" mode: QR-code pairing for phone access](https://github.com/QwenLM/qwen-code/issues/8595) — Closed feature request; community demand for phone-based session access via QR pairing in CLI and desktop app. Feedback likely folded into larger local-control roadmap.

## Key PR Progress

1. [#8804 — feat(cli): add native multi-agent coordination](https://github.com/QwenLM/qwen-code/pull/8804) — Adds a `/coordinate <goal>` entry on top of the Agent Team runtime and Agent View tabs; deliberately avoids introducing another supervisor/PTY stack. Directly addresses #8718's vision.

2. [#8732 — feat(cli): adopt Goal v3 in ACP sessions](https://github.com/QwenLM/qwen-code/pull/8732) — Replaces legacy Stop-hook `/goal` with the canonical Goal v3 state machine in ACP sessions (create, status, edit, pause, resume, replace, clear).

3. [#8818 — fix(core): catch content-only thinking-tag leaks on all OpenAI-compatible providers](https://github.com/QwenLM/qwen-code/pull/8818) — Extends `<think>` leak defense beyond one vendor to all OpenAI-compatible endpoints and closes two bypasses. Follows issue #6666.

4. [#8798 — fix(web-shell): reconcile mid-turn messages with daemon state](https://github.com/QwenLM/qwen-code/pull/8798) — Makes daemon authoritative for mid-turn messages; stops resubmission of daemon-owned messages and restores queued messages after refresh.

5. [#8812 — fix(web-shell): stop rendering unrecognized daemon events in transcripts](https://github.com/QwenLM/qwen-code/pull/8812) — Fixes the #8823 issue class: stamps `debugReason` on normalizer debug events so Web Shell skips rendering them as content.

6. [#8276 — fix(core): preserve prompt cache across deferred tool discovery](https://github.com/QwenLM/qwen-code/pull/8276) — Stabilizes the provider tool declarations and cached system instruction during deferred tool discovery, using a `deferred_tool_call` bridge.

7. [#8802 — fix(desktop): restore the macOS window after closing it](https://github.com/QwenLM/qwen-code/pull/8802) — Closing the Desktop window now hides rather than destroys it; Dock reopen restores without stealing focus from Local Control.

8. [#8816 — fix(ci): watchdog silent sandbox hangs and reap leaked containers](https://github.com/QwenLM/qwen-code/pull/8816) — Adds idle watchdog (`QWEN_IDLE_TIMEOUT_MS`, default 20 min) to kill hung agents and container cleanup; mitigates 2-hour silent CI hangs.

9. [#8810 — perf(ci): make triage budget operator-tunable and raise it](https://github.com/QwenLM/qwen-code/pull/8810) — Backs triage timeout with repository variable (`QWEN_TRIAGE_TIMEOUT_MINUTES`, fallback 60); fixes 30-minute cap killing large-PR triage.

10. [#8368 — feat(auth): add Kimi and Xiaomi MiMo providers](https://github.com/QwenLM/qwen-code/pull/8368) — Adds first-class provider presets for Kimi (Coding Plan, API Key China/Intl) and Xiaomi MiMo (pay-as-you-go, China/Singapore/Intl regions).

## Feature Request Trends

- **Multi-agent orchestration**: The dominant theme — #8718 (session coordination), #8775 (unified SessionRuntime), #8769 (workflow-engine /review), and PR #8804 (`/coordinate`). Community is pushing toward deterministic, code-level orchestration over model-driven improvisation.
- **Session/memory unification**: Recurring proposals for external-memory integration profiles (#7449) and turn-based runtime unification (#8775), both pointing to session-management centralization.
- **Provider breadth**: Ongoing demand for more third-party model providers (Kimi, Xiaomi MiMo in #8368) and local-control/phone access (#8595).
- **Enterprise integration**: #7585 (external context provider) and #7449 (enterprise memory) reflect a push toward admin-bound, provider-neutral integration profiles for organizational deployments.

## Developer Pain Points

- **CI instability and silent hangs**: Multiple CI-failure tickets (#8756, #8766, #8799, #8822) plus active mitigation PRs (#8816, #8810) highlight flaky E2E tests and 2-hour silent sandbox hangs. Test fixes (e.g., #8813, #8795) targeting shared `/tmp` paths point to cross-worker pollution.
- **Windows desktop/runtime instability**: The EISDIR crash on workspace open (#8615) and installer checksum failure (#7118) remain top pain points for Windows users.
- **MCP protocol edge cases**: #8784 shows brittle behavior around optional MCP streams — a single probe rejection kills the whole connection, defeating graceful degredation.
- **Web/TUI rendering fragility**: Flickering in web terminals (#8659) and Web Shell rendering unrecognized daemon events (#8823, #8812) indicate the renderer layer is still catching up with daemon event-model changes.
- **Local dev experience**: `npm test` fails due to an unknown flag (`EUNKNOWN` error, #8721) and build-system brittleness continues to grate on contributors.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar).*