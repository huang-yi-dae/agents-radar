# AI 开源趋势日报 2026-08-01

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-08-01 03:22 UTC

---

# AI 开源趋势日报 · 2026-08-01

> 数据说明：Trending 榜原始快照中 star 总量显示为 0，因此该类项目只标注今日新增；主题搜索项目标注 star 总量。已略去 chatwoot、kaneo、tuicr、ESP32-Bit-Pirate、awesome-systematic-trading 等与 AI/ML 无明确关联的通用工具，以及 netdata、julia、airflow 等非核心 AI 基础设施。

## 今日速览

今日 AI 开源最明显的特征是“智能体技能化”：reverse-skill、last30days-skill、openwork 等直接面向 Claude Code / Cursor / Cline 的 Skill/Harness 项目登上 Trending；同时 Microsoft AI-For-Beginners 以 +1592 新增 stars 领跑，教育内容依然是传播力最强的品类。主题搜索中，ECC（236,660）、Hermes Agent（223,462）与 AutoGPT 等 Agent 框架占据高星位置，说明“可组合的 Agent 基础设施”是当前社区主战场。RAG/向量库没有降温，RAGFlow、Milvus、Qdrant 与记忆层（mem0、claude-mem）正在融合为统一的“Agent 记忆/知识底座”。此外，从零实现 LLM 的学习项目（LLMs-from-scratch、tiny-llm、toyllm）持续活跃，开发者对模型底层原理的兴趣依旧浓厚。

## 各维度热门项目

### 🔧 AI 基础工具

1. [ollama/ollama](https://github.com/ollama/ollama) ⭐177,461  
   本地/服务器运行 LLM 的 CLI + 运行时事实标准，支持 Kimi、GLM、DeepSeek、Qwen、Gemma 等主流模型。

2. [huggingface/transformers](https://github.com/huggingface/transformers) ⭐163,213  
   模型定义/推理/训练的基础框架，覆盖文本、视觉、音频、多模态。

3. [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) ⭐158,752  
   面向 AI Agent 和 RAG 的网页搜索/抓取/交互 API，是 Agent 获取互联网数据的关键入口。

4. [github/copilot-sdk](https://github.com/github/copilot-sdk) ⭐0（今日 +7）  
   官方 SDK，将 GitHub Copilot Agent 集成进 App/服务，编程助手生态的重要接口。

5. [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) ⭐63,587  
   在进入 LLM 前压缩工具输出/日志/RAG 片段，最多可减少 60-95% JSON token。

6. [The-Pocket/PocketFlow](https://github.com/The-Pocket/PocketFlow) ⭐11,078  
   100 行代码的 LLM 框架，强调“让 Agent 构建 Agent”。

7. [langchain4j/langchain4j](https://github.com/langchain4j/langchain4j) ⭐12,758  
   Java/JVM 生态的 LLM 应用框架，统一封装 LLM Provider、Vector Store、Tool Calling/MCP 和 RAG。

8. [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig) ⭐8,116  
   Rust 生态的模块化 LLM 应用框架，适合高性能/类型安全场景。

### 🤖 AI 智能体/工作流

1. [affaan-m/ECC](https://github.com/affaan-m/ECC) ⭐236,660  
   Agent harness 性能优化系统，为 Claude Code/Codex/Cursor/Opencode 提供 skills、instincts、memory 与安全边界。

2. [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) ⭐223,462  
   “伴随你成长的 Agent”，社区热度极高，主打记忆与技能自主进化。

3. [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) ⭐185,747  
   老牌通用 Agent 平台，目标是让任何人都能使用和构建 AI Agent。

4. [langgenius/dify](https://github.com/langgenius/dify) ⭐150,943  
   一站式 Agentic Workflow/RAG 平台，广被用于 AI 应用生产部署。

5. [langchain-ai/langchain](https://github.com/langchain-ai/langchain) ⭐143,130  
   Agent 工程平台，提供 LangGraph/LangSmith 等工具链。

6. [browser-use/browser-use](https://github.com/browser-use/browser-use) ⭐107,434  
   让 AI Agent 直接操作浏览器，自动化线上任务。

7. [zhayujie/CowAgent](https://github.com/zhayujie/CowAgent) ⭐46,251  
   原 chatgpt-on-wechat，多模型/多平台的开源超级助理与 Agent Harness。

8. [different-ai/openwork](https://github.com/different-ai/openwork) ⭐0（今日 +806）  
   Claude Cowork 的开源替代，由 opencode 驱动，主打多 Agent 协作编码。

### 📦 AI 应用

1. [microsoft/AI-For-Beginners](https://github.com/microsoft/AI-For-Beginners) ⭐0（今日 +1592）  
   12 周 24 课 AI 入门课程，今日 Trending 新增 stars 最高。

2. [open-webui/open-webui](https://github.com/open-webui/open-webui) ⭐147,486  
   自托管 AI 聊天/Agent UI，兼容 Ollama、OpenAI API。

3. [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) ⭐100,824  
   用 LLM + 自动化工作流一键生成高清短视频。

4. [deepfakes/faceswap](https://github.com/deepfakes/faceswap) ⭐0（今日 +93）  
   开源 Deepfake 软件，AI 多媒体生成领域最经典项目之一。

5. [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) ⭐49,221  
   AI 生产力套件：智能聊天、自主 Agent、300+ 助手。

6. [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) ⭐42,217  
   AI 将文档/主题转成原生 PowerPoint，支持动画、图表与配音。

7. [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill) ⭐0（今日 +658）  
   AI 调研技能：从 Reddit/X/YouTube/HN/Polymarket/Web 抓取资料并合成有依据的总结。

8. [zhaoxuya520/reverse-skill](https://github.com/zhaoxuya520/reverse-skill) ⭐0（今日 +335）  
   面向逆向/渗透/安全测试的 AI 技能路由包，支持 Claude Code、Cursor、Cline 等客户端。

### 🧠 大模型/训练

1. [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow) ⭐196,636  
   经典开源 ML 框架，仍是许多生产模型训练/推理的底座。

2. [pytorch/pytorch](https://github.com/pytorch/pytorch) ⭐102,093  
   动态神经网络框架，学术界与工业界 LLM/CV 训练的主流选择。

3. [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) ⭐100,243  
   从零实现 ChatGPT-like LLM 的 PyTorch 教程，覆盖预训练/微调全流程。

4. [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics) ⭐60,091  
   YOLO26/YOLO11/YOLOv8 等 CV 模型训练与推理框架。

5. [open-compass/opencompass](https://github.com/open-compass/opencompass) ⭐7,252  
   LLM 评测平台，支持 100+ 数据集与主流模型。

6. [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) ⭐4,427  
   面向系统工程师的课程：在 Apple Silicon 上从零构建 tiny vLLM + Qwen。

7. [AarambhDevHub/aarambh-studio](https://github.com/AarambhDevHub/aarambh-studio) ⭐54  
   纯 Rust + Candle 从零实现 Decoder-only LLM，无 Python/PyTorch，支持 MoE、视频/文档理解与工具 Agent。

8. [ai-glimpse/toyllm](https://github.com/ai-glimpse/toyllm) ⭐25  
   “ToyLLM”从零学习 LLM 的最小实现项目。

### 🔍 RAG/知识库

1. [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) ⭐99,791  
   将代码库/文档/SQL schema 转成可查询知识图谱，不需要向量库。

2. [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) ⭐89,190  
   为所有 Agent 提供跨会话持久上下文，自动压缩历史并注入相关记忆。

3. [infiniflow/ragflow](https://github.com/infiniflow/ragflow) ⭐86,534  
   开源 RAG 引擎，融合 Agent 能力，成为 LLM 的上下文层。

4. [Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm) ⭐64,174  
   本地优先的 All-in-one 知识库/Agent 工具。

5. [mem0ai/mem0](https://github.com/mem0ai/mem0) ⭐62,228  
   AI Agent 通用记忆层，可用于跨会话记忆和个性化。

6. [run-llama/llama_index](https://github.com/run-llama/llama_index) ⭐51,264  
   文档 Agent / OCR 平台，RAG 生态核心组件。

7. [milvus-io/milvus](https://github.com/milvus-io/milvus) ⭐45,440  
   云原生向量数据库，大规模向量 ANN 检索。

8. [qdrant/qdrant](https://github.com/qdrant/qdrant) ⭐33,699  
   高性能向量数据库，专为下一代 AI 应用设计。

## 趋势信号分析

今日最强信号是 Agent Skill/Harness 生态爆发。Trending 中 [reverse-skill](https://github.com/zhaoxuya520/reverse-skill)、[last30days-skill](https://github.com/mvanhorn/last30days-skill)、[openwork](https://github.com/different-ai/openwork)，以及 Topic 侧 [ECC](https://github.com/affaan-m/ECC)、[Graphify](https://github.com/Graphify-Labs/graphify)、[claude-mem](https://github.com/thedotmack/claude-mem)、[learn-claude-code](https://github.com/shareAI-lab/learn-claude-code) 等，都在围绕“让编码 Agent 更专业、更省 token、有记忆”展开。社区焦点从“造通用 Agent”转向“为 Agent 装配可复用技能与记忆/上下文管理”，与 Anthropic/OpenAI/GitHub 在编程 Agent 上的投入形成共振。第二个信号是 AI 教育与白盒实现热度不减：[AI-For-Beginners](https://github.com/microsoft/AI-For-Beginners) 今日新增最高，[LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch)、[tiny-llm](https://github.com/skyzh/tiny-llm)、[toyllm](https://github.com/ai-glimpse/toyllm) 持续活跃。第三个信号是 RAG/向量库与 Agent 记忆融合，[mem0](https://github.com/mem0ai/mem0)、[claude-mem](https://github.com/thedotmack/claude-mem)、[cognee](https://github.com/topoteretes/cognee) 等构成“可记忆、可检索”的数据底座。整体看，增长由“编码 Agent 可组合性”和“记忆/RAG 基础设施”双轮驱动。

## 社区关注热点

- **Agent Skill 跨客户端生态**：随着 [reverse-skill](https://github.com/zhaoxuya520/reverse-skill)、[last30days-skill](https://github.com/mvanhorn/last30days-skill) 等技能包直接进入 Claude Code/Cursor/Cline，以及 [ECC](https://github.com/affaan-m/ECC)、[Graphify](https://github.com/Graphify-Labs/graphify) 将技能/记忆/知识图谱做成可复用组件，一个类似“技能插件市场”的生态正在形成。

- **记忆与上下文层**：Agent 跨会话记忆是当前刚需。[claude-mem](https://github.com/thedotmack/claude-mem)、[mem0](https://github.com/mem0ai/mem0)、[cognee](https://github.com/topoteretes/cognee) 等项目与 [RAGFlow](https://github.com/infiniflow/ragflow)、[Milvus](https://github.com/milvus-io/milvus)、[Qdrant](https://github.com/qdrant/qdrant) 等向量栈结合，是后续 Agent 应用标配。

- **开源结对编程工作区**：[openwork](https://github.com/different-ai/openwork) 今日 +806 stars，对标 Claude Cowork；程序员对“可自托管、多 Agent 协作编码”的需求正在快速放大。

- **AI 教育与白盒实现**：[Microsoft AI-For-Beginners](https://github.com/microsoft/AI-For-Beginners) 今日 +1592 stars，[LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch)、[tiny-llm](https://github.com/skyzh/tiny-llm)、[toyllm](https://github.com/ai-glimpse/toyllm) 等从零项目证明“理解底层”仍是社区最强学习动机之一。

- **垂直场景 Agent 化**：AI Agent 正快速进入求职（[career-ops](https://github.com/santifer/career-ops)）、交易（[Vibe-Trading](https://github.com/HKUDS/Vibe-Trading)）、内容生成（[MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo)）等垂直领域，未来“模型 + 技能 + 记忆 + 垂直场景”会成为主流落地形态。

---
*本日报由 [agents-radar](https://github.com/huang-yi-dae/agents-radar) 自动生成。*