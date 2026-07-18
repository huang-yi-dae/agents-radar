/**
 * GitHub Copilot provider — OpenAI-compatible endpoint via GitHub Models.
 *
 * Env vars:
 *   GITHUB_TOKEN           - GitHub token (PAT or GitHub Actions `GITHUB_TOKEN`)
 *   GITHUB_COPILOT_MODEL   - model name (default: gpt-4o)
 *
 * LEARNING NOTES:
 * - GitHub Copilot exposes an OpenAI-compatible API at models.github.ai.
 * - Authentication uses GITHUB_TOKEN (not a separate API key).
 * - The base URL is hard-coded because it's a fixed endpoint.
 */

import { OpenAICompatibleProvider } from "./openai-compatible.ts";

/** GitHub Models inference endpoint — fixed URL, not configurable. */
const GITHUB_COPILOT_BASE_URL = "https://models.github.ai/inference";

/**
 * GitHub Copilot LLM provider.
 *
 * HOW IT WORKS:
 * - Extends OpenAICompatibleProvider with GitHub's endpoint.
 * - Uses GITHUB_TOKEN as the API key (same token used for GitHub API calls).
 * - Default model is "gpt-4o", overridable with GITHUB_COPILOT_MODEL env var.
 */
export class GitHubCopilotProvider extends OpenAICompatibleProvider {
  readonly name = "github-copilot";

  constructor(opts?: { apiKey?: string; model?: string }) {
    super({
      apiKey: opts?.apiKey ?? process.env["GITHUB_TOKEN"],
      baseURL: GITHUB_COPILOT_BASE_URL,
      model: opts?.model ?? process.env["GITHUB_COPILOT_MODEL"] ?? "gpt-4o",
    });
  }
}

// ── SUMMARY ──────────────────────────────────────────────────────────────────
// GitHub Copilot provider — same pattern as OpenAIProvider.
// Key difference: uses GITHUB_TOKEN for auth and a fixed base URL.
//
// QUESTIONS:
// Q1: Why is the base URL a constant instead of reading from an env var?
//     (Answer: GitHub Models has a single fixed endpoint — there's no reason to configure it)
// Q2: Why doesn't this class have a `baseURL` constructor option?
//     (Answer: Same reason — the endpoint is always the same, so it's hard-coded)
// ─────────────────────────────────────────────────────────────────────────────
