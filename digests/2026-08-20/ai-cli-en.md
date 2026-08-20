# AI CLI Tools Community Digest 2026-08-20

> Generated: 2026-08-20 04:55 UTC | Tools covered: 7

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

# Cross-Tool Comparison Report — AI CLI Developer Tools (2026-08-20)

## 1. Ecosystem Overview

The AI CLI tool landscape is in a high-velocity stabilization phase: six major tools shipped at least ten releases combined this week, dominated by patch fixes for regressions introduced in recent feature work. Two cross-cutting failure clusters dominate community attention: Windows-specific breakage (path handling, sandboxing, process lifecycle, security-software friction) and session-state reliability (memory loss across compactions, misleading agent status reporting, UI freezes). Security hardening is a rising investment area across nearly all tools, targeting MCP configuration fail-open behavior, Git-command trust boundaries, and authentication enforcement on agent servers. Meanwhile, persistent memory across context compactions remains the single most-demanded capability, with active or recently closed threads in four of the six communities.

## 2. Activity Comparison

Counts reflect issues/PRs surfaced as notable in each tool's 24-hour digest window, not total tracker volume.

| Tool | Issues (featured) | PRs | Releases (last 24h) | Release Status |
|---|---|---|---|---|
| Claude Code | 10 (2 closed) | 1 | 2 (v2.1.236, v2.1.237) | Stable patch cadence |
| OpenAI Codex | 10 | 10 | 2 (rust-v0.149.0-alpha.2/3) | Alpha churn, no changelogs |
| Gemini CLI | 10 | 10 | 3 (v0.56.0 stable, v0.57.0-preview.0, nightly) | Stable + preview parallel tracks |
| GitHub Copilot CLI | 10 (3 closed) | 0 | 3 (v1.0.81-3 → v1.0.81-5) | Rapid patches, regression-prone 1.0.81 line |
| Kimi Code CLI | 1 (closed) | 0 | 0 | Dormant |
| OpenCode | 10 (1 closed) | 13 | 0 | Heavy refactoring, no release in window |
| Qwen Code | 7 (1 closed) | 14 | 2 (benchmark builds) | Benchmark-validation-driven |

## 3. Shared Feature Directions

- **Durable memory and session state** — The strongest cross-tool theme. Claude Code (#34556 persistent memory across compactions, closed after 95 comments; #27242 inaccessible post-compaction history; #11408 named sessions), Copilot CLI (#4441 durable context across repeated compactions), Codex (#33493 compaction loops retaining image payloads), Gemini (#26522 Auto Memory infinite retries, #26525 deterministic redaction), and OpenCode (#19143 in-session search) all point to demand for durable, navigable, searchable session state.
- **Sandbox and permission control** — Copilot CLI has the most acute pain: sandbox force-enabling over explicit `"enabled": false` (#4521, #4522), git-blocking restrictions (#4524), and silent bypass in non-interactive `-p` mode (#4528). Claude Code echoes this with sticky permission modes (#12070) and spurious quoted-character warnings (#27957). Gemini is adding consent gates for environment changes (#28863) and proposing OS-level bash sandboxing (#19873).
- **MCP/A2A protocol and authentication reliability** — Copilot CLI's Atlassian OAuth failure (#4480, #4490) and dual-era `initialize`/`server/discover` conflict (#4525); Gemini's corrupt-MCP-config fail-open fixes (#28794, #28787) and A2A server auth enforcement (#28699); Codex's per-turn MCP server process leaks (#38754); and Kimi's ACP Grep/Glob blocking (#2609) form a broad reliability/security cluster around agent-to-tool wiring.
- **Honest agent status reporting** — Gemini's subagent `MAX_TURNS` misreported as GOAL success (#22323) and browser agent failing on Wayland yet reporting success (#21983), plus OpenCode's permanently-spinning unsettled tool calls (#43576), show a shared trust deficit: agents claiming success while failing.
- **Cost and context transparency** — Codex's data-driven finding that explicit batching cuts weighted usage 27–45% (#35050, 40👍) plus requests for credit-usage toggles (#28382); Claude Code's context-accounting confusion (#6616, #18159, #17959); and OpenCode's removal of hard model limits (#43581) all signal cost/context efficiency as a feature driver.
- **Windows reliability and parity** — Codex leads with browser-plugin RPC trust failures (#39136 cluster), `\\?\` path-prefix archive breakage (#39239), and updater `PSModulePath` leakage (#27117). OpenCode's npm auto-updater corruption (#42291) and sidecar timeouts (#43568), Copilot's GHEC data-residency 401 (#4527), and Claude Code's encrypted-SSH-key dialog failure (#26997) confirm Windows remains the weak flank across all tools.

## 4. Differentiation Analysis

**Claude Code** targets experienced developers with the most mature TUI and permission ecosystem (output styles, plugin marketplaces, agent teams). Its 286👍 copy/paste issue reflects polish expectations of a mainstream tool; concerns center on session memory depth rather than raw capability. **OpenAI Codex** is the most Windows-focused and security-hardening-heavy tool (Git-command trust removal, plugin Git isolation), with a Rust codebase and enterprise ChatGPT integration; its cost-optimization discourse is unmatched. **Gemini CLI** differentiates through Google Cloud ecosystem integration (Cloud Workstations OAuth, Vertex) and a formal evaluation culture (behavioral evals, GCS trajectory logging), while its open issues show the most interest in AST-aware code navigation and agent self-observability. **Copilot CLI** is enterprise-governance-first: managed-policy enforcement, GHEC data residency, and sandbox bypass prevention dominate — but the 1.0.81 line demonstrates how quickly governance machinery can regress into user-hostile behavior. **OpenCode** is the open-source innovation lab: aggressive architecture investment (Effect `Latch` refactors, model variant fallbacks, removing model limits, plugin HTTP routes) with corresponding 2.0-instability risk. **Qwen Code** validates through benchmarks (SWE-bench Verified 500/500, Terminal-Bench 89) and invests heavily in CI/fleet automation and integration channels (DingTalk, Aone Code review) rather than TUI polish. **Kimi Code CLI** shows no meaningful differentiation activity this window beyond its ACP/Zed integration, where it currently has a tool-parity gap.

## 5. Community Momentum & Maturity

**Highest velocity:** Qwen Code (14 PRs) and OpenCode (13 PRs) are iterating fastest, with OpenCode showing the most architectural ambition and Qwen the most disciplined benchmark-gated pipeline. **High PR volume with release churn:** Codex and Gemini each landed 10 PRs; Gemini shipped a stable release alongside preview work, while Codex's alpha releases lack changelogs, obscuring progress. **Issue-driven but PR-quiet:** Copilot CLI shipped three patches but no PRs in the window — its community is highly active in reporting regressions, but the maintainers are in firefighting mode. **Mature but low-frequency:** Claude Code shipped two solid patches with only one PR surfaced; its community engagement is the deepest (95-comment threads, 286👍 issues), reflecting a large installed base with high expectations. **Dormant:** Kimi Code CLI had a single closed issue and zero code activity, offering little signal for ecosystem watchers.

## 6. Trend Signals

- **Persistent memory is the next battleground.** Four communities have active demand for cross-compaction memory, named sessions, and searchable history. Tools that ship a credible memory solution (not just transcript files) will capture significant mindshare.
- **Sandbox/permission systems are at peak instability.** Concurrent regressions in Copilot CLI's sandbox enforcement and continued friction in Claude Code's permission prompts indicate the industry has not yet solved safe-by-default execution without user-hostile interference.
- **Agent honesty is becoming a trust differentiator.** Misleading GOAL-success reports, stuck "Thinking" states, and permanently spinning tool calls erode confidence in autonomous operation; expect observability and truthful status propagation to be prioritized.
- **Windows remains the ecosystem's weak flank.** From `\\?\` path prefixes to PowerShell module leakage to RPC trust validation, Windows-specific bugs account for the largest single cluster of high-severity issues. Cross-platform parity is a retention risk for every vendor.
- **Cost efficiency is rising as a product lever.** Data-backed usage analysis (Codex #35050) and requests for credit-control toggles indicate power users will increasingly demand transparency and control over token consumption.
- **Security hardening is moving down the stack.** Git-command trust removal, MCP config fail-open prevention, A2A server authentication, and env-var injection consent gates show a shift from prompt-level safety to infrastructure-level security.
- **Architectural flexibility is the new differentiator.** Removing model capacity limits (OpenCode), adding model variant fallbacks, pluggable pane backends (Claude Code #26572), and AST-aware tools (Gemini) point to tools positioning for a multi-model, multi-terminal future rather than lock-in to a single runtime stack.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights — 2026-08-20

## 1. Top Skills Ranking

**#1298 — skill-creator eval-loop fix (open, top discussion activity)**  
[anthropics/skills PR #1298](https://github.com/anthropics/skills/pull/1298)  
Fixes `run_eval.py` always reporting `recall=0%`, which renders the description-optimization loop useless ("optimizing against noise"). Also addresses Windows stream reading, trigger detection, and parallel workers. Discussion references issue #556 (12 comments, 7 👍) with 10+ independent reproductions.

**#514 — document-typography skill (open)**  
[anthropics/skills PR #514](https://github.com/anthropics/skills/pull/514)  
Typographic quality control for AI-generated documents: orphan word wrap, widow paragraphs, and numbering misalignment — problems the author argues affect every document Claude produces.

**#538 — pdf skill case-sensitivity fixes (open)**  
[anthropics/skills PR #538](https://github.com/anthropics/skills/pull/538)  
Corrects 8 mismatches in `skills/pdf/SKILL.md` (`REFERENCE.md` → `reference.md`, `FORMS.md` → `forms.md`) that break skill loading on case-sensitive filesystems.

**#486 — ODT skill (open)**  
[anthropics/skills PR #486](https://github.com/anthropics/skills/pull/486)  
Adds OpenDocument support: create, fill, read, and convert `.odt`/`.ods`, plus ODT-to-HTML parsing; triggers on ODT/ODS/ODF/OpenDocument/LibreOffice mentions.

**#210 — frontend-design skill overhaul (open)**  
[anthropics/skills PR #210](https://github.com/anthropics/skills/pull/210)  
Revises the frontend-design skill for clarity, actionability, and internal coherence, ensuring every instruction is executable within a single conversation.

**#83 — skill-quality-analyzer + skill-security-analyzer (open)**  
[anthropics/skills PR #83](https://github.com/anthropics/skills/pull/83)  
Two meta-skills: a five-dimension quality analyzer (structure/documentation, examples, resources, etc.) and a security analyzer for Claude Skills.

**#541 — docx tracked-change ID collision fix (open)**  
[anthropics/skills PR #541](https://github.com/anthropics/skills/pull/541)  
Prevents document corruption when adding tracked changes to files with existing bookmarks — hardcoded low `w:id` values collide with OOXML's shared ID space across bookmarks, comments, and move ranges.

**#1367 — self-audit skill v1.3.0 (open, recent momentum)**  
[anthropics/skills PR #1367](https://github.com/anthropics/skills/pull/1367)  
Universal pre-delivery audit: mechanical file verification first, then a four-dimension reasoning audit in damage-severity order; claims compatibility with any project, stack, or model.

All listed PRs are **open**; none have merged as of the data snapshot.

## 2. Community Demand Trends

- **Trust-boundary security** — Issue [#492](https://github.com/anthropics/skills/issues/492) (43 comments, the most active issue) flags community skills distributed under the `anthropic/` namespace as impersonation risks that could trick users into granting elevated permissions. Issue [#1175](https://github.com/anthropics/skills/issues/1175) raises related security/context-window concerns for embedding SharePoint access-control logic in SKILL.md.
- **Skill distribution and sharing** — [#228](https://github.com/anthropics/skills/issues/228) (16 comments, 8 👍) requests org-wide skill sharing in Claude.ai; [#62](https://github.com/anthropics/skills/issues/62) reports skills disappearing; [#189](https://github.com/anthropics/skills/issues/189) (9 👍) reports duplicate skills from overlapping plugins.
- **Skill-creator toolchain reliability** — [#556](https://github.com/anthropics/skills/issues/556): `run_eval.py` triggers no skills across all queries; [#202](https://github.com/anthropics/skills/issues/202) argues skill-creator reads like developer documentation rather than an operational skill.
- **Context-window efficiency** — [#1487](https://github.com/anthropics/skills/issues/1487): the `claude-api` skill injects ~156k tokens in a single tool call; [#12](https://github.com/anthropics/skills/issues/12): docx skill whitespace reformatting corrupts documents.
- **New skill directions proposed** — [#1329](https://github.com/anthropics/skills/issues/1329) compact-memory (symbolic notation for compressing agent state), [#412](https://github.com/anthropics/skills/issues/412) agent-governance (policy enforcement, threat detection, audit trails), [#1385](https://github.com/anthropics/skills/issues/1385) reasoning-quality gate pipeline.
- **Platform integration** — [#29](https://github.com/anthropics/skills/issues/29) Bedrock support; [#16](https://github.com/anthropics/skills/issues/16) exposing Skills as MCPs.

## 3. High-Potential Pending Skills

- **[#1298 skill-creator eval fix](https://github.com/anthropics/skills/pull/1298)** — Directly resolves the most-reported bug (#556); converging companion fixes [#1099](https://github.com/anthropics/skills/pull/1099) and [#1050](https://github.com/anthropics/skills/pull/1050) address the same Windows subprocess failures.
- **[#514 document-typography](https://github.com/anthropics/skills/pull/514)** — Broad applicability to all generated documents; low-risk additive skill.
- **[#486 ODT skill](https://github.com/anthropics/skills/pull/486)** — Completes document-format coverage alongside pdf/docx.
- **[#723 testing-patterns](https://github.com/anthropics/skills/pull/723)** — Full testing-stack coverage: Testing Trophy model, unit testing, React Testing Library, and what-not-to-test guidance.
- **[#568 ServiceNow platform skill](https://github.com/anthropics/skills/pull/568)** — Very broad enterprise scope: ITSM, ITOM, ITAM/SAM, FSM, HRSD, CSM, SPM, Vulnerability Response, SecOps, IntegrationHub.
- **[#525 pyxel skill](https://github.com/anthropics/skills/pull/525)** — Retro/pixel-art game development with Python via pyxel-mcp; submitted by the Pyxel engine's creator.
- **[#181 SAP-RPT-1-OSS predictor](https://github.com/anthropics/skills/pull/181)** — SAP's open-source tabular foundation model for predictive analytics on SAP business data.
- **[#1367 self-audit](https://github.com/anthropics/skills/pull/1367)** — Universal mechanical + reasoning quality gate; paired with proposal [#1385](https://github.com/anthropics/skills/issues/1385).

## 4. Skills Ecosystem Insight

The community's most concentrated demand is a dependable skill-development toolchain — three independent open PRs (#1298, #1099, #1050) plus issue #556 all target the same broken `run_eval.py` evaluation loop — followed by document-format breadth (PDF, DOCX, ODT, typography) and, most urgently voiced, trust-boundary safety in how community skills are named and distributed.

---

# Claude Code Community Digest — 2026-08-20

## Today's Highlights

Two patch releases shipped: v2.1.237 fixes prompt caching for LLM gateways/custom base URLs and adds a built-in "Concise" output style, while v2.1.236 introduces `ANTHROPIC_DEFAULT_MODEL` plus idle notifications for cross-session messaging. On the community side, the long-running TUI copy/paste bug (#18170) remains the most-voted open issue at 286 👍, and the popular persistent-memory request (#34556) was closed after a 95-comment thread.

## Releases

- **v2.1.237** — Fixed prompt caching for sessions using an LLM gateway or custom base URL. Added a built-in **"Concise" output style** (selectable under Output style in `/config`) that leads with results and skips preamble/narration while doing the work just as thoroughly.
- **v2.1.236** — Added `ANTHROPIC_DEFAULT_MODEL` to set the starting model for new sessions; a `/model` pick overrides it and persists across restarts (unlike `ANTHROPIC_MODEL`). Added `notify_when_idle` to cross-session `SendMessage` for asking another Claude Code session.

## Hot Issues

1. **[#18170 — Copy/paste from terminal includes unwanted indentation and trailing spaces](https://github.com/anthropics/claude-code/issues/18170)** — OPEN, 134 comments, 286 👍. Copied text retains leading tabs/spaces aligned to the `>` prompt and trailing whitespace. The highest-engagement open issue and a daily annoyance for anyone extracting code from the TUI.

2. **[#34556 — Persistent Memory Across Context Compactions](https://github.com/anthropics/claude-code/issues/34556)** — CLOSED, 95 comments. A user documented 59 compactions over 26 days and built a custom memory persistence system after losing context state. The closure of this heavily-discussed feature request will draw community attention.

3. **[#27242 — No working mechanism to review previous context after compaction](https://github.com/anthropics/claude-code/issues/27242)** — OPEN, 17 comments, 80 👍. Transcript data is preserved in `transcript.jsonl`, but the TUI offers no way to access it after compaction, plan-mode clear, or branch navigation.

4. **[#27957 — Option to disable 'quoted characters in flag names' warning](https://github.com/anthropics/claude-code/issues/27957)** — OPEN, 26 comments, 74 👍. Normal commands like `git commit -m "message"` trigger confirmation prompts after a recent update; widespread friction with the permission system.

5. **[#26997 — SSH dialog cannot connect when default key is encrypted](https://github.com/anthropics/claude-code/issues/26997)** — OPEN, 31 comments, 42 👍. The desktop SSH dialog fails on passphrase-protected `~/.ssh/id_ed25519` with no way to prompt for a passphrase.

6. **[#18157 — Option+Backspace (delete word) not working in Ghostty](https://github.com/anthropics/claude-code/issues/18157)** — OPEN, 13 comments, 38 👍. Works in the terminal outside Claude Code but not in the TUI on macOS; related to #5196 and #9219.

7. **[#11408 — Ability to name and organize conversation sessions](https://github.com/anthropics/claude-code/issues/11408)** — CLOSED (duplicate), 9 comments, 34 👍. Requests custom names/labels for sessions to organize and quickly identify conversations.

8. **[#26996 — Edit tool silently converts tabs to spaces](https://github.com/anthropics/claude-code/issues/26996)** — OPEN, 20 comments, 30 👍. Causes repeated match failures on tab-indented files; a correctness bug that undermines trust in automated edits.

9. **[#26572 — CustomPaneBackend protocol to decouple agent teams from tmux CLI](https://github.com/anthropics/claude-code/issues/26572)** — OPEN, 8 comments, 28 👍. Proposal from the KILD creator for a pluggable pane backend supporting Ghostty, WezTerm, Zellij, and remote deployments.

10. **[#12070 — Session permission mode 'acceptEdits' not persisting](https://github.com/anthropics/claude-code/issues/12070)** — OPEN, 12 comments, 26 👍. "Yes, and accept all for this session" doesn't stick; users get prompted for every Edit on Linux.

## Key PR Progress

Only **1 pull request** was updated in the last 24 hours:

- **[#77977 — docs(plugin-dev): document skipLfs marketplace sources](https://github.com/anthropics/claude-code/pull/77977)** — OPEN. Documents the `skipLfs` option for `github` and `git` marketplace source objects in plugin-dev guidance, with examples for GitHub shorthand and generic Git URLs that skip Git LFS downloads. Refs #63035. Docs only.

## Feature Request Trends

- **Conversation memory and history navigation** — The strongest theme. Persistent memory across compactions (#34556), accessible history after compaction (#27242), and named sessions (#11408) all point to demand for durable, navigable session state.
- **Output style and UI verbosity controls** — Users want to tame Claude's narration: the "Concise" output style landed in v2.1.237, while requests continue for spinner verb overrides (#41905, #64098) and disabling animated verb rotation.
- **Permission system granularity** — Opt-out for the quoted-character flag warning (#27957), a setting to block `dangerouslyOverrideSandbox` (#10089), and persistent per-session accept modes (#12070) show demand for precise, sticky permission controls.
- **Terminal/agent infrastructure extensibility** — The CustomPaneBackend proposal (#26572) signals interest in pluggable terminal multiplexing backends instead of a hard tmux dependency for agent teams.

## Developer Pain Points

- **TUI text handling** — Copy/paste whitespace corruption (#18170), truncated bash output that won't expand (#26954), and broken word-delete in Ghostty (#18157) degrade the terminal experience across platforms.
- **Context accounting confusion** — False "Context low" warnings with plenty of free space (#6616), context-limit errors despite 32k free tokens (#18159), and a status-line percentage that doesn't match internal calculations (#17959).
- **Permission prompt fatigue** — Repeated prompts despite "accept all" (#12070), spurious quoted-character warnings (#27957), and "Always Allow" mismatches on compound Windows commands (#27688).
- **Edit tool whitespace normalization** — Silent tab-to-space conversion (#26996) breaks matching on tab-indented files and erodes trust in the Edit tool.
- **SSH/remote configuration friction** — Encrypted default keys block the desktop SSH dialog (#26997), and remote sessions inherit local plugin/MCP paths that don't exist remotely, causing hangs (#25664).
- **Resource exhaustion risks** — Bundled ugrep ballooning to 9–14 GB RSS on bounded regexes (#83342) and unbounded task output files filling a 278 GB disk (#41737) are serious stability concerns.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-08-20

## Today's Highlights

Windows reliability dominates the conversation: the in-app Browser plugin's Trusted RPC path-validation failure (#39136) is the most active issue this week (80 comments, 42 👍), with several related reports filed in the last 24 hours. Separately, a detailed usage analysis (#35050) claims GPT-5.6 frequently serializes independent Code Mode calls, and that explicit batching cut weighted token usage by 27–45% — a finding that has resonated with users watching their spend. Two new `rust-v0.149.0-alpha` releases landed, though no detailed changelog was published.

## Releases

- [rust-v0.149.0-alpha.2](https://github.com/openai/codex/releases/tag/rust-v0.149.0-alpha.2) — version bump, no changelog details provided.
- [rust-v0.149.0-alpha.3](https://github.com/openai/codex/releases/tag/rust-v0.149.0-alpha.3) — version bump, no changelog details provided.

## Hot Issues

1. **[#39136 — Codex built-in browser plugin initialization fails: Trusted RPC dependency is not within a trusted code path](https://github.com/openai/codex/issues/39136)** — The top issue by engagement (80 comments, 42 👍). Windows users on app build 26.814.41407 report the in-app browser cannot start because the bundled browser runtime fails RPC trust-path validation. This is the center of a wider cluster: #39399, #39387, and #39486 describe the same failure on Windows 10/11 across multiple versions.

2. **[#35050 — GPT-5.6 often serializes independent Code Mode calls; explicit batching reduced weighted usage by 27–45%](https://github.com/openai/codex/issues/35050)** — A data-driven report from a Pro/Business user showing the model tends to execute independent tool calls sequentially, and that batching them explicitly produces substantial weighted-usage savings. 25 comments, 40 👍 — high community interest in cost optimization.

3. **[#39239 — Windows: `thread/archive` fails with "os error 2" after `thread/resume` stores a `\\?\` rollout_path](https://github.com/openai/codex/issues/39239)** — Archiving a resumed thread fails because the verbatim Windows path prefix breaks path-equality checks, causing the same file to be queued twice. 21 comments; related to #39150, which reports the same `\\?\` archive failure in the Desktop UI.

4. **[#33493 — Local compaction v2 retains unbounded input_image payloads, causing repeated auto-compaction](https://github.com/openai/codex/issues/33493)** — Image-heavy threads enter a repeated auto-compaction loop because compacted context keeps unbounded image payloads. 18 comments, affects macOS Desktop with `gpt-5.6-sol`.

5. **[#27117 — Windows standalone update from pwsh inherits PSModulePath into powershell.exe, causing Get-FileHash to fail](https://github.com/openai/codex/issues/27117)** — The updater spawns Windows PowerShell from PowerShell 7 and inherits incompatible module paths, breaking update verification. 18 comments, 13 👍.

6. **[#39162 — macOS: Opening an existing conversation invalidates ChatGPT auth and redirects to sign-in](https://github.com/openai/codex/issues/39162)** — Regression on 26.814.41407: opening a saved conversation forces re-authentication. 15 comments, 14 👍.

7. **[#23527 — Codex mobile does not show SSH remote projects from connected Mac host](https://github.com/openai/codex/issues/23527)** — Remote projects visible in the Mac app never appear in the mobile project selector. 15 comments, 21 👍 — the most-reacted issue on the list relative to comment count.

8. **[#37104 — Windows/WSL integrated terminal silently fails before PTY/WSL startup](https://github.com/openai/codex/issues/37104)** — Bottom and side panels cannot open in the Store build; failure happens before PTY/WSL initialization. 14 comments.

9. **[#38754 — Windows: Local stdio MCP servers are repeatedly spawned and not reaped within a single task](https://github.com/openai/codex/issues/38754)** — Each new turn respawns MCP servers, leaking processes inside a task. 10 comments; a meaningful performance/reliability concern for MCP-heavy Windows workflows.

10. **[#13919 — Conflict between Codex and Antivirus (Bitdefender)](https://github.com/openai/codex/issues/13919)** — Long-running issue (since March) where Bitdefender interferes with Codex's PowerShell actions; 16 👍, recently active again. Highlights a broader theme of Windows security-software friction.

## Key PR Progress

1. **[#39524 — Stop treating Git commands as inherently safe](https://github.com/openai/codex/pull/39524)** — Security hardening: repository configuration can make even read-only Git commands execute helpers, so Git arguments alone can't establish trust. Removes Git from known-safe command classification.

2. **[#39520 — Isolate automatic plugin Git operations](https://github.com/openai/codex/pull/39520)** — Prevents background marketplace/plugin refreshes from inheriting project-local Git configuration that could redirect remotes or invoke helpers during automatic operations.

3. **[#39523 — Persist thread section moves before the first turn](https://github.com/openai/codex/pull/39523)** — Fixes non-ephemeral threads disappearing from section-filtered lists by materializing and flushing the thread before the first turn.

4. **[#39514 — Use stored item types when materializing turn summaries](https://github.com/openai/codex/pull/39514)** — Selects summary items using the materialized `item_type` column, with a fallback for rows written by older clients — a compatibility fix for session history rendering.

5. **[#39510 — Track built-in control tool calls in analytics](https://github.com/openai/codex/pull/39510)** — Adds `codex_control_tool_call_event` telemetry for `request_user_input`, `update_plan`, `view_image`, and goal tools, including correlation/timing metadata and terminal states.

6. **[#39474 — Consolidate Guardian extensions into `codex-guardian-v2`](https://github.com/openai/codex/pull/39474)** — Moves the Guardian thread lifecycle contributor and subagent-spawn context into a single extension entry point, removing redundant initialization paths.

7. **[#39452 — Remove the feature gate for async user messages](https://github.com/openai/codex/pull/39452)** — Exposes `send_user_message_async` to root agents whenever the model advertises support; keeps `send_async_message` as an accepted-but-inert compatibility flag.

8. **[#39493 — Make head-tail buffer capacity const generic](https://github.com/openai/codex/pull/39493)** — Refactors `HeadTailBuffer` to take capacity as a const generic, with `UNIFIED_EXEC_OUTPUT_MAX_BYTES` as the production default — groundwork for safer output-buffer handling.

9. **[#39480 — Move shell snapshot tests into shell-command](https://github.com/openai/codex/pull/39480)** — Co-locates Bash/zsh snapshot-script tests with `codex-shell-command` where the implementation lives, improving test locality.

10. **[#31155 — fix: release thread writer after failed shutdown](https://github.com/openai/codex/pull/31155)** — Fixes a terminal session reporting shutdown complete while the `RolloutRecorder` writer is still held for retry, which previously left a stale live-writer lease and caused later failures.

Also notable: [#31817 — Update models.json](https://github.com/openai/codex/pull/31817) remains open as an automated model-catalog refresh.

## Feature Request Trends

- **Usage/credit control** is the clearest recurring request: [#28382](https://github.com/openai/codex/issues/28382) asks for a toggle to prevent automatic use of purchased Codex credits once included usage is exhausted; [#6372](https://github.com/openai/codex/issues/6372) requests a config option to disable the "switch models" prompt near allowance limits; [#39577](https://github.com/openai/codex/issues/39577) reports banked rate-limit resets disappearing after a brief subscription lapse and re-activation.
- **Cost transparency and efficiency** — users want leverage over how the model batches calls and consumes context, as evidenced by the strong reception of #35050 and the ongoing concern over compaction loops in #33493.
- **Cross-platform parity for remote/mobile flows** — surfaced by #23527 (SSH remotes missing on mobile) and the persistent Windows feature/parity gap across browser, sandbox, and terminal subsystems.

## Developer Pain Points

- **Windows path handling is the most widespread theme**: `\\?\` extended-length prefixes break thread archiving (#39239, #39150), and stale verbatim paths cause duplicate queueing and `os error 2` failures.
- **Windows trust/security friction**: the Browser plugin's Trusted RPC validation fails across multiple app builds (#39136, #39399, #39387, #39486); Bitdefender blocks Codex actions (#13919); the sandbox fails with `CreateProcessAsUserW` error 5 (#26803) and Schannel `SEC_E_NO_CREDENTIALS` (#17459).
- **Process lifecycle problems on Windows**: stdio MCP servers are spawned per-turn without reaping (#38754), and the updater breaks because of `PSModulePath` leakage between PowerShell editions (#27117).
- **Session/state reliability** — users report stuck "Thinking" states (#24850, #34026), auth invalidations when reopening conversations (#39162), and compaction loops driven by retained image payloads (#33493).

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

## Gemini CLI Community Digest — 2026-08-20

### Today's Highlights
The project shipped **v0.57.0-preview.0** with fixes for Cloud Workstations OAuth flows and IDE connection directory mismatches, alongside the **v0.56.0** stable release. Security hardening is the dominant PR theme, with multiple contributions preventing fail-open behavior for corrupt MCP configs and enforcing authentication on the A2A server. Community attention remains focused on agent reliability, with top issues involving subagent MAX_TURNS being misreported as success and generalist agents hanging indefinitely.

### Releases

- **v0.57.0-preview.0** — Fixes dynamic resolution of Cloud Workstations proxy redirect URI for OAuth flows ([#28688](https://github.com/google-gemini/gemini-cli/pull/28688)) and resolves a swallowed directory mismatch in IDE connections.
- **v0.56.0** — Stable release. [Full changelog](https://github.com/google-gemini/gemini-cli/compare/v0.55.1...v0.56.0)
- **v0.56.0-nightly.20260820.ge90c63fa1** — Preserves empty text turns when tools or media are present in the conversation ([#28892](https://github.com/google-gemini/gemini-cli/pull/28892)).

### Hot Issues

1. **[#22323 — Subagent MAX_TURNS reported as GOAL success](https://github.com/google-gemini/gemini-cli/issues/22323)** — A `codebase_investigator` subagent that hits its turn limit before any analysis is still reported as `status: "success"` with `Termination Reason: "GOAL"`. This masks real interruptions and makes debugging failures significantly harder. 12 comments, community-driven.

2. **[#21409 — Generalist agent hangs](https://github.com/google-gemini/gemini-cli/issues/21409)** — Simple tasks like folder creation defer to the generalist agent and hang indefinitely (up to an hour). Workaround: instructing the model not to use subagents. 8 comments, 8 👍.

3. **[#19873 — Zero-dependency OS sandboxing for bash](https://github.com/google-gemini/gemini-cli/issues/19873)** — Proposal to leverage Gemini 3's native bash affinity with OS-level sandboxing plus post-execution intent routing, balancing capability against security/UX. 8 comments.

4. **[#24353 — Robust component-level evaluations](https://github.com/google-gemini/gemini-cli/issues/24353)** — Epic tracking expansion of the 76 behavioral eval tests across 6 supported Gemini models; community wants better regression coverage for agent components. 7 comments.

5. **[#22745 — AST-aware file reads, search, and mapping](https://github.com/google-gemini/gemini-cli/issues/22745)** — Suggests AST-aware tools for precise method-bound reads and context reduction. Paired with the "Tactful Extraction" issue ([#19561](https://github.com/google-gemini/gemini-cli/issues/19561)) targeting surgical token-frugal code discovery. 7 comments.

6. **[#21968 — Gemini doesn't use skills and sub-agents enough](https://github.com/google-gemini/gemini-cli/issues/21968)** — Users report the model rarely activates custom skills/sub-agents unless explicitly instructed, even when descriptions clearly match the task. 6 comments.

7. **[#26522 — Auto Memory retries low-signal sessions indefinitely](https://github.com/google-gemini/gemini-cli/issues/26522)** — Sessions that the extraction agent skips as low-signal are never marked processed, causing them to be re-surfaced repeatedly. 5 comments.

8. **[#25166 — Shell command stuck at "Waiting input" after completion](https://github.com/google-gemini/gemini-cli/issues/25166)** — Simple CLI commands finish but the shell remains active awaiting input, forcing manual intervention. 4 comments, 3 👍.

9. **[#26525 — Deterministic redaction and reduced Auto Memory logging](https://github.com/google-gemini/gemini-cli/issues/26525)** — Auto Memory sends transcript content to a background model before redaction happens, and the service can log existing skills. Security-sensitive gap in the memory pipeline. 4 comments.

10. **[#21983 — Browser subagent fails on Wayland](https://github.com/google-gemini/gemini-cli/issues/21983)** — Browser agent reports `Termination Reason: GOAL` despite failing in Wayland environments. Consistent with a pattern of misleading success reporting. 4 comments.

### Key PR Progress

1. **[#28701 — Fix TRUST_PARENT rule precedence in folder-trust resolution](https://github.com/google-gemini/gemini-cli/pull/28701)** — Corrects "longest match wins" logic for `LoadedTrustedFolders.isPathTrusted()` so the most specific configured trust rule takes precedence. Closed.

2. **[#28699 — Enforce authentication and stop checkpoint path traversal in A2A server](https://github.com/google-gemini/gemini-cli/pull/28699)** — Custom REST routes (`/tasks`, `/executeCommand`) bypassed the configured `UserBuilder` and accepted unauthenticated requests; also closes a checkpoint path traversal hole. Closed.

3. **[#28794 — Prevent fail-open and data loss on corrupt MCP enablement config](https://github.com/google-gemini/gemini-cli/pull/28794)** — Fixes [##28786](https://github.com/google-gemini/gemini-cli/issues/28786): invalid `mcp-server-enablement.json` previously returned `{}`, silently re-enabling all servers. Now surfaces the corruption instead of failing open.

4. **[#28787 — Don't treat corrupt MCP enablement config as empty](https://github.com/google-gemini/gemini-cli/pull/28787)** — Companion fix: JSON parse failures in `readConfig()` were collapsed into the "file does not exist" empty-object path, causing every server to default to enabled.

5. **[#28789 — Fix vscode-ide-companion stop() hang and keep-alive failure threshold](https://github.com/google-gemini/gemini-cli/pull/28789)** — Resolves `IdeServer.stop()` hanging when active streaming MCP sessions are open, and fixes a resource leak where intermittent ping failures never triggered cleanup.

6. **[#28788 — Behavioral evals for skill activation and URL fetching](https://github.com/google-gemini/gemini-cli/pull/28788)** — Adds evaluations for `activate_skill` and `web_fetch`, improves Windows compatibility for local eval runs, and fixes EDK report aggregation for skipped tests.

7. **[#28898 — Harden pr-generator-core subprocess execution security](https://github.com/google-gemini/gemini-cli/pull/28898)** — Prevents sensitive authentication tokens from leaking into untrusted tool execution environments, plus hardening of config ingestion and GitHub API interactions.

8. **[#28922 — GCS trajectory logging and artifact preservation for PR generation](https://github.com/google-gemini/gemini-cli/pull/28922)** — Adds GCS stream/chunk persistence and debug artifact storage to support post-mortem inspection and evaluation of coding/repair loops.

9. **[#28863 — Prompt for consent on environment changes and sanitize runtime-altering env vars](https://github.com/google-gemini/gemini-cli/pull/28863)** — Closes a gap where extension updates could bypass consent checks and inject unauthorized environment variables into spawned MCP server processes.

10. **[#28915 — Consistent symlink evaluation in ignore path handling](https://github.com/google-gemini/gemini-cli/pull/28915)** — Ensures `.geminiignore` and `.gitignore` rules are evaluated against both literal and canonical (resolved symlink) paths, eliminating tool behavior inconsistencies.

### Feature Request Trends

- **AST-aware code navigation**: Multiple issues ([#22745](https://github.com/google-gemini/gemini-cli/issues/22745), [#22746](https://github.com/google-gemini/gemini-cli/issues/22746), [#19561](https://github.com/google-gemini/gemini-cli/issues/19561)) push for AST-powered reads, codebase mapping, and token-frugal "tactful extraction" to cut context bloat.
- **Agent self-awareness and observability**: Users want subagent trajectories visible via `/chat share` ([#22598](https://github.com/google-gemini/gemini-cli/issues/22598)) and accurate self-knowledge of CLI flags/hotkeys ([#21432](https://github.com/google-gemini/gemini-cli/issues/21432)).
- **Stricter safety defaults**: Requests for discouraging destructive git/DB commands ([#22672](https://github.com/google-gemini/gemini-cli/issues/22672)), deterministic secret redaction in Auto Memory ([#26525](https://github.com/google-gemini/gemini-cli/issues/26525)), and OS-level sandboxing ([#19873](https://github.com/google-gemini/gemini-cli/issues/19873)).
- **Agent resilience/recovery**: Browser agent session takeover and lock recovery ([#22232](https://github.com/google-gemini/gemini-cli/issues/22232)), plus robust component-level eval infrastructure ([#24353](https://github.com/google-gemini/gemini-cli/issues/24353)).

### Developer Pain Points

- **Misleading success reporting**: Subagents that hit MAX_TURNS or fail (browser/Wayland) are frequently reported as GOAL success, hiding real failures and eroding trust in agent diagnostics.
- **Hangs and stuck prompts**: Generalist agent hangs and post-completion "Waiting input" shell states require manual cancellation, disrupting long-running workflows.
- **Symlink support gaps**: Agent files in `~/.gemini/agents/` are not recognized when symlinked ([#20079](https://github.com/google-gemini/gemini-cli/issues/20079)); ignores behave inconsistently across symlinked paths.
- **Config corruption risks**: Corrupt MCP enablement configs fail open, silently re-enabling servers — a security and data-loss concern ([#28786](https://github.com/google-gemini/gemini-cli/issues/28786)).
- **Context and tool limits**: 400 errors with >128 tools ([#24246](https://github.com/google-gemini/gemini-cli/issues/24246)), large file-read "firehosing" of context, and model-generated temp script litter across workspaces ([#23571](https://github.com/google-gemini/gemini-cli/issues/23571)).

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-08-20

## 1. Today's Highlights
Three patch releases (v1.0.81-3 → v1.0.81-5) shipped in the last 24 hours, with v1.0.81-5 fixing a visible transcript bug where answered prompts left duplicate `(pending)` lines on screen. The issue tracker shows a spike in regressions tied to the 1.0.81 prerelease line — sandbox enforcement overriding explicit user config, terminal UI freezes during parallel subagent runs, and ACP mode auto-approving tool calls again. Meanwhile, the Atlassian MCP OAuth failure (`RFC 8414 §3.3`) continues to affect users across multiple versions. No pull requests were updated or merged during this window.

## 2. Releases
- [v1.0.81-5](https://github.com/github/copilot-cli/releases/tag/v1.0.81-5) — Fixes a prompt sent while the agent is working no longer leaving a second copy of itself stuck as `(pending)` at the bottom of the transcript after it has been answered.
- [v1.0.81-4](https://github.com/github/copilot-cli/releases/tag/v1.0.81-4) — General fixes and changes.
- [v1.0.81-3](https://github.com/github/copilot-cli/releases/tag/v1.0.81-3) — General fixes and changes.

## 3. Hot Issues
1. **[#4522 — Copilot CLI 1.0.81 forces sandbox while managed policy is undetermined, overriding `sandbox.enabled=false`](https://github.com/github/copilot-cli/issues/4522)** — The local sandbox engages even when the user explicitly disabled it and no MDM/managed settings exist. With 7 👍, this is the highest-reaction open issue today and a serious trust/config-override problem for enterprise users.

2. **[#4390 (CLOSED) — Enabled organization models missing from catalogue (Claude Sonnet 5/Opus 5, Kimi K3)](https://github.com/github/copilot-cli/issues/4390)** — Org-enabled Anthropic models are reported as "disabled by your organization" in the CLI. The most-discussed issue in this window with 15 comments and 7 👍, now closed — worth verifying the resolution on your org.

3. **[#4480 — Atlassian MCP OAuth fails with "Incompatible authorization server (RFC 8414 §3.3)"](https://github.com/github/copilot-cli/issues/4480)** — Regression from 1.0.71; remote MCP OAuth discovery breaks with issuer/metadata URL mismatch. 6 👍 and a companion report in [#4490](https://github.com/github/copilot-cli/issues/4490) (broken in 1.0.80, worked in 1.0.78). Still open and affecting a popular production MCP server.

4. **[#4537 — ACP mode auto-approves tool calls again; `session/request_permission` not sent since 1.0.81-1](https://github.com/github/copilot-cli/issues/4537)** — Shell commands, file edits, and deletions execute unattended with no permission prompt — a security regression of the previously fixed #845. High severity for anyone driving the CLI through ACP hosts.

5. **[#4521 — Sandbox cannot be disabled](https://github.com/github/copilot-cli/issues/4521)** — Config reports sandbox "disabled" while runtime status still shows it enabled, and execution keeps applying it. 4 👍; directly related to the #4522 cluster.

6. **[#4524 (CLOSED) — Sandbox won't let copilot use git anymore](https://github.com/github/copilot-cli/issues/4524)** — Enforced-sandbox builds are overly restrictive: even after enabling the entire working directory and `~/.copilot`, git operations fail. Closed, but indicative of the sandbox friction users are hitting in 1.0.81.

7. **[#4527 — `copilot -p` fails with 401 on GHEC data residency since 1.0.81-1](https://github.com/github/copilot-cli/issues/4527)** — Non-interactive prompt mode fetches the model catalog from `api.githubcopilot.com` instead of the tenant endpoint, breaking all `-p` usage on data-residency tenants while interactive mode still works.

8. **[#4533 — Terminal UI stops consuming events (input + scroll dead) when a turn spawns parallel subagents](https://github.com/github/copilot-cli/issues/4533)** — On 1.0.81-4/1.0.81-5 the UI freezes while the underlying Rust runtime keeps working, leaving subagents to run unattended and results invisible to the user.

9. **[#4525 — 1.0.81-1 sends legacy `initialize` after successful modern `server/discover`, causing -32022](https://github.com/github/copilot-cli/issues/4525)** — MCP initialization fails against servers using the Python MCP SDK 2.0.0 dual-era runner. Protocol negotiation is mishandled, breaking stdio servers built on current SDKs.

10. **[#4528 — Non-interactive sessions bypass `disableBypassPermissionsMode` managed setting](https://github.com/github/copilot-cli/issues/4528)** — `-p` with `--allow-all`/`--yolo` grants full permissions even when managed settings require bypass mode to be disabled. Silent policy escape for enterprises.

## 4. Key PR Progress
No pull requests were updated or merged in the last 24 hours.

## 5. Feature Request Trends
- **Durable agent memory:** [#4441](https://github.com/github/copilot-cli/issues/4441) asks for preserving durable context across repeated compactions, noting that each re-summarization is recursively lossy and degrades early decisions.
- **Session preference persistence:** [#4530](https://github.com/github/copilot-cli/issues/4530) requests that reasoning effort (not just model) persist across restarts; today it resets to Medium.
- **Plugin marketplace discoverability:** [#4523](https://github.com/github/copilot-cli/issues/4523) proposes interactive search/filtering for `copilot plugin marketplace browse` as the flat list becomes unusable.
- **Model catalogue fidelity:** The closed [#4390](https://github.com/github/copilot-cli/issues/4390) highlights a broader enterprise need: the CLI's effective model list must match org-enabled models exactly, including new Anthropic and Kimi families.

## 6. Developer Pain Points
- **Sandbox configuration chaos (highest-frequency cluster):** Users report sandbox forcing itself on despite `"enabled": false` ([#4521](https://github.com/github/copilot-cli/issues/4521), [#4522](https://github.com/github/copilot-cli/issues/4522)), blocking git and everyday shell use ([#4524](https://github.com/github/copilot-cli/issues/4524)), ignoring RW path grants for JVM/Java processes ([#4516](https://github.com/github/copilot-cli/issues/4516)), and being bypassable in non-interactive mode ([#4528](https://github.com/github/copilot-cli/issues/4528)).
- **MCP authentication and protocol regressions:** OAuth breakage against Atlassian MCP across 1.0.79/1.0.80 ([#4480](https://github.com/github/copilot-cli/issues/4480), [#4490](https://github.com/github/copilot-cli/issues/4490)), forced re-auth sending `prompt=select_account` to non-Microsoft providers ([#4526](https://github.com/github/copilot-cli/issues/4526)), dual-era `initialize`/`server/discover` conflicts ([#4525](https://github.com/github/copilot-cli/issues/4525)), and image content blocks dropped from MCP tool results ([#4536](https://github.com/github/copilot-cli/issues/4536)).
- **Terminal UI regressions in the 1.0.81 line:** duplicate pending lines filling the screen ([#4532](https://github.com/github/copilot-cli/issues/4532), fixed in v1.0.81-5), complete UI freeze during parallel subagents ([#4533](https://github.com/github/copilot-cli/issues/4533)), backspace deleting whole words ([#4447](https://github.com/github/copilot-cli/issues/4447)), and dropped enter/key events when panes are unfocused ([#4213](https://github.com/github/copilot-cli/issues/4213)).
- **Prerelease channel/version confusion:** `autoUpdate: false` is ignored and a cached prerelease keeps re-exec-ing over the npm stable install ([#4534](https://github.com/github/copilot-cli/issues/4534)); `store_memory` fails with `Instance id is required` in 1.0.81 prereleases ([#4535](https://github.com/github/copilot-cli/issues/4535)); GHEC data-residency tenants break in prompt mode only ([#4527](https://github.com/github/copilot-cli/issues/4527)).

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI Community Digest — 2026-08-20

## Today's Highlights
The MoonshotAI/kimi-cli project had a quiet 24 hours: no new releases and no pull request activity. The sole signal is a closed ACP issue (#2609) reporting that Grep and Glob tools are fully blocked in ACP runtime on kimi-code 0.37.1, underscoring incomplete tool parity for ACP clients like Zed.

## Hot Issues
Only one issue was updated in the last 24 hours; it is already closed.

### [#2609 — [ACP] Grep/Glob blocked: "ACP runtime only supports interactive Bash tool processes"; Bash intermittently reports "ACP terminal capability is unavailable"](https://github.com/MoonshotAI/kimi-cli/issues/2609) — Closed
- **Why it matters:** On kimi-code 0.37.1 (macOS, ACP client: Zed via `kimi acp`), the built-in Grep and Glob tools fail on every invocation with "ACP runtime only supports interactive Bash tool processes," while Read works correctly. This breaks core code-search and file-discovery workflows for ACP users and reveals a hard runtime restriction: non-interactive Bash-backed tools are disabled inside ACP sessions. The additional "ACP terminal capability is unavailable" error for Bash introduces intermittent flakiness in the fallback path.
- **Community reaction:** Zero comments and zero reactions. The issue was opened and closed within the same day with no public explanation, leaving affected users without a documented workaround or a clear timeline for a fix in a release.

## Key PR Progress
No pull requests were updated in the last 24 hours.

## Feature Request Trends
- **Full ACP tool parity:** The most recent issue reinforces a growing expectation that Grep, Glob, and Bash tools behave identically in ACP sessions as they do in interactive terminal mode. The current "interactive Bash only" constraint forces ACP clients (e.g., Zed) into a degraded experience where basic search and file-lookup tooling is unusable.

## Developer Pain Points
- **ACP runtime restrictions:** Non-interactive tool processes (Grep/Glob) are blocked outright, breaking fundamental search and file-discovery operations for ACP-backed editors.
- **Intermittent Bash capability failures:** "ACP terminal capability is unavailable" appears sporadically, complicating error handling and retry logic for client-side implementers.
- **Low-visibility issue resolution:** The issue was closed without comments, so users lack insight into whether this was a duplicate, a deliberate limitation, or a silently shipped fix.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-08-20

## Today's Highlights

A severe data-integrity bug surfaced today: growing workspace files cause OOM crashes and ~30 GB databases, the most critical issue in the tracker. On the fix side, the team landed a substantial hardening batch — five `Latch`-based concurrency refactors across core, server, and TUI, plus a model-limits removal and model variant fallback system. Model reliability around GPT-5.6 variants (Luna, sol-fast) remains the hottest operational theme, with several provider-side failures reported against OpenCode Go.

## Releases

No new releases in the last 24 hours.

## Hot Issues

- **[#43551 — OOM and ~30 GB database: huge workspace-file diffs re-serialized on every `message.updated` event](http://github.com/anomalyco/opencode/issues/43551)** — A session tracking growing log files (292 MB and 407 MB) embeds full diffs into message summaries, then re-serializes them on every update event. The result is memory exhaustion and database bloat. The most severe open issue; likely to drive a quick fix.

- **[#43367 — [2.0] subagents: gpt-5.6-sol-fast fails when `prompt_cache_retention` is injected (CLOSED)](http://github.com/anomalyco/opencode/issues/43367)** — Subagents using `gpt-5.6-sol-fast` with the `max` variant halted after tool execution because OpenCode sent an unsupported `prompt_cache_retention` option. Three review subagents failed within minutes. 10 👍 — the highest-reacted issue today; now closed.

- **[#42700 — [2.0] tui: leaks ~21MB `.so` per launch into /tmp; fills tmpfs and breaks TUI startup](http://github.com/anomalyco/opencode/issues/42700)** — Every TUI launch leaks a ~21 MB shared object into the temp directory. On Arch Linux with tmpfs, enough launches fill the filesystem and the TUI fails with an OpenTUI library load error.

- **[#42291 — Auto-updater breaks global npm install: stub binary + missing shims, hung npm processes](http://github.com/anomalyco/opencode/issues/42291)** — On Windows, the auto-updater can permanently break a global npm install, leaving a stub binary, missing shims, and orphaned `npm install` processes. Startup-triggered corruption is particularly nasty for users who rely on `opencode-ai` from npm.

- **[#19143 — [FEATURE] Implement message search (Cmd+F / Ctrl+F) in the Desktop App](http://github.com/anomalyco/opencode/issues/19143)** — Long-standing request (March) for quick in-session search, now with 8 comments and 7 👍. Users need to locate specific information inside long sessions without scrolling.

- **[#43565 — gpt-5.6-luna returns empty response / 403 error with OpenCode Go API](http://github.com/anomalyco/opencode/issues/43565)** — Model returned empty responses and 403 errors through the OpenCode Go endpoint when called from Claude Code CLI via `https://opencode.ai/zen/go/v1`.

- **[#43557 — OpenCode Go: existing GPT-5.6 Luna sessions fail with `invalid_encrypted_content`](http://github.com/anomalyco/opencode/issues/43557)** — Multi-turn Luna sessions repeatedly fail with `invalid_encrypted_content` on continuation. When combined with #43565, this signals a pattern of server-side issues for new GPT-5.6 variants through OpenCode Go.

- **[#43563 — [2.0] TUI: text typed while a submit POST is in flight is silently destroyed](http://github.com/anomalyco/opencode/issues/43563)** — Found via seeded network-chaos property testing (seeds 1, 7, 99). The prompt component clears the composer only after the awaited `session.prompt` POST resolves, so any text typed during the in-flight request is lost. Silent data loss in the primary input path.

- **[#42532 — [2.0] server: workspace=global requests return 500 'Path is not absolute: global'](http://github.com/anomalyco/opencode/issues/42532)** — The Desktop client shows repeated "failed to reload global" toasts because almost every workspace-scoped API returns HTTP 500 when the workspace is `global`. Breaks core desktop functionality for users on the new server.

- **[#43553 — [2.0] tui: cannot close tab for active conversation — tab reappears after clicking X](http://github.com/anomalyco/opencode/issues/43553)** — The active conversation's tab cannot be closed; it briefly disappears then reappears, and persists across restarts. Other tabs close normally, isolating the bug to active-session handling.

## Key PR Progress

- **[#43581 — refactor(ai): remove model limits](http://github.com/anomalyco/opencode/pull/43581)** — Removes model capability limits from AI model, route, and provider-package defaults; stops projecting Core catalog limits into provider settings; defaults Anthropic Messages `max_tokens` to 32K while preserving explicit `generation.maxTokens`. A significant philosophical and architectural shift toward letting models self-limit.

- **[#43574 — feat(core): add configured model variant fallbacks](http://github.com/anomalyco/opencode/pull/43574)** — Generates conservative package-aware variants for newly configured models when `variants` is omitted; preserves explicit variant arrays and `variants: []` as opt-out across layered config. Supports AI SDK and native OpenAI, OpenAI-compatible, Azure, Google, Vertex, and Anthropic.

- **[#43576 — fix(core): settle foreign typed tool failures instead of dropping them](http://github.com/anomalyco/opencode/pull/43576)** — Plugin tools failing with non-`Tool.Error` errors leave their tool call permanently unsettled: the part stays `running` with a live spinner forever while execution reports success. Found by a drive gauntlet probe; this fix settles those failures properly.

- **[#43575 — fix(ai): settle pending Responses tool calls](http://github.com/anomalyco/opencode/pull/43575)** — Finalizes pending function calls when a Responses stream reaches successful completion without `response.output_item.done`, parsing accumulated arguments through the canonical tool-input path so the session can validate or execute the call.

- **[#43562 — fix(tui): stop registering one resize listener per transcript row](http://github.com/anomalyco/opencode/pull/43562)** — Listener count grew linearly with transcript length, tripping Bun's EventTarget max-listeners warning within ~4 prompts and climbing into dozens over long sessions. Root-cause fix for a memory-leak-adjacent degradation.

- **[#43567 — chore: upgrade Effect to rc.110](http://github.com/anomalyco/opencode/pull/43567)** — Upgrades the V2 workspace from Effect 4.0.0-beta.107 to 4.0.0-rc.110 across core, Node platform, OpenTelemetry, and Bun SQLite packages. Lockfile resolves a single Effect runtime version.

- **[#43360 — feat(ai): support Responses request options](http://github.com/anomalyco/opencode/pull/43360)** — Lowers canonical presence/frequency penalties into Responses requests; adds typed metadata, safety identifier, stream obfuscation, and top-logprob provider options for native OpenAI and Open Responses-compatible routes.

- **[#43499 — feat(plugin): add HTTP routes support for webhook endpoints](http://github.com/anomalyco/opencode/pull/43499)** — Closes #41362. Enables OpenCode server plugins to register HTTP routes, opening up webhook endpoints and custom server-side plugin behavior.

- **[#43578 — fix(tui): show encrypted reasoning status](http://github.com/anomalyco/opencode/pull/43578)** — Renders reasoning parts containing opaque provider metadata but no readable text. Completed opaque reasoning displays as `Thought · <duration> · encrypted`, preserving the `Thinking` treatment while active.

- **[#43570–#43573 — refactor(core/server/tui): use `Latch` for shutdown/startup/output gates](http://github.com/anomalyco/opencode/pull/43570)** — A coordinated batch (MCP startup gate, plugin supervisor ready gate, server shutdown, renderer shutdown, shell output gate) replacing hand-rolled `Deferred` signals with Effect's `Latch` primitive. Expresses open-once, never-failing intent directly and eliminates subtle re-await/`isDone` logic.

## Feature Request Trends

- **Session search in the Desktop app** — #19143 remains the most prominent UI feature request: users need Cmd+F/Ctrl+F to locate content within long sessions.
- **Cloud profile sync** — #43544 requests saving profiles (models and provider API keys) to the cloud, signaling demand for portable multi-machine setups.
- **Model configuration flexibility** — The PR momentum around removing model limits (#43581) and variant fallbacks (#43574) aligns with user friction around provider-specific model behavior.
- **Plugin HTTP/webhook routes** — #43499 (closing #41362) indicates growing demand for server-side plugin extensibility beyond tool calls.
- **Linux clipboard primary buffer** — #32370 adds a `linux_clipboard_selection` config for primary buffer support, a long-running request from Linux TUI users.

## Developer Pain Points

- **Windows desktop reliability** — Two near-identical sidecar timeout reports (#43568, #43559: "Sidecar did not become ready within 60000ms") plus the auto-updater npm corruption (#42291) paint a pattern of Windows-specific instability in installation and desktop startup.
- **OpenCode Go + GPT-5.6 variant failures** — Empty responses/403s (#43565), `invalid_encrypted_content` on existing sessions (#43557), and the `prompt_cache_retention` subagent breakage (#43367) show the newest model variants are causing provider-protocol friction.
- **TUI input and paste regressions** — Cmd+V/Ctrl+V not working in the question dialog's custom answer field was reported twice (#43241, #43233) before being closed, and #43563 shows typed text can be silently destroyed during in-flight submits.
- **Resource leaks and unbounded growth** — The 21 MB-per-launch `/tmp` leak (#42700), the OOM/30 GB database issue (#43551), and the linear resize-listener leak fixed in #43562 all indicate systematic cleanup gaps in TUI and session lifecycle management.
- **Input loss and stuck states** — Users face multiple failure modes where their work or control disappears: destroyed composer text, unclosable active tabs (#43553), agents continuing while trapped in a false location-unavailable modal (#43415), and permanently spinning tool calls (fixed in #43576).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-08-20

## Today's Highlights
Release validation continued with two new benchmark builds (dsw-eas-full-20260819-r1 and dsw-eas-full-20260820-r1) passing SWE-bench Verified 500/500 and Terminal-Bench 2.0 (89). The community shipped targeted fixes for Web Shell clipboard failures over plain HTTP (#9540) and DingTalk quoted-message extraction (#9537), while new bug reports highlighted ACP debug-log session isolation gaps (#9534, #9535) and a Web Shell-sidebar synchronization issue (#9533).

## Releases
- [dsw-eas-full-20260820-r1](https://github.com/QwenLM/qwen-code/releases/tag/dsw-eas-full-20260820-r1) · Benchmark-Qwen-Ref: v0.21.14 — Full end-to-end validation: SWE-bench Verified 500/500, release writeback, Terminal-Bench 2.0 89, final writeback.
- [dsw-eas-full-20260819-r1](https://github.com/QwenLM/qwen-code/releases/tag/dsw-eas-full-20260819-r1) · Benchmark-Qwen-Ref: v0.21.14 — Same validation pipeline: SWE-bench Verified 500/500, Terminal-Bench 2.0 89, release and final writeback.

## Hot Issues
- [#9485 Web Shell copy buttons fail with "Clipboard API is not available" when opened over HTTP from a non-localhost address](https://github.com/QwenLM/qwen-code/issues/9485) — P2 bug in the Web Shell over remote daemon setups: every copy button fails in non-secure contexts. High impact for remote Linux workflows; 4 comments and a fix PR (#9540) landed within 24 hours.
- [#9536 DingTalk channel drops quoted message content for text, richText, and interactiveCard replies](https://github.com/QwenLM/qwen-code/issues/9536) — The channel builds the agent prompt from `text.repliedMsg` but uses the wrong field mapping for the payloads DingTalk actually delivers, silently dropping most quoted content before it reaches the model. Quickly followed by fix PR #9537.
- [#9535 bug(core): debug logs can cross session boundaries in ACP multiplexed processes](https://github.com/QwenLM/qwen-code/issues/9535) — In daemon/ACP mode, each new `Config` overwrites the process-wide debug-log session, so session A's logs can be written to session B's file. A privacy- and debuggability-relevant isolation bug in the daemon path.
- [#9534 ACP debug logs can cross session boundaries in a multiplexed process](https://github.com/QwenLM/qwen-code/issues/9534) — Overlapping report of the same root cause: file debug logging in a single `qwen --acp` process can leak one session's messages into another session's log file.
- [#7167 Fleet Shepherd Dashboard](https://github.com/QwenLM/qwen-code/issues/7167) — Auto-maintained CI/CD status issue tracking bot-fleet PRs, scan-signal age, syncs, dispatches, releases, and cleanups. The community's live window into fleet health.
- [#9032 feat(core): expose structured Workflow execution state](https://github.com/QwenLM/qwen-code/issues/9032) — CLOSED: requested stable JSON-safe state for phase transitions, agent dispatches, dependency edges, approval associations, and event history for dynamic Workflows; closed, indicating the capability shipped or was resolved.

## Key PR Progress
- [#9540 fix(web-shell,webui): fall back to execCommand copy in non-secure contexts](https://github.com/QwenLM/qwen-code/pull/9540) — Routes all copy entry points through a `writeClipboardText()` helper that tries the async Clipboard API, then falls back to the legacy hidden-textarea `execCommand('copy')` path, fixing #9485.
- [#9537 fix(channels): extract quoted DingTalk text, richText, and card replies](https://github.com/QwenLM/qwen-code/pull/9537) — Branches on the quoted message type as DingTalk actually delivers it so plain-text, richText, and interactiveCard replies reach the agent.
- [#9402 feat: agent board — share work across independently started agents](https://github.com/QwenLM/qwen-code/pull/9402) — Filesystem-backed Agent Board MVP for sharing work across independent agents; repurposed after the original agent-view deletion idea was abandoned.
- [#9518 fix(ci): stop counting wedged queued runs as in-flight in the shepherd](https://github.com/QwenLM/qwen-code/pull/9518) — Fixes a deadlock where GitHub creates a run that stays `queued` forever with zero jobs, and `cancel`/`force-cancel`/`delete` all refuse it, wedging the shepherd.
- [#9527 fix(autofix): bind the sandbox image to its pulled digest](https://github.com/QwenLM/qwen-code/pull/9527) — Re-lands the digest-binding piece from frozen PR #9214, with the two Criticals from review (R11-1, R11-2) fixed.
- [#9303 fix(web-shell): bound daemon transcript retention to stop renderer OOM crashes](https://github.com/QwenLM/qwen-code/pull/9303) — Releases raw replay snapshots after injection into the transcript store and caps replay rebuilds, preventing renderer OOM from unbounded session history.
- [#9297 fix(autofix): make the brake's BLOCKED handoff a first-class round outcome](https://github.com/QwenLM/qwen-code/pull/9297) — Rounds following the growth brake's stop-`BLOCKED` instruction previously died as "finished without required output file(s)"; now a valid round outcome.
- [#9491 feat(review): post --comment reviews to Aone Code via the a1 CLI](https://github.com/QwenLM/qwen-code/pull/9491) — Implements the write path for the Aone Code review chain: authorized runs post composed reviews through the org-standard CLI.
- [#9448 feat(review): rule on contract documentation, and matrix layered guards](https://github.com/QwenLM/qwen-code/pull/9448) — Adds a path-scoped checklist for consumer-facing contract documentation that verifies prose against the actual diff.
- [#9260 fix(web-shell): keep a manual session name across /clear](https://github.com/QwenLM/qwen-code/pull/9260) — Persists the user-chosen session name into the successor session before attachment, so auto-titling can't overwrite it; title provenance survives reloads and live updates.

Also notable: [#9506](https://github.com/QwenLM/qwen-code/pull/9506) (invalidate token counts on model-route switch), [#9361](https://github.com/QwenLM/qwen-code/pull/9361) (scheduled tasks can reuse an existing live session), [#8927](https://github.com/QwenLM/qwen-code/pull/8927) (per-channel `sessionRotation` bounding session lifetime), and [#9441](https://github.com/QwenLM/qwen-code/pull/9441) (show edit/exec diffs when a PreToolUse hook returns `ask`).

## Feature Request Trends
- **Structured runtime state for Workflows** — [#9032](https://github.com/QwenLM/qwen-code/issues/9032) requested stable JSON-safe execution state (phase transitions, dispatches, dependency edges, approvals); now closed, signaling the direction is being adopted.
- **Cross-agent collaboration** — [#9402](https://github.com/QwenLM/qwen-code/pull/9402) (Agent Board) reflects growing demand for sharing work and state across independently started agents.
- **Session lifecycle control** — [#9361](https://github.com/QwenLM/qwen-code/pull/9361) (bind scheduled tasks to existing sessions) and [#8927](https://github.com/QwenLM/qwen-code/pull/8927) (session rotation bounds) push toward explicit, configurable session ownership and rotation.
- **Review automation depth** — PRs [#9491](https://github.com/QwenLM/qwen-code/pull/9491), [#9448](https://github.com/QwenLM/qwen-code/pull/9448), and [#9332](https://github.com/QwenLM/qwen-code/pull/9332) show the review skill evolving toward write-back comments, contract-doc validation, and better import scoping.

## Developer Pain Points
- **Non-secure-context clipboard failures** — Web Shell over remote `http://<server-ip>:4170` breaks all copy actions ([#9485](https://github.com/QwenLM/qwen-code/issues/9485)).
- **Integration channel payload drift** — DingTalk's actual delivery shape for quoted text/richText/cards doesn't match the adapter's mapping, silently dropping context ([#9536](https://github.com/QwenLM/qwen-code/issues/9536)).
- **Session isolation in multiplexed daemon/ACP mode** — Process-wide debug-log session state leaks across sessions ([#9534](https://github.com/QwenLM/qwen-code/issues/9534), [#9535](https://github.com/QwenLM/qwen-code/issues/9535)).
- **Web Shell session-state fragility** — Manual session names lost on `/clear` ([#9260](https://github.com/QwenLM/qwen-code/pull/9260)), sidebar sessions desyncing after mutations ([#9533](https://github.com/QwenLM/qwen-code/pull/9533)), and renderer OOM from unbounded transcript retention ([#9303](https://github.com/QwenLM/qwen-code/pull/9303)).
- **CI deadlocks from wedged workflow runs** — GitHub can create runs that stay `queued` with zero jobs and refuse all cancellation attempts, blocking the fleet shepherd ([#9518](https://github.com/QwenLM/qwen-code/pull/9518)).

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar).*