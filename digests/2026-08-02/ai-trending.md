# AI 开源趋势日报 2026-08-02

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-08-02 09:42 UTC

---

## 说明

已按“AI/ML 明确相关”筛选：Trending 中的 `kaneo`、`gh-stack`、`invidious`、`ansible`、`awesome-systematic-trading` 等非 AI 专用项目已剔除；主题搜索中少数通用语言/基础设施项目（如 `JuliaLang`、`netdata`、`Apache Airflow` 等）因 AI 属性不明确，未纳入主表。以下项目按主要用途归类，部分项目可多维度理解，不再重复列出。

---

# AI 开源趋势日报（2026-08-02）

## 一、今日速览

今日 AI 开源最明显的信号是 **AI Agent 正在从“单点应用”走向“基础设施化、技能化、记忆化”**：`deer-flow`、`TencentDB-Agent-Memory`、`github/copilot-sdk` 等同时登榜，分别指向 Agent 编排、团队级记忆和官方集成入口。`reverse-skill` 以今日 +1,320 stars 登顶 Trend 榜，说明“面向编码 Agent 的技能包”正在成为一种独立分发形态。语音与 3D 多模态同步升温，Hugging Face `speech-to-speech` 和微软 `TRELLIS.2` 分别覆盖本地语音 Agent 与生成式 3D。RAG/记忆方向依然是最稳的吸星赛道，`mem0`、`claude-mem`、`RAGFlow` 持续保持极高社区关注。

## 二、各维度热门项目

### 🔧 AI 基础工具

- [pytorch/pytorch](https://github.com/pytorch/pytorch) — ⭐102,121  
  核心深度学习框架，仍是 AI 训练与推理的基础底座。

- [huggingface/transformers](https://github.com/huggingface/transformers) — ⭐163,244  
  文本、视觉、音频、多模态模型事实标准的模型定义与推理框架。

- [vllm-project/vllm](https://github.com/vllm-project/vllm) — ⭐87,919  
  高吞吐、内存高效的 LLM 推理与部署引擎，是开源模型服务的关键基建。

- [ollama/ollama](https://github.com/ollama/ollama) — ⭐177,546  
  本地一键运行 Kimi、GLM、DeepSeek、Qwen、Gemma 等模型，是本地 AI 入口级产品。

- [github/copilot-sdk](https://github.com/github/copilot-sdk) — 今日 +142  
  GitHub 官方多平台 SDK，用于将 Copilot Agent 集成到第三方应用和服务。

- [langchain-ai/langchain](https://github.com/langchain-ai/langchain) — ⭐143,208  
  Agent/LLM 应用工程平台，定义了大量链式调用与工具调用范式。

- [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) — ⭐159,245  
  面向 LLM 与 AI Agent 的网页抓取和数据接入 API，是 Agent 获取实时信息的重要工具。

- [open-compass/opencompass](https://github.com/open-compass/opencompass) — ⭐7,256  
  大模型评测平台，支持 100+ 数据集，覆盖主流开源与闭源模型。

### 🤖 AI 智能体/工作流

- [bytedance/deer-flow](https://github.com/bytedance/deer-flow) — 今日 +209  
  开源长程任务 SuperAgent harness，整合沙箱、记忆、工具、子代理与消息网关，能处理分钟级到小时级任务。

- [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) — ⭐224,010  
  “The agent that grows with you”，是当前高星 Agent 项目之一，强调可成长、可扩展的 Agent 形态。

- [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) — ⭐185,761  
  老牌通用自主 Agent 项目，社区影响力深厚，持续推动“AI for everyone”愿景。

- [browser-use/browser-use](https://github.com/browser-use/browser-use) — ⭐107,550  
  让 AI Agent 可以直接操作浏览器，自动化完成网页端任务。

- [HKUDS/nanobot](https://github.com/HKUDS/nanobot) — ⭐46,507  
  超轻量、可自托管的个人 AI Agent 框架，支持 WebUI、工具、MCP、多 Agent 工作流。

- [TencentCloud/TencentDB-Agent-Memory](https://github.com/TencentCloud/TencentDB-Agent-Memory) — 今日 +227  
  团队级 Agent 记忆中枢，将对话、文档、代码转化为 Chat Memory、Skill、LLM-Wiki、Code-Graph 四类记忆资产。

- [zhaoxuya520/reverse-skill](https://github.com/zhaoxuya520/reverse-skill) — 今日 +1,320  
  面向逆向/渗透/安全的 AI 技能路由包，支持 Claude Code、Cursor、Cline 等编码 AI 客户端。

- [NomaDamas/k-skill](https://github.com/NomaDamas/k-skill) — 今日 +53  
  韩语 Agent 技能包，体现 Agent 技能生态的本地化与语言化趋势。

### 📦 AI 应用

- [huggingface/speech-to-speech](https://github.com/huggingface/speech-to-speech) — 今日 +442  
  用开源模型构建本地语音 Agent，语音交互应用门槛大幅降低。

- [abus-aikorea/voice-pro](https://github.com/abus-aikorea/voice-pro) — 今日 +58  
  Gradio WebUI，集 TTS、零样本声音克隆、Whisper 音频处理、YouTube 下载、人声分离于一体，面向创作者。

- [microsoft/TRELLIS.2](https://github.com/microsoft/TRELLIS.2) — 今日 +107  
  微软 3D 生成项目，使用原生紧凑结构化潜空间做 3D 资产生成，是 AIGC 3D 方向的重要进展。

- [open-webui/open-webui](https://github.com/open-webui/open-webui) — ⭐147,577  
  用户友好的本地 AI 界面，支持 Ollama、OpenAI API，是自托管 LLM 应用标配之一。

- [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) — ⭐101,105  
  基于 AI 大模型与自动化工作流，一键生成高清短视频的爆款应用。

- [OpenBB-finance/OpenBB](https://github.com/OpenBB-finance/OpenBB) — ⭐71,276  
  面向分析师、量化研究员与 AI Agent 的开源金融数据平台，是垂直场景典型代表。

- [santifer/career-ops](https://github.com/santifer/career-ops) — ⭐62,500  
  开源 AI 求职助手，可扫描岗位、按 A-F 评分、定制简历，并在本地 AI 编码 CLI 中运行。

- [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) — ⭐42,484  
  AI 将文档或主题转换为原生 PowerPoint，支持动画、图表、数据绑定与音频旁白。

### 🧠 大模型/训练与学习

- [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) — ⭐100,339  
  从零开始用 PyTorch 实现类 ChatGPT LLM 的经典教程仓库。

- [microsoft/AI-For-Beginners](https://github.com/microsoft/AI-For-Beginners) — 今日 +949  
  微软出品的 12 周 24 课 AI 入门课程，今日新增 stars 最高的教育资源之一。

- [microsoft/generative-ai-for-beginners](https://github.com/microsoft/generative-ai-for-beginners) — 今日 +108  
  21 课生成式 AI 入门课程，覆盖构建生成式 AI 应用的完整路径。

- [microsoft/ML-For-Beginners](https://github.com/microsoft/ML-For-Beginners) — ⭐88,878  
  经典机器学习入门课程，12 周 26 课，持续受到社区欢迎。

- [GitHub 机器学习](https://github.com/topics/machine-learning) — 机器学习趋势观察  
  补充维度：聚合机器学习 / 大数据 / 数据挖掘热门仓库的流行度信号。

- [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) — ⭐4,429  
  面向系统工程师的 LLM 推理服务课程，在 Apple Silicon 上从零构建 tiny vLLM + Qwen。

- [AarambhDevHub/aarambh-studio](https://github.com/AarambhDevHub/aarambh-studio) — ⭐57  
  纯 Rust 从零实现的 decoder-only LLM，集成 Gated DeltaNet、稀疏注意力、MoE 等前沿设计。

### 🔍 RAG/知识库

- [infiniflow/ragflow](https://github.com/infiniflow/ragflow) — ⭐86,598  
  领先的开源 RAG 引擎，将 RAG 与 Agent 能力结合，为 LLM 提供上下文层。

- [run-llama/llama_index](https://github.com/run-llama/llama_index) — ⭐51,295  
  LlamaIndex 是头部文档 Agent 与 OCR 平台，也是 RAG 应用开发的核心框架。

- [milvus-io/milvus](https://github.com/milvus-io/milvus) — ⭐45,462  
  高性能云原生向量数据库，专为大规模向量 ANN 搜索设计。

- [qdrant/qdrant](https://github.com/qdrant/qdrant) — ⭐33,717  
  高性能向量数据库与搜索引擎，是新一代 AI 应用常用检索底座。

- [meilisearch/meilisearch](https://github.com/meilisearch/meilisearch) — ⭐58,820  
  极速搜索 API，支持 AI 混合搜索，适合站点和应用内检索场景。

- [mem0ai/mem0](https://github.com/mem0ai/mem0) — ⭐62,300  
  AI Agent 的通用记忆层，为跨会话、跨应用提供持久记忆能力。

- [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) — ⭐89,287  
  捕获 Agent 会话内容，用 AI 压缩并注入未来上下文，是 Agent 长期记忆的代表项目。

- [topoteretes/cognee](https://github.com/topoteretes/cognee) — ⭐29,682  
  开源 AI 记忆平台，基于自托管知识图谱引擎，为 Agent 提供持久长期记忆。

## 三、趋势信号分析

今日最突出的信号是 **AI Agent 从单体应用走向基础设施化、技能化与记忆化**。热榜上 `deer-flow`、`TencentDB-Agent-Memory`、`github/copilot-sdk` 分别代表 Agent harness、团队级记忆和官方插件化入口；`reverse-skill` 的 +1,320 新增 stars 说明“面向编码 Agent 的专业技能包”开始成为独立分发形态。语音与 3D 多模态同步升温：Hugging Face `speech-to-speech` 主打本地语音 Agent，`TRELLIS.2` 将 3D 生成与结构化潜空间结合，显示开源社区正在快速复制多模态能力。主题搜索中 RAG/记忆赛道头部项目持续高星，说明“长期记忆 + 检索增强”仍是企业级 Agent 落地的刚需。与此同时，微软多门入门课程依旧在 Trending 上获得高日增，反映开发者对新模型、新框架的学习需求仍在膨胀。

## 四、社区关注热点

- **Agent 记忆与上下文工程**：`mem0`、`claude-mem`、`TencentDB-Agent-Memory` 将记忆变成跨会话、跨团队的通用层，可能是下一阶段 Agent 应用的胜负手。
- **长时任务 Agent harness**：`deer-flow` 将沙箱、工具、子代理、消息网关组合起来，适合研究复杂任务自动化的开发者重点关注。
- **语音交互本地化**：`speech-to-speech` 与 `voice-pro` 让开发者无需昂贵 API 即可搭建 TTS、声音克隆与语音 Agent。
- **Copilot 生态开放**：`github/copilot-sdk` 提供官方多平台集成路径，第三方应用接入 Copilot Agent 的工程成本将显著下降。
- **生成式 3D**：`microsoft/TRELLIS.2` 代表 3D AIGC 的新方法，值得 3D 资产生成、游戏、XR 方向开发者跟踪。

---
*本日报由 [agents-radar](https://github.com/huang-yi-dae/agents-radar) 自动生成。*