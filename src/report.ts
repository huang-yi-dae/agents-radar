/**
 * LLM invocation, file I/O, and GitHub issue creation helpers.
 *
 * LEARNING NOTES:
 * - This module is the "infrastructure layer" — it provides low-level utilities
 *   used by higher-level modules (index.ts, report-savers.ts, rollup.ts).
 * - The concurrency limiter is a custom semaphore implementation using a queue.
 * - The retry logic handles HTTP 429 (rate limit) errors with exponential backoff.
 *
 * KEY CONCEPTS:
 * - Semaphore pattern: limit the number of concurrent operations.
 * - Exponential backoff: wait 5s, then 10s, then 20s between retries.
 * - `finally` block: runs whether the try block succeeds or throws — used to release slots.
 */

import fs from "node:fs";
import path from "node:path";
import { type Lang, FOOTER } from "./i18n.ts";
import { sleep } from "./date.ts";

// ---------------------------------------------------------------------------
// LLM token budget constants
// Different report types need different token limits because they produce
// different amounts of content.
// ---------------------------------------------------------------------------

/** Default max tokens for LLM responses (4096). Used for most repo summaries. */
export const LLM_TOKENS_DEFAULT = 4096;

/** Max tokens for trending reports (6144) — trending data has many repos to analyze. */
export const LLM_TOKENS_TRENDING = 6144;

/** Max tokens for web content reports (8192) — long articles need more analysis. */
export const LLM_TOKENS_WEB = 8192;

/** Max tokens for weekly/monthly rollup reports (8192) — aggregating multiple days. */
export const LLM_TOKENS_ROLLUP = 8192;

// Import the provider factory — this is where the LLM provider is instantiated.
import { type LlmProvider, createProvider } from "./providers/index.ts";

/**
 * The singleton LLM provider instance.
 * Created once at module load time, reused for all LLM calls in this run.
 */
const provider: LlmProvider = createProvider();

// ---------------------------------------------------------------------------
// Concurrency limiter — prevents rate-limit (429) errors when many LLM calls
// are fired in parallel. At most LLM_CONCURRENCY requests are in-flight at
// any given time; the rest queue and run as slots free up.
//
// HOW IT WORKS:
// - `llmSlots` tracks available slots (starts at LLM_CONCURRENCY = 5).
// - `acquireSlot()` decrements a slot if available, or queues a resolver function.
// - `releaseSlot()` either resolves the next queued promise or increments the slot count.
// - This is a classic semaphore pattern implemented with a promise queue.
//
// VISUALIZATION:
//   Slots: [1][2][3][4][5]  — 5 available
//   acquireSlot() → [1][2][3][4]  — 4 available, 1 in use
//   acquireSlot() → [1][2][3]     — 3 available, 2 in use
//   ...all 5 used...
//   acquireSlot() → queue.push(resolve)  — queued, waiting for a slot
//   releaseSlot() → queue.shift()!(resolve)  — dequeued and resolved
// ---------------------------------------------------------------------------

/** Maximum number of concurrent LLM requests. Tune based on your API rate limits. */
const LLM_CONCURRENCY = 5;

/** Number of currently available slots. Decremented by acquire, incremented by release. */
let llmSlots = LLM_CONCURRENCY;

/**
 * Queue of resolver functions waiting for a slot.
 * Each entry is a `() => void` function that, when called, resolves a pending Promise.
 *
 * `Array<() => void>`: an array of functions that take no arguments and return nothing.
 * These are the `resolve` functions from `new Promise<void>((resolve) => ...)`.
 */
const llmQueue: Array<() => void> = [];

/**
 * Acquire a concurrency slot. Resolves immediately if a slot is available,
 * or waits in the queue if all slots are in use.
 *
 * HOW IT WORKS:
 * - If llmSlots > 0: decrement and resolve immediately (fast path).
 * - If llmSlots === 0: push the `resolve` function onto the queue.
 *   When a slot is released, the queue's first resolver will be called,
 *   which resolves this Promise and unblocks the awaiting caller.
 *
 * @returns A Promise that resolves when a slot is acquired
 */
function acquireSlot(): Promise<void> {
  if (llmSlots > 0) {
    llmSlots--;
    return Promise.resolve();
  }
  return new Promise((resolve) => llmQueue.push(resolve));
}

/**
 * Release a concurrency slot. Either wakes the next queued waiter
 * or increments the available slot count.
 *
 * HOW IT WORKS:
 * - `llmQueue.shift()` removes and returns the first element (FIFO queue).
 * - If there's a waiter: call its resolver to wake it up (slot transfers directly).
 * - If no waiter: increment llmSlots (slot returns to the pool).
 *
 * WHY NOT JUST llmSlots++?
 * - If we always incremented, a queued waiter would never be woken up.
 * - By calling the resolver, we transfer the slot directly to the next waiter.
 */
function releaseSlot(): void {
  const next = llmQueue.shift();
  if (next) {
    next(); // wake up the next waiter
  } else {
    llmSlots++; // return slot to pool
  }
}

// ---------------------------------------------------------------------------
// LLM
// ---------------------------------------------------------------------------

/** Maximum retry attempts for 429 errors. */
const MAX_RETRIES = 3;

/** Base delay for exponential backoff: 5s, 10s, 20s. */
const RETRY_BASE_MS = 5_000;

/**
 * Check if an error is a 429 rate-limit error.
 *
 * HOW IT WORKS:
 * - The Anthropic/OpenAI SDKs throw errors with a `status` property.
 * - We also check the string representation as a fallback.
 * - `as { status?: number }` is a type assertion — we tell TypeScript
 *   the error object might have a status field.
 *
 * @param err - The error to check
 * @returns True if this is a 429 rate-limit error
 */
export function is429(err: unknown): boolean {
  return (err as { status?: number })?.status === 429 || String(err).includes("429");
}

/**
 * Call the LLM with concurrency control and retry logic.
 *
 * HOW IT WORKS:
 * 1. Loop with increasing attempt number (0, 1, 2).
 * 2. Acquire a concurrency slot (may wait if all slots are busy).
 * 3. Call the provider's `call()` method.
 * 4. On success: release the slot and return the response.
 * 5. On 429 error: release the slot, wait with exponential backoff, retry.
 * 6. On other error: throw immediately (don't retry).
 *
 * THE `finally` BLOCK:
 * - Runs after the try/catch, regardless of whether an exception was thrown.
 * - The `released` flag prevents double-release: if we already released in the catch
 *   (for retry), the finally block skips the release.
 *
 * @param prompt - The prompt string to send to the LLM
 * @param maxTokens - Maximum tokens in the response (default: LLM_TOKENS_DEFAULT = 4096)
 * @returns The LLM's text response
 */
export async function callLlm(prompt: string, maxTokens = LLM_TOKENS_DEFAULT): Promise<string> {
  for (let attempt = 0; ; attempt++) {
    await acquireSlot();
    let released = false;
    try {
      return await provider.call(prompt, maxTokens);
    } catch (err) {
      if (attempt < MAX_RETRIES && is429(err)) {
        releaseSlot();
        released = true;
        // Exponential backoff: 5s × 2^0 = 5s, 5s × 2^1 = 10s, 5s × 2^2 = 20s
        const wait = RETRY_BASE_MS * 2 ** attempt;
        console.error(`[llm] 429 — retry ${attempt + 1}/${MAX_RETRIES} in ${wait / 1000}s...`);
        await sleep(wait);
        continue; // go back to the top of the loop
      }
      throw err; // non-429 error or max retries exceeded
    } finally {
      if (!released) releaseSlot();
    }
  }
}

// ---------------------------------------------------------------------------
// File output
// ---------------------------------------------------------------------------

/**
 * Write content to a file in the digests directory.
 *
 * HOW IT WORKS:
 * 1. `path.join("digests", ...segments)` builds the file path (e.g. "digests/2026-03-11/ai-cli.md").
 * 2. `fs.mkdirSync(..., { recursive: true })` creates the directory and all parent directories.
 * 3. `fs.writeFileSync(...)` writes the content to the file.
 *
 * @param content - The content to write
 * @param segments - Path segments (e.g. "2026-03-11", "ai-cli.md")
 * @returns The file path that was written
 */
export function saveFile(content: string, ...segments: string[]): string {
  const filepath = path.join("digests", ...segments);
  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  fs.writeFileSync(filepath, content, "utf-8");
  return filepath;
}

/**
 * Generate the "auto-generated by agents-radar" footer for reports.
 *
 * HOW IT WORKS:
 * - If DIGEST_REPO is not set, return empty string (no footer for local runs).
 * - Otherwise, return a Markdown footer with a link to the agents-radar repo.
 *
 * @param lang - Language code ("zh" or "en")
 * @returns A Markdown footer string, or empty string if DIGEST_REPO is not set
 */
export function autoGenFooter(lang: Lang = "zh"): string {
  const digestRepo = process.env["DIGEST_REPO"] ?? "";
  if (!digestRepo) return "";
  return `\n\n---\n*${FOOTER.autoGen[lang]} [agents-radar](https://github.com/${digestRepo})${lang === "en" ? "." : " 自动生成。"}*`;
}

// ── SUMMARY ──────────────────────────────────────────────────────────────────
// This module provides 3 core infrastructure utilities:
// 1. callLlm() — concurrency-limited, retry-enabled LLM caller
// 2. saveFile() — writes content to digests/YYYY-MM-DD/filename
// 3. autoGenFooter() — generates the report footer
//
// The concurrency limiter (acquireSlot/releaseSlot) is the most complex part.
// It's a classic semaphore: limit concurrent operations, queue excess requests.
//
// QUESTIONS:
// Q1: Why release the slot in the catch block (for retries) instead of in finally?
//     (Answer: On retry, we need to release BEFORE sleeping, so the slot is available
//      for other callers during the wait. The finally block only releases if we didn't
//      already release in the catch.)
// Q2: What happens if all 5 slots are taken and 10 more calls come in?
//     (Answer: The 10 calls each push their resolve function onto llmQueue.
//      As slots are released, the queue is drained FIFO — first queued, first served.)
// Q3: Why is `provider` a module-level constant instead of a parameter?
//     (Answer: There's only one provider per run, determined by LLM_PROVIDER env var.
//      Creating it once avoids redundant SDK client instantiation.)
// ─────────────────────────────────────────────────────────────────────────────
