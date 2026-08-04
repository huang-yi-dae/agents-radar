# AI CLI Tools Community Digest 2026-08-04

> Generated: 2026-08-04 08:59 UTC | Tools covered: 7

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

[LLM fallback] openai returned an empty response.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report
*Data source: github.com/anthropics/skills, as of 2026-08-04*
*Note: Pull request comment counts are marked as undefined in source data; ranking is based on linked issue engagement, follow-up PR volume, and community pain point priority.*

---

## 1. Top Skills Ranking
These are the highest-attention skill-related PRs by community traction and pain point impact:
1. **PR #1298: fix(skill-creator): run_eval.py 0% recall bug fix**  
   [Link](https://github.com/anthropics/skills/pull/1298) | Status: Open  
   Fixes a

---

[LLM fallback] openai returned an empty response.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

[LLM fallback] openai returned an empty response.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

---
# Gemini CLI Community Digest
**Date: 2026-08-04**
---

### 1. Today's Highlights
No new stable Gemini CLI releases were published in the last 24 hours. Activity is dominated by active triage and work on high-priority P1 agent reliability bugs, alongside new feature integrations, critical security fixes, and core stability improvements for the CLI.

### 2. Releases
No new releases were published in the last 24 hours. The latest known nightly version is `0.47.0-nightly.20260604.g4196596f7` (PR #27661).

### 3. Hot Issues
| Issue | Priority | Comments | Why It Matters | Community Reaction |
|-------|----------|----------|----------------|--------------------|
| [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) | P1 | 12 | `codebase_investigator` subagent reports `GOAL` success even when it hits `MAX_TURNS` before completing analysis, hiding incomplete work and breaking trust in subagent status reporting. | 2 👍, active maintainer discussion, marked for retesting |
| [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) | P1 | 8 | Generalist agent hangs indefinitely on simple tasks (e.g. folder creation), blocking core agent functionality; the only workaround is disabling subagents entirely. | 8 👍, widespread user reports of the bug occurring across use cases |
| [#24353](https://github.com/google-gemini/gemini-cli/issues/24353) | P1 | 7 | Epic to build robust component-level behavioral evaluations, foundational infrastructure for improving agent reliability; the team has already generated 76 evals across 6 supported Gemini models. | Active maintainer discussion, internal infrastructure work with no user upvotes to date |
| [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) | P2 | 7 | Tracks investigation of AST-aware file read, search, and codebase mapping features that could reduce token waste and turn count for code exploration tasks. | 1 👍, active discussion of implementation paths (tilth, glyph libraries) |
| [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) | P2 | 6 | Gemini fails to proactively use user-created custom skills and subagents without explicit instruction, reducing the value of custom workflow configurations. | Anecdotal reports from multiple power users driving the issue |
| [#26522](https://github.com/google-gemini/gemini-cli/issues/26522) | P2 | 5 | Auto Memory system retries low-signal sessions indefinitely, wasting background compute resources and generating noisy memory extraction results. | Raised by a community contributor, active triage |
| [#26525](https://github.com/google-gemini/gemini-cli/issues/26525) | P2 | 4 | Auto Memory sends unredacted transcript content to background extraction models and logs sensitive skill configuration data, creating privacy and security risks for users working with sensitive codebases. | Marked as security priority, raised alongside related Auto Memory bugs |
| [#25166](https://github.com/google-gemini/gemini-cli/issues/25166) | P1 | 4 | Shell commands hang with a false "Awaiting input" status after completion, breaking core CLI shell execution functionality. | 3 👍, multiple user reports of the bug occurring repeatedly |
| [#22232](https://github.com/google-gemini/gemini-cli/issues/22232) | P2 |

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

[LLM fallback] openai returned an empty response.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI Community Digest | 2026-08-04
---
## 1. Today's Highlights
No new stable Kimi Code CLI releases were published in the last 24 hours. Community discussion is dominated by a high-engagement feature request for a persistent cross-session memory system, while multiple in-progress PRs target critical Windows and Web UI bugs, as well as expanded ACP ecosystem compatibility for third-party client integrations.
## 2. Releases
No new Kimi Code CLI releases were published in the 24 hours leading up to this digest.
## 3. Hot Issues
1. [Issue #1283: Feature Request: Memory System - Persistent context across sessions](https://github.com/MoonshotAI/kimi-cli/issues/1283)
   Why it matters: Addresses a core user need to retain project context, coding patterns, and personal preferences across CLI sessions, eliminating repetitive context setup for recurring workflows.
   Community reaction: 16 comments, the highest engagement of any open issue, indicating strong, widespread demand for persistent context capabilities.
2. [Issue #2573: Bug: Web UI "Connecting to session..." infinite spinner when switching sessions](https://github.com/MoonshotAI/kimi-cli/issues/2573)
   Why it matters: Breaks core functionality of the technical preview Web UI, preventing users from accessing prior session context.
   Community reaction: 1 user-reported comment, affects users running kimi-cli 1.48.0 via Homebrew on macOS arm64.
3. [Issue #2584: Bug: Thai (and other IME-based) characters duplicated when typing in the prompt on Windows](https://github.com/MoonshotAI/kimi-cli/issues/2584)
   Why it matters: High-impact accessibility

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest | 2026-08-04
---

## 1. Today's Highlights
OpenCode released v1.18.12 on 2026-08-04, including a core bugfix for Azure GPT-5.5+ completion failures when reasoning is enabled, reduced desktop composer lag for large pasted image attachments, and expanded project search to match all known recent projects instead of only the first five. Community activity remains dominated by the ongoing central memory issue megathread, alongside surging demand for DeepSeek V4 Flash Responses API support and expanded Model Context Protocol (MCP) functionality. Significant behind-the-scenes work is also progressing on full V2 protocol migration for the OpenCode Desktop app.

---

## 2. Releases
### v1.18.12 (2026-08-04)
- **Core**: Fixed Azure GPT-5.5+ completion requests failing when reasoning is enabled (credit: @frederiknsgo)
- **Desktop**: Reduced composer lag when drafts include large pasted images or attachments; updated project search to match any known recent project instead of only the first five

---

## 3. Hot Issues (Top 10 by Engagement & Impact)
| Issue | Status | Comments / 👍 | Summary & Significance |
|-------|--------|---------------|------------------------|
| [#20695: Memory Megathread](https://github.com/anomalyco/opencode/issues/20695) | OPEN | 122 / 94 | Highest-engagement repo issue, serving as a central hub for all scattered memory bug reports. The OpenCode team is explicitly soliciting user-submitted heap snapshots to diagnose root causes, and has asked community members to avoid submitting unvetted LLM-generated fix suggestions. It has collected dozens of unique memory failure reports since its creation in April 2026. |
| [#8463: [2.0] Add --dangerously-skip-permissions (YOLO mode)](https://github.com/anomalyco/opencode/issues/8463) | CLOSED | 31 / 92 | Highly upvoted feature request for automated and trusted workflow use cases, which eliminates disruptive permission prompts. The feature was completed and closed, addressing a common pain point for

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

[LLM fallback] openai returned an empty response.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar).*