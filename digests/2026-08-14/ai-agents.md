# OpenClaw 生态日报 2026-08-14

> Issues: 500 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-08-14 01:40 UTC

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

OpenClaw 项目在 2026-08-14 当日保持极高的社区活跃度，过去 24 小时内 Issues 与 PR 更新均达到 500 条上限。虽然今日无新版本发布，但问题追踪与代码提交节奏非常密集，且大量高优先级（P1/P2）问题处于讨论或修复中。数据表明维护者正在集中处理历史累积的“会话状态（session-state）”与“消息丢失（message-loss）”类可靠性问题，同时社区对 Control UI 的细节体验修复有大量 PR 贡献。**关注点**：高吞吐的问题流动并未带来新的 Release，存在大量待合并 PR（388 条），合并管线可能成为下一步瓶颈。

---

### 2. 版本发布

**无**。过去 24 小时无新版本发布。项目当前处于高频率修复与功能迭代的进行时，下一版本发布值得期待，特别是针对今日众多已就绪（`ready for maintainer look`）的 UI 与稳定性修复 PR。

---

### 3. 项目进展

今日无重大功能合入，但多项关键 Bug 修复已完成合并或处于待合并状态，主要聚焦于修复 **Control UI 交互细节**与 **Gateway 状态同步**问题。根据 PR 标签，以下高价值修复已就绪，等待维护者合并（`status: 👀 ready for maintainer look`）：

- **[会话卡死修复]** `fix(gateway): sessions stuck showing a phantom active run until restart` (#123192): 修复会话在结束后仍显示“运行中”徽章且停止按钮无效的问题，消除需重启才能恢复的卡死状态。
- **[模型切换兼容性]** `fix(ai): provider terminal errors show as generic unknown error and trigger pointless failover` (#123151): 修复提供商终端错误（如内容过滤）被误报为未知错误，并触发无意义的故障转移，改善错误可观测性。
- **[认证恢复]** `fix(doctor): sidecar OAuth recovery misses PI_CODING_AGENT_DIR and strands recoverable secrets` (#123187): 修复 `doctor --fix` 在特定环境变量下无法恢复遗留 Codex OAuth 凭据的问题。
- **[前端体验]** 一系列来自 `steipete` 的 UI 修复，包括：修复 IME 合成导致的输入框卡死 (#123249)、修复十进制输入被清除 (#123210)、修复未读徽章无法清除 (#123252)、修复深链接大小写敏感 (#123207) 等，显著提升 Control UI 稳定性与可用性。

**结论**：虽然无新功能落地，但项目在稳定性与用户体验的“填坑”上迈出了一大步，大量影响日常使用的会话与 UI 缺陷已具备修复补丁。

---

### 4. 社区热点

今日讨论热度高度集中于**消息丢失**与**会话状态损坏**两大主题，长期悬而未决的问题持续引发开发者共鸣，用户呼声极高。

#### 4.1 静默回复失败复发（讨论度 TOP 1）
- **Issue** [#121058: Silent reply failures still recurring after #116277 closed — no queued reply payload](https://github.com/openclaw/openclaw/issues/121058)（评论 92，持续高热）
- **诉求**：用户 `sloptop-the-terrible` 指出 #116277 关闭后，静默回复失败问题依旧存在，监控 cron 仍持续记录新故障，没有任何排队回复负载。该问题已存在数日，维护者虽有关闭动作但未能根治，社区对反馈闭环的缺失感到沮丧。
- **信号**：该问题是当前社区最大的痛点，涉及核心的消息传递链路可靠性，亟需维护者给出根治方案或明确的重复问题标记。

#### 4.2 子代理完成消息丢失（多贴讨论）
- **Issue** [#44925](https://github.com/openclaw/openclaw/issues/44925)（评论 27）、[#67777](https://github.com/openclaw/openclaw/issues/67777)（评论 10）、[#92433](https://github.com/openclaw/openclaw/issues/92433)（评论 9）等形成“子代理结果静默丢失”系列讨论。
- **诉求**：用户反馈在使用子代理（subagent）进行并行任务编排时，完成通知在超时、排队或会话清理等场景下会静默丢失，无重试、无通知。这直接破坏了多代理工作流的可靠性，用户希望有明确的投递保证（at-least-once delivery）或失败重试机制。

---

### 5. Bug 与稳定性

今日 Bug 报告密集，问题主要集中在 **P1（高优先级）**，且大量为长期未修复的“顽固”问题。按影响面与严重程度排列：

| 严重程度 | 关键问题 | 状态与 Fix PR |
| :--- | :--- | :--- |
| **严重（P1/钻石级）** | **子代理 / 主会话消息丢失或卡死**：[#44925](https://github.com/openclaw/openclaw/issues/44925)（静默丢失）、[#47975](https://github.com/openclaw/openclaw/issues/47975)（会话保持）、[#92433](https://github.com/openclaw/openclaw/issues/92433)（投递丢失）、[#85714](https://github.com/openclaw/openclaw/issues/85714)（最终消息滞留） | 多个关联 PR 处于开放/待合并状态，但未有明确的统一修复。 |
| **严重（P1/铂金级）** | **Cron 任务在 DeepSeek 上停滞**：[#121953](https://github.com/openclaw/openclaw/issues/121953)。前缀 `[cron:` 导致 DeepSeek API 边缘节点低优先级处理，用户等待数十秒至数分钟。 | 无修复 PR，需要与提供商协调或修改前缀策略。 |
| **严重（P1/钻石级）** | **多代理网关过载**：[#72015](https://github.com/openclaw/openclaw/issues/72015)。`active-memory` 插件阻塞回复 + QMD 初始化过载网关。 | 无明确修复 PR，需要架构优化。 |
| **中等（P2）** | **内存管理混乱**：[#43747](https://github.com/openclaw/openclaw/issues/43747)。用户反映各实例内存处理逻辑不一，存在嵌入不一致与存储路径差异。 | 无新的修复 PR，存在长期未决风险。 |
| **中等（P2）** | **SQLite 无界增长**：[#114612](https://github.com/openclaw/openclaw/issues/114612)。`memory_index_chunks` 与 `memory_embedding_cache` 表无保留策略，会缓慢填满磁盘。 | 无修复 PR，需要引入清理机制。 |
| **轻微（P2）** | **UI 细节问题**：今日合并的 PR 已解决大部分 Control UI 的输入、图标、徽章问题。 | 已由 `steipete` 主导的大量小规模 PR 解决（见 [PR #123210](https://github.com/openclaw/openclaw/pull/123210) 等）。 |

---

### 6. 功能请求与路线图信号

- **记忆信任标记（Memory Trust Tagging）**（[#7707](https://github.com/openclaw/openclaw/issues/7707)，评论 48）：呼声最高的功能请求。用户建议按来源（用户指令、网络抓取、第三方技能）标记记忆可信度，以防御通过恶意网页内容进行的“记忆投毒”攻击。鉴于社区讨论热度高且涉及安全，该提案有较大概率被纳入路线图设计与讨论。
- **网页端 TTS/STT 自定义支持**（[#45508](https://github.com/openclaw/openclaw/issues/45508)，评论 7）：webchat 应支持网关配置的 TTS/STT 服务，而非强制使用浏览器原生 API。该请求贴合“自托管优先”的社区理念，且实现路径清晰（将音频流路由至网关），有望被采纳。
- **增加投递队列 TTL 机制**（[#16555](https://github.com/openclaw/openclaw/issues/16555)，评论 6）：要求为持久化投递队列增加过期时间，防止陈旧消息在网关重启后刷屏。这与今日 #121058 的静默失败问题高度相关，若实现可缓解部分恢复场景的困扰。

---

### 7. 用户反馈摘要

- **对“静默失败”容忍度降低**：多个热门 Issue（#121058、#44925、#67777）的讨论中，用户普遍反映“无错误提示、无日志、无重试”的失败模式严重打击了对工具的信任感，尤其是用于生产环境的自动化工作流。社区期望是“要么成功，要么明确告知失败原因并给出恢复路径”。
- **配置与文档一致性困扰**：在 [#43747](https://github.com/openclaw/openclaw/issues/43747) 中，用户反映 `openclaw doctor` 的修复操作曾在权限错误后覆盖配置文件；在 [#45758](https://github.com/openclaw/openclaw/issues/45758) 中，用户较为一致地支持引入 YAML 作为配置格式，认为其比 JSON5 更易读、更符合 DevOps 习惯。
- **对 UI 细节的感谢**：在针对 `steipete` 系列 UI 修复 PR 的评论中（虽未展示，但 PR 密集且标记“ready”），社区整体反馈积极，认为细致打磨的体验（如保留聊天面板、修复输入框卡死）显著提升了日常使用的顺滑度。

---

### 8. 待处理积压

以下为长期开放、未得到有效解决或未引起维护者注意的高价值 Issue，建议优先跟进：

- **P1 / 核心稳定性**：[#7707 记忆信任标记](https://github.com/openclaw/openclaw/issues/7707)（48 评论，讨论度高，无维护者回复）。该需求已悬而未决 6 个月以上，建议尽快给出产品决策与安全评估。
- **P1 / 核心通道阻塞**：[#40611 Heartbeat 阻塞 Telegram](https://github.com/openclaw/openclaw/issues/40611)（评论 7，被标为`clawsweeper:no-new-fix-pr`）。该回归自 3 月发现以来，跨越多个大版本（3.7 至今）仍未修复，严重影响常用通道的日常交互体验。
- **P2 / 数据损坏风险**：[#114612 SQLite 无界增长](https://github.com/openclaw/openclaw/issues/114612)（评论 6，无维护者确认）。磁盘占满将导致系统崩溃，建议至少给出临时规避方案（如手动清理 SQL 语句）。
- **P2 / 平台适配**：[#115421 Schema 降级清空数据库](https://github.com/openclaw/openclaw/issues/115421)（评论 6）。用户在降级/恢复场景下丢失 cron 任务，涉及数据安全，需要制定稳妥的迁移策略而非直接隔离文件。

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比报告

**报告日期：2026-08-14**


## 1. 生态全景

个人 AI 助手/自主智能体开源生态正处于**从"功能堆叠"向"可靠性攻坚"的关键转折期**。头部项目（OpenClaw、ZeroClaw、IronClaw）在架构上加速向"内核化"和"可插拔"演进，但普遍受困于消息丢失、会话状态损坏、静默失败等核心链路稳定性问题，"要么成功、要么明确告知失败原因"已成为社区最强烈的共性诉求。安全加固开始从"响应式修复"走向"系统性防护"，多家项目已出现针对认证绕过、命令注入、镜像签名链等维度的主动审计（ZeroClaw、NanoClaw、CoPaw）。与此同时，生态内部出现显著的差异化趋势：非英语市场（中文社区）的智能体项目（CoPaw、EasyClaw）正围绕电商、达人营销等垂直场景建立独立的产品逻辑，与英语世界的通用型 agent 框架形成分化和互补。整体而言，技术底座趋于收敛（MCP、Agent Plugins、会话持久化），但可靠性、安全信任与场景化落地仍是决定下一阶段竞争格局的核心变量。


## 2. 各项目活跃度对比

| 项目 | 今日 Issues 更新 | 今日 PR 更新 | 今日新版本 | PR 待合并积压 | 健康度评估 |
|:---|:---|:---|:---|:---|:---|
| **OpenClaw** | 500（达上限） | 500（达上限） | 无 | 388 | 高度活跃，但合并管线成为瓶颈；大量 P1 稳定性问题待根治 |
| **NanoBot** | 12 | 31 | 无 | ~8 | 活跃，核心链路稳定性修复密集提交；部分长期 PR 出现冲突 |
| **ZeroClaw** | 100 | 40 待合并 | 无 | 40（8 条 XL） | 活跃，安全加固占主导；needs-author-action 积压（12 条）值得警惕 |
| **NanoClaw** | 2 | 19 | **v2.2.0** | ~7 | 健康，CI 签名验证链路大幅加强；新功能与修复配比均衡 |
| **IronClaw** | 50 | 50 | **v1.2.0**（昨日） | ~10 | 健康，架构演进清晰（可插拔 Agent 循环），性能优化为主线 |
| **CoPaw** | 42 | 50 | **v2.1.0**、v2.1.0-beta.5 | 31 | 活跃，功能里程碑落地；出现 2 起安全报告需立即关注 |
| **LobsterAI** | 1 | 11 | 无 | 5（多为 3-4 月 stale 遗留） | 中等，UI 一致性重构推进中；遗留 PR 清理压力大 |
| **Moltis** | 1 | 4 | 无 | 4 | 低活跃；大型功能 PR（#1190）等待评审 |
| **PicoClaw** | 3 | 6 | 无 | ~5 | 低活跃；Web UI 卡顿与 lockfile 损坏待处理 |
| **EasyClaw** | 0 | 0 | **v1.8.98**、**v1.8.99** | 0 | 独立迭代节奏，功能完善期；无阻塞问题 |
| **NullClaw / TinyClaw / ZeptoClaw** | 0 | 0 | 无 | — | 无活动 |

> 数据说明：OpenClaw 的 500 条上限为 GitHub API 返回上限，实际可能更高；NanoClaw、IronClaw、CoPaw 虽今日无新 Release，但整体工程推进显著。


## 3. OpenClaw 在生态中的定位

OpenClaw 仍是生态中**社区规模最大、讨论密度最高的项目**（单日 500 条 Issue/PR 更新触及上限，远超其他项目），是事实上的"参照系"。其核心优势在于：一是**渠道覆盖广度**——Telegram、Matrix、WhatsApp、WeChat 等渠道均有涉及，且多通道问题的复杂性远超多数同类项目；二是**社区贡献者梯队的深度**——如 `steipete` 一次性提交大量 UI 修复 PR，体现了成熟的开源协作生态。技术路线上，OpenClaw 采用"**单体应用 + 插件/技能扩展**"的路径，与 ZeroClaw 的"安全优先+RFC 驱动"形成鲜明对比，与 IronClaw 的"可插拔循环"架构分属不同代际的框架思路——前者倾向于"内置完善的通用 Agent"，后者朝向"内核化 + 外部成熟循环接入"。然而其核心痛点同样明显：**消息丢失、会话状态卡死、静默失败**等 P1 问题已持续数日甚至数月未根治，且 388 条待合并 PR 的合并管线积压正在形成新的治理风险。若此类核心可靠性问题持续外溢，叠加生态竞争者的快速迭代，OpenClaw 的市场领导地位将面临实质性挑战。


## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|:---|:---|:---|
| **消息/任务投递可靠性** | OpenClaw、NanoBot、CoPaw | 子代理/会话消息静默丢失、无重试或通知；要求 at-least-once 投递保证、队列 TTL、失败可视化 |
| **会话状态持久化与一致性** | OpenClaw、NanoBot、ZeroClaw、IronClaw | 会话卡死、上下文串扰、归档失败导致状态破坏；要求原子性保存与快照回滚机制 |
| **内存/上下文管理与成本控制** | OpenClaw（SQLite 无界增长）、ZeroClaw（OpenRouter prompt cache）、CoPaw（长会话 1MB 超时）、IronClaw（记忆召回不可靠） | 数据保留策略缺失、上下文成本高、长会话性能劣化；要求系统性清理机制与 token 级计量 |
| **模型 Provider 稳定性与错误可观测性** | OpenClaw（DeepSeek cron 停滞）、IronClaw（Sonnet-5 500 错误）、CoPaw（Anthropic 误判） | 模型端故障导致任务中断或误判；要求错误分类更精确、故障转移避免"无意义触发" |
| **安全加固（系统性）** | ZeroClaw、NanoClaw、CoPaw | 认证绕过、镜像签名链完整性、插件静默创建定时任务、命令注入；从"响应式修复"走向"主动审计 + 门禁强制" |
| **Agent 可移植性/标准格式** | NanoClaw（Agent Plugins 1.0.0）、ZeroClaw（agents export bundle）、IronClaw（pluggable agent loops） | 模板/插件格式统一化、跨环境迁移能力；为生态互操作奠定基础 |
| **动态模型路由与 Provider 适配** | PicoClaw（子代理模型覆盖）、CoPaw（自定义 provider capability）、NanoBot（QwenCloud 提供商） | 子代理/工具级模型选择、提供商配置灵活化；满足多智能体编排场景需求 |


## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 关键架构差异 |
|:---|:---|:---|:---|
| **OpenClaw** | 通用个人 AI 助手，多通道（Telegram/Matrix/WhatsApp）覆盖，强调 UI 体验打磨 | 个人开发者、普通用户，追求开箱即用 | 单体应用，内置丰富功能，通过插件/技能扩展 |
| **NanoBot** | 多平台消息代理（Telegram/Matrix/Discord），会话管理与 Cron 调度深度优化 | 自托管社区、自动化工作流用户 | 相对轻量，MCP 与 Cron 调度器为核心，无重量级 UI |
| **ZeroClaw** | 安全优先的自主智能体框架，强调可验证凭证链、SOP 权限、多代理编排 | 对安全性/审计要求高的企业级用户、安全研究人员 | 内核化架构，RFC 驱动设计，政策对象类型化，面向可验证执行 |
| **NanoClaw** | Agent 模板/插件管理，CI/CD 签名验证、群组化 Agent 编排 | 平台运维者、需要规模化部署 Agent 的团队 | Agent Plugins 1.0.0 标准化，高度自动化的镜像晋升流水线 |
| **IronClaw** | 云原生 Agent 编排，文档处理（docx/pdf）、扩展中心 | 企业级用户、云服务场景 | 可插拔 Agent 循环（HarnessDriver 合约），沙箱化执行，数据持久化重写 |
| **CoPaw** | 中文场景优先的通用对话助手，支持多渠道、OS Shell 桌面级 UI，电商生态 | 中文用户、国内云服务（阿里云百炼）使用者 | 与 OneBot/QQ 等国内通道深度适配；插件系统；渠道/记忆实现与 OpenClaw 联动 |
| **LobsterAI** | 桌面端渲染层，与 OpenClaw 生态联动，企业版功能 | OpenClaw 桌面端用户，企业场景 | 渲染/主进程分层，部分 skill/connector 视图逻辑仍与 OpenClaw 同步耦合 |
| **Moltis** | 数据注入与索引（频道历史只读接入、CalDAV、全文搜索） | 关注数据本地化/检索能力的用户 | 持久化连接器框架，提供聚合搜索投影层，无自主对话闭环 |
| **PicoClaw** | 轻量级 Go 实现，语音输入、子代理编排 | 偏好 Go 生态的用户、资源受限环境 | 静态配置驱动，依赖 Go 工具链；MCP 支持但架构更轻 |
| **EasyClaw** | TikTok 达人营销工作流（商品知识、精准推荐、用量归因） | 电商运营/达人营销从业者 | 垂直场景闭源逻辑商业闭环，无开源社区协作；版本迭代以业务驱动 |


## 6. 社区热度与成熟度

| 分层 | 项目 | 特征 |
|:---|:---|:---|
| **快速迭代期（功能/架构驱动）** | OpenClaw、ZeroClaw、IronClaw | 单日 Issue/PR 达百条级；OpenClaw 密集修复 UI/体验但核心可靠性问题待根治；ZeroClaw 处于安全加固与 v0.9.0 破坏性变更密集开发期，RFC 双轨驱动；IronClaw 有明确 Epic（#7482）分解执行，版本快速促进 |
| **质量巩固期（稳定性/基础设施驱动）** | NanoBot、NanoClaw、CoPaw | NanoBot 集中修复会话持久化与 Cron 调度器容错；NanoClaw 完成 Agent Plugins 标准化与签名验证链闭环；CoPaw 落地 OS Shell 新功能后转向渠道/记忆系统修复。三者均有版本发布从侧面印证其节奏（NanoClaw v2.2.0、CoPaw v2.1.0） |
| **低活跃/间歇期** | Moltis、PicoClaw、LobsterAI | 单日 1-6 条 PR 更新，多处于少量维护者驱动的补漏与适配阶段；Moltis 的 #1190 大型 PR 若合并将改变活跃度；LobsterAI 的 stale PR 积压清理成为主要动作 |
| **独立迭代/零活跃** | EasyClaw | 无 Issues/PR 却连续双版本发布，属商业团队独立驱动，无社区参与。其余（NullClaw/TinyClaw/ZeptoClaw）完全静默；需警惕其"影子跟随"策略——多数无实际同步代码，仅做命名/外观模仿，无生态信号 |


## 7. 值得关注的趋势信号

**1. "静默失败"的容忍度降至冰点。** OpenClaw、NanoBot、CoPaw 三大项目的用户均明确反馈"无错误提示、无日志、无重试"的失败模式不可接受。这标志着自主智能体从"可用即可"进入"可审计、可信赖"的下一阶段。**开发者参考**：在设计 Agent 任务链路时，需默认采用 at-least-once 语义与显式失败 API，而非尽力而为。

**2. 安全从"修补"走向"架构内置"。** ZeroClaw 的策略对象类型化、NanoClaw 的镜像签名强制门禁、CoPaw 的插件定时任务权限缺陷，共同指向一个方向：安全不再通过补丁外挂，而是以类型/合约形式嵌入内核。**开发者参考**：新框架选型时，应优先关注安全机制是否位于架构核心层（如策略类型化），而非停留在中间件集成。

**3. Agent 可移植性（标准格式）开始萌芽。** NanoClaw 的 Agent Plugins 1.0.0、ZeroClaw 的 `agents export` bundle、IronClaw 的可插拔循环合约，是行业向前兼容与跨平台互操作的最早期信号。**开发者参考**：如果构建长期资产，应优先采用标准化的 Agent 描述与插件格式，避免绑定特定框架的私有实现。

**4. 上下文成本控制成为刚需。** OpenClaw（SQLite 无界）、ZeroClaw（OpenRouter prompt cache）、CoPaw（长会话 1MB 超时）、NanoBot（MCP Schema 字节预算）——生态内同时出现从存储层、传输层、模型层三路并进的成本优化举措。**开发者参考**：需在架构早期内置 token 计量与上下文预算机制，而非事后补救。

**5. 中文生态正走出一条独立演进路径。** CoPaw 已不再只是 OpenClaw 的中文本地化版本——其 OS Shell、多步骤任务模式、与中文云厂商计费体系的集成，标志着中文 AI Agent 社区开始建立独立的产品叙事。**开发者参考**：面向中文市场时，需超越翻译层面，深度适配本地生态（模型、渠道、云服务、支付）与用户习惯。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

### NanoBot 项目动态日报 — 2026-08-14

#### 1. 今日速览
今日项目活跃度较高，共产生 12 条 Issue 更新和 31 条 PR 更新，主要集中在会话管理、Cron 调度器稳定性、MCP 架构优化及 WebUI 体验改进。值得关注的是，围绕会话持久化（Session Persistence）和 Cron 调度器容错出现了多个高质量 Bug 报告及配套修复 PR，表明项目在稳定性方向投入明显。安全漏洞 Issue (#5306) 已关闭，存在修复。当前有 2 个 PR 存在冲突标记（#5357, #5358），需要维护者协调。

---

#### 2. 版本发布
**无**

---

#### 3. 项目进展
今日无 PR 被合并至主分支（仅关闭 2 个 PR: #5381, #5384）。但多个核心修复 PR 已提交，等待评审合并，具体包括：

- **Cron 调度器稳定性修复**: PR #5376 修复了 `CronService._on_timer` 中单次持久化失败导致调度器永久死亡的问题（对应 Issue #5373）。此前，`_save_store()` 抛出的异常会绕过 `_arm_timer()`，使定时任务彻底失效。该 PR 将 `_arm_timer()` 移入 `finally` 块，确保调度器存活。
- **会话归档与合并修复**: PR #5380 修复了文件上限归档失败导致会话状态被破坏的问题（对应 Issue #5378），通过快照回滚机制保证原子性。PR #5379 修复了合并过程中截断输入但推进游标导致消息丢失的问题（对应 Issue #5377），改为有界无损分块写入。
- **MCP Schema 预算机制**: PR #5388 实现了可选的模型可见 MCP Schema 字节预算（对应 Issue #5298），在保留全部内置工具和可执行 MCP 工具不变的前提下，从最新请求中确定性选取子集，控制上下文成本。
- **Telegram 贴纸与反应**: PR #5387 为 Telegram 频道增加了贴纸收发支持（对应 Issue #5289），并保留现有确认反应流程。

---

#### 4. 社区热点
- **Issue #5373 (Cron 调度器永久失效)**: 该 Bug 因后果严重（调度器静默死亡且无自动恢复机制）获得 1 条评论，并触发了 3 个相关 PR（#5374、#5375、#5376），其中 #5376 为最终版。讨论集中在异常处理边界与 `try/finally` 正确用法。痛点在于 `_arm_timer()` 位于 `try/finally` 之外，导致持久化失败时无法重新调度。  
  [链接](https://github.com/HKUDS/nanobot/issues/5373)

- **Issue #5251 (MCP Apps 宿主支持)**: 评论持续更新（1 条），PR #5386 已提交，旨在保留 MCP Apps 结果元数据而不扩展模型上下文。用户希望 WebUI 能原生渲染 MCP Apps 的交互界面，不仅限于文本/图像输出。  
  [链接](https://github.com/HKUDS/nanobot/issues/5251)

- **Issue #4841 (Matrix 设备信任问题)**: 评论 1 条，PR #5385 已提交，实现了 Element SAS 验证请求的完整流程（`m.key.verification.request` → `ready` → MAC 校验 → `done`）。社区已等待 1 个月，此 PR 直接回应了用户对“不可信设备”警告的长期困扰。  
  [链接](https://github.com/HKUDS/nanobot/issues/4841)

---

#### 5. Bug 与稳定性
按严重程度排列：

| 严重度 | Issue | 描述 | Fix PR 状态 |
|--------|-------|------|-------------|
| **高** | [#5378](https://github.com/HKUDS/nanobot/issues/5378) | `enforce_file_cap()` 归档失败后，内存会话已丢失溢出消息，后续保存无法恢复 | PR #5380 已提交 |
| **高** | [#5377](https://github.com/HKUDS/nanobot/issues/5377) | 合并截断后仍推进游标，导致消息永久丢失 | PR #5379 已提交 |
| **高** | [#5373](https://github.com/HKUDS/nanobot/issues/5373) | Cron 调度器因单次持久化失败永久死亡 | PR #5376 已提交 |
| 中 | #5306 | **（已关闭）** `exec.allowPatterns` 存在 shell 链绕过的安全漏洞 | 已处理 |
| 低 | [#5348](https://github.com/HKUDS/nanobot/issues/5348) | 设置测试在 UTC 时区窗口内失败（约 5 小时/天） | PR #5349 已提交 |

---

#### 6. 功能请求与路线图信号
- **MCP 上下文瘦身 (Issue #5298)**: 多个用户关注大工具集的上下文成本。PR #5388 已实现字节预算+确定性选取，属 opt-in，预计可进入下一版本。
- **MCP Apps 宿主 (Issue #5251)**: PR #5386 保留 MCP Apps 元数据与富调用结果，但不增加模型上下文。后续需跟进 WebUI 渲染层接入。
- **WebUI 本地化 (Issue #5366, #5368)**: 社区连续提出 Agent 活动中英文文案问题及运行中复制/分叉操作误导问题，目前仅停留在 Issue 阶段，尚无对应 PR。建议纳入下个 UI 迭代。
- **QwenCloud 提供商 (Issue #5350)**: 用户建议在保留 DashScope 兼容性的同时新增 QwenCloud 路径，当前无相关代码或 PR，属前瞻性需求。

---

#### 7. 用户反馈摘要
- **稳定性诉求集中**: 多位用户遭遇 Cron 静默死亡、会话归档失败、消息丢失等数据一致性问题。贡献者在同一天内提交了 3 个修复 PR（#5376, #5379, #5380），说明这些问题在真实部署中复现率高、影响大。
- **平台集成缺口**: Matrix 用户明确表达 Element 中“未信任设备”警告带来的可用性障碍（#4841），Telegram 用户提到贴纸不支持导致消息格式混乱（#5289）。
- **工程协作痛点**: 多个长期未合入 PR（#4549, #4550, #4551, #4556，均为 6 月提交）出现合并冲突，社区贡献者在等待维护者协调，可能影响贡献者积极性。

---

#### 8. 待处理积压
- **PR #4550 (fix(cron): 按运行隔离会话键)**: 修复 cron 运行间上下文串扰，6 月 26 日提交，标注 priority: p1，至今未合并，已出现冲突。
- **PR #4549 与 PR #4551 (心跳模型覆盖与隔离会话)**: 同为 6 月提交的功能扩展，涉及心跳成本优化和共享会话选项，长期待评审。
- **PR #4556 (Dream 合并中的 model_override)**: 与 #4549 配套，重构后可能已过时，需维护者确认是否继续。
- **PR #5358 (WebUI 会话协作)**: 今日更新，标注 `conflict`，需合并上游变更后方可评审。
- **Issue #4841 (Matrix 交叉签名)**: 已开放 1 个月，今日终于有对应 PR #5385，建议尽快优先审查该 PR，回应社区长期等待。

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-08-14


## 今日速览

过去 24 小时项目活跃度极高，GitHub 共产生 100 条 Issues/PR 更新。当前积压问题已形成以 **RFC 评审（#8692）** 和 **v0.9.0 安全/架构破坏性变更队列（#7432）** 为核心的双轨驱动模式，安全类 issue/PR 占比超过三分之一，且多个新提交直接针对审计发现的漏洞（如未认证 `/api/pair` 锁绕过 #9389、GitHub Actions 缓存投毒面 #9527）。PR 侧同样繁忙，40 条待合并 PR 中 8 条为 XL 级大改动，另有 6 条高优先级安全修复处于 open 状态；在已合并的 PR 中，安全加固实际占三分之二且多为 P1/P2 级，说明项目当前处于密集安全加固期。但值得关注的是，新开/活跃 issues 中约 **40% 处于 needs-author-action 状态（12 条）**，另有 **7 条被 blocked**，可见虽社区提案火热，但作者响应和依赖解锁存在明显阻塞，有成为积压风险的趋势。


## 项目进展

今日无新版本发布，合并/关闭的 10 条 PR 主要集中在安全加固与基础设施补全，项目整体处于向 v0.9.0（含大量 breaking changes）迈进的密集开发期。

**已合并重点 PR：**

- **[PR #9966] fix(container): match nested fixture manifests by glob** — 修复了 Dockerfile 中 `crates/*/Cargo.toml` glob 无法匹配嵌套 workspace 成员（如 `crates/plugin-xxx/Cargo.toml`）导致 CI 依赖预取阶段失败的问题，直接影响容器构建正确性。
- **[PR #9969] fix(gateway): contain filesystem dashboard assets** (P1) — 对文件系统型 dashboard 资源做路径规范化，并在解析时校验其必须在配置的 distribution root 内，封堵了稳定符号链接逃逸，属安全加固。
- **[PR #9674] fix(infra): preserve session queue serialization during eviction** (P1) — 修复了 session-slot map 锁内注册与空闲驱逐的竞态，防止已选中的会话槽在 pending count 可见前被驱逐，属于关键的并发正确性修复。
- **[PR #9932] ci(codeql): drop rust/hard-coded-cryptographic-value** — 该 CodeQL 查询在 `cfg(test)` 下产生 27 个全为误报的 "critical" 告警，予以排除。
- **[PR #9709] fix(tts): clean up Edge TTS temp output on every error path**、**[PR #9705] fix(config): allow config set on existing hyphenated cron aliases** — 分别修复了 Edge TTS 临时文件在某些错误路径下不清理、以及 `config set` 无法操作带连字符 cron 别名的问题。

**值得关注的新提交：**

- **[PR #9986] feat(agents): export an agent to a portable bundle** — 新增 `zeroclaw agents export` 命令，可将 Agent 打包为独立 Bundle（manifest + config closure + workspace tree），方便迁移，属新功能提交。


## 社区热点

今日讨论热度集中在四个深度技术 RFC 上，分别触及目标模式（Goal mode）、高危 shell 命令策略、会话持久化契约归属以及可验证意图（verifiable-intent）的凭证链验证。这些讨论并非简单问答，而是围绕"职责边界"与"权限归属"展开的深度设计拉锯。

- **[#8303] RFC: Goal mode v1 — bounded foreground Matrix work**（评论 20）— 讨论焦点在首个交付版本是否应解耦重启交接、广播频道准入、Web 与异步子工作，以控制范围。社区对"有界前台工作"的边界定义分歧明显。
- **[#7155] RFC: high-risk shell 命令确认层级 + Claude Code 风格命令策略**（评论 18，Rev 3）— 已按维护者意见将规范范围收窄至 shell 策略契约，但 18 条评论显示社区对 allow/ask/deny 三档策略的默认值选择仍有激烈讨论。
- **[#8692] Maintainer decision queue for RFCs and design issues**（评论 13）— 维护者决策队列 tracker，是当前所有 RFC 的"总闸门"。多个 RFC（#9487、#9810、#9880 等）都在等此队列推进，社区对其进度高度关注。
- **[#9328] verifiable-intent evaluates constraints without verifying the credential chain**（评论 12）— 直指 VI 参考实现的安全缺陷：`evaluate_constraints` 的 L2 约束与 fulfillment 均由调用方提供，跳过了密码学凭证链验证。
- **[#9487] RFC: Runtime-owned conversation sessions and transport surface adapters**（评论 11，Rev 2）— 与 #9600 tracker 深度联动，讨论运行时接管会话所有权后各入口的迁移策略。


## Bug 与稳定性

今日报告 13 个已关闭 issues 中的 Bug 多已完成修复（含 S3 级小问题），但仍有一个高优先级安全 Bug 的修复 PR 尚在待合并队列中。此外有数个未关闭的 Bug 值得重点关注：

**高优先级（修复中或已有 PR）：**

- **[#9389] unauthenticated POST /api/pair keys its lockout on an attacker-supplied header** (P1, 已关闭) — 严重安全漏洞：未认证端点将限速/锁定状态绑定在攻击者可控的 Header 上，可被用来绕过锁定机制。修复已合入。
- **[#9328] verifiable-intent evaluates constraints without verifying the credential chain** (P2, open) — VI 验证器存在凭证链跳过问题，社区讨论度高，暂无关联 PR。
- **[#9929] headless SOP step turns never persisted to the session store** (P1, open) — `drive_headless_run` 为每个 headless SOP step 构造了 `session_path` 但从不写入会话存储，属 S2 降级行为（会话历史丢失）。目前状态 blocked(被阻塞)、accepted。
- **[#9643] wit/VERSIONING.md 未分类"枚举新增变体"这一破坏性变更** (P1, 已关闭) — 导致所有旧编译插件无法实例化（组件导入不匹配），属于 WASM 插件兼容性回归，修复已合入。
- **[#9951] WeChat channel code and its 51 lib unit tests never compile or execute in CI** (P2, 已关闭) — 该模块被 `channel-wechat` feature 门控，但没有任何 CI feature 组合开启它，相当于 51 个测试完全未被执行，属 CI 盲区问题。

**中低优先级：**

- **[#9366] WhatsApp Web accepts approval_timeout_secs and never reads it** (P2, 已关闭) — 配置项被接受但从未被读取（拆分子任务）。
- **[#9710] desktop: 临时截图文件在两条提前返回路径上未清理** (P3, 已关闭) — 已修复。
- **[#9706] provider: Edge TTS 临时文件在部分错误路径未清理** (P3, 已关闭) — 已修复。


## 功能请求与路线图信号

结合新提交的高质量 PR 与社区讨论热度，以下几个方向最可能被纳入 v0.9.0 及后续版本：

- **开发者体验（DX）补全**：[PR #9986] 新增 `zeroclaw agents export` 命令，可将 Agent 打包为可移植 bundle，属于明显的易用性补强；LSP 支持（[#5907]）与 Agent Plugins 1.0 标准加载（[#9810] RFC）均已有明确设计。
- **可观测性与多模态改进**：[PR #9713]（open）为 history-trim 事件增加 token 计量，社区请求已久（#9619）；[#9887] 提议对超大图做降采样而非直接丢弃，并支持设 0 禁限，属于务实体验优化，且已被 accepted。
- **安全策略统一（v0.9.0 重心）**：[#7155]（shell 命令 allow/ask/deny）、[#9598]（SOP 权限契约）、[#9880]（类型化 resolved peer policy）三个 RFC 均指向把分散在 `Vec<String>` 里的字符串策略文法升级为类型化策略对象，属内核级重构，预计进入 v0.9.0。
- **成本优化**：[#9631] 向 OpenRouter 发送稳定 `session_id` 以命中 prompt cache，直接降低多轮对话成本，是社区呼声较高的实用性改进。
- **目标模式（Goal mode）**：[#8303] 讨论热度最高，但维护者尚未完成范围裁定，短期内进入下个版本的可能性偏低。


## 用户反馈摘要

从 Issues 评论中提炼出的真实声音：

- **安全反馈整体专业且克制。** 多条审计类 issue（#9389、#9643、#9951、[#9328]）重复出现"每个引用行都对照 HEAD 逐一核实"的描述，作者均给出了可复现的具体行号与复现步骤。这表明 ZeroClaw 的 contributor 群体安全意识强，且愿意投入时间做严谨审计。但另一方面，安全类 issue 占比过高也提示项目可能需要引入自动化安全扫描来分担手动审计的压力。
- **对成本敏感的用户诉求明确。** [#9631] 开篇即指出"一次对话产生数十次 LLM 请求，系统提示词和工具 schema 被反复重放"的浪费，表达了希望尽快支持 OpenRouter prompt cache 的意愿，属高频真实痛点。
- **对命令可见性与一致性有抱怨。** [#7929] 指出 slash 命令在 web UI、ZeroCode TUI、channel runtime 三处各自声明，导致命令名、别名、描述漂移。用户希望"添加一个命令即可在所有界面生效"。这反映了多端一致性的痛点。
- **大模型输出不稳定带来的挫败感。** [#6998]（schema 校验的 memory consolidation）提到当前依赖 prompt 让模型产出 JSON，常有 Markdown 围栏、冗余散文、字段缺失等问题解析失败，仅靠 `serde_json` + 原始摘要兜底。这说明模型在结构化输出上的不可靠已对核心功能（记忆管理）造成实际困扰。


## 待处理积压

以下问题长期未获作者响应或处于被阻塞状态，需维护者关注（数据统计：今日 50 条 Issues 中，12 条处于 `needs-author-action`，7 条处于 `blocked`）：

**`needs-maintainer-review`（等维护者拍板）：**

- [#8303] RFC: Goal mode v1（20 评论，创建 2026-06-24）
- [#7155] RFC: 高危 shell 命令策略（18 评论，创建 2026-06-03）
- [#9487] RFC: Runtime 会话与传输适配器（11 评论，创建 2026-07-28）
- [#9810] RFC: Agent Plugins 1.0 加载（2 评论，创建 2026-08-07）
- [#9880] RFC: 类型化 peer policy（2 评论，创建 2026-08-10）
- [#9825] RFC: 区块链公网标识的发布安全例外（5 评论，创建 2026-08-07）

**`needs-author-action`（等作者回应/更新）：**

- [#6850] RFC: 解耦记忆生命周期策略与存储后端（12 评论，创建 2026-05-22，已近 3 个月）
- [#7929] 统一各端 slash 命令注册表（7 评论，创建 2026-06-18）
- [#9631] 向 OpenRouter 发送稳定 session_id（6 评论，创建 2026-08-01）
- [#5907] ZeroCode 的 LSP 支持（6 评论，创建 2026-04-19，积压 4 个月）
- [#9323] execution-tree 迭代预算归属（4 评论，创建 2026-07-24）
- [#8713] PR：`file_download` SSRF 门控的 `allowed_private_hosts` 开关（创建 2026-07-04，XL，已 40 天）

**blocked（被其他依赖阻塞）：**

- [#9929] headless SOP 会话未持久化（P1 Bug，创建 2026-08-11）
- [#9598] SOP 能力权限契约 RFC（创建 2026-07-31）
- [#9631] OpenRouter session_id（同前）
- [#9887] 图像降采样与多模态限额开关（创建 2026-08-10）
- [#9945] browser 工具仅暴露 16/100+ 命令（创建 2026-08-12）

**特别提醒：** [#5907]（LSP 支持）从 2026-04-19 至今已积压近 4 个月，且仍停在 `needs-author-action`，但它是社区呼声较高的易用性提升，建议维护者主动介入推进。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

## PicoClaw 项目动态日报 — 2026-08-14

### 1. 今日速览

PicoClaw 项目过去 24 小时整体活跃度较高，主要驱动力来自 **dependabot 批量提交的 Go 依赖更新 PR**（6 条新建）。社区侧有 3 条新 Issue 被提出，其中两条为功能请求，一条为 Web UI 输入卡顿的 Bug 报告。值得注意的是，今日有 3 条此前标记为 `stale` 的依赖更新 PR 被关闭（未合并），同时对应的更新内容已由新 PR 重新提交，说明维护者在跟进依赖升级但采取了"旧关新开"的清理策略。新版本发布为 0 个，核心代码无重大合并。

---

### 3. 项目进展

今日 **无核心功能或修复 PR 被合并**。`#3318`（修复 `pnpm-lock.yaml` 重复键问题）目前仍处于打开状态，该 PR 对 Web 前端锁文件的完整性至关重要，尚未得到维护者合并。

今日实际推进体现在**依赖更新流程的重新梳理**：

- **PR #3304**（`anthropic-sdk-go` 1.55.1 → 1.61.0）、**#3305**（`bedrockruntime` → 1.56.2）、**#3306**（`aws-sdk-go-v2/config` → 1.32.33）三个 PR 均于今日以 `stale` 状态关闭。这些 PR 创建于 7 月 30 日，搁置两周后由维护者主动关闭。
- 同日，**dependabot 已重新提交**更高版本的对应 PR：`#3336`（bedrockruntime → 1.57.1）、`#3335`（config → 1.32.35）、`#3334`（anthropic-sdk-go → 1.62.0），以及新增 `#3332`（aws-sdk-go-v2 核心 → 1.43.4）和 `#3333`（mautrix → 0.29.0）。

**结论**：项目底层依赖正在持续升级中，但今日无核心功能合并，整体进度以"依赖现代化"为主。

---

### 4. 社区热点

**Issue #3281 — Web UI 输入严重卡顿（长历史记录场景）**
- 链接：[sipeed/picoclaw Issue #3281](https://github.com/sipeed/picoclaw/issues/3281)
- 状态：OPEN | 评论 5 条 | 👍 1 | 更新于 2026-08-13
- **分析**：该 Issue 是近期社区的关注焦点。用户报告在 Web UI 中当会话历史较长时，输入框出现明显卡顿。评论数在持续增长，说明并非个例。其背后可能是前端渲染长对话列表时的性能瓶颈（如未虚拟化滚动、大量 DOM 节点重绘等），也可能与 `#3318` 修复的 pnpm 锁文件问题有关联（构建异常导致优化缺失）。该问题直接关乎核心用户体验，建议维护者优先排查。

其余 PR 均为机器人提交的依赖更新，社区讨论热度有限。

---

### 5. Bug 与稳定性

| 严重程度 | Issue / PR | 描述 | 状态 |
|---|---|---|---|
| 中 | [Issue #3281](https://github.com/sipeed/picoclaw/issues/3281) | Web UI 长历史下输入框卡顿（版本 0.3.1，Go 1.25.11） | 待定位，目前**无 fix PR** |
| 低 | [PR #3318](https://github.com/sipeed/picoclaw/pull/3318) | `web/frontend/pnpm-lock.yaml` 存在重复映射键，导致 pnpm 拒绝解析该文件，前端构建流程已损坏 | 有修复 PR 但**至今未合并**（已打开 9 天） |

**风险提示**：PR #3318 反映的锁文件损坏问题若无明确修复，会影响后续所有 Web 前端相关的 PR CI 校验。如果 pnpm lockfile 无法解析，开发者本地运行 `pnpm install` 会直接失败，建议提升该 PR 的处理优先级。

---

### 6. 功能请求与路线图信号

今日有两条新功能请求，均值得关注：

**1. Issue #3331 — 通用 Whisper 转录端点支持**
- 链接：[sipeed/picoclaw Issue #3331](https://github.com/sipeed/picoclaw/issues/3331)
- 用户 `stanislavvv` 请求支持任何提供 `/audio/transcriptions` 端点的模型，而非仅限 `*-whisper-*` 系列（认为其"又旧又慢"）。提出在模型或语音配置中加入 `whisper-transcription: true` 标志，以在 `asr.go` 中强制选择 Whisper 路径。
- **判断**：该请求对语音输入功能有正向扩展价值，实现成本不高（增加一个配置开关），有可能被纳入后续 0.4.x 版本。

**2. Issue #3330 — 子代理工具支持动态模型覆盖**
- 链接：[sipeed/picoclaw Issue #3330](https://github.com/sipeed/picoclaw/issues/3330)
- 用户 `v2up-32mb` 指出 `delegate`、`spawn`、`subagent` 工具目前无法在调用时指定模型，模型选择完全由静态配置（`config.json` / `defaultModel`）决定。
- **判断**：这是一项对高级用户（如使用 PicoClaw 构建多智能体编排场景）有吸引力的能力增强，但涉及核心工具调用链路的 API 变更，可能需要较长时间设计和评审，短期内进入版本的难度较大。

---

### 7. 用户反馈摘要

基于今日活跃 Issue 及评论，可提炼以下用户声音：

- **Web UI 流畅度是核心痛点**（#3281）：用户明确反馈在长会话场景中输入延迟明显，影响日常使用效率。该反馈发生在 v0.3.1，用户环境为 Go 1.25.11。
- **对 Whisper 模型更迭存在需求**（#3331）：用户认为现有默认语音转录模型"太旧太慢"，希望接入更新的通用转录端点，说明部分用户对语音输入功能的实时性和准确性有更高期待。
- **高级用户存在灵活模型路由需求**（#3330）：用户对 PicoClaw 的多代理能力表示关注，但当前静态模型绑定机制限制了其灵活组合使用，说明项目的 agent 编排能力有被深度使用。
- **未出现**关于新版本功能不满的直接抱怨，整体社区情绪偏正向，以"持续优化"建议为主。

---

### 8. 待处理积压

以下为需维护者及时关注的长期未解决事项：

| 类型 | 编号 | 说明 | 搁置时长 / 更新时间 |
|---|---|---|---|
| 高优先级 PR | [#3318](https://github.com/sipeed/picoclaw/pull/3318) | 修复 pnpm-lock.yaml 损坏问题，阻断 Web 前端构建流程 | 创建于 2026-08-05，已 9 天未合并/关闭 |
| 高热度 Bug | [#3281](https://github.com/sipeed/picoclaw/issues/3281) | Web UI 输入卡顿，持续获得用户评论关注 | 创建于 2026-07-21，最新更新于 2026-08-13，仍未标记或指派 |
| 新功能 | [#3330](https://github.com/sipeed/picoclaw/issues/3330) | 子代理工具动态模型覆盖 | 新提交，等待维护者响应 |
| 新功能 | [#3331](https://github.com/sipeed/picoclaw/issues/3331) | 支持通用 `/audio/transcriptions` 端点 | 新提交，等待维护者响应 |

**维护者建议**：优先处理 #3318 的合并或给出明确说明（避免前端构建持续处于不可用状态）；对 #3281 安排一次性能排查并给出初步回应，该 Issue 已存在超过 3 周，社区关注度在上升。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 — 2026-08-14

---

## 今日速览

项目保持高度活跃，24 小时内收到 2 条 Issue 更新、19 条 PR 更新，并发布了 v2.2.0 版本。核心团队在 CI 签名验证链路上进行了密集的工程推进：`verify-agent-image` 从"建议性"升级为"强制性"门禁，签名验证已成为 agent 镜像晋升的批准依据。同时，Agent 模板功能正式演化为 "Agent Plugins 1.0.0" 格式，配套 Issue #3234（UUID 前缀回归）已快速修复闭环。社区侧，未知发送者审批策略产生的"无限审批卡"问题（#3235）值得重点关注。

---

## 版本发布 — v2.2.0

**核心变更：模板插件原地更新**

`ncl groups create --template <ref>` 现在支持对已 stamped 的插件进行**原地更新**。当组已携带模板的插件时，执行相同命令将触发原地更新，而非重复创建 agent。**Dry-run 模式**会打印完整的更新计划（插件文件、skills、MCP 服务器等所有插件管理的资产）。

**破坏性变更与迁移提示：**

- Agent 模板目录结构已迁移为 **Agent Plugins 1.0.0** 格式（PR #3220），旧的模板格式不再兼容。升级前请备份现有模板，并参考 v2.2.0 文档进行格式迁移。
- 建议使用 dry-run 预览更新影响后再实际执行。

---

## 项目进展

### 今日合并/关闭的重要 PR

**🔐 CI 签名验证链路全面打通（核心团队工作）**

这是今日最集中的工程推进方向，系列 PR 从多个维度补完了 agent 镜像晋升的信任链条：

- **[#3238]** `verify-agent-image` CI 门禁从"建议性"改为"强制性"——将原先基于路径过滤的 workflow 改为**每次 PR 必跑**，使其能作为 required status check 真正拦截不合规的镜像冒升。
- **[#3241]** 允许**已验证的签名作为批准性审查（approving review）**——publisher 签名成为 pin bump 流程中最后人工步骤的批准依据，且默认关闭（需 `AGENT_IMAGE_AUTO_APPROVE=true`），未开启时仅报告将批准的内容并停止。
- **[#3240]** agent 镜像晋升 PR 改为通过 `repository_dispatch` 自动开启——AWS worker 在验证并晋升镜像后触发事件，自动打开 `versions.json` 更新 PR。此拆分基于凭证最小化原则。
- **[#3158]** 修正了 verify 门禁中签名者身份变量不存在导致验证被跳过的问题，并支持按架构（per-arch）校验 attestations。
- **[#3236]** 将 agent 镜像重新固定在 `hardened-2026-08-13` 构建（本次携带项目自身内容更新，而非仅基础镜像刷新）。

**📦 Agent 模板 → Agent Plugins 1.0.0 迁移（重大演进）**

- **[#3220]** 正是 v2.2.0 的引擎级变更：将模板功能整体迁移至 Agent Plugins 1.0.0 目录格式，包含 stamp 时 symlink/caps/secret 安全加固。该 PR 已合并。
- **[#2909]** 紧随其后：setup wizard 中的模板流程与首个 agent 的模板 stamping（叠加于 #3220 之上，需在其后合并）。

**🐛 其他修复与改进**

- **[#3229]** Telegram 配对码生成从 `Math.random()` 切换到 `crypto.randomInt`（CSPRNG），并将空间从 4 位扩展——安全修复，已合并。
- **[#3231]** 在 Codex 和 OpenCode 两个 provider 的配置写入器中统一支持插件 MCP 的 cwd 设置，与 #3220 配合落地。
- **[#3145]** 数据库迁移 021 补齐已有 messaging-group wirings 缺失的 channel destinations，保留自定义本地名称。
- **[#2624]** McpServerConfig 支持 per-server `disabledTools`。
- **[#3237]** v2.2.0 发布 chore PR。

### 待合并的开放 PR

- **[#3243]** 修复 `verify-agent-image` 中 "Enable auto-merge" 步骤决定 job 结论的问题——auto-merge 的操作失败不应成为镜像验证失败的判据。合并后可信度更高。
- **[#3230]** 修复 skills 删除文档仍指向已退役的 data/env 镜像的问题。
- **[#2420]** `/add-hindsight` skill——将 NanoClaw v2 agent groups 接入 Hindsight 长期记忆引擎，MCP wrapper 已内置于 PR 中。
- **[#2346]** 未知斜杠命令应作为普通聊天处理，而非被误判为 passthrough 导致响应被丢弃。
- **[#3218]** CLI 支持从 stdin 接收有界 JSON 输入。

---

## 社区热点

### Issue #3235 — 未知发送者审批：webhook/机器人产生无限审批卡

- **链接：** [nanocoai/nanoclaw Issue #3235](https://github.com/qwibitai/nanoclaw/issues/3235)
- **作者：** pentar69 | 创建：08-13 | 评论：0

**核心矛盾：** 当消息组配置了 `unknown_sender_policy = 'request_approval'` 时，**自动化发送者**（平台 webhook、其他 bot）会触发与人类发送者相同的审批门禁。对于周期性 webhook，这会产生**无上限的审批卡**：每次触发都生成一张新卡，且无法被合理批准（这些消息不应需要批准），拒绝操作也无法持久生效。这暴露了策略层面的设计盲区——机器身份与人类身份需要不同的治理路径。

### PR #3243 — 验证镜像时自动合并失败不等于镜像失败

- **链接：** [nanocoai/nanoclaw PR #3243](https://github.com/qwibitai/nanoclaw/pull/3243)
- **作者：** gavrielc | 创建：08-13 | 评论：0

**分析：** 此 PR 指出了现有 CI 流程中一个概念混淆：`Enable auto-merge` 是 job 的最后一步，其失败决定了整个 job 的结论，但它可能因 draft PR 状态、`allow_auto_merge` 关闭或瞬时 API 错误而失败——这些与镜像本身的质量毫无关系。核心诉求是 **CI 判定应分离"镜像验证结论"与"自动化操作成败"**。在 `verify` 已成必需门禁的背景下，修复该问题能避免误报导致的合并阻塞。

---

## Bug 与稳定性

| 严重程度 | 问题 | 状态 | 链接 |
|---------|------|------|------|
| 🔴 高 | Agent 模板组 ID 缺失 `ag-` 前缀，导致 OneCLI 拒绝该 agent（#3234） | ✅ 已关闭（有 fix） | [Issue #3234](https://github.com/qwibitai/nanoclaw/issues/3234) |
| 🟠 中 | 未知发送者策略对自动化发送者产生无限审批卡，且拒绝不持久化（#3235） | 🟡 开放中，无 fix PR | [Issue #3235](https://github.com/qwibitai/nanoclaw/issues/3235) |
| 🟠 中 | 签名验证因身份变量缺失被静默跳过，auto-merge 永远不会触发（#3158） | ✅ 已合并修复 | [PR #3158](https://github.com/qwibitai/nanoclaw/pull/3158) |
| 🟡 低 | 未知斜杠命令被误判为 passthrough，导致响应被静默丢弃（#2346） | 🟡 开放中，有修复 PR | [PR #2346](https://github.com/qwibitai/nanoclaw/pull/2346) |
| 🟡 低 | `verify-agent-image` 中 auto-merge 操作失败干扰真实验证结论（#3243） | 🟡 开放中，有修复 PR | [PR #3243](https://github.com/qwibitai/nanoclaw/pull/3243) |
| 🟡 低 | Telegram 配对码使用 `Math.random()`（非加密安全随机数） | ✅ 已合并修复 | [PR #3229](https://github.com/qwibitai/nanoclaw/pull/3229) |

**单独说明：** #3234 的根因——`--template` 路径生成 bare UUID 而 `--folder` 路径生成 `ag-<uuid>`——属于**字段语义不一致**的典型回归，已在 24 小时内闭环，说明该类问题的反馈与修复速度健康。

---

## 功能请求与路线图信号

**⚡ 可能纳入近期版本的信号：**

1. **机器身份/发送者的审批策略细分（来自 #3235）：** 对 webhook/bot 发送者引入独立的"免审批"或"基于来源的信任"路径，而不是走与人类相同的审批门禁。这是对 `unknown_sender_policy` 策略模型的重要补全，核心团队需决定是"策略场景化"还是"配置额外字段"。鉴于 #3235 场景明确、影响可及（无限卡），有较大概率进入 v2.2.x 补丁或 v2.3.0。

2. **插件 MCP cwd 支持（来自 #3231 + #3220 组合）：** 已在 Codex/OpenCode 双 provider 落地，配合 Agent Plugins 1.0.0 的目录语义，`cwd` 作为插件可管理资产将被更多模板和集成复用。

3. **/add-hindsight 长期记忆接入（#2420）：** 从 5 月拖至今，但 v2.2.0 的 Agent Plugins 1.0.0 为"将外部引擎封装为 MCP 并作为插件分发"提供了更干净的基础。该能力是"有记忆的 agent"方向的重要拼图，预计插件格式稳定后会加速 merge。

4. **stdin 有界 JSON 输入（#3218）：** 属于 CLI 交互层的常规增强，价值明确但优先级不高。若无核心团队背书，可能继续延后。

---

## 用户反馈摘要

- **模板生成的 agent 被拒绝（#3234）：** 用户在创建模板组后，生成的 agent 因 ID 前缀缺失被 OneCLI 直接拒绝。这属于**开箱即坏的体验**——用户按文档操作即遭遇失败，且错误信息定位成本高（涉及 OneCLI 的 `ensureAgent` 校验）。侧面反映：**跨组件 ID 格式约定仍需更严格的契约测试来兜底**。
- **机器人审批风暴（#3235）：** 用户场景是"平台 webhook 定期推送消息至群组"，但审批日志因此被无限刷卡淹没，既无法通过操作解决，也无法通过配置规避。这是**策略设计未考虑 agent 生态中自动化参与者**的典型信号，用户预期是"信任的 webhook 不应触发审批"。
- **Telegram 配对码安全性（#3229）：** 社区成员主动提交修复将配对码从 `Math.random()` 换为 CSPRNG，说明社区对**安全基线的要求高于当前实现**，且具备发现与修复此类问题的能力。

---

## 待处理积压

| 项目 | 类型 | 创建时间 | 最近更新 | 停留时长 | 备注 | 链接 |
|------|------|---------|---------|---------|------|------|
| #2420 `/add-hindsight` MCP 长期记忆插件 | PR | 2026-05-11 | 08-13 | ~3 个月 | 功能完整且自带 MCP wrapper，等待 Agent Plugins 1.0.0 稳定后跟进 | [PR #2420](https://github.com/qwibitai/nanoclaw/pull/2420) |
| #2346 未知斜杠命令被静默丢弃 | PR | 2026-05-08 | 08-13 | ~3 个月 | 用户可见的响应丢失问题，修复方案已明确，等待合入 | [PR #2346](https://github.com/qwibitai/nanoclaw/pull/2346) |
| #3218 CLI stdin 有界 JSON | PR | 2026-08-09 | 08-13 | 4 天 | 功能清晰、改动面小，建议核心团队评估后尽快 round | [PR #3218](https://github.com/qwibitai/nanoclaw/pull/3218) |
| #3235 自动化发送者无限审批卡 | Issue | 2026-08-13 | 08-13 | 1 天 | 新报告的活跃问题，暂无 fix PR，建议排期处理 | [Issue #3235](https://github.com/qwibitai/nanoclaw/issues/3235) |

**维护者重点关注：** #2420 和 #2346 两个 PR 均已存在约 3 个月。其中 #2346 是明确的用户可感知 bug（消息丢失），#2420 是较完整的记忆能力集成——两者都已过合理的审查周期，建议在本周内给出明确合入或关闭决定，避免社区贡献者的积极性受挫。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

### 1. 今日速览

项目活跃度**极高**。过去24小时内有50条Issue和50条PR更新，且围绕史诗级议题 #7482（可插拔Agent循环）展开了密集的架构拆分工作，共衍生出20余个细分子议题。昨日已发布稳定版 `v1.2.0`（由RC3晋升），标志着近期修复与功能集成的正式落地。性能优化（减少Postgres写入放大）与文档准确性保障（doc-truth测试）是当前代码合并的两条主线。社区反馈聚焦于认证流程体验与模型提供商可用性，项目健康度良好。

---

### 2. 版本发布

**`ironclaw-v1.2.0`** (2026-08-13) — 由 `1.2.0-rc.3` 稳定晋升。

- **更新内容**：包含RC1至RC3期间验证的全部修复与功能。RC3的关键修复为：**运行时容器镜像现已预装 `curl`**，解决了编排器在容器内执行HTTP健康检查失败的问题（此前镜像中缺少该工具导致探活机制失效）。
- **破坏性变更**：无。
- **迁移注意事项**：无特殊要求，常规升级即可。合并的PR #7625已同步更新发布清单与锁文件。

---

### 3. 项目进展

今日合并的PR主要围绕**性能优化（减少数据库写入）**与**文档/CLI真实性保障**两大主题：

- **性能：削减Postgres写入放大**（核心贡献者 serrrfirat 主导）
  - [#7631 perf(events): coalesce runtime milestone writes](https://github.com/nearai/ironclaw/pull/7631)：将多个运行时事件写入合并至单一 `CoalescingEventSink`，减少持久化次数。
  - [#7629 perf: reduce trigger and outbound state writes](https://github.com/nearai/ironclaw/pull/7629)：将触发器运行历史的保留清理从每次更新移动至首次触发声明时，减少写入频率。
  - [#7628 perf(processes): remove heartbeat journal churn](https://github.com/nearai/ironclaw/pull/7628)：停止为心跳事件追加Journal行，以物化行上的租约时间戳为准，削减无效写入。此为该议题 #7591 的保守子集。
- **文档真实性保障**（doc-truth系列，贡献者 thisisjoshford）
  - [#7376 ci(check-guidance): extend the reference gate to the docs/ surface](https://github.com/nearai/ironclaw/pull/7376)：将CI路径引用检查扩展到 `docs/` 全表面（含中文镜像与合约文档），确保文档中的路径引用真实有效。
- **发布与修复**
  - [#7625 chore(release): promote 1.2.0-rc.3 to 1.2.0](https://github.com/nearai/ironclaw/pull/7625)：正式发布 `v1.2.0`。
  - [#7531 fix(loop): make repeated-call detection advisory-only](https://github.com/nearai/ironclaw/pull/7531)：将循环中重复调用检测改为仅警告，不再基于启发式算法（连续三次相同调用签名）阻断执行，降低误判风险。
  - [#7581 fix(extensions): refresh bundled MCP state after auth](https://github.com/nearai/ironclaw/pull/7581)：修复OAuth认证后扩展工具状态不刷新的问题，避免工具仍显示 `setup_needed`。
  - [#7163 feat(documents): edit docx/xlsx/pptx structurally, render PDF from HTML](https://github.com/nearai/ironclaw/pull/7163)：实现了对Office文档的结构化编辑与HTML转PDF渲染，并修复了 #7109 引入的文本日志回归。

---

### 4. 社区热点

- **[#7482 Epic: Pluggable agent loops (评论: 6)](https://github.com/nearai/ironclaw/issues/7482)** — 绝对热点。该议题确立了IronClaw向“内核”转型的架构方向，即不再自研Agent循环与工具代码，而是通过 `HarnessDriver` 合约接入外部成熟循环（claude-code, pi, codex）。由此衍生的20+子议题（#7606-#7624）在今日集中创建与关闭，标志着该史诗已从设计阶段（绑定决策已记录）快速转入执行阶段。唯一被允许立即动工的是 [#7624 v0: ACP harness executor](https://github.com/nearai/ironclaw/issues/7624)，其余工作项待v0验证后再启动。
- **[#6257 Invalid mime_type on PDF (评论: 4)](https://github.com/nearai/ironclaw/issues/6257)** — 已关闭。用户报告发送/生成PDF时报错，属外部反馈聚合。状态为已解决，但未在今日列表中见对应修复PR，推测为较早修复或外部依赖问题。

---

### 5. Bug 与稳定性

以下Bug均在今日报告，严重程度由高到低：

| 严重度 | Issue | 描述 | 状态 |
| --- | --- | --- | --- |
| **高** | [#7589 NEAR AI Cloud Sonnet-5 returns 500 errors](https://github.com/nearai/ironclaw/issues/7589) | 用户反馈Sonnet-5模型在NEAR AI Cloud上持续返回500错误（已持续3天），并关联到cloud-api仓库问题。 | 待处理，未关联PR |
| **中** | [#7626 Custom MCP gets stuck during auth](https://github.com/nearai/ironclaw/issues/7626) | 自定义MCP若要求浏览器/邮箱认证，连接过程会卡死，无法完成OAuth跳转。 | 待处理 |
| **中** | [#7627 GitHub extension shows connected after invalid credentials](https://github.com/nearai/ironclaw/issues/7627) | GitHub扩展在输入无效凭据（如“1”）后仍显示已连接，状态显示不真实。 | 待处理 |
| **低** | [#7185 Memory not reliably recalled across conversations](https://github.com/nearai/ironclaw/issues/7185) | 多个测试者反馈跨会话记忆召回不可靠，影响法律等场景的上下文连续性。 | 待处理，未关联PR |

---

### 6. 功能请求与路线图信号

- **可插拔Agent循环（#7482）**：这是当前最明确的路线图信号。项目将不再捆绑特定Agent循环，而是通过标准合约接入第三方循环。**v0（#7624）** 将优先实现基于ACP的claude-code执行器（dev-only模式），作为架构可行性的验证。
- **本地文件桥接（#2117，2个月未关闭）**：用户希望云托管部署能访问本地文件（如Obsidian库）。该issue为 `size: L` 且已获1个 👍，是社区明确诉求，但今日无关联PR，可能未被排入近期规划。
- **ironclaw-bridge 与 `ic` CLI（#7615）**：作为 #7482 的一部分，将开发 `ic` 命令行工具，使沙箱内Agent可通过聚合MCP投影批量调用能力，减少模型往返次数。
- **性能优化（#7591系列）**：多个Tier 3议题（#7603, #7604, #7605）聚焦削减数据库写入行数，已出现对应PR（#7628, #7629, #7631），预计将陆续合并。

---

### 7. 用户反馈摘要

- **认证体验是当前主要摩擦点**：用户尝试连接需要浏览器验证的自定义MCP时，IronClaw界面卡死（#7626）；GitHub扩展在凭据无效时误报连接成功（#7627），表明认证状态机与错误反馈路径存在缺陷。
- **模型可用性直接影响信任**：Sonnet-5连续3天返回500错误（#7589），该反馈源自外部渠道，反映出用户对模型网关稳定性的高敏感度。
- **版本信息不透明**：用户在Web UI中无法直观查看当前运行的Reborn版本（#7580），增加了问题诊断与反馈的难度。
- **跨会话记忆是刚需**：Champions周会中多名测试者独立报告记忆丢失（#7185），尤其在专业领域（法律）场景，该问题会显著降低Agent的实用价值。

---

### 8. 待处理积压

- **[#2117 ironclaw-bridge 本地文件/MCP桥接守护进程](https://github.com/nearai/ironclaw/issues/2117)**：创建于4月，已获得1个 👍，是云托管场景下访问本地资源的明确阻塞项。状态为 `size: L`，长时间未关闭，建议维护者评估是否纳入 #7482 之后的规划。
- **[#7185 跨会话记忆不可靠](https://github.com/nearai/ironclaw/issues/7185)**：报告于8月4日，已有一周且获得多个独立用户确认，但无分配与修复计划，是影响用户体验的核心问题之一。
- **PR #7378 与 #7376 (doc-truth系列)**：#7376 已合并，但 [#7378](https://github.com/nearai/ironclaw/pull/7378)（为CLI与Manifest声明添加契约测试）仍处于打开状态，该PR是保证文档与实现一致性的关键一环，建议尽快完成评审。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-08-14

## 1. 今日速览

过去 24 小时项目整体活跃度较高，共产生 11 条 PR 更新和 1 条 Issue 更新。新 PR 方面，前端渲染层（renderer）占主导，覆盖 skills/MCP 视图合并、卡片样式统一、签到活动 evergreen 化及企业版功能合入等多项 UI/UX 改进。旧 PR 方面，6 条 3-4 月提交的遗留 PR 在今日被关闭或标记过期，有助于清理积压。另有 1 条新 PR 针对 OpenClaw 技能键不匹配问题提交修复。当前仍有 5 条 PR 处于待合并（OPEN）状态，其中多数为 3-4 月提交的 stale 测试补充类 PR，需维护者关注处理。今日无新版本发布。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日共 6 条 PR 关闭（均为已关闭状态），其中部分为功能合入或清理：

- **【合入】企业版功能合并（#2484）** — [`liugang519`](https://github.com/netease-youdao/LobsterAI/PR/2484) 提交的 `Feat/enterprise edition` 合入，覆盖 renderer/docs/main/openclaw 四层，涉及企业版功能的前端展示与后端支撑。
- **【合入】Cowork 管理与 UI 重构（#2488）** — [`fisherdaddy`](https://github.com/netease-youdao/LobsterAI/PR/2488) 对 cowork 的整体管理与界面层进行重构，改善布局与操作流程。
- **【合入】Skills 与 MCP 视图合并（#2487）** — [`fisherdaddy`](https://github.com/netease-youdao/LobsterAI/PR/2487) 将 skills 和 MCP 视图合并为统一的 skills-and-connectors 视图，减少入口冗余。
- **【合入】MCP 卡片/详情样式统一（#2486）** — [`fisherdaddy`](https://github.com/netease-youdao/LobsterAI/PR/2486) 将 MCP 卡片与详情 UI 的样式与 kits/skills 对齐，抽取共享 `CardOverflowMenu` 和 `managementTypography`，提升视觉一致性。
- **【合入】签到活动 evergreen 化（#2485）** — [`btc69m979y-dotcom`](https://github.com/netease-youdao/LobsterAI/PR/2485) 将签到活动从一次性活动调整为常驻形态，并补充状态自动刷新，积分入口改为跳转网页端详情页。
- **【清理】定时任务首次执行结果推送修复过期（#1232）** — [`choyuenga`](https://github.com/netease-youdao/LobsterAI/PR/1232) 修复首轮执行 `previousRunAtMs` 为 0 时不推送 `runUpdate` 的问题。该 PR 在今日被标记为关闭（stale），若修复尚未合入 main 分支，需确认是否已通过其他途径合入。

整体来看，项目的 UI 一致性重构处于密集推进阶段，多个渲染层模块正在按统一设计规范收敛。签到活动、企业版等功能开发也在并行推进。

## 4. 社区热点

今日讨论热度整体偏低，各 Issues/PRs 评论数均为 0-1 条。相对获得 1 条评论的是：

- **[Issue #1162](https://github.com/netease-youdao/LobsterAI/Issue/1162) — 为 openclawMemoryFile 和 openclawLocalTimeContextPrompt 补充 Vitest 单元测试**（1 条评论，作者 MaoQianTu，创建于 3-31，更新于 8-13）

该 Issue 此前已获得对应的 PR #1165，但至今仍处于 OPEN 状态（stale）。该 Issue 的背景指出了 `openclawMemoryFile.ts` 被多处业务逻辑依赖却零测试覆盖的问题，涉及记忆文件的读写、SQLite 迁移和工作区切换同步，敏感度和优先级较高。1 条评论表明社区对该模块测试覆盖有明确诉求，但维护者响应缓慢。

## 5. Bug 与稳定性

今日新提交的 Bug 修复类 PR 共 1 条，另有 1 条 stale 修复被关闭：

| 严重程度 | 问题 | 状态 | 修复 PR |
|---------|------|------|--------|
| 中 | **技能开关失效**：OpenClaw skills 键按目录名而非 frontmatter 的 `name` 生成，目录与 frontmatter 不一致时，UI 上的启用/关闭开关被静默忽略（PR #2483，关联 issue #2445） | 已提交修复，待合并 | [#2483](https://github.com/netease-youdao/LobsterAI/PR/2483) |
| 低 | **定时任务首轮执行结果不推送**：`previousRunAtMs` 初值为 0，首轮执行时 `runUpdate` 通知条件不满足，UI 需等第二次执行才能看到结果 | 修复 PR 已关闭（stale），需确认是否已合入 | [#1232](https://github.com/netease-youdao/LobsterAI/PR/1232) |

新的技能键不匹配修复（#2483）是目前最值得关注的稳定性修复，建议维护者尽快合入。

## 6. 功能请求与路线图信号

- 今日合入的企业版功能（#2484）信号明确：项目正在扩展企业级能力，后续会持续有面向企业场景的功能合入，涉及 renderer/docs/main/openclaw 多个层次。
- 签到活动 evergreen 化（#2485）表明运营类功能将被作为常驻模块维护，后续可能叠加更多活动模板与积分体系。

## 7. 用户反馈摘要

- **Issue #1162 评论（1 条）**：对 `openclawMemoryFile` 零测试覆盖表达担忧，指出其被多处业务逻辑依赖，缺少测试难以保障记忆文件管理的稳定性；`openclawLocalTimeContextPrompt` 作为纯函数同样需要测试。
- **PR #1166（Open) 背景反馈**：用户可直接在 agent 创建时提交重复名称，导致 agent 列表歧义，需手动查找原始条目，属于流程缺陷反馈。
- **PR #1163 背景反馈**：定时任务“立即运行”点击后无视觉反馈、任务状态刷新需等待最长 15 秒轮询，体验差且易致重复点击。同时反馈右键菜单样式与整体 UI 规范不一致，缺少图标、危险区域样式和智能定位。

## 8. 待处理积压

以下为长期未响应或已 stale 的重要 PR/Issue，建议维护者关注处理：

- **[PR #1163](https://github.com/netease-youdao/LobsterAI/PR/1163)（OPEN，stale，4 个月）** — 定时任务“立即运行”交互反馈补全与乐观更新修复。功能体验影响较大，含 loading 状态、IPC 层异步化、状态层同步等 4 层改动，但长期未获 review，存在冲突风险。
- **[PR #1165](https://github.com/netease-youdao/LobsterAI/PR/1165)（OPEN，stale，4 个月）** — 为 `openclawMemoryFile` 与 `openclawLocalTimeContextPrompt` 新增 75 个单元测试。核心记忆模块零测试覆盖，应由维护者优先推进。
- **[PR #1156](https://github.com/netease-youdao/LobsterAI/PR/1156)（OPEN，stale，4 个月）** — 为 `commandSafety` 和 `coworkMemoryJudge` 补充单元测试。涉及危险命令检测与记忆质量评分，潜在安全影响，建议尽快 review。
- **[PR #1166](https://github.com/netease-youdao/LobsterAI/PR/1166)（OPEN，stale，4 个月）** — 修复自定义 agent 重名问题。改动较小但直接影响用户体验，疑似已被后续 agent 重构覆盖，建议确认是否仍适用后关闭或合入。
- **[Issue #1162](https://github.com/netease-youdao/LobsterAI/Issue/1162)（OPEN，stale）** — 与 PR #1165 对应，零测试覆盖风险提示，已有社区评论关注。

多条 3-4 月提交的 PR 至今仍未进入 review 流程，已进入 stale 状态。其中 1156/1162/1165 涉及核心安全与记忆模块的测试补齐，建议维护者结合当前 75 个测试用例的覆盖面，一次性完成 review，避免继续堆积造成大范围冲突。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目日报 — 2026-08-14

## 今日速览

过去 24 小时项目活跃度中等偏低：共 1 条 Issue 更新（全部为新开）和 4 条 PR 更新（全部处于待合并状态），无新版本发布。新增 Issue 集中于测试稳定性问题（推流扇出超时测试在全量测试负载下偶发失败），而 4 条待合并 PR 中有 3 条来自同一位贡献者（Lstarsky0），均为脚本与构建链路的兼容性修复（macOS bash 3.2 兼容、外部依赖仓库迁移后的模块路径更新），另 1 条来自 penso 的大型功能 PR（持久化连接器与频道历史集成），已开放 3 天仍未合并，值得关注。项目整体处于社区贡献者积极补漏、核心功能 PR 等待评审的状态。

## 项目进展

今日无 PR 被合并或关闭，但 4 条待合并 PR 正在推进以下方向的修复与增强：

- **构建与脚本链路修复**（#1194、#1191、#1192）：三者均来自 Lstarsky0，修复 macOS 环境下 `just local-validate-full` 空数组展开崩溃、`moltis sandbox build` 因 gogcli 仓库迁移导致的安装失败、以及 wacrawl skill 的 Go install 元数据指向旧组织地址的问题。整体在清理因上游仓库（steipete → openclaw）组织迁移所遗留的引用断裂。
- **核心功能扩展**（#1190，penso）：新增 provider-neutral 连接器持久化层、原子快照、调度、投影、有界本地全文搜索，并引入只读 CalDAV 数据集与 Slack、Discord、Matrix、Teams 消息历史数据集（无需复制频道凭据），同时包含提示词相关改动。这是一条大型功能 PR，若合并将显著扩展 Moltis 的数据接入能力。

## 社区热点

今日唯一的 Issue #1193（flaky test）与 4 条 PR 均尚未产生评论互动，社区讨论热度较低。相对而言，PR #1190（连接器持久化与频道历史，penso）虽今日仅有状态更新（update 于 08-13），但其体量大、涉及面广，属于潜在的高关注度 PR。该 PR 的核心诉求是：在不复制频道凭据的前提下，将消息历史与 CalDAV 数据以只读方式纳入 Moltis 的本地索引与搜索体系，反映了用户对"数据本地化 + 跨平台统一检索"的深层需求。

## Bug 与稳定性

今日仅报告 1 个新 Bug，无崩溃或回归：

- **[中] 测试偶发失败（#1193，OPEN）**：`moltis-gateway push::tests::fanout_is_bounded_and_times_out_a_hung_endpoint` 在完整工作区测试负载下间歇性失败（2/3 次全量运行失败于空闲 10 核 macOS 机器上），但在单独运行该测试时通过。推测与全量负载下的时序竞争有关。尚无对应的 fix PR，但项目已有 3 条针对 macOS 环境兼容性的修复 PR 待合并（#1194、#1191、#1192），可能间接缓解部分环境因素。

## 功能请求与路线图信号

今日无新的功能请求 Issue。但 PR #1190 明确指向下一阶段的路线图方向：**持久化连接器框架 + 只读频道历史接入 + 本地全文搜索与投影能力**。结合其开放时长，该 PR 很可能被纳入下一个版本。此外，两条依赖路径修复 PR（#1191、#1192）反映外部依赖仓库组织迁移（steipete → openclaw）对构建链路的冲击，建议后续版本在 CI 中增加对第三方模块路径变更的自动探测。

## 用户反馈摘要

今日无 Issue 评论或讨论可供提炼。从 Issue #1193 的报告中可读出的用户痛点是：**全量测试套件在真实开发机（macOS，10 核）上运行时的稳定性不足**，测试超时断言与系统负载之间存在竞态，导致有效的代码改动被 flaky test 阻塞合并流程。这提示 CI 测试隔离策略（如限制并行度、超时阈值放宽或标记 flaky）可能需要优化。

## 待处理积压

- **PR #1190（OPEN，8-11 创建）**：大型功能 PR（持久化连接器与频道历史），已开放 3 天、今日有更新但无评审动态。考虑到其体量与对凭据安全的处理方式，建议维护者尽快安排评审或给出反馈，以免长期滞留影响路线图节奏。
- **Issue #1193（OPEN，8-13 创建）**：flaky 测试尚无认领或修复 PR。若持续存在，建议标记为 `flaky-test` 或调整测试的隔离级别，避免干扰 CI 信号。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报 — 2026-08-14

## 1. 今日速览

CoPaw 项目（QwenPaw）在过去 24 小时内保持高度活跃：共更新 42 条 Issues（新开/活跃 25 条、关闭 17 条）和 50 条 PR（待合并 31 条、已合并/关闭 19 条），并发布 2 个新版本（v2.1.0 正式版及 v2.1.0-beta.5）。v2.1.0 正式版引入 QwenPaw OS Shell 窗口化界面，是本月最重要的功能里程碑。值得关注的是，安全类 Issue 占比明显上升——包括 2 份关于端口暴露与 API 无鉴权的安全报告，以及插件静默创建定时任务的权限模型缺陷，表明社区对安全性的关注度正在提高。多步骤任务中断、上下文压缩后聊天记录不可见等问题是当前用户痛点最集中的方向。

## 2. 版本发布

### v2.1.0（正式版）

- 新增 **QwenPaw OS Shell**：应用现可在可移动、可调整大小的窗口中打开，配备启动器、任务栏、通知系统和已保存布局（[#6645](https://github.com/agentscope-ai/QwenPaw/pull/6645)）
- 已安装应用与市场应用现在在 App Center 中共享同一目录（与 Shell 集成配套）
- **破坏性变更提示**：OS Shell 属全新 UI 层，若用户依赖旧版 Console 的固定布局，需重新适应窗口化管理方式；自定义 CSS 或 UI 插件可能需适配新窗口容器

### v2.1.0-beta.5

- bugfix(chats)：处理 dict 类型的模型响应（[#6813](https://github.com/agentscope-ai/QwenPaw/pull/6816)，由 [@RerankerGuo](https://github.com/agentscope-ai/QwenPaw/pull/6816) 提交）
- bugfix(memory)：简化长期记忆引导逻辑（[#6942](https://github.com/agentscope-ai/QwenPaw/pull/6942)，由 [@jinliyl](https://github.com/agentscope-ai/QwenPaw/pull/6942) 提交）
- docs(website)：修复 Files 工作区相关文档

## 3. 项目进展

今日合并/关闭的 PR 显示项目在以下方向取得实质进展：

- **渠道媒体处理**：[#6715](https://github.com/agentscope-ai/QwenPaw/pull/6715) 为 OneBot 渠道增加入站媒体本地化处理，在 Agent 处理前先下载图片/音视频/文件到本地；[#6387](https://github.com/agentscope-ai/QwenPaw/pull/6387) 实现 Channel 可选依赖按需安装，减小默认安装体积
- **任务模式稳定性**：[#6652](https://github.com/agentscope-ai/QwenPaw/pull/6652) 在 MissionGate 服务端强制执行 `max_iterations`，阻止控制器 LLM 无限派发子 Agent 导致账户余额耗尽的问题；[#6636](https://github.com/agentscope-ai/QwenPaw/pull/6636) 为聊天历史接口添加分页与 GZip 压缩，解决长会话 1MB+ 响应导致 30 秒超时的问题
- **记忆系统修复**：[#6884](https://github.com/agentscope-ai/QwenPaw/pull/6884) 使 Auto-Dream 集成对 LLM 格式错误的容错能力增强——单个无效/空集成 schema 不再导致整个任务失败

综合来看，项目的核心对话链路（任务迭代控制、长会话性能、记忆管道容错）均有修复落地，整体稳定性在持续改善。

## 4. 社区热点

- **[#6921](https://github.com/agentscope-ai/QwenPaw/issues/6921)（6 评论）** 多步骤任务中 LLM 在输出"Now 2.1, 3.1, 3.2. Let me do all three."等规划信息后无提示停止，需用户输入"继续"才恢复执行。该类问题涉及对话式任务执行的可靠性，是当前用户体验的核心痛点。
- **[#6973](https://github.com/agentscope-ai/QwenPaw/issues/6973)（5 评论）** 询问 QwenPaw Creator 能否支持阿里云百炼的 token plan 计费方式，反映国内用户对国产云厂商计费集成的需求。
- **[#6811](https://github.com/agentscope-ai/QwenPaw/issues/6811)（5 评论，已关闭）** OpenAI Responses 续写摘要忽略 `disable_thinking` 且将 60 秒取消误报为格式错误输出——已关闭表明已处理。
- **[#6853](https://github.com/agentscope-ai/QwenPaw/issues/6853)（5 评论，已关闭）** 指出 `prompts.py` 声称 Dream 进程会自动将摘要同步到 MEMORY.md，但实际从未实现。已关闭，相关修复可能已合入。

社区讨论集中在两类诉求：**任务执行的可靠性与透明度**（中途停止、无限循环、压缩后记录不可见），以及**生态集成能力**（阿里云百炼 token plan、CopilotKit 集成、服务器端代理客户端）。

## 5. Bug 与稳定性

| 严重度 | Issue | 描述 | 状态 |
|--------|-------|------|------|
| 🔴 严重 | [#6992](https://github.com/agentscope-ai/QwenPaw/issues/6992) / [#6993](https://github.com/agentscope-ai/QwenPaw/issues/6993) | 服务以 0.0.0.0 暴露公网 8088 端口，插件安装 API 无鉴权，可被投递恶意插件、植入 SSH 后门 | 1 条已关闭、1 条开放，建议维护者立即核查默认监听地址与鉴权机制 |
| 🟠 中高 | [#6916](https://github.com/agentscope-ai/QwenPaw/issues/6916) | 插件可在无用户确认的情况下静默创建 cron 任务并注入用户可见消息 | 已关闭 |
| 🟠 中高 | [#6921](https://github.com/agentscope-ai/QwenPaw/issues/6921) | 多步骤任务无提示中断，需用户输入"继续"才恢复；已定位到 LLM 输出模式，等待修复方案 | 开放中，暂无对应 PR |
| 🟠 中高 | [#6951](https://github.com/agentscope-ai/QwenPaw/issues/6951) | Scroll 压缩后重新进入会话，压缩前聊天记录不可见，仅显示 eviction index | 开放中，涉及 UI 层对压缩消息的处理 |
| 🟡 中 | [#6768](https://github.com/agentscope-ai/QwenPaw/issues/6768) | 多步骤任务完成后 Agent 进入无限循环，会话阻塞数小时 | 已关闭 |
| 🟡 中 | [#7007](https://github.com/agentscope-ai/QwenPaw/issues/7007) | Windows Desktop TUI 因打包的 qwenpaw.exe 拒绝 `-m qwenpaw acp` 参数导致 `transport: Connection closed` | 新增，待处理 |
| 🟡 中 | [#7008](https://github.com/agentscope-ai/QwenPaw/issues/7008) | Anthropic 模型端将历史图片误判为敏感内容（错误码 1026），中断长会话——用户反馈图片无违规内容 | 新增，模型端误报，需在客户端做降级或重试策略 |
| 🟡 中 | [#6955](https://github.com/agentscope-ai/QwenPaw/issues/6955) | v2.0.1 pip 安装版本概率性启动报错、崩溃退出（Windows asyncio 相关） | 开放中，待处理 |

## 6. 功能请求与路线图信号

- **服务器端代理客户端**（[#7002](https://github.com/agentscope-ai/QwenPaw/issues/7002)）：用户希望部署在服务器端的 QwenPaw 能配合一个轻量桌面代理客户端使用，解决现有桌面端笨重、数据不同步的问题。该需求触及产品架构，短期内难以实现，但值得记录在路线图。
- **可嵌入的聊天子页面**（[#6970](https://github.com/agentscope-ai/QwenPaw/issues/6970)）：请求聊天界面可无侧边栏/头部栏单独打开，且 URL 可带 API key 免除权限验证；同时希望 session 列表支持按日期、sessionId 等条件精确筛选。已有相关前端基础设施，实现成本较低。
- **注入 `QWENPAW_CHANNEL` 环境变量**（[#6995](https://github.com/agentscope-ai/QwenPaw/issues/6995)）：为 shell 子进程注入当前渠道信息，方便外部脚本感知调用来源。属于小的增强，已有 ContextVar 基础，实现简单。
- **从其他 Agent 导入配置**（[#6960](https://github.com/agentscope-ai/QwenPaw/pull/6960)）：新增 pawport 导入流程，可从 Codex、Qoder 导入 instructions、技能、插件、项目与近期工作。该 PR 已提交，若合入将成为 v2.2.0 的亮点功能。
- **Matrix 渠道会话隔离**（[#7001](https://github.com/agentscope-ai/QwenPaw/pull/7001)）：解决 Matrix 群组房间中所有成员共享同一会话上下文和记忆身份的问题。属于渠道正确性修复，合入概率较高。

## 7. 用户反馈摘要

- **任务中断是最大痛点**（[#6921](https://github.com/agentscope-ai/QwenPaw/issues/6921)）：用户指出 LLM 在规划完下一步后停止且无任何视觉提示，需要人工介入说"继续"。这不仅影响效率，还破坏了对 Agent 自主性的信任。
- **聊天记录可见性不满**（[#6951](https://github.com/agentscope-ai/QwenPaw/issues/6951)）：上下文压缩后原始聊天记录从 UI 消失，只剩内部索引。用户明确表示"上下文压缩应只影响模型输入，不应破坏用户可见的完整 transcript"——这是对产品设计原则的合理诉求。
- **安全信任危机**（[#6992](https://github.com/agentscope-ai/QwenPaw/issues/6992)）：用户提交了详细的安全报告（含 PDF 附件），描述通过无鉴权插件 API 投递恶意插件、植入 SSH 后门的完整攻击链。无论该报告是否完全属实，都反映出社区对 QwenPaw 安全配置（默认监听地址、插件权限）的担忧。
- **杀软误报/拦截**（[#6847](https://github.com/agentscope-ai/QwenPaw/issues/6847)）：部分杀软在 QwenPaw 执行任务时强制关停进程，用户对比其他同类工具后表示困惑。可能需要在文档中说明行为特征或提供白名单指引。
- **字符动态显示干扰注意力**（[#6585](https://github.com/agentscope-ai/QwenPaw/issues/6585)，已关闭）：聊天框下方"已接收字符数"动态刷新造成视觉干扰，用户请求增加关闭开关，已处理。

## 8. 待处理积压

| 项目 | 类型 | 创建时间 | 备注 |
|------|------|----------|------|
| [#6302](https://github.com/agentscope-ai/QwenPaw/pull/6302) feat: unify provider discovery, model metadata, routing, and agent controls | PR 待合并 | 2026-07-21 | 已开放 24 天，涉及 provider 体系重大重构，文件量级大，建议维护者明确是否合入目标版本 |
| [#6823](https://github.com/agentscope-ai/QwenPaw/pull/6823) feat(providers): apply documented capability templates to custom providers | PR 待合并 | 2026-08-08 | 与 #6302 功能有重叠，需协调合并顺序 |
| [#6047](https://github.com/agentscope-ai/QwenPaw/issues/6047) 升级 2.0.0 后新聊天会打开旧会话 | Issue（已关闭） | 2026-07-13 | 已关闭但无可见 fix PR 关联，建议确认修复方式是否已合入 |
| [#6100](https://github.com/agentscope-ai/QwenPaw/issues/6100) `pip upgrade` 后 agent.json 被覆盖为空配置 | Issue（已关闭） | 2026-07-14 | 涉及升级数据安全，若修复只针对单次事件而非系统性防护，建议回访确认 |
| [#6966](https://github.com/agentscope-ai/QwenPaw/issues/6966) Telegram /new 不轮换 session ID，上下文无上限累积 | Issue（开放） | 2026-08-13 | 涉及 Telegram 渠道 session 设计缺陷，会导致长会话性能劣化，建议优先排期 |

---

*报告生成时间：2026-08-14 | 数据来源：github.com/agentscope-ai/CoPaw（QwenPaw）*

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

# EasyClaw 项目动态日报 — 2026-08-14

## 今日速览

EasyClaw 过去 24 小时内社区活跃度整体平稳，Issues 与 PR 均无新增或变动，项目处于相对沉寂的间歇期。但项目发布了两个新版本（v1.8.98 与 v1.8.99），保持了稳定的迭代节奏，核心方向聚焦于达人工作流（Affiliate Workflows）的增强：包括新增产品知识支持、按设备维度的云端 LLM 用量归因，以及表单保护机制的强化。连续两日发版表明开发侧仍有持续输出，当前阶段更偏向功能完善而非问题修复。项目整体健康度良好，暂无阻塞性问题或重大事故报告。

## 版本发布

### v1.8.99 — TK Copilot v1.8.99
- **发布时间**：2026-08-14（近 24 小时内）
- **核心更新**：
  - 支持按设备归因云端 LLM 用量，提升用量统计的精确度与可观测性。
  - 改善达人管理（Affiliate）与产品知识（Product Knowledge）表单的保护机制。
- **破坏性变更**：无明确说明。
- **迁移注意事项**：macOS 用户若遇 `"'RivonClaw' is damaged and can't be opened"` 提示，属于 Gatekeeper 拦截未签名应用，需手动绕过。无其他迁移步骤。
- **链接**：[Releases v1.8.99](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.99)

### v1.8.98 — TK Copilot v1.8.98
- **发布时间**：2026-08-14（近 24 小时内）
- **核心更新**：
  - 为达人工作流新增产品知识（Product Knowledge）支持。
  - 为达人工作流提供精确的 Agenda 级商品上下文，提升对话与推荐精度。
- **破坏性变更**：无明确说明。
- **迁移注意事项**：同 v1.8.99，macOS Gatekeeper 拦截提示需手动处理。
- **链接**：[Releases v1.8.98](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.98)

> 注意：v1.8.98 与 v1.8.99 发布窗口相近，建议用户直接升级至最新版 v1.8.99。若从更早版本升级，请先升级至 v1.8.98 后再行更新。

## 项目进展

过去 24 小时内无合并或关闭的 PR，因此没有具体的代码合入记录。项目进展主要体现在上述两个版本的连续发布上：从 v1.8.98 到 v1.8.99 的快速迭代（间隔不足一个发布周期），反映出团队正围绕「达人工作流 + AI 能力增强」快速试错与交付。两步走的策略清晰——先为工作流补充知识库与上下文能力，再针对用量计费与表单安全做加固，整体功能完整度在稳步提升。

## 社区热点

过去 24 小时内无活跃讨论或新增评论的 Issues/PRs。社区当前无高热度的公开讨论话题，这与今日 Issue/PR 零活跃的数据表现一致。

## Bug 与稳定性

今日未报告新的 Bug、崩溃或回归问题。需留意的是 v1.8.98 与 v1.8.99 发布说明中提到的 macOS Gatekeeper 拦截问题（`'RivonClaw' is damaged and can't be opened`），该问题为 macOS 安全机制对未签名应用的常规拦截，并非应用缺陷，但可能影响部分用户的安装体验。目前尚无对应 fix PR（推测为签名流程优化，暂未纳入公开开发计划）。

## 功能请求与路线图信号

今日未收到新的功能请求。结合近两次版本更新，可清晰看到项目当前的产品路线图信号：

- **达人工作流强化**：连续两个版本均围绕 Affiliate Workflows 迭代，先补知识库、再补商品上下文，后续可能继续深化这一场景。
- **可观测性与用量治理**：v1.8.99 引入的设备级 LLM 用量归因，暗示项目正在为多设备/多用户场景的计费与配额管理做铺垫。

以上两点大概率进入下一版本的迭代范围。

## 用户反馈摘要

今日无新增的用户评论或 Issue 讨论，因此没有可直接引用的用户声音。从版本发布说明的变更内容可以间接推断：开发团队当前处于主动改进期，重点在于提升达人工作流场景的智能推荐精准度与后台用量透明度，该方向与电商/达人营销类用户的典型需求吻合。

## 待处理积压

目前无长期未响应的重要 Issue 或 PR，积压列表为空。项目维护与响应状态良好。

---

*数据来源：[EasyClaw GitHub Repository](https://github.com/gaoyangz77/easyclaw)*

</details>

---
*本日报由 [agents-radar](https://github.com/huang-yi-dae/agents-radar) 自动生成。*