# AI CLI Tools Community Digest 2026-08-03

> Generated: 2026-08-03 15:58 UTC | Tools covered: 7

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

# Cross-Tool AI CLI Comparison Report — 2026-08-03

## 1. Ecosystem Overview

The AI CLI tool landscape on 2026-08-03 shows a mature but uneven ecosystem: seven major tools are all actively gathering community feedback, yet only Gemini CLI and Qwen Code shipped releases in the window. Engineering velocity diverges sharply — Codex, Gemini, OpenCode, and Qwen each moved ~10 PRs, while Copilot CLI moved zero and Claude Code only two documentation PRs. Recurring community pain is no longer about raw model capability but about session data integrity, billing/auth trust, MCP interoperability, and Windows reliability. Across every tool, users are asking for the same underlying guarantees: persistent, resumable, auditable, and cost-transparent agent sessions.

## 2. Activity Comparison

| Tool | Hot Issues Tracked | PR Activity | Release Status |
|---|---|---|---|
| Claude Code | 10 (top: 56 comments on #79337; 82👍 on #29355) | 2 open, docs-only | None |
| OpenAI Codex | 10 (1 closed; top: 49 comments, 122👍 on #35058) | 10 closed/landed, refactor-heavy | None |
| Gemini CLI | 10 (6 P1; top: 24 comments on #1689) | 10 (defensive fixes incl. 1 SSRF security fix) | 1 nightly (v0.55.0-nightly.20260803) |
| GitHub Copilot CLI | 10 highlighted of 23 updated (two 20👍 BYOK issues) | 0 | None |
| Kimi Code CLI | 2 updated | 9 (6 open / 3 closed) | None |
| OpenCode | 10 (top: 201👍 on #6231) | 10 (features + fixes) | None |
| Qwen Code | 10 (top: 11 comments on #8102) | 10 (feature-heavy) | v0.21.4 stable + 1 nightly |

## 3. Shared Feature Directions

| Direction | Tools (representative refs) | Specific Needs |
|---|---|---|
| **Session continuity & data safety** | All 7 — Kimi (#1283, #1282), Qwen (#8400), OpenCode (#39560), Copilot (#4078, #4340), Claude Code (#63025, #77915), Codex (#21211, #35458), Gemini (#28653) | Crash-safe session storage, no silent deletions, cross-device resume, model-preserving restore, bounded metadata growth |
| **Multi-model / BYOK / live model switching** | Copilot (#3282, #3709), OpenCode (#6231, 201👍), Claude Code (#38135), Codex (#35097), Qwen (#8472) | Auto-discovery from OpenAI-compatible endpoints, `/model` picker including local/BYOK providers, correct capability metadata, per-request model override |
| **MCP lifecycle, auth & tool exposure** | Codex (#4955, #14144), Copilot (#4346), OpenCode (#33027), Qwen (#8433) | Per-server restart without CLI restart, live OAuth reauth, CI-compatible registry policy fetch, guaranteed exposure of connected tools to the agent |
| **Subagent trust & governance** | Gemini (#22323, #21409, #22093), OpenCode (#17570, #5408), Codex (#35097), Qwen (#8102) | Honest success/failure status, permission enforcement, per-subagent model assignment, deterministic tool-execution boundaries |
| **Cost & prompt-cache transparency** | Qwen (#8452, #8418, #8471), OpenCode (#40291), Kimi (#2535), Codex (#36641, #36715) | Cache-friendly compaction, per-run cost ledgers, cached-vs-fresh token breakdowns, provider-reported budget units |
| **Cross-platform parity (esp. Windows)** | Codex (#29499, #28855, #35420, #9615, #25178), Gemini (#28229), Copilot (#4328), Kimi (#2577), Qwen (#8400, #8317), Claude Code (#73568 Linux) | No WMI CPU spikes, WSL2 keybinding fidelity, legacy-console codec support, OneDrive-safe workspaces, Linux model-gating parity |

## 4. Differentiation Analysis

| Tool | Signature Focus | Target Users | Technical Character |
|---|---|---|---|
| **Claude Code** | Plan entitlements, Desktop/Cowork unification, plugin ecosystem | Enterprise & paid individual developers | Closed core + marketplace/hooks; billing trust is the single most visible risk; low code velocity this window |
| **OpenAI Codex** | IDE/deep tool integration, MCP resource architecture, agent SDK/telemetry | VS Code-centric developers, Windows enterprise | Strongest internal engineering discipline (10 merged refactors), but Windows maturity gaps dominate user pain |
| **Gemini CLI** | Subagent reliability, shell/process handling, security hardening | Google-ecosystem developers, agentic-shell users | Fast defensive iteration; nightly releases; mature P1/P2 triage and security response (SSRF fix, session-retention collisions) |
| **GitHub Copilot CLI** | GitHub-native CI/ACP integration, BYOK, scheduled agents | GitHub-centric teams, org admins | High demand signal (23 issues updated, two 20👍 BYOK issues) with zero visible code movement — a demand/supply gap |
| **Kimi Code CLI** | Session continuity vision (Memory System, Remote Control), Moonshot API fidelity | Moonshot/Kimi API users, Chinese-language developers | Smallest community, but clear product direction; active external contributor bug-fix series (ayaangazali) |
| **OpenCode** | Provider-agnostic open source, plugin hooks, unified marketplace, TUI | Self-hosters, local-model users (LM Studio/Ollama), community contributors | Strongest community feature demand (201👍); fast feature growth with operational friction (Bun installs, `/tmp` leaks, Go billing) |
| **Qwen Code** | Desktop/Web Shell maturity, multi-channel sessions (DingTalk/Feishu/WeCom), cost engineering | Qwen-model teams, Chinese-market and multi-channel users | Dual release track (stable + nightly); release-ready desktop app; cost ledger and cache-sharing mindset |

## 5. Community Momentum & Maturity

- **Highest engagement**: OpenCode leads feature demand (201👍 on #6231), Codex leads issue visibility (122👍, 49 comments on #35058), Claude Code leads comment volume (56 comments on #79337), Copilot had the broadest issue churn (23 updated in 24h).
- **Fastest shippers**: Qwen (stable + nightly + 10 PRs), Codex (10 landed PRs), Gemini (nightly + 10 PRs), OpenCode (10 PRs).
- **Slower shippers**: Copilot CLI (0 PRs) and Claude Code (2 docs-only PRs) — both retain high community attention but show no code-level response this window.
- **Maturity read**: Codex and Gemini demonstrate the most mature engineering processes — refactor quality, regression tests, and security fixes are landing systematically. Qwen is transitioning from CLI to platform (desktop lifecycle, multi-channel visibility, cost ledger). Claude Code shows how an enterprise-scale trust surface can be dominated by a single billing/entitlements regression. Kimi remains small but purposeful, with a coherent session-continuity roadmap and active external contributors.

## 6. Trend Signals

1. **Data integrity is the new trust frontier.** Silent session deletion (Qwen #8400), state loss after updates (OpenCode #39560), SSH project-state corruption (Claude #63025), and 165 GiB session bloat (Codex #35458) show that users now judge tools by whether their work survives restarts, migrations, and crashes. Vendors that treat session storage as journaled, crash-safe infrastructure will differentiate.

2. **Billing and entitlements are the top churn risk.** Claude Max users blocked from Fable 5 (#79337), OpenCode Go activation failures, Gemini OAuth plan rejections (#28229), and Copilot CI token 403s (#4346) indicate that subscription integrity is as important as model quality for paid adoption.

3. **MCP is becoming a production contract, not a feature.** Per-server restarts, live OAuth reauth, CI-compatible policy fetch, and guaranteed tool exposure are now explicit requirements. Tools that cannot manage MCP server lifecycles cleanly will lose MCP-heavy workflows.

4. **BYOK/multi-model is table stakes.** OpenCode's 201👍 auto-discovery request, Copilot's two 20👍 BYOK issues, and Claude's multi-provider request converge on one expectation: users want a provider-agnostic runtime with live model switching and correct capability metadata.

5. **Windows remains the largest underserved platform.** WMI CPU spikes, system input lag, OneDrive disconnects, WSL2 keybinding misreads, GBK console crashes, and Windows desktop session deletion form the single largest recurring cluster across tools. Vendors investing in Windows reliability will capture an underserved enterprise segment.

6. **Cost observability is becoming a purchase criterion.** Qwen's cost ledger, Codex's rollout budget units, OpenCode's cache-token breakdown requests, and Kimi's cache-key scoping all point to per-run cost attribution as a requirement for scale adoption.

7. **Agent governance is the next differentiator.** Subagents reporting false success (Gemini #22323), ignored permission settings (#22093), and requests for deterministic tool boundaries (Qwen #8102) indicate that the market is moving from "can the agent code" to "can I trust what the agent did and why."

---

**Bottom line for decision-makers**: No single tool dominates across all dimensions. Codex and Qwen are the most reliable engineering bets this window; OpenCode has the strongest open-source community pull; Copilot CLI and Claude Code have the largest demand/expectation-to-delivery gap. Prioritize session recovery behavior, entitlement handling, and Windows support in any evaluation, as these are the areas generating the most user pain across the entire ecosystem.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report
*Data source: github.com/anthropics/skills | Snapshot: 2026-08-03*

---

## 1. Top Skills Ranking

The most-discussed PRs are dominated by fixes to the `skill-creator` toolchain, followed by a handful of substantive new Skills. All PRs below remain **open** as of the snapshot date.

1. **skill-creator evaluation pipeline fixes** — [#1298](https://github.com/anthropics/skills/pull/1298), plus sibling PRs [#1099](https://github.com/anthropics/skills/pull/1099), [#1050](https://github.com/anthropics/skills/pull/1050), [#1323](https://github.com/anthropics/skills/pull/1323), [#1261](https://github.com/anthropics/skills/pull/1261), [#539](https://github.com/anthropics/skills/pull/539) — **Open**  
   The single hottest topic in the repo: `run_eval.py` reports `recall=0%` for every description (10+ independent reproductions, [Issue #556](https://github.com/anthropics/skills/issues/556)), so the description-optimization loop is optimizing against noise. The fix cluster addresses trigger detection, Windows subprocess/pipe handling (`claude.cmd` vs `PATHEXT`, cp1252 encoding), isolating eval command files from the live project registry, and YAML frontmatter validation. Highest comment volume of any topic in the repository.

2. **[Add document-typography skill](https://github.com/anthropics/skills/pull/514)** — Open  
   Typographic quality control for AI-generated documents: orphan word wrap, widow paragraphs, and numbering misalignment. Discussion highlights that these defects affect virtually every document Claude generates and that users rarely request typography fixes explicitly — making the skill a high-leverage default-quality guard.

3. **[fix(pdf): correct case-sensitive file references](https://github.com/anthropics/skills/pull/538)** — Open  
   Fixes 8 mismatches where `SKILL.md` references `REFERENCE.md`/`FORMS.md` in uppercase while the actual files are lowercase — breaking the PDF skill on case-sensitive filesystems (Linux/macOS).

4. **[Add ODT skill](https://github.com/anthropics/skills/pull/486)** — Open  
   Full OpenDocument support: create, fill templates, read, and convert `.odt`/`.ods` to HTML. Notably broad trigger coverage (ODT, ODS, ODF, OpenDocument, LibreOffice).

5. **[Improve frontend-design skill clarity and actionability](https://github.com/anthropics/skills/pull/210)** — Open  
   A revision PR focused on making every instruction executable within a single conversation and specific enough to steer behavior deterministically — a recurring theme in the community's quality bar for Skills.

6. **[Add skill-quality-analyzer and skill-security-analyzer](https://github.com/anthropics/skills/pull/83)** — Open  
   Two meta-skills: a five-dimension quality analyzer (structure & documentation 20%, examples, resources, etc.) and a security analyzer for community-submitted Skills. Directly responsive to the trust concerns raised in Issue #492.

7. **[feat(skills): add self-audit](https://github.com/anthropics/skills/pull/1367)** — Open  
   A delivery-time audit skill: mechanical verification that every claimed output file exists, then a four-dimension reasoning audit ordered by damage severity. Universal across any project/model.

8. **[Add testing-patterns skill](https://github.com/anthropics/skills/pull/723)** — Open  
   A comprehensive testing-stack skill: Testing Trophy philosophy, unit-test AAA patterns, React Testing Library guidance, test naming, pure functions, and edge cases.

---

## 2. Community Demand Trends

Distilled from the most-commented Issues:

- **Security & trust boundaries (dominant concern)** — [Issue #492](https://github.com/anthropics/skills/issues/492) (43 comments) is the most active Issue in the repo: community Skills distributed under the `anthropic/` namespace enable trust-boundary abuse, where users may grant elevated permissions to non-official Skills. Demand is for provenance verification and official/community separation.

- **Enterprise skill distribution** — [Issue #228](https://github.com/anthropics/skills/issues/228) (16 comments, 8 👍): org-wide skill sharing in Claude.ai — shared skill libraries and direct sharing links instead of manual `.skill` file transfer.

- **Toolchain reliability** — [Issue #556](https://github.com/anthropics/skills/issues/556) (12 comments): the `run_eval.py` 0% trigger-rate bug; [Issue #1061](https://github.com/anthropics/skills/issues/1061): Windows incompatibility (subprocess `PATHEXT`, cp1252 encoding, `select` on pipes); [Issue #1169](https://github.com/anthropics/skills/issues/1169): recall=0% even on literal slash-command queries. The community expects the skill-authoring tooling to actually work.

- **Context-window efficiency** — [Issue #1487](https://github.com/anthropics/skills/issues/1487): the `claude-api` skill eagerly injects ~156k tokens in one tool call; [Issue #189](https://github.com/anthropics/skills/issues/189) (9 👍): `document-skills` and `example-skills` plugins install identical content, duplicating skills in the context window.

- **Anticipated new Skill directions** — Proposals with active discussion: **compact-memory** (symbolic notation for agent state, [#1329](https://github.com/anthropics/skills/issues/1329)), **agent-governance** (policy enforcement, threat detection, audit trails, [#412](https://github.com/anthropics/skills/issues/412)), and a **reasoning quality-gate pipeline** (pre-task calibration → adversarial review → delivery verification, [#1385](https://github.com/anthropics/skills/issues/1385)).

---

## 3. High-Potential Pending Skills

Active, unmerged PRs that may land soon (selected for recency of updates and substantive contributions):

- **[Add color-expert skill](https://github.com/anthropics/skills/pull/1302)** — Open, updated 2026-07-21  
  Self-contained color expertise: ISCC-NBS/Munsell/XKCD/RAL naming systems, and a "what to use when" table for color spaces (OKLCH for scales, OKLAB for gradients, CAM16 for perception).

- **[Add plan-file-hygiene skill](https://github.com/anthropics/skills/pull/1479)** — Open, updated 2026-07-27  
  Addresses the lifecycle gap of accumulating planning artifacts; the most recently active new-skill PR.

- **[Add pyxel skill](https://github.com/anthropics/skills/pull/525)** — Open, updated 2026-07-15  
  Retro/pixel-art/8-bit game development via the `pyxel-mcp` server, with a write → run-and-capture → inspect → iterate workflow.

- **[feat(skills): add self-audit](https://github.com/anthropics/skills/pull/1367)** — Open, updated 2026-07-02  
  Mechanical verification + four-dimension reasoning quality gate (see Top Skills Ranking).

- **[Add testing-patterns skill](https://github.com/anthropics/skills/pull/723)** — Open, updated 2026-04-21  
  Full-stack testing guidance; one of the most broadly applicable pending skills.

- **[Add ODT skill](https://github.com/anthropics/skills/pull/486)** and **[Add document-typography skill](https://github.com/anthropics/skills/pull/514)** — Open; document-format coverage remains a clear community priority.

---

## 4. Skills Ecosystem Insight

Across both PRs and Issues, the community's most concentrated demand is **not for any single domain skill, but for trustworthy, reliable, and lightweight skill infrastructure itself** — repairing the `skill-creator` evaluation loop, securing the trust boundary of community-published Skills, and eliminating context-window bloat.

---

# Claude Code Community Digest — 2026-08-03

## Today’s Highlights

No new releases landed in the last 24 hours; the community’s attention is concentrated on a high-severity billing/entitlements bug affecting **Max plan users running Fable 5** (#79337), plus a long-standing Desktop app login loop (#22685). The only PR activity is documentation-focused, adding guidance for plugin developers around `MessageDisplay` hooks and `skipLfs` marketplace sources.

## Hot Issues

- [**#79337 — Fable 5 prompts “usage credits required” on Max plan**](https://github.com/anthropics/claude-code/issues/79337)  
  56 comments / 21 👍. Max subscribers report that Fable 5 is silently downgraded to Opus 4.8 on the day it became standard on Max. This is currently the most active issue and a major trust concern for paid users.

- [**#22685 — Claude Desktop App stuck in login loop with “Invalid authorization”**](https://github.com/anthropics/claude-code/issues/22685)  
  31 comments / 22 👍. macOS Desktop users cannot authenticate via magic link; app becomes completely unusable. High community engagement, open for months.

- [**#77915 — Remote Control disconnect fails with “Cannot read properties of undefined (reading 'session_url')”**](https://github.com/anthropics/claude-code/issues/77915)  
  23 comments. Toggle-off path for Remote Control lacks a null guard. Reproducible on Windows and macOS.

- [**#29355 — Feature request: programmatically rename sessions**](https://github.com/anthropics/claude-code/issues/29355)  
  12 comments / 82 👍. Users want hooks/tools to auto-rename sessions from ticket IDs or other context. Strongest signal of demand among feature requests.

- [**#73568 — yukonSilver marked unsupported on official Linux Cowork build**](https://github.com/anthropics/claude-code/issues/73568)  
  14 comments. KVM and vsock are confirmed working, but the Linux build still rejects the model. Frustrates Linux users on paid plans.

- [**#11791 — Browser automation tools incompatible with web sandbox proxy**](https://github.com/anthropics/claude-code/issues/11791)  
  10 comments / 16 👍. Playwright/Puppeteer/Selenium cannot run in the web sandbox because HTTPS CONNECT tunneling is unsupported. Users want this documented or fixed.

- [**#55842 — Unified user state across Cowork and Claude chat**](https://github.com/anthropics/claude-code/issues/55842)  
  9 comments. Request for shared memory, files, skills, and connectors across Cowork, web, and mobile surfaces.

- [**#63025 — SSH Remote: `projects` field becomes null after desktop restart**](https://github.com/anthropics/claude-code/issues/63025)  
  7 comments / 5 👍. UI shows “No messages yet” despite intact `.jsonl` transcripts — a worrying data-loss symptom for remote sessions.

- [**#52646 — “Prompt too long” caused by inflated token usage (Windows)**](https://github.com/anthropics/claude-code/issues/52646)  
  8 comments. Closed as stale, but the problem of extreme token overcounting generated meaningful discussion while open.

- [**#80973 — Cannot update payment method; support sees account as Free instead of Max 5x**](https://github.com/anthropics/claude-code/issues/80973)  
  3 comments. Billing portal connection fails and support tooling reports incorrect plan status. Small comment count, but high-impact for affected users.

## Key PR Progress

Only two PRs were updated in the last 24 hours; both are documentation-only and open:

- [**#83374 — docs(plugin-dev): add MessageDisplay hook guidance**](https://github.com/anthropics/claude-code/pull/83374)  
  Documents the `MessageDisplay` hook event in the bundled Hook Development skill, including streaming behavior. Useful for plugin authors.

- [**#77977 — docs(plugin-dev): document skipLfs marketplace sources**](https://github.com/anthropics/claude-code/pull/77977)  
  Adds examples for `skipLfs` in GitHub and Git marketplace sources, addressing plugin installs involving Git LFS. Refs #63035.

No code-changing PRs moved during the window.

## Feature Request Trends

- **Session lifecycle control**: Programmatic session renaming (#29355), exchange/turn counts in statusline JSON (#42168), configurable idle threshold for session recap (#55509), and long-running project context persistence (#55505).
- **Provider/auth flexibility**: Support for multiple providers at once (#38135) and explicit auth source/profile resolution (#45648).
- **Desktop/Cowork unification**: Shared user state, settings parity with claude.ai, and cross-surface memory/skills/connectors (#55842, #55722).
- **Sandbox tooling compatibility**: Browser automation support inside the web sandbox (#11791).

## Developer Pain Points

- **Billing/auth failures dominate**: Max users being blocked from Fable 5, payment method updates failing, and Desktop login loops are the most commented pain points this week.
- **State corruption and data loss**: SSH remote `~/.claude.json` corruption and Remote Control disconnect crashes raise concerns about session persistence reliability.
- **Platform gaps**: Linux Cowork model restrictions, web sandbox limitations, and Windows-specific token-counting bugs create inconsistent experiences across platforms.
- **Long-lived stale issues**: Many older reports are being closed as stale or duplicate after months, leaving users without clear resolution paths.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-08-03

## Today's Highlights
No new Codex release landed in the last 24 hours. Community attention is concentrated on Windows reliability, thread/session performance, and a few high-impact UI crashes. On the engineering side, a large batch of refactors and fixes landed around MCP resource handling, `apply_patch` execution, rollout budget units, and SQLite thread metadata preservation.

## Releases
No new releases were published in the last 24 hours.

## Hot Issues

- **[#35058 — Codex Diff crashes with “Oops, an error has occurred” in VS Code on macOS](https://github.com/openai/codex/issues/35058)** (CLOSED, 49 comments, 122 👍)  
  The Codex Diff tab becomes unusable after file edits, even in a freshly opened workspace. The high 👍 count makes this the most disruptive review-workflow issue in the current batch.

- **[#35420 — Work/Codex stream repeatedly disconnects with OneDrive-backed workspaces on Windows](https://github.com/openai/codex/issues/35420)** (OPEN, 28 comments)  
  Requests fail with `stream disconnected before completion` when the workspace is on OneDrive and OneDrive is degraded. This affects ChatGPT Work/Codex connectivity on Windows.

- **[#21211 — Thread navigation/loading slows from unbounded metadata and eager large-history hydration](https://github.com/openai/codex/issues/21211)** (OPEN, 22 comments)  
  Supersedes #21154; thread-list navigation degrades as SQLite metadata grows, and eager history hydration makes loading slower in long-running sessions.

- **[#25178 — Windows Computer Use screenshot fails on Windows 10 22H2 when `SetIsBorderRequired` is called](https://github.com/openai/codex/issues/25178)** (OPEN, 22 comments, 12 👍)  
  `get_window_state` calls requesting screenshots fail with `0x80004002`, blocking Windows desktop automation workflows.

- **[#29499 — Codex triggers high CPU usage in WMI Provider Host on Windows after startup](https://github.com/openai/codex/issues/29499)** (OPEN, 16 comments, 23 👍)  
  The desktop app causes sustained `WmiPrvSE.exe` CPU usage after launch, even with a clean environment.

- **[#28855 — Codex Desktop causes intermittent system input lag on Windows](https://github.com/openai/codex/issues/28855)** (OPEN, 15 comments, 18 👍)  
  Users report whole-system mouse and keyboard lag while Codex is open, despite clean logs and disabled plugins.

- **[#9615 — Codex VS Code Extension becomes all blank](https://github.com/openai/codex/issues/9615)** (OPEN, 15 comments, 14 👍)  
  A long-running Windows papercut where the extension UI goes fully blank across models. The continued comments show it is still affecting users.

- **[#29645 — Codex App built-in `image_gen` times out after ~240s for ordinary card-art prompts](https://github.com/openai/codex/issues/29645)** (OPEN, 14 comments)  
  Simple prompts succeed, but moderately complex image prompts consistently time out around four minutes.

- **[#35097 — `gpt-5.6-luna` is marked MultiAgent V1, so V2 `spawn_agent` rejects it](https://github.com/openai/codex/issues/35097)** (OPEN, 13 comments, 37 👍)  
  A model-catalog mismatch prevents `gpt-5.6-luna` from being used as a subagent under MultiAgent V2. High community interest in correct model capabilities.

- **[#14144 — MCP OAuth reauth succeeds but active session still uses stale refresh token (`invalid_grant`)](https://github.com/openai/codex/issues/14144)** (OPEN, 11 comments, 13 👍)  
  Re-authenticating an OAuth MCP server does not take effect in the current session; the agent keeps failing with `invalid_grant` until restart.

## Key PR Progress

- **[#36745 — Consolidate `apply_patch` runtime execution](https://github.com/openai/codex/pull/36745)** (CLOSED)  
  Verified patches from direct tool calls and intercepted shell commands now share a unified execution helper, simplifying permission resolution and safety preparation.

- **[#36740 — Store turn skill state in extension data](https://github.com/openai/codex/pull/36740)** (CLOSED)  
  Per-turn host skill snapshots are now stored in `ExtensionData` and exposed via `TurnContext::skills_snapshot`, with implicit skill dedup kept turn-scoped.

- **[#36734 — Deduplicate MCP resource list handling](https://github.com/openai/codex/pull/36734)** (CLOSED)  
  Shares argument normalization, server selection, cursor validation, and pagination between `list_mcp_resources` and `list_mcp_resource_templates`.

- **[#36716 — Deduplicate MCP resource operation handling](https://github.com/openai/codex/pull/36716)** (CLOSED)  
  Adds a shared runner for MCP resource lifecycle events, output serialization, truncation, timing, and error handling.

- **[#36729 — Correlate code mode tool analytics with model responses](https://github.com/openai/codex/pull/36729)** (CLOSED)  
  Emits analytics for code-mode `exec` and `wait` calls, including duration and terminal status, tied to originating and subsequent model response IDs.

- **[#36641 — Capture rollout budget units from response usage](https://github.com/openai/codex/pull/36641)** (CLOSED)  
  Parses provider-reported `codex_rollout_budget_units` from Responses API usage into `TokenUsage`, without exposing it in protocol/TypeScript surfaces.

- **[#36715 — Use provider-reported rollout budget units](https://github.com/openai/codex/pull/36715)** (CLOSED)  
  Charges `codex_rollout_budget_units` against the shared rollout budget, falls back to weighted token accounting, and rejects non-finite or negative values.

- **[#36632 — Preserve SQLite thread metadata during goal mutations](https://github.com/openai/codex/pull/36632)** (CLOSED)  
  Prevents setting or clearing a thread goal from overwriting SQLite-only metadata such as thread previews; skips reconciliation when SQLite already references the same execution.

- **[#36744 — Store the extension registry directly in its builder](https://github.com/openai/codex/pull/36744)** (CLOSED)  
  Refactors `ExtensionRegistryBuilder` to wrap and return an actual `ExtensionRegistry`, removing field-copying complexity.

- **[#36742 — Simplify contextual user fragment registration](https://github.com/openai/codex/pull/36742)** (CLOSED)  
  Replaces type-erased fragment registration with a static list of `matches_text` function pointers, reducing abstraction overhead.

## Feature Request Trends

- **MCP lifecycle and auth controls**  
  Users want to restart individual MCP servers without restarting the whole CLI session ([#4955](https://github.com/openai/codex/issues/4955)) and want MCP OAuth reauth to apply to active sessions immediately ([#14144](https://github.com/openai/codex/issues/14144)).

- **Deeper hooks and automation surfaces**  
  Requests include a full `TaskCompleted` hook event ([#17333](https://github.com/openai/codex/issues/17333)) and exposing TUI prompts such as “Implement this plan?” to the external hook system ([#19328](https://github.com/openai/codex/issues/19328)).

- **Richer multimodal input and tooling**  
  Direct clipboard image paste into Codex CLI ([#19143](https://github.com/openai/codex/issues/19143)) and more reliable built-in image generation ([#29645](https://github.com/openai/codex/issues/29645)) are both recurring asks.

- **Model compatibility and catalog transparency**  
  Developers want correct MultiAgent capability flags ([#35097](https://github.com/openai/codex/issues/35097)), cleaner model-picker entries ([#35581](https://github.com/openai/codex/issues/35581)), and custom-model support for DeepSeek-style `reasoning_content` ([#24500](https://github.com/openai/codex/issues/24500)).

## Developer Pain Points

- **Windows desktop/extension reliability is the largest cluster**  
  High CPU from WMI Provider Host ([#29499](https://github.com/openai/codex/issues/29499)), system-wide input lag ([#28855](https://github.com/openai/codex/issues/28855)), OneDrive-backed workspace disconnects ([#35420](https://github.com/openai/codex/issues/35420)), blank extension UI ([#9615](https://github.com/openai/codex/issues/9615)), CLI discovery on non-standard drives ([#22672](https://github.com/openai/codex/issues/22672)), and WSL2 startup timeouts ([#36320](https://github.com/openai/codex/issues/36320)) all point to Windows-specific maturity gaps.

- **Diff/Review UI crashes are highly visible**  
  The Codex Diff crash ([#35058](https://github.com/openai/codex/issues/35058)) and the full Review diff page crash ([#35362](https://github.com/openai/codex/issues/35362)) interrupt core review workflows, while inline diff often still works.

- **Session and thread data bloat hurts long sessions**  
  Unbounded thread metadata slows navigation ([#21211](https://github.com/openai/codex/issues/21211)), and screenshot re-persistence on compaction caused `~/.codex/sessions` to reach ~165 GiB ([#35458](https://github.com/openai/codex/issues/35458)).

- **MCP and bundled-tool friction persists**  
  Stale MCP OAuth tokens require restarts ([#14144](https://github.com/openai/codex/issues/14144)), `node_repl` startup failures appear on macOS ([#32447](https://github.com/openai/codex/issues/32447)), and bundled Chrome tools are not exposed on macOS Desktop ([#31533](https://github.com/openai/codex/issues/31533)).

- **Tool execution and rate-limit UX remain rough**  
  Codex can hang waiting for a background script that appears finished ([#14303](https://github.com/openai/codex/issues/14303)), built-in image generation times out ([#29645](https://github.com/openai/codex/issues/29645)), and users report missing rate-limit reset counts/buttons ([#30641](https://github.com/openai/codex/issues/30641)).

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-08-03

## Today's Highlights

Nightly build `v0.55.0-nightly.20260803.gf47d6c6f7` was published, but most community attention is on a cluster of P1 agent reliability bugs — especially subagents reporting `MAX_TURNS` as goal success and the generalist agent hanging indefinitely. On the PR side, a large batch of defensive fixes landed around session-retention collisions, Whisper download/parsing robustness, and extension release handling.

## Releases

- [v0.55.0-nightly.20260803.gf47d6c6f7](https://github.com/google-gemini/gemini-cli/compare/v0.55.0-nightly.20260802.gf47d6c6f7...v0.55.0-nightly.20260803.gf47d6c6f7) — Nightly release; no standalone changelog beyond the full compare view.

## Hot Issues

1. [Issue #1689 — Run blocking/long running shell commands in background](https://github.com/google-gemini/gemini-cli/issues/1689)  
   Closed but heavily discussed: 24 comments, 20 👍. The model gets stuck on GPG/Yubikey commit prompts and burns tokens instead of surfacing the interaction. Shows how badly the CLI needs better background/async shell handling.

2. [Issue #22323 — Subagent recovery after MAX_TURNS is reported as GOAL success](https://github.com/google-gemini/gemini-cli/issues/22323)  
   P1, 12 comments. A subagent that hits its turn limit reports `success` / `GOAL`, masking the fact that no analysis was done. This undermines trust in subagent status reporting and complicates debugging.

3. [Issue #21409 — Generalist agent hangs](https://github.com/google-gemini/gemini-cli/issues/21409)  
   P1, 8 comments, 8 👍. Simple tasks like folder creation hang forever when the generalist subagent is used. Users report that disabling subagent deferral works around the issue.

4. [Issue #28229 — OAuth login fails for Google AI Pro users](https://github.com/google-gemini/gemini-cli/issues/28229)  
   P1 security/auth bug, 7 comments. Google Sign-In fails with “This client is no longer supported for Gemini Code Assist for individuals” even though browser auth works. Affects Windows/PowerShell users.

5. [Issue #25166 — Shell command execution gets stuck with “Waiting input” after command completes](https://github.com/google-gemini/gemini-cli/issues/25166)  
   P1 core bug, 4 comments, 3 👍. Simple commands that never prompt for input still leave the shell in an “awaiting user input” state, causing frequent hangs.

6. [Issue #26522 — Stop Auto Memory from retrying low-signal sessions indefinitely](https://github.com/google-gemini/gemini-cli/issues/26522)  
   P2, 5 comments. The background extraction agent can keep resurfacing low-value sessions because “skipped” sessions are never marked processed. This is part of a broader memory-system quality push.

7. [Issue #21983 — Browser subagent fails in Wayland](https://github.com/google-gemini/gemini-cli/issues/21983)  
   P1 browser-agent bug, 4 comments. The browser subagent fails under Wayland despite the session terminating with `GOAL`; users need more reliable environment-specific failures.

8. [Issue #22093 — (Sub)agents running without permission since v0.33.0](https://github.com/google-gemini/gemini-cli/issues/22093)  
   P2, 3 comments. Subagents started executing even though agent mode was disabled in all configs. This is a serious configuration-trust regression.

9. [Issue #22672 — Agent should stop/discourage destructive behavior](https://github.com/google-gemini/gemini-cli/issues/22672)  
   P2, 3 comments, 1 👍. Users want the model to prefer safe alternatives to `git reset`, `--force`, and destructive DB/resource operations.

10. [Issue #24246 — Gemini CLI encounters 400 error with > 128 tools](https://github.com/google-gemini/gemini-cli/issues/24246)  
    P2, 3 comments. With many tools enabled, requests exceed API limits. The request: smarter tool scoping instead of a hard failure.

## Key PR Progress

1. [PR #28557 — fix: resolve SSRF vulnerability in web-fetch.ts by using async DNS resolution](https://github.com/google-gemini/gemini-cli/pull/28557)  
   P1 security fix. Closes a bypass where hostnames resolving to internal IPs like `169.254.169.254` passed `isPrivateIp()` checks.

2. [PR #28586 — fix(core): preserve thoughtSignature in functionCall parts to fix 400 error](https://github.com/google-gemini/gemini-cli/pull/28586)  
   Fixes a 0.53.0 regression causing 400 errors during parallel tool calls by preserving `thoughtSignature` metadata.

3. [PR #28639 — fix(core): guard formatTruncatedToolOutput against non-positive maxChars](https://github.com/google-gemini/gemini-cli/pull/28639)  
   Prevents `maxChars <= 0` from inflating output ~2× via negative `slice()` semantics. Includes regression tests.

4. [PR #28642 — refactor(core): replace tree-sitter Bash parser with unbash](https://github.com/google-gemini/gemini-cli/pull/28642)  
   Removes WASM runtime and async initialization complexity while keeping the command-detail API. A meaningful simplification for shell-command introspection.

5. [PR #28653 — fix(cli): make session retention collision-safe—protect unrelated chats](https://github.com/google-gemini/gemini-cli/pull/28653)  
   Stops cleanup from deleting unrelated sessions that share the same eight-character filename suffix.

6. [PR #28655 — fix(core): make Whisper model downloads failure-atomic](https://github.com/google-gemini/gemini-cli/pull/28655)  
   Prevents interrupted Whisper downloads from leaving corrupt `.bin` files at the installed model path.

7. [PR #28656 — fix(cli): make extension release downloads failure-atomic](https://github.com/google-gemini/gemini-cli/pull/28656)  
   Hardens GitHub-release extension downloads so request/stream/filesystem failures don’t leave partial archives or crash the CLI.

8. [PR #28659 — fix(core): make Whisper output parsing chunk-boundary safe](https://github.com/google-gemini/gemini-cli/pull/28659)  
   Fixes silently dropped words/timestamps caused by splitting stdout chunks on arbitrary Node.js boundaries.

9. [PR #28660 — fix(sdk): keep sendStream alive on malformed tool arguments](https://github.com/google-gemini/gemini-cli/pull/28660)  
   Converts JSON parsing failures in tool arguments into structured `functionResponse` errors instead of letting them escape `sendStream()`.

10. [PR #28641 — fix(cli): prevent ghost text wrapping infinite loop at narrow widths](https://github.com/google-gemini/gemini-cli/pull/28641)  
    Fixes an infinite loop in `getGhostTextLines` when the terminal is narrower than a CJK/emoji codepoint. Fixes #19985.

## Feature Request Trends

- **Deeper codebase intelligence**: Multiple issues ask for AST-aware file reads, search, and codebase mapping ([#22745](https://github.com/google-gemini/gemini-cli/issues/22745), [#22746](https://github.com/google-gemini/gemini-cli/issues/22746)) plus component-level behavioral evals ([#24353](https://github.com/google-gemini/gemini-cli/issues/24353)).
- **Agent self-awareness and observability**: Users want the CLI to know its own flags/hotkeys ([#21432](https://github.com/google-gemini/gemini-cli/issues/21432)) and subagent trajectories to be visible via `/chat share` ([#22598](https://github.com/google-gemini/gemini-cli/issues/22598)).
- **Safety and permission controls**: Requests to prevent destructive commands ([#22672](https://github.com/google-gemini/gemini-cli/issues/22672)), honor agent enable/disable settings ([#22093](https://github.com/google-gemini/gemini-cli/issues/22093)), and scope tools when too many are available ([#24246](https://github.com/google-gemini/gemini-cli/issues/24246)).
- **Memory system quality**: A cluster of issues from the same reporter asks for deterministic redaction, quarantining invalid patches, and avoiding infinite retries in Auto Memory ([#26516](https://github.com/google-gemini/gemini-cli/issues/26516), [#26522](https://github.com/google-gemini/gemini-cli/issues/26522), [#26523](https://github.com/google-gemini/gemini-cli/issues/26523), [#26525](https://github.com/google-gemini/gemini-cli/issues/26525)).

## Developer Pain Points

- **Shell/process handling remains fragile**: Long-running commands, interactive prompts, and “Waiting input” hangs keep interrupting real workflows ([#1689](https://github.com/google-gemini/gemini-cli/issues/1689), [#25166](https://github.com/google-gemini/gemini-cli/issues/25166), [#22465](https://github.com/google-gemini/gemini-cli/issues/22465)).
- **Subagent reliability is the top trust issue**: Misreported successes, hangs, Wayland browser failures, and ignored permission settings make subagents unpredictable ([#22323](https://github.com/google-gemini/gemini-cli/issues/22323), [#21409](https://github.com/google-gemini/gemini-cli/issues/21409), [#21983](https://github.com/google-gemini/gemini-cli/issues/21983), [#22093](https://github.com/google-gemini/gemini-cli/issues/22093)).
- **Auth/security friction**: OAuth login failures for Google AI Pro users and SSRF concerns add risk for production usage ([#28229](https://github.com/google-gemini/gemini-cli/issues/28229), [#28557](https://github.com/google-gemini/gemini-cli/pull/28557)).
- **Terminal UX glitches**: Infinite wrapping loops, corruption after external editors, and resize flicker still affect daily terminal workflows ([#28641](https://github.com/google-gemini/gemini-cli/pull/28641), [#24935](https://github.com/google-gemini/gemini-cli/issues/24935), [#21924](https://github.com/google-gemini/gemini-cli/issues/21924)).

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest – 2026-08-03

## Today’s Highlights

No releases or PRs landed in the last 24 hours, but issue activity was heavy around model flexibility and session-state reliability. The most visible demand remains multi-model/BYOK support and the ability to switch models mid-session, with two separate 20-👍 issues continuing to gain traction. Newly filed bugs also surfaced around CI MCP authentication failures and Windows/WSL2 keybinding regressions.

## Releases

None. No new versions were published in the last 24 hours.

## Hot Issues

- [**#3282 – Add multiple BYOK model capability in copilot cli**](https://github.com/github/copilot-cli/issues/3282)  
  Currently only a single BYOK model can be configured via `COPILOT_MODEL`, and switching requires ending the session and restarting. With 20 👍 and 7 comments, this is one of the strongest requests in the model-configuration area.

- [**#3709 – Allow /model to switch between multiple models, including BYOK/local providers**](https://github.com/github/copilot-cli/issues/3709)  
  The `/model` picker only lists GitHub-hosted models, leaving local/BYOK providers invisible in-session. Also at 20 👍, this issue is effectively the companion to #3282 for unified model switching.

- [**#1665 – Support Copilot CLI Plugins Scoped to Project or Repository**](https://github.com/github/copilot-cli/issues/1665)  
  Plugins are currently installed per-user and loaded globally, making repo/team-specific workflows awkward. This issue is closed, but it accumulated 18 👍 and 14 comments, signaling strong interest in scoped plugin delivery.

- [**#4078 – Scheduled prompts kill the existing prompt queue**](https://github.com/github/copilot-cli/issues/4078)  
  When a `/every` or `/after` scheduled prompt fires, the queued prompt list is left stuck and the next item is never popped. This is a serious automation reliability bug for long-running agent sessions.

- [**#4337 – gpt-5.6-luna advertised in /models but not accessible via /chat/completions**](https://github.com/github/copilot-cli/issues/4337)  
  The model appears in the Models API but fails on the OpenAI-compatible `/chat/completions` endpoint, breaking MoA/aggregator tooling that does not use `/responses`. New issue, already relevant for API-integration users.

- [**#4340 – Resuming a session has strange UX with regards to model and reasoning**](https://github.com/github/copilot-cli/issues/4340)  
  When resuming a session with `--model` or `settings.json`, the reasoning effort is honored but the requested model is ignored. This makes session resume unpredictable for users with specific model-override workflows.

- [**#4328 – Ctrl+H misinterpreted as Ctrl+Backspace under WSL2 due to WT_SESSION leaking**](https://github.com/github/copilot-cli/issues/4328)  
  Under WSL2 + Windows Terminal, `ctrl+h` deletes a whole word instead of the previous character. A sharp editorial/keybinding regression for WSL2 users.

- [**#4346 – MCP registry policy fetch returns 403 for Actions GITHUB_TOKEN**](https://github.com/github/copilot-cli/issues/4346)  
  In the documented PAT-less GitHub Actions setup, the MCP registry policy fetch fails with 403, blocking all non-default MCP servers in CI. This effectively breaks an officially supported CI integration path.

- [**#1464 – Skills beyond alphabetical position ~32 appear unreachable when many skills are installed**](https://github.com/github/copilot-cli/issues/1464)  
  With many skills installed, the system prompt truncates to “Showing 32 of 63 skills” and later-alphabetical skills are never selected. At 7 👍 and 6 comments, it remains a top pain point for heavy skill users.

- [**#4335 – ACP toolCall.title contains high-level summary instead of executable command**](https://github.com/github/copilot-cli/issues/4335)  
  In Agent Context Protocol mode, client approval modals show a natural-language summary instead of the actual shell command, reducing auditability. New issue affecting Zed and similar ACP hosts.

## Key PR Progress

None. No pull requests were created or updated in the last 24 hours.

## Feature Request Trends

From the 23 issues updated in the last 24 hours, several clear feature directions emerge:

- **Multi-model / BYOK flexibility**  
  Users want multiple BYOK/local models configured at once, and the `/model` picker should include them so switching does not require killing a session.  
  See [#3282](https://github.com/github/copilot-cli/issues/3282), [#3709](https://github.com/github/copilot-cli/issues/3709).

- **Project/repo-scoped plugins**  
  Plugin installation is too global; teams need per-repository/per-project plugin enabling and sharing.  
  See [#1665](https://github.com/github/copilot-cli/issues/1665), [#2286](https://github.com/github/copilot-cli/issues/2286).

- **Session lifecycle hardening**  
  Resuming should preserve the model/reasoning contract. Scheduled prompts should not strand queued work. Stashed input should survive session switches.  
  See [#4340](https://github.com/github/copilot-cli/issues/4340), [#4078](https://github.com/github/copilot-cli/issues/4078), [#4334](https://github.com/github/copilot-cli/issues/4334).

- **Terminal rendering quality**  
  Tables, hyperlinks, and streaming Markdown need more stable layout; long URLs should wrap cleanly and remain clickable.  
  See [#2412](https://github.com/github/copilot-cli/issues/2412), [#4347](https://github.com/github/copilot-cli/issues/4347), [#4348](https://github.com/github/copilot-cli/issues/4348), [#4313](https://github.com/github/copilot-cli/issues/4313).

- **Integration/auth parity**  
  CI users need MCP registry access with `GITHUB_TOKEN`, and ACP clients need transparent command-level tool-call titles.  
  See [#4346](https://github.com/github/copilot-cli/issues/4346), [#4335](https://github.com/github/copilot-cli/issues/4335).

## Developer Pain Points

- **BYOK model switching is too rigid**  
  Users must restart the entire session to change a single environment-variable-pinned model.  
  See [#3282](https://github.com/github/copilot-cli/issues/3282), [#3709](https://github.com/github/copilot-cli/issues/3709).

- **Agent-session state can be lost or corrupted**  
  Scheduled prompts break the queue, stashed text can vanish on session switch, and resume does not reliably restore the selected model.  
  See [#4078](https://github.com/github/copilot-cli/issues/4078), [#4334](https://github.com/github/copilot-cli/issues/4334), [#4340](https://github.com/github/copilot-cli/issues/4340).

- **Skills become silently unreachable**  
  Token limits truncate the skills list and hide valid installed skills from the model, with no user-facing workaround.  
  See [#1464](https://github.com/github/copilot-cli/issues/1464).

- **Terminal platform quirks**  
  WSL2 keybindings are misread, tables reflow during streaming, and wrapped URLs break clicking. These small UI bugs add up for daily CLI users.  
  See [#4328](https://github.com/github/copilot-cli/issues/4328), [#2412](https://github.com/github/copilot-cli/issues/2412), [#4347](https://github.com/github/copilot-cli/issues/4347).

- **CI/CD integration friction**  
  The documented GITHUB_TOKEN flow for Copilot CLI in Actions does not work for MCP policy access, blocking non-default MCP servers entirely.  
  See [#4346](https://github.com/github/copilot-cli/issues/4346).

- **ACP approval UX hides commands**  
  High-level summaries in `toolCall.title` make it harder for users to approve or audit exact shell commands in connected editors.  
  See [#4335](https://github.com/github/copilot-cli/issues/4335).

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI Community Digest — 2026-08-03

## Today’s Highlights
No new releases landed in the last 24 hours. PR activity was dominated by ayaangazali’s bug-fix series — covering console banner crashes, dropped hook tasks, shell pipe blocking, ACP empty answers, and incorrect replacement counts — plus two closed kosong maintenance PRs. The only two open issues updated in this window remain long-running feature requests from CatKang: a persistent Memory System (#1283) and Remote Control (#1282), signaling sustained community interest in session continuity.

## Releases
None in the last 24 hours. No new version tags or release notes were published.

## Hot Issues
Only two issues were updated in the window; both are listed below.

1. **[enhancement] Memory System - Persistent context across sessions** ([#1283](https://github.com/MoonshotAI/kimi-cli/issues/1283))  
   Author: CatKang · Created 2026-02-27 · Updated 2026-08-03 · 15 comments · 0 👍  
   Requests automatic and manual memory so Kimi Code CLI can retain project patterns, user preferences, and useful context across sessions. Despite 0 👍, the 15-comment thread indicates active design discussion.

2. **[enhancement] Remote Control - Continue local sessions from any device** ([#1282](https://github.com/MoonshotAI/kimi-cli/issues/1282))  
   Author: CatKang · Created 2026-02-27 · Updated 2026-08-02 · 11 comments · 24 👍  
   The most-liked open request in this window. Users want to resume local CLI sessions from phones, tablets, or browsers while preserving the full local environment.

## Key PR Progress
Nine PRs were updated in the window; all are listed below.

1. [fix(web,vis): do not crash printing the startup banner on legacy console codecs](https://github.com/MoonshotAI/kimi-cli/pull/2577) — ayaangazali · Open  
   Prevents the startup banner from crashing when the console cannot represent U+279C characters, e.g. GBK on Chinese Windows. Resolves #2532.

2. [fix(hooks): fire PostToolUse hooks through fire_and_forget_trigger](https://github.com/MoonshotAI/kimi-cli/pull/2575) — ayaangazali · Open  
   Fixes `PostToolUse`/`PostToolUseFailure` hooks being dropped when `asyncio.create_task` handles are not retained. Resolves #2564.

3. [fix(tools): count StrReplaceFile replacements against running content](https://github.com/MoonshotAI/kimi-cli/pull/2554) — ayaangazali · Open  
   Corrects the replacement count in `StrReplaceFile` success messages so it reflects the file’s current content after each edit.

4. [fix(shell): stop blocking until timeout when a detached child holds the pipes](https://github.com/MoonshotAI/kimi-cli/pull/2530) — ayaangazali · Open  
   Fixes shell commands like `some_daemon & echo done` blocking until timeout because the detached child keeps stdout/stderr open. Resolves #2468.

5. [fix(acp): signal QuestionNotSupported instead of resolving empty answers](https://github.com/MoonshotAI/kimi-cli/pull/2507) — ayaangazali · Open  
   ACP server mode no longer conflates “question not supported” with “user dismissed the question.” Resolves #2495.

6. [fix(llm): scope prompt cache keys to Moonshot APIs](https://github.com/MoonshotAI/kimi-cli/pull/2535) — Sanjays2402 · Open  
   Stops sending Moonshot-specific `prompt_cache_key` parameters to third-party Kimi-compatible endpoints while preserving caching for official Moonshot/Kimi APIs. Resolves #2534.

7. [chore(release): bump kosong to 0.56.0](https://github.com/MoonshotAI/kimi-cli/pull/2581) — jackfish212 · Closed  
   Release maintenance: bumps kosong to 0.56.0, moves release notes, and updates the root dependency pin.

8. [fix(kosong): omit empty anthropic-beta header when no beta features declared](https://github.com/MoonshotAI/kimi-cli/pull/2580) — 7Sageer · Closed  
   Removes the unconditional empty `anthropic-beta` header from `Anthropic._streamed_request` when no beta features are declared.

9. [feat(tools): add Monitor tool for per-line stdout streaming](https://github.com/MoonshotAI/kimi-cli/pull/2471) — Nitjsefnie · Closed  
   Adds a `Monitor` tool for per-line stdout streaming, complementing the existing background-tool workflow. Feature proposal, no linked issue.

## Feature Request Trends
Based on the two active issues, the dominant theme is **session continuity**:

- **Persistent context across sessions**: The Memory System (#1283) would preserve project patterns, user preferences, and AI-managed notes between sessions.
- **Cross-device session continuation**: Remote Control (#1282) would let users resume a local session from a browser or mobile device without losing local environment state.

Together, these point toward a broader ask: context should survive both time and location.

## Developer Pain Points
Recurring frustrations visible in recent PRs and issues:

- **Blocking/timeout behavior**: Shell commands can block until timeout when detached child processes hold pipes open ([#2530](https://github.com/MoonshotAI/kimi-cli/pull/2530)).
- **Silent background task loss**: Hook tasks can be garbage-collected before execution when async handles are dropped ([#2575](https://github.com/MoonshotAI/kimi-cli/pull/2575)).
- **Environment-specific crashes**: Startup banner printing breaks on legacy console codecs such as GBK ([#2577](https://github.com/MoonshotAI/kimi-cli/pull/2577)).
- **Ambiguous API responses**: ACP empty answers are indistinguishable from user dismissal ([#2507](https://github.com/MoonshotAI/kimi-cli/pull/2507)); unnecessary empty `anthropic-beta` headers are also sent ([#2580](https://github.com/MoonshotAI/kimi-cli/pull/2580)).
- **Incorrect tool reporting**: `StrReplaceFile` can report wrong replacement counts ([#2554](https://github.com/MoonshotAI/kimi-cli/pull/2554)).
- **Provider isolation**: Moonshot-specific prompt cache keys can leak to third-party compatible endpoints ([#2535](https://github.com/MoonshotAI/kimi-cli/pull/2535)).

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-08-03

No new releases landed in the last 24 hours, but community activity stayed high around OpenCode Go billing/login failures and a sudden DeepSeek V4 Flash access change. On the contributor side, notable PRs added a request-scoped `chat.model` hook, a unified marketplace proposal, Chinese locale support, and a manual model refresh action.

## Hot Issues

- [**#6231** — Auto-discover models from OpenAI-compatible provider endpoints](https://github.com/anomalyco/opencode/issues/6231)  
  The most-liked open request of the batch with 201 👍 and 38 comments. Users want automatic model discovery for local providers like LM Studio/Ollama instead of manually editing `opencode.json`.

- [**#27906** — v1.15.1+ Breaks Bun Installs](https://github.com/anomalyco/opencode/issues/27906)  
  OpenCode now requires postinstall lifecycle scripts, which Bun blocks by default for global packages. This is a significant installer regression for Bun users.

- [**#5408** — Delayed queue feature](https://github.com/anomalyco/opencode/issues/5408)  
  A recurring workflow request: queue repeated agent requests in a loop that captures learnings and updates state. Valuable for iterative codex-style development.

- [**#459** — Privacy and Data Collection Clarification Request](https://github.com/anomalyco/opencode/issues/459)  
  Despite being closed, this remains a trust topic with 58 👍. Users want explicit documentation about telemetry, data handling, and local-first guarantees.

- [**#39845** — DeepSeek V4 Flash suddenly requires “Enable models hosted in China” for OpenCode Go](https://github.com/anomalyco/opencode/issues/39845)  
  Mid-session model access stopped, demanding an unexpected opt-in for China-hosted models. Confusing subscription/model gating behavior.

- [**#23566** — Docs suggest LSP is enabled by default](https://github.com/anomalyco/opencode/issues/23566)  
  Docs claim auto-installed language servers, but LSP is intentionally disabled by default. Documentation/behavior mismatch causes wasted setup time.

- [**#28089** — OpenCode leaks temporary .so files in /tmp, consuming hundreds of GB](https://github.com/anomalyco/opencode/issues/28089)  
  Critical resource leak: temporary ELF `.so` files are never cleaned up, eventually filling disk on long-running Linux systems.

- [**#39827** — Zen AuthError: “Request blocked by upstream provider” — all Zen models broken](https://github.com/anomalyco/opencode/issues/39827)  
  Every Zen model returns auth errors while direct provider keys work fine. Points to an upstream/account-level issue affecting paid and free users.

- [**#39560** — Critical data loss after consecutive updates](https://github.com/anomalyco/opencode/issues/39560)  
  After several rapid updates, sessions, history, plugins, and providers disappeared. High-severity reliability concern for long-term projects.

- [**#33027** — MCP tools connected but not exposed to agent](https://github.com/anomalyco/opencode/issues/33027)  
  MCP server connects and lists tools, but the agent never sees them. Represents a major integration gap for MCP-based workflows.

## Key PR Progress

- [**#40303** — feat(tui): add manual model list refresh action](https://github.com/anomalyco/opencode/pull/40303)  
  Adds a `POST /provider/refresh` endpoint plus SDK support, letting users force-refresh the model catalog instead of waiting for the 60-minute schedule.

- [**#40188** — feat(plugin): add request-scoped chat.model hook](https://github.com/anomalyco/opencode/pull/40188)  
  New plugin hook fires before provider/model/auth resolution, allowing per-request model replacement. Closes #18793 and addresses #24006.

- [**#40108** — feat(opencode): add unified marketplace](https://github.com/anomalyco/opencode/pull/40108)  
  Proposes a shared package/marketplace runtime across Desktop, Web, TUI, CLI, and API clients, building on earlier skills/agents CLI exploration.

- [**#40297** — feat(tui): add Chinese locale support](https://github.com/anomalyco/opencode/pull/40297)  
  Adds `locale` configuration for English/Simplified Chinese, with environment-based locale detection and translations for key TUI surfaces.

- [**#40302** — fix(core): ignore empty agent files](https://github.com/anomalyco/opencode/pull/40302)  
  Prevents zero-byte markdown files from silently breaking file-based agent loading, preserving configured and built-in agents.

- [**#40265** — fix: gpt-5.5+ in combination with Azure fails with reasoningEffort](https://github.com/anomalyco/opencode/pull/40265)  
  Fixes `reasoningEffort` handling for newer GPT-5.x models when routed through Azure.

- [**#20491** — feat(opencode): add Kiro provider](https://github.com/anomalyco/opencode/pull/20491)  
  Adds Kiro/AWS as a bundled provider plugin, closing two provider-related issues.

- [**#17570** — feat: add assign-model feature for subagent model selection](https://github.com/anomalyco/opencode/pull/17570)  
  Long-running feature PR allowing users to assign specific models to subagents via configuration and UI.

- [**#40273** — fix(session): cascade archive to child sessions](https://github.com/anomalyco/opencode/pull/40273)  
  Archiving a parent session now recursively archives descendants with the same timestamp, preventing orphaned active children.

- [**#40274** — fix(tui): eagerly index child sessions](https://github.com/anomalyco/opencode/pull/40274)  
  Improves TUI session-list reliability by indexing `session.created` metadata immediately while keeping full transcripts lazy-loaded.

## Feature Request Trends

- **Provider/model auto-discovery & Responses API support**  
  Users want auto-discovery from OpenAI-compatible endpoints ([#6231](https://github.com/anomalyco/opencode/issues/6231)) and native Responses API support for DeepSeek V4 Flash and OpenCode Go ([#39829](https://github.com/anomalyco/opencode/issues/39829), [#23655](https://github.com/anomalyco/opencode/issues/23655)).

- **Token/cache visibility**  
  Multiple requests ask for cached vs. fresh token breakdowns and prompt cache usage in the context meter/tooltip ([#40291](https://github.com/anomalyco/opencode/issues/40291), [#34298](https://github.com/anomalyco/opencode/issues/34298)).

- **Agent workflow control**  
  Feature requests include delayed/queued agent runs ([#5408](https://github.com/anomalyco/opencode/issues/5408)) and manual todo-list editing when the agent forgets to update it ([#38550](https://github.com/anomalyco/opencode/issues/38550)).

- **Notifications**  
  Users want desktop/VS Code notifications when an agent completes or needs attention, complementing existing TUI/system notification work ([#39936](https://github.com/anomalyco/opencode/issues/39936)).

- **Headless/remote auth**  
  There is renewed interest in OAuth Device Flow support for Remote-SSH and headless environments ([#40246](https://github.com/anomalyco/opencode/issues/40246)).

## Developer Pain Points

- **OpenCode Go billing & account activation failures**  
  Stripe payments succeed but subscriptions don’t activate, invite rewards disappear, and console login returns 500 errors ([#40234](https://github.com/anomalyco/opencode/issues/40234), [#40236](https://github.com/anomalyco/opencode/issues/40236), [#40256](https://github.com/anomalyco/opencode/issues/40256), [#40283](https://github.com/anomalyco/opencode/issues/40283)).

- **Upstream/account-level model access errors**  
  Sudden gating for China-hosted DeepSeek models, all Zen models blocked upstream, and “request queue is full” 503s create unpredictable service outages ([#39845](https://github.com/anomalyco/opencode/issues/39845), [#39827](https://github.com/anomalyco/opencode/issues/39827), [#40254](https://github.com/anomalyco/opencode/issues/40254)).

- **Data loss and session reliability**  
  Consecutive updates wiped sessions/history, and Web sessions can persist duplicate assistant answers ([#39560](https://github.com/anomalyco/opencode/issues/39560), [#29478](https://github.com/anomalyco/opencode/issues/29478)).

- **Provider integration regressions**  
  Recurring friction with Azure `reasoningEffort`, Vertex Anthropic routing, MCP tools not reaching the agent, and ChatGPT OAuth rejecting EU-resident workspaces ([#40265](https://github.com/anomalyco/opencode/pull/40265), [#39069](https://github.com/anomalyco/opencode/issues/39069), [#33027](https://github.com/anomalyco/opencode/issues/33027), [#40243](https://github.com/anomalyco/opencode/issues/40243)).

- **Installer and resource leaks**  
  Bun global installs break due to postinstall scripts, and long-running OpenCode instances leak `.so` files in `/tmp` ([#27906](https://github.com/anomalyco/opencode/issues/27906), [#28089](https://github.com/anomalyco/opencode/issues/28089)).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-08-03

## Today's Highlights

v0.21.4 turns Web Shell into a release-ready desktop app with native lifecycle management, single-instance behavior, and automatic updates ([#8132](https://github.com/QwenLM/qwen-code/pull/8132)). The community is most engaged around session reliability, abort handling, and prompt-cache invalidation, while new PRs add Qwen 3.8 reasoning-effort support and OpenAI-compatible compression-cache sharing. Overall, the project is balancing desktop/Web Shell maturity with deeper agent-runtime trust and performance work.

## Releases

- [v0.21.4](https://github.com/QwenLM/qwen-code/releases/tag/v0.21.4) — Web Shell is now a release-ready desktop app with native lifecycle management, single-instance behavior, and automatic updates. Web Shell history pagination also handles oversized turns gracefully.
- [v0.21.3-nightly.20260803.e1e5b42ce](https://github.com/QwenLM/qwen-code/releases/tag/v0.21.3-nightly.20260803.e1e5b42ce) — Adds a complete TUI keyboard-shortcut reference and a core fix for history pagination.

## Hot Issues

1. **Desktop sessions silently auto-deleted** ([#8400](https://github.com/QwenLM/qwen-code/issues/8400)) — P1 Windows bug: sessions disappear after restart when ACP `session/load` fails due to workspace cwd mismatch. The app deletes local session mirrors without confirmation; high data-loss risk.

2. **Deterministic tool-execution boundaries** ([#8102](https://github.com/QwenLM/qwen-code/issues/8102)) — The most-discussed thread (11 comments). Proposes keeping the model outside the trust boundary and making tool actions deterministically constrained, authorized, and observable.

3. **Duplicate provider tool call id** ([#8382](https://github.com/QwenLM/qwen-code/issues/8382)) — P2 core/session bug. Agents hit `"Duplicate provider tool call id"` and `"not recorded"` errors, breaking multi-turn tool execution.

4. **`isAbortError` misses OpenAI SDK `APIUserAbortError`** ([#8398](https://github.com/QwenLM/qwen-code/issues/8398)) — User cancellations on OpenAI-compatible endpoints are misclassified as real errors. Related to [#8356](https://github.com/QwenLM/qwen-code/issues/8356), where aborted turns stop being written to session transcripts.

5. **Microcompaction invalidates prompt cache** ([#8452](https://github.com/QwenLM/qwen-code/issues/8452)) — Size-triggered microcompaction repeatedly rewrites an already-cached conversation prefix, defeating provider prompt caching. Duplicate report: [#8463](https://github.com/QwenLM/qwen-code/issues/8463).

6. **SDK-embedded MCP tools fail after resuming sessions** ([#8433](https://github.com/QwenLM/qwen-code/issues/8433)) — P2 session/MCP issue: `createSdkMcpServer` tools work on first query but fail on subsequent queries in resumed sessions.

7. **Cancelled prompt is not restored** ([#8316](https://github.com/QwenLM/qwen-code/issues/8316)) — Ctrl+C during agent thinking discards the original input; users must retype. 7 comments, clear UX regression.

8. **Agent thinking presentation is unstable** ([#8319](https://github.com/QwenLM/qwen-code/issues/8319)) — The thinking panel keeps moving up and down during streaming, making it hard to read even non-thinking content. P2 UI complaint with screencap.

9. **Warp `@` completion tab switching conflict** ([#8330](https://github.com/QwenLM/qwen-code/issues/8330)) — Ctrl+Tab is intercepted by Warp terminal tabs, making completion category switching inaccessible.

10. **`qwen --serve` TUI + daemon mode** ([#4156](https://github.com/QwenLM/qwen-code/issues/4156)) — Closed but still active proposal (7 comments). Users want a Mode A where a TUI process can also host an in-process HTTP daemon, not just headless Mode B.

## Key PR Progress

1. **Support Qwen 3.8 reasoning effort** ([#8472](https://github.com/QwenLM/qwen-code/pull/8472)) — Passes `/effort` values through as `reasoning_effort` for `qwen3.8-max` and `qwen3.8-max-preview`.

2. **Share compression caches with OpenAI providers** ([#8418](https://github.com/QwenLM/qwen-code/pull/8418)) — Extends prefix-preserving cache sharing beyond DashScope to all OpenAI-compatible endpoints, improving cost and latency.

3. **Fork from any conversation** ([#8274](https://github.com/QwenLM/qwen-code/pull/8274)) — Makes session branching target an earlier Assistant response reliably, avoiding unsafe visible-message branch points.

4. **Render inline terminal images** ([#8305](https://github.com/QwenLM/qwen-code/pull/8305)) — Adds inline image rendering for model/tool `inlineData` in the interactive CLI while preserving ordered text/image parts.

5. **Audio bridge for attachments** ([#8332](https://github.com/QwenLM/qwen-code/pull/8332)) — Transcribes audio attachments through a configured batch voice model when the primary model does not support audio; transcription is explicitly marked untrusted.

6. **ESC cancels ongoing work first** ([#8353](https://github.com/QwenLM/qwen-code/pull/8353)) — Fixes ESC being consumed by queue-popping logic while the agent is actively responding; now the global cancel path runs first.

7. **Cooperative pause/resume for workflows** ([#8320](https://github.com/QwenLM/qwen-code/pull/8320)) — Adds a pause-aware scheduler that stops new dispatches, lets in-flight work converge, and gates results until resume.

8. **Structured Web Shell review results** ([#8402](https://github.com/QwenLM/qwen-code/pull/8402)) — Turns `/review` findings and verdicts into a versioned, durable session artifact surfaced in Web Shell.

9. **Review cost ledger** ([#8471](https://github.com/QwenLM/qwen-code/pull/8471)) — Builds a cost ledger from existing on-disk records, addressing the “0.21.4 got slow” investigation by making model-call and token costs replayable.

10. **Expose channel sessions in Web Shell** ([#8457](https://github.com/QwenLM/qwen-code/pull/8457)) — Adds a Tasks/Channels source switch so sessions started via DingTalk, Feishu, and WeCom are visible in the Web Shell sidebar and settings.

## Feature Request Trends

- **Agent trust and governance** — Users want deterministic tool-execution boundaries and stronger runtime observability ([#8102](https://github.com/QwenLM/qwen-code/issues/8102)), plus harder tool-output budgeting and artifact lifecycle controls ([#7306](https://github.com/QwenLM/qwen-code/issues/7306)).
- **Non-terminal and multi-user channels** — Email via IMAP/SMTP ([#8281](https://github.com/QwenLM/qwen-code/issues/8281)), group pairing ([#8440](https://github.com/QwenLM/qwen-code/pull/8440)), and channel sessions in Web Shell ([#8457](https://github.com/QwenLM/qwen-code/pull/8457)) show demand for async, collaborative access.
- **Session history as a first-class artifact** — Requests to recover complete turns after journal truncation ([#8412](https://github.com/QwenLM/qwen-code/issues/8412)) and preserve cancelled prompts ([#8316](https://github.com/QwenLM/qwen-code/issues/8316)) point toward “nothing should be lost” session semantics.
- **Cache-friendly context management** — Instead of simply shrinking context, users are asking compaction to preserve provider prompt-cache prefixes ([#8452](https://github.com/QwenLM/qwen-code/issues/8452), [#8463](https://github.com/QwenLM/qwen-code/issues/8463)) and to share compression caches broadly ([#8418](https://github.com/QwenLM/qwen-code/pull/8418)).
- **Community and GitHub operations** — A community-operations checklist ([#8437](https://github.com/QwenLM/qwen-code/issues/8437)) and multiple autofix/takeover CI PRs show a push toward more automated maintainer workflows.

## Developer Pain Points

- **Abort/cancel handling is unreliable** — Prompt text is lost ([#8316](https://github.com/QwenLM/qwen-code/issues/8316)), OpenAI user aborts are misclassified ([#8398](https://github.com/QwenLM/qwen-code/issues/8398)), and transcripts stop being written after `APIUserAbortError` ([#8356](https://github.com/QwenLM/qwen-code/issues/8356)).
- **Session state can silently corrupt or disappear** — Desktop sessions are auto-deleted on ACP load failure ([#8400](https://github.com/QwenLM/qwen-code/issues/8400)), duplicate tool-call IDs break execution ([#8382](https://github.com/QwenLM/qwen-code/issues/8382)), and SDK-embedded MCP tools fail after resume ([#8433](https://github.com/QwenLM/qwen-code/issues/8433)).
- **Prompt-cache thrashing increases cost** — Microcompaction rewrites cached prefixes every turn once past the threshold, defeating provider caching ([#8452](https://github.com/QwenLM/qwen-code/issues/8452), [#8463](https://github.com/QwenLM/qwen-code/issues/8463)).
- **Terminal compatibility regressions** — Broken Ctrl+Shift+C copy ([#8317](https://github.com/QwenLM/qwen-code/issues/8317)), Warp Ctrl+Tab conflict ([#8330](https://github.com/QwenLM/qwen-code/issues/8330)), ConEmu/Cmder flicker ([#8385](https://github.com/QwenLM/qwen-code/issues/8385)), and the unstable thinking panel ([#8319](https://github.com/QwenLM/qwen-code/issues/8319)) are recurring irritants.
- **Provider/model metadata sync** — Bailian Token Plan model lists are out of sync and image/video generation fails ([#8432](https://github.com/QwenLM/qwen-code/issues/8432)); long model-prefix names truncate in pickers ([#8470](https://github.com/QwenLM/qwen-code/issues/8470)).

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar).*