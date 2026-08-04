# AI Open Source Trends 2026-08-04

> Sources: GitHub Trending + GitHub Search API (AI, big data, data analysis, data mining trends) | Generated: 2026-08-04 09:23 UTC

---

Got it, let's tackle this step by step. First, Step 1 is filtering out non-AI/ML related repos from both the trending list and the topic search. Let's go through each first.

First, the 16 trending repos: Let's eliminate the unrelated ones. iv-org/invidious is a YouTube frontend, that's not AI. usekaneo/kaneo is project management, no AI focus. jamiepine/voicebox is an AI voice studio? Wait, wait, let's check: voicebox is open source AI voice studio, that's AI related. Wait, wait, let's list each trending repo and mark if AI/ML:
1. lyogavin/airllm: AI inference, yes. 2. zhaoxuya520/reverse-skill: Wait, it's security skill routing with AI coding clients? Wait no, wait the description says reverse engineering skill router, AI-powered routing for AI coding clients? Wait no, wait the core is security penetration testing skill pack, but uses AI for routing? Wait no, wait let's check: no, wait the user said filter for AI/ML relevance. Wait, reverse-skill is a security tool that integrates with AI coding clients, but is it primarily AI/ML? Wait no, maybe not. Wait firecrawl/pdf-inspector: PDF processing, used for RAG? Wait the description says it's for PDF inspection for smart routing, that's data processing for AI pipelines, so relevant. esengine/DeepSeek-Reasonix: AI coding agent, definitely relevant. TencentCloud/TencentDB-Agent-Memory: AI agent memory hub, relevant. microsoft/AI-For-Beginners: AI education, relevant. microsoft/generative-ai-for-beginners: same, relevant. donnemartin/system-design-primer: general system design, no AI focus, exclude. antirez/ds4: DeepSeek local inference engine, yes, relevant. shiyu-coder/Kronos: financial foundation model, yes. Panniantong/Agent-Reach: AI agent internet access tool, yes. Alishahryar1/free-claude-code: free access to AI coding tools, relevant? Wait, it's a wrapper for Claude Code etc, so it's an AI tool, yes. Wait wait iv-org/invidious: no, YouTube frontend, exclude. usekaneo/kaneo: project management, no AI mention, exclude. livekit/agents: realtime voice AI agents framework, yes. jamiepine/voicebox: AI voice studio, yes. Okay so from trending, the relevant ones are: airllm, pdf-inspector, DeepSeek-Reasonix, TencentDB-Agent-Memory, AI-For-Beginners, generative-ai-for-beginners, ds4, Kronos, Agent-Reach, free-claude-code, livekit/agents, voicebox. Wait wait what about reverse-skill? Let's recheck: its description says "AI-powered routing + On-demand toolchain bootstrapping + Self-evolving knowledge base Supports Claude Code, Kiro, Cursor, Cline, and other AI coding clients" — oh right, it's a skill router for AI coding clients, so it's part of the AI agent toolchain, so maybe relevant? Wait but it's security focused. Wait maybe we can include it under AI Agents? Wait no, let's see. Wait also the topic search has a lot, but we need to filter those too, but the topic search is already tagged with AI topics, but wait no, the user said filter for AI/ML relevance, so exclude any that are not. Wait for example, the topic search has data-mining, rag, ml, vector-db, llm, big-data, llm-model, data-analysis, ai-agent — those are all relevant, right? Wait but let's make sure: for example, the data-mining ones are all ML related, yes. RAG ones are AI, yes. LLM ones yes. Vector DB yes. Big data tools used for AI/ML pipelines are relevant, right? Like ClickHouse, Spark, etc, used for AI data processing, so yes. Data analysis tools used for ML workflows, yes. AI agent ones obviously yes.

Wait Step 1: Filter out non-AI/ML. Let's list the excluded first: from trending: iv-org/invidious (YouTube alt frontend, no AI), usekaneo/kaneo (general project management, no AI core), donnemartin/system-design-primer (general system design interview prep, no AI focus). Wait what about reverse-skill? Wait its core is security penetration testing skill pack, with AI routing for coding clients. Hmm, maybe it's a borderline case. Wait let's see: the user said "clearly related to AI/ML". So reverse-skill's primary purpose is security testing, AI is a supporting feature, so maybe exclude? Wait but let's confirm: no, the description says it's a "Reverse Engineering / Authorized Penetration Testing / Security Research Skill Router Pack" with AI-powered routing. So primary is security, AI is auxiliary, so exclude. Okay, that's the excluded ones.

Now Step 2: Categorize into the 5 categories. Let's define each category first to make it clear:
1. 🔧 AI Infrastructure: Frameworks, SDKs, inference engines, dev tools, CLI tools that are foundational for building/deploying AI systems.
2. 🤖 AI Agents / Workflows: Agent frameworks, automation tools, multi-agent systems, agent tooling.
3. 📦 AI Applications: Vertical, user-facing AI applications for specific use cases.
4. 🧠 LLMs / Training: Model weights, training frameworks, fine-tuning tools, LLM-related core tech.
5. 🔍 RAG / Knowledge: Vector databases, retrieval-augmented generation tools, knowledge management systems for AI.

Now let's assign each relevant project to the right category, starting with the trending ones first, then the topic search ones, making sure to pick representative ones for each category.

First, 🔧 AI Infrastructure:
Let's list relevant ones:
- lyogavin/airllm: Inference engine for running 70B LLMs on 4GB GPUs, super efficient. That's inference infra.
- antirez/ds4: DeepSeek 4 local inference engine for Metal/CUDA/ROCm, core inference infra.
- firecrawl/pdf-inspector: Wait no, wait pdf-inspector is for PDF processing, which is used for RAG data pipelines? Wait no, wait let's see: livekit/agents is a framework for realtime voice AI agents, that's agent infra? Wait no, let's categorize properly. Wait livekit/agents: it's a framework for building realtime voice AI agents, so that's AI Agents / Workflows? Wait no, let's see:
Wait AI Infrastructure includes: inference engines, dev tools, SDKs, core frameworks for building AI systems.
So:
- lyogavin/airllm (trending): 70B LLM inference on single 4GB GPU, lightweight inference infra.
- antirez/ds4 (trending): DeepSeek 4 local inference engine supporting multiple hardware backends, core inference tool.
- firecrawl/pdf-inspector (trending): Fast Rust PDF processing library for AI data pipelines (inspection, classification, extraction for RAG/training), data processing infra for AI.
- microsoft/AI-For-Beginners (trending): Wait no, that's education, wait no, wait microsoft/generative-ai-for-beginners? No, wait those are educational resources, wait where to put them? Wait wait, no, let's see: are educational resources part of AI Applications? Or wait, no, let's check other categories. Wait wait, let's see: the topic search has LightGBM, scikit-learn, PyTorch, TensorFlow — those are ML training frameworks, so that's 🧠 LLMs / Training? Wait no, PyTorch and TensorFlow are general ML frameworks, LightGBM, scikit-learn are classical ML, but they are relevant for AI/ML, so yes, under 🧠 LLMs / Training? Wait wait the category is 🧠 LLMs / Training, but maybe it's broader, including classical ML training frameworks? Wait the user wrote the category as "🧠 LLMs / Training (model weights, training frameworks, fine-tuning tools)" — oh, but classical ML frameworks are also part of AI/ML training, so we can include them there, right? Because they are training frameworks for AI/ML models.
Wait also, open-compass/opencompass is LLM evaluation platform, that's training/LLM related, so under 🧠.
Wait also, 0xPlaygrounds/rig is Rust LLM application framework, that's infrastructure? Or LLM/training? Wait no, rig is for building LLM apps, so maybe AI Infrastructure? Wait let's adjust:

Wait let's rework the categories with clear boundaries:
🔧 AI Infrastructure: Foundational tooling for building, deploying, and operating AI systems, including inference engines, data processing tools for AI pipelines, core SDKs, dev CLIs, and framework utilities.
- lyogavin/airllm: Ultra-lightweight inference engine for running 70B parameter LLMs on a single 4GB GPU, drastically lowering hardware barriers for LLM deployment. (Trending, +1085 today)
- antirez/ds4: High-performance local inference engine for DeepSeek 4 models, with native support for Apple Metal, NVIDIA CUDA, and AMD ROCm, optimized for low-latency edge and local deployment. (Trending, +384 today)
- firecrawl/pdf-inspector: Rust-based high-speed PDF processing library optimized for AI data pipelines, with intelligent scanned/text-based PDF detection to enable smart routing for RAG and training data ingestion. (Trending, +1699 today)
- microsoft/AI-For-Beginners: 12-week structured open curriculum for AI fundamentals, with hands-on Jupyter Notebook lessons, serving as a foundational onboarding resource for new AI developers. (Trending, +1902 today)
- microsoft/generative-ai-for-beginners: 21-lesson open course for building generative AI applications, covering core concepts and practical implementation for LLM-powered use cases. (Trending, +775 today)
Wait wait, are the Microsoft courses infrastructure? Or maybe AI Applications? No, they are educational resources, but they are foundational for the ecosystem. Alternatively, maybe put them under a separate? No, the user's categories are fixed. Wait wait, maybe I misassigned. Let's see: the user's categories are fixed, so let's make sure each project fits.

Next, 🤖 AI Agents / Workflows: Agent frameworks, automation tools, multi-agent systems, agent tooling, and CLI tools for AI agent operation.
- esengine/DeepSeek-Reasonix (trending): DeepSeek-native terminal AI coding agent built for prefix-cache stability, designed for long-running, low-overhead development workflows. (+883 today)
- TencentCloud/TencentDB-Agent-Memory (trending): Team-level shared memory hub for AI agents, converting conversations, docs, and code into reusable, governed memory assets (chat memory, skills, LLM-Wiki, code graphs) for cross-agent and cross-framework reuse. (+1090 today)
- livekit/agents (trending): Open-source framework for building realtime voice, video, and text AI agents, with built-in support for multimodal interaction and low-latency deployment. (+148 today)
- Panniantong/Agent-Reach (trending): CLI tool that gives AI agents unrestricted internet access to read and search content from Twitter, Reddit, YouTube, GitHub, and other platforms with zero API fees. (+1057 today)
- HKUDS/nanobot (topic search, ai-agent): Ultra-lightweight self-hosted personal AI agent framework with built-in WebUI, tool support, memory, MCP integration, and multi-agent workflow capabilities. (⭐46,604)
- CopilotKit/CopilotKit (topic search, ai-agent): Frontend stack for building AI agent interfaces and generative UI, with support for React, Angular, mobile, and the AG-UI protocol for agent interoperability. (⭐36,442)
Wait that's good for agents.

Next, 📦 AI Applications: User-facing, vertical AI applications for specific end-use cases, no core framework/tooling.
- jamiepine/voicebox (trending): Open-source AI voice studio for cloning, dictation, and audio content creation, with support for custom voice models and multimodal input. (+412 today)
- Hugohe3/ppt-master (topic search, ai-agent? Wait no, it's an app that generates PowerPoint decks from documents/topics using AI, so that's an AI application. Wait its topic is ai-agent, but it's an end-user app. Wait let's see: hugohe3/ppt-master: AI-powered tool that converts documents or topics into native PowerPoint presentations with charts, animations, and audio narration. (⭐42,897)
- CherryHQ/cherry-studio (topic search, ai-agent): AI productivity studio with smart chat, autonomous agents, and 300+ pre-built assistants, with unified access to frontier LLMs. (⭐49,387)
- ZhuLinsen/daily_stock_analysis (topic search, ai-agent): LLM-powered multi-market stock analysis system with real-time data, news aggregation, decision dashboards, and automated notifications. (⭐60,008)
- 666ghj/BettaFish (topic search, data-analysis): Multi-agent public opinion analysis assistant that breaks information silos, predicts trends, and supports decision-making for general users. (⭐41,939)
Wait also, what about Alishahryar1/free-claude-code? Wait that's a tool to access Claude Code for free, is that an application? Or infrastructure? Wait it's a wrapper for AI coding clients, so maybe it's an AI application? Or agent tooling? Wait let's see: it's a tool that lets users use Claude Code, Codex, Pi for free from terminal/IDE/phone, so it's an application layer tool for accessing AI coding agents, so maybe under AI Applications? Or wait, maybe under Agents? Wait no, let's see: it's a utility for end users to access AI coding tools, so maybe AI Application. Wait but let's confirm.

Next, 🧠 LLMs / Training: LLM weights, training frameworks, fine-tuning tools, model evaluation tools, classical and deep learning training frameworks.
- huggingface/transformers (topic search, ml): The de facto open-source framework for defining, training, and deploying state-of-the-art LLMs and multimodal models across text, vision, and audio tasks. (⭐163,325)
- pytorch/pytorch (topic search, ml): Leading open-source deep learning framework with dynamic neural network support and strong GPU acceleration, the core backend for most LLM training and research. (⭐102,170)
- tensorflow/tensorflow (topic search, ml): Widely used open-source machine learning framework for building and deploying production AI models across hardware and platforms. (⭐196,783)
- scikit-learn/scikit-learn (topic search, ml): Popular open-source classical machine learning library for Python, used for classification, regression, clustering, and data preprocessing for AI workflows. (⭐66,871)
- LightGBM/catboost/LightGBM (topic search, data-mining): Wait LightGBM is a gradient boosting framework, catboost too, those are classical ML training frameworks, so under this category.
- open-compass/opencompass (topic search, llm-model): Comprehensive LLM evaluation platform supporting 100+ datasets and all major open/closed LLMs, critical for model benchmarking and fine-tuning validation. (⭐7,270)
- rasbt/LLMs-from-scratch (topic search, ml): Step-by-step educational repository for implementing a ChatGPT-like LLM from scratch in PyTorch, a core resource for LLM training research. (⭐100,505)
- ultralytics/ultralytics (topic search, ml): Leading open-source framework for YOLO object detection, instance segmentation, pose estimation, and other computer vision tasks, widely used for edge and production CV model deployment. (⭐60,198)
Wait that's good.

Next, 🔍 RAG / Knowledge: Vector databases, RAG engines, knowledge management tools, retrieval systems for AI.
- langgenius/dify (topic search, rag): Leading open-source low-code platform for building RAG pipelines and agentic workflows, with support for all major LLMs and tools, enabling fast prototyping to production deployment. (⭐151,298)
- open-webui/open-webui (topic search, rag): User-friendly open-source AI interface that supports local LLM inference (via Ollama) and API-connected models, with built-in RAG and agent capabilities for end users. (⭐147,799)
- langchain-ai/langchain (topic search, rag): The most widely used open-source agent engineering and LLM orchestration framework, with built-in RAG, tool calling, and multi-agent workflow support. (⭐143,399)
- infiniflow/ragflow (topic search, rag): High-performance open-source RAG engine that combines advanced retrieval with agent capabilities to provide superior context for LLMs, optimized for large-scale document processing. (⭐86,787)
- mem0ai/mem0 (topic search, rag): Universal open-source memory layer for AI agents, enabling persistent long-term memory across sessions for consistent, context-aware agent behavior. (⭐62,474)
- milvus-io/milvus (topic search, vector-db): High-performance cloud-native vector database built for scalable approximate nearest neighbor (ANN) search, the de facto standard for large-scale RAG deployments. (⭐45,503)
- qdrant/qdrant (topic search, vector-db): High-performance Rust-based vector database and vector search engine, optimized for low-latency RAG and similarity search use cases. (⭐33,766)
- Graphify-Labs/graphify (topic search, rag): Open-source tool that converts codebases, docs, SQL schemas, and PDFs into queryable knowledge graphs for RAG, with local deterministic AST parsing and no vector store dependency. (⭐102,073)
- thedotmack/claude-mem (topic search, rag): Persistent context management tool for AI coding agents, compressing session history with AI to inject relevant context into future sessions, supporting all major AI coding clients. (⭐89,487)
Wait that's a good list for RAG/Knowledge.

Wait wait, what about the trending repo zhaoxuya520/reverse-skill? Earlier we thought it's security focused, but let's recheck: it's a skill router for AI coding clients (Claude Code, Cursor etc) with AI-powered routing, on-demand toolchain bootstrapping, self-evolving knowledge base. Oh, right, it's a tool for AI coding agents, so maybe under AI Agents? Wait but its primary use case is security testing. Hmm, the user said "clearly related to AI/ML". Let's see: its core functionality is routing skills for AI coding clients, so it's part of the AI agent toolchain, even if it's targeted at security use cases. So maybe we can include it? Wait but let's see: the trending list has +2446 today, that's the second highest. So maybe we should include it, under AI Agents / Workflows? Let's note that. Wait but let's make sure: the description says it's for reverse engineering / penetration testing, but the functionality is AI-powered routing for AI coding clients. So it's an AI agent tool, so yes, relevant.

Wait also, what about usekaneo/kaneo? No, it's general project management, no AI core, so exclude. iv-org/invidious: no, YouTube frontend, exclude. donnemartin/system-design-primer: general system design, no AI focus, exclude.

Now Step 3: Output the report.

First, 1. Today's Highlights: 3-5 sentences. Let's see: Today's trending list highlights two dominant themes: extreme efficiency in LLM deployment (e.g. AirLLM running 70B models on 4GB GPUs, DeepSeek-Reasonix optimized for local inference) and the rapid maturation of AI agent tooling, with multiple new releases focused on agent memory, internet access, and coding workflow integration. The open-source RAG and knowledge management ecosystem also remains highly active, with projects like Dify and RAGFlow continuing to gain massive community traction. Additionally, there is growing focus on domain-specific AI applications, including financial market LLMs and AI-powered stock analysis tools, reflecting the shift of AI adoption from general-purpose to vertical use cases.

Wait that's good. Now 2. Top Projects by Category, 3-8 per category, each with link, stars (total + today's if available), one sentence description.

Let's structure each category:

🔧 AI Infrastructure
1. [lyogavin/airllm](https://github.com/lyogavin/airllm): ⭐0 (+1,085 today). Ultra-lightweight inference engine that enables running 70B parameter large language models on a single 4GB GPU, drastically reducing hardware costs for LLM deployment and edge use cases.
2. [antirez/ds4](https://github.com/antirez/ds4): ⭐0 (+384 today). High-performance local inference engine for DeepSeek 4 Flash and Pro models, with native support for Apple Metal, NVIDIA CUDA, and AMD ROCm, optimized for low-latency local and edge deployment.
3. [firecrawl/pdf-inspector](https://github.com/firecrawl/pdf-inspector): ⭐0 (+1,699 today). Fast Rust library for PDF inspection, classification, and text extraction, with intelligent scanned vs. text-based PDF detection to enable smart routing for RAG pipelines and AI training data ingestion.
4. [microsoft/AI-For-Beginners](https://github.com/microsoft/AI-For-Beginners): ⭐0 (+1,902 today). 12-week, 24-lesson open-access AI curriculum with hands-on Jupyter Notebook exercises, serving as a foundational onboarding resource for new developers entering the AI ecosystem.
5. [microsoft/generative-ai-for-beginners](https://github.com/microsoft/generative-ai-for-beginners): ⭐0 (+775 today). 21-lesson open course for building generative AI applications, covering core LLM concepts, RAG implementation, and agent development for practical use cases.

Wait that's 5, good.

🤖 AI Agents / Workflows
1. [esengine/DeepSeek-Reasonix](https://github.com/esengine/DeepSeek-Reasonix): ⭐0 (+883 today). DeepSeek-native terminal AI coding agent built for prefix-cache stability, designed for long-running, low-overhead development workflows with minimal context loss.
2. [TencentCloud/TencentDB-Agent-Memory](https://github.com/TencentCloud/TencentDB-Agent-Memory): ⭐0 (+1,090 today). Team-level shared memory hub for AI agents that converts conversations, documentation, and code into reusable, governed memory assets (chat memory, skills, LLM-Wiki, code graphs) for cross-agent and cross-framework reuse.
3. [livekit/agents](https://github.com/livekit/agents): ⭐0 (+148 today). Open-source framework for building realtime voice, video, and text AI agents, with built-in support for multimodal interaction, low-latency deployment, and integration with LiveKit's real-time communication infrastructure.
4. [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach): ⭐0 (+1,057 today). CLI tool that gives AI agents unrestricted internet access to read and search content from Twitter, Reddit, YouTube, GitHub, and other platforms with zero API fees, eliminating external service dependencies for agent workflows.
5. [zhaoxuya520/reverse-skill](https://github.com/zhaoxuya520/reverse-skill): ⭐0 (+2,446 today). AI-powered skill routing and toolchain bootstrapping pack for security-focused AI coding clients (Claude Code, Cursor, etc.), with a self-evolving knowledge base for penetration testing and reverse engineering use cases.
6. [HKUDS/nanobot](https://github.com/HKUDS/nanobot): ⭐46,604 (topic: ai-agent). Ultra-lightweight self-hosted personal AI agent framework with built-in WebUI, MCP support, memory, and multi-agent workflow capabilities, designed for low-resource local deployment.

That's 6, good.

📦 AI Applications
1. [jamiepine/voicebox](https://github.com/jamiepine/voicebox): ⭐0 (+412 today). Open-source AI voice studio for voice cloning, dictation, and audio content creation, with support for custom voice models and multimodal input for creators and developers.
2. [shiyu-coder/Kronos](https://github.com/shiyu-coder/Kronos): ⭐0 (+200 today). Open-source foundation model fine-tuned for the language of financial markets, enabling use cases like market sentiment analysis, trend prediction, and automated trading signal generation.
3. [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis): ⭐60,008 (topic: ai-agent). LLM-powered multi-market stock analysis system that aggregates real-time market data, news, and social sentiment to generate decision dashboards and automated notifications for zero-cost scheduled runs.
4. [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio): ⭐49,387 (topic: ai-agent). AI productivity studio with smart chat, autonomous agents, and 300+ pre-built assistants, with unified access to all major frontier LLMs for individual and team use.
5. [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master): ⭐42,897 (topic: ai-agent). AI-powered tool that converts documents or text topics into native PowerPoint presentations with custom charts, transitions, animations, and audio narration from speaker notes.

That's 5, good.

🧠 LLMs / Training
1. [huggingface/transformers](https://github.com/huggingface/transformers): ⭐163,325 (topic: ml). The de facto open-source framework for defining, training, and deploying state-of-the-art LLMs and multimodal models across text, vision, and audio tasks, with support for thousands of pre-trained model checkpoints.
2. [pytorch/pytorch](https://github.com/pytorch/pytorch): ⭐102,170 (topic: ml). Leading open-source deep learning framework with dynamic neural network support and strong GPU acceleration, the core backend for most LLM training, research, and deployment workflows.
3. [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow): ⭐196,783 (topic: ml). Widely adopted open-source machine learning framework for building and deploying production AI models across edge devices, servers, and cloud platforms.
4. [scikit-learn/scikit-learn](https://github.com/scikit-learn/scikit-learn): ⭐66,871 (topic: ml). Popular open-source classical machine learning library for Python, providing tools for classification, regression, clustering, and data preprocessing for both research and production AI workflows.
5. [open-compass/opencompass](https://github.com/open-compass/opencompass): ⭐7,270 (topic: llm-model). Comprehensive LLM evaluation platform supporting 100+ benchmark datasets and all major open and closed LLMs, critical for model benchmarking, fine-tuning validation, and safety testing.
6. [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics): ⭐60,198 (topic: ml). Leading open-source framework for YOLO computer vision models, supporting object detection, instance segmentation, pose estimation, and object tracking for edge and production deployment.

Perfect, that's 6.

🔍 RAG / Knowledge
1. [langgenius/dify](https://github.com/langgenius/dify): ⭐151,298 (topic: rag). Leading open-source low-code platform for building RAG pipelines and agentic workflows, with native support for all major LLMs, tools, and deployment options (cloud, VPC, self-hosted) for teams moving from prototype to

---
*This digest is auto-generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar).*