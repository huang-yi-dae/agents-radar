# OpenClaw Ecosystem Digest 2026-08-08

> Issues: 500 | PRs: 500 | Projects covered: 13 | Generated: 2026-08-08 01:18 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [NanoBot](https://github.com/HKUDS/nanobot)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [NanoClaw](https://github.com/qwibitai/nanoclaw)
- [NullClaw](https://github.com/nullclaw/nullclaw)
- [IronClaw](https://github.com/nearai/ironclaw)
- [LobsterAI](https://github.com/netease-youdao/LobsterAI)
- [TinyClaw](https://github.com/TinyAGI/tinyclaw)
- [Moltis](https://github.com/moltis-org/moltis)
- [CoPaw](https://github.com/agentscope-ai/CoPaw)
- [ZeptoClaw](https://github.com/qhkm/zeptoclaw)
- [EasyClaw](https://github.com/gaoyangz77/easyclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest — 2026-08-08

## 1. Today's Overview
OpenClaw remains a high-activity project with 500 issues and 500 PRs updated in the last 24 hours. Issue volume is heavily skewed toward open/active items (471 open vs. 29 closed), while PRs show a healthier mix (411 open vs. 89 merged/closed). The project has **no new releases** today; the most recent release line remains 2026.7.x with beta iterations (e.g., 2026.7.2-beta.7) referenced throughout issue reports. Maintainer attention is spread across multiple P0 regressions involving state DB corruption, migration failures, and memory leaks, alongside a steady stream of enhancement requests around memory management, context control, and security hardening.

## 2. Releases
No new releases were published in the last 24 hours. The latest referenced versions in issues and PRs are **2026.7.2 (b4f01af)** and betas up to **2026.7.2-beta.7**, with several issues reporting regressions introduced between beta.1 and beta.7 (e.g., #119087 gateway cold start regression).

## 3. Project Progress
Today's merged/closed PRs (89 total) focus primarily on test coverage, CI compliance, and targeted bug fixes:

- **[#120397](https://github.com/openclaw/openclaw/pull/120397) (closed)** — `test(agent)`: split embedded run lifecycle coverage into a focused sibling file to stay under the 1000-line lint limit.
- **[#120400](https://github.com/openclaw/openclaw/pull/120400) (closed)** — `fix(agents)`: carry complete tool args from `content_block_start` input so Discord progress drafts render resolved commands (reported in #120306).
- Multiple open maintainer PRs are queued to restore CI compliance on `main`, including **#120399** and **#120401**, both addressing the same max-lines lint failure in the embedded-runner registry test.
- Notable open fix PRs advancing: **#120405** (Codex warm session/approval preservation across conversations), **#119778** (retryable chat send error during transcript rebuild), and **#119827** (bound ingress claim candidate IN lists below SQLite bind-variable limit).
- Several "waiting on author" PRs remain stalled including **#115962** (schema-v1 profile requirements) and **#116489** (install policy warning acknowledgement with ClawScan/Semgrep integration).

## 4. Community Hot Topics
- **[#116277](https://github.com/openclaw/openclaw/issues/116277) — DeepSeek v4 Flash silent reply failure (129 comments, closed)** : The highest-activity issue today. Users report the model silently fails to generate a reply, with OpenClaw posting a generic fallback message. The issue carries a diamond lobster rating and multiple claw-sweeper tags indicating reproduction and linked PRs exist. The community's frustration centers on silent failures — no error surfaced to the user, only a useless fallback.
- **[#116201](https://github.com/openclaw/openclaw/issues/116201) — Realtime voice state retention (59 comments, open)** : Unbounded provider/consult state retention during realtime voice sessions, causing resource exhaustion under slow/bursty conditions. Needs maintainer + product decision.
- **[#7707](https://github.com/openclaw/openclaw/issues/7707) — Memory Trust Tagging by Source (29 comments)** : A long-running feature request (since Feb) to tag memory entries by trust origin to prevent memory poisoning attacks. Still open with no fix PR.
- **[#91588](https://github.com/openclaw/openclaw/issues/91588) — Gateway memory leak 350MB → 15.5GB / OOM crashes (22 comments)** : Community reporting severe memory growth over 2–3 days causing repeated OOM kill/restart cycles. P0, stable maturity, still no fix PR.
- **[#101290](https://github.com/openclaw/openclaw/issues/101290) — CLI preflight corrupts live state DB (14 comments)** : Health-check commands corrupting `openclaw.sqlite` while gateway runs — "database disk image is malformed." Reported on macOS 2026.6.6, reproduces four times, vanilla SQLite control does not reproduce.

## 5. Bugs & Stability
Ranked by severity, with fix status:

| Severity | Issue | Impact | Fix Status |
|----------|-------|--------|------------|
| **P0** | [#119263](https://github.com/openclaw/openclaw/issues/119263) — Agent DB v14→v15 migration fails (`no such column: entry_valid`); gateway refuses to start | Release blocker; prevents upgrade | PR open ([#120332](https://github.com/openclaw/openclaw/pull/120332) is for #92884; no direct fix PR yet) |
| **P0** | [#118772](https://github.com/openclaw/openclaw/issues/118772) — `sessionEntry.totalTokens` inflation causes premature compaction at 4–8% context (data loss) | Session data loss | Linked PR open |
| **P0** | [#91588](https://github.com/openclaw/openclaw/issues/91588) — Gateway memory leak to 15.5GB / OOM crash loop | Availability | No fix PR |
| **P0** | [#101290](https://github.com/openclaw/openclaw/issues/101290) — CLI health-check corrupts live state DB | Data corruption | No fix PR |
| **P1** | [#119087](https://github.com/openclaw/openclaw/issues/119087) — Gateway cold start regression ~2.5x (2026.7.1-beta.1 → 2026.7.2-beta.7) | Performance regression | No fix PR |
| **P1** | [#86684](https://github.com/openclaw/openclaw/issues/86684) — `sessions_yield` subagent wake compacts parent branch at low context usage | Data loss | Linked PR open |
| **P1** | [#115700](https://github.com/openclaw/openclaw/issues/115700) — `chat.send` rejected with "thread switched branches" after model completes (stale `expectedLeafEntryId`) | UX friction; message loss | Linked PR: [#119778](https://github.com/openclaw/openclaw/pull/119778) (retryable chat send error) |
| **P1** | [#94939](https://github.com/openclaw/openclaw/issues/94939) — 6.x state migration leaves channel conversation-store SQLite empty (0 bytes) | Proactive send breakage (MS Teams) | Linked PR open |
| **P1** | [#116022](https://github.com/openclaw/openclaw/issues/116022) — `/new` reuses stable session ID and cannot recover retired Codex binding tombstone | Session permanently unusable | Needs live repro |
| **P1** | [#98435](https://github.com/openclaw/openclaw/issues/98435) — MCP loopback transport doesn't auto-reconnect after gateway restart; `recovered=1` misleading | Session tool breakage | Needs live repro |

Additionally, several P2 regressions remain open with no fix PRs: WebChat reasoning stream missing for Kimi/DeepSeek ([#88079](https://github.com/openclaw/openclaw/issues/88079)), ElevenLabs TTS plays OpenAI voice ([#52186](https://github.com/openclaw/openclaw/issues/52186)), Windows node.exe process leaks ([#74378](https://github.com/openclaw/openclaw/issues/74378)).

## 6. Feature Requests & Roadmap Signals
High-signal recurring features likely to land in upcoming versions:

- **Memory trust/provenance tagging** — [#7707](https://github.com/openclaw/openclaw/issues/7707) and [#54373](https://github.com/openclaw/openclaw/issues/54373) both ask for source/volatility metadata on memory/context. This is a security-relevant theme (memory poisoning defense) receiving maintainer attention.
- **Context bloat control** — Multiple active threads: bootstrap re-injection every turn ([#67419](https://github.com/openclaw/openclaw/issues/67419)), tiered bootstrap loading ([#22438](https://github.com/openclaw/openclaw/issues/22438)), heading-aware chunking ([#44395](https://github.com/openclaw/openclaw/issues/44395)). These directly affect token cost; expect pragmatic fixes (chunking, dedup) before full tiering.
- **Channel-mediated MCP approval (consent envelope)** — [#78308](https://github.com/openclaw/openclaw/issues/78308): extend the `/approve` pipeline to MCP tool calls. Security hardening theme; likely in roadmap.
- **Per-model usage logging** — [#13219](https://github.com/openclaw/openclaw/issues/13219): native cost tracking. Popular (was upvoted) and fits with existing usage mosaic work.
- **Pre-reset memory flush** — [#45608](https://github.com/openclaw/openclaw/issues/45608): run the same memory flush on `/new` and daily reset as on compaction. Already has the mechanism in code; low-risk, likely to ship.
- **Source-directory memory indexing** — [#95724](https://github.com/openclaw/openclaw/issues/95724): index by source directory rather than per-agent to eliminate duplicate vector stores for same-workspace agents. Strong cost-savings signal.

## 7. User Feedback Summary
Pain points dominating user reports:

- **Silent failures erode trust** — DeepSeek fallback (#116277), cron hallucination (#49876), LINE silent message loss (#86012), claude-cli "No response requested." placeholder (#90789). Users consistently report the agent either says nothing useful or fabricates plausible output instead of surfacing an error. This is the single most repeated dissatisfaction theme this week.
- **Data corruption/loss anxiety** — State DB corruption (#101290), migration failure blocking gateway start (#119263), premature compaction data loss (#118772), empty conversation store after migration (#94939). These are P0s affecting upgrade trust.
- **Configuration surprises** — Hardcoded `/Users/wangtao` in working path (#51429) drew mocking but also frustration that it shipped; `config validate` rejecting plugin extensions (#92884) and MCP tools not injected into subagents (#85030) further frustrate power users.
- **Performance regressions** — Gateway cold start 2.5x slower (#119087), memory leak to 15.5GB (#91588), and memory index silently frozen (#119411) are eroding confidence in the 2026.7.x line.

Positive signals: maintainers are actively triaging, labeling, and linking PRs via ClawSweeper; the diamond-lobster rating system is consistently applied; several PRs are marked "ready for maintainer look" with clear reproduction.

## 8. Backlog Watch
Long-standing issues needing maintainer attention (no new fix PRs, high signal):

- **[#51429](https://github.com/openclaw/openclaw/issues/51429) (13 comments, since Mar)** — Hardcoded work path `/Users/wangtao` shipped in published code. P2, needs product decision. Embarrassing and low-effort to fix; community watches.
- **[#85030](https://github.com/openclaw/openclaw/issues/85030) (10 comments, 6 upvotes, since May)** — MCP tools not injected into `sessions_spawn` subagents; all documented config paths ignored. P1, platinum hermit rating, no fix PR. Widely upvoted.
- **[#49876](https://github.com/openclaw/openclaw/issues/49876) (10 comments, since Mar)** — Cron sessions hallucinate output when tools fail instead of failing cleanly. P1 security issue, no fix PR.
- **[#30381](https://github.com/openclaw/openclaw/issues/30381) (8 comments, since Mar)** — `chatCompletions` ignores request model when `x-openclaw-agent-id` present. P2, diamond lobster; clear behavioral bug.
- **[#75380](https://github.com/openclaw/openclaw/issues/75380) (6 comments, since May)** — `provider-payload.jsonl` and `cache-trace.jsonl` grow unbounded; no rotation policy. P1 security/disk-exhaustion, no fix PR.
- **[#44395](https://github.com/openclaw/openclaw/issues/44395) (7 comments, since Mar)** — Heading-aware chunking + entity extraction for memory search. P2, 2 upvotes; PR linked but stale.
- **[#92884](https://github.com/openclaw/openclaw/issues/92884) (6 comments, since Jun; closed today)** — `config validate` rejects plugin-owned channel schema extensions. A fix PR (#120332) is now open and waiting on author — good progress, but watch for merge.
- **[#119411](https://github.com/openclaw/openclaw/issues/119411) (5 comments, since Aug 5)** — Memory file watcher never reindexes; `memory status` reports `Dirty: no` while counts mismatch. P1, recently reported; no fix PR yet.

---

## Cross-Ecosystem Comparison

# Cross-Project Ecosystem Report: AI Agent & Personal AI Assistant Landscape
**Date:** 2026-08-08

---

## 1. Ecosystem Overview

The open-source AI agent landscape remains intensely competitive and fast-moving, with the six active projects tracked here collectively processing over 750 issues and PRs in a single 24-hour window. The market is bifurcating between mass-market personal assistant platforms (OpenClaw, NanoBot) and specialized deployment-focused agents (ZeroClaw, IronClaw), with a long tail of niche or dormant projects. Release cadence remains high — two new versions shipped this week (LobsterAI 2026.8.7, CoPaw v2.1.0-beta.2) — while OpenClaw and IronClaw both wrestle with P0 stability regressions that threaten upgrade trust. Security hardening, memory management, and cost transparency have emerged as the dominant cross-project themes, alongside persistent user frustration with silent agent failures.

---

## 2. Activity Comparison

| Project | Issues (24h) | PRs (24h) | Release Status | Health Score |
|---------|-------------|-----------|----------------|--------------|
| **OpenClaw** | 500 | 500 | No new release (2026.7.x line) | ⚠️ **At Risk** — 4 P0 bugs open, 471 open issues, heavy regression load |
| **NanoBot** | 31 | 31 | No new release | ✅ **Good** — 11 PRs merged, same-day closes, responsive team |
| **ZeroClaw** | 50 | 50 | v0.8.4 (no new release) | ✅ **Good** — 3 PRs merged, security fixes paired with bugs quickly |
| **CoPaw** | 31 | 47 | **v2.1.0-beta.2** (released today) | ⚠️ **Moderate** — Beta instability, 2 critical bugs open, but rapid iteration |
| **IronClaw** | 50 | 50 | 1.1.0-rc.1 line (no new release) | ⚠️ **Moderate** — 12 PRs closed, doc-truth pipeline active, P1 infrastructure bugs persist |
| **LobsterAI** | 7 | 7 | **2026.8.7** (released yesterday) | ✅ **Stable** — 6 PRs merged, weekly cadence, low issue volume |
| **NanoClaw** | 0 | 10 | No new release | ✅ **Stable** — 2 PRs merged, no new bugs, healthy contributor flow |
| **PicoClaw** | 4 | 14 | No new release | ✅ **Stable** — 2 dep bumps merged, focused maintenance |
| **NullClaw** | 0 | 0 | — | ⚪ **Dormant** |
| **TinyClaw** | 0 | 0 | — | ⚪ **Dormant** |
| **Moltis** | 0 | 0 | — | ⚪ **Dormant** |
| **ZeptoClaw** | 0 | 0 | — | ⚪ **Dormant** |
| **EasyClaw** | 0 | 0 | — | ⚪ **Dormant** |

---

## 3. OpenClaw's Position

**Advantages:**
- **Scale leader by wide margin:** 500 issues + 500 PRs in 24h dwarfs the next closest (IronClaw/ZeroClaw at 100 combined). OpenClaw's community generates more discussion in a day than dormant projects see in months.
- **Maintainer system works:** ClawSweeper labeling, diamond-lobster ratings, and active PR linkage create a structured triage pipeline that smaller projects lack.
- **Feature breadth:** Memory trust tagging, context bloat control, MCP approval channels, and per-model usage logging all under active discussion simultaneously — no other project touches this many roadmap areas at once.

**Disadvantages:**
- **Stability crisis:** Four unresolved P0 defects (DB migration failure, memory leak to 15.5GB, CLI DB corruption, premature compaction data loss) undermine the "reference implementation" status. The 2026.7.x line has introduced regressions (cold start 2.5× slower) that competitors can exploit.
- **Silent failure reputation:** The most-commented issue this week (#116277, 129 comments) is a model silently failing with a useless fallback — a trust-eroding pattern echoed across multiple issues.
- **Backlog debt:** Issues like #7707 (memory trust tagging, since Feb) and #51429 (hardcoded `/Users/wangtao` path, since Mar) remain unanswered for months despite clear community demand.

---

## 4. Shared Technical Focus Areas

| Focus Area | Projects | Specific Needs |
|------------|----------|----------------|
| **Memory & Context Management** | OpenClaw, NanoBot, IronClaw, CoPaw | Memory trust/provenance tagging (OpenClaw), context bloat control (OpenClaw), session isolation and archiving (NanoBot), cross-conversation memory recall fixes (IronClaw #7185), flush-before-compression (CoPaw #6555) |
| **Cost Transparency & Control** | OpenClaw, NanoBot, ZeroClaw, IronClaw | Token usage logging (NanoBot #5266 — millions of tokens burned invisibly), per-model usage tracking (OpenClaw #13219), budget caps broken by $0.00 cost reporting (ZeroClaw #9816), token accounting correctness (IronClaw #6989) |
| **Silent Failure Elimination** | OpenClaw, NanoBot, ZeroClaw, LobsterAI, NanoClaw | DeepSeek silent reply failure (OpenClaw #116277), `/goal` runaway loops (NanoBot #5256), malformed SOPs silently dropped (ZeroClaw #9786), no-output/no-error execution (LobsterAI #2447), unknown slash commands silently dropped (NanoClaw #2346) |
| **Security Hardening** | OpenClaw, ZeroClaw, NanoBot, IronClaw | Shell confinement (ZeroClaw #9827), forbidden-path bypass (ZeroClaw #9815), session history reachability with workspace restriction (NanoBot #5278), memory poisoning defense (OpenClaw — 2 issues), tenant-scoped sandboxes (IronClaw #7214) |
| **Multi-Channel Reliability** | OpenClaw, NanoBot, ZeroClaw, PicoClaw, IronClaw, CoPaw | Telegram polling stalls (NanoBot #5156, #5171), WhatsApp audio/connectivity (NanoBot #5149, PicoClaw #3320), channel message loss (OpenClaw, IronClaw wrong-user delivery) |
| **Observability & Tooling** | OpenClaw, ZeroClaw, IronClaw, CoPaw | Cross-turn conversation correlation in OTel (ZeroClaw RFC #8933), trace capture on errors (IronClaw #7369), doc-truth/verification pipeline (IronClaw #7317) |

---

## 5. Differentiation Analysis

| Project | Primary Focus | Target Users | Technical Architecture |
|---------|--------------|--------------|----------------------|
| **OpenClaw** | Mass-market personal assistant; feature breadth | Hobbyists to power users; largest community | Monolithic gateway + cloud services; beta release treadmill; extensive channel integrations |
| **ZeroClaw** | Security-first autonomous agent | Production operators, self-hosters | Rust crates; heavy security posture (sandboxing, forbidden-paths, approval workflows); SOP execution engine; Agent Plugins 1.0 adoption |
| **IronClaw** | Hosted/production agent platform | Teams, multi-tenant deployments | Multi-tenant sandboxing (Docker/Railway); Reborn runtime; progressive tool disclosure; stress-test harness |
| **NanoBot** | Lightweight, highly-responsive assistant | Individual users, rapid iteration | Fast release loop; same-day fixes; proactive channel delivery; Dream idle-session processing |
| **CoPaw** | All-in-one agent with desktop app | End-users wanting GUI + agent | Electron desktop + web workspace; ACP runner; ReMe memory subsystem; aggressive beta program |
| **LobsterAI** | Desktop chat client | End-users, IM-focused | Electron app; IM analytics; markdown/math rendering; Windows installer focus |
| **NanoClaw** | Channel + skill ecosystem | Channel-focused deployments | v2 ChannelAdapter architecture; skills packaging; wizard-based setup |
| **PicoClaw** | Lightweight Go agent | Raspberry Pi / $10 hardware | Go; minimal footprint; MCP-centric; Copilot SDK integration |

---

## 6. Community Momentum & Maturity

**Tier 1 — Rapid Iteration (high velocity, unstable):**
- **OpenClaw** — Massive community but drowning in its own regressions (4 P0s). Shipping quickly but breaking trust.
- **CoPaw** — Beta-stabilization sprint; shipped 21 merged PRs in 24h with active first-time-contributor involvement. High energy, expected instability.

**Tier 2 — Steady Growth (good velocity, improving stability):**
- **ZeroClaw** — Excellent issue-to-fix pairing (same-day PRs for bug reports). Security-focused roadmap is attracting sophisticated contributors. RFC process is functioning.
- **IronClaw** — Coordinated architectural pushes (doc-truth pipeline, tool disclosure) with 12 PRs closed. Bug-bash findings are being systematically addressed, but P1 infrastructure issues linger.
- **NanoBot** — Most responsive small team; same-day issue closes and rapid PR turnaround. Community satisfaction appears highest here relative to scale.

**Tier 3 — Mature/Stabilizing:**
- **LobsterAI** — Weekly release cadence, low issue volume, healthy feature-to-release pipeline. Stable but slow-moving compared to ecosystem leaders.
- **NanoClaw** — No bug reports in 24h; clean contributor flow; meaningful architectural work (Mattermost re-implementation, template setup).

**Tier 4 — Maintenance Mode:**
- **PicoClaw** — Dependency bumps only; one critical WhatsApp bug awaits review; community is small but technically engaged (detailed code review submissions).

**Tier 5 — Dormant (5 projects):** NullClaw, TinyClaw, Moltis, ZeptoClaw, EasyClaw — zero activity; likely abandoned or paused.

---

## 7. Trend Signals

1.  **Silent failure is the #1 trust killer across the ecosystem.** The single most repeated user complaint spans five projects: agents that say nothing useful, fabricate plausible output, or drop messages without surfacing an error. OpenClaw (#116277, 129 comments), NanoBot (#5256), ZeroClaw (#9786), LobsterAI (#2447), and NanoClaw (#2346) all received fixes or active debate this week. AI agent developers should treat error transparency as a first-class UX requirement, not an afterthought.

2.  **Cost visibility is becoming a non-negotiable feature.** NanoBot's token-burn issue (#5266) and ZeroClaw's broken budget caps (#9816) both hit the same nerve: users want to know what their agents are spending and why. OpenClaw's per-model logging (#13219) and IronClaw's token accounting (#6989) show the theme is ecosystem-wide. Expect usage dashboards and cost controls to become default expectations in the next release cycle.

3.  **Security is shifting from feature to foundation.** ZeroClaw's shell-confinement work, NanoBot's session-isolation fix, IronClaw's tenant sandboxing, and OpenClaw's memory-poisoning defense all point to a maturing security posture. Notably, the community is *proactively* reporting security gaps (NanoBot #5278, ZeroClaw #9815), suggesting security-minded contributors are actively probing agent architectures.

4.  **Model-agnosticism is a competitive differentiator.** Every project touched provider compatibility this week: CoPaw's Google Gemini/OpenAI-compatible provider failures, PicoClaw's Slack-vs-WebUI session management, OpenClaw's DeepSeek silent failures, and ZeroClaw's OpenRouter streaming drop. Projects that handle provider quirks gracefully will retain users; those that don't will churn them.

5.  **The "agent lies about state" problem is systemic, not isolated.** IronClaw's four separate bug reports of the agent confidently asserting false connections/automations echo OpenClaw's silent-failure theme. The root cause is the same: agents lack a verification step between belief and claim. IronClaw's memory-guidance fix (#7365) and OpenClaw's memory trust-tagging (#7707) are two different approaches to the same underlying gap — state verification before assertion.

6.  **Headless/automated execution remains fragile.** ZeroClaw's SOP headless runs hanging forever (#9805), CoPaw's infinite financial-import loops (#6768), and NanoBot's cron hallucination (#49876) all share a pattern: agents running without human supervision can get stuck or fabricate results. The demand for reliable unattended operation is growing, but the ecosystem has not yet solved it.

7.  **Platform-specific reliability is a quiet differentiator.** Windows (IronClaw #6590, CoPaw #6810, LobsterAI watchdog fixes), Raspberry Pi/aarch64 (ZeroClaw #9832), and Docker (CoPaw #6782) each surfaced as distinct pain points. Projects that ship polished per-platform experiences — not just cross-platform *capability* — will win loyalty from deployment-happy users.

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot Project Digest – 2026-08-08

## Today's Overview

NanoBot is experiencing an intense development cycle, with 31 issues and PRs updated in the last 24 hours. The project shows strong forward momentum with 11 PRs merged or closed, counterbalanced by 10 active issues, mostly in the bug/enhancement categories. The maintainer team is highly responsive, frequently closing issues on the same day they are reported. Areas of focus include session isolation and security, WebUI polish, and channel-specific fixes across Telegram, Matrix, WeChat, and WhatsApp. A notable security concern regarding session history being readable by agents (`#5278`) has a corresponding fix PR already in review.

## Releases

No new releases were published in the last 24 hours.

## Project Progress

Eleven PRs were merged or closed in this period, advancing several functional areas:

- **Session Retention & Memory**: PR `#5272` (fixes `#5273`) preserves proactive channel delivery messages during session history trimming. PR `#5280` archives short idle sessions so Dream can process them. PR `#5231` adds idle-session archiving for Dream. PR `#5260` makes memory ignore runtime files in tracked workspace directories.
- **WebUI Enhancements**: PR `#5268` fixes staged media URLs for out-of-media-root attachments on history reads. PR `#5285` preserves the topic route after creating a new chat. PR `#5277` expands the model preset editor inline. PR `#5281` keeps activity text crisp while fading edges. PR `#5284` removes the legacy session messages route.
- **WeChat Fixes**: PR `#5263` hardens the Weixin channel protocol delivery, streaming, and login against the latest `@tencent-weixin/openclaw-weixin` 2.4.6 requirements.
- **Dependency Guidance**: PR `#5282` modernizes recovery guidance for Langfuse, Olostep, WeChat, and `oauth-cli-kit` to use canonical `nanobot plugins enable` commands.
- **Channel Configuration**: PR `#5287` preserves global `sendProgress` and `sendToolHints` defaults for channels without explicit overrides.

## Community Hot Topics

- **Issue `#5266` – Token consumption logging** (10 comments) – [github.com/HKUDS/nanobot/issues/5266](https://github.com/HKUDS/nanobot/issues/5266): User reports burning millions of tokens in 2 hours with no visible user activity and requests token-usage logging to trace the source. This is the highest-engagement issue and points to cost-control as a major community need.

- **PR `#5156` – Telegram polling stall recovery** (no comment count listed but 13 days open) – [github.com/HKUDS/nanobot/pull/5156](https://github.com/HKUDS/nanobot/pull/5156): Fixes silently stalled Telegram polling after network blips (e.g. proxy drops), leaving the bot permanently deaf while the process stays alive. Production-environment reliability concern that has remained open for over a week.

- **Issue `#5149` – No audio on WhatsApp** (5 comments) – [github.com/HKUDS/nanobot/issues/5149](https://github.com/HKUDS/nanobot/issues/5149): Bot cannot send audio messages via WhatsApp but can receive them. The log snippet suggests an ffmpeg-related problem. Open for 11 days without a fix PR.

- **Issue `#5198` – Model switching restricted** (3 comments) – [github.com/HKUDS/nanobot/issues/5198](https://github.com/HKUDS/nanobot/issues/5198): Users cannot switch models per session; the `/model` command appears ineffective and the model blip in the WebUI is non-interactive, unlike Cloud SaaS AI chat UIs.

## Bugs & Stability

Ranked by severity:

1.  **Regular session memory leak – issue `#5266`**: Millions of tokens consumed in 2 hours without user-visible activity. No fix PR yet.
2.  **Security: session history readable by agents – issue `#5278`** (reported today): `PR #5279` proposes moving session files out of the workspace to close the reachability gap when `restrict_to_workspace` is enabled. Fix in review.
3.  **`/goal` runaway reply loop – issue `#5256`**: A single `/goal` message produced dozens of near-identical replies while waiting for user input, ending only via user intervention or the model self-cancelling. No fix PR yet. A similar looping issue was previously addressed in PR `#5272` for proactive delivery messages during trimming.
4.  **Session trimming drops proactive deliveries – issue `#5273`** (closed): Fixed by PR `#5272`, which preserves `_channel_delivery` messages during `retain_recent_legal_suffix` and `enforce_file_cap` trimming.
5.  **Media URLs missing on history reads – issue `#5264`** (closed): Fixed by PR `#5268`, which stages out-of-media-root files on history reads, aligning with WebSocket behavior.
6.  **WhatsApp cannot send audio – issue `#5149`**: Still open without an associated fix PR.
7.  **Session model cannot be changed – issue `#5198`**: Reported enhancement/bug with no fix PR yet.
8.  **Telegram polling silently stalls – issue `#5171`**: Fix PR `#5156` is open with a tested regression but not yet merged.

## Feature Requests & Roadmap Signals

- **Token usage logging (issue `#5266`) – high priority**: The project will likely ship per-call token logging soon, given the visibility of the problem and the measurable cost impact.
- **Session-level model switching (issue `#5198`)**: Popularity of this request and friction with existing `/model` command suggests a WebUI model-picker redesign is due.
- **Per-session sandbox isolation (PR `#5283`)**: Opt-in `per_session_sandbox` mode for non-WebUI channels, giving each session its own filesystem sandbox. This aligns with the workspace-isolation trend and is likely to be merged.
- **Session history moved out of workspace (PR `#5279`)**: Security-driven change likely to land soon, given the team’s demonstrated responsiveness to reachability issues.
- **Telegram stickers and reactions (issue `#5289`)**: New feature request for Telegram channel sticker support and agent-initiated reactions; currently no comments or PRs.
- **Agent Plugins integration with CLI Apps (PR `#5288`)**: Uses the vendor-neutral Agent Plugins package format, unifying manual plugins and catalog Installations.
- **Computer-use and browser tools (PR `#4276`)**: Long-lived (open since June 10) enhancement for model-agnostic computer control and browser automation; a strong roadmap candidate.

## User Feedback Summary

The community shows high satisfaction with the maintainer team’s velocity and responsiveness, demonstrated by the volume of same-day issue closes and rapidly iterating PRs. Recurring user pain points include:

- **Cost anxiety** – Token burn is the loudest complaint (`#5266`), reflecting user desire for transparency and control over LLM spend.
- **Channel reliability** – Telegram polling stalls in production and WhatsApp audio transmission failures undermine trust in the bot as a communication tool.
- **Session model immutability** – Users expect the WebUI to behave like Cloud SaaS AI products (e.g., easily changing models per session) and are frustrated by the current restriction.
- **Proactive message loss** – Background cron notifications being dropped during session trimming caused real workflow disruption, but the quick fix (`#5272`,`#5273`) indicates the team listens and patches fast.
- **Security posture** – The session-history-inside-workspace issue (`#5278`) is proactively reported by the community, showing active security-minded contributors.

## Backlog Watch

- **PR `#4276` (computer use + browser tools)**: Open since June 10, 2026 (~2 months). This is a significant feature with no visible updates; may need maintainer attention or triage.
- **PR `#5156` (Telegram polling stall recovery)**: Open since July 29 (10 days); being a production-stability fix, it deserves review priority.
- **Issue `#5149` (WhatsApp audio)**: Open since July 28 (11 days); no PR linked. The attached log points to ffmpeg issues. Given the project’s usual tempo, this is long-unanswered.
- **Issue `#5198` (model switching)**: Open since July 31 (8 days); no PR. It is a usability pain point with 3 comments and no maintainer response indicated.
- **Issue `#5266` (token logging)**: Open since August 6 (2 days) but with 10 comments; the volume suggests maintainers should respond soon to avoid negative sentiment buildup.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-08-08

## 1. Today's Overview

ZeroClaw is in a highly active development phase with 50 issues and 50 PRs updated in the last 24 hours — a sustained high-velocity cadence. Activity is concentrated in four areas: a major SOP execution overhaul (PR #9841), a security hardening push across shell confinement and path validation, a significant observability RFC cycle, and ongoing Telegram/Slack channel improvements. Notably, the project is seeing a wave of new bug reports from field users on aarch64/Raspberry Pi deployments, which appears to be an expanding user base encountering platform-specific issues. The maintainer team (led by frequent contributor JordanTheJet) is demonstrating strong responsiveness by pairing new bug reports with corresponding fix PRs within the same 24-hour window. No new releases were published today, with the project currently at version 0.8.4.

## 2. Releases

No new releases were published in the last 24 hours. The project remains at version 0.8.4.

## 3. Project Progress

Three PRs were merged or closed in the last 24 hours:

- **[#9836 — fix(transcription): make local_whisper bearer_token optional](https://github.com/zeroclaw-labs/zeroclaw/issues/9836)** (CLOSED): This fix removes a hard failure when the `bearer_token` is absent for the `local_whisper` backend. The canonical whisper.cpp server on loopback has no authentication, so requiring a token was blocking legitimate local deployments.

The PR itself is small in scope (size:S) but important for local-first users — it unblocks the default transcription path for self-hosted whisper setups. The fix removes a configuration friction point where the token requirement was semantically incorrect for loopback-only deployments.

Two other PRs were closed/merged during this window, though details on their content are limited in the available data. The overall trend shows sustained merge velocity, with significant multi-commit PRs pending review (e.g., #9841 with four inherited commits plus additional fixes, and #9828 with six testable commits).

## 4. Community Hot Topics

The most actively discussed issues today reveal three distinct underlying community needs:

**1. Observability and Conversation Correlation (RFC #8933 — 13 comments)**
  - [RFC: Add cross-turn conversation correlation to OTel export](https://github.com/zeroclaw-labs/zeroclaw/issues/8933)
  - This RFC, now closed/accepted, proposes carrying an opaque conversation ID through the OTel export as the `gen_ai.conversation.id` attribute. The high comment count reflects strong community interest in understanding agent behavior across multi-turn interactions. Users want to reconstruct full conversation flows in their observability backends — a clear signal that ZeroClaw is being used in production deployments where tracing across turns is essential for debugging and cost analysis.

**2. ZeroCode Ownership Migration (RFC #9246 — 12 comments)**
  - [RFC: Preserve Todo tracker configuration during ZeroCode ownership migration](https://github.com/zeroclaw-labs/zeroclaw/issues/9246)
  - This accepted RFC addresses a configuration-preservation concern during ownership migration. The 12 comments indicate the community is actively shaping how ownership transitions should work without data loss. The underlying need appears to be operational continuity — users are migrating between ownership models and need their existing configuration (including Todo trackers) to survive the transition.

**3. Test Flakiness (Issue #9834 — new, 0 comments)**
  - [Intermittent zeroclaw-runtime test failures from shared process-global state](https://github.com/zeroclaw-labs/zeroclaw/issues/9834)
  - While this is a newly filed bug, the pattern of shared process-global state (turn_streamed receipts + model_switch) causing intermittent failures is a classic contributor-deterrent. The community's implicit need is CI reliability — flaky tests block PR merges and slow down the contribution pipeline. This one is marked S3 (minor) but could rise in priority as it affects developer experience.

## 5. Bugs & Stability

A significant number of bugs were reported or updated today. Ranked by severity:

**S1 (Workflow-blocked):**

- **[#9840 — Daemon steals daemon.sock on start and unlinks it on exit](https://github.com/zeroclaw-labs/zeroclaw/issues/9840)** — New, 0 comments. Two unguarded operations in `crates/zeroclaw-runtime/src/rpc/local.rs` let any second daemon break the first and then break the socket for everyone. This is a race condition that can strand all daemon communication. No fix PR yet.

- **[#9775 — OpenRouter streaming requests drop provider_extra](https://github.com/zeroclaw-labs/zeroclaw/issues/9775)** — In-progress. The `stream_chat` path serializes `NativeChatRequest` directly without calling `merge_extra_body`, so all configured provider extras are silently dropped during streaming. This breaks any provider-specific streaming configuration.

- **[#9708 — Bound service launcher stdout and stderr logs](https://github.com/zeroclaw-labs/zeroclaw/issues/9708)** — In-progress. Serveral daemon launch paths redirect stdout/stderr to fixed files with no size, age, or file-count bound. Unbounded log files can fill disks and crash production deployments.

**S1 (Security-critical):**

- **[#9816 — Anthropic provider reports $0.00 spend, budget caps never fire](https://github.com/zeroclaw-labs/zeroclaw/issues/9816)** — Accepted. Every usage record is written with `cost_usd: 0.0`, so daily/monthly budget checks never trigger. This is both a cost-control failure and a financial-visibility bug.

- **[#9815 — forbidden_paths is unreachable under allowed_roots or the workspace](https://github.com/zeroclaw-labs/zeroclaw/issues/9815)** — Accepted. The `is_path_allowed` check returns `true` at the allowed-root check before reaching the forbidden-path loop. Security policy is effectively bypassed — a critical security defect.

- **[#9805 — SOP auto-mode runs from channel/cron triggers never execute and rot](https://github.com/zeroclaw-labs/zeroclaw/issues/9805)** — Accepted. Headless dispatch has no agent loop, so auto-mode SOPs started from channel/cron hold concurrency slots forever. A fix PR is already in review: **[#9841](https://github.com/zeroclaw-labs/zeroclaw/pull/9841)** continues #9494 to drive headless SOP runs.

- **[#9786 — Malformed SOP.toml silently dropped, sop validate reports success](https://github.com/zeroclaw-labs/zeroclaw/issues/9786)** — Accepted. A malformed SOP is indistinguishable from an absent one, which can lead operators to believe a failing automation still exists.

**S2 (Degraded behavior):**

- **[#9656 — Telegram typing indicator runs during entire approval wait](https://github.com/zeroclaw-labs/zeroclaw/issues/9656)** — Accepted. Blocked turns look identical to working turns, confusing users watching for progress.

- **[#9805 — SOP runs mark failed mid-step with no audit event](https://github.com/zeroclaw-labs/zeroclaw/issues/9804)** — New. Related to the SOP engine launch fixes; users cannot determine why a run failed.

- **[#9708 — Unbounded launcher logs](https://github.com/zeroclaw-labs/zeroclaw/issues/9708)** — In-progress, size-bound logs being implemented.

**S3 (Minor but relevant):**

- **[#9834 — Intermittent test failures from process-global state](https://github.com/zeroclaw-labs/zeroclaw/issues/9834)** — New. Flaky CI for `zeroclaw-runtime`.

- **[#9832 — zeroclaw-hardware fails to compile with --features hardware](https://github.com/zeroclaw-labs/zeroclaw/issues/9832)** — New. Unresolved import `aardvark_sys::AardvarkHandle` on aarch64 targets, blocking Raspberry Pi users.

**Notable security-series fixes (PRs paired with bugs):**
- **[#9827 — Stop shell children from escaping their validated confinement](https://github.com/zeroclaw-labs/zeroclaw/pull/9827)** — New, addresses sandbox wrap dropping working directory, PATH-based escapes, and capabilities not tightened after fork.
- **[#9839 — Deny irreversible destructive commands in every posture](https://github.com/zeroclaw-labs/zeroclaw/pull/9839)** — New. The current `*` short-circuit with `block_high_risk_commands=false` is dangerous.
- **[#9838 — Authorize the account that taps an approval button](https://github.com/zeroclaw-labs/zeroclaw/pull/9838)** — New. Telegram inline-keyboard callback never performed an allowlist check on `from`.

## 6. Feature Requests & Roadmap Signals

Multiple RFCs point to where ZeroClaw is heading:

**In-flight RFCs (likely in 0.9.0):**
- **[#9810 — Load Agent Plugins 1.0 skill and MCP packages](https://github.com/zeroclaw-labs/zeroclaw/issues/9810)** — New, 2 comments. Vendor-neutral plugin standard support. This is a major ecosystem play — allowing community plugins via `plugin.json` + `skills/` + `mcp.json`. The fact that it arrived same-day as the Agent Plugins standard suggests maintainers are tracking the vendor-neutral ecosystem closely. High chance this lands in the next release.

- **[#9346 — Define unified package/capability/config/runtime-state catalog contract](https://github.com/zeroclaw-labs/zeroclaw/issues/9346)** — 4 comments. Consolidates #8908 and #8909 into a single product-level catalog. This is foundational architecture that will shape the plugin ecosystem.

- **[#9824 — Simplify default web-tool surface to web_fetch + web_research + http_request](https://github.com/zeroclaw-labs/zeroclaw/issues/9824)** — 1 comment. Paired with PR **[#9833 — feat(tools): add web_research delegate](https://github.com/zeroclaw-labs/zeroclaw/pull/9833)** which is already up. This tool consolidation is likely to ship together. The design (bounded sub-agent loop, 8 tool calls, 180s wall clock) is a well-scoped approach that should reduce tool-calling confusion for the main agent.

- **[#8424 — Workspace-relative forbidden path patterns and .zeroclawignore](https://github.com/zeroclaw-labs/zeroclaw/issues/8424)** — 10 comments. The related security fix pattern suggests this is moving forward.

**Related PR under active review:**
- **[#9828 — Agent-facing config authoring with operator-approved policy previews](https://github.com/zeroclaw-labs/zeroclaw/pull/9828)** — Six commits, including a JSON Patch implementation. This addresses the real-world behavior where shell-capable agents `echo > config.toml` — a dangerous pattern. This is a strong architectural addition for safe autonomous agent operation.

**For the next release, I predict:** Agent Plugins 1.0 support (likely late-cycle), the web_tool consolidation with web_research delegate, and the unified catalog contract. The SOP headless-run fix (PR #9841) is the most urgent and should ship immediately as a patch release.

## 7. User Feedback Summary

**Real-world deployment pain points:**

- **Raspberry Pi / aarch64 users face a cluster of issues** (issues #9832, #9821, #9820 from the same user pattern): compilation failures with the `hardware` feature, the cron tool being bypassed in favor of shell `crontab`, and the calculator tool emitting `<TOOLCALL>` pseudo-syntax instead of a real function call. These reports suggest the prebuilt aarch64 binaries are gaining adoption, but model-tool interaction quality on smaller models (NVIDIA NIM llama-3.3-nemotron-49b) is inconsistent. The underlying theme: tool-calling behavior varies significantly across models, and ZeroClaw's tool-use instructions need to be more robust to model-specific syntax quirks.

- **Budget controls are a top concern** — the Anthropic cost reporting bug (#9816) directly undermines the budget-cap feature that operators rely on. A user tracking spend would see $0.00 while usage accumulates silently.

- **Approval-flow UX matters** — the Telegram typing-indicator issue (#9656) is a subtle but important trust signal. A blocked turn that looks active erodes user confidence in the approval mechanism. The Telegram approval-button authorization fix (PR #9838) addresses a security gap in the same workflow.

- **Security policy effectiveness is questioned** — the `forbidden_paths` unreachability bug (#9815) and the shell-escape vulnerabilities (PR #9827) indicate sophisticated users are actively probing the policy engine's limits. The rapid maintainer response (same-day fix PRs) is a positive signal.

**Satisfaction indicators:** The rapid-fire bug reports with detailed reproduction steps suggest an engaged and technically sophisticated user base actively deploying ZeroClaw in real environments. The pair of RFCs accepted today (#8933, #9246) both complete after at least two weeks of discussion show the RFC process is functioning: proposals are heard, refined, and ratified.

## 8. Backlog Watch

**Long-unanswered issues needing maintainer attention:**

- **[#5937 — Refactor: Unify providers architecture and reqwest client management](https://github.com/zeroclaw-labs/zeroclaw/issues/5937)** — Open since April 20, 2026 (110 days), 12 comments. This refactor would deduplicate provider configuration logic and standardize reqwest client handling. The comment count signals broad community support, but the scope is large (touches all providers). It has been sitting with `status:accepted` — maintainer attention is needed to either schedule it or break it down into milestone-sized chunks.

- **[#8043 — Retire the standalone aardvark-sys crate](https://github.com/zeroclaw-labs/zeroclaw/issues/8043)** — Open since June 20, 9 comments. The RFC proposes folding `aardvark-sys` into `zeroclaw-hardware`. This has been sitting in `needs-author-action` since before today. Note: a related issue is that zeroclaw-hardware currently *fails to compile* with the `hardware` feature on aarch64 (issue #9832, filed today). The RFC and the compile bug may be related — if `aardvark-sys` is a known problem child on aarch64 targets, folding it into the crate that consumes it could surface those issues.

- **[#7130 — forbid(unsafe_code) workspace-wide with aardvark-sys as sole carve-out](https://github.com/zeroclaw-labs/zeroclaw/issues/7130)** — Open since June 3, 3 comments. This would restore a meaningful workspace-wide safety property. It is gated on the same `aardvark-sys` module as #8043; both could be resolved together.

**Stale PRs of note:**
- **[#8337 — feat(observability): herdr agent reporting integration](https://github.com/zeroclaw-labs/zeroclaw/pull/8337)** — Open since June 26, marked `needs-author-action`. This is a substantial size:XL PR adding Herdr status reporting. It has been sitting for six weeks awaiting author updates — a maintainer nudge or explicit close may be needed.

**[#8948 — fix(tools): reap exited stdio MCP server processes](https://github.com/zeroclaw-labs/zeroclaw/pull/8948)** — Open since July 10, marked `needs-author-action`. The zombie MCP server process issue (#8731) is a real operational problem, but the author appears to have gone quiet since the #9418 rewrite landed. This PR likely needs rebasing onto the new `SharedMcpTransportConn` architecture — either the maintainers should take it over or explicitly hand it to another contributor.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

**Date:** 2026-08-08

---

## 1. Today's Overview
PicoClaw activity is steady, with 4 issues and 14 PRs updated in the last 24 hours. The project health is generally good, marked by two merged dependency PRs and the submission of two new, non-dependency PRs addressing critical fixes (WhatsApp connectivity and exec tool timeout handling). The majority of open items are automated dependency bumps, with several now flagged as stale, which is a normal maintenance pattern. A notable community engagement point is a detailed code review issue (#3308) filled by a contributor. Overall, the pace suggests a healthy mix of maintenance, community contribution, and ongoing feature iteration.

## 2. Releases
There are no new releases for PicoClaw on this date. This period reflects a focus on incremental development and preparation for future releases.

## 3. Project Progress
Two PRs were closed/merged today, both from the automated dependency bot:
- **[PR #3291]:** Bumped `github.com/github/copilot-sdk/go` from 0.2.0 to 1.0.8. This is a major version jump, indicating the project is keeping pace with the Copilot SDK's API evolution.
- **[PR #3289]:** Bumped `github.com/pion/rtp` from 1.10.2 to 1.10.5, which includes performance and bugfix updates for WebRTC handling.

These updates are foundational and ensure the project remains stable and secure.

## 4. Community Hot Topics
- **[Issue #3093 (Closed)]:** The feature request for "SimpleX or tox" gateways was closed, likely as stale. Despite being closed, it had 6 comments, showing interest in decentralized communication channels.
- **[Issue #3308 (Open)]:** A user-submitted **Code Review** with detailed performance and concurrency analysis of SeaHorse, Channel Manager, and Hooks. This highlights that there is an active community of Go developers who are not just users, but contributors to code quality. The user's praise for the project ("building a native Go AI assistant that runs on $10 hardware... is seriously awe...") signals strong technical respect.

## 5. Bugs & Stability
A new high-severity bug was addressed via a new PR today, while one long-standing critical bug remains open.

- **[PR #3320 (Open)]:** Addresses a critical **WhatsApp connectivity bug (405 "Client Outdated")**. The current pinned SDK version is rejected by WhatsApp, effectively killing the channel. This PR offers a remedy and is critical to platform assurance.
- **[PR #3319 (Open)]:** Fixes an important bug in the `exec` tool where a per-run `timeout` argument was silently ignored in favor of the global setting. It also corrects the schema for `background` and `pty` to be booleans instead of strings. This is a reliability fix for users dependent on the tool.
- **[Issue #3308 (Open)]:** This "bug" tag contains a review calling out potential **concurrency hazards and goroutine leaks** within the core `seahorse` and channel management code. While not an active crash, this flags future stability risks. The related PR #3279 aims to fix a similar class of issue (tool-call format leakage) which could be a symptom of these deeper problems.

## 6. Feature Requests & Roadmap Signals
Two distinct feature requests are active and have been updated recently with the "stale" label. The roadmap appears to be prioritizing channel and backend expansion.

- **[Issue #3307 (Open)]:** A highly requested feature for **session management (list/switch) from chat channels like Telegram**. The author points out the feature exists in the Web UI but not in the chat clients, which is a direct usability pain point for power users.
- **[Issue #3302 (Open)]:** A request for **OAuth 2.1 support for MCP servers**. Given the huge demand for security and standardization in tool integrations, this is a strong candidate for a future release, even if it's currently marked as a "Nice-to-Have."

## 7. User Feedback Summary
User feedback is mixed between high praise for the tech and frustration with specific platform outages.

- **Positive:** Issue #3308 contains strong positive sentiment regarding the architecture and performance goals of PicoClaw.
- **Negative (Stability):** The inactive WhatsApp channel due to the 405 error is a clear point of dissatisfaction, leading to the immediate PR creation.
- **Negative (Usability):** Issue #3307 highlights frustrations for users who rely on Telegram over the web UI, calling out the inability to manage sessions on the go.

## 8. Backlog Watch
The following items have been open for over a week and are marked as stale, needing maintainer attention to either merge or close them out.

- **[PR #3271 (Open - 18 days):]** Refreshes default model names across 9 providers. This is critical because the current defaults are outdated (e.g., `gpt-5.6` vs `5.4`), and this PR ensures a good out-of-box experience for new users.
- **[PR #3283 (Open - 16 days):]** Adds DingTalk image message support. A feature PR from a community member waiting for review.
- **[PR #3279 (Open - 17 days):]** Fixes a "tool-call format leakage" in the seahorse summaries, a bugfix PR that addresses code quality and stability issues that warrant review.
- **[Issue #3302 (Open - 8 days):]** The OAuth 2.1 feature request, a legalistic need for enterprise adoption, is still pending triage and a proper response from the maintainers.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

## NanoClaw Project Digest — 2026-08-08

### 1. Today's Overview

NanoClaw shows a moderately active development day, with **10 pull requests** updated in the last 24 hours and **0 issues** reported or updated. While no new releases were cut today, the project continues to advance across channels, skills, and infrastructure. Two PRs were closed/merged during this window, and several older feature branches received fresh commits, indicating ongoing attention from maintainers and contributors. The absence of new bug reports is a positive signal for overall repository stability.

### 2. Releases

No new releases were published in the last 24 hours. This section is omitted accordingly.

### 3. Project Progress

Two PRs were closed/merged today:

- **[#3197 — fix(progress): 失败状态展示具体原因](https://github.com/nanocoai/nanoclaw/pull/3197)** (Merged): A fix (authored by tier2tech-tian) that improves failure-state messaging in the process card UI. The change extracts the first meaningful error from the agent-runner's `resultSummary` and surfaces it as a specific "action failed: reason" instead of a generic message. It also avoids exit-code boilerplate and reuses existing redaction logic, limited to 38 characters per line to prevent card truncation. Includes reducer unit tests and Feishu card cross-layer JSON tests. Validation: 274 targeted tests passed and full suite ran clean (1,427 tests).

- **[#546 — [PR: Skill, Status: Blocked] Add Mattermost channel skill (/add-mattermost)](https://github.com/nanocoai/nanoclaw/pull/546)** (Closed): The old Mattermost integration PR was closed as superseded. The author, wakqasahmed, submitted a fresh implementation at **PR #3199** targeting the current v2 `ChannelAdapter`/`channel-registry.ts` architecture, since #546 was tied to the pre-v2 `Channel`/`registry.ts` design that no longer exists on `main`.

Additionally, **PR #3199** (open) saw active work today, representing a clean re-implementation of the Mattermost channel integration.

### 4. Community Hot Topics

No single issue or PR dominated attention this window.

The most notable activity cluster is the **Mattermost channel integration effort**: PR **#3199 Add Mattermost channel integration (v2 ChannelAdapter)** (open, by wakqasahmed) is a fresh, forward-looking rewrite that correctly targets the modern architecture. Its predecessor **#546** was closed today as obsolete. Combined, these signal sustained community interest in Mattermost support, and the community appears aligned with maintainers on the correct architectural path.

Other active contributor-driven PRs:

- **#3190 — feat: add Tavily MCP tool skill** (manisrinivasan2k1) — a utility skill adding Tavily-based web search via MCP.
- **#3198 — Add AnyDoc document conversion skill** (amit-shafnir) — a utility skill for document conversion.
- **#3196 — Fix/add mount readonly** (teran13) — a bug-fix PR touching mount-related configuration.

### 5. Bugs & Stability

No new bug reports were filed in the last 24 hours, and no crash or regression issues are tracked as open or updated.

Two bug-fix PRs are in flight:

- **[#3145 — fix(db): backfill destinations for existing wirings](https://github.com/nanocoai/nanoclaw/pull/3145)** (open, by tlysanhuo): Adds migration 021 to backfill missing channel destinations in existing messaging-group wirings, preserving all existing destinations and custom local names. This addresses a potential data-consistency gap for existing users.
- **[#2346 — fix(formatter): treat unknown slash commands as normal chat](https://github.com/nanocoai/nanoclaw/pull/2346)** (open, by SidhayaPravda618): Fixes a silent-response bug where unknown slash commands were misclassified as `passthrough`, causing the Agent SDK to interpret them as Claude Code commands and drop the resulting output. The fix routes them to `category: 'none'` instead.
- **[#3196 — Fix/add mount readonly](https://github.com/nanocoai/nanoclaw/pull/3196)** (open, by teran13): Addresses a mount-related configuration issue, though specifics are not yet fully described in the PR body.

The one merged fix today (**#3197**), targeted at failure-message clarity in the process UI, also serves a stability role by making failures easier to diagnose for end users.

### 6. Feature Requests & Roadmap Signals

No explicit feature requests were filed via new issues in the last 24 hours, but PR activity strongly indicates near-term roadmap focus:

- **Channel integrations**: Mattermost (PR #3199) is actively being re-introduced against the v2 architecture. Also in flight: **PR #3050** adds Dial to the channel picker and the wizard/skills flow, introducing a `runChannelSkill` model — signaling continued channel-expansion momentum.
- **Skills ecosystem**: New utility skills are arriving steadily: **Tavily MCP tool** (#3190) and **AnyDoc document conversion** (#3198). This continues the project's pattern of packaging standalone tooling as skills.
- **Agent templates**: PR **#2909** (open, core-team) adds template-based setup to the wizard and first-agent stamping. This is the second half of the template feature (loader landed in #2890) and, when merged, will ship a user-facing setup flow.

Expect **more channels (Mattermost, Dial), more utility skills, and the agent-template setup flow** in the next release cycle.

### 7. User Feedback Summary

The small window yielded sparse direct user feedback, but a few signals stand out:

- **Pain point around Mattermost support**: The churn in #546/#3199 shows that users/contributors want Mattermost integration and that the project's architectural shift to `ChannelAdapter` has been observed and internalized by the community. The cleanest signal: community members are actively tracking the current codebase patterns and re-implementing integrations to match.
- **Pain point around failure transparency**: The merged fix #3197 addresses user-facing frustration with vague failure messages ("执行系统检查失败") by surfacing concrete error reasons — an indication that generic failure states were a known user annoyance.
- **Silent message drops**: #2346 addresses a scenario where command output was silently dropped; the existence of the bug suggests some users encountered confusing non-responses, which the fix now routes through normal chat handling.

No negative sentiment or satisfaction complaints were recorded in this window.

### 8. Backlog Watch

Potentially important issues/PRs awaiting maintainer action:

- **#2346 — fix(formatter): treat unknown slash commands as normal chat** (open since 2026-05-08): ~3 months old, addressing a silent-response bug that directly affects user-perceived reliability. The PR body includes a clear before/after behavioral description. Lacks recent maintainer activity signal and merits attention.
- **#2909 — [core-team] feat(setup): template setup flow in the wizard and first-agent stamping** (open since 2026-07-02): Core-team authored feature that builds on #2890 (already landed). With the template loader merged, this second half should be prioritized to deliver the complete feature set to users.

No long-dormant issues (0 open issues overall) require triage at this time.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

**IronClaw Project Digest — 2026-08-08**

### 1. Today's Overview

IronClaw shows very high activity with exactly 50 issues and 50 PRs updated in the last 24 hours, including 36 open/active issues and 38 open PRs. A significant, coordinated push around "doc-truth" (a 5-PR pipeline to eliminate documentation drift) and Reborn runtime hardening dominates the current work. Core contributor `serrrfirat` is unusually active, driving large refactors (tool disclosure, memory, stress testing) and filing decomposition and epic tracking issues. The project closed 12 PRs and 14 issues in the period, including several long-standing QA bug-bash items related to Telegram and Slack channels, indicating steady convergence on stability.

### 2. Releases

No new releases were published in the last 24 hours. The latest tracked release remains the `1.1.0-rc.1` line, with a known migration gap (see #7380) between `1.0.0-rc.1` and `1.1.0-rc.1` that is actively being addressed.

### 3. Project Progress

Several significant PRs were merged or closed in the last 24 hours, advancing core architecture and fixing long-standing bugs:

- **[PR #7214](https://github.com/nearai/ironclaw PR #7214) (Merged):** Added explicit Docker and Railway user-sandbox profiles, scoping workspaces/checkpoints to tenant+user and running commands in fresh non-root Python workers — a major multi-tenant security hardening.
- **[PR #7324](https://github.com/nearai/ironclaw PR #7324) (Merged):** Dependency bump (11 updates across the workspace, including `base64`, `toml`, `rstest`).
- **[PR #7372](https://github.com/nearai/ironclaw PR #7372) (Merged):** Pinned the wide-catalog schema-token reduction floor and made cost drift visible in CI, protecting the progressive tool disclosure efficiency win from regression.
- **[PR #7157](https://github.com/nearai/ironclaw PR #7157) (Closed):** Implemented the explicit channel delivery tool with the approved two-lane model (conversation lifecycle + notification channels), deleting delivery heuristics.
- **[PR #7131](https://github.com/nearai/ironclaw PR #7131) (Open, updated):** Triggered-run failures now deliver sanitized terminal notices to the creator's preference target instead of being silently skipped.

### 4. Community Hot Topics

The most active discussions reveal an underlying need for safety, recoverability, and predictable defaults:

- **[Issue #7340](https://github.com/nearai/ironclaw Issue #7340) — "No way to reset model settings to factory defaults" (6 comments):** Users have no recovery path after changing provider/model settings. The discussion signals a UX gap around configuration safety and "undo"; high likelihood of a "Reset to defaults" action being expedited.
- **[Issue #6989](https://github.com/nearai/ironclaw Issue #6989) — "Token accounting: hybrid provider-usage + tail estimates" (4 comments):** A deep Reborn correctness bug where input token estimates use the length of a *reference string* instead of the referenced content — affecting billing, context budgets, and potentially causing silent truncation.
- **[Issue #7317](https://github.com/nearai/ironclaw Issue #7317) — "Proposal: Doc-Truth Verification Pipeline" (3 comments):** The community highlighted that breaking changes shipped without docs updates (`origin_gate_matrix` became mandatory undocumented). This sparked the immediate 5-PR doc-truth pipeline effort — a direct, rapid response from maintainers.
- **[Issue #7360](https://github.com/nearai/ironclaw Issue #7360) — "Expand stress coverage across built-in and durable write paths" (2 comments):** The nightly stress harness's mock model never invokes tool calls, leaving durable write paths unexercised. PR #7382 is already open as a fix.

### 5. Bugs & Stability

Bug-bash results continue to surface reliability issues, ranked by severity:

1.  **High — Run-level infrastructure failures: [Issue #7298](https://github.com/nearai/ironclaw Issue #7298) ("request failed before it could be sent" / "lost contact with runner") and [Issue #5456](https://github.com/nearai/ironclaw Issue #5456) (runner lease expiration).** These indicate an ongoing flakiness in the runner/monitoring path that blocks routine and complex tasks. No fix PR is open yet — likely a P1 for the next sprint.
2.  **High — Agent state hallucination cluster:** Multiple bug-bash issues report the agent confidently asserting false state: [GitHub already connected #7247](https://github.com/nearai/ironclaw Issue #7247), [automation already running #7246](https://github.com/nearai/ironclaw Issue #7246), [Slack ACTIVE but unrecognized #7344](https://github.com/nearai/ironclaw Issue #7344), [wrong Telegram routine memory #7294](https://github.com/nearai/ironclaw Issue #7294). These indicate a systemic weakness in state-verification before claim-making, possibly addressable via PR #7365 (memory guidance).
3.  **Medium — Model-claimed connection failures:** [Issue #7295](https://github.com/nearai/ironclaw Issue #7295) (Slack DM sent to wrong user) and [Issue #7074](https://github.com/nearai/ironclaw Issue #7074) (multi-tool research fails after calendar fetch, calls unavailable function). Both point to incomplete context or tool-availability enforcement in multi-step tasks.
4.  **Medium — Encoding failure hallucination: [Issue #6476](https://github.com/nearai/ironclaw Issue #6476) (CLOSED):** The tool-input encoding error was fixed; a docs-drift half was split into #7367 (also CLOSED) and the root-cause latency split into #7368.
5.  **Low — Windows: [Issue #6590](https://github.com/nearai/ironclaw Issue #6590) (`serve` fails with `/skills` root overlap).** Open for 2+ weeks, still no fix.
6.  **Low — Observable bug: [Issue #7324](https://github.com/nearai/ironclaw Issue #7324)** (CLOSED) — Telegram replies delivered to the wrong user message, root cause tracked to latency in #7368.

### 6. Feature Requests & Roadmap Signals

The following requests have high momentum and are likely candidates for the next minor release (`1.1.x` or `1.2.0`):

- **[Issue #7340](https://github.com/nearai/ironclaw Issue #7340):** "Reset to defaults" action for model settings — small, high-urgency UX fix.
- **[Issue #7362](https://github.com/nearai/ironclaw Issue #7362):** Move 65 hardcoded English failure summaries into per-surface i18n with a CLI message resolver — a clean, well-scoped enhancement for localization.
- **[Issue #7317](https://github.com/nearai/ironclaw Issue #7317) / PRs #7375-7381:** The entire doc-truth pipeline (docs-live branch, contract tests, guidance checks) is already in review and likely to land this week.
- **[PR #7374](https://github.com/nearai/ironclaw PR #7374):** Bulk `tool_describe` to collapse per-schema round-trips — will further reduce latency in progressive tool disclosure.

### 7. User Feedback Summary

Real user pain points this week center on **perceived agent unreliability**:

- **"The agent lies about state":** Multiple reports of the agent claiming connections/automations exist when they do not ([#7246](https://github.com/nearai/ironclaw Issue #7246), [#7247](https://github.com/nearai/ironclaw Issue #7247), [#7294](https://github.com/nearai/ironclaw Issue #7294), [#7344](https://github.com/nearai/ironclaw Issue #7344)). This is the most visible dissatisfaction driver and erodes trust.
- **"The agent forgets":** Memory recall across conversations is broken ([#7185](https://github.com/nearai/ironclaw Issue #7185)), with fix PR #7365 open and targeting three root causes (no prompt lane, no save guidance, no always-on memory).
- **"I can't recover from my own changes":** Users want a factory-reset path for settings ([#7340](https://github.com/nearai/ironclaw Issue #7340)).
- **"I can't debug errors":** Trace capture is unavailable on error screens ([#7369](https://github.com/nearai/ironclaw Issue #7369)).
- **"Channels feel broken":** Slack and Telegram connectivity still generate QA complaints, though the root causes for Telegram are now identified as latency ([#7368](https://github.com/nearai/ironclaw Issue #7368)) and command handling ([#6475](https://github.com/nearai/ironclaw Issue #6475) CLOSED).

### 8. Backlog Watch

Several significant items remain without maintainer attention or clear resolution:

- **[Issue #6590](https://github.com/nearai/ironclaw Issue #6590) (Windows serve failure):** Open since 2026-07-23, last activity 08-07 but no linked fix. Persistent cross-platform parity issue.
- **[Issue #5456](https://github.com/nearai/ironclaw Issue #5456) (Runner lease expiration):** Open since 2026-06-30, the longest-standing bug-bash P1 on the board; no PR is attached. This should be a top priority for infrastructure teams.
- **[Issue #7362](https://github.com/nearai/ironclaw Issue #7362) (i18n for failure summaries):** Newly filed and important, but zero comments — needs maintainer triage to confirm scope and timing.
- **[Issue #7369](https://github.com/nearai/ironclaw Issue #7369) (Trace capture on error):** A zero-cost observability gap that undermines all other debugging; nobody has responded yet.
- **[PR #6938](https://github.com/nearai/ironclaw PR #6938) ("the model chooses the skill, not a keyword scorer"):** Open since 07-31 with no comments — a large, design-significant change that deserves review or explicit deferral.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI Project Digest — 2026-08-08

## Today's Overview
LobsterAI shows moderate activity with 7 issues and 7 PRs updated in the last 24 hours. A new release (2026.8.7) was published, incorporating 6 merged PRs. The project remains healthy: 3 issues were closed (mostly stale bugs from April), 4 remain open, and 1 new PR is still pending review. The release cadence remains steady at roughly weekly/bi-weekly intervals, with the current cycle focused on markdown rendering, Cowork chat search, and Windows installer reliability.

## Releases
**LobsterAI 2026.8.7** (released 2026-08-07) — [Release Link](https://github.com/netease-youdao/LobsterAI/releases)
- **feat(cowork):** Added title-bar conversation search (PR #2435)
- **feat:** Markdown LaTeX math delimiters support (PR #2449)
- **fix(win-installer):** Rescue null watchdog exit code via extractor (PR #2446)

No breaking changes or migration notes were indicated. This release follows the 2026.8.5 release merged to main on the same day.

## Project Progress
Six PRs were merged/closed today:
- [#2451](https://github.com/netease-youdao/LobsterAI/pull/2451) — Merged `release/2026.8.5` into main, adding in-conversation search, math rendering improvements, IM analytics, OpenClaw configuration/plugin installation fixes, and Windows reliability.
- [#2450](https://github.com/netease-youdao/LobsterAI/pull/2450) — Fixed Cowork fullscreen code toolbar clicks on Windows (Electron title bar drag regions).
- [#2449](https://github.com/netease-youdao/LobsterAI/pull/2449) — Fixed Markdown LaTeX math delimiters rendering.
- [#2448](https://github.com/netease-youdao/LobsterAI/pull/2448) — Fixed Cowork chat search functionality.
- [#2445](https://github.com/netease-youdao/LobsterAI/pull/2445) — Fixed OpenClaw config.set to strip plugin-index-managed keys.
- [#2446](https://github.com/netease-youdao/LobsterAI/pull/2446) — Fixed Windows installer null watchdog exit code.

## Community Hot Topics
- **[Issue #1195](https://github.com/netease-youdao/LobsterAI/issues/1195) (Open, [stale])** — Self-created skill installed to OpenClaw directory but not visible in skill panel after restart. 2 comments. Long-running issue (since April) that may need maintainer attention.
- **[Issue #2443](https://github.com/netease-youdao/LobsterAI/issues/2443) (Open)** — Model IDs containing slashes (e.g., SiliconFlow's `deepseek-ai/DeepSeek-V4-Flash`) can't be selected in the UI for custom OpenAI-compatible providers. A fix PR ([#2452](https://github.com/netease-youdao/LobsterAI/pull/2452)) is already open — this is the most actionable community report today.

## Bugs & Stability
Ranked by severity:
1. **High — [Issue #2443](https://github.com/netease-youdao/LobsterAI/issues/2443):** Custom provider model IDs with slashes unusable in UI. Fix PR [#2452](https://github.com/netease-youdao/LobsterAI/pull/2452) open. Affects all OpenAI-compatible providers with slash-containing model IDs.
2. **Medium — [Issue #2447](https://github.com/netease-youdao/LobsterAI/issues/2447):** Execution returns no output and no error message (no reproduction details yet). No fix PR yet.
3. **Medium — [Issue #1195](https://github.com/netease-youdao/LobsterAI/issues/1195) ([stale]):** Skill installation path mismatch (installed to OpenClaw directory, not visible in panel). Unresolved since April.
4. **Low — [Issue #1263](https://github.com/netease-youdao/LobsterAI/issues/1263) ([closed, stale]):** Scheduled tasks showing duplicate entries with API rate-limit errors. Closed but possibly unresolved root cause.
5. **Low — [Issue #1273](https://github.com/netease-youdao/LobsterAI/issues/1273) ([closed, stale]):** sql.js WASM memory corruption under high-frequency writes causing app crash and DB corruption risk. Closed without visible fix.

## Feature Requests & Roadmap Signals
- **Per-agent IM bot & model binding** ([Issue #1265](https://github.com/netease-youdao/LobsterAI/issues/1265), closed as stale): Community request for multi-agent team setups where different agents use different IM bots and models. The idea aligns with the project's multi-agent direction and may resurface.
- **Input box edit mode** ([Issue #2444](https://github.com/netease-youdao/LobsterAI/issues/2444), open): User requests configurable Enter/Ctrl+Enter behavior or an "edit mode" toggle for long-form prompt writing. Low complexity, likely to be picked up soon.
- **Cowork conversation search** shipped in this release — the feature request pipeline appears to be actively converting user asks into shipped functionality.

## User Feedback Summary
- **Pain point:** Custom model ID compatibility with popular providers (SiliconFlow) is broken — directly impacts users who rely on non-OpenAI native APIs.
- **Pain point:** Long-prompt input UX is poor (accidental send on Enter when intending newline).
- **Pain point (persistent):** Skill installation to wrong directory breaks the skill panel experience, with no resolution since April.
- **Positive signal:** The project is responsive to feature requests — Cowork search and LaTeX math support both shipped in this release cycle, suggesting a healthy feature feedback loop.
- **Stability concern:** Recurring reports of silent failures (no output, no error) and rate-limit-related UI duplication indicate some edge-case robustness gaps remain.

## Backlog Watch
- **[Issue #1195](https://github.com/netease-youdao/LobsterAI/issues/1195) (Apr 1, open, stale)** — Skill installation path bug. Two comments but no maintainer response visible. Users still affected.
- **[Issue #1273](https://github.com/netease-youdao/LobsterAI/issues/1273) (Apr 2, closed as stale)** — sql.js WASM crash and DB corruption risk. Closed without a confirmed fix — may warrant a follow-up verification, especially given the project's reliance on WASM storage.
- **[PR #2452](https://github.com/netease-youdao/LobsterAI/pull/2452) (open)** — Provider-prefix preservation fix for slashed model IDs. Needs review and merge promptly, as it directly resolves the most recent high-severity bug report.

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw Project Digest – 2026-08-08

## 1. Today's Overview

CoPaw/QwenPaw is showing a high-velocity development cycle with 31 issues and 47 PRs updated in the last 24 hours. The project has released `v2.1.0-beta.2` with critical fixes including fence-aware section extraction and checkpoint restoration. The community is highly engaged with multiple bug reports across Windows Desktop, Docker, and Linux platform, revealing that beta-testing activities have surfaced a substantial number of stability issues. A wide range of contributions — including 9 first-time-contributor PRs — indicates healthy community involvement alongside the core team. Overall, the project appears to be in an intense beta stabilization phase, with core functionality largely in place but edge cases and platform-specific regressions needing continuous fixes.

## 2. Releases

**v2.1.0-beta.2** (Released 2026-08-08)

- **fix(ci):** Fence-aware section extraction in real-behavior-proof (fixes #6626) by @hanson-hex in PR [#6653](https://github.com/agentscope-ai/QwenPaw/pull/6653)
- **fix(checkpoints):** Restore auto snapshots in web workspace bootstrap by @qbc2016 in PR [#6](https://github.com/agentscope-ai/QwenPaw/pull/6)

**Breaking changes:** None flagged.

**Migration notes:** Users upgrading from `2.0.1` should test Checkpoint auto-snapshot behavior and any workflows relying on behavior-proof extraction logic. Desktop users on Windows have reported NSIS installer file-lock issues when upgrading from b1 (see Issue [#6810](https://github.com/agentscope-ai/QwenPaw/issues/6810)), so a clean uninstall of b1 before b2 installation is recommended.

## 3. Project Progress

Merged/closed PRs (21 in last 24h) demonstrate meaningful advancement of core features and reliability:

- **Agent debugging infrastructure:** PR [#6653](https://github.com/agentscope-ai/QwenPaw/pull/6653) — fence-aware section extraction in real-behavior-proof.
- **Checkpointing reliability:** PR [#6](https://github.com/agentscope-ai/QwenPaw/pull/6) — auto snapshots restored in web workspace bootstrap.
- **Downloads UI refactoring:** PR [#4694](https://github.com/agentscope-ai/QwenPaw/pull/4694) — downloads page UI reworked and optimized (closed).
- **Shell command execution bugs fixed:** Issues [#6565](https://github.com/agentscope-ai/QwenPaw/issues/6565) (newline-to-space collapse breaking multi-line commands) and [#6480](https://github.com/agentscope-ai/QwenPaw/issues/6480) (nohup/detached process hanging) are marked closed.
- **Doom-loop repetition control** improved as captured by the closed Issue [#6116](https://github.com/agentscope-ai/QwenPaw/issues/6116).
- **Linux doom-loop / rubric gates** (Issue [#6773](https://github.com/agentscope-ai/QwenPaw/issues/6773)), **ToolCallBlock extra_content crash** (Issue [#6619](https://github.com/agentscope-ai/QwenPaw/issues/6619)), and **multi-session submission during task execution** (Issue [#6796](https://github.com/agentscope-ai/QwenPaw/issues/6796)) all closed — indicating substantial stability convergence.
- **Telegram ACL whitelist reset** (Issue [#6787](https://github.com/agentscope-ai/QwenPaw/issues/6787)) filed as duplicate and received a dedicated fix PR [#6788](https://github.com/agentscope-ai/QwenPaw/pull/6788).
- **GitHub account unbinding support** now provided via backend database cleanup for Issue [#6789](https://github.com/agentscope-ai/QwenPaw/issues/6789).

## 4. Community Hot Topics

- [#6116](https://github.com/agentscope-ai/QwenPaw/issues/6116) **[CLOSED] Doom loop — repeated tool call in single turn** (8 comments): Agent repeatedly executes same tool with same parameters (~6 repetitions before warning), wasting tokens/API calls. Now closed; behavior gates addressed. Community interest in loop-prevention heuristics is high. Related open Issue [#6768](https://github.com/agentscope-ai/QwenPaw/issues/6768) shows this is still not fully resolved for multi-step tasks.

- [#6782](https://github.com/agentscope-ai/QwenPaw/issues/6782) **[OPEN] Docker 2.0.1 — plugin/application market always says "maintenance"** (8 comments): Critical for Docker deployments. Affects core functionality for self-hosted users. No fix PR identified yet.

- [#6732](https://github.com/agentscope-ai/QwenPaw/issues/6732) **[OPEN] MCP tools regularly fail** (6 comments): "Undefined or not present" errors appear after hours; restarting container is the only mitigation. Middleware/tool-registry lifecycle issues suspected, and needed by heavy automation users.

- [#6772](https://github.com/agentscope-ai/QwenPaw/pull/6772) **[OPEN] ReMe configuration, embedding lifecycle, and Daily Paper enhancements** (PR with significant diff): Adds embedding model factory supporting OpenAI-compatible, DashScope, and DashScope-Mu… configurations, real connectivity validation, secure hot reloading, Daily Paper scheduled briefings, and Cron declaration patterns.

- **Windows desktop beta feedback cluster:** Issues [#6797](https://github.com/agentscope-ai/QwenPaw/issues/6797) (text selection/copy in desktop mode), [#6790](https://github.com/agentscope-ai/QwenPaw/issues/6790) (double-click instead of single-click to open app, and no exit key from desktop mode), and [#6810](https://github.com/agentscope-ai/QwenPaw/issues/6810) (installer file-lock errors) all hit beta users' daily UX — the maintainers responded with fix PRs [#6802](https://github.com/agentscope-ai/QwenPaw/pull/6802) and [#6801](https://github.com/agentscope-ai/QwenPaw/pull/6801).

- **Profile category regression:** Issue [#6785](https://github.com/agentscope-ai/QwenPaw/issues/6785) — Console UI Files page hard-codes official persona files, preventing custom persona `.md` toggles; user workaround unavailable. Fix PR [#6808](https://github.com/agentscope-ai/QwenPaw/pull/6808) submitted by first-time contributor.

## 5. Bugs & Stability

| Severity | Issue | Description | Fix Status |
|----------|-------|-------------|------------|
| Critical | [#6782](https://github.com/agentscope-ai/QwenPaw/issues/6782) | Docker plugin/app market always "maintenance", unusable | No fix PR |
| High | [#6732](https://github.com/agentscope-ai/QwenPaw/issues/6732) | MCP tools work for hours then fail until container restart | No fix PR |
| High | [#6780](https://github.com/agentscope-ai/QwenPaw/issues/6780) | Desktop v2.0.1 freezes/hangs after idling for tens of minutes | No fix PR |
| High | [#6810](https://github.com/agentscope-ai/QwenPaw/issues/6810) | Windows auto-update fails; NSIS installer errors due to locked files (browser extension NM host lock file) | Not yet, needs installer process-attribution fix |
| High | [#6768](https://github.com/agentscope-ai/QwenPaw/issues/6768) | Agent enters infinite loop after multi-step financial REST import; session blocked hours | No fix PR; partial relation to #6116 heuristics |
| High | [#6813](https://github.com/agentscope-ai/QwenPaw/issues/6813) | `KeyError: '__aiter__'` in chat auto-title generation (agentscope 2.x ChatResponse dict subclass incompatibility) | No fix PR |
| Medium | [#6811](https://github.com/agentscope-ai/QwenPaw/issues/6811) | OpenAI Responses continuation summary ignores `disable_thinking`, misreports 60-sec cancellation | No fix PR |
| Medium | [#6812](https://github.com/agentscope-ai/QwenPaw/issues/6812) | Google Gemini provider sends non-standard `$schema` field — "Model 'unknown' execution failed" | No fix PR |
| Medium | [#6803](https://github.com/agentscope-ai/QwenPaw/issues/6803) | OpenAI-compatible provider sends Responses-API `input_text` content types + raw stream fields — StepFun rejects 400 | Fix PR [#6809](https://github.com/agentscope-ai/QwenPaw/pull/6809) submitted |
| Medium | [#6785](https://github.com/agentscope-ai/QwenPaw/issues/6785) | Profile category hard-codes official personas — custom `.md` cannot toggle (v2.1.0b2 regression) | Fix PR [#6808](https://github.com/agentscope-ai/QwenPaw/pull/6808) |
| Medium | [#6786](https://github.com/agentscope-ai/QwenPaw/issues/6786) | Telegram ACL whitelist resets when multica starts a new task; approved users blocked | Fix PR [#6788](https://github.com/agentscope-ai/QwenPaw/pull/6788) |
| Medium | [#6794](https://github.com/agentscope-ai/QwenPaw/issues/6794) | Agent Kanban POST returns 405; 404 during hot reload | No fix PR |
| Medium | [#6792](https://github.com/agentscope-ai/QwenPaw/issues/6792) | Built-in ACP runner uses deprecated npm packages | No fix PR |
| Low | [#6775](https://github.com/agentscope-ai/QwenPaw/issues/6775) | MalwareBytes flags Desktop Windows as Trojan Loader (likely false positive, but no official response yet) | No response; user uninstalled |

## 6. Feature Requests & Roadmap Signals

- **Volcano Engine Agent Plan & Xiaomi MiMo built-in providers** (Issue [#6490](https://github.com/agentscope-ai/QwenPaw/issues/6490)) — Multi-provider momentum is strong; likely candidates for next minor release.
- **Configurable Chrome tab lifetime** (Issue [#6770](https://github.com/agentscope-ai/QwenPaw/issues/6770)) — User controls tab lifetime across response cycles; aligns with browser-automation power users; may enter next release given the issue verification process applied.
- **Aliyun token plan model list update** (Issue [#6285](https://github.com/agentscope-ai/QwenPaw/issues/6285)) — Adding `qwen3.8-max-preview` to built-in selection list; expected in patch release.
- **Email management assistant (mailbox)</strong> — PR [#6800](https://github.com/agentscope-ai/QwenPaw/pull/6800) adds intelligent email triage with multi-provider support; if merged, likely becomes headline feature in 2.2.
- **WeChat Chinese approval replies** (PR [#6804](https://github.com/agentscope-ai/QwenPaw/pull/6804)) — Chinese channel users can reply 允许/拒绝; a targeted user-experience improvement.
- **Memory enhancements** (PR [#6772](https://github.com/agentscope-ai/QwenPaw/pull/6772)) — Embedding lifecycle, real connectivity validation, hot-reload, and Daily Paper Cron integration — signals continued investment in the ReMe (memory) subsystem.

## 7. User Feedback Summary

- **Docker deployment reliability is a major concern:** Two high-traffic issues ([#6782](https://github.com/agentscope-ai/QwenPaw/issues/6782), [#6732](https://github.com/agentscope-ai/QwenPaw/issues/6732)) show Docker users unable to use plugin/application markets and MCP tools, greatly undermining self-hosted convenience.
- **Beta-tester UX feedback is constructive:** Desktop-mode users request single-click to launch apps, text selection/copy within conversation windows, and a way to exit desktop mode ([#6797](https://github.com/agentscope-ai/QwenPaw/issues/6797), [#6790](https://github.com/agentscope-ai/QwenPaw/issues/6790)); multiple PRs now target exactly these.
- **Unhandled long-running/hanging processes:** Users report that agents get stuck on `nohup` commands ([#6480](https://github.com/agentscope-ai/QwenPaw/issues/6480), closed) and multi-step tasks enter hours-long freezes ([#6768](https://github.com/agentscope-ai/QwenPaw/issues/6768)); this remains a trust-sensitive area.
- **Confidence dips on proprietary platform issues:** MalwareBytes trojan detection ([#6775](https://github.com/agentscope-ai/QwenPaw/issues/6775)) prompted immediate uninstall — a security-response communication gap.
- **Custom persona `.md` regression frustrated advanced users:** Profile category blind-list behavior ([#6785](https://github.com/agentscope-ai/QwenPaw/issues/6785)) regressed existing workflows and was met with quick contributor fixes.
- **GitHub-binding deadlock:** Issue [#6789](https://github.com/agentscope-ai/QwenPaw/issues/6789) highlights lack of self-service unbind — users expect account control features without maintainer intervention.

## 8. Backlog Watch

- **Issue [#6612](https://github.com/agentscope-ai/QwenPaw/issues/6612) / PR [#6615](https://github.com/agentscope-ai/QwenPaw/pull/6615) [Under Review]:** Corrupted agent config / invalid JSON handling — PR opened 2026-07-31, still under review; low risk, high config-robustness value.
- **Issue [#6555](https://github.com/agentscope-ai/QwenPaw/issues/6555) / PR [#6564](https://github.com/agentscope-ai/QwenPaw/pull/6564) [Under Review]:** Flush pending turns before memory compression — open since July 30; core memory consistency gap that could affect long-session users daily.
- **PR [#6617](https://github.com/agentscope-ai/QwenPaw/pull/6617) [Under Review]:** Honor Retry-After cap on streaming retry path — waiting since July 31; rate-limit and cost containment matter for provider-heavy deployments.
- **PR [#6623](https://github.com/agentscope-ai/QwenPaw/pull/6623) [Under Review, first-time contributor]:** Prevent final text loss when ACP notifications race prompt responses (fixes [#6625](https://github.com/agentscope-ai/QwenPaw/issues/6625)); under review since Aug 1.
- **Issue [#6683](https://github.com/agentscope-ai/QwenPaw/issues/6683) / PR [#6688](https://github.com/agentscope-ai/QwenPaw/pull/6688) [Open, first-time contributor]:** Plugin bare-absolute-import isolation — fixes `qwenpaw-creator` installation failure; open since Aug 4.
- **PR [#6725](https://github.com/agentscope-ai/QwenPaw/pull/6725) [Open, first-time contributor]:** Report fork finalization failures in background tasks — silent partial failures are a correctness risk; open since Aug 5.
- **PR [#6715](https://github.com/agentscope-ai/QwenPaw/pull/6715) [Under Review]:** OneBot remote inbound voice/image media — only local file references currently handled; waiting since Aug 5.
- **Issue [#6786](https://github.com/agentscope-ai/QwenPaw/issues/6786) → PR [#6788](https://github.com/agentscope-ai/QwenPaw/pull/6788) [Open]:** ACL store shared root profile workspace fix — opened Aug 7, needs merge to resolve Telegram multica task-regression.
- **Issue [#6813](https://github.com/agentscope-ai/QwenPaw/issues/6813) [Open, created Aug 8]:** Auto-title generation failure on agentscope 2.x — brand new, blocking chat UX for that framework version; maintainer attention recommended.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

No activity in the last 24 hours.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar).*