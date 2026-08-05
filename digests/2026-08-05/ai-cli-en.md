# AI CLI Tools Community Digest 2026-08-05

> Generated: 2026-08-05 05:02 UTC | Tools covered: 7

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

# Cross-Tool AI CLI Comparison Report — 2026-08-05

## 1. Ecosystem Overview

The AI CLI developer tool ecosystem is undergoing rapid maturation, characterized by three dominant themes: security hardening (SSRF, command injection, and trust-boundary fixes across Gemini CLI, Qwen Code, and Claude Code), reliability at scale (MCP process leaks, context-window degradation, and streaming hangs span multiple tools), and plugin/extension ecosystem growth (Claude Code's plugin-dev tooling PR wave and Codex's plugin runtime boundaries). Windows remains a persistent second-class platform across all tools, with recurring issues in sandboxing, IME input, encoding, and update reliability. The competitive landscape is differentiating around three axes: MCP protocol support depth, subagent architecture sophistication, and the maturity of protocol integrations (ACP, Responses API, remote control).

## 2. Activity Comparison

| Tool | Hot Issues | PRs (24h) | Releases (24h) | Notable Stability Signals |
|---|---|---|---|---|
| Claude Code | 10 (61 max comments) | 10 meaningful | v2.1.222 | Security fix for worktree isolation bypass; 3 long-running fronts (Fable 5, SSE hangs, OAuth loop) |
| OpenAI Codex | 10 (81 max comments) | 10 meaningful | 4× rust-v0.147.0-alpha | Rapid iteration; MCP leaks (9+ GB RSS) across macOS + Windows; fresh install regression |
| Gemini CLI | 10 (12 max comments) | 10 meaningful | None | 2 critical security PRs (SSRF, command injection); false-success subagent reporting |
| Copilot CLI | 10 (8 max comments) | 2 open (low signal) | v1.0.79-1, v1.0.79-2 | Breaking sandbox rename; MCP friction dominant (OAuth, discover, TLS) |
| Kimi Code | 5 | 3 | None | Context reliability at ~500K tokens; Windows IME bug; session mobility demand |
| OpenCode | 10 (30 max comments) | 10 meaningful | v1.18.13 | Usage-API demand (126 👍); Electron renderer freeze; stream recovery PRs |
| Qwen Code | 10 (17 max comments) | 10 meaningful | 2 previews | Trust-boundary hardening; tmux flicker; provider metadata restructuring |

## 3. Shared Feature Directions

**Session Continuity & Persistence** — Appears across nearly every tool: Kimi Code (#1283 memory, #1282 remote control), Copilot CLI (session forking #1697, cloud sync), Claude Code (remote control parity #48949), OpenCode (/handoff command), and Qwen Code (fork-from-any-conversation #8274). Users consistently want persistent context, cross-device pickup, and granular session branching.

**MCP Protocol Hardening** — Copilot CLI (OAuth 3LO, FastMCP discover, private CA TLS), Codex (process lifecycle leaks), Gemini CLI (consent/config transparency PR), and Claude Code (connector reliability) all face MCP integration failures. The protocol is winning adoption but failing operationally.

**Usage/Cost Transparency** — OpenCode's Go-plan usage API (#16017, 126 👍) and Copilot CLI token/context visibility requests (#2532, #3859) signal demand for programmatic access to consumption data, model attribution, and cost breakdowns.

**Agent Runtime Trust & Security** — Qwen Code (#8102 deterministic tool boundaries), Gemini CLI (two critical CVEs patched), Claude Code (isolation bypass fix), and Codex (capability isolation PR #37027) all tighten the perimeter around what model-produced actions can do.

**Subagent/Skill Control** — Gemini CLI (proactive skill use #21968, prevent-use #22093), Codex (per-subagent model selection), OpenCode (live status + steer/cancel), and Claude Code (suggested-task batch review) reflect demand for finer-grained delegation control.

**Windows Parity** — Across the board: Codex (Computer Use, sandbox apply_patch), Kimi (IME duplication, abnormal exits), Gemini (CI coverage), Claude Code (SSE hangs, MSIX fragility), Copilot CLI (Ctrl+H WSL2).

## 4. Differentiation Analysis

| Tool | Primary Target User | Differentiating Focus | Weaknesses |
|---|---|---|---|
| Claude Code | Enterprise, plugin ecosystem builders | Deep plugin/hook system; desktop-remote control; background agents | Fable 5 entitlement confusion; Windows SSE/GPU issues |
| OpenAI Codex | Desktop-app users, MCP-heavy workflows | Rapid alpha iteration; strict tool collision handling; plugin runtime boundaries | MCP process leaks (multi-GB); stale-reply bug (#8648); update path fragility |
| Gemini CLI | Google-ecosystem developers, browser automation | Security-first (2 CVEs patched this week); Cloud Workstations OAuth; AST-aware tooling EPICs | Subagent false-success reporting; generalist hangs; skills under-utilized |
| Copilot CLI | Enterprise GitHub users, org-wide config | Tight GitHub integration; org-level agents; managed settings | MCP integration friction; enterprise config fail-closed; silent breaking changes |
| Kimi Code | API-tool ecosystem, ACP clients | ACP protocol expansion (permissions, model switching); lightweight focused scope | Context degradation at 500K; Windows instability; minimal release cadence |
| OpenCode | Go-plan subscribers, open-source builders | Usage/cost transparency; `/handoff`; headless JSON attribution; V2 migration | Billing accounting bugs; Electron freezes; V2 migration churn |
| Qwen Code | Open-source, multi-provider users, JetBrains users | Model-metadata-from-API restructuring; review pipeline optimization; tmux/Warp fixes | CI noise; transcript reliability after aborts; SSE MCP hangs |

## 5. Community Momentum & Maturity

**Rapid Iteration:** OpenAI Codex leads with four alpha releases in 24 hours, though the cadence correlates with release regression reports (#37002). Qwen Code is equally active with previews plus 10+ substantive PRs spanning security, providers, and UX.

**High-Demand Communities:** Claude Code and Gemini CLI have the most engaged issue threads (61 and 12 comments respectively on top issues), with long-running community analysis of root causes. Claude Code's plugin-dev tooling PR wave indicates a maturing contributor ecosystem building infrastructure — a sign of ecosystem stickiness.

**Growth Stage:** OpenCode's usage-API request at 126 👍 — by far the highest upvote count across all tools — suggests a commercially-driven user base demanding operational visibility. Kimi Code and Copilot CLI show the lowest PR activity, though Copilot's two releases signal a controlled, deliberate cadence rather than stagnation.

**Maturity Signals:** Gemini CLI's two critical security patches in one week demonstrate active maintenance. Qwen Code's structural refactor toward API-backed model metadata signals architectural investment. Claude Code's high comment counts on unresolved entitlement bugs (#79337) and streaming hangs (#33949) indicate that even maturing tools carry unresolved community pain.

## 6. Trend Signals

**Security is now a first-class feature, not a patch.** Multiple tools independently shipped security hardening the same week (Gemini CLI SSRF + command injection, Qwen Code hook redirect SSRF, Claude Code isolation bypass). This represents a shift from post-hoc CVE fixes to proactive runtime trust boundaries — likely driven by enterprise adoption and compliance pressure.

**Context compaction is the new frontier.** Qwen Code's EOF/retained-tail media preservation, Codex's input_image payload bloating issue, OpenAI's compaction resurrecting completed work, and Kimi's 500K degradation threshold all point to context management as the next reliability battleground. Tools that handle long-running sessions gracefully will win the agentic-workflow market.

**MCP is winning but fragile.** The volume of MCP-related issues across every tool — leaks, discovery incompatibilities, OAuth failures, TLS rejection — suggests the protocol is ahead of its implementation quality. The tool that builds the most robust MCP runtime first will have a meaningful edge.

**Transparency demands are escalating.** Model attribution in JSON outputs (OpenCode), token usage breakdowns (Copilot), deterministic redaction (Gemini Auto Memory), and usage APIs (OpenCode at 126 👍) reflect a market that wants visibility into what agents are doing, spending, and remembering.

**Windows remains the weakest link for every vendor.** Apple Silicon dominates developer adoptions, so most tool teams test and ship for macOS first. But the consistency of Windows-specific complaints (IME, sandboxing, updaters, SSE hangs, WSL2 quirks) across all seven tools suggests a structural gap that no vendor has closed. This represents a competitive opportunity for the first tool that treats Windows as a first-class platform.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

## 1. Top Skills Ranking

1. **skill-creator fixes (PR #1298, #1323, #1261, #1099, #1050)** — [open](https://github.com/anthropics/skills/pull/1298). Not a single skill, but the dominant discussion topic: the `skill-creator` scripts' `run_eval.py` returns recall=0% on all queries, making the description-optimization loop optimize against noise. PRs propose fixes including installing the eval artifact as a real skill, isolating trigger-eval files from the live project registry, fixing Windows subprocess/PATHEXT/encoding issues, and correcting trigger detection. Status: all open, multiple independent reproductions (#556, #1169).

2. **ODT skill (PR #486)** — [open](https://github.com/anthropics/skills/pull/486). Creates, fills, reads, and converts OpenDocument files (.odt, .ods). Addresses the gap in document-format coverage beyond PDF/DOCX. Status: open since March, no maintainer response.

3. **document-typography skill (PR #514)** — [open](https://github.com/anthropics/skills/pull/514). Typographic quality control for generated documents: orphan word wrap, widow paragraphs, numbering misalignment. Targets universal problems in AI-generated documents ("Users rarely ask for good typography" implies Claude should handle it proactively). Status: open.

4. **self-audit skill (PR #1367)** — [open](https://github.com/anthropics/skills/pull/1367). Audits AI output before delivery: mechanical file verification (every claimed output file exists) followed by a four-dimension reasoning audit in damage-severity order. Claims to work with any project/stack/model. Status: open, pair proposal in #1385 for a three-gate quality pipeline.

5. **testing-patterns skill (PR #723)** — [open](https://github.com/anthropics/skills/pull/723). Comprehensive testing stack coverage: Testing Trophy model, unit testing (AAA, naming, pure functions), React component testing with Testing Library. Status: open.

6. **color-expert skill (PR #1302)** — [open](https://github.com/anthropics/skills/pull/1302). Color naming systems (ISCC-NBS, Munsell, XKCD, RAL), color-space selection tables (OKLCH for scales, OKLAB for gradients, CAM16), for any color-related task. Status: open, recently updated.

7. **pyxel skill (PR #525)** — [open](https://github.com/anthropics/skills/pull/525). Retro/pixel-art/8-bit game development with the Pyxel engine via pyxel-mcp. Covers write → run_capture → inspect → iterate workflow. Status: open.

8. **plan-file-hygiene skill (PR #1479)** — [open](https://github.com/anthropics/skills/pull/1479). Addresses planning-artifact accumulation: planning files have no lifecycle, so this skill enforces hygiene. Built from issue #1417 discussion. Status: open, recently created.

## 2. Community Demand Trends

- **Trust-boundary security (Issue #492, 43 comments)** — [open](https://github.com/anthropics/skills/issues/492). Community skills distributed under the `anthropic/` namespace impersonate official skills, creating a privilege-escalation vector. The single most-commented issue; demand is for namespace/packaging governance, not a new skill.
- **Org-wide skill sharing (Issue #228, 16 comments)** — [open](https://github.com/anthropics/skills/issues/228). Users want shared skill libraries/direct share links instead of manual .skill file downloads and uploads.
- **Reliable skill evaluation (Issues #556, #1169, #1061, 18 combined comments)** — the skill-creator eval loop is broken cross-platform, so no one can trust their skill descriptions are optimized. Demand: working tooling, not new skills.
- **Skill proposal process legitimacy (Issue #1329, 9 comments)** — [open](https://github.com/anthropics/skills/issues/1329). Contributors asking whether external skill contributions are welcome, and proposing concrete skills (compact-memory symbolic notation for agent state) — signals demand for a clear contribution pipeline.
- **Duplicate skills across plugins (Issue #189, 6 comments, 9 👍)** — [open](https://github.com/anthropics/skills/issues/189). Installing both `document-skills` and `example-skills` yields identical skills, bloating context. Demand: dedup/curation.
- **Context-window safety (Issue #1487, 4 comments)** — [open](https://github.com/anthropics/skills/issues/1487). The `claude-api` skill injects ~156k tokens in one call, exhausting context. Demand: skills must be size-aware.
- **Meta-quality skills (Issue #1385, 4 comments)** — [open](https://github.com/anthropics/skills/issues/1385). Reasoning-gate pipelines (pre-task calibration → adversarial review → delivery verification) to audit both Claude's output and the skill's own behavior.

## 3. High-Potential Pending Skills

- **self-audit (PR #1367)** — active, recent, with a follow-on pipeline proposal in #1385. The mechanical-verification-first approach is simple and universally applicable; likely to land or spawn a maintainer variant.
- **plan-file-hygiene (PR #1479)** — created July 25, addresses a named problem (#1417) with multiple credited contributors. Fast-moving, fresh.
- **testing-patterns (PR #723)** — broad coverage of a universal need; no competition in the repo; may land if maintainers review.
- **color-expert (PR #1302)** — recently updated, self-contained, by an author with clear expertise; good chance of merging.
- **ODT (PR #486)** — fills a format gap (LibreOffice ecosystem) that official document skills don't cover; open since March, may get picked up.
- **pyxel (PR #525)** — niche but polished, with real user base behind Pyxel; open since March with recent activity.

## 4. Skills Ecosystem Insight

The community's most concentrated demand is for **trustworthy, verifiable skill tooling** — specifically, reliable skill evaluation/optimization pipelines and security governance around the `anthropic/` namespace — ahead of any individual new skill direction.

---

# Claude Code Community Digest — 2026-08-05

## Today’s Highlights
v2.1.222 ships a security fix closing an isolation bypass where worktree subagents could run destructive git commands against the main checkout, along with a hook-restriction bypass in background tasks. Community attention remains concentrated on three long-running fronts: Fable 5 model access/entitlement problems, SSE streaming hangs on Windows, and an OAuth loop on Linux/IntelliJ. A wave of plugin-dev tooling pull requests (frontmatter parsing, hook-decision assertions, dependency validation) signals maturing investment in the plugin ecosystem.

## Release — v2.1.222
- Fixed worktree-isolated sessions and their subagents being able to run destructive git commands against the main checkout; isolation now applies to file edits and Bash in every session type.
- Fixed PreToolUse auto-allow hooks bypassing tool restrictions in background agent tasks.
- [View release](https://github.com/anthropics/claude-code/releases)

## Hot Issues

1. **[#79337 — Fable 5 prompts 'usage credits required' on Max plan; silently downgrades to Opus 4.8](https://github.com/anthropics/claude-code/issues/79337)** (61 comments, 21 👍)  
   Long-running entitlement bug since Fable 5 became standard on Max (2026-07-20). Sessions are downgraded without clear consent; community frustration is high and the issue remains open with no acknowledged fix.

2. **[#33949 — SSE streaming hangs indefinitely (no timeout); ESC cannot fully cancel](https://github.com/anthropics/claude-code/issues/33949)** (38 comments, 24 👍)  
   A deep-dive community analysis of a long-standing Windows issue with proposed root-cause patches. Recurring theme of stream cancellation and queue auto-restart; ongoing demand for maintainer triage.

3. **[#77966 — OAuth login loop; state parameter dropped after redirect](https://github.com/anthropics/claude-code/issues/77966)** (23 comments, 15 👍)  
   Linux/IntelliJ users cannot complete `/login`; redirect loop persists across recent versions, blocking CLI usage for affected users.

4. **[#54394 — Embedded ugrep amplifies regex backtracking into V8-heap OOM (8 GB ceiling)](https://github.com/anthropics/claude-code/issues/54394)** (22 comments)  
   WSL2 hosts freeze when grep invocations route through embedded ugrep; memory ceiling leads to host instability, not just process crash.

5. **[#80444 — Windows desktop app GPU-process crash leaves MSIX package unlaunchable](https://github.com/anthropics/claude-code/issues/80444)** (20 comments)  
   Crash via in-app Browser tab requires full Repair install; reproducible across drivers. Packaging-level instability erodes trust in the desktop channel.

6. **[#57853 — Bun 1.3.14 JSC GC segfault (SlotVisitor::drain) on AMD Ryzen 5 / Linux baseline](https://github.com/anthropics/claude-code/issues/57853)** (18 comments)  
   Reports identical platform binaries crashing on x86_64_baseline; users suspect packaging/compilation-target mismatch for older CPUs.

7. **[#48949 — Persistent always-on Remote Control option for desktop app](https://github.com/anthropics/claude-code/issues/48949)** (13 comments, 28 👍)  
   CLI honors `remoteControlAtStartup`; desktop ignores it. Highest 👍 count in this set — a concrete UX parity gap that users want fixed upstream.

8. **[#74113 — Background agents go idle without delivering final SendMessage report](https://github.com/anthropics/claude-code/issues/74113)** (8 comments, 7 👍)  
   Re-ping recovers the report but automation stalls silently. Impacts CI-like usage of background agents.

9. **[#81077 — PostToolUse additionalContext re-serialized between turns, invalidating prompt cache](https://github.com/anthropics/claude-code/issues/81077)** (2 comments)  
   Hook-returned context changes shape across turns, destroying cache effectiveness and adding token cost.

10. **[#84024 — OTEL_EXPORTER_OTLP_HEADERS not applied to traces exporter (enhanced telemetry beta)](https://github.com/anthropics/claude-code/issues/84024)** (CLOSED)  
    Closed quickly, but symptomatic of the broader cluster of OTLP/telemetry configuration issues filed this week (see also #82092).

---

## Key PR Progress

1. **[#84004 — fix(plugin-dev): limit frontmatter parsing](https://github.com/anthropics/claude-code/pull/84004)**  
   Parses only the opening YAML frontmatter block; prevents body horizontal rules from being misinterpreted as markers.

2. **[#84003 — fix(scripts): propagate top-level failures](https://github.com/anthropics/claude-code/pull/84003)**  
   Duplicate-maintenance scripts now return failing process status instead of resolving silently after `.catch(console.error)`.

3. **[#83999 — fix(scripts): validate gh flag values](https://github.com/anthropics/claude-code/pull/83999)**  
   Rejects incomplete `gh` wrapper commands (e.g., `gh issue list --limit`) that previously bypassed argument validation.

4. **[#83995 — fix(scripts): validate label option values](https://github.com/anthropics/claude-code/pull/83995)**  
   Prevents unbound-variable errors in `--add-label`/`--remove-label` handling and stops consuming the next positional as a value.

5. **[#83993 — fix(scripts): reject self-referential duplicates](https://github.com/anthropics/claude-code/pull/83993)**  
   Stops `comment-on-duplicates.sh` from proposing an issue as a duplicate of itself — prevents automation feedback loops.

6. **[#83992 — fix(plugin-dev): assert expected hook decision](https://github.com/anthropics/claude-code/pull/83992)**  
   `test-hook.sh` gains `--expect allow|deny|ask`; catches hooks that allow operations they were intended to deny. Fixes #83800.

7. **[#83990 — fix(plugin-dev): report missing jq dependency](https://github.com/anthropics/claude-code/pull/83990)**  
   Distinguishes "jq not installed" from "invalid JSON" in `test-hook.sh`. Fixes #83802.

8. **[#83890 — Create pylint.yml](https://github.com/anthropics/claude-code/pull/83890)**  
   Adds a Pylint CI workflow; no description provided — likely a linting baseline for the repository.

9. **[#83374 — docs(plugin-dev): document MessageDisplay streaming semantics](https://github.com/anthropics/claude-code/pull/83374)**  
   Documents the `MessageDisplay` hook event, which was missing from trigger descriptions and quick-reference tables in the bundled skill.

10. **[#83738 — Fix/83484 symlink path expansion](https://github.com/anthropics/claude-code/pull/83738)**  
    Corrects `claude install` on some Linux setups where `~/.local/bin/claude` became a broken symlink pointing to literal `%h/...` instead of the expanded home path.

---

## Feature Request Trends

- **Desktop ↔ CLI parity for remote control**: Multiple issues (#48949, #60356, #83933) demand that desktop app settings apply to spawned CLI sessions — the single highest-👍 request cluster this week.
- **Batch review of suggested-task chips**: Users want to review/accept/reject a batch of suggestions before applying, rather than individually (#84037).
- **Connector reliability (Notion, GitHub)**: Fresh reports of OAuth failures and inconsistent tool exposure across machines on different app versions (#84019, #84025, #84039) — hardening the connector layer is a clear direction.

---

## Developer Pain Points

- **Fable 5 entitlement & false-positive safety classifiers**: Users on Max are being downgraded or blocked without clarity (#79337, #67937). Triggering on benign networking terminology undermines trust in model selection and safety logic.
- **Streaming and cancellation unreliability**: Indefinite SSE hangs and non-cancellable queues keep resurfacing across platforms (#33949); background agents stalling without final reports remains a chronic issue (#74113, #75036).
- **Telemetry configuration dead-ends**: OTLP headers are inconsistently applied, and the apps gateway omits `otlpHeaders` on its own telemetry endpoint — every flush is rejected (#84024, #82092). Users enabling enhanced telemetry hit immediate friction.
- **Memory/CPU-bound regressions from embedded tools**: The ugrep wrapper route can escalate a simple grep into an 8 GB V8-heap OOM (#54394); Bun baseline GC segfaults on Ryzen-class hardware (#57853) — a reminder that native tool replacement carries real resource risk.
- **Update/packaging fragility on Windows**: MSIX updater failures with file-lock and stale-retry races (#84005), plus GPU-process crashes bricking the package until repair (#80444) — update channels remain a stability weak spot.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-08-05

## Today's Highlights
The Codex team shipped a rapid-fire sequence of `rust-v0.147.0-alpha` releases while landing a substantial batch of internal PRs focused on plugin runtime boundaries, tool collision detection, and MCP process lifecycle hardening. Community attention remains focused on a long-running conversation-ordering bug (#8648) and a thread-scoped MCP server process leak that continues to accumulate significant memory pressure (#30408). Meanwhile, newly filed issues point to a fresh wave of resource-consumption complaints on both macOS and Windows Desktop variants.

## Releases
Multiple `rust-v0.147.0-alpha` builds were published in the last 24 hours, with no detailed release notes beyond version identifiers:
- **rust-v0.147.0-alpha.7**
- **rust-v0.147.0-alpha.6.4**
- **rust-v0.147.0-alpha.6.3**
- **rust-v0.147.0-alpha.6.1**

## Hot Issues
1. **Codex replies to earlier messages instead of latest one in conversations** ([#8648](https://github.com/openai/codex/issues/8648)) — Long-standing bug with 81 comments and 58 upvotes; the assistant frequently responds to a stale message in multi-message threads, causing confusion and workflow disruption. Still open after 7+ months.

2. **MCP server processes leak: per-thread processes never cleaned up (9+ GB RSS)** ([#30408](https://github.com/openai/codex/issues/30408)) — Desktop app-server spawns full MCP server sets per thread and never reaps them on archive/close; reported at 9+ GB RSS. High-priority performance concern with 6 upvotes.

3. **Unable to install after clicking Update in the Codex app today** ([#37002](https://github.com/openai/codex/issues/37002)) — Fresh macOS 12 report of a broken update path with no version information available; 16 comments within the first day, indicating an active release regression.

4. **Windows unelevated sandbox rejects enforceable split writable roots, breaking apply_patch updates and deletes** ([#35864](https://github.com/openai/codex/issues/35864)) — Includes a proposed bugfix; native Windows CLI `apply_patch` fails under restricted-token sandbox due to filesystem override compatibility checks. Affects the core edit workflow on Windows.

5. **`/side` chats are expiring too quickly; expiration behavior is opaque** ([#25233](https://github.com/openai/codex/issues/25233)) — Ephemeral chats vanish faster than expected with no visibility into the expiration policy; 18 upvotes signal broad frustration with session lifecycle management.

6. **Local compaction v2 retains unbounded input_image payloads, causing repeated auto-compaction** ([#33493](https://github.com/openai/codex/issues/33493)) — Image-heavy threads enter a repeated auto-compaction cycle because images are never dropped; leads to performance degradation and context churn.

7. **macOS Codex Desktop runaway task worker and app-server consume 12+ GB RAM with sustained high CPU** ([#36971](https://github.com/openai/codex/issues/36971)) — Freshly filed; task worker hit 5.5 GB RSS while app-server consumed 7.0–7.3 GB RSS at 160–200% CPU during ordinary local tasks. Worrisome pattern emerging alongside #30408 and #35485.

8. **Windows Desktop: bundled node_repl MCP processes leak one-per-thread, never reaped until app-server exit** ([#35485](https://github.com/openai/codex/issues/35485)) — Confirms the MCP leak pattern on Windows with `node_repl.exe`; per-thread processes accumulate until shutdown, echoing #30408.

9. **Codex App: Goal compaction resurrects completed manual steer before goal continuation resumes** ([#29811](https://github.com/openai/codex/issues/29811)) — In long-running `/goal` sessions, completed manual steering instructions reappear after compaction, causing the agent to redo work already finished.

10. **MCP servers start but tools never cached (`has_cached_tools=false`)** ([#32574](https://github.com/openai/codex/issues/32574)) — On Windows 10 with a custom model provider, all 12 MCP servers start successfully (94 tools) but the cache flag never flips to true, so tools are never exposed to the model.

## Key PR Progress
1. **Enforce Agent Plugin runtime boundaries** ([#37027](https://github.com/openai/codex/pull/37027)) — Applies format-specific capability isolation across plugin, skill, and MCP loading; restricts skill discovery to direct children and excludes app/hook capabilities.

2. **Canonicalize default tools under the `functions` namespace** ([#37022](https://github.com/openai/codex/pull/37022)) — Consolidates top-level and custom tool definitions into a single `functions` namespace for Responses Lite providers, normalizing missing/empty/explicit variants.

3. **Enforce strict tool name collision errors** ([#37020](https://github.com/openai/codex/pull/37020)) — Tracks the first duplicate effective tool name and fails fast when `error_on_tool_collisions` is enabled — a meaningful step toward deterministic tool resolution.

4. **Keep shared skill caches fresh across plugin loads** ([#37000](https://github.com/openai/codex/pull/37000)) — Keys cached skill snapshots by filesystem + plugin snapshot identity and coalesces concurrent loads, preventing stale plugin data reuse.

5. **Support deferred custom tools in tool search** ([#36998](https://github.com/openai/codex/pull/36998)) — Freeform tools are now indexed for tool search, serialized as `custom` tools via the Responses API, then converted back to executable specs after discovery.

6. **Support `includeTurns` reads for paginated threads** ([#36993](https://github.com/openai/codex/pull/36993)) — Reconstructs full projected turns from paginated history for clients requiring legacy full-history reads with `includeTurns: true`.

7. **Add opt-in concurrent exec-server request dispatch** ([#36987](https://github.com/openai/codex/pull/36987)) — New `--concurrent-requests` flag prevents long-running requests from blocking health checks and cleanup on the same connection.

8. **Enable remote compaction for Amazon Bedrock** ([#36981](https://github.com/openai/codex/pull/36981)) — Adds provider-owned v1/v2 compaction capabilities and pins Bedrock to the v1 protocol path, enabling manual/automatic `compact` via `/v1/responses/compact`.

9. **Make token budget context identity configurable** ([#36970](https://github.com/openai/codex/pull/36970)) — New `features.token_budget.mode` setting with `thread` and `name` values; defaults to thread ID while allowing agent-name retention via config.

10. **Skip symlinks when installing plugins** ([#36967](https://github.com/openai/codex/pull/36967)) — Ignores symlinks and non-file entries during plugin installation instead of rejecting the whole install — a pragmatic fix for common packaging patterns.

## Feature Request Trends
- **Subagent routing and configuration** — Multiple issues (#14039, #32418, #31738) request per-subagent model/provider/profile selection, plus reusable Claude Code-style subagent types in MultiAgentV2. The community consistently wants finer-grained control over spawned agents.
- **MCP app end-to-end support** — Issues #21019, #28912, and #16783 all call for the Desktop GUI to fully render MCP app inline resources (`mcp_app_resource_uri` hydration) and expose plugin marketplace UI that already exists in the CLI.
- **Session/context transparency** — Requests for global search across threads (#16672), token usage breakdowns (#13222), and clearer `/side` expiration semantics (#25233) indicate a broader desire for observability and control over conversation state.
- **Windows feature parity** — Full native Computer Use on Windows (#19305) and UTF-8 output enforcement (#4013) remain popular, with the Computer Use request drawing 41 upvotes.

## Developer Pain Points
- **MCP process lifecycle** — The dominant theme this week: per-thread MCP server processes are never reaped, causing multi-GB memory leaks across macOS (#30408, #36971) and Windows (#35485). This is now a three-front production stability issue.
- **Conversation ordering and context integrity** — The stale-reply bug (#8648) remains the single most-commented issue, and compaction bugs that resurrect completed work (#29811, #33493) erode trust in long-running sessions.
- **Windows sandbox and encoding friction** — Unelevated sandbox restrictions breaking `apply_patch` (#35864), forced UTF-8 issues (#4013), and MCP tool caching failures (#32574) continue to make Windows a second-class platform experience.
- **Release/update instability** — A freshly filed update failure (#37002) landed within hours of the new alpha train, suggesting release-candidate quality issues; Desktop cannot be installed via the in-app updater on macOS 12.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-08-05

## Today's Highlights
Security hardening dominates this week's PR activity, with two critical fixes addressing an SSRF vulnerability in `web-fetch.ts` and a command-injection bypass in bash/PowerShell substitution detection (GHSA-wpqr-6v78-jr5g). On the issue side, the community remains most vocal about subagent reliability—particularly false "success" reports when hitting `MAX_TURNS` limits and generalist agent hangs—alongside persistent browser-agent failures in Wayland environments and a new report that sessions killed mid-turn are never persisted in ACP mode.

## Releases
No new releases in the last 24 hours.

## Hot Issues

1. **[#22323 — Subagent recovery after MAX_TURNS reported as GOAL success](https://github.com/google-gemini/gemini-cli/issues/22323)** — `codebase_investigator` subagents report `status: "success"` with `Termination Reason: "GOAL"` even when they hit the turn limit before doing any work. This masks real failures and undermines trust in subagent outcomes; 12 comments, maintainer-labeled p1.

2. **[#21409 — Generalist agent hangs indefinitely](https://github.com/google-gemini/gemini-cli/issues/21409)** — Simple tasks like folder creation hang forever when deferred to the generalist agent; users report waiting up to an hour. Workaround: explicitly instructing the model not to use subagents. 8 comments, 8 👍, p1.

3. **[#24353 — Robust component-level evaluations (EPIC)](https://github.com/google-gemini/gemini-cli/issues/24353)** — Follow-up to the behavioral evals initiative; tracks expansion from 76 tests across 6 Gemini models. Signals the team's investment in systematic eval infrastructure. 7 comments.

4. **[#22745 — Assess AST-aware file reads, search, and mapping (EPIC)](https://github.com/google-gemini/gemini-cli/issues/22745)** — Investigates whether AST-aware tools could reduce token noise, align reads to method bounds, and improve codebase navigation. 7 comments.

5. **[#21968 — Gemini doesn't use skills and sub-agents enough](https://github.com/google-gemini/gemini-cli/issues/21968)** — Anecdotal but widely echoed: the model ignores custom skills (e.g., gradle, git) unless explicitly instructed. 6 comments.

6. **[#26522 — Auto Memory retries low-signal sessions indefinitely](https://github.com/google-gemini/gemini-cli/issues/26522)** — Sessions are only marked processed when the extraction agent reads them; low-signal sessions get re-surfaced repeatedly, wasting model calls. 5 comments.

7. **[#26525 — Add deterministic redaction and reduce Auto Memory logging](https://github.com/google-gemini/gemini-cli/issues/26525)** — Transcript content is sent to the extraction model before the redaction prompt runs; secrets may already be in model context, and the service logs existing skill content. 4 comments.

8. **[#25166 — Shell command execution stuck on "Waiting input" after completion](https://github.com/google-gemini/gemini-cli/issues/25166)** — Simple CLI commands hang with the shell shown as active despite completion. 4 comments, 3 👍, p1.

9. **[#28693 — ACP: session killed mid-turn is never persisted](https://github.com/google-gemini/gemini-cli/issues/28693)** — New report: `session/load` returns "No previous sessions found" after SIGKILL/OOM/crash despite advertising `loadSession: true`. Context loss on crash is a reliability gap for ACP integrations. 1 comment.

10. **[#21983 — Browser subagent fails in Wayland](https://github.com/google-gemini/gemini-cli/issues/21983)** — Persistent Wayland compatibility failure; subagent terminates with `GOAL` reason but no actual work done. 4 comments, p1.

## Key PR Progress

1. **[PR #28691 — Block $VAR/${VAR} expansion bypass (GHSA-wpqr-6v78-jr5g)](https://github.com/google-gemini/gemini-cli/pull/28691)** — Fixes incomplete checks in `detectBashSubstitution()` and `detectPowerShellSubstitution()`; adds defense-in-depth to the issue-dedup workflow. p1/security, size/l.

2. **[PR #28557 — Resolve SSRF vulnerability in web-fetch.ts](https://github.com/google-gemini/gemini-cli/pull/28557)** — Migrates from synchronous `isPrivateIp()` to async DNS resolution so hostnames resolving to internal ranges (e.g., `169.254.169.254`) no longer bypass validation. p1/security.

3. **[PR #28694 — Handle npm dist-tag deletion failures](https://github.com/google-gemini/gemini-cli/pull/28694)** — Nightly releases crash when registries (like Wombat Dressing Room) return 403 on tag deletion; adds fallback handling. p1, size/s.

4. **[PR #28672 — Repair /compress session reload and quota-fallback response loss](https://github.com/google-gemini/gemini-cli/pull/28672)** — Fixes two bugs: `/compress` failing with "Failed to load resumed session data," and quota-limit errors corrupting tool responses. Core/agent areas, size/m–l.

5. **[PR #28671 — Resolve context corruption and quota error fallback issues](https://github.com/google-gemini/gemini-cli/pull/28671)** — Defensive history hardening to prevent "autocomplete" prefix-continuation when tool executions are interrupted (ESC queries, quota fallbacks). Core/CLI.

6. **[PR #28689 — Unwrap nested gaxios streaming errors](https://github.com/google-gemini/gemini-cli/pull/28689)** — Robust fallback to parse structured errors (rate limits, capacity exhaustion) buried in `error.cause.message`; improves streaming error surfacing.

7. **[PR #28641 — Prevent ghost text wrapping infinite loop at narrow widths](https://github.com/google-gemini/gemini-cli/pull/28641)** — Fixes a hang in `InputPrompt.tsx` when `inputWidth` is narrower than a single CJK/emoji codepoint; includes regression test. Fixes #19985.

8. **[PR #28688 — Dynamically resolve Cloud Workstations proxy redirect URI](https://github.com/google-gemini/gemini-cli/pull/28688)** — OAuth flows fail on Cloud Workstations because redirects are statically bound to `localhost`; now resolves dynamically for the VM proxy. Security, size/m–l.

9. **[PR #28664 — Reflect full MCP server config in consent and harden stdio env](https://github.com/google-gemini/gemini-cli/pull/28664)** — Consent prompts previously omitted `env`, `cwd`, and `headers`; now shown and compared to determine re-prompting on updates.

10. **[PR #28639 — Guard formatTruncatedToolOutput against non-positive maxChars](https://github.com/google-gemini/gemini-cli/pull/28639)** — `maxChars <= 0` previously inflated output ~2x via negative-index `slice` behavior; adds regression tests. p1/core, size/s.

## Feature Request Trends

- **AST-aware code intelligence**: Multiple EPICs (#22745, #22746) push toward AST-based file reads, search, and codebase mapping to reduce token noise and misaligned reads—potentially replacing or augmenting the `codebase_investigator`.
- **Component-level evaluation infrastructure**: #24353 signals an internal push to expand behavioral evals well beyond the current 76 tests, focusing on component-level coverage.
- **Subagent self-awareness and control**: Requests for Gemini to *use* skills/subagents proactively (#21968), plus mechanism to *prevent* subagent use when disabled (#22093), indicate users want finer-grained agent delegation control.
- **Resilient browser agent**: Session takeover, lock recovery (#22232), and config override support (#22267) show demand for a more robust headless browser experience.
- **ACP session durability**: Two issues (#27913, #28693) highlight that session load/persistence is broken or incomplete for ACP consumers.

## Developer Pain Points

- **False success reporting**: Subagents hitting `MAX_TURNS` are reported as `GOAL` success, hiding real failures and making debugging harder (#22323, #21763).
- **Hangs and freezes**: Generalist agent hangs (#21409) and shell "Waiting input" deadlocks (#25166) are high-impact reliability killers that erode trust.
- **Skill/subagent adoption**: The model rarely uses custom skills or subagents unless explicitly forced, limiting the value of user-configured tooling (#21968).
- **Memory system overhead**: Auto Memory spams low-signal sessions (#26522) and sends secrets to model context before redaction (#26525) — reliability and security concerns in one area.
- **Security regressions**: Two active CVEs/GHSAs being patched this week (variable expansion bypass, SSRF) highlight a pattern of incomplete validation gates needing iterative hardening.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**GitHub Copilot CLI Community Digest – 2026-08-05**

---

## Today's Highlights

Two patch releases (v1.0.79-1, v1.0.79-2) landed with UI refinements and a breaking rename of the `allowDevToolCaches` sandbox setting. Community attention remains on MCP reliability—new reports surface OAuth 3LO failures, FastMCP `server/discover` incompatibility, and TLS rejections of private CAs on macOS—while long-running requests for custom themes, session forking, and cloud sync continue to accumulate votes.

---

## Releases

**v1.0.79-2** — Improved
- Pinned prompt moved one row higher, reusing the row reserved by the tab bar; saves one timeline row and better preserves the prompt's shape.
- Pinned prompt is now off by default on terminals under 30 rows to avoid crowding output (controlled via `pinnedPrompts` setting).

**v1.0.79-1** — Improved
- **Breaking:** Sandbox setting `allowDevToolCaches` renamed to `allowDevToolAccess` (now covers dev-tool config and registries, not just caches). The old key is silently ignored; an existing `false` opt-out reverts to the default (on)—you must rename it in settings.

---

## Hot Issues (10 of 42 active)

1. **[#1504 – Add custom theme support](https://github.com/github/copilot-cli/issues/1504)** · 23 👍 · 8 comments
   Community wants user-defined, shareable themes (e.g., JSON) via `/theme`. High vote count suggests strong demand for personalization.

2. **[#1697 – Session forking into parallel sessions with shared context](https://github.com/github/copilot-cli/issues/1697)** · 25 👍 · 3 comments
   Request to branch a conversation at a junction point, preserving context across parallel sessions. Has the highest upvote count among open feature requests.

3. **[#1285 – Organisation-level Agent not showing up](https://github.com/github/copilot-cli/issues/1285)** · 9 👍 · 7 comments
   `{org}/.github-private` agents not surfaced in CLI or VS Code. Enterprise users report onboarding friction.

4. **[#4328 – Ctrl+H misread as Ctrl+Backspace under WSL2](https://github.com/github/copilot-cli/issues/4328)** · 0 👍 · 5 comments
   `WT_SESSION` env leak from Windows Terminal causes wrong keybinding behavior—delete-previous-character becomes delete-word.

5. **[#4370 – MCP init fails when `server/discover` returns `-32602`](https://github.com/github/copilot-cli/issues/4370)** · 1 👍 · 2 comments
   FastMCP servers don't implement `server/discover`; CLI treats the `-32602` response as fatal. Affects a large MCP ecosystem segment.

6. **[#4371 – MCP OAuth 3LO fails with -32042](https://github.com/github/copilot-cli/issues/4371)** · 0 👍 · 0 comments
   OAuth Authorization Code flow fails because the client doesn't support URL elicitation. Newly filed; likely to gain traction given MCP gateway adoption.

7. **[#4005 – Copilot billing entity isn't selected](https://github.com/github/copilot-cli/issues/4005)** · 3 👍 · 4 comments
   Memory saving broken for enterprise users: "Copilot billing entity isn't selected" despite everything else working. Regression in 1.0.65.

8. **[#4202 – Built-in view reports "Path does not exist" for existing files](https://github.com/github/copilot-cli/issues/4202)** · 1 👍 · 4 comments
   Regression in 1.0.72/1.0.73; isolated SDK probe succeeds, CLI fails. Core file-viewing tool broken for affected users.

9. **[#4364 – Enterprise MCP registry unreachable on macOS: rustls rejects private CA](https://github.com/github/copilot-cli/issues/4364)** · 0 👍 · 0 comments
   Apple error `-67901` from private CA; CLI fail-closed blocks all MCP. Blocks enterprise MCP adoption on macOS entirely.

10. **[#4361 – Plugin skill slash commands no longer work; client fires doomed RPC](https://github.com/github/copilot-cli/issues/4361)** · 0 👍 · 1 comment
    Regression: `/plugin-skill-name` now invokes `session.commands.invoke` RPC instead of natural-language rewrite; fails at the CLI level.

---

## Key PR Progress

Two PRs are open; only two were updated in the last 24 hours. Both require attention:

1. **[#4366 – Action required: fundamental security findings resolution](https://github.com/github/copilot-cli/pull/4366)** — Vault app security finding remediation; needs review and merge. Blocks security compliance.

2. **[#4355 – Merge (title only)](https://github.com/github/copilot-cli/pull/4355)** — Untitled/unscoped PR; likely a stray commit or test PR from the community.

> **Note on PR volume:** The data source returned only 2 open PRs updated in the last 24h. Both lack meaningful feature or fix context—no active community contributions, bug fixes, or feature implementations are visible in this window.

---

## Feature Request Trends

- **Customization & theming** (#1504, #3898): Custom themes, better OSC 11 handling, and accessibility-driven theming remain top community asks.
- **Session persistence & continuity** (#1697, #1947, #1343, #2019, #2532): Session forking, cloud-synced sessions, remote status/heartbeat, session deletion, and persistent context/usage bar all cluster around making sessions more portable and observable.
- **BYOK and model flexibility** (#4139, #4196): Bring-your-own-model support and fixes for BYOK streaming deltas (`reasoning_content`) are recurring asks for enterprise flexibility.
- **Plugin lifecycle management** (#1709, #4048): Auto-updating plugins and plugin skills surfacing as slash commands continue to gain support (29 👍 on auto-update).
- **Memory/context controls** (#2532, #3859): Users request finer-grained control of memory and persistent token/context visibility.

---

## Developer Pain Points

- **MCP integration is the #1 source of friction:** `server/discover` incompatibility (#4370), OAuth 3LO URL elicitation (#4371), private CA TLS rejection on macOS (#4364), enterprise registry unreachability (#4364), and Web Search MCP server errors (#2692) all degrade MCP workflows.
- **Enterprise configuration fail-closed behavior:** Managed settings policy rejects valid enum values (e.g., `"enable"`) and blocks all local/custom MCP servers (#4349). Platform-wide outages for enterprise users.
- **Regression-prone file/tool operations:** Built-in `view` reports "Path does not exist" for existing files (#4202); plugin skill slash commands broken (#4361); stashed prompts discarded on session switch (#4334).
- **Windows/WSL2 input quirks:** Ctrl+H misinterpreted (#4328) and persistent native-runtime crashes across multiple versions (#4026, unresolved since May 2026) erode trust in Windows support.
- **Silent config breaking changes:** The `allowDevToolCaches` → `allowDevToolAccess` rename silently ignores old keys, reverting explicit opt-outs to default-on (#release notes). Community flags this as a sharp edge for security-conscious users.

---

*Digest generated from GitHub data for github/copilot-cli on 2026-08-05.*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI Community Digest - 2026-08-05

## Today's Highlights

The community is actively debating the long-awaited **Memory System** (#1283) and **Remote Control** (#1282) features, with extensive design discussions and strong demand signals (24 👍 on remote control). A critical bug report surfaced today (#2587) indicating abnormal session exits on Windows during normal use, which may require immediate attention. The ACP protocol continues to mature with new PRs supporting permission mode switching (#2364) and model advertisement/switching (#2583).

## Releases

No new releases in the last 24 hours.

## Hot Issues

1. **[#1283 - Feature Request: Memory System - Persistent context across sessions](https://github.com/MoonshotAI/kimi-cli/issues/1283)**
   The most active discussion thread (17 comments) covering a comprehensive memory system with automatic AI-managed notes and manual user-defined instructions. Community is actively discussing design trade-offs between automatic capture and user control.

2. **[#1282 - Feature Request: Remote Control - Continue local sessions from any device](https://github.com/MoonshotAI/kimi-cli/issues/1282)**
   Highest community demand (24 👍) for phone/tablet/browser session continuity. Addresses a core workflow gap when developers step away from their desks.

3. **[#2586 - Agent reliability degrades at high context fill (~500K tokens observed)](https://github.com/MoonshotAI/kimi-cli/issues/2586)**
   Critical reliability report: at ~500K tokens context fill, agents fall into repetitive action loops, experience instruction drift, and fail to escalate. This is a documented operator-measured threshold, not a documented limit, making it especially concerning for long-running agentic workflows.

4. **[#2587 - kimi cli will exit abnormally when advancing the session normally](https://github.com/MoonshotAI/kimi-cli/issues/2587)**
   New bug report (created today) on Kimi Code v0.29.2 with K3 high model on Windows. Unexpected session exits during normal operation—potentially a regression requiring urgent triage.

5. **[#2584 - Thai (and other IME-based) characters duplicated when typing on Windows](https://github.com/MoonshotAI/kimi-cli/issues/2584)**
   Text input bug on Windows 11 causing duplicated characters with IME-based input methods. Affects a significant set of non-Latin script users.

6. **[#2583 - feat(acp): advertise available models and support mid-session model switching](https://github.com/MoonshotAI/kimi-cli/issues/2583)**
   ACP protocol gap: clients like Zed and mobile apps cannot discover available models or switch mid-session. Blocks a more flexible agent-client ecosystem.

## Key PR Progress

1. **[#2200 - fix(shell): adapt timeouts for long commands](https://github.com/MoonshotAI/kimi-cli/pull/2200)**
   Auto-extends shell timeouts for slow operations (git submodule cleanup, clone/fetch, package installs, builds) while keeping 60s default for normal commands. Addresses a common source of flaky failures.

2. **[#2585 - feat(cli): set AI_AGENT for subprocesses](https://github.com/MoonshotAI/kimi-cli/pull/2585)**
   Exposes a universal `AI_AGENT=kimi` marker to subprocesses from both pip/uv and binary entrypoints, preserving explicit overrides. Enables downstream tooling to detect Kimi agent context.

3. **[#2364 - feat(acp): support permission mode switching](https://github.com/MoonshotAI/kimi-cli/pull/2364)**
   Protocol-level ACP permission mode switching for Kimi sessions. Stacks on #2363—advertises `default` permission modes, enabling finer-grained control from ACP clients.

## Feature Request Trends

- **Session Memory & Continuity**: Strong and persistent demand (from February, still heavily discussed) for persistent memory (#1283) and cross-device session continuation (#1282). Combined, these represent a push toward a more "assistant-like" persistent workspace.
- **ACP Protocol Expansion**: Multiple threads (#2583, #2364) seek to enrich the ACP protocol: model discovery, mid-session model switching, and permission mode switching. The trajectory is toward Kimi as a first-class citizen in a broader agent-client ecosystem (e.g., Zed, mobile apps).
- **Context Window Reliability**: The ~500K token reliability degradation report (#2586) suggests users are pushing context limits and expecting graceful behavior (escalation, summarization, or compaction) rather than silent failure.

## Developer Pain Points

- **Windows-Specific Instability**: Recurring Windows issues—abnormal session exits (#2587) and IME character duplication (#2584)—suggest platform-specific QA gaps on Windows 10/11.
- **Reliability at Scale**: The high-context degradation (#2586) with repetitive loops and instruction drift undermines trust in long-running agentic workflows. Developers expect predictable behavior or at least explicit warnings/escalation.
- **Session Mobility**: The inability to resume a session from another device (#1282) and lack of persistent memory (#1283) force developers to either stay at their desk or lose context, a significant friction point for remote/mobile workflows.
- **Command Timeout Flakiness**: Long-running shell commands (git operations, builds) hitting hard 60s timeouts (#2200) continue to cause false failures in complex repositories.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-08-05

## Today's Highlights
Release v1.18.13 ships with targeted fixes for GitHub PR review context and right-to-left layout in the Desktop app. The community is heavily focused on usage/balance visibility for Go plan subscribers, with two new issues and one PR addressing the lack of programmatic access. A major App V2 migration stack (6 PRs) is progressing, and PR activity shows active work on stream recovery, model attribution in JSON output, and a `/handoff` command.

## Releases
**v1.18.13** — Minor release with two bugfix areas:
- **TUI:** GitHub pull request reviews now include the PR number and URL in context.
- **Desktop:** Multiple right-to-left (RTL) layout fixes across tabs, drawers, resizing, titlebar, and directional icons.

## Hot Issues
1. **[#16017 — Add Go plan usage/balance API endpoint (rolling/weekly/monthly windows)](https://github.com/anomalyco/opencode/issues/16017)** (OPEN, 30 comments, 126 👍)  
   The most-upvoted open issue. Users need programmatic access to Go plan usage data that currently only exists in the dashboard. High demand persists since March; expect this to drive roadmap priority.

2. **[#40533 — Abandoned issue flagged for compliance](https://github.com/anomalyco/opencode/issues/40533)** (CLOSED, 45 comments, 0 👍)  
   A high-comment-count issue marked for compliance that was closed. Lower signal for users.

3. **[#27593 — Error 402 Insufficient Balance on Go plan with ds4-flash](https://github.com/anomalyco/opencode/issues/27593)** (CLOSED, 17 comments, 13 👍)  
   A user with 98% session usage remaining hits "402 Insufficient Balance" specifically with ds4-flash, while other models work. Points to possible billing/usage accounting bugs with specific models.

4. **[#40584 — /usage or /status command for Go plan limits in TUI](https://github.com/anomalyco/opencode/issues/40584)** (CLOSED, 2 comments, 0 👍)  
   New ask directly following #16017: users want usage limits visible without opening a browser. Closed quickly—likely folded into the broader API endpoint discussion.

5. **[#30951 — Zen lists nemotron-3-ultra-free but requests fail as unsupported](https://github.com/anomalyco/opencode/issues/30951)** (CLOSED, 5 comments, 0 👍)  
   Model catalog mismatch between OpenCode and the backend. The CLI lists a free model that the backend rejects. Community expects catalog sync.

6. **[#39207 — GitHub OAuth login fails with empty email param](https://github.com/anomalyco/opencode/issues/39207)** (CLOSED, 5 comments, 1 👍)  
   "Continue with GitHub" breaks at the OAuth callback due to an empty email field, causing a SQL error. Blocks onboarding via GitHub; likely high impact for new users.

7. **[#40580 — TUI crash: TextNodeRenderable type error](https://github.com/anomalyco/opencode/issues/40580)** (CLOSED, 2 comments, 0 👍)  
   A runtime type error crashes the TUI. Type-contract violations in the rendering layer are a recurring pattern.

8. **[#40579 — Nothing works after installing skills (Windows 11)](https://github.com/anomalyco/opencode/issues/40579)** (OPEN, 4 comments, 0 👍)  
   A new user reports a total failure state after installing skills, even after removing them. Likely configuration or environment issue; unresolved.

9. **[#40572 — Electron renderer freezes; Solid.js reactive dependency cycle](https://github.com/anomalyco/opencode/issues/40572)** (OPEN, 2 comments, 0 👍)  
   Desktop v1.18.13 freezes ~3 seconds due to a Solid.js computeStyle cycle, amplified by ResizeObserver and API retry storms. Serious Desktop performance bug under investigation.

10. **[#20234 — WSL thinking output one word per line](https://github.com/anomalyco/opencode/issues/20234)** (CLOSED, 10 comments, 4 👍)  
    Long-standing WSL rendering bug where thinking output wraps one word per line. Closed after months; users affected in older versions.

## Key PR Progress
1. **[#40576 — fix(core): continue interrupted responses](https://github.com/anomalyco/opencode/pull/40576)** (OPEN)  
    Preserves output when a provider response ends unexpectedly, reschedules continuation, and appends a synthetic user message to resume without repeating completed content.

2. **[#40010 — fix(provider): recover stalled model streams](https://github.com/anomalyco/opencode/pull/40010)** (OPEN)  
    Closes #37580. Prevents infinite waits when a model endpoint sends headers but stops producing body data. Critical reliability fix for flaky providers.

3. **[#40545 — fix(opencode): add model attribution to run --format json step events](https://github.com/anomalyco/opencode/pull/40545)** (OPEN)  
    Adds model info to `step_start`/`step_finish` JSON events so headless consumers can attribute tokens and cost. Complements the closed #40581 PR with the same goal.

4. **[#40578 — feat(session): add /handoff command](https://github.com/anomalyco/opencode/pull/40578)** (OPEN)  
    New command to hand off sessions, closing #26757. Revives an idea previously closed by the stale-issue bot; broader scope than prior attempts.

5. **[#40538 — fix(core): make xAI OAuth device-only](https://github.com/anomalyco/opencode/pull/40538)** (CLOSED)  
    Replaces loopback OAuth with RFC 8628 device auth for xAI, simplifying local/remote authentication and removing the loopback server and PKCE.

6. **[#40375 — refactor(app): own rendering contracts](https://github.com/anomalyco/opencode/pull/40375)** (OPEN)  
    Stack 2 of 6 in the App V2 migration. Defines App-owned message/part projection contracts and routes rendering imports through the App boundary.

7. **[#40382 — refactor(app): remove v1 compatibility](https://github.com/anomalyco/opencode/pull/40382)** (OPEN)  
    Final stack step: removes all V1 protocol detection, adapters, and legacy SDK imports. App will be V2-only after this lands.

8. **[#40378 — refactor(app): migrate supported v2 APIs](https://github.com/anomalyco/opencode/pull/40378)** (OPEN)  
    Migrates session transport, catalog, file, PTY, credentials, and MCP integrations to V2 APIs while keeping compatibility infrastructure.

9. **[#40582 — feat(desktop): add inline conversation visualizations](https://github.com/anomalyco/opencode/pull/40582)** (OPEN)  
    New Desktop-only feature for inline HTML visualizations in conversations via a versioned fragment. Closes #40583.

10. **[#40566 — feat(core): preserve compaction tail media](https://github.com/anomalyco/opencode/pull/40566)** (OPEN)  
    Raises retained compaction context from 8K to 15K tokens and preserves image/audio/video/PDF media in the retained tail. Improves context continuity across compactions.

## Feature Request Trends
- **Go plan usage visibility (high demand):** Multiple issues (#16017, #40584) request API endpoints, TUI commands, and status displays for rolling usage limits. Strong signal for a public usage/cost API.
- **Voice/dictation input:** Repeatedly requested (#17425, #18226); plugin extensibility gaps are blocking implementation.
- **Subagent control and visibility:** Users want live status of running subagents (#22233), and the ability to steer/cancel/abort them (PR #32425).
- **Session handoff/suspension:** The `/handoff` command (PR #40578) and suspend/resume (referenced in #32425) point toward better session lifecycle management.
- **Agent presets:** Users want reusable, shareable subagent configurations (#29626).
- **Model catalog accuracy:** Requests to align `/models` with live backend capabilities (#30951, #40577).

## Developer Pain Points
- **Billing/usage errors are common and confusing.** Multiple issues (#27593, #30950) report "Insufficient Balance" errors despite available quota—often model-specific. This erodes trust in Go plan accounting.
- **Cross-platform environment issues persist.** WSL rendering quirks (#20234), Windows desktop freezes (#40572), and OAuth failures (#39207) create fragmented experiences across OSes.
- **Data loss and migration concerns.** Issues like the destructive event-log migration (#30963) and lost session history when moving databases (#29799) highlight fragility around state persistence.
- **Poor error feedback for new users.** The "Nothing works" report (#40579) and silent exits (#31006) suggest onboarding and fail-mode diagnostics need improvement.
- **Rendering type-contract crashes.** The TextNodeRenderable crash (#40580) and the larger V2 migration stack signal that the rendering layer is under active churn—expect breakage in the near term.
- **Context loss and interruption handling.** PR #40576 and #40566 address core reliability concerns around interrupted responses and compaction—recurring themes in the issue tracker.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-08-05

## Today's Highlights

Two preview releases shipped today: v0.21.6-preview.0 and a nightly build, both featuring alpha readiness diagnostics for the browser extension and documentation for headless Goal workflows. Community discussion remains active around agent runtime trust boundaries, ACP/IDE integration gaps, and session-transcript reliability after user aborts. A cluster of PRs from @wenshao continues to harden the review pipeline and hook trust boundary, while new provider support (Kimi, Xiaomi MiMo) and model-metadata-from-API work are moving through review.

## Releases

- **[v0.21.6-preview.0](https://github.com/QwenLM/qwen-code/releases/tag/v0.21.6-preview.0)**: Adds alpha readiness diagnostics to the browser extension; documents headless Goal workflows.
- **[v0.21.5-nightly.20260805.32e274157](https://github.com/QwenLM/qwen-code/releases/tag/v0.21.5-nightly.20260805.32e274157)**: Same changes as the preview — browser-extension diagnostics plus headless workflow docs.

## Hot Issues

1. **[#8102 — Deterministic tool-execution boundaries for a trustworthy agent runtime](https://github.com/QwenLM/qwen-code/issues/8102)** (17 comments, P3, open) — Proposal to keep the LLM outside the trust boundary while constraining/authorizing/observing model-produced actions. The highest-discussion issue this week signals community appetite for security hardening at the runtime level.

2. **[#8519 — qwen code tmux flickering](https://github.com/QwenLM/qwen-code/issues/8519)** (11 comments, P2, closed) — Severe screen flicker in tmux on Linux, roughly once per second. Closed but generated heavy engagement; tmux users should watch for the fix in an upcoming release.

3. **[#8051 — Bound multi-workspace daemon resource usage](https://github.com/QwenLM/qwen-code/issues/8051)** (9 comments, P2, open) — Tracking issue for delivering bounded memory/bytes for `qwen serve` multi-workspace daemon. Count-only limits don't bound request bodies or WebSocket assembly; the community is pushing for real byte-level caps.

4. **[#8136 — Provider warning sanitizer truncates messages/leaks passwords containing `@`](https://github.com/QwenLM/qwen-code/issues/8136)** (6 comments, P2, open) — Two bugs in `sanitizeProviderWarning`: truncation when a port is present, and password leakage when the password contains `@`. Security-sensitive; needs triage and a fix.

5. **[#8532 — CI logs make mocked disk-full test errors look real](https://github.com/QwenLM/qwen-code/issues/8532)** (5 comments, P3, open) — Unit tests deliberately throw `new Error('disk full')`, and production logging paths echo them to stderr — CI operators can't distinguish real ENOSPC from test output. Noise-reduction issue from @yiliang114.

6. **[#8356 — After APIUserAbortError, subsequent turns aren't written to session transcript](https://github.com/QwenLM/qwen-code/issues/8356)** (5 comments, P2, open) — On Windows with OpenAI-compatible endpoints, aborting a turn corrupts transcript persistence for the rest of the session. Session-management reliability bug that affects long interactive workflows.

7. **[#8550 — `qwen mcp list` hangs indefinitely on an SSE server that never sends `endpoint`](https://github.com/QwenLM/qwen-code/issues/8550)** (4 comments, P2, open, ready-for-agent) — A hung SSE MCP server blocks the CLI indefinitely; a timeout path is missing. Marked ready-for-agent, so contributor help is welcome.

8. **[#8533 — Content[]/Part[] cannot safely encode per-provider reasoning-replay contracts](https://github.com/QwenLM/qwen-code/issues/8533)** (4 comments, P2, open) — Foundational design problem: the core data structures can't represent provider-specific reasoning-replay semantics safely. Forks into broader questions about multi-provider correctness.

9. **[#8557 — Shrinking terminal reprints transcript blocks in scrollback](https://github.com/QwenLM/qwen-code/issues/8557)** (3 comments, P3, open, macOS/Warp) — Terminal resize duplicates previously printed content in the scrollback. Rendering bug with a clear repro; likely affects other terminal emulators too.

10. **[#8558 — Use API-backed model metadata for limits and capabilities](https://github.com/QwenLM/qwen-code/issues/8558)** (2 comments, P2, open) — Move model defaults/capabilities from hardcoded code to resolved metadata from models.dev. Paired with PR #8529; a structural improvement for provider scalability.

## Key PR Progress

1. **[#8396 — Close four trust-boundary holes in hook execution](https://github.com/QwenLM/qwen-code/pull/8396)** — HTTP hooks no longer follow redirects (SSRF hardening); three additional holes closed in repository-controlled config vs. code execution/network egress. Critical security review from @wenshao.

2. **[#8368 — Add Kimi and Xiaomi MiMo providers](https://github.com/QwenLM/qwen-code/pull/8368)** — First-class presets for `/auth` with region-specific access choices (China/International/Singapore). Expands third-party provider coverage.

3. **[#8529 — Resolve model modalities from API metadata](https://github.com/QwenLM/qwen-code/pull/8529)** — Uses models.dev snapshot for modality resolution, with disk cache and background refresh. Companion to issue #8558; removes hardcoded modality lists.

4. **[#8498 — Retire dry chunks and pipeline verification in the reverse audit](https://github.com/QwenLM/qwen-code/pull/8498)** — Performance optimization for the review pipeline; two independent measurements show the reverse-audit loop dominates large-PR review time.

5. **[#8443 — Allow clicking thought expand/collapse while streaming](https://github.com/QwenLM/qwen-code/pull/8443)** — Previously the thought block was clickable only after completion; this removes the restriction for pending state.

6. **[#8353 — ESC cancels ongoing work before popping queued messages](https://github.com/QwenLM/qwen-code/pull/8353)** — Fixes UX pain point: ESC now cancels the active request first instead of being consumed by queue-clear logic.

7. **[#8274 — Fork from any conversation](https://github.com/QwenLM/qwen-code/pull/8274)** — Makes session branching target any earlier Assistant response, not just the latest state. Handles tool calls, cancellations, transcript pagination, and rewinds safely.

8. **[#8482 — A never-delivered MCP call is a first delivery, not a replay](https://github.com/QwenLM/qwen-code/pull/8482)** — Fixes a deterministic test failure on main since the replay-safety gate merged; argues that a call that was never delivered to the server must be treated as first delivery.

9. **[#8512 — S2 input expansion: image/audio/URL sources and token-dimension transport guard](https://github.com/QwenLM/qwen-code/pull/8512)** — Omni experiment: extends video-only uploads to full input surface with image/audio modalities, URL media, and token estimation.

10. **[#8548 — Build the review CLI bundle once per scan and fan it out](https://github.com/QwenLM/qwen-code/pull/8548)** — Eliminates repeated `npm ci` + build + bundle per review leg; adds a `build-cli` job that compiles once and distributes. Direct CI time saving.

## Feature Request Trends

- **ACP/IDE integration completeness** — Multiple requests (task-list rendering in JetBrains [#8544], reasoning-effort session config [#8514], `usage_update` emission [#8513]) target parity with Claude Code/Codex inside JetBrains AI Assistant. The ACP surface is the most active feature-growth area.
- **Trust & security runtime** — Deterministic tool-execution boundaries (#8102), hook trust hardening (#8396), and the warning-sanitizer password leak (#8136) reflect a community-wide push for a trustworthy agent runtime.
- **Model metadata from API** — Moving provider/model capabilities out of hardcoded code into independently maintained metadata (models.dev) is requested in #8558 and implemented in PR #8529. Expect more provider-agnostic architecture.
- **Documentation/i18n** — Korean docs (README language bar, #8551) and a README refresh with full product matrix and screenshots (#8556) show community desire for broader onboarding and discoverability.

## Developer Pain Points

- **CI signal quality** — Mocked disk-full errors masquerading as real ENOSPC (#8532) is frustrating for maintainers and contributors; the same class of problem (logs that look like production failures) recurs.
- **Session transcript reliability** — After `APIUserAbortError`, subsequent turns vanish from the transcript (#8356) — compound by `--resume` reconstructing the dangling-unsigned-thought bug (#8535). Interactive users lose work and context.
- **Request timeouts breaking retry** — Wrapped timeout errors drop the original error code, so the transport-retry path never triggers (#8527). Flaky-network users hit hard failures instead of transparent retries.
- **Terminal rendering regressions** — tmux flicker (#8519) and scrollback duplication on resize (#8557) hurt the interactive experience that is Qwen Code's primary surface.
- **Memory/daemon-bound ambiguity** — The serve daemon's per-child memory allocation doesn't divide by child count (#8182), and multi-workspace resource use isn't byte-bounded (#8051). Deployment-heavy users need predictable limits.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar).*