# OpenClaw 生态日报 2026-08-07

> Issues: 500 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-08-07 02:29 UTC

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

OpenClaw 项目过去 24 小时保持高活跃度，共处理 500 条 Issue 和 500 条 PR。Issue 关闭率约为 15%（73/500），PR 合并/关闭率约为 20%（101/500），整体流转效率健康。当前无新版本发布，但代码库中存在多个高优（P0/P1）的 Bug 报告与修复 PR，主要集中在会话状态（session-state）、消息丢失（message-loss）和认证（auth-provider）等核心领域。值得关注的是，社区对内存安全、子代理权限控制以及多模型兼容性的讨论热度显著上升。

---

### 2. 版本发布

**无。**

---

### 3. 项目进展

今日合并/关闭的关键 PR 展示了项目在稳定性、安全性和开发者体验上的持续投入：

- **修复 CLI 使用量统计丢失**（[PR #120100](https://github.com/openclaw/openclaw/pull/120100)）：`clawsweeper[bot]` 自动生成，修复 CLI 驱动的 Claude 回合在诊断过程中丢失终端累计使用量的问题，确保 `openclaw.model.usage` 报告准确。
- **修复 Gateway 状态目录派生逻辑**（[PR #120110](https://github.com/openclaw/openclaw/pull/120110)）：确保锁文件与协调文件从解析后的 `OPENCLAW_STATE_DIR` 派生，避免沙箱实例污染临时目录。
- **优化 Node CLI 安装警告**（[PR #118430](https://github.com/openclaw/openclaw/pull/118430)）：安装后检测 systemd user lingering 未启用时发出警告，防止节点静默离线。
- **清除 Agent 头像/表情逻辑**（[PR #120052](https://github.com/openclaw/openclaw/pull/120052)）：修复 `agents.update` 传入空值无法清除头像/表情的问题（已关闭，标记为重复）。

这些合并表明项目正在稳步增强诊断准确性、部署健壮性和配置一致性。

---

### 4. 社区热点

- **[Issue #75: Linux/Windows Clawdbot Apps](https://github.com/openclaw/openclaw/issues/75)**（116 评论，80 👍）：最热门 Issue，已关闭。用户强烈期待桌面应用扩展至 Linux 和 Windows 平台，由于评论数长期高企，该诉求虽已关闭但仍值得关注，可能意味着相关功能已进入规划或分化处理。
- **[Issue #116277: DeepSeek v4 Flash 静默回复失败](https://github.com/openclaw/openclaw/issues/116277)**（114 评论）：高关注度 Bug，涉及模型回复静默失败并触发泛化兜底消息，影响 Telegram 群组通信。用户对模型网关的可靠性有极高期待，此类失败会直接损害用户体验。
- **[Issue #7707: 内存来源信任标签](https://github.com/openclaw/openclaw/issues/7707)**（28 评论）：社区对防御“内存投毒”攻击的意识强烈，希望通过按来源（用户命令、网页抓取等）标记信任级别来防止恶意指令注入，反映出对安全性的深层需求。

---

### 5. Bug 与稳定性

按严重程度排列：

| 严重度 | Issue | 摘要 | Fix PR 状态 |
| :--- | :--- | :--- | :--- |
| **P0** | [Issue #119263](https://github.com/openclaw/openclaw/issues/119263) | Agent DB v14->v15 迁移失败，导致网关无法启动。 | 无 |
| **P0** | [Issue #118772](https://github.com/openclaw/openclaw/issues/118772) | `totalTokens` 膨胀导致过早压缩，引发数据丢失。 | 无 |
| **P1** | [Issue #115700](https://github.com/openclaw/openclaw/issues/115700) | 模型完成后 `chat.send` 因过期 `expectedLeafEntryId` 被拒。 | 无 |
| **P1** | [Issue #88079](https://github.com/openclaw/openclaw/issues/88079) | WebChat 未渲染 Kimi Code & DeepSeek Reasoner 推理内容。 | 无 |
| **P1** | [Issue #92186](https://github.com/openclaw/openclaw/issues/92186) | 前台回复围栏导致并发群组消息仅最新一条被投递。 | 无 |
| **P1** | [Issue #109881](https://github.com/openclaw/openclaw/issues/109881) | Bedrock 缺少思考签名重放保护，导致会话永久“变砖”。 | 无 |
| **P1** | [Issue #86012](https://github.com/openclaw/openclaw/issues/86012) | LINE 频道因回复令牌过期导致消息静默丢失。 | [PR #117456](https://github.com/openclaw/openclaw/pull/117456) (Open) |
| **P1** | [Issue #90789](https://github.com/openclaw/openclaw/issues/90789) | claude-cli 后端合成占位符导致 Telegram 回合完全静默。 | 无 |
| **P1** | [Issue #119087](https://github.com/openclaw/openclaw/issues/119087) | Gateway 冷启动回归，性能下降约 2.5 倍。 | 无 |

---

### 6. 功能请求与路线图信号

- **子代理权限控制**（[Issue #15032](https://github.com/openclaw/openclaw/issues/15032)）：请求为 `sessions_spawn` 生成的子代理添加按工具限制的权限。这与近期安全相关 Issue（如 #7707）形成呼应，表明“权限最小化”是社区持续关注的方向，有望被纳入后续安全增强版本。
- **内存信任标签**（[Issue #7707](https://github.com/openclaw/openclaw/issues/7707)）：提出为内存条目添加信任级别标签，以防御提示注入攻击。虽然尚无直接 PR，但其讨论热度高，可能会推动相关设计文档的产出。
- **Slack Modal 支持**（[Issue #88154](https://github.com/openclaw/openclaw/issues/88154)）：请求为工作流提供原生 Slack 模态框支持，以改善结构化输入收集体验。该请求已获得维护者标记 `clawsweeper:needs-maintainer-review`，表明已在评估中。

---

### 7. 用户反馈摘要

- **跨平台需求强烈**：用户持续反馈对 Linux/Windows 客户端的需求（#75），表明项目在开发者社区中已超越单一平台限制，成为跨平台工作流的核心工具。
- **模型兼容性痛点**：多名用户报告不同模型（DeepSeek V4 Flash、Kimi Code、Ollama）在推理流、回复生成或工具调用上的失败，集中在“静默失败”和“响应不一致”上，反映出多模型接入的稳定性是影响用户体验的关键瓶颈。
- **部署与运维摩擦**：有用户反馈在 Windows/WSL 上构建失败（#102755）和 Docker 卷挂载导致插件初始化失败（#58139），显示出部署文档与跨平台兼容性仍需加强。
- **正面反馈**：用户 `Reneb-cafe` 在 #73537 中明确表示 OpenClaw “已成为家庭和业务助手日常流程的一部分”，体现出项目在实际场景中的价值与用户粘性。

---

### 8. 待处理积压

以下为长期未关闭且需维护者关注的重要 Issue：

- **[Issue #7707: 内存信任标签](https://github.com/openclaw/openclaw/issues/7707)**（创建于 2026-02-03，28 评论）：安全增强请求，已获 `clawsweeper:needs-maintainer-review` 标记，但长期未获明确进展。
- **[Issue #27445: `announceTarget` 路由选项](https://github.com/openclaw/openclaw/issues/27445)**（创建于 2026-02-26，12 评论）：关于子代理完成通知路由的功能性改进，对多步工作流编排有实际价值，处于待产品决策状态。
- **[Issue #6599: `/models` 测试命令](https://github.com/openclaw/openclaw/issues/6599)**（创建于 2026-02-01，9 评论）：请求增加模型回退链测试命令，以降低配置错误风险，属于开发者体验类改进。
- **[Issue #45565: 生命周期警告路由](https://github.com/openclaw/openclaw/issues/45565)**（创建于 2026-03-14，7 评论）：提议将网关生命周期警告路由至独立频道，以减少对正常对话的干扰，等待产品决策。
- **[Issue #117209: AuthProfileStore 粘性错误](https://github.com/openclaw/openclaw/issues/117209)**（创建于 2026-08-01，P1）：快照发布失败后导致认证错误粘滞，影响后续所有回复，需紧急关注。

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比分析报告

**报告日期：2026-08-07**


## 1. 生态全景

个人 AI 助手/自主智能体开源生态整体处于**活跃迭代期**，核心项目（OpenClaw、IronClaw、CoPaw、Zeroclaw）每日合计处理超过 600 条 Issue 与 PR，显示出强劲的社区驱动力。当前阶段呈现三大特征：一是**多模型兼容性与可靠性**成为共性瓶颈，OpenClaw、CoPaw、NanoBot 均报告模型静默失败、推理内容丢失、工具调用协议冲突等问题；二是**安全与权限治理**从边缘议题上升为核心关注，内存投毒防御、子代理权限最小化、凭据链验证、默认拒绝策略等需求在多项目中同时涌现；三是**会话生命周期管理**（状态持久化、上下文窗口管理、跨天任务可靠性、模型切换）成为用户反馈最集中的体验痛点。整体而言，生态已从"功能扩展期"逐步迈入"稳定性与安全加固期"，但各项目所处阶段和侧重点存在明显差异。


## 2. 各项目活跃度对比

| 项目 | Issues（24h） | PRs（24h） | Release | 健康度评估 |
|:---|:---|:---|:---|:---|
| **OpenClaw** | 500（关闭率15%） | 500（合并率20%） | 无 | 高活跃，流转效率健康；P0/P1 Bug 集中于会话状态与认证 |
| **IronClaw** | 50 | 50 | **v1.1.0** | 高活跃，有稳定版发布；Slack/Routine 可靠性问题积压 |
| **Zeroclaw** | 35（24活跃/11关闭） | 50（43待合并/7合并） | 无 | 高活跃，安全修复持续落地；SOP 子系统集中爆发 Bug |
| **CoPaw** | 33（17关闭） | 50（29合并） | 无（2.1.0 迭代中） | 高活跃，修复速度快；beta 版本引入部分回归 |
| **NanoBot** | 27 | 17（半数待审） | 无 | 中高活跃，安全修复优先；会话管理结构性调整中 |
| **NanoClaw** | 2（1开1关） | 14（8合并） | 无 | 中活跃，积压清理加速；外部贡献者驱动明显 |
| **PicoClaw** | 0 | 2（1合并1开放） | 无 | 中低活跃；PR #3200 悬置 37 天需关注 |
| **LobsterAI** | 5（新增3） | 2（均待合并） | 无 | 低活跃，**5/7 条目 stale 超 4 个月**，响应滞后 |
| **NullClaw / TinyClaw / Moltis / ZeptoClaw / EasyClaw** | 0 | 0 | — | 无活动 |


## 3. OpenClaw 在生态中的定位

**OpenClaw 是生态的绝对核心与参照基准**，其日处理 1000 条 Issue/PR 的规模远超同类项目（IronClaw 与 CoPaw 各约 100 条，Zeroclaw 约 85 条），社区体量存在数量级差距。

**优势**：① 生态覆盖面最广——从 CLI、Gateway、WebChat 到多通道（Telegram/LINE/Slack/Matrix）均有布局；② 基础设施投入深——在诊断准确性（#120100）、状态目录派生（#120110）、部署健壮性（#118430）等底层工程上有持续投入；③ 社区自组织能力强——`clawsweeper[bot]` 自动化工具已参与 PR 生成与维护，形成半自动化的社区协作模式。

**技术路线差异**：相比 IronClaw 侧重 Inspector 运营面板和企业级治理，CoPaw 深度绑定 AgentScope 框架，NanoBot 强调轻量与隐私（临时会话、内存-only），OpenClaw 更倾向于**全功能一体化**——从模型网关到子代理编排、从记忆管理到多平台分发的完整闭环。

**社区关注差异**：OpenClaw 社区热点集中于模型网关可靠性（#116277 获 114 评论）和跨平台桌面端需求（#75 获 80 赞），反映出其用户已将其视为生产级基础设施，对稳定性和可用性有极高期待。


## 4. 共同关注的技术方向

### 4.1 模型兼容性与多模型可靠性
| 涉及项目 | 具体诉求 |
|:---|:---|
| OpenClaw | DeepSeek V4 Flash 静默回复失败（#116277，114 评论）；Kimi/DeepSeek 推理内容未渲染（#88079） |
| Zeroclaw | 兼容 Provider 无条件剥离 `<think>` 标签致内容丢失（#8615，已修复） |
| CoPaw | DeepSeek thinking 多轮失败（#6667）；空响应不报错（#6601）；工具调用 400 错误（#6726） |
| NanoBot | OpenAI 兼容 Provider API 密钥写入全局环境变量（PR #5269） |

### 4.2 内存安全与提示注入防御
| 涉及项目 | 具体诉求 |
|:---|:---|
| OpenClaw | 内存来源信任标签（#7707，28 评论）——按来源标记信任级别防投毒 |
| NanoBot | 临时会话内存-only 契约（PR #5259）；会话历史移出工作区（#5278） |
| Zeroclaw | verifiable-intent 约束评估（#9328，安全相关） |

### 4.3 子代理权限控制与最小化
| 涉及项目 | 具体诉求 |
|:---|:---|
| OpenClaw | 子代理按工具限制权限（#15032） |
| Zeroclaw | 管线越权修复（#7947，S0 级，已修复）；WhatsApp 空 `allowed_groups` 默认放行（#9397） |

### 4.4 会话生命周期与上下文管理
| 涉及项目 | 具体诉求 |
|:---|:---|
| OpenClaw | 会话状态迁移失败（#119263，P0）；totalTokens 膨胀导致数据丢失（#118772，P0） |
| NanoBot | 会话状态丢失/错乱（#5198 模型切换、#5273 保留策略丢消息、PR #5271 陈旧引用覆盖新会话） |
| CoPaw | 跨天日期判断错乱（#6755）；Agent 死循环（#6768）；长会话上下文超限（#6726） |
| IronClaw | Runner 租约过期致 Routine 失败（#5456，38 天未解决） |

### 4.5 频道行为一致性与富媒体支持
| 涉及项目 | 具体诉求 |
|:---|:---|
| NanoBot | Matrix 回复线程语义对齐（#5274/5275）；频道行为一致性 |
| PicoClaw | QQ 频道富媒体消息解析与回复（PR #1349，已合并） |
| CoPaw | OneBot 引用消息展开与远程媒体（#6769/6715） |
| IronClaw | Slack 断开/投递/DM 读取多重问题 |

### 4.6 模型回退与故障转移
| 涉及项目 | 具体诉求 |
|:---|:---|
| PicoClaw | 可配置默认回退链（PR #3200，开放 37 天） |
| CoPaw | 模型自动故障转移与冷却（PR #6659，Under Review） |
| OpenClaw | 模型网关可靠性（#116277） |


## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构特色 |
|:---|:---|:---|:---|
| **OpenClaw** | 全功能一体化：多通道、多模型、子代理、记忆 | 开发者/进阶用户，跨平台工作流核心 | 模块化 Gateway + CLI + WebChat；`clawsweeper[bot]` 自动化运维 |
| **IronClaw** | 运营诊断与治理：Inspector 面板、Routine 自动化、审批流 | 企业用户/团队协作 | Inspector 运营诊断 API + WASM 工具沙箱 + Nostr 支持；发布节奏稳定（v1.1.0） |
| **Zeroclaw** | SOP（标准操作程序）驱动的工作流编排 | 重度自动化用户 | 声明式 SOP + 能力集 + cron 触发；强调管线安全与权限门控 |
| **CoPaw** | AgentScope 深度集成 + ReMe 记忆系统 | 依赖 AgentScope 生态的开发者 | 深度绑定 agentscope 框架；Scroll 统一上下文协议；MCP 工具链 |
| **NanoBot** | 轻量、隐私优先：临时会话、内存-only | 隐私敏感用户/自托管 | 轻量架构；强调进程内状态与最小依赖；WebUI 性能优化 |
| **NanoClaw** | 自更新机制与技能管理 | 自托管用户 | 事务化更新 + 外部贡献者驱动；技能预检/凭据分离 |
| **PicoClaw** | 多通道富媒体（QQ 频道重点） | IM 多模态交互用户 | 通道能力矩阵扩展；模型回退链配置 |
| **LobsterAI** | 模型级参数精细控制 + 桌面端体验 | 桌面端用户 | Windows 优先；exec 工具 + 桌面 GUI；模型级 context/token 配置 |


## 6. 社区热度与成熟度

### 第一梯队：高活跃 · 快速迭代
**OpenClaw、IronClaw、CoPaw、Zeroclaw** 日处理 Issue/PR 均在 30+ 条，处于密集迭代期。其中 OpenClaw 和 CoPaw 偏向"功能扩展与修复并重"，IronClaw 偏向"稳定版发布后的质量巩固"，Zeroclaw 偏向"安全问题集中修复 + SOP 功能补强"。

### 第二梯队：中活跃 · 结构性调整
**NanoBot、NanoClaw** 日处理 10-30 条。NanoBot 正处会话管理模块的结构性重构期（临时会话、存档、隔离），NanoClaw 在清理技术债与加速积压合并。

### 第三梯队：中低活跃 · 功能推进中
**PicoClaw、LobsterAI** 日处理个位数。PicoClaw 保持平稳节奏（QQ 通道功能刚合并），LobsterAI 活跃度下降明显，**5/7 活跃条目处于 stale 状态超 4 个月**，维护响应滞后，存在社区流失风险。

### 第四梯队：静默
**NullClaw、TinyClaw、Moltis、ZeptoClaw、EasyClaw** 过去 24 小时无任何活动，需关注是否存在活跃度持续走低的风险。


## 7. 值得关注的趋势信号

1.  **从"功能数量"转向"功能可信度"**：多个核心项目（OpenClaw #116277、CoPaw #6601、NanoBot #5273）的用户反馈集中在"静默失败""无错误报告"等可信度问题上。用户对"AI 助手在后台悄悄出错"的容忍度已降至最低，**可观测性与失败透明化**正在成为新的核心竞争力。

2.  **"默认安全"从建议变为要求**：Zeroclaw 的 WhatsApp 空群组默认放行（#9397）、OpenClaw 的内存投毒防御（#7707）、NanoBot 的临时会话内存-only（#5259）共同指向一个趋势——**安全不再是被动修复的 Bug，而是需要主动设计的架构原则**。权限最小化、信任分级、默认拒绝正在成为新的默认配置。

3.  **多模型冗余从"备选"走向"必备"**：PicoClaw 的模型回退链（#3200）、CoPaw 的故障转移与冷却（#6659）、NanoBot 的多 Provider 环境变量隔离（#5269）表明，**单一模型依赖已被视为架构缺陷**。可配置的回退顺序、故障冷却、Provider 隔离正在成为标准能力。

4.  **会话生命周期管理成为用户体验的分水岭**：从 OpenClaw 的 P0 级迁移失败（#119263）到 CoPaw 的跨天日期错乱（#6755）再到 IronClaw 的租约过期（#5456），**"长会话下的状态一致性"** 是当前最高频的 P0/P1 故障来源。这暗示多项目在会话持久化、上下文窗口管理、状态恢复等基础设施上仍需系统性投入。

5.  **个人 AI 助手已跨过"玩具阶段"进入生产依赖**：OpenClaw 用户称其"已成为家庭和业务助手日常流程的一部分"（#73537），IronClaw 用户主动将 Obsidian/Notion 等知识库接入 MCP（#4343），CoPaw 用户因安全软件误报而"卸载并等待官方回应"（#6775）——**用户正在将 AI 助手嵌入关键业务流程**，这既验证了生态价值，也意味着可靠性、安全性和官方响应速度将成为用户留存的决定性因素。

6.  **外部贡献者在核心项目中的参与度持续提升**：NanoClaw 的 glifocat 连续提交多个核心团队级 PR（事务化更新、技能清理），IronClaw 的 Kampouse 提交 Nostr WASM 主机函数，Zeroclaw 的 vrurg 同时提交两条 XL 级 PR——**高质量外部贡献已成为项目推进的重要引擎**，如何保持贡献者活跃度和降低 review 瓶颈（如 Zeroclaw 的 RFC 决策积压问题 #8692）是各项目面临的共同治理挑战。

7.  **跨平台与桌面端需求持续走强**：OpenClaw 的 Linux/Windows 桌面端诉求（#75）获得 80+ 赞，CoPaw 桌面版被安全软件误报（#6775）引发用户信任危机，LobsterAI 桌面端交互优化已积压 4 个月——**桌面端体验与安全性正在成为影响用户评估 AI 助手成熟度的关键因素**。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

### NanoBot 项目动态日报 — 2026-08-07

---

#### 1. 今日速览

项目在过去 24 小时内保持了高活跃度，共产生 27 条 Issue/PR 动态，其中 PR 提交密集（17 条），且半数以上处于开放待审状态，显示核心功能开发与安全/稳定性修复并驾齐驱。安全相关修复（API 密钥泄露、进程环境变量污染）优先级高（P0/P1），表明维护团队对供应链和运行时安全极为重视。社区反馈聚焦于会话管理（隔离、持久化、上下文保留）与频道行为（Matrix/微信）的一致性。无新版本发布，项目正处在大量修复与功能合并前的"冲刺"阶段。

---

#### 3. 项目进展

今日共有 5 个 PR 被合并或关闭，主要推进了 WebUI 交互与性能优化，并对 Matrix 频道兼容性进行了关键修复：

- **PR #5248 (已合并)**：修复 Matrix 频道在 Continuwuity 服务器上无法自动加入房间的问题。`nio` 库发送空 POST body 导致房主服务器拒绝，现改为发送空 JSON 对象 `{}`。这是对长期困扰 Matrix 用户的问题的确定性修复。 [链接](https://github.com/HKUDS/nanobot/pull/5248)
- **PR #5262 (已合并)**：WebUI 冷启动性能优化。为生产静态资源预生成 gzip 压缩文件并在网关层协商，同时将 React 运行时从懒加载的 Markdown/语法高亮/KaTeX 代码块中拆分出来，可显著减少首次加载体积与解析时间。 [链接](https://github.com/HKUDS/nanobot/pull/5262)
- **PR #5267 (已合并)**：统一 WebUI 交互动效时长（约 220ms），缩短任务完成状态的视觉滞留感，并在用户开启"减少动态效果"偏好时移除布局位移。属体验细节打磨。 [链接](https://github.com/HKUDS/nanobot/pull/5267)
- **PR #5259 (已合并)**：强化 WebUI"临时会话"的内存-only 契约。明确临时对话状态仅存于进程内存，不写入会话历史、自动记忆或 WebUI 转录，但请求仍会真实送达模型提供商。该 PR 与 #5252 配合，为隐私场景提供基础能力。 [链接](https://github.com/HKUDS/nanobot/pull/5259)
- **PR #5261 (已关闭)**：WebUI 侧边栏会话拖拽排序/拖入输入框功能被关闭。从关闭状态推断可能因设计冲突或技术方案调整被搁置，具体原因待查。 [链接](https://github.com/HKUDS/nanobot/pull/5261)

---

#### 4. 社区热点

今日最受关注的讨论集中在**会话模型切换**与**Cron 任务与子代理协作**两个核心使用场景上：

- **Issue #5198 (3 条评论)**：用户 `whisperity` 抱怨"无法在不重新配置整个实例的情况下切换特定会话的模型"。该反馈直击多模型工作流痛点——用户期望像消费级 SaaS 一样在会话内自由切换模型，而非将备用模型仅作为 fallback。此问题涉及 `/model` 命令行为与前端 UI 交互，是影响日常使用体验的高频诉求。 [链接](https://github.com/HKUDS/nanobot/issues/5198)
- **Issue #4290 (2 条评论，持续 2 个月未解决)**：Cron 任务生成子代理后主代理无机会处理子代理结果，导致整体工作流提前终止。该问题暴露了代理编排中一个深层次的时序缺陷，长时间未修复已对重度自动化用户造成持续困扰。 [链接](https://github.com/HKUDS/nanobot/issues/4290)

---

#### 5. Bug 与稳定性

今日报告的 Bug 集中于安全性（最高优先级）、会话隔离和数据完整性，多数已有对应修复 PR：

| 严重程度 | Issue / PR | 问题描述 | 修复状态 |
|---|---|---|---|
| **P0** | PR #5271 | 后台任务（如 `maybe_generate_webui_title`）持有旧 `Session` 引用，在 `/new` 清空会话后，陈旧保存会覆盖新会话数据 | 已有 PR，待合并 |
| **P1** | PR #5269 | OpenAI 兼容 Provider 将 API 密钥写入全局 `os.environ`，多 Provider 场景下互相覆盖或泄露 | 已有 PR，待合并 |
| **P1** | PR #5270 | CLI 子进程继承完整环境变量，存在将 API 密钥泄露给不受信子进程的风险 | 已有 PR，待合并 |
| **P2** | Issue #5273 / PR #5272 | 会话保留修剪（retention）会丢弃紧接着用户回复前的 `_channel_delivery` 主动消息（如 Cron 通知），破坏上下文 | 修复 PR 已提交，待合并 |
| **P2** | Issue #5264 / PR #5268 | `GET /api/sessions/{key}/messages` 历史接口不返回工作区外附件的 `media_urls`，刷新后附件失效 | 修复 PR 已提交，待合并 |
| **P2** | PR #5265 | 工具参数接受 `NaN`/`Infinity` 非有限浮点数，可能导致下游计算异常 | 待合并 |

---

#### 6. 功能请求与路线图信号

今日出现的功能请求反映了对**会话生命周期精细控制**与**频道行为一致性**的强烈需求：

- **会话级临时文件隔离 (Issue #5276)**：建议允许强制会话级临时文件隔离。当前即便开启 `restrictToWorkspace` 和 bwrap 沙箱，`~/.nanobot/workspace` 仍是全局共享读写目录。该请求与 #5278 形成讨论组合。 [链接](https://github.com/HKUDS/nanobot/issues/5276)
- **会话历史移出工作区 (Issue #5278)**：用户 `lmzopq` 指出 PR #713 将会话存储从全局目录移入 `<workspace>/sessions/` 带来了安全副作用——若工作区本身是项目目录，会话历史可能意外暴露在项目文件管理中。这暗示需要重新评估会话存储的安全边界。 [链接](https://github.com/HKUDS/nanobot/issues/5278)
- **Token 消耗可观测性 (Issue #5266)**：用户反馈"2 小时消耗百万 token 且无用户感知活动"，建议添加 token 消耗日志（时间、调用方、消耗量）。这是企业采用者对成本治理的明确信号。 [链接](https://github.com/HKUDS/nanobot/issues/5266)
- **Matrix 线程语义对齐 (Issues #5274, #5275)**：要求 bot 在 Matrix 中回复时正确使用"回复"功能，并将"回复线程"中的对话视为独立上下文。这体现了跨频道（Discord/Slack）行为一致性的产品化需求。 [链接](https://github.com/HKUDS/nanobot/issues/5274) [链接](https://github.com/HKUDS/nanobot/issues/5275)

结合已提交的 **PR #5231 (存档空闲会话供 Dream 处理)** 和 **PR #5252 (临时聊天模式，虽为 WebUI 功能但影响会话落盘策略)**，下一代版本的会话管理模块正在经历结构性调整。

---

#### 7. 用户反馈摘要

- **真实痛点**：多个用户（`whisperity`, `tjc0726`, `ziuus`）的核心痛点在于"**会话状态不可预期地丢失或错乱**"——包括无法切换模型（#5198）、Cron 任务子代理结果不回流（#4290）、保留策略丢消息（#5273）。
- **安全敏感**：用户 `lmzopq` 对会话历史存放位置提出明确安全质疑（#5278），说明社区正在以生产环境安全标准主动要求项目，是项目成熟度提升的积极信号。
- **资源消耗焦虑**：用户 `knoppix2` 对 token 巨额消耗的投诉（#5266）代表了自托管用户对成本透明度的诉求，该问题目前仅有功能请求，尚无实现迹象，或成为下一个社区呼声较高的功能。

---

#### 8. 待处理积压

- **Issue #4290 (自 2026-06-10，2 个月未解决)**：Cron 任务与子代理协作时序缺陷。期间无维护者响应记录，却直接影响核心自动化流程的可靠性，属高危积压项。 [链接](https://github.com/HKUDS/nanobot/issues/4290)
- **Issue #5198 (自 2026-07-31，评论 3 条，无官方回应)**：会话级模型切换。作为高频交互点，此问题长期未获回应可能加速部分用户流失。 [链接](https://github.com/HKUDS/nanobot/issues/5198)
- **PR #5231 (自 2026-08-03，连续 4 天未更新)**：Dream 功能的空闲会话存档方案，尚待维护者 review。 [链接](https://github.com/HKUDS/nanobot/pull/5231)

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-08-07

## 今日速览

项目活跃度**高**：过去 24 小时内有 35 条 Issue 更新（24 条活跃、11 条关闭）和 50 条 PR 更新（43 条待合并、7 条已合并/关闭），无新版本发布。核心焦点集中在 **SOP 子系统**（多条新提交的高危 bug）以及**安全修复的收尾验证**（管线越权漏洞、兼容 Provider 标签剥离等均有对应 fix 落地）。值得注意的是，`risk:high` 的待合并 PR 数量较多（约 18 条），其中多条是安全修复，建议维护者优先安排 review 和合并。

---

## 项目进展

今日有 **7 条 PR 被合并/关闭**，其中几条意义重大：

| PR | 关联 Issue | 说明 |
|---|---|---|
| [#9737](https://github.com/zeroclaw-labs/zeroclaw/pull/9737) fix(tools): enforce agent policy in pipelines | [#7947](https://github.com/zeroclaw-labs/zeroclaw/issues/7947)（S0 安全漏洞） | 🔐 修复了 `execute_pipeline` 绕过 per-agent 工具门控的 confused deputy 漏洞——这是被标记为 S0（数据丢失/安全风险）级别的严重问题，现已合入。 |
| [#8963](https://github.com/zeroclaw-labs/zeroclaw/pull/8963) fix(channels): cap Telegram bot commands | [#8950](https://github.com/zeroclaw-labs/zeroclaw/issues/8950) | 修复 Telegram 频道因工具+技能+内置命令超过 100 条导致 `setMyCommands` 被拒绝的问题。 |
| [#8927](https://github.com/zeroclaw-labs/zeroclaw/pull/8927) fix(providers): remove unconditional strip_think_tags | [#8615](https://github.com/zeroclaw-labs/zeroclaw/issues/8615) | 修复兼容 Provider 无条件剥离 `<think>` 标签导致内容被静默删除的问题（影响 MiniMax 等推理模型的输出完整性）。 |
| [#8943](https://github.com/zeroclaw-labs/zeroclaw/pull/8943) fix(providers): exclude Nova 2 from Bedrock prompt caching | [#8720](https://github.com/zeroclaw-labs/zeroclaw/issues/8720) | 修复 Bedrock Nova 2 Lite 模型因 `cachePoint` 报错导致随机失败的问题。 |

以上修复确认了 v0.8.x 系列中几个已知痛点正在有序收敛。

---

## 社区热点

### 1. RFC #6808 — Work Lanes / Board Automation / Label Cleanup（19 条评论）
**链接**: [Issue #6808](https://github.com/zeroclaw-labs/zeroclaw/issues/6808)

> 这是讨论最活跃的 Issue：一份关于工作流路由、看板自动化和标签清理的大型治理 RFC。自 5 月 20 日创建以来持续更新（修订 24 次），当前状态为"推迟批准、逐步推进"。社区参与度高，表明用户对项目治理和流程效率有强烈关注。

### 2. RFC #8692 — Maintainer decision queue for RFCs and design issues（11 条评论）
**链接**: [Issue #8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)

> 维护者需要处理的 RFC 和设计决策积压已经多到需要一个专门的 tracker 来管理——这本身就是一个信号：**项目的决策流程已成为瓶颈**。与 #6808 和 #9496（简化 RFC 流程的提案）互相印证。

### 3. RFC #9106 — A2A outbound client (A2ATool)（11 条评论）
**链接**: [Issue #9106](https://github.com/zeroclaw-labs/zeroclaw/issues/9106)

> 代理间主动协作能力的需求呼声很高。该提案让 ZeroClaw agent 能够主动调用外部 A2A 兼容 agent，而非只能被动接收，是实现多代理协作的关键一步。


## Bug 与稳定性

按严重程度排列：

### 高危（优先级 P1、风险高）

| Issue | 描述 | 状态 |
|---|---|---|
| [#9786](https://github.com/zeroclaw-labs/zeroclaw/issues/9786) | **SOP.toml 格式错误被静默丢弃**——`sop list` 不显示、`sop validate` 仍报告成功，与"SOP 不存在"无法区分 | 无 fix PR，今日提交 |
| [#9779](https://github.com/zeroclaw-labs/zeroclaw/issues/9779) | **`sops_dir` 文档化默认值未被守护进程采用**——依赖默认配置的用户 SOP 全部静默不加载，无错误无日志 | 无 fix PR，今日提交 |
| [#9799](https://github.com/zeroclaw-labs/zeroclaw/issues/9799) | 长时间运行的临时守护进程 CPU 占用 140-177%，lsof 显示大量重复数据库句柄 | 无 fix PR，今日提交 |
| [#9780](https://github.com/zeroclaw-labs/zeroclaw/issues/9780) | **cron 触发的 SOP 无法做网络工作**——能力集无 HTTP 成员，shell.exec/notify.channel 是不可满足的占位符 | 无 fix PR，今日提交 |
| [#9798](https://github.com/zeroclaw-labs/zeroclaw/pull/9798) | 文档缺失：SOP 步骤由哪个 agent 执行不明确，导致步骤"完成"为散文式拒绝 | 有 docs PR（#9798，今日提交，待合并） |

### 中危（优先级 P2）

| Issue | 描述 | 状态 |
|---|---|---|
| [#9783](https://github.com/zeroclaw-labs/zeroclaw/issues/9783) | SOP 失败原因被静默丢弃——`finish_run` 接受 reason 参数但不使用 | 无 fix PR |
| [#9784](https://github.com/zeroclaw-labs/zeroclaw/issues/9784) | 多步 SOP 运行中途被标记失败但无审计事件 | 无 fix PR |
| [#9770](https://github.com/zeroclaw-labs/zeroclaw/issues/9770) | `cron update` 静默丢弃对 declarative 任务的六列修改 | 无 fix PR |
| [#9771](https://github.com/zeroclaw-labs/zeroclaw/issues/9771) | 默认特性表面下 `zeroclaw-gateway` 无法通过 `clippy -D warnings`（4 个测试辅助函数特性门控不匹配） | 无 fix PR |

### 今日新增

- [#9800](https://github.com/zeroclaw-labs/zeroclaw/issues/9800) bug(zerocode): SIGTERM 后终端残留 raw 和 mouse-tracking 模式；[#9799](https://github.com/zeroclaw-labs/zeroclaw/issues/9799) 守护进程 CPU 飚高。

**已有关闭的 Bug（确认修复）**：
- [#7947](https://github.com/zeroclaw-labs/zeroclaw/issues/7947) 管线越权（S0）→ 已通过 PR #9737 修复
- [#9672](https://github.com/zeroclaw-labs/zeroclaw/issues/9672) CLI cron 文档示例全部报错 → 已关闭


## 功能请求与路线图信号

以下 RFC/功能请求最值得关注，预示 v0.9.0 可能的方向：

| 提案 | 说明 | 状态 |
|---|---|---|
| [RFC #7100](https://github.com/zeroclaw-labs/zeroclaw/issues/7100) | **Per-model 能力与上下文窗口配置**（vision、context_window）——用户需要细化模型能力声明，而不是依赖 provider 家族默认值 | 待维护者 review |
| [RFC #9397](https://github.com/zeroclaw-labs/zeroclaw/issues/9397) | **WhatsApp 空 `allowed_groups` 应默认拒绝所有**——当前默认放行所有群聊，安全风险高 | 待维护者 review |
| [RFC #9246](https://github.com/zeroclaw-labs/zeroclaw/issues/9246) | ZeroCode 所有权迁移时保留 Todo tracker 配置 | 进行中 |
| [PR #9772](https://github.com/zeroclaw-labs/zeroclaw/pull/9772) | **Telegram 群聊启用 per-user session**——多人协作同一群聊时各用户的会话隔离（当前硬编码为 Sender 作用域） | 待合并 |
| [PR #9701](https://github.com/zeroclaw-labs/zeroclaw/pull/9701) | WebSocket keepalive ping 机制，防止 Web UI 聊天连接被中间层断开 | 待合并 |
| [PR #9420](https://github.com/zeroclaw-labs/zeroclaw/pull/9420) | Anthropic OAuth profile 支持 | 待 author action（XL，需要仔细 review） |

以上多为**增强性的能力补充**而非破坏性变更，预计都可在 v0.9.0 之前合入。


## 用户反馈摘要

- **SOP 子系统是当前最大痛点**：多个用户（Pratiikpy、JordanTheJet、AngryPacifist）在两天内集中提交了 SOP 相关的 bug——配置目录静默失效、格式错误无法察觉、cron 触发的 SOP 无法做实际工作、失败原因无法记录。**SOP 功能的可靠性已经落后于文档宣传的能力**，应在 v0.9.0 中作为重点修复对象。
- **决策流程拖慢功能落地**：Audacity88 在 #9496 中直接指出"RFC 流程比它要支持的决策更慢更笨重"，七天的讨论期和一致同意要求对多数架构/安全决策来说过于沉重。
- **配置安全问题引起重视**：#9397（WhatsApp 空列表默认放行所有群）暴露了"默认宽松"的安全隐患。
- **PR #9544 的贡献者 vrurg 同时提交了 delegate fallback 与 Anthropic OAuth 两条 XL 级别的 PR**——该贡献者可能是重度 Flows 用户，有实际业务需求推动。

整体而言，用户对稳定性（SOP 和 cron）的要求高于新增功能，安全问题（默认权限收紧、凭据链验证）也持续受到关注。


## 待处理积压

| 项目 | 类型 | 时长 | 备注 |
|---|---|---|---|
| [#8496](https://github.com/zeroclaw-labs/zeroclaw/pull/8496) fix(tools/mcp): 集中 deferred-MCP 访问策略 | PR | 40 天 | 待 author action，MCP 策略相关，建议尽快推动 |
| [#8955](https://github.com/zeroclaw-labs/zeroclaw/pull/8955) fix(telegram): 批量媒体组附件 | PR | 28 天 | 待 author action，XL 级别 |
| [#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535) feat(runtime): 上下文压缩锚定模型窗口比例 | PR | 9 天 | 需要 author action，XL 级别，核心功能增强 |
| [#9420](https://github.com/zeroclaw-labs/zeroclaw/pull/9420) feat(anthropic): 支持存储的 OAuth profiles | PR | 12 天 | 待 author action，XL 级别 |
| [#9221](https://github.com/zeroclaw-labs/zeroclaw/pull/9221) feat(eval): baseline 文件+回归门控+能力追踪 | PR | 17 天 | 待 author action，XL 级别 |
| [#9403](https://github.com/zeroclaw-labs/zeroclaw/pull/9403) fix(plugins): WASM 导出绑定 wall-clock deadline | PR | 10 天 | 高危安全修复，长时间未合入需关注 |
| [#9544](https://github.com/zeroclaw-labs/zeroclaw/pull/9544) fix(delegate): 遵守配置的 provider fallback | PR | 9 天 | 待 author action，XL 级别，core 功能 |
| [#1](https://github.com/zeroclaw-labs/zeroclaw/issues/1) XOR 密码无法提供真正加密 | Issue | 175 天 | 自 2 月提交以来一直未闭，维护者需给出结论（已标记 needs-author-action） |
| [#9328](https://github.com/zeroclaw-labs/zeroclaw/issues/9328) verifiable-intent 约束评估不验证凭据链 | Issue | 14 天 | 已接受但仍无 fix PR，安全相关，建议尽快排期 |

**维护者行动建议**：
1. 优先 review 安全类 PR（#9737 已合入，关注 #9403、#9776 和 #9544 等高危项）
2. SOP 相关的 6 个 bug 影响了核心承诺的功能（watch-loop），建议集中在 v0.9.0 修复
3. 关注 "needs-author-action" 标记的陈旧 PR——若贡献者长时间未回应，考虑代提交或关闭

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

## PicoClaw 项目动态日报（2026-08-07）

### 1. 今日速览

PicoClaw 项目过去 24 小时整体活跃度**中等偏低**：无新增或关闭 Issues，PR 活动 2 条，无新版本发布。其中一条 PR（#1349，QQ 频道多附件类型支持）已于昨日正式关闭，标志着该项目在 QQ 频道消息解析与回复能力上完成了实质性增强；另一条 PR（#3200，模型可配置默认回退链）仍处于开放状态，已持续 37 天未合并，是当前最值得关注的待处理合并项。社区讨论热度不高，但功能开发的节奏仍在平稳推进。

---

### 2. 版本发布

**无**（过去 24 小时无新版本发布）

---

### 3. 项目进展

**PR #1349（已关闭/合并）**：`feat(qq): support parsing and replying to more attachment types`

- 贡献者：aishannon
- 链接：https://github.com/sipeed/picoclaw/pull/1349
- 更新日期：2026-08-06（关闭）

**进展摘要**：该 PR 为 QQ 频道通道补齐了以下能力：

- 支持解析 QQ 频道的 **emoji 结构**；
- 支持接收**语音、图片、视频、文件**等入站消息；
- 支持回复时先上传本地**语音、图片、视频、文件**附件再发送；
- 优先使用 **Markdown 消息**进行回复，失败时自动降级到普通消息。

**项目意义**：该功能补齐了 QQ 频道通道在富媒体消息处理上的长期短板（此前仅支持纯文本解析），大幅扩展了 PicoClaw 在 IM 多模态交互场景下的适用性。项目在多通道能力矩阵上因此又迈进一步。

---

### 4. 社区热点

今日无高互动讨论（无评论、无高赞反馈）。当前社区关注度主要集中在新提出的功能 PR #3200 上，但尚未形成大规模讨论。建议关注 PR #3200 的后续评论走向，它是目前开放 PR 中改动范围最大且最贴近用户日常配置体验的一项。

---

### 5. Bug 与稳定性

**无**（过去 24 小时无 Bug、崩溃或回归问题报告）

---

### 6. 功能请求与路线图信号

**PR #3200**：`feat(models): add configurable default fallback chain`

- 作者：lc6464
- 链接：https://github.com/sipeed/picoclaw/pull/3200
- 创建：2026-07-01，最后更新：2026-08-06
- 状态：**开放**

**核心功能**：在 Web UI 上新增**可配置的默认模型回退链**工作流：用户可设置默认模型、追加回退模型、调整回退顺序，并将完整配置通过后端 API 持久化保存。

**路线图信号**：

- 这是对模型容错与可用性体验的直接增强，符合当前 LLM 应用「多模型冗余」的普遍诉求。
- 用户诉求明确：当主模型不可用时，自动按配置链回退，减少人工干预。
- 此 PR 若被合并，将直接提升生产环境下的稳定性，建议维护者优先评估。

**与其他 PR 的关联判断**：PR #1349 刚合并的 QQ 多附件功能属于「通道层」增强，而 #3200 属「模型层」增强，两者互不冲突，可在下一小版本中一并纳入。

---

### 7. 用户反馈摘要

过去 24 小时无新评论产生，暂无新的用户反馈可提炼。基于存量 PR（#1349）的实现内容，可观察到用户对**QQ 频道富媒体消息支持**的需求已积累多时（该 PR 从创建到合并历时约 5 个月），侧面反映用户对 IM 多模态交互的真实诉求较强。

---

### 8. 待处理积压

**PR #3200（开放）**：可配置默认回退链

- 作者：lc6464
- 链接：https://github.com/sipeed/picoclaw/pull/3200
- 创建：2026-07-01，更新：2026-08-06
- 状态：**已开放 37 天，无关闭迹象，无维护者干预记录**
- 行动建议：请求维护者尽快给出反馈（确认/请求修改/合并），避免长时间悬挂导致 PR 失活。

---

*报告生成时间：2026-08-07 | 数据源：sipeed/picoclaw GitHub 仓库*

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

### NanoClaw 项目动态日报 — 2026-08-07

---

#### 1. 今日速览

项目在过去24小时内保持中等活跃度。共产生 2 条 Issue 更新（1 开 1 关）、14 条 PR 更新（6 待合并、8 已合并/关闭）。今日无新版本发布，但社区贡献者（glifocat）连续提交了多个高质量的核心团队级 PR，覆盖更新机制事务化、清理废弃技能等关键稳定性议题。值得注意的是，由同一作者提出的 #3194 新 Bug 与 #3195 修复 PR 形成了高度对称的“问题-修复”闭环，反映出项目在自我驱动修复方面效率较高。此外，多件跨周/跨月的 PR（5月至7月创建）于近日集中合并，说明积压清理正在加速。

---

#### 2. 版本发布

过去24小时内无新版本发布（最新 Release 为空）。

---

#### 3. 项目进展

今日共有 8 个 PR 被合并/关闭，其中包含多项实质性的功能修复与重构，整体推进了调度系统、消息路由、频道适配与技能体系四个方向：

- **调度系统可靠性提升**（`yairixStudio`）：合并了 #2678（永久失败任务重新触发下一次循环）、#2679（将永久失败任务作为通知推送给用户）、#2643（修复路由器的关键词匹配在直接消息/回复机器人场景下失效的问题）。三项合并共同补齐了调度任务从失败到用户可见的完整链路。
- **频道兼容性增强**：合并了 #2213（修复 Telegram 等平台无文字纯媒体消息被静默丢弃的问题）与 #2644（修复 Telegram 回复机器人自身消息时 `isReplyToBot` 标记缺失的问题）。这两项修复对实际多模态交互场景影响显著。
- **技能体系清理**：`glifocat` 合并了 #3172（移除失效的 qodo 与 Google MCP 技能，直接回应 Issue #3171）与 #2873（拆分技能预检与凭据流程，使 `/update-skills` 可独立刷新代码）。
- **用户身份标识修正**：合并了 #2591（修复不同频道用户 ID 冲突的命名空间问题）。

这些合并表明项目在“修复存量问题”与“清理技术债”双线并进，且多由外部贡献者驱动（glifocat 与 yairixStudio 均非核心团队成员）。

---

#### 4. 社区热点

- **[PR #3195] fix(update): make NanoClaw upgrades transactional**（作者: glifocat | 6 Aug | 核心团队标签）
  当前讨论热度最高的 PR。该 PR 直接修复今日新开的 Bug #3194（`/update-nanoclaw` 在未验证通过时即可标记成功，存在数据库/配置/外部组件四个失败窗口）。社区关注点集中在更新流程的事务化设计（引入回滚点保护 SQLite 与 gitignored 配置），这关系到所有自托管用户的升级安全。

- **[Issue #3194] [bug] `/update-nanoclaw` can stamp success without a recoverable cutover**（作者: glifocat | 6 Aug）
  与上述 PR 形成对应关系，社区反映出对“自更新机制可信度”的深层不信任。用户已提供四个明确失败窗口的精确描述（当前 main 分支哈希已附带），便于维护者复现。

- **[Issue #3171] [CLOSED] The two qodo skills depend on an integration nothing sets up and intercept normal coding requests**（作者: glifocat）
  该 Issue 关闭由 PR #3172 直接触发，体现了项目“报告即修复”的高效联动。社区对该问题反响集中，核心诉求是“预装技能不应劫持正常编码请求”的功能安全底线。

---

#### 5. Bug 与稳定性

按严重程度排列（今日无崩溃级回归）：

| 严重度 | Issue/PR | 描述 | 状态 |
|--------|----------|------|------|
| 高 | [#3194](https://github.com/nanocoai/nanoclaw/issues/3194) | `/update-nanoclaw` 在更新未通过验证时即标记成功，失败窗口覆盖 SQLite 数据库、gitignored 配置及外部组件，可能导致更新后系统不可恢复 | 已开 Issue，**已有修复 PR #3195** |
| 中 | [#3193](https://github.com/nanocoai/nanoclaw/pull/3193)（OPEN） | Telegram 富消息（rich messages）支持缺失，待更新 Chat SDK | 修复中，PR #3193 待合并 |
| 低 | [#2705](https://github.com/nanocoai/nanoclaw/pull/2705)（OPEN） | `use-native-credential-proxy` 技能在真实 launchd/systemd 环境静默回退到 OneCLI 网关，`nativeCredentialsEnabled()` 仅读取 `process.env` 导致绕过失败 | 修复中，PR #2705 已开放 2 个月 |

其他稳定性进展：今日无新报告的回归或崩溃，且 #3171（废弃技能干扰）已关闭。

---

#### 6. 功能请求与路线图信号

- **新增信号：Tavily MCP 工具技能**（PR #3190，作者 manisrinivasan2k1）。社区对集成外部搜索/工具型 MCP 技能持续有需求，该 PR 仍待合并。结合 #3172 清理失效技能的节奏，下一版本技能体系大概率会做“增新汰旧”。

- **更新机制事务化**（PR #3195）并非新功能，但因其属于自更新关键路径，此改动极可能被要求纳入下一个补丁版本（而非等待大版本）。维护者 `core-team` 标签已标注，优先级明确。

- **宿主层能力抽象**（PR #3186，refactor: add host seams for skill-owned capabilities）虽已开放，但尚无明确合并节点，可视为技能沙箱/权限隔离方向的早期铺垫信号。

---

#### 7. 用户反馈摘要

- **对预装技能的抱怨**：Issue #3171 指出 qodo 技能在未配置任何集成的情况下，仍会拦截正常编码请求并试图读取不存在的配置文件。用户反馈集中为“预装技能不应主动劫持未启用的工作流”，此类问题可能导致新用户首次体验的困惑。该问题已通过删除技能解决。
- **对更新安全性的担忧**：Issue #3194 的作者明确表达了“更新应保证可回滚切换”（recoverable cutover）的诉求，并将失败点细化到数据库与 gitignored 配置，显示用户对升级失败导致数据丢失的高度警惕。
- **对纯媒体消息的处理期待**：PR #2213（已合并）解决了无文字图片/视频被静默丢弃的问题，用户场景覆盖 Telegram 等主流渠道，该修复将直接提升多模态助理的可用性。

---

#### 8. 待处理积压

以下条目自创建之日起超过一周仍未关闭或取得实质性进展，建议维护者关注：

- **[PR #2705] fix(use-native-credential-proxy)**（创建 2026-06-07，开放 2 个月）：修复真实系统服务环境中凭据代理网关绕过失败的问题，涉及部署形态，长期无维护者介入迹象，需确认是否被搁置或等待作者更新。
- **[PR #3186] refactor: add host seams for skill-owned capabilities**（创建 2026-08-04，已开放 3 天）：涉及技能与宿主能力解耦，属架构级重构，当前无 `core-team` 标签，可能因优先级不足而停留在待审状态。
- **[PR #3149] fix(cli): add --rw flag to groups config add-mount**（创建 2026-07-29，本周有更新但仍在开放队列）：CLI 配置命令的功能补全，开放已超一周，等待审核。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-08-07

## 今日速览

项目处于高活跃度状态，过去 24 小时有 50 条 Issue 和 50 条 PR 更新，并发布了 `v1.1.0` 稳定版。当前开发重心集中在 **Inspector 运营诊断面板**（多个核心贡献者提交的 3 个 XL 级 PR）以及 **长期存在的 Slack/Routine 可靠性问题**上。值得关注的是，大量 P1/P2 级 QA bug（涉及 Slack 断开失败、权限通知消失、routine 运行失败）讨论了近一个月仍未解决，已成为社区主要痛点。同时，依赖安全更新和文档发布边界治理也有推进，显示项目在质量与安全基建上的持续投入。

## 版本发布

### ironclaw-v1.1.0 (2026-08-06)

自 1.0.0 以来的首个稳定版，将 `1.1.0-rc.1` 晋升为正式版，核心亮点：

- **扩展生态覆盖**：支持注册任意托管的 MCP 服务器
- **IronHub 集成**：支持通过 deep link 安装
- **跨渠道文件附件**：持久化的文件附件可跨对话渠道传输
- **Slack 相关改进**（release notes 中被截断，但从 PR #7300 看，包含个人 DM 投递恢复）

**迁移注意**：无明确破坏性变更标记，但建议关注 PR #7300 中 Slack 投递目标校验逻辑的调整。

## 项目进展

### 已合并（今日关闭）

| PR | 内容 | 影响 |
|---|---|---|
| [#7235](https://github.com/nearai/ironclaw/pull/7235) | **Inspector 运营诊断 API 和实时更新流**（XL, core） | 为后续 Inspector 功能奠定了服务端基础，与 #7220 对应 |
| [#7259](https://github.com/nearai/ironclaw/pull/7259) | **修复文档发布边界泄漏**——`docs/design/` 和 `docs/research/` 此前被公开到 Mintlify 站点（XL, core） | 消除了公开站点上的内部文档泄漏，并添加了 CI 门禁防止回退 |
| [#7303](https://github.com/nearai/ironclaw/pull/7303) | **修复 Docker 镜像缺少 curl** 导致编排器健康检查失败（M, core） | 解决 1.1.0 节点在托管环境显示 `error` 状态的问题 |
| [#7289](https://github.com/nearai/ironclaw/pull/7289) | **修复 libSQL 上 FTS 查询的自然语言召回**（XL, core, 关闭 #7275） | 修复了跨对话持久记忆的生产路径缺陷 |

### 待合并的重要进展

- **Inspector 诊断面板系列**：#7236（调试面板 shell）、#7239（prompt 检查 + Prompt 标签页）、#7277（模型调用统计），均为核心贡献者投入，可能在下个版本合入。
- **Nostr WASM 主机函数**（#7184）：新增 `nostr-sign-event` 等 3 个函数，为 WASM 工具沙箱引入 Nostr 能力。

## 社区热点

| 话题 | 热度 | 说明 |
|---|---|---|
| [Approval 通知丢失 #5553](https://github.com/nearai/ironclaw/issues/5553) | 4 评论，已开 36 天 | 自动化需用户审批时，通知不可靠地出现在通知面板中，影响核心流程。 |
| [GitHub 集成 403 #5702](https://github.com/nearai/ironclaw/issues/5702) | 4 评论，已开 32 天 | GitHub issue 搜索/创建总是返回 403，集成配置了但不可用。 |
| [Routine 创建挂起 #5504](https://github.com/nearai/ironclaw/issues/5504) | 2 评论，已关闭 | 创建 routine 时聊天只显示计划消息，永不返回结果或错误。 |
| [Slack 断开被拒 #5834](https://github.com/nearai/ironclaw/issues/5834) | 3 评论，已开 30 天 | 让 agent 断开 Slack 时，agent 错误地声称无法执行，集成无法通过 agent 解除。 |

**分析**：热度集中在 **核心工作流的可靠性**（审批通知、GitHub 集成、Slack 生命周期管理）。这些是日常高频操作，长时间未解决显著影响用户信任。

## Bug 与稳定性

### P1 级

| Issue | 描述 | 修复状态 |
|---|---|---|
| [#5504](https://github.com/nearai/ironclaw/issues/5504) | Routine 创建挂起，无返回无超时 | 今日关闭，但未关联修复 PR。需确认是否已修复 |
| [#5877](https://github.com/nearai/ironclaw/issues/5877) | Slack 通知发错用户（潜在数据泄漏） | 今日关闭，未关联 PR |
| [#5456](https://github.com/nearai/ironclaw/issues/5456) | Routine 运行因 runner 租约过期而失败，90 秒不活动阈值过于激进 | 仍开放，无明确修复计划 |

### P2 级（高发区域）

| 区域 | 典型 Issue | 备注 |
|---|---|---|
| Slack 集成 | [#5834](https://github.com/nearai/ironclaw/issues/5834)（断开被拒）、[#5508](https://github.com/nearai/ironclaw/issues/5508)（投递目标未找到）、[#5522](https://github.com/nearai/ironclaw/issues/5522)（无法读 DM） | PR #7300 可能部分解决投递问题，值得跟进 |
| UI/UX | [#5701](https://github.com/nearai/ironclaw/issues/5701)（Activity 面板无实时更新）、[#5707](https://github.com/nearai/ironclaw/issues/5707)（创建 routine 返回内部实现细节） | 存在 UI 修复 PR #7305（已关闭活动摘要配色） |
| Routine 运行 | [#5702](https://github.com/nearai/ironclaw/issues/5702)（GitHub 403）、[#5836](https://github.com/nearai/ironclaw/issues/5836)（无线程附加）、[#5552](https://github.com/nearai/ironclaw/issues/5552)（generic invalid result） | 系统性失败模式明显 |

### 已修复

- Docker 健康检查失败（[#7303](https://github.com/nearai/ironclaw/pull/7303)）— 已合并
- libSQL FTS 召回问题（[#7289](https://github.com/nearai/ironclaw/pull/7289)）— 已合并

## 功能请求与路线图信号

- **WASM 工具的 Nostr 支持**（[#7184](https://github.com/nearai/ironclaw/pull/7184)）— 开源贡献者（`Kampouse`）提交，为 WASM 沙箱引入 nostr-sign-event、nostr-get-public-key 等函数，扩展设备签名场景。
- **显式渠道投递工具**（[#7157](https://github.com/nearai/ironclaw/pull/7157)）：设计为两车道模型（conversation lifecycle + notification channels），一旦合入将显著改善通知与对话分离的问题，与 #5553 等 bug 直接相关。
- **沙箱用户配置**（[#7214](https://github.com/nearai/ironclaw/pull/7214)）：为 Docker 和 Railway 用户提供显式沙箱配置，提升部署灵活性。

## 用户反馈摘要

- **Slack 是最大的痛点**：用户对"无法断开 Slack"、"投递目标识别错误"、"收不到 DM"等问题的反馈反复出现，且 bug 持续时间长（如 #5508 已开 37 天）。
- **Routine 的失败模式重复且隐蔽**：多个报告指向"无线程附加"和 generic "invalid result" 错误，用户反复要求更好的错误信息和失败根因可见性（#5552、#5776）。
- **UI 信息呈现不足**：用户对活动面板不展示工具调用详情（#5701）和创建例行程序时暴露内部细节（#5707）表示不满。
- **积极信号**：用户愿意将 Obsidian/Notion 等知识库接入 MCP 服务器（#4343 中提及），说明功能吸引力强，但被驱动失败阻断。

## 待处理积压

| 项目 | 持续天数 | 状态 | 建议 |
|---|---|---|---|
| [#5456](https://github.com/nearai/ironclaw/issues/5456) runner 租约过期导致 routine 失败（P1） | 38 天 | 开放 | **建议优先处理**，这是 routine 失败的主要模式 |
| [#5508](https://github.com/nearai/ironclaw/issues/5508) Slack 投递目标无法识别（P2） | 37 天 | 开放 | 与 PR #7300 相关，待合并后验证 |
| [#5702](https://github.com/nearai/ironclaw/issues/5702) GitHub 集成 403（P2） | 32 天 | 开放 | 集成不可用，影响核心工作流 |
| [#5522](https://github.com/nearai/ironclaw/issues/5522) Slack DM 读取缺失（P2） | 36 天 | 开放 | 应评估是否可通过现有 Slack 能力组合解决 |
| [#7235](https://github.com/nearai/ironclaw/issues/7235) 系列 Inspector PR 待合并 | 2 天 | 开放 | 关注是否有阻塞问题 |

---

*数据来源：[github.com/nearai/ironclaw](https://github.com/nearai/ironclaw)，统计时间窗口：2026-08-06 至 2026-08-07。*

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-08-07

## 今日速览

过去 24 小时项目活跃度中等偏低：新增/活跃 Issues 5 条、PR 2 条，均为待处理状态，无新版本发布，无合并代码。值得关注的是，今日新增的 2 条 Issue（#2442、#2443）均为用户实际使用中遇到的实质性功能缺陷，而非单纯提问；另有一条高质量功能请求（#2444）。但项目存在明显隐忧：当前 7 条活跃条目中竟有 5 条处于 stale 状态（含 2 条 PR、3 条 Issue），其中 #1196、#1197、#1198、#1199 均自 4 月起已滞留逾 4 个月，维护响应滞后问题值得警惕。

## 项目进展

今日无 PR 被合并或关闭，代码库无实际变更。两条待合并 PR 均已标记 stale，长期未获处理：

- **#1197 Agent 管理页面交互优化**（待合并，4 个月未推进）：优化 Agent 删除操作路径、侧边栏交互设计。与主分支已存在冲突，合并成本随时间递增。
- **#1199 模型级 context window 与 token 设置**（待合并，4 个月未推进）：为每个模型独立配置 `contextWindow` 和 `maxTokens`，并同步至 Cowork/OpenClaw 配置。

两项 PR 均为实质性功能增强，长期搁置意味着这些改进用户无法及时获得。

## 社区热点

今日讨论热度整体偏低，无高热度议题。

**Issue #2444「输入框编辑模式」**（创建于今日）是当前最受关注的新需求。用户痛点明确：撰写长 Prompt 时需频繁 `Shift+Enter` 换行，一旦忘记按键组合，编辑中的消息会直接被发送。作者给出两套方案 —— 全局切换 Enter/Ctrl+Enter、或增加可展开的「编辑模式」开关。该需求直击日常高频体验，若维护者能及时回应并纳入路线图，将显著改善核心编辑体验。

## Bug 与稳定性

今日共 2 条 Bug 报告，严重程度均为中低，均无对应 fix PR：

| 严重度 | Issue | 问题描述 | 影响范围 | Fix PR |
|--------|-------|----------|----------|--------|
| 中 | [#2443](https://github.com/netease-youdao/LobsterAI/issues/2443) | 模型 ID 含斜杠（如 SiliconFlow 的 `deepseek-ai/DeepSeek-V4-Flash`）的自定义 Provider 在界面中无法选择，API 可调用但 UI 选择器失效（LobsterAI 2026.8.5.0） | 所有模型 ID 带斜杠的 OpenAI 兼容服务商 | 无 |
| 低 | [#2442](https://github.com/netease-youdao/LobsterAI/issues/2442) | exec 功能默认调用 PowerShell 5.1 而非用户安装的 PS 7.4，源于 Node.js 在 Windows 上默认使用 `powershell.exe` | 依赖 PS 7.x 特性的脚本用户 | 无 |

另有两项遗留 Bug 仍处 stale 状态、长期未解决：#1196（工作目录强制建立 6 个系统文件，无法移除，且重复重建）、#1198（网关重启进度条消失、状态不可感知，期间对话均显示模型不可用）。两项已悬置 4 个月，严重影响日常使用体验。

## 功能请求与路线图信号

今日新增一项功能需求，结合既有的待合并 PR，可以从以下信号判断项目下一版本的潜在方向：

- **信号强（有对应 PR 待合并）**：模型级 token 与上下文窗口配置（#1199）。此需求直接对接用户对精细控制模型参数的诉求，落地可能性较高。
- **信号中（仅有 Issue，无代码实现）**：输入框编辑模式（#2444）。需求描述具体、方案设计完整，但缺少维护者的明确回应，是否纳入下一版本仍不确定。
- **信号弱（Issue 长期 stale）**：全局 systemPrompt 或公共 agents.md 支持（#1196）。已滞留 4 个月，是否仍在路线图内存疑。

## 用户反馈摘要

- **工作目录文件污染（#1196）**：用户对每次切换工作目录强制生成 AGENTS.md、USER.md 等 6 个文件表示强烈不满，认为「太乱了」「删了还要重建」。建议参考 Claude Code 建立公共 agents.md 或改放隐藏目录。该问题持续 4 个月未获改进，需重点关注。
- **重启状态不透明（#1198）**：网关重启至一半时进度条消失，用户无法感知重启状态，后续所有对话均报「模型不可用」，造成操作困惑。
- **长文本编辑体验（#2444）**：用户因忘记 `Shift+Enter` 导致消息误发送，表明当前编辑方式在长 Prompt 场景下存在实际效率与误操作问题。
- **界面选择器对特殊模型 ID 不友好（#2443）**：SiliconFlow 用户配置模型后可调用但无法在界面选择，需切换至其他模型再切回才能使用，交互绕行明显。

## 待处理积压

以下为长期未得到响应或处理的重要条目，建议维护团队优先关注：

| 类型 | 编号 | 标题 | 等待时长 | 优先级建议 |
|------|------|------|----------|------------|
| Issue | [#1196](https://github.com/netease-youdao/LobsterAI/issues/1196) | 不要强制在工作目录中建立 Agents.md、User.md 等 6 个文件 | 4 个月+ | 高（持续影响日常使用） |
| Issue | [#1198](https://github.com/netease-youdao/LobsterAI/issues/1198) | 网关重启进度条消失，重启状态不可感知 | 4 个月+ | 中 |
| PR | [#1197](https://github.com/netease-youdao/LobsterAI/pull/1197) | Agent 管理页面交互优化 | 4 个月+ | 中（已与主分支产生冲突） |
| PR | [#1199](https://github.com/netease-youdao/LobsterAI/pull/1199) | 模型级 context window 与 token 设置 | 4 个月+ | 中 |

长期搁置的 Issue 与 PR 不断堆积，其中部分已产生合并冲突。若不及时处理，维护成本将持续上升。

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

# CoPaw 项目动态日报 — 2026-08-07

## 今日速览

CoPaw 今日活跃度极高，近 24 小时共更新 33 条 Issue（17 条关闭）与 50 条 PR（29 条合并/关闭），无新版本发布。项目正处于 2.1.0 迭代周期中，核心工作集中在上下文/记忆对齐 AgentScope 生命周期、MCP 工具链稳定性、以及多通道（Matrix/OneBot/WeChat）的体验修复。社区反馈集中于长会话下的可靠性问题（空响应、上下文超限、工具超时），以及桌面端的 UI/安全疑虑。整体而言，项目修复速度较快但新引入的 2.1.0 beta 版本也带来了一定数量的回归问题。

## 项目进展

今日合并/关闭的 PR 展示了项目在多条关键线路上的推进：

- **[fix(providers): return typed tagged tool calls](#6605)**（已合并）：修复从 thinking/text 标签中提取的工具调用，统一转为 AgentScope 2 `ToolCallBlock`，覆盖流式与多工具调用场景，是长会话工具链路的重要补强。
- **[fix(config): harden agent config persistence on shared filesystems](#6744 / #6767)**（已合并 + 新 PR 跟进）：针对 OSSFS/FUSE 等共享文件系统上 agent.json 与 ACL 文件持久化损坏问题，替换为原子写入并加固缓存键，对容器化/分布式部署用户有直接意义。
- **[fix(harnesses): degrade gracefully without Codex CLI](#6664)**（已合并）：降低外部依赖，在无 Codex CLI 环境下优雅降级。
- **[refactor(context): align Scroll and memory with AgentScope lifecycle](#6611)**（已关闭）：将 Scroll 收敛为唯一上下文协议，推进了原生/Scroll 双分支的历史清理工作，为后续维护性提升铺设基础。
- **[feat(memory): improve ReMe configuration and embedding lifecycle](#6741 / #6772)**（已关闭 + 新 PR 跟进）：为 ReMe 记忆系统补齐配置验证、真实连通性测试与多厂商 Embedding 支持，因 fork 删除后重新提交。

**值得关注的新增 PR** 方面：#6774 修复 goal/mission 门控逻辑读取了错误的 `workspace.agent_config` 字段，属 2.1.0 引入的回归；#6766 修复桌面版验证脚本未适配新的 Lexical 编辑器；#6769 和 #6715 为 OneBot 通道补充引用消息展开与远程媒体处理能力。

## 社区热点

以下议题获得最多评论，反应了用户当前最集中的痛点：

1. **[#6684: 增加频道的重试功能（已关闭）](https://github.com/agentscope-ai/QwenPaw/issues/6684)** — 8 条评论。用户使用自建 Matrix 时因 QwenPaw 服务启动快于 Matrix 导致频道连接失败，且无自动重试/健康检查机制，每次重启后需手动重新保存频道。该需求从"连接不上"升级为"缺少自愈能力"的框架层诉求。
2. **[#6588: `spawn_subagent` 将空 `batch` 占位符误判为批量模式（已关闭）](https://github.com/agentscope-ai/QwenPaw/issues/6588)** — 6 条评论。部分模型/提供方路径在单任务调用时返回空的 `batch` 占位符，QwenPaw 将任何非 `None` 值视为批量模式，导致语义错误。属协议兼容性边界问题。
3. **[#6601: QwenPaw 不报空响应错误（开启中）](https://github.com/agentscope-ai/QwenPaw/issues/6601)** — 5 条评论。长会话中模型空响应但框架不报错，用户认为这是框架层问题，影响实际使用。
4. **[#6667: DeepSeek thinking 模式多轮对话失败（已关闭）](https://github.com/agentscope-ai/QwenPaw/issues/6667)** — 5 条评论。`reasoning_content` 在多轮后缺失，仅首次失败时通过 `retry_chat_model.py` 注入空格占位符，后续轮次失效。
5. **[#6732: MCP 工具规律性失效（开启中）](https://github.com/agentscope-ai/QwenPaw/issues/6732)** — 3 条评论。用户报告 MCP 工具每隔数小时失效，需重启 Docker 容器恢复，属稳定性问题。

## Bug 与稳定性

按严重程度排序：

**严重（会话阻断/数据正确性）**

- **[#6755: 跨天会话中模型对当前日期/星期判断错乱](https://github.com/agentscope-ai/QwenPaw/issues/6755)**：Agent 将 8/6 周四误判为周三，导致日程任务被定错日期。直接造成实际业务错误，建议关注系统提示词中日期注入/刷新的实现。
- **[#6601: QwenPaw 不报空响应错误](https://github.com/agentscope-ai/QwenPaw/issues/6601)**（开启中）：框架无法识别空响应，长会话将彻底失去响应且无错误提示。
- **[#6768: Agent 完成任务后进入死循环，会话阻塞数小时](https://github.com/agentscope-ai/QwenPaw/issues/6768)**（开启中，标记 need-info）：复杂多步骤任务完成后 Agent 完全无响应。
- **[#6726: 长会话大量工具调用后 400 错误](https://github.com/agentscope-ai/QwenPaw/issues/6726)**（开启中）：报错 "Messages with role 'tool' must be a response to a preceding message with 'tool_calls'"，与 #6601 同属长会话上下文问题。

**中等（功能异常）**

- **[#6732: MCP 工具规律性失效](https://github.com/agentscope-ai/QwenPaw/issues/6732)**（开启中，无 fix PR）。
- **[#6756: `run_tool_batch` 工具报错 "No toolkit available in current context"](https://github.com/agentscope-ai/QwenPaw/issues/6756)**（开启中）：2.1.0b1 新引入的回归，ContextVar 注入逻辑失效。
- **[#6612: 与 agentscope 2.0.4.post1 不兼容](https://github.com/agentscope-ai/QwenPaw/issues/6612)**（开启中）：主动/记忆演化子系统因 agentscope API 变更而崩溃，并有工具权限死锁问题。已有 PR [#6615](https://github.com/agentscope-ai/QwenPaw/pull/6615) 尝试修复配置加载部分。
- **[#6601 相关] [#6707: thinking 模式与工具调用混用时 400 错误](https://github.com/agentscope-ai/QwenPaw/issues/6707)**（已关闭）：`reasoning_content` 中继失败。

**轻微（体验/边界）**

- **[#6762: 桌面版工具调用块中长命令不换行](https://github.com/agentscope-ai/QwenPaw/issues/6762)**（已关闭）：CodeMirror 缺少 `lineWrapping`。
- **[#6731: `execute_shell_command` 传入 `sandbox_config` 时崩溃](https://github.com/agentscope-ai/QwenPaw/issues/6731)**（已关闭）：dataclass `replace()` 类型错误。
- **[#6700: 超大工具输出导致历史会话加载卡死](https://github.com/agentscope-ai/QwenPaw/issues/6700)**（已关闭）：建议增加输出截断与历史分页。
- **[#6698: 浏览器 SDK `open()` 总是报 Target crashed](https://github.com/agentscope-ai/QwenPaw/issues/6698)**（已关闭）：Playwright 隔离会话问题。
- **[#6760: `qwenpaw task` 命令行升级 2.0.1 后报错](https://github.com/agentscope-ai/QwenPaw/issues/6760)**（已关闭）。

**安全相关**

- **[#6775: MalwareBytes 报 Trojan Loader（开启中）](https://github.com/agentscope-ai/QwenPaw/issues/6775)**：Windows 桌面版被安全软件标记为木马。用户已卸载并等待官方回应，建议维护者立即回应，这属于品牌信任级别的紧急问题，无论是否为误报都需官方声明。

## 功能请求与路线图信号

以下需求具备较高被纳入下一版本的潜力：

- **[MCP 工具调用超时可配置（#6724）](https://github.com/agentscope-ai/QwenPaw/issues/6724)** — `MCPClientConfig` 缺少 `timeout` 字段，悬挂的 MCP server 会无限期阻塞轮次。与 #6732（MCP 工具失效）构成同一关注域，预计近期会纳入。
- **[模型自动故障转移与冷却机制（PR #6659）](https://github.com/agentscope-ai/QwenPaw/pull/6659)** — 已实现主模型失败自动切换及冷却机制，修复 #2199/#1327/#2089，可大幅提升长任务可靠性，仍在 review 中。
- **[MCP 2026-07-28 无状态协议支持（#6761）](https://github.com/agentscope-ai/QwenPaw/issues/6761)** — MCP 核心协议发生破坏性变更，需要确认兼容性计划。
- **[run_tool_batch 修复（#6756）](https://github.com/agentscope-ai/QwenPaw/issues/6756)** — 需 ContextVar 注入逻辑修复。
- **[AG-UI 协议暴露（PR #6337）](https://github.com/agentscope-ai/QwenPaw/pull/6337)** — 暴露 `/protocol/agui/chat` SSE 端点的 PR 已标记 "Under Review"，属外部集成能力的重要增强。
- **[用户 Chrome 标签生命周期可配置（#6770）](https://github.com/agentscope-ai/QwenPaw/issues/6770)** — 跨响应周期保持浏览器标签。
- **[WeChat 审批按钮中文化（#6728）](https://github.com/agentscope-ai/QwenPaw/issues/6728)** — 属体验优化，工作量较小。

## 用户反馈摘要

- **长会话可靠性是最大痛点**：多用户报告长会话下模型空响应不报错（#6601）、上下文超限（#6726）、日期判断错乱（#6755）、死循环（#6768）。其中 #6755 已造成实际日程错误，用户因此产生直接损失。这些反馈共同指向一个系统性问题：QwenPaw 对长会话上下文窗口的管理策略有待系统性改进。
- **MCP 稳定性需加强**：有用户报告 MCP 工具"规律性失效，重启容器才能恢复"（#6732），且工具调用无超时上限（#6724）。对依赖 MCP 工具的重度用户，这已构成业务阻断。建议优先排查 MCP 客户端连接保持机制。
- **Matrix 通道的端到端加密不可用**（#6476）：用户手动安装 `libolm-dev` 和 `vodozemac` 后仍失败，自建 Matrix 用户受影响明显。
- **UI 体验反馈集中**：多名用户认为自动生成的会话标题表意不清、左上角标题视觉干扰大（#6736、#6737）；对"当前模型未检测到多模态能力"的粗暴提示表示不满（#6452）。
- **积极信号**：用户对团队的信任度较高（#6775 用户表示 "I love your work. Thanks for all you do"），对文化包容性有期待（#6765 匈牙利语用户请求增加欧盟语言支持）。
- **安全软件误报需官方澄清**：#6775 用户因 MalwareBytes 报告而卸载，等待官方确认是否有引用自 Alibaba 安全公告页面的说明。

## 待处理积压

**长期未响应的 Issue：**

- **[#6476（7 月 26 日创建）：Matrix 端到端加密不可用](https://github.com/agentscope-ai/QwenPaw/issues/6476)** — 已 12 天，用户完成了详细的排查步骤（apt/uv/pip 三步），但未见官方回复。
- **[#6557（7 月 29 日创建）：MCP 工具名以连字符开头导致 Kimi 返回 400](https://github.com/agentscope-ai/QwenPaw/issues/6557)** — 已关闭但未见明确的代码修复，该问题影响所有使用 Kimi 或其他严格校验 API 的用户。
- **[#6659（7 月 31 日创建，8 月 3 日新提交）：模型 fallback 带冷却机制 PR](https://github.com/agentscope-ai/QwenPaw/pull/6659)** — 已处于 "Under Review" 状态 4 天，该能力对长任务稳定性重要，建议推进合入。
- **[#6337（7 月 22 日创建）：AG-UI 协议端点 PR](https://github.com/agentscope-ai/QwenPaw/pull/6337)** — Review 周期已超两周，若属规划内功能请明确排期，否则建议关闭以避免社区困惑。

**维护者提醒：** #6775（安全软件报毒）和 #6755（日程日期错误）均涉及用户信任与实际业务影响，建议提升优先级尽快响应，尤其是 #6775 需要官方定义"是否为误报"的明确回复，长时间无回应可能造成用户流失。

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