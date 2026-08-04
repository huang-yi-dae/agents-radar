/**
 * StepFun provider — OpenAI-compatible endpoint via StepFun.
 *
 * Env vars:
 *   STEPFUN_API_KEY     - API key
 *   STEPFUN_MODEL       - model name (default: step-3.7-flash)
 *
 * OFFICIAL RESPONSE SHAPE (confirmed from StepFun docs / community reports):
 * - `message.content` is the final assistant text we should use for reports.
 * - Reasoning models also return `message.reasoning` and `message.reasoning_content`,
 *   but these are internal thinking traces. The model's `content` may already embed
 *   reasoning/thinking blocks when the prompt requests structured reasoning.
 * - Prepending or falling back to `reasoning_content` can double-wrap thinking
 *   content and leak internal reasoning into the daily digest.
 *
 * Refs:
 * - https://platform.stepfun.com/docs/zh/api-reference/chat/chat-completion-create
 * - https://github.com/stepfun-ai/gelab-zero/issues/62
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
 * - Overrides `call()` so final digest text comes only from `message.content`,
 *   avoiding leakage of internal reasoning fields.
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

  /**
   * Send a prompt and return only the assistant `content`.
   *
   * StepFun may include `reasoning` / `reasoning_content` on reasoning models,
   * but those fields represent internal thinking. We intentionally do NOT use
   * them as final output, because:
   * 1. they are thinking traces, not the user-facing answer, and
   * 2. the model's `content` may already contain the required reasoning format.
   */
  async call(prompt: string, maxTokens: number): Promise<string> {
    const response = await this.client.chat.completions.create({
      model: this.model,
      max_completion_tokens: maxTokens,
      messages: [{ role: "user", content: prompt }],
    });

    const message = response.choices?.[0]?.message;
    const text = message?.content ?? "";

    if (text) return text;

    const responseSummary = {
      id: response.id,
      model: response.model,
      object: response.object,
      serviceTier: (response as { service_tier?: string }).service_tier,
      systemFingerprint: (response as { system_fingerprint?: string }).system_fingerprint,
      usage: response.usage,
      choices: response.choices,
    };
    console.error(`[${this.name}] LLM call returned empty content: ${JSON.stringify(responseSummary)}`);
    return `[LLM fallback] ${this.name} returned an empty response.`;
  }
}
