/**
 * Abstract LLM provider interface.
 *
 * All concrete providers must implement this contract so the rest of the
 * codebase can stay provider-agnostic.
 *
 * LEARNING NOTES:
 * - This is the "Strategy Pattern" — define an interface, implement it in multiple ways,
 *   and swap implementations at runtime based on configuration.
 * - `interface` in TypeScript defines a contract: any class implementing LlmProvider
 *   MUST have a `name` property and a `call()` method with the exact signatures shown.
 * - `readonly` means the property can only be set during construction, not modified later.
 * - `Promise<string>` means the function is async and returns a string.
 */

/**
 * The LLM provider interface. All providers implement this.
 *
 * MEMBERS:
 * - name: A human-readable identifier (e.g. "anthropic", "openai").
 *   Used for logging — never includes API keys or sensitive data.
 * - call(): Send a prompt to the LLM and get back the text response.
 *   @param prompt - The full prompt string (system + user message combined)
 *   @param maxTokens - Maximum tokens in the response (controls cost and latency)
 *   @returns The model's text response as a string
 */
export interface LlmProvider {
  readonly name: string;
  call(prompt: string, maxTokens: number): Promise<string>;
}

/**
 * Factory function type — a function that creates an LlmProvider instance.
 *
 * WHY FACTORY PATTERN?
 * - We don't want to instantiate providers at import time (that would read env vars
 *   and create SDK clients even if we never use them).
 * - Instead, we store factory functions and call them only when needed.
 * - The PROVIDERS registry in index.ts maps provider names to factory functions.
 */
export type ProviderFactory = () => LlmProvider;

// ── SUMMARY ──────────────────────────────────────────────────────────────────
// This file defines the contract that all LLM providers must follow:
// 1. LlmProvider interface — requires `name` (string) and `call()` (async method)
// 2. ProviderFactory type — a function that returns an LlmProvider
//
// QUESTIONS:
// Q1: Why use an interface instead of an abstract class?
//     (Answer: Interfaces are lighter — no runtime overhead, just a type check.
//      Abstract classes exist at runtime and add inheritance complexity.)
// Q2: What does `readonly` on `name` prevent?
//     (Answer: It prevents reassignment after construction: `provider.name = "x"` would error)
// ─────────────────────────────────────────────────────────────────────────────
