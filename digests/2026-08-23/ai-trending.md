# 开源 AI 趋势日报 2026-08-23

> 生成时间: 2026-08-23 02:30 (GMT+8)
> 数据来源：GitHub Trending（每日榜）+ `gh search repos` 6 个 AI 主题（按 stars 排序，7 天窗口）
> 本日报由 agents-radar 本地自动化生成，所有撰写由执行代理人工完成，未调用任何外部大模型 API。

---

## 一、GitHub Trending 每日飙升榜（2026-08-23）

> 说明：本次抓取时 GitHub Trending 页面仍未对外暴露「当日新增 Star」数值（连续第二日，疑为未登录视图/版式变更），故下表仅列出入榜项目与简介，不含 star 增量。排名按页面原始顺序。

| # | 项目 | 简介 |
|---|------|------|
| 1 | [openai/codex](https://github.com/openai/codex) | 运行在终端里的轻量编码 agent |
| 2 | [mattpocock/skills](https://github.com/mattpocock/skills) | 「给真实工程师的 Skills」，直接取自作者 `.agents` 目录 |
| 3 | [affaan-m/ECC](https://github.com/affaan-m/ECC) | agent harness 性能优化系统：Skills / instincts / memory / security / research-first，适配 Claude Code、Codex、OpenCode、Cursor |
| 4 | [obra/superpowers](https://github.com/obra/superpowers) | 可落地的 agentic skills 框架与软件开发方法论 |
| 5 | [Wei-Shaw/sub2api](https://github.com/Wei-Shaw/sub2api) | 一站式开源中转服务，让 Claude / OpenAI / Gemini / Grok 订阅统一接入，支持拼车共享分摊成本 |
| 6 | [makeplane/plane](https://github.com/makeplane/plane) | 开源 Jira / Linear / Monday / ClickUp 替代 |
| 7 | [n8n-io/n8n](https://github.com/n8n-io/n8n) | 带原生 AI 能力的 fair-code 工作流自动化平台，400+ 集成 |
| 8 | [anthropics/claude-code](https://github.com/anthropics/claude-code) | 终端里的 agentic 编码工具，理解代码库并执行日常任务 |
| 9 | [AprilNEA/OpenLogi](https://github.com/AprilNEA/OpenLogi) | 原生、本地优先的 Logitech Options+ 替代，Rust 编写，无账号无遥测 |
| 10 | [modular/modular](https://github.com/modular/modular) | Modular 平台（含 MAX 与 Mojo） |
| 11 | [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) | 单个 CLAUDE.md 文件改善 Claude Code 行为，源自 Karpathy 对 LLM 编码陷阱的观察 |
| 12 | [mahlernim/google-timeline-visualizer](https://github.com/mahlernim/google-timeline-visualizer) | 用 Google 位置历史可视化全年旅行轨迹 |
| 13 | [ripienaar/free-for-dev](https://github.com/ripienaar/free-for-dev) | 对 devops/infra 有价值的免费额度 SaaS/PaaS/IaaS 清单 |
| 14 | [microsoft/TypeScript](https://github.com/microsoft/TypeScript) | TypeScript 语言本体 |
| 15 | [cursor/plugins](https://github.com/cursor/plugins) | Cursor 插件规范与官方插件 |
| 16 | [PostHog/posthog](https://github.com/PostHog/posthog) | 自驱动产品平台（AI 可观测、分析、会话回放、特性开关等） |
| 17 | [Tencent/AI-Infra-Guard](https://github.com/Tencent/AI-Infra-Guard) | 全栈 AI 红队平台：Agent Scan / Skills Scan / MCP scan / AI Infra scan |

**今日榜单最强信号：Codex 登顶，Claude Code 同榜第 8。** 这是三份日报罕见的三方共振——Trending 第 1 是 `openai/codex`，HN 今日热度第 1 是「A week of using Codex more than Claude」（94👍），而 Claude Code 侧今日最高热度 issue [#77136](https://github.com/anthropics/claude-code/issues/77136)（343👍）是对模型口头习惯的集体吐槽。**社区注意力正在从 Claude Code 向 Codex 迁移，且这一迁移同时体现在 star 榜、讨论榜和情绪面三个维度上。**

**第二个信号：Skills / harness 元层占据 5 席。** #2 mattpocock/skills、#3 affaan-m/ECC、#4 obra/superpowers、#11 multica-ai/andrej-karpathy-skills、#15 cursor/plugins——**前四名里有三个是「给 agent 装能力」的项目，而不是 agent 本身**。值得注意的是 #11 的形态极端到只有一个 `CLAUDE.md` 文件却能上榜，说明**当前最稀缺的不是工具，而是"怎么让模型少犯错"的经验沉淀**。

**第三个信号：成本焦虑显性化。** #5 `Wei-Shaw/sub2api` 做的是「订阅统一接入 + 拼车共享分摊成本」，#13 `ripienaar/free-for-dev` 是免费额度清单。这与今日 CLI 日报中 GPT-5.6 Sol 降价 20%、以及 HN 上关于「A/B 测试降低推理强度」的争议属于同一背景——**用户对 agent 的月度支出已经到了要专门做工具去摊平的程度。**

## 二、六大 AI 主题搜索热度（按 stars，Top 15）

### 1. AI Agent 框架
- [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) ⭐234,323 — The agent that grows with you
- [shareAI-lab/learn-claude-code](https://github.com/shareAI-lab/learn-claude-code) ⭐74,949 — 从 0 到 1 构建类 claude code 的 agent harness
- [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) ⭐74,085 — 给 AI agent 全网的眼睛（Twitter / Reddit / YouTube / GitHub / B 站 / 小红书），一个 CLI 零 API 费用
- [thedaviddias/Front-End-Checklist](https://github.com/thedaviddias/Front-End-Checklist) ⭐73,609 — 现代 Web 开发必备清单（人类与 AI agent 通用）
- [santifer/career-ops](https://github.com/santifer/career-ops) ⭐67,764 — 开源 AI 求职：扫描招聘站点、A–F 评分体系、简历定制与投递追踪，可本地跑在各 AI 编码 CLI
- [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) ⭐63,624 — LLM 驱动的多市场股票智能分析（多源行情、实时新闻、决策看板、自动推送）
- [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) ⭐50,919 — AI 生产力工作室，300+ 助手统一接入前沿 LLM
- [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) ⭐48,617 — AI 把文档或主题变成真正的原生 PPT（原生形状、转场动画、数据图表、语音旁白）
- [HKUDS/nanobot](https://github.com/HKUDS/nanobot) ⭐47,283 — 超轻量、自托管的个人 AI agent 框架（WebUI/工具/记忆/MCP/多 agent 工作流）
- [zhayujie/CowAgent](https://github.com/zhayujie/CowAgent) ⭐46,632 — 开源超级 AI 助手与 Agent Harness，带记忆与知识自进化
- [siyuan-note/siyuan](https://github.com/siyuan-note/siyuan) ⭐45,931 — 开源、隐私优先、自托管的知识工作空间
- [bojieli/ai-agent-book](https://github.com/bojieli/ai-agent-book) ⭐40,913 — 《深入理解 AI Agent：设计原理与工程实践》全书正文 + PDF + 配套代码
- [Hmbown/CodeWhale](https://github.com/Hmbown/CodeWhale) ⭐40,841 — Rust 编写的终端开源编码 agent
- [CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit) ⭐36,960 — Agent 与 Generative UI 的前端栈（AG-UI 协议作者）
- [esengine/DeepSeek-Reasonix](https://github.com/esengine/DeepSeek-Reasonix) ⭐35,032 — DeepSeek 原生的终端编码 agent，围绕前缀缓存稳定性设计

### 2. 大模型（LLM）
- [affaan-m/ECC](https://github.com/affaan-m/ECC) ⭐242,087 — agent harness 性能优化系统
- [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) ⭐234,323 — The agent that grows with you
- [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) ⭐186,764 — 人人可用的自主 AI
- [ollama/ollama](https://github.com/ollama/ollama) ⭐179,192 — 一键跑起 Kimi-K2.6 / GLM-5.2 / MiniMax / DeepSeek / gpt-oss / Qwen / Gemma
- [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) ⭐170,855 — 大规模搜索/抓取/交互 Web 的上下文 API
- [f/prompts.chat](https://github.com/f/prompts.chat) ⭐167,752 — Awesome ChatGPT Prompts 社区共享（可自托管）
- [huggingface/transformers](https://github.com/huggingface/transformers) ⭐164,339 — 文本/视觉/音频/多模态 SOTA 模型框架
- [langgenius/dify](https://github.com/langgenius/dify) ⭐153,205 — Agentic 工作流与 RAG 管线协作平台
- [open-webui/open-webui](https://github.com/open-webui/open-webui) ⭐149,579 — 用户友好的 AI 界面
- [langchain-ai/langchain](https://github.com/langchain-ai/langchain) ⭐144,777 — agent 工程平台
- [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) ⭐114,563 — AI 一键生成高清短视频
- [browser-use/browser-use](https://github.com/browser-use/browser-use) ⭐110,116 — 让网站对 AI agent 可用，轻松自动化线上任务
- [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) ⭐109,501 — 把代码库（含文档/SQL schema/配置/PDF）变成可查询知识图谱，作为 `/graphify` skill 供各 CLI 使用
- [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) ⭐108,073 — 让 AI agent 像「屋里最懒的资深工程师」一样思考：最好的代码是你没写的代码
- [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) ⭐103,224 — 从零逐步用 PyTorch 实现类 ChatGPT LLM

### 3. RAG 检索增强生成
- [langgenius/dify](https://github.com/langgenius/dify) ⭐153,205 — Agentic 工作流与 RAG 管线
- [open-webui/open-webui](https://github.com/open-webui/open-webui) ⭐149,579 — 用户友好的 AI 界面
- [langchain-ai/langchain](https://github.com/langchain-ai/langchain) ⭐144,777 — agent 工程平台
- [Shubhamsaboo/awesome-llm-apps](https://github.com/Shubhamsaboo/awesome-llm-apps) ⭐133,588 — 100+ AI Agents / Agent Skills / RAG 应用
- [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) ⭐109,501 — 代码库转可查询知识图谱（本地确定性解析）
- [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) ⭐91,519 — 跨会话持久上下文：记录 agent 全过程、AI 压缩、按需注入未来会话
- [infiniflow/ragflow](https://github.com/infiniflow/ragflow) ⭐89,036 — 领先的开源 RAG 引擎，融合 Agent 能力
- [PaddlePaddle/PaddleOCR](https://github.com/PaddlePaddle/PaddleOCR) ⭐88,110 — 轻量 OCR 工具包，支持 100+ 语言，桥接图像/PDF 与 LLM
- [dair-ai/Prompt-Engineering-Guide](https://github.com/dair-ai/Prompt-Engineering-Guide) ⭐77,693 — 提示工程/上下文工程/RAG/AI Agents 指南
- [datawhalechina/hello-agents](https://github.com/datawhalechina/hello-agents) ⭐74,217 — 《从零开始构建智能体》教程
- [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) ⭐67,179 — 在工具输出/日志/文件/RAG 块进入 LLM 前压缩：编码 agent 省 20% token，JSON 省 60–95%
- [Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm) ⭐65,052 — 本地优先的强力 agent 体验
- [mem0ai/mem0](https://github.com/mem0ai/mem0) ⭐63,821 — AI Agent 的通用记忆层
- [pathwaycom/llm-app](https://github.com/pathwaycom/llm-app) ⭐59,005 — RAG / AI 管线与企业搜索云模板
- [FlowiseAI/Flowise](https://github.com/FlowiseAI/Flowise) ⭐55,383 — 可视化构建 AI Agent

### 4. 向量数据库
- [Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm) ⭐65,052 — 本地优先的 agent 体验
- [meilisearch/meilisearch](https://github.com/meilisearch/meilisearch) ⭐59,054 — 极速搜索 API，AI 混合搜索
- [pathwaycom/llm-app](https://github.com/pathwaycom/llm-app) ⭐59,005 — RAG/AI 管线云模板
- [run-llama/llama_index](https://github.com/run-llama/llama_index) ⭐51,801 — 文档 agent 与 OCR 平台
- [milvus-io/milvus](https://github.com/milvus-io/milvus) ⭐45,736 — 高性能云原生向量数据库
- [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) ⭐35,291 — 无向量的推理式 RAG 文档索引
- [qdrant/qdrant](https://github.com/qdrant/qdrant) ⭐34,124 — 大规模向量数据库与向量搜索引擎
- [topoteretes/cognee](https://github.com/topoteretes/cognee) ⭐30,183 — 开源 AI 记忆平台（自托管知识图谱引擎）
- [NirDiamant/RAG_Techniques](https://github.com/NirDiamant/RAG_Techniques) ⭐29,174 — RAG 高级技术笔记本合集
- [weaviate/weaviate](https://github.com/weaviate/weaviate) ⭐16,746 — 开源向量数据库，向量搜索 + 结构化过滤
- [memvid/memvid](https://github.com/memvid/memvid) ⭐16,437 — 用无服务器单文件记忆层替代复杂 RAG 管线
- [alibaba/zvec](https://github.com/alibaba/zvec) ⭐15,502 — 轻量、极速的进程内向量数据库
- [langchain4j/langchain4j](https://github.com/langchain4j/langchain4j) ⭐12,929 — JVM 上的 LLM 应用库，统一 provider 与向量库 API
- [neuml/txtai](https://github.com/neuml/txtai) ⭐12,897 — 语义搜索、LLM 编排与语言模型工作流的一体化框架
- [StarTrail-org/LEANN](https://github.com/StarTrail-org/LEANN) ⭐12,827 — [MLsys2026] 节省 97% 存储的本地私有 RAG

### 5. LLM 模型
- [jingyaogong/minimind](https://github.com/jingyaogong/minimind) ⭐54,927 — 2 小时从零训练 64M 参数 LLM
- [ScrapeGraphAI/Scrapegraph-ai](https://github.com/ScrapeGraphAI/Scrapegraph-ai) ⭐29,812 — 基于 AI 的 Python 爬虫
- [The-Pocket/PocketFlow-Tutorial-Codebase-Knowledge](https://github.com/The-Pocket/PocketFlow-Tutorial-Codebase-Knowledge) ⭐12,630 — Codebase to Tutorial
- [The-Pocket/PocketFlow](https://github.com/The-Pocket/PocketFlow) ⭐11,124 — 100 行 LLM 框架，让 agent 构建 agent
- [OpenSPG/KAG](https://github.com/OpenSPG/KAG) ⭐9,004 — 逻辑形式引导的推理与检索框架
- [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig) ⭐8,358 — Rust 构建模块化可扩展 LLM 应用
- [open-compass/opencompass](https://github.com/open-compass/opencompass) ⭐7,327 — LLM 评测平台，100+ 数据集
- [InternLM/InternLM](https://github.com/InternLM/InternLM) ⭐7,266 — InternLM 系列官方发布
- [Eigenwise/atomic-agents](https://github.com/Eigenwise/atomic-agents) ⭐6,191 — 原子化构建 AI agent
- [gluonfield/enchanted](https://github.com/gluonfield/enchanted) ⭐5,998 — iOS/macOS 私有自托管模型聊天客户端
- [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) ⭐4,513 — 在 Apple Silicon 上学 LLM 推理系统：造一个小 vLLM + Qwen
- [verazuo/jailbreak_llms](https://github.com/verazuo/jailbreak_llms) ⭐3,791 — [CCS'24] 15,140 条 ChatGPT prompt 数据集（含 1,405 条越狱 prompt）
- [ridgerchu/matmulfreellm](https://github.com/ridgerchu/matmulfreellm) ⭐3,088 — 无矩阵乘法语言模型实现
- [InternLM/InternLM-XComposer](https://github.com/InternLM/InternLM-XComposer) ⭐2,925 — 长时流式视音频交互的多模态系统
- [JIA-Lab-research/LISA](https://github.com/JIA-Lab-research/LISA) ⭐2,671 — 用大语言模型做推理式分割

### 6. 机器学习
- [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow) ⭐197,323 — 人人可用的开源机器学习框架
- [f/prompts.chat](https://github.com/f/prompts.chat) ⭐167,752 — Awesome ChatGPT Prompts
- [huggingface/transformers](https://github.com/huggingface/transformers) ⭐164,339 — SOTA 机器学习模型框架
- [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) ⭐103,224 — 从零逐步实现类 ChatGPT LLM
- [pytorch/pytorch](https://github.com/pytorch/pytorch) ⭐102,543 — 带 GPU 加速的张量与动态神经网络
- [microsoft/ML-For-Beginners](https://github.com/microsoft/ML-For-Beginners) ⭐89,682 — 12 周 26 课 52 测验的经典机器学习
- [Developer-Y/cs-video-courses](https://github.com/Developer-Y/cs-video-courses) ⭐83,148 — 带视频讲座的 CS 课程清单
- [mlabonne/llm-course](https://github.com/mlabonne/llm-course) ⭐81,915 — LLM 学习路线与 Colab 笔记本
- [netdata/netdata](https://github.com/netdata/netdata) ⭐80,261 — 最快的 AI 驱动全栈可观测
- [d2l-ai/d2l-zh](https://github.com/d2l-ai/d2l-zh) ⭐79,877 — 《动手学深度学习》中文版
- [tesseract-ocr/tesseract](https://github.com/tesseract-ocr/tesseract) ⭐76,116 — Tesseract 开源 OCR 引擎
- [binhnguyennus/awesome-scalability](https://github.com/binhnguyennus/awesome-scalability) ⭐73,459 — 大规模系统的可扩展性/可靠性/性能模式
- [OpenBB-finance/OpenBB](https://github.com/OpenBB-finance/OpenBB) ⭐72,154 — 面向分析师、量化与 AI agent 的开放数据平台
- [labmlai/annotated_deep_learning_paper_implementations](https://github.com/labmlai/annotated_deep_learning_paper_implementations) ⭐67,331 — 60+ 深度学习论文实现与逐行注释
- [scikit-learn/scikit-learn](https://github.com/scikit-learn/scikit-learn) ⭐67,010 — Python 机器学习库

## 三、24 小时 Star 增量榜（与昨日快照对比）

> 说明：本表由 agents-radar 自身连续两日抓取的 star 快照相减得出，可视为「过去 24h 真实新增」。仅统计昨日日报中已出现的项目。

| 排名 | 项目 | 昨日 ★ | 今日 ★ | 24h 增量 |
|------|------|--------|--------|---------|
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

**读法**：前五名里有四个是「agent 能力/上下文供给」类项目——career-ops（把 agent 用在求职）、hermes-agent、graphify（代码库转知识图谱）、ECC（harness 优化），只有 firecrawl 属于纯数据抓取基础设施。**增量的钱在往"怎么把 agent 用起来"和"给 agent 喂什么上下文"两个方向走，而不是往模型本体走。** 相比之下 pytorch（+26）、transformers（+29）、milvus（+8）、qdrant（+9）这些传统 ML/向量库的增速已经是前者的十分之一量级。

## 四、趋势小结

- **Codex 与 Claude Code 同日登榜，Codex 居首。** 叠加 HN 头条与 Claude Code 侧 343👍 的吐槽 issue，**这是今日最值得记录的生态位变化信号**——不是某一个榜的偶然，而是 star、讨论、情绪三个独立维度同时指向同一方向。
- **「Skills / harness 元层」已成为独立赛道且极度拥挤。** Trending 前四有三席（mattpocock/skills、affaan-m/ECC、obra/superpowers），第 11 名是单个 `CLAUDE.md` 文件，第 15 名是 cursor/plugins。**当"经验沉淀"本身可以成为爆款仓库，说明模型能力已不是瓶颈，怎么约束模型才是。**
- **成本工程正式浮出水面。** sub2api（订阅中转/拼车）+ free-for-dev（免费额度清单）+ headroom（进 LLM 前压缩 token，省 20–95%）+ DeepSeek-Reasonix（围绕前缀缓存稳定性设计）——**四个项目从四个角度砍同一笔账单**，与 CLI 侧 GPT-5.6 Sol 降价 20% 构成供需两端的同一个故事。
- **记忆/上下文赛道持续加厚。** claude-mem（+89）、graphify（+405）、mem0、cognee、memvid、LEANN、zvec 同屏，且 graphify 的增量排到全榜第 3。**这与 OpenClaw 生态日报里"性能债 = 重复重建"、CLI 侧"上下文压缩"完全同源：上下文是当前最贵的资源，围绕它的工具化正在加速。**
- **安全治理连续在榜。** Tencent/AI-Infra-Guard 连续第二日入榜（Agent Scan / Skills Scan / MCP scan），与 Zeroclaw 的身份基础设施改造、Moltis 的 fail-closed hook、CoPaw 的第五安全层形成呼应——**"agent 有真实执行权"的风险共识已经从框架内部扩散到工具链外部。**
- **传统 ML 基础设施增速趋缓。** pytorch +26 / transformers +29 / milvus +8 / qdrant +9，与 agent 层项目的 +400 量级差了一个数量级。**注意力与新增关注度几乎全部集中在应用与 harness 层。**

---

*本日报由 [agents-radar](https://github.com/huang-yi-dae/agents-radar) 自动生成，所有内容基于 GitHub 公开数据实时抓取并由执行代理人工撰写，未调用任何外部大模型。*
