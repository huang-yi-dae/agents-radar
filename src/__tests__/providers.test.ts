import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  AnthropicProvider,
  OpenAIProvider,
  GitHubCopilotProvider,
  OpenRouterProvider,
  StepFunProvider,
  createProvider,
  VALID_PROVIDER_NAMES,
  type LlmProvider,
} from "../providers/index.ts";

// ---------------------------------------------------------------------------
// Mock the SDKs at module level
// ---------------------------------------------------------------------------

vi.mock("@anthropic-ai/sdk", () => {
  const create = vi.fn();
  class MockAnthropic {
    messages = { create };
  }
  return {
    default: MockAnthropic,
    __mockCreate: create,
  };
});

vi.mock("openai", () => {
  const create = vi.fn();
  class MockOpenAI {
    chat = { completions: { create } };
  }
  return {
    default: MockOpenAI,
    __mockCreate: create,
  };
});

// Access the mock internals
async function getAnthropicMockCreate() {
  const mod = await import("@anthropic-ai/sdk");
  return (mod as unknown as { __mockCreate: ReturnType<typeof vi.fn> }).__mockCreate;
}

async function getOpenAIMockCreate() {
  const mod = await import("openai");
  return (mod as unknown as { __mockCreate: ReturnType<typeof vi.fn> }).__mockCreate;
}

// ---------------------------------------------------------------------------
// Env helpers
// ---------------------------------------------------------------------------

function withEnv(vars: Record<string, string | undefined>, fn: () => void | Promise<void>) {
  return async () => {
    const saved: Record<string, string | undefined> = {};
    for (const key of Object.keys(vars)) {
      saved[key] = process.env[key];
      if (vars[key] === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = vars[key];
      }
    }
    try {
      await fn();
    } finally {
      for (const key of Object.keys(saved)) {
        if (saved[key] === undefined) {
          delete process.env[key];
        } else {
          process.env[key] = saved[key];
        }
      }
    }
  };
}

// ---------------------------------------------------------------------------
// LlmProvider interface contract
// ---------------------------------------------------------------------------

describe("LlmProvider interface", () => {
  it("AnthropicProvider has correct name", () => {
    const p = new AnthropicProvider();
    expect(p.name).toBe("anthropic");
  });

  it("OpenAIProvider has correct name", () => {
    const p = new OpenAIProvider({ apiKey: "test" });
    expect(p.name).toBe("openai");
  });

  it("GitHubCopilotProvider has correct name", () => {
    const p = new GitHubCopilotProvider({ apiKey: "test" });
    expect(p.name).toBe("github-copilot");
  });

  it("OpenRouterProvider has correct name", () => {
    const p = new OpenRouterProvider({ apiKey: "test" });
    expect(p.name).toBe("openrouter");
  });

  it("all providers implement LlmProvider with call()", () => {
    const providers: LlmProvider[] = [
      new AnthropicProvider(),
      new OpenAIProvider({ apiKey: "k" }),
      new GitHubCopilotProvider({ apiKey: "k" }),
      new OpenRouterProvider({ apiKey: "k" }),
      new StepFunProvider({ apiKey: "k" }),
    ];
    for (const p of providers) {
      expect(typeof p.name).toBe("string");
      expect(typeof p.call).toBe("function");
    }
  });
});

// ---------------------------------------------------------------------------
// VALID_PROVIDER_NAMES
// ---------------------------------------------------------------------------

describe("VALID_PROVIDER_NAMES", () => {
  it("contains all supported providers", () => {
    expect(VALID_PROVIDER_NAMES).toEqual(["anthropic", "openai", "github-copilot", "openrouter", "stepfun"]);
  });
});

// ---------------------------------------------------------------------------
// AnthropicProvider
// ---------------------------------------------------------------------------

describe("AnthropicProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("uses default model when ANTHROPIC_MODEL is not set", () => {
    delete process.env["ANTHROPIC_MODEL"];
    const p = new AnthropicProvider();
    expect(p.name).toBe("anthropic");
  });

  it(
    "uses ANTHROPIC_MODEL env var",
    withEnv({ ANTHROPIC_MODEL: "claude-opus-99" }, () => {
      const p = new AnthropicProvider();
      expect(p.name).toBe("anthropic");
    }),
  );

  it("uses constructor model parameter over env", () => {
    const p = new AnthropicProvider("custom-model");
    expect(p.name).toBe("anthropic");
  });

  it("call returns text from Anthropic SDK", async () => {
    const mockCreate = await getAnthropicMockCreate();
    mockCreate.mockResolvedValueOnce({
      content: [{ type: "text", text: "Hello from Anthropic" }],
    });

    const p = new AnthropicProvider("test-model");
    const result = await p.call("test prompt", 1024);
    expect(result).toBe("Hello from Anthropic");
    expect(mockCreate).toHaveBeenCalledWith({
      model: "test-model",
      max_tokens: 1024,
      messages: [{ role: "user", content: "test prompt" }],
    });
  });

  it("throws on non-text response", async () => {
    const mockCreate = await getAnthropicMockCreate();
    mockCreate.mockResolvedValueOnce({
      content: [{ type: "image", source: {} }],
    });

    const p = new AnthropicProvider();
    await expect(p.call("prompt", 100)).rejects.toThrow("Unexpected response type from Anthropic");
  });
});

// ---------------------------------------------------------------------------
// OpenAIProvider
// ---------------------------------------------------------------------------

describe("OpenAIProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it(
    "uses OPENAI_MODEL env var as default",
    withEnv({ OPENAI_MODEL: "gpt-4-turbo" }, () => {
      const p = new OpenAIProvider({ apiKey: "k" });
      expect(p.name).toBe("openai");
    }),
  );

  it("uses gpt-4o when no env or constructor model given", () => {
    delete process.env["OPENAI_MODEL"];
    const p = new OpenAIProvider({ apiKey: "k" });
    expect(p.name).toBe("openai");
  });

  it("call returns text from OpenAI SDK", async () => {
    const mockCreate = await getOpenAIMockCreate();
    mockCreate.mockResolvedValueOnce({
      choices: [{ message: { content: "Hello from OpenAI" } }],
    });

    const p = new OpenAIProvider({ apiKey: "k", model: "gpt-test" });
    const result = await p.call("test prompt", 2048);
    expect(result).toBe("Hello from OpenAI");
    expect(mockCreate).toHaveBeenCalledWith({
      model: "gpt-test",
      max_completion_tokens: 2048,
      messages: [{ role: "user", content: "test prompt" }],
    });
  });

  it("throws on empty response", async () => {
    const mockCreate = await getOpenAIMockCreate();
    mockCreate.mockResolvedValueOnce({
      choices: [{ message: { content: null } }],
    });

    const p = new OpenAIProvider({ apiKey: "k" });
    await expect(p.call("prompt", 100)).rejects.toThrow("Unexpected empty response from openai");
  });

  it("throws when choices is empty", async () => {
    const mockCreate = await getOpenAIMockCreate();
    mockCreate.mockResolvedValueOnce({ choices: [] });

    const p = new OpenAIProvider({ apiKey: "k" });
    await expect(p.call("prompt", 100)).rejects.toThrow("Unexpected empty response from openai");
  });
});

// ---------------------------------------------------------------------------
// GitHubCopilotProvider
// ---------------------------------------------------------------------------

describe("GitHubCopilotProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("call returns text", async () => {
    const mockCreate = await getOpenAIMockCreate();
    mockCreate.mockResolvedValueOnce({
      choices: [{ message: { content: "Hello from Copilot" } }],
    });

    const p = new GitHubCopilotProvider({ apiKey: "ghp_test" });
    const result = await p.call("prompt", 512);
    expect(result).toBe("Hello from Copilot");
  });

  it(
    "uses GITHUB_COPILOT_MODEL env",
    withEnv({ GITHUB_COPILOT_MODEL: "o3-mini" }, () => {
      const p = new GitHubCopilotProvider({ apiKey: "ghp_test" });
      expect(p.name).toBe("github-copilot");
    }),
  );

  it("throws on empty response", async () => {
    const mockCreate = await getOpenAIMockCreate();
    mockCreate.mockResolvedValueOnce({ choices: [] });

    const p = new GitHubCopilotProvider({ apiKey: "k" });
    await expect(p.call("prompt", 100)).rejects.toThrow("Unexpected empty response from github-copilot");
  });
});

// ---------------------------------------------------------------------------
// OpenRouterProvider
// ---------------------------------------------------------------------------

describe("OpenRouterProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("call returns text", async () => {
    const mockCreate = await getOpenAIMockCreate();
    mockCreate.mockResolvedValueOnce({
      choices: [{ message: { content: "Hello from OpenRouter" } }],
    });

    const p = new OpenRouterProvider({ apiKey: "or_test" });
    const result = await p.call("prompt", 256);
    expect(result).toBe("Hello from OpenRouter");
  });

  it(
    "uses OPENROUTER_MODEL env",
    withEnv({ OPENROUTER_MODEL: "meta-llama/llama-3-70b" }, () => {
      const p = new OpenRouterProvider({ apiKey: "k" });
      expect(p.name).toBe("openrouter");
    }),
  );

  it("throws on empty response", async () => {
    const mockCreate = await getOpenAIMockCreate();
    mockCreate.mockResolvedValueOnce({
      choices: [{ message: { content: "" } }],
    });

    const p = new OpenRouterProvider({ apiKey: "k" });
    await expect(p.call("prompt", 100)).rejects.toThrow("Unexpected empty response from openrouter");
  });
});

// ---------------------------------------------------------------------------
// createProvider factory
// ---------------------------------------------------------------------------

describe("createProvider", () => {
  const original = process.env["LLM_PROVIDER"];

  afterEach(() => {
    if (original !== undefined) {
      process.env["LLM_PROVIDER"] = original;
    } else {
      delete process.env["LLM_PROVIDER"];
    }
  });

  it("defaults to anthropic when LLM_PROVIDER is not set", () => {
    delete process.env["LLM_PROVIDER"];
    const p = createProvider();
    expect(p.name).toBe("anthropic");
    expect(p).toBeInstanceOf(AnthropicProvider);
  });

  it("creates anthropic provider", () => {
    const p = createProvider("anthropic");
    expect(p).toBeInstanceOf(AnthropicProvider);
  });

  it("creates openai provider", () => {
    const p = createProvider("openai");
    expect(p).toBeInstanceOf(OpenAIProvider);
  });

  it("creates github-copilot provider", () => {
    const p = createProvider("github-copilot");
    expect(p).toBeInstanceOf(GitHubCopilotProvider);
  });

  it("creates openrouter provider", () => {
    const p = createProvider("openrouter");
    expect(p).toBeInstanceOf(OpenRouterProvider);
  });

  it("creates stepfun provider", () => {
    const p = createProvider("stepfun");
    expect(p).toBeInstanceOf(StepFunProvider);
  });

  it("reads LLM_PROVIDER from env", () => {
    withEnv({ LLM_PROVIDER: "openai" }, () => {
      const p = createProvider();
      expect(p).toBeInstanceOf(OpenAIProvider);
    });
  });

  it("throws descriptive error for unknown provider", () => {
    expect(() => createProvider("bogus" as never)).toThrow(
      /Invalid LLM provider: "bogus".*Valid providers are: anthropic, openai, github-copilot, openrouter, stepfun/,
    );
  });

  it("error message includes LLM_PROVIDER hint", () => {
    expect(() => createProvider("nope" as never)).toThrow("Set the LLM_PROVIDER env var");
  });

  it("log does not leak API keys", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    createProvider("anthropic");
    const logged = spy.mock.calls.flat().join(" ");
    expect(logged).toContain("anthropic");
    expect(logged).not.toMatch(/sk-|ghp_|key|secret/i);
    spy.mockRestore();
  });
});

// ---------------------------------------------------------------------------
// StepFunProvider
// ---------------------------------------------------------------------------

describe("StepFunProvider", () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    const mockCreate = await getOpenAIMockCreate();
    mockCreate.mockReset();
    mockCreate.mockImplementation((_input: unknown) =>
      Promise.resolve({
        choices: [{ message: { content: "ok" } }],
      }),
    );
  });

  it("uses STEPFUN_MODEL env var as default", async () => {
    await withEnv({ STEPFUN_MODEL: "step-custom" }, async () => {
      const modelProvider = new StepFunProvider({ apiKey: "k" });
      expect((modelProvider as unknown as { model: string }).model).toBe("step-custom");
      expect(
        (modelProvider as unknown as { client: { chat: { completions: { create: unknown } } } }).client.chat
          .completions.create,
      ).toBeInstanceOf(Function);
    });
  });

  it("uses STEPFUN_BASE_URL env var as default", async () => {
    await withEnv({ STEPFUN_BASE_URL: "https://custom.stepfun/v1" }, async () => {
      const urlProvider = new StepFunProvider({ apiKey: "k" });
      expect((urlProvider as unknown as { client: { baseURL?: string } }).client.baseURL).toBe(
        "https://custom.stepfun/v1",
      );
      expect(
        (urlProvider as unknown as { client: { chat: { completions: { create: unknown } } } }).client.chat
          .completions.create,
      ).toBeInstanceOf(Function);
    });
  });

  it("uses STEPFUN_MODEL env var for API calls", async () => {
    const mockCreate = await getOpenAIMockCreate();
    mockCreate.mockResolvedValueOnce({
      choices: [{ message: { content: "ok" } }],
    });

    await withEnv({ STEPFUN_MODEL: "step-custom" }, async () => {
      const p = new StepFunProvider({ apiKey: "k" });
      await p.call("prompt", 256);
      expect(await getOpenAIMockCreate()).toHaveBeenCalledWith(
        expect.objectContaining({
          model: "step-custom",
        }),
      );
    });
  });

  it("uses constructor model parameter over env", () => {
    const p = new StepFunProvider({ apiKey: "k", model: "custom-stepfun-model" });
    expect(p.name).toBe("stepfun");
  });

  it("uses STEPFUN_BASE_URL env var for API calls", async () => {
    const mockCreate = await getOpenAIMockCreate();
    mockCreate.mockResolvedValueOnce({
      choices: [{ message: { content: "ok" } }],
    });

    await withEnv({ STEPFUN_BASE_URL: "https://custom.stepfun/v1" }, async () => {
      const p = new StepFunProvider({ apiKey: "k" });
      await p.call("prompt", 256);
      expect(mockCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          baseURL: "https://custom.stepfun/v1",
        }),
      );
    });
  });

  it("call returns only content and ignores reasoning fields", async () => {
    const mockCreate = await getOpenAIMockCreate();
    mockCreate.mockResolvedValueOnce({
      choices: [
        {
          message: {
            content: "final answer",
            reasoning_content: "internal reasoning",
            reasoning: "internal reasoning",
          },
        },
      ],
    });

    const p = new StepFunProvider({ apiKey: "k", model: "step-test" });
    const result = await p.call("prompt", 256);
    expect(result).toBe("final answer");
    expect(mockCreate).toHaveBeenCalledWith({
      model: "step-test",
      max_completion_tokens: 256,
      reasoning_effort: "low",
      messages: [
        {
          role: "system",
          content:
            "You are a careful report editor.\n" +
            "Always output only the final user-facing report content.\n" +
            "Never include planning, reasoning, self-instructions, chain-of-thought, or internal thinking traces.\n",
        },
        { role: "user", content: "prompt" },
      ],
    });
  });

  it("returns fallback instead of leaking reasoning when content is empty", async () => {
    const mockCreate = await getOpenAIMockCreate();
    mockCreate.mockResolvedValueOnce({
      choices: [
        {
          message: {
            content: null,
            reasoning_content: "internal reasoning",
            reasoning: "internal reasoning",
          },
        },
      ],
    });

    const p = new StepFunProvider({ apiKey: "k" });
    const result = await p.call("prompt", 100);
    expect(result).toBe("[LLM fallback] stepfun returned an empty response.");
  });

  it("strips embedded thinking blocks from content", async () => {
    const mockCreate = await getOpenAIMockCreate();
    mockCreate.mockResolvedValueOnce({
      choices: [
        {
          message: {
            content:
              "<think>user wants a daily report.</think>" +
              "<thinking>I should organize by repo.</thinking>" +
              "[thinking]I will not expose this.[/thinking]" +
              "【thinking】Keep this private.】" +
              "## Daily Digest\n- Final answer only.",
          },
        },
      ],
    });

    const p = new StepFunProvider({ apiKey: "k", model: "step-clean" });
    const result = await p.call("prompt", 256);
    expect(result).toBe("## Daily Digest\n- Final answer only.");
  });

  it("strips planning prose before structured report sections", async () => {
    const mockCreate = await getOpenAIMockCreate();
    mockCreate.mockResolvedValueOnce({
      choices: [
        {
          message: {
            content:
              "用户现在需要我基于前面给的几个AI CLI工具..." +
              "\n\n## 横向对比\n\n" +
              "- 结论A\n" +
              "- 结论B\n",
          },
        },
      ],
    });

    const p = new StepFunProvider({ apiKey: "k", model: "step-clean" });
    const result = await p.call("prompt", 256);
    expect(result).toBe("## 横向对比\n\n- 结论A\n- 结论B");
  });

  it("strips complex planning prose from leaked reasoning output", async () => {
    const mockCreate = await getOpenAIMockCreate();
    mockCreate.mockResolvedValueOnce({
      choices: [
        {
          message: {
            content:
              "## 横向对比\n\n用户现在需要我基于前面给的几个AI CLI工具..." +
              "\n\n首先第一个部分，生态全景..." +
              "\n\n然后第三个部分，各工具活跃度对比..." +
              "\n\n## 实际结论\n\n- 结论A\n- 结论B\n",
          },
        },
      ],
    });

    const p = new StepFunProvider({ apiKey: "k", model: "step-clean" });
    const result = await p.call("prompt", 256);
    expect(result).toBe("## 实际结论\n\n- 结论A\n- 结论B");
  });

  it("wraps network timeout with actionable StepFun error", async () => {
    const mockCreate = await getOpenAIMockCreate();
    mockCreate.mockRejectedValueOnce(
      new AggregateError([new Error("connect ETIMEDOUT")], "All promises were rejected"),
    );

    const p = new StepFunProvider({ apiKey: "k", model: "step-timeout" });
    await expect(p.call("prompt", 256)).rejects.toThrow(
      "StepFun request to https://api.stepfun.com/v1 failed with a network timeout",
    );
  });
});
