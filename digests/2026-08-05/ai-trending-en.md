# AI Open Source Trends 2026-08-05

> Sources: GitHub Trending + GitHub Search API (AI, big data, data analysis, data mining trends) | Generated: 2026-08-05 05:02 UTC

---

# AI Open Source Trends Report — 2026-08-05

## 1. Today's Highlights

Agent memory and persistent context emerged as the dominant theme, with TencentCloud's team-level memory hub and several session-persistence tools drawing significant star growth. A surge of "skill pack" repositories for AI coding clients (Claude Code, Cursor, Codex) signals rapid commoditization of agent capabilities into shareable, versioned units. PDF processing is being reinvented for AI pipelines — firecrawl's Rust-based inspector gained 2,540 stars in a day for smart scanned/text routing. Edge inference remains hot with AirLLM's 70B-on-4GB-GPU approach, while DeepSeek-Reasonix's terminal agent is gaining traction through prefix-cache optimization. Security for enterprise AI agents (Uber's ADR) is emerging as a distinct product category.

## 2. Top Projects by Category

### 🔧 AI Infrastructure

- [firecrawl/pdf-inspector](https://github.com/firecrawl/pdf-inspector) — ⭐0 (+2,540 today): Rust-based PDF inspection and classification library that detects scanned vs text-based documents for intelligent extraction routing.
- [lyogavin/airllm](https://github.com/lyogavin/airllm) — ⭐0 (+1,711 today): Enables 70B parameter LLM inference on a single 4GB GPU through memory-efficient partitioning techniques.
- [vllm-project/vllm](https://github.com/vllm-project/vllm) — ⭐88,210: High-throughput LLM inference and serving engine, remaining the backbone of production deployments.
- [livekit/agents](https://github.com/livekit/agents) — ⭐0 (+432 today): Framework for building realtime voice AI agents with audio/video capabilities.
- [ollama/ollama](https://github.com/ollama/ollama) — ⭐177,809: Leading local model runtime, now supporting Kimi, GLM, DeepSeek, Qwen and other frontier models out of the box.

### 🤖 AI Agents / Workflows

- [TencentCloud/TencentDB-Agent-Memory](https://github.com/TencentCloud/TencentDB-Agent-Memory) — ⭐0 (+1,111 today): Team-level memory hub converting conversations, docs, and code into four reusable governance-friendly memory assets for AI agents.
- [zhaoxuya520/reverse-skill](https://github.com/zhaoxuya520/reverse-skill) — ⭐0 (+2,297 today): AI-routed skill pack for security research — reverse engineering and penetration testing toolchains that self-evolve, compatible with multiple AI coding clients.
- [obra/superpowers](https://github.com/obra/superpowers) — ⭐0 (+653 today): Agentic skills framework and software development methodology designed for production agent workflows.
- [esengine/DeepSeek-Reasonix](https://github.com/esengine/DeepSeek-Reasonix) — ⭐0 (+922 today): DeepSeek-native terminal AI coding agent optimized for prefix-cache stability for long-running sessions.
- [EveryInc/compound-engineering-plugin](https://github.com/EveryInc/compound-engineering-plugin) — ⭐0 (+40 today): Official Compound Engineering plugin providing shared agent capabilities across Claude Code, Codex, and Cursor.
- [browser-use/video-use](https://github.com/browser-use/video-use) — ⭐0 (+320 today): Video editing automated through coding agents, extending the browser-use paradigm to multimedia.

### 📦 AI Applications

- [uber/ADR](https://github.com/uber/ADR) — ⭐0 (+148 today): Enterprise AI agent security platform — observability, security benchmarking, and threat detection, deployed at Uber scale.
- [microsoft/generative-ai-for-beginners](https://github.com/microsoft/generative-ai-for-beginners) — ⭐0 (+783 today): 21-lesson course for getting started with generative AI, maintained by Microsoft.

### 🧠 LLMs / Training

- [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) — ⭐225,615: The agent that grows with you — general-purpose agent harness with evolution and personalization capabilities over time.

### 🔍 RAG / Knowledge

- [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) — ⭐102,615: Converts any codebase and documents into a queryable knowledge graph via deterministic AST parsing — no vector store required.
- [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) — ⭐89,597: Captures agent session activity, compresses it with AI, and injects relevant context into future sessions across multiple agent CLIs.
- [infiniflow/ragflow](https://github.com/infiniflow/ragflow) — ⭐86,847: Leading open-source RAG engine fusing retrieval with agent capabilities for a superior LLM context layer.
- [mem0ai/mem0](https://github.com/mem0ai/mem0) — ⭐62,550: Universal memory layer for AI agents, providing persistent knowledge across sessions and agents.
- [topoteretes/cognee](https://github.com/topoteretes/cognee) — ⭐29,785: Self-hosted knowledge graph engine giving AI agents persistent long-term memory across sessions.

## 3. Trend Signal Analysis

The strongest signal today is the **commoditization of agent skills and memory**. The overnight success of skill-pack repositories (reverse-skill at +2,297 stars, superpowers at +653) indicates the community is shifting from building agents from scratch to assembling reusable, shareable capability units. These packs work across multiple coding clients — Claude Code, Cursor, Cline, Codex — suggesting a cross-platform skill standard is emerging organically.

**Agent memory is the new database layer.** TencentDB-Agent-Memory's team-level approach and the sustained growth of claude-mem, mem0, and cognee point toward memory infrastructure becoming a first-class architectural concern, distinct from RAG. The Tencent entry is particularly notable — cloud vendors are recognizing agent memory as a database product category.

**PDF/data ingestion is being re-architected for AI consumers.** Firecrawl's pdf-inspector addresses the scanned-vs-text routing problem that plagues enterprise RAG pipelines. This is a pragmatic infrastructure gap being filled with serious engineering (Rust, +2,540 stars in a day).

**Enterprise security for agents is emerging as a dedicated category.** Uber open-sourcing its agent security platform (observability, benchmarking, threat detection) signals that production deployments are now large enough to warrant specialized security tooling.

**Efficient inference continues to fragment the serving stack.** AirLLM's 70B-on-4GB-GPU approach (+1,711) and DeepSeek-Reasonix's prefix-cache engineering (+922) show optimization at the extremes — minimal hardware and long-running stability respectively.

## 4. Community Hot Spots

- **Agent skill packs** — [reverse-skill](https://github.com/zhaoxuya520/reverse-skill) and [superpowers](https://github.com/obra/superpowers) are pioneering a new distribution model for agent capabilities; watch for a standard format to emerge across coding clients.

- **Cross-session agent memory** — [claude-mem](https://github.com/thedotmack/claude-mem) and [TencentDB-Agent-Memory](https://github.com/TencentCloud/TencentDB-Agent-Memory) are attacking context persistence from different angles (individual vs team); both are gaining momentum rapidly.

- **Codebase knowledge graphs** — [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) at 102K stars is proving deterministic AST parsing plus knowledge graphs can rival vector-based code understanding without embedding infrastructure.

- **Enterprise AI security** — [uber/ADR](https://github.com/uber/ADR) is the first major open-source agent security platform from a hyperscale user; expect a cluster of tooling around agent observability, benchmarking, and threat detection.

- **Low-resource inference** — [airllm](https://github.com/lyogavin/airllm) continues to push the boundary of what's possible on consumer hardware, opening up local LLM development to developers without GPU clusters.

---
*This digest is auto-generated by [agents-radar](https://github.com/huang-yi-dae/agents-radar).*