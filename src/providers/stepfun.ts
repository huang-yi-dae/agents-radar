/**
 * StepFun provider — OpenAI-compatible endpoint via StepFun.
 *
 * Env vars:
 *   STEPFUN_API_KEY     - API key
 *   STEPFUN_MODEL       - model name (default: step-3.7-flash)
 *
 * LEARNING NOTES:
 * - StepFun exposes an OpenAI-compatible API at https://api.stepfun.com/v1.
 * - Reasoning-capable models may return `message.reasoning` as internal thinking
 *   and `message.reasoning_content` as the answer-oriented reasoning field.
 * - The base class now ignores `reasoning` for final report text to avoid leaking
 *   internal thinking into generated digests.
 */

import { OpenAICompatibleProvider } from "./openai-compatible.ts";

/** StepFun API endpoint. */
const STEPFUN_BASE_URL = "https://api.stepfun.com/v1";

/**
 * StepFun LLM provider.
 *
 * HOW IT WORKS:
 * - Extends OpenAICompatibleProvider with StepFun's endpoint.
 * - Uses STEPFUN_API_KEY for authentication.
 * - Default model is "step-3.7-flash", overridable with STEPFUN_MODEL env var.
 */
export class StepFunProvider extends OpenAICompatibleProvider {
  readonly name = "stepfun";

  constructor(opts?: { apiKey?: string; model?: string }) {
    super({
      apiKey: opts?.apiKey ?? process.env["STEPFUN_API_KEY"],
      baseURL: STEPFUN_BASE_URL,
      model: opts?.model ?? process.env["STEPFUN_MODEL"] ?? "step-3.7-flash",
    });
  }
}

// ── SUMMARY ──────────────────────────────────────────────────────────────────
// StepFun provider — same inheritance pattern as OpenAI and other compatible providers.
// Key difference: uses a fixed StepFun endpoint and StepFun-specific env vars.
//
// QUESTIONS
// Q1: Why do we ignore `message.reasoning` in the base class for StepFun?
//     (Answer: StepFun may include internal thinking in `reasoning`; that should
//      not become part of the daily report. We prefer `content` or
//      `reasoning_content` instead.)
// Q2: When should `STEPFUN_MODEL` be set?
//     (Answer: When you want to override the default StepFun reasoning model
//      without changing code.)
// ─────────────────────────────────────────────────────────────────────────────
