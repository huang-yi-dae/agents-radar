/**
 * Anthropic provider — wraps the @anthropic-ai/sdk.
 *
 * Env vars:
 *   ANTHROPIC_API_KEY   - API key (read automatically by the SDK)
 *   ANTHROPIC_BASE_URL  - endpoint override (read automatically by the SDK)
 *   ANTHROPIC_MODEL     - model name (default: claude-sonnet-4-6)
 *
 * LEARNING NOTES:
 * - This provider does NOT extend OpenAICompatibleProvider because the Anthropic API
 *   has a different request/response format.
 * - The Anthropic SDK reads ANTHROPIC_API_KEY and ANTHROPIC_BASE_URL automatically
 *   from environment variables when you do `new Anthropic()`.
 * - The response structure is `message.content[0].text` (an array of content blocks).
 */

import Anthropic from "@anthropic-ai/sdk";
import type { LlmProvider } from "./types.ts";

/**
 * Anthropic LLM provider.
 *
 * Implements the LlmProvider interface using the Anthropic SDK.
 */
export class AnthropicProvider implements LlmProvider {
  /** Provider identifier — used in logging. */
  readonly name = "anthropic";

  /** The Anthropic SDK client. `private` = only accessible within this class. */
  private readonly client: Anthropic;

  /** The model name (e.g. "claude-sonnet-4-6"). */
  private readonly model: string;

  /**
   * Constructor — creates the Anthropic client.
   *
   * HOW IT WORKS:
   * - If a model is passed, use it; otherwise read from ANTHROPIC_MODEL env var;
   *   otherwise fall back to "claude-sonnet-4-6".
   * - `new Anthropic()` automatically reads ANTHROPIC_API_KEY and ANTHROPIC_BASE_URL from env.
   *
   * @param model - Optional model name override
   */
  constructor(model?: string) {
    this.model = model ?? process.env["ANTHROPIC_MODEL"] ?? "claude-sonnet-4-6";
    this.client = new Anthropic();
  }

  /**
   * Send a prompt to the Anthropic API and return the text response.
   *
   * HOW IT WORKS:
   * 1. Call `client.messages.create()` with the model, max_tokens, and a single user message.
   * 2. The response has a `content` array — each element is a content block.
   * 3. We expect the first block to be of type "text" — extract its `text` property.
   *
   * NOTE: Anthropic uses `max_tokens` (not `max_completion_tokens` like OpenAI).
   *
   * @param prompt - The prompt string
   * @param maxTokens - Maximum tokens in the response
   * @returns The model's text response
   */
  async call(prompt: string, maxTokens: number): Promise<string> {
    const message = await this.client.messages.create({
      model: this.model,
      max_tokens: maxTokens,
      messages: [{ role: "user", content: prompt }],
    });
    const block = message.content[0];
    if (block?.type !== "text") throw new Error("Unexpected response type from Anthropic");
    return block.text;
  }
}

// ── SUMMARY ──────────────────────────────────────────────────────────────────
// Anthropic provider — implements LlmProvider using the @anthropic-ai/sdk.
// Unlike the other providers, this does NOT extend OpenAICompatibleProvider
// because the Anthropic API has a different request/response format.
//
// QUESTIONS:
// Q1: Why use `private readonly` for client and model?
//     (Answer: `private` = only accessible in this class; `readonly` = can't be reassigned)
// Q2: What does `block?.type !== "text"` check?
//     (Answer: Optional chaining `?.` handles the case where content[0] is undefined;
//      the type check ensures we got a text block, not an image or tool_use block)
// ─────────────────────────────────────────────────────────────────────────────
