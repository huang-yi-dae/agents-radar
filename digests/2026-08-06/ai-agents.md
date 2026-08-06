# OpenClaw 生态日报 2026-08-06

> Issues: 500 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-08-06 02:13 UTC

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

## OpenClaw 项目动态日报 — 2026-08-06

### 1. 今日速览

过去 24 小时项目保持高活跃度，共产生 500 条 Issue 更新与 500 条 PR 更新，Issue 关闭率约 13.6%，PR 合并/关闭率约 12.4%。问题积压集中于 **会话状态管理（session-state）**、**消息丢失（message-loss）** 与 **认证提供方（auth-provider）** 三大领域，多与 Codex 嵌入运行器、Telegram/Discord 渠道投递及模型提供商限流恢复相关。值得注意的是，多个 P0/P1 级问题已有关联 fix PR 进入等待审查或证明阶段，但仍有相当数量的 P1 问题被标记为 `needs-maintainer-review` 与 `needs-product-decision`，维护者响应带宽可能成为瓶颈。今日无新版本发布。

---

### 3. 项目进展

今日合并/关闭的 PR 数量为 62，其中值得关注的有：

- **perf(agents): index subagent recovery ownership** (#119793，已关闭) — 通过为子代理恢复所有权检查建立索引，消除了重启恢复时对注册表的重复全量扫描，将二次方复杂度降为线性。由维护者 vincentkoc 提交并当日合并，属于纯性能优化，无破坏性变更。 [PR #119793](https://github.com/openclaw/openclaw/pull/119793)

- **feat(diagnostics): chain gateway traces into runs** (#92161，已关闭) — 复用现有 DiagnosticTraceContext 将网关诊断追踪串联至嵌入式 agent 运行，避免引入第二套运行/请求作用域，并新增信任边界感知的网关追踪辅助函数。该 PR 自 6 月 11 日发起，历经近两个月后于今日关闭，尚需确认合并或放弃原因。 [PR #92161](https://github.com/openclaw/openclaw/pull/92161)

- **feat: AI safety/quality event taxonomy (#82548)** (#107744，已关闭) — 为提示注入检测、工具策略评估、外部内容消费、记忆上下文选择、压缩保护评估与会话启动六个关键边界建立结构化可观测性事件分类。涉及 docs、gateway、CLI、agents 及多个 channel/app 扩展，覆盖面广。 [PR #107744](https://github.com/openclaw/openclaw/pull/107744)

- **Issue #119534 已关闭** — 内置技能以技能相对路径引用自身支持文件导致 `read` 工具无法打开的问题已解决，涉及 release-openclaw-maintainer 与 CI 流水线。 [Issue #119534](https://github.com/openclaw/openclaw/issues/119534)

- **Issue #92369 已关闭（标记 already-fixed）** — cron 隔离会话中的子代理编排问题已在主线修复，但 issue 本身未关联具体 fix PR，建议核实修复来源与回归覆盖。 [Issue #92369](https://github.com/openclaw/openclaw/issues/92369)

整体而言，项目今日在性能优化（子代理恢复索引）、可观测性（诊断追踪链、安全事件分类）两个方向取得了实质性推进。

---

### 4. 社区热点

| 排名 | 编号 | 标题 | 评论数 | 状态 | 链接 |
|---|---|---|---|---|---|
| 1 | #116201 | Realtime voice work can retain unbounded provider and consult state | 59 | OPEN, P1 | [Issue #116201](https://github.com/openclaw/openclaw/issues/116201) |
| 2 | #7707 | Memory Trust Tagging by Source | 27 | OPEN, P2 | [Issue #7707](https://github.com/openclaw/openclaw/issues/7707) |
| 3 | #44925 | Subagent completion silently lost — no retry, no notification, no auto-restart on timeout | 25 | OPEN, P1 | [Issue #44925](https://github.com/openclaw/openclaw/issues/44925) |
| 4 | #118846 | Gateway main thread saturated from boot by plugin-metadata snapshot + fs statting | 19 | CLOSED | [Issue #118846](https://github.com/openclaw/openclaw/issues/118846) |
| 5 | #86519 | Agent repeats identical replies 2-10x on Telegram after 5.20 update | 13 | OPEN, P1 | [Issue #86519](https://github.com/openclaw/openclaw/issues/86519) |
| 6 | #51429 | 工作路径被硬编码进代码且已合并发布 | 12 | OPEN, P2 | [Issue #51429](https://github.com/openclaw/openclaw/issues/51429) |
| 7 | #106779 | Issue with 2026.7.1（本地 llama.cpp provider 400 报错） | 12 | CLOSED | [Issue #106779](https://github.com/openclaw/openclaw/issues/106779) |
| 8 | #113306 | SQLite snapshot restore lacks end-to-end crash and identity guarantees | 12 | OPEN, P1 | [Issue #113306](https://github.com/openclaw/openclaw/issues/113306) |

**热点诉求分析：**

- **实时语音会话资源无界增长**（#116201，59 评论）成为绝对焦点。核心问题是会话以条目计数/取消信号而非硬性所有权边界来限制资源，在慢速或突发性 provider/client 行为下会保留已废弃的 consult 工作、大体积 provider 帧及预生成音频。该问题被标记为 `🐚 platinum hermit`（最高等级评分），且处于 `needs-product-decision` 状态，说明修复方向需要产品决策而不仅是技术实现。

- **记忆投毒防护**（#7707，27 评论）讨论热度居次。用户要求基于来源（用户命令、网页抓取、第三方技能）为记忆条目打上信任标签，防止恶意指令藏匿于不可信内容中影响后续 agent 行为。该请求 2 月提出，半年后仍无结论，已累积 `needs-security-review` 标签。社区将记忆安全视为影响 agent 可信度的基础能力。

- **子代理结果静默丢失**（#44925，25 评论，👍 2）反映多代理编排在实际使用中的可靠性缺口：完成通知失败、超时无重试、无自动重启，用户感知为"任务消失"。该问题 3 月提出，至今仍处于 `needs-product-decision`。

---

### 5. Bug 与稳定性

#### P0 / 发布阻断级

- **Agent DB v14→v15 迁移失败，网关拒绝启动**（#119263，OPEN）— 迁移在 canonical index repair 阶段报 `no such column: entry_valid`，事务回滚后网关无法启动。已有关联 PR 打开（`linked-pr-open`），但处于 `source-repro` 阶段。影响所有从 2026.7.1 升级至 2026.7.2 的用户。 [Issue #119263](https://github.com/openclaw/openclaw/issues/119263)

- **托管媒体清理失败开放（fail-open），永久删除会话生成媒体**（#119090，已关闭）— 当会话存储不可读（权限/IO/数据库损坏）时，附件索引解析为 null，所有媒体被判定为未引用并一次性清除，造成数据永久丢失。该问题已被关闭，但关闭原因未在摘要中标明（非 `already-fixed`），建议核实修复状态。 [Issue #119090](https://github.com/openclaw/openclaw/issues/119090)

- **持久化 provider 冷却在计费恢复后仍阻止用户数小时**（#70903，OPEN，P0）— Anthropic 等 provider 返回 402 后写入的 `disabledUntil` 时间戳在网关重启后仍持久生效，且重复失败会不断延长窗口，用户在充值后仍被拒之门外。已有 `stale` 标记，需维护者关注。 [Issue #70903](https://github.com/openclaw/openclaw/issues/70903)

#### P1 级

| 编号 | 问题摘要 | 状态 | 关联 PR |
|---|---|---|---|
| [##116201](https://github.com/openclaw/openclaw/issues/116201) | Realtime voice 会话无界保留 provider/consult 状态 | OPEN, needs-product-decision | 无 |
| [#44925](https://github.com/openclaw/openclaw/issues/44925) | 子代理完成结果静默丢失，无重试/通知/自动重启 | OPEN, needs-product-decision | 无 |
| [#86519](https://github.com/openclaw/openclaw/issues/86519) | Telegram 重复回复 2-10 次（5.20 起回归） | OPEN, needs-live-repro | 无 |
| [#113306](https://github.com/openclaw/openclaw/issues/113306) | SQLite 快照恢复缺少崩溃与身份端到端保证 | OPEN, needs-info | 无 |
| [#116022](https://github.com/openclaw/openclaw/issues/116022) | beta.5 `/new` 无法恢复已退休的 Codex binding 墓碑 | OPEN | [PR #118506](https://github.com/openclaw/openclaw/pull/118506)（OPEN, needs proof) |
| [#96692](https://github.com/openclaw/openclaw/issues/96692) | Slack 线程回复生成但投递失败（origin tuple 丢失） | OPEN | [PR #119737](https://github.com/openclaw/openclaw/pull/119737)（clawsweeper 自动生成, waiting on author) |
| [#85251](https://github.com/openclaw/openclaw/issues/85251) | Codex app-server 发出 turn/started 后静默，会话卡死至恢复窗口 | OPEN, needs-maintainer-review | 无 |
| [#109490](https://github.com/openclaw/openclaw/issues/109490) | Codex turn 在客户端委派消息工具结果后被中断 | OPEN, needs-maintainer-review | 无 |
| [#112423](https://github.com/openclaw/openclaw/issues/112423) | 大型 SQLite transcript 清理阻塞网关事件循环 | OPEN, source-repro | 无 |
| [#53540](https://github.com/openclaw/openclaw/issues/53540) | 大参数工具调用生成延迟超过请求超时导致连接丢失 | OPEN | 无 |
| [#119090](https://github.com/openclaw/openclaw/issues/119090) | 媒体清理 fail-open 永久删除会话媒体 | CLOSED（原因未明） | 无 |

**今日证实的稳定性主题：** 多个 P1 问题集中在两类根因 — (a) 会话/绑定状态在各种异常路径下无法恢复（Codex binding tombstone、Slack origin tuple、embedded run 卡死），(b) 网关主线程被大体积同步操作阻塞（plugin-metadata snapshot、SQLite transcript 归档、大型附件处理），后者的典型案例如 #118846（网关主线程自启动即饱和，已关闭）与 #90098（大型附件导致浏览器/网关栈溢出，有 PR 打开）。

---

### 6. 功能请求与路线图信号

| 编号 | 请求 | 评论/👍 | 状态信号 | 链接 |
|---|---|---|---|---|
| #7707 | 记忆来源信任标签（memory trust tagging） | 27 评论 | P2, needs-security-review; 半年未决策 | [Issue #7707](https://github.com/openclaw/openclaw/issues/7707) |
| #6615 | exec-approvals 支持 denylist（默认放行、按黑名单拦截） | 11 评论/👍 8 | P2, linked-pr-open, needs-security-review | [Issue #6615](https://github.com/openclaw/openclaw/issues/6615) |
| #53654 | Discord 支持 messageUpdate/messageDelete（编辑重处理、删除取消） | 6 评论/👍 3 | P2, needs-maintainer-review | [Issue #53654](https://github.com/openclaw/openclaw/issues/53654) |
| #13597 | AWS 部署指南（EC2/ECS/Lambda） | 7 评论/👍 4 | P2, needs-maintainer-review | [Issue #13597](https://github.com/openclaw/openclaw/issues/13597) |
| #16555 | 投递队列消息 TTL/过期 | 6 评论 | P2, needs-maintainer-review | [Issue #16555](https://github.com/openclaw/openclaw/issues/16555) |
| #67419 | 会话上下文膨胀：bootstrap 文件每轮重注入浪费 20-30% tokens | 10 评论/👍 2 | P2, needs-product-decision | [Issue #67419](https://github.com/openclaw/openclaw/issues/67419) |
| #50798 | ACP 线程绑定会话的可见 agent 间消息（代理投递且不创建主会话） | 5 评论 | P2, needs-live-repro | [Issue #50798](https://github.com/openclaw/openclaw/issues/50798) |

**路线图信号解读：**

- **记忆安全与信任分级**（#7707）获得持续关注但长期无决策；exec-approvals denylist（#6615，👍 8）已有开放 PR，提示安全策略灵活性是用户强烈需求，有可能进入下一版本。
- **上下文窗口效率**（#67419）反映用户对 token 成本的敏感，Bootstrap 文件每轮重注入的问题直接影响使用成本；该问题 4 月提出，仍无明确方案。
- **渠道消息编辑/删除语义**（#53654）若实现，将提升 Discord 等渠道的交互一致性，但现有 PR 与渠道基础设施改动关联度较高，属于中期功能。

---

### 7. 用户反馈摘要

- **渠道重复消息是高频痛点。** Telegram（#86519）、QQBot（#77306）、Discord（#96007 截断）均有重复发送或内容截断的报告。用户 w3-design1 明确反馈 5.20 升级后 Telegram 重复 2-10 次、5.22 降为 2-3 次但未根除；SpicySugar16 报告 QQBot 渠道 `message_sending` hook 在 WebChat 历史回放时被重复触发导致向 QQ API 重发。

- **"静默失败"是第二大不满来源。** #44925（子代理结果丢失）、#85251（Codex turn 静默无输出）、#109490（委派工具结果后 turn 被中断）、#117609（长 turn 因瞬时错误整轮死亡）共同指向"用户无感知、无通知、无重试"的系统行为。用户 yilunzhang 在 #53540 中补充了具体触发路径（大参数工具调用生成延迟超过请求超时）。

- **升级迁移路径脆弱。** #119263（DB v14→v15 迁移失败）对于升级用户是直接阻断；#85844 指出自动更新后运行中的网关可能继续引用旧哈希 bundle 文件；#51429 更是以尖锐语气报告了硬编码工作路径被合并发布的问题（"wangtao 是谁？"），该问题自 3 月提出至今已近 5 个月仍 open，社区信任成本较高。

- **计费/限流恢复机制欠佳。** #70903（持久化冷却）与 #115642（冷却时长超出故障时长）均指向同一问题：provider 计费错误后 OpenClaw 的恢复路径对订阅用户不够友好，固定的 5 小时冷却窗口无法感知实际恢复状态。

---

### 8. 待处理积压

以下为长期未获响应或处于关键决策阻塞的重要条目，建议维护者优先关注：

| 编号 | 问题 | 提出时间 | 状态 | 阻塞原因 | 链接 |
|---|---|---|---|---|---|
| #7707 | 记忆来源信任标签 | 2026-02-03（6 个月） | OPEN, P2 | needs-product-decision + needs-security-review | [Issue #7707](https://github.com/openclaw/openclaw/issues/7707) |
| #44925 | 子代理结果静默丢失 | 2026-03-13（近 5 个月） | OPEN, P1 | needs-product-decision | [Issue #44925](https://github.com/openclaw/openclaw/issues/44925) |
| #51429 | 硬编码工作路径已合并发布 | 2026-03-21（近 5 个月） | OPEN, P2 | needs-maintainer-review + needs-product-decision | [Issue #51429](https://github.com/openclaw/openclaw/issues/51429) |
| #70903 | 持久化 provider 冷却 | 2026-04-24（超 3 个月） | OPEN, P0 | 已标记 stale，无 assignee | [Issue #70903](https://github.com/openclaw/openclaw/issues/70903) |
| #6615 | exec-approvals denylist | 2026-02-01（6 个月） | OPEN, P2 | 有 linked PR 但 needs-security-review + needs-product-decision | [Issue #6615](https://github.com/openclaw/openclaw/issues/6615) |
| #67419 | Bootstrap 文件每轮重注入浪费 token | 2026-04-15（近 4 个月） | OPEN, P2 | needs-product-decision | [Issue #67419](https://github.com/openclaw/openclaw/issues/67419) |

**PR 侧积压：**

- **#101248**（feat(subagents): native announceTarget for subagent completion routing）— 7 月 7 日发起，已过一个月，当前仍为 `needs proof`，且 PR 描述中提及冲突刷新与 CI 修复，属于长期开放的实现型 PR，目标 issue #27445 对应子代理结果通知需求。 [PR #101248](https://github.com/openclaw/openclaw/pull/101248)

- **#107744**（AI safety/quality event taxonomy）— 今日关闭但未标记合并，涉及六大安全边界的可观测性建设，若被关闭而非合并，影响安全事件追踪路线图。 [PR #107744](https://github.com/openclaw/openclaw/pull/107744)

- **#92161**（chain gateway traces into runs）— 同样今日关闭但状态不明，建议核实是否合并或另开 PR 跟进。 [PR #92161](https://github.com/openclaw/openclaw/pull/92161)

**维护者带宽提示：** 今日 500 条活跃 Issue 中，被标记为 `needs-maintainer-review` 的比例较高，多个 P1 问题同时挂起 `needs-product-decision`，说明技术方案与产品决策双线阻塞。建议维护者在下一轮 triage 中优先处理具备 `queueable-fix` 或 `fix-shape-clear` 标签的问题（如 #96692、#44289），其修复边界已明确，仅差审查与合并。

---

## 横向生态对比

# 个人 AI 助手开源生态横向对比分析报告（2026-08-06）


## 1. 生态全景

个人 AI 助手/自主智能体开源生态正处于**从"能跑通"向"可信任、可治理、可运维"演进的关键阶段**。以 OpenClaw 为首的头部项目保持极高社区活跃度（日均 500+ Issue/PR 更新），但维护者带宽已成为普遍瓶颈，多个项目同时出现 P0/P1 问题积压与 `needs-product-decision` 阻塞。安全与信任成为全生态共识主题——记忆投毒防护（OpenClaw #7707）、凭据泄露修复（NanoBot #5258）、SSRF 防护（Zeroclaw #8826）、Agent 行为真实性（IronClaw #7246/#7247）等多项目并行推进。可靠性缺口（静默失败、无重试、通道断联、升级迁移脆弱）是用户抱怨最集中的方向，同时也是修复 PR 最密集的领域。生态内部呈现明显的**功能分化**：OpenClaw 系（OpenClaw/Zeroclaw/CoPaw/NanoClaw 等）主打多渠道、多智能体编排与网关架构，而 NanoBot 等轻量项目则聚焦单 agent 效率与 WebUI 体验。


## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | 合并/关闭 | 新版本 | 健康度评估 |
|---|---|---|---|---|---|
| **OpenClaw** | 500 | 500 | 62 PR 合并/关，68 Issue 关闭 | 无 | ★★★☆☆ 高活跃但维护者带宽瓶颈，P0 迁移 Bug 未修复 |
| **NanoBot** | 4 | 15 | 7 PR 合并 | 无 | ★★★★☆ 响应快，安全问题当日处理；8 PR 悬置略滞后 |
| **Zeroclaw** | 50 | 50 | 1 PR 合并 | 无（预备 v0.9.0） | ★★★☆☆ 高强度但 49 PR 积压严重，安全 PR 滞留数周 |
| **CoPaw** | 20 | 49 | 21 PR 合并/关闭 | 无 | ★★★★☆ 合并节奏好；长连接稳定性问题（MCP/频道）需关注 |
| **IronClaw** | 33 | 60（合计93条） | 未明确 | v1.1.0-rc.1（8/3） | ★★★★☆ 迭代收尾期，Bug Bash 暴露行为正确性缺陷 |
| **PicoClaw** | 0 | 4 | 1 PR 合并 | 无 | ★★★☆☆ 低位但健康；2 个 PR 积压超 36 天 |
| **NanoClaw** | 2 | 12 | 2 关（非合并） | 无 | ★★★☆☆ 渠道适配层修复中；2 个 Issue 存活 80+ 天 |
| **NullClaw** | 0 | 2 | 0 | 无 | ★★★☆☆ 2 个高影响修复待合并 |
| **LobsterAI** | 3 | 13 | 12 PR 合并/关闭 | 2026.8.5 | ★★★★☆ 合并效率高；2 个新 Bug 直指核心体验 |
| **TinyClaw** | — | — | — | — | 无活动 |
| **Moltis** | — | — | — | — | 无活动 |
| **ZeptoClaw** | — | — | — | — | 无活动 |
| **EasyClaw** | — | — | — | — | 无活动 |


## 3. OpenClaw 在生态中的定位

OpenClaw 以**绝对活跃度优势**（单日 500+ Issue/PR 动态，约为 Zeroclaw 的 5 倍、IronClaw 的 5.4 倍、CoPaw 的 7.5 倍）占据生态核心参照地位，是事实上的**架构风向标**——其会话状态管理、网关追踪链、安全事件分类（#107744）等设计决策被多个衍生项目（Zeroclaw、NanoClaw、PicoClaw）直接跟进或借鉴。技术路线上，OpenClaw 采用**重型网关 + 多渠道适配 + 子代理编排 + Codex 嵌入**的复杂架构，支持 Telegram/Discord/Slack/WhatsApp 等十余种渠道，而中小型项目普遍只覆盖 1-3 个渠道。社区规模上，OpenClaw 单日 Issue 量即超过多数项目全月总量，讨论深度（如 #116201 实时语音状态问题 59 条评论）也远超同类。然而相对短板同样明显：**维护者带宽不足**导致的 `needs-maintainer-review` 和 `needs-product-decision` 双重阻塞、**升级迁移路径脆弱**（DB v14→v15 迁移失败阻断所有 2026.7.1→2026.7.2 用户）以及**计费/限流恢复机制不友好**（P0 #70903 已 stale）等问题，为生态竞争者留下了差异化空间——这正是 CoPaw 与 NanoBot 今日在"快速修复 + 流畅合并节奏"上表现出的优势所在。


## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **静默失败与可靠性** | OpenClaw（#44925 子代理结果丢失）、NullClaw（#972 轮询线程静默死亡）、CoPaw（#6714 SSE 流内 503 不重试）、IronClaw（#7246/#7247 虚假状态报告）、NanoBot（#5237 MCP 业务错误封装被误判成功） | 失败必须可见、可重试、可通知——"无感知失败"是用户第一大不满来源 |
| **记忆安全与信任分级** | OpenClaw（#7707 来源信任标签）、Zeroclaw（#9328 verifiable-intent 凭证链验证）、IronClaw（#7246 虚构自动化状态）、NanoBot（#5258 凭据泄露） | 用户要求基于来源为记忆/内容打信任标签，防止注入与幻觉侵蚀信任 |
| **上下文与 token 成本控制** | OpenClaw（#67419 bootstrap 每轮重注入浪费 20-30% tokens）、Zeroclaw（#9631 OpenRouter 成本焦虑 + #9775 provider_extra 丢失）、LobsterAI（#2440 78% 重复指令注入）、CoPaw（#6700 超大工具输出刷爆上下文）、NanoBot（#5256 /goal 循环刷屏） | 多项目用户对 token 浪费、重复注入、无界增长高度敏感 |
| **长连接稳定性与自动恢复** | CoPaw（#6684 频道无重试 + #6732 MCP 周期性失效）、NullClaw（#984 轮询线程死寂）、NanoBot（#5248 Matrix M_BAD_JSON） | 需要健康检测、自动重连、超时保护，而非依赖手动重启 |
| **安全加固密集提交** | Zeroclaw（WebAuthn #9781、SSRF #8826、forbidden_paths #9776、发送者授权 #9428）、NanoBot（#5258 Jina 凭据泄露修复）、IronClaw（#7250/#7251 MCP 认证与错误指引） | 全生态同步加强安全边界，但多项目安全 PR 滞留待合并 |
| **DB 单写者/一致性约束** | NanoClaw（#3192 第二写入者风险）、OpenClaw（#119263 迁移失败） | 数据库架构一致性成为多项目核心关注点 |
| **MCP 生态接入与错误语义** | CoPaw（MCP 工具失效/超时）、NanoBot（MCP 错误判断 + MCP Apps host）、IronClaw（MCP 服务器注册）、NanoClaw（Tavily MCP 技能 + 代理变量透传） | MCP 是当前最活跃的工具扩展方向，错误语义与长连接稳定性为痛点 |


## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构 | 核心瓶颈 |
|---|---|---|---|---|
| **OpenClaw** | 全渠道 AI 助手 + 子代理编排 + Codex 嵌入 + 企业级可观测性 | 高级用户/企业/开发者，追求功能广度 | 重型网关，多语言，多渠道适配层 | 维护带宽，决策阻塞，迁移路径脆弱 |
| **Zeroclaw** | OpenClaw 衍生但聚焦 Agent 工作流治理 + 安全加固 + RFC 驱动 | 安全敏感型用户/企业 | Rust 系，插件 WASM，SOP 自动化 | 49 个 PR 积压，安全修复滞留 |
| **CoPaw** | 多智能体 + 工具调用 + 可视化 Console | 开发者/团队协作 | Python 系，Console 端 + MCP + SKILL CLI | 长连接稳定性，MCP 错误语义 |
| **IronClaw** | 渠道集成（Slack/Telegram）+ Skills 系统 + MCP 托管 | 团队协作/企业 Slack 用户 | Rust/WASM 生态，IronHub 生态 | Agent 行为真实性与幻觉控制 |
| **NanoBot** | 轻量单 Agent + WebUI + WhatsApp/Matrix | 个人用户/轻量部署 | Node.js，插件化技能 | 社区体量小，新功能 PR 悬置 |
| **NanoClaw** | NanoBot 衍生，注重渠道细节 + 容器隔离 | NanoBot 用户中需要容器化部署者 | Node.js + Docker 容器 | 附件跨容器传递，安装脚本时序缺陷 |
| **PicoClaw** | 极简 CLI + 多 Provider 鉴权 | CLI 重度用户 | 轻量 CLI 架构 | PR 积压时间长（36 天+），社区讨论冷淡 |
| **NullClaw** | 小型自部署助手 | 个人/小团队 | 轻量化架构 | 栈配置错误导致崩溃，线程监督缺失 |
| **LobsterAI** | 桌面客户端 + 企业版多租户 + 签到/活动 | 企业/桌面端用户 | Electron 类桌面应用 + 本地代理 | 提示词注入冗余，老 Issue 响应慢 |


## 6. 社区热度与成熟度

**第一梯队（日更新 100+，快速迭代期）**
OpenClaw、Zeroclaw、IronClaw、CoPaw——活跃度高，功能迭代快，但均面临维护者带宽瓶颈与不同维度的技术债。IronClaw 已进入 v1.1.0-rc 收尾（质量巩固期），CoPaw 合并节奏最好。

**第二梯队（日更新 5-50，活跃迭代期）**
NanoBot、NanoClaw、LobsterAI——功能推进稳定，社区反馈响应快，项目规模适中。LobsterAI 今日 12/13 PR 当日合并，效率最高。

**第三梯队（日更新 <5，间歇期或质量巩固期）**
PicoClaw、NullClaw——低位但有针对性的修复推进中。

**空转或休眠**
TinyClaw、Moltis、ZeptoClaw、EasyClaw——过去 24 小时无任何活动。


## 7. 值得关注的趋势信号

1. **"可信任的自主性"是下一阶段核心竞争点。** 多项目同时出现"Agent 虚构状态/谎报完成"（IronClaw #7246/#7247）、"记忆投毒"（OpenClaw #7707）、"静默失败"（OpenClaw #44925、NullClaw #972、CoPaw #6714）类问题，不能再简单地归为 Bug——**这是自主 Agent 走向真实业务场景时必须跨越的信任门槛**。预计未来 1-2 个季度，来源信任标签、可验证执行、失败透明化将成为标配能力而非加分项。

2. **维护者带宽是生态发展的系统性瓶颈。** 几乎每个项目都有 PR 积压超过一个月、Issue 存活超 3 个月无人响应的案例（OpenClaw 多项 P1 挂起、Zeroclaw 安全 PR 滞留数周、LobsterAI 一行修复 4 个月未合并）。**社区对透明决策机制的呼声渐高**——Zeroclaw #8692（维护者决策队列）以 11 评论成热帖即是信号。项目方需要在"响应速度"与"功能广度"之间做出更明确的取舍。

3. **上下文效率与成本控制从"优化项"变为"刚需"。** 从 OpenClaw 的 bootstrap 重复注入（20-30% token 浪费）、LobsterAI 的 78% 重复指令、Zeroclaw 的 OpenRouter 成本焦虑到 CoPaw 的大输出刷爆上下文——**用户开始用数字衡量 token 消耗**。提供去重、缓存和精简机制的 Agent 将获得显著竞争优势。

4. **渠道/长连接稳定性是自部署用户的共同痛点。** CoPaw（Matrix、MCP）、NullClaw（Telegram/Matrix 轮询死寂）、NanoBot（Matrix M_BAD_JSON）、OpenClaw（Telegram 重复回复回归）均出现"需手动重启才能恢复"的体验问题。**健康检测、自动重连、有界超时预计将成为基础设施标配**（NanoClaw #3191 WhatsApp 启动挂起修复、Zeroclaw daemon 日志有界化等新 PR 已在覆盖此方向）。

5. **MCP 正在成为工具生态的事实标准，但其错误语义与生命周期管理远未成熟。** CoPaw（MCP 工具周期性失效、超时不可配）、NanoBot（业务错误封装误判、MCP Apps host 请求）、IronClaw（MCP 服务器注册与认证）、NanoClaw（MCP 代理变量透传 + Tavily 技能）——**接入已不是问题，可靠性才是**。率先定义清晰的 MCP 错误语义与连接生命周期规范的项目将获得生态话语权。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 — 2026-08-06

## 今日速览

项目保持高活跃度，过去24小时内共产生 4 条 Issue 和 15 条 PR 动态。7 个 PR 已合并/关闭（含多个里程碑修复），但目前仍有 8 个 PR 悬置待审，合并节奏略有滞后。无新版本发布，核心开发围绕 WebUI 交互优化、WhatsApp 媒体支持修复和 agent 循环控制展开。值得关注的是，2 个 P1 级安全/稳定性修复 PR（#5258、#5238）已在今日关闭或提交，显示维护团队对安全问题的响应较快。社区侧呈现"功能热情高、Bug 反馈集中"的特点，Temporary Chat、共享终端等新功能 PR 密集涌现，而 MCP 错误处理问题和 /goal 重复回复 Bug 则是用户痛点最集中的两个方向。

## 版本发布

今日无新版本发布。

## 项目进展

今日共有 7 个 PR 被合并或关闭，项目在以下几个方向取得了实质进展：

- **WebUI 视觉与交互重构**（#5249、#5250 已合并）：统一了菜单、弹层和对话框的视觉层级，为裁剪的活动面板添加了方向感知的边缘羽化效果。叠加此前已合并的 #5184（Quick Chat + Temporary Chat 入口），WebUI 在视觉一致性和信息密度控制上有整体提升。
- **WhatsApp 媒体发送修复**（#5203 已合并）：修复了出站媒体类型检测的可靠性问题。此前系统仅信任文件扩展名，现在改为通过文件内容进行检测，并支持 M4A/AAC 等音频别名，不支持的格式会以文档形式发送，直接回应了 Issue #5149 中用户反馈的 "无法发送音频" 问题。
- **安全回归修复**（#5238 已合并）：删除了请求作用域的 `Tool.available()` 权限层和 `SessionAccessScope` 授权抽象，`Tool.enabled()` 重新成为唯一的构造期开关。此修复解决了 #5211 引入的回归问题，恢复了会话工具对所有持久化会话的搜索与读取能力。
- **新功能提交**（#5252、#5253、#5259、#5254、#5255 待审）：Temporary Chat、共享交互式项目终端、provider 原生请求开关（OpenAI Codex Fast 模式、DeepSeek web search、xAI Grok X Search）、以及 API 服务状态真实性改进等新功能已提交 PR，等待合并审查。

## 社区热点

**MCP 工具错误处理缺陷引发讨论（Issue #5237，评论 2 条）**

当 MCP 服务器在 `CallToolResult.content` 中返回业务错误封装（如 `{"code": 404, "msg": "data not exist"}`）且 `isError = False` 时，agent 会将其视为成功调用，无法识别失败，只能空等到 `tool_timeout` 触发。评论区的核心诉求是 nanobot 应识别"封装在成功信封里的业务错误"，而非盲目信任 `isError` 布尔值。这触及了 MCP 工具链在真实业务场景中的可靠性短板。

**/goal 命令触发重复回复风暴（Issue #5256）**

单条 `/goal` 消息在等待用户回答期间产生了大量近乎相同的重复回复，直到用户介入或模型自我识别为系统循环才终止。该 Issue 今天刚创建且尚无评论，但同一作者 shakewingo 已提交修复 PR #5257（为 sustained-goal 续跑添加边界限制），社区反应非常迅速。

**WebUI 新功能密度高，Temporary Chat 最受关注**

PR #5252（Temporary Chat 模式）、#5259（强制内存级临时会话）、#5253（共享交互式项目终端）在短时间内密集提交，其中 #5252 和 #5184（Quick Chat + Temporary Chat）存在功能重叠，已标记为冲突关系。这表明社区对 WebUI 会话管理形态的探索非常活跃，但实现路径尚未收敛。

## Bug 与稳定性

| 严重程度 | Issue/PR | 描述 | 状态 |
|---------|----------|------|------|
| **P1** | PR #5258 | 携带凭据的 URL（userinfo、token、签名参数）会被转发给远程 Jina reader，存在凭据泄露风险 | 待审（已提交修复） |
| **P1** | PR #5238 | 请求作用域访问授权层引发回归，破坏会话工具的正常读取 | ✅ 已合并修复 |
| **P2** | Issue #5237 | MCP 业务错误封装被误判为成功调用，agent 无法感知失败 | 待处理（无关联 PR） |
| **P2** | Issue #5256 | /goal 命令在等待用户回答期间产生大量重复回复 | 已有 PR #5257 待审 |
| **P2** | Issue #5149 | WhatsApp 无法发送音频文件（创建于 7/28） | ✅ 已由 PR #5203 修复（已合并） |
| **P2** | PR #5248 | Matrix 房间加入时 POST 请求体为空，Continuwuity 服务器返回 M_BAD_JSON | 待审 |
| **P2** | PR #5260 | MemoryStore 将运行时文件混入受跟踪的工作区目录 | 待审 |

## 功能请求与路线图信号

- **MCP Apps host 支持（Issue #5251）**：用户请求在 WebUI 中支持 MCP Apps 扩展（`io.modelcontextprotocol/ui`），让 MCP 服务器可以附加交互式 UI 组件。目前 MCP 调用结果仅作为模型侧的文本/图像产物。若实现，将显著扩展 MCP 工具的表达能力。
- **元搜索提供商（PR #5234 已关闭）**：mst-python 元搜索工具被提议作为新的 Web 搜索提供商，聚合 DuckDuckGo、Google、Brave、Bing 等结果并使用 RRF 融合。该 PR 状态为关闭而非合并，不确定是否被拒绝或暂缓，建议维护者明确说明意图。
- **Temporary Chat 与 Quick Chat 统一**（#5252、#5259、#5184）：多个 PR 在推动临时会话功能，趋势明确，预计下一版本会包含某种形式的临时聊天模式。
- **共享交互式项目终端（PR #5253）**：在 WebUI 中提供项目级 PTY 终端，支持 xterm.js、重连、重启和显式终止。这是一个较大的新功能，与 agent 工具链深度集成。
- **Provider 原生请求开关（PR #5254 已关闭）**：为 OpenAI Codex、DeepSeek、xAI Grok 添加 WebUI 开关以控制 provider 原生请求字段。该 PR 状态为已关闭，但内容已在后续 PR 中可能被整合。

## 用户反馈摘要

- **WhatsApp 音频发送失败（Issue #5149）**：用户明确报告"nanobot 能接收 WhatsApp 音频但无法发送"。日志显示 ffmpeg 处理链路存在告警，该问题已由 PR #5203 修复（按文件内容而非扩展名识别媒体类型），但 Issue 本身尚未关闭，建议维护者确认修复后关闭。
- **MCP 错误处理困惑（Issue #5237）**：用户描述的场景是实际业务集成中非常典型的问题——上游返回"业务错误"但 HTTP/协议层面成功。用户期望 agent 能够识别这类错误并进行重试或重新规划，而非盲目等待超时。这反映了 MCP 生态工具在错误约定上尚不成熟，nanobot 需要做防御性处理。
- **/goal 循环困扰（Issue #5256）**：用户的使用场景是设定目标后等待用户提供信息，但模型陷入了"重复追问—等待—再重复"的死循环。用户不得不手动介入或让模型自我识别循环。这说明 sustained-goal 机制在"等待外部输入"状态下的行为控制需要更好的约束。
- **PR #5255 引出的痛点**：WebUI 的 API 服务器状态面板在网关未启动 `nanobot serve` 时一律显示"Off"，即使外部已有实例在运行。用户对"状态真实性"有期待，希望面板反映实际外部服务状态，而非仅以网关为唯一判断依据。

## 待处理积压

- **Issue #5237（MCP 错误处理，P2）**：已开放 2 天，2 条评论讨论，暂无关联修复 PR。该问题影响所有使用 MCP 工具的真实业务集成场景，建议尽快安排。
- **Issue #5149（WhatsApp 音频发送）**：虽然 PR #5203 已合并且修复了根因，但 Issue 仍处于 OPEN 状态，建议维护者在确认后关闭以避免社区困惑。
- **PR #5255（API 服务状态真实性，Draft）**：Draft 状态已超过 24 小时且无维护者评论，该 PR 触及 WebUI 状态显示的"真实性"问题，值得维护者给出明确反馈。作者提出的方案（区分"网关未启动"与"外部实例在运行"并非易事，但确实是用户看得见的体验缺口。
- **PR #5234（mst-python 元搜索提供商）**：状态为 CLOSED 但未合并，无关闭说明。元搜索是一个有明确价值的功能方向，如果是被拒绝，建议维护者补充说明原因（技术选型、维护成本等），如果是暂缓，建议转移到路线图跟踪。

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-08-06

## 今日速览

过去 24 小时项目保持高强度运转：共产生 50 条 Issue 更新和 50 条 PR 更新，其中新增/活跃 Issue 40 条、关闭 10 条，待合并 PR 高达 49 条。当前工作重心明显集中在 RFC 评审与安全加固两个方向——安全相关 PR（WebAuthn 校验、SSRF 防护、forbidden_paths 扩展、渠道发送者授权）占据了今日提交的主体。值得关注的是，[PR #9773 与 PR #9750](https://github.com/zeroclaw-labs/zeroclaw/pull/9750) 出现了同一问题的两次提交（后者已关闭），说明日志绑定方案正在快速迭代收敛。整体来看，项目正准备向 v0.9.0 迈进，安全与架构治理处于密集评审期。

## 项目进展

今日仅 1 个 PR 被合并/关闭，另有 1 个 Issue 有重要进展：

- **[PR #9750（已关闭）fix(service): bound launcher-owned daemon logs](https://github.com/zeroclaw-labs/zeroclaw/pull/9750)**：用共享服务监督器替代无界固定文件重定向，将守护进程捕获文件控制在 8 MiB 以内，通过有界非阻塞队列保留近期输出。该 PR 被关闭后由 [PR #9773](https://github.com/zeroclaw-labs/zeroclaw/pull/9773) 接续（改为针对 macOS LaunchAgent 的方案），日志无界增长问题正在收敛。

- **[Issue #6350（已关闭）WhatsApp Web — allowed-numbers bypassed for LID-based contacts](https://github.com/zeroclaw-labs/zeroclaw/issues/6350)**：LID 联系人绕过号码白名单导致消息被静默丢弃的问题已关闭，表明修复方案已经落地。

- **[Issue #7467（已关闭）Zerocode 字符串编辑光标导航](https://github.com/zeroclaw-labs/zeroclaw/issues/7467)**：该功能请求已关闭，支持方向键编辑字符串的功能已实现。

- **[Issue #9652（已关闭）config set 拒绝含连字符的 cron 键](https://github.com/zeroclaw-labs/zeroclaw/issues/9652)**：配置 CLI 读写行为不一致的问题已修复。

## 社区热点

今日讨论最集中的议题呈现明显的"治理驱动"特征，前五名热帖均为 RFC/追踪类 Issue：

- **[#6808 — RFC: Work Lanes, Board Automation, and Label Cleanup（18 评论）](https://github.com/zeroclaw-labs/zeroclaw/issues/6808)**：薪酬最高的治理型 RFC，涉及工作路由、看板自动化和标签清理，已修订 24 版，目前处于"批准延期/逐步落地"状态。社区诉求是降低维护者的路由负担。

- **[#8303 — RFC: Goal mode v1（18 评论，1 👍）](https://github.com/zeroclaw-labs/zeroclaw/issues/8303)**：提出跨多个 agent 轮次的有界前台目标追踪机制。作者明确反对将重启交接、广泛频道准入、Web 和异步子工作捆绑进首个交付版本，体现了对"渐进式落地"的坚持。

- **[#8603 — RFC: ZeroClaw Chat Completions profile（16 评论）](https://github.com/zeroclaw-labs/zeroclaw/issues/8603)**：呼声最高的协议兼容需求——让 ZeroClaw 支持 OpenAI Chat Completions 协议，以接入 Open WebUI、LobeChat、Continue.dev、Aider、LangChain 等生态工具。这反映了用户对"AI 应用生态互操作"的强烈期待。

- **[#7155 — RFC: 高危 shell 命令逐次确认 + 命令策略模式（16 评论）](https://github.com/zeroclaw-labs/zeroclaw/issues/7155)**：安全关键型 RFC，借鉴 Claude Code 的 allow/ask/deny 模式，已修订至第 3 版且范围已收敛。说明社区对"可配置的命令执行防线"有明确需求。

- **[#8692 — Tracker: 维护者决策队列（11 评论）](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)**：作为所有 RFC 的决策追踪器，其高热度侧面反映了当前 RFC 积压量——社区需要更透明的决策流转机制。

## Bug 与稳定性

### 高危（S1 — 工作流阻断）

- **[#9775 — OpenRouter 流式请求丢失 provider_extra（P1）](https://github.com/zeroclaw-labs/zeroclaw/issues/9775)**：`stream_chat` 路径未调用 `merge_extra_body`，导致所有配置的 `provider_extra` 参数在流式请求中被丢弃。**暂无修复 PR**。

- **[#8642 — MCP/工具 schema 克隆导致 agent 循环中 RSS 无界增长（P1，已接受）](https://github.com/zeroclaw-labs/zeroclaw/issues/8642)**：从 #5542 OOM 追踪器中拆分出的独立内存增长路径，尚未有对应修复 PR。**建议优先关注**。

### 中危（S2 — 功能降级）

- **[#9768 — daemon reload 未绑定 SIGUSR1，降级安全警告误导用户发信号杀死 daemon（P1，已接受）](https://github.com/zeroclaw-labs/zeroclaw/issues/9768)**：文档/警告信息与实际信号处理不一致，存在操作安全隐患。**暂无修复 PR**。

- **[#9697 — ZeroCode 无法连接 Windows 任务计划程序启动的 daemon（P1，已接受）](https://github.com/zeroclaw-labs/zeroclaw/issues/9697)**：S3 严重级别但优先级 P1，属于 Windows 场景下的回归问题。**暂无修复 PR**。

- **[#9328 — verifiable-intent 验证约束时未验证凭证链（P2，已接受）](https://github.com/zeroclaw-labs/zeroclaw/issues/9328)**：`evaluate_constraints` 直接信任调用方提供的 fulfillment 对象，存在安全边界缺陷。**已有跟进任务 #9769**。

### 低危（S3 — 次要问题）

- **[#9780 — cron 触发的 SOP 无法进行网络操作](https://github.com/zeroclaw-labs/zeroclaw/issues/9780)**：文档宣称的 watch-loop 功能实际不可用，能力集中缺少 HTTP 成员，shell.exec 和 notify.channel 为不可满足的占位符。

- **[#9779 — sops_dir 文档默认值未被 daemon 遵循，SOP 静默不加载](https://github.com/zeroclaw-labs/zeroclaw/issues/9779)**：两个守护进程启动路径都以 `sops_dir.is_some()` 作为 SOP 子系统的门控条件，依赖默认值的用户会无提示地失去 SOP 功能。

### 已修复

- **[#9462（已关闭）plugins-wasmtime 特性门控的 lib 单元测试从未在 CI 执行（P2）](https://github.com/zeroclaw-labs/zeroclaw/issues/9462)**：测试覆盖缺口已修复。

- **[#9335（已关闭）支持 data 包装的 OpenAI 兼容响应（P2）](https://github.com/zeroclaw-labs/zeroclaw/issues/9335)**：兼容性问题已解决。

今日提交的安全加固 PR（WebAuthn 校验 #9781、SSRF 防护 #8826、forbidden_paths 工作区相对模式 #9776、Signal sourceUuid #9777、Bluesky/Reddit 发送者授权 #9428）均处于待合并状态，建议尽快推进合并。

## 功能请求与路线图信号

- **[RFC #9487 — 运行时拥有的会话与传输表面适配器](https://github.com/zeroclaw-labs/zeroclaw/issues/9487)**：已修订至第 2 版并敲定了 #9487/#9488/#9600 的所有权边界，所有迁移入口点统一提交 `InboundAction`。这一方向将大幅简化多传输（ACP、Web、频道）下的会话管理。

- **[RFC #8832 — 插件拥有的 Kanban 看板](https://github.com/zeroclaw-labs/zeroclaw/issues/8832)**：在宿主通用能力之上构建可选的 agent 工作协调看板。该提案若落地，将与 #6808 的 Work Lanes 形成互补。

- **[RFC #9246 — ZeroCode 所有权迁移期间保留 Todo tracker 配置](https://github.com/zeroclaw-labs/zeroclaw/issues/9246)**：已在 8 月 6 日更新，属于 ZeroCode 迁移的配套保障。

- **[#9631 — 向 OpenRouter 发送稳定 session_id 以节省 prompt-cache 成本](https://github.com/zeroclaw-labs/zeroclaw/issues/9631)**：直击"同一对话产生数十次 LLM 请求、系统提示和工具 schema 反复重放"的成本痛点，有 6 条评论且讨论活跃，商业价值明确。

- **[RFC #9346 — 统一包/能力/配置/运行时状态目录契约](https://github.com/zeroclaw-labs/zeroclaw/issues/9346)**：将 #8908 和 #8909 的窄视图合并为一个产品级目录，是长期架构演进的重要一环。

- **[RFC #8424 — 工作区相对禁用路径模式 + .zeroclawignore](https://github.com/zeroclaw-labs/zeroclaw/issues/8424)**：与今日提交的 [PR #9776](https://github.com/zeroclaw-labs/zeroclaw/pull/9776)（forbidden_paths 扩展为 glob 模式）直接对应，后者已部分实现该 RFC 的规范范围。

## 用户反馈摘要

- **OpenRouter 成本焦虑**：[#9631](https://github.com/zeroclaw-labs/zeroclaw/issues/9631) 的作者直言"通过 OpenRouter 的 agent 聊天不必要地昂贵"，单次对话产生数十次 LLM 请求，系统提示与工具 schema 每次重复传输。结合 [#9775](https://github.com/zeroclaw-labs/zeroclaw/issues/9775)（流式请求丢失 provider_extra），OpenRouter 用户在成本控制与请求完整性两方面都遇到了障碍。

- **SOP 功能"文档与实现脱节"**：[#9780](https://github.com/zeroclaw-labs/zeroclaw/issues/9780) 与 [#9779](https://github.com/zeroclaw-labs/zeroclaw/issues/9779) 均为新提交，作者明确指出两个问题互为因果——即使 sops_dir 配置正确，cron 触发的 SOP 也因缺少 HTTP 能力而无法执行网络工作，"watch-loop" 功能实际不可用，且静默失败无任何日志。

- **Windows 场景持续受损**：[#9697](https://github.com/zeroclaw-labs/zeroclaw/issues/9697) 报告 Windows 任务计划程序启动的 daemon 无法被 ZeroCode 连接，且用户明确表示"这是期望在上个版本已解决的问题"——对同类问题的再次出现表达了不满。

- **安全错误提示的信任危机**：[#9768](https://github.com/zeroclaw-labs/zeroclaw/issues/9768) 指出降级安全警告引导用户发送的实际是杀死 daemon 的信号（SIGUSR1 未绑定 reload），这种"错误的安全提示"比没有提示更危险——用户按指引操作反而造成服务中断。

- **WhatsApp 安全问题得到确认与修复**：[#6350](https://github.com/zeroclaw-labs/zeroclaw/issues/6350)（allowed-numbers 被 LID 联系人绕过）已关闭，[#9397](https://github.com/zeroclaw-labs/zeroclaw/issues/9397)（空 allowed_groups 应视为全拒绝）仍在评审中且被标记为 P1 + no-stale，安全边界收紧方向明确。

## 待处理积压

以下项目长期未获响应或进展缓慢，提醒维护者关注：

- **[PR #8496 — 集中化 deferred-MCP 访问策略（6/29 提交，needs-author-action）](https://github.com/zeroclaw-labs/zeroclaw/pull/8496)**：修复 #8054 Surface 1(b) 的安全缺口，标记为 P2/高风险，已积压超过一个月，作者为 principal contributor。

- **[PR #8443 — Matrix 单消息进度草稿（6/28 提交，needs-author-action，size:XL）](https://github.com/zeroclaw-labs/zeroclaw/pull/8443)**：大型功能 PR，涉及 Matrix stream_mode 与工具溯源事件，已积压近六周。

- **[PR #8826 — image_gen 下载 URL 的 SSRF 防护（7/8 提交，needs-author-action）](https://github.com/zeroclaw-labs/zeroclaw/pull/8826)**：安全关键 PR，已积压四周。考虑到近期安全审查的密集度，建议优先推进。

- **[Issue #8642 — MCP 工具 schema 克隆导致 RSS 无界增长（P1，已接受，无对应 PR）](https://github.com/zeroclaw-labs/zeroclaw/issues/8642)**：高风险内存问题，等待认领。

- **[Issue #9768 — daemon reload 信号误导（P1，已接受，无对应修复）](https://github.com/zeroclaw-labs/zeroclaw/issues/9768)**：S2 级别的安全隐患，等待认领。

---

**总体评价**：项目活跃度极高，安全加固与 RFC 治理双线并进，但 49 个待合并 PR 的积压正在形成瓶颈——尤其是多个 P1 级安全修复（#9781、#8826、#9428）停留数周未合并。建议维护者优先处理安全类 PR，并关注 #9775 与 #8642 两个尚无修复方案的高优先级 Bug。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

### PicoClaw 项目动态日报 — 2026-08-06

---

#### 1. 今日速览

过去24小时项目活跃度处于低位：无新 Issue，亦无新版本发布，社区讨论热度趋近于零。唯一的动作集中在 Pull Request 队列，累计 4 条 PR 有状态更新，其中一条已关闭（合并）。整体来看，项目处于稳定迭代的间歇期，没有出现回归报告或紧急缺陷，健康度良好，但上游等待评审/合并的 PR 数量依然偏多，需留意积压风险。

---

#### 2. 版本发布

无新版本 Release。

---

#### 3. 项目进展

今日仅有一条 PR 被关闭（推断为已合并），主要涉及 Provider 鉴权能力的扩展，具体说明如下：

- **[CLOSED] feat(auth): add Anthropic OAuth setup-token login** ([#926](https://github.com/sipeed/picoclaw/pull/926))
  - 为 Anthropic 新增 OAuth setup-token 支持（`sk-ant-oat01-*`），通过新的 `--setup-token` 参数或交互菜单来替代传统 API Key。
  - 集成 Anthropic usage endpoint，使 `auth status` 可展示最近 5 小时与 7 天的用量统计。
  - 对 OAuth token 的流式请求（streaming）场景提供了支持。

此改动落地后，第三方模型（Anthropic）接入的鉴权方式更统一，且用量可见性增强，面向重度 CLI 用户的操作体验有所提升。

---

#### 4. 社区热点

今日无 Issue/PR 出现高讨论量或高反应热度。唯一有更新且处于 Open 状态的长周期 PR 为：

- **[OPEN] feat(models): add configurable default fallback chain** ([#3200](https://github.com/sipeed/picoclaw/pull/3200))
  - 提出在 Web UI 增加可配置的模型默认回退链，并持久化至后端。距今已保持 Open 状态超过一个月，今日有变更（更新于 08-05），说明作者仍在维护或推挤评审。
  - 诉求分析：这反映出用户在多模型场景下的常见痛点——单点故障或过载时缺少自动 Failover 策略，期望在 GUI 层面简化设置流程。

---

#### 5. Bug 与稳定性

今日未报告新的崩溃、回归或关键 Bug。唯一已修复的构建链路问题如下：

- **[OPEN] fix(web): repair unparseable pnpm-lock.yaml** ([#3318](https://github.com/sipeed/picoclaw/pull/3318))
  - 严重程度：中（构建阻断）。`web/frontend/pnpm-lock.yaml` 中存在重复映射键 `semver@7.8.5`，导致 pnpm 拒绝解析该锁文件（`ERR_PNPM_BROKEN_LOCKFILE`），影响前端依赖安装与 CI。
  - 关联 fix PR：***待合并***（#3318 目前仍为 Open 状态）。

**建议维护者优先合并 #3318**，因其直接影响新贡献者本地环境搭建与 CI 稳定性。

---

#### 6. 功能请求与路线图信号

当前无新增 Issue，但从 PR 队列可识别以下潜在路线图信号：

- **模型自动回退链**（[#3200](https://github.com/sipeed/picoclaw/pull/3200)）：落地可能性较高。该 PR 涉及前端与后端 API 联动，为较完整的功能切片，若被合并将显著提升多 Provider 环境下的鲁棒性。
- **安装脚本仓库迁移**（[#1951](https://github.com/sipeed/picoclaw/pull/1951)）：将安装脚本从 docs 仓库移入主仓库，属工程基础设施优化。信号指向团队希望收敛资产、减少跨仓库维护成本，可能在下一个 minor 版本中合入。

---

#### 7. 用户反馈摘要

昨日/今日无 Issue 评论产出，无直接用户反馈可提取。从近期未关闭 PR 的长期跟进状态推断：
- 有用户持续投入时间完善 Fallback Chain 功能（#3200），表明对多模型高可用策略有实际需求。
- 安装脚本迁移（#1951）作者与 docs 仓库 issue 有联动，侧面反映有用户因文档安装流程跨仓库而产生困惑或提效需求。

---

#### 8. 待处理积压

以下为长期未合并/未响应的 PR，需维护者关注：

- **[OPEN] feat(models): add configurable default fallback chain** ([#3200](https://github.com/sipeed/picoclaw/pull/3200)) — 已 Open 36 天，更新于 08-05。功能价值明显，但等待评审时间过长，有 Community 贡献者流失风险。
- **[OPEN] chore: move installation scripts from docs repo to here** ([#1951](https://github.com/sipeed/picoclaw/pull/1951)) — 已 Open 约 4.5 个月，仅涉及仓库结构调整，可快速决策，但长期滞留会阻塞 docs 仓库的后续清理工作。

---

*数据统计区间：2026-08-05 00:00 UTC 至 2026-08-06 00:00 UTC*

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 — 2026-08-06

## 今日速览

项目在过去24小时内保持高效迭代节奏，共产生 12 条 PR 更新及 2 条 Issue 更新。核心关注点集中在**渠道适配层稳定性修复**上，尤其围绕附件传递（Signal 渠道）、数据库单写者约束、以及容器启动挂起问题。两条重复提交的 PR（#3192 与 #3175）共同针对 command-gate 拒绝通知绕过 outbound.db 单写者规则的问题，显示核心团队正在收敛数据库架构违规风险。社区贡献活跃，新增技能类 PR（Tavily MCP、add-why）与基础设施修复（OneCLI 网关 env 转发、WhatsApp 超时保护）并行推进。整体健康度良好，但 Issue #2528 所暴露的附件容器隔离问题已存活近三个月，需重点关注。

## 版本发布

今日无新版本发布。

## 项目进展

今日无新合并的 PR（2 条关闭均为非合并操作）。但两条关键修复 PR 的提交与推进值得注意：

- **[PR #3192](https://github.com/nanocoai/nanoclaw/pull/3192) — fix: route command-gate denials through the delivery adapter, not outbound.db**：与 #3175 为同主题重复提交。该修复消除了宿主机直接写入会话 `outbound.db` 的第二写入者行为，规避了仓库自身文档（`docs/db.md`）所定义的单写者规则被破坏而引发数据库损坏的风险。该 PR 于 8 月 5 日创建并保持活跃，表明核心团队正在积极收敛此架构一致性问题。
- **[PR #3187](https://github.com/nanocoai/nanoclaw/pull/3187) — fix(agent-runner): disallow built-in SendMessage so agent-to-agent messaging works**：已关闭，修复了 agent-runner 中内建 SendMessage 与 agent 间消息传递的冲突。

上述修复表明项目在**数据库架构一致性**与**agent 通信正确性**两个维度上有明确进展。此外，今日多条打开 PR（#3191、#3190、#3189、#3188）均获得更新，显示项目合并管道运转正常，社区贡献密集。

## 社区热点

今日讨论最活跃的条目为两条长期存在且被再次更新的 Issue：

- **[Issue #2528](https://github.com/nanocoai/nanoclaw/issues/2528) — Signal channel: image/PDF attachments unreachable from agent container**：创建于 5 月 18 日，今日再次获得更新（8 月 5 日）。用户报告通过 Signal 发送的图片/PDF 附件抵达宿主机后，容器内 agent 无法访问。此问题直接关联今日另一条重要 PR——**[PR #3156](https://github.com/nanocoai/nanoclaw/pull/3156) — fix(agent-runner): carry channel attachments to providers as structured parts**（核心团队成员提交，已保持一周活跃），该 PR 正是针对附件从渠道到 provider 的结构化传递问题。社区诉求的核心是**渠道附件在容器隔离环境下的可达性与结构化传递**。
- **[Issue #2006](https://github.com/nanocoai/nanoclaw/issues/2006) — Fresh install on Debian 12 LXC: docker socket permission denied — recovery path doesn't fire**：创建于 4 月 25 日，同样于今日获得更新。用户报告在 Proxmox LXC 容器中全新安装时，`usermod -aG docker` 后的后续步骤仍因 socket 权限失败，且恢复路径未触发。该问题反映出**安装脚本在用户组变更生效时机上的时序缺陷**。

## Bug 与稳定性

按严重程度排列：

**高 — 容器启动挂起风险**

- [PR #3191](https://github.com/nanocoai/nanoclaw/pull/3191) — fix(whatsapp): bound setup() to a timeout so a logged-out session can't hang host startup。WhatsApp 渠道的 `setup()` 无界等待 Baileys 首次 `connection: open` 事件，若会话登出且无人扫码，事件永不触发，导致宿主机启动永久挂起。已有修复 PR，等待合并。

**中 — 容器内附件不可达**

- [Issue #2528](https://github.com/nanocoai/nanoclaw/issues/2528) — Signal 渠道图片/PDF 附件到达宿主机后容器内 agent 无法打开。存在时间较长（近 3 个月），已有对应的 **[PR #3156](https://github.com/nanocoai/nanoclaw/pull/3156)** 在途修复（结构化附件传递），目前尚未合并。

**中 — 数据库单写者约束被破坏**

- [PR #3192](https://github.com/nanocoai/nanoclaw/pull/3192) / [#3175](https://github.com/nanocoai/nanoclaw/pull/3175) — command-gate 拒绝通知经由 `writeOutboundDirect()` 由宿主侧直接写入会话的 `outbound.db`，构成第二写入者，违反仓库自身的单写者不变量，有损坏数据库的风险。修复 PR 已提交。

**中 — MCP 子进程环境缺失代理变量**

- [PR #3188](https://github.com/nanocoai/nanoclaw/pull/3188) — stdio 方式启动的 MCP 服务器子进程仅继承 `HOME`/`LOGNAME`/`PATH`/`SHELL`/`TERM`/`USER`，缺失 `HTTPS_PROXY` 及 CA 信任变量，导致代理环境下 MCP 工具调用失败。已有修复 PR。

**低 — 安装流程 Docker 权限时序缺陷**

- [Issue #2006](https://github.com/nanocoai/nanoclaw/issues/2006) — Debian 12 LXC 全新安装时，`usermod -aG docker` 后同一安装流程中的后续步骤仍报 socket 权限拒绝（原因在于用户组变更不即时生效），且恢复路径未触发。目前无对应修复 PR。

## 功能请求与路线图信号

今日提交的 PR 中体现了两个明确的功能方向：

- **外部工具集成能力扩展**：**[PR #3190](https://github.com/nanocoai/nanoclaw/pull/3190) — feat: add Tavily MCP tool skill** 为项目引入 Tavily 搜索 MCP 工具，配合同时推进的 **[PR #3188](https://github.com/nanocoai/nanoclaw/pull/3188)（MCP 环境变量透传）**，表明 MCP 生态接入是当前活跃的演进方向。
- **技能生态扩充**：**[PR #3189](https://github.com/nanocoai/nanoclaw/pull/3189) — feat(skill): add-why** 为单条消息提供"为什么会这样"的解释能力；**[PR #3172](https://github.com/nanocoai/nanoclaw/pull/3172)**（移除过时的 qodo 与 Google MCP 技能）则显示技能列表正在做清理与质量控制。

综合判断，**下一迭代版本很可能包含 MCP 工具链的扩展与透传修复、以及多技能（skills）生态的进一步丰富**。

## 用户反馈摘要

从今日活跃 Issue 的评论中可提炼以下用户痛点：

- **容器隔离带来的附件访问障碍**：Issue #2528 中，用户通过 Signal 发送图片后，agent 无法访问。这一反馈揭示了当前渠道附件处理链路（宿主接收 → 容器内 agent 读取）存在隔离层穿透缺陷。用户在真实使用中依赖多模态交互（"can you see this image?"），此类问题直接影响核心使用体验。
- **安装流程对容器/虚拟化环境的适配不足**：Issue #2006 中，用户在 Proxmox LXC 场景下遭遇 Docker 权限时序问题，安装脚本的恢复路径未按预期触发，用户被卡在安装中途。这反映了**安装脚本对非裸机环境的测试覆盖不足**。

## 待处理积压

以下条目长期未获有效响应或修复，提醒维护者关注：

- **[Issue #2006](https://github.com/nanocoai/nanoclaw/issues/2006)**（创建于 2026-04-25，已存活 103 天）— Debian 12 LXC 安装 Docker socket 权限拒绝且恢复路径不触发。历经多次更新但仍无对应修复 PR 或维护者明确回应。
- **[Issue #2528](https://github.com/nanocoai/nanoclaw/issues/2528)**（创建于 2026-05-18，已存活 80 天）— Signal 渠道附件容器内不可达。虽有对应的在途 PR #3156，但该 PR 已有一周未合并，建议维护者评估合并优先级。
- **[PR #2346](https://github.com/nanocoai/nanoclaw/pull/2346)**（创建于 2026-05-08，已存活 89 天）— 未知斜杠命令应作为普通聊天处理。修复了一个会导致 Agent SDK 输出被静默丢弃的缺陷，长时间未合并可能持续影响用户体验。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw 项目动态日报 — 2026-08-06

## 今日速览

项目今日整体活跃度中等偏低。过去 24 小时内无新 Issue 开启或关闭，Issues 侧处于静默状态；PR 侧有 2 条新提交，均由同一作者（raskevichai）提交，分别针对运行时栈空间不足导致的 Agent 崩溃，以及 Telegram/Matrix 轮询线程静默死亡的问题。两条 PR 均处于待合并状态。无新版本发布。整体来看，项目处于持续修复阶段，社区讨论较少，但修复内容指向两个长期困扰用户的稳定性问题，具有实际意义。

## 版本发布

无新版本发布。

## 项目进展

今日无已合并或关闭的 PR，项目进度主要体现为新增的 2 条待合并修复：

- **PR #985**：为 Agent 对话路径（turn path）分配 16 MiB 栈空间，取代原先错误地混用 `HEAVY_RUNTIME_STACK_SIZE`（2 MiB）的做法，从根源解决 `SessionManager.processMessage*()` 与 `Agent.turn()` 因栈溢出导致的崩溃。[链接](https://github.com/nullclaw/nullclaw/pull/985)
- **PR #984**：修复 Telegram/Matrix 通道在空闲一夜后静默中断的问题，指出 `supervisionLoop` 在结构上无法发现轮询线程的非活跃状态，使死线程无法被清理与重启。[链接](https://github.com/nullclaw/nullclaw/pull/984)

若两条 PR 顺利合入，将显著改善长时运行场景下的稳定性（对话崩溃与通道断联），建议维护者优先处理。

## 社区热点

今日无高讨论量或高互动量的 Issue/PR（两条 PR 均无评论、无点赞），社区关注度较低。结合 PR 内容与关闭的对应 Issue（#976、#972），可以推断用户侧此前报告过以下两类高频痛点：`nullclaw agent` 对话过程中崩溃、以及网关在空闲后通道失联必须重启。这两项正是今日 PR 针对的目标，说明维护者正在回应真实使用场景中的反馈，但社区侧尚未形成公开讨论。

## Bug 与稳定性

今日通过 PR 暴露了两个既有 Bug（均为新提交，尚未合并修复，无新增报告）：

| 严重程度 | 问题描述 | 状态 | 修复 PR |
| --- | --- | --- | --- |
| 高 | Agent 对话路径栈空间不足（实际 2 MiB 而非预期的独立大小），导致 `SessionManager.processMessage*()` 与 `Agent.turn()` 栈溢出崩溃（对应 Issue #976） | 待合并 | [PR #985](https://github.com/nullclaw/nullclaw/pull/985) |
| 高 | 轮询线程在空闲后静默死亡，且 `supervisionLoop` 无法感知，导致 Telegram/Matrix 通道永久失联，须重启全网关才能恢复（对应 Issue #972） | 待合并 | [PR #984](https://github.com/nullclaw/nullclaw/pull/984) |

两条修复均针对长期稳定性问题，目前无修复中的回归或新崩溃报告。

## 功能请求与路线图信号

今日无新功能请求。现有 PR 聚焦于稳定性修复而非功能迭代，未释放明确的路线图信号。值得注意的是，PR #985 与 #984 均涉及网关后台任务的生命周期管理（栈配置、线程监督），这暗示下一阶段的内部优化方向可能集中在运行时资源治理上，但目前尚无新功能提案涌现。

## 用户反馈摘要

今日无 Issue 评论或新反馈可供提炼。基于 PR 所关闭的 Issue（#976、#972），可间接推断用户侧的真实痛点：

- 长对话场景下 `nullclaw agent` 会意外崩溃，破坏连续交互体验。
- 网关长时间运行后，Telegram/Matrix 通道静默失效，而 `agent` 本身仍正常应答，排查困难，只能依赖全量重启恢复。这反映出用户对进程内可观测性与自我恢复能力的关注。

## 待处理积压

以下为今日新增的待合并 PR（若长期未合入将加重积压风险）：

- [PR #984](https://github.com/nullclaw/nullclaw/pull/984)：修复轮询线程死寂问题（2026-08-05 创建）
- [PR #985](https://github.com/nullclaw/nullclaw/pull/985)：修复 Agent 对话栈溢出问题（2026-08-05 创建）

两者均直接对应已关闭的 Issue #976 与 #972，堵住了两类高影响缺陷。当前无其他长期未响应的历史 Issue/PR 预警。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

### 1. 今日速览

过去 24 小时项目活跃度**高**。Issues 与 PR 更新总量达 93 条，其中新开/活跃 Issues 33 条，待合并 PR 32 条，显示社区参与度与核心开发均处高位。`v1.1.0-rc.1` 版本发布后，项目进入 1.1.0 版本迭代的收尾阶段，重点集中在 **ReBorn WebUI 体验打磨、Skills 系统能力补全、以及 MCP（模型上下文协议）集成稳定性** 三大方向。值得关注的是，Bug Bash 测试（`bug_bash_P1/P2`）提交了多项关于 Agent 行为正确性的缺陷（如幻觉、误报），是当前需要优先处理的稳定性信号。

### 2. 版本发布

- **ironclaw-v1.1.0-rc.1 (1.1.0-rc.1)** - 发布于 2026-08-03
  - **核心更新**：
    - **扩展接入范围**：支持注册任意托管的 MCP 服务器，并可通过 IronHub 深度链接一键安装。
    - **跨渠道文件传递**：引入了持久的文件附件功能，使文件可在不同沟通渠道（如 Slack、Telegram）间流转。
    - **Slack 集成增强**：新增 `/ironclaw` 斜杠命令。
    - **可观测性提升**：对失败场景的错误信息进行了全面优化，使其更清晰易懂。
  - **迁移与注意事项**：此版本为候选发布版（Release Candidate）。生产环境用户在升级前应重点验证 MCP 服务器注册流程与跨渠道文件附件的兼容性。若从 1.0.0 升级，建议查阅完整的 Release Notes 以确认配置项是否有变更。

### 3. 项目进展

今日合并/关闭的高价值 PR 主要集中在基础设施与核心能力补全上：

- **标准化消息框架落地**：PR [#6831](https://github.com/nearai/ironclaw/pull/6831)（已合并）为系统引入了宿主导控的标准消息传递框架，定义了 16 个核心操作与规范的错误分类，为后续开发高质量 Agent 交互提供了统一基座。
- **CI 与依赖维护**：PR [#7261](https://github.com/nearai/ironclaw/pull/7261) 修复了发布流水线在特定条件下的零任务失败问题；同时多个 Dependabot PR（如 [#7196](https://github.com/nearai/ironclaw/pull/7196)）合并，保障了 WASM 生态依赖的时效性。
- **WebUI 体验修复**：关闭了 Issue [#7204](https://github.com/nearai/ironclaw/issues/7204)（聚焦“+ New”按钮与线程打开时的输入框），并合并了对应的前端修正，改善了 WebChat 的交互细节。

这批合并表明项目在夯实底层架构（消息、CI）的同时，也在稳步推进上层用户体验的精细化。

### 4. 社区热点

今日讨论热度最高的议题集中在 **配置化与扩展能力** 上：

- **[EPIC] Configuration-as-Code for IronClaw Reborn** ([#3036](https://github.com/nearai/ironclaw/issues/3036))：以 7 条评论位列榜首。该需求已存在数月，社区对其呼声持续高涨，反映了高级用户对声明式管理复杂实例配置的强烈诉求，期望摆脱对 `.env` 等散落文件的手工维护。
- **Slack 频道作为投递目标** ([#7194](https://github.com/nearai/ironclaw/issues/7194))：3 条评论。这是一项具体的功能扩展请求，用户希望 Agent 不仅能向私有渠道发消息，更能将共享频道设为最终回复的投递目标，这触及了更深层的权限管控与实际协作场景。
- **PDF 文件发送/生成报错** ([#6257](https://github.com/nearai/ironclaw/issues/6257))：2 条评论。一个持续近一个月的 Bug 报告，涉及 `attachments.mime_type` 校验失败，影响用户直接生成并分享 PDF 文件，属于高频操作受阻案例。

以上热点表明，社区用户已不满足于基本的聊天与自动化，开始探索更复杂的配置管理、多渠道协作与文件处理场景。

### 5. Bug 与稳定性

今日 Bug 报告呈现“幻觉”与“验证缺失”两大趋势，多项由 QA（Bug Bash）提交，优先级较高：

- **[P1] Agent 行为正确性**：
    - **虚假状态报告**：[#7246](https://github.com/nearai/ironclaw/issues/7246) 与 [#7247](https://github.com/nearai/ironclaw/issues/7247)。Agent 会虚构自动化运行状态或声称 GitHub 已连接，而实际并未验证，这对用户信任是较大损害。目前未见直接修复 PR。
- **[P2] MCP 交互缺陷**：
    - **身份认证猜测** ([#7251](https://github.com/nearai/ironclaw/issues/7251))：Agent 在无法确认认证类型时，选择向用户询问而非主动探测或发起认证流程。
    - **误导性错误指引** ([#7250](https://github.com/nearai/ironclaw/issues/7250))：网络故障时，Agent 会猜测为认证或 URL 错误，而非直接报告网络异常。
    - **无效端点被接受** ([#7248](https://github.com/nearai/ironclaw/issues/7248))：Agent 接受未验证的 MCP 端点，导致后续运行直接失败。
- **[普通] 功能缺陷**：
    - **跨渠道消息错投** ([#7249](https://github.com/nearai/ironclaw/issues/7249))：执行结果摘要被错误投递到 Telegram，涉及渠道路由逻辑。
    - **Slack 附件不可读** ([#7254](https://github.com/nearai/ironclaw/issues/7254))：IronClaw 无法下载反馈线程中的附件。
    - **CI 误判** ([#7209](https://github.com/nearai/ironclaw/issues/7209))：回归测试门禁因无法识别前端断言风格，导致正确的 PR 被阻塞。已有相关修复讨论。

### 6. 功能请求与路线图信号

将新 Issue 与在途 PR 结合来看，`v1.1.0` 后续版本（或 1.2.0）的路线图已初现端倪：

- **Skills 系统深化**：PR [#7171](https://github.com/nearai/ironclaw/pull/7171) 与 [#6745](https://github.com/nearai/ironclaw/pull/6745) 正在补齐技能安装、选择与挂载的能力，而 Issue [#6941](https://github.com/nearai/ironclaw/issues/6941) 提出了更宏大的“模型自助创建与选择技能”愿景。此外，Issue [#7203](https://github.com/nearai/ironclaw/issues/7203) 要求将虚拟文件系统暴露为真实挂载点，以便技能脚本可直接运行，这可能成为后续版本的关键特性。
- **开发者体验与治理**：针对 `reborn_services.rs` 超过 6400 行的问题（[#7245](https://github.com/nearai/ironclaw/issues/7245)）已建立跟踪，核心模块的架构治理已被提上日程。PR [#7255](https://github.com/nearai/ironclaw/pull/7255) 正在评估引入 APDD 治理框架，显示项目在规模化过程中开始重视流程规范化。
- **Debug 与可观测性**：新增的 Web Debug Inspector 提案（[#7218](https://github.com/nearai/ironclaw/issues/7218)）与诊断存储 PR（[#7230](https://github.com/nearai/ironclaw/pull/7230)）表明，为开发者提供深度的运行内省工具是明确的下一步方向。

### 7. 用户反馈摘要

- **对“民主化”配置的渴望**：`Configuration-as-Code` 议题（[#3036](https://github.com/nearai/ironclaw/issues/3036)）获得持续的 👍 支持，用户明确表达了对“无 Schema、无审计”的手动配置方式的不满，希望获得 git 友好的、可评审的配置体验。
- **对“真实性”的关切**：多个 P1/P2 的 Bug 报告指出，当 Agent 表现出对自身能力的“幻觉”（如虚构自动化状态、谎称 GitHub 已连接）时，用户明显感到困扰和担忧，这会侵蚀对 AI 助手的信任。
- **反馈渠道受阻**：用户反映在 Slack 反馈线程中提交附件时，IronClaw 无法读取文件（[#7254](https://github.com/nearai/ironclaw/issues/7254)），这表明官方反馈路径本身存在可用性问题，值得维护者优先自查。

### 8. 待处理积压

- **长期未关闭的“PDF 错误”**：Issue [#6257](https://github.com/nearai/ironclaw/issues/6257)（PDF 文件 mime_type 错误）自 7 月 19 日创建，已活跃超过两周且评论不多，未见关联的修复 PR。高频功能长期异常，会对用户口碑产生影响，建议维护者排查。
- **老旧的 Epic 与 PR**：
    - PR [#5101](https://github.com/nearai/ironclaw/pull/5101)（CI 复用安装器）自 6 月 20 日开启，已停滞一个半月，建议确认是否仍有效。
    - Epic [#3036](https://github.com/nearai/ironclaw/issues/3036)（配置即代码）虽然有高热度，但长期处于 `suggested_P2` 状态，在 1.1.0 版本内落地可能性低，建议明确其目标版本，避免社区期待落空。
- **依赖更新积压**：今日有包括 `base64`、`toml`、`rstest` 等 9 个依赖的批量更新 PR（[#7237](https://github.com/nearai/ironclaw/pull/7237）），以及 WASM 组件的更新（[#7262](https://github.com/nearai/ironclaw/pull/7262)），多数尚在待合并队列，需关注是否会造成破坏性变更。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

## LobsterAI 项目动态日报 — 2026-08-06

### 今日速览

过去 24 小时项目活跃度处于高位：共 13 条 PR 更新（12 条已合并/关闭，1 条待合并），3 条 Issue 更新（全部为开放状态），并发布 1 个新版本。值得关注的是，今日合并的 PR 聚焦于 OpenClaw 网关锁竞争问题、窗口生命周期挂起防护、启动页活动体验优化与对话搜索入口等方向，同时发布了 2026.8.5 版本，包含企业级账号隔离认证与原生每日签到体验两项功能。此外，两条新提交的 Bug 直指系统提示词重复注入与技能开关静默失效，属于影响核心体验的议题，需要重点关注。

---

### 版本发布

**LobsterAI 2026.8.5**（发布于 2026-08-05）

主要更新：
- 新增原生每日签到体验（`feat(activity)`）：替换原先基于 Web 的签到流程，提供更流畅的客户端内交互。
- 企业版账号级认证与服务流隔离（`feat(enterprise)`）：账号作用域的认证和服务调用路径与企业级配置解耦，降低多租户环境下的配置串扰风险。
- 附带少量样式优化。

**迁移注意事项：** 本次发布未标记破坏性变更。企业版用户需确认账号作用域隔离后的认证配置是否需要同步调整，建议在测试环境验证后再升级生产实例。

---

### 项目进展

**网关稳定性显著加强（PR #2436）**：修复了 OpenClaw 单实例锁文件因自重启竞争条件而被污染的问题。旧逻辑下 LobsterAI 强制结束网关进程时，可能落在锁文件写入中途，导致每次网关重生失败并阻塞长达 30 秒。合并后，Windows 下 TerminateProcess 路径与网关自身重启路径均得到防护。

**应用退出挂起问题修复（PR #2437）**：为 OpenAI 兼容代理和 HTML 预览服务器增加了 drain 计时器与硬性截止时间，长驻 keep-alive 连接（如 OpenClaw 网关产生的）不再阻塞应用退出；同时将主窗口激活限制在首次渲染完成后，避免二次实例唤起时的窗口闪现问题。

**启动页活动体验连续打磨**：合并 4 个相关 PR（#2432、#2433、#2438、#2439），包括：移除世界杯决赛奖励弹窗的自动弹出、裁剪启动海报去除白边、失败提示本地化并保留原始服务端错误用于分析、以及替换为带右上角关闭图标的最新海报素材。

**新增标题栏对话搜索入口（PR #2435）**：在 Artifact 面板开关旁新增对话搜索按钮，复用侧边栏搜索图标和既有搜索工作流，统一初始化路径并适配响应式样式。

**依赖升级批量合并**：dependabot 提交的 cross-env（7.0.3 → 10.1.0）、react-dom（18.3.1 → 19.2.4）、vite（5.4.21 → 8.0.9）三个 PR 均已完成合并，项目已进入 React 19 和 Vite 8 时代。

---

### 社区热点

**#2440 桌面端系统提示词重复注入**（新开，作者 fujingzhai）

该 Issue 以实测数据指出：桌面端每个新会话首条用户消息注入的 `[LobsterAI system instructions]` 块，其中 78% 的内容与 `AGENTS.md` 托管区逐字重复，相当于同一套指令让模型阅读两遍。作者提供了完整的 trajectory.jsonl 路径和采样数据，复现路径清晰，讨论价值高。背后诉求是对系统提示词注入机制的透明化和去重。

**#2441 技能开关按目录名写入但与 frontmatter name 匹配不一致**（新开，作者 fujingzhai）

问题指向同一核心诉求：用户无法持久精简每次新对话的系统提示词。一方面 `OpenClawConfigSync.buildSkillEntries()` 写的是目录名，而 OpenClaw 按 frontmatter name 匹配，不一致时开关静默失效；另一方面 `openclaw.json` 被整文件覆盖，用户没有持久精简入口。这是一个"可复现 Bug + 设计缺口"的组合报告。

---

### Bug 与稳定性

按严重程度排列：

**[严重] 桌面端系统提示词重复注入（#2440）**
- 现象：首条用户消息中注入的系统指令块与 AGENTS.md 托管区 78% 逐字重复，模型被迫重复阅读同一套指令。
- 影响：每个新会话均受影响，浪费 token 且可能干扰指令优先级。
- 当前状态：无 fix PR，待维护者确认注入逻辑与 AGENTS.md 同步机制。

**[严重] 技能开关静默失效（#2441）**
- 现象：开关按目录名写入，OpenClaw 按 frontmatter name 匹配；不一致时用户以为已关闭技能，实际仍被加载。
- 影响：用户无法按预期精简系统提示词，且失效无任何报错提示。
- 当前状态：无 fix PR。

**[一般] NIM 超大群消息中 teamTypeNum 硬编码错误（#1200 / PR #1201）**
- 现象：`nimGateway.ts` 第 917 行对 superTeam 和普通群分别传了错误的类型号，导致 @-mention 机器人时群名显示原始 ID 而非真实群名。
- 影响：超大群用户无法正确显示群名称。
- 当前状态：Issue 自 4 月 1 日起开放，PR #1201 同为 stale 状态尚未合并，修复仅需一行改动，长期未处理。

---

### 功能请求与路线图信号

今日提交的 Issue 中未出现全新功能请求，两条例 Bug 均指向同一方向：**系统提示词注入机制的可控性与精简能力**。结合 #2435（标题栏对话搜索）已合并的情况，用户对对话管理类功能的诉求正在被逐步满足。

需要关注的是，PR #1201（NIM 群名修复）存在已超过 4 个月仍未合并，考虑到修复成本极低（一行改动），建议维护者尽快处理，避免社区对 Issue 响应速度产生负面印象。

---

### 用户反馈摘要

**满意点**：PR 合并速度整体较快，今日 12 条 PR 全部在当日完成合并/关闭，活跃维护节奏明确。

**痛点 1 — 重复指令注入浪费上下文**（#2440）：
> 用户以 `finalPromptText` 实测数据指出 78% 的重复率，说明注入机制缺乏去重设计。用户诉求是桌面端与 AGENTS.md 托管区应有明确的职责边界。

**痛点 2 — 开关失效无感知**（#2441）：
> 用户要求"持久精简进入每次新对话的系统提示词"，但目录名与 frontmatter name 的不一致导致静默失败。用户认为这是设计层面的缺口，不只是 Bug。

**痛点 3 — 长期未响应的老 Issue**（#1200）：
> 4 月提交后长期无维护者介入，评论仅 1 条，用户对修复方案已准备好（PR #1201 仅一行修改），但迟迟未获 review。

---

### 待处理积压

| 编号 | 类型 | 标题 | 状态 | 距今 |
|------|------|------|------|------|
| #1200 / PR #1201 | Bug | NIM 超大群 teamTypeNum 硬编码错误导致群名无法获取（一行修复） | 开放 / Stale | 4 个月+ |
| #1279 | PR | dependabot: cross-env 7.0.3 → 10.1.0 | 已关闭（本日）✅ | — |
| #1280 | PR | dependabot: react-dom 18.3.1 → 19.2.4 | 已关闭（本日）✅ | — |
| #1281 | PR | dependabot: vite 5.4.21 → 8.0.9 | 已关闭（本日）✅ | — |

依赖升级的长期积压已在今日清零。当前最需要维护者关注的是 **#1200/PR #1201**：Issue 已开放超 4 个月，修复方案简单明确，继续搁置将对社区信任度产生不利影响。此外，今日新提交的 **#2440** 与 **#2441** 直指提示词注入机制的核心问题，建议尽快确认修复路径并安排进下一个版本。

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

# CoPaw 项目动态日报

**日期：2026-08-06** | **数据来源：GitHub (agentscope-ai/CoPaw)**


## 今日速览

过去 24 小时项目保持高活跃度：共产生 20 条 Issue 更新（15 条活跃/新开，5 条关闭）和 49 条 PR 更新（28 条待合并，21 条已合并/关闭）。值得关注的是，PR 合并/关闭数量可观，说明维护团队在持续推进代码入库。当前 Bug 类问题（约 8 个）集中在工具调用（MCP/Shell）、流式响应容错和会话历史处理三个方向，且多数已有对应 fix PR，修复响应速度快。另有 2 位首次贡献者提交了 PR（#6723、#6725），社区参与度良好。无新版本发布。


## 项目进展

今日 21 条 PR 被合并或关闭，其中包含一批维护超过一个月的功能分支完成合并，标志着多个重要功能进入主线。

### 已合并/关闭的重要 PR

- **LLM 模型 Fallback 功能完成合并（#5597、#5598）**：后端支持 agent 级与全局级模型故障转移，当前模型重试耗尽后自动切换到备用模型列表；Console 端新增配置 UI（"LLM Model Fallback" 卡片），支持启用/禁用、添加/删除/排序备用模型。该功能从 6 月 29 日提交至今合并，是近期最大的功能落地之一。
- **Console 全局响应式工具类（#5462）**：新增可复用响应式 CSS 工具类，统一移动端适配模式，减少各页面重复的 `@media` 规则。
- **Console 错误时 yield 失败响应（#5447）**：修复 Console 渠道在模型或运行时错误时 UI 永久等待的问题，现在会正确结束响应流。
- **DeepSeek 思考模式推理内容透传修复（#6675，首次贡献者）**：强制为 DeepSeek 多轮对话中每条 assistant wire message 注入 `reasoning_content`，修复上下文压缩导致上游 400 的问题（关联 #6667、#6541）。
- **应用市场列表统一（#6718）**：统一应用市场展示。

### 待合并（重点关注）

- **#6721** 修复 AgentScope 消息的 reasoning-content 重试错误，在重试时启用 formatter 级归一化。
- **#6714** 修复 SSE 流内错误码（如 503 出现在消息而非 HTTP 头）未被重试的问题。
- **#6669** 修复 Windows 桌面版 Chrome 原生消息通信与恢复锁定的启动失败问题。
- **#6525** 用户上下文透明穿透（Chat API → Agent → Tool → MCP → SKILL CLI），实现多日，值得关注。


## 社区热点

今日活跃讨论集中于渠道稳定性与流式错误处理，说明用户对生产环境可靠性有较高诉求。

1. **[#6684 增加频道的重试功能](https://github.com/agentscope-ai/QwenPaw/issues/6684)（4 评论）**：自建 Matrix 服务响应慢于 QwenPaw，频道连接失败后无自动重试机制，需手动重新保存配置才能恢复。用户期望加入健康检测与自动重连。

2. **[#6436 自动模型路由](https://github.com/agentscope-ai/QwenPaw/issues/6436)（3 评论）**：建议从单 agent 固定模型改为按消息类型自动路由（简单对话走小模型、图片走视觉模型、复杂推理走大模型）。讨论热度持续（7/24 创建仍活跃），反映用户对成本与响应速度的精细化诉求。

3. **[#6700 超大工具输出导致历史会话加载卡死（已关闭）](https://github.com/agentscope-ai/QwenPaw/issues/6700)（2 评论）**：数 MB 工具输出写满会话上下文导致网页端卡死，并可能触发上下文窗口超限。该高价值 Bug 已关闭，用户建议增加输出截断与历史消息分页。

4. **[#6732 MCP 工具规律性失效](https://github.com/agentscope-ai/QwenPaw/issues/6732)（2 评论，今日新开）**：MCP 工具每隔数小时失效，重启 Docker 容器后恢复。与 #6684 共同指向 MCP/渠道长连接稳定性问题。


## Bug 与稳定性

### 严重（功能不可用/崩溃）

- **[#6731 execute_shell_command 传入 sandbox_config 时崩溃](https://github.com/agentscope-ai/QwenPaw/issues/6731)**（今日新开）：`replace() should be called on dataclass instances`，2.0.1 及 main 均存在，**已有社区提交待验证**。影响面：内置工具调用。
- **[#6732 MCP 工具规律性失效](https://github.com/agentscope-ai/QwenPaw/issues/6732)**（今日新开）：长时间运行后 MCP 工具无法被调用，重启容器恢复。**无对应 PR**，疑似连接池/心跳问题。
- **[#6700 超大工具输出导致会话加载卡死](https://github.com/agentscope-ai/QwenPaw/issues/6700)**（今日关闭）：已确认并关闭，修复方案待发布。

### 中等（特定场景失败）

- **[#6726 长会话大量工具调用后 400 错误](https://github.com/agentscope-ai/QwenPaw/issues/6726)**：`tool` 角色消息缺少对应的 `tool_calls` 前序消息，2.0.0 桌面版。无对应 PR。
- **[#6698 v2.1.0b1 浏览器 SDK open() 总是失败](https://github.com/agentscope-ai/QwenPaw/issues/6698)**：Playwright 会话连接成功但 `open()` 报 `Target crashed`。无对应 PR，**beta 版本问题**。
- **[#6722 后台 fork 子代理误报完成](https://github.com/agentscope-ai/QwenPaw/issues/6722)**：工作树 finalization 失败仍报告任务成功。**已有 PR #6725（首次贡献者）** 修复。

### 较低（体验/兼容性）

- **[#6687 OpenRouter 多模态探测覆盖文档能力为 false](https://github.com/agentscope-ai/QwenPaw/issues/6687)**：探测结果覆盖已从 OpenRouter 读到的能力声明，导致多模态误判。**已有 PR #6723（首次贡献者）** 修复能力缓存不失效问题，应能覆盖此场景。
- **[#6707 思考模式模型搭配工具调用历史时 400](https://github.com/agentscope-ai/QwenPaw/issues/6707)**：历史含 thinking blocks 与工具调用混排时后续请求失败。**已有 PR #6721** 针对性修复。
- **[#6708 SSE 流内 503 错误不重试](https://github.com/agentscope-ai/QwenPaw/issues/6708)**：HTTP 200 但流内错误消息携带 503 时直接失败。**已有 PR #6714** 修复。


## 功能请求与路线图信号

| 功能需求 | Issue/PR | 状态信号 |
|---|---|---|
| **自动模型路由**（按消息类型选择模型） | [#6436](https://github.com/agentscope-ai/QwenPaw/issues/6436) | 讨论持续中，暂无实现 PR。但 [#6302](https://github.com/agentscope-ai/QwenPaw/pull/6302)（统一 provider 发现/模型元数据/路由，待合并）可视为前置工作 |
| **频道/连接自动重试与健康检测** | [#6684](https://github.com/agentscope-ai/QwenPaw/issues/6684)、[#6732](https://github.com/agentscope-ai/QwenPaw/issues/6732) | 无直接 PR，但 MCP 超时可配置化的 [#6724](https://github.com/agentscope-ai/QwenPaw/issues/6724) 已提出，若实现将缓解部分问题 |
| **MCP 工具调用超时可配置** | [#6724](https://github.com/agentscope-ai/QwenPaw/issues/6724)（今日新开） | 较明确的可实现增强，当前无超时上限会卡死整轮对话，预计会被采纳 |
| **Live artifact canvas（HTML 产物侧边栏渲染）** | [#6730](https://github.com/agentscope-ai/QwenPaw/issues/6730)（今日新开） | 与已提交的 [#6719](https://github.com/agentscope-ai/QwenPaw/pull/6719)（工作区产物卡片 + 持久化）方向一致，后者合并后 canvas 是自然的下一步 |
| **智能体级 token 统计** | [#6392](https://github.com/agentscope-ai/QwenPaw/issues/6392)（今日关闭） | 已关闭，官方未确认是否会做，用户在评论中提及插件开发的可能性 |
| **微信渠道审批操作中文化** | [#6728](https://github.com/agentscope-ai/QwenPaw/issues/6728) | 轻量改动，可能性较高 |
| **Shell 命令 nohup/& 挂起问题** | [#6480](https://github.com/agentscope-ai/QwenPaw/issues/6480) | 已存在多日，无 PR，涉及进程生命周期管理的设计问题，优先级待定 |

综合来看，可靠性（重试、超时、健康检测）是本阶段社区呼声最高的方向，已有多个 PR 覆盖了流式错误与 reasoning-content 场景，但 MCP 长连接稳定性与工具调用的超时保护仍为空白。


## 用户反馈摘要

- **渠道连接稳定性是最大痛点**：#6684 用户描述了 Matrix 自建服务场景下的具体困境——"每次服务器启动后都需要手动重新保存一次频道才能恢复连接"，且伴随 MCP 工具"每隔几个小时失效"（#6732）的系统性体验问题。两者共同指向长连接保活与自动恢复机制的缺失。
- **大输出处理需更健壮**：#6700 用户描述了真实使用场景——"对工作区进行不受限制的递归搜索"产生数 MB 输出后网页端直接卡死，且这类数据"继续参与后续模型请求，触发上下文窗口超限"。用户建议增加输出截断与历史消息分页，该建议对 Agent 类应用有普遍价值。
- **UI 模式命名引发困惑**：#6413 用户直言"完整模式"命名罕见且令人困惑，"其实就是配置"，建议直接通过配置图标进入。说明精简/完整模式的设计未达预期。
- **首次贡献者反馈积极**：两位首次贡献者分别提交了 #6723（能力缓存过期）与 #6725（fork 子代理误报完成）的修复，说明项目的新人引导和 Issue 定级清晰，值得维护者继续维护好这种贡献路径。


## 待处理积压

### 长期未解决或进展缓慢的 Issue

- **[#6480 运行 nohup 命令 agent 卡住](https://github.com/agentscope-ai/QwenPaw/issues/6480)**：7/26 创建至今 10 天无 PR。涉及 shell 进程生命周期与工具调用状态机的设计问题，需要维护团队评估。
- **[#6436 自动模型路由](https://github.com/agentscope-ai/QwenPaw/issues/6436)**：7/24 创建，讨论持续但无实现。考虑到 [#6302](https://github.com/agentscope-ai/QwenPaw/pull/6302)（provider 统一）合并后将是自然延伸，建议维护者给出 roadmap 信号。

### 长期待合并的 PR（需维护者关注）

- **[#6525 用户上下文透明穿透](https://github.com/agentscope-ai/QwenPaw/pull/6525)**：7/28 创建，已超一周无更新，涉及 Chat API 到 SKILL CLI 的 metadata 传递，需要多方 review（安全与隐私需要确认）。
- **[#6669 Windows 桌面版 Chrome 原生消息修复](https://github.com/agentscope-ai/QwenPaw/pull/6669)**：8/4 创建，跨进程与文件锁问题，建议尽快回复测试反馈。
- **[#6302 provider 统一（发现/元数据/路由）](https://github.com/agentscope-ai/QwenPaw/pull/6302)**：7/21 创建，改动量大，是 #6436 等多项需求的前置工作，建议明确合并排期。

### 测试基础设施问题

- **[#6716 集成测试确定性失败](https://github.com/agentscope-ai/QwenPaw/issues/6716)**（已关闭）：`test_auto_update_persists_targets` 在全部 4 个平台 nightly 测试中稳定失败，阻塞夜间集成覆盖率。虽已关闭，但对应修复 PR **#6729 仍在待合并状态**，需确认其已纳入合并队列。

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