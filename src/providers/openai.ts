import { OpenAICompatibleProvider } from "./openai-compatible.ts";

/**
 * OpenAI provider.
 *
 * SUBCLASSES:
 * - None. This is a concrete implementation of OpenAICompatibleProvider.
 *
 * Each subclass only needs to:
 * 1. Declare its `name` property.
 * 2. Call `super()` with the right apiKey, baseURL, and model.
 */
export class OpenAIProvider extends OpenAICompatibleProvider {
  readonly name = "openai";

  constructor(opts?: { apiKey?: string; baseURL?: string; model?: string }) {
    super({
      apiKey: opts?.apiKey,
      baseURL: opts?.baseURL,
      model: opts?.model ?? process.env["OPENAI_MODEL"] ?? "gpt-4o",
    });
  }
}

export default OpenAIProvider;
