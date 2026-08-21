# AI CLI Tools Community Daily — 2026-08-22

> Generated: 2026-08-22 02:30 (GMT+8) | Coverage: 7 CLIs + Claude Code Skills
> This digest is produced by the agents-radar local automation. All summaries, comparisons, and writing are done by the executing agent — no external LLM API was called.

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

# AI CLI Tools Cross-Tool Comparison Report (2026-08-22)

## 1. Ecosystem Overview

Today the AI CLI track shows a clear "two-speed" split: on one end, **OpenCode (78 PRs) and Qwen Code (82 PRs)** ride a wave of community contributions; on the other, **Claude Code and Kimi Code are nearly silent** — Claude Code merged 0 PRs in the last 24h and Kimi Code logged a single issue. OpenAI Codex concentrated on a **rapid alpha cadence** (five pre-releases of rust-v0.150.0-alpha.x and v0.149.0-alpha.x on 08-21) alongside a highly-upvoted feature request.

Three cross-cutting themes converge: **memory persistence** (Claude #34556 cross-compaction memory, OpenCode #41469 "empty response miscounted as clean stop"), **Windows / cross-platform quality** (Codex #39136 plugin init failure, #27117 PSModulePath pollution, #37104 WSL terminal silent failure), and **provider breadth & cost transparency** (Qwen #8368 adds Kimi/MiMo, #8276 preserves prompt cache across deferred tool discovery; CoPaw/NanoClaw/IronClaw all expanding provider matrices).

## 2. Activity Comparison (last 24h)

| Tool | Active Issues | Notable PRs | Releases (recent) |
|------|-----------|--------|----------------|
| Claude Code | 100 (mostly label/bot refreshes of historical issues) | 0 | v2.1.238 (08-20) |
| OpenAI Codex | 84 | 16 | rust-v0.150.0-alpha.5/.3/.2, v0.149.0-alpha.7.1/.4.1 (08-21) |
| Gemini CLI | 98 | 2 | v0.56.0-nightly.20260821, v0.57.0-preview.0 |
| GitHub Copilot CLI | 33 | 0 | v1.0.81-6 (08-14, no new release) |
| Kimi Code CLI | 1 | 0 | 1.49.0 (07-16, no new release) |
| OpenCode | 22 | 78 | v1.18.21 / v1.18.20 (08-21) |
| Qwen Code | 18 | 82 | v0.21.14-nightly.20260821, v0.21.15 (08-20) |

## 3. Shared Functional Directions

- **Memory & context compaction**: Claude #34556 "persistent memory across context compactions" stays top-of-mind (111 comments); OpenCode #41469 "session silently stops on empty LLM response (finish: unknown, 0 tokens)" is a quality black hole that pollutes evaluation and billing. Both point to the gap of "compression-history replayable + failures diagnosable."
- **Windows / cross-platform quality**: Codex #39136 built-in browser plugin Trusted RPC not in trusted path (82 comments), #27117 Windows standalone update inherits PSModulePath into powershell.exe, #37104 WSL integrated terminal silently fails before PTY startup — Windows is the #1 pain platform. Copilot CLI #4521 "sandbox cannot be disabled" and Kimi #2615 background subagent keeps calling LLM after TaskStop reflect shared terminal/process-lifecycle governance pain.
- **Provider breadth & model routing**: Qwen #8368 adds Kimi & Xiaomi MiMo providers, #8276 preserves prompt cache across deferred tool discovery; NanoClaw adds Dial (SMS+voice) and Mattermost; CoPaw adds Volcengine Agent Plan & MiMo V2.5; IronClaw pushes pluggable memory over MCP. Multi-model, multi-channel is now a differentiator axis.
- **Agent reliability & observability**: Gemini #22323 subagent misreported as GOAL success after MAX_TURNS, #21409 generalist agent hangs; OpenCode #785 "disable streaming mode" (38👍/31💬) and #34473 "randomly stops responding" show unstable streaming/interrupt semantics.

## 4. Differentiated Positioning

- **Claude Code**: main branch in a polish phase — 0 PRs merged in 24h, issues dominated by bot/label refreshes of historical items; latest v2.1.238 (08-20) continues the "cross-session memory" and "multi-session collaboration" thread (#34556, #24798). Positioned as the daily driver terminal for professional developers; UX details scrutinized zero-tolerance.
- **OpenAI Codex**: Rust rewrite accelerating, daily alpha cadence; top community ask is #11626 "/rewind checkpoint restore (revert both chat context and Codex-applied code)" (204👍). Windows quality (freeze, plugin, installer) and "local/private plugin marketplaces blocked for API-key users" (#20621) are core tensions. Positioned as OpenAI's all-scenario entry point.
- **Gemini CLI**: PR side extremely quiet (only 2 pr-generation-related); issues cluster on license validation (#28912 "no valid license"), subagent trust (#22323 false GOAL success) and "under-uses skills/sub-agents" (#21968). Mid-maturity, entering a trust-building phase before feature deepening.
- **GitHub Copilot CLI**: most enterprise-managed context; #3282/#3709 "multiple BYOK models, switch within a session" (26👍 each) is the top ask; #4521 "sandbox cannot be disabled" remains a governance pain. No new release recently; positioned as the Copilot entry point for managed environments.
- **Kimi Code CLI**: only 1 issue today (#2615 background subagent keeps calling LLM after TaskStop/timeout); ecosystem in early silence, lowest external voice.
- **OpenCode**: highly active community (78 PRs), v1.18.21/20 (08-21) ongoing; top asks #785 "disable streaming mode", #24153 "unarchive/restore archived sessions". Positioned for developers chasing latest models and deep customization; provider breadth (llmgateway, QwenCloud, Vertex) keeps expanding.
- **Qwen Code**: mature industrial PR pipeline (82 PRs); #8368 adds Kimi/MiMo, #8332 audio bridge for attachments, #8276 preserves prompt cache, #8992 MCP 2026 core + WebShell Apps host. Positioned for verification rigor and China IM/cloud-ecosystem users.

## 5. Notable Trend Signals

- **Contributor-driven vs main-branch silence divergence widens**: OpenCode/Qwen propelled by a PR flood while Claude Code/Kimi main branch is near-silent — "open contribution channel" is becoming the watershed of ecosystem vibrancy.
- **Memory persistence is the next watershed**: cross-compaction memory (Claude), empty-response miscount (OpenCode), auto-memory infinite retry (Gemini #26522) all point to the unified命题 of "failures diagnosable, history replayable."
- **Windows remains an unsatisfied hard market**: Codex plugin/installer/path, Copilot sandbox, Kimi process lifecycle — treating Windows quality as a first-class citizen is the opening for latecomers.
- **Provider-matrix arms race**: Kimi, MiMo, Volcengine, Dial, Mattermost successively integrated; multi-model/multi-channel is shifting from "feature" to "baseline."

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

# Claude Code Daily (2026-08-22)

## Today at a glance
- Latest release is **v2.1.238** (2026-08-20); v2.1.237 / v2.1.236 same-day. No new version and 0 merged PRs in 24h — main branch in a polish phase.
- Top community themes continue: cross-compaction persistent memory (#34556, 111 comments) and cross-session communication for multi-Claude workflows (#24798, 83 comments).
- Fresh bugs center on file encoding, git proxy, /rewind and Esc interaction details.

## Releases
- [v2.1.238](https://github.com/anthropics/claude-code/releases/tag/v2.1.238) (2026-08-20, latest stable)
- [v2.1.237](https://github.com/anthropics/claude-code/releases/tag/v2.1.237) (2026-08-20)
- [v2.1.236](https://github.com/anthropics/claude-code/releases/tag/v2.1.236) (2026-08-19)

## Hot Issues (last 24h)
1. **#34556 Persistent memory across context compactions** (111 comments, closed) — long-standing top resonance; user built a 59-compaction memory system.
2. **#24798 Inter-session communication for multi-Claude workflows** (26👍/83💬, closed).
3. **#7134 Does not respect file encoding, corrupts Windows-1252 files** (23👍/25💬, open) — cross-platform encoding regression.
4. **#76248 Cloud/Cowork sessions: git proxy now blocks all pushes** (8👍/28💬, open) — "not in this session's auth" wrongly blocks legitimate pushes.
5. **#87575 Auto mode system prompt causes /rewind to silently fail on Bash-edited files** (12👍/10💬, open).
6. **#64568 Pressing Esc to exit /btw mode rejects the pending tool-use prompt** (9👍/11💬, open).
7. **#63092 Esc doesn't close /BTW conversation when main conversation is active** (12👍/6💬, open).
8. **#77071 Dispatch tab missing from Claude Desktop sidebar (Windows 11 Pro)** (1👍/14💬, open).
9. **#78264 Custom session title overridden by AI-generated title; /resume forks duplicate titles** (3👍/9💬, closed).
10. **#66005 --resume drops the session's --effort level, invalidating the prompt cache** (2👍/9💬, open).

## Demand Trends
| Area | Issues | Ask |
|------|--------|-----|
| Memory/session | #34556, #24798, #66005 | cross-compaction memory, cross-session comms, resume fidelity |
| Encoding/cross-platform | #7134, #76248 | Windows-1252 encoding, git proxy non-interference |
| TUI/interaction | #64568, #63092, #87575 | Esc semantics, /rewind stability under Auto mode |

## Developer Notes
1. **Memory is core capital**: #34556 leads with 111 comments; post-compression history un-replayable still drives user-built workarounds.
2. **Cross-platform encoding regression**: #7134 affects Windows-1252 files — basic reliability.
3. **git proxy over-block**: #76248 shows Cowork session proxy policy too strict, wrongly blocking push.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Daily — 2026-08-22

## Today at a glance
- 08-21 shipped five pre-releases: rust-v0.150.0-alpha.5/.3/.2 and rust-v0.149.0-alpha.7.1/.4.1 — fast Rust-rewrite cadence.
- Top community ask: **#11626 "/rewind checkpoint restore, reverting both chat context and Codex-applied code"** (204👍/39💬).
- Windows quality remains the high-frequency pain (plugin init, PSModulePath pollution, WSL terminal silent failure).

## Releases (recent)
- [rust-v0.150.0-alpha.5](https://github.com/openai/codex/releases/tag/rust-v0.150.0-alpha.5) (2026-08-21)
- [rust-v0.150.0-alpha.3](https://github.com/openai/codex/releases/tag/rust-v0.150.0-alpha.3) (2026-08-21)
- [rust-v0.150.0-alpha.2](https://github.com/openai/codex/releases/tag/rust-v0.150.0-alpha.2) (2026-08-21)
- [rust-v0.149.0-alpha.7.1](https://github.com/openai/codex/releases/tag/rust-v0.149.0-alpha.7.1) (2026-08-21)
- [rust-v0.149.0-alpha.4.1](https://github.com/openai/codex/releases/tag/rust-v0.149.0-alpha.4.1) (2026-08-21)

## Hot Issues (last 24h)
1. **#11626 /rewind checkpoint restore** (204👍/39💬, open) — top feature ask; revert context AND code.
2. **#39136 Built-in browser plugin init fails: Trusted RPC dependency not in trusted code path** (42👍/82💬, open).
3. **#38455 ChatGPT desktop repeatedly spawns Computer Use workers, V8 OOM** (14👍/34💬, open).
4. **#27117 Windows standalone update inherits PSModulePath into powershell.exe** (13👍/20💬, open).
5. **#38350 Recurring scheduled tasks disable themselves after successful runs without user auth** (31💬, open).
6. **#20621 Codex App blocks Local/Private Plugin Marketplaces for API-key users** (28👍/3💬, open).
7. **#37475 Codex CLI 0.147.0 rejects Amazon Bedrock input, corrupts subagent handoff** (22👍/6💬, open).
8. **#33493 Local compaction v2 retains unbounded input_image payloads, causing repeated auto-compaction** (5👍/20💬, open).
9. **#37104 Windows/WSL integrated terminal silently fails before PTY/WSL startup** (9👍/16💬, open).
10. **#39161 Could not archive conversation** (14👍/10💬, open).

## Notable PRs (last 24h)
1. **#39971 Fix elevated Windows sandbox setup activation**
2. **#39980 Enforce environment network policies for remote execution**
3. **#39976 Allow semaphore limit queries in the macOS sandbox**
4. **#39969 Consolidate code mode output helper tests**
5. **#39967 Upgrade pnpm to 10.34.5**
6. **#39962 Keep Guardian reviews isolated from executor MCP servers**
7. **#39961 Test browser MCP bearer tokens over executor WebSockets**
8. **#39958 Stop advertising shell snapshots from local exec servers**
9. **#39953 Support voice-aware configuration and version-skew builds**
10. **#39952 Honor required MCP servers from selected executors**

## Demand Trends
- **Rollback-able checkpoints** (#11626) is the #1 ask: users want not just chat rollback but "code + context" consistent recovery.
- **Windows stability** is still the #1 pain platform: plugin, installer, PSModulePath, WSL terminal each independently highly-upvoted.
- **Local/private ecosystem friendly**: #20621 opposes API-key users being blocked from private plugin marketplaces.
- **Security tightening endorsed**: remote-exec network policy, Guardian isolation are right directions.

## Developer Notes
- **/rewind is a watershed feature**: 204👍 shows strong demand for "undoable coding actions."
- **Windows governance complexity is high**: independently highly-upvoted issues from installer to runtime.
- **Scheduled tasks self-disable** (#38350) exposes a hidden automation-reliability risk.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Daily — 2026-08-22

## Today at a glance
Shipped v0.56.0-nightly.20260821 and v0.57.0-preview.0 (08-19); PR side extremely quiet (only 2 pr-generation-related). Community focus: license validation (#28912 "no valid license"), subagent trust (#22323 false GOAL success, #21409 generalist hangs) and "under-uses skills/sub-agents" (#21968).

## Releases
- **v0.56.0-nightly.20260821** (2026-08-21, nightly)
- **v0.57.0-preview.0** (2026-08-19, preview)
- **v0.56.0** (2026-08-19, stable)

## Hot Issues (last 24h)
1. **#21409 Generalist agent hangs** (8👍/8💬, open).
2. **#28912 "You do not have a valid license of this product."** (6👍/9💬, open) — license false-positive.
3. **#22323 Subagent recovery after MAX_TURNS reported as GOAL success, hiding interruption** (2👍/13💬, open).
4. **#19873 Leverage model's bash affinity via Zero-Dependency OS Sandboxing & Post-Execution Intent Routing** (1👍/8💬, open).
5. **#22745 Assess impact of AST-aware file reads, search, mapping** (1👍/7💬, open).
6. **#15269 Missing Subagent Hook Events** (8💬, open).
7. **#25166 Shell command execution stuck with "Waiting input" after completion** (3👍/4💬, open).
8. **#24353 Robust component-level evaluations** (7💬, open).
9. **#21968 Gemini does not use skills and sub-agents enough** (6💬, open).
10. **#26522 Stop Auto Memory from retrying low-signal sessions indefinitely** (5💬, open).

## Notable PRs (last 24h)
1. **#28951 feat(pr-generation): add Cloud Run job, Workflow orchestration, deployment pipeline**
2. **#28952 feat(pr-generation): add interactive diff comparison visualizer generator**

## Demand Trends
- **License & trust**: #28912 license false-positive, #22323 false GOAL success both erode user trust.
- **Agent reliability**: #21409 generalist hangs, #25166 shell stuck.
- **Capability utilization**: #21968 urges fuller use of skills/sub-agents; #26522 opposes unbounded auto-retry.

## Developer Notes
- **Subagent behavior unpredictability** remains the trust shortfall (false success + hangs).
- **PR side extremely quiet**: only 2 pr-generation-related today — trust-building phase before feature deepening.
- **License validation needs precision**: #28912 false-positive hurts out-of-box experience.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Daily — 2026-08-22

## Today at a glance
No new release recently (latest v1.0.81-6 is 08-14), 0 PRs in 24h. Top asks: **multiple BYOK models & in-session model switch** (#3282, #3709, 26👍 each) and **sandbox cannot be disabled** (#4521). Enterprise-managed context remains the core positioning.

## Releases
- Still [v1.0.81-6](https://github.com/github/copilot-cli/releases/tag/v1.0.81-6) (2026-08-14, prerelease); no new release today.

## Hot Issues (last 24h)
1. **#3282 Add multiple BYOK model capability in copilot cli** (26👍/8💬, open).
2. **#3709 Allow /model to switch between multiple models, including BYOK/local providers, in one session** (26👍/4💬, open).
3. **#1313 Session Branching** (13👍/7💬, open).
4. **#4345 Reasoning effort 'medium' not supported for model 'claude-haiku-4.5'** (4👍/8💬, open).
5. **#4521 Sandbox cannot be disabled** (4👍/3💬, open).
6. **#4422 All Claude models disabled under CLI model selection** (3👍/4💬, closed).
7. **#4485 Theme turns light over night** (2👍/2💬, open).
8. **#4038 Non-interactive mode: late-connecting MCP server injects empty user message** (3💬, closed).
9. **#4542 Workspace .mcp.json detected by 'mcp list'/'mcp get' but not connected in actual agent session** (1👍/1💬, open).
10. **#4511 Session AIC display is not reliable** (2💬, open).

## Notable PRs
No new PR entered the window today.

## Demand Trends
- **Multi-model / BYOK freedom**: #3282/#3709 highly upvoted; in-session model switch is a shared ask for enterprise and individuals.
- **Sandbox fully disablable**: #4521 shows managed-environment policy too strict.
- **MCP connection consistency**: #4542 workspace config recognized but not connected — needs end-to-end validation.

## Developer Notes
- **Insufficient model-choice freedom**: single-session BYOK/local switch is a repeatedly-urged baseline capability.
- **Sandbox policy still too强制**: explicit disable ineffective — core enterprise pain.
- **No new release recently**: main branch in a stable phase awaiting next feature drop.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI Daily 2026-08-22

## Today at a glance
Near-silent today: only 1 issue entered the window, 0 PRs and 0 releases (latest 1.49.0 is 07-16). Versus the high activity of other CLIs, Kimi Code's ecosystem remains in an early silent phase.

## Releases
No new release today (latest 1.49.0, 2026-07-16).

## Hot Issues
1. **#2615 Background subagent keeps making LLM calls after TaskStop/timeout marks it terminal** (open) — process-lifecycle governance.

## Notable PRs
No updates today.

## Demand Trends
Given the sustained low activity, the community's current focus is likely on internal ACP/IDE base-link iteration; external voice is limited.

## Developer Notes
- Ecosystem early, lowest activity among the 7 CLIs; watch for follow-up fixes to its ACP runtime tool-capability boundaries.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Daily — 2026-08-22

## Today at a glance
Shipped **v1.18.21 / v1.18.20** (2026-08-21); highly active community — 78 PR updates in 24h. Top asks: **#785 "disable streaming mode?"** (38👍/31💬) and **#24153 "unarchive/restore for archived sessions"** (11👍/9💬). Reliability centers on "session silently stops on empty LLM response" (#41469) and "randomly stops responding" (#34473).

## Releases
- [v1.18.21](https://github.com/anomalyco/opencode/releases/tag/v1.18.21) (2026-08-21)
- [v1.18.20](https://github.com/anomalyco/opencode/releases/tag/v1.18.20) (2026-08-21)
- [v1.18.19](https://github.com/anomalyco/opencode/releases/tag/v1.18.19) (2026-08-20)

## Hot Issues (last 24h)
1. **#785 Is there a way to disable streaming mode?** (38👍/31💬, open).
2. **#24153 Add unarchive/restore for archived sessions** (11👍/9💬, open).
3. **#41469 Session silently stops on empty LLM response (finish: unknown, 0 tokens)** (10💬, open) — pollutes billing & evaluation.
4. **#34473 Opencode randomly stops responses** (3👍/6💬, open).
5. **#37345 Edit Project: icon/color changes not persisted to database** (4💬, open).
6. **#33219 Add FreeBSD support** (2💬, closed).
7. **#43882 muse-spark stream always ends without finish_reason** (2💬, open).
8. **#43907 TUI: copying doesn't work** (2💬, closed).
9. **#41847 Permission dialogs not rendered; backend blocks on invisible prompts, app appears frozen** (2💬, open).
10. **#36196 V2: improve tool search namespaces, reduce tool-context cache busts** (2💬, closed).

## Notable PRs (last 24h selected)
1. **#41936 fix(util): bound npm installs with a configurable timeout**
2. **#43183 fix(tui): keep file attachment badge readable with the system theme**
3. **#42927 feat(tui): display context window limit in token usage counter and sidebar**
4. **#42986 fix(shell): scan redirection targets for external_directory**
5. **#42907 fix(tui): sort child sessions by created time, not session ID**
6. **#42819 fix(session): delete reverted messages boundary-last, tie-break ids by raw order**
7. **#41723 fix(core): preserve unsupported image attachments as text instead of dropping**
8. **#42833 fix(session-ui): prevent variant select overlap on mobile**
9. **#42842 fix(i18n): correct Catalan (ca) locale, add ca glossary**
10. **#42936 feat(lsp): add Marksman language server for Markdown**

## Demand Trends
- **Reliability first**: #41469 empty-response miscount, #34473 random stop directly pollute billing & evaluation.
- **Streaming controllability**: #785 disable streaming is the top UX ask.
- **Session management**: #24153 archive restore, #42907 child-session sort.
- **Provider breadth**: llmgateway, QwenCloud, Vertex keep expanding.

## Developer Notes
- **Billing credibility**: empty response miscounted as clean stop (finish: unknown, 0 tokens) pollutes billing & evaluation.
- **Active contributor ecosystem**: 78 PRs push TUI/session/core multi-dimensional fixes.
- **Streaming semantics stability**: disable-streaming ask reflects streaming/interrupt handling still a UX shortfall.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Daily — 2026-08-22

## Today at a glance
Shipped **v0.21.14-nightly.20260821** and v0.21.15 (08-20); 82 PR updates in 24h — mature industrial PR pipeline. Focus PRs: **#8368 adds Kimi & Xiaomi MiMo providers** (68💬), **#8332 audio bridge for attachments** (67💬), **#8276 preserves prompt cache across deferred tool discovery** (64💬), **#8992 MCP 2026 core + WebShell Apps host** (32💬). Issue side lower heat (18 items, highest only 7 comments).

## Releases
- [v0.21.14-nightly.20260821](https://github.com/QwenLM/qwen-code/releases/tag/v0.21.14-nightly.20260821) (2026-08-21, nightly)
- [v0.21.15](https://github.com/QwenLM/qwen-code/releases/tag/v0.21.15) (2026-08-20, stable)

## Hot Issues (last 24h)
1. **#5180 Main session as PM dispatching tasks; subagent crashes halfway** (7💬, open) — multi-agent orchestration stability.
2. **#8993 Public extension installs require Git 2.37, but Ubuntu 22.04 apt provides only 2.34.1** (6💬, closed) — install门槛.
3. **#5966 0.19.3 UI intermittent error, Chinese IME completely invalid** (6💬, open) — i18n/IME.
4. **#7167 Fleet Shepherd Dashboard** (3💬, open).
5. **#8094 Transport-continuation recovery leaves resumed transcript starting mid-sentence** (3💬, closed).
6. **#9571 Avoid confirmation boxes being selected by default** (3💬, closed).
7. **#9494 Slash command menu selection resets to first item while streaming** (3💬, closed).
8. **#9487 Web shell loading indicators drop mid-turn on long tasks** (3💬, closed).
9. **#9675 MCP server disconnected between sessions even though configured** (3💬, open).
10. **#9693 Qwen Desktop reports MCP -32000 Connection closed on Windows at startup** (2💬, open).

## Notable PRs (last 24h selected)
1. **#8368 feat(auth): add Kimi and Xiaomi MiMo providers** (68💬, open)
2. **#8332 feat(cli): add audio bridge for attachments** (67💬, open)
3. **#8276 fix(core): preserve prompt cache across deferred tool discovery** (64💬, open)
4. **#8902 fix(cli): derive bootstrap --help from shared option definitions** (43💬, open)
5. **#9513 fix(cli): Restore PR2A session behaviors** (38💬, open)
6. **#9273 feat(review): capture-tui — rendering claims get pixels, not prose** (32💬, open)
7. **#8992 feat(mcp): add MCP 2026 core and WebShell Apps host** (32💬, open)
8. **#9526 feat(review): add persistently-critical convergence advisory (land-with-residual-risk)** (31💬, open)
9. **#8927 feat(channels): bound session lifetime with sessionRotation** (29💬, open)
10. **#9350 feat(dingtalk): support outbound file delivery** (27💬, open)

## Demand Trends
- **Provider breadth**: Kimi, MiMo onboarding (#8368); Volcengine/Mattermost etc. sync-expanding externally.
- **Cost & cache transparency**: #8276 preserves prompt cache directly ties to billing credibility.
- **Multimodal & channels**: audio bridge (#8332), WebShell Apps host (#8992), DingTalk file delivery (#9350).
- **Review automation**: capture-tui, convergence advisory, review loop.

## Developer Notes
- **Industrial release gate**: 82 PRs densely merged show a highly automated release/CI system.
- **Route-identity-bound usage**: #8276 preserves prompt cache improves billing credibility.
- **Multi-agent orchestration stability**: #5180 subagent mid-crash needs attention.

</details>

---

## Claude Code Skills Hot Topics

> Source: [anthropics/skills](https://github.com/anthropics/skills) | last 24h

- **#1620 / #1625 Shell command injection: with_server.py --server uses shell=True** (#1620 closed, #1625 open) — security hazard in skill metadata/example scripts.
- **#1624 claude-api SKIP grep unanchored — `cohere` matches "coherent", disabling the skill in repos containing the word** (open).
- **#1622 claude-api skill description exceeds the 1024-char frontmatter cap (1077 chars)** (open).
- **#1621 / #1619 MCPConnectionSSE/HTTP and MCPConnectionStdio accept caller-supplied arbitrary URL/headers/command** (open) — supply-chain security risk in MCP connectors.
- **#1627 feat: add buffer-api Agent Skill (Buffer GraphQL scheduling)** (open).
- **#1623 Update claude-api skill: Python SDK 0.x → 1.x upgrade guide** (closed).

The Skills ecosystem today focuses on **security auditing** (command injection, MCP arbitrary command exec) and point fixes; no large architectural discussion.

---

*This digest is generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar). All content is fetched live from GitHub's public API and written by the executing agent — no external LLM was called.*
