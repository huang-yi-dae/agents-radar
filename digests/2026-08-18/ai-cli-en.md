# AI CLI Tools Community Digest 2026-08-18

> Generated: 2026-08-18 01:01 UTC | Tools covered: 7

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

# Cross-Tool AI CLI Comparison Report
**Date: 2026-08-18**

---

## 1. Ecosystem Overview

The AI CLI developer tool landscape is experiencing intense concurrent evolution, with all major tools shipping nightly patches and substantial infrastructure work. Reliability remains the dominant theme—memory leaks, OOM crashes, hangs, and silent failures appear across every tool's issue tracker. Windows continues to be the weakest platform across the board, with disproportionate crash reports, input regressions, and process lifecycle bugs. MCP integration maturity is the key differentiator: every tool is betting on MCP as the extension surface, but each is at a different stage of stability and feature completeness. Distributed agent orchestration, multi-session management, and observability are emerging as the next battleground features.

---

## 2. Activity Comparison

| Tool | Hot Issues | Open PRs (visible) | Releases (24h) | Notable Mentions |
|---|---|---|---|---|
| **Claude Code** | 10 tracked | 10 in digest | v2.1.234 | New env var, keybinding action |
| **OpenAI Codex** | 10 tracked | 10 in digest | rust-v0.148.0-alpha.21 | 6-PR telemetry stack, agents dashboard |
| **Gemini CLI** | 10 tracked | 10 in digest | 2 nightly builds | Subagent disable fix, TUI hang fix |
| **Copilot CLI** | 10 tracked | 1 (+1 notable) | None | MCP OAuth regressions, README doc removal |
| **OpenCode** | 10 tracked | 9 in digest | None | Gateway reliability, typed IPC contract |
| **Qwen Code** | 10 tracked | 10+ in digest | v0.21.13 | SWE-bench validation runs, content-anchored reviews |
| **Kimi Code** | No activity | — | — | — |

**Activity Notes:**
- **Claude Code** and **Qwen Code** show the highest release cadence with meaningful user-facing features.
- **Codex** and **Gemini** are shipping the most infrastructural/plumbing PRs (telemetry, sandbox hardening, internal reliability).
- **Copilot CLI** has the least visible PR activity but the most concentrated set of open regressions, suggesting a maintenance-heavy cycle.
- **OpenCode** and **Kimi** appear to be in quieter phases; OpenCode's momentum is concentrated in the Go inference gateway rather than the CLI itself.

---

## 3. Shared Feature Directions

| Theme | Tools | Specific Requirements |
|---|---|---|
| **Message queue / non-interruptive interaction** | Claude Code (#50246, 198👍), Codex (#28969, 195👍) | Queue follow-ups, disable 60-second auto-resolve, defer prompts without interrupting the agent |
| **Multi-agent orchestration across machines** | Claude Code (#28300), Codex (agents dashboard PRs), Gemini (#21968) | Agent-to-agent protocols, cross-host session handoff, autonomous subagent/skill usage |
| **MCP lifecycle robustness** | Codex (OAuth refresh, process leaks), Copilot CLI (OAuth regressions, BigInt), OpenCode (token refresh, tool exposure), Gemini (extension env consent) | Token refresh reliability, process spawn/reap, tool visibility, consent gating, structured results serialization |
| **Session durability and resume** | Copilot CLI (stale connection IDs, compaction loops), OpenCode (unarchive, skip in-flight), Qwen (compression/rewind), Claude (cross-session drops) | Context compaction correctness, resume without phantom state, cross-device continuation, export/import |
| **Background/subagent resource governance** | Claude (OOM at 9.5GiB), Codex (background subagents not waking), Qwen (daemon byte bounds), Gemini (recovery after MAX_TURNS) | Memory limits, completion notifications, lifecycle guarantees, accurate status reporting |
| **Permission-system consistency** | Claude (#73325), Gemini (#22093), Codex (auto-approval inheritance) | Identical shortcuts/labels across surfaces, explicit consent for all agent actions, no bypasses |
| **Smarter tool selection** | Claude (#19649, 97👍), Gemini (AST-aware tools #22745) | Prefer built-in tools over shell utilities, AST-aware reads to reduce token consumption |

---

## 4. Differentiation Analysis

| Tool | Feature Focus | Target User | Technical Approach |
|---|---|---|---|
| **Claude Code** | UX polish, permission safety, cross-session continuity | Professional developers in complex IDE workflows | Deep VS Code integration, plugin hooks, heavy focus on scriptable hooks and guardrails |
| **OpenAI Codex** | Infrastructure hardening, enterprise telemetry, sandbox security | Enterprise teams with compliance needs | Proxy-aware OTel exports, cap-drop sandboxing, large-context model support (872K), Rust core |
| **Gemini CLI** | Agent reliability, subagent delegation, evaluation discipline | Developers experimenting with multi-agent workflows | SSR-driven bugfix cadence, nightly builds, 76 behavioral evals tracking toward expansion |
| **GitHub Copilot CLI** | MCP ecosystem integration, plugin marketplaces, headless SDK usage | GitHub-centric teams, Slack/IDE-embedded workflows | SDK server for integrations, plugin marketplaces with branch-pinned caches |
| **OpenCode** | Go inference gateway, managed model access, cross-platform desktop | Developers wanting a managed AI gateway + CLI | Go-based gateway with DeepSeek/R1 models, typed IPC contract between desktop layers |
| **Qwen Code** | Code review automation, CI efficiency, multi-channel chat | Chinese-language ecosystem, enterprise CI/CD | Content-anchored incremental reviews, ephemeral container verification, Weixin/Terminal channels |

---

## 5. Community Momentum & Maturity

**Most Mature & Highest Activity:**
- **Claude Code** — Largest established community (198👍 on a single request), consistent release cadence, broadest plugin ecosystem. The community is vocal, detailed in root-cause analysis (CIG/vendor DLL diagnosis), and runs organized PR review workflows.
- **Gemini CLI** — Rapidly iterating with nightly builds and SSR-driven fixes. The community is smaller but highly engaged on structural issues (subagent reliability, evals). Fixes land quickly after bug reports, suggesting close maintainer listening.

**Rapidly Iterating:**
- **Qwen Code** — The most PR-dense cycle, driven by a single prolific contributor (wenshao). SWE-bench validation rigor (500 tasks + 89 tasks, multiple smoke runs) demonstrates strong engineering discipline. The review/autofix automation is leading the industry.
- **OpenAI Codex** — Substantial infrastructure investment (6-PR telemetry stack in one cycle). The community is engaged on workflow-blocking issues (auto-resolve, MCP OAuth). The alpha release channel suggests pre-stability phase, but rapid shipping.

**Maintenance-Heavy / Slower Momentum:**
- **Copilot CLI** — Currently in a security/maintenance cycle with concentrated regressions (MCP OAuth, compaction). The README doc-removal PR drawn public scrutiny suggests internal restructuring. Community activity is lower relative to open issues.
- **OpenCode** — Gateway reliability issues (410s, billing) are eroding trust. The CLI itself has meaningful UX work (session management, Windows fixes) but the narrative is dominated by managed-service instability.
- **Kimi Code** — No activity; likely dormant for this period or in a quiet development phase.

---

## 6. Trend Signals

| Trend | Evidence | Reference Value |
|---|---|---|
| **Windows remains the weakest platform** | Claude GPU crashes, Qwen Ctrl+V regression, Codex process leaks, OpenCode path handling — every tool has Windows-specific failures | Cross-platform testing investment needs to be a priority for any tool aiming at broad enterprise adoption |
| **Silent failures are the most costly bugs** | Cross-session message drops (Claude), background subagents not waking (Codex), false "success" after MAX_TURNS (Gemini), phantom permission prompts (Claude) | Tools that fail loudly with clear diagnostics will win trust; silent data loss is existential for conversational tools |
| **Context management is the new performance frontier** | Qwen compression correct-ness, Copilot compaction loops, Gemini AST-aware reads, Claude skills saturating context | Token accounting, compaction reliability, and AST-aware navigation are replacing raw context window size as competitive differentiators |
| **MCP is the integration battleground, but unstable** | OAuth regressions across GitLab/Atlassian (Copilot), token refresh failures (Codex/OpenCode), tool visibility (OpenCode), consent gaps (Gemini) | MCP is becoming the universal plugin standard, but lifecycle maturity is the gap between a strong ecosystem and a fragmented one |
| **Agent autonomy vs. control tension** | Claude message queue mode, Gemini subagent disable fix, Codex auto-resolve toggle, OpenCode Plan→Build auto-switch | Users want agents to do more autonomously, but demand explicit, reliable control surfaces and escape hatches. Tools that navigate this balance gain community trust |
| **Multi-machine orchestration is next** | Claude cross-machine agents, Codex remote/dashboard, OpenCode session continuity, Gemini cross-host | The single-session model is giving way to long-lived, multi-device, multi-session workflows. Tools without remote/dashboard investment will lag |
| **Review/CI automation is a growing use case** | Qwen content-anchored reviews, autofix storms, Claude plugin-dev test hooks | AI CLI tools are becoming part of CI pipelines, not just interactive tools. Deterministic, verifiable, and resource-bounded automation is a production requirement, not a luxury |

---

*Data sources: GitHub issue trackers and PR activity for anthropics/claude-code, openai/codex, google-gemini/gemini-cli, github/copilot-cli, anomalyco/opencode, QwenLM/qwen-code, MoonshotAI/kimi-cli for 2026-08-18.*

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report

**Data as of 2026-08-18 | Source: github.com/anthropics/skills**

---

## 1. Top Skills Ranking

### #1 — skill-creator Eval Fixes (PR #1298, #1099, #1050)
**Status: Open | Activity: 3 separate PRs, 12+ issue comments, 7 👍**
Multiple contributors ([MartinCajiao](https://github.com/MartinCajiao), [joshuawowk](https://github.com/joshuawowk), [gstreet-ops](https://github.com/gstreet-ops)) are independently fixing **run_eval.py**, the evaluation harness for skill descriptions. The tool reports `recall=0%` on every test — meaning skill creators are optimizing descriptions against pure noise. Root causes: Windows subprocess pipe reading failures (`WinError 10038`), missing `.cmd` executable resolution, and the eval artifact not being installed as a real skill. These are the most critical fixes in the repo because they break the entire skill-improvement feedback loop.
[PR #1298](https://github.com/anthropics/skills/pull/1298) · [PR #1099](https://github.com/anthropics/skills/pull/1099) · [PR #1050](https://github.com/anthropics/skills/pull/1050) · [Issue #556](https://github.com/anthropics/skills/issues/556)

### #2 — document-typography (PR #514)
**Status: Open | Author: PGTBoos | Created: 2026-03-04**
A quality-control skill preventing typographic defects in AI-generated documents: orphan word wrap, widow paragraphs (headers stranded at page bottom), and numbering misalignment. Addresses a universal pain point — nearly every Claude-generated document exhibits these issues. Unusually practical scope that complements rather than overlaps existing document skills.
[PR #514](https://github.com/anthropics/skills/pull/514)

### #3 — DOCX/PDF Correctness Fixes (PR #538, #541, #539)
**Status: Open | Author: Lubrsy706 | Created: 2026-03-06**
Three surgical fixes from one contributor: case-sensitive file references in the PDF skill, `w:id` collision protection in DOCX tracked changes (prevents document corruption with existing bookmarks), and YAML validation warnings for unquoted descriptions with colons. The `w:id` fix is especially valuable — it resolves a class of silent document-corruption bugs in OOXML.
[PR #538](https://github.com/anthropics/skills/pull/538) · [PR #541](https://github.com/anthropics/skills/pull/541) · [PR #539](https://github.com/anthropics/skills/pull/539)

### #4 — ODT Skill — OpenDocument Creation & Conversion (PR #486)
**Status: Open | Author: GitHubNewbie0 | Created: 2026-03-01**
Comprehensive skill for creating, filling, reading, and converting OpenDocument Format files (`.odt`, `.ods`), with auto-triggers on mentions of ODT/ODS/ODF/LibreOffice/ISO-standard document requests. Fills a notable document-format gap alongside existing docx/pdf skills. Includes HTML conversion support.
[PR #486](https://github.com/anthropics/skills/pull/486)

### #5 — ServiceNow Platform Skill (PR #568)
**Status: Open | Author: Vanka07 | Created: 2026-03-08 | Updated: 2026-08-12**
Broad enterprise-platform skill covering ITSM, ITOM, ITAM/SAM, FSM, HRSD/CSM, SPM/PPM, vulnerability response, security incident response, and IntegrationHub. Positions itself as a platform assistant rather than narrow scripting helper. Longest-lived active discussion — still receiving attention 5 months after creation, indicating sustained enterprise interest.
[PR #568](https://github.com/anthropics/skills/pull/568)

### #6 — testing-patterns Skill (PR #723)
**Status: Open | Author: 4444J99 | Created: 2026-03-22**
Comprehensive testing stack skill: Testing Trophy philosophy, unit testing (AAA, naming, edge cases), React component testing with Testing Library, and guidance on what to test vs. what not to test. Directly addresses the high-demand testing-generation niche.
[PR #723](https://github.com/anthropics/skills/pull/723)

### #7 — skill-quality-analyzer + skill-security-analyzer (PR #83)
**Status: Open | Authors: eovidiu | Created: 2025-11-06**
Meta-skills for evaluating other skills. The quality analyzer scores across five dimensions (structure, documentation, examples, resources — 20% each); the security analyzer audits trust boundaries and permission requests. Anticipates the ecosystem's governance needs as the skills marketplace grows.
[PR #83](https://github.com/anthropics/skills/pull/83)

---

## 2. Community Demand Trends

**Security & Trust is the #1 concern.** Issue #492 (43 comments, 2 👍) documents how community skills distributed under the `anthropic/` namespace create trust-boundary abuse — users grant elevated permissions believing skills are official Anthropic products. This is the single most-discussed issue in the repository.

**Tooling reliability over new content.** Issue #556 (12 comments, 7 👍) — the `run_eval.py` zero-trigger bug — and #202 (skill-creator being educational documentation instead of operational instructions) show the community's priority is fixing the skill-development toolchain before expanding the skill catalog.

**Document format coverage is the most active skill category.** Typography quality (#514), ODT support (#486), DOCX/PDF corruption fixes (#538, #541) cluster around document generation. Users want output that is not just correct but professionally formatted and corruption-free.

**Context-window bloat is emerging as a critical issue.** Issue #1487 documents a bundled `claude-api` skill injecting ~156k tokens in a single tool call, exhausting the context window. This signals demand for leaner skill designs and better size governance.

**Enterprise platform integration** (ServiceNow, SharePoint concerns in #1175, SAP predictor) shows sustained demand for enterprise-workflow skills beyond the creative/technical defaults.

**Org-wide sharing** (#228, 16 comments, 8 👍) — the top-liked open issue — requests direct organizational skill sharing in Claude.ai instead of manual file transfers via Slack/Teams.

---

## 3. High-Potential Pending Skills

These PRs have active discussion, real utility, and are likely to merge:

- **document-typography** ([PR #514](https://github.com/anthropics/skills/pull/514)) — universal document-quality problem, clear scope, zero overlap with existing skills
- **testing-patterns** ([PR #723](https://github.com/anthropics/skills/pull/723)) — fills the code-quality/testing gap with comprehensive coverage
- **ODT skill** ([PR #486](https://github.com/anthropics/skills/pull/486)) — completes the document-format matrix; high practical utility
- **ServiceNow** ([PR #568](https://github.com/anthropics/skills/pull/568)) — broad enterprise coverage; sustained 5-month discussion suggests maintainers are evaluating scope carefully
- **skill-quality-analyzer + skill-security-analyzer** ([PR #83](https://github.com/anthropics/skills/pull/83)) — meta-skills that would meaningfully improve ecosystem quality and security posture
- **self-audit** ([PR #1367](https://github.com/anthropics/skills/pull/1367)) — mechanical file verification plus four-dimension reasoning audit; universal applicability across projects and models

---

## 4. Skills Ecosystem Insight

The community's most concentrated demand is for **toolchain reliability and security governance** — fixing the skill-evaluation harness, enforcing trust boundaries, and managing context-window bloat — rather than for new skill content, indicating the ecosystem is shifting from catalog expansion to production-hardening its core infrastructure.

---

# Claude Code Community Digest — 2026-08-18

## Today's Highlights

Release v2.1.234 lands with a new `CLAUDE_CODE_PROJECT_DIR_NAME` environment variable for custom per-project transcript directories and a `selection:clear` keybinding action. Community attention remains fixed on the Windows MSIX GPU crash cluster (0x060C201E) affecting browser previews and external links, with three active threads and a proposed CIG/vendor-signed DLL root cause. A long-running feature request for a message queue mode (198 👍) continues to lead discussion, and two new cross-session message-dropping regressions on the desktop app have surfaced within the last week.

## Releases

### v2.1.234
- Added optional `CLAUDE_CODE_PROJECT_DIR_NAME` environment variable: hosts that give each session its own config directory can choose a short name for the per-project transcript directory.
- Added `selection:clear` keybinding action, allowing a key to be bound to clear an in-app selection.

## Hot Issues

1. **[Feature Request: Message queue mode](https://github.com/anthropics/claude-code/issues/50246)** — #50246 (CLOSED, 60 comments, 198 👍)  
   Users want to queue follow-up messages instead of interrupting Claude mid-task. The 198 upvotes make it one of the most-wanted quality-of-life features; closure status suggests internal discussion or roadmap work.

2. **[Windows MSIX GPU-process crash on browser tab](https://github.com/anthropics/claude-code/issues/80444)** — #80444 (39 comments, 5 👍)  
   The flagship Windows crash: any in-app Browser tab triggers a fatal GPU-process exit (0x060C201E) that leaves the MSIX package unlaunchable until a Repair cycle. Reproduced across two NVIDIA driver versions on Win11.

3. **[Multi-agent collaboration across machines](https://github.com/anthropics/claude-code/issues/28300)** — #28300 (38 comments)  
   A protocol-level request for agent-to-agent collaboration across hosts. Spawns discussion about distributed agent orchestration and secure cross-machine handoffs.

4. **[Bash tool overuse vs. builtin tools](https://github.com/anthropics/claude-code/issues/19649)** — #19649 (28 comments, 97 👍)  
   Claude frequently shells out to `sed`/`grep` when `Read`/`Grep` tools would be more efficient and safer. High 👍 count signals strong developer agreement on tool-selection behavior.

5. **[CIG + vendor-signed vk_swiftshader.dll kills GPU process](https://github.com/anthropics/claude-code/issues/81341)** — #81341 (21 comments, 3 👍)  
   Root-cause analysis for the Windows crash family: MicrosoftSignedOnly (CIG) policy conflicts with the vendor-signed SwiftShader DLL, making every browser preview fatal. This thread is the technical hub for the crash cluster.

6. **[Cross-session messages silently dropped on Windows](https://github.com/anthropics/claude-code/issues/86298)** — #86298 (13 comments, 1 👍)  
   Regression since app 1.28929.0: messages are held for an approval the UI never shows, then expire after ~5 minutes. Silent data loss in a conversational tool is high-severity.

7. **[Esc in /btw rejects pending tool-use prompt](https://github.com/anthropics/claude-code/issues/64568)** — #64568 (10 comments, 9 👍)  
   Pressing Esc to exit `/btw` mode gets routed to the pending permission prompt and denies the tool use — a dangerous misfire that can reject a legitimate operation.

8. **[Cross-session messages never reach runtime input queue](https://github.com/anthropics/claude-code/issues/86237)** — #86237 (8 comments, 1 👍)  
   Companion to #86298: messages render in the target session's UI but never enter the runtime queue. Regression tracked to 2.1.222 → 2.1.227.

9. **[Background subagent balloons to 9.5 GiB → OOM](https://github.com/anthropics/claude-code/issues/81343)** — #81343 (5 comments)  
   A single idle background subagent grows to 9.5 GiB RSS in ~100 seconds, causing a global kernel OOM on a 15.6 GiB host. Points to a serious memory-management leak in the Task tool's background path.

10. **[Fable 5 thinking blocks empty in VS Code 2.1.233](https://github.com/anthropics/claude-code/issues/86865)** — #86865 (3 comments, 4 👍)  
   Regression in the VS Code extension: Fable 5 `thinking` blocks return empty on 2.1.233; Opus 5 unaffected and 2.1.228 worked. Reasoning-chain visibility is important for debugging.

## Key PR Progress

1. **[fix: disable-model-invocation for ralph-wiggum](https://github.com/anthropics/claude-code/pull/87395)** by bcherny (CLOSED)  
   Fixes `/ralph-loop` self-invocation: the plugin used an unsupported `hide-from-slash-command-tool` frontmatter key, which Claude ignored, allowing the model to start loops on its own. Now uses `disable-model-invocation`.

2. **[fix: remove statsig.anthropic.com from init-firewall.sh](https://github.com/anthropics/claude-code/pull/72451)** by gmli-eu (CLOSED)  
   The hostname no longer resolves, causing devcontainer startup to fail when the firewall script tries to resolve every allowlist entry.

3. **[fix: validate-settings.sh aborts on no lowercase frontmatter matches](https://github.com/anthropics/claude-code/pull/79131)** by Codeturion (OPEN)  
   `grep` returning 1 with `set -euo pipefail` kills the script before printing any diagnostic. Also reports skipped mixed-case/hyphenated keys.

4. **[feat: container isolation example with guard hook](https://github.com/anthropics/claude-code/pull/30692)** by zeitlinger (CLOSED)  
   Adds `examples/container/` for running Claude Code in Podman/Docker with a PreToolUse guard hook that blocks force push, hard reset, branch -D, `rm -rf`, and PR merges.

5. **[docs: clarify excludedCommands requires :* suffix](https://github.com/anthropics/claude-code/pull/29284)** by zeitlinger (CLOSED)  
   Documents that `"docker"` only matches the bare command; `"docker:*"` is required to match commands with arguments. Updates the settings-bash-sandbox example.

6. **[fix(plugin-dev): limit frontmatter parsing](https://github.com/anthropics/claude-code/pull/84004)** by RerankerGuo (CLOSED)  
   The range-based `sed` restarts at every later `---` line, so Markdown horizontal rules in settings files corrupt frontmatter parsing. Now parses only the opening block.

7. **[fix(scripts): propagate top-level failures](https://github.com/anthropics/claude-code/pull/84003)** by RerankerGuo (CLOSED)  
   Both duplicate-maintenance scripts used `.catch(console.error)`, which reported startup/API failures but resolved the promise as success. Now returns failing process status.

8. **[fix(scripts): validate gh flag values](https://github.com/anthropics/claude-code/pull/83999)** by RerankerGuo (CLOSED)  
   The restricted `gh` wrapper left `skip_next=true` at end of input, forwarding incomplete commands like `gh issue list --limit` and bypassing argument validation.

9. **[fix(plugin-dev): assert expected hook decision](https://github.com/anthropics/claude-code/pull/83992)** by RerankerGuo (CLOSED)  
   Fixes #83800: `test-hook.sh` treated allow and deny as both successful. Adds `--expect allow|deny|ask` so tests can fail when a hook allows an operation it should deny.

10. **[fix(plugin-dev): report missing jq dependency](https://github.com/anthropics/claude-code/pull/83990)** by RerankerGuo (CLOSED)  
   Fixes #83802: `test-hook.sh` reported every `jq` failure as invalid JSON. Now checks for `jq` before first use and reports the missing dependency explicitly.

## Feature Request Trends

- **Non-interruptive interaction**: The message queue mode (#50246, 198 👍) leads a broader theme of letting users queue follow-ups, defer prompts, and avoid accidental interrupts or denials.
- **Multi-agent orchestration**: Requests for agent-to-agent protocols (#28300) and cross-machine collaboration point toward distributed agent workflows rather than single-session autonomy.
- **Permission-system consistency**: Multiple threads (#73325, #83567) ask for stable keyboard shortcuts and labels across CLI and desktop surfaces — the digit for "No" should be identical everywhere.
- **Smarter tool selection**: High demand (97 👍 on #19649) for the model to prefer builtin `Read`/`Grep` tools over spawning Bash with `sed`/`grep`, reducing side effects and permission friction.
- **Context management**: Complaints about skills saturating context with irrelevant language bundles (#87191, #63566) indicate a need for language-aware or size-limited skill loading.

## Developer Pain Points

- **Windows desktop reliability**: The GPU-process crash cluster (0x060C201E) is the most-discussed bug family, spanning browser previews, external links, and full MSIX lockups requiring Repair cycles. The CIG/SwiftShader root cause (#81341) is well characterized but unfixed.
- **Silent message loss on desktop**: Two regressions this week (#86237, #86298) where cross-session messages render but are dropped or held for phantom approvals — a severe trust issue for a chat tool.
- **Model tool-selection behavior**: Claude's habit of using Bash utilities over purpose-built tools (#19649) frustrates developers who want safer, more predictable operations.
- **Context bloat from skills**: Bundled skills like `/claude-api` load multi-language bundles unconditionally, spiking context by hundreds of thousands of tokens (#87191, #63566).
- **Memory leaks in background agents**: A single idle subagent OOMing a 15.6 GiB host (#81343) raises concerns about resource containment for parallel agent workloads.
- **Scattered keyboard-shortcut inconsistencies**: Esc in `/btw` rejecting prompts (#64568) and opposite 1/2-key meanings between CLI and desktop (#73325) create muscle-memory hazards that corrupt real work.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

## Today's Highlights

The Codex team shipped a substantial infrastructure overhaul focused on proxy-aware telemetry, with a six-PR stack routing all OTLP exports, Sentry feedback, and Windows elevated telemetry through the shared HTTP client. The TUI gained a new interactive `/agents` dashboard and a dedicated `codex agents` command for managing root sessions, while GPT-5.6 context windows were raised to 872K tokens. Meanwhile, community reports highlight growing pain around Desktop/CLI session sync issues, MCP server lifecycle problems on Windows, and recursive subagent behavior quirks.

## Releases

- **rust-v0.148.0-alpha.21** — Patch release with no detailed changelog provided.

## Hot Issues

1. [**#28969** — Add setting to disable the auto-resolve in 60 seconds for questions](https://github.com/openai/codex/issues/28969) — The most-upvoted open issue (195 👍, 79 comments). Users want control over the timeout that auto-resolves pending questions, which interrupts long-running agent tasks. High engagement suggests this is a widespread workflow blocker.

2. [**#17265** — Codex does not auto-refresh routed MCP OAuth tokens](https://github.com/openai/codex/issues/17265) — Persistent MCP token refresh failure causes tool calls to fail after expiry despite a stored refresh token. 57 👍 indicates many MCP users are hitting this.

3. [**#37403** — macOS Desktop cannot resume Remote Control / CLI thread: `already has an active writer`](https://github.com/openai/codex/issues/37403) — A regression after the August 7 update breaks the mobile-to-desktop remote workflow that previously worked. Critical for users relying on cross-device session continuity.

4. [**#15723** — Background subprocesses/subagents do not wake the calling agent on completion](https://github.com/openai/codex/issues/15723) — Long-standing issue where background work silently finishes without notifying the parent agent, causing stalled threads. Active since March.

5. [**#17793** — Backspace deletes more than one character in TUI](https://github.com/openai/codex/issues/17793) — A frustrating input bug in the TUI that makes prompt editing error-prone. Likely an IME or bracketed-paste handling issue.

6. [**#13491** — Forked Worker inherits parent user intent and misinterprets it as direct instruction](https://github.com/openai/codex/issues/13491) — Subagents recursively attempt delegation because they inherit the parent's user-intent context. Points to deeper prompt-context isolation problems in the subagent system.

7. [**#38754** — Windows local stdio MCP servers repeatedly spawned and not reaped](https://github.com/openai/codex/issues/38754) — Newly reported (Aug 15). Process leak causes resource exhaustion within a single task. Windows-specific process lifecycle management seems immature.

8. [**#33599** — Desktop app silently fails to attach `node_repl` MCP tools to new tasks](https://github.com/openai/codex/issues/33599) — Browser (in-app), Chrome, and Computer Use tools break only in the Desktop app while CLI works. Silent failure makes this hard to diagnose.

9. [**#38855** — Type-invalid `item_` reasoning IDs survive replay validation; OpenAI expects `rs_`](https://github.com/openai/codex/issues/38855) — Custom-provider request serialization defect causing rejected API calls. Affects users routing through alternative endpoints.

10. [**#39059** — GPT-5.6 turns bounded codebase work into self-reinforcing verification and governance layers](https://github.com/openai/codex/issues/39059) — Model-behavior concern: the latest model over-engineers solutions, adding excessive validation and policy layers instead of completing the requested task. Early signal worth watching.

## Key PR Progress

1. [**#39114** — Add a dedicated `codex agents` dashboard command](https://github.com/openai/codex/pull/39114) — Opens the shared agents overview without creating a new session; auto-starts the local background app server on Unix or connects via `--remote`.

2. [**#39112** — Make the agents overview an interactive task dashboard](https://github.com/openai/codex/pull/39112) — Users can now start tasks, open root sessions, rename tasks, and stop active work directly from the overview; shows details on wide terminals.

3. [**#39102** — Raise the GPT-5.6 maximum context window](https://github.com/openai/codex/pull/39102) — Allows `gpt-5.6-sol`, `-terra`, and `-luna` context overrides up to 872,000 tokens, with matching Amazon Bedrock entries.

4. [**#39103** — Drop capabilities from Linux sandbox processes](https://github.com/openai/codex/pull/39103) — Security hardening: `--cap-drop ALL` in bubblewrap modes plus an inner-stage verification that capability sets are empty before execution.

5. [**#39101** — Update rmcp to 3.1.2](https://github.com/openai/codex/pull/39101) — Removes the local compatibility layer for multi-round-trip tool results; supports OAuth protected-resource metadata.

6. [**#39117** — Reject lossy legacy permission projections](https://github.com/openai/codex/pull/39117) — Prevents silent path-access changes when converting managed filesystem permission profiles to legacy sandbox policy.

7. [**#39091** — Propagate proxy policy into elevated Windows telemetry](https://github.com/openai/codex/pull/39091) — Final PR of the OTel proxy stack; syncs outbound proxy policy into the elevated Windows sandbox setup payload.

8. [**#39098** — Trace exec-server requests from receipt through completion](https://github.com/openai/codex/pull/39098) — Adds end-to-end spans for exec-server requests including network policy callbacks, improving debuggability.

9. [**#39094** — Add an agents overview dashboard to the TUI](https://github.com/openai/codex/pull/39094) — New `/agents` command opens a full-screen dashboard with search, navigation, and grouping by project or status.

10. [**#39100** — Avoid redundant terminal size queries during history insertion](https://github.com/openai/codex/pull/39100) — Performance fix: reuses cached screen size in TUI draw and history-tail paths, reducing backend queries.

## Feature Request Trends

- **Remote/Dashboard session management** — Multiple requests (agents overview, interactive dashboards, remote control state fixes, thread-tab title handling) point toward better cross-device session lifecycle control.
- **Configurable timeouts and auto-resolve behavior** — Users increasingly want fine-grained control over when Codex pauses, auto-resolves, or waits; the 60-second auto-resolve toggle is the top-voted issue.
- **MCP lifecycle robustness** — Recurring themes around token refresh, server spawning/reaping, and tool attachment consistency between CLI and Desktop.
- **Telemetry and observability options** — Opt-in OTel response logging and proxy-aware transports for enterprise deployments; users want to monitor agent behavior for evaluation.
- **Context-window headroom** — The 872K-token raise for GPT-5.6 models signals demand for longer-context workflows.

## Developer Pain Points

- **Windows Desktop is the weakest platform** — Disproportionate share of bugs: MCP process leaks, persistent shell poisoning after reboot, high I/O read loops, Ctrl+PgUp/PgDown failures, and auto-approval inheritance gaps all affect Windows specifically.
- **Subagent orchestration surprises** — Background subagents not waking callers, forked workers inheriting misleading user intent, and child pages showing incorrect "Working" status create confusion about what is actually executing.
- **Session continuity breaks between mobile, Desktop, and CLI** — Remote control state errors, missing worktree options, and sidebar association failures make it hard to pick up where you left off across devices.
- **Silent failures are the most costly** — MCP tools not attached, scheduled tasks pausing themselves, and migrated threads losing names all fail without clear user-facing errors, forcing manual diagnosis.
- **Token/auth lifecycle friction** — Routed MCP OAuth refresh failures and custom-provider reasoning ID validation errors add operational overhead for advanced users.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**Gemini CLI Community Digest – 2026-08-18**

### 1. Today's Highlights

The project saw a high volume of SSR Agent-driven fixes land, targeting stability and developer experience, including a critical fix for sub-agents running when disabled (#22093) and a resolution for the TUI hanging indefinitely on bare Linux terminals (#21477). The most active open issues continue to revolve around agent reliability, with sub-agent recovery and generalist agent hangs receiving the most community engagement. A community PR addressing permission consent for extension environment variables (#28863) and another improving shell execution typing (#28862) are pending review.

---

### 2. Releases

Two nightly builds were published in the last 24 hours:
- **[v0.56.0-nightly.20260818.g194edea47](https://github.com/google-gemini/gemini-cli/releases/tag/v0.56.0-nightly.20260818.g194edea47)**: Includes fixes for privacy notice wording (#26120) and TypeScript strict-null errors in integration tests (#21919).
- **[v0.56.0-nightly.20260817.g9a15c45fb](https://github.com/google-gemini/gemini-cli/releases/tag/v0.56.0-nightly.20260817.g9a15c45fb)**: Adds a composite flag to the `packages/cli` tsconfig to resolve build issues (#21911).

---

### 3. Hot Issues

**1. Subagent recovery after MAX_TURNS reported as GOAL success** [#22323](https://github.com/google-gemini/gemini-cli/issues/22323)
This bug misreports interruptions as successes, misleading the main agent into thinking a task was completed. It has 12 comments and is flagged `status/need-retesting`, suggesting an incomplete fix under validation.

**2. Generalist agent hangs** [#21409](https://github.com/google-gemini/gemini-cli/issues/21409)
A persistent, high-severity issue where the CLI hangs indefinitely when delegating to the generalist agent. With 8 comments and 8 reactions, it is a major reliability pain point, and users must work around it by disabling sub-agents.

**3. Robust component level evaluations** [#24353](https://github.com/google-gemini/gemini-cli/issues/24353)
An epic tracking the expansion of behavioral eval tests beyond the current 76. This is a foundational effort to increase test coverage and prevent regressions in agent components.

**4. Assess the impact of AST-aware file reads, search, and mapping** [#22745](https://github.com/google-gemini/gemini-cli/issues/22745)
An investigation into using AST-aware tools to reduce token noise and improve navigation efficiency. The community has low engagement (1 👍), but the maintainers are actively tracking this.

**5. Gemini does not use skills and sub-agents enough** [#21968](https://github.com/google-gemini/gemini-cli/issues/21968)
Anecdotal but critical feedback that the core model under-utilizes custom skills and sub-agents unless explicitly instructed, limiting the value of these features for power users.

**6. Stop Auto Memory from retrying low-signal sessions indefinitely** [#26522](https://github.com/google-gemini/gemini-cli/issues/26522)
A bug where low-signal sessions are retried endlessly instead of being marked as processed, causing wasted compute and potential loops in the background memory extraction.

**7. Shell command execution gets stuck with "Waiting input"** [#25166](https://github.com/google-gemini/gemini-cli/issues/25166)
Another hang-related issue where simple commands are flagged as awaiting input after completion. With 3 👍 and 4 comments, this is a common annoyance affecting core shell usage.

**8. (Sub)agents running without permission since v0.33.0** [#22093](https://github.com/google-gemini/gemini-cli/issues/22093) *(CLOSED)*
This was a critical regression where sub-agents executed despite being disabled in config. It has been fixed in PR #28867, which is a major win for user control and security.

**9. Add deterministic redaction and reduce Auto Memory logging** [#26525](https://github.com/google-gemini/gemini-cli/issues/26525)
A security-focused issue noting that secret redaction happens *after* content is sent to the model. This highlights a potential data exposure risk in the Auto Memory feature.

**10. Browser subagent fails in wayland** [#21983](https://github.com/google-gemini/gemini-cli/issues/21983)
A platform-specific bug preventing the browser agent from working on Wayland, limiting functionality for a significant portion of Linux users.

---

### 4. Key PR Progress

**1. [Issue Fix (22093): Prevent subagents from running when agents mode is disabled](https://github.com/google-gemini/gemini-cli/pull/28867)**
A critical bugfix restoring user control over agent execution and fixing a regression introduced in v0.33.0. This was closed and merged.

**2. [Issue Fix (21477): Prevent indefinite TUI hang by adding execution timeouts](https://github.com/google-gemini/gemini-cli/pull/28812)**
Adds timeouts to `getProcessInfo()` to prevent hangs during TUI initialization on bare Linux terminals. Closed and merged.

**3. [Issue Fix (21783): Emit pending tool call update before requesting permission](https://github.com/google-gemini/gemini-cli/pull/28870)**
Fixes an ACP protocol violation where a `tool_call` update was not sent before a permission request, which is important for client interoperability.

**4. [Issue Fix (21331): Fix host network resolution for gVisor runsc sandbox](https://github.com/google-gemini/gemini-cli/pull/28869)**
Fixes IDE companion connection issues when using gVisor sandboxing by resolving host network limitations.

**5. [Issue Fix (23954): Add trailing space to autocomplete suggestions](https://github.com/google-gemini/gemini-cli/pull/28868)**
A simple UX fix that allows immediate execution of commands after autocompletion without manually adding a space. Closed and merged.

**6. [Issue Fix (28050): Add Vertex AI locations documentation link](https://github.com/google-gemini/gemini-cli/pull/28865)**
Improves documentation by linking to the official list of supported Vertex AI regions, addressing a lack of clarity for new users.

**7. [fix(extensions): prompt for consent on environment changes...](https://github.com/google-gemini/gemini-cli/pull/28863)** *(Community PR)*
This security-focused PR closes a consent bypass where extensions could inject environment variables into MCP server processes. It is open for review.

**8. [fix(core): ignore .gemini folder by default in file search](https://github.com/google-gemini/gemini-cli/pull/28866)** *(Community PR)*
Addresses an issue where the CLI's own configuration directory was being scanned by watchers and crawlers, which could cause a performance issue when running on a home directory.

**9. [refactor(core): remove eslint-disable and type-asserts from shellExecutionService](https://github.com/google-gemini/gemini-cli/pull/28862)** *(Community PR)*
A code quality refactor that removes unsafe type assertions, which is likely related to fixing a resource leak on macOS PTY (`fix/mac-pty-resource-leak` branch).

**10. [Issue Fix (22588): Fix silent hang in MessageBus.request when publish fails](https://github.com/google-gemini/gemini-cli/pull/28816)**
Fixes a 60-second silent hang caused by an unhandled promise rejection in the `MessageBus`, a likely source of sporadic freezes. Closed and merged.

---

### 5. Feature Request Trends

- **Agent Autonomy and Proactivity**: Users want the core agent to autonomously utilize sub-agents and custom skills (#21968) without explicit prompting, but are also requesting guardrails to prevent it from doing so when disabled (#22093).
- **AST-Aware Tooling**: Epic-level interest in using AST-aware methods for file reads, search, and codebase mapping to reduce token consumption and improve navigation precision (#22745, #22746).
- **Reliable Memory and Security**: Strong focus on hardening the Auto Memory system, including requests for deterministic secret redaction *before* context is sent (#26525) and better handling of low-signal session retries (#26522).
- **Improved Developer Feedback**: Demand for richer debugging and observability tools, such as sharing sub-agent trajectories via the `/chat share` command (#22598) and including sub-agent context in `/bug` reports (#21763).

---

### 6. Developer Pain Points

- **Recurring Hangs and Freezes**: A large number of issues involve the CLI hanging in various contexts—generalist agent delegation (#21409), shell commands (#25166), TUI initialization (#21477), and internal message bus failures (#22588). This is the most significant reliability concern.
- **Silent Failures and Misleading Status**: The issue where a subagent reports "success" after hitting `MAX_TURNS` (#22323) points to a deeper problem with the accuracy of agent state reporting, which erodes trust in the tool's logs and decision-making.
- **Lack of Control and Consent**: The frustration around subagents running despite being disabled (#22093) and extension environment variables being injected without consent (#28863) highlights a strong desire for explicit, gated user control over the tool's behavior.
- **Environmental and Platform Rigidity**: Developers are hitting walls with platform-specific issues (e.g., Wayland for the browser agent #21983) and restrictive sandboxes (e.g., gVisor network issues #28869), making the CLI less portable across different developer setups.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest
**2026-08-18**

---

## Today's Highlights

MCP integration issues dominate the current release cycle, with multiple reports of OAuth authentication regressions affecting GitLab and Atlassian servers, plus a critical BigInt serialization crash. The broader community is also seeing a wave of session robustness concerns — from broken session restores and stale connection IDs to a memory-pressure watchdog that force-compacts conversations at low context usage and loops until OOM. A new PR removing all CLI documentation from the README has raised eyebrows and is drawing attention from the community.

---

## Releases

No new releases in the last 24 hours.

---

## Hot Issues

1. **[#1481 — SHIFT+ENTER executes instead of inserting line break](https://github.com/github/copilot-cli/issues/1481)** *(CLOSED, 28 comments, 👍17)*  
   Long-standing UX complaint: `SHIFT+ENTER` — the universal line-break shortcut in chat apps — prematurely executes the prompt, with only `CTRL+ENTER` working. High community consensus; finally resolved after six months.

2. **[#4390 — Organization-enabled models missing from catalogue](https://github.com/github/copilot-cli/issues/4390)** *(OPEN, 8 comments, 👍7)*  
   Models explicitly enabled by a Copilot Business org (Claude Sonnet 5/Opus 5, Kimi K3) are unavailable in CLI, with misleading "disabled by your organization" errors. Affects enterprise users who expect policy parity.

3. **[#4439 — GitLab MCP OAuth fails with RFC 8414 issuer mismatch](https://github.com/github/copilot-cli/issues/4439)** *(CLOSED, 5 comments, 👍3)*  
   v1.0.79 rejects OAuth metadata from GitLab Self-Managed MCP servers during Dynamic Client Registration. Closed, but the related regression below remains open.

4. **[#4480 — Atlassian MCP OAuth regression from 1.0.71](https://github.com/github/copilot-cli/issues/4480)** *(OPEN, 5 comments, 👍6)*  
   "Incompatible authorization server" error during OAuth discovery against `mcp.atlassian.com` — a regression introduced in 1.0.79. This is actively blocking a major MCP provider for affected users.

5. **[#4211 — BigInt in structured MCP response crashes CLI](https://github.com/github/copilot-cli/issues/4211)** *(OPEN, triaged, 4 comments, 👍2)*  
   `TypeError: Do not know how to serialize a BigInt` aborts all ongoing tasks when an MCP server returns large numbers. Triaged; impacts any MCP tool returning numeric IDs or timestamps beyond JS safe integer range.

6. **[#4513 — Plugin marketplace cache ignores `ref` across branches](https://github.com/github/copilot-cli/issues/4513)** *(OPEN, triaged, 0 comments)*  
   Cache keyed only by source URL — not by ref — causes cross-project contamination when different branches of the same marketplace are pinned. Subtle but dangerous for teams using branch-based marketplace development.

7. **[#4506 — Memory-pressure watchdog force-compacts at 23% context, recovers 0.003%, loops to OOM](https://github.com/github/copilot-cli/issues/4506)** *(OPEN, triaged, 0 comments)*  
   A long-running session repeatedly compacted despite low context usage (~23% of 400k). The memory-pressure watchdog ignores context thresholds, recovering negligible tokens, then loops until the process dies. Serious stability defect for extended sessions.

8. **[#4509 — `--no-alt-screen` silently removed with no replacement](https://github.com/github/copilot-cli/issues/4509)** *(OPEN, triaged, 👍1)*  
   The escape hatch for alt-screen/fullscreen mode was removed without deprecation notice. Users report this mode is "unavoidable and broken," citing unaddressed issues since March (#1799, #2334).

9. **[#4505 — Resumed session retains stale connection item IDs](https://github.com/github/copilot-cli/issues/4505)** *(OPEN, triaged, 0 comments)*  
   After resuming a session, every prompt fails with `400 input item ID does not belong to this connection`. `/fork` doesn't recover it either. Session data persists across resume with invalid connection references.

10. **[#4503 — SDK server reports ready without auth; Slack sessions fail generically](https://github.com/github/copilot-cli/issues/4503)** *(CLOSED, 5 comments)*  
   The SDK server advertised readiness without `COPILOT_SDK_AUTH_TOKEN`, then failed with a generic "couldn't create session" error in Slack. Addresses a class of misleading readiness signals in headless integrations.

---

## Key PR Progress

1. **[#4510 — Remove GitHub Copilot CLI documentation from README](https://github.com/github/copilot-cli/pull/4510)** *(OPEN)*  
   Strips all install and usage docs from the README. Unclear motivation; community scrutiny expected — likely related to documentation relocation or repo restructuring.

---

## Feature Request Trends

- **Plugin dependency management** ([#4487](https://github.com/github/copilot-cli/issues/4487)): Request for inter/intra-marketplace dependency specification and auto-install resolution, similar to Claude Code's plugin model.
- **Session context tier parity in ACP** ([#4275](https://github.com/github/copilot-cli/issues/4275)): Non-interactive ACP clients want the same `/model` context-window tier switch available in interactive mode.
- **Mid-session instruction reload** ([#4508](https://github.com/github/copilot-cli/issues/4508)): Long-running sessions across 200+ compactions never pick up `.github/instructions/*.md` edits; users want on-the-fly reload.
- **Conversation scrolling** ([#4313](https://github.com/github/copilot-cli/issues/4313)): Mouse wheel and PageUp/PageDown navigation through current conversation history.
- **System-installed `gh` CLI support** ([#4456](https://github.com/github/copilot-cli/issues/4456)): Remove hard dependency on bundled `gh.exe` by allowing the system installation.

---

## Developer Pain Points

- **MCP OAuth instability**: Recurring RFC 8414 issuer mismatch and discovery failures across major providers (GitLab, Atlassian) — a single release (1.0.79) regressed multiple integrations, with one still unresolved.
- **Alt-screen/terminal rendering regressions**: The `--no-alt-screen` flag removal without a replacement — a pattern of breaking changes without deprecation notices.
- **Session durability issues**: Stale connection IDs (#4505), force-compaction loops until OOM (#4506), and unreliable remote restore (#4514) collectively undermine long-running session trust.
- **MCP tool result mishandling**: Both BigInt crashes (#4211) and duplicated `content`/`structuredContent` fields (#4515) indicate the structured-content pipeline is still maturing.
- **Configuration surfaces disagree**: Repository-level `enabledPlugins` ignored in non-interactive mode (#4507), and model selection in `agent.md` bypassed by custom agents (#2950) — parity gaps that erode predictability.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-08-18

## Today's Highlights

The OpenCode Go inference gateway is experiencing reliability issues, with multiple reports of endpoint unavailability, model advertisement mismatches, and billing/usage discrepancies on DeepSeek models. Meanwhile, a cluster of automated cleanup PRs from July were closed, signaling a backlog merge, and several longstanding bugs around Windows paths, MCP tool exposure, and session continuation received attention.

## Releases

No new releases in the last 24 hours.

## Hot Issues

1. **[#43105 — [2.0] BUG: enpoint error](https://github.com/anomalyco/opencode/issues/43105)** (15 comments, CLOSED) — Users report the legacy inference endpoint `https://opencode.ai/inference/v1` returns HTTP 410 "Gone." The issue is closed but indicates a migration break for external clients.

2. **[#32149 — Opencode Stops Processing Requests Without Response](https://github.com/anomalyco/opencode/issues/32149)** (12 comments, 6 👍, OPEN) — A long-running bug where the app enters a "thinking" state and never completes. High community engagement suggests this is a major reliability pain point affecting many users.

3. **[#7801 — [FEATURE]: Plan Mode + Question tool can auto switch to Build mode](https://github.com/anomalyco/opencode/issues/7801)** (11 comments, 32 👍, OPEN) — The most-upvoted feature request this cycle. Users want the agent to automatically transition from planning to execution when confident, reducing manual mode switching friction.

4. **[#22861 — Bug: Big Pickle stops response early](https://github.com/anomalyco/opencode/issues/22861)** (10 comments, CLOSED) — A model (likely a local/custom provider) consistently truncates responses at the same point. Closed, possibly due to provider-side fix.

5. **[#40243 — ChatGPT OAuth rejects GPT-5.6 models for EU-resident workspace](https://github.com/anomalyco/opencode/issues/40243)** (9 comments, CLOSED) — Official Codex CLI works but OpenCode fails with EU residency OAuth, highlighting a compliance-related auth gap.

6. **[#33027 — [BUG] MCP tools connected but not exposed to agent](https://github.com/anomalyco/opencode/issues/33027)** (8 comments, 3 👍, OPEN) — The MCP server connects and lists tools, but the agent never sees them. This is a core integration bug affecting the entire MCP tooling ecosystem.

7. **[#24153 — [FEATURE]: Add unarchive/restore for archived sessions](https://github.com/anomalyco/opencode/issues/24153)** (8 comments, 11 👍, OPEN) — Archiving is one-way; users want restore functionality. Gaining traction as session management matures.

8. **[#36681 — [Bug] Windows path references and permissions on external directory path not working](https://github.com/anomalyco/opencode/issues/36681)** (7 comments, OPEN) — Windows users report that `external_directory` permissions in config are silently ignored, with no documentation on path handling.

9. **[#43009 — Incorrect charging items](https://github.com/anomalyco/opencode/issues/43009)** (6 comments, CLOSED) — User reports overcharging on OpenCode Go (DeepSeek models), asking for billing reset. Combined with #43149, this suggests potential metering bugs on the gateway.

10. **[#43146 — deepseek flash v4 (opencode go) is broken](https://github.com/anomalyco/opencode/issues/43146)** (4 comments, OPEN) — DeepSeek Flash V4 enters an endless reply loop, making it unusable on OpenCode Go. Fresh issue with no workaround yet.

## Key PR Progress

1. **[#43150 — refactor(desktop): establish typed ipc contract](https://github.com/anomalyco/opencode/pull/43150)** — Strongly-typed IPC for desktop app, unifying main/preload/renderer contracts. Reduces a class of runtime bugs.

2. **[#43142 — fix(core): support older previous-channel databases](https://github.com/anomalyco/opencode/pull/43142)** (CLOSED) — V2 database importer now tolerates older schemas, fixing migration failures for users upgrading from earlier betas.

3. **[#43144 — fix(ui): smooth shimmer loop](https://github.com/anomalyco/opencode/pull/43144)** (CLOSED) — Agent-authored UI polish fixing a visual artifact in loading shimmer across both implementations.

4. **[#43125 — feat(plugin): expose MCP server transforms](https://github.com/anomalyco/opencode/pull/43125)** — Adds programmatic MCP server management (`list/get/set/update/remove`) to the plugin API, unlocking URL-based policies and dynamic reconfiguration.

5. **[#40125 — feat(opencode): Allow per-MCP-server trust configuration](https://github.com/anomalyco/opencode/pull/40125)** — Fingerprint pinning for self-signed certs per MCP server, replacing global `insecure: true`. Addresses a long-standing security-flexibility tradeoff.

6. **[#43141 — fix(core): disable WAL on network filesystems](https://github.com/anomalyco/opencode/pull/43141)** — Detects NFS/SMB/9P/FUSE via `statfs` and falls back to rollback journal, fixing database corruption risks for shared/networked home directories.

7. **[#43017 — refactor(app): use shared server data](https://github.com/anomalyco/opencode/pull/43017)** (CLOSED, beta) — Consolidates app consumers onto the shared server data layer, removing duplicated sync logic and legacy caches in preparation for the V2 layout.

8. **[#43140 — fix(session): skip in-flight sessions in --continue selection](https://github.com/anomalyco/opencode/pull/43140)** — Prevents `opencode run --continue` from injecting prompts into sessions actively used by another process.

9. **[#43074 — fix(core): serialize MCP token refresh](https://github.com/anomalyco/opencode/pull/43074)** (CLOSED) — Fixes race condition where concurrent MCP clients exchange the same OAuth refresh token, causing one to fail.

10. **[#43136 — fix(ai): settle pending Anthropic tool calls](https://github.com/anomalyco/opencode/pull/43136)** — Properly handles `message_stop` arriving without `content_block_stop`, preventing lost tool calls and phantom pending state in Anthropic streams.

## Feature Request Trends

- **Session lifecycle management** — Unarchive/restore, auto-pause/resume on rate limits, and skipping in-flight sessions all point to a maturing need for robust long-session state handling.
- **MCP server configuration at runtime** — Trust pinning, server transforms, and tool exposure fixes indicate that MCP integration is now a primary production surface for many teams.
- **Mode auto-transitions** — Plan-to-Build automation (with 32 👍) signals users want less manual steering and more autonomous agent behavior.

## Developer Pain Points

- **OpenCode Go reliability and transparency** — Endpoint 410s, model lists advertising unavailable models, billing/usage percentage mismatches, and broken DeepSeek V4 variants are eroding trust in the managed gateway. These are not isolated: multiple issues around charging and availability emerged in under 24 hours.
- **Windows support gaps** — Path handling, cmdlet permissions, and MSIX/ripgrep extraction failures consistently appear. Windows users face a fragmented experience with little documentation.
- **Session stalls and silent hangs** — Both TUI (#32149) and New Workspace (#36731) can hang indefinitely with no response, forcing restarts and losing context. This is the highest-impact reliability bug in the tracker.
- **The 410 Gone endpoint retirement** — External CLI consumers and the newer 2.0 beta handle the legacy endpoint retirement inconsistently, leaving users confused about which endpoint to use and unable to migrate cleanly.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-08-18

## Today's Highlights

Qwen Code v0.21.13 is the current release reference, with four consecutive end-to-end SWE-bench Verified + Terminal-Bench 2.0 smoke runs completing successfully after a resilient Sandbox command-stream deployment. The Web Shell composer now supports drag-and-drop and paste of text files as named attachments, and users can fork conversations from any assistant response. The review automation pipeline continues to mature, with a wave of PRs addressing incremental review anchoring, growth-budget edge cases, and ephemeral-container verification.

## Releases

**v0.21.13** — No user-facing release notes beyond the version bump. The release is pinned as the benchmark reference for the DSW EAS smoke and full validation runs. Four smoke runs (r1–r4) and three full SWE-bench Verified (500 tasks) + Terminal-Bench 2.0 (89 tasks) validation runs completed against this version, with r3 of the full run targeting a wheelhouse bootstrap-parent fix. The first smoke run was quarantined (0/1 completed); subsequent runs passed.

## Hot Issues

1. **[#9061 — Ctrl+V paste unresponsive in CLI on Windows (regression since 0.21.x)](https://github.com/QwenLM/qwen-code/issues/9061)** — P1 bug. Paste stopped working between 0.21.0 and 0.21.11 on Windows. Downgrading to 0.21.0 restores functionality. High impact for Windows users; 6 comments.

2. **[#9324 — Messages delivered in multiple copies without user redirection](https://github.com/QwenLM/qwen-code/issues/9324)** — P3 core bug. Qwen Desktop Code (Qwen 3.8 Max) intermittently receives the same message multiple times, interrupting the agent's focus mid-task. The model itself flagged the anomaly. 7 comments, awaiting more information.

3. **[#9296 — Qwen Autofix: review-event storms and duplicate address dispatch waste runner capacity](https://github.com/QwenLM/qwen-code/issues/9296)** — P1 CI efficiency bug. ~500 autofix runs in 3 hours with 59% cancelled. Reviews on closed/merged PRs still start autofix runs (P0 sub-issue). Directly impacts CI cost and velocity.

4. **[#8316 — Prompt not restored to input box when canceling (Ctrl+C)](https://github.com/QwenLM/qwen-code/issues/8316)** — UX regression. Cancelled prompts disappear entirely, forcing users to retype. Opened two weeks ago, still needs triage; 9 comments indicate broad interest.

5. **[#9320 — Lost context after /compress-fast and /rewind](https://github.com/QwenLM/qwen-code/issues/9320)** — P2 session-management bug. After compressing a 102k-token context to 87k and resuming via a new llama-server, context appears lost. Complements the related compression-correctness issue #9309.

6. **[#6806 — Status line context usage % does not refresh after /compress or /compress-fast](https://github.com/QwenLM/qwen-code/issues/6806)** — P2 UI bug. The footer percentage stays stale until the next model request. Long-running issue (since July 13) with a `welcome-pr` label, suggesting contributor interest is welcome.

7. **[#8051 — Bound multi-workspace daemon resource usage (tracking)](https://github.com/QwenLM/qwen-code/issues/8051)** — P2 feature for `qwen serve`. Count-only limits don't bound bytes held by request bodies, WebSocket assemblies, and other memory. Split into reviewable PRs via #8091. Critical for production deployments.

8. **[#9300 — VP mode: content not bottom-aligned, blank space above composer](https://github.com/QwenLM/qwen-code/issues/9300)** — P2 UI regression in terminal-buffer mode. Cosmetic annoyance that affects daily workflow. Opened same-day, 6 comments.

9. **[#9250 — `qwen serve` hard-codes new-file mode 0600, ignores umask](https://github.com/QwenLM/qwen-code/issues/9250)** — P3 daemon configuration gap. File-write tools (`write_file`, `edit`, `notebook_edit`) create new files with mode 0600 unconditionally—no configuration escape hatch. Multi-user and shared-daemon setups are affected.

10. **[#9307 — Weixin channel: 64-bit message IDs rounded beyond MAX_SAFE_INTEGER](https://github.com/QwenLM/qwen-code/issues/9307)** — P1 integration bug. `Response.json()` parses `message_id` as `number`, silently rounding values above `Number.MAX_SAFE_INTEGER` before string conversion. Related Weixin issues: #9353 (typing indicator expires on long turns) and #9352 (file sending support).

## Key PR Progress

1. **[#9180 — Web Shell composer: drag/drop/paste text files as named attachments](https://github.com/QwenLM/qwen-code/pull/9180)** — Merged. Text files now behave like image attachments with drag-drop and paste support.

2. **[#8978 — `qwen serve --channel all` no-op on empty channel set](https://github.com/QwenLM/qwen-code/pull/8978)** — Prevents daemon crash (`exit(1)`) when no channels are configured; treats it as a graceful no-op and restores only active channels.

3. **[#9214 — Autofix verification gate runs in an ephemeral container](https://github.com/QwenLM/qwen-code/pull/9214)** — Phase 1+2 of the #9089 design. Moves verification off the host, pins the trust boundary with a structural test. Security-hardening milestone.

4. **[#9303 — Bound daemon transcript retention to stop renderer OOM crashes](https://github.com/QwenLM/qwen-code/pull/9303)** — Addresses web-shell OOM by releasing the raw replay snapshot immediately after injection and applying the same block cap to replay rebuilds as live growth.

5. **[#9190 / #9191 — Content-anchored incremental review for local loop and rebase transfer](https://github.com/QwenLM/qwen-code/pull/9190)** — Two-part feature: per-file content verdicts (not commit SHAs) survive rebases, and the local review-fix loop reuses prior model verdicts instead of re-reviewing the whole dirty tree. Significant token-cost reduction.

6. **[#9267 — Incremental review scope built from PR diff, not a containment check](https://github.com/QwenLM/qwen-code/pull/9267)** — Replaces the post-hoc containment oracle in `fetch-pr` with a narrowing step that captures the scope directly from `base..head`, removing the failure mode where anchor-captured hunks don't match the PR diff.

7. **[#9184 — Gate recovered incremental anchor on the certifying model](https://github.com/QwenLM/qwen-code/pull/9184)** — "Clean up to this commit" is a same-model contract. Under a different model, a full second opinion is forced instead of trusting a stale anchor.

8. **[#9226 — Aone Code read path (second review-platform provider)](https://github.com/QwenLM/qwen-code/pull/9226)** — Detects GitLab Alibaba-inc remotes and enables the existing `/review` read subcommands (`meta`, `is...`) for Aone Code. Extends the platform seam from #9096.

9. **[#9130 — Deterministic flakiness gate for sandboxed verification](https://github.com/QwenLM/qwen-code/pull/9130)** — Re-runs changed unit-test files N times (default 5, clamp 2–10) after clean install/build to catch flaky tests deterministically in CI.

10. **[#9367 — Global expand/collapse for exported HTML viewer](https://github.com/QwenLM/qwen-code/pull/9367)** — Adds an optional toolbar to the `ChatViewer` component; direct response to long-standing `/export` HTML usability requests (#8208).

## Feature Request Trends

- **Cross-host chat transcript portability** — Users want consistent export/import and rendering across Web Shell, VS Code, Tauri Desktop, and HTML (e.g., #9354, #8208, #5883). The Web Shell consolidation proposal (#5883) and export-data roadmap label are converging on a shared transcript contract.
- **Dynamic model list fetching from provider APIs** — The ModelStudio Token/Coding Plan presets hardcode recommended models; users request dynamic fetch-on-open (#9368). Related to broader model-switching friction (#7433).
- **Scheduled tasks on existing sessions** — Reusing a session with `/scheduled-tasks` instead of always creating dedicated ones (#8906). Points to a broader "background automation" roadmap.
- **Channel integration breadth** — Weixin file sending (#9352), typing-indicator heartbeat (#9353), and 64-bit ID safety (#9307) show real production usage of the Weixin channel and demand for feature parity with other channels.
- **Daemon resource governance** — Bounded memory/bytes, not just count limits, for multi-workspace `qwen serve` (#8051, #8091). The daemon roadmap is actively tracking this.

## Developer Pain Points

- **Compression/context management reliability** — Multiple open issues around `/compress`, `/compress-fast`, `/rewind`, and stale context-usage percentages (#6806, #9309, #9320). Token accounting is evidently non-trivial and errors are user-visible and frustrating.
- **Windows CLI regressions** — Ctrl+V paste broken since 0.21.x (#9061) and duplicate/incomplete message delivery (#9324) are the two highest-signal Windows complaints this cycle. The Windows/macOS CI lanes losing their trigger (#9370) was a process gap now being addressed.
- **Review/autofix automation noise** — The sheer number of wenshao-authored review-infrastructure PRs (10+ this cycle) and the autofix storm issue (#9296) signal that the community is investing heavily in CI efficiency, but also that the automation itself is a source of churn (59% cancelled runs).
- **Session resumption with local/third-party models** — ACP sessions report `coder-model(qwen-oauth)` even when a local llama.cpp model is used (#7433), and resuming compressed contexts with a new model server loses data (#9320). Interop with external model runtimes remains fragile.
- **Copy/paste and text-selection regressions in custom TUI** — The new interactive layer broke text-field copying on Ubuntu (since ~v0.19) per #9315, and the Windows Ctrl+V regression (#9061) suggests the custom TUI input handling needs more cross-platform testing.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar).*