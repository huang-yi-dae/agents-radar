/**
 * StepFun provider — OpenAI-compatible endpoint via StepFun.
 *
 * Env vars:
 *   OPENAI_API_KEY     - API key
 *   OPENAI_BASE_URL    - endpoint override (default: https://api.stepfun.com/step_plan/v1)
 *   OPENAI_MODEL       - model name (default: step-3.7-flash)
 *
 * OFFICIAL RESPONSE SHAPE (confirmed from StepFun docs):
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
const STEPFUN_BASE_URL = "https://api.stepfun.com/step_plan/v1";

// StepFun reasoning models may surface internal thinking traces inside
// `message.content` as well as in dedicated `reasoning` / `reasoning_content`
// fields. We aggressively strip those internal traces so the final digest only
// keeps the user-facing answer.
const STEPFUN_THINKING_PATTERNS = [
  /<think>[\s\S]*?<\/think>/i,
  /<thinking>[\s\S]*?<\/thinking>/i,
  /\[thinking\][\s\S]*?\[\/thinking\]/i,
  /【thinking】[\s\S]*?【\/thinking】/i,
  /【thinking】[\s\S]*?】/i,
];

// Some StepFun reasoning responses may embed self-instructions or planning
// prose inside `message.content` instead of dedicated reasoning fields.
const STEPFUN_PLANNING_PATTERNS = [
  /[\s\S]*?用户现在需要我基于[\s\S]*?(?=\n\n#{1,3}\s|\n\n[-*] |\n\n\d+\. |(?=\n*$))/,
  /[\s\S]*?首先第一个部分[，,][\s\S]*?(?=\n\n#{1,3}\s|\n\n[-*] |\n\n\d+\. |(?=\n*$))/,
  /[\s\S]*?然后第[一二三四五六七八九十]+个部分[，,][\s\S]*?(?=\n\n#{1,3}\s|\n\n[-*] |\n\n\d+\. |(?=\n*$))/,
  /[\s\S]*?总结一下[：:][\s\S]*?(?=\n\n#{1,3}\s|\n\n[-*] |\n\n\d+\. |(?=\n*$))/,
];

/**
 * StepFun LLM provider.
 *
 * HOW IT WORKS:
 * - Extends OpenAICompatibleProvider with StepFun's endpoint.
 * - Uses OPENAI_API_KEY for authentication.
 * - Default model is "step-3.7-flash", overridable with OPENAI_MODEL env var.
 * - Sets `reasoning_effort` to `low` so the model keeps more of its token budget
 *   for the final user-facing report instead of deep internal thinking.
 * - Overrides `call()` so final digest text comes only from `message.content`,
 *   avoiding leakage of internal reasoning fields.
 */
export class StepFunProvider extends OpenAICompatibleProvider {
  readonly name = "stepfun";

  constructor(opts?: { apiKey?: string; baseURL?: string; model?: string }) {
    super({
      apiKey: opts?.apiKey ?? process.env["OPENAI_API_KEY"],
      baseURL: opts?.baseURL ?? process.env["OPENAI_BASE_URL"] ?? STEPFUN_BASE_URL,
      model: opts?.model ?? process.env["OPENAI_MODEL"] ?? "step-3.7-flash",
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
    const extraBody = { reasoning_format: "deepseek-style" } as Record<string, unknown>;
    let response;
    try {
      response = await this.client.chat.completions.create({
        model: this.model,
        max_completion_tokens: maxTokens,
        reasoning_effort: "low",
        ...(Object.keys(extraBody).length > 0 ? { extra_body: extraBody } : {}),
        messages: [
          {
            role: "system",
            content:
              "You are a careful report editor.\n" +
              "Always output only the final user-facing report content.\n" +
              "Never include planning, reasoning, self-instructions, chain-of-thought, or internal thinking traces.\n",
          },
          { role: "user", content: prompt },
        ],
      });
    } catch (err) {
      const rawMessage = err instanceof Error ? err.message : String(err);
      const message = /402/.test(rawMessage)
        ? `StepFun request failed with quota/billing error: ${rawMessage}. Check your StepFun plan, billing details, and OPENAI_MODEL access.`
        : `StepFun request failed: ${rawMessage}`;
      throw new Error(message);
    }

    const message = response.choices?.[0]?.message;
    const rawText = typeof message?.content === "string" ? message.content : "";

    // Always prefer `content`; never use internal reasoning fields as final output.
    const cleanedText = STEPFUN_THINKING_PATTERNS.reduce(
      (text, pattern) => text.replace(pattern, "").trim(),
      rawText,
    );

    const plannedText = STEPFUN_PLANNING_PATTERNS.reduce(
      (text, pattern) => text.replace(pattern, "").trim(),
      cleanedText,
    );

    const normalizedText = plannedText.trim();
    if (normalizedText) return normalizedText;

    const responseSummary = {
      contentPreview: typeof rawText === "string" ? rawText.slice(0, 200) : rawText,
      id: response.id,
      model: response.model,
      object: response.object,
      serviceTier: (response as { service_tier?: string }).service_tier,
      usage: response.usage,
      choices: response.choices,
    };
    console.error(`[${this.name}] LLM call returned no usable content: ${JSON.stringify(responseSummary)}`);
    return `[LLM fallback] ${this.name} returned an empty response.`;
  }
}
