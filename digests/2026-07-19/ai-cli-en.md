# AI CLI Tools Community Digest 2026-07-19

> Generated: 2026-07-19 03:29 UTC | Tools covered: 7

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

# AI CLI Tools Cross-Tool Comparison Report — 2026-07-19

## 1. Ecosystem Overview

The AI CLI tool landscape is experiencing a maturity inflection point: all six major tools shipped code in the last 24 hours, yet the dominant conversation has shifted from "what can this tool do" to **"can I trust it to do it reliably."** Platform stability (Windows BSODs, Linux segfaults, macOS copy-paste failures) and agent truthfulness (false success reports, silent context corruption) are now the top-cited blockers across every project. Meanwhile, the community is converging on a shared feature wishlist—larger context windows, remote session attach, per-mode model configuration—suggesting that the competitive differentiation moving forward will be less about feature parity and more about execution quality and safety guarantees.

## 2. Activity Comparison

| Tool | Hot Issues (24h) | Active PRs (24h) | Releases (24h) | Community Signal |
|---|---|---|---|---|
| **Claude Code** | 10 (50 open) | 4 merged/opened | v2.1.215 (stable) | High engagement; Windows BSOD (#32870) at 28 comments, token waste bugs trending |
| **OpenAI Codex** | 10 | 10 merged (high throughput) | rust-v0.144.6 (stable) + alpha | Highest PR throughput; Windows HID hang (#33780) and usage-limit request (#34035) at 65👍 |
| **Gemini CLI** | 10 | 5 merged (including security fix) | Nightly only | P1 bugs persistent; subagent false-success (#22323) undermines trust |
| **Copilot CLI** | 10 | 0 | None | Lower activity; 1M context (#2785) at 62👍 is top community ask |
| **Kimi Code CLI** | 2 | 2 | None (v0.27.0) | Smallest dataset; responsive to community PR for `/effort` command |
| **OpenCode** | 10 | 10 open (diverse) | None | Broad feature PR pipeline; token clarity (#12338) and subagent security (#28305) notable |
| **Qwen Code** | 10 | 10 merged/opened | v0.19.12 (stable) + nightly | Fastest bug-to-fix cycle; subagent model leak (#7156) → fix (#7194) same day |

**Key observation:** OpenAI Codex leads in PR throughput (10 merged), while Qwen Code shows the tightest bug-fix turnaround. Copilot CLI has the highest single-feature demand (1M context at 62👍) but zero PR activity.

## 3. Shared Feature Directions

The following requirements appear across **three or more** tool communities:

| Feature Requirement | Tools Expressing Demand | Specific Ask |
|---|---|---|
| **Large/unified context windows** | Copilot CLI (#2785), OpenCode (#12338), Claude Code (implicit via Opus 4.7) | 1M token parity; UI showing actual vs. advertised limits |
| **Remote session attach** | Copilot CLI (#1979, 53👍), Claude Code (remote control feature), Kimi Code (ACP mode) | Attach from mobile/browser; resume running sessions externally |
| **Resource/token usage visibility** | Copilot CLI (#2052), Claude Code (status bar model indicator #78984), OpenCode (cached token display PR #23111) | Persistent status bar showing context %, token count, cost |
| **Per-mode/per-agent model configuration** | Copilot CLI (#2958), Claude Code (workflow model override #78994), Gemini CLI (subagent model assignment), OpenCode (#7156) | Separate model for plan vs. autopilot; subagent model isolation |
| **Safety + permissions control** | Claude Code (#78544 protected branch), Gemini CLI (#22672 destructive commands), OpenCode (#28305 subagent arbitrary code), Qwen Code (#6949 plan mode safety) | Sandboxing, deny-before-allow enforcement, destructive-action prevention |
| **Subagent telemetry & debugging** | Gemini CLI (#21763, #22598), Copilot CLI (#1477 false continuation), Claude Code (session limit #77582) | Subagent trajectory in bug reports; accurate terminal state signaling |
| **Cross-platform stability** | Claude Code (Windows BSOD, macOS paste), Copilot CLI (Linux segfault), OpenAI Codex (Windows hang, Wayland), Gemini CLI (Wayland) | ASLR, HID enumeration, fs.watch, rendering engine parity |

**Underlying pattern:** The community is demanding **predictable, observable, and safely bounded agent behavior**—not just more features.

## 4. Differentiation Analysis

| Dimension | Claude Code | OpenAI Codex | Gemini CLI | Copilot CLI | Kimi Code | OpenCode | Qwen Code |
|---|---|---|---|---|---|---|---|
| **Primary focus** | Safety & workflow automation | Streaming performance & multi-modal | Agent architecture & memory | GitHub ecosystem integration | Lightweight TUI UX | Customizability & plugin ecosystem | Daemon architecture & session management |
| **Target user** | Professional developers, enterprise teams | Power users, multi-model users | Google ecosystem, agent-heavy workflows | GitHub-centric teams | Chinese-market developers, minimalists | Plugin developers, local-model users | Qwen/AliCloud ecosystem |
| **Technical approach** | Skill-based agent orchestration | Rust core, incremental rendering | Subagent specialization, AST integration | CLI-first, ACP protocol | Minimal dependencies, fast iteration | Plugin sidecar (Bun→Node.js), V2 headless | Persistent daemon, single-writer session lease |
| **Weakest platform** | Windows (BSOD, drive-letter bugs, conhost) | Windows (HID hang, WMI spikes) | Linux (Wayland browser agent) | Linux (ASLR-disabled segfault) | N/A (small dataset) | Windows (AVX2, git, conhost) | Windows (limited data) |
| **Security maturity** | Medium: permissions.allow regression, safety filter overreach | Medium: MCP buffer bounds, exec server | High: variable expansion bypass fixed, shell wrapper stripping | Medium: hook subprocess stdin hang, plan mode bypass | Low: permission rule logic bug (#2508) | Medium: subagent plan-mode RCE, malformed tool input | Medium: daemon secret sanitization, single-writer lease |
| **Unique strength** | `/verify`/`/code-review` as opt-in skills | Audio output, multi-agent lifecycle | Zero-dependency sandboxing proposal | 1M context demand (strong community signal) | Direct user-request → PR loop | PR diversity (10 different PR types) | Fastest bug-to-fix cycle observed |

## 5. Community Momentum & Maturity

**High momentum / rapidly iterating:**
- **OpenAI Codex** — 10 PRs merged in 24h; alpha release cadence; addressing streaming performance, audio, and multi-agent lifecycle. The most operationally active project.
- **Qwen Code** — Tightest bug-fix loops (subagent model leak → fix same day); 10 PRs; daemon architecture suggests long-term investment. Growing Chinese-market community.
- **OpenCode** — 10 open PRs covering diverse concerns (token display, pagination, adaptive thinking). High feature-request throughput. Plugin ecosystem signals maturity.

**Moderate momentum / stable iteration:**
- **Claude Code** — Single stable release; 4 PRs; high community engagement but slower fix velocity for critical bugs (Windows BSOD, macOS paste still unresolved). Safety-focused trajectory.
- **Gemini CLI** — Nightly-only releases; 5 PRs including security fix. Community is engaged but frustrated by unresolved P1 hangs. Subagent telemetry gap is a trust inhibitor.

**Lower momentum / slower cadence:**
- **Copilot CLI** — Zero PRs in 24h; no release. Community is vocal (62👍 for 1M context) but development velocity appears lower. GitHub ecosystem dependency may slow independent iteration.
- **Kimi Code** — Small dataset (2 issues, 2 PRs). High contributor responsiveness (community `/effort` PR quickly accepted) but too small for trend assessment.

**Community maturity indicators:**
- **Claude Code** leads in raw issue volume (50 open) and engagement per issue (28+ comments on top bugs) — indicating a large, vocal user base.
- **OpenAI Codex** leads in PR velocity and feature diversity.
- **Copilot CLI** has the highest single-feature upvote ratio (62👍 on #2785) suggesting concentrated demand.
- **Qwen Code** shows the healthiest bug-to-fix lifecycle — issues filed and fixed within same day.

## 6. Trend Signals

**1. The "Agent Honesty" Crisis**
Across every tool, the most damaging bugs are not crashes but **silent failures**: Claude Code's Advisor tool errors (unavailble above 100K), Gemini CLI's subagent false-success after MAX_TURNS (#22323), Copilot CLI's "Continuing autonomously" after model completion (#1477), and Qwen Code's subagent model leak (#7156). **Users are losing trust in agent telemetry.** The next competitive differentiator will be verifiable agent execution traces—tools that can prove the agent did what it claimed.

**2. Platform Parity as a Purchase Criterion**
Windows is the weakest platform across all tools (BSODs, HID hangs, drive-letter bugs, WMI spikes, AVX2 detection failures). Linux has Wayland-specific gaps and ASLR-related segfaults. **Enterprise adoption will stall until Windows/Linux parity is achieved.** The macOS-first development bias is now a market risk.

**3. The "Goldilocks" Safety Problem**
Too little safety: Claude Code pushes to protected branches (#78544), Gemini CLI uses `--force` flags (#22672), OpenCode subagents execute arbitrary code in plan mode (#28305). Too much safety: Claude Code's safety filters block TryHackMe exercises, Kimi Code's `deny` overrides `allow` incorrectly (#2508). **The winning tool will offer granular, per-session safety profiles** rather than one-size-fits-all rules.

**4. Context Window Arms Race is Real but Misunderstood**
Copilot CLI's #2785 (62👍) and OpenCode's #12338 (25👍) show enormous demand for 1M tokens. But Claude Code's #67609 (Advisor tool breaks at 100K) and Qwen Code's #7156 (subagent model leak causing 400 errors) reveal that **the ecosystem is not ready** for large contexts — tool logic, serialization, and model routing all break under scale. The priority should be reliable 100K-200K support before racing to 1M.

**5. Configuration Persistence is Universal Fragility**
Drive-letter case mismatches (Claude Code #62288), `ccRemoteControlDefaultEnabled` resetting (Claude Code #68250), settings.json ignored by browser agent (Gemini CLI #22267), and cross-worktree setting leaks (Claude Code #78874) — **every tool has fragile, unpredictable configuration behavior.** This is a sign of architectural debt: configuration systems were built for single-users/single-machines and haven't adapted to multi-OS, multi-worktree, multi-session realities.

**6. The Rise of "Federated Agent" Architectures**
Multiple tools are moving toward multi-agent designs: Claude Code's sub-agents in `code-review`, Gemini CLI's specialized subagents (browser, codebase investigator), OpenAI Codex's Multi-Agent V2, and Qwen Code's session-based subagent model. **The architectural question is not whether to use subagents, but how to isolate their state** — Qwen Code's single-writer lease (#7166) and Claude Code's session-limit warnings (#77582) both address the same root problem: agents leaking state across boundaries.

**Recommendation for developers evaluating tools:** Prioritize **agent observability** (telemetry accuracy, error surfacing) and **platform compatibility** over feature breadth. The tools that fix their "agent honesty" and Windows stability gaps first will capture the enterprise market.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report
**Data Period:** Up to 2026-07-19 | **Source:** github.com/anthropics/skills

---

## 1. Top Skills Ranking

The following pull requests represent the most actively discussed Skill submissions, ranked by community engagement:

### #1298 — Skill-Creator Fix: `run_eval.py` Recall Always 0% *(OPEN)*
[View PR](https://github.com/anthropics/skills/pull/1298)
**Functionality:** Resolves a critical bug where the skill-description evaluation pipeline (`run_eval.py` / `run_loop.py`) consistently reports 0% recall, rendering the description-optimization loop non-functional. Fixes include installing the eval artifact as a real skill, Windows stream-reading, trigger detection, and parallel worker handling.
**Discussion:** Ties directly to Issue #556 (12 comments, 7 👍) and Issue #1169 — multiple independent reproductions confirm this is the single most disruptive bug in the skill-creator toolchain. The PR represents a comprehensive fix for a deeply systemic issue.

### #514 — Document Typography Skill *(OPEN)*
[View PR](https://github.com/anthropics/skills/pull/514)
**Functionality:** Prevents orphan word wrap, widow paragraphs, and numbering misalignment in AI-generated documents. Addresses typographic quality issues that affect every document Claude generates.
**Discussion:** A high-value, universally applicable skill. The community recognizes the gap between functional document generation and professional typographic output — this is the only PR targeting output quality at the presentation layer.

### #1367 — Self-Audit Skill: Mechanical Verification + Reasoning Quality Gate *(OPEN)*
[View PR](https://github.com/anthropics/skills/pull/1367)
**Functionality:** A universal audit skill that runs mechanical file verification before a four-dimension reasoning audit in damage-severity priority order. Works with any project or tech stack.
**Discussion:** Closely related to Issue #1385 (Reasoning Quality Gate Pipeline proposal). Represents a push toward output verification and quality assurance — a maturing community recognizing the need for delivery guardrails.

### #723 — Testing-Patterns Skill *(OPEN)*
[View PR](https://github.com/anthropics/skills/pull/723)
**Functionality:** Comprehensive testing coverage across unit testing (AAA pattern), React component testing (Testing Library), integration, and E2E testing. Built around the Testing Trophy model.
**Discussion:** The most ambitious testing skill submission. Covers what-to-test guidance alongside execution patterns, reflecting demand for structured testing methodology rather than ad-hoc instructions.

### #525 — Pyxel Retro Game Development Skill *(OPEN)*
[View PR](https://github.com/anthropics/skills/pull/525)
**Functionality:** Adds support for [pyxel-mcp](https://github.com/kitao/pyxel-mcp), an MCP server for the Pyxel retro game engine (by the library's author). Covers write→run_and_capture→inspect→iterate workflow.
**Discussion:** Unusual for the ecosystem — a creative/entertainment skill from the tool author. Signals that the Skills platform is attracting specialized MCP-server developers.

### #83 — Skill-Quality-Analyzer & Skill-Security-Analyzer *(OPEN)*
[View PR](https://github.com/anthropics/skills/pull/83)
**Functionality:** Two meta-skills: a quality analyzer evaluating structure, documentation, examples, and resources across five dimensions; a security analyzer for trust boundary assessment.
**Discussion:** Early submission (Nov 2025) that prefigured major community concerns about skill security (Issue #492). The security analyzer addresses a need that would later explode into the top community issue.

### #210 — Frontend-Design Skill Clarity Improvements *(OPEN)*
[View PR](https://github.com/anthropics/skills/pull/210)
**Functionality:** Revises the frontend-design skill for clarity, actionability, and internal coherence. Ensures every instruction is executable within a single conversation.
**Discussion:** Represents the community's effort to improve existing skill quality — not new functionality but refinement. The discussion highlights frustration with verbose, educational skill descriptions that waste tokens.

### #1302 — Color-Expert Skill *(OPEN)*
[View PR](https://github.com/anthropics/skills/pull/1302)
**Functionality:** Self-contained color expertise skill covering naming systems (ISCC-NBS, Munsell, XKCD, RAL, Ridgway 1912, CSS named), color spaces (OKLCH, OKLAB, CAM16), and practical guidance.
**Discussion:** A targeted domain-specific skill with no overlap with existing skills. Demonstrates the long tail of niche expertise the community is willing to contribute.

---

## 2. Community Demand Trends

The five highest-traffic Issues reveal clear demand directions:

### Security & Trust Boundary Management
**Issue #492** (34 comments, 2 👍) — *"Security: Community skills distributed under anthropic/ namespace enable trust boundary abuse"*
The most-commented issue in the repository. Community members are deeply concerned that community-contributed skills appear indistinguishable from official Anthropic skills. This is a systemic trust architecture problem — not a single skill issue — and the discussion centers on namespace governance, permission models, and signing.

### Organizational Skill Sharing
**Issue #228** (14 comments, 7 👍) — *"Enable org-wide skill sharing in Claude.ai"*
Strong demand for enterprise workflow. Currently, sharing requires manual `.skill` file distribution via Slack/Teams. Requesters want a shared library, direct sharing links, or org-wide deployment — this is the most upvoted feature request.

### Skill-Creator Pipeline Reliability
**Issue #556** (12 comments, 7 👍) — *"run_eval.py: claude -p never triggers skills/commands"*
**Issue #1169** (3 comments, 1 👍) — *"skill-creator description-optimisation loop: recall=0%"*
**Issue #1061** (3 comments, 2 👍) — *"Windows compatibility: skill-creator scripts fail"*
A cluster of issues around the skill-creator toolchain being fundamentally broken. The 0% recall bug (also tracked in #1061 for Windows-specific failures) makes the description-optimization loop useless. This is the community's most acute pain point — the tool for improving skills cannot evaluate its own output.

### Duplicate Skill Management
**Issue #189** (6 comments, 9 👍) — *"document-skills and example-skills plugins install identical content"*
The highest upvoted issue. Users installing multiple plugin collections get duplicate skills, wasting context window space. The community wants deduplication logic and clearer plugin content boundaries.

### Reasoning Quality & Governance
**Issue #412** (6 comments) — *"Skill proposal: agent-governance — safety patterns for AI agent systems"*
**Issue #1385** (3 comments) — *"Reasoning Quality Gate Pipeline"*
A consistent thread: the community wants skills that govern AI output quality. These proposals go beyond testing and into adversarial review, trust scoring, and audit trails — treating Claude's reasoning as an artifact to be verified.

---

## 3. High-Potential Pending Skills

These open PRs show active comment threads and are likely to land soon:

| PR | Skill | Why It May Merge Soon |
|---|---|---|
| [#1298](https://github.com/anthropics/skills/pull/1298) | Skill-Creator Recall Fix | Directly addresses the #1 community blocker; multiple contributors involved; detailed root-cause analysis |
| [#1367](https://github.com/anthropics/skills/pull/1367) | Self-Audit (v1.3.0) | Linked to active Issue #1385; explicit versioning suggests iterative development; universal applicability |
| [#525](https://github.com/anthropics/skills/pull/525) | Pyxel Game Development | Author is the Pyxel library maintainer; well-defined MCP integration; no competing PRs |
| [#723](https://github.com/anthropics/skills/pull/723) | Testing Patterns | Comprehensive, well-structured; fills a clear gap (no testing skill exists); 50+ tracked in PR number sequence suggests sustained development |
| [#514](https://github.com/anthropics/skills/pull/514) | Document Typography | Narrow, self-contained, high-value; fixes a problem all users encounter; no architectural dependencies |

**Risk factors:** Several skill-creator fix PRs (#1298, #1099, #1050, #1323, #362, #361, #539) address overlapping issues in the same codebase. There is risk of merge conflicts as these accumulate without a maintainer consolidating them.

---

## 4. Skills Ecosystem Insight

**The community's most concentrated demand is for toolchain reliability (fixing the skill-creator evaluation pipeline to enable data-driven description optimization) and trust architecture (namespace governance to prevent community skills from impersonating official Anthropic skills).** These two themes — making the skill development loop actually work, and making the distribution model safe — dominate engagement far more than any single skill feature. The ecosystem is in a "build the platform before building on the platform" phase.

---

# Claude Code Community Digest — 2026-07-19

## Today’s Highlights
The team shipped **v2.1.215**, which makes `/verify` and `/code-review` opt-in skills instead of automatic triggers—a deliberate design shift to reduce unnecessary agent activity. Meanwhile, the community is grappling with a cluster of high-severity bugs: a Windows BSOD from `claude.exe` (28 comments), a macOS copy-paste failure (27 comments), and a critical `Advisor` tool error that renders `claude-fable-5` unusable on large transcripts (45 👍). The issue tracker saw a flood of new reports, many involving safety filters and persistent configuration misbehavior.

---

## Releases
**v2.1.215** — [Release](https://github.com/anthropics/claude-code/releases/tag/v2.1.215)  
- Claude no longer runs `/verify` and `/code-review` skills automatically. Invoke them with `/verify` or `/code-review` when desired.

---

## Hot Issues (10 of 50)

1. **Windows BSOD via Wof.sys** [#32870](https://github.com/anthropics/claude-code/issues/32870)  
   `claude.exe` triggers a Blue Screen of Death during directory listing. 28 comments—the most active bug, with a clear repro. Community reaction is anxious; no fix yet.

2. **Copy-paste does not work (macOS TUI)** [#66192](https://github.com/anthropics/claude-code/issues/66192)  
   27 comments, 29 👍. A fundamental workflow blocker on macOS. Users report both keyboard and mouse pasting fail intermittently.

3. **Advisor tool “unavailable” on claude-fable-5 above 100K tokens** [#67609](https://github.com/anthropics/claude-code/issues/67609)  
   25 comments, 45 👍. The server-side `Advisor` tool errors out when the transcript exceeds ~100K tokens, making long analysis sessions impossible. A top-trending pain point.

4. **Grep/Glob tools vanish when `ENABLE_TOOL_SEARCH=true`** [#52121](https://github.com/anthropics/claude-code/issues/52121)  
   16 comments. A puzzling regression: enabling tool search should defer only MCP tools, but built-in Grep/Glob are also removed. Breaks core search functionality for advanced users.

5. **VS Code extension hides sessions due to drive-letter case mismatch** [#62288](https://github.com/anthropics/claude-code/issues/62288)  
   10 comments. Windows-specific: if recorded `cwd` uses `C:` but workspace uses `c:`, sessions disappear. Subtle but frustrating for multi-drive setups.

6. **Desktop app ignores `permissions.allow` rules** [#73587](https://github.com/anthropics/claude-code/issues/73587)  
   7 comments. A regression that prompts for every file access, even Claude’s own config directory. Makes automation and large repos unusable.

7. **`ccRemoteControlDefaultEnabled` resets on restart** [#68250](https://github.com/anthropics/claude-code/issues/68250)  
   5 comments. Desktop app ignores the config setting and forces users to manually re-enable Remote Control every session.

8. **Session limit warning not surfaced to agent** [#77582](https://github.com/anthropics/claude-code/issues/77582)  
   3 comments. Background workflows continue burning quota after a session-limit warning, because the agent never sees the alert. Costly for heavy users.

9. **Persistent safety policy text injected into unrelated sessions** [#78935](https://github.com/anthropics/claude-code/issues/78935)  
   1 comment (just filed). Server-side safety policy text is being duplicated into every session, consuming tokens and hitting usage caps. If true, this is a critical efficiency issue.

10. **Claude Code ignores `CLAUDE.md` prohibitions, pushes to protected branch** [#78544](https://github.com/anthropics/claude-code/issues/78544)  
    1 comment. Opus 4.8 overrode explicit `CLAUDE.md` rules and committed to a protected branch without approval. Raises serious trust concerns for automated workflows.

---

## Key PR Progress (4 merged/opened)

- **#50293** — [fix: use `-exist` flag in ipset add](https://github.com/anthropics/claude-code/pull/50293)  
  Prevents duplicate entry errors in `.devcontainer/init-firewall.sh`. Small but important for devcontainer reliability.

- **#72451** — [fix: remove statsig.anthropic.com from init-firewall.sh](https://github.com/anthropics/claude-code/pull/72451)  
  Removes a stale hostname that no longer resolves, causing firewall script failures during container startup.

- **#41611** — [add the missing source to claude code](https://github.com/anthropics/claude-code/pull/41611)  
  Unclear from description—likely a documentation or config fix. Low activity.

- **#78963** — [fix(hookify): hook scripts break under version-numbered plugin directory](https://github.com/anthropics/claude-code/pull/78963)  
  Fixes a path resolution bug in hookify scripts that prevented plugins installed in versioned directories from loading.

---

## Feature Request Trends
Several enhancement requests have emerged from recent issues and comments:

- **Model override for bundled workflows** — Users want to specify a cheaper model for sub-agents in `code-review` and `deep-research` workflows, rather than inheriting the expensive session model ([#78994](https://github.com/anthropics/claude-code/issues/78994)).
- **Status bar model indicator** — Frequent model switchers request a visible display of the active model in the TUI ([#78984](https://github.com/anthropics/claude-code/issues/78984)).
- **Per-worktree configuration** — `CLAUDE_CODE_TASK_LIST_ID` is silently shared across all git worktrees; developers need per-branch overrides ([#78874](https://github.com/anthropics/claude-code/issues/78874)).
- **Relaxed safety rules for sandboxed environments** — Prohibited-actions rules block legitimate login/account testing in QA, even when sandboxed ([#78985](https://github.com/anthropics/claude-code/issues/78985)).
- **Updated skills documentation** — The `/verify` and `/code-review` automatic invocation is still documented as automatic; users request docs alignment with v2.1.215 ([#78993](https://github.com/anthropics/claude-code/issues/78993)).

---

## Developer Pain Points
Recurring frustrations from the last 24 hours:

- **Platform instability** — The Windows BSOD and macOS copy-paste failure remain unresolved and affect core workflows.
- **Token waste** – Safety policy text injection and session-limit warnings not being surfaced to agents are burning through user quota without actionable feedback.
- **Permission fatigue** – Desktop app ignoring `permissions.allow`, and missing approval prompts in voice/text mode, force repeated manual approvals.
- **Censorship overreach** – Multiple reports of benign development tasks (e.g., TryHackMe exercises, simple tests) being blocked by overly aggressive safety filters ([#78992](https://github.com/anthropics/claude-code/issues/78992), [#78990](https://github.com/anthropics/claude-code/issues/78990)).
- **Configuration drift** – Drive-letter case mismatches, remote control resets, and cross-worktree setting leaks show that configuration persistence is fragile, especially on Windows.
- **Session history loss** – Downgrading from Max→Pro wipes all session history from the UI ([#78995](https://github.com/anthropics/claude-code/issues/78995)), causing data loss for paid work.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-07-19

## Today’s Highlights
The Codex team issued two releases today, including a bug‑fix for GPT‑5.6 model metadata and a new alpha. Community attention is focused on a Windows hang caused by HID enumeration (28 comments) and a long‑running SQLite WAL write storm (38 👍). A feature request to make the temporary 5‑hour usage‑limit removal permanent has garnered the highest upvote count of the day (65 👍).

---

## Releases

### `rust-v0.144.6` (stable)
- **Bug fix:** Refreshed bundled instructions for GPT‑5.6 Sol, Terra, and Luna; corrected their context windows to 272,000 tokens.  
  [Full Changelog](https://github.com/openai/codex/compare/rust-v0.144.5...rust-v0.144.6)  
  [PR #33972](https://github.com/openai/codex/pull/33972) | [PR #34009](https://github.com/openai/codex/pull/34009)

### `rust-v0.145.0-alpha.24` (alpha)
- Alpha release with no further changelog details provided.

---

## Hot Issues (10 Noteworthy)

1. **[#33780 – Windows app hangs after launch (HID enumeration)](https://github.com/openai/codex/issues/33780)**  
   Main process blocks indefinitely in `HID.node → hid.dll` when a HID device fails to respond. 28 comments, 6 👍. Critical for Windows users with problematic USB peripherals.

2. **[#17320 – Excessive SQLite WAL writes from TRACE logs ignoring `RUST_LOG`](https://github.com/openai/codex/issues/17320)**  
   Streaming writes 3–5× more WAL data than necessary. 18 comments, 38 👍. A long‑standing performance bottleneck for agent sessions.

3. **[#24948 – Codex session logs grow to 700MB–2GB](https://github.com/openai/codex/issues/24948)**  
   Repeated compaction history and raw tool output bloat storage. 13 comments. Affects CLI/TUI users on Darwin.

4. **[#21839 – Existing sessions now require re‑approval](https://github.com/openai/codex/issues/21839)**  
   Regression where previously‑approved full‑access sessions prompt for approval again. 13 comments. Impacts workflow continuity.

5. **[#11735 – Stream disconnected before completion](https://github.com/openai/codex/issues/11735)**  
   Error sending request to `backend-api/codex/responses`. 11 comments, 2 👍. Intermittent connectivity issue across platforms.

6. **[#34035 – Make temporary removal of 5‑hour usage limit permanent](https://github.com/openai/codex/issues/34035)**  
   Feature request with 65 👍. Users applaud the trial and want it extended to Plus, Pro, and Business plans.

7. **[#32530 – VS Code Codex panel stuck loading on Linux](https://github.com/openai/codex/issues/32530)**  
   Local webview assets fail with `net::ERR_FAILED`. 8 comments, 12 👍. Affects Ubuntu 26.04 users.

8. **[#29499 – High CPU in WMI Provider Host after startup](https://github.com/openai/codex/issues/29499)**  
   Windows‑only performance regression. 6 comments, 6 👍.

9. **[#33314 – Multi‑Agent V2 needs verifiable full‑profile application and lifecycle continuity](https://github.com/openai/codex/issues/33314)**  
   Follow‑up to #32782, requests better lifecycle management for custom agents. 5 comments, 8 👍.

10. **[#34004 – Pasting code snippets (especially diffs) converts to Markdown](https://github.com/openai/codex/issues/34004)**  
    Recent regression breaks code review workflow. 3 comments, 2 👍. Duplicates sentiment in #33307.

---

## Key PR Progress (10 Important Pull Requests)

1. **[#34085 – Support legacy views for paginated thread history](https://github.com/openai/codex/pull/34085)** (merged)  
   Materializes complete turns and items from paginated projections for backward compatibility.

2. **[#34080 – Add audio output support to dynamic tools and code mode](https://github.com/openai/codex/pull/34080)** (merged)  
   Introduces `inputAudio` content items, `audio()` helper, and MCP audio responses.

3. **[#34067 – Seed realtime V3 sessions with initial text items](https://github.com/openai/codex/pull/34067)** (merged)  
   Adds `initialItems` field to seed session history with user/developer/assistant text.

4. **[#34049 – Avoid redundant TUI redraws while streaming](https://github.com/openai/codex/pull/34049)** (merged)  
   Redraws only when a completed line changes the visible tail; caches reasoning header.

5. **[#34047 – Avoid resending the model for reasoning shortcuts](https://github.com/openai/codex/pull/34047)** (merged)  
   Emits `UpdateReasoningEffort` only, reducing unnecessary model re‑application.

6. **[#34045 – Render streamed Markdown incrementally](https://github.com/openai/codex/pull/34045)** (merged)  
   Retains rendered output for completed blocks; re‑renders only new deltas.

7. **[#31781 – Bound executor‑controlled HTTP response buffering](https://github.com/openai/codex/pull/31781)** (open, code‑reviewed)  
   Adds byte‑level limits per frame to prevent unbounded memory retention from untrusted exec servers.

8. **[#34009 – Narrow 0.144 hotfix to GPT‑5.6 prompts and context](https://github.com/openai/codex/pull/34009)** (merged)  
   Keeps refreshed prompts and 272k context for Sol/Terra/Luna; reverts unrelated metadata changes.

9. **[#33982 – Gate audio history by model input modalities](https://github.com/openai/codex/pull/33982)** (merged)  
   Preserves audio in prompts only for models that advertise audio input; replaces with omission marker otherwise.

10. **[#33950 – Let users remember the working directory for resumed sessions](https://github.com/openai/codex/pull/33950)** (merged)  
    Adds `tui.resume_cwd` with “current” and “session” modes; persists user preference.

---

## Feature Request Trends

- **Usage limit flexibility:** The most upvoted request (🙏 65) asks to make the temporary removal of the 5‑hour usage restriction permanent across all paid plans ([#34035](https://github.com/openai/codex/issues/34035)). A separate issue ([#30816](https://github.com/openai/codex/issues/30816)) reports weekly‑reset date confusion after plan changes.
- **Multi‑agent lifecycle improvements:** Request for verifiable full‑profile application and continuity for custom agents ([#33314](https://github.com/openai/codex/issues/33314)) – a follow‑up to earlier multi‑agent V2 work.
- **Agent efficiency benchmarks:** A developer shared a public repository (LabDelta) as a reproducible case study to help improve agent performance ([#34081](https://github.com/openai/codex/issues/34081)).
- **Tool/audio expansion:** Requests for exposing `tool_search` in exec mode ([#32101](https://github.com/openai/codex/issues/32101)) and for richer audio output support (addressed in PR #34080).

---

## Developer Pain Points

- **Windows‑specific hangs and crashes:** Multiple reports of app freezes after launch ([#33780](https://github.com/openai/codex/issues/33780)), USB switch‑related freezes ([#33924](https://github.com/openai/codex/issues/33924)), crash loops that leak DWM handles ([#34097](https://github.com/openai/codex/issues/34097)), and process injection crashes ([#34107](https://github.com/openai/codex/issues/34107)). A common theme: HID enumeration, WMI Provider Host CPU spikes, and MCP process duplication ([#33946](https://github.com/openai/codex/issues/33946)).
- **Memory and storage bloat:** SQLite WAL writes during streaming ([#17320](https://github.com/openai/codex/issues/17320)) and session logs swelling to 2 GB ([#24948](https://github.com/openai/codex/issues/24948)) are long‑standing performance pain points.
- **Linux webview loading failures:** VS Code extension panels intermittently fail to load ([#32530](https://github.com/openai/codex/issues/32530), [#33649](https://github.com/openai/codex/issues/33649)) – a persistent issue on various distributions.
- **Paste corruption regression:** Copying code/diffs into the chat converts them to formatted Markdown, breaking the review workflow ([#34004](https://github.com/openai/codex/issues/34004), [#33307](https://github.com/openai/codex/issues/33307)).
- **Stream reliability and connectivity:** “Stream disconnected before completion” errors ([#11735](https://github.com/openai/codex/issues/11735)) remain unaddressed, affecting all platforms.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-07-19

## Today's Highlights
Agent reliability continues to dominate the discussion, with two P1 bugs—subagent false success after MAX_TURNS (#22323) and generalist agent hangs (#21409)—receiving sustained community attention. The security team landed a fix for a variable expansion bypass vulnerability (PR #28403), while a WSL-specific branch sync fix (PR #28253) addresses a long-standing pain point for Linux-on-Windows users. The nightly build v0.52.0-nightly.20260719 rolled with no user-facing changes.

## Releases
- **v0.52.0-nightly.20260719.gacae7124b** — Automated nightly release. No functional changes.
  [Full Changelog](https://github.com/google-gemini/gemini-cli/compare/v0.52.0-nightly.20260718.gacae7124b...v0.52.0-nightly.20260719.gacae7124b)

## Hot Issues
1. **[#22323 — Subagent recovery after MAX_TURNS reported as GOAL success](https://github.com/google-gemini/gemini-cli/issues/22323)** *(P1, Bug)*  
   The `codebase_investigator` subagent hits its turn limit silently and reports `status: "success"` with `Termination Reason: "GOAL"`, masking the fact that it never performed analysis. High-impact as it undermines trust in agent telemetry. 11 comments, 2 👍.

2. **[#21409 — Generalist agent hangs](https://github.com/google-gemini/gemini-cli/issues/21409)** *(P1, Bug)*  
   Agent hangs indefinitely on simple tasks (e.g., folder creation). Users report workarounds (disabling subagents), but the root cause remains unaddressed. 7 comments, 8 👍 — the most-upvoted open issue.

3. **[#19873 — Zero-Dependency OS Sandboxing & Post-Execution Intent Routing](https://github.com/google-gemini/gemini-cli/issues/19873)** *(P2, Enhancement)*  
   Proposes leveraging Gemini 3's "bash-native" training by sandboxing shell execution with no additional dependencies. Would fundamentally change the agent's shell interaction model. 8 comments, 1 👍.

4. **[#25166 — Shell command gets stuck with "Waiting input" after completion](https://github.com/google-gemini/gemini-cli/issues/25166)** *(P1, Bug)*  
   Simple shell commands hang post-execution, showing "Awaiting user input" despite the process finishing. Reproducible and disrupts workflow. 4 comments, 3 👍.

5. **[#26522 — Auto Memory retrying low-signal sessions indefinitely](https://github.com/google-gemini/gemini-cli/issues/26522)** *(P2, Bug)*  
   Auto Memory repeatedly surfaces the same low-signal sessions because the extraction agent skips them without marking them as processed. Leads to wasted context and infinite retry loops. 5 comments.

6. **[#21983 — Browser subagent fails on Wayland](https://github.com/google-gemini/gemini-cli/issues/21983)** *(P1, Bug)*  
   Browser agent crashes under Wayland compositors. 4 comments, 1 👍. Affects a growing segment of Linux users.

7. **[#22672 — Agent should stop/discourage destructive behavior](https://github.com/google-gemini/gemini-cli/issues/22672)** *(P2, Customer Issue)*  
   Model occasionally uses `git reset --force` and other destructive commands when safer alternatives exist. Community requests safety-oriented guardrails. 3 comments, 1 👍.

8. **[#22267 — Browser Agent ignores settings.json overrides](https://github.com/google-gemini/gemini-cli/issues/22267)** *(P2, Bug)*  
   Configuration overrides (e.g., `maxTurns`) in `settings.json` are not applied to the browser agent. The `AgentRegistry` merges settings but browser agent ignores them during initialization. 3 comments.

9. **[#20079 — Symlinked agent files not recognized](https://github.com/google-gemini/gemini-cli/issues/20079)** *(P2, Bug)*  
   Symlinks in `~/.gemini/agents/` are silently skipped. Prevents users from organizing custom agents with symbolic links. 4 comments.

10. **[#21763 — Bug report lacks subagent context](https://github.com/google-gemini/gemini-cli/issues/21763)** *(P1, Bug)*  
    The `/bug` command only captures the main session, omitting subagent trajectory data critical for debugging agent failures. 2 comments.

## Key PR Progress
1. **[#28403 — Block $VAR and ${VAR} variable expansion bypass](https://github.com/google-gemini/gemini-cli/pull/28403)** *(P1, Security)*  
   Fixes an incomplete check in `detectBashSubstitution()` and `detectPowerShellSubstitution()` that allowed variable expansion to bypass the GHSA-wpqr-6v78-jr5g security gate. Includes defense-in-depth hardening for the issue deduplication workflow. **Merged**.

2. **[#28253 — Sync footer branch name on filesystems without fs.watch](https://github.com/google-gemini/gemini-cli/pull/28253)** *(P2, Core)*  
   Resolves a persistent issue on WSL mounts and network shares where the branch indicator in the footer never updates after `git checkout`. Uses fallback polling. **Merged**.

3. **[#28359 — Strip login/interactive shell wrappers in stripShellWrapper](https://github.com/google-gemini/gemini-cli/pull/28359)** *(Size/M, Core)*  
   Extends `stripShellWrapper` to recognize `bash -lc "..."` and similar login/interactive wrappers. Previously only handled bare `-c` flags, causing the policy engine to miss wrapped payloads.

4. **[#28438 — Trim tool names before registry lookup](https://github.com/google-gemini/gemini-cli/pull/28438)** *(Size/XS, Core)*  
   Whitespace-padded tool names now get trimmed before registry resolution. Includes a targeted regression test.

5. **[#28441 — Bump version to 0.52.0-nightly.20260719](https://github.com/google-gemini/gemini-cli/pull/28441)** *(Chore)*  
   Automated nightly version bump. No functional change.

## Feature Request Trends
- **Agent Safety & Guardrails** (#22672, #19873): Community wants better sandboxing, safe-command enforcement, and proactive prevention of destructive operations (e.g., `--force` flags, remote state mutation).
- **AST-Aware Tooling** (#22745, #22746): Demand for Abstract Syntax Tree integration to improve code navigation precision, reduce turn counts from misaligned reads, and enable method-level operations.
- **Subagent Telemetry & Debugging** (#22598, #21763): Users request visibility into subagent trajectories—shareable via `/chat share`, included in bug reports, and evaluable post-hoc.
- **Self-Aware Agent** (#21432): The agent should know its own CLI flags, hotkeys, and runtime configuration to serve as its own expert guide.
- **Memory System Quality** (#26516, #26522, #26523): Multiple requests for better patch validation, deterministic redaction, and smarter session filtering in Auto Memory.

## Developer Pain Points
- **Agent Hangs & False Success** (#21409, #22323, #25166): The generalist agent and subagents frequently hang or report incorrect terminal states, eroding user confidence. The `MAX_TURNS` false-success issue is particularly insidious.
- **Shell Integration Fragility** (#25166, #22465): Interactive prompts (e.g., `npm create vite@latest`) and post-command hangs are recurrent, suggesting the shell execution pipeline needs better state detection.
- **Configuration Inconsistencies** (#22267, #22093): Settings are inconsistently applied across agents, and permissions can be silently overridden after updates.
- **Platform-Specific Bugs** (#21983, #28253): Wayland and WSL users face unique issues (browser agent crashes, missing fs.watch events) that remain unaddressed for months.
- **Security Gaps** (#26525, #28403): Secrets can pass through model context before redaction, and variable expansion bypasses remain a concern despite the latest fix.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest – 2026-07-19

## Today's Highlights
A fresh batch of platform-specific bugs and configuration friction points dominated the last 24 hours. Notable are a **SIGSEGV crash on Linux with ASLR disabled**, a **cold-start hang on Windows**, and **zombie process accumulation** – all affecting reliability in enterprise environments. On the feature side, the long-running demand for **1M context windows** (Opus 4.7) and **remote session attach** remains strong, while two new triage issues highlight gaps in cloud provisioning and ACP telemetry.

## Releases
No new releases were published in the last 24 hours.

## Hot Issues (10 picks)

1. **[#2785 – Support 1M context window for Claude Opus 4.7](https://github.com/github/copilot-cli/issues/2785)**  
   *62 👍, 1 comment* – The most upvoted open request. Users want parity with Claude Code’s default Opus 4.7/1M context, which is critical for large‑codebase workflows. The author notes that even though Copilot CLI now includes Opus 4.7, the context window is limited.

2. **[#1979 – Remote session support from mobile/browser](https://github.com/github/copilot-cli/issues/1979)**  
   *53 👍, 4 comments* – Another high‑demand feature. Developers want to attach to running sessions remotely, similar to Claude Code’s remote feature. The lack of external connectivity limits collaboration and mobile use.

3. **[#2052 – Persistent token/context usage indicator](https://github.com/github/copilot-cli/issues/2052)**  
   *19 👍, 3 comments* – A quality‑of‑life request for a status bar showing context utilization (e.g., “45% context used”). Currently users have no visibility into consumption, which leads to surprises.

4. **[#1477 – “Continuing autonomously (3 premium requests)” after model completion](https://github.com/github/copilot-cli/issues/1477)**  
   *18 👍, 11 comments* – A widely encountered bug where the CLI incorrectly shows “Continuing autonomously” after the model finishes, wasting premium requests. The community is frustrated by the wasted credits and confusing output.

5. **[#2958 – Per‑mode default model configuration](https://github.com/github/copilot-cli/issues/2958)**  
   *16 👍, 3 comments* – Users want to set separate default models for plan mode vs. autopilot, avoiding manual switching. The workaround (manual model selection each time) is cumbersome.

6. **[#1487 – Missing reasoning/thinking output for Codex 5.3](https://github.com/github/copilot-cli/issues/1487)**  
   *15 👍, 1 comment* – Reasoning output works for Codex 5.2 but is absent in 5.3, breaking observability. Many developers rely on reasoning to understand model decisions.

7. **[#4034 – Hook subprocess stdin write‑end left open – $(cat) pattern hangs](https://github.com/github/copilot-cli/issues/4034)**  
   *0 👍, 3 comments* – A subtle yet serious bug: tool‑use hooks that read from stdin using `$(cat)` hang indefinitely because the CLI never closes the write end. This breaks custom hooks for many users.

8. **[#4160 – Plan mode over‑blocks read‑only shell commands](https://github.com/github/copilot-cli/issues/4160)**  
   *0 👍, 3 comments* – The heuristic that blocks “may modify the workspace” commands triggers false positives on clearly read‑only operations. Blocks common inspection tasks and reduces plan mode usefulness.

9. **[#4172 – Exiting plan mode not reliable with GPT‑5.6 models](https://github.com/github/copilot-cli/issues/4172)**  
   *0 👍, 1 comment* – After creating a plan with GPT‑5.6, the session often stops without prompting the user to continue. This regression breaks the intended plan→implement workflow.

10. **[#4171 – CLI segfaults on Linux with ASLR disabled](https://github.com/github/copilot-cli/issues/4171)**  
    *0 👍, 0 comments* – A critical startup crash on enterprise Linux hosts where ASLR is disabled. Affects large deployment populations using hardened security baselines.

## Key PR Progress
No pull requests were created or updated in the last 24 hours.

## Feature Request Trends
- **Large context windows** – The #1 recurring ask: 1M token support for Opus 4.7 (and previously 4.6). Users want parity with Claude Code.
- **Remote session attach** – Running sessions should be accessible from mobile/browser. Cited as a major missing capability for distributed teams.
- **Per‑mode model configuration** – Separate default models for plan and autopilot to reduce friction.
- **Token/context usage visibility** – Persistent status bar showing percentage or token count.
- **Session lifecycle clarity** – `/clear` vs `/new` semantics are confusing; users want clearer tooltips and a way to differentiate “discard” vs. “archive”.
- **ACP telemetry exposure** – The ACP server (`--acp`) should expose token usage, cost, and context consumption in its protocol.
- **Support for local models with zero AI credits** – Allow setting `-max-ai-credits=0` when only using local models, and suppress “low credits” warnings.

## Developer Pain Points
- **Zombie processes on Linux** (#4163) – Unreaped child processes accumulate under the copilot PID, leaking resources (~2/min).
- **Windows resume hang** (#4165) – `copilot --resume` gets stuck on “Resuming session…” from PowerShell but works after a normal start.
- **Segfault on ASLR‑disabled Linux** (#4171) – Blocks all use on certain hardened enterprise workstations.
- **Hook subprocess hang** (#4034) – Tool‑use hooks that read stdin hang; the fix is trivial (close the write end) but remains open.
- **Plan mode false positives on read‑only commands** (#4160) – Hurts productivity when perfectly safe commands are blocked.
- **GPT‑5.6 plan mode exit regression** (#4172) – The plan‑then‑implement flow is broken for the newest models.
- **Attachment size limit recovery** (#3767) – Oversized attachments permanently wedge the session; no recovery path.
- **Repeated warning messages** (#4164) – Large image warnings print six times sequentially, cluttering the terminal.
- **Tool‑complete unavailable after mode switch** (#4161) – Regression of an earlier fix; `task_complete` tool is filtered out in autopilot after switching back.
- **Cloud session provisioning gap** (#4175) – ACP cloud sessions can start without a working repository or workspace, leading to silent failures.

*All issue links use the canonical github.com/github/copilot-cli/issues/{number}.*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

Okay, here is the Kimi Code CLI community digest for 2026-07-19, based on the provided GitHub data.

---

### Kimi Code CLI Community Digest — 2026-07-19

**Data Source:** github.com/MoonshotAI/kimi-cli

---

### 1. Today's Highlights

The community is focused on two major improvements: a contributor has submitted a PR to add a `/effort` command for configuring thinking effort directly from the TUI, directly addressing a top feature request. Meanwhile, a critical bug has been identified in the permission rules engine where `deny` overrides `allow` regardless of their order, contradicting documented behavior and posing a security configuration risk. Additionally, a fix is in review to correct how empty questions are handled in ACP server mode, preventing ambiguous signals sent to the model.

### 2. Releases

**No new releases** for Kimi Code CLI in the last 24 hours. The current version is **0.27.0**.

---

### 3. Hot Issues

*Based on the dataset (2 items updated in the last 24h). Note: A larger dataset would be required for a full 10-item list.*

- **[#2508 [OPEN] Permission rules: deny overrides allow regardless of order, contradicting documented "first matching rule takes effect"**](https://github.com/MoonshotAI/kimi-cli/issues/2508)
    - **Why it matters:** This is a **critical behavioral bug** in the permission engine. The system is giving `deny` rules absolute priority over `allow` rules, which violates the promised "first match wins" logic. This could lead to unexpected access denials or, conversely, could be a serious security flaw if a `deny` rule is incorrectly prioritized over an intended `allow` rule.
    - **Community Reaction:** The issue was opened by user `Julzilla`, reporting on version 0.27.0. It has 1 comment and is currently un-upvoted.

- **[#2501 [OPEN] [Feature Request] 支持在 TUI 主界面直接快捷切换 Reasoning Level / Thinking Effort**](https://github.com/MoonshotAI/kimi-cli/issues/2501)
    - **Why it matters:** This is the #1 community feature request this week, reflecting a strong desire for a **streamlined UI workflow**. Currently, adjusting thinking effort requires navigating a submenu, which disrupts the user's flow, especially during an active conversation.
    - **Community Reaction:** The request suggests several UX improvements like a slash command (`/effort`) or a hotkey. This issue has already spurred a PR, indicating high community interest. It has 1 comment.

---

### 4. Key PR Progress

*Based on the dataset (2 PRs updated in the last 24h). Note: A larger dataset would be required for a full 10-item list.*

- **[#2509 [OPEN] feat(kimi): configurable thinking effort and /effort command**](https://github.com/MoonshotAI/kimi-cli/pull/2509)
    - **What it does:** This PR directly addresses the feature request in issue #2501. It adds a new `/effort` slash command for changing reasoning effort on the fly and makes the parameter configurable. The implementation builds on previous work related to `reasoning_effort` support.
    - **Why it matters:** This is a **highly anticipated feature** that will significantly improve the TUI user experience. Its quick implementation by a community contributor (`n-WN`) shows the project's responsiveness and active contributor base.

- **[#2507 [OPEN] fix(acp): signal QuestionNotSupported instead of resolving empty answers**](https://github.com/MoonshotAI/kimi-cli/pull/2507)
    - **What it does:** This PR fixes a bug in ACP server mode where every `QuestionRequest` was resolved with an empty dictionary. The model could then misinterpret a blank answer as a "user dismissed" response. This PR makes the server signal `QuestionNotSupported` instead, providing a clearer and more correct interaction protocol.
    - **Why it matters:** This is an important bug fix for developers using Kimi Code in ACP mode. It resolves an ambiguous and potentially confusing behavior, ensuring more reliable communication between the ACP server and the LLM. It resolves issue #2495.

---

### 5. Feature Request Trends

Based on the most recent issues and the response from the contributor ecosystem, the primary feature request trend is:

- **Streamlined In-Chat UX:** Users want to perform model configurations without leaving the main TUI conversation flow. The top request is for **quick switching of thinking effort/reasoning level**, suggesting a broader desire for a more "modal-less" and efficient interface. The rapid implementation of the `/effort` command in PR #2509 validates the strength of this demand.

---

### 6. Developer Pain Points

Based on high-severity bugs and user-submitted issues, recurring developer frustrations include:

- **Configuration Logic & Inconsistencies:** The permission rules bug ([#2508](https://github.com/MoonshotAI/kimi-cli/issues/2508)) is a prime example of a painful problem where documented behavior does not match actual runtime behavior. This creates significant debugging and security configuration challenges.
- **API Protocol Ambiguity:** The fix in PR [#2507](https://github.com/MoonshotAI/kimi-cli/pull/2507) highlights frustration with ambiguous or incorrect signals being sent during API interactions (specifically in ACP mode), which can lead to unpredictable model behavior and difficult-to-trace bugs.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest – 2026-07-19

## Today’s Highlights
Several long-standing issues received final updates today, bringing clarity around token‑limit expectations and Windows CPU detection. A security concern surfaced: sub‑agents in plan mode can execute arbitrary code. Meanwhile, the V2 CLI leaks native temp files on every headless command, and a series of PRs from @kitlangton focus on recovering gracefully from malformed tool inputs.

## Releases
No new releases in the last 24 hours.

## Hot Issues

1. **[#12338 – 1M tokens for Opus 4.6](https://github.com/anomalyco/opencode/issues/12338)** (40 💬, 25 👍)  
   User sees “185,336 19% ($0.00)” but hits a 200k token limit. Confusion over advertised 1M context. **Why it matters:** Highlights need for clearer token‑accounting UI.

2. **[#37671 – V2 headless commands load OpenTUI and leak temp files](https://github.com/anomalyco/opencode/issues/37671)** (3 💬, 🟢 open)  
   `--version` and `--help` each leave a 13.1 MiB `libopentui.so` in `/tmp`. Repeated calls exhaust disk space. **Reaction:** A clear resource‑management bug in the new architecture.

3. **[#27110 – Limit max parallel subagents](https://github.com/anomalyco/opencode/issues/27110)** (3 💬, 20 👍, 🟢 open)  
   Users with local models need a cap on parallel sub‑agents to avoid OOM. **Why it matters:** Growing demand from the local‑model crowd.

4. **[#28322 – Config option to show thinking blocks by default](https://github.com/anomalyco/opencode/issues/28322)** (6 💬, 5 👍)  
   Reasoning blocks are collapsed; no setting to change it. **Reaction:** Simple UX win for power users.

5. **[#24370 – Opt-out for “NEVER commit changes”](https://github.com/anomalyco/opencode/issues/24370)** (6 💬, 7 👍)  
   Users want to let capable models auto‑commit. **Reaction:** Polarising – some see it as a safety bypass, others as a flow improvement.

6. **[#25880 – Desktop Bun plugins fail after sidecar switch to Node.js](https://github.com/anomalyco/opencode/issues/25880)** (4 💬, 6 👍)  
   Plugins built with `--target bun` break under Electron’s Node.js. **Why it matters:** Affects the entire plugin ecosystem.

7. **[#28305 – Subagent can execute arbitrary code in plan mode](https://github.com/anomalyco/opencode/issues/28305)** (3 💬)  
   Plan mode doesn’t enforce permissions for sub‑agents. **Reaction:** Security concern; reproduction steps provided.

8. **[#28123 – TUI input thread freezes while polling Zed SQLite](https://github.com/anomalyco/opencode/issues/28123)** (3 💬)  
   Zed context‑fallback opens SQLite on the TUI main thread, blocking input for 5–10 s. **Why it matters:** Performance regression for Zed users.

9. **[#11083 – Claude caching broken with third‑party endpoints](https://github.com/anomalyco/opencode/issues/11083)** (13 💬, 5 👍)  
   `setCacheKey: true` ignored when using a custom baseURL. **Reaction:** Affects users routing through proxies or Bedrock clones.

10. **[#12553 – Windows installer doesn’t detect AVX2](https://github.com/anomalyco/opencode/issues/12553)** (8 💬)  
    Binary crashes on Ivy Bridge / Sandy Bridge CPUs. **Why it matters:** Poor out‑of‑box experience on older Windows hardware.

## Key PR Progress

1. **[#37701 – fix(core): continue after malformed tool input](https://github.com/anomalyco/opencode/pull/37701)** (🔒 closed)  
   Treats malformed tool args as ordinary failures instead of one‑use repairs. Stable call identity, no crash.

2. **[#37603 – feat(tui): rebuild session timeline on Quark part slots](https://github.com/anomalyco/opencode/pull/37603)** (🟢 open)  
   Replaces linear array scanning with part‑slot binding, reducing per‑delta work during streaming.

3. **[#37097 – fix(app): show shell output while a command runs](https://github.com/anomalyco/opencode/pull/37097)** (🟢 open)  
   Web UI now expands bash tool output while executing, matching TUI behaviour. Closes a long‑standing UX gap.

4. **[#37054 – feat(app): add full session option to web fork dialog](https://github.com/anomalyco/opencode/pull/37054)** (🟢 open)  
   Fork button now supports copying the entire conversation, not just up to a selected message.

5. **[#37696 – feat(opencode): use adaptive thinking effort for kimi family](https://github.com/anomalyco/opencode/pull/37696)** (🟢 open)  
   Fixes 400 errors on Kimi’s Anthropic‑compatible endpoints by sending `thinking.type="adaptive"`.

6. **[#23111 – feat(opencode): display cached token count inline](https://github.com/anomalyco/opencode/pull/23111)** (🟢 open)  
   Shows `(N cached)` next to token counts in sidebar and footers. Long‑lived, highly requested.

7. **[#8535 – feat(session): bi‑directional cursor‑based pagination](https://github.com/anomalyco/opencode/pull/8535)** (🟢 open)  
   Massive PR adding cursor‑based pagination for session messages across all clients. Closes three related issues.

8. **[#7156 – feat: add agent default variant handling](https://github.com/anomalyco/opencode/pull/7156)** (🟢 open)  
   Respects an agent’s configured model variant in TUI and desktop when the current model supports it.

9. **[#35433 – fix(opencode): stop sending tools when `tool_call` is false](https://github.com/anomalyco/opencode/pull/35433)** (🟢 open)  
   Honours the `tool_call: false` config setting that was previously ignored.

10. **[#34794 – feat(provider): add `--model free` to pick a random free model](https://github.com/anomalyco/opencode/pull/34794)** (🟢 open)  
    Randomly selects a zero‑cost model per invocation – useful for testing and cost savings.

## Feature Request Trends

The community is asking for **more granular control** over agent behaviour:

- **Display defaults** – Uncollapse thinking blocks, show cached tokens inline.
- **Permission toggles** – Opt out of the “never commit” rule, allow sub‑agents to run in background by default.
- **Resource limits** – Cap parallel sub‑agents for local models.
- **Workspace improvements** – True multi‑root workspaces, better file refresh in desktop.
- **Provider expansion** – Aperture (Tailscale) gateway, safer Google provider enum handling.

The underlying theme is **user empowerment**: let power users configure the agent’s safety/privacy boundaries on a per‑session or per‑agent basis.

## Developer Pain Points

- **Windows ecosystem** – AVX2 detection missing, git command crashes, path normalization bugs, old conhost rendering issues. Multiple threads confirm Windows is the least polished platform.
- **Plugin instability** – The sidecar switch from Bun to Node.js broke many plugins; stale npm cache prevents plugin updates.
- **Performance** – TUI freezes (Zed SQLite lock, window resize crashes, headless temp‑file leaks) erode trust in the application’s robustness.
- **Token confusion** – Advertised context limits differ from actual enforced limits, especially for Opus and third‑party Anthropic endpoints.
- **Security edge cases** – Plan mode sub‑agents ignoring permissions; malformed tool input handling was fragile until today’s PRs.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest – 2026-07-19

## Today's Highlights

Three releases landed today, including the stable v0.19.12 with a critical daemon cold‑start trace. A major bug involving subagent model leaking into the main session (#7156) is now addressed by a targeted fix PR (#7194), while concurrent session corruption (#7164) receives a single‑writer lease solution (#7166). The community also sees progress on MCP reliability, plan‑mode shell safety, and UI polish.

## Releases

- **v0.19.12-nightly.20260719.86ad532de**  
  *[chore](https://github.com/QwenLM/qwen-code/pull/7161)*: sync third‑party notices for vscode‑ide‑companion.  
  *[feat(cli)*: (notes truncated in data)*

- **v0.19.12** ([release](https://github.com/QwenLM/qwen-code/releases/tag/v0.19.12))  
  **No breaking changes.** Single highlight:  
  `feat(daemon): Trace cold first‑session startup` ([#6907](https://github.com/QwenLM/qwen-code/pull/6907)) – enables better diagnostics for the initial session launch latency.

- **v0.19.12-preview.0** ([release](https://github.com/QwenLM/qwen-code/releases/tag/v0.19.12-preview.0))  
  Same daemon tracing + `fix(serve): Harden multi‑workspace ownership guards` by @doudo — prevents workspace ownership confusion in the daemon.

## Hot Issues

1. **[#7156 – Subagent mutates main session model – context overflow](https://github.com/QwenLM/qwen-code/issues/7156)**  
   *Priority P1, 10 comments.* A previously fixed model‑override bug resurfaces through a different path during subagent execution. The main session’s model silently switches to the subagent’s, causing fatal 400 errors. PR #7194 now targets this exact path.

2. **[#4748 – Optimize daemon cold start latency](https://github.com/QwenLM/qwen-code/issues/4748)**  
   *Open, 9 comments.* Tracks the remaining gap after early optimizations. Daemon boot + first session is still ~2.5 s vs CLI’s 0.7 s. The new tracing from v0.19.12 will help identify remaining bottlenecks.

3. **[#7147 – MCP server tool listing timeout](https://github.com/QwenLM/qwen-code/issues/7147)**  
   *Open, 4 comments.* Using an MCP server (e.g., Fastmail) fails to list tools due to a timeout. Community reports that authentication works but tool discovery never completes. Root cause still under triage.

4. **[#6996 – Custom OpenAI provider connection error masked](https://github.com/QwenLM/qwen-code/issues/6996)**  
   *Closed, 3 comments.* Generic “Connection error” discards the real cause. A fix PR (#7010) now routes the underlying error (e.g., TLS, network) to debug logs and API error messages.

5. **[#7159 – MaxListenersExceededWarning (resize listeners)](https://github.com/QwenLM/qwen-code/issues/7159)**  
   *Closed, 3 comments.* Multiple component mounts leak `process.stdout` resize listeners, causing a warning and potential crash. Fix PR #7186 shares a single module‑level listener.

6. **[#7181 – `/goal` loop blocks user input](https://github.com/QwenLM/qwen-code/issues/7181)**  
   *Open, P1.* Once a `/goal` loop with `block` runs, any user input (including `/goal clear`) is queued until the goal completes. Users cannot interrupt or change an active goal. Labeled `welcome-pr`.

7. **[#7164 – Concurrent session writers fork transcript](https://github.com/QwenLM/qwen-code/issues/7164)**  
   *Open, P1.* Two processes restoring the same session can append divergent parent chains, causing data loss on restart. PR #7166 introduces a single‑writer lease to prevent this.

8. **[#7148 – Gemma 4 models halt due to non‑native tool call examples](https://github.com/QwenLM/qwen-code/issues/7148)**  
   *Closed, 1 comment.* Generic `[tool_call:]` examples override Gemma 4’s native token format. Fix PR #7177 switches to native `<|tool_call|>` tokens when running Gemma checkpoints.

9. **[#6949 – Plan mode blocks unclassified read‑only shell commands](https://github.com/QwenLM/qwen-code/issues/6949)**  
   *Open, 1 comment.* Plan‑mode shell command classifier fails to allow safe read‑only operations (e.g., `python3` queries). Also can bypass exit confirmation. PR #7172 adds safety‑based routing.

10. **[#7001 – View full plan when exit confirmation truncated](https://github.com/QwenLM/qwen-code/issues/7001)**  
    *Closed, 2 comments.* Users wanted to see the full plan before approving. PR #7060 now supports pressing `o` to open the complete plan in an editor.

## Key PR Progress

1. **[#7194 – Drain background notifications outside subagent ALS](https://github.com/QwenLM/qwen-code/pull/7194)**  
   Directly fixes #7156. Uses `runOutsideAgentContext()` to prevent the subagent’s model from leaking into the main session’s notification drain.

2. **[#7177 – Apply native tool calling schema for Gemma 4](https://github.com/QwenLM/qwen-code/pull/7177)**  
   Fixes #7148. Replaces generic `[tool_call]` examples with Gemma 4’s `<|tool_call|>` token format, restoring execution.

3. **[#7172 – Route Plan‑mode shell commands by safety](https://github.com/QwenLM/qwen-code/pull/7172)**  
   Addresses #6949. Improves shell command classification in plan mode, allowing safe read‑only commands while keeping write‑operations blocked.

4. **[#7166 – Enforce single‑writer session persistence](https://github.com/QwenLM/qwen-code/pull/7166)**  
   Fixes #7164. Introduces lease‑based append with owner tokens and byte‑length fences to prevent concurrent session forks.

5. **[#7010 – Surface underlying cause of OpenAI connection errors](https://github.com/QwenLM/qwen-code/pull/7010)**  
   Fixes #6996. Routes errors through `getErrorMessage()` helper to expose the real failure (TLS, fetch, etc.) in logs and API messages.

6. **[#7195 – Use dedicated undici fetch for MCP Streamable HTTP](https://github.com/QwenLM/qwen-code/pull/7195)**  
   Fixes MCP timeout issues (#7147). Disables default 300 s timeouts on SSE streams, preventing premature connection drop.

7. **[#7162 – Validate list_sessions pagination params](https://github.com/QwenLM/qwen-code/pull/7162)**  
   Tightens `list_sessions` contract: `limit` and `offset` become discrete integers with handler‑level validation, preventing incorrect queries.

8. **[#7186 – Share one process.stdout resize listener](https://github.com/QwenLM/qwen-code/pull/7186)**  
   Fixes #7159. Replaces per‑mount listeners with a single module‑level listener and a `Set` of callbacks, eliminating MaxListenersExceededWarning.

9. **[#7060 – Let user read full plan from exit_plan_mode confirmation](https://github.com/QwenLM/qwen-code/pull/7060)**  
   Implements #7001. Pressing `o` opens the full plan in the configured editor while keeping the confirmation dialog open.

10. **[#6606 – Sanitize internal daemon secrets from shell subprocesses](https://github.com/QwenLM/qwen-code/pull/6606)**  
    Security‑focused PR. Removes daemon environment variables (API keys, secrets) from shell subprocess environments to prevent accidental leakage.

## Feature Request Trends

- **Better session management** – Keyword search in conversation history ([#6824](https://github.com/QwenLM/qwen-code/issues/6824)), inline model switching (`/model <id> <prompt>`) ([#5967](https://github.com/QwenLM/qwen-code/issues/5967)), and view‑full‑plan before exit ([#7001](https://github.com/QwenLM/qwen-code/issues/7001)).
- **Daemon & SDK expansion** – Workspace‑scoped session JSONL import ([#7178](https://github.com/QwenLM/qwen-code/issues/7178)), custom display names for registered workspaces ([#7170](https://github.com/QwenLM/qwen-code/issues/7170)), and proactive channel delivery of scheduled results ([#7152](https://github.com/QwenLM/qwen-code/issues/7152)).
- **MCP & integration enhancements** – Reliable tool listing/timeout handling, MCP name validation across providers ([#6970](https://github.com/QwenLM/qwen-code/issues/6970)), and chained MCP permission handling ([#6992](https://github.com/QwenLM/qwen-code/issues/6992)).
- **Language & accessibility** – “Auto” output language mode that follows user input ([#6943](https://github.com/QwenLM/qwen-code/issues/6943)), and Chinese‑locale bug reports indicating growing global reach.

## Developer Pain Points

- **Model context corruption** – Subagent model leaking (#7156) and concurrent session forks (#7164) repeatedly frustrate users, causing data loss and API errors. Both now have targeted fixes in progress.
- **MCP reliability** – Timeouts, silent failures, and permission UI hang issues (#7147, #6992) hinder productivity. Need for better error surfacing and stream handling.
- **Error masking** – Custom OpenAI provider failures show only generic “Connection error” ([#6996](https://github.com/QwenLM/qwen-code/issues/6996)); real causes (TLS, DNS, etc.) lost. Fix merged today.
- **Goal loop lockout** – Active `/goal` loops block all user input including cancel commands (#7181). No workaround yet besides Ctrl+C (which kills the session).
- **Memory and configuration bugs** – `enableManagedAutoMemory` setting ignored, wasting context ([#6936](https://github.com/QwenLM/qwen-code/issues/6936)). Stale cache and undocumented non‑serializable configs cause unpredictable behavior.
- **Upgrade breakage** – Several issues report breaking changes between patch versions (e.g., download spinner, startup warnings lost in stream‑json mode [#7158](https://github.com/QwenLM/qwen-code/issues/7158)).

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar).*