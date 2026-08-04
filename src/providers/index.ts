/**
 * Provider barrel — re-exports and factory.
 *
 * LEARNING NOTES:
 * - This file serves two purposes:
 *   1. "Barrel" re-export: other files can `import { AnthropicProvider } from "./providers/index.ts"`
 *      instead of `from "./providers/anthropic.ts"`. This simplifies imports.
 *   2. Factory: `createProvider()` instantiates the right provider based on LLM_PROVIDER env var.
 *
 * KEY CONCEPTS:
 * - `export type { ... } from "..."` — re-exports a type without importing it into scope.
 * - `satisfies` keyword (TypeScript 4.9+): validates that an object matches a type WITHOUT
 *   widening its type. The object keeps its precise literal types.
 * - `Record<string, ProviderFactory | undefined>` — allows safe lookup with `undefined` for missing keys.
 */

export type { LlmProvider, ProviderFactory } from "./types.ts";
export { OpenAICompatibleProvider } from "./openai-compatible.ts";
export { AnthropicProvider } from "./anthropic.ts";
export { OpenAIProvider } from "./openai.ts";
export { GitHubCopilotProvider } from "./github-copilot.ts";
export { OpenRouterProvider } from "./openrouter.ts";

import type { LlmProvider, ProviderFactory } from "./types.ts";
import { AnthropicProvider } from "./anthropic.ts";
import { OpenAIProvider } from "./openai.ts";
import { GitHubCopilotProvider } from "./github-copilot.ts";
import { OpenRouterProvider } from "./openrouter.ts";

// ---------------------------------------------------------------------------
// Single source of truth — add new providers here only.
// ---------------------------------------------------------------------------

/**
 * Registry of all available providers.
 *
 * HOW IT WORKS:
 * - Each key is a provider name (matching the LLM_PROVIDER env var values).
 * - Each value is a factory function that creates a new provider instance.
 * - `satisfies Record<string, ProviderFactory>` ensures TypeScript validates
 *   that every value is a valid ProviderFactory, while keeping the exact key types.
 *
 * TO ADD A NEW PROVIDER:
 * 1. Create a new file in src/providers/ (e.g. "groq.ts")
 * 2. Implement the LlmProvider interface
 * 3. Add an entry here: `groq: () => new GroqProvider()`
 * 4. That's it — the factory and validation handle the rest.
 */
const PROVIDERS = {
  anthropic: () => new AnthropicProvider(),
  openai: () => new OpenAIProvider(),
  "github-copilot": () => new GitHubCopilotProvider(),
  openrouter: () => new OpenRouterProvider(),
} satisfies Record<string, ProviderFactory>;

/**
 * Supported provider name — derived from the PROVIDERS registry keys.
 * This is a union type: "anthropic" | "openai" | "github-copilot" | "openrouter".
 * TypeScript infers this from the object keys automatically.
 */
export type ProviderName = keyof typeof PROVIDERS;

/**
 * All valid provider names — derived from the registry.
 * Used for error messages: "Valid providers are: anthropic, openai, github-copilot, openrouter"
 */
export const VALID_PROVIDER_NAMES = Object.keys(PROVIDERS) as ProviderName[];

/**
 * Create an LLM provider by name.
 *
 * HOW IT WORKS:
 * 1. Read the provider name from the parameter, or LLM_PROVIDER env var, or default "anthropic".
 * 2. Look up the factory in the PROVIDERS registry.
 * 3. If not found, throw a descriptive error with valid options.
 * 4. Log the provider name (never log API keys or URLs).
 * 5. Call the factory to create and return the provider instance.
 *
 * LOG SAFETY:
 * - Only the provider NAME is logged — never API keys, endpoint URLs, or model names.
 * - This prevents accidental credential exposure in CI logs.
 *
 * @param name - Optional provider name (overrides LLM_PROVIDER env var)
 * @returns A new LlmProvider instance
 */
export function createProvider(name?: ProviderName): LlmProvider {
  const providerName = name ?? (process.env["LLM_PROVIDER"] as ProviderName | undefined) ?? "anthropic";

  // Cast to allow undefined values — we check below
  const factory = (PROVIDERS as Record<string, ProviderFactory | undefined>)[providerName];
  if (!factory) {
    throw new Error(
      `Invalid LLM provider: "${providerName}". ` +
        `Valid providers are: ${VALID_PROVIDER_NAMES.join(", ")}. ` +
        `Set the LLM_PROVIDER env var to one of these values.`,
    );
  }

  console.log(`[providers] Using LLM provider: ${providerName}`);
  return factory();
}

// ── SUMMARY ──────────────────────────────────────────────────────────────────
// This file is the entry point for the providers module. It does 3 things:
// 1. Re-exports all provider classes and types (barrel pattern)
// 2. Defines the PROVIDERS registry (mapping names to factory functions)
// 3. Provides createProvider() factory that reads LLM_PROVIDER env var
//
// QUESTIONS:
// Q1: What does `satisfies` do differently from `as` (type assertion)?
//     (Answer: `as` tells TypeScript "trust me" and changes the type;
//      `satisfies` validates the type WITHOUT changing it — the object keeps
//      its precise literal keys, so `keyof typeof PROVIDERS` works correctly)
// Q2: Why use factory functions (`() => new AnthropicProvider()`) instead of
//     just storing class references (`AnthropicProvider`)?
//     (Answer: Deferred instantiation — the provider is only created when
//      createProvider() is called, not when the module is imported)
// ─────────────────────────────────────────────────────────────────────────────
