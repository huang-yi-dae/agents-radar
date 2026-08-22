# Open-Source AI Trends Daily — 2026-08-23

> Generated: 2026-08-23 02:30 (GMT+8)
> Sources: GitHub Trending (daily) + `gh search repos` across 6 AI topics (sorted by stars, 7-day window)
> This digest is produced by the agents-radar local automation. All writing is done by the executing agent — no external LLM API was called.

---

## 1. GitHub Trending — Daily Risers (2026-08-23)

> Note: at fetch time the GitHub Trending page still did not expose "stars today" values (second consecutive day; likely an anonymous-view or layout change), so the table below lists ranked entries and descriptions without star deltas. Order follows the page's original ranking.

| # | Project | Summary |
|---|---------|---------|
| 1 | [openai/codex](https://github.com/openai/codex) | Lightweight coding agent that runs in your terminal |
| 2 | [mattpocock/skills](https://github.com/mattpocock/skills) | "Skills for Real Engineers," straight from the author's `.agents` directory |
| 3 | [affaan-m/ECC](https://github.com/affaan-m/ECC) | Agent-harness performance optimization system: skills, instincts, memory, security, research-first development for Claude Code, Codex, OpenCode, Cursor |
| 4 | [obra/superpowers](https://github.com/obra/superpowers) | An agentic skills framework and software development methodology that works |
| 5 | [Wei-Shaw/sub2api](https://github.com/Wei-Shaw/sub2api) | One-stop open-source relay unifying Claude / OpenAI / Gemini / Grok subscriptions, with shared/pooled access to split costs |
| 6 | [makeplane/plane](https://github.com/makeplane/plane) | Open-source Jira / Linear / Monday / ClickUp alternative |
| 7 | [n8n-io/n8n](https://github.com/n8n-io/n8n) | Fair-code workflow automation platform with native AI capabilities, 400+ integrations |
| 8 | [anthropics/claude-code](https://github.com/anthropics/claude-code) | Agentic coding tool in your terminal that understands your codebase |
| 9 | [AprilNEA/OpenLogi](https://github.com/AprilNEA/OpenLogi) | Native, local-first Logitech Options+ alternative written in Rust; no account, no telemetry |
| 10 | [modular/modular](https://github.com/modular/modular) | The Modular Platform (includes MAX & Mojo) |
| 11 | [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) | A single CLAUDE.md file to improve Claude Code behavior, derived from Karpathy's observations on LLM coding pitfalls |
| 12 | [mahlernim/google-timeline-visualizer](https://github.com/mahlernim/google-timeline-visualizer) | Visualize your year in travel from Google Location History |
| 13 | [ripienaar/free-for-dev](https://github.com/ripienaar/free-for-dev) | A list of SaaS/PaaS/IaaS offerings with free tiers relevant to devops and infra |
| 14 | [microsoft/TypeScript](https://github.com/microsoft/TypeScript) | The TypeScript language itself |
| 15 | [cursor/plugins](https://github.com/cursor/plugins) | Cursor plugin specification and official plugins |
| 16 | [PostHog/posthog](https://github.com/PostHog/posthog) | Platform for self-driving products (AI observability, analytics, session replay, flags) |
| 17 | [Tencent/AI-Infra-Guard](https://github.com/Tencent/AI-Infra-Guard) | Full-stack AI red-teaming platform: Agent Scan / Skills Scan / MCP scan / AI Infra scan |

**The strongest signal today: Codex is #1 and Claude Code is #8 on the same board.** This is a rare three-way resonance across all three digests — Trending #1 is `openai/codex`, today's top HN story is "A week of using Codex more than Claude" (94👍), and on the Claude Code side today's highest-heat issue [#77136](https://github.com/anthropics/claude-code/issues/77136) (343👍) is a collective complaint about the model's verbal tics. **Community attention is migrating from Claude Code toward Codex, and that migration shows up simultaneously in the star board, the discussion board, and the sentiment.**

**Second signal: the skills/harness meta-layer holds five slots.** #2 mattpocock/skills, #3 affaan-m/ECC, #4 obra/superpowers, #11 multica-ai/andrej-karpathy-skills, and #15 cursor/plugins — **three of the top four are projects that give agents capabilities rather than being agents themselves.** Notably #11 is extreme in form: a single `CLAUDE.md` file, yet it trends. **What is scarcest right now is not tooling but codified experience about how to make the model make fewer mistakes.**

**Third signal: cost anxiety has become explicit.** #5 `Wei-Shaw/sub2api` unifies subscriptions and supports pooled/shared access to split costs; #13 `ripienaar/free-for-dev` is a free-tier catalogue. This shares a background with GPT-5.6 Sol's 20% price cut in today's CLI digest and the HN controversy over A/B-tested reduced reasoning effort — **users' monthly agent spend has reached the point where people build dedicated tooling to flatten it.**

## 2. Six AI Topics by Stars (Top 15)

### 1. AI Agent Frameworks
- [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) ⭐234,323 — The agent that grows with you
- [shareAI-lab/learn-claude-code](https://github.com/shareAI-lab/learn-claude-code) ⭐74,949 — Build a nano claude-code-like agent harness from 0 to 1
- [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) ⭐74,085 — Give your agent eyes on the whole internet (Twitter / Reddit / YouTube / GitHub / Bilibili / XiaoHongShu), one CLI, zero API fees
- [thedaviddias/Front-End-Checklist](https://github.com/thedaviddias/Front-End-Checklist) ⭐73,609 — Essential checklist for modern web development, for humans and AI agents
- [santifer/career-ops](https://github.com/santifer/career-ops) ⭐67,764 — Open-source AI job search: scan portals, A–F rubric scoring, tailor CVs, track applications, runs locally in your coding CLI
- [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) ⭐63,624 — LLM-powered multi-market stock analysis with live news, dashboards, and automated notifications
- [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) ⭐50,919 — AI productivity studio with 300+ assistants and unified frontier-LLM access
- [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) ⭐48,617 — AI turns documents or topics into real native PowerPoint decks with shapes, transitions, charts, and narration
- [HKUDS/nanobot](https://github.com/HKUDS/nanobot) ⭐47,283 — Ultra-lightweight self-hosted personal AI agent framework (WebUI, tools, memory, MCP, multi-agent workflows)
- [zhayujie/CowAgent](https://github.com/zhayujie/CowAgent) ⭐46,632 — Open-source super assistant and agent harness that self-evolves with memory and knowledge
- [siyuan-note/siyuan](https://github.com/siyuan-note/siyuan) ⭐45,931 — Open-source, privacy-first, self-hosted knowledge workspace
- [bojieli/ai-agent-book](https://github.com/bojieli/ai-agent-book) ⭐40,913 — Full text, compiled PDF, and per-chapter code for a book on AI agent design and engineering
- [Hmbown/CodeWhale](https://github.com/Hmbown/CodeWhale) ⭐40,841 — Open-source terminal coding agent built in Rust
- [CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit) ⭐36,960 — The frontend stack for agents and generative UI (makers of the AG-UI protocol)
- [esengine/DeepSeek-Reasonix](https://github.com/esengine/DeepSeek-Reasonix) ⭐35,032 — DeepSeek-native terminal coding agent, engineered around prefix-cache stability

### 2. Large Language Models
- [affaan-m/ECC](https://github.com/affaan-m/ECC) ⭐242,087 — Agent-harness performance optimization system
- [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) ⭐234,323 — The agent that grows with you
- [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) ⭐186,764 — Accessible AI for everyone
- [ollama/ollama](https://github.com/ollama/ollama) ⭐179,192 — Run Kimi-K2.6 / GLM-5.2 / MiniMax / DeepSeek / gpt-oss / Qwen / Gemma locally
- [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) ⭐170,855 — Context API to search, scrape, and interact with the web at scale
- [f/prompts.chat](https://github.com/f/prompts.chat) ⭐167,752 — Community prompt sharing, self-hostable
- [huggingface/transformers](https://github.com/huggingface/transformers) ⭐164,339 — Model-definition framework for text, vision, audio, multimodal
- [langgenius/dify](https://github.com/langgenius/dify) ⭐153,205 — Agentic workflows and RAG pipelines on one workspace
- [open-webui/open-webui](https://github.com/open-webui/open-webui) ⭐149,579 — User-friendly AI interface
- [langchain-ai/langchain](https://github.com/langchain-ai/langchain) ⭐144,777 — The agent engineering platform
- [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) ⭐114,563 — Generate HD short videos from a topic via an automated AI workflow
- [browser-use/browser-use](https://github.com/browser-use/browser-use) ⭐110,116 — Make websites accessible for AI agents
- [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) ⭐109,501 — Turn a codebase (docs, SQL schemas, configs, PDFs) into a queryable knowledge graph as a `/graphify` skill
- [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) ⭐108,073 — Make your agent think like the laziest senior dev in the room: the best code is code you never wrote
- [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) ⭐103,224 — Implement a ChatGPT-like LLM in PyTorch step by step

### 3. RAG (Retrieval-Augmented Generation)
- [langgenius/dify](https://github.com/langgenius/dify) ⭐153,205 — Agentic workflows and RAG pipelines
- [open-webui/open-webui](https://github.com/open-webui/open-webui) ⭐149,579 — User-friendly AI interface
- [langchain-ai/langchain](https://github.com/langchain-ai/langchain) ⭐144,777 — The agent engineering platform
- [Shubhamsaboo/awesome-llm-apps](https://github.com/Shubhamsaboo/awesome-llm-apps) ⭐133,588 — 100+ AI agents, agent skills, and RAG apps
- [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) ⭐109,501 — Codebase to queryable knowledge graph, local deterministic parsing
- [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) ⭐91,519 — Persistent cross-session context: capture, compress, and re-inject
- [infiniflow/ragflow](https://github.com/infiniflow/ragflow) ⭐89,036 — Leading open-source RAG engine fused with agent capabilities
- [PaddlePaddle/PaddleOCR](https://github.com/PaddlePaddle/PaddleOCR) ⭐88,110 — Lightweight OCR toolkit for 100+ languages, bridging images/PDFs and LLMs
- [dair-ai/Prompt-Engineering-Guide](https://github.com/dair-ai/Prompt-Engineering-Guide) ⭐77,693 — Guides for prompt engineering, context engineering, RAG, and AI agents
- [datawhalechina/hello-agents](https://github.com/datawhalechina/hello-agents) ⭐74,217 — Building agents from scratch: principles and practice
- [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) ⭐67,179 — Compress tool outputs, logs, files, and RAG chunks before they reach the LLM: 20% fewer tokens for coding agents, 60–95% for JSON
- [Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm) ⭐65,052 — Local-first, powerful agent experience
- [mem0ai/mem0](https://github.com/mem0ai/mem0) ⭐63,821 — Universal memory layer for AI agents
- [pathwaycom/llm-app](https://github.com/pathwaycom/llm-app) ⭐59,005 — Cloud templates for RAG, AI pipelines, and enterprise search
- [FlowiseAI/Flowise](https://github.com/FlowiseAI/Flowise) ⭐55,383 — Build AI agents visually

### 4. Vector Databases
- [Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm) ⭐65,052 — Local-first agent experience
- [meilisearch/meilisearch](https://github.com/meilisearch/meilisearch) ⭐59,054 — Lightning-fast search API with AI hybrid search
- [pathwaycom/llm-app](https://github.com/pathwaycom/llm-app) ⭐59,005 — Cloud templates for RAG and AI pipelines
- [run-llama/llama_index](https://github.com/run-llama/llama_index) ⭐51,801 — Document agent and OCR platform
- [milvus-io/milvus](https://github.com/milvus-io/milvus) ⭐45,736 — High-performance cloud-native vector database
- [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) ⭐35,291 — Document index for vectorless, reasoning-based RAG
- [qdrant/qdrant](https://github.com/qdrant/qdrant) ⭐34,124 — High-performance, massive-scale vector database and search engine
- [topoteretes/cognee](https://github.com/topoteretes/cognee) ⭐30,183 — Open-source AI memory platform with a self-hosted knowledge-graph engine
- [NirDiamant/RAG_Techniques](https://github.com/NirDiamant/RAG_Techniques) ⭐29,174 — Advanced RAG techniques with notebook tutorials
- [weaviate/weaviate](https://github.com/weaviate/weaviate) ⭐16,746 — Open-source vector database combining vector search with structured filtering
- [memvid/memvid](https://github.com/memvid/memvid) ⭐16,437 — Replace complex RAG pipelines with a serverless single-file memory layer
- [alibaba/zvec](https://github.com/alibaba/zvec) ⭐15,502 — Lightweight, lightning-fast in-process vector database
- [langchain4j/langchain4j](https://github.com/langchain4j/langchain4j) ⭐12,929 — Idiomatic Java library for LLM apps on the JVM with a unified provider and vector-store API
- [neuml/txtai](https://github.com/neuml/txtai) ⭐12,897 — All-in-one framework for semantic search, LLM orchestration, and language-model workflows
- [StarTrail-org/LEANN](https://github.com/StarTrail-org/LEANN) ⭐12,827 — [MLsys2026] Private on-device RAG with 97% storage savings

### 5. LLM Models
- [jingyaogong/minimind](https://github.com/jingyaogong/minimind) ⭐54,927 — Train a 64M-parameter LLM from scratch in 2 hours
- [ScrapeGraphAI/Scrapegraph-ai](https://github.com/ScrapeGraphAI/Scrapegraph-ai) ⭐29,812 — AI-based Python scraper
- [The-Pocket/PocketFlow-Tutorial-Codebase-Knowledge](https://github.com/The-Pocket/PocketFlow-Tutorial-Codebase-Knowledge) ⭐12,630 — Codebase to tutorial
- [The-Pocket/PocketFlow](https://github.com/The-Pocket/PocketFlow) ⭐11,124 — 100-line LLM framework; let agents build agents
- [OpenSPG/KAG](https://github.com/OpenSPG/KAG) ⭐9,004 — Logical-form-guided reasoning and retrieval framework
- [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig) ⭐8,358 — Build modular, scalable LLM applications in Rust
- [open-compass/opencompass](https://github.com/open-compass/opencompass) ⭐7,327 — LLM evaluation platform across 100+ datasets
- [InternLM/InternLM](https://github.com/InternLM/InternLM) ⭐7,266 — Official InternLM series releases
- [Eigenwise/atomic-agents](https://github.com/Eigenwise/atomic-agents) ⭐6,191 — Building AI agents atomically
- [gluonfield/enchanted](https://github.com/gluonfield/enchanted) ⭐5,998 — iOS/macOS client for private self-hosted models
- [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) ⭐4,513 — Learn LLM inference systems on Apple Silicon: build a tiny vLLM + Qwen
- [verazuo/jailbreak_llms](https://github.com/verazuo/jailbreak_llms) ⭐3,791 — [CCS'24] 15,140 ChatGPT prompts including 1,405 jailbreak prompts
- [ridgerchu/matmulfreellm](https://github.com/ridgerchu/matmulfreellm) ⭐3,088 — Implementation of MatMul-free LM
- [InternLM/InternLM-XComposer](https://github.com/InternLM/InternLM-XComposer) ⭐2,925 — Multimodal system for long-term streaming video and audio interaction
- [JIA-Lab-research/LISA](https://github.com/JIA-Lab-research/LISA) ⭐2,671 — Reasoning segmentation via large language models

### 6. Machine Learning
- [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow) ⭐197,323 — Open-source machine learning framework for everyone
- [f/prompts.chat](https://github.com/f/prompts.chat) ⭐167,752 — Community prompt sharing
- [huggingface/transformers](https://github.com/huggingface/transformers) ⭐164,339 — State-of-the-art ML model framework
- [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) ⭐103,224 — Implement a ChatGPT-like LLM step by step
- [pytorch/pytorch](https://github.com/pytorch/pytorch) ⭐102,543 — Tensors and dynamic neural networks with GPU acceleration
- [microsoft/ML-For-Beginners](https://github.com/microsoft/ML-For-Beginners) ⭐89,682 — 12 weeks, 26 lessons, 52 quizzes of classic ML
- [Developer-Y/cs-video-courses](https://github.com/Developer-Y/cs-video-courses) ⭐83,148 — CS courses with video lectures
- [mlabonne/llm-course](https://github.com/mlabonne/llm-course) ⭐81,915 — LLM roadmaps and Colab notebooks
- [netdata/netdata](https://github.com/netdata/netdata) ⭐80,261 — Fastest path to AI-powered full-stack observability
- [d2l-ai/d2l-zh](https://github.com/d2l-ai/d2l-zh) ⭐79,877 — Dive into Deep Learning, Chinese edition
- [tesseract-ocr/tesseract](https://github.com/tesseract-ocr/tesseract) ⭐76,116 — Tesseract open-source OCR engine
- [binhnguyennus/awesome-scalability](https://github.com/binhnguyennus/awesome-scalability) ⭐73,459 — Patterns of scalable, reliable, performant large-scale systems
- [OpenBB-finance/OpenBB](https://github.com/OpenBB-finance/OpenBB) ⭐72,154 — Open data platform for analysts, quants, and AI agents
- [labmlai/annotated_deep_learning_paper_implementations](https://github.com/labmlai/annotated_deep_learning_paper_implementations) ⭐67,331 — 60+ deep learning paper implementations with side-by-side notes
- [scikit-learn/scikit-learn](https://github.com/scikit-learn/scikit-learn) ⭐67,010 — Machine learning in Python

## 3. 24-Hour Star Growth (vs. Yesterday's Snapshot)

> Note: this table is computed by differencing agents-radar's own star snapshots from two consecutive days, so it reflects genuine 24h growth. Only projects that appeared in yesterday's digest are included.

| Rank | Project | Yesterday ★ | Today ★ | 24h Δ |
|------|---------|-------------|---------|-------|
| 1 | [santifer/career-ops](https://github.com/santifer/career-ops) | 67,306 | 67,764 | **+458** |
| 2 | [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | 233,911 | 234,323 | **+412** |
| 3 | [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | 109,096 | 109,501 | **+405** |
| 4 | [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | 170,460 | 170,855 | **+395** |
| 5 | [affaan-m/ECC](https://github.com/affaan-m/ECC) | 241,701 | 242,087 | **+386** |
| 6 | [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) | 73,818 | 74,085 | +267 |
| 7 | [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow) | 197,220 | 197,323 | +103 |
| 8 | [Shubhamsaboo/awesome-llm-apps](https://github.com/Shubhamsaboo/awesome-llm-apps) | 133,487 | 133,588 | +101 |
| 9 | [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | 91,430 | 91,519 | +89 |
| 10 | [open-webui/open-webui](https://github.com/open-webui/open-webui) | 149,491 | 149,579 | +88 |
| 11 | [ollama/ollama](https://github.com/ollama/ollama) | 179,115 | 179,192 | +77 |
| 12 | [langgenius/dify](https://github.com/langgenius/dify) | 153,134 | 153,205 | +71 |
| 13 | [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | 88,983 | 89,036 | +53 |
| 14 | [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | 103,171 | 103,224 | +53 |
| 15 | [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | 144,726 | 144,777 | +51 |

**How to read this**: four of the top five are "agent capability / context supply" projects — career-ops (agents applied to job search), hermes-agent, graphify (codebase to knowledge graph), and ECC (harness optimization); only firecrawl is pure data-fetch infrastructure. **New attention is flowing toward "how do I actually use an agent" and "what context do I feed it," not toward the models themselves.** By contrast pytorch (+26), transformers (+29), milvus (+8), and qdrant (+9) are growing an order of magnitude slower.

## 4. Trend Summary

- **Codex and Claude Code both trended today, with Codex on top.** Combined with the top HN story and the 343👍 complaint issue on the Claude Code side, **this is today's most notable positional shift** — not one board's noise, but stars, discussion, and sentiment pointing the same direction at once.
- **The skills/harness meta-layer is now its own crowded category.** Three of the top four (mattpocock/skills, affaan-m/ECC, obra/superpowers), plus a single `CLAUDE.md` at #11 and cursor/plugins at #15. **When codified experience alone can trend, model capability is no longer the bottleneck — constraining the model is.**
- **Cost engineering has surfaced.** sub2api (subscription relay and pooling) + free-for-dev (free tiers) + headroom (compress tokens before the LLM, 20–95% savings) + DeepSeek-Reasonix (engineered around prefix-cache stability) — **four projects attacking the same bill from four angles**, the demand-side counterpart to GPT-5.6 Sol's 20% price cut on the supply side.
- **The memory/context lane keeps thickening.** claude-mem (+89), graphify (+405), mem0, cognee, memvid, LEANN, and zvec all appear together, and graphify's growth ranks third overall. **Same root as "performance debt = redundant rebuilds" in the OpenClaw digest and "context compaction" on the CLI side: context is the most expensive resource right now, and tooling around it is accelerating.**
- **Security governance trends for a second day.** Tencent/AI-Infra-Guard (Agent Scan / Skills Scan / MCP scan) echoes Zeroclaw's identity-infrastructure rework, Moltis's fail-closed hook, and CoPaw's fifth security layer — **the consensus that "agents hold real execution power" has spread from inside frameworks out to the tooling ecosystem.**
- **Traditional ML infrastructure growth is flattening.** pytorch +26 / transformers +29 / milvus +8 / qdrant +9 versus +400-scale growth in agent-layer projects — **attention and new interest are concentrated almost entirely at the application and harness layers.**

---

*This digest is generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar). All content is fetched live from public GitHub data and written by the executing agent — no external LLM was called.*
