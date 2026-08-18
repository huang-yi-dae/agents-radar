# AI 开源趋势日报 2026-08-18

> 数据来源: GitHub Trending + GitHub Search API（含 AI 与大数据 / 数据分析 / 数据挖掘趋势） | 生成时间: 2026-08-18 01:01 UTC

---

# AI 开源趋势日报

**日期：2026-08-18**


## 一、今日速览

今日 AI 开源生态呈现出显著的 **“AI 安全与红队测试”** 爆发态势：`Anthropic-Cybersecurity-Skills` 带来 817 个结构化网络安全技能，而 `strix` 以开源 AI 渗透测试工具身份跻身 Trending，显示安全正在成为 AI 智能体落地的刚需层。与此同时，**AI 智能体记忆（Memory）赛道持续升温**，`ai-memory` 专注解决长时记忆与多 Agent 厂商之间的交接问题。值得关注的是，Rust 在 AI 基础设施中的地位进一步巩固——`nautilus_trader`、`ai-memory`、`llmfit` 三个上榜项目均以 Rust 为核心语言。此外，**本地化/端侧 AI 推理**继续拓展边界，`omlx` 专为 Apple Silicon 优化 LLM 推理，`llmfit` 则帮助用户在本地硬件上快速筛选可用模型。AI 求职助手 `career-ops` 的高热度则表明 AI Agent 正在快速渗透垂直场景应用。

## 二、各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具、CLI）

- [**usestrix/strix**](https://github.com/usestrix/strix) ⭐ 今日 +598 | 开源 AI 渗透测试工具，主动寻找并修复应用漏洞，标志着 AI 安全从理论走向工程化。
- [**AlexsJones/llmfit**](https://github.com/AlexsJones/llmfit) ⭐ 今日 +198 | 一条命令即可在本地硬件上筛选数百个模型与提供商中可运行者，解决端侧模型选型痛点。
- [**jundot/omlx**](https://github.com/jundot/omlx) ⭐ 今日 +78 | 为 Apple Silicon 打造的 LLM 推理服务器，支持连续批处理与 SSD 缓存，通过 macOS 菜单栏即可管理。
- [**vllm-project/vllm**](https://github.com/vllm-project/vllm) ⭐ 89,278 | 高吞吐、内存高效的 LLM 推理与服务引擎，大模型服务端的行业标准。
- [**0xPlaygrounds/rig**](https://github.com/0xPlaygrounds/rig) ⭐ 8,302 | 用 Rust 构建模块化、可扩展的 LLM 应用，Rust 在 LLM 工程领域的重要布局。
- [**open-compass/opencompass**](https://github.com/open-compass/opencompass) ⭐ 7,311 | 支持 100+ 数据集的 LLM 评测平台，覆盖主流开源与闭源模型。

### 🤖 AI 智能体/工作流（Agent 框架、自动化、多智能体）

- [**akitaonrails/ai-memory**](https://github.com/akitaonrails/ai-memory) ⭐ 今日 +207 | 为 Agent 编码 CLI 提供长期记忆，并支持不同 Agent 厂商之间的高效交接，直击多 Agent 协作的核心痛点。
- [**mukul975/Anthropic-Cybersecurity-Skills**](https://github.com/mukul975/Anthropic-Cybersecurity-Skills) ⭐ 今日 +198 | 817 个结构化网络安全技能，映射至 MITRE ATT&CK、NIST CSF 2.0 等 6 大框架，兼容 Claude Code、Copilot、Cursor 等 20+ 平台。
- [**santifer/career-ops**](https://github.com/santifer/career-ops) ⭐ 今日 +218 | 开源 AI 求职助手：扫描招聘平台、用 A-F 评分制评估职位、定制简历并追踪申请，完全在本地 AI 编程 CLI 中运行。
- [**HKUDS/nanobot**](https://github.com/HKUDS/nanobot) ⭐ 47,105 | 超轻量、可自托管的个人 AI Agent 框架，支持 WebUI、工具调用、记忆、MCP 与多智能体工作流。
- [**zhayujie/CowAgent**](https://github.com/zhayujie/CowAgent) ⭐ 46,533 | 开源超级 AI 助手与 Agent 框架（前身 chatgpt-on-wechat），支持多模型、多平台，一行命令安装。
- [**CherryHQ/cherry-studio**](https://github.com/CherryHQ/cherry-studio) ⭐ 50,668 | AI 生产力工作室，集成智能聊天、自主 Agent 与 300+ 助手，统一接入前沿 LLM。
- [**esengine/DeepSeek-Reasonix**](https://github.com/esengine/DeepSeek-Reasonix) ⭐ 34,683 | 面向终端的 DeepSeek 原生 AI 编程 Agent，围绕 prefix-cache 稳定性设计，可长期驻留运行。

### 📦 AI 应用（具体应用产品、垂直场景解决方案）

- [**harry0703/MoneyPrinterTurbo**](https://github.com/harry0703/MoneyPrinterTurbo) ⭐ 今日 +1189（总量 106,045）| 根据主题或关键词一键生成高清短视频，AI 内容创作领域持续霸榜。
- [**666ghj/BettaFish**](https://github.com/666ghj/BettaFish) ⭐ 42,012 | 人人可用的多 Agent 舆情分析助手，从零实现不依赖框架，打破信息茧房、辅助决策。
- [**ZhuLinsen/daily_stock_analysis**](https://github.com/ZhuLinsen/daily_stock_analysis) ⭐ 63,181 | LLM 驱动的多市场股票智能分析系统，支持多源行情、实时新闻、决策看板与自动推送，零成本定时运行。
- [**hugohe3/ppt-master**](https://github.com/hugohe3/ppt-master) ⭐ 47,499 | AI 将文档或主题转化为原生 PowerPoint 演示文稿，支持原生形状、动画、图表与音频旁白。
- [**Panniantong/Agent-Reach**](https://github.com/Panniantong/Agent-Reach) ⭐ 72,545 | 让 AI Agent 读取并搜索全网（Twitter、Reddit、YouTube、GitHub、B站、小红书），一个 CLI、零 API 费用。

### 🧠 大模型/训练（模型权重、训练框架、微调工具）

- [**NousResearch/hermes-agent**](https://github.com/NousResearch/hermes-agent) ⭐ 232,040 | “与你一起成长的 Agent”，NousResearch 在 Agent 与模型协同方向的最新旗舰。
- [**AarambhDevHub/aarambh-studio**](https://github.com/AarambhDevHub/aarambh-studio) ⭐ 78 | 纯 Rust + Candle 从零构建的 Decoder-only LLM，支持 Gated DeltaNet、稀疏注意力、细粒度 MoE，创新性强。
- [**skyzh/tiny-llm**](https://github.com/skyzh/tiny-llm) ⭐ 4,497 | 面向系统工程师的 Apple Silicon LLM 推理学习项目，从零构建微型 vLLM + Qwen。
- [**huggingface/transformers**](https://github.com/huggingface/transformers) ⭐ 164,196 | 文本、视觉、音频与多模态 SOTA 模型的定义框架，训练与推理双支持。

### 🔍 RAG/知识库（向量数据库、检索增强、知识管理）

- [**Graphify-Labs/graphify**](https://github.com/Graphify-Labs/graphify) ⭐ 107,522 | 将代码库、文档、SQL Schema、配置与 PDF 转化为可查询的知识图谱，无向量库依赖，提供本地确定性 AST 解析。
- [**thedotmack/claude-mem**](https://github.com/thedotmack/claude-mem) ⭐ 91,022 | 跨会话持久上下文：捕获 Agent 会话内容、AI 压缩并注入未来会话，兼容 Claude Code、Codex、Gemini、Copilot 等。
- [**infiniflow/ragflow**](https://github.com/infiniflow/ragflow) ⭐ 88,684 | 领先的开源 RAG 引擎，融合前沿 RAG 与 Agent 能力，为 LLM 构建优越上下文层。
- [**langgenius/dify**](https://github.com/langgenius/dify) ⭐ 152,725 | 在一个协作工作区中构建 Agentic 工作流与 RAG 管线，支持云、VPC 或自托管。
- [**mem0ai/mem0**](https://github.com/mem0ai/mem0) ⭐ 63,467 | AI Agent 的通用记忆层，为智能体提供跨会话的持久化记忆能力。
- [**VectifyAI/PageIndex**](https://github.com/VectifyAI/PageIndex) ⭐ 35,223 | 面向无向量、基于推理的 RAG 文档索引方案，重新思考 RAG 的实现路径。

## 三、趋势信号分析

**安全与红队测试成为今日最强劲的爆发点。** `Anthropic-Cybersecurity-Skills` 以 817 个结构化技能覆盖六大安全框架并兼容 20+ Agent 平台，`strix` 定位 AI 渗透测试工具，二者共同指向一个明确信号：随着 Agent 能力增强，AI 安全正在从外围工具演变为内生基础设施。**Agent 记忆与上下文管理是第二大热点。** `ai-memory` 与 `claude-mem` 从不同层面解决长时记忆问题，说明社区已认识到“对话式 Agent”到“协作式 Agent”的跃迁依赖于持久记忆。**Rust 在 AI 基础设施中的渗透显著加速。** 今日 Trending 中三个 Rust 项目（`nautilus_trader`、`ai-memory`、`llmfit`）覆盖交易引擎、Agent 记忆与模型选型，加之 `rig`、`lancedb` 等长期项目，Rust 正成为高性能 AI 组件的事实选择。**本地优先（Local-first）与端侧推理持续深化**，`llmfit`、`omlx` 均面向个人硬件优化。最后，**AI Agent 垂直应用全面开花**，求职助手 `career-ops` 与短视频生成 `MoneyPrinterTurbo` 的高热度表明 Agent 正快速渗透具体职业场景。

## 四、社区关注热点

- **AI 安全技能标准化**：`Anthropic-Cybersecurity-Skills` 将安全能力拆解为可复用、跨平台的 “Skills”，开创了 Agent 安全能力分发的标准范式，建议安全与 Agent 开发者重点跟进。
- **Agent 跨厂商记忆交接**：`ai-memory` 解决的是多 Agent 协作中的“失忆”难题——这在 Claude Code、Cursor、Copilot 等多工具并用的工作流中极为迫切。
- **Rust 重写 AI 基础设施**：从 `rig`（LLM 应用框架）到 `omlx`（Apple Silicon 推理），再到 `nautilus_trader`（高频交易引擎），Rust 的性能优势正在重塑 AI 工具链，值得关注其生态成熟度。
- **本地模型选型自动化**：`llmfit` 用一条命令匹配“硬件 × 模型”组合，大幅降低端侧部署试错成本，是边缘 AI 落地的重要助推器。
- **AI 求职垂直 Agent**：`career-ops` 将职位扫描、评估、简历定制全流程 Agent 化并在本地 CLI 运行，是“AI Agent + 垂直职业场景”的代表案例，此类模式可复制到更多行业。

---
*本日报由 [agents-radar](https://github.com/huang-yi-dae/agents-radar) 自动生成。*