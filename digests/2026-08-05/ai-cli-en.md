# AI CLI Tools Community Digest 2026-08-05

> Generated: 2026-08-05 02:09 UTC | Tools covered: 7

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

> LLM generation failed: StepFun request failed: Connection error.


---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

⚠️ Skills summary generation failed.

---

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-08-05

## Today's Highlights
A critical security patch for the shell command variable expansion bypass vulnerability (GHSA-wpqr-6v78-jr5g) was progressed in the last 24 hours, closing an injection risk in bash and PowerShell command detection. Multiple high-priority bug fixes for agent reliability, session context corruption, and terminal UI stability were also actively developed, addressing long-standing user pain points. Ongoing community and maintainer discussions remain focused on subagent behavior consistency, memory system quality, and safeguards for destructive command execution.

## Releases
No new releases were published in the last 24 hours.

## Hot Issues
1. [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) [P1, area/agent] Subagent recovery after MAX_TURNS reported as GOAL success, hiding interruption
   Why it matters: Masks actual subagent failures during autonomous workflows, making debugging and reliability tracking impossible. Community reaction: 2 upvotes, 12 comments, marked `need-retesting` by maintainers.
2. [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) [P1, area/agent] Generalist agent hangs
   Why it matters: Breaks core agent functionality for even simple tasks like folder creation, with users reporting hour-long hangs. Community reaction: 8 upvotes, 8 comments, common workaround is explicitly disabling subagent use.
3. [#28418](https://github.com/google-gemini/gemini-cli/issues/28418) [P1, area/security] Security: $VAR/${VAR} variable expansion bypass in shell detection (GHSA-wpqr-6v78-jr5g)
   Why it matters: Unpatched vulnerability allows bypass of security gates for shell command execution, creating arbitrary command injection risk. Community reaction: Low comment count but high severity, paired with an open fix PR.
4. [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) [P2, area/agent] Gemini does not use skills and sub-agents enough
   Why it matters: Renders custom agent configurations useless for most use cases, forcing users to explicitly prompt for subagent/skill use every time. Community reaction: 6 comments, multiple anecdotal reports from power users.
5. [#26522](https://github.com/google-gemini/gemini-cli/issues/26522) [P2, area/agent] Stop Auto Memory from retrying low-signal sessions indefinitely
   Why it matters: Wastes compute resources and pollutes the memory inbox with irrelevant session data. Community reaction: 5 comments, no documented workaround currently exists.
6. [#25166](https://github.com/google-gemini/gemini-cli/issues/25166) [P2, area/core] Shell command execution gets stuck with "Waiting input" after command completes
   Why it matters: Breaks core shell execution workflow, leaves completed commands marked as active indefinitely. Community reaction: 3 upvotes, 4 comments, reproducible with simple non-interactive commands.
7. [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) [P1, area/agent] Assess impact of AST-aware file reads, search, and mapping
   Why it matters: Could significantly reduce token waste and unnecessary agent turns for codebase investigation tasks. Community reaction: 7 comments, 1 upvote, linked to planned improvements for the `codebase_investigator` subagent.
8. [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) [P1, area/agent] Browser subagent fails in Wayland
   Why it matters: Breaks browser automation for Linux users on the growing Wayland desktop environment. Community reaction: 1 upvote, 4 comments, no documented workaround.
9. [#26525](https://github.com/google-gemini/gemini-cli/issues/26525) [P2, area/security] Add deterministic redaction and reduce Auto Memory logging
   Why it matters: Prevents accidental secret leakage to background model contexts during memory extraction. Community reaction: 4 comments, part of broader Auto Memory security improvement efforts.
10. [#22093](https://github.com/google-gemini/gemini-cli/issues/22093) [P2, area/agent] (Sub)agents running without permission since v0.33.0
    Why it matters: Violates user-configured agent permissions, with subagents activating even when explicitly disabled in settings. Community reaction: 3 comments, multiple users report post-update behavior change.

## Key PR Progress
1. [#28691](https://github.com/google-gemini/gemini-cli/pull/28691) [P1, area/security] Fix $VAR/${VAR} variable expansion bypass (GHSA-wpqr-6v78-jr5g)
   Patches incomplete checks in `detectBashSubstitution` and `detectPowerShellSubstitution` to close the security bypass, plus hardens the automated issue deduplication workflow. Status: Open, paired with issue #28418.
2. [#28671](https://github.com/google-gemini/gemini-cli/pull/28671) [P1, area/core] Fix context corruption and quota error fallback issues
   Adds defensive history hardening to prevent context corruption when tool executions are interrupted by quota errors or user ESC queries, and fixes model autocomplete prefix continuation bugs. Status: Open.
3. [#28672](https://github.com/google-gemini/gemini-cli/pull/28672) [P1, area/core/agent] Repair /compress session reload and quota-fallback tool response loss
   Fixes `/compress` command failure when resuming sessions, and prevents loss of tool responses when hitting quota limits. Status: Open.
4. [#28681](https://github.com/google-gemini/gemini-cli/pull/28681) [P1, area/core/cli] Add support for SGLang and local OpenAI-compatible endpoints
   Adds support for local LLM inference endpoints via SGLang and OpenAI-compatible APIs, expanding deployment flexibility for self-hosted models. Status: Open.
5. [#28641](https://github.com/google-gemini/gemini-cli/pull/28641) [P2, area/core] Prevent ghost text wrapping infinite loop at narrow widths
   Fixes an infinite loop in `InputPrompt.tsx` when terminal width is narrower than a single wide codepoint (CJK/emoji), with added regression test

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

⚠️ Summary generation failed.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar).*