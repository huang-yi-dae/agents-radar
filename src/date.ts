/**
 * Date and timing utilities used across the pipeline.
 *
 * LEARNING NOTES:
 * - This module provides pure utility functions for date formatting and async delays.
 * - All dates in this project use JavaScript's built-in `Date` class (no date libraries).
 * - The pipeline uses CST (China Standard Time, UTC+8) for display dates and UTC for metadata.
 *
 * KEY CONCEPTS:
 * - `Date.getTime()` returns milliseconds since Unix epoch (Jan 1, 1970 00:00:00 UTC).
 * - Adding milliseconds to a Date shifts it forward in time.
 * - `.toISOString()` always outputs UTC in format "YYYY-MM-DDTHH:mm:ss.sssZ".
 * - `.slice(0, 10)` extracts just the "YYYY-MM-DD" portion.
 * - `Promise<void>`: a Promise that resolves to nothing (side-effect only).
 */

/** CST offset in milliseconds: 8 hours × 60 min × 60 sec × 1000 ms = 28,800,000 ms */
const CST_OFFSET_MS = 8 * 60 * 60 * 1000;

/**
 * Convert a Date to a CST (UTC+8) date string like "2026-03-11".
 *
 * HOW IT WORKS:
 * 1. `date.getTime()` — get the UTC timestamp in milliseconds.
 * 2. `+ CST_OFFSET_MS` — shift forward by 8 hours to get CST time.
 * 3. `new Date(...)` — create a new Date from the shifted timestamp.
 * 4. `.toISOString()` — format as ISO string (still UTC-based, but shifted).
 * 5. `.slice(0, 10)` — extract "YYYY-MM-DD" portion.
 *
 * EXAMPLE: If UTC is 2026-03-10 23:00, adding 8h gives 2026-03-11 07:00,
 *           so the result is "2026-03-11".
 *
 * @param date - Any Date object (typically `new Date()` for "now")
 * @returns A date string in "YYYY-MM-DD" format, representing the CST date
 */
export function toCstDateStr(date: Date): string {
  return new Date(date.getTime() + CST_OFFSET_MS).toISOString().slice(0, 10);
}

/**
 * Format a Date as a compact UTC string like "2026-03-11 00:00".
 *
 * HOW IT WORKS:
 * 1. `.toISOString()` → "2026-03-11T00:00:00.000Z"
 * 2. `.slice(0, 16)` → "2026-03-11T00:00"
 * 3. `.replace("T", " ")` → "2026-03-11 00:00"
 *
 * @param date - Any Date object
 * @returns A compact UTC datetime string
 */
export function toUtcStr(date: Date): string {
  return date.toISOString().slice(0, 16).replace("T", " ");
}

/**
 * Promise-based delay. Used for retry backoff and polite web scraping delays.
 *
 * HOW IT WORKS:
 * - `setTimeout(r, ms)` schedules `r` (the resolve function) to be called after `ms` milliseconds.
 * - `new Promise((r) => ...)` wraps the callback-based setTimeout into a Promise,
 *   so you can `await sleep(1000)` to pause for 1 second.
 *
 * @param ms - Milliseconds to wait
 * @returns A Promise that resolves after the delay
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

// ── SUMMARY ──────────────────────────────────────────────────────────────────
// This is a small utility module with 3 functions:
// 1. toCstDateStr — converts Date to "YYYY-MM-DD" in CST timezone
// 2. toUtcStr — converts Date to "YYYY-MM-DD HH:mm" in UTC
// 3. sleep — async delay (Promise wrapper around setTimeout)
//
// QUESTIONS TO TEST YOUR UNDERSTANDING:
// Q1: Why does toCstDateStr add milliseconds instead of using timezone-aware formatting?
// Q2: What would happen if you called toCstDateStr(new Date("2026-03-11T00:00:00Z"))?
//     (Hint: 00:00 UTC + 8h = 08:00 CST, so the date stays "2026-03-11")
// Q3: Why is sleep() useful in an async pipeline? Where is it used?
// ─────────────────────────────────────────────────────────────────────────────
