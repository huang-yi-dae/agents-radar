# OpenClaw 生态日报 2026-08-16

> Issues: 500 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-08-16 01:05 UTC

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

### OpenClaw 项目动态日报 — 2026-08-16

---

#### 1. 今日速览

过去 24 小时项目保持高活跃度，共更新 500 条 Issues 和 500 条 PR，其中新开/活跃 Issue 478 条，待合并 PR 444 条。今日发布 v2026.8.1-beta.2，重点引入 Secret 出口主机绑定（Secret egress host binding）以及 GPT-5.6 Ultra 运行时切换支持。尽管提交量大，但合并率偏低（PR 合并/关闭 56 条，约占 11%），大量 PR 处于等待维护者审查或等待作者更新状态。核心讨论集中在消息丢失、会话状态管理、子代理（Subagent）完成通知可靠性以及记忆系统（Memory Core）的稳定性问题，多项 P1 级 Bug 仍未关闭。

---

#### 2. 版本发布

**v2026.8.1-beta.2** ([Release 链接](https://github.com/openclaw/openclaw/releases))

**核心更新：**

- **Secret egress host binding（安全增强）：** 将每个共享存储（shared-store）的 Secret 绑定到精确的 HTTPS 目标主机（覆盖 CLI、Gateway RPC 和 Control UI）。未绑定的哨兵替换（sentinel substitution）将在明文出口前执行失败关闭（fail closed），防止 Secret 泄露。感谢 @shakkernerd 贡献。
- **GPT-5.6 Ultra 与运行时切换（Runtime switching）：** 新增对 GPT-5.6 Ultra 模型的支持，并引入运行时切换能力。

**破坏性变更与迁移注意：** 对于使用了 `secretref` 且未显式指定目标主机的用户，升级后 Secret 解析可能失败（fail closed）。请检查所有 Secret 引用配置，确保已为每个共享存储 Secret 绑定确切的 HTTPS 目的地主机。Beta 版本，建议生产环境谨慎升级。

---

#### 3. 项目进展

今日合并/关闭的 56 条 PR 中，重点推进方向包括：

- **消息投递可靠性：** 针对 Slack 频道的重复评论投递（[#121004](https://github.com/openclaw/openclaw/pull/121004)）、Feishu 流式卡片内容丢失问题（[#124214](https://github.com/openclaw/openclaw/pull/124214)）、Telegram 模型确认编辑路由（[#124222](https://github.com/openclaw/openclaw/pull/124222)）等均有修复 PR，但多数状态为“等待作者”或“需要证明”。
- **会话状态管理：** [#121478](https://github.com/openclaw/openclaw/pull/121478) 修复了 Gateway 重启期间配对重启会话引用丢失的问题，该 PR 标记为 P1 且 ready for maintainer look。
- **系统性能与健康：** [#120987](https://github.com/openclaw/openclaw/pull/120987) 确保 Gateway 在 SQLite 增加兼容列后仍可回滚，该改动对运维升级安全至关重要。
- **开发者体验：** [#121546](https://github.com/openclaw/openclaw/pull/121546) 为 MCP 配置规范化函数补充了单元测试，提升核心配置解析的稳定性。

整体来看，项目在持续修补多频道消息传递的边界情况，并加强系统升级/回滚的健壮性，但大量 PR 停留时间较长，合并效率有待提升。

---

#### 4. 社区热点

- **[Issue #121058：静默回复失败，评论 96 条](https://github.com/openclaw/openclaw/issues/121058)** — 该问题为 P1 级且影响消息丢失，尽管前置 Issue #116277 已关闭，但问题仍在发生。用户 @sloptop-the-terrible 提供了监控日志证据，社区对“关闭但未修复”的 Issue 处理方式反响强烈。这是今日讨论热度最高的话题。

- **[Issue #116201：实时语音会话状态无限增长，评论 66 条](https://github.com/openclaw/openclaw/issues/116201)** — 这是一个长期未解决的高优问题（Diamond Lobster 评级）。用户担心在慢速或不稳定的 Provider 行为下，会话状态会无限保留，导致资源耗尽。社区在讨论资源上限的硬性约束方案。

- **[Issue #7707：记忆来源信任标记，评论 53 条](https://github.com/openclaw/openclaw/issues/7707)** — 该功能请求自 2 月提出，至今仍为开放状态。用户核心诉求是防止通过网页或第三方技能注入的恶意指令污染代理记忆（记忆投毒攻击）。评论区有大量关于实现路径的讨论，但缺少产品决策。

**分析：** 社区热点集中在“可靠性”与“安全”两大主题。用户对消息静默丢失的容忍度极低，且对 P1 问题被关闭但未真正修复感到沮丧。此外，关于记忆系统的安全设计（信任分级）讨论热烈，反映出用户对 AI 代理长期记忆安全性的担忧。

---

#### 5. Bug 与稳定性

按严重程度排列：

| 严重度 | Issue 链接 | 标题与状态 | 是否有 Fix PR |
| :--- | :--- | :--- | :--- |
| **P1 (Critical)** | [#121058](https://github.com/openclaw/openclaw/issues/121058) | 静默回复失败持续复发（已关闭，但未解决） | 无 |
| **P1 (Critical)** | [#25592](https://github.com/openclaw/openclaw/issues/25592) | 工具调用之间的文本泄漏到消息渠道 | 有 ([PR 指示 linked-pr-open](https://github.com/openclaw/openclaw/issues/25592)) |
| **P1 (Critical)** | [#86684](https://github.com/openclaw/openclaw/issues/86684) | `sessions_yield` 子代理唤醒时在低上下文使用下压缩父分支（回归） | 有 ([PR 指示 linked-pr-open](https://github.com/openclaw/openclaw/issues/86684)) |
| **P1 (Critical)** | [#44925](https://github.com/openclaw/openclaw/issues/44925) | 子代理完成静默丢失，无重试/通知/自动重启 | 无（恢复卡住） |
| **P1 (Major)** | [#91931](https://github.com/openclaw/openclaw/issues/91931) | 预置的 `BOOTSTRAP.md` 被自动删除，导致首次运行配置丢失 | 有 ([PR 指示 linked-pr-open](https://github.com/openclaw/openclaw/issues/91931)) |
| **P1 (Major)** | [#123073](https://github.com/openclaw/openclaw/issues/123073) | `dev` 更新通道失败（npm/pnpm 协议错误） | 无 |
| **P2 (Moderate)** | [#40819](https://github.com/openclaw/openclaw/issues/40819) | 会话记忆同步性能退化：全量删除-重插模式 | 有 |
| **P2 (Moderate)** | [#114612](https://github.com/openclaw/openclaw/issues/114612) | SQLite 记忆表无保留策略，最终会填满磁盘 | 无（恢复卡住） |

**总结：** 今日无新的崩溃级 Bug，但存在多项 P1 级回归或数据丢失问题，尤其是子代理相关状态管理和消息投递。部分 P1 问题已有关联 PR（如 #25592、#86684），但仍处于开放状态，需要维护者优先推动审查与合并。

---

#### 6. 功能请求与路线图信号

- **[Issue #7707：记忆信任标记](https://github.com/openclaw/openclaw/issues/7707)** — 这个话题有 53 条评论，但标记为 `needs-product-decision`。该功能与安全强相关，已由 `clawsweeper` 机器人自动记录，但未进入开发队列。虽然短期可能不会实现，但它是社区关注度最高的长期功能请求。

- **[Issue #44309：A2A 单向调度模式](https://github.com/openclaw/openclaw/issues/44309)** — 用户希望增加“即发即忘”（dispatch-only）模式，避免 Agent 之间回复的 Ping-Pong 效应。目前有 9 条评论，来自长期用户，可能是优化多代理工作流的重要方向。

- **[PR #124325：Soniox 异步 STT Provider](https://github.com/openclaw/openclaw/pull/124325)** — 这是一个新增功能 PR，作者请求将 Soniox 的高性价比异步转录 API 集成到媒体理解系统。尽管 PR 状态为 `dependencies-changed`，但功能本身具备吸引力，有可能被纳入后续版本。

- **[PR #112811：支持多个 MS Teams 机器人账户](https://github.com/openclaw/openclaw/pull/112811)** — 该 PR 标记为“✨ showcase”，旨在解决一个 Gateway 只能配置一个 Teams Bot 的限制。该功能将提升多代理场景下的灵活性，但同样处于长期开放状态。

---

#### 7. 用户反馈摘要

- **对“修复无效”的挫败感：** 用户对核心 Bug（如 #121058 静默回复失败）反复出现、Issue 被关闭但问题仍在的情况表达强烈不满。这反映出用户更看重问题的实际解决而非工单状态。
- **对上下文窗口管理的担忧：** 用户反馈在子代理使用 `sessions_yield` 或注入 Bootstrap 文件时，上下文窗口占用过高，浪费 Token（如 #67419，评论认为浪费 20-30% Tokens）。用户期望更智能的上下文压缩和更少的重复注入。
- **对 Windows 平台的支持体验：** 多个 Issue（如 #74378、#119796）涉及 Windows 上进程残留、文件锁等问题，反映出 Windows 用户群体的活跃度上升，但也意味着跨平台兼容性仍是薄弱环节。
- **对安全的主动关注：** 用户不仅关注功能，还主动提出“记忆投毒”风险（#7707），并希望 OpenClaw 提供安全配置或审计能力。这表明用户对 AI 代理的安全信任是重要考量因素。

---

#### 8. 待处理积压

以下为长期未响应、卡住或需要维护者关注的重要问题：

- **长期未响应的 P1 问题：**
  - [#44925](https://github.com/openclaw/openclaw/issues/44925) [P1]：子代理完成静默丢失，3 月提出，至今未解决，恢复状态卡住（`clawsweeper-recovery-stuck`）。
  - [#82662](https://github.com/openclaw/openclaw/issues/82662) [P1]：隔离的 Cron agentTurn 超时，5 月提出，所有 fallback 模型均失败，恢复状态卡住。

- **需要产品决策的功能请求：**
  - [#7707](https://github.com/openclaw/openclaw/issues/7707)：记忆信任标记，2 月提出，至今仍为 `needs-product-decision`。
  - [#44309](https://github.com/openclaw/openclaw/issues/44309)：A2A 单向调度，3 月提出，卡在 `needs-product-decision`。

- **带有修复 PR 但 PR 被搁置：**
  - [#119700](https://github.com/openclaw/openclaw/pull/119700) [fix(ci)]：Crabbox 认证失败，8 月 5 日提出，PR 已 ready for maintainer look，但尚未合并。
  - [#10782](https://github.com/openclaw/openclaw/issues/10782)（若有）：请检查与 [#119700](https://github.com/openclaw/openclaw/pull/119700) 相关联的 Issue。

- **回复停滞的 PR：** [#90864](https://github.com/openclaw/openclaw/pull/90864) 距今已超 2 个月，处于 `waiting on author` 状态，可能因作者失联而搁置。建议维护者联系作者或接手处理。

**建议：** 优先处理标记为 `clawsweeper-recovery-stuck` 且为 P1 级的问题，这通常意味着维护者已经尝试但未能复现或解决，需要重新评估优先级。同时，清理长期 `waiting on author` 的 PR，避免积压。

---

## 横向生态对比

# 个人AI助手开源生态横向对比分析报告

**日期：2026-08-16**

---

## 1. 生态全景

个人AI助手/自主智能体开源生态正处于从"功能原型"向"生产级平台"过渡的关键阶段。头部项目（OpenClaw、ZeroClaw）以每日数百条 Issue/PR 的节奏高速迭代，但合并率普遍偏低（OpenClaw 仅 11%），反映出维护者带宽已成为生态共同瓶颈。多项目不约而同聚焦于三大核心技术命题：消息投递可靠性、记忆系统安全性与上下文窗口管理效率——这些正是决定智能体能否从 Demo 走向真实生产环境的"最后一公里"问题。与此同时，渠道适配（Telegram/WhatsApp/Discord 等）与 Provider 协议兼容（OpenAI/Anthropic/DashScope 等）的激烈竞争表明，生态正在从"模型能力竞赛"转向"工程基础设施竞赛"。

---

## 2. 各项目活跃度对比

| 项目 | 今日 Issues | 今日 PR | Release | 健康度评估 |
|:---|:---:|:---:|:---:|:---|
| **OpenClaw** | 478 活跃 | 444 待合并 / 56 合并 | v2026.8.1-beta.2 ✅ | ⚠️ 高活跃但合并率低（11%），多项 P1 级 Bug 长期未关闭 |
| **NanoBot** | 2 更新 | 16 更新 / 7 合并 | 无 | ✅ 健康，Bug 响应迅速（当日修复），合并效率高 |
| **ZeroClaw** | 50 更新 | 50 更新 / 功能栈合入 | 无 | ✅ 高活跃，架构 RFC 密集评审期，功能落地扎实 |
| **PicoClaw** | 0 | 2 待合并（stale） | 无 | ⚠️ 周末低速，2 个 PR 已 stale 9 天待维护者响应 |
| **NanoClaw** | 0 新开 | 21 待合并 / 3 合并 | 无 | ✅ 核心团队全速推进，Bug 修复速度快，外部贡献少 |
| **NullClaw** | 1 新增 | 1 合并 | 无 | ✅ 活跃度温和，方向聚焦生产环境痛点 |
| **IronClaw** | 27 更新 / 21 关闭 | 7 待合并 | 无 | ✅ 高强度消化技术债，性能优化显著 |
| **LobsterAI** | 18（16 自动关闭） | 依赖升级为主 / 1 功能修复合并 | 无 | ⚠️ 低频维护期，大量真实 Bug 未修复即超时关闭 |
| **Moltis** | 0 新增 | 14 合并 | 无 | ✅ 合并节奏强劲，安全加固与 Sandbox 修复收官 |
| **CoPaw** | 10 更新 / 9 新开 | 11 待合并 / 0 合并 | 无 | ⚠️ 高活跃但合并通道积压，视频功能缺陷集中爆发 |
| **TinyClaw / EasyClaw** | 0 | 0 | 无 | 💤 无活动 |
| **ZeptoClaw** | 0 | 0 | 无 | 💤 无活动 |

---

## 3. OpenClaw 在生态中的定位

**OpenClaw 是生态的绝对核心与参照基准。** 其 Issue/PR 规模（478/500 条）超出其他项目一至两个数量级，社区讨论深度（单 Issue 最高 96 条评论）也无出其右。其技术路线上的核心差异在于：

- **全渠道覆盖战略**：Slack、Feishu、Telegram、Discord 等多频道深度适配，远超多数竞品的单一渠道策略；
- **安全优先的架构决策**：Secret egress host binding、记忆信任分级讨论等，在安全设计上领先于同类项目；
- **Beta 版本高频迭代**（v2026.8.1-beta.2），功能推进激进但生产稳定性承受压力。

然而，其 11% 的 PR 合并率与多项 P1 级 Bug 长期未关闭（如静默回复失败 #121058），正侵蚀用户信任。社区对"关闭但未修复"的 Issue 处理方式反响强烈，这是 OpenClaw 面临的最大治理风险。相比之下，NanoBot 与 Moltis 在处理当下 Bug 合并效率上反而优于 OpenClaw，但二者的社区规模与技术纵深仍无法与之同日而语。综合来看，OpenClaw 的强大社区网络效应（Subagent 生态、数千集成），在短期内难以被撼动，但若合并效率与治理问题持续恶化，其领导地位可能受到侵蚀。

---

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|:---|:---|:---|
| **消息投递可靠性** | OpenClaw、LobsterAI、ZeroClaw、PicoClaw | 静默失败、消息丢失、重复投递、子代理完成通知不可靠，多项目均将其列为 P1 级 Bug |
| **记忆系统安全与稳定性** | OpenClaw、LobsterAI、NanoBot | 记忆投毒攻击防护（#7707 信任标记）、记忆表无保留策略导致磁盘耗尽、SQLite 全量删除-重插性能退化 |
| **上下文窗口管理效率** | OpenClaw、NullClaw、PicoClaw、NanoClaw | 子代理压缩父分支回归、前缀缓存命中率优化、工具输出压缩、Token 浪费 20-30% 的高昂成本 |
| **Provider 协议兼容与统一** | ZeroClaw、CoPaw、NanoBot、IronClaw | OpenAI Chat Completions 兼容入口、DashScope 原生协议、OrcaRouter 网关、类型化 ToolChoice 重构 |
| **渠道/适配器扩展** | NanoClaw、PicoClaw、CoPaw、Moltis | Telegram 深度集成、WhatsApp 依赖修复、Matrix 端到端加密、Slack 原生任务卡片 |
| **后台任务与 Cron 可靠性** | ZeroClaw、LobsterAI、CoPaw、NanoBot | 无 wall-clock 超时挂死、cron yield 子代理完成事件丢失、任务状态同步 |

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构关键差异 |
|:---|:---|:---|:---|
| **OpenClaw** | 全渠道个人 AI 助手，多代理编排 | 开发者/高级用户 | 插件化 Subagent 生态、共享存储 Secret 绑定、Gateway 集中式架构 |
| **ZeroClaw** | 企业级可治理的自主智能体 | 企业/团队 | Agent 插件标准（plugin.json）、SOP 控制面、五种身份策略 |
| **NanoBot** | 轻量、快速、WebUI 优先 | 个人开发者 | 极简架构、Consolidator 压缩、多 Provider 网关 |
| **IronClaw** | 高性能、低写入成本 | 运维/规模部署 | Tier 1/2 写入削减、Trait 审计系统、Reborn 架构迁移 |
| **NanoClaw** | 容器化部署、Telegram 原生 | DevOps 用户 | 容器心跳机制、轮询循环泄漏治理、跨会话上下文回显 |
| **Moltis** | 安全加固、Sandbox 远程执行 | 安全敏感团队 | Sandbox 隔离构建、Coder Workspace 支持、Vault 恢复 |
| **CoPaw** | 视频/多媒体理解、企业插件 | 企业/内容团队 | DataPaw 应用运行时、OAuth2 远程 MCP、视频帧处理 |
| **PicoClaw** | 低资源、依赖缓存成本优化 | 资源受限场景 | 前缀缓存优化、轻量依赖管理 |
| **NullClaw** | 长时运行稳定性、代理支持 | 企业内网用户 | 系统提示词拆分为稳定前缀/可变尾部、工具输出压缩 |
| **LobsterAI** | 网易生态整合、会员模型 | 网易用户 | 自有模型绑定、IM 集成（微信） |

---

## 6. 社区热度与成熟度

### 快速迭代期（功能扩展优先）
- **OpenClaw**：社区规模最大，讨论深度高，但合并效率与 Bug 治理是短板
- **ZeroClaw**：架构收敛与功能落地并行，RFC 决策密集，处于平台化前夜
- **NanoClaw**：核心团队全速推进，方向明确（Telegram 深度集成、平台化），但外部贡献较少
- **CoPaw**：新功能 PR 密集（DataPaw、Provider 统一），但合并积压与视频链路质量是瓶颈

### 质量巩固期（稳定性与性能优化优先）
- **IronClaw**：高强度消化技术债，性能优化（写入削减）显著，典型的质量巩固态
- **NanoBot**：Bug 响应迅速，WebUI 交互打磨，健康度高
- **Moltis**：安全加固收官，功能修复精准，合并节奏强劲
- **NullClaw**：聚焦长时运行稳定性的底层优化，方向明确

### 低频维护期（以自动化清理为主）
- **PicoClaw**：周末低速运转，2 个功能性 PR 等待处理
- **LobsterAI**：批量自动关闭历史 Issue，真实 Bug（会员登录失败）长期未修复，有用户流失风险

---

## 7. 值得关注的趋势信号

1. **"静默失败"是当前用户最大的信任杀手**：CoPaw 视频帧丢弃、OpenClaw 静默回复失败、LobsterAI CLI "假成功"——多项目用户共同反映"看起来成功但什么都没发生"的问题难以定位。可观测性和明确的错误分类将成为智能体框架的核心竞争力。

2. **记忆安全正在从"功能"升级为"信任基础设施"**：OpenClaw 的记忆投毒攻击讨论（#7707）与 LobsterAI 的路径穿越漏洞报告表明，用户已开始将智能体视为持有敏感信息的长期系统。记忆信任分级、审计能力、保留策略将成为标配。

3. **上下文窗口经济性成为新的性能战场**：NullClaw 的 stablePrefixHash、PicoClaw 的前缀缓存优化、OpenClaw 的上下文压缩回归，均指向同一个方向——在长会话场景下，Token 成本与上下文管理效率直接决定产品的可用性与利润率。

4. **Provider 兼容层正在经历从"适配器"到"标准协议"的演进**：ZeroClaw 的 Chat Completions 兼容 RFC、CoPaw 的 Provider 体系统一、IronClaw 的类型化 ToolChoice 重构，共同指向一个趋势：多模型接入将从"每家写一个适配器"转向"定义统一协议 + 类型安全路由"，这是生态走向成熟的标志。

5. **渠道多样性成为增长引擎**：Moltis 的 Slack 原生任务卡片、NanoClaw 的 Telegram 深度集成、CoPaw 的 Matrix 群组隔离——渠道适配不仅是功能问题，更是触及不同用户群体的战略入口。WhatsApp 的衰落（NanoClaw 彻底移除、PicoClaw 依赖过期）与 Telegram 的崛起构成鲜明对比。

6. **企业级部署条件（代理、加密、合规）开始被主动提出**：NullClaw 的代理支持请求、CoPaw 的插件 system_prompt 权限、ZeroClaw 的安全姿态 RFC，均表明社区用户正将 AI 智能体纳入企业 IT 治理框架，这将推动下一轮功能开发方向。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

### NanoBot 项目动态日报 — 2026-08-16

---

#### 1. 今日速览

NanoBot 过去24小时活跃度处于**高位**：共计 16 条 PR 更新（其中 7 条已合并/关闭），2 条 Issue 更新。项目核心聚焦于 **WebUI 交互完善**（会话协作、拖拽管理、侧边会话）与 **稳定性修复**（会话状态竞争、内存截断、调度器存活）。值得注意的是，`Consolidator` 截断逻辑的 Bug (#5377) 在当日即被对应修复 PR (#5379) 覆盖，响应迅速。此外，**DashScope 原生协议支持**与 **OrcaRouter 网关集成** 两个新 Provider PR 处于开放状态，表明生态集成仍在持续扩展。无新版本发布，整体项目健康度良好。

---

#### 3. 项目进展

今日合并/关闭的 PR 主要围绕 **WebUI 行为修正**、**后台任务安全** 与 **插件安全**，具体进展如下：

- **WebUI 操作时机修正**：`#5371 fix(webui): hide assistant actions until turn end` 已合并。该 PR 修复了 Agent 回合未结束时复制/派生按钮提前出现的问题，确保界面完成信号与实际状态一致。
- **插件缓存安全加固**：`#5369 fix(plugins): revalidate cached skill roots after package changes` 已合并。修复了插件包原地替换后，缓存技能目录仍指向受限路径的安全隐患，避免越权读取。
- **会话文件状态生命周期收敛**：`#5370 fix(agent): bound per-session file state lifecycle` 已合并。该 PR 为高基数 API/临时会话的 `FileStateStore` 内存增长设置了边界，并清理了 `/new`、SDK 关闭后的残留状态。
- **Cron 调度器韧性提升**：`#5376 fix(cron): keep scheduler alive when job-store persistence fails` 已合并。修复了 `_save_store()` 抛错导致调度器永久停摆的静默故障，保障任务持久化失败时调度仍可继续。
- **WebUI 细节交互修复**：`#5397 fix(webui): preserve range selection and turn timing` 已合并，支持 macOS 风格 Shift 范围选择，并修正了 guidance 发送时运行计时归属问题。
- **Provider 生态扩展**：`#5328 feat(providers): add OrcaRouter as a named gateway provider` 已关闭（合并），新增 OpenAI 兼容路由网关，统一接入 150+ 模型。
- **模型预设命名清晰化**：`#5399 fix(webui): clarify model preset display names` 已合并，区分显示标签与稳定 `/model` 命令名，避免编辑时混淆。

---

#### 4. 社区热点

- **会话协作与组织（#5358 / #5389 / #5364）**：三款 WebUI 功能 PR（会话 @提及协作、拖拽分组、临时侧边会话）在今日集中保持活跃，累计获得较多关注。社区对 **WebUI 会话管理能力的深度定制** 需求强烈，不仅限于排序，更期望通过拖拽快速分组、通过提及跨会话引用，以及隔离上下文进行并行探索。

- **模型预设命名统一（#5400）**：PR 提出将预设键作为全链路唯一规范名，并允许用户重命名。此改动涉及配置、会话、命令等多个模块，背后反映了 **多模型/多配置环境下命名混乱** 的真实痛点，尤其是预设显示名与命令名不一致导致的困惑。

---

#### 5. Bug 与稳定性

| 严重程度 | Issue/PR | 描述 | 状态 |
| :--- | :--- | :--- | :--- |
| **高** | Issue #5377 | **Bug: Consolidation 截断逻辑缺陷**。`Consolidator.archive()` 将输入截断至模型 token 预算，但调用方仍推进 `Session.last_consolidated` 越过完整批次，导致消息丢失且索引不一致。 | 开放，已有 **Fix PR #5379** 待合并 |
| **中** | PR #5271 (p0) | 后台任务保存竞态：`/new` 后旧压缩任务的保存可能覆盖新会话数据。PR 通过串行化 `/new` 与拒绝无效保存来解决。 | 开放待合并（标注 conflict） |
| **低** | PR #5401 (p2) | WebUI 断线重连后，pending 变更可能重复执行或请求 ID 被复用。PR 通过重放完成结果与拒绝 ID 复用来修复。 | 开放 |
| **低** | Issue #5368 | WebUI 回合未结束时即显示复制/派生按钮，与 `Working ...` 状态冲突。 | 已关闭，由 **PR #5371** 修复并合并 |

---

#### 6. 功能请求与路线图信号

- **会话协作（#5358）**：为持久化会话分配服务端 `@name`，并在提及选择器中支持选择对等会话。该功能大概率进入下一版本，因其设计完整（含权限与身份颜色方案），且与现有提及选择器无缝集成。
- **临时侧边会话（#5364）**：提供 `/side` 命令开启临时对话，支持多标签与并行发送。该功能与当前会话管理重构方向一致，虽标注 conflict 但被合入的可能性较高。
- **拖拽式会话组织（#5389）**：支持拖拽调整排序与分组，可通过拖拽一个会话到另一个之上快速建组。该功能顺应 pane 布局更新，预计在冲突解决后合并。
- **DashScope 原生协议支持（#5398）**：新增 `dashscope_native` Provider，解锁 OpenAI 兼容模式未暴露的完整参数面（原生思维链等）。这反映了**对国内云厂商原生能力的深度集成需求**，预计将进入下一里程碑。

---

#### 7. 用户反馈摘要

- **内存与状态管理痛点**：Issue #5377 的评论者（dajiaohuang）反馈，**会话压缩操作会导致隐式消息截断且无提示**，用户感知为“对话内容神秘丢失”，且压缩后指针推进逻辑错误，加剧了状态不一致风险。用户期望在 token 超限时明确提示或采用无损分块处理。
- **WebUI 操作流畅度**：Issue #5368 反馈者（ZhouJ-sh）指出，生成未结束时出现的操作按钮与 `Working for ...` 状态并存，**造成了完成信号的矛盾**，干扰了用户对 Agent 状态的判断。该问题已通过 PR #5371 修复，用户侧反馈正面。
- **Provider 命名混乱**：PR #5399 的动机描述反映了用户在多预设场景下，**显示名与 `/model` 命令名不一致导致编辑困难**，尤其是将预设命名为 `openai` 但显示为 `minimax` 时极易误解。社区认可通过区分标签与命令名的方案。

---

#### 8. 待处理积压

- **PR #5291 `fix(agent): persist subagent conversation transcripts`**：自 8 月 7 日开放以来已一周有余，期间无更新。该 PR 试图解决子代理完整会话记录（工具调用、推理过程）丢失的问题，对可观测性有重要价值，建议维护者安排 review。
- **PR #5271 `fix(session): prevent stale background task saves`**：标注 **p0** 且存在冲突，涉及会话生命周期核心数据安全。该 PR 已开放超 10 天，冲突需尽快协调解决，避免数据覆盖风险长期滞留。
- **PR #5364 `feat(webui): add temporary side conversations`** 与 **PR #5389 `feat(webui): add drag-and-drop`** 均存在 conflict 标签，且均为社区期待度较高的 WebUI 功能，建议维护者优先处理冲突以推动合并。

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目日报 — 2026-08-16

## 今日速览

项目今日维持高活跃度，24小时内更新50条Issues和50条PR，其中多数处于开放讨论或待合并状态。核心方向集中在三块：一是多项RFC进入密集评审期（Chat Completions协议兼容、运行时会话所有权、统一附件架构、实时语音通道等），架构决策密集；二是Anthropic服务端fallback功能栈（由#9262-#9272五个stacked PR组成）今日整体合入，是近期最大的功能推进；三是零代码TUI（zerocode）、SOP控制面和Reliable provider计费修复持续有PR在途。CI方面已有针对耗时过长和偶发失败的缓解方案（#7108）。整体看，项目正处于架构收敛与功能落地并行的关键阶段，需重点关注RFC决策队列的消化速度。

## 项目进展

今日合并的PR主要来自Anthropic fallback功能栈（全部由 @IftekharUddin 提交）：

- **PR #9262** — 将Anthropic原生refusal（`stop_reason: "refusal"`）从空响应转为类型化 `AnthropicRefusalError`，使上层可区分拒绝与成功。`size:M`
- **PR #9263** — 让客户端可靠性层识别上述类型化错误，将refusal路由至fallback条目，`is_non_retryable` 分类更新。`size:XL`
- **PR #9265** — 增加Anthropic-only配置项 `server_fallback_models`，实现服务端fallback请求的客户端opt-in。`size:XL`
- **PR #9266** — 读取原生响应信号，新增 `NativeChatResponse.model`（实际服务模型）和 `AnthropicUsage.iterations` 字段，完整支持服务端fallback。`size:XL`
- **PR #9268** — 在channel orchestrator后置循环中输出safeguard fallback通知，打通用户可见的通知链路。`size:XL`

该功能栈的完整合入意味着ZeroClaw在Anthropic refusal场景下具备了端到端的客户端/服务端fallback能力，且从检测、路由、计费归属到面向用户的提示信息形成闭环。此外，多PR今日仍开放待合入：`#10003`（Reliable rejected attempts精确计费）、`#10021`（独立delegate应用target thinking策略）、`#9867`（自动PR size标签CI）。

## 社区热点

1. **Issue #8603 — RFC: ZeroClaw Chat Completions profile**（21条评论）
   讨论最热。用户 @REL-mame 提出为OpenAI Chat Completions协议生态（Open WebUI、LobeChat、Continue.dev、Aider、LangChain等）提供兼容入口。该提案直指ZeroClaw当前仅支持WebSocket/ACP/webhook的接入局限性。目前停留在架构评审阶段，无明确时间表。

2. **Issue #9487 / #9488 — RFC: 运行时会话所有权 / 统一附件架构**（17/16条评论）
   由 @NiuBlibing 主导的两个关联RFC，前者重新划分运行时与各入口的所有权边界并引入 `InboundAction`，后者统一web chat与各channel的附件处理。两案均涉及安全边界与网关架构调整，风险等级为high，需要维护者投入较多评审精力。

3. **Issue #6954 — RFC: 内部启动Agent轮次的可溯源性与回复契约**（13条评论）
   cron/计划任务场景下，内部发起的agent turn需要明确的provenance、conversation binding和reply契约。反映自触发场景在ZeroClaw中越来越受关注。

4. **Issue #6971 — RFC: 安全姿态、凭证边界与统一入口策略**（13条评论）
   安全面较广的综合提案，涵盖凭证处理、运行时隔离、沙箱、工作区策略、工具审批、channel授权、gateway配对等。社区对安全透明度的需求在上升。

5. **Issue #8692 — Maintainer决策队列Tracker**（13条评论）
   社区自建的RFC/设计Issue决策队列跟踪器，侧面反映维护者评审速度已成为社区关注点。

## Bug 与稳定性

按严重程度排列：

| 严重度 | Issue | 描述 | Fix PR 状态 |
|---|---|---|---|
| S1 - 流程受阻 | #7527（已关闭） | macoS桌面应用重开后可能空白或无窗口 | 今日关闭，需确认修复方式 |
| P1 | #9965 | cron自定义shell测试在并行运行时门禁下间歇性触发ETXTBSY，导致无关PR被标红 | 已接受（status:accepted），修复中 |
| P1 | #9002（PR） | dashboard WebSocket断开导致agent turn被取消（viewer/controller语义不对） | PR待合并，`needs-author-action` |
| P1 | #9320（PR） | cron agent job无wall-clock超时，挂死时锁不释放 | PR待合并，`needs-author-action` |
| P1 | #9753（PR） | 空列表与缺失值在risk-profile `allowed_tools`中语义混淆，显式 `[]` 会fail-open | PR待合并，`needs-author-action` |
| P1 | #9995（PR） | webhook审计导出未清洗凭证，有泄露风险 | PR待合并，`needs-author-action` |
| P1 | #9281（PR） | `config set` 失败时自动创建的map别名未回滚，产生脏状态 | PR待合并，`needs-author-action` |
| P2 | #7870（tracker） | 第一个配置provider的runtime选项可能错误地泄漏到所选provider | 已接受，跟踪中 |
| P2 | #9470 | Reliable fallback遥测归属错误，使用量记到了错误的provider/model上 | 已有PR #10003待合入 |

今日无新确认的高危回归。整体稳定性风险集中在P1级别但均有在途修复。

## 功能请求与路线图信号

- **OpenAI Chat Completions协议兼容**（#8603）：社区呼声最高，一旦落地将大幅拓宽客户端生态。
- **实时语音通道（Gemini Live）**（#8780）：提案已更新至v2，改为broker契约设计，评审推进中。
- **Agent Plugins 1.0标准支持**（#9810）：加载 `plugin.json` + `skills/` + `mcp.json` 社区插件，可能被纳入v0.9.0之后版本。
- **产品遥测**（#9621）：分阶段opt-in遥测，为维护者提供功能使用数据——虽属基础设施，但对项目长期决策有影响。
- **桌面Computer-use支持**（#6909）：浏览器工具之外扩展桌面屏幕交互，与 #7089（Windows shell host评估）构成桌面化的组合信号。
- **AI辅助PR评审**（#9330）：用CI结果触发AI预评审，仍保持人工最终审批。
- **可发布安全的区块链地址例外**（#9825）：泄漏检测器对公开链上地址产生假阳性，需要黑白名单例外机制。

## 用户反馈摘要

- **Dashboard断开即取消任务**（PR #9002）：用户在实际使用中因切换页面/合盖/网络抖动导致工作进行到一半被取消，体验受损。该修复将dashboard降级为viewer角色，保证agent turn隔离运行。
- **Cron缺少文档和指定模型能力**（#7762）：用户希望周期小任务能指定便宜模型（如gemma）运行，同时指出cron文档缺失。
- **Windows shell体验**（#7089）：`cmd.exe` 在当前shell工具中的行为是已知痛点，社区关注PowerShell/Git Bash的配置化选项。
- **Discord频道被对话刷屏**（#7849）：用户不希望机器人追问污染共享频道，希望有mention-triggered thread模式。
- **wecom_ws只支持被动响应**（#7824）：企业微信用户有主动推送需求（包括媒体文件），且缺少 `zeroclaw channel send` 支持。
- **内存存储与enrichment connector职责混淆**（#9103）：用户指出Lucid作为非权威存储被建模为完整backend，概念上有害。

## 待处理积压

以下为长期开放、近期无实质推进或等待维护者介入的重要条目：

- **#6909 — 桌面Computer-use RFC**（2026-05-25创建，`needs-author-action`）：本月内未获维护者决策。
- **#8780 — Gemini Live实时语音RFC**（2026-07-06创建，`needs-author-action`）：v2已更新但等待评审。
- **#9103 — 内存存储与Enrichment连接器分离**（2026-07-16创建，`needs-author-action`）：架构层面需要维护者拍板。
- **#9330 — AI辅助PR预评审RFC**（2026-07-24创建，`needs-author-action`）：需维护者回应可行性与风险边界。
- **#9825 — 区块链地址安全例外RFC**（2026-08-07创建，`needs-author-action`）：假阳性影响实际支付场景。
- **#8692 — Maintainer决策队列Tracker**（13条评论）：RFC大量积压，该Tracker本身即是积压的信号。
- **多PR处于 `needs-author-action`**（#9002、#9320、#9753、#9995、#9281、#9109、#8337、#9867 等）：等待作者响应或更新，需社区推动闭环。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026-08-16

## 今日速览

项目今日活跃度较低，过去24小时内无新Issue、无版本发布、无PR合并或关闭。目前有2个待合并PR（#3321、#3320），均由同一作者提交，均已进入stale状态。两个PR分别针对提示词前缀缓存优化和WhatsApp通道连接失败问题，均等待维护者处理。整体来看，项目在周末时段进入低速运转期，但两个待合并PR都属于功能性修复，建议尽快推进评审。

---

## 项目进展

今日无PR被合并或关闭，项目代码主干无新增提交。当前处于待处理的2个PR简介如下：

| PR | 类型 | 状态 | 摘要 | 链接 |
|---|---|---|---|---|
| #3321 | fix(agent) | OPEN / stale | 将动态上下文块（`Current Time`、`Runtime`、`Current Session`、`Current Sender`）从系统消息前置位置移至对话历史之后，以保留前缀缓存的命中率。属于性能优化。 | [查看 PR](https://github.com/sipeed/picoclaw/pull/3321) |
| #3320 | fix(deps) | OPEN / stale | 升级 `whatsmeow` 依赖，解决 WhatsApp 通道因客户端版本过旧被服务器拒绝（HTTP 405）导致连接后立即断开且不重连的问题。属于功能性修复。 | [查看 PR](https://github.com/sipeed/picoclaw/pull/3320) |

两个PR均创建于8月7日，最后更新于8月15日，距离创建已过去9天，处于stale状态，尚未获得维护者响应。

---

## 社区热点

今日无新的热点讨论。当前社区焦点集中在上述两个已进入stale状态的PR上，虽然无新增评论，但两个PR均代表了实际使用中遇到的问题：

- **#3320** 值得特别留意。WhatsApp原生通道失效意味着真实用户在既定渠道上无法使用PicoClaw，属于直接影响可用性的问题，且该问题由一个外部依赖版本更新引发，修复本身风险较低。社区（或至少该PR作者）的诉求是尽快合并以恢复通道可用性。

---

## Bug 与稳定性

| 严重程度 | 问题描述 | 状态 | 修复PR |
|---|---|---|---|
| 高 | WhatsApp 通道连接后约5秒被服务器断开（`Client outdated (405)`），且未触发自动重连，导致该通道持续不可用 | 未修复，PR待审 | [#3320](https://github.com/sipeed/picoclaw/pull/3320) |
| 低（性能） | 每请求动态上下文位于系统消息前置位置，任何token变化导致此前缀缓存全部失效，增加响应延迟和后端成本 | 未修复，PR待审 | [#3321](https://github.com/sipeed/picoclaw/pull/3321) |

无崩溃或数据安全类Bug报告。

---

## 功能请求与路线图信号

今日无新功能请求。从已有PR来看：

- **#3321** 的出发点是缓存命中率优化，暗示项目已依赖LLM API的前缀缓存机制来降低成本。后续版本可能会继续围绕缓存友好性做系统提示词结构的调整。
- **#3320** 属于依赖维护，不涉及新功能，但推动了对 `whatsmeow` 库版本的升级，可能为后续WhatsApp新特性（如消息回执、媒体类型扩展）铺路。

---

## 用户反馈摘要

今日无Issue评论或用户反馈内容。从当前2个PR的提交动机中可以提炼的用户场景如下：

- 使用WhatsApp原生通道的用户面临通道完全不可用的状态，影响日常使用。
- 使用高频、多会话交互的用户对响应延迟和token成本敏感，前缀缓存失效会直接造成体验下降。

---

## 待处理积压

以下PR自8月7日创建以来已超过一周未获维护者响应，且均已被标记为stale，建议优先关注：

1. **PR #3320 — fix(deps): bump whatsmeow to unblock WhatsApp "client outdated (405)"**
   - 影响范围：WhatsApp通道整体可用性
   - 风险等级：修复依赖版本，改动范围小，合并风险低
   - 链接：[https://github.com/sipeed/picoclaw/pull/3320](https://github.com/sipeed/picoclaw/pull/3320)

2. **PR #3321 — fix(agent): move dynamic context after history to preserve prefix caching**
   - 影响范围：提示词缓存命中率、API成本、响应延迟
   - 风险等级：涉及系统提示词结构变更，需回归验证多会话一致性
   - 链接：[https://github.com/sipeed/picoclaw/pull/3321](https://github.com/sipeed/picoclaw/pull/3321)

此外，今日无新Issue产生，积压Issue队列为空，整体项目健康度良好，仅需处理上述两个滞留PR即可恢复正常的迭代节奏。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

### NanoClaw 项目动态日报 — 2026-08-16

---

#### 1. 今日速览

今日项目活跃度极高，核心团队密集提交了 22 个 PR（21 个待合并，1 个已关闭），主要围绕**频道适配器（Telegram）**、**跨会话上下文**、**权限控制**与**容器稳定性**四大主题展开。新 Issues 为零，说明当前阶段开发者侧的主要精力集中在内部功能深化而非用户问题反馈。值得关注的是，今日提交的 PR 多为 `[core-team]` 标签（内部架构改进），且 **3 个 PR 已合并/关闭**，标志着针对会话上下文与轮询循环的稳定性修复已正式落地。社区贡献（非核心团队）主要集中在 Telegram 集成与附件处理，尚未见大规模外部参与。

---

#### 2. 版本发布

今日无新版本发布。

---

#### 3. 项目进展

今日合并/关闭 3 个 PR，标志着以下功能步入稳定：

- **修复轮询循环泄漏（[PR #3268](https://github.com/nanocoai/nanoclaw/pull/3268) - 已关闭）**：修复了 `runPollLoop` 在停止后仍泄漏活动查询及其后续 500ms 轮询器的问题。该 Bug 会导致孤儿进程持续占用资源。此修复对长时间运行的容器稳定性至关重要。
- **重命名与渠道切换（[PR #37](https://github.com/nanocoai/nanoclaw/pull/37) - 已关闭）**：虽为旧 PR（2 月创建），但今日正式关闭。该 PR 将项目从 **nanoclaw 重命名为 dotclaw**，并完成从 WhatsApp 到 Telegram Bot （Telegraf）的底层切换，移除了旧有 WhatsApp 认证代码。关闭此历史 PR 意味着项目品牌与核心通信栈的转换已彻底完成。
- **频道注册拦截器（[PR #3266](https://github.com/nanocoai/nanoclaw/pull/3266) - 待合并）**：尽管尚未合并，但其被标记为 `[follows-guidelines, core-team]`，且与 #3260 等权限策略构成系列改动，表明频道注册审批流程正在经历架构级重构。

**整体进度**：项目正在从“功能堆砌”阶段转向“平台化”阶段。`[core-team]` 频繁提交的 A1-A8 系列 PR（如 #3266, #3265, #3264, #3263, #3262, #3261）展示了清晰的路线图：深度集成 Telegram 特性（状态显示、线程规范化）、引入跨会话记忆、优化审批流。其余 PR 主要集中在修复 Discord 附件、Telegram Markdown 兼容性等边缘问题。

---

#### 4. 社区热点

尽管今日 Issues 无更新，但 PR #3269 与 #37 是当前社区关注的焦点：

- **[PR #3269 - feat(channels): add Telegram channel integration](https://github.com/nanocoai/nanoclaw/pull/3269)**：这是今日社区成员（非 core-team）提交的最大改动，新增了 `@chat-adapter/telegram` 适配器、配对流程和 Markdown 清理器。虽然评论数据未显示，但因其功能完整性（1483 个测试通过）与 #37 的关闭形成呼应，说明社区对 Telegram 原生支持的需求极为迫切，且该能力正在被正式收编。
- **[PR #37 - Rename to DotClaw and switch from WhatsApp to Telegram](https://github.com/nanocoai/nanoclaw/pull/37)**：虽然已关闭，但其经过 6 个月的搁置后最终关闭，暗示项目维护者已决定彻底移除 WhatsApp 残留代码，并可能计划在核心代码库中采用更规范的 Telegram 集成方式（而非 Telegraf 直接依赖）。

**诉求分析**：社区与核心团队均意识到 WhatsApp 已被弃用，通信层稳定性和安全性（Markdown 渲染、附件处理）是当前最大的痛点。

---

#### 5. Bug 与稳定性

今日报告了 5 个明确的稳定性缺陷，均已通过 PR 进行修复。

**高严重度（可能导致容器崩溃/误杀）**：

- **心跳机制停滞（[PR #3251](https://github.com/nanocoai/nanoclaw/pull/3251)）**：`agent-runner` 在 Claude API 限流期间无法更新心跳文件，导致容器被误判为“卡死”并被强杀。该 Bug 会导致用户会话中断，需紧急合并。
- **空闲无心跳容器无限豁免（[PR #3252](https://github.com/nanocoai/nanoclaw/pull/3252)）**：修复了 `decideStuckAction` 中无心跳文件的容器永远不会被绝对上限杀死的逻辑漏洞。

**中严重度（功能逻辑错误）**：

- **出站投递误判频道实例（[PR #3255](https://github.com/nanocoai/nanoclaw/pull/3255)）**：多机器人实例共用相同地址时，消息可能被投递到错误的“兄弟”频道行。现已修复为精确解析发送者自身的频道行。
- **上下文行挤占任务行（[PR #3254](https://github.com/nanocoai/nanoclaw/pull/3254)）**：修复了批次选择逻辑，确保任务行不会被背压的上下文（trigger=0）行挤出，避免“唤醒但未工作”的问题。
- **Telegram 加粗降级（[PR #3250](https://github.com/nanocoai/nanoclaw/pull/3250)）**：移除旧的 Markdown 清理器，该清理器会将 `**bold**` 错误渲染为斜体，影响用户阅读。

**低严重度（体验优化）**：

- **Discord 附件传输（[PR #2752](https://github.com/nanocoai/nanoclaw/pull/2752) - 6月创建，今日更新）**：修复了附件仅暴露 URL 而无法被解析为可读文件的问题。

---

#### 6. 功能请求与路线图信号

以下迹象表明这些功能即将或已在开发中，预计将在下一版本（0.x）中体现：

- **Telegram 深度集成（明确信号）**：PR #3269 不仅新增适配器，还包含了 **Markdown sanitizer**。结合 [PR #3250](https://github.com/nanocoai/nanoclaw/pull/3250) 的修复，可以确认项目将正式支持 Telegram 复杂的文本格式化。
- **上下文工程（核心团队主导）**：PR #3257 与 #3254 描述了跨会话上下文模块，允许消息在“兄弟会话”间回显（echo），并为新 DM 会话回填历史。这意味着未来 Agent 将具备基本的“群聊记忆”能力。
- **权限控制精细化**：PR #3260 引入了第四种未知发送者策略 `'decline_notify'`（礼貌拒绝 + 一次性通知），区别于静默丢弃与审批卡片。这提供了更灵活的合规选项。
- **适配器能力增强（A1-A8 系列）**：PR #3261 与 #3262 分别拓宽了可选适配器能力（如 `setTyping` 带状态行、`setSuggestedPrompts`）并规范了 DM 线程模型。这些是为 Telegram 等高级平台预留的接口。

---

#### 7. 用户反馈摘要

今日 Issues 无评论，但根据 PR 的描述，可以提炼出以下真实用户痛点：

- **沟通渠道迁移阵痛**：用户（及维护者）对 WhatsApp 集成的不满已积累数月，导致 PR #37 的最终关闭。用户需要更稳定的 Telegram 支持（[PR #3269](https://github.com/nanocoai/nanoclaw/pull/3269)）。
- **消息格式错乱**：Telegram 用户反馈收到的加粗文本变成了斜体（[PR #3250](https://github.com/nanocoai/nanoclaw/pull/3250)），影响大量富文本输出的可读性。
- **外部附件不可用**：Discord 用户反馈接收到的图片或文本文件无法正常解析（[PR #2752](https://github.com/nanocoai/nanoclaw/pull/2752)），AI 无法“看到”用户发送的内容。
- **会话数据丢失风险（严重）**：当 API 限流时，用户可能遭遇“假死”容器被强杀，导致正在进行的任务中断（[PR #3251](https://github.com/nanocoai/nanoclaw/pull/3251)）。这是影响信任度的关键 Bug。

---

#### 8. 待处理积压

- **[PR #2752 - fix: stage inbound attachments that expose only a url (Discord)](https://github.com/nanocoai/nanoclaw/pull/2752)**：创建于 **2026-06-12**，已积压 2 个月以上。该 PR 针对 Discord 附件不可读问题，虽今日有更新，但尚未合并。鉴于 Discord 是主流社区渠道，建议维护者重点评估。
- **[PR #37 - Rename to DotClaw](https://github.com/nanocoai/nanoclaw/pull/37)**：虽然今日已关闭，但项目仓库名仍为 `nanoclaw`。若品牌重命名是既定路线，建议维护者尽快完成仓库迁移或发布正式公告，避免社区混淆。
- **未标记的旧 PR**：除了上述两个，尚有若干无 `[core-team]` 标签的 PR 积压（如 #2269 等），可能因缺少维护者关注而停滞。建议维护者定期清理并标记优先级。

---

**项目健康度评估**：活跃度极高（核心团队全速推进），方向明确（平台化、稳定性）；但外部贡献较少，文档与社区沟通仍需加强（例如重命名流程的透明度）。整体处于快速迭代的“上升期”，Bug 修复速度快（当日发现当日提交），技术债在可控范围内。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw 项目动态日报 — 2026-08-16


## 今日速览

项目今日活跃度处于低位，24 小时内仅新增 1 个 Issue 和 1 个 PR，无新版本发布。值得关注的是，两个条目均聚焦于生产环境实际痛点——代理支持和长时工具调用稳定性。社区讨论热度不高（两者均无评论），但提交方向显示出项目正从核心功能开发转向体验打磨与部署适配阶段。维护者响应速度尚可，PR #987 在提交后 24 小时内即进入待合并状态（截至数据快照已合并，详情见下），整体项目健康度稳定，推进节奏平缓。


## 版本发布

今日无新版本发布。上一版本的具体内容及已知问题清单，建议维护者提供更新说明以帮助用户确认升级路径。


## 项目进展

**PR #987（已合并）— 长时本地工具调用循环治理**

该 PR 已于今日完成合并，是本日唯一被合并的代码变更，核心解决 agent 在长时间、工具密集型本地运行场景下的两个关键问题：

- **系统提示词缓存优化**：将系统提示词拆分为稳定前缀（`buildStablePrefix`）与可变时间戳尾部（`buildVariableTail`），并引入 `stablePrefixHash`，使稳定部分可被 LLM 缓存复用，减少长会话中的重复 token 开销。
- **工具输出压缩**：新增 `result_compress.zig` 对工具输出进行压缩后再注入历史记录，同时保证 observer 日志仍可查看完整输出，兼顾上下文窗口效率与可观测性。

**对项目的推进意义**：此项合并使 NullClaw 在“长时间无人值守 agent 运行”这一关键生产场景下具备更强的上下文管理能力，同时为后续在低上下文窗口模型上运行复杂工具链提供了基础支撑。从项目路线图角度，这是 agent 稳定性的重要补强。

🔗 [PR #987: feat(agent): loop hygiene for long local tool-heavy runs](https://github.com/nullclaw/nullclaw/pull/987)


## 社区热点

今日无高热度讨论，唯一 Issue（#988）和唯一 PR（#987）均处于无评论状态。不过，从两个条目的立项本身已能看出社区的主要诉求方向：

- **部署场景的代理需求（#988）**：用户明确请求为 providers 添加 HTTP(S) 与 SOCKS5h 代理支持。这反映出当前用户群体中存在大量在企业内网或受限网络环境中部署 NullClaw 的实际需求，涉及访问受限的外部模型 API 或需要合规出口的场景。
- **长时运行的稳定性（#987 合并）**：前述 PR 的提出说明有用户在真实业务中运行长时、工具密集的本地 agent 工作流。其提出的“相同调用检测”机制（per-turn identical-call 检测）也暗示用户在长时间运行中遇到了重复工具调用导致的上下文膨胀/资源浪费问题。

**潜在建议**：上述两点分别指向“网络环境适配”和“长跑稳定性”，均属于 agent 从 Demo 走向生产的关键环节。若维护者能在下一版本中优先涵盖代理支持，将有望打开更广泛的企业级采用通道。

🔗 [Issue #988: [enhancement] proxy support](https://github.com/nullclaw/nullclaw/issues/988)


## Bug 与稳定性

今日无新报告的 Bug 或崩溃类 Issue。PR #987 的合并包含了针对长时运行稳定性的主动改进（系统提示词拆分与工具输出压缩），属于预防性稳定性优化，而非修复特定缺陷。项目当前暂无明显回归或高优先级稳定性风险信号。


## 功能请求与路线图信号

| 功能请求 | 来源 | 状态 | 是否可能纳入下一版本 |
|---|---|---|---|
| HTTP(S)/SOCKS5h 代理支持 | [Issue #988](https://github.com/nullclaw/nullclaw/issues/988) | 待评估 | **较可能**。这是部署层面刚需，实现复杂度中等（可在 provider 网络层统一注入），且不涉及核心架构变更。建议维护者优先确认。 |

**路线图信号**：当前无已合并 PR 直接指向新功能。PR #987 偏向内部架构优化，属于“隐形”的工程债偿还，仍可视为项目长期健康度的正向信号。若 #988 获得维护者积极回应，将释放“项目开始重视企业级部署条件”的明确信号。


## 用户反馈摘要

- **网络环境适配缺失**（[Issue #988](https://github.com/nullclaw/nullclaw/issues/988)）：用户 `anpic` 提出为 providers 增加代理支持，未附带额外背景描述。推测其使用场景为：企业内网开发环境（需通过代理访问外部模型 API），或出于安全合规需要统一出口代理。这属于功能性缺失，并非对现有功能的抱怨。
- **长时运行优化被主动解决**（[PR #987](https://github.com/nullclaw/nullclaw/pull/987)）：提交者 `vernonstinebaker` 及 reviewer 对长时运行下的 prompt 膨胀问题提出了系统化解决方案（缓存友好前缀 + 压缩注入），说明真实用户已经在生产用长尾场景中遇到 token 成本与上下文窗口压力。其方案设计精细（如 observer 全量日志与压缩注入分离），表明用户侧已有较深的技术积累。


## 待处理积压

**长期未响应的高价值 Issue：**

- [#988 [enhancement] proxy support](https://github.com/nullclaw/nullclaw/issues/988) — 创建于 2026-08-15，目前零评论、零反应。该请求直接关系到受限网络用户的可用性，若此类请求持续积累而无人回应，有可能演变为用户流失风险。

**建议**：维护者应在 #988 上做出明确回复（哪怕是“暂不计划，欢迎 PR”的说明），或标注 `good first issue` 标签以引导社区贡献。当前项目活跃度温和，此 Issue 优先级建议设为中高。

---

*日报生成时间：2026-08-16 | 数据来源：GitHub API（nullclaw/nullclaw）*

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

### 1. 今日速览

过去24小时，IronClaw 项目保持高强度迭代，核心聚焦于 **性能优化**（Tier 1/2 写入削减）与 **Re-born 模型收尾**。27条 Issue 更新中，21条关闭，其中大部分为已解决的性能优化积压项（#7593、#7595、#7596）和 Reborn 迁移遗留问题。PR 侧，7条待合并，核心工作集中在 **capabilities 状态持久化**（#7678）、**提交上下文切换**（#7634）以及 **线程索引写入合并**（#7676/#7677）。此外，Live Canary 连续30次失败的根因分析 PR（#7679）已提交，表明稳定性问题正在被主动攻克。新开 Issue 主要来自 #7634 的代码审查后续，指向架构边界（符号级黑白名单）、工具选择类型系统重构等深度技术债。

### 2. 版本发布

无。

### 3. 项目进展

今日合并/关闭的核心 PR 显著推动了性能优化和架构收尾工作：

- **[perf] 减少触发器与外发状态写入**（[#7629](https://github.com/nearai/ironclaw/pull/7629)）：将运行历史剪枝从每次更新触发改为仅初始触发时执行，直接削减了 Postgres/libSQL 的 DELETE 语句量。
- **[perf] 移除心跳日志写入**（[#7628](https://github.com/nearai/ironclaw/pull/7628)）：落实 #7591 中保守安全的心跳子集，停止为每次心跳追加永久日志行，预计每进程每日减少约 2,880 行写入。
- **[feat] 完成未绑定轮次切换**（[#7634](https://github.com/nearai/ironclaw/pull/7634)）：提交上下文切换模型全部按设计文档落地，并通过 71 项一致性审计。
- **[chore] 刷新代码知识图谱**（[#7670](https://github.com/nearai/ironclaw/pull/7670)）：自动化 CI 保持 AI 辅助编码的上下文数据新鲜。
- **[perf] 合并线程索引写入**（[#7676](https://github.com/nearai/ironclaw/pull/7676)）：配合 #7677，将高频率的CAS写入合并，显著降低每轮次的行写入放大。

### 4. 社区热点

今日唯一持续活跃且具备中长期价值的话题是**轨迹基准系统**：

- **[#467] Trajectory benchmark system for agent quality evaluation**（[链接](https://github.com/nearai/ironclaw/issues/467)）：该 Issue 创建于3月，今日仍有更新，评论4条。其核心诉求是构建一个通过真实LLM调用运行用户场景并基于硬性断言与 LLM 评判打分的基准系统。这反映出社区对**可量化的代理质量评估**的迫切需求，而非依赖零散的端到端测试。

### 5. Bug 与稳定性

今日无新增严重崩溃级 Bug，但有一项由测试暴露的稳定性问题正在修复：

- **[中] 定时 Live Canary 连续30次失败**（[#7679](https://github.com/nearai/ironclaw/pull/7679)）：根因定为三个测试框架缺陷误伤了正确产品行为，以及一个存活代理误报。涉及 `qa_10h_slack_email_hallucination_guard` 等场景。修复 PR 已提交（XL 规模，风险低），核心是修正误判逻辑。
- **[低] qa_6c Gmail到表格的偶发级联失败**（[#7675](https://github.com/nearai/ironclaw/issues/7675)）：由资源类能力间歇性失败引起，并影响同一会话中的后续测试。维护者已定位为独立测试桩问题，与代码缺陷无关。

### 6. 功能请求与路线图信号

新开 Issues 中透露出明确的重构路线图信号，均来源于 #7634 的代码审查：

- **类型化 ToolChoice**（[#7672](https://github.com/nearai/ironclaw/issues/7672)）：要求去除跨 provider 编码器中对 `tool_choice` 字符串的重载使用，建立类型安全枚举。涉及 `rig_adapter`、`bedrock` 等 6 个适配器，属破坏性重构。
- **架构测试：符号级白名单**（[#7674](https://github.com/nearai/ironclaw/issues/7674)）：在 crate 级依赖门禁之上增加符号级控制，防止 `openai-compat` 向 `threads` 边缘导入非预期符号。
- **BudgetLedger 记账打磨**（[#7673](https://github.com/nearai/ironclaw/issues/7673)）：修复截断启动窗口的双重计费问题，并确保记账操作的持久性。
- **Capability 分发栈压力**（[#7671](https://github.com/nearai/ironclaw/issues/7671)）：内核沙箱路径仍接近测试栈边界，提示需要进一步优化栈深度。

以上信号表明项目正积极消化大型 PR 遗留的深度技术债，预计未来数周将有数个集中于内部架构强化的中小型 PR 合并。

### 7. 用户反馈摘要

- **关于搜索功能的挫败感**（[#6821](https://github.com/nearai/ironclaw/issues/6821)）：用户询问“可安装的工具”时，代理仅报告 3 个工具（实际目录 18 个），后续查询又将技能包错误匹配为目录项。反馈指出代理在**区分目录元数据与自由文本结果**时存在语义理解缺陷，该问题已在今日关闭。
- **关于权限恢复的困惑**（[#6835](https://github.com/nearai/ironclaw/issues/6835)）：MCP 认证失败被归类为通用客户端错误而非 `AuthRequired`，导致无法触发重新认证门禁。该反馈揭示了对**明确错误分类以驱动正确恢复流程**的预期。

### 8. 待处理积压

- **[#467] Trajectory benchmark system**（[链接](https://github.com/nearai/ironclaw/issues/467)）：创建超5个月，虽保持活跃但无明确排期。作为社区关注的核心质量基设，建议评估是否纳入近期路线图。
- **[#7671] 内核沙箱栈压力**（[链接](https://github.com/nearai/ironclaw/issues/7671)）：虽是新开，却是 #7634 的后续，属于避免未来回归的已知隐患，建议尽快分配。
- **[#7672] 类型化 ToolChoice**（[链接](https://github.com/nearai/ironclaw/issues/7672)）：跨 6 个 adapter 的重构，预计工作量大，建议在性能优化告一段落后作为独立里程碑规划。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

### 1. 今日速览

过去24小时项目处于“低频维护、批量清理”状态。Issue 数量虽多（18条），但绝大多数为历史遗留问题的自动过期关闭（16条），仅2条活跃。PR侧同样以Dependabot自动依赖升级为主，另有1条重要功能修复（cron yield）被合并。无新版本发布。项目核心开发活跃度较低，维护重心在于自动清理陈旧任务与持续集成依赖更新。

---

### 2. 版本发布

无新版本发布。

---

### 3. 项目进展

今日合并/关闭的 PR 中，有一条值得关注的功能修复：

- **[PR #2234] [CLOSED] fix(openclaw): cron yield descendant finalization** — [链接](https://github.com/netease-youdao/LobsterAI/pull/2234)
  - 修复了 `sessions_yield` 后子 agent 完成事件无法驱动父 agent 继续执行的问题。
  - 增加了 yield continuation 循环，支持多轮驱动父 agent 直至所有 descendant 完成，覆盖了普通会话、cron 并行、cron 串行三种场景。
  - 该修复显著提升了 cron 任务中多 agent 协作的稳定性，是底层执行逻辑的一次关键补强。

> 其余关闭的 PR 为依赖自动升级（[#2164](https://github.com/netease-youdao/LobsterAI/pull/2164)、[#2165](https://github.com/netease-youdao/LobsterAI/pull/2165)、[#2166](https://github.com/netease-youdao/LobsterAI/pull/2166)、[#2167](https://github.com/netease-youdao/LobsterAI/pull/2167)），涉及 trufflehog、actions/checkout、paths-filter、actions/stale 工具链更新，无业务逻辑变更。

---

### 4. 社区热点

今日所有 Issue/PR 均无新增评论，讨论热度处于冰点。近期评论数相对较多（4条）的历史 Issue 为：

- **[Issue #1849] [CLOSED] 追问时会出现无限NO_REPLY或者输出几个文字就直接不输出了** — [链接](https://github.com/netease-youdao/LobsterAI/issues/1849)
  用户反馈任务被提前 complete 但模型仍在输出，导致页面无数据响应。核心诉求是提升流式输出与任务状态同步的健壮性。

该问题已被标记为 stale 并关闭，但根据数据，此 Bug 对交互体验影响较大，可能仍存在于特定场景中。建议维护者关注是否有同类问题复现报告。

---

### 5. Bug 与稳定性

今日活跃的 Bug 类 Issue 仅有 2 个，均处于开启状态且已被标记为 stale：

- **[Issue #1903] [OPEN] 会员登录频繁失败** — [链接](https://github.com/netease-youdao/LobsterAI/issues/1903)
  - 严重程度：**高**（影响网易付费模型使用）。用户反馈无法登录，导致付费功能不可用。
  - 状态：长期未响应，无关联 fix PR。

- **[Issue #2046] [OPEN] OpenClaw/LobsterAI产品建议：Agent 记忆体系** — [链接](https://github.com/netease-youdao/LobsterAI/issues/2046)
  - 虽名为产品建议，但内容包含对当前记忆机制缺陷的详细描述（如标题存于 IndexedDB 导致 Agent 不可读、跨 session 信息丢失等），实质上反映了功能性短板。
  - 状态：长期未响应。

> 过去24小时内无新增 Bug 报告。近期已关闭的若干 Bug（如 [Issue #1971](https://github.com/netease-youdao/LobsterAI/issues/1971) 虚拟滚动异常、[Issue #1988](https://github.com/netease-youdao/LobsterAI/issues/1988) 阿里百炼模型调用问题）均无修复 PR 关联，仅因超时自动关闭，问题是否已解决存疑，建议维护者核查。

---

### 6. 功能请求与路线图信号

今日无新功能请求。历史遗留的强功能建议仍在积压池中，值得关注：

- **[Issue #1880] [CLOSED] 希望增加Hermes Agent功能** — [链接](https://github.com/netease-youdao/LobsterAI/issues/1880)
  用户请求接入 Hermes Agent 作为可选 Agent 引擎。
- **[Issue #2016] [CLOSED] 建议增加openhuman引擎功能** — [链接](https://github.com/netease-youdao/LobsterAI/issues/2016)
  用户建议增加 openhuman 引擎支持。

这两条请求均被自动关闭，未见官方回应或相关 PR。目前无迹象表明将纳入下一版本路线图。

---

### 7. 用户反馈摘要

从近期 Issue 内容中提炼的用户反馈：

- **付费用户受阻**：[Issue #1903](https://github.com/netease-youdao/LobsterAI/issues/1903) 中用户明确表示“会员登录不进去，无法使用网易付费的模型”，这是直接影响商业转化的核心痛点。
- **第三方模型兼容性差**：[Issue #1988](https://github.com/netease-youdao/LobsterAI/issues/1988) 用户报告版本更新后，阿里百炼的 qwen3.6-plus 被强制指向网易模型并报错，且配置修改无效，导致第三方模型不可用。
- **本地部署门槛高**：[Issue #2017](https://github.com/netease-youdao/LobsterAI/issues/2017) 用户反馈本地运行无法使用，提示需要先执行打包前构建脚本，配置流程对普通开发者不友好。
- **IM 集成体验欠缺**：[Issue #1878](https://github.com/netease-youdao/LobsterAI/issues/1878) 微信扫码后要求在客户端输入验证码但界面缺失，导致配置流程中断。
- **UI/UX 批评**：[Issue #1836](https://github.com/netease-youdao/LobsterAI/issues/1836) 用户直言界面“相比起其他竞品过于丑了”，可见客户端视觉设计评分较低。
- **安全关注**：[Issue #1885](https://github.com/netease-youdao/LobsterAI/issues/1885) 用户报告邮箱 Skill 存在路径穿越漏洞，说明安全审计仍需常态化。

---

### 8. 待处理积压

以下为长期未得到官方响应或修复的重要 Issue/PR，提醒维护者优先关注：

- **[Issue #1903] [OPEN] 会员登录频繁失败** — [链接](https://github.com/netease-youdao/LobsterAI/issues/1903)
  创建于 2026-05-07，近3个月无回应，影响付费用户核心功能。

- **[Issue #2046] [OPEN] Agent 记忆体系产品建议** — [链接](https://github.com/netease-youdao/LobsterAI/issues/2046)
  创建于 2026-05-25，详述了跨 session 记忆缺失问题，涉及产品核心能力。

- **[PR #1879] [CLOSED] fix: preserve manually-added plugin load paths on config sync** — [链接](https://github.com/netease-youdao/LobsterAI/pull/1879)
  修复了配置同步时覆盖手动添加插件路径的问题。该 PR 虽已关闭，但未标注是否合并或关闭原因，若未合并则社区贡献者的工作将白费。

> 综合来看，项目当前处于“清理期”，核心开发迭代速度放缓。大量曾报告的真实 Bug（登录失败、模型调用冲突、本地运行阻塞）尚未有明确的修复 PR，这些遗留问题将是影响用户留存率的主要风险。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

### 1. 今日速览

Moltis 项目在 2026-08-16 展现高强度的合并节奏，24 小时内关闭/合并 14 个 PR，其中包含多项关键修复与功能落地。安全加固（路径穿越、节点配对签名）、Sandbox 构建修复（gogcli/wacrawl 仓库迁移）、以及主会话管理问题的修复均已完成，解决了此前阻塞用户的核心痛点。此外，包括 Coder 远程工作区支持与 Slack 原生任务卡片在内的新功能已就绪（待合并或刚合并），显示项目在 AI 助手及远程执行领域的持续拓展。Issue 侧趋于稳定，两起遗留 Bug 已随 PR 修复关闭，无新增问题报告。

### 2. 版本发布

过去 24 小时内无新版本发布。相关 PR 目前仍处于合并状态，预计将在下一个版本（Minor 或 Patch）中体现。

### 3. 项目进展

今日合并的 PR 标志着围绕 "Security Hardening" 和 "Sandbox 可用性" 的两大攻坚战役正式收官。

- **安全修复（已合并）**：
    - [PR #1180](https://github.com/moltis-org/moltis/pull/1180) **harden model and zip paths**：修复恶意 ZIP 或 HuggingFace 仓库导致任意文件写入的漏洞，消除潜在的 RCE（远程代码执行）风险。
    - [PR #1179](https://github.com/moltis-org/moltis/pull/1179) **verify node pairing signatures**：通过绑定服务器签发的待处理请求，防止调用者提供自己的密钥或挑战值，加强了网关配对流程的认证逻辑。
- **Sandbox 构建修复（已合并）**：
    - [PR #1191](https://github.com/moltis-org/moltis/pull/1191) 与 [PR #1192](https://github.com/moltis-org/moltis/pull/1192) **修复 gogcli/wacrawl 仓库迁移导致的构建失败**。上游项目转移至 openclaw 组织，导致所有预构建镜像的 Sandbox 环境 `go install` 步骤失败，现已兼容新路径。
- **功能优化（已合并）**：
    - [PR #1182](https://github.com/moltis-org/moltis/pull/1182) **允许删除/归档 main session**：回应了用户长期以来的痛点（Issue #1132）。
    - [PR #1195](https://github.com/moltis-org/moltis/pull/1195) **Slack 原生任务卡片**；[PR #1196](https://github.com/moltis-org/moltis/pull/1196) **修复 ClawHub 搜索超时**；[PR #1197](https://github.com/moltis-org/moltis/pull/1197) **命令面板直达 Agent 聊天**；[PR #1198](https://github.com/moltis-org/moltis/pull/1198) **OpenAI 推理工具调用路由至 Responses API**。

**待合并中（2 个）**：[PR #1186](https://github.com/moltis-org/moltis/pull/1186) 修复 Vault 恢复短语大小写/连字符归一化问题；[PR #1199](https://github.com/moltis-org/moltis/pull/1199) 新增 Coder 远程工作区 Sandbox 支持，将极大扩展 Moltis 在云端开发环境中的执行能力。

---

### 4. 社区热点

暂无单条 Issue/PR 出现激烈的评论争论，但 [PR #1190](https://github.com/moltis-org/moltis/pull/1190)（添加持久化日历/频道/邮件连接器）获得了较多关注。该 PR 体量巨大，引入了 provider-neutral 的持久化、调度及本地全文本搜索机制，体现了社区对 Moltis 作为长期运行的个人 AI 助手在数据持久化与外部服务集成（CalDAV、Gmail）方面的强烈需求。

---

### 5. Bug 与稳定性

过去 24 小时内无新 Bug 报告，两起存量 Bug 均已修复并关闭，项目稳定性表现良好。

| 严重程度 | 问题 | 修复 PR | 状态 |
| :--- | :--- | :--- | :--- |
| **高（已修复）** | [Issue #1189](https://github.com/moltis-org/moltis/issues/1189) Sandbox 构建因 gogcli URL 失效而失败，阻塞所有依赖预构建镜像的开发流程。 | [PR #1191](https://github.com/moltis-org/moltis/pull/1191) | 已合并 |
| **中（已修复）** | [Issue #1132](https://github.com/moltis-org/moltis/issues/1132) `main` 会话无法删除/归档，导致会话管理界面出现不可用选项。 | [PR #1182](https://github.com/moltis-org/moltis/pull/1182) | 已合并 |

---

### 6. 功能请求与路线图信号

- **远程工作区支持（已实现）**：社区对 Coder 远程 Workspace 的支持 ([PR #1199](https://github.com/moltis-org/moltis/pull/1199)) 已提交，结合现有的 Sandbox 逻辑，该项目正朝着多环境、远程化的 Agent 代码执行方向发展。
- **丰富的外部服务集成（扩展中）**：大规模新增日历/邮件/频道连接器 ([PR #1190](https://github.com/moltis-org/moltis/pull/1190))，表明项目战略正从单纯的聊天环境拓展为更广义的 "AI 工作流中枢"。
- **Vault 易用性修复（预计下一版）**：[PR #1186](https://github.com/moltis-org/moltis/pull/1186) 对恢复短语进行归一化处理，将解锁用户在输入助记词时大小写写错或附带连字符的场景。

---

### 7. 用户反馈摘要

- **（积极）安全团队反馈**：来自贡献者 tsauvajon 的反馈表明，外部开发者在实际部署评估中发现了 Zip Slip 类漏洞及节点配对逻辑缺陷，相关修复权限已交付上游，体现了项目健康的安全协同机制。
- **（痛点已解决）Sandbox 环境不可用**：用户 Lstarsky0 反馈 `moltis sandbox build` 在现有版本中几乎不可用（因上游 Go 模块仓库迁移导致），且 macOS 环境下 `just` 配方执行失败（[PR #1194](https://github.com/moltis-org/moltis/pull/1194)）。上述问题均在今日获得修复。
- **（功能期待）内存后端自托管**：用户 demyanrogozhin 提交了针对 Zvec 向量数据库的后端实现（[PR #1158](https://github.com/moltis-org/moltis/pull/1158)），展示了社区对不依赖外部托管服务的、可本地运行的记忆存储方案的实际需求。

---

### 8. 待处理积压

- **PR（待审）**：
    - [PR #1186](https://github.com/moltis-org/moltis/pull/1186) - **Vault 恢复短语归一化**（已开 7 天）：该修复逻辑简单且带有测试覆盖，对用户体验有较大补益，建议维护者优先审查。
    - [PR #1158](https://github.com/moltis-org/moltis/pull/1158) - **Zvec 记忆后端**（已开 30 天）：该 PR 涉及新依赖与后端接入，属重大功能变更，建议维护者明确回复是否接受该路线，以引导社区贡献。

- **Issue（长期未决）**：
    - 暂无超期未处理的 Critical Issue。所有待处理项均关联了对应的开启 PR，维护者应重点跟进上述 PR 的 code review 进度，避免修复分支与主线产生大量冲突。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报 — 2026-08-16

---

## 1. 今日速览

过去 24 小时 CoPaw（QwenPaw）项目保持高活跃度：共更新 10 条 Issue（9 条新开/活跃，1 条关闭）和 11 条待合并 PR，无新版本发布。Issue 侧呈现显著的"视频功能缺陷"集中爆发（#7059、#7060 同源），另有 3 条 CLI/Console 功能回归类 Bug；PR 侧则出现 4 条首次贡献者提交（first-time-contributor），覆盖视频修复、Matrix 群组隔离、Chrome 远程桥接与聊天分页，社区贡献通道健康。值得关注的是，所有 11 条 PR 均为待合并状态，合并通道存在一定积压。

---


## 2. 版本发布

过去 24 小时无新版本发布。当前最新版本为 v2.1.0。

---


## 3. 项目进展

今日**无 PR 被合并或关闭**（11 条全部处于 Open/待合并状态），项目合并通道暂歇。但待合并队列中有多项高价值 PR 值得关注：

| PR | 功能概述 | 状态 |
|---|---|---|
| [#6940](https://github.com/agentscope-ai/QwenPaw/pull/6940) | 新增原生 DataPaw 应用运行时与持久化分析工作区 | 待合并，含截图与 infra 仓库 |
| [#6302](https://github.com/agentscope-ai/QwenPaw/pull/6302) | 统一 provider 发现、模型元数据、路由与 agent 控制（catalog 驱动） | 待合并，跨模块重构 |
| [#7033](https://github.com/agentscope-ai/QwenPaw/pull/7033) | 技能系统动态加载 + 自动卸载 + frontmatter 修复 | 待合并 |
| [#7001](https://github.com/agentscope-ai/QwenPaw/pull/7001) | Matrix 群组房间按 sender 隔离会话与记忆 | 待合并，修复多用户共享上下文问题 |

**关键观察**：若 [#6940](https://github.com/agentscope-ai/QwenPaw/pull/6940)（DataPaw 运行时）与 [#6302](https://github.com/agentscope-ai/QwenPaw/pull/6302)（Provider 体系重构）落地，将实质性扩展 CoPaw 的应用形态与多 provider 管理能力，建议维护者优先推进评审。

---


## 4. 社区热点

**今日最热 Issue：**[#6476](https://github.com/agentscope-ai/QwenPaw/issues/6476) — Matrix 端到端加密不可用（3 条评论，已关闭）。该问题暴露了依赖链断裂：`matrix-nio` 需要 `olm` 库，但系统级 `libolm` 与 Python 侧 `vodozemac` 之间的替代关系不清，社区通过三条命令逐步排查（apt 装 libolm → pip 装 matrix-nio[e2e] → 仍失败）。**虽今日已关闭，但社区对 Matrix 通道的加密可靠性仍有潜在疑虑**。

**次热：**[#3915](https://github.com/agentscope-ai/QwenPaw/issues/3915) — Console WebUI 引入虚拟滚动以解决长对话性能退化（3 条评论，1 👍）。持续近 4 个月未关闭，是 UI 性能方向的高频诉求，与今日新开的 [#7049](https://github.com/agentscope-ai/QwenPaw/pull/7049)（聊天分页 PR）形成呼应——**分页可能是该 Issue 的阶段性解法**。

**PR 侧评论数普遍为 0**，目前缺乏社区对 PR 的公开讨论，评审反馈主要依赖维护者内部流程。

---


## 5. Bug 与稳定性

### 严重（功能性缺陷）

| Issue | 问题 | 严重性 | 状态 |
|---|---|---|---|
| [#7059](https://github.com/agentscope-ai/QwenPaw/issues/7059) | `view_video` 工具结果视频帧被静默丢弃，模型收不到任何帧（OpenAI Responses / Volcengine Ark） | 高 — 静默失败，难以察觉 | 已有修复 PR：[#7061](https://github.com/agentscope-ai/QwenPaw/pull/7061) |
| [#7060](https://github.com/agentscope-ai/QwenPaw/issues/7060) | `view_video` 内联媒体上限硬编码为 2 MB，provider 设置不生效 | 高 | 已在 [#7061](https://github.com/agentscope-ai/QwenPaw/pull/7061) 中一并处理 |
| [#7053](https://github.com/agentscope-ai/QwenPaw/issues/7053) | OAuth2 刷新令牌不轮换、无主动续期 → 远程 MCP 永久降级为手动重新认证 | 高 — 影响远程 MCP 服务持续性 | 无 PR，待维护者设计 |

### 中（功能回归/异常）

| Issue | 问题 | 状态 |
|---|---|---|
| [#7051](https://github.com/agentscope-ai/QwenPaw/issues/7051) | Console 聊天中的图片附件在会话重载后丢失（前端显示损坏缩略图） | 无 PR |
| [#7048](https://github.com/agentscope-ai/QwenPaw/issues/7048) | `qwenpaw cron update --text` 返回成功但 prompt 未更新（agent 类型任务） | **已修复**，见 PR [#7055](https://github.com/agentscope-ai/QwenPaw/pull/7055) |

### 轻（体验）

| Issue | 问题 | 状态 |
|---|---|---|
| [#6476](https://github.com/agentscope-ai/QwenPaw/issues/6476) | Matrix 端到端加密不可用（依赖 olm/vodozemac 混乱） | 已关闭（可能未根治） |

---


## 6. 功能请求与路线图信号

| 需求 | 来源 | 对应 PR / 路线图信号 |
|---|---|---|
| 后台任务完成自动通知/回调（非轮询） | [#7056](https://github.com/agentscope-ai/QwenPaw/issues/7056) | 无直接 PR，但属于 API 能力增强方向 |
| 插件 API 支持 `system_prompt` 权限（公司内部提示词不可见） | [#7052](https://github.com/agentscope-ai/QwenPaw/issues/7052) | 无 PR，属安全/权限模型扩展 |
| Web UI 恢复原生 context 策略选项（native/scroll） | [#7058](https://github.com/agentscope-ai/QwenPaw/issues/7058) | 后端已支持 `Literal["native","scroll"]`，仅 UI 层移除——**低成本修复** |
| Console WebUI 虚拟滚动/分页 | [#3915](https://github.com/agentscope-ai/QwenPaw/issues/3915) | 部分落地：PR [#7049](https://github.com/agentscope-ai/QwenPaw/pull/7049)（GET /chats/{chat_id} 分页） |
| 每个 cron job 独立模型选择 | [#7050](https://github.com/agentscope-ai/QwenPaw/pull/7050) | 后端契约已存在，PR 补齐 UI 层 |

**路线图信号**：今日 PR 列表呈现三个明确方向——①跨模块统一（provider/模型/路由，[#6302](https://github.com/agentscope-ai/QwenPaw/pull/6302)）；②应用运行时扩展（DataPaw，[#6940](https://github.com/agentscope-ai/QwenPaw/pull/6940)）；③渠道级功能完善（Matrix 会话隔离、Chrome 远程桥接）。这三个方向可能构成 v2.2 的核心框架。

---


## 7. 用户反馈摘要

### 真实痛点

1. **视频处理可靠性是当前最大痛点**。用户在 [#7059](https://github.com/agentscope-ai/QwenPaw/issues/7059) 中描述："返回 'Video loaded' 看起来成功，但模型从未收到任何帧——无错误、无警告，完全静默失败"。这种静默失败类型让用户难以定位问题边界。

2. **OAuth2 刷新机制缺陷导致生产环境频繁中断**（[#7053](https://github.com/agentscope-ai/QwenPaw/issues/7053)）。用户明确指出后果："远程 MCP 永久降级为手动重新认证"，对依赖远程 MCP 的自动化工作流影响严重。

3. **CLI 命令"假成功"问题**（[#7048](https://github.com/agentscope-ai/QwenPaw/issues/7048)）。用户执行更新命令返回代码 0 和任务 JSON，但 prompt 实际未变化——"看起来成功"但什么都没发生的反馈模式反复出现（视频、CLI 两处），提示 CoPaw 在命令结果可观测性上仍有改进空间。

### 使用场景

- **企业插件集成**（[#7052](https://github.com/agentscope-ai/QwenPaw/issues/7052)）：公司做插件互动界面，要求 system prompt 不可见，涉及多租户隐私边界
- **远程 MCP 服务**（[#7053](https://github.com/agentscope-ai/QwenPaw/issues/7053)）：XMind 等第三方 MCP 服务使用轮换 refresh token
- **桌面端长会话**（[#3915](https://github.com/agentscope-ai/QwenPaw/issues/3915)）：长时间运行的对话导致 Console 界面严重卡顿

### 满意/不满意

- **不满意**：静默失败类问题（视频帧丢弃、CLI 假成功、图片附件丢失）——用户无法判断操作是否生效
- **消极确认**：视频功能从"不可用"到"可用但静默丢弃"的过渡说明功能在演进，但质量门槛尚未达标

---


## 8. 待处理积压

| 项目 | 创建时间 | 年龄 | 备注 |
|---|---|---|---|
| [#3915](https://github.com/agentscope-ai/QwenPaw/issues/3915) — Console WebUI 虚拟滚动 | 2026-04-28 | 约 3.5 个月 | 1 👍、3 评论，长期未解决；已有分页 PR 提供部分解法 |
| [#6476](https://github.com/agentscope-ai/QwenPaw/issues/6476) — Matrix E2E 加密不可用 | 2026-07-26 | 约 3 周 | 今日关闭但修复路径不清晰，`olm` vs `vodozemac` 依赖关系仍混乱，建议确认修复方案是否完整落地 |
| PR [#6623](https://github.com/agentscope-ai/QwenPaw/pull/6623) — ACP 通知竞态导致最终文本丢失 | 2026-08-01 | 15 天 | 带 first-time-contributor 标签且标记 "Under Review"，但 15 天仍未合并，建议尽快评审以免打击新贡献者积极性 |
| PR [#6302](https://github.com/agentscope-ai/QwenPaw/pull/6302) — Provider 体系统一重构 | 2026-07-21 | 26 天 | 跨模块大 PR，长时间待合并，若长期搁置可能出现大规模冲突，建议安排专项评审 |

---

*日报生成时间：2026-08-16 | 数据源：CoPaw GitHub 仓库 | 客观评估：项目整体活跃度高（Issue+PR 双 10+），社区贡献通道开放（4 个 first-time-contributor），但存在合并积压（11 条 PR 待合并）和视频链路质量短板，建议优先推进视频修复 [#7061](https://github.com/agentscope-ai/QwenPaw/pull/7061) 和长期搁置的 PR [#6302](https://github.com/agentscope-ai/QwenPaw/pull/6302) 评审。*

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