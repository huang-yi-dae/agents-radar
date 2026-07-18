/**
 * OpenAI provider — wraps the openai SDK.
 *
 * Env vars:
 *   OPENAI_API_KEY   - API key
 *   OPENAI_BASE_URL  - endpoint override (optional)
 *   OPENAI_MODEL     - model name (default: gpt-4o)
 *
 * LEARNING NOTES:
 * - Extends OpenAICompatibleProvider — inherits the `call()` method.
 * - Only needs to define `name` and call `super()` with the right config.
 * - This is the simplest provider: 90% of the logic is in the base class.
 */

import { OpenAICompatibleProvider } from "./openai-compatible.ts";

/**
 * OpenAI LLM provider.
 *
 * HOW IT WORKS:
 * - Extends OpenAICompatibleProvider (inherits `call()` method).
 * - Reads API key from OPENAI_API_KEY env var.
 * - Reads base URL from OPENAI_BASE_URL env var (defaults to OpenAI's official endpoint).
 * - Reads model from OPENAI_MODEL env var (defaults to "gpt-4o").
 * - The `opts?` parameter allows overriding env vars for testing.
 */
export class OpenAIProvider extends OpenAICompatibleProvider {
  readonly name = "openai";

  constructor(opts?: { apiKey?: string; baseURL?: string; model?: string }) {
    super({
      apiKey: opts?.apiKey ?? process.env["OPENAI_API_KEY"],
      baseURL: opts?.baseURL ?? process.env["OPENAI_BASE_URL"],
      model: opts?.model ?? process.env["OPENAI_MODEL"] ?? "gpt-4o",
    });
  }
}

// ── SUMMARY ──────────────────────────────────────────────────────────────────
// OpenAI provider — extends OpenAICompatibleProvider.
// Only 10 lines of actual code: the base class does all the heavy lifting.
// The `opts?` parameter demonstrates optional constructor arguments for testing.
//
// QUESTIONS:
// Q1: What does `opts?.apiKey` mean? (Answer: optional chaining — if opts is undefined,
//     the whole expression evaluates to undefined instead of throwing)
// Q2: Why pass `opts?.baseURL` before `process.env["OPENAI_BASE_URL"]`?
//     (Answer: Constructor args take priority over env vars — allows runtime overrides)
// ─────────────────────────────────────────────────────────────────────────────
