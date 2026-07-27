# AI CLI Tools Community Digest 2026-07-27

> Generated: 2026-07-27 03:33 UTC | Tools covered: 7

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

# Cross-Tool Ecosystem Comparison Report
**2026-07-27**

---

## 1. Ecosystem Overview

The AI CLI tool ecosystem is maturing rapidly, with all major vendors shipping **nightly releases** and **rapid patch cycles** while grappling with platform stability, security hardening, and extensibility demands. **Windows instability remains the single largest cross-cutting concern**, affecting every tool—from BSOD crashes (Claude Code) to GPU process failures (Codex) to terminal corruption (OpenCode). A strong **push toward agentic orchestration** is visible: subagent management, hook lifecycle automation, and sandbox safety are top priorities across Claude Code, Gemini CLI, and Codex. Meanwhile, **MCP (Model Context Protocol) adoption is creating a new attack surface**, with multiple P1 security vulnerabilities reported in Qwen Code and authentication gaps in Copilot CLI. The ecosystem is fragmenting along **extensibility vs. simplicity axes**, with Claude Code and OpenCode leading on plugin/hook architectures, while Kimi Code and Copilot CLI maintain narrower scopes.

---

## 2. Activity Comparison (Last 24 Hours)

| Tool | Hot Issues Updated | PRs Updated | Release Status | Key Trends |
|------|-------------------|-------------|----------------|------------|
| **Claude Code** | 10 selected (88-comment peak) | 7 active | No release; 2 security-focused PRs | Windows Fable 5 bug (#73365) dominant; sandbox git deletion (#81526) high-severity |
| **OpenAI Codex** | 10 selected (852👍 top request) | 10 merged | No release | Windows stability crisis (#34260); MCP OAuth reliability stack merged |
| **Gemini CLI** | 10 selected | 10 merged/active | Nightly v0.54.0 (no functional changes) | Subagent deception (#22323); security bypass fix (#28403); OAuth headless fix |
| **Copilot CLI** | 10 selected | 0 | None | Zombie process leak closed; NFS hang (#4053) still open; Windows crash (#4217) |
| **Kimi Code** | 1 closed | 0 | None | Single bug fix for image pasting (#2559) |
| **OpenCode** | 10 selected (5-17 comments) | 10 (6 closed, 4 open) | **v1.18.6** (cache fix, compatibility) | UnsupportedContentType regression (#38789) critical; terminal mouse bug closed |
| **Qwen Code** | 10 from 42 updated | 10 from 50 updated | **v0.21.0-nightly** (timezone fix) | **3 P1 MCP security bugs** (#7768, #7769 closed); CI instability (#7787) |

**Observations:**
- **OpenCode and Qwen Code** are the most actively shipping—both with releases and high PR throughput.
- **Claude Code and Codex** have the highest community engagement (88+ comments, 166👍) but no releases today.
- **Copilot CLI and Kimi Code** show the least activity, suggesting slower development cadence.
- **Gemini CLI** has strong security-focused PR momentum despite no user-facing features.

---

## 3. Shared Feature Directions

| Theme | Tools Affected | Specific Needs |
|-------|---------------|----------------|
| **Windows Stability Crisis** | **Claude Code** (#32870 BSOD, #73365 Fable 5), **Codex** (#34260 cleanup storm, #34133 GPU crash), **Copilot CLI** (#4263 split pane, #4217 exit crash), **OpenCode** (#38789 desktop regression), **Qwen Code** (#7056 VS Code connectivity) | GPU process crashes, kernel interactions, process cleanup storms, terminal rendering, sandbox bypasses on Windows ARM64 |
| **Hook Lifecycle & Programmability** | **Claude Code** (#68663 Pre/PostCommand hooks, #81458 hook failure visibility), **Codex** (#21753 29+ hook parity request), **OpenCode** (#17412 plugin hooks for AI-visible messages) | Pre/post execution hooks, failure observability, plugin injection into conversation context |
| **MCP OAuth & Authentication** | **Codex** (#31573 issuer validation, #13852 Supabase reauth), **Copilot CLI** (#4203 no silent refresh), **Qwen Code** (#7768 IPC bypass, #7769 SSE denial bypass), **Gemini CLI** (#28446 native fetch for OAuth) | Token refresh reliability, headless/automated auth flows, authorization enforcement, security hardening |
| **Agent/Subagent Orchestration** | **Claude Code** (#80798 subagent promotion/demotion), **Gemini CLI** (#22323 false GOAL success), **Qwen Code** (#7729 Goal v3 worker tools, #5795 crash notifications with partial results) | Subagent lifecycle management, false success reporting, recovery from interruption, task delegation |
| **Sandbox & Data Loss Safety** | **Claude Code** (#81526 git object deletion, #74386 worktree cleanup), **Codex** (#30712 sandbox bypass via PowerShell), **Qwen Code** (#7770 sandbox writes to host via MCP) | Silent deletion without confirmation, sandbox escape prevention, liveness signals, undo capabilities |
| **Terminal & UI Responsiveness** | **Gemini CLI** (#25166 stuck at "Waiting input"), **Copilot CLI** (#4053 NFS hang), **OpenCode** (#26198 mouse escape sequences), **Qwen Code** (#7779 kitty keyboard flags) | Process hangs, terminal state leaks, resize corruption, UI freezes |
| **Session Storage Optimization** | **Codex** (#24948 2GB logs, #22593 delta storage), **Claude Code** (#81529 auto-compaction regression) | Delta/DAG-based storage, log bloat reduction, compaction reliability |

---

## 4. Differentiation Analysis

| Dimension | Claude Code | Codex | Gemini CLI | Copilot CLI | Kimi Code | OpenCode | Qwen Code |
|-----------|------------|-------|------------|-------------|-----------|----------|-----------|
| **Primary Focus** | Agentic orchestration, MCP ecosystem | Desktop stability, feature parity | Agent reliability, security hardening | Git workflow integration | Simplicity, multimodal | Extensibility, community plugins | Enterprise platform, security |
| **Target Users** | Power developers, agent orchestrators | Enterprise Windows shops | Google Cloud developers | GitHub-native workflows | East Asian developers | OSS community, plugin developers | Chinese enterprise, Qwen ecosystem |
| **Technical Approach** | Heavy sandbox, hook architecture, subagent composition | Electron desktop, MCP OAuth reliability | Multi-agent hierarchy, AST-aware | Tight GitHub integration, minimal surface | Web-first, lightweight | Plugin hooks, provider-agnostic | Electron desktop, MCP IPC, multi-SDK |
| **Key Differentiator** | Most advanced agent composition model (subagent promotion) | Most community engagement (852👍 top feature) | Deepest security patch cadence (3 P1 PRs today) | Narrowest scope, best Git integration | Easiest onboarding | Most flexible plugin architecture | Most security vulnerabilities (but fastest fixes) |
| **Platform Parity** | Windows issues prominent | Windows crisis mode | Linux/headless gaps | Windows crash + hang | Limited platform data | Desktop regression cycle | VS Code connectivity weak |
| **Extensibility** | **High** (MCP, hooks, subagents) | **Medium** (hooks request) | **Medium** (AST tools, evals) | **Low** (narrow scope) | **Low** (minimal) | **High** (plugin hooks, MCP) | **Medium** (MCP, IPC, web-shell) |

**Key Insight:** Claude Code and OpenCode are competing on extensibility/flexibility, while Codex and Copilot CLI are competing on GitHub integration. Qwen Code is alone in targeting Chinese enterprise with aggressive security patching. Gemini CLI is most focused on agent reliability fundamentals.

---

## 5. Community Momentum & Maturity

| Metric | Claude Code | Codex | Gemini CLI | Copilot CLI | Kimi Code | OpenCode | Qwen Code |
|--------|------------|-------|------------|-------------|-----------|----------|-----------|
| **Issue Engagement** | High (166👍 peak, 88 comments) | **Highest** (852👍, 187 comments) | Medium (12 comments peak) | Low (3-4 comments typical) | Very Low | Medium (5-10 comments typical) | Medium (8 comments peak) |
| **Release Cadence** | Irregular (no release today) | Irregular (no release today) | **Daily nightlies** | Slow (no release today) | Slow (no release today) | **Active** (v1.18.6 today) | **Daily nightlies** |
| **Feature Velocity** | High (security PRs, hook proposals) | High (10 PRs merged today) | High (10 PRs merged/active) | Low (0 PRs today) | Low (0 PRs today) | High (10 active PRs) | **Very High** (50 PRs updated) |
| **Security Posture** | Reactive (sandbox bug today) | Reactive (GPU crash) | **Proactive** (3 P1 security PRs) | Reactive (zombie leak) | Minimal | Minimal | **Dual** (3 P1 vulns + 50 PRs) |
| **Community Health** | Strong but frustrated (Windows) | **Strongest** (852👍 request) | Growing, vocal | Small, specific | Small, quiet | Growing, plugin-focused | Rapidly growing (42 issues/day) |

**Key Takeaways:**
- **Codex has the most engaged community** (852👍 for Linux app) but is losing trust on Windows.
- **Qwen Code and OpenCode are the most rapidly iterating** (50/10 PRs respectively).
- **Gemini CLI shows best security hygiene** (3 P1 fixes in one day).
- **Claude Code has highest frustration-to-engagement ratio** (166👍 on a bug, not a feature).
- **Copilot CLI and Kimi Code appear under-resourced** relative to their competition.

---

## 6. Trend Signals (Actionable for Developers)

### 🔴 Universal Windows Crisis
Every tool except Kimi Code has Windows-specific stability bugs involving GPU crashes, kernel interactions, process cleanup storms, or sandbox bypasses. **For Windows developers**: Claude Code and OpenCode have the most documented workarounds; avoid Codex CLI until the GPU crash cluster is resolved.

### 🟡 Agentic Extensibility Race
Hooks, subagent orchestration, and plugin architectures are the next frontier. **Claude Code (#68663, #80798)** and **Codex (#21753)** are competing on lifecycle automation. **OpenCode (#17412)** has the most mature plugin model. **For developers building agent tools**: invest in understanding Claude Code's hook architecture and OpenCode's plugin system—these are likely to become industry reference designs.

### 🟢 Sandbox Trustworthiness = Competitive Advantage
**Claude Code's sandbox git deletion (#81526)** and **Qwen Code's sandbox-to-host write (#7770)** erode user trust. **Gemini CLI's fail-closed PR (#81421)** and **Qwen Code's fast security patching** are positive signals. **For production users**: Gemini CLI and OpenCode currently demonstrate the strongest sandbox safety posture.

### 🔵 Chinese-Tuned Tools Gaining Ground
**Kimi Code and Qwen Code** are building features (DingTalk integration, voice input, Chinese encoding support) that directly serve East Asian developers. **For global teams**: monitor Qwen Code's enterprise features—they may set expectations for localized AI tool support.

### 🟣 The "Deep MCP" Split
MCP adoption is bifurcating: **Claude Code and Codex** treat MCP as a first-class extensibility layer; **Copilot CLI and Qwen Code** are experiencing MCP-related security issues; **OpenCode** is treating MCP as one plugin type among many. **For tool builders**: choose your MCP strategy carefully—over-reliance creates security debt; under-investment limits extensibility.

### ⚠️ Billing & Entitlement Fragility
**Claude Code** (#72027, #78614, #80199) and **Codex** (usage meter bugs, entitlement sync failures) both report billing correctness issues. **For organizations considering deployment**: audit billing infrastructure before scaling—multiple tools have silent over-billing or access-blocking bugs.

### 📊 Developer Recommendation Matrix

| Use Case | Recommended Tool | Key Reason |
|----------|-----------------|------------|
| **Windows production development** | **OpenCode** (v1.18.6) | Most stable Windows parity; active patches |
| **Advanced agent orchestration** | **Claude Code** (#80798, #68663) | Most mature subagent/hook architecture |
| **Security-critical environments** | **Gemini CLI** | Fastest security patching cadence |
| **GitHub-native workflows** | **Copilot CLI** | Tightest GitHub integration (despite bugs) |
| **East Asian / multimodal** | **Kimi Code** (#2559 fix active) | Lightweight, web-first, improving |
| **Enterprise China deployment** | **Qwen Code** | Most active development, DingTalk/WeCom integration |
| **Plugin/extension development** | **OpenCode** (#17412) | Most flexible plugin hook system |
| **LLM API cost optimization** | **Monitor Codex** (#4256 cache_control) | First-mover on context reuse patterns |

---

*Report generated from 2026-07-27 community digest data. All metrics reflect single-day activity and should be contextualized with longer-term trends for strategic decisions.*

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report

*Data as of 2026-07-27 | Source: github.com/anthropics/skills*

---

## 1. Top Skills Ranking (Most-Discussed Pull Requests)

The community's attention is concentrated on bug fixes for core tooling and practical document-format skills. All PRs below remain **open** pending review.

### #1: Fix `run_eval.py` recall calculation — install eval artifact as real skill
- **Skill:** `skill-creator` tooling fix
- **Author:** MartinCajiao | [PR #1298](https://github.com/anthropics/skills/pull/1298)
- **Functionality:** Resolves the systemic `recall=0%` bug in the skill description optimizer (`run_eval.py`, `run_loop.py`, `improve_description.py`). Root cause: the eval command file was never installed as a real skill, plus three additional Windows compatibility issues.
- **Discussion highlights:** References 10+ independent reproductions across issues #556 and #1169. Fixes stream reading on Windows, parallel worker handling, and trigger detection. The most critical PR in the repository — without it, the skill-creator optimization loop is optimizing against noise.

### #2: Add `document-typography` skill
- **Skill:** Typographic quality control
- **Author:** PGTBoos | [PR #514](https://github.com/anthropics/skills/pull/514)
- **Functionality:** Prevents orphan word wrap, widow paragraphs, and numbering misalignment in AI-generated documents. Affects every document Claude generates.
- **Discussion highlights:** No active counterarguments — widely viewed as a universal quality-of-life improvement. Community interest is strong because these issues are pervasive and users rarely request typographic fixes explicitly.

### #3: Fix PDF case-sensitive file references
- **Skill:** `pdf` skill maintenance
- **Author:** Lubrsy706 | [PR #538](https://github.com/anthropics/skills/pull/538)
- **Functionality:** Corrects 8 case-sensitivity mismatches in `skills/pdf/SKILL.md` (`REFERENCE.md`→`reference.md`, `FORMS.md`→`forms.md`). Breaks on case-sensitive filesystems (Linux/macOS).
- **Discussion highlights:** Simple, uncontroversial fix. Relatively long open duration (Mar–Apr) suggests low maintainer bandwidth for trivial corrections.

### #4: Add ODT skill (OpenDocument Format)
- **Skill:** `odt` — OpenDocument text creation, template filling, and ODT-to-HTML conversion
- **Author:** GitHubNewbie0 | [PR #486](https://github.com/anthropics/skills/pull/486)
- **Functionality:** Covers `.odt`, `.ods`, `.odf` creation and manipulation. Triggers on mentions of "LibreOffice document," "OpenDocument," or ISO standard format requests.
- **Discussion highlights:** Addresses a clear gap — no ODF support in the current skills collection. Discussion centers on whether to bundle ODS (spreadsheet) support or keep it separate.

### #5: Improve `frontend-design` skill clarity
- **Skill:** `frontend-design` revision
- **Author:** justinwetch | [PR #210](https://github.com/anthropics/skills/pull/210)
- **Functionality:** Rewrites the frontend-design skill to ensure every instruction is actionable within a single conversation, with specific enough guidance to steer Claude's behavior without over-constraining.
- **Discussion highlights:** Represents a broader community desire for skills that are **operationally precise** rather than academically descriptive. The PR implicitly critiques the current skill quality bar.

### #6: Add `self-audit` reasoning quality gate
- **Skill:** `self-audit` — mechanical verification + four-dimension reasoning audit
- **Author:** YuhaoLin2005 | [PR #1367](https://github.com/anthropics/skills/pull/1367)
- **Functionality:** A universal output auditor that verifies file existence mechanically, then runs a four-dimension reasoning quality audit in damage-severity priority order. Works with any project, stack, or model.
- **Discussion highlights:** Very recent (late June). Proposes a new category — **post-generation quality assurance** — that doesn't exist in the current skill portfolio. The follow-up proposal in Issue #1385 extends this into a three-gate pipeline.

### #7: Add `color-expert` skill
- **Skill:** Color expertise for any task involving color
- **Author:** meodai | [PR #1302](https://github.com/anthropics/skills/pull/1302)
- **Functionality:** Covers color naming systems (ISCC-NBS, Munsell, XKCD, RAL, Ridgway 1912), color spaces with usage guidance (OKLCH for scales, OKLAB for gradients, CAM16 for perception), and practical color workflow.
- **Discussion highlights:** Highly specialized but well-received. The most recent update (July 21) suggests active iteration. Niche demand from designers and data visualization engineers.

### #8: Fix tracked change `w:id` collision in DOCX skill
- **Skill:** `docx` skill bug fix
- **Author:** Lubrsy706 | [PR #541](https://github.com/anthropics/skills/pull/541)
- **Functionality:** Prevents document corruption when adding tracked changes to documents with existing bookmarks. Root cause: hardcoded low `w:id` values colliding with shared OOXML ID space.
- **Discussion highlights:** Another "broken until fixed" scenario. Highlights the fragility of OOXML manipulation skills and the community's reliance on Anthropic to maintain document-format skills.

---

## 2. Community Demand Trends

From the most-discussed Issues, three distinct demand clusters emerge:

### 🔴 Security & Trust Boundary (Highest Urgency)
- **Issue #492** (43 comments, 2 👍): Community skills distributed under the `anthropic/` namespace impersonate official Anthropic skills. This creates a trust boundary vulnerability — users may grant elevated permissions believing community skills are sanctioned. The community is demanding namespace separation, explicit labeling, or a curated certification process.
- **Issue #1175** (4 comments): Related concerns about access control logic within `SKILL.md` files when handling sensitive document stores (SharePoint Online).

### 🔵 Organizational Sharing & Deployment
- **Issue #228** (16 comments, 8 👍): Enterprise users want org-wide skill sharing without manual `.skill` file distribution via Slack/Teams. A shared skill library or direct sharing link is the most-requested feature. This has the highest 👍 count of any open issue.
- **Issue #189** (6 comments, 9 👍): The `document-skills` and `example-skills` plugins install identical content, causing duplicate skills. Community wants clear plugin boundaries and deduplication.

### 🟢 Tooling Reliability & Windows Compatibility
- **Issue #556** (12 comments, 7 👍): `run_eval.py` reports 0% trigger rate across all queries. This is the core bottleneck preventing the skill-creator optimization loop from working. Multiple PRs (#1298, #1099, #1050, #1323) and issues (#1169, #1061) address facets of this same bug.
- **Issue #1061** (3 comments, 2 👍): Three distinct Windows compatibility failures (PATHEXT, cp1252 encoding, select on pipes). The community is actively documenting every platform-specific breakage.
- **Issue #202** (8 comments, closed): The `skill-creator` skill reads like developer documentation rather than an operational instruction set. Community wants all skills to be **execution-focused, not explanatory**.

### 📊 Nascent Demand: Agent Governance & Memory Optimization
- **Issue #412** (6 comments): Proposal for `agent-governance` — policy enforcement, threat detection, trust scoring, and audit trails for AI agent systems. No existing skill covers this category.
- **Issue #1329** (9 comments): Proposal for `compact-memory` — symbolic notation for compact agent state representation. Addresses context window pressure from verbose agent notes.
- **Issue #1385** (3 comments): Proposal for a three-gate reasoning quality pipeline (pre-task calibration → adversarial review → delivery verification). Extends the `self-audit` concept from PR #1367.

---

## 3. High-Potential Pending Skills

These PRs have active discussion threads and are likely to land next:

| Skill | PR | Author | Status Signal |
|-------|-----|--------|---------------|
| **Document Typography** | [#514](https://github.com/anthropics/skills/pull/514) | PGTBoos | Clear problem statement, no opposition, fills a universal gap |
| **ODT (OpenDocument)** | [#486](https://github.com/anthropics/skills/pull/486) | GitHubNewbie0 | Only ODF support in the ecosystem; discussion is about scope, not rejection |
| **Self-Audit** | [#1367](https://github.com/anthropics/skills/pull/1367) | YuhaoLin2005 | Recent, well-articulated, spawned a follow-up proposal (#1385). Rapid iteration suggests maintainer interest |
| **Color Expert** | [#1302](https://github.com/anthropics/skills/pull/1302) | meodai | Most recently updated (July 21). Active maintainer engagement |
| **Testing Patterns** | [#723](https://github.com/anthropics/skills/pull/723) | 4444J99 | Comprehensive coverage of the testing stack (unit, React, E2E, performance). No active blockers |
| **Pyxel Retro Game Dev** | [#525](https://github.com/anthropics/skills/pull/525) | kitao | Unique creative niche. Updated July 15 — maintainer is actively shepherding |

**Likelihood assessment:** The core tooling fixes (#1298, #1099, #1050) have the highest urgency and widest impact — these should merge first. The document-format skills (#514, #486) are most likely to land next among new features. The security namespace issue (#492) may require a governance decision rather than a PR merge.

---

## 4. Skills Ecosystem Insight

**The community's most concentrated demand is for reliable, trustworthy creation tooling — fixing `run_eval.py`'s broken recall metric and Windows incompatibility is the single highest-impact action to unblock the entire skill-contribution pipeline — followed by a clear demand for organizational deployment infrastructure (shared skill libraries, namespace trust boundaries) and practical quality-assurance skills (typography, self-audit, governance) that move the ecosystem beyond creative/technical novelties toward production-grade reliability.**

---

# Claude Code Community Digest — 2026-07-27

## Today's Highlights
The community remains focused on the persistent **Fable 5 advisor "unavailable" bug** (#73365) which continues to attract 88 comments and 166 reactions, making it the most active issue by far. A newly reported **sandbox file deletion bug** (#81526) raises immediate security concerns, as it can silently remove project-root git objects mid-session. No new releases were shipped today, but two security-focused PRs—fixing IPv6 firewall bypass in devcontainers and enabling the agentic reviewer on Windows—signal ongoing hardening work.

## Releases
No new releases in the last 24 hours.

## Hot Issues

1. **[#73365 — Advisor always "unavailable" with Fable 5 advisor (v2.1.198)](https://github.com/anthropics/claude-code/issues/73365)**  
   *88 comments, 166 👍*  
   The dominant community concern: Fable 5 advisor shows "unavailable" across all sessions on Windows. Duplicate reports and workaround threads suggest this impacts a broad user base. No official fix yet.

2. **[#80002 — macOS: Filesystem extension never dispatches tools/call](https://github.com/anthropics/claude-code/issues/80002)**  
   *63 comments, 27 👍*  
   Claude Desktop can list filesystem tools but never actually invokes them. This blocks first-party extension workflows and has been closed without a resolution visible in the issue.

3. **[#32870 — claude.exe triggers Windows BSOD via Wof.sys during directory listing](https://github.com/anthropics/claude-code/issues/32870)**  
   *34 comments*  
   A long-standing stability issue: directory listing can crash the entire Windows OS. Still open after 4+ months, indicating a deep kernel interaction that is hard to reproduce.

4. **[#28791 — Sync conversation history between CLI and desktop app](https://github.com/anthropics/claude-code/issues/28791)**  
   *27 comments, 108 👍*  
   The highest-voted feature request. Users want seamless history across CLI and desktop sessions. The 108 reactions signal strong demand for cross-platform session continuity.

5. **[#79824 — Artifact sharing fails: "This version can't be shared publicly"](https://github.com/anthropics/claude-code/issues/79824)**  
   *2 comments, 10 👍*  
   A user-facing regression: publishing artifacts with mermaid diagrams fails to make them shareable, even after republishing. Small comment count but high frustration factor.

6. **[#78614 — Fable 5: "Usage credits required" mid-session](https://github.com/anthropics/claude-code/issues/78614)**  
   *1 comment, 9 👍*  
   Subscribers report being booted from Fable 5 mid-session with a "Usage credits required" error, despite having days remaining. Suggests an entitlement sync bug.

7. **[#72027 — Pro subscriber blocked: "organization disabled" → "Max or Pro required"](https://github.com/anthropics/claude-code/issues/72027)**  
   *6 comments*  
   Individual Pro subscribers hit a wall where entitlement sync fails, preventing access to Claude Code entirely. Auth infrastructure fragility.

8. **[#80199 — Max X5 usage instantly reaches 100% after software update](https://github.com/anthropics/claude-code/issues/80199)**  
   *6 comments*  
   Usage meter jumps to max immediately post-update. Could be a counter-reset bug or a billing calculation error.

9. **[#80087 — VS Code extension: false positive "Could not locate Claude CLI on PATH" on Windows](https://github.com/anthropics/claude-code/issues/80087)**  
   *2 comments*  
   Regression in v2.1.214 affecting Windows users with non-ASCII usernames. The `where.exe` output parsing fails.

10. **[#81526 — Sandbox silently deletes project-root refs/, objects/, HEAD created mid-session](https://github.com/anthropics/claude-code/issues/81526)**  
    *1 comment*  
    A newly filed, high-severity bug: the sandbox can recursively delete git objects that were created during a session, with no prompt. The reporter used Claude Code to investigate itself, adding credibility to the findings.

## Key PR Progress

1. **[#81500 — Fix 404 walkthrough links in AWS gateway example](https://github.com/anthropics/claude-code/pull/81500)**  
   Corrects seven broken URLs in the AWS gateway example documentation. Small but blocks new user onboarding.

2. **[#20448 — Add web4-governance plugin for AI governance with R6 workflow](https://github.com/anthropics/claude-code/pull/20448)**  
   Adds a T3 trust-tensor-based governance plugin. Still open after 6 months—low-priority but signals interest in verifiable agent audit trails.

3. **[#38167 — Devcontainer: use authenticated GitHub API request if GH_TOKEN set](https://github.com/anthropics/claude-code/pull/38167)**  
   Fixes firewall initialization failures in shared IP environments by using a bearer token. Addresses rate-limit issues in team/CI contexts.

4. **[#81426 — Support Windows venv layout for agentic commit reviewer](https://github.com/anthropics/claude-code/pull/81426)**  
   Unblocks security-guidance's strongest feature on Windows by fixing a `SKIP_WIN32` early return. Important for parity—this PR is only 1 day old.

5. **[#68693 — Add duplicate label additively, don't replace existing labels](https://github.com/anthropics/claude-code/pull/68693)**  
   Fixes a labeling bug where `closeIssueAsDuplicate` erased platform/area/priority labels. Important for maintainers triaging duplicates.

6. **[#81423 — Devcontainer: block IPv6 egress to close firewall allowlist bypass](https://github.com/anthropics/claude-code/pull/81423)**  
   Security fix: `init-firewall.sh` never configured `ip6tables`, leaving all IPv6 traffic unrestricted. Without this, the firewall provides no protection in dual-stack environments.

7. **[#81421 — Make bash-sandbox example fail closed when sandbox unavailable](https://github.com/anthropics/claude-code/pull/81421)**  
   Hardens the reference sandbox configuration by adding `failIfUnavailable`. Prevents silent fallback to unsandboxed bash—a safety-critical change.

## Feature Request Trends

- **Cross-platform session continuity:** The top-voted request (#28791) asks for CLI-desktop history sync. Several related issues request unified conversation management across devices and environments.
- **Hook lifecycle telemetry:** Requests for `PreCommand`/`PostCommand` hooks (#68663) and better visibility into hook failures (#81458) indicate a maturing agent orchestration ecosystem.
- **UI localization:** Multiple issues, especially #69078, demand Russian and other language support—suggesting a growing non-English user base.
- **Subagent promotion/demotion:** A novel request (#80798) proposes promoting a subagent to a full session and back, to reclaim context and intervene in orchestrated workflows. This points to advanced agent composition needs.
- **Worktree and sandbox safety:** Issues #74386 (worktree cleanup discarding in-progress work) and #81526 (sandbox deleting git objects) drive demand for safer agent operations, especially liveness signals and undo capabilities.

## Developer Pain Points

1. **Windows instability remains the top pain point:** BSODs (#32870), Cowork sandbox failures (#78104), CLI detection regressions (#80087), and the Fable 5 advisor bug (#73365 on Windows) create a poor experience on the platform. Multiple reports suggest Windows ARM64 is particularly affected.

2. **Entitlement and billing bugs erode trust:** Pro/Max subscribers hit arbitrary blocks (#72027, #78614), usage meters spike to 100% post-update (#80199), and `ANTHROPIC_API_KEY` silently overrides subscription billing (#78491). Users are unsure what they're paying for.

3. **Silent failures in hooks and tools:** Hook exit code 127 failures skip silently (#81458), tool-call serialization renders as prose without errors (#81530), and the sandbox deletion (#81526) happens without prompts. Debugging these requires reading raw transcripts.

4. **Regressions after updates are common:** Multiple issues cite specific version regressions—auto-compaction stopped after v2.1.199 (#81529), CLI detection broke in v2.1.214 (#80087), usage meter jumped after v2.1.212 (#80199). Developers want visible changelogs and better regression testing.

5. **Data loss from agent actions without confirmation:** Worktree cleanup (#74386) and sandbox deletion (#81526) both destroy user work without liveness checks or confirmation prompts. This is the most alarming recurring pattern for production users relying on long-running agent sessions.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

Here is the Codex community digest for July 27, 2026.

---

## Codex Community Digest
**2026-07-27**

### 1. Today's Highlights
Windows desktop stability remains the dominant theme, with a cluster of deeply interconnected GPU process crashes, sandbox escapes, and process-cleanup storms causing app unlaunchability and system resource exhaustion. On the feature front, the long-standing request for a native Linux desktop app (#11023) has reached 852 👍 and 187 comments, signaling strong community demand for platform parity. The engineering team is making progress on MCP OAuth reliability with a multi-PR stack that serializes login, logout, refresh, and recovery paths.

### 2. Releases
No new releases in the last 24 hours.

### 3. Hot Issues

1.  **#11023 – Codex desktop app for Linux** – The most upvoted open feature request (852 👍). Users on Mac are blocked by a separate bug (#10432) and want a Linux native app to run on stable, power-efficient desktops. Community sentiment is that Linux is being neglected. [GitHub](https://github.com/openai/codex/issues/11023)

2.  **#34260 – Windows Desktop: unbounded taskkill.exe/conhost.exe cleanup storm** – A critical Windows performance bug. Hundreds of `taskkill` processes spawn, query `Win32_Process`, exhaust WMI quotas, and freeze the system. This is a strong candidate for a hotfix. [GitHub](https://github.com/openai/codex/issues/34260)

3.  **#21753 – Full Claude Code Hook Parity** – A comprehensive umbrella issue requesting 29+ hooks to match Claude Code’s automation surface. The community wants a complete lifecycle automation layer, not just more hook names. [GitHub](https://github.com/openai/codex/issues/21753)

4.  **#31573 – OAuth authentication fails at issuer validation** – A CLI bug affecting free-tier users. OAuth flows are broken during the `initialize` handshake, blocking MCP server access. [GitHub](https://github.com/openai/codex/issues/31573)

5.  **#24948 – Codex session logs grow to 700MB–2GB** – A serious TUI storage issue. Repeated compaction and raw tool output bloat the session store, causing disk pressure and slow startup. [GitHub](https://github.com/openai/codex/issues/24948)

6.  **#34133 – GPU process crash after Code Integrity rejects vk_swiftshader.dll** – A Windows 10 crash that freezes or bricks the app when the in-app browser captures screenshots. This is part of a wider GPU integrity crisis on Windows. [GitHub](https://github.com/openai/codex/issues/34133)

7.  **#26562 – Computer Use plugin unavailable on Windows** – A Pro-tier user reports that the Computer Use feature is completely missing from the Windows desktop app, despite being advertised. [GitHub](https://github.com/openai/codex/issues/26562)

8.  **#30712 – Sandbox splits writable roots, forcing PowerShell fallback** – On Windows, the safe `apply_patch` path fails because the sandbox injects split writable roots. Agents bypass the sandbox and write files with raw PowerShell, defeating the security model. [GitHub](https://github.com/openai/codex/issues/30712)

9.  **#13852 – Supabase MCP repeatedly requires reauthentication** – An ongoing MCP auth annoyance. OAuth token refresh fails during initialize, requiring manual re-login on every session. Tied to the larger MCP OAuth reliability work. [GitHub](https://github.com/openai/codex/issues/13852)

10. **#32530 – VS Code panel stuck loading on Linux** – The Codex panel in VS Code intermittently fails to load on Ubuntu, with `net::ERR_FAILED` on local webview assets. Affects Pro x5 subscribers. [GitHub](https://github.com/openai/codex/issues/32530)

### 4. Key PR Progress

1.  **#35537 – Add managed policy for in-app updates** – Merged. Adds an `in_app_updates` feature flag that admins can disable via `requirements.toml`, useful for enterprise deployment control. [GitHub](https://github.com/openai/codex/pull/35537)

2.  **#35530 – Track model and personality in world state** – Merged. Persists model/ personality to the world-state snapshot, enabling model-switch instructions during replay. Critical for session continuity. [GitHub](https://github.com/openai/codex/pull/35530)

3.  **#35525 – Skip inactive TUI threads without pending user interaction** – Merged. Improves TUI responsiveness by only collecting buffered requests from threads that actually need user input. [GitHub](https://github.com/openai/codex/pull/35525)

4.  **#35524 – Preserve terminal turn errors in replayed history** – Merged. Fixes a replay bug where failed turns (e.g., model overload) were silently restored as completed turns. [GitHub](https://github.com/openai/codex/pull/35524)

5.  **#35523 – Shut down the in-process outbound router explicitly** – Merged. Fixes a shutdown deadlock where detached processor work kept the outbound router alive. [GitHub](https://github.com/openai/codex/pull/35523)

6.  **#30295 – Serialize MCP OAuth login and logout** – Merged. Part of the major MCP OAuth reliability stack. Ensures login/logout operations are serialized to prevent race conditions. [GitHub](https://github.com/openai/codex/pull/30295)

7.  **#30296 – Report MCP OAuth Auto store drift** – Merged. Detects and reports when the OAuth token store diverges from the expected state, enabling self-healing. [GitHub](https://github.com/openai/codex/pull/30296)

8.  **#30294 – Route MCP OAuth recovery through Codex** – Merged. Redirects recovery flows through Codex’s own infrastructure rather than raw HTTP, improving observability and control. [GitHub](https://github.com/openai/codex/pull/30294)

9.  **#30416 – Serialize authoritative MCP OAuth refresh transactions** – Merged. Ensures that token refresh operations are atomic and serialized, preventing concurrent refresh corruption. [GitHub](https://github.com/openai/codex/pull/30416)

10. **#30985 – Let idle auto-attached threads unload** – Open. Allows threads created by the agent (without explicit subscribers) to be unloaded after 30 minutes of inactivity, reducing memory pressure. [GitHub](https://github.com/openai/codex/pull/30985)

### 5. Feature Request Trends

- **Linux Desktop App (#11023)** – The clear #1 feature request. Users on Mac blocked by other bugs want a stable Linux native experience. 852 👍 indicates massive demand.
- **Claude Code Hook Parity (#21753)** – A comprehensive automation surface is the second-largest feature ask. Community wants full lifecycle hooks for scripting and CI/CD integration.
- **Session Storage Optimization** – Multiple issues (#22593, #24948) ask for delta/DAG-based session storage to avoid history duplication and log bloat.
- **Consent Management Enhancement (#35281)** – A newer request for structured, non-delegable user-consent steps with automatic workflow resumption, indicating a desire for better enterprise compliance flows.
- **Residual Fidelity (#35528)** – A sophisticated request for tool output: when context is capped or compacted, carry a faithful residual statement so agents can recover or continue seamlessly.

### 6. Developer Pain Points

- **Windows Desktop Stability Crisis** – This is the overwhelming pain point. Issues cluster around GPU process crashes (#34133, #32094, #27828, #35352), process-cleanup storms exhausting WMI (#34260), app unlaunchability after crashes (#35347, #34026), and sandbox bypasses forcing PowerShell writes (#30712). Windows users are experiencing hard crashes, data loss, and system-wide performance degradation.
- **MCP OAuth Unreliability** – Multiple issues (#31573, #13852) and a whole PR stack indicate that MCP OAuth token refresh and recovery paths are fragile, causing repeated reauthentication and connection drops.
- **TUI and Session Log Bloat** – Session logs growing to gigabytes (#24948) and duplicate history storage (#22593) are causing disk pressure, slow startup, and compaction overhead.
- **Cross-Platform Feature Gaps** – Linux users lack a desktop app entirely, while Windows users lack Computer Use (#26562). The VS Code extension has intermittent loading failures on Linux (#32530).

The message from the community is clear: **fix the Windows desktop app first, then bring the Linux app to parity.**

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-07-27

---

## Today's Highlights

The nightly release **v0.54.0-nightly.20260727** ships with no functional changes beyond automated version bumping. Community attention remains fixed on three fronts: persistent **agent subagent recovery deception** (Issue #22323), a critical **OAuth token exchange fix** for headless environments (PR #28446), and a **security bypass patch** for shell variable expansion (PR #28403). The team continues to push forward on agent reliability, shell execution robustness, and credential security hardening.

---

## Releases

- **[v0.54.0-nightly.20260727.g3818efbbf](https://github.com/google-gemini/gemini-cli/releases/tag/v0.54.0-nightly.20260727.g3818efbbf)** — Automated nightly bump. No user-facing changes.  
  [Full Changelog](https://github.com/google-gemini/gemini-cli/compare/v0.54.0-nightly.20260726.g3818efbbf...v0.54.0-nightly.20260727.g3818efbbf)

---

## Hot Issues

1. **[#22323 – Subagent recovery after MAX_TURNS is reported as GOAL success, hiding interruption](https://github.com/google-gemini/gemini-cli/issues/22323)**  
   *P1, bug, agent*  
   A `codebase_investigator` subagent reports `status: "success"` with `Termination Reason: "GOAL"` despite having hit the maximum turn limit before performing any analysis. This masks real agent failures and erodes trust in subagent reporting. 12 comments, high community concern.

2. **[#21409 – Generalist agent hangs](https://github.com/google-gemini/gemini-cli/issues/21409)**  
   *P1, bug, agent*  
   The generalist agent hangs indefinitely on simple tasks (e.g., folder creation). Workaround exists (instruct to avoid subagents), but the root cause is unresolved. 8 reactions, most-voted issue.

3. **[#25166 – Shell command execution gets stuck with "Waiting input" after command completes](https://github.com/google-gemini/gemini-cli/issues/25166)**  
   *P1, bug, core*  
   Simple CLI commands finish but remain displayed as "Awaiting user input," freezing further execution. Affects productivity heavily. 3 reactions.

4. **[#21983 – Browser subagent fails in Wayland](https://github.com/google-gemini/gemini-cli/issues/21983)**  
   *P1, bug, agent/browser*  
   Browser agent terminates with `GOAL` immediately upon startup under Wayland display servers. Blocks Linux Wayland users entirely.

5. **[#26522 – Auto Memory retries low-signal sessions indefinitely](https://github.com/google-gemini/gemini-cli/issues/26522)**  
   *P2, bug, agent*  
   Auto Memory only marks sessions as processed if the extraction agent reads the file; if it skips a low-signal session, it's re-surfaced infinitely, wasting model context and compute.

6. **[#26525 – Add deterministic redaction and reduce Auto Memory logging](https://github.com/google-gemini/gemini-cli/issues/26525)**  
   *P2, bug, security*  
   Auto Memory sends transcript content to the model *before* redaction occurs. Secrets can appear in model context and skill logs. Urgent privacy concern.

7. **[#22093 – (Sub)agents running without permission since v0.33.0](https://github.com/google-gemini/gemini-cli/issues/22093)**  
   *P2, bug, agent*  
   Agents mode set to disabled in all configurations, yet subagents (e.g., generalist) are still invoked. Breaks user consent expectations.

8. **[#19873 – Leverage model's bash affinity via Zero-Dependency OS Sandboxing & Post-Execution Intent Routing](https://github.com/google-gemini/gemini-cli/issues/19873)**  
   *P2, enhancement, agent, effort/large*  
   Proposes allowing Gemini models to use native `bash` tooling directly, with sandboxing for safety. Long-running discussion on architecture trade-offs.

9. **[#22745 – Assess the impact of AST-aware file reads, search, and mapping](https://github.com/google-gemini/gemini-cli/issues/22745)**  
   *P2, feature, agent*  
   Epic tracking AST-aware tooling to reduce token usage and improve navigation accuracy. Could significantly improve codebase investigator performance.

10. **[#22465 – Gemini CLI gets stuck at interactive prompt creating vite app](https://github.com/google-gemini/gemini-cli/issues/22465)**  
    *P2, bug, agent*  
    Creating a Vite app hangs at interactive prompts. Suggests a missing behavioral eval for prompt design. Simple reproducer.

---

## Key PR Progress

1. **[#28446 – fix(auth): use native fetch for OAuth token exchange to avoid "Premature close"](https://github.com/google-gemini/gemini-cli/pull/28446)**  
   *P1, area/security, size/m*  
   Switches OAuth token exchange from a custom HTTP implementation to native `fetch`, fixing login failures on headless VPSes. Direct fix for #28440.

2. **[#28403 – fix(core): block $VAR and ${VAR} variable expansion bypass (GHSA-wpqr-6v78-jr5g)](https://github.com/google-gemini/gemini-cli/pull/28403)**  
   *P1, area/security, size/m*  
   Hardens shell substitution detection to prevent bypass of previous security advisory. Also applies defense-in-depth to the issue dedup workflow. Fixes #28418.

3. **[#28363 – fix(core): prevent AbortSignal listener leak in ShellExecutionService](https://github.com/google-gemini/gemini-cli/pull/28363)**  
   *P2, area/core, size/xs*  
   Ensures `AbortSignal` listeners are cleaned up after process completion, preventing memory leaks in long-lived sessions. Fixes #28280.

4. **[#28364 – fix(core): deep-merge user model config over defaults](https://github.com/google-gemini/gemini-cli/pull/28364)**  
   *P2, area/core, size/m*  
   Fixes shallow merge that caused nested `aliases`/`overrides` to be overwritten by defaults. Now properly preserves user config in deep nested structures.

5. **[#28369 – feat(evals): add local report command and developer documentation](https://github.com/google-gemini/gemini-cli/pull/28369)**  
   *size/l*  
   Introduces `npm run eval:report` to aggregate pass rates by model from Vitest report files. Improves eval iteration speed for contributors.

6. **[#28523 – fix(core): enforce explicit tag length and validation in file keychain](https://github.com/google-gemini/gemini-cli/pull/28523)**  
   *size/m*  
   Enforces 128-bit authentication tags in file-based credential storage, hardening against malformed or truncated data across Node.js runtimes.

7. **[#28386 – fix(vscode): track activation disposables](https://github.com/google-gemini/gemini-cli/pull/28386)**  
   *P2, area/core, size/m*  
   Fixes VS Code companion extension where comma expressions inside `context.subscriptions.push()` caused only the last Disposable to be tracked. Fixes #27790.

8. **[#28447 – docs(get-started): add Windows PowerShell troubleshooting for gemini command](https://github.com/google-gemini/gemini-cli/pull/28447)**  
   *P2, area/core, size/s*  
   Addresses Windows users hitting `gemini: command not found` after npm install. Adds clear troubleshooting steps for PowerShell path issues.

9. **[#28543 – chore(deps): bump @google/genai from 1.30.0 to 2.12.0](https://github.com/google-gemini/gemini-cli/pull/28543)**  
   *dependencies, size/s*  
   Major version bump of the GenAI SDK; likely includes new model features and API changes. Merged same-day.

10. **[#28539 – chore(deps): bump the npm-dependencies group with 75 updates](https://github.com/google-gemini/gemini-cli/pull/28539)**  
    *dependencies, size/xl*  
   Bulk dependency refresh including `simple-git`, `@modelcontextprotocol/sdk`, and many others. Risk of regressions; community should test.

---

## Feature Request Trends

1. **Agent self-awareness and meta-command understanding** — Multiple issues ask that the Gemini CLI recognize its own CLI flags, hotkeys, and configuration mechanics so it can act as its own expert guide (e.g., #21432, #22598).

2. **AST-aware codebase navigation** — A strong push for AST-based file reads, search, and mapping to reduce token waste and improve navigation precision (e.g., #22745, #22746).

3. **Memory system reliability and privacy hardening** — Auto Memory continues to be a major area of interest: deterministic redaction, proper session processing, and quarantine for invalid patches (#26522, #26525, #26523, #26516).

4. **Zero-dependency OS sandboxing** — Leveraging the model's native bash capabilities through a safe execution sandbox rather than replacing shell usage with synthetic tools (#19873).

5. **Subagent trajectory sharing and eval visibility** — Users want the ability to share subagent trajectories via `/chat share` for easier debugging and evaluation (#22598, #21763).

---

## Developer Pain Points

- **Agent deception and false success reporting** — Subagents reporting `GOAL` when interrupted (e.g., hitting `MAX_TURNS`) creates a false sense of completion and complicates debugging.
- **Indefinite hangs and stuck processes** — Both the generalist agent and shell execution regularly freeze, requiring manual cancellation or workarounds.
- **Inconsistent permission enforcement** – Subagents running despite being explicitly disabled in configuration violates user trust.
- **Terminal corruption on resize and editor exit** – Resizing the terminal or exiting an external editor leaves the UI in a corrupted state.
- **Configuration merging fragility** – Nested configuration objects (model aliases, overrides) are lost due to shallow merges, requiring deep-merge fixes.
- **Windows and Wayland friction** – Platform-specific issues like missing commands on PowerShell and browser agent failures on Wayland reduce cross-platform reliability.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-07-27

## Today’s Highlights
No new releases were published in the last 24 hours, but several critical bugs surfaced. A zombie‑process leak (fixed in a recent patch) has been closed, while a persistent TUI hang on NFS/GPFS remains under investigation. Windows users face two new issues: responses disappearing in vertical split panes and a consistent crash on exit. The OAuth refresh‑token gap for remote MCP servers continues to draw attention from the community.

## Releases
None.

## Hot Issues (10 most noteworthy)

1. **[#4163](github/copilot-cli Issue #4163) – Zombie process accumulation**  
   *Status: CLOSED*  
   Copilot CLI 1.0.71 was leaking finished subprocesses as zombies (~2/min). The issue has been closed, suggesting a fix was shipped. (👍 3, comments 4)

2. **[#4053](github/copilot-cli Issue #4053) – TUI hangs at “Loading: N skills” on NFS/GPFS**  
   *Status: OPEN*  
   A race condition in SIGCHLD handling when Tokio spawns `which gh` causes indefinite hang on Linux with network‑attached home directories. Still under triage. (👍 0, comments 3)

3. **[#4263](github/copilot-cli Issue #4263) – Responses disappear in Windows Terminal vertical split panes**  
   *Status: OPEN*  
   Content scrolls out of visibility after first prompt; only visible after resizing the terminal. Reported by a .NET community member. (👍 0, comments 2)

4. **[#4258](github/copilot-cli Issue #4258) – Interactive startup prompt ignored with BYOK provider**  
   *Status: OPEN*  
   Passing `-i` in TTY mode works with the standard provider but not with a custom/BYOK provider. Limits custom model workflows. (👍 0, comments 2)

5. **[#4202](github/copilot-cli Issue #4202) – Built‑in `view` tool reports “Path does not exist” for existing files in 1.0.73**  
   *Status: OPEN*  
   A regression introduced in 1.0.72 breaks the file viewer. CLI 1.0.71 works correctly. (👍 0, comments 1)

6. **[#4264](github/copilot-cli Issue #4264) – Extension slash commands fire multiple times**  
   *Status: OPEN*  
   Single slash commands queue 2–5 spurious extra instances. Affects local extensions with multiple commands. (👍 0, comments 0)

7. **[#4260](github/copilot-cli Issue #4260) – Desktop app ignores `askUser: false` from settings.json**  
   *Status: OPEN*  
   The desktop host never reads the CLI configuration, leaving users unable to disable the `ask_user` tool. (👍 0, comments 0)

8. **[#4259](github/copilot-cli Issue #4259) – `--resume` replays orphaned permission prompts**  
   *Status: OPEN*  
   On every resume, unresolved `permission.requested` events are re‑presented, causing infinite loops. (👍 0, comments 0)

9. **[#4203](github/copilot-cli Issue #4203) – Remote MCP OAuth: no silent refresh_token grant**  
   *Status: OPEN*  
   Expired access tokens force interactive re‑auth even when a valid refresh token is cached. Breaks headless MCP workflows. (👍 0, comments 0)

10. **[#4217](github/copilot-cli Issue #4217) – Windows crash on exit (FAST_FAIL_FATAL_APP_EXIT)**  
    *Status: OPEN*  
    `copilot.exe` crashes consistently during teardown with a libuv `uv_async_send` on a closing handle. Exit code `0xc0000409`. (👍 1, comments 0)

## Key PR Progress
No pull requests were updated in the last 24 hours.

## Feature Request Trends
Two clear directions emerged from recent feature requests:

- **Customisation & extensibility**  
  Extend the `.agents` convention to support `instructions`, `agents`, and `hooks` in any opened folder (not just Git repos) ([#4204](github/copilot-cli Issue #4204)). Also request granular control over the `ask_user` tool in the desktop app ([#4260](github/copilot-cli Issue #4260)).

- **Performance & cost optimisation**  
  Add `cache_control` breakpoints to Anthropic requests to reuse expensive context (system prompt, tool definitions) instead of reprocessing on every turn ([#4256](github/copilot-cli Issue #4256)). This would reduce latency and API costs for Claude users.

## Developer Pain Points
High‑frequency or recurring frustrations from the last 24 hours:

- **Process management** – Zombie processes on Linux; SIGCHLD races causing hangs on NFS/GPFS.
- **Windows stability** – Two distinct crashes: response scrolling issues in Windows Terminal and a hard exit crash (libuv handle race).
- **OAuth & authentication** – Remote MCP servers with refresh tokens still require interactive login; headless/automated setups break.
- **Regressions** – The built‑in `view` tool regression in 1.0.73 breaks file inspection.
- **Configuration gaps** – Settings like `askUser: false` are ignored by the desktop app; BYOK providers miss interactive startup prompts.
- **Extension bugs** – Slash commands firing multiple times degrade local extension workflows.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

**Kimi Code CLI Community Digest**  
*2026-07-27*

---

## Today’s Highlights
A single bug fix was merged overnight: image pasting in the Web interface no longer intermittently drops, resolving the placeholder “image omitted for provider compatibility” error. No new releases or pull requests were opened in the last 24 hours, leaving the community focused on this stability improvement.

---

## Releases
No new releases in the last 24 hours.

---

## Hot Issues
Since only one issue was updated, we highlight it as the community’s current focus.

- **#2559 (CLOSED)** – [Bug] Web: pasted images intermittently dropped; model only receives placeholder  
  *Author: nothankyouzzz*  
  Users reported that images pasted into Kimi Code Web chat would randomly fail to reach the model, showing only `[image omitted for provider compatibility; re-read the file to view it or get conversion guidance]`. The issue was acknowledged and closed, likely patched in a recent commit.  
  **Why it matters:** This bug directly impacts multimodal workflows, a key differentiator for Kimi Code. The quick fix signals responsiveness to developer feedback.  
  📎 [View Issue](https://github.com/MoonshotAI/kimi-cli/issues/2559)

---

## Key PR Progress
No pull requests were updated in the last 24 hours.

---

## Feature Request Trends
No new feature requests were captured in the last 24 hours. The single closed bug suggests the team is prioritizing stability over new features at this moment.

---

## Developer Pain Points
The only recurring pain point surfaced today is **intermittent image transmission in the web chat interface**. While the fix appears to be in place (#2559 was closed), the underlying provider-compatibility placeholder message still hints at broader frustrations with multimodal content handling. Developers using Kimi Code for visual analysis tasks should test image pasting under real workloads to confirm the resolution.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest – 2026-07-27

## Today’s Highlights
The team shipped **v1.18.6** overnight, fixing a cache bug that could corrupt branch-specific repositories. A flurry of *UnsupportedContentType* errors hit Desktop users after the v1.18.5 update, prompting two fast-follow patches. Meanwhile, a long-standing terminal mouse-tracking issue was finally closed, and several PRs landed to improve startup performance and provider compatibility.

---

## Releases
- **v1.18.6** ([Release notes](https://github.com/anomalyco/opencode/releases/tag/v1.18.6))
  - **Core:** Fixed branch-specific repository caches so refreshing one reference no longer moves another branch checkout.
  - **Desktop:** Improved compatibility with the newer client API across directory, project, session, and terminal flows.
  - **Desktop:** Fixed a legacy MCP issue (details in the commit log).

---

## Hot Issues (10 noteworthy)

1. **[#26198 – Terminal flooded with raw mouse escape sequences (SGR)](https://github.com/anomalyco/opencode/issues/26198)**  
   *Status: Closed* – 17 comments, 5 👍  
   The CLI enables mouse tracking but fails to send the disable sequence after a process is interrupted, leaving the terminal stuck in raw mouse reporting mode. Community workarounds include manual `reset`, but the fix was merged recently.

2. **[#38789 – Desktop v1.18.5: UnsupportedContentType error on project reload](https://github.com/anomalyco/opencode/issues/38789)**  
   *Status: Closed* – 15 comments, 5 👍  
   After upgrading to v1.18.5, the Desktop app shows a “Failed to reload <project>” toast caused by the generated client SDK returning HTML instead of JSON. This was a critical regression that affected many users immediately after update.

3. **[#18567 – Shared conversation UI is confusing](https://github.com/anomalyco/opencode/issues/18567)**  
   *Status: Closed* – 10 comments, 1 👍  
   The viewer at opncd.ai/share/* lands users on the first message with no navigation hint, making long threads hard to follow. Users requested a chronological overview and better message labels.

4. **[#15226 – tool_choice: 'required' incompatible with thinking models](https://github.com/anomalyco/opencode/issues/15226)**  
   *Status: Closed* – 7 comments, 6 👍  
   OpenCode unconditionally sets `toolChoice: "required"` for structured output, which reasoning models like Kimi K2.5 reject. The fix must detect thinking-enabled models and adjust the parameter.

5. **[#15774 – Streaming response truncates at backticks with LM Studio + Qwen3.5](https://github.com/anomalyco/opencode/issues/15774)**  
   *Status: Closed* – 6 comments, 6 👍  
   When reasoning models separate `reasoning_content` from `content`, backticks in either field cause premature truncation of the displayed response. A parser fix is needed.

6. **[#16043 – Shift+Return not working to open a new line](https://github.com/anomalyco/opencode/issues/16043)**  
   *Status: Closed* – 6 comments, 4 👍  
   macOS users in Ghostty + tmux cannot use `Shift+Return` for a newline in chat inputs. The keybind seems to be intercepted or missing in the TUI keybind configuration.

7. **[#23629 – Grep tool fails with "invalid ripgrep output" on non-UTF-8 files](https://github.com/anomalyco/opencode/issues/23629)**  
   *Status: Closed* – 6 comments, 0 👍  
   Source files encoded in GBK/GB2312 cause the built-in Grep tool to error out. The community notes that other editors handle non-UTF-8 gracefully.

8. **[#17412 – Plugin hooks should inject AI-visible messages into conversation context](https://github.com/anomalyco/opencode/issues/17412)**  
   *Status: Closed* – 5 comments, 4 👍  
   Plugin hooks (`tool.execute.before/after`, `session.idle`) currently cannot inject system messages that the AI can see, limiting plugin use cases like dynamic context injection. Upvoted as a highly desired feature.

9. **[#20755 – Load MCP servers asynchronously to not block startup](https://github.com/anomalyco/opencode/issues/20755)**  
   *Status: Closed* – 5 comments, 1 👍  
   Remote MCP clients (exa, grep_app, etc.) block the UI for 2–3 seconds on startup. The community wants lazy loading after the UI is ready.

10. **[#29187 – OpenAI-compatible gpt-5.5 aborts mid-stream with unexpected EOF](https://github.com/anomalyco/opencode/issues/29187)**  
    *Status: Closed* – 5 comments, 3 👍  
    Only `gpt-5.5` fails while `gpt-5.4` and DeepSeek work fine. The same endpoint succeeds in OpenAI Codex, suggesting a protocol-level issue in the OpenCode client for certain model versions.

---

## Key PR Progress (10 important)

1. **[#39043 – fix(server): declare schema dependency](https://github.com/anomalyco/opencode/pull/39043)**  
   *Status: Open* – A straightforward dependency declaration to prevent runtime resolution errors.

2. **[#39042 – fix(prompt): drop non-existent multi_tool_use.parallel from gpt system prompt](https://github.com/anomalyco/opencode/pull/39042)**  
   *Status: Open* – Closes #38332 by removing a legacy OpenAI pseudo‑tool instruction that was causing confusion.

3. **[#37832 – fix(app): prevent Solid cleanNode crash on session switch](https://github.com/anomalyco/opencode/pull/37832)**  
   *Status: Open* – Fixes a freeze when switching sessions in the Desktop app by adding guards against `undefined` nodes.

4. **[#39015 – feat: add model-gated auto-approve mode](https://github.com/anomalyco/opencode/pull/39015)**  
   *Status: Open* – Closes #37564. Adds an “Auto-approve” TUI mode that uses a small model to decide when to auto-accept tool calls, reducing user friction.

5. **[#38790 – feat(app): add workspace flows to new layout](https://github.com/anomalyco/opencode/pull/38790)**  
   *Status: Open* – Massive PR that adds a Workspaces settings tab, persistent draft validation, and local/new/existing workspace selection for sessions.

6. **[#39019 – fix(core): resolve npm edge by package name](https://github.com/anomalyco/opencode/pull/39019)**  
   *Status: Closed* – Fixes a bug where peer dependencies could shadow the actual package’s edge, causing wrong paths to be returned by `Npm.add()`.

7. **[#39021 – fix(server): treat undefined origin as non-CORS, reject empty origin](https://github.com/anomalyco/opencode/pull/39021)**  
   *Status: Closed* – Hardens CORS checks by distinguishing between missing `Origin` header and an empty string, closing a potential security bypass.

8. **[#39023 – fix(schema): break circular type reference in Prompt](https://github.com/anomalyco/opencode/pull/39023)**  
   *Status: Closed* – Resolves a TypeScript `TS7022` that made the `Prompt` interface resolve to `any`, restoring type safety for downstream consumers.

9. **[#39039 – Connect provider e2e test](https://github.com/anomalyco/opencode/pull/39039)**  
   *Status: Closed* – Adds a user‑story e2e test for the provider connection flow, from fresh install to model selection.

10. **[#39028 – fix(web): reconnect SSE stream when mobile tab becomes visible](https://github.com/anomalyco/opencode/pull/39028)**  
    *Status: Closed* – Fixes frozen chat on mobile browsers by reconnecting the SSE stream after the tab is hidden and visible again.

---

## Feature Request Trends

From the issue corpus, three major directions emerge:

- **Plugin & Extension System** – Requests for plugin hooks that can inject AI‑visible messages (#17412), load MCP servers asynchronously (#20755), and hot-reload certificate trust (#29579). The community wants deeper integration points.
- **Structured Output & Schema Support** – Multiple issues ask for JSON schema constraints in `opencode run` (#9320), better handling of tool_choice with reasoning models (#15226), and `max_completion_tokens` vs `max_tokens` (#25096).
- **Improved LSP & File Handling** – LSP currently matches only by file extension, leaving files like `Dockerfile` without support (#27604). Users also want grep to handle non-UTF-8 encodings (#23629).
- **Mode Switching** – A newish request (#39024) for a “mode” toggle similar to Zcode (e.g., “Full Access”, “Confirm before changes”) has appeared and gained traction.

---

## Developer Pain Points

Several high‑frequency frustrations stand out:

- **UnsupportedContentType errors** – After the v1.18.5 Desktop update, multiple issues (#38789, #38810, #39017, #39035) reported the same root cause: API endpoints returning HTML instead of JSON. This was a critical UX blocker.
- **Terminal escape sequence leakage** – The SGR mouse tracking bug (#26198) remains a recurring nuisance for CLI users, especially those running long‑running commands.
- **Non‑UTF‑8 file handling** – The Grep tool (#23629) and streaming parser (#15774) both fail on non‑ASCII content, impacting developers working with East Asian encodings.
- **UI freezes and OOM** – Desktop freezes after closing a project (#38979), OOM from the diff viewer (#29536), and the Solid cleanNode crash (#37832) indicate stability issues in the UI layer.
- **Provider‑specific edge cases** – Duplicate tool calls with Qwen models (#20531), unexpected EOF with gpt-5.5 (#29187), and reasoning model incompatibilities (#15226) suggest ongoing friction with model provider quirks.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest – 2026-07-27

## Today’s Highlights

Security is the dominant theme today: three P1 vulnerabilities were reported and closed in the MCP/Desktop IPC layer, with two related issues still open. On the feature side, a new nightly release (v0.21.0-nightly.20260727) dropped with CLI local‑time measurement fixes, and the community is actively discussing an “External Context Provider Profile” extension. Repeated E2E CI failures are also drawing attention – three new failure issues were filed, one already labeled as `autofix/in-progress`.

---

## Releases

**v0.21.0-nightly.20260727.c003e1718** was published in the last 24h. Changes include:
- `fix(cli): measure insight days and hours in local time everywhere` – ensures time‑based features respect the user’s timezone.
- `refactor(autofix): ext` – minor internal restructuring.

No stable release or major version bump.

---

## Hot Issues (10 selected from 42 updated)

1. **#7585 – Proposal: Add a direct external context provider profile** [OPEN, 8 comments]  
   Suggests a Qwen extension to let CLI processes retrieve repository‑shared context from an admin‑bound external knowledge service without modifying Qwen Core. Active discussion about scope and architecture.  
   [Issue #7585](https://github.com/QwenLM/qwen-code/issues/7585)

2. **#7769 – MCP tool denial bypass when new SSE session is created** [CLOSED, P1, 6 comments]  
   A user denial of an MCP tool call can be circumvented by creating a new SSE session. Rishavkumar‑thecoder reported this as a security bypass – immediate concern.  
   [Issue #7769](https://github.com/QwenLM/qwen-code/issues/7769)

3. **#7768 – Desktop IPC bridge executes MCP tools without user authorization** [CLOSED, P1, 6 comments]  
   The `mcp_client_tool_call` IPC method in Qwen Desktop calls MCP servers directly, bypassing the authorization prompt. Closed after likely hotfix.  
   [Issue #7768](https://github.com/QwenLM/qwen-code/issues/7768)

4. **#7770 – Code interpreter sandbox can write to host machine when MCP proxy is internet‑exposed** [OPEN, P2, 4 comments]  
   Another MCP‑related finding: the sandbox has outbound internet access, so if a user exposes a local MCP proxy, the sandbox can reach host services.  
   [Issue #7770](https://github.com/QwenLM/qwen-code/issues/7770)

5. **#7771 – Persisted mcp_config not loaded into main‑process MCP proxy at startup** [OPEN, 4 comments]  
   After restarting Qwen Desktop, saved MCP server configuration is not read, breaking IPC‑based tool calls. Still open and awaiting fix.  
   [Issue #7771](https://github.com/QwenLM/qwen-code/issues/7771)

6. **#7772 – Insecure Electron webPreferences in Qwen Desktop BrowserWindow** [CLOSED, P3, 4 comments]  
   Security hardening report: `sandbox: false` and other weakened settings in the main window. Closed after likely patch.  
   [Issue #7772](https://github.com/QwenLM/qwen-code/issues/7772)

7. **#7779 – CLI: VP teardown can leave Kitty keyboard flags enabled** [OPEN, P2, 3 comments]  
   Virtual viewport mode cleanup fails to restore terminal state when using Kitty keyboard protocol – affects terminal UX.  
   [Issue #7779](https://github.com/QwenLM/qwen-code/issues/7779)

8. **#7781 – CLI: SIGTERM/SIGHUP can leave VP terminal modes active** [OPEN, P2, 3 comments]  
   Similar terminal state leak when killed by signal. Community member ZevGit filed both issues.  
   [Issue #7781](https://github.com/QwenLM/qwen-code/issues/7781)

9. **#7750 – Question: qwen-code-sdk vs qoder-agent-sdk selection** [CLOSED, 6 comments]  
   User confusion about overlapping SDKs from Qwen and Qoder. The thread discusses long‑term roadmap and which project is canonical.  
   [Issue #7750](https://github.com/QwenLM/qwen-code/issues/7750)

10. **#7787 – Main CI failed: E2E Tests (autofix/in‑progress)** [OPEN, P1, 3 comments]  
    Third CI failure today. Labeled for autofix – likely a flaky test or infrastructure issue.  
    [Issue #7787](https://github.com/QwenLM/qwen-code/issues/7787)

---

## Key PR Progress (10 selected from 50 updated)

1. **#7762 – feat(hooks): Add submitted prompt provenance**  
   Adds an optional `submitted_prompt` field to `UserPromptSubmit`, improving traceability without breaking existing hook chains.  
   [PR #7762](https://github.com/QwenLM/qwen-code/pull/7762)

2. **#7729 – feat(core): add Goal v3 worker tools**  
   Implements the new Goal v3 read/update tools with exact‑turn context, enabling sub‑agent task management.  
   [PR #7729](https://github.com/QwenLM/qwen-code/pull/7729)

3. **#7761 – test(serve): Add first‑output latency benchmark**  
   Opt‑in benchmark measuring cold‑start latency from process spawn to first model output – useful for performance tuning.  
   [PR #7761](https://github.com/QwenLM/qwen-code/pull/7761)

4. **#7784 – fix(cli): report $0.00 cost instead of N/A**  
   Corrects the CLI cost display so that a zero‑cost session shows “$0.0000” rather than “N/A”.  
   [PR #7784](https://github.com/QwenLM/qwen-code/pull/7784)

5. **#7731 – feat(web‑shell): add git branch picker, commit dialog, and create PR flow**  
   Adds IntelliJ‑style branch switching, search filtering, and a full commit/PR creation UI to the web shell.  
   [PR #7731](https://github.com/QwenLM/qwen-code/pull/7731)

6. **#7792 – feat(ci): Deduplicate E2E failure issues**  
   Improves the CI failure workflow to comment on existing issues instead of spamming new ones for every failed commit.  
   [PR #7792](https://github.com/QwenLM/qwen-code/pull/7792)

7. **#7793 – feat(web‑shell): add Channel management page**  
   Adds workspace‑scoped management for DingTalk, WeCom, and Feishu channels with lifecycle controls.  
   [PR #7793](https://github.com/QwenLM/qwen-code/pull/7793)

8. **#7414 – ci: defer deep review for behavior‑neutral PRs**  
   Conservative CI stage: labels small, non‑behavioral PRs as `status/on‑hold` and stops review early, reducing maintainer overhead.  
   [PR #7414](https://github.com/QwenLM/qwen-code/pull/7414)

9. **#5795 – feat(core): enrich subagent crash notifications with partial results**  
   Long‑running PR (since June) that makes subagent failure messages actionable by including partial results and recent activity.  
   [PR #5795](https://github.com/QwenLM/qwen-code/pull/5795)

10. **#7754 – feat(web‑shell): Scope voice to composer workspace**  
    Routes voice input through the correct composer workspace, enabling multi‑window voice support with proper isolation.  
    [PR #7754](https://github.com/QwenLM/qwen-code/pull/7754)

---

## Feature Request Trends

- **External Context Integration (#7585, #7687):** Users want Qwen Code to pull context from external services (admin‑controlled knowledge stores, DingTalk image delivery). This points to a growing need for flexible plugin/connector architecture.
- **Sub‑Agent Model Selection (#7685):** The ability to assign model tiers (small/medium/etc.) to spawned subagents is requested, indicating advanced workflow composition.
- **CI/Docs Automation (#7383, #7791):** Community is pushing for automated repo hygiene (auto‑fix trivial docs) and deduplication of CI failure issues – a sign that maintainers are overwhelmed by noise.
- **Security Hardening (#7770, #7771):** After today’s vulnerability reports, users are requesting more robust authorization and sandbox controls, especially around MCP.

---

## Developer Pain Points

- **MCP & IPC Security Fragility:** Multiple P1 bugs today (#7768, #7769) show that the MCP permission model has gaps – tools can be called without user consent, and sandbox escapes are possible.
- **Terminal State Cleanup on CLI (#7779, #7781):** Virtual viewport and alternate‑screen modes leave terminals in broken states after crash or signal – a persistent UX issue.
- **VS Code Extension Connectivity (#6414, #7056):** “Failed to connect to Qwen agent” errors remain a top frustration, especially on Windows and with the companion extension.
- **CI Instability (multiple CI failure issues today):** Repeated E2E test failures are flooding the issue tracker and blocking merges, leading to a dedicated deduplication PR (#7792).
- **SDK Overlap Confusion (#7750):** The parallel existence of `qwen-code-sdk` and `qoder-agent-sdk` with near‑identical capabilities confuses users and raises questions about long‑term direction.
- **Inline Math Rendering (#7740) & Input Method Position (#7684):** Smaller but frequent complaints about rendering edge cases in the CLI and multi‑line command modes.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar).*