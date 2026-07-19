# OpenClaw Ecosystem Digest 2026-07-19

> Issues: 368 | PRs: 500 | Projects covered: 13 | Generated: 2026-07-19 03:29 UTC

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

# OpenClaw Project Digest — 2026-07-19

## 1. Today’s Overview
Project activity remains extremely high, with **368 issues** and **500 pull requests** updated in the last 24 hours. Of those, **144 issues were closed** and **219 PRs were merged or closed**, reflecting sustained forward momentum. A new beta release (`v2026.7.2-beta.3`) landed, introducing remote coding sessions and native automation improvements. However, several **P0/P1 regressions** have surfaced in the latest builds, notably a SQLite migration ordering bug that blocks gateway startup and a `codex app-server` turn interruption issue. Overall, the project is shipping fast but experiencing predictable friction from its rapid iteration velocity.

## 2. Releases
- **v2026.7.2-beta.3** — released 2026-07-18/19
  - **Highlights:** Remote coding sessions (Control UI on cloud workers, terminal-based session resume for Codex, Claude, OpenCode, Pi). Native automation and nodes infrastructure.
  - **Breaking changes:** None explicitly mentioned in the changelog snippet.
  - **Migration notes:** Users upgrading from `2026.7.2-beta.1` or `-beta.2` should run `openclaw doctor --fix` to address a state migration ordering defect (see Bug #109867). The beta.2 migration creates an index before its column, which blocks gateway startup; beta.3 includes a fix for that.

## 3. Project Progress
The 24‑hour window closed a wide range of bugs and prepared new infrastructure. Key merged/closed items from the top‑50 issues list include:

- **#101763** *(closed)* — Hosted Molty model selector now correctly sends `claude-opus-4-8` instead of `claude-opus-4.8`.
- **#83184** *(closed)* — Heartbeat‑driven agent replies no longer leave `pendingFinalDelivery` fields stuck, unblocking subsequent heartbeats.
- **#86827** *(closed)* — Group chat sessions in `failed` state now properly discard that state and accept new messages.
- **#109657** *(closed)* — Durable channel‑ingress drain adopted for remaining channels.
- **#88548**, **#91592**, **#79308**, **#85822**, **#65656**, etc. — All closed, addressing issues ranging from model discovery shadowing to wrong chat_id routing.

Among open PRs, several have `proof: sufficient` or `ready for maintainer look` labels, suggesting near‑merge candidates:

- **#111155** — Fixes background image generation losing session OAuth.
- **#111126** — Agent gateway run now exits nonzero on incomplete runs.
- **#111167** — Portable SQLite migration for `managed_outgoing_image_records`.
- **#111168** — Treats invalid legacy session stubs as warnings during SQLite import.

## 4. Community Hot Topics
The most actively discussed issues reveal a community focused on **performance, security, and platform parity**:

| Issue | Comments | Summary |
|-------|----------|---------|
| [#91009](https://github.com/openclaw/openclaw/issues/91009) 🦞 diamond lobster | 14 | Codex `PreToolUse` native hook relay spawns CPU‑bound hooks processes, stalling gateway RPC. Users report 100%+ CPU per process. Needs maintainer and product decisions. |
| [#10659](https://github.com/openclaw/openclaw/issues/10659) 🦞 diamond lobster | 13 | Feature request: Masked Secrets – prevent agents from reading raw API keys. Strong demand for protection against prompt injection and accidental leaks. |
| [#79077](https://github.com/openclaw/openclaw/issues/79077) 🐚 platinum hermit | 11 | Request for Telegram guest‑bot and bot‑to‑bot modes following Telegram’s May 2026 platform update. 8 👍 indicates broad user interest. |
| [#96975](https://github.com/openclaw/openclaw/issues/96975) 🦐 gold shrimp | 10 | Subagent completion injects too much child content into parent context; users want a minimal status-only return. |
| [#109490](https://github.com/openclaw/openclaw/issues/109490) 🦞 diamond lobster | 9 | codex app-server turn interrupted after client‑delegated message tool result (`terminate:true`) – promised work never executes. A critical P1. |

*Note: PRs generally lack comment counts; conversation mostly happens on issues.*

## 5. Bugs & Stability
Several **P0 release‑blocker** regressions were reported in the last 24 hours:

- **#109867** (P0, 🦞 diamond lobster) — `openclaw state migration` in `2026.7.2-beta.2` creates an index before the column, blocking gateway startup. A fix PR (#111167) is already open and ready for maintainer.
- **#108435** (P0, 🦪 silver shellfish) — Gateway fails to start after upgrade to 2026.7.1 (`Error: gateway did not start`). Still needs live reproduction.
- **#109490** (P1, 🦞 diamond lobster) — turn interruption in codex app-server after dynamic tool returns `terminate: true`. No fix PR identified yet.
- **#110763** (P1, 🐚 platinum hermit, *beta release blocker*) — Minimax API key missing from header after upgrade to 2026.7.2-beta.2. User reports regression.
- **#99263** (P1, 🐚 platinum hermit) — Node 26 crash due to `ERR_INVALID_STATE` on FileHandle garbage collection; affects image media inbound.

**Other notable stability issues:**
- **#91009** – CPU‑bound hooks (P1)
- **#89147** – Native hook relay starves mid‑turn (P2)
- **#94220** – Session‑medic auto‑heal causes livelock (P2)
- **#99910** – Memory dreaming run pegs event loop for ~10 minutes (P1)

Most fixes are in early review stage; only **#109867** has a ready PR.

## 6. Feature Requests & Roadmap Signals
The community is pushing for deeper configuration, security, and automation:

- **#10687** – Fully dynamic model discovery (OpenRouter). Already has 9 comments, P2. Likely candidate for next minor release.
- **#7722** – Filesystem sandboxing via `tools.fileAccess` config. 9 comments, 4 👍. Aligns with security concerns.
- **#12219** – Skill Permission Manifest Standard (`skill.yaml`). Growing interest in skill trust management.
- **#110950** – “Everything is a cron” proposal to unify heartbeat, watchers, and scheduled automation. Opened yesterday, already 5 comments.
- **#99583** – Intelligent session auto‑titling using LLM slug generator. P3, but shows UX demand.
- **#10659** (Masked Secrets) and **#88032** (Telegram quote/reply as first‑class durable contract) are also heavily requested.

Predictions for v2026.7.3 or July stable: dynamic model discovery (#10687) and Masked Secrets (#10659) have high maintainer attention and product decision requests. The “cron unification” (#110950) is too new.

## 7. User Feedback Summary
**Satisfaction:** Users appreciate the fast pace but are frustrated by regressions in beta releases. The remote coding sessions feature is well‑received, but the beta.2 migration bug blocked many from using it.

**Pain points:**
- Duplicate Telegram messages (#96242) – persists across several versions.
- Subagent context bloat (#96975) – hampers heavy workflows.
- Gateway crashes on Node 26 (#99263) – affects users on latest Node.
- Model selector not persisting (#101763) – already fixed.
- Model fallback not triggered on context length exceeded (#9986) – a long‑standing request.

**Use cases emerging:**
- Multi‑agent deployments with memory dreaming and session‑medic (#94220).
- Telegram group and guest‑bot scenarios (#79077, #88032).
- Security‑conscious users wanting secrets masking (#10659) and filesystem sandboxing (#7722).

## 8. Backlog Watch
Several high‑impact issues have been open for months without a fix PR or maintainer decision:

| Issue | Created | Rating | Status |
|-------|---------|--------|--------|
| [#7722](https://github.com/openclaw/openclaw/issues/7722) – Filesystem sandboxing | 2026-02-03 | 🦞 diamond lobster | Needs maintainer review + product decision |
| [#8299](https://github.com/openclaw/openclaw/issues/8299) – Suppress sub‑agent announce | 2026-02-03 | 🦞 diamond lobster | Needs product decision |
| [#10659](https://github.com/openclaw/openclaw/issues/10659) – Masked Secrets | 2026-02-06 | 🦞 diamond lobster | Needs security review + product decision |
| [#79077](https://github.com/openclaw/openclaw/issues/79077) – Telegram bot‑to‑bot | 2026-05-07 | 🐚 platinum hermit | Stale; needs live repro + product decision |
| [#9986](https://github.com/openclaw/openclaw/issues/9986) – Model fallback on context length | 2026-02-05 | 🦞 diamond lobster | Needs maintainer review + product decision |

These issues represent significant community demand but lack clear resolution paths. The **needs‑product‑decision** tag appears on many, suggesting the team is bottlenecked on prioritization rather than implementation.

*Project health indicator: High throughput, high engagement, but moderate risk from unresolved regressions and a growing backlog of popular feature requests.*

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report: Personal AI Agent Open-Source Ecosystem
**Date: 2026-07-19**

---

## 1. Ecosystem Overview

The personal AI assistant / agent open-source ecosystem is characterized by rapid iteration, high community engagement, and a shared focus on multi-channel integration, memory management, and agent orchestration. Projects like OpenClaw, NanoBot, Zeroclaw, and IronClaw are shipping new features daily, while smaller projects (TinyClaw, ZeptoClaw, EasyClaw) show no recent activity, indicating a consolidation trend. Common pain points include context window management, prompt caching for local models, and security around credential storage. The ecosystem is maturing from toy demos towards production‑grade personal agents, with many projects targeting self‑hosted deployment on low‑power hardware.

---

## 2. Activity Comparison (Last 24 Hours)

| Project | Issues Updated | PRs Updated | Release Status | Health Score* |
|---------|---------------|-------------|----------------|---------------|
| OpenClaw | 368 | 500 | `v2026.7.2-beta.3` (yesterday) | ⭐⭐⭐⭐ (high throughput, some regressions) |
| NanoBot | 7 | 30 | None | ⭐⭐⭐⭐ (responsive maintainers, good merge velocity) |
| Zeroclaw | 50 | 50 | None | ⭐⭐⭐⭐ (sustained activity, many feature PRs) |
| PicoClaw | 4 | 12 | None | ⭐⭐⭐ (steady improvements, two new critical bugs) |
| NanoClaw | 18 | 36 | None | ⭐⭐⭐⭐ (high merge rate, backlog cleanup) |
| NullClaw | 1 | 0 | `v2026.4.17` (3 months stale) | ⭐ (stagnant, unresolved Android build bug) |
| IronClaw | 6 | 50 | None | ⭐⭐⭐⭐⭐ (exceptional PR velocity, deep refactor) |
| LobsterAI | 6 | 3 | `2026.7.17` (2 days ago) | ⭐⭐⭐ (stable, low engagement, stale bugs) |
| TinyClaw | 0 | 0 | N/A | Inactive |
| Moltis | 1 | 3 | None | ⭐⭐ (low activity, single feature request stagnant) |
| CoPaw | 11 | 7 | None (latest `v2.0.0.post3` July 17) | ⭐⭐⭐ (moderate community bug reports, timely fix PRs) |
| ZeptoClaw | 0 | 0 | N/A | Inactive |
| EasyClaw | 0 | 0 | N/A | Inactive |

*Health Score: qualitative assessment based on activity volume, responsiveness to bugs, release frequency, and community engagement.

---

## 3. OpenClaw’s Position

OpenClaw remains the **most active and feature‑rich** project in the ecosystem, with 368 issues and 500 PRs updated in 24 hours — an order of magnitude above the second‑most active project (IronClaw at 50 PRs). Key advantages:

- **Rapid release cadence:** Beta releases every few days, with remote coding sessions and native automation shipping in v2026.7.2-beta.3.
- **Community scale:** Diamond‑tagged issues (highest severity) attract 9–14 comments, indicating a large, engaged user base.
- **Technical approach:** Reference implementation with the broadest platform support (Codex, Claude, OpenCode, Pi) and a robust SQLite‑based state migration system.
- **Peer comparison:** OpenClaw’s 368 issues and 500 PRs dwarf NanoBot (7 issues, 30 PRs) and Zeroclaw (50 issues, 50 PRs), reflecting both a larger community and a higher tolerance for rapid‑iteration regressions. IronClaw matches OpenClaw in PR volume (50) but with 6 issues — suggesting a more controlled, refactor‑focused development style.

**Weaknesses:** P0/P1 regressions in beta releases (e.g., SQLite migration ordering bug #109867) frustrate early adopters. The growing backlog of “needs‑product‑decision” features (e.g., masked secrets, filesystem sandboxing) indicates prioritization bottlenecks.

---

## 4. Shared Technical Focus Areas

The following requirements appear across multiple projects, signalling ecosystem‑wide priorities:

| Requirement | Projects Involved | Specific Needs |
|-------------|------------------|----------------|
| **Prompt caching / prefix stability** | NanoBot (#4867), OpenClaw (#9986) | Models (Ollama, Claude) lose context caching per turn; need stable prompt prefixes to reduce latency. |
| **Masked secrets / credential security** | OpenClaw (#10659), IronClaw (#6247), Zeroclaw (#9127) | Prevent agents from reading raw API keys; store tokens encrypted at rest. |
| **Multi‑model / per‑topic routing** | OpenClaw (#10687), Moltis (#574), Zeroclaw (#8600) | Route conversations to different LLMs based on topic or cost/quality requirements. |
| **Memory isolation / project scoping** | CoPaw (#6244), OpenClaw (#109490), NanoBot (#4940) | Separate memory contexts per workspace or project to avoid interference. |
| **Telegram / WhatsApp channel maturity** | OpenClaw (#79077), NanoClaw (#3085), Zeroclaw (#8505), PicoClaw (#3242) | Reliable message delivery, typing indicators, bot‑to‑bot modes, and mention handling. |
| **Edge / low‑power deployment** | PicoClaw (#3205), NullClaw (#868), OpenClaw (Termux) | Support for ARM64, Raspberry Pi, Android (Termux) builds. |

---

## 5. Differentiation Analysis

| Dimension | OpenClaw | NanoBot | Zeroclaw | IronClaw | Others |
|-----------|----------|---------|----------|----------|--------|
| **Target user** | Power users & developers; early adopters who tolerate betas | Self‑hosters; users of Ollama/local models | Channel‑agnostic configurers; multi‑platform deployers | Enterprise / production; architecture refactors | PicoClaw: lightweight RPi users; CoPaw: Chinese‑language / Alibaba ecosystem |
| **Core architecture** | Monolithic reference; SQLite‑driven state machine | Python/TypeScript; agent‑loop with GitStore memory | Rust/Nim?; emphasis on channel parity and WASM plugins | Rust; “Reborn” simplification of capability runtime | Moltis: Rust, Zvec experimental memory; LobsterAI: Java/IM‑focused |
| **Release philosophy** | Ship fast, fix later (beta regressions expected) | Conservative; PR‑driven, infrequent releases | Balanced; many open PRs, few releases | Heavy refactoring before next release (v0.29.1 delayed) | LobsterAI: stable quarterly releases |
| **Community support** | Largest; diamond‑tag issues get quick maintainer attention | Responsive to bugs (fix PRs within hours) | Active but some stale RFCs | Strong core team; community contributions via localization and bug reports | CoPaw: swift fix PRs for reported bugs |
| **Differentiating features** | Remote coding sessions, native hooks infrastructure | Prompt caching, eager memory consolidation, Render one‑click deploy | Slack thread hydration, OCI WASM plugins, Telegram multi‑message | Reborn architecture, capability state‑machine tests, OAuth preflight | PicoClaw: agent collaboration bus; Moltis: ACP‑only chat support |

---

## 6. Community Momentum & Maturity

**Tier 1 – Rapidly iterating, high engagement:**
- **OpenClaw, IronClaw, NanoBot, Zeroclaw, NanoClaw** — All have high PR/issue counts, responsive maintainers, and active bug‑fixing. OpenClaw and IronClaw lead in volume; NanoBot and Zeroclaw show healthy feature completion.
- **PicoClaw, CoPaw** — Moderate activity; steady feature merges with occasional critical bugs. CoPaw is particularly responsive (fix PRs submitted same day as bug reports).

**Tier 2 – Stabilizing, lower velocity:**
- **LobsterAI, Moltis** — Low issue/PR counts, few releases. LobsterAI has a recent stable release and is cleaning stale issues. Moltis is in a quiet phase with experimental features.

**Tier 3 – Stagnant / inactive:**
- **NullClaw** — Single open bug (Android build failure) unresolved for 3 months; no maintainer engagement. Community is troubleshooting without official support.
- **TinyClaw, ZeptoClaw, EasyClaw** — Zero activity. These projects may be abandoned or in hibernation.

**Key observations:**
- The gap between active and inactive projects is widening — developers and users concentrate on the top 5–6 projects.
- IronClaw’s high PR merge rate (35 in 24h) suggests a team preparing for a major release (v0.29.1) after completing the “Reborn” architectural overhaul.
- OpenClaw’s beta regressions are a double‑edged sword: they attract contributors but risk user trust if critical bugs linger.

---

## 7. Trend Signals

From community feedback across projects, the following industry trends are evident:

1. **Local model optimization is critical:** Users with Ollama / 32 GB VRAM report 60s extra per turn due to prompt prefix instability (NanoBot #4867). The ecosystem must prioritise KV‑cache alignment for local inference.

2. **Security is becoming a deal‑breaker:** Credential leakage (IronClaw #6247) and agent‑readable API keys (OpenClaw #10659) are top‑voted issues. Expect encryption‑at‑rest and sandboxing to become baseline features in the next 6 months.

3. **Multi‑agent orchestration is maturing:** PicoClaw’s agent collaboration bus (#2937), OpenClaw’s native hooks, and NanoBot’s aggregated subagent mode (#4624) point to a shift from single‑agent chatbots to multi‑agent teams.

4. **Channel integration is table‑stakes:** Telegram, WhatsApp, Slack, and GitHub are now expected to work reliably. Projects that fail to maintain these (Zeroclaw’s Telegram config bug #8505, NanoClaw’s WhatsApp mention bug #3085) lose users quickly.

5. **Configuration complexity frustrates users:** Multiple projects (Zeroclaw #5862, CoPaw #6250) report that agents are unaware of their own capabilities (e.g., cron scheduling) or require non‑intuitive config changes. “Self‑documenting” configuration and natural‑language setup are emerging UX demands.

6. **Cross‑platform builds are underinvested:** NullClaw’s Android build failure (#868) and PicoClaw’s ARMv7 support request (#3205) highlight a gap. As agents move to edge devices, build toolchain support (Zig, Podman, cross‑compilation) becomes a competitive advantage.

**Value for AI agent developers:** Prioritise prompt caching, credential security, and workspace‑scoped memory. Invest in channel reliability over new experimental features. Consider offering one‑click deploy options (Render, Docker) to reduce configuration friction.

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot Project Digest — 2026-07-19

## Today's Overview

The project saw **high pull request activity** (30 PRs updated, 16 merged/closed) and **moderate issue activity** (7 issues updated, 4 closed). No new releases were published today, but the focus was clearly on **bug fixes, stability hardening, and regression corrections** across multiple subsystems: agent loop, session management, GitStore, CLI apps, and channel integrations. Several long-running feature branches (memory consolidation, subagent aggregation, trigger tools) were merged, signalling progress toward a more mature memory and agent management foundation. Community engagement remained strong, with detailed bug reports and follow-up fix PRs arriving within hours.

## Releases

No new releases were published on 2026-07-19.

## Project Progress

Sixteen PRs were merged or closed in the last 24 hours. Key developments:

- **Agent resilience**: PR [#4925](https://github.com/HKUDS/nanobot/pull/4925) (`fix(agent): guide recovery from oversized tool results`) prevents model request failures when tool output exceeds the remaining context window. The agent now replaces oversized results with a bounded instruction, allowing the model to retry with narrower scope.
- **Memory & consolidation**: Four PRs from `yu-xin-c` were merged (all closed on 2026-07-18):
  - [#4627](https://github.com/HKUDS/nanobot/pull/4627) preserves delivery context during memory consolidation.
  - [#4626](https://github.com/HKUDS/nanobot/pull/4626) adds opt-in eager consolidation for archiving conversation slices automatically.
  - [#4624](https://github.com/HKUDS/nanobot/pull/4624) introduces an `aggregated` result mode for subagents, buffering results until a session task set drains.
  - [#4621](https://github.com/HKUDS/nanobot/pull/4621) gates archived facts with provenance context (MEMORY.md excerpts).
- **Deployment**: PR [#4937](https://github.com/HKUDS/nanobot/pull/4937) (`feat: add one-click deploy to render support`) provides a Render blueprint for instant cloud deployment.
- **Config atomicity**: PR [#4984](https://github.com/HKUDS/nanobot/pull/4984) (open, fix) writes `config.json` atomically via temp+replace to prevent data loss on crash.
- **Trigger & cron robustness**: PRs [#4986](https://github.com/HKUDS/nanobot/pull/4986), [#4985](https://github.com/HKUDS/nanobot/pull/4985), [#4983](https://github.com/HKUDS/nanobot/pull/4983) (all open) coerce null/string millisecond fields in trigger and cron stores, preventing store quarantine.

## Community Hot Topics

The most active issues and PRs by comment count:

- **[#2343](https://github.com/HKUDS/nanobot/issues/2343) (CLOSED)** – “bug: run_agent_loop no check contextWindowTokens”  
  *15 comments*. User reported a 400 error due to exceeding the model’s context length despite setting `contextWindowTokens`. The discussion explored how to reduce chat history before sending requests. The underlying need is for **automatic context window management** that respects both user config and provider limits without manual intervention.

- **[#4867](https://github.com/HKUDS/nanobot/issues/4867) (CLOSED)** – “Preserve exact prompt prefix to enable caching in Ollama and others”  
  *5 comments*. User reported that Nanobot adds ~60 seconds per turn with Ollama/32 GB VRAM because the prompt prefix changes each turn, defeating prompt caching. The core demand is **prompt prefix stability** to leverage model-level KV-caching for drastically reduced latency.

- **[#4940](https://github.com/HKUDS/nanobot/issues/4940) (OPEN)** – “read_session_metadata() lacks legacy filename fallback”  
  *1 comment* but opened 4 days ago and still unresolved. Sessions created with legacy filenames lose their `workspace_scope` metadata after a restart. This is a **data integrity** concern for users who upgraded from older Nanobot versions.

## Bugs & Stability

| Bug | Severity | Status | Fix PR |
|-----|----------|--------|--------|
| `GitStore` fails when workspace ≠ CWD (relative paths) | **High** – breaks git-backed memory for non‑default workspaces | Open [#4980](https://github.com/HKUDS/nanobot/issues/4980) | [#4979](https://github.com/HKUDS/nanobot/pull/4979) (open) |
| CLI apps lose UTF-8 output on Windows CP936/GBK locales | **High** – causes `UnicodeDecodeError` and process crashes on non‑UTF‑8 Windows | Open [#4975](https://github.com/HKUDS/nanobot/issues/4975) | [#4976](https://github.com/HKUDS/nanobot/pull/4976) (open) |
| Legacy session metadata lost after restart | **Medium** – silent data loss for workspace-scoped sessions | Open [#4940](https://github.com/HKUDS/nanobot/issues/4940) | [#4977](https://github.com/HKUDS/nanobot/pull/4977) (open) |
| Trigger/cron stores crash on JSON `null` ms fields | **Medium** – quarantines the entire store | Open (multiple issues) | [#4986](https://github.com/HKUDS/nanobot/pull/4986), [#4985](https://github.com/HKUDS/nanobot/pull/4985), [#4983](https://github.com/HKUDS/nanobot/pull/4983) (all open) |
| Feishu/Telegram channel hangs on zero/negative chunk limits | **Medium** – infinite loop on malformed config | Open [#4982](https://github.com/HKUDS/nanobot/pull/4982), [#4981](https://github.com/HKUDS/nanobot/pull/4981) (open) | Fixes included in PRs |
| Session manager cache grows unbounded (no eviction) | **Low** – memory leak in long-running gateways | Closed [#4786](https://github.com/HKUDS/nanobot/issues/4786) | Not yet addressed |
| Docker Compose disables container confinement (SYS_ADMIN + no AppArmor/seccomp) | **Low** (security) – increased attack surface | Closed [#4886](https://github.com/HKUDS/nanobot/issues/4886) | No fix PR (configuration change recommended) |

All high-severity bugs have open fix PRs, which indicates a responsive maintainer team.

## Feature Requests & Roadmap Signals

Several user-requested features moved forward or remain under discussion:

- **Prompt caching for Ollama** ([#4867](https://github.com/HKUDS/nanobot/issues/4867)) – Closed as an enhancement request; likely to be implemented in a future release given the clear performance impact.
- **Session-local triggers** ([#4942](https://github.com/HKUDS/nanobot/pull/4942)) – Open PR that lets agents manage per-conversation triggers. This aligns with growing demand for agent autonomy.
- **Eager memory consolidation** ([#4626](https://github.com/HKUDS/nanobot/pull/4626)) – Merged, disabled by default. Anticipated to become default after more testing (related to [#2604](https://github.com/HKUDS/nanobot/issues/2604)).
- **Aggregated subagent mode** ([#4624](https://github.com/HKUDS/nanobot/pull/4624)) – Merged, gives users control over how subagent results are presented (realtime vs. aggregated).
- **WebUI polish** ([#4963](https://github.com/HKUDS/nanobot/pull/4963)) – Open PR replacing raw tool logs with unified activity language. Signals a UX push.
- **One-click deploy to Render** ([#4937](https://github.com/HKUDS/nanobot/pull/4937)) – Merged; reduces deployment friction for self-hosting.

Predictions for the next minor release: **prompt prefix stability** (caching), **local triggers** as a new agent skill, and **default eager consolidation** after stabilisation.

## User Feedback Summary

- **Context length frustration** – User in [#2343](https://github.com/HKUDS/nanobot/issues/2343) struggled to reduce chat history payloads; the fix (PR [#4956](https://github.com/HKUDS/nanobot/pull/4956), open) enforces a 2,000-message cap at the persistence boundary and binds archival, addressing this directly.
- **Ollama latency** – User in [#4867](https://github.com/HKUDS/nanobot/issues/4867) found the extra 60s per turn “totally unusable” with 32 GB VRAM. This is a high-pain point for local model users and likely driving demand for prompt caching.
- **Data loss after upgrade** – [#4940](https://github.com/HKUDS/nanobot/issues/4940) shows a workflow-breaking regression for users with legacy session filenames; workspace-scoped project paths are lost on restart.
- **Windows Unicode** – [#4975](https://github.com/HKUDS/nanobot/issues/4975) highlights cross‑platform pain for Chinese‑locale users; the fix is straightforward (explicit UTF-8 encoding).
- **Workspace flexibility** – [#4980](https://github.com/HKUDS/nanobot/issues/4980) notes that GitStore assumes the working directory equals the workspace, which is a frequent misconfiguration.

Overall satisfaction appears high for core features (memory, subagents) but dampened by stability regressions and configuration friction.

## Backlog Watch

The following open items may require maintainer attention due to age, importance, or lack of movement:

- **[PR #4854](https://github.com/HKUDS/nanobot/pull/4854) (OPEN, since 2026-07-08)** – `feat(exec): add RTK command rewriter`. Marked as conflict; has not been updated in 11 days despite being a priority p2 feature.
- **[PR #4942](https://github.com/HKUDS/nanobot/pull/4942) (OPEN, since 2026-07-15)** – Session-local triggers. Requires review and merge; touches core agent-trigger interaction.
- **[PR #4963](https://github.com/HKUDS/nanobot/pull/4963) (OPEN, since 2026-07-17)** – WebUI polish. Significant UX change that would benefit from community testing.
- **[Issue #4940](https://github.com/HKUDS/nanobot/issues/4940) (OPEN, since 2026-07-15)** – Legacy session metadata loss. A fix PR ([#4977](https://github.com/HKUDS/nanobot/pull/4977)) exists but has not been merged; urgency is medium but impacts users who started with older file naming.
- **[Issue #4980](https://github.com/HKUDS/nanobot/issues/4980) (OPEN, since 2026-07-18)** – GitStore relative path bug. A fix PR ([#4979](https://github.com/HKUDS/nanobot/pull/4979)) was opened the same day; timely merging would prevent further reports.

No long-unanswered issues older than a few days were identified in today’s data, indicating the team is keeping up with incoming work.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

## Zeroclaw Project Digest – 2026-07-19

*Generated from GitHub data of [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)*

---

### 1. Today’s Overview

The project remains highly active with **50 issues** and **50 PRs** updated in the last 24 hours. Of the issues, **39 are open/active** and **11 were closed**; on the PR side, **47 are open** and **3 were merged/closed**. No new releases were cut, but the sheer volume of updates signals sustained development across configuration, security, provider support, and channel integrations. The community is particularly engaged in refining Discord, Telegram, and Slack channels, while core RFCs around air‑gapped execution, workspace‑relative forbidden paths, and hardware key management continue to progress.

### 2. Releases

None. No new versions were published in the last 24 hours.

### 3. Project Progress

Three pull requests were merged or closed during the period. While the exact PRs are not listed in the top 20, the merged/closed count suggests steady feature completion. Notable recent completions visible from the issue tracker include:

- **GitHub native channel (restored)** – [#2079](https://github.com/zeroclaw-labs/zeroclaw/issues/2079) (closed)  
- **Discord channel `allowed_channels` config** – [#6378](https://github.com/zeroclaw-labs/zeroclaw/issues/6378) (closed)  
- **Persist cached input tokens in cost accounting** – [#7248](https://github.com/zeroclaw-labs/zeroclaw/issues/7248) (closed)  
- **SMTP email channel for scheduled tasks** – [#5573](https://github.com/zeroclaw-labs/zeroclaw/issues/5573) (closed)

These represent real user‑facing improvements: restoring GitHub as a first‑class channel, restricting Discord bot scope, and enabling email delivery of cron results.

### 4. Community Hot Topics

The most active discussions revolve around config complexity, channel functionality, and security hardening:

- **[[Bug]: zeroclaw does not know it can add cron** [#5862](https://github.com/zeroclaw-labs/zeroclaw/issues/5862) – 14 comments, closed  
  *Pain point:* Agent unaware of its own cron capabilities; users expect natural‑language scheduling.

- **RFC: Supply chain signing – hardware PGP, hermetic builds, and SLSA provenance** [#8177](https://github.com/zeroclaw-labs/zeroclaw/issues/8177) – 12 comments, closed as wontfix  
  *Underlying need:* Stronger artifact integrity, but maintainers decided against the proposed approach.

- **[[Feature]: Restore GitHub as a native channel** [#2079](https://github.com/zeroclaw-labs/zeroclaw/issues/2079) – 9 comments, closed  
  *User desire:* Avoid custom glue; want a consistent channel interface for repo events.

- **[[Feature]: Discord Bot respond only in specific Discord channels** [#6378](https://github.com/zeroclaw-labs/zeroclaw/issues/6378) – 8 comments, closed  
  *Use case:* Multi‑channel servers need fine‑grained bot scope control.

- **[[Feature]: Slack: hydrate thread context from conversations.replies** [#6055](https://github.com/zeroclaw-labs/zeroclaw/issues/6055) – 7 comments, open / in‑progress  
  *Request:* Backfill prior thread history on first mention to avoid disjointed conversations.

- **RFC: Workspace‑relative forbidden path patterns** [#8424](https://github.com/zeroclaw-labs/zeroclaw/issues/8424) – 7 comments, open / blocked  
  *Need:* Protect sensitive workspace‑internal files (`.env`, `config.yaml`) from agent access.

- **RFC: Abstract a `KeySource` trait** [#9127](https://github.com/zeroclaw-labs/zeroclaw/issues/9127) – 6 comments, open  
  *Architecture:* Unify master‑key material across deployment forms (env, file, TPM).

### 5. Bugs & Stability

Several high‑severity bugs were updated, with fix PRs available for some:

| Issue | Severity | Status | Fix PR |
|-------|----------|--------|--------|
| [#6672](https://github.com/zeroclaw-labs/zeroclaw/issues/6672) – `reasoning_content` not passed back in tool‑call loops with Xiaomi thinking models | **S0** – data loss / security risk | Closed | Likely fixed |
| [#6558](https://github.com/zeroclaw-labs/zeroclaw/issues/6558) – Provider errors (405 Method Not Allowed) with Qwen | **S0** – data loss | Closed | Fixed |
| [#8505](https://github.com/zeroclaw-labs/zeroclaw/issues/8505) – Telegram channel cannot be configured | **S1** – workflow blocked | Open / accepted | None yet |
| [#6002](https://github.com/zeroclaw-labs/zeroclaw/issues/6002) – Not clearly addressed to the assistant (Telegram) | **S1** – workflow blocked | Open / stale | None yet |
| [#8559](https://github.com/zeroclaw-labs/zeroclaw/issues/8559) – Agents stop work when exiting chat window | **S1** – workflow blocked | Open / in‑progress | Related PR [#7759](https://github.com/zeroclaw-labs/zeroclaw/pull/7759) (decouple WebSocket lifetime) |
| [#6724](https://github.com/zeroclaw-labs/zeroclaw/issues/6724) – Empty Signal/Voice channel credentials crashloop supervisor | **High risk** | Open / accepted | None yet |
| [#7911](https://github.com/zeroclaw-labs/zeroclaw/issues/7911) – `install.sh` selects generic Linux binary on Android/Termux | **Medium** | Open / accepted | None yet |
| [#5862](https://github.com/zeroclaw-labs/zeroclaw/issues/5862) – Agent unaware of cron capability | S3 – minor | Closed | Fixed |

The most critical open bug is **Telegram channel config** [#8505](https://github.com/zeroclaw-labs/zeroclaw/issues/8505) – a P1 with S1 severity that blocks Telegram usage entirely for some users. No fix PR has been linked yet.

### 6. Feature Requests & Roadmap Signals

Active feature RFCs and enhancements suggest the following themes for the upcoming release:

**Near‑term (likely next release):**
- **Slack thread context hydration** [#6055](https://github.com/zeroclaw-labs/zeroclaw/issues/6055) – in‑progress
- **Telegram multi‑message mode** [#8445](https://github.com/zeroclaw-labs/zeroclaw/issues/8445) – in‑progress
- **Per‑chat model switching** [#8600](https://github.com/zeroclaw-labs/zeroclaw/issues/8600) – accepted
- **Webhook transforms** [#2467](https://github.com/zeroclaw-labs/zeroclaw/issues/2467) – open
- **SearXNG search support** [#5316](https://github.com/zeroclaw-labs/zeroclaw/issues/5316) – in‑progress

**Medium‑term (RFC stage):**
- **Workspace‑relative forbidden paths** [#8424](https://github.com/zeroclaw-labs/zeroclaw/issues/8424) – blocked
- **Air‑gapped execution mode with companion daemon** [#6293](https://github.com/zeroclaw-labs/zeroclaw/issues/6293) – blocked
- **Abstract `KeySource` trait** [#9127](https://github.com/zeroclaw-labs/zeroclaw/issues/9127) – just opened
- **Cross‑turn conversation correlation for OpenTelemetry** [#8933](https://github.com/zeroclaw-labs/zeroclaw/issues/8933) – accepted
- **OCI‑compliant registries for WASM plugins** [#7497](https://github.com/zeroclaw-labs/zeroclaw/issues/7497) – blocked

New PRs also signal forward movement:
- **Hailo‑Ollama native support** [#9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109) – adds typed provider family
- **OpenAI chat completions endpoint** [#8486](https://github.com/zeroclaw-labs/zeroclaw/pull/8486) – enables SDK compatibility (LangChain, Continue.dev)
- **Herdr agent reporting integration** [#8337](https://github.com/zeroclaw-labs/zeroclaw/pull/8337) – observability sidebar
- **Matrix single‑message progress drafts** [#8443](https://github.com/zeroclaw-labs/zeroclaw/pull/8443)

These collectively point to a release focused on **channel maturity, provider flexibility, and security foundations**.

### 7. User Feedback Summary

Real pain points expressed recently include:

- **Configuration friction** – Users report the Telegram channel “cannot be configured” even after following quickstart ([#8505](https://github.com/zeroclaw-labs/zeroclaw/issues/8505)).  
- **Agent autonomy limitations** – The agent cannot naturally invoke cron scheduling (#5862, now fixed).  
- **Workflow interruption** – Exiting the web chat cancel in‑flight agent tasks (#8559).  
- **Context overflow** – Long conversations drift off‑topic or hallucinate (#6517, closed).  
- **Multi‑model switching** – Switching models within a provider (e.g., OpenRouter) is cumbersome (#8600).  
- **Android/Termux installation** – Binary selection fails for ARM64 Linux (#7911).  

Positive completion of requested features (Discord channel scoping, SMTP email, GitHub channel) indicates maintainers are responsive.

### 8. Backlog Watch

Issues and PRs that have been open for weeks or are blocked and need maintainer attention:

| Item | Status | Updated | Notes |
|------|--------|---------|-------|
| [#6002](https://github.com/zeroclaw-labs/zeroclaw/issues/6002) – Telegram unclear addressing | Stale, needs author action | 2026-04-22 | S1 severity, no movement |
| [#8424](https://github.com/zeroclaw-labs/zeroclaw/issues/8424) – Workspace‑relative forbidden paths | Blocked, needs author action | 2026-06-28 | High‑risk RFC |
| [#9127](https://github.com/zeroclaw-labs/zeroclaw/issues/9127) – KeySource trait | Needs author action | 2026-07-18 | Just opened, but already tagged |
| [#8138](https://github.com/zeroclaw-labs/zeroclaw/issues/8138) – OpenRouter fallback models | Blocked | 2026-06-22 | Medium risk |
| [#6724](https://github.com/zeroclaw-labs/zeroclaw/issues/6724) – Empty channel credentials crashloop | Open, accepted | 2026-05-16 | High risk, no fix PR |
| [#4853](https://github.com/zeroclaw-labs/zeroclaw/issues/4853) – Installing skills from `.well-known` URI | Open, accepted | 2026-03-27 | ~4 months old |
| [#2467](https://github.com/zeroclaw-labs/zeroclaw/issues/2467) – Webhook transforms | Open, accepted | 2026-03-02 | ~5 months old |
| PR [#8576](https://github.com/zeroclaw-labs/zeroclaw/pull/8576) – env‑var fallback for OpenAI STT credentials | Needs author action | 2026-07-01 | Fix for #7899 |
| PR [#8486](https://github.com/zeroclaw-labs/zeroclaw/pull/8486) – OpenAI chat completions endpoint | Needs author action | 2026-06-29 | Large feature |
| PR [#8443](https://github.com/zeroclaw-labs/zeroclaw/pull/8443) – Matrix progress drafts | Needs author action | 2026-06-28 | Large feature |
| PR [#9102](https://github.com/zeroclaw-labs/zeroclaw/pull/9102) – Strip unhandled media markers | Needs author action | 2026-07-16 | Bugfix |
| PR [#9115](https://github.com/zeroclaw-labs/zeroclaw/pull/9115) – CI runners on optional Blacksmith | Needs author action | 2026-07-17 | CI improvement |

The **longest‑standing open feature requests** [#4853](https://github.com/zeroclaw-labs/zeroclaw/issues/4853) (skills from `.well-known`) and [#2467](https://github.com/zeroclaw-labs/zeroclaw/issues/2467) (webhook transforms) have been waiting for over four months and may need prioritization if they align with the upcoming roadmap.

---

*Data as of 2026-07-19 23:59 UTC.*

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw Project Digest — 2026-07-19

**Data Snapshot (last 24h)**
- Issues updated: 4 (2 open, 2 closed)
- PRs updated: 12 (4 open, 8 closed/merged)
- New releases: 0
- Repository: [github.com/sipeed/picoclaw](https://github.com/sipeed/picoclaw)

---

## 1. Today’s Overview

Activity remains steady with 12 PRs touched in the past day, including 8 merges that delivered several long-awaited features. Two new bugs surfaced today—a critical gateway startup failure and a message‑splitting hang—both without immediate fixes. Meanwhile, two stale issues were closed (likely superseded by recently merged PRs) and four older PRs linger open. No new releases were cut, but the project’s feature pipeline (agent collaboration bus, per‑agent overrides, WhatsApp presence) is visibly maturing.

---

## 2. Releases

*None.* No new releases were published in the analysed period.

---

## 3. Project Progress – Merged/Closed PRs

Eight PRs were closed or merged, spanning feature work, bug fixes, and dependency bumps:

- **feat(whatsapp): add native typing presence** ([#3242](https://github.com/sipeed/picoclaw/pull/3242)) – Closes issue #3240 by implementing `channels.TypingCapable` for the native WhatsApp channel. Sends `composing`/`paused` signals and refreshes every 10 seconds for long replies.
- **fix(auth): make OAuth refresh provider‑correct and concurrency‑safe** ([#3241](https://github.com/sipeed/picoclaw/pull/3241)) – Resolves issue #3239 by sending JSON payloads to OpenAI, omitting scope during refresh, and adding a 30‑second health‑check lock.
- **Support agent‑specific runtime overrides** ([#3225](https://github.com/sipeed/picoclaw/pull/3225)) – Allows `agents.list` entries to define `max_tokens`, summarization thresholds, and `split_on_marker`. Applied per‑agent when building `AgentInstance`.
- **feat(models): add configurable default fallback chain** ([#3200](https://github.com/sipeed/picoclaw/pull/3200)) – Introduces a dedicated UI workflow for setting default models and fallback order, persisted via the backend API.
- **fix(openai_compat): recover Seed XML tool calls** ([#3165](https://github.com/sipeed/picoclaw/pull/3165)) – Recovers Volcengine Doubao `<seed:tool_call>` XML from OpenAI‑compatible responses and strips leaked XML from streaming chunks.
- **Feat/agent collaboration** ([#2937](https://github.com/sipeed/picoclaw/pull/2937)) – Adds a durable internal Agent Collaboration Bus with per‑agent mailboxes, collaboration threads, structured message envelopes, and permission‑aware delivery.
- **build(deps): bump eslint from 10.4.1 to 10.6.0** ([#3211](https://github.com/sipeed/picoclaw/pull/3211))
- **build(deps): bump maunium.net/go/mautrix from 0.27.0 to 0.28.1** ([#3208](https://github.com/sipeed/picoclaw/pull/3208))

All merged code is now part of `main`.

---

## 4. Community Hot Topics

No single issue or PR attracted more than one comment or reaction during the period. However, two clusters of user-driven conversation stand out:

- **WhatsApp typing presence** – The pair of issue #3240 (closed) and PR #3242 (merged) shows users (As-tsaqib) actively requesting and then receiving feedback signalling for WhatsApp. This likely addresses a common pain point where users see no response for several seconds.
- **Raspberry Pi / ARM support** – PR #3205 (still open) proposes a Linux ARMv7 build target and fixes parsing of 9router gateway responses. The PR was filed by a user running PicoClaw on a Raspberry Pi 3 B+, indicating real-world demand for lightweight deployment.

The underlying need across both topics is *production readiness*: users want the agent to feel responsive (typing indicators) and to run on resource‑constrained hardware.

---

## 5. Bugs & Stability

**Critical**  
- **Gateway startup fails with `channel deltachat has unknown type deltachat`** ([#3265](https://github.com/sipeed/picoclaw/issues/3265)) – Reported today by Cipher208. The gateway refuses to start even when DeltaChat is not configured in `config.json`. Appears to be a false positive in channel registration logic. No fix PR exists yet.

**High**  
- **`channels.SplitMessage` hangs on oversized fenced‑code info string** ([#3264](https://github.com/sipeed/picoclaw/issues/3264)) – Reported yesterday by floze‑the‑genius. A fenced code block with a long info string can cause an infinite loop when the split point falls inside the opening fence. The fallback logic fails to make progress. No fix PR exists yet.

**Resolved (via merged PRs)**  
- OAuth refresh race and provider semantics (#3239, fixed by #3241)  
- Missing WhatsApp typing presence (#3240, fixed by #3242)

Both closed issues carried the `[stale]` label but were effectively resolved by the associated PR merges.

---

## 6. Feature Requests & Roadmap Signals

Several recently merged or open features hint at the project’s near‑term direction:

- **Agent collaboration bus** (#2937, merged) – Enables multi‑agent workflows within a single PicoClaw instance. Likely to be built upon in the next release with inter‑agent tool delegation.
- **Per‑agent runtime overrides** (#3225, merged) – Gives operators fine‑grained control per agent, a prerequisite for tiered service (e.g., free vs. premium agents).
- **Configurable default model fallback chain** (#3200, merged) – Adds resilience when primary models fail. Expect integration with routing logic in future versions.
- **Open PRs to watch**:  
  - **Simplex channel type** ([#3193](https://github.com/sipeed/picoclaw/pull/3193)) – Adds a new communication channel, expanding platform reach.  
  - **ARMv7 build target + 9router support** ([#3205](https://github.com/sipeed/picoclaw/pull/3205)) – Targets edge deployments on older Raspberry Pis.  
  - **ID normalization fix** ([#3202](https://github.com/sipeed/picoclaw/pull/3202)) – Fixes agent/account ID normalization to adhere to regex constraints; small but could break existing IDs if not vetted.  
  - **Go 1.25.12 stdlib vulnerability fix** ([#3248](https://github.com/sipeed/picoclaw/pull/3248)) – Security patch for `crypto/tls` and `os` vulnerabilities. Should merge soon.

These items suggest the next release will focus on channel expansion, security hardening, and agent configurability.

---

## 7. User Feedback Summary

- **Pain points**:  
  - The OAuth refresh system was *provider‑incompatible* – OpenAI required JSON, while Google required form‑encoded data. This caused silent failures during token refresh (#3239).  
  - WhatsApp users experienced *no visual feedback* while waiting for replies, leading to perceived unresponsiveness (#3240).  
  - Gateway startup fails on a *phantom channel type* even when the channel is not enabled (#3265).  
  - Message splitting can *hang indefinitely* when code‑fence info strings are too long (#3264).

- **Use cases**:  
  - Running PicoClaw on a *Raspberry Pi 3 B+* (PR #3205) suggests a desire for low‑power, always‑on personal AI assistants.  
  - The agent collaboration feature (#2937) points toward *multi‑step automation* and *team‑oriented bot deployments*.

- **Satisfaction indicators**:  
  - The two closed issues (#3239, #3240) were resolved by merged PRs, indicating the maintainers are responsive to verified bugs.  
  - No user complaints about the new fallback chain or agent overrides have surfaced yet.

---

## 8. Backlog Watch

The following open PRs are approaching staleness (no updates in 1–3 weeks) and may require maintainer triage or shepherd review:

| PR # | Title | Created | Age |
|------|-------|---------|-----|
| [#3193](https://github.com/sipeed/picoclaw/pull/3193) | Added simplex channel type | 2026-06-27 | 22 days |
| [#3205](https://github.com/sipeed/picoclaw/pull/3205) | support 9router gateway + ARMv7 build | 2026-07-02 | 17 days |
| [#3202](https://github.com/sipeed/picoclaw/pull/3202) | fix routing ID normalization | 2026-07-01 | 18 days |
| [#3248](https://github.com/sipeed/picoclaw/pull/3248) | bump Go to 1.25.12 (security) | 2026-07-10 | 9 days |

Additionally, no closed issues or PRs are awaiting re‑evaluation. The two new open bugs (#3265, #3264) have no associated fix PRs yet—these should be prioritised due to their impact (gateway unreachable and infinite loop).

---

*Digest generated from GitHub activity data on 2026-07-19. All timestamps UTC.*

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw Project Digest — 2026-07-19

## 1. Today's Overview

The project shows **high activity** with 18 issues updated (16 closed, 2 open) and 36 pull requests updated (17 merged/closed, 19 open) in the last 24 hours. No new releases were cut today. The majority of closed issues are bug fixes and feature completions, while open PRs (many from contributor **cfis**) indicate ongoing work on WhatsApp, Signal, and container runner improvements. The spike in merged PRs – particularly the long-standing ANTHROPIC_BASE_URL path prefix fixes and Slack setup enhancements – suggests the maintainers are clearing a backlog of community contributions.

## 2. Releases

**No new releases** were published on 2026-07-19. The last non‑zero release version remains unreported; users are running whatever tag they installed previously.

## 3. Project Progress

**17 pull requests were merged or closed** today. Notable advances include:

- **Credential proxy fix for ANTHROPIC_BASE_URL path prefix** – Four PRs ([#1100](https://github.com/nanocoai/nanoclaw/pull/1100), [#1185](https://github.com/nanocoai/nanoclaw/pull/1185), [#1212](https://github.com/nanocoai/nanoclaw/pull/1212), [#1267](https://github.com/nanocoai/nanoclaw/pull/1267)) by npulgh, pengchongfu, jiangyunpeng, and kk17 were all closed, indicating the proxy now correctly forwards requests when a base path (e.g., `/api/anthropic`) is present. This enables compatibility with third‑party Claude API providers.
- **Setup / onboarding improvements** – A series of PRs by alipgoldberg improved the Slack post‑install card ([#2299](https://github.com/nanocoai/nanoclaw/pull/2299), [#2303](https://github.com/nanocoai/nanoclaw/pull/2303), [#2304](https://github.com/nanocoai/nanoclaw/pull/2304), [#2305](https://github.com/nanocoai/nanoclaw/pull/2305)), fix the Photon homepage URL in the iMessage card ([#2314](https://github.com/nanocoai/nanoclaw/pull/2314)), and label Slack setup steps as part 1/part 2 ([#2296](https://github.com/nanocoai/nanoclaw/pull/2296)).
- **Feature closures** – Issues for keyword‑based pre‑turn model routing ([#1681](https://github.com/nanocoai/nanoclaw/issues/1681), [#1679](https://github.com/nanocoai/nanoclaw/issues/1679)), CLI for scheduled tasks ([#2397](https://github.com/nanocoai/nanoclaw/issues/2397)), and `ncl groups config` mount commands ([#2395](https://github.com/nanocoai/nanoclaw/issues/2395)) were all closed, implying these features have been implemented.

## 4. Community Hot Topics

The most active discussion today centers on a **critical bug with `send_message` deduplication**:

- [#2506](https://github.com/nanocoai/nanoclaw/issues/2506) – *“bug: send_message dedup silently drops responses when turns complete within 60 seconds of each other”* (4 comments) – Reported by mshirel. The agent silently drops responses and the client times out when two turns complete in quick succession or a follow‑up arrives mid‑stream. The issue was closed, but the underlying PR [#2531](https://github.com/nanocoai/nanoclaw/pull/2531) (fix for duplicate text mid‑turn) remains open.

Other issues with moderate engagement (3 comments each):

- [#2482](https://github.com/nanocoai/nanoclaw/issues/2482) – *“Wizard falsely detects 'no systemd' under su - invocation”* – Affects Proxmox LXC and headless setups.
- [#3016](https://github.com/nanocoai/nanoclaw/issues/3016) – *“Every rate_limit_event is logged as a quota error, even when 'allowed'”* – Noisy logging after PR #2965.
- [#2916](https://github.com/nanocoai/nanoclaw/issues/2916) – *“hi”* – Spam issue, no real discussion.

The underlying user need is clear: **reliability in message delivery and accurate logging** are top concerns for active deployers.

## 5. Bugs & Stability

| Severity | Bug | Status | Fix PR? |
|----------|-----|--------|---------|
| **Critical** | #2506 – `send_message` dedup drops responses; client times out | Closed (but root cause may persist) | PR [#2531](https://github.com/nanocoai/nanoclaw/pull/2531) (open) |
| **High** | #3085 – WhatsApp `engage_mode=mention` fails on typed `@name` text (autocomplete only) | Open, reported 2026-07-18 | None yet |
| **High** | #2894 – WhatsApp inbound media silently dropped when CDN fetch fails | Closed | No linked fix PR |
| **Medium** | #2482 – Wizard false systemd detection under `su -` | Closed | No linked fix PR |
| **Medium** | #1981 – v2 setup systemd misdetected on headless Linux (open since April) | Open | None |
| **Low** | #3016 – Rate limit events logged as quota errors (cosmetic noise) | Closed | Already fixed in #2965 (released earlier) |
| **Low** | #2784 – Container runner staleness check misses `ipc-mcp-stdio.ts` changes | Closed | No linked fix PR |

**Summary:** Two open bugs (#3085, #1981) need maintainer attention. The WhatsApp mention bug is new and blocks a core interaction pattern. The systemd detection issue has been open for three months.

## 6. Feature Requests & Roadmap Signals

Several user‑requested features were **closed today**, suggesting they are already implemented or will ship in the next build:

- **Keyword‑based message routing** ([#1681](https://github.com/nanocoai/nanoclaw/issues/1681)) – Pre‑turn model selection by keyword matching (e.g., “code review” → Claude Sonnet, “research” → Gemini Flash). Zero‑cost routing before any LLM call.
- **CLI for scheduled tasks** ([#2397](https://github.com/nanocoai/nanoclaw/issues/2397)) – `ncl` commands to list, run‑now, pause, or cancel cron‑based tasks.
- **Container config mount commands** ([#2395](https://github.com/nanocoai/nanoclaw/issues/2395)) – `ncl groups config add/remove‑mount` for the new container‑configs DB migration.
- **MGA / agent group lifecycle** ([#2517](https://github.com/nanocoai/nanoclaw/issues/2517)) – Unarchive‑on‑reference and garbage collection for archived groups.

**Prediction for next version:** The keyword routing and CLI for scheduled tasks are low‑risk additions that improve daily usability. The container config mount commands fix a regression from migration 014. These are likely to appear in the next minor release (v2.1.x).

## 7. User Feedback Summary

- **Pain points:** Silent message drops (#2506), false systemd detection (#2482, #1981), WhatsApp media loss (#2894), and noisy quota logs (#3016). Users are running the agent in diverse environments (Proxmox LXC, headless Linux, containers) and hitting edge cases.
- **Use cases:** Personal assistant via WhatsApp, Slack, Signal, and iMessage; scheduled tasks; containerised agent runners; integration with third‑party LLM providers (via ANTHROPIC_BASE_URL).
- **Satisfaction indicators:** Several contributors (cfis, alipgoldberg, glifocat) are actively filing bugs and submitting PRs, demonstrating active, engaged community. The quick closure of many issues shows responsive maintainers.
- **Dissatisfaction signals:** The systemd detection bug has been open since April and affects multiple users (#1981, #2482). The WhatsApp mention bug (#3085) is brand‑new but blocks a core feature.

## 8. Backlog Watch

Issues and PRs that are **stale or awaiting maintainer action**:

| Item | Age | Notes |
|------|-----|-------|
| [#1981](https://github.com/nanocoai/nanoclaw/issues/1981) – v2 setup systemd misdetected on headless Linux | Open since 2026-04-24 (87 days) | Only 1 comment, no resolution. Affects Ubuntu Hetzner users. |
| [#3085](https://github.com/nanocoai/nanoclaw/issues/3085) – WhatsApp `engage_mode=mention` bug | Open since 2026-07-18 (1 day) | Fresh bug, needs triage. |
| [#2348](https://github.com/nanocoai/nanoclaw/pull/2348) – fix(whatsapp): single-timer reconnect + clean teardown | Open since 2026-05-08 (72 days) | Large PR; may require review from maintainer. |
| [#2184](https://github.com/nanocoai/nanoclaw/pull/2184) – fix(poll-loop): retry immediately on stale session | Open since 2026-05-02 (78 days) | Addresses a related staleness problem. |
| [#2208](https://github.com/nanocoai/nanoclaw/pull/2208) – feat(mcp): support HTTP and SSE MCP transports | Open since 2026-05-03 (77 days) | Adds significant new capability. |
| [#2230](https://github.com/nanocoai/nanoclaw/pull/2230) – fix(container-runner): map host user via keep-id on rootless podman | Open since 2026-05-03 (77 days) | Container runner improvement. |
| [#2693](https://github.com/nanocoai/nanoclaw/pull/2693) – feat(skill): add Google Contacts tool | Open since 2026-06-06 (43 days) | Utility skill, likely low risk. |
| [#2694](https://github.com/nanocoai/nanoclaw/pull/2694) – fix(signal): set isMention/isGroup on inbound DMs | Open since 2026-06-06 (43 days) | Critical for Signal DM support. |
| [#2695](https://github.com/nanocoai/nanoclaw/pull/2695) – fix(signal): stage inbound images as base64 | Open since 2026-06-06 (43 days) | Needed for Signal image support. |
| [#2531](https://github.com/nanocoai/nanoclaw/pull/2531) – fix(poll-loop): suppress duplicate text when send_message fires mid‑turn | Open since 2026-05-18 (62 days) | Directly related to the #2506 bug. |

**Recommendation:** The maintainer should prioritise the Signal adapter PRs (#2694, #2695) and the WhatsApp reconnect PR (#2348) to stabilise two core messaging channels. The systemd detection issue (#1981) should be addressed to unblock headless Linux users.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw Project Digest – 2026-07-19

## 1. Today’s Overview
Project activity remains extremely low, with only a single issue updated in the last 24 hours and no pull requests or releases. The repository appears to be in a quiet maintenance phase, with no new features or fixes being introduced. The only point of activity is a persistent bug affecting Android/Termux users that has been open for nearly three months. Overall project health is stable but stagnant, with minimal community or maintainer engagement visible in the past day.

## 2. Releases
No new releases were published on the last day. The most recent release remains **v2026.4.17** (April 17, 2026).

## 3. Project Progress
No pull requests were merged or closed in the last 24 hours. No code changes were recorded, and no features advanced during this period.

## 4. Community Hot Topics
The only actively discussed topic is **Issue #868**: *“zig build fails on Android/Termux (aarch64) with AccessDenied on options.zig linkat”*  
- **Status:** Open  
- **Author:** NOTJuangamer10  
- **Created:** 2026-04-23  
- **Last updated:** 2026-07-18  
- **Comments:** 7  
- **URL:** [GitHub Issue #868](https://github.com/nullclaw/nullclaw/issues/868)  

The discussion centers on a build failure that prevents compilation of NullClaw on Android devices (aarch64) using Zig 0.16.0. Users have described the environment and the exact error message, but no maintainer response or fix has been identified yet. The underlying need is clear: reliable cross-platform build support, especially on mobile/terminal environments like Termux.

## 5. Bugs & Stability
One known bug is actively affecting users:

- **Issue #868 – AccessDenied on `linkat` during Zig build**  
  *Severity: High* – blocks the entire build process on Android aarch64, a significant portion of the user base.  
  *Status:* Open, no associated fix PR.  
  *Risk:* Low (no new regressions reported today, but the bug remains unresolved).  

No other crashes, regressions, or stability reports have been logged in the last 24 hours.

## 6. Feature Requests & Roadmap Signals
No new feature requests were submitted or discussed today. The only implicit roadmap signal comes from Issue #868, which highlights the community’s expectation that NullClaw should be buildable on modern Android devices. Improved cross‑platform build instructions or automated CI for Termux/Zig could be a candidate for a near‑future patch.

## 7. User Feedback Summary
- **Pain points:** The Android build failure is the primary pain point. Users are unable to compile the project on their devices despite following standard procedures.  
- **Use cases:** The affected user runs NullClaw on a Xiaomi Redmi Note 9 under LineageOS 22.2 (Android) using Termux – a typical mobile development or automation scenario.  
- **Satisfaction/dissatisfaction:** The lack of progress on this bug since April likely contributes to user dissatisfaction. The 7 comments indicate active community troubleshooting, but no resolution has been offered by the maintainers.

## 8. Backlog Watch
The following issue requires maintainer attention due to its age, importance, and lack of official response:

- **Issue #868** (created 2026-04-23, last updated 2026-07-18) – *[bug] zig build fails on Android/Termux (aarch64)*  
  This is the oldest open bug with recent activity. It blocks a real-world use case, yet has received no maintainer comment. A triage or workaround suggestion would be valuable to the community.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

## IronClaw Project Digest — 2026-07-19

### 1. Today’s Overview

IronClaw development is exceptionally active, with **50 pull requests updated in the last 24 hours**, of which **35 were merged or closed** and **15 remain open**. Six issues were updated, five of which are still open and one closed. No new releases were published, indicating that today’s changes are internal refactoring and bug fixes heading toward a future release. The majority of merged PRs advance the **Reborn architecture simplification**—a systematic rewrite of the capability runtime, dispatch, and result-handling layers—alongside critical security fixes for OAuth token handling and MIME‑type validation.

### 2. Releases

No new releases were published today. The most recent release remains the placeholder PR [#5598](https://github.com/nearai/ironclaw/pull/5598) (still open), which would bump `ironclaw` to v0.29.1 and introduce breaking changes in `ironclaw_common` and `ironclaw_skills`.

### 3. Project Progress

**35 PRs were merged or closed today**, spanning several high‑impact areas:

- **Architecture simplification (Reborn)** – Core contributor `ilblackdragon` merged a series of large refactors:
  - [#6256](https://github.com/nearai/ironclaw/pull/6256) – Host‑private `ReplayPayloadStore` for gate/auth resume‑read.
  - [#6255](https://github.com/nearai/ironclaw/pull/6255) – Fixed a stranded harness assertion in the canary test.
  - [#6252](https://github.com/nearai/ironclaw/pull/6252) – Added compile‑time transition exhaustiveness tests for capability state machines.
  - [#6245](https://github.com/nearai/ironclaw/pull/6245) – Routed capability results through `host_api::Resolution` at the loop_host seam.
  - [#6242](https://github.com/nearai/ironclaw/pull/6242) – Landed `CapabilityOutcome → Resolution` mapping in `ironclaw_turns`.
  - [#6241](https://github.com/nearai/ironclaw/pull/6241) – Extended the `authorize()` scaffold to all `CapabilityHost` entry points.
  - [#6240](https://github.com/nearai/ironclaw/pull/6240) – Collapsed `RuntimeAdapter` dynamic dispatch into a closed `RuntimeLane` executor.
  - [#6239](https://github.com/nearai/ironclaw/pull/6239) – Extracted `authorize()` delegating scaffold in `ironclaw_capabilities`.
  - [#6243](https://github.com/nearai/ironclaw/pull/6243) – Persistent `GateRecordStore` for capability‑result collapse.
- **CLI & WebUI fixes** – [#6211](https://github.com/nearai/ironclaw/pull/6211) fixed hardcoded stub commands in `ironclaw-cli` to return explicit “not implemented” errors. [#6182](https://github.com/nearai/ironclaw/pull/6182) and [#6180](https://github.com/nearai/ironclaw/pull/6180) improved settings import handling and automation error sanitization in WebUI v2.
- **CI & release** – [#6176](https://github.com/nearai/ironclaw/pull/6176) added a Reborn binary preflight across seven targets, and [#6188](https://github.com/nearai/ironclaw/pull/6188) made the tag‑driven release workflow Reborn‑compile‑only.
- **Security** – [#6251](https://github.com/nearai/ironclaw/pull/6251) fixed OAuth denial lifecycle to be channel‑neutral, preventing Slack personal OAuth from opening against the wrong workspace.

The closed issue [#6143](https://github.com/nearai/ironclaw/issues/6143) marked the completion of promoting the Reborn runtime to the canonical `ironclaw` CLI, with v1 isolated as `ironclaw-v1`.

### 4. Community Hot Topics

- **Issue [#6158](https://github.com/nearai/ironclaw/issues/6158)** – Request for zh‑TW (Traditional Chinese) localization. Has 2 comments and was updated yesterday. The community is asking for parity with the existing zh‑CN locale.
- **Issue [#6247](https://github.com/nearai/ironclaw/issues/6247)** – Reports that MCP server headers persist bearer tokens in plaintext in the database and worker mounts. This is a security concern that received attention from core contributors (opened by `kirikov`).
- **PR [#5598](https://github.com/nearai/ironclaw/pull/5598)** (still open) – The release PR that would cut `ironclaw` v0.29.1 has been idle since July 3 and received no new comments today; its size and breaking changes make it a topic of interest for downstream users.

No PR shows defined comment counts in the data, so the hot topics are inferred from issue activity and security relevance.

### 5. Bugs & Stability

| Bug | Severity | Status | Fix PR |
|-----|----------|--------|--------|
| **#6257**: PDF generation/sending yields “Invalid value (attachments.mime_type)” error | **High** – blocks PDF use case | Open, reported today | None yet |
| **#6247**: MCP server bearer tokens stored in plaintext (DB row + worker mount) | **Critical** – credential leakage risk | Open, filed July 18 | None yet |
| **#6180** (PR) – Automation action errors showing raw mutation errors instead of localized messages | **Medium** – UX & internationalization | Closed via PR [#6180](https://github.com/nearai/ironclaw/pull/6180) | Merged |
| **#6182** (PR) – Settings imports with no supported entries reported success | **Low** – false success | Closed via PR [#6182](https://github.com/nearai/ironclaw/pull/6182) | Merged |
| **#6255** (PR) – Canary test assertion failure masking correct zizmor scans | **Low** – test infrastructure | Closed via PR [#6255](https://github.com/nearai/ironclaw/pull/6255) | Merged |

The most urgent unresolved bug is the PDF MIME type error (#6257), which directly impacts a common file‑sharing use case. The plaintext credential storage (#6247) is a security vulnerability that likely requires a design change (e.g., encryption at rest).

### 6. Feature Requests & Roadmap Signals

- **Localization** – Issue [#6158](https://github.com/nearai/ironclaw/issues/6158) requesting zh‑TW is a straightforward addition; likely to be included in the next WebUI release.
- **MCP server extensions API parity for Reborn** – Issue [#6249](https://github.com/nearai/ironclaw/issues/6249) requests that the standalone Reborn binary supports the same install/activate/PATCH endpoints as the v1 gateway. This is part of the ongoing Reborn promotion and is expected to be addressed before the next release.
- **Credential preflight** – Issue [#6248](https://github.com/nearai/ironclaw/issues/6248) proposes a pre‑approval/sandbox account check for OAuth‑backed capabilities. This is a design‑level feature blocked on `auth_resume` architecture; may land after the current simplification wave.
- **Bearer token security** – The plaintext credential issue (#6247) will likely be elevated to a feature request for secure credential storage (e.g., using OS keychain or encrypted DB fields) in the next release.

### 7. User Feedback Summary

- **Positive signals**: The community is actively contributing to internationalization (zh‑TW request) and reporting bugs like the PDF MIME error, indicating an engaged user base. The rapid pace of PR merges shows responsiveness to both reported issues and architectural needs.
- **Pain points**:
  - PDF file handling is broken (#6257) – reported by a user on Slack (`Michael Kelly`).
  - MCP server credentials are stored unencrypted (#6247) – a systemic security concern for production deployments.
  - WebUI settings import silently ignores unsupported entries (fixed in [#6182](https://github.com/nearai/ironclaw/pull/6182)).
  - Automation errors show raw technical messages instead of user‑friendly copy (fixed in [#6180](https://github.com/nearai/ironclaw/pull/6180)).
- **Use cases**: Users are leveraging IronClaw for sending/generating PDFs, managing MCP servers, using OAuth integrations (Slack, GSuite), and customizing localizations.

### 8. Backlog Watch

The following open items have not seen activity in several days and may require maintainer attention:

- **PR [#5598](https://github.com/nearai/ironclaw/pull/5598)** – Release v0.29.1, opened July 3. No activity since July 19 (today) but still open. A release is overdue given the volume of merged changes.
- **PR [#6121](https://github.com/nearai/ironclaw/pull/6121)** – Make migration default legacy‑free, opened July 15. Updated today but not merged; may need review.
- **Issue [#6158](https://github.com/nearai/ironclaw/issues/6158)** – zh‑TW localization, opened July 16. No assignee or milestone; community feedback is straightforward to implement.
- **Issue [#6247](https://github.com/nearai/ironclaw/issues/6247)** – Plaintext bearer tokens, opened July 18. High‑priority security issue with no PR yet; critical for production deployments.

No issues older than 3 days appear in the 24‑hour update window, so the project maintainers are actively addressing recent concerns. The release PR (#5598) remains the most significant backlog item.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI Project Digest — 2026-07-19

## 1. Today's Overview
Over the past 24 hours, LobsterAI saw moderate activity: **6 open issues** were updated (all remained open), **3 pull requests** were updated (2 merged/closed, 1 open), and **1 new release** (2026.7.17) was published. Most updated issues and PRs were older items (dated early April), suggesting maintenance attention rather than new feature churn. The single new PR (#2358) addresses a user-facing feedback gap in session renaming, while the merged PRs finalize two previously submitted feature enhancements (agent skill selector and IM configuration validation). The project appears stable with a focus on bug fixes and quality-of-life improvements, though several long‑standing issues remain unresolved.

## 2. Releases
**Version:** `LobsterAI 2026.7.17` (released 2026-07-17)

**What’s Changed:**
- `feat(cowork)`: Surface structured run failure details in error UI (#2348)
- `feat(service deployment)`: Service deployment data persistence (#2349)
- `feat(skin)`: (description truncated in changelog) – likely a UI skinning improvement.

**Breaking Changes / Migration Notes:** None documented. The release appears backward‑compatible.

**Full Changelog:** [View release](https://github.com/netease-youdao/LobsterAI/releases)

## 3. Project Progress
Two long‑standing PRs were merged/closed today:

- **PR #1353 (merged)** – `feat(agent): Agent 技能选择器新增全选和清除功能`  
  Adds “Select All” and “Clear” buttons to the agent skill selector, along with a real‑time count display (`Selected N/M`). Improves UX when managing many skills.

- **PR #1464 (merged)** – `fix(im): add duplicate validation for instance name and credential ID`  
  Prevents duplicate instance names and duplicate bot credentials (App ID / Client ID) in DingTalk, Feishu, and QQ IM platforms. Reduces configuration conflicts.

**Open PR under active review:**

- **PR #2358 (open)** – `fix(cowork): show feedback when session rename fails`  
  Provides localized error feedback when a session rename fails, addressing a silent failure (related to Issue #670).

## 4. Community Hot Topics
All updated issues today are stale (created 2026-04-02) with only **1 comment each** and very few reactions. No single issue sparked high engagement. The most notable:

- **[#1293 – Custom Studio HTTP MCP not usable](https://github.com/netease-youdao/LobsterAI/issues/1293)**  
  👍 1 | Comments: 1  
  Users report that custom MCPs (non‑SSE) are not being registered in the OpenClaw engine, making them unusable. This likely affects power users who rely on custom tools.

- **[#1296 – Parsing a 3MB long image crashes the page](https://github.com/netease-youdao/LobsterAI/issues/1296)**  
  👍 0 | Comments: 1  
  A severe stability bug: uploading a large image (3MB) causes a page‑level crash that persists across new tasks.

- **[#1298 – Model connection passes but short inputs trigger “content too long” error](https://github.com/netease-youdao/LobsterAI/issues/1298)**  
  👍 0 | Comments: 1  
  A false positive context‑length check that rejects valid short inputs, indicating a model configuration or tokenizer bug.

The low comment/react count suggests users may be waiting for maintainer responses or have moved on to workarounds.

## 5. Bugs & Stability
No new bugs were filed in the last 24 hours. The following **open, unresolved bugs** were touched (likely stale‑bot pings):

| Severity | Issue | Description |
|----------|-------|-------------|
| High | [#1296](https://github.com/netease-youdao/LobsterAI/issues/1296) | 3MB image upload crashes the page – makes the app completely unusable for image‑based tasks. |
| Medium | [#1293](https://github.com/netease-youdao/LobsterAI/issues/1293) | Custom HTTP MCP not working – blocks custom tool integration. |
| Medium | [#1298](https://github.com/netease-youdao/LobsterAI/issues/1298) | False “input too long” even for short texts – degrades usability with certain models. |
| Low | [#1305](https://github.com/netease-youdao/LobsterAI/issues/1305) | Scheduled task history shows wrong title after deletion – display bug. |
| Low | [#1307](https://github.com/netease-youdao/LobsterAI/issues/1307) | Editing a model provider panel becomes read‑only after closing it – UI regression. |

**Associated fix PRs:** None yet for these bugs. The open PR #2358 addresses a different issue (session rename feedback).

## 6. Feature Requests & Roadmap Signals
User‑requested features visible in today’s data:

- **Code block line numbers** ([#1302](https://github.com/netease-youdao/LobsterAI/issues/1302)) – A detailed proposal to add a toggle button for line numbers in code blocks, supporting both syntax‑highlighted and plain code blocks. This is a pure UX enhancement for developers.
- **Agent skill selector improvements** – Already addressed by merged PR #1353 (select‑all/clear). Likely to ship in the next release.
- **IM instance duplication validation** – Addressed by merged PR #1464. Will prevent configuration errors.

Given the frequency of “stale” labels on items from early April, the maintainers appear to be cleaning up old issues and PRs rather than accepting new features. The next version (post‑2026.7.17) will likely include the agent skill selector and IM validation changes.

## 7. User Feedback Summary
- **Positive signals:** The project continues to ship incremental improvements (failure details, data persistence). Users who report bugs are detailed and include screenshots – a sign of an engaged, technically‑proficient community.
- **Pain points:**  
  - **MCP integration** (HTTP vs SSE) is confusing and broken for custom setups.  
  - **Image parsing stability** remains poor; a 3MB image can bring down the entire UI.  
  - **Model configuration inconsistencies** (false length limit, edit panel locks) frustrate users during setup.  
  - **Scheduled task title retention** after deletion is a minor but irritating display issue.
- **Satisfaction:** No explicit praise or complaints observed in the last 24h. The quietness may indicate users are either satisfied, waiting for fixes, or have workaround.

## 8. Backlog Watch
The following issues have been **open and untouched for over 3 months** (since April 2) and were only revived today by stale‑bot activity. Maintainer attention is needed:

- **[#1293 – Custom MCP not working](https://github.com/netease-youdao/LobsterAI/issues/1293)** – 103 days open, 1 comment, 1 👍. Core functionality blocker for advanced users.
- **[#1296 – Large image crash](https://github.com/netease-youdao/LobsterAI/issues/1296)** – 103 days open, no fix proposed. High severity.
- **[#1298 – False input length limit](https://github.com/netease-youdao/LobsterAI/issues/1298)** – 103 days open, no resolution.
- **[#1302 – Code block line numbers feature request](https://github.com/netease-youdao/LobsterAI/issues/1302)** – 103 days open, feature request with detailed spec. Could be a low‑effort high‑value addition.
- **[#1305 – Scheduled task history title bug](https://github.com/netease-youdao/LobsterAI/issues/1305)** – 103 days open.
- **[#1307 – Model provider edit panel lock](https://github.com/netease-youdao/LobsterAI/issues/1307)** – 103 days open.

No unmerged PRs are waiting long – the oldest open PR (#2358) is from today. The project would benefit from triaging these stale issues and either labelling them as planned, assigning a milestone, or closing with workaround suggestions.

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis Project Digest – 2026-07-19

## 1. Today’s Overview
Project activity remained low today, with only one issue updated and three pull requests touched in the last 24 hours. Two PRs (a Slack API configuration improvement and a fix for ACP-only web chat) were closed, while a new experimental memory backend based on Zvec and redb was submitted. No new releases were published. Overall, the project appears to be in a steady but quiet phase, with ongoing feature experimentation and incremental fixes.

## 2. Releases
*None.* No new versions were tagged or published in the reporting period.

## 3. Project Progress
Two pull requests were merged or closed today, representing both a new feature and a bug fix:

- **PR #1159 (closed) – feat(slack): support configurable API base URL**  
  *Author: penso* – Adds a configurable `api_base_url` for Slack integration (default remains `https://slack.com/api`). The change routes Slack client construction, Socket Mode, Events API auth, outbound replies, and native streaming through the custom base URL. Onboarding and configuration fields have been updated accordingly.  
  [GitHub link](https://github.com/moltis-org/moltis/pull/1159)

- **PR #1157 (closed) – fix(web): support ACP-only chat setup**  
  *Author: penso* – Fixes a regression where a setup with only ACP (Agent Communication Protocol) agents but no LLM model resulted in an error. Now, ACP agents are shown during LLM onboarding, the session header picker correctly filters to ACP-capable agents, and an ACP agent is auto-selected when no LLM models exist. The bottom model selector is also disabled while an ACP agent is active.  
  [GitHub link](https://github.com/moltis-org/moltis/pull/1157)

Additionally, a new open PR introduces an experimental memory backend:

- **PR #1158 (open) – feat(memory): add zvec vector database memory backend**  
  *Author: demyanrogozhin* – Proposes an alternative memory backend based on Zvec and Redb, gated behind the `zvec` Cargo feature. The author describes it as an experimental “vibe-coded” setup paired with an independently run llama.cpp server for embeddings.  
  [GitHub link](https://github.com/moltis-org/moltis/pull/1158)

## 4. Community Hot Topics
The only issue updated in the last 24 hours is the most active:

- **Issue #574 (open) – [enhancement] [Feature]: Model Routing Per topic**  
  *Author: azharkov78* – Created on 2026-04-06, **4 comments**, 1 thumbs-up. The user proposes the ability to route conversations to different LLMs based on topic, effectively enabling topic-specific model selection. The feature request likely stems from a desire to optimise cost, latency, or quality by using specialised models for different domains.  
  [GitHub link](https://github.com/moltis-org/moltis/issues/574)

No other issue or PR attracted significant discussion or reactions today.

## 5. Bugs & Stability
No bug reports were updated or opened in the last 24 hours. The only fixes merged today (PR #1157) targeted a web UI regression for ACP-only setups, which appears to have been a minor stability improvement rather than a critical bug. No crashes or regressions were reported.

## 6. Feature Requests & Roadmap Signals
The standout feature request remains **Issue #574 (Model Routing Per Topic)**. With a lifespan of over three months and a recent update, it signals ongoing user interest in flexible model orchestration. This could become a candidate for the next minor release if the maintainers decide to prioritise it.

The open PR #1158 introducing the **zvec memory backend** suggests that the community is actively exploring alternative storage backends beyond the default. While experimental, it may influence future memory architecture decisions.

The merged features – Slack configurable API base URL (`#1159`) and ACP-only chat support (`#1157`) – are incremental enhancements rather than major roadmap shifts. However, they improve enterprise readiness (custom Slack endpoints) and edge-case handling.

## 7. User Feedback Summary
User feedback from the current activity is limited but insightful:

- **Model Routing (Issue #574):** The requesting user indicates a clear pain point – being forced to use a single LLM for all topics. This suggests that power users want to mix models (e.g., cheap/small models for simple queries, large models for complex reasoning) to balance cost and performance. The thumbs-up and comments indicate at least some resonance with the broader community.
- **Zvec backend (PR #1158):** While not a request, the author’s “vibe-coded” experiment shows a user-driven desire for more control over the memory layer, possibly for self-hosted or specialised setups. This aligns with the project’s open-source ethos.

No explicit satisfaction or dissatisfaction signals were observed beyond these two contributions.

## 8. Backlog Watch
- **Issue #574 (Model Routing Per Topic)** has been open since April 6 and was last updated today (July 19). Despite being a high-signal feature request with multiple comments, it lacks a maintainer response. This long-unanswered item may warrant attention to either accept, defer, or request further clarification.  
  [GitHub link](https://github.com/moltis-org/moltis/issues/574)

No other outstanding issues or PRs appear to be neglected; new PRs are fresh and receiving activity.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw Project Digest — 2026-07-19

## 1. Today's Overview
Activity remains moderate but focused. In the last 24 hours, 11 issues were updated (10 open, 1 closed) and 7 pull requests were updated (6 open, 1 merged). No new releases were published. The community is actively reporting regressions and surfacing configuration gaps, while maintainers responded with several targeted fix PRs. The overall project health is stable, though a handful of blocking bugs and long-standing requests warrant attention.

## 2. Releases
No new releases today. The latest tagged version remains **v2.0.0.post3** (post-release, 2026-07-17).

## 3. Project Progress
One pull request was merged today:

- **PR #1071** (feat: Introduce Mattermost channel integration) — Merged/closed after several months. Adds Mattermost as a new messaging channel, extending integration support. *(https://github.com/agentscope-ai/QwenPaw/pull/1071)*

Additionally, one issue was closed:

- **Issue #6240** (Bug: annotation showing at end of conversation) — A user-reported display bug on the console UI, likely fixed or dismissed. *(https://github.com/agentscope-ai/QwenPaw/issues/6240)*

## 4. Community Hot Topics
The most active items by comment count and community engagement:

- **#6240** (Bug: annotation showing at end of conversation) — 3 comments, closed. Underlying need: clean UI output without unwanted memory annotations leaked into chat. *(https://github.com/agentscope-ai/QwenPaw/issues/6240)*

- **#6246** (Bug: `_saved_tool_refs` crashes `recall_history` with `OSError: File name too long`) — 2 comments. A corner case where a long path from tool results breaks `os.stat()`. A fix PR (#6247) exists. *(https://github.com/agentscope-ai/QwenPaw/issues/6246)*

- **#6245** (Bug: Session permanently blocked when shell command exceeds coordinator deadline) — 2 comments. Regression from a previous fix (#6056); completely blocks the session. A fix PR (#6248) has been proposed. *(https://github.com/agentscope-ai/QwenPaw/issues/6245)*

- **#4641** (Bug: `qwenpaw env set` → subprocess can't see it) — 2 comments, opened May 23. Environment variables set mid-session are invisible to shell subprocesses. A related PR (#6251) adds `env get` and `env list --json`. *(https://github.com/agentscope-ai/QwenPaw/issues/4641)*

- **#6242** (Bug: Console embedding dimensions setting not sent to OpenAI-compatible APIs) — 2 comments. Missing `use_dimensions` toggle. Fix PR #6243 by a first-time contributor. *(https://github.com/agentscope-ai/QwenPaw/issues/6242)*

## 5. Bugs & Stability
Several bugs were reported today, ranked by severity:

**Critical — Session blocking / data loss**
- **#6245**: Shell command timeout permanently blocks the session. Regression from #6056. **Fix PR #6248** submitted. *(https://github.com/agentscope-ai/QwenPaw/issues/6245)*
- **#6246**: `recall_history(op="search")` crashes with `OSError: File name too long` when tool results contain long paths (e.g., git diff). **Fix PR #6247** submitted. *(https://github.com/agentscope-ai/QwenPaw/issues/6246)*
- **#6241**: Agent repeats identical output across multiple assistant turns and `memory_search` can enter an infinite loop. No fix PR yet; duplicate-detection warning exists but does not stop the loop. *(https://github.com/agentscope-ai/QwenPaw/issues/6241)*

**High — Configuration / integration errors**
- **#6242**: Embedding dimensions not sent to OpenAI-compatible APIs because `use_dimensions` is not exposed. **Fix PR #6243** (first-time contributor) submitted. *(https://github.com/agentscope-ai/QwenPaw/issues/6242)*
- **#6250**: Sandbox fallback hard-coded to ask for approval with no configuration to skip. *(https://github.com/agentscope-ai/QwenPaw/issues/6250)*
- **#6239**: Windows PATH concatenation drops semicolon between user and machine PATH, causing child processes to lose npm globals. *(https://github.com/agentscope-ai/QwenPaw/issues/6239)*

**Medium — Usability / startup issues**
- **#6249**: TUI stuck in "warming" state when running from source. *(https://github.com/agentscope-ai/QwenPaw/issues/6249)*

## 6. Feature Requests & Roadmap Signals
Notable user-requested features from today’s issues:

- **Memory isolation by project** (#6244) — A user proposes project-based memory scoping so that different tasks do not interfere. This aligns with common multi-project workflows and could appear in a future minor release. *(https://github.com/agentscope-ai/QwenPaw/issues/6244)*

- **Scriptable environment reads** (#4641 / PR #6251) — The `env get` and `env list --json` commands are already in a PR. Likely to land in the next patch. *(https://github.com/agentscope-ai/QwenPaw/pull/6251)*

- **Allow skipping sandbox-unavailable approval** (#6250) — User requests a configuration option. Possibly a `sandbox_fallback` policy setting in the next release. *(https://github.com/agentscope-ai/QwenPaw/issues/6250)*

## 7. User Feedback Summary
Real user pain points and use cases captured in today’s issues:

- **Session recoverability**: A shell command timeout causes a permanent block, forcing a restart. Users need graceful degradation or background continuation.
- **Memory recall fragility**: Long tool results crash history search. Users rely on `recall_history` for long-running sessions and find this destabilizing.
- **Environment variable transparency**: Mid-session `env set` values are invisible to subprocesses. Users scripting automation (e.g., API keys) need runtime access without restarting.
- **Embedding configuration confusion**: Console UI shows a dimension field but the setting is silently ignored for OpenAI-compatible APIs. Users expect WYSIWYG configuration.
- **Sandbox enforcement rigidity**: When sandbox is unavailable, users cannot bypass approval without turning off all approvals. A granular config is desired.
- **Windows PATH handling**: Developers on Windows lose npm/npx global commands because of a missing semicolon. Platform parity is a concern.

Overall satisfaction appears mixed—while many bugs are accompanied by fix PRs, the regression in #6245 and the infinite loop in #6241 are unsettling for production use.

## 8. Backlog Watch
Issues that have been open for an extended period or lack maintainer response:

- **#4641** (May 23, 2026) — `qwenpaw env set` → subprocess can't see it. Two comments but no maintainer assignment. The PR #6251 (opened today) may resolve this. Still, maintenance attention is needed to close the loop. *(https://github.com/agentscope-ai/QwenPaw/issues/4641)*

- **#6223** (Jul 17, 2026) — Release duty verification for v2.0.0.post3. This is a bot-created issue with a deadline of Jul 17; it has zero comments and remains open, possibly indicating the verification checklist was not completed. *(https://github.com/agentscope-ai/QwenPaw/issues/6223)*

No other issues older than one week with no response stand out.

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