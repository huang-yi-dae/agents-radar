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

vi.mock("@anthropic-ai/sdk", () => {
  const create = vi.fn();
  class MockAnthropic {
    messages = { create };
  }
  return { default: MockAnthropic, __mockCreate: create };
});

vi.mock("openai", () => {
  const create = vi.fn();
  class MockOpenAI {
    chat = { completions: { create } };
  }
  return { default: MockOpenAI, __mockCreate: create };
});

async function getAnthropicMockCreate() {
  const mod = await import("@anthropic-ai/sdk");
  return (mod as unknown as { __mockCreate: ReturnType<typeof vi.fn> }).__mockCreate;
}

async function getOpenAIMockCreate() {
  const mod = await import("openai");
  return (mod as unknown as { __mockCreate: ReturnType<typeof vi.fn> }).__mockCreate;
}

function withEnv(vars: Record<string, string | undefined>, fn: () => void | Promise<void>) {
  return async () => {
    const saved: Record<string, string | undefined> = {};
    for (const key of Object.keys(vars)) {
      saved[key] = process.env[key];
      if (vars[key] === undefined) delete process.env[key];
      else process.env[key] = vars[key];
    }
    try {
      await fn();
    } finally {
      for (const key in saved) {
        if (saved[key] === undefined) delete process.env[key];
        else process.env[key] = saved[key];
      }
    }
  };
}

describe("LlmProvider interface", () => {
  it("AnthropicProvider has correct name", () => {
    expect(new AnthropicProvider().name).toBe("anthropic");
  });

  it("OpenAIProvider has correct name", () => {
    expect(new OpenAIProvider({ apiKey: "test" }).name).toBe("openai");
  });

  it("GitHubCopilotProvider has correct name", () => {
    expect(new GitHubCopilotProvider({ apiKey: "test" }).name).toBe("github-copilot");
  });

  it("OpenRouterProvider has correct name", () => {
    expect(new OpenRouterProvider({ apiKey: "test" }).name).toBe("openrouter");
  });

  it("StepFunProvider has correct name", () => {
    expect(new StepFunProvider({ apiKey: "test" }).name).toBe("stepfun");
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

describe("VALID_PROVIDER_NAMES", () => {
  it("contains all supported providers", () => {
    expect(VALID_PROVIDER_NAMES).toEqual(["anthropic", "openai", "github-copilot", "openrouter", "stepfun"]);
  });
});

describe("AnthropicProvider", () => {
  beforeEach(() => vi.clearAllMocks());
  it("uses default model when ANTHROPIC_MODEL is not set", () => {
    delete process.env["ANTHROPIC_MODEL"];
    expect(new AnthropicProvider().name).toBe("anthropic");
  });
  it(
    "uses ANTHROPIC_MODEL env var",
    withEnv({ ANTHROPIC_MODEL: "claude-opus-99" }, () => {
      expect(new AnthropicProvider().name).toBe("anthropic");
    }),
  );
  it("uses constructor model parameter over env", () => {
    expect(new AnthropicProvider("custom-model").name).toBe("anthropic");
  });
  it("call returns text from Anthropic SDK", async () => {
    const mockCreate = await getAnthropicMockCreate();
    mockCreate.mockResolvedValueOnce({ content: [{ type: "text", text: "Hello from Anthropic" }] });
    const p = new AnthropicProvider("test-model");
    expect(await p.call("test prompt", 1024)).toBe("Hello from Anthropic");
    expect(mockCreate).toHaveBeenCalledWith({
      model: "test-model",
      max_tokens: 1024,
      messages: [{ role: "user", content: "test prompt" }],
    });
  });
  it("throws on non-text response", async () => {
    const mockCreate = await getAnthropicMockCreate();
    mockCreate.mockResolvedValueOnce({ content: [{ type: "image", source: {} }] });
    await expect(new AnthropicProvider().call("prompt", 100)).rejects.toThrow(
      "Unexpected response type from Anthropic",
    );
  });
});

describe("OpenAIProvider", () => {
  beforeEach(() => vi.clearAllMocks());
  it(
    "uses OPENAI_MODEL env var as default",
    withEnv({ OPENAI_MODEL: "gpt-4-turbo" }, () => {
      const p = new OpenAIProvider({ apiKey: "k" });
      expect(p.name).toBe("openai");
      expect(p).toBeInstanceOf(OpenAIProvider);
    }),
  );
  it(
    "uses OPENAI_BASE_URL env var when omitted",
    withEnv({ OPENAI_BASE_URL: "https://api.deepseek.com" }, () => {
      const p = new OpenAIProvider({ apiKey: "k" });
      expect(p.name).toBe("openai");
      expect(p).toBeInstanceOf(OpenAIProvider);
    }),
  );
  it("uses gpt-4o when no env or constructor model given", () => {
    delete process.env["OPENAI_MODEL"];
    const p = new OpenAIProvider({ apiKey: "k" });
    expect(p.name).toBe("openai");
  });
  it("call returns text from OpenAI SDK", async () => {
    const mockCreate = await getOpenAIMockCreate();
    mockCreate.mockResolvedValueOnce({ choices: [{ message: { content: "Hello from OpenAI" } }] });
    const p = new OpenAIProvider({ apiKey: "k", model: "gpt-test" });
    expect(await p.call("test prompt", 2048)).toBe("Hello from OpenAI");
    expect(mockCreate).toHaveBeenCalledWith({
      model: "gpt-test",
      max_completion_tokens: 2048,
      messages: [{ role: "user", content: "test prompt" }],
    });
  });
  it("throws on empty response", async () => {
    const mockCreate = await getOpenAIMockCreate();
    mockCreate.mockResolvedValueOnce({ choices: [{ message: { content: null } }] });
    await expect(new OpenAIProvider({ apiKey: "k" }).call("prompt", 100)).rejects.toThrow(
      "Unexpected empty response from openai",
    );
  });
  it("throws when choices is empty", async () => {
    const mockCreate = await getOpenAIMockCreate();
    mockCreate.mockResolvedValueOnce({ choices: [] });
    await expect(new OpenAIProvider({ apiKey: "k" }).call("prompt", 100)).rejects.toThrow(
      "Unexpected empty response from openai",
    );
  });
});

describe("GitHubCopilotProvider", () => {
  beforeEach(() => vi.clearAllMocks());
  it("call returns text", async () => {
    const mockCreate = await getOpenAIMockCreate();
    mockCreate.mockResolvedValueOnce({ choices: [{ message: { content: "Hello from Copilot" } }] });
    expect(await new GitHubCopilotProvider({ apiKey: "ghp_test" }).call("prompt", 512)).toBe(
      "Hello from Copilot",
    );
  });
  it(
    "uses GITHUB_COPILOT_MODEL env",
    withEnv({ GITHUB_COPILOT_MODEL: "o3-mini" }, () => {
      expect(new GitHubCopilotProvider({ apiKey: "ghp_test" }).name).toBe("github-copilot");
    }),
  );
  it("throws on empty response", async () => {
    const mockCreate = await getOpenAIMockCreate();
    mockCreate.mockResolvedValueOnce({ choices: [] });
    await expect(new GitHubCopilotProvider({ apiKey: "k" }).call("prompt", 100)).rejects.toThrow(
      "Unexpected empty response from github-copilot",
    );
  });
});

describe("OpenRouterProvider", () => {
  beforeEach(() => vi.clearAllMocks());
  it("call returns text", async () => {
    const mockCreate = await getOpenAIMockCreate();
    mockCreate.mockResolvedValueOnce({ choices: [{ message: { content: "Hello from OpenRouter" } }] });
    expect(await new OpenRouterProvider({ apiKey: "or_test" }).call("prompt", 256)).toBe(
      "Hello from OpenRouter",
    );
  });
  it(
    "uses OPENROUTER_MODEL env",
    withEnv({ OPENROUTER_MODEL: "meta-llama/llama-3-70b" }, () => {
      expect(new OpenRouterProvider({ apiKey: "k" }).name).toBe("openrouter");
    }),
  );
  it("throws on empty response", async () => {
    const mockCreate = await getOpenAIMockCreate();
    mockCreate.mockResolvedValueOnce({ choices: [{ message: { content: "" } }] });
    await expect(new OpenRouterProvider({ apiKey: "k" }).call("prompt", 100)).rejects.toThrow(
      "Unexpected empty response from openrouter",
    );
  });
});

describe("StepFunProvider", () => {
  beforeEach(() => vi.clearAllMocks());
  it(
    "uses OPENAI_MODEL env var as default",
    withEnv({ OPENAI_MODEL: "step-custom" }, () => {
      const p = new StepFunProvider({ apiKey: "k" });
      expect(p.name).toBe("stepfun");
      expect(p).toBeInstanceOf(StepFunProvider);
    }),
  );
  it("uses step-3.7-flash when no env or constructor model given", () => {
    delete process.env["OPENAI_MODEL"];
    const p = new StepFunProvider({ apiKey: "k" });
    expect(p.name).toBe("stepfun");
  });
  it("call returns content and ignores reasoning field", async () => {
    const mockCreate = await getOpenAIMockCreate();
    mockCreate.mockResolvedValueOnce({
      choices: [
        { message: { content: "Final report", reasoning: "thinking", reasoning_content: "thinking" } },
      ],
    });
    const p = new StepFunProvider({ apiKey: "k", model: "step-3.7-flash" });
    expect(await p.call("prompt", 512)).toBe("Final report");
    expect(mockCreate).toHaveBeenCalledWith({
      model: "step-3.7-flash",
      max_completion_tokens: 512,
      reasoning_effort: "low",
      extra_body: { reasoning_format: "deepseek-style" },
      messages: [
        { role: "system", content: expect.stringContaining("Never include planning") },
        { role: "user", content: "prompt" },
      ],
    });
  });
  it("returns fallback string when both content and reasoning are empty", async () => {
    const mockCreate = await getOpenAIMockCreate();
    mockCreate.mockResolvedValueOnce({ choices: [{ message: { content: "" } }] });
    const p = new StepFunProvider({ apiKey: "k" });
    const result = await p.call("prompt", 128);
    expect(result).toBe("[LLM fallback] stepfun returned an empty response.");
    expect(mockCreate).toHaveBeenCalledTimes(1);
  });
});

describe("createProvider", () => {
  const original = process.env["LLM_PROVIDER"];

  afterEach(() => {
    if (original !== undefined) process.env["LLM_PROVIDER"] = original;
    else delete process.env["LLM_PROVIDER"];
  });

  it("defaults to anthropic when LLM_PROVIDER is not set", () => {
    delete process.env["LLM_PROVIDER"];
    const p = createProvider();
    expect(p.name).toBe("anthropic");
    expect(p).toBeInstanceOf(AnthropicProvider);
  });

  it("creates anthropic provider", () => {
    expect(createProvider("anthropic")).toBeInstanceOf(AnthropicProvider);
  });

  it("creates openai provider", () => {
    expect(createProvider("openai")).toBeInstanceOf(OpenAIProvider);
  });

  it("creates github-copilot provider", () => {
    expect(createProvider("github-copilot")).toBeInstanceOf(GitHubCopilotProvider);
  });

  it("creates openrouter provider", () => {
    expect(createProvider("openrouter")).toBeInstanceOf(OpenRouterProvider);
  });

  it("creates stepfun provider", () => {
    expect(createProvider("stepfun")).toBeInstanceOf(StepFunProvider);
  });

  it(
    "reads LLM_PROVIDER from env",
    withEnv({ LLM_PROVIDER: "openai" }, () => {
      expect(createProvider()).toBeInstanceOf(OpenAIProvider);
    }),
  );

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
