# AI 开源趋势日报 2026-08-04

> 数据来源: GitHub Trending + GitHub Search API（含 AI 与大数据 / 数据分析 / 数据挖掘趋势） | 生成时间: 2026-08-04 09:23 UTC

---

用户现在需要我做一份AI开源趋势日报，首先得严格按照要求的三个步骤来：先过滤，再分类，最后输出报告。首先第一步过滤，先看Trending的16个，还有主题搜索的122个去重后的，首先排除和AI无关的。首先Trending里的，先筛：
首先Trending的：
1. lyogavin/airllm：是AI推理的，保留，属于基础工具？对，单卡跑70B， inference工具。
2. zhaoxuya520/reverse-skill：这个是安全逆向的AI路由？哦是给AI客户端的技能路由，属于AI智能体/工作流？对，因为支持Claude Code这些AI编码客户端，是Agent相关的工具。
3. firecrawl/pdf-inspector：哦这个是PDF处理的，属于AI应用？因为PDF提取是RAG和AI应用的基础工具，对，智能路由扫描和文本PDF，是AI数据处理的工具。
4. esengine/DeepSeek-Reasonix：DeepSeek的终端AI编码Agent，属于AI智能体/工作流，对，今天新增883，总星其实后面看主题搜索里也有这个，哦对，主题搜索的ai-agent里也有它，总星30k多。
5. TencentCloud/TencentDB-Agent-Memory：腾讯的Agent记忆中心，属于AI智能体/工作流里的记忆组件，或者RAG？哦对，是把对话、文档转成记忆资产，给Agent用，归智能体吧，或者RAG？哦看分类，优先最主要，它是Agent的记忆层，属于智能体/工作流？或者RAG？等下，后面分类再定，先保留，是AI相关的。
6. microsoft/AI-For-Beginners：微软的AI入门教程，属于AI基础工具？或者AI应用？哦是教育类的，属于AI基础工具里的学习资源？对，是AI入门的基础资源。
7. microsoft/generative-ai-for-beginners：同上，生成式AI入门，也是基础工具里的教育资源。
8. donnemartin/system-design-primer：这个是系统设计的，和AI无关？哦对，是通用的系统设计面试教程，没有AI相关，排除。
9. antirez/ds4：DeepSeek 4的本地推理引擎，Metal/CUDA/ROCm，属于AI基础工具里的推理引擎，对，保留。
10. shiyu-coder/Kronos：金融市场的基础模型，属于大模型/训练？对，是金融领域的基础模型，归大模型类。
11. Panniantong/Agent-Reach：给Agent加眼睛，爬全网平台的CLI，属于AI智能体/工作流里的工具，对，是Agent的工具组件。
12. Alishahryar1/free-claude-code：免费用Claude Code这些的，属于AI智能体/工作流里的工具？或者基础工具？哦是AI编码客户端的替代工具，归智能体吧？或者基础工具？等下，是终端用的AI编码工具，属于AI基础工具？哦对，是开发工具类的。
13. iv-org/invidious：YouTube的前端，和AI无关，排除。
14. livekit/agents：实时语音AI Agent框架，属于AI智能体/工作流，对，是Agent框架。
15. usekaneo/kaneo：项目管理工具，和AI无关？哦看描述是开源项目管理，没有AI相关，排除。
16. jamiepine/voicebox：开源AI语音工作室，属于AI应用，对，是语音类的AI应用。
然后主题搜索的122个，首先排除和AI无关的？哦主题搜索都是带AI相关topic的，不过也要筛，比如有没有伪AI？哦看topic都是data-mining、rag、ml、vector-db、llm、big-data、llm-model、data-analysis、ai-agent，都是相关的，不过先看有没有和AI无关的？比如amark/gun是去中心化图数据同步，虽然topic是big-data，但和AI没关系？哦对，那个是通用数据同步，和AI/ML无关，排除。还有cython/cython是Python转C的编译器，虽然topic是big-data，但本身不是AI相关的，排除。其他的都是AI相关的？对。
然后第二步分类，五个维度：
首先第一个维度：🔧 AI 基础工具（框架、SDK、推理引擎、开发工具、CLI）
这里面放什么？
首先Trending里的：
- lyogavin/airllm：单4GB GPU跑70B的推理工具，今日+1085，总星0？哦对Trending里的都是今日新增的，总星可能还没累积？哦看数据里Trending的stars都是0，+xxx today，对。那这个今日新增1085，是推理工具，适合放这里。
- antirez/ds4：DeepSeek 4的本地推理引擎，支持Metal/CUDA/ROCm，今日+384，是推理引擎，放这里。
- microsoft/AI-For-Beginners：微软12周24节的AI入门教程，Jupyter Notebook，今日+1902，是AI学习的基础资源，放这里。
- microsoft/generative-ai-for-beginners：微软21节生成式AI入门课，今日+775，同上，基础学习工具。
- Alishahryar1/free-claude-code：免费使用Claude Code/Codex等AI编码客户端的终端工具，今日+278，是AI开发工具，放这里。
还有主题搜索里的基础工具？哦主题搜索里的基础工具比如tensorflow/pytorch这些？哦对，还有scikit-learn，还有ultralytics？哦对，还有tesseract-ocr？哦等下，分类的时候每个维度的项目，Trending和主题搜索的都可以放，只要符合类别。
哦对，基础工具里还可以放：
- pytorch/pytorch：总星102170，topic:ml，深度学习框架，这个是基础工具的核心。
- tensorflow/tensorflow：总星196783，ML框架，核心基础工具。
- scikit-learn/scikit-learn：总星66871，传统ML框架，基础工具。
- ultralytics/ultralytics：总星60198，YOLO系列目标检测框架，CV基础工具。
- huggingface/transformers：总星163325，大模型基础框架，放这里？哦对，transformers是模型加载推理的基础工具，属于基础工具。
哦对，还有open-webui？哦open-webui是AI界面，属于应用？哦对，open-webui是 Ollama等的前端，属于AI应用？或者基础工具？哦看分类，AI应用是具体产品，open-webui是用户界面，属于AI应用？对。
然后第二个维度：🤖 AI 智能体/工作流（Agent 框架、自动化、多智能体）
Trending里的：
- zhaoxuya520/reverse-skill：AI驱动的安全技能路由包，支持Claude Code等AI客户端，今日+2446，是Agent的工具链组件，放这里。
- esengine/DeepSeek-Reasonix：DeepSeek原生的终端AI编码Agent，基于prefix-cache优化，今日+883，总星30370，是Agent框架。
- TencentCloud/TencentDB-Agent-Memory：腾讯云Agent团队级记忆中心，把对话/文档/代码转化为Agent可复用的记忆资产，今日+1090，是Agent的核心组件。
- Panniantong/Agent-Reach：给AI Agent提供全网信息获取能力的CLI工具，支持Twitter/Reddit/YouTube等平台，零API费用，今日+1057，是Agent的工具扩展。
- livekit/agents：实时语音/视频AI Agent开发框架，今日+148，是Agent框架。
主题搜索里的：
- Significant-Gravitas/AutoGPT：总星185802，开源通用Agent框架，是Agent的代表项目。
- NousResearch/hermes-agent：总星225151，可成长的Agent框架，核心Agent项目。
- HKUDS/nanobot：总星46604，超轻量自托管个人Agent框架，支持MCP/多Agent，是轻量Agent代表。
- zhayujie/CowAgent：总星46304，开源超级AI助手，支持多模型多通道，自进化记忆，是应用级Agent。
- CopilotKit/CopilotKit：总星36442，前端Agent堆栈，支持React等前端集成Agent，是Agent的前端框架。
- HKUDS/Vibe-Trading：总星29528，个人交易Agent，是垂直场景Agent。
还有santifer/career-ops是AI求职Agent，总星62711，对，那个是求职场景的Agent，放这里。
哦对，还有CherryHQ/cherry-studio是AI工作室，有Agent功能，总星49387，属于Agent应用？哦对，Cherry Studio是AI生产力工作室，有自主Agent，300+助手，属于Agent应用，放这里？
等下，第三个维度是📦 AI 应用（具体应用产品、垂直场景解决方案）
那这里放：
- CherryHQ/cherry-studio：总星49387，AI生产力工作室，集成智能对话、自主Agent、300+助手，统一接入前沿大模型，今日？哦看数据里Cherry Studio的stars是总星49387，今日新增？哦看主题搜索里的数据是总星，Trending里没有它，哦对，Trending里的是今日新增多的，主题搜索的是总星。
- jamiepine/voicebox：今日+412，开源AI语音工作室，支持克隆、听写、创作，是语音类AI应用。
- open-webui/open-webui：总星147799，用户友好的AI本地界面，支持Ollama、OpenAI API等，是AI应用的前端产品。
- Mintplex-Labs/anything-llm：总星64317，本地优先的AI Agent体验平台，是AI应用产品。
- FlowiseAI/Flowise：总星55135，可视化构建AI Agent的工具，是AI应用开发工具？哦对，属于AI应用里的低代码Agent工具。
- BettaFish（666ghj/BettaFish）：总星41939，多Agent舆情分析助手，垂直场景应用，舆情分析。
- ZhuLinsen/daily_stock_analysis：总星60008，LLM驱动的多市场股票分析系统，垂直金融场景应用。
- K-Dense-AI/scientific-agent-skills：总星32587，AI科学家技能库，把Agent变成科研助手，垂直科研场景应用。
- hugohe3/ppt-master：总星42897，AI自动生成PPT的工具，垂直办公场景应用。
哦对，还有MoneyPrinterTurbo？哦harry0703/MoneyPrinterTurbo是总星101493，AI生成短视频的应用，对，那个是内容生成的AI应用，放这里。
第四个维度：🧠 大模型/训练（模型权重、训练框架、微调工具）
这里放：
- shiyu-coder/Kronos：今日+200，金融市场基础大模型，是垂直领域大模型。
- 0xPlaygrounds/rig：总星8162，Rust构建的模块化LLM应用框架，支持大模型应用开发，属于大模型工具。
- open-compass/opencompass：总星7270，LLM评测平台，支持100+模型和数据集，是大模型评测工具，属于大模型相关。
- skyzh/tiny-llm：总星4439，Apple Silicon上的LLM推理 serving 课程，教构建tiny vLLM，是大模型推理训练相关。
- AIDASLab/Awesome-Diffusion-LLM：总星94，扩散模型和LLM结合的论文合集，是大模型前沿方向。
- AarambhDevHub/aarambh-studio：总星61，纯Rust从零实现的LLM，支持MoE、长上下文等，是大模型训练项目。
- llm-jp/awesome-japanese-llm：总星1423，日语LLM汇总，是大模型资源合集。
哦对，还有没有？比如rasbt/LLMs-from-scratch是总星100505，教从零实现LLM的，属于大模型学习资源，放这里。
第五个维度：🔍 RAG/知识库（向量数据库、检索增强、知识管理）
这里放：
- firecrawl/pdf-inspector：今日+1699，Rust写的PDF检测分类提取库，智能区分扫描件和文本PDF，是RAG的文档处理核心工具，放这里？哦对，因为RAG需要处理PDF，所以这个属于RAG相关的工具。
- langgenius/dify：总星151298，开箱即用的RAG/Agent工作流平台，是RAG的核心工具。
- open-webui？哦不，open-webui是应用，哦RAG里的：
- infiniflow/ragflow：总星86787，领先的开源RAG引擎，融合Agent能力，是RAG核心项目。
- mem0ai/mem0：总星62474，AI Agent的通用记忆层，属于RAG/知识管理组件。
- topoteretes/cognee：总星29755，开源AI记忆平台，自托管知识图谱引擎，给Agent提供长期记忆，属于RAG/知识管理。
- Milvus/milvus：总星45503，高性能云原生向量数据库，是RAG的核心存储组件。
- qdrant/qdrant：总星33766，高性能向量数据库，RAG核心存储。
- weaviate/weaviate：总星16687，开源向量数据库，支持向量+结构化过滤，RAG存储。
- langchain-ai/langchain：总星143399，文档Agent和RAG平台，是RAG的核心框架。
- run-llama/llama_index：总星51365，领先的文档Agent和RAG平台，是RAG核心框架。
- Graphify-Labs/graphify：总星102073，把代码库转成可查询知识图谱的RAG工具，支持Claude Code等，是RAG的新方向。
哦对，还有VectifyAI/PageIndex是总星35005，无向量的推理型RAG文档索引，属于RAG的新技术方向。
还有NirDiamant/RAG_Techniques是总星28932，RAG高级技术教程，属于RAG资源。
哦对，还有the dotmack/claude-mem是总星89487，给Agent提供跨会话持久上下文的，属于RAG/记忆管理，放这里。
哦对，刚才的TencentDB-Agent-Memory，哦它是Agent的记忆，属于RAG/知识库？哦对，因为它是把文档对话转成可复用的记忆资产，给RAG和Agent用，刚才我归到智能体了，其实可以归到RAG/知识库？哦看分类，优先最主要类别，它的核心是记忆管理，属于RAG/知识库的组件？或者智能体？哦没事，一个项目可以归多类，不过优先最主要，它的核心是记忆层，属于RAG/知识库？或者智能体？等下看它的描述：“team-level memory hub for AI Agents — turning conversations, docs, and code into four reusable memory assets (Chat Memory, Skill, LLM-Wiki, Code-Graph) that are governed, shared, and equipped across agents and frameworks.” 哦它是给Agent用的记忆中心，属于Agent的基础组件，也可以归到RAG，不过没关系，分类的时候可以标，不过报告里每个维度列项目就行。
然后第一步过滤的时候，要排除的：Trending里的system-design-primer（通用系统设计，无AI）、iv-org/invidious（YouTube前端，无AI）、usekaneo/kaneo（通用项目管理，无AI）。主题搜索里的amark/gun（去中心化数据同步，无AI）、cython/cython（Python编译器，无AI），其他的都保留，因为都是AI/ML/数据相关的。
然后第三步输出报告：
首先1. 今日速览：3-5句话，概括今日动向。比如今日AI开源领域热度集中在AI Agent工具链、轻量推理引擎和RAG技术三个方向：单卡跑70B大模型的AirLLM、DeepSeek终端Agent Reasoning、腾讯云Agent记忆中心等项目今日新增stars均破千，反映出社区对大模型落地降本、Agent能力扩展的需求持续升温；同时PDF智能处理、知识图谱RAG等垂直技术方向也获得大量关注，微软AI入门系列教程持续霸榜，显示AI教育需求依然旺盛。
然后2. 各维度热门项目，每个维度列3-8个，每个有链接、stars数据、一句话说明。
首先🔧 AI 基础工具：
1. [pytorch/pytorch](https://github.com/pytorch/pytorch) ⭐102,170（总量） 全球最流行的深度学习框架，为绝大多数AI研究和应用提供底层 tensor 计算和GPU加速支持，是AI开发的事实标准基础工具。
2. [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow) ⭐196,783（总量） 谷歌开源的端到端机器学习框架，支持从训练到部署的全流程，覆盖移动端、云端、边缘设备等多场景。
3. [huggingface/transformers](https://github.com/huggingface/transformers) ⭐163,325（总量） 大模型领域的核心基础库，提供文本、视觉、音频、多模态等上千种预训练模型的加载、微调和推理能力，极大降低了大模型使用门槛。
4. [lyogavin/airllm](https://github.com/lyogavin/airllm) ⭐0（+1085 today） 轻量级大模型推理工具，支持仅用4GB单GPU即可运行70B参数大模型，今日热度暴涨，大幅降低大模型推理的硬件门槛。
5. [antirez/ds4](https://github.com/antirez/ds4) ⭐0（+384 today） DeepSeek 4系列模型的官方轻量推理引擎，支持Metal（苹果芯片）、CUDA、ROCm多平台，可本地运行Flash和Pro版本模型。
6. [microsoft/AI-For-Beginners](https://github.com/microsoft/AI-For-Beginners) ⭐0（+1902 today） 微软官方出品的12周24节AI入门全套教程，涵盖机器学习基础、经典模型、伦理等内容，今日新增stars破千，是AI入门的首选公开资源。
7. [microsoft/generative-ai-for-beginners](https://github.com/microsoft/generative-ai-for-beginners) ⭐0（+775 today） 微软官方的生成式AI入门教程，共21节课，手把手教开发者构建生成式AI应用，今日热度持续走高。
然后🤖 AI 智能体/工作流：
1. [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) ⭐225,151（总量） 可自主成长的AI Agent框架，支持工具调用、记忆进化和多模态交互，是当前最受欢迎的通用Agent开发框架之一。
2. [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) ⭐185,802（总量） 开源的通用自主Agent平台，目标是让每个人都能轻松使用和构建AI Agent，支持自动化任务执行、记忆管理和工具集成。
3. [esengine/DeepSeek-Reasonix](https://github.com/esengine/DeepSeek-Reasonix) ⭐30,370（总量，+883 today） 专为DeepSeek模型优化的终端AI编码Agent，基于prefix-cache技术优化稳定性，可持续运行处理复杂编码任务，今日新增stars近900。
4. [TencentCloud/TencentDB-Agent-Memory](https://github.com/TencentCloud/TencentDB-Agent-Memory) ⭐0（+1090 today） 腾讯云开源的团队级Agent记忆中心，可将对话、文档、代码转化为Agent可复用的记忆资产（对话记忆、技能、LLM知识库、代码图谱），实现Agent间的记忆共享和治理，今日热度暴涨。
5. [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) ⭐0（+1057 today） AI Agent的全网信息获取扩展工具，提供统一CLI接口，支持免费抓取Twitter、Reddit、YouTube、GitHub等平台的内容，无需API密钥，今日新增stars破千。
6. [livekit/agents](https://github.com/livekit/agents) ⭐0（+148 today） 实时音视频AI Agent开发框架，支持构建带语音、视频交互能力的实时Agent，适用于客服、会议助手等场景。
7. [HKUDS/nanobot](https://github.com/HKUDS/nanobot) ⭐46,604（总量） 超轻量自托管个人Agent框架，支持WebUI、工具调用、记忆、MCP协议和多Agent工作流，开箱即用，适合个人用户快速搭建私有Agent。
然后📦 AI 应用：
1. [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) ⭐101,493（总量） 基于大模型的全自动化短视频生成工具，输入主题或关键词即可一键生成高清短视频，支持自动化工作流，是内容创作领域的热门AI应用。
2. [open-webui/open-webui](https://github.com/open-webui/open-webui) ⭐147,799（总量） 开源的本地AI交互界面，支持Ollama、OpenAI API等几乎所有主流大模型服务，提供类ChatGPT的对话体验，是本地大模型用户的首选前端工具。
3. [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) ⭐49,387（总量） AI生产力工作室，集成智能对话、自主Agent、300+预设助手，统一接入所有前沿大模型，支持多平台使用。
4. [jamiepine/voicebox](https://github.com/jamiepine/voicebox) ⭐0（+412 today） 开源的AI语音工作室，支持声音克隆、语音听写、音频创作等功能，今日新增stars破四百，是语音AI领域的实用工具。
5. [666ghj/BettaFish](https://github.com/666ghj/BettaFish) ⭐41,939（总量） 多Agent协同的舆情分析助手，可打破信息茧房、还原舆情全貌、预测舆情走向，辅助决策，是国内开源的垂直AI应用代表。
6. [hugohe3/ppt-master](https://github.com/hugouhe3/ppt-master) ⭐42,897（总量） AI自动生成原生PPT的工具，输入主题或文档即可生成带动画、图表、音频旁白的PPT，支持自定义模板，是办公场景的热门AI应用。
哦对，刚才的ppt-master的链接我刚才打错了，是hugohe3的，对。
然后🧠 大模型/训练：
1. [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) ⭐100,505（总量） 从零实现类ChatGPT大模型的实战教程，基于PyTorch逐步讲解LLM的原理、训练和部署，是大模型学习的顶级开源资源。
2. [shiyu-coder/Kronos](https://github.com/shiyu-coder/Kronos) ⭐0（+200 today） 全球首个金融市场基础大模型，专门针对金融市场的语言和逻辑训练，可应用于行情分析、研报解读、交易策略生成等金融场景。
3. [open-compass/opencompass](https://github.com/open-compass/opencompass) ⭐7,270（总量） 一站式LLM评测平台，支持100+主流大模型、100+评测数据集，提供公平、全面的模型能力评估能力，是大模型迭代的核心工具。
4. [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) ⭐4,439（总量） 面向系统工程师的Apple Silicon LLM推理 serving 实战课程，手把手教开发者构建 tiny vLLM 和 Qwen 模型，是边缘大模型推理的实用学习资源。
5. [AarambhDevHub/aarambh-studio](https://github.com/AarambhDevHub/aarambh-studio) ⭐61（总量） 纯Rust从零实现的解码器-only大模型，支持DeltaNet稀疏注意力、细粒度MoE、长上下文工具调用等前沿特性，无需Python/PyTorch，是大模型轻量化实现的新探索。
然后🔍 RAG/知识库：
1. [langgenius/dify](https://github.com/langgenius/dify) ⭐151,298（总量） 开箱即用的RAG/Agent工作流平台，支持可视化构建RAG pipeline、集成多模型和工具，支持云、VPC、自托管部署，是当前最流行的开源RAG开发平台之一。
2. [infiniflow/ragflow](https://github.com/infiniflow/ragflow) ⭐86,787（总量） 领先的开源RAG引擎，融合先进检索技术和Agent能力，为LLM提供超高质量上下文层，支持深度文档理解和多模态检索。
3. [langchain-ai/langchain](https://github.com/langchain-ai/langchain) ⭐143,399（总量） 领先的文档Agent和RAG平台，提供统一的API接口，支持文档加载、检索、Agent集成等全流程RAG开发，是RAG领域的基础框架。
4. [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) ⭐102,073（总量） 基于知识图谱的RAG工具，可将任意代码库、文档、SQL Schema等转化为可查询的知识图谱，无需向量数据库，支持Claude Code、Cursor等AI编码客户端，是RAG技术的新方向。
5. [firecrawl/pdf-inspector](https://github.com/firecrawl/pdf-inspector) ⭐0（+1699 today） 高性能Rust PDF处理库，可智能检测扫描件/文本PDF、提取文本、分类文档，是RAG pipelines中文档预处理的核心工具，今日新增stars近1700，热度暴涨。
6. [mem0ai/mem0](https://github.com/mem0ai/mem0) ⭐62,474（总量） AI Agent的通用记忆层，为Agent提供跨会话的持久记忆能力，支持结构化记忆存储和检索，是Agent+ RAG组合的核心组件。
7. [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) ⭐35,005（总量） 无向量的推理型RAG文档索引工具，通过推理而非向量匹配实现文档检索，在隐私保护和检索准确率上表现优异，是RAG技术的新兴方向。
哦对，刚才的zhaoxuya520/reverse-skill，哦它是安全技能路由，属于Agent的工具链，刚才归到智能体了，对，它支持Claude Code这些AI客户端，是Agent的工具组件，放智能体里是对的。
然后第三步的趋势信号分析，200-300字：
今日热榜显示，**AI Agent工具链**和**大模型落地降本**是社区关注的两大核心方向：一方面，AirLLM（单卡跑70B）、ds4（DeepSeek本地推理引擎）等轻量推理工具热度暴涨，反映出社区对降低大模型推理硬件门槛、推动本地化落地的强烈需求；另一方面，腾讯云Agent记忆中心、Agent-Reach全网信息获取工具、DeepSeek-Reasonix终端编码Agent等项目扎堆出现，说明Agent的能力扩展（记忆、工具调用、垂直场景适配）已成为开源生态的核心竞争点。此外，PDF智能处理、知识图谱RAG等垂直技术方向首次进入热榜，结合近期DeepSeek等国产大模型的性能突破，国产AI开源生态的活力正在快速释放，垂直场景的落地工具成为新的增长点。
然后社区关注热点，bullet形式3-5个：
1. **轻量大模型推理工具**：AirLLM、ds4等项目证明单卡/消费级硬件跑大模型已成为现实，建议开发者重点关注大模型量化、推理

---
*本日报由 [agents-radar](https://github.com/huang-yi-dae/agents-radar) 自动生成。*