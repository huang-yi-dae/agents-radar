# AI CLI Tools Community Digest 2026-08-08

> Generated: 2026-08-08 01:18 UTC | Tools covered: 7

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

# Cross-Tool AI CLI Comparison Report — 2026-08-08

## 1. Ecosystem Overview

The AI CLI developer tools landscape is in a phase of rapid feature expansion coupled with reliability pressures. Claude Code leads in community engagement and enterprise feature delivery (self-hosted runners, spend limits), while OpenAI Codex ships the most frequent releases (3 alphas in 24 hours) with a focus on plugin portability and MCP lifecycle hardening. Gemini CLI operates a disciplined nightly pipeline with active security work (SSRF fix), and GitHub Copilot CLI iterates quickly on enterprise policy compliance. Smaller tools like Kimi Code CLI and Qwen Code show focused communities surfacing critical safety and terminal-compatibility bugs respectively. Across all tools, interoperability standards (AGENTS.md), session continuity, Windows stability, and MCP reliability are the dominant cross-cutting concerns.

## 2. Activity Comparison

| Tool | Hot Issues (24h) | PRs/Releases (24h) | Release Status |
|---|---|---|---|
| Claude Code | 10 open (top: 4,526👍) | 3 PRs; 2 releases | v2.1.225 (stable) |
| OpenAI Codex | 10 open (top: 82 comments) | 10 PRs; 1 stable + 3 alphas | v0.147.0 → v0.148.0-alpha.4 |
| Gemini CLI | 10 open (3 P1 active) | 10 PRs; 4 releases (nightly chain) | v0.56.0-nightly.20260808 |
| GitHub Copilot CLI | 10 open (3 regressions flagged) | 3 releases; 0 PRs | v1.0.79-9 (stable) |
| Kimi Code CLI | 3 open (1 critical safety) | 2 PRs; 0 releases | No new release |
| OpenCode | 10 open (top: 45 comments) | 10 PRs; 1 release | v1.18.15 (stable) |
| Qwen Code | 10 open (1 P1 closed) | 10 PRs; 2 nightlies | v0.21.7-nightly.20260808 |

## 3. Shared Feature Directions

- **Standardized agent configuration files (AGENTS.md)** — Claude Code (#6235, 4,526👍) leads the demand for a cross-tool config format; the community explicitly references Codex, Amp, and Cursor adoption as the model to follow.
- **Session continuity and resume** — Claude Code (#13354, 191👍) wants to continue past session limits; Codex (#34663) requests bootstrapped resume instead of full-thread replay; Copilot CLI (#4397) reports model selection lost on resume.
- **Persistent memory across sessions** — Kimi CLI (#1283, 21 comments) requests dual-layer automatic/manual memory; Gemini CLI has an Auto Memory system struggling with low-signal session retries (#26522); Codex ships organized conversations as v0.147.0's headline feature.
- **MCP lifecycle reliability** — Codex (#12491, 1300+ zombie processes) and Copilot CLI (#4392, orphaned stdio processes) both ship leaks; Gemini CLI adds MCP event subscriptions (#37494); Qwen Code fixes SSE hangs (#8550).
- **Plugin ecosystem maturity** — Codex ships portable Agent Plugins; Claude Code adds `archive` plugin source; Copilot CLI adds plugin extensions directory; all three signal plugins as core distribution units.
- **Windows parity** — Every tool has open Windows-specific bugs: Claude Code (ECONNRESET #84072), Codex (elevated sandbox #10090, Computer Use #37043), Copilot CLI (clipboard #3622, codepage clears #4391), OpenCode (paste #6560), Qwen Code (IME #8625, EISDIR desktop crash #8615).
- **Unattended/autonomous mode safety** — Kimi CLI's `rm -rf` incident (#2596) and Claude Code's background-agent permission stalls (#78487) both highlight autonomous-mode guardrail gaps.

## 4. Differentiation Analysis

| Tool | Primary Focus | Target User | Technical Approach |
|---|---|---|---|
| **Claude Code** | Enterprise sessions, gateway controls, self-hosted runners | Large orgs with infra control | Plugins, hooks, gateway mediation |
| **OpenAI Codex** | Plugin portability, code-mode protocol, ACP parity | Developers integrating agents into workflows | Rust core, gRPC protocols, sandbox modes |
| **Gemini CLI** | Agent orchestration, custom skills, evals rigor | Teams needing structured agent hierarchy | Subagents/skills, nightly CI with dedicated eval harness |
| **GitHub Copilot CLI** | Enterprise policy compliance, sandbox control | GitHub-centric orgs | Tight VS Code/GitHub integration; rapid patch cadence |
| **Kimi Code CLI** | Lightweight; memory system demand | Individual CLI users | Minimal toolchain; lean release cadence |
| **OpenCode** | Go service billing, provider routing, TUI UX | Users of hosted/aggregated models | Server-relay architecture; multi-backend search |
| **Qwen Code** | Daemon-based remote control, Web Shell, browser control | Developers wanting multi-surface access | WebBridge, tmux subagents, ACP alignment |

Claude Code differentiates on enterprise controls (self-hosted runners, gateway spend limits); Codex on protocol/API foundations (code-mode gRPC, sandbox metadata); Gemini on structured evals and security fixes; Copilot on enterprise policy granularity; OpenCode on hosted-service economics; Qwen on daemon-centric multi-surface control.

## 5. Community Momentum & Maturity

- **Claude Code** has the most engaged community (4,526👍 on a single issue) and highest issue granularity, showing mature usage patterns and sophisticated debugging. Enterprise features land steadily.
- **OpenAI Codex** is iterating fastest (10 PRs + 3 alphas/day) with infrastructure hardening (process reaping, log hygiene, retry logic) — signs of a platform being stabilized after a major feature push. Community is vocal but smaller than Claude Code's.
- **Gemini CLI** runs the most disciplined release pipeline (4 releases/day nightly chain). Two long-standing P1s (subagent false success #22323, generalist hang #21409) persist, indicating stabilization debt despite strong process.
- **Copilot CLI** ships regular patches but zero PRs in 24h; regressions cluster around Windows and auth. Community size is moderate; the focus on enterprise policy suggests a managed-VS-community product split.
- **Kimi CLI** has the smallest community but the most severe issue (data loss). Responsiveness will determine trust.
- **OpenCode** shows balanced activity: active issue triage, merged PRs, and a lively paid-service community. Billing/provider identity mishaps dominate noise.
- **Qwen Code** is steady with nightly releases and 10 PRs/day, focused on terminal compatibility and daemon/Web Shell expansion. Community skews to remote/SSH workflows.

## 6. Trend Signals

- **AGENTS.md is becoming the cross-tool standard**: The single strongest signal. Communities reject vendor-specific config files; expect consolidation around a shared format across all major CLIs within two quarters.
- **Session continuity is the next UX battleground**: Users treat context loss as data loss. Tools that solve seamless resume (bootstrapped, cheap, model-preserving) will win long-session and CI workloads.
- **Autonomous-mode safety is a trust ceiling**: The Kimi `rm -rf` incident and Claude Code's permission-stall issue both show that unattended agents need deterministic guardrails (timeouts, confirmation checkpoints, destructive-command blocks). Expect safety defaults to become a differentiator.
- **MCP lifecycle hygiene is table stakes**: Zombie processes, orphaned children, and SSE hangs are widespread. Tools that implement proper subprocess lifecycle management (Codex PR #37498, #12491 fix) will set the bar for platform reliability.
- **Windows is systematically underserved**: Every tool has Windows-specific bugs — sandboxing, terminal rendering, IME input, clipboard, process spawning. The vendor that treats Windows as a first-class platform (not an afterthought) has a clear competitive opening.
- **Model routing and billing transparency are trust issues**: OpenCode's DeepSeek V4 serving V3.x and Copilot CLI's version-pinning gaps show that model identity and spend accounting directly impact user trust. Expect pressure for model-version attestation in APIs.
- **Daemon-centric architecture is emerging**: Qwen Code's WebBridge, Web Shell, and tmux subagents — alongside Claude Code's self-hosted runners — signal a shift from single-terminal tools to daemon-hub multi-surface control (browser, phone, IDE, web).

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

## Claude Code Skills Community Highlights Report (2026-08-08)

---

### 1. Top Skills Ranking

**1. skill-creator `run_eval.py` fixes (PR #1298, #1099, #1050, #1323, #1261, Issue #556, #1169)**  
The most-discussed cluster. Multiple PRs target the same bug: `run_eval.py` reports `recall=0%` for every skill description, breaking the description-optimization loop. Root causes span Windows subprocess/pipe handling (`[WinError 10038]`), trigger-detection logic missing real skill names, and eval command files being written into the user's live project `.claude/commands/`. Status: all open.  
Link: [PR #1298](https://github.com/anthropics/skills/pull/1298) · [Issue #556](https://github.com/anthropics/skills/issues/556)

**2. document-typography (PR #514)**  
Typographic quality control for AI-generated documents: orphan word wrap, widow paragraphs, and numbering misalignment. Addresses a universal pain point in Claude-generated output. Status: open.  
Link: [PR #514](https://github.com/anthropics/skills/pull/514)

**3. ODT skill (PR #486)**  
OpenDocument Format (.odt/.ods) creation, template filling, and ODT-to-HTML conversion. Triggered on "LibreOffice," "OpenDocument," ISO-standard document requests. Complements the existing docx/pdf skills. Status: open.  
Link: [PR #486](https://github.com/anthropics/skills/pull/486)

**4. self-audit skill (PR #1367)**  
Mechanical file verification plus a four-dimension reasoning audit in damage-severity priority order. Universal across projects and models; author also proposed a follow-up three-gate pipeline (Issue #1385). Status: open.  
Link: [PR #1367](https://github.com/anthropics/skills/pull/1367)

**5. testing-patterns skill (PR #723)**  
Comprehensive testing coverage: Testing Trophy philosophy, AAA unit test patterns, React component testing with Testing Library, and what NOT to test. Status: open.  
Link: [PR #723](https://github.com/anthropics/skills/pull/723)

**6. color-expert skill (PR #1302)**  
Self-contained color expertise: naming systems (ISCC-NBS, Munsell, RAL, XKCD), color spaces with a "what to use when" table (OKLCH for scales, CAM16 for perception). Status: open.  
Link: [PR #1302](https://github.com/anthropics/skills/pull/1302)

**7. pyxel retro-game skill (PR #525)**  
Workflow skill for the Pyxel retro game engine via `pyxel-mcp`: write → run_and_capture → inspect → iterate. Status: open (updated 2026-07-15).  
Link: [PR #525](https://github.com/anthropics/skills/pull/525)

---

### 2. Community Demand Trends

**Security and trust boundary enforcement** — Most-commented issue (#492, 43 comments): community skills distributed under the `anthropic/` namespace create trust-boundary abuse; users may grant elevated permissions to unofficial skills. Relatedly, #1175 raises security/context-window concerns for SharePoint Online document handling.

**Reliable skill evaluation tooling** — Issues #556 and #1169 document that the skill-creator evaluation loop is fundamentally broken (0% recall on all queries); this blocks community skill quality optimization and is the single largest reported defect.

**Office document format coverage** — Demand is high for formal document format interoperability: ODT, typographic quality in generated docs, and repeated OOXML/docx fixes (w:id collisions, whitespace reformatting, case-sensitive file references).

**Context-window efficiency** — Issue #1487 flags a bundled `claude-api` skill injecting ~156k tokens in a single call; #202 criticizes skill-creator for token-inefficient prose. The community is actively demanding compact, operational skill design.

**Org-wide sharing and lifecycle management** — #228 asks for org-level skill sharing (16 comments); #1479 proposes plan-file-hygiene for managing accumulated planning artifacts.

---

### 3. High-Potential Pending Skills

These PRs are open with active discussion and address clearly articulated needs:

- **[PR #1367 — self-audit](https://github.com/anthropics/skills/pull/1367)** — Mechanical verification + reasoning quality gate; author drove a related proposal Issue #1385 with follow-up comments. Strong signal of ongoing investment.
- **[PR #1479 — plan-file-hygiene](https://github.com/anthropics/skills/pull/1479)** — Addresses lifecycle gap for planning artifacts, named problem from Issue #1417 with attribution to multiple community members' framing. Likely to converge.
- **[PR #514 — document-typography](https://github.com/anthropics/skills/pull/514)** — Low-risk, universally applicable quality fix for generated documents; no controversy.
- **[PR #723 — testing-patterns](https://github.com/anthropics/skills/pull/723)** — Broad developer demand; fills a clear gap in the collection's testing coverage.
- **[PR #486 — ODT skill](https://github.com/anthropics/skills/pull/486)** — Complements existing document formats with no overlap; steady progress.

---

### 4. Skills Ecosystem Insight

The community's most concentrated demand is for **trustworthy, verifiable skill tooling** — specifically fixing the broken skill-creator evaluation loop (reported across 5+ PRs and 2 issues) while simultaneously addressing **trust-boundary security** (namespace impersonation, context-window exhaustion) as the ecosystem scales beyond first-party skills.

---

## Claude Code Community Digest — 2026-08-08

### Today's Highlights

Two releases landed in the last 24 hours: v2.1.224 introduces self-hosted runner capabilities (enabling web, mobile, and desktop sessions to run on your own infrastructure), and v2.1.225 adds gateway spend-limit support with clearer messaging. The AGENTS.md standardization request (#6235) continues to dominate community discussion with 4,526 upvotes and 347 comments, indicating strong demand for cross-tool configuration compatibility.

### Releases

**v2.1.225** — Added gateway spend-limit support; the limit-reached message now names the cap, reset time, and operator's message (requires gateway 2.1.225).

**v2.1.224** — Introduced self-hosted environments: `claude self-hosted-runner` turns your own machines or containers into execution targets for Claude Code web, mobile, and desktop sessions (Team and Enterprise plans). Also added `archive` plugin source for installing plugins from HTTPS-hosted zips without git.

---

### Hot Issues

1. **[Feature Request: Support AGENTS.md](https://github.com/anthropics/claude-code/issues/6235)** — 4,526 👍, 347 comments — The most-discussed issue by far. The community increasingly wants a standardized `AGENTS.md` format (championed by Codex, Amp, Cursor) rather than Claude-specific `CLAUDE.md`. This is a strategic interoperability question.

2. **[Continue when the session limit reached](https://github.com/anthropics/claude-code/issues/13354)** — 191 👍, 73 comments — Users want a seamless way to continue work after hitting session limits instead of losing context mid-task. High practical impact for long-running sessions.

3. **[Fable 5: text in a response that also contains tool calls is never displayed](https://github.com/anthropics/claude-code/issues/81853)** — Reported for `claude-fable-5` model: mixed text+tool-call responses render only the tool call. Text is visible via transcript but not in normal view. Serious usability regression affecting the newest model.

4. **[Stale environments cannot be deleted and ghost sessions cause permanent 404 errors](https://github.com/anthropics/claude-code/issues/77372)** — Remote Control environments become permanently broken after stale sessions; even fresh environments exhibit 404s on subsequent launches. This impacts the reliability of the remote session feature.

5. **[Prompt suggestions silently suppressed by rate-limit gate](https://github.com/anthropics/claude-code/issues/72495)** — A strict-equality gate in the binary suppresses prompt suggestions whenever client-derived rate-limit status is `allowed_warning`. The reporter located the gate, captured the suppression live, and confirmed behavior with a predicted recovery time.

6. **[Claude Code ≥ 2.1.205 livelocks at 100% CPU on KVM guests with kvm64 CPU](https://github.com/anthropics/claude-code/issues/77208)** — Regression breaks the Linux desktop beta entirely (even `--version` hangs) on generic CPU models. Blocks a whole class of VM environments.

7. **[ECONNRESET on Windows during API stream after first chunk](https://github.com/anthropics/claude-code/issues/84072)** — Streaming responses consistently fail after the first chunk on Windows 10/11 across both the VS Code extension and terminal. Reproduced on v2.1.222; affects both CLI and extension workflows.

8. **[Background Bash tasks killed mid-run silently](https://github.com/anthropics/claude-code/issues/84625)** — `run_in_background: true` tasks die without OOM, user action, or error surface; observed ~10 times. `setsid`-detached processes appear immune, hinting at process-group cleanup logic.

9. **[Background-spawned agents block indefinitely on unanswered permission prompts](https://github.com/anthropics/claude-code/issues/78487)** — Workflow-spawned agents stall 55+ minutes waiting on permission prompts with no auto-deny or timeout. Critical for unattended CI/automation usage.

10. **[Bash grep shim catastrophic backtracking — OOM kill on 20 KB file](https://github.com/anthropics/claude-code/issues/82179)** — The embedded ugrep emulation hits exponential backtracking with `-o` + bounded quantifiers around alternations; 6.6 GB RSS on a tiny input. Memory-safety concern in a core tool.

---

### Key PR Progress

1. **[docs: fix stale hooks documentation link](https://github.com/anthropics/claude-code/pull/84854)** — Updates the example hook script to use the current `code.claude.com/docs` URL, aligning with 46 other occurrences across the repo.

2. **[fix(hookify): enforce proper rule evaluation scope and secure file read](https://github.com/anthropics/claude-code/pull/84747)** — Fixes a security issue where `load_rules()` bypassed the event filter when `event` is `None`, ensuring tools like `Read` and `Browser` only trigger `all`-scoped rules instead of event-specific ones.

3. **[fix(security): address yaml injection and symlink credential overwrites in plugin scripts](https://github.com/anthropics/claude-code/pull/84711)** — Resolves #76580 with defensive checks preventing YAML injection and symlink-based credential overwrite attacks in plugin installation.

---

### Feature Request Trends

- **AGENTS.md standardization** (#6235): The single highest-requested feature. The community strongly favors an open, cross-tool configuration format over Claude-Code-specific `CLAUDE.md`.
- **Session lifecycle improvements** (#13354): Continue past session limits; also rename sessions after creation (#51791).
- **Plugin granularity** (#14920): Allow disabling individual plugin skills rather than all-or-nothing.
- **Remote environment management** (#50884): Clean up stale/dead Remote Control environments from the environment list.
- **Clipboard image paste support** (#84961): Direct Ctrl+V/Cmd+V image input for CLI, VS Code extension, and JetBrains.
- **`/goal` limit increase** (#84953): Raise the 4,000-character condition limit or allow file references.
- **Security token page transparency** (#84949): Show device/session identifying info on the Authorization Tokens page.

---

### Developer Pain Points

- **Interoperability friction**: The AGENTS.md demand signals frustration with vendor-specific configuration that doesn't translate across tools.
- **Windows reliability**: Recurring issues with file-lock on relaunch (#84962, #76192), ECONNRESET on streams (#84072), and desktop crashes on Intel GPUs (#83028).
- **Unattended execution is unreliable**: Permission prompts with no timeout (#78487), silent background task kills (#84625), connectors not attaching until first inbound message (#83694).
- **Session termination costs**: Losing context at session limits with no continuation path (#13354) is a top practical pain.
- **Documentation gaps**: Undocumented automatic dependency installs during plugin setup (#84939) and stale documentation links create avoidable confusion.
- **Model-specific regressions**: Fable 5 rendering issues (#81853) and reports of model ineffectiveness (#79247) suggest quality and consistency concerns with newer models.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-08-08

## Today's Highlights

Codex v0.147.0 introduces portable Agent Plugins and persistent conversation organization, marking a significant step toward a more modular and navigable agent ecosystem. The release cadence is accelerating with three alpha builds of v0.148.0 already shipping, while the community remains actively engaged on long-standing issues around conversation context handling, Windows sandbox reliability, and MCP compatibility. A wave of internal infrastructure PRs focused on skills management, code-mode protocol, and diagnostics signals that the team is hardening the platform after the feature push.

## Releases

**rust-v0.147.0** — Stable release with two headline features:
- **Portable Agent Plugins** — Install agents from local, personal, workspace, and remote plugin catalogs, unifying the plugin discovery experience.
- **Organized Conversations** — Persistent, manually ordered sections for transcripts, plus incremental browsing of long conversations.

**rust-v0.148.0-alpha.1 / alpha.2 / alpha.4** — Three alpha builds shipped within 24 hours, indicating active stabilization and iteration on the next minor release.

GitHub: https://github.com/openai/codex/releases

## Hot Issues

1. **[#8648 — Codex replies to earlier messages instead of latest](https://github.com/openai/codex/issues/8648)** — 82 comments, 58 reactions. The most-discussed open bug. In multi-message conversations, Codex occasionally responds to stale context, breaking flow. Users report this occurs across models and subscriptions. High visibility suggests it affects a large user base.

2. **[#12491 — MCP child processes not reaped; 1300+ zombies, 37GB leak](https://github.com/openai/codex/issues/12491)** — Closed, 38 comments. A severe resource leak in the GUI wrapper where MCP subprocesses were never cleaned up, causing massive memory growth. Community relief at the fix, but concern about how it shipped in the first place.

3. **[#26234 — Flatten MCP namespace tools for non-OpenAI providers](https://github.com/openai/codex/issues/26234)** — 32 comments, 41 reactions. A blocking issue for local-model users (Ollama, LM Studio, OpenRouter, Bedrock). The proprietary `namespace` serialization makes MCP tools invisible to non-Responses-API models. This is a top compatibility ask.

4. **[#35481 — Codex Diff "Oops, an error has occurred" in VS Code](https://github.com/openai/codex/issues/35481)** — Closed, 26 comments, 54 reactions. A Windows-only regression in the VS Code extension's diff view, affecting review workflows. The 54 upvotes reflect widespread impact on Windows-based code review.

5. **[#10090 — elevated_windows_sandbox fails all commands with (no output)](https://github.com/openai/codex/issues/10090)** — 24 comments. `CreateProcessAsUserW failed: 5` makes the agent completely non-functional when elevated sandbox is enabled. Windows Business-tier users report elevated sandbox is effectively unusable.

6. **[#14599 — Allow trust_level = "trusted" for any projects](https://github.com/openai/codex/issues/14599)** — 16 comments, 57 reactions. A quality-of-life request to skip the recurring manual approval prompt. The high reaction count strongly indicates users find the trust prompt friction excessive.

7. **[#37043 — Windows Computer Use fails at EnumWindows with 0x80070003](https://github.com/openai/codex/issues/37043)** — 17 comments. Computer Use on Windows is broken at the window-enumeration layer, surviving restarts. A fresh issue from this week that's gathering momentum.

8. **[#37425 — v0.147.0 regression with LiteLLM provider streaming](https://github.com/openai/codex/issues/37425)** — 4 comments. A stable-release regression breaking streaming for LiteLLM users. Created yesterday, this is a classic "don't upgrade yet" signal for custom-provider adopters.

9. **[#36523 — macOS OOM crash from Claude Desktop import parsing 1.73 GB](https://github.com/openai/codex/issues/36523)** — P0 regression. The app crashes at launch when importing Claude Desktop history, parsing 1.73 GB of data and hitting V8 heap limits. Competitive migration path is broken on macOS.

10. **[#34663 — Resume renders full thread history instead of bootstrapping](https://github.com/openai/codex/issues/34663)** — 7 comments. Session resume replaying the entire transcript is a performance and cost issue on long threads. Users want bootstrapping to the latest turn.

## Key PR Progress

1. **[#37516 — Ignore reusable command approvals for cyber models](https://github.com/openai/codex/pull/37516)** — Tightens execution-policy filtering for cyber-specialized models, preserving global allow rules while exempting saved prefix rules. A security-sensitive policy refinement.

2. **[#37513 — Reuse parent compactions in Guardian review sessions](https://github.com/openai/codex/pull/37513)** — Guardian review sessions are restarted after parent history rewrites and seeded with the latest encrypted compaction, improving session continuity and cost efficiency.

3. **[#37511 — Enforce automatic review for managed models](https://github.com/openai/codex/pull/37511)** — Adds a managed `auto_review.required_on_models` configuration that forces on-request approvals for specified model slugs. Admins get stronger review enforcement.

4. **[#37510 — Define the code-mode host gRPC protocol](https://github.com/openai/codex/pull/37510)** — Introduces `codex.code_mode.v1` protobuf API for code-mode session management, with Rust bindings via `tonic`. A foundational API for the code-mode architecture.

5. **[#37507 — Include sandbox mode in response metadata](https://github.com/openai/codex/pull/37507)** — Adds the effective permission profile as `sandbox_mode` in turn metadata and reserves it client-side. Improves auditability and prevents client overrides.

6. **[#37504 — Disable Nagle's algorithm for code-mode WebSockets](https://github.com/openai/codex/pull/37504)** — Enables `TCP_NODELAY` on code-mode WebSocket connections to reduce latency. A pragmatic fix from network fundamentals.

7. **[#37498 — Preserve child waiters during process termination](https://github.com/openai/codex/pull/37498)** — Detaches the child waiter instead of aborting it during termination so exited PTY children are properly reaped. Directly addresses zombie-process concerns like Issue #12491.

8. **[#37497 — Limit payload traces in diagnostic logs](https://github.com/openai/codex/pull/37497)** — Downgrades high-volume transport/SSE/WebSocket payload logging to DEBUG in persistent sinks to keep the SQLite log DB and ring buffer healthy.

9. **[#37494 — Add MCP event discovery and subscriptions](https://github.com/openai/codex/pull/37494)** — Adds `list_events` and cancellable `events/stream` subscriptions to MCP resources. Unlocks real-time lifecycle notifications for plugins.

10. **[#37485 — Keep response streams alive through connection failures](https://github.com/openai/codex/pull/37485)** — Classifies HTTP connection failures separately and retries with exponential backoff (5–60s), showing a `Reconnecting...` status. Improves resilience for flaky networks.

## Feature Request Trends

- **Trust and approvals UX** — Users are pushing back against repetitive trust prompts. They want persistent per-project trust levels, fewer interruptions, and more granular control over which approval types are actually dangerous (Issue #14599, PR #37516).
- **Bring-your-own-model compatibility** — A persistent demand that Codex work seamlessly with local and third-party providers (Ollama, LM Studio, OpenRouter, LiteLLM). MCP tool serialization and transport stability are the weak points (Issue #26234, #37425).
- **Session and context management** — Users want faster resume, incremental history loading, and better conversation organization. This is now partially addressed in v0.147.0, but community asks for more: bootstrapped resume (Issue #34663) and correct latest-message targeting (Issue #8648).
- **Plugin ecosystem maturity** — Beyond basic plugin install, users are asking for declarative secrets/env configuration for plugin MCP servers (Issue #24401) and more robust plugin-side MCP lifecycle handling (Issue #12491).
- **Windows parity** — A recurring theme: Windows-specific bugs consistently surface across sandboxing, process spawning, and Computer Use. The gap between macOS and Windows experience remains the top platform complaint.

## Developer Pain Points

- **Windows sandbox is fragile** — The `elevated_windows_sandbox` and `apply_patch` failures (`CreateProcessAsUserW failed: 5`, WindowsApps ACL issues) continue to top the charts. Multiple issues (#10090, #13965, #14211, #37415) with overlapping root causes. The Windows experience is significantly behind on feature parity and stability.
- **Regression discipline is inconsistent** — v0.147.0 shipped a streaming regression for LiteLLM users (Issue #37425) while the platform is actively changing. Mixed confidence in the upgrade path.
- **Zombie processes and CPU/GPU leaks** — Beyond MCP (Issue #12491), subprocess lifecycle bugs leave orphaned processes and accumulated memory across repeated runs. This is a platform-level concern, not just a GUI bug.
- **Computer Use on both macOS and Windows is inconsistent** — Missing helpers on Intel macOS, `EnumWindows` failures, and spawn EPERM issues on Windows mean the flagship agent feature behaves differently (or not at all) across supported hardware.
- **Context handling and accuracy** — Codex occasionally responding to earlier messages than the latest one (Issue #8648) is the kind of trust-eroding bug that makes users re-read every agent action, undermining the core value of the tool.

GitHub: https://github.com/openai/codex/issues

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-08-08

## Today's Highlights
The nightly release pipeline continues with v0.56.0-nightly.20260808, featuring a significant fix reclassifying capacity exhaustion as a terminal error to improve error handling. Two long-standing P1 bugs remain active: subagent recovery after MAX_TURNS falsely reporting GOAL success (#22323) and the generalist agent hanging indefinitely (#21409). Security work is advancing with a critical SSRF fix in the web-fetch tool (PR #28725).

## Releases
- **v0.56.0-nightly.20260808.gcf22ac7e8**: Reclassifies capacity exhaustion as terminal error (PR #28716), updates Firestore schema with error and pr_number fields (PR #28467).
- **v0.56.0-nightly.20260807.gd5c9a97dc**: Includes changelog for v0.55.0-preview.1 and version bumps.
- **v0.55.0-preview.2**: Cherry-pick fix for the preview.1 branch.
- **v0.54.4**: Cherry-pick patch to the v0.54.0 release branch.

## Hot Issues
1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) — Subagent recovery after MAX_TURNS reported as GOAL success** (P1, 12 comments, 2👍): `codebase_investigator` subagent reports success even after hitting max turn limits without completing analysis. Misleading status reporting breaks trust in agent outcomes.
2. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409) — Generalist agent hangs forever** (P1, 8 comments, 8👍): Simple operations like folder creation hang indefinitely when deferred to the generalist agent. Users have waited up to an hour before cancelling. Workaround: instructing the model not to use subagents.
3. **[#24353](https://github.com/google-gemini/gemini-cli/issues/24353) — Robust component level evaluations** (P1, 7 comments): Epic tracking behavioral eval improvements across 76 test cases for 6 Gemini models. Critical for regression prevention.
4. **[#25166](https://github.com/google-gemini/gemini-cli/issues/25166) — Shell command execution stuck with "Waiting input"** (P1, 4 comments, 3👍): CLI hangs after simple shell commands complete, showing "Awaiting user input" indefinitely. Frequent and disruptive.
5. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983) — Browser subagent fails in Wayland** (P1, 4 comments, 1👍): Browser agent fails on Wayland sessions, limiting usability for Linux users with modern display servers.
6. **[#22186](https://github.com/google-gemini/gemini-cli/issues/22186) — get-shit-done output hook causes crash** (P1, 3 comments): Crashes when printing user summaries near completion, interrupting workflows at the finish line.
7. **[#22093](https://github.com/google-gemini/gemini-cli/issues/22093) — Subagents running without permission since v0.33.0** (P2, 3 comments): Subagents execute despite agents being disabled in all configurations, an unexpected behavior change raising permission concerns.
8. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) — Assess AST-aware file reads, search, and mapping** (P2, 7 comments, 1👍): Epic investigating whether AST-aware tools can reduce token noise and improve codebase navigation precision.
9. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968) — Gemini does not use skills and sub-agents enough** (P2, 6 comments): Anecdotal reports that custom skills and sub-agents are rarely utilized proactively, requiring explicit user instruction.
10. **[#26522](https://github.com/google-gemini/gemini-cli/issues/26522) — Auto Memory retries low-signal sessions indefinitely** (P2, 5 comments): Memory system wastes processing on low-value sessions, failing to mark them as processed when skipped.

## Key PR Progress
1. **[#28732](https://github.com/google-gemini/gemini-cli/pull/28732) — chore/release: bump version to 0.56.0-nightly.20260808**: Automated nightly version bump.
2. **[#28673](https://github.com/google-gemini/gemini-cli/pull/28673) — feat(core): add Gemini 3.6 Flash and 3.5 Flash-Lite model configurations**: Adds model definitions, capabilities (thinking, multimodalToolUse), aliases, and code execution support for new models.
3. **[#28730](https://github.com/google-gemini/gemini-cli/pull/28730) — fix(core,cli): resolve false model capacity exhaustion and fix core quota lookup mapping**: Fixes false error messaging, corrects quota lookup, and preserves "Keep trying" UI option during capacity surges.
4. **[#28597](https://github.com/google-gemini/gemini-cli/pull/28597) — fix(cli): load environment variables before resolving settings placeholders**: Resolves a load-order race condition where `.env` variables were not available during settings expansion.
5. **[#28729](https://github.com/google-gemini/gemini-cli/pull/28729) — fix(core): resolve swallowed directory mismatch in IDE connections**: Fixes CLI failing to connect to IDE companion extension under Cider or VS Code forks with FUSE/virtual directory paths.
6. **[#28725](https://github.com/google-gemini/gemini-cli/pull/28725) — fix(security): prevent SSRF via DNS resolution bypass in web-fetch**: Critical security fix (CVSS 8.6) preventing malicious domains from reaching private/loopback IPs (e.g., `169.254.169.254`). Addresses issue #28555.
7. **[#28581](https://github.com/google-gemini/gemini-cli/pull/28581) — fix(cli): skip diff hunk markers during @ processing**: Prevents diff hunk markers being interpreted as `@file` references, eliminating recursive glob searches and heap growth on large diffs.
8. **[#28369](https://github.com/google-gemini/gemini-cli/pull/28369) — feat(evals): add local report command and developer documentation**: Adds `npm run eval:report` for aggregating pass rates by model from Vitest results, with duplicate test support.
9. **[#28344](https://github.com/google-gemini/gemini-cli/pull/28344) — Feat/eval validate**: Adds `eval:validate` static analysis command checking eval files against 9 rules, CI-gating capable with exit code 1 on violations.
10. **[#28730](https://github.com/google-gemini/gemini-cli/pull/28730) — fix(core,cli): resolve false model capacity exhaustion**: Also includes "Keep trying" option preservation during transient capacity surges, improving UX under load.

## Feature Request Trends
- **AST-aware tooling** (#22745, #22746): Read and navigate codebases using AST for precise method bounds and reduced token noise.
- **Robust component-level evals** (#24353): Expand behavioral test infrastructure across models and components.
- **Enhanced agent self-awareness** (#21432): CLI should understand its own flags, hotkeys, and mechanics to serve as its own expert guide.
- **Browser agent resilience** (#22232): Automatic session takeover and lock recovery for persistent browser profiles.
- **Subagent trajectory visibility** (#22598): Share subagent execution paths via `/chat share` for easier review and eval.
- **AST-aware CLI tools for codebase mapping** (#22746): Investigation into `tilth` or `glyph` as starting points for improving codebase_investigator.
- **Caretaker agent infrastructure** (multiple PRs): Pub/Sub workflows, eval frameworks, and Firestore schema updates for automated issue triage and PR tracking.

## Developer Pain Points
- **Misleading agent status reporting** (#22323): Subagent success reported on interruption hides real failures — wastes debugging time and erodes trust.
- **Hangs and stuck states**: Generalist agent hangs (#21409), shell command "Waiting input" stalls (#25166), and external editor corruption (#24935) disrupt long-running workflows.
- **Permission and scope concerns** (#22093): Subagents executing when disabled suggests config drift or bypass concerns; users want deterministic behavior.
- **Browser agent fragility**: Wayland failures (#21983) and ignored settings.json overrides (#22267) undermine browser automation reliability.
- **Memory system inefficiency and privacy** (#26522, #26523, #26525): Low-signal session retries waste compute; secrets sent to model context before redaction; invalid patches silently skipped — all need deterministic handling.
- **Tool explosion** (#24246): >128 tools trigger 400 errors; users expect smarter scoping of enabled tools.
- **Destructive command behavior** (#22672): Model occasionally uses `git reset` or `--force` when safer alternatives exist; needs guardrails.
- **Model not proactively using skills/subagents** (#21968): Custom skills require explicit instruction, undermining their utility for autonomous workflows.
- **Terminal performance issues** (#21924, #24935): Flicker on resize and corruption after editor exit degrade terminal UX.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**Date: 2026-08-08**

## Today's Highlights

The Copilot CLI team shipped three quick successive patches (v1.0.79-7 through v1.0.79-9) focused on enterprise policy compliance, a new model, and improved sandbox configuration UX. Meanwhile, the community continues to surface a steady stream of regressions, particularly around Windows terminal behavior (clipboard, rendering, crashes), authentication flows, and directory permission handling.

## Releases

Three patches landed in the last 24 hours:

- **[v1.0.79-9](https://github.com/github/copilot-cli/releases/tag/v1.0.79-9)**: The `/sandbox` configuration dialog now shows where sandbox settings are stored in `settings.json`.
- **[v1.0.79-8](https://github.com/github/copilot-cli/releases/tag/v1.0.79-8)**: Added support for enterprise `allow-auto-only` policy so `/allow-all auto` works while full allow-all remains blocked. Enterprise-managed sandbox policy can now enforce a proxy URL while credentials remain user-controlled. Improved the `/sandbox` dialog to group `git` and `gh` settings.
- **[v1.0.79-7](https://github.com/github/copilot-cli/releases/tag/v1.0.79-7)**: Agent Plugins can now ship extensions under a `com.github.copilot/extensions/` directory. Added support for the `kimi-k3` model. Combined `--plan` with `--mode autopilot` to plan first, then implement without waiting for approval. Improved multi-select prompt UX.

## Hot Issues

1. **[#2494 — copilot login auto-enters 'y/N' keychain prompt (11 comments, 📌 regression)](https://github.com/github/copilot-cli/issues/2494)** — Login no longer waits for user confirmation when the System Keychain is unavailable, causing auth flow to end prematurely. A long-standing issue still unresolved after four months.

2. **[#1632 — Support subfolders for skills (10 comments, 👍 23)](https://github.com/github/copilot-cli/issues/1632)** — The skills directory forces a flat structure, which becomes unmanageable for users with 10+ skills. Highly upvoted organizational request.

3. **[#3622 — Copy to clipboard silently fails on Windows (5 comments, 👍 4)](https://github.com/github/copilot-cli/issues/3622)** — Copying agent output appears successful but paste yields stale clipboard contents. Regressed after v1.0.48.

4. **[#4311 — Transcript renders as blank lines in interactive mode (3 comments)](https://github.com/github/copilot-cli/issues/4311)** — Bottom region blanks until a new message is submitted; `/resume` does not recover it. Likely a React measure/cache invalidation bug in ScrollBox.

5. **[#1409 — add-dir flag converts dashes to underscores in paths (2 comments, 👍 4)](https://github.com/github/copilot-cli/issues/1409)** — Causes infinite permission prompts for OneDrive directories on Windows.

6. **[#4391 — Copying text clears the screen on certain codepages (OPEN)](https://github.com/github/copilot-cli/issues/4391)** — On Windows codepage 936, selecting/copying text resets the screen. Codepage 437 works fine.

7. **[#4392 — Post-auth MCP client rebuild leaves orphaned stdio processes (OPEN)](https://github.com/github/copilot-cli/issues/4392)** — After GitHub auth completes, the MCP client is rebuilt from scratch, but the first generation of stdio child processes is never killed, leaking processes per startup.

8. **[#4401 — Regression: skill tool cannot find valid skills in ~/.agents/skills (OPEN)](https://github.com/github/copilot-cli/issues/4401)** — Previously closed issue #2230 appears incompletely fixed; valid `SKILL.md` directories are not discovered.

9. **[#4402 — npm bin/copilot is a loader, not a version pin (OPEN)](https://github.com/github/copilot-cli/issues/4402)** — The same npm shim path served v1.0.77 then v1.0.78 within 101 seconds; `--prefer-version` exists but is undocumented, making version pinning effectively impossible.

10. **[#4397 — Resume session switches back to default model (OPEN)](https://github.com/github/copilot-cli/issues/4397)** — Resuming a session ignores the previously selected model (e.g., `--model=gpt-5.6`) and reverts to the default.

## Key PR Progress

No pull requests were updated in the last 24 hours.

## Feature Request Trends

- **Model selection persistence** — Multiple reports that session resume (and even `/model`) fails to retain the user's chosen model, indicating both a bug and a desire for stronger model affinity.
- **Session management ergonomics** — Requests to restore quick-delete in the sessions view (#4395), persist a default workspace type (branch vs. worktree) for new sessions (#4396), and disable/remap "Ctrl+C twice to exit" (#4394).
- **Skill organization** — The flat skills directory structure is a growing pain point; subfolder support (#1632) remains the top-voted organizational feature.
- **Enterprise policy granularity** — The release notes for v1.0.79-8 show active work on enterprise-controlled sandbox and allow-all policies, signaling a focus on compliance-driven configuration.
- **Token usage reporting** — A desire to track token consumption per session persists (#2947), with meaningful upvotes (👍 7).

## Developer Pain Points

- **Windows terminal instability is a recurring theme** — Clipboard failures (#3622), screen clears on specific codepages (#4391), and native crashes on notifications (#4219) paint a picture of fragile Windows support.
- **Authentication flow regressions** — The auto-accept of the keychain prompt (#2494) and browser login URL wrapping/fallback issues (#4400) show auth UX remains brittle.
- **Process and resource leaks** — Orphaned MCP stdio processes (#4392) and `--add-dir` breaking Claude sub-agent dispatch with cache_control block limits (#4185) are operational hazards.
- **Directory permission mismatches** — Dash-to-underscore conversions (#1409) and `allowed_directories` in `permissions.config` never being loaded (#4398) cause frustrating permission loops and prompt fatigue.
- **Undocumented or surprising behavior** — The npm loader shim not pinning versions (#4402) and cross-tool `.claude/settings.local.json` hooks breaking on PowerShell (#4399) both create silent, hard-to-debug failures.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi CLI Community Digest — 2026-08-08

## Today's Highlights
Two open PRs (#2594, #2595) independently address a critical data-corruption bug in `StrReplaceFile` where non-UTF-8 bytes are silently replaced with U+FFFD, potentially damaging files outside the edit region. A concerning new issue (#2596) reports the agent executing `rm -rf` on a pre-existing directory outside the workspace in yolo mode, highlighting safety gaps in permission handling. The long-running memory system request (#1283) continues to gather attention, with 21 comments since February.

---

## Releases
No new releases in the last 24 hours.

---

## Hot Issues

1. **#2596 — Agent ran `rm -rf` on a pre-existing directory outside the workspace**  
   *Author: iMaxTomas | Updated: 2026-08-07 | [View Issue](https://github.com/MoonshotAI/kimi-cli/issues/2596)*  
   In yolo mode, the agent was asked to clean up a symlink but instead deleted a pre-existing real directory, destroying user session data. The agent failed to notice the symlink creation had failed earlier and proceeded destructively. This raises serious concerns about yolo-mode safety for filesystem operations. No comments yet — likely awaiting maintainer response.

2. **#1283 — Feature Request: Memory System — Persistent context across sessions**  
   *Author: CatKang | Created: 2026-02-27 | Updated: 2026-08-08 | [View Issue](https://github.com/MoonshotAI/kimi-cli/issues/1283)*  
   Requests a dual-layer memory system: automatic memory (AI-managed notes on project patterns) and manual memory (explicit user instructions). The 21 comments indicate substantial community interest and design discussion. This is the highest-traffic issue updated today.

3. **#2591 — (Referenced) StrReplaceFile corrupts invalid UTF-8 content** *(via PR #2595)*  
   The underlying bug being fixed: non-UTF-8 bytes anywhere in a file are replaced with U+FFFD when edits are applied, even when the bytes are far from the edit site.

---

## Key PR Progress

1. **#2594 — fix(tools): preserve non-UTF-8 bytes in StrReplaceFile edits**  
   *Author: 686f6c61 | Updated: 2026-08-07 | [View PR](https://github.com/MoonshotAI/kimi-cli/pull/2594)*  
   Changes the edit workflow to apply string operations on raw byte buffers, leaving invalid UTF-8 sequences outside the edit untouched. Direct fix for data integrity issues.

2. **#2595 — fix(StrReplaceFile): refuse to edit files that are not valid UTF-8**  
   *Author: shoemoney | Updated: 2026-08-07 | [View PR](https://github.com/MoonshotAI/kimi-cli/pull/2595)*  
   Alternative defensive approach: rejected by failing fast on invalid UTF-8 files rather than risk corruption. Explicitly resolves issue #2591.

**Note:** Both PRs tackle the same root cause with different strategies — one preserves bytes, the other refuses. Maintainers will need to decide which design philosophy fits the tool's contract.

---

## Feature Request Trends

- **Memory/Persistence**: The standout trend is demand for persistent context — the community wants the CLI to remember project patterns and preferences across sessions (issue #1283 remains the flagship request).
- **Safety & Guardrails**: In the aftermath of the `rm -rf` incident, expect increased demand for safer default behaviors, especially in yolo/autonomous modes.
- **Encoding Robustness**: The duplicate PRs on UTF-8 handling suggest users are hitting real-world file-encoding edge cases with mixed text/BLOB content.

---

## Developer Pain Points

- **Filesystem Safety in Autonomous Mode**: The #2596 incident is the most severe example — destructive operations on real user data outside the workspace with no apparent confirmation or safeguards.
- **Silent Data Corruption**: The U+FFFD bug implies files can be permanently damaged without the user (or agent) noticing, which is extremely damaging for trustworthy tools.
- **Context Loss Across Sessions**: Repeated requests for memory features indicate that users are losing time re-establishing context every session, a recurring friction point.
- **Failure Visibility**: The agent in #2596 didn't notice an earlier `ln -sfn` failure — a sign that command failures need better surfacing and checkpoint/correction before proceeding to destructive cleanup steps.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-08-08

## Today's Highlights
Release v1.18.15 lands with chronology fixes for imported/legacy message IDs and more reliable truncation cleanup. The community is heavily focused on **OpenCode Go service reliability**, with a 45-comment thread on upstream 401 blocks and multiple reports of model misidentification (DeepSeek V4 Flash serving V3.x). Several web app UX bugs were also filed and quickly addressed by maintainers.

## Releases
**v1.18.15** — Core bugfixes only:
- Chronological message ordering now correct even when imported or legacy message IDs are out of order
- Revert and fork actions use real message chronology instead of ID ordering
- Truncation cleanup removes stale files by file timestamp more reliably

## Hot Issues

1. **[#38257 — OpenCode Go: 401 Request blocked by upstream provider](https://github.com/anomalyco/opencode/issues/38257)** · 45 comments · 11 👍
   The most active thread this week. All models on OpenCode Go subscriptions return 401 on `chat/completions` while `/v1/models` works. Users report this as a server-side outage affecting all Go subscribers, with no workaround.

2. **[#5359 — Unable to read images for some models](https://github.com/anomalyco/opencode/issues/5359)** · 18 comments
   Regression from v1.0.134 onwards: pasted images fail to attach/read. Reproduced with LiteLLM + Vertex AI backend. Long-running issue still unresolved as of this digest.

3. **[#23153 — [FEATURE] Pay Go with crypto](https://github.com/anomalyco/opencode/issues/23153)** · 17 comments · 37 👍
   Highly upvoted feature request for crypto payment support on OpenCode Go. Strong community demand for alternative payment methods beyond fiat.

4. **[#14332 — Amazon Bedrock Opus 4.6 compaction failure](https://github.com/anomalyco/opencode/issues/14332)** · 16 comments · 8 👍
   Compaction crashes when `thinking`/`redacted_thinking` blocks are modified in the latest assistant message. Closed, but the error pattern indicates a known limitation in message rewriting.

5. **[#40409 — OpenCode Go `deepseek-v4-flash` serving wrong model](https://github.com/anomalyco/opencode/issues/40409)** · 14 comments
   Serious billing/quality mismatch: the `deepseek-v4-flash` model ID on Zen API serves DeepSeek V3.2 (cutoff 2025-05) instead of V4 Flash 0731. Closed — see related #40607 for the official DeepSeek API variant.

6. **[#6560 — Paste into PowerShell OpenCode instance not working](https://github.com/anomalyco/opencode/issues/6560)** · 13 comments
   Windows 11 paste regression (right-click and Ctrl+V both dead) inside OpenCode TUI while normal PowerShell paste works fine. Closed but represents a persistent Windows TUI usability gap.

7. **[#24334 — DeepSeek: `reasoning_content` in thinking mode must be passed back](https://github.com/anomalyco/opencode/issues/24334)** · 10 comments
   Provider-compat bug: DeepSeek requires echoing `reasoning_content` on follow-up turns, causing HTTP 400 otherwise. Closed, but highlights a class of provider-specific thinking-block edge cases.

8. **[#41146 — Overcharged on Go plan: weekly limit exhausted at ~$7.50 despite $30 limit](https://github.com/anomalyco/opencode/issues/41146)** · 2 comments
   Billing accuracy concern: weekly quota shows 100% used at roughly $7.50 spend against a stated $30 limit. Users blocked with no clear explanation.

9. **[#41165 — [2.0] relay sends assistant message with missing content key](https://github.com/anomalyco/opencode/issues/41165)** · 1 comment
   NEW: Long agentic sessions via `opencode/deepseek-v4-flash-free` relay fail with HTTP 400 (`content or tool_calls must be set`) on `next-16998`+. Points to a relay/serializer regression.

10. **[#41166 — Account balance shows $0 after successful payment](https://github.com/anomalyco/opencode/issues/41166)** · 1 comment
    Payment via Alipay confirmed by the provider but balance never credited. Marked `needs:compliance` — likely a stale-webhook or settlement bug.

## Key PR Progress

1. **[#41158 — fix(app): populate project picker from home](https://github.com/anomalyco/opencode/pull/41158)** — Fixes the "Nothing here yet" home screen and empty picker by falling back to server `/project` data until client-side bookmarks are available.

2. **[#41113 — feat(tui): render Mermaid diagrams](https://github.com/anomalyco/opencode/pull/41113)** — Vendored `@opencode-ai/merman` renders flowcharts/sequence/state diagrams directly in the transcript via a built-in TUI plugin. Merged.

3. **[#41170 — feat(console): add workspace unblock endpoint](https://github.com/anomalyco/opencode/pull/41170)** — Support API endpoint (authenticated via `SUPPORT_API_KEY`) to clear `workspace.is_blocked`; idempotent for repeated unblocks. Merged.

4. **[#41147 — fix(tui): show external worktree session labels](https://github.com/anomalyco/opencode/pull/41147)** — Restores session-directory labels for sessions outside the canonical project (e.g., sibling Git worktrees) after an earlier cleanup removed them in current-directory mode. Merged.

5. **[#41169 — fix(lsp): match wildcard root markers like `*.cabal`](https://github.com/anomalyco/opencode/pull/41169)** — `Filesystem.up` in `NearestRoot` now resolves glob-style root markers instead of literal `exists()` probes. Open; flagged `needs:compliance`.

6. **[#41167 — feat(opencode): let web users avoid browser launches](https://github.com/anomalyco/opencode/pull/41167)** — Adds `opencode web --no-open` for headless/CI usage. Open.

7. **[#41160 — feat(tool): add Synthetic web search backend](https://github.com/anomalyco/opencode/pull/41160)** — Third search backend (`"synthetic"`) alongside `exa` and `parallel`. Open.

8. **[#41161 — fix(session): extract tool-result media for models without attachment capability](https://github.com/anomalyco/opencode/pull/41161)** — `supportsMediaInToolResult` previously returned `true` unconditionally for `@ai-sdk/anthropic` / `@ai-sdk/openai`; now correctly gated. Open.

9. **[#41159 — fix(provider): propagate config-level npm override to inherited models](https://github.com/anomalyco/opencode/pull/41159)** — Fixes silent drop of config-level `npm` overrides (e.g., `provider.synthetic.npm`) for models inherited from a base provider. Open.

10. **[#41118 — feat(server): add modal environment driver](https://github.com/anomalyco/opencode/pull/41118)** — First hosted binding of the Environment contract: a Modal sandbox driver with a live-gated filesystem conformance run. Merged.

## Feature Request Trends

- **Payment flexibility**: Crypto payments ( #23153, 37 👍 ) and reliable top-up/balance synchronization ( #41166 ) are the loudest asks around OpenCode Go monetization.
- **Subagent orchestration**: Runtime model overrides for task subagents ( #17595 ) and native background subagents with auto-continue ( PR #40923 ) signal growing demand for multi-agent workflows under agent control.
- **Operational ergonomics**: `OPENCODE_DISABLE_INSTALL` to skip npm installs in CI/Docker ( #37888 ), `--no-open` for the web UI ( #41167 ), and subfolder support for skills ( #38853 ) — all aimed at smoother programmatic and large-scale usage.
- **Better session UX**: Queueing user messages during generation instead of canceling the in-flight turn ( #41106 ) and server-side project discovery in the web app ( #39655 / PR #41154).

## Developer Pain Points

- **OpenCode Go reliability**: The 401 upstream block ( #38257 ) plus billing-quota confusion ( #41146 ) makes the paid service feel like a black box; users are actively tracking status and asking for transparency.
- **Provider-model identity mismatches**: DeepSeek V4 Flash serving V3.x ( #40409 , #40607 ) and Kimi K2.5 routing issues ( #11541 ) erode trust in model routing and billing accuracy.
- **Windows/TUI regressions**: Paste failures ( #6560 ) and black screens when running from source ( #40231 ) recur across releases, hurting the Windows desktop experience.
- **Provider-compat breakage on thinking blocks**: DeepSeek `reasoning_content` requirements ( #24334 ) and Bedrock thinking-block compaction failures ( #14332 ) keep appearing as models adopt extended thinking modes.
- **Auth/provider state confusion**: GitHub Copilot re-auth prompts despite stored credentials ( #40183 ) and missing Copilot models after OAuth ( #41088 ) suggest persistent provider-state management issues.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-08-08

## Today's Highlights
Two nightly releases landed (v0.21.7-nightly.20260808 and .20260807) carrying CI fixes for autofix takeover. The community is pushing hard on Windows terminal input issues and TUI rendering regressions, while the WebBridge browser-control proposal and Web Shell feature work signal growing momentum around daemon-based remote control and richer UI surfaces.

## Releases
**v0.21.7-nightly.20260808.4ec0371e6** — CI fix surfacing blocked autofix takeover admission; documentation of serve sub-session concurrency.

**v0.21.7-nightly.20260807.fca8f3c1f** — Same CI fix for autofix takeover admission.

## Hot Issues

1. **[#8625 — Windows terminal IME text unreadable](https://github.com/QwenLM/qwen-code/issues/8625)** — P2 UI bug: Chinese input via Windows terminals renders as pinyin with unreadable display. 6 comments; users report daily-driver impact on Chinese-language workflows. Tagged welcome-pr.

2. **[#8660 — Runtime/client attribution for usage telemetry](https://github.com/QwenLM/qwen-code/issues/8660)** — Closed feature request (P3) proposing stable attribution for execution runtime and originating first-party client in usage payloads; follows up on the `properties.channel` distinction gap.

3. **[#8615 — Desktop 0.1.0 Windows crash: EISDIR lstat 'C:'](https://github.com/QwenLM/qwen-code/issues/8615)** — Closed P1: bundled runtime on Windows crashes at workspace open. Fixed; important because it blocked desktop adoption on Windows.

4. **[#8562 — tmux screen flicker in TUI (iTerm2 → SSH → Ubuntu)](https://github.com/QwenLM/qwen-code/issues/8562)** — Open P2: recent updates cause flicker confined to tmux panes. Community used Qwen 3.8 Max for debugging and self-identified it as a version regression.

5. **[#8659 — TUI flickering in web terminals (Alibaba Cloud Workbench)](https://github.com/QwenLM/qwen-code/issues/8659)** — Open P3: `useTerminalBuffer: true` default causes full-screen ANSI redraws that tear in xterm-based web terminals; welcome-pr.

6. **[#8550 — `qwen mcp list` hangs indefinitely on SSE servers](https://github.com/QwenLM/qwen-code/issues/8550)** — Closed P2: MCP list hangs when an SSE server never sends the legacy `endpoint`. Relevant to anyone using language-server MCP remoting.

7. **[#8672 — Middle-mouse copy/paste broken in PuTTY over SSH](https://github.com/QwenLM/qwen-code/issues/8672)** — Open P2 regression from 0.21.1: middle/right mouse buttons no longer behave xterm-style; actively being retested.

8. **[#8697 — OTEL_METRICS_EXPORTER=otlp silently kills metrics export](https://github.com/QwenLM/qwen-code/issues/8697)** — Open P2: presence of a standard OTel env var (common across Claude Code/Codex/opencode setups) breaks qwen-code telemetry startup; traces still flow, metrics vanish.

9. **[#8695 — Context usage displayed twice by default](https://github.com/QwenLM/qwen-code/issues/8695)** — Open P3 UI duplication: status line and footer both show `11.4% used`; minor QoL annoyance flagged by community contributor.

10. **[#8513 — ACP usage_update missing for JetBrains AI Assistant](https://github.com/QwenLM/qwen-code/issues/8513)** — Closed P2: now implemented, so JetBrains ACP clients can surface context-window usage; aligns Qwen Code with Codex ACP behavior.

## Key PR Progress

1. **[#8707 — Qwen WebBridge: direct browser control](https://github.com/QwenLM/qwen-code/pull/8707)** — Kimi WebBridge-compatible `/command` + `/status` endpoints on `qwen serve`, a 17-action browser-control surface on the real Chromium profile; non-MCP path.

2. **[#8528 — Standard ACP `usage_update` notifications](https://github.com/QwenLM/qwen-code/pull/8528)** — Closed: emits `usage_update` per main-session round with prompt-context occupancy and model context `size`.

3. **[#8613 — tmux-backed interactive terminal sub-agent](https://github.com/QwenLM/qwen-code/pull/8613)** — Lets agents drive REPLs/TUI apps inside tmux on the daemon host, rendered live in Web Shell as a first-class background task.

4. **[#8614 — Fullscreen toggle for Web Shell artifact panel](https://github.com/QwenLM/qwen-code/pull/8614)** — Expand/collapse icon in the right panel header (artifacts, subagents, reviews, monitors, scheduled tasks).

5. **[#8526 — Reasoning effort through ACP](https://github.com/QwenLM/qwen-code/pull/8526)** — Adds `thought_level` session selector (Default → Extra high) with `session/set_config_option`, reusing Qwen config semantics.

6. **[#8670 — Telemetry: attribute daemon-spawned sessions](https://github.com/QwenLM/qwen-code/pull/8670)** — Closed; now daemon/desktop sessions are distinguishable in telemetry without new payload keys, via exact channel marker values.

7. **[#8415 — Coordinate caller-supplied session IDs in serve](https://github.com/QwenLM/qwen-code/pull/8415)** — Prevents collisions when multiple SDK clients supply their own session IDs to the daemon.

8. **[#8658 — `/review` remote matching moved into CLI](https://github.com/QwenLM/qwen-code/pull/8658)** — Deterministic `qwen review match-remote` subcommand replaces model-authored prose; reduces orchestration without changing verdicts.

9. **[#8522 — Refresh MCP session metadata without reconnect](https://github.com/QwenLM/qwen-code/pull/8522)** — Project trust/`includeTools` changes now update tool/prompt/resource registrations in place on a healthy transport.

10. **[#8481 — Prefer wl-copy on Wayland](https://github.com/QwenLM/qwen-code/pull/8481)** — Native Wayland clipboard path with xclip/xsel/OSC 52 fallback.

## Feature Request Trends
- **Daemon-centric remote control**: recurring theme across WebBridge (browser control), Local Control mode (QR pairing for phone access), and Web Shell feature expansion — users want the daemon as a hub for multi-surface interaction.
- **Browser/Chrome integration**: multiple requests reference Kimi WebBridge and suggest browser control as a first-class capability.
- **ACP/IDE parity**: consistent pressure to match Codex ACP features (usage updates, reasoning effort, attribution).
- **Web Shell UI density**: composer toolbar redesign, fullscreen panels, start-in context selectors — Web Shell is becoming the primary UI surface.

## Developer Pain Points
- **TUI rendering regressions on remote/VM terminals**: tmux flicker, web-terminal tearing, PuTTY mouse behavior, Windows IME rendering — a cluster of terminal-compat bugs degrading real-world SSH workflows.
- **Silent misconfiguration**: OTEL env-var breaking metrics silently and telemetry attribution ambiguity both produced "works but wrong data" failure modes that took debugging time to surface.
- **MCP reliability**: SSE servers hanging `mcp list` and metadata refresh requirements show MCP remains a fragile integration surface.
- **Test infra debt**: integration-tests tsconfig has never type-checked (TS5063), CI cron E2E flakiness, and worker-limit fixes signal maintenance burden in the test harness itself.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar).*