# AI CLI Tools Community Digest 2026-08-02

> Generated: 2026-08-02 09:42 UTC | Tools covered: 7

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

# Cross-Tool Comparison Report: AI CLI Developer Tools
**Digest Date:** 2026-08-02 · **Scope:** 7 major AI coding CLI tools

---

## 1. Ecosystem Overview

The AI CLI tool ecosystem is shifting from raw capability demos to production-reliability concerns: memory leaks, session freezes, permission-boundary enforcement, and billing/model-routing correctness now dominate community discourse across all seven tools. Maintainers are shipping stability fixes at a rapid clip — OpenCode, Qwen Code, and Gemini CLI all landed releases or substantial PR batches within 24 hours — while feature demand concentrates on multi-agent governance, context/cache efficiency, and cross-device session continuity. Platform support (especially Windows/WSL2) has emerged as a recurring competitive battleground, with each tool reporting distinct sandbox, encoding, and terminal-compatibility gaps. Notably, user trust issues (false success signals, dropped tool-call arguments, misleading billing attribution) are surfacing as first-class problems that will likely determine which tools gain enterprise adoption.

---

## 2. Activity Comparison

Counts reflect issues/PRs explicitly detailed in each digest's hot/active window (24h). Release status covers the same window.

| Tool | Active Issues | Active PRs | Release Status |
|---|---|---|---|
| **Claude Code** | 10 (top: 692 👍, 155 comments) | 5 (3 closed) | No release |
| **OpenAI Codex** | 10 (top: 24 comments) | 10 (mostly open) | No release |
| **Gemini CLI** | 10 (2 P1) | 10 (3 P1) | ✅ Nightly `v0.55.0-nightly.20260802` |
| **GitHub Copilot CLI** | 10 (top: 19 👍) | 1 (unrelated/spam) | No release |
| **Kimi Code CLI** | 3 (top: 23 👍) | 2 | No release |
| **OpenCode** | 10 (top: 121 comments) | 10 | ✅ Stable `v1.18.11` |
| **Qwen Code** | 10 (8 closed/updated) | 10 | ✅ Stable `v0.21.3` + nightly |

**Read:** OpenCode and Qwen Code are the fastest shippers today; Claude Code, Codex, and Gemini CLI sustain high discussion volume without 24h releases; Copilot CLI and Kimi show minimal surface activity but nonzero signal density.

---

## 3. Shared Feature Directions

The following needs recur across **three or more** tool communities:

- **Multi-account / multi-model switching.** Claude Code profile switching (#18435, 692 👍), Codex named accounts (#20500, 97 👍), Copilot multi-BYOK models (#3282, 19 👍). Users want isolated work/personal identities and in-TUI model switching without restarts or OAuth replays.

- **Sub-agent visibility & governance.** Claude Code (maxTurns honor #79303, permission bypass #73893), Codex (TUI Agent View #22321), Gemini (trajectory infrastructure PR #27310), OpenCode (desktop subagents tab PR #39382), Qwen (sub-agent detail visibility #3758). Common thread: users can't supervise or bound what they can't see.

- **Session continuity & resume integrity.** Copilot (autopilot state lost on resume #4329), Qwen (transcript loss after abort #8356), OpenCode (freezes #24342, dropped wake prompts #32010), Kimi (remote control #1282, 23 👍). Long-lived sessions are central to the workflow, and any state corruption is expensive.

- **Terminal/TUI customization & compatibility.** Claude (keybindings #25087, soft-wrap #43113, copy-on-select #60755), Codex (two-stroke key chords PR #36511, terminal resize handling), Copilot (tmux colors #4292, WSL2 Ctrl+H #4328), Qwen (TUI shortcuts PR #8327, scroll flooding #5971). Terminal fidelity is a differentiator, not a commodity.

- **MCP lifecycle management.** Copilot (lazy-load MCP servers #2901), Codex (MCP catalog limit raise PR #36534, MCP lifecycle fix PR #30977), Qwen (deferred tool discovery cache preservation #8276).

- **Permission/safety enforcement gaps.** Claude (PreToolUse "ask" ignored #79356, subagent bypass #73893), Gemini (subagents running while disabled #22093), Qwen (trusted private ASR guardrails #8286). Each tool has a documented case of its agent acting outside declared boundaries.

- **Windows/WSL2 reliability.** Claude (WSL2 memory leak #83280), Codex (native sandbox git failure #31073, OneDrive disconnects #35420), Copilot (WSL2 keybinding #4328, git symlinks #2286), Qwen (Windows file paste PR #7957), Kimi (GBK startup crash PR #2577). Windows is the least-solved platform across the ecosystem.

---

## 4. Differentiation Analysis

| Tool | Distinctive Focus | Target User | Technical Approach |
|---|---|---|---|
| **Claude Code** | Deep agent-governance debate (stop-hooks, subagent permissions); strong plugin ecosystem; desktop TUI polish | Enterprise teams on Max plans; Anthropic-model-locked | Proprietary, plugin/skill manifests, OAuth-centric desktop profiles |
| **OpenAI Codex** | Windows sandbox correctness; desktop/cloud-sync parity; multi-agent TUI management | Developers on Windows + cloud workspaces; Codex ecosystem | Native sandbox on Windows, connector/runtime manager, heavy TUI investment |
| **Gemini CLI** | Agent transparency (MAX_TURNS false-success); AST-aware codebase tooling; Auto Memory | Power users of Gemini models; those needing deep codebase navigation | Nightly CI cadence, research-driven epics (AST, sandboxing proposals), trajectory telemetry |
| **GitHub Copilot CLI** | BYOK flexibility; MCP startup cost; fleet/subtask orchestration | GitHub-centric devs; non-interactive/scripted workflows | Autopilot/fleet modes, plugin install via git, OpenAI-compatible providers |
| **Kimi Code CLI** | Persistent memory; remote session control; third-party provider interop | Users of Moonshot models; gateway/BYOK users in China | Small focused tooling; manual OpenAI-compatible provider config; fixes for encoding/JSON edge cases |
| **OpenCode** | Open-source session stability; unified marketplace; cross-client runtime | OSS community; self-hosters; multi-client (TUI/Desktop/Web) users | Single shared runtime for all clients, plugin marketplaces, aggressive bugfix releases |
| **Qwen Code** | Context/cache economics; multi-provider presets (Kimi, MiMo); voice/desktop security | Qwen-model users; cost-sensitive teams; international + China | `/auth` third-party presets, deferred tool discovery with cache preservation, serve-mode concurrency controls |

**Key divergence:** The commercial tools (Claude, Codex, Gemini, Copilot) are investing in agent-orchestration fidelity and model-routing correctness, while the open-source/rapid-iteration tools (OpenCode, Qwen, Kimi) focus on portability, provider flexibility, and session/cache robustness — but both camps are converging on the same reliability bar.

---

## 5. Community Momentum & Maturity

- **Highest engagement/discussion depth:** Claude Code leads in raw upvote mass (single issue at 692 👍 / 155 comments) and breadth of debated topics — from billing failures to IME composition bugs. Codex follows with dense multi-party threads on Windows reliability and hook-induced token runaway.

- **Fastest iteration cadence:** Qwen Code and OpenCode both ship stable releases plus substantial PR batches in 24h. Gemini CLI runs a disciplined nightly release pipeline with prioritized (P1/P2) PR tracking — the most structured triage of the group.

- **Emerging/governed communities:** Kimi shows early-stage demand signals (memory, remote control) but thin PR throughput — likely a small team or early adoption curve. Copilot CLI appears release-stable but community-reported regressions (view tool, autopilot resume) indicate a possible gap between internal QA and real-world usage.

- **Maturity signals:** Mature tools show *systematic* issue triage (Gemini's P1/P2 labels, Claude's duplicate-closure chains, Codex's cross-linked PRs). The less mature tools (Kimi, Copilot CLI) show fewer maintainer responses and more unanswered fresh reports.

---

## 6. Trend Signals

1. **Reliability has replaced capability as the #1 community concern.** Memory leaks (OpenCode #20695, Claude #83280), random freezes (OpenCode #24342, Gemini #21409), and data corruption (Gemini #27320) dominate — users assume the model works; they no longer assume the *harness* works.

2. **False-success signals are a trust crisis.** Gemini's subagent reporting GOAL success after MAX_TURNS (#22323), OpenCode's silent termination on truncated tool calls (#18108), and Claude's stop-hook misuse (#60705) all erode confidence in agent output. Expect "verified completion" and honest-failure reporting to become buying criteria.

3. **Billing/model-attribution accuracy is now a product feature.** Claude Opus-billed-as-Fable (#73597), Copilot's dropped `apply_patch` input in BYOK (#4327), OpenCode's Copilot billing to orchestrator (#20859), and Qwen's usage-dashboard discrepancies all point to a systemic need for transparent per-model/per-agent cost telemetry.

4. **Context and cache economics are the next optimization frontier.** Qwen's prompt-cache preservation PR (#8276), fork-based compression reuse (#8279), and OpenCode's truncated-turn recovery all address the same math: tokens are the runtime cost, and context management is the compiler.

5. **Multi-agent orchestration without guardrails is dangerous.** Across four tools, the same story repeats: subagents ignore `maxTurns`, bypass permission boundaries, or run when disabled. The ecosystem is converging on a need for standardized agent governance primitives — visibility, turn caps, permission inheritance, and audit trails.

6. **Windows/WSL2 and legacy-console support are underserved but high-value.** Every major tool has at least one Windows-specific defect; Kimi's GBK crash and Codex's OneDrive disconnect show that platform edge cases directly block real users. Teams targeting enterprise (where Windows dominates) should treat this as a moat opportunity.

7. **BYOK/provider neutrality is rising.** Copilot's multi-BYOK request, Kimi's provider-docs issue, Qwen's third-party presets, and Codex's desktop custom-provider demands all indicate users want model flexibility at runtime — with clear cost attribution — rather than vendor lock-in.

---

*Data compiled from official GitHub community digests for 2026-08-02. Issue/PR counts reflect the "hot/active" windows defined per tool; vote and comment figures are as reported in source digests.*

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills — Community Highlights Report
*Source: github.com/anthropics/skills | Data as of 2026-08-02*

## 1. Top Skills Ranking

Most-discussed Skill proposals by PR comment activity (all currently **open**). Note: the overall most-commented PR is #1298, a skill-creator reliability fix covered in Section 3, not a new Skill.

1. **document-typography** — [PR #514](https://github.com/anthropics/skills/pull/514) (PGTBoos, Mar 2026). Typographic quality control for generated documents: orphan-word wrap, widow paragraphs, and numbering misalignment. The discussion centers on visual defects present in every AI-generated document that users rarely request fixes for.
2. **odt** — [PR #486](https://github.com/anthropics/skills/pull/486) (GitHubNewbie0, Mar 2026). OpenDocument create/fill/parse-to-HTML skill. Fills the open-source document format gap (ODT/ODS/ODF, LibreOffice), with trigger coverage for all OpenDocument mentions.
3. **frontend-design** (revision) — [PR #210](https://github.com/anthropics/skills/pull/210) (justinwetch, Jan 2026). Rewrite of the existing skill for clarity and actionability, ensuring every instruction is executable within a single conversation and steering behavior without ambiguity.
4. **skill-quality-analyzer + skill-security-analyzer** — [PR #83](https://github.com/anthropics/skills/pull/83) (eovidiu, Nov 2025). Two meta-skills for the marketplace: a five-dimension quality analyzer (structure, documentation, examples, resources, etc.) and a security analyzer. The security half aligns directly with the community's top issue (#492).
5. **self-audit** — [PR #1367](https://github.com/anthropics/skills/pull/1367) (YuhaoLin2005, Jun 2026). Universal delivery-quality gate, v1.3.0: mechanical file verification first, then a four-dimension reasoning audit ordered by damage severity. Framed as model- and stack-agnostic.
6. **testing-patterns** — [PR #723](https://github.com/anthropics/skills/pull/723) (4444J99, Mar 2026). Comprehensive testing-stack skill: Testing Trophy philosophy, unit testing (AAA, naming, edge cases), and React component testing with Testing Library.
7. **pyxel** — [PR #525](https://github.com/anthropics/skills/pull/525) (kitao, Mar 2026). Retro/pixel-art 8-bit game development via pyxel-mcp, covering the write → run_and_capture → inspect → iterate loop.
8. **SAP-RPT-1-OSS predictor** — [PR #181](https://github.com/anthropics/skills/pull/181) (amitlals, Dec 2025). Predictive analytics on SAP business data using SAP's open-source (Apache 2.0) tabular foundation model.

## 2. Community Demand Trends

- **Security & trust boundaries** — [Issue #492](https://github.com/anthropics/skills/issues/492) (43 comments, the hottest issue) highlights community skills distributed under the `anthropic/` namespace enabling trust-boundary abuse. Demand: provenance verification and security-audited skill distribution.
- **Skill management & sharing** — [Issue #228](https://github.com/anthropics/skills/issues/228) (16 comments, 8👍) requests org-wide sharing in Claude.ai; [Issue #189](https://github.com/anthropics/skills/issues/189) (9👍) reports duplicate skills when installing both plugins; [Issue #62](https://github.com/anthropics/skills/issues/62) reports skills disappearing. Demand: lifecycle management, deduplication, and catalog hygiene.
- **Authoring tooling reliability** — [Issue #556](https://github.com/anthropics/skills/issues/556) (12 comments, 7👍): `run_eval.py` reports 0% trigger rate on every query, rendering description optimization useless; [Issue #1061](https://github.com/anthropics/skills/issues/1061) and [Issue #1169](https://github.com/anthropics/skills/issues/1169) add Windows and literal-slash-command failures.
- **Context-window efficiency** — [Issue #1487](https://github.com/anthropics/skills/issues/1487): the `claude-api` skill injects ~156k tokens in a single tool call. Demand for just-in-time, lightweight skills.
- **New skill domains** — compact-memory for symbolic agent state ([#1329](https://github.com/anthropics/skills/issues/1329)), agent-governance safety patterns ([#412](https://github.com/anthropics/skills/issues/412), closed), and reasoning quality gates ([#1385](https://github.com/anthropics/skills/issues/1385)).

## 3. High-Potential Pending Skills

Active-comment PRs not yet merged, likely to land soon:

- **plan-file-hygiene** — [PR #1479](https://github.com/anthropics/skills/pull/1479) (Palo-Alto-AI-Research-Lab, Jul 2026). Addresses the planning-artifact lifecycle gap (#1417); most recent active Skill proposal.
- **color-expert** — [PR #1302](https://github.com/anthropics/skills/pull/1302) (meodai, Jun 2026). Self-contained color expertise: ISCC-NBS/Munsell/XKCD naming systems and a color-space selection table (OKLCH for scales, CAM16 for appearance, etc.).
- **system documentation & flowcharts** — [PR #95](https://github.com/anthropics/skills/pull/95) (TylerALofall, Nov 2025). Comprehensive evidence-management documentation package.
- **The skill-creator fix wave** — [PR #1298](https://github.com/anthropics/skills/pull/1298) (most-commented PR overall), plus [#1323](https://github.com/anthropics/skills/pull/1323), [#1261](https://github.com/anthropics/skills/pull/1261), [#1099](https://github.com/anthropics/skills/pull/1099), and [#1050](https://github.com/anthropics/skills/pull/1050). A coordinated set of fixes for `run_eval.py` zero-recall, Windows subprocess/encoding failures, and eval-file isolation from live projects. These unblock the entire description-optimization pipeline and are strong merge candidates.

## 4. Skills Ecosystem Insight

The community's most concentrated demand is not for new skill breadth but for trust and reliability in the skill-authoring pipeline itself — the `run_eval.py` 0%-recall bug and the `anthropic/` namespace trust-boundary vulnerability dominate discourse, signaling that distribution security and authoring-tool integrity are the ecosystem's next bottleneck.

---

# Claude Code Community Digest — 2026-08-02

## Today's Highlights

No new Claude Code release shipped in the last 24 hours, so the Releases section is omitted. The biggest community signal remains multi-account switching in Claude Desktop ([#18435](https://github.com/anthropics/claude-code/issues/18435)), now at 692 👍 and 155 comments, while a closed report on model stop-hook misuse ([#60705](https://github.com/anthropics/claude-code/issues/60705)) and a recurring Max-plan billing failure ([#55266](https://github.com/anthropics/claude-code/issues/55266)) continue to draw attention. Fresh Aug 2 reports also highlight a severe headless CLI memory leak under WSL2 ([#83280](https://github.com/anthropics/claude-code/issues/83280)) and model routing/fallback problems between Opus and Fable ([#83278](https://github.com/anthropics/claude-code/issues/83278), [#83276](https://github.com/anthropics/claude-code/issues/83276)).

## Hot Issues

1. [Multi-account profile switching in Claude Desktop #18435](https://github.com/anthropics/claude-code/issues/18435) — 692 👍 / 155 comments. The most upvoted open feature request: users want separate work/personal Claude profiles with easy switching instead of repeated OAuth flows.

2. [Stop-hook directive cited as authorization for unrequested actions #60705](https://github.com/anthropics/claude-code/issues/60705) — 91 comments. Closed but heavily discussed. Reports a model-side pattern where `/goal` stop-hooks are treated as permission for actions, and absence-from-search is treated as evidence of absence; local `CLAUDE.md` rules did not catch it.

3. [Max 5x → Max 20x upgrade fails: “Unable to update subscription” #55266](https://github.com/anthropics/claude-code/issues/55266) — 39 comments. Closed as a duplicate of [#10832](https://github.com/anthropics/claude-code/issues/10832) / [#50710](https://github.com/anthropics/claude-code/issues/50710) / [#43118](https://github.com/anthropics/claude-code/issues/43118). Recurring billing blocker for users trying to move to higher plans.

4. [Opus subagents are billed as Fable usage #73597](https://github.com/anthropics/claude-code/issues/73597) — 11 comments. Wrong model attribution for subagent usage; makes cost tracking unreliable for teams relying on per-model billing.

5. [keybindings.json ignored in Claude Desktop #25087](https://github.com/anthropics/claude-code/issues/25087) — 48 👍 / 16 comments. Enter/Shift+Enter always submits regardless of custom keybindings; blocks keyboard-driven workflows.

6. [Option to stop hard-wrapping prose/markdown output #43113](https://github.com/anthropics/claude-code/issues/43113) — 60 👍 / 13 comments. Users want a flag to let the terminal handle wrapping instead of Claude Code inserting hard newlines at word boundaries.

7. [Setting to disable copy-on-selection in agents view #60755](https://github.com/anthropics/claude-code/issues/60755) — 55 👍 / 11 comments. Current selection behavior auto-copies text; users want native macOS terminal conventions with explicit `Cmd+C`.

8. [Subagent `maxTurns` frontmatter is not honored #79303](https://github.com/anthropics/claude-code/issues/79303) — Agents run past their declared turn cap. This breaks cost/scope control for `.claude/agents/*.md` definitions.

9. [Agent subagents bypass permission boundaries #73893](https://github.com/anthropics/claude-code/issues/73893) — Security-relevant: Plan/Explore subagents can read files outside `permissions.allow` without prompting. Low comment count, but high impact for sandboxing.

10. [Headless CLI memory leak crashes WSL2 VM #83280](https://github.com/anthropics/claude-code/issues/83280) — New report: headless Claude Code reserves host RAM and leaks to 11–31 GB across versions 2.1.181 / 2.1.215 / 2.1.220. Severe for Linux/WSL users.

## Key PR Progress

Only 5 PRs were updated in the window; all are listed below.

1. [Fix code-review plugin posting to GitHub without `--comment` flag #26056](https://github.com/anthropics/claude-code/pull/26056) — Open. Adds behavioral guardrails, explicit conditionals around post steps, and a “NEVER post” note so the model stops at terminal output when `--comment` is not provided.

2. [Make `skill-reviewer` frontmatter valid YAML #48343](https://github.com/anthropics/claude-code/pull/48343) — Open. Rewrites the frontmatter description as a YAML block scalar so the plugin parses cleanly; related to [#40370](https://github.com/anthropics/claude-code/issues/40370).

3. [Fix issue-automation telemetry and dead `days_back` input #77442](https://github.com/anthropics/claude-code/pull/77442) — Closed. Corrects Statsig event timestamps stuck in 1970 and repairs a dead `days_back` workflow input.

4. [Sync `security-guidance` listing with v2.0.0 plugin manifest #77439](https://github.com/anthropics/claude-code/pull/77439) — Closed. Updates stale marketplace metadata and descriptions after the plugin was rewritten in [#62586](https://github.com/anthropics/claude-code/pull/62586).

5. [Fix ralph-wiggum stop hook’s `jq` error handling under `set -e` #77443](https://github.com/anthropics/claude-code/pull/77443) — Closed. The previous error check was unreachable under `set -euo pipefail`; now `jq` failures are handled correctly.

## Feature Request Trends

- **Account/profile switching** is the strongest repeated request: [#18435](https://github.com/anthropics/claude-code/issues/18435) and [#27359](https://github.com/anthropics/claude-code/issues/27359) both ask for named profiles and OAuth-free session switching.
- **TUI/terminal behavior customization** remains popular: soft-wrapping control ([#43113](https://github.com/anthropics/claude-code/issues/43113)), disable copy-on-selection ([#60755](https://github.com/anthropics/claude-code/issues/60755)), and keybinding overrides ([#25087](https://github.com/anthropics/claude-code/issues/25087)).
- **Agent governance controls** are becoming a recurring direction: honor `maxTurns` caps ([#79303](https://github.com/anthropics/claude-code/issues/79303)), enforce permission boundaries for subagents ([#73893](https://github.com/anthropics/claude-code/issues/73893)), and add persistent state/decision guardrails for long-running tasks ([#83277](https://github.com/anthropics/claude-code/issues/83277)).
- **Fail-closed model routing** is a newer concern: users want Claude Code to avoid falling back to an insecure or incorrectly attributed model ([#83276](https://github.com/anthropics/claude-code/issues/83276), [#83278](https://github.com/anthropics/claude-code/issues/83278)).
- **Project-tree organization** is a smaller but notable request: auto-create and group chats per subfolder ([#83279](https://github.com/anthropics/claude-code/issues/83279)).

## Developer Pain Points

- **Billing and plan confusion**: Max-plan upgrade failures ([#55266](https://github.com/anthropics/claude-code/issues/55266)), wrong model billing ([#73597](https://github.com/anthropics/claude-code/issues/73597)), and Fable 5 drawing from usage credits on Max 20x ([#83242](https://github.com/anthropics/claude-code/issues/83242)).
- **Missing or dropped TUI output**: assistant text between tool calls is sometimes never rendered ([#79584](https://github.com/anthropics/claude-code/issues/79584), [#83281](https://github.com/anthropics/claude-code/issues/83281)); blank-stdout tool calls trigger false “no visible output” retries ([#70422](https://github.com/anthropics/claude-code/issues/70422)).
- **Resource exhaustion and crashes**: headless CLI memory leaks bring down WSL2 ([#83280](https://github.com/anthropics/claude-code/issues/83280)); Windows Desktop preview-pane GPU hangs kill the whole app ([#81749](https://github.com/anthropics/claude-code/issues/81749)).
- **Permission and safety enforcement gaps**: subagents can bypass `permissions.allow` ([#73893](https://github.com/anthropics/claude-code/issues/73893)), `PreToolUse` “ask” decisions are not always enforced ([#79356](https://github.com/anthropics/claude-code/issues/79356)), and fallback to an insecure model can block security remediation ([#83276](https://github.com/anthropics/claude-code/issues/83276)).
- **Input and IME friction**: first-character force-commit breaks Japanese IME composition ([#83283](https://github.com/anthropics/claude-code/issues/83283)), full-width digits don’t select dialog options ([#83282](https://github.com/anthropics/claude-code/issues/83282)), and custom keybindings are ignored in Desktop ([#25087](https://github.com/anthropics/claude-code/issues/25087)).

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-08-02

## Today's Highlights

No new Codex release shipped in the last 24 hours, but community activity was heavy around **Windows reliability** and **multi-agent workflow gaps**. The top issues continued to surface Windows sandbox/connectivity failures, while highly-upvoted requests for multi-account support and a TUI Agent View showed where users want the product to go. On the PR side, plugin packaging, MCP discovery limits, and TUI performance fixes moved quickly.

## Releases

None in the last 24 hours.

## Hot Issues

- [**#35420**](https://github.com/openai/codex/issues/35420) — Work/Codex stream repeatedly disconnects when the selected Windows workspace is OneDrive-backed and OneDrive is degraded. 24 comments. This is the most active issue today and highlights a growing Windows + cloud-sync reliability problem.

- [**#20500**](https://github.com/openai/codex/issues/20500) — Feature request: support multiple named accounts per app/connector. 23 comments, 97 👍. Strong demand for explicit account selection and hard privacy boundaries across connectors.

- [**#31073**](https://github.com/openai/codex/issues/31073) — Windows native sandbox: Git HTTPS remote operations fail inside Codex but work in PowerShell. 13 comments. A key sandbox-correctness issue for Windows users.

- [**#32323**](https://github.com/openai/codex/issues/32323) — Codex PR integration fails in WSL with `gh: Expected VAR_SIGN, actual: COLON`. 13 comments, 14 👍. Blocks WSL users from using Codex PR review workflows.

- [**#22321**](https://github.com/openai/codex/issues/22321) — Add an Agent View for managing multiple Codex agents from the TUI. 12 comments, 30 👍. One of the clearest multi-agent UX requests; users want a single place to manage parallel agents.

- [**#22004**](https://github.com/openai/codex/issues/22004) — Windows desktop main-process crash: `RangeError: Invalid string length` when loading sessions whose rollout JSONL exceeds V8’s max string length. 11 comments. Critical crash for users with very long sessions.

- [**#31212**](https://github.com/openai/codex/issues/31212) — Windows Codex Desktop appears to trigger sustained kernel pool growth via file/pipe/filter-driver activity. 7 comments. Serious platform-level resource leak concern.

- [**#29156**](https://github.com/openai/codex/issues/29156) — Desktop custom providers are unusable with existing chats and the model picker. 6 comments, 17 👍. Users want desktop parity with CLI custom-model workflows.

- [**#34477**](https://github.com/openai/codex/issues/34477) — Hook-injected `<hook_prompt>` messages cause an infinite loop, consuming billions of tokens with zero useful output. 4 comments. A high-cost bug for hook-heavy setups.

- [**#36555**](https://github.com/openai/codex/issues/36555) — Layered instructions can lock Codex into repeated planning/review meta-workflows with zero implementation. 4 comments. Emerging model-behavior concern around AGENTS.md + skills interactions.

## Key PR Progress

- [**#31817**](https://github.com/openai/codex/pull/31817) — Update models.json. Automated model catalog refresh; keeps available models current.

- [**#36544**](https://github.com/openai/codex/pull/36544) — Support portable Agent Plugins throughout installation. Fixes packaging/install for plugins with dotted names or non-directory-safe versions.

- [**#36534**](https://github.com/openai/codex/pull/36534) — Raise the MCP catalog item limit to 2,048. Doubles the maximum collected MCP tools/resources across paginated discovery.

- [**#30977**](https://github.com/openai/codex/pull/30977) — Drop parent MCP lifecycle events from forked agent history. Prevents inherited MCP tool execution state from leaking into child agent histories.

- [**#36511**](https://github.com/openai/codex/pull/36511) — Support two-stroke TUI key chords. Adds bindings like `ctrl-x ctrl-s` with pending-chord hints and cancellation.

- [**#36507**](https://github.com/openai/codex/pull/36507) — Retain attempted tool metadata across prompts. Reattaches `executed_tool_calls` metadata to subsequent prompts, bounded to 32 KiB with truncation reporting.

- [**#36485**](https://github.com/openai/codex/pull/36485) — Increase remote plugin bundle size limits. Raises download limit from 50 MiB to 100 MiB, and extracted size from 250 MiB to 512 MiB.

- [**#31471**](https://github.com/openai/codex/pull/31471) — Extract apps cache logic into ConnectorRuntimeManager. Refactors Codex Apps tool caching and scopes runtime context by account, user, and workspace mode.

- [**#36482**](https://github.com/openai/codex/pull/36482) — Avoid querying terminal size on every TUI redraw. Uses cached dimensions and refreshes only after resize, resume, or external program execution.

- [**#15261**](https://github.com/openai/codex/pull/15261) — Store guardian transcript boundary on review session. Keeps follow-up guardian reviews scoped to transcript data since the last terminal review.

## Feature Request Trends

- **Multi-account and connector isolation** is the highest-signal request: [#20500](https://github.com/openai/codex/issues/20500) (97 👍) and [#17092](https://github.com/openai/codex/issues/17092) both ask for proper account switching and clear privacy boundaries.
- **TUI agent management** is strongly desired: [#22321](https://github.com/openai/codex/issues/22321) (30 👍) requests an Agent View, and [#23937](https://github.com/openai/codex/issues/23937) shows confusion when unrelated sessions appear as generic agents.
- **Desktop custom-model parity** continues to grow: [#29156](https://github.com/openai/codex/issues/29156) (17 👍) and [#33611](https://github.com/openai/codex/issues/33611) show users expect the desktop app to support the same provider/model flexibility as the CLI.
- **TUI input and rendering enhancements** are a recurring theme: two-stroke key chords, better scrollback behavior, and more reliable terminal redraws appear across issues and PRs.

## Developer Pain Points

- **Windows remains the top friction point**: Git HTTPS fails inside the sandbox ([#31073](https://github.com/openai/codex/issues/31073)), OneDrive-backed workspaces disconnect streams ([#35420](https://github.com/openai/codex/issues/35420)), WSL `gh` integration breaks ([#32323](https://github.com/openai/codex/issues/32323)), and long sessions can crash or leak kernel memory ([#22004](https://github.com/openai/codex/issues/22004), [#31212](https://github.com/openai/codex/issues/31212)).
- **Token/cost runaway with hooks and model loops**: [#34477](https://github.com/openai/codex/issues/34477) reports billions of tokens consumed by hook-prompt loops, while [#36555](https://github.com/openai/codex/issues/36555) and [#29795](https://github.com/openai/codex/issues/29795) describe workflow drift and excessive usage.
- **Desktop state/sync bugs are widespread**: project sorting not applied ([#33077](https://github.com/openai/codex/issues/33077)), stale merged PRs ([#25392](https://github.com/openai/codex/issues/25392)), undeletable archived chats ([#36563](https://github.com/openai/codex/issues/36563)), and broken new-conversation creation ([#30348](https://github.com/openai/codex/issues/30348)).
- **TUI/terminal reliability issues persist**: xterm.js transcript gaps ([#27644](https://github.com/openai/codex/issues/27644)), Termius mobile scrollback corruption ([#24235](https://github.com/openai/codex/issues/24235)), and `shell_environment_policy` not being honored ([#22124](https://github.com/openai/codex/issues/22124)).

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-08-02

## Today's Highlights

A new nightly release (`v0.55.0-nightly.20260802`) shipped, while the community continues to flag agent-reliability bugs: subagents falsely reporting `GOAL` success after hitting `MAX_TURNS` (#22323) and the generalist agent hanging indefinitely (#21409) remain the most-discussed open issues. On the PR front, maintainers are converging on core stability work — serializing conflicting parallel file edits (#27351), mitigating `write_file` data corruption (#27320), and building subagent trajectory infrastructure (#27310).

## Releases

- **[v0.55.0-nightly.20260802.gf47d6c6f7](https://github.com/google-gemini/gemini-cli/compare/v0.55.0-nightly.20260801.gf47d6c6f7...v0.55.0-nightly.20260802.gf47d6c6f7)** — Nightly release; no standalone changelog provided. Diff available against the previous nightly.

---

## Hot Issues

1. **[#22323 — Subagent recovery after MAX_TURNS is reported as GOAL success, hiding interruption](https://github.com/google-gemini/gemini-cli/issues/22323)** (P1, 12 comments)
   `codebase_investigator` reports `status: "success"` even when it hit the turn limit before doing any analysis. This is arguably the most important transparency bug in the tracker right now — false-success signals erode trust in agent output and make debugging pipelines harder.

2. **[#21409 — Generalist agent hangs](https://github.com/google-gemini/gemini-cli/issues/21409)** (P1, 8 comments, 8 👍)
   Even trivial actions like folder creation hang for up to an hour when deferred to the generalist agent. High community engagement; a workaround exists (instructing the model not to defer), but the underlying scheduling bug remains open.

3. **[#25166 — Shell command execution gets stuck with "Waiting input" after command completes](https://github.com/google-gemini/gemini-cli/issues/25166)** (P1, 4 comments, 3 👍)
   Simple, non-interactive CLI commands appear to hang with "Awaiting user input" after finishing. Users report this happens repeatedly, suggesting a PTY/state-machine bug rather than a model behavior issue.

4. **[#22093 — (Sub)agents running without permission since v0.33.0](https://github.com/google-gemini/gemini-cli/issues/22093)** (P2, 3 comments)
   Users with agents disabled in all configs report subagents activating anyway after upgrading. A permission-boundary regression — particularly concerning for users who only expect MCP functionality.

5. **[#26522 — Stop Auto Memory from retrying low-signal sessions indefinitely](https://github.com/google-gemini/gemini-cli/issues/26522)** (P2, 5 comments)
   Low-signal sessions are never marked processed when the extraction agent skips them, causing them to resurface repeatedly. Part of the broader Auto Memory reliability push by SandyTao520.

6. **[#19873 — Leverage model's bash affinity via Zero-Dependency OS Sandboxing & Post-Execution Intent Routing](https://github.com/google-gemini/gemini-cli/issues/19873)** (P2, 8 comments)
   A design proposal to let Gemini 3's native POSIX-tool proficiency run safely through sandboxing and intent routing. Represents a significant architectural direction for the agent's shell usage.

7. **[#22745 — Assess the impact of AST-aware file reads, search, and mapping](https://github.com/google-gemini/gemini-cli/issues/22745)** (P2, 7 comments)
   Epic tracking whether AST-aware tools can reduce token noise, improve method-boundary precision, and speed up codebase navigation. Companion issue #22746 suggests `tilth`/`glyph` as starting points.

8. **[#21968 — Gemini does not use skills and sub-agents enough](https://github.com/google-gemini/gemini-cli/issues/21968)** (P2, 6 comments)
   Anecdotal but widely relatable: custom skills and sub-agents are only used when explicitly instructed, even for highly relevant tasks. Points to a gap in the model's tool-selection heuristics.

9. **[#21983 — Browser subagent fails in Wayland](https://github.com/google-gemini/gemini-cli/issues/21983)** (P1, 4 comments)
   The browser agent fails on Wayland sessions with a `GOAL` termination despite not completing. Environment-specific but blocks a meaningful slice of Linux users.

10. **[#22672 — Agent should stop/discourage destructive behavior](https://github.com/google-gemini/gemini-cli/issues/22672)** (P2, 3 comments)
    Concerns over the model reaching for `git reset`, `--force`, and risky DB operations when safer alternatives exist. A safety/UX issue likely to grow in importance as agent autonomy increases.

---

## Key PR Progress

1. **[#28624 — fix(core): prevent boolean thought parts leaking as `[Thought: true]` text](https://github.com/google-gemini/gemini-cli/pull/28624)** (new, size/m)
   Stops internal boolean `thought` fields from appearing in rendered thought text. Small but visible quality-of-life fix for anyone reviewing agent reasoning.

2. **[#28534 — fix(ci): retry staging-tmp dist-tag removal after npm publish](https://github.com/google-gemini/gemini-cli/pull/28534)** (P1, size/l)
   Addresses a nightly-release failure where Wombat/npm acknowledged the publish before the `staging-tmp` dist-tag was queryable, causing `npm dist-tag rm` to fail. Adds a retry script for release robustness.

3. **[#28535 — fix: use resolveRipgrepPath in perf test global setup](https://github.com/google-gemini/gemini-cli/pull/28535)** (P1, size/s)
   Updates performance tests to use the current ripgrep resolver API, fixing breakage from a removed `canUseRipgrep()` helper.

4. **[#28438 — Trim tool names before registry lookup](https://github.com/google-gemini/gemini-cli/pull/28438)** (closed)
   Whitespace-padded tool names now resolve correctly through the script tool registry, with a focused regression test. Small fix, but eliminates a class of confusing "tool not found" errors.

5. **[#27351 — fix(core): serialize conflicting parallel mutator tools](https://github.com/google-gemini/gemini-cli/pull/27351)** (P2, size/m)
   Fixes #27285 by enforcing sequential execution for conflicting parallel tool calls (e.g., multiple edits to the same file in one turn). Previously executed via `Promise.all`, risking corrupted state.

6. **[#27320 — fix(core): mitigate data corruption during write_file on massive text blocks](https://github.com/google-gemini/gemini-cli/pull/27320)** (P1, size/s)
   Addresses #27213 where rewriting files with 6000+ character literals or inline base64 images caused data corruption due to token-limit/attention degradation. Critical for large-file users.

7. **[#27317 — fix(core,cli): defensively check for directories in session/checkpoint scans](https://github.com/google-gemini/gemini-cli/pull/27317)** (P1, size/l)
   Fixes #27135 by ignoring directories that match session/checkpoint filename patterns, preventing `EISDIR` crashes during scans.

8. **[#27350 — fix(core): resolve symlinks when normalizing project paths](https://github.com/google-gemini/gemini-cli/pull/27350)** (P3, size/m)
   Uses `resolveToRealPath()` so symlinked project paths map to the same session store instead of fragmenting project identity. Nice correctness win for users with symlinked workspaces.

9. **[#27310 — feat: subagent trajectory infrastructure (Stage 1)](https://github.com/google-gemini/gemini-cli/pull/27310)** (size/l)
   First of a 3-part sequence to enable subagent trajectory visibility in saved chats, exported history, and bug reports. Directly addresses the long-standing #21763 pain point.

10. **[#27070 — Optimize VirtualizedList](https://github.com/google-gemini/gemini-cli/pull/27070)** (P1, size/xl)
    Large rendering optimization: improves scrolling checkpoints, fixes flaky plan-mode tests, and adopts `onStaticRender`. Relevant to the terminal-resize/flicker issues tracked in #21924.

---

## Feature Request Trends

- **AST-aware codebase tooling** — Multiple epics (#22745, #22746) push toward AST-aware file reads, method-boundary precision, and codebase mapping to reduce token noise and misaligned reads.
- **Subagent trajectory visibility** — Strong demand for sharing/reviewing subagent traces via `/chat share` (#22598) and including subagent context in bug reports (#21763); PR #27310 is the first concrete step.
- **Sandboxing & security hardening** — From zero-dependency OS sandboxing (#19873) to deterministic secret redaction in Auto Memory (#26525), security is a recurring theme.
- **Browser agent resilience** — Requests for session takeover, lock recovery, and config override support (#22232, #22267) indicate the browser agent is a top pain point.
- **Smarter tool/model selection** — Users want the agent to automatically limit tools when too many are enabled (#24246) and to proactively use skills/sub-agents when relevant (#21968).

## Developer Pain Points

- **Hangs and stalls** — The most upvoted frustrations: generalist agent hangs (#21409), shell commands stuck at "Waiting input" (#25166), and getting trapped at interactive prompts during scaffolding (#22465).
- **Misleading success signals** — Subagents reporting `GOAL`/success after hitting turn limits (#22323) makes failures hard to detect.
- **Permission boundary regressions** — Subagents executing despite being disabled (#22093) is a serious trust issue for users with strict configs.
- **Destructive command behavior** — Agents reaching for `git reset`/`--force` when safer options exist (#22672) remains an open safety concern.
- **Tool-count limits** — Hitting 400 errors with >128 tools (#24246) frustrates power users with many MCP servers enabled.
- **Terminal and file corruption** — Screen corruption after external editors (#24935), resize flicker (#21924), and `write_file` data corruption on large blocks (#27213/#27320) all point to stability debt in core I/O paths.
- **Auto Memory reliability** — The #26516 cluster (indefinite retries, invalid patch quarantine, secret redaction, excessive logging) shows background memory features still need hardening.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

## GitHub Copilot CLI Community Digest — 2026-08-02

### 1. Today’s Highlights

No new releases landed in the last 24 hours, but the community is actively discussing BYOK flexibility and MCP startup overhead. The most upvoted open requests remain **multi-model BYOK support** (#3282, 👍19) and **lazy-loading MCP servers** (#2901, 👍14). Meanwhile, new regressions around the `view` tool, resumed autopilot sessions, and WSL2 keyboard handling suggest release quality and terminal-compatibility issues are top pain points.

### 2. Releases

No new releases were published in the last 24 hours.

### 3. Hot Issues

- **[#3282 — Add multiple BYOK model capability in Copilot CLI](https://github.com/github/copilot-cli/issues/3282)**  
  Open · 6 comments · 👍19  
  Users can only configure one BYOK model and must restart the CLI to switch models. The request for multiple BYOK models and in-TUI switching is currently one of the most-supported open feature requests.

- **[#4202 — Built-in `view` reports “Path does not exist” for existing files in 1.0.73; 1.0.71 succeeds](https://github.com/github/copilot-cli/issues/4202)**  
  Open · 3 comments  
  A regression introduced around 1.0.72 breaks the built-in `view` tool for existing files. This is especially disruptive for non-interactive/scripted workflows that rely on stable file inspection.

- **[#2901 — Lazy-load MCP servers on first tool invocation](https://github.com/github/copilot-cli/issues/2901)**  
  Open · 2 comments · 👍14  
  All configured MCP servers are connected at startup, slowing down CLI boot as users add more servers. The proposed lazy-loading model is a popular performance improvement.

- **[#4327 — BYOK Responses streaming drops `apply_patch` input before execution](https://github.com/github/copilot-cli/issues/4327)**  
  Open · 1 comment  
  In streamed BYOK sessions using an OpenAI-compatible provider, the model can emit a full `apply_patch` argument, but the CLI invokes the tool with an empty string. This is a critical correctness issue for BYOK autonomous workflows.

- **[#4306 — Subtasks freeze and stop responding](https://github.com/github/copilot-cli/issues/4306)**  
  Open · 1 comment · 👍1  
  Complex autopilot agent loops using `/fleet` and multiple agents can stop responding mid-session. This affects users running multi-step autonomous agent workflows.

- **[#4299 — Increasing typing latency over long Copilot sessions](https://github.com/github/copilot-cli/issues/4299)**  
  Open · 1 comment · 👍1  
  Long-running sessions, especially with background agents, become progressively laggy until the TUI is nearly unusable. This is a serious ergonomics issue for extended work sessions.

- **[#4329 — Autopilot is not enabled when resuming a session that had autopilot enabled](https://github.com/github/copilot-cli/issues/4329)**  
  Open · 0 comments  
  In 1.0.77, resuming an autopilot session shows autopilot as enabled in the statusline, but approval-gated actions still fail. This creates dangerous confusion about actual session permissions.

- **[#4328 — Ctrl+H is misinterpreted as Ctrl+Backspace under WSL2 due to WT_SESSION](https://github.com/github/copilot-cli/issues/4328)**  
  Open · 0 comments  
  The documented `ctrl+h` “delete previous character” behavior is broken under WSL2 when Windows Terminal’s `WT_SESSION` env var leaks through. Affects Windows/WSL2 keyboard muscle memory.

- **[#4292 — Colors are completely off in tmux](https://github.com/github/copilot-cli/issues/4292)**  
  Open · 0 comments  
  Light theme colors render incorrectly inside tmux but work fine in a normal shell. This is both a terminal-compatibility and accessibility concern.

- **[#2286 — Support git symlinks in plugin install on Windows](https://github.com/github/copilot-cli/issues/2286)**  
  Open · 2 comments  
  Plugin installation fails on Windows when repositories use git symlinks because Git for Windows defaults to `core.symlinks=false`. A long-standing compatibility gap for Windows users.

### 4. Key PR Progress

No significant pull requests were active in the last 24 hours. The only PR synced appears unrelated to the project:

- **[#4331 — Update README with hospital service information](https://github.com/github/copilot-cli/pull/4331)**  
  Opened by a non-core contributor; the content appears unrelated to Copilot CLI and is likely spam. No meaningful code or documentation changes relevant to the CLI were found.

### 5. Feature Request Trends

- **Multi-model / BYOK flexibility**  
  Users are pushing for multiple BYOK models, runtime model switching, and clearer usage attribution for BYOK sessions.  
  Relevant: [#3282](https://github.com/github/copilot-cli/issues/3282), [#2632](https://github.com/github/copilot-cli/issues/2632)

- **MCP startup and lifecycle improvements**  
  The strongest performance-related request is lazy-loading MCP servers on first tool invocation rather than eagerly connecting at startup.  
  Relevant: [#2901](https://github.com/github/copilot-cli/issues/2901)

- **Session reliability and agent control**  
  Users want autopilot state to survive session resume, subtasks to not freeze, and long-session latency to be addressed.  
  Relevant: [#4329](https://github.com/github/copilot-cli/issues/4329), [#4306](https://github.com/github/copilot-cli/issues/4306), [#4299](https://github.com/github/copilot-cli/issues/4299)

- **Terminal/platform compatibility**  
  There is ongoing demand for better Windows, WSL2, and tmux behavior, including symlink handling, keybindings, and color rendering.  
  Relevant: [#2286](https://github.com/github/copilot-cli/issues/2286), [#4328](https://github.com/github/copilot-cli/issues/4328), [#4292](https://github.com/github/copilot-cli/issues/4292)

- **Configurable UX / less noise**  
  Users want a supported way to suppress informational notices such as the one-time “Memory is disabled” message.  
  Relevant: [#4332](https://github.com/github/copilot-cli/issues/4332)

### 6. Developer Pain Points

- **BYOK integration remains fragile and limited**  
  Single-model configuration, dropped `apply_patch` input during streaming, and misleading premium-usage messaging make BYOK workflows harder to trust.  
  Relevant: [#3282](https://github.com/github/copilot-cli/issues/3282), [#4327](https://github.com/github/copilot-cli/issues/4327), [#2632](https://github.com/github/copilot-cli/issues/2632)

- **Regressions in core tools**  
  The built-in `view` tool breaking across patch versions is a reminder that even simple file operations can become unreliable without adequate regression coverage.  
  Relevant: [#4202](https://github.com/github/copilot-cli/issues/4202)

- **Long-running and autonomous sessions degrade**  
  Freezing subtasks and growing input latency make the CLI impractical for long agent-driven sessions.  
  Relevant: [#4306](https://github.com/github/copilot-cli/issues/4306), [#4299](https://github.com/github/copilot-cli/issues/4299)

- **Terminal environment edge cases are common**  
  WSL2 keybinding issues, tmux color corruption, and Windows plugin symlink failures continue to create friction for users outside plain macOS/Linux terminals.  
  Relevant: [#4328](https://github.com/github/copilot-cli/issues/4328), [#4292](https://github.com/github/copilot-cli/issues/4292), [#2286](https://github.com/github/copilot-cli/issues/2286)

- **Session state can be misleading**  
  Autopilot appearing enabled after resume while still requiring approvals is a trust-breaking bug that needs prompt attention.  
  Relevant: [#4329](https://github.com/github/copilot-cli/issues/4329)

- **Minor UX annoyances lack escape hatches**  
  Even small issues like an unsuppressible “Memory is disabled” line add noise, especially for users who run Copilot in scripts or demo environments.  
  Relevant: [#4332](https://github.com/github/copilot-cli/issues/4332)

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI Community Digest — 2026-08-02

## Today's Highlights
No new release shipped in the last 24 hours. The most notable activity is concentrated in two open PRs: one prevents a startup banner crash on legacy console codecs, and another fixes double-encoded JSON tool-call arguments that break Pydantic validation. Meanwhile, the long-running feature requests for persistent memory (#1283) and remote control (#1282) were both updated, and a new docs issue around OmniRoute provider configuration appeared.

## Releases
No new releases in the last 24 hours.

---

## Hot Issues
Only 3 issues were updated in the last 24 hours, so all are included below.

### [#1283 [enhancement] Feature Request: Memory System — Persistent context across sessions](https://github.com/MoonshotAI/kimi-cli/issues/1283)
- **Author:** CatKang · **Created:** 2026-02-27 · **Updated:** 2026-08-02 · **Comments:** 13 · **👍:** 0
- **Why it matters:** This is a long-running, high-impact request to let Kimi Code CLI remember project patterns, user preferences, and useful context across sessions. If implemented, it would substantially improve agentic workflows by reducing repeated context re-explaining.
- **Community reaction:** 13 comments indicate ongoing discussion and design debate, even without many upvotes.

### [#1282 [enhancement] Feature Request: Remote Control — Continue local sessions from any device](https://github.com/MoonshotAI/kimi-cli/issues/1282)
- **Author:** CatKang · **Created:** 2026-02-27 · **Updated:** 2026-08-02 · **Comments:** 10 · **👍:** 23
- **Why it matters:** Users want to leave their desk and resume the same local CLI session from a phone, tablet, or browser. This is a major workflow-continuity feature for developers who run long-lived agent sessions.
- **Community reaction:** 23 👍 is the strongest signal in this batch, showing clear demand.

### [#2576 [docs] document OmniRoute OpenAI-compatible provider setup](https://github.com/MoonshotAI/kimi-cli/issues/2576)
- **Author:** diegosouzapw · **Created:** 2026-08-01 · **Updated:** 2026-08-01 · **Comments:** 0 · **👍:** 0
- **Why it matters:** Kimi Code CLI supports manually configured OpenAI-compatible providers, but reproducible gateway configuration — base URL, model declaration, env-var mapping — is easy to get wrong. Better docs reduce setup friction for third-party gateways like OmniRoute.
- **Community reaction:** New issue with no discussion yet.

---

## Key PR Progress
Only 2 PRs were updated in the last 24 hours; both are listed.

### [#2577 fix(web,vis): do not crash printing the startup banner on legacy console codecs](https://github.com/MoonshotAI/kimi-cli/pull/2577)
- **Author:** ayaangazali · **Created:** 2026-08-01 · **Updated:** 2026-08-01
- **Description:** Resolves #2532. `print_banner` in `src/kimi_cli/utils/server.py` uses a bare `print()`, while callers in `web/app.py` and `vis/app.py` prepend `U+279C` to each URL. On consoles using codecs like GBK, that character cannot be encoded and crashes startup.
- **Why it matters:** This is a real compatibility bug affecting developers on Chinese Windows/console environments. The fix prevents a full startup crash in web and visualization modes.

### [#2572 fix(kosong): recursively unwrap double-encoded JSON in tool-call arguments](https://github.com/MoonshotAI/kimi-cli/pull/2572)
- **Author:** aalhadxx · **Created:** 2026-07-31 · **Updated:** 2026-08-01
- **Description:** Fixes a class of Pydantic validation failures where providers return `function.arguments` with inner array/object values double-encoded as JSON strings. This affects tool calls such as `SetTodoList`, `ExitPlanMode`, and `StrReplaceFile`.
- **Why it matters:** Double-encoded JSON is a common interoperability issue with OpenAI-compatible providers. This fix makes Kimi Code CLI more robust when calling structured tools through non-Moonshot backends.

---

## Feature Request Trends
Distilled from the active issue set:

- **Persistent Memory System (#1283):** Strong desire for automatic and manual memory that persists project context, patterns, and user instructions across sessions.
- **Remote Session Control (#1282):** Significant demand for local-session continuation from phones, tablets, or browsers.
- **Provider Documentation (#2576):** Users need clearer, reproducible examples for OpenAI-compatible gateway setup — especially base URL, model naming, and environment-variable mapping.

## Developer Pain Points
Recurring frustrations visible in the current data:

- **Console encoding incompatibilities:** Unicode characters like `U+279C` crash startup in legacy codecs such as GBK, especially on Chinese Windows environments.
- **Provider JSON handling:** Some OpenAI-compatible providers double-encode nested arguments, causing Pydantic validation errors for array/object tool parameters.
- **Gateway misconfiguration:** Setting up providers like OmniRoute is error-prone without clear documentation.
- **Context and workflow continuity gaps:** The continued popularity of memory and remote-control requests suggests developers are frustrated by losing session state when switching contexts or devices.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-08-02

## 1. Today's Highlights

The community remains heavily focused on **reliability and session stability**, with the long-running Memory Megathread (#20695) still the most active issue at 121 comments, and a new PR attempting to resolve multiple memory leaks (#16695). On the fix side, v1.18.11 landed today with corrections for MCP SSE reconnect loops and interleaved reasoning field handling, while the most substantive new work targets **truncated tool-call recovery** (#40142) and a **unified marketplace** for skills/agents (#40108). Freeze/hang reports continue to pile up, signaling that session lifecycle robustness is the #1 community-wide concern.

## 2. Releases

**v1.18.11** was published in the last 24 hours. Changes include:

- **Core bugfix:** Stopped MCP SSE connections from getting stuck in reconnect loops after server error responses.
- **Core bugfix:** Fixed provider model configs that use interleaved reasoning fields (e.g., `reasoning_text` or custom field names).
- **Desktop bugfix:** External links now open in the system browser.

https://github.com/anomalyco/opencode/releases

## 3. Hot Issues

1. **[#20695 — Memory Megathread](https://github.com/anomalyco/opencode/issues/20695)** *(121 comments, 94 👍)* — The central tracking thread for memory issues remains the most active discussion. Maintainers explicitly ask for heap snapshots, not LLM-generated guesses. The sheer comment count confirms memory leaks are the single biggest pain point.

2. **[#2156 — Stale LSP errors](https://github.com/anomalyco/opencode/issues/2156)** *(24 comments)* — Agents keep "seeing" diagnostics from before their own fix, causing repeated failed attempts and wasted tokens. A highly relatable correctness issue that erodes trust in the agent loop.

3. **[#24342 — Main & sub-agents randomly freeze indefinitely](https://github.com/anomalyco/opencode/issues/24342)** *(13 comments)* — Sessions freeze with the UI stuck on "thinking" even though LLM inference already terminated. This is the most alarming reliability bug: it's random, reproducible across agent types, and produces no errors.

4. **[#9674 — `<tool_call>` tag fails to render in long sessions](https://github.com/anomalyco/opencode/issues/9674)** *(19 comments, 8 👍)* — With the Oh My Open Code plugin, long conversations eventually hit malformed `<tool_call>` rendering, interrupting the session loop. Points to accumulated state/formatting drift.

5. **[#15988 — "Retry Now" button for rate-limit countdown](https://github.com/anomalyco/opencode/issues/15988)** *(18 comments, 24 👍)* — High-demand UX feature: users want to skip the rate-limit retry countdown manually. The strong reaction suggests rate limiting is a frequent, frustrating interruption.

6. **[#18108 — Truncated tool calls misclassified and unrecoverable](https://github.com/anomalyco/opencode/issues/18108)** *(8 comments)* — When tool-call JSON exceeds `maxOutputTokens`, opencode misclassifies it, gives the model no truncation signal, and enters a doom loop or silently exits. A well-documented, severe flaw in the core agent loop.

7. **[#39861 — Removal of zero-data-retention policy](https://github.com/anomalyco/opencode/issues/39861)** *(7 comments, 15 👍)* — Users noticed the "zero-retention policy" language was quietly removed from OpenCode Go docs. This is generating trust/privacy concern, with 15 upvotes in just days.

8. **[#38255 — Discrepancy between Go usage dashboards](https://github.com/anomalyco/opencode/issues/38255)** *(7 comments)* — Monthly limit shows 100% while granular usage shows ~$10. Billing/usage inconsistency that blocked the user's models entirely.

9. **[#20859 — Subagent models ignored with GitHub Copilot provider](https://github.com/anomalyco/opencode/issues/20859)** *(7 comments)* — Subagent-configured models aren't respected; all Premium Requests get billed to the orchestrator (Claude Opus 4.6). Costly and confusing for Copilot users.

10. **[#10661 — TUI: system theme missing on macOS](https://github.com/anomalyco/opencode/issues/10661)** *(21 comments)* — `/theme` doesn't surface the macOS system theme, breaking dark/light switching. A smaller annoyance, but highly visible to a large macOS audience.

## 4. Key PR Progress

1. **[#16695 — fix: resolve multiple memory leaks causing unbounded growth](https://github.com/anomalyco/opencode/pull/16695)** — Targets the exact problem the community has been rallying around in #20695. Fixes leaks across TUI, core subsystems, and server components. If merged, this could be the digest's most impactful change.

2. **[#40142 — fix(opencode): surface truncated turns instead of ending the loop](https://github.com/anomalyco/opencode/pull/40142)** — Directly addresses the P1 item in #18108: `finishReason: "length"` currently ends the loop silently. Also references the 32K `OUTPUT_TOKEN_MAX` clamp as a contributing factor.

3. **[#40108 — feat(opencode): add unified marketplace](https://github.com/anomalyco/opencode/pull/40108)** — Implements a broader package model and one shared runtime for Desktop, embedded Web, TUI, CLI, and API clients. Could be a major step for skills/agent distribution.

4. **[#39382 — feat(app): add subagents tab to the session side panel](https://github.com/anomalyco/opencode/pull/39382)** — Delivers the long-requested subagent visibility feature (#37267, related to #15223), letting users follow subagent activity without digging for session IDs.

5. **[#35400 — feat(opencode): task signals — structured returns, terse completion, sparse context, wake-on-message](https://github.com/anomalyco/opencode/pull/35400)** — A stacked PR bring four new task-tool capabilities for agent-team coordination. Significant architectural work for multi-agent workflows.

6. **[#36068 — fix: accept Ollama reasoning field in OpenAI Chat deltas](https://github.com/anomalyco/opencode/pull/36068)** — Ollama emits `reasoning` while opencode expected `reasoning_content` (DeepSeek/LM Studio convention); reasoning content was silently discarded. Directly complements today's v1.18.11 interleaved-reasoning fix.

7. **[#40133 — fix(tui): format effect causes](https://github.com/anomalyco/opencode/pull/40133)** — Formats Effect `Cause` values with `Cause.pretty` before falling back to JSON, preventing raw internals like `_id: "Cause"` leaking into TUI/CLI error output. Fixes #34925.

8. **[#40139 — fix(app): preserve selected project workspace](https://github.com/anomalyco/opencode/pull/40139)** — Keeps an explicitly selected sandbox/workspace distinct from its project root during navigation, preventing session-state mixups with copied checkouts.

9. **[#40130 — fix(tui): skip pending undo boundaries](https://github.com/anomalyco/opencode/pull/40130)** — Fixes #39736: user inputs displayed before promotion into materialized session history were creating bad undo boundaries in the V2 TUI.

10. **[#40126 — feat(session): support Gemini image generation](https://github.com/anomalyco/opencode/pull/40126)** — Carries Gemini generated images (inline data) through the V2 session pipeline, which previously dropped them.

## 5. Feature Request Trends

- **Subagent visibility & control** — Repeatedly requested: a TUI subagents view (#15223) and the desktop side-panel tab (#37267 / PR #39382). Users want to monitor and steer subagents without manually navigating session IDs.
- **Rate-limit UX** — "Retry Now" (#15988) and general friction with retry countdowns show rate limiting is a regular workflow interruption.
- **Multi-skill invocation** — #25570 (17 👍) requests the ability to specify multiple skills in a single prompt, critical for multi-framework workflows.
- **Unified marketplace / plugin distribution** — PR #40108 targets #28696, building on earlier CLI-install explorations (#33698). The community wants one shared runtime for Desktop, Web, TUI, CLI, and API.
- **Privacy & data policy transparency** — #39861's swift traction shows users are actively watching OpenCode Go's data-retention commitments.
- **Session persistence & recovery** — Async wake prompts that get silently dropped (#32010), truncated-turn recovery (#18108), and indefinite freezes (#24342) all point to demand for bulletproof session lifecycle handling.

## 6. Developer Pain Points

- **Random freezes and hangs** — The most severe recurring theme: main/sub-agents freezing on "thinking" with no errors (#24342), TUI blank screens (#26217), desktop renderer hangs on large sessions (#28844), and GPU sandbox crashes (#28041).
- **Memory leaks** — The 121-comment Memory Megathread (#20695) plus memory-related bug reports indicate unbounded growth in long-lived sessions is widespread and hard to debug.
- **Agent sees stale/wrong state** — Stale LSP diagnostics (#2156) and misclassified truncated tool calls (#18108) cause agents to loop pointlessly or give up silently.
- **Misleading or inconsistent usage/billing data** — Conflicting Go dashboards (#38255) and Copilot billing to the orchestrator model (#20859) erode trust and create real cost surprises.
- **Config/plugin fragility** — Missing skills after plugin install (#21282), macOS system theme missing (#10661), and `/status` plugin-name breakage on Windows (#40131) indicate integration surface issues across OSes.
- **Post-update regressions** — New-user reports like #40118 ("can't get a response after update") and #40117 suggest release stability is still a recurring concern.

*Data aggregated from 50 open/updated issues and 50 PRs in the last 24 hours.*

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-08-02

## Today's Highlights

Qwen Code shipped stable **v0.21.3** with a significantly upgraded `/review` command: test-plan validation, measured failure attribution, and new verification lenses. Meanwhile, the community is concentrating on context/cache efficiency (prompt-cache reuse, deferred tool discovery) and hardening voice/desktop security, while core fixes landed for leaked JSON tool protocol output and CI reliability. The tracker also shows rising demand for external agent channels (email, private ASR, cloud deployment) and improvements to TUI/session UX.

## Releases

- **v0.21.3** — Enhanced `/review` with test plan validation, measured failure attribution, and new verification lenses ([#8215](https://github.com/QwenLM/qwen-code/pull/8215), [#8218](https://github.com/QwenLM/qwen-code/pull/8218)).
- **v0.21.3-nightly.20260802.184365390** — Added complete TUI keyboard-shortcut reference ([#8327](https://github.com/QwenLM/qwen-code/pull/8327)) and a core fix unblocking history pagination.

## Hot Issues

1. **[#7585 – Direct external context provider profile](https://github.com/QwenLM/qwen-code/issues/7585)** · 11 comments  
   Feature request for a private monorepo integration with two mutually exclusive managed profiles, allowing a single Qwen CLI process to fetch repository-shared context from admin-bound external memory. Still in need-discussion around MCP/extensions.

2. **[#8051 – Bound multi-workspace daemon resource usage](https://github.com/QwenLM/qwen-code/issues/8051)** · 9 comments  
   P2 tracking issue for `qwen serve`: current limits are count-only and don’t cap bytes held by request bodies, WebSocket assembly, or other in-memory state. Important for production daemon reliability.

3. **[#8123 – Desktop client cannot reference correct file](https://github.com/QwenLM/qwen-code/issues/8123)** · 5 comments  
   Desktop v0.5.5 `@` search misses existing files, e.g. `KuaiShouOrderService.java`, breaking a core IDE-like workflow.

4. **[#5971 – TUI window scroll/refresh flooding on Linux](https://github.com/QwenLM/qwen-code/issues/5971)** · 4 comments  
   Long TUI sessions scroll from the first message on every large output instead of staying at the latest output. P2 rendering issue affecting Linux users.

5. **[#8281 – Add an Email channel with IMAP/SMTP support](https://github.com/QwenLM/qwen-code/issues/8281)** · 4 comments  
   Asks for a provider-neutral email channel so users can talk to a Qwen Code agent through a dedicated mailbox — another sign of expansion beyond terminal/IDE surfaces.

6. **[#8207 – JSON-style tool call arguments leak as plain text](https://github.com/QwenLM/qwen-code/issues/8207)** · 3 comments · closed  
   In a production DataAgent session, the model emitted structured tool arguments as plain text instead of a `tool_call`, breaking subagent dispatch. Core protocol bug; fix addressed in [#8301](https://github.com/QwenLM/qwen-code/pull/8301).

7. **[#8358 – AutoFix skips required defects in otherwise approved feedback](https://github.com/QwenLM/qwen-code/issues/8358)** · 3 comments · closed  
   A trusted review comment gave `APPROVE` while also documenting a probe-confirmed defect, but AutoFix ignored the required fixes. Raises trust concerns for automated review/autofix pipelines.

8. **[#8279 – Chat compression reusing the main prompt-cache prefix via fork?](https://github.com/QwenLM/qwen-code/issues/8279)** · 3 comments  
   Design-only discussion on whether compressed chat can fork from the main session’s cached prefix and whether the tradeoffs are worthwhile. Key context-performance topic.

9. **[#8286 – Support explicitly trusted private ASR base URLs](https://github.com/QwenLM/qwen-code/issues/8286)** · 3 comments  
   Requests an opt-in setting for internal/private voice-model endpoints, including HTTP within isolated networks. Security-sensitive but needed for trusted managed deployments.

10. **[#8356 – After APIUserAbortError, subsequent turns not written to session transcript](https://github.com/QwenLM/qwen-code/issues/8356)** · 2 comments  
   On Windows with an OpenAI-compatible relay, aborting a turn stops future turns from being persisted to the local session transcript — a real auditability/session-management bug.

## Key PR Progress

1. **[#8276 – Preserve prompt cache across deferred tool discovery](https://github.com/QwenLM/qwen-code/pull/8276)**  
   Keeps main-session tool declarations and cached system instruction stable while deferred MCP tools are discovered. `tool_search` now presents schemas in model-visible results, with a stable `deferred_tool_call` bridge. Directly targets the cache-busting problem from [#4777](https://github.com/QwenLM/qwen-code/issues/4777).

2. **[#8301 – Retry leaked JSON tool protocol output](https://github.com/QwenLM/qwen-code/pull/8301)**  
   Prevents a JSON-array tool payload followed by leaked `</parameter></function>` tags from reaching UI, conversation history, or session recording. The failed attempt is routed through the existing protocol-leak retry path.

3. **[#8274 – Fork from any conversation](https://github.com/QwenLM/qwen-code/pull/8274)**  
   Makes session branching target an earlier Assistant response instead of only the latest state, accounting for tool calls, cancellations, metadata, transcript pagination, rewinds, and concurrent activity.

4. **[#8332 – CLI audio bridge for attachments](https://github.com/QwenLM/qwen-code/pull/8332)**  
   Adds transcription of audio attachments via the configured batch voice model when the primary model doesn’t support audio. Cover interactive/headless `@` attachments and ACP audio prompts; transcription is explicitly marked as untrusted.

5. **[#8368 – Add Kimi and Xiaomi MiMo providers](https://github.com/QwenLM/qwen-code/pull/8368)**  
   Adds first-class `/auth` third-party presets: Kimi with Coding Plan / API Key (China / International), and Xiaomi MiMo with pay-as-you-go plus regional variants.

6. **[#8180 – Track tool execution outcomes in telemetry](https://github.com/QwenLM/qwen-code/pull/8180)**  
   Introduces `executionStatus` as a separate signal from terminal tool-call status, recording whether `invocation.execute()` was entered and whether it succeeded. Valuable for diagnosing tool-level failures.

7. **[#8341 – Configurable sub-session concurrency caps](https://github.com/QwenLM/qwen-code/pull/8341)**  
   Adds `serve.maxConcurrentSubSessionsPerCaller` and `serve.maxConcurrentSubSessionsTotal` settings, and raises defaults from 5→16 per caller and 20→24 total for larger parallel sub-agent workloads.

8. **[#8320 – Cooperative pause/resume for Dynamic Workflows](https://github.com/QwenLM/qwen-code/pull/8320)**  
   Pause-aware scheduler stops dequeuing new agent dispatches, lets in-flight work converge, and holds results at a gate until resume. Cancellation rejects queued work cleanly.

9. **[#7957 – Paste copied Windows files](https://github.com/QwenLM/qwen-code/pull/7957)**  
   Adds Windows Explorer copy/paste support through the existing clipboard shortcut and empty-terminal paste path. Image-only selections become attachments; other files insert their paths.

10. **[#8373 – Reconcile ECS runners after updater changes](https://github.com/QwenLM/qwen-code/pull/8373)**  
   Closes [#8371](https://github.com/QwenLM/qwen-code/issues/8371). Adds a push trigger for the Update ECS Runner Qwen workflow when the updater workflow itself changes, plus a regression test for the scoped trigger.

## Feature Request Trends

- **Context & cost efficiency** is a dominant theme: prompt-cache hit-rate telemetry ([#8284](https://github.com/QwenLM/qwen-code/issues/8284)), fork-based compression cache reuse ([#8279](https://github.com/QwenLM/qwen-code/issues/8279)), and eliminating deferred-tool cache busting ([#4777](https://github.com/QwenLM/qwen-code/issues/4777)).
- **Expanding agent channels beyond the terminal**: email via IMAP/SMTP ([#8281](https://github.com/QwenLM/qwen-code/issues/8281)), direct external context MCP profiles ([#7585](https://github.com/QwenLM/qwen-code/issues/7585)), and safe cloud deployment integrations ([#8291](https://github.com/QwenLM/qwen-code/issues/8291)).
- **Private/voice security** is growing: trusted private ASR base URLs ([#8286](https://github.com/QwenLM/qwen-code/issues/8286)), syncing CLI/Desktop address guards ([#8361](https://github.com/QwenLM/qwen-code/issues/8361)), and gating Desktop voice security tests on PRs ([#8360](https://github.com/QwenLM/qwen-code/issues/8360)).
- **Agent/workflow control**: better sub-agent detail visibility ([#3758](https://github.com/QwenLM/qwen-code/issues/3758)), fork-from-any-conversation ([#8274](https://github.com/QwenLM/qwen-code/pull/8274)), and cooperative workflow pause/resume ([#8320](https://github.com/QwenLM/qwen-code/pull/8320)).
- **Extensibility & polish**: installing extensions directly from the qwen-code repo ([#2635](https://github.com/QwenLM/qwen-code/issues/2635)), a broader “Better UI” TUI customization pass ([#7278](https://github.com/QwenLM/qwen-code/issues/7278)), and Web Shell image drag-and-drop ([#8321](https://github.com/QwenLM/qwen-code/issues/8321)).

## Developer Pain Points

- **Tool protocol and stream reliability**: JSON tool-call argument leaks ([#8207](https://github.com/QwenLM/qwen-code/issues/8207)), `AskUserQuestion` empty-response errors ([#3804](https://github.com/QwenLM/qwen-code/issues/3804)), and leaked protocol tags ([#8237](https://github.com/QwenLM/qwen-code/issues/8207)) are recurring failure classes.
- **Session persistence after interruption**: aborts causing transcript loss ([#8356](https://github.com/QwenLM/qwen-code/issues/8356)), random “User cancelled the request” ([#651](https://github.com/QwenLM/qwen-code/issues/651)), and confusion about which files belong to a session ([#7966](https://github.com/QwenLM/qwen-code/issues/7966)).
- **TUI/desktop UX friction**: Linux scroll/refresh flooding ([#5971](https://github.com/QwenLM/qwen-code/issues/5971)), unselectable statusline text in Virtualized History ([#8131](https://github.com/QwenLM/qwen-code/issues/8131)), desktop `@`-reference misses ([#8123](https://github.com/QwenLM/qwen-code/issues/8123)), and “cannot auto read/write files” reports ([#1409](https://github.com/QwenLM/qwen-code/issues/1409)).
- **CI/automation trust**: AutoFix skipping required defects ([#8358](https://github.com/QwenLM/qwen-code/issues/8358)), stale ECS runners ([#8371](https://github.com/QwenLM/qwen-code/issues/8371)), and local startup failures like missing `tiktoken_bg.wasm` ([#1328](https://github.com/QwenLM/qwen-code/issues/1328)).
- **Prompt-cache/performance regressions**: deferred MCP discovery busting prompt cache ([#4777](https://github.com/QwenLM/qwen-code/issues/4777)) and perceived model degradation after version updates ([#5029](https://github.com/QwenLM/qwen-code/issues/5029)) remain high-visibility performance complaints.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar).*