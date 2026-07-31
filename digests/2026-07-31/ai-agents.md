# OpenClaw 生态日报 2026-07-31

> Issues: 500 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-07-31 03:23 UTC

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

# OpenClaw 项目动态日报 — 2026-07-31


## 1. 今日速览

过去 24 小时内，OpenClaw 仓库保持极高活跃度：**500 条 Issue 更新**（新开/活跃 470，关闭 30）与 **500 条 PR 更新**（待合并 403，合并/关闭 97），但**今日无新版本发布**。社区讨论高度集中在会话状态（session-state）、消息丢失（message-loss）与安全边界（security）三大主题上；批量涌入的新 PR 主要针对 UI / 测试 / 文档等中低风险改动，而最严重的 **P0 内存泄漏（#91588）** 尚无对应修复提交，累积的环境告警风险在上升。总体判断：项目迭代速度快、贡献者参与度高，但 **PR 合入瓶颈（403 条待合并）与关键稳定性问题长期悬置** 是当前健康度的主要减分项。


## 2. 版本发布

今日无新版本 Release。


## 3. 项目进展

今日合并/关闭 97 条 PR，其中代表性合入包括：

- **修复 `edit` 工具模糊匹配导致的数据丢失**（[PR #116509](https://github.com/openclaw/openclaw/pull/116509)，已关闭）— 当 `oldText` 存在 NBSP 等格式差异时，写入路径会错误重建整行并破坏无关字节。此修复直接回应用户报告的数据损坏问题（#116459），属于高价值稳定性补丁。
- **修复 Control UI 混合 schema 联合值被静默移除**（[PR #116602](https://github.com/openclaw/openclaw/pull/116602)，已关闭）— 解决用户在生成设置中编辑时合法字面量丢失问题（关联 #113894）。
- **为运行时发现的 Ollama 模型保留 thinking 输出**（[PR #116584](https://github.com/openclaw/openclaw/pull/116584)，状态 `🚀 automerge armed`）— 修复 `ollama/*` 通配符策略下有效思考级别被拒绝或降级的问题，AI 辅助生成，已完成验证并进入自动合并。
- **修复 Synology Chat 长消息被 webhook 拒绝**（[PR #116645](https://github.com/openclaw/openclaw/pull/116645)，新提交）— 超过 2000 字符的回复会因 `msg too long` 丢失，提交注册标准 Markdown 处理链路解决。
- **修复语音唤醒旧版导入时 SQLite 提交失败仍归档源文件**（[PR #116629](https://github.com/openclaw/openclaw/pull/116629)，新提交）— 回滚后数据未导入但源文件已归档，导致隐性数据丢失。
- **修复 aborted 工具调用结果缺失**（[PR #116642](https://github.com/openclaw/openclaw/pull/116642)，新提交）— 批量执行中途中断时，已提交的 `tool_use` 缺少对应 `tool_result`，修复会话一致性问题。

整体来看，本日合入以 **数据安全与状态一致性修复** 为主线，项目在会话可靠性和工具执行正确性上持续推进；但 403 条待合并 PR 意味着维护者审查仍是主要瓶颈。


## 4. 社区热点

今日讨论最集中的 Issue 反映了用户对 **会话隔离与消息正确路由** 的强需求：

- **[#25592 Text between tool calls leaks to messaging channels](https://github.com/openclaw/openclaw/issues/25592)** — 39 条评论，社区最热议题。Agent 在工具调用间产生的内部处理文本（错误处理、处理确认、叙述）被错误发到 Slack/iMessage 等可见渠道，严重干扰用户体验。Issue 已挂 `needs-product-decision` 与 `linked-pr-open`，说明讨论已进入方案评估阶段但尚未定论。
- **[#91588 Gateway Memory Leak — RSS 350MB → 15.5GB](https://github.com/openclaw/openclaw/issues/91588)** — 22 条评论，P0 级。内存泄漏导致反复 OOM 崩溃和 `launchd-handoff` 重启循环，是当前仓库**最严重的未修复稳定性问题**。
- **[#91009 Codex PreToolUse hook relay 触发 CPU 满载](https://github.com/openclaw/openclaw/issues/91009)** — 18 条评论。每次工具调用衍生多个 100% CPU 的 `openclaw-hooks` 进程并阻塞 gateway RPC，已有对应 PR（#111205）处于 needs-proof 状态。

**用户诉求分析**：三大热点背后共同指向 **“系统请勿打扰用户、后台请保持稳定”** —— 内部文本不外泄、进程不泄漏、不产生用户可见的异常负载。这些都是成熟度/生产可用性的关键指标。


## 5. Bug 与稳定性

按严重程度排列如下：

| 级别 | Issue | 问题概要 | 是否有 Fix PR |
|---|---|---|---|
| **P0** | [#91588 Gateway 内存泄漏](https://github.com/openclaw/openclaw/issues/91588) | RSS 从 350MB 增长至 15.5GB，2-3 天内 OOM 崩溃，反复重启 | ❌ 无 |
| **P1** | [#91009 Codex hook relay CPU 满载](https://github.com/openclaw/openclaw/issues/91009) | 每次工具调用派生 CPU-bound 进程，阻塞 gateway RPC | ✅ [#111205](https://github.com/openclaw/openclaw/pull/111205)（needs proof） |
| **P1** | [#25592 工具调用间文本泄漏至消息渠道](https://github.com/openclaw/openclaw/issues/25592) | 内部处理输出对用户可见，UX 严重受损 | ⚠️ linked-pr-open 但未明示 |
| **P1** | [#29387 agentDir 下 Bootstrap 文件被静默忽略](https://github.com/openclaw/openclaw/issues/29387) | 仅 workspace 目录的引导文件被注入系统提示词，与文档不符 | ❌ 无 |
| **P1** | [#39476 A2A sessions_send 回环导致重复消息](https://github.com/openclaw/openclaw/issues/39476) | B 调用 sessions_send 回 A 产生重复消息 | ✅ [#112326](https://github.com/openclaw/openclaw/pull/112326)（needs proof） |
| **P1** | [#43367 多智能体编排不稳定](https://github.com/openclaw/openclaw/issues/43367) | 并发 agents add 配置覆盖、session-lock 失败、子任务脱离 | ❌ 无 |
| **P1** | [#41744 Feishu 图片读取后媒体丢失](https://github.com/openclaw/openclaw/issues/41744) | read 图片成功但最终回复丢失附件 | ❌ 无 |
| **P1** | [#69118 Claude CLI 群组会话每轮重置](https://github.com/openclaw/openclaw/issues/69118) | extraSystemPromptHash 漂移导致会话状态丢失 | ❌ 无（companion #64386） |
| **P1** | [#53540 大参数工具调用触发 “Network connection lost”](https://github.com/openclaw/openclaw/issues/53540) | 参数生成延迟超过请求超时，embedded runner 失败 | ❌ 无 |
| **P1** | [#100778 预检压缩失败永久锁定 Composer](https://github.com/openclaw/openclaw/issues/100778) | 用户无法继续发送任何消息 | ❌ 无 |
| **P1** | [#99586 工具面在 gateway 操作后返回空白](https://github.com/openclaw/openclaw/issues/99586) | exec/read/write 失效，容器重启仅短暂缓解 | ❌ 无 |

另有若干 P1 级消息路由/回显问题（#39847、#41165、#42820 等）已有对应修复 PR 在途。**最需警惕的是 #91588 与 #29387**——前者是 P0 级资源泄漏却无任何修复提交，后者是核心功能与文档不一致的静默故障，均建议维护者优先响应。


## 6. 功能请求与路线图信号

以下高赞功能请求反映了社区对 **安全可控、多智能体、部署灵活性** 的明确诉求：

| 热度 | 功能 Issue | 社区诉求 | 路线图判断 |
|---|---|---|---|
| 👍 12 | [#39604 web_fetch 私有网络访问开关](https://github.com/openclaw/openclaw/issues/39604) | 增加 `tools.web.fetch.allowPrivateNetwork` opt-in 配置，默认关闭 | 安全边界清晰、实现成本低，**高概率纳入**；已 linked-pr-open |
| 👍 10 | [#42840 Control UI 支持 MathJax/LaTeX](https://github.com/openclaw/openclaw/issues/42840) | 数学公式渲染，服务科研/教育用户 | UI 增强，**有望在 web-ui 迭代中落地** |
| 👍 7 | [#37634 sandbox workspaceAccess=none 时保持可写](https://github.com/openclaw/openclaw/issues/37634) | 隔离工作区只读导致工具无法正常工作 | 影响沙箱可用性，**建议优先**；已 fix-shape-clear |
| 👍 6 | [#20786 Telegram Business Bot 支持](https://github.com/openclaw/openclaw/issues/20786) | 接入 business_message / business_connection 更新 | 渠道扩展，需 Telegram API 适配，**中期候选** |
| 👍 5 | [#27445 `announceTarget` 子代理完成路由选项](https://github.com/openclaw/openclaw/issues/27445) | 子代理完成通知改由主代理编排处理 | 多智能体编排核心需求，**高价值**；已 linked-pr-open |
| 👍 5 | [#67413 每代理独立 dreaming 配置](https://github.com/openclaw/openclaw/issues/67413) | 避免所有 workspace 同时 dreaming 导致 OOM | 直接解决多代理部署痛点，**建议纳入** |
| — | [#22438 分层 Bootstrap 文件加载](https://github.com/openclaw/openclaw/issues/22438) | 减少上下文浪费，按需加载引导文件 | 与 #29387 的修复方向协同，**可能一并规划** |
| — | [#42026 分布式 Agent Runtime（控制面/计算面分离）](https://github.com/openclaw/openclaw/issues/42026) | 单体 gateway 拆分为控制平面与代理运行时 | 架构级调整，**远期方向**；RFC 阶段 |

**路线图信号总结**：下一版本大概率优先解决 **Bootstrap 加载机制**（#29387 的修复 + #22438 的渐进式加载）、**沙箱可写性**（#37634）与 **私有网络安全开关**（#39604）。多智能体相关能力（#27445、#20786、#42026）虽呼声高，但涉及面广，预计在后续大版本中逐步展开。


## 7. 用户反馈摘要

从今日活跃 Issue 评论中提炼的真实用户声音：

- **内存管理体验混乱**（[#43747](https://github.com/openclaw/openclaw/issues/43747)）：同一团队 3 人使用 OpenClaw，各自的记忆存储方式完全不同——有人走 `main.sqlite` 分块嵌入，有人存纯文本，有人用插件；“I never see any of our memory is managed in sameway”——记忆行为不一致令团队用户困惑。
- **自托管生产环境的 25 项问题**（[#41372](https://github.com/openclaw/openclaw/issues/41372)）：用户以 2GB VPS 运行 4 周（v2026.2.6 → v2026.3.8），汇总了配置崩溃、CLI 文档缺失、Discord/cron 故障等 25 项发现，是典型的中小规模自托管反馈样本，对稳定性改进很有参考价值。
- **记忆文件膨胀无保护**（[#42877](https://github.com/openclaw/openclaw/issues/42877)）：重度用户（16 个 crons + 多代理 + Telegram 网关）反馈 `MEMORY.md` 持续膨胀，“grow without any guardrails”，希望引入硬性字符上限。
- **模型名校验缺失**（[#39811](https://github.com/openclaw/openclaw/issues/39811)）：用户可写入任意模型名（如 `openai/gpt-5.3`），系统不校验上游是否存在，造成静默配置错误——用户认为“The system treats any string as a valid model name”是明显设计缺陷。
- **工具错误警告干扰用户**（[#39406](https://github.com/openclaw/openclaw/issues/39406)）：`edit` 工具重试成功的情况下，失败警告仍推送到用户可见渠道（“⚠️ 📝 Edit failed”），用户认为这种瞬时错误不应打扰聊天界面。
- **跨渠道回复丢失**（[#54531](https://github.com/openclaw/openclaw/issues/54531)）：Telegram/Discord/WhatsApp 上，Agent 生成了回复但用户从未收到，回复仅出现在 Gateway UI 或 Nerve 面板中——“the user never receives it on their phone”——消息投递可靠性仍然是渠道集成的主要痛点。

整体来看，用户对多智能体编排、记忆管理和消息可靠性抱有较高期待，而这些恰好是本日 Issue 密度最高的区域。


## 8. 待处理积压

以下重要 Issue/PR 长期未合入或缺少维护者响应，建议重点跟进：

| 类型 | 编号 | 创建时间 | 状态/阻塞原因 |
|---|---|---|---|
| Issue（P0） | [#91588 Gateway 内存泄漏](https://github.com/openclaw/openclaw/issues/91588) | 2026-06-09 | 已 52 天，**无任何 fix PR**，OOM 影响面持续扩大 |
| Issue（P1） | [#29387 agentDir Bootstrap 文件被忽略](https://github.com/openclaw/openclaw/issues/29387) | 2026-02-28 | 已 5 个月，14 条评论 5 个 👍，功能与文档不符，仍无修复 |
| Issue（P1） | [#25592 工具调用间文本泄漏](https://github.com/openclaw/openclaw/issues/25592) | 2026-02-24 | 39 条评论全场最高，仍卡在 `needs-product-decision` |
| PR（P1） | [#50520 strip inbound metadata](https://github.com/openclaw/openclaw/pull/50520) | 2026-03-19 | 已 4 个月，状态 `⏳ waiting on author`，修复 #39847 的安全性问题 |
| PR（P1） | [#81190 溢出前截断工具结果](https://github.com/openclaw/openclaw/pull/81190) | 2026-05-12 | 已 2.5 个月，`ready for maintainer look` 但一直未合入，直接改善长会话稳定性 |
| PR（P1） | [#95333 可信入站装饰契约](https://github.com/openclaw/openclaw/pull/95333) | 2026-06-20 | 修复 #95279，XL 体量 + 多重 merge-risk，审查成本高但安全影响大 |
| Issue（P1） | [#69118 Claude CLI 群组会话重置](https://github.com/openclaw/openclaw/issues/69118) | 2026-04-19 | companion issue #64386 后仍复发，会话层机制问题可能波及更多渠道 |
| PR（P1） | [#114388 移除存储的默认代理](https://github.com/openclaw/openclaw/pull/114388) | 2026-07-27 | 涉及 9 个标签 + 3 个 merge-risk（compatibility/auth-provider/session-state），架构级变更，需谨慎但及时的 review |

**风险提示**：P0 内存泄漏（#91588）与高热度 UX 问题（#25592）分别代表了“稳定性”和“体验”两条线上的最大隐患，建议维护者优先分配资源；同时在合并策略上，404 条待合并 PR 的审查积压已开始延缓安全修复（如 #50520）的落地速度。


*本日报由 AI 自动生成，数据来自 OpenClaw GitHub 仓库 2026-07-31 公开动态。*

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比分析报告

**报告日期**：2026-07-31

---

## 1. 生态全景

个人 AI 助手 / 自主智能体开源生态在 2026-07-31 呈现"**头部极活跃、长尾显著分化**"的格局：以 OpenClaw（单日 500 Issue + 500 PR 更新）为绝对核心，IronClaw、CoPaw、Zeroclaw、NanoBot 构成第二梯队（日均 PR 更新 40–50 条），而 NullClaw、TinyClaw、EasyClaw 三项目 24 小时零活动，已实质休眠。所有项目今日均无新版本发布，但合并流密度高（OpenClaw 97 条、IronClaw 24 条、CoPaw 21 条、NanoBot 27 条），说明生态处于"高频迭代但未到发布节点"的窗口期。跨项目的高频议题高度趋同——**消息可靠性、安全边界、记忆治理、多智能体编排**是共同攻坚方向，显示生态正从"功能拼装"集体转向"生产级可用"。

---

## 2. 各项目活跃度对比

| 项目 | Issue 更新 | PR 更新 | Release | 健康度评估 |
|---|---|---|---|---|
| **OpenClaw** | 500（新开/活跃 470，关闭 30） | 500（待合并 403，合并/关闭 97） | 无 | **中** — 极活跃但审查瓶颈严重；P0 内存泄漏（#91588）52 天无修复 |
| **IronClaw** | 39（活跃 33，关闭 6） | 50（待合并 26，合并/关闭 24） | 无 | **良** — 合并率高、架构 Wave 0 有序推进；新报 P0 跨用户内存泄露（#6900） |
| **CoPaw** | 21（活跃 16，关闭 5） | 46（待处理 25，合并/关闭 21） | 无 | **良** — Bug 修复闭环快（当日/次日有 PR）；v2.0 性能回归（#6307）与 UI 冻结（#6589）悬置 |
| **NanoBot** | 5（活跃 4，关闭 1） | 45（合并/关闭 27） | 无 | **优** — 合并效率最高梯队、CI 工程化出色；6 个 `[conflict]` PR 滞留超 5 个月 |
| **Zeroclaw** | 15（全部活跃） | 50（待合并 49，关闭 1） | 无 | **中** — S0 安全响应快（24h 内出 PR）；但合并率仅 2%，RFC 讨论多落地少 |
| **PicoClaw** | 7（新开 4，关闭 3） | 17（待合并 12，关闭 5） | 无 | **中** — 无新功能合入；OAuth 需求 stale 关闭后被原样重提（#3302） |
| **NanoClaw** | 2（新增） | 15（合并/关闭 4） | 无 | **良** — 供应链加固与镜像优化扎实；入站消息操作失败（#3153）待修 |
| **LobsterAI** | 0（无新 Issue） | 10（合并/关闭 7，待处理 3） | 无 | **优** — 合并效率高；邮件路径遍历、账户隔离等安全/企业级修复当日合入 |
| **Moltis** | 2（新增） | 4（合并 1，待处理 3） | 无 | **中** — 新增高危 Vault 认证缺失（CWE-306），权限修复 PR #1170 待合入 |
| **ZeptoClaw** | 0 | 1（待合并） | 无 | **低** — 唯一安全 PR（子进程密钥隔离）待审 8 天，近乎半停滞 |
| **NullClaw / TinyClaw / EasyClaw** | 0 | 0 | 无 | **停滞** — 24 小时无任何活动 |

---

## 3. OpenClaw 在生态中的定位

- **生态绝对锚点与参照系**：OpenClaw 单日 Issue/PR 更新量是第二梯队（IronClaw/Zeroclaw/CoPaw）的约 10 倍，其命名范式（*Claw）被至少 7 个项目沿用（ZeroClaw、PicoClaw、NanoClaw、ZeptoClaw、TinyClaw、EasyClaw、IronClaw 的旧名）。多个项目直接引用 OpenClaw 的 PR/Issue 作为设计参考（如 Zeroclaw #9562 引用 OpenClaw 的滚动修复方案），实质上承担了**生态上游设计与标准输出者**的角色。
- **核心优势**：渠道覆盖最广、社区参与者最多、功能迭代速度最快。本日合入的 edit 工具数据损坏修复（#116509）、Ollama thinking 保留（#116584）等均直接回应用户痛点，展示了大型社区的反馈消化能力。
- **技术路线差异**：相较 IronClaw 的 Rust 重型架构 + 分 Wave 重构、PicoClaw 的 Go 嵌入式极简路线（<10MB RAM）、CoPaw 的 Python 桌面深度集成、Zeroclaw 的安全优先 Rust 网关，OpenClaw 走的是**通用型网关 + 多智能体运行时 + 全渠道兼容**的综合路线，功能覆盖面最广但架构复杂度也最高。
- **相对短板**：规模带来的审查瓶颈（403 条待合并 PR）已开始延缓安全修复落地（如 #50520 等待 4 个月）；P0 内存泄漏（#91588）持续 52 天无修复提交，是生态中最严重的稳定性赤字。IronClaw 的架构执行纪律（EPIC + 验收契约）和 CoPaw 的快速 Bug 闭环（如 #6562 一次修 3 个缺陷）值得 OpenClaw 借鉴。

---

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **消息与会话可靠性** | OpenClaw、NanoBot、IronClaw、CoPaw、PicoClaw、Zeroclaw | OpenClaw #25592 工具调用文本泄漏至用户渠道（39 评论为全场最高）；NanoBot #5136 空响应误路由；IronClaw #6284 要求模型从"100% 运行中间错误"恢复；CoPaw #6524 MCP server 重启后会话无法自动恢复。核心诉求：**内部状态不打扰用户、消息不丢失、长会话可恢复**。 |
| **安全边界加固** | Zeroclaw、Moltis、OpenClaw、NanoClaw、CoPaw、LobsterAI、ZeptoClaw | Zeroclaw #9565 网关 webhook 不验签（S0，攻击者可注入消息）；Moltis #1177 Vault 端点缺认证（CWE-306）；LobsterAI #2389 邮件附件路径遍历（已修复）；ZeptoClaw #645 子进程继承全部环境变量致密钥泄漏；NanoClaw #3158 签名验证因变量未定义被静默跳过。安全已从"可选加固"变为**默认红线**。 |
| **记忆与上下文治理** | OpenClaw、Zeroclaw、CoPaw、PicoClaw | Zeroclaw #9048 RFC 提出会话历史与长期记忆分离；OpenClaw #43747 同一团队三人记忆存储方式完全不同 + #42877 MEMORY.md 无上限膨胀；CoPaw #6555 记忆压缩窗口导致早期会话永久丢失。**"记什么、记多久、存哪里"成为架构级问题**。 |
| **标准协议与互操作性** | Zeroclaw、PicoClaw、CoPaw、NanoBot | Zeroclaw #8603 OpenAI Chat Completions 适配器（接入 Open WebUI/LobeChat）、#8933 OTel 跨轮次追踪；PicoClaw #3302 OAuth 2.1 + PKCE 重复提交；CoPaw #6557 MCP 工具名以 `-` 开头被严格 API 拒绝。**兼容既有生态是降本增效的共同选择**。 |
| **多智能体编排** | OpenClaw、CoPaw、Zeroclaw、NanoBot | OpenClaw #27445 子代理完成通知路由、#43367 多智能体配置覆盖/session-lock 失败；CoPaw #6588 `spawn_subagent` 参数死锁；Zeroclaw #8568 Mixture-of-Agents 虚拟 provider；NanoBot #4291 子代理可配置模型预设。**从"单 Agent 对话"向"多角色协作"演进，但稳定性普遍不足**。 |
| **轻量 / 本地部署** | PicoClaw、Zeroclaw、NanoClaw、CoPaw | PicoClaw 以 <10MB RAM / 亚秒级启动 / $10 硬件站位；Zeroclaw #5287 本地小模型 compact profile、#7951 effort 路由；NanoClaw #2301 GitHub 轮询模式适配 NAT/防火墙；CoPaw #6579 桌面版独立 Python 运行环境。**生态向"云端集群 + 边缘设备"两极同时扩张**。 |

---

## 5. 差异化定位分析

| 项目 | 核心定位 | 关键架构特征 | 目标用户 |
|---|---|---|---|
| **OpenClaw** | 通用型个人 AI 助手网关，渠道与工具链覆盖最广 | 网关 + 多智能体运行时 + 插件化；会话状态/消息路由为当前核心痛点 | 开发者、自托管用户、企业 PoC |
| **IronClaw** | 生产级可靠性的自主 Agent 平台 | Rust + crate 化架构，正在执行 10-Wave "Reborn" 重构；技能路由/激活 EPIC 推进中 | 对架构演进与稳定性有要求的中大型团队 |
| **CoPaw** | AI 桌面助手 + 多模态工具链 | Python（AgentScope 生态）；Computer Use（Windows/macOS GUI 自动化）已合入主线 | 桌面端深度用户、Python 生态开发者 |
| **Zeroclaw** | 安全优先的 Agent 网关 | Rust；S0 漏洞 24h 内出修复 PR；RFC 驱动架构演进 | 安全敏感型自托管用户、Rust 社区 |
| **NanoBot** | 轻量多频道聊天机器人 | Python；WebUI 迭代快（Quick Chat 合入）、Responses API 推理状态保留 | 教育/研究机构、轻量聊天机器人部署者 |
| **NanoClaw** | 供应链安全与容器化交付 | 镜像加固（781MB→611MB）、签名验证、Skill registry 门禁 | 容器化部署、DevOps 用户 |
| **PicoClaw** | 嵌入式 / 低成本边缘 Agent | Go 原生；<10MB RAM、亚秒级启动；IRC/Telegram 等协议适配 | 嵌入式开发者、边缘计算、IoT 场景 |
| **LobsterAI** | 企业级桌面 AI 协作套件 | 桌面客户端（renderer/main 分离）；企业账户隔离、/btw 侧边聊天、邮件安全 | 企业用户，尤其中文市场 |
| **Moltis** | 渠道体验增强型 Agent 网关 | Slack 确认反应/Block Kit 已落地；Vault 凭据管理；Langfuse/OTel 可观测性基座 | 团队协作场景，Slack/Telegram 深度用户 |
| **ZeptoClaw** | 运行时安全加固的轻量 Agent | 子进程环境变量清理、超时进程树回收 | 生产环境运行不可信模型命令的用户 |

---

## 6. 社区热度与成熟度

**第一梯队 · 快速迭代期（功能扩张与稳定性并进）**

- **OpenClaw**：单日 1000 条 Issue/PR 更新，生态绝对核心；但 403 条待合并 PR + P0 内存泄漏悬置，是"高速扩张期"的典型阵痛。
- **IronClaw**：合并 24 条，架构 WS0 落地 + 跨渠道附件合入，EPIC/验收契约机制最规范，处于"重构中主动进化"阶段。
- **CoPaw**：合并 21 条，Bug 修复闭环快（当日/次日关联 PR 跟进），但 v2.0 性能回归（2s 固定开销）说明新架构尚未完全收敛。
- **NanoBot / Zeroclaw**：前者以 27 条合并和 CI 工程化展示成熟度；后者虽合并率低，但安全响应速度和 RFC 讨论深度构成其独特价值。

**第二梯队 · 质量巩固期（功能推进放缓、精细化打磨）**

- **LobsterAI**：日合并 7 条，企业级功能方向清晰（账户隔离、邮件安全），进入稳定增强节奏。
- **NanoClaw**：以供应链安全和镜像优化为主线，功能扩展型 PR（语音、GitHub 轮询）长期待合入。
- **PicoClaw / Moltis**：活跃度中低；前者功能 PR 平均等待 11–30 天，后者安全漏洞响应不及时，均需维护者加速决策。

**第三梯队 · 低活跃 / 停滞**

- **ZeptoClaw**：仅 1 条安全 PR 待审，实质半停滞。
- **NullClaw / TinyClaw / EasyClaw**：24 小时零活动，可视为休眠项目。

---

## 7. 值得关注的趋势信号

1. **"生产可用性"取代"功能数量"成为第一关键词**：OpenClaw 的 P0 内存泄漏（52 天无修复）、IronClaw 的错误可恢复性 EPIC（要求从 100% 运行中间错误恢复，并定义五条可验收契约）、CoPaw 的性能回归讨论（用户直言"宁可留在 v1.x"），均指向对 7×24 稳定运行的硬性要求。**开发者选型时应把 Issue 响应速度与修复周期纳入核心评估指标，而非仅看功能列表。**

2. **安全边界从"外网暴露面"延伸到"模型与工具的信任边界"**：webhook 验签（Zeroclaw S0）、Vault 认证（Moltis）、子进程密钥隔离（ZeptoClaw）、工具输出防泄漏（OpenClaw #25592）形成完整防御链条——不仅要防外部攻击者，还要防**模型被提示注入后带来的内部风险**。这是 AI Agent 区别于传统 Web 应用的新安全维度。

3. **记忆管理将成为下一轮架构分水岭**：Zeroclaw 已发起会话历史与长期记忆分离的 RFC；OpenClaw 面临记忆存储不统一（同一团队三人三种方式）和无限膨胀的抱怨；CoPaw 出现记忆压缩丢数据 Bug。**谁能率先定义"分级记忆 + 生命周期治理"的规范，谁就可能主导下一阶段 Agent 架构标准。**

4. **标准协议兼容是生态扩张的必由之路**：多项目同时向 OpenAI Chat Completions、OTel、MCP、OAuth 2.1 靠拢，说明 Agent 正从"封闭单体"走向"可嵌入既有工具链的组件"。对开发者而言，**优先选择协议开放的项目可显著降低未来集成与迁移成本。**

5. **PR 审查速度成为开源项目的隐形竞争力**：OpenClaw（403 待合并）、Zeroclaw（49/50 待合并）、PicoClaw（功能 PR 等待 11–30 天）与合入迅速的 NanoBot / LobsterAI / IronClaw 形成鲜明对比。审查效率直接影响贡献者留存——CoPaw 已有 first-time contributor PR 滞留近 30 天，PicoClaw 的 OAuth 需求 4 个月无人响应后被原样重提。**社区活跃度 ≠ 社区健康度，合并吞吐量才是关键指标。**

6. **轻量本地部署与云上集群两极分化加速**：PicoClaw 的 <10MB RAM 嵌入式定位、Zeroclaw 的本地小模型 profile 与 effort 路由、NanoClaw 的 NAT 友好轮询模式，与 IronClaw 的企业级架构重构、CoPaw 的桌面自动化并行推进。生态正在覆盖**从边缘硬件到云端集群的完整光谱**，为不同资源条件的开发者提供了清晰的分层选型空间。

7. **桌面端与渠道端同时向"多模态交互"升级**：IronClaw 跨渠道附件流（XL PR 已合并）、CoPaw Computer Use 桌面自动化、PicoClaw DashScope TTS 与微信语音、Moltis Slack Block Kit/确认反应、NanoClaw 本地 Whisper——**语音、图像、GUI 操作、交互式按钮正在成为 Agent 渠道能力的标配**，而非可选项。

---

*本报告基于 2026-07-31 各项目 GitHub 公开数据自动生成，仅供技术决策与社区动态参考。*

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 · 2026-07-31

## 1. 今日速览

过去 24 小时 NanoBot 仓库保持高活跃度：PR 更新 45 条（合并/关闭 27 条），Issue 更新 5 条（新开/活跃 4 条，关闭 1 条），无新版本发布。合入工作集中在 WebUI 体验改进（Quick Chat、导航高亮重构）、Responses API 推理状态保留，以及 Agent 在 `finish_reason='length'` 场景下的稳定性修复。Issue 侧浮现两个用户可见的疑似回归：WhatsApp 音频发送失败（[#5149](https://github.com/HKUDS/nanobot/issues/5149)）与响应中暴露工具调用代码（[#5185](https://github.com/HKUDS/nanobot/issues/5185)），均尚无对应修复 PR，建议优先排查。Termux 时区兼容问题（[#5187](https://github.com/HKUDS/nanobot/issues/5187)）已获得当日提交的修复 PR（[#5189](https://github.com/HKUDS/nanobot/pull/5189)），响应迅速。整体项目健康度良好，但存在 6 个带 `[conflict]` 标记的 PR 长期未合入，需维护者清理。

## 2. 版本发布

暂无新版本。

## 3. 项目进展

过去 24 小时共有 27 个 PR 被合并或关闭，以下为关键合入项：

- **[#5136](https://github.com/HKUDS/nanobot/pull/5136)（合入）**：修复 `finish_reason='length'` 且文本内容为空时，带工具调用的响应被误路由到空响应重试的问题，改为进入长度恢复流程。解决了 [#5133](https://github.com/HKUDS/nanobot/issues/5133)。
- **[#5145](https://github.com/HKUDS/nanobot/pull/5145)（合入）**：重构 CI 中的超时敏感测试为 stdin 门控握手，并将频道依赖安装改为批量解析，显著提升 CI 稳定性与速度。
- **[#5172](https://github.com/HKUDS/nanobot/pull/5172)（合入）**：保留并重放 Responses API 完整的输出项链（含加密 reasoning），同时压缩上下文，落地了 OpenAI ARC-AGI-3 报告中的两项能力。
- **[#5181](https://github.com/HKUDS/nanobot/pull/5181) 与 [#5182](https://github.com/HKUDS/nanobot/pull/5182)（合入）**：为 WebUI 增加持久化 Quick Chat 入口，并统一侧边栏选中态高亮，改善多页面导航体验。

整体而言，项目在 Agent 运行时稳定性、WebUI 交互完善度和 CI 工程化三个维度同时推进。尤其 Responses API 推理状态保留为后续多轮工具调用与长上下文场景打下了基础。

## 4. 社区热点

- **[#5149](https://github.com/HKUDS/nanobot/issues/5149)：WhatsApp 无法发送音频（3 条评论，今日最热）**。用户反馈安装当前版本后无法发送音频文件，但接收正常。日志中出现 `neonize.utils.ffmpeg WARNING`，指向音频转码链路存在问题。音频是 WhatsApp 频道的核心消息类型，该问题直接影响日常使用，讨论热度最高。
- **[#5185](https://github.com/HKUDS/nanobot/issues/5185)：响应中出现工具调用代码（1 条评论，附截图）**。用户表示“突然开始”出现该问题且无法复现步骤。考虑到其报告时间与 [#5172](https://github.com/HKUDS/nanobot/pull/5172) 合并时间接近，建议维护者排查两者是否存在关联。

## 5. Bug 与稳定性

按严重程度排序：

- **高：[#5185](https://github.com/HKUDS/nanobot/issues/5185) 工具调用代码暴露在用户可见响应中**。疑似近期改动引入的回归，尚无修复 PR。建议排查与 Responses API 输出项链改动（[#5172](https://github.com/HKUDS/nanobot/pull/5172)）的关联。
- **高：[#5149](https://github.com/HKUDS/nanobot/issues/5149) WhatsApp 无法发送音频**。日志提示 ffmpeg 相关警告，影响核心媒体能力，无对应 PR。
- **中：[#5187](https://github.com/HKUDS/nanobot/issues/5187) Termux 环境因时区数据缺失无法加载配置**。已有修复 PR [#5189](https://github.com/HKUDS/nanobot/pull/5189) 于今日提交，通过安装 `tzdata` 兜底并保留严格校验。
- **中：[#3106](https://github.com/HKUDS/nanobot/issues/3106) GPT 定时任务工具执行完成后无法生成最终答案**。创建于 4 月，今日有更新但仍无维护者回复，涉及模型特定行为，建议排查工具调用链路。
- **已修复：[#5133](https://github.com/HKUDS/nanobot/issues/5133)** 由 [#5136](https://github.com/HKUDS/nanobot/pull/5136) 合入解决。

## 6. 功能请求与路线图信号

- **WebUI 即时会话成为迭代重点**：Quick Chat 已合入（[#5181](https://github.com/HKUDS/nanobot/pull/5181)），Temporary Chat 扩展在 PR [#5184](https://github.com/HKUDS/nanobot/pull/5184) 中，预计近期将进一步丰富 WebUI 会话模式。
- **会话存储迁移 SQLite（[#5173](https://github.com/HKUDS/nanobot/pull/5173)）**：将 `sessions.db` 作为唯一运行时存储，事务性导入现有 JSONL 并保留回滚备份。该 PR 展示出明确的架构演进方向，若合入会涉及既有用户的迁移与回滚策略，值得关注。
- **Telegram 自定义 Bot API（[#4919](https://github.com/HKUDS/nanobot/pull/4919)）**：支持自建 Bot API 与企业网关，面向自托管用户，目前处于开放状态。
- **子代理可配置模型预设（[#4291](https://github.com/HKUDS/nanobot/pull/4291)）**：允许 `spawn` 时通过命名预设切换子代理的 provider、model 与 token 限制，增强多模型编排能力。
- **Heartbeat 隔离会话（[#4551](https://github.com/HKUDS/nanobot/pull/4551)）与 skill 状态诊断（[#1319](https://github.com/HKUDS/nanobot/pull/1319)）**：均为社区提交的成熟功能 PR，若解决冲突可显著提升运维体验。

## 7. 用户反馈摘要

- **音频发送是当前最直接的用户痛点**：用户在 [#5149](https://github.com/HKUDS/nanobot/issues/5149) 中描述“安装当前版本后要求发送任何音频文件都无法收到”，反馈具体、可复现，影响 WhatsApp 频道的媒体完整性。
- **体验回退情绪**：用户在 [#5185](https://github.com/HKUDS/nanobot/issues/5185) 中使用“All of a sudden”描述问题突然出现，表明此前版本可用，当前属于用户可感知的体验回退。
- **轻量环境支持诉求**：用户在 [#5187](https://github.com/HKUDS/nanobot/issues/5187) 中因“无聊”尝试在 Termux 运行，结果因时区校验失败，侧面反映配置校验对极端环境不够友好，也说明社区对移动端/轻量 Linux 环境存在兴趣。
- **模型行为差异困扰**：用户在 [#3106](https://github.com/HKUDS/nanobot/issues/3106) 中反映使用 GPT 设置定时任务遇到工具循环，而“其他模型如 gml-4.7 则正常”，指向模型对工具调用结束条件处理不一致的问题。

## 8. 待处理积压

- **6 个带 `[conflict]` 标记的 PR 长期未合入**：包括
  - [#1656](https://github.com/HKUDS/nanobot/pull/1656)（fix validation）
  - [#1565](https://github.com/HKUDS/nanobot/pull/1565)（session 导入导出）
  - [#1319](https://github.com/HKUDS/nanobot/pull/1319)（skill status 命令）
  - [#4819](https://github.com/HKUDS/nanobot/pull/4819)（memory 锁修复）
  - [#4551](https://github.com/HKUDS/nanobot/pull/4551)（heartbeat 隔离会话）
  - [#4021](https://github.com/HKUDS/nanobot/pull/4021)（codex 去重修复）

  这些 PR 最早创建于 2 月底，最长悬置已超 5 个月，涉及 session 管理、skill 诊断、memory 并发安全等多项可用功能。建议维护者安排 rebase 或明确关闭，避免社区贡献长期滞留。

- **长期未解决 Issue：[#3106](https://github.com/HKUDS/nanobot/issues/3106)**。4 月创建，昨日有状态更新但仍无维护者回复。结合用户反馈中“使用其他 AI model 正常”这一关键信息，值得进行一次模型工具调用差异排查。

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-07-31

## 1. 今日速览

过去 24 小时 Zeroclaw 项目活跃度极高：15 条 Issue 更新（全部为活跃/新开）、50 条 PR 更新，其中 49 条待合并、1 条关闭。Day 内无新版本发布。从内容看，项目正处于**安全加固与架构演进并行**的关键阶段：一方面，围绕网关 webhook 未认证、命令白名单大小写匹配等问题集中提交了修复 PR（#9568、#9569），并有提出移除存在安全隐患的 WATI 通道的 PR（#9571）；另一方面，多条 RFC 级别议题（记忆架构分离 #9048、OpenAI 兼容适配 #8603、OTel 关联 #8933 等）仍在热烈讨论中，体现社区对标准化集成与可观测性的强烈诉求。值得关注的风险信号是：PR 合并率偏低（1/50），大量 PR 标记为 `needs-author-action`，长期积压可能拖慢整体交付节奏。

## 2. 版本发布

无新版本发布。

## 3. 项目进展

今日唯一一条关闭的 PR 是发布工程链的整合：

- **PR #9211 — ci(release): consolidate release attestations**（closed，principal contributor）
  - 将 GitHub artifact attestations 设为可下载发布资产的唯一来源验证机制
  - 生成两种 SBOM 格式、对所有 payload 进行认证、打包离线验证 bundle 与信任根
  - 影响领域：CI / 发布脚本 / 供应链安全

  这标志着项目在**发布供应链完整性**方面迈出实质性一步，后续发布产物的可追溯性和验证能力将显著增强。

此外，下列待合并 PR 虽未在今日关闭，但对项目健康度至关重要，值得关注：

- **PR #9569** — 网关 webhook 在无法验证签名时 fail closed，直指 S0 安全漏洞 #9565，建议优先安排审查
- **PR #9568** — Unix 平台命令 allowlist 大小写不敏感匹配，修复回归 #9566
- **PR #9571** — 整体移除 WATI 通道，作为对 webhook 安全问题的结构性缓解

整体来看，项目在主线上推进了供应链加固与安全补位，但功能类大型 PR（#8688、#9126、#9248）仍停留在待审查/待作者响应状态，合并通道存在一定阻塞。

## 4. 社区热点

今日讨论最活跃的议题集中在**架构级 RFC**，评论数显著领先于其他条目：

- **Issue #9048 — RFC: Separate conversation history from agent-curated long-term memory**（12 条评论）
  - 当前实现将会话历史与长期记忆混在同一 memory backend 中（`MemoryCategory::Conversation`），运行时、网关、通道 autosave 均将对话轮次写入该路径，生命周期概念在实现中被混淆
  - 社区关注点：记忆分层、生命周期治理、以及为后续 routing/retrieval 策略打下干净基础
  - 链接：zeroclaw-labs/zeroclaw Issue #9048

- **Issue #8603 — RFC: OpenAI Chat Completions compatibility adapter**（7 条评论）
  - 目前仅支持 WebSocket 与各通道 webhook，Open WebUI/LobeChat 等标准客户端无法接入
  - 讨论核心：屏蔽协议差异、翻译请求/响应、作为 gateway 的适配层
  - 链接：zeroclaw-labs/zeroclaw Issue #8603

- **Issue #8933 — RFC: Add cross-turn conversation correlation to OTel export**（7 条评论）
  - 通过不透明的 conversation ID 贯穿 turn-lifecycle，导出为 `gen_ai.conversation.id`，补齐跨轮次追踪能力
  - 链接：zeroclaw-labs/zeroclaw Issue #8933

- **Issue #5287 — [Feature]: define a compact local_small runtime profile and prompt-budget contract**（7 条评论，2 👍）
  - 本地小模型的 prompt 膨胀、fallback 解析宽松、工具指令泄漏问题，获社区共鸣
  - 链接：zeroclaw-labs/zeroclaw Issue #5287

共同诉求解读：社区正推动 Zeroclaw 从“内部基础设施”走向**标准协议兼容**（OpenAI、OTel）、**架构清晰化**（记忆分层）、以及**本地优先场景兜底**（小模型 profile）。这些方向如果落地，将显著降低集成门槛并扩大部署场景。

## 5. Bug 与稳定性

今日活跃 Bug 按严重程度排列如下：

| 严重度 | Issue | 问题描述 | Fix PR 状态 |
|---|---|---|---|
| **S0** | **#9565** — 网关 webhook 处理器不验签即放行（WhatsApp Cloud / Linq / WATI），攻击者可注入消息 | ✅ **PR #9569** 已提交，改为验签失败即拒绝；另有 **PR #9571** 提议整体移除 WATI 通道 | 
| S2 | **#9573** — 成本定价查询在同 provider 类型多别名场景下失效，配置 token 价格被忽略（影响 Gateway WebSocket / RPC 计费） | 无 PR，今日新增 | 
| S2 | **#9572** — debug 构建下 gateway 处理 dashboard WebSocket agent turn 时间歇性 Tokio worker 栈溢出 | 无 PR，今日新增 | 
| S2 | **#9566** — Unix 平台 `allowed_commands` 含大写字母时永不匹配，命令被静默拒绝（#4552 回归） | ✅ **PR #9568** 已提交，改为大小写不敏感比较 |
| S3 | **#8847** — `cargo test --doc` 在 Rust 1.96 下因 rustdoc 默认主题参数重复而失败 | 无对应 PR |

典型模式：安全类 S0/S2 问题（#9565、#9566）均在 24 小时内获得了针对性修复 PR，响应速度值得肯定；但两个新增 S2 Bug（#9573、#9572）尚无处理方案，建议维护者优先分配。

## 6. 功能请求与路线图信号

今日活跃的功能请求与 RFC 呈现出清晰的路线图方向：

1. **标准协议兼容层**
   - #8603 OpenAI Chat Completions 适配器 — 是接入 Open WebUI/LobeChat 的关键路径
   - #8780 Gemini Live 实时语音通道 — 将模型原生的 audio-to-audio 能力接入 ZeroClaw 工具/审批/记忆体系
   - 两者均标记 `needs-maintainer-review`，属于架构级决策，短期内可能进入设计评审

2. **记忆与可观测性架构升级**
   - #9048 会话历史与长期记忆分离 — 高关注度（12 评论），虽为 RFC 早期，但讨论热度暗示实现优先级可能上调
   - #8933 OTel 跨轮次关联 ID — 与现有 `observability:otel` 工作一脉相承，落地成本相对可控

3. **本地/云端混合路由**
   - #5287 本地小模型 compact profile（2 👍）
   - #7951 Effort-based local/cloud model routing — 与项目现有 local-first 工作（#5287、Ollama 相关 PR #8953）互为补充，是“低成本 + 高质量”路线的核心组件

4. **模型编排新形态**
   - #8568 Mixture-of-Agents 虚拟 provider — 一个 aggregator 并行聚合多个模型输出，扩展“模型即服务”能力边界

5. **工程效率**
   - #9545 rustdoc 警告门禁，防止回归 — 已 accepted，属于 CI 质量基建
   - #9345 PR risk/size 标签随 diff 自动重算 — 已 accepted，基于 #7269 持续优化 PR 审阅体验

从配套 PR 看，#5287（本地小模型）与 #7951（路由）方向已有 #8325/#8313 等系列改动在推进；#8603（OpenAI 适配）若被采纳，可能成为下一个 gateway 层的重点功能。

## 7. 用户反馈摘要

- **#9048 讨论者**对“会话历史与长期记忆共用一个后端”表达了架构层面的担忧——尤其是 autosave 路径将对话轮次写入通用记忆库后，后续检索与生命周期管理会相互干扰。
- **#8603 用户侧诉求**明确：“已有 OpenAI-compatible 客户端，不想为每个工具自建适配器”，这是典型的 2C/2B 集成门槛问题。
- **#5287 反馈者**描述了本地模型实际使用中的三个痛点：prompt 膨胀、宽松 fallback 导致格式解析失控、内部工具/系统指令泄漏到用户可见输出——对应其提出的 compact runtime profile 与 prompt-budget 契约。
- **#9562 用户**（v0.8.3，Arch Linux）反馈 WebChat 流式输出期间自动滚动覆盖手动滚动，导致无法阅读历史消息；提供了上游 openclaw 的参考 PR/Issue，属于体验层常见问题。
- **#8847 用户**报告 Rust 1.96 下 CI 命令回归，虽为 S3 但会阻塞 `cargo test --doc` 全量执行，影响日常开发验证流程。

整体感受：社区用户高度关注**本地部署体验**与**协议互通性**，对安全类回归（#9565、#9566）给出了明确负面反馈；同时愿意参与 RFC 级别的深度讨论，是项目健康的社区信号。

## 8. 待处理积压

以下 Issue/PR 长期未获合并/关闭，或等待维护者/作者行动，需要重点关注：

**长期开放的核心功能 Issue：**
- **#5287**（4 月 4 日创建）— local_small runtime profile，已有 2 👍 且持续有讨论，但状态仍为 accepted 未进入实现，存在需求与实现脱节风险
- **#7951**（6 月 19 日创建）— Effort-based model routing，同样为 accepted 后暂无对应 PR，可能影响本地优先路线的连贯性

**等待作者行动的大型 PR（存在超期风险）：**
- **PR #8688**（7 月 4 日，XL 尺寸）— 可信目标工具与委托边界，功能跨度大且标记 `needs-author-action`
- **PR #9126**（7 月 18 日，XL 尺寸）— 插件类型化实例配置验证，涉及 WASM 运行时
- **PR #9248**（7 月 21 日，XL 尺寸）— eval 运行历史 receipts，功能已完整但同样等待作者响应
- **PR #8969**（7 月 11 日，XL 尺寸）— Slack 线程上下文水合，`needs-author-action`

**标为 stale-candidate 的 PR（临近失活边缘）：**
- **PR #8968**（fix(wechat): 表面化 iLink 错误）— 已标记 stale-candidate，建议维护者尽快回复或关闭

**建议**：优先处理 S0/S2 安全修复 PR（#9569、#9568）的合并评审；随后对 XL 尺寸 PR 给出明确的拆分或审查计划，避免功能长期悬置导致社区贡献者流失。

---
*本报告基于 zeroclaw-labs/zeroclaw 公开 GitHub 数据生成，仅供项目健康度与社区动态参考。*

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 · 2026-07-31

## 1. 今日速览

过去 24 小时项目数据流活跃：**PR 更新 17 条**（待合并 12，关闭/合并 5）、**Issue 更新 7 条**（新增/活跃 4，关闭 3），**无新版本发布**。新增的 4 条 Issue 涉及 OAuth 2.1 支持、Telegram 会话管理、IRC 长消息处理和 SeaHorse 并发审查，反映出社区正在从“功能可用”向“生产级健壮性”和“多渠道一致性体验”提出要求。依赖机器人（Dependabot）今日集中提交 4 个 PR，自动化维护保持活跃；但功能 PR 仍以积压为主，**今日无确认的新功能合并进主干**。整体评估：**活跃度中高，功能落地节奏偏慢，PR 审查队列是当前健康度短板**。

## 2. 版本发布

今日无新 Release。

---

## 3. 项目进展

过去 24 小时共 5 个 PR 进入关闭状态，但**没有可确认的新功能合并**，具体情况如下：

- **[PR #3163 feat(bedrock): leverage Converse prompt caching via cache points](https://github.com/sipeed/picoclaw/pull/3163)** — 今日关闭并带有 `stale` 标签。这是 24 小时内唯一进入关闭流程的功能 PR。该 PR 为 AWS Bedrock Converse API 添加显式缓存点，可让 `system`、`tools`、`messages` 前缀命中 prompt cache，将输入重复读取成本降至约 0.1×，是面向 AWS 用户的高价值优化。若为 stale 自动关闭，建议维护者重新评估，并邀请作者 rebase 或接手推进。
- **[PR #3290](https://github.com/sipeed/picoclaw/pull/3290) / [PR #3288](https://github.com/sipeed/picoclaw/pull/3288)** — 均为 AWS SDK v2 依赖升级，今日关闭后由更新的 [#3306](https://github.com/sipeed/picoclaw/pull/3306)（config 1.32.33）和 [#3305](https://github.com/sipeed/picoclaw/pull/3305)（bedrockruntime 1.56.2）替代，属于 Dependabot 常规滚动更新。
- **[PR #3263](https://github.com/sipeed/picoclaw/pull/3263) / [PR #3262](https://github.com/sipeed/picoclaw/pull/3262)** — `actions/setup-node` 和 `actions/setup-go` 的 CI 依赖升级，已关闭，属于 GitHub Actions 自动化维护。

**小结**：项目在依赖安全与 CI 工具链维护上保持节奏，但**用户功能 PR 的合并效率较低**。下方“待处理积压”部分列出了数条等待超过 10 天的功能/修复 PR，值得维护者优先关注。

---

## 4. 社区热点

- **[Issue #2546 · Support OAuth 2.1 + PKCE for MCP servers（6 条评论）](https://github.com/sipeed/picoclaw/issues/2546) + [Issue #3302 · OAuth 2.1 支持的需求重复提出](https://github.com/sipeed/picoclaw/issues/3302)**  
  这是今天最值得关注的社区信号。#2546 从 4 月 16 日持续到 7 月 30 日，积累了 6 条评论后因 stale 关闭，但当天新用户原样重新提交了 #3302。**需求在 4 个月内未被满足，且重复出现，说明“Dashboard 添加 OAuth 保护 MCP 服务器”已成为明显的用户期望功能。** 参考同类产品 Claude.ai 的 “Add connector” 交互，用户希望粘贴 URL 即可完成接入，而非依赖 shell/Node.js。

- **[Issue #3307 · Telegram 渠道缺少 session 列表/切换命令](https://github.com/sipeed/picoclaw/issues/3307)**  
  虽然是新 Issue（0 评论），但内容指出了一个产品一致性缺口：Web UI 已提供完整的会话历史管理，而 Telegram 等聊天渠道却没有等效操作。对于以 Telegram 为主要交互入口的 PicoClaw 用户，这会直接影响日常使用。

- **[Issue #3287 · 对 IRC 长消息的支持（2 条评论）](https://github.com/sipeed/picoclaw/issues/3287)**  
  IRCv3 限制了 512 字节/消息，长消息会被客户端自动拆分。用户希望 PicoClaw 能将拆分的片段重新识别为一条完整消息。该问题反映了社区中 IRC 渠道的真实活跃度。

---

## 5. Bug 与稳定性

按严重程度排序：

1. **[Issue #3308 · 并发风险、goroutine 泄漏与性能审查](https://github.com/sipeed/picoclaw/issues/3308)**（新，Open，0 评论）  
   虽然以 `[BUG]` 标签提交，实际上是一份针对 SeaHorse、Channel Manager 与 Hooks 的代码审查报告，涉及并发 hazard、goroutine 泄漏和内存/速度优化。严重性高，因为对常驻服务（gateway）可能造成资源泄漏。目前**无关联 fix PR**，建议维护者优先回复并评估。

2. **[Issue #3258 · Process Hook `before_tool` 修改不生效](https://github.com/sipeed/picoclaw/issues/3258)**（Closed / stale）  
   用户报告 `decision` 字段被丢弃，参数因反序列化缺陷被误解析，导致 hook 无法正常修改 tool 调用。该 Issue 已被 stale 关闭，**未发现关联 fix PR**。由于涉及 Agent 工具调用核心链路，即使标记 stale，也建议维护者重新打开或给出明确迁移/绕过方案。

3. **[PR #3279 · 修复 seahorse 摘要中 tool-call 格式泄漏](https://github.com/sipeed/picoclaw/pull/3279)**（Open，待合入）  
   这实际是一个 bug fix：`pkg/seahorse/store.go` 中的 `partsToReadableContent` 会把工具调用格式泄漏进 LLM 用户消息，与 #3258 属同类问题。该 PR 已开放 10 天且持续更新，**尚无维护者合并动静**，应当优先处理。

---

## 6. 功能请求与路线图信号

- **OAuth 2.1 + PKCE 支持（MCP 服务器）**  
  [#2546（已关闭）](https://github.com/sipeed/picoclaw/issues/2546) 与 [#3302](https://github.com/sipeed/picoclaw/issues/3302) 构成双重信号。该功能同时涉及 `channel`、`config` 和 Dashboard 领域，如果进入路线图，很可能是下一版本的重要 UX 升级之一。

- **Telegram 会话管理命令**  
  [#3307](https://github.com/sipeed/picoclaw/issues/3307) 要求向聊天渠道补齐 Web UI 已有的 session 列表/切换/删除能力。作为用户可感知的“快捷胜利”，适合在小版本中快速纳入。

- **IRC 长消息聚合**  
  [#3287](https://github.com/sipeed/picoclaw/issues/3287) 属于渠道协议适配，影响 IRCv3 用户的实际体验，技术范围可控制在 channel 层。

- **无状态 / 无历史模式（gateway）**  
  [#3257（已关闭）](https://github.com/sipeed/picoclaw/issues/3257) 指出 CLI 模式下可通过 `--session` 灵活创建新会话，而 gateway 模式下 session key 由 channel 派生，导致无法重新开始对话。该需求若落地，对云端/共享 bot 场景非常有价值，但会涉及会话状态架构调整，适合列入中期路线图。

- **多模态 / 渠道能力扩展**（来自待合并 PR）  
  [#3270](https://github.com/sipeed/picoclaw/pull/3270) 新增 DashScope TTS 和微信语音文件发送；[#3283](https://github.com/sipeed/picoclaw/pull/3283) 支持钉钉图片消息。多个 PR 表明社区正在把 PicoClaw 推向“多渠道 + 多模态”，这与个人 AI 助手的产品定位高度一致。

---

## 7. 用户反馈摘要

- **OAuth 配置仍是最大痛点之一**  
  来自 #2546 的用户明确描述：非技术用户希望在 launcher dashboard 上粘贴 URL 即可添加受 OAuth 保护的 MCP server，目标是“与 Claude.ai 的 Add connector 相同体验”，且适用于没有 shell、没有 Node.js 的云 VM 环境。#3302 的原样重复，说明这个诉求仍未被满足。

- **IRC 长消息场景下回复被截断/打散**  
  #3287 用户反馈：IRC 客户端将超长消息自动拆分后，PicoClaw 当前按多条独立消息处理，导致模型上下文碎片化。背后需求是语义连续性，而不是简单的协议转换。

- **Gateway 模式缺乏会话重置能力**  
  #3257 用户指出：CLI 模式下 `--session` 可自由指定，gateway 模式却被 channel/chat 绑定，日常试用不同 prompt 时无法开启新会话。这与 #3307 的诉求互相印证：**聊天渠道的会话管理能力是当前明显的功能缺口**。

- **社区对项目愿景表达认可，同时也提高了代码质量期待**  
  #3308 作者开头即称赞 PicoClaw“原生 Go、$10 硬件、<10MB RAM、亚秒级启动”是非常惊艳的形态，随后提交了一份严肃的并发与性能审查。这说明 PicoClaw 已吸引到关注基础设施质量的 contributor，社区正在从“能跑”进入“跑得稳”阶段。

---

## 8. 待处理积压

重点关注以下长期未合入且值得维护者优先响应的 PR / Issue：

| 对象 | 创建时间 | 等待时长 | 说明 |
|---|---|---|---|
| [PR #3200 · configurable default fallback chain](https://github.com/sipeed/picoclaw/pull/3200) | 2026-07-01 | 30 天 | 为 Web UI 增加默认模型回退链配置，涉及前端 + 后端 API，功能完整度高 |
| [PR #3279 · seahorse tool-call format leak fix](https://github.com/sipeed/picoclaw/pull/3279) | 2026-07-21 | 10 天 | Bug fix，影响 LLM 消息质量，建议优先审查 |
| [PR #3271 · 更新 9 个 provider 默认模型名](https://github.com/sipeed/picoclaw/pull/3271) | 2026-07-20 | 11 天 | 接入 2026-07 最新模型 ID，信息时效性强，越晚合入越容易产生文档和实际模型偏差 |
| [PR #3270 · DashScope TTS + 微信音频发送](https://github.com/sipeed/picoclaw/pull/3270) | 2026-07-20 | 11 天 | 跨渠道/多模态能力扩展，作者同时提交了多个关联 PR，建议打包评审 |
| [PR #3222 · deltachat 清理，-200 LOC](https://github.com/sipeed/picoclaw/pull/3222) | 2026-07-03 | 28 天 | 已标记 stale，删除旧功能与冗余测试，重构价值高但需注意破坏性 |
| [Issue #2546 · OAuth 2.1 + PKCE for MCP](https://github.com/sipeed/picoclaw/issues/2546) | 2026-04-16 | 106 天 | 已 stale 关闭，但被 #3302 原样重提，建议作为路线图候选重新开启 |

---

**总结**：PicoClaw 的社区关注度和贡献活跃度保持良好，Dependabot 自动化在持续维护依赖新鲜度；但**用户提交的功能 PR 长期积压、OAuth 等核心需求反复被提出，反映出维护者侧的 PR 审查速度已成为项目发展瓶颈**。建议下一阶段的运营优先级为：① 尽快合入或明确回应 #3279 等 bug fix PR；② 将 #3302/#2546 的 OAuth 能力正式纳入路线图；③ 对 #3308 的并发审查给出初步技术回复，以维持高质量贡献者的参与热情。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 2026-07-31

## 今日速览

项目今日活跃度**较高**：过去24小时新增2条Issue、15条PR更新，其中4条PR已关闭/合并，核心团队贡献占比突出。今日主线集中在**安全加固与镜像优化**：agent镜像重新固定到`hardened-2026-07-30`版本（体积降低22%）、Vercel CLI改为按需安装、签名验证逻辑修复。与此同时，两条新Issue分别暴露了**消息平台ID处理缺陷**和**registry分支漂移**问题，提示供应链流程仍需打磨。整体看项目正处于**运维稳定性与供应链安全**的关键优化阶段，但社区的长期PR积压现象值得关注。

---

## 版本发布

今日无新版本发布。

---

## 项目进展

今日共4条PR关闭/合并，主要推进以下工作：

| PR | 内容 | 影响 |
|---|---|---|
| [#3160](https://github.com/nanocoai/nanoclaw/pull/3160) | agent镜像重新固定至`hardened-2026-07-30` | 镜像从781MB降至611MB，层数从18层减至8层，最大单层由39%降到27%，显著改善拉取效率与攻击面 |
| [#3159](https://github.com/nanocoai/nanoclaw/pull/3159) | Vercel CLI改为按需安装（由`/add-vercel`引入） | 默认镜像不再携带部署工具，减少无谓的字节和凭据暴露面 |
| [#3122](https://github.com/nanocoai/nanoclaw/pull/3122) | 修复opencode的main兼容性、自定义端点传输、内存一致性 | 解决opencode集成在main分支上的兼容性缺陷，提升跨渠道行为一致性 |
| [#2682](https://github.com/nanocoai/nanoclaw/pull/2682) | `update-skills`跳过v1-only分支 | 避免将v1版skill错误纳入v2流程，提升skill更新可靠性 |

这4项合并标志着项目在**供应链安全**（镜像加固、按需工具）和**渠道兼容性**（opencode修复、skill更新）两方面同时迈进了扎实一步。

---

## 社区热点

今日讨论热度相对集中，最受关注的是：

- **[Issue #3153](https://github.com/nanocoai/nanoclaw/issues/3153) — add_reaction/edit_message 对入站消息总是失败**（评论:1）
  用户TO-maschenborn报告：由于平台消息ID未剥离agent-group后缀，Slack上的`add_reaction`和`edit_message`每次返回`message_not_found`，重试3次后标记为failed。该问题直接影响所有渠道的入站消息交互，是当前用户最直接的痛点。

- **[PR #3119](https://github.com/nanocoai/nanoclaw/pull/3119) — 孤儿容器协调**（今日更新）
  虽然是从fork提交的修复PR，但其描述了一个真实场景：连续运行5天、`NRestarts=0`的主机上，单个agent group积累到3个并发容器，全部轮询同一session DB。该问题涉及资源泄漏与状态冲突，引发了围绕容器生命周期管理的讨论。

社区当前核心诉求集中在**生产环境长期运行稳定性**（重复容器、消息操作失败）和**供应链可靠性**（registry分支漂移、签名验证缺失）。

---

## Bug 与稳定性

今日新增或活跃的Bug、缺陷按严重程度排列如下：

| 严重度 | 问题 | 状态 |
|---|---|---|
| 🔴 高 | **[#3153](https://github.com/nanocoai/nanoclaw/issues/3153) 入站消息的 add_reaction/edit_message 全部失败**：agent-group后缀未从平台消息ID剥离，Slack上必现`message_not_found` | 无fix PR，待处理 |
| 🔴 高 | **[#3155](https://github.com/nanocoai/nanoclaw/issues/3155) registry分支与main漂移**：`/add-codex`在main上安装后，其自身构建步骤（step-4 typecheck）失败，provider payload无法通过自家的安装门禁 | 无fix PR，需流程修复 |
| 🟠 中高 | **[#3158](https://github.com/nanocoai/nanoclaw/pull/3158) 签名验证变量不存在**：`#3150`引入的验证门读取的`AGENT_IMAGE_SIGNER_IDENTITY`/`_ISSUER`变量未定义，导致签名验证每次都被跳过，auto-merge永远无法触发 | [fix PR #3158](https://github.com/nanocoai/nanoclaw/pull/3158) 开放中 |
| 🟠 中 | **[#3119](https://github.com/nanocoai/nanoclaw/pull/3119) 孤儿容器累积**：`*/15`定时任务触发后，单个agent group可累积最多3个并发容器 | [fix PR #3119](https://github.com/nanocoai/nanoclaw/pull/3119) 开放中 |
| 🟠 中 | **[#3157](https://github.com/nanocoai/nanoclaw/pull/3157) 悬空符号链接导致模板skill物化失败**：`materializeTemplateSkills`使用`fs.statSync`跟随了指向容器路径的悬空链接 | [fix PR #3157](https://github.com/nanocoai/nanoclaw/pull/3157) 开放中 |
| 🟡 低 | **[#3124](https://github.com/nanocoai/nanoclaw/pull/3124) MCP服务器不可用时静默失败**：无报告机制，用户难以感知 | [fix PR #3124](https://github.com/nanocoai/nanoclaw/pull/3124) 开放中 |

---

## 功能请求与路线图信号

今日无新独立功能请求Issue，但从活跃PR中可见多条路线图信号：

- **定时任务时间语义**：[PR #3154](https://github.com/nanocoai/nanoclaw/pull/3154) 为定时任务注入`process_after`作为有效运行时间，并支持按agent-group时区生成`current_time`，预计将提升调度可用性。
- **多渠道附件传递**：[PR #3156](https://github.com/nanocoai/nanoclaw/pull/3156) 将渠道附件转为结构化parts传给provider，是补齐多模态消息能力的关键一步。
- **GitHub轮询模式**：[PR #2301](https://github.com/nanocoai/nanoclaw/pull/2301) 提出无需入站端口的GitHub轮询集成（30s间隔），服务于NAT/防火墙后的部署场景。
- **本地语音转文字**：[PR #2317](https://github.com/nanocoai/nanoclaw/pull/2317) 新增`/add-voice-transcription-free-whisper`，支持openai-whisper（GPU加速）和whisper.cpp（纯CPU）双后端。
- **AWS凭证代理**：[PR #2634](https://github.com/nanocoai/nanoclaw/pull/2634) 集成paws4claws守护进程，提供bearer token认证与mount-from-outside方案。
- **CI/开发者体验**：[PR #2537](https://github.com/nanocoai/nanoclaw/pull/2537) 引入pre-commit hooks（prettier、eslint、typecheck、vitest），降低贡献门槛。

以上长期开放的PR（多数由`ira-at-work`贡献）较集中地勾勒出**低门槛集成、本地化工具链、无侵入式部署**的产品方向。

---

## 用户反馈摘要

从今日活跃的Issue相关评论与问题描述中，可提炼以下真实用户反馈：

- **消息交互功能失效是高频痛点**（[#3153](https://github.com/nanocoai/nanoclaw/issues/3153)）：用户明确描述了失败路径——每次调用重试3次、最终标记`failed`，且没有给出可操作的错误定位信息，说明该问题在Slack上具备稳定复现性，已影响到了日常使用体验。
- **供应链流程不透明**（[#3155](https://github.com/nanocoai/nanoclaw/issues/3155)）：用户反馈"按文档机械地复制payload、导入barrel文件、添加CLI manifest后，在skill自己的typecheck步骤失败"，说明当前registry的安装门禁存在"自己打自己"的流程缺陷。
- **长时间运行的资源泄漏**（[#3119](https://github.com/nanocoai/nanoclaw/pull/3119)）：贡献者描述了实际观察到的主机场景——5天uptime后同一agent group出现3个并发容器。虽然已有修复PR，但这反映了当前`container-runner`在压力场景下存在资源管理短板。

---

## 待处理积压

以下为长期未关闭且今日仍活跃的重要PR/Issue，共5条均来自`ira-at-work`，均开放超过2个月，建议维护者评估优先级：

| 项目 | 开放天数 | 内容 | 备注 |
|---|---|---|---|
| [PR #2301](https://github.com/nanocoai/nanoclaw/pull/2301) | 86天 | GitHub轮询模式（Mode B） | 功能已完成，涉及NAT/Firewall场景，长期未合并 |
| [PR #2317](https://github.com/nanocoai/nanoclaw/pull/2317) | 85天 | 本地语音转文字skill（whisper双后端） | 功能型PR |
| [PR #2537](https://github.com/nanocoai/nanoclaw/pull/2537) | 74天 | pre-commit hooks / CI改进 | 影响开发者贡献体验 |
| [PR #2634](https://github.com/nanocoai/nanoclaw/pull/2634) | 64天 | paws4claws AWS凭证代理skill | 对生产环境有实际价值 |
| [PR #2685](https://github.com/nanocoai/nanoclaw/pull/2685) | 57天 | Signal渠道文档更新（群组typing、出站reactions） | 文档型PR |

另外，今日新开的Issue [#3153](https://github.com/nanocoai/nanoclaw/issues/3153)（入站消息操作失败）虽新鲜度较高，但已直接影响所有channel用户的消息交互，也需尽快纳入处理日程。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-07-31

## 1. 今日速览

过去 24 小时仓库保持极高活跃度：39 条 Issue 更新（33 条活跃、6 条关闭），50 条 PR 更新（26 条待合并、24 条已合并/关闭），无新版本发布。项目正处于 "Reborn" 架构重构的 Wave 0 执行期，两个 WS0 架构 PR（[#6934](https://github.com/nearai/ironclaw/pull/6934)、[#6936](https://github.com/nearai/ironclaw/pull/6936)）与跨渠道附件核心功能（[#6364](https://github.com/nearai/ironclaw/pull/6364)）同日落地，Telegram 附件支持（[#6496](https://github.com/nearai/ironclaw/issues/6496)）随之关闭。安全与稳定性风险同步抬头：新报 P0 级跨用户内存泄露（[#6900](https://github.com/nearai/ironclaw/issues/6900)）和 IronHub 全站 404（[#6940](https://github.com/nearai/ironclaw/issues/6940)），均尚无修复 PR。技能路由/激活史诗（[#6565](https://github.com/nearai/ironclaw/issues/6565)）今日有配套 PR [#6937](https://github.com/nearai/ironclaw/pull/6937)、[#6938](https://github.com/nearai/ironclaw/pull/6938) 提交，是下一版本最值得期待的功能改进。

## 2. 项目进展

今日合并/关闭的重要 PR 集中在三个方向：

**核心功能**
- **PR [#6364](https://github.com/nearai/ironclaw/pull/6364)（已合并，XL）跨渠道附件流**：引入统一的附件契约，覆盖 WebUI、Telegram、Slack 及未来渠道；入站附件在轮次开始前按共享配额原子落盘，出站附件增加运行级授权。该 PR 是 Issue [#6496](https://github.com/nearai/ironclaw/issues/6496)（今日关闭）的基础。
- 随 [#6364](https://github.com/nearai/ironclaw/pull/6364) 合入，**Issue [#6496](https://github.com/nearai/ironclaw/issues/6496)** 关闭，Telegram 附件双向支持正式完成。

**稳定性修复**
- **PR [#6935](https://github.com/nearai/ironclaw/pull/6935)（已合并，M）libsql 事务恢复**：修复对话历史/时间线的 503 错误，并阻止被取消的文件系统事务长期占用唯一 libSQL 写租约。

**架构重构（Wave 0）**
- **PR [#6934](https://github.com/nearai/ironclaw/pull/6934)（已合并，XL）host_api 去通配符**：移除 `ironclaw_host_api` 中 45 个模块的扁平 `pub use *` 预导出，所有消费者改为通过模块路径访问契约，为后续分层授权清理障碍。
- **PR [#6936](https://github.com/nearai/ironclaw/pull/6936)（已合并，XS）架构基线 + 收缩式异常棘轮**：在代码移动前先建立目标架构的度量基线，属于 [Workstream #6920](https://github.com/nearai/ironclaw/issues/6920) 的第 4 项，行为零变更。
- 同期关闭的测试基建 Issue 包括 **[#4636](https://github.com/nearai/ironclaw/issues/4636)**（SSO 会话与多用户隔离 E2E 测试）和 **[#6771](https://github.com/nearai/ironclaw/issues/6771)**（Reborn Playwright 运行时与 API 覆盖稳定化）。

**小结**：项目正在功能、架构、稳定性三线同步推进。架构上 WS0 正式开始兑现，功能上跨渠道附件落地，稳定上 libsql 事务恢复消除了已知 503 根因。不过 0 个新版本发布意味着这些成果尚未形成面向用户的可用版。

## 3. 社区热点

- **Issue [#6284](https://github.com/nearai/ironclaw/issues/6284)（[EPIC] 错误可恢复性最终目标）** — 评论 15 条，是今日讨论度最高的 Issue。核心诉求是让模型从 **100% 运行中间错误**中恢复，并定义了五条可验收契约：运行存活、模型看到错误、错误信息同时携带根因与成功条件、模型获得处理回合、绝不误报成功。讨论热度高说明社区对 AI 代理生产级可靠性的期待正在快速上升。

- **Issue [#6524](https://github.com/nearai/ironclaw/issues/6524)（[EPIC] Hermetic 能力与旅程测试平台）** — 评论 4 条。关注如何机械化验证"每个受支持的能力和关键用户旅程都有确定性的测试覆盖"，本质是对当前录制备件测试模式的升级诉求。

- **Issue [#6565](https://github.com/nearai/ironclaw/issues/6565)（[EPIC] 技能发现、路由与激活）** — 今日有更新，评论 2 条。虽然评论不多，但今日提交的 [PR #6937](https://github.com/nearai/ironclaw/pull/6937)（词边界匹配与激活阈值）和 [PR #6938](https://github.com/nearai/ironclaw/pull/6938)（激活拒绝原因与需求强制）直接服务于此史诗，说明这是当前实际开发投入最集中的方向之一。

## 4. Bug 与稳定性

按严重程度降序排列，含是否已有修复 PR：

**P0 / 安全**
- **[#6900](https://github.com/nearai/ironclaw/issues/6900)**（[suggested_P0, security]）共享频道默认主题绑定导致所有用户消息进入操作者内存命名空间，构成**跨用户内存泄露**。尚无修复 PR，属今日最紧急安全问题。
- **[#6866](https://github.com/nearai/ironclaw/issues/6866)**（[security]）所有用户共享同一 home 目录，工作区互相可见。用户明确表达隐私担忧，尚无修复 PR。

**高**
- **[#6940](https://github.com/nearai/ironclaw/issues/6940)**（[p2]）IronHub 技能 CTA 全站 404，今日新报，影响所有技能的入口跳转。尚无修复 PR。
- **[#6752](https://github.com/nearai/ironclaw/issues/6752)**（[v1-launch-checklist]）实例删除失败，删除后重新登录卡在 "Loading your agents..."。尚无修复 PR。

**中**
- **[#6834](https://github.com/nearai/ironclaw/issues/6834)**（[p2]）Slack 集成安装流程失败，扩展进入不可用状态。尚无修复 PR。
- **[#6902](https://github.com/nearai/ironclaw/issues/6902)**（UI）项目页展示后端不存在的捏造指标（0 花费、0 失败等）。已有修复 PR **[#6906](https://github.com/nearai/ironclaw/pull/6906)**。
- **[#6915](https://github.com/nearai/ironclaw/issues/6915)**（UI）助手消息中的 `/workspace` 文件链接点击后不打开文件。已有修复 PR **[#6917](https://github.com/nearai/ironclaw/pull/6917)**。

**低**
- **[#6916](https://github.com/nearai/ironclaw/issues/6916)**：Markdown 文件预览显示为纯文本。无 PR。
- **[#6904](https://github.com/nearai/ironclaw/issues/6904)**：日志页无法加载下一页（`nextCursor` 未接入）。无 PR。
- **[#6903](https://github.com/nearai/ironclaw/issues/6903)**：管理员用户列表无法加载第二页。无 PR。

一个值得注意的对比：#4636 刚关闭了 SSO 会话与多用户隔离 E2E 测试，今日却出现 #6900 的内存命名空间泄露，说明多用户隔离的测试覆盖仍有向共享频道业务逻辑延伸的空间。

## 5. 功能请求与路线图信号

- **迁移工具（[#6939](https://github.com/nearai/ironclaw/issues/6939)）**：用户要求提供从 Hermes/Openclaw 等既有 agent 产品向 IronClaw 迁移已有配置与记忆的工具，直言"不愿从零开始"。该需求直接关系存量用户转化，建议优先纳入路线图。暂无对应 PR。
- **Keyless cosign 发布签名（[#6905](https://github.com/nearai/ironclaw/issues/6905)）**：由 AUR 包维护者提出，希望用 cosign 无密钥签名增强 release 可验证性，对下游发行版维护者友好。暂无对应 PR。
- **技能系统修复（[#6937](https://github.com/nearai/ironclaw/pull/6937)、[#6938](https://github.com/nearai/ironclaw/pull/6938)）**：同属 [#6565](https://github.com/nearai/ironclaw/issues/6565) 史诗，分别修复关键词误匹配（#5417）和技能激活被静默拒绝的问题。今日刚提交，预计是下版核心改进。
- **托管 MCP 服务器注册（[#6930](https://github.com/nearai/ironclaw/pull/6930)）**：开放中的 XL PR，为租户运行时注册托管 MCP 服务器并接入扩展生命周期，自动检测 no-auth/bearer/OAuth 凭据。与扩展生态方向一致，可能随下版落地。
- **Agentic Activity 与流式 UX 重设计（[#6901](https://github.com/nearai/ironclaw/pull/6901)）**：已提交交互式 mockup 与实现简报，目前偏设计稿阶段，属于 `webui_v2` 的长期前端方向。

## 6. 用户反馈摘要

- **集成稳定性是最大痛点**：Slack 连接流程失败且无明确指引（[#6834](https://github.com/nearai/ironclaw/issues/6834)）；IronHub 技能 CTA 全站 404，用户不知道应由谁负责（[#6940](https://github.com/nearai/ironclaw/issues/6940)）。
- **安全与隐私信任危机**：用户 tobias.holenstein 报告所有用户共享同一 home 目录，工作区互相可见，直接评价"这是一个隐私问题"（[#6866](https://github.com/nearai/ironclaw/issues/6866)）。
- **迁移成本阻碍采纳**：存量用户明确表示不愿因迁移而丢失既有配置与记忆，部分用户可能因此继续留在旧产品（[#6939](https://github.com/nearai/ironclaw/issues/6939)）。
- **基础操作受阻**：实例删除后重登录卡死，影响最基本的生命周期管理（[#6752](https://github.com/nearai/ironclaw/issues/6752)）。

这些反馈整体指向：核心功能开发速度很快，但真实用户的集成体验、数据隔离和迁移路径仍是当前最容易侵蚀信任的短板。

## 7. 待处理积压

- **[#6900](https://github.com/nearai/ironclaw/issues/6900)（P0 安全）**：跨用户内存泄露，尚无 PR，建议立即分配 security 负责人。
- **[#6866](https://github.com/nearai/ironclaw/issues/6866)（安全）**：home 目录未隔离，尚无 PR。
- **[#6284](https://github.com/nearai/ironclaw/issues/6284)**：错误可恢复性史诗，开放 12 天、15 条评论，讨论热度高但按五条契约逐项落实工程量很大，需要持续资源投入。
- **[#3773](https://github.com/nearai/ironclaw/issues/3773)**：目标 crate 架构史诗，5 月 19 日创建，已开放超两个月。虽然 WS0 已启动，但整组计划共 10 个 Wave，距离完结仍有很长周期，建议维护者对内对外同步进度预期。
- **[#5598](https://github.com/nearai/ironclaw/pull/5598)（release PR）**：7 月 3 日创建，已开放 28 天，内含 `ironclaw_common` 与 `ironclaw_skills` 的破坏性变更，长期未合并，可能阻塞新版本发布节奏。
- **Dependabot 积压**：多笔依赖更新 PR 长期开放，**[#6428](https://github.com/nearai/ironclaw/pull/6428)**（10 天）、**[#6361](https://github.com/nearai/ironclaw/pull/6361)**（11 天）、**[#5664](https://github.com/nearai/ironclaw/pull/5664)**（26 天，含 16 个 GitHub Actions 升级，checkout v4→v7，风险中等）。建议集中安排一次依赖批量合并，避免安全补丁与生态兼容性更新持续堆压。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-07-31

---

## 1. 今日速览

过去 24 小时项目无新 Issue 提交，无新版本发布，PR 侧保持高频迭代（10 条更新，其中 7 条合并/关闭，3 条待处理）。合并内容横跨企业级账户隔离、侧边聊天、邮件安全修复与 Windows 安装器稳定性，显示项目正处于功能扩展与安全加固并行的活跃阶段。整体项目健康度良好，合并效率较高，但两个存活超过 120 天的 stale PR 仍未获得维护者决策，建议关注。

---

## 2. 版本发布

无新版本发布。

---

## 3. 项目进展

过去 24 小时共有 **7 条 PR 被合并/关闭**，覆盖以下方向：

### 🏢 企业级能力

- **[#2409] feat(enterprise): isolate account-scoped auth and service flows**（已合并）  
  按账户隔离认证、媒体、排队跟进、分享与部署状态，防止旧账户的异步响应污染新登录账户，并强制执行企业 entitlements、改进失败回滚与清理。这是一次较大的主进程/渲染进程联动的架构性加固。  
  https://github.com/netease-youdao/LobsterAI/pull/2409

### 💬 协作与 UI 功能

- **[#2397] feat(cowork): add isolated /btw side chat**（已合并）  
  新增可拖拽、八方向缩放的浮动侧边聊天面板，支持停止与追问，`/btw` 执行与历史记录和主对话隔离，走 OpenClaw 工具流路径。  
  https://github.com/netease-youdao/LobsterAI/pull/2397

- **[#2406] fix(cowork): improve side chat input handling**（已合并）  
  在面板打开期间累计选中文本片段，移除产品级问题长度限制，同时保留上下文边界与传输安全检查，是对 #2397 的即时体验补强。  
  https://github.com/netease-youdao/LobsterAI/pull/2406

- **[#2411] feat(sidebar): support check-in and banner carousel**（已合并）  
  侧边栏新增统一轮播，支持每日签到与多个活动 banner 共存，单条目时隐藏导航控件，并保留 banner 组关闭逻辑。  
  https://github.com/netease-youdao/LobsterAI/pull/2411

- **[#2410] style(sites): align page layout with management views**（已合并）  
  将 Sites 页面的宽度、间距与搜索样式对齐 Skills 与 MCP 页面，属于管理端一致性优化。  
  https://github.com/netease-youdao/LobsterAI/pull/2410

### 🛡️ 安全与稳定性

- **[#2389] fix(email): prevent attachment path traversal**（已合并）  
  对邮件附件文件名进行清理并强制下载目录边界，新增跨平台安全测试并升级内置邮件 skill 版本。这是今日合并中**安全等级最高**的修复。  
  https://github.com/netease-youdao/LobsterAI/pull/2389

- **[#2412] fix(nsis): re-kill survivor processes on every stop poll round**（已合并）  
  修复 Windows 安装器卸载时幸存进程可能逃逸的问题，改为每轮轮询都执行 Stop-Process，并在超时时记录进程详情。  
  https://github.com/netease-youdao/LobsterAI/pull/2412

> **总体评估**：项目今日完成了从企业级账户隔离到协作 UI、再到安全与安装器稳定性的多维度推进，覆盖面广且均为实际使用中的痛点修复，整体向前迈进了扎实的一步。

---

## 4. 社区热点

今日数据中所有 PR/Issue 的评论数与 👍 数均为 0，缺乏直接的互动热度指标。但从变更规模与影响范围来看，以下两条 PR 值得关注：

- **[#2409] 企业级账户隔离**（涉及 renderer / docs / main / openclaw / cowork / artifacts 六个模块）  
  https://github.com/netease-youdao/LobsterAI/pull/2409  
  这是典型的"多账户切换时数据串扰"场景的架构级回应，影响面大，暗示企业用户对账户隔离与数据安全有较强诉求。

- **[#2397] 隔离式 /btw 侧边聊天**（涉及 renderer / docs / main / openclaw / cowork 五个模块）  
  https://github.com/netease-youdao/LobsterAI/pull/2397  
  该功能对应"在主对话中临时展开子话题而不打断主流程"的使用诉求，连续两天有跟进 PR（#2406）优化输入处理，说明开发者对该功能反馈响应迅速。

---

## 5. Bug 与稳定性

今日无新建 Bug Issue，但合并/提交了若干修复类 PR，按严重程度排列如下：

| 严重程度 | 问题描述 | 状态 | 链接 |
|---------|---------|------|------|
| 🔴 高（安全） | 邮件附件存在路径遍历漏洞，可导致附件写出到下载目录之外 | ✅ 已修复（#2389） | https://github.com/netease-youdao/LobsterAI/pull/2389 |
| 🟠 中（稳定性） | Windows NSIS 卸载时幸存进程可能在停止命令后复活并逃逸 | ✅ 已修复（#2412） | https://github.com/netease-youdao/LobsterAI/pull/2412 |
| 🟡 中低（性能） | Live prompt 投影对历史记录反复叠加 4x 字符上限，导致已缓存历史被重写，DeepSeek 缓存命中率下降 | 🔧 修复 PR 待合并（#2413） | https://github.com/netease-youdao/LobsterAI/pull/2413 |

> 其中 #2413 为今日新提交的 open PR，涉及 DeepSeek 缓存效率问题，虽然不属于崩溃级缺陷，但直接影响推理成本与响应延迟，建议尽快安排审查。

---

## 6. 功能请求与路线图信号

今日无新 Issue 提交，但合并的 PR 中包含以下功能信号：

| 功能方向 | 相关 PR | 路线图信号 |
|---------|--------|-----------|
| 企业级账户数据隔离 | #2409 | 企业版能力持续强化，预计后续会有更多企业级功能（如权限、审计）跟进 |
| 侧边聊天 / 子会话能力 | #2397, #2406 | "主对话 + 子任务并行"的产品形态正在成型，可能成为协作模块的核心交互之一 |
| 侧边栏信息聚合 | #2411 | 向"运营活动 + 签到 + 轮播"的方向演进，说明产品开始注重用户活跃度运营 |
| 安全加固 | #2389 | 邮件系统安全边界收紧，安全测试体系在增强，可能后续覆盖更多文件处理路径 |

另外两个长期 open 的 PR（#1228 标记未读、#1231 AgentCreateModal 优化）都属于 UI/UX 微优化，虽然历史悠久但不符合当前主线方向，是否纳入后续版本存疑。

---

## 7. 用户反馈摘要

今日无新 Issue 评论，但从 PR 描述中可以提炼以下真实用户场景与诉求：

- **多账户切换时的数据串扰**：企业用户反应在切换账户后，旧账户的异步响应（如媒体、共享内容）可能污染新账户界面——#2409 专门解决此问题，说明这是一个明确的企业级痛点。
- **主对话中需要临时展开子话题**：用户在阅读长回答时，希望选中文本进行即时追问而不污染主对话上下文——这正是 /btw 侧边聊天设计的场景出发点。
- **重要会话需要"标记未读"以便稍后跟进**：来自 #1228 的需求描述，用户在多会话间切换时容易遗漏重要会话，该 PR 仍滞留未合并。
- **弹窗交互一致性**：来自 #1231 的反馈，AgentCreateModal 不支持 Escape 键关闭且重新打开时有残留数据，与其他 Modal 行为不一致——属于典型的 UX 细节打磨诉求。

---

## 8. 待处理积压

| PR | 创建时间 | 存活天数（截至 2026-07-31） | 状态 | 说明 |
|----|---------|--------------------------|------|------|
| **#1228** feat(cowork): 新增会话「标记为未读」功能  
https://github.com/netease-youdao/LobsterAI/pull/1228 | 2026-04-01 | 约 121 天 | OPEN（stale） | 功能描述完整，含 Redux action 与 i18n 支持，用户诉求明确；已超过 4 个月未合并，建议维护者答复或关闭。 |
| **#1231** fix(agent): AgentCreateModal 支持 Escape 键关闭并重置表单  
https://github.com/netease-youdao/LobsterAI/pull/1231 | 2026-04-01 | 约 121 天 | OPEN（stale） | 修复明确的 UX 缺陷，并有其他 Modal 的实现参考；长时间滞留可能影响开发者贡献积极性。 |
| **#2413** fix(openclaw): keep live prompt tool-result history byte-stable across turns  
https://github.com/netease-youdao/LobsterAI/pull/2413 | 2026-07-31 | 今日新增 | OPEN（待审查） | 修复 DeepSeek 缓存命中率下降问题，关联实际成本与延迟，建议优先处理。 |

> **维护者提醒**：两个 stale PR 均已存活超 120 天，建议尽快给出明确决策（合并 / 关闭 / 请求补充信息），以避免社区贡献者流失。

---

*本日报由 AI 分析师自动生成，数据来源：github.com/netease-youdao/LobsterAI（快照时间 2026-07-31）*

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 — 2026-07-31

## 今日速览

过去 24 小时内，Moltis 项目保持中等偏上的协作活跃度：新增 2 个 Issue，4 个 PR 发生状态变更，其中 1 个 PR（#1166）已合并/关闭，其余 3 个处于待合并状态。核心维护者 penso 在渠道安全与可观测性基础设施两条主线上持续发力，外部贡献者 Jonesxq 也提交了 Web 端体验改进的 PR。值得关注的是，用户报告了一例涉 Vault 解锁/恢复端点的认证缺失漏洞（CWE-306），与正在推进中的权限边界修复 PR #1170 形成呼应。项目整体处于**渠道体验增强与安全加固并行推进**的阶段，健康度良好，但安全类合入的时效性需要关注。

## 项目进展

**今日已合并/关闭的重要 PR：#1166 — feat(slack)**

- [PR #1166](https://github.com/moltis-org/moltis/pull/1166) 基于此前合并的 #1165（确认反应）之上，为 Slack 渠道补齐了以下能力：
  - **每条消息的确认反应**（per-message acknowledgment reactions），解决 Slack 机器人无法显示 typing 指示器的问题，以 emoji 反应作为收信与进度信号；
  - **消息生命周期阶段管理**（phases），使确认反应在排队、取消、重试、回调突发与投递失败等复杂场景下保持正确性；
  - **重新连接监督**（reconnect supervision），提升连接可靠性；
  - **Block Kit 支持**，为后续交互式消息 UI 打好基础。

该项目进展的推进意义在于：Slack 渠道从此具备"可感知、可恢复、可交互"的能力闭环，为其他渠道（如 Telegram）的同类增强提供了一个可复制的范本。此外，当前仍有 3 个 PR（#1174、#1170、#1176）处于待合并状态，涉及安全边界、可观测性基础设施与 Web 导出功能，一旦合入将显著提升项目的安全成熟度与运维可观测性。

## 社区热点

今日新提交的 Issue/PR 均暂无评论，尚未形成高热度集中讨论。但从内容来看，以下两项具有更高的社区关注潜力：

- **[Issue #1177 — Vault 解锁/恢复端点缺少认证（CWE-306）](https://github.com/moltis-org/moltis/issues/1177)**：安全问题天然自带关注度，叠加"缺少认证"这一敏感标签，预计将吸引使用者与安全研究者跟进讨论，并可能推动项目方加快安全修复节奏。
- **[Issue #1178 — Telegram 内联按钮与结构化回调](https://github.com/moltis-org/moltis/issues/1178)**：内联按钮是 Telegram 机器人实现交互式体验的核心能力，该请求折射出用户对"agent 能主动发起交互、且能程序化接收回调"的强烈期待，与 Slack 侧已合入的 Block Kit 增强形成呼应。

## Bug 与稳定性

| 严重度 | 问题 | 影响 | 状态 |
|---|---|---|---|
| **高** | [Issue #1177 — Vault 解锁/恢复端点缺少认证（CWE-306）](https://github.com/moltis-org/moltis/issues/1177) | 未认证的请求可访问 Vault 解锁/恢复端点，可能导致敏感凭证泄露或未授权操作。 | 新报告，暂无直接对应 fix PR |
| **中** | [PR #1170 所修复的权限越界问题](https://github.com/moltis-org/moltis/pull/1170) | 通过访问允许列表的渠道发送者，此前可进一步触碰特权命令与主机工具（/sh 等），存在权限放大风险。 | 修复 PR 已提交，待合入 |

整体来看，今日出现了一个新增的高危安全漏洞，以及一个已在修复通道中的权限越界问题。两者共性指向"访问控制边界"这一薄弱环节，建议维护者在下一合并周期优先处理。

## 功能请求与路线图信号

- **[Issue #1178 — Telegram 内联按钮与结构化回调](https://github.com/moltis-org/moltis/issues/1178)**：用户希望 agent 可以发送 Telegram 内联按钮，并以结构化方式接收回调结果。结合刚合入的 Slack Block Kit 增强（#1166），可以判断项目正在**系统性增强各 IM 渠道的交互能力**。Telegram 方向很可能是下一站，该请求有较大概率被纳入后续版本。
- **[PR #1176 — Web 端 Markdown 复制与会话导出](https://github.com/moltis-org/moltis/pull/1176)**：保留原始 Markdown 的复制行为 + 完整分页历史导出为 Markdown 文件。属于直接面向终端用户价值的功能，改动范围集中在 Web 前端，合入门槛低，有望进入近期小版本。
- **[PR #1174 — 仪器化与反馈收集基础设施](https://github.com/moltis-org/moltis/pull/1174)**：引入后端中立的 agent 仪器化、Langfuse v4 导出、OTLP 运维后端与终端用户反应反馈。这是一个长期技术基座的建设，合入后将为系统可观测性与产品迭代反馈闭环奠定基础，路线图地位重要。

## 用户反馈摘要

截至日报生成时，所有新 Issue/PR 均暂无评论，以下反馈提炼自 Issue 描述本身：

- **安全信心的关注**（#1177）：报告者对 Vault 接口暴露程度做了检查后发现认证缺失，说明用户或安全研究者正以"可攻击面"视角审视 Moltis，期望项目在敏感端点上有更严格的安全默认值。
- **交互体验的诉求**（#1178）：Telegram 用户对"仅文字对话"的体验不满足，希望借助内联按钮实现更丰富的 agent 交互（如审批、选择、确认等场景），这与主流 Bot 产品形态对齐。

由于缺乏评论交互，暂无法获取更多样化的用户声音，后续若上述 Issue 引发讨论，建议持续跟踪。

## 待处理积压

- **[PR #1170 — 特权命令/工具门控（安全修复）](https://github.com/moltis-org/moltis/pull/1170)**：已开放 5 天（7 月 26 日开启）。权限越界修复不宜久拖，且与今日新增的 #1177 属于同一安全主题，建议优先审查合入。
- **[PR #1174 — 仪器化与反馈基础设施](https://github.com/moltis-org/moltis/pull/1174)**：已开放 4 天（7 月 27 日开启）。改动量大、涉及多个后端，长时间滞留易积累冲突，建议安排专项评审。
- **[Issue #1177 — Vault 认证缺失（安全漏洞）](https://github.com/moltis-org/moltis/issues/1177)**：虽仅开放 1 天，但属高危安全报告，应在 48 小时内给出响应，或至少标注已知计划，避免报告者产生"无人理会"的负面感受。
- **[PR #1176 — Web Markdown 复制/导出](https://github.com/moltis-org/moltis/pull/1176)**：开放 1 天，影响面小、收益明确，可作为低风险合并项快速推进，提升外部贡献者的参与积极性。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报 — 2026-07-31

> 数据来源：[github.com/agentscope-ai/CoPaw](https://github.com/agentscope-ai/CoPaw) | 统计窗口：过去 24 小时

---

## 1. 今日速览

CoPaw 今日处于**高活跃度**状态：24 小时内共产生 21 条 Issue 更新（16 条活跃、5 条关闭）和 46 条 PR 更新（21 条合并/关闭、25 条待处理）。没有新版本发布，但合并流中包含多项重要修复，尤其是 **Computer Use 功能（#6424/#6590/#6594）合入主线**、**Matrix E2EE 修复（#6486）** 以及一个修复三个缺陷的批量提交（#6562）。社区侧值得关注的是 v2.0 性能回归问题（#6307）仍在持续发酵，以及 fork PR 被 CI 阻塞的问题（#6563）已修复关闭。整体项目健康度**良好**：贡献者活跃（含多名首次贡献者），缺陷响应及时，但新 Bug 的报出频率较高（过去 24 小时新开 16 个 Issue），稳定性和规模化场景（大输出、长会话）仍是短板。

---

## 2. 版本发布

**无新版本发布。** 当前主线仍停留在 v2.0.1（对应 AgentScope 2.0.4.post1）。值得注意的是，过去 24 小时合并了多个 Bug 修复和功能增强，但均未触发补丁版本发布。社区中已有多位用户在 v2.0.x 上报告问题（#6307、#6578、#6589 等），**建议维护者关注补丁版本（v2.0.2/v2.1）的规划节奏**。

---

## 3. 项目进展

过去 24 小时合入/关闭的重要 PR 如下，显示项目在 **稳定性修复与桌面能力扩展** 两条线上均取得实质推进：

| PR | 内容 | 状态 |
|---|---|---|
| [#6424](https://github.com/agentscope-ai/QwenPaw/pull/6424) | **feat(computer-use)**：Windows/macOS 原生桌面 GUI 自动化工具（可访问性优先 + Tauri 控制模式） | 已合并（7-30） |
| [#6590](https://github.com/agentscope-ai/QwenPaw/pull/6590) | **fix(computer-use)**：macOS 上重用桌面身份，修复屏幕录制权限归因问题 | 已合并（7-31） |
| [#6594](https://github.com/agentscope-ai/QwenPaw/pull/6594) | **docs(computer-use)**：新增中英双语入门指南并挂载到文档站 | 已合并（7-31） |
| [#6562](https://github.com/agentscope-ai/QwenPaw/pull/6562) | **fix**：一次修复 3 个 Bug — `/mission` TypeError（#6533）、子会话审批级别继承（#6506）、及另一问题 | 已合并（7-30） |
| [#6486](https://github.com/agentscope-ai/QwenPaw/pull/6486) | **fix(matrix)**：探测 vodozemac E2EE 后端，使 Matrix 加密在 Python 3.12 下可用（修复 #6476） | 已合并（7-30） |
| [#6256](https://github.com/agentscope-ai/QwenPaw/pull/6256) | **feat(governance)**：沙箱不可用时的回退行为可配置（修复 #6250） | 已合并（7-30） |
| [#6596](https://github.com/agentscope-ai/QwenPaw/pull/6596) | **feat(dialog)**：每轮回复后 flush+fsync JSONL，防止闪退丢对话（Close-and-review-later） | 已关闭（7-31） |

**解读**：Computer Use 功能已进入"合并 + 修 bug + 补文档"的完整闭环，标志着该功能距离面向用户开放又近一步。Matrix E2EE 的修复补齐了 Python 3.12 环境的兼容性短板。此外，多人（#6555/#6592、#6588/#6595）形成了"Issue 报出 → PR 跟进"的快速响应链路，社区协作效率较高。

---

## 4. 社区热点

以下 Issues/PRs 在过去 24 小时获得了最多讨论或最强烈的社区反应：

- **[#6307](https://github.com/agentscope-ai/QwenPaw/issues/6307) — [性能回归] v2.0 每次简单对话回复固定增加 ~2 秒开销**（7 条评论，已活跃 10 天）
  这是当前最受关注的性能 Issue。用户 `lululau` 指出从 v1.1.12.post2 升级到 v2.0.0.post3 后，每次回复（如"what's the weather today"）都有约 2 秒的**固定开销**，与模型时延无关，源于请求链路的架构变化。后台有 7 条评论讨论，目前仍未关闭。**这很可能是阻碍用户从 v1.x 升级到 v2.0 的最大单一因素。**

- **[#6563](https://github.com/agentscope-ai/QwenPaw/issues/6563) — [已关闭] CI bug 导致所有 fork PR 被阻塞**（5 条评论，已修复）
  `real-behavior-proof.yml` 工作流在所有 fork PR 上因 `Resource not accessible by integration` 失败，**阻塞了所有外部贡献者**。该问题已关闭，但值得注意——它直接影响开源贡献生态。BlackBox-Labs 在 #6562 的 PR 中同时完成了修复，效率很高。

- **[#6524](https://github.com/agentscope-ai/QwenPaw/issues/6524) — [MCP] 后端重启后客户端无法自动恢复**（5 条评论）
  使用 `streamable_http` 连接远程 MCP Server 时，若 Server 重启，QwenPaw 复用失效的 `mcp-session-id`，导致工具列表查询失败。需要手动执行 `list mcp` 才能恢复。这是面向 MCP 重度用户的稳定性痛点，涉及 session 生命周期管理。

**趋势判断**：社区当前对**性能敏感度**极高（#6307 的 2s 开销被反复提及），同时大量用户已进入 MCP 多 server 的真实场景（#6524、#6557），说明 v2.0 的 MCP 架构正在被广泛采纳，但其健壮性仍需加强。

---

## 5. Bug 与稳定性

按严重程度排列（含已修复项）：

| 严重度 | Issue | 描述 | 状态 |
|---|---|---|---|
| 🔴 高 | [#6307](https://github.com/agentscope-ai/QwenPaw/issues/6307) | v2.0 每次回复固定 2s 开销（性能回归） | 开放，无对应 PR |
| 🔴 高 | [#6589](https://github.com/agentscope-ai/QwenPaw/issues/6589) | `execute_shell_command` 数万行输出一次性渲染，导致 Windows UI 完全卡死 | 开放，无对应 PR |
| 🟠 中 | [#6588](https://github.com/agentscope-ai/QwenPaw/issues/6588) | `spawn_subagent` 单任务模式不可用，`batch` 被强制为必填，空值与 `task` 互斥形成死锁 | 开放，已有 PR [#6595](https://github.com/agentscope-ai/QwenPaw/pull/6595) |
| 🟠 中 | [#6557](https://github.com/agentscope-ai/QwenPaw/issues/6557) | MCP 工具名以 `-` 开头导致 Kimi 等严格校验 API 返回 400 | 开放，已有 PR [#6561](https://github.com/agentscope-ai/QwenPaw/pull/6561) |
| 🟠 中 | [#6555](https://github.com/agentscope-ai/QwenPaw/issues/6555) | Dream 记忆压缩时间窗口漏洞：早期会话被滚动出上下文后永远丢失 | 开放，已有 PR [#6592](https://github.com/agentscope-ai/QwenPaw/pull/6592) |
| 🟡 低 | [#6524](https://github.com/agentscope-ai/QwenPaw/issues/6524) | MCP Server 重启后无法自动恢复 session | 开放，无对应 PR |
| ✅ 已修复 | [#6563](https://github.com/agentscope-ai/QwenPaw/issues/6563) | CI 阻塞所有 fork PR | 已关闭（#6562 修复） |
| ✅ 已修复 | [#6533](https://github.com/agentscope-ai/QwenPaw/issues/6533) | `/mission` 命令 TypeError | 已关闭（#6562 修复） |
| ✅ 已修复 | [#6506](https://github.com/agentscope-ai/QwenPaw/issues/6506) | 子会话未继承 OFF 审批级别 | 已关闭（#6562 修复） |
| ✅ 已修复 | [#6476](https://github.com/agentscope-ai/QwenPaw/issues/6476) | Matrix E2EE 不可用 | 已关闭（#6486 修复） |
| ✅ 已修复 | [#6578](https://github.com/agentscope-ai/QwenPaw/issues/6578) | Cron `dispatch.mode: "final"` 未生效 | 已关闭（7-30） |

**稳定性评估**：高严重度 Bug 集中在**性能与大规模输出**两条链路上（#6307/#6589/#6512 均与大输出/开销相关），暗示 v2.0 在数据处理管线存在系统性瓶颈。中断类 Bug（MCP 重连、记忆丢失）反应了架构在长生命周期场景的不足。好消息是，过去 24 小时关闭的 5 个 Bug 全部有对应的 Fix PR，说明响应闭环良好。

---

## 6. 功能请求与路线图信号

过去 24 小时新增了多个功能需求，结合已有 PR 判断其落地可能性：

| Issue | 需求 | 已有对应 PR | 落地判断 |
|---|---|---|---|
| [#6588](https://github.com/agentscope-ai/QwenPaw/issues/6588) | 让 `spawn_subagent` 的单任务模式真正可用 | PR [#6595](https://github.com/agentscope-ai/QwenPaw/pull/6595) | 高概率进入下个补丁版（修复性增强） |
| [#6557](https://github.com/agentscope-ai/QwenPaw/issues/6557) | MCP 工具名规范化（字母开头） | PR [#6561](https://github.com/agentscope-ai/QwenPaw/pull/6561) | 高概率，这是 OpenAI 规范兼容的关键修复 |
| [#6555](https://github.com/agentscope-ai/QwenPaw/issues/6555) | 记忆压缩不应丢失早期会话 | PR [#6592](https://github.com/agentscope-ai/QwenPaw/pull/6592) | 高概率，直接修复数据丢失类问题 |
| [#6453](https://github.com/agentscope-ai/QwenPaw/issues/6453) | 上传文件提示保留中文文件名 | PR [#6567](https://github.com/agentscope-ai/QwenPaw/pull/6567) | 高概率（UI 体验改进，低风险） |
| [#6160](https://github.com/agentscope-ai/QwenPaw/issues/6160) | 桌面版配备独立 Python 运行环境 | PR [#6579](https://github.com/agentscope-ai/QwenPaw/pull/6579) | 中概率（涉及依赖体积和分发策略） |
| [#6593](https://github.com/agentscope-ai/QwenPaw/issues/6593) | 统一且专业的清理页面（数据臃肿管理） | 无 | 早期需求信号，可能进入中期路线图 |
| [#6559](https://github.com/agentscope-ai/QwenPaw/issues/6559) | 会话分叉应以树形层级组织，避免列表混乱 | 无 | 早期需求，指向会话信息架构优化 |
| [#6083](https://github.com/agentscope-ai/QwenPaw/issues/6083) | Desktop 窗口增加工作区产出物快捷访问 | 无 | 已开放 17 天，4 条评论，等待产品决策 |

**路线图信号**：短期（下个补丁版）将聚焦 **MCP 工具名规范 + 子代理参数修复 + 记忆完整性**三个 Bug 修复；中期看，**桌面端体验优化**（Python 环境、工作区访问、中文文件名）形成了明确的增强集群；**数据治理**（#6593 清理页面）是一个新的、可能影响长期存储架构的需求方向。

---

## 7. 用户反馈摘要

从 Issues 与评论中提炼的真实用户声音：

- **性能体感是升级的最大阻力**（#6307）：用户明确表示"我宁可留在 v1.x"——2 秒固定开销对高频对话的体验侵蚀是决定性的。这不仅是技术债，更是**用户留存风险**。

- **大输出场景的不信任感**（#6589、#6512）：`execute_shell_command` 在输出超 30KB 时被截断、甚至触发 Internal error；超大输出又导致 UI 冻结。用户反馈"无法获取完整报告/日志"，在股票分析、批量查询等生产场景下**严重削弱了工具的可靠性**。

- **中文用户的本地化细节诉求**（#6453、#6587、#6583）：中文文件名被替换为不可读的 UUID 前缀、应用名"QwenPaw Desktop"中的 Desktop 后缀显得多余、拖入多个文件时无法完整查看文件名。这类"润色型"反馈量大且集中，说明**核心功能已基本可用，用户开始追求细节品质**。

- **对"自动化失控"的担忧**（#6559、#6593）：自动创建的分叉会话、自动记忆累积、各种工具调用产生的大量数据……用户反馈"日积月累会越来越臃肿""无法区分哪些是用户主动创建的"，侧面反映 v2.0 的自动机制（Auto-Memory、session forking）在**透明性和可控性**上还有提升空间。

- **对社区贡献正反馈**（#6563 关闭、多个 first-time-contributor PR 被合并）：从 #6563 被快速修复以及 #6486、#6256 等社区 PR 成功合入来看，**外部贡献者正得到有效支持**，这有利于项目长期生态建设。

---

## 8. 待处理积压

以下事项需要维护者重点关注：

- **⏳ 性能回归 #6307（开放 10 天，无 PR）**：[Issue #6307](https://github.com/agentscope-ai/QwenPaw/issues/6307)
  这是当前**优先级最高**的未解决项。涉及 v2.0 请求链路架构性开销，需要核心维护者介入定位。若长期悬而未决，可能导致用户回退 v1.x 或转向竞品。

- **⏳ 首批 first-time-contributor PR 已滞留近 30 天**：[#5739](https://github.com/agentscope-ai/QwenPaw/pull/5739)（聊天消息复制）、[#5740](https://github.com/agentscope-ai/QwenPaw/pull/5740)（JSON 配置支持 env 变量引用）、[#5745](https://github.com/agentscope-ai/QwenPaw/pull/5745)（持久化工件中的敏感信息脱敏）
  三个 PR 均创建于 7 月 2 日，距今近一个月未合并。尤其是 **#5745 的安全增强（secret 脱敏）** 具备明确价值，长期滞留会削弱社区贡献者的积极性。

- **⏳ 统一 Provider 平台 PR #6302（开放 10 天）**：[PR #6302](https://github.com/agentscope-ai/QwenPaw/pull/6302)
  涉及 provider 发现、模型元数据、路由、agent 控制的统一化重构，关联问题 #6167 的七个痛点。改动面较大（替代了之前的 provider-model-discovery 实现），需要评审组投入足够精力。

- **⚠️ 长期开放的 UI 增强 #6083（开放 17 天）**：[Issue #6083](https://github.com/agentscope-ai/QwenPaw/issues/6083)
  "Desktop 窗口增加工作区产出物快捷访问按钮"获得了用户共鸣（4 条评论），且与 #6593（清理页面）的诉求相互关联，建议产品团队**将两者放在一起设计**，形成完整的工作区文件管理体验。

- **👀 UI 冻结 #6589 值得警惕**：[Issue #6589](https://github.com/agentscope-ai/QwenPaw/issues/6589)
  虽报出仅 1 天，但"UI 完全卡死、只能强制关闭"是 P0 级别的体验事故，且与 #6512（输出截断）同源。建议优先安排修复，避免影响 2.0.x 在各渠道的推广口碑。

---

*本日报由 AI 自动生成，数据截至 2026-07-31。数据源：[github.com/agentscope-ai/CoPaw](https://github.com/agentscope-ai/CoPaw)*

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

# ZeptoClaw 项目动态日报（2026-07-31）

## 1. 今日速览

今日 ZeptoClaw 项目整体活跃度偏低：过去 24 小时无新增或关闭 Issue，也无新版本发布；Pull Request 方面有 1 条处于待合并状态。当前唯一值得关注的 PR #645 正在推进运行时安全性修复（子进程环境变量清理）与稳定性改进（超时进程树回收），该 PR 自 7 月 23 日创建至今已开放 8 天，建议维护者尽快安排评审。总体来看，项目处于短暂的 PR 评审/合并间歇期，无明显异常信号。

## 2. 版本发布

无新版本发布（最新 Releases 为空）。

## 3. 项目进展

- **🔄 [PR #645](https://github.com/qhkm/zeptoclaw/pull/645)（待合并）**：`fix(runtime): scrub subprocess secrets and reap timed-out process trees`。该 PR 修复了两个关键问题：
  1. **敏感信息泄漏风险**：此前运行时 shell 命令完整继承 ZeptoClaw 的进程环境变量，导致 provider API keys 和其他凭据可能被模型编写的命令访问到。修复后将在子进程启动前清理环境变量。
  2. **超时进程清理不彻底**：运行时超时机制此前会丢弃 `Command::output()` future，但未一致性地终止并回收子进程树，可能留下孤儿进程；同时涉及 Docker 容器场景的相关处理。

  该 PR 直接关系到 AI Agent 运行时的安全边界与资源释放稳定性，合并后将显著提升项目在生产环境的可靠性与安全性。目前未有合并/关闭的 PR，整体功能推进速度受评审节奏影响。

## 4. 社区热点

今日无评论数较高的热门 Issue/PR 讨论，唯一动态为 [PR #645](https://github.com/qhkm/zeptoclaw/pull/645)（👍 0、无评论）。该 PR 虽未引发大量公开讨论，但其修复方向直指 AI Agent 场景下的两个共性痛点：**凭据隔离**与**进程生命周期管理**，这通常也是用户在实际部署 AI 助手时最关心的安全与稳定性问题。建议后续结合 PR 合并情况，在 Release Notes 中向社区明确说明该修复的影响范围。

## 5. Bug 与稳定性

今日无新报告的 Bug 或回归 Issue。不过 [PR #645](https://github.com/qhkm/zeptoclaw/pull/645) 本身对应两个已识别的潜在缺陷，按严重程度排列如下：

| 严重程度 | 问题描述 | 修复状态 |
|---|---|---|
| **高（安全）** | 子进程继承完整环境变量，provider 密钥等敏感凭据可能泄露给模型生成的命令 | 已有 PR #645，待合并 |
| **中（稳定性）** | 运行时超时未始终终止并回收子进程树，可能遗留僵尸进程或占用资源 | 已有 PR #645，待合并 |

## 6. 功能请求与路线图信号

今日无新 Issue 提出功能需求。从 PR #645 的修复内容来看，**运行时安全性加固与进程资源治理**是当前阶段的重点方向。考虑到此类基础设施完善通常是功能扩展（如更复杂的工具调用、多步骤任务编排）的前置条件，可推测下一版本可能继续围绕以下方向深化：

- 子进程沙箱化或最小权限执行模型
- 超时策略的可配置化（如支持自定义信号、强制 kill 策略）
- Docker 容器运行时的资源回收与隔离增强

## 7. 用户反馈摘要

今日无 Issue 评论可供提炼（0 条 Issue 更新）。但结合 PR #645 的改动内容，可以合理推断社区用户在实际使用中可能遇到以下场景痛点（待后续 Issue/Comment 验证）：

- 在使用 ZeptoClaw 执行 shell 命令时，担心模型可读取环境变量中的密钥
- 长时间运行的命令超时后，系统资源未被完全释放，影响后续任务执行
- 在 Docker 容器中运行 ZeptoClaw 时，超时进程的清理行为不符合预期

## 8. 待处理积压

- **[PR #645](https://github.com/qhkm/zeptoclaw/pull/645)**：自 2026-07-23 创建，已开放 8 天，最后更新于 2026-07-30。涉及安全修复与稳定性改进，建议维护者优先安排 code review 与测试。当前无明确 Blockers 信息。
- 除上述 PR 外，暂无其他长期未响应的 Issue 或 PR 积压。

---

**项目健康度评估**：今日活跃度处于中低位，但 PR #645 的持续推进表明项目仍在进行实质性的安全加固。建议关注该 PR 的评审进度，若能在 1-2 天内完成合并，将视为良好的维护节奏。

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

过去24小时无活动。

</details>

---
*本日报由 [agents-radar](https://github.com/huang-yi-dae/agents-radar) 自动生成。*