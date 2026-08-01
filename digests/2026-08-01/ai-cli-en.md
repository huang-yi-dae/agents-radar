# AI CLI Tools Community Digest 2026-08-01

> Generated: 2026-08-01 03:22 UTC | Tools covered: 7

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

# Cross-Tool Comparison Report — AI CLI Developer Tools
**Data source:** Public community digests for 7 major AI CLI tools, 2026-08-01

---

## 1. Ecosystem Overview

The AI CLI tool landscape is in a phase of rapid iteration colliding with a trust problem: tools are shipping new capabilities (sandboxing, plugin search, daemon architectures, remote session control) while communities report reliability failures that undermine confidence in autonomous operation — including destructive `rm -rf` incidents, false success reporting, and session corruption. Cross-platform support, particularly Windows/WSL, remains the weakest surface across nearly every product. Feature demand is meanwhile converging on session continuity, persistent memory, and subagent observability, suggesting the CLI is evolving from an ephemeral REPL into a durable, network-addressable workspace. Established tools (Claude Code, Codex, Gemini CLI) are absorbing entitlement/billing friction and regression whiplash, while newer entrants (Kimi, OpenCode, Qwen Code) focus on compatibility and architectural foundations.

---

## 2. Activity Comparison

*Figures reflect hot/updated issues and key PRs highlighted in each tool's 24h digest.*

| Tool | Issues (24h) | PRs (24h) | Releases (24h) | Notable signals |
|---|---|---|---|---|
| **Claude Code** | 10 hot issues | 6 updated | None | Top issue #79337 (51 comments) — Fable 5 entitlement bug; cluster of `rm -rf` safety failures |
| **OpenAI Codex** | 10 hot issues | 10 | 3 alpha (rust-v0.147.0-alpha.4/.3/.1.1) | Most-reacted issue in all digests: #28969 (186 👍 — auto-resolve toggle); sandbox/thread-ownership PR batch |
| **Gemini CLI** | 10 hot issues | 10 (incl. cherry-picks) | 3 (nightly + preview + stable patch) | Reliability-focused: capacity exhaustion classified terminal; `thoughtSignature` 400 regression under active fix |
| **Copilot CLI** | 10 hot issues | 2 (both low-signal) | 1 (v1.0.78-0) | New `/permissions` command; regression complaints dominate (#4188 plan-mode blocking, #4305 Rust/JS crash) |
| **Kimi Code CLI** | 4 issues updated | 1 | None | Quietest tool; remote session continuation (#1282, 23 👍) and persistent memory (#1283) lead demand |
| **OpenCode** | 50 issues + 50 PRs updated | 10 key PRs | None | Highest raw volume; prompt-cache stabilization stack (#14743, #27378, #27007) and background jobs (#39978) |
| **Qwen Code** | 10 hot issues | 10 | 1 (v0.21.2, no changelog) | 31-comment RFC on multi-workspace daemon (#6378); large autofix/takeover pipeline batch |

---

## 3. Shared Feature Directions

**1. Session continuity & cross-surface sync**
Claude Code (#28791, 111 👍 — CLI/desktop history sync), Kimi (#1282 — resume local sessions remotely), Qwen (#8271 — session branching with Git worktree isolation), Copilot (session resume/reliability complaints), OpenCode (session pagination and desktop symlink-split bugs). *Demand: conversations as durable, portable artifacts.*

**2. Persistent memory with transparency**
Kimi (#1283 — memory across sessions), Claude Code (#82056 — visibility into auto-memory), Gemini (Auto Memory hardening: deterministic redaction #26525, low-signal session quarantine #26522), Copilot (long-lived context persistence). *Demand: memory that is controllable and auditable, not automatic.*

**3. Subagent orchestration reliability**
Gemini (#21409 — generalist agent hangs; #22323 — MAX_TURNS falsely reported as success), Claude Code (#74113 — idle background agents; #83014 — force-resume capability), Copilot (#4161 — `task_complete` unavailable after mode switch), Qwen (#7835 — subagent deadlock on unanswered questions), Codex (#36389 — single-writer thread ownership). *Demand: agents must fail loudly and recoverably, not silently.*

**4. Windows/WSL support parity**
Codex (#35119 — valid WSL repos marked non-Git; #32323 — `gh` parsing failure; #34133 — GPU crash), Claude Code (#81159 — MSIX package corruption), OpenCode (#28480 — silent startup failure), Qwen (#8227 — missing O_NOFOLLOW; #8267 — SGR mouse escape leak), Copilot (resume OOMs). *Windows remains the common weakest link across every tool.*

**5. Safety rails for autonomous actions**
Claude Code (#82165 — `rm -rf /*` executed, kill attempts blocked by classifier), OpenCode (#16331 — permission rules bypassed; 41 comments), Gemini (#22672 — destructive-command guards), Codex (sandboxed V8, `workspace-write` approval policy). *Demand: permission systems that cannot be bypassed and kill switches that always work.*

**6. Configurable autonomy & approval UX**
Codex (#28969, 186 👍 — disable 60-second auto-resolve), Copilot (`/permissions` command, ACP `ask_user` request #2109), Qwen (#8240 — foreground workflow approvals), OpenCode (#39985 — configurable send key). *Demand: fine-grained, user-defined control over when the agent acts vs. asks.*

**7. Long-context tool-call stability**
OpenCode (prompt-cache stabilization PRs), Qwen (#6721 — deferred-tool cache invalidation; #8003/#8207 — structured calls degrade into plain text), Gemini (#28607/#28586 — `thoughtSignature` 400s), Copilot (#3183 — orphaned `tool_use` blocks), Codex (#28316 — base64 image payload bloat). *Long-context reliability is now a first-class engineering problem.*

**8. Plugin/MCP ecosystem maturity**
Codex (#36409 — remote plugin search), OpenCode (#39988 — plugin discovery across config roots), Gemini (#28481 — MCP OAuth refresh with stored client ID), Copilot (MCP config friction), Qwen (MCP E2E test failures). *Tools are converging on plugin discoverability and standardized auth.*

---

## 4. Differentiation Analysis

| Tool | Positioning | Target users | Technical approach | Distinctive strengths / risks |
|---|---|---|---|---|
| **Claude Code** | Enterprise-pro, multi-surface (CLI + desktop + VS Code + web) | Max-plan professional devs and teams | Managed model entitlements; safety classifier; cross-surface product suite | **Strengths:** ecosystem breadth, enterprise trust. **Risks:** entitlement bugs eroding plan value; destructive-command cluster |
| **OpenAI Codex** | Platform-grade, sandbox-first engineering | CI/scripted workflows; platform builders | Rust core; aggressive alpha cadence; sandboxed V8; strict MCP auto-review; thread-history write locks | **Strengths:** sandbox depth, security posture. **Risks:** IDE review fragility (#35058, 109 👍); WSL gaps |
| **Gemini CLI** | Google-ecosystem agent | Android/Google workspace devs; browser automation | Deep Gemini 3 integration; Auto Memory; browser subagent; remote device control | **Strengths:** multimodal reach, device control. **Risks:** subagent autonomy and false success reporting; skills under-utilized (#21968) |
| **Copilot CLI** | GitHub workflow-native | GitHub-centric devs; automation via `/every`, `/after` | ACP protocol for IDE extension integration; hooks; sandboxed build caches (`allowDevToolCaches`) | **Strengths:** GitHub + ACP ecosystem. **Risks:** patch-release regression whiplash; broken installer version pinning |
| **Kimi Code CLI** | Lightweight Moonshot-API client | Moonshot/Kimi API users | Minimal surface; provider-compatibility fixes; roadmap focused on remote sessions and memory | **Strengths:** simplicity. **Risks:** very small community; single-provider dependence |
| **OpenCode** | Open-source community power tool | OSS contributors; local/self-hosted models (LM Studio) | High-velocity TypeScript; plugin architecture; TUI ergonomics; air-gap mode (#39994); cache audit logging | **Strengths:** daily iteration rate (50+50/day). **Risks:** Windows reliability; local-model schema friction |
| **Qwen Code** | Daemon-based remote/Web Shell runtime | Qwen model users; ACP/daemon deployments | `qwen serve` architecture; Anthropic/Gemini converter layer; autofix/review pipeline | **Strengths:** daemon/multi-workspace vision; active maintainer momentum. **Risks:** memory overcommit (#8182); converter edge cases |

**Core takeaway:** Differentiation is shifting from *model quality* to *workflow ownership* — GitHub-native automation (Copilot), enterprise multi-surface (Claude Code), sandboxed platform engineering (Codex), Google/device ecosystem (Gemini), daemonized remote sessions (Qwen), and community-driven extensibility (OpenCode).

---

## 5. Community Momentum & Maturity

- **OpenCode** has the highest raw momentum: 50 issues + 50 PRs updated in 24 hours, though no release was cut. The contributor-driven sprint is concentrated on cache stability, background jobs, and TUI polish — typical of a young project aggressively closing feature gaps.
- **OpenAI Codex** shows platform-grade cadence: 3 alpha releases and 10 PRs in one day, plus the largest single reaction count in this digest (#28969 at 186 👍). The 42-comment Codex Diff crash signals IDE review reliability lags the core engine.
- **Claude Code** remains the highest-engagement community around *trust issues*: 51 comments on the Fable 5 entitlement bug (#79337) and a cluster of catastrophic data-loss reports. Its top feature request (#28791, 111 👍) shows cross-surface sync is the most acute unmet expectation for the most established tool.
- **Gemini CLI** iterates steadily (3 releases today) but its community reveals a confidence crisis in autonomous mode: hangs, false success signals, and permission regressions. Its comparatively small community (top issue at 8 👍) limits pressure visibility.
- **Copilot CLI** ships promptly (v1.0.78-0) but suffers "regression whiplash" — plan-mode shell blocking, a 1.0.76 crash, and resume OOMs all appeared in recent patches. The release pipeline needs stronger guardrails before the community fully trusts upgrades.
- **Qwen Code** maintains an active maintainer-driven cadence (v0.21.2 + 10 PRs) with deep architectural discourse (31-comment daemon RFC), but external community signal remains modest on reaction counts.
- **Kimi Code CLI** is the quietest (4 issues, 1 PR) — a small, early-stage, provider-specific tool with a clear product direction but limited community volume.

---

## 6. Trend Signals

1. **Trust is the new competitive moat.** The most damaging pattern is not missing features but failed safety guarantees — `rm -rf /*` execution, permission bypasses, false success reports. Decision-makers should audit a tool's guardrail architecture and kill-switch semantics *before* enabling autonomous mode in production repos.

2. **Windows/WSL is the systemic weak point.** Every major tool carries an open Windows-specific reliability cluster. For mixed-OS teams, this should be an explicit evaluation criterion rather than an afterthought.

3. **Long-context reliability is being redefined.** Structured tool calls degrading into plain text, prompt-cache invalidation, and payload bloat at scale are now recurring complaints across Gemini, Qwen, Copilot, and OpenCode communities. Expect cache stabilization and context hygiene to become headline features.

4. **Session continuity is becoming table stakes.** Cross-device resume, persistent memory, and session branching appear independently across Claude Code, Kimi, Qwen, OpenCode, and Copilot — a convergent signal that CLI sessions must become durable, portable workspaces.

5. **Quota and entitlement opacity erodes plan trust.** Fable 5 downgrades (Claude Code), unreliable usage meters (Codex), and daemon memory overcommit (Qwen) all stem from the same failure: resource accounting treated as backend plumbing rather than a user-facing UX surface.

6. **Configurable autonomy is the next UX frontier.** The highest-reacted issue across all digests (Codex #28969, 186 👍) is a simple toggle request. Users want agents that ask when appropriate and act when authorized — and they want to define that boundary themselves.

7. **Plugin/MCP ecosystems are consolidating in parallel.** Plugin search, config-root discovery, OAuth refresh, and per-model availability are being solved simultaneously by Codex, OpenCode, Gemini, and Copilot. Watch which protocol standard (ACP vs. MCP vs. proprietary) wins — it will determine ecosystem lock-in.

8. **Daemon/remote architectures are emerging.** Qwen's multi-workspace daemon RFC, Kimi's remote-session request, and Claude Code's cross-surface sync all point to CLI sessions becoming network-addressable, collaborative, and device-independent. This is the architectural shift most likely to define the 2026–2027 generation of developer tools.

---

*Report compiled from public GitHub issue/PR data across anthropics/claude-code, openai/codex, google-gemini/gemini-cli, github/copilot-cli, MoonshotAI/kimi-cli, anomalyco/opencode, and QwenLM/qwen-code. Digest date: 2026-08-01.*

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights
*Data as of 2026-08-01 · GitHub: anthropics/skills*

---

## 1. Top Skills Ranking

The following PRs represent the most active discussions in the community, listed in the order of the comment-sorted dataset.

- **[PR #1298 — fix(skill-creator): run_eval.py always reports 0% recall](https://github.com/anthropics/skills/pull/1298)**  
  *Status: Open*  
  Addresses the widespread `run_eval.py` failure where skill descriptions are scored `recall=0%` regardless of content. The PR fixes eval artifact installation, Windows stream reading, trigger detection, and parallel worker handling. This is the highest-activity PR and directly targets the broken description-optimization loop that affected many contributors.

- **[PR #514 — Add document-typography skill](https://github.com/anthropics/skills/pull/514)**  
  *Status: Open*  
  Proposes a typographic quality-control skill for generated documents: orphan-word wrapping, widow paragraph prevention, and numbering alignment. The discussion centers on how AI-generated documents consistently need typographic cleanup, making this a broadly applicable skill.

- **[PR #538 — fix(pdf): correct case-sensitive file references in SKILL.md](https://github.com/anthropics/skills/pull/538)**  
  *Status: Open*  
  Fixes 8 case-sensitivity mismatches where `SKILL.md` referenced `REFERENCE.md`/`FORMS.md` but the actual files are lowercase. Important for Linux/macOS users and a common class of packaging bug across skills.

- **[PR #486 — Add ODT skill](https://github.com/anthropics/skills/pull/486)**  
  *Status: Open*  
  Adds OpenDocument Format support: creating `.odt`/`.ods` files, template filling, and ODT-to-HTML conversion. Discussion highlights demand for open-source document formats beyond DOCX/PDF.

- **[PR #210 — Improve frontend-design skill clarity and actionability](https://github.com/anthropics/skills/pull/210)**  
  *Status: Open*  
  Revises the frontend-design skill so instructions are concrete and executable within a single conversation. The community discussion focuses on making design guidance less abstract and more behavior-shaping for Claude.

- **[PR #83 — Add skill-quality-analyzer and skill-security-analyzer to marketplace](https://github.com/anthropics/skills/pull/83)**  
  *Status: Open*  
  Adds two meta-skills: one evaluates skill quality across five dimensions (structure, documentation, examples, etc.), and the other analyzes security risks. This aligns with community concerns about quality control and trust in the skills ecosystem.

- **[PR #541 — fix(docx): prevent tracked change w:id collision with existing bookmarks](https://github.com/anthropics/skills/pull/541)**  
  *Status: Open*  
  Fixes document corruption when DOCX tracked changes reuse bookmark IDs. The discussion focuses on OOXML ID-space collisions and the need for robust document handling in skills.

- **[PR #539 — fix(skill-creator): warn on unquoted description with YAML special characters](https://github.com/anthropics/skills/pull/539)**  
  *Status: Open*  
  Adds validation for YAML frontmatter descriptions containing `:`, which silently break skill parsing. Part of the broader effort to make skill authoring more reliable.

---

## 2. Community Demand Trends

The Issues section reveals several recurring demands:

- **Security and trust boundaries** — [Issue #492](https://github.com/anthropics/skills/issues/492) is the most-commented issue: community skills distributed under the `anthropic/` namespace create a trust-boundary vulnerability. Demand is high for official vs. community skill distinction and security review.

- **Reliable skill-development tooling** — [Issue #556](https://github.com/anthropics/skills/issues/556), [Issue #1169](https://github.com/anthropics/skills/issues/1169), and [Issue #1061](https://github.com/anthropics/skills/issues/1061) all report the same root problem: `run_eval.py` does not reliably detect skill triggering, often scoring `recall=0%`, and has Windows-specific failures. This is the top technical obstacle for skill authors.

- **Organizational skill sharing** — [Issue #228](https://github.com/anthropics/skills/issues/228) asks for org-wide skill libraries and direct sharing links instead of manual `.skill` file transfers.

- **Context-window efficiency** — [Issue #1487](https://github.com/anthropics/skills/issues/1487) reports that the `claude-api` skill injects ~156k tokens in a single call, exhausting context. This points to demand for skills that are lazy-loading or more token-conscious.

- **Memory and agent-state management** — [Issue #1329](https://github.com/anthropics/skills/issues/1329) proposes a `compact-memory` skill using symbolic notation for compact agent state, reflecting broader interest in long-running agent memory.

- **Meta-skills for quality and governance** — [Issue #202](https://github.com/anthropics/skills/issues/202), [Issue #412](https://github.com/anthropics/skills/issues/412), and [Issue #1385](https://github.com/anthropics/skills/issues/1385) show demand for skill-improvement best practices, agent governance patterns, and reasoning quality-gate pipelines.

- **Platform interoperability** — [Issue #29](https://github.com/anthropics/skills/issues/29) asks about Bedrock usage; [Issue #16](https://github.com/anthropics/skills/issues/16) proposes exposing Skills as MCPs. Both indicate demand for skills beyond the default Claude Code runtime.

---

## 3. High-Potential Pending Skills

These open PRs still have active discussion and are strong candidates to land soon:

- **[PR #1367 — self-audit: mechanical verification + four-dimension reasoning quality gate](https://github.com/anthropics/skills/pull/1367)**  
  A universal skill that verifies output files mechanically before applying a four-dimension reasoning audit. Addresses the recurring theme of “reasoning quality gates” and delivery verification.

- **[PR #1302 — color-expert skill](https://github.com/anthropics/skills/pull/1302)**  
  A self-contained color expertise skill covering color naming systems, color-space selection, and accessible palettes. Broad utility for design, data-viz, and UI work.

- **[PR #723 — testing-patterns skill](https://github.com/anthropics/skills/pull/723)**  
  Comprehensive testing guidance: testing philosophy, unit tests, React Testing Library, and edge cases. Directly addresses the community’s interest in test-generation and quality.

- **[PR #1479 — plan-file-hygiene skill](https://github.com/anthropics/skills/pull/1479)**  
  Addresses the lifecycle gap where planning artifacts accumulate with no cleanup or ownership. Community discussion framed this as a critical missing skill for long-running agent sessions.

- **[PR #525 — pyxel skill for retro game development](https://github.com/anthropics/skills/pull/525)**  
  Integrates Pyxel and pyxel-mcp for creating retro/pixel-art games with Python. It remains open with updates into July 2026, suggesting continued maintainer interest.

- **[PR #486 — ODT skill](https://github.com/anthropics/skills/pull/486)**  
  Already listed above as a top-discussed PR; it is also high-potential because it fills a real gap for open-format document support.

- **[PR #83 — skill-quality-analyzer and skill-security-analyzer](https://github.com/anthropics/skills/pull/83)**  
  The meta-skill approach is directly responsive to the community’s largest concern — trust and quality — and remains open with ongoing discussion.

---

## 4. Skills Ecosystem Insight

The community’s most concentrated demand is not for new end-user skills, but for making the skill-development toolchain itself reliable, secure, and portable — especially fixing `run_eval.py` trigger detection, Windows compatibility, and the trust boundary around community-contributed skills distributed under the `anthropic/` namespace.

---

# Claude Code Community Digest — 2026-08-01

## Today’s Highlights

No new release landed in the last 24 hours, so community attention is concentrated on two themes: **Fable 5 access/entitlement bugs on Max plans** and a **worrying cluster of data-loss / safety-guard bypass reports**. The most active thread, [Issue #79337](https://github.com/anthropics/claude-code/issues/79337), has 51 comments and documents Max users being downgraded to Opus 4.8 with a misleading “usage credits required” error despite Fable 5 being included. Meanwhile, multiple reports describe destructive `rm -rf` incidents in auto mode, which is likely to be the next major trust issue for the tool.

## Releases

No new releases were published in the last 24 hours.

## Hot Issues

1. **[#79337 — Fable 5 prompts “usage credits required” on Max plan](https://github.com/anthropics/claude-code/issues/79337)**  
   The top community issue: starting 2026-07-20, Fable 5 is standard on Max, but Claude Code refuses to use it and silently downgrades to Opus 4.8. 51 comments, 20 👍. This is the clearest example of an entitlement/billing bug causing immediate user-facing model downgrades.

2. **[#79441 — VS Code extension blocks Fable 5 despite remaining weekly allowance](https://github.com/anthropics/claude-code/issues/79441)**  
   A duplicate of #79337 specific to the VS Code extension. Users on Max report the “requires usage credits” block while 20% of their weekly Fable allowance remains. The duplication suggests the bug affects multiple surfaces.

3. **[#28791 — Sync conversation history between CLI and desktop app](https://github.com/anthropics/claude-code/issues/28791)**  
   The highest-voted open feature request (👍 111). Developers want unified session history across CLI and Claude Code desktop. Currently conversations are siloed, which makes switching surfaces impractical.

4. **[#72274 — Cross-session credential leakage: production database modified on unauthorized host](https://github.com/anthropics/claude-code/issues/72274)**  
   A serious security report: another user’s server credentials surfaced in a session, leading to unauthorized production DB modification. Even at 6 comments, this warrants immediate attention.

5. **[#11139 — Claude Code Web cannot use gh CLI commands](https://github.com/anthropics/claude-code/issues/11139)**  
   A long-running bug (since Nov 2025) with 28 comments: the Web environment gets permission-denied errors when running `gh` commands. Communities relying on web-based Claude Code are still blocked from standard GitHub workflows.

6. **[#81159 — GPU process crash corrupts MSIX package on Windows 11](https://github.com/anthropics/claude-code/issues/81159)**  
   Opus 5 performing an in-page browser action triggers a GPU crash that kills Claude Desktop and corrupts the MSIX package. Related report [#81275](https://github.com/anthropics/claude-code/issues/81275) confirms the same `101457950` exit code across Intel, NVIDIA, and WARP rendering.

7. **[#83019 — Session transcripts auto-delete after 30 days with no backup coverage](https://github.com/anthropics/claude-code/issues/83019)**  
   Newly filed, but important: transcripts are stored outside typical backup locations and silently deleted after 30 days. This is permanent project-history loss for heavy CLI users.

8. **[#82165 — Catastrophic data loss: `rm -rf /*` executed; safety classifier blocked kill attempts](https://github.com/anthropics/claude-code/issues/82165)**  
   An agent-built command expanded to `rm -rf /*` and ran detached. The safety classifier then blocked attempts to kill it. This is the most extreme example in a cluster of destructive-command reports.

9. **[#74113 — Background agents idle without delivering final SendMessage report](https://github.com/anthropics/claude-code/issues/74113)**  
   Users report background agents going idle and never delivering their final report; a manual re-ping recovers it. 5 👍 suggests this is a common orchestration reliability issue.

10. **[#83042 — Single request burned entire 5-hour session limit](https://github.com/anthropics/claude-code/issues/83042)**  
    A frustrating session-limit report: one request consumed the whole 5-hour window. Without more diagnostic context, this highlights opacity in session/reset accounting.

## Key PR Progress

Six PRs were updated in the last 24 hours. There are not 10 to review, so here are all of them:

1. **[#81540 — Fix #80705: Usage leak](https://github.com/anthropics/claude-code/pull/81540)**  
   Closed automated contribution from “Atlas 2” targeting a usage-leak bug, with a stated $200 reward. It ran tests and repo validation before submission.

2. **[#17776 — docs: add README.md for security-guidance plugin](https://github.com/anthropics/claude-code/pull/17776)**  
   Closed documentation PR adding the missing README for the `security-guidance` plugin, covering all 9 security patterns. Low risk, but useful for plugin discoverability.

3. **[#82987 — fix(ci): fix cron failures, exclude PRs, and propose TUI latency fix](https://github.com/anthropics/claude-code/pull/82987)**  
   Open. Addresses GitHub Actions cron failures and proposes an architectural fix for TUI input latency degradation under high agent workloads. Relevant to the FleetView/agent-scale complaints.

4. **[#82981 — Claude/automatizar inventario insumos](https://github.com/anthropics/claude-code/pull/82981)**  
   Open. Appears to be an unrelated/automation test PR in the repo. Low signal, but included for completeness.

5. **[#82794 — feat(code-review): confidence scoring and `--threshold` flag](https://github.com/anthropics/claude-code/pull/82794)**  
   Open. Implements the documented 0–100 confidence scoring that was missing from the `code-review` plugin, replacing binary validation with a validate-and-score pass.

6. **[#39872 — Upgrade Node.js version from 20 to 24](https://github.com/anthropics/claude-code/pull/39872)**  
   Open since March; updated again in this window. Prepares for the upcoming Node LTS change.

## Feature Request Trends

- **Cross-surface history continuity** remains the most-demanded capability, led by [#28791](https://github.com/anthropics/claude-code/issues/28791) with 111 👍. Developers expect seamless session sync between CLI, desktop, and web.
- **Pluggable / intelligent context management** is gaining traction: [#80751](https://github.com/anthropics/claude-code/issues/80751) requests pluggable context managers with intelligent retrieval, and [#82056](https://github.com/anthropics/claude-code/issues/82056) asks for visibility into what auto-memory actually loaded.
- **Resilient agent orchestration** is a recurring theme: users want the advisor agent to be able to force-resume failed subagents ([#83014](https://github.com/anthropics/claude-code/issues/83014)) and to fix background agents that idle mid-task ([#74113](https://github.com/anthropics/claude-code/issues/74113)).
- **Cost-saving UX improvements**: [#77134](https://github.com/anthropics/claude-code/issues/77134) asks to surface Claude’s generated text for approval without a second model pass, especially for remote/mobile token-cost reduction.

## Developer Pain Points

- **Fable 5 Max-plan entitlement confusion**: The “usage credits required” wall in [#79337](https://github.com/anthropics/claude-code/issues/79337) and [#79441](https://github.com/anthropics/claude-code/issues/79441) is eroding trust in Max plan value.
- **Destructive command safety**: Multiple reports ([#80830](https://github.com/anthropics/claude-code/issues/80830), [#81273](https://github.com/anthropics/claude-code/issues/81273), [#82165](https://github.com/anthropics/claude-code/issues/82165)) show guardrails failing around `rm -rf` — including backtick substitution bypasses and kill attempts being blocked.
- **Windows desktop instability**: GPU crashes in the built-in browser are repeatedly killing the app and even corrupting the MSIX install ([#81159](https://github.com/anthropics/claude-code/issues/81159), [#81275](https://github.com/anthropics/claude-code/issues/81275), [#82962](https://github.com/anthropics/claude-code/issues/82962)).
- **Silent session/transcript loss**: Auto-deleting transcripts ([#83019](https://github.com/anthropics/claude-code/issues/83019)) and unexplained session-limit burn ([#83042](https://github.com/anthropics/claude-code/issues/83042)) leave developers without recourse or backup.
- **CLI/Web tooling integration friction**: `gh` permission errors in Claude Code Web ([#11139](https://github.com/anthropics/claude-code/issues/11139)) and misleading CI auth errors ([#79599](https://github.com/anthropics/claude-code/issues/79599)) break common GitHub workflows.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest – 2026-08-01

## Today’s Highlights
Codex shipped several Rust `v0.147.0` alpha releases and a large batch of app-server/CLI PRs focused on explicit user-input blocking, plugin search, thread-history ownership, and MCP review hardening. Community attention remains concentrated on Windows/WSL reliability and quota/usage accounting, with the top issue asking for a way to disable Codex’s 60-second auto-resolve behavior.

## Releases
- [rust-v0.147.0-alpha.4](https://github.com/openai/codex/releases)
- [rust-v0.147.0-alpha.3](https://github.com/openai/codex/releases)
- [rust-v0.147.0-alpha.1.1](https://github.com/openai/codex/releases)

No detailed changelog notes were provided for these alpha builds.

## Hot Issues
- [#28969 – Add setting to disable the auto-resolve in 60 seconds for questions](https://github.com/openai/codex/issues/28969) — 64 comments, 186 👍. The most-reacted issue: users want explicit control over whether Codex waits for user input or auto-resolves after 60 seconds.
- [#35058 – Codex Diff crashes with “Oops, an error has occurred” in VS Code on macOS](https://github.com/openai/codex/issues/35058) — 42 comments, 109 👍. Review workflow is broken across multiple repositories, even in a fresh workspace.
- [#34133 – Windows screenshot crashes GPU process after Code Integrity rejects vk_swiftshader.dll](https://github.com/openai/codex/issues/34133) — 30 comments. In-app browser screenshots can freeze or make Codex unable to reopen on Windows 10.
- [#35420 – Work/Codex stream disconnects when workspace is OneDrive-backed and OneDrive is degraded](https://github.com/openai/codex/issues/35420) — 20 comments. Repeated “stream disconnected” failures tied to OneDrive state on Windows.
- [#31786 – Remote control Windows WSL to Android not working at all](https://github.com/openai/codex/issues/31786) — 17 comments. Pairing completes, but the phone stays stuck on “connecting,” blocking remote control.
- [#32323 – Codex PR integration fails in WSL with gh: Expected VAR_SIGN, actual: COLON](https://github.com/openai/codex/issues/32323) — 12 comments, 14 👍. `gh` parsing breaks Codex PR review inside WSL.
- [#35119 – Windows/WSL valid WSL repositories marked as non-Git and “Git is unavailable”](https://github.com/openai/codex/issues/35119) — 11 comments. A regression in the latest app-server makes WSL repos unusable.
- [#29645 – Built-in image_gen times out after ~240s for ordinary card-art prompts](https://github.com/openai/codex/issues/29645) — 10 comments. Longer image-generation requests fail while simple prompts succeed.
- [#28316 – Codex should not resend large base64 image tool outputs in subsequent context](https://github.com/openai/codex/issues/28316) — 10 comments. Large image payloads persist in history and inflate later requests, causing context/cost bloat.
- [#35871 – Windows sandbox fails when resolved shell is the MSIX build of pwsh](https://github.com/openai/codex/issues/35871) — 9 comments. The sandbox cannot launch the Microsoft Store PowerShell under its restricted token.

## Key PR Progress
- [#36373 – Add an `--approve-for-me` CLI flag](https://github.com/openai/codex/pull/36373) — Routes approval requests through automatic review with `approval_policy="on-request"` and the `workspace-write` sandbox; useful for scripted/CI workflows.
- [#36410 – Make user input blocking behavior explicit](https://github.com/openai/codex/pull/36410) — Adds a required `isBlocking` field to `request_user_input`, decoupling blocking behavior from timeout policy. Directly relevant to the auto-resolve complaints in #28969.
- [#36389 – Enforce single-writer ownership for all thread histories](https://github.com/openai/codex/pull/36389) — Extends the cross-process writer lock to legacy and paginated thread histories, preventing concurrent write corruption.
- [#36374 – Enable sandboxed V8 for code mode](https://github.com/openai/codex/pull/36374) — Fixes Windows MSVC builds by enabling `v8_enable_sandbox` for code mode, important for security and platform parity.
- [#36365 – Add strict automatic review for MCP elicitations](https://github.com/openai/codex/pull/36365) — Recognizes `codex_strict_auto_review` and fails closed unless an automatic-review approval is present.
- [#36409 – Implement remote plugin search](https://github.com/openai/codex/pull/36409) — Adds `plugin/search` against the remote plugin service with global/workspace/personal scopes and pagination. Complements the experimental API in #36402.
- [#36380 – Add thread section management APIs](https://github.com/openai/codex/pull/36380) — Adds create/update/delete methods for custom thread sections, persisted in SQLite with UUIDv7 identities.
- [#36384 – Load turn summaries with paginated queries](https://github.com/openai/codex/pull/36384) — Removes the per-turn summary query by joining first user and final agent items into the paginated turn query.
- [#31471 – Extract apps cache logic into ConnectorRuntimeManager](https://github.com/openai/codex/pull/31471) — Refactors the Codex Apps tools cache and runtime context scoping; part of the faster-connectors initiative.
- [#36367 – Keep effective tool exposure in the registry](https://github.com/openai/codex/pull/36367) — Stores each tool runtime with its effective exposure so MCP tool planning respects host policy correctly.

## Feature Request Trends
- **Configurable auto-resolution / user input behavior** — #28969 is the clearest signal: users want to disable or tune Codex’s automatic resolution of questions. PRs like #36410 and #36385 suggest this is being actively reworked.
- **Composable and reusable instructions** — #17401 requests an `@include` directive for AGENTS.md files so instructions can be modular and maintainable.
- **Usage/quota transparency** — Multiple issues ask for accurate and understandable usage accounting: weekly quotas exhausted too quickly, frozen meters, and limits not resetting after migration.
- **Per-thread model and reasoning controls** — #34278 requests per-thread “Auto” mode that routes both model and reasoning effort, rather than global settings.
- **Plugin/MCP lifecycle reliability** — #35006 tracks MCP OAuth stability for enterprise SSO, while #33592 reports plugin availability varying by model. The new plugin-search PRs address discovery side of this ecosystem.

## Developer Pain Points
- **Windows/WSL is the largest recurring source of friction** — Issues include WSL repos marked as non-Git, `gh` parsing failures, sandbox process-creation errors, GPU-process crashes, and OneDrive-related disconnects.
- **Quota meters are unreliable** — Users see “hit usage limit” while the UI reports unused quota, or weekly allowances exhausted within hours.
- **Large image payloads cause context bloat** — Base64 image tool outputs are resent in later turns, driving up latency and token costs.
- **IDE review flows are fragile** — Codex Diff crashes on macOS and newer VS Code extension versions drop steer messages, interrupting the code-review loop.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-08-01

## 1. Today's Highlights

Three releases shipped today (v0.55.0-nightly, v0.54.0-preview.1, v0.53.1), all centered on a reliability fix that classifies capacity exhaustion as terminal (preventing retry hangs) and propagates `InvalidStreamError` details to the UI for actionable empty-response guidance. Meanwhile, two parallel PRs ([#28607](https://github.com/google-gemini/gemini-cli/pull/28607), [#28586](https://github.com/google-gemini/gemini-cli/pull/28586)) target a v0.53.0 regression causing `API Error 400: Function call is missing a thought_signature`. Community discussion remains heavily focused on agent reliability — subagent hangs, misleading success reporting, and browser agent fragility.

## 2. Releases

| Version | Highlights |
|---|---|
| [v0.55.0-nightly.20260801.gf47d6c6f7](https://github.com/google-gemini/gemini-cli/releases) | `fix(core)`: capacity exhaustion now classified as terminal to prevent retry hangs; `fix(core,cli)`: `InvalidStreamError` details (type/message) propagated to UI for specific empty-response guidance (e.g., suggesting `/compress`). |
| [v0.54.0-preview.1](https://github.com/google-gemini/gemini-cli/releases) | Cherry-picks commit `f47d6c6` (the InvalidStreamError fix) onto the preview release line. |
| [v0.53.1](https://github.com/google-gemini/gemini-cli/releases) | Cherry-picks the same fix onto stable v0.53.0; note that the cherry-pick [hit merge conflicts](https://github.com/google-gemini/gemini-cli/pull/28610) requiring manual resolution. |

## 3. Hot Issues

1. **[#22323 — Subagent recovery after MAX_TURNS is reported as GOAL success](https://github.com/google-gemini/gemini-cli/issues/22323)** (12 comments, 2👍)
   The `codebase_investigator` subagent reports `status: "success"` / `Termination Reason: "GOAL"` even when it hit the max-turn limit without doing any analysis. Misleading success signals undermine trust in agent autonomy and make failures hard to diagnose.

2. **[#21409 — Generalist agent hangs](https://github.com/google-gemini/gemini-cli/issues/21409)** (8 comments, 8👍)
   The highest community-reaction issue in this batch: deferring to the generalist agent hangs indefinitely (up to an hour) on simple tasks like folder creation. Workaround: instructing the model not to use subagents. Severe UX blocker for agent mode.

3. **[#19873 — Leverage model's bash affinity via Zero-Dependency OS Sandboxing](https://github.com/google-gemini/gemini-cli/issues/19873)** (8 comments, 1👍)
   Proposal to let Gemini 3 models use native POSIX toolchains (`grep`, `sed`, `awk`) safely via OS-level sandboxing with post-execution intent routing — a design direction that could reduce tool-call overhead and improve code exploration fidelity.

4. **[#25166 — Shell command execution gets stuck with "Waiting input" after command completes](https://github.com/google-gemini/gemini-cli/issues/25166)** (4 comments, 3👍)
   Simple CLI commands finish but the UI keeps showing them as active and awaiting input. Recurring hang-type bug in core shell execution — a top reliability concern.

5. **[#21968 — Gemini does not use skills and sub-agents enough](https://github.com/google-gemini/gemini-cli/issues/21968)** (6 comments)
   Anecdotal but widely resonant: the model ignores custom skills (e.g., `gradle`, `git`) unless explicitly instructed. Suggests a gap between skill/tool availability and the model's proactive tool selection.

6. **[#26522 — Stop Auto Memory from retrying low-signal sessions indefinitely](https://github.com/google-gemini/gemini-cli/issues/26522)** (5 comments)
   Auto Memory only marks a session as processed when `read_file` succeeds; low-signal sessions that the extraction agent skips are retried forever. Causes wasted background compute and repeated context loads.

7. **[#26525 — Add deterministic redaction and reduce Auto Memory logging](https://github.com/google-gemini/gemini-cli/issues/26525)** (4 comments)
   Security concern: transcript content is sent to the extraction model before prompt-based redaction happens, and existing skills may be logged. Requests deterministic pre-context redaction and reduced logging surface.

8. **[#21983 — Browser subagent fails in Wayland](https://github.com/google-gemini/gemini-cli/issues/21983)** (4 comments, 1👍)
   Browser agent terminates with `GOAL` but fails in Wayland environments. Linux desktop users are hitting an environment-specific blocker in the browser subagent.

9. **[#22093 — (Sub)agents running without permission since v0.33.0](https://github.com/google-gemini/gemini-cli/issues/22093)** (3 comments)
   Users who disabled agents in all configs report subagents (e.g., generalist) being invoked anyway after an auto-update. Permission/opt-out semantics regressed — a trust and control issue.

10. **[#24246 — Gemini CLI encounters 400 error with >128 tools](https://github.com/google-gemini/gemini-cli/issues/24246)** (3 comments)
    Exceeding ~128 (or 400, per the report) available tools triggers a 400 error. Users expect smarter tool-scoping rather than a hard request-size failure. Becomes more pressing as MCP server usage grows.

## 4. Key PR Progress

1. **[#28566 — fix(core,cli): propagate InvalidStreamError details to UI](https://github.com/google-gemini/gemini-cli/pull/28566)** (CLOSED)
   The headline fix of the day: surfaces error `type` and `message` from core to CLI UI hooks so users get actionable guidance (e.g., `/compress`) on empty responses. Cherry-picked into v0.53.1 and v0.54.0-preview.1.

2. **[#28607 — fix(core): preserve functionCall thoughtSignature when stripping thought parts](https://github.com/google-gemini/gemini-cli/pull/28607)** (OPEN)
   Fixes [#28604](https://github.com/google-gemini/gemini-cli/issues/28604): `stripThoughts()` added in [#28509](https://github.com/google-gemini/gemini-cli/pull/28509) incorrectly removed `thought_signature`, causing 400 errors on context-managed turns.

3. **[#28586 — fix(core): preserve thoughtSignature in functionCall parts to fix 400 error](https://github.com/google-gemini/gemini-cli/pull/28586)** (OPEN)
   A parallel fix to #28607 targeting the same v0.53.0 regression, specifically for parallel tool calls. Worth watching which approach merges first.

4. **[#28608 — fix(core): fall back to stable models when a preview model 404s with Gemini API key auth](https://github.com/google-gemini/gemini-cli/pull/28608)** (OPEN)
   Fixes [#28600](https://github.com/google-gemini/gemini-cli/issues/28600): keys without preview-model access get 404s on `gemini-3.1-pro-preview`; this PR makes the fallback policy chain handle that case gracefully.

5. **[#28481 — fix(core): refresh MCP OAuth tokens with the stored client ID](https://github.com/google-gemini/gemini-cli/pull/28481)** (OPEN)
   Fixes MCP OAuth token refresh for servers configured via OAuth discovery + dynamic client registration. Previously, refresh failed before network I/O and deleted stored credentials, forcing re-auth every session.

6. **[#28551 — fix(cli): fall back to embedded macOS seatbelt profiles if missing](https://github.com/google-gemini/gemini-cli/pull/28551)** (OPEN)
   Resolves a startup crash when running `gemini -s` (sandbox mode) on macOS where static Seatbelt `.sb` profiles are absent from runfiles/bundle. Critical for macOS sandbox users.

7. **[#28526 — fix(vscode-ide-companion): stop leaking disposables](https://github.com/google-gemini/gemini-cli/pull/28526)** (OPEN)
   Fixes [#27790](https://github.com/google-gemini/gemini-cli/issues/27790): a stray parenthesis collapsed two `context.subscriptions.push(...)` calls into a comma expression, leaking the `gemini.diff.accept` command disposable and workspace change listener.

8. **[#28613 — fix: replace console.error with debugLogger in sdk session](https://github.com/google-gemini/gemini-cli/pull/28613)** (OPEN)
   Small hygiene PR aligning `packages/sdk/src/session.ts` with project logging conventions and removing an unneeded ESLint disable directive.

9. **[#28609 / #28610 — cherry-picks for v0.54.0-preview.1 and v0.53.1](https://github.com/google-gemini/gemini-cli/pull/28610)** (CLOSED)
   Automated release-management PRs propagating commit `f47d6c6` to preview and stable lines. The stable cherry-pick reported merge conflicts requiring manual resolution — worth verifying v0.53.1 integrity.

10. **[#28612 — chore/release: bump version to nightly](https://github.com/google-gemini/gemini-cli/pull/28612)** (OPEN)
    Automated nightly version bump accompanying today's v0.55.0-nightly release.

## 5. Feature Request Trends

- **AST-aware codebase tooling**: Multiple EPICs ([#22745](https://github.com/google-gemini/gemini-cli/issues/22745), [#22746](https://github.com/google-gemini/gemini-cli/issues/22746)) push for AST-aware file reads, search, and codebase mapping to reduce token noise and turn counts.
- **Agent observability & sharing**: Requests to expose subagent trajectories via `/chat share` ([#22598](https://github.com/google-gemini/gemini-cli/issues/22598)) and include subagent context in `/bug` reports ([#21763](https://github.com/google-gemini/gemini-cli/issues/21763)) indicate a need for better inner-loop debugging.
- **Proactive skill/agent usage**: The model under-utilizes custom skills and subagents ([#21968](https://github.com/google-gemini/gemini-cli/issues/21968)); "self-awareness" EPICs ([#21432](https://github.com/google-gemini/gemini-cli/issues/21432)) propose teaching the CLI its own flags, hotkeys, and execution model.
- **Sandboxing & safety**: Zero-dependency OS sandboxing for native bash workflows ([#19873](https://github.com/google-gemini/gemini-cli/issues/19873)) and guarding against destructive commands ([#22672](https://github.com/google-gemini/gemini-cli/issues/22672)) show growing demand for safety rails around autonomous shell use.
- **Memory system hardening**: Deterministic redaction, low-signal session quarantine, and invalid-patch surfacing ([#26522](https://github.com/google-gemini/gemini-cli/issues/26522), [#26523](https://github.com/google-gemini/gemini-cli/issues/26523), [#26525](https://github.com/google-gemini/gemini-cli/issues/26525)) are consolidating into a clear "Auto Memory maturity" workstream.

## 6. Developer Pain Points

- **Hangs and false progress**: The dominant theme. Generalist agent infinite hangs ([#21409](https://github.com/google-gemini/gemini-cli/issues/21409)), shell commands stuck in "Waiting input" ([#25166](https://github.com/google-gemini/gemini-cli/issues/25166)), retry hangs on capacity exhaustion (fixed in today's nightly), and MAX_TURNS reported as GOAL success ([#22323](https://github.com/google-gemini/gemini-cli/issues/22323)) all erode confidence in autonomous mode.
- **Permission/control regressions**: Subagents activating despite disabled agent configs ([#22093](https://github.com/google-gemini/gemini-cli/issues/22093)) and settings.json overrides being ignored by the browser agent ([#22267](https://github.com/google-gemini/gemini-cli/issues/22267)) signal that configuration semantics need to be stricter and more predictable.
- **400 errors from context/tool scaling**: Missing `thoughtSignature` regressions ([#28604](https://github.com/google-gemini/gemini-cli/issues/28604)) and hard tool-count ceilings ([#24246](https://github.com/google-gemini/gemini-cli/issues/24246)) are the most common request-level failures, both actively being fixed.
- **Browser agent environmental fragility**: Wayland failures ([#21983](https://github.com/google-gemini/gemini-cli/issues/21983)), locked-profile handling ([#22232](https://github.com/google-gemini/gemini-cli/issues/22232)), and ignored overrides ([#22267](https://github.com/google-gemini/gemini-cli/issues/22267)) make browser automation the least portable agent surface.
- **Workspace pollution**: The model creating tmp scripts in random directories ([#23571](https://github.com/google-gemini/gemini-cli/issues/23571)) adds cleanup overhead for developers trying to keep commits clean — a small but recurring quality-of-life complaint.

---

*Digest generated from public GitHub data for google-gemini/gemini-cli, 2026-08-01.*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-08-01

## Today's Highlights

Copilot CLI released **v1.0.78-0**, adding a new `/permissions` command for approval-mode switching, ACP `closeSession` support, and a default-on `allowDevToolCaches` sandbox setting. The community is still feeling the effects of recent regressions — plan-mode shell blocking, a Rust/JS type-conversion crash on 1.0.76, and session-resume/perf issues are the loudest topics. No substantive PR activity landed in the last 24 hours; both open PRs appear low-signal.

## Releases

**v1.0.78-0** — released within the last 24 hours:

- **Added**: `/permissions` to switch between approval modes.
- **Added**: ACP mode can now close sessions via the `closeSession` request.
- **Improved**: New sandbox setting `allowDevToolCaches` (on by default) grants sandboxed builds access to toolchain caches, registries, and installs so builds work without extra configuration.

## Hot Issues

- [#4188](https://github.com/github/copilot-cli/issues/4188) — **Regression on plan-mode**  
  Plan mode is blocking shell commands, including `gh`, which was previously used for issue reading/creation during planning. 7 comments, 3 👍. Community reaction: this feels like a regression that cripples common planning workflows.

- [#4305](https://github.com/github/copilot-cli/issues/4305) — **Failed to convert JavaScript value 'Undefined' into rust type 'String'**  
  Users upgrading to 1.0.76 see this immediately in response to any command. 4 comments, 4 👍 — likely broad-impact and version-specific.

- [#4078](https://github.com/github/copilot-cli/issues/4078) — **Scheduled prompts kill the existing prompt queue**  
  `/every` or `/after` prompts interrupt queued work and never resume the remaining queue. 4 comments. Important for automation-heavy users.

- [#4161](https://github.com/github/copilot-cli/issues/4161) — **`task_complete` tool unavailable after switching back to autopilot mode**  
  A regression of previously-fixed #1523. 4 comments, 4 👍. Autopilot completion handoffs are breaking for affected users.

- [#3183](https://github.com/github/copilot-cli/issues/3183) — **SDK: orphan `tool_use` left mid-conversation after hard kill + resume**  
  Resuming persisted sessions can produce 400 errors because `tool_use` blocks have no matching `tool_result`. 4 comments. Critical for SDK/resume reliability.

- [#4251](https://github.com/github/copilot-cli/issues/4251) — **Resume of a large session OOMs / grinds one CPU core for ~70 min in 1.0.74**  
  An A/B test isolates the regression to 1.0.74; memory usage is 3–4× higher. 1 comment, 1 👍. Serious for long-lived sessions.

- [#1352](https://github.com/github/copilot-cli/issues/1352) — **`sessionStart` hook stdout is not displayed in terminal UI**  
  Hook executes but output is silently discarded, preventing reminder/checklist/banner use cases. 3 comments, 3 👍. Long-standing and still unresolved.

- [#3215](https://github.com/github/copilot-cli/issues/3215) — **Fail Tool Calls with DeepSeek-V4 models**  
  `tool_use` IDs are reported without completing `tool_result`, causing 400 errors. 3 comments. Relevant to third-party model compatibility.

- [#2109](https://github.com/github/copilot-cli/issues/2109) — **ACP: support an `ask_user` / `ask_question` style extension method**  
  Request for ACP clients to surface structured clarifying questions back to users, beyond `session/request_permission`. 2 comments, 6 👍 — strong demand from ACP ecosystem builders.

- [#4325](https://github.com/github/copilot-cli/issues/4325) — **Session becomes permanently unloadable once `events.jsonl` exceeds V8's max string length**  
  Newly filed but severe: long-lived sessions can become impossible to resume, with no support path through `/resume`. 0 comments so far.

## Key PR Progress

No substantive PR activity was recorded in the last 24 hours. The two open PRs are:

- [#3163](https://github.com/github/copilot-cli/pull/3163) — **ViewSonic monitor**  
  Unrelated content with no meaningful connection to Copilot CLI. Likely spam/noise.

- [#4316](https://github.com/github/copilot-cli/pull/4316) — **Create devcontainer.json**  
  No description or maintainer discussion. Low-signal contribution.

## Feature Request Trends

- **Finer-grained permissions and approval UX**  
  Between the new `/permissions` command, the ACP `ask_user` request, and plan-review visibility complaints, users want more control over when and how the CLI acts.

- **Enterprise / organization policy distribution**  
  Several requests ask for server-managed settings and environment variables for local CLI installs, plus better propagation of org-enabled model lists.

- **Session usability improvements**  
  Pinned sessions should get their own grouping, sidebar navigation should support arrow keys, and conversation history should be scrollable with PageUp/PageDown/mouse wheel.

- **ACP / SDK observability**  
  Developers want token/context usage exposed via ACP messages, plus richer interaction primitives like `ask_user` and proper session closure support.

## Developer Pain Points

- **Regression whiplash between patch releases**  
  Plan-mode shell blocking, missing `task_complete`, and resume OOMs all regressed in recent versions, making upgrades risky.

- **Session resume and corruption issues**  
  Orphaned `tool_use` blocks, `events.jsonl` size limits, and lost todos after forked sessions make long-lived workflows fragile.

- **MCP configuration friction**  
  Strict JSON parsing rejects comments in `.mcp.json`, nested custom agents don't inherit MCP tools as documented, and too many configured MCP servers can break sub-agents.

- **Terminal rendering and input gaps**  
  Blank transcript sections, unresponsive sidebar keyboard navigation, and missing historical scroll interrupt core interactive flows.

- **Broken installer version pinning**  
  Requesting a specific version still installs the latest release, making downgrades during regressions effectively impossible.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

## Kimi Code CLI Community Digest — 2026-08-01

Data range: `MoonshotAI/kimi-cli` updates received through 2026-07-31.

### 1. Today's Highlights

No new releases landed in the last 24 hours. Activity focused on two long-running feature requests — remote session continuation (#1282) and persistent memory (#1283) — plus a new PR fixing double-encoded JSON tool arguments from certain providers. A terminal auto-scrolling bug and an older provider role error also received updates.

### 2. Releases

No new releases were published in the last 24 hours.

### 3. Hot Issues

Only 4 issues were updated in the last 24 hours; all are listed below.

- [#1282 [enhancement] Feature Request: Remote Control — Continue local sessions from any device](https://github.com/MoonshotAI/kimi-cli/issues/1282)  
  Would let users resume a local Kimi Code CLI session from a phone, tablet, or browser. This is a meaningful workflow-continuity feature for developers who need to step away from their desk. Community reaction has been strong: 9 comments and 23 👍.

- [#1283 [enhancement] Feature Request: Memory System — Persistent context across sessions](https://github.com/MoonshotAI/kimi-cli/issues/1283)  
  Proposes automatic/manual memory so Kimi Code CLI remembers project patterns, user preferences, and useful context across sessions. This could reduce repeated setup and context re-prompting. It has 8 comments but no upvotes recorded so far.

- [#2422 [bug] After conversation completed, scrolling to view output automatically jumps to bottom](https://github.com/MoonshotAI/kimi-cli/issues/2422)  
  Affects Kimi Code CLI 1.46.0 on Linux with `kimi2.6`. For long terminal outputs, auto-scroll prevents developers from reviewing earlier content. Low signal so far: 1 👍 and 2 comments, but a clear UX annoyance.

- [#796 [closed] error: the message at position 1 with role](https://github.com/MoonshotAI/kimi-cli/issues/796)  
  A closed issue reporting a `400` LLM provider error on KimiCLI/1.3 with `kimi-for-coding` on macOS. It was updated again in the last 24h, possibly as a related reference. Minimal community interaction: 1 comment and 0 👍.

### 4. Key PR Progress

Only 1 pull request was updated in the last 24 hours.

- [#2572 fix(kosong): recursively unwrap double-encoded JSON in tool-call arguments](https://github.com/MoonshotAI/kimi-cli/pull/2572)  
  Fixes Pydantic validation errors when providers return `function.arguments` with nested array/object values double-encoded as JSON strings. This affects tool calls like `SetTodoList`, `ExitPlanMode`, and `StrReplaceFile`. It is an important compatibility fix, especially for Moonshot API behavior. No comments/reactions yet.

### 5. Feature Request Trends

The most visible feature directions from all updated issues are:

- **Cross-device session continuity** — “Remote Control” to continue local CLI sessions from any device/browser (#1282).
- **Persistent memory/context** — automatic and manual memory across sessions (#1283).

Both requests were created by CatKang in late February and remained active through July, suggesting sustained developer interest in moving beyond single-terminal, ephemeral workflows.

### 6. Developer Pain Points

Recurring themes from the issues and PR in this window:

- **Terminal/TUI usability** — Scrolling behavior after a conversation completes is disruptive when reviewing long output (#2422).
- **Provider/API interoperability** — Developers are hitting provider-specific bugs such as malformed message roles (#796) and double-encoded JSON in tool-call arguments (#2572). These issues break otherwise straightforward CLI workflows and require defensive parsing/fixes.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-08-01

## Today's Highlights
The project is in a high-velocity maintenance window: 50 issues and 50 pull requests were updated in the last 24 hours, though no new release was cut. Contributor energy is concentrated on prompt-cache stabilization (#14743, #27378, #27007), running long shell commands in the background (#39978), and TUI/plugin ergonomics (#39985, #39988). Long-standing security and Windows regressions remain hot topics in the issue tracker (#16331, #28480).

## Hot Issues

- **[Permissions ignored (#16331)](https://github.com/anomalyco/opencode/issues/16331)** — 41 comments · 11 👍. Users report that `permission` rules like `*.env: deny` and `appsettings.json: deny` are bypassed by tool calls. The highest-engagement issue in this batch, with serious security-implications for agent sandboxing.

- **[`<system-reminder>` keeps moving, causing unnecessary prompt processing in llama.cpp (#23595)](https://github.com/anomalyco/opencode/issues/23595)** — 5 comments · 11 👍. The shifting system reminder invalidates prompt history caches, forcing expensive reprocessing. The strong 👍/comment ratio suggests wide cost/performance impact.

- **[OpenCode on Windows 11 not starting anymore (#28480)](https://github.com/anomalyco/opencode/issues/28480)** — 11 comments. After working for days, the app silently refuses to start: no error, no crash report. A frustrating and high-visibility desktop reliability regression.

- **[Write tool called with invalid parameters (#18131)](https://github.com/anomalyco/opencode/issues/18131)** — 12 comments · 4 👍. Reproduced with Qwen 3.5 in LM Studio, where the model emits malformed tool arguments. Similar reports in #24604 and #29142 show a pattern of local-model schema friction.

- **[Desktop support for Git submodule sessions (#7769)](https://github.com/anomalyco/opencode/issues/7769)** — 9 comments · 13 👍. Feature request for managing submodule sessions properly in the desktop version; the top-voted feature request in this batch.

- **[PowerShell tool still confuses agents (#20527)](https://github.com/anomalyco/opencode/issues/20527)** — 7 comments · 2 👍. Even after the PowerShell tool was added, agents still reach for Unix utilities like `tail` on Windows, indicating weak shell-tool selection heuristics.

- **[Skill enumeration is non-deterministic (#29950)](https://github.com/anomalyco/opencode/issues/29950)** — 4 comments. Duplicate skill roots via symlinks (`~/.claude/skills` ↔ `~/.agents/skills`) make auto-discovery order unstable. Important for Claude Code compatibility.

- **[Zen: `claude-opus-4-6` returns 500 on every request (#30283)](https://github.com/anomalyco/opencode/issues/30283)** — 2 comments. Advertised in `/zen/v1/models` but fails on both OpenAI-compatible and Anthropic transports. Direct service-quality issue for Zen subscribers.

- **[`github run` sub-agent inherits orchestrator model (#30289)](https://github.com/anomalyco/opencode/issues/30289)** — 2 comments. Plugin-configured per-ref models are ignored by sub-agents, causing orchestration workflows to run with the wrong model.

- **[Session "Load More" pagination broken with directory filter (#30109)](https://github.com/anomalyco/opencode/issues/30109)** — 2 comments · 3 👍. `GET /session` ignores `offset` when `directory` is specified, breaking custom API clients.

## Key PR Progress

- **[feat: add `OPENCODE_AIRGAP` to disable automatic internet access (#39994)](https://github.com/anomalyco/opencode/pull/39994)** — Adds a kill-switch for air-gapped/intranet deployments. Directly addresses enterprise offline/security needs.

- **[feat(background): run long-running shell commands without blocking the conversation (#39978)](https://github.com/anomalyco/opencode/pull/39978)** — Adds background job support, an HTTP API to list/cancel jobs, and a TUI badge showing active background tasks.

- **[fix(cache): improve Anthropic prompt cache hit rate with system split and tool stability (#14743)](https://github.com/anomalyco/opencode/pull/14743)** — Long-running fix for cross-session and cross-repo cache misses by stabilizing the system-prompt prefix and tool ordering.

- **[fix(cache): stabilize system prefix behind `OPENCODE_EXPERIMENTAL_CACHE_STABILIZATION` (#27378)](https://github.com/anomalyco/opencode/pull/27378)** — Part 3 of 4 in the stacked prompt-cache fix; makes the system prefix stable enough for Anthropic caching.

- **[feat(cache): add cache token audit logging behind `OPENCODE_EXPERIMENTAL_CACHE_AUDIT` (#27007)](https://github.com/anomalyco/opencode/pull/27007)** — Adds logging for cache token usage, giving developers visibility into cache hit/miss costs.

- **[feat(session): inject debugging-loop hint when the same shell command keeps failing (#39990)](https://github.com/anomalyco/opencode/pull/39990)** — Detects repeated non-zero exits and nudges the model to stop cycling through hypotheses at the same layer.

- **[fix(tui): discover plugins across config roots (#39988)](https://github.com/anomalyco/opencode/pull/39988)** — Auto-discovers TUI plugins from global config and ancestor `.opencode/plugins/tui` directories; supersedes the narrower #39981.

- **[fix(tui): share runtime with external TSX plugins (#39983)](https://github.com/anomalyco/opencode/pull/39983)** — External V2 TUI plugins in packaged Bun executables now use the host OpenTUI/Solid runtimes, fixing frozen JSX after initial render.

- **[feat(app): add configurable send key (Enter / Shift+Enter / Ctrl+Enter) (#39985)](https://github.com/anomalyco/opencode/pull/39985)** — Adds a Settings → General → Input option for message-send behavior. Small, but a high-visibility TUI usability improvement.

- **[feat(tool): concise error output for failed shell commands (#39982)](https://github.com/anomalyco/opencode/pull/39982)** — Reduces noisy shell-failure output and complements the background-job work in #39978 with smarter timeout and error reporting.

## Feature Request Trends

- **Prompt Caching & Cost Transparency** — Users want stable system prompts, cache TTL configuration, and audit logging to reduce LLM latency and spend. Evidence: #23595, #16848, plus PRs #14743, #27378, #27007.

- **Air-Gapped & Intranet Deployments** — The new `OPENCODE_AIRGAP` PR (#39994) and related issue references show growing demand for fully offline operation.

- **TUI & Desktop Usability** — Configurable send key, transparent background, no-browser launch, and better diff/tab interactions are all in flight. Evidence: #39985, #5657, #39984, #39389, #39942.

- **Windows & Non-Linux Shell Environments** — Nushell support, PowerShell tool behavior, WSL connectivity, and Termux compatibility appear repeatedly. Evidence: #20573, #20527, #30230, #30248.

- **Plugin & Agent Orchestration Extensibility** — Custom side-effect slash commands (#30268), per-ref sub-agent model selection (#30289), and runtime model discovery for Requesty (#30285) point toward a more pluggable agent layer.

## Developer Pain Points

- **Tool-call schema errors with third-party/local models** — Repeated reports of `write`/`edit` being called with invalid parameters or missing `content` fields, especially with LM Studio and OpenAI-compatible models (#18131, #24604, #29142).

- **Prompt-cache instability** — Moving `<system-reminder>` and unstable system prefixes invalidate caches, causing wasted tokens and slow llama.cpp processing (#23595, #14743).

- **Windows reliability gaps** — Silent startup failure, no crash logs, random character output after exit, and missing desktop buttons all disrupt Windows users (#28480, #20989, #29867).

- **Shell command ergonomics** — Long-running commands block the conversation, failed commands produce noisy output, and agents can get stuck repeating the same failing shell command (addressed in #39978, #39982, #39990).

- **API/session regressions for automation** — `GET /session/status` no longer aggregates child directories, `GET /session` pagination breaks with directory filters, and desktop symlinked paths split sessions (#30094, #30109, #30260).

- **Environment/install failures** — Desktop background dependency installs fail on `@opencode-ai/plugin@local`, and Termux hits tagged-pointer errors, preventing clean setup (#30197, #30248).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-08-01

## Today's Highlights

Qwen Code shipped **v0.21.2**, while the maintainer community remains focused on hardening the `qwen serve` daemon, improving Autofix transparency, and stabilizing the Anthropic/Gemini model-converter layer. Several CI/E2E failures were opened by the automation bot, and a wide batch of PRs from the `autofix/takeover` pipeline landed around review tooling, Web Shell behavior, and CLI/runtime refactors.

## Releases

- **v0.21.2** — released 2026-08-01. No detailed changelog was included in the captured data, but the release tag is live: [v0.21.2](https://github.com/QwenLM/qwen-code/releases/tag/v0.21.2)

## Hot Issues

1. **[RFC] Support multiple workspaces in one `qwen serve` daemon** — [Issue #6378](https://github.com/QwenLM/qwen-code/issues/6378)  
   Long-running RFC with 31 comments. Proposes moving from “1 daemon = 1 workspace” to multi-workspace sessions while preserving existing client behavior. The high engagement reflects how central daemon/session management has become.

2. **Tracking: bound multi-workspace daemon resource usage** — [Issue #8051](https://github.com/QwenLM/qwen-code/issues/8051)  
   Follow-up to #6378 with 9 comments. Count-only limits are not enough; the daemon needs to bound bytes held by request bodies, WebSocket assembly, and other in-memory state.

3. **Deferred tool discovery invalidates prompt cache prefixes** — [Issue #6721](https://github.com/QwenLM/qwen-code/issues/6721)  
   7 comments. When `tool_search` reveals a hidden deferred tool, the real schema is added via `setTools()`, which breaks prompt cache prefixes. Important for long-running sessions with dynamic tool discovery.

4. **Anthropic 4.6+ assistant-prefill 400 + `thinking.display` silently defaults to ‘omitted’** — [Issue #8039](https://github.com/QwenLM/qwen-code/issues/8039)  
   Closed P1 with 6 comments. Affects Claude Opus/Sonnet 4.6+ and 5.x families. Includes two related Anthropic wire-compatibility bugs, both now fixed.

5. **Daemon gives each ACP child 50% of host memory, never divided by child count** — [Issue #8182](https://github.com/QwenLM/qwen-code/issues/8182)  
   Serious memory-accounting bug: multiple `qwen --acp` children can each receive a huge V8 old-space ceiling. 3 comments, open.

6. **Model outputs XML-style tool calls as plain text in long sessions** — [Issue #8003](https://github.com/QwenLM/qwen-code/issues/8003)  
   3 comments. In 200+ turn sessions, `qwen3.8-max-preview` sometimes emits `<invoke>`/`<parameter>` XML instead of `tool_calls`, breaking structured tool use.

7. **JSON-style tool call arguments leak as plain text** — [Issue #8207](https://github.com/QwenLM/qwen-code/issues/8207)  
   Similar to #8003, but in a production DataAgent session: tool arguments were serialized as plain text instead of a structured `tool_call`. Highlights a recurring reliability gap in long-context model output.

8. **Windows: validated `@`-file reads lose O_NOFOLLOW and may have vacuous dev/ino identity checks** — [Issue #8227](https://github.com/QwenLM/qwen-code/issues/8227)  
   Follow-up to #7206. `O_NOFOLLOW` does not exist on Windows, so symlink/TOCTOU protections are weaker and untested. Security-relevant for Windows users.

9. **Session branching with optional Git worktree isolation** — [Issue #8271](https://github.com/QwenLM/qwen-code/issues/8271)  
   Feature proposal with 2 comments. Requests branching any session from its latest state or a completed Assistant response, optionally backed by Git worktrees for isolation.

10. **SGR mouse escape sequences leak into TUI input box** — [Issue #8267](https://github.com/QwenLM/qwen-code/issues/8267)  
    Reproduced in v0.21.2: SGR Extended Mouse Mode events (`ESC [ <…M`) are injected as raw text into the input buffer. Breaks normal terminal input on startup.

## Key PR Progress

1. **[CI] Use `QWEN_CODE_TEST_CRON_FAST` in ACP cron test** — [PR #8243](https://github.com/QwenLM/qwen-code/pull/8243)  
   Adds a test seam so cron jobs auto-fire after 5 seconds instead of waiting for the wall-clock minute boundary. Directly targets the repeated `acp-cron` E2E failure.

2. **[CLI] Add `ui.mouseTracking` setting to restore right-click and URL clicks** — [PR #8198](https://github.com/QwenLM/qwen-code/pull/8198)  
   Two-layer fix for the VP-mode mouse regression: adds an opt-out setting and restores right-click / URL-click behavior. Likely relevant to #8267.

3. **[Workflows] Bubble workflow agent approvals to foreground UI** — [PR #8240](https://github.com/QwenLM/qwen-code/pull/8240)  
   Completes the foreground Dynamic Workflow permission path. Shell, edit, MCP, and information-request approvals surface through the parent TUI, ACP host, or stream-json channel.

4. **[CLI] Remove ACP private serve dependencies** — [PR #8141](https://github.com/QwenLM/qwen-code/pull/8141)  
   Refactor moving lifecycle-free ACP/daemon contracts from private `serve/**` code into `runtime/**`, reducing coupling and improving maintainability.

5. **[CI] Upgrade review runner’s qwen CLI to npm latest per run** — [PR #8265](https://github.com/QwenLM/qwen-code/pull/8265)  
   Fixes stale-version review results: the runner was posting in the old `chunk N` format because it executed with qwen 0.20.0 instead of the current release.

6. **[Review] Test Plan claim check, base-tree A/B harness, per-hunk probes** — [PR #8215](https://github.com/QwenLM/qwen-code/pull/8215)  
   Gives `/review` three verification capabilities inspired by maintainer verification workflows: validating Test Plan claims, A/B behavior comparison, and targeted per-hunk probing.

7. **[CLI] Add TUI image display tool** — [PR #8217](https://github.com/QwenLM/qwen-code/pull/8217)  
   Adds a `display_image` tool for the interactive TUI. Validates absolute PNG paths, file signature, and an 8 MiB limit, and persists only a structured path/MIME type.

8. **[Anthropic] Cascade-strip stale thinking siblings when their `tool_use` is orphaned** — [PR #8166](https://github.com/QwenLM/qwen-code/pull/8166)  
   Cleans up `thinking`/`redacted_thinking` blocks when the paired `tool_use` is removed, preventing malformed Anthropic messages.

9. **[Web Shell] Isolate automatic recap by session** — [PR #8262](https://github.com/QwenLM/qwen-code/pull/8262)  
   Prevents a recap from one Web Shell session being inserted after the user switches to another session. Tracks originating session and generation.

10. **[VS Code] Traverse distinct resolved versions in notices generator** — [PR #8272](https://github.com/QwenLM/qwen-code/pull/8272)  
    Fixes the third-party notice generator keying only by package name, which silently skipped packages existing at multiple resolved versions.

## Feature Request Trends

- **Daemon/multi-workspace evolution** — The most active area is moving `qwen serve` from single-workspace to multi-workspace support with bounded resource usage ([#6378](https://github.com/QwenLM/qwen-code/issues/6378), [#8051](https://github.com/QwenLM/qwen-code/issues/8051)).
- **Session branching and state isolation** — Users want to branch from any completed Assistant response, with optional Git worktree isolation ([#8271](https://github.com/QwenLM/qwen-code/issues/8271)).
- **Bundled skill controls** — A single “disable all bundled skills” switch was requested to replace one-by-one denylisting ([#8054](https://github.com/QwenLM/qwen-code/issues/8054)).
- **TUI/Web Shell interactivity** — Requests include image display in the TUI, mouse tracking escape hatches, and Web Shell mobile stability ([#8217](https://github.com/QwenLM/qwen-code/pull/8217), [#8198](https://github.com/QwenLM/qwen-code/pull/8198), [#8263](https://github.com/QwenLM/qwen-code/pull/8263)).
- **CI/Autofix reliability** — Strong interest in making automated verification and Autofix more trustworthy: test seams, budget announcements, and better review tooling.

## Developer Pain Points

- **Tool-call degradation in long sessions** — Models increasingly emit XML or JSON tool calls as plain text instead of structured `tool_calls`, especially at high context sizes ([#8003](https://github.com/QwenLM/qwen-code/issues/8003), [#8207](https://github.com/QwenLM/qwen-code/issues/8207)).
- **Anthropic converter edge cases** — Frequent breakage around `tool_use` ordering, orphaned tool calls, unsanitized IDs, prefill 400s, and `thinking` block handling ([#8039](https://github.com/QwenLM/qwen-code/issues/8039), [#8159](https://github.com/QwenLM/qwen-code/issues/8159), [#8160](https://github.com/QwenLM/qwen-code/issues/8160), [#8161](https://github.com/QwenLM/qwen-code/issues/8161)).
- **Daemon resource overcommit** — The daemon’s count-only limits and per-child memory ceilings are not safely bounding real memory usage ([#8182](https://github.com/QwenLM/qwen-code/issues/8182), [#8051](https://github.com/QwenLM/qwen-code/issues/8051)).
- **Flaky E2E CI** — Repeated failures in cron, subagent, MCP, and async tool tests require ongoing automation follow-up ([#8237](https://github.com/QwenLM/qwen-code/issues/8237), [#8244](https://github.com/QwenLM/qwen-code/issues/8244), [#8076](https://github.com/QwenLM/qwen-code/issues/8076)).
- **Windows-specific regressions** — Missing `O_NOFOLLOW`, SGR mouse escape leak, and React errors remain recurring themes for Windows users ([#8227](https://github.com/QwenLM/qwen-code/issues/8227), [#8267](https://github.com/QwenLM/qwen-code/issues/8267), [#5199](https://github.com/QwenLM/qwen-code/issues/5199)).
- **Subagent/user interaction deadlock** — Subagents can ask questions but the main agent does not collect or forward them, leaving the subagent waiting forever ([#7835](https://github.com/QwenLM/qwen-code/issues/7835)).

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar).*