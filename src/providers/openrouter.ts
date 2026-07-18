/**
 * OpenRouter provider — OpenAI-compatible endpoint via openrouter.ai.
 *
 * Env vars:
 *   OPENROUTER_API_KEY  - API key
 *   OPENROUTER_MODEL    - model name (default: anthropic/claude-sonnet-4)
 *
 * LEARNING NOTES:
 * - OpenRouter is a gateway that provides access to multiple LLM providers
 *   through a single OpenAI-compatible API.
 * - The model name includes the provider prefix (e.g. "anthropic/claude-sonnet-4").
 * - Same pattern as GitHub Copilot: fixed base URL, env-based API key.
 */

import { OpenAICompatibleProvider } from "./openai-compatible.ts";

/** OpenRouter API endpoint — fixed URL. */
const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";

/**
 * OpenRouter LLM provider.
 *
 * HOW IT WORKS:
 * - Extends OpenAICompatibleProvider with OpenRouter's endpoint.
 * - Uses OPENROUTER_API_KEY for authentication.
 * - Default model is "anthropic/claude-sonnet-4" — note the provider prefix.
 */
export class OpenRouterProvider extends OpenAICompatibleProvider {
  readonly name = "openrouter";

  constructor(opts?: { apiKey?: string; model?: string }) {
    super({
      apiKey: opts?.apiKey ?? process.env["OPENROUTER_API_KEY"],
      baseURL: OPENROUTER_BASE_URL,
      model: opts?.model ?? process.env["OPENROUTER_MODEL"] ?? "anthropic/claude-sonnet-4",
    });
  }
}

// ── SUMMARY ──────────────────────────────────────────────────────────────────
// OpenRouter provider — gateway to multiple LLM providers via one API.
// Same inheritance pattern as OpenAI and GitHub Copilot.
//
// QUESTIONS:
// Q1: Why does the default model include "anthropic/" prefix?
//     (Answer: OpenRouter routes to different providers — the prefix tells it
//      which provider's model to use)
// Q2: If all 3 providers extend OpenAICompatibleProvider, why is Anthropic different?
//     (Answer: Anthropic's API format differs in max_tokens naming and response structure)
// ─────────────────────────────────────────────────────────────────────────────
