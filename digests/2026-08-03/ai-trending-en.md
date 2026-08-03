# AI Open Source Trends 2026-08-03

> Sources: GitHub Trending + GitHub Search API (AI, big data, data analysis, data mining trends) | Generated: 2026-08-03 15:58 UTC

---

# AI Open Source Trends Report — 2026-08-03

**Filtering note:** Excluded non-AI/ML trending repos such as `system-design-primer`, `invidious`, and `kaneo`. General data-engineering projects from the topic search were not included in category lists unless they directly serve AI agents, RAG, or ML infrastructure.

---

## 1. Today's Highlights

Today's ecosystem is overwhelmingly agent-first: the fastest-rising repos are not model weights but memory layers, skill packs, and connectivity tools that make AI agents more durable and useful. Local-inference projects also made a strong showing, with AirLLM's 70B-on-4GB approach and antirez's DeepSeek 4 local engine attracting large daily followings. Enterprise/team-level agent memory — led by TencentDB-Agent-Memory — signals the next wave is shared, governed agent infrastructure rather than single-session assistants. Vertical applications in finance (Kronos) and voice (livekit agents, voicebox) are gaining traction, while Microsoft's beginner AI courses continue to pull in thousands of stars per day, indicating a major influx of new AI developers.

---

## 2. Top Projects by Category

### 🔧 AI Infrastructure

- [lyogavin/airllm](https://github.com/lyogavin/airllm) — ⭐ +1,081 today. Run 70B-class LLMs on a single 4GB GPU through aggressive offloading and quantization.
- [antirez/ds4](https://github.com/antirez/ds4) — ⭐ +385 today. Local inference engine for DeepSeek 4 Flash/PRO on Metal, CUDA, and ROCm.
- [ollama/ollama](https://github.com/ollama/ollama) — ⭐177,676. The easiest local-model runtime; now supports Kimi, GLM, DeepSeek, gpt-oss, Qwen, and more.
- [pytorch/pytorch](https://github.com/pytorch/pytorch) — ⭐102,157. The core deep learning framework powering most open-source AI development.
- [huggingface/transformers](https://github.com/huggingface/transformers) — ⭐163,295. The standard model-definition framework for modern text, vision, audio, and multimodal ML.
- [langchain-ai/langchain](https://github.com/langchain-ai/langchain) — ⭐143,329. The agent-engineering platform for composing LLM apps with tools, memory, and RAG.
- [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) — ⭐159,886. Web context API that gives AI agents search, scrape, and structured web interaction at scale.
- [firecrawl/pdf-inspector](https://github.com/firecrawl/pdf-inspector) — ⭐ +1,769 today. Fast Rust PDF inspection/classification library for smart scanned-vs-digital routing.

### 🤖 AI Agents / Workflows

- [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) — ⭐224,744. "The agent that grows with you" — a broad, evolving personal agent platform.
- [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) — ⭐185,784. The long-running autonomous agent framework and vision for accessible AI.
- [HKUDS/nanobot](https://github.com/HKUDS/nanobot) — ⭐46,563. Ultra-lightweight self-hosted Python agent framework with tools, memory, MCP, and multi-agent workflows.
- [TencentCloud/TencentDB-Agent-Memory](https://github.com/TencentCloud/TencentDB-Agent-Memory) — ⭐ +1,091 today. Team-level memory hub turning conversations, docs, and code into reusable agent memory assets.
- [esengine/DeepSeek-Reasonix](https://github.com/esengine/DeepSeek-Reasonix) — ⭐29,715 · +877 today. DeepSeek-native terminal coding agent engineered around prefix-cache stability.
- [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) — ⭐ +1,052 today. CLI that gives AI agents access to Twitter, Reddit, YouTube, GitHub, Bilibili, and more with zero API fees.
- [affaan-m/ECC](https://github.com/affaan-m/ECC) — ⭐237,248. Agent harness performance-optimization system with skills, instincts, memory, and security for CLI coding agents.
- [zhaoxuya520/reverse-skill](https://github.com/zhaoxuya520/reverse-skill) — ⭐ +2,442 today. AI skill-router for authorized security testing/penetration workflows across Claude Code, Cursor, Cline, and others.

### 📦 AI Applications

- [microsoft/AI-For-Beginners](https://github.com/microsoft/AI-For-Beginners) — ⭐ +1,902 today. 12-week, 24-lesson curriculum bringing new developers into AI.
- [microsoft/generative-ai-for-beginners](https://github.com/microsoft/generative-ai-for-beginners) — ⭐ +776 today. 21-lesson generative AI course with hands-on building exercises.
- [open-webui/open-webui](https://github.com/open-webui/open-webui) — ⭐147,719. User-friendly self-hosted AI interface supporting Ollama, OpenAI API, and more.
- [jamiepine/voicebox](https://github.com/jamiepine/voicebox) — ⭐ +225 today. Open-source AI voice studio for cloning, dictation, and voice creation.
- [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) — ⭐101,375. Automated AI short-video generation from a keyword or topic.
- [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) — ⭐49,356. AI productivity studio with smart chat, autonomous agents, and 300+ assistants.
- [livekit/agents](https://github.com/livekit/agents) — ⭐ +129 today. Framework for building realtime voice AI agents with built-in audio/video transport.
- [Alishahryar1/free-claude-code](https://github.com/Alishahryar1/free-claude-code) — ⭐ +291 today. Use Claude Code, Codex, and Pi from terminal, app, IDE, or phone, with voice support.

### 🧠 LLMs / Training

- [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) — ⭐100,462. Step-by-step PyTorch implementation of a ChatGPT-like LLM; the reference educational repo.
- [shiyu-coder/Kronos](https://github.com/shiyu-coder/Kronos) — ⭐ +217 today. Foundation model for financial markets, targeting trading/analysis workloads.
- [open-compass/opencompass](https://github.com/open-compass/opencompass) — ⭐7,266. LLM evaluation platform supporting 100+ datasets and major model families.
- [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) — ⭐4,435. Build a tiny vLLM + Qwen serving stack on Apple Silicon; great for systems engineers.
- [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig) — ⭐8,151. Modular Rust framework for building scalable LLM applications.
- [llm-jp/awesome-japanese-llm](https://github.com/llm-jp/awesome-japanese-llm) — ⭐1,423. Overview of Japanese LLMs, useful for multilingual model tracking.
- [chrisliu298/awesome-llm-unlearning](https://github.com/chrisliu298/awesome-llm-unlearning) — ⭐617. Curated resources for machine unlearning in LLMs — an emerging safety direction.
- [AIDASLab/Awesome-Diffusion-LLM](https://github.com/AIDASLab/Awesome-Diffusion-LLM) — ⭐94. Paper list covering large-language-diffusion models.

### 🔍 RAG / Knowledge

- [infiniflow/ragflow](https://github.com/infiniflow/ragflow) — ⭐86,723. Leading open-source RAG engine combining deep document understanding with agent capabilities.
- [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) — ⭐89,410. Persistent cross-session memory for agents; captures, compresses, and re-injects context.
- [mem0ai/mem0](https://github.com/mem0ai/mem0) — ⭐62,401. Universal memory layer for AI agents, powering personalized RAG and long-term recall.
- [run-llama/llama_index](https://github.com/run-llama/llama_index) — ⭐51,342. Document agent and OCR platform for connecting data to LLM applications.
- [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) — ⭐34,992. Vectorless, reasoning-based RAG indexing — a challenge to the default vector-DB approach.
- [milvus-io/milvus](https://github.com/milvus-io/milvus) — ⭐45,488. Cloud-native vector database for high-scale ANN search.
- [qdrant/qdrant](https://github.com/qdrant/qdrant) — ⭐33,756. High-performance vector database and search engine for next-generation AI.
- [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) — ⭐101,624. Turn codebases/docs/SQL schemas into deterministic knowledge graphs for Claude Code, Cursor, and Gemini CLI.

---

## 3. Trend Signal Analysis

The strongest signal is the shift from "chatbots with tools" to durable, skill-based agent platforms. Repos that give agents memory across sessions (TencentDB-Agent-Memory, claude-mem, mem0), skill packs for coding/security/science CLIs (ECC, reverse-skill, scientific-agent-skills), and connectivity layers (Agent-Reach, firecrawl) dominate both today's trending and the topic-search results. This reflects an industry move toward long-running agents that are cheaper to operate and more deeply integrated into existing developer workflows.

A second signal is the "local inference counter-trend." AirLLM's 70B-on-4GB approach and antirez's ds4 show strong demand for running frontier-class open models without cloud GPUs. The rise of DeepSeek-specific tooling — plus Ollama now bundling Kimi, GLM, and gpt-oss — indicates recent open-model releases are directly shaping the ecosystem.

New directions worth noting: vectorless RAG (PageIndex) and storage-saving RAG (LEANN) challenge the default "embed everything into a vector DB" architecture. Team-level agent memory (TencentDB-Agent-Memory) implies governance and sharing are becoming first-class concerns. Security-oriented agent skill packs (reverse-skill) signal that agent skill marketplaces are expanding beyond coding into specialized domains. Finally, finance (Kronos) and voice (livekit agents, voicebox) are emerging as early verticals with dedicated open-source AI infrastructure.

---

## 4. Community Hot Spots

- **Agent memory / long-term context** — [TencentDB-Agent-Memory](https://github.com/TencentCloud/TencentDB-Agent-Memory), [claude-mem](https://github.com/thedotmack/claude-mem), and [mem0](https://github.com/mem0ai/mem0). Persistent memory is becoming the key differentiator for serious agent deployments.
- **Agent skill/harness ecosystem** — [ECC](https://github.com/affaan-m/ECC), [learn-claude-code](https://github.com/shareAI-lab/learn-claude-code), [reverse-skill](https://github.com/zhaoxuya520/reverse-skill), and [scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills). Reusable skills are turning CLI coding agents into general-purpose worker platforms.
- **Low-cost local inference** — [AirLLM](https://github.com/lyogavin/airllm), [ds4](https://github.com/antirez/ds4), and [tiny-llm](https://github.com/skyzh/tiny-llm). Running frontier-scale models on consumer hardware remains a high-interest area.
- **Web/data access for agents** — [Agent-Reach](https://github.com/Panniantong/Agent-Reach), [firecrawl](https://github.com/firecrawl/firecrawl), and [pdf-inspector](https://github.com/firecrawl/pdf-inspector). Agents need reliable, low-cost access to the open web and documents.
- **RAG without embeddings** — [PageIndex](https://github.com/VectifyAI/PageIndex), [LEANN](https://github.com/StarTrail-org/LEANN), and [Graphify](https://github.com/Graphify-Labs/graphify). Deterministic, graph-based and storage-efficient alternatives to vector databases are gaining real traction.

---
*This digest is auto-generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar).*