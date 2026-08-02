# AI Open Source Trends 2026-08-02

> Sources: GitHub Trending + GitHub Search API | Generated: 2026-08-02 09:42 UTC

---

# AI Open Source Trends Report — 2026-08-02

**Filter note:** Excluded non-AI/ML trending repos (`kaneo`, `gh-stack`, `invidious`, `ansible`, `awesome-systematic-trading`). From topic search, skipped general-purpose tools only carrying ML tags (e.g. Julia, Airflow). All projects below are AI/LLM/agent-native.

## 1. Today's Highlights

Today's trending list is unmistakably agent-centric: specialized agent skill packs like `reverse-skill` (+1,320 today) and long-horizon agent harnesses like Bytedance's `deer-flow` (+209 today) are drawing the most attention. GitHub's `copilot-sdk` (+142 today) signals that coding-agent capabilities are becoming a platform layer, while Microsoft's `TRELLIS.2` (+107 today) and Hugging Face's `speech-to-speech` (+442 today) show rapid progress in open multimodal generation — 3D assets and real-time voice agents. Education is also surging: `AI-For-Beginners` gained +949 today, indicating a broad wave of new developers entering the AI space. Meanwhile, topic search reveals that memory/RAG infrastructure — `claude-mem`, `mem0`, `Graphify`, `TencentDB-Agent-Memory` — is now one of the densest and fastest-growing project clusters.

## 2. Top Projects by Category

### 🔧 AI Infrastructure

- [github/copilot-sdk](https://github.com/github/copilot-sdk) — Trending +142 today  
  Official multi-platform SDK for embedding GitHub Copilot Agent into third-party apps; coding agents become reusable infrastructure.

- [ollama/ollama](https://github.com/ollama/ollama) — ⭐177,546  
  The de-facto local model runtime, now listing new open models like Kimi-K2.6, GLM-5.2 and gpt-oss — proof of a fast-expanding open-weight ecosystem.

- [vllm-project/vllm](https://github.com/vllm-project/vllm) — ⭐87,919  
  High-throughput, memory-efficient LLM inference and serving engine, essential for deploying open models at scale.

- [huggingface/transformers](https://github.com/huggingface/transformers) — ⭐163,244  
  The core open-source framework for state-of-the-art text, vision, audio and multimodal models.

- [pytorch/pytorch](https://github.com/pytorch/pytorch) — ⭐102,121  
  The dominant deep learning framework under most training and fine-tuning workloads.

- [langchain-ai/langchain](https://github.com/langchain-ai/langchain) — ⭐143,208  
  The leading agent engineering platform for tool calling, memory, RAG and multi-step workflows.

- [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) — ⭐159,245  
  API-first web scraping and search for AI agents — the data ingestion layer of the LLM stack.

- [langchain4j/langchain4j](https://github.com/langchain4j/langchain4j) — ⭐12,758  
  JVM-native LLM application framework with MCP support, RAG and agent tooling for Java/Spring ecosystems.

### 🤖 AI Agents / Workflows

- [zhaoxuya520/reverse-skill](https://github.com/zhaoxuya520/reverse-skill) — Trending +1,320 today  
  AI-powered skill router and self-evolving knowledge base for security research, compatible with Claude Code, Cursor, Cline and more.

- [bytedance/deer-flow](https://github.com/bytedance/deer-flow) — Trending +209 today  
  Long-horizon SuperAgent harness with sandboxes, memory, tools, skills, subagents and a message gateway.

- [huggingface/speech-to-speech](https://github.com/huggingface/speech-to-speech) — Trending +442 today  
  Build local voice agents with open-source models — a big step toward private, real-time voice AI.

- [affaan-m/ECC](https://github.com/affaan-m/ECC) — ⭐236,899  
  Agent harness performance optimization system with skills, instincts, memory and security for Claude Code, Codex, Cursor and beyond.

- [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) — ⭐224,010  
  "The agent that grows with you" — a highly influential open-source agent project.

- [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) — ⭐185,761  
  The original accessible-autonomy agent platform and still one of the most-starred AI projects.

- [browser-use/browser-use](https://github.com/browser-use/browser-use) — ⭐107,550  
  Makes websites accessible to AI agents; a key building block for browser automation and web tasks.

- [NomaDamas/k-skill](https://github.com/NomaDamas/k-skill) — Trending +53 today  
  Korean-language skill collection for AI agents — evidence that agent skills are being localized for non-English communities.

### 📦 AI Applications

- [microsoft/AI-For-Beginners](https://github.com/microsoft/AI-For-Beginners) — Trending +949 today  
  12-week, 24-lesson AI curriculum; education content is seeing major community traction.

- [microsoft/generative-ai-for-beginners](https://github.com/microsoft/generative-ai-for-beginners) — Trending +108 today  
  21-lesson GenAI course, reflecting surging demand for beginner-friendly LLM education.

- [abus-aikorea/voice-pro](https://github.com/abus-aikorea/voice-pro) — Trending +58 today  
  Gradio WebUI for TTS, zero-shot voice cloning, Whisper transcription, vocal isolation and translation — an all-in-one voice creation toolkit.

- [microsoft/TRELLIS.2](https://github.com/microsoft/TRELLIS.2) — Trending +107 today  
  Native and compact structured latents for 3D generation — Microsoft's latest open 3D AI model.

- [open-webui/open-webui](https://github.com/open-webui/open-webui) — ⭐147,577  
  User-friendly, self-hosted AI interface supporting Ollama, OpenAI API and many other backends.

- [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) — ⭐101,105  
  One-click short-video generation from keywords using LLMs and automated workflows.

- [OpenBB-finance/OpenBB](https://github.com/OpenBB-finance/OpenBB) — ⭐71,276  
  Open data platform for analysts, quants and AI agents — finance AI is becoming a mainstream application layer.

- [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) — ⭐49,266  
  AI productivity studio with smart chat, autonomous agents, 300+ assistants and unified LLM access.

### 🧠 LLMs / Training

- [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) — ⭐100,339  
  Step-by-step PyTorch implementation of a ChatGPT-like LLM; the canonical learning path for LLM builders.

- [microsoft/ML-For-Beginners](https://github.com/microsoft/ML-For-Beginners) — ⭐88,878  
  Classic 12-week machine learning curriculum with lessons, quizzes and hands-on labs.

- [open-compass/opencompass](https://github.com/open-compass/opencompass) — ⭐7,256  
  LLM evaluation platform supporting 100+ datasets; evaluation is becoming critical infrastructure.

- [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) — ⭐4,429  
  Course on building a tiny vLLM + Qwen inference stack on Apple Silicon — systems-level LLM education.

- [thinkwee/AwesomeOPD](https://github.com/thinkwee/AwesomeOPD) — ⭐785  
  Curated resources on on-policy distillation, an increasingly important training technique.

- [chrisliu298/awesome-llm-unlearning](https://github.com/chrisliu298/awesome-llm-unlearning) — ⭐616  
  Resource hub for LLM unlearning — a growing niche around safe model correction and compliance.

- [AarambhDevHub/aarambh-studio](https://github.com/AarambhDevHub/aarambh-studio) — ⭐57  
  Decoder-only LLM built from scratch in pure Rust + Candle — a new non-Python training stack.

### 🔍 RAG / Knowledge

- [TencentCloud/TencentDB-Agent-Memory](https://github.com/TencentCloud/TencentDB-Agent-Memory) — Trending +227 today  
  Team-level memory hub for AI agents, converting conversations, docs and code into reusable Chat Memory, Skills, LLM-Wiki and Code-Graph assets.

- [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) — ⭐100,562  
  Turns codebases, docs, SQL schemas and PDFs into queryable knowledge graphs without a vector store.

- [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) — ⭐89,287  
  Captures agent sessions and injects relevant context across future sessions — persistent context for every major coding agent.

- [infiniflow/ragflow](https://github.com/infiniflow/ragflow) — ⭐86,598  
  Leading open-source RAG engine combining deep document understanding with agent capabilities.

- [mem0ai/mem0](https://github.com/mem0ai/mem0) — ⭐62,300  
  Universal memory layer for AI agents; memory is quickly becoming the new vector database.

- [run-llama/llama_index](https://github.com/run-llama/llama_index) — ⭐51,295  
  Document agent and OCR/data framework; a default choice for RAG applications.

- [milvus-io/milvus](https://github.com/milvus-io/milvus) — ⭐45,462  
  High-performance, cloud-native vector database built for large-scale ANN search.

- [qdrant/qdrant](https://github.com/qdrant/qdrant) — ⭐33,717  
  Rust-based vector database focused on high performance and massive scale for AI workloads.

## 3. Trend Signal Analysis

The clearest signal from today's data is that **agent context, memory and skills have overtaken raw model weights as the most active layer of open-source AI**. The real-time trending list shows agent-skill and agent-memory projects — `reverse-skill`, `TencentDB-Agent-Memory`, `k-skill`, `deer-flow` — pulling thousands of stars in a single day. Topic search confirms this: the RAG/memory cluster (`claude-mem`, `mem0`, `ragflow`, `Graphify`, `PageIndex`, `LEANN`) is one of the largest and fastest-growing segments. Developers are no longer just asking "which LLM should I use?"; they are asking "how do I give the agent durable memory, structured knowledge and reliable tool invocation?"

A second signal is the emergence of **agent skill packs as a distributable product format**. `reverse-skill`'s explosive +1,320 today and `k-skill`'s Korean-language skill collection suggest a future where users install domain-specific skills across Claude Code, Cursor, Codex and Cline. This is the new "plugin ecosystem" for coding agents.

Third, infrastructure vendors are entering the agent stack. GitHub's `copilot-sdk`, TencentDB's agent-memory hub, and Bytedance's `deer-flow` represent a shift from single-turn chat to multi-hour, autonomous, tool-using workflows. Combined with new open-model releases visible in Ollama's model list — Kimi-K2.6, GLM-5.2, gpt-oss — the community is clearly moving toward an open, composable, memory-first agent architecture.

## 4. Community Hot Spots

- **Agent memory / persistent context** — [claude-mem](https://github.com/thedotmack/claude-mem), [mem0](https://github.com/mem0ai/mem0), [cognee](https://github.com/topoteretes/cognee), [TencentDB-Agent-Memory](https://github.com/TencentCloud/TencentDB-Agent-Memory). Long-horizon agents cannot work without durable, shareable memory; this is where the next major standards battle will happen.

- **Skill packs for coding agents** — [reverse-skill](https://github.com/zhaoxuya520/reverse-skill), [k-skill](https://github.com/NomaDamas/k-skill), [learn-claude-code](https://github.com/shareAI-lab/learn-claude-code), [AionUi](https://github.com/iOfficeAI/AionUi). Users are standardizing on CLI agents and want plug-and-play, domain-specific skill packages.

- **Deterministic retrieval / graph RAG** — [Graphify](https://github.com/Graphify-Labs/graphify), [PageIndex](https://github.com/VectifyAI/PageIndex), [LEANN](https://github.com/StarTrail-org/LEANN). Vector search is no longer the only RAG answer; explainable graphs and storage-efficient indexing are gaining fast.

- **Long-horizon autonomous agent harnesses** — [deer-flow](https://github.com/bytedance/deer-flow), [hermes-agent](https://github.com/NousResearch/hermes-agent), [nanobot](https://github.com/HKUDS/nanobot), [AutoGPT](https://github.com/Significant-Gravitas/AutoGPT). Tasks now run for minutes to hours with sandboxes, subagents and tool loops — this is where enterprise value is forming.

- **Open multimodal generation** — [speech-to-speech](https://github.com/huggingface/speech-to-speech), [voice-pro](https://github.com/abus-aikorea/voice-pro), [TRELLIS.2](https://github.com/microsoft/TRELLIS.2). Voice agents and 3D generation are moving from research demos to local, creator-facing applications.

---
*This digest is auto-generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar).*