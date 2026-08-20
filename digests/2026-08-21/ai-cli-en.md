# AI CLI Tools Community Daily Digest 2026-08-21

> Generated: 2026-08-21 02:30 (GMT+8) | Coverage: 7 CLIs + Claude Code Skills
> This digest is produced by the agents-radar local automation. All summaries, comparisons and writing are done by the executing agent — no external LLM API is called.

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

# AI CLI Tools Cross-Tool Comparison Report (2026-08-21)

## 1. Ecosystem Overview

AI CLI tools have entered a "daily-release" competition: today Claude Code, OpenAI Codex, Gemini CLI, GitHub Copilot CLI, OpenCode and Qwen Code all shipped versions, with the surrounding ecosystem (IronClaw / EasyClaw / Moltis / CoPaw) releasing in sync. Community focus has shifted further from "model capability" to "engineering trust and platform quality" — Windows-quality issues (especially Codex), TUI interaction details, post-compaction memory persistence, and sandbox/permission least-trust boundaries are now common pain points across tools. A clear trend: **automation bots are deeply involved in each tool's release quality gates** (`copyberry[bot]` for Codex, `qwen-code-review-bot` for Qwen, `opencode-agent` for OpenCode), raising fix/release cadence while widening the voice gap between internal automation and external human contributors.

## 2. Activity Comparison (last 24h)

| Tool | Active Issues | Notable PRs | Releases (today) |
|------|--------------|------------|------------------|
| Claude Code | 12+ (high-upvote) | 0 | v2.1.236 / v2.1.237 |
| OpenAI Codex | 12 (Windows-led) | 12+ (bot-driven) | rust-v0.149.0-alpha.4 / .3 / .2 / .1 |
| Gemini CLI | 16 | 12+ | v0.56.0 (stable) / v0.57.0-preview.0 |
| GitHub Copilot CLI | 14+ | 1 | v1.0.81-6 / -5 / -4 / -3 / -2 |
| Kimi Code CLI | 0 | 0 | none |
| OpenCode | 14 | 12+ | v1.18.19 |
| Qwen Code | 0 (issues) | 12+ | v0.21.15 |

## 3. Shared Themes

- **Windows / cross-platform quality**: Codex Windows freeze (#20214, 86👍/107💬), standalone installer wish (#13993, 242👍), Trusted RPC browser-plugin failure (#39136); Copilot `wta.exe` quote bug (#4540) and sandbox blocking git (#4524); OpenCode `/tmp` leak and Sidecar timeout references. Windows is the #1 pain platform.
- **TUI stability**: Claude Code copy/paste indentation pollution (#18170, 287👍/134💬) remains the top complaint; OpenCode clipboard silent-failure fix (#41924) still open; Gemini scroll/render (#13107, #10673) and image drag-drop (#27855) recur.
- **Context & post-compaction memory**: Claude Code user-built cross-compaction memory (#34556, 98💬); OpenCode "aborted stream recorded as clean stop" (#37852, 56👍) distorts subagent usage stats; Gemini subagent false GOAL success (#22323) still discussed.
- **Permission / sandbox least-trust**: Copilot over-aggressive sandbox (#4524), `store_memory` failure in 1.0.81 (#4535), non-interactive bypass of managed settings (#4103); Codex tightening Git-command trust and isolating plugin Git ops earn community approval.
- **Model compatibility & cost transparency**: Codex GPT-5.6 serialization adds 27–45% weighted usage (#35050, 72👍); OpenCode gpt-5.6 param-injection/empty-response references persist; Qwen routing token-count fix (#9506) now binds routing identity.
- **Automated release quality gates**: Codex `copyberry[bot]` merged 12+ PRs today; Qwen `qwen-code-review-bot` shipped v0.21.15; OpenCode `opencode-agent` continuous — AI is deeply embedded in its own engineering.

## 4. Differentiation

- **Claude Code**: highest expectations, sharpest feedback; v2.1.237 adds "Concise" output style + prompt-caching fix; positions as the professional developer's daily terminal. PR side silent in 24h → stabilization phase.
- **OpenAI Codex**: Rust rewrite ongoing, bot-driven cadence; Windows quality & desktop integration (Computer Use, browser plugin) are the biggest shortcomings; security direction (Git trust tightening, plugin isolation) approved.
- **Gemini CLI**: clean stable/preview split; PRs on security hardening (Cloud Workstations OAuth, IDE connection, env-change consent) and model onboarding (Gemini 3.6/3.7 Flash); mature-middle.
- **GitHub Copilot CLI**: strongest enterprise-governance context; v1.0.81-6 adds `defaultMode`/`defaultPermissionMode` and `--with-token`; positions as the managed Copilot entry point.
- **Kimi Code CLI**: zero activity today; early-silent stage.
- **OpenCode**: highly active community; v1.18.19 adds Cloudflare AI Gateway native passthrough, Codex rate-limit alignment, Go provider web search; pain in data-loss TUI defects and gpt-5.6 compat; positions for latest-model / customizable developers.
- **Qwen Code**: v0.21.15 strengthens Web Shell attachments, hybrid Thinking toggle, `/review --resume`, authenticated HTTPS Git extension installs; mature industrial release/CI bot system.

## 5. Notable Trend Signals

- **Windows is an unsatisfied hard market** — a differentiator for latecomers who treat Windows quality as first-class.
- **TUI basics are a hard selection criterion** — copy/paste, scroll, image drag-drop top the upvote charts; real-terminal testing should precede model-capability comparison.
- **Memory persistence is the next watershed** — retrievable + private + controllable history together builds long-term stickiness.
- **Automated release gates are double-edged** — faster fixes but diluted external human voice; demands stronger human-review mechanisms.
- **Model behavior changes hit the bill directly** — verify cost at small scale before large switches; require routing-identity-bound usage stats.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

# Claude Code Daily (2026-08-21)

## Today
- Shipped v2.1.237 and v2.1.236: v2.1.237 adds a built-in "Concise" output style and fixes prompt caching under custom base URLs; v2.1.236 adds `ANTHROPIC_DEFAULT_MODEL`, cross-session `notify_when_idle`, macOS sandbox wildcard read-deny hardening, and several render/session fixes.
- Top community complaints: terminal copy/paste (#18170, 287👍/134💬), multi-account switching (#36151, 847👍), cross-compaction memory (#34556, 98💬).
- PR side silent in 24h (0) — mainline in stabilization.

## Releases
**v2.1.237** — Fixed prompt caching for sessions using an LLM gateway or custom base URL; added a built-in "Concise" output style (results-first, no preamble) selectable under `/config` → Output style.
**v2.1.236** — Added `ANTHROPIC_DEFAULT_MODEL` env var; `notify_when_idle` for cross-session `SendMessage`; macOS sandbox wildcard read-deny precedence; fixed clipboard/session/MCP breakage after dir removal, fullscreen renderer fallback, `/model` overflow, malformed tag rejection, WSL powershell unhandled rejections, fullscreen new-message refresh.

## Hot Issues (active 24h)
1. #6235 Support AGENTS.md (6335👍) 2. #36151 Multi-account switching (847👍) 3. #18170 Copy/paste indentation (287👍/134💬) 4. #84352 CVP-approved org still cyber-safeguard blocked (130💬) 5. #60705 /goal stop-hook as authorization (127💬) 6. #10199 API 400 thinking-block (65👍/100💬) 7. #34556 Persistent memory (98💬) 8. #4953 120GB memory leak OOM (75👍/97💬) 9. #32479 GitHub Connector not recognized (140👍/89💬) 10. #22543 Cowork 10GB VM (259👍/76💬) 11. #79337 Fable 5 usage-credit prompt (75💬) 12. #63875 Model tool-call unparseable (116👍/75💬).

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Daily (2026-08-21)

## Today
- Released rust-v0.149.0-alpha.4 (+ .3/.2/.1), placeholder notes. Windows dominates community: App freeze (#20214, 86👍/107💬), standalone installer (#13993, 242👍), Trusted RPC browser-plugin failure (#39136, 82💬). `copyberry[bot]` merged 12+ PRs (model defs, unified exec, MCP event stream, permission-profile selection).

## Releases
rust-v0.149.0-alpha.4 / -alpha.3 / -alpha.2 / -alpha.1 (2026-08-19 ~ 08-20).

## Hot Issues
1. #20214 Windows freeze (86👍/107💬) 2. #28969 Disable 60s auto-resolve (201👍/83💬) 3. #39136 Trusted RPC browser-plugin fail (82💬) 4. #13993 Standalone Windows installer (242👍) 5. #39397 0.148 prompt_cache_retention on gpt-5.6-sol (41💬) 6. #30009 apply_patch windows sandbox (34💬) 7. #28507 Model at capacity (33💬) 8. #38455 Computer Use V8 OOM (32💬) 9. #25178 Windows Computer Use screenshot (28💬) 10. #39239 `\\?\` path archive fail (26💬) 11. #39162 macOS auth invalidation (25💬) 12. #35050 GPT-5.6 serialization +27–45% usage (72👍/25💬).

## Recent PRs (`copyberry[bot]`-led)
#39770 Refresh bundled model defs · #39765 suggestion IDs in plugin metadata · #39761 app-server MCP event streaming · #39757 unified exec · #39756 cache shell snapshots · #39755 managed dev instructions · #39752 uncompiled permission-profile selection · #39749 filesystem dir-walk backend · #39746 resumed thread capability roots · #39744 skip postprocessing short input · #39741 model-specific auto-review · #39738 Guardian runtime settings.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Daily (2026-08-21)

## Today
Shipped v0.56.0 (stable) and v0.57.0-preview.0. PRs on Cloud Workstations OAuth, IDE connection fix, env-change consent, Gemini 3.6/3.7 Flash onboarding, subagent false-success fix. Hot issues: public roadmap (#4191, 173👍), post-V1.0 work (#3132, 150👍), model availability (#28802, 40👍).

## Releases
- v0.56.0 stable — [compare v0.55.1...v0.56.0](https://github.com/google-gemini/gemini-cli/compare/v0.55.1...v0.56.0).
- v0.57.0-preview.0 — Cloud Workstations proxy redirect URI (#28688), IDE dir-mismatch fix (#28729), eval validation (#28344/#28305), context-aware silent retries (#28790), multi-turn rollback on cancel (#28801).

## Hot Issues
#4191 Roadmap (173👍) · #3132 Post-V1.0 (150👍/45💬) · #28802 Gemini 3.x Flash available (40👍/10💬) · #27393 configurable command-substitution wall (19💬) · #28052 trailing-dot URL load fail (14💬) · #22323 subagent false GOAL (12💬) · #21409 generalist hang (8💬) · #27855 terminal image drag-drop (8💬) · #19873 zero-dep OS sandbox (8💬) · #22745 AST-aware reads (7💬).

## Recent PRs
#28932 Antigravity agent runner · #28915 symlink eval consistency · #28931 default stable channel docs · #28863 env-change consent · #28933 iterative orchestrator · #28867 block subagents when disabled · #28910 Gemini 3.7/3.6 Flash · #28828 preview-model substitution warning · #28926 Windows longpaths · #28917 Whisper atomic download.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Daily (2026-08-21)

## Today
Shipped v1.0.81-2 through -6. v1.0.81-6 adds `defaultMode`/`defaultPermissionMode`, `--with-token` login, ACP subagent IDs + live title/mode/command/plan updates, background Canvas. Community: `store_memory` fails in 1.0.81 (#4535), sandbox blocked git (#4524). Only 1 PR (#4510 removing Copilot CLI docs from README, external account).

## Releases
v1.0.81-6 — `defaultMode`/`defaultPermissionMode`, `--with-token`; ACP client subagent IDs + event subscriptions + live metadata; `/instructions` per-file; managed settings win per-entry for enabledPlugins/extraKnownMarketplaces; Canvas opens in background. (-5/-4/-3/-2: "Fixes and changes".)

## Hot Issues
#4535 store_memory fails `Instance id required` · #4524 sandbox blocks git · #4103 marketplace clone disables Git credential helpers · #4540 wta.exe quote bug 0x80070002 · #4447 Backspace deletes words · #4503 SDK server ready-before-auth · #4439 GitLab MCP OAuth issuer mismatch · #4390 org models missing · #4096 third-party MCP tools missing · #4206 GitHub MCP handshake stall.

## Recent PRs
#4510 Remove GitHub Copilot CLI docs from README (@prioritizedprotection086, open).

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI Daily (2026-08-21)

## Today
Completely silent: 0 issues, 0 PRs, 0 releases. Compared with yesterday's only ACP Grep/Glob limitation (#2609, closed), no new activity — ecosystem still in early silent stage.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Daily (2026-08-21)

## Today
Shipped v1.18.19: Cloudflare AI Gateway OpenAI/Anthropic native passthrough, Codex rate-limit alignment, removed Qwen sampling defaults that sent unsupported settings, Go provider web search. 14 active issues; focus on data-loss TUI defects, "aborted stream recorded as clean stop" (#37852, 56👍), gpt-5.6 compat, async sub-agent delegation (#5887, 98👍). 12+ PR updates.

## Release
v1.18.19 — Gateway passthrough; rate-limit alignment; Qwen sampling default removal; `/connect` authed providers; malformed pricing ignored; OpenAI ws size fallback; ChatGPT workspace residency forwarded; Go provider web search; v1 DB compat. Desktop: editable saved server details.

## Hot Issues
#5887 Async/background sub-agent delegation (98👍) · #37852 aborted stream as clean stop (56👍) · #11865 Tasks/Subagents stuck no timeout (19💬) · #27906 v1.15.1+ breaks Bun (16💬) · #7006 permission.ask hook not triggered (23👍) · #13626 auto-sync projects (26💬) · #11232 native scheduling (33💬) · #10531 native multimodal (16💬) · #25848 session rename · #29462 skills enumerated unbounded.

## Recent PRs
#40310 llmgateway-providers · #43674 QwenCloud International · #43574 model variant fallbacks · #43123 structured content to models (MCP) · #40857 reject foreign dir hints · #43664 preserve slashes in model IDs · #43665 exclude 'unknown' finish · #41924 surface clipboard failures · #43498 Vertex Anthropic continuations · #43695/#43690 Ox Alpha model docs.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Daily (2026-08-21)

## Today
Shipped v0.21.15: Web Shell file attachments, hybrid Thinking toggle, `/review --resume`, authenticated HTTPS Git extension installs, bottom-sheet tool approvals. 0 new issues in 24h window; 12+ PR updates; mature `qwen-code-review-bot` release system.

## Release
v0.21.15 — Web Shell attachments + streaming + sidebar sync (#9405/#9477/#9570/#9533); hybrid Thinking toggle + qwen3.8-max in `/model` (#9574/#9383); `--resume` for `/review` & CI retries (#9153); authenticated HTTPS Git extension installs (#9458); bottom-sheet approvals (#9351); `/rewind` history-drop & duplicate tool-call ID fixes (#9331/#9436).

## Recent PRs
#9332 fetch-pr --since widening · #9190 content-anchored review-fix loop · #9513 restore PR2A-narrowed behaviors · #9500 sync skill state with eviction · #9606 chore(release) v0.21.15 · #9590 provider-aware reasoning · #7803 agent view roster UI · #9392 TLS-enabled daemon reachability · #9526 convergence advisory · #9530 uncapped forget scan · #9577 release CI hardening · #9568 compression token banner.

</details>

---

## Claude Code Skills Community Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills) | active 24h

- #1613 claude-api frontmatter description exceeds 1024-char limit (open) — metadata length constraint.
- #1616 Fix claude-api description limit (@BRGOVIND, open).
- #1615 Add scnet-hpc skill (@lql341, open).
- #1614 Add web-security-audit skill (@cnbruce, open).
- #807 Add x-twitter-scraper skill (@kriptoburak, merged).

Skills ecosystem calm today — single-point bug fixes and new skills, no large architectural debate.

---

*Generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar). Data fetched live from GitHub public APIs and written by the executing agent — no external LLM used.*
