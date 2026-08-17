# OpenClaw 生态日报 2026-08-17

> Issues: 500 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-08-17 01:03 UTC

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

OpenClaw 项目今日活跃度极高，过去24小时内 Issues 和 PR 更新均达 500 条，显示出强大的社区参与度和维护响应速度。虽然待合并 PR 数量较多（394条），但关闭/合并了 106 条，且关闭了 40 个 Issues，项目核心功能迭代稳定。当前社区关注意焦点集中在**消息投递可靠性**（尤其是静默失败、消息丢失）和**会话状态一致性**（子代理完成丢失、会话卡死）等 P1 级稳定性问题上，相关 Issue 积累了高热度讨论，是当前项目健康度的主要风险点。新发布的 Release 为性能分析数据，不涉及功能性变更。

### 2. 版本发布

- **pr-124528-profiles** ([查看详情](https://github.com/openclaw/openclaw/releases)): 该 Release 并非功能性版本，而是针对 PR #124528 的 **Gateway CPU 性能剖析数据归档**。内容为从三节点、十二并发轮次 Gateway 测试环境捕获的代表性前后剖析文件，用于事件循环热点对比。**无破坏性变更，无迁移注意事项**，主要面向内核开发者与性能调优人员。

### 3. 项目进展

今日合并/关闭的关键 PR 揭示了项目在以下方面的推进：

- **Web UI 重构与体验优化**：
    - [#120900 [已关闭] feat(ui): review install policy warnings](https://github.com/openclaw/openclaw/pull/120900): 允许管理员在 Control UI 中审阅并确认安装策略警告，提升插件安装的安全可控性。
    - [#122985 [待合并] fix: chat jumps from latest as composer grows](https://github.com/openclaw/openclaw/pull/122985): 修复多行输入框增长时聊天窗口跳动问题，优化阅读体验。
- **开发者工具与 CLI 修复**：
    - [#124948 [待合并] fix(doctor): surface legacy-config copy failures](https://github.com/openclaw/openclaw/pull/124948): 修复 `doctor` 命令在旧配置迁移时静默吞掉错误（如权限不足、磁盘满）的问题，提升可诊断性。
    - [#123975 [待合并] fix(scripts): typecheck hangs forever when tsgo wedges instead of failing](https://github.com/openclaw/openclaw/pull/123975): 修复 `tsgo` 编译器卡死时类型检查无限挂起的问题，改为快速失败。
- **稳定性与配置修复**：
    - [#124914 [待合并] fix: scale Gateway RSS diagnostics to runtime limits](https://github.com/openclaw/openclaw/pull/124914): 修复大内存 Gateway 误报 RSS 压力的问题（关闭 #119189），优化诊断准确性。
    - [#115286 [待合并] fix: config rejects agents.defaults.mediaLocalRoots](https://github.com/openclaw/openclaw/pull/115286): 修复配置项 `agents.defaults.mediaLocalRoots` 被错误拒绝的问题，允许从可信本地目录发送媒体文件。

整体而言，项目正向**更精细的运维控制**、**更稳健的错误处理**和**更友好的 UI 交互**方向迈进。

### 4. 社区热点

今日讨论热度最高的 Issue 反映了用户对**数据可靠性与消息不丢失**的强烈诉求：

- **[#121058 [已关闭] [P1] Silent reply failures still recurring after #116277 closed](https://github.com/openclaw/openclaw/issues/121058)** (评论: 97): 该问题以 97 条评论成为绝对热点。尽管父问题被关闭，用户报告"静默回复失败"仍在发生，监控 cron 持续记录到新故障。这引发了社区对 **修复有效性和回归测试充分性** 的激烈讨论，并直接关联到更广义的消息丢失问题（如 #87561）。
- **[#44925 [P1] Subagent completion silently lost](https://github.com/openclaw/openclaw/issues/44925)** (评论: 31, 👍: 2): 钻石龙虾级 Issue，讨论子代理任务在超时、通知失败等情况下结果静默丢失的多种故障模式，用户呼声很高，希望增加重试与通知机制。
- **[#42475 [P2] Per-agent cost budget enforcement at the gateway level](https://github.com/openclaw/openclaw/issues/42475)** (评论: 26, 👍: 1): 用户对成本控制的需求显著，希望在 Gateway 层面强制设置单代理每日/每月预算上限，防止花费失控。

### 5. Bug 与稳定性

今日报告的 Bug 主要集中在**消息丢失、会话卡死、进程资源泄漏**三大类，按严重程度排列如下：

**高严重度 (P1, 影响核心可靠性)**

- **静默回复失败复发** ([#121058](https://github.com/openclaw/openclaw/issues/121058), 已关闭但复发): 核心消息丢失问题，用户感知强烈，需重点跟进是否开放新 Issue 跟踪。
- **会话投影重建死锁** ([#115908](https://github.com/openclaw/openclaw/issues/115908)): 持续写入下，会话记录投影可能进入不收敛的重建循环，阻塞主线程，卡死所有通道。**无 fix PR**。
- **Codex 回合超时** ([#87744](https://github.com/openclaw/openclaw/issues/87744)): Codex 支撑的 Telegram 回合永不进入 `turn/completed`，导致最终答案丢失。**无 fix PR**。
- **SQLite 清理阻塞事件循环** ([#112423](https://github.com/openclaw/openclaw/issues/112423)): 清理大型 SQLite 记录时在主线程执行完整物化、压缩、I/O，导致卡顿。**无 fix PR**。
- **WhatsApp 图片卡死** ([#96834](https://github.com/openclaw/openclaw/issues/96834)): 入站图片会楔住消息通道约 3 分钟，且多模态运行状态错乱。**无 fix PR**。

**中严重度 (P1/P2, 影响功能与体验)**

- **工具参数静默丢失** ([#53408](https://github.com/openclaw/openclaw/issues/53408)): 长对话后，`write`/`exec` 工具参数被静默丢弃，导致操作失败。**无 fix PR**。
- **内存表无界增长** ([#114612](https://github.com/openclaw/openclaw/issues/114612)): `memory_index_chunks` 等表无保留策略，会逐渐填满磁盘。**无 fix PR**。
- **子代理完成丢失** ([#92433](https://github.com/openclaw/openclaw/issues/92433), 已关闭): 修复后仍需观察，但社区仍报告相关现象。
- **僵尸进程泄漏** ([#97616](https://github.com/openclaw/openclaw/issues/97616)): hook/tool 子进程未被回收，积累为僵尸进程，导致运行时性能下降。**无 fix PR**。
- **权限提升破坏 exec 路由** ([#46786](https://github.com/openclaw/openclaw/issues/46786)): 开启 `tools.elevated.enabled` 后，所有 exec 调用错误地路由到宿主而非沙箱，存在安全风险。**无 fix PR**。

**修复进展**:

- 已有修复 PR 的问题: [#121096](https://github.com/openclaw/openclaw/pull/121096) (遗留插件崩溃, P1), [#124910](https://github.com/openclaw/openclaw/pull/124910) (图像产物投递, P1), [#121116](https://github.com/openclaw/openclaw/pull/121116) (Teams 重复投递, P1), [#115138](https://github.com/openclaw/openclaw/pull/115138) (SQLite 内存映射, 性能), [#107921](https://github.com/openclaw/openclaw/pull/107921) (内存文件查找吞错)。

### 6. 功能请求与路线图信号

今日用户提出的新功能需求主要集中在**精细化管控**与**渠道能力补齐**：

- **成本管控** ([#42475](https://github.com/openclaw/openclaw/issues/42475)): Gateway 级代理成本预算。结合 [#107378](https://github.com/openclaw/openclaw/pull/107378) (MiniMax 计费修复) 和 [#108892](https://github.com/openclaw/openclaw/pull/108892) (Flash Lite 成本估算) 这两个合并/待合并 PR，**成本可见性与控制是当前路线图的明确方向**。
- **生命周期消息路由** ([#45565](https://github.com/openclaw/openclaw/issues/45565)): 将网关生命周期警告路由到专用频道，避免刷屏。
- **Slack Modal 支持** ([#88154](https://github.com/openclaw/openclaw/issues/88154)): 用于收集结构化用户输入。
- **自托管 STT/TTS** ([#45508](https://github.com/openclaw/openclaw/issues/45508)): WebChat 语音能力与自托管配置打通。

**可能进入下一版本的信号**：WebChat 重构是当前 PR 密集区（如 #124301、#123356、#124950），可预测下一版本将包含**显著升级的 Composer 交互体验**。同时，针对新渠道的探索也未停止，如 Twilio RCS ([#105025](https://github.com/openclaw/openclaw/pull/105025)) 和 Feishu 删除消息 ([#121808](https://github.com/openclaw/openclaw/pull/121808))。

### 7. 用户反馈摘要

- **核心痛点：消息丢失与静默失败。** 用户反复报告数据丢失问题（[#121058](https://github.com/openclaw/openclaw/issues/121058), [#44725](https://github.com/openclaw/openclaw/issues/44925)），表明 `message-loss` 和 `session-state` 是影响用户信任度的关键因素。社区对"声称修复但问题复发"表现出强烈不满。
- **对透明度的需求。** 用户希望工具调用的失败（如 loopDetection 警告 [#120449](https://github.com/openclaw/openclaw/issues/120449)）能被显式地呈现给模型或用户，而不是静默记录在服务器端。
- **配置灵活性不足。** 如预检压缩超时时间写死 ([#95553](https://github.com/openclaw/openclaw/issues/95553))、启动消息不可配置 ([#45501](https://github.com/openclaw/openclaw/issues/45501))，用户希望获得更多控制权。
- **多智能体场景的上下文混乱。** 在群聊中，代理会误响应发给其他代理的消息 ([#56692](https://github.com/openclaw/openclaw/issues/56692))，影响协作体验。

### 8. 待处理积压

以下 Issue/PR 长期未获响应或处于停滞状态，建议维护者重点关注：

- **[#38327 [P1] Google Vertex "Cannot convert undefined or null to object"](https://github.com/openclaw/openclaw/issues/38327)**: 自 3 月 6 日创建至今未关闭，影响特定模型使用，且处于 `needs-live-repro` 状态。
- **[#50093 [P1] WhatsApp: Backfill missed messages after reconnection](https://github.com/openclaw/openclaw/issues/50093)**: 断线重连后消息补发功能缺失，自 3 月 19 日提出，属于功能性缺陷，已标记 `needs-live-repro`。
- **[#45494 [P1] Cron jobs don't fast-fail on definitive LLM errors](https://github.com/openclaw/openclaw/issues/45494)**: 定时任务在遇到 500 错误时会耗尽超时窗口，导致工作流阻塞，长期未获处理计划。
- **[#114612 [P2] SQLite unbounded growth: memory_index_chunks](https://github.com/openclaw/openclaw/issues/114612)**: 该问题可能导致**生产环境磁盘被写满**，虽为 P2，但具有数据安全风险，建议提升优先级。
- **PR [#105025 新增 Twilio RCS 渠道](https://github.com/openclaw/openclaw/pull/105025)**: 大型功能 PR，自 7 月 12 日创建，仍处于 `needs proof` 状态，可能因工作量巨大而进展缓慢。

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比分析报告

**报告日期：2026-08-17**

---

## 1. 生态全景

个人 AI 助手开源生态正处于**架构演进与稳定性加固并行的关键阶段**。头部项目（OpenClaw）以日均 500+ PR/Issue 更新的规模持续迭代，但消息丢失、会话卡死等 P1 级可靠性问题成为社区最强烈的痛点；腰部项目（NanoBot、Zeroclaw、NanoClaw）在 Token 成本控制、会话一致性、测试基建加固等方向密集投入；尾部及新晋项目（CoPaw、Moltis、PicoClaw）则在安全加固与渠道扩展上发力，同时面临社区贡献响应滞后的问题。整体态势：**功能创新速度放缓，可靠性、可观测性和成本管控成为全生态的核心竞争焦点**。

---

## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | Release | 健康度评估 | 阶段判断 |
|------|------------|---------|---------|-----------|---------|
| **OpenClaw** | 500+（关闭40） | 500+（合并/关闭106） | 1（性能数据归档） | ★★★☆☆ 高活跃但 P1 稳定性问题复发引发信任危机 | 快速迭代期，稳定性承压 |
| **NanoBot** | 15（关闭4） | 500+（合并仅1） | 无 | ★★☆☆☆ 合并效率极低，大量积压，Token 合并策略缺陷严重 | 积压消化期，架构质疑 |
| **Zeroclaw** | 48（关闭2） | 50（合并4） | 无 | ★★★★☆ 治理活跃，安全 PR 已合入，但测试 flaky 阻塞 CI | 架构演进期，测试基建需加固 |
| **NanoClaw** | 1（误关） | 32（合并/关闭13） | 无 | ★★★★★ 合并效率高，核心架构改动有序落地 | 核心功能落地+稳定性打磨 |
| **PicoClaw** | 3（新开1） | 5（合并1） | 无 | ★★☆☆☆ 社区贡献响应滞后，安全 PR 已 stale | 功能积累期，维护响应需提速 |
| **IronClaw** | 1 | 9（合并2） | 无 | ★★★★☆ 响应迅速（Issue 当日即有 PR），但依赖更新积压 | 常规维护期，依赖升级为主 |
| **LobsterAI** | 10（关闭3） | 17（合并9） | 无 | ★★★★☆ 安全加固成果显著，但大量 Issue 已 stale | 安全补强期，功能创新放缓 |
| **Moltis** | 3（关闭1） | 6（合并5） | 无 | ★★★★☆ 回归修复及时，但 CI 格式检查阻塞主线 | 稳定性修复期 |
| **CoPaw** | 10（关闭4） | 10（合并2） | 无 | ★★★☆☆ 社区贡献活跃（6条新人 PR），但高优 bug 无 PR 跟进 | 社区驱动修复期 |
| **NullClaw** | 0 | 0 | 无 | — | 无活动 |
| **TinyClaw** | 0 | 0 | 无 | — | 无活动 |
| **ZeptoClaw** | 0 | 0 | 无 | — | 无活动 |
| **EasyClaw** | 0 | 0 | 无 | — | 无活动 |

---

## 3. OpenClaw 在生态中的定位

**生态绝对龙头**：OpenClaw 的日 PR/Issue 更新量（500+）是第二名 NanoBot 的 1 倍以上（NanoBot 虽 PR 数相同但绝大多数为积压），是 Zeroclaw 的 10 倍。其核心优势在于：

- **运维精细化程度领先**：Gateway 性能剖析归档（pr-124528-profiles）、RSS 诊断动态阈值、`doctor` 命令错误可诊断性提升，均指向极深的运维打磨，同类无出其右。
- **合并吞吐量优势显著**：日合并 106 条 PR 是 Zeroclaw（4条）的 26 倍、NanoClaw（13条）的 8 倍，体现了极强的维护团队执行力。
- **但技术路线差异明显**：OpenClaw 是**重量级一体化架构**，追求全渠道、全功能覆盖，代价是 P1 级稳定性问题（消息静默丢失、会话死锁）长期无法根治且反复复发（#121058 关闭后复发，97 条评论）；NanoClaw 走**轻量级核心+模块化插件**路线，核心团队可 2 天内完成架构级 PR 合入，社区 PR 却可搁置 64 天（#2752），维护资源向核心倾斜。Zeroclaw 则是 **Rust 语言差异化竞争**，以 RFC 驱动的治理流程和类型安全构建护城河，但社区规模（50 PR/日）与 OpenClaw 不在同一量级。

**结论**：OpenClaw 是生态的功能标杆和规模之王，但也是可靠性问题的最大暴露面；NanoClaw 代表效率极限，Zeroclaw 代表工程严谨性，三者构成差异化竞争格局。

---

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|---------|---------|---------|
| **消息不丢失与可靠性** | OpenClaw（#121058, #44925, #115908）、NanoBot（#5402, #5377）、CoPaw（#7074, #7065） | 静默失败、消息丢失、会话卡死是跨项目共通痛点。OpenClaw 用户对"声称修复但复发"强烈不满；NanoBot 的 Token 合并机制缺陷可致历史消息永久丢失；CoPaw 前端会话层崩溃需刷新恢复。**可靠性已成为智能体助手的最核心信任指标**。 |
| **成本可见性与管控** | OpenClaw（#42475, #107378, #108892）、NanoBot（#5266）、Zeroclaw | 三项目同时涌现成本诉求：OpenClaw 希望在 Gateway 层做代理级预算；NanoBot 用户报告 2 小时消耗百万级 Token 但无详细日志定位；Zeroclaw 在 provider 计费修复上持续投入。**成本不再是锦上添花，而是生产环境刚需**。 |
| **会话上下文一致性与多智能体协作** | NanoBot（#2463）、NanoClaw（#3257）、Zeroclaw（#6954, #10025）、OpenClaw（#56692） | 会话持久化的前缀一致性（NanoBot）、跨会话上下文模块（NanoClaw）、内部发起的 agent turn 绑定（Zeroclaw）、临时 swarm 集群（Zeroclaw #10025）、群聊误响应（OpenClaw）——**多会话、多智能体下的上下文隔离与共享范式正在成为架构设计的核心议题**。 |
| **安全加固：SSRF / 越权 / 敏感信息泄露** | PicoClaw（#3322-3324）、LobsterAI（#1831-1833）、Zeroclaw（#9580, #9582）、IronClaw（#7681）、NanoBot（#5305） | PicoClaw 三个 IM 渠道的 SSRF 防护已 stale、LobsterAI 一次性封堵 IPC 越权与 scheme 白名单、Zeroclaw 的 egress 安全策略分阶段落地。**安全不再单点修补，而是成体系推进（白名单、沙箱、脱敏、策略分层）**。 |
| **标准协议兼容** | Zeroclaw（#8603）、NanoBot（#2463）、LobsterAI（#1813） | Zeroclaw 用户强烈要求 OpenAI Chat Completions 兼容层以接入 Open WebUI/LobeChat 等生态工具；LobsterAI 因未适配 DeepSeek V4 工具调用格式导致接入失败。**生态互联互通的标准化协议适配是外部采用率的关键路径**。 |
| **技能/插件治理与去重** | CoPaw（#7073）、NanoBot（#4467, #5358）、Zeroclaw（#9126） | 自定义技能与内置技能重名导致重复加载、技能文件重复创建、插件 typed config 校验——**插件体系的规范化治理随规模增长成为必要**。 |

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构 |
|------|---------|---------|---------|
| **OpenClaw** | 全渠道、全功能、深度运维控制（性能剖析、诊断、预算） | 高性能场景的开发者/运维，追求广度与可控性 | Rust core + 多语言插件 + Gateway 中心化架构 |
| **NanoBot** | 轻量级、Cron 任务、CLI 交互优化 | 个人自动化爱好者、轻量部署场景 | Python，强调易用性与快速启动 |
| **Zeroclaw** | 安全防护体系、RFC 驱动治理、SOP 控制面 | 安全敏感型企业/开发者 | Rust，类型安全、插件 egress 策略、网络守卫 |
| **NanoClaw** | 多会话并发一致性、通道能力发现、文档记忆 | 复杂多租户生产环境 | Go，核心团队高频率合入、社区 PR 进展缓慢 |
| **PicoClaw** | 多平台 IM 渠道适配（SimpleX、WeCom、微信） | 嵌入式/边缘硬件场景 | Rust，RISC-V 生态关联 |
| **IronClaw** | Agent 自动化触发、Slack 等 IM 集成 | 企业 IM 协作场景 | Rust，依赖更新驱动演进 |
| **LobsterAI** | 网易有道家装场景、IM 实例管理、Agent 模板 | 中国区用户、企业工作场景 | Electron + Node，桌面端侧重 |
| **Moltis** | CalDAV 协议、Vault 安全、频道日志可见性 | 企业工作流（日历、凭证） | Rust，小型模块化 |
| **CoPaw** | 前端体验、视频工具链、OAuth 认证修复 | 泛开发者社区 | 前端侧重，社区贡献驱动 |

---

## 6. 社区热度与成熟度

**第一梯队：快速迭代期（日均 PR 合并 >10）**
- **OpenClaw** — 社区巨型化，但 P1 问题复发正侵蚀信任；维护团队吞吐能力极强，但需警惕"修而不愈"的恶性循环。
- **NanoClaw** — 核心团队效率最高，架构级 PR 2 天内合入；社区 PR 虽慢但正在改善（3 月龄 PR 终被合并）。处于功能落地快车道。

**第二梯队：架构演进/质量巩固期（日均合并 1-10）**
- **Zeroclaw** — 治理流程成熟（RFC 驱动），但测试 flaky 已阻塞无关 PR 合入；安全加固系列合入是亮点。
- **Moltis** — 回归修复及时（当日提交当日修复并合入），CI 格式闸门是当前唯一阻塞项，处于稳定健康的发展状态。
- **IronClaw** — 维护响应迅速（Issue 当日即有 PR），依赖更新稳步推进，但无重大功能创新。
- **LobsterAI** — 安全合规补强成果显著（一日合入 4 个安全 PR），但大量 Issue 已 stale 四个月，社区信任在流失。

**第三梯队：积累期/响应滞后（日均合并 ≤1）**
- **NanoBot** — 合并效率极低（500+ PR 仅合 1 条），Token 合并缺陷、`CancelledError` 崩溃等核心问题长期未修；社区对架构的质疑（#2463）直指底层数据流设计，需警惕信任崩塌风险。
- **CoPaw** — 社区贡献活跃（6 条新人 PR），但高优 bug（#7074、#7065）无 PR 跟进，核心维护团队投入不足。
- **PicoClaw** — 安全 PR 已 8 天无回应进入 stale，SimpleX 渠道从提交到关闭历时两个月；维护带宽紧张。
- **NullClaw / TinyClaw / ZeptoClaw / EasyClaw** — 无活动，处于休眠或废弃状态。

---

## 7. 值得关注的趋势信号

1. **"可靠性 > 功能"的用户心智已经确立。** OpenClaw #121058 的 97 条评论和复发事件表明，社区对"声称修复但问题复发"的容忍度已经降到极低。开发者应把消息不丢失、状态一致性作为架构设计的第一原则，而非功能迭代的附属品。NanoClaw #3254 的"双阶段批量选择"可作为防上下文洪峰挤占任务的参考范式。

2. **成本可观测性是生产落地的硬门槛。** 三个独立项目（OpenClaw、NanoBot、Zeroclaw）同时涌现成本管控需求，且 OpenClaw 的 Gateway 级预算、NanoBot 的 Token 消耗日志，都指向"细粒度成本归因 → 预算强制 → 超限熔断"的三层控制模型。建议开发者从第一天就建立 Token 消耗追踪体系。

3. **安全加固正在从"单点修补"走向"体系化防线"。** PicoClaw 的 SSRF 批次修复、LobsterAI 的 IPC + scheme + 日志脱敏三连修、Zeroclaw 的 egress 策略分层（守卫→策略→仪式），说明安全已从个别 CVE 修复演进为从入站、出站、进程隔离、日志脱敏全链路覆盖的体系化设计。

4. **标准协议兼容（OpenAI Chat Completions 等）正成为生态互联的关键基础设施。** Zeroclaw #8603 的社区热度（22 评论）和 LobsterAI 的 DeepSeek V4 接入失败，共同指向一个现实：**智能体工具想获得生态流量，必须提供标准协议兼容层**，否则将面临持续的工具链适配成本。

5. **"临时性多 agent 集群"（swarm）概念新兴。** Zeroclaw #10025 提出的 ephemeral agent swarms + TUI 编排，与 OpenClaw 的多代理协作（#56692 误响应问题）、NanoClaw 的跨会话上下文模块形成呼应。静态配置的 agent 正在向"按需动态编组"演进，这可能是下一阶段的架构竞争焦点。

6. **测试基建的稳定性正在成为开发效率的隐形瓶颈。** Zeroclaw 的 #10006（endpoint_lock 测试 flaky）已阻塞无关 PR 合并，Moltis 的格式闸门因文件超长变红。**CI 的确定性（确定性时钟、隔离测试夹具）应被视为与功能代码同等重要的基础设施投资**。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

### 1. 今日速览

项目整体活跃度**中等偏高**。过去24小时内，Issue 更新15条（新开/活跃11条，关闭4条），PR 更新500条（但绝大多数为长期积压的待合并 PR，仅1条完成合并或关闭）。当前无新版本发布。社区讨论焦点集中在**Token 消耗过高与合并策略失效**（#5266, #5402, #5377）以及**架构层面的会话前缀一致性问题**（#2463）。此外，安全相关的 `exec.allowPatterns` 绕过漏洞（#5305）已被关闭，但需关注其修复是否已随代码库合入。

---

### 2. 版本发布

无新版本发布。

---

### 3. 项目进展

今日仅有 1 条 PR 被合并或关闭，但所有高评论 PR 均显示为 `[OPEN]` 或 `[CLOSED]`（但未合并）。结合 Issue 状态和 PR 标题，可推断以下进展：

- **PR #4329 (CLOSED)**：`feat(cli): add native TypeScript terminal UI`。该 PR 虽被标记为关闭，但在新 PR #5406 中被明确指出是**误标记为合并**，且 `main` 分支已回滚。因此该项目并未真正落地，但**新的替代 PR #5406** 已重新提交，表明该功能仍在推进中，且避免了历史提交污染。
- **PR #5406 (OPEN)**：作为 #4329 的继承者，重新引入了原生 TypeScript 终端 UI。这表明 CLI 体验升级仍是项目重点方向之一。
- **Issue #2185 (CLOSED)**：关于升级后 `gemini-3-flash-preview` 无法使用的回归问题被关闭，推测已通过配置或代码修复解决。

**结论**：项目今日在代码合并层面几乎无净推进，核心工作集中在处理历史 PR 的纠错与重开，以及回应社区反馈。

---

### 4. 社区热点

- **[#2463] [OPEN] Architectural issue: nanobot does not preserve the exact prompt prefix it previously sent** (评论: 15)
  - **链接**: [Issue #2463](https://github.com/HKUDS/nanobot/issues/2463)
  - **诉求**: 核心架构问题。用户指出持久化的会话历史与发送给模型的真实 prompt 前缀不一致，这与 OpenAI 的缓存机制存在根本冲突，可能导致缓存命中率极低或行为异常。这是对**底层数据流设计**的质疑，属于高优先级架构反馈。

- **[#5266] [OPEN] [enhancement] Logs about token consumption (too many tokens are burned)** (评论: 14)
  - **链接**: [Issue #5266](https://github.com/HKUDS/nanobot/issues/5266)
  - **诉求**: 量级极高的 Token 消耗（2小时百万级）。用户强烈需要详细的 Token 消耗日志来定位是哪个调用、哪个环节消耗了资源。这反映了在长时间运行场景下，**可观测性缺失**已成为核心痛点。

- **[#5305] [CLOSED] [Security] `exec.allowPatterns` allowlist bypass** (评论: 3)
  - **链接**: [Issue #5305](https://github.com/HKUDS/nanobot/issues/5305)
  - **诉求**: 安全漏洞。允许列表绕过可导致链式 shell 命令执行。该问题已被关闭，但需要确认修复是否已合入主分支，否则影响面较大。

---

### 5. Bug 与稳定性

按严重程度排序：

- **严重（安全）**：
  - **[#5305] (CLOSED)** `exec.allowPatterns` 允许列表绕过，可执行未授权的链式命令。虽然 Issue 已关闭，但建议维护者确认修复 commit 已包含在最新代码中。

- **高（核心功能失效）**：
  - **[#5402] [OPEN]** Token 合并（consolidation）永不触发。tiktoken 估算值持续低于 API 实际值，导致 `last_consolidated` 指针推进异常，最终可能引发上下文溢出。属于**逻辑性错误**，暂无关联 fix PR。
  - **[#5377] [OPEN]** Consolidation 截断输入时推进了完整的消息批次索引，导致被截断的历史消息永久丢失。与 #5402 同属合并机制的严重缺陷。

- **中（稳定性/回归）**：
  - **[#4864] [OPEN]** `<tool_call> <function=complete_goal>` 进入死循环，参数解析错误（字符串 vs JSON）。社区标记为近期更新引入的回归。
  - **[#5373] [CLOSED]** Cron 调度器在单次持久化失败后永久停机，原因在于 `_arm_timer()` 未在 `try/finally` 保护范围内。该问题已解决，但需注意该修复是否覆盖所有异常路径。

---

### 6. 功能请求与路线图信号

以下功能请求与当前开放 PR 方向一致，有可能被纳入后续版本：

- **会话协作与身份**：
  - **[#5358] PR** 引入 WebUI 会话 @提及协作功能。
  - **[#4467] Issue** Dream 应更新现有 skills 而非创建重复文件（用户强烈期望）。
- **终端体验**：
  - **[#5406] PR** 再次推进 TypeScript 终端 UI。
- **通道能力增强**：
  - **[#5289] Issue** Telegram 支持贴纸和主动消息回应（已有详细设计）。
  - **[#5251] Issue** WebUI 支持 MCP Apps host。
- **资源控制**：
  - **[#5266] Issue** 详细的 Token 消耗日志（呼声极高，可能转为内置功能）。
  - **[#5298] Issue** 针对大型 MCP 工具集进行 schema 预算控制。

---

### 7. 用户反馈摘要

- **配置持久化痛点**：PR #1025 与 #1073 均指出 `save_config()` 会静默丢弃未知字段（如自定义 provider `openai-codex` 的配置），且 OAuth Token 无法保存。这导致用户升级或重启后配置丢失，影响信任度。
- **上下文管理不满**：多个 Issue（#5377, #5402）显示当前 Token 估算与合并策略不可靠，存在丢失对话历史或超出上下文窗口的隐性风险。用户对长对话的稳定性表示担忧。
- **缓存效率诉求**：PR #1037 建议将当前时间移动到系统提示词末尾以利用隐式缓存。Issue #2463 则指出更深的会话一致性问题是利用率低下的根源，用户希望从根本上修复数据流，而非仅增加缓存参数。
- **对并发与崩溃的抱怨**：PR #1072 指出工具调用取消（`CancelledError`）会直接导致进程崩溃，而非优雅降级，说明在异常处理方面尚需加强。

---

### 8. 待处理积压

以下为长期未合并或未回应的 PR/Issue，需维护者关注：

- **高风险安全/稳定性 PR（已标记冲突数日）**：
  - [PR #1072](https://github.com/HKUDS/nanobot/pull/1072)：修复 `CancelledError` 导致进程崩溃，距今已近6个月，需尽快合并。
  - [PR #1149](https://github.com/HKUDS/nanobot/pull/1149)：新增 PromptGuard 注入检测，但长时间未审核。
- **新功能但未获回音**：
  - [PR #1195](https://github.com/HKUDS/nanobot/pull/1195)：Telegram Forum Threads 支持，自2月起处于 `[conflict]` 状态。
  - [PR #1306](https://github.com/HKUDS/nanobot/pull/1306)：Discord 语音/音频支持，功能完整但长期搁置。
- **重大功能待决策**：
  - [PR #1032](https://github.com/HKUDS/nanobot/pull/1032)：子代理控制面板 MVP（`list/kill`），是子代理功能闭环的关键部分，已等待数月。

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-08-17

## 今日速览

过去 24 小时项目保持高强度运转：48 条 Issue 更新中新增/活跃 46 条，50 条 PR 更新中待合并 46 条，社区讨论热度集中在多份高优先级 RFC（聊天补全协议、统一附件架构、安全态势策略等）。值得关注的是，测试稳定性问题成为当前最大痛点——三条 P1 测试任务（#9965、#10006、#10013）直指并行运行时门禁下的间歇性失败，其中 #10006 已影响到无关 PR 的合并检查。新提交的 "zeroclaw swarm" RFC（#10025）提出临时 agent 集群与 TUI 编排方案，是近期最具想象力的功能提议。总体判断：项目处于架构演进期，治理活跃，但测试基建需要优先加固。

---

## 项目进展

### 今日合并/关闭的 PR（4 条）

| PR | 标题 | 要点 |
|---|---|---|
| [#9580](https://github.com/zeroclaw-labs/zeroclaw/pull/9580) | fix(security): harden built-in HTTP egress on the shared network guard | **重要安全加固已合入。** 将网络分类原语下沉到 `zeroclaw-infra::net_guard`，拒绝所有已审计的非全局 IPv4/IPv6 地址。该 PR 是三个连续安全 PR（#9137/#9582/#9584 基于此）的共享地基，为插件 egress 策略铺平道路。[#9137](https://github.com/zeroclaw-labs/zeroclaw/pull/9137)、[#9582](https://github.com/zeroclaw-labs/zeroclaw/pull/9582)、[#9584](https://github.com/zeroclaw-labs/zeroclaw/pull/9584) 都等待此基础合入。 |
| [#9416](https://github.com/zeroclaw-labs/zeroclaw/pull/9416) | docs(tools): document that AllToolsResult.tools is the pre-filter registry | 小型文档修正，消除了 `AllToolsResult.tools` 与 `unfiltered_tool_arcs` 字段命名上的歧义。 |

### 今日关闭的 Issue（2 条）

| Issue | 标题 | 说明 |
|---|---|---|
| [#9953](https://github.com/zeroclaw-labs/zeroclaw/issues/9953) | [Bug]: SOP step schema validation rejects a double-encoded output object | 已关闭，修复已完成合入。 |
| （另一条已关闭 Issue 未在 Top 30 列表中展示） | — | — |

### 值得关注的待合并 PR

- **[#9606](https://github.com/zeroclaw-labs/zeroclaw/pull/9606) fix(providers): honor runtime proxy for OpenAI Responses** — P1 修复，让 OpenAI Responses API 路径遵循运行时代理配置。安全相关，建议优先审查。
- **[#9547](https://github.com/zeroclaw-labs/zeroclaw/pull/9547) chore(channels): upgrade CPAL to 0.18** — 音频依赖大版本升级，涉及 Voice Wake 的 API 迁移，可能有行为变化需要验证。
- **[#9126](https://github.com/zeroclaw-labs/zeroclaw/pull/9126) feat(plugins): validate typed instance config** — XL 规模功能 PR，要求插件的 `config_read` 清单必须声明封闭的 Draft 2020-12 schema。属于插件系统治理的一部分。
- **[#9808](https://github.com/zeroclaw-labs/zeroclaw/pull/9808) chore(deps): bump rust-all group with 46 updates** — 大规模依赖更新（含 tokio、clap 等核心库），需关注回归风险。

---

## 社区热点

### 讨论热度最高的议题（按评论数排序）

**1. [#6808 — RFC: Work Lanes, Board Automation, and Label Cleanup](https://github.com/zeroclaw-labs/zeroclaw/issues/6808)（23 评论）**
治理流程 RFC，已进入 0.8.x 的 rollout 阶段（Rev. 25）。讨论围绕工作路由自动化和标签清理展开，社区对维护者工作流优化的持续关注度很高。

**2. [#8603 — RFC: ZeroClaw Chat Completions profile](https://github.com/zeroclaw-labs/zeroclaw/issues/8603)（22 评论）**
**社区最关注的功能方向之一。** 用户要求通过 OpenAI Chat Completions 协议暴露 agent 能力，让 Open WebUI、LobeChat、Continue.dev、Aider、LangChain 等生态工具可以直接接入。这反映了社区对"标准协议兼容"的强烈需求，是 ZeroClaw 从自有协议走向生态集成的重要信号。

**3. [#9488 — RFC: Unified attachment architecture for web chat and channels](https://github.com/zeroclaw-labs/zeroclaw/issues/9488)（17 评论）**
统一 Web 聊天与各 channel 的附件架构，由 @NiuBlibing 提交（AI 辅助起草）。涉及 web、gateway、runtime、security 多个领域，风险等级 high。

**4. [#6954 — RFC: Provenance, conversation binding for internally initiated agent turns](https://github.com/zeroclaw-labs/zeroclaw/issues/6954)（14 评论）**
已完成 Rev. 2 重写，补充了身份稳定性、绑定并发、回复生命周期等边界澄清。属于运行时核心语义的精细化。

**5. [#6971 — RFC: Security posture, credential boundaries, ingress policy](https://github.com/zeroclaw-labs/zeroclaw/issues/6971)（14 评论）**
安全态势的顶层设计讨论，涵盖凭证处理、运行时隔离、入口信任、沙箱等主题。社区对安全治理的关注度持续走高。

### 新晋热点

**[#10025 — RFC: zeroclaw swarm — ephemeral agent swarms with a crush-style TUI](https://github.com/zeroclaw-labs/zeroclaw/issues/10025)（8 月 16 日提交，已 1 评论）**
虽然评论数尚少，但该提案展示了"临时性多 agent 集群 + TUI 编排"的场景——用户无需配置静态 agent 条目，通过 crush 风格 TUI 快速组建一个围绕单一目标的 agent 团队。这与现有静态 `[agents.<alias>]` 配置形成鲜明对比，若被采纳将显著降低多 agent 协作的使用门槛。

---

## Bug 与稳定性

### P1 严重级别（3 条）

**1. [#10013 — Edge TTS cancellation test can miss fake child startup](https://github.com/zeroclaw-labs/zeroclaw/issues/10013)（S1 - workflow blocked）**
`Parallel Runtime Test` 在 master 上间歇性失败，fake Edge TTS child 未写入输出路径 sidecar 文件导致竞态。**这是持续性的 CI 稳定性问题，需优先处理。**

**2. [#10006 — endpoint_lock test flakes under Parallel Runtime Test gate](https://github.com/zeroclaw-labs/zeroclaw/issues/10006)（in-progress）**
已在 PR #9137 上造成红色检查（run 31847503828），影响到无关 PR 的合并。**该问题会直接阻碍项目合入速度。**

**3. [#9655 — Approval cards carry no position in Telegram](https://github.com/zeroclaw-labs/zeroclaw/issues/9655)（S1？— follow-up）**
一条消息产生多个工具调用时，多张 approval card 无法区分。已接受（accepted），当前无明确 fix PR。

**4. [#9811 — /health reports a channel healthy that has never connected](https://github.com/zeroclaw-labs/zeroclaw/issues/9811)**
Telegram channel 配置错误 token 时，`/health` 仍报告 healthy。运维可见性问题，已接受待修复。

**5. [#9965 — Runtime-written executable test fixtures hit ETXTBSY](https://github.com/zeroclaw-labs/zeroclaw/issues/9965)**
`build_cron_shell_command_executes_with_custom_native_shell` 测试失败，已接受。

**6. [#10020 — Agentic independent delegates ignore target thinking policy](https://github.com/zeroclaw-labs/zeroclaw/issues/10020)（in-progress）**
`mode = "independent"` 的 agentic delegate 调用未应用目标 agent 的 `thinking` 配置，属于运行时行为不一致问题。

**7. [#10037 — POST /api/cron silently stores invalid session_target as isolated](https://github.com/zeroclaw-labs/zeroclaw/issues/10037)（in-progress）**
API 层接受了非法 `session_target` 值且静默降级为 "isolated"，而 `cron_add` 工具会正确拒绝。属于 API 与工具行为不一致。

### 稳定性相关修复任务（已立项）

- [#10011](https://github.com/zeroclaw-labs/zeroclaw/issues/10011) — daemon heartbeat 测试避免运行时写可执行文件（help wanted）
- [#9965](https://github.com/zeroclaw-labs/zeroclaw/issues/9965) — 修复 ETXTBSY 测试夹具问题

### 已修复（今日关闭）

- **[#9953 — SOP step schema validation rejects double-encoded output](https://github.com/zeroclaw-labs/zeroclaw/issues/9953)** — 已关闭，修复合入。

---

## 功能请求与路线图信号

### 高可能性进入下一版本的功能

**1. OpenAI Chat Completions 兼容层（#8603）**
社区呼声最高的功能之一，多个主流客户端（Open WebUI、LobeChat、Aider、LangChain）等待接入。当前已积累 22 条讨论，RFC 评审中，有较大概率进入路线图。

**2. 插件 egress 安全策略系列（#9580 + #9582 + #9584 + #9137）**
随着 #9580 合入，三个阶段的安全策略正在推进中。egress grant ceremony（#9584）和 host-owned egress policy（#9582）将成为插件安全基线的关键组成。

**3. 统一附件架构（#9488）**
Web 聊天和 channel 的附件处理目前割裂，该 RFC 若通过将统一体验。17 条评论，讨论活跃。

**4. 知识图谱 per-agent 归属（PR #9745）**
当前共享 SQLite 图允许 agent 互相读取/修改数据，存在越权风险。PR 已提出，待审查合入。

**5. 临时 agent swarm + TUI（#10025）—— 潜在新方向**
8 月 16 日刚提交，进入 RFC 评审早期阶段。概念新颖，如社区响应积极可能成为 0.9 的功能亮点。

### 已接受但等待资源排期

- [#6998](https://github.com/zeroclaw-labs/zeroclaw/issues/6998) — Schema-validated memory consolidation with bounded fallback（accepted）
- [#7881](https://github.com/zeroclaw-labs/zeroclaw/issues/7881) — Provider fallback circuit breakers（accepted）
- [#7883](https://github.com/zeroclaw-labs/zeroclaw/issues/7883) — Intra-family provider fallback notices（accepted）
- [#7887](https://github.com/zeroclaw-labs/zeroclaw/issues/7887) — Date-range conditional schedules for cron jobs（accepted）
- [#8288](https://github.com/zeroclaw-labs/zeroclaw/issues/8288) — SOP 里程碑（daemon-owned SOP control plane 推进至 5/5）
- [#9972](https://github.com/zeroclaw-labs/zeroclaw/issues/9972) — 消除本地化边界外的字面量输出

---

## 用户反馈摘要

**🔒 安全与信任是核心关切。** 多条高热度 Issue 围绕安全态势（#6971）、统一附件安全（#9488）、egress 策略（#9582）展开，同时知识图谱越权问题（#9745）引起社区注意。用户显然关注 agent 之间的数据隔离与访问控制。

**🔌 标准协议兼容是明确需求。** #8603 的讨论热度直接反映了用户对 ZeroClaw 接入现有 AI 生态（Open WebUI、LobeChat 等）的迫切期望，这可能是提升项目外部采用率的关键路径。

**⚙️ CI 稳定性影响开发者体验。** #10006 在无关 PR 上造成红色检查，直接拖慢合并速度。若并行运行时门禁的间歇性失败不能快速解决，可能消耗维护者大量排障时间。

**🤝 Telegram 群组协作场景值得关注。** PR #9772 提出 per_user_session 切换以支持共享群组会话——多个用户在同一个群/主题中协作时，目前会话按 Sender 隔离导致协作不便。该 PR 有实际场景支撑。

**🧠 自动 agent 编排需求浮现。** 社区一方面要求更灵活的多 agent 协作（#10025 swarm 提案），另一方面也关注 agent 生命周期事件的插件订阅能力（#7822），指向更复杂的编排与观测需求。

---

## 待处理积压

### 长期未合入的关键 PR

| PR | 标题 | 提交日期 | 状态标签 | 关注原因 |
|---|---|---|---|---|
| [#9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109) | feat(providers): add native Hailo-Ollama support | 2026-07-17 | needs-author-action | 已超过 30 天，带 `needs-author-action`，需要作者响应维护者反馈 |
| [#9126](https://github.com/zeroclaw-labs/zeroclaw/pull/9126) | feat(plugins): validate typed instance config | 2026-07-18 | needs-author-action | 同上，插件 schema 验证功能，XL 规模 |
| [#9002](https://github.com/zeroclaw-labs/zeroclaw/pull/9002) | fix(gateway): keep agent turns alive after viewer disconnect | 2026-07-11 | needs-author-action | P1 修复（WebSocket 断开不应取消 agent 任务），已搁置超过一个月 |
| [#9212](https://github.com/zeroclaw-labs/zeroclaw/pull/9212) | feat(eval): gate CI on replay regression suite | 2026-07-20 | needs-author-action | 将回归测试套件设为 CI 硬门禁，对质量保障有意义 |
| [#9745](https://github.com/zeroclaw-labs/zeroclaw/pull/9745) | fix(memory): add per-agent attribution to knowledge graph | 2026-08-04 | needs-author-action | 安全相关（agent 数据隔离），XL 规模 |
| [#9854](https://github.com/zeroclaw-labs/zeroclaw/pull/9854) | fix(providers): derive context-window discovery from family registry | 2026-08-08 | needs-author-action | 消除硬编码 provider 列表 |
| [#9853](https://github.com/zeroclaw-labs/zeroclaw/pull/9853) | chore(workspace): remove aardvark-sys and zeroclaw-robot-kit | 2026-08-08 | needs-author-action | 解除 crates.io 发布阻塞（#9381） |

### 需维护者关注

- **[#8692 — Maintainer decision queue for RFCs](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)** — 这是维护者决策队列跟踪器，当前大量 RFC 等待决策。该 tracker 本身就是积压压力的信号。
- **[#6165 — RFC: Prefer lighter ZeroClaw core through external integrations](https://github.com/zeroclaw-labs/zeroclaw/issues/6165)** — 已提交 3 个多月，14 条评论，仍然需要维护者评审。
- **[#10006](https://github.com/zeroclaw-labs/zeroclaw/issues/10006)** — 已影响无关 PR 的 CI 门禁，建议优先响应。
- **`needs-author-action` 标签堆积明显** — 当前有 6-7 条 PR 等待作者响应，如果作者长期缺席，建议维护者明确设定超时关闭或接手策略。

---

*本日报数据来自 zeroclaw-labs/zeroclaw GitHub 仓库 2026-08-16 至 2026-08-17 的公开活动信息。*

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 2026-08-17

## 今日速览

过去 24 小时项目活跃度较高，共产生 3 条 Issue 更新和 5 条 PR 更新。新提交的 1 个 Slack 媒体上传 Bug 是日内唯一新开 Issue，3 个发布于 8 月 9 日的 PR 已进入 stale 状态，尚未获得维护者明确反馈。社区对安全加固（SSRF 防护）与平台集成（Exa 搜索、Telegram 表格渲染）的关注度持续升温，但核心维护团队在这批议题上的响应仍显滞后。项目当日无新版本发布，整体处于功能积累与安全修复并行推进的活跃期。

## 项目进展

**仅 1 个 PR 被合并/关闭：**

- **[#3193] Added simplex channel type**（`[CLOSED] [stale]`，作者: dim，创建于 2026-06-27）—— 在关闭前已标记为 stale，历时近两个月。该 PR 新增基于 SimpleX 协议的信道类型（标注为 `✨ New feature`）。它的合并状态为项目扩展多平台接入能力画上了句号，但长期延迟的合并节奏与 stale 标记相符。

**当前待合并 PR（4 个）：**

- **[#3299] Add native Exa web search provider** —— 作为原生 `tools.web` / `web_search` 提供商接入 Exa 的 `POST /search` API，支持现有 `d`/`w`/`m`/`y` 时间范围过滤。扩展到现有搜索后端之外的新提供商，增强搜索功能的可插拔性。
- **[#3322] fix(channels): block private targets on inbound media downloads** —— 将 SSRF 防护（`BlockPrivateTargets`）扩展到 QQ / Telegram / Discord / LINE / Slack 的入站附件下载路径，阻止恶意媒体 URL 访问内网/回环地址。
- **[#3323] fix(wecom): use CreateSafeHTTPClient for media downloads** —— 为 WeCom 媒体下载单独构建安全 HTTP 客户端，防止重定向到回环/私网主机。
- **[#3324] fix(weixin): use CreateSafeHTTPClient for media downloads** —— 与前者同步修复微信渠道的同类问题。

这三个安全 PR（#3322、#3323、#3324）构建了一个成体系的媒体下载 SSRF 加固链条，配合此前 OneBot 渠道的既有防护，基本覆盖了全部主要 IM 渠道。目前四者均处于 stale 状态，尚未合并。

## 社区热点

本日社区讨论热度不高，各条目均无高互动量，关注焦点集中在以下两个持续更新的议题上：

- **[#3302] [Feature] Support OAuth 2.1 for MCP servers same as #2546**（3 条评论）—— 用户希望通过 OAuth 2.1 增强 MCP 服务器的鉴权能力，明确标注为 "Nice-to-Have / Enhancement"。此前 #2546 提出过相同诉求，侧面反映社区对此功能存在持续需求，但影响力有限。

- **[#3325] [Feature] Render Telegram tables with rich messages**（1 条评论）—— 请求在 Telegram 回复中支持原生可视化表格渲染，而非退化为纯文本或代码块。该诉求基于 Telegram Bot API 10.1 引入的新能力，属于聚焦单一平台体验优化的需求。

这两条议题背后反映的是同一类诉求：多平台接入的一致体验与官方 API 新特性的跟进速度。二者均已被标记为 `[stale]`，若无进一步推进，存在被自动关闭的风险。

## Bug 与稳定性

本日仅报告 1 个新 Bug，无崩溃或回归类问题。

**中低严重度（阻断单渠道核心功能，但不影响全局稳定性）：**

- **[#3338] [BUG] Slack does not attach image media content** —— 所有 Slack 媒体上传都会失败，报错 `file.upload.v2: file size cannot be 0`。根因在于 `SendMedia` 构造 `slack.UploadFileParameters` 时未设置 `FileSize` 字段，导致 SDK 在上传前直接拒绝。预期为一次性修复（补充文件大小字段即可），目前已有定位精确的根因分析，尚未有对应修复 PR 提交。

## 功能请求与路线图信号

本日新提交的功能请求有限，结合已有 PR 可观察到以下趋势：

- **OAuth 2.1 支持（#3302）** —— 社区对 MCP 服务器身份认证现代化的需求再次被提出（此前 #2546 即有记录）。该请求被标记为 "Nice-to-Have"，短期进入路线图的优先级有限，但重复提出表明用户侧存在真实诉求，值得维护团队规划排期。

- **Telegram 原生表格渲染（#3325）** —— 依赖 Telegram Bot API 10.1 的新能力，属于跟进平台新特性以提升展示质量的需求。仅 1 条评论，关注度一般。

**可预见的下一版本纳入项（来自已就绪 PR）：** Exa 搜索提供商（#3299）一旦审查通过即可合并，是搜索功能增量升级的有力候选。三个 SSRF 加固 PR（#3322、#3323、#3324）同属安全修复，大概率作为批次处理并进入下一补丁版本。

## 用户反馈摘要

- **Slack 媒体上传bug 的反馈（#3338）**—— 用户明确指出失败发生在网络调用前的 SDK 校验阶段，已完成根因定位，描述精准（`file.upload.v2: file size cannot be 0`）。展示其具备较强的排障能力，同时暗示该 Bug 在基础使用场景中容易被触发。

- **OAuth 2.1 议题的重复提出（#3302）**—— 用户引用了之前功能请求 #2546 以说明诉求的连续性，语气直接且带有"再次提出"的色彩。这通常表明该功能缺口长期未获解决，用户存在一定的耐心消耗迹象，建议维护团队明确给出预期时间表或拒绝理由。

## 待处理积压

- **安全加固三件套 PR（#3322、#3323、#3324）** —— 三个渠道 SSRF 防护 PR 已创建 8 天且无维护者回应，正进入 stale 状态。考虑到它们修复的是安全漏洞，建议优先审查并合并。
- **Exa 搜索提供商（#3299）** —— 完整度较高的功能型 PR，已滞留超 3 周无进展信号，若功能符合路线图定位，建议尽快纳入审查队列。
- **新增 SimpleX 信道（#3193）** —— 已关闭，但因其从提交到关闭历时近两个月，提醒维护者注意此类长期未处理 PR 的最终处置，避免社区贡献者体验受损。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

### NanoClaw 项目动态日报 — 2026-08-17

---

#### 1. 今日速览

NanoClaw 过去 24 小时保持高强度的迭代节奏，核心团队持续在会话管理、通道适配与权限系统上发力。尽管 Issues 侧仅有 1 条误操作关闭，但 PR 侧活跃度极高，共 32 条更新，其中 13 条已合并或关闭，19 条尚在审查中。值得注意的是，今日合并的 PR 多为成熟的架构改动（如跨会话上下文、双阶段批量选择），并伴随多个小修小补的 PR 快速跟进，表明项目已进入核心功能落地与稳定性打磨并行的阶段。此外，一个 3 月龄的社区功能 PR（OpenMail 支持）终于被合并，说明社区贡献的接受周期正在缩短。项目整体健康度很高，但大量待合并 PR 也意味着维护者需加速审查队列消耗。

---

#### 2. 版本发布

无新版本发布。

---

#### 3. 项目进展

今日核心进展集中在合并的 13 条 PR 上，主要推进了三块工作：

**核心会话与投递架构重构（核心团队）**
- **[#3284](https://github.com/nanocoai/nanoclaw/pull/3284) 合并：** 确立“流式消息为唯一投递门”的核心不变量。对于声明 `emitsMidTurnText` 的提供商，流式内容成为唯一的文本出口，最终结果不再重复投递，消除了重复消息的持久化去重状态。
- **[#3262](https://github.com/nanocoai/nanoclaw/pull/3262) 合并：** 扩展 Chat SDK 桥接层，支持平台侧 DM 线程化场景。实现了 app-context 捕获（线程内客户端上下文附加至下一条入站消息）与 DM 线程 ID 归一化，为多平台 DM 一致性处理奠定基础。
- **[#3263](https://github.com/nanocoai/nanoclaw/pull/3263) 合并：** 通道注册表支持热启动。允许在机器人运行期间，对一个新注册的适配器实例重放完整启动流程，无需重启进程即可接入新通道。
- **[#3264](https://github.com/nanocoai/nanoclaw/pull/3264) 合并：** 引入 `registerDeliveryBatchPreview` 钩子，允许模块在整批投递前对批数据进行只读预检（如预取昂贵附件元数据），失败仅记日志，不阻塞投递。
- **[#3265](https://github.com/nanocoai/nanoclaw/pull/3265) 合并：** 为 `createAgent` 增加可选项参数，支持创建时抑制“创建成功”通知，便于包装器执行额外的后置配置逻辑。
- **[#3266](https://github.com/nanocoai/nanoclaw/pull/3266) 合并：** 在注册审批流中插入卡片拦截器，允许外部模块按通道类型自定义注册卡片的处理逻辑（如自动处理或忽略）。

**通道能力与权限完善（核心团队）**
- **[#3261](https://github.com/nanocoai/nanoclaw/pull/3261) 合并：** 扩展了可选通道适配器接口，`setTyping` 支持携带状态文本与来源类别（自动/人工），`setThreadTitle` 与 `setSuggestedPrompts` 也被纳入可选能力集。
- **[#3260](https://github.com/nanocoai/nanoclaw/pull/3260) 合并：** 权限模块新增第四种未知发送者策略 `decline_notify`。机器人在 DM 中直接礼貌拒绝未知用户，同时私下发送一行提示给 Owner，避免打扰且不静默丢弃。
- **[#3259](https://github.com/nanocoai/nanoclaw/pull/3259) 合并：** 对 skill-apply 引擎与小向导进行了三项修复（序号剥离、浏览器 URL 暴露、脚本继承提取）。

**外部贡献合并**
- **[#1251](https://github.com/nanocoai/nanoclaw/pull/1251) 合并（社区）：** 新增 `/add-openmail` 技能，通过集成 OpenMail API 为 NanoClaw 代理提供邮件收发能力，支持频道模式、工具模式与轮询通知三种模式。
- **[#3278](https://github.com/nanocoai/nanoclaw/pull/3278) 合并（社区）：** 实现文档记忆功能 Story 1.1，新增 `save_document` MCP 工具，可将上传的 Word/PDF 附件持久化至智能体组的长期记忆中。

---

#### 4. 社区热点

今日评论区最活跃的 PR 集中在核心团队的高级功能实现上，虽然没有外部用户参与讨论，但以下两条 PR 内部评论数（含核心团队讨论）最多，反映了内部架构争议与实现深度：

- **[#3257](https://github.com/nanocoai/nanoclaw/pull/3257) 跨会话上下文模块（含 DM 回填、会话回声修剪）**：评论数最多的 PR。核心团队就“会话回声（session-echo）”机制展开深入讨论，特别是关于 `trigger=0` 上下文行的扇出策略、DM 回填的触发时机以及去重/修剪算法的边界情况。诉求在于确保多会话智能体组能够在不互相污染上下文的前提下共享有效信息，这是向更复杂群体智能体场景演进的关键一步。
- **[#3254](https://github.com/nanocoai/nanoclaw/pull/3254) 双阶段入站批量选择**：评论数位列第二。讨论集中在该修复的必要性验证上，团队确认了“上下文洪峰驱动轮次唤醒但任务丢失”的实际故障场景，并对两阶段选择的性能开销与并发安全进行了多轮评审。这反映出核心团队对调度确定性的高度关注。

这两条 PR（连同 #3255、#3256）本质上是核心团队在集中解决多会话并发下的数据一致性、调度优先级与路由准确性问题，项目正努力摆脱“单会话”心智模型，向复杂生产级多租户场景夯实基础。

---

#### 5. Bug 与稳定性

今日修复的问题按严重程度排列如下：

- **[高] [PR #3254 已合并](https://github.com/nanocoai/nanoclaw/pull/3254)**：修复“上下文洪峰驱动轮次唤醒但任务丢失”的问题。`getPendingMessages` 原先仅按时间倒序取最新 N 条，当累积的上下文行（trigger=0）比到期高度任务行更新时，任务会被挤出批次导致唤醒无效。现已改为“先取到期任务，再补上下文”的双阶段选择，确保轮次引擎不会被上下文积压劫持。
- **[高] [PR #3255 已合并](https://github.com/nanocoai/nanoclaw/pull/3255)**：修复出站投递可能将消息投递到“任意兄弟实例”而非真实发送方的问题。当多个适配器实例共享同一个（channel_type, platform_id）时，直接根据平台地址解析目标群组的行为有误。
- **[中] [PR #3256 已合并](https://github.com/nanocoai/nanoclaw/pull/3256)**：修复机器人被移出平台会话后的状态残留问题。新增 `detached_at` 时间戳标记群组失联状态，投递层会拒绝向已失联的会话发送消息，且数据行不删除，等待时机允许回退重连。
- **[中] [PR #3282 待合并，发起于 2026-08-16](https://github.com/nanocoai/nanoclaw/pull/3282)**：修复 Telegram 配对码粘贴带空格导致校验失败的问题。原先仅裁剪首尾空白未处理组内空格（如 “123 456”），现直接折叠所有空白。
- **[中] [PR #3280 待合并，发起于 2026-08-16](https://github.com/nanocoai/nanoclaw/pull/3280)**：修复 `ncl groups config update --model ""` 空字符串无法清空标量值的问题。当前 `String(v)` 会导致存入空字符串而非 NULL，最终被物化到 `container.json` 传给运行时。
- **[低] [PR #2752 待合并，发起于 2026-06-12（64 天）](https://github.com/nanocoai/nanoclaw/pull/2752)**：修复 Discord 入站附件的 URL 化问题。Discord 将粘贴文本转为 `message.txt` 及图片 URL 后，代理接收到的只是两个裸标记（`[file: ...]`），无路径、无内容。该 PR 让其回填临时文件并附带下载路径。

**遗留未解决的高危问题：** 暂无公开的高危崩溃或安全漏洞报告待处理。

---

#### 6. 功能请求与路线图信号

- **[PR #3283 已关闭/回退](https://github.com/nanocoai/nanoclaw/pull/3283)**：该 PR 旨在保留结构化聊天链接（隐藏链接 URL 去重），因被标注为 `[PR: Fix, core-team]`，极可能被纳入下一轮小版本发布计划，用于提升聊天渲染兼容性。
- **[PR #3257 待合并](https://github.com/nanocoai/nanoclaw/pull/3257)**：跨会话上下文模块（含 `ncl sessions history`）是目前最大的一条待办路线图项。如果审查通过，将决定智能体组面对多个并发会话时的信息共享范式。
- **[PR #3281 待合并，解决 Issue #3233](https://github.com/nanocoai/nanoclaw/pull/3281)**：修复 agent-scoped `ncl tasks` 对 `pre-2.1.54` 遗留会话不可见的问题。这是一个针对“升级后旧数据不可见”的数据兼容性修复，信号指向开发者对向后兼容性的硬需求。
- **[PR #1251 已合并](https://github.com/nanocoai/nanoclaw/pull/1251)**：OpenMail 邮件渠道技能的合并意味着越来越多的外部工具被拉入代理生态，扩展了代理的主动通讯能力（监控收件箱并自动回复）。
- **[PR #3278 已合并（文档记忆 Story 1.1）](https://github.com/nanocoai/nanoclaw/pull/3278)**：新增 `save_document` MCP 工具，代理可将 Word/PDF 附件写入持久记忆；这意味着路线图确定方向之一是把“生产环境中的离线文档”纳入代理工作流（文档目录 `memory/documents/files/`），长期看这为“文档对话”与“填充编辑”预留了地基。

---

#### 7. 用户反馈摘要

- **关于 #3283（链接保留）**：社区用户反映在聊天平台（尤其 Telegram/Discord 中）消息被改写或截断时，原始超链接目标消失了，导致必须手动回找原消息。该 PR 在隐藏层带上了去重 URL，让链接保持可溯源。用户满意度有望在合并后提升。
- **关于 #3282（Telegram 配对码）**：真实场景中，用户更习惯直接从 TG 客户端复制带空格的配对码，而不是手工去掉空格。这表明交互层的“防御性格式化”仍有优化空间，即便机器本身能容忍空格，用户侧习惯也需要兼容。
- **关于 #2752（Discord 附件）**：痛点明确——“代理看到 `[file: message.txt]` 却访问不到文件”。用户希望代理能真正“看到”附件内容，而不只是接收一个文件名标记。该 PR 在 64 天仍未合并，已对社区信心产生影响。
- **关于 #1251（OpenMail 合并）**：贡献者在 PR 描述中强调“代理不应只能被动收消息，而应能主动对外通信”，反映了“让代理成为更多业务环节参与者”的普遍诉求。
- **关于 #3278（文档记忆）**：贡献者提到——“如果代理只能读文本，而无法保存用户传来的 Word 模板，那它在办公自动化场景就没有立足之地”。这揭示了由数据接入向工作流闭环延伸的真实需求。

---

#### 8. 待处理积压

- **[PR #2752（Discord 附件 URL 注入）](https://github.com/nanocoai/nanoclaw/pull/2752)**：始于 2026-06-12，已持续 64 天未合并，当前状态仍为 OPEN。今日重新被更新（可能是 rebase 或新的未触发 CI 结果），需要维护者尽快审查，避免此类“渠道基础能力缺失”型 PR 被遗忘。

- **[Issue #3233（Agent-scoped 任务遗漏旧会话）](https://github.com/nanocoai/nanoclaw/pull/3281)**：虽然 3281 已提出修复，但该 Issue 尚待被 `closed via PR` 标记。建议维护者确认 3281 审查进度并同步关闭关联 Issue，避免让等待中的用户误以为无进展。

- **[PR #2752 之外，Channel 适配器向“能力发现”迁移的节奏控制](https://github.com/nanocoai/nanoclaw/pull/3261) 示例**：大量核心团队 PR 均在 2 天内完成合并，社区 PR 却在数周至数月无人认领。建议维护者为社区 PR 设定入门级的响应 SLA（例如 3 天内给初步反馈），以保持外部贡献意愿。

- **[PR #3280（groups config 空字符串清空）](https://github.com/nanocoai/nanoclaw/pull/3280)**：合并优先级建议上调。该问题直接影响运维“清除”配置的行为，属于配置管理的基础语义缺陷，建议下个版本前合入。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

### 1. 今日速览

项目今日活跃度中等偏上，核心事件是围绕 Slack 集成的一个 UX 问题（#7681）被提出后，立即有对应的修复 PR（#7682）跟进，体现了维护团队对用户反馈的快速响应。依赖更新 PR 依旧占据主导（9 条 PR 中 6 条为 Dependabot 发起），但已有两项被合并/关闭，说明常规维护在稳步推进。此外，一个来自核心维护者的知识图谱刷新 PR（#7680）和一个自动化功能增强 PR（#7651）也在等待审查，表明内部工具链和 Agent 自动化能力仍在持续演进。整体项目健康，无严重稳定性或安全问题报告。

### 2. 版本发布

无新版本发布。

### 3. 项目进展

今日合并/关闭了 2 个 PR，均为常规维护操作：

- **（已关闭）移除已退休的 IronLoop 网络设置** ([#7683](https://github.com/nearai/ironclaw/pull/7683))：由核心维护者清理了受信任仓库配置中过时的 `network_access` 字段，简化了配置结构，未改变现有行为。
- **（已关闭）依赖分组更新（第 2 批）** ([#7632](https://github.com/nearai/ironclaw/pull/7632))：合并了 `base64`、`toml`、`rstest`、`jsonschema` 等 Rust 依赖的常规升级，保持技术栈现代化。

这两项合并推动了项目代码库的整洁度与依赖健康度，并为后续功能开发扫清了潜在冲突。

### 4. 社区热点

今日最受关注的议题是 **[Issue #7681 - Slack: unlinked-user connect message is public and requires a manual round trip](https://github.com/nearai/ironclaw/issues/7681)**。该问题由用户 `sergeiest` 报告，指出了 Slack 集成在未链接账户场景下的双重缺陷：提醒消息在公共频道对所有人可见（隐私问题），且引导流程无法保留上下文，需要用户手动记忆并前往 Web 应用操作，体验割裂。

该 Issue 虽无评论，但迅速获得了高优先级标签（`epic`、`UX`）并直接催生了修复 PR [#7682](https://github.com/nearai/ironclaw/pull/7682)，体现了项目对真实用户使用痛点的重视，以及自动化 Agent 辅助下的高效问题解决通道。

### 5. Bug 与稳定性

- **[高] Slack 未链接用户引导消息泄露隐私** ([#7681](https://github.com/nearai/ironclaw/issues/7681))：在公共频道中，未链接账户的用户的连接引导消息对所有频道成员可见，可能导致内部工具使用习惯或用户名泄露。该 Bug 由 `sergeiest` 报告，**已有修复 PR（[#7682](https://github.com/nearai/ironclaw/pull/7682)）提交，状态为 Open 待合并**，该 PR 计划将消息改为私密发送并附带一键连接链接。

无其他崩溃或功能回归问题报告。

### 6. 功能请求与路线图信号

- **Slack 私密连接引导与一键链接**（来自 [#7681](https://github.com/nearai/ironclaw/issues/7681)）：用户需求明确要求修复连接流程。对应的 **PR [#7682](https://github.com/nearai/ironclaw/pull/7682)** 已实现私密消息发送、生成一键连接链接并携带上下文的功能，该 PR 标记为 `size: L`，**极有可能被纳入下一版本**。
- **确定性无结果抑制机制**（来自 **PR [#7651](https://github.com/nearai/ironclaw/pull/7651)**）：该 PR 由 `serrrfirat` 提交，计划让自动化触发逻辑根据用户措辞确定性决定是否推送无结果的通知，旨在减少噪音。该 PR 处于 Open 状态，描绘了项目在 Agent 自动化行为可控性上的前进方向。

### 7. 用户反馈摘要

- **痛点**：用户 `sergeiest` 明确指出了 Slack 集成中令人沮丧的流程——引导消息泄露隐私且“需要手动往返操作”（原文：*“what's the link to connect you?...”* 的对话中断），这反映了外部 IM 工具与平台间身份绑定的流畅性不足。
- **积极性**：对于同一问题，立即有维护者级别的 PR 提交，展示了用户与开发者间的良性互动，增强了用户对项目响应速度的信心。
- **整体**：今日用户反馈较少，未出现对核心功能的负面评价或功能抱怨。

### 8. 待处理积压

- **PR #7406：升级 GitHub Actions 依赖（4 项更新）** ([链接](https://github.com/nearai/ironclaw/pull/7406))：由 Dependabot 发起，涉及 `claude-code-action`、`setup-node` 等关键 CI 组件。已开启 7 天（自 2026-08-09），风险等级为中（`risk: medium`），**需要维护者关注并安排审查，以避免 CI 工具链滞后**。
- **PR #7020：升级 tokio-tungstenite 至 0.30.0** ([链接](https://github.com/nearai/ironclaw/pull/7020))：一个跨 Websocket 库的大版本更新，已开启近两周（自 2026-08-02），处于 `tokio-ecosystem` 组，可能涉及较大兼容性调整，长期搁置会增加后续合并冲突风险。
- **PR #7262：升级 wasm 工具链（wit-component 等）** ([链接](https://github.com/nearai/ironclaw/pull/7262))：同样由 Dependabot 发起，已开放 11 天。虽风险低，但持续未合并会导致该依赖组与其他 PR 冲突。
- **Issue #7681** ([链接](https://github.com/nearai/ironclaw/issues/7681))：虽然是新 Issue，但其修复 PR 已提交。此处提醒维护者优先审查合并其修复 PR（[#7682](https://github.com/nearai/ironclaw/pull/7682)），以快速关闭此高影响力用户体验问题。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-08-17

---

## 今日速览

过去 24 小时项目活跃度中等：共 10 条 Issue 更新（7 条活跃、3 条关闭）和 17 条 PR 更新（8 条待合并、9 条已合并/关闭），无新版本发布。值得关注的是，今日关闭的 PR 中有 4 条来自安全加固系列（日志脱敏、IPC 越权、URL scheme 白名单、重复错误消息修复），且均已合入主分支，项目安全水位有实质提升。社区讨论热度总体平稳，最活跃的讨论集中在 DeepSeek V4 接入失败与有道龙虾/智企帝王蟹的端口冲突两个问题上。需注意大量 Issue 已被标记为 `[stale]`，部分已存在近四个月，维护响应速度堪忧。

---

## 版本发布

过去 24 小时无新版本发布。

---

## 项目进展

今日共 9 条 PR 关闭/合并，按主题归类如下：

**安全加固（4 条，已合入，均为 kayo5994 提交）**

- **[security] 脱敏主进程与 IM 模块的敏感日志**（[#1831](https://github.com/netease-youdao/LobsterAI/pull/1831)）— 修复 `api:fetch` IPC 处理器以 INFO 级别打印完整 URL/headers/body 的问题，Bearer token、第三方 API key、SSE 内容不再落盘；同时脱敏 `[Auth]` 路径的 profile JSON、`second-instance` 调试日志中的一次性 authCode，以及 IM cowork 调度器的会话内容。
- **[security] 限制 `store:*` IPC 越权访问**（[#1832](https://github.com/netease-youdao/LobsterAI/pull/1832)）— 修复渲染进程可通过 `store:get`/`set`/`remove` 无差别读写主进程 SQLite KV 的漏洞，该漏洞可导致 `auth_tokens`（明文 access/refresh token）与 `github_copilot_github_token` 泄露，甚至被覆盖为攻击者控制的值。同时收窄了通用 `ipcRenderer` 桥。
- **[security] `shell.openExternal` 增加 scheme 白名单**（[#1833](https://github.com/netease-youdao/LobsterAI/pull/1833)）— 拒绝 `file:` / `javascript:` / `data:` / `vbscript:` 等危险 scheme，防止模型输出的恶意 markdown 引导探测本地文件或触发 OS 级动作。
- **[cowork] 去除 continueSession 失败时重复推送的系统错误消息**（[#1835](https://github.com/netease-youdao/LobsterAI/pull/1835)）— 修复用户在一次发送失败后看到两条连续系统错误消息的问题。

**功能与体验改进（5 条，已合入）**

- **[agent] Agent 模板导入/导出**（[#1691](https://github.com/netease-youdao/LobsterAI/pull/1691)）— 新增 Agent ↔ JSON 模板互转、本地文件/远程 URL 导入、导出 `.agent.json` 文件，支持跨设备共享自定义 Agent 配置。
- **[settings] IM 实例删除增加二次确认弹窗**（[#1690](https://github.com/netease-youdao/LobsterAI/pull/1690)）— 钉钉/飞书/QQ 删除实例时需确认，防止误删导致重新配置。
- **[cowork] 模型未配置时一键直达设置页 & 修复输入丢失**（[#1693](https://github.com/netease-youdao/LobsterAI/pull/1693)）— 提示文字改为可点击按钮，且修复未配置模型时发送消息导致草稿丢失的 bug。
- **[cowork] 修复 OpenClaw 代理请求缺失 session_id**（[#1715](https://github.com/netease-youdao/LobsterAI/pull/1715)）— 多 cowork session 并发时服务端无法识别会话来源的问题已修复。
- **[agent] 支持图片头像**（[#1760](https://github.com/netease-youdao/LobsterAI/pull/1760)）— 自定义 Agent 头像从仅 Emoji 扩展为同时支持图片上传，保留原 Emoji 流程兼容。

**结论：** 今日合入内容以安全合规补强为最大亮点（一次性封堵 3 类安全风险），配合若干交互细节优化，项目整体质量与安全性有明显提升，但无重大新功能落地。

---

## 社区热点

**1. DeepSeek V4 接入失败（Issue [#1813](https://github.com/netease-youdao/LobsterAI/issues/1813)）— 8 条评论，已关闭**

用户报告 DeepSeek V4 无法使用，报错 `provider rejected the request schema or tool payload`。这是典型的大模型服务端拒绝了工具调用参数 schema，通常意味着新版模型对 tool payload 的格式要求有变化，而 LobsterAI 侧尚未适配。该 Issue 已被 `[stale]` 标记并关闭（创建于 2026-04-24），说明官方未在该线程内解决或跟进。

**2. 有道龙虾与智企帝王蟹端口冲突（Issue [#1698](https://github.com/netease-youdao/LobsterAI/issues/1698)）— 3 条评论，仍开放**

龙虾启动状态下安装智企帝王蟹必现 gateway 端口冲突和进程竞争，帝王蟹提示鉴权失败且无响应，关闭龙虾后恢复正常。两产品同属有道生态却存在端口/进程冲突，对用户的实际使用造成直接困扰。该 Issue 已开放 4 个月且有明确复现步骤，至今未关闭。

**3. 新增 PR：保留 slash model id 的 provider 前缀（[#2452](https://github.com/netease-youdao/LobsterAI/pull/2452)）— 唯一 8 月创建的活跃 PR**

修复 `custom_0` + `deepseek-ai/DeepSeek-V4-Flash` 格式的模型 ID 持久化时丢失 provider 前缀的问题——该 PR 与 Issue #1813 的 DeepSeek V4 接入失败有直接关联，推测 `DeepSeek-V4-Flash` 正是受影响模型之一。

---

## Bug 与稳定性

按严重程度排列：

| 严重度 | Issue/PR | 描述 | Fix 状态 |
|--------|----------|------|----------|
| 🔴 严重（安全） | PR [#1832](https://github.com/netease-youdao/LobsterAI/pull/1832) | `store:*` IPC 无 key 级访问控制，任意被污染的渲染端代码可读取/覆盖 `auth_tokens` 明文 token | ✅ 已修复合入 |
| 🔴 严重（安全） | PR [#1833](https://github.com/netease-youdao/LobsterAI/pull/1833) | `shell.openExternal` 无 scheme 白名单，恶意 markdown 可触发 `file:`/`javascript:` 等 | ✅ 已修复合入 |
| 🟠 高 | PR [#1831](https://github.com/netease-youdao/LobsterAI/pull/1831) | 敏感信息（Bearer token、API key、authCode）以明文写入日志文件 | ✅ 已修复合入 |
| 🟠 高 | Issue [#1813](https://github.com/netease-youdao/LobsterAI/issues/1813) | DeepSeek V4 无法使用，`provider rejected the request schema or tool payload` | ⚠️ 无直接修复，相关 PR [#2452](https://github.com/netease-youdao/LobsterAI/pull/2452) 待合入 |
| 🟠 高 | Issue [#1698](https://github.com/netease-youdao/LobsterAI/issues/1698) | 与智企帝王蟹共存时必现 gateway 端口冲突、进程竞争、鉴权失败 | ❌ 无修复，开放 4 个月 |
| 🟡 中 | Issue [#1796](https://github.com/netease-youdao/LobsterAI/issues/1796) | Write/Edit 工具执行持续失败，持续数天，更新应用后依旧 | ❌ 已关闭，无明确修复 |
| 🟡 中 | Issue [#1783](https://github.com/netease-youdao/LobsterAI/issues/1783) | 更新后 diff 显示失灵；用户定位到 `extractDiffFromToolInput`（app.asar 中）只从顶层查找 `oldText/newText`，嵌套结构下无法提取 | ❌ 无修复，有根因分析 |
| 🟡 中 | Issue [#1714](https://github.com/netease-youdao/LobsterAI/issues/1714) | Win11 安装过程中大概率出现图标白色且无效 | ❌ 无修复，开放 4 个月 |
| 🟢 低 | Issue [#1744](https://github.com/netease-youdao/LobsterAI/issues/1744) | Bug report（内容不完整，附件上传失败） | — |
| 🟢 低 | PR [#1835](https://github.com/netease-youdao/LobsterAI/pull/1835) | continueSession 失败时重复推送两条系统错误消息 | ✅ 已修复合入 |

---

## 功能请求与路线图信号

| 功能请求 | 来源 | 状态 | 路线图信号 |
|----------|------|------|------------|
| 对话批量删除 | Issue [#1797](https://github.com/netease-youdao/LobsterAI/issues/1797)（👍 1） | 已关闭，未实现 | 社区有明确诉求，但官方未表态 |
| 邮箱连接支持 OAuth2/新式验证 | Issue [#1745](https://github.com/netease-youdao/LobsterAI/issues/1745) | 开放，`[stale]` | Outlook 已完全禁止应用密码登录，该需求会随时间推移变得更紧迫 |
| 对话中动态调整 temperature | Issue [#1688](https://github.com/netease-youdao/LobsterAI/issues/1688) | 开放，`[stale]` | 偏高级用户需求，未见路线图收录信号 |
| 定时任务通知文案错误 | Issue [#1751](https://github.com/netease-youdao/LobsterAI/issues/1751) | 开放，`[stale]` | 疑似简单文案 bug，但长期未处理 |
| AI 回复朗读（TTS） | PR [#1682](https://github.com/netease-youdao/LobsterAI/pull/1682) | 待合并 | 基于 Web Speech API 零依赖实现，功能完整，合入可能性较高 |
| 空状态 UI 增强 | PR [#1770](https://github.com/netease-youdao/LobsterAI/pull/1770) | 待合并 | 低风险 UI 改进，Close #1921 |
| Cowork 初始化骨架屏 | PR [#1769](https://github.com/netease-youdao/LobsterAI/pull/1769) | 待合并 | 低风险加载体验优化 |
| 技能远程导入 URL 前置校验 | PR [#1683](https://github.com/netease-youdao/LobsterAI/pull/1683) | 待合并 | 明确的体验修复 |
| 切换 Agent 自动清空输入框 | PR [#1707](https://github.com/netease-youdao/LobsterAI/pull/1707) | 待合并 | 修复多 Agent 共用 `__home__` key 导致草稿串扰问题 |
| i18n 补充 edit 翻译 key | PR [#1773](https://github.com/netease-youdao/LobsterAI/pull/1773) | 待合并 | 硬编码 "edit" 未走 i18n 系统 |

---

## 用户反馈摘要

**正面反馈：**

- PR #1693 的改动（未配置模型时点击跳转设置页）直接解决新用户"找不到模型配置入口"的上手痛点，这类交互优化对降低用户流失有实际价值。
- PR #1690 的删除确认弹窗说明开发者在响应"配置成本高、误删代价大"的实操痛点。

**负面反馈与痛点：**

- **DeepSeek V4 用户被卡在门外**（[#1813](https://github.com/netease-youdao/LobsterAI/issues/1813)）："LLM request failed: provider rejected the request schema or tool payload"——新版模型的工具调用规范已变更，客户端未跟上。
- **Write/Edit 工具连续数天不可用**（[#1796](https://github.com/netease-youdao/LobsterAI/issues/1796)）：用户明确表达 "update the app, still the same"，对修复进度失望。
- **diff 功能失灵且用户自行定位到根因**（[#1783](https://github.com/netease-youdao/LobsterAI/issues/1783)）：用户逆向分析出 `extractDiffFromToolInput` 只查找顶层 key 的 bug，说明该问题已困扰用户到必须"自己动手"的程度。
- **Outlook 邮箱用户被锁死**（[#1745](https://github.com/netease-youdao/LobsterAI/issues/1745)）："普通的应用密码登录被完全禁止了，不知道怎么办才好"——OAuth2 支持缺失正在流失邮箱场景用户。
- **Win11 安装白图标**（[#1714](https://github.com/netease-youdao/LobsterAI/issues/1714)）：安装过程图标异常虽不致命，但直接影响第一印象，开放 4 个月未修复。

---

## 待处理积压

以下 Issue/PR 已长期未获得有效响应，建议维护者优先排查：

**高优建议：**

1. **Issue [#1698](https://github.com/netease-youdao/LobsterAI/issues/1698)** — 有道生态内产品端口冲突，必现且阻断帝王蟹使用，开放 4 个月未响应。生态内联调问题长期搁置，可能波及有道家装用户信任。
2. **Issue [#1783](https://github.com/netease-youdao/LobsterAI/issues/1783)** — diff 失灵已有用户根因分析（`extractDiffFromToolInput` 未处理嵌套 toolInput），修复成本低但价值高，至今无 fix PR 产出。
3. **Issue [#1745](https://github.com/netease-youdao/LobsterAI/issues/1745)** — Outlook OAuth2 支持缺失，属不可绕过的硬阻塞（微软已禁止应用密码），拖得越久用户流失越严重。

**中优建议：**

4. **PR [#1682](https://github.com/netease-youdao/LobsterAI/pull/1682)**（AI 回复朗读）— 功能完整、零依赖、由网易内部员工提交，停滞 4 个月未合入，建议尽快 code review。
5. **PR [#2452](https://github.com/netease-youdao/LobsterAI/pull/2452)** — 与 DeepSeek V4 接入失败（#1813）直接相关，建议与 #1813 回归测试联动合入。
6. **Issue [#1714](https://github.com/netease-youdao/LobsterAI/issues/1714)** — Win11 白图标问题开放 4 个月，影响新用户安装体验。

**低优/清理类：**

7. **Issue [#1744](https://github.com/netease-youdao/LobsterAI/issues/1744)** — 无效 Bug report（附件上传失败），建议直接关闭。
8. **dependabot PR [#1765](https://github.com/netease-youdao/LobsterAI/pull/1765)**（`@headlessui/react` 1.x→2.x）— 大版本跨跃存在 breaking changes，建议优先安排兼容性验证，避免堆积过期。

---

*数据统计区间：2026-08-16 至 2026-08-17（UTC）*

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 2026-08-17

## 今日速览
过去 24 小时 Moltis 项目保持中等活跃度：共 3 条 Issue 更新（2 新开、1 关闭）和 6 条 PR 更新（5 条合并/关闭、1 条待合并）。核心事件是修复了 main 分支的两个连续回归问题：gateway 编译失败（#1201）和 push fanout 测试不稳定（#1203），同时主线 CI 的格式检查闸门因文件超长而变红待处理（#1202）。社区侧新增一个 MiniMax Code ACP agent 集成 PR（#1204），等待审查合并。

## 版本发布
过去 24 小时无新版本发布。

## 项目进展
今日合入 5 个 PR，整体推进了稳定性和功能修复：

- **[#1201 fix(gateway): thread start_background_tasks into the memory runtime builder](https://github.com/moltis-org/moltis/pull/1201)** — 修复了 main 分支（594ffaf1）上 `moltis-gateway` 无法编译的问题。#1158 在重构运行时的过程中遗漏了 `start_background_tasks` 的传递，导致构建失败。
- **[#1203 test(gateway): run the push fanout test on a paused clock](https://github.com/moltis-org/moltis/pull/1203)** — 针对 #1193 的 flaky test 进行修复：将 `fanout_is_bounded_and_times_out_a_hung_endpoint` 测试改为基于暂停时钟的确定性测试，消除全量测试负载下的超时竞态。此 PR 栈在 #1201 之上，随 #1201 合并一并合入。
- **[#1147 fix(caldav): honor list_events time ranges](https://github.com/moltis-org/moltis/pull/1147)** — 修复 CalDAV `list_events` 时间范围失效的问题：改用 RFC 4791 `calendar-query` REPORT 替代全量拉取，并将 ISO 8601 边界归一化为 UTC，确保重复事件正确落入请求区间。
- **[#1186 fix(vault): normalize recovery phrase before hashing](https://github.com/moltis-org/moltis/pull/1186)** — 修复 vault 恢复短语哈希不一致问题：此前派生 KEK 时会将短语规范化（去横线、大写），但存储哈希时却基于原始短语，导致用户以不同格式输入时无法匹配。
- **[#1093 Add channel activity log visibility settings](https://github.com/moltis-org/moltis/pull/1093)** — 为频道回复目标新增按账户/频道/用户三个层级的 `activity_log` 可见性设置，支持 `all`、`errors_only`、`off` 三档，用户级覆盖频道级、频道级覆盖账户默认值。

**整体进展**：Moltis 通过 #1201 和 #1203 快速恢复了 main 分支的可构建状态和测试稳定性，并持续推进 CalDAV 协议正确性、vault 安全一致性和频道日志可见性配置能力，项目健康度良好。

## 社区热点
- **[#1204 feat: add MiniMax Code ACP agent (OPEN)](https://github.com/moltis-org/moltis/pull/1204)** — 今日唯一的开放 PR，作者 hetaoBackend 为 Moltis 新增 MiniMax Code 外部 agent 支持，包含默认可执行文件检测、agent 注册表更新和 TOML 配置文档。作为新集成 PR，值得关注。
- **[#1202 Format CI gate is red on main: two files over the 1500-line limit (OPEN)](https://github.com/moltis-org/moltis/issues/1202)** — main 分支的格式检查失败：`store.rs`（1799 行）和 `admin.rs`（1531 行）超过 1500 行限制。由 #9b47001a 引入，直接阻塞 CI 的 Format 检查。目前是 CI 通道上的首要阻塞项。

## Bug 与稳定性
按严重程度排列：

1. **[#1202 Format CI gate is red on main: two files over the 1500-line limit](https://github.com/moltis-org/moltis/issues/1202)** — 严重程度：高。main 分支 CI 的 Format 检查为红色，阻塞合并通道。由 #9b47001a 提交引入两个超大文件。尚无对应修复 PR，需拆分或调整上限。
2. **[#1193 Flaky test: push fanout timeout assertion races under full-suite load](https://github.com/moltis-org/moltis/issues/1193)** — 严重程度：中。已通过 #1203 修复并合入（该 Issue 已关闭）。
3. **[#1205 [Bug]: Heartbeat ignores configured active hours and runs continuously](https://github.com/moltis-org/moltis/issues/1205)** — 严重程度：中。Heartbeat 在配置的非活跃时段仍然持续运行，忽略 active hours 设置。由 IlyaBizyaev 今日提交，暂无评论或修复 PR。

**回归状态**：#1201 对应的 gateway 编译失败和 #1193 的 flaky test 均已在今日修复并关闭，回归情况处于受控状态。

## 功能请求与路线图信号
- **[#1204 feat: add MiniMax Code ACP agent (OPEN)](https://github.com/moltis-org/moltis/pull/1204)** — 新增 MiniMax Code 外部 agent 支持，扩展 Moltis 的 agent 生态。如果被合并，将作为新的 agent 类型纳入默认检测机制和配置文档，预计可进入下一版本。
- **[#1093 Add channel activity log visibility settings (CLOSED)](https://github.com/moltis-org/moltis/pull/1093)** — 已合入的可见性设置功能，属于配置能力增强，将随下一个版本发布。

## 用户反馈摘要
- 今日没有针对 Issues 的评论讨论，暂无新增可直接引用的用户反馈。
- 从 Issue 本身推断：**[#1205](https://github.com/moltis-org/moltis/issues/1205)** 的提交者 IlyaBizyaev 指出 Heartbeat 在配置的活跃时段外仍在运行，这反映出用户对资源占用和后台任务调度精细化的真实痛点，尤其是在不希望 Moltis 在非工作时段消耗系统资源的使用场景中。
- **[#1193](https://github.com/moltis-org/moltis/issues/1193)** 的 flaky test 报告者 Lstarsky0 提供了详尽的失败日志和复现条件（整包全量运行、10 核 macOS），这类高质量的 bug 报告为快速定位和修复提供了必要条件，修复 PR #1203 在同日内完成合入，反馈到解决的链路非常高效。

## 待处理积压
- **[#1205 Heartbeat ignores configured active hours (OPEN)](https://github.com/moltis-org/moltis/issues/1205)** — 新提交的 bug，暂无维护者响应，建议尽快确认是否为预期行为并安排修复。
- **[#1202 Format CI gate is red on main (OPEN)](https://github.com/moltis-org/moltis/issues/1202)** — CI 阻塞项，需要拆分或者调整文件大小上限，建议尽快处理以恢复主线的格式检查通道。
- **[#1193 关联的 #1201](https://github.com/moltis-org/moltis/pull/1201)** 已合入，若 #1202 中提到的两个文件来自 #9b47001a，需要追踪该提交的作者和意图，避免 CI 长时间滞留红色状态。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报 — 2026-08-17

## 今日速览

过去 24 小时内 CoPaw 仓库的社区活动保持高位运行：共有 10 条 Issue 更新和 10 条 PR 更新，活跃度属近期较高水平，但 Issue 关闭率（40%）略低于平均水平，部分历史 bug 的修复尚未被合入。值得关注的是，新贡献者（first-time contributor）提交的 PR 数量显著提升，共 6 条，且全部处于待审查或进入 review 阶段，修复质量普遍较好。与此同时，社区对*会话崩溃、历史消息丢失、视频工具失效*等稳定性问题反馈集中，建议维护者优先处理。当前没有新版本发布。

---

## 版本发布

今日无新版本发布。

---

## 项目进展

今日合并/关闭的 PR 共 2 条，均围绕同一问题展开：

- **[#7064](https://github.com/agentscope-ai/QwenPaw/pull/7064)（已合并）** `fix(cli): sync top-level text on cron update --text for agent jobs` — 首次贡献者 suantea 修复了 agent 类型 cron 任务中 `cron update --text` 只更新嵌套字段而忽略顶层 `text` 字段的问题（对应 Issue #7048），并通过了 review。
- **[#7055](https://github.com/agentscope-ai/QwenPaw/pull/7055)（已关闭）** `fix(cli): sync top-level text on agent cron --text update (#7048)` — 另一提交者 lcq225 针对同一问题提交的独立修复方案。虽然 PR 被关闭，但与 #7064 形成有效竞争，推动了该 bug 的快速解决。

值得注意的进展是，这两个 PR 均来自社区贡献者而非核心维护团队，且修复同一 bug 的两条路径，说明该项目已具备活跃的外部贡献生态。此外，今日有 5 条高质量修复 PR 进入待合并状态（详见下文 Bug 与稳定性部分），其中多数来自同一位新贡献者 suantea，合入后预计将显著改善会话稳定性与工具链可靠性。

---

## 社区热点

- **[#7074 — 正常运行崩溃，需刷新页面才能重启，频次高发](https://github.com/agentscope-ai/QwenPaw/issues/7074)**（Open，1 评论）— 用户报告在正常使用过程中频繁崩溃，必须刷新页面才能恢复。这是今日最受关注的稳定性问题之一，反映了前端会话层存在未捕获的异常路径。

- **[#7065 — 多轮对话后无法查看完整历史消息](https://github.com/agentscope-ai/QwenPaw/issues/7065)**（Open，1 评论）— 用户反馈进行约 7 轮对话后，向上滚动只能看到最近 3-4 条消息。该问题的社区关注度较高，因为它直接影响核心使用体验。

- **[#7003 — ViBo: 97.5% 更少 token 的 agent 记忆方案](https://github.com/agentscope-ai/QwenPaw/issues/7003)**（Closed，3 评论）— 外部开发者提出的第三方记忆层集成提案，虽然被关闭，但评论区讨论活跃，显示出社区对长上下文记忆优化的强烈需求。

- **[#7062 — 按 agent/会话级配置 reasoning_effort](https://github.com/agentscope-ai/QwenPaw/issues/7062)**（Open，1 评论）— 用户希望不同角色（快速问答 vs 深度研究）可以使用不同的思考强度，讨论了 provider 级配置粒度过粗的问题。

社区核心诉求集中在：会话稳定性（#7074、#7065、#7063）、更细粒度的配置能力（#7062、#7052），以及工具调用的可靠性（#7063、#7059、#7060）。

---

## Bug 与稳定性

今日共报告 4 个新 Bug，另有 1 个长期 Bug 被关闭。按严重程度排列：

| 严重程度 | Issue | 描述 | 状态 |
|---------|-------|------|------|
| 🔴 严重 | [#7063](https://github.com/agentscope-ai/QwenPaw/issues/7063) | Agent 执行工具调用时必现崩溃。`_execute_tool_call` 中用 `async for` 遍历 `_acting(tool_call)` 的返回值，但后者是 coroutine 而非 async generator，触发 `TypeError` | ✅ 已关闭（疑似已修复或标记无效） |
| 🟠 高 | [#7074](https://github.com/agentscope-ai/QwenPaw/issues/7074) | 正常运行中高频崩溃，需刷新页面才能恢复。疑似会话状态加载路径存在未捕获异常 | ⚠️ 无 PR |
| 🟠 高 | [#7065](https://github.com/agentscope-ai/QwenPaw/issues/7065) | 多轮对话后无法查看完整历史，滚动到顶部仍只显示最近 3-4 条消息 | ⚠️ 无 PR |
| 🟡 中 | [#7048](https://github.com/agentscope-ai/QwenPaw/issues/7048) | `cron update --text` 对 agent 类型任务返回成功但 prompt 未更新 | ✅ 已修复（#7064 已合并） |
| ⚪ 低 | [#6471](https://github.com/agentscope-ai/QwenPaw/issues/6471) | Cron 任务在事件循环长时间空闲后 misfire（APScheduler AsyncIOScheduler 不触发） | ✅ 已关闭 |

与之相关的 PR 修复方面，今日有 5 条针对已知缺陷的修复 PR 处于打开状态，均来自首次贡献者：

- **[#7069](https://github.com/agentscope-ai/QwenPaw/pull/7069)**（修复 #7051）历史消息中的 data-URL 图片在会话重新加载后无法显示，前端渲染逻辑缺失。✅ 待合并
- **[#7070](https://github.com/agentscope-ai/QwenPaw/pull/7070)**（修复 #7059）OpenAI Responses API 路径下 `view_video` 调用模型始终未收到视频帧——静默失败，根因是两个独立缺陷叠加。✅ 待合并
- **[#7071](https://github.com/agentscope-ai/QwenPaw/pull/7071)**（修复 #7060）`view_video` 的 2MB 内联上限被硬编码，超过该大小但低于 provider 配置上限的视频总被省略。✅ 待合并
- **[#7067](https://github.com/agentscope-ai/QwenPaw/pull/7067)** 多 agent 场景下通过 URL 打开会话，SDK 保留最后选择的 agent 并重写 URL，导致深链无法导航到正确对话。✅ 待合并
- **[#7066](https://github.com/agentscope-ai/QwenPaw/pull/7066)**（修复 #7053）OAuth2 授权码模式下轮换的 `refresh_token` 未被持久化，令牌旧值最终过期导致 MCP 服务器认证失败。✅ 待合并

另外一条值得注意的 PR：

- **[#7073](https://github.com/agentscope-ai/QwenPaw/issues/7073)** 为技能加载增加名称去重，防止 workspace 自定义技能与内置技能重名时被重复加载。该 Issue 本身是一个修复提案，与上述 PR 略不同，但属于同一质量改进方向。✅ 待合并（作为 PR 看待）

综合来看，今日合入 1 个 bug 修复（#7064），另有 7 个修复 PR 处于待合并状态，多数为社区贡献——维持了"发现问题—社区提交修复—维护者审查"的正向循环。

---

## 功能请求与路线图信号

今日共收到 4 条功能请求，按实现优先级判断：

| 优先级 | Issue | 需求 | 已有 PR 或讨论 |
|--------|-------|------|----------------|
| 高 | [#7073](https://github.com/agentscope-ai/QwenPaw/issues/7073)（修复向） | skill 名称去重，防止自定义技能覆盖内置技能 & 重复加载 | 已有直接针对此功能的 PR（待合并） |
| 中 | [#7062](https://github.com/agentscope-ai/QwenPaw/issues/7062) | 按 agent/会话级配置 `reasoning_effort`，避免全局模型级配置粒度太粗 | 暂无直接 PR，但 [#6302](https://github.com/agentscope-ai/QwenPaw/pull/6302)（统一 provider 发现与路由，仍处于 OPEN 状态）可能提供基础架构 |
| 中 | [#7068](https://github.com/agentscope-ai/QwenPaw/issues/7068) | 文件/脚本查看器支持更多语言（C#、shader 文件），面向游戏开发场景 | 暂无 PR，前端改动，实现成本低 |
| 中 | [#7052](https://github.com/agentscope-ai/QwenPaw/issues/7052) | 插件 API 增加 `system_prompt` 权限，使企业用户的自定义提示词在会话界面不可见 | 暂无 PR，涉及安全边界设计，需维护者讨论 |

判断：**#7073 极有可能进入下一版本**（修复已就绪）；**#7062 依赖 [#6302](https://github.com/agentscope-ai/QwenPaw/pull/6302) 模型的统一抽象**，而该 PR 已持续近一个月仍未合并，可能被推迟；**#7068 和 #7052 暂无实现计划**，需要模块维护者评估工作量后决定。

---

## 用户反馈摘要

- **内存管理是长期痛点**：#7003 中用户明确指出"agent 在会话间不保留记忆，且每次请求将全部记忆发送给模型，成本较高"，该问题在建议关闭后社区讨论热度仍不减。结合 #7062（按 agent 配置思考强度），社区存在对"模型使用效率"的系统性诉求。
- **会话稳定性影响核心体验**：#7074、#7065 两条 Issue 从不同角度反映了同一个问题——会话状态管理不够健壮。崩溃后需要手动刷新、历史消息丢失，降低了用户对产品的信任感。
- **CLI 细节问题引发多方贡献**：#7048 对应的 cron 更新问题在 24 小时内吸引两位不同贡献者提交独立修复方案，原因在于该命令"返回成功但实际未生效"会造成用户在自动化流程中收到错误反馈，属于高欺骗性 bug。
- **配置灵活度不足**：#7062 中用户对比了"快速问答助手 vs 深度研究 agent"的典型场景差异，认为全局模型级配置无法适应多角色部署需求；#7052（插件 system_prompt 权限）则反映了企业/团队场景下的隔离需求。两个 issue 的共同特点是：用户不再满足于功能可用，而是需要面向生产环境的细粒度控制。
- **对扩展性与定制化的期望**：#7068（脚本查看器扩展语言支持）显示社区已在尝试将 CoPaw 用于游戏开发等垂直工作流。体现社区正在向更多专业领域渗透。

---

## 待处理积压

以下为需要维护者关注的长期未响应或进度缓慢的 Issue / PR：

| 项目 | 类型 | 创建时间 | 状态 | 备注 |
|------|------|----------|------|------|
| [#6302](https://github.com/agentscope-ai/QwenPaw/pull/6302) | PR | 2026-07-21 | OPEN | 已持续 27 天未合并，统一 provider 发现、模型元数据、路由和 agent 模型控制。此 PR 是 #7062 的前置条件，建议维护者尽快给出 feedback 或分阶段合入 |
| [#6940](https://github.com/agentscope-ai/QwenPaw/pull/6940) | PR | 2026-08-12 | OPEN，ready-for-human-review | 原生 DataPaw 应用运行时与持久化分析工作区，已进入人工审查阶段，5 天未更新。功能体量较大，建议尽快安排 review |
| [#7066](https://github.com/agentscope-ai/QwenPaw/pull/7066) | PR | 2026-08-16 | OPEN | 修复 OAuth2 refresh_token 轮换未持久化问题（#7053）。涉及 MCP 服务器认证，长时间不合并可能导致更多用户受影响 |
| [#7003](https://github.com/agentscope-ai/QwenPaw/issues/7003) | Issue（提案） | 2026-08-13 | Closed | 第三方记忆方案 ViBo 的提案虽被关闭，但用户对 token 成本高、跨会话记忆缺失的诉求仍然存在。建议维护者考虑是否将持久化记忆纳入路线图或在官方文档中补充替代方案 |

另外特别提醒：[#7064](https://github.com/agentscope-ai/QwenPaw/pull/7064) 虽已合并，但同源竞争 PR #7055 被关闭时，建议保留其作者在讨论记录中的贡献标注，避免挫伤新贡献者积极性。

---

**总结**：CoPaw 今日整体保持健康态势——社区贡献者活跃度上升，修复 PR 数量可观，但部分高优 bug（#7074、#7065）仍无对应 PR 在跟进，且两个大功能 PR 长期滞留可能导致社区等待时间过长。建议维护团队在下一次 triage 会议中优先处理待合并 PR 队列，并在 GitHub 讨论区对 #7062 与 #7003 的路线图安排做出回应。

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