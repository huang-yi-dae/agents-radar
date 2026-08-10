# OpenClaw 生态日报 2026-08-10

> Issues: 500 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-08-10 01:25 UTC

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

# OpenClaw 项目动态日报 — 2026-08-10

## 今日速览

过去 24 小时项目活跃度极高：500 条 Issue 更新（新开/活跃 426，关闭 74），500 条 PR 更新（待合并 323，合并/关闭 177），无新版本发布。社区热点集中在两处：一是 DeepSeek v4 Flash 静默回复失败（#116277，196 条评论）虽已关闭但用户反馈仍在复发（#121058），二是消息丢失/重复发送类的稳定性问题占据多个高优先级 Issue。PR 侧维护者 steipete、sjf-oa 等提交密集，涉及 Slack Enterprise Grid 路由、UI 修复、会话稳定性等，整体处于高吞吐迭代状态。值得注意的信号：多个 P1 级 Bug（嵌入运行器签名失效、Codex hook 进程占满 CPU、exec 工具不继承 env）均缺少对应 fix PR，长期积压风险在累积。

---

## 版本发布

过去 24 小时无新版本发布。

---

## 项目进展

今日无 PR 被直接标记为「已合并」的高亮记录（合并/关闭 177 条未全量展示），但以下待合并 PR 若落地将显著推进项目稳定性 ：

### 会话与会话状态
- **[fix(agents): prevent requester settle while child is still running](https://github.com/openclaw/openclaw/pull/120601)** (`#120601`, P1, 已关闭) — 修复 `sessions_yield` 在子 agent 仍运行时唤醒 requester 的问题，将终态判断闸门前移到 requester 唤醒调度。直接回应 #120449 工具循环警告未回传模型的缺陷。
- **[fix(sessions): preserve thread on internal turns](https://github.com/openclaw/openclaw/pull/121321)** (`#121321`, 维护者) — Full Release Validation 失败后定位到 `chat.send` 后用户 transcript 事件丢失线程上下文的问题。
- **[fix(sessions): report archive cleanup in sessions cleanup](https://github.com/openclaw/openclaw/pull/97103)** (`#97103`, P1) — `sessions cleanup --dry-run` 现在可预览即将删除的 `.deleted.*` / `.reset.*` 归档文件。

### Slack 与 Enterprise Grid
- **[feat(slack): add workspace routing for Enterprise Grid actions and events](https://github.com/openclaw/openclaw/pull/121014)** (`#121014`, P2, XL) — 为 Enterprise Grid 的 deferred Block Kit actions、modal callbacks、shortcuts 等保留来源 workspace 信息，避免路由歧义。
- **[refactor(slack): detect Enterprise Grid installs at runtime](https://github.com/openclaw/openclaw/pull/120864)** (`#120864`, P1, XL) — 从手动配置 `enterpriseOrgInstall` 改为运行时检测，消除配置漂移。
- **[fix(slack): support Enterprise Grid channel create and rename events](https://github.com/openclaw/openclaw/pull/121311)** (`#121311`, 已关闭) — 补上 channel_create / channel_rename 事件注册。

### 关键 Bug 修复
- **[fix(compaction): allow Claude CLI sessions to compact without API keys](https://github.com/openclaw/openclaw/pull/120496)** (`#120496`, P1, XL) — Claude CLI 会话的 `/compact` 不再需要 Anthropic API key，改为携带持久化的 native CLI binding。关联 #103231。
- **[fix: prompt caching breaks on Claude Opus 5 and Sonnet 5](https://github.com/openclaw/openclaw/pull/121283)** (`#121283`, P1) — 修复 OpenClaw 剥离 signed `thinking` blocks 导致 Anthropic prompt caching 失效、每次 tool-loop 全量重算的问题。关闭 #121251。
- **[fix(ui): restore Desktop panel launchers](https://github.com/openclaw/openclaw/pull/121322)** (`#121322`) — 修复 Cloud Worker Desktop 面板无法从工具栏或命令面板发现/启动的问题。

此外，维护者 steipete 今日密集提交了一批 UI 与脚本层修复（#121315、#121320、#121303、#121208），并在 #121302 中完成了 image/music/video 生成模块按关注点重构，消除重复的 alias-shell 模块。

---

## 社区热点

### 🔥 196 评论 — DeepSeek v4 Flash 静默回复失败（已关闭但复发）
- **[#116277](https://github.com/openclaw/openclaw/issues/116277) [CLOSED]** [P1, impact:message-loss] DeepSeek v4 Flash silent reply failure — no reply generated, generic fallback — 作者 sloptop-the-terrible，更新 2026-08-09
- **[#121058](https://github.com/openclaw/openclaw/issues/121058) [OPEN]** Silent reply failures still recurring after #116277 closed — no queued reply payload — 作者 sloptop-the-terrible，更新 2026-08-09

> **分析**：这是今日最热议题。#116277 被关闭后，监控 cron 仍在持续记录静默失败事件（包括 8/9 当天），用户不得不重开新 Issue #121058。深层诉求是「关闭 ≠ 修复」——项目需要一个可验证的修复标准（如回归测试或监控告警解除），而非仅基于代码层面的修复就关闭 Issue。

### 21 评论 — 嵌入运行器流式 thinking 签名失效（Anthropic）
- **[#92201](https://github.com/openclaw/openclaw/issues/92201) [OPEN]** [P1] Embedded runner: freshly streamed thinking signatures intermittently invalid on replay (Anthropic); recovery wrapper never fires because error text is genericized — 作者 CarlCapital，更新 2026-08-09

> **分析**：Slack 插件嵌入运行器在重放 Anthropic thinking blocks 时签名间歇性失效，且恢复包装器因错误文本被泛化而永不触发。签名验证属于 Anthropic API 的硬性要求，此 Bug 会导致会话无法恢复。已持续 2 个月未修复，且 `clawsweeper:not-repro-on-main` 标注表明主分支无法复现，增加了定位难度。

### 18 评论 — Codex hook 进程 CPU 占满 + Gateway RPC 停滞
- **[#91009](https://github.com/openclaw/openclaw/issues/91009) [OPEN]** [P1, impact:crash-loop] Codex PreToolUse native hook relay spawns CPU-bound openclaw-hooks processes and stalls gateway RPC — 作者 aspalagin，👍 2

> **分析**：Codex 集成 spawn 的 `openclaw-hooks` 进程消耗 ~100%+ CPU，并阻塞 Gateway RPC。两个 P1 级 issue（#91009 和 #97616 zombie 进程泄漏）指向同一类进程生命周期管理缺陷，社区对 hook/tool 子进程的资源管理关注度在上升。

### 16 评论 — Steer 模式不生效
- **[#48003](https://github.com/openclaw/openclaw/issues/48003) [OPEN]** [P1, impact:ux-friction, 👍 4] Steer mode does not inject messages mid-turn for main sessions — 作者 leiyangyou，更新 2026-08-09

> **分析**：`messages.queue.mode: "steer"` 无法在工具边界注入消息，消息需等到 turn 完成后才能进入。这是交互体验的关键缺陷——steer 模式的卖点即「中途干预」。根因指向 `KeyedAsyncQueue` 的引入，但尚无 fix PR。

---

## Bug 与稳定性

按严重程度排列（P0 > P1 > P2），标注 fix PR 状态：

### P0 — 发布阻断
| Issue | 问题 | 状态 |
|---|---|---|
| [#48920](https://github.com/openclaw/openclaw/issues/48920) | **Live Docs 超前于 Release** — 文档中的 `IsolatedSessions` 配置在 2026.3.13 中不存在，用户照文档配置会失败 | ⚠️ 无 fix PR，已公开 5 个月 |

### P1 — 高优先级
| Issue | 问题 | Fix PR 状态 |
|---|---|---|
| [#91009](https://github.com/openclaw/openclaw/issues/91009) | Codex PreToolUse hook 进程 CPU 占满，Gateway RPC 停滞 | ⚠️ 无 fix PR |
| [#92201](https://github.com/openclaw/openclaw/issues/92201) | Anthropic thinking 签名重放失效，恢复包装器不触发 | ⚠️ 无 fix PR（主分支无法复现） |
| [#121058](https://github.com/openclaw/openclaw/issues/121058) | **静默回复失败复发**（#116277 关闭后仍在发生） | ⚠️ 无 fix PR |
| [#31583](https://github.com/openclaw/openclaw/issues/31583) | `exec` 工具不继承 `skills.entries.*.env`，密钥无法注入子进程 | ⚠️ 无 fix PR |
| [#48003](https://github.com/openclaw/openclaw/issues/48003) | Steer 模式无法在 turn 中途注入消息 | ⚠️ 无 fix PR |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | Hook/tool 子进程泄漏，zombie 累积 | ⚠️ 无 fix PR |
| [#90378](https://github.com/openclaw/openclaw/issues/90378) | 5.28→6.1 升级后 cron store 静默迁移 SQLite，新任务默认 `delivery.mode=announce` 导致渠道错误 | ⚠️ 无 fix PR（修复方向待产品决策） |
| [#94939](https://github.com/openclaw/openclaw/issues/94939) | 6.x 状态迁移将 channel conversation-store SQLite 留空（0 字节），MS Teams 主动发送中断 | ⚠️ 无 fix PR |
| [#105528](https://github.com/openclaw/openclaw/issues/105528) | `exec`/`read` 在 Windows 上间歇性返回空输出（2026.6.x 回归） | ⚠️ 无 fix PR |
| [#96242](https://github.com/openclaw/openclaw/issues/96242) | 至少三条独立路径导致 Telegram 重复消息 | ⚠️ 无 fix PR |

**有 fix PR 的 P1 Bug：**
- [#116277](https://github.com/openclaw/openclaw/issues/116277)（DeepSeek 静默失败）— 已关闭，但复发（见 #121058）
- [#121251](https://github.com/openclaw/openclaw/issues/121251)（Claude Opus 5 prompt caching 失效）→ [PR #121283](https://github.com/openclaw/openclaw/pull/121283)
- [#120449](https://github.com/openclaw/openclaw/issues/120449)（工具循环警告未回传模型）→ [PR #120572](https://github.com/openclaw/openclaw/pull/120572)

### 今日新增值得注意的 P1
- **[#120735](https://github.com/openclaw/openclaw/issues/120735)** — Telegram 入站 sticker 到达时是裸文件引用，无描述且未暂存到磁盘，`image` 工具无法分析。标签 `clawsweeper:fix-shape-clear` + `queueable-fix`，修复形状已明确，等待认领。

---

## 功能请求与路线图信号

### 高呼声功能（含 👍 数）
| Issue | 功能 | 👍 | 分析 |
|---|---|---|---|
| [#67413](https://github.com/openclaw/openclaw/issues/67413) | **Per-agent dreaming 配置** — 当前 memory-core dreaming 对所有 workspace 同时执行，易触发 OOM | 5 | 多 agent 部署场景的刚需，已有并发内存峰值的具体数据支撑 |
| [#10659](https://github.com/openclaw/openclaw/issues/10659) | **Masked Secrets** — Agent 可用 API key 但不可见，防 prompt injection 窃取 | 4 | 与 #31583（exec 不继承 env）、#45740（gh-issues 注入）形成安全议题簇 |
| [#48003](https://github.com/openclaw/openclaw/issues/48003) | Steer 模式中途注入（见上） | 4 | P1 级交互缺陷，已有根因定位 |
| [#60572](https://github.com/openclaw/openclaw/issues/60572) | **Multi-Slot Memory 架构** — 允许多个 memory provider 并行处理不同层级的记忆 | 3 | 架构级变更，当前单 slot 限制明显 |
| [#95724](https://github.com/openclaw/openclaw/issues/95724) | 记忆按源目录索引而非按 agent，消除同 workspace 的多份向量库 | 1 | 解决多 agent 共享 workspace 时的存储浪费 |

### 可能进入下一版本的功能信号
- **[PR #120496](https://github.com/openclaw/openclaw/pull/120496)（Claude CLI 免 API key 压缩）** — 已有关联 Issue #103231，P1 级，落地概率高。
- **[PR #121198](https://github.com/openclaw/openclaw/pull/121198)（Android 9 支持）** — 第三次公开 PR 请求降低 Android 版本门槛（当前要求 Android 12），社区呼声持续，但合并风险标为 `🚨 compatibility`。
- **[PR #121014 / #120864 / #120942（Slack Enterprise Grid 系列）** — 同一作者 sjf-oa 连续提交 3 个 XL 级 PR，覆盖 workspace 路由、运行时检测、原生 approvals，表明 Grid 支持是当前渠道层的重点投入方向。
- **[PR #120398](https://github.com/openclaw/openclaw/pull/120398)（Linux 下分离 service-managed 工具子进程）** — 针对 #120386 的 Linux 部分修复，macOS/launchd 部分仍悬而未决。

### 路线图信号较弱的功能
- [#22438](https://github.com/openclaw/openclaw/issues/22438)（分层 bootstrap 文件加载）— 19 条评论但 0 👍，讨论度高但社区认可度一般。
- [#6599](https://github.com/openclaw/openclaw/issues/6599)（/models test-fallback 命令）— 11 条评论 1 👍，无维护者参与迹象。

---

## 用户反馈摘要

### 高频痛点（跨 Issue 复现）
1. **消息丢失/重复是头号问题**：DeepSeek 静默失败（#116277/#121058）、Telegram 重复消息（#96242）、MS Teams 迁移后数据丢失（#94939）、Matrix 房间循环（#114211）——多个渠道的报告指向核心会话/投递管道的稳定性不足。

2. **升级迁移反复出问题**：#90378（cron store 静默迁移）、#94939（conversation store 迁移留空 0 字节）、#107207（macOS 升级后旧 Node 链接残留）——用户对升级路径的透明度和稳健性有明显不满。

3. **Windows 支持仍薄弱**：#105528（exec/read 空输出）、#53628（XDG_CONFIG_HOME 未展开）、#52130（telegram.retry.jitter 类型不匹配）——跨平台一致性问题持续。

### 用户满意度亮点
- **UI 修复反馈积极**：PR #121259 的 task-suggestion 卡片改版（浮动定位 + 复制 prompt 按钮）是「第二轮 operator 反馈」驱动的迭代，#121258 修复了浏览器 tab 中光标样式错误——控制台的交互细节在被认真打磨。
- **维护者响应速度**：steipete 一日内提交 10+ 个 PR 覆盖 UI、脚本、CI、测试，且多个由 Full Release Validation 失败直接驱动（#121321、#121208），说明 CI 门禁在有效兜底。

### 具体用户声音
> 「#116277 被关闭了，但监控 cron 仍在记录新事件——关闭不等于修复。」— sloptop-the-terrible（#121058）

> 「文档说 `IsolatedSessions` 可用，但 2026.3.13 里根本没有——照着文档配置就挂了。」— Stoff81（#48920）

> 「XL 级 PR 合并风险标了 3 个 🚨（session-state / message-delivery / security-boundary），感觉 Grid 支持推进得有点急。」— 社区对 #121014 的评价（间接）

---

## 待处理积压

### 长期未响应的重要 Issue（按时间排序）
| Issue | 问题 | 创建 | 标签 | 备注 |
|---|---|---|---|---|
| [#10659](https://github.com/openclaw/openclaw/issues/10659) | Masked Secrets（P1） | 2026-02-06 | 👍 4 | 6 个月 + 无维护者回复 |
| [#31583](https://github.com/openclaw/openclaw/issues/31583) | exec 不继承 env（P1） | 2026-03-02 | 👍 2 | 5 个月 + 无 fix PR |
| [#48003](https://github.com/openclaw/openclaw/issues/48003) | Steer 模式不生效（P1） | 2026-03-16 | 👍 4 | 5 个月 + 根因已定位但无 PR |
| [#48920](https://github.com/openclaw/openclaw/issues/48920) | Live Docs 超前于 Release（P0） | 2026-03-17 | 👍 4 | 5 个月 + 发布阻断级别 |
| [#91009](https://github.com/openclaw/openclaw/issues/91009) | Codex hook CPU 占满（P1） | 2026-06-06 | 👍 2 | 2 个月 + 无 fix PR |
| [#92201](https://github.com/openclaw/openclaw/issues/92201) | Anthropic 签名重放失败（P1） | 2026-06-11 | 👍 1 | 2 个月 + 主分支无法复现 |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | zombie 进程泄漏（P1） | 2026-06-29 | 👍 1 | 1.5 个月 + 无 fix PR |

### 今日新增需关注
- **[#121058](https://github.com/openclaw/openclaw/issues/121058)**（P1，静默回复复发）— 新开即高热度（19 评论），需尽快确认 #116277 修复是否回滚或未覆盖全部路径。
- **[#120735](https://github.com/openclaw/openclaw/issues/120735)**（P2，Telegram sticker 不可用）— 修复形状已明确（`fix-shape-clear` + `queueable-fix`），但尚无认领者。

### 维护者行动建议
1. **为 #92201 安排 live-repro 或回滚错误信息泛化**——错误文本被泛化导致恢复包装器永不触发，这是可快速修复的根因。
2. **处理 #48920 的文档/发布版本错位**——P0 级发布阻断已悬置 5 个月。
3. **关注 #121058**——监控 cron 是最客观的「修复是否有效」的证据，建议将监控解除作为 #116277 关闭条件。

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向分析日报

**日期：2026-08-10**


## 1. 生态全景

当前个人 AI 助手开源生态处于**高吞吐迭代与稳定性瓶颈并存**的阶段。以 OpenClaw 为代表的头部项目日处理 500+ Issue/PR，但消息丢失、静默失败、进程泄漏等 P1 级稳定性问题持续积压，社区出现"关闭 ≠ 修复"的信任危机。与此同时，安全加固（SSRF 修复链、CVE 门禁、shell 绕过漏洞）成为多项目共同优先级，供应链安全正从可选变为必选。功能性方向呈现平台化分层：头部项目（OpenClaw、IronClaw、CoPaw）聚焦工具系统可扩展性与多渠道路由，中腰部项目（NanoBot、PicoClaw、NanoClaw）则在垂直场景和特定渠道体验上深耕。跨模型协作、上下文窗口管理、记忆系统架构是多个项目共同探索的前沿方向。


## 2. 各项目活跃度对比

| 项目 | Issues（新开/活跃） | PR（待合并/已合并关闭） | Release | 健康度评估 |
|---|---|---|---|---|
| **OpenClaw** | 426 活跃 / 74 关闭 | 323 待合并 / 177 合并关闭 | 无 | ⚠️ 高吞吐但 P1 积压风险累积，多个关键 Bug 无 fix PR |
| **NanoBot** | 5 更新 | 11 待合并 / 4 合并关闭 | 无 | ✅ 活跃且健康，安全 Issue 需紧急关注 |
| **Zeroclaw** | — | — | — | ❓ 摘要生成失败，无法评估 |
| **PicoClaw** | 3 更新 | 5 待合并 / 1 合并关闭 | 无 | ✅ 安全加固导向，功能增强并行 |
| **NanoClaw** | 1 新开 | 16 待合并 / 0 合并关闭 | 无 | ⚠️ 架构重构期，PR 积压但方向明确 |
| **NullClaw** | — | — | — | ⚪ 无活动 |
| **IronClaw** | 15 活跃 / 7 关闭 | 19 待合并 / 8 合并关闭 | 无 | ✅ 快速迭代，历史技术债清理中 |
| **LobsterAI** | 3 更新（全部开放） | 0 | 无 | ⚠️ 维护响应放缓，stale 积压 |
| **TinyClaw** | — | — | — | ⚪ 无活动 |
| **Moltis** | 2 新开 | 1 待合并 / 0 合并关闭 | 无 | ✅ 小幅迭代，无严重问题 |
| **CoPaw** | 16 更新 | 48 待合并 / 1 合并关闭 | 无 | ⚠️ 高产出但合并瓶颈明显（48 PR 积压） |
| **ZeptoClaw** | — | — | — | ⚪ 无活动 |
| **EasyClaw** | 0 | 0 | **3 个**（v1.8.93→v1.8.95） | ✅ 集中发版，社区静默 |


## 3. OpenClaw 在生态中的定位

**核心参照地位明确**：OpenClaw 是生态中唯一达到"平台级"规模的项目，日处理 500 条 Issue + 500 条 PR，远超其他项目（多在 5~50 条量级），社区规模约一个数量级领先。

**技术路线差异**：OpenClaw 采用"全渠道优先"策略（Slack Enterprise Grid、Telegram、MS Teams 等多渠道深度适配），其他项目多为"单渠道深耕"（NanoClaw 聚焦 Signal/Dial、PicoClaw 覆盖 Matrix/Telegram 桥接）。在会话管理、子 agent 调度、记忆架构等核心机制上，OpenClaw 的 PR 深度明显领先，但这也带来了更高的稳定性维护成本——当前 P1 级积压（静默失败、exec env 不继承、签名失效）均属于平台级架构的复杂性代价。

**生态影响**：多个项目（CoPaw、EasyClaw）直接将 OpenClaw 作为内置 runtime 或参照实现，其设计决策直接影响生态下游。


## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **消息/会话稳定性** | OpenClaw、NanoBot、PicoClaw、CoPaw | 静默回复失败（OpenClaw #121058）、Telegram 重复消息（OpenClaw #96242）、Telegram 轮询卡死（NanoBot #5156）、Matrix 重连缺失（PicoClaw #3203）、SSE 流式缓冲（CoPaw #6843） |
| **工具/技能系统安全** | NanoBot、PicoClaw、NanoClaw | `exec.allowPatterns` shell 链式绕过（NanoBot #5305/#5306）、SSRF 媒体下载修复链（PicoClaw #3322-#3324）、容器 CVE 修复与发布门禁（NanoClaw #3207/#3208） |
| **工具调用效率与可扩展性** | OpenClaw、IronClaw、CoPaw | 延迟工具发现需完整签名（IronClaw #7405/#7410）、并行批次真正并发（IronClaw #7407）、MCP 工具参数类型错误（CoPaw #6839）、exec 不继承 env（OpenClaw #31583） |
| **上下文窗口与 token 可观测性** | NanoBot、LobsterAI、CoPaw | token 消耗结构化记录（NanoBot #5299）、上下文窗口/输出 token 配置化（LobsterAI #1187）、DeepSeek V4 1M 上下文窗口目录（CoPaw #6846） |
| **多模型/跨模型协作** | LobsterAI、OpenClaw | 跨模型子任务状态感知（LobsterAI #2132）、自定义 provider 解析容错（LobsterAI #2453）、Claude 各版本 prompt caching 兼容（OpenClaw #121283） |
| **进程生命周期管理** | OpenClaw、NanoClaw | Codex hook CPU 占满（OpenClaw #91009）、zombie 进程泄漏（OpenClaw #97616）、host 生命周期钩子统一（NanoClaw #3214） |
| **记忆系统架构演进** | OpenClaw、CoPaw、LobsterAI | Per-agent dreaming 配置（OpenClaw #67413）、Multi-Slot Memory（OpenClaw #60572）、ReMe 记忆系统路线图（CoPaw #6840） |


## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构特点 |
|---|---|---|---|
| **OpenClaw** | 全渠道平台级助手，深度会话管理、子 agent 编排、记忆与工具系统 | 开发者/高级用户，多渠道重度使用者 | 模块化 monorepo，Python 核心 + 多渠道适配层，Enterprise Grid 等复杂路由 |
| **NanoBot** | 轻量级个人助手，WebUI + Telegram 双入口，技能市场 | 个人开发者、成本敏感用户 | Node.js 单体，Agent Plugins 生态化，强调部署简便 |
| **PicoClaw** | 社交渠道桥接（Matrix/Telegram/微信等），渠道协议深度适配 | 自托管用户、桥接场景 | Go 实现，多渠道桥接网关，偏向协议兼容与安全加固 |
| **NanoClaw** | 多渠道助手（Signal/Dial 等差异化渠道），硬化容器镜像 | 安全意识强的自托管用户 | 容器化部署，供应链安全（CVE 门禁、镜像加固）优先 |
| **IronClaw** | 自动化工作流引擎，工具发现与能力批次执行 | 自动化重度用户、Rust 生态偏好者 | Rust 实现，并行能力批次，Bug Bash 驱动 QA |
| **LobsterAI** | 大规模模型工作流，跨模型/多任务编排 | 多模型协作用户（OpenRouter/NVIDIA 等聚合平台） | 任务分层架构，网关级函数调用，重跨模型协调 |
| **CoPaw** | 企业级 AI 助手（原 QwenPaw），审批流、MCP 集成 | 企业用户、国产模型（Qwen/DeepSeek）用户 | Python 实现，AgentScope 框架，消息系统深度定制 |
| **Moltis** | Vault 安全存储，Apple Container 生态集成 | 苹果生态用户、注重安全配置者 | 平台集成导向，Vault 密钥管理为核心差异化 |
| **EasyClaw** | 开箱即用的桌面/客服助手 | 非技术用户、客服场景 | 封装 OpenClaw runtime，低门槛分发，Provider 扩展 |


## 6. 社区热度与成熟度

**第一梯队：快速迭代期（日 PR 提交量 20+，功能与稳定性并行推进）**
- **OpenClaw** — 吞吐量最高，但 P1 积压和"关闭≠修复"问题成为健康度隐患
- **CoPaw** — 产出旺盛（49 PR），但 48 条待合并 PR 显示审查能力成为瓶颈
- **IronClaw** — 迭代节奏快（27 PR），Bug Bash 驱动的 QA 文化效果显著

**第二梯队：质量巩固期（日 PR 提交量 5~15，以修复和增强为主）**
- **NanoBot** — 测试覆盖、CI 门禁强化，安全响应需提速
- **NanoClaw** — 架构重构期（host 生命周期、渲染器注册），方向清晰但合并缓慢
- **PicoClaw** — 安全加固横切序列推进，构建系统可靠性修复

**第三梯队：维护消化期（日 PR 提交量 ≤5，或集中发版）**
- **Moltis** — 小幅修复为主，无严重问题
- **LobsterAI** — 维护响应放缓，stale 积压，社区活跃但核心动作滞后
- **EasyClaw** — 集中发版模式（单日 3 Release），社区互动偏低

**无活动**：NullClaw、TinyClaw、ZeptoClaw


## 7. 值得关注的趋势信号

**① **"关闭 ≠ 修复"与可验证修复标准** — OpenClaw #121058 用户以监控 cron 数据证明 #116277 关闭后问题仍复发。这指向行业级痛点：**Issue 关闭机制需要绑定回归测试或监控解除等可验证标准**。对开发者启示：在修复 PR 中明确验证路径，将用户监控/复现数据纳入关闭条件。

**② 工具系统安全成为多项目同时升级的优先级** — NanoBot shell 绕过、PicoClaw SSRF 横切修复、NanoClaw CVE 门禁，三项目同日在安全方向提交 PR。**供应链安全从"可选加固"变为"发布前提"**，特别是容器化分发项目（NanoClaw #3208 的 CVE 门禁工作流值得借鉴）。

**③ 工具发现与调用的效率是"下一站"优化方向** — IronClaw #7405/#7410 要求工具搜索返回完整签名、CoPaw 出现 MCP 参数类型错误、OpenClaw 有 exec env 不继承问题。随着 agent 工具生态膨胀，**工具发现、签名完整性、参数类型安全**将成为制约扩展性的关键瓶颈。

**④ 多模型协作与上下文管理是高频真实需求** — LobsterAI 跨模型子任务协作、CoPaw 的 DeepSeek 1M 上下文目录修复、OpenClaw 的 Claude prompt caching 修复，均指向用户在多模型工作流中遇到的现实障碍。**模型切换、上下文窗口配置、跨模型成本控制**是可落地的差异化功能方向。

**⑤ Agent 状态真实性/可观测性影响用户信任** — IronClaw 用户质疑"61 vs 50 自动化计数不一致"、NanoBot 用户反馈"2 小时百万 token 不可见消耗"，均为 Agent 内部状态黑盒导致的信任问题。**提供可审计的状态报告、按调用维度的 token 日志**是建立长期信任的基础能力。

**⑥ 平台能力向移动端/低门槛分发延伸** — CoPaw 移动端适配（#6281）、OpenClaw UI 桌面面板修复、EasyClaw 的零门槛封装分发，显示生态正从"开发者工具"向"大众消费品"渗透，**触达场景扩展与安装门槛降低**是共同演进方向。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报

**日期：2026-08-10** | **数据来源：github.com/HKUDS/nanobot**


## 1. 今日速览

项目过去 24 小时活跃度较高，共产生 5 条 Issue 更新和 15 条 PR 更新，其中 4 个 PR 已合并/关闭，11 个等待合并。社区贡献节奏良好，覆盖 WebUI 修复、Telegram 连接稳定性、技能系统增强和文档改进等多个方向。**值得高度关注的是，今日新增两条安全相关 Issue（#5305、#5306），指出 `exec.allowPatterns` 存在 shell 链式命令绕过漏洞，属于潜在的高危安全问题，需尽快确认并修复。** 此外，token 消耗过大（#5266）和 Docker 部署权限问题（#5295）也是社区反馈的热点。无新版本发布。项目整体处于功能迭代与安全加固并行的活跃阶段。


## 2. 版本发布

过去 24 小时无新版本发布。


## 3. 项目进展

过去 24 小时有 4 个 PR 被合并/关闭，主要集中在以下方面：

| PR | 类型 | 说明 |
|---|---|---|
| [#5308](https://github.com/HKUDS/nanobot/pull/5308) | CI/CD & 测试 | 新增用户路径测试覆盖（交互式 CLI、WebUI 聊天 fork、版本检查、路由认证等），移除冗余测试，接入 V8 覆盖率报告并强化 CI 门禁。提升项目整体质量保障能力。 |
| [#5307](https://github.com/HKUDS/nanobot/pull/5307) | 文档 | 恢复 Star History 图表，更换了不受 GitHub 限制新 provider。 |
| [#5304](https://github.com/HKUDS/nanobot/pull/5304) | WebUI 修复 | 修复语音输入在非 HTTPS 环境下不可用的问题，在全语言 WebUI 中展示 HTTPS 要求说明，并补充了 LAN 访问的可信 HTTPS 方案文档。此修复解决了 Android Chrome 等浏览器在非安全上下文下禁用麦克风的实际痛点。 |
| [#4019](https://github.com/HKUDS/nanobot/pull/4019) | 关闭（未合并） | GitAgent Protocol 支持（agent.yaml + SOUL.md）经过长时间评审后关闭，建议后续可考虑以插件形式重新提交以匹配当前架构方向。 |

此外，有待合并的 PR 中包括几项重要功能：**token 用量结构化记录（#5299）**、**Agent Plugins 与 CLI Apps 集成（#5288）**、**模型无关的 computer use 工具（#4276，已存在 2 个月）** 以及 **Telegram 轮询卡死恢复（#5156）**。若这些合并落地，将显著增强可观测性、可扩展性和稳定性。


## 4. 社区热点

### 🔥 [#5266](https://github.com/HKUDS/nanobot/issues/5266) — token 消耗异常（13 条评论）
**关键词：token 消耗、可观测性、成本控制**

用户反馈 nanobot 在 2 小时内消耗了约百万级 token，且用户无感知活动。该 Issue 引发较多讨论，用户在评论中进一步描述了排查过程，评论区讨论了类似场景（如后台重试、工具循环、自动压缩/记忆机制）可能造成静默消耗的怀疑方向。核心诉求是**提供按调用维度的 token 消耗日志和监控能力**。目前已有对应 PR #5299（[结构化 token 用量记录 API](https://github.com/HKUDS/nanobot/pull/5299)）在待合并列表中，建议尽快推进。

### ✨ [#5295](https://github.com/HKUDS/nanobot/issues/5295) — Docker Compose 部署失败（5 条评论）
**关键词：部署、Docker、权限**

用户按 deployment.md 步骤部署，`docker compose logs` 报 `cannot open /usr/local/bin/entrypoint.sh: Permission denied`，容器反复重启（exit code 2）。评论中涉及对镜像权限设置和文档步骤的核查与讨论。该问题对新手部署影响较大，建议优先处理。


## 5. Bug 与稳定性

| 严重程度 | Issue | 描述 | Fix 状态 |
|---|---|---|---|
| 🔴 严重（安全） | [#5305](https://github.com/HKUDS/nanobot/issues/5305) | `exec.allowPatterns` 允许列表可被 shell 链式命令绕过，API 用户可执行未授权命令 | ❌ 无 fix PR |
| 🔴 严重（安全） | [#5306](https://github.com/HKUDS/nanobot/issues/5306) | `exec.allowPatterns` 存在 shell 链式绕过，可执行非预期命令（与 #5305 同源） | ❌ 无 fix PR |
| 🟠 中等 | [#5295](https://github.com/HKUDS/nanobot/issues/5295) | Docker Compose 部署失败：entrypoint.sh 权限拒绝 | ❌ 无明确 fix PR |
| 🟡 一般 | [#5311](https://github.com/HKUDS/nanobot/issues/5311) | Agnes AI 自定义 provider 对嵌套对象工具参数进行双重 JSON 编码，导致 MCP 调用失败 | ❌ 无 fix PR |


## 6. 功能请求与路线图信号

- **Token 用量可观测性**（[#5266](https://github.com/HKUDS/nanobot/issues/5266)）：社区强烈诉求。已有 PR [#5299](https://github.com/HKUDS/nanobot/pull/5299) 实现结构化 token 用量记录 API，大概率进入下一版本。
- **Computer Use / 浏览器自动化**（[#4276](https://github.com/HKUDS/nanobot/pull/4276)）：模型无关的 computer_use 与 browser 工具，已开放 2 个月，仍有冲突待解决，属于长期路线图方向。
- **Agent Plugins 生态集成**（[#5288](https://github.com/HKUDS/nanobot/pull/5288)）：通过 Agent Plugins v1 统一技能与 MCP 运行时包边界，并让 CLI Apps 复用同一分发机制。这是架构演进方向的重要信号。
- **Telegram 稳定性增强**（[#5156](https://github.com/HKUDS/nanobot/pull/5156)、[#5301](https://github.com/HKUDS/nanobot/pull/5301)）：从检测到自愈的分层方案，前者为完整 watchdog，后者拆出低风险可观测性部分，表明 Telegram 通道可靠性是当前重点。
- **外部托管 API Server 状态真实性**（[#5255](https://github.com/HKUDS/nanobot/pull/5255)）：WebUI 应如实反映非网关启动的 `nanobot serve` 实例状态，并新增 `nanobot api status` 命令。
- **市场技能覆盖内置技能**（[#5309](https://github.com/HKUDS/nanobot/pull/5309)）：允许 marketplace 技能覆盖同名内置技能，提升技能定制灵活性。


## 7. 用户反馈摘要

1. **成本敏感型用户反馈 token 消耗异常，且缺乏可观测手段**（[#5266](https://github.com/HKUDS/nanobot/issues/5266)）："millions of tokens in 2 hours without any noticeable activity"——用户希望精确掌握每个调用的消耗情况，当前黑盒状态不可接受。
2. **Docker 部署体验不佳**（[#5295](https://github.com/HKUDS/nanobot/issues/5295)）：按官方文档操作即失败，说明部署链路缺少充分的权限处理与验证，新手用户容易卡住。
3. **市场技能与内置技能同名冲突**（[#5309](https://github.com/HKUDS/nanobot/pull/5309)）：用户安装工作区技能时发现安装按钮被禁用，原因是市场被标记为已安装，实际未生效，属于误导性 UI 行为。
4. **Telegram 长稳运行隐患**（[#5156](https://github.com/HKUDS/nanobot/pull/5156)）：生产环境出现代理抖动后 bot 永久停止接收消息、日志静默，用户需要进程级 watchdog 才能恢复。
5. **Windows 用户技能脚本兼容性**（[#5303](https://github.com/HKUDS/nanobot/pull/5303)）：PowerShell 中 `curl` 别名导致天气技能首次执行失败，agent 需先报错再重试，体验不佳。


## 8. 待处理积压

| 项目 | 类型 | 持续时间 | 说明 |
|---|---|---|---|
| [#4276](https://github.com/HKUDS/nanobot/pull/4276) | PR（增强功能） | 开放约 2 个月 | model-agnostic computer use（browser + computer_use 工具），功能体量大，存在冲突，需维护者推进 review 或明确排期。 |
| [#5156](https://github.com/HKUDS/nanobot/pull/5156) | PR（bug 修复） | 开放 12 天 | Telegram polling 静默卡死的完整 watchdog 方案，关联生产环境事故（#5171），建议优先合并。 |
| [#5204](https://github.com/HKUDS/nanobot/pull/5204) | PR（重构） | 开放 9 天 | Responses capabilities 声明式重构，涉及 OpenAI/Copilot/DeepSeek 等多家 provider 行为对齐。 |
| [#4019](https://github.com/HKUDS/nanobot/pull/4019) | PR（已关闭未合并） | 开放约 2.5 个月后关闭 | GitAgent Protocol 支持，投入较大但未合入主分支，建议维护者给出明确说明或建议以插件形式继续。 |
| 安全 Issue #5305 / #5306 | Issue（安全） | 1 天 | 涉及 allowlist 绕过与任意命令执行风险，虽刚提交，但安全类问题建议立即评估、优先响应，避免影响扩大。 |

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 2026-08-10

## 今日速览

项目保持中高活跃度，过去24小时内共产生3条Issue更新和6条PR更新。值得注意的是，本轮PR以安全加固（SSRF防护）和功能增强（Telegram富文本表格）为双主线，全部集中在同一天提交，显示出维护者在安全治理和用户体验两个方向上的同步发力。Issue侧新增1条Telegram表格渲染的功能请求，并有1条持续一个月的Matrix重连Bug被标记关闭，但关闭原因为stale标记，核心问题能否解决仍需观察。今日无新版本发布，建议关注批量安全类PR的合并进展。

## 项目进展

今日合并/关闭的PR仅有一条：

- **[#3326] fix(web): remove duplicate pnpm lock entries** — 修复`pnpm-lock.yaml`中重复的`semver@7.8.5`映射条目，该问题会导致`pnpm install --frozen-lockfile`在CI中失败。属于构建系统可靠性修复，直接影响CI/CD管道的稳定性。

代码层面另外5条PR仍处于待合并状态，但其中多条与此前提交的安全修复（OneBot渠道已启用`BlockPrivateTargets`）构成完整序列，最值得关注的是跨渠道的SSRF漏洞修复PR链（#3322、#3323、#3324），详见下文Bug与稳定性板块。

## 社区热点

- **[Issue #3203] Matrix sync loop has no reconnection logic**（👍 2，评论8）— 尽管今日被打上stale标签并关闭，但它是过去一个月里讨论最持久的问题。用户`weissfl`描述了Matrix渠道的`/sync`长轮询在网络中断或homeserver重启后永久失效的场景，且由于主进程存活，systemd的`Restart=on-failure`机制不会触发。该场景对自托管用户是致命痛点——桥接服务"假死"且无自动恢复手段，讨论量反映了这一问题的普遍性。

- **[Issue #3325] Render Telegram tables with rich messages**（创建即入列，已关联PR）— 讨论热度暂低，但诉求清晰：Telegram Bot API 10.1已支持原生可视表格，而PicoClaw仍走`sendMessage`的HTML/MarkdownV2路径，结构化表格退化为纯文本或等宽代码块。该Issue作者同时提交了配套PR #3327，"自提自交"的模式说明用户对功能落地的意愿强烈。

## Bug 与稳定性

今日报告/修复的Bug按严重程度排列：

| 严重程度 | 编号 | 描述 | Fix PR | 状态 |
|---|---|---|---|---|
| 🟢 低（由stale机制自动关闭） | [#3203] | Matrix同步循环无重连逻辑，网络中断后连接永久死亡且systemd无法感知 | — | 已关闭，实际修复未验证 |
| 🟢 低（构建链路） | [#3326] | pnpm lock文件重复映射条目导致`--frozen-lockfile`安装失败 | #3326 | 已合并 |

**SSRF漏洞修复序列（新提交，值得重点跟踪）：**

- **[#3322] fix(channels): block private targets on inbound media downloads** — `utils.DownloadFile`已具备`BlockPrivateTargets`加固能力，但此前仅OneBot渠道启用了它，QQ/Telegram/Discord/LINE/Slack的入站附件下载仍存在SSRF风险，可被诱导访问loopback、link-local或RFC1918地址。
- **[#3323] fix(wecom): use CreateSafeHTTPClient for media downloads** — 企业微信渠道的`mediaClient`为原生`http.Client`，重定向可能到达内网。要求使用`CreateSafeHTTPClient`并在GET/POST前校验URL。
- **[#3324] fix(weixin): use CreateSafeHTTPClient for media downloads** — 微信公众号/个人号渠道存在同样问题，PR说明中指明与#3323为姊妹PR。

这三条PR共同表明：入站媒体下载的SSRF隐患曾在多渠道上普遍存在，而修复已形成完整的横切序列。建议维护者尽快评审合并，避免安全补丁长期悬挂。

## 功能请求与路线图信号

- **Telegram富文本消息渲染（#3325 + PR #3327）** — 用户`As-tsaqib`提出应利用Telegram Bot API 10.1的原生表格渲染能力，而非将Markdown表格降级为等宽代码块。配套PR已实现：检测GFM表格及HTML `<table>`块（排除内联/围栏代码内内容），并覆盖发送、回复/主题、编辑等路径。该能力将显著提升Telegram渠道的阅读体验，且用户已直接提供实现，属于高概率纳入下一版本的功能。需注意Bot API 10.1的版本要求是否与既有部署环境兼容。

- **IRC长消息支持（#3287）** — 用户`superuser-does`指出IRCv3中超过512字节的消息会被客户端自动拆分，PicoClaw仍视为多条独立消息。诉求是将拆分片段聚合为单一语义消息。当前无关联PR，但该问题涉及IRC协议的基础行为修正，属于体验改善类需求，短期进入路线图的把握不大。

## 用户反馈摘要

- **基础设施可靠性是最深的痛点**：Issue #3203中用户明确指出"主进程存活但同步已死"的状态最难排查——没有崩溃、没有日志告警，systemd无法感知。这类反馈指向运维可观测性的不足，比功能缺失更影响用户对项目的信任度。

- **用户愿意主动贡献实现**：Telegram富文本表格与IRC长消息两个Feature Request均由提出者自带PR或详细设计，说明核心用户群体技术能力强且参与意愿高。其中Telegram PR的提交质量较高（边界情况考虑周全），这是社区健康度的正向信号。

- **从discussion中可以看出对上游协议新特性的关注**：用户对Telegram Bot API 10.1新能力的引用精准，说明社区密切跟踪上游平台演进并期望PicoClaw同步跟进，这对项目保持平台竞争力提出了持续要求。

## 待处理积压

- **[#3222] refactor(deltachat): cleanup implementation, documentation -200LOC** — 创建于2026-07-03，已悬挂超过一个月。该PR涉及删除旧特性、移除密码认证、重命名API（`invite_link` → `join_invite_link` + `show_invite_link`）等破坏性变更，净减200行代码。长时间未获评审意见，可能阻塞DeltaChat渠道的后续功能开发。**该PR包含破坏性变更，若计划合入请尽早发布迁移说明。**
- **[#3203] Matrix sync loop has no reconnection logic** — 虽今日被自动关闭，但实际问题的修复并未合入，是典型的"关闭≠解决"案例。Matrix是社区常用渠道，建议维护者主动检查该逻辑是否在新版本中已通过其他方式改善，若无则在后续版本中专项处理。
- **SSRF修复PR链（#3322、#3323、#3324）** — 同一天提交的三条安全修复横向覆盖多个渠道，悬停时间不宜过长。且#3322 PR描述暗示"QQ/Telegram/Discord/LINE/Slack"五个渠道均受影响，影响面较大，建议优先排期评审。

---

*数据统计窗口：2026-08-09 至 2026-08-10 UTC+8 | 数据源：[PicoClaw GitHub](https://github.com/sipeed/picoclaw)*

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

### NanoClaw 项目动态日报 — 2026-08-10

---

#### 1. 今日速览

今日项目活跃度中等偏高。最显著的特点是 **PR 提交量激增（16 条待合并）**，其中一半以上来自核心贡献者 `zvi-fried`，主要围绕 host 生命周期管理、通道渲染器注册和数据库迁移等内部架构重构——这表明项目正处于**核心模块可扩展性改造阶段**。相比之下 Issues 更新寥寥（仅 1 条新开），今日无版本发布。值得关注的是，安全问题正成为近期 PR 的驱动力：一条关于 `tar` 关键 CVE 的修复、一条 Docker Hub 发布与 CVE 门禁工作流，以及一条关于 hardened-image 缺少 pip 通道的 Issue，共同构成了围绕**供应链安全与镜像加固**的讨论热点。此外，两条 Signal 适配器附件损坏的 PR 修正（#3142、#2529）显示旧的附件路径 bug 仍未收敛。

---

#### 2. 版本发布

今日无新版本发布或预发布。

---

#### 3. 项目进展

今日无 PR 被合并或关闭，但活跃的 16 条待合并 PR 清晰地反映了当前开发方向。核心进展体现在以下几个方面：

- **架构可扩展性（Refactor 系列）**：`zvi-fried` 提交了多个结构性重构，为插件式技能系统铺路，包括：
  - **PR #3214**：统一 host 模块生命周期钩子（启动、停止、重载逻辑收敛）。
  - **PR #3213**：引入通道问题渲染器注册机制，使不同渠道（Slack、Signal 等）可自定义交互提示。
  - **PR #3212**：为数据库模块建立迁移注册表，规范 schema 演进流程。
  - **PR #3186**：为技能自有的能力（skill-owned capabilities）添加 host 侧接缝（seams），允许技能更深度地调用 host 功能。
- **安全与供应链加固（核心团队主导）**：
  - **PR #3208**：新增 CI 工作流，将 agent 镜像发布至 Docker Hub，并在发布前通过 CVE 门禁（基于已有的 hardened-pin 验证）。
  - **PR #3207**：升级容器内 pnpm 与 npm，修复 `tar` 库的一个可修复的 critical 级别 CVE（GHSA-23hp-3jrh-7fpw）。
- **渠道集成**：`OmriBenShoham` 提交的 **Dial 渠道适配器**（#3041，支持 SMS 与 AI 语音通话）及其配套的安装向导与技能模型（#3050）仍在待合并状态，若落地将新增一个有实际差异化的通信渠道。

---

#### 4. 社区热点

今日没有单点讨论爆发的 Issue/PR（评论数普遍为 0），但以下 PR 因触及通用痛点而具备较高关注潜力：

- **[PR #3208] feat(ci): publish agent image to Docker Hub with CVE gates** — 该 PR 以 `[core-team]` 标签提交，包含 CVE 门槛的镜像发布流程，回应了社区对供应链透明度和安全基线的持续需求。
- **[PR #3217]（Issue）install_packages 缺少 pip 渠道** — 该 Issue 直接描述了当前硬化镜像无法用于依赖 Python 包安装的场景，属于对“生产环境可落地性”的明确诉求，关联到此前 stumpjumper 提交的文档修订（#3216）。

---

#### 5. Bug 与稳定性

| 严重程度 | 问题描述 | 状态 | 修复 PR |
|---------|---------|------|---------|
| **高** | Signal 渠道附件（图片/文件）被拼接进消息文本中不存在的路径，导致 agent 永远无法读取（#2529 关闭 #2528，另有 #3142 修正镜像/文件转发） | 修复 PR 待合并 | [#2529](nanocoai/nanoclaw PR #2529)、[#3142](nanocoai/nanoclaw PR #3142) |
| **中** | Slack 渠道中粘贴的表格无法被 agent 识别，丢失结构化信息 | 修复 PR 待合并 | [#3209](nanocoai/nanoclaw PR #3209) |
| **高（安全）** | 容器镜像中 `tar` (npm/pnpm 依赖) 存在 critical 级别 CVE（GHSA-23hp-3jrh-7fpw） | 修复 PR 待合并 | [#3207](nanocoai/nanoclaw PR #3207) |
| **中** | 容器内收到附件后，agent 不知道文件落地路径（文档缺失） | 文档 PR 待合并 | [#3210](nanocoai/nanoclaw PR #3210) |

---

#### 6. 功能请求与路线图信号

- **Python 包安装支持（明确需求）**：Issue [#3217](nanocoai/nanoclaw Issue #3217) 指出 `install_packages` 仅覆盖 apt 和 npm，请求增加 pip 渠道。鉴于 PR #3216（文档）已先行记录该限制，且社区对硬化镜像采纳意愿强烈，**该功能有较大概率进入下一版本规划**。
- **Dial 渠道**（#3041、#3050）：这是一个接近完成的新渠道功能，集成 SMS 和 AI 语音，若合并将直接拓宽产品适用场景。
- **Agent 镜像发布与 CVE 门禁**（#3208）：标志着项目开始输出可审计的发布产物，是走向企业级部署的重要信号。

---

#### 7. 用户反馈摘要

- **痛点（镜像采用障碍）**：Issue #3217 明确表达了仅凭 apt/npm 无法覆盖 Python 依赖的现状，直接阻断了一类用户（依赖 pip 工具）采用硬化镜像的路径，反馈直接、指向明确。
- **体验修复（附件处理）**：PR #2529 与 #3142 描述了 Signal 渠道附件因路径错误导致 agent 无法读取的长期缺憾，修复 PR 的再次活跃（#2529 今日有更新）表明该问题仍在被持续关注、尚未完全解决。

---

#### 8. 待处理积压

- **[PR #3050] feat(setup): 将 Dial 加入渠道选择器与向导（runChannelSkill 模型）** — 自 7-14 创建，已近一个月。Dial 渠道功能本身（#3041）已在待合并状态，建议维护者在合并主适配器时同步推进此 PR，并为渠道向导的扩展性提供注释。
- **[PR #2529] fix(signal): 将附件投递给 agent 而非丢弃** — 自 5-18 创建，虽与 #3142 存在功能重叠，但今日（8-09）仍有更新活动。建议维护者尽快协调合并策略，避免长期分叉导致维护成本上升。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

### IronClaw 项目动态日报 — 2026-08-10

---

#### 1. 今日速览

过去24小时项目活跃度处于高位：共处理22条Issue（15条活跃，7条关闭）和27条PR（19条待合并，8条已合并/关闭）。核心开发集中在工具发现机制优化（#7405、#7409、#7410）、并行能力批次执行（#7407）以及自动化触发失败通知（#7131）。值得注意的是，今日有大量此前长期搁置的QA类Issue（如#4341、#4344、#5510、#7292）被关闭，表明旧有Bug清理工作取得实质性进展。但与此同时，8月7日发起的Bug Bash产生了约10条新的P2级UI/UX问题（#7345-#7349系列），目前多数已获得对应修复PR，显示社区响应速度较快。无新版本发布，当前主线工作围绕v1.2.0功能集展开。

---

#### 2. 版本发布

过去24小时无新版本发布。

---

#### 3. 项目进展

今日合并/关闭的PR推动了以下关键进展：

- **[PR #7171]（已合并）** — 修复技能系统根本性缺陷：此前安装的技能会从设置面板消失且无法激活。该PR统一了所有技能挂载点的DB后端树，并使得技能自身的命令可运行。这是对技能系统的系统性修复，分拆出后续虚拟文件系统挂载（#7203）和多租户沙箱任务。**意义：填补了技能生命周期管理的核心空白。**
- **[PR #7387]（已合并）** — 依赖更新批次（12项），保持Rust生态同步。
- **[PR #7022]（已合并）** — GitHub Actions组依赖更新。
- **多条QA类Issue关闭**（#7292、#5552、#5509、#5522、#5510、#4341、#4344）：这些主要来自6-7月的Bug Bash报告，包括Runner心跳错误、无效结果错误、聊天创建延迟、Slack DM读取缺陷、思考链暴露等，均已通过修复验证。

**整体评估**：项目在技能系统、工具发现、故障通知三大方向均有实际代码落地，同时消化了大量历史技术债，整体健康度向好。

---

#### 4. 社区热点

今日讨论最活跃的Issues/PRs：

- **[Issue #7400]（新开，高严重度）** — `stream: true` + 外部`tools[]`组合在`/api/v1/responses`上100%复现中断，并留下无法删除的"zombie"线程。已在1.1.0-rc.1和1.1.0稳定版双重验证，严重度高。**已有对应PR #7401（返回稳定400错误）待合并。**
- **[Issue #7405]（新开，增强+性能）** — 改进延迟工具发现机制，当前`tool_search`返回信息不完整导致额外模型轮次。该Issue衍生了PR #7409（基线测试，100-1000工具规模）和PR #7410（返回完整签名），采用堆叠PR策略推进，显示社区对工具可扩展性的强烈关注。
- **[Issue #7407]（新开）** — 请求将`BatchPolicy::Parallel`批次真正并发执行，当前生产端口顺序执行所有批次。与#7405共同指向工具调用效率优化方向。
- **Emoji短代码渲染问题（#7346）**：多个用户反馈表情符号短代码显示为纯文本，对应PR #7404已提交修复，讨论热度较高说明UI细节影响面广。

---

#### 5. Bug 与稳定性

按严重程度排列：

| 严重度 | Issue | 描述 | 修复状态 |
|--------|-------|------|----------|
| **高** | [#7400](https://github.com/nearai/ironclaw/issues/7400) | `stream:true`+`tools[]`导致API中断并产生僵尸线程（1.1.0稳定版可复现） | PR #7401 已提交（返回稳定400） |
| **高** | [#7346](https://github.com/nearai/ironclaw/issues/7346) | Emoji短代码（如`:wave:`）显示为纯文本 | PR #7404 已提交 |
| **中高** | [#7348](https://github.com/nearai/ironclaw/issues/7348) | 长时间任务中Activity工具调用与进度消息时序错乱 | PR #7403 已提交 |
| **中高** | [#7349](https://github.com/nearai/ironclaw/issues/7349) | 刷新页面后部分运行历史与Activity时间线消失 | 无PR，待诊断 |
| **中** | [#7345](https://github.com/nearai/ironclaw/issues/7345) | Agent报告61个自动化但UI仅显示50个，疑似幻觉或计数不一致 | PR #7402 已提交 |
| **中** | [#5882](https://github.com/nearai/ironclaw/issues/5882) | Slack重复重连后认证流程进入死锁（7月9日报告，持续活跃） | 无PR，长期未解决 |

**回归风险关注**：8月7日Bug Bash集中暴露的WebUI问题（#7345-#7349）均已快速生成修复PR，但需关注这些修复本身是否引入新回归。

---

#### 6. 功能请求与路线图信号

- **[Issue #7405] → 工具发现增强**：要求`tool_search`返回完整参数签名，并支持命名空间感知的目录预览。**已有PR #7410实现Phase 1**，几乎确定进入下一版本。
- **[Issue #7407] → 并行能力批次执行**：要求`invoke_capability_batch`真正并发运行`Parallel`批次。与#7405共同指向工具调用效率优化方向。
- **[Issue #7392]（Epic）** — 实验性替换第一方编码工具为`oh-my-pi`固定工具面。该提案直接影响开发者体验，目前无反对评论，值得关注后续讨论。
- **[PR #7398] → Web推送通知**：将Web应用打造为一等通知渠道（W3C Web Push + PWA），实现与Slack/Telegram渠道的对等。若合并，将显著扩大自动化通知触达范围。
- **[Issue #7360] → 压力覆盖扩展**：要求将内置能力写入路径纳入夜间压力测试，防止回归静默引入，属于工程质量提升。

以上#7405/#7407/#7392信号明确指向**工具系统的可扩展性与效率**为下一版本核心主题。

---

#### 7. 用户反馈摘要

从Issues评论中提炼的关键反馈：

- **自动化计数不一致引发信任危机**（#7345）：用户对Agent声称的61个自动化与UI显示的50个不一致表示困惑，评论指出"要么Agent在幻觉，要么后端统计有误"。这反映出**用户对Agent状态报告准确性的高敏感度**，误导性状态描述比功能缺失更损害信任。
- **Slack认证死锁恢复成本高**（#5882）：用户反馈"除移除并重装扩展外无恢复手段"，且报错信息（如"工具输入无法编码"、"模型提供商暂时不可用"）与实际原因（Token吊销）毫无关联（#5878），**误导性错误信息是用户流失的核心痛点**。
- **工具调用过度**（#6046）：简单"邮件到表格"任务产生124次工具调用，用户评论质疑"Agent在解码邮件正文和无关内容分析上花费了过多精力"，指向**工具选择策略的精度不足**，这与#7405/#7407的优化方向一致。
- **中间进度消息泄露**（#5551）：Slack触发自动化将中间步骤消息（如"现在让我也检查一下..."）发送到频道而非最终结果，评论反馈"内部执行步骤被当作自动化输出投递"。
- **技能消失问题获得修复确认**（#7171评论区）：用户对修复后技能可重新激活表示确认，但也有评论反馈"安装后仍需重启会话才能生效"，提示可能存在残余边缘情况。

---

#### 8. 待处理积压

长期未响应的重要Issue，提请维护者关注：

| Issue | 创建时间 | 描述 | 持续天数 | 备注 |
|-------|----------|------|----------|------|
| [#6479](https://github.com/nearai/ironclaw/issues/6479) | 2026-07-22 | 例程可创建/修改其他例程，存在自复制自动化风险 | 19天 | P2级，无PR，无维护者回复 |
| [#6046](https://github.com/nearai/ironclaw/issues/6046) | 2026-07-13 | 简单工作流过度调用工具（124次） | 28天 | P2级，无PR，与#7405优化方向相关 |
| [#5878](https://github.com/nearai/ironclaw/issues/5878) | 2026-07-09 | GitHub Token吊销产生误导性错误信息 | 32天 | P2级，无PR，影响重认证流程 |
| [#5882](https://github.com/nearai/ironclaw/issues/5882) | 2026-07-09 | Slack重连后认证死锁，需重装扩展 | 32天 | P2级，无PR，持续活跃 |
| [#5551](https://github.com/nearai/ironclaw/issues/5551) | 2026-07-02 | 自动化向Slack发送中间进度消息而非最终结果 | 39天 | P2级，无PR |
| [#7076](https://github.com/nearai/ironclaw/pull/7076) | 2026-08-03 | PR：安装目录已发布的包（新贡献者+三个月陈旧rebase） | 7天 | PR待Review，属于新贡献者提交，需及时反馈避免流失 |

**优先建议**：#5878与#5882同属认证错误处理域，可合并修复；#6479涉及自动化安全边界，建议明确是否接受"例程嵌套"作为特性并设置节流保护；#7076为新贡献者PR，建议优先review以维持社区活跃度。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-08-10

## 今日速览

过去 24 小时内，LobsterAI 社区活跃度处于中等水平：共产生 3 条 Issue 更新，全部为开放状态，无关闭、无新增 PR，亦无版本发布。其中 2 条为陈年 Issue（#1187、#2132）被系统标记为 stale 后刷新活跃时间，仅 1 条为昨日新提交的 Issue（#2453）。值得关注的是，近期 Issue 集中在自定义模型适配与跨模型协作两个方向，反映了用户对多模型工作流的深度使用需求，项目核心维护动作暂缓，处于消化期。

## 项目进展

今日无 PR 合并或关闭，无代码层面的可见推进。项目当前进展主要体现在对既有 Issue 的持续讨论与根因定位上，尤其是在跨模型子任务协作机制（#2132）的排查中，社区与维护者已定位到网关级函数调用（gateway function call）与 sessions_spawn 创建的子任务在识别机制上的差异，为后续修复提供了明确方向。

## 社区热点

**Issue #2453（自定义模型切换被系统误判）** — 昨日新开，当日即获 1 条评论，是当前讨论热度最高的议题。用户反映在切换形如 `custom_1/openai/gpt-oss-20b:free` 的自定义模型时，系统依据 `provider/model` 格式将其误判为 OpenAI 官方模型而拒绝切换，该问题对 OpenRouter 免费模型与 NVIDIA 模型均存在影响，且仅在切换模型（非新建会话）时触发，严重干扰多模型工作流。

背后诉求：用户对开源/聚合平台（OpenRouter、NVIDIA）模型接入的兼容性有明确需求，期望系统在解析模型标识时能识别自定义前缀，而非简单依赖 provider 名称做白名单判定。该问题直接阻塞多模型协作场景，建议优先修复。

**Issue #1187（上下文窗口与输出 Token 设置缺失）** — 获得 2 条评论、1 个 👍，用户在使用 DeepSeek 模型时触发 `Context overflow: prompt too large for the model` 错误，核心诉求是在 API 设置面板中增加上下文窗口大小与输出 Token 的独立配置项，当前仅靠对话内 `/reset` 或换用更大上下文模型作为临时解法。

## Bug 与稳定性

| 严重程度 | Issue | 描述 | 状态 |
|---------|-------|------|------|
| 高 | [#2453](https://github.com/netease-youdao/LobsterAI/issues/2453) | 自定义模型（`custom_1/openai/...`）被系统误判为不许可，切换即被拒绝 | 无 fix PR，新开待处理 |
| 中 | [#1187](https://github.com/netease-youdao/LobsterAI/issues/1187) | DeepSeek 上下文溢出，缺少上下文窗口/输出 Token 的前置配置能力 | 无 fix PR，已 stale，持续 4 个月 |
| 中 | [#2132](https://github.com/netease-youdao/LobsterAI/issues/2132) | 跨模型子任务调用机制存在缺陷：网关级函数调用不在 sessions_list/subagents 中，主任务无法感知子任务完成/卡点状态 | 已完成根因定位，修复方案讨论中，已 stale |

当前无崩溃级或数据安全类 Bug 报告。高严重度 Issue #2453 尚未有维护者响应，存在演进为 stale 的风险。

## 功能请求与路线图信号

- **上下文窗口/输出 Token 可配置化（#1187）**：用户明确建议在模型 API 设置中增加这两个参数项。结合当前多模型协作的趋势，此配置项若落地，将有效缓解不同模型上下文上限差异带来的溢出问题，纳入下一版本的可能性较高。
- **跨模型子任务主动通知机制（#2132）**：用户提出两点优化建议：① 借鉴同模型子任务完成后主任务即时知晓的机制；② 子任务完成或卡点时主动向主任务发送通知。目前根因已定位到 gateway function call 的识别盲区，修复方案讨论中，属于明确的机制补强方向，有望进入后续迭代计划。
- **自定义模型 provider 解析容错（#2453）**：用户期望系统在解析 `custom_1/openai/...` 时识别自定义前缀而非默认认定为 OpenAI。此为平台兼容性优化，修复成本相对可控，是提升 OpenRouter/NVIDIA 等聚合平台体验的关键小改进。

## 用户反馈摘要

- **多模型协作是真实高频场景**：#2132 的用户正在实践"主任务（M3）规划+验收监督、子任务（DeepSeek）快速执行"的跨模型分工模式，且对同模型子任务与跨模型子任务在通知机制上的差异有细腻的观察，说明用户对任务编排有深入需求。
- **模型切换流程的碎片化干扰**：#2453 的用户指出"在一个线程里面切换模型尤其打扰"，新建线程沿用模型则不受影响。模型切换本应是高频轻量操作，当前却因 provider 误判频繁受阻，直接影响多模型探索效率。
- **上下文溢出缺乏前置规避手段**：#1187 的用户在 DeepSeek 运行中反复遭遇 context overflow 报错，现有 `/reset` 或换模型的方案均为事后补救，用户更期望在设置阶段就能根据模型能力配置窗口大小，从源头避免中断。

## 待处理积压

- **Issue #2132（跨模型子任务协作缺陷）**：创建于 2026-06-09，已 stale。根因已定位（网关级函数调用识别盲区），修复方案讨论中但两个月内无实质推进。此为多模型架构的核心机制问题，影响面较大，建议维护者优先跟进修复并明确排期。
- **Issue #1187（上下文窗口设置）**：创建于 2026-04-01，已 stale，持续 4 个月无实质进展。该需求直接关系到主流模型（DeepSeek 等）的可用性，建议结合新版本规划给予明确回应，或给出临时配置建议。
- **Issue #2453（自定义模型误判）**：昨日新开，尚无维护者响应。作为当前最高优先级的新 Bug，建议在 48 小时内给出初步回应或 workaround，避免进入 stale 队列。

---

**项目健康度总结**：当前项目处于"社区活跃提问、维护响应放缓"的不对称状态。新 Issue 产生频率适中，但 stale 问题积压与 PR 停滞表明核心维护力量可能聚焦于其他方向（或正在筹备版本发布）。建议维护者优先响应 #2453，并就 #1187、#2132 两个长尾问题给出明确路线图回应，以维持社区信任度。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 — 2026-08-10

## 今日速览

过去 24 小时内，Moltis 项目保持了中等活跃度：新增 2 个 Bug Issue（#1187、#1185），另有 1 个针对 Vault 恢复短语哈希逻辑的修复 PR（#1186）正在等待合并。目前没有新版本发布，也没有 PR 被合并或关闭，项目处于「收集问题、等待修复合并」的短暂停滞窗口。两个新 Issue 分别涉及 UI 表单状态管理和 Apple Container 沙箱集成，均属于真实使用场景中暴露的稳定性问题，值得优先关注。总体来看，项目健康度良好，未见严重回归或崩溃报告。

## 版本发布

过去 24 小时内没有新版本发布。

## 项目进展

今日没有 PR 被合并，但有一条值得关注的修复 PR 正在等待合并：

- **[PR #1186: fix(vault): normalize recovery phrase before hashing](https://github.com/moltis-org/moltis/pull/1186)** — 由 pxmpsdev 提交，修复 Vault 解锁时的恢复短语处理不一致问题。当前代码已在 `derive_recovery_kek` 中对恢复短语做规范化处理（去除短划线、转大写），因此解锁时用户输入小写或带横线的短语也能通过验证；但存储的哈希值却是基于原始输入计算，导致同一短语在不同键入方式下可能产生不同的哈希——该 PR 将哈希计算统一到规范化后的短语上，消除这一隐患。该修复涉及密钥派生与存储的核心路径，建议尽快 review 并合并，可关闭 `recovery_key_case_insensitive` 测试覆盖下的潜在不一致问题。

## 社区热点

今日新开的两个 Issue 均无评论和点赞，讨论热度不高，但各自对应明确的使用场景痛点：

- **[Issue #1185: Apple Container 1.x sandbox starts but Moltis treats it as not running](https://github.com/moltis-org/moltis/issues/1185)** — 用户 mikz 报告 Apple Container 1.x 沙箱实际上已启动，但 Moltis 错误地将其判定为未运行状态。这会导致容器管理界面显示错误状态，进而可能阻塞依赖该容器状态的后续自动化操作。该问题指向容器状态检测机制的可靠性，涉及与 Apple 沙箱运行时的集成层。

- **[Issue #1187: Heartbeat settings UI silently resets fields not represented by the form](https://github.com/moltis-org/moltis/issues/1187)** — 用户 IlyaBizyaev 报告 Heartbeat 设置界面在提交时，会静默重置表单中未展示的字段。这类「UI 无意覆盖隐式配置」的问题在配置密集型工具中较为常见，用户容易在不知情的情况下丢失已有设置。

## Bug 与稳定性

| 严重程度 | Issue | 描述 | 是否有修复 PR |
|---------|-------|------|-------------|
| 中 | [#1185](https://github.com/moltis-org/moltis/issues/1185) | Apple Container 1.x 沙箱启动成功但被误判为未运行 | 无 |
| 中 | [#1187](https://github.com/moltis-org/moltis/issues/1187) | Heartbeat 设置 UI 静默重置未被表单展示的字段 | 无 |
| 低 | [PR #1186](https://github.com/moltis-org/moltis/pull/1186) | Vault 恢复短语哈希基于原始输入而非规范化短语（已提修复） | ✅ 待合并 |

前两条 Bug 均无相关修复 PR 在跟进，建议维护者确认状态检测逻辑和表单绑定逻辑是否已有后续计划。

## 功能请求与路线图信号

过去 24 小时内没有明确的新功能请求。当前信号集中在质量修复层面：Vault 短语处理的一致性是数据持久化正确性方向的修复，而两个新 Issue 则指向 UI 状态管理和沙箱集成的健壮性。这些修复不涉及新功能规划，更多是既有功能的稳定性收尾。考虑到 Vault 修复 PR 已就绪，预计合并后会对 `recovery_key_case_insensitive` 相关测试做收尾。

## 用户反馈摘要

从今日的 Issue 中可提炼以下用户痛点：

- **UI 对隐式配置的静默覆盖令人困扰**（#1187）：IlyaBizyaev 遇到的场景是，Heartbeat 设置表单无法展示全部配置项，提交时却将这些隐藏字段重置为默认值。这反映了用户对「UI 操作不应产生不可见副作用」的期望，尤其在配置安全性较高的自托管场景中，这类静默行为可能导致监控策略意外变更而不自知。

- **容器状态误判影响自动化判断**（#1185）：mikz 的使用场景是 sandbox 实际已在运行，但 Moltis 状态检测结果与事实不符。这类误报会破坏用户对外部运行时状态的信赖，进而影响依赖状态判断的自动化流程（如自动重启、健康检查等）。

- **Vault 解锁大小写/短划线兼容已获认可**（PR #1186）：修复本身表明 `recovery_key_case_insensitive` 已被覆盖，反向说明用户此前提出过对大小写不敏感的需求，且已进入修复通道。

## 待处理积压

过去 24 小时数据中没有显示长期未响应的历史 Issue 或 PR。当前最需跟进的是两条新 Bug（#1187、#1185，均已开放 1-2 天）以及等待合并的 PR #1186（已开放 1 天），暂无严重超期积压。建议维护者优先处理 PR #1186 的 review 与合并，并尽快为两个新 Bug 打上标签和分配负责人，避免进入长期无人响应的积压状态。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报 — 2026-08-10

> 数据来源：github.com/agentscope-ai/CoPaw（QwenPaw） | 统计窗口：2026-08-09 ~ 2026-08-10


## 1. 今日速览

过去 24 小时项目整体活跃度**极高**：共产生 16 条 Issue 更新与 49 条 PR 更新，PR 积压数达到 48 条，数量为近期峰值。Issue 侧社区反馈集中在 **MCP 工具调用参数类型错误**（#6839）、**前端 SSE 流式输出缓冲**（#6843）、**Gemini Provider 兼容性**（#6812/#6844）等问题上，多项已有对应修复 PR 提交，响应速度良好。功能需求侧，**审批描述增强**（#6832）已获社区 PR 实现（#6854），**ReMe 记忆系统路线图咨询**（#6840）获得维护者回应，整体项目迭代节奏较快。值得注意的风险是：QwenPaw 2.1.0b2 存在**前端渲染器折叠长工具输出导致不可读**（#6848-#6852，同源重复提交）以及**杀软误报/拦截进程**（#6847）等体验类问题。无新版本发布。


## 2. 版本发布

过去 24 小时无新版本发布。当前公开版本为 v2.0.1（稳定版）与 2.1.0b2（测试版）。


## 3. 项目进展

过去 24 小时仅合并/关闭 1 条 PR，项目整体进入 PR 积压消化阶段。该合并 PR 值得关注：

- **[#6846] feat(providers): catalog DeepSeek V4 context windows (1M)**（已合并）— 为静态上下文窗口目录新增 `deepseek-v4-flash` 和 `deepseek-v4-pro` 条目（1,000,000 tokens），修复了此前这些模型被错误解析为 131,072 token 默认值、导致控制台显示 131.1K 并在 128K 处提前触发上下文压缩的问题。对 DeepSeek V4 用户属于直接的功能修复。https://github.com/agentscope-ai/QwenPaw/pull/6846

大量待合并 PR 处于未合并状态，这意味着功能进展更多体现在代码提交完成、而非主干合入。可重点关注 48 条待合并 PR 的未来合并节奏。


## 4. 社区热点

今日社区讨论热度最高的议题如下：

**🔥 长期任务召集帖（#2291）** — 66 条评论，持续 4 个多月仍保持活跃，多个新 PR（如 #6312 主题/皮肤模块草稿）由该任务列表认领产生。诉求：长期接收社区贡献者参与开发。https://github.com/agentscope-ai/QwenPaw/issues/2291

**🔥 Web 控制台移动端适配（#6281）** — 5 条评论，已开放 3 周，用户明确希望"方便在移动端操作"。目前无对应 PR，属于未被承接的前端增强需求。https://github.com/agentscope-ai/QwenPaw/issues/6281

**🔥 助手消息结束时间显示异常（#6826）** — 4 条评论。用户报告助手实际思考耗时 2 分钟，但页面显示仅几秒，属于**前端时间戳渲染与真实完成时间不一致**问题。已有对应修复 PR #6845（preserve assistant completion time）待合并。https://github.com/agentscope-ai/QwenPaw/issues/6826

**🔥 杀软拦截/强制关停 QwenPaw 进程（#6847）** — 2 条评论。用户对比指出"同样的任务和模型，QwenPaw 会被杀软打死，WorkBuddy 不会"，暗示 QwenPaw 的某些行为模式可能触发了杀软启发式检测。属于**可信度与分发性风险**问题，需维护者排查进程行为是否合理（如注入、hook 等模式）。https://github.com/agentscope-ai/QwenPaw/issues/6847

**🔥 前端工具输出渲染崩溃（#6848-#6852，重复提交）** — 同一用户提交 5 次几乎相同的 bug 报告。多行工具输出被折叠为不可读 blob。首次提交即未被足够重视，用户重复提交本身也说明反馈渠道效率不佳。https://github.com/agentscope-ai/QwenPaw/issues/6852


## 5. Bug 与稳定性

按严重程度排列：

### 🔴 高严重度

- **杀软拦截 / 强制关停 QwenPaw 进程**（#6847）— 用户进程被杀软强制终止，直接影响核心功能可用性。无对应 PR。"同样的任务和模型，QwenPaw 会被杀软打死，WorkBuddy 不会"，提示存在行为差异。可能需要排查进程行为是否触发启发式规则。https://github.com/agentscope-ai/QwenPaw/issues/6847

### 🟠 中严重度

- **MCP 工具调用将数字字符串以数字格式传参**（#6839）— v2.0.1 中，MCP 工具参数定义为 string 类型的 `apiKey`、`assetInfo`（如 `"1.000001"`）被以数字格式传递导致调用失败。直接影响依赖 MCP 的真实业务可用性。无对应 PR。https://github.com/agentscope-ai/QwenPaw/issues/6839

- **Gemini API 工具 schema 含 `$schema` 字段导致请求失败**（#6812）— Google Gemini API 不允许工具 schema 带额外字段，导致 "Model 'unknown' execution failed"。已有修复 PR #6844（strip unsupported Gemini schema metadata），待合并。https://github.com/agentscope-ai/QwenPaw/issues/6812 / https://github.com/agentscope-ai/QwenPaw/pull/6844

- **前端渲染器折叠长多行工具输出为不可读 blob**（#6848-#6852，同源 5 次提交）— 2.1.0b2 中工具调用返回大量原始文本时前端渲染不可读。无对应 PR。https://github.com/agentscope-ai/QwenPaw/issues/6852

- **助手消息结束时间显示异常**（#6826）— 实际思考 2 分钟但页面显示几秒，时间戳数据链路存在错误。已有修复 PR #6845 待合并。https://github.com/agentscope-ai/QwenPaw/issues/6826

### 🟡 低严重度

- **Auto-Dream 单单元集成失败导致整个任务标记为 error**（#6841）— 部分成功场景被误判为整体失败，建议引入重试与容错机制。无对应 PR。https://github.com/agentscope-ai/QwenPaw/issues/6841

- **prompts.py 文档与实现不一致**（#6853）— `prompts.py` 声称 dream 过程会自动同步 digest 到 MEMORY.md，但实际从未实现，属于文档误导 Agent 行为的问题。https://github.com/agentscope-ai/QwenPaw/issues/6853


## 6. 功能请求与路线图信号

- **[#6832] AI 审批时加入审批项目描述** — 用户建议 AI 提交权限审批时附带一句话用途描述，避免审查者逐行阅读 PowerShell 代码。**已有社区 PR #6854 实现**（本地化审批用途描述），且同时有 #6832 的同主题 Issue，说明该需求可能被纳入 2.1 版本。https://github.com/agentscope-ai/QwenPaw/issues/6832 / https://github.com/agentscope-ai/QwenPaw/pull/6854

- **[#6281] Web 控制台移动端适配** — 诉求清晰（"方便在移动端操作"），已开放 3 周，无对应 PR。属于明确但未被承接的前端增强需求。https://github.com/agentscope-ai/QwenPaw/issues/6281

- **[#6840] ReMe4 完整路线图（Auto-Link、三模态检索、4 类摘要权重）时间线咨询** — 有用户主动对照代码调研 2.1.0b2 中 ReMe Light 与 ReMe4 设计的差距，并请求路线图；已有 PR #6398（为 ReMe 记忆搜索添加 reranker 后端支持）推进其中部分能力。说明社区对记忆系统迭代关注度较高。https://github.com/agentscope-ai/QwenPaw/issues/6840

- **[#6842] 新增 hidden 标志以在 UI 选择器中隐藏 Agent** — 插件可创建仅供程序调用的内部 Agent，需在 UI 中隐藏但保持可用。已提交 PR，待合并。https://github.com/agentscope-ai/QwenPaw/pull/6842


## 7. 用户反馈摘要

- **MCP 工具调用失败是最直接的使用障碍**：用户 `vscodes2022` 报告"总是将像数字的字符串以数字格式传参，导致调用失败"，并给出详细的 schema 示例。https://github.com/agentscope-ai/QwenPaw/issues/6839

- **杀软误报影响信任感**：用户 `cmhaoso` 对比 QwenPaw 与 WorkBuddy 在杀软下的不同表现，暗示 QwenPaw 的某些行为（可能是代码注入、hook 或进程操作）触发了安全软件告警，这对分发型工具的信任损伤较大。https://github.com/agentscope-ai/QwenPaw/issues/6847

- **审批流程可用性不足**：用户反馈当前审批需要查看裸 PowerShell 代码才能判断用途，希望 AI 用一句话说明"该审批的用途"，让审查者"只需看一眼描述，就能简单判断是否通过"。https://github.com/agentscope-ai/QwenPaw/issues/6832

- **Auto-Dream 误报失败带来运维困惑**：用户 `MCQSJ` 反馈 nightly Auto-Dream 任务"大部分成功，只有一个集成单元 schema 校验失败，却导致整个任务标为 error"，建议引入重试与容错。https://github.com/agentscope-ai/QwenPaw/issues/6841

- **无法连接自定义 ascend-vllm 模型**（#5584）：1.1.7 可连接但后续版本均失败，模型配置界面测试全部通过，实际对话时提示 `openai.APIConnectionError`。该问题自 6 月底提出、已关闭，但关闭原因尚不明确。

- **长工具输出不可读的重复反馈**：用户 `lcq225` 同一问题提交 5 次（#6848-#6852），说明该问题对实际使用影响较大，且首次提交未得到足够响应。


## 8. 待处理积压

### 长期未响应或未解决的重要 Issue

- **[#5584] 无法连接自定义 ascend-vllm 模型**（已关闭）— 2026-06-27 创建，历经多次更新后于 8 月 9 日关闭。用户明确功能回归（1.1.7 可用、后续版本不可用），且涉及昇腾生态（国内政企客户常见），建议确认关闭原因及修复版本。https://github.com/agentscope-ai/QwenPaw/issues/5584

- **[#6281] Web 控制台移动端适配** — 已开放 3 周，无维护者回复、无 PR 认领。需求明确且社区呼声较高。https://github.com/agentscope-ai/QwenPaw/issues/6281

### 大量待合并 PR 积压（48 条）

| PR | 说明 | 提交时间 | 备注 |
|---|---|---|---|
| [#6398](https://github.com/agentscope-ai/QwenPaw/pull/6398) | ReMe 记忆搜索增加 reranker（后端） | 2026-07-23 | 已进入 Under Review |
| [#6715](https://github.com/agentscope-ai/QwenPaw/pull/6715) | OneBot 远程入站语音与图片媒体处理 | 2026-08-05 | 已进入 Under Review |
| [#6704](https://github.com/agentscope-ai/QwenPaw/pull/6704) | 会话 fork 快照到新会话 | 2026-08-05 | 已进入 ready-for-human-review |
| [#6360](https://github.com/agentscope-ai/QwenPaw/pull/6360) | 上下文注入角色由 system 改为 user（修复 #6358） | 2026-07-22 | 修复受 AgentScope 消息校验限制的系统角色注入问题 |
| [#6809](https://github.com/agentscope-ai/QwenPaw/pull/6809) | 清理 Chat Completions 内容以兼容严格 Provider | 2026-08-07 | 修复 StepFun 等严格兼容 Provider 的请求被拒问题 |
| [#6804](https://github.com/agentscope-ai/QwenPaw/pull/6804) | 微信渠道支持中文审批回复（允许/拒绝） | 2026-08-07 | 对应修复 #6728，微信用户可直接回复中文审批 |
| [#6844](https://github.com/agentscope-ai/QwenPaw/pull/6844) | 修复 Gemini 工具 schema `$schema` 字段冲突（对应 #6812） | 2026-08-09 | — |
| [#6845](https://github.com/agentscope-ai/QwenPaw/pull/6845) | 保留对话历史恢复后的助手完成时间（对应 #6826） | 2026-08-09 | — |
| [#6843](https://github.com/agentscope-ai/QwenPaw/pull/6843) | 纯 ASGI 中间件实现 SSE 流式实时输出 | 2026-08-09 | 修复 `BaseHTTPMiddleware` 导致的 SSE 缓冲问题 |
| [#6259](https://github.com/agentscope-ai/QwenPaw/pull/6259) | 无认证主机白名单支持 CIDR | 2026-07-19 | — |

48 条待合并 PR 的高积压量可能意味着维护者审查能力当前是瓶颈。建议关注 PR 合并节奏，以避免社区贡献者的积极性受挫。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

**EasyClaw 项目动态日报 — 2026-08-10**

---

## 1. 今日速览

截至 2026-08-10，EasyClaw 项目过去 24 小时社区活跃度处于低点，Issues 与 PR 均无新增或变动（0 新增/0 关闭）。项目核心动态集中在版本发布，共发布 3 个新 Release（v1.8.93 → v1.8.95），主要围绕运行时稳定性修复与 Provider 扩展。目前仓库无待合并 PR 与待处理 Issue，维护节奏呈现“集中发版、社区静默”的特征，项目整体健康度良好，但社区互动有待激活。

---

## 2. 版本发布

过去 24 小时连续发布 3 个补丁版本，均无破坏性变更，升级风险低。

| 版本 | 核心内容 | 类型 |
|------|----------|------|
| [v1.8.95](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.95) | 提升 Gateway 启动与渠道连接状态的稳定性 | 稳定性修复 |
| [v1.8.94](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.94) | 升级内置 OpenClaw runtime；新增 Groq Provider 支持 | 功能增强 |
| [v1.8.93](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.93) | Gateway 重连后可靠恢复已接受的客服任务 | 稳定性修复 |

**迁移注意**：v1.8.94 引入新的 Provider 依赖，若使用 Groq 服务需在配置中补充对应 API 密钥。macOS 用户若遇 Gatekeeper 拦截未签名应用（提示“RivonClaw is damaged”），需手动允许应用运行，文件本身未损坏。

---

## 3. 项目进展

过去 24 小时无 PR 被合并或关闭（0 条 PR 更新）。项目进展全部体现在 Release 中，主要推进方向为：

- **连接可靠性**：修复 Gateway 启动竞态、重连后任务状态丢失问题，强化了长连接场景下的任务持久性（[v1.8.93](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.93)、[v1.8.95](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.95)）。
- **生态扩展**：内置运行时与 OpenClaw 同步升级，并接入 Groq 作为新的推理后端，拓宽了模型选择范围（[v1.8.94](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.94)）。

尽管 PR 层面无合并动作，但连续版本迭代表明维护者在集中处理已知稳定性缺陷。

---

## 4. 社区热点

过去 24 小时无 Issues 或 PR 更新，无讨论热点。

---

## 5. Bug 与稳定性

今日无新报告的 Bug、崩溃或回归问题。

---

## 6. 功能请求与路线图信号

今日无新增功能请求。结合版本发行动向，以下信号值得关注：

- **Provider 多元化**（[v1.8.94](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.94) 新增 Groq）表明项目正推进多后端支持策略，后续可能继续接入更多推理服务（如本地模型、其他云厂商）。
- **恢复机制完善**：v1.8.93 对“已接受任务”的恢复处理，暗示项目正在强化客服场景下的可靠性，后续版本或围绕任务队列与故障转移做进一步加固。

---

## 7. 用户反馈摘要

过去 24 小时无新 Issue 评论或用户反馈。值得注意的是，在 Release 说明中发现一条高频提示：**macOS Gatekeeper 误报应用损坏**。该提示在 v1.8.93–v1.8.95 三个版本的更新日志中重复出现，说明有较多 macOS 用户遇到安装阻断问题。虽非代码缺陷，但建议维护者考虑对应用进行签名或提供一次性绕过指引的 FAQ，以降低新用户上手门槛。

---

## 8. 待处理积压

当前无长期未响应的 Issue 或 PR，积压压力为零。

</details>

---
*本日报由 [agents-radar](https://github.com/huang-yi-dae/agents-radar) 自动生成。*