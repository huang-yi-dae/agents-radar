# OpenClaw Ecosystem Community Daily Digest 2026-08-21

> Generated: 2026-08-21 02:30 (GMT+8) | Coverage: OpenClaw + 12 peer projects
> This digest is produced by the agents-radar local automation. All summaries, comparisons and writing are done by the executing agent — no external LLM API is called.

- [OpenClaw](https://github.com/openclaw/openclaw)
- [NanoBot](https://github.com/HKUDS/nanobot)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [NanoClaw](https://github.com/nanocoai/nanoclaw)
- [NullClaw](https://github.com/nullclaw/nullclaw)
- [IronClaw](https://github.com/nearai/ironclaw)
- [LobsterAI](https://github.com/netease-youdao/LobsterAI)
- [TinyClaw](https://github.com/TinyAGI/tinyclaw)
- [CoPaw](https://github.com/agentscope-ai/CoPaw)
- [Moltis](https://github.com/moltis-org/moltis)
- [ZeptoClaw](https://github.com/qhkm/zeptoclaw)
- [EasyClaw](https://github.com/gaoyangz77/easyclaw)

---

## Cross-Ecosystem Comparison

# OpenClaw Cross-Ecosystem Comparison (2026-08-21)

## 1. Ecosystem Overview

OpenClaw core shipped 35 PR updates, 0 issues, 0 release — mainline focuses on **auth consistency, memory/wiki context governance, Control UI and HTTP boundaries**. Among 12 peers, NanoBot / Zeroclaw / IronClaw / CoPaw are most active; NullClaw / TinyClaw / ZeptoClaw are completely silent. The overall trajectory moves from "single-agent chat" to **multi-channel (Telegram/Matrix/Slack/WhatsApp) + persistent memory + automation (automations/run-now) + enterprise sandbox/auth**.

## 2. Activity Comparison (last 24h)

| Project | Issues | PRs | Releases |
|---------|--------|-----|----------|
| OpenClaw | 0 | 35 | — |
| NanoBot | 4 | 29 | — |
| Zeroclaw | 3 | 35 | — |
| PicoClaw | 0 | 3 | — |
| NanoClaw | 1 | 35 | — |
| NullClaw | 0 | 0 | — |
| IronClaw | 1 | 35 | v1.3.0 |
| LobsterAI | 2 | 7 | — |
| TinyClaw | 0 | 0 | — |
| CoPaw | 7 | 35 | v2.1.1-beta.1 |
| Moltis | 1 | 6 | 20260820.01 |
| ZeptoClaw | 0 | 0 | — |
| EasyClaw | 0 | 0 | v1.8.105~v1.8.101 |

## 3. Shared Themes

- **Multi-channel reliability**: NanoBot (Telegram stickers #5387, Matrix error logs #5458, Slack redirect #5414), NanoClaw (WhatsApp media unreachable #2715, Slack agents #3421, Cursor SDK #3356), Moltis (WhatsApp Markdown #1220, reply-as-address #1217).
- **Memory & context governance**: OpenClaw oversized-wiki crowding fix (#126779), import-failure surfacing (#126738); IronClaw AfterTurn memory curation (#7765); CoPaw ReMe runtime dashboard (#6984), PowerContext LTM (#7080).
- **Automation & enterprise**: IronClaw structured automations + per-user sandbox proxy (#7732/#7779), executable run-gate notifications (#7699); CoPaw self-hosted multi-user Hub (#7112).
- **Security hardening**: Moltis Vault unlock/recovery auth fix (#1216, CWE-306); CoPaw master-key owner-only perms (#7119).
- **Context compaction & quota**: Zeroclaw window-ratio anchoring (#9535), context-exhaustion terminal notice (#9504); NanoClaw token usage (#3270).

## 4. Differentiation

- **OpenClaw**: ecosystem hub — Control UI / auth / memory-wiki / HTTP boundary, enterprise-managed context.
- **NanoBot**: widest channels (Telegram/Matrix/Slack/WebUI), channel robustness & gateway logs.
- **Zeroclaw**: Rust core, RFC-driven "lighter core + external integrations", context compaction & telemetry governance.
- **NanoClaw**: multi-provider onboarding (WhatsApp/Slack/Cursor/Codex), token usage & mounts.
- **IronClaw**: per-user sandbox + structured automations + doc editing + Telegram linked devices, team/enterprise-leaning.
- **LobsterAI**: cowork file cards / split preview, settings search, experience-focused.
- **CoPaw (QwenPaw)**: ReMe memory, self-hosted Hub, console perf — among the most active communities.
- **Moltis**: WhatsApp-centric, channel security (Vault auth).
- **EasyClaw (rivonclaw)**: high-frequency point releases (multiple/day), vertical features (BD-agent filtering).
- **PicoClaw / NullClaw / TinyClaw / ZeptoClaw**: low-activity or silent.

## 5. Trend Signals

- **Silent projects need attention**: NullClaw / TinyClaw / ZeptoClaw at 0 activity for multiple days — ecosystem health is diverging.
- **Automation becomes first-class**: IronClaw/CoPaw automations/run-now/Hub signal agents moving from "chat" to "orchestrated tasks".
- **Security from optional to mandatory**: Vault auth gaps (CWE-306), master-key perms, MCP credential retention are frequent fixes.
- **Memory is the cross-project main line**: from OpenClaw wiki to IronClaw/CoPaw memory systems, persistent memory is the 2026 agent-framework battleground.

---

## Per-Project Details

<details>
<summary><strong>OpenClaw</strong> — <a href="https://github.com/openclaw/openclaw">openclaw/openclaw</a></summary>

# OpenClaw Daily (2026-08-21)

## Today
35 PR updates, 0 issues, no release. Highlights: preserve Codex auth identity across restarts (#126777), prevent oversized wiki content crowding context (#126779), surface onboarding memory-import failures (#126738), and fix HTTP chat sending full system prompt when tools.profile is minimal (#126619); Control UI model thinking-level autocomplete (#123507).

## Notable PRs
#126777 fix(qa): preserve Codex auth identity across restarts · #120301 fix(ui): Model Providers usage cards stay empty after failed usage.status · #122431 fix(media): resize images before understanding · #123507 fix(control-ui): autocomplete model thinking levels · #126779 fix(memory-wiki): prevent oversized wiki crowding context · #126738 fix(ui): surface onboarding memory import failures · #120900 feat(ui): review install policy warnings · #126619 fix: HTTP chat sends full system prompt when tools.profile minimal · #126782 fix(qa-lab): accept DM aliases at HTTP boundary · #126783 fix(auth): fresh install with canonical shared-auth ownership · #125471 fix(models): keep Claude CLI OAuth in Control UI · #123535 fix(ui): avoid session catalog refresh storms.

</details>

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot Daily (2026-08-21)

## Today
4 issues, 29 PRs. Channel robustness is the main line: Telegram sticker replies, Matrix error logs, Slack file-download redirects, gateway child-output flushing.

## Hot Issues
#5444 OAuth login to OpenAI fails in Docker · #5425 legacy socks:// proxy support (closed) · #5454 streaming mid-stream server_error skips retry after content streamed · #5447 paid security-scan MCP (nanobot + ScanPay x402).

## Notable PRs
#5387 feat(telegram): reusable sticker replies · #5379 fix(memory): preserve full consolidation input · #5420 feat(webui): turn observability & safe recovery · #5458 fix(matrix): interpolate error log context · #5456 chore(deps): drop websocket-client, add certifi · #5414 fix(slack): validate file downloads across redirects · #5413 fix(providers): apply fallback to raised errors · #5412 fix(gateway): flush background child output to logs · #5339 fix(webui): reject discarded temp messages · #5338 fix(mcp): preserve credentials when OAuth store read fails.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw Daily (2026-08-21)

## Today
3 issues (all RFC/tracker), 35 PRs. RFCs point to "lighter core + external integrations" and runtime session/transport adapters; engineering focuses on web_fetch decompression, ACP transcript persistence, window-ratio compaction, telemetry retirement.

## Hot Issues
#9487 RFC: Runtime-owned conversation sessions & transport surface adapters (21💬) · #6165 RFC: prefer lighter core via external integrations (18💬) · #10118 [Tracker]: Rust anti-slop policy debt (16💬).

## Notable PRs
#9283 fix(tools): decompress gzip/brotli/deflate web_fetch responses · #9378 fix(acp): persist failed/cancelled turn transcripts · #9379 fix(runtime): charge image markers in context-token estimate · #9447 fix(anthropic): classify incomplete terminal responses · #9451 refactor(observability)!: retire dormant DORA telemetry · #9504 fix(runtime): terminal notice on context exhaustion · #9535 feat(runtime): anchor compaction to model window ratio · #9557 feat(providers): ProviderErrorKind classification · #9561 fix(personality): remove filename labels from prompt.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/nanocoai/nanoclaw">nanocoai/nanoclaw</a></summary>

# NanoClaw Daily (2026-08-21)

## Today
1 issue, 35 PRs. Multi-channel onboarding (WhatsApp/Slack/Cursor/Codex) and token usage are the main line; #2715 reports inbound WhatsApp media unreachable because files land on an unmounted path.

## Hot Issues
#2715 Inbound WhatsApp media (images/docs/audio) unreachable by agent — saved to unmounted path.

## Notable PRs
#3270 Feat/ncl token usage · #3189 feat(skill): add-why — explain what happened to one message · #3196 Fix/add mount readonly · #3403 [main] fix(matrix): ESM patch executable on refresh · #3402 [main] fix(codex): deliver provider-generated files · #3421 [channels] announce one-click Slack agents · #3401 fix(whatsapp-cloud): skill payload compatible with main · #3356 feat(providers): Cursor Agent SDK payload · #3355 feat(setup): /add-cursor agent provider skill · #3420 fix(add-macos-statusbar): slug-aware Swift/plist · #3419 fix(add-anydoc): install-scoped ncl, portable skill test.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Daily (2026-08-21)

## Today
Shipped v1.3.0 (stable promotion of 1.3.0-rc.2). Per-user sandbox + structured automations + document editing + Telegram linked devices are the headline additions. 1 issue (#7732 persistent per-user sandbox epic, 8💬).

## Release
ironclaw-v1.3.0 — fixed 1.2 upgrade crash-loop, Reborn image optional pubkey SSH; added per-user model preferences, structured automations (fail-closed preflight), document editing (.docx/.xlsx/.pptx structural edits + HTML→PDF), Telegram linked devices.

## Hot Issues
#7732 Epic: Persistent per-user sandbox with iron-proxy; defer loop executors (8💬).

## Notable PRs
#7765 feat(hooks): AfterTurn lifecycle + memory curation · #7779 feat(sandbox): route user-sandbox egress through managed per-user proxy · #7491 feat(coding): omp core-tool contract + engines + benchmark arm · #7777 refactor(webui): remove duplicate Settings/Extensions tabs · #7763 refactor(subagent): consolidate seven design docs into one README · #7766 fix(telegram): separate bot pairing from personal device linking · #7729 feat(automations): run-now across trigger domain & WebUI · #7699 feat(notifications): publish actionable run gates · #7778 fix(lints): Rust 1.98 clippy migration.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI Daily (2026-08-21)

## Today
2 issues, 7 PRs. cowork file cards / split preview, settings search, scheduled-task notification-channel fix.

## Hot Issues
#1556 doc bug: IM bot config guide 404 · #1552 feat: AI artifact Markdown preview & file cards.

## Notable PRs
#1545 fix(agent): sync activeSkillIds immediately on update · #1546 feat(engine-overlay): cancel-launch + view-logs button after engine timeout · #1547 fix(scheduledTask): fix notification channel reverting to "none" · #1553 feat(cowork): Write tool file card & split preview panel · #1555 fix: npm run dist:mac:x64 packaging failure · #1557 feat(settings): sidebar search/filter · #1560 fix: agent edit → click original agent can't switch back to chat.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary></details>

# CoPaw (QwenPaw) Daily (2026-08-21)

## Today
Shipped v2.1.1-beta.1. 7 issues, 35 PRs. ReMe memory runtime dashboard, self-hosted multi-user Hub, console perf, unified tool panel.

## Release
v2.1.1-beta.1 — editor tab overflow nav, provider rate-limiter log level, ReMe runtime dashboard, plugin-channel interactive configurators, OneBot inbound media localization, background-task timeout, plugin reload workspace state, historical data-URL image render, DataPaw native runtime.

## Hot Issues
#6921 stops without notice after "Now 2.1, 3.1, 3.2" output, needs "continue" · #7102 freeze >10 min · #6643 outputs shouldn't pile in media dir, per-task dirs · #6826 assistant message end-time anomaly · #6436 automatic per-message model routing · #7110 undownloadable image link breaks session · #7013 unified tool panel + web preview + interactive terminal.

## Notable PRs
#7119 fix(security): master key file owner-only perms · #7061 fix(video): deliver tool-result videos on OpenAI Responses API · #7175 fix(console): restore full free model listings · #7183 feat(skills): workspace-scoped always-on loading · #7167 feat(creator): dialogue-gated video dispatch, project copy/recreate · #7133 feat(memory): update reme 0.4.1.8 · #7112 feat(hub): self-hosted multi-user Hub (local & Docker) · #7080 feat: optional PowerContext pluggable LTM backend · #7161 feat(console): artifacts on assistant response card · #7176 perf(console): keep long chats responsive.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis Daily (2026-08-21)

## Today
Shipped 20260820.01. 1 issue (Vault unlock/recovery missing auth, CWE-306), 6 PRs. Channel security & WhatsApp experience.

## Release
20260820.01

## Hot Issues
#1177 [Bug]: Vault Unlock/Recovery Endpoints Missing Authentication (CWE-306).

## Notable PRs
#1220 fix(whatsapp): render Markdown in outbound messages · #468 fix(plugins): use cmd.exe on Windows for shell hooks · #1218 fix(channels): stop hardcoding push name "Moltis" · #1219 fix(channels): configurable untrusted-turn tool ceiling · #1217 fix(whatsapp): treat reply to bot as addressing it · #1216 fix(httpd): require auth for vault unlock/recovery.

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw (rivonclaw)</a></summary>

# EasyClaw (rivonclaw) Daily (2026-08-21)

## Today
0 issues, 0 PRs, but continuous releases v1.8.101~v1.8.105 (multiple/day). v1.8.105 filters Affiliate Agent work by Business Developer across pending & complete work.

## Releases
v1.8.105 (filter Affiliate Agent work by BD) · v1.8.104 · v1.8.103 · v1.8.102 · v1.8.101.

</details>

<details>
<summary><strong>PicoClaw / NullClaw / TinyClaw / ZeptoClaw</strong></summary>

# Low-activity / Silent Projects (2026-08-21)

- **PicoClaw** (#3329 warn on inert webhook_host/port; #3316 routed-agent context mgmt; #3315 private-chat topics) — 3 PRs, light updates.
- **NullClaw** — 0 issues / 0 PRs / 0 releases, completely silent.
- **TinyClaw** — 0 issues / 0 PRs / 0 releases, completely silent.
- **ZeptoClaw** — 0 issues / 0 PRs / 0 releases, completely silent.

These four projects had no community activity today; ecosystem activity is clearly diverging.

</details>

---

*Generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar). Data fetched live from GitHub public APIs and written by the executing agent — no external LLM used.*
