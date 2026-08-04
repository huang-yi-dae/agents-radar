import { OpenAICompatibleProvider } from "./openai-compatible.ts";

/**
 * OpenRouter provider.
 *
 * SUBCLASSES:
 * - None. This is a concrete implementation of OpenAICompatibleProvider.
 *
 * Each subclass only needs to:
 * 1. Declare its `name` property.
 * 2. Call `super()` with the right apiKey, baseURL, and model.
 */
export class OpenRouterProvider extends OpenAICompatibleProvider {
  readonly name = "openrouter";

  constructor(opts?: { apiKey?: string; baseURL?: string; model?: string }) {
    super({
      apiKey: opts?.apiKey,
      baseURL: opts?.baseURL ?? "https://openrouter.ai/api/v1",
      model: opts?.model ?? process.env["OPENROUTER_MODEL"] ?? "anthropic/claude-sonnet-4",
    });
  }
}

export default OpenRouterProvider;
