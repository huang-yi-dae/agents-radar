# AI Open Source Trends 2026-07-28

> Sources: GitHub Trending + GitHub Search API | Generated: 2026-07-28 02:49 UTC

---

# AI Open Source Trends Report — 2026-07-28

## 1. Today's Highlights

Today’s trending list and topic search reveal a strong surge in **agent-centric infrastructure**—projects that give LLMs persistence, tool use, and multimodal capabilities. Alibaba’s `open-code-review` (battle‑tested at scale) and `Kronos` (a foundation model for financial markets) mark a shift from generic chatbots to domain‑specific, production‑grade AI. Meanwhile, `moeru-ai/airi` and `bradautomates/claude-video` push the boundaries of agent embodiment—realtime voice, Minecraft, and video comprehension. The topic search confirms an exploding ecosystem of agent frameworks, memory layers, and RAG engines, with several projects crossing 100k+ stars and many new ones gaining thousands of stars in a single day.

## 2. Top Projects by Category

### 🔧 AI Infrastructure (Frameworks, SDKs, Inference, CLI Tools)

| Project | Stars | Summary |
|--------|-------|---------|
| [ollama/ollama](https://github.com/ollama/ollama) | 177k | Local LLM runner now supporting Kimi‑K2.6, GLM‑5.2, DeepSeek, and more. The go‑to for on‑device inference. |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | 142k | The agent engineering platform for building LLM‑powered applications. |
| [alibaba/open-code-review](https://github.com/alibaba/open-code-review) | +979 today | Hybrid deterministic + LLM Agent code review tool, production‑proven at Alibaba. |
| [nanobot](https://github.com/HKUDS/nanobot) | 46k | Ultra‑lightweight, self‑hosted AI agent framework in Python with WebUI, tools, memory, MCP. |
| [rig](https://github.com/0xPlaygrounds/rig) | 8k | Build modular and scalable LLM applications in **Rust** — rising interest in systems‑level agent stacks. |

### 🤖 AI Agents / Workflows (Frameworks, Automation, Multi‑Agent)

| Project | Stars | Summary |
|--------|-------|---------|
| [AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | 185k | The original autonomous agent project, still a benchmark for agent capability. |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | 107k | Makes websites accessible for AI agents – automate online tasks with ease. |
| [hermes-agent](https://github.com/NousResearch/hermes-agent) | 221k | “The agent that grows with you” – a lightweight, extensible agent harness. |
| [Cherry Studio](https://github.com/CherryHQ/cherry-studio) | 49k | AI productivity studio with smart chat, autonomous agents, and 300+ assistants. |
| [moeru-ai/airi](https://github.com/moeru-ai/airi) | +572 today | Self‑hosted “Grok Companion” capable of realtime voice chat, Minecraft, and Factorio play. |
| [bradautomates/claude-video](https://github.com/bradautomates/claude-video) | +434 today | Give Claude the ability to watch any video – extracts frames, transcribes, hands to LLM. |
| [last30days-skill](https://github.com/mvanhorn/last30days-skill) | +240 today | Agent skill that researches any topic across Reddit, X, YouTube, HN, and synthesizes a summary. |

### 📦 AI Applications (Vertical Solutions)

| Project | Stars | Summary |
|--------|-------|---------|
| [Kronos](https://github.com/shiyu-coder/Kronos) | +441 today | Foundation model for the language of financial markets — domain‑specific LLM. |
| [MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | 99k | Generate HD short videos from a topic or keyword using AI workflows. |
| [impeccable](https://github.com/pbakaus/impeccable) | +847 today | Design language that makes AI harnesses better at design – targeted at AI‑generated UI. |
| [ppt-master](https://github.com/hugohe3/ppt-master) | 41k | AI turns documents/topics into native PowerPoint decks with animations and charts. |

### 🧠 LLMs / Training (Models, Fine‑Tuning, Evaluation)

| Project | Stars | Summary |
|--------|-------|---------|
| [huggingface/transformers](https://github.com/huggingface/transformers) | 163k | The de‑facto model definition framework for text, vision, audio, and multimodal. |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | 99k | Step‑by‑step implementation of ChatGPT‑like LLM in PyTorch – educational gold. |
| [minimind](https://github.com/jingyaogong/minimind) | 53k | Train a 64M‑parameter LLM from scratch in just 2 hours – accessible model training. |
| [open-compass](https://github.com/open-compass/opencompass) | 7k | LLM evaluation platform supporting 100+ datasets and models. |

### 🔍 RAG / Knowledge (Vector DBs, Retrieval, Knowledge Management)

| Project | Stars | Summary |
|--------|-------|---------|
| [milvus-io/milvus](https://github.com/milvus-io/milvus) | 45k | Cloud‑native vector database built for scalable ANN search. |
| [qdrant/qdrant](https://github.com/qdrant/qdrant) | 33k | High‑performance vector database and search engine. |
| [ragflow](https://github.com/infiniflow/ragflow) | 86k | Leading open‑source RAG engine combining retrieval with agent capabilities. |
| [anything-llm](https://github.com/Mintplex-Labs/anything-llm) | 63k | “Stop renting your intelligence” – local‑first agent experience with document ingestion. |
| [PageIndex](https://github.com/VectifyAI/PageIndex) | 34k | Document index for vectorless, reasoning‑based RAG – novel approach. |
| [claude-mem](https://github.com/thedotmack/claude-mem) | 88k | Persistent context across sessions – captures agent activity, compresses, and reinjects. |

## 3. Trend Signal Analysis

The community is clearly converging on **agent infrastructure as the new platform layer**. The hottest projects today are not raw LLMs but the frameworks, skills, and memory systems that make LLMs *useful* in production. Alibaba’s `open-code-review` exemplifies a hybrid approach: combining deterministic pipelines with LLM agents for precise, scalable code review—a model that is likely to be copied across other domains (security, compliance, QA). The explosive star growth of `hermes-agent` (221k) and `cherry-studio` (49k) signals an insatiable demand for turnkey agent toolkits that work out of the box.

A new technical stack is emerging: **Rust for agents** (e.g., `rig`, `qdrant`) and **Go for vector databases** (e.g., `milvus`, `weaviate`) are gaining traction thanks to performance and memory efficiency. At the same time, **agent memory** has become a first‑class concern—`claude-mem`, `mem0`, and `cognee` all saw massive engagement, highlighting the community’s struggle to give agents persistent, session‑spanning context.

The relationship to recent LLM releases is clear: the `ollama` project now supports Kimi‑K2.6 and GLM‑5.2 within hours of their launch, proving that the infrastructure layer adapts quickly. Meanwhile, domain‑specific foundation models like `Kronos` (finance) and `Vibe-Trading` (trading agent) show that the next wave of AI will be **verticalized**, with custom models and agents tailored to industry‑specific data and workflows.

Finally, the rise of **agent‑native design tools** (e.g., `impeccable`, `ppt-master`) suggests that AI is moving from “chat” to **creative production**—generating UI designs, presentations, and videos directly from natural language. This matches the broader industry push toward agent‑generated content and “agentic UI.”

## 4. Community Hot Spots

- **Agent Frameworks & Harnesses** – Projects like `hermes-agent`, `nanobot`, and `cowagent` are competing to become the default “agent OS.” Developers should evaluate their modularity and tooling ecosystem.
- **Persistent Agent Memory** – `claude-mem` and `mem0` are solving the session‑boundary problem. Any agent‑heavy project will need a memory layer; these are the front‑runners.
- **Financial AI** – The simultaneous appearance of `Kronos` (foundation model) and `Vibe-Trading` (trading agent) signals a new vertical. Expect more domain‑specific agents and LLMs in regulated industries.
- **Self‑Hosted Companions** – `moeru-ai/airi` and `anything-llm` reflect a growing desire for locally‑run, privacy‑preserving AI personalities that can interact with games, voice, and real‑time data.
- **RAG Innovation** – `PageIndex` (vectorless RAG) and `LEANN` (97% storage savings) show that the retrieval stack is still rapidly evolving beyond simple vector search. Developers should watch for hybrid and compressed retrieval methods.

---
*This digest is auto-generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar).*