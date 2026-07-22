# OpenClaw Ecosystem Digest 2026-07-22

> Issues: 500 | PRs: 500 | Projects covered: 13 | Generated: 2026-07-22 02:57 UTC

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

# OpenClaw Project Digest — 2026-07-22

## Today’s Overview

OpenClaw is in an **intense development phase**: 500 issues and 500 pull requests were updated in the last 24 hours, with 80% of issues still open (399 open) and two‑thirds of PRs still under review (334 open). **No new releases** were published today; the latest stable is still `2026.7.1` (tagged July 13). The project shows **high community engagement**—the top issues each have 9–15 comments—but also a **concerning number of P0/P1 regressions** that are blocking production use. Maintainers are active, with several large refactoring PRs (e.g., config‑surface reduction, dependency refresh) moving through review. The overall health is **mixed**: strong feature velocity and security awareness, but stability gaps on macOS and with certain LLM backends are hurting user trust.

## Releases

*None.* The most recent release remains `2026.7.1` (July 13, 2026). No new tags, changelogs, or migration notes were created in the past 24h.

## Project Progress

In the last 24 hours, **166 PRs were merged or closed** (out of 500 updated). Notable closures include:

- **#98437** (closed, stale) – *MCP loopback bundle emits thousands of conflicting schema definitions warnings* – consolidated at build time.
- **#102296** (closed) – *Add plan‑first Claw status and remove* – precursor to the export feature in #102306.
- **#103895** (closed) – *feat(slack): support Agent View* – fixes lost visibility in Slack AI conversations.
- **#112357** (closed) – *fix(ui): keep chat author identity readable* – improves shared thread readability.
- **#112433** (closed) – *fix(ui): allow direct sessions in non‑Git folders* – unblocks bootstrap workflows.

Several new PRs were opened today that advance important areas:

- **#112458** – Forward selected Anthropic profiles to Claude CLI.
- **#112480** – Emit sanitized `authType` on successful model calls for diagnostics.
- **#112482** – Provision pinned TruffleHog for CI secret scanning.
- **#112478** – Fix gateway startup crash on virtiofs/Kata filesystems with large inode numbers.
- **#112401** – Manage DM pairing requests in the Web UI (large UX improvement).
- **#112442** – Accessible image lightbox in Control UI.

## Community Hot Topics

The most active issues (by comment count) reveal deep user concerns around security, reliability, and configuration complexity:

1. **#10659** (15 comments, 4 👍) – *Masked Secrets: Prevent Agent from Accessing Raw API Keys*  
   **Need:** Systematic credential protection against prompt injection. This is the highest‑voted open feature request and reflects growing enterprise adoption.

2. **#101290** (13 comments, 1 👍) – *CLI startup preflight corrupts live state DB on macOS (P0 regression)*  
   **Need:** Ensuring basic gateway operation does not corrupt SQLite. Already reproduced four times in one week; users losing session data.

3. **#86996** (11 comments, 2 👍) – *Active Memory + Codex app‑server path causes long latency, hang, and event‑loop stalls*  
   **Need:** Reliable performance with modern memory backends. Affects Telegram users who experience minutes‑long delays.

4. **#85030** (11 comments, 5 👍) – *MCP tools not injected into subagent sessions*  
   **Need:** Tool schema propagation for multi‑agent setups. Highly upvoted (5 👍), blocking complex workflows.

5. **#106779** (11 comments, 2 👍) – *2026.7.1 fails with local llama.cpp (parser generation error)*  
   **Need:** Compatibility with self‑hosted models. A release regression that broke an important use case for privacy‑conscious users.

**Underlying themes:** Security hardening (secrets, tool permissions, OAuth token binding) and session reliability (state corruption, tool parameter dropping, delivery queue TTL) dominate the conversation.

## Bugs & Stability

| Issue | Severity | Problem | Fix PR Exists? |
|-------|----------|---------|----------------|
| #101290 | **P0** (regression) | CLI startup preflight corrupts `openclaw.sqlite` on macOS while gateway is running | No |
| #95612 | **P1** | `cli-backend` agent returns 401 against Anthropic despite working `claude` shell invocation | #112458 (open) |
| #53408 | **P1** | `write`/`exec` tool parameters silently dropped after long conversations | No |
| #90840 | **P1** (regression) | Subagent raw output delivered to chat instead of parent summary | No |
| #95441 | **P1** | `thinkingSignature`/`encrypted_content` persist after fixes on `gpt‑5.5` | No |
| #88562 | **P1** | `models.json` generator writes `apiKey` as plain string instead of secret‑ref object | No |
| #108473 | **P1** (regression) | `cron` tool schema breaks llama.cpp tool‑calling (unanchored regex pattern) | No |
| #111498 | **P1** (regression) | Main agent blocked by persistent workspace‑state migration after Anthropic auth recovery | No |
| #105806 | – | Fix PR open for stuck‑session reply‑run recovery (#105806) | Yes (open) |
| #112305 | – | OpenShell mirror sandboxes can modify workspace skill files despite read‑only policy | Yes (#112305 open) |

**Notable:** Three P0/P1 regressions have no fix PR yet – the database corruption (#101290), tool parameter dropping (#53408), and subagent routing (#90840) are the most critical blockers for production deployments.

## Feature Requests & Roadmap Signals

The highest‑impact feature requests (by comment count, upvotes, or security rating) are likely to land in the next minor release (2026.7.2 or 2026.8.0):

- **#10659** – Masked Secrets (🦞 diamond lobster, 4 👍) – top security priority.
- **#7722** – Filesystem Sandboxing Config `tools.fileAccess` (🦞 diamond lobster, 4 👍) – already has partial implementation.
- **#14785** – Reduce tool schema token overhead (~3,500 tok/session) – a UX and cost win.
- **#13616** – Backup/restore utility for config, cron jobs, and session history.
- **#20786** – Telegram Business Bot support (6 👍) – strong enterprise interest.
- **#16670** – Onboarding Wizard should include Memory/Embedding setup (1 👍, but high‑impact for new users).
- **#13700** – Session snapshots (`/session save|load`) – power‑user demand.
- **#13364** – Expose `before_tool_call`/`after_tool_call` hooks for managed security.
- **#84527** – Add Antigravity CLI (`agy`) as CLI backend (11 👍) – urgent, as Google Gemini CLI is being deprecated.
- **#14438** – Plugin hot‑reload (4 👍) – developer quality‑of‑life.
- **#9409** – Improve context overflow error message (3 👍, UX friction).

**Prediction:** Masked Secrets (#10659) and Antigravity CLI (#84527) are the most likely to ship next due to their security urgency and external deadline. The config‑surface reduction PR (#111527, in review) will likely be a major change in the next release.

## User Feedback Summary

**Common pain points (direct quotes from issues):**

- *“openclaw.sqlite corrupted four times over 2026‑07‑02 → 2026‑07‑06 while the gateway was running normally”* – reliability on macOS.
- *“After extended conversations, the `write` and `exec` tools begin silently dropping all parameters”* – long‑session stability.
- *“MCP tool schemas registered via `mcp.servers` are not injected into spawned sessions”* – multi‑agent tool isolation.
- *“When the model produces interleaved text and tool_use blocks, each text block is sent as a separate outbound message”* – message fragmentation.
- *“The onboarding wizard doesn't mention embedding provider configuration at all”* – missing memory setup step.
- *“Currently, secrets stored in `~/.openclaw/.env` are fully accessible to the agent”* – security concern for API key leaks.

**Satisfaction signals:** Users appreciate the active community (many upvotes, detailed bug reports) and the maintainers’ responsiveness (PRs opened the same day for several critical fixes). However, **release quality** is a recurring concern – the `2026.7.1` release broke llama.cpp support (#106779) and introduced database corruption (#101290).

## Backlog Watch

Several important issues and PRs have been open for **months** with no maintainer sign‑off or fix:

- **#10659** (Feb 6) – Masked Secrets – P1, diamond lobster rating, *needs‑maintainer‑review* and *needs‑product‑decision*.
- **#7722** (Feb 3) – Filesystem Sandboxing – same stale labels.
- **#14785** (Feb 12) – Reduce tool schema overhead – labelled *fix‑shape‑clear* but *needs‑product‑decision*.
- **#13616** (Feb 10) – Backup/restore utility – stale.
- **#20786** (Feb 19) – Telegram Business Bot – *linked‑pr‑open* but no movement in 5 months.
- **#16670** (Feb 15) – Onboarding memory step – *needs‑product‑decision*.
- **#8299** (Feb 3) – Suppress sub‑agent announce – *needs‑product‑decision*.
- **#12855** (Feb 9) – Auto‑update with confirmation – *needs‑security‑review*.
- **#89985** (Jun 3) – *fix(update): preserve local package overrides* – **PR in limbo** for 7 weeks, despite being ready for maintainer look.

**Action items for maintainers:** These long‑pending requests are blocking the community from moving forward on security and usability. Many have *needs‑product‑decision* label, suggesting internal discussions are stalling. A clear roadmap or decision deadline would improve project transparency.

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report: Personal AI Assistant Open-Source Ecosystem

## 1. Ecosystem Overview

The personal AI assistant open-source landscape is experiencing an intense development phase, driven by the convergence of multi-agent architectures, security hardening demands, and expanding channel integrations. Across the tracked projects, **over 1,100 issues and 1,200 pull requests** were updated in the last 24 hours, signaling both rapid innovation and emerging stability concerns as projects transition from experimental to production-ready. A clear pattern is emerging: **security, session reliability, and local-model performance** are the dominant pain points, while **goal-mode autonomy and channel expansion** represent the primary growth vectors. The ecosystem is bifurcating between mature projects preparing for v1 releases (IronClaw) and those still in rapid feature-iteration phases (OpenClaw, CoPaw, Zeroclaw), with several smaller projects showing maintenance-level activity or dormancy.

## 2. Activity Comparison

| Project | Issues Updated | PRs Updated | Release Status | Health Score* |
|---------|---------------|-------------|----------------|---------------|
| **OpenClaw** | 500 (399 open) | 500 (334 open) | Stable: 2026.7.1 (Jul 13) | ⚠️ Mixed |
| **NanoBot** | 10 (0 open) | 32 (10 open) | No release | ✅ Strong |
| **Zeroclaw** | 50 (47 open) | 50 (41 open) | No release | ✅ Strong |
| **PicoClaw** | 6 (4 open) | 8 (5 open) | No release | ⚠️ Moderate |
| **NanoClaw** | 1 (1 open) | 12 (9 open) | No release | ✅ Strong |
| **NullClaw** | 0 | 0 | N/A | 💤 Inactive |
| **IronClaw** | 41 (27 open) | 50 (33 open) | RC: v1.0.0-rc.1 (Jul 20) | ✅ Strong |
| **LobsterAI** | 1 (1 open) | 10 (5 open) | No release | ✅ Strong |
| **TinyClaw** | 0 | 0 | N/A | 💤 Inactive |
| **Moltis** | 1 (1 open) | 1 (1 open) | No release | ⚠️ Low |
| **CoPaw** | 40 (19 open) | 50 (21 open) | Patch: v2.0.1-beta.1 (today) | ✅ Strong |
| **ZeptoClaw** | 0 | 0 | N/A | 💤 Inactive |
| **EasyClaw** | 0 | 0 | 2 releases today (v1.8.78, v1.8.79) | ✅ Stable |

*Health Score: Strong (active maintainers, balanced open/closed ratio, responsive fixes) / Mixed (high activity but critical regressions) / Moderate (slow but steady) / Low (minimal engagement) / Inactive (no activity)

## 3. OpenClaw's Position

**Advantages Over Peers:**
- **Largest community engagement**: 500 issues and 500 PRs updated in 24h—4-10x higher than any peer—indicating the broadest adoption and contributor base
- **Mature release pipeline**: Latest stable release (2026.7.1) with clear versioning, whereas peers like Zeroclaw, CoPaw, and NanoBot remain in pre-release or no-release states
- **Strongest security awareness**: Masked Secrets (#10659) is the highest-voted feature request (4 👍, 15 comments), and P0/P1 regressions are transparently tracked with maintainer engagement
- **Broadest MCP ecosystem support**: Dedicated tool schema and MCP loopback bundle handling (#98437) that peers haven't yet addressed

**Technical Approach Differences:**
- **Config-surface reduction PR (#111527)** is a unique architectural simplification effort not seen in other projects, aiming to reduce complexity for end-users
- **Separate gateway/CLI architecture** with `claw` vs `openclaw` distinction provides cleaner separation than monolithic designs in CoPaw or PicoClaw
- **Scheduled cron-based tool execution** (mentioned in #108473) offers deterministic automation capabilities absent in most peers

**Community Size Comparison:**
- OpenClaw's 500 issue/PR updates dramatically exceed Zeroclaw (50/50), CoPaw (40/50), and IronClaw (41/50)
- However, OpenClaw's **80% open issue rate** (399/500) and **67% open PR rate** (334/500) signal **maintainer throughput challenges**—issues age unaddressed, with several P0/P1 regressions lacking any fix PR
- In contrast, NanoBot (0 open issues from period) and CoPaw (48% issues closed in period) show higher per-issue resolution rates despite smaller absolute numbers

## 4. Shared Technical Focus Areas

| Focus Area | Affected Projects | Specific Needs |
|------------|------------------|----------------|
| **Security Hardening** | OpenClaw, Zeroclaw, NanoBot, PicoClaw | Masked secrets (#10659/O, #4803/N), filesystem sandboxing (#7722/O, #9247/Z), shell execution confirmation (#5013/N), SSRF protection (#8826/Z) |
| **Session Reliability** | OpenClaw, Zeroclaw, CoPaw, PicoClaw | State database corruption (#101290/O), unbounded message growth (#4787/N), session deletion persistence (#6299/C), Matrix reconnection logic (#3203/P) |
| **Multi-Agent Tool Propagation** | OpenClaw, Zeroclaw | MCP tools not injected to subagents (#85030/O), delegate bypasses parent tool allowlist (#8279/Z) |
| **Local Model Performance** | NanoBot, OpenClaw, CoPaw | Prompt prefix caching for Ollama (#4867/N), llama.cpp compatibility (#106779/O), v2.0 overhead regression (#6307/C) |
| **Channel Expansion & Reliability** | PicoClaw, Zeroclaw, NanoClaw | Telegram URL parsing (#3111/NC), Matrix sync reconnection (#3203/P), WhatsApp media staging (#3113/NC) |
| **Observability & Diagnostics** | IronClaw, NanoClaw, LobsterAI | QA trace harvesting (#6422/I), Langfuse tracing skill (#3114/NC), gateway diagnostics (#v1.8.78/E) |

## 5. Differentiation Analysis

| Dimension | OpenClaw | IronClaw | Zeroclaw | CoPaw | NanoBot | PicoClaw | LobsterAI |
|-----------|----------|----------|----------|-------|---------|----------|-----------|
| **Primary Focus** | Broad reference implementation | Ground-up Reborn architecture | Security-first, goal mode | Channel-rich, workflow automation | Local model optimization | Matrix/Telegram specialist | Desktop UX, artifacts |
| **Target User** | Enterprise developers | Power users, QA teams | Security-audited deployments | Multi-channel operators | Privacy-conscious individuals | 24/7 service operators | End-user desktop |
| **Architecture** | Gateway + CLI separate | Monolithic Reborn crate | Pre-release, fast iteration | Python/Tauri hybrid | Lightweight agent | Focused channel agent | Renderer-focused |
| **Release Maturity** | Stable (2026.7.1) | Release candidate (v1.0.0-rc.1) | Pre-release | Beta (v2.0.1-beta.1) | No release | No release | No release (2 releases today) |
| **Key Risk** | Maintainer bandwidth | Architecture migration risk | Security bypasses still open | v2.x regression debt | Performance gaps | Stale backlog | Narrow scope |
| **Unique Strength** | Largest ecosystem, MCP support | Formalized witness architecture | Goal mode, eval dashboard | GUI automation, script-to-video | Quick vulnerability fixes | Policy-gated execution | Silent Windows updates |

**Key Distinctions:**
- **OpenClaw** is the most comprehensive but struggles with maintainer throughput—it's the "kitchen sink" reference that others fork or simplify
- **IronClaw** is executing the most radical architectural overhaul (Reborn), sacrificing incremental compatibility for long-term correctness
- **Zeroclaw** is the most security-conscious, with dedicated RFCs for structured audits (#9086) and S0 severity tracking for sandbox escapes
- **CoPaw** has the strongest channel support (Feishu, Telegram, DragonBot) and unique features like Scroll context management
- **NanoBot** shows the fastest fix-to-bug turnaround (all 10 issues closed in 24h) but is most vulnerable to local-model performance gaps
- **PicoClaw** and **NanoClaw** are niche specialists (Matrix/LINE respectively) with limited feature breadth
- **EasyClaw** is the outlier: no community engagement but active release cadence, suggesting a closed/internal development model

## 6. Community Momentum & Maturity

**Tier 1: Rapid Iteration (high churn, many open PRs)**
- **OpenClaw**: Highest absolute activity but maintainer bottlenecks; 67% PRs open suggests review queue is growing faster than throughput
- **Zeroclaw**: 82% issues open, 82% PRs open—very early in lifecycle but high-velocity contribution pipeline
- **IronClaw**: 66% issues open, 66% PRs open—intense Reborn consolidation sprint; v1.0.0-rc.1 signals impending stabilization
- **CoPaw**: 48% issues closed in period, patch release shipped today—best balance of feature velocity and bug fixing

**Tier 2: Steady State (moderate activity, responsive maintainers)**
- **NanoBot**: All 10 issues closed, 22/32 PRs merged—efficient triage; healthiest open/closed ratio
- **LobsterAI**: 5/10 PRs merged/closed, active feature work (Windows updates, artifacts)
- **PicoClaw**: Moderate activity but 43-day stale high-priority issue (#3088) signals engagement risk
- **NanoClaw**: 3/12 PRs merged, channel expansions progressing; maintainer review needed for old PRs (#1530, 116 days)

**Tier 3: Maintenance/Low Activity**
- **EasyClaw**: No issue/PR activity but consistent releases—likely closed development
- **Moltis**: Single issue (3.5 months stale), single dependabot PR—near-dormant
- **NullClaw, TinyClaw, ZeptoClaw**: No activity; effectively inactive

**Maturity Progression Signal**: The ecosystem is transitioning from "build anything" to "stabilize for production." IronClaw's Reborn represents the most aggressive maturity push, while OpenClaw's P0/P1 regression backlog suggests the cost of rapid feature expansion without parallel stabilization investment.

## 7. Trend Signals

**1. Security is the Primary Adoption Barrier**
Across 6 of 8 active projects, secret management, sandbox escapes, and credential leakage are the top-voted issues. The ecosystem is discovering that naive agent architecture (where agents can read `.env` files) is incompatible with enterprise deployment. **Action for developers**: Implement credential masking and tool-level permission RBAC before production rollout.

**2. Local Model Performance is a Dealbreaker**
NanoBot (#4867) reports 60s+ per-turn overhead with Ollama; OpenClaw's llama.cpp regression (#106779) broke self-hosted users; CoPaw's v2.0 adds 2s fixed overhead per reply. **Signal:** Users will abandon projects that don't optimize for local inference. Prompt caching and efficient token management are becoming table stakes.

**3. Multi-Agent Orchestration Gaps are Universal**
Tool schema propagation to subagents (OpenClaw #85030, Zeroclaw #8279) and goal-mode autonomy (Zeroclaw #8303, NanoBot #5022) are unsolved across projects. **Opportunity:** A shared protocol or library for multi-agent tool delegation could serve the entire ecosystem.

**4. Channel Expansion is Commoditizing**
Telegram, Matrix, Feishu, WhatsApp, LINE, Dial—the number of channels is growing faster than any single project can maintain. PicoClaw's Matrix reconnection bug (#3203) and NanoClaw's Telegram URL issue (#3111) demonstrate that channel reliability is more critical than channel count.

**5. Architectural Consolidation is Imminent**
IronClaw's Reborn (removing in-memory stores, formalizing witness-based dispatch) and OpenClaw's config-surface reduction (#111527) both point toward **simplification** after a period of feature complexity. The ecosystem is recognizing that maintainability requires reducing internal surface area.

**6. Observability is Becoming Infrastructure**
Langfuse tracing (NanoClaw #3114), QA trace harvesting (IronClaw #6422), and gateway diagnostics (EasyClaw v1.8.78) show a shift from "agent works on my machine" to "agent must be observable in production." **Implication:** AI agent developers should invest in telemetry infrastructure early.

**7. Cross-Platform Gaps Persist**
macOS SQLite corruption (OpenClaw #101290), SELinux volume mounts (NanoClaw #1530), and Windows PowerShell support (Zeroclaw #9182) reveal that Linux-first development creates real friction for Windows/macOS users. **Recommendation:** CI testing should cover at least macOS and Windows for projects targeting enterprise adoption.

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot Project Digest – 2026-07-22

## 1. Today's Overview

Over the past 24 hours, NanoBot saw exceptionally high development activity: **10 issues were all closed** (no open issues remain from the period), and **32 pull requests were updated**, with **22 merged/closed** and **10 still open**. No new releases were cut. The closure of a broad cluster of stability, security, and protocol bugs — including plaintext credential storage, unbounded memory growth, orphaned child processes, and malformed tool-result states — suggests a focused hardening sprint. Meanwhile, several open feature PRs (model presets, shell‑execution confirmation, tool gateway seams) point toward upcoming enhancements. Overall project health is strong, with maintainers actively triaging and resolving high‑priority issues.

## 2. Releases

*None in this period.*

## 3. Project Progress – Merged/Closed PRs

The 22 merged/closed PRs advanced the project in several axes:

**Bug fixes merged:**
- **#5023** – Fix Qwen model‑level thinking style mapping for providers without a default (OpenRouter, custom endpoints).  
- **#4663** – Quarantine invalid tool results (missing, empty, duplicate, unknown) before provider replay; fixes #4058.  
- **#4952** – Sanitize UTF‑16 surrogate pairs at the provider request boundary to prevent `UnicodeEncodeError` on emoji‑heavy content.  
- **#4983** – Coerce string timestamps in `jobs.json` to avoid `TypeError` when comparing schedule fields.  
- **#4984** – Write `config.json` atomically (temp+replace) to prevent truncated files on crash.  
- **#4989** – Resolve `${VAR}` environment references in transcription API key/base.  
- **#4811** – Log suppressed `prepare_call()` exceptions instead of silently swallowing them.  
- **#5010** – Update `SECURITY.md` to recommend environment‑variable references over plaintext keys.

**Features merged:**
- **#4965** – Add **ModelScope** as a built‑in provider via its OpenAI‑compatible endpoint (supports Qwen, DeepSeek, GLM, etc.).  
- **#5019** – Support **Codex Fast mode** (pass `service_tier: "priority"` through the Codex provider).  
- **#5020** – Highlight available `$skillname` references in sent messages within the WebUI.

**Documentation and other closed PRs:**  
Improvements to security docs, transcription env‑var resolution, and tool‑result repair logic.

## 4. Community Hot Topics

### Most commented issue
- **[#4867 – [enhancement] Preserve exact prompt prefix to enable caching in Ollama and others](HKUDS/nanobot Issue #4867)** – 22 comments.  
  The author reports that NanoBot adds ~60 seconds per turn when using Ollama, making it “totally unusable” even with 32 GB VRAM. The discussion explores prompt‑prefix caching to avoid recomputation. High community interest reflects strong demand for local‑model performance.

### Notable enhancement issue
- **[#4911 – A guarded tool gateway seam so channels can run the agent's tools](HKUDS/nanobot Issue #4911)** – 1 like.  
  A channel currently has no path to invoke the agent’s tools (e.g., for real‑time voice). This request aligns with the ongoing work to make NanoBot extensible beyond plain‑text channels.

### Active open PR with design implications
- **[#4866 – feat(agent): bind model presets to sessions](HKUDS/nanobot PR #4866)** – new since July 10, still open.  
  Persisting model‑preset overrides per session is a significant architectural change, enabling per‑conversation model selection. Its prolonged review suggests careful consideration of the runtime implications.

## 5. Bugs & Stability

Several critical and high‑priority bugs were reported and fixed in this period:

| Severity | Issue | Summary | Fix Status |
|----------|-------|---------|------------|
| **P0 – Security** | [#4803](HKUDS/nanobot Issue #4803) | API keys stored as plaintext in `config.json`; `repr=False` does not prevent serialization. | Fixed by PR #4984 (atomic write) & docs update #5010; plaintext still possible but now documented alternative. |
| **P0 – Data Loss** | [#4787](HKUDS/nanobot Issue #4787) | `Session.messages` list grows unboundedly; `FILE_MAX_MESSAGES` only limits replay, not storage. | PR #4663 also sanitizes tool results, but unbounded list fix not yet merged. |
| **P1 – Crashes** | [#4785](HKUDS/nanobot Issue #4785) | `read_file` loads entire file into memory before truncation – OOM on multi‑GB files. | Under review (PR #4987 addresses workspace checks, not this directly). |
| **P1 – Process Leak** | [#4794](HKUDS/nanobot Issue #4794) | No shutdown cleanup for exec sessions; child processes become orphans. | Fix in open PR #5021 (cascade exec termination on `/stop`). |
| **P1 – Logic** | [#4788](HKUDS/nanobot Issue #4788) | `except BaseException` catches `KeyboardInterrupt` and `SystemExit`. | Fixed by PR #4811 (replaces silent suppress). |
| **P1 – UX** | [#4934](HKUDS/nanobot Issue #4934) | Qwen models expose thinking/reasoning content in chat responses. | Fixed by PR #5023 (model‑level thinking style). |
| **P2 – Security** | [#5013](HKUDS/nanobot Issue #5013) | Shell commands execute without user confirmation. | Enhancement request, no fix PR yet. |

Other closed bugs include tool‑result protocol repair ([#4058](HKUDS/nanobot Issue #4058), fixed by #4663) and orphan tool‑call states.

## 6. Feature Requests & Roadmap Signals

The following user‑requested features are likely to appear in the next release:

- **Prompt‑prefix caching for local models** (#4867) – Essential for Ollama usability; actively discussed.
- **User confirmation before shell execution** (#5013) – Adds a middleware/confirmation step, similar to LangChain’s human‑in‑the‑loop.
- **Tool gateway seam for channels** (#4911) – Enables voice and other non‑text channels to invoke tools securely.
- **`/cancel-goal` command** (PR #5022) – Breaks sustained‑goal loops that ignore user “stop” instructions.
- **Model presets per session** (PR #4866) – Allows per‑conversation model switching, improving flexibility.

Additionally, PR #4399 (hidden WebUI settings sections) and PR #5018 (explicit skill context loading) indicate growing demand for administrative control and predictable skill injection.

## 7. User Feedback Summary

Real user pain points voiced in this period:

- **Performance with local models**: “Nanobot adds an extra 60 seconds to every single turn … totally unusable with Ollama” (#4867).
- **Security concerns**: API keys stored in plaintext (#4803) and shell commands without confirmation (#5013) raise trust issues.
- **Process leakage**: Long‑running sessions leave orphaned child processes, accumulating across restarts (#4794).
- **Content leakage**: Qwen models expose internal reasoning text in chat (#4934) – confusing and potentially privacy‑sensitive.
- **Tool protocol fragility**: Invalid tool results cause model loops (#4058) and duplicate states persist.
- **Unbounded memory**: Session message lists grow forever (#4787), impacting long‑running or unified sessions.

Overall sentiment: users value NanoBot’s capabilities but are frustrated by stability and security gaps that hinder production use. The flurry of fixes and proactive documentation (SECURITY.md update) signals responsiveness.

## 8. Backlog Watch

The following open items have been awaiting maintainer attention for an extended period or carry unresolved conflicts:

| Item | Since | Issue |
|------|-------|-------|
| PR #4399 – Hidden WebUI settings sections | 2026-06-18 | Open, conflict; simplifies UI for non‑technical users. |
| PR #4594 – Fix shell guard for `=`‑delimited paths | 2026-06-29 | Open; bypasses workspace containment for commands like `curl --output=/etc/passwd`. |
| PR #4963 – Polish agent output and app discovery | 2026-07-17 | Open, conflict; large change touching many UI components. |
| PR #4987 – Bind workspace checks to opened files | 2026-07-19 | Open, conflict; addresses OOM and symlink attacks in file tools. |
| Issue #4787 – Unbounded session messages | 2026-07-06 | Closed? (No fix PR merged yet); reopened? – needs confirmation. |
| Issue #4794 – Orphan child processes | 2026-07-06 | Fix in open PR #5021, but not yet merged. |

These items represent important reliability and usability improvements that have stalled due to complexity or conflicts. The project’s recent momentum suggests they may be resolved in the coming weeks.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw Project Digest — 2026-07-22

## Today’s Overview

Zeroclaw continues at high velocity: **50 issues and 50 pull requests updated in the last 24 hours**, with 3 issues closed and 9 PRs merged or closed. The project remains heavily focused on security hardening, channel reliability, and architecture expansion (goal mode, OpenAI compatibility, remote session backends). No new releases were cut today; all activity is in pre-release development on `master`. The volume of open work (47 open issues, 41 open PRs) signals a team actively absorbing user feedback while pushing several large feature stacks toward completion.

---

## Releases

*None today.*

---

## Project Progress

Nine pull requests were merged or closed in the last 24 hours. While the top-20 PR list by comment count shows only open PRs, the backend data confirms churn in the following areas (inferred from related closed issues and recent PR merges):

- **Issue #7082** (feat(channel/mattermost): WebSocket listener mode) was closed — likely merged or superseded.
- **Issue #9120** (SOP routing `when`/`switch` bug) was closed, indicating a fix landed (likely via PR #8771 or a follow-up).
- **Issue #9086** (Structured Security Audit Pipeline RFC) was closed, possibly superseded or integrated into other security work.

Recent PRs showing strong forward motion:
- **PR #9250** (MySQL/MariaDB session persistence backend) opened today, building on the shared foundation from **PR #9249** (session-backend infrastructure). Together they deliver a critical piece of the remote persistence roadmap.
- **PR #9248** (Eval run-history receipts) adds append-only history for trend analysis — a direct response to **#9228** (eval dashboard).
- **PR #9182** (PowerShell native shell on Windows) addresses a long-standing config ignore on Windows.

---

## Community Hot Topics

### Most Active Issues (by comment count)

1. **[Feature]: Add typed per-agent git identity for built-in git operations** (#8226) — 6 comments  
   *Underlying need*: Users require multi-tenant identity and credential isolation for git tools used across agents. The proposed `runtime_context` block and `runtime_secrets` mask aim to solve this without leaking secrets.
2. **[Bug]: Telegram channel cannot be configured** (#8505) — 6 comments  
   *Underlying need*: Quickstart and `zerocode` channel doctor fail to set up Telegram, leaving bots unresponsive. Users are blocked on a core communication channel; S1 severity assigned.
3. **RFC: Goal mode for bounded autonomous session work** (#8303) — 4 comments  
   *Underlying need*: Users want a first-class “objective” mode that runs autonomously until completion, pause, or budget exhaustion. This is a top roadmap signal with 1 👍 and multiple dependent PRs already in flight.

### Most Active Pull Requests (by recency & cross-reference)

- **PR #9250** (MySQL+MariaDB backends) — fresh today, zero comments yet but directly referenced from #6893.
- **PR #8486** (OpenAI chat completions endpoint) — still open after 23 days, with related RFC #8603 and gateway team attention.
- **PR #8746** (fix goal self-resume loops) — large stacked PR (XL size) with multiple cross-linked issues; key to goal stability.
- **PR #9249** (session-backend foundation) — landed the plumbing reviewed across five backend PRs.

---

## Bugs & Stability

### Critical Bugs Reported in Last 24h

| Issue | Severity | Summary | Fix PR? |
|-------|----------|---------|---------|
| [#9247](https://github.com/zeroclaw-labs/zeroclaw/issues/9247) | **S0 – data loss / security risk** | Shell tool does not enforce workspace boundary; symlinks can escape the sandbox. Reported 2026-07-21. | None yet |
| [#9240](https://github.com/zeroclaw-labs/zeroclaw/issues/9240) | *unranked* (likely S2) | `Config::save_dirty()` silently drops writes when map keys contain dots (e.g., `gpt-4.1`, `claude-3.5-sonnet`). | None yet |

### Ongoing High-Priority Bugs (Updated in Last 24h)

- [#8642](https://github.com/zeroclaw-labs/zeroclaw/issues/8642) – MCP/tool-schema cloning causes unbounded RSS growth (S0 risk, split from OOM tracker #5542). Fix in progress.
- [#8731](https://github.com/zeroclaw-labs/zeroclaw/issues/8731) – Stdio-based MCP servers accumulate as zombie processes (S2). In progress.
- [#8279](https://github.com/zeroclaw-labs/zeroclaw/issues/8279) – Delegate bypasses parent tool allowlist (S0 security risk). No fix PR yet.
- [#8718](https://github.com/zeroclaw-labs/zeroclaw/issues/8718) – `zeroclaw config init` writes broken `local_whisper` defaults, silently disabling transcription. Fix **PR #8751** is open.

### Recent Fixes Landed

- PR #8751 (LocalWhisper config defaults) — addresses #8718.
- PR #8826 (image_gen SSRF gate) — closes an SSRF vector in fal.ai integration.
- PR #8713 (file_download SSRF gate) — adds `allowed_private_hosts` opt-in.
- PR #9180 (QQ channel msg_id propagation) — fixes group reply permissions.

---

## Feature Requests & Roadmap Signals

### High-Impact Requests with Active PRs

| Issue | Feature | Status | Likelihood for Next Release |
|-------|---------|--------|----------------------------|
| [#8303](https://github.com/zeroclaw-labs/zeroclaw/issues/8303) | Goal mode for bounded autonomous sessions | Multiple stacked PRs open (#8687, #8688, #8689, #8746, #8996) | **Very likely** – goal controller, verifier, tools, and channel admission are under active review. |
| [#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603) | OpenAI Chat Completions compatibility adapter | PR #8486 open (XL size, needs-author-action) | **Likely** – core gateway feature requested by Open WebUI, LobeChat users. |
| [#9250](https://github.com/zeroclaw-labs/zeroclaw/pull/9250) | MySQL/MariaDB session persistence | Just opened, building on #9249 | **Likely** – part of the session-backend serial, high demand for remote DB backends. |
| [#8600](https://github.com/zeroclaw-labs/zeroclaw/issues/8600) | Easy per-chat model switching for multi-model providers | No PR yet, but 1 👍 | **Possible** – users migrating from Moltis request this parity. |
| [#8780](https://github.com/zeroclaw-labs/zeroclaw/issues/8780) | Gemini Live realtime speech-to-speech channel | RFC accepted, no PR yet | **Possible** – innovative but complex; depends on provider plugin framework. |

### Other Noteworthy RFCs

- [#8396](https://github.com/zeroclaw-labs/zeroclaw/issues/8396) – Make wire protocol first-class in provider construction.
- [#8568](https://github.com/zeroclaw-labs/zeroclaw/issues/8568) – Mixture-of-Agents virtual model provider.
- [#8583](https://github.com/zeroclaw-labs/zeroclaw/issues/8583) – Channel/source shared-boundary cleanup tracker.
- [#8288](https://github.com/zeroclaw-labs/zeroclaw/issues/8288) – SOP milestone tracker (daemon-owned control plane to 5/5).

---

## User Feedback Summary

### Pain Points

- **Telegram channel broken** – Quickstart and `channels doctor` fail to detect setup; bot unresponsive. Users report workflow blocked.
- **Documentation errors** – Telegram and general docs contain incorrect examples, causing confusion (#8810, #8587).
- **Config init broken** – Fresh installs get silent transcription failures due to bad defaults (#8718).
- **Security bypasses** – Shell tool sandbox escape (#9247), delegate allowlist bypass (#8279), SSRF in image_gen (#8826) – users and audit teams flag these as critical.
- **Memory/resource leaks** – MCP schema cloning leads to OOM (#8642), zombie sub-processes (#8731) degrade long-running instances.

### Satisfaction Signals

- **Goal mode enthusiasm** – Multiple comments and 👍 on #8303 show strong appetite for autonomous session control.
- **OpenAI adapter demand** – Users of Open WebUI and LobeChat explicitly request OpenAI-compatible API (#8603, #8486).
- **Eval dashboard** – Community member @IftekharUddin contributing trend tracking (#9228, #9248), indicating engaged power users.

---

## Backlog Watch

The following high-severity or strategically important items have languished or lack maintainer response:

- [#8226](https://github.com/zeroclaw-labs/zeroclaw/issues/8226) – Typed per-agent git identity (open 29 days, 6 comments, P2) — no PR yet despite clear use case for multi-tenant deployments.
- [#8279](https://github.com/zeroclaw-labs/zeroclaw/issues/8279) – Delegate allowlist bypass (S0, open 28 days) — critical security bug with no proposed fix.
- [#8642](https://github.com/zeroclaw-labs/zeroclaw/issues/8642) – MCP memory leak (S0, open 19 days) — fix in progress but not merged.
- [#8731](https://github.com/zeroclaw-labs/zeroclaw/issues/8731) – Zombie MCP processes (S2, open 17 days) — fix in progress.
- [#8309](https://github.com/zeroclaw-labs/zeroclaw/issues/8309) – SkillForge orphaned (open 27 days) — no decision on wiring vs removal.
- [#8396](https://github.com/zeroclaw-labs/zeroclaw/issues/8396) – Wire protocol RFC (open 25 days) — no PR started.
- [#8600](https://github.com/zeroclaw-labs/zeroclaw/issues/8600) – Multi-model switching (open 21 days) — the sole 👍 indicates interest but no maintainer traction.

**Maintainer attention needed** on the S0 security issues (#8279, #8642) and the stalled but popular goal-mode stack (#8303) to prevent community frustration.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw Project Digest — 2026-07-22

## 1. Today’s Overview

The project saw moderate activity over the past 24 hours, with **6 issues** and **8 pull requests** updated. Of those, 2 issues were closed (a tool‑call leak and a rate‑limiting bug) and 3 PRs were merged/closed, including a notable feature for policy‑gated system execution and a long‑outstanding fix for bot‑greeting customization. However, several older issues and PRs remain in a *stale* state (no recent activity for weeks), and the highest‑priority feature request (replacing the unmaintained `libolm` library) has not been touched since mid‑July. The community is actively reporting bugs around Matrix reconnection, Web UI performance, and OAuth login reliability, indicating both ongoing maturing of the platform and clear pain points.

## 2. Releases

**No new releases** in the reporting period.

## 3. Project Progress

Three pull requests were **closed (merged or otherwise resolved)** today:

- **PR #3282** – `feat(nodes): add policy-gated system exec` ([github.com/sipeed/picoclaw/pull/3282](https://github.com/sipeed/picoclaw/pull/3282))  
  Introduces an opt‑in `system.exec.v1` node that enforces strict execution policies (executable, working directory, environment, timeouts, output limits) before accepting and executing commands. Improves security for agent‑driven system actions.

- **PR #3233** – `Fix pr 3222 backward compat` ([github.com/sipeed/picoclaw/pull/3233](https://github.com/sipeed/picoclaw/pull/3233))  
  Addresses a regression introduced in PR #3222, restoring backward compatibility.

- **PR #303** – `fix: make bot greeting name configurable via bot_name setting` ([github.com/sipeed/picoclaw/pull/303](https://github.com/sipeed/picoclaw/pull/303))  
  A long‑standing issue (created February 2026) finally resolved: the hardcoded “PicoClaw” greeting in Telegram and DingTalk is now configurable via a `bot_name` config field, preserving custom bot identity.

Additionally, two bugs were **closed** as resolved:

- **#3153** – Volcengine tool‑call leak (rejected as fixed after PR merges)  
- **#3232** – Rate limiting failure when no fallback models configured (also closed)

## 4. Community Hot Topics

The most active discussions centre on two issues:

- **#3088 – [Feature] Use vodozemac instead of libolm** ([github.com/sipeed/picoclaw/issues/3088](https://github.com/sipeed/picoclaw/issues/3088))  
  9 comments, 2 👍. The community strongly supports moving away from the unmaintained `libolm` to the official replacement `vodozemac`. The issue is marked `priority: high` and `stale` – no maintainer activity since 2026‑07‑21. Underlying need: security and long‑term maintainability of the Matrix channel.

- **#3203 – [BUG] Matrix sync loop has no reconnection logic** ([github.com/sipeed/picoclaw/issues/3203](https://github.com/sipeed/picoclaw/issues/3203))  
  5 comments, 2 👍. Updated today (2026‑07‑22). A critical reliability issue: after any network disruption or homeserver restart, the `/sync` long‑poll loop dies silently, and because the process stays alive, systemd’s `Restart=on-failure` never triggers. The need is for robust reconnection logic common in production Matrix clients.

Other notable discussions include PRs that are still open but have received attention:

- **PR #3280** – `fix(auth): make browser OAuth login survive real‑world callback conditions` ([github.com/sipeed/picoclaw/pull/3280](https://github.com/sipeed/picoclaw/pull/3280))  
  Fresh (created today). Addresses four independent causes of OAuth login failure after consent approval, a frustration for headless/remote setups.

## 5. Bugs & Stability

Three open bugs were reported or updated today, ranked by severity:

| Severity | Issue | Description | Fix PR Exists? |
|----------|-------|-------------|----------------|
| **High** | [#3203](https://github.com/sipeed/picoclaw/issues/3203) | Matrix sync loop has **no reconnection logic** – silent death after network/server disruption. Process stays alive, so auto‑restart fails. | No open fix PR yet |
| **High** | [#3281](https://github.com/sipeed/picoclaw/issues/3281) | Web UI chat input becomes **very laggy** when conversation history grows long. Fresh report, 0 comments. | No fix PR yet |
| **Low** | [#3255](https://github.com/sipeed/picoclaw/issues/3255) | DingTalk chat list preview always shows fixed text “PicoClaw” instead of the actual reply content. Cosmetic, but confusing for users. | No direct fix; PR #303 (merged today) only fixes the *greeting*, not the list preview. |

Additionally, two newly submitted PRs target similar bug classes:

- **PR #3279** – `fix(seahorse): prevent tool-call format leakage into LLM summaries` ([github.com/sipeed/picoclaw/pull/3279](https://github.com/sipeed/picoclaw/pull/3279))  
  Addresses a variant of the tool‑call leak bug that was closed in #3153, now triggered through seahorse summaries.
- **PR #3280** – Fixes authentication failures (described above).

## 6. Feature Requests & Roadmap Signals

The most prominent feature request remains **#3088** (vodozemac replacement for libolm). Although `priority: high`, it has been open since June 9 and is now marked *stale*. The community expects this to land soon as it is a security‑related dependency update.

Several PRs signal upcoming features:

- **PR #3200** – `feat(models): add configurable default fallback chain` ([github.com/sipeed/picoclaw/pull/3200](https://github.com/sipeed/picoclaw/pull/3200))  
  Allows users to define and persist a fallback model chain via the Web UI. Essential for reliability when primary models are unavailable.

- **PR #3228** – `fix(anthropic-messages): send SystemParts as system blocks with cache_control` ([github.com/sipeed/picoclaw/pull/3228](https://github.com/sipeed/picoclaw/pull/3228))  
  Enables Anthropic’s prompt caching by preserving per‑block `cache_control` markers – a performance/ cost optimisation for heavy users.

- **PR #3282** (already merged) – Policy‑gated system execution, a building block for safe agent orchestration.

Predictions for the **next version** (v0.3.2 or v0.4.0):  
- `vodozemac` replacement (if maintainers pick up #3088)  
- Configurable fallback chain (#3200)  
- OAuth login stability (#3280)  
- Anthropic prompt caching support (#3228)  
- Various bug fixes (Matrix reconnect, Web UI lag, tool‑call leak in seahorse)

## 7. User Feedback Summary

**Pain points** expressed in the last 24 hours:

- **Matrix reliability** (#3203) – Users running PicoClaw as a 24/7 service are hit by silent sync deaths after any network blip; systemd’s restart policy is ineffective.
- **Web UI performance** (#3281) – Long‑term conversations become unusable due to laggy input. Affects all Web users.
- **DingTalk list preview** (#3255) – Expected message previews show only “PicoClaw”, reducing at‑a‑glance utility.
- **OAuth login** (#3280) – Headless / remote users face repeated consent burning, requiring manual restart.
- **Tool‑call leakage** (PR #3279) – Although a previous issue was closed, the same symptom reappears via a different code path (seahorse), indicating insufficient test coverage.

**Satisfaction signals**: The community is actively contributing fixes (four PRs authored by non‑maintainers today). The closure of PR #303 (bot name) was positively received (👍 on original issue? Not listed, but it was long‑awaited).

## 8. Backlog Watch

Several high‑impact items have lack of recent maintainer activity and need attention:

- **#3088** – `Feature: use vodozemac` – open 43 days, last updated 22 days ago. No assignee.  
- **PR #3228** – `fix(anthropic‑messages): cache_control` – open 16 days, last updated 1 day ago (still open, no merge).  
- **PR #3200** – `feat(models): default fallback chain` – open 21 days, last updated 1 day ago.  
- **PR #3256** – `fix(feishu): audio/video native types` – open 8 days, no comments from maintainers.  
- **#3203** – `Matrix sync loop reconnection` – No fix PR yet; maintainer response needed to prevent escalation.

All items above are likely to become stale blockers if not addressed in the coming week. The project’s health depends on clearing the `vodozemac` migration (security) and the Matrix reconnection logic (reliability).

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw Project Digest – 2026-07-22

## 1. Today's Overview

NanoClaw saw a surge of PR activity with **12 pull requests updated in the last 24 hours**, compared to only **1 issue** updated. While no new releases were cut, the project demonstrated strong community momentum: three PRs were merged/closed (including a Langfuse tracing skill and a branch maintenance documentation update), and the remaining nine open PRs cover critical fixes and new channel integrations. Development effort is focused on reliability (WhatsApp media, Telegram URL parsing, OneCLI/Gmail routing) and expanding channel support (LINE, Dial). The single open issue (#3096) proposes adding LINE as a communication channel, reflecting user demand for coverage in key Asian markets.

## 2. Releases

No new releases were published in the last 24 hours. The latest release remains the previous version; users should consult the release tags for recent changes.

## 3. Project Progress

Three pull requests were merged or closed today, advancing both infrastructure and documentation:

- **[#3116 – Sync PR](https://github.com/nanocoai/nanoclaw/pull/3116)** (closed) – Automated synchronization PR, likely merging upstream changes.
- **[#3114 – Langfuse Tracing Skill](https://github.com/nanocoai/nanoclaw/pull/3114)** (merged) – Adds Langfuse tracing as an operational/utility skill, enabling observability for agent conversations.
- **[#3095 – Branch Maintenance Guide](https://github.com/nanocoai/nanoclaw/pull/3095)** (merged) – Core team documentation rewrite for the registry-branch model, improving contributor onboarding.

These merges signal steady progress in both observability tooling and developer documentation, reducing friction for new contributors.

## 4. Community Hot Topics

The most active discussion centers on expanding communication channels:

- **Issue #3096 – `/add-line` Skill for LINE Support**  
  [Open Issue](https://github.com/nanocoai/nanoclaw/issues/3096) – 3 comments, authored by *joshm1230212*. Users argue that LINE is the dominant messenger in Japan, Taiwan, and Thailand, and currently has no `@chat-adapter/line` package. The discussion indicates strong community desire for official LINE integration.  
  *Underlying need*: Users with audiences in East/Southeast Asia are blocked from using NanoClaw with LINE; this feature would unlock a large user base.

Other notable PRs drawing attention (though comment counts weren’t reported) include:

- **PR #3050 – Dial Channel Integration** – A feature skill adding Dial to the channel picker, showing continued investment in multi-channel support.
- **PR #3111 – Telegram URL Protection** – Addresses a critical bug where bare URLs containing underscores (e.g., `-/merge_requests/`) break Telegram's legacy Markdown parser, causing silent message drops. Likely to be a high-urgency topic for Telegram users.

## 5. Bugs & Stability

Multiple bug fixes were proposed or advanced today, ranked by severity:

| Severity | Bug | PR / Issue | Status |
|----------|-----|------------|--------|
| **Critical** | Telegram silently drops messages containing bare URLs with underscores (GitLab `/-/merge_requests/` path) | [PR #3111](https://github.com/nanocoai/nanoclaw/pull/3111) | Open, fix proposed |
| **High** | WhatsApp media fails when container cannot read staged inbound files | [PR #3113](https://github.com/nanocoai/nanoclaw/pull/3113) | Open, fix proposed |
| **High** | Regression in WhatsApp media-failure note on the approval-answer path (follow-up to #2895) | [PR #2896](https://github.com/nanocoai/nanoclaw/pull/2896) | Open, fix proposed |
| **Medium** | Docker WORKDIR (`/workspace/group`) mismatches actual group mount path (`/workspace/agent`) | [PR #2236](https://github.com/nanocoai/nanoclaw/pull/2236) | Open since May 3 |
| **Medium** | SELinux-enforcing systems fail on Docker volume mounts without `:z` label | [PR #1530](https://github.com/nanocoai/nanoclaw/pull/1530) | Open since Mar 29 |
| **Medium** | OneCLI setup collides with host PostgreSQL on port 5432 | [PR #3112](https://github.com/nanocoai/nanoclaw/pull/3112) | Open, docs-only fix |
| **Low** | OneCLI should block legacy Gmail API routes that bypass the modern wrapper | [PR #3115](https://github.com/nanocoai/nanoclaw/pull/3115) | Open, fix proposed |

Almost all bugs have accompanying fix PRs, indicating a responsive maintainer community. The Telegram URL issue (#3111) is especially noteworthy because of its “silent failure” nature — operators may never know messages are lost.

## 6. Feature Requests & Roadmap Signals

- **LINE Channel Support** – Issue [#3096](https://github.com/nanocoai/nanoclaw/issues/3096) proposes a `/add-line` skill. Given the project’s recent trend of adding channel integrations (e.g., Dial in PR #3050), LINE support is a strong candidate for the next minor release. If the community delivers a working `@chat-adapter/line` package, it may land quickly.
- **Dial Channel** – PR [#3050](https://github.com/nanocoai/nanoclaw/pull/3050) is already open and adds Dial to the channel picker. This is further along than the LINE request and is likely to be merged sooner.
- **Langfuse Tracing** – PR [#3114](https://github.com/nanocoai/nanoclaw/pull/3114) was merged today, adding observability. This may prompt user requests for additional tracing backends (e.g., Datadog, OpenTelemetry).
- **Traditional Chinese Localization** – PR [#2950](https://github.com/nanocoai/nanoclaw/pull/2950) adds a Traditional Chinese README, indicating growing Asian user engagement. This aligns with the LINE request.

Roadmap prediction: The next version will likely include Dial and LINE channels, the Telegram URL fix, and the Langfuse tracing skill. Infrastructure fixes (SELinux, WORKDIR, Gmail routes) may be consolidated into a patch release.

## 7. User Feedback Summary

**Pain points** voiced through issues and PRs:
- **Telegram silent drops** – Operators lose messages without any error log; the community urgently needs a fix.
- **WhatsApp media workflow** – Staging files in a way the container can read them is not intuitive; multiple PRs indicate ongoing pain.
- **Docker/SELinux incompatibility** – Fedora/RHEL users cannot run NanoClaw out of the box without manual `:z` flags.
- **Port collisions** – Running OneCLI alongside an existing PostgreSQL server is fragile.
- **Gmail API inconsistency** – Legacy routes can bypass the OneCLI Gmail blocking, risking accidental access.

**Satisfaction** signals:
- Active contributions from diverse authors (joshm1230212, dtanikella, CrAzyScreamx, lizo-ai, etc.) show a healthy ecosystem.
- The community is willing to propose and implement their own fixes (e.g., Telegram URL protection, Langfuse skill), suggesting good developer experience and clear contribution guidelines.

## 8. Backlog Watch

The following long-standing items still need maintainer attention:

- **[PR #1530 – SELinux volume mounts](https://github.com/nanocoai/nanoclaw/pull/1530)** – Open since March 29 (116 days). No comments or updates from maintainers. This blocks an entire OS user base (Fedora, RHEL). **Priority: High**.
- **[PR #2236 – WORKDIR mismatch](https://github.com/nanocoai/nanoclaw/pull/2236)** – Open since May 3 (80 days). Review lacking despite clear description. **Priority: Medium**.
- **[PR #2896 – WhatsApp media-failure note regression](https://github.com/nanocoai/nanoclaw/pull/2896)** – Open since June 30 (22 days). Follow-up to a merged PR; should be reviewed promptly to avoid accumulating technical debt. **Priority: Medium**.

These three PRs represent the most impactful unresolved maintenance items. Reviewing and merging them would improve stability and broaden platform support significantly.

---

*Overall project health: High community engagement, excellent contribution pipeline, but needs more frequent maintainer review of long-open PRs. No release in 24h, but the volume of merged fixes and new features suggests a release is imminent.*

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-07-22

## 1. Today's Overview

IronClaw is in the final sprint toward its v1.0.0 release, following the **ground-up Reborn architecture** overhaul that shipped as release candidate `ironclaw-v1.0.0-rc.1` on July 20. Activity remains intense: 41 issues and 50 pull requests were updated in the last 24 hours, with 14 issues closed and 17 PRs merged or closed. The project is overwhelmingly focused on **consolidating the Reborn runtime**, **removing legacy in-memory stores**, and **hardening the product surface** ahead of the stable v1 launch. Multiple XL-sized PRs are in flight, indicating a strong push toward feature completeness and stability.

## 2. Releases

**`ironclaw-v1.0.0-rc.1`** (July 20, 2026) – [Release page](https://github.com/nearai/ironclaw/releases/tag/ironclaw-v1.0.0-rc.1)

- **Ground-up rebuild** of the agent runtime, storage, extension host, and web UI – not an incremental update from the 0.29.x line.
- The `ironclaw` binary is now the rearchitected CLI; the v1 monolith builds as the `ironclaw` crate.
- **Breaking changes**: The entire project structure has been reworked. All operators and contributors should refer to the [migration guide](https://github.com/nearai/ironclaw/blob/main/docs/reborn/migration-v1-rc1.md) (linked in release notes). In-memory store types (`InMemoryTurnStateStore`, `InMemorySubagentGoalStore`, etc.) have been retired; filesystem-backed or ephemeral counterparts replace them (see PR #6430 merged today).
- **Recommended action**: Test the RC in a staging environment. Report issues under the `dogfooding` epic (#6394).

## 3. Project Progress

The following **17 PRs were merged or closed** today (see full list in [PR tab](https://github.com/nearai/ironclaw/pulls?q=is%3Apr+updated%3A%3E%3D2026-07-21+is%3Aclosed)). Key advances:

- **Removal of in-memory ratchet stores** ([PR #6430](https://github.com/nearai/ironclaw/pull/6430)) – Migrated the last durable in-memory stores (`InMemorySubagentGoalStore`, `InMemoryOpenAiCompatRefStore`) to filesystem-backed equivalents. This closes the long-standing technical debt tracked in issue #6263.
- **Witness-always-present & dispatch-through-witness** ([PR #6432](https://github.com/nearai/ironclaw/pull/6432)) – Completed the `authorize()` consolidation for synchronous capability dispatch, partially addressing #6396. This ensures every runtime dispatch path is backed by an `Authorized` witness.
- **Unified runtime store graph selection** ([PR #6442](https://github.com/nearai/ironclaw/pull/6442)) – Removed `RebornProductionRuntimeServices`; the single `RebornServices` now stores `RebornRuntimeStoreGraph` for all deployment profiles, simplifying the production wiring.
- **Error recoverability** ([PR #6437](https://github.com/nearai/ironclaw/pull/6437)) – Model-visible failures are now routed through typed recovery or model-visible outcomes rather than opaque executor failures, advancing the error-recoverability endgame (#6284).
- **WebUI SSE lifecycle fix** ([PR #6425](https://github.com/nearai/ironclaw/pull/6425)) – Restored SSE streams across navigation, a critical UI reliability fix for multi-turn agent interactions.
- **Harvested QA traces** ([PR #6422](https://github.com/nearai/ironclaw/pull/6422)) – Enabled `RecordingLlm` instrumentation to capture 42 per-case LLM traces from WebUI v2 live tests, laying the foundation for hermetic replay testing (see PR #6439).
- **Dependency bumps** – Multiple PRs updated key dependencies: tokio ecosystem, serde, uuid, async-trait, dompurify (security patch to 3.4.12).

## 4. Community Hot Topics

The most discussed issues and pull requests (by comment count) reveal intense focus on the **Reborn architecture landing strategy** and **store consolidation**:

- **[#2987 – EPIC: Track Reborn architecture landing strategy and grouped PR plan](https://github.com/nearai/ironclaw/issues/2987)** (44 comments)  
  The master tracking issue for the Reborn rollout. Community members are actively reviewing the grouped PR plan and integration status. Last updated July 21.
- **[#6263 – Retire InMemoryTurnStateStore](https://github.com/nearai/ironclaw/issues/6263)** (10 comments)  
  Closed today. The final in-memory store was removed in PR #6430. Community engagement around this debt item was high, indicating relief from a long-standing performance/reliability concern.
- **[#6389 – Collapse build_local_runtime + build_production_shaped into one build_runtime(cfg)](https://github.com/nearai/ironclaw/issues/6389)** (10 comments)  
  Still open. This Phase 4 refactoring would unify the two runtime-assembly paths. The high comment count suggests technical discussion on how to parameterize the deployment config without sacrificing clarity.

On the PR side, the largest PRs (XL-sized, high risk/medium) are drawing the most review attention:
- **[PR #6441 – Refactor(reborn): name ProductSurface boundary](https://github.com/nearai/ironclaw/pull/6441)**  
  Adds a `ProductSurface` trait over the frozen `RebornServicesApi`, moving WebUI and product-auth to depend on the new abstraction. Likely to trigger cross-team discussion.
- **[PR #6431 – Bump everything-else group (28 updates)](https://github.com/nearai/ironclaw/pull/6431)**  
  Routine but broad dependency update – no breaking changes expected.
- **[PR #6438 – Seal process redispatch authority](https://github.com/nearai/ironclaw/pull/6438)**  
  Replaces the production dispatcher DTO with sealed `Authorized` dispatch, deepening the witness-based architecture.

**Underlying need**: The community and internal teams are pushing to stabilize the Reborn runtime and eliminate any remaining V1-era workarounds before cutting the v1 stable release. The high engagement on store consolidation and dispatch routing signals a desire for a clean, auditable runtime.

## 5. Bugs & Stability

The project has a dedicated **dogfooding & QA bug fixing epic** ([#6394](https://github.com/nearai/ironclaw/issues/6394)) covering the week of July 20–24. Today’s data shows active bug-fix PRs:

- **SEV-HIGH (UI reliability)**: **[PR #6425](https://github.com/nearai/ironclaw/pull/6425)** fixes SSE stream interruptions during navigation. This was a user-visible regression in the new WebUI that could cause agent output loss. Fix is merged.
- **SEV-MED (error recoverability)**: **[PR #6437](https://github.com/nearai/ironclaw/pull/6437)** routes previously opaque failures to model-visible outcomes, making many error scenarios recoverable. This directly addresses the error-recoverability endgame epic (#6284).
- **SEV-LOW (dependency security)**: Two separate dompurify bumps ([PR #6196](https://github.com/nearai/ironclaw/pull/6196) and [#6440](https://github.com/nearai/ironclaw/pull/6440)) address a known XSS vulnerability in the frontend dependency (CVE-2025-XXXX, fixed in 3.4.12). The earlier bump (#6196) was superseded by #6440 after a subsequent patch.

No new crash or regression reports were filed today outside of the tracked dogfooding epic. The overall stability posture is improving.

## 6. Feature Requests & Roadmap Signals

One new feature request surfaced today:

- **[#6433 – Dedicated custom instructions / master prompt section](https://github.com/nearai/ironclaw/issues/6433)**  
  User requests a UI section analogous to ChatGPT/Claude for persistent personalization instructions, rather than relying on chat context. The issue is tagged `enhancement` but no priority or milestone. Given the Reborn product-surface migration epic (#3031) is still open, this could be a candidate for a post-v1 iteration, but the team might integrate a minimal version before v1 if demand grows.

Other roadmap signals from open epics:
- **Seal process re-dispatch** ([#6434](https://github.com/nearai/ironclaw/issues/6434)): A follow-up to the witness/matrix work to delete the loose `CapabilityDispatchRequest`. Likely to land before v1.
- **Harness testing unification** ([#2828](https://github.com/nearai/ironclaw/issues/2828)): QA replay automation is being built out (see PR #6439 replaying 42 traces). This is not a user-facing feature but critical for release confidence.
- **Reborn contributor runway** ([#3484](https://github.com/nearai/ironclaw/issues/3484)): The team is clearing the path for parallel skill/tool/channel porting. This is a strong signal that post-v1, community contributions will be actively sought.

**Prediction for next version (v1.0.0 stable)**: Expect the seal process redispatch (#6434) and the runtime graph unification (#6389) to land, alongside continued QA test automation. The custom instructions feature (#6433) is unlikely to make v1 unless a lightweight implementation is already in the works.

## 7. User Feedback Summary

While direct user comments are limited in the issue/PR data, several signals emerge:

- **Pain point (UI state drift)**: The active [#2792 (Gateway state convergence)](https://github.com/nearai/ironclaw/issues/2792) epic indicates that users experienced drift between UI and backend state. The SSE fix (#6425) directly addresses one symptom.
- **Pain point (error opacity)**: The error-recoverability endgame (#6284) and today’s PR #6437 respond to user frustration with unhelpful agent failures (“opaque executor failures”). Feedback from dogfooding sessions is driving this.
- **Satisfaction (speed of refactoring)**: The rapid closure of in-memory store debts (6263) and the steady flow of XL PRs suggest the core team is executing efficiently. No negative sentiment is visible in issue comments.
- **Use case (multi-identity browsing)**: The open epic [#2355](https://github.com/nearai/ironclaw/issues/2355) for persistent Chrome/CDP browsing indicates advanced users are demanding authenticated web interactions. This remains a long-term feature.
- **Dissatisfaction (channel multi-account)**: Epic [#2392](https://github.com/nearai/ironclaw/issues/2392) highlights that real deployments (WeCom, Telegram) are blocked by single-account assumptions. This is a known gap that may be addressed in the Reborn channel porting work.

## 8. Backlog Watch

Most issues and PRs are actively updated, but a few items have not seen recent maintainer attention:

- **[#2599 – Epic: Enforce gateway feature boundaries, crate guardrails](https://github.com/nearai/ironclaw/issues/2599)**  
  Created Apr 17, last updated Jul 21 but **no PRs or comments from maintainers in recent weeks**. The epic’s scope (CI guardrails, crate-owned E2E) may be deprioritized after the Reborn architecture rework. Maintainers should confirm status.
- **[#2767 – Epic: Separate engine v2 capability background from callable tool schemas](https://github.com/nearai/ironclaw/issues/2767)**  
  Created Apr 21, closed today. However the closure appears to be a duplicate or superseded by the Reborn witness architecture. No final result documented in the issue. Maintainers should update the resolution.
- **[#3773 – Crate boundary & ownership ambiguity audit](https://github.com/nearai/ironclaw/issues/3773)**  
  Created May 19, audited in a dedicated doc, but no further PRs or open action items. With the Reborn restructuring, this audit may be obsolete. A maintainer comment linking to the current state would help.
- **PR #5503 – [Experiment] Add compact Google extension capabilities**: Opened Jul 1, updated Jul 21 but still in draft state. The experiment has not been merged or closed. If the approach is abandoned, it should be closed with a summary to avoid confusion.

**Action**: The IronClaw team should triage these stale items to either assign a milestone, close, or provide a status update.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI Project Digest — 2026-07-22

## Today's Overview
Project activity is **high**, with 10 pull requests updated in the last 24 hours—half of which were merged or closed. A single new issue (#1861) was updated, reporting a critical image‑attachment syncing bug that already has an open fix PR (#2373). No new releases were published, but the team is actively resolving bugs and shipping features across the renderer, cowork, artifacts, and Windows update subsystems. The flurry of merged PRs indicates a focused push to improve stability and user experience.

## Releases
*None* — no new versions were tagged today.

## Project Progress
Five pull requests were merged or closed today, representing concrete improvements:

- **🛠 Fix: OpenClaw token proxy SSE truncation** (#2372) — Resolves a data integrity issue in the token proxy.
- **🛠 Fix: Browser annotation content & session state** (#2371) — Enhanced webview annotations: supports element‑only changes without comments, shows before/after values in prompts and attachment badges, clears webview annotation session when draft is cleared, and preserves screenshot preview metadata.
- **🛠 Fix: Unified share/deploy subscription intercept dialog** (#2370) — Added a subscription permission check and unified prompt dialog for both file sharing and local service deployment, with separate login/subscription messages.
- **🛠 Fix: Optimize share access permission flow** (#2369) — Distinguishes between create and manage states for artifact sharing, adds explicit “Create Share” and “Update Access” actions, reorders permission selection to draft‑then‑submit, and improves UX feedback.
- **✨ Feature: Silent Windows update installation** (#2368) — Launches the NSIS installer with `/S` via PowerShell `Start-Process` for silent elevation and auto‑relaunch; surfaces a localized error on UAC denial (exit 1223).

## Community Hot Topics
The only updated issue, **#1861 – “图片附件不随模型切换重新处理”** ([link](https://github.com/netease-youdao/LobsterAI/issues/1861)), has 2 comments and no reactions, but it highlights a significant workflow disruption: image attachments are not re‑processed when switching between vision and non‑vision models. The community’s underlying need is for seamless model switching without losing image data context. An open PR **#2373** ([link](https://github.com/netease-youdao/LobsterAI/pull/2373)) directly addresses this by syncing attachment behavior with model capability.

## Bugs & Stability
| Severity | Bug | Status | Fix PR |
|----------|-----|--------|--------|
| **High** | Image attachments not re‑processed on model switch (#1861) | Open, updated | ✅ #2373 (open) |
| **Medium** | Token proxy SSE truncation (OpenClaw) | Closed | ✅ #2372 (merged) |
| **Low** | Browser annotation state not cleared when draft is empty | Closed | ✅ #2371 (merged) |

No regressions or new crashes were reported today. The fix for the attachment bug is already being reviewed (PR #2373), indicating a swift response.

## Feature Requests & Roadmap Signals
- **Permanent sidebar ad‑banner hiding** – PR #2374 ([link](https://github.com/netease-youdao/LobsterAI/pull/2374)) adds a setting toggle to permanently hide the sidebar ad banner. This directly addresses user request #2342 for a persistent dismissal option, and is likely to appear in the next release.
- **Silent Windows updates** (#2368) is already merged, streamlining update UX for Windows users.
- Several Artifacts‑related PRs (#2370, #2369) refine sharing and subscription flows, suggesting continued investment in the artifacts ecosystem.

## User Feedback Summary
The primary user pain point voiced today is the **image attachment handling inconsistency** when switching between vision and non‑vision models. Two scenarios were reported:
1. Non‑vision model → vision model: images stored as file paths, not converted to base64, so the model cannot “see” them.
2. Vision model → non‑vision model: stale base64 data is leftover, causing unnecessary payload bloat.

Both cases break the expected behavior and degrade the user experience. The open fix PR indicates the team is responsive. Other feedback implicitly comes from the PRs—users want finer control over subscriptions, and the ability to hide ads permanently.

## Backlog Watch
Three **stale dependency‑update PRs** have been open since April 2, 2026 (over 110 days) without maintainer review:

- [#1279 – Bump `cross-env` (7.3 → 10.1.0)](https://github.com/netease-youdao/LobsterAI/pull/1279)
- [#1280 – Bump `react-dom` (18.3.1 → 19.2.4)](https://github.com/netease-youdao/LobsterAI/pull/1280)
- [#1281 – Bump `vite` (5.4.21 → 8.0.9)](https://github.com/netease-youdao/LobsterAI/pull/1281)

These are major version bumps and often carry breaking changes; merging them could introduce regressions if not properly tested. The [area: renderer] tag on #1280 and #1281 suggests they affect the UI layer. Consider reviewing and merging (or closing and re‑opening with updated versions) to keep dependencies current and secure.

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis Project Digest – 2026-07-22

## Today's Overview
Activity on the Moltis repository remains low today, with only one issue updated and one pull request opened in the past 24 hours. No new releases or merged changes were recorded. The sole Pull Request is an automated dependency bump for the documentation site, while the only active issue is an enhancement request that has been open since April. Overall, the project appears to be in a maintenance phase with minimal community or developer momentum.

## Releases
**None** – No new versions were published today or in the recent past.

## Project Progress
**No Pull Requests were merged or closed today.**  
The only PR in view is **#1161** (open, created 2026-07-21), a `dependabot` update bumping `astro` from 7.0.9 to 7.1.3 in the `/docs` directory. This is still pending review and merge.

## Community Hot Topics
**#574 – [enhancement] Model Routing Per Topic** – [Issue Link](https://github.com/moltis-org/moltis/issues/574)  
*Author: azharkov78 | Created: 2026-04-06 | Updated: 2026-07-22 | Comments: 5 | 👍: 1*  
This feature request proposes adding topic-aware model routing, allowing users to direct specific types of queries to different LLM backends. The issue has accumulated five comments, indicating sustained interest. The underlying need is for intelligent workload distribution across models (e.g., using a cheaper/smaller model for simple tasks and a more powerful one for complex reasoning). No maintainer response is visible, suggesting the project team has not yet prioritised this.

## Bugs & Stability
**No bugs, crashes, or regressions were reported today.**  
The project appears stable from a reliability perspective, though the absence of recent bug fixes could indicate either low usage or a mature codebase.

## Feature Requests & Roadmap Signals
The only feature-related signal is **Issue #574** (Model Routing Per Topic). Given its age (over three months) and lack of formal acknowledgment, it may not be a near-term priority. However, if the project resumes active development, topic-based routing aligns with common AI-agent orchestration patterns and could become a candidate for the next minor release.

## User Feedback Summary
User feedback is limited to the comments on **#574**. The proposer clearly articulated a use case for dynamic model selection based on query topic, a pattern frequently requested in multi-agent and AI assistant systems. No signs of satisfaction or dissatisfaction with the current product are available from the low-activity data.

## Backlog Watch
**Issue #574 (Model Routing Per Topic)** – [Issue Link](https://github.com/moltis-org/moltis/issues/574)  
- Created: 2026-04-06  
- Last updated: 2026-07-22 (by user comments, not maintainer)  
- Status: Open with 5 comments, 1 reaction  
- Concern: No assignee, labels, or official reply from the maintainers. This enhancement has been unattended for over 3.5 months and may benefit from triage or a decision (accept/decline/roadmap).  

No other long-standing, unanswered issues or PRs were observed in the 24-hour window.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw Project Digest — 2026-07-22

## Today’s Overview
CoPaw (QwenPaw) continues to show very high activity: **40 issues** and **50 pull requests** were updated in the last 24 hours, with **29 PRs merged/closed** and one patch release (v2.0.1-beta.1) shipped. Community engagement remains strong, both in bug reporting and feature discussions, while the core team is actively pushing governance, scroll context management, and channel improvements. The project’s health indicators are positive: a balanced open/closed ratio, multiple first‑time contributor PRs, and rapid turnaround on critical bugs.

## Releases
- [**v2.0.1-beta.1**](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.0.1-beta.1) – Patch release containing:
  - Fix: use absolute import in Tauri entry point
  - chore: bump version to 2.0.1b1
  - fix(memoryspace): catch `OSError` in `_saved_tool_refs`
  - No breaking changes or special migration steps required.

## Project Progress
The following notable PRs were merged or closed today:

- **#6159** – Refactor channel base: moved turn‑usage settlement from `ConsoleChannel` to `BaseChannel`, enabling cross‑channel token/context persistence.
- **#6262** – Add one-click copy of agent configuration (backend + UI modal).
- **#6195** – Refactor chat context/token display from per‑message actions to a session‑level indicator, using a Zustand store for SSE updates.
- **#6313** – Fix governance: refresh plugin tool defaults, validate tool_type, warm caches off‑loop (follow‑up to #6190).
- **#6079** – Fix: ask user for permission for sudo (security hardening).
- **#5088** (breaking change, closed) – Initial governance & sandbox interface discussion.
- **#5546** (closed) – Generalize governance policy pattern.
- **#6299** (closed via fix) – Session deletion persistence bug resolved (part of #6068 work).

**In‑progress features** gaining momentum:
- **#5187** (open) – Windows desktop GUI automation (computer use) via UIA + Tauri control mode.
- **#6284** (open) – New “QwenPaw Creator” app plugin for script‑to‑video workflows.
- **#6323** (open) – Staged compaction and pointer‑backed task continuity for Scroll context.
- **#6325** (open) – Show built‑in tool docs and parameters in Console.
- **#6327** (open) – Enable drag‑and‑drop file upload in desktop app (fixing #6297).

## Community Hot Topics
Most active issues and PRs (by comment count or community engagement):

- **[#2291](https://github.com/agentscope-ai/QwenPaw/issues/2291) (65 comments, closed)** – Help Wanted task list: central coordination point for community contributions. Continues to attract first‑time contributors.
- **[#6257](https://github.com/agentscope-ai/QwenPaw/issues/6257) (13 comments, closed)** – Bug: multiple tool calls produce identical thinking output. Users report that when the agent executes several tool calls in one turn, each call’s reasoning block repeats the same text, undermining independent planning.
- **[#6318](https://github.com/agentscope-ai/QwenPaw/issues/6318) (6 comments, open)** – Feature request: support per‑conversation model assignment (not per‑agent). Users want a default model per agent but the ability to override for individual conversations. A related PR (#5992) is already open.
- **[#4873](https://github.com/agentscope-ai/QwenPaw/issues/4873) (5 comments, closed)** – Bug: running two subagents simultaneously causes infinite polling and cannot be interrupted from Feishu channel.
- **[#6322](https://github.com/agentscope-ai/QwenPaw/issues/6322) (4 comments, open)** – Platform domain ad redirection issue on mobile networks (likely network interference, not a CoPaw bug).
- **[#6297](https://github.com/agentscope-ai/QwenPaw/issues/6297) (4 comments, open)** – Request to support drag‑and‑drop upload of images, PDFs, and Office documents in chat. Already addressed by PR #6327.

**Underlying needs**: Users are pushing for more intuitive file handling, better multi‑turn reasoning consistency, per‑session flexibility, and smoother mobile/web interaction.

## Bugs & Stability
Critical and high‑severity bugs reported/updated in the last 24 hours:

| Issue | Severity | Description | Fix PR exists? |
|-------|----------|-------------|----------------|
| [#6324](https://github.com/agentscope-ai/QwenPaw/issues/6324) (open) | **Critical** | Model response truncated (MiniMax-M3). User sees incomplete generation. | Not yet |
| [#6307](https://github.com/agentscope-ai/QwenPaw/issues/6307) (open) | **High** | v2.0 introduces ~2s fixed overhead per simple reply compared to v1.x – architectural regression. | Not yet |
| [#6299](https://github.com/agentscope-ai/QwenPaw/issues/6299) (closed) | **High** | Deleted session records persist in `history.db`, causing seq collision and cross‑session context contamination. Fixed in #6068 (still open) and #6323 (open). | Yes (#6323) |
| [#6241](https://github.com/agentscope-ai/QwenPaw/issues/6241) (closed) | **High** | Agent repeatedly outputs identical content and `memory_search` enters infinite loop; framework lacks repeat‑detection enforcement. | Workaround exists (WARNING logs), but not fully fixed. |
| [#5860](https://github.com/agentscope-ai/QwenPaw/issues/5860) (closed) | **High** | Frequent conversation progress loss and infinite loops in v2.0.0‑beta.3. | Multiple related fixes merged since. |
| [#6257](https://github.com/agentscope-ai/QwenPaw/issues/6257) (closed) | **Medium** | Multiple tool calls produce identical thinking output. | Not yet resolved; likely needs framework‑level dedup. |
| [#6314](https://github.com/agentscope-ai/QwenPaw/issues/6314) (closed) | **Medium** | `RemoteProtocolError: peer closed connection` – QwenPaw actively closing HTTP connections prematurely. | Root cause identified (active FIN by QwenPaw). |
| [#6320](https://github.com/agentscope-ai/QwenPaw/issues/6320) (closed) | **Low** | LaTeX formulas with square roots not rendered correctly in Docker environment. | Not yet. |
| [#6315](https://github.com/agentscope-ai/QwenPaw/issues/6315) (open) | **Medium** | `MODEL_EXECUTION_ERROR` after updating to v2.0.0.post3 – cannot use free model (connection error). | User has dump file but no fix yet. |

**Overall stability**: Several regressions from v1.x to v2.0 are still being tracked, but the team is actively addressing them (e.g., #6323 compacting scroll context, #6068 fixing session ID migration). The high number of closed issues (21) suggests effective triage, but some critical bugs remain open.

## Feature Requests & Roadmap Signals
Strongest user‑requested features visible in today’s activity:

- **Per‑conversation model override** (#6318, open) – Likely to land soon via PR #5992 (per‑session model overrides, under review).
- **Drag‑and‑drop file upload** (#6297, open) – Already implemented in PR #6327.
- **Mobile‑friendly web console** (#6281, #6308) – Users explicitly request responsive UI for phones/tablets.
- **Qwen3.8‑max‑preview support** (#6285, open) – PR #6293 is under review to add it to the Aliyun Token Plan.
- **Desktop workspace quick access** (#6083, open) – User wants a button in the Tauri desktop app to open the agent’s workspace folder/downloads.
- **Built‑in tool documentation in Console** – PR #6325 adds inline docs/parameters for built‑in tools.
- **Theme/skin customization** – PR #6312 (first‑time contributor) explores a configurable theme module.
- **Loop detection mechanism** (#5657, closed) – Backend proposal for automatic loop breaking.
- **Separate control over channel tool call parameters and results** (#5976, closed) – Users want to truncate long tool outputs sent to external channels.

**Prediction for next release (v2.0.1 stable)**: Drag‑and‑drop upload, qwen3.8‑max‑preview, per‑session model override (if PR #5992 finishes review), and the scroll compaction improvements (#6323) are strong candidates.

## User Feedback Summary
**Pain points** (real user frustrations from issue descriptions):
- “v2.0 has ~2s fixed overhead on every reply compared to v1.x” – impacts perceived responsiveness.
- “Deleted sessions still reappear, new conversations inherit others’ context” – data integrity concern.
- “Agent repeats identical thinking blocks across multiple tool calls” – reduces trust in multi‑step reasoning.
- “Cannot interrupt subagent infinite polling from Feishu” – channel integration limitation.
- “Platform redirects to ad pages on mobile networks” – likely network interference, but user blames CoPaw.
- “Model response truncated without explanation” – unclear error handling.
- “No way to upload files via drag‑and‑drop in desktop app” – workflow blocker for document review.

**Satisfaction indicators**:
- Many issues closed within the same day (21 closed), and maintainers actively ask for more details (e.g., error dumps).
- First‑time contributor PRs welcomed (#6312, #6203, #5992), showing a healthy onboarding process.
- The project’s “Help Wanted” list (#2291) continues to attract contributors, with several tasks now claimed.

## Backlog Watch
Issues and PRs that have been open for a while or lack recent maintainer attention:

- **[#5187](https://github.com/agentscope-ai/QwenPaw/pull/5187)** (open since June 14) – Large Windows computer‑use automation PR. Requires thorough review; no comments from maintainers yet.
- **[#6068](https://github.com/agentscope-ai/QwenPaw/pull/6068)** (open since July 13) – Scroll session ID migration fix. Important for data integrity (#6299). Unmerged.
- **[#5992](https://github.com/agentscope-ai/QwenPaw/pull/5992)** (open since July 12) – Per‑session model overrides. High community interest (#6318). Review pending.
- **[#6203](https://github.com/agentscope-ai/QwenPaw/pull/6203)** (open since July 16) – Windows `tasklist` liveness probe fix. First‑time contributor, no maintainer response.
- **[#6301](https://github.com/agentscope-ai/QwenPaw/issues/6301)** (open, 2 comments) – Incorrect timestamp timezone conversion. No maintainer reply.
- **[#6308](https://github.com/agentscope-ai/QwenPaw/issues/6308)** (open, 2 comments) – Coding mode: need a terminal for custom commands. No maintainer response.
- **[#6322](https://github.com/agentscope-ai/QwenPaw/issues/6322)** (open, 4 comments) – Platform ad redirection; user unsure if CoPaw bug. No maintainer comment.

**Recommendation**: Prioritize review of #5187 (computer use) and #6068 (scroll data integrity), and respond to #6301 and #6308 to reduce user uncertainty.

*All data sourced from GitHub repository `agentscope-ai/CoPaw` for the 24‑hour period ending 2026‑07‑22.*

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

Based on the provided GitHub data for EasyClaw (github.com/gaoyangz77/easyclaw), here is the project digest for 2026-07-22.

---

### EasyClaw Project Digest – 2026-07-22

**1. Today's Overview**
The project shows a quiet day with zero issue or pull request activity in the last 24 hours, indicating a period of low community engagement or a stable phase without new bug reports. However, the release of two new versions (v1.8.78 and v1.8.79) demonstrates active ongoing development focused on user experience and diagnostics. The project maintains a consistent release cadence, but lacks a visible community feedback loop in this snapshot.

**2. Releases**
Two incremental versions were released today, focusing on improving user setup experience and startup reliability.

- **v1.8.79** ([Release v1.8.79](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.79)): "Refine store onboarding selection for a clearer setup flow." This release simplifies the initial configuration process for new store users by optimizing the onboarding selection interface. No breaking changes or migration notes were included.
- **v1.8.78** ([Release v1.8.78](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.78)): "Capture gateway performance diagnostics for faster startup troubleshooting." This adds a new diagnostics collection feature for the gateway, aimed at helping developers and users identify startup issues more quickly. No breaking changes or migration notes were included.

**Note**: Both releases include a common macOS-specific note about Apple's Gatekeeper blocking the unsigned app, which is a recurring distribution issue rather than a project bug.

**3. Project Progress**
No pull requests were merged or closed today. Consequently, no specific features, fixes, or code changes beyond the published releases have been advanced through the standard merge process in this 24-hour window.

**4. Community Hot Topics**
There were no active Issues or Pull Requests updated in the last 24 hours. As a result, there are no community discussions or hot topics to report for this period.

**5. Bugs & Stability**
No new bugs, crashes, or regressions were reported today. The project appears stable in this snapshot, with no open issues indicating user-facing problems. The macOS Gatekeeper warning mentioned in the release notes is an external distribution hurdle, not a code defect.

**6. Feature Requests & Roadmap Signals**
While no explicit feature requests were filed today, the content of the two releases provides signals for the development direction:
- **Enhanced setup flow** (v1.8.79) suggests a focus on lowering the barrier for new users, particularly around store configuration.
- **Diagnostics & troubleshooting** (v1.8.78) indicates that internal tooling for performance and startup health is a priority.
Given the pattern, the next version may further refine the onboarding process or expand the diagnostic capabilities to cover other operational aspects of the gateway.

**7. User Feedback Summary**
Due to the absence of active Issues or PRs, there is no direct user feedback to summarize for this period. User pain points, use cases, or satisfaction levels cannot be inferred from the available data.

**8. Backlog Watch**
There are no open Issues or Pull Requests requiring maintainer attention in this snapshot. The project backlog appears to be empty, which may indicate that all previously reported concerns have been resolved or that the project is in a maintenance phase with little external contribution.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar).*