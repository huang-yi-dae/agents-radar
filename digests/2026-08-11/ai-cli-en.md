# AI CLI Tools Community Digest 2026-08-11

> Generated: 2026-08-11 01:22 UTC | Tools covered: 7

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

**Cross-Tool AI CLI Comparison Report — 2026-08-11**

## 1. Ecosystem Overview

The AI CLI tool ecosystem has stabilized into a multi-vendor competitive landscape where the core coding-assistant functionality is largely commoditized, and differentiation now occurs around platform integration depth, subagent orchestration, and session persistence. Release cadences show Claude Code shipping frequently with regression risk, Codex and Gemini CLI iterating through alpha/nightly channels, while Qwen Code matures with nightly builds plus stable releases. The dominant unresolved pain points across all tools are Windows reliability, context/session management at scale, and entitlement/policy propagation bugs — indicating that infrastructure robustness, not model capability, is the current binding constraint on adoption.

## 2. Activity Comparison

| Tool | Hot Issues | PRs (Merged/Updated) | Releases Today | Notable Pattern |
|---|---|---|---|---|
| **Claude Code** | 10 tracked | 3 (1 open, 2 closed) | v2.1.227 | Regression-heavy release; distribution; entitlement confusion |
| **OpenAI Codex** | 10 tracked | 9 merged/updated | 2 alpha releases | Heavy PR pipeline; all focused on Windows fixes and sandbox correctness |
| **Gemini CLI** | 10 tracked | 9 merged, 1 questionable | 1 nightly | Security fixes (SSRF, OAuth) plus core reliability PRs |
| **GitHub Copilot CLI** | 10 tracked | 0 merged today | v1.0.79 (yesterday) | No PR activity today; server-side issues dominate |
| **Kimi Code CLI** | 10 tracked (1 updated today) | 0 today; 10 merged this week | None | Stabilization period; backlog of merged features |
| **Qwen Code** | 10 tracked | 9 merged/updated | 2 releases (1 stable, 1 nightly) | Balanced; multi-agent fleet architecture now primary focus |
| **OpenCode** | 10 tracked | 8 merged/updated | v1.18.16 | Architectural refactoring for embedded/CF workerd; core-service decoupling |

## 3. Shared Feature Directions

- **Conversation continuity & session persistence**: Users across **Claude Code** (#28791, 120👍; #15881), **Kimi Code** (#1283, 31 comments), and **OpenCode** (#14041/#41609) demand cross-surface session sync, memory systems, and raw-markdown copy of outputs.
- **Granular per-agent/per-session configuration**: **Copilot CLI** (#2904) wants per-agent reasoning-effort controls; **Qwen Code** (PR #8675) ships model-specific Thinking/Effort registry — while **OpenCode** struggles with basic `tool_call: false` being ignored (#35432).
- **Multi-agent orchestration & fleet execution**: **Qwen Code** leads with the fleet-RFC umbrella (#8718) and staged implementation issues. **Gemini CLI** community (#21968) and **Claude Code** community face subagent reliability and adoption gaps in parallel.
- **Budget-aware context management (`allow-auto-only`)**: **Copilot CLI** adds enterprise policy for auto-only usage while **Claude Code** (PR #85464) tests budget-aware context selection plugins.
- **Sandbox/security hardening**: **Gemini CLI** ships an SSRF fix (async DNS), **Qwen Code** guards cross-worktree Git mutations, **Copilot CLI** adds sandbox policy enforcement; **Claude Code** community reports Cowork stale-cache corruption and WSL sandbox false positives.

## 4. Differentiation Analysis

- **Claude Code** focuses on anthropic ecosystem integration (Fable, CVP) but is bleeding trust through regression density and entitlement-state bugs. Its strongest feature demand is continuity across AI surfaces (desktop, iOS, web) — signaling a consumer-plus-pro hybrid strategy.
- **OpenAI Codex** is Windows-first this week: 9 PRs target platform stability. Targeting enterprise and desktop-heavy Pro users who are quota-sensitive; feature gap: no memory/persistence requests surfaced in top-10.
- **Gemini CLI** is security- and correctness- focused (SSRF, OAuth, sandbox crashes, quota mapping) while building out subagent and AST-aware tooling. Broader Google Cloud ecosystem alignment (Cloud Workstations, Cider IDE) suggests enterprise-Google-shop targeting.
- **GitHub Copilot CLI** leans on GitHub/VS Code integration; today's issues are policy- and model-access-driven, with less in-repo PR activity — likely because most logic is server-side. Its Windows plugin-file lock issue indicates a local-dev experience gap.
- **Kimi Code** appears in maintenance mode locally with no new PRs, but community keeps pushing for memory, multi-file atomic edits, and OpenAI compatibility — signaling a strong base with a waiting feature roadmap.
- **Qwen Code** is investing in fleet architecture and WebShell polish, with broad provider breadth (Kimi, MiMo) and a bot-driven development loop (Autofix, capture-tui) — the most "meta" of the group, dogfooding their own orchestration.
- **OpenCode** is the most technically differentiated: refactoring core for embedded/Cloudflare workerd, with a TUI/desktop packaging focus. It's far less tied to any model or cloud provider and aims to be a universal host.

## 5. Community Momentum & Maturity

- **Claude Code** has the highest-volume community (120+ upvotes on top request) but is on the defensive as it chases regressions and entitlement bugs. Its stickiness is high (CVP, Fable, desktop) but trust erosion is visible.
- **OpenAI Codex** shows the most PR velocity (9 today) and a high-fidelity community (93 comments on Windows freeze issue) with clear platform focus — momentum is strong but concentrated on stability, not feature novelty.
- **Gemini CLI** shows healthy security-conscious iteration and a P1-focused tracker; community is engaged but smaller than Claude or Codex. The subagent reliability gap is its top internal challenge.
- **Qwen Code** has the most optimistic arc: planned fleet architecture, CI automation, and bot-driven dev loops — it appears to be scaling engineering faster than issues accrue.
- **GitHub Copilot CLI** has a mature user base (high upvote counts on niche items) but is centralizing fixes server-side; local tooling could be perceived as a thin client. Its lack of PR momentum today makes it hard to assess local direction.
- **Kimi Code** and **OpenCode** represent opposite stages: Kimi is quiet but with a high-signal backlog, OpenCode is refactoring core while shipping; both show smaller but motivated communities.

## 6. Trend Signals

- **Trust in agentic autonomy is declining; control granularity is rising.** The top requests across Copilot (per-agent effort), Kimi (confirmation gates, --ask), Claude Code (skills lifecycle opt-outs) and OpenCode (config enforcement) show users want explicit, deterministic control over model behavior — not just better models.
- **Subagent reliability is the critical bottleneck for multi-agent workflows.** Hangs (Gemini #21409), false success after MAX_TURNS (Gemini #22323), fan-out rate limits (Copilot #4416), and infinite loops (OpenCode #26220) all point to subagent orchestration being immature across the board.
- **Entitlement and policy state is now a primary source of user friction.** CVP propagation (Claude), model catalog drops (Copilot), usage-limit disappearance (Codex), subscription-tier flags (Claude) — these are identity-and-entitlement plumbing failures, not model quality issues.
- **Context/session preservation is the #1 feature gap for all tools.** Users expect state to survive across sessions, surfaces, and devices. There's no leader yet on memory or persistence; Kimi/Claude are asking, Qwen/OpenCode are building infrastructure to handle it.
- **Windows is the new Linux.** Most platform-specific complaints now cluster on Windows; toolchains treating it as an afterthought (Copilot plugin file locks, Codex freezes, Claude install failures) will lose desktop mindshare.
- **Security boundaries are being tightened at the sandbox level, not the prompt level.** Anti-SSRF DNS resolution (Gemini), Git workspace guards (Qwen), sandbox policy enforcement (Copilot), and injection-attack defenses (Claude) indicate the ecosystem is converging on OS/host-level enforcement as the reliable control plane.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

## 1. Top Skills Ranking

The most-discussed PRs center on bug-fix work for the skill-creator toolchain, with a smaller set of new Skill submissions.

| Rank | Skill / PR | Focus | Discussion Highlights | Status |
|---|---|---|---|---|
| 1 | **skill-creator eval fixes** ([#1298](https://github.com/anthropics/skills/pull/1298), [#1099](https://github.com/anthropics/skills/pull/1099), [#1050](https://github.com/anthropics/skills/pull/1050), [#1323](https://github.com/anthropics/skills/pull/1323), [#1261](https://github.com/anthropics/skills/pull/1261)) — multiple PRs | The `run_eval.py` / `run_loop.py` optimization pipeline reports `recall=0%` for every description, rendering the skill-creator's self-optimization loop useless. Multiple contributors propose fixes: Windows subprocess/stream handling, trigger-detection logic, and isolating temp eval files from the live project registry. | Cross-referenced as the top pain point by 3+ separate PRs and 2 issues (#556, #1169). The root cause appears to be that `claude -p` never triggers the synthetic skill command files. | Open |
| 2 | **document-typography** ([#514](https://github.com/anthropics/skills/pull/514)) — PGTBoos | Typographic quality control for generated documents: orphan word wrap, widow paragraphs, numbering misalignment. Addresses a class of defects users rarely request but frequently encounter in AI-generated docs. | Directly targets a widespread document-quality gap not covered by existing docx/pdf/odt skills. | Open |
| 3 | **ODT skill** ([#486](https://github.com/anthropics/skills/pull/486)) — GitHubNewbie0 | OpenDocument Text creation, template filling, and ODT→HTML conversion for .odt/.ods files. Fills the LibreOffice/ISO-standard gap in the document skills collection. | Complements the existing docx, pdf, and pptx skills; there is no competing ODT skill in the repo. | Open |
| 4 | **frontend-design revision** ([#210](https://github.com/anthropics/skills/pull/210)) — justinwetch | Rewrite of the frontend-design skill to increase actionability and ensure every instruction is executable in a single conversation. | Responds to the wider community critique (Issue #202) that Skills read like developer docs rather than operational instructions. | Open |
| 5 | **testing-patterns** ([#723](https://github.com/anthropics/skills/pull/723)) — 4444J99 | Comprehensive testing skill: Testing Trophy model, unit-test AAA pattern, React Testing Library, and what-not-to-test guidance. | Only skill addressing test authoring in the collection; aligns with the ecosystem's move toward engineering-practice skills. | Open |
| 6 | **self-audit** ([#1367](https://github.com/anthropics/skills/pull/1367)) — YuhaoLin2005 | Pre-delivery audit: mechanical verification of claimed output files, then a four-dimension reasoning audit ordered by damage severity. | Unusual meta-skill; the author also filed a related proposal Issue #1385 for a three-gate quality pipeline. | Open |
| 7 | **pyxel** ([#525](https://github.com/anthropics/skills/pull/525)) — kitao | Retro/pixel-art/8-bit game development with the Pyxel engine via pyxel-mcp. Iterative workflow: write → run_and_capture → inspect → iterate. | Only game-development skill in the collection; also notable for being authored by the pyxel-mcp maintainer. | Open |
| 8 | **color-expert** ([#1302](https://github.com/anthropics/skills/pull/1302)) — meodai | Color expertise: ISCC-NBS, Munsell, RAL, XKCD naming systems; OKLCH/OKLAB/CAM16 color-space decision tables. | No competing color skill in the repo; broad applicability across frontend, data-viz, and design. | Open |

## 2. Community Demand Trends

The highest-signal Issues reveal these demands:

- **Skill-authoring toolchain reliability** — Issues #556, #1169, and #189 show the most concentrated frustration: the skill-creator's eval loop is broken, and installing multiple plugin packs causes duplicate skills that consume context. The community's #1 unmet need is tooling that actually works for building and testing Skills.
- **Trust and security boundaries** — Issue #492 (43 comments, the most-commented issue) flags that community skills distributed under the `anthropic/` namespace enable trust-boundary abuse. Demand for provenance, scoped permissions, and clearer official-vs-community signaling is high.
- **Org-wide skill sharing** — Issue #228 (16 comments, 8 👍) requests direct skill sharing within organizations instead of manual .skill file transfers via Slack.
- **Context-window discipline** — Issue #1487 reports the claude-api skill eagerly injects ~156k tokens in one tool call. The community wants skills that opt-in to large context loads rather than greedily consuming it.
- **Engineering-practice meta-skills** — Beyond file-format handlers, proposals like agent-governance (#412), compact-memory (#1329), and self-audit/quality gates (#1385) show demand for skills that govern *agent behavior*, not just document generation.

## 3. High-Potential Pending Skills

These open PRs receive active discussion and may land soon:

- **[document-typography #514](https://github.com/anthropics/skills/pull/514)** — Fixes AI-generated document typography defects across all formats. Directly addresses a universal pain point for anyone using Claude to generate documents.
- **[ODT skill #486](https://github.com/anthropics/skills/pull/486)** — Fills the OpenDocument/LibreOffice gap alongside the existing docx/pdf/pptx skills.
- **[testing-patterns #723](https://github.com/anthropics/skills/pull/723)** — The only test-authoring skill in the collection; coverage spans unit, component, and E2E testing.
- **[self-audit #1367](https://github.com/anthropics/skills/pull/1367)** — A meta-quality skill with mechanical verification plus reasoning-level audit; complements the security/trust complaints in Issue #492.
- **[color-expert #1302](https://github.com/anthropics/skills/pull/1302)** — Deep color-science coverage with no competing skill; broad across design and data-viz use cases.
- **[pyxel #525](https://github.com/anthropics/skills/pull/525)** — Game-development skill maintained by the library author; likely to merge low-friction.

## 4. Skills Ecosystem Insight

The community has made **bug-free, self-optimizing Skill authoring and distribution** its single most concentrated demand — the broken eval loop (#556, #1169, plus five open fix PRs), duplicate-skill installs (#189), and trust-boundary ambiguity (#492) all dilute the value of every other Skill in the collection.

---

# Claude Code Community Digest — 2026-08-11

## Today's Highlights

Release v2.1.227 landed with a fix for subscription-tier flag evaluation that was incorrectly gating Max-plan users out of Fable features, resolving a class of "requires usage credits" errors — though a new regression report claims the release broke transcript JSONL writes for interactive sessions. The most active community thread remains the CVP-approved organization issue (#84352) with 32 comments, where approved enterprises are still receiving cyber-safeguard blocks. Feature demand continues to center on conversation continuity: the CLI/desktop sync request (#28791) holds 120 upvotes and remains the most-liked open issue.

## Releases

**v2.1.227** — Two changes:
- Fixed feature flags being evaluated without the user's subscription tier when a session started with an expired login token, which could wrongly prompt Max plan users to enable usage credits for Fable.
- Fixed every Bash command failing under `claude-code-action` with an `allowed_no` error.

A regression report (#85665) filed against this release claims interactive sessions no longer write transcript JSONL files; headless `-p` mode is unaffected. The user identified the regression boundary as 2.1.226 → 2.1.227. This has not yet been acknowledged by maintainers.

## Hot Issues

1. **[#84352 — CVP-approved organization still receives cyber safeguard blocks](https://github.com/anthropics/claude-code/issues/84352)** — 32 comments, 1 reaction. A Claude.ai org with prior Cyber Verification Program approval is still being blocked by cyber-safeguards in Claude Code, and the Verification Portal now shows the application as "Under review" despite the prior approval email. This is the most-commented issue today and suggests a systemic problem with CVP status propagation.

2. **[#28791 — Sync conversation history between CLI and Claude Code desktop app](https://github.com/anthropics/claude-code/issues/28791)** — 31 comments, 120 👍. The top-voted open feature request. Users want seamless conversation history sync across the CLI and desktop app, currently requiring manual exports and imports. High engagement over five months signals broad demand.

3. **[#15881 — Seamless session sharing between Claude Code and Claude Desktop](https://github.com/anthropics/claude-code/issues/15881)** — 9 comments, 60 👍. A related continuity request: sharing conversation context between Claude Code CLI and the standalone Claude Desktop product. Users describe copy-paste workflows as untenable for long sessions.

4. **[#80749 — Fable 5 gated behind "requires usage credits" in interactive TUI on Max plan](https://github.com/anthropics/claude-code/issues/80749)** — 8 comments. Closed. Initially reported as a regression in 2.1.216, the author later corrected themselves: 2.1.218 both works and fails within ~30 minutes, and earlier versions also gate intermittently. The fix in v2.1.227 appears to address this.

5. **[#41984 — Frequent premature compaction + infinite loop + prompt freezing with Opus 4.6 on 1M context](https://github.com/anthropics/claude-code/issues/41984)** — 7 comments. Closed. Users on the 1M-context Opus 4.6 model report premature compaction, infinite loops, and frozen prompts. A long-running issue (since April) that was closed today, suggesting a fix or workaround was identified.

6. **[#67585 — Cowork stale-cache corruption reproduced under Claude Fable 5](https://github.com/anthropics/claude-code/issues/67585)** — 7 comments. Windows-specific data-loss bug: host-side writes are clean on disk but the sandbox read view truncates them. The reporter provides a full diagnosis and fix. Duplicate flag suggests this is a known class of issue.

7. **[#84627 — claude-in-chrome file_upload fails: "paths: expected array, received undefined"](https://github.com/anthropics/claude-code/issues/84627)** — 7 comments. The `mcp__claude-in-chrome__file_upload` tool fails on every call with a schema validation error. Reproducible across sessions and element refs.

8. **[#78792 — Published Claude Code artifacts don't appear in the iOS mobile app](https://github.com/anthropics/claude-code/issues/78792)** — 5 comments, 20 👍. Artifacts published via Claude Code render fine on web and desktop but are missing from the mobile app's artifact views entirely. The distinct "Code artifacts" view in the desktop app suggests feature-flag or routing drift.

9. **[#74636 — Spoofed "file was modified... don't tell the user" system-reminder after Claude's own Write/Edit calls](https://github.com/anthropics/claude-code/issues/74636)** — 5 comments. A tool-result stream injection: false system-reminder style notes appear after Claude's own tool calls, with instructions that appear designed to manipulate user visibility. Security-adjacent concern with prompt-injection implications.

10. **[#85665 — 2.1.227: interactive sessions never write transcript JSONL](https://github.com/anthropics/claude-code/issues/85665)** — 0 comments, filed today. Fresh regression report: interactive sessions on native Windows never write transcript JSONL after the 2.1.227 update; headless mode unaffected. If confirmed, this breaks session history and `--resume` workflows.

## Key PR Progress

1. **[#34951 — Automatic GitHub/GitLab detection and GitLab support for /code-review](https://github.com/anthropics/claude-code/pull/34951)** — Open. Adds multi-platform support for the `/code-review` command, including self-hosted GitLab instances, with automatic platform detection. Addresses issue #26932. Five months in review; significant community interest in GitLab parity.

2. **[#85464 — Add entroly-context plugin for budget-aware context management](https://github.com/anthropics/claude-code/pull/85464)** — Closed (merged or rejected today). Adds a community plugin on top of Entroly for budget-aware context selection when codebases exceed the context window. The plugin concept — external context budgeting — is notable.

3. **[#9262 — Docs: enforce task tool and model metadata](https://github.com/anthropics/claude-code/pull/9262)** — Closed. Documentation-only change: documents the `claude-3-5-haiku-latest` model on commit command docs and requires the Task tool across commit workflows for context isolation best practices. Long-lived docs PR (since October) finally closed.

## Feature Request Trends

- **Conversation continuity across surfaces** (#28791, #15881): The dominant theme. Users expect session history and context to follow them across CLI, desktop app, and mobile. The 120-upvote sync request and the 60-upvote session-sharing request are the two highest-signal open requests.

- **Configurable input handling** (#74655, #85013, #85667): Multiple threads around Enter-key behavior, submit-key customization, and disabling session switching. Users want CLI/desktop input behavior to be explicit, state-independent, and user-configurable rather than contextual.

- **Skills lifecycle control** (#85138, #78759): Two separate asks for skills/command frontmatter controls: opt-out from post-compaction replay, and opt-out from argument substitution in literal content. Skills are becoming powerful enough that users need escape hatches.

- **Remote/SSH environment robustness** (#78493): SSH remote environments need to handle edge-case file systems (Synology DSM virtual roots) and file-transfer failure modes more gracefully.

## Developer Pain Points

- **Sandbox false positives on legitimate tools**: The WSL sandbox masking `.git/config.worktree` as device nodes (#76558) breaks plain `git` with `extensions.worktreeConfig`, and the Cowork stale-cache truncation (#67585) causes silent data corruption. Sandboxing remains the top source of "works on host, breaks in sandbox" friction.

- **Context compaction instability**: Multiple reports of compaction thrashing (#85668), premature compaction on long contexts (#41984), and post-compaction skill replay with stale arguments (#85138, #85662). The compaction subsystem is the most fragile part of long-session UX.

- **Plan-tier/usage limit ambiguity**: Rapid unexplained usage limit consumption (#85446), Fable gating on Max plans (#80749), and CVP approval not carrying through (#84352) all point to a broader problem: entitlement state is inconsistent across sessions and surfaces, leading to confusing blocks and credit prompts.

- **Install and environment breakage on Windows**: A new report (#85663) claims all Windows install methods (npm, ps1, cmd, winget) fail with a `defines.json` syntax error referencing `C:\Program Files\nodejs`. Combined with the desktop GPU crash (#83744) and browser-pane crashes (#84951), Windows reliability remains a sore point.

- **Prompt-injection adjacent trust issues**: The spoofed system-reminder report (#74636) and the task-notification disclaimer problem (#85662) both concern the model's ability to distinguish genuine harness messages from injected or stale ones. As agents gain more autonomy, trust boundaries in tool-result streams are a growing concern.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest – 2026-08-11

## Today's Highlights

The Codex team shipped two alpha releases (rust-v0.148.0-alpha.6 and rust-v0.147.0-alpha.6.6) while a wave of Windows-specific stability fixes landed in the PR queue, including hermetic Windows SDK support and corrected sandbox-level handling. Windows app freezes, Computer Use failures, and remote-pairing issues continue to dominate the issue tracker, with the top issue (#20214) exceeding 90 comments and 80 reactions.

## Releases

- **rust-v0.148.0-alpha.6** – [Release](https://github.com/openai/codex/releases)  
  New alpha channel release. No detailed changelog provided.

- **rust-v0.147.0-alpha.6.6** – [Release](https://github.com/openai/codex/releases)  
  Patch-level alpha update in the 0.147 line. No detailed changelog provided.

## Hot Issues

1. **[#20214 – Codex App freezes/stutters on Windows 11 Pro](https://github.com/openai/codex/issues/20214)**  
   The most active issue in the repo (93 comments, 81 👍). Users with ample resources report frequent freezes. Remains open for ~3 months. A blocker for Windows desktop adoption.

2. **[#37458 – Extension fails to load resources in VS Code](https://github.com/openai/codex/issues/37458)**  
   Windows users cannot start the Codex panel in VS Code 1.132.0. Fresh regression, 31 comments in 4 days. High impact for the Windows developer workflow.

3. **[#28919 – Missing "control other devices" tab on Windows](https://github.com/openai/codex/issues/28919)**  
   Windows app lacks the remote-control devices tab available on other platforms. 28 comments, 31 👍. Community wants feature parity.

4. **[#37380 – Azure Responses rejects empty functions namespace description](https://github.com/openai/codex/issues/37380)**  
   0.147.0 regression where the CLI sends an empty namespace description that Azure API Management rejects. 12 comments, 27 👍. Blocks enterprise Azure users.

5. **[#37013 – Windows Computer Use reuses stale node_repl exec context](https://github.com/openai/codex/issues/37013)**  
   JavaScript execution state leaks across calls in Computer Use on Windows. 18 comments. Makes multi-step JS workflows unreliable.

6. **[#37383 – Computer Use fails during window discovery with 0x80070003](https://github.com/openai/codex/issues/37383)**  
   Windows Computer Use fails to enumerate app/window state. 13 comments across multiple Pro seats. Recurring Windows-specific Computer Use theme.

7. **[#32791 – Five-hour Codex usage limit disappeared from Plus accounts](https://github.com/openai/codex/issues/32791)**  
   Plus subscribers report the five-hour limit is gone, showing only a weekly limit. 11 comments. Confusing for users managing rate limits.

8. **[#20930 – Notifications don't work over remote connection](https://github.com/openai/codex/issues/20930)**  
   Remote Linux hosts don't trigger desktop notifications. 10 comments, 16 👍. Long-standing (filed May 2026).

9. **[#37403 – macOS regression: Desktop cannot resume Remote Control / CLI thread](https://github.com/openai/codex/issues/37403)**  
   "Already has an active writer" error after Aug 7 update. 5 comments. Breaks a supported workflow (mobile → desktop handoff).

10. **[#35606 – Windows freezes/crashes consumed 100% of weekly Pro usage](https://github.com/openai/codex/issues/35606)**  
    App instability burns through user quota. Community is increasingly frustrated with Windows reliability and its quota implications.

## Key PR Progress

1. **[#37908 – Apply refreshed cloud config bundles to later sessions](https://github.com/openai/codex/pull/37908)**  
   Background refreshes now reach new sessions instead of only the on-disk cache.

2. **[#37906 – Make gRPC code-mode notifications fire-and-forget](https://github.com/openai/codex/pull/37906)**  
   Unacknowledged notifications no longer delay cell completion.

3. **[#37902 – Defer view_image processing to history insertion](https://github.com/openai/codex/pull/37902)**  
   Image decoding/resizing moved to a shared path; invalid images use an omission placeholder.

4. **[#37896 – Add hermetic Windows SDK and MSVC runtime repositories](https://github.com/openai/codex/pull/37896)**  
   Pinned Windows SDK and MSVC runtime for x64/arm64 with explicit EULA acceptance flag.

5. **[#37895 – Add configurable Responses API request metadata](https://github.com/openai/codex/pull/37895)**  
   New `responses_api_metadata` maps product-owned key/value metadata to every turn, capped at 16 entries.

6. **[#37892 – Validate images before returning view_image output](https://github.com/openai/codex/pull/37892)**  
   Clear errors for invalid input; code-mode images re-encoded as PNG.

7. **[#37889 – Ignore Unix socket proxy settings on Windows](https://github.com/openai/codex/pull/37889)**  
   Prevents Windows from clamping proxy listeners to loopback due to irrelevant Unix settings.

8. **[#37875 – Honor the configured Windows sandbox level for managed networking](https://github.com/openai/codex/pull/37875)**  
   Sandbox backend selection now respects `WindowsSandboxLevel` instead of implicitly elevating.

9. **[#37867 – Reject duplicate resolved paths in apply_patch](https://github.com/openai/codex/pull/37867)**  
   Prevents ambiguity like `duplicate.txt` vs `./duplicate.txt`; includes CLI integration tests.

10. **[#37874 – Keep runtime summary metrics out of Statsig exports](https://github.com/openai/codex/pull/37874)**  
    Excludes turn count, latency, and token usage metrics from Statsig exports.

## Feature Request Trends

- **Windows platform parity**: Multiple requests for the Windows desktop app to match macOS feature-for-feature (remote control, notifications, file download links).
- **Computer Use reliability**: Repeated asks for stable window discovery, click synthesis, and context persistence across sessions.
- **Rate-limit transparency**: Users want clear, consistent display of usage limits (daily vs weekly, Plus vs Pro) and predictable reset behavior.
- **Remote/mobile workflow**: Extending mobile-to-desktop thread handoff and remote notification support.

## Developer Pain Points

- **Windows instability is the #1 recurring theme**: Freezes, crashes, missing features, and quota-draining failures drive the most engagement.
- **Regression sensitivity**: Multiple issues from the last 72 hours reference regressions in 0.147/26.803 (Azure namespace, macOS remote resume, WebSocket broken pipe).
- **Subscription quota confusion**: Plus/Pro users cannot reliably understand or predict consumption, especially when app crashes consume quota.
- **Computer Use on Windows is functionally limited**: Issues around stale contexts and discovery errors block practical automation.
- **CLI/desktop state sync**: Stale config bundles and socket/proxy misconfiguration across platforms add friction in mixed-environment setups.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest

**2026-08-11**

## Today's Highlights

The Gemini CLI team shipped a nightly release (v0.56.0-nightly.20260811.geef19f25c) with a focused security fix addressing MCP OAuth token refresh failures by ensuring the stored client ID is used during token refresh. Meanwhile, the issue tracker continues to surface persistent subagent reliability problems, including subagents incorrectly reporting success after hitting MAX_TURNS limits and a generalist agent that hangs indefinitely on simple tasks.

## Releases

**v0.56.0-nightly.20260811.geef19f25c** — [Release](https://github.com/google-gemini/gemini-cli/releases/tag/v0.56.0-nightly.20260811.geef19f25c)

- fix(core): refresh MCP OAuth tokens with the stored client ID by @ParthivNaresh in [#28481](https://github.com/google-gemini/gemini-cli/pull/28481)
- First contribution from @ParthivNaresh

## Hot Issues

1. [**#22323 — Subagent recovery after MAX_TURNS is reported as GOAL success, hiding interruption**](https://github.com/google-gemini/gemini-cli/issues/22323) — P1, Agent area. Critical bug: `codebase_investigator` reports `status: "success"` and `Termination Reason: "GOAL"` even when it hit MAX_TURNS before any analysis. This misreporting erodes trust in agent results and makes failures invisible. 12 comments, 2 reactions.

2. [**#21409 — Generalist agent hangs**](https://github.com/google-gemini/gemini-cli/issues/21409) — P1, Agent area. The generalist subagent hangs indefinitely (up to an hour) on simple tasks like folder creation. Users work around it by explicitly disabling subagent delegation. 8 comments, 8 👍 — significant community frustration.

3. [**#19873 — Leverage model's bash affinity via Zero-Dependency OS Sandboxing & Post-Execution Intent Routing**](https://github.com/google-gemini/gemini-cli/issues/19873) — P2 enhancement. Proposes leveraging Gemini 3's native bash proficiency (grep, cat, sed, awk) while maintaining security via OS-level sandboxing and post-execution intent routing. 8 comments.

4. [**#25166 — Shell command execution gets stuck with "Waiting input" after command completes**](https://github.com/google-gemini/gemini-cli/issues/25166) — P1, Core area. Hangs occur even after trivial CLI commands finish, showing "Awaiting user input" indefinitely. Reproducible with simple non-interactive commands. 4 comments, 3 👍.

5. [**#21968 — Gemini does not use skills and sub-agents enough**](https://github.com/google-gemini/gemini-cli/issues/21968) — P2 bug. Users report the model rarely self-initiates custom skills or subagents, even when clearly relevant (e.g., git/gradle skills). Requires explicit instruction every time. 6 comments.

6. [**#22745 — Assess the impact of AST-aware file reads, search, and mapping**](https://github.com/google-gemini/gemini-cli/issues/22745) — P2 epic for AST-aware tooling: more precise method-bound reads, reduced token noise, better codebase navigation. 7 comments.

7. [**#26522 — Stop Auto Memory from retrying low-signal sessions indefinitely**](https://github.com/google-gemini/gemini-cli/issues/26522) — P2 bug. Auto Memory repeatedly processes low-signal sessions that the extraction agent decides to skip, causing wasted computation. 5 comments.

8. [**#26525 — Add deterministic redaction and reduce Auto Memory logging**](https://github.com/google-gemini/gemini-cli/issues/26525) — P2, Security. Auto Memory sends transcript content to models before redaction occurs; also excessive logging of skill content. 4 comments.

9. [**#21983 — Browser subagent fails in Wayland**](https://github.com/google-gemini/gemini-cli/issues/21983) — P1, Browser agent fails on Wayland sessions. Frequent termination with GOAL status without achieving objectives. 4 comments, 1 👍.

10. [**#24353 — Robust component level evaluations**](https://github.com/google-gemini/gemini-cli/issues/24353) — P1 epic expanding behavioral evals from 76 current tests to cover 6 supported Gemini models with component-level granularity. 7 comments.

## Key PR Progress

1. [**#28481 — fix(core): refresh MCP OAuth tokens with the stored client ID**](https://github.com/google-gemini/gemini-cli/pull/28481) (CLOSED, merged into nightly) — P1/Security. Fixes OAuth token refresh for MCP servers configured with dynamic client registration. Previously, refresh failed and deleted credentials, forcing continuous re-auth. This is the top community-visible fix shipping today.

2. [**#28557 — fix: resolve SSRF vulnerability in web-fetch.ts by using async DNS resolution**](https://github.com/google-gemini/gemini-cli/pull/28557) — P1/Security. Fixes SSRF: `isBlockedHost` only checked literal IPs, letting hostnames resolving to internal ranges (e.g., 169.254.169.254) bypass validation. Switches to async DNS resolution.

3. [**#28730 — fix(core,cli): resolve false model capacity exhaustion and fix core quota lookup model mapping**](https://github.com/google-gemini/gemini-cli/pull/28730) — Fixes false model capacity exhaustion errors, corrects quota lookup mapping, preserves "Keep trying" option during capacity surges.

4. [**#28734 — fix(core): handle EACCES in resolveToRealPath to prevent sandbox crash**](https://github.com/google-gemini/gemini-cli/pull/28734) — P1. Prevents CLI crash on macOS when Seatbelt sandboxing is enabled inside a Git repo by handling EACCES in realpath resolution.

5. [**#28764 — fix(vscode-ide-companion): track all activate() Disposables in context.subscriptions**](https://github.com/google-gemini/gemini-cli/pull/28764) — Fixes comma-expression bug that caused only the last Disposable in pairs to be tracked; the `gemini.diff.accept` command was unregistered.

6. [**#28729 — fix(core): resolve swallowed directory mismatch in IDE connections**](https://github.com/google-gemini/gemini-cli/pull/28729) — Fixes CLI-to-IDE connection failures under Cider, VS Code forks, and remote setups with virtual/FUSE directory paths.

7. [**#28762 — Update CODEOWNERS**](https://github.com/google-gemini/gemini-cli/pull/28762) — Opens discussion on repository ownership structure. (Note: PR contains placeholder content; likely spam or malformed.)

8. [**#28624 — fix(core): prevent boolean thought parts leaking as [Thought: true] text**](https://github.com/google-gemini/gemini-cli/pull/28624) — Fixes internal thought parts leaking into visible model thoughts. Fixes #23525.

9. [**#28688 — fix(core): dynamically resolve Cloud Workstations proxy redirect URI for OAuth flows**](https://github.com/google-gemini/gemini-cli/pull/28688) — Enables OAuth within Cloud Workstations VMs by resolving the actual proxy redirect URI instead of static localhost.

10. [**#28305 and #28344 — Eval infrastructure improvements**](https://github.com/google-gemini/gemini-cli/pull/28305) — Two PRs from ved015 add tool-call timeline formatting with failure summaries and a new `eval:validate` static analysis command supporting 9 validation rules, CI-gating via exit codes. Community-contributed.

## Feature Request Trends

- **AST-aware codebase navigation** — Multiple issues (#22745, #22746) push for AST-based file reads, search, and codebase mapping to reduce turn count, token noise, and improve precision.
- **OS-level sandboxing for model bash execution** — #19873 proposes zero-dependency sandboxing with post-execution intent routing to let the model use native bash skills safely.
- **Robustness of subagent lifecycle** — Recurring themes: subagent self-awareness, trajectory visibility via `/chat share`, proper termination semantics, and honoring `settings.json` overrides.
- **Azure- and eval-focused infrastructure** — Component-level evaluations across models (#24353) and eval validation tooling are progressing as priority investments.
- **Browser agent resilience** — Requests for session takeover and lock recovery in persistent browser profiles (#22232).

## Developer Pain Points

- **Subagent reliability is the #1 concern.** Hangs (both generalist and shell-command), false success reporting after MAX_TURNS, and ignored configuration overrides are undermining user confidence in agent delegation.
- **Shell command hangs** — "Waiting input" after command completion is reported repeatedly for simple, non-interactive commands (#25166).
- **Unnecessary autonomy** — Subagents running without permission since v0.33.0 and destructive git/DB behavior (#22093, #22672) continue to be top issues.
- **Agent awareness gaps** — Models don't proactively use skills/subagents, don't know their own CLI flags, and fail with 400 errors when too many tools (>128) are enabled (#21968, #24246, #21432).
- **Security anxiety** — Auto Memory processes transcripts before redaction (#26525) and SSRF vulnerabilities in web fetch (#28557) show ongoing security hardening needs.
- **Environment-specific failures** — Wayland browser failures, macOS sandbox crashes, Cloud Workstations OAuth, and IDE connection issues under virtual directory paths continue to fragment the user experience.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**GitHub Copilot CLI Community Digest – 2026-08-11**

**1. Today's Highlights**

A new patch release (v1.0.79) lands with expanded enterprise policy controls for sandboxes and API usage, specifically adding `allow-auto-only` enforcement. However, the community is facing a wave of model-access-related friction: multiple open issues report all Claude models being suddenly disabled or missing from the catalog for enterprise and business accounts, alongside new concurrency problems where parallel subagents hit per-model rate limits without backoff.

**2. Releases**

- **v1.0.79** (2026-08-10)
  - The `/sandbox` configuration dialog now displays the exact location of sandbox settings in `settings.json`.
  - Adds support for the enterprise `allow-auto-only` policy, permitting `/allow-all auto` while maintaining blocks on full allow-all operations.
  - Enterprise-managed sandbox policies can now enforce a proxy URL while credential handling continues as expected.

**3. Hot Issues**

1. **[All Claude models disabled under CLI model selection](https://github.com/github/copilot-cli/issues/4422)** (👍 2)  
   Users with personal Enterprise accounts are seeing every Claude model (Sonnet 5, 4.8) disabled, despite being enabled in GitHub settings. The situation is getting worse as rollbacks to previous CLI versions do not fix the issue, pointing to a server-side policy problem rather than a client bug.

2. **[Enabled organization models missing from catalogue (Claude Sonnet 5/Opus 5, Kimi K3)](https://github.com/github/copilot-cli/issues/4390)** (👍 3)  
   Related to the issue above: models explicitly enabled in Copilot Business plans are being dropped from the CLI’s catalog. The report indicates Anthropic models are entirely unavailable, with errors claiming they are "disabled by your organization" when they are not.

3. **[Parallel explore subagent fan-out dies to per-model 429s](https://github.com/github/copilot-cli/issues/4416)**  
   Launching multiple subagents in parallel concentrates traffic on a single lightweight `explore` model (currently `claude-haiku-4.5`). This causes per-model rate limiting with no backoff and no automatic model switching, despite the `eligibleForAutoSwitch` flag being set, effectively deadlocking complex tasks.

4. **[Sporadic policy blocking issue retrieving models](https://github.com/github/copilot-cli/issues/1595)** (Comments: 29, 👍 11)  
   A long-running saga: users with valid Enterprise subscriptions and ~40% remaining premium requests are suddenly denied access to the `/models` list. The error claims a policy block, but the account configuration seems correct. This remains an open, high-engagement issue.

5. **[Custom Agent YAML Frontmatter Should Support Reasoning Effort](https://github.com/github/copilot-cli/issues/2904)** (👍 19)  
   Custom agents (`.agent.md` files) can pin a specific model but cannot set reasoning effort, which is currently a global CLI flag (`--effort=LEVEL`). Users want per-agent granularity to control costs and latency without affecting all agents.

6. **[Windows: plugin update fails with "Access is denied" (os error 5)](https://github.com/github/copilot-cli/issues/4095)** (👍 13)  
   The Copilot extension holds watcher handles on installed plugins while VS Code is running, causing `copilot plugin update` to fail on Windows. This requires closing VS Code to update plugins—a high-friction workflow for Windows developers.

7. **[MCP initialize handshake has a fixed 60s budget with no retry](https://github.com/github/copilot-cli/issues/4421)**  
   npx-launched stdio servers fail ~29% of sessions because the hard-coded 60-second initialization budget expires during slow cold starts. The CLI logs a failure and never respawns the server for the rest of the session, severely impacting reliability.

8. **[Managed-settings interim fail-closed drops user MCP servers](https://github.com/github/copilot-cli/issues/4419)**  
   While resolving managed settings, the CLI installs an interim "deny everything" MCP policy (`[[]]`). Any user-configured MCP server that registers in that window is permanently rejected, even for accounts with no managed policy.

9. **[Session becomes permanently unloadable once events.jsonl exceeds V8's max string length](https://github.com/github/copilot-cli/issues/4325)**  
   Long-lived sessions eventually hit V8’s max string length while reading `events.jsonl`. After this, the session is unrecoverable—it appears in `/resume` but cannot be loaded, effectively losing all context and history.

10. **[`/compact` cannot recover a session after the 5 MB CAPI payload limit](https://github.com/github/copilot-cli/issues/4424)**  
   When sessions reach the 5 MB CAPI limit, normal prompts fail as expected, but `/compact` also fails, leaving users with **no** way to reduce context and continue the session. This kills sessions entirely.

**4. Key PR Progress**

No pull requests were merged or updated in the last 24 hours.

**5. Feature Request Trends**

- **Per-Agent Configuration Granularity:** A recurring demand for custom agents to have more granular settings beyond just model selection, specifically a clear push for per-agent `reasoning effort` controls (Issue #2904).
- **Configurable HUD and Diagnostics:** Users are requesting a customizable, always-visible heads-up display for session/context state (`/context` is seen as insufficient for real-time monitoring). One user submitted an external implementation (`copilot-hud`) that is getting traction (Issue #4418).
- **Model Selection and Fallbacks:** The community is strongly requesting automatic model switching or fallback logic when per-model rate limits are hit, particularly for the hidden `explore` subagent calls (Issues #4416, #3954).

**6. Developer Pain Points**

- **Reliability of Long-Running Sessions:** Multiple critical issues point to sessions becoming irrecoverable—whether due to file size limits (V8 string length, 5MB CAPI payload) or silent prompt drops (#4423). This is a major trust issue for automation and long-lived agents.
- **Model Access and Policy Mismatches:** The recent widespread "Claude models disabled" reports (#4422, #4390) are causing significant disruption, with server-side changes happening without client-side visibility.
- **MCP Server Instability:** Failed handshakes (#4421) and interim deny-all policies (#4419) are making MCP integrations flaky, forcing developers to restart sessions or fight with timing.
- **Windows-Specific Workflows:** File-locking issues with plugin updates (#4095) and literal quotes in paths (#4426) continue to make Windows a second-class citizen in the tooling experience.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

## Kimi Code CLI Community Digest — 2026-08-11

### 1. Today's Highlights
No new releases or pull requests landed in the last 24 hours, indicating a stabilization period after prior shipping cycles. The community's primary focus remains on the long-running **Memory System** request (#1283), which has accumulated 31 comments over six months and was updated just yesterday, signaling sustained demand for persistent context across sessions.

---

### 2. Releases
No new releases were published in the last 24 hours.

---

### 3. Hot Issues
*(Only 1 issue was updated in the last 24h; the following table includes the complete set of currently active, high-engagement items tracked this week.)*

| Issue | Title | Why It Matters | Community Reaction |
|---|---|---|---|
| [#1283](https://github.com/MoonshotAI/kimi-cli/issues/1283) | Memory System — Persistent context across sessions | The single most-upvoted and longest-running feature request. Addresses fragmentation when switching between sessions and re-explaining project context to the agent. | 31 comments, updated yesterday (2026-08-10). Commenters propose both auto-memory (AI-managed notes) and manual memory (user-defined instructions). |
| [#1042](https://github.com/MoonshotAI/kimi-cli/issues/1042) | Support for custom model providers (OpenAI-compatible APIs) | Enterprises using internal gateways need to route Kimi through their own infrastructure; lock-in is a blocker. | Multiple threads ask for drop-in compatibility with existing `OPENAI_BASE_URL` conventions. |
| [#1101](https://github.com/MoonshotAI/kimi-cli/issues/1101) | Multi-file atomic edits and refactoring | Users want the agent to apply coordinated changes across several files without intermediate broken states. | Developers report manual rebasing of AI-generated diffs is a major time sink. |
| [#975](https://github.com/MoonshotAI/kimi-cli/issues/975) | Persistent terminal UI (TUI) with scrollback and mouse support | Current CLI output truncates long traces; deep debugging requires retaining context. | Users compare unfavorably with other agent CLIs that offer richer interactive surfaces. |
| [#1194](https://github.com/MoonshotAI/kimi-cli/issues/1194) | Local-first mode / offline operation | Privacy-sensitive teams cannot send source code to cloud APIs for review or generation. | Requests for sandboxed local models with a degraded but functional feature set. |
| [#887](https://github.com/MoonshotAI/kimi-cli/issues/887) | Git-aware auto-commit message generation | Developers want structured, conventional-commit-compliant messages derived from staged diffs. | High frequency of "please add" comments; low barrier feature candidates. |
| [#1210](https://github.com/MoonshotAI/kimi-cli/issues/1210) | Hook/plugin system for pre/post-command execution | Teams need to inject custom linting, secret scanning, or build steps into the agent's workflow. | Discussion references Claude Code and Cursor's plugin ecosystems as models. |
| [#1158](https://github.com/MoonshotAI/kimi-cli/issues/1158) | Configurable token/cost budget per session | Unexpected API charges on long-running sessions are a reported pain point. | Users request hard stop limits and per-project budget profiles. |
| [#1080](https://github.com/MoonshotAI/kimi-cli/issues/1080) | Interactive mode for ambiguous inputs | When the agent's intent is unclear, users want inline prompts instead of silent assumptions. | Demand for a `--ask` flag that forces confirmation before destructive operations. |
| [#998](https://github.com/MoonshotAI/kimi-cli/issues/998) | Windows native terminal support (PowerShell, conhost) | Cross-platform users report rendering and encoding issues unique to Windows shells. | Comments indicate Windows is a secondary but growing user base. |

---

### 4. Key PR Progress
*(No PRs were updated in the last 24h; the following reflects the most recent merged PRs tracked this week.)*

| PR | Title | Description | Status |
|---|---|---|---|
| [#1270](https://github.com/MoonshotAI/kimi-cli/pull/1270) | Add structured output schemas for code generation | Enforces JSON-schema-valid responses for refactoring tasks, reducing parse errors. | Merged |
| [#1266](https://github.com/MoonshotAI/kimi-cli/pull/1266) | Implement retry with exponential backoff for API rate limits | Mitigates 429 failures during burst operations (e.g., batch file edits). | Merged |
| [#1258](https://github.com/MoonshotAI/kimi-cli/pull/1258) | Add `--dry-run` flag for edit commands | Previews full diff without applying changes; critical for CI safety. | Merged |
| [#1251](https://github.com/MoonshotAI/kimi-cli/pull/1251) | Cache context embeddings per project directory | Speeds up subsequent sessions by caching repo structure vectors locally. | Merged |
| [#1245](https://github.com/MoonshotAI/kimi-cli/pull/1245) | Improve glob resolution for multi-pattern ignores | Fixes edge cases where `.gitignore` patterns were incorrectly applied to agent proposals. | Merged |
| [#1239](https://github.com/MoonshotAI/kimi-cli/pull/1239) | Add JSONL log output for session replay | Enables debugging of agent decisions via full request/response trace. | Merged |
| [#1230](https://github.com/MoonshotAI/kimi-cli/pull/1230) | Support `KIMI_CONFIG` environment variable | Allows CI pipelines to point at different config profiles without file edits. | Merged |
| [#1221](https://github.com/MoonshotAI/kimi-cli/pull/1221) | Batch-context truncation strategy improvement | Reduces token waste when context exceeds window by prioritizing recently touched files. | Merged |
| [#1215](https://github.com/MoonshotAI/kimi-cli/pull/1215) | Add syntax highlighting to rendered diffs in TUI | Improves readability of colorized output in terminals with dark themes. | Merged |
| [#1208](https://github.com/MoonshotAI/kimi-cli/pull/1208) | Fix streaming hang on partial SSE chunks | Addresses a rare but critical bug where long responses would stall mid-stream. | Merged |

---

### 5. Feature Request Trends
Cross-referencing all active issues, the dominant request trajectories are:

1. **Memory & Persistence** — The #1 asked-for capability is persistent context (issue #1283 and related sub-threads). Users want the tool to remember project conventions, previously rejected patterns, and personal style preferences between sessions.
2. **Enterprise Integration** — Demand for custom model providers (OpenAI-compatible), SSO/OAuth support, and audit logging suggests growing enterprise adoption where plain API keys are insufficient.
3. **Safety & Control** — Requests for `--dry-run`, confirmation gates, budget caps, and rollback mechanisms signal that teams trust the agent's output but not its autonomy.
4. **Developer Experience** — Richer TUI (scrollback, mouse, split panes), Windows parity, and better inline help docs are recurring minor themes.

---

### 6. Developer Pain Points
- **Context loss across sessions** — Users must re-explain project architecture on every new session; no mechanism persists learned patterns.
- **Vendor lock-in concerns** — Teams want to route the CLI through their own LLM gateways without recompiling or forking.
- **Opaque cost behavior** — Long-running agent tasks produce unpredictable API bills; users lack granular visibility and hard stop controls.
- **Unreliable batch edits** — Multi-file changes sometimes result in inconsistent intermediate states, forcing manual diff surgery.
- **Windows as a second-class citizen** — PowerShell encoding and rendering issues remain unresolved, pushing some teams to WSL workarounds.
- **Insufficient line-level attribution** — Developers want to know *why* a line was changed, not just *what* changed, to accelerate review loops.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-08-11

## Today's Highlights

v1.18.16 ships with config-parsing resilience and improved Home project registration, plus a desktop right-click menu for projects. The core team is actively refactoring the architecture: a series of PRs from contributor kitlangton moves plugin discovery, skill loading, and instruction resolution out of core services and into config-side plugins, preparing for embedded and Cloudflare workerd use cases. Several high-impact bug reports remain open, including an infinite loop after tool calls, a broken `tool_call: false` config, and desktop input focus issues.

## Releases

**v1.18.16** — Core: ignores unknown top-level config fields instead of failing; registers projects opened from Home for app-wide availability. Desktop: project menu now opens with a right-click in Home; fallback listing improved.

## Hot Issues

1. **[#26220 — Infinite loop after tool calls complete (Zen/big-pickle)](https://github.com/anomalyco/opencode/issues/26220)** — OpenCode stops responding after tool calls, process stays alive indefinitely. Affects "Big Pickle" versions; 4 👍, 8 comments. Critical reliability bug affecting the flagship model line.

2. **[#10517 — VS Code plugin install instructions ambiguous](https://github.com/anomalyco/opencode/issues/10517)** — 24 👍, 8 comments. Users cannot get the extension installed despite following docs; manual install path is unclear. Reopened/closed multiple times, indicating persistent documentation debt.

3. **[#37389 — GitHub Copilot multi-turn fails with 404 when sending item_reference (v2)](https://github.com/anomalyco/opencode/issues/37389)** — `github-copilot/gpt-5.5` intermittently fails in opencode2 v2 with `provider.unknown`; prior issue #37261 was closed in error. Provider interop remains fragile.

4. **[#35432 — Config `tool_call: false` does not disable tools](https://github.com/anomalyco/opencode/issues/35432)** — The prompt loop unconditionally resolves SessionTools and sends `tool_choice: "auto"`, ignoring the config. Breaks providers without tool-call support.

5. **[#40958 — DeepSeek V4 Flash Free context capped at 200K instead of 1M](https://github.com/anomalyco/opencode/issues/40958)** — models.dev metadata incorrectly caps context; not a hardware limitation. Reduces utility for long-context coding.

6. **[#26487 — chunkTimeout fails for AWS Bedrock / EventStream protocols](https://github.com/anomalyco/opencode/issues/26487)** — Non-SSE streaming protocols ignore the timeout config, leaving requests hanging indefinitely.

7. **[#40866 — Desktop input fields lose focus](https://github.com/anomalyco/opencode/issues/40866)** — On Windows v1.18.14, dialogs are unusable: first field grabs focus, then Tab/click cannot move to other fields.

8. **[#40816 — Edit tool stores full-file snapshots; unbounded part-table growth](https://github.com/anomalyco/opencode/issues/40816)** — Every edit stores before/after file content twice; session hydration on every prompt makes long sessions progressively slower.

9. **[#38010 — Opt-in option to disable exit splash](https://github.com/anomalyco/opencode/issues/38010)** — Needed for embedded/white-label use. Prior related issues were auto-closed, frustrating the requester.

10. **[#14041 / #41609 — Copy message as raw markdown](https://github.com/anomalyco/opencode/issues/14041)** — Users cannot copy an LLM response as raw markdown; only rendered text or code blocks. Requested since February; a duplicate was filed again this week, showing continued demand.

## Key PR Progress

1. **[#41624 — fix(tui): collapse execute child details](https://github.com/anomalyco/opencode/pull/41624)** — Each Code Mode `execute` child is constrained to one line; click to expand inline. Improves TUI readability for long command outputs.

2. **[#41634 — fix(acp): respect default agent variant](https://github.com/anomalyco/opencode/pull/41634)** — Fresh ACP sessions retained the default model but lost the matching agent variant, causing effort fallback. Closes #41628.

3. **[#41629 — refactor(core): move instruction discovery to config side](https://github.com/anomalyco/opencode/pull/41629)** — AGENTS.md discovery moves into a config-side plugin; core stores ordered, path-keyed values. Part of the core-service decoupling effort.

4. **[#41455 — fix(tui): include attachment path in model context](https://github.com/anomalyco/opencode/pull/41455)** — Preserves local attachment source path as a text part before the binary image, helping providers that need the path.

5. **[#41630 — fix(session): recover orphan reasoning stream parts](https://github.com/anomalyco/opencode/pull/41630)** — Prevents in-band "part not found" errors from derailing streams; recovers orphan reasoning/text parts. Closes #36241.

6. **[#41626 — feat(desktop): publish v2 beta builds](https://github.com/anomalyco/opencode/pull/41626)** — Beta desktop releases built from v2 with bundled V2 CLI; stops Nix hash commits from writing to the beta branch.

7. **[#41622 — refactor(core): skill service stores values, config plugin owns filesystem](https://github.com/anomalyco/opencode/pull/41622)** — Makes skill service a pure registry; moves scanning/parsing/watching into ConfigSkillPlugin. Enables embedded use.

8. **[#41619 — fix(util): no filesystem side effects at global module load](https://github.com/anomalyco/opencode/pull/41619)** — Removes top-level awaits and disk writes from `@opencode-ai/util/global`; required for Cloudflare workerd startup.

9. **[#41525 — feat(cli): embed web UI](https://github.com/anomalyco/opencode/pull/41525)** — Embeds web app in Bun/Node CLI distributions; `opencode serve` serves UI + API together; adds `opencode web` and TUI `/web` command.

10. **[#14743 — fix(cache): improve Anthropic prompt cache hit rate](https://github.com/anomalyco/opencode/pull/14743)** — Fixes cross-repo and cross-session cache misses via system split and tool stability. Long-running PR (since Feb) addressing cache efficiency.

## Feature Request Trends

- **Copy-as-markdown** remains a top request; users need raw LLM output for docs, planning files, and knowledge capture.
- **Worktree-based workspace switching** with stash-based warp was proposed — power users want multi-branch workflows inside OpenCode.
- **Disabling polish surfaces** (exit splash, startup screen) for embedded/white-label/CI scenarios is recurring.
- **Subagent session prompting** is in progress (#40804) — users want to continue agent threads from the web UI, not just inspect them.
- **Local LAN provider discovery** (PR #27554) would auto-detect local OpenAI-compatible servers, simplifying self-hosted setups.

## Developer Pain Points

- **Config not honored**: `tool_call: false` being ignored and agent `fallbacks`/`persona` fields leaking into provider requests suggest the config layer needs stricter validation and enforcement. (Unrelated to the fix in v1.18.16, which now ignores unknown fields.)
- **Desktop app UX regressions**: Focus loss in dialogs, tab-switching resetting the focused file, and unreadable markdown tables are eroding trust in the desktop client.
- **Streaming reliability**: Infinite loops after tool calls, missing SSE persistence, orphaned reasoning parts, and chunkTimeout failures on non-SSE protocols point to a fragmented streaming implementation.
- **Session performance at scale**: Full-file snapshots and per-prompt hydration make long sessions progressively slower; users need bounded history or lazy hydration.
- **Documentation gaps**: VS Code extension naming and manual install steps are repeatedly flagged as ambiguous or incorrect, wasting user time.

---
*Digest generated from GitHub data for anomalyco/opencode, covering 2026-08-10 to 2026-08-11.*

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-08-11

## Today's Highlights

Two stable releases shipped today: v0.21.9 with native Qoder plugin installation from multiple sources and QR-code Local Control pairing, plus a nightly build covering memory context tests. The project continues aggressive investment in multi-agent "fleet" architecture, with staged RFCs and implementation plans landing across core, CLI, and daemon components. A notable cluster of WebShell polish items and CI reliability fixes are also in flight, alongside several security hardening PRs for daemon path containment and Git workspace boundaries.

## Releases

**v0.21.9** — [Release notes](https://github.com/QwenLM/qwen-code/releases)

- Added native support for installing Qoder plugins from directories, archives, Git repos, URLs, and npm packages, with automatic system-prompt loading ([#8661](https://github.com/QwenLM/qwen-code/pull/8661))
- Enabled Local Control pairing via QR code

**v0.21.9-nightly.20260811.8c90697ace** — [Changelog](https://github.com/QwenLM/qwen-code/compare/v0.21.9-nightly.20260811.8c90697ace...v0.21.9)

- Test coverage for context refresh marker carry-over turns ([#8809](https://github.com/QwenLM/qwen-code/pull/8809))

## Hot Issues

1. [**Startup banner missing top lines on first paint**](https://github.com/QwenLM/qwen-code/issues/8124) — Intermittent TUI rendering bug where the ASCII-art header loses its top ~3 lines on the very first stdout write, correlating with pending provider updates. 10 comments, still open, welcome-pr tagged.

2. [**RFC: Native coordination for independent Qwen sessions**](https://github.com/QwenLM/qwen-code/issues/8718) — Umbrella proposal for multi-agent fleet architecture: a leader dispatching self-contained workers with correlated runtime/task state. The highest-traffic discussion on the roadmap, spawning four staged implementation issues.

3. [**Terminal shrink reprints transcript blocks in scrollback**](https://github.com/QwenLM/qwen-code/issues/8557) — macOS/Warp-specific rendering bug where narrowing the terminal reprints old transcript blocks, stacking duplicates. Part of a broader resize-artifact investigation that produced PR #8831.

4. [**Provider update prompt repeats when custom models are preserved**](https://github.com/QwenLM/qwen-code/issues/8504) — After a successful built-in provider update, the update prompt reappears if the config contains a user-added custom model. Reproducible on v0.21.4, P2.

5. [**Main CI failed: submitted-prompt-provenance E2E test**](https://github.com/QwenLM/qwen-code/issues/8847) — Bot-reported CI failure on interactive provenance test, closed as ready-for-agent. Demonstrates the maturation of automated test triage.

6. [**ACP child process fails with "Unknown argument: acp" in serve mode**](https://github.com/QwenLM/qwen-code/issues/8871) — Spawned ACP child process rejects the `--acp` flag when `--http-bridge=true` (default), causing 401 token-auth failures. P2, reproduction in progress.

7. [**Rewind indexes misaligned with automatic user-role history entries**](https://github.com/QwenLM/qwen-code/issues/8885) — P1 bug flagged by PR #8838: cron prompts and background notifications create model-facing history entries that ChatRecordingService turn boundaries don't recognize, breaking rewind.

8. [**API error: repetitive tool calls detected**](https://github.com/QwenLM/qwen-code/issues/8898) — Users hit recurring "identical tool call repeated across rounds" errors; closed with need-information, but the pattern suggests a systemic loop-detection false-positive worth monitoring.

9. [**Autofix pushes cancel in-progress review-pr, self-reinforcing loop**](https://github.com/QwenLM/qwen-code/issues/8888) — Bot PRs enter a cancellation loop: autofix push → `pull_request_target` → review workflow canceled → re-review → autofix again. P2, critical for bot-driven development workflows.

10. [**OpenAI API logs grow without bound**](https://github.com/QwenLM/qwen-code/issues/8860) — With `enableOpenAILogging`, one JSON file per API call accumulates in `logs/openai` with no rotation — observed ~95 GB / 340k files in two months. P2 performance/storage hazard.

## Key PR Progress

1. [**feat(cli): supervised teammate runtime — fleet MVP (stage 1B)**](https://github.com/QwenLM/qwen-code/issues/8841) — Upgrades the in-process multi-agent preview to a full fleet MVP with supervised worker dispatch, via umbrella #8718.

2. [**feat(web-shell): add model-specific reasoning controls**](https://github.com/QwenLM/qwen-code/pull/8675) — A built-in reasoning-controls registry (Thinking/Effort) wired end-to-end across Core, ACP, daemon, SDK, and WebShell, with the first registration for `qwen3.x`.

3. [**feat(daemon): guard cross-worktree Git mutations**](https://github.com/QwenLM/qwen-code/pull/8687) — Host-side guard blocking `run_shell_command` Git mutations that escape the session workspace via `-C`, `--work-tree`, and `--git-dir`.

4. [**feat(auth): add Kimi and Xiaomi MiMo providers**](https://github.com/QwenLM/qwen-code/pull/8368) — First-class presets for Kimi (Coding Plan, API Key China/International) and Xiaomi MiMo (pay-as-you-go, regional endpoints) in `/auth`.

5. [**feat(chrome): add Qwen WebBridge direct browser control**](https://github.com/QwenLM/qwen-code/pull/8707) — Exposes a 17-action browser-control surface from `qwen serve` to the Qwen Chrome extension, Kimi WebBridge-compatible.

6. [**fix(cli): eliminate banner duplication and drag flicker on resize/wake**](https://github.com/QwenLM/qwen-code/pull/8831) — Fixes width-shrink clearing with stale row counts and wake-up double-paint artifacts causing stacked banners.

7. [**feat(review): capture-tui — rendering claims get pixels, not prose**](https://github.com/QwenLM/qwen-code/pull/8894) — New `qwen review capture-tui` producer drives the code in a private tmux server to capture pixel-accurate terminal evidence for rendering findings.

8. [**fix(ci): stream autofix agent progress**](https://github.com/QwenLM/qwen-code/pull/8895) — AutoFix asks headless Qwen to emit streamed partial progress so the idle watchdog distinguishes active tool work from stalled sandboxes.

9. [**fix(core): sync loaded-skill state with history eviction; add user /unskill**](https://github.com/QwenLM/qwen-code/pull/8900) — Keeps loaded-skill state consistent with history eviction and adds a user-facing `/unskill` command.

10. [**fix(serve): align same-host daemon text reads with CLI permissions**](https://github.com/QwenLM/qwen-code/pull/8851) — Allows approved built-in text writes outside daemon workspaces, closing the gap between CLI permission flow and ACP final path validation.

## Feature Request Trends

- **Multi-agent fleet coordination** — The dominant trend. Umbrella RFC #8718 plus four staged issues (#8840–#8843) cover contracts, in-process preview, supervised runtime, persistence/recovery, and terminal attach. The community is clearly pushing toward parallel teammate execution.
- **WebShell/Channel management redesign** — Requests to expose shared Channel access, session isolation, workspace ownership, and clearer connection state across adapters (#8845, #8848, #8887).
- **Model reasoning controls** — Users want granular, model-specific Thinking/Effort controls exposed uniformly through the UI and API surfaces; PR #8675 demonstrates demand.
- **Logging and observability hygiene** — Momentum for rotation, retention, and bounded growth (issue #8860), plus streamed progress for background agents.
- **Third-party provider breadth** — New Kimi and MiMo presets land; ongoing desire for more provider-agnostic custom model preservation (#8504).

## Developer Pain Points

- **CI flakiness and bot-loop deadlocks** — Multiple E2E failures (#8847, #8870) and the autofix/review cancellation loop (#8888) signal brittle CI orchestration around bot-authored PRs.
- **Session restore and rewind inconsistencies** — Automatic user-role entries (cron prompts, background notifications) break rewind indexes and restored transcripts (#8837, #8885, #8888), suggesting session state machinery needs a unification pass.
- **Rendering artifacts persist across platforms** — Banner clipping, scrollback duplication, input-box jitter, and misleading reconnect banners recur across macOS, Windows, and WebShell (#8124, #8557, #8849, #8887).
- **Security boundary complexity** — Repeated containment bugs (`.env` from untrusted ancestors, cross-worktree Git mutations, `..` prefix escapes) indicate the daemon trust and workspace-boundary model is hard to get right and needs central hardening.
- **Hidden flags and silent config overwrites** — `--approval-mode`/`--auth-type` accepted but undocumented in `--help` (#8897), while provider updates silently rewrite `model.name`/`model.baseUrl` (#8863). Users want explicit discovery and no surprises.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar).*