# OpenClaw Ecosystem Community Daily — 2026-08-22

> Generated: 2026-08-22 02:30 (GMT+8) | Coverage: OpenClaw + 12 peer projects
> This digest is produced by the agents-radar local automation. All summaries, comparisons, and writing are done by the executing agent — no external LLM API was called.

- [OpenClaw](https://github.com/openclaw/openclaw)
- [NanoBot](https://github.com/HKUDS/nanobot)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [NanoClaw](https://github.com/qwibitai/nanoclaw)
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

# OpenClaw Cross-Ecosystem Comparison Report (2026-08-22)

## 1. Ecosystem Overview

OpenClaw core shows 41 issues and 59 PR updates today, with the main branch focused on **session-catalog refresh-storm governance, diagnostics recovery, install-policy warnings, and UI decision receipts**. Among the 12 peers, IronClaw (31 PRs), CoPaw (36 PRs), Zeroclaw (95 PRs), NanoClaw (14 PRs), LobsterAI (13 PRs), and Moltis (6 PRs) are active, while **NullClaw / TinyClaw / ZeptoClaw are completely silent** and EasyClaw only ships releases with no issue/PR interaction. The overall trend moves from "single-agent chat" toward **multi-channel + persistent memory + automation (automations/run-now) + enterprise-grade sandbox/auth**.

## 2. Activity Comparison (last 24h)

| Project | Issues | PRs | Releases |
|---------|--------|-----|----------|
| OpenClaw | 41 | 59 | v2026.8.1-beta.2 (08-15) |
| NanoBot | 5 | 34 | v0.3.0 (07-25) |
| Zeroclaw | 5 | 95 | v0.8.4 (08-02) |
| PicoClaw | 1 | 4 | nightly (07-02) |
| NanoClaw | 1 | 14 | v2.2.0 (08-13) |
| NullClaw | 0 | 1 | v2026.5.29 |
| IronClaw | 12 | 31 | ironclaw-v1.3.0 (08-19) |
| LobsterAI | 2 | 13 | 2026.8.18 |
| TinyClaw | 0 | 0 | v0.0.20 (03-26) |
| CoPaw | 34 | 36 | v2.1.1-beta.1 (08-20) |
| Moltis | 2 | 6 | 20260820.01 (08-20) |
| ZeptoClaw | 0 | 0 | v0.9.2 (04-07) |
| EasyClaw | 0 | 0 | v1.8.109 (08-21) |

## 3. Shared Directions

- **Multi-channel access & message reliability**: NanoBot (DingTalk doesn't observe/drain background tasks #5463, streaming provider mid-stream server_error skips retry #5454, Notion MCP failure #1168); NanoClaw (send_card doc-promised callback buttons dropped by bridge #3426, Dial SMS+voice #3041, Mattermost #3202); Moltis (shared Slack channel tools fail #1224, WhatsApp Markdown render #1220).
- **Memory & context governance**: OpenClaw session-catalog refresh-storm governance (#123535, 154💬), diagnostics recovery of overlapping tool calls (#124025, 46💬); IronClaw pluggable memory over MCP (#7664); CoPaw ReMeLightMemoryCard reranker panel (#6399), embedding health-check hardcoded timeout (#7156); Zeroclaw context-compaction anchored to model-window ratio (#9535).
- **Automation & enterprise**: IronClaw derive run outcomes from runtime evidence (#7650, 45💬), benchmark QA preview (#7749, 39💬), omp core-tool contract (#7491, 37💬), pluggable memory (#7664); CoPaw per-session model override (#5992, 9💬); Moltis cron honors heartbeat active_hours (#1208).
- **Security & stability**: OpenClaw install-policy warning acknowledgement (#116489, 49💬), typecheck hang fix (#123975, 45💬), SSH sandbox doesn't stage inbound media (#112160); Moltis WhatsApp/sandbox-image validation (#1222, #1220); CoPaw MCP backend restart can't auto-recover (#6524).
- **Developer experience / design system**: IronClaw WebUI design system (#7257, #7750 Storybook); OpenClaw UI decision-receipt explanation (#126007), new-chat worktree from clean defaults (#126056).

## 4. Differentiated Positioning

- **OpenClaw**: ecosystem hub — session/catalog governance, diagnostics recovery, install policy & UI decision transparency; enterprise-managed context.
- **NanoBot**: widest channels (Telegram/Matrix/Slack/WebUI); Dream recovery cursor & unified trajectory provider-usage backend (#5479).
- **Zeroclaw**: Rust core, RFC/ADR-driven "lighter core + external integrations"; wire protocol first-class (#8396), canonical sandbox-policy schema (#7821, 20💬).
- **NanoClaw**: multi-provider (Dial/WhatsApp/Mattermost/Matrix); template-based agent creation (#3396) & refresh-safe ESM patch (#3403).
- **IronClaw**: per-user sandbox + structured automations + design system + Telegram linkage; enterprise/team-oriented; CI-speedup track (T1–T4).
- **LobsterAI**: cowork file cards/split preview, settings search, i18n hardcoded-fix; UX-oriented.
- **CoPaw (QwenPaw)**: memory ReMe, self-hosted multi-user, Volcengine Agent Plan & MiMo V2.5 provider (#6515); among the most active communities.
- **Moltis**: WhatsApp-centric, channel security (Vault/sandbox-image validation) & cron scheduling.
- **EasyClaw (rivonclaw)**: high-frequency small releases (daily v1.8.109/108), vertical features like business-dev filtering.
- **PicoClaw / NullClaw / TinyClaw / ZeptoClaw**: low-activity or silent.

## 5. Trend Signals

- **Silent projects need attention**: NullClaw / TinyClaw / ZeptoClaw have had 0 activity for multiple days; EasyClaw ships only — ecosystem health is diverging.
- **Automation becomes first-class**: IronClaw/CoPaw automations/run-now/Hub mark agents moving from "conversation" to "orchestrated tasks."
- **Security & stability from optional to mandatory**: install-policy warning acknowledgement (CWE-class risk), typecheck hang, MCP restart recovery are now frequent fixes.
- **Memory is the cross-project主线**: from OpenClaw session governance to IronClaw/CoPaw memory systems, persistent memory remains the 2026 agent-framework battleground.

---

## OpenClaw Detailed Activity

> Source: [openclaw/openclaw](https://github.com/openclaw/openclaw) | last 24h (issue 41 / PR 59)

### Hot Issues
1. **#125626 Release validation: v2026.8.1-beta.2** (18💬, open) — new-version release validation tracker.
2. **#124751 iOS app duplicates assistant replies at bottom and doesn't auto-scroll to latest** (6💬, open) — mobile rendering.
3. **#113014 Webchat: raw MEDIA: directive leaks into visible reply text** (5💬, open) — instruction injection surfaced.
4. **#90243 feat(llm/google-vertex): physical model mapping/aliasing for Google's Prior** (3💬, open) — model routing.
5. **#124689 Model picker only applies to new sessions; Ollama Cloud requests sign-in** (4💬, open).
6. **#112160 SSH sandbox doesn't stage inbound media into an existing remote workspace** (4💬, open).
7. **#10944 parseMode config for Telegram channels** (4💬, open).
8. **#126231 handler-timeout ingress events die with attempts=0 — silently lost messages** (3💬, closed).
9. **#126813 Queued peer message re-invokes an agent with answer-expected hint and no acknowledgement** (3💬, open).
10. **#100911 Tasks page / tasks.list edge-case hardening** (2💬, open).

### Notable PRs (by discussion heat)
1. **#123535 fix(ui): avoid session catalog refresh storms** (154💬, open)
2. **#123979 fix(scripts): build heap ignores its systemd memory budget and takes the full default** (56💬, open)
3. **#116489 feat(security): require acknowledgement for install policy warnings** (49💬, closed)
4. **#123975 fix(scripts): typecheck hangs forever when tsgo wedges instead of failing** (45💬, open)
5. **#124025 fix(diagnostics): recover stale overlapping tool calls** (46💬, open)
6. **#120900 feat(ui): review install policy warnings** (44💬, closed)
7. **#125815 fix(sessions): keep owner assignment stable and replies working** (38💬, open)
8. **#126618 fix: Tool Search directory/tools wrap native read/exec in tool_call** (26💬, open)
9. **#126007 feat(ui): explain decision receipts in Activity** (25💬, open)
10. **#126056 fix(ui): start new chat worktrees from fresh defaults** (21💬, open)

---

## Peer Project Highlights

### NanoBot (HKUDS/nanobot) — I5 / P34
- Issues: #5198 change models in a specific session requires reconfig (closed), #1168 Notion MCP connection fails (closed), #5441 a single recovered tool error permanently blocks (closed), #5463 DingTalk doesn't observe/drain inbound background tasks (open), #5454 streaming providers skip retry once content streamed mid server_error (closed).
- PRs: #5442 fix(dream) advance cursor when tool errors recovered, #5379 fix(memory) preserve full consolidation input (open), #5476 render LaTeX as Unicode (closed), #2063 Tauri desktop app (closed), #5455 retry Codex server_error (closed), #5479 feat(trajectory) unified provider usage backend (open).

### Zeroclaw (zeroclaw-labs/zeroclaw) — I5 / P95
- Issues: #8396 RFC make wire protocol first-class in provider construction, #8691 ADR inventory and accepted RFC decision records, #10167 vendor-neutral lifecycle export for terminal agent multiplexers, #8288 SOP milestone daemon-owned SOP control plane to 5/5, #10212 document `switch` and its routing precedence.
- PRs: #8561 feat(channels/telegram) multi_message streaming mode (33💬), #7821 feat(security) canonical sandbox_policy schema with app-layer enforcement (20💬), #9447 fix(anthropic) classify incomplete terminal responses (19💬), #9196 feat(mcp) materialize resource blob with aggregate budget preflight (19💬), #9772 feat(telegram) per_user_session toggle for shared group-chat (18💬), #9535 feat(runtime) anchor context compaction to model window ratio (17💬).

### NanoClaw (qwibitai/nanoclaw) — I1 / P14
- Issue: #3426 send_card docs promise callback buttons that the bridge drops since #2265.
- PRs: #3041 feat(channels) Dial channel adapter (SMS + AI voice, closed), #3202 Mattermost integration (closed), #3050 Dial channel picker (closed), #3396 feat create agents from templates in chat (open), #3424 ci test registry-backed skills (closed), #3403 fix(matrix) refresh-safe ESM patch (closed).

### NullClaw (nullclaw/nullclaw) — I0 / P1
- PR: #990 feat(providers) add Eden AI as an OpenAI-compatible gateway (open).

### IronClaw (nearai/ironclaw) — I12 / P31
- Issues: #7801 CI expedite T4 canonical preflight, #7799 T2 nextest pipeline, #7800 T3 PR/queue convergence, #7798 T1 setup-rust composite, #7664 pluggable memory over MCP, #7783 LLM timeout policy can't measure TTFT.
- PRs: #7650 feat(automations) derive run outcomes from runtime evidence (45💬), #7749 benchmark QA-preview trigger (39💬), #7491 feat(coding) omp core-tool contract + engines + benchmark arm (37💬), #7456 fix(reborn) make durable storage profile-agnostic (12💬), #7257 docs(design-system) WebUI design system (11💬), #7750 chore(webui) integrate Storybook + design-system catalog (10💬).

### LobsterAI (netease-youdao/LobsterAI) — I2 / P13
- Issues: #1217 occasional gateway startup during run (closed), #1223 CoworkPromptInput hardcoded Chinese labels leak into English prompts (closed).
- PRs: #1218 refactor scheduled-task sort (closed), #1215 always rebuild chat handler (closed), #1219 eliminate invalid re-renders (closed), #1220 eliminate N+1 queries (closed), #1224 fix i18n hardcoded & Escape key (closed), #1550 fix(scheduledTask) drop channel/to when delivery mode is "no-notify" (open).

### TinyClaw (TinyAGI/tinyclaw) — I0 / P0
- No activity in last 24h (latest v0.0.20, 03-26).

### CoPaw (agentscope-ai/CoPaw) — I34 / P36
- Issues: #6524 MCP backend restart can't auto-recover (open), #6780 2.0.1 self-freezes when idle (closed), #7016 tool call 404 (open), #7156 embedding health-check times out when already warm, timeout hardcoded (open), #7206 v2.1.1-beta.1 /compact fails with pydantic ValidationError (open), #7204 how to add custom tool in qwenpaw (open).
- PRs: #5992 per-session model overrides (9💬), #6515 feat(providers) Volcengine Agent Plan & MiMo V2.5 (9💬), #6845 preserve assistant completion time (closed), #6581 ReMeLightMemoryCard reranker UI panel (open), #6399 reranker UI config (open), #6586 fix(mcp) recover stale server sessions (closed).

### Moltis (moltis-org/moltis) — I2 / P6
- Issues: #1224 tools stop working in shared Slack channels (open), #1223 heartbeat active_hours has no effect on default config (open).
- PRs: #1220 render Markdown in outbound WhatsApp (8💬, closed), #1208 fix(cron) honor heartbeat active hours (4💬, open), #468 use cmd.exe on Windows for shell hooks (open), #1226 deliver scheduled output to originating chat (open), #1225 improve zh-TW Traditional Chinese (open), #1222 validate sandbox image requests (open).

### ZeptoClaw (qhkm/zeptoclaw) — I0 / P0
- No activity in last 24h (latest v0.9.2, 04-07).

### EasyClaw (gaoyangz77/easyclaw) — I0 / P0 / releases v1.8.109, v1.8.108 (08-21)
- Only releases today, no issue/PR interaction.

---

*This digest is generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar). All content is fetched live from GitHub's public API and written by the executing agent — no external LLM was called.*
