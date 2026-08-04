# AI 开源趋势日报 2026-08-04

> 数据来源: GitHub Trending + GitHub Search API（含 AI 与大数据 / 数据分析 / 数据挖掘趋势） | 生成时间: 2026-08-04 14:12 UTC

---

# AI 开源趋势日报（2026-08-04）

## 今日速览
今日GitHub AI开源领域热度集中在Agent生态完善、低资源推理优化与RAG工具链升级三大方向。腾讯云发布团队级Agent记忆中枢、AirLLM实现单4GB GPU跑通70B模型推理、RAGFlow迭代Agent级RAG能力等创新引发社区高关注，多个相关项目单日新增Stars破千。同时，安全、科研、金融等垂直场景的AI应用工具持续获得开发者青睐，国产大模型适配生态进一步成熟。

---

## 各维度热门项目
### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具、CLI）
- [firecrawl/pdf-inspector](https://github.com/firecrawl/pdf-inspector)：⭐0 (+2524 today)，Rust实现的PDF检测分类与文本提取工具，可智能识别扫描件/文本PDF，为AI文档处理链路提供高效底层组件，今日热度飙升。
- [uber/ADR](https://github.com/uber/ADR)：⭐0 (+140 today)，Uber开源的AI Agent安全观测与威胁检测框架，已在Uber生产环境落地，解决企业级Agent的安全合规痛点。
- [microsoft/generative-ai-for-beginners](https://github.com/microsoft/generative-ai-for-beginners)：⭐0 (+784 today)，微软推出的生成式AI入门教程，包含21节实战课程，是开发者入门大模型开发的高质量免费资源。
- [lyogavin/airllm](https://github.com/lyogavin/airllm)：⭐0 (+1716 today)，低资源大模型推理引擎，支持单张4GB GPU运行70B参数模型，大幅降低大模型部署门槛。
- [esengine/DeepSeek-Reasonix](https://github.com/esengine/DeepSeek-Reasonix)：⭐0 (+924 today)，基于DeepSeek优化的终端AI编码Agent，针对prefix-cache稳定性优化，支持长时间后台运行。
- [EveryInc/compound-engineering-plugin](https://github.com/EveryInc/compound-engineering-plugin)：⭐0 (+33 today)，支持Claude Code、Cursor等多款AI编码客户端的工程插件，扩展编码Agent的工程能力。

### 🤖 AI 智能体/工作流（Agent 框架、自动化、多智能体）
- [TencentCloud/TencentDB-Agent-Memory](https://github.com/TencentCloud/TencentDB-Agent-Memory)：⭐0 (+1138 today)，腾讯云开源的团队级Agent记忆中枢，可将对话、文档、代码转化为可复用的记忆资产，实现多Agent间的记忆共享与治理。
- [livekit/agents](https://github.com/livekit/agents)：⭐0 (+432 today)，实时音视频AI Agent开发框架，支持语音、视频等多模态Agent的快速构建，适合实时交互场景。
- [obra/superpowers](https://github.com/obra/superpowers)：⭐0 (+617 today)，轻量级Agent技能框架与软件开发方法论，提供开箱即用的Agent能力扩展方案。
- [zhaoxuya520/reverse-skill](https://github.com/zhaoxuya520/reverse-skill)：⭐0 (+2310 today)，面向安全领域的Agent技能路由包，支持逆向工程、渗透测试等场景的AI自动路由与工具链自举，适配多款主流编码AI客户端。
- [browser-use/video-use](https://github.com/browser-use/video-use)：⭐0 (+306 today)，基于编码Agent的视频编辑工具，支持通过代码指令完成视频剪辑任务，降低视频制作的技术门槛。
- [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)：⭐225,289，开源可成长的AI Agent框架，支持自定义技能与记忆扩展，是当前Star数最高的Agent项目之一。
- [HKUDS/nanobot](https://github.com/HKUDS/nanobot)：⭐46,609，超轻量级自托管个人Agent框架，内置WebUI、工具、记忆、多Agent工作流等能力，适合个人用户快速部署。
- [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio)：⭐49,399，AI生产力工作室，支持智能对话、自主Agent与300+助手，统一接入主流大模型。

### 📦 AI 应用（具体应用产品、垂直场景解决方案）
- [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master)：⭐42,964，AI驱动的PPT生成工具，可将文档或主题自动转化为带原生动画、数据图表的可编辑PPT文件，支持自定义模板。
- [666ghj/BettaFish](https://github.com/666ghj/BettaFish)：⭐41,941，多Agent舆情分析助手，支持多源数据采集、舆情研判与趋势预测，零框架实现，适合政务、媒体等场景使用。
- [OpenBB-finance/OpenBB](https://github.com/OpenBB-finance/OpenBB)：⭐71,371，开源金融数据平台，为分析师、量化人员与AI Agent提供统一的金融数据接口与分析能力。
- [K-Dense-AI/scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills)：⭐32,613，科研领域Agent技能库，覆盖生物、化学、医药等158个科研场景，已服务全球17万+科研人员。
- [santifer/career-ops](https://github.com/santifer/career-ops)：⭐62,740，AI驱动的求职助手，可自动扫描招聘平台、评估岗位、定制简历与跟踪申请流程，在本地AI编码客户端中运行。

### 🧠 大模型/训练（模型权重、训练框架、微调工具）
- [ollama/ollama](https://github.com/ollama/ollama)：⭐177,756，本地大模型运行工具，支持一键部署Kimi、DeepSeek、Qwen等主流开源模型，是当前最受欢迎的本地大模型运行工具。
- [huggingface/transformers](https://github.com/huggingface/transformers)：⭐163,332，Hugging Face开源的模型定义框架，支持文本、视觉、音频等多模态模型的训练与推理，是业界主流的模型开发工具。
- [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch)：⭐100,528，从零实现类ChatGPT大模型的实战教程，基于PyTorch编写，是入门大模型原理的经典资源。
- [open-compass/opencompass](https://github.com/open-compass/opencompass)：⭐7,273，开源大模型评测平台，支持100+数据集对Llama、Qwen、DeepSeek等主流模型的综合评测。
- [AarambhDevHub/aarambh-studio](https://github.com/AarambhDevHub/aarambh-studio)：⭐61，纯Rust实现的Decoder-only大模型，支持从25M到1.3B参数规模，无需Python与PyTorch依赖，适合系统工程师学习LLM推理。

### 🔍 RAG/知识库（向量数据库、检索增强、知识管理）
- [infiniflow/ragflow](https://github.com/infiniflow/ragflow)：⭐86,798，融合RAG与Agent能力的下一代RAG引擎，支持深度文档解析、多模态检索与知识图谱增强，是当前落地能力最强的开源RAG方案之一。
- [mem0ai/mem0](https://github.com/mem0ai/mem0)：⭐62,500，AI Agent通用记忆层，为Agent提供跨会话的持久化记忆能力，支持自托管与知识图谱存储。
- [Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm)：⭐64,321，本地优先的AI工作台，支持RAG、Agent能力，可对接任意大模型与向量数据库，适合个人与团队自托管使用。
- [FlowiseAI/Flowise](https://github.com/FlowiseAI/Flowise)：⭐55,143，可视化RAG/Agent构建工具，通过拖拽即可完成AI工作流搭建，降低非专业开发者使用RAG的门槛。
- [meilisearch/meilisearch](https://github.com/meilisearch/meilisearch)：⭐58,851，轻量级搜索引擎，支持AI驱动的混合搜索能力，可作为RAG的检索引擎组件，性能优异且易部署。
- [topoteretes/cognee](https://github.com/topoteretes/cognee)：⭐29,761，开源Agent记忆平台，基于知识图谱引擎为Agent提供跨会话的长期记忆能力，支持100%私有化部署。
- [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify)：⭐102,219，代码库知识图谱构建工具，可将代码、文档、SQL Schema等转化为可查询的知识图谱，为代码类RAG提供精准上下文。

---

## 趋势信号分析
当前AI开源社区的增长核心已从基础大模型转向落地配套工具的迭代，今日热榜中Agent记忆、安全观测、低资源推理、RAG增强等细分方向均出现爆发式增长，反映社区正致力于解决Agent与RAG落地过程中的实际痛点。新兴技术栈

---
*本日报由 [agents-radar](https://github.com/huang-yi-dae/agents-radar) 自动生成。*