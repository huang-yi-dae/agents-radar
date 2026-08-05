# OpenClaw 生态日报 2026-08-05

> Issues: 500 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-08-05 05:02 UTC

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

# OpenClaw 项目动态日报 — 2026-08-05

## 今日速览

过去 24 小时项目活跃度极高，Issue 与 PR 更新双双达到 500 条，其中新开/活跃 Issue 395 条、待合并 PR 398 条，显示社区反馈与贡献者提交均处于高位。Issue 关闭率约 21%，PR 合并/关闭率约 20%，处理速度略滞后于新增速度，积压压力持续存在。值得关注的是，当前无新版本发布，但多项 P0/P1 级严重问题（含 2 个 P0 数据丢失风险）仍在推进中，其中部分已有对应修复 PR。此外，今日有 4 个维护者（steipete）提交的 PR 被合并/关闭，涉及 Slack/Mattermost 线程参与过期时间持久化、PDF 渲染错误处理、OTel 代理校验等多个稳定性修复。

---

## 版本发布

过去 24 小时无新版本发布。

---

## 项目进展

今日无新合并 PR，但有多项高优先级 PR 进入可合并状态或等待作者响应，标志着项目在以下方向取得实质进展：

**稳定性修复 PR 密集推进**

- **steipete 提交 4 个 PR 被合并/关闭**，涉及多个通道的稳定性与安全修复：
  - [#118630 fix(slack,mattermost): preserve thread participation expiry across restarts](https://github.com/openclaw/openclaw/pull/118630) — 修复网关重启后线程参与过期时间被重置的问题，防止过期时间被静默延长近 7 天，P1 优先级。
  - [#118622 fix(mattermost): preserve named-channel lookup failures](https://github.com/openclaw/openclaw/pull/118622) — 防止用户发送到 `#channel-name` 时因原团队查询失败而将消息错误投递到其他团队同名频道。
  - [#118629 fix(pdf): surface image-render failures when documents have no text](https://github.com/openclaw/openclaw/pull/118629) — 在 PDF 无文本内容且渲染失败时提供可操作的错误信息。
  - [#118635 fix(otel): redact invalid collector URLs and suppress implicit exporters](https://github.com/openclaw/openclaw/pull/118635) — 修复 OpenTelemetry 插件中隐式导出器绕过显式配置的问题，并优化无效 Collector URL 的报错信息脱敏。

**P0 数据丢失修复 PR 待审**

- [#119260 fix(media): fail closed when managed-media cleanup cannot read the session store](https://github.com/openclaw/openclaw/pull/119260) — 针对 #119090 P0 数据丢失问题：当 SQLite 会话存储不可读时，受管媒体清理会永久删除已生成的媒体文件。此 PR 改为故障关闭，保护原始文件。
- [#119127 fix(media): keep the ttl sweep out of the managed outgoing tree](https://github.com/openclaw/openclaw/pull/119127) — 修复配置了 `attachments.ttlHours` 后，通用 mtime 清理误删 `media/outgoing` 中仍被聊天历史引用的附件的问题。

**其他关键修复就绪**

- [#119463 fix(agents): keep exact NO_REPLY silent instead of mirroring messaging-tool text](https://github.com/openclaw/openclaw/pull/119463) — 修复代理回合中 `NO_REPLY` 被重写为内部消息导致误发用户频道的问题，P1 优先级，已被标记为 `ready for maintainer look`。
- [#119486 fix(cli): meter base64 image payloads as stubs in Claude live session turns](https://github.com/openclaw/openclaw/pull/119486) — 修复照片密集型 CLI 后端回合因输出上限误报失败的问题。
- [#119473 fix(agents): seed fresh session identity before transcript append](https://github.com/openclaw/openclaw/pull/119473) — 修复新会话首次 transcript 写入失败导致模型调用前报错的问题。

> **项目整体评估**：虽然合并效率不高，但高优先级修复 PR 覆盖面广且质量较高，尤其是媒体数据丢失和通道消息错投两类问题均获得了针对性修复，项目在稳定性方向上前进明显。

---

## 社区热点

**1. Realtime 语音会话的无限状态增长 ⭐ 最热 Issue**

[#116201 Realtime voice work can retain unbounded provider and consult state](https://github.com/openclaw/openclaw/issues/116201) — 59 条评论，P1 严重级别，`diamond lobster` 评级。用户 `vincentkoc` 指出 Realtime 语音会话在慢速、停滞或突发 provider/client 行为下，可能无限保留已废弃的 consult 工作、大型 provider 帧、pre-ready 音频等状态。该问题自 7 月 30 日创建后持续发酵，反映了语音功能在真实场景中的资源管理缺陷。

**2. 崩溃循环导致 Discord/WhatsApp 永久禁用**

[#115326 Crash-loop breaker suppresses Discord/WhatsApp permanently and documented recovery (channels.start) fails with WebSocket 1006](https://github.com/openclaw/openclaw/issues/115326) — 已关闭，25 条评论，P1 级别。用户报告网关启动后因崩溃循环保护器导致 Discord/WhatsApp 通道被永久抑制，且文档中提供的恢复路径 `channels.start` 因 WebSocket 1006 错误失效。该问题已关闭但未见明确修复 PR。

**3. 子代理完成结果静默丢失（系列问题）**

子代理完成投递失败已成为社区反映最集中的痛点之一，多个相关 Issue 持续活跃：

- [#44925 Subagent completion silently lost — no retry, no notification, no auto-restart on timeout](https://github.com/openclaw/openclaw/issues/44925) — 23 条评论，创建于 3 月，至今未解决。
- [#67777 Subagent completion delivery can be lost on direct-announce timeout, drain, or orphan prune](https://github.com/openclaw/openclaw/issues/67777) — 10 条评论，P1。
- [#92433 Subagent completion silently dropped when announce steers into a requester run that ends before processing it](https://github.com/openclaw/openclaw/issues/92433) — 9 条评论，P1。

三个 Issue 都指向子代理完成结果在不同条件下（超时、drain、孤立进程、steering）被静默丢弃的问题，社区呼声较高，目前均被标记为 `needs-product-decision`，等待维护者产品决策。

**4. 网关主线程饱和问题引发广泛关注**

[#118846 Gateway main thread saturated from boot by plugin-metadata snapshot + fs statting; starves the accept loop (local RPC dies at ws_upgrade with 1006)](https://github.com/openclaw/openclaw/issues/118846) — 15 条评论，P1。用户报告 `2026.7.2-beta.7` 版本中网关主线程从启动起就持续被插件元数据快照和文件系统 stat 操作占满，导致本地 RPC 在 WebSocket 升级时死亡。这可能是近期 WebSocket 1006 错误频发的根因之一。相关修复 PR [#119369](https://github.com/openclaw/openclaw/pull/119369) 已提交，正在等待作者响应。

---

## Bug 与稳定性

### P0 级（需立即关注）

| Issue | 问题描述 | 状态 | 修复 PR |
|-------|---------|------|---------|
| [#119088](https://github.com/openclaw/openclaw/issues/119088) 关联 | 受管媒体清理误删被聊天历史引用的附件 | 已有修复 | [#119127](https://github.com/openclaw/openclaw/pull/119127) 待审 |
| [#119090](https://github.com/openclaw/openclaw/issues/119090) 关联 | 会话存储不可读时媒体被永久删除（数据丢失） | 已有修复 | [#119260](https://github.com/openclaw/openclaw/pull/119260) 待审 |

### P1 级

**数据/状态丢失类：**

| Issue | 问题描述 | 修复 PR |
|-------|---------|---------|
| [#116201](https://github.com/openclaw/openclaw/issues/116201) | Realtime 语音会话无界保留 provider/consult 状态 | 无 |
| [#115908](https://github.com/openclaw/openclaw/issues/115908) | Session transcript projection reconcile 在持续写入下 livelock，阻塞主线程 | 无 |
| [#92433](https://github.com/openclaw/openclaw/issues/92433) | 子代理完成结果在 requester run 提前结束时被静默丢弃 | 无 |
| [#67777](https://github.com/openclaw/openclaw/issues/67777) | 子代理完成投递在超时/drain/孤立清理时丢失 | 无 |
| [#44925](https://github.com/openclaw/openclaw/issues/44925) | 子代理完成静默丢失，无重试/通知/自动重启 | 无 |
| [#111498](https://github.com/openclaw/openclaw/issues/111498) | macOS 主代理因旧工作区状态迁移阻塞所有 Anthropic 轮次 | 无 |
| [#115700](https://github.com/openclaw/openclaw/issues/115700) | `chat.send` 在模型完成后因陈旧 expectedLeafEntryId 被拒绝 | 有已关联 PR |
| [#119263](https://github.com/openclaw/openclaw/issues/119263) | Agent DB v14→v15 迁移失败（`no such column: entry_valid`），网关拒绝启动 | 有已关联 PR |

**崩溃循环/性能类：**

| Issue | 问题描述 | 修复 PR |
|-------|---------|---------|
| [#118846](https://github.com/openclaw/openclaw/issues/118846) | 网关主线程被插件元数据快照占满，RPC 死亡 | [#119369](https://github.com/openclaw/openclaw/pull/119369) |
| [#112395](https://github.com/openclaw/openclaw/issues/112395) | 6.11→7.1 升级后迁移预检阻塞网关启动 | 无 |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | hook/tool 子进程泄漏导致僵尸进程积累 | 无 |

**认证/安全类：**

| Issue | 问题描述 | 修复 PR |
|-------|---------|---------|
| [#117956](https://github.com/openclaw/openclaw/issues/117956) | `claude-cli` 后端在 `CLAUDE_CLI_CLEAR_ENV` 清理 API key 后仍产生计费（约 1370 万 token/天） | 已关闭 |
| [#103804](https://github.com/openclaw/openclaw/issues/103804) | service-env 生成器双重引号导致 `AWS_REGION` 解析失败 | 无 |
| [#117609](https://github.com/openclaw/openclaw/issues/117609) | 嵌入式助手阶段不重试瞬时 LLM/

---

## 横向生态对比

# AI 智能体开源生态横向对比分析报告 — 2026-08-05

## 1. 生态全景

个人 AI 助手开源生态正处于**功能深度迭代与稳定性并重**的阶段。以 OpenClaw 为核心的"Claw 系"项目分化出多条技术路线——从 ZeroClaw 的架构 RFC 密集期、IronClaw 的 crate 架构重构落地、到 NanoBot 前端体验打磨均同步推进。社区对**数据安全**（P0 媒体误删、跨 Agent 权限隔离）与**通道可靠性**（Discord 审批失效、MCP 挂起、WebSocket 1006 崩溃循环）的容忍度正在降低，各项目均将高严重度 Bug 修复列为优先事项。与此同时，**OpenAI 兼容层**（ZeroClaw #8603）、**多模型并行**（CoPaw #6455）、**CLI Provider 扩展**（NullClaw #981）等跨项目需求浮现，表明用户正尝试将智能体融入既有工具链。整体生态处于"架构重构消化期"，维护者评审带宽成为普遍瓶颈。

---

## 2. 各项目活跃度对比

| 项目 | Issues (新开/活跃) | Issues (关闭) | PRs (待合并) | PRs (合并/关闭) | Release | 健康度评估 |
|------|-------------------|--------------|--------------|-----------------|---------|-----------|
| **OpenClaw** | 395 | ~83 (21%) | 398 | ~80 (20%) | 无 | ⚠️ 高活跃但积压严重，P0 修复待合入 |
| **NanoBot** | 3 开 | 1 关 | 6 | 15 | 无 | ✅ 合并效率高，WebUI 打磨密集 |
| **ZeroClaw** | 39 活跃 | 未明确 | 50 (0 合并) | 0 | 无 | ⚠️ 架构决策期，PR 全部积压 |
| **PicoClaw** | 3 条更新 | — | 2 新 | 2 关闭 | 无 | ✅ 存量消化中，响应正常 |
| **NanoClaw** | 0 新 | — | 4 | 1 | 无 | ⚠️ 评审延迟，Discord 修复待审 |
| **NullClaw** | 0 | — | 1 | 0 | 无 | ✅ 低活跃但无积压压力 |
| **IronClaw** | 37 活跃 | 13 | 24 | 26 | v1.1.0-rc.1 | ✅ 高强度迭代，合入节奏快 |
| **LobsterAI** | 1 新 | 未明确 | 3 | 12 | 无 | ✅ 稳定迭代，但 stale 问题突出 |
| **Moltis** | 0 | — | 1 (dependabot) | 0 | 无 | ✅ 低活跃维护模式 |
| **CoPaw** | 16 开 | 12 关 | 22 | 19 | v2.1.0-beta.1 | ✅ 活跃，但 Beta 引入回归 |
| **TinyClaw / ZeptoClaw / EasyClaw** | — | — | — | — | — | 无活动 |

---

## 3. OpenClaw 在生态中的定位

OpenClaw 仍是生态**核心参照与规模标杆**——单日 395 条活跃 Issue 与 398 个待合并 PR 远超其他项目（ZeroClaw 50、CoPaw 22、IronClaw 24）。其社区规模（500+ 条更新/日）约为第二梯队（ZeroClaw/IronClaw/CoPaw 的 30-70 条/日）的 7-10 倍，构成显著的"头部效应"。技术路线上，OpenClaw 侧重于**多通道稳定性修复**（Slack/Mattermost 线程持久化、PDF 渲染、OTel 代理）与**数据安全**（2 个 P0 媒体误删修复），与 IronClaw 的架构重构（Target Crate Architecture）和 ZeroClaw 的 RFC 驱动演进（安全架构、会话统一）形成互补——OpenClaw 是"广度覆盖 + 稳定性兜底"，ZeroClaw/IronClaw 则向"深度架构收敛"迈进。OpenClaw 的薄弱点在**合并效率**（仅 20% vs NanoBot 的 71%），高吞吐输入与低处理输出的剪刀差正在累积技术债。

---

## 4. 共同关注的技术方向

| 方向 | 涉及项目 | 具体诉求 |
|------|---------|---------|
| **数据/状态丢失防护** | OpenClaw（#119088/#119090 P0 媒体误删）、ZeroClaw（#9646/#9647 跨 Agent 数据读写）、IronClaw（#7178 迁移非无损） | 故障关闭、per-agent 权限隔离、无损迁移 |
| **通道可靠性** | OpenClaw（#115326 崩溃循环、WebSocket 1006）、NanoClaw（#3185 Discord 审批失效）、PicoClaw（#3269 MCP 挂起）、CoPaw（#6696 context_token 消耗） | 重试/心跳机制、custom_id 解析、超时降级 |
| **OpenAI 兼容层/生态接入** | ZeroClaw（#8603 Chat Completions profile）、NullClaw（#981 grok-cli provider）、CoPaw（#6455 多模型并行） | 支持 Open WebUI/LobeChat/Aider 等既有客户端 |
| **可观测性与成本透明** | OpenClaw（#118635 OTel）、PicoClaw（#3251/#3317 Prompt Cache Token 指标）、IronClaw（#7103 latency trace 开销） | Token 用量可视化、缓存命中率可观测 |
| **会话/上下文管理** | ZeroClaw（#9488 附件架构、#9487 会话所有权）、CoPaw（#6704 会话分叉）、PicoClaw（#3281 长历史 UI 卡顿） | 统一附件模型、会话级权限、前端虚拟滚动 |
| **安全默认值** | ZeroClaw（#7155 shell 命令确认层）、CoPaw（#6676 OneBot 回环绑定、#6692 日志脱敏）、OpenClaw（#118635 URL 脱敏） | 最小暴露面、敏感信息过滤 |

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构关键差异 |
|------|---------|---------|----------------|
| **OpenClaw** | 全通道消息代理 + 企业级稳定性 | 大规模部署、多团队协作 | 事件驱动网关，插件生态丰富，SQLite 会话存储 |
| **ZeroClaw** | 安全架构深度定制 + SOP 自动化 | 安全敏感型企业、合规场景 | RFC 驱动演进，WASM 插件隔离，Docker 沙箱 |
| **IronClaw** | Rust 高性能 + 模块化可插拔 | Rust 生态开发者、自主托管 | Target Crate 架构（WS 系列重构），"Reborn" 运行时演进 |
| **NanoBot** | WebUI 体验 + 轻量部署 | 个人开发者、小团队 | Python 实现，Vite 前端，活跃的前端社区 |
| **CoPaw** | 多渠道 + 桌面端 + 编码代理 | 混合办公场景（IM+IDE） | 会话分叉、Scroll 上下文压缩、项目目录语义化 |
| **PicoClaw** | 轻量级、配置极简 | 个人极简部署 | 少量集成、OAuth 健壮性优先 |
| **NanoClaw** | 定时任务编排 + Dial 渠道 | 自动化场景（SMS/语音） | 定时任务运行时上下文，渠道适配器模式 |
| **NullClaw** | 多 CLI Provider 聚合 | 已有本地 CLI 认证的用户 | spawn-per-request 模式（codex/gemini/claude/grok） |
| **LobsterAI** | 桌面 IM 客户端（网易云信） | 企业 IM 用户 | 闭源内核+周边开源，渲染层/活动运营优化 |
| **Moltis** | 网站静态资源管理 | 低维护场景 | 依赖自动化为主，社区参与度低 |

---

## 6. 社区热度与成熟度分层

| 阶段 | 项目 | 特征 |
|------|------|------|
| **快速迭代期** | IronClaw（26 PR 合入/日）、CoPaw（19 PR 合入/日）、NanoBot（15 PR 合入/日） | 高频合入，功能与 Bug 同步推进，Release 周期短（IronClaw 已出 rc） |
| **高吞吐积压期** | OpenClaw（395 Issue / 398 PR 待办）、ZeroClaw（50 PR 全积压） | 社区反馈远超处理速度，高优修复（P0/P1）与架构 RFC 竞争评审资源 |
| **存量消化期** | PicoClaw（2 PR 关闭）、LobsterAI（12 PR 合并）、NanoClaw（1 PR 合并） | 处理量适中，但部分 PR 悬置超 20 天（NanoClaw Dial 渠道 #3041/#3050） |
| **低活跃维护期** | NullClaw（1 PR 悬置 7 天）、Moltis（仅 dependabot）、TinyClaw/ZeptoClaw/EasyClaw（无活动） | 核心功能稳定，依赖外部贡献者零星提交，需防贡献者流失 |

---

## 7. 值得关注的趋势信号

1. **"故障关闭"（fail-closed）成为数据安全共识**：OpenClaw #119260（媒体清理遇存储不可读时保护原始文件）、ZeroClaw #9565（Gateway webhook 未鉴权即转发）、CoPaw #6657（沙箱配置无法强制执行时主动上报）——三个项目同日出现同类模式，标志数据安全从"尽力而为"转向"默认保守"。

2. **审批流/高风险操作的多通道适配是共性痛点**：NanoClaw Discord 审批按钮失效（#3185）、CoPaw console/WeChat 审批提示不可达（#6655/#6695）、ZeroClaw #7155 命令确认层——用户在非 Web 界面执行敏感操作的控制权诉求强烈，预计将驱动审批协议的标准化。

3. **"成本透明度"成为可观测性新维度**：PicoClaw 连续两个 PR 补全 Prompt Cache Token 指标（#3251/#3317）、OpenClaw 修复 OTel 隐式导出器（#118635）、IronClaw 优化 latency trace 计算开销（#7103）——社区正从"功能能跑"转向"跑得明明白白"。

4. **CLI Provider 模式兴起，挑战 API Key 中心化架构**：NullClaw #981 延续 codex-cli/gemini-cli/claude-cli 的 spawn-per-request 模式，用户对"本地认证、零网络请求"的偏好上升。NanoBot #4784 则暴露了全局 `os.environ` 覆盖其他 Provider Key 的安全缺陷——CLI 模式的私密性优势将不可避免地对 API 管理模块的设计提出新要求。

5. **OpenAI 兼容层成为生态扩张的必选项**：ZeroClaw #8603（Open WebUI/LobeChat/Aider/LangChain 等客户端接入诉求）是本周最强外部集成信号。若落地，将大幅降低用户从闭源方案迁移的摩擦——这是一项"融入既有生态而非引入新协议"的关键战略决策。

6. **架构重构进入"清算期"，回归稳定性优先**：IronClaw 异常注册表清零（WS3 收官）、OpenClaw 密集 P0/P1 修复、CoPaw 为 v2.1.0-beta.1 发布后快速响应回归——各项目经历了数月的功能拓展后，正将重心转向消除技术债与质量加固，为下一轮功能增长夯实基础。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

### 1. 今日速览

NanoBot 项目昨日保持高活跃度，共处理 4 条 Issues（3 开 1 关）和 21 条 PR（6 待合并，15 已合并/关闭）。合并/关闭的 PR 数量显著高于新增，说明维护者合并效率较高，项目清理积压的速度快于新增速度。WebUI 前端重构（视觉一致性、边缘渐变、提示词预览等）是昨日合并最集中的领域（约 8 个 PR），其次为渠道修复（Telegram、WeCom、Mattermost）。安全方面，`#4784` 关于 Provider API Key 通过全局 `os.environ` 泄漏的问题仍在讨论中，建议优先关注。

---

### 2. 版本发布

昨日无新版本发布。

---

### 3. 项目进展

- **[webui] 前端大批量打磨与重构**：`chengyongru` 连续合入 7 个 PR（[#5238](https://github.com/HKUDS/nanobot/pull/5238)、[#5239](https://github.com/HKUDS/nanobot/pull/5239)、[#5241](https://github.com/HKUDS/nanobot/pull/5241)、[#5242](https://github.com/HKUDS/nanobot/pull/5242)、[#5243](https://github.com/HKUDS/nanobot/pull/5243)、[#5244](https://github.com/HKUDS/nanobot/pull/5244)、[#5245](https://github.com/HKUDS/nanobot/pull/5245)），涉及时间戳样式统一、自动化元数据对齐、提示词 Markdown 渲染、斜杠命令校验、Token 高亮细化，以及**集成 Vite dev 模式**（`nanobot webui --dev`，含 HMR）和**取消请求级 Session 访问授权**（简化权限模型）。另有 [#5240](https://github.com/HKUDS/nanobot/pull/5240) 统一了浮动控件样式、[#5249](https://github.com/HKUDS/nanobot/pull/5249) 提升视觉一致性。WebUI 在交互细节、开发体验与安全模型上均有明显推进。
- **渠道修复**：修复 WeCom 文件名脱敏后为空导致的目录写入错误（[#5223](https://github.com/HKUDS/nanobot/pull/5223)）；修复 Telegram 围栏代码语言含特殊字符（如 `c++`）时的渲染错乱（[#5222](https://github.com/HKUDS/nanobot/pull/5222)），以及合并了长期未决的 `group_mode` 配置字段冲突 PR（[#1776](https://github.com/HKUDS/nanobot/pull/1776)，3月创建，昨日关闭）。
- **新功能合入**：Mattermost 新增 `groupPolicyInThread` 配置，区分主频道与线程的提及策略，并在 WebUI 暴露（[#5233](https://github.com/HKUDS/nanobot/pull/5233)）；支持可信代理（如 Cloudflare Access）的无 Token 引导认证（[#5210](https://github.com/HKUDS/nanobot/pull/5210)）。

---

### 4. 社区热点

- **[Security] Provider API keys 跨 Provider 泄漏（#4784）**：目前最受关注的安全议题。`OpenAICompatProvider._setup_env()` 直接改写全局 `os.environ`，gateway 类型 Provider 的 API Key 会覆盖其他 Provider 的同名 Key，存在密钥互相污染风险。该 Issue 已存在近一个月，讨论量有限（2 条评论），但涉及核心安全模型，值得维护者主动介入澄清修复方案。 [链接](https://github.com/HKUDS/nanobot/issues/4784)

---

### 5. Bug 与稳定性

按严重程度排列：

| 严重程度 | Issue/PR | 描述 | 状态 |
|---|---|---|---|
| 高 | [#5235](https://github.com/HKUDS/nanobot/issues/5235) | Anthropic Opus 5 发布后，`omit_temperature` 列表未更新，请求仍携带已废弃的 `temperature` 字段，导致 API 拒绝所有 Opus 5 配置。 | **已关闭**（维护者已知晓） |
| 中 | [#5247](https://github.com/HKUDS/nanobot/issues/5247) | Matrix 机器人被邀请入房时不自动加入，`Api.join()` 的 POST 请求体为空，被部分服务器（Continuwuity）以 `M_BAD_JSON` 拒绝。 | **有对应 fix PR**：[#5248](https://github.com/HKUDS/nanobot/pull/5248)（待合并） |
| 中 | [#4784](https://github.com/HKUDS/nanobot/issues/4784) | Provider API Key 通过 `os.environ` 被其他 Provider 覆盖，存在密钥泄漏风险。 | 开放中，需维护者确认修复方案 |
| 低 | [#5246](https://github.com/HKUDS/nanobot/issues/5246) | 默认 `.gitignore` 规则导致 `memory/.cursor` 等文件意外纳入版本控制，存在生成文件泄漏风险。 | 开放中，无对应 PR |

---

### 6. 功能请求与路线图信号

- **Telegram 自定义 Bot API 域名**（[#4919](https://github.com/HKUDS/nanobot/pull/4919)）：支持自建 Bot API Server 或企业网关，已实现并处于待合并状态，预计下一版本将收录。
- **Meta-Search Tool（mst）搜索 Provider**（[#5234](https://github.com/HKUDS/nanobot/pull/5234)）：聚合 DuckDuckGo、Google、Bing 等多引擎结果，通过 RRF 算法融合排序，作为新的搜索 Provider 待整合。
- **Quick Chat 与 Temporary Chat**（[#5184](https://github.com/HKUDS/nanobot/pull/5184)）：为 WebUI 增加常驻快速对话与连接级内存的临时对话，目前存在合并冲突。
- **Telegram 轮询静默失败恢复**（[#5156](https://github.com/HKUDS/nanobot/pull/5156)）：针对网络闪断后机器人永久失联的问题，加入超时与重连心跳机制，已等待合并 6 天。

---

### 7. 用户反馈摘要

- **对 WebUI 细节的密集打磨**：多个 PR 针对视觉一致性和交互反馈（如提示词悬停预览、时间戳样式统一、命令高亮），侧面反映用户对 WebUI 使用体验的期望值较高，维护者响应积极。
- **存量配置被静默忽略**：PR [#1776](https://github.com/HKUDS/nanobot/pull/1776) 暴露了 Telegram `group_mode` 配置在 Pydantic schema 中缺失、代码存在但配置被静默忽略的问题。这类"配置不报错"的体验易造成用户困惑。
- **对第三方服务的适配要求增加**：Matrix（Continuwuity）、Telegram（自建 API）等渠道的环境差异已在真实部署中暴露问题，用户对自定义部署场景（如企业内网、自托管服务器）的需求日益明显。

---

### 8. 待处理积压

- **长期未合入的 PR**：
  - [#1776](https://github.com/HKUDS/nanobot/pull/1776) 已关闭（之前标记为冲突），但 `group_mode` 配置丢失问题需要最终修复确认。
  - [#4919](https://github.com/HKUDS/nanobot/pull/4919)（Telegram 自定义 API Base）已等待 21 天，建议尽快合并，避免与后续改动冲突。
  - [#5156](https://github.com/HKUDS/nanobot/pull/5156)（Telegram 轮询故障恢复）已等待 6 天，涉及生产稳定性，建议优先审查。
  - [#5184](https://github.com/HKUDS/nanobot/pull/5184)（Quick Chat）存在合并冲突，需协调解决。
- **长期未响应的安全 Issue**：[#4784](https://github.com/HKUDS/nanobot/issues/4784) 提出时间较长且涉及密钥安全，建议安排维护者回复修复计划。

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-08-05

## 今日速览

项目今日活跃度极高，24 小时内产生 41 条 Issue 更新与 50 条 PR 更新，其中 39 个 Issue 处于活跃状态。主要讨论集中在三大方向：**RFC 安全架构与策略**（#7155、#7141、#7142）、**会话与通道架构统一**（#9487、#9488、#9600）以及 **Chat Completions 兼容层**（#8603）。安全类 Bug 成为重点关注对象，多个 S0/S1 级别问题（#9565、#9646、#9647）处于受理或修复中。社区在架构决策上投入大量精力，多个 RFC 正在经历多轮修订，整体项目处于深度架构演进期，维护者评审压力较大。今日无新版本发布。

## 项目进展

今日 50 个 PR 全部处于开放状态，0 个被合并或关闭，但多个 PR 在今日得到更新，说明贡献者正在积极根据评审意见迭代。值得关注的有：

- **#9324**：A2A 出站客户端工具集（四个 a2a_* 工具、共享 A2A v1.0 协议模型、默认关闭的客户端配置）已完成两轮评审修订，推进了外部系统互操作能力。
- **#9265 / #9268**：Anthropic 服务端 fallback 与安全护栏通知链路，形成完整的拒绝/降级用户体验闭环。
- **#9476**：新增 SOP 任务认证取消能力（含 `/api/sops/{name}/runs/{run_id}/cancel`）与 Dashboard 停止控件，运行中任务进入持久化 `CancelRequested` 状态，标志 SOP 任务控制面走向完整。
- **#9219 / #9224**：评测系统新增 workspace/budget/json-field 三类 grader，以及 pass@k/pass^k 重复运行统计，评测基础设施显著增强。
- **#9403**：WASM 插件导出增加 wall-clock 超时边界（默认 30,000ms），为第三方插件执行提供资源上限保障。
- **#9419**：可靠提供器在 429 后按凭据粒度轮换，修复了凭据冷却粒度太粗的问题。

## 社区热点

今日讨论最活跃的 Issue 集中在 RFC 类议题，呈现明显的**架构决策密集期**特征：

- **#8303「Goal mode v1 — 受限前台 Matrix 工作」**（16 评论）：讨论核心是持久化跨轮次用户目标的控制面设计，涉及重启交接与模型发起控制等边界问题。项目正从"单轮对话"走向"多轮目标追踪"。
- **#8603「Chat Completions profile」**（16 评论）：社区对 OpenAI 协议兼容层诉求强烈，涉及 Open WebUI、LobeChat、Continue.dev、Aider、LangChain 等主流客户端接入。这将是扩大生态的关键一步。
- **#7155「高风险 shell 命令确认层 + 命令策略模式」**（14 评论）：已修订至第三版，是安全策略收敛与运行时权威归属系列讨论的一部分。
- **#9488「统一附件架构」**（13 评论）：与 #9487（运行时会话与传输适配器）、#9600（会话持久化契约归属）形成关联讨论组，社区正在重绘 Gateway 层核心架构。
- **#8692「维护者决策队列跟踪器」**（9 评论）：社区自发建立 RFC 决策队列跟踪，反映对大量 RFC 积压等待维护者裁决的焦虑。

## Bug 与稳定性

今日报告的 Bug 按严重程度排列：

**P0（严重）：**

- **#9565**：Gateway webhook 处理未 fail-closed — WhatsApp Cloud、Linq、WATI 三个入口未认证即转发消息。S0 数据丢失/安全风险，状态 in-progress。有 PR #9402 涉及运行时沙箱修复但非本问题直接修复。

**P1（高）：**

- **#9647**：知识图谱无 per-agent 归属 — 任何 agent 可读写其他 agent 的知识。S0 数据丢失/安全风险，已受理但尚未有修复 PR。
- **#9646**：Session/channel 读写工具缺乏 per-agent 所有权检查（sessions_list/history/send、discord_search）。S0 数据丢失/安全风险，已受理但尚未有修复 PR。
- **#9402**：修复嵌套 Docker 沙箱（避免在 Docker runtime 内再嵌套 Docker sandbox），对应 PR #9402 待评审。
- **#9403**：WASM 导出增加超时保护（对应 PR #9403，待评审）。
- **#9476**：SOP 任务支持操作员认证取消（对应 PR #9476，待评审）。

**P2（中）：**

- **#9328**：verifiable-intent 约束评估未验证凭据链 — 已受理，待修复方案。
- **#9748**：修复 stale provider 刷新误改替换会话（对应 PR #9748，新增）。

多个安全类修复 PR（#9419、#9504、#9523、#8955 等）均在线等待评审，安全相关修复的合并延迟值得关注。

## 功能请求与路线图信号

- **Chat Completions 兼容层（#8603）** 是最强的外部集成信号，多个主流客户端在等待该能力落地。
- **统一附件架构（#9488）** 与**运行时会话所有权（#9487）** 属于同一批次架构重构，涉及 web chat 与多通道体验统一。
- **MoA 虚拟模型提供器（#8568）** 被关闭，混合专家聚合的思路可能被搁置或并入其他架构决策。
- **Goall mode（#8303）** 提出来跨轮次持久用户目标机制，反映从"对话助手"转向"任务执行代理"的需求。
- **Replacing React/Vite 构建的 Rust→Wasm 方案（#8132）** 已在讨论中，若落地则将大幅简化构建链，是长期架构方向的重要信号。
- **WASM 插件生命周期钩子（#7822）** 仍停留在需求收集阶段，生态扩展的优先级需与核心安全修复权衡。

## 用户反馈摘要

- **对架构决策拥堵有感知**：用户自发建立 #8692「维护者决策队列跟踪器」，多条高优先级 RFC（#7141、#7155、#7142）等待维护者评审，社区对决策阻塞的焦虑已制度化表达。
- **对 OpenAI 兼容层的迫切期待**：多个外部客户端（Open WebUI、LobeChat、Aider 等）的对接诉求集中在 #8603，反映用户希望 ZeroClaw 融入既有 MCP 生态而非引入新协议。
- **安全默认值相关诉求**：#7155 第三版修订响应了维护者对范围的收紧，用户期待更细粒度的 shell 命令策略（allow/ask/deny）与高风险操作的逐次确认。
- **多智能体隔离是真实痛点**：#9646 与 #9647 同为 S0 级数据安全风险，用户报告了跨 agent 知识污染的实际数据事故场景。
- **Slash 命令注册表分散造成维护负担**：#7929 得到持续关注，社区期待统一命令注册机制以减轻多前端维护成本。

## 待处理积压

**长期未决的 RFC（维护者应关注）：**

- **#6850**（05-22 创建）：Memory 生命周期与存储后端解耦，已等待近 2.5 个月，状态 needs-author-action。
- **#6653**（05-14 创建）：Host 架构策略（emulated installs），已超过 3 个月无实质进展，优先级 p3 但问题未被关闭。
- **#6971**（05-27 创建）：安全 UX 与运行时凭据边界，与 #7141、#7142 同属安全架构系列但进展较慢。

**悬置 PR：**

- **#8315**（06-25 创建，RPC 响应帧处理）与 **#8902**（07-09 创建，Zerocode 双向 RPC）均已超过一个月，且被标记为`stale-candidate`，但两者功能相互关联，应协同评审。
- **#8132**（06-22 创建，React→Wasm 框架替换）：虽争议较大，但已推动与 #7674 拆分独立，未被关闭。

**安全类 PR 积压风险提示：** #9402、#9403、#9419 均为修复高优先级问题但至今未合并，其中 #9403 涉及 WASM 资源上限、#9419 涉及凭据轮换，建议优先安排评审。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

### PicoClaw 项目动态日报 — 2026-08-05

---

#### 1. 今日速览

过去24小时项目活跃度中等偏高，共产生3条Issue更新与4条PR更新。今日无新版本发布，但有两项关键修复（OAuth登录兼容性、Anthropic提示词缓存指标）被关闭，虽标记为stale但终获处理。社区讨论焦点集中在Web UI长历史输入卡顿（#3281）与MCP连接失败导致Agent循环挂起（#3269）两个Bug上，均为高频影响用户体验的问题。此外，一条新增PR（#3317）延续了今日对Token缓存指标可观测性的关注，表明开发方向正向运维与成本透明度倾斜。整体来看，项目正在稳步消化存量PR，同时对近期反馈的稳定性问题保持响应。

---

#### 2. 版本发布

无新版本发布。

---

#### 3. 项目进展

今日关闭/合并了2个PR，均为对存量功能的修复与增强：

- **PR #3280 (已关闭)** — `fix(auth): make browser OAuth login survive real-world callback conditions`。该PR修复了`picoclaw auth login`在无头/远程环境下因回调条件不符而几乎必然失败的问题，并解决了授权码被“烧毁”后必须重跑全流程的痛点。修复覆盖4个独立根因，显著提升了OAuth登录的可靠性。

- **PR #3251 (已关闭)** — `fix(providers): capture the prompt cache token usage in Anthropic providers`。该PR修复了Anthropic及Anthropic Messages API提供商丢弃Claude返回的缓存Token指标的问题，使运维人员能够确认提示词缓存是否生效，填补了成本与性能观测的空白。

今日虽无合并，但上述两项的关闭标志着项目在**认证流程健壮性**与**Token用量可观测性**两个方向取得了实际进展。同时，#3317 PR的提交（使LLM响应的调试日志输出缓存Token）表明开发者社区正在持续补全这一观测能力，属于增量跟进。

---

#### 4. 社区热点

- **[Issue #3281] Web UI chat input is very laggy when history has a little bit long** — 获1个👍，3条评论。用户反馈在会话历史稍长后，输入框出现严重卡顿。该问题直接指向Web UI的核心交互体验，影响用户日常使用，评论区热度较高。背后诉求集中在前端渲染性能优化（如虚拟列表或懒加载机制）。

- **[Issue #3269] If the MCP server connection fails, the agent loop will hang** — 获1个👍，3条评论。该问题导致聊天界面完全停止回复，属于阻断性Bug。用户的隐性诉求不仅是修复超时处理，更是希望Agent具备更稳健的自动恢复与降级机制。

- **[PR #3299] Add native Exa web search provider** — 虽评论数未知，但作为功能型PR（新增原生`web_search`提供商），其设计涉及与现有`d/w/m/y`范围过滤器的对接，具备一定的社区关注度，值得持续观察。

---

#### 5. Bug 与稳定性

| 严重程度 | Issue/PR | 描述 | 状态 |
|---------|----------|------|------|
| **高** | Issue #3269 | MCP服务器连接失败导致Agent循环挂起，聊天界面停止响应 | **无Fix PR**，待处理 |
| **中** | Issue #3281 | Web UI在会话历史较长时输入卡顿 | **无Fix PR**，待处理 |
| **低** | Issue #3182 (已关闭) | Android版本无法启动服务，无法从设置更改路径 | 已关闭（标记stale），未实际修复 |

> 注：#3182虽然关闭，但其描述的问题（Android服务启动失败）并未有对应Fix PR记录，仅因长期无更新而被stale-bot关闭。

---

#### 6. 功能请求与路线图信号

- **[PR #3299] 原生Exa Web搜索提供商** — 新增`tools.web`/`web_search`的原生支持，配合`startPublishedDate`映射现有的时间范围过滤器。若合并，将丰富内置搜索能力，对依赖外部搜索的Agent应用是一大利好，预计有望进入下一版本。

- **[PR #3317] LLM响应调试输出增加Prompt Cache Token日志** — 该PR将缓存Token指标暴露在调试日志中，与今日关闭的#3251（Anthropic提供商修复）方向一致，构成对缓存指标观测能力的第二波补全，建议后续关注其是否被纳入0.3.x或0.4.0版本。

- **社区隐含需求**：从#3281卡顿与#3269挂起两个问题可以观察到，用户对**前端交互性能**与**Agent自愈能力**的期望明显上升，这可能成为下一阶段稳定性的迭代重点。

---

#### 7. 用户反馈摘要

- **#3182 (Android)**：用户明确表示已授予应用全部权限，但服务仍无法启动，且设置中的路径无法更改。这属于移动端环境的适配断裂，评论中有用户尝试协助但未果，最终该Issue因长时间未更新被自动关闭。此案例反映出移动端用户遇到问题时容易陷入“孤立无援”的状态。

- **#3281 (Web UI卡顿)**：用户反馈在会话历史变长后，仅输入文字便会感到严重延迟。这是典型的长列表渲染性能瓶颈，对日常重度使用者（长会话）影响明显。

- **#3269 (MCP连接挂起)**：用户使用Qwen3模型与nightly版本，MCP服务器一断，整个Agent循环即卡死，聊天界面不再回复。用户对“失败后无任何反馈或恢复机制”的现状表示不满。

- **正面信号**：社区连续提交围绕Prompt Cache Token的PR（#3251已关闭、#3317新开），结合Issue中用户对“成本与Token消耗透明度”的关切，说明在LLM成本敏感场景下有明确的观测诉求，且社区已自发贡献解决。

---

#### 8. 待处理积压

以下Issue/PR长期未获响应或处理停滞，建议维护者关注：

- **[Issue #3269] MCP连接失败导致Agent挂起** — 创建于7月20日，3条评论但无Fix PR，且属高严重度阻断问题，建议尽快确认修复方案。

- **[Issue #3281] Web UI长历史输入卡顿** — 创建于7月21日，仅3条评论，尚未有维护者或社区提交PR，建议明确前端性能优化的路线图。

- **[PR #3299] 原生Exa Web搜索提供商** — 已开放10天且无维护者评论，若有合入意向请及时沟通，避免社区贡献流失。

- **[Issue #3182] Android版本无法启动服务** — 已被自动关闭，但问题本身未解决。建议维护者评估是否值得重新开启，并考虑通过官方渠道（如FAQ、文档）回应移动端支持现状，避免类似Issue反复出现。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 — 2026-08-05

## 今日速览

NanoClaw 今日整体活跃度中等偏上。过去 24 小时无新 Issue 产生，但 PR 活动明显，共 5 条更新，其中 1 条已合并关闭，4 条处于待合并状态。今日合并的 PR #3154 为定时任务系统带来了运行时时间支持，是调度能力的重要补强。另有 3 个功能性 PR（Dial 渠道适配、技能宿主层重构）已进入评审尾声，若通过将显著扩宽交互渠道与系统可扩展性。值得警惕的是，Discord 审批按钮失效的严重 Bug 修复 PR #3185 已提交，建议优先跟进评审。

## 项目进展

今日合并并关闭了 1 个 PR：

- **PR #3154** — [fix(agent-runner): give scheduled tasks current run time](https://github.com/nanocoai/nanoclaw/pull/3154)（[Core Team] 合并，2026-08-04 更新）
  - 为定时任务引入 `current_time` 变量，基于任务实际触发的调度时间（`process_after`）渲染模板，并保留 `created_at` 作为旧数据回退。
  - 任务到达 agent 时将注入包含星期信息的完整时间上下文供 skill 使用。
  - 意义：解决了定时任务长期存在的“运行时与触发时错位”问题，使调度型 skill（例会播报、数据摘要等）不再依赖本地时钟推算，是任务编排链路的稳健性升级。

另有 4 个 PR 处于待合并状态，其中 **#3186（技能宿主层重构）** 与 **#3041/#3050（Dial 渠道落地）** 已分别有 22 天与 8 天的评审周期，今日均有更新，建议维护团队尽快安排评审窗口，避免冲突加剧与返工成本上升。

## 社区热点

今日无新 Issue 讨论，社区注意力集中在 3 个待合并的功能性 PR 上：

- [PR #3041: feat(channels): add Dial channel adapter (SMS + AI voice calls)](https://github.com/nanocoai/nanoclaw/pull/3041)（创建于 07-14，更新于 08-04）
- [PR #3050: feat(setup): add Dial to the channel picker + wizard/skills](https://github.com/nanocoai/nanoclaw/pull/3050)（创建于 07-14，更新于 08-04）

这两个 PR 同属“Dial 渠道支持”主题，来自同一作者，分别实现渠道适配器与配置向导接入，形成完整功能闭环。虽然目前无评论互动，但连续更新表明作者在持续跟进评审意见。从功能诉求看，接入 Dial 将赋予 NanoClaw 电话/短信交互能力——这与当前纯 IM/网页渠道形成明显差异化，可能吸引语音优先场景的开发者关注。**建议项目组尽快评估这两个 PR 并给出合入/修改结论，避免贡献者因长时间等待而流失。**

## Bug 与稳定性

今日活跃 Bug 修复 1 个，按严重程度排列：

- **高严重度（审批流程功能失效）**：**PR #3185 [OPEN]** — [fix(discord): strip '\n' delimiter in webhook interaction custom_id so approvals resolve correctly](https://github.com/nanocoai/nanoclaw/pull/3185)（2026-08-04 创建）
  - 问题：在 Discord 上，通过 webhook（raw HTTP-interaction）路径触发的 `ask_question`/审批卡片，无论用户点击哪个按钮，最终都会解析为错误选项；实际表现为**用户点击 Approve 时审批仍被拒绝**，审批系统完全不可用。
  - 根因：Chat SDK bridge 在解析 `custom_id` 时按 `:` 分割，但 Discord 实际发送的 `custom_id` 包含了 `\n` 字符，导致解析错位。
  - 状态：修复 PR 已提交。鉴于该 Bug 直接影响审批链路可用性，**建议优先评审并安排合入**，同时排查其他渠道（Slack、Teams）是否有类似的 custom_id 转义解析隐患。

## 功能请求与路线图信号

无新增 Issue 中的功能请求。结合当前待合并 PR，以下能力有可能进入下一版本：

- **Dial 语音/短信渠道**（PR #3041 + #3050）：若通过评审，NanoClaw 将新增首个非 IM 类交互渠道，配对渠道上线引导，覆盖电话与短信场景，预计伴随 v0.8 或 v0.9 版本发布。
- **技能宿主层增强**（PR #3186）：重构 skill 运行边界，引入“宿主接入点（host seams）”，可作为后续多运行时挂载的前置依赖。
- **定时任务运行时上下文**（PR #3154，已合入）：已进入主干，将在下一版本 release notes 中体现。

## 用户反馈摘要

今日无新增用户评论或 Issue 讨论，故无新的直接用户反馈。可从近期 PR 中提炼的间接信号：

- **Discord 用户场景**（来自 PR #3185）：有用户在 Discord 上依赖 `ask_question` 做审批流操作，触发路径为 webhook 卡片，且该路径下审批按钮全部失效（点击 Approve 实际执行 Reject）。此反馈表明 Discord 上的交互审批已是一个被真实使用的场景，回退机制完备性（如按钮确认提示、二次校验）也值得后续加强。
- **定时任务使用习惯**（来自 PR #3154）：用户需要定时任务在模板中引用“本次触发时刻”而非“进程启动时刻”，典型场景如“每日 9 点发送昨日战报”的日期边界判断。合入后建议补充相关 skill 文档示例。

## 待处理积压

- **PR #3041 与 PR #3050（Dial 渠道）**：已等待 **22 天**（自 07-14）仍未进入合并流程。作者于 08-04 仍在更新分支，维护者若长期不回应，存在贡献者弃坑风险。建议至少给出一轮正式 review 意见。

- **PR #3186（宿主层重构）**：已等待 1 天，尚无 reviewer 认领。重构类 PR 通常需要较长的上下文理解周期，建议尽早指定核心维护者跟进。

- **PR #3185（Discord 审批 Bug）**：当前最紧急的功能性修复 PR，已提交 1 天无 review 动态。考虑到 Bug 严重度（审批流程全部失效），建议列入本周 hotfix 计划。

**整体项目健康度评估**：合入节奏正常（1 个核心功能修复已合入），但评审队列存在 4 个待办 PR，其中部分已悬置 3 周以上。Bug 修复响应速度需提升，核心链路（审批）的严重问题当日提交后 24 小时未有 review 行为，反映出维护带宽可能偏紧。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

### NullClaw 项目动态日报 — 2026-08-05

#### 1. 今日速览
项目今日处于低活跃度状态，过去24小时内无新增或关闭的 Issue，合并/关闭的 PR 数量为零，暂无新版本发布。唯一值得关注的是有一个功能型 PR 仍在待合并状态，显示社区有持续的贡献意图，但维护侧响应节奏较慢。整体项目健康度稳定，但动态推进速度明显放缓，维护者需关注社区积压的反馈。

---

#### 2. 版本发布
今日无新版本发布。

---

#### 3. 项目进展
**待合并 PR（重要功能候选）**
- **#981 [OPEN] feat(provider): add grok-cli provider for xAI Grok CLI**
  - 作者: valonmulolli | 创建: 2026-07-29 | 更新: 2026-08-04
  - 链接: [PR #981](https://github.com/nullclaw/nullclaw/pull/981)
  - 摘要: 新增一个基于 CLI 的 provider，将请求委托给本地的 `grok` CLI（xAI Grok），遵循与现有 `codex-cli` / `gemini-cli` / `claude-cli` provider 相同的按请求生成模式。该 provider 为可选依赖，用户需自行安装并认证 `grok` CLI 方可使用。
  - 分析: 该 PR 已开放一周且昨日有更新，但目前尚未被合并。这延续了项目近期扩展多后端 CLI 适配器的战略方向，一旦合并，将补齐对 xAI Grok 生态的支持，使项目在模型接入层面更具通用性。当前项目进展取决于该 PR 的审查与合并速度。

---

#### 4. 社区热点
今日无高互动议题。唯一活跃的 PR #981 尚无评论互动（评论数：undefined），没有形成社区讨论热点。这表明近期外部贡献者虽在提交代码，但社区讨论氛围较为冷清，缺乏围绕功能取舍或使用场景的深度交流。

---

#### 5. Bug 与稳定性
今日无新报告或已关闭的 Bug 问题。

---

#### 6. 功能请求与路线图信号
- **新增 xAI Grok CLI 支持（信号明确）**: PR #981 是新功能请求的直接体现。该 PR 的存在表明社区对官方 CLI 工具（如 Codex、Gemini、Claude、Grok）的适配有持续需求。结合项目近期已合并多个同类 CLI provider 的历史，**该功能极有可能被纳入下一版本**，但前提是维护者能尽快完成代码审查，并确认其对现有架构（如 spawn-per-request 模式）的无侵入性。

---

#### 7. 用户反馈摘要
由于今日无 Issue 动态及评论，无法提炼新的用户痛点或满意度反馈。从 PR #981 的提交动机推断，贡献者的核心诉求是：希望通过统一的抽象接口直接调用本地已认证的 CLI 工具，避免额外的 API Key 管理与网络请求逻辑，实现“零成本”接入新模型。这类用户往往追求极简配置与隐私安全（本地鉴权）。

---

#### 8. 待处理积压
- **PR #981 待审查（期 7 天）**: 该 PR 功能完整且符合项目现有架构模式，是所有新增代码中最重要的待办项。长时间未合并会打击贡献者积极性，并推迟项目对 Grok 生态的支持时间点。
  - 链接: [PR #981](https://github.com/nullclaw/nullclaw/pull/981)

- **维护者操作建议**: 当前积压量极低（仅1条 PR），建议优先分配审查资源处理 PR #981，并针对该 PR 补充集成测试用例。若短期内无法合并，应在 PR 评论区给出明确的阶段性反馈，防止贡献者流失。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-08-05

---

## 今日速览

过去 24 小时项目保持高强度迭代节奏：37 条 Issue 保持活跃、13 条关闭，24 个 PR 待合并、26 个已合并/关闭。核心贡献者 BenKurrek 主导的 WS2–WS6 架构重构系列 PR 密集落地（#7170 已并入 main，多个 stacked PR 进入收尾），同时 v1.1.0-rc.1 的启动迁移无损性问题被正式提出并已有对应修复 PR（#7198）。社区反馈渠道（Champions 周会）持续产出产品层缺陷报告（记忆召回、Web 抓取、模型选择），反映从架构重构向稳定性与用户体验收敛的趋势。整体健康度良好，活跃度极高。

---

## 版本发布

### ironclaw-v1.1.0-rc.1（2026-08-03）

1.0.0 以来的首个候选发布版。核心特性：

- **扩展触达**：支持注册任意托管的 MCP 服务器；支持通过 IronHub 深链安装扩展
- **持久化文件附件**：可跨频道传递
- **Slack `/ironclaw` 斜杠命令**
- 全面的错误可读性改进

⚠️ 迁移注意：Issue #7178 指出 1.0.0-rc.1 → 1.1.0-rc.1 的启动迁移**尚非无损**，涉及线程/消息重索引、频道根迁移、幂等记录、OAuth 别名、扩展安装记录等。修复 PR #7198 已提交，升级前建议关注其合入状态。

---

## 项目进展

今日多项重量级 PR 合并/关闭，集中于 WS 系列架构重构（目标 crate 架构史诗 #3773 的执行）：

- **#7170（已合并 main）**：WS Waves 0–4 批次主分支，后续多个 stacked PR 的基座
- **#7175（已关闭）**：WS3 收官——**异常注册表清空**（1 → 0），`LAYER_MATRIX_EXCEPTIONS` 为空列表，达成 PROPOSAL §11.2.2 目标
- **#7187 / #7186 / #7179**：WS6 多项——RebornRuntime 瘦身、typed ExtensionId、组合层 service/policy 簇驱逐、MCP/auth/WebUI 模块章程落地
- **#7174（已关闭）**：WS5 adapter_registry 解析迁移，为 `extension_host → loops` 重构铺路
- **#7172（已关闭）**：WS4/WS6 三条 ruled decision 执行——triggers/hooks SQL ADR + identity binding-store 收敛
- **#7181（已关闭）**：Waves 0–4 第二批合并，三个组件零冲突并入
- **#6970（已关闭）**：面向用户的文档全面升级，移除 "Reborn" 术语，与代码库同步

架构层面：异常注册表清零是 WS 系列的关键里程碑，组合层 mass gate 问题（#7151）仍待解。另有依赖组批量升级 PR #7140（8 个 crate）待审。

---

## 社区热点

- **#6284 EPIC: error-recoverability endgame（15 评论，已关闭）** — [链接](https://github.com/nearai/ironclaw/issues/6284)
  要求每个运行中错误满足五条可恢复性契约（运行存活/模型可见/原因与成功路径可见/模型可行动/不误报）。已关闭说明该项达成交付标准。

- **#7119 Code Style clippy 包集相关失败（4 评论，已关闭）** — [链接](https://github.com/nearai/ironclaw/issues/7119)
  main 分支 `{ironclaw, ironclaw_reborn_config}` 包集 clippy 失败，纯本地可复现。已快速关闭，未见遗留。

- **#6524 Epic: Hermetic capability and journey testing platform（4 评论，已关闭）** — [链接](https://github.com/nearai/ironclaw/issues/6524)
  诉求：机械化回答"每项能力和关键用户旅程是否具有确定性、有意义的覆盖"。已关闭，表明能力测试平台达成阶段性目标。

- **#7144 trace 贡献管线预存缺陷（29 线程，2 评论）** — [链接](https://github.com/nearai/ironclaw/issues/7144)
  CodeRabbit 对 #7139（17,470 行 `contribution.rs` 拆分为 `contribution/**`）审查产生 29 条针对**被移动而非新增**代码的缺陷。这些缺陷真实存在，合并拆分导致代码首次被完整审查而浮出水面。

- **#7147 两个 shrink-only 架构棘轮在 main 上携带未跟踪松弛（2 评论）** — [链接](https://github.com/nearai/ironclaw/issues/7147)
  三个开放 PR 持有同一基线的三种不同值，文档-真值审计暴露流程缺口。

---

## Bug 与稳定性

| 严重度 | Issue | 描述 | 状态 |
|---|---|---|---|
| 高 | [#7168](https://github.com/nearai/ironclaw/issues/7168) | **Agent 安装的技能不可见**：`skill_install` 返回成功但发现路径读不到，Settings → Skills 和模型列表均不出现，无法激活 | 已关闭 |
| 高 | [#7178](https://github.com/nearai/ironclaw/issues/7178) | **1.0→1.1 启动迁移非无损**，涉及线程/消息/频道根等 | 修复 PR [#7198](https://github.com/nearai/ironclaw/pull/7198) 已提交 |
| 中 | [#6752](https://github.com/nearai/ironclaw/issues/6752) | 实例删除失败，"Loading your agents..." 卡死（v1 发布检查清单） | 开放 |
| 中 | [#7192](https://github.com/nearai/ironclaw/issues/7192) | WebUI 乐观用户消息渲染在 agent 输出下方，会话顺序混乱 | 开放 |
| 中 | [#7104](https://github.com/nearai/ironclaw/issues/7104) | Extractors 将"未找到文本"报告为 Failed 而非 Empty，模型被告知错误信息 | 开放（待独立 PR） |
| 低 | [#7103](https://github.com/nearai/ironclaw/issues/7103) | 延迟追踪关闭时仍计算 latency-trace 字段（每工具调用 JSON 字节数） | 开放（待独立 PR） |
| 低 | [#7148](https://github.com/nearai/ironclaw/issues/7148) | `conversations → turns` 异常无归属 CHECKLIST 行，Wave 3 里程碑计划不可达 | 已关闭 |
| 低 | [#7151](https://github.com/nearai/ironclaw/issues/7151) | 组合层 mass gate 基于份额计算，功能流入污染分母，god crate 重新膨胀但 gate 仍绿 | 开放 |

---

## 功能请求与路线图信号

- **#7193（size: L）**：自动化增加 run-now 手动触发 — 覆盖 trigger 域、产品面、能力和 WebUI。当前自动化面仅 list/pause/resume/rename/delete。列入 v1.1 候选信号明确。
- **#7194（size: M）**：允许管理员授权的共享频道作为 outbound 投递目标 — host 投递层是路由最终回复的唯一认可路径，当前模型无法将频道设为投递目标。
- **#7191（size: M）**：`builtin.time` 增加相对偏移运算（如"24 hours ago"），并替换 `input_error()` 为类型化输入错误。来自真实生产线程（`5a2e3160`）。
- **#7183**：每用户 LLM 模型选择（当前仅管理员可配置）— Champions 周会反馈。
- **#7177（size: M, suggested_P2）**：deferred 工具检索升级为 schema-aware 排序搜索。来自 Reborn 渐进式工具披露的已知缺陷，重要词汇常只存在于 canonical capability schema 中。
- **#7105**：评估为云 API 提取独立身份/会话与支付服务 — 支付/账户信用问题持续浮现。

---

## 用户反馈摘要

- **记忆不可靠（#7185，Champions 周会）**：多位测试者独立观察到跨会话上下文无法可靠召回。Devon（法务）反馈 agent 无法访问先前会话信息。属核心体验缺陷，与 #6565（技能发现）问题域部分重叠。
- **Web 抓取时好时坏（#7180，Champions 周会）**：Michael Kelly（builder ops）反馈部分来源成功、部分失败，用户侧无规律可循；agent 倾向使用 http 工具而非 web_search。
- **模型选择权（#7183，Champions 周会）**：Jeremy Koch（营销）提出个人用户无法选择底层 LLM，仅管理员可设。
- **外部建议（#7199）**：FaceSeek 开发者建议区分记录"候选技能存在但未被选择"与"被选择且改变了最终答案"，否则检索评估会产生误导 — 与 #6941/#6565 评估维度直接相关。
- **支付/账户信用问题（#7105）**：用户持续报告支付相关问题，提议将身份/会话与支付从云 API 拆分为独立服务。

---

## 待处理积压

- **#3773 Epic: Target Crate Architecture（创建于 2026-05-19，v1.2.0）** — [链接](https://github.com/nearai/ironclaw/issues/3773)
  目标架构落地的总 Epic，WS2–WS6 均属其执行。当前无评论，但今日 PR 密集合入表明进展良好。

- **#6565 Epic: Reliable Skill Discovery, Routing, and Activation（v1.1.0）** — [链接](https://github.com/nearai/ironclaw/issues/6565)
  21 条验收标准，部分被 #6941 拆分独立推进（#6941 同样开放中）。技能发现/路由/激活是用户反馈高频区（#7168、#7185），建议优先排序。

- **#6731 Epic: Integrate IronHub into IronClaw（v1.1.0）** — [链接](https://github.com/nearai/ironclaw/issues/6731)
  v1.1.0-rc.1 已支持 IronHub 深链安装，但 Epic 本身仅 1 评论，后续工作项需明确。

- **#6752 实例删除失败（v1-launch-checklist）** — [链接](https://github.com/nearai/ironclaw/issues/6752)
  创建于 2026-07-28，今日仍有更新但无 fix PR。属发布阻断级，需跟进。

- **#7147 基线值漂移** — [链接](https://github.com/nearai/ironclaw/issues/7147)
  三个开放 PR 持有同一基线的三种不同值。流程问题，若不修复将持续产生合并冲突与审计噪音。

- **PR #5598 release（创建于 2026-07-03，已开放 33 天）** — [链接](https://github.com/nearai/ironclaw/pull/5598)
  `ironclaw_common` 0.4.2→0.5.0（API breaking）、`ironclaw_skills` 0.3.0→0.4.0（API breaking）。长期未合并的 release PR，阻塞下游依赖方升级。

- **PR #5101 ci: reuse cargo-component installer（创建于 2026-06-20，已开放 46 天）** — [链接](https://github.com/nearai/ironclaw/pull/5101)
  新人贡献者，CI 基础设施改进，长期无动态。建议维护者回应或合入。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

### LobsterAI 项目动态日报 — 2026-08-05

---

#### 1. 今日速览

项目过去 24 小时活跃度中等偏上：共处理 15 条 PR（其中 12 条已关闭/合并），并有 1 条新的 Bug Issue 进入待处理队列。今日无新版本发布，合并的 PR 集中于渲染层（renderer）体验优化（积分活动、登录页）以及核心协作模块的错误分类修复。值得注意的是，大量 `dependabot` 维护型 PR 在今日集中被关闭（多为超时未合并状态），一定程度上拉高了 PR 总数，但核心代码提交量相对有限。目前有 3 个待合并 PR 值得关注，其中包含一个社区提交的"永久隐藏侧边栏广告"功能。

---

#### 2. 版本发布

今日无新版本 Release。

---

#### 3. 项目进展

今日合并/关闭的 PR 中，核心进展集中在三个方面：

- **积分奖励活动（Startup Credit Campaign）体验打磨**（[PR #2433](https://github.com/netease-youdao/LobsterAI/pull/2433)、[PR #2432](https://github.com/netease-youdao/LobsterAI/pull/2432)、[PR #2428](https://github.com/netease-youdao/LobsterAI/pull/2428)、[PR #2427](https://github.com/netease-youdao/LobsterAI/pull/2427)）：修复了启动积分活动的海报裁切、失败提示本地化、重复领取重试逻辑，并禁用了世界杯决赛奖励的自动弹窗，改为用户手动领取。同时将活动美术资源本地打包，减少对服务器的依赖。
- **登录页与首次体验优化**（[PR #2429](https://github.com/netease-youdao/LobsterAI/pull/2429)）：合入了登录页面的排版与交互优化。
- **核心错误分类修复（cowork）**（[PR #2426](https://github.com/netease-youdao/LobsterAI/pull/2426)）：这是一个具有实际意义的改进——将模型"过载/容量不足"错误与通用的"速率限制"错误分离。此前模型过载会被误报为限流，导致用户反复重试，现在可以精确区分并展示原始错误信息。

此外，发布了 2026.8.3 版本的 release 合入主干 PR（[#2430](https://github.com/netease-youdao/LobsterAI/pull/2430)），涉及原生积分奖励活动、首次登录体验、Artifact 自动预览控制等多项功能。

项目整体处于稳健迭代状态，当前重点在活动运营功能与桌面端体验细节。

---

#### 4. 社区热点

今日最值得关注的是 **Issue #1200**（[链接](https://github.com/netease-youdao/LobsterAI/issues/1200)）及其**关联修复 PR #1201**（[链接](https://github.com/netease-youdao/LobsterAI/pull/1201)）：

- **Issue #1200**：报告了 `nimGateway.ts` 中 `teamTypeNum` 硬编码错误，导致在云信**超大群（superTeam）**中 @机器人时无法正确显示群名。该 Bug 自 2026-04-01 创建至今已 4 个月，期间被打上 `[stale]` 标签，但终于在今日（2026-08-05）获得了社区的响应和评论。
- **PR #1201**：由同一作者（MaoQianTu）提交，修复方案为**一行修改**，将 `teamTypeNum` 的参数顺序与文件头部注释及 SDK 枚举定义对齐。目前该 PR 处于 Open 状态，等待维护者 review。

该 Issue 的讨论热度反映了用户对**群聊场景下 @ 功能可靠性**的敏感度，也暴露了项目在**维护者响应周期**上可能较长的问题（4 个月才获得有效回应）。

---

#### 5. Bug 与稳定性

今日仅有 1 个活跃 Bug 报告，严重程度中等：

| 严重程度 | Issue | 描述 | 修复状态 |
|---------|-------|------|---------|
| **中** | [#1200](https://github.com/netease-youdao/LobsterAI/issues/1200) | `nimGateway.ts` 中 `teamTypeNum` 硬编码错误，导致超大群/普通群 @ 机器人时**群名显示异常**（fallback 为原始 ID） | 已有修复 PR [#1201](https://github.com/netease-youdao/LobsterAI/pull/1201)（一行改动），等待合并中 |

该 Bug 影响范围限定于 NIM 群聊场景下的消息展示，不涉及数据丢失或崩溃。

---

#### 6. 功能请求与路线图信号

- **永久隐藏侧边栏广告**（[PR #2374](https://github.com/netease-youdao/LobsterAI/pull/2374)，Open 状态）：社区用户 `bunnysayzz` 实现了 "设置 → 通用" 中新增开关，可**永久隐藏侧边栏广告横幅**，解决了此前只能临时关闭单条广告的痛点。该 PR 自 7 月 21 日创建，目前仍待合并，建议维护者评估纳入下一版本。
- **electron 依赖批量升级**（[PR #1277](https://github.com/netease-youdao/LobsterAI/pull/1277)，Open 状态）：`dependabot` 发起的 electron 40.2.1 -> 43.2.0 与 electron-builder 升级（2 个更新），已搁置 4 个月。考虑到跨大版本升级可能带来 API 变更，建议安排专门排期处理。

---

#### 7. 用户反馈摘要

从今日动态看，用户反馈集中在以下诉求：

- **群名获取可靠性**（Issue #1200）：用户 `MaoQianTu` 在超大群中 @ 机器人时，因 `teamTypeNum` 传参错误导致群名无法正确解析。用户主动提供了文件行号、SDK 枚举映射注释以及一行修复方案，属于**高质量社区反馈**。
- **广告位控制**（PR #2374）：用户希望拥有对侧边栏广告的**永久关闭权**而非每次手动关闭，反映出对非侵入式体验的期待。

目前未有用户表达对项目整体方向的不满，反馈集中于具体的功能性 Bug 和体验优化。

---

#### 8. 待处理积压

以下 Issue/PR 长时间未获响应，建议维护者关注：

| 类型 | 编号 | 内容 | 等待时长 | 链接 |
|------|------|------|---------|------|
| Issue（含修复 PR） | #1200 / #1201 | NIM 群名获取错误（已 stale，但今日有活跃评论） | ~4 个月 | [#1200](https://github.com/netease-youdao/LobsterAI/issues/1200)、[#1201](https://github.com/netease-youdao/LobsterAI/pull/1201) |
| PR（功能） | #2374 | 永久隐藏侧边栏广告（社区实现） | ~2 周 | [#2374](https://github.com/netease-youdao/LobsterAI/pull/2374) |
| PR（依赖） | #1277 | electron 40 -> 43 大版本升级 | ~4 个月 | [#1277](https://github.com/netease-youdao/LobsterAI/pull/1277) |

**维护建议**：Issue #1200 的修复 PR #1201 为一行改动，风险极低且影响社区体验明确，建议优先合并并关闭对应 Issue。同时，长期存在的 `[stale]` 相关 PR（如 #1279、#1280、#1281）虽已关闭，但建议后续对依赖升级类 PR 设置更短的自动化关闭周期，以降低维护噪音。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 — 2026-08-05

## 今日速览

Moltis 项目过去 24 小时整体活跃度偏低，无 Issue 更新，仅产生 1 条依赖升级 PR。该项目由 Dependabot 自动提交的 PR 占全部活动，未见人工发起的新 Issue 或新 PR，表明社区参与度处于低位。唯一 PR 为网站模块的 npm 依赖 `undici` 例行版本升级，提示维护者关注依赖供应链健康度。项目整体处于稳定但低频迭代的维护模式。

---

## 版本发布

过去 24 小时无新版本发布。

---

## 项目进展

过去 24 小时无 PR 被合并或关闭，项目核心代码无变更。唯一活跃 PR 为依赖升级，尚未进入合并阶段，因此功能层面今日无实质推进。

| PR | 状态 | 说明 |
|---|---|---|
| [#1184](https://github.com/moltis-org/moltis/pull/1184) | 待合并 | 网站目录 npm 依赖 undici 7.28.0 → 7.29.0，安全/维护性例行升级 |

---

## 社区热点

今日无 Issue 讨论，社区热点缺失。唯一 PR [#1184](https://github.com/moltis-org/moltis/pull/1184) 由 Dependabot 自动创建，无人工评论或互动，不构成实质性社区讨论。建议关注昨日（8月4日）之前的活跃 Issue 与 PR，以评估社区参与趋势。

---

## Bug 与稳定性

过去 24 小时未报告新的 Bug、崩溃或回归问题。项目稳定性状态良好，无已知的未修复缺陷涌现。

---

## 功能请求与路线图信号

过去 24 小时无新功能请求提交，亦无非 Dependabot 人工 PR 指向新功能开发。唯一 PR 为依赖维护类，不携带功能信号，无法据此判断下一版本功能方向。

---

## 用户反馈摘要

过去 24 小时无 Issue 评论或人工反馈可供提炼。唯一 PR 为机器人提交，无用户声音。建议结合近期用户 Issue 历史数据进行长周期反馈分析，以捕捉真实使用痛点。

---

## 待处理积压

### 待合并 PR

- **[#1184](https://github.com/moltis-org/moltis/pull/1184)** — `chore(deps-dev): bump undici from 7.28.0 to 7.29.0 in /website`（dependabot[bot] | 创建于 2026-08-04 | 待合并）
  - 该依赖升级 PR 已滞留 1 天，涉及网站模块开发依赖的版本更新。建议维护者审阅并合并，以保持依赖供应链及时更新、避免累积升级冲突。

> 注：今日数据样本量极小（1 条 PR、0 条 Issue），以上分析受限于 24 小时窗口内的低活跃度。建议结合近 7 日与 30 日趋势数据，获取更可靠的项目健康度结论。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

### 1. 今日速览

CoPaw 项目在过去 24 小时内保持了较高的社区活跃度，Issue 与 PR 的更新总量达 69 条。Issue 方面，新开/活跃与关闭数量接近（16 开/12 关），表明问题反馈与解决处于动态平衡；PR 方面，待合并数量（22）高于已合并/关闭数量（19），存在一定的合并积压。值得关注的是，社区围绕“审批提示在非 Web UI 通道不可达”以及“工具输出过大导致会话卡死”等稳定性问题展开了集中讨论，同时多个针对 Beta 版本（v2.1.0-beta.1）的 Bug 报告涌现，表明新版本引入了部分回归问题，但修复 PR 的跟进也较为迅速。整体来看，项目处于功能迭代活跃期，但稳定性维护的需求同样迫切。

### 2. 版本发布

过去 24 小时内无新版本发布。当前最新版本为 v2.1.0-beta.1（Beta），社区已就该版本报告了 3 个新问题（见下文 Bug 部分），建议关注后续补丁版本。

### 3. 项目进展

今日有 19 个 PR 被合并或关闭，主要进展集中在以下几个方向：

- **安全性与配置管理**：
    - **PR #6657**（已合并）: 修复了 `SandboxConfig` 中后端无法强制执行某些约束（如 `deny_paths`、`network_allow`）但保持静默的问题，现在会主动上报无法执行的约束，避免操作者误以为配置已生效。链接: [agentscope-ai/QwenPaw PR #6657](https://github.com/agentscope-ai/QwenPaw/pull/6657)
    - **PR #6676**（已合并）: 修复了 OneBot 通道反向 WebSocket 服务器默认绑定 `0.0.0.0` 且未启用认证的安全漏洞，现在默认仅监听回环地址（`127.0.0.1`），暴露到外网时强制要求 Token。链接: [agentscope-ai/QwenPaw PR #6676](https://github.com/agentscope-ai/QwenPaw/pull/6676)
    - **PR #6692**（已合并）: 修复了日志中记录原始对话命令参数可能导致敏感信息泄露的问题，现在仅记录命令名称。链接: [agentscope-ai/QwenPaw PR #6692](https://github.com/agentscope-ai/QwenPaw/pull/6692)

- **稳定性与可靠性修复**：
    - **PR #6691**（已合并）: 修复了 `cron pause/resume` 状态不持久化的问题，现在会将 `enabled` 状态写入任务存储，重启后依然有效。链接: [agentscope-ai/QwenPaw PR #6691](https://github.com/agentscope-ai/QwenPaw/pull/6691)
    - **PR #6628**（已合并）: 修复了上下文自动压缩（Scroll）注入的占位符消息角色错误，避免 DeepSeek 等 OpenAI 兼容 API 返回 HTTP 400 错误。链接: [agentscope-ai/QwenPaw PR #6628](https://github.com/agentscope-ai/QwenPaw/pull/6628)
    - **PR #6678**（已合并）: 修复了 CI 集成测试环境未安装 Playwright Chromium 导致 nightly 测试失败的问题。链接: [agentscope-ai/QwenPaw PR #6678](https://github.com/agentscope-ai/QwenPaw/pull/6678)

- **功能增强与重构**：
    - **PR #6504**（待合并）: 统一了常规会话与编码代理会话的项目目录解析和文件工作区逻辑，使项目目录成为 Agent 运行时上下文的一部分，并加强了文件工作区的安全控制。链接: [agentscope-ai/QwenPaw PR #6504](https://github.com/agentscope-ai/QwenPaw/pull/6504)
    - **PR #6704**（待合并）: 新增会话分叉（Fork）功能，允许用户右键点击会话将其上下文快照复制到一个新的独立会话中，便于实验性探索。链接: [agentscope-ai/QwenPaw PR #6704](https://github.com/agentscope-ai/QwenPaw/pull/6704)

### 4. 社区热点

今日讨论最热烈的议题集中在 **审批流程的多通道适配** 与 **大型工具输出的处理** 上。

- **Issue #6655（已关闭）与 Issue #6695（已关闭）**：这两个 Issue 分别报告了在 `console` 通道和 `WeChat` 通道下，安全审批提示无法渲染或不可达的问题，导致 `rm` 等高风险命令被静默拦截或 5 分钟后自动拒绝。两个 Issue 分别获得 12 和 2 条评论，反映了多通道场景下用户对控制权的迫切需求。链接: [Issue #6655](https://github.com/agentscope-ai/QwenPaw/issues/6655), [Issue #6695](https://github.com/agentscope-ai/QwenPaw/issues/6695)
- **Issue #6700（已关闭）**：该 Bug 报告指出工具产出数 MB 或数百 MB 的输出会导致历史会话加载卡死，引发用户对输出截断和分页加载的讨论。链接: [Issue #6700](https://github.com/agentscope-ai/QwenPaw/issues/6700)

在 PR 方面，**PR #6669** 和 **PR #6671** 分别针对 Windows 桌面端 Chrome 扩展与 macOS 构建产物进行了修复，虽评论不多，但均为发布阻塞类问题。链接: [PR #6669](https://github.com/agentscope-ai/QwenPaw/pull/6669), [PR #6671](https://github.com/agentscope-ai/QwenPaw/pull/6671)

**用户的诉求分析**：高频出现的诉求之一是“工具的产出物管理”（如 Issue #6643、#6642），用户希望避免文件在 `media` 目录下堆积，并能够直接读取本地路径。另一个重要信号是“多模型并行处理”（Issue #6455），用户希望同一 Agent 能调用多个模型独立运行并汇总结果。

### 5. Bug 与稳定性

今日报告了 6 个新 Bug，按严重程度排列如下：

| 严重程度 | Issue / PR | 描述 | 状态 |
| :--- | :--- | :--- | :--- |
| **高** | [Issue #6696](https://github.com/agentscope-ai/QwenPaw/issues/6696) | 微信 iLink 渠道中，一次性 `context_token` 被“正在输入”指示器消费，导致回复被拒绝（ret=-2），且“working”状态卡死。 | 待处理 |
| **高** | [Issue #6697](https://github.com/agentscope-ai/QwenPaw/issues/6697) | v2.1.0-beta.1 桌面版向子进程注入 `PYTHONHOME` 环境变量，导致所有 Python 子进程启动崩溃（encodings ModuleNotFoundError）。 | 待处理 |
| **高** | [Issue #6698](https://github.com/agentscope-ai/QwenPaw/issues/6698) | v2.1.0-beta.1 浏览器工具 SDK 中 `open()` 操作必现失败，报 `WireProtocolError: Target crashed`。 | 待处理 |
| **中** | [Issue #6700](https://github.com/agentscope-ai/QwenPaw/issues/6700) | 超大工具输出导致历史会话加载卡死，并可能触发模型上下文窗口超限。 | 已关闭 |
| **中** | [Issue #6687](https://github.com/agentscope-ai/QwenPaw/issues/6687) | OpenRouter 多模态探测会覆盖已文档化的能力标记，将图片/视频支持错误地报告为 `false`。 | 待处理 |
| **中** | [Issue #6683](https://github.com/agentscope-ai/QwenPaw/issues/6683) | 从 App Center 安装官方插件 `qwenpaw-creator` 失败，原因为插件顶层模块命名冲突（`utils` 不是包）。 | 已有修复 PR：[PR #6688](https://github.com/agentscope-ai/QwenPaw/pull/6688) |

### 6. 功能请求与路线图信号

今日新增了 5 个功能请求，结合已有 PR 情况，以下功能可能被纳入下一版本：

- **多模型并行执行（Issue #6455）**：用户希望一个 Agent 能同时使用多个模型运行任务并汇总结果。该需求涉及核心编排逻辑，若被采纳将是一个较大的架构改动，短期内可能难以落地。
- **会话分叉（PR #6704）**：该功能 PR 已提交，旨在将现有会话上下文快照到一个新会话。功能实现相对独立，很可能在下一个 Minor 版本（如 v2.2.0）中合并。
- **按需加载技能（Issue #6699）**：用户提出目前所有启用的技能都会注入系统提示词，27+ 个技能会消耗 8000-10000 tokens。建议改为按需加载，以降低开销。该功能对成本敏感用户极具价值，但改动涉及 Agent 上下文构建核心，需要更谨慎的设计。
- **频道启动重试（Issue #6684 + PR #6689）**：针对 Matrix 等频道启动失败无重试机制的问题，已有配套 PR 实现可选的启动重试回退协议，预计会被顺利合并。
- **全局规则文件（Issue #6694）**：用户建议新增类似 `.agent` / `.claude` 的全局系统提示词文件，以确保部分指令优先级。这是一个轻量级但高价值的易用性改进。

### 7. 用户反馈摘要

- **矩阵频道连接不稳定（Issue #6684）**：用户反馈自建 Matrix 服务器连接经常因启动竞争导致失败，且无重试或健康检查，需要手动重新保存才能恢复，影响使用体验。
- **对话框文件处理流程繁琐（Issue #6642）**：用户质疑拖入文件时先复制上传再读取的必要性，希望可以直接读取原始路径，以减少 `media` 目录下的文件堆积。
- **自动压缩与记忆流程脱节（Issue #6624）**：用户报告当上下文被 Scroll 自动压缩时不会触发记忆总结流程，而手动 `/compact` 可以。用户不确定这是设计如此还是缺陷，但期望两者行为一致。
- **免费模型限流导致任务中断（Issue #6674）**：用户反馈在使用免费版 `deepseek-v4-flash` 模型时，频繁遭遇 429 限流，导致任务中断，希望项目能改善对限流的处理机制。

### 8. 待处理积压

以下 Issue 或 PR 在较长时间内未有实质进展，建议维护者关注：

- **Issue #6490**（创建于 07-27）: 建议新增火山引擎 Agent Plan 和小米 MiMo 标准 API 作为内置 Provider。该请求已提交 8 天，评论 3 条，仍处于开放状态，但尚未看到相关 PR。链接: [Issue #6490](https://github.com/agentscope-ai/QwenPaw/issues/6490)
- **PR #4267**（创建于 05-13）: macOS 文件路径白名单安全功能，已标记为“Under Review”，但接近 3 个月未合并。今日有更新（08-05），说明仍在推进，但需注意时间跨度。链接: [PR #4267](https://github.com/agentscope-ai/QwenPaw/pull/4267)
- **PR #6331**（创建于 07-22）: 仅为控制台指定 Node.js 版本要求的简单改动，现已开放超过两周，积压时间过长，建议尽快处理。链接: [PR #6331](https://github.com/agentscope-ai/QwenPaw/pull/6331)
- **Issue #6455**（创建于 07-24）: 多模型并行需求讨论度较高（评论 3），涉及设计复杂，建议官方予以明确回应（如列入路线图或给出临时方案）。链接: [Issue #6455](https://github.com/agentscope-ai/QwenPaw/issues/6455)

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