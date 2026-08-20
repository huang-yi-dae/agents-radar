# OpenClaw 生态日报 2026-08-20

> Issues: 307 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-08-20 04:55 UTC

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

# OpenClaw 项目动态日报 — 2026-08-20

## 今日速览

过去24小时内，OpenClaw 项目更新密集：共 307 条 Issue 动态（新开/活跃 254 条，关闭 53 条）和 500 条 PR 动态（待合并 428 条，已合并/关闭 72 条），显示社区参与度与维护工作均处于高位。今日无新版本发布，但合入了多项针对模型选择（Codex/Claude CLI/GPT-5.6）与安全策略确认的关键修复。值得关注的是，P0 级网关启动阻塞问题（[#108435](https://github.com/openclaw/openclaw/issues/108435)、[#112395](https://github.com/openclaw/openclaw/issues/112395)）仍处于开放状态，为当前最大的稳定性风险点。


## 项目进展

今日无新版本 Release，重点回顾已合并/关闭的 PR 及其对项目的推进：

- **模型选择与认证修复（合并）**：[PR #126531](https://github.com/openclaw/openclaw/pull/126531) 修复了用户显式选择 Codex harness 后仍被静默切换到 embed 路径的问题；[PR #126492](https://github.com/openclaw/openclaw/pull/126492) 确保通过 Codex 选择 GPT-5.6 Max/Ultra 时推理强度不会被降级。两项合并直接回应了近期模型选择链路上的多个回归报告。
- **安全策略确认机制落地（合并）**：[PR #116489](https://github.com/openclaw/openclaw/pull/116489) 与 [PR #120900](https://github.com/openclaw/openclaw/pull/120900) 相继合入，为 `security.installPolicy` 引入 `warn` 返回值和 CLI/UI 双重确认界面，安装策略警告不再是一纸空文。这一系列改动可能成为后续安全审查类 Issue（如 [#79168](https://github.com/openclaw/openclaw/issues/79168)）的基础设施铺垫。
- **UI 细节修复（合并）**：[PR #126303](https://github.com/openclaw/openclaw/pull/126303) 修复了 Control UI 完成工作间距失衡的问题，属于小但高频的用户体验改进。

整体来看，项目今日专注于模型选择正确性、安全策略确认与 UI 打磨，属于稳定性和体验优化导向的一天。


## 社区热点

今日讨论最活跃的 Issue 集中在**消息/会话状态丢失**与**升级后启动失败**两类问题上，反映了用户对数据可靠性和版本平滑升级的高关注度：

- **[#48003 — 评论 20 条](https://github.com/openclaw/openclaw/issues/48003)**：`steer` 模式未在主会话轮次中注入消息，导致用户消息被排队到轮次结束。该 Issue 已持续 5 个月，带有 `diamond lobster` 高评级和 `linked-pr-open` 标签，说明已有修复 PR 在途但尚未合入。用户群体的反复 +1 表明此问题对依赖实时干预的高级用户影响显著。
- **[#38327 — 评论 14 条](https://github.com/openclaw/openclaw/issues/38327)**：2026.3.2 版本中 google-vertex/gemini-3.1-pro-preview 出现 "Cannot convert undefined or null to object" 回归错误。尽管创建于 3 月，今日仍有更新，可能与用户持续补充复现信息或维护者近期排查有关。
- **[#108435 — 评论 14 条](https://github.com/openclaw/openclaw/issues/108435)**：升级至 2026.7.1 后 gateway 无法通过 systemd、ollama、手动三种方式启动。P0 级且为 `diamond lobster`，无关联 fix PR，是当前最严重的未解决回归之一。
- **[#53628 — 评论 14 条](https://github.com/openclaw/openclaw/issues/53628)**：安装 skill 时 `${XDG_CONFIG_HOME}` 未被展开解释，Docker 部署用户受影响明显。
- **[#113306 — 评论 13 条](https://github.com/openclaw/openclaw/issues/113306)**：SQLite snapshot 恢复缺乏端到端崩溃与身份保证，涉及数据丢失风险（`impact:data-loss`），处于 `needs-maintainer-review` 状态。

**诉求分析**：评论数居前的 Issue 呈现高度一致性——用户对消息丢失、会话状态错乱、升级后启动失败这三类"伤筋动骨"的问题最为敏感，且这些问题大多已存活数月，社区耐心正在消耗。


## Bug 与稳定性

按严重程度排列今日活跃的 Bug/回归问题：

**P0 — 网关启动/升级阻塞（无 fix PR）**
- [#108435](https://github.com/openclaw/openclaw/issues/108435)：升级至 2026.7.1 后 gateway 完全无法启动（systemd/ollama/手动均失败），报错 `gateway did not start on 127.0...`。14 条评论，高活跃，带 `source-repro`。
- [#112395](https://github.com/openclaw/openclaw/issues/112395)：从 2026.6.11 升级至 2026.7.1 后启动迁移预检阻塞，迁移表与租约均为空，`diamond lobster` + `ux-release-blocker`。

**P1 — 消息/会话状态损坏（部分已有 fix PR）**
- [#48003](https://github.com/openclaw/openclaw/issues/48003)：`steer` 模式消息未注入主会话轮次，20 条评论，已有 linked PR。
- [#90944](https://github.com/openclaw/openclaw/issues/90944)：`sessions_yield` 恢复回复被记录但未投递，用户收到的是子代理原始摘要而非父代理回复——消息丢失类问题。
- [#80498](https://github.com/openclaw/openclaw/issues/80498)：子代理完成公告在 tool-use 轮次后可能过早或重复触发。
- [#119454](https://github.com/openclaw/openclaw/issues/119454)：卡死会话恢复被 `active_embedded_run` 自抑制，循环记录 `observe_only` 直到重启。
- [#83598](https://github.com/openclaw/openclaw/issues/83598)：`anthropic:claude-cli` OAuth 刷新在 2026.5.12 上仍然失效，尽管 #73682 声称已修复。
- [#77249](https://github.com/openclaw/openclaw/issues/77249)：Slack socket-mode 重连管理器在僵尸 WebSocket 上挂起，无事件无日志，需手动重启。

**P1 — 其他**
- [#38327](https://github.com/openclaw/openclaw/issues/38327)：google-vertex/gemini-3.1-pro-preview 对象转换回归，14 条评论。
- [#113306](https://github.com/openclaw/openclaw/issues/113306)：SQLite snapshot 恢复在父目录/身份守卫上缺乏持久化保证，`data-loss` 风险。
- [#124284](https://github.com/openclaw/openclaw/issues/124284)：v2026.8.1-beta.2 的流包装器导致 vLLM `openai-completions` 子代理生成畸形 XML 工具调用。

**P2 — 值得关注**
- [#88657](https://github.com/openclaw/openclaw/issues/88657)：DeepSeek V4 Flash 在 2026.5.27/28 产生不完整轮次（`payloads=0, tools=2`），5.26 正常，指向回归。
- [#95610](https://github.com/openclaw/openclaw/issues/95610)：OpenAI 模型路径上逐轮动态注入破坏前缀缓存，增加延迟与成本。
- [#95840](https://github.com/openclaw/openclaw/issues/95840)：`contextPruning` 的 `cache-ttl` 模式对 OpenAI 模型永远不会触发，因为 `isCacheTtlEligibleProvider` 直接排除了 OpenAI。


## 功能请求与路线图信号

- **投递队列 TTL（[#16555](https://github.com/openclaw/openclaw/issues/16555)）**：要求为投递队列消息增加可配置 TTL，防止 gateway 重启后陈旧消息洪水式冲刷频道。已有 `linked-pr-open` 标签，且为 `diamond lobster` 级别，**较可能进入下一版本**。
- **模型降级审批模式（[#33975](https://github.com/openclaw/openclaw/issues/33975)）**：用户要求主模型失败时可选需审批的降级模式，而非静默切换，同时要求消息中标注实际使用的模型。与今日合并的 [PR #116489](https://github.com/openclaw/openclaw/pull/116489)（安装策略确认）在"可审计的人工干预"方向上同频，路线图信号积极。
- **可配置会话启动消息（[#45501](https://github.com/openclaw/openclaw/issues/45501)）**：`session.resetPrompt` 让用户自定义 `/new` 或 `/reset` 后的注入文本，当前为硬编码。`needs-product-decision` 挂起，需产品侧拍板。
- **`maxTurns`/`maxToolCalls` 限制（[#9912](https://github.com/openclaw/openclaw/issues/9912)）**：限制 agent 工具迭代次数，防止模型忽略系统提示进入死循环。P2 级别，`diamond lobster`，价值明确但设计需要谨慎。
- **工具输出提示注入扫描（[#79168](https://github.com/openclaw/openclaw/issues/79168)）**：在 XML 结构性隔离之外增加内容级扫描，当前处于 `needs-security-review`，属于安全路线图上的长期议题。
- **消息内联合并（[#15022](https://github.com/openclaw/openclaw/issues/15022)）**：将交错的文本与工具调用块合并为单条出站消息，减少 Telegram 等渠道的消息轰炸。已有 `linked-pr-open`。
- **WhatsApp 贴纸发送（[#7476](https://github.com/openclaw/openclaw/issues/7476)）**：当前 `message` 工具发送 `.webp` 时仅为普通图片而非贴纸。

综合来看，投递队列 TTL、消息内联合并与模型降级审批是近期路线图上最有可能落地的三项。


## 用户反馈摘要

- **升级焦虑真实存在**：[#108435](https://github.com/openclaw/openclaw/issues/108435) 与 [#112395](https://github.com/openclaw/openclaw/issues/112395) 的持续活跃证明用户对"升级即破坏"的容忍度正在下降。有生产用户在 [#123799](https://github.com/openclaw/openclaw/issues/123799) 中明确请求：受 Codex 404 问题影响的生产环境需要**安全升级/回退操作指南**，而不是等待下个版本修复——这类"运维指导"诉求是社区声音中容易忽视的部分。
- **OAuth/认证刷新问题反复**：[#83598](https://github.com/openclaw/openclaw/issues/83598) 用户反馈"修复后仍无效"并附详细环境，说明跨版本认证一致性测试需要加强。
- **静默失败是最大的挫败感来源**：[#58957](https://github.com/openclaw/openclaw/issues/58957) 指出模型切换时上下文过大导致静默失败、无明确错误提示；[#108215](https://github.com/openclaw/openclaw/issues/108215) 反映上下文用量从 57% 骤降至 13% 且无压缩记录——用户面对这些状态变化时完全无法判断系统是否正常。
- **多智能体场景是高频痛点**：[#56692](https://github.com/openclaw/openclaw/issues/56692)（群聊上下文串扰）、[#124926](https://github.com/openclaw/openclaw/issues/124926)（`infer image generate` 在多 agent fleet 中缺少 agent 选择器）、[#122625](https://github.com/openclaw/openclaw/issues/122625)（Matrix 房间无法解析会话路由）——多 agent 功能的完成度直接影响采用信心。
- **正面反馈**：[#126303](https://github.com/openclaw/openclaw/pull/126303) 与 [#123535](https://github.com/openclaw/openclaw/pull/123535) 等 UI 打磨 PR 的及时合入，说明维护团队对小而明确的体验问题响应迅速，社区对此类"听得见反馈"的行为有积极评价。


## 待处理积压

以下 Issue/PR 长期未获关键进展或维护者行动，建议重点关注：

- **[#48003 — 存活 157 天，评论 20 条](https://github.com/openclaw/openclaw/issues/48003)**：`diamond lobster` 级别的消息注入缺陷，已有 linked PR 但迟迟未合入。作为社区最活跃 Issue，长期挂起对信任度消耗很大。
- **[#30381 — 存活 172 天，`recovery-stuck`](https://github.com/openclaw/openclaw/issues/30381)**：`x-openclaw-agent-id` 头存在时仍校验 `model` 字段。`needs-maintainer-review` + `needs-product-decision` 双重挂起，5 个月无实质进展。
- **[#77249 — 存活 108 天，`recovery-stuck`](https://github.com/openclaw/openclaw/issues/77249)**：Slack 重连僵尸态导致需手动重启，`diamond lobster` 且无 fix PR。
- **[#16555 — 存活 187 天，`recovery-stuck`](https://github.com/openclaw/openclaw/issues/16555)**：投递队列 TTL 需求，`diamond lobster` + `linked-pr-open`，但 PR 与 Issue 均未合入/关闭。
- **[#77733 — 存活 107 天，`recovery-stuck`](https://github.com/openclaw/openclaw/issues/77733)**：裸 `/new` 与 `/reset` 不再触发人格问候的回归，社区 +1 较多，但多个标签（needs-maintainer-review、needs-product-decision）间循环。
- **[#112395 — P0 存活 30 天](https://github.com/openclaw/openclaw/issues/112395)**：升级迁移阻塞为发布阻断级缺陷，无关联 PR 且 6 条评论后无维护者回应，升级链路风险在持续累积。
- **[PR #96011 — 存活 58 天](https://github.com/openclaw/openclaw/pull/96011)**：Skill Workshop 防护修复，`waiting on author` 但长时间无更新，维护者可能需要介入或主动关闭。

---

## 横向生态对比

# AI 智能体开源生态横向对比分析日报 — 2026-08-20

## 1. 生态全景

个人 AI 助手/自主智能体开源生态正处于**高密度迭代期**：以 OpenClaw 为首的平台型项目单日处理 807 条 Issue/PR 动态，NanoClaw、CoPaw、Zeroclaw 等中坚力量同步保持每日 30–50 条 PR 级更新量。各项目不约而同将资源投向**安全加固**（渠道授权、工具隔离、漏洞修复）、**记忆/会话可靠性**（防覆盖、防丢失、断点恢复）与**模型降级透明度**三条主线。生态内部已出现明确分工——通用平台、垂直场景（电商/教育/硬件）、本地优先、安全优先等差异化定位正在固化。值得注意的是，**升级稳定性与数据可靠性**已成为跨项目用户投诉最集中的共性痛点，直接影响社区信任度。

## 2. 各项目活跃度对比

| 项目 | Issues 动态 | PR 动态 | Release | 健康度评估 |
|------|------------|---------|---------|-----------|
| **OpenClaw** | 307（新开/活跃 254，关闭 53） | 500（待合并 428，合并/关闭 72） | 无 | 高活跃但承压：P0 网关启动阻塞未解，合并积压巨大 |
| **NanoBot** | 3 新开 | 20（合并/关闭 7，待合并 13） | 无 | 良好：问题响应快（OAuth 数小时即有修复 PR），但 8 条 conflict 积压 |
| **Zeroclaw** | 26 条更新 | 50（合并/关闭 7，待合并 43） | 无 | 高活跃：43 条待合并积压明显，RFC 决策阻塞风险升高 |
| **PicoClaw** | 1 关闭 | 5（关闭 2，待合并 3） | 无 | 中低：stale PR 悬置，新功能输入有限 |
| **NanoClaw** | 3 新开 | 33（合并/关闭 23） | 无 | 高活跃：Slack 重构密集推进，但新机安装/Node 26 兼容性薄弱 |
| **NullClaw** | 0 | 1 待合并 | 无 | 低：维护模式，仅文档修复 |
| **IronClaw** | 未披露总量（热点 #7732 等） | 39（合并/关闭 18，待合并 21） | **v1.3.0** | 健康：v1.4.0 功能密集落地，CI 超时根因已修复 |
| **LobsterAI** | 2 stale | 9（合并/关闭 8，待合并 1） | 无 | 中：安装器问题响应快，4 个月 PR 未合并需关注 |
| **TinyClaw** | 0 | 0 | 无 | 静默 |
| **Moltis** | 1 关闭 | 4 合并/关闭 | **20260818.10** | 健康：CWE-306 当日闭环，无积压 |
| **CoPaw** | 19（新开 3，关闭 16） | 45（合并/关闭 26，待合并 19） | 无 | 高活跃：稳定性修复效率高，但历史信任事件（#2884）亟待官方结论 |
| **ZeptoClaw** | 0 | 0 | 无 | 静默 |
| **EasyClaw** | 0 | 0 | **v1.8.101–103** | 发布驱动：24 小时 3 版迭代，但社区输入为零，反馈渠道存疑 |

## 3. OpenClaw 在生态中的定位

- **生态核心参照系**：OpenClaw 的单日动态量（307 Issues / 500 PRs）是第二名 CoPaw 的约 7 倍，是 NanoBot 的 25 倍，事实上定义了行业问题分类与严重度评估标准（如 `diamond lobster`、P0/P1 分级、`source-repro` 标签体系）。
- **技术路线差异**：OpenClaw 走"全栈聚合"路线——统一接入 Codex/Claude CLI/GPT-5.6 等模型 harness、多渠道消息网关、技能系统、安全策略与 Control UI，追求"开箱即用的个人 AI 中控"；而 Zeroclaw 倾向"精简核心 + 外部集成"，IronClaw 侧重"本地沙箱 + 企业级能力规范"，NanoBot 则聚焦"轻量 TUI + 记忆压缩"。OpenClaw 的覆盖面最广，但也因此承担了最大的回归面风险（今日 2 个 P0 网关启动问题即为例证）。
- **社区规模优势**：OpenClaw 拥有生态内最活跃的反馈回路——单 Issue 最高 20 条评论、PR 提出到合并响应以天计；但 428 条待合并 PR 与 157 天未合入的 `diamond lobster` Issue（#48003）也暴露了超大规模社区的治理瓶颈。这是其他中小项目尚未面临的结构性挑战。

## 4. 共同关注的技术方向

| 方向 | 涉及项目 | 具体诉求 |
|------|---------|---------|
| **安全加固与权限确认** | OpenClaw、Zeroclaw、Moltis、NanoBot | 安装策略需用户确认（OpenClaw #116489）；渠道发件人校验/Shell 子进程隔离/工具 allowlist 强制（Zeroclaw #9428/#9827/#9433）；Vault 接口未鉴权 CWE-306（Moltis #1177）；仅手动调用技能（NanoBot #5405） |
| **记忆/会话状态可靠性** | OpenClaw、NanoBot、Zeroclaw、CoPaw、PicoClaw | 消息丢失与注入错位（OpenClaw #48003）；后台保存覆盖新会话（NanoBot #5271）；ACP 失败轮次消失（Zeroclaw #9333）；envs.json 损坏被静默覆写（CoPaw #7118）；路由 agent 不记忆历史（PicoClaw #3316） |
| **模型降级与可审计回退** | OpenClaw、PicoClaw | 主模型失败时需审批而非静默切换，并标注实际模型（OpenClaw #33975）；可配置默认模型回退链（PicoClaw #3200） |
| **OAuth/凭据管理** | NanoBot、OpenClaw、Zeroclaw | Docker 环境 OAuth 存储权限（NanoBot #5444）；OAuth 刷新跨版本失效（OpenClaw #83598）；Anthropic stored OAuth profiles（Zeroclaw #9420） |
| **多智能体/多租户上下文隔离** | OpenClaw、CoPaw、NanoClaw | 群聊上下文串扰（OpenClaw #56692）；钉钉群共享/隔离上下文可配置（CoPaw #7158）；Slack agents 按需安装以隔离复杂度（NanoClaw #3357/#3358） |
| **安装/升级健壮性** | NanoClaw、Zeroclaw、EasyClaw、CoPaw | Node 26 下 better-sqlite3 构建失败（NanoClaw #3359）；Windows `TaskDialogIndirect` 缺失启动失败（Zeroclaw #9290）；macOS Gatekeeper 拦截（EasyClaw）；打包后端 PATH 解析（CoPaw #5861） |
| **本地 MCP/工具链打通** | IronClaw | 本机 MCP server 无法通过 stdio 或 loopback HTTP 接入（IronClaw #5998），外部贡献者已提交窄方案 PR #7757 |
| **卡死/静默失败可恢复** | CoPaw、OpenClaw、NanoBot | LLM 流中断永久停在 Thinking 态（CoPaw #7102/#7150）；卡死会话被自抑制循环（OpenClaw #119454）；后台任务失败无日志（NanoBot #5431） |

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构关键差异 |
|------|---------|---------|----------------|
| **OpenClaw** | 通用智能体中控：多模型 harness、多渠道网关、技能/安全策略、Control UI | 技术发烧友、高级个人用户、中小团队 | 聚合式架构，模型选择层（Codex/Claude CLI/GPT-5.6）与网关深度耦合 |
| **NanoBot** | TUI/WebUI 优先的轻量助手，记忆压缩与澄清交互创新 | 开发者、本地优先用户 | 内存压缩复用对话前缀、`ask_clarification` 中断式交互 |
| **Zeroclaw** | 安全/权限契约驱动的模块化核心 | 安全敏感的自托管者、企业 PoC | RFC 主导治理，渠道授权/Shell 隔离/工具 allowlist 为一级公民 |
| **PicoClaw** | 嵌入式/轻量部署（Sipeed 硬件背景），Telegram 体验打磨 | 硬件玩家、轻量机器人场景 | 低资源占用，Telegram 私聊/forum/topic 深度适配 |
| **NanoClaw** | Slack 优先的团队助手，provisioning 与安装体验工程化 | 团队协作场景、Slack 重度用户 | `--slack-agents` opt-in 产品边界设计 |
| **IronClaw** | 本地沙箱 + 企业级能力规范（MCP/Provider 错误统一、持久化 per-user sandbox） | 开发者、本地/内网部署 | 容器复用（Docker Exec ~40ms）、能力响应规范化、CI 超时治理 |
| **LobsterAI** | 中文桌面应用，Agent 协作（Cowork）+ 文件预览，Windows/macOS 安装器 | 中文个人/教育用户 | 桌面壳 + 引擎分离，安装器两阶段上传 |
| **Moltis** | 安全优先的自托管助手，WhatsApp 深度适配 | 隐私敏感的自托管用户 | Vault 凭据体系、严格鉴权审计、渠道语义（mention/reply）精细处理 |
| **CoPaw** | 中文生态 + Computer Use 视觉 Agent，远程媒体/PDF 处理 | 中文用户、视觉自动化场景 | 远程媒体冻结/SSRF 防护、Computer Use 窗口表面观察、记忆静默通知 |
| **EasyClaw** | 飞书集成 + 达人协作/WMS/多店铺运营自动化 | 电商运营团队 | 无社区 PR 流程，纯 Release 驱动，飞书连接器 + 审批流 |

## 6. 社区热度与成熟度

**第一梯队——超大规模迭代（每日 30+ PR 级）：** OpenClaw、CoPaw、Zeroclaw、NanoClaw。共同特征是合并吞吐高、Issue 响应快，但也都面临不同程度的积压或回归风险。OpenClaw 与 Zeroclaw 的 PR 积压（428/43 条）开始成为治理负担。

**第二梯队——质量巩固期（每日 7–20 PR 级）：** IronClaw、NanoBot、LobsterAI、Moltis。合并节奏适中，修复闭环率高：Moltis 当日 4/4 PR 关闭且无积压；IronClaw 发布 v1.3.0 后正以模块化节奏推进 v1.4.0 系列 PR。

**第三梯队——缓慢/维护模式：** PicoClaw（stale PR 悬置）、NullClaw（仅文档修复）、EasyClaw（有版本无社区）。

**第四梯队——静默：** TinyClaw、ZeptoClaw，24 小时零动态。

**成熟度特征信号：**
- 头部项目开始出现**产品边界收缩**：NanoClaw 将 Slack agents 改为 opt-in，Zeroclaw 讨论精简核心，均为早期"大而全"策略后的主动回调。
- 治理透明化成为新焦点：Zeroclaw 建立维护者决策队列（#8692），IronClaw 面临外部贡献 PR 40 天无官方回应，积压的 RFC 与 `do-not-merge` 标记正在考验社区耐心。
- 中文社区项目（CoPaw、LobsterAI、EasyClaw）在 UI 细节、本地化渠道（钉钉/飞书）与安装器层面的投入显著，但 CoPaw 的历史数据安全事件（#2884）提醒：信任修复比功能迭代更紧迫。

## 7. 值得关注的趋势信号

1. **安全默认值正在成为准入门槛**：Moltis 的 Vault 未鉴权漏洞、Zeroclaw 的 Shell 逃逸/渠道发件人校验、OpenClaw 的安装策略确认——安全不再只是配置项，而是从架构层内嵌（权限契约、子进程隔离、原子写入）。新项目若未在设计初期考虑安全边界，将很快在社区审查中暴露。

2. **"升级即破坏"焦虑已跨项目蔓延**：OpenClaw P0 网关启动失败（#108435/#112395）、Zeroclaw 新配置天生损坏（#9436）、NanoClaw Node 26 构建失败——用户对版本升级的容忍度显著下降，已有生产用户明确要求**安全升级/回退操作指南**而非等待补丁。提供迁移预检、回滚路径和升级前验证将成为项目的核心竞争力。

3. **静默失败是最大的体验杀手**：CoPaw 的"Thinking 无限挂起"、OpenClaw 的"上下文用量骤降无压缩记录"、NanoBot 的"后台失败无日志"——用户能容忍功能缺失，但不能容忍系统无反馈。可观测性（turn 级轨迹、失败终态持久化、显式错误码）正从可选项变为必选项。

4. **模型降级必须可解释、可审批**：OpenClaw 与 PicoClaw 同时收到"模型回退链"相关诉求，且用户明确反对静默切换。结合 CoPaw 的"模型幻觉 URL 导致会话瘫痪"，可以推断：**模型的不可靠性需要由平台层兜底，且兜底行为必须对用户透明**。

5. **多智能体场景进入深水区**：上下文串扰、群聊共享/隔离语义、agent 选择器、持久化沙箱——各项目正从"单 agent 对话"向"多 agent 协作/多租户隔离"迁移，但完成度参差不齐。先解决隔离与路由正确性的项目将获得差异化优势。

6. **本地优先与轻量化回潮**：NanoBot 的本地记忆压缩、IronClaw 的本地沙箱与环回 MCP 支持、Zeroclaw 的"精简核心"RFC——在 SaaS/PaaS 主导的背景下，一部分用户明确偏好数据不出本机的部署形态。本地 MCP 传输缺口（IronClaw #5998）是一个被验证但未满足的真实需求。

7. **治理效率决定生态位**：Zeroclaw 的维护者决策队列、IronClaw 悬置 40 天的外部贡献、OpenClaw 157 天未合入的高评级 Issue——社区活跃度与治理效率之间的剪刀差正在扩大。能够建立快速决策机制（如定期 RFC 评审、P0 限时响应 SLA）的项目，将更有效地将社区热情转化为项目资产。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目日报 — 2026-08-20

## 今日速览

过去 24 小时 NanoBot 项目保持高度活跃：新增 3 个 Issue（全为开放状态），PR 活动密集，共 20 条，其中 7 条已合并/关闭，13 条待合并。无新版本发布。值得关注的是 TUI/WebUI 与 Docker OAuth 存储问题集中获得修复，同时多条 PR 已标记合并冲突等待处理。整体项目健康度良好，但积压 PR 的冲突解决与合并效率需维护者关注。

---

## 版本发布

今日无新版本发布。

---

## 项目进展

今日 7 条 PR 被合并/关闭，覆盖 TUI、WebUI、内存管理、技能系统等多个模块：

- **[PR #5449] fix(tui): keep navigation commands in Herdr panes**（已合并）— 修复 Herdr 托管面板中 TUI 导航命令不可用的问题，明确 Herdr 管理终端布局、nanobot 管理会话/新聊天/分支的职责边界。→ https://github.com/HKUDS/nanobot/pull/5449
- **[PR #5448] feat(tui): start fresh chats in launch workspace**（已合并）— TUI 每次启动默认创建全新 WebSocket 会话，以命令启动目录作为初始工作区，移除旧的 last-session 持久化逻辑。→ https://github.com/HKUDS/nanobot/pull/5448
- **[PR #5443] fix(tui): expose /exit in command menu**（已合并）— 将 `/exit` 注册为 TUI 本地命令并加入斜杠命令菜单，统一退出路径。→ https://github.com/HKUDS/nanobot/pull/5443
- **[PR #5440] perf(memory): reuse conversation prefix for local compaction**（已合并）— 内存压缩复用模型对话前缀构建请求，保留结构化工具调用，同时禁用工具执行，提升压缩效率。→ https://github.com/HKUDS/nanobot/pull/5440
- **[PR #4527] Add ask_clarification tool**（已合并）— 新增内置 `ask_clarification` 工具，支持在智能体回合中中断并向用户提问，附带 context trimming 保留澄清上下文。→ https://github.com/HKUDS/nanobot/pull/4527
- **[PR #5438] fix(webui): return promptly after Ctrl-C**（已合并）— 修复 WebUI 客户端按 Ctrl-C 后退出卡住的问题，释放租约并保留网关优雅关闭流程。→ https://github.com/HKUDS/nanobot/pull/5438
- **[PR #5341] fix(skills): make weather workflow Windows-safe**（已合并）— 修复 Windows PowerShell 中 `curl` 被 `Invoke-WebRequest` 别名解析导致天气技能失败的问题。→ https://github.com/HKUDS/nanobot/pull/5341

整体来看，今日合并内容集中在终端体验与稳定性修复，`ask_clarification` 工具的合入为后续交互式 Agent 能力打下基础。

---

## 社区热点

尽管今日 Issue/PR 评论数据未标注详细热度，但以下条目因主题集中、跨 PR 联动而成为社区关注焦点：

- **Docker OAuth 登录问题（Issue #5444 + PR #5446 + PR #5445）** — Issue #5444 报告 Docker 中 OpenAI OAuth 登录失败（`PermissionError`），仅数小时内出现两条针对性修复 PR：PR #5446（CLI 路由 OAuth 存储至 nanobot 数据目录）、PR #5445（Docker 镜像持久化 OAuth 客户端数据）。这是今日最典型的"问题-修复"即时联动。→ https://github.com/HKUDS/nanobot/issues/5444 ｜ https://github.com/HKUDS/nanobot/pull/5446 ｜ https://github.com/HKUDS/nanobot/pull/5445

- **Dream 内存游标卡死（Issue #5441 + PR #5442）** — Issue #5441 描述 Dream 运行中即使完成有效记忆编辑仍被判定为 "did not complete"，导致同一历史批次被重复处理、产生重复编辑。PR #5442 直接修复该问题并在提交信息中引用 issue。→ https://github.com/HKUDS/nanobot/issues/5441 ｜ https://github.com/HKUDS/nanobot/pull/5442

- **带 conflict 标记的 PR 集群** — 目前 8 条 PR 被标注 `conflict`，其中包含 P0/P1 级别的关键修复（见"待处理积压"部分），维护者需重点关注以避免功能延迟落地。

---

## Bug 与稳定性

按严重程度排列：

| 严重程度 | Issue/PR | 描述 | 修复状态 |
|---------|----------|------|----------|
| **高（P0）** | [PR #5271] | 后台任务陈旧保存可能覆盖 `/new` 后的新会话数据，属数据竞争问题 | PR 已开放，带 `conflict` 标记，需解决冲突后合并 → https://github.com/HKUDS/nanobot/pull/5271 |
| **中（P1）** | [Issue #5444] | Docker 中 OpenAI OAuth 登录失败，`oauth-cli-kit` 默认目录不可写，抛出 `PermissionError` | 已有 PR #5445、#5446 双线修复，均待合并 → https://github.com/HKUDS/nanobot/issues/5444 |
| 中（P1） | [PR #5403] | tiktoken 估算 token 数比 API 实际值低 30-50%，导致上下文超限时内存整合不触发 | PR 待合并，带 `conflict` 标记 → https://github.com/HKUDS/nanobot/pull/5403 |
| 中 | [Issue #5441] | Dream 恢复的工具错误导致内存游标永久阻塞，后续 Dream 运行重复处理同一历史批次 | 已有 PR #5442 修复，待合并 → https://github.com/HKUDS/nanobot/issues/5441 |
| 低（P2） | [PR #5431] | 后台任务失败异常未记录日志，难以排查问题 | PR 待合并 → https://github.com/HKUDS/nanobot/pull/5431 |

---

## 功能请求与路线图信号

- **付费安全扫描 MCP 集成（Issue #5447）** — 用户提出将 nanobot 与 Solana x402 微支付安全扫描服务集成，作为付费 MCP 服务对外提供。这反映了社区对自主 Agent 变现与安全能力的交叉需求，可能引导项目在 MCP 生态和支付原语上的探索。→ https://github.com/HKUDS/nanobot/issues/5447

- **支持仅手动调用的技能（PR #5405）** — 为技能增加 `disable-model-invocation: true` frontmatter，使部署/发布等副作用技能仅限用户显式触发。该 PR 已在开放队列中，符合 Agent 安全性的社区共识方向。→ https://github.com/HKUDS/nanobot/pull/5405

- **WebUI 后续追问建议（PR #5408）** — 在 WebUI 回合结束后生成简短会话级联建议，对齐 DeerFlow 交互模式。→ https://github.com/HKUDS/nanobot/pull/5408

- **Turn 级可观测性与安全恢复（PR #5420）** — 将每次用户回合投射为独立答案面，保留推理/工具/文件编辑轨迹，并在中断时显示恢复入口。→ https://github.com/HKUDS/nanobot/pull/5420

- **nano_timer 核心工具（PR #4853）** — 新增强大但零依赖的计时器工具，自动处理时区/DST，已开放 1 月余，带 `p1` 与 `conflict` 标记，建议维护者优先处理。→ https://github.com/HKUDS/nanobot/pull/4853

---

## 用户反馈摘要

- **Docker 部署是 OAuth 痛点的重灾区（Issue #5444）**：用户 `Bennett-Yang` 在 Docker 环境执行 OAuth 登录时遭遇权限错误，说明容器内非 root 用户运行场景的凭证目录管理仍不完善。两个独立贡献者（`Shizoqua`、`dangzitou`）同时提交修复，反映该问题在社区中具有较高影响面。

- **Dream 的重复编辑困扰用户（Issue #5441）**：用户 `flobo3` 描述了 Dream 因单个可恢复工具错误（如 `edit_file` 旧文本不匹配）被整体判定失败，导致"成功的编辑反而被重复执行"的逆直觉行为。用户对"结果正确但流程被误判"的反馈说明了 Agent 任务完成判定不能过于刚性。

- **自然语言"永远跟进"导致的持续目标失控（PR #5257）**：用户指出携带循环节奏（如"每天跟进我"）的请求因缺少终止条件被记录为永久持续目标，内部资源可能被无限占用。这体现了 Agent 长期目标语义边界的设计缺口。

---

## 待处理积压

以下为长期未合并/未响应的重要 PR 与 Issue，按优先级提醒维护者：

- **[PR #5271] [P0, conflict]** fix(session): prevent stale background task saves from overwriting session data — 8 月 6 日创建，已开放 2 周，属数据安全/一致性问题，务必尽快解决冲突完成合并。→ https://github.com/HKUDS/nanobot/pull/5271

- **[PR #4853] [P1, conflict]** feat(tools): add nano_timer core tool — 7 月 8 日创建，开放超 6 周，功能本身已完整却迟迟未落地，需维护者评估冲突原因。→ https://github.com/HKUDS/nanobot/pull/4853

- **[PR #5403] [P1, conflict]** fix(memory): use API-reported prompt tokens to trigger consolidation — 修复 token 估算严重偏低导致上下文整合永不触发的问题，建议优先合并。→ https://github.com/HKUDS/nanobot/pull/5403

- **[PR #5379] [P2, conflict]** fix(memory): preserve full consolidation input — 将压缩截断改为无损分块，涉及数据完整性，且与 #5403 同属记忆子系统的关键修复。→ https://github.com/HKUDS/nanobot/pull/5379

- **[PR #5405] [P2, conflict]** feat(skills): support manual-only invocation — 安全相关功能，长时间未合并可能降低社区对技能系统安全性的信心。→ https://github.com/HKUDS/nanobot/pull/5405

- **[PR #5257] [P2]** fix(agent): bound sustained-goal continuation when the turn goes idle — 开放 2 周余，解决长期目标无限续期的资源问题，建议尽快安排 review。→ https://github.com/HKUDS/nanobot/pull/5257

---

> **健康度总结**：项目社区参与度高，Issue 响应迅速（OAuth 问题数小时内即有修复 PR），TUI/WebUI 稳定性持续改善。需关注 P0 PR #5271 的合并进度以及 8 条 PR 的冲突积压，控制技术债累积速度。

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-08-20

## 1. 今日速览

过去 24 小时项目活跃度极高：26 条 Issue 更新、50 条 PR 更新，其中 43 个 PR 待合并、7 个已合并/关闭，无新版本发布。当前主线集中在安全加固（渠道发件人授权、Shell 子进程隔离、工具 allowlist 强制）与稳定性修复（ACP 会话持久化、配置初始化损坏、工具结果截断）两大方向，多个高优先级 P1 修复已有对应 PR 进入待合并队列。架构层面，4 个 RFC 正在维护者评审中，讨论集中在核心精简与权限契约定义。合并积压明显（43 个待合并 PR），建议维护者优先处理带 `needs-maintainer-review` / `do-not-merge` 标记的关键路径变更。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日 7 个 PR 已合并/关闭（列表未披露具体 PR），1 个 Issue 关闭：

- **[Task] Correct Reliable fallback telemetry attribution and stale notices (#9470，已关闭)** — 修正了 Reliable 回退遥测归属错误和用户可见回退通知不准确的问题，由 vrurg 提交，关联 PR #9424 与 #9447 的评审反馈。链接：https://github.com/zeroclaw-labs/zeroclaw/issues/9470

项目整体推进情况：虽然无版本发布，但 43 个待合并 PR 中体现了显著的前进势头——渠道授权安全修复（#9428）、Shell 子进程逃逸修复（#9827）、Anthropic OAuth 支持（#9420）、插件类型化配置验证（#9126）等大型变更均处于待合并状态。这些 PR 若合并将同时推进安全性、渠道兼容性、可发布性三条线。

## 4. 社区热点

今日讨论最活跃的 Issue：

- **RFC: Prefer a lighter ZeroClaw core through external integrations (#6165)** — 17 条评论。4 月底创建，讨论持续至今，社区对核心膨胀问题关注度高，主张将长尾集成外置。诉求：降低默认核心的配置、安全与兼容性负担。https://github.com/zeroclaw-labs/zeroclaw/issues/6165
- **[Tracker]: Maintainer decision queue for RFCs and design issues (#8692)** — 13 条评论。维护者决策队列，收集需要 maintainer 或 code-owner 关注的 RFC、设计问题、发布策略问题。反映出社区对决策透明度和响应速度的期待。https://github.com/zeroclaw-labs/zeroclaw/issues/8692
- **RFC: Define the SOP capability permission contract (#9598)** — 8 条评论。SOP 能力权限契约定义，目标 v0.9.0，区分临时 owner/risk-profile 执行路径与完整共享权限系统。https://github.com/zeroclaw-labs/zeroclaw/issues/9598
- **refactor(gateway): centralize webhook channel message dispatch (#8586)** — 7 条评论。网关层统一 webhook 到渠道的消息分发，当前 7 个讨论集中在复用消息生命周期的边界划分。https://github.com/zeroclaw-labs/zeroclaw/issues/8586

PR 侧评论数未披露，但 `size:XL` 与 `do-not-merge` 标记的大规模 PR（#9420、#9428、#9378、#9419）预计为社区讨论焦点。

## 5. Bug 与稳定性

按严重程度排列：

**S1 - 工作流阻塞**

- **failed ACP turns disappear after switching sessions (#9333)** — ACP 轮次在 provider 错误后切换会话再返回，整个失败的轮次从实录中消失。已有对应修复 PR #9378（persist failed and cancelled turn transcripts，size:XL，需作者行动）。https://github.com/zeroclaw-labs/zeroclaw/issues/9333
- **Windows desktop installer fails with missing TaskDialogIndirect (#9290)** — Windows 桌面版安装后无法启动，缺少 TaskDialogIndirect 入口点。同为新提交的支持请求 #10111 确认此问题，暂无修复 PR。https://github.com/zeroclaw-labs/zeroclaw/issues/9290
- **bug(ci): MSRV system dependency installation can consume job timeout (#10042)** — MSRV 构建任务可能将完整 20 分钟超时消耗在系统依赖安装阶段，导致 Cargo 检查从未启动。已有修复 PR #10122（pinned release-tool installer，待验证）。https://github.com/zeroclaw-labs/zeroclaw/issues/10042

**S2 - 降级行为**

- **headless SOP step turns never persisted (#9929)** — headless SOP 步骤轮次分配了会话路径但未写入会话存储。状态：blocked、accepted，无修复 PR。https://github.com/zeroclaw-labs/zeroclaw/issues/9929
- **`config init` writes template sections that fail the strict loader (#9436)** — 新生成的配置天生损坏，`config migrate` 退出码 1。状态：in-progress，影响 v0.8.3 及 master。https://github.com/zeroclaw-labs/zeroclaw/issues/9436
- **工具结果截断三连（#10114 / #10115 / #10116）** — ① `max_tool_result_chars` 固定 50,000 与模型上下文无关；② 截断在模型上下文之外不可见；③ 截断采用中间挖空方式（保留头 2/3 + 尾 1/3），建议改为溢出到文件句柄，类似 `web_fetch`。https://github.com/zeroclaw-labs/zeroclaw/issues/10114 / https://github.com/zeroclaw-labs/zeroclaw/issues/10115 / https://github.com/zeroclaw-labs/zeroclaw/issues/10116
- **Exact proxy selectors reject supported transcription services (#10106)** — 精确匹配的代理选择器拒绝了 `transcription.*` 服务键。https://github.com/zeroclaw-labs/zeroclaw/issues/10106
- **ZeroCode ignores paste while an agent turn is running (#10089)** — 代理轮次运行期间终端粘贴被忽略，协作场景受阻。https://github.com/zeroclaw-labs/zeroclaw/issues/10089
- **install.sh selects generic Linux binary on Android/Termux (#7911)** — 预编译二进制与本地编译均错误选用未知的 linux aarch64 版本。https://github.com/zeroclaw-labs/zeroclaw/issues/7911

**已有修复 PR 的 Bug 速查：**

| Bug | Issue | Fix PR | 状态 |
|---|---|---|---|
| ACP 失败轮次丢失 | #9333 | #9378 | 需作者行动 |
| Bluesky/Reddit 未校验发件人 | #9428 内嵌 | #9428 | 需作者行动 |
| LINE 群组消息未授权 | #9427 | #9427 | 依赖 #9428 |
| Shell 子进程逃逸隔离 | #9827 内嵌 | #9827 | 需作者行动 |
| 工具 allowlist 未强制执行 | #9433 内嵌 | #9433 | 需作者行动 |
| Reliable 遥测归属错误 | #9470 | #9424/#9447 已合入，本 Issue 已关闭 | ✅ |

## 6. 功能请求与路线图信号

**维护者评审中的 RFC（可能进入 v0.9.0）：**

- **RFC: Prefer a lighter ZeroClaw core through external integrations (#6165)** — 将长尾集成从核心移除，改为外部集成。风险高，讨论时间长（17 条评论），方向获社区认可但落地路径待定。https://github.com/zeroclaw-labs/zeroclaw/issues/6165
- **RFC: Define the SOP capability permission contract (#9598)** — SOP 权限契约目标 v0.9.0，Rev 3 已分离出临时执行路径与完整共享权限路径。https://github.com/zeroclaw-labs/zeroclaw/issues/9598
- **RFC: Goal mode v2 (#9702)** — 持久化续跑 + 可信 Web 控制面，v1 限制为 Matrix 命令 + 重启暂停，v2 需要安全浏览器控制界面。https://github.com/zeroclaw-labs/zeroclaw/issues/9702
- **RFC: Calibrate PR risk and security approval requirements (#9990)** — 校准 PR 风险评估标准，基于 #9530 的先例扩展。https://github.com/zeroclaw-labs/zeroclaw/issues/9990

**已接受 / in-progress 功能方向：**

- **[Feature]: Isolate interactive Blacksmith debugging from attesting CI (#10041，已接受)** — 增加非见证的 Blacksmith 调试通道，不允许交互式 SSH 进入合并/发布/制品路径。风险高，影响 CI 架构。https://github.com/zeroclaw-labs/zeroclaw/issues/10041
- **[Tracker]: crates.io publishing, packaging, and cargo-install follow-ups (#9381，已接受)** — crates.io 发布跟进，首个待办为 Windows 仓库 symlink 问题。https://github.com/zeroclaw-labs/zeroclaw/issues/9381
- **[Task]: Make provider-call accounting lifecycle-complete (#10143，in-progress)** — 完善 provider 调用记账，每个物理 provider 叶子精确一次、按物理启动顺序。https://github.com/zeroclaw-labs/zeroclaw/issues/10143

**版本路线图信号：** v0.8.5 稳定线（#9459）至 8 月 30 日，Intake 已于 8 月 4 日冻结，周切版持续发布可用成果。SOP 权限契约、Goal mode v2 目标版本指向 v0.9.0。按当前节奏，上述 RFC 的决策可能在未来 2-4 周内落定。

## 7. 用户反馈摘要

- **Android/Termux 安装困扰（#7911）** — 用户尝试在 Termux 安装，预编译二进制和本地编译都拉取到错误的 linux aarch64 通用二进制。反馈被标注 `help wanted`，且今日有配套文档 PR #10160 澄清 Android 二进制可能缺席的情况。https://github.com/zeroclaw-labs/zeroclaw/issues/7911
- **Windows 桌面端启动失败（#9290 与 #10111 双反馈）** — 两个独立用户报告同一问题：安装后 `zeroclaw-desktop.exe` 报 `TaskDialogIndirect` 入口点找不到。安装包为 v0.8.3 官方 release，说明发布流程缺少 Windows 原生运行验证。https://github.com/zeroclaw-labs/zeroclaw/issues/9290 | https://github.com/zeroclaw-labs/zeroclaw/issues/10111
- **Fresh config 即损坏（#9436）** — 用户反馈 `config init` 生成的模板配置无法通过严格加载器，新用户首次配置即遇挫。Issue 确认在 master 上仍可复现。https://github.com/zeroclaw-labs/zeroclaw/issues/9436
- **ZeroCode 粘贴体验（#10089）** — 代理轮次进行中无法使用终端括号粘贴，协作输入被吞。反馈明确描述"Chat composer 空闲时粘贴正常、轮次开始后失效"。https://github.com/zeroclaw-labs/zeroclaw/issues/10089

## 8. 待处理积压

**长期未决、需维护者关注的重要 Issue：**

- **RFC: Prefer a lighter ZeroClaw core through external integrations (#6165)** — 4 月 27 日创建，已活跃近 4 个月，17 条评论，标记 `needs-maintainer-review` + `risk:high`。长期未获维护者正式回应。https://github.com/zeroclaw-labs/zeroclaw/issues/6165
- **[Tracker]: Maintainer decision queue (#8692)** — 7 月 4 日创建，13 条评论，持续累积待决策项。该 tracker 的存在本身说明决策积压问题。https://github.com/zeroclaw-labs/zeroclaw/issues/8692

**长期未合并的 PR（需关注或关闭决策）：**

- **refactor(observability)!: retire dormant DORA telemetry (#9451)** — 7 月 27 日创建，`do-not-merge` + `needs-maintainer-review`，break change 需维护者拍板。https://github.com/zeroclaw-labs/zeroclaw/pull/9451
- **fix(anthropic): support stored OAuth profiles (#9420)** — 7 月 26 日创建，`do-not-merge` + `needs-maintainer-review`，size:XL 跨 22 个组件。https://github.com/zeroclaw-labs/zeroclaw/pull/9420
- **fix(providers): rotate live credentials after rate limits (#9419)** — 7 月 26 日创建，`do-not-merge` + `needs-maintainer-review`，涉及可靠 provider 凭据轮换。https://github.com/zeroclaw-labs/zeroclaw/pull/9419
- **feat(plugins): validate typed instance config (#9126)** — 7 月 18 日创建，size:XL，跨 14 个组件，无 `needs-maintainer-review` 但已积压一个月以上。https://github.com/zeroclaw-labs/zeroclaw/pull/9126

**今日新增、已标记为 blocked 的 Issue：**

- **headless SOP step turns never persisted (#9929)** — `status:blocked` + `status:accepted`，P1 风险高但被阻塞，需维护者解除阻塞条件。https://github.com/zeroclaw-labs/zeroclaw/issues/9929

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 2026-08-20

统计区间：2026-08-19 ~ 2026-08-20

## 今日速览

- 过去 24 小时无新版本发布；Issue 侧仅收尾 1 条存量 bug（#1305），无新开/活跃 issue。
- PR 侧共有 5 条更新：2 条关闭、3 条待合并（其中 2 条已被标记为 stale），整体以存量审查和收尾为主。
- 社区讨论热度集中在 #1305（4 条评论），该 issue 最终关闭，说明维护者正在清理旧问题。
- Telegram 相关改动是本轮重点：#3341 快速关闭、#3315 仍待合并，平台交互体验与适配性持续被关注。
- 总体活跃度中等偏低，新功能输入有限，但存在一个待合并的配置正确性修复（#3329）值得继续推进。

## 项目进展

### 已关闭/合并 PR（2 条）

- [PR #3341 feat(telegram): add interactive command UX and formatted ephemeral fallback](https://github.com/sipeed/picoclaw/pull/3341)  
  该 PR 在 8/19 创建并同日关闭。核心改进包括：降低 `/memory` 等命令的子命令语法认知负担、精简 `/help` 每行输出、在结构化内容不可用时提供格式化的临时回退。如已合并，Telegram 机器人的命令体验将获得直接提升。

- [PR #3200 feat(models): add configurable default fallback chain](https://github.com/sipeed/picoclaw/pull/3200)  
  该 PR 为 Web UI 增加了默认模型回退链配置能力，支持用户设置默认模型、添加回退模型、排序并保存整条链路。但本次被标记为 stale 后关闭，功能可能未合入主线，其需求信号（模型容错与降级）仍值得保留至路线图。

### 待合并 PR（3 条）

- [PR #3329 fix(line): warn on inert webhook_host / webhook_port](https://github.com/sipeed/picoclaw/pull/3329)  
  修复 LINE 渠道中 `webhook_host` / `webhook_port` 配置项虽然存在但从未被读取的问题，改为向用户发出警告而非静默播种默认值。这是针对配置陷阱的实际修复，等待维护者 review。

- [PR #3316 fix: routed-agent context management](https://github.com/sipeed/picoclaw/pull/3316)  
  修复路由 agent 在特定 Discord 频道中不记忆历史、不触发自动压缩等问题，涉及历史、摘要、压缩与 seahorse bootstrap。当前已 stale。

- [PR #3315 Support topics in private bot chats](https://github.com/sipeed/picoclaw/pull/3315)  
  修复 Telegram 私聊 bot 中 `Chat.IsForum` 判断不适用的问题，补全对 private chat topic 消息的支持。当前已 stale。

整体而言，项目处于小步推进状态：Telegram 命令交互优化这一轮有实质进展，而模型回退链和 agent 上下文管理两个较重要功能则暂时受阻。

## 社区热点

- [Issue #1305 [BUG] new banner print to STDOUT, break completion flow](https://github.com/sipeed/picoclaw/issues/1305)  
  该 issue 是过去 24 小时内评论数最高的条目（4 条讨论），现已被关闭。用户指出新版 banner 打印到 STDOUT，导致 `picoclaw completion zsh > _picoclaw` 生成的补全脚本混入非补全内容。背后诉求非常明确：CLI 工具必须保持 STDOUT 纯净，以便脚本化重定向、管道和命令替换场景安全使用；诊断/欢迎信息应输出到 STDERR。

- [PR #3341](https://github.com/sipeed/picoclaw/pull/3341) 当天创建当天关闭，说明 Telegram 交互体验改动有较快推进，但 PR 评论区未记录具体互动数据。

## Bug 与稳定性

### 已关闭 Bug

- [Issue #1305](https://github.com/sipeed/picoclaw/issues/1305)（严重程度：中）  
  影响 shell completion 生成流程，用户执行 `picoclaw completion zsh > _picoclaw` 后文件开头出现 banner，导致补全脚本不可用。该问题由 PR #1008 引入的新 banner 导致，属于版本升级后出现的 stdout 污染回归。Issue 已关闭，但今日数据中未看到关联 fix PR。

### 待处理稳定性隐患

- [PR #3329](https://github.com/sipeed/picoclaw/pull/3329)（严重程度：低-中）  
  LINE 渠道的 `webhook_host` / `webhook_port` 配置项声明了、设了默认值、绑定了环境变量，但实际没有任何代码读取。这会使用户误以为配置已生效。该 PR 将其改为显式警告，属于配置正确性修复，建议优先合入。

## 功能请求与路线图信号

- 今日无新建功能请求类 Issue。
- 从 PR 看，Telegram 平台完善是明确方向：
  - [PR #3341](https://github.com/sipeed/picoclaw/pull/3341)：交互式命令 UX，降低权限指令的认知负担。
  - [PR #3315](https://github.com/sipeed/picoclaw/pull/3315)：Telegram 私聊 bot 的 topic 支持，补齐 forum topic 之外的消息场景。
- [PR #3200](https://github.com/sipeed/picoclaw/pull/3200) 提出的默认模型回退链虽未合入，但反映了用户对模型可用性和降级容错的需求，很可能在后续版本中以其他形式回归。
- [PR #3316](https://github.com/sipeed/picoclaw/pull/3316) 若被推进，将改善路由 agent 的会话记忆、自动压缩和上下文连续性，是 agent 体验稳定性的关键能力。

## 用户反馈摘要

- [Issue #1305](https://github.com/sipeed/picoclaw/issues/1305) 反馈了一个典型 CLI 使用场景：用户需要自动生成 zsh 补全文件，但新 banner 输出到 STDOUT 破坏了结果。用户明确关联到引入该问题的 PR #1008，并给出了可复现步骤，说明其具备清晰的 bug 定位能力。
- 该反馈揭示的深层问题是：项目在引入视觉 banner 时未遵循 CLI 输出通道约定（诊断信息应走 STDERR），导致升级后出现回归。这类问题容易影响脚本化使用者，建议维护者建立明确的 stdout/stderr 使用规范，并增加对 `completion` 等命令的输出回归测试。
- 评论正文未在本数据中展示，因此无法提炼更多用户的满意度或额外痛点。

## 待处理积压

- [PR #3316](https://github.com/sipeed/picoclaw/pull/3316)（stale）  
  8/03 创建，已长期无实质推进。涉及 routed-agent 上下文管理，是整个 agent 记忆与自动压缩链路的关键修复，建议维护者尽快给出明确处理意见。

- [PR #3315](https://github.com/sipeed/picoclaw/pull/3315)（stale）  
  8/03 创建，Telegram 私聊 topics 支持。与刚合并的 #3341 在 Telegram 体验上互补，建议纳入下一步迭代。

- [PR #3329](https://github.com/sipeed/picoclaw/pull/3329)（open）  
  8/11 创建，尚未合并。该 PR 修复配置项静默失效问题，属于低风险、高收益的稳定性改进。

- 另外，Issue #1305 于 2026-03-10 创建，到 2026-08-19 才关闭，耗时约 5 个月，暴露了 issue 积压处理周期较长的问题。虽然最终已收尾，但值得维护者反思旧 issue 的清理节奏。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报（2026-08-20）

## 今日速览

过去 24 小时项目保持高活跃度：33 条 PR 更新，23 条合并/关闭，新增 3 个 issue，无新版本发布。核心维护者集中在 Slack 体验拆分（`--slack-agents`）、Slack/provisioning 可靠性修复以及 Telegram 群组连接器上；社区侧则集中报告 Node 26 兼容性和 headless 安装问题。整体看，项目正处于渠道扩展与安装/配置健壮性并行的阶段，但新 issue 均指向 setup 与 Dial 状态上报，是当前明显的薄弱点。

## 项目进展

### 已合并/关闭的重要 PR

- **Slack agents 功能正式拆分**  
  [#3357 [CLOSED] setup: --slack-agents installs the whole Slack agents feature](https://github.com/nanocoai/nanoclaw/pull/3357) 与 [#3358 [CLOSED] slack: split the payload — base adapter in /add-slack, agents feature in /slack-agent-flow](https://github.com/nanocoai/nanoclaw/pull/3358) 合并后，默认 Slack 安装变为「基础体验」（单 bot、DM/频道聊天），完整 agents 功能通过 `--slack-agents` 按需安装。这是一个有意的产品边界调整，让主流程更轻量。

- **Slack 与 provisioning 可靠性批量修复**  
  多个 core-team PR 在同一天关闭，集中修整 Slack 安装和审批链路：  
  - [#3340 fix(approvals): record the delivering instance on pending_approvals](https://github.com/nanocoai/nanoclaw/pull/3340)  
  - [#3341 fix(provisioning): derive the Slack service from the credential's issuer](https://github.com/nanocoai/nanoclaw/pull/3341)  
  - [#3342 feat(slack): decline owner-absent channel invites instead of carding them](https://github.com/nanocoai/nanoclaw/pull/3342)  
  - [#3345 feat(setup): forward optional client metadata on Slack service requests](https://github.com/nanocoai/nanoclaw/pull/3345)  
  - [#3344 feat(provisioning): optional request-origin metadata on app creation](https://github.com/nanocoai/nanoclaw/pull/3344)  
  - [#3339 fix(setup): fail closed when a stored sign-in cannot be verified](https://github.com/nanocoai/nanoclaw/pull/3339)  

  这些改动提升了 Slack 安装的身份配对正确性、凭证失败处理的安全性，以及审批记录的可追溯性。

- **Telegram 群组连接器**  
  [#3351 [CLOSED] feat(telegram): add approved group connection picker](https://github.com/nanocoai/nanoclaw/pull/3351) 为 Telegram 增加 `/connect_group` 管理命令，接入原生群组选择器，并复用现有 unknown-channel 审批链路。

- **容器输出 token 上限调整**  
  [#3025 [CLOSED] fix(container): raise the agent SDK's 32000 output-token cap](https://github.com/nanocoai/nanoclaw/pull/3025) 关闭，容器内 agent SDK 的输出 token 限制得到放宽。

综合来看，今天项目在 Slack 渠道架构上做了一次明显的功能收敛，同时修正了多条 Slack/provisioning 路径上的安全与配置正确性问题，整体工程稳定性有实质提升。

## 社区热点

今日 3 个新 issue 均来自同一提交者 `glifocat`，形成关于「新机安装体验」的明确反馈集群：

- [#3359 Node 26 passes check_node but better-sqlite3 11.10.0 cannot build against it](https://github.com/nanocoai/nanoclaw/issues/3359) — 使用 Homebrew Node 26.7.0 的全新 macOS arm64 机器在引导阶段即失败。
- [#3354 Setup leaves 0-byte channel files on a failed git-show copy, and an onecli check runs before its own PATH fix](https://github.com/nanocoai/nanoclaw/issues/3354) — headless/非登录 SSH 场景下安装流程出现残留文件与检查顺序问题。
- [#3353 Dial: outbound SMS rejected by the carrier after send is still recorded as delivered](https://github.com/nanocoai/nanoclaw/issues/3353) — Dial 短信送达状态误报，影响重试与用户通知。

这些 issue 当前评论数为 0，但分别关联着 [#3360](https://github.com/nanocoai/nanoclaw/pull/3360)、[#3249](https://github.com/nanocoai/nanoclaw/pull/3249) 和 [#3041](https://github.com/nanocoai/nanoclaw/pull/3041)/[#3050](https://github.com/nanocoai/nanoclaw/pull/3050)，表明维护者已经或正在响应。PR 侧，core-team 的 Slack 系列（#3357、#3358、#3340–#3345）占据主导，反映当前维护重点在 Slack 渠道架构与 provisioning 正确性。

## Bug 与稳定性

按严重程度排列：

- **严重：Node 26 下 better-sqlite3 构建失败，阻塞全新安装**  
  [#3359](https://github.com/nanocoai/nanoclaw/issues/3359)。`check_node` 只有下限检查，导致 Node 26.7.0 通过检查后，better-sqlite3 11.10.0 编译失败并中止引导。  
  **已有修复 PR**：[#3360](https://github.com/nanocoai/nanoclaw/pull/3360) 将 better-sqlite3 升级至 13.0.3，并将 Node 最低要求提升到 22；相关 PR [#3249](https://github.com/nanocoai/nanoclaw/pull/3249) 处理已存在的超范围 Node。

- **中等：headless/非登录安装残留 0 字节文件，且 onecli 检查过早执行**  
  [#3354](https://github.com/nanocoai/nanoclaw/issues/3354)。`git show` 复制失败后留下空 channel 文件，onecli 检查又运行在自己的 PATH 修复之前。目前未见直接 fix PR。

- **中等：Dial 短信被运营商拒绝后仍标记 delivered**  
  [#3353](https://github.com/nanocoai/nanoclaw/issues/3353)。发送后无法重新评估状态，重试预算不被消耗，agent/owner 均不会收到通知。目前无直接修复 PR，需结合 Dial 适配器状态机处理。

## 功能请求与路线图信号

- **Node 运行时支持范围调整**  
  [#3360](https://github.com/nanocoai/nanoclaw/pull/3360) 与 [#3249](https://github.com/nanocoai/nanoclaw/pull/3249) 指向下一版本将把 Node 最低版本从 20 提升到 22，并通过 better-sqlite3 13 兼容当前 Node 26。这是一个带破坏性变更的系统要求更新。

- **Cursor/多 agent provider 生态扩展**  
  [#3356 feat(providers): add Cursor Agent SDK payload](https://github.com/nanocoai/nanoclaw/pull/3356)、[#3355 feat(setup): add /add-cursor agent provider skill](https://github.com/nanocoai/nanoclaw/pull/3355) 和 [#3349 feat: add agent mailbox seam and registry](https://github.com/nanocoai/nanoclaw/pull/3349) 均处于打开状态。三者组合显示项目正在向「多 agent provider + 统一 mailbox 注册」方向扩展。

- **Dial 渠道正式接纳**  
  [#3041 Dial channel adapter (SMS + AI voice)](https://github.com/nanocoai/nanoclaw/pull/3041) 与 [#3050 Dial channel picker/wizard](https://github.com/nanocoai/nanoclaw/pull/3050) 仍在待合并，但 [#3353](https://github.com/nanocoai/nanoclaw/issues/3353) 已经暴露其送达状态机缺陷，预计正式合并前需要配套修复。

- **Slack agents 默认关闭**  
  从 #3357/#3358 的合并看，完整 Slack agents 能力将作为 opt-in 功能，避免默认安装过重。这也是未来其他复杂渠道功能的参考模式。

## 用户反馈摘要

今日 3 个 issue 均无评论，以下反馈来自 issue 正文，但仍准确反映真实用户环境：

- **用户希望开箱即用地跟随上游 Node 版本**：macOS arm64 + Homebrew 默认 Node 26.7.0 是全新机器的常见配置，但安装会因 better-sqlite3 编译失败而中断。提交者认为 `check_node` 的检查范围应该与实际依赖构建能力一致。
- **非交互式部署场景被忽略**：#3354 来自干净的 headless SSH 安装，说明 setup 假设用户有交互式登录 shell，导致 PATH 修复和 onecli 检查的顺序错误，且失败后留下 0 字节文件。
- **Dial 发送状态需要可追溯**：提交者指出「运营商接受发送」和「运营商拒绝发送」是两个不同事实，NanoClaw 当前把前者当作最终结果，导致 agent 与 owner 对消息状态形成错误认知。

## 待处理积压

- **[#3149 fix(cli): add --rw flag to groups config add-mount](https://github.com/nanocoai/nanoclaw/pull/3149)** — 创建于 7 月 29 日，已超过 3 周仍未合并，虽然是小改动，但今天仍有更新，说明尚未被放弃。需维护者确认是否进入下一版本。
- **[#3041 feat(channels): add Dial channel adapter](https://github.com/nanocoai/nanoclaw/pull/3041) 与 [#3050 feat(setup): add Dial to the channel picker](https://github.com/nanocoai/nanoclaw/pull/3050)** — 自 7 月 14 日打开，已逾 5 周。考虑到 #3353 报告了 Dial 的实际行为缺陷，需要尽快决定合并方向并补齐状态机问题。
- **[#3249 fix(setup): handle an existing Node outside the supported range](https://github.com/nanocoai/nanoclaw/pull/3249)** — 打开于 8 月 14 日，与 #3359/#3360 的目标有重叠，建议与 #3360 协调后决定合并顺序或统一成一个修复方案。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw 项目动态日报 - 2026-08-20

## 1. 今日速览

过去 24 小时内，NullClaw 项目整体活跃度较低：无新 Issue 或新版本发布，仅有 1 个 PR 处于待合并状态。该 PR 针对 README 中星标历史图表失效的问题提出了修复方案，说明项目维护仍在持续跟进文档与展示层面的缺陷。总体来看，社区讨论与参与度较低，项目处于平稳维护阶段。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

- **[#989 [OPEN] fix: restore broken star history chart](https://github.com/nullclaw/nullclaw/pull/989)**  
  该 PR 旨在修复 README 中星标历史图表无法正常显示的问题。原图表依赖 GitHub stargazer API，但该接口存在访问限制，导致图表损坏。PR 将图表数据源切换为 `star-history.dera.page`，该服务无需 token 且相对稳定，可确保图表重新正确渲染。目前 PR 仍处于待合并状态，尚未合并。这一改动将改善项目文档的可读性和对外展示效果，但不涉及核心功能变更。

## 4. 社区热点

今日无高讨论度或高反馈量的 Issue/PR。唯一新增 PR [#989](https://github.com/nullclaw/nullclaw/pull/989) 未显示评论或点赞，社区关注度较低，暂无集中诉求。

## 5. Bug 与稳定性

- **低严重度 Bug：README 星标历史图表损坏**  
  描述：README 中的星标历史图表因依赖 GitHub stargazer API 的访问限制而无法正常渲染，影响项目展示效果。  
  状态：已有修复 PR [#989](https://github.com/nullclaw/nullclaw/pull/989) 提出，但尚未合并。  
  影响：仅影响 README 的视觉展示，不影响项目运行或核心功能。

## 6. 功能请求与路线图信号

今日无新功能请求产生。PR [#989](https://github.com/nullclaw/nullclaw/pull/989) 属于文档/展示层面的修复，未反映路线图变化。暂无迹象表明下一版本将包含新功能。

## 7. 用户反馈摘要

今日无 Issue 或 PR 评论可供分析，无法提炼具体用户痛点、使用场景或满意度信息。

## 8. 待处理积压

当前无长期未响应的重要 Issue 或 PR。唯一的待合并项为 [#989](https://github.com/nullclaw/nullclaw/pull/989)，属于新提交的修复，尚未超时等待。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-08-20

## 今日速览

IronClaw 于昨日正式发布 **v1.3.0 稳定版**，冻结并晋升了 RC2 候选版本。在核心功能推进方面，子代理激活溯源（slice 1）、OOBE 自动化任务原型、以及扩展 Provider 错误规范化三个 XL 级 PR 均已完成合并。同时，通知中心系列 PR（收件箱、运行状态、门禁事件）与持久化沙箱工作已形成活跃的 PR 队列，其中 4 个 PR 处于待合并状态，显示 v1.4.0 周期主要功能正在密集落地。CI 稳定性修复也已合入，将消除合并队列中无界 `apt-get` 造成的超时。

## 版本发布

### [ironclaw-v1.3.0](https://github.com/nearai/ironclaw/releases) — 2026-08-19

**内容**：由 `1.3.0-rc.2` 晋升为稳定版，包含 RC2 中验证的升级与容器修复，以及 RC1 的全部范围。关键修复：

- **从 1.2 升级**：现在可正确接受并保留已发布扩展的 `activation_state` 字段，不再因该字段在升级过程中触发崩溃循环（crash-loop）。

**破坏性变更**：无（发布 PR [#7754](https://github.com/nearai/ironclaw/pull/7754) 明确标注为三层版本变更，无生产行为变化）。

**迁移注意事项**：1.2.x 用户可将此版本作为直接升级目标，建议升级前阅读 [PR #7456](https://github.com/nearai/ironclaw/pull/7456)（持久化存储 profile 重构，仍在讨论中），以便规划后续存储布局变更。

## 项目进展

今日合并/关闭了 18 个 PR，值得关注的关键合入：

**核心架构与功能**

- [PR #7752](https://github.com/nearai/ironclaw/pull/7752)（XL 级，已合并）：子代理激活溯源（ActivationProvenance）基础层，增加 `activate()` 原语，为后台子代理奠定基础。无生产行为变更，新的 `builtin.spawn_subagent` 仍保持 deny 过滤。
- [PR #7692](https://github.com/nearai/ironclaw/pull/7692)（XL 级，已合并）：能力响应规范化计划第 2 步，统一 MCP/Provider 故障为有界、类型化的诊断信息，并保留认证上下文。
- [PR #7686](https://github.com/nearai/ironclaw/pull/7686)（XL 级，已合并）：能力结果处理集中化，将 fresh invocation、approval resume、auth resume 统一到单一 `capability_response_processor`。
- [PR #6994](https://github.com/nearai/ironclaw/pull/6994)（XL 级，已合并）：OOBE 自动化任务原型（轮播卡片、内联卡片、agent 模式选择器），默认通过 `oobe_suggestions` 部署开关关闭。
- [PR #7756](https://github.com/nearai/ironclaw/pull/7756)（L 级，已合并）：CI 修复——统计显示 08-18/08-19 期间 69 次取消的运行中（1,193 个作业），每次停滞均由无界 `apt-get` 引起；已为所有 CI 操作添加超时边界。

**等待合并中（关键积压）**

- 通知中心系列：[#7697](https://github.com/nearai/ironclaw/pull/7697)（已合并）、[#7698](https://github.com/nearai/ironclaw/pull/7698)、[#7699](https://github.com/nearai/ironclaw/pull/7699)、[#7700](https://github.com/nearai/ironclaw/pull/7700)——从前端 UI 到后端持久层已完成，等待合并。
- [PR #7751](https://github.com/nearai/ironclaw/pull/7751)（XL 级）：v1.4.0 epic #7732 的第 1 步，将每次命令创建容器改为每个 `(tenant, user)` 一个可复用容器（Docker Exec ~40ms）。
- [PR #7743](https://github.com/nearai/ironclaw/pull/7743)（L 级）：自动化创建预检（对应 Issue #7742）。
- [PR #7711](https://github.com/nearai/ironclaw/pull/7711)（XL 级）：WASM 类型化工具响应、访客迁移与派发错误清理（能力响应规范化收尾）。

## 社区热点

**最活跃讨论：**

- [Issue #7732 “Epic: Persistent per-user sandbox with iron-proxy”](https://github.com/nearai/ironclaw/issues/7732) — 7 条评论，v1.4.0 核心方向。当前实现为每条 shell 命令创建/销毁容器，目标转为持久化 per-user sandbox 通过 iron-proxy 访问。该 epic 已带动 PR #7751 落地。

- [Issue #5998 “Reborn has no transport for a local MCP server”](https://github.com/nearai/ironclaw/issues/5998) — 从 7 月 11 日维持至今，社区关注度高。核心矛盾：`stdio` 被拒绝、loopback HTTP 被 `deny_private_ip_ranges` 拦截，导致本机 MCP 服务完全不可用。已有贡献者提交 [PR #7757](https://github.com/nearai/ironclaw/pull/7757) 针对此问题。

- [Issue #7748 “IronClaw got confused and stopped working”](https://github.com/nearai/ironclaw/issues/7748) — 来自 Slack 的用户反馈搬运，缺少复现步骤，但代表了真实使用场景中的稳定性问题。

**值得注意的现象**：当前最热的讨论集中在**沙箱持久化**与**本地 MCP 支持**两个方向，均围绕开发者本地使用体验展开；同时通知中心系列 PR（#7697-#7700）在 24 小时窗口内形成模块化提交节奏，属于典型的「后端就绪 → 门禁 → 运行结果 → 前端泛化」流水线推进模式，预计未来 24-48 小时内全栈合入。

## Bug 与稳定性

按严重程度排列：

1. **[#7748] IronClaw got confused and stopped working**（用户报告，无严重级别标注）— 用户报告应用陷入困惑状态并停止工作。来源为 Slack 用户反馈，尚无明确复现路径。无对应修复 PR。链接：[Issue #7748](https://github.com/nearai/ironclaw/issues/7748)

2. **[#7745] Copilot MCP 扩展安装失败**（P2, bug_bash）— 三个子问题：目录中存在重复的 Copilot 条目；安装报 `auth_required`；token 类型不明确。暂无 fix PR。链接：[Issue #7745](https://github.com/nearai/ironclaw/issues/7745)

3. **[#7744] Cron 任务 UI 缺少编辑和测试按钮**（P3, bug_bash）— 用户只能查看 cron 任务状态（paused/active），无法编辑或手动触发。功能完整性问题，暂无 fix PR。链接：[Issue #7744](https://github.com/nearai/ironclaw/issues/7744)

4. **[#7756] CI 合并队列超时**（已修复）— 元问题：所有停滞均由无界 `apt-get` 导致。已由 [PR #7756](https://github.com/nearai/ironclaw/pull/7756) 合并修复，所有 CI 操作已加超时边界。

5. **[#7602] / [#7603] 写入池读压力与检查点批量处理**（已关闭）— 两个 Tier 2/3 性能优化完成：缓存租约围栏 token、按 N 次迭代批量写入 BeforeModel 检查点。已关闭。

6. **[#7753] 能力派发失败时终端 dispatch 记录丢失**（已修复，待合并）— [PR #7753](https://github.com/nearai/ironclaw/pull/7753) 保留了 worker 本地能力调用状态，确保失败时能落出持久化的 `Failed` 终态。

## 功能请求与路线图信号

**v1.4.0 路线图信号（高置信度）**

- **持久化 per-user 沙箱**（[#7732](https://github.com/nearai/ironclaw/issues/7732)，epic）— 已列出 v1.4.0 目标，并有实现 PR #7751（Step 1）在队列中。
- **Onboarding 渠道优先**（[#7044](https://github.com/nearai/ironclaw/issues/7044)，epic，已关闭）— 后端（#6993）与前端原型（#6994）均已合并，进入 v1.4.0 已确定。
- **通知中心**（[#7688](https://github.com/nearai/ironclaw/issues/7688)，已关闭）— 合约、存储、API 已定。

**正在讨论的新功能**

- **自动化创建预检**（[#7742](https://github.com/nearai/ironclaw/issues/7742)，suggested P1，v1.3.0 标记）— 作者提出结构化自动化创建需明确区分「编写未来运行」与「执行/证明未来运行」；建立诚实的执行合约（schedule/goal/success criteria）后再持久化。实现 PR [#7743](https://github.com/nearai/ironclaw/pull/7743) 已在队列。
- **本地/环回 MCP 支持**（[#5998](https://github.com/nearai/ironclaw/issues/5998)）— 官方尚未置评路线图归属，但外部贡献者 [PR #7757](https://github.com/nearai/ironclaw/pull/7757) 提供了只允许字面环回 IP 的窄方案，可能以最小变更进入下一版本。

**长期 epic 观察**

- **[#7038] Storybook + AI-first Design System**（epic）— 8 月 3 日创建，有完整提案包，但今日无动态更新，需观察后续排期。

## 用户反馈摘要

- **稳定性困惑**（[#7748](https://github.com/nearai/ironclaw/issues/7748)）— Slack 用户 bianca.guimaraes-chadwick 反馈「It just got confused and stopped working」。无更多细节，建议维护者跟进获取复现信息。

- **Slack 连接体验**（[#7681](https://github.com/nearai/ironclaw/issues/7681)，已关闭）— 未链接用户在共享频道 @-mention 机器人时，回复对所有人可见，且要求用户手动往返 Web 应用完成链接。已修复，改善隐私性。

- **本地开发工具链摩擦**（[#5998](https://github.com/nearai/ironclaw/issues/5998)）— 开发者明确表达了需要在本机运行 MCP server 与 IronClaw 对接的需求。当前 `stdio` 和 `http://127.0.0.1` 均不可用，意味着完全无法使用本地 MCP 生态。

- **QA 测试反馈**（[#7745](https://github.com/nearai/ironclaw/issues/7745)、[#7744](https://github.com/nearai/ironclaw/issues/7744)）— QA 侧发现扩展安装引导信息不一致（重复目录项、认证报错不明确）以及 cron UI 功能覆盖不足（缺编辑/测试入口）。

## 待处理积压

**长期未响应的活跃 Issue**

- [Issue #5998](https://github.com/nearai/ironclaw/issues/5998)（已开放 40 天）— 本地 MCP 服务器不可达，虽已有贡献者 PR #7757，但官方尚未明确路线图归属或给出设计评审意见。建议维护者尽快回应，避免外部贡献悬置。

**等待关注的 PR**

- [PR #7516](https://github.com/nearai/ironclaw/pull/7516)（XL 级，外部贡献者 neo-sky，8 月 12 日创建）— WebUI 操作员界面接入 IronHub agent link。8 天内无维护者明确反馈，存在外部贡献沉没风险。

- [PR #7456](https://github.com/nearai/ironclaw/pull/7456)（XL 级，8 月 10 日创建）— Reborn 持久化存储 profile 无关化重构。涉及存储布局变更，风险中等，需设计评审。

**遗留跟踪**

- v1.3.0 发布后，`release/2026-08-17` 分支生命周期结束，相关 backport 需求应已关闭；后续修复应直接面向主干的 v1.4.0 周期。
- 【提醒】当前 21 个 PR 待合并，其中 5 个为 XL 级。若合并过于集中可能引发回归面扩大，建议维护者量入为出，保持与 CI 吞吐匹配的合并节奏。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

## LobsterAI 项目日报 — 2026-08-20

### 1. 今日速览

项目今日保持中等活跃度：过去24小时内有**9条 PR 更新**（其中8条已合并/关闭），但**无新版本发布**；**2条 Issue 更新**均为历史遗留（均为4月创建，今日被stale标记刷新）。合并的 PR 集中在安装包构建、Agent 交互修复与 UI 功能增强，其中两条 Windows 安装器修复（#2511/#2512）为昨日新提交且已快速合并，说明维护者对构建稳定性问题响应较快。Issue 侧则处于轻度积压状态，暂无新增用户反馈。

---

### 3. 项目进展

今日合并/关闭的 8 条 PR 主要覆盖三个方向：

**Windows 安装器（今日新增并立即合并）**
- [#2511 fix(installer): support silent upload-first web builds](https://github.com/netease-youdao/LobsterAI/pull/2511) — 支持上传优先的两阶段 Web 安装流程，复用已上传的 NOS 文件，仅重建签名 stub，并加入 SHA-256 前后校验，防止 stub 构建失效。
- [#2512 fix(installer): hide banner for dictbind silent package](https://github.com/netease-youdao/LobsterAI/pull/2512) — 仅对 dictbind 双击静默安装产物隐藏 banner，保留其他静默安装路径的既有行为，并同步更新安装器设计文档。

**Agent 交互修复**
- [#1560 fix: 修复Agent编辑后点击原Agent无法切换回聊天界面的问题](https://github.com/netease-youdao/LobsterAI/pull/1560) — 修复 `SidebarAgentList` 中 `agentId === currentAgentId` 时直接 return 导致无法切回聊天界面的回归，补齐 `onShowCowork()` 调用。
- [#1545 fix(agent): sync activeSkillIds immediately when updating current agent's skills](https://github.com/netease-youdao/LobsterAI/pull/1545) — 修复保存技能配置后徽章不即时刷新的问题，根因是 `updateAgent()` 未同步 `activeSkillIds`。

**功能增强**
- [#1553 feat(cowork): Write 工具文件卡片及分屏预览面板](https://github.com/netease-youdao/LobsterAI/pull/1553) — 为 Write 工具增加内联文件卡片（FileCard），新增可拖拽的右侧预览面板（FilePreviewPanel），支持 Markdown/HTML/SVG/图片/代码高亮，对应关闭 Issue #1552。
- [#1557 feat(settings): 设置面板侧栏支持搜索筛选分类](https://github.com/netease-youdao/LobsterAI/pull/1557) — 设置侧栏新增搜索框，支持中英关键词 AND 匹配过滤 Tab，无匹配时自动切换至首个可见分类。

**构建脚本修复**
- [#1555 fix: npm run dist:mac:x64打包失败](https://github.com/netease-youdao/LobsterAI/pull/1555) — macOS 不支持 `sha256sum`，在 `build-openclaw-runtime.sh` 中加入 `shasum` 兼容。

**仍待合并**（1条）：
- [#1547 fix(scheduledTask): 修复定时任务通知渠道选择后无法改回"不通知"的问题](https://github.com/netease-youdao/LobsterAI/pull/1547) — 已存在4个月，修复 `TaskForm.tsx` 中 `delivery.mode` 为 `'none'` 时回显错误的历史 bug（源自 commit `61cfe60`），改动量极小（+2行），但至今未合并。

---

### 4. 社区热点

今日两条 Issue 更新均带有 `[stale]` 标记，为 4 月创建的老 Issue，评论数不多，但反映了两个值得关注的方向：

- **[#1556 doc bug: IM机器人配置指南404](https://github.com/netease-youdao/LobsterAI/issues/1556)**（2条评论）— 用户报告文档链接（`lobsterai.youdao.com/LobsterAI-IM机器人配置指南.md`）返回 404，并附截图。文档链接失效是最直接的用户访问障碍，虽非功能 bug，但会中断新用户的上手流程。该 Issue 已挂4个月未关闭，需维护者核实文档部署路径。

- **[#1552 feat: AI产物 Markdown 预览及文件卡片支持](https://github.com/netease-youdao/LobsterAI/issues/1552)**（1条评论）— 用户详细描述了 Agent 写完文件后只能在聊天中靠 Read 粘贴全文或手动切换文件管理器查看的痛点，并给出了完整的产品需求（文件卡片展示文件名/路径/类型/大小 + 按钮）。该请求已被 PR #1553 实现并合并，属于"需求 → 实现"闭环的成功案例。

---

### 5. Bug 与稳定性

按严重程度排列：

| 严重度 | Issue/PR | 描述 | 状态 |
|--------|----------|------|------|
| 中 | [#1555 npm run dist:mac:x64打包失败](https://github.com/netease-youdao/LobsterAI/pull/1555) | macOS 打包因 `sha256sum` 不存在直接失败，阻断发版 | 已修复并合并 |
| 中 | [#1560 Agent编辑后无法切回聊天界面](https://github.com/netease-youdao/LobsterAI/pull/1560) | 编辑 Agent 后点击原 Agent 不切换，界面滞留 | 已修复并合并 |
| 低 | [#1545 技能徽章不即时更新](https://github.com/netease-youdao/LobsterAI/pull/1545) | 保存技能后需手动切换 Agent 才能看到新的 `activeSkillIds` | 已修复并合并 |
| 低 | [#1547 定时任务通知渠道无法改回"不通知"](https://github.com/netease-youdao/LobsterAI/pull/1547) | 表单初始化未优先检查 `delivery.mode=='none'`，导致下拉框回显旧值 | **待合并**（已挂4个月） |
| 低 | [#2511/#2512 安装器静默安装 banner 与上传流程问题](https://github.com/netease-youdao/LobsterAI/pull/2511) | Web 安装器上传流程、dictbind 静默包 banner 显示异常 | 已合并 |

---

### 6. 功能请求与路线图信号

- **AI 产物文件预览（#1552 → #1553）**：已在今日合并的 PR #1553 中落地，预计进入下一版本。该功能提升了 Write 工具在工作流中的使用体验，对写作、文档生成场景有直接价值。
- **设置面板搜索（#1557）**：已合并，解决设置 Tab 过多时的导航问题，属于低成本高感知的 UX 改进。
- **引擎启动超时取消（#1546）**：该 PR 今日被标记 stale 但已合并（为4月 PR），功能为启动超 30 秒后显示"取消启动"和"查看日志"按钮，为引擎卡死提供逃逸出口。该能力对调试和容错有实际意义，说明项目在完善任务执行的可中断性。

---

### 7. 用户反馈摘要

- **文档可访问性（#1556）**：用户因 IM 机器人配置指南 404 无法完成配置，截图显示页面直接报错。该反馈说明官方文档站点存在链接失效问题，建议维护者建立文档链接自动检查机制。
- **文件预览需求（#1552）**：用户描述的场景（"Agent 用 Read 读取后全文贴到聊天中占用大量对话空间"）反映了当前聊天界面在处理文件产出时的信息效率缺陷。用户建议的 `Write 工具后显示 FileCard` 方案已被采纳实现。
- **无负面情绪较强的反馈**：今日无新增 issue，历史 issue 也未出现激烈讨论。

---

### 8. 待处理积压

以下 Issue/PR 长期未得到响应，建议维护者关注：

- **[Issue #1556 — IM机器人配置指南404](https://github.com/netease-youdao/LobsterAI/issues/1556)** — 创建于 2026-04-08，持续4个月未关闭，属于文档类低优先级但影响新用户上手的直接问题。
- **[Issue #1552 — AI产物 Markdown 预览及文件卡片支持](https://github.com/netease-youdao/LobsterAI/issues/1552)** — 虽已被 PR #1553 实现，但 Issue 本身未自动关闭，需维护者手动关闭并关联 PR。
- **[PR #1547 — 定时任务通知渠道无法改回"不通知"](https://github.com/netease-youdao/LobsterAI/pull/1547)** — 修复代码仅 +2/-0 行，根因明确（commit `61cfe60` 引入的历史 bug），但长期搁置未合并。建议尽快评审合并，消除已知行为不一致。
- 另有一批 4 月创建的 PR（#1545、#1546、#1553、#1555、#1557、#1560）今日均被 marked stale，虽大多已实际合并，但 stale bot 扫描时机滞后，建议检查 stale 规则配置，避免对已合并 PR 继续打标。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 — 2026-08-20

## 1. 今日速览

- 过去 24 小时项目保持中等活跃度：1 个安全相关 Issue 被关闭，4 个 PR 全部完成合并/关闭，并发布 1 个新版本（20260818.10）。
- 今日核心是安全修复与 WhatsApp 通道体验优化：修复了 Vault 解锁/恢复接口未鉴权的 CWE-306 漏洞，并解决了 WhatsApp 中 push name 硬编码、回复消息被忽略、工具权限策略过于严格等问题。
- 所有 PR 均在 1-2 天内从创建到关闭，维护者响应速度良好；Issue #1177 从创建到修复关闭共 21 天，过程透明。
- 没有新的待合并 PR 或新开 Issue，积压压力较小，项目健康度良好。

## 2. 版本发布

**Release: 20260818.10**（发布于 2026-08-18，今日纳入统计）

- 当前未提供详细 changelog，从同日合并的 PR 推断，该版本至少包含今日合入的 4 个修复（见下）。
- **破坏性变更**：PR #1219 调整了非操作员对话中的工具策略层级，使“公开受众”工具重新可用，同时保留对 /sh 命令的严格限制。凡依赖此前“所有非操作员对话均禁用全部工具”行为的配置，需重新验证工具权限预期。
- **迁移注意事项**：WhatsApp 配置中 `push_name` 不再被强制覆盖为 “Moltis”，请检查依赖旧行为的自动化脚本或文档示例。

## 3. 项目进展

今日合入/关闭的 4 个 PR 均已完成，分别推进了以下方向：

- **安全加固（重点）**：PR #1216 修复 Vault 解锁/恢复接口缺少认证的漏洞（CWE-306），该漏洞允许任何未认证远程调用者暴力破解 Vault 凭据。修复后 `POST /api/auth/vault/unlock` 和 `/api/auth/vault/recovery` 必须携带有效 `AuthSession`，不再被 `/api/auth/` 前缀的公开白名单放行。  
  [PR #1216](https://github.com/moltis-org/moltis/pull/1216)

- **WhatsApp 消息准确性**：PR #1218 移除硬编码 push name “Moltis”，使 bot 在未保存联系人的会话中正确显示配置名称；PR #1217 修复在 `mention_mode = "mention"` 的群组中，用户回复 bot 消息时被视为未提及而被丢弃的问题，现在回复与 @提及一样被视为定向寻址。  
  [PR #1218](https://github.com/moltis-org/moltis/pull/1218) | [PR #1217](https://github.com/moltis-org/moltis/pull/1217)

- **工具权限策略修正**：PR #1219 修复 #1170 引入的回归——对非操作员对话强制 deny-all 工具策略时，连公开受众注册的工具也被一并移除，且策略层级 4/5 在公开分享场景中不可达。现在该上限变为可配置，避免过度收紧。  
  [PR #1219](https://github.com/moltis-org/moltis/pull/1219)

整体来看，项目在安全、通道兼容性、权限模型三个维度均有实质进步，且修复均针对真实使用反馈。

## 4. 社区热点

今日唯一的 Issue #1177 为安全漏洞报告，无评论和点赞，但直接催生了 PR #1216，属于典型的高影响低讨论型安全反馈。PR 侧无大量评论聚集，但 #1217 与 #1218 涉及 WhatsApp 群聊交互细节，反映出社区用户对消息路由和身份显示的高敏感度。

**热点 Issue**：  
[Issue #1177 — Vault Unlock/Recovery Endpoints Missing Authentication (CWE-306)](https://github.com/moltis-org/moltis/issues/1177)

**诉求分析**：用户发现 Vault 解锁/恢复端点未做鉴权，且被 `/api/auth/` 前缀白名单误伤。这是典型的“认证路由被公开前缀覆盖”安全设计缺陷，社区期待的是对所有敏感端点进行严格的权限收敛。该问题已在当日通过 PR #1216 修复。

## 5. Bug 与稳定性

按严重程度排列：

| 严重程度 | 问题 | 状态 | 修复 PR |
|---|---|---|---|
| 严重（CWE-306） | Vault 解锁/恢复接口可被未认证远程调用者暴力破解 | 已关闭 | [PR #1216](https://github.com/moltis-org/moltis/pull/1216) |
| 中等（功能回归） | #1170 引入的工具策略导致公开受众工具被禁用，策略层级 4/5 不可达 | 已关闭 | [PR #1219](https://github.com/moltis-org/moltis/pull/1219) |
| 中等（交互错误） | 群组中回复 bot 消息被丢弃（mention 模式） | 已关闭 | [PR #1217](https://github.com/moltis-org/moltis/pull/1217) |
| 低（展示/品牌） | WhatsApp push name 被硬编码为 “Moltis”，与 bot 实际配置名不符 | 已关闭 | [PR #1218](https://github.com/moltis-org/moltis/pull/1218) |

所有已知 Bug 均已在当日获得修复，无遗留未处理 Bug。

## 6. 功能请求与路线图信号

- 本次没有全新的功能请求 Issue。但 PR #1219 的可配置化方向暗示项目正在将“硬编码安全策略”逐步改为“可调策略”，未来可能开放更多策略层级供部署者自定义。
- PR #1217 的修复表明 WhatsApp 群聊中“提及”与“回复”双语义已被官方确认并统一处理，后续可能继续优化其他通道的定向消息语义。
- 从 Issue #1177 的修复方式看，团队可能会对 `/api/auth/` 前缀下的所有端点进行一次全面的鉴权审计，以减少同类白名单误用风险。

## 7. 用户反馈摘要

- 用户报告 Vault 解锁/恢复端点无鉴权，暗示自托管用户对远程攻击面非常关注，期望默认配置即安全。
- WhatsApp 场景中，用户侧反馈体现在两个 PR：#1217 表明真实用户会使用“回复”来与 bot 对话（而非必须 @），#1218 表明 bot 显示名错误会让联系人列表外的用户困惑，影响品牌可信度。
- 没有负面评论或抱怨维护速度的反馈，整体用户互动集中在功能性改进上。

## 8. 待处理积压

- 当前无长期未响应的 Issue 或 PR。过去 24 小时内 1 个 Issue 和 4 个 PR 全部关闭，且没有新开条目。
- 建议维护者关注 `is_public_path()` 对 `/api/auth/` 前缀的全局白名单逻辑，可考虑引入更细粒度的路由声明机制，避免未来新增 auth 子路由时再次出现同类漏洞。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报 — 2026-08-20

## 今日速览

过去 24 小时项目活跃度处于高位：共 19 条 Issue 更新（新开/活跃 3 条，关闭 16 条）、45 条 PR 更新（待合并 19 条，已合并/关闭 26 条），无新版本发布。当日合并的 PR 集中在稳定性修复上，其中远程媒体下载导致的会话卡死（#7110）和 envs.json 损坏导致的环境变量静默丢失（#7118）均已完成修复闭环；技能系统（Skill）的多项体验改进（CLI 搜索、名称去重、文件名保留）也一并落地。与此同时，新开放的 Issue 指向钉钉群聊上下文模式（#7158）与 embedding 健康检查超时硬编码（#7156）两个新方向。历史 Issue 清理力度较大（关闭 16 条），但其中包含多起 4 月遗留的长期需求，建议维护者对关闭原因做一次集中说明。

## 项目进展

今日合并/关闭的 PR 在三个维度上推进了项目：

**稳定性修复**
- [#7138 fix: recover from remote media download timeouts](https://github.com/agentscope-ai/QwenPaw/pull/7138)：修复模型提供商下载远程图片/视频超时后，会话因重复发送同一 URL 而持续卡死的问题。
- [#7146 fix(view_image): freeze remote images before persisting tool results](https://github.com/agentscope-ai/QwenPaw/pull/7146)：远程 `view_image` 在持久化前即被下载并转为不可变 Base64 块，附带大小、超时、重定向和 SSRF 防护，防止后续对话轮次被破坏。
- [#7135 fix(envs): preserve corrupt files and write envs atomically](https://github.com/agentscope-ai/QwenPaw/pull/7135)：损坏的 envs.json 不再被静默吞掉并覆写，改为保留现场 + 原子写入，对应 Issue #7118。
- [#7157 fix(e2e): dismiss Try Desktop Mode onboarding overlay before tests](https://github.com/agentscope-ai/QwenPaw/pull/7157)：消除自 #6645 引入的全屏透明引导层对 E2E 的指针事件拦截，终结 nightly E2E 连续 8 天失败（runs #71–#78）。

**技能系统与体验**
- [#7140 Refactor(cli): refactor skill cli, add search, add batch enable/disable](https://github.com/agentscope-ai/QwenPaw/pull/7140)：技能 CLI 重构，新增搜索/过滤和批量启用/禁用，落实 Issue #7090 的需求。
- [#7097 fix(skill): remove skill bound duplication](https://github.com/agentscope-ai/QwenPaw/pull/7097)：按 SKILL.md frontmatter 名称对工作区技能与内置绑定技能去重，修复 Issue #7073。
- [#6492 fix(files): preserve uploaded filenames in hints](https://github.com/agentscope-ai/QwenPaw/pull/6492)：用户消息提示中保留上传文件原始文件名，解决 #6453 的中文文件名被替换为 UUID 路径的问题。

**架构与工程能力**
- [#7114 refactor(config): make agent config loading async by default](https://github.com/agentscope-ai/QwenPaw/pull/7114)：agent 配置加载默认改为非阻塞异步 API。
- [#7037 feat(computer-use): observe related window surfaces](https://github.com/agentscope-ai/QwenPaw/pull/7037)：Computer Use 可额外观察至多 3 个关联窗口表面（原生菜单、下拉框、所属对话框），扩大视觉可达范围。
- [#7089 ci(datapaw): add a standalone version-driven release pipeline](https://github.com/agentscope-ai/QwenPaw/pull/7089)：datapaw 插件获得独立版本驱动发布流水线。
- [#7115 fix(memory): avoid noisy inbox notifications for unchanged jobs](https://github.com/agentscope-ai/QwenPaw/pull/7115)：Auto-Memory/Auto-Dream 执行无实际变更时保持静默，减少定时任务的无效通知。

## 社区热点

- [#2884 [Question] 安装当天个人目录内容几乎被清空，软件也被删除](https://github.com/agentscope-ai/QwenPaw/issues/2884) — 27 条评论，为当日讨论热度最高。用户于 2026-04-03 反馈 Ubuntu 22.04 上安装 coPaw 后数小时内个人目录与软件本体被清空，情绪激烈（“要疯了”），并猜测是软件缺陷或外部攻击。虽然状态为已关闭，但最近更新于 08-19，社区讨论仍在延续，是本月最需要官方给出明确结论的历史事件。
- [#6826 [Bug] 助手消息结束时间显示异常](https://github.com/agentscope-ai/QwenPaw/issues/6826) — 4 条评论。用户实测助手思考耗时 2 分钟，页面却显示仅几秒，影响对模型真实耗时的判断。
- [#6847 [Question] 同样的任务和模型，Qwenpaw 会被杀软打死，WorkBuddy 不会](https://github.com/agentscope-ai/QwenPaw/issues/6847) — 4 条评论。用户反馈杀毒软件频繁拦截并强制关停 Qwenpaw 进程，异构对比凸显其行为特征易被安全软件标记。
- [#7110 [Bug] 对话上下文中包含无法下载的图片链接，整个会话不可用](https://github.com/agentscope-ai/QwenPaw/issues/7110) — 3 条评论。模型幻觉或网络限制导致的无法访问 URL 会让会话彻底挂起，用户只能 `/clear`。已由 #7138 和 #7146 修复。
- [#7013 [Feature] 为 Chat 增加统一工具面板、Web 服务预览与交互式终端](https://github.com/agentscope-ai/QwenPaw/issues/7013) — 3 条评论。用户对 Agent 开发协作闭环有明确诉求，希望在一个工作台内完成产物预览、Diff 查看、Web 服务预览与命令交互。

## Bug 与稳定性

按严重程度排列：

| 严重度 | Issue | 状态 | 是否有 fix PR |
|---|---|---|---|
| 严重 | [#2884 用户个人目录被清空、软件被删](https://github.com/agentscope-ai/QwenPaw/issues/2884) | 已关闭，讨论仍在继续 | 无公开对应 PR，需官方明确结论 |
| 严重 | [#7118 envs.json 损坏被静默吞掉并覆写，所有环境变量丢失](https://github.com/agentscope-ai/QwenPaw/issues/7118) | 已关闭 | ✅ [#7135](https://github.com/agentscope-ai/QwenPaw/pull/7135) 已合并/关闭 |
| 高 | [#7110 不可下载的图片 URL 导致整个会话不可用](https://github.com/agentscope-ai/QwenPaw/issues/7110) | 已关闭 | ✅ [#7138](https://github.com/agentscope-ai/QwenPaw/pull/7138) + [#7146](https://github.com/agentscope-ai/QwenPaw/pull/7146) 已合并/关闭 |
| 中 | [#7156 embedding health check 在后端已预热时仍超时，且 timeout 硬编码无配置项](https://github.com/agentscope-ai/QwenPaw/issues/7156) | 开放（08-20 新开） | ❌ 无，等待维护者确认 |
| 中 | [#6624 Scroll 自动压缩不触发 summarize_when_compact 记忆流程，手动 /compact 可以](https://github.com/agentscope-ai/QwenPaw/issues/6624) | 已关闭 | 无，设计如此或待确认 |
| 低 | [#6826 消息结束时间显示异常](https://github.com/agentscope-ai/QwenPaw/issues/6826) | 已关闭 | 无公开对应 PR |

此外，PR 侧已提交 [#7150 fix: detect and recover from stalled LLM streams](https://github.com/agentscope-ai/QwenPaw/pull/7150)（待合并），用于修复上游 LLM 流中断但连接未关闭时 QwenPaw 永久停留在“Thinking”状态的问题（对应 Issue #7102）。

## 功能请求与路线图信号

- **[#7013 Chat 统一工具面板 / Web 服务预览 / 交互式终端](https://github.com/agentscope-ai/QwenPaw/issues/7013)**（开放，3 评论）：用户希望 Chat 页面有统一工作台承载会话产物、Diff、Web 服务预览和 Web Terminal。与待合并的 [#6880 统一 marketplace（apps/plugins/skills 合并至 /market）](https://github.com/agentscope-ai/QwenPaw/pull/6880) 方向一致，Console 前端整合将是下阶段重点。
- **[#7158 钉钉群聊上下文模式可配置](https://github.com/agentscope-ai/QwenPaw/issues/7158)**（08-20 新开）：要求默认按用户隔离，指定群可开启共享上下文。社区对 Channel 侧多租户/共享会话语义有细分需求。
- **[#7156 embedding health check 超时可配置](https://github.com/agentscope-ai/QwenPaw/issues/7156)**（08-20 新开）：超时 5 秒硬编码在预热后端上 elapsed 达 10.4 秒，导致向量召回降级为 BM25-only。属于配置化诉求，落地成本低。
- **[#7090 技能池搜索/过滤](https://github.com/agentscope-ai/QwenPaw/issues/7090)**：已由 [#7140](https://github.com/agentscope-ai/QwenPaw/pull/7140) 合并实现，该能力确认进入主分支。
- **[#3082 解决健忘症：将“查看 memory.md”写入常驻内存](https://github.com/agentscope-ai/QwenPaw/issues/3082)**（已关闭）：用户希望模型在不确定时主动查阅 memory.md，而非默认不加载该文档。结合今日合并的 [#7115 无变化任务保持静默通知](https://github.com/agentscope-ai/QwenPaw/pull/7115)，记忆系统正处于活跃迭代期。

## 用户反馈摘要

- **数据安全是最大的信任危机**：Issue #2884 的用户描述“早上才安装，中午回来个人目录内容几乎被清空”并表达强烈情绪，无论最终原因归属，此类事件对项目声誉影响极大，建议官方以公告或文档形式给出完整技术解释与排查步骤，消除社区疑虑。
- **杀软误报挫伤实际使用**：Issue #6847 的用户指出同等任务下“Qwenpaw 会被杀软打死，WorkBuddy 不会”，说明 Qwenpaw 的进程行为或文件特征容易触发安全软件告警，可能影响企业/准生产环境用户。
- **远程媒体路径脆弱**：Issue #7110 的用户遭遇模型幻觉生成的无法访问图片导致整个会话瘫痪，且只能 `/clear`，是典型的“一处坏链接毁掉整个对话”体验问题，现已有双重修复。
- **中文用户体验细节被看见**：Issue #6453 的用户反馈中文文件名在提示中被换成不可识别字符且路径冗长，随着 [#6492](https://github.com/agentscope-ai/QwenPaw/pull/6492) 合并，此问题得到解决。
- **记忆/长期上下文是高频诉求**：多个 Issue（#3082、#6624、#3018）从不同角度指向同一核心痛点——记忆与上下文的可靠性、可配置性、可解释性。社区用户普遍愿意维护 memory.md 等文档，但希望模型能主动查阅并有稳定触发机制。

## 待处理积压

**历史遗留 Issue（4 月创建，长期未获明确结论）：**

- [#2884 安装后个人目录被清空](https://github.com/agentscope-ai/QwenPaw/issues/2884)：27 条评论，8/19 仍有更新。建议维护者给出正式技术归因。
- [#3177 coPaw app 无法启动（Windows 批处理 BOM 错误）](https://github.com/agentscope-ai/QwenPaw/issues/3177)：显示 `锘緻echo off` 等 UTF-8 BOM 被误解析问题，4 月至今未关闭前应已处理，但未见对应 PR 记录。
- [#3082 解决健忘症（memory.md 主动查阅）](https://github.com/agentscope-ai/QwenPaw/issues/3082)：核心记忆机制诉求。
- [#3260 Harness Agents / ACP / 多 Provider 独立配置](https://github.com/agentscope-ai/QwenPaw/issues/3260)：获得 1 👍，涉及路线图级能力。
- [#3261 浏览器自动化能力差、无法复用登录状态](https://github.com/agentscope-ai/QwenPaw/issues/3261)：浏览器自动化是 Agent 落地高频场景，当前反馈偏负面。
- [#3018 用户配置存储路径支持自定义](https://github.com/agentscope-ai/QwenPaw/issues/3018)：涉及 skills、core files、智能体配置的自定义路径。

**待审查/待合并的开放 PR 提醒：**

- [#6764 feat(ci): gate main mergeability on tests](https://github.com/agentscope-ai/QwenPaw/pull/6764)：为 main 分支添加必需状态检查，防止测试全红时仍被合并（此前 #6418 已发生此类事故）。该 PR 已开放两周，建议优先推进审查，它是 CI 治理闭环的关键一环。
- [#5861 fix(desktop): resolve login-shell PATH for packaged macOS backend](https://github.com/agentscope-ai/QwenPaw/pull/5861)：修复 macOS 打包后端无法发现用户通过 shell 配置安装的工具，首个贡献者 PR，等待审查。
- [#7150 fix: detect and recover from stalled LLM streams](https://github.com/agentscope-ai/QwenPaw/pull/7150)：对应 #7102 的“Thinking 状态无限挂起”问题，属高影响稳定性修复，建议尽快合入。
- [#7112 feat(hub): add self-hosted multi-user Hub](https://github.com/agentscope-ai/QwenPaw/pull/7112)：体量较大的新功能，引入自托管多用户控制平面，建议尽早组织设计评审。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

# EasyClaw 项目动态日报 — 2026-08-20

## 1. 今日速览

- 过去 24 小时内，EasyClaw 仓库未产生新的 Issue 或 PR，社区讨论与协作活动处于静默状态，活跃度较低。
- 项目连续发布 3 个版本（v1.8.101 → v1.8.103），迭代节奏密集，核心功能持续优化。
- 更新重点集中在飞书（Feishu）集成稳定性、Gateway 会话与审批、达人协作（Affiliate）以及增量更新可靠性方面。
- 无新增 Bug 报告、无待合并 PR，项目当前进入发布后稳定期，整体健康度良好。
- 维护者保持高频发版习惯，但社区外部反馈输入不足，建议关注用户使用后的实际反馈。

## 2. 版本发布

### v1.8.103
- **发布时间**：2026-08-20（基于数据日期推断）
- **更新内容**：
  - 改善飞书最终回复（final replies）质量与逻辑
  - 优化 Gateway 会话恢复机制
  - 提升达人协作状态一致性
- **破坏性变更**：无明确说明
- **迁移注意事项**：macOS 用户若遇 “'RivonClaw' is damaged and can't be opened” 提示，需按安装说明处理 Gatekeeper 拦截
- **链接**：https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.103（推测标签，以仓库实际为准）

### v1.8.102
- **更新时间**：紧邻上一版本
- **更新内容**：
  - 提高增量更新可靠性
  - 改善飞书连接稳定性
  - 优化达人报价编辑体验
  - 改进 Gateway 执行审批流程
- **破坏性变更**：无明确说明
- **迁移注意事项**：同 v1.8.103 的 macOS Gatekeeper 处理方式
- **链接**：https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.102（推测标签，以仓库实际为准）

### v1.8.101
- **更新时间**：更早于 v1.8.102
- **更新内容**：
  - 优化达人 Campaign 条款支持
  - 改进按店铺的 Working Agenda 功能
  - 完善设备分配逻辑
  - 强化 WMS 校验规则
  - 修复 Gateway 模型服务商选择的持久化问题
- **破坏性变更**：无明确说明
- **迁移注意事项**：无额外说明
- **链接**：https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.101（推测标签，以仓库实际为准）

## 3. 项目进展

- 今日无 PR 被合并或关闭，无代码评审活动。
- 通过连续发布 v1.8.101～v1.8.103，项目在 24 小时内完成了多轮功能优化与稳定性修复，实际推进了以下模块：
  - **飞书集成**：回复质量、连接稳定性、会话恢复能力
  - **Gateway 服务**：会话恢复、执行审批、模型服务商配置持久化
  - **达人协作（Affiliate）**：报价编辑、条款、状态一致性
  - **系统可靠性**：增量更新、WMS 校验、设备分配
- 由于无 PR 数据，无法提供代码层面的具体提交信息，但版本发布本身即为项目向前迈进的有力信号。

## 4. 社区热点

- 今日无活跃 Issues 或 PRs，无高讨论量话题。
- 仓库当前处于发布驱动的迭代状态，社区讨论暂未形成热点。
- 建议关注后续用户对 v1.8.102/103 中飞书与 Gateway 改动的反馈，可能成为下轮讨论焦点。

## 5. Bug 与稳定性

- 今日无新报告的 Bug、崩溃或回归问题。
- 从版本更新说明来看，已知修复方向包括：
  - Gateway 会话恢复（v1.8.103）
  - 飞书连接稳定性（v1.8.102）
  - 增量更新可靠性（v1.8.102）
  - 模型服务商选择持久化（v1.8.101）
- 所有此类修复已随新版本发布，无需等待额外 fix PR。
- macOS 用户的 Gatekeeper 提示属于已知安装问题，新版本安装说明中已提供处理指引，非运行时缺陷。

## 6. 功能请求与路线图信号

- 今日无新增功能请求 Issue。
- 连续版本更新显示以下方向为项目当前重点（可能进入后续迭代）：
  - 飞书最终回复的智能化和上下文一致性
  - Gateway 会话恢复与审批流程的自动化
  - 达人协作中报价、条款、状态的统一管理
  - 多店铺 Working Agenda 与设备分配
  - WMS 校验的深化
- 这些方向可能对应项目路线图中的「企业集成稳定性」与「协作工作流」双主线。

## 7. 用户反馈摘要

- 今日无 Issues 评论，无法提炼新的用户痛点或使用场景。
- 可参考历史版本更新所隐含的用户诉求：
  - 使用飞书作为前端入口的用户对对话连续性、连接稳定性有较高要求
  - 达人运营用户需要更灵活的报价编辑与状态同步能力
  - 多门店/多设备场景下希望工作日程和设备分配更可控
- 建议维护者主动在 Release notes 下方或 Discord/微信群收集反馈，以补充此部分信息。

## 8. 待处理积压

- 当前无长期未响应的 Issue 或 PR。
- 仓库状态清爽，无积压风险。
- 提醒：由于今日 Issue/PR 数据为零，建议维护者检查是否通知渠道（如邮件、Slack 集成）存在遗漏，确保没有遗漏社区输入。

---
*数据来源：https://github.com/gaoyangz77/easyclaw （统计时间截至 2026-08-20）*

</details>

---
*本日报由 [agents-radar](https://github.com/huang-yi-dae/agents-radar) 自动生成。*