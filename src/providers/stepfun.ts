import { OpenAICompatibleProvider } from "./openai-compatible.ts";

const STEPFUN_BASE_URL = "https://api.stepfun.com/v1";

const STEPFUN_THINKING_PATTERNS = [
  /<think>[\s\S]*?<\/think>/i,
  /<thinking>[\s\S]*?<\/thinking>/i,
  /\[thinking\][\s\S]*?\[\/thinking\]/i,
  /【thinking】[\s\S]*?【\/thinking】/i,
  /【thinking】[\s\S]*?】/i,
];

const STEPFUN_PLANNING_PATTERNS = [
  /[\s\S]*?用户现在需要我基于[\s\S]*?(?=\n\n#{1,3}\s|\n\n[-*] |\n\n\d+\. |(?=\n*$))/,
  /[\s\S]*?首先第一个部分[，,][\s\S]*?(?=\n\n#{1,3}\s|\n\n[-*] |\n\n\d+\. |(?=\n*$))/,
  /[\s\S]*?然后第[一二三四五六七八九十]+个部分[，,][\s\S]*?(?=\n\n#{1,3}\s|\n\n[-*] |\n\n\d+\. |(?=\n*$))/,
  /[\s\S]*?总结一下[：:][\s\S]*?(?=\n\n#{1,3}\s|\n\n[-*] |\n\n\d+\. |(?=\n*$))/,
];

export class StepFunProvider extends OpenAICompatibleProvider {
  readonly name = "stepfun";

  constructor(opts?: { apiKey?: string; baseURL?: string; model?: string }) {
    super({
      apiKey: opts?.apiKey ?? process.env["OPENAI_API_KEY"],
      baseURL: opts?.baseURL ?? process.env["OPENAI_BASE_URL"] ?? STEPFUN_BASE_URL,
      model: opts?.model ?? process.env["OPENAI_MODEL"] ?? "step-3.7-flash",
    });
  }

  async call(prompt: string, maxTokens: number): Promise<string> {
    let response;
    try {
      response = await this.client.chat.completions.create({
        model: this.model,
        max_completion_tokens: maxTokens,
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
      const message = `StepFun request failed: ${err instanceof Error ? err.message : String(err)}`;
      throw new Error(message);
    }

    const message = response.choices?.[0]?.message;
    const rawText = message?.content ?? "";

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
      systemFingerprint: (response as { system_fingerprint?: string }).system_fingerprint,
      usage: response.usage,
      choices: response.choices,
    };
    console.error(`[${this.name}] LLM call returned no usable content: ${JSON.stringify(responseSummary)}`);
    return `[LLM fallback] ${this.name} returned an empty response.`;
  }
}
