# AI CLI Tools Community Digest 2026-08-07

> Generated: 2026-08-07 02:29 UTC | Tools covered: 7

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
**Date:** 2026-08-07

---

## 1. Ecosystem Overview

The AI CLI tool ecosystem is in a rapid stabilization phase, with all five major tools shipping frequent patches while communities surface consistent themes around security trust, Windows platform reliability, and session/context management. Claude Code and OpenAI Codex lead in feature velocity and community engagement, while OpenCode struggles with a widespread paid-tier outage that dominates its discourse. Gemini CLI and Qwen Code are actively addressing data-integrity and security concerns respectively, reflecting a maturation from novelty to production-critical infrastructure. The dominant cross-cutting narrative is the tension between agent autonomy and developer control, manifesting in permission-model bypasses, sandbox escapes, and unreliable agent status reporting.

---

## 2. Activity Comparison

| Tool | Hot Issues (24h) | PRs Active (24h) | Recent Release | Release Notes |
|------|-----------------|------------------|----------------|---------------|
| **Claude Code** | 10 tracked; 50 issues updated | 3 | None (last 24h) | No new release |
| **OpenAI Codex** | 10 tracked | ~10 merged | `rust-v0.147.0` | Plugins, sections, incremental transcript browsing |
| **Gemini CLI** | 10 tracked | 10 active | `v0.56.0-nightly.20260807` | Nightly — automation; `v0.55.0-preview.2` in prep |
| **Copilot CLI** | 10 tracked | 0 | `v1.0.79-6` | Diagnostic warning fix, session-history load fix |
| **Kimi Code** | 10 tracked | 4 tracked (2 competing fixes) | None | No new release |
| **OpenCode** | 10 tracked | 10 active | None | No new release |
| **Qwen Code** | 10 tracked | 10+ active | `v0.21.7` | Goals 50-turn limit removed, inline terminal images |

---

## 3. Shared Feature Directions

| Requirement | Tools (Issue/PR) | Specific Need |
|---|---|---|
| **Context/session visibility** | Claude Code (#33026 proactive compaction), OpenCode (#6152, 129👍 /context dialog), Gemini CLI (#28596 --list-all-sessions), OpenAI Codex (#37347 context-window lineage) | Users want to see and manage context-window utilization, with cross-session organization and proactive compaction |
| **Windows resource-lifecycle fixes** | Claude Code (#57371 CoworkVMService, #81664 crashes), OpenAI Codex (#33776 taskkill storms, #16579 default shell), Gemini CLI (#20773 PS 5.1 && error), Copilot CLI (#4391 codepage 936), Qwen Code (#8615 EISDIR crash) | Recurring process leaks, crashes, background-service management, and shell incompatibility block Windows adoption |
| **MCP lifecycle consolidation** | OpenAI Codex (#20883 process pooling, #37344 startup settling), Gemini CLI (#10704 client sampling), Copilot CLI (#4392 orphaned processes), Kimi Code (#2147 lazy schema loading), OpenCode (multiple MCP stability PRs) | Reduce per-session process duplication, memory bloat, and startup hangs; lazy-load schemas |
| **Configurable TUI output** | Claude Code (#13378, #37796 copy-paste), OpenAI Codex (#21653 multi-line status), Copilot CLI (#4311 blank transcripts), Gemini CLI (#28641 ghost-text loop) | Terminal rendering, copy-paste integrity, and user-configurable formatting remain fragile |
| **Permission trust & transparency** | Claude Code (#6527 ask-list bypass, #74636 fake system-reminder), Qwen Code (#8627 trust override, #8643 .env leak), Copilot CLI (#4388 stuck auto-mode, #4386 rule display) | Permission models are bypassable; users demand clear rule context and trust-boundary semantics |
| **Enterprise networking** | OpenAI Codex (#6060 http_proxy, #37192 OAuth dummy key fallback), OpenCode (provider outage auth), Qwen Code (#8560 401 deep-link) | Proxy support, OAuth recovery, and transparent auth-failure handling block corporate adoption |

---

## 4. Differentiation Analysis

| Tool | Feature Focus | Target User | Technical Approach |
|---|---|---|---|
| **Claude Code** | Plugin ecosystem, multi-agent worktrees, Cowork background service | Enterprise teams, plugin developers | Bundled Bun runtime, permission-model-heavy, extensive hook system |
| **OpenAI Codex** | Desktop + CLI parity, sandbox hardening, MCP lifecycle | Prosumer/cloud developers on Desktop+CLI hybrid | Rust implementation, Bubblewrap sandbox, heavy MCP reliance |
| **Gemini CLI** | Data-integrity guarantees, AST-aware roadmap, evals infrastructure | Google ecosystem users, Vertex AI enterprise | Maintainer-driven epics on behavior evals; Python/Node hybrid |
| **Copilot CLI** | GitHub ecosystem integration, Actions/CI workflows | GitHub-centric developers, NixOS community | Rust; deep GitHub Actions/MCP registry integration |
| **Kimi Code** | Lightweight UX, VSCode extension, MCP schema efficiency | Cost-conscious CLI + IDE hybrid users | Byte-level edit safety, token-budget-first design |
| **OpenCode** | TUI ergonomics, Go subscription service, plugin commands | TUI power users, multi-repo developers | Go service architecture, plugin-command-based extensibility |
| **Qwen Code** | Dynamic Workflows, Goals, multimodal (Omni), Web Shell | Qianfan/DashScope users, multimodal workloads | Serve/daemon architecture, aggressive version cadence, OAuth quirk focus |

---

## 5. Community Momentum & Maturity

**High velocity / large community:** OpenAI Codex (≈20 PRs/day, dense feature roadmap, active triage) and Claude Code (high engagement on security-critical issues, plugin ecosystem traction) exhibit the strongest release cadence and community participation.

**Stabilizing with strong voice:** Copilot CLI is shipping quiet patches but shows a regression cluster (1.0.74–1.0.78) that is fueling negative sentiment. Gemini CLI is actively cherry-picking fixes and building eval infrastructure, indicating investment in long-term reliability. Qwen Code ships aggressive feature drops (Goals, terminal images) but faces user pushback on OAuth free-tier policy and hook regressions.

**Operational risk:** OpenCode is actively burning trust due to a two-week paid-tier outage (401 upstream block) with no official acknowledgment — community anger is the loudest across all tools. Kimi Code remains niche but shows an engaged, fast-response community around data-corruption issues (two competing PRs within 48h).

**Maturity ranking (by production readiness signal):** Claude Code ≈ OpenAI Codex > Copilot CLI > Gemini CLI > Qwen Code > Kimi Code > OpenCode (currently compromised by outage).

---

## 6. Trend Signals

**For Platform Developers:**

1. **Windows is the adoption blocker.** Every tool reports crashes, process leaks, background-service complaints, and shell incompatibilities. A cross-tool Windows reliability investment would yield outsized competitive advantage.
2. **Agent autonomy vs. guardrails is unresolved.** Permission bypasses (Claude Code #6527), silent trust overrides (Qwen Code #8627), and subagent isolation failures (#84685) indicate that current permission models are not trustworthy for production automation. Expect a pivot toward host-enforced sandboxing and monotonic authority ceilings (OpenAI Codex #36381).
3. **MCP is winning but immature.** Schema bloat, process lifecycle, orphaned processes, and OAuth recovery dominate across all tools. Standardized lazy-loading and pooling will be the next ecosystem battleground.
4. **Context-window visibility is the missing UX layer.** The highest-upvoted cross-tool request (OpenCode #6152, 129👍; Gemini #22745 epic; Claude #33026) signals that developers refuse to operate agents as black boxes. Expect `/context`-style dialogs and proactive compaction to become table stakes.
5. **Data-integrity trust is the fastest way to lose confidence.** Gemini CLI's $300 Obsidian loss (#26856) and Kimi's byte-corruption bug (#2591) generate outsized community outrage relative to other bugs. Tools that prioritize surgical edit safety and transparent status reporting will win long-term trust.
6. **Enterprise proxy/OAuth failures are the corporate deal-breaker.** Proxy support (#6060, 68👍), OAuth silent-degradation (#37192), and 403s in CI (#4346) block adoption in the exact environments where these tools have the highest ROI.
7. **TUI copy-paste and rendering fragility persists.** Even mature tools (Claude Code #13378, 72👍) cannot rely on terminal output integrity — a surprising gap for tools whose primary interface is a terminal.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

## Claude Code Skills Community Highlights Report
*Data as of 2026-08-07*

---

### 1. Top Skills Ranking

The most-discussed Skill submissions (PRs) by community attention:

**#1 — skill-creator eval fixes (PR #1298, #1323, #1261, #1050, #1099)**
Multiple PRs target the same broken `run_eval.py` script, which reports `recall=0%` on every skill description (Issue #556, 10+ independent reproductions). Fixes address: eval artifacts not installed as real skills, Windows subprocess pipe-streaming crashes, trigger detection missing the real skill name, and synthetic test files polluting the live project registry. *Status: All open; the eval harness is the repo's most active pain point.*

**#2 — document-typography (PR #514)** by PGTBoos
Typographic quality control for generated documents: orphan word wrap (1–6 words on a final line), widow paragraphs, and numbering misalignment. Discussion centers on why Claude-generated documents universally exhibit these defects and why users rarely request fixes proactively. *Status: Open.*

**#3 — ODT / OpenDocument skill (PR #486)** by GitHubNewbie0
Create, fill, read, and convert `.odt`/`.ods` files, including ODT-to-HTML conversion. Complements the existing docx/pdf skills; fills a notable format gap. *Status: Open.*

**#4 — testing-patterns (PR #723)** by 4444J99
Comprehensive testing-stack skill: Testing Trophy model, unit-testing patterns (AAA, naming, edge cases), React Testing Library, and what *not* to test. High community interest in making Claude consistently produce well-structured tests. *Status: Open.*

**#5 — self-audit (PR #1367)** by YuhaoLin2005
A universal pre-delivery audit skill: mechanical file verification (every claimed output exists) followed by a four-dimension reasoning audit in damage-severity order. Designed to work across any project, stack, or model. *Status: Open.*

**#6 — color-expert (PR #1302)** by meodai
Self-contained color-expertise skill: ISCC-NBS/Munsell/XKCD/RAL naming systems, color-space selection tables (OKLCH for scales, OKLAB for gradients, CAM16 for perceptually uniform spaces). *Status: Open.*

**#7 — pyxel retro game development (PR #525)** by kitao
Skill wrapping `pyxel-mcp`, enabling iterative retro/pixel-art game creation (write → run_and_capture → inspect → iterate). Notable because it pairs a Skill with an MCP server. *Status: Open.*

**#8 — plan-file-hygiene (PR #1479)** by tonydzi
Addresses planning-artifact lifecycle debt: planning files accumulate with no retention or cleanup policy. Frames the issue as a lifecycle gap rather than a one-off cleanup task. *Status: Open.*

---

### 2. Community Demand Trends

**Skill-authoring reliability is the dominant concern.** The single most-discussed issue cluster (##556, #1169, #1329, #202) revolves around the `skill-creator` evaluation loop producing false signals (`recall=0%`), which means description optimization is "optimizing against noise." Community members repeatedly attempt fixes — six PRs alone target this — indicating deep frustration with an unusable core workflow.

**Trust and security boundaries.** Issue #492 (43 comments) flags that community skills distributed under the `anthropic/` namespace enable trust-boundary abuse: users grant elevated permissions believing skills are official. This is the highest-comment issue in the repo and signals demand for provenance controls, namespace separation, and permission auditing.

**Context-window discipline.** Issues #1487 (claude-api skill injecting ~156k tokens in one tool call) and #1175 (SharePoint access-control logic inside SKILL.md) show a growing concern about Skill design that wastes context or makes unsafe assumptions.

**Org-level skill sharing.** Issue #228 (16 comments, 8 👍) requests direct org-wide skill sharing in Claude.ai — the current download-and-manually-upload workflow is a friction point for teams.

**Format coverage and document fidelity.** Issues #12 (docx whitespace corruption) and #62 (skills disappearing) persist as long-tail reliability complaints. Demand is for Skills that handle edge cases correctly rather than new format features.

---

### 3. High-Potential Pending Skills

These open PRs have active discussion and are likely to land:

- **[color-expert (PR #1302)](https://github.com/anthropics/skills/pull/1302)** — meodai (creator of ColorNames, a mature color-naming dataset) — updated as recently as 2026-07-21; strong authorship pedigree and self-contained scope.
- **[self-audit (PR #1367)](https://github.com/anthropics/skills/pull/1367)** — YuhaoLin2005 — mechanical verification + reasoning audit; the author has also filed a follow-on proposal (Issue #1385) for a three-gate pipeline, suggesting a sustained roadmap.
- **[plan-file-hygiene (PR #1479)](https://github.com/anthropics/skills/pull/1479)** — tonydzi — recently updated (2026-07-27); directly addresses a lifecycle gap that resonates with long-running agent workflows.
- **[testing-patterns (PR #723)](https://github.com/anthropics/skills/pull/723)** — 4444J99 — comprehensive testing guidance; a recurring ask in community discussion.
- **[ODT skill (PR #486)](https://github.com/anthropics/skills/pull/486)** — GitHubNewbie0 — fills an obvious format gap in the document-skills collection; low controversy, incremental value.
- **[pyxel (PR #525)](https://github.com/anthropics/skills/pull/525)** — kitao — pairs a Skill with an MCP server; represents the emerging Skill↔MCP hybrid pattern.

---

### 4. Skills Ecosystem Insight

The community's most concentrated demand is for a **reliable, trustworthy skill-authoring and evaluation toolchain** — including Windows support, accurate trigger detection, and security/namespace integrity — rather than for any single new domain expertise Skill.

---

# Claude Code Community Digest — 2026-08-07

## Today's Highlights
No new releases shipped in the last 24 hours, but the issue tracker remains highly active with 50 items updated. A critical security concern is gaining traction: a spoofed system-reminder vulnerability (#74636) that manipulates Claude's behavior post tool-call, and multi-agent worktree isolation is broken, causing subagents to hijack each other's state (#84685). Windows platform issues continue to dominate, with crashes, GPU process failures, and permission prompt storms making automation workflows nearly unusable on that OS.

## Releases
No new releases in the last 24 hours.

## Hot Issues

1. **[#6527 — `ask` list is ignored when "Bash" is in allow list](https://github.com/anthropics/claude-code/issues/6527)** — A critical security bug where the `ask` permission list is completely bypassed if `Bash` is present in the allow list. With 23 comments and 19 upvotes, this undermines the entire permission model for Linux users. The community is pressing for this to be treated as a P0 security fix.

2. **[#76248 — Git proxy blocks all pushes in Cowork sessions; PAT pass-through broken](https://github.com/anthropics/claude-code/issues/76248)** — The `CCR_TEST_GITPROXY` rollout removed the ability to push to repos outside the "authorized repository set," even with personal access tokens. This broke standard workflows mid-session for remote/cloud teams, with multiple confirmations across the community.

3. **[#13378 — 2-space indent and 80-char hard wrap breaks copy-paste](https://github.com/anthropics/claude-code/issues/13378)** — With 72 upvotes and 16 comments, this remains one of the most upvoted open bugs. The rendered output padding corrupts pasted code, and there is still no configuration option to disable it. This severely hampers any workflow that involves copying code out of the TUI.

4. **[#57371 — Claude Desktop (Windows): provide a way to disable Cowork background service](https://github.com/anthropics/claude-code/issues/57371)** — Users are frustrated with `CoworkVMService` running as an unkillable background process. With 42 upvotes, the community wants a clear opt-out or system tray toggle, especially for users who only use the CLI.

5. **[#37796 — Copied text includes 2-space leading indentation](https://github.com/anthropics/claude-code/issues/37796)** — A long-standing macOS TUI bug (49 👍) where every copied line in iTerm2 includes rendering padding. Users have to manually strip indentation, which compounds with #13378's wrapping issue to make the TUI copy experience painful.

6. **[#79584 — Assistant text before tool calls (esp. AskUserQuestion) is intermittently never rendered](https://github.com/anthropics/claude-code/issues/79584)** — A Windows-specific bug where the user sees only the tool prompt/question, but not the assistant's accompanying explanation. This is particularly problematic for plugin-driven workflows, making the output confusing and seemingly broken.

7. **[#73638 — Session rename during a server tool call permanently corrupts the transcript](https://github.com/anthropics/claude-code/issues/73638)** — A severe data-integrity bug: renaming a session while `server_tool_use` (e.g., the `advisor` tool) is in flight injects a fake user turn into the transcript, causing every future prompt to return a 400 error. The session becomes permanently unusable.

8. **[#84194 — ECONNRESET on streaming API calls: bundled Bun HTTP client fails while Node.js/curl succeed](https://github.com/anthropics/claude-code/issues/84194)** — A frustrating network-layer bug where the bundled Bun client fails with `ECONNRESET` on streaming calls across Windows/VPN environments, while Node.js and curl work fine with identical requests. The workaround (switching `CLAUDE_CODE_STREAM_WRITE_STRATEGY` or forcing non-streaming) is unclear to most users.

9. **[#84685 — Multi-agent: EnterWorktree/isolation state is session-global — concurrent subagents hijack each other's cwd and guard identity](https://github.com/anthropics/claude-code/issues/84685)** — A freshly filed (2026-08-07) high-severity bug: in multi-agent setups, worktree isolation is shared as "last-writer-wins" global state. Concurrent subagents can jump into each other's working directories and even pretend to be each other, breaking isolation and guard rails entirely.

10. **[#74636 — Spoofed/false "Note: file was modified... don't tell the user" system-reminder appears after Write/Edit calls](https://github.com/anthropics/claude-code/issues/74636)** — A jarring security concern: after Claude's own Write/Edit tool calls, a fake `<system-reminder>` appears instructing the model to hide file modifications from the user. This is a prime vector for prompt injection, especially when file contents or MCP tool outputs are untrusted.

## Key PR Progress
Note: Only 3 PRs were active in the last 24 hours; the community is encouraged to review and test these fixes.

1. **[#84427 — fix(plugin-dev): prevent validate-agent.sh exiting on first warning](https://github.com/anthropics/claude-code/pull/84427)** — A small but crucial fix for plugin developers: `validate-agent.sh` now correctly increments counters without crashing under `set -e`. This improves the developer experience for anyone building or iterating on Claude Code plugins.

2. **[#84381 — fix(plugin-dev): handle wrapped hook schemas and optional matchers in validate-hook-schema.sh](https://github.com/anthropics/claude-code/pull/84381)** — Improves `validate-hook-schema.sh` to correctly parse top-level `hooks` wrappers and properly handle optional matchers, making hook validation much more useful for a wider range of hook configurations.

3. **[#84600 — Enable frontend-design plugin at project scope](https://github.com/anthropics/claude-code/pull/84600)** — A maintenance-style PR that enables the official `frontend-design` skill at the project scope via `.claude/settings.json`. This makes the frontend-design skill available automatically for this repository, showcasing how to apply marketplace plugins at scale.

## Feature Request Trends
- **System-level notifications** (#26581, 32 👍): Users increasingly want OS-level notifications (VSCode, terminal, desktop) when Claude finishes long tasks or requires input. This is the top "quality of life" request and remains unimplemented.
- **Disable/cleanly manage background services on Windows** (#57371, 42 👍): Users want a simple GUI toggle or config to prevent `CoworkVMService` from running. The lack of an opt-out is a major adoption blocker for Windows users.
- **Configurable TUI output formatting** (#13378, 72 👍): The community is unified in wanting the hard wrap and indentation behavior to be user-configurable, with issues like #37796 also feeding into this.
- **Proactive context compaction** (#33026): Users want the model to have the ability to initiate its own compaction in preparation for complex multi-step tasks, rather than waiting for the system to hit a threshold.
- **Better plugin/hook developer experience** (#72327, #84427, #84381): Requests for a "handled" decision state in hooks and bug fixes in validation scripts indicate a growing plugin ecosystem that needs robust tooling.

## Developer Pain Points
- **Windows is the Walled Garden**: Recurring crashes (#81664, #81123), bundled background services (#57371), GPU process failures (#81123), and compound-command permission storms (#76718) make Windows the most troublesome platform. Automated and multi-session workflows on Windows are hitting 700+ permission prompts even on non-mutating commands.
- **Permission and security model is leaky and confusing**: The `ask`/allow-list bypass (#6527) and the fake system-reminder injection (#74636) highlight a trust gap between what the model reports and what it actually does. This is eroding developer confidence in the tool's guardrails.
- **Multi-agent and session management is fragile**: Transcript corruption on rename (#73638), global worktree isolation state (#84685), and the Git proxy/authorization failures in Cowork (#76248) make it risky to attempt complex parallel or cloud-based workflows.
- **TUI copy-paste is still broken**: With both #13378 (72 👍) and #37796 (49 👍) remaining open, the community is vocal about the inability to rely on the terminal UI for any kind of code extraction without manual cleanup.
- **Missing operational visibility**: The lack of system notifications (#26581) means long-running agent tasks require constant manual check-ins, which is a bottleneck for users who want Claude to run asynchronously alongside other work.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest
**2026-08-07**

---

## Today's Highlights

The Codex team shipped `rust-v0.147.0` with portable Agent Plugins, catalog search across local/workspace/remote scopes, and persistent manually-ordered conversation sections. A dense wave of ~20 merged PRs landed today addressing stability: OAuth reauthentication recovery for MCP servers, subagent context-window lineage tracking, and Bubblewrap sandbox hardening. Meanwhile, the community is rallying around long-standing issues: Windows process leaks (#33776, 32 comments) and missing HTTP proxy support (#6060, 68 👍) remain the loudest pain points.

## Releases

**`rust-v0.147.0` (0.147.0)**

- **Install portable Agent Plugins** and search across local, personal, workspace, and remote plugin catalogs — expanding the plugin ecosystem beyond the default marketplace.
- **Organize conversations into persistent, manually ordered sections** — users can now structure long threads with custom ordering that survives sessions.
- **Browse long transcripts incrementally** — improved pagination for large conversation histories, reducing memory and rendering load on the Desktop app.

---

## Hot Issues

1. **[#33776 — [Windows] ChatGPT.exe spawns hundreds of taskkill.exe/conhost.exe processes](https://github.com/openai/codex/issues/33776)** — 32 comments, 27 👍
   Desktop on Windows leaks 287+ child processes in a single session, triggering WMI storms and DWM degradation. The volume of similar Windows process-management reports below suggests a systemic resource-lifecycle problem.

2. **[#6060 — Support configuring outbound HTTP proxy via http_proxy in config.toml](https://github.com/openai/codex/issues/6060)** — 15 comments, 68 👍
   Enterprise and academic users behind Zscaler/PAC proxies cannot use Codex at all. Highest 👍 count on the board — a clear blocker for corporate adoption.

3. **[#21653 — Support multi-line status line in TUI](https://github.com/openai/codex/issues/21653)** — 12 comments, 58 👍
   Statusline truncates when users configure multiple items. Community wants line breaks; currently there is no workaround.

4. **[#28080 — Desktop thread tools intermittently lose handlers (`No handler registered`)](https://github.com/openai/codex/issues/28080)** — 21 comments
   Within active sessions, tool handlers vanish without explanation. Users report sessions continuing but tools silently breaking.

5. **[#20883 — Use project-scoped MCP process pool instead of starting MCP per session](https://github.com/openai/codex/issues/20883)** — 17 comments
   MCP servers spawn per chat, duplicating processes and memory. Related to the 10.9 GB memory blowout reported in #33531.

6. **[#19694 — Desktop model picker filters out models from model_catalog_json](https://github.com/openai/codex/issues/19694)** — 14 comments, 35 👍 (CLOSED)
   Custom models returned by the catalog API were being dropped by the UI. Closed today — users should verify fix in the next release.

7. **[#16579 — Windows: allow configuring default session shell via config](https://github.com/openai/codex/issues/16579)** — 4 comments, 32 👍
   PowerShell is hardcoded as default; Git Bash and other shell users want a config entry. A prepared change exists in the thread.

8. **[#26820 — CLI cannot acquire Chrome extension backend while app UI works](https://github.com/openai/codex/issues/26820)** — 12 comments
   Terminal CLI fails to connect to the Chrome extension backend despite the Desktop app working on the same machine. Unclear root cause.

9. **[#37192 — OAuth fallback silently uses hardcoded "dummy" API key after network change, causing 401](https://github.com/openai/codex/issues/37192)** — 4 comments
   Network switches (Wi-Fi → hotspot, VPN toggle) expire OAuth tokens. Instead of prompting re-auth, Codex silently degrades to a dummy key.

10. **[#35463 — Codex subagents drain full week quota overnight — usage counting broken](https://github.com/openai/codex/issues/35463)** — 4 comments
    A single overnight subagent run exhausted Pro 20x weekly quota. Usage accounting appears disconnected from actual token consumption.

---

## Key PR Progress

1. **[#37348 — Add rollout migration tooling and background migration](https://github.com/openai/codex/pull/37348)**
   New `codex migrate-rollouts` command with dry-run inspection, `--apply`, thread filtering, I/O throttling, and JSON/verbose reports.

2. **[#37337 — Recover MCP servers after OAuth reauthentication](https://github.com/openai/codex/pull/37337)**
   Failed OAuth-backed Streamable HTTP MCP servers now recover automatically when credentials are refreshed, without restarting the app.

3. **[#37347 — Track context windows per agent](https://github.com/openai/codex/pull/37347)**
   Forked subagents now get distinct context-window lineage, fixing inherited history metadata and enabling precise budgeting.

4. **[#37345 — Send model routing hints to the Codex backend](https://github.com/openai/codex/pull/37345)**
   Adds `x-codex-routing-hint` header with request model and service tier on all HTTP/WebSocket requests for better backend routing.

5. **[#37349 — Mount a minimal `/dev` in full-filesystem Bubblewrap sandboxes](https://github.com/openai/codex/pull/37349)**
   Prevents host device-tree inheritance in network-isolated sandboxes, closing a sandbox escape vector.

6. **[#37352 — Configure the default code-mode exec yield timeout](https://github.com/openai/codex/pull/37352)**
   New `features.code_mode.default_exec_yield_time_ms` config (default 30s), also reflected in tool descriptions for model awareness.

7. **[#37344 — Fix subagent MCP startup status settling](https://github.com/openai/codex/pull/37344)**
   Clears deferred MCP startup expectations for active subagents, fixing TUI showing "MCP starting" indefinitely.

8. **[#37273 — Reuse MCP handlers across sampling steps](https://github.com/openai/codex/pull/37273)**
   Caches MCP handlers per session instead of rebuilding schema per step — reduces overhead for long runs with stable MCP bindings.

9. **[#37350 — Allow `ThreadManager` to customize thread ID generation](https://github.com/openai/codex/pull/37350)**
   Adds `with_thread_id_generator` for custom ID allocation; retains UUIDv7 default and preserves stored IDs on resume.

10. **[#37341 — Support content references for inline visualizations](https://github.com/openai/codex/pull/37341)**
    Recognizes structured `visualize` content references in cached/streaming TUI rendering; resolves absolute paths only when valid.

---

## Feature Request Trends

- **MCP lifecycle consolidation** — Persistent requests for project-scoped MCP process pools (#20883), not per-session spawning. Memory bloat reports (#33531) reinforce this.
- **Enterprise networking** — `http_proxy` config support (#6060) plus proxy-aware OAuth flows (#37192) dominate enterprise asks.
- **Sandbox/delegation control** — Host-enforced monotonic authority ceilings for subagents (#36381) and Windows default-shell configurability (#16579) signal demand for finer-grained execution control.
- **TUI ergonomics** — Multi-line status lines (#21653) and sane copy-paste from CLI output (#24685) remain small but heavily-requested quality-of-life fixes.

---

## Developer Pain Points

1. **Windows process/resource leaks** — Recurring theme: `taskkill.exe` storms (#33776), zombie children (#37247), MCP memory bloat (#33531), elevated sandbox UAC loops (#31556). Windows resource lifecycle is the single largest complaint cluster.
2. **Silent degradation** — OAuth fallback to dummy keys (#37192), lost tool handlers (#28080), and quota exhaustion from runaway subagents (#35463) all fail without clear user notification.
3. **Session/history management** — Subagent threads polluting recent-conversation lists (#25341), duplicate active turns (#34767), and inaccessible long transcripts (addressed partially by v0.147.0) frustrate users who rely on history.
4. **Configuration inflexibility** — Hardcoded PowerShell default (#16579), unconfigurable timeouts (#37352), and missing proxy support (#6060) force users to fight defaults rather than customize behavior.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-08-07

## Today's Highlights

A nightly release (`v0.56.0-nightly.20260807`) is out, and active work continues on a `v0.55.0-preview.2` patch with a cherry-picked fix. Community issues continue to surface around destructive agent behavior and data loss — with the top-voted issue reporting $300 in lost Obsidian work still open and drawing 47 comments. Several PRs are addressing long-standing pain points, including context overflow, terminal input hang, and session listing.

## Releases

**v0.56.0-nightly.20260807.gd5c9a97dc** — Nightly build with release automation updates and version bumps. No significant user-facing changes in this snapshot. A companion PR is preparing **v0.55.0-preview.2** via cherry-pick of commit `2139b12` into the preview branch.

## Hot Issues

1. [**#26856 — Data loss in Obsidian, user demands refund**](https://github.com/google-gemini/gemini-cli/issues/26856) — Agent reportedly deleted thousands of files worth $300 of work. P1, remains open with 47 comments and 16 reactions. Community frustration is high; maintainers have asked for exported chat history to investigate. This is the most-upvoted open issue.

2. [**#20773 — Windows PowerShell 5.1 `&&` ParserError**](https://github.com/google-gemini/gemini-cli/issues/20773) — CLI breaks on default Windows shell due to unsupported `&&` operator. Closed after a long lifecycle with 17 comments. Windows compatibility remains a recurring theme.

3. [**#10704 — MCP Client Sampling support**](https://github.com/google-gemini/gemini-cli/issues/10704) — Request to let MCP servers call LLMs through Gemini CLI, mirroring VS Code Git features. Closed, but with 13 comments and 9 upvotes. Signal that MCP ecosystem demand is high.

4. [**#22323 — Subagent reports false GOAL success on MAX_TURNS**](https://github.com/google-gemini/gemini-cli/issues/22323) — `codebase_investigator` returns `status: "success"` even after hitting turn limits with zero analysis done. Misleading success reporting undermines trust in agent statuses. P1, open, 12 comments.

5. [**#25867 — Backspace deletes a word instead of a character on Windows**](https://github.com/google-gemini/gemini-cli/issues/25867) — Basic editing behavior regression on Windows; closed but emblematic of Windows input handling issues.

6. [**#25933 — execvp(3) "Permission denied" on RHEL**](https://github.com/google-gemini/gemini-cli/issues/25933) — Fresh install on RHEL8/9 can't run any external commands. NFS home dir suspected. Closed, but indicates portability gaps on enterprise Linux.

7. [**#27132 — VS Code extension UI lockup from globalState storage**](https://github.com/google-gemini/gemini-cli/issues/27132) — Long sessions or reloads block the main thread, triggering "Window is not responding." Long-session memory issues are a notable concern.

8. [**#28698 — High memory usage loop**](https://github.com/google-gemini/gemini-cli/issues/28698) — Memory climbs during idle loop on v0.53.1. Open, 5 comments, new-ish report. Resource leaks in background processes are a rising concern.

9. [**#25166 — Shell hangs "Waiting input" after task completes**](https://github.com/google-gemini/gemini-cli/issues/25166) — P1 bug: terminal commands remain stuck after finishing, blocking subsequent work. 3 upvotes, open with maintainer-only label.

10. [**#27386 — Unicode text silently corrupted in file edits**](https://github.com/google-gemini/gemini-cli/issues/27386) — Vietnamese and Samoan characters mangled, libraries silently broken. Closed as possible duplicate. Serious correctness issue for non-ASCII users.

## Key PR Progress

1. [**#28716 — Reclassify capacity exhaustion as terminal error**](https://github.com/google-gemini/gemini-cli/pull/28716) — Stops retrying when model capacity or credits are exhausted; triggers immediate fallback instead. Good UX fix for noisy failure loops. Closed; cherry-picked to preview.

2. [**#28700 — Stop fusing new user message into interrupted tool response**](https://github.com/google-gemini/gemini-cli/pull/28700) — Fixes the "model finishes your sentence instead of answering" bug after ESC or stream failure. Targets a core interaction reliability problem. Closed.

3. [**#28519 — Prevent infinite auth loop by awaiting credential save**](https://github.com/google-gemini/gemini-cli/pull/28519) — Fixes #28430 by properly awaiting `oauth_creds.json` writes, forcing consent. Closed, small but impactful.

4. [**#28597 — Load environment variables before settings placeholders**](https://github.com/google-gemini/gemini-cli/pull/28597) — Fixes load-order race where `.env` values weren't available during settings expansion. Open, large. Impacts users relying on env-based config.

5. [**#28718 — Record usage already received when stream is aborted**](https://github.com/google-gemini/gemini-cli/pull/28718) — Fixes #28682, ensuring `usageMetadata` isn't dropped on stream abort. Critical for accurate token accounting. Open.

6. [**#28596 — Add `--list-all-sessions` across workspaces**](https://github.com/google-gemini/gemini-cli/pull/28596) — New CLI flag for viewing/managing sessions grouped by workspace. Community-requested quality-of-life feature. Open.

7. [**#28641 — Fix ghost text wrapping infinite loop at narrow widths**](https://github.com/google-gemini/gemini-cli/pull/28641) — Resolves #19985; CJK/emoji characters at narrow terminal widths could hang the renderer. Small but important cross-platform fix.

8. [**#28639 — Guard `formatTruncatedToolOutput` against non-positive maxChars**](https://github.com/google-gemini/gemini-cli/pull/28639) — Prevents negative slice indices from inflating tool output 2x. Good edge-case hardening from the community.

9. [**#19638 — Cap search results to prevent context overflow**](https://github.com/google-gemini/gemini-cli/pull/19638) — Caps grep/rg output and improves the overflow message. Open with `help wanted`; addresses a very common context window failure.

10. [**#28679 — Improve Vertex AI 401 error message for API-key users**](https://github.com/google-gemini/gemini-cli/pull/28679) — Better DX when users configure Vertex AI auth but only possess a standard API key. Open, security-area.

## Feature Request Trends

- **MCP expansion**: Client Sampling support ([#10704](https://github.com/google-gemini/gemini-cli/issues/10704)) signals interest in a richer MCP role, beyond being just a client.
- **AST-aware code navigation**: A maintainer epic ([#22745](https://github.com/google-gemini/gemini-cli/issues/22745)) is tracking investigations into AST-based file reads and codebase mapping — a signal that smarter context is on the roadmap.
- **Component-level evals**: Another maintainer epic ([#24353](https://github.com/google-gemini/gemini-cli/issues/24353)) is pushing for more robust behavioral evaluation infrastructure, including a request for 76+ eval tests.
- **Agent resilience**: Requests for browser agent session takeover and lock recovery ([#22232](https://github.com/google-gemini/gemini-cli/issues/22232)), plus safer git and destructive-operation habits ([#22672](https://github.com/google-gemini/gemini-cli/issues/22672)).
- **Cross-session management**: Users want better session discovery and organization, as seen in the `--list-all-sessions` PR ([#28596](https://github.com/google-gemini/gemini-cli/pull/28596)).

## Developer Pain Points

- **Destructive agent actions are the #1 fear**: The Obsidian data loss issue ([#26856](https://github.com/google-gemini/gemini-cli/issues/26856)) is the top-voted open issue. Concerns about `git reset`, `--force`, and unrecoverable deletions recur across multiple issues ([#22672](https://github.com/google-gemini/gemini-cli/issues/22672)).
- **Windows fidelity lags other platforms**: Repeated reports on PowerShell parsing ([#20773](https://github.com/google-gemini/gemini-cli/issues/20773)), backspace behavior ([#25867](https://github.com/google-gemini/gemini-cli/issues/25867)), and command substitution blocks ([#26318](https://github.com/google-gemini/gemini-cli/issues/26318)) show Windows as a weak spot.
- **Context window overflow is a daily frustration**: Too many tools ([#24246](https://github.com/google-gemini/gemini-cli/issues/24246)) and unbounded search output blow up context; users want capping and smarter tool selection.
- **Agent status reporting is unreliable**: Subagents report "success" on interruption ([#22323](https://github.com/google-gemini/gemini-cli/issues/22323)), and subagents run without permission ([#22093](https://github.com/google-gemini/gemini-cli/issues/22093)). Trust in agent feedback is at risk.
- **Shell execution hangs and memory leaks**: Post-completion "Waiting input" hangs ([#25166](https://github.com/google-gemini/gemini-cli/issues/25166)) and idle memory loops ([#28698](https://github.com/google-gemini/gemini-cli/issues/28698)) disrupt long-running usage.
- **Unicode corruption in file edits**: Issues like [#27386](https://github.com/google-gemini/gemini-cli/issues/27386) highlight severe correctness breaks for non-ASCII content, a high-cost, low-frequency failure.
- **Performance with many tools**: 400+ tools trigger 400 errors ([#24246](https://github.com/google-gemini/gemini-cli/issues/24246)); users want smart tool selection rather than broad exposure.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-08-07

## Today's Highlights

A patch release (v1.0.79-6) quietly fixes two interactive-mode annoyances: a stray diagnostic warning and a session-history load failure that left transcripts permanently blank. Meanwhile, the community is converging on a cluster of concurrency and state-management defects — queued messages getting stuck forever, steering messages arriving out of order, and permission mode changes not taking effect — suggesting the recent 1.0.74–1.0.78 releases introduced regressions that are now being reported in volume. Newly triaged issues also call out orphaned MCP server processes after authentication and screen-clearing bugs on certain Windows codepages.

## Releases

**v1.0.79-6** (published within last 24h)  
Two targeted fixes:
- A rare internal delay no longer prints a diagnostic warning over the interactive UI.
- A failed session-history load no longer leaves the timeline permanently empty — previously the failure was silently discarded, keeping the transcript blank for the rest of the session with nothing logged.

## Hot Issues

1. **[#4373 — Queued messages are stuck forever](https://github.com/github/copilot-cli/issues/4373)**  
   Users report that when multiple messages are sent, the first gets picked up but subsequent ones remain queued indefinitely; Ctrl+C doesn't cancel them, and new prompts also stall. Affects 1.0.75. This is a critical workflow blocker for interactive sessions.

2. **[#4372 — Steering messages get queued and executed out of order](https://github.com/github/copilot-cli/issues/4372)**  
   When two steering messages are fired in quick succession, the first gets queued and the order is flipped, causing wrong execution order. Common when users add context right after an initial steer.

3. **[#4388 / #4389 — Permissions stuck in auto mode after switching back to interactive](https://github.com/github/copilot-cli/issues/4388)**  
   Two independent reports (duplicate) describe the agent continuing to make code changes without permission prompts after the user toggles from auto mode back to interactive. Observed across multiple models, affecting v1.0.78.

4. **[#4251 — Resuming large sessions OOMs / grinds CPU for ~70 min in 1.0.74](https://github.com/github/copilot-cli/issues/4251)**  
   A clear regression vs 1.0.73 with ~3–4× memory usage. The author ran a controlled A/B on the same machine and session, isolating the issue to 1.0.74. Long-lived session users are directly impacted.

5. **[#3392 — Bash tool breaks on NixOS with version ≥1.0.49](https://github.com/github/copilot-cli/issues/3392)**  
   The agent errors with `<exited with error: Failed to start bash process>` on NixOS. 7 👍 indicates a meaningful slice of the Linux community is affected. Root cause appears related to the absolute path of bash.

6. **[#4392 — Post-authentication MCP client rebuild leaves orphaned stdio MCP server processes](https://github.com/github/copilot-cli/issues/4392)**  
   At startup, the CLI spawns MCP servers, then rebuilds the entire MCP client after GitHub auth completes. The first generation of stdio child processes is never killed or reaped, leaking processes on every startup.

7. **[#4313 — Allow scrolling through current conversation history](https://github.com/github/copilot-cli/issues/4313)**  
   Users want mouse wheel and PageUp/PageDown navigation through conversation history. 4 comments indicate active discussion on the desired interaction model.

8. **[#4346 — MCP registry policy fetch returns 403 for Actions GITHUB_TOKEN, blocking non-default MCP servers in CI](https://github.com/github/copilot-cli/issues/4346)**  
   In GitHub Actions, the documented PAT-less setup fails when fetching MCP registry policy, blocking all non-default MCP servers. Directly impacts the new Actions integration announced in July.

9. **[#4311 — Transcript renders as blank lines until width change](https://github.com/github/copilot-cli/issues/4311)**  
   Interactive transcript blanks out (bottom region) while content is still present — scrolling up reveals it. `/resume` doesn't recover it. Likely a measured-line cache invalidation bug in the ScrollBox renderer.

10. **[#4385 — Models start background tasks but don't understand when they're finished](https://github.com/github/copilot-cli/issues/4385)**  
    The model waits forever even though the shell process has exited. The reporter added OS-level trace evidence showing the process is dead, but the CLI doesn't reap it. Results in indefinite hangs.

## Key PR Progress

No pull requests were updated or opened in the last 24 hours. The repository currently has zero open PRs in the tracked window.

## Feature Request Trends

- **Session/transcript navigation** (#4313): Scrolling through conversation history with mouse wheel and keyboard is the most-discussed UX gap this week.
- **`.agents` convention expansion** (#4204): Users want the existing `.agents/skills` directory pattern extended to instructions, agents, and hooks — in any opened folder, not just Git repos.
- **BYOM model flexibility** (#4376): Support in-session model discovery and switching for Bring-Your-Own-Model providers (e.g., Vertex AI), instead of requiring a restart with a single `COPILOT_MODEL`.
- **Permission transparency** (#4386): Permission prompts should display the specific rule or command characteristic that triggered the approval request.
- **Worktree hygiene** (#3914): Let `/worktree` respect repo-specific branch naming guidelines.

## Developer Pain Points

- **1.0.74–1.0.78 regression cluster**: The highest-signal theme this week is a set of regressions around session state — large-session resume OOM (#4251), queued messages stuck forever (#4373), steering order corruption (#4372), and stale permission modes (#4388). Developers upgrading across these versions are hit by multiple breaking behaviors.
- **MCP reliability and process leaks**: Orphaned stdio processes after auth (#4392), BigInt serialization failures (#4211), and 403s in CI with GITHUB_TOKEN (#4346) paint a picture of MCP support still being rough around the edges — particularly in enterprise or Actions environments.
- **Terminal rendering fragility**: Repeated issues with blank transcripts (#4311), invisible dark-on-dark text in tmux (#4212), and screen-clearing on codepage 936 (#4391) show the custom TUI remains sensitive to terminal environments and locale settings.
- **Tool-execution trust**: Model confusion about whether background tasks finished (#4385) and fabricated web_search answers (#4093, closed) underscore ongoing concerns about the agent's grounding and process awareness.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

## Kimi Code CLI Community Digest - August 7, 2026

### Today's Highlights
A data-corruption bug in the `StrReplaceFile` tool, where non-UTF-8 bytes outside the edited region are silently replaced with U+FFFD, generated two competing PRs (#2594, #2595) and an issue (#2591) within 48 hours—an unusually fast community response. The long-awaited Memory System feature (#1283) continues to accrue attention with 20 comments, signaling strong demand for persistent context. Additionally, a long-running PR (#2255) adding Shift+Enter for newline insertion was finally merged, resolving a UX gap that had been open since May.

### Releases
No new releases in the last 24 hours.

### Hot Issues
- [#2591 StrReplaceFile corrupts undecodable bytes outside the edited region](https://github.com/MoonshotAI/kimi-cli/issues/2591) — Critical data-integrity bug: the tool decodes the entire file with `errors="replace"` and writes back corrupt bytes anywhere in the file, not just near the edit. Two immediate fix PRs indicate high severity. 3 comments.
- [#1283 Feature Request: Memory System - Persistent context across sessions](https://github.com/MoonshotAI/kimi-cli/issues/1283) — The highest-commented issue (20) since February. Requests automatic (AI-managed notes) and manual (user-defined) memory for project patterns and preferences across sessions. Continuous updates suggest sustained community demand.
- [#2593 Quick switching of auto/yolo/manual modes in VSCode plugin panel](https://github.com/MoonshotAI/kimi-cli/issues/2593) — Fresh request for in-panel mode toggles plus a status bar showing remaining usage quota. Addresses workflow friction in the IDE extension. 0 comments, 1 day old.
- [#2474 CLI interface keeps shaking and re-rendering from scratch](https://github.com/MoonshotAI/kimi-cli/issues/2474) — Rendering instability causing full re-renders, reported on Linux with K2.7 Thinking model. Two upvotes suggest other users face similar display issues.
- [#2317 VSCode Extension: Plan mode file path not clickable in chat webview](https://github.com/MoonshotAI/kimi-cli/issues/2317) — Minor UX gap: file paths in plan-mode chat are non-clickable, breaking quick navigation. 4 comments, 1 upvote.
- [#2147 Lazy-load MCP tool schemas into context](https://github.com/MoonshotAI/kimi-cli/issues/2147) — Proposes deferring MCP schema injection until tools are needed to save thousands of tokens per session. Performance-conscious users with multiple MCP servers would benefit directly.
- [#621 First WriteFile always errors "Invalid path"](https://github.com/MoonshotAI/kimi-cli/issues/621) — Closed but updated today: the first `WriteFile` call consistently fails before falling back to absolute paths. 2 comments.
- [#821 Security: Missing authorization checks + dependency updates](https://github.com/MoonshotAI/kimi-cli/issues/821) — Closed security review flagging 2 IDOR vulnerabilities and 5 CVEs (CVSS 7.0-8.0). Though closed, the update suggests ongoing security hardening. 0 comments.
- [#2594 fix(tools): preserve non-UTF-8 bytes in StrReplaceFile edits](https://github.com/MoonshotAI/kimi-cli/pull/2594) — A competing fix approaching the byte-corruption bug by applying edits as UTF-8 byte substrings on the raw buffer. Introduces an alternative solution requiring maintainers to choose direction. No comments yet.
- [#2595 fix(StrReplaceFile): refuse to edit files that are not valid UTF-8](https://github.com/MoonshotAI/kimi-cli/pull/2595) — The safer alternative: reject invalid-UTF-8 files outright rather than risk silent corruption. Prevents data loss but may break workflows on binary-adjacent files. No comments yet.

### Key PR Progress
- [#2255 feat(shell): support Shift+Enter for inserting newlines](https://github.com/MoonshotAI/kimi-cli/pull/2255) — **Merged today** after months. Adds Shift+Enter as a newline shortcut alongside Ctrl-J and Alt-Enter, closing a UX gap opened in #2254 and resolving several related issues. The most significant merge this week.
- [#2594 fix(tools): preserve non-UTF-8 bytes in StrReplaceFile edits](https://github.com/MoonshotAI/kimi-cli/pull/2594) — Open. Implements byte-level edit application on raw buffers to keep irrelevant bytes intact. A surgical fix but more complex to review than the alternative.
- [#2595 fix(StrReplaceFile): refuse to edit files that are not valid UTF-8](https://github.com/MoonshotAI/kimi-cli/pull/2595) — Open. Simplest safe approach: fail fast on non-UTF-8 files. May inconvenience users editing mixed-encoding files but guarantees data integrity.

### Feature Request Trends
1. **Persistent Memory System** (#1283) — Demands for cross-session context persistence, both automatic and user-managed.
2. **IDE integration quality-of-life** (#2593, #2317) — Quick mode switching (auto/yolo/manual), clickable file paths, and usage status bars in the VSCode extension.
3. **Context-efficiency for MCP** (#2147) — Lazy-loading tool schemas to reduce token consumption in heavily configured environments.
4. **Input ergonomics** (#2255, resolved) — Newline insertion shortcuts; merged after prolonged demand.

### Developer Pain Points
- **Data corruption risk** (#2591) — Fear of silent byte corruption and a distrust of the tool’s edit safety with non-UTF-8 content.
- **CLI rendering instability** (#2474) — Frequent full re-renders disrupt workflow concentration and readability.
- **Path handling inconsistencies** (#621) — Initial `WriteFile` failures force workarounds, breaking scripts.
- **Security uncertainty** (#821) — Past high-severity vulnerabilities and outdated dependencies raise trust concerns.
- **Context budget pressure** (#2147) — MCP-heavy setups consume tokens prematurely, hampering cost efficiency and focus.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-08-07

## Today's Highlights

The OpenCode Go subscription service is experiencing a widespread outage: multiple issues report `401 Request blocked by upstream provider` errors affecting all paid models, with free models working normally. The community has filed at least a dozen related reports, making this the dominant topic. Meanwhile, development activity remains steady, with PRs landing for TUI prompt queuing, file tool simplifications, and macOS desktop window behavior.

## Releases

No new releases in the last 24 hours.

## Hot Issues

1. **[#38257 — OpenCode Go: return 401 Request blocked by upstream provider](https://github.com/anomalyco/opencode/issues/38257)** — 44 comments, 11 👍
   Longest-running thread on the Go subscription outage. `chat/completions` blocked while `v1/models` works. Reported as a server-side issue affecting all Go subscribers.

2. **[#38218 — All subscription models return "Request blocked by upstream provider"](https://github.com/anomalyco/opencode/issues/38218)** — 31 comments, 13 👍
   Duplicate confirmation of the same outage. Every model under opencode-go fails uniformly after login. 13 upvotes signal significant impact.

3. **[#38195 — 401 AuthError: Request blocked by upstream provider](https://github.com/anomalyco/opencode/issues/38195)** — 24 comments, 17 👍
   Reproduces across OpenCode Desktop and Hermes, on multiple machines (Windows and macOS). Free models work. The high upvote count makes this the community's loudest report.

4. **[#6152 — [FEATURE]: Session context usage (similar to /context in Claude)](https://github.com/anomalyco/opencode/issues/6152)** — 22 comments, 129 👍
   Long-standing request for a TUI dialog displaying session context-window breakdown. 129 upvotes indicate this is a heavily desired visibility feature.

5. **[#31932 — [FEATURE]: Cross-project session list / picker for TUI](https://github.com/anomalyco/opencode/issues/31932)** — 15 comments, 6 👍
   `/sessions` is project-scoped; this asks for a global session picker across repositories. Useful for multi-repo developers.

6. **[#40234 — 订阅opencode go之后套餐没有生效](https://github.com/anomalyco/opencode/issues/40234)** — 13 comments
   Chinese-language report: subscription email received but plan never activates. Shows `No payment method` error. Points to billing/activation sync problems beyond the upstream 401 issue.

7. **[#14332 — Amazon Bedrock Opus 4.6 compaction failure](https://github.com/anomalyco/opencode/issues/14332)** — 13 comments, 8 👍
   Compaction fails with "thinking blocks cannot be modified" error. Persistent issue since February, still unfixed.

8. **[#1168 — Feature Request: Make Links Clickable (Ctrl+Left Click to Open)](https://github.com/anomalyco/opencode/issues/1168)** — 11 comments, 119 👍
   One of the highest-upvoted feature requests: make URLs in the TUI clickable. 119 upvotes over a year suggest high demand for basic usability.

9. **[#39827 — [Zen] AuthError: Request blocked by upstream provider — all Zen models broken](https://github.com/anomalyco/opencode/issues/39827)** — 9 comments, 4 👍
   Extension of the outage to OpenCode Zen accounts, both paid and free. Also confirms the issue is server-side: direct provider API keys work fine.

10. **[#39875 — [FEATURE]: Revert silent removal of Go privacy wording and provider attribution](https://github.com/anomalyco/opencode/issues/39875)** — 6 comments, 44 👍
    A Go subscriber raises concerns about silent privacy policy changes regarding provider attribution and telemetry. 44 upvotes show strong community concern about transparency.

## Key PR Progress

1. **[#40974 — fix(desktop): preserve macOS app on window close](https://github.com/anomalyco/opencode/pull/40974)**
   Keeps the macOS app running when the last window closes; restores the window on Dock activation. Matches standard macOS behavior.

2. **[#40971 — feat(tui): expose prompt action commands](https://github.com/anomalyco/opencode/pull/40971)**
   Exposes stable TUI plugin commands for form and permission prompts (e.g., `form.option.previous`). Improves plugin extensibility.

3. **[#40922 — feat(tui): queue prompts with option enter](https://github.com/anomalyco/opencode/pull/40922)**
   Makes Enter steer the active response; Option/Alt+Enter queues prompts across both TUI composer paths. Queued work appears in a compact dock.

4. **[#40962 — refactor(core): simplify file tools to lexical paths](https://github.com/anomalyco/opencode/pull/40962)**
   Simplifies V2 file tools: resolves mutation paths lexically instead of canonicalizing symlinks; handles malformed UTF-8 lossily. Aligns with V1 behavior.

5. **[#40931 — feat(core): continue subagent sessions](https://github.com/anomalyco/opencode/pull/40931)**
   Adds an optional `sessionID` input to continue existing foreground subagent sessions, preserving history while validating parent/agent identity.

6. **[#40929 — feat(core): bound tool output](https://github.com/anomalyco/opencode/pull/40929)**
   Bounds top-level local tool text with configured line/byte limits, retains full truncated text in managed files, and removes files older than seven days.

7. **[#40969 — fix(llm): treat empty tool call identity in stream deltas as absent](https://github.com/anomalyco/opencode/pull/40969)**
   Fixes streaming tool calls failing with "missing id or name" when providers (e.g., Alibaba DashScope) send empty-string IDs on continuation deltas.

8. **[#40967 — feat(core): add workspace environment foundation](https://github.com/anomalyco/opencode/pull/40967)**
   Pure-addition foundation for workspace environment handling. Core thesis: spawn is the driver contract; `Files` derives from `ChildProcessSpawner`.

9. **[#40960 — fix(tui): dismiss stale permission prompts](https://github.com/anomalyco/opencode/pull/40960)**
   Removes stale TUI permission prompts when the server reports the request no longer exists, routing replies through the data layer.

10. **[#40956 — fix(session): restart the loop for queued input stranded by an interrupt](https://github.com/anomalyco/opencode/pull/40956)**
    Fixes queued user input being silently dropped when a turn is interrupted via Esc or `/session/:id/abort`. Persisted messages now get picked up.

## Feature Request Trends

- **Session context visibility** (#6152, 129 👍): Users want a TUI dialog showing context-window usage breakdown, similar to Claude's `/context`.
- **Cross-project session management** (#31932, #38973): Multiple requests for a global session picker across repositories and content search within sessions.
- **Clickable links in TUI** (#1168, 119 👍): A year-old request to open URLs via Ctrl+click; remains one of the most popular asks.
- **Configurable prompt interleaving** (#32157, 67 👍): Users want first-class `queue` vs `steer` vs `break` distinction for mid-run prompts, with compaction-aware semantics.
- **Todo sidebar with integration** (#38081): Project-scoped issue management via Linear integration, extending the per-session flat todo list.
- **Privacy transparency** (#39875, 44 👍): Strong demand for clearer provider attribution, telemetry disclosure, and retention policy wording.

## Developer Pain Points

- **OpenCode Go/paid-tier outage** (12+ issues): The dominant frustration. All paid models return HTTP 401 "Request blocked by upstream provider" while free models work. Reports span two weeks, multiple clients (Desktop, Hermes, TUI), and multiple operating systems. The lack of a fix or official acknowledgment is compounding community anger.
- **Subscription activation failures** (#40234), (#40055): Users report receiving subscription confirmation emails but the plan never activating; billing errors when trying to use the service.
- **Compaction reliability** (#14332): Bedrock Opus 4.6 compaction still fails on "thinking blocks cannot be modified" — a multi-month unresolved bug.
- **TUI stability on Linux** (#40871, #35494): Freezes and blank screens on Debian and recent Linux builds; only `kill -9` works.
- **Web interface staleness** (#40502): The web interface does not auto-refresh conversations; manual page refresh required to see new messages.
- **Windows terminal corruption** (#11748): After closing the CLI, mouse-wheel scrolling in PowerShell produces garbled output.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-08-07

## Today's Highlights

Qwen Code v0.21.7 shipped with two notable improvements: the 50-turn limit for Goals was removed, enabling uninterrupted long-running tasks, and inline terminal image rendering (kitty/iTerm2/WezTerm/Ghostty/Warp) was enabled in the interactive CLI. Security hardening is a strong focus this week, with multiple issues filed around folder-trust bypasses and secret leakage in subprocess environments, alongside a P1 regression in 0.21.6 affecting core hook dispatch.

## Releases

- **v0.21.7** — Removed the 50-turn limit for Goals, allowing tasks to resume and continue beyond previous boundaries. Enabled rendering inline terminal images from model outputs in the interactive CLI for kitty/iTerm2/WezTerm/Ghostty/Warp. ([#8421](https://github.com/QwenLM/qwen-code/pull/8421))
- **v0.21.7-nightly.20260807.fca8f3c1f** — CI fix surfacing blocked autofix takeover admission. ([#8410](https://github.com/QwenLM/qwen-code/pull/8410))
- **live-host-v0.1.0 / live-host-latest** — Stable Qwen Live Host installer feed; CI work on Windows merge queue tests and evidence-image tooling for GitHub reviews.

## Hot Issues

1. **Qwen OAuth Free Tier Policy Adjustment** ([#3203](https://github.com/QwenLM/qwen-code/issues/3203)) — 150 comments, the most-discussed issue. Proposal to cut daily free quota from 1,000 to 100 requests and eventually close free entry. Community reaction is intense, with users pushing back on the timeline and impact.

2. **0.21.6 Hook Dispatch Regression** ([#8622](https://github.com/QwenLM/qwen-code/issues/8622)) — P1 regression: PreToolUse, PostToolUse, PreCompact, and SessionStart hooks never fire in 0.21.6, breaking tool-gating workflows that worked in 0.21.5. Only UserPromptSubmit and Stop dispatch correctly.

3. **Desktop Bundled Runtime Crashes on Windows** ([#8615](https://github.com/QwenLM/qwen-code/issues/8615)) — P1 Windows blocker: Qwen Code Desktop v0.1.0 crashes at startup with `EISDIR lstat 'C:'` when opening a workspace, making the desktop app unusable on Windows 11.

4. **DO_NOT_TRUST Loses to Ancestor TRUST_FOLDER** ([#8627](https://github.com/QwenLM/qwen-code/issues/8627)) — Security bug: an explicit distrust rule is overridden by an ancestor trust rule, letting untrusted workspaces inject the `qwen serve` bearer token. Complemented by a related issue ([#8643](https://github.com/QwenLM/qwen-code/issues/8643)) where the fast path loads `.env` from untrusted ancestors.

5. **Prompt Not Restored on Ctrl+C** ([#8316](https://github.com/QwenLM/qwen-code/issues/8316)) — UX frustration: cancelling a prompt with Ctrl+C loses the text entirely; users must retype. Affects correction workflows significantly.

6. **Windows File Links URL-Encode Drive Colons** ([#8644](https://github.com/QwenLM/qwen-code/issues/8644)) — Clicking file links in chat on Windows fails because the colon in `file:///d%3A/...` is URL-encoded and the editor cannot open the path.

7. **Terminal Shrink Re-prints Transcript Blocks** ([#8557](https://github.com/QwenLM/qwen-code/issues/8557)) — On macOS/Warp, shrinking the terminal window duplicates previously printed transcript content in scrollback, making long conversations hard to follow.

8. **Anthropic Model-ID Parsing Rejects Dotted-Minor Aliases** ([#8584](https://github.com/QwenLM/qwen-code/issues/8584)) — Qwen Code's Anthropic generator rejects aliases like `claude-opus-4.8` and lacks Opus 5 token limits, breaking proxy deployments.

9. **tmux Flickering via SSH** ([#8562](https://github.com/QwenLM/qwen-code/issues/8562)) — Users on macOS iTerm2 SSHing into Ubuntu tmux sessions report screen flicker during conversations; Qwen 3.8 Max diagnosis points to a Qwen Code version regression.

10. **Web Shell 401 on Deep-Link Refresh** ([#8560](https://github.com/QwenLM/qwen-code/issues/8560)) — Refreshing a session deep link in Web Shell returns 401 Unauthorized when `qwen serve` uses a bearer token. Closed but illustrates ongoing auth hardening.

## Key PR Progress

1. **feat(serve): Expose active work state** ([#8588](https://github.com/QwenLM/qwen-code/pull/8588)) — Adds `activeWork`, `activeWorkReporting`, and `activeWorkStaleMs` to deep health checks, enabling visibility into background agents and unsettled prompts.

2. **fix(core): Sanitize internal daemon secrets from shell subprocess environments** ([#6606](https://github.com/QwenLM/qwen-code/pull/6606)) — Long-running PR that blocks internal daemon secrets from leaking into shell subprocess environments; critical for production security.

3. **feat(workflows): add cooperative pause and resume** ([#8320](https://github.com/QwenLM/qwen-code/pull/8320)) — Adds whole-run pause/resume to Dynamic Workflows: stops dequeuing new dispatches, lets in-flight work converge, and gates results until resume.

4. **feat(web-shell): add fullscreen view for the right artifact panel** ([#8614](https://github.com/QwenLM/qwen-code/pull/8614)) — Adds expand/collapse toggle to the artifact panel header, letting users focus on artifacts, subagents, review changes, and monitors.

5. **feat(core): share compression caches with OpenAI providers** ([#8418](https://github.com/QwenLM/qwen-code/pull/8418)) — Extends prefix-preserving cache sharing to all OpenAI-compatible endpoints, not just DashScope, improving compression efficiency broadly.

6. **fix(desktop): fall back to system browser when built-in browser fails** ([#8594](https://github.com/QwenLM/qwen-code/pull/8594)) — Fixes dead markdown links in Desktop replies by falling back to the system browser when the built-in one fails silently.

7. **feat(external-context): Add optional Mem0 memory writes** ([#8507](https://github.com/QwenLM/qwen-code/pull/8507)) — Opt-in Mem0 write variant for Direct External Context, registering `context_remember({ content })` under strict configuration.

8. **fix(cli): time out silent MCP SSE startup** ([#8555](https://github.com/QwenLM/qwen-code/pull/8555)) — Adds wall-clock timeout around MCP transport connection in `qwen mcp list`, closing hang scenarios with silent SSE servers.

9. **fix(cli): preserve slash command names in narrow terminals** ([#8657](https://github.com/QwenLM/qwen-code/pull/8657)) — Keeps the actionable command token intact in narrow completion menus; argument hints wrap instead.

10. **feat(web-shell): install Extensions from archives** ([#8621](https://github.com/QwenLM/qwen-code/pull/8621)) — Enables installing `.zip` or `.tar.gz` extensions via Web Shell Extension manager through a dedicated daemon endpoint.

## Feature Request Trends

- **Omni multimodal integration** — Multiple issues ([#8185](https://github.com/QwenLM/qwen-code/issues/8185), [#8197](https://github.com/QwenLM/qwen-code/issues/8197)) focus on S3 upload reliability, caching, and recovery for multimodal file recognition, backed by a dedicated `omni-experiment` branch.
- **Background Agent lifecycle** — Requests for tracking `activeWork` facts, recovery paths for background agents that outlive their prompts, and session lifecycle management are converging into deeper daemon health and ACP session reporting.
- **Web Shell and Desktop polish** — Fullscreen artifact panels, mobile composer anchoring, language persistence, and archive-based extension installs show a push toward feature parity and UX refinement in Web Shell and Desktop.
- **Documentation and localization** — Korean documentation in the README language bar and adding qwen-audio-agent (voice frontend over ACP) to the Ecosystem section reflect community demand for broader language and ecosystem coverage.

## Developer Pain Points

- **Hook system regressions** — The 0.21.6 hook dispatch regression is a high-severity pain point: silent breakage of PreToolUse/PostToolUse/PostToolUseFailure/PreCompact/SessionStart hooks disrupts automated workflow gates with no immediate diagnostics.
- **Security trust semantics confusion** — The folder-trust bypass issues reveal confusion about how `TRUST_FOLDER` and `DO_NOT_TRUST` interact, and the `.env` fast-path loading behavior is both subtle and dangerous for credential security.
- **Terminal rendering regressions** — Frequent complaints about terminal UI regressions on Windows WSL, tmux via SSH, and macOS Warp suggest rendering stability is a recurring weak spot across terminal emulators.
- **Input and navigation UX gaps** — Loss of prompt content on Ctrl+C, URL-encoded drive letters on Windows, and Chinese IME pinyin display issues in the terminal point to unfinished input/navigation UX details that impede day-to-day flow.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar).*