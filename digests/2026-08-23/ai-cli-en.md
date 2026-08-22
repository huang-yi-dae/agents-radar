# AI CLI Tools Community Daily — 2026-08-23

> Generated: 2026-08-23 02:30 (GMT+8) | Coverage: 7 CLIs + Claude Code Skills
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

# AI CLI Tools Cross-Tool Comparison Report (2026-08-23)

## 1. Ecosystem Overview

The most notable thing in the AI CLI space today isn't a release — it's a **measurable shift in sentiment**. Today's top technical story on Hacker News was *"A week of using Codex more than Claude"* (94👍 / 104💬), followed by *"Anthropic appears to be A/B testing reduced effort levels in Claude Code"* (51👍 / 45💬). Meanwhile, Claude Code's long-standing top-voted issue #77136 — "models increasingly default to repetitive rhetorical tics" — has accumulated **343👍 / 60💬**. Three independent signals point at the same thing: **users are starting to suspect the intelligence they pay for is quietly shrinking.** That's a trust problem, and trust is harder to patch than a missing feature.

But the other side isn't calm either. Right after its 08-21 update, Codex shipped regression #40075 — "Shell Helper, PowerShell and Git commands no longer execute" — a same-day core-capability outage. So the accurate framing today isn't "Codex won." It's that **both leaders are paying an experience tax for aggressive iteration, and users are voting with their feet on whose tax is lower.**

On release cadence, three clear tiers emerged: **daily-stable** (Claude Code v2.1.240, Gemini nightlies, Qwen v0.22.0 GA), **alpha sprint** (Codex shipped rust-v0.150.0-alpha.2/.3/.5/.6 — four prereleases in one day), and **frozen** (Copilot CLI stuck at v1.0.81-7 from 08-14; Kimi at 1.49.0 from 07-16).

## 2. Activity Comparison (last 24h)

| Tool | Active Issues (newly opened) | PRs (newly opened) | Recent Releases |
|------|------------------------------|--------------------|-----------------|
| Claude Code | 100+ (41 new) | 0 (repo closed to external PRs) | **v2.1.240 (08-22)**, v2.1.239 (08-21) |
| OpenAI Codex | 100+ (40 new) | 0 (repo closed to external PRs) | rust-v0.150.0-alpha.6/.5/.3/.2 (08-21) |
| Gemini CLI | 100+ (1 new) | 0 | v0.56.0-nightly.20260822, v0.57.0-preview.0 |
| GitHub Copilot CLI | 8 (2 new) | 0 | v1.0.81-7 (08-14, **8 days without a release**) |
| Kimi Code CLI | 3 (0 new) | 2 | 1.49.0 (07-16, **37 days without a release**) |
| OpenCode | 62 (43 new) | 38 (29 new) | v1.18.21 / v1.18.20 (08-21) |
| Qwen Code | 10 (3 new) | **90 (27 new)** | **v0.22.0 (08-22)**, v0.21.14-nightly.20260822 |
| Claude Code Skills | 3 (1 new) | 8 (5 new) | — |

> How to read this table: Claude Code / Codex / Gemini issue counts hit the API's 100-per-page ceiling, and a large share are historical issues touched by label bots. That's why the "newly opened" column is broken out — **it's the only honest measure of same-day activity.** By that measure, Gemini CLI was nearly silent today (a single new issue titled just "edge"), while OpenCode's 43 new issues led the field.

## 3. Shared Themes

- **Empty responses and mid-stream cutoffs are graduating from "occasional bug" to "billing black hole."** OpenCode opened #44148 today — "empty completions (`finish_reason=other`) and mid-stream cutoffs on long-reasoning requests on the Go plan" — joining existing #41469 (session silently stops on empty LLM response, `finish: unknown, 0 tokens`) and #32149 (stops processing without response) in one failure chain. Zeroclaw's PR #9447 ("classify incomplete terminal responses") is the engineering answer to the same question. The demand is now explicit: **failures must be attributable — you can't burn tokens and then report a "clean stop."**
- **Memory persistence is today's highest-consensus gap across tools.** Kimi #1283 ("Memory System — persistent context across sessions") is that repo's most-discussed thread at 40💬, echoed by Chinese-language issue #1478 ("Can the memory layer be optimized? It's painful on large projects"). Codex #18343 asks for tiered memory management (global / project / hybrid / per-thread). Claude Code #88862 is a high-quality field report: concurrent sessions sharing one git clone, with measured collisions and three userland mitigations. Different angles, same conclusion: **memory and concurrency isolation remain unfinished foundations everywhere.**
- **Windows is still the industry's shared technical debt.** Claude Code #88818 (MSIX package won't launch after a spontaneous close, demands reinstall), #88864 (Qemu VM: arm64 fine, x86+KVM hangs forever at 100% CPU), #85891 (Win11 main window forced always-on-top). Codex #39209 (archiving fails with os error 2 when rollout paths use the `\\?\` prefix), #39170 (loses ChatGPT auth within 15–40s after enabling advanced features), #40075 (PowerShell/Git broken after update). Copilot CLI #4111 (long sessions keep executing stale code across in-place auto-update). The counter-example proves the point: OpenCode PR #44214 **ships a native Windows ARM64 desktop agent (Electron 38)** — treating Windows as a first-class citizen is the most concrete differentiator available right now.
- **Skills security was breached head-on for the first time.** `anthropics/skills` opened #1631 today: "path traversal via unsanitized `skill_name` in `run_eval.py`." That's a real vulnerability, not a feature request. Read alongside PRs #1629 / #1630 (fixing three eval-harness defects that silently reported a 0.0 trigger rate), the signal is clear: **the Skills ecosystem is moving from "does it run?" to "can I trust the run?" — and the correctness of the eval tooling itself is the first gate.**

## 4. Positioning

- **Claude Code**: v2.1.240 keeps the near-daily cadence — engineering velocity is fine, but **reputational pressure is the heaviest in the field.** #77136 (343👍) alleges degraded output voice; #87640 reports the Fable 5 `[reasoning_extraction]` safeguard false-positiving on a one-word greeting; #84352 (139💬) shows CVP-approved organizations still hitting safeguard blocks. Layer the HN effort-throttling speculation on top and the core tension has shifted from "does it have the features?" to **"are guardrails and cost-cutting quietly eroding the capability I paid for?"** That can only be answered with transparency, not patches.
- **OpenAI Codex**: Four alphas in one day — the most aggressive iterator here. The community's top ask remains cross-surface continuity: #5609 (sync conversation history between the ChatGPT website and Codex in VSCode, 66👍) and #27565 (Claude Code-like remote control, 15👍). The cost of that speed is same-day regressions like #40075, plus #37475 (0.147.0 rejects Amazon Bedrock input and corrupts subagent handoff) and #22844 (`@browser` unavailable over remote SSH). Positioning: **OpenAI's unified all-surface entry point, trading stability for speed.**
- **Gemini CLI**: Nightlies keep rolling (v0.56.0-nightly.20260822), but the community side was essentially silent — the only new issue, #28964, has a one-word title. Existing pain sits at access and trust: #28912 ("You do not have a valid license of this product," 18💬), #28341 (infinite auth loop), #22323 (subagent recovery after MAX_TURNS reported as GOAL success, hiding the interruption). **#22323 is the most dangerous class of bug in the field today — failure reported as success poisons every downstream automated eval.**
- **GitHub Copilot CLI**: 8 days without a release and only 8 open issues, but the asks are tightly converged: #3709 (27👍) and #3282 (26👍) both want **multiple BYOK / local provider models switchable within one session**. Today's new #4566 ("agent repeatedly acknowledges work without executing tool actions") is a textbook agent-credibility problem. Positioning remains **the enterprise-managed entry point, with model freedom as its biggest user tension.**
- **Kimi Code CLI**: 37 days without a release, zero new issues today — the quietest in the field. The one meaningful signal: #1283 (40💬) proves that **even in a low-activity repo, a memory system is the top user demand.** Two PRs (#2594 preserving non-UTF-8 bytes in `StrReplaceFile` edits; #2614 documenting plugin security and persistent data) confirm maintainers are still present — just very slow.
- **OpenCode**: **Led both new issues (43) and new PRs (29) — today's community activity champion.** Existing high-vote threads #7101 (custom system prompts at global/project/custom-dir level, 127👍, closed) and #5121 (Windows winget install, 27👍) show a user base that cares deeply about customization. The new PR mix reads distinctly *engineering*: #44127 (eliminate redundant git subprocess spawns, spawn-free untracked stats), #44218 (drop events for unfollowed sessions before they allocate state), #44197 (sanitize clipboard text), #44219 (translate dotted Anthropic ids for the Cloudflare AI Gateway unified route). Worth flagging separately: #39845 (27👍 / 22💬) — "DeepSeek V4 Flash suddenly requires 'Enable models hosted in China'" — a concrete case of **geopolitical compliance directly interrupting a developer's daily workflow.**
- **Qwen Code**: **The most industrialized PR pipeline in the field (90 active / 27 new), and shipped v0.22.0 GA today.** High-discussion PRs cluster on provider breadth and cache efficiency: #8368 (add Kimi and Xiaomi MiMo providers, 72💬), #8332 (audio bridge for attachments, 70💬), #8276 (preserve prompt cache across deferred tool discovery, 64💬). Today's new PRs pivot toward reliability internals: #9705 (keep in-flight tool calls pending during live session replay), #9718 (gate skill announcements on what the model declared), #9745 (budget the repair pass, keep its timeouts out of the cap). The one red flag is issue #9733 — **loop detection false-positives on legitimate verification cycles and kills unattended turns** — fatal in automation contexts.
- **Claude Code Skills**: Today's theme is **security and eval self-cleaning.** #1631 (path traversal, new), #1252 (`product-self-knowledge` falls through to open web search when the docs URL fetch fails — **a silent fallback means an uncontrolled data source**), #1559 + PRs #1629 / #1630 (the eval harness misreported a 0% trigger rate for working descriptions; `--scan-full-turn` now measures whether a skill fires at all). In short: **Skills is filling in the "verifiable" gap.**

## 5. Trend Signals

- **Trust is becoming a harder moat than features.** The three most expensive signals today — Claude's degraded voice (343👍), the HN effort-throttling A/B speculation (51👍), Gemini's failure-reported-as-success (#22323) — are none of them "a missing feature." They're all "I can't confirm it's working the way I think it is." **Whoever first exposes effort level, guardrail triggers, and failure causes as an observable surface gains an asymmetric advantage.**
- **Aggressive iteration plus same-day regressions is now the norm, and users are starting to treat regression rate as a selection criterion.** Codex's four alphas in a day came with #40075 breaking core commands; OpenCode's 29 new PRs came alongside 43 new issues. **Speed no longer automatically means leadership — regression rate is the real measure of iteration quality.**
- **Compliance and geopolitics are sinking down to the CLI layer.** OpenCode #39845 (DeepSeek V4 Flash requiring an explicit "China-hosted models" toggle) shows model availability is no longer purely technical. The real value of multi-provider abstraction (Qwen #8368, Zeroclaw's Hailo-Ollama support) is shifting from "price/performance choice" to **"compliance fallback."**
- **Skills has passed "usable" and is entering "auditable."** On the same day, GitHub Trending surfaced three Skills-related projects (mattpocock/skills, obra/superpowers, andrej-karpathy-skills) while `anthropics/skills` was internally patching path traversal and eval false-negatives. **Ecosystem hype and security maturity are visibly out of phase — and that gap is the window where future incidents happen.**

---

## Per-Tool Details

### Claude Code ([anthropics/claude-code](https://github.com/anthropics/claude-code))

**Releases**: [v2.1.240](https://github.com/anthropics/claude-code/releases/tag/v2.1.240) (08-22), [v2.1.239](https://github.com/anthropics/claude-code/releases/tag/v2.1.239) (08-21), v2.1.238 / v2.1.237 (08-20) — near-daily cadence maintained.

**High-heat existing issues**

| Issue | Heat | Notes |
|-------|------|-------|
| [#77136](https://github.com/anthropics/claude-code/issues/77136) | 343👍 / 60💬 | Claude 4.7 / 4.8 / 5.0 and Fable increasingly default to repetitive rhetorical tics — the repo's all-time top-voted issue; a systemic output-quality complaint |
| [#32479](https://github.com/anthropics/claude-code/issues/32479) | 140👍 / 90💬 | GitHub Connector connected in Claude Desktop but not recognized by Claude |
| [#84352](https://github.com/anthropics/claude-code/issues/84352) | 22👍 / 139💬 | CVP-approved organizations still receive cyber safeguard blocks — guardrails misfiring on enterprise customers |
| [#6305](https://github.com/anthropics/claude-code/issues/6305) | 16👍 / 40💬 | Post/PreToolUse hooks not executing |
| [#64630](https://github.com/anthropics/claude-code/issues/64630) | 25👍 / 17💬 | macOS login doesn't use the system default browser |
| [#42700](https://github.com/anthropics/claude-code/issues/42700) | 24👍 / 17💬 | TTS readback + voice mode for remote control sessions |
| [#87640](https://github.com/anthropics/claude-code/issues/87640) | 13👍 / 8💬 | Fable 5's `[reasoning_extraction]` safeguard false-positives on a one-word greeting |

**Newly opened today (41 total; highlights)**

- [#88862](https://github.com/anthropics/claude-code/issues/88862) — Field report: concurrent sessions sharing one git clone, with measured collisions and three userland mitigations. **The highest-quality user submission today; points straight at missing concurrency isolation.**
- [#88818](https://github.com/anthropics/claude-code/issues/88818) — Windows MSIX package fails to launch after a spontaneous close, demanding a reinstall.
- [#88865](https://github.com/anthropics/claude-code/issues/88865) — Fabricated tool-call / tool-result blocks injected into the conversation (VSCode extension). **Forged tool records destroy session trustworthiness outright.**
- [#88864](https://github.com/anthropics/claude-code/issues/88864) — Qemu VM: arm64 OK, x86+KVM hangs forever at 100% CPU, plain x86 crashes.
- [#88860](https://github.com/anthropics/claude-code/issues/88860) — Mobile GUI effort slider doesn't reflect the session's actual effort level on open. **Combined with the HN throttling speculation, effort visibility is becoming a sensitive topic.**
- [#88847](https://github.com/anthropics/claude-code/issues/88847) — Cowork and Chrome integration issues.

### OpenAI Codex ([openai/codex](https://github.com/openai/codex))

**Releases** (four prereleases on 08-21): [rust-v0.150.0-alpha.6](https://github.com/openai/codex/releases/tag/rust-v0.150.0-alpha.6), [alpha.5](https://github.com/openai/codex/releases/tag/rust-v0.150.0-alpha.5), [alpha.3](https://github.com/openai/codex/releases/tag/rust-v0.150.0-alpha.3), [alpha.2](https://github.com/openai/codex/releases/tag/rust-v0.150.0-alpha.2), plus rust-v0.149.0-alpha.7.1.

**High-heat existing issues**

| Issue | Heat | Notes |
|-------|------|-------|
| [#5609](https://github.com/openai/codex/issues/5609) | 66👍 / 8💬 | Sync conversation history between the ChatGPT website and Codex in VSCode — top ask; fundamentally about cross-surface continuity |
| [#22844](https://github.com/openai/codex/issues/22844) | 25👍 / 4💬 | Remote SSH: in-app browser sidebar works but `@browser` is unavailable |
| [#39162](https://github.com/openai/codex/issues/39162) | 24👍 / 36💬 | macOS: opening an existing conversation invalidates ChatGPT auth and redirects |
| [#37475](https://github.com/openai/codex/issues/37475) | 22👍 / 7💬 | CLI 0.147.0 rejects Amazon Bedrock input and corrupts subagent handoff |
| [#21128](https://github.com/openai/codex/issues/21128) | 21👍 / 38💬 | Desktop silently hides project conversations outside the global recent-50 window |
| [#39170](https://github.com/openai/codex/issues/39170) | 14👍 / 13💬 | Windows desktop loses ChatGPT auth within 15–40s after enabling advanced features |
| [#18343](https://github.com/openai/codex/issues/18343) | 11👍 / 11💬 | Scoped memory management (global, project, hybrid, per-thread) |
| [#20864](https://github.com/openai/codex/issues/20864) | 6👍 / 23💬 | Desktop becomes laggy — scans all `~/.codex/sessions` rollout files |

**Newly opened today (40 total; highlights)**

- [#40075](https://github.com/openai/codex/issues/40075) — **Regression after the Aug 21 update: Shell Helper, PowerShell and Git commands no longer execute. The most severe same-day regression in the field today.**
- [#40116](https://github.com/openai/codex/issues/40116) — App Server: enforce restricted readable roots for `workspaceWrite` turns (sandbox tightening).
- [#40112](https://github.com/openai/codex/issues/40112) — Desktop: a completed thread shows stale pre-crash state after restart while the rollout & state DB have advanced.
- [#40136](https://github.com/openai/codex/issues/40136) — Chat line history truncated to 3–4 messages, rendering unescaped HTML entities (e.g. `&#x20;`).
- [#40052](https://github.com/openai/codex/issues/40052) — Android: Voice Mode hides connected app tools; switching to text exposes them in the same chat.

### Gemini CLI ([google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli))

**Releases**: [v0.56.0-nightly.20260822](https://github.com/google-gemini/gemini-cli/releases/tag/v0.56.0-nightly.20260822.g5411f113c), v0.56.0-nightly.20260821, [v0.57.0-preview.0](https://github.com/google-gemini/gemini-cli/releases/tag/v0.57.0-preview.0) (08-19), v0.56.0 GA (08-19).

**The community side was nearly silent today — the only new issue, [#28964](https://github.com/google-gemini/gemini-cli/issues/28964), has a one-word title: "edge."** Existing pain concentrates on access and agent trustworthiness:

- [#28912](https://github.com/google-gemini/gemini-cli/issues/28912) (6👍 / 18💬) — "You do not have a valid license of this product" — blocked at step one.
- [#28341](https://github.com/google-gemini/gemini-cli/issues/28341) (9👍 / 7💬) — Infinite auth loop.
- [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) (8👍 / 8💬) — Generalist agent hangs.
- [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) (2👍 / 13💬) — **Subagent recovery after MAX_TURNS reported as GOAL success, hiding the interruption. Failure disguised as success is the #1 contaminant of automated evaluation.**
- [#26522](https://github.com/google-gemini/gemini-cli/issues/26522) — Auto memory retries low-signal sessions indefinitely.
- [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) — Gemini doesn't use skills and sub-agents enough.

### GitHub Copilot CLI ([github/copilot-cli](https://github.com/github/copilot-cli))

**Releases**: v1.0.81-7 (08-14) is the latest — **8 days without a release.**

- [#3709](https://github.com/github/copilot-cli/issues/3709) (27👍 / 5💬) and [#3282](https://github.com/github/copilot-cli/issues/3282) (26👍 / 9💬) — The two top-voted asks want the same thing: **switching among multiple BYOK / local provider models within a single session.**
- [#2306](https://github.com/github/copilot-cli/issues/2306) (3👍 / 7💬) — "You are not authorized to use this Copilot feature; it requires an enterprise or organization plan."
- [#4370](https://github.com/github/copilot-cli/issues/4370) — 1.0.79-1 fails MCP initialization when `server/discover` returns `-32602`.
- [#4111](https://github.com/github/copilot-cli/issues/4111) — Windows: sessions left open across an in-place auto-update keep executing stale code.
- **New today**: [#4566](https://github.com/github/copilot-cli/issues/4566) — "Agent repeatedly acknowledges work without executing tool actions," a textbook "pretending to work" credibility problem; [#4565](https://github.com/github/copilot-cli/issues/4565) — repo app-configuration problems flagged.

### Kimi Code CLI ([MoonshotAI/kimi-cli](https://github.com/MoonshotAI/kimi-cli))

**Releases**: 1.49.0 (07-16) is the latest — **37 days without a release.** Zero new issues today; the quietest repo in the field.

- [#1283](https://github.com/MoonshotAI/kimi-cli/issues/1283) (40💬) — **Memory System: persistent context across sessions. The repo's most-discussed thread, confirming memory as the cross-tool consensus gap.**
- [#1478](https://github.com/MoonshotAI/kimi-cli/issues/1478) — Chinese-language issue: "Can the memory layer be optimized? I don't even see anything memory-related in the reference docs. It's painful on large projects." Same root as #1283.
- PR [#2594](https://github.com/MoonshotAI/kimi-cli/pull/2594) (merged) — Preserve non-UTF-8 bytes in `StrReplaceFile` edits.
- PR [#2614](https://github.com/MoonshotAI/kimi-cli/pull/2614) — Document plugin security and persistent data.

### OpenCode ([anomalyco/opencode](https://github.com/anomalyco/opencode))

**Releases**: [v1.18.21](https://github.com/anomalyco/opencode/releases/tag/v1.18.21) / [v1.18.20](https://github.com/anomalyco/opencode/releases/tag/v1.18.20) (08-21), v1.18.19 (08-20).

**43 new issues + 29 new PRs today — first place on both counts.**

**High-heat issues**

| Issue | Heat | Notes |
|-------|------|-------|
| [#7101](https://github.com/anomalyco/opencode/issues/7101) | 127👍 / 35💬 (closed) | Allow custom system prompts in global / project / custom directories |
| [#39845](https://github.com/anomalyco/opencode/issues/39845) | 27👍 / 22💬 | **DeepSeek V4 Flash suddenly requires "Enable models hosted in China" for the OpenCode Go subscription — geopolitical compliance directly disrupting daily workflow** |
| [#5121](https://github.com/anomalyco/opencode/issues/5121) | 27👍 / 18💬 (closed) | Winget installation option for Windows |
| [#34644](https://github.com/anomalyco/opencode/issues/34644) | 16👍 / 2💬 | Copilot provider not registered for the Copilot Student plan (Auto-only mode) |
| [#16349](https://github.com/anomalyco/opencode/issues/16349) | 14👍 / 7💬 | Option to swap left/right panel layout |
| [#41469](https://github.com/anomalyco/opencode/issues/41469) | 1👍 / 13💬 | Session silently stops on empty LLM response (`finish: unknown, 0 tokens`) |

**Newly opened today**

- [#44148](https://github.com/anomalyco/opencode/issues/44148) — **Empty completions (`finish_reason=other`) and mid-stream cutoffs on long-reasoning requests on the Go plan. Forms one "silent failure" chain with #41469 / #32149.**
- [#44142](https://github.com/anomalyco/opencode/issues/44142) — Tool execution aborted when dispatching a shell command to a sub-agent; task aborts.
- [#44151](https://github.com/anomalyco/opencode/issues/44151) — Request for a worktree setup script.
- PR [#44214](https://github.com/anomalyco/opencode/pull/44214) — **Adds a native Windows ARM64 desktop agent (Electron 38). Treating Windows as first-class is the most concrete differentiator available.**
- PR [#44127](https://github.com/anomalyco/opencode/pull/44127) — Eliminate redundant git subprocess spawns; spawn-free untracked stats (perf).
- PR [#44219](https://github.com/anomalyco/opencode/pull/44219) — Translate dotted Anthropic ids for the Cloudflare AI Gateway unified route.
- PR [#44218](https://github.com/anomalyco/opencode/pull/44218) — Drop events for unfollowed sessions before they allocate state (memory hygiene).
- PR [#44197](https://github.com/anomalyco/opencode/pull/44197) — Sanitize clipboard text.

### Qwen Code ([QwenLM/qwen-code](https://github.com/QwenLM/qwen-code))

**Releases**: **[v0.22.0](https://github.com/QwenLM/qwen-code/releases/tag/v0.22.0) GA (08-22)**, v0.21.14-nightly.20260822, v0.21.15 (08-20).

**The most industrialized PR pipeline in the field: 90 active / 27 new.**

**High-discussion PRs (provider breadth & cache efficiency)**

| PR | Discussion | Content |
|----|-----------|---------|
| [#8368](https://github.com/QwenLM/qwen-code/pull/8368) | 72💬 | Add Kimi and Xiaomi MiMo providers |
| [#8332](https://github.com/QwenLM/qwen-code/pull/8332) | 70💬 | Audio bridge for attachments |
| [#8276](https://github.com/QwenLM/qwen-code/pull/8276) | 64💬 | Preserve prompt cache across deferred tool discovery |
| [#8902](https://github.com/QwenLM/qwen-code/pull/8902) | 44💬 | Derive bootstrap `--help` from shared option definitions |
| [#9228](https://github.com/QwenLM/qwen-code/pull/9228) | 39💬 | Narrow serve-ab's self-hosted wipe to the A/B checkout dirs |

**Newly opened PRs (pivoting to reliability internals)**

- [#9705](https://github.com/QwenLM/qwen-code/pull/9705) (14💬) — Keep in-flight tool calls pending during live session replay.
- [#9709](https://github.com/QwenLM/qwen-code/pull/9709) (11💬) — Reject session titles that echo the prompt's own examples.
- [#9718](https://github.com/QwenLM/qwen-code/pull/9718) — Gate skill announcements on what the model was declared.
- [#9745](https://github.com/QwenLM/qwen-code/pull/9745) — Budget the repair pass and keep its timeouts out of the cap.
- [#9737](https://github.com/QwenLM/qwen-code/pull/9737) — Enforce utils leaf-layer dependency direction (architecture-debt work).
- [#9729](https://github.com/QwenLM/qwen-code/pull/9729) — Backfill session PR bindings and refresh their merge state.

**Issue to watch**: [#9733](https://github.com/QwenLM/qwen-code/issues/9733) — "loop detection false-positives on verification cycles and kills unattended turns." **Fatal in automation, and the same class as Gemini #22323: the detection mechanism itself is wrong.**

### Claude Code Skills ([anthropics/skills](https://github.com/anthropics/skills))

Today's theme is **security and eval self-cleaning**:

- [#1631](https://github.com/anthropics/skills/issues/1631) (new today) — **Path traversal via unsanitized `skill_name` in `run_eval.py`. A real vulnerability, not a feature request.**
- [#1252](https://github.com/anthropics/skills/issues/1252) — `product-self-knowledge` skill falls through to open web search when the docs URL fetch fails. **A silent fallback means an uncontrolled data source.**
- [#1559](https://github.com/anthropics/skills/issues/1559) — `skill-creator`'s `run_eval.py` reports a 0% trigger rate for descriptions that actually work.
- PR [#1629](https://github.com/anthropics/skills/pull/1629) — Fix three eval-harness defects that silently reported a 0.0 trigger rate.
- PR [#1630](https://github.com/anthropics/skills/pull/1630) — Add `--scan-full-turn` so evals measure whether a skill fires at all.
- PR [#1634](https://github.com/anthropics/skills/pull/1634) — Word-anchor the SKIP grep pattern to prevent false positives on "coherent."
- PR [#1633](https://github.com/anthropics/skills/pull/1633) / [#1632](https://github.com/anthropics/skills/pull/1632) — Rename the algorithmic-art skill; fix a README reference to a nonexistent folder.

The key shift: **the correctness of the eval tooling itself is being treated as a prerequisite problem for the first time.**

---

*This digest is generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar). All content is fetched live from GitHub's public API and written by the executing agent — no external LLM was called.*
