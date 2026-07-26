# AI 开源趋势日报 2026-07-26

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-07-26 03:23 UTC

---

# AI 开源趋势日报（2026-07-26）

## 今日速览
今日 GitHub Trending 上 AI 相关项目爆发式增长，**Agent 技能框架**和**浏览器自动化**成为最热赛道：`mattpocock/skills` 和 `obra/superpowers` 分别新增 1740 和 479 stars，推动“Skill”概念加速落地；`citrolabs/ego-lite` 以 986 stars 成为 AI 代理专用浏览器的标杆；阿里巴巴开源的 `open-code-review` 将 LLM Agent 嵌入代码审查流水线，获 431 stars；同时 `affaan-m/ECC`（Agent 性能优化）和 `ComposioHQ/awesome-claude-skills` 共同暗示**Agent 基础设施**正快速成熟。此外，金融领域专用大模型 `shiyu-coder/Kronos` 和离线 AI 语法检查器 `Automattic/harper` 也表现出强劲吸引力。

---

## 各维度热门项目

### 🔧 AI 基础工具
- **[andrewyng/aisuite](https://github.com/andrewyng/aisuite)** ⭐77（今日+77）  
  统一多 AI 提供商接口，简化从 OpenAI 到 Anthropic 的切换，降低开发耦合成本。
- **[RyanCodrai/turbovec](https://github.com/RyanCodrai/turbovec)** ⭐86（今日+86）  
  基于 TurboQuant 的矢量索引，Rust 核心 + Python 绑定，为高效向量检索提供新选择。
- **[vllm-project/vllm](https://github.com/vllm-project/vllm)** ⭐87.2k  
  高吞吐、低内存的 LLM 推理引擎，已成为生产级部署的标准组件。
- **[ollama/ollama](https://github.com/ollama/ollama)** ⭐176.9k  
  一键运行本地大模型，支持 Kimi、DeepSeek、Gemma 等最新模型，本地推理首选。
- **[roboflow/supervision](https://github.com/roboflow/supervision)** ⭐48.4k  
  可复用的计算机视觉工具库，简化数据标注、检测和追踪流程。

### 🤖 AI 智能体 / 工作流
- **[mattpocock/skills](https://github.com/mattpocock/skills)** ⭐1740（今日+1740）  
  “真正的工程师技能”——直接从 `.agents` 目录导出的 Agent 技能集合，今日最热。
- **[citrolabs/ego-lite](https://github.com/citrolabs/ego-lite)** ⭐986（今日+986）  
  最快浏览器 AI 代理，可共享登录状态、运行自动化任务而不打扰用户，专为 Codex/Claude Code 设计。
- **[obra/superpowers](https://github.com/obra/superpowers)** ⭐479（今日+479）  
  一套 Agent 技能框架和软件开发方法，重新定义了 AI 与开发流程的协作方式。
- **[affaan-m/ECC](https://github.com/affaan-m/ECC)** ⭐377（今日+377）+ 总量233k  
  Agent 性能优化系统，集成技能、记忆、安全性，支持 Claude Code/Codex/Cursor 等多种 CLI。
- **[alibaba/open-code-review](https://github.com/alibaba/open-code-review)** ⭐431（今日+431）  
  阿里开源的高效代码审查工具，混合架构（确定性管道 + LLM Agent），行级注释、内置规则（NPE、SQL注入等）。
- **[langchain-ai/langchain](https://github.com/langchain-ai/langchain)** ⭐142.6k  
  Agent 工程化平台，提供 RAG、工具调用、多智能体编排等完整方案。
- **[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)** ⭐220.5k  
  持续进化的自主 Agent，今日热度极高，支持本地运行和深度定制。

### 📦 AI 应用
- **[Automattic/harper](https://github.com/Automattic/harper)** ⭐503（今日+503）  
  离线、隐私优先的语法检查器，Rust 构建，在保持隐私的同时提供类似 Grammarly 的体验。
- **[shiyu-coder/Kronos](https://github.com/shiyu-coder/Kronos)** ⭐319（今日+319）  
  金融领域基础模型，专为市场语言建模，可能推动量化投资与 LLM 的融合。
- **[OtterMind/Chat2DB](https://github.com/OtterMind/Chat2DB)** ⭐360（今日+360）  
  AI 驱动的数据库工具和 SQL 客户端，支持 MySQL、PostgreSQL 等主流数据库，自然语言查询。
- **[palmier-io/palmier-pro](https://github.com/palmier-io/palmier-pro)** ⭐412（今日+412）  
  macOS 原生 AI 视频编辑器，将生成式 AI 直接集成到专业视频编辑工作流。
- **[harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo)** ⭐99.3k  
  一键生成高清短视频，利用 AI 大模型和自动化工作流，适合内容创作。
- **[open-webui/open-webui](https://github.com/open-webui/open-webui)** ⭐146.7k  
  用户友好的 AI 界面，支持 Ollama 和 OpenAI API，本地部署的聊天 UI 标杆。

### 🧠 大模型 / 训练
- **[Lordog/dive-into-llms](https://github.com/Lordog/dive-into-llms)** ⭐408（今日+408）  
  《动手学大模型》编程实践教程，适合从零开始学习 LLM 训练和推理。
- **[jingyaogong/minimind](https://github.com/jingyaogong/minimind)** ⭐53.8k  
  2 小时从零训练 64M 参数小模型，大幅降低 LLM 训练入门门槛。
- **[skyzh/tiny-llm](https://github.com/skyzh/tiny-llm)** ⭐4.4k  
  在 Apple Silicon 上学习 LLM 推理服务的系统课程，结合 tiny vLLM + Qwen。
- **[open-compass/opencompass](https://github.com/open-compass/opencompass)** ⭐7.2k  
  全面 LLM 评测平台，支持 Llama3、GPT-4、Qwen 等 100+ 数据集。

### 🔍 RAG / 知识库
- **[infiniflow/ragflow](https://github.com/infiniflow/ragflow)** ⭐86k  
  领先的开源 RAG 引擎，融合 Agent 能力，为 LLM 提供强大上下文层。
- **[mem0ai/mem0](https://github.com/mem0ai/mem0)** ⭐61.7k  
  AI Agent 的通用记忆层，跨 session 持久化上下文，提升交互连贯性。
- **[Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm)** ⭐63.8k  
  本地优先的 Agent 体验，支持文档知识库、多模型切换，强调用户所有权。
- **[milvus-io/milvus](https://github.com/milvus-io/milvus)** ⭐45.4k  
  云原生高性能向量数据库，大规模相似性搜索的首选基础组件。
- **[StarTrail-org/LEANN](https://github.com/StarTrail-org/LEANN)** ⭐12.7k  
  [MLsys2026] RAG 存储节省 97%，在个人设备上运行快速、准确且完全私密的 RAG 应用。

---

## 趋势信号分析
今日社区呈现三个显著趋势：

1. **Agent “技能”生态爆发**：`mattpocock/skills`、`obra/superpowers`、`affaan-m/ECC` 三个项目累计贡献近 2600 新增 stars。Skills 作为可复用的 Agent 能力单元，正在成为与 plugins、tools 并列的新抽象层。这暗示开发者正从“搭建 Agent 框架”转向“丰富 Agent 能力市场”。

2. **浏览器即 Agent 操作界面的革命**：`ego-lite` 以 986 stars 成为今日 AI 类项目第二，其“零配置、零打扰”的理念直击 AI 代理访问网页时的高摩擦痛点。类似 `browser-use`（106k stars）的成熟，表明“Agent + Browser”组合正在从演示走向生产。

3. **垂直领域大模型与工具精细化**：金融大模型 `Kronos` 和离线语法检查器 `harper` 的走红，说明社区不再满足于通用模型，而是追求场景定制的轻量级解决方案。同时 `aisuite` 统一接口和 `Chat2DB` 自然语言数据库工具表明，AI 基础设施也在加速“开箱即用”化。

---

## 社区关注热点
- **Agent 技能标准化**：`mattpocock/skills` 和 `obra/superpowers` 正在定义“Skill”概念，开发者可参照其结构构建自己的技能库，是 Agent 工程化的下一个前沿。
- **AI 代理专用浏览器**：`citrolabs/ego-lite` 提供了“共享登录状态”的突破性设计，若结合 `browser-use` 等框架，可实现完全无干扰的 Web 自动化。值得深入研究其实现原理。
- **开源代码审查 Agent**：`alibaba/open-code-review` 混合架构（确定性 + LLM）已在阿里内部验证，其内置的 NPE、SQL 注入规则可作为企业级 AI 代码审查的参考实现。
- **金融基础模型**：`shiyu-coder/Kronos` 专注于金融语言，可能推动行业专用小模型（Domain-specific LLM）的普及，对比通用模型在量化分析中的表现值得跟踪。
- **离线 AI 工具崛起**：`Automattic/harper` 的隐私优先方案与 `ollama` 的本地推理形成互补，表明用户对数据主权和低延迟的需求持续增长。

---
*本日报由 [agents-radar](https://github.com/huang-yi-dae/agents-radar) 自动生成。*