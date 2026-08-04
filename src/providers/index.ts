export type { LlmProvider, ProviderFactory } from "./types.ts";
export { OpenAICompatibleProvider } from "./openai-compatible.ts";
export { AnthropicProvider } from "./anthropic.ts";
export { OpenAIProvider } from "./openai.ts";
export { GitHubCopilotProvider } from "./github-copilot.ts";
export { OpenRouterProvider } from "./openrouter.ts";
export { StepFunProvider } from "./stepfun.ts";

import type { LlmProvider, ProviderFactory } from "./types.ts";
import { AnthropicProvider } from "./anthropic.ts";
import { OpenAIProvider } from "./openai.ts";
import { GitHubCopilotProvider } from "./github-copilot.ts";
import { OpenRouterProvider } from "./openrouter.ts";
import { StepFunProvider } from "./stepfun.ts";

const PROVIDERS = {
  anthropic: () => new AnthropicProvider(),
  openai: () => new OpenAIProvider(),
  "github-copilot": () => new GitHubCopilotProvider(),
  openrouter: () => new OpenRouterProvider(),
  stepfun: () => new StepFunProvider(),
} satisfies Record<string, ProviderFactory>;

export type ProviderName = keyof typeof PROVIDERS;

export const VALID_PROVIDER_NAMES = Object.keys(PROVIDERS) as ProviderName[];

export function createProvider(name?: ProviderName): LlmProvider {
  const providerName = name ?? (process.env["LLM_PROVIDER"] as ProviderName | undefined) ?? "anthropic";
  const factory = (PROVIDERS as Record<string, ProviderFactory | undefined>)[providerName];
  if (!factory) {
    throw new Error(
      `Invalid LLM provider: "${providerName}". ` +
        `Valid providers are: ${VALID_PROVIDER_NAMES.join(", ")}. ` +
        `Set the LLM_PROVIDER env var to one of these options.`,
    );
  }
  console.log(`[providers] Using LLM provider: ${providerName}`);
  return factory();
}
