# AI CLI Tools Community Digest 2026-08-14

> Generated: 2026-08-14 01:40 UTC | Tools covered: 7

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

# AI CLI Tools Cross-Tool Comparison Report — 2026-08-14

## 1. Ecosystem Overview

The AI CLI developer tool ecosystem is undergoing rapid maturation, with all major tools shipping multiple releases within 24 hours and converging on multi-agent orchestration, subagent reliability, and cross-session workflows. Reliability dominates community discourse: every tool faces a cluster of regressions around messaging, session persistence, and Windows-specific failures. Security hardening is accelerating — supply-chain fixes (Gemini CLI), auth enforcement (OpenCode), and OAuth robustness (Copilot CLI, Claude Code) signal enterprise adoption pressures. Cross-session orchestration has emerged as the defining feature battleground, with Claude Code, Qwen Code, and OpenAI Codex all investing heavily in fleet/coordination capabilities.

## 2. Activity Comparison

| Tool | Issues (active) | PRs (24h) | Releases (24h) | Notable Signal |
|---|---|---|---|---|
| Claude Code | 10 hot issues, 1 with 723 👍 | 2 (1 doc-only, 1 merged) | 2 (v2.1.231, v2.1.232) | Cross-session messaging regression family (10+ issues) |
| OpenAI Codex | 10 hot issues, top at 53 comments | 10 | 4 alphas (0.148.0-a.11–14) | Heavy PR velocity; Windows extension failures |
| Gemini CLI | 10 hot issues, top at 12 comments | 10 | 1 nightly (v0.56.0) | 2 security fixes (RCE, critical CVE); subagent false-success bug |
| Copilot CLI | 10 hot issues, top at 20 👍 | 1 (docs, closed) | 2 (v1.0.80-0/-1) | MCP OAuth cluster dominates triage; low PR velocity |
| Kimi Code | 3 hot issues | 0 | 0 | Silent ACP stream hangs; runaway generation (88k tokens) |
| OpenCode | 10 hot issues, top at 41 👍 | 10+ | 0 (V1 stable, V2 next) | V1/V2 coexistence danger; 3 security reports in 24h |
| Qwen Code | 10 hot issues, 1 P1 regression | 10 | 3 (stable+nightly+preview) | Fleet architecture converging; Windows paste regression |

## 3. Shared Feature Directions

**Multi-Agent Orchestration & Coordination** — Claude Code (subagent forking default, `@`-mentions), Qwen Code (`/coordinate`, fleet RFC #8718), OpenAI Codex (thread queue APIs, Multi-Agent V2), and Gemini CLI (subagent trajectory transparency) are all shipping or planning first-class multi-session coordination.

**Subagent Reliability** — Gemini CLI (false GOAL success, hangs), Qwen Code (background-agent recovery, activeWork tracking), Copilot CLI (model override ignored), and OpenAI Codex (model rejection for subagents) all show communities demanding trustworthy delegation.

**Session Persistence & Recovery** — Kimi Code (memory system, 38 comments), Copilot CLI (stop-button data loss, event storage exhaustion), Qwen Code (large restore timeouts), OpenCode (compaction transparency), and OpenAI Codex (compaction accumulation) reveal session durability as a cross-cutting concern.

**MCP Robustness** — OAuth regressions in Claude Code, Copilot CLI, and Qwen Code; per-server callback ports (OpenAI Codex); corrupt-config security fixes (Gemini CLI). Three tools independently addressed MCP reliability within one day.

**Config Parity Across Surfaces** — Claude Code (`/btw` in VS Code), Copilot CLI (custom agent model array, reasoning effort), Qwen Code (SDK/CLI permission-mode parity). Users demand identical behavior across CLI, extension, desktop, and SDK.

**Security Hardening** — Gemini CLI (supply-chain RCE fix, critical CVE upgrade), OpenCode (3 security advisories), Qwen Code (privacy-safe diagnostics). Security is becoming a release-blocking priority.

## 4. Differentiation Analysis

| Tool | Target User | Technical Approach | Distinctive Focus |
|---|---|---|---|
| **Claude Code** | Power users, enterprise | Desktop-first, TUI + VS Code; session-to-session `@`-mentions | Cross-session orchestration as a product pillar; mature CLI UX |
| **OpenAI Codex** | Developers on OpenAI models | Rust core; aggressive alpha cadence; deep IDE integration | Provider extensibility (Bedrock PR, custom providers); multi-agent V2 |
| **Gemini CLI** | Google ecosystem, eval-driven teams | Behavioral eval infrastructure; nightly releases | Reliability via eval scale (76 tests, 6 model variants); security-first posture |
| **Copilot CLI** | GitHub/VS Code ecosystem | Tight GitHub integration; AHP shared sessions | MCP server lifecycle management; vendor-neutral model routing |
| **Kimi Code** | Chinese-market developers, ACP users | Minimalist; ACP mode for scripting | Lightweight; lacks multi-agent or memory features — community demand is raw |
| **OpenCode** | OSS purists, self-hosters | Node-based; V1/V2 split with migration friction | Radical UI iteration; community-driven (kitlangton cleanup series) |
| **Qwen Code** | Chinese ecosystem, cloud (Vertex) users | Fleet/daemon architecture; web-shell; Tauri desktop | Multi-agent fleet with persistence/recovery; strong headless/CI focus |

**Technical approach divergences:** Claude Code and Qwen Code push session-to-session messaging as first-class features; OpenAI Codex favors thread queues and server-side APIs; Gemini CLI bets on eval-driven reliability; OpenCode sacrifices backward compatibility for V2 UI gains.

## 5. Community Momentum & Maturity

**Highest velocity:** OpenAI Codex (10 PRs, 4 releases in 24h) is shipping fastest — alpha-heavy cadence indicates aggressive feature iteration. Qwen Code (10 PRs, 3 releases) is close behind, with fleet architecture converging in real time.

**Most mature community discourse:** Claude Code has the highest sustained demand signal (723 👍 on multi-account profiles; oldest issue in top 30) — a sign of a large, engaged user base with established workflows. Gemini CLI shows a disciplined, security-conscious maintainer response (2 critical security fixes in 24h with proper workflow redesigns).

**Emerging/fragile:** Kimi Code shows minimal activity (0 PRs, 3 issues) — lowest community engagement and slowest iteration. OpenCode has high issue volume but its V1/V2 split creates dangerous coexistence failures (#42260) — a potential churn risk for production users.

**Common pattern:** All tools except Kimi Code ship multiple releases daily — the ecosystem-wide baseline for iteration speed is now measured in hours, not weeks. Communities expect nightly-ish cadence and file regressions immediately when auto-updates land (Claude Code 2.1.227 regression family is the clearest example).

## 6. Trend Signals

1. **Cross-session messaging is the new frontier — and the new regression source.** Claude Code's `send_message` family (10+ issues), Copilot CLI's session data loss, and Qwen Code's daemon turn-status APIs all point to multi-session workflows becoming table stakes. Expect toolmakers to invest heavily in delivery guarantees, expiration notifications, and failure visibility.

2. **Windows support is the weakest link across the ecosystem.** Every tool with Windows Desktop or CLI surfaces reports regressions: paste failures (Qwen Code), MSIX integrity (Claude Code), resource-load failures (OpenAI Codex), process leaks (Copilot CLI), sandbox resolution (OpenAI Codex). "Works on macOS, broken on Windows" remains the industry's most common defect pattern.

3. **Subagent trust is the adoption bottleneck for multi-agent features.** False-success reports (Gemini CLI), hangs, silent model overrides (Copilot CLI), and context loss in `/bug` reports (Gemini) all erode confidence. Tools that ship transparent subagent telemetry and honest failure signals will win automation-heavy users.

4. **Context compaction needs transparency.** OpenCode's security advisory (#42437), Claude Code's double-counting (#82863), and OpenAI Codex's compaction bloat (#38466) form a cluster: users demand visibility into what is pruned, when, and why — plus explicit warnings when instruction-bearing content is dropped.

5. **Security is a release-blocking concern, not an afterthought.** Gemini CLI's RCE fix (workflow redesign), OpenCode's upgrade integrity, Copilot CLI's OAuth scope mishandling, and Claude Code's OTLP token gaps show that auth, supply-chain, and telemetry security are now first-class community expectations — especially at enterprise scale.

6. **Config parity is a trust issue.** Permission-rule inconsistency (`allowed_directories` ignored), SDK/CLI validation mismatches (Qwen Code), and model-override silent fallbacks (Copilot CLI) all signal that users treat configuration as a contract. Silent drift from that contract is reported as a data-integrity or trust bug, not a minor annoyance.

7. **Behavioral eval infrastructure is becoming a competitive moat.** Gemini CLI's eval EPIC and OpenAI Codex's Guardian V2 context work suggest that reliability is increasingly enforced by automated test suites, not manual triage. Tools without eval infrastructure (Kimi Code, Copilot CLI's low PR velocity) will struggle to keep pace on quality.

**Recommendation for developers:** When selecting an AI CLI tool, weigh cross-session reliability and subagent transparency over feature breadth. The current landscape rewards tools with explicit failure signals (Gemini CLI's eval discipline, Qwen Code's daemon turn-status), while punishing silent failure patterns (Claude Code's `send_message` regressions, Kimi Code's ACP hangs) regardless of feature surface.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report
*Data snapshot: 2026-08-14*

---

## 1. Top Skills Ranking

| # | Skill / PR | Functionality | Discussion Highlights | Status |
|---|-----------|---------------|----------------------|--------|
| 1 | **[skill-creator eval fixes](https://github.com/anthropics/skills/pull/1298)** | Fixes `run_eval.py` reporting 0% recall on all evaluations — installs eval artifact as a real skill, fixes Windows stream reading, trigger detection, and parallel workers | Ties together 10+ independent reproductions of Issue #556; the description-optimization loop is "optimizing against noise." Highest-priority infrastructure fix in the ecosystem. | Open |
| 2 | **[document-typography](https://github.com/anthropics/skills/pull/514)** | Typographic quality control for generated documents: orphan word wrap (1–6 words on a new line), widow paragraphs (stranded headers), numbering misalignment | Community identified these as universal problems in AI-generated output; "every document Claude generates" is affected. Strong cross-domain applicability. | Open |
| 3 | **[self-audit](https://github.com/anthropics/skills/pull/1367)** | Mechanical file verification (Step 0) + four-dimension reasoning audit in damage-severity priority order; universal across projects/stacks/models | The most actively developed meta-skill; author also filed companion proposal (Issue #1385) for a three-gate "Reasoning Quality Gate Pipeline." Fast iteration (v1.3.0 within days). | Open |
| 4 | **[ServiceNow platform](https://github.com/anthropics/skills/pull/568)** | Broad ServiceNow assistant covering ITSM, ITOM, ITAM/SAM, FSM, HRSD/CSM, SPM/PPM, vulnerability & security incident response, IntegrationHub | Long-lived PR (5+ months) representing the largest enterprise-platform skill submission; covers full platform breadth rather than narrow scripting. | Open |
| 5 | **[testing-patterns](https://github.com/anthropics/skills/pull/723)** | Full testing stack: Testing Trophy philosophy, unit testing (AAA, naming, edge cases), React Testing Library, what-to-test vs. what-not-to-test | Fills a gap where test-generation skills exist but comprehensive testing-strategy guidance does not. | Open |
| 6 | **[pyxel (retro games)](https://github.com/anthropics/skills/pull/525)** | MCP server for Pyxel retro/pixel-art/8-bit game engine; write → run_and_capture → inspect → iterate workflow | Notable example of an MCP-paired skill; shows demand for engine-specific creative coding skills. | Open |
| 7 | **[SAP-RPT-1-OSS predictor](https://github.com/anthropics/skills/pull/181)** | Predictive analytics on SAP business data using SAP's open-source tabular foundation model (Apache 2.0, released TechEd 2025) | First enterprise-data-science foundation-model skill; represents a new category of model-mediated skills. | Open |
| 8 | **[ODT skill](https://github.com/anthropics/skills/pull/486)** | OpenDocument text creation, template filling, and ODT→HTML parsing (.odt, .ods, LibreOffice triggers) | Companion to the existing docx/pdf skills; community demand for full office-format coverage. | Open |

---

## 2. Community Demand Trends

**Highest-signal issues:**

- **[Trust boundary abuse (Issue #492 — 43 comments)](https://github.com/anthropics/skills/issues/492)** — Community skills distributed under the `anthropic/` namespace impersonate official Anthropic skills, creating a vulnerability where users grant elevated permissions believing they are official. **This is the #1 concern: security and trust in the skill distribution model.**
- **[Org-wide skill sharing (Issue #228 — 16 comments, 8👍)](https://github.com/anthropics/skills/issues/228)** — Users want direct organizational sharing; currently they must download `.skill` files and manually upload via Settings > Capabilities. Requests a shared skill library or direct sharing link.
- **[run_eval.py trigger failure (Issue #556 — 12 comments, 7👍)](https://github.com/anthropics/skills/issues/556)** — `claude -p` never triggers skills/commands (0% trigger rate across all queries); the core eval tooling is broken on Windows and generally unreliable. The most-upvoted bug; spawned 3+ parallel fix PRs (#1298, #1099, #1050).
- **[Duplicate skills across plugins (Issue #189 — 6 comments, 9👍)](https://github.com/anthropics/skills/issues/189)** — `document-skills` and `example-skills` plugins contain identical content, doubling context-window usage.
- **[Context-window exhaustion (Issue #1487)](https://github.com/anthropics/skills/issues/1487)** — `claude-api` skill eagerly injects ~156k tokens in a single tool call, exhausting context. Points to a broader need: **skills must respect context budgets.**

**Trend synthesis:** The community's top unmet needs are (1) **secure/distributed skill management** (trust verification, org-wide sharing), (2) **reliable skill-development tooling** (working eval loops), and (3) **context-window efficiency** (no duplicate or over-eager injections).

---

## 3. High-Potential Pending Skills

These PRs have active discussion and are not yet merged — likely to land soon:

- **[Self-audit (PR #1367)](https://github.com/anthropics/skills/pull/1367)** — Most active development; the author is also driving the complementary reasoning-gate proposal (Issue #1385). Expect merge within weeks.
- **[ServiceNow platform (PR #568)](https://github.com/anthropics/skills/pull/568)** — Long-lived; updated as recently as 2026-08-12; the breadth suggests maintainer review is the bottleneck.
- **[Testing-patterns (PR #723)](https://github.com/anthropics/skills/pull/723)** — Addresses a clear goldmine gap; active through 2026-04-21.
- **[document-typography (PR #514)](https://github.com/anthropics/skills/pull/514)** — Small, self-contained, universal in value; touches every AI-generated document use case.
- **[Plan-file-hygiene (PR #1479)](https://github.com/anthropics/skills/pull/1479)** — Addresses planning-artifact lifecycle accumulation (Issue #1417); a maintenance-level skill with strong community framing support.

---

## 4. Skills Ecosystem Insight

**The community's most concentrated demand is for a trusted, well-tooled skill-development pipeline** — secure distribution under verified namespaces, working evaluation tooling (the recall=0% bug is the single largest blocker), and context-window discipline — rather than for any single domain-specific skill.

---

**Claude Code Community Digest — 2026-08-14**

---

## 1. Today's Highlights

New releases v2.1.231 and v2.1.232 landed, with the latter enabling subagent forking by default and introducing session-to-session mentions via `@`. The community is dominated by a wave of critical Windows Desktop regressions around cross-session messaging (`send_message`) introduced in runtime 2.1.227 — messages report success but are never delivered, hang at 0 tokens, or get silently dropped after a 5-minute approval timeout. Reports indicate the issue persists in 2.1.231 despite the fix attempt in 2.1.231 for a separate MCP OAuth redirect bug.

---

## 2. Releases

**v2.1.232** — [Release](https://github.com/anthropics/claude-code/releases/tag/v2.1.232)
- Subagent forking is now enabled by default. `subagent_type: "fork"` inherits the full conversation history and prompt cache.
- Non-teammate agent spawns in interactive sessions now run in the background by default.
- New capability: type `@` in the prompt to mention and reference another Claude session by name.

**v2.1.231** — [Release](https://github.com/anthropics/claude-code/releases/tag/v2.1.231)
- Fixed MCP OAuth sign-in failing with a redirect URI mismatch for servers using a pre-registered OAuth client (e.g., Slack).

---

## 3. Hot Issues

1. **[#18435](https://github.com/anthropics/claude-code/issues/18435) — Multi-account profile management (165 comments, 723 👍)**
   Highly requested enhancement for the Desktop app: manage multiple Claude accounts with easy profile switching. The oldest issue in the top 30 and by far the most-upvoted, indicating sustained community demand.

2. **[#84352](https://github.com/anthropics/claude-code/issues/84352) — Cyber-safeguard blocks on approved organizations (94 comments)**
   A CVP-approved org is still getting blocked; the Verification Portal shows the application as "Under review" despite prior approval. High friction for enterprise users.

3. **[#37323](https://github.com/anthropics/claude-code/issues/37323) — `/btw` command parity in VS Code (36 comments, 164 👍)**
   The popular terminal CLI command is missing from the VS Code extension. Users want parity for quick off-topic questions that don't require persistent state.

4. **[#85603](https://github.com/anthropics/claude-code/issues/85603) — Typed input silently dropped at turn end (22 comments)**
   In the interactive TUI, keystrokes made while a turn is running are lost without any error or escape-key interaction. Deterministic in tmux on macOS.

5. **[#86012](https://github.com/anthropics/claude-code/issues/86012) — Cross-session messages leave recipient unresponsive (15 comments)**
   Desktop app: after receiving a cross-session message, the target session hangs with `hadFirstResponse=false` until the 15–20 min idle timeout force-kills it.

6. **[#82092](https://github.com/anthropics/claude-code/issues/82092) — OTLP telemetry rejected with `missing_token` (10 comments)**
   Apps gateway serves an `otlpEndpoint` pointing to its own bearer-gated ingest but omits `otlpHeaders`, so every Desktop telemetry flush fails.

7. **[#86275](https://github.com/anthropics/claude-code/issues/86275) — Cross-session `send_message` silently fails on Windows (8 comments)**
   After auto-update 2.1.222→2.1.227, `send_message` reports success but never delivers. Regression confirmed by multiple reporters.

8. **[#78338](https://github.com/anthropics/claude-code/issues/78338) — Background agents drop queued SendMessages on Linux (8 comments)**
   Background agents miss queued messages and skip completion notifications. Investigated and written up by Claude itself, which adds credibility and context.

9. **[#86138](https://github.com/anthropics/claude-code/issues/86138) — Messages to paused sessions never delivered (7 comments)**
   Windows Desktop 2.1.227: sending to a paused session returns success, the session resumes, but the model never sees the message — a "permanent phantom turn."

10. **[#82863](https://github.com/anthropics/claude-code/issues/82863) — Auto-compact double-counts usage (1 comment, 1 👍)**
    Compact fired with `preTokens: 1,364,156` on a 1M window when real context was ~335K. Regression in usage accounting that wastes context and user tokens.

---

## 4. Key PR Progress

Only two PRs were updated in the last 24 hours, one of which is documentation-only:

1. **[#86537](https://github.com/anthropics/claude-code/pull/86537) — Fix duplicated word in CHANGELOG.md (OPEN)**
   Documentation-only fix: removes "to to" from the `CLAUDE_BASH_NO_LOGIN` entry. Minor, but keeps changelog professional.

2. **[#60280](https://github.com/anthropics/claude-code/pull/60280) — SHA-pin CI actions (CLOSED, merged)**
   Supply-chain hardening: SHA-pins `actions/checkout@v4` and `actions/github-script` across 6 workflows (`auto-close-duplicates`, `backfill-duplicate-comments`, `claude-dedupe-issues`, `claude-issue-triage`, and others). Follow-up to the earlier pinning pass in #56784.

> Note: No new feature or bugfix PRs were merged or updated in the last 24 hours — the release cadence (v2.1.231 and v2.1.232) appears to be the primary delivery vehicle this cycle.

---

## 5. Feature Request Trends

- **Multi-account switching (Desktop)**: Strong demand for managing multiple Claude accounts with easy profile switching — the top-voted issue across all open items.

- **CLI / Extension feature parity**: `/btw` command in VS Code is a concrete example; the broader trend is "every terminal feature should exist in the extension."

- **Cross-session orchestration**: Users are actively building multi-session workflows (15–25 concurrent sessions coordinating via `ccd_session_mgmt`) — they want this path to be a first-class, reliable feature, not a fragile edge case.

- **Configurable background git operations**: Users want to disable or trace the unrequested `git fetch` in the Desktop app on diff/commit refresh — a control/privacy preference.

- **Session lifecycle notifications**: Multiple issues ask for explicit notification to the sender or receiver when a cross-session message expires or is abandoned, rather than silent failure.

---

## 6. Developer Pain Points

- **Cross-session messaging reliability (Windows Desktop)**: The dominant theme — at least 10 open issues describe the same regression family since 2.1.227: `send_message` returns success but messages are never delivered, hang at 0 tokens, get dropped after a 5-minute approval timeout, or wedge the session into a phantom turn. Confirmed still broken in 2.1.231 by [#86385](https://github.com/anthropics/claude-code/issues/86385) and [#86398](https://github.com/anthropics/claude-code/issues/86398).

- **Silent data loss in the TUI**: Typed input dropped at turn end (`#85603`) and rows repainted without erase-to-end-of-line destroying output (`#84297`) — both erode trust in the terminal UI.

- **Spurious auto-compact**: The `advisor` tool and double-counted usage inflate the context meter, triggering premature compaction and wasting tokens on 1M-window models (`#82863`, `#81029`).

- **Permission rules ignored**: `permissions.allow` rules for MCP tools (notably `mcp__claude-in-chrome__*`) are ignored, causing re-prompts on every action (`#80658`).

- **MSIX package integrity**: The Windows Desktop MSIX package reverts to "Modified/NeedsRemediation" minutes after a clean install, and `Repair` is impossible due to `CoworkVMService` (`#85887`).

- **Session wedging after `/compact`**: Manual compaction in the Desktop app deterministically wedges the session on macOS (`#74017`) — a long-standing issue still open after 6+ weeks.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-08-14

## Today's Highlights

A dense day of infrastructure work: multiple alpha releases shipped (0.148.0-alpha.11 through .14), with PRs landing for Amazon Bedrock Runtime provider support, experimental thread queue APIs, and Guardian V2 tool-action context. Windows stability issues continue to dominate the issue tracker, with resource-load failures in the VS Code extension and sandbox helper resolution problems remaining top community concerns.

## Releases

Four Rust alpha releases published in the last 24 hours:
- **rust-v0.148.0-alpha.11** — [Release](https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.11)
- **rust-v0.148.0-alpha.12** — [Release](https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.12)
- **rust-v0.148.0-alpha.13** — [Release](https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.13)
- **rust-v0.148.0-alpha.14** — [Release](https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.14)

No per-release changelog details were provided beyond version increments.

## Hot Issues

1. **[#37458](https://github.com/openai/codex/issues/37458) — Codex extension fails to start: "The extension couldn't load its resources"** (CLOSED, 53 comments, 11 👍)  
   The most active issue this cycle. Windows VS Code users report the Codex panel failing to initialize entirely. Community comments suggest it surfaced after the 26.803.x extension update. Marked closed, but the three related resource-loading issues below suggest the root cause may still be spreading.

2. **[#26984](https://github.com/openai/codex/issues/26984) — MCP stdio servers leak pipe fds + orphan child processes → cumulative EMFILE** (OPEN, 21 comments, 4 👍)  
   Long-running CLI sessions eventually hit "Too many open files." Reproduced across multiple versions since 0.12x. A serious reliability bug for power users running many MCP servers.

3. **[#37403](https://github.com/openai/codex/issues/37403) — Desktop cannot resume Remote Control / CLI thread: `already has an active writer`** (OPEN, 19 comments, 11 👍)  
   macOS regression after the August 7 desktop update. Breaks the mobile-remote-to-desktop workflow for continuing CLI threads. High visibility with 11 upvotes.

4. **[#34700](https://github.com/openai/codex/issues/34700) — spawn_agent rejects gpt-5.6-luna with multi_agent_v2 enabled** (OPEN, 15 comments, 36 👍)  
   The most-upvoted open issue today. Windows App 26.715.9868.0 / CLI 0.145.0 cannot use `gpt-5.6-luna` as a subagent when multi-agent V2 is enabled. 36 upvotes indicates broad interest in the new model for subagent workflows.

5. **[#31553](https://github.com/openai/codex/issues/31553) — VS Code extension stopped auto-including IDE context after update** (CLOSED, 17 comments, 12 👍)  
   Affected remote/container setups on Windows. IDE context silently stopped attaching. Closed, but related to a cluster of similar reports (see #34920, #34696, #35333) about IDE context breaking across extension versions.

6. **[#18906](https://github.com/openai/codex/issues/18906) — TUI: support Markdown math rendering for inline and block LaTeX** (OPEN, 15 comments, 22 👍)  
   Long-standing feature request (since April). Terminal UI cannot render LaTeX math, which hampers documentation and academic workflows. Consistent community traction with 22 upvotes.

7. **[#26990](https://github.com/openai/codex/issues/26990) — Windows Desktop local state not crash-safe after power loss** (OPEN, 15 comments)  
   Pins, projects, and config regress to earlier states after unexpected shutdown; future timestamps observed. Data-integrity concern for desktop users.

8. **[#38466](https://github.com/openai/codex/issues/38466) — Long-running Desktop session becomes huge after repeated compaction; thread read output truncated** (OPEN, 3 comments, filed today)  
   Fresh report: repeated context compaction leaves a rollout history too large for the client to read back, making the thread hard to inspect or resume. Complements the earlier 145GiB log report (#31198).

9. **[#38455](https://github.com/openai/codex/issues/38455) — ChatGPT desktop repeatedly spawns Computer Use workers and crashes with V8 OOM on macOS** (OPEN, 3 comments, filed yesterday)  
   The app crashes ~98 seconds after launch while idle, spawning 187 `computer-use` threads. Previous version worked; 26.810.41047 introduced the regression.

10. **[#33551](https://github.com/openai/codex/issues/33551) — Multi-Agent V2 sends OpenAI-specific agent_message items to external Responses providers** (OPEN, 8 comments, 6 👍)  
   Interoperability bug: custom-model users (e.g., Ollama) cannot parse child-agent instructions because they are sent as encrypted OpenAI-specific item types. Matters for the growing custom-provider community.

## Key PR Progress

1. **[#38470](https://github.com/openai/codex/pull/38470) — Add an Amazon Bedrock Runtime provider**  
   New built-in `amazon-bedrock-runtime` provider for regional OpenAI-compatible endpoints, with SigV4 service configuration while preserving bearer token auth and per-provider AWS profiles.

2. **[#38467](https://github.com/openai/codex/pull/38467) — Parse model annotations from skill frontmatter**  
   Adds optional `model` field to skill metadata; recognizes `model: luna` while ignoring unsupported values without blocking the rest of the metadata from loading.

3. **[#38463](https://github.com/openai/codex/pull/38463) — Preserve thread subscriptions across revert reloads**  
   Fixes a race where the connection requesting `thread/revert` closes mid-reload, dropping the replacement listener needed to serve existing subscriptions.

4. **[#38461](https://github.com/openai/codex/pull/38461) — Centralize turn environment selection state**  
   Stores `TurnEnvironmentSelection` directly on each resolved `TurnEnvironment` instead of copying environment ID, working directory, and workspace roots into separate fields — reduces drift across environment resolution and tool execution.

5. **[#38456](https://github.com/openai/codex/pull/38456) — Add experimental thread queue APIs to app server**  
   New `thread/queue/add`, `list`, `update`, `delete`, `reorder`, and `start` requests for persistent queued submissions; auto-dispatch in FIFO order after completed or failed turns.

6. **[#38448](https://github.com/openai/codex/pull/38448) — Support per-server MCP OAuth callback ports**  
   Adds `oauth.callback_port` to MCP server configuration, accepted from plugin declarations and skill dependency metadata — resolves conflicts when multiple MCP servers need distinct callback ports.

7. **[#38447](https://github.com/openai/codex/pull/38447) — Add running-task exit choices to local daemon sessions**  
   Ctrl-C during a running task now shows a menu: cancel the task and stay, exit while leaving the task running, or stop the daemon. Addresses a common UX pain point.

8. **[#38446](https://github.com/openai/codex/pull/38446) — Refresh current-time reminders for full-history subagents**  
   Excludes inherited current-time reminder messages when copying parent history into a subagent, preventing accumulation of stale reminders.

9. **[#38445](https://github.com/openai/codex/pull/38445) — Retain client developer messages across context compaction**  
   Preserves annotated client-authored developer instructions after compaction when `retain_client_developer_messages` is enabled.

10. **[#38441](https://github.com/openai/codex/pull/38441) — Give Guardian V2 full tool action context**  
    Exposes the original pre-hook `ToolPayload` to tool lifecycle contributors so risk assessment includes the requested action and conversation context, not just tool name and call ID.

## Feature Request Trends

- **Model flexibility:** Strong demand for using the newest models (notably `gpt-5.6-luna`) as subagents across platforms. The 36-upvote issue #34700 and related #38107 show users want parity between standalone CLI, VS Code extension, and desktop app.
- **External provider interoperability:** Multiple issues (#33551, Bedrock PR) point to a growing community using Codex with non-OpenAI providers. Users expect the multi-agent protocol to degrade gracefully rather than send OpenAI-specific payloads.
- **Session robustness at scale:** Multiple reports (#38466, #31198, #26990) show long-running sessions degrade: compaction accumulates, logs explode to 145GiB, and state is lost after power failures. Users want durable, inspectable sessions.
- **Context awareness in IDE:** A cluster of closed issues (#34920, #34696, #35333, #31553) all trace to IDE context silently breaking across extension versions. The community is clearly relying on this feature heavily and notices immediately when it regresses.
- **Terminal UX improvements:** Continued interest in Markdown/LaTeX rendering in TUI (#18906) and background service monitoring (#2062) — quality-of-life features that make the terminal a more complete workspace.

## Developer Pain Points

- **Windows-specific instability remains the #1 pain point.** Extension resource-load failures (#37458, #37517, #37508), sandbox helper resolution failures (#30829, #28457), WSL2 issues (#35419, #30435), and approval-policy violations (#24934) dominate the tracker. Windows users are repeatedly hitting "works on macOS, broken on Windows" bugs.
- **IDE context reliability is fragile.** Five separate issues across the last month all describe IDE context silently disabling or failing to attach after updates. Each got closed, and each seems to resurface in a new form — a frustrating whack-a-mole pattern for users.
- **Multi-agent configurations are brittle.** Between model rejection, provider incompatibility, thread-limit miscounting (#22779), and stale subagent states after restart (#38408), users running multi-agent workflows face a gauntlet of edge cases.
- **Context compaction is not transparent.** Users report bloated logs, truncated reads, and lost developer messages after compaction. The PRs addressing these (#38445, #38446, #38463) suggest the team is aware, but the issue list shows the scars are fresh.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-08-14

## Today's Highlights
The project shipped a new nightly release (v0.56.0-nightly.20260814) featuring context-aware silent retries for capacity errors and stabilized E2E tests for slow runners. A critical supply chain security fix landed in PR #28740, preventing RCE in eval-pr workflows via untrusted fork code — a significant hardening measure. Meanwhile, the community continues to flag subagent reliability issues, with top-voted bugs around generalist agent hangs and false success reports when subagents hit turn limits.

---

## Releases
**v0.56.0-nightly.20260814.gc0d192452**

- **test(e2e):** Stabilize `file-system-interactive` test on slow runners (@DavidAPierce, [#28793](https://github.com/google-gemini/gemini-cli/pull/28793))
- **fix(core):** Implement context-aware silent retries and availability TTL for capacity errors, addressing the critical regression from [#28761](https://github.com/google-gemini/gemini-cli/issues/28761) (@DavidAPierce, [#28790](https://github.com/google-gemini/gemini-cli/pull/28790))

---

## Hot Issues

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) — Subagent recovery after MAX_TURNS reported as GOAL success** *(p1, bug)*  
   `codebase_investigator` reports `status: "success"` despite hitting the max turn limit before any analysis. Community strongly supports this fix (12 comments); misleading success signals erode trust in automation.

2. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409) — Generalist agent hangs** *(p1, bug, 👍8)*  
   Simple operations (e.g., folder creation) trigger indefinite hangs when delegating to the generalist agent. Workaround exists (disable subagents), but this remains a top community pain point.

3. **[#25166](https://github.com/google-gemini/gemini-cli/issues/25166) — Shell command stuck with "Waiting input" after completion** *(p1, core, 👍3)*  
   Even trivial commands hang and display "Awaiting user input" after finishing. Affects interactive workflows and is part of the broader hang cluster.

4. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873) — Zero-Dependency OS Sandboxing & Post-Execution Intent Routing** *(p2, enhancement)*  
   Proposes leveraging Gemini 3's native bash affinity with safe sandboxing, letting the model run POSIX chains securely instead of using higher-level tools. Active design discussion.

5. **[#24353](https://github.com/google-gemini/gemini-cli/issues/24353) — Robust component-level evaluations** *(p1, EPIC)*  
   Tracks scaling behavioral eval tests (76 so far) with proper infrastructure for 6 Gemini model variants — directly influences reliability improvements across the board.

6. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968) — Gemini doesn't use skills and sub-agents enough** *(p2, bug)*  
   Anecdotal but widely echoed: custom skills (e.g., `gradle`, `git`) are not proactively invoked. Only explicit instruction triggers their use, limiting agent autonomy.

7. **[#26522](https://github.com/google-gemini/gemini-cli/issues/26522) — Auto Memory retries low-signal sessions indefinitely** *(p2, bug)*  
   Sessions only marked processed when `read_file` succeeds; low-signal sessions rejected by the extractor are repeatedly re-surfaced, wasting tokens and time.

8. **[#26525](https://github.com/google-gemini/gemini-cli/issues/26525) — Deterministic redaction and reduce Auto Memory logging** *(p2, security)*  
   Auto Memory sends transcript content to extraction model before redaction; secrets already in context. Community expects secret stripping before external calls, not after.

9. **[#22232](https://github.com/google-gemini/gemini-cli/issues/22232) — Browser agent resilience: session takeover and lock recovery** *(p3, feature)*  
   Request for graceful recovery instead of "fail-fast" when browser profiles are locked (e.g., orphaned processes). Relevant to persistent-session users.

10. **[#21763](https://github.com/google-gemini/gemini-cli/issues/21763) — Bugreport lacks subagent context** *(p1, bug)*  
   `/bug` reports only capture main-session context; subagent internals are missing — making debugging of agent failures significantly harder.

---

## Key PR Progress

1. **[#28740](https://github.com/google-gemini/gemini-cli/pull/28740) — Fix supply chain RCE in eval-pr workflows** *(security, size/l)*  
   Critical fix for [#28336](https://github.com/google-gemini/gemini-cli/issues/28336): untrusted fork PRs could execute code in `pull_request_target` context with elevated privileges. Splits the workflow into a secure build step plus a trusted `workflow_run` execution step.

2. **[#28790](https://github.com/google-gemini/gemini-cli/pull/28790) — Context-aware silent retries & availability TTL for capacity errors** *(p1, closed)*  
   Addresses the critical capacity-exhaustion retry regression from [#28761](https://github.com/google-gemini/gemini-cli/issues/28761). Adds up to 2 silent retries with backoff for unattended/non-interactive runs; includes TTL for capacity availability tracking.

3. **[#28778](https://github.com/google-gemini/gemini-cli/pull/28778) — Upgrade simple-git to 3.32.3 (CVE-2026-28292)** *(security)*  
   Fixes a **CRITICAL** vulnerability found by Trivy in `simple-git` — a dependency used for git operations throughout the CLI.

4. **[#28789](https://github.com/google-gemini/gemini-cli/pull/28789) — Fix vscode-ide-companion stop() hang and keep-alive failure threshold** *(core, size/m-xl)*  
   Resolves [#28785](https://github.com/google-gemini/gemini-cli/issues/28785): `IdeServer.stop()` hangs on open MCP streaming sessions, and keep-alive pings leak resources on intermittent failures. Both bugs fixed in one PR.

5. **[#28787](https://github.com/google-gemini/gemini-cli/pull/28787) — Don't treat corrupt MCP enablement config as empty** *(p1, core)*  
   JSON parse failures in MCP enablement config were silently collapsing to `{}`, defaulting *all* MCP servers to enabled — a security issue now correctly surfaced as an error.

6. **[#28792](https://github.com/google-gemini/gemini-cli/pull/28792) — Normalize git environment and resolve workspace state mismatch** *(core, closed)*  
   Standardizes environment variables for git subprocesses and fixes workspace-trust state initialization; ensures predictable non-interactive git execution.

7. **[#28793](https://github.com/google-gemini/gemini-cli/pull/28793) — Stabilize file-system-interactive E2E test on slow runners** *(test, xs)*  
   Adds prompt synchronization and expected-text assertions; also shipped in today's nightly. Reduces flakiness on slow Windows and virtualized runners.

8. **[#28788](https://github.com/google-gemini/gemini-cli/pull/28788) — Behavioral evals for skills activation and web_fetch** *(size/l)*  
   Adds `activate_skill`, `web_fetch` behavioral evals; improves Windows compatibility of the local eval environment and fixes EDK report aggregation (skipped tests no longer counted as failures).

9. **[#28699](https://github.com/google-gemini/gemini-cli/pull/28699) — Enforce auth on A2A server and stop checkpoint path traversal** *(security, size/l)*  
   Custom A2A REST routes (`/tasks`, `/executeCommand`) bypassed `UserBuilder` credential checks entirely. Also fixes a path traversal risk in checkpoint handling. Two security issues in one PR.

10. **[#28624](https://github.com/google-gemini/gemini-cli/pull/28624) — Prevent boolean thought parts leaking as `[Thought: true]` text** *(agent, closed)*  
    Minor but persistent cosmetic bug: internal boolean thoughts were leaking into rendered text. Fixes [#23525](https://github.com/google-gemini/gemini-cli/issues/23525) by guarding the `toPart` converter check.

---

## Feature Request Trends

- **Behavioral Eval Infrastructure Expansion** — Multiple PRs ([#28804](https://github.com/google-gemini/gemini-cli/pull/28804), [#28788](https://github.com/google-gemini/gemini-cli/pull/28788)) extend the eval suite to new tools; the main EPIC ([#24353](https://github.com/google-gemini/gemini-cli/issues/24353)) confirms this is an active strategic direction.

- **AST-Aware Codebase Navigation** — Dual EPICs ([#22745](https://github.com/google-gemini/gemini-cli/issues/22745), [#22746](https://github.com/google-gemini/gemini-cli/issues/22746)) investigate AST-aware file reads, search/mapping, and potential CLI tools (`tilth`, `glyph`) to replace blunt `grep`/`sed` flows.

- **Secure Native Bash Mode** — [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) proposes sandboxed zero-dependency POSIX execution, aligning with model training strengths instead of forcing tool abstractions.

- **Agent Self-Awareness** — [#21432](https://github.com/google-gemini/gemini-cli/issues/21432) requests the agent accurately describe its own CLI flags, hotkeys, and execution mechanics, acting as its own expert guide.

- **Subagent Trajectory Transparency** — [#22598](https://github.com/google-gemini/gemini-cli/issues/22598) asks for subagent trajectories to be visible via `/chat share`; [#21763](https://github.com/google-gemini/gemini-cli/issues/21763) wants `/bug` reports to include subagent context.

---

## Developer Pain Points

- **Subagent reliability is the #1 blocker.** Hangs ([#21409](https://github.com/google-gemini/gemini-cli/issues/21409)), false GOAL success after MAX_TURNS ([#22323](https://github.com/google-gemini/gemini-cli/issues/22323)), and ignoring config overrides ([#22267](https://github.com/google-gemini/gemini-cli/issues/22267)) all erode developer trust in delegation.

- **Silent privilege escalation and config drift.** Subagents run despite "disabled" settings ([#22093](https://github.com/google-gemini/gemini-cli/issues/22093)), and corrupt MCP configs default to *enabled* ([#28787](https://github.com/google-gemini/gemini-cli/pull/28787)) — both violate expectations of least privilege.

- **Security expectations are rising.** The community expects redaction *before* external calls ([#26525](https://github.com/google-gemini/gemini-cli/issues/26525)), auth on A2A routes ([#28699](https://github.com/google-gemini/gemini-cli/pull/28699)), and CI workflows immune to fork PR exploits ([#28740](https://github.com/google-gemini/gemini-cli/pull/28740)).

- **Long-tail shell and terminal bugs accumulate.** Hangs after command completion ([#25166](https://github.com/google-gemini/gemini-cli/issues/25166)), interactive prompt deadlocks ([#22465](https://github.com/google-gemini/gemini-cli/issues/22465)), and corrupt display after external editors ([#24935](https://github.com/google-gemini/gemini-cli/issues/24935)) suggest the execution layer needs a focused hardening pass.

- **Context loss in multi-agent workflows.** `/bug` reports missing subagent context ([#21763](https://github.com/google-gemini/gemini-cli/issues/21763)) and invisible error states inside agents make real-world debugging disproportionately expensive.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest
**2026-08-14**

---

## Today's Highlights

The latest release (v1.0.80) introduces `--enable-mcp-server` for re-enabling MCP servers disabled in settings, alongside new multi-client visibility in shared sessions. A significant cluster of new bug reports focuses on MCP OAuth regressions, model reasoning-effort mismatches, and session lifecycle issues that are dominating the maintainers' triage queue.

---

## Releases

**v1.0.80-0 / v1.0.80-1** ([changelog](https://github.com/github/copilot-cli/releases))

- **Added:** `--enable-mcp-server` flag to re-enable MCP servers disabled in settings for the current run.
- **Added:** Shared-session awareness — in `--ahp` mode, a session with other clients attached now displays `2 clients` (or more) in the Sessions tab.
- **Fixes:** General fixes and changes included in the patch release.

---

## Hot Issues

1. **[#2904 — Custom Agent Frontmatter Should Support Reasoning Effort](https://github.com/github/copilot-cli/issues/2904)** *(20 👍, 6 comments)*  
   Users want per-agent `effort` configuration rather than a global CLI flag. This is the highest-voted open feature request and has been open since April; a docs PR (#4476) proposing Option A was closed today, suggesting active discussion.

2. **[#4345 — Reasoning effort 'medium' not supported for claude-haiku-4.5](https://github.com/github/copilot-cli/issues/4345)** *(4 👍, closed)*  
   Sub-agent execution fails when feature flags route tasks to `claude-haiku-4.5` with a `medium` effort that the model doesn't support. A duplicate (#4473) was filed today, indicating the issue persists — likely a server-side flag interaction bug.

3. **[#2133 — Custom agent `model` field rejects array syntax](https://github.com/github/copilot-cli/issues/2133)** *(7 👍, 4 comments)*  
   VS Code Copilot Chat supports array syntax in `.agent.md` files; CLI throws a parse error. Long-standing incompatibility (open since March) with cross-product consistency implications.

4. **[#4480 — Atlassian MCP OAuth fails (regression in 1.0.79)](https://github.com/github/copilot-cli/issues/4480)**  
   OAuth discovery fails with issuer mismatch against `mcp.atlassian.com`. Severity: breaks remote MCP connectivity for a major vendor after a patch update.

5. **[#4464 — Entra OAuth silent refresh fails with scope mixing](https://github.com/github/copilot-cli/issues/4464)**  
   Refresh requests mix `.default` with resource-specific scopes, causing AADSTS70011 and forcing repeated interactive sign-ins every ~60–75 minutes. Root cause identified in the report; high impact for enterprise users.

6. **[#4462 — code-review subagent model override ignored](https://github.com/github/copilot-cli/issues/4462)**  
   Configured `gpt-5.6-luna` is silently replaced with `gpt-5.6-sol`. Agent model pinning reliability issue — undermines user trust in configuration.

7. **[#4477 — Session and prompt lost on stop button](https://github.com/github/copilot-cli/issues/4477)**  
   Hitting stop deletes the entire session, including the prompt and edits. Data-loss bug; likely to generate more reports.

8. **[#4482 — `allowed_directories` doesn't suppress path prompts](https://github.com/github/copilot-cli/issues/4482)**  
   Permissions-config directory allowlisting isn't honored for shell commands, despite being loaded at startup. `/add-dir` works around it — configuration inconsistency.

9. **[#4468 — `--server --stdio` leaks 4 extension-host processes per session](https://github.com/github/copilot-cli/issues/4468)**  
   Process leak in Windows server mode; child processes accumulate until the server exits. Filed by Copilot on behalf of a user — resource exhaustion over long sessions.

10. **[#4467 — Long-running sessions exhaust event storage, appear cancelled](https://github.com/github/copilot-cli/issues/4467)**  
    Remote session event store can be exhausted by many subagents, making sessions appear inactive despite CLI still running. Reliability concern for heavy automation use.

---

## Key PR Progress

Only one PR was updated in the last 24 hours; it is highlighted below.

1. **[#4476 — docs: document proposed custom-agent effort frontmatter (Option A)](https://github.com/github/copilot-cli/pull/4476)** *(Closed)*  
   Adds documentation for a dedicated `effort` frontmatter field (parallel to `model`) for custom agents, addressing #2904. Although closed, it signals ongoing design work on per-agent reasoning-effort configuration.

---

## Feature Request Trends

- **Per-Agent Reasoning Effort Control:** Multiple issues (#2904, #4345, #4473) point to a growing need for granular control over reasoning effort per custom agent rather than global flags — model-specific capability constraints are amplifying this demand.
- **Session Observability & Management:** Requests for listing running sessions with status (#4470), preserving sessions on stop (#4477), and restoring archived chats (#4474) reflect a broader push for better session lifecycle controls, similar to Claude Code's management features.
- **Better MCP Server Configuration:** Collision detection case-sensitivity (#4478), retry/backoff for transient 5xx (#4466), and consistent auth behavior across scopes highlight a need for more robust MCP server lifecycle handling.

---

## Developer Pain Points

- **MCP OAuth Fragility:** A cluster of new reports (#4480, #4472, #4463, #4464) describes OAuth failures — regressions, socket errors on Windows, concurrent refresh race conditions, and Entra scope mishandling. This is the single most active bug area this week.
- **Model Configuration Ignored or Hardcoded:** Users report the `explore` tool hardcoding `gpt-5.4-mini` (#3954), code-review ignoring overrides (#4462), and unsupported reasoning-effort mismatches (#4345, #4473) — agent model routing feels opaque and unreliable.
- **Session Data Loss & Lifecycle Reliability:** Stop-button deletion (#4477), silent archiving (#4474), event-store exhaustion (#4467), and orphaned permission replays (#4469) collectively describe a session persistence layer with significant edge-case failures, especially for long-running or repeatedly-resumed sessions.
- **Permission Configuration Inconsistency:** `allowed_directories` not suppressing prompts (#4482) and silent drops of steering messages (#4237) suggest the permission model needs tighter integration between config files, hooks, and the interactive prompt flow.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI Community Digest — 2026-08-14

## Today's Highlights

No new releases or merged PRs landed in the last 24 hours, but three long-running issues saw fresh discussion. The most significant is **#2598**, a critical bug report detailing silent stream hangs in ACP mode that fail to write partial responses to wire.jsonl, impacting auditability and recovery. Alongside it, a separate report of **runaway generation** (#2597) — 88k tokens of gibberish in a single step — points to insufficient output validation and abort controls in the CLI runtime.

## Releases

No new releases in the last 24 hours. Latest known version remains **0.34.0**, which carries the ACP mode (`kimi acp`) and configurable Esc-key interruption behavior.

## Hot Issues

1. **[#2598 — ACP/print streaming hangs silently: no idle timeout, replaced wheel partial not written to wire (0.31.1 only covers Esc)**](https://github.com/MoonshotAI/kimi-cli/issues/2598)  
   **Critical.** In ACP mode, after all content deltas arrive, the terminal `[DONE]`/finish frame never comes. The CLI has no streaming idle timeout, so `session/prompt` waits indefinitely. When the user sends the next message, the hung round is silently replaced and the already-streamed reply is **never persisted** to wire.jsonl. This breaks traceability, audit logs, and recovery. Community reaction is sparse (1 comment), but the severity is high for any automated or scripted usage.

2. **[#2597 — Runaway garbled generation: 88k tokens of gibberish in one LLM step](https://github.com/MoonshotAI/kimi-cli/issues/2597)**  
   **Stability.** A single LLM step ran ~53 minutes and emitted 88,114 incoherent tokens (multilingual fragments, broken Markdown, endless repetition). This suggests a missing generation cap, repetition penalty regression, or a decoder bug. Only 1 comment so far, but it raises questions about output validation and early-abort heuristics in the CLI.

3. **[#1283 — Feature Request: Memory System — persistent context across sessions](https://github.com/MoonshotAI/kimi-cli/issues/1283)**  
   **High demand.** Open since February with 38 comments. The community continues to push for persistent memory: automatic (AI-managed notes) and manual (user-defined instructions). This issue is the main signal for cross-session context retention, a recurring theme across multiple feature requests. Created months ago, still actively discussed — expectation is high, and it remains one of the most-requested directions.

## Key PR Progress

No pull requests were updated or merged in the last 24 hours. The repository shows zero active PR activity in this window.

## Feature Request Trends

- **Persistent Memory System** — The dominant trend. Issue **#1283** remains the template for cross-session context and user-preference retention. Multiple issues reference it as a prerequisite for larger workflows.
- **Streaming robustness and idle timeout** — After #2598, expect requests for configurable `stream_idle_timeout` and wire-level persistence guarantees to gain traction, especially for ACP/headless use cases.
- **Runaway output safeguards** — The gibberish-generation incident (#2597) is likely to encourage requests for max-token caps, repetition detection, and early-stop heuristics in future CLI versions.

## Developer Pain Points

1. **Silent failures in ACP mode** — The most acute pain point in the last 24 hours. Developers cannot tell if a stream ended properly, cannot recover partial outputs, and have no idle-timeout knob. This directly affects tooling reliability.
2. **No persistent context across sessions** — Still the top recurring request. Developers want the CLI to learn project patterns and user preferences without manual re-prompting each session.
3. **Unpredictable generation behavior** — The runaway token incident highlights that the CLI lacks hard output caps or quality guards, which undermines trust for long unattended runs.
4. **Lack of visibility into wire-level state** — Partial responses not being written to wire.jsonl in failure cases means debugging and audit trails are incomplete, a frustration echoed in #2598.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-08-14

## Today's Highlights

The community is split between V1 stability concerns and V2 migration friction. Three critical security reports (supply-chain risk in `opencode upgrade`, SSRF via `webfetch`, silent context pruning) were filed within 24 hours, while V2 testers report regressions in TODO tools, Windows console flashes, and shared-database corruption with V1. A flurry of cleanup PRs from contributor **kitlangton** (10+ merged) signals active dependency and dead-code reduction efforts.

## Releases

No new releases in the last 24 hours. Current stable line remains **1.18.x**; V2 is available as `0.0.0-next-*` builds.

## Hot Issues

1. **[#37012 — Keep legacy layout option](https://github.com/anomalyco/opencode/issues/37012)** — 37 comments, 41 👍. The most-discussed issue this cycle. Users strongly prefer the old all-in-one main window over the new navigation-heavy UI. Community sentiment is that the V2 layout sacrifices power-user efficiency for visual minimalism. This has become the de facto referendum on V2 UX.

2. **[#41470 — "Copied to clipboard" doesn't work](https://github.com/anomalyco/opencode/issues/41470)** — 15 comments. VSCode Server / Docker environment users report a false-positive success message; clipboard content never lands on the system clipboard. Likely a headless-environment edge case affecting remote development workflows.

3. **[#42434 — `opencode upgrade` curl|bash with no integrity verification](https://github.com/anomalyco/opencode/issues/42434)** — Security report, Medium severity. The upgrade path fetches and executes a remote script without checksum verification (TOCTOU supply-chain risk). Filed together with two other security disclosures, suggesting a coordinated audit.

4. **[#42437 — Context pruning silently drops instruction-bearing content](https://github.com/anomalyco/opencode/issues/42437)** — Security/integrity concern, rated Medium-High. When compaction runs, constraint-bearing content can be silently removed from context, potentially allowing the model to violate earlier instructions. Raises questions about compaction transparency.

5. **[#42083 — GitHub Copilot provider shows zero models](https://github.com/anomalyco/opencode/issues/42083)** — Auth succeeds but model discovery fails on Arch Linux package (`1.18.15`). `opencode models github-copilot` returns "Provider not found." Intermittent onboarding breaker.

6. **[#42420 — AI SDK response model ID is discarded](https://github.com/anomalyco/opencode/issues/42420)** — The provider's actual selected model (e.g., `provider/auto` resolving to a concrete model) is dropped before persistence. Clients see only the alias, not the real model that handled the turn. A companion fix PR (#42433) proposes a narrow correction.

7. **[#42441 / #42411 — "opencode deletes itself!"](https://github.com/anomalyco/opencode/issues/42441)** — Duplicate reports that the binary vanishes from `~/.local/share/pnpm/opencode` after a day of use. The post-install script or auto-update path appears to be removing its own binary. High user-impact, low structural understanding.

8. **[#42451 — Legacy plugin loader corrupts plugin loading and crashes startup](https://github.com/anomalyco/opencode/issues/42451)** — The V1 legacy loader treats *every* exported function as a plugin hook, pushing non-Hooks return values into the hooks array, which corrupts the loading pipeline and can crash the app. Affects plugin authors who export helpers.

9. **[#40516 — Desktop app fails to load provider/model/MCP on startup](https://github.com/anomalyco/opencode/issues/40516)** — Regression spanning `v1.18.5` through `v1.18.13` (works at `v1.18.4`). Multiple users in one org are hit ~80% of launches. Downgrading is the only reliable mitigation.

10. **[#42260 — opencode2 mutates shared V1 database and breaks coexistence](https://github.com/anomalyco/opencode/issues/42260)** — V2 migrates the schema of the shared database, breaking V1's `/move` command and leaving sessions trapped in worktrees. Critical for anyone testing V2 while keeping V1 in production.

## Key PR Progress

1. **[#42467 — Load npm package parser lazily](https://github.com/anomalyco/opencode/pull/42467)** — Defers `npm-package-arg` evaluation until `Npm.add` runs. Cuts module initialization from startup paths that only need install/which operations.

2. **[#42466 — Load local TUI plugins via SEA-safe runtime import](https://github.com/anomalyco/opencode/pull/42466)** — Fixes the Node SEA (opencode2-node) build's inability to load any local TUI plugin, which currently fails with `ERR_UNKNOWN_BUILTIN_MODULE`.

3. **[#42461 — Make revert boundaries chronological](https://github.com/anomalyco/opencode/pull/42461)** — Stops comparing opaque message IDs; truncates staged/committed revert views by the boundary message's chronological array position. Handles timestamp rollover where a later ID sorts earlier.

4. **[#42433 — Preserve response model metadata](https://github.com/anomalyco/opencode/pull/42433)** — Closes #42420. Keeps the AI SDK's structured model ID in persisted turns instead of dropping it. Narrower than the related #26091, which asks for arbitrary response headers.

5. **[#42456 — Isolate tab scroll state](https://github.com/anomalyco/opencode/pull/42456)** — Fixes a cross-tab state leak where tab A's cleanup could save its scroll position under tab B's route when the `tab_scroll` experiment is enabled.

6. **[#42455 — Recover sessions from missing locations](https://github.com/anomalyco/opencode/pull/42455)** — Sessions whose working directory was deleted can now be recovered without requiring the broken location runner to start. Also keeps new sessions out of unavailable inherited locations.

7. **[#42453 — Correct tab context menu behavior](https://github.com/anomalyco/opencode/pull/42453)** — V2 TUI tab context menu is now pointer-only: outside clicks dismiss without activating underlying UI; right-click on open menu dismisses without selecting; Rename reliably opens.

8. **[#42465 / #42464 / #42463 / #42462 / #42459 / #42458 — kitlangton cleanup series](https://github.com/anomalyco/opencode/pull/42465)** — A coordinated dependency/code-surface reduction: removes stale `motion` pins, unused frontend deps (`@solid-primitives/*`, `audio`, `scroll`, `timer`, `websocket`), unreferenced Core API members, `xdg-basedir` (twice), orphaned V2 exports, and lazily loads `@npmcli/config`. Combined these shrink startup module counts and installed size.

9. **[#42047 — Allow configured bots to trigger actions](https://github.com/anomalyco/opencode/pull/42047)** — Adds an `allowed_bots` input to the GitHub Action so trusted GitHub App bots can trigger OpenCode workflows. Bots remain denied by default.

10. **[#40427 — Experimental perf improvements (v2-only)](https://github.com/anomalyco/opencode/pull/40427)** — Rebased v2-only performance series. Reduces session route loading, removes dev-era legacy-layout and compatibility-client code that don't apply to V2. Baseline session page shows measurable improvement per the table in the PR.

## Feature Request Trends

- **Legacy layout preservation** is the single loudest signal. The community wants a configurable option to keep the V1 all-in-one main window (top comment count this cycle, 41 👍). This isn't a niche ask; it's a coordinated pushback on V2's navigational UX.
- **Right sidebar for background activities** — a live list of running/background subagents with status, expandable preview, and model info (reisi007). Requested against `1.18.16`.
- **Hebrew (he) locale** — full translation request (#42447). Appears to be the first non-Latin RTL locale request, which may carry RTL-rendering implications beyond strings.
- **Cleaner multi-instance coexistence** — driven by V2/V1 DB corruption (#42260), users want safe side-by-side operation. Not a feature request per se, but a strong implied expectation.

## Developer Pain Points

- **V2/V1 coexistence is dangerous.** V2 mutates the shared database schema and breaks V1 features like `/move` (#42260), and a session can be left trapped in a worktree. The takeaway: don't run V2 against a production V1 install until isolation is guaranteed.
- **Free-tier rate limiting is erratic.** Users report hitting `FreeUsageLimitError` on the very first request of the day (#42029), "cooldown loops" where the limit re-engages almost immediately after it lifts (#42452), and provider-level 429s from three distinct IPs (#42074). The timing and quota logic feel arbitrary to users.
- **Clipboard and file-system operations fail silently.** "Copied to clipboard" reports success without copying in remote environments (#41470), and the binary literally deletes itself in the pnpm-install path (#42441). Both are high-trust failures: the tool says it worked while not working at all.
- **Context compaction lacks transparency.** The new security report (#42437) articulates what power users suspected: compaction can silently drop instruction-bearing content, degrading the model's ability to follow constraints. Users need visibility into what was pruned and when.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-08-14

## Today's Highlights

Stable release **v0.21.11** is out with two headline capabilities: **Agent Plugins v1** for extensible agent behavior and the **/coordinate command** enabling native multi-agent workflows with read-only teammates. The fleet architecture effort is rapidly converging — the in-process preview and fleet MVP stages have shipped, with persistence, recovery, and terminal attach stages landing as PRs. Community signal is heavily skewed toward **headless/daemon reliability** and **Windows desktop/CLI polish**, with several P1 regressions reported in the last 48 hours.

## Releases

**v0.21.11** (stable)
- Agent Plugins v1 for extending agent capabilities ([#8834](https://github.com/QwenLM/qwen-code/pull/8834))
- Native multi-agent workflows with read-only teammates via `/coordinate` ([#8804](https://github.com/QwenLM/qwen-code/pull/8804))
- SWE-bench Verified E2E validation run: status **QUARANTINED** (0/500 resolved)

**v0.21.11-nightly.20260814.45c2e73080** & **v0.21.12-preview.1**
- Web-shell: preserve standalone session target for session restore
- Web-shell: support workspace file uploads

## Hot Issues

1. **[#8718 — RFC: Native coordination for independent Qwen sessions](https://github.com/QwenLM/qwen-code/issues/8718)** — The umbrella for the entire fleet/multi-agent effort. Closed after generating 9 comments, successfully driving the 1A→2→3 staged fleet implementation. Community appetite for multi-agent orchestration is confirmed by the breadth of follow-on issues.

2. **[#8678 — fix(serve): Preserve current session when a large restore times out](https://github.com/QwenLM/qwen-code/issues/8678)** — P1 bug where large session restores time out and orphan the session. PR1 mitigations merged, but full recovery semantics remain open. Persistent pain for users with heavy session histories.

3. **[#7118 — Windows standalone installer fails when powershell.exe cannot resolve Get-FileHash](https://github.com/QwenLM/qwen-code/issues/7118)** — Long-running Windows installer failure (since July) caused by a `Get-FileHash` resolution quirk. 3 👍, closed by [#9112](https://github.com/QwenLM/qwen-code/pull/9112) which replaces it with an inline .NET SHA-256. High visibility Windows pain point.

4. **[#9019 — Gemini 2.5 unusable on Vertex AI: thinkingLevel always sent, including UNSPECIFIED placeholder](https://github.com/QwenLM/qwen-code/issues/9019)** — Every request to Gemini 2.5 via `vertex-ai` auth fails with HTTP 400. Blocks a substantial cloud user segment; readiness flag set to `ready-for-human`.

5. **[#9025 — Keyless Vertex AI not inferred from environment; headless ADC runs exit with no auth type](https://github.com/QwenLM/qwen-code/issues/9025)** — Works in tandem with #9019; headless (non-interactive) runs fail at startup because `getAuthTypeFromEnv` does not infer keyless ADC configurations. Critical for CI/CD usage.

6. **[#9061 — Ctrl+V paste completely unresponsive in CLI on Windows — regression since 0.21.x](https://github.com/QwenLM/qwen-code/issues/9061)** — P1 regression: paste works in 0.21.0, broken in later 0.21.x versions. Pending bisect and fix; affects day-to-day Windows CLI ergonomics significantly.

7. **[#9002 — SDK Python rejects permission_mode="auto" although CLI supports it](https://github.com/QwenLM/qwen-code/issues/9002)** — Client-side validation rejects a documented CLI value before reaching the backend. SDK/CLI parity gap that disrupts programmatic usage.

8. **[#9108 — Desktop: remaining Web Shell external links fail to open silently; MCP OAuth cannot complete](https://github.com/QwenLM/qwen-code/issues/9108)** — Despite #9069 fixing Markdown links in the Tauri webview, four other link surfaces remain broken, blocking MCP OAuth flows in the desktop app. Active fix PR [#9111](https://github.com/QwenLM/qwen-code/pull/9111).

9. **[#9088 — read_file sends non-image file to model API based only on .png extension; raw 400 aborts the turn](https://github.com/QwenLM/qwen-code/issues/9088)** — A file named `screenshot.png` but containing JSON causes a hard 400 that aborts the entire turn. Extension-based modality detection too naive; should sniff content type.

10. **[#9026 — NO_TOOL_RESULT_PROGRESS hard-fails headless runs when a model ends a turn quietly after a tool result](https://github.com/QwenLM/qwen-code/issues/9026)** — Headless runs abort with `InvalidStreamError` when the model ends the turn without visible progress after a tool result. Fragile stream-state heuristic breaking legitimate quiet completions.

## Key PR Progress

1. **[#9086 — fix(review): harden the pipeline against four live-run failures](https://github.com/QwenLM/qwen-code/pull/9086)** — Fixes four real defects found by running `qwen review run` end-to-end against three open PRs, each pinned with regression tests.

2. **[#9080 — feat(serve): add pollable daemon turn status](https://github.com/QwenLM/qwen-code/pull/9080)** — Adds always-on `session_turn_status` with two routes for polling turn state (`idle`, `queued`, `running`, `completed`, …) without maintaining an ACP stream. Parallel to [#8682](https://github.com/QwenLM/qwen-code/pull/8682); consolidation may be needed.

3. **[#9039 — feat(core): privacy-safe tool-result boundary diagnostics](https://github.com/QwenLM/qwen-code/pull/9039)** — Adds diagnostics at the tool-result boundary that do not leak sensitive payload content. Useful for debugging NO_TOOL_RESULT_PROGRESS class of failures (#9026).

4. **[#9111 — fix(desktop): open remaining external links through the shell opener](https://github.com/QwenLM/qwen-code/pull/9111)** — Fixes the four remaining link surfaces in the desktop webview that silently drop `target="_blank"` requests; unblocks MCP OAuth (#9108).

5. **[#8978 — feat(serve): no-op on empty channel set, restore only active channels (--channel all)](https://github.com/QwenLM/qwen-code/pull/8978)** — Prevents daemon crash when the effective channel set is empty; restores only active channels. Improves headless/daemon robustness.

6. **[#9042 — feat(daemon): Track background shells in activeWork](https://github.com/QwenLM/qwen-code/pull/9042)** — Extends `activeWork` retention to Session-managed background shells, covering a gap in background-agent recovery semantics (#8586).

7. **[#9112 — fix(install): avoid Get-FileHash for Windows checksums](https://github.com/QwenLM/qwen-code/pull/9112)** — Replaces `Get-FileHash` with inline .NET SHA-256; fixes Windows installer failure (#7118) at the root.

8. **[#9098 — feat(cli): enable dynamic workflows from a settings key](https://github.com/QwenLM/qwen-code/pull/9098)** — Adds `tools.workflowsEnabled` setting, removing the undocumented environment-variable-only path. Small but important config-surface completeness.

9. **[#9095 — feat(review): close unbounded finding classes instead of enumerating them](https://github.com/QwenLM/qwen-code/pull/9095)** — Prompt-only change teaching `/review` to detect enumeration traps prospectively, closing entire defect families in one pass.

10. **[#8960 — feat(autofix): escalate stopped takeover PRs and age out unanswered pauses](https://github.com/QwenLM/qwen-code/pull/8960)** — Adds `autofix/needs-human` labeling when the autofix loop hits round caps or time budgets; improves machine-in-the-loop maintainer workflow.

## Feature Request Trends

- **Multi-agent fleet orchestration** — The dominant theme. RFC #8718 plus six stage-specific issues (1A, 1B, 2, 3) totaling 20+ comments. Community wants leader/worker session coordination with read-only teammates, persistence, recovery, and terminal attach. This trajectory is set for the remainder of the quarter.
- **Daemon deep-health and background automation** — `activeWork` tracking, background-agent recovery, pollable turn status, and channel restoration are receiving steady, focused PR attention. The `daemon` label appears across ~20% of the top issues and is clearly an architectural cornerstone.
- **Web-shell session and workspace management** — Redesign requests cover Channel policy, session isolation, workspace ownership, and file uploads. Expect web-shell to become a first-class management surface rather than a preview.
- **Omni multimodal integration experiment** — A complete parallel track (S4a–S6 issues, #8186–#8190) covering media policy pipelines, memory recall, GC, and governance. Cultivated on a protected branch with bot review; not yet mainstream-facing.
- **Security and auth-surface parity** — Vertex AI keyless ADC inference, Gemini 2.5 thinkingLevel correctness, and SDK/CLI permission-mode parity represent a cluster of authentication/API-compatibility requests from cloud users.

## Developer Pain Points

- **Windows CLI/Desktop reliability** — Recurring high-friction issues: Ctrl+V paste regression, installer `Get-FileHash` failure, visible Terminal window popping up on Desktop launch, and keybinding regressions. Windows users are a vocal and underserved segment.
- **Headless/daemon hard-failures** — Several distinct failure modes abort non-interactive runs entirely: `NO_TOOL_RESULT_PROGRESS`, auth-type not inferred in keyless ADC, and empty channel sets causing daemon exit. Each aborts silently, complicating CI adoption.
- **Desktop webview link handling** — Silent drops of external links and MCP OAuth failures in the desktop webview have required multiple rounds of fix-forward PRs (#9069 then #9111). The root cause appears to be Tauri webview `target="_blank"` behavior that keeps surfacing in new surfaces.
- **Vertex AI / Gemini compatibility** — The thinkingLevel bug blocks the entire Gemini 2.5 model family on Vertex AI, and keyless ADC inference is broken. Together these make Qwen Code effectively unusable on Google Cloud for a subset of users.
- **Client-side validation parity** — The Python SDK rejecting `permission_mode="auto"` that the CLI accepts highlights an uneven validation layer between CLI and SDK surfaces, eroding trust in SDK configuration options.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar).*