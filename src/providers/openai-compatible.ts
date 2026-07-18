/**
 * Base class for OpenAI-compatible providers.
 *
 * Shared by OpenAI, GitHub Copilot, and OpenRouter providers.
 *
 * LEARNING NOTES:
 * - This is the "Template Method" pattern: the base class defines the algorithm
 *   (create client, call API, extract text), and subclasses only provide configuration.
 * - `abstract` means this class cannot be instantiated directly — you must subclass it.
 * - `protected` means the member is accessible from this class and its subclasses,
 *   but NOT from outside code. (Contrast with `private` = only this class, `public` = everywhere.)
 * - `implements LlmProvider` means this class promises to satisfy the LlmProvider interface.
 *
 * KEY CONCEPTS:
 * - `abstract readonly name: string` — subclasses MUST define `name`.
 * - `protected readonly client: OpenAI` — the SDK client, shared by all subclasses.
 * - The `OpenAI` SDK is used because many providers expose OpenAI-compatible endpoints.
 */

import OpenAI from "openai";
import type { LlmProvider } from "./types.ts";

/**
 * Abstract base class for LLM providers that use OpenAI-compatible APIs.
 *
 * SUBCLASSES:
 * - OpenAIProvider (src/providers/openai.ts)
 * - GitHubCopilotProvider (src/providers/github-copilot.ts)
 * - OpenRouterProvider (src/providers/openrouter.ts)
 *
 * Each subclass only needs to:
 * 1. Declare its `name` property.
 * 2. Call `super()` with the right apiKey, baseURL, and model.
 */
export abstract class OpenAICompatibleProvider implements LlmProvider {
  /** Each subclass must define this. Example: "openai", "github-copilot", "openrouter". */
  abstract readonly name: string;

  /** The OpenAI SDK client — shared across all subclasses. `protected` so subclasses can access it. */
  protected readonly client: OpenAI;

  /** The model name to use (e.g. "gpt-4o", "anthropic/claude-sonnet-4"). */
  protected readonly model: string;

  /**
   * Constructor — creates the OpenAI client with the given options.
   *
   * HOW IT WORKS:
   * - Stores the model name.
   * - Creates an OpenAI client with the apiKey and baseURL.
   * - The OpenAI SDK automatically reads OPENAI_API_KEY from env if apiKey is undefined.
   *
   * @param opts.apiKey - API key (optional — SDK reads from env if not provided)
   * @param opts.baseURL - API endpoint URL (e.g. "https://api.openai.com/v1")
   * @param opts.model - Model name (e.g. "gpt-4o")
   */
  constructor(opts: { apiKey?: string; baseURL?: string; model: string }) {
    this.model = opts.model;
    this.client = new OpenAI({
      apiKey: opts.apiKey,
      baseURL: opts.baseURL,
    });
  }

  /**
   * Send a prompt to the LLM and return the text response.
   *
   * HOW IT WORKS:
   * 1. Call the chat completions API with a single user message.
   * 2. Extract the text from the first choice's message content.
   * 3. Throw if the response is empty (shouldn't happen with valid models).
   *
   * NOTE: `max_completion_tokens` is the OpenAI API parameter name.
   * The Anthropic SDK uses `max_tokens` — that's why AnthropicProvider doesn't extend this class.
   *
   * @param prompt - The prompt string
   * @param maxTokens - Maximum tokens in the response
   * @returns The model's text response
   */
  async call(prompt: string, maxTokens: number): Promise<string> {
    const response = await this.client.chat.completions.create({
      model: this.model,
      max_completion_tokens: maxTokens,
      messages: [{ role: "user", content: prompt }],
    });
    const text = response.choices[0]?.message?.content;
    if (!text) throw new Error(`Unexpected empty response from ${this.name}`);
    return text;
  }
}

// ── SUMMARY ──────────────────────────────────────────────────────────────────
// This is the shared base class for OpenAI-compatible providers.
// Key patterns:
// 1. Abstract class with abstract property — subclasses MUST define `name`
// 2. Template Method pattern — the `call()` algorithm is defined here,
//    subclasses only provide config via constructor
// 3. Protected members — `client` and `model` are accessible to subclasses
//
// QUESTIONS:
// Q1: Why doesn't AnthropicProvider extend this class?
//     (Answer: The Anthropic API has a different request/response format —
//      it uses `max_tokens` instead of `max_completion_tokens`, and the response
//      structure is `message.content[0].text` vs `choices[0].message.content`)
// Q2: What's the difference between `protected` and `private`?
//     (Answer: `private` = only accessible in the declaring class;
//      `protected` = accessible in the declaring class AND its subclasses)
// ─────────────────────────────────────────────────────────────────────────────
