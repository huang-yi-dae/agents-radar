import { OpenAICompatibleProvider } from "./openai-compatible.ts";

/**
 * GitHub Copilot provider.
 *
 * SUBCLASSES:
 * - None. This is a concrete implementation of OpenAICompatibleProvider.
 *
 * Each subclass only needs to:
 * 1. Declare its `name` property.
 * 2. Call `super()` with the right apiKey, baseURL, and model.
 */
export class GitHubCopilotProvider extends OpenAICompatibleProvider {
  readonly name = "github-copilot";

  constructor(opts?: { apiKey?: string; baseURL?: string; model?: string }) {
    super({
      apiKey: opts?.apiKey ?? process.env["GITHUB_TOKEN"],
      baseURL: opts?.baseURL,
      model: opts?.model ?? process.env["GITHUB_COPILOT_MODEL"] ?? "gpt-4o",
    });
  }
}

export default GitHubCopilotProvider;
