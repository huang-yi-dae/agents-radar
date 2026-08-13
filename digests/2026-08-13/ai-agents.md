# OpenClaw 生态日报 2026-08-13

> Issues: 500 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-08-13 01:42 UTC

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

# OpenClaw 项目动态日报 — 2026-08-13

## 今日速览

OpenClaw 项目在过去 24 小时内保持了极高的社区活跃度，共产生 500 条 Issue 更新和 500 条 PR 更新。聊天通道集成（Telegram/Discord/Slack/Matrix/Teams）与子代理（subagent）消息传递可靠性是当日的两大核心痛点，合计占据热门问题的一半以上。值得关注的是，维护者 steipete 今日集中提交了 8 个 PR，覆盖 Web UI 和会话管理多项缺陷修复，展现出活跃的内部修复节奏。此外，多个历史遗留问题仍有持续讨论，部分跨越数月仍未解决，项目健康度处于"高活跃但待清理积压"的状态。

---

## 项目进展

今日无新版本发布，但维护者 steipete 批量提交了 8 个 PR，显示出对 Web UI 和会话管理问题的集中修复势头。此外，平台集成方面也有重要修复推进：

- **PR #122878**（Discord 入口阻塞修复）：修复了 Discord 重试耗尽后入口被永久阻塞、毒事件持续挂起的问题。该 PR 同时涉及多通道（Discord/Mattermost/Teams/Signal/Feishu）的兼容性调整，标记为 `merge-risk: 🚨 compatibility`。链接：https://github.com/openclaw/openclaw/pull/122878
- **PR #122315**（Teams 媒体限制修复）：修复 Microsoft Teams 入站附件在低于 `mediaMaxMb` 限制时仍被拒绝的问题。链接：https://github.com/openclaw/openclaw/pull/122315
- **PR #122557** 与 **PR #122556**（Matrix 草稿可见性修复）：两个 PR 均针对 Matrix 直播间草稿在替换回复确认送达前被提前删除的问题，前者为 AI 辅助，且刻意不自动关闭关联 Issue，行为谨慎。链接：https://github.com/openclaw/openclaw/pull/122557 、 https://github.com/openclaw/openclaw/pull/122556
- **PR #119909**（会话历史误删修复）：修复 `session.maintenance.highWaterBytes` 设置为 0 时，会错误删除所有会话历史的关键问题（P0）。链接：https://github.com/openclaw/openclaw/pull/119909
- **PR #122684**（CLI 图片发送修复）：修复 CLI 用户使用非默认工作区时图片被拒绝的问题。链接：https://github.com/openclaw/openclaw/pull/122684
- **维护者集中提交**：steipete 提交的 8 个 PR 覆盖会话停止控制、模型选择器、GitHub 项目选择、图片预览、恢复提示归属等多个缺陷修复。链接：https://github.com/openclaw/openclaw/pull/122910 、 https://github.com/openclaw/openclaw/pull/122909 、 https://github.com/openclaw/openclaw/pull/122908 、 https://github.com/openclaw/openclaw/pull/122907 、 https://github.com/openclaw/openclaw/pull/122906 、 https://github.com/openclaw/openclaw/pull/122905

---

## 社区热点

今日讨论量最高的 Issue 仍为 **#121058**（评论 91 条），该问题追踪"静默回复失败"（silent reply failures）在 #116277 关闭后持续复发，监控 cron 仍持续记录新故障。高讨论量表明用户对已关闭问题未真正修复的愤怒情绪明显。

**子代理消息丢失问题**形成了明显的讨论集群，多个高评论 Issue 同源（#44925、#67777、#92433、#96975、#47975），用户在多个场景下报告子代理完成结果被静默丢弃：超时无重试、直接投递失败后条件队列回退也失败、以及 announce 被引导至已结束的运行等。这些讨论指向一个根本性设计缺陷：**子代理完成投递链路缺乏持久化保障**。

另一个值得注意的趋势是 **"clawsweeper" 自动标签系统的覆盖**。大量 Issue 被标记为 `clawsweeper:no-new-fix-pr` 和 `clawsweeper:needs-maintainer-review`，暗示已有自动化流程在追踪问题是否获得修复 PR，但多数问题仍停留在"等待维护者审阅"阶段，社区对此的耐心正在消耗。

- 链接：https://github.com/openclaw/openclaw/issues/121058 、 https://github.com/openclaw/openclaw/issues/44925 、 https://github.com/openclaw/openclaw/issues/67777 、 https://github.com/openclaw/openclaw/issues/92433

---

## Bug 与稳定性

### 严重级别：P0

- **PR #119909**：`highWaterBytes` 配置为 0 时，会删除所有会话历史。已有修复 PR，等待合并。链接：https://github.com/openclaw/openclaw/pull/119909

### 严重级别：P1

- **#121058**：静默回复失败在 #116277 关闭后持续复发，监控 cron 每日记录新故障，无修复 PR。链接：https://github.com/openclaw/openclaw/issues/121058
- **#44925**：子代理完成结果静默丢失，无重试、无通知、超时无自动重启，已有 26 条评论，无修复 PR。链接：https://github.com/openclaw/openclaw/issues/44925
- **#92433**：子代理完成投递在 announce 被引导至已结束的运行时被静默丢弃，有复现源，无修复 PR。链接：https://github.com/openclaw/openclaw/issues/92433
- **#91363**：隔离 cron 任务一致地以 "LLM request failed" 失败，模型请求从未到达提供商（usage.input=0），无修复 PR。链接：https://github.com/openclaw/openclaw/issues/91363
- **#89278**：Codex OAuth 刷新成功但 cron/heartbeat 因 10 秒超时失败，认证状态与服务实际可用性不一致，无修复 PR。链接：https://github.com/openclaw/openclaw/issues/89278
- **#43374**：多代理并发时所有 LLM API 调用同时超时（约 60-90 秒周期性），API 本身可访问，属内部并发问题，无修复 PR。链接：https://github.com/openclaw/openclaw/issues/43374
- **#97983**：iOS/WebChat 消息追加到 transcript 但不触发助手回复，--deliver 无法送达，无修复 PR。链接：https://github.com/openclaw/openclaw/issues/97983
- **#111498**：Anthropic 认证恢复后，持久化的 workspace-state 迁移阻塞主代理所有请求，无修复 PR。链接：https://github.com/openclaw/openclaw/issues/111498

### 严重级别：P2（代表性）

- **#107814**：`gpt-5.3-codex-spark` 对必需参数的工具调用发出空参数对象，导致每次调用被 schema 验证拒绝。链接：https://github.com/openclaw/openclaw/issues/107814
- **#115001**：混合记忆搜索通过 FTS LIKE-fallback 硬编码 textScore 返回虚假的 1.0 相似度分数。已有关联 PR 打开。链接：https://github.com/openclaw/openclaw/issues/115001
- **#97616**：OpenClaw 泄漏未回收的 hook/tool 子进程，导致僵尸进程累积和运行时性能下降。链接：https://github.com/openclaw/openclaw/issues/97616
- **#78493**：`sudo openclaw update` 造成混合属主，随后 `doctor` 在 EACCES 后覆盖配置。链接：https://github.com/openclaw/openclaw/issues/78493

---

## 功能请求与路线图信号

- **#7707**（Memory Trust Tagging by Source）：建议按来源为用户命令、网页抓取、第三方技能标记记忆条目的信任级别，以防御记忆投毒攻击。该 Issue 同时被标记为 `needs-security-review` 与 `needs-product-decision`，已有 45 条评论，讨论了两个月仍在等待产品决策，安全团队关注度较高。链接：https://github.com/openclaw/openclaw/issues/7707
- **#39604**（添加 `tools.web.fetch.allowPrivateNetwork` 配置项）：以 12 个 👍 成为今日赞同数最高的功能请求。该 PR 已关闭（`close:already-fixed`），建议验证后合入文档。链接：https://github.com/openclaw/openclaw/issues/39604
- **#45508**（自托管 STT/TTS 提供商支持）：WebChat 的"朗读"和"语音输入"目前完全忽略 openclaw.json 中的 TTS/STT 配置，浏览器 Web Speech API 绕过了网关。该需求与 `impact:auth-provider` 关联，可能涉及架构调整，短期内纳入版本的可能性较低。链接：https://github.com/openclaw/openclaw/issues/45508
- **#45758**（YAML 配置格式支持）：用户请求在 JSON5 之外增加 YAML 作为备选配置格式，理由是 YAML 在 DevOps 工具链中被广泛使用且更易读。当前标记为 P3，可预期优先级较低。链接：https://github.com/openclaw/openclaw/issues/45758
- **#16555**（投递队列消息 TTL/过期）：建议为网关重启后的投递队列增加可配置 TTL，防止陈旧/孤儿条目在重启后洪泛频道。与今日子代理消息丢失讨论集群高度相关。链接：https://github.com/openclaw/openclaw/issues/16555
- **多代理稳定性**：#43367（并发 `agents add` 不安全、会话锁失败）与 #47975（子代理会话持久化后主会话无响应）共同指向多代理编排的可靠性问题，这可能是下一版本需要优先投入的领域。链接：https://github.com/openclaw/openclaw/issues/43367 、 https://github.com/openclaw/openclaw/issues/47975

---

## 用户反馈摘要

- **"问题关闭了但没修好"**：多个用户在 #121058 中表达了强烈不满。该问题在 #116277 关闭后持续复发，监控 cron 每天记录新故障，用户认为维护者"关闭 Issue 但不解决根本问题"的做法令人沮丧。
- **"3 个人的记忆管理方式完全不同"**：#43747 中用户描述了自己和两位同事使用 OpenClaw 时，记忆管理行为各不一致——有的在做 chunking/embedding 存 SQLite，有的存 JSON 文件，有的使用 mem0 插件。该反馈说明记忆架构缺乏统一的、可预期的行为。链接：https://github.com/openclaw/openclaw/issues/43747
- **"嵌入式运行的 auth 阶段每次阻塞 10-15 秒"**：#75782 用户指出每次 `[trace:embedded-run]` 启动时 auth 阶段都同步阻塞事件循环 10-15 秒，即使删除所有 OAuth 凭据后仍然如此。该性能问题对多代理网关影响显著。链接：https://github.com/openclaw/openclaw/issues/75782
- **"4 个并发代理时所有 LLM 调用同时超时"**：#43374 用户通过 curl 验证了 API 本身可访问，但 OpenClaw 内部 4 个代理同时运行时所有调用都以超时告终，说明问题出在 OpenClaw 内部而非模型提供商。链接：https://github.com/openclaw/openclaw/issues/43374
- **"sudo update 后文件属主混乱，doctor 把配置覆盖了"**：#78493 用户报告在 macOS 上执行 `sudo openclaw update` 后文件和配置属主混乱，后续 `openclaw doctor` 因 EACCES 读取失败后直接覆盖了配置。这是一个破坏性的操作链问题。链接：https://github.com/openclaw/openclaw/issues/78493
- **"屏幕阅读器会逐 token 朗读流式输出"**：#65538（已关闭）中用户报告 NVDA 等屏幕阅读器因 aria-live="polite" 导致每个 token 都被朗读，该问题已被标记为 `close:already-fixed`。链接：https://github.com/openclaw/openclaw/issues/65538

---

## 待处理积压

以下 Issue 长期未获维护者有效响应，或虽有标签跟进但无实质修复进展：

- **#7707**（Memory Trust Tagging by Source，45 条评论）：2 月 3 日创建，已讨论半年，仍停留在 `needs-product-decision` 和 `needs-security-review`。安全相关功能长期悬而未决值得关注。链接：https://github.com/openclaw/openclaw/issues/7707
- **#121058**（Silent reply failures，91 条评论）：8 月 9 日创建但关联的 #116277 关闭后故障仍持续，是目前社区情绪最激烈的 Issue，需要维护者给出明确回应。链接：https://github.com/openclaw/openclaw/issues/121058
- **#77700**（Prepared Runtime Resolution Migration，追踪 Issue）：5 月 5 日创建，标记为 `maintainer` 但至今仍停留在 `needs-maintainer-review`，无实质推进。链接：https://github.com/openclaw/openclaw/issues/77700
- **#77598**（Track live dev agent behavior）：同样为 `maintainer` 追踪 Issue，5 月 5 日创建后已有 23 条评论但无结论性更新。链接：https://github.com/openclaw/openclaw/issues/77598
- **#51762**（PR：honor configured default agent in storage scans）：3 月 21 日创建，已等待近 5 个月，状态为 `⏳ waiting on author`，疑似作者未响应。链接：https://github.com/openclaw/openclaw/pull/51762
- **#119001**（PR：feat(codex) bind native realtime voice）：8 月 3 日创建的大型 PR（size: XL），涉及多通道和扩展，当前标记为 `📣 needs proof` 和 `triage: needs-pr-context`，需要维护者尽快补充上下文。链接：https://github.com/openclaw/openclaw/pull/119001

---

**报告生成时间**：2026-08-13 | **数据来源**：openclaw/openclaw GitHub 仓库

---

## 横向生态对比

# 个人 AI 助手开源生态横向对比分析报告

**报告日期**：2026-08-13


## 1. 生态全景

个人 AI 助手/自主智能体开源生态整体处于**高活跃、密集迭代**阶段，但**稳定性问题正在成为普遍瓶颈**。以 OpenClaw 为核心的项目集群（PicoClaw、NanoClaw、Zeroclaw、IronClaw、CoPaw 等）当日合计产生超 1,100 条 Issue/PR 更新，其中**多代理消息可靠性、通道集成稳定性、长任务中断**是跨项目反复出现的共性问题。各项目普遍处于"功能快速扩张但技术债持续累积"的状态：安全加固（SSRF、路径校验、凭证泄露）成为近期合并 PR 的主旋律，而测试覆盖缺口（尤其是 Windows 平台）和 PR 积压问题在多个项目中同步显现。生态整体呈**OpenClaw 绝对主导 + 外围差异化竞争**的格局。

## 2. 各项目活跃度对比

| 项目 | Issues | PRs | Release | 健康度评估 |
|:---|:---|:---|:---|:---|
| **OpenClaw** | 500 | 500 | 无 | ★★★★☆ 极高活跃，但大量积压与复发问题并存 |
| **Zeroclaw** | 45 活跃 | 31 待合并 | 无 | ★★★★☆ 高质量安全修复密集，Windows 测试缺口待解 |
| **IronClaw** | 41 | 50 | 2 个 RC 版 | ★★★★☆ 发布前冲刺，Telegram 通道存在 P1 阻塞 |
| **CoPaw (QwenPaw)** | 30（23 活跃） | 43（27 待合并） | v2.1.0-beta.4 | ★★★☆☆ 高活跃，Agent 循环缺陷与死循环问题突出 |
| **NanoBot** | 8 | 36 | 无 | ★★★★☆ 安全加固显著，少量待合并 PR 积压 |
| **NanoClaw** | 4 新开 | 10（9 待合并） | 无 | ★★★☆☆ 核心功能推进但新功能引入回归，旧 PR 积压 |
| **PicoClaw** | 2 | 3 | 无 | ★★☆☆☆ 中等活跃，合并节奏偏慢，高严重度问题无进展 |
| **LobsterAI** | 6（4 活跃） | 8（7 合并） | 无 | ★★★☆☆ 合并节奏稳定，但信任危机级 Issue 悬置 4 个月 |
| **NullClaw / TinyClaw / Moltis / ZeptoClaw / EasyClaw** | — | — | — | 无活动 |

## 3. OpenClaw 在生态中的定位

- **绝对规模领先**：单日 1,000 条 Issue/PR 更新，是第二名 Zeroclaw 的 10 倍、IronClaw 的 12 倍，社区体量呈数量级碾压。
- **技术路线差异**：OpenClaw 走"超级聚合器"路线，主仓库集成 Telegram/Discord/Slack/Matrix/Teams/Feishu 等全部主流渠道，并深度支持子代理（subagent）编排；相较之下，外围项目多选择**特定场景深耕**——IronClaw 聚焦 Reborn 架构重构与 LLM 推理链路优化，CoPaw 侧重数据分析（DataPaw），NanoBot 强调安全加固（ExecTool 边界、凭证保护），Zeroclaw 在 Rust 生态中做插件化与 WASM 沙箱。
- **核心痛点具有代表性**：OpenClaw 的子代理消息丢失、静默回复失败等问题在外围项目中同样高频出现（PicoClaw #3269 MCP 挂起、CoPaw #6921 任务中断、NanoClaw #3233 任务不可见），说明**多代理编排的可靠性是生态级难题**，而非单项目缺陷。

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|:---|:---|:---|
| **多代理/子代理消息可靠性** | OpenClaw（#44925、#92433）、CoPaw（#6918 影子实例）、NanoClaw（#3233）、PicoClaw（#3269 挂起） | 子代理完成结果被静默丢弃、Agent 间通信重复实例化、任务迁移后不可见、MCP 失败致整体挂起 |
| **通道集成的稳定性** | IronClaw（#7538 卡死、#7542 通道混淆）、OpenClaw（#122878 Discord 阻塞）、NanoClaw（#2689 Signal 丢消息）、CoPaw（#6826 时间显示） | Telegram/Discord/Signal 等平台的媒体处理、上下文传递、消息时序问题系统性存在 |
| **长任务/上下文窗口管理** | IronClaw（#7484 静默截断、#7485 token 重复计数）、CoPaw（#6921 中断、#6927 死循环）、OpenClaw（#119909 历史误删） | 上下文溢出导致任务静默丢失、长任务跨轮次状态保持、token 估算偏差致有效窗口减半 |
| **安全加固** | NanoBot（#5329 路径绕过、#5258 凭证泄露）、Zeroclaw（#9362 任意文件写入）、OpenClaw（#7707 记忆投毒） | ExecTool 路径校验、敏感信息不泄露至第三方、记忆可信度分级 |
| **配置/部署体验** | OpenClaw（#78493 sudo 更新破坏属主）、LobsterAI（#1179 沙箱不可配置）、CoPaw（#6957 升级丢配置）、Zeroclaw（#9290 Windows 启动失败） | 更新流程破坏配置、强制变更缺乏开关、跨平台安装体验碎片化 |
| **可观测性与运维** | IronClaw（#7360 压测覆盖缺口）、NanoClaw（#2504 健康检查）、OpenClaw（#91363 LLM 请求失败无日志）、Zeroclaw（#8692 决策队列） | 测试覆盖盲区、状态可见性不足、维护决策流程不畅 |
| **新模型/新提供商接入** | NanoBot（#5362 DeepSeek V4 Pro）、CoPaw（#6954 MiniMax TTS）、NanoClaw（#3232 QwenCloud） | 保持对主流新模型的快速适配 |

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构关键差异 |
|:---|:---|:---|:---|
| **OpenClaw** | 全渠道聚合 + 子代理编排 | 个人开发者、中型团队，追求"一个网关管所有" | Node.js/TypeScript 单体仓库，超大规模插件生态，`clawsweeper` 自动化标签系统 |
| **Zeroclaw** | 插件化 + 安全强化 | 对安全和沙箱隔离有强要求的开发者 | Rust 实现，WASM 插件沙箱，SSRF/路径校验等安全措施默认启用 |
| **IronClaw** | LLM 推理链路优化 + Reborn 架构 | 追求模型调用成本控制和长对话稳定性的用户 | 专注于上下文窗口管理、token 估算精度、Capability 并发模型；双发布线（1.1.1/1.2.0） |
| **CoPaw (QwenPaw)** | 数据分析（DataPaw）+ Creator 管线 | 数据驱动型用户，偏 AI 辅助数据分析场景 | 衍生自 Qwen 生态，Agent 间通信与"影子实例"问题突出，有 ACP 传输层 |
| **NanoBot** | 安全基线 + 多提供商路由 | 对安全合规敏感的企业/个人 | 在 ExecTool 路径守卫、Docker 权限收敛、URI 凭证剥离上投入显著 |
| **NanoClaw** | Agent 模板 + 插件 MCP 支持 | 追求快速搭建可复用 agent 的开发者和团队 | 核心团队主导大型重构（#3220），新功能引入回归（#3234）需警惕 |
| **PicoClaw** | 多频道路由 + 轻量部署 | 中小规模部署、Telegram/Discord 重度用户 | Go 实现，体量较小，合并节奏偏慢 |
| **LobsterAI** | 桌面端 + 飞书/网易生态集成 | 中文企业用户，桌面办公场景 | 桌面应用（Tauri），Windows 兼容性持续修复中 |

## 6. 社区热度与成熟度

- **第一梯队｜快速迭代期（高活跃，功能优先）**：OpenClaw、Zeroclaw、IronClaw、CoPaw。共同特征是每日数十至数百条更新，核心团队频繁提交 PR，新功能与修复并行推进。但也伴随 Bug 积压与回归风险。
- **第二梯队｜质量巩固期（中活跃，稳定优先）**：NanoBot、NanoClaw、LobsterAI。合并节奏较为可控（NanoBot 当日合并 17 条 PR），安全修复与 UX 改进是重点，但功能创新节奏放缓。
- **第三梯队｜缓慢推进期（低活跃，存在积压风险）**：PicoClaw。3 个 PR 全部待合并且超两周无 review，高严重度 Issue（#3269）无进展，社区增长乏力。
- **第四梯队｜停滞期**：NullClaw、TinyClaw、Moltis、ZeptoClaw、EasyClaw 当日零活动。

## 7. 值得关注的趋势信号

1. **"问题关闭但未修复"正在透支社区信任**：OpenClaw #121058（91 条评论）、LobsterAI #1173（卸载后程序仍运行）等案例说明，仅靠关闭 Issue 而不给出根本解决方案，会激发用户强烈不满。**对维护者的启示：关闭 Issue 时必须附修复版本号或明确的"won't fix + 替代方案"**。

2. **AI 辅助提交正成为社区参与的新常态**：CoPaw #6918 由用户自己的 agent 代笔提交 bug 报告，部分项目已出现"由 AI 生成的 PR"（如 OpenClaw #122557 标注 AI 辅助）。**这要求维护者建立 AI 生成内容的质量审查机制**。

3. **安全性正从"可选项"变为"默认项"**：Zeroclaw 连续合并 SSRF 防护、路径校验、终端标记剥离等安全修复；NanoBot 将凭证保护直接嵌入 WebFetch 逻辑。**安全能力将成为个人 AI 助手的基础竞争力，而非加分项**。

4. **Windows 测试覆盖缺口成为生态级问题**：Zeroclaw（#7462，74 个测试失败）、IronClaw（Windows 发布修复）、LobsterAI（Windows 插件安装修复）同步暴露了 CI 仅跑 Linux 的盲区。**对开发者的建议：将 Windows/macOS 纳入 CI 矩阵应作为工程优先项**。

5. **长期记忆与上下文管理是下一波竞争焦点**：OpenClaw #7707（记忆信任标签）讨论半年仍无结论、Zeroclaw #9006（终端标记泄漏至持久化历史）、IronClaw #7484/#7485（上下文窗口双缺陷同日修复）、CoPaw #6853（文档与实现不一致）。**记忆架构的统一与可信度分级将决定智能体的用户体验上限**。

6. **社区治理正在尝试"制度化"**：Zeroclaw 的 RFC 投票协议（#9499）、维护者决策队列（#8692），OpenClaw 的 `clawsweeper` 自动标签系统，都反映了社区从"英雄式维护"向"流程化治理"的过渡。**但这在短期内也带来了决策积压的新问题**。

7. **对"Agent 主动行为"的边界讨论开始出现**：多项目出现用户对 agent 主动投递消息（CoPaw #6917）、沙箱强制策略（LobsterAI #1179）、进程行为透明度（CoPaw #6847 杀软拦截）的质疑。**Agent 自治权的边界与用户控制力之间需要更明确的交互设计**。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

### 1. 今日速览

NanoBot 项目在过去 24 小时保持高活跃度，共产生 8 条 Issue 更新和 36 条 PR 更新。**核心进展集中在安全加固与稳定性修复**，尤其是针对 `ExecTool` 工作区边界绕过（#5329）、Jina 远程读取凭证泄露（#5258）、Docker 权限配置（#5320）等安全问题的 PR 已合并。功能开发方面，社区贡献的 WebUI 会话协作（#5358）、DeepSeek V4 Pro 支持（#5362）以及渠道设置流程改进（#5356）均进入收尾阶段。值得注意的是，**多条 PR 仍存在合并冲突**（如 #5291、#5204、#4329），需要维护者介入解决。整体上，项目正处于安全加固与功能扩展并行推进的密集迭代期。

### 2. 版本发布

过去 24 小时无新版本发布。

### 3. 项目进展

今日共合并/关闭 17 条 PR，其中以下合并尤为关键，显著提升了项目安全基线并修复了多处已知故障：

- **[Security] fix(exec): guard bare and named-user home paths** (#5329)：修复 `ExecTool` 中 `~`、`~user` 路径解析绕过工作区边界的问题，是重要的安全加固。
- **[Security] fix(web): keep credential-bearing URLs away from the remote Jina reader** (#5258)：修复当用户访问含凭证信息的 URL 时，请求被完整转发给第三方服务造成的隐私泄露风险，并增强了本地重定向链路检查。
- **[Bug] fix(docker): restore capabilities for privilege drop** (#5320)：修复 Docker 部署失败问题，调整容器权限策略，在 `cap_drop: ALL` 的基础上精准恢复引导所需 capabilities，并启用 `no-new-privileges`，平衡了安全性与可用性。
- **[Bug] fix(gemini): preserve imported tool calls with signature fallback** (#5230)：修复 Gemini 3 在转换来自其他提供者的会话时，因缺少 thought signature 而拒绝回放函数调用的问题。
- **[Refactor] fix(tools): treat redirection and grouping delimiters in ExecTool path guard** (#5218)：继续加固 `ExecTool` 路径提取逻辑，覆盖更多 shell 语法边界情况。
- **[Feature] feat(providers): support DeepSeek V4 Pro Responses** (#5362)：新增对 DeepSeek V4 Pro 模型的支持，并将其路由至原生 Responses API。

这些合并表明项目在**安全意识**上有了显著提升，同时保持了功能的快速迭代。

### 4. 社区热点

- **[Bug] Nanobot repeats multiple times the same message while reasoning** (#5327) - 评论 11 条，已关闭
  该 Issue 获得了今日最高的讨论热度，但已确认关闭。用户报告了一个随机出现的、在推理过程中重复输出相同短语的行为问题。虽然已关闭，但从评论数量来看，此问题困扰了较多用户，且可能难以稳定复现。请维护者确认关闭原因（是已修复还是无法复现）以及后续跟进计划。

- **[Bug] Bug: deploy with docker compose failed** (#5295) - 评论 5 条，已关闭
  该问题与已合并的 PR #5320 直接相关，应该在最新版中已得到解决。社区用户对部署体验的关注度很高。

### 5. Bug 与稳定性

今日报告的 Bug 多与安全边界和特定渠道的体验有关，部分已由合并的 PR 解决，具体如下：

| 严重程度 | Issue | 描述 | 状态 |
| :--- | :--- | :--- | :--- |
| **高 (安全)** | #4884 | WebFetch 组件会将完整用户 URL（可能包含凭证）发送给第三方 Jina 服务。 | 已关闭，由 PR #5258 修复并合并。 |
| **高 (安全)** | #5329 (PR) | `ExecTool` 存在工作区边界绕过风险，可访问 `~` 及 `~user` 路径。 | 相关 PR 已合并。 |
| **中** | #5348 | 两个关于 token 用量统计的测试在每天特定 5 小时窗口内因时区处理不一致而失败。 | 待处理，无关联 PR。 |
| **低** | #5327 | 推理过程中随机重复输出同一消息。 | 已关闭，无代码改动关联。 |

**待解决问题**：#5348 是一个确定性的测试失败，虽然不直接影响生产，但反映了 `record_token_usage()` 在时区处理上的**逻辑缺陷**，建议尽快提供修复方案。

### 6. 功能请求与路线图信号

当前多个开放的功能请求与活跃的 PR 形成了呼应，显示出项目未来的演进方向：

- **语音输出 (Text-to-Speech)**：Issue #4010 提议为语音渠道增加 TTS 支持，以闭环语音交互。虽然目前没有直接关联的 PR，但这是增强智能助手体验的重要方向，值得纳入路线图评估。
- **线程上下文隔离**：Issue #5275 要求在 Matrix 渠道中，通过“回复线程”发起的对话应像 Discord 和 Slack 一样建立独立上下文。与此同时，PR #5292 已提交修复，以解决该渠道回复链接的问题。虽然两者侧重点不同（一个关于上下文，一个关于回复行为），但反映了**Matrix 渠道正在被积极完善**。
- **QwenCloud 提供商支持**：Issue #5350 提议增加对 QwenCloud 平台的支持，与现有的 DashScope 兼容。这属于低成本、高价值的扩展，很可能会被采纳。

### 7. 用户反馈摘要

- **部署体验是用户痛点**：Issue #5295 中，用户因 Docker Compose 部署失败（权限问题）而受挫，这表明官方文档的部署步骤需要与最新的镜像配置保持同步验证。
- **对安全问题的敏感度提高**：针对 WebFetch 凭证泄露（#4884）的反馈，表明用户对数据隐私非常关注，并期望项目默认采用安全优先的架构设计。
- **WebUI 与多用户协作需求**：PR #5358 (session collaboration) 和 #5356 (setup flows improvement) 的提交，暗示了用户对更复杂、更友好的 Web 界面以及团队协作场景的期待。

### 8. 待处理积压

以下 PR 和 Issue 已有一段时间未获得维护者响应或存在合并冲突，建议优先关注：

- **PR #4878** - [feat(hooks): add auto-discovery mechanism for agent hooks]：该功能可简化自定义 hook 的注册流程，但已开放超过一个月并带有 `conflict` 标签，可能因为代码冲突或设计讨论而搁置。
- **PR #4329** - [feat(cli): add native TypeScript terminal UI]：这是一个较大的 CLI 重构提议，已开放两个月，目前仍标记为 `conflict`，需要维护者明确是否将其纳入长期规划。
- **PR #5204** - [refactor(providers): declare Responses capabilities] 与 **PR #5291** - [fix(agent): persist subagent conversation transcripts]：两者分别涉及核心 provider 架构重构和功能优化，均因合并冲突而停滞，是影响项目模块化程度的关键依赖，建议尽快解决冲突。

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-08-13

## 今日速览

项目活跃度维持高位：24小时内共产生100条Issue与PR更新，其中新开/活跃Issue 45条、待合并PR 31条。Windows平台测试失败（#7462）及跨平台CI覆盖（#7461）是当前最核心的工程质量议题，已获维护者接受并持续跟进。安全领域动作密集：多条关于SSRF防护、截图路径校验、WASM调用时限的修复PR已合并或处于待审状态。此外，长期存在的主维护者决策队列（#8692）持续累积，治理流程（RFC投票协议PR #9499）正在完善中。值得关注的是，团队已合入6条由wangmiao0668000666提交的bug修复PR，涵盖MCP策略、浏览器安全、Telegram频道与终端标记剥离等多个模块。

## 项目进展

今日合并/关闭了19条PR，其中多条由主要贡献者wangmiao0668000666提交并完成合并，显示了明确的修复节奏：

- **[安全] 浏览器截图路径任意文件写入漏洞修复**（PR #9362, 合并）：该PR关闭了browser工具`screenshot`动作中存在的任意文件写入逃逸漏洞——此前`path`参数未经任何`is_path_allowed`/`resolve_tool_path`校验即被`tokio::fs::write`直接使用。另一个功能等同的PR #8741也随之关闭。
- **[安全] 延迟MCP访问策略统一**（PR #8496, 合并）：为#8054 Surface 1(b)提供了单一事实来源，集中管理deferred-MCP的访问策略过滤。
- **[运行时] 终端标记剥离**（PR #9695, #9037, 合并）：修复了`<eom>`等终端标记泄漏到非流式/流式响应文本、持久化历史及下游频道投递的问题（对应Issue #9006），影响ZeroCode Code标签页的展示与WeCom频道投递。
- **[频道] Telegram命令上限截断**（PR #8963, 合并）：修复内置命令+技能+工具超过100个导致`setMyCommands`被拒的问题（Issue #8950）。
- **[性能] loop_detector流式哈希**（PR #8937, 合并）：避免每次工具调用的深克隆，通过流式哈希工具参数降低开销（Issue #8936）。
- **[守护进程] 前台启动反馈恢复**（PR #9040, 合并）：恢复`zeroclaw daemon`前台运行的关键操作回显（Issue #9000）。
- **[CI] rustdoc主题作用域收紧**（PR #8874, 合并）：修复Issue #8847，将`--default-theme`限制在rustdoc而非`cargo test --doc`全局生效。

此外，还有多条高价值PR处于待合并状态，包括：WASM插件墙钟超时限制（#9403）、rate limit凭据轮换（#9419）、gateway断开后保持agent turn存活（#9002）等。

## 社区热点

**#7462 — Windows平台74个测试失败**（评论14）— 这是当前社区关注度最高的问题。作者NiuBlibing指出：Windows 11中文环境（代码页936）下跑出74个失败测试，但CI仅在Linux上运行测试，无法捕获该问题。该Issue与#7461（跨平台CI矩阵）形成呼应，反映了Windows用户在工程质量上的迫切需求。

**#8692 — 维护者决策队列Tracker**（评论13）— 由Audacity88发起，汇聚了所有需要维护者拍板的RFC、设计Issue、发布策略问题。评论活跃说明社区对RFC提案进展的关注度较高，但积压可能正在形成瓶颈（详见积压部分）。

**#8832 — 插件自有Kanban板**（评论9）— 提议为agent工作协调提供opt-in的插件自有Kanban领域。该设计涉及通用的宿主能力与插件语义的分离，引发关于架构边界的讨论。

**#9101 — 整合发布证明机制**（评论9）— v0.8.3同时携带了cosign、GitHub artifact attestations与slsa-github-generator三套签名机制（源于相隔26小时合并的两个PR），社区在讨论冗余成本与统一方案。

此外，多个较旧的架构类Issue（#6653、#7929、#5907等）今日仍有更新，说明讨论周期较长但未停滞。

## Bug 与稳定性

按严重程度排列：

**S1 — 工作流阻塞：**

- **[Windows桌面]** 安装后无法启动：`TaskDialogIndirect`缺失（#9290, 已接受）。v0.8.3的`ZeroClaw-windows-x64.exe`安装后桌面应用启动失败。暂无fix PR。
- **[macOS桌面]** 应用重启后空白/无窗口（#7527, `r:needs-repro`）。macOS 15.7.7上权限检测失败导致响应丢失及窗口消失。待复现确认。
- **[web_fetch压缩**]** web_fetch对gzip/brotli/deflate压缩响应返回乱码二进制（#9207, in-progress），agent无法解析。已有fix PR？未见对应PR。
- **[cron输出丢失]** CLI创建的cron任务`delivery.mode`硬编码为`none`，任务运行成功但结果被丢弃（#9340, 已关闭）。已修复。

**S2 — 行为降级：**

- **[cron帮助文档]** `cron --help`中add-at/add-every/once示例不合法（#9796, 已关闭）。已修复。
- **[Discord输入指示器]** 面板守护进程reload后，"typing..."指示器永久卡住（#9198, 已接受）。暂无fix PR。

**S3 — 轻微问题：**

- **[[Linux桌面]** ] `zeroclaw desktop`命令无法检测已安装的AppImage且下载URL失效（#9202, in-progress）。暂无fix PR。

## 功能请求与路线图信号

以下功能请求在有活跃PR支撑或已被接受的背景下值得关注：

- **WASM插件调用时限**（PR #9403, 待合并）：为插件导出添加默认30秒的墙钟截止时间，这是对插件稳定性治理的重要一步，对应长期讨论的插件沙箱边界问题。
- **Langfuse可观测后端**（PR #9556, needs-author-action）：添加Langfuse为OpenTelemetry导出目标，与之前合并的herdr集成（#8337）共同构成可观测性生态的扩展方向。
- **zerocode本地提交前门禁**（#8078, RFC）：在贡献者机器上执行目标项目的CI标准，通过才允许开PR。该方向可能与#9499（RFC投票协议）共同构成协作治理的强化。
- **执行树迭代预算所有权**（#9323, needs-author-action）：目前`ToolLoop.shared_budget`在所有生产路径均为`None`，该请求希望明确父子迭代扇出的预算归属，涉及delegate/子agent的资源管控。
- **SOP面板只读视图**（PR #9694, 待合并）：在zerocode中暴露SOP运行状态（完成/等待/失败等图标），与已关闭的#9684衔接。

## 用户反馈摘要

- **Windows用户反复强调测试覆盖缺口**（#7462 + #7461 + #7910）：同一作者在三个相关Issue中持续施压，要求CI扩展至Windows/macOS平台。核心痛点是已有代码在Windows上测试即失败，而用户直到安装/使用阶段才暴露问题，修复成本成倍增加。
- **部署与安装的挫败感**（#7527 + #9290 + #9202）：macOS与Windows桌面端的安装与启动问题在多个版本间反复出现，用户需要手动排查权限、依赖、下载链接等外围因素。碎片化的桌面端体验正在消耗社区信任。
- **安全修复PR反映的攻击面担忧**：社区活跃贡献者wangmiao0668000666在短时间内连续提交SSRF防护（#8713）、浏览器截图路径校验（#9362）、终端标记剥离（#9695）等多个安全修复，说明用户对agent工具链的任意文件读写、元数据泄露攻击面有明确关切。
- **对治理流程的关注**：维护者决策队列（#8692）与RFC投票协议PR（#9499）的活跃讨论表明，社区正在从“功能堆叠”阶段向“制度化决策”阶段过渡。

## 待处理积压

- **维护者决策队列（#8692）**：自2026-07-04创建以来持续累积，虽然评论活跃，但很多关联RFC（如#8078、#8367）等待拍板时间已超过数周。建议维护者周期性批量清理并给出明确结论。

- **Windows/macOS测试矩阵（#7461）**：已接受（accepted）超过2个月，且配套的Windows失败修复（#7462）也已在讨论中，但仍未进入CI实施阶段。考虑到Windows是主要用户平台之一，该事项优先级建议提升。

- **SearXNG搜索支持（#5316）**：4月初提出的功能，已接受，但至今无对应PR。涉及DuckDuckGo CAPTCHA检测与搜索可靠性，长期未推进可能影响依赖web搜索的agent体验。

- **响应缓存策略（#8321）**：涉及provider可见易变上下文的缓存边界，与#8320等多条相关Issue关联，目前评论仅3条，讨论不足，处于停滞风险中。

- **wasmtime advisory豁免追踪（#8059）**：已接受但未见执行更新，安全策略收紧类Issue容易在“接受后”失去动力。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

### PicoClaw 项目动态日报 — 2026-08-13

---

#### 1. 今日速览

项目在过去24小时内保持中等活跃度：共有 2 条 Issue 更新（均为存续讨论，无新关闭）和 3 条 PR 更新（全部处于待合并状态，无合并/关闭）。目前无新版本发布。社区焦点集中在 Web UI 输入性能、MCP 连接失败导致的 Agent 挂起，以及 3 个功能性 PR（路由代理上下文管理、Telegram 私聊话题支持、Exa 搜索集成）的推进。整体来看，项目处于功能开发与缺陷修复并行阶段，但合并节奏偏慢，存在一定的 PR 积压风险。

---

#### 3. 项目进展

今日无 PR 被合并或关闭，但以下 3 个待合并 PR 值得关注，它们分别涉及核心上下文管理、Telegram 集成完善和搜索能力扩展，若合并将显著提升项目在多渠道场景下的稳定性与功能性：

- **[#3316] fix: routed-agent context management not respecting history, summarization, compression, and seahorse bootstrap** — 作者 j-v。修复了通过 dispatch 规则路由到特定 Discord 频道的 Agent 无法记住历史消息、且自动压缩/摘要机制永不触发的问题。这是对路由代理核心逻辑的补全，直接影响多频道用户的使用体验。
  - 链接: https://github.com/sipeed/picoclaw/pull/3316

- **[#3315] Support topics in private bot chats** — 作者 genuss。修复 Telegram 私聊场景下（Bot 开启话题模式时）话题识别失效的问题。原实现仅在 `Chat.IsForum` 为 true 时生效，无法覆盖私聊的 `IsTopicMessage` 场景。
  - 链接: https://github.com/sipeed/picoclaw/pull/3315

- **[#3299] Add native Exa web search provider** — 作者 kesku。为 `tools.web` / `web_search` 新增 Exa 原生搜索供应商，支持 `d`/`w`/`m`/`y` 时间范围过滤。该 PR 自 7 月 26 日创建至今已超过两周，仍未合并或收到 review 意见。
  - 链接: https://github.com/sipeed/picoclaw/pull/3299

---

#### 4. 社区热点

以下两个 Issue 各获得 4 条评论和 1 个 👍，讨论热度相当，均属于影响日常使用的严重问题：

- **[#3281] [BUG] Web UI chat input is very laggy when history has a little bit long** — 用户在 Web UI 中，当会话历史稍长后，输入框出现明显卡顿（PicoClaw 0.3.1 / Go 1.25.11）。该问题直接影响了 Web 端用户的日常操作流畅度，用户耐心有限。
  - 链接: https://github.com/sipeed/picoclaw/issues/3281

- **[#3269] [BUG] If the MCP server connection fails, the agent loop will hang, causing the Picoclaw chat interface to stop replying** — 当 MCP 服务器连接失败时，Agent 循环挂起，导致聊天界面完全停止响应（nightly 版本）。这属于单点故障引发整体服务不可用的问题，用户对稳定性诉求非常强烈。
  - 链接: https://github.com/sipeed/picoclaw/issues/3269

---

#### 5. Bug 与稳定性

按严重程度排列：

- **[#3269] Agent 循环挂起（高严重度）** — MCP 服务器连接失败时会话完全卡死，无超时或降级机制。尚未看到关联的 fix PR，已存在超过 3 周，建议优先排查。
  - 链接: https://github.com/sipeed/picoclaw/issues/3269

- **[#3281] Web UI 输入卡顿（中高严重度）** — 历史消息略长即出现输入延迟，影响 Web 端核心交互。暂无对应 PR，建议检查前端渲染/状态管理是否存在性能瓶颈。
  - 链接: https://github.com/sipeed/picoclaw/issues/3281

- **[#3316] 路由代理状态不一致（功能回归/缺陷）** — 已定位根因并有修复 PR 待合并，属于已修复但未上线的状态。合并后即可解决多频道路由场景下的记忆丢失与自动压缩失效问题。
  - 链接: https://github.com/sipeed/picoclaw/pull/3316

---

#### 6. 功能请求与路线图信号

- **原生 Exa 搜索集成（PR #3299）**：新增网络搜索供应商，扩展 `tools.web` 的可用性。当前该项目已有多个搜索供应商，Exa 的加入将丰富搜索选项，但该 PR 已滞留两周，若无反对意见应尽快合并。
  - 链接: https://github.com/sipeed/picoclaw/pull/3299

- **Telegram 私聊话题支持（PR #3315）**：完善 Telegram 适配细节，属于多平台体验补齐，对使用 Bot 私聊 + 话题模式的用户是刚需。
  - 链接: https://github.com/sipeed/picoclaw/pull/3315

---

#### 7. 用户反馈摘要

- **性能敏感度高**：用户在 Web UI 上的输入流畅度是核心体验之一，历史稍长即卡顿，说明前端渲染策略或消息量处理仍有优化空间。
- **稳定性信任危机**：MCP 连接失败直接导致整个聊天界面无响应，用户无法通过任何方式恢复，且该问题在多日内无修复进展，可能影响用户对项目稳定性的信心。
- **路由 Agent 的记忆缺失**：从 PR #3316 的描述看，用户对“路由到特定频道的 Agent 能记住上下文”有明确的期望，该问题已影响实际使用中的多轮对话效果。

---

#### 8. 待处理积压

- **[#3269] MCP 连接失败致 Agent 挂起（Issue，3 周+ 无进展）**：高严重度稳定性问题，维护者应确认是否已安排修复计划。
  - 链接: https://github.com/sipeed/picoclaw/issues/3269

- **[#3281] Web UI 输入卡顿（Issue，3 周+ 无 fix PR）**：影响面较大的交互问题，是否需要补充更多性能数据或分配优先级。
  - 链接: https://github.com/sipeed/picoclaw/issues/3281

- **[#3299] Exa 搜索集成 PR（2 周+ 无 review）**：功能完整且改动独立，长时间无人 review 或 comment，建议维护者确认是否继续跟进。
  - 链接: https://github.com/sipeed/picoclaw/pull/3299

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

### 1. 今日速览

NanoClaw 项目今日活跃度较高。过去 24 小时新增 4 个 Issue 和 10 个 PR，其中 9 个 PR 处于待合并状态，1 个 PR 被合并。核心团队在 agent 模板（Agent Plugins 1.0.0）相关的引擎改造（#3220）、Codex/OpenCode 插件 MCP 支持（#3231）及设置向导（#2909）上持续发力，但同时暴露了一个由模板功能引发的 ID 前缀 Bug（#3234）和旧版周期任务迁移问题（#3233）。今日无新版本发布。

---

### 2. 版本发布

无新版本发布。

---

### 3. 项目进展

今日仅合并 1 个 PR，但修复了一个渠道层的重要稳健性问题：

- **WhatsApp 收件人校验修复（[PR #3086](https://github.com/nanocoai/nanoclaw/pull/3086) - 已合并）**：修复了 Baileys 库对未注册号码发送消息时“假成功”的问题。此前发送到错误号码会返回一个虚假的 `platformMsgId` 并在日志中记录成功，但消息实际未送达。该修复确保了无效收件人在发送前即被拒绝，提升了消息投递的可靠性。

核心团队的大型 PR（#3220、#2909、#3231）仍处于待合并状态，预计合并后将重塑 agent 模板和插件 MCP 的底层架构。

---

### 4. 社区热点

今日最受关注的讨论集中在 **agent 模板功能引发的回归问题**：

**Issue [#3234](https://github.com/nanocoai/nanoclaw/issues/3234) - agent 组 ID 缺失 `ag-` 前缀（0 评论）**
该问题报告了 `ncl groups create --template <ref>` 生成裸 UUID（如以数字开头），而未使用 `ag-` 前缀，导致 OneCLI 的 `ensureAgent` 拒绝该 ID。这直接关联到核心团队正在推进的模板功能（#3220、#2909），属于新功能的实际缺陷，预计会引起维护者的快速响应。

---

### 5. Bug 与稳定性

| 严重程度 | Issue | 描述 | Fix PR/状态 |
|---|---|---|---|
| **高** | [#3234](https://github.com/nanocoai/nanoclaw/issues/3234) | 通过模板创建的 agent 组使用裸 UUID，缺少 `ag-` 前缀，导致 OneCLI spawn 失败。 | 无（核心团队 feature 的副作用） |
| **高** | [#3233](https://github.com/nanocoai/nanoclaw/issues/3233) | 升级至 2.1.54 后，agent 容器内执行 `ncl tasks list` 显示 “No tasks”，且 pause/cancel 报错。旧版周期性任务在迁移时未重新归属至 agent 作用域。 | 无（阻塞 agent 对自身任务的运维能力） |
| **中** | [PR #2346](https://github.com/nanocoai/nanoclaw/pull/2346) | 未知斜杠命令被错误归类为 `passthrough`，导致 Agent SDK 将其解释为 Claude Code 命令，响应被静默丢弃。 | PR 已待合入（建议 fall through 至 `none`） |
| **低** | [PR #2689](https://github.com/nanocoai/nanoclaw/pull/2689) | Signal DM：`isMention` 未设置导致首条消息丢失、群组不注册；DM platform ID 缺少 `signal:` 前缀。 | PR 已待合入（自 6 月起） |

---

### 6. 功能请求与路线图信号

- **QwenCloud 提供商支持（Issue [#3232](https://github.com/nanocoai/nanoclaw/issues/3232)）**：用户提议以 provider skill 形式添加 `/add-qwencloud`，与现有的模块化 provider 策略一致。考虑到 Qwen 模型的普及度，此请求有较大概率被核心团队接受或以社区 skill 形式合入。

- **`ncl status` 轻量健康检查命令（Issue [#2504](https://github.com/nanocoai/nanoclaw/issues/2504)）**：用户希望有此命令快速查看运行实例的心跳、容器存活、最近错误等信息，弥补现有 `sessions list` 和 dashboard skill 的不足。该需求已存在 3 个月，可能与运维类 skill 路线相关。

另注意，PR [#3050](https://github.com/nanocoai/nanoclaw/pull/3050)（添加 Dial 频道）已待合入超过一个月，属于新增渠道类功能，反映了用户对多渠道接入的持续需求。

---

### 7. 用户反馈摘要

- **深度迁移痛点**：#3233 用户描述了升级后任务不可见的完整场景，指出数据迁移逻辑未覆盖旧版 recurring tasks 的 rehome 需求，且 agent 侧对任务的 get/pause/cancel 全部失效，属于“静默降级”类问题，影响面大。
- **新功能缺陷挫伤试用积极性**：#3234 用户在试用模板功能时遭遇 ID 格式校验失败，暴露了新功能在发布前缺少端到端验证。
- **旧 PR 待审长期未决**：`fix(formatter)`（#2346）和 `fix(signal)`（#2689）已在 5 月和 6 月提交，至今未合入。前端时间已知晓该问题会导致消息静默丢弃，但 3 个月仍无结论，反馈了社区对维护者审阅节奏的不满。

---

### 8. 待处理积压

以下为长期未合入/未响应的重要项，提醒维护者关注：

- **[PR #2689](https://github.com/nanocoai/nanoclaw/pull/2689)**：Signal 渠道的 DM 消息丢失修复，已存在 2 个月+。该 Bug 导致首条 DM 被丢弃且群组不注册，影响 Signal 用户的基础体验。
- **[PR #2346](https://github.com/nanocoai/nanoclaw/pull/2346)**：未知 slash 命令静默失败修复，已存在 3 个月+。影响所有误用斜杠命令的用户，响应被静默丢弃且无日志反馈。
- **[PR #3050](https://github.com/nanocoai/nanoclaw/pull/3050)**：Dial 频道接入（feature skill），已待合入 1 个月+，属于已被规划但搁置的新集成。
- **[Issue #2504](https://github.com/nanocoai/nanoclaw/issues/2504)**：`ncl status` 功能请求，已开放 3 个月+，0 点赞，但反映了运维观测数据的缺口。

---

**整体健康度评估**：项目核心功能开发活跃，但新功能引入的回归问题（#3234）和大版本升级的迁移缺陷（#3233）值得警惕。同时，多个基础渠道修复 PR 长期积压，可能影响社区信任与用户体验。建议核心团队优先合入 #3220 相关链路（含其依赖的 #3231），并同步处理 #3234 与 #3233 的修复，以稳固近期发布的稳定性。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

### 1. 今日速览

IronClaw 项目在 2026-08-12 至 2026-08-13 期间活跃度极高，呈现出典型的发布前密集迭代状态。过去 24 小时内，项目有 41 条 Issue 更新和 50 条 PR 更新，并发布了两个 `1.2.0-rc` 候选版本。核心开发团队（`serrrfirat`、`henrypark133` 等）与 QA 团队（`joe-rlo`）动作频繁，前者集中在 LLM 推理链路、上下文窗口管理和架构重构（Reborn），后者则密集提交了 12 条针对 Telegram 集成和实例升级的 QA 缺陷报告。当前项目健康度良好，核心功能迭代与稳定性修复双线并行，但 Telegram 通道和 WebUI 存在数个 P1 级别的易阻塞性问题，且文档迁移、Design System 等基础设施工作仍在持续推进中。

---

### 2. 版本发布

过去 24 小时内发布了两个候选版本，均聚焦于 Bug 修复：

- **[ironclaw-v1.2.0-rc.3](https://github.com/nearai/ironclaw/releases)**
  - **更新内容**：修复了运行时容器镜像未安装 `curl` 导致 Orchestrator 探针无法执行的问题。现在镜像内已包含 `curl`，健康检查可正常运行。
  - **破坏性变更**：无。
  - **迁移注意**：这是对容器镜像内容的修复，部署方需重新拉取镜像以应用修复。另注意由 PR #7560 揭示的发布问题——`cargo-dist` 下载因网络问题失败，该修复补丁（重试逻辑）已单独提交。

- **[ironclaw-v1.2.0-rc.2](https://github.com/nearai/ironclaw/releases)**
  - **更新内容**：
    - 修复 Windows 首次启动文件发布逻辑，改用原生原子重命名语义（替代硬链接），并容忍不支持的目录同步。
    - 修复发布烟雾测试中 Windows 账户身份保留问题，确保独立 secrets key 的安全性。
  - **破坏性变更**：无。
  - **迁移注意**：Windows 用户升级后首次启动的文件发布行为有变，但属内部实现替换，用户无感。

---

### 3. 项目进展

今日合并/关闭的 PR 主要进展如下，分为三类：

- **发布准备与稳定性**：
  - [PR #7555](https://github.com/nearai/ironclaw/pull/7555)：核心修复，向 Docker 镜像安装 `curl` 以修复探针问题（Forward-port 至发布分支）。
  - [PR #7427](https://github.com/nearai/ironclaw/pull/7427)：准备 `1.1.1-rc.1` 版本，Backport 了 IronHub、WebUI、Slack/Telegram 等关键修复至 1.1 发布线。
  - [PR #7560](https://github.com/nearai/ironclaw/pull/7560)：修复发布 CI 中 `cargo-dist` 下载失败问题（已关闭，应用了重试机制）。

- **架构与核心逻辑重构（Reborn）**：
  - 一批针对 LLM 上下文窗口和 Token 估算器的修复已关闭，直接对标社区关注的高成本问题（见 Bug 部分）。
  - 并行 Capability 批次执行（[Issue #7407](https://github.com/nearai/ironclaw/issues/7407)）已关闭，`invoke_capability_batch` 现在真正并发执行 `BatchPolicy::Parallel` 批次。

- **功能扩展与基础设施**：
  - [PR #6836](https://github.com/nearai/ironclaw/pull/6836)（已关闭）：WebUI 设计系统包 `@ironclaw/ui` 的工作区重构落地。
  - [PR #6836](https://github.com/nearai/ironclaw/pull/6836) 关闭的同时，[PR #7558](https://github.com/nearai/ironclaw/pull/7558) 为其 Phase-3 重皮肤搭建了参考脚手架。
  - 文档层面，[PR #7559](https://github.com/nearai/ironclaw/pull/7559) 正在将 `docs/reborn/` 全部迁移至 `docs/internal/reborn/`，完成文档发布隔离的最后一步（待合并）。

**结论**: 项目正处于 1.2.0 和 1.1.1 两条发布线的关键冲刺期，同时持续推进 Reborn 架构的根基重构（上下文窗口、Capability 并发模型）。

---

### 4. 社区热点

今日讨论活跃度最高的事件：

- **[Issue #7360: [enhancement] Expand stress coverage across built-in and durable write paths](https://github.com/nearai/ironclaw/issues/7360)**
  - **评论数**: 3（今日最高）
  - **动态**: 该 Issue 由核心开发者提出，分析称现有压力测试未覆盖 built-in capability 写入路径，因为 mock 模型不返回工具调用。这导致回归可能绕过压力测试。讨论反映了 **测试基础设施的盲区** 问题，这是开发团队主动暴露技术债的高质量讨论，说明项目的测试工程文化较为成熟。

- **[Issue #7554: [bug] Custom MCP server add flow shows validation error](https://github.com/nearai/ironclaw/issues/7554)**
  - **评论数**: 1
  - **动态**: 由用户通过 Slack 反馈渠道自动建档。这显示了外部用户反馈通道的畅通，但也暴露了自定义 MCP 添加流程的验证逻辑缺陷，与 `1.1.1-rc.1` Backport 的 "custom MCP fixes" 可能相关。

- **[Issue #7407: [CLOSED] Execute BatchPolicy::Parallel capability batches concurrently](https://github.com/nearai/ironclaw/issues/7407)**
  - **评论数**: 3
  - **动态**: 该功能的落地讨论伴随着并发控制的具体实现方案（bounded concurrency），虽然已关闭，但评论过程展示了从理论策略（Agent 循环计算结果）到生产端口（capability port）的执行鸿沟。

---

### 5. Bug 与稳定性

今日报告的 Bug 呈现两极分化：一方面由 QA 团队（`joe-rlo`）在 Railway 实例上密集发现 **Telegram 通道集成** 的系列问题，另一方面是核心团队修复了 **上下文窗口被静默截断** 的严重性能缺陷。

**高优先级（P1）**：

- **[Issue #7538](https://github.com/nearai/ironclaw/issues/7538)**：Telegram 代理在收到 GIF/贴纸后**完全卡死**，所有后续消息无响应。这是一个严重的稳定性缺陷，尚无关联修复 PR，怀疑与媒体消息处理或状态机挂起有关。
- **[Issue #7536](https://github.com/nearai/ironclaw/issues/7536)**：多用户访问流程崩溃，新增用户收到 "Invalid secret" 错误，无法登录。
- **[Issue #7535](https://github.com/nearai/ironclaw/issues/7535)**：Telegram webhook 在保存 Bot 配置后未激活，需要完全重新部署才能生效。

**中优先级（P2）**：

- **[Issue #7541](https://github.com/nearai/ironclaw/issues/7541)**: 无法将生成的文件作为附件发送至 Telegram，仅提供本地路径链接。
- **[Issue #7545](https://github.com/nearai/ironclaw/issues/7545)**: 代理错误地声称无法获取加密市场数据（尽管有通用 HTTP 工具）。
- **[Issue #7544](https://github.com/nearai/ironclaw/issues/7544)**: 代理泄露内部推理/计划过程至聊天界面，用户体验较差。
- **[Issue #7543](https://github.com/nearai/ironclaw/issues/7543)**: 例程执行成功但首次运行时消息未送达。
- **[Issue #7540](https://github.com/nearai/ironclaw/issues/7540)** / **[#7539](https://github.com/nearai/ironclaw/issues/7539)** / **[#7542](https://github.com/nearai/ironclaw/issues/7542)**: 长消息分段处理缺陷、消息时序错乱、通道识别混淆。这些均指向 **Telegram 适配层的消息解析与状态管理存在系统性问题**。

**已修复/有对应修复**：

- **[Issue #7484](https://github.com/nearai/ironclaw/issues/7484)**（已关闭）：修复了上下文窗口静默弹出任务的问题（硬编码 128 条消息限制导致任务丢失）。该缺陷会严重影响长对话场景的连续性，修复方式为钉住用户消息并在驱逐时压缩。属于重要修复，已在 Reborn 分支落地。
- **[Issue #7485](https://github.com/nearai/ironclaw/issues/7485)**（已关闭）：修复 Token 估算器对 ASCII 字符重复计数导致有效上下文窗口减半的问题。该问题会导致用户实际可用上下文长度只有配置的一半，浪费昂贵的模型输入。

---

### 6. 功能请求与路线图信号

新提出的功能请求多集中于 **通道体验** 与 **大模型控制能力**：

- **[Issue #7537](https://github.com/nearai/ironclaw/issues/7537)**: 为 LLM 请求路径添加通用的每请求思考/努力控制（provider-native 映射）。这是一个深度集成需求，由 DeepSeek V4 Flash 的 verbose 输出触发，但被设计为跨模型的通用控制。相关代码已在 `scope: llm` 下规划，**大概率进入下一迭代（1.3.0？）**，因为这是对基础推理链路的改进。
- **[Issue #7517](https://github.com/nearai/ironclaw/issues/7517)**: Cloud.near.ai 支持 Google/GitHub 登录用户的 Staking 路径。这是经济模型与身份认证的对接需求，涉及账户关联，属于商业逻辑层变更。
- **[Issue #7520](https://github.com/nearai/ironclaw/issues/7520)**（Epic）: 退役旧的、无法访问的 WebUI 前端表面。这标志着 **Re-born UI 正式取代旧版** 的清理工作开始，与现有的设计系统重构（Epic #7038）形成协同。

**路线图判断**：`1.2.0` 版本包含 Telegram 缺陷修复 (PR #7427 backport) 和容器修复；更远期的 `1.3.0` 将看到 Design System (Epic #7038) 和 OOBE 引导 (Epic #7044) 的落地。LLM 思考控制极有可能随 1.2.x 或 1.3.0 进入。

---

### 7. 用户反馈摘要

- **Telegram 通道的割裂感**：用户反馈在 Telegram 上使用时，代理经常"忘记"自己是在 Telegram 上（Issue #7542），会回复"想要发到你的 Telegram 吗？"这类不合时宜的提示。这说明 **通道上下文的传递在 Reborn 代理中丢失**，割裂了多通道体验。
- **不透明的失败信息**：Issue #7302（已关闭）反映了工具调用失败时 UI 展示"激进"错误消息的问题。用户表示即使代理最终成功完成任务，界面仍会显示令人恐慌的错误提示。这属于 **UX 透明度与安抚策略** 的平衡问题，已列入改进清单。
- **配置与权限困惑**：用户反映 (Issue #7554) 添加自定义 MCP 服务器时遇到无解释的验证错误；(Issue #7451) 代理有时错误地要求用户提供 API 密钥，即便当前操作并不需要。这些反馈指向 **配置表单的友好度** 与 **权限判断的准确性** 有待提升。

---

### 8. 待处理积压

- **[Issue #7451](https://github.com/nearai/ironclaw/issues/7451)**（已开启 3 天，0 评论）：代理错误地要求提供凭据。这是 P2 级别但会中断用户工作流的问题，且无任何跟进迹象，建议优先排查。
- **[Issue #7360](https://github.com/nearai/ironclaw/issues/7360)**（已开启 6 天，讨论较多）：关于扩大压力测试覆盖面的技术债，虽然讨论活跃，但尚无明确的负责人或排期说明。
- **[Issue #6541](https://github.com/nearai/ironclaw/issues/6541)**（已关闭）：WebUI 频繁重连问题已解决，但该问题在 v1-launch-checklist 中，需确认修复已完全合入发布分支。
- **[PR #7464](https://github.com/nearai/ironclaw/pull/7464)**（已开启 4 天）：Telegram 链接设备功能（linked-device）是一个 XL 规模的功能 PR，且依赖另一个文档 PR 的审查。由于当前 Telegram 存在大量 P1/P2 Bug，该功能 PR 的合并优先级是否会被稳定性修复抢占，需维护者明确权衡。
- **[Issue #6993](https://github.com/nearai/ironclaw/issues/6993)**（已开启 12 天）：OOBE 自动化任务原型的前端 PR #6994 已存在，但后端接线仍无负责人认领。作为 Epic #7044 的一部分，如果后端长期缺位，前端原型可能无法进入实际测试。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-08-13

## 今日速览

过去 24 小时项目活跃度中等偏上：共 6 条 Issue 更新（4 开放 / 2 关闭）和 8 条 PR 更新（7 条合并/关闭 / 1 条待合并），无新版本发布。合并的 PR 覆盖模型选择器、Windows 插件安装、Shell 图标兼容性、侧边栏 UI 与发布分支（Release/2026.8.12），显示 8 月例行迭代仍在推进。值得关注的是，一条提交于 4 月初的 PR（#1181）今日获得更新但仍处于开放状态，修复长期积压问题的意愿存在但节奏偏慢。社区讨论方面，今日无高热度新 Issue 产生，历史遗留问题（多为 3 月、4 月提交）持续占据讨论版面。

## 项目进展

今日有 7 条 PR 被合并/关闭，是近期合并量较高的一天，涉及多个功能模块：

| PR | 模块 | 内容 | 状态 |
|---|---|---|---|
| [#2482](https://github.com/netease-youdao/LobsterAI/pull/2482) | renderer | Skills 管理器拆分「我的/内置」标签页 | 已关闭 |
| [#2481](https://github.com/netease-youdao/LobsterAI/pull/2481) | renderer / cowork | 侧边栏任务搜索移至头部操作区，统一 macOS/Windows 外观 | 已关闭 |
| [#2480](https://github.com/netease-youdao/LobsterAI/pull/2480) | renderer / main | Release/2026.8.12 发布分支 | 已关闭 |
| [#2479](https://github.com/netease-youdao/LobsterAI/pull/2479) | main | Windows 插件安装保留 junction，避免 `EPERM` 符号链接失败 | 已关闭 |
| [#2478](https://github.com/netease-youdao/LobsterAI/pull/2478) | main | 修复 macOS/Windows 上不支持的 large 图标尺寸 | 已关闭 |
| [#2475](https://github.com/netease-youdao/LobsterAI/pull/2475) | renderer | 模型选择器为每个模型独立记忆思考强度 | 已关闭 |
| [#1233](https://github.com/netease-youdao/LobsterAI/pull/1233) | model | 模型提供商官网链接与 API Key 获取引导（含 i18n），修复 #731 遗留问题 | 已关闭 |

其中 #2475 和 #2479 是实质性的 bug 修复：前者修复了模型间思考强度互相覆盖的问题（用户可将不同模型设置为不同档位），后者修复了 Windows 插件安装时因跨卷移动导致的符号链接失败。PR #1233 是 4 月提交的功能补全（为模型提供商增加官网链接与 API Key 引导），合并时间跨度达 4 个月，建议关注该功能在后续版本的 UI 效果。PR #2480 为发布分支，表明 2026.8.12 版本已进入发布流程。

## 社区热点

今日无新出现的高热度讨论（新 Issue/PR 均无评论和点赞），讨论集中在若干历史遗留 Issue 上：

- [#1179 3.31版本强制沙箱怎么关？](https://github.com/netease-youdao/LobsterAI/issues/1179)：4 月 11 日提交，2 条评论，0 点赞。用户更新 3.31 后找不到关闭沙箱的入口，回滚到 3.30 恢复正常。这是一条「操作性功能求助」，且是强制变更后用户未获知如何配置的典型案例，背后诉求是**沙箱策略变更缺乏用户沟通与文档支持**。

- [#1236 插件 ID 不匹配警告](https://github.com/netease-youdao/LobsterAI/issues/1236)：4 月 1 日提交，2 条评论。每次 gateway 启动都输出配置警告（插件 entry key 与 manifest ID 不匹配），虽然不影响运行，但持续出现在日志中，属于「小问题长期无人解决」的高频触达用户的问题。

- [#2071 创建定时任务错误](https://github.com/netease-youdao/LobsterAI/issues/2071)：5 月 28 日提交，2 条评论，已关闭但无解决方案说明。用户报告在 2026.5.27 版本中创建定时任务时报错。

整体来看，本周社区讨论热度不高，且议题集中在旧问题之上，说明用户对新版本的反馈还没完全释放，或新版本功能改动未引发强讨论。

## Bug 与稳定性

今日主要问题均来自历史遗留 Issue，按严重程度排列：

1. **中等 — 卸载后程序仍可运行**（[#1173](https://github.com/netease-youdao/LobsterAI/issues/1173)，3 月 31 日提交）：用户卸载 LobsterAI 后窗口仍可继续运行并向飞书发送消息，用户明确质疑「留后门」。该问题已停留近 4 个月且无官方回应，**极易引发信任危机**，是当前所有开放 Issue 中对项目声誉负面影响最大的一个，建议优先处理并公开解释原理（大概率是进程未随卸载终止，而非后门）。

2. **中等 — 修改自建 agent 触发网关反复重启**（[#1180](https://github.com/netease-youdao/LobsterAI/issues/1180)，3 月 31 日提交）：修改自建 agent 图标导致网关循环重启，删除 agent 后恢复正常。仅在 3.31 版本中报告，需确认后续版本是否已修复。

3. **较低 — 插件 ID 不匹配警告**（[#1236](https://github.com/netease-youdao/LobsterAI/issues/1236)，4 月 1 日提交）：功能正常，仅日志告警，4 个月未修复。今日无关联 fix PR，建议在下一版本清理。

4. **较低 — 创建定时任务错误**（[#2071](https://github.com/netease-youdao/LobsterAI/issues/2071)，5 月 28 日提交）：已关闭但无解决方案说明，若为重复问题应链接到主 Issue，否则应补充关闭原因。

## 功能请求与路线图信号

- **多自定义模型提供商支持**（[#1174](https://github.com/netease-youdao/LobsterAI/issues/1174)，3 月 31 日提交）：用户希望支持多个自定义模型提供商并存，而非仅一个。目前仅 1 条评论，讨论参与度低，但结合 PR #2475 刚修复的「模型选择器」逻辑，以及近期对模型配置体验的持续投入，该需求有一定的纳入后续迭代的可能性。

- 今日无新增功能请求。历史请求（#1174）仍是主线外的长尾需求。

## 用户反馈摘要

- 「3.31 更新强制启用沙箱，找不到关闭入口，只能回滚 3.30」——用户对强制变更缺乏告知和配置路径感到不满（#1179）。
- 「每次启动都有插件 ID 不匹配警告，虽然不影响使用但很烦」——配置校验过于严格且长期不修复，影响用户对项目维护积极性的观感（#1236）。
- 「卸载后程序还能运行、还能发消息」——用户严重质疑项目是否留有后门，属于信任危机级别反馈（#1173），该问题悬置近 4 个月，即使技术上合理（如卸载未杀进程），也需要官方主动解释。

## 待处理积压

以下为开放超过一个月、今日更新仍活跃但未解决的重要条目：

| 条目 | 类型 | 提交时间 | 持续时间 | 备注 |
|---|---|---|---|---|
| [#1173 卸载后程序仍能运行](https://github.com/netease-youdao/LobsterAI/issues/1173) | 严重信任问题 | 2026-03-31 | >4 个月 | 涉及用户对项目信任，需尽快公开解释/修复 |
| [#1181 隐藏 OpenClaw 主 agent 会话](https://github.com/netease-youdao/LobsterAI/pull/1181) | PR | 2026-04-01 | >4 个月 | 今日有更新（commits），处于活跃开发状态，但长期未合并。建议推进 review 并合入，以清除最老的待合并 PR |
| [#1179 沙箱关闭入口](https://github.com/netease-youdao/LobsterAI/issues/1179) | 功能/文档缺失 | 2026-03-31 | >4 个月 | 需补充文档或在 UI 中提供配置入口 |
| [#1236 插件 ID 不匹配警告](https://github.com/netease-youdao/LobsterAI/issues/1236) | 小 bug | 2026-04-01 | >4 个月 | 低优先级但高频触发，建议随下一个版本清理 |
| [#1180 修改 agent 触发网关重启](https://github.com/netease-youdao/LobsterAI/issues/1180) | Bug | 2026-03-31 | >4 个月 | 需确认当前版本是否已修复，若已修复应关闭并标注版本号 |

**维护者建议**：优先处理 #1173（信任危机类问题，不处理会持续放大负面影响）；推进 #1181 的 review 合并；对 #1179、#1180、#1236 做出明确的「已修复（标注版本号）」或「计划修复」回应；#2071 已关闭但缺少关闭原因说明，建议补充。

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

# CoPaw 项目动态日报 — 2026-08-13

> 数据来源：[agentscope-ai/CoPaw](https://github.com/agentscope-ai/CoPaw)（注：数据中的仓库名为 `agentscope-ai/QwenPaw`，与 CoPaw 同步）

---

## 1. 今日速览

项目处于**高活跃度**状态：过去 24 小时内有 30 条 Issue 更新（23 条活跃/新开、7 条关闭）和 43 条 PR 更新（27 条待合并、16 条已合并/关闭），并发布了 v2.1.0-beta.4 小版本。值得关注的是，Issue 与 PR 中出现了**由 AI 辅助代笔提交的 bug 报告**（如 #6918），以及**首次贡献者提交的两项高质量性能与功能 PR**（#6953、#6940），说明社区参与度正在扩大。v2.1.0-beta.4 仅包含两个 bug 修复和版本号更新，属于**稳定性修补版本**，无明显破坏性变更。当日修复集中在文档预览、工具描述、工具参数类型强转、聊天时间显示、上下文压缩占位符等细节问题上。

---

## 2. 版本发布

### v2.1.0-beta.4
- **发布日期**：2026-08-12/13
- **发布链接**：https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.1.0-beta.4

**更新内容**：
- `fix(files)`：修复文档预览与暗色模式样式问题（PR #6915，作者 @rayrayraykk）
- `fix(tools)`：修正 `read_file` 工具的描述文案（PR #6898，作者 @AntiQuality）
- `chore`：版本号升级至 2.1.0b4

**破坏性变更**：无。
**迁移注意事项**：此版本为增量修复，沿用 2.1.0-beta.3 的配置即可，无需迁移操作。

---

## 3. 项目进展

当日合并/关闭的 16 条 PR 覆盖了以下方向，整体推进集中在**兼容性修复、文档建设、社区 PR 合入**三个维度：

| PR | 内容 | 状态 |
|---|---|---|
| [#6816](https://github.com/agentscope-ai/QwenPaw/pull/6816) | 修复 `consume_model_response` 对 dict 子类 `ChatResponse` 的 `__aiter__` KeyError（对应 Issue #6813），解决聊天自动标题生成失败 | 已合并，后因故被 [#6956](https://github.com/agentscope-ai/QwenPaw/pull/6956) 回滚，需关注 |
| [#6540](https://github.com/agentscope-ai/QwenPaw/pull/6540) | 在每次模型调用前清理孤儿工具消息（修复 #6407），提高 OpenAI 兼容提供商的容错性 | 已合并 |
| [#6913](https://github.com/agentscope-ai/QwenPaw/pull/6913) | 修复 macOS Computer Use 元素激活问题 | 已合并 |
| [#6937](https://github.com/agentscope-ai/QwenPaw/pull/6937) | Creator 模块多项生产加固：调度防双计费、最终合成自动复查、vendor 运行时启动引导、插件打包 fail-closed | 已合并 |
| [#6944](https://github.com/agentscope-ai/QwenPaw/pull/6944) | v2.1.0 发布说明更新 | 已合并 |
| [#6949](https://github.com/agentscope-ai/QwenPaw/pull/6949) | 新增双语《长期记忆》博客 | 已合并 |
| [#6950](https://github.com/agentscope-ai/QwenPaw/pull/6950) | 重写《Files 工作区》博客，降低阅读门槛 | 已合并 |

**点评**：#6937 是当日体量最大的合并，涉及 Creator 管线多项关键加固；#6540 解决了存量 bug #6407，前者已合并、后者仍在跟进中（见第 8 节）。#6816 的合并 → 回滚（#6956）节奏值得关注，说明修复方案可能引入了新的回归。

---

## 4. 社区热点

### 热门 Issue

**#6921 — 多步任务频繁无提示中断，需手动“继续”**（评论 5）
https://github.com/agentscope-ai/QwenPaw/issues/6921
用户报告在 2.1beta2/Windows 11 上执行多步骤任务时，模型输出规划语句后即停止，无任何提示，必须由用户输入“继续”才能推进。该问题与 #6927（多子 agent 死循环）高度相关，可能指向**同一个底层 Agent 执行循环缺陷**，目前已有多位用户确认复现，需优先排查。

**#6853 — prompts.py 对 Agent 撒谎：Dream 从未将摘要写入 MEMORY.md**（评论 5）
https://github.com/agentscope-ai/QwenPaw/issues/6853
用户通过代码追踪证明 ReMe 的 dream 流程从未实现提示词中声称的“自动同步至 MEMORY.md”。已由 PR [#6942](https://github.com/agentscope-ai/QwenPaw/pull/6942) 修复（将记忆提示词精简掉对 `MEMORY.md` 的错误描述），该 PR 当前待合并。

**#6918 — Agent 间消息每条都会创建新会话（“影子实例”）**（评论 2）
https://github.com/agentscope-ai/QwenPaw/issues/6918
该 Issue 由用户自己的 agent 代笔提交，核心问题是 agent 间通信时每条消息都会生成新的 AgentSession，导致重复输出/重复工具调用。与 #6925（用户希望协作在同一个会话窗口）互相印证，指向 **Agent 间通信机制的设计缺陷**。

**#6923 — LongHorizon-Harness 方向建议**（评论 1）
https://github.com/agentscope-ai/QwenPaw/issues/6923
社区成员推荐将 LongHorizon-Harness 的“长任务跨轮次不漂移”能力引入 CoPaw，目前讨论热度有限，但方向与 #6921/#6927 暴露的长任务稳定性问题直接相关，值得维护者研究。

### 热门 PR

**#6940 — 新增原生 DataPaw 应用运行时与分析工作区**（first-time-contributor）
https://github.com/agentscope-ai/QwenPaw/pull/6940
首次贡献者 @cyruszhang 提交，将 QwenPaw-Data 作为原生应用集成，附带持续分析工作区。仍在开放状态，待人工评审。若合入将显著扩展 CoPaw 的数据分析能力边界。

---

## 5. Bug 与稳定性

按严重程度排列：

| 严重度 | Issue | 问题描述 | 是否有修复 PR |
|---|---|---|---|
| 🔴 高 | [#6921](https://github.com/agentscope-ai/QwenPaw/issues/6921) | 多步任务无提示中断，须手动“继续”才恢复 | 无，待排查 |
| 🔴 高 | [#6927](https://github.com/agentscope-ai/QwenPaw/issues/6927) | 调用多个子 Agent 时反复进入死循环 | 无 |
| 🔴 高 | [#6932](https://github.com/agentscope-ai/QwenPaw/issues/6932) | 网络中断恢复后所有 LLM 请求持续超时，必须重启服务（当日复现两次） | 无 |
| 🟠 中高 | [#6780](https://github.com/agentscope-ai/QwenPaw/issues/6780) | 2.0.1 空闲几十分钟后假死，只能杀进程重启 | 无 |
| 🟠 中高 | [#6918](https://github.com/agentscope-ai/QwenPaw/issues/6918) | Agent 间消息每条都新建会话，产生“影子实例”，重复执行 | 无 |
| 🟠 中 | [#6926](https://github.com/agentscope-ai/QwenPaw/issues/6926)（已关闭） | sync.py 使用随机 UUID 而非真实 session_id 导入历史，18–50% 行成孤儿数据 | 已关闭，但未见对应修复说明，需确认 |
| 🟠 中 | [#6951](https://github.com/agentscope-ai/QwenPaw/issues/6951) | Scroll 压缩后重新进入会话，压缩前聊天记录不可见 | 无，与 #6541 相关 |
| 🟠 中 | [#6919](https://github.com/agentscope-ai/QwenPaw/issues/6919)（已关闭） | 2.0.1 频繁崩溃（console channel 报错） | 已关闭，但 #6955 有相似崩溃报告，很可能未彻底解决 |
| 🟡 中低 | [#6955](https://github.com/agentscope-ai/QwenPaw/issues/6955) | 概率性启动报错、崩溃退出（Windows asyncio） | 无 |

**回归风险提示**：#6816（dict-like 模型响应修复）已被 #6956 回滚，涉及聊天自动标题生成功能，beta 用户可能受影响。

---

## 6. 功能请求与路线图信号

以下需求在当日讨论中热度较高，结合已有 PR 判断后续纳入版本的可能性：

| Issue/PR | 需求 | 信号强度 | 判断 |
|---|---|---|---|
| [#6925](https://github.com/agentscope-ai/QwenPaw/issues/6925) | 多智能体协作希望在同一会话窗口 | 中（同 #6918 关联） | 涉及核心执行模型改动，短期难；但若修复 #6918 时一并优化交互模式则可落地 |
| [#6917](https://github.com/agentscope-ai/QwenPaw/issues/6917) | 允许 Agent 主动投递报告/消息至 Inbox | 中 | 可能是 2.1 的功能增量，需维护者确认 |
| [#6923](https://github.com/agentscope-ai/QwenPaw/issues/6923) | 引入 LongHorizon-Harness 长任务保真机制 | 中 | 与 #6921/#6927（长任务中断/死循环）直接相关，值得纳入路线图评估 |
| [#6929](https://github.com/agentscope-ai/QwenPaw/issues/6929)（已关闭） | 项目-对话-文件夹：以文件夹为对话基础 + 选中内容添加到对话 | 中 | 已关闭但评论 2 条，暂无明确回应；PR #6940（DataPaw）在功能上有部分重叠 |
| [#6940](https://github.com/agentscope-ai/QwenPaw/pull/6940)（PR） | 集成 DataPaw 原生应用与分析工作区 | 强 | 首次贡献者提交，待评审；若合入将作为 2.x 的功能亮点 |
| [#6952](https://github.com/agentscope-ai/QwenPaw/issues/6952) / [#6953](https://github.com/agentscope-ai/QwenPaw/pull/6953)（PR） | 通过排序 tool schema + 拆分 env_context 稳定 prefix cache | 强 | 已提交正式 PR，性能优化方向清晰，合入概率高 |
| [#6954](https://github.com/agentscope-ai/QwenPaw/pull/6954)（PR） | 新增 MiniMax TTS 支持 | 中 | 社区贡献，功能增量，合入概率中等 |

---

## 7. 用户反馈摘要

- **断点续跑体验差**：多位用户（#6921、#6927）反馈 Agent 在多步骤任务中经常“说到不做到”，规划完下一步就停下来等待用户输入“继续”，严重影响自动化体验。这是当日情绪最集中的痛点。
- **网络恢复不自愈**（#6932）：用户明确表示“网络中断是常见、正常的瞬态事件”，期望 CoPaw 能自动重连 LLM API，目前必须手动重启服务，实际使用中一天内复现两次，抱怨度较高。
- **升级后配置丢失**（#6957）：每次升级版本后，工具页面的插件配置需要重新配置一次（2.0.1b3/Tauri）。对从 beta 持续跟进用户造成明显摩擦。
- **时间显示类问题两连**：#6826（助手完成时间显示过早，2.0.1）和 #6948（管理后台对话时间显示 UTC 而非用户时区）。均为细节体验问题，后者已有一致复现步骤。
- **对杀软拦截的疑虑**（#6847）：同任务同模型下 WorkBuddy 不被杀软拦截、QwenPaw 会被杀软打死，用户对 CoPaw 的进程行为产生不信任感。
- **长期记忆透明度待提升**（#6853）：用户通过读代码发现的文档与实现不一致问题，虽然由社区 PR #6942 修复，但也反映出“memory 对用户/Agent 的可见性说明不足”这一更深层诉求。
- **正向反馈**：Daily 页面的“按时区分组”bug（#6883）有用户提交了清晰的复现路径；#6852 在前端渲染长工具输出时的可读性问题已关闭，说明该方向在持续改善。

---

## 8. 待处理积压

以下为长期未关闭/未响应的重点 Issue 与 PR，建议维护者优先关注：

| 类型 | 编号 | 说明 | 积压时间 |
|---|---|---|---|
| Issue | [#6407](https://github.com/agentscope-ai/QwenPaw/issues/6407) | 孤儿工具结果可在上下文压缩后被发送给 provider（PR #6540 已合入修复，需验证关闭） | 约 2 周 |
| Issue | [#6625](https://github.com/agentscope-ai/QwenPaw/issues/6625) | ACP 传输中通知与 prompt 响应竞态导致最终文本丢失（PR #6623 修复中） | 约 2 周 |
| PR | [#5992](https://github.com/agentscope-ai/QwenPaw/pull/5992) | 每会话模型覆盖（per-session model overrides），7 月 12 日提交，仍 Under Review | 约 1 个月 |
| PR | [#5869](https://github.com/agentscope-ai/QwenPaw/pull/5869) | 在 TUI/web/ACP 全部 UI 的斜杠命令自动补全，7 月 8 日提交，仍 Under Review | 约 1 个月 |
| Issue | [#6780](https://github.com/agentscope-ai/QwenPaw/issues/6780) | 2.0.1 空闲几十分钟后假死，评论有维护者参与但进展不明 | 6 天 |
| PR | [#6623](https://github.com/agentscope-ai/QwenPaw/pull/6623) | 修复 ACP 通知竞态，8 月 1 日起处于 Under Review，已 12 天 | 12 天 |

---

*本日报由 AI 自动生成，数据截止 2026-08-13。*

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