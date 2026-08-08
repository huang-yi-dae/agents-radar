# OpenClaw 生态日报 2026-08-08

> Issues: 500 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-08-08 01:18 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [NanoBot](https://github.com/HKUDS/nanobot)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [NanoClaw](https://github.com/qwibitai/nanoclaw)
- [NullClaw](https://github.com/nullclaw/nullclaw)
- [IronClaw](https://github.com/nearai/ironclaw)
- [LobsterAI](https://github.com/netease-youdao/LobsterAI)
- [TinyClaw](https://github.com/TinyAGI/tinyclaw)
- [Moltis](https://github.com/moltis-org/moltis)
- [CoPaw](https://github.com/agentscope-ai/CoPaw)
- [ZeptoClaw](https://github.com/qhkm/zeptoclaw)
- [EasyClaw](https://github.com/gaoyangz77/easyclaw)

---

## OpenClaw 项目深度报告

### 1. 今日速览

过去 24 小时，OpenClaw 项目保持高活跃度，共产生 500 条 Issue 更新（471 条活跃，29 条关闭）和 500 条 PR 更新（411 条待合并，89 条已合并/关闭）。今日无新版本发布，项目重点集中在稳定性修复与核心架构打磨上。值得关注的是，多个 P0/P1 级严重问题（如 Agent DB 迁移失败、内存泄漏、token 统计膨胀导致过早压缩）仍在等待修复或处于待审查状态，而 CI 维护与测试覆盖率的提升成为今日 PR 的显著方向。社区对会话状态管理、上下文窗口优化及安全边界的讨论热度不减，整体项目健康度处于“高活跃、高积压”状态。

---

### 2. 版本发布

今日无新版本发布。

---

### 3. 项目进展

今日合并/关闭的 PR 较少，大多处于提交或审查阶段。已关闭的 PR 中，`#120397`（test(agent): split run lifecycle coverage）通过拆分测试文件解决了 CI lint 超限问题，保障了测试基础设施的稳定。`#120400`（fix(agents): carry complete tool args）因“过多 PR”被关闭，但其所指问题——Discord 草稿中工具参数丢失——仍在处理中。

其余进展集中在大量“进行中”的修复与功能 PR，主要围绕以下方向：
- **CI 与代码质量**：`#120399`、`#120401` 均针对 main 分支 lint 失败进行修复，且修复方式相似（拆分/移动测试文件），反映出近期合并的 PR 频繁触发代码行数超限问题。
- **可靠性修复**：`#120404` 修复内存刷写时的 outputSchema 不匹配问题；`#119778` 为 transcript 重建期间的 `chat.send` 返回可重试错误。
- **平台适配**：`#120389` 为 Android 端增加会话回复通知；`#120398` 修复 Linux 上服务管理工具子进程未随超时终止的问题。
- **模型回退逻辑**：`#120148` 修复模型回退链中最后一个候选返回空补全时被误判为成功的问题，该 PR 直接关联 Issue `#120132`。

整体而言，项目在维护 CI 稳定性的同时，正在加固多个已知的稳定性短板，但大量关键修复仍待合并。

---

### 4. 社区热点

- **[#116277 DeepSeek v4 Flash 静默回复失败](https://github.com/openclaw/openclaw/issues/116277)（129 条评论，已关闭）**
  这是过去 24 小时讨论最激烈的 Issue。问题为模型静默失败并发送通用回退消息 `"No reply was generated..."`，引发了关于 LLM 故障诊断、可观测性以及容错机制的大规模讨论。社区对“静默失败”的容忍度极低，普遍认为此类情况应直接显式报错而非提供无意义回退。该 Issue 已被关闭，但解决方案的落地效果值得关注。

- **[#116201 Realtime voice 会话状态无界保留](https://github.com/openclaw/openclaw/issues/116201)（59 条评论）**
  关于实时语音会话中 provider 与 consult 状态资源边界缺失的讨论热度颇高。用户关注慢速、突发性 provider 行为下内存暴涨的风险，并质疑现有“条目计数”限制的充分性。

- **[#7707 内存信任标签功能请求](https://github.com/openclaw/openclaw/issues/7707)（29 条评论）**
  该长期存在的功能请求持续获得关注，核心诉求是防止记忆投毒攻击——即通过网页抓取、第三方技能等不可信来源注入恶意指令。此议题涉及 AI 安全，具备较高的社区共鸣。

- **[#91588 网关内存泄漏（350MB 至 15.5GB）](https://github.com/openclaw/openclaw/issues/91588)（22 条评论）**
  一个明确标记为 P0 的严重问题，导致重复的 OOM 崩溃。讨论集中于 leak 根因的分析与复现，用户期待快速修复。

**核心诉求分析**：社区热点高度集中于“可靠性”与“可信度”。静默失败、内存泄漏、状态丢失是用户最难以接受的故障模式，而对记忆安全与来源信任的讨论则反映了对 AI 智能体长期自主运行的安全担忧。

---

### 5. Bug 与稳定性

按严重程度列出今日活跃的高优先级 Bug：

| 严重级别 | Issue 链接 | 问题摘要 | 状态 |
| :--- | :--- | :--- | :--- |
| **P0** | [#119263](https://github.com/openclaw/openclaw/issues/119263) | Agent DB v14->v15 迁移失败（`no such column: entry_valid`），导致网关拒绝启动。 | 有相关 PR 链接，待修复 |
| **P0** | [#91588](https://github.com/openclaw/openclaw/issues/91588) | 网关内存泄漏，RSS 从 350MB 涨至 15.5GB 导致 OOM 崩溃。 | 无关联 fix PR，仍开启 |
| **P0** | [#101290](https://github.com/openclaw/openclaw/issues/101290) | CLI 启动预检可损坏正在运行的网关的实时状态数据库（`database disk image is malformed`）。 | 无关联 fix PR，仍开启 |
| **P0** | [#118772](https://github.com/openclaw/openclaw/issues/118772) | 2026.7.1+ 版本 `sessionEntry.totalTokens` 膨胀，导致在上下文窗口利用率 4-8% 时过早压缩（数据丢失）。 | 有相关 PR 链接，待修复 |
| **P1** | [#119087](https://github.com/openclaw/openclaw/issues/119087) | 网关冷启动在 1 vCPU 容器上回退约 2.5 倍（回归）。 | 无关联 fix PR，仍开启 |
| **P1** | [#99586](https://github.com/openclaw/openclaw/issues/99586) | 网关相关操作后，运行时工具表面返回空白 body。 | 无关联 fix PR，仍开启 |
| **P1** | [#116277](https://github.com/openclaw/openclaw/issues/116277) | DeepSeek v4 Flash 静默失败，发送通用回退消息。 | **已关闭** |
| **P1** | [#75380](https://github.com/openclaw/openclaw/issues/75380) | `provider-payload.jsonl` 和 `cache-trace.jsonl` 日志无界增长。 | 无关联 fix PR，仍开启 |
| **P1** | [#109145](https://github.com/openclaw/openclaw/issues/109145) | 网关 HTTP 服务器监听但不接受连接。 | 无关联 fix PR，仍开启 |
| **P1** | [#86684](https://github.com/openclaw/openclaw/issues/86684) | `sessions_yield` 子代理唤醒可导致父分支在低上下文用量下被压缩（回归）。 | 有相关 PR 链接 |

此外，仍有大量 P1 级 Bug（如 LINE 通道消息丢失 `#86012`、Cron 输出幻觉 `#49876`、MCP 工具未注入子代理 `#85030` 等）长期处于待维护者审查状态。

---

### 6. 功能请求与路线图信号

- **记忆安全与来源信任** (`#7707`)：该请求已持续数月，社区关注度高。考虑到安全议题优先级，后续版本可能引入按来源的信任标签机制，以缓解记忆投毒风险。
- ****上下文压缩策略优化**：** 多个 Issue（`#22438`, `#67419`, `#118772`）涉及 bootstrap 文件过度注入、总 token 统计膨胀等问题，核心诉求是“按需加载”与“精确统计”。PR `#89040`（避免 bootstrap 时阻塞事件循环）与这些诉求直接相关，可视为该方向的“基础设施修复”。
- **多代理协作增强** (`#35203`, `#81061`)：能力画像、共享黑板的 RFC 及预路由 Hook 功能请求持续有讨论但进展缓慢，这属于路线图中的长期演进方向。
- **可观测性与成本控制**：`#13219`（按模型记录用量）和 `#75380`（日志轮转）体现了用户对细粒度成本核算与数据持久化管理的需求，可能会被整合进后续运维功能中。
- **会话生命周期改善**：`#45608`（`/new` 与每日重置前执行记忆刷写）与 `#99583`（智能会话标题）均旨在优化会话的状态流转体验，存在被纳入短期迭代的可能。

---

### 7. 用户反馈摘要

- **对“静默失败”的零容忍**（来自 `#116277` 等）：当模型无输出或因故未回复时，用户急切希望看到明确错误而非通用回退文本。用户更倾向于“明确失败”而非“假装成功”。
- **上下文膨胀的普遍痛点**（来自 `#67419`）：多轮对话中 bootstrap 文件的重复注入导致 20-30% 的 token 被浪费，用户认为这是显性的成本与技术双输问题。
- **对数据损坏的高度警惕**（来自 `#101290`）：用户报告了状态数据库损坏时的困惑与恐惧，尤其是在“无断电、无崩溃”的背景下。这严重打击了用户信任。
- **对工具链细节的不满**（来自 `#51429`）：一名用户发现代码中硬编码了他人（wangtao）的工作路径并被合并发布，引发了“如何通过代码审查”的质疑，反映了用户对仓库管理质量的关注。
- **对测试与 QA 流程的认可与期待**（来自 `#120397` 等）：多条 PR 专门拆分行数过多的测试文件以满足 lint 要求，侧面反映项目代码库的规模在扩大，且 CI 门禁在有效约束代码质量，但用户/贡献者希望这些约束更高效（如分片并行）。

---

### 8. 待处理积压

以下为长期未关闭的、具备较高优先级或社区关注度的重要议题，提醒维护者关注：

| 类型 | 链接 | 摘要 | 挂起时长（约） |
| :--- | :--- | :--- | :--- |
| Issue | [#7707](https://github.com/openclaw/openclaw/issues/7707) | 内存信任标签（功能请求） | 6 个月 |
| Issue | [#51429](https://github.com/openclaw/openclaw/issues/51429) | 代码中硬编码他人工作路径（Bug） | 5 个月 |
| Issue | [#49876](https://github.com/openclaw/openclaw/issues/49876) | Cron 会话在工具失败时输出幻觉结果（P1, 安全） | 5 个月 |
| Issue | [#91588](https://github.com/openclaw/openclaw/issues/91588) | 网关内存泄漏 / OOM（P0） | 2 个月 |
| Issue | [#85030](https://github.com/openclaw/openclaw/issues/85030) | MCP 工具未注入子代理（P1） | 2.5 个月 |
| Issue | [#75380](https://github.com/openclaw/openclaw/issues/75380) | 诊断日志无界增长（P1） | 3 个月 |
| PR | [#89040](https://github.com/openclaw/openclaw/pull/89040) | 避免 bootstrap 时事件循环阻塞（perf） | 2 个月 |
| PR | [#116489](https://github.com/openclaw/openclaw/pull/116489) | 安装策略警告需确认（安全） | 9 天 |

---

## 横向生态对比

## 个人 AI 智能体开源生态横向分析报告 — 2026-08-08

---

### 1. 生态全景

个人 AI 智能体开源生态正处于"高活跃、高积压"的密集迭代期，核心赛道已从"功能堆叠"转向"可靠性打磨"，可靠性（静默失败、内存泄漏、状态丢失）与可信度（记忆安全、来源信任、成本可观测）成为跨项目的共同攻坚方向。以 OpenClaw 为轴的"Claw 系"衍生生态（NanoBot、Zeroclaw、PicoClaw、NanoClaw、IronClaw 等）已形成明显的家族化发展格局，各自在不同维度探索差异化路线，同时围绕 Agent Plugins 1.0、MCP 标准化、可观测性等方向开始出现收敛信号。项目普遍面临"功能迭代快于质量巩固"的挑战，P0/P1 级 Bug 积压和长尾 PR 无人评审是共同瓶颈。

---

### 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | 合并/关闭 PR | Release | 健康度评估 |
|:---|:---:|:---:|:---:|:---:|:---|
| **OpenClaw** | 500（471 活跃） | 500（411 待合并） | 89 | 无 | ⚠️ 高活跃、高积压；多个 P0 未修复 |
| **NanoBot** | ~20 | 11（合并/关闭） | 11 | 无 | ✅ 高效迭代，修复及时 |
| **Zeroclaw** | 45 活跃 | 47 待合并 | 3 | 无 | ⚠️ 密集安全加固期，响应快但合并慢 |
| **PicoClaw** | 4 | 14（2 关闭） | 2 | 无 | ✅ 健康，修复速度跟上报告速度 |
| **NanoClaw** | 0 | 10（8 待合并） | 2 | 无 | ✅ 中低活跃，稳定迭代 |
| **NullClaw** | — | — | — | — | 💤 无活动 |
| **IronClaw** | 50（36 活跃） | 50 | 12 | 无 | ⚠️ 快速迭代，文档漂移与幻觉问题突出 |
| **LobsterAI** | 7（3 关闭） | 7（6 合并） | 6 | ✅ 2026.8.7 | ✅ 节奏良好，社区响应快 |
| **TinyClaw** | — | — | — | — | 💤 无活动 |
| **Moltis** | — | — | — | — | 💤 无活动 |
| **CoPaw** | 31（20 活跃） | 47（21 合并/关闭） | 21 | ✅ v2.1.0-beta.2 | ⚠️ Beta 迭代高峰，Windows 问题集中 |
| **ZeptoClaw** | — | — | — | — | 💤 无活动 |
| **EasyClaw** | — | — | — | — | 💤 无活动 |

---

### 3. OpenClaw 在生态中的定位

**生态核心与参照基准**：OpenClaw 以每日 500 条 Issue + 500 条 PR 的流量稳居生态绝对核心，其 issue 讨论量（如 #116277 DeepSeek 静默失败获 129 条评论）即超过多数项目整日全部活动。NanoBot、Zeroclaw、PicoClaw、NanoClaw 均明确以 OpenClaw 为兼容目标（如 NanoBot 微信通道"对齐 OpenClaw 2.4.6 协议"），事实上形成了以 OpenClaw  API/协议为标准的"事实标准"生态。

**优势**：社区规模与生态辐射力无可匹敌；渠道覆盖最广（Discord、Telegram、微信、Android 等）；问题反馈量级足够大，能快速暴露边缘场景缺陷。

**技术路线差异**：OpenClaw 采用单体核心 + 插件扩展的架构路线，以 Python 为主力语言，强调开箱即用的多平台覆盖。相比之下，Zeroclaw 更侧重 Rust 性能路线（已实施 workspace 级 `forbid(unsafe_code)` 计划），IronClaw 偏向 Rust + 多租户沙箱安全路线（Docker/Railway 租户级隔离），PicoClaw 则走 Go 轻量路线。三者分别在性能安全、多租户隔离和部署轻量化上寻求差异化。

**社区规模对比**：OpenClaw 日活 Issue/PR 量约为 Zeroclaw 的 10 倍、IronClaw 的 5 倍、NanoBot 的 25 倍，处于断崖式领先。但活跃度并非唯一指标——NanoBot 合并效率（11 条 PR 合并）与 Zeroclaw 对 P1 安全 Bug 的当日响应（5 条 SOP 相关 Bug 全部当日配 PR）显示出更敏捷的治理能力。

**主要短板**：P0 级问题积压（DB 迁移失败、内存泄漏、CLI 损坏数据库）和"过多 PR"关闭策略（如 #120400）可能流失贡献者；token 统计膨胀与过早压缩问题（#118772）直接影响核心体验，作为生态基座亟需优先解决。

---

### 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|:---|:---|:---|
| **静默失败/错误可观测性** | OpenClaw（#116277 静默回复）、IronClaw（Agent 幻觉状态）、NanoBot（token 消耗审计 #5266） | 要求显式报错而非通用回退；要求提供细粒度调用日志与成本审计 |
| **记忆安全与来源信任** | OpenClaw（#7707 内存信任标签）、NanoBot（#5278 会话历史隔离、#5279 迁出工作区）、Zeroclaw（#8424 工作区 forbidden paths） | 防止记忆投毒与数据越权读取，需要按来源的信任分级机制 |
| **上下文/token 膨胀控制** | OpenClaw（#118772 token 膨胀、#67419 bootstrap 过度注入）、IronClaw（#6989 token 计费 bug）、PicoClaw（#3321 prefix caching 优化） | 精确统计、按需加载、避免过早压缩；降低推理成本 |
| **MCP 生态标准化** | CoPaw（#6732 MCP 工具周期性失效）、PicoClaw（#3302 MCP OAuth 2.1）、Zeroclaw（#9810 Agent Plugins 1.0） | MCP 鉴权、注册状态自愈、插件格式统一 |
| **Agent 循环/Doom-loop 防护** | CoPaw（#6116 重复工具调用 6 次）、OpenClaw（Cron 输出幻觉 #49876） | 工具调用循环检测与熔断机制 |
| **渠道体验一致性** | PicoClaw（#3307 Telegram 会话管理）、OpenClaw（LINE 消息丢失 #86012）、CoPaw（Telegram/WeChat 差异） | Web UI 与 IM 渠道功能对齐、多渠道行为一致性 |
| **对话/会话持久化与迁移** | OpenClaw（#119263 Agent DB 迁移失败）、NanoBot（#5280 会话归档）、IronClaw（#7380 持久化兼容性检查） | 数据迁移的可靠性保障、版本兼容性验证 |

---

### 5. 差异化定位分析

| 项目 | 核心定位 | 技术栈 | 目标用户 | 关键差异点 |
|:---|:---|:---|:---|:---|
| **OpenClaw** | 全功能通用智能体框架 | Python | 个人开发者、企业试点 | 生态最广、渠道覆盖最全；单体核心 + 插件 |
| **NanoBot** | 轻量级个人助手 | Go（推断） | 个人用户、小团队 | 强调低资源占用、会话隔离、插件标准化；对 OpenClaw 协议兼容 |
| **Zeroclaw** | 安全优先的 Rust 智能体 | Rust | 安全敏感型企业、高级开发者 | workspace 级 unsafe 禁令、SOP 机制、零配置声明式任务 |
| **PicoClaw** | 极简轻量部署 | Go | 边缘部署、嵌入式 | 最小化依赖、快速启动；渠道扩展活跃 |
| **NanoClaw** | 渠道适配层/技能市场 | TypeScript（推断） | OpenClaw 生态用户 | ChannelAdapter v2 架构、Utility skills 市场 |
| **IronClaw** | 多租户企业级智能体 | Rust | 企业级多租户场景 | 租户+用户级沙箱隔离、Doc-Truth 文档验证管线 |
| **LobsterAI** | 桌面客户端 / IDE 集成 | Electron | Windows/macOS 桌面用户 | Cowork 对话搜索、Windows 安装器、OpenClaw 配置管理 |
| **CoPaw** | 多协议 ACP 代理 | Python（推断） | 多通道/多工作区用户 | ACP 协议深度、ReMe 记忆系统、中文社区需求响应 |

---

### 6. 社区热度与成熟度

**快速迭代期（功能推进为主，beta 阶段）**：CoPaw（v2.1.0-beta.2，Windows 稳定性问题集中暴露）

**功能与质量并行期**：OpenClaw（功能丰富但 P0 积压）、IronClaw（功能迭代快 + 文档漂移问题）

**质量巩固期（稳定性/安全加固为主）**：Zeroclaw（5 条 SOP P1 Bug 当日全部配修复 PR，安全加固密度高）、NanoBot（11 条 PR 合并，会话隔离/微信通道加固）

**稳定迭代期（小步快跑，无重大事故）**：NanoClaw、PicoClaw、LobsterAI（新版本发布节奏健康）

**低活跃/休眠**：NullClaw、TinyClaw、Moltis、ZeptoClaw、EasyClaw

**分层结论**：Claw 系核心（OpenClaw）处于"高活跃但治理承压"状态，而外围项目（NanoBot、Zeroclaw）在特定方向（安全、轻量、渠道）上以更高的敏捷度探索可行路线。LobsterAI 的桌面端切入为生态补充了端侧价值。

---

### 7. 值得关注的趋势信号

**① "静默失败"零容忍成为社区共识。** 从 OpenClaw #116277 的 129 条讨论到 IronClaw 的 Agent 幻觉报告，用户对"假装成功"的接受度降至冰点。对 AI 智能体开发者而言，"显式失败优于静默回退"应成为默认设计原则。IronClaw 的 bug_bash 系列暴露的"Agent 虚构连接状态"（#7247）提示需要工具调用前置状态验证机制。

**② 成本可观测性正从"可选"变为"必选"。** NanoBot 用户报告 2 小时消耗上百万 token 无从追踪（#5266），IronClaw 的 token 计费 bug（#6989）削弱信任，Zeroclaw 的 Anthropic 成本永远显示 $0.00（#9816）让预算上限形同虚设。三起独立事件指向同一结论：**按会话/按调用粒度的 token 审计日志与成本核算应作为基础设施内置**，而非事后补救。

**③ 记忆安全与来源信任将成为下一代核心安全议题。** OpenClaw #7707（6 个月未决）、NanoBot #5278（会话历史可被 agent 自身篡改）、Zeroclaw #8424（工作区无法保护 .env）从不同角度指向同一问题：**agent 长期运行中记忆的完整性与来源可信度**。符合"按来源信任分级"的设计将是下一轮安全竞争力分水岭。

**④ 平台/协议兼容策略分野显现。** OpenClaw 以"生态辐射"方式让 NanoBot、NanoClaw 主动对齐其协议；同时 Agent Plugins 1.0 标准（Zeroclaw #9810）与 MCP OAuth 2.1（PicoClaw #3302）的推进暗示行业正在从"各自为政"走向"插件格式与鉴权标准化"。开发者应优先投资与 OpenClaw 协议兼容 + Agent Plugins 标准的双向适配。

**⑤ CI 基础设施开始制约项目发展速度。** OpenClaw 出现多条 PR 因 lint 超限被迫拆分测试文件（#120397、#120399、#120401），侧面反映代码库膨胀后 CI 策略未同步升级；IronClaw 的 90 秒空闲租约导致多工具 Routine 频繁失败（#5456）暴露了测试环境的真实瓶颈。项目规模增长后，CI 分片、并行化与超时策略需要提前规划。

**⑥ 国内模型/服务接入需求快速增长。** CoPaw #6490（火山引擎 Agent Plan + 小米 MiMo API）、LobsterAI #2443（SiliconFlow 模型 ID 含斜杠 bug）、CoPaw #6285（阿里云 Token Plan 模型列表硬编码）均指向国内云厂商与模型提供商的接入需求正从"个人 hack"走向"官方支持"阶段。对全球项目而言，中文模型 ID 字符兼容、国内 provider 默认配置将成为本地化竞争的关键。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

### NanoBot 项目动态日报 — 2026-08-08

---

#### 1. 今日速览

过去24小时项目活跃度极高，Issue 与 PR 更新合计31条，其中 PR 合并/关闭11条，体现出高效的迭代节奏。核心关注点集中在**会话隔离与数据安全**（#5278、#5279、#5283）、**各类通道（Telegram/Matrix/微信）的稳定性与功能补全**，以及**内存管理与 WebUI 体验优化**。三个高价值安全/架构 PR（#5279、#5283、#5288）处于开放状态，等待维护者评审，是当前项目推进的关键路径。整体健康度良好，无阻塞性崩溃问题，但 token 消耗异常问题（#5266）引发社区热议，需给予重视。

---

#### 2. 版本发布

无新版本发布。

---

#### 3. 项目进展

今日合并/关闭的11个 PR 主要完成了以下工作：

- **会话保留逻辑修复**：`fix(session): preserve proactive channel delivery during session retention trimming`（[#5272](https://github.com/HKUDS/nanobot/pull/5272)）修复了会话裁剪会误删主动推送消息（如 cron 通知）的问题，解决了 #5273。相关 `fix(memory): archive short idle sessions for Dream`（[#5280](https://github.com/HKUDS/nanobot/pull/5280)）与 `feat(memory): archive idle sessions for Dream`（[#5231](https://github.com/HKUDS/nanobot/pull/5231)）则完善了 Dream 记忆归档机制，确保短会话也能被处理。
- **依赖指引现代化**：`fix: modernize dependency recovery guidance`（[#5282](https://github.com/HKUDS/nanobot/pull/5282)）将过时的直接安装指引替换为 `nanobot plugins enable ...` 规范命令，降低了新用户配置门槛。
- **WebUI 体验打磨**：`fix(webui): preserve newly created topic route`（[#5285](https://github.com/HKUDS/nanobot/pull/5285)）修复了新建主题路由丢失问题；`fix(webui): keep activity text crisp while fading edges`（[#5281](https://github.com/HKUDS/nanobot/pull/5281)）优化了活动区域渐隐效果的文字清晰度；`feat(webui): expand model preset editor inline`（[#5277](https://github.com/HKUDS/nanobot/pull/5277)）将模型预设编辑器改为内联展开，提升操作便捷性；`refactor(webui): remove legacy session messages route`（[#5284](https://github.com/HKUDS/nanobot/pull/5284)）清理了废弃接口。
- **媒体 URL 回归修复与微信通道加固**：`fix(webui): stage out-of-media-root attachments on history reads`（[#5268](https://github.com/HKUDS/nanobot/pull/5268)）修复了历史消息中媒体链接失效的回归，解决了 #5264；`fix(weixin): harden protocol delivery, streaming, and login`（[#5263](https://github.com/HKUDS/nanobot/pull/5263)）使微信通道对齐 OpenClaw 2.4.6 协议，增强了投递与登录稳定性；其配套的 `fix(channels): preserve global progress defaults`（[#5287](https://github.com/HKUDS/nanobot/pull/5287)）则修复了通道默认进度设置的回归。

整体来看，项目在会话数据可靠性、WebUI 细节体验和关键通道（微信）兼容性上均有实质性提升，同时开始向**插件标准化（Agent Plugins）**方向演进（[#5288](https://github.com/HKUDS/nanobot/pull/5288)）。

---

#### 4. 社区热点

- **[#5266 [OPEN] Logs about token consumption](https://github.com/HKUDS/nanobot/issues/5266)**（10条评论）：当前最热 Issue。用户反馈 nanobot 在无明显操作下2小时内消耗了上百万 token，要求记录每次调用的 token 消耗明细。该问题背后是对**成本可观测性**的强烈需求，可能推动后续新增 token 审计日志功能。
- **[#5149 [OPEN] no audio? — WhatsApp 音频发送失败](https://github.com/HKUDS/nanobot/issues/5149)**（5条评论）：用户无法通过 WhatsApp 发送音频文件（接收正常）。涉及 neonize/ffmpeg 相关日志，属于通道能力缺失问题。
- **[#5288 [OPEN] feat(plugins): integrate Agent Plugins with CLI Apps](https://github.com/HKUDS/nanobot/pull/5288)**（新开即热门）：将此前 ad hoc 的 CLI 应用集成方式统一为 vendor-neutral 的 Agent Plugins 格式，被视为项目架构规范化的关键一步，讨论价值高。

---

#### 5. Bug 与稳定性

按严重程度排列：

| 严重程度 | Issue/PR | 问题描述 | 状态 |
|---|---|---|---|
| **高（安全）** | [#5278](https://github.com/HKUDS/nanobot/issues/5278) | 会话历史文件存放在 agent 工作区内，存在被 agent 自身读取/篡改的风险。 | 已有对应 fix PR（[#5279](https://github.com/HKUDS/nanobot/pull/5279)） |
| **中（功能）** | [#5198](https://github.com/HKUDS/nanobot/issues/5198) | 会话内无法切换模型，`/model` 命令对非首选模型无效。 | 无 fix PR |
| **中（功能）** | [#5256](https://github.com/HKUDS/nanobot/issues/5256) | `/goal` 命令在等待用户回复时会产生数十条重复回复，形成循环。 | 无 fix PR |
| **中（数据）** | [#5264](https://github.com/HKUDS/nanobot/issues/5264)（已关闭） | 历史消息接口不返回媒体 URL（工作区外文件）。 | 已由 [#5268](https://github.com/HKUDS/nanobot/pull/5268) 修复 |
| **中（数据）** | [#5273](https://github.com/HKUDS/nanobot/issues/5273)（已关闭） | 会话裁剪会丢失主动投递消息。 | 已由 [#5272](https://github.com/HKUDS/nanobot/pull/5272) 修复 |
| **低（通道）** | [#5149](https://github.com/HKUDS/nanobot/issues/5149) | WhatsApp 无法发送音频。 | 无 fix PR |
| **低（通道）** | [#5156](https://github.com/HKUDS/nanobot/pull/5156)（开放） | Telegram 轮询在瞬断后静默停止，需手动干预。 | 已有修复 PR 等待合并 |

---

#### 6. 功能请求与路线图信号

- **会话隔离与安全加固**：社区提出多项相关诉求，包括 [#5276](https://github.com/HKUDS/nanobot/issues/5276)（会话级临时文件隔离）和 [#5278](https://github.com/HKUDS/nanobot/issues/5278)（会话历史迁出工作区）。对应的两个 PR（[#5283](https://github.com/HKUDS/nanobot/pull/5283) 与 [#5279](https://github.com/HKUDS/nanobot/pull/5279)）已提交，功能设计完整，是明确的下一版本候选特性。
- **Token 消耗审计**（[#5266](https://github.com/HKUDS/nanobot/issues/5266)）：尽管是 Bug 类诉求，实为对可观测性的功能请求。预计将推动新增详细的调用日志与 token 统计。
- **Telegram 贴纸与消息反应**（[#5289](https://github.com/HKUDS/nanobot/issues/5289)）：明确的功能增强请求，为 Telegram 通道补充贴纸发送与 agent 主动反应能力，目前尚无对应 PR，但需求清晰、落地难度不高。
- **模型无关的 Computer Use 工具**（[#4276](https://github.com/HKUDS/nanobot/pull/4276)）：仍在开放状态的重大能力更新，提供截屏、键鼠控制及浏览器 DOM 自动化。由于涉及面较大，预计还需较长时间评审。
- **子代理会话持久化**（[#5291](https://github.com/HKUDS/nanobot/pull/5291)）与 **Temporary Chat 模式**（[#5252](https://github.com/HKUDS/nanobot/pull/5252)）已提交 PR，分别回应了调试审计与隐私性 UI 需求，也有望进入后续版本。

---

#### 7. 用户反馈摘要

- **成本敏感度高**：用户在 #5266 中明确指出 token 消耗“enormous”且难以追踪，使用场景为长时间无人值守运行的代理，成本失控将直接影响部署意愿。建议官方尽快提供按会话/按调用粒度的用量日志。
- **多渠道能力差异不满**：WhatsApp 与 Telegram 通道的功能缺失（音频发送、贴纸、反应）与主通道（WebUI）体验差距明显，反映出用户对**全渠道体验一致性**的期待。
- **模型切换的挫败感**（#5198）：用户对比了商业 SaaS 产品的模型切换体验后，认为当前 `/model` 命令行为不符合预期，暗示**会话级模型临时覆盖**是刚需。
- **对安全性改进的支持**：#5278 的提出者对“agent 可以读取自己的会话历史”表示担忧，而 #5276 的提出者则肯定现有 `restrictToWorkspace` 的价值，但希望进一步提供更细粒度的会话隔离。这些反馈均显示了用户对数据权限边界有较深刻的理解。

---

#### 8. 待处理积压

| 项目 | 类型 | 创建时间 | 最后更新 | 当前状态 | 备注 |
|---|---|---|---|---|---|
| [#4276](https://github.com/HKUDS/nanobot/pull/4276) feat(tools): model-agnostic computer use | PR | 2026-06-10 | 2026-08-07 | 开放，无维护者评论 | 积压近2个月，功能覆盖面大（computer_use + browser），建议维护者评估是否可以分拆合并或给予明确的时间表。 |
| [#5156](https://github.com/HKUDS/nanobot/pull/5156) fix(telegram): recover from silently stalled polling | PR | 2026-07-29 | 2026-08-07 | 开放，无维护者评论 | 修复生产环境稳定性的关键补丁，等待超9天，建议优先排期。 |
| [#5198](https://github.com/HKUDS/nanobot/issues/5198) Not possible to change models in a specific session | Issue | 2026-07-31 | 2026-08-07 | 开放，无维护者回复 | 功能缺陷且影响用户日常使用体验，已积压一周。 |
| [#5256](https://github.com/HKUDS/nanobot/issues/5256) /goal message produces dozens of repeated replies | Issue | 2026-08-05 | 2026-08-07 | 开放，无维护者回复 | 极有可能造成 token 浪费和消息轰炸的 Bug，建议尽快定位。 |

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-08-08

## 今日速览

过去 24 小时项目保持高活跃度，共产生 100 条 Issues/PRs 更新。Issue 侧以新开/活跃讨论为主（45 条），其中多条 P1 级安全与稳定性 Bug 集中浮出；PR 侧 47 条待合并，其中约 30 条为本日新开。值得关注的是，安全相关 PR（#9827、#9839）与 SOP 修复 PR（#9841）同日提交，且 SOP 相关连续 5 条 Bug 报告均配以对应修复 PR，显示维护者对高优先级缺陷的响应非常及时。项目当前处于高密度的架构整理与安全加固阶段。

---

## 项目进展

本日合并/关闭的 3 条 PR 中，仅有一条为实质性修复：

- **[#9836] fix(transcription): make local_whisper bearer_token optional**（已关闭）— 修复 `LocalWhisperProvider::from_config` 在 `bearer_token` 缺失或为空时硬失败的问题。本地 whisper.cpp 服务无需认证，此修复消除了该场景下的配置障碍，属于交付阻断类修复。

虽合并量不大，但今日提交了大量针对既有缺陷的修复/设计 PR（详见下文 Bug 与功能请求部分），项目正处于"问题识别→方案提交→待评审"的密集推进阶段，前瞻性工作充沛。

---

## 社区热点

本日讨论热度集中在三个方向：

- **跨轮次对话关联（OTel 导出）** — [#8933](https://github.com/zeroclaw-labs/zeroclaw/issues/8933)（13 条评论，已关闭）：RFC 提议在 OpenTelemetry 导出中通过不透明会话 ID 实现跨轮次关联，并映射到 OTel 语义约定 v1.41.0 的 `gen_ai.conversation.id` 属性。社区对可观测性深度的持续关注明显，且该 Issue 为 `status:accepted`，说明方向已被维护者认可。
- **ZeroCode 所有权迁移中 Todo 跟踪器配置保留** — [#9246](https://github.com/zeroclaw-labs/zeroclaw/issues/9246)（12 条评论，已关闭）：讨论配置在架构迁移过程中的连续性保障，涉及配置兼容性策略。
- **Providers 架构统一重构** — [#5937](https://github.com/zeroclaw-labs/zeroclaw/issues/5937)（12 条评论，开放中）：长期存在的架构债问题，社区持续呼吁统一 `providers` 模块的 reqwest 客户端管理与模型参数构建，减少重复代码与配置碎片化。

---

## Bug 与稳定性

本日共报告 15+ 条新 Bug，按严重程度排列如下：

### P1（高危，均已有修复 PR 或已在处理）

- **安全：`forbidden_paths` 对 `allowed_roots` 和工作区内路径完全失效** — [#9815](https://github.com/zeroclaw-labs/zeroclaw/issues/9815)：`is_path_allowed` 在 allowed-root 检查处直接返回 `true`，永远到不了 forbidden-path 循环。**安全策略形同虚设**。关联 PR：[#9828](https://github.com/zeroclaw-labs/zeroclaw/pull/9828) 提供完整的 agent 配置授权路径及策略预览。
- **安全：shell 子进程可逃逸验证过的隔离环境** — 对应 PR [#9827](https://github.com/zeroclaw-labs/zeroclaw/pull/9827)：三个独立的逃逸路径，包括沙箱包装丢失工作目录、`--chdir` 与策略验证路径不一致等。
- **安全：所有姿态下均应拒绝不可逆破坏性命令** — 对应 PR [#9839](https://github.com/zeroclaw-labs/zeroclaw/pull/9839)：`allowed_commands` 含 `*` 且 `block_high_risk_commands` 为 `false` 时直接放行，属于设计层面的策略漏洞。
- **安全：SOP 解析失败被静默丢弃** — [#9786](https://github.com/zeroclaw-labs/zeroclaw/issues/9786)：畸形 `SOP.toml` 在加载时无任何诊断，`sop list` 直接省略该条且 `sop validate` 报告成功——用户无法区分"SOP 不存在"与"SOP 配置错误"。已有修复 PR [#9841](https://github.com/zeroclaw-labs/zeroclaw/pull/9841)。
- **Bug：SOP 自动模式从 channel/cron 触发后永远卡在 "running"** — [#9805](https://github.com/zeroclaw-labs/zeroclaw/issues/9805)：headless 分发没有 agent loop，`ExecuteStep` 永远不会执行，run 永远停在 step 1，持有并发槽位且跨守护进程重启存活。已有修复 PR [#9841](https://github.com/zeroclaw-labs/zeroclaw/pull/9841)。
- **Bug：cron update 静默丢弃声明式任务的六列变更** — [#9770](https://github.com/zeroclaw-labs/zeroclaw/issues/9770)：`command`、`name`、`expression`/`schedule`、`session_target`、`allowed_tools`、`uses_memory` 均受影响。需要拒绝或正确合并。
- **Bug：Anthropic provider 成本永远报告 $0.00** — [#9816](https://github.com/zeroclaw-labs/zeroclaw/issues/9816)：所有 usage 记录的 `cost_usd` 均为 0.0，直接导致日/月预算上限永远无法触发。影响用户成本管控。
- **Bug：安全 — Gemini API key 泄漏到用户聊天** — [#9386](https://github.com/zeroclaw-labs/zeroclaw/issues/9386，已关闭)：API key 作为 URL query 参数，在传输层错误时随 URL 进入 `sanitize_api_error` 未被剥离，最终发布到用户所在聊天。该 Issue 已关闭，修复方式待详细确认。
- **Bug：守护进程启动时窃取 `daemon.sock` 并在退出时 unlink，导致存活的守护进程被孤立** — [#9840](https://github.com/zeroclaw-labs/zeroclaw/issues/9834)：两个未受保护的操作（`platform::remove_stale_socket` 和退出时的 unlink）允许第二个守护进程破坏第一个，并让所有人都无法再连接。
- **Bug：OpenRouter 流式请求丢弃 `provider_extra`** — [#9775](https://github.com/zeroclaw-labs/zeroclaw/issues/9775)：`stream_chat` 路径未调用 `merge_extra_body`，所有配置的 `provider_extra` 参数在流式模式下丢失。
- **Bug：Telegram 审批等待期间 typing 指示器持续运行** — [#9656](https://github.com/zeroclaw-labs/zeroclaw/issues/9656)：被阻塞的 turn 看起来仍在工作，误导用户。

### P2（中危）

- **SOP：失败原因被丢弃** — [#9783](https://github.com/zeroclaw-labs/zeroclaw/issues/9783)：`finish_run` 接受 `reason` 但从未使用，失败 run 只记录"失败"不记录"为什么"。已在 [#9841](https://github.com/zeroclaw-labs/zeroclaw/pull/9841) 中修复。
- **SOP：多步 agent 驱动的 run 被中途标记失败且无审计事件** — [#9784](https://github.com/zeroclaw-labs/zeroclaw/issues/9784)：agent 仍在执行步骤工作时 run 被标记失败。需复现确认（`r:needs-repro`）。
- **守护进程 stdout/stderr 日志无边界** — [#9708](https://github.com/zeroclaw-labs/zeroclaw/issues/9708)：多个启动路径重定向到固定文件，无大小/年龄/文件计数限制。
- **泄漏检测误伤公共区块链地址** — [#9825](https://github.com/zeroclaw-labs/zeroclaw/issues/9825)：高熵启发式把公链地址当敏感信息 redact，导致支付链接不可用。属于误报而非 Bug，但影响实际功能。
- **zeroCode 包 `hardware` feature 编译失败** — [#9832](https://github.com/zeroclaw-labs/zeroclaw/issues/9832)：aarch64 Linux 上 `cargo build --features hardware` 报错 `unresolved import aardvark_sys::AardvarkHandle`。与 [#8043](https://github.com/zeroclaw-labs/zeroclaw/issues/8043) RFC（将 aardvark-sys 并入 zeroclaw-hardware）直接相关。
- **cron 工具从未被 agent 调用** — [#9821](https://github.com/zeroclaw-labs/zeroclaw/issues/9821)：agent 总是回退到 shell `crontab`，但被安全策略挡下。
- **calculator 工具触发模型输出字面 `<TOOLCALL>` 伪语法** — [#9820](https://github.com/zeroclaw-labs/zeroclaw/issues/9820)：模型未产生真正的函数调用。
- **cron 触发的 SOP 无法做网络工作** — [#9780](https://github.com/zeroclaw-labs/zeroclaw/issues/9780)：capability 集合没有 HTTP 成员，且 `shell.exec`/`notify.channel` 为不可满足的占位符。已有 PR [#9842](https://github.com/zeroclaw-labs/zeroclaw/pull/9842) 部分相关（声明投递契约）。
- **zeroclaw-runtime 测试间歇性失败** — [#9834](https://github.com/zeroclaw-labs/zeroclaw/issues/9834)：共享进程全局状态（turn_streamed receipts + model_switch）导致偶发失败。

---

## 功能请求与路线图信号

- **Agent Plugins 1.0 标准支持** — [#9810](https://github.com/zeroclaw-labs/zeroclaw/issues/9810)（RFC，`needs-maintainer-review`）：支持供应商中立的 Agent Plugins 1.0.0 标准，可加载 `plugin.json` + `skills/` + `mcp.json` 格式的社区插件。为开放生态铺路，与 #9346（统一 catalog 契约）呼应。
- **统一 package/capability/config/runtime-state catalog 契约** — [#9346](https://github.com/zeroclaw-labs/zeroclaw/issues/9346)（RFC）：跨 CLI、gateway 和插件系统的产品级目录的统一数据模型。若与 #9810 合并推进，可能会形成插件市场的基座。
- **简化默认 Web 工具面为三个动词** — [#9824](https://github.com/zeroclaw-labs/zeroclaw/issues/9824)：`web_fetch`（读）、`web_research`（查）、`http_request`（调 API），原始 `web_search_tool` 下沉到 research 子代理。已有对应 PR [#9833](https://github.com/zeroclaw-labs/zeroclaw/pull/9833)（新增 `web_research` delegate 工具）。
- **Agent 可编写配置的受控通道** — PR [#9828](https://github.com/zeroclaw-labs/zeroclaw/pull/9828)：统一的 JSON Patch 实现 + operator 审批的策略预览，替代今天 agent 直接 `echo > config.toml` 的危险做法。与 #9815（forbidden_paths 失效）直接关联，属于安全增强路线。
- **工作区相对 forbidden paths 与 `.zeroclawignore`** — [#8424](https://github.com/zeroclaw-labs/zeroclaw/issues/8424)：目前 `forbidden_paths` 只拦截工作区外路径，无法保护 `.env` 等工作区内敏感文件。
- **Workspace-wide `#![forbid(unsafe_code)]`（aardvark-sys 作为唯一豁免）** — [#7130](https://github.com/zeroclaw-labs/zeroclaw/issues/7130)：需与 #8043（aardvark-sys 合并回主仓库）配合。
- **跨轮次对话关联 OTel 导出** — [#8933](https://github.com/zeroclaw-labs/zeroclaw/issues/8933，已关闭)：已被接受，预计进入路线图。
- **Telegram 部分流式模式下显示工具调用进度** — [#6663](https://github.com/zeroclaw-labs/zeroclaw/issues/6663)：提升用户体验的可观测性。
- **Telegram 频道：首次提及时用 `conversations.replies` 水合线程上下文** — [#6055](https://github.com/zeroclaw-labs/zeroclaw/issues/6055，已关闭)。
- **Herdr agent 状态上报集成** — PR [#8337](https://github.com/zeroclaw-labs/zeroclaw/pull/8337)：CLI 交互模式嵌入 Herdr 侧边栏显示 agent 生命周期。生态集成方向。

---

## 用户反馈摘要

- **配置静默失败是核心痛点**（#9786、#9770）："畸形 SOP 和缺失 SOP 无法区分"、"cron update 丢弃我的修改没有任何提示"。用户对配置变更的确定性有明确预期，静默丢弃是不可接受的。相关修复已出现在 PR #9841 中。
- **安全策略的"意外放行"与"意外拦截"并存**（#9815、#9825）：`forbidden_paths` 拦不住工作区内敏感文件，而熵值启发式又误伤公链收款地址。用户在安全与可用性之间需要更精细的平衡。
- **自动模式的实际使用障碍**（#9805、#9780）：cron/channel 触发的 SOP 无法真正执行网络操作，watch-loop 场景落不了地。"Docs 说 watch-loops are cron-polling SOPs，但实际跑不起来。"
- **成本管控需求强烈**（#9816）："预算上限永远不触发"直接削弱了用户对项目的信任。成本数据的准确性是生产环境部署的前提条件。
- **模型兼容性问题**（#9820、#9821）：在 NVIDIA NIM 上运行的模型输出伪 `<TOOLCALL>` 语法而非真实函数调用、cron 工具从未被 agent 选中。第三方模型的工具调用格式适配仍需加强。

---

## 待处理积压

本日无新增长时间未响应的重要 Issue/PR，但以下既有项目需跟进：

- **[#5937] Providers 架构统一重构**（4 月 20 日创建，开放中）：12 条评论热度不减但无明确 owner 推进。涉及重构面大，可能是多轮 RFC 的长期项目。
- **[#8043] RFC：废除独立 aardvark-sys crate 并并入 zeroclaw-hardware**（6 月 20 日创建，`needs-author-action`）：与今天的编译错误 #9832 直接相关。此 RFC 若落地可一并解决 #9832 的构建问题。
- **[#8424] RFC：工作区相对 forbidden paths 与 .zeroclawignore**（6 月 28 日创建，`needs-author-action`）：已被 #9815（forbidden_paths 失效，P1）验证为必要需求，建议提升优先级。
- **[#7130] forbid(unsafe_code) workspace-wide**（6 月 3 日创建，`status:accepted`）：等待 #8043 处理结果以便同步推进。
- **PR [#8337]（Herdr 集成）与 [#8965]（技能声明式自动激活）** 已标记 `needs-author-action` 超过 24 小时，需要作者响应 review 反馈。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

### 📊 PicoClaw 项目动态日报 — 2026-08-08

---

#### 1. 今日速览

过去 24 小时项目活跃度中等偏上，PR 流动量（14 条）显著高于 Issues（4 条），说明社区贡献者参与积极。值得关注的是，今日有一批新 PR 直接针对 **WhatsApp 渠道故障**、**prefix caching 优化** 和 **exec 工具超时参数失效** 等具体问题，展现了项目对运行稳定性和性能细节的持续打磨。依赖更新类 PR 占比较高但多数处于待合并状态。Issue 侧无明显新增高热度讨论，但数条功能请求已超过一周未获维护者响应，积压风险初现。项目健康度总体良好，修复速度跟上问题报告速度。

---

#### 2. 版本发布

过去 24 小时无新版本发布，此部分省略。

---

#### 3. 项目进展

今日无核心功能 PR 被合并，但有 2 条依赖更新 PR 被关闭（#3291、#3289）。主要值得关注的是新提交的 4 条高价值 PR，虽未合并但体现了明确的修复方向：

- **[#3321] fix(agent): move dynamic context after history to preserve prefix caching**  
  作者 grrowl 提交，将动态上下文块（当前时间、会话信息等）从系统消息移动到历史之后，以保留提供商侧的前缀缓存，可显著降低多轮对话的 token 成本与延迟。这属于推理性能优化，对各模型提供商均有收益。
  [查看 PR](https://github.com/sipeed/picoclaw/pull/3321)

- **[#3320] fix(deps): bump whatsmeow to unblock WhatsApp "client outdated (405)"**  
  同一作者修复了 WhatsApp 渠道因 whatsmeow 库版本过旧而被服务端拒绝连接（405 错误）的问题。若合并，将恢复 WhatsApp 原生通道的可用性。
  [查看 PR](https://github.com/sipeed/picoclaw/pull/3320)

- **[#3319] fix(tools): honor exec timeout and boolean run options**  
  MrTreasure 修复 exec 工具的 `timeout` 参数被全局配置覆盖、以及 `background`/`pty` 选项被声明为字符串而非布尔值的问题，使工具行为符合文档预期。
  [查看 PR](https://github.com/sipeed/picoclaw/pull/3319)

- **[#3279] fix(seahorse): prevent tool-call format leakage into LLM summaries**  
  该 PR 仍在开放中，修复了 seahorse 模块在生成摘要时可能将工具调用格式泄漏进用户消息的问题，属数据质量修复。
  [查看 PR](https://github.com/sipeed/picoclaw/pull/3279)

---

#### 4. 社区热点

- **[Issue #3093] [Feature] I need SimpleX or tox** （评论 6，已关闭）  
  用户请求新增 SimpleX/Wire/Tox 等匿名通讯协议网关支持，此前因标记为 stale 被关闭，但获 1 个 👍。反映部分用户对隐私/匿名信道的真实需求。
  [查看 Issue](https://github.com/sipeed/picoclaw/issues/3093)

- **[Issue #3302] Support OAuth 2.1 for MCP servers** （评论 2）  
  请求为 MCP 服务器增加 OAuth 2.1 鉴权支持，被标记为 "Nice-to-Have"，关联历史 Issue #2546。说明 MCP 生态的企业级接入需求仍在持续。
  [查看 Issue](https://github.com/sipeed/picoclaw/issues/3302)

- **[PR #3271] chore(providers): update default model names to 2026-07 latest**  
  虽评论为 0，但该 PR 涉及 9 个提供商默认模型刷新（如 OpenAI 更新至 gpt-5.6 系列），属于社区关心的模型时效性问题。若合并将影响所有新用户的默认体验，值得关注。
  [查看 PR](https://github.com/sipeed/picoclaw/pull/3271)

---

#### 5. Bug 与稳定性

| 严重程度 | 问题描述 | Issue/PR | 状态 |
|---------|---------|----------|------|
| 高 | WhatsApp 渠道因客户端版本过旧被服务器拒绝（`Client outdated (405)`）且不会自动重连，导致渠道不可用 | [#3320](https://github.com/sipeed/picoclaw/pull/3320) | 已有 fix PR，待合并 |
| 中 | `exec` 工具忽略每次运行的 `timeout` 参数，始终使用全局超时；且 `pty`、`background` 选项类型错误导致行为异常 | [#3319](https://github.com/sipeed/picoclaw/pull/3319) | 已有 fix PR，待合并 |
| 中 | `seahorse partsToReadableContent` 可能将工具调用格式泄漏进 LLM 摘要输入，影响模型输出质量 | [#3279](https://github.com/sipeed/picoclaw/pull/3279) | 已有 fix PR，待合并 |
| 待评估 | Issue #3308 提交了针对 SeaHorse、Channel Manager 与 Hooks 的代码审查报告，指出存在并发危险、goroutine 泄漏及内存/速度优化空间 | [#3308](https://github.com/sipeed/picoclaw/issues/3308) | 待维护者确认后拆解 |

---

#### 6. 功能请求与路线图信号

- **新通讯渠道/协议**（#3093）：SimpleX/Tox/Wire 网关请求虽已关闭，仍为持续需求信号。结合今日合并的 WhatsApp 渠道修复 PR（#3320），表明多平台接入是项目重点方向之一。
- **MCP OAuth 2.1 支持**（#3302）：连续两个 Issue 提及，社区对 MCP 安全鉴权的需求正在积累，属于增强型功能，有可能进入后续路线图。
- **Telegram 会话管理命令**（#3307）：用户希望在 Telegram 渠道获得与 Web UI 同等的会话列表/切换能力。目前无对应 PR，但此诉求指向"全渠道能力对齐"，是聊天 UI 一致性的重要信号。
- **可配置默认模型回退链**（PR #3200，开放中）：为 Web UI 增加默认模型+回退模型链的配置能力。若合并，将提升多模型场景下的可用性。已开放超 1 个月，建议维护者关注。
  [查看 PR](https://github.com/sipeed/picoclaw/pull/3200)

---

#### 7. 用户反馈摘要

- **匿名/隐私通讯需求真实存在**：Issue #3093 用户明确表示需要 SimpleX 或 Tox 作为网关，虽被 stale 关闭，但侧面证明部分用户群对加密信道的需求未被满足。
- **渠道能力不对称造成困扰**：Issue #3307 用户指出 Web UI 有完整会话管理，但 Telegram 上没有等价功能，反映出"同一个应用在不同入口体验不一致"的典型痛点。
- **并发安全担忧**：Issue #3308 的作者以代码审查形式提交报告，态度积极且具体，提到 SeaHorse 模块存在 goroutine 泄漏和并发隐患。这类反馈体现了社区对代码质量的关注，但也可能意味着模块设计复杂度上升后缺乏充分 review。
- **依赖更新积极但有待审阅**：多用户通过自动化 bot 提交依赖升级 PR，其中 Anthropic SDK（#3304）、aws-sdk-go-v2（#3305/#3306）等以 "stale" 标记，说明依赖更新流程效率偏低，存在累积风险。

---

#### 8. 待处理积压

以下 PR/Issue 开放超过 7 天且无维护者回应，建议重点关注：

- **[PR #3200] feat(models): add configurable default fallback chain**（开放 38 天）  
  涉及 Web UI 模型管理核心体验，长期未获 review。
  [查看 PR](https://github.com/sipeed/picoclaw/pull/3200)

- **[PR #3283] fix(dingtalk): support picture/image message inbound**（开放 17 天）  
  钉钉渠道图片消息支持，功能完整但无人评审。
  [查看 PR](https://github.com/sipeed/picoclaw/pull/3283)

- **[PR #3270] feat: add DashScope TTS provider and WeChat audio file sending**（开放 19 天）  
  新增阿里云 TTS 与微信语音发送能力，功能型 PR，长期待审。
  [查看 PR](https://github.com/sipeed/picoclaw/pull/3270)

- **[Issue #3308] [BUG] 并发与 goroutine 泄漏代码审查**（开放 9 天）  
  为详细技术报告但未获任何维护者回应，若属实，属潜在稳定性风险。
  [查看 Issue](https://github.com/sipeed/picoclaw/issues/3308)

---

*数据来源：github.com/sipeed/picoclaw，统计窗口 2026-08-07 至 2026-08-08。*

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 — 2026-08-08

## 今日速览

过去 24 小时项目活跃度处于中低水平：无新 Issue 提交、无新版本发布，但 PR 活动明显，共 10 条更新（8 条待合并，2 条已关闭）。核心关注点集中在渠道集成扩展（Mattermost、Dial）与工具技能（Tavily、AnyDoc）上，其中 Mattermost 集成 PR #3199 是对旧 PR #546 的完全重写，适配了 v2 ChannelAdapter 架构。项目同时收到若干稳定性修复（挂载只读加固、数据库回填迁移、失败状态展示优化），整体保持健康的迭代节奏。

## 项目进展

今日关闭的 2 个 PR 分别代表了架构迁移的收尾和用户体验修复：

- **[PR #3197](https://github.com/qwibitai/nanoclaw/pull/3197)（已关闭）** — 修复 agent-runner 进度卡失败状态仅显示泛化文案的问题。此前用户只能看到「执行系统检查失败」这类笼统信息，现在会从失败摘要中提取首条有效原因并展示为「动作失败：具体原因」，同时保留脱敏逻辑和单行截断限制。附带 274 项定向测试与 1427 项全量测试通过，表明项目测试覆盖面扎实。
- **[PR #546](https://github.com/qwibitai/nanoclaw/pull/546)（已关闭）** — Mattermost 渠道技能的旧实现正式关闭。该 PR 自 2 月 26 日创建以来长期处于 Blocked 状态，因其基于已被移除的旧 `Channel`/`registry.ts` 架构。关闭动作标志着 v2 架构迁移的彻底完成，相关功能改由全新 PR #3199 继续推进。

此外，核心团队已合并模板加载相关 PR #2890，当前 PR #2909 正在实现对应的安装向导流程与首个 Agent 模板套印，属于该功能链的第二部分。

## 社区热点

当前最受关注的 PR 是 **[#3199](https://github.com/qwibitai/nanoclaw/pull/3199)（Mattermost 渠道集成）**。该 PR 明确标注为取代 #546 的全新实现，直接针对当前 `ChannelAdapter`/`channel-registry.ts` 合约开发，体现了社区对 v2 架构的支持意愿。作者 wakqasahmed 在 #546 关闭后迅速提交适配新架构的完整实现，其持续跟进值得关注。

其次，**[#2909](https://github.com/qwibitai/nanoclaw/pull/2909)（Agent 模板设置流程）** 由核心团队成员提交，属于双周系列工作的第二部分，涉及安装向导体验的关键变更，社区关注度较高。

## Bug 与稳定性

无新报告的崩溃或回归类 Issue。今日包含 3 个主动修复的 PR，按影响面排序如下：

1. **[PR #3196](https://github.com/qwibitai/nanoclaw/pull/3196)（待合并）** — 添加挂载只读保护（Fix/add mount readonly），涉及容器安全加固，属中高优先级。
2. **[PR #3145](https://github.com/qwibitai/nanoclaw/pull/3145)（待合并）** — 为现有 wirings 回填缺失的渠道目的地，新增迁移 021，修复此前可能遗漏的数据不一致问题。
3. **[PR #2346](https://github.com/qwibitai/nanoclaw/pull/2346)（待合并）** — 将未知斜杠命令改为按普通聊天处理。此前未知命令被归类为 passthrough，导致 SDK 输出内容无法包装为 `<message>` 块而被静默丢弃。

三项修复均已提交并等待合并，项目当前无已知未处理的严重 Bug。

## 功能请求与路线图信号

- **Mattermost 集成（[PR #3199](https://github.com/qwibitai/nanoclaw/pull/3199)）** — 全新实现，已被作者标记为 v2 ChannelAdapter 的配套组件，合并概率高，预计近两周内有望落地。
- **Tavily MCP 工具技能（[PR #3190](https://github.com/qwibitai/nanoclaw/pull/3190)）** — 新增独立工具技能，不涉及源码改动，按惯例此类 Utility skill 合并速度较快。
- **AnyDoc 文档转换技能（[PR #3198](https://github.com/qwibitai/nanoclaw/pull/3198)）** — 同样为 Utility skill，由核心团队成员提交，被纳入下一版本的可能性较大。
- **Dial 渠道支持（[PR #3050](https://github.com/qwibitai/nanoclaw/pull/3050)）** — 扩展渠道选择器与向导，附带 runChannelSkill 模型，属于持续性的渠道扩展路线。
- **Agent 模板设置流程（[PR #2909](https://github.com/qwibitai/nanoclaw/pull/2909)）** — 核心团队成员推进，与 #2890 构成完整功能，属于明确的路线图承诺项。

## 用户反馈摘要

受限于数据源（无新 Issue，PR 评论数未提供），今日可提炼的反馈有限，但从 PR 描述可见用户侧的关键诉求：

- **失败信息可读性需求强烈**（来自 [#3197](https://github.com/qwibitai/nanoclaw/pull/3197)）：用户对于「执行系统检查失败」这类笼统文案的不满已在社区内形成共识并得到修复，表明用户期望操作反馈具备具体的诊断信息。
- **架构适配诉求明确**（来自 [#3199](https://github.com/qwibitai/nanoclaw/pull/3199)）：Mattermost 集成需求自 2 月以来持续存在，且作者在旧 PR 失效后主动适配新架构重新提交，说明该渠道需求真实且用户跟进积极。

## 待处理积压

- **[PR #2909](https://github.com/qwibitai/nanoclaw/pull/2909)（Agent 模板设置流程）** — 已开放 37 天，由核心团队成员持续推进。该项是 #2890 功能链的第二部分，仍显示为待合并，建议维护者关注其审查进度，避免功能链断裂。
- **[PR #2346](https://github.com/qwibitai/nanoclaw/pull/2346)（未知斜杠命令处理）** — 已开放 92 天，属于用户可感知的交互缺陷修复，长期未合并可能影响用户体验，建议优先处理。
- **Mattermost 集成新旧 PR 交接** — 旧 PR #546 已关闭，新 PR #3199 已提交 1 天，建议维护者尽快安排审查，缩短社区等待周期。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

### IronClaw 项目动态日报 — 2026-08-08

---

#### 1. 今日速览

过去 24 小时项目保持高活跃度：共处理 50 条 Issue 和 50 条 PR，其中 36 条 Issue 处于活跃状态、14 条已关闭。今日无新版本发布，但合并了多项针对文档、依赖和测试覆盖的 PR。值得关注的是，围绕“文档与发布内容漂移”的问题，社区提交了一组 5 个 PR 的“文档真相（Doc-Truth）”系列修复，同时 Issue 区的 QA 测试（bug_bash_P1）持续报出多例 Agent 幻觉类缺陷，反映出在功能快速迭代期，系统稳定性和文档同步是当前的主要痛点。整体项目推进速度较快，但需警惕积压的稳定性问题。

---

#### 2. 版本发布

无新版本发布。

---

#### 3. 项目进展

今日合并/关闭了 12 个 PR，以下为关键变更：

- **通道消息投递工具上线** — PR [#7157](https://github.com/nearai/ironclaw/pull/7157) `feat: explicit channel delivery tool` 已合并。该 PR 建立了“双通道投递模型”，将最终回复与主动通知分离，并删除了旧的投递启发式逻辑。这是 v1.2.0 版本的重要功能基础。
- **沙箱配置增强** — PR [#7214](https://github.com/nearai/ironclaw/pull/7214) 已合并。新增 Docker 与 Railway 显式用户沙箱配置，将工作区/检查点范围限定到“租户+用户”，并在全新非 root Python worker 中运行命令，提升了多租户安全性。
- **文档真相（Doc-Truth）Pipeline 启动** — 今日合并了 5 个系列 PR 中的 1 个：PR [#7375](https://github.com/nearai/ironclaw/pull/7375) 重写了扩展构建文档以匹配 v3 清单格式。其余 4 个 PR（[#7376](https://github.com/nearai/ironclaw/pull/7376)、[#7378](https://github.com/nearai/ironclaw/pull/7378)、[#7379](https://github.com/nearai/ironclaw/pull/7379)、[#7381](https://github.com/nearai/ironclaw/pull/7381)）均为待合并状态，旨在从根本上解决文档与发布版本脱节的问题。
- **依赖更新** — 两个 dependabot PR（[#7324](https://github.com/nearai/ironclaw/pull/7324) 已合并、[#7387](https://github.com/nearai/ironclaw/pull/7387) 待合并）集中更新了 12 个 Rust 依赖包，包括 `base64` 和 `toml` 的版本升级。

---

#### 4. 社区热点

- **Issue #7340 — 无法重置模型设置为出厂默认值**（[链接](https://github.com/nearai/ironclaw/issues/7340)）— 创建一天内获 6 条评论。用户反馈修改模型供应商/选择后无法恢复初始配置。这暴露了设置持久化层面缺乏“重置”兜底机制，是直接影响用户体验的操作性缺陷。
- **Issue #6989 — Token 计费 Bug**（[链接](https://github.com/nearai/ironclaw/issues/6989)）— 虽已开启一周，但仍在活跃讨论（4 条评论）。该 Bug 涉及从内容引用字符串而非实际内容估算输入 token，可能导致计费不准确，属于核心成本正确性问题。
- **Issue #7317 — 文档真相验证管线提案**（[链接](https://github.com/nearai/ironclaw/issues/7317)）— 用户用具体示例指出 `origin_gate_matrix` 等字段已成为必填项但文档未同步，引发了今日 Doc-Truth PR 系列。该提案实际已成为路线图的一部分。

---

#### 5. Bug 与稳定性

按严重程度排列：

| 严重度 | Issue | 描述 | 状态 |
| :--- | :--- | :--- | :--- |
| **高** | [#7292](https://github.com/nearai/ironclaw/issues/7292) | 安装 CoinGecko 工具后无法调用，runner 心跳超时导致运行失败。 | 待处理，无 fix PR |
| **高** | [#5456](https://github.com/nearai/ironclaw/issues/5456) | 多工具 Routine 因 90 秒空闲阈值过短，runner 租约频繁过期，为 6/30 测试主导故障模式。 | 待处理，无 fix PR |
| **高** | [#7298](https://github.com/nearai/ironclaw/issues/7298) | 请求发送失败或监控系统与 runner 失去联系。 | 待处理，无 fix PR |
| **中** | [#7185](https://github.com/nearai/ironclaw/issues/7185) | 跨会话记忆无法可靠召回。 | 已有 fix PR：[#7365](https://github.com/nearai/ironclaw/pull/7365)（待合并） |
| **中** | [#6590](https://github.com/nearai/ironclaw/issues/6590) | Windows 下 `serve` 命令启动失败，报工作区根目录与 `/skills` 重叠。 | 待处理，无 fix PR |
| **中** | [#6476](https://github.com/nearai/ironclaw/issues/6476) | Slack 扩展激活编码错误，模型幻觉化管理要求。（已关闭） | 已关闭，根因拆分为 [#7367](https://github.com/nearai/ironclaw/issues/7367) |
| **中** | [#7367](https://github.com/nearai/ironclaw/issues/7367) | 文档仍称聊天无法连接频道，导致模型拒绝执行。（已关闭，由 Doc-Truth PR 修复） | 已关闭，修复中 |
| **低** | [#6644](https://github.com/nearai/ironclaw/issues/6644) / [#6643](https://github.com/nearai/ironclaw/issues/6643) / [#6475](https://github.com/nearai/ironclaw/issues/6475) | Telegram 相关配对与消息路由问题（均关闭）。 | 已关闭，根因跟踪中：[#7368](https://github.com/nearai/ironclaw/issues/7368) |

**重点风险提示：** 最新一批 bug_bash_P1 报告（[#7246](https://github.com/nearai/ironclaw/issues/7246)、[#7247](https://github.com/nearai/ironclaw/issues/7247)、[#7294](https://github.com/nearai/ironclaw/issues/7294)、[#7295](https://github.com/nearai/ironclaw/issues/7295)、[#7344](https://github.com/nearai/ironclaw/issues/7344)）集中反映了 **Agent 幻觉**问题——即模型在没有验证实际状态的情况下，制造连接或自动化状态。这已成为系统稳定性的高频痛点，建议优先排查工具调用与状态查询的上下文注入逻辑。

---

#### 6. 功能请求与路线图信号

- **文档真相（Doc-Truth）验证管线** — Issue [#7317](https://github.com/nearai/ironclaw/issues/7317) 的提案已被采纳，对应 5 个 PR 正在落地，将显著改善文档与发布行为的一致性。预计随下个稳定版本生效。
- **用户可重置模型设置** — Issue [#7340](https://github.com/nearai/ironclaw/issues/7340) 要求增加“恢复默认设置”功能。属于体验优化，暂未见对应开发 PR。
- **持久化状态兼容性检查** — Issue [#7380](https://github.com/nearai/ironclaw/issues/7380) 作为 Epic 提出，要求强制 PR 在合并前证明新版本可读取旧版本写入的持久化状态。这是对 `1.0.0-rc.1` → `1.1.0-rc.1` 升级缺陷的回应，具有重要的工程实践价值。
- **用户侧失败信息本地化** — Issue [#7362](https://github.com/nearai/ironclaw/issues/7362) 建议将硬编码的英文错误提示迁移至各端 i18n 体系，提升多语言用户体验。

---

#### 7. 用户反馈摘要

- **记忆与上下文断裂（高频）**：多位测试者（Devon、Tobias 等）反馈，在对话 A 中建立的信息无法在对话 B 中被召回（[#7185](https://github.com/nearai/ironclaw/issues/7185)）。这严重影响了需要长期上下文的用户场景，如法律咨询。
- **Agent 虚构状态（高频）**：用户报告 Agent 会凭空声称“GitHub 已连接”（[#7247](https://github.com/nearai/ironclaw/issues/7247)）或“自动化已运行”（[#7246](https://github.com/nearai/ironclaw/issues/7246)），但实际状态并非如此。这动摇了用户对 Agent 输出准确性的信任。
- **Telegram 体验问题**：配对流程卡死（[#6475](https://github.com/nearai/ironclaw/issues/6475)）、消息不被处理（[#6643](https://github.com/nearai/ironclaw/issues/6643)）、回复串线（[#6644](https://github.com/nearai/ironclaw/issues/6644)），虽有修复但根因（延迟过高）仍在跟踪中（[#7368](https://github.com/nearai/ironclaw/issues/7368)）。
- **调试体验不佳**：用户报告在 Agent 出错时无法通过 UI 按钮捕获 traces（[#7369](https://github.com/nearai/ironclaw/issues/7369)），增加了问题定位难度。

---

#### 8. 待处理积压

以下 Issue 或 PR 长期未获响应或推进，需维护者关注：

- **PR #5503**（[链接](https://github.com/nearai/ironclaw/pull/5503)）— `[Experiment] Add compact Google extension capabilities`，已开启逾一个月，状态为待合并，无近期评论，需确认是否仍在计划内。
- **Issue #7074**（[链接](https://github.com/nearai/ironclaw/issues/7074)）— Multi-tool meeting research 失败，已报告 5 天，无评论、无 fix PR。
- **Issue #5139**（[链接](#)）— 数据未显示，但结合整体数据，存在多个 7 月创建的高优先级 bug（如[#5456](https://github.com/nearai/ironclaw/issues/5456)）无进展。
- **PR #6938**（[链接](https://github.com/nearai/ironclaw/pull/6938)）— 关于技能选择机制的 PR，已开启一周，等待评审，无评论。该 PR 变更了核心行为（由模型决定技能而非关键词评分），需要尽快安排 review。
- **Issue #6590**（[链接](https://github.com/nearai/ironclaw/issues/6590)）— Windows 平台 `serve` 启动失败问题，已开启两周，无回应。由于是平台级阻断问题，建议分配优先级。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-08-08

## 今日速览

项目今日活跃度中等偏高。过去 24 小时内共有 7 条 Issue 更新（4 条活跃、3 条关闭，其中 4 条为 stale 自动关闭）和 7 条 PR 更新（6 条已合并，1 条待合并）。发布新版本 2026.8.7，主要包含 Cowork 对话内搜索、Markdown LaTeX 数学公式分隔符支持及 Windows 安装器修复。新版 Issue 集中于自定义 Provider 模型 ID 含斜杠无法使用的 bug 与新功能请求，已有对应修复 PR 提交。

## 版本发布

**LobsterAI 2026.8.7**（发布于 2026-08-07）

主要变更：
- **Cowork 新增标题栏对话搜索功能** — 可在标题栏直接搜索对话内容（PR #2435，@liuzhq1986）
- **Markdown 支持 LaTeX 数学公式分隔符** — 改进数学公式渲染（PR #2449，@fisherdaddy）
- **Windows 安装器修复** — 通过 extractor 解决 watchdog 退出码为 null 导致的问题（PR #2446，@fisherdaddy）

未发现破坏性变更或需要特别关注的迁移事项，升级路径应保持平滑。

## 项目进展

今日合并 6 个 PR，推进了以下方向：

- **[修复] Cowork 全屏代码工具栏点击失效**（PR #2450）— 将全屏 overlay 移出 Electron 标题栏拖拽区域，修复 Windows 下点击异常
- **[修复] 对话搜索**（PR #2448）— 配合新版对话搜索功能的 bug 修复
- **[修复] OpenClaw 配置清理**（PR #2445）— 从 `config.set` 中剥离由 plugin-index 管理的键，避免配置冲突
- **功能/修复组合**（PR #2449、#2446、#2451）— 前述发布内容对应的合并
- 合并 `release/2026.8.5` 分支至 main（PR #2451），完成版本收敛

当前有 1 个待合并 PR（#2452）直接修复今日新报告的 Model ID 含斜杠问题，预计可纳入下个版本。

## 社区热点

**Issue #2443 — SiliconFlow Provider 模型 ID 含斜杠无法使用**（状态：OPEN，1 条评论）

用户反馈当自定义 OpenAI 兼容 Provider（如 SiliconFlow，Base URL `https://api.siliconflow.cn/v1`）的模型 ID 为 `deepseek-ai/DeepSeek-V4-Flash` 格式时，界面无法选择该模型。该问题与 `custom_0` provider 前缀在存储/渲染时丢失有关。此 Issue 反映了自定义模型生态（尤其是国内服务商）的使用诉求，且社区响应迅速——同日已有对应修复 PR #2452 提交。

值得注意：该 Issue 与待合并的 PR #2452 形成完整闭环，体现了项目对社区反馈的快速响应能力。

## Bug 与稳定性

| 严重程度 | Issue | 描述 | 状态 |
|---------|-------|------|------|
| 中 | [#2443](https://github.com/netease-youdao/LobsterAI/issues/2443) | 模型 ID 含斜杠（如 SiliconFlow 的 `deepseek-ai/...`）时，UI 无法选择该模型 | OPEN，已有待合并修复 PR [#2452](https://github.com/netease-youdao/LobsterAI/pull/2452) |
| 中 | [#2447](https://github.com/netease-youdao/LobsterAI/issues/2447) | Agent 执行无结果且无错误信息输出 | OPEN，信息有限，需进一步确认 |
| 低 | [#1195](https://github.com/netease-youdao/LobsterAI/issues/1195) | 自建 skill 被安装至 OpenClaw 技能目录，重启后技能面板不显示 | OPEN（3 月存量，今日被 stale 标记更新） |

注：今日另有 3 条 Issue 被关闭，均为 stale 自动清理（#1263、#1265、#1273），非本轮修复关闭。

## 功能请求与路线图信号

**「输入框编辑模式」**（Issue #2444，今日新增，0 条评论）— 用户提出两种方案：
1. 设置中可切换 Enter 默认换行、Ctrl+Enter 发送
2. 输入框旁增加「编辑模式」开关，进入后输入框扩展、Enter 换行并支持 WYSIWYG 编辑器

该反馈反映长 Prompt 编辑场景下的高频痛点，且提供了细致的 UX 设计方案，值得纳入后续输入交互优化评估。

## 用户反馈摘要

- **多 Agent 绑定不同 IM 机器人与模型**（Issue #1265 被关闭，用户原诉求）：用户希望不同 Agent 可绑定不同 IM 机器人和模型（如调度机器人 vs 编程机器人用不同模型），以便组建 Agent 团队。该 Issue 被 stale 自动关闭，但此需求在多 Agent 协作场景中有明确价值，建议维护者评估是否值得重新开启或纳入路线图
- **定时任务重复显示与 API rate limit**（Issue #1263 被关闭）：用户遇到定时任务在 UI 重复显示、且均报 API rate limit 错误，但后端仅有一个会话的异常
- **sql.js 高频操作崩溃**（Issue #1273 被关闭）：用户报告 WASM SQLite 高频写入导致 `memory access out of bounds` 崩溃且不可恢复，并指出 `fs.writeFileSync` 非原子写入存在数据库损坏风险。该问题涉及存储层健壮性，虽然被 stale 关闭，但建议维护者关注存储引擎的稳定性

## 待处理积压

- **[Issue #1195](https://github.com/netease-youdao/LobsterAI/issues/1195)（OPEN，4 个月）** — 自建 skill 安装到 OpenClaw 目录后技能面板不显示。今日被 stale 标记更新但保留打开状态，说明有维护者关注。此问题涉及 skill 管理路径的跨目录映射，建议优先处理
- **[Issue #2447](https://github.com/netease-youdao/LobsterAI/issues/2447)（OPEN，今日新开）** — 执行无结果且无错误提示，描述信息不完整（仅截图），需维护者引导补充环境与复现信息，避免演变为陈旧 Issue
- **PR #2452（OPEN，待合并）** — 修复 Issue #2443 的模型 ID 斜杠问题，建议尽快 review 并合并，避免 bug 流入下一版本

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报 — 2026-08-08

## 今日速览

过去 24 小时项目活跃度极高：共处理 31 条 Issue（20 条活跃、11 条关闭）与 47 条 PR（26 条待合并、21 条已合并/关闭），并发布了 v2.1.0-beta.2 新版本。值得关注的是，Windows 桌面端稳定性问题（文本无法选中复制、双击打开应用、安装进程占用等）成为当日社区反馈最集中的方向，同时 Telegram 频道 ACL 白名单因多任务工作区隔离而重置的问题获得了快速修复 PR。整体来看，项目正处于 beta 迭代高峰，社区反馈响应及时，但 Windows 平台的多项回归问题需要优先关注。

---

## 版本发布

### v2.1.0-beta.2

**发布日期：** 2026-08-08

**更新内容：**
- fix(ci): 修复 real-behavior-proof 中的 fence-aware section extraction 问题（fixes #6626）
- fix(checkpoints): 修复 web workspace bootstrap 中自动快照恢复问题

**迁移注意事项：**
- Beta 版本，建议用户在非生产环境验证后使用；涉及 checkpoint 自动恢复逻辑变更，升级前建议手动备份工作区快照。

---

## 项目进展

当日合并/关闭的 21 条 PR 中，以下变更对项目推进具有标志性意义：

- **feat(website): downloads UI Refactoring and opt**（#4694，已关闭）— 官网下载页面 UI 重构完成，优化下载入口与页面性能
- **fix(scripts): repair channel check environment detection**（#6805）— 修复开发环境检测脚本在有效环境下误判失败的问题，提升开发者体验
- **feat(wechat): accept Chinese approval replies (#6728)**（#6804）— 微信渠道支持中文"允许/拒绝"回复，降低非技术用户操作门槛
- **fix: use shared root profile workspace for ACL store**（#6788）— 修复 Telegram 渠道多任务场景下 ACL 白名单重置问题

此外，当日活跃 PR 中值得关注的长期推进方向包括：ReMe 记忆系统增强（#6772）、Playwright 驱动自愈（#6776）、OneBot 远程媒体支持（#6715）、ACP 通知竞态修复（#6623）等，显示项目在记忆、浏览器自动化、多协议接入和 ACP 协议稳定性四个维度均有实质性投入。

---

## 社区热点

### 1. Issue #6782 — Docker 版插件/应用市场始终提示"维护中"（8 评论）
**链接：** https://github.com/agentscope-ai/QwenPaw/issues/6782

2.0.1 Docker 版本用户反馈插件市场和应用市场持续显示维护中，无法使用。该问题与 #6732（MCP 工具周期性失效，需重启容器恢复）共同指向 **Docker 部署模式下的服务稳定性短板**，是当前社区最集中的痛点之一。

### 2. Issue #6116 — Agent 单轮内重复触发同一工具调用（Doom loop）（8 评论，已关闭）
**链接：** https://github.com/agentscope-ai/QwenPaw/issues/6116

Agent 在单轮对话内反复调用同一工具达 6 次才触发系统警告，期间浪费大量 API 调用和 token。该问题与此前 #6773（Linux 上 doom-loop 防护失效）等 Issue 相互印证，说明 **Agent 循环防护机制在多个平台/模式下仍存在覆盖盲区**。

### 3. Issue #6732 — MCP 工具规律性失效（6 评论）
**链接：** https://github.com/agentscope-ai/QwenPaw/issues/6732

用户报告每隔数小时 MCP 工具即失效，报"未注册或不存在"，重启 Docker 容器后恢复。该问题影响面较大，社区诉求集中在 **MCP 注册状态的自愈能力**上。

### 4. Issue #6490 — 请求添加火山引擎 Agent Plan 与小米 MiMo 标准 API 内置 Provider（4 评论）
**链接：** https://github.com/agentscope-ai/QwenPaw/issues/6490

用户请求将火山引擎订阅制接口和小米 MiMo 按量付费接口纳入内置 Provider 列表，并附带修复现有 Provider 中的问题。反映社区对 **国产模型/云服务的接入需求增长**。

---

## Bug 与稳定性

### 严重 — 有 PR 修复

| Issue | 问题描述 | PR |
|-------|---------|-----|
| [#6786](https://github.com/agentscope-ai/QwenPaw/issues/6786) | Telegram 频道 ACL 白名单在 multica 启动新任务时被重置，已批准用户被拒绝访问 | [#6788](https://github.com/agentscope-ai/QwenPaw/pull/6788) |
| [#6785](https://github.com/agentscope-ai/QwenPaw/issues/6785) | 2.1.0b2 回归：Profile 分类硬编码官方 persona 文件，自定义 .md 无法切换 | [#6808](https://github.com/agentscope-ai/QwenPaw/pull/6808) |

### 严重 — 暂无 PR

- **#6810（Windows 安装/更新进程占用导致安装失败）** — NSIS 安装器在覆盖文件前未终止占用进程，浏览器扩展 NM host 锁文件导致报错卡死，v2.1.0b1 自动更新同样受影响。需在安装/更新逻辑中前置进程终止。
- **#6813（KeyError: '__aiter__' 导致聊天自动标题生成失败）** — 与 agentscope 2.x ChatResponse 的结构变更相关，影响自动标题功能的可用性。
- **#6812（Google API 中 Model 'unknown' 执行失败）** — Gemini Provider 发送包含 $schema 字段的工具定义，被 Gemini API 拒绝（来自 Fable 5 诊断）。

### 中等

- **#6780：2.0.1 版空闲几十分钟后卡死**，只能重启进程（3 评论）
- **#6775：Malware Bytes 将 Windows 桌面版标记为 Trojan Loader**，用户表示将卸载直至得到官方回复（2 评论）
- **#6811：OpenAI Responses 续写摘要忽略 disable_thinking，60 秒取消被误报为格式错误**（2 评论）
- **#6803：OpenAI 兼容端点携带 Responses-API 专属字段，被严格校验的 Provider（StepFun）以 400 拒绝** — 已有对应 PR #6809
- **#6794：Agent Kanban 创建 Issue 返回 405，热重载期间短暂 404**（2 评论）
- **#6806/#6807：qwenpaw-creator 插件在 Windows 上无法保存模型配置、视频/图片生成完全不可用**（各 1 评论）
- **#6776：Playwright 驱动连接死亡后永久失效** — 已有自愈 PR #6776

### 已关闭

- **#6773：Linux 上 /goal 与 /mission 模式下 doom-loop 防护完全不生效**（已关闭）
- **#6796：2.1 beta2 任务执行时无法提起新会话**（已关闭）
- **#6797：v2.1.0b2 桌面模式无法选中复制对话文本**（已关闭）— 相关修复 PR #6801/#6802

---

## 功能请求与路线图信号

### 高概率纳入下一版本

- **#6490：火山引擎 Agent Plan + 小米 MiMo API 内置 Provider** — 已有 4 条评论，社区对国产服务接入需求明确，实现成本相对可控
- **#6770：允许用户配置 Chrome 标签页在响应周期外的存活时间** — 涉及浏览器自动化资源管理策略，与 #6776（Playwright 自愈）方向一致

### 方向性信号

- **#6285：Aliyun Token Plan 模型列表硬编码未更新至 qwen3.8-max-preview** — 需将内置模型列表改为动态拉取或加快更新节奏
- **#6800：邮箱智能管理助手（实时监控 + 访问控制）** — 新功能 PR，扩展 Agent 在 IMAP/邮件场景的能力边界

---

## 用户反馈摘要

- **桌面模式文本无法选中复制**是当日报复率最高的反馈（#6797 关闭后仍有 #6801/#6802 两个修复 PR），有用户明确表示"只能点击复制整段话"体验受限。另有用例反馈"左键需点击两次才打开应用，且无返回完整模式的按钮"（#6790），指向桌面模式交互细节打磨不足。
- **Docker 部署链路**用户集中反馈两类体验问题：插件/应用市场不可用（#6782）和 MCP 工具周期性失效（#6732），均需重启容器恢复，说明 Docker 环境下的服务注册与健康检查机制有待加强。
- **安全软件误报**（#6775）需官方及时回应以降低用户恐慌。用户原文："I'm uninstalling until I hear back from your team. PS. I love your work."——既表达信任也表达了焦虑，建议官方发布安全说明或签名优化。
- **Telegram/WeChat 渠道**的反馈体现出多语言社区需求差异：Telegram 用户遇到 ACL 重置问题，WeChat 用户则受益于新增的中文审批回复支持（#6804），显示渠道适配在持续完善。
- **ACP 协议使用场景**下出现的问题（ACL 白名单重置 #6786、会话身份死锁 #6750、最终文本丢失 #6623）说明该协议虽在快速迭代，但多实例/多工作区场景下的状态隔离策略需要系统性审视。

---

## 待处理积压

### 长期未响应 Issue

- **#6612（约 8 天）** — 损坏的 agent 配置 JSON 导致加载崩溃，已有 PR #6615 等待合入
- **#6625（约 7 天）** — ACP 通知与响应竞态导致最终文本丢失，已有 PR #6623 等待合入
- **#6555（约 9 天）** — 滚动压缩前未刷新待处理记忆，已有 PR #6564 在 Review 中

### 需关注但尚无 PR 的活跃问题

- **#6782（Docker 市场维护中）** 与 **#6732（MCP 工具周期性失效）** — 均为 Docker 部署稳定性问题，社区呼声高且影响面大，截至目前仍无明确修复方案或 PR。
- **#6786（Telegram ACL 重置）** — 已有修复 PR #6788，但 Issue 状态仍为 OPEN，建议维护者优先合入并在新版本中验证。
- **#6810（Windows 安装进程占用）** — 当天新开且反馈详实，涉及安装器逻辑变更，建议排入下个 patch 版本。

---

*本日报基于 CoPaw（github.com/agentscope-ai/CoPaw）公开 GitHub 数据生成，数据截至 2026-08-08。*

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

过去24小时无活动。

</details>

---
*本日报由 [agents-radar](https://github.com/huang-yi-dae/agents-radar) 自动生成。*