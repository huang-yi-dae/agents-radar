# AI 开源趋势日报 2026-07-31

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-07-31 03:23 UTC

---

# AI 开源趋势日报（2026-07-31）

## 筛选说明
- 从 Trending 榜单 14 个仓库中筛出 **6 个 AI/ML 明确相关项目**：`speech-to-speech`、`AI-For-Beginners`、`openwork`、`last30days-skill`、`chrome-devtools-mcp`、`ECC`。
- 已略去 `PowerToys`、`Ansible`、`Jenkins`、`ASP.NET Core`、`Baileys`、`pascalorg/editor`、`tuicr` 以及 `awesome-systematic-trading` 等非 AI 或非明确 AI 项目。
- 主题搜索结果中，重点纳入与今日 Agent/RAG/LLM 趋势强相关的项目；`Airflow`、`Julia` 等通用工程/语言项目未选为代表项。

## 今日速览
今日 GitHub AI 趋势明显向 **Agent 基础设施**集中：Trending 上增长最快的项目几乎都是 agent harness / agent skill 类型，`openwork` 今日 +915、`ECC` +804、`speech-to-speech` +628。**RAG 赛道**正在从“向量库”走向“图 + 记忆 + 压缩”：Graphify、claude-mem、mem0 这类持久上下文项目在高星池中占据重要位置，headroom、caveman 则把 token 成本优化变成独立卖点。**Ollama** 已支持 Kimi-K2.6、GLM-5.2、DeepSeek、Qwen 等最新开源模型，本地推理生态更新紧跟模型发布节奏。整体上，社区正从“聊天机器人”转向务实、可复用、低成本的 **Agent 工程化链路**。

## 各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具、CLI）
- [huggingface/transformers](https://github.com/huggingface/transformers) — ⭐163,187  
  Hugging Face 核心模型框架，覆盖文本、视觉、语音与多模态模型的训练和推理。

- [ollama/ollama](https://github.com/ollama/ollama) — ⭐177,358  
  本地 LLM 运行工具，现已支持 Kimi-K2.6、GLM-5.2、DeepSeek、Qwen、gpt-oss 等最新开源模型。

- [ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp) — 今日 +80（总量未披露）  
  通过 MCP 向编码 Agent 暴露 Chrome DevTools 能力，补齐浏览器调试与自动化关键一环。

- [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) — ⭐158,401  
  为 LLM 与 Agent 提供规模化网页搜索、抓取和交互 API。

- [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) — ⭐63,442  
  在到达 LLM 前压缩工具输出、日志、文件和 RAG chunks，最多可减少 60–95% token。

- [The-Pocket/PocketFlow](https://github.com/The-Pocket/PocketFlow) — ⭐11,072  
  100 行代码的极简 LLM 框架，主打“让 Agent 构建 Agent”。

- [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig) — ⭐8,107  
  Rust 生态的模块化 LLM 应用框架，代表新兴 Rust AI 技术栈。

### 🤖 AI 智能体/工作流
- [affaan-m/ECC](https://github.com/affaan-m/ECC) — ⭐236,284（今日 +804）  
  Agent harness 性能优化系统，为 Claude Code、Codex、OpenCode、Cursor 等提供技能、记忆、安全与研发优化。

- [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) — ⭐222,951  
  “The agent that grows with you”，当前星标最高的开源 Agent harness 之一。

- [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) — ⭐185,755  
  开源自治 Agent 的元老项目，至今仍是社区构建通用 Agent 的重要参考。

- [langchain-ai/langchain](https://github.com/langchain-ai/langchain) — ⭐143,052  
  主流 Agent engineering 平台，是构建 LLM Agent 与 RAG 应用的基础层。

- [langgenius/dify](https://github.com/langgenius/dify) — ⭐150,848  
  一站式构建 Agentic workflow 与 RAG pipeline 的协作式开源平台。

- [browser-use/browser-use](https://github.com/browser-use/browser-use) — ⭐107,351  
  让 AI Agent 能直接操作网站，是网页自动化的关键开源项目。

- [different-ai/openwork](https://github.com/different-ai/openwork) — 今日 +915（总量未披露）  
  Claude Cowork 的开源替代，基于 opencode，主打“24/7 协同工作 Agent”。

- [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill) — 今日 +378（总量未披露）  
  AI Agent 技能，可跨 Reddit、X、YouTube、HN、Polymarket 研究话题并生成 grounded 总结。

### 📦 AI 应用（具体应用产品、垂直场景解决方案）
- [open-webui/open-webui](https://github.com/open-webui/open-webui) — ⭐147,399  
  用户友好的本地 AI 交互界面，支持 Ollama、OpenAI API 等，是自托管 LLM 应用层热门选择。

- [f/prompts.chat](https://github.com/f/prompts.chat) — ⭐166,541  
  前身是 Awesome ChatGPT Prompts，社区驱动的提示词分享与自托管平台。

- [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) — ⭐100,680  
  基于 AI 大模型与自动化工作流，一键生成高清短视频的典型垂直应用。

- [Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm) — ⭐64,143  
  Local-first 的全能 AI 工作台，强调“拥有自己的智能”。

- [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) — ⭐59,627  
  LLM 驱动的多市场股票分析系统，支持多源行情、实时新闻、决策看板与自动推送。

- [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) — ⭐49,175  
  AI 生产力工作室，包含智能聊天、自主 Agent 与 300+ 助手。

- [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) — ⭐42,055  
  将文档或主题转化为真正原生 PowerPoint，支持动画、图表、音频旁白与自定义模板。

- [huggingface/speech-to-speech](https://github.com/huggingface/speech-to-speech) — 今日 +628（总量未披露）  
  Hugging Face 推出的本地语音 Agent 构建库，用开源模型实现端到端语音交互。

### 🧠 大模型/训练（模型权重、训练框架、微调工具）
- [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow) — ⭐196,617  
  经典开源机器学习框架，仍是 AI 基础设施的重要底座。

- [pytorch/pytorch](https://github.com/pytorch/pytorch) — ⭐102,080  
  动态神经网络框架，当前绝大多数 LLM 训练与微调的事实标准之一。

- [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) — ⭐100,192  
  从零实现 ChatGPT 类 LLM 的 PyTorch 教学项目，适合深入理解训练原理。

- [open-compass/opencompass](https://github.com/open-compass/opencompass) — ⭐7,248  
  LLM 评测平台，支持 Llama、Qwen、GLM、GPT-4、Claude 等 100+ 数据集。

- [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) — ⭐4,427  
  面向系统工程师的 LLM 推理服务课程，在 Apple Silicon 上构建微型 vLLM + Qwen。

- [llm-jp/awesome-japanese-llm](https://github.com/llm-jp/awesome-japanese-llm) — ⭐1,422  
  日本语 LLM 生态汇总，反映多语言开源模型社区持续活跃。

### 🔍 RAG/知识库（向量数据库、检索增强、知识管理）
- [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) — ⭐99,203  
  把代码库、文档、SQL Schema、PDF 转成可查询知识图谱，主打“无向量库”的确定性 RAG。

- [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) — ⭐89,095  
  为各类 Agent 提供跨会话持久记忆，自动压缩并注入相关上下文。

- [infiniflow/ragflow](https://github.com/infiniflow/ragflow) — ⭐86,461  
  领先的开源 RAG 引擎，融合 Agent 能力，为 LLM 构建高质量上下文层。

- [mem0ai/mem0](https://github.com/mem0ai/mem0) — ⭐62,165  
  AI Agent 的通用记忆层，解决长期会话与个性化记忆问题。

- [run-llama/llama_index](https://github.com/run-llama/llama_index) — ⭐51,249  
  文档 Agent 与 OCR 平台，连接私有数据与大模型的主流 RAG 框架。

- [milvus-io/milvus](https://github.com/milvus-io/milvus) — ⭐45,436  
  云原生高性能向量数据库，专为可扩展向量 ANN 搜索设计。

- [qdrant/qdrant](https://github.com/qdrant/qdrant) — ⭐33,686  
  高吞吐向量数据库与向量搜索引擎，面向下一代 AI 应用。

- [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) — ⭐34,926  
  “Vectorless”的文档索引方案，基于推理式 RAG，代表检索技术的新探索方向。

## 趋势信号分析
今日最清晰的信号是 **“Agent 基础设施”成为社区中心**：ECC、openwork 等 agent harness 类项目横扫 Trending，Chrome DevTools MCP 也在为编码 Agent 补齐浏览器调试能力。与此同时，**RAG 赛道正从单纯向量库向“图 + 记忆 + 压缩”演进**：Graphify 用知识图谱替代向量存储，claude-mem 和 mem0 强调跨会话记忆，headroom 与 caveman 主打 token 压缩。语音智能体和本地模型同样出现新动作：Hugging Face speech-to-speech 让本地语音 Agent 门槛下降，Ollama 已支持 Kimi-K2.6、GLM-5.2、DeepSeek、Qwen 等最新开源模型。另一个值得关注的趋势是 **“为 Agent 而生的 CLI/MCP 工具”大量出现**，从 Google Workspace CLI 到 Chrome DevTools MCP，Agent 正在成为新的应用入口。整体来看，社区已经从“聊天机器人”转向务实构建可复用、低成本的 Agent 工程化链路。

## 社区关注热点
- **Agent Harness 性能优化**：重点关注 [ECC](https://github.com/affaan-m/ECC)（⭐236k）和 [openwork](https://github.com/different-ai/openwork)（今日 +915）。开发者正在涌入“统一管理多个 Agent CLI”的底座型项目。
- **跨会话记忆与 RAG**：关注 [claude-mem](https://github.com/thedotmack/claude-mem)、[mem0](https://github.com/mem0ai/mem0)、[Graphify](https://github.com/Graphify-Labs/graphify)、[cognee](https://github.com/topoteretes/cognee)。它们把记忆和知识图谱做成 Agent 的一等公民。
- **浏览器自动化 / MCP**：[Chrome DevTools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp) 今日 +80，与 [browser-use](https://github.com/browser-use/browser-use)（⭐107k）共同推动编码 Agent 直接控制浏览器。
- **本地语音智能体**：[Hugging Face speech-to-speech](https://github.com/huggingface/speech-to-speech) 今日 +628，本地语音 Agent 正在成为开源 AI 新的热点方向。
- **Token 成本优化**：[headroom](https://github.com/headroomlabs-ai/headroom) 声称最高减少 95% JSON token，[caveman](https://github.com/JuliusBrussee/caveman) 通过极简输出减少 65% token；成本敏感型 Agent 工具开始形成独立赛道。

---
*本日报由 [agents-radar](https://github.com/huang-yi-dae/agents-radar) 自动生成。*