# AI 开源趋势日报 2026-08-04

> 数据来源: GitHub Trending + GitHub Search API（含 AI 与大数据 / 数据分析 / 数据挖掘趋势） | 生成时间: 2026-08-04 06:36 UTC

---

用户现在需要我生成一份AI开源趋势日报，首先得严格按照要求来，第一步先过滤，先看Trending里的16个，先筛掉非AI的，然后主题搜索里的122个也要筛，然后分类，再输出四个部分。
首先第一步过滤，先处理Trending榜：
首先看每个：
1. lyogavin/airllm：是70B大模型单4G GPU推理，AI相关，留
2. zhaoxuya520/reverse-skill：虽然是逆向的，但核心是AI驱动的安全技能路由，支持AI编码客户端，属于AI工具类？等下，要明确AI相关，它是AI赋能的渗透测试工具链，算AI相关？对，因为有AI自动路由、AI客户端支持，属于AI工具类？
3. firecrawl/pdf-inspector：PDF检测分类提取，是给AI处理文档用的？哦，它用于智能路由，属于AI数据处理工具？对，因为AI应用需要处理PDF，算AI基础工具里的文档处理？
4. esengine/DeepSeek-Reasonix：DeepSeek的终端AI编码代理，明显AI Agent，留
5. TencentCloud/TencentDB-Agent-Memory：AI Agent的记忆中枢，属于AI Agent/知识库类，留
6. microsoft/AI-For-Beginners：AI入门教程，属于AI教育，算AI基础工具？或者AI相关，留
7. microsoft/generative-ai-for-beginners：生成式AI入门教程，同上，留
8. donnemartin/system-design-primer：系统设计 primer，和AI无关，直接删
9. antirez/ds4：DeepSeek 4的本地推理引擎，明显AI基础工具（推理引擎），留
10. shiyu-coder/Kronos：金融领域的基础模型，属于大模型类，留
11. Panniantong/Agent-Reach：给AI Agent提供互联网视觉的CLI，属于AI Agent工具，留
12. Alishahryar1/free-claude-code：免费调用Claude Code等的终端工具，属于AI开发工具，留
13. iv-org/invidious：YouTube前端，和AI无关，删
14. livekit/agents：实时语音AI Agent框架，属于AI Agent类，留
15. usekaneo/kaneo：项目管理工具，和AI无关，删
16. jamiepine/voicebox：开源AI语音工作室，属于AI应用类，留
然后主题搜索里的122个，首先要排除和AI无关的？哦主题搜索都是带AI相关topic的，不过要确认，比如topic是vector-db、ai-agent、llm、llm-model、rag、data-mining、ml、big-data、data-analysis，这些都要筛，但首先要排除里面的非AI？比如有没有？哦看列表里都是AI相关的，不过要注意有没有蹭topic的？比如好像没有，不过先把和AI明确相关的留下，然后分类。
然后第二步分类，维度是五个：🔧 AI基础工具、🤖 AI智能体/工作流、📦 AI应用、🧠 大模型/训练、🔍 RAG/知识库。
现在开始分类，先分每个类别的：
首先🔧 AI基础工具（框架、SDK、推理引擎、开发工具、CLI）：
- lyogavin/airllm：推理引擎，单卡跑70B，今日+1085
- antirez/ds4：DeepSeek4本地推理引擎，支持Metal/CUDA/ROCm，今日+384
- Alishahryar1/free-claude-code：多模型终端调用工具，今日+278
- microsoft/AI-For-Beginners：AI入门12周教程，今日+1902
- microsoft/generative-ai-for-beginners：生成式AI入门21课教程，今日+775
- firecrawl/pdf-inspector：PDF智能检测提取工具，给AI应用用的，今日+1699？哦对，它用于AI的文档预处理，属于基础工具里的数据处理工具？
- esengine/DeepSeek-Reasonix？不，那个是Agent，归到Agent类。哦对，还有zhaoxuya520/reverse-skill？那个是AI驱动的安全技能路由包，属于AI工具？对，归到基础工具？或者应用？不，它是给安全人员用的AI工具链，算基础工具？等下，先理清楚：
然后🤖 AI智能体/工作流（Agent框架、自动化、多智能体）：
- esengine/DeepSeek-Reasonix：DeepSeek终端AI编码Agent，今日+883，主题搜索里也有，总星3w+
- TencentCloud/TencentDB-Agent-Memory：AI Agent团队级记忆中枢，今日+1090
- Panniantong/Agent-Reach：AI Agent互联网信息获取CLI，今日+1057
- livekit/agents：实时语音AI Agent框架，今日+148
- 还有主题搜索里的AI Agent类的，比如NousResearch/hermes-agent（总星22w+）、CherryHQ/cherry-studio（4.9w+）、HKUDS/nanobot（4.6w+）、zhayujie/CowAgent（4.6w+）、CopilotKit/CopilotKit（3.6w+）这些，都是Agent类的，要选代表。
然后📦 AI应用（具体应用产品、垂直场景解决方案）：
- shiyu-coder/Kronos：金融领域基础模型，垂直场景大模型应用？或者归大模型？哦它是金融市场的语言基础模型，属于垂直大模型，归大模型类？对，🧠大模型/训练类的话：
🧠 大模型/训练（模型权重、训练框架、微调工具）：
- antirez/ds4：哦刚才归基础工具？哦ds4是DeepSeek4的本地推理引擎，属于推理工具，归基础工具更对。那Kronos是金融基础模型，属于大模型类。
- 还有主题搜索里的，比如ollama/ollama（总星17w+，本地模型运行框架，属于基础工具？哦对，ollama是推理引擎，归基础工具。哦对，大模型类的话，比如有没有模型？哦Kronos是金融基础模型，还有没有？比如open-compass/opencompass是LLM评测平台，属于大模型训练/评测工具？归大模型类？
然后🔍 RAG/知识库（向量数据库、检索增强、知识管理）：
- 主题搜索里的vector-db类的，比如Mintplex-Labs/anything-llm（总星6.4w+，本地RAG Agent平台）、run-llama/llama_index（5.1w+，文档Agent平台）、milvus-io/milvus（4.5w+，向量数据库）、VectifyAI/PageIndex（3.5w+，无向量RAG）、cognee（2.9w+，Agent记忆知识图谱）、NirDiamant/RAG_Techniques（2.8w+，RAG技术教程）、weaviate/weaviate（1.6w+，向量数据库），这些都是RAG/知识库类的。
然后还有data-mining、ml、big-data、data-analysis这些topic的，比如tensorflow、pytorch这些是ML框架，归到🔧 AI基础工具里？对，因为它们是基础框架。还有scikit-learn、ultralytics这些也是基础工具。然后big-data的是数据基础，比如ClickHouse、Spark这些，属于AI的基础数据工具？归到🔧 AI基础工具？或者有没有单独的数据类？哦用户的分类里没有单独数据类，用户的分类是五个：基础工具、智能体、应用、大模型、RAG/知识库。哦对，用户的分类维度是给定的那五个，所以要把数据相关的归到对应类，比如数据处理工具归基础工具，数据分析工具如果是给AI用的？或者比如streamlit、gradio是AI应用开发工具，归基础工具？
哦对，用户的分类维度是固定的五个，所以要先符合：
现在先整理每个类别的代表项目，要每个类别3-8个，优先Trending里的，然后主题搜索里的高星代表。
然后第三步输出报告：
首先今日速览，要3-5句话，概括今天的动向：比如今天AI开源领域热度集中在AI Agent工具链、轻量级大模型推理、RAG/知识库三个方向，多款面向开发者的AI基础设施项目上榜，其中AI Agent记忆、终端编码Agent、低门槛大模型推理是今日最热方向，同时教育类AI教程、垂直领域金融大模型也有较高关注，反映出社区从“做大模型”向“做易用的AI工具和应用”转型的趋势。
然后各维度热门项目，每个类别列3-8个，每个要项目名、链接、stars（总量+今日新增，Trending的有今日新增，主题搜索的只有总量）、一句话说明。
然后趋势信号分析，200-300字，要提炼：比如第一，AI Agent工具链迎来爆发，今日Trending榜近半数项目与Agent相关，涵盖终端编码、记忆管理、互联网信息获取、实时语音等场景，说明Agent已经从概念走向全场景落地，工具链完善是当前核心诉求；第二，轻量级大模型推理技术持续受关注，AirLLM实现70B模型单4G GPU运行、ds4支持DeepSeek4多硬件本地推理，反映社区对降低大模型部署门槛、实现端侧/边缘侧推理的需求强烈；第三，RAG/知识库技术向“轻量化、无向量、多模态”演进，PageIndex实现无向量RAG、cognee用知识图谱做Agent记忆，说明RAG正在从传统向量检索向更高效的知识管理方案迭代；第四，教育类AI内容持续热门，微软两套AI入门教程上榜，反映AI入门需求旺盛，社区对普惠AI教育的关注度高。哦还要关联近期事件？比如近期DeepSeek系列模型发布，所以ds4、DeepSeek-Reasonix上榜，还有AI coding工具的流行，所以Claude Code相关的工具、编码Agent热门。
然后社区关注热点，3-5个bullet，给具体项目和理由：
1. AirLLM（lyogavin/airllm）：今日新增1085星，实现70B大模型单4GB GPU推理，大幅降低大模型部署硬件门槛，适合个人开发者和小团队低成本跑大模型，技术路径有参考价值。
2. DeepSeek-Reasonix（esengine/DeepSeek-Reasonix）：DeepSeek原生终端编码Agent，总星超3万，今日新增883星，针对DeepSeek模型优化前缀缓存稳定性，支持长时间运行，是当前最热的AI编码Agent工具之一，适合开发者提升编码效率。
3. PageIndex（VectifyAI/PageIndex）：总星3.5万，实现无向量RAG方案，存储节省97%，在个人设备上即可运行，解决了传统RAG存储成本高、部署难的问题，是RAG技术的重要创新方向。
4. TencentDB-Agent-Memory（TencentCloud/TencentDB-Agent-Memory）：腾讯开源的团队级AI Agent记忆中枢，今日新增1090星，将对话、文档、代码转化为可复用的记忆资产，解决AI Agent记忆孤岛问题，适合企业级Agent落地。
5. Kronos（shiyu-coder/Kronos）：金融领域基础大模型，针对金融市场语言优化，今日新增200星，填补了金融垂直领域基础模型的空白，适合金融量化、分析等场景的AI应用落地。
哦等下，还要注意过滤的时候，Trending里的非AI项目要删掉，比如system-design-primer、invidious、kaneo这三个要删掉，其他的Trending项目都是AI相关的？等下看zhaoxuya520/reverse-skill，是逆向渗透的，但是是AI驱动的，属于AI工具，所以要留，说明里是AI赋能的安全工具链，属于AI应用？或者基础工具？对，归到📦 AI应用？或者🔧 AI基础工具？哦它是工具链，属于基础工具里的垂直领域工具？
等下再核对过滤：
Trending里的16个，排除的3个：donnemartin/system-design-primer（通用系统设计，无AI关联）、iv-org/invidious（YouTube前端，无AI）、usekaneo/kaneo（通用项目管理，无AI），剩下的13个都是AI相关的，对的。
然后主题搜索里的122个，都是带AI相关topic的，所以都是AI相关的，不用删？哦有没有蹭topic的？比如好像没有，都是和AI、ML、数据相关的，所以都算。
然后分类的时候，要注意一个项目可以归多类，但优先最主要类别。比如ollama是推理引擎，归🔧 AI基础工具；AnythingLLM是RAG平台，归🔍 RAG/知识库；AutoGPT是Agent框架，归🤖 AI智能体/工作流；Kronos是大模型，归🧠 大模型/训练；MoneyPrinterTurbo是AI生成短视频的应用，归📦 AI应用。
现在整理各维度的项目，要选Trending里的优先，然后主题搜索里的高星代表：
首先🔧 AI基础工具（框架、SDK、推理引擎、开发工具、CLI）：
1. [lyogavin/airllm](https://github.com/lyogavin/airllm) ⭐0（今日+1085）：轻量级大模型推理工具，支持70B参数模型在单张4GB GPU上运行，大幅降低大模型推理硬件门槛，今日因技术突破登上热榜。
2. [antirez/ds4](https://github.com/antirez/ds4) ⭐0（今日+384）：DeepSeek 4系列模型的本地推理引擎，支持Metal、CUDA、ROCm多硬件平台，可实现Flash和PRO版本的本地高效推理，适配不同硬件环境的DeepSeek模型部署需求。
3. [microsoft/AI-For-Beginners](https://github.com/microsoft/AI-For-Beginners) ⭐0（今日+1902）：微软出品的12周24节AI入门全套教程，覆盖AI基础概念、机器学习、深度学习等核心内容，适合零基础开发者入门AI，今日热度极高。
4. [microsoft/generative-ai-for-beginners](https://github.com/microsoft/generative-ai-for-beginners) ⭐0（今日+775）：微软出品的生成式AI入门教程，共21节课，涵盖LLM原理、RAG、Agent等核心生成式AI技术，配套实操代码，是生成式AI入门的优质资源。
5. [firecrawl/pdf-inspector](https://github.com/firecrawl/pdf-inspector) ⭐0（今日+1699）：Rust编写的高性能PDF处理工具，可智能识别扫描件/文本PDF、提取文本，为AI文档处理、RAG知识库构建提供高效的预处理能力，今日因PDF处理需求增长上榜。
6. [Alishahryar1/free-claude-code](https://github.com/Alishahryar1/free-claude-code) ⭐0（今日+278）：多AI编码模型的免费调用CLI工具，支持Claude Code、Codex、Pi等主流AI编码助手，可实现语音调用、跨端使用，降低开发者使用AI编码工具的成本。
7. [ollama/ollama](https://github.com/ollama/ollama) ⭐177,729（主题搜索）：本地大模型运行框架，支持一键部署Kimi、DeepSeek、Qwen等数十款主流开源模型，是当前最流行的本地大模型运行工具之一，社区活跃度高。
8. [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow) ⭐196,781（主题搜索）：谷歌开源的工业级机器学习框架，支持从研究到生产的全流程ML开发，是机器学习领域的基础设施级工具，生态成熟。
哦对，这个类别够了，8个，有Trending的也有主题搜索的高星。
然后🤖 AI智能体/工作流（Agent框架、自动化、多智能体）：
1. [esengine/DeepSeek-Reasonix](https://github.com/esengine/DeepSeek-Reasonix) ⭐30,222（今日+883）：DeepSeek原生终端AI编码Agent，针对DeepSeek模型优化前缀缓存稳定性，支持长时间运行处理复杂编码任务，是当前最受关注的AI编码Agent工具之一。
2. [TencentCloud/TencentDB-Agent-Memory](https://github.com/TencentCloud/TencentDB-Agent-Memory) ⭐0（今日+1090）：腾讯开源的团队级AI Agent记忆中枢，可将对话、文档、代码转化为可共享、可治理的Chat Memory、Skill、LLM-Wiki、Code-Graph四类记忆资产，解决AI Agent的记忆孤岛问题，适合企业级Agent落地。
3. [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) ⭐0（今日+1057）：AI Agent互联网信息获取CLI工具，支持一键读取Twitter、Reddit、YouTube、GitHub等平台的公开内容，零API成本，为Agent提供全互联网的感知能力。
4. [livekit/agents](https://github.com/livekit/agents) ⭐0（今日+148）：实时音视频AI Agent开发框架，支持构建带语音、视频交互能力的实时Agent，适合客服、会议助手等实时交互场景。
5. [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) ⭐225,052（主题搜索）：开源通用AI Agent框架，支持多模型、多工具调用、自我进化，是当前Star数最高的Agent框架之一，社区生态完善。
6. [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) ⭐49,373（主题搜索）：AI生产力工作室，内置智能聊天、自主Agent、300+预置助手，统一对接主流大模型，适合个人和团队快速搭建AI Agent应用。
7. [HKUDS/nanobot](https://github.com/HKUDS/nanobot) ⭐46,594（主题搜索）：超轻量级开源个人AI Agent框架，支持WebUI、工具调用、记忆、MCP、多Agent工作流，可一键部署，适合个人用户搭建私有Agent。
8. [CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit) ⭐36,438（主题搜索）：前端Agent开发框架，支持React、Angular、移动端等多端构建AI Agent应用，是AG-UI协议的发起方，适合前端开发者快速集成Agent能力。
这个类别够了，8个，有Trending的也有高星主题项目。
然后📦 AI应用（具体应用产品、垂直场景解决方案）：
1. [zhaoxuya520/reverse-skill](https://github.com/zhaoxuya520/reverse-skill) ⭐0（今日+2446）：AI赋能的逆向/渗透测试技能路由包，支持AI自动路由工具链、按需自举工具链、自动进化经验库，兼容Claude Code、Cursor等主流AI编码客户端，今日新增Stars位居Trending榜第二，是安全领域AI工具的创新应用。
2. [shiyu-coder/Kronos](https://github.com/shiyu-coder/Kronos) ⭐0（今日+200）：金融领域专用基础大模型，针对金融市场语言、交易逻辑优化，可用于量化分析、投研报告生成等金融场景，填补了金融垂直领域基础模型的空白。
3. [jamiepine/voicebox](https://github.com/jamiepine/voicebox) ⭐0（今日+412）：开源AI语音工作室，支持语音克隆、语音转写、AI配音等功能，适合内容创作者、播客制作者等群体快速生成语音内容，降低语音内容生产成本。
4. [Panniantong/Agent-Reach]？不，那个归Agent了。哦还有[shiyu-coder/Kronos]？哦还有[hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) ⭐42,854（主题搜索）：AI自动生成PPT工具，可根据主题或文档一键生成带动画、图表、音频旁白的原生PPT，支持自定义模板，大幅提升PPT制作效率。
5. [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) ⭐101,468（主题搜索）：AI自动生成短视频工具，根据关键词或主题一键生成高清短视频，自动匹配素材、字幕、配音，适合自媒体、营销等场景的内容生产。
6. [666ghj/BettaFish](https://github.com/666ghj/BettaFish) ⭐41,933（主题搜索）：多Agent舆情分析工具，可自动爬取全网舆情数据，分析舆情走向，辅助决策，适合政府、企业的舆情监控场景。
7. [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) ⭐59,980（主题搜索）：LLM驱动的多市场股票智能分析系统，支持多源行情、实时新闻、决策看板，可零成本定时运行，适合个人投资者和量化团队。
哦对，这个类别也够了，7个，都是具体的应用产品。
然后🧠 大模型/训练（模型权重、训练框架、微调工具、评测平台）：
1. [shiyu-coder/Kronos](https://github.com/shiyu-coder/Kronos) ⭐0（今日+200）：金融领域基础大模型，针对金融场景优化训练，支持投研、量化、风控等垂直任务，是金融领域少数的开源基础模型，今日因垂直大模型关注度提升上榜。
2. [open-compass/opencompass](https://github.com/open-compass/opencompass) ⭐7,269（主题搜索）：开源LLM评测平台，支持100+数据集、覆盖LLaMA、DeepSeek、Qwen等上百款主流模型的评测，是当前最流行的LLM评测工具之一，用于模型选型、性能对比。
3. [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) ⭐4,437（主题搜索）：Apple Silicon专用LLM推理训练课程，从零搭建适配苹果芯片的tiny vLLM，适合系统工程师学习端侧LLM推理和微调技术。
4. [llm-jp/awesome-japanese-llm](https://github.com/llm-jp/awesome-japanese-llm) ⭐1,423（主题搜索）：日语LLM资源汇总，收录日语大模型、微调工具、数据集等资源，适合日语NLP开发者和小语种大模型研究者。
5. [chrisliu298/awesome-llm-unlearning](https://github.com/chrisliu298/awesome-llm-unlearning) ⭐617（主题搜索）：大模型机器卸载资源汇总，收录大模型遗忘、隐私删除相关的论文、工具和实现，适合大模型合规、隐私保护场景的研究者和开发者。
哦这个类别5个够了，因为大模型类的Trending里的不多，主要是主题搜索里的。
然后🔍 RAG/知识库（向量数据库、检索增强、知识管理、记忆系统）：
1. [Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm) ⭐64,311（主题搜索）：本地优先的RAG Agent平台，支持多模型、多向量数据库、文档解析，可将本地文档转化为可交互的知识库，是当前最流行的开源RAG应用之一，总星超6万。
2. [run-llama/llama_index](https://github.com/run-llama/llama_index) ⭐51,361（主题搜索）：领先的文档Agent和RAG平台，支持多模态文档解析、检索增强、Agent工作流，提供从数据摄入到Agent应用的全链路RAG能力，生态完善。
3. [milvus-io/milvus](https://github.com/milvus-io/milvus) ⭐45,501（主题搜索）：云原生高性能向量数据库，支持十亿级向量的毫秒级检索，是当前大规模RAG应用的首选向量数据库，生态成熟，企业级用户多。
4. [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) ⭐35,002（主题搜索）：无向量RAG方案，通过页面级索引和推理实现检索增强，相比传统向量RAG节省97%存储空间，可在个人设备上运行，是RAG技术的重要创新方向。
5. [topoteretes/cognee](https://github.com/topoteretes/cognee) ⭐29,745（主题搜索）：AI Agent记忆平台，基于知识图谱实现Agent的长期记忆管理，支持跨会话记忆共享，解决传统RAG记忆碎片化问题，适合多Agent系统的记忆统一管理。
6. [NirDiamant/RAG_Techniques](https://github.com/NirDiamant/RAG_Techniques) ⭐28,928（主题搜索）：高级RAG技术教程库，收录了20+种主流RAG优化技术的实现和教程，包括混合检索、重排序、Agentic RAG等，是RAG开发者的优质学习资源。
7. [infiniflow/ragflow](https://github.com/infiniflow/ragflow) ⭐86,770（主题搜索）：深度结合Agent能力的RAG引擎，支持深度文档解析、多模态检索、Agent工作流，提供比传统RAG更精准的上下文能力，适合企业级RAG应用落地。
哦这个类别7个，够了，都是RAG/知识库类的代表。
然后今日速览，要3-5句话，准确概括：
> 今日AI开源领域热度呈现“工具链爆发、门槛下探、场景落地”三大特征：Trending榜近7成项目与AI Agent、轻量推理、RAG相关，其中AI编码Agent、Agent记忆管理、低门槛大模型推理是今日最受关注的方向；主题搜索中RAG、Agent框架、LLM工具包等项目持续高热，反映社区从“追逐大模型参数”转向“打磨易用、低成本的AI落地工具”；此外微软AI入门教程、金融垂直大模型等项目的上榜，也体现出AI普惠化、垂直场景深耕的趋势。
然后趋势信号分析，200-300字：
> 从今日热榜可提炼出三类明确趋势信号：第一，AI Agent工具链进入全场景落地期，今日Trending榜覆盖终端编码、记忆管理、互联网感知、实时语音等Agent全链路场景，主题搜索中Agent框架、Agent技能库等项目占比近3成，说明Agent已经从 Demo 阶段走向生产可用，工具链的完善是当前社区的核心投入方向；第二，轻量级大模型推理技术成为新热点，AirLLM实现70B模型单4GB GPU运行、ds4支持DeepSeek4多硬件本地推理，均获得极高关注，反映出社区对降低大模型部署门槛、实现端侧/边缘侧推理的需求持续爆发，与近期DeepSeek等高性能开源模型发布的行业事件高度关联；第三，RAG技术向“去向量化、知识化”演进，PageIndex无向量RAG、cognee知识图谱记忆等创新方案上榜，说明传统向量检索的局限性正在被突破，RAG正在向更高效、更智能的知识管理方向迭代。
然后社区关注热点，3-5个bullet：
- **AirLLM（lyogavin/airllm）**：今日新增1085星，首次实现70B参数大模型在单张4GB GPU上运行，硬件门槛降低一个数量级，为个人开发者、小型团队低成本使用大模型提供了可行路径，技术复用价值高。
- **DeepSeek-Reasonix（esengine/DeepSeek-Reasonix）**：总星超3万，今日新增883星，是首款针对DeepSeek模型深度优化的终端编码Agent，通过前缀缓存优化实现长时间稳定运行，适配国内开发者使用DeepSeek编码的需求，是AI coding工具的热门选择。
- **PageIndex（V

---
*本日报由 [agents-radar](https://github.com/huang-yi-dae/agents-radar) 自动生成。*