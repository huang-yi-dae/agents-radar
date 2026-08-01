# OpenClaw 生态日报 2026-08-01

> Issues: 500 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-08-01 03:22 UTC

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

# OpenClaw 项目动态日报 — 2026-08-01

## 今日速览

过去24小时OpenClaw项目保持极高活跃度：累计500条Issue更新（新开/活跃461条，关闭39条）和500条PR更新（待合并377条，已合并/关闭123条），但无新版本发布。值得关注的是，今日新提交的PR中修复类占比极高，集中在**实时语音会话状态保持、Codex/Google/xAI等扩展的权威输出保留、Matrix/Telegram消息投递可靠性、以及进程/队列生命周期管理**等方向。项目当前面临的核心挑战是大量P0/P1级稳定性Bug积压（内存泄漏、消息丢失、会话状态不一致），社区关注焦点已从功能扩展转向**可靠性与可恢复性**。

---

## 项目进展

今日共有 **4 个 PR 被关闭/合并**（数据中的 CLOSED 状态），且全部为修复类，说明项目组正在集中清理稳定性和兼容性问题：

### 已合并/关闭 PR

| PR | 标题 | 解决的问题 | 影响 |
|---|---|---|---|
| [#117171](https://github.com/openclaw/openclaw/pull/117171) | fix(ollama): honor canonical model requests and pull completion | 修复 Ollama 使用已废弃的 `name` 字段导致模型发现/拉取失败的问题，改用规范的 `model` 字段 | 恢复 Ollama 作为主模型的正常发现、能力探测与配对节点模型选择 |
| [#117168](https://github.com/openclaw/openclaw/pull/117168) | fix(agents): prevent fallback after stale lifecycle abort | 修复因陈旧 Gateway 生命周期中止导致用户选定的主模型（如 Ollama）被静默路由到 fallback 的问题 | 保证用户显式选择的主模型被正确使用，关闭 Issue #116418 |
| [#110020](https://github.com/openclaw/openclaw/pull/110020) | fix(coding-agent): scope CODEX_HOME to prevent OAuth collision with OpenClaw | 隔离 Codex CLI 与 OpenClaw 共用的 `~/.codex` OAuth 状态，修复 `refresh_token_reused` 认证冲突 | 关闭 Issue #109704，防止同一 ChatGPT 账号双客户端认证互相踢下线 |
| [#109782](https://github.com/openclaw/openclaw/pull/109782) | fix(coding-agent): isolate Codex CLI CODEX_HOME from OpenClaw OAuth in skill launch forms | 同上问题在 skill 启动表单场景的补充修复 | 双保险修复 #109704 |

> 说明：今日 PR 数据中评论数显示为 undefined，无法按评论数排序，以上基于状态筛选。

### 值得关注的新提交 PR（未合并但信号明确）

- [#117179](https://github.com/openclaw/openclaw/pull/117179) fix(google): stop runaway realtime transcript growth — 修复 Google Live 会话中因 provider 未发送 `finished` 标记导致 transcript 无限增长的问题（关联 #116201）
- [#117177](https://github.com/openclaw/openclaw/pull/117177) fix(exec): preserve approved command output when sessions resume — 修复会话恢复时已审批命令输出丢失的问题（关闭 #41152）
- [#116934](https://github.com/openclaw/openclaw/pull/116934) fix(matrix): preserve messages sent during crash downtime — 修复 Matrix 崩溃期间消息丢失问题（关联 #74569）
- [#116666](https://github.com/openclaw/openclaw/pull/116666) fix(queue): prevent cron saturation from starving hook dispatch — 修复 cron 任务占满所有并发槽位导致 hook 请求 503 的问题

这些 PR 表明项目组正围绕社区最痛的几个稳定性问题（消息丢失、会话恢复、资源泄漏）进行系统性修复。

---

## 社区热点

### 最热门 Issue 分析

| Issue | 标题 | 评论/点赞 | 核心诉求 |
|---|---|---|---|
| [#75](https://github.com/openclaw/openclaw/issues/75) | Linux/Windows Clawdbot Apps | 116评论 / 80👍 | **跨平台桌面客户端**。目前仅有 macOS/iOS/Android，用户强烈要求 Linux 和 Windows 版本。自2026年1月创建至今仍为开放状态，已收集了大量使用场景与需求细节 |
| [#91588](https://github.com/openclaw/openclaw/issues/91588) | Critical: Gateway Memory Leak — RSS grows from 350MB to 15.5GB | 23评论 / 1👍 | **P0级内存泄漏**。Gateway 进程运行2-3天后 RSS 从350MB涨至15.5GB，被 OOM killer 杀死后陷入 `launchd-handoff` 重启循环。这是当前项目健康度最严重的威胁 |
| [#7707](https://github.com/openclaw/openclaw/issues/7707) | Memory Trust Tagging by Source | 23评论 / 0👍 | **记忆源可信度分级**。防止恶意网页/三方技能通过记忆投毒影响 Agent 行为，属于安全增强需求 |
| [#116201](https://github.com/openclaw/openclaw/issues/116201) | Realtime voice work can retain unbounded provider and consult state | 18评论 / 0👍 | **实时语音资源无界增长**。语音会话在慢/突发 provider 行为下可无限保留 superseded consult work、大帧、未就绪音频等，已有 PR #117179 开始修复 |
| [#10659](https://github.com/openclaw/openclaw/issues/10659) | Masked Secrets - Prevent Agent from Accessing Raw API Keys | 15评论 / 4👍 | **密钥脱敏**。Agent 应能用 API key 但看不到明文，防止提示注入窃取凭据 |

### 热点背后的诉求

1. **稳定性压倒一切**：内存泄漏（#91588）、消息重复（#86519）、消息丢失（#114137）、会话卡死（#114255）等 P0/P1 问题占据了评论热榜，用户最关心的是"我的 Agent 能否可靠地记住并完成对话"。
2. **跨平台支持呼声持续高涨**：#75 从年初持续至今，Linux/Windows 用户对桌面客户端的期待非常高。
3. **安全与隐私意识增强**：密钥脱敏（#10659）、记忆投毒防护（#7707）、凭据泄漏（#116242）等多个安全相关 Issue 获得讨论，反映企业/专业用户群体的需求在上升。

---

## Bug 与稳定性

> 按严重程度排列。标注 ⚠️ 表示已有对应 fix PR。

### P0 — 严重崩溃/核心功能不可用

| Issue | 问题 | 状态 |
|---|---|---|
| [#91588](https://github.com/openclaw/openclaw/issues/91588) | Gateway 内存泄漏，RSS 从350MB涨至15.5GB，OOM 反复崩溃 | 🔴 无 fix PR |
| [#116409](https://github.com/openclaw/openclaw/issues/116409) | **每条入站消息都被写入 transcript 两次**（所有频道），触发孤儿清除→投影重建→"active branch changed"循环，**今日已关闭** | ✅ 已关闭 |
| [#116868](https://github.com/openclaw/openclaw/issues/116868) | SQLite 会话可回退到冻结的旧 JSONL，复活已完成任务，**今日已关闭** | ✅ 已关闭 |
| [#116391](https://github.com/openclaw/openclaw/issues/116391) | WebChat 跨天首条消息会清空历史记录，**今日已关闭** | ✅ 已关闭 |
| [#116418](https://github.com/openclaw/openclaw/issues/116418) | Ollama 作为主模型时永远不被选中，总是 fallback 到下一个模型，**今日已关闭** | ✅ 已关闭（PR #117168） |

### P1 — 核心功能严重受影响但有变通方案

| Issue | 问题 | fix PR |
|---|---|---|
| [#116201](https://github.com/openclaw/openclaw/issues/116201) | 实时语音会话可无限保留 provider/consult 状态 | ⚠️ [#117179](https://github.com/openclaw/openclaw/pull/117179) |
| [#114137](https://github.com/openclaw/openclaw/issues/114137) | 可见频道间歇性 dispatch 无回复 payload，最终文本已持久化但从未投递 | 🔴 无 |
| [#115908](https://github.com/openclaw/openclaw/issues/115908) | transcript 投影重建可活锁，阻塞主线程数秒，导致所有频道卡住 | 🔴 无 |
| [#113306](https://github.com/openclaw/openclaw/issues/113306) | SQLite 快照恢复缺少崩溃与身份保证，可能静默数据丢失 | 🔴 无 |
| [#86519](https://github.com/openclaw/openclaw/issues/86519) | Telegram 上 Agent 重复回复相同内容 2-10 次（5.20 更新后回归，5.22 部分缓解） | 🔴 无 |
| [#87109](https://github.com/openclaw/openclaw/issues/87109) | Gateway heap 空闲涨至1073MB+，cron 任务在内存压力下静默失败 | 🔴 无 |
| [#86772](https://github.com/openclaw/openclaw/issues/86772) | 内存泄漏导致 cron 任务静默无输出 | 🔴 无 |
| [#45494](https://github.com/openclaw/openclaw/issues/45494) | LLM API 持续500时 cron 任务耗尽超时而非快速失败 | 🔴 无 |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | hook/tool 子进程未回收，产生僵尸进程积累 | 🔴 无 |
| [#51429](https://github.com/openclaw/openclaw/issues/51429) | 代码中 hardcode 了某开发者的工作路径（`/Users/wangtao`），新安装用户工作区被设为该目录 | 🔴 无 |
| [#116242](https://github.com/openclaw/openclaw/issues/116242) | Codex supervision 凭据脱敏只覆盖4类 token 前缀（sk-/glpat-/xox*-/Bearer），Google/AWS/JWT 等凭据会泄漏给 runtime | 🔴 无 |
| [#114255](https://github.com/openclaw/openclaw/issues/114255) | 重启后 session 卡在 `status: running`，Telegram spool 永远重试 | 🔴 无 |

### P1 — 其他高影响问题

| Issue | 问题 |
|---|---|
| [#53540](https://github.com/openclaw/openclaw/issues/53540) | LLM 生成大参数工具调用时嵌入式 runner 报 "Network connection lost" |
| [#70024](https://github.com/openclaw/openclaw/issues/70024) | 频道停止超时后 channel 永久死亡（running: true 但 store 脏） |
| [#51396](https://github.com/openclaw/openclaw/issues/51396) | `clearUnboundScopes` 无条件清除非本地 token 客户端的 operator 权限 |
| [#46786](https://github.com/openclaw/openclaw/issues/46786) | `tools.elevated.enabled: true` 导致所有 exec 被路由到 gateway 而非 sandbox |
| [#48810](https://github.com/openclaw/openclaw/issues/48810) | compaction 重试产生孤儿 fork，破坏 parentId 链重建 |
| [#114653](https://github.com/openclaw/openclaw/issues/114653) | `sessions_send`/`sessions_history` 的瞬时失败被 bare catch 当作策略拒绝，无日志无重试 |
| [#85844](https://github.com/openclaw/openclaw/issues/85844) | 自动更新后运行中的 gateway 继续引用已删除的旧 hashed bundle |

### P2 — 中等级别问题（节选）

- [#115001](https://github.com/openclaw/openclaw/issues/115001) hybrid memory search 返回虚假的 1.0 相似度分数（FTS LIKE-fallback 硬编码 textScore）
- [#114211](https://github.com/openclaw/openclaw/issues/114211) Matrix 房间 Agent 可对可见 no-reply 输出循环，并在重启后重放过期会话状态
- [#77930](https://github.com/openclaw/openclaw/issues/77930) Discord 频道在 2026.5.4 及 beta.2/beta.3 中无法加载（beta.1 和 4.29 正常）
- [#96692](https://github.com/openclaw/openclaw/issues/96692) Slack 线程回复在 origin tuple 丢失后生成了但无法投递
- [#86012](https://github.com/openclaw/openclaw/issues/86012) LINE 消息因 reply token 过期被静默丢失，无 push fallback
- [#115476](https://github.com/openclaw/openclaw/issues/115476) compaction 后 Telegram 重放旧 `message_id`，缺少 gateway 级去重
- [#47979](https://github.com/openclaw/openclaw/issues/47979) Control UI Dashboard v2 在 Chrome 146 上完全冻结（Firefox 正常）

---

## 功能请求与路线图信号

### 高热度增强请求（可能进入下一版本）

| Issue/PR | 功能 | 判断依据 |
|---|---|---|
| [#117187](https://github.com/openclaw/openclaw/pull/117187) | CLI `image generate` 支持输入文件（`--file`） | 已有 PR 提交，说明已进入开发流程 |
| [#117034](https://github.com/openclaw/openclaw/pull/117034) | 审计功能：执行身份检查（execution identity inspection） | 大型 PR（XL），含安全边界改进，已获批实施 |
| [#90916](https://github.com/openclaw/openclaw/issues/90916) | Topic-session 家族：一个助手支持多个命名上下文通道 | 9评论/2👍，设计较完善，与现有 session 架构兼容 |
| [#67419](https://github.com/openclaw/openclaw/issues/67419) | 减少 bootstrap 文件重复注入，节省 20-30% token | 10评论/2👍，直接影响成本与上下文利用率 |
| [#10687](https://github.com/openclaw/openclaw/issues/10687) | 全动态模型发现（OpenRouter 等） | 9评论/3👍，解决模型目录静态化问题 |
| [#13219](https://github.com/openclaw/openclaw/issues/13219) | 按模型记录 usage 日志，支持成本追踪 | 6评论/1👍，企业/付费用户刚需 |
| [#45608](https://github.com/openclaw/openclaw/issues/45608) | `/new`、`/reset`、每日重置前执行 silent memory flush | 11评论/4👍，防止会话销毁时记忆丢失 |

### 路线图信号分析

1. **可靠性优先**：从今日大量合并的 fix PR 和新增 PR 来看，项目组正优先处理消息丢失、状态不一致、资源泄漏三大类问题。这印证了社区反馈热度与项目投入方向一致。
2. **安全加固在加速**：#116242（凭据泄漏）、#10659（密钥脱敏）、#117034（审计身份检查）等安全相关 Issue/PR 活跃度高，安全边界正在被系统性强化。
3. **扩展生态规范化**：PR #117188 统一 Slack/Matrix/Nostr 渠道所有权、PR #116300 外部化腾讯 provider、PR #81913 稳定插件 SDK 接口 — 表明项目组有意收敛内部扩展管理，为第三方插件生态做准备。

---

## 用户反馈摘要

### 典型用户痛点

1. **内存泄漏与 OOM 导致的服务不可用**（#91588、#87109）
   > 用户 petercheng 报告：Gateway 运行 2-3 天后 RSS 达 15.5GB，OOM 后不断 `launchd-handoff` 重启循环。多用户确认 cron 任务在内存压力下**静默失败**——无输出、无推送、无错误上报，影响极其恶劣。

2. **Hardcode 路径事故**（#51429）
   > 用户 buggiant-coder 用中文描述："20260321，今天刚安装的，最新版，结果 openclaw 建了一个 /Users/wangtao 的文件夹，并且把工作区设成了这个目录。这位 wangtao 是谁？" — 反映代码审查流程存在漏洞，用户对发布质量信任受损。

3. **消息丢失与重复**（#86519、#114137、#86012）
   > 多个频道（Telegram、Signal、LINE）出现消息"生成了但永远收不到"或"重复发送 2-10 次"的问题，直接影响用户对 Agent 的基本信任。

4. **更新回归频发**（#77930、#86519、#116391）
   > 多个 Issue 明确指出"某个小版本正常工作，升级后坏了"的回归模式，用户对版本质量信心不足。

### 积极反馈信号

1. **功能迭代速度受认可**：PR 合入速度快，#75 中用户持续跟进 Linux/Windows 开发进度并给出具体建议，表明社区参与度高。
2. **修复响应速度加快**：今日 #116418、#116409、#116391、#116868 等 P1 级 Issue 全部关闭，且#116418 当日修复（PR #117168），体现了项目组对严重 Bug 的响应效率。

---

## 待处理积压

### 长期未响应的重要 Issue

| Issue | 标题 | 创建时间 | 滞留时间 | 严重度 | 备注 |
|---|---|---|---|---|---|
| [#75](https://github.com/openclaw/openclaw/issues/75) | Linux/Windows Clawdbot Apps | 2026-01-01 | **7个月** | 高（社区呼声最高） | 116评论/80👍，仍无明确路线图 |
| [#51429](https://github.com/openclaw/openclaw/issues/51429) | 硬编码工作路径 `/Users/wangtao` 被合并发布 | 2026-03-21 | 4.5个月 | 高（发布质量问题） | 无维护者确认，无 fix PR |
| [#46786](https://github.com/openclaw/openclaw/issues/46786) | `tools.elevated.enabled` 破坏 exec 路由 | 2026-03-15 | 4.5个月 | 高（安全边界被绕过） | 无 fix PR |
| [#48810](https://github.com/openclaw/openclaw/issues/48810) | compaction 重试创建孤儿 fork | 2026-03-17 | 4.5个月 | 中 | 影响数据完整性与链重建 |
| [#53540](https://github.com/openclaw/openclaw/issues/53540) | 大参数工具调用触发 "Network connection lost" | 2026-03-24 | 4个月 | 中 | 影响特定场景 |

### 积压 PR 提醒

| PR | 标题 | 创建时间 | 备注 |
|---|---|---|---|
| [#84860](https://github.com/openclaw/openclaw/pull/84860) | fix(skills): require resolved approval before mutating actions | 2026-05-21 | 已停滞2.5个月，影响技能安全性 |
| [#110129](https://github.com/openclaw/openclaw/pull/110129) | fix(telegram): require decimal watermark message ids | 2026-07-17 | 等待维护者审阅（ready for maintainer look） |
| [#113901](https://github.com/openclaw/openclaw/pull/113901) | fix(update): keep managed gateway updates in the correct profile | 2026-07-25 | 维护者提交但状态为 needs proof |
| [#113739](https://github.com/openclaw/openclaw/pull/113739) | fix(voice-call): flush stream audio before DTMF | 2026-07-25 | 语音通话可用性修复，需 proof |

### 风险提示

1. **#75（Linux/Windows 客户端）长期悬而未决**是社区最大的"信心缺口"。
2. **#51429 硬编码路径事故**若得不到官方说明与测试流程改进，将持续损害用户信任。
3. **内存泄漏类问题（#91588、#87109、#97616）无 fix PR** 是当前最高的技术债，建议项目组优先安排专项排查。

---

> 报告生成时间：2026-08-01 | 数据来源：OpenClaw GitHub 仓库
> 本报告基于公开 Issue/PR 元数据与描述自动生成，不包含代码级分析。

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比分析报告

**报告日期：2026-08-01**

---

## 1. 生态全景

当前个人 AI 助手开源生态呈现**"一超多强、分化加剧"**的态势：以 OpenClaw 为首的一线项目单日产生 500 条 Issue/PR 更新，维持极高的迭代强度；Zeroclaw、IronClaw、CoPaw 等项目紧随其后，日更新量级在 50~100 条之间；而 TinyClaw、ZeptoClaw、EasyClaw 等已进入零活动停滞状态。整个生态的关注焦点已从"功能扩展"全面转向**可靠性、安全性、架构治理**三大主题——内存泄漏、消息丢失/重复、配置持久化回归、凭据泄漏成为跨项目高频出现的痛点，同时记忆系统架构、提示缓存命中率、命令级安全策略等"深水区"问题开始获得系统性投入。行业正从"能跑通"迈入"能可靠、可治理、可审计"的成熟化阶段。

---

## 2. 各项目活跃度对比

| 项目 | Issues（今日） | PRs（今日） | Release | 活跃度 | 健康度评估 | 所处阶段 |
|------|---------------|------------|---------|--------|-----------|---------|
| **OpenClaw** | 500（新开/活跃461，关闭39） | 500（待合并377，合并/关闭123） | 无 | ★★★★★ | ⚠️ 极高活跃但 P0 Bug 积压严重 | 快速迭代+稳定性攻坚 |
| **IronClaw** | 36（活跃29，关闭7） | 50（待合并21，合并/关闭29） | 无 | ★★★★☆ | ✅ 架构重构高效推进，但 P0 安全缺陷突出 | 架构驱动重构 |
| **Zeroclaw** | 50（活跃45，关闭5） | 50（待合并40，合并/关闭10） | 无 | ★★★★☆ | ⚠️ 合并管线承压，PR 评审积压 | 架构讨论+记忆重构 |
| **CoPaw** | 16（活跃11，关闭5） | 34（待合并24，合并/关闭10） | 无 | ★★★★ | ✅ 缺陷修复密集，贡献者生态活跃 | 缺陷修复收敛期 |
| **NanoBot** | 4（新开活跃2，关闭2） | 13（待合并7，合并/关闭6） | 无 | ★★★☆ | ✅ 迭代健康，SQLite 迁移落地 | 质量巩固+功能增强 |
| **LobsterAI** | 4（全部关闭，stale清理） | 12（合并/关闭11，待合并1） | 无（合并 Release/2026.7.31） | ★★★☆ | ✅ 生产环境稳定性修复显著 | 发布前收敛期 |
| **Moltis** | 2（新开1，关闭1） | 6（待合并4，合并/关闭2） | 无 | ★★★ | ✅ 平稳推进，安全 PR 值得关注 | 功能扩展+安全加固 |
| **NanoClaw** | 8（活跃8，关闭0） | 10（待合并6，合并/关闭4） | 无 | ★★★ | ⚠️ 部署灵活性诉求积压较重 | 功能扩展期 |
| **PicoClaw** | 2（活跃2，关闭0） | 3（待合并3，合并/关闭0） | 无 | ★★☆ | ⚠️ PR 积压约 1 个月，Bug 有 stale 风险 | 功能扩张期 |
| **NullClaw** | 0 | 1（待合并1，合并/关闭0） | 无 | ★★ | ✅ 无紧急问题但响应速度需关注 | 低活跃推进期 |
| **TinyClaw** | 0 | 0 | 无 | ☆ | — | 停滞 |
| **ZeptoClaw** | 0 | 0 | 无 | ☆ | — | 停滞 |
| **EasyClaw** | 0 | 0 | 无 | ☆ | — | 停滞 |

---

## 3. OpenClaw 在生态中的定位

**社区规模维度**：OpenClaw 单日 500 条 Issue + 500 条 PR 的活跃度是 Zeroclaw/IronClaw 的 5~10 倍、NanoBot/LobsterAI 的 30~50 倍，是生态中绝对的核心枢纽。其 Issue #75（Linux/Windows 桌面客户端）以 116 评论/80👍 高居全生态社区呼声榜首，反映了其在用户基数上的碾压性优势。

**技术路线差异**：OpenClaw 采用 **monorepo + 扩展驱动** 路线，通过 Codex CLI、Google Live、xAI、Matrix/Telegram/Signal 等扩展覆盖全渠道、全模型，走"大而全"的平台化路径。相比之下，Zeroclaw 强调**架构治理**（RFC 驱动、密钥抽象、沙箱策略），IronClaw 以**目标架构（WS1 契约层重构）**推进内核收敛，NanoClaw 以**容器隔离**为核心安全边界——各有侧重。

**核心竞争特点**：
- **优势**：生态最大、渠道扩展最全、模型适配最广（Ollama/Codex/Google/xAI），社区反馈驱动修复速度快（今日 #116418 当日修复关闭）。
- **挑战**：P0 级内存泄漏（#91588，RSS 350MB→15.5GB）、消息重复/丢失、会话状态不一致等稳定性问题大量积压，与社区当前"可靠性压倒一切"的核心诉求形成张力。其"广度优先、稳定性滞后"的节奏为其他项目留出了差异化空间。

---

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|---------|---------|---------|
| **记忆系统架构与治理** | OpenClaw、Zeroclaw、CoPaw、Moltis、LobsterAI | 记忆可信度分级（OpenClaw #7707）、会话历史与长期记忆解耦（Zeroclaw #9048/#6850）、Schema-Guided 解析（Zeroclaw #6998）、记忆文件遗漏早间事件（CoPaw #6555）、本地可插拔记忆后端（Moltis #1158）、记忆编辑器弹层遮挡（LobsterAI #1321） |
| **Shell 命令安全与稳定性** | OpenClaw、Zeroclaw、CoPaw | 命令级 allow/ask/deny 策略（Zeroclaw #7155）、`execute_pipeline` 绕过工具访问策略（Zeroclaw #7960）、大输出导致 UI 冻结/截断（CoPaw #6589/#6512）、超时绕过（CoPaw #6608）、工具提权路由被破坏（OpenClaw #46786） |
| **消息投递可靠性** | OpenClaw、NanoBot、CoPaw、PicoClaw | 消息"生成了但收不到"（OpenClaw #114137）、Telegram 重复回复 2-10 次（OpenClaw #86519）、崩溃期间消息丢失（OpenClaw #116934）、微信 token 过期静默失败（NanoBot #5195）、微信 cron 推送假成功（CoPaw #6614）、IRC 长消息分片误判（PicoClaw #3287） |
| **配置/凭据管理安全** | OpenClaw、Zeroclaw、CoPaw、NanoClaw | 密钥脱敏防提示注入（OpenClaw #10659）、Codex OAuth 凭据泄漏（OpenClaw #116242）、主密钥来源抽象（Zeroclaw #9127）、agent.json 系统性损坏（CoPaw #6520）、Skill tags 重启丢失（CoPaw #6537）、交互卡片伪造点击（NanoClaw #2923） |
| **部署形态灵活性** | NanoClaw、IronClaw、OpenClaw | 无 Docker 运行（NanoClaw #1225/#1732）、K8s 容器运行时（NanoClaw #2354）、无人值守服务器常驻（IronClaw #6976）、Linux/Windows 桌面客户端（OpenClaw #75） |
| **提示缓存与 Token 成本优化** | LobsterAI、IronClaw、OpenClaw | 缓存命中率 ~100%→57% 修复（LobsterAI #2413/#2415）、缓存前缀变异导致永不命中（IronClaw #6984-#6987）、bootstrap 文件重复注入节省 20-30% token（OpenClaw #67419） |

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 关键架构特征 |
|------|---------|---------|------------|
| **OpenClaw** | 全渠道、全模型、全能型助手 | 个人开发者/极客/社区大众 | monorepo，扩展驱动，本地优先+多 provider |
| **Zeroclaw** | 安全可审计、架构治理 | 企业级/安全敏感团队 | 分布式 gateway/channel，Rust 风格强类型，RFC 驱动 |
| **IronClaw** | 内核架构治理、托管服务 | 平台型/基础设施团队 | 目标架构波次重构，中性契约层，WASM 扩展方向 |
| **CoPaw** | 桌面体验、AgentScope 生态 | 桌面用户/Qwen 生态开发者 | 与 AgentScope 深度集成，多会话 UI，全局热键 |
| **LobsterAI** | 生产环境稳定、DeepSeek 优化 | 企业内网部署（网易有道） | 针对 DeepSeek 缓存命中率专项优化，Renderer 分离 |
| **NanoClaw** | 容器安全隔离、极简 | 安全敏感个人/企业 | 默认 Docker 沙箱，容器即边界，Apple Container 支持 |
| **Moltis** | 去中心化协议互操作 | 去中心化/隐私偏好用户 | Nostr/Buzz（NIP-29）集成，跨协议代理协作 |
| **NanoBot** | 轻量、多渠道、快速部署 | 个人轻量使用 | SQLite 存储，微信/Slack 等渠道，极低资源占用 |
| **PicoClaw** | 嵌入式/边缘/多协议 | 嵌入式/小众协议用户 | DeltaChat/Simplex 等小渠道优先，Go 实现 |
| **NullClaw** | 本地 CLI 聚合 | 命令行爱好者/隐私用户 | spawn-per-request 模式，codex/gemini/claude/grok CLI 后端 |

---

## 6. 社区热度与成熟度

**第一梯队：高速迭代 + 稳定性攻坚**
- **OpenClaw**：日 500+500 条更新，修复响应快但 P0 积压多；社区热度最高，风险也最高。
- **IronClaw**：架构重构（WS1 波次）实质落地，合并效率高；但 P0 跨用户安全问题（#6900）和提示缓存失效问题并存的局面需关注。
- **Zeroclaw**：并发 PR 多但合并吞吐受限（40 条待合并中 13 条 `needs-author-action`），Hindsight 记忆栈 7 个 PR 悬置 2.5 周，属于"讨论热、落地慢"。
- **CoPaw**：缺陷修复密集，5 个 first-time-contributor PR 体现社区自愈能力，整体处于密集回归收敛期。

**第二梯队：质量巩固 + 稳步推进**
- **NanoBot**：SQLite 迁移完成，修复/测试配套完善，迭代健康度全生态最佳之一。
- **LobsterAI**：生产级缓存修复落地，UX 功能合入，处于发布前收敛期。
- **Moltis**：协议扩展和安全 PR 并行，但长期开放 PR（#1158 达 15 天）需维护者给予明确反馈。
- **NanoClaw**：高频更新但部署灵活性诉求（无 Docker/K8s）长期悬置，是主要风险。

**第三梯队：低活跃 / 贡献者维护**
- **PicoClaw**：3 条 PR 积压 4-5 周未合并，贡献者流失风险高。
- **NullClaw**：单 PR 待评审 3 天未回应，需防止从"低活跃"滑向"停滞"。

**停滞项目**：TinyClaw、ZeptoClaw、EasyClaw（24 小时零活动）。

---

## 7. 值得关注的趋势信号

1. **"稳定性压倒功能"已成为生态共识**：OpenClaw 今日合并的 4 个 PR 全为修复类，CoPaw 合并的 10 个 PR 中 3 个直接针对生产问题，LobsterAI 缓存命中率修复直接影响用户 API 成本。对于开发者选型，"Bug 修复速度与社区响应周期"应作为与功能丰富度同等重要的评估维度。

2. **记忆系统从"存储功能"走向"架构治理"**：记忆可信度分级（OpenClaw）、历史/长期记忆解耦（Zeroclaw）、记忆生命周期策略与存储解耦（Zeroclaw #6850）、记忆丢失修复（CoPaw）四个方向同时涌现。这标志着 AI 助手长期记忆不再是简单的"存/取"，而是需要**分层的生命周期管理、来源可信度评估、防投毒安全边界**——这将直接影响下一代 Agent 的产品竞争力。

3. **提示缓存命中率成为成本竞争的新战场**：LobsterAI 的"~100%→57%→恢复"案例和 IronClaw 的 P0 缓存破坏组（#6984-#6987）表明：随着长会话和深度 Agent 工作流的普及，**Token 成本正在从"模型价格"转向"缓存工程效率"**。字节级稳定的 prompt 前缀、避免运行时变异，将成为主流项目的必备能力。

4. **安全边界是外部采用的实际门槛**：Moltis 外部开发者 tsauvajon 直言"*I'd like to use Moltis, but I've got a couple of security fixes I'd like to get in before doing so*"——这句话代表了一批潜在用户的心态。凡是涉及企业场景的项目，**安全加固的优先级应高于功能扩展**。凭据脱敏、命令级权限、跨用户隔离、防伪造交互是当下最稀缺的安全能力。

5. **部署形态的"最后一公里"矛盾凸显**：NanoClaw 的"无 Docker/K8s/原生运行"三连问、OpenClaw #75 的跨平台客户端长期高居热榜、IronClaw #6976 的无人值守服务器问题，共同指向一个事实：**Agent 的能力已不是瓶颈，"如何融入用户现有基础设施"才是瓶颈**。容器隔离虽安全，但过度约束正推动社区向"原生模式"或"混合沙箱"方向演进。

6. **可观测性缺口正在被正视**：Zeroclaw OTel 跨轮次会话关联（#8933）、CoPaw 微信推送 "status=success 但实际未送达"、OpenClaw 按模型 usage 日志（#13219）——当 Agent 执行链路足够长后，**"假成功"比"明确失败"更可怕**。可观测性将成为评价 AI 助手框架成熟度的新关键指标。

7. **贡献者生态的分化信号**：CoPaw 24 小时内出现 5 个首次贡献者 PR，说明**问题可复现性高、贡献门槛友好**能有效吸引社区参与；而 PicoClaw 的 PR 积压（35 天）和 NullClaw 的 PR 无回应（3 天），则是贡献者流失的前兆。技术决策者可通过观察项目对社区 PR 的响应速度，预判其长期活力。

---

*数据来源：各项目 GitHub 仓库公开 Issue/PR 元数据，数据窗口 2026-07-31 至 2026-08-01。*

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 — 2026-08-01

## 1. 今日速览

NanoBot 项目在过去 24 小时内保持高度活跃，共产生 4 条 Issue 更新和 13 条 PR 更新，其中 6 条 PR 已合并或关闭，7 条尚在审查中。项目核心聚焦于稳定性修复与体验优化：微信渠道会话过期恢复、SQLite 存储迁移落地、WebUI 滚动行为修复均已完成合并；同时有 2 条新的 bug 报告（模型切换、前端 MIME 类型）尚待处理。无新版本发布，整体处于高频迭代、健康推进状态。

---

## 2. 版本发布

**无新版本发布**（过去 24 小时 Release 数量为 0）。

---

## 3. 项目进展

今日合并/关闭了 6 条 PR，其中最重要的包括：

- **会话存储引擎迁移完成** — [#5173 feat(session): migrate session storage from JSONL to SQLite](https://github.com/HKUDS/nanobot/pull/5173)（已合并）。`sessions.db` 成为唯一运行时会话存储，首次启动时自动从 JSONL 事务性导入，保留 JSONL 文件作为回滚备份。这是项目基础设施层面的重大升级，为后续大规模会话管理打下基础。

- **微信渠道会话恢复修复** — [#5196 fix(weixin): recover refreshed state after session expiry](https://github.com/HKUDS/nanobot/pull/5196)（已合并）。解决 #5195 中 `errcode -14` 导致的 60 分钟暂停后无法恢复新 token 的问题，渠道在暂停结束后会重新加载持久化的会话状态。

- **Slack 线程作用域修复** — [#5192 fix(slack): scope channel thread openers to their own session](https://github.com/HKUDS/nanobot/pull/5192)（已合并）。修复顶层频道消息开启线程时错误回退到频道级会话的问题，避免不同线程互相串扰。

- **WebUI 滚动行为优化** — [#5193 fix(webui): preserve user scroll ownership near tail](https://github.com/HKUDS/nanobot/pull/5193)（已合并）。修复用户在小范围上滑时被强制拉回底部的问题，提升聊天界面浏览体验。

- **跨平台时区数据修复** — [#5189 fix(config): install timezone data on all platforms](https://github.com/HKUDS/nanobot/pull/5189)（已合并）。为 Termux 等无系统时区数据库的环境安装 `tzdata` 回退方案，解决了 #5187 报告的启动失败问题。

- **老 PR 清理** — [#4223 fix(weixin): reload session state after pause expiry](https://github.com/HKUDS/nanobot/pull/4223)（已关闭）。该 PR 与 #5196 功能重复，在 #5196 合并后关闭，属于正常的 PR 收敛。

---

## 4. 社区热点

今日讨论最活跃的是 [#5195 [bug] Re-scan QR login overwrites new token with old one in stop()](https://github.com/HKUDS/nanobot/issues/5195)（2 条评论，已关闭）。该问题描述了微信渠道在 WebUI 中重新扫码登录后，旧 token 覆盖新 token 导致 `errcode -14` 会话过期，渠道被迫暂停 60 分钟。用户 @amkile 提供了详细的根因分析和复现路径，展现了高质量的技术报告。该 issue 已在当日由 PR #5196 修复，体现了社区反馈驱动的快速迭代节奏。

---

## 5. Bug 与稳定性

按严重程度排列（P1 最高）：

| 严重度 | Issue/PR | 描述 | 状态 |
|--------|----------|------|------|
| **P1** | [#5195](https://github.com/HKUDS/nanobot/issues/5195) | 微信重扫二维码后旧 token 覆盖新 token，导致 `errcode -14` 会话过期并暂停 60 分钟 | 已关闭，由 [#5196](https://github.com/HKUDS/nanobot/pull/5196) 修复 |
| **P1** | [#5187](https://github.com/HKUDS/nanobot/issues/5187) | `nanobot` 在 Termux 中因缺少时区数据无法启动 | 已关闭，由 [#5189](https://github.com/HKUDS/nanobot/pull/5189) 修复 |
| **P2** | [#5190](https://github.com/HKUDS/nanobot/issues/5190) | Windows 下前端模块脚本加载失败（MIME 类型为 `text/plain`） | 开放，已有修复 PR [#5191](https://github.com/HKUDS/nanobot/pull/5191) |
| **P2** | [#5198](https://github.com/HKUDS/nanobot/issues/5198) | 特定会话中无法切换模型（`/model` 命令无效） | 开放，暂无修复 PR |

此外还有两个 P1 级修复 PR 正在审查中：**[#5201](https://github.com/HKUDS/nanobot/pull/5201) fix(session): tolerate malformed persisted session summary** 和 **[#5200](https://github.com/HKUDS/nanobot/pull/5200) fix(exec): preserve wait targets across response truncation**，两者均包含回归测试，体现了项目对质量的重视。

---

## 6. 功能请求与路线图信号

以下 PR/Issue 反映了社区对项目未来方向的需求信号：

- **DeepSeek Responses API 接入** — [#5197 feat(providers): support DeepSeek Responses API](https://github.com/HKUDS/nanobot/pull/5197)（开放）。为 `deepseek-v4-flash` 提供原生 Responses API 支持，同时复用现有流式与函数调用机制。表明项目正在积极跟进主流模型供应商的最新 API 能力。

- **Quick Chat 与 Temporary Chat** — [#5184 feat(webui): add Quick Chat and Temporary Chat](https://github.com/HKUDS/nanobot/pull/5184)（开放）。为 WebUI 增加常驻快速聊天入口和临时聊天模式（仅内存历史）。该功能若落地，将显著提升多场景聊天的灵活性。

- **SQLite 存储迁移**（#5173，已合并）虽已完成，但作为长期路线图的一环，后续可期待对 SQLite 的深度集成优化（如索引、查询性能等）。

---

## 7. 用户反馈摘要

- **微信渠道的 token 管理痛点**（来自 #5195）：用户 @amkile 报告了重新扫码后会话立即失效的问题，并提供了从 `stop()` 函数覆盖逻辑到 `_pause_session()` 暂停机制的完整根因分析，体现了对项目代码的深入理解。该反馈直接推动了一个 P1 级修复的落地，说明高质量 issue 对项目改进有显著推动力。

- **模型切换体验不佳**（来自 #5198）：用户 @whisperity 指出当前模型选择机制只将额外模型作为 fallback，UI 上点击模型名称无效，`/model` 命令也未按预期生效。这反映了用户对精细化会话级模型控制的诉求，尤其在 Cloud SaaS AI 产品已形成"随时切换模型"心智的情况下，本地助手需要对齐此类交互。

- **Windows 环境下 Web 资源服务问题**（来自 #5190）：用户 @amkile 报告了 Windows 上因注册表 Content Type 设置导致前端模块加载失败的问题。该反馈直接催生了 PR #5191 的修复方案，并给出了针对性的实现思路（绕过注册表猜 MIME 类型）。

---

## 8. 待处理积压

- **长期未合并的 WebUI 功能 PR** — [#5184 feat(webui): add Quick Chat and Temporary Chat](https://github.com/HKUDS/nanobot/pull/5184)（自 2026-07-30 开放，已 2 天）。该 PR 涉及较大功能面，但无维护者评论，建议尽快安排 review，避免功能分支停留过久产生冲突。

- **模型切换 bug** — [#5198](https://github.com/HKUDS/nanobot/issues/5198)（开放，无评论）。该 issue 描述了核心交互功能的缺陷，且无维护者回应。考虑到模型切换是 AI 助手的高频操作，建议安排 P2 级别的修复计划。

- **Windows MIME 修复 PR** — [#5191](https://github.com/HKUDS/nanobot/pull/5191)（开放）。该 PR 直接对应 #5190，但尚未获得 review。因涉及 Windows 用户体验且修复方案明确，建议优先处理。

- **静态资产 MIME 类型** — 与 #5190 相关的 [#5191](https://github.com/HKUDS/nanobot/pull/5191) 在 Windows 上需验证注册表 fallback 逻辑的兼容性，建议在 CI 中增加 Windows 平台测试。

---

*本日报自动生成，数据截至 2026-08-01，所有链接均指向 GitHub。*

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-08-01

> 数据窗口：2026-07-31 至 2026-08-01 · 数据源：github.com/zeroclaw-labs/zeroclaw

---

## 1. 今日速览

- **活跃度极高**：过去 24 小时 Issue 更新 50 条（新开/活跃 45，关闭 5），PR 更新 50 条（待合并 40，合并/关闭 10），无新版本发布。
- **社区讨论聚焦架构级 RFC**：对话历史与长期记忆分离（[#9048](https://github.com/zeroclaw-labs/zeroclaw/issues/9048)，14 评论）、主密钥来源抽象（[#9127](https://github.com/zeroclaw-labs/zeroclaw/issues/9127)，11 评论）、高危 shell 命令确认策略（[#7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155)，9 评论）成为讨论热点。
- **稳定性有实质修复**：Signal/Voice 空凭据 crashloop（[#6724](https://github.com/zeroclaw-labs/zeroclaw/issues/6724)）与 Landlock 阻断 Fedora shell（[#8973](https://github.com/zeroclaw-labs/zeroclaw/issues/8973)）两个 Bug 均已关闭。
- **合并管线承压**：40 条待合并 PR 中，约 13 条标注 `needs-author-action`，Hindsight 记忆栈 7 个 PR（[#9063](https://github.com/zeroclaw-labs/zeroclaw/pull/9063)–[#9069](https://github.com/zeroclaw-labs/zeroclaw/pull/9069)）虽已进入评审通道但推进节奏受作者响应速度制约。
- **维护者积压风险需关注**：大量 RFC 挂 `needs-maintainer-review`，官方决策队列 tracker [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) 仍在累积。

---

## 2. 版本发布

过去 24 小时无新版本发布（最新 Releases 为空），本节略。

---

## 3. 项目进展

过去 24 小时有 **10 条 PR 被合并/关闭**（采样列表未展示具体条目），另有多个里程碑级工作正在评审管线中推进：

### 记忆架构重构（Hindsight 栈，7/7 PR 齐备）
大规模记忆子系统重构已形成完整 PR 堆栈，覆盖从后端到 UI 的全链路：
- [#9063](https://github.com/zeroclaw-labs/zeroclaw/pull/9063)（1/7）：Hindsight HTTP 后端 + 类型化配置 + 工厂
- [#9064](https://github.com/zeroclaw-labs/zeroclaw/pull/9064)（2/7）：共享/系统记忆层 + 读写授权
- [#9065](https://github.com/zeroclaw-labs/zeroclaw/pull/9065)（3/7）：召回/注入调优 + Hindsight 召回类型过滤，取消硬编码限制
- [#9067](https://github.com/zeroclaw-labs/zeroclaw/pull/9067)（5/7）：保留/遗忘通过无效化 PATCH 实现
- [#9068](https://github.com/zeroclaw-labs/zeroclaw/pull/9068)（6/7）：异步 retain + Telegram DM 流式/裁剪
- [#9069](https://github.com/zeroclaw-labs/zeroclaw/pull/9069)（7/7）：Dashboard 按 agent 后端统计记忆数量

> 评审说明：7 个 PR 中多个已由维护者修正接口、安全、兼容性与回滚声明（2026-07-18），实现仍属贡献者原创，目前等待作者确认。

### 互操作性：OpenAI 兼容端点
- [#8486](https://github.com/zeroclaw-labs/zeroclaw/pull/8486)（对应 issue [#8550](https://github.com/zeroclaw-labs/zeroclaw/issues/8550)）：为网关添加 OpenAI Chat Completions 端点，可让 Open WebUI、LobeChat、LangChain、Continue.dev 等标准客户端直接接入。这是目前最大的外部集成诉求之一。

### 维护者高频提交（8 月 1 日新开）
- [#9606](https://github.com/zeroclaw-labs/zeroclaw/pull/9606)：OpenAI Responses 路径补上运行时代理支持（安全/合规相关）
- [#9604](https://github.com/zeroclaw-labs/zeroclaw/pull/9604)：Linq webhook 别名所有权强制校验（安全加固）
- [#9605](https://github.com/zeroclaw-labs/zeroclaw/pull/9605)：Quickstart 收集 webhook 必填 `port`/HMAC `secret`，默认端口收敛为 8090
- [#9603](https://github.com/zeroclaw-labs/zeroclaw/pull/9603)：Ollama 开发模板迁移至 schema V3，端点从 `api_key` 字段迁移至 `uri`

整体判断：项目正沿 **记忆重构 + 生态互操作 + 安全加固** 三条主线并行推进，但合并吞吐受作者响应与维护者评审双重瓶颈制约。

---

## 4. 社区热点

| 排名 | Issue/PR | 评论数 | 核心诉求 |
|---|---|---|---|
| 1 | [#9048 RFC：分离会话历史与长期记忆](https://github.com/zeroclaw-labs/zeroclaw/issues/9048) | 14 | 文档声称两者生命周期不同，但 runtime/gateway/channel 的 autosave 仍将对话轮次写入通用记忆后端（`MemoryCategory::Conversation`），记忆被"对话噪音"污染，需要明确架构边界 |
| 2 | [#9127 RFC：抽象 `KeySource` trait](https://github.com/zeroclaw-labs/zeroclaw/issues/9127) | 11 | 凭据加密体系已有 ChaCha20-Poly1305 + 93 个 `#[secret]` 字段 + 59 个凭据分类，但主密钥来源/部署形态缺乏统一抽象，安全审计困难 |
| 3 | [#7155 RFC：高危 shell 命令逐次确认层级](https://github.com/zeroclaw-labs/zeroclaw/issues/7155) | 9 | 现有 `auto_approve`、通配符批准、会话级"始终允许 shell"均过粗，缺少 Claude Code 式 allow/ask/deny 命令策略中间层 |
| 4 | [#8933 RFC：OTel 导出跨轮次会话关联](https://github.com/zeroclaw-labs/zeroclaw/issues/8933) | 9 | 可观测性缺少 `gen_ai.conversation.id`，无法跨轮次追踪一次完整会话 |
| 5 | [#9106 RFC：A2A 出站客户端（A2ATool）](https://github.com/zeroclaw-labs/zeroclaw/issues/9106) | 8 | Agent 目前只能被动接收 A2A 入站请求，无法主动调用外部 A2A 兼容 agent，跨 agent 协作被迫走聊天链路 |

**分析**：热点高度集中在"架构清晰化"——记忆边界、密钥抽象、命令策略粒度、观测关联、代理互操作。社区（含多名活跃贡献者）正在推动 ZeroClaw 从"功能可用"走向"架构可治理"。

---

## 5. Bug 与稳定性

### ✅ 已关闭（修复完成）
- **[#8973]（P1）Landlock 阻断 Fedora 上 shell 访问 `/dev/null`** — 沙箱启用后 shell 工具完全不可用，严重度 S2（降级行为）。已关闭：[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/8973)
- **[#6724]（P3）Signal/Voice 空凭据导致 supervisor crashloop** — 空凭据 channel 每约 2 秒被拉起再退出，形成崩溃循环。已关闭：[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/6724)

### 🚧 进行中（已有 fix PR，按严重度排序）
1. **[#7960] 安全：`execute_pipeline` 绕过 per-agent `ToolAccessPolicy`** — 内部注册表为全量工具集，被 `allowed_tools`/`excluded_tools` 拒绝的工具仍可作为 pipeline 步骤被调用（混淆代理风险）。Fix PR 待合并，已标记 `stale-candidate`：[PR #7960](https://github.com/zeroclaw-labs/zeroclaw/pull/7960)
2. **[#9604] 安全：Linq webhook 别名所有权未强制** — 未绑定/未启用的 alias 未被正确忽略，可能造成消息错投。Fix PR 8/1 新开：[PR #9604](https://github.com/zeroclaw-labs/zeroclaw/pull/9604)
3. **[#8918] 安全：Slack token 未在泄漏检测器中脱敏** — 维护者已亲自修复分支并替换 4 处 `unwrap()`。Fix PR 待合并：[PR #8918](https://github.com/zeroclaw-labs/zeroclaw/pull/8918)
4. **[#9606] 功能：OpenAI Responses API 未遵循运行时代理配置** — 企业代理环境下 Responses 路径失效。Fix PR 8/1 新开：[PR #9606](https://github.com/zeroclaw-labs/zeroclaw/pull/9606)
5. **[#9037] 功能：流式响应泄漏字面 `<eom>` 标记** — openrouter → ai21/jamba 场景下结束标记进入可见 transcript、持久化历史及下游渠道投递（对应 issue #9006）。Fix PR 待合并：[PR #9037](https://github.com/zeroclaw-labs/zeroclaw/pull/9037)
6. **[#9449] 数据完整性：JSONL 日志 schema 迁移可能丢失行** — 原实现仅依据首个非空行判断全文件类型。Fix PR 待合并：[PR #9449](https://github.com/zeroclaw-labs/zeroclaw/pull/9449)

**稳定性判断**：两个高影响平台级 Bug 已修复关闭；当前主要风险集中在安全策略绕过（#7960）与日志数据完整性（#9449），均有对应 PR 但等待作者行动。

---

## 6. 功能请求与路线图信号

过去 24 小时新增 RFC/功能请求密集，结合已有 PR 判断路线图优先级：

### 高概率进入下一版本
- **OpenAI 兼容 Chat Completions 端点**（[#8550](https://github.com/zeroclaw-labs/zeroclaw/issues/8550)）：PR [#8486](https://github.com/zeroclaw-labs/zeroclaw/pull/8486) 已存在并关闭该 issue，只差合并。
- **记忆架构解耦**（[#9048](https://github.com/zeroclaw-labs/zeroclaw/issues/9048)、[#6850](https://github.com/zeroclaw-labs/zeroclaw/issues/6850)）：与 Hindsight PR 栈方向一致，若栈合并，这两个 RFC 大概率作为后续清理项被接受。
- **Schema-Guided Reasoning**（[#6998](https://github.com/zeroclaw-labs/zeroclaw/issues/6998)）：记忆 consolidation 的 JSON 解析脆弱（Markdown 围栏、多余文本、字段缺失），与 Hindsight 栈直接相关。

### 路线图强信号（架构级，risk:high）
- **安全/沙箱**：KeySource 抽象（[#9127](https://github.com/zeroclaw-labs/zeroclaw/issues/9127)）、细粒度沙箱策略（[#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996)）、Wasm-first 插件运行时（[#8135](https://github.com/zeroclaw-labs/zeroclaw/issues/8135)）、WASI 硬件函数（[#8187](https://github.com/zeroclaw-labs/zeroclaw/issues/8187)）、安全 UX（[#6971](https://github.com/zeroclaw-labs/zeroclaw/issues/6971)）
- **互操作**：A2A 出站客户端（[#9106](https://github.com/zeroclaw-labs/zeroclaw/issues/9106)）、wire protocol 一等公民（[#8396](https://github.com/zeroclaw-labs/zeroclaw/issues/8396)）
- **可观测性**：OTel 跨轮次关联（[#8933](https://github.com/zeroclaw-labs/zeroclaw/issues/8933)）、结构化观测增强（[#7232](https://github.com/zeroclaw-labs/zeroclaw/issues/7232)）
- **"Everything is a plugin" 统一目录**（[#6489](https://github.com/zeroclaw-labs/zeroclaw/issues/6489)）：长期架构方向 tracker，把 Integrations 与 Plugins 两个概念合并

### 开发者体验（zerocode 生态）
- 本地预提交门（[#8078](https://github.com/zeroclaw-labs/zeroclaw/issues/8078)）、AI 辅助 PR 预评审（[#9330](https://github.com/zeroclaw-labs/zeroclaw/issues/9330)）、LSP 支持（[#5907](https://github.com/zeroclaw-labs/zeroclaw/issues/5907)）、斜杠命令注册表统一（[#7929](https://github.com/zeroclaw-labs/zeroclaw/issues/7929)）

---

## 7. 用户反馈摘要

从 Issue 评论中提炼的真实用户场景与痛点：

- **记忆系统是最大痛点**：多位用户反映"文档说会话历史与长期记忆分开，但实现仍混在一起"（[#9048](https://github.com/zeroclaw-labs/zeroclaw/issues/9048)）；生命周期策略与存储后端耦合导致每个 gateway/channel 重复实现 consolidation（[#6850](https://github.com/zeroclaw-labs/zeroclaw/issues/6850)）；结构化输出解析脆弱、频繁回退原始摘要（[#6998](https://github.com/zeroclaw-labs/zeroclaw/issues/6998)）。
- **shell 安全控制"过粗"**：用户明确表示"工具级 auto_approve、通配符批准、会话级 always-allow 都太宽泛"（[#7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155)），需要命令粒度的 allow/ask/deny。
- **配置来源混乱**：模型能力、上下文窗口、运行时预算与 UI 显示来自不同数据源；未设置的别名上下文窗口静默回退 32K，"模型明明支持更大，却被截断/误报"（[#7100](https://github.com/zeroclaw-labs/zeroclaw/issues/7100)）。
- **平台特定 Bug 直接影响生产**：Fedora + Landlock 组合下 shell 完全不可用（[#8973](https://github.com/zeroclaw-labs/zeroclaw/issues/8973)）；Dashboard 添加空凭据 channel 导致 supervisor 每 2 秒崩溃重启（[#6724](https://github.com/zeroclaw-labs/zeroclaw/issues/6724)）。
- **流式输出污染端到端链路**：`<eom>` 字面标记进入可见 transcript、持久化历史与下游渠道投递（[PR #9037](https://github.com/zeroclaw-labs/zeroclaw/pull/9037) 对应 issue #9006），说明消息清洗在各出口缺少统一过滤层。
- **集成方诉求明确**：WebSocket-only 协议让 Open WebUI、LobeChat、LangChain、Aider 等标准客户端无法接入（[#8550](https://github.com/zeroclaw-labs/zeroclaw/issues/8550)）；无法主动调用外部 A2A agent 限制跨 agent 协作（[#9106](https://github.com/zeroclaw-labs/zeroclaw/issues/9106)）。

---

## 8. 待处理积压

### ⚠️ 维护者决策积压
官方 RFC 决策队列 tracker [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)（5 评论）持续累积，大量 RFC 挂 `needs-maintainer-review`。以下 RFC 等待维护者接受/拒绝/推迟，部分已悬置超过 2 个月：

| Issue | 标题 | 创建时间 | 状态 |
|---|---|---|---|
| [#5907](https://github.com/zeroclaw-labs/zeroclaw/issues/5907) | Opt-in LSP 支持（ZeroCode） | 2026-04-19 | needs-author-action |
| [#6489](https://github.com/zeroclaw-labs/zeroclaw/issues/6489) | "Everything is a plugin" 统一目录 | 2026-05-06 | needs-maintainer-review |
| [#6850](https://github.com/zeroclaw-labs/zeroclaw/issues/6850) | 记忆生命周期策略与存储解耦 | 2026-05-22 | needs-maintainer-review |
| [#6909](https://github.com/zeroclaw-labs/zeroclaw/issues/6909) | 桌面 computer-use 屏幕交互 | 2026-05-25 | needs-maintainer-review |
| [#6971](https://github.com/zeroclaw-labs/zeroclaw/issues/6971) | 安全 UX / 凭据边界 / 隔离默认值 | 2026-05-27 | needs-maintainer-review |
| [#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996) | 细粒度沙箱（文件系统/网络） | 2026-05-28 | needs-maintainer-review（in-progress） |
| [#6998](https://github.com/zeroclaw-labs/zeroclaw/issues/6998) | Schema-Guided Reasoning | 2026-05-29 | needs-maintainer-review |

### ⚠️ stale-candidate PR（可能被关闭）
- [#7960](https://github.com/zeroclaw-labs/zeroclaw/pull/7960)（2026-06-19，`stale-candidate` + `needs-author-action`）：execute_pipeline 安全修复，属安全类 PR，建议优先处理
- [#8139](https://github.com/zeroclaw-labs/zeroclaw/pull/8139)（2026-06-22，`stale-candidate` + `needs-author-action`）：channel 会话 TTL 清理

### ⚠️ 大型 PR 栈作者响应风险
Hindsight 记忆栈 7 个 PR（[#9063](https://github.com/zeroclaw-labs/zeroclaw/pull/9063)–[#9069](https://github.com/zeroclaw-labs/zeroclaw/pull/9069)）全部标记 `needs-author-action`，已悬置约 2.5 周。建议维护者参考 [#8918](https://github.com/zeroclaw-labs/zeroclaw/pull/8918) 的先例（维护者修复分支 + 作者超时接管），为该栈设置明确的响应时限或接管计划，避免大规模功能推进停滞。

### 📌 观察
ADR 基线恢复 tracker [#8691](https://github.com/zeroclaw-labs/zeroclaw/issues/8691) 仍在进行中（risk:low），建议配合 #8692 一并推进，以缓解"RFC 多、决策记录少"的治理缺口。

---

*报告完 · 数据窗口 2026-07-31 ~ 2026-08-01 · 所有链接指向 zeroclaw-labs/zeroclaw 官方仓库*

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026-08-01

## 1. 今日速览

过去24小时 PicoClaw 社区活跃度中等：共有 **2 条 Issue 更新**（均处于活跃讨论中，0 条关闭）与 **3 条 PR 更新**（均待合并，无新合并）。无新版本发布。项目整体处于 **功能迭代与重构并行推进** 的状态：三条存量 PR 覆盖了 DeltaChat 代码精简、Simplex 新渠道接入和模型 Fallback 链配置，虽均未合并，但三者在 7 月 31 日同天获得更新，说明维护者本周正在集中审阅。Bug 方面，一条关于聊天界面输入框 CPU 占用过高的 Issue 已存在 8 天且被打上 `[stale]` 标记，值得警惕。整体项目健康度 **中等偏上**，但 PR 合并周期偏长的老问题依然存在。

## 2. 版本发布

无新版本发布（2026-08-01）。

---

## 3. 项目进展

今日 **无 PR 被合并或关闭**。但 3 条待合并 PR 均在 7 月 31 日有活跃更新，其中包含重要的功能新增与代码质量提升：

- **[#3222] refactor(deltachat): cleanup implementation, documentation -200LOC** — [`sipeed/picoclaw PR #3222`](https://github.com/sipeed/picoclaw/pull/3222) 作者 **trufae** 创建于 7 月 3 日，昨（7/31）更新。该 PR 大幅清理 DeltaChat 通道实现，删除约 200 行代码：移除遗留特性和回退逻辑、去掉硬编码的 relay 服务器列表改为引用官方站点、废弃密码邮件配置（改为 JSON-RPC 管理密钥）、重命名 `invite_link` 为 `join_invite_link` 并新增 `show_invite_link`。这是 **一次重要的内部结构梳理**，有利于后续维护。
- **[#3200] feat(models): add configurable default fallback chain** — [`sipeed/picoclaw PR #3200`](https://github.com/sipeed/picoclaw/pull/3200) 作者 **lc6464** 创建于 7 月 1 日，昨更新。为 Web UI 增加 **模型默认 Fallback 链配置** 功能：用户可在模型页面设置默认模型、添加备用模型并排序，配置通过后端 API 持久化。直接提升多模型场景的可靠性。
- **[#3193] Added simplex channel type** — [`sipeed/picoclaw PR #3193`](https://github.com/sipeed/picoclaw/pull/3193) 作者 **dim** 创建于 6 月 27 日，昨更新。引入 **Simplex 通道类型**，属于新增渠道接入（非破坏性变更）。

**综合判断**：三条 PR 若合并，项目将同时获得新渠道（Simplex）、新配置能力（Fallback Chain）和内核精简（DeltaChat 清理），可视为一次 **中等规模的能力扩展与代码瘦身**。目前合并进度取决于维护者的审阅速度。

---

## 4. 社区热点

今日评论最活跃的 Issue：

- **[#3287] [Feature] Better support long messages in IRC** — [`sipeed/picoclaw Issue #3287`](https://github.com/sipeed/picoclaw/issues/3287) 作者 **superuser-does**，7 月 22 日创建，昨/今更新，共 **2 条评论**。用户反馈：IRC 默认限制 512 字节且换行符表示新消息，当长消息超过 512 字节时会被 IRC 客户端自动拆分，导致 PicoClaw 无法将这些分片视为同一条完整消息。诉求是：**理解 IRCv3 协议下的长消息自动分片语义，将其合并为单条消息处理**。这个需求触及 IRC 通道的通信完整性，对重度 IRC 用户很关键。

这条 Issue 虽评论数不多，但 **协议层面的设计讨论质量高**，且作者明确提到了 IRCv3，说明用户具备较强的协议知识背景。

---

## 5. Bug 与稳定性

今日唯一活跃 Bug 类 Issue，按严重程度排列：

- **[#3292] [BUG] CPU usage too high when focus on input box in chat interface / 聊天界面输入框在选中时cpu占用高** — [`sipeed/picoclaw Issue #3292`](https://github.com/sipeed/picoclaw/issues/3292) 作者 **Acdfmwaopuio**，7 月 24 日创建，1 条评论，带 `[stale]` 标记。
  - **严重程度**：中高（持续 CPU 占用影响用户体验）。
  - **版本**：PicoClaw 0.3.1，Go 1.26，deepseek-v4-flash 模型，Debian/Linux x64，Firefox Web 端。
  - **状态**：**尚无 Fix PR**。该 Issue 7 月 24 日创建后仅 1 条评论，且已被标记为 stale，存在 **被忽视的风险**。建议维护者尽快调查输入框聚焦时的重渲染逻辑。

---

## 6. 功能请求与路线图信号

结合最新 Issue 与存量 PR，以下功能有望进入下一版本：

| 功能 | 来源 | 状态 | 纳入可能性 |
|------|------|------|------------|
| **IRC 长消息（IRCv3 分片合并）** | [`Issue #3287`](https://github.com/sipeed/picoclaw/issues/3287) | 讨论中 | 中高——IRC 是 PicoClaw 的核心渠道之一，且行为明显有别于本地模型对话 |
| **模型默认 Fallback 链** | [`PR #3200`](https://github.com/sipeed/picoclaw/pull/3200) | 待合并 | 高——PR 已准备就绪，更新频繁，属于 Web UI 与模型编排的直接增强 |
| **Simplex 通道** | [`PR #3193`](https://github.com/sipeed/picoclaw/pull/3193) | 待合并 | 高——新渠道接入，功能完整，已等待约 5 周 |
| **DeltaChat 清理与 Join Invite 链接** | [`PR #3222`](https://github.com/sipeed/picoclaw/pull/3222) | 待合并 | 高——重构型 PR，合并后可降低维护成本 |

从 PR 趋势看，项目当前路线图明显偏向 **多通道支持扩展 + 模型路由灵活性**，这两者也是 AI 助手类项目用户最关心的两个维度。

---

## 7. 用户反馈摘要

从今日更新的 Issue 评论中提炼真实用户声音：

1. **IRC 长消息处理不完整（#3287）**  
   用户核心痛点：**"长消息被 IRC 客户端硬拆分后，PicoClaw 会误判为新消息"**，破坏对话连贯性。揭示了 IRC 通道在实际使用中并非只是被动转发，而需 **感知 IRCv3 协议语义**（如消息 ID 关联、分片标记）。用户参与度高，已跟进讨论一周以上，说明该需求并非一次性提问，而是持续影响其使用的系统性缺陷。

2. **Web 端输入框聚焦导致 CPU 飙升（#3292）**  
   用户现象描述：**"聊天界面输入框在选中时 CPU 占用高"**（英文原文与中文并存）。虽然细节较少（无火焰图、无明显复现步骤），但 0.3.1 版本 + Firefox 环境的组合可作为初步复现依据。用户在 Issue 中同时提供了中英文双语描述，显示其希望降低沟通门槛的意愿。

---

## 8. 待处理积压

以下 Issue/PR 长期未得到回应或合并，需维护者重点关注：

- **[#3193] Added simplex channel type** — [`PR #3193`](https://github.com/sipeed/picoclaw/pull/3193)  
  创建于 **6 月 27 日**，已积压 **35 天**，7 月 31 日有更新但尚未合并。新功能长期搁置有流失贡献者的风险。

- **[#3222] refactor(deltachat): cleanup implementation, documentation -200LOC** — [`PR #3222`](https://github.com/sipeed/picoclaw/pull/3222)  
  创建于 **7 月 3 日**，已积压 **29 天**。该 PR 是纯重构，风险低收益明确，长期不合并会积累大量 merge conflicts，并降低维护者对 DeltaChat 模块的修改信心。

- **[#3292] CPU usage too high when focus on input box** — [`Issue #3292`](https://github.com/sipeed/picoclaw/issues/3292)  
  创建于 7 月 24 日，8 天内无实质推进，且已被 `[stale]` 标记。这属于可感知的性能 bug **，建议维护者优先分配精力，否则会在新版发布后被用户反复提及**。

- **[#3287] Better support long messages in IRC** — [`Issue #3287`](https://github.com/sipeed/picoclaw/issues/3287)  
  非严重积压，但用户已讨论一周且无维护者回应，需明确表态是否纳入路线图。

---

## 📊 项目健康度总结

| 指标 | 状态 |
|------|------|
| 提交活跃度 | ⭐⭐⭐ 中等——PR 有更新但合并停滞 |
| Issue 响应速度 | ⭐⭐ 偏慢——两条活跃 Issue 均无维护者回应 |
| 代码质量趋势 | ⭐⭐⭐⭐ 良好——有主动的代码清理 PR（-200LOC） |
| 社区参与度 | ⭐⭐⭐ 稳定——用户提供详细使用场景与中英双语反馈 |
| 关键风险 | 3 条 PR 积压约 1 个月未合并；bug #3292 有 stale 化风险 |

**结论**：PicoClaw 正处于功能扩张期，Simplex/Fallback Chain 等新能力在等待合并，但维护者需尽快处理 5-35 天的积压 PR/Issue，避免贡献者流失与 stale 问题扩大。建议优先响应 #3292 性能 Bug 与 #3287 IRC 分片需求，这是当前社区呼声最高的两个方向。

---
*本报告生成时间：2026-08-01 00:00 UTC+8，数据来源：[github.com/sipeed/picoclaw](https://github.com/sipeed/picoclaw)*

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 — 2026-08-01

---

## 1. 今日速览

过去 24 小时 NanoClaw 项目活跃度较高：共产生 8 条 Issue 更新和 10 条 PR 更新，其中 4 个 PR 已合并/关闭，6 个仍待合并。社区讨论集中在容器运行时灵活性和宿主集成的核心矛盾上——既有 #1732 提出绕过 Docker 的原生运行模式，也有 #2354 请求 Kubernetes 作为容器运行时，反映出用户对部署形态多样化的强烈需求。安全与稳定性方面，#3162 高优先级 Bug（Telegram 配对静默失效）和 #2923 安全加固问题受到关注，且均有对应的修复 PR 在进行中。项目整体处于功能扩展与安全加固并行的活跃阶段，无新版本发布，但发布路径修复 PR（#3163）已合并，表明维护者正在保障下一个版本的交付通道。

---

## 2. 版本发布

**今日无新版本发布。** 最新 Release 为空，建议关注 PR #3163（修复 v2.1.54 发布路径）的合并后续，该 PR 已关闭，可能为下一个版本的顺利发布铺平道路。

---

## 3. 项目进展

### 今日合并/关闭的 PR（4 个）

**发布工程**
- **[#3163] fix(release): restore the v2.1.54 release path**（作者：glifocat，已关闭）— 修复 v2.1.54 版本发布路径，属于 core-team 提交，直接保障了版本交付通道的可用性。
  链接：https://github.com/nanocoai/nanoclaw/pull/3163

**功能与集成**
- **[#3076] feat(imessage): unified local+hosted adapter targeting spectrum-ts v11**（作者：invisicat，已关闭）— 统一 iMessage 本地+托管适配器，目标升级到 spectrum-ts v11 版本。这是一个 Feature Skill 级别的 PR，推进了 iMessage 渠道的整合能力，且与 #3164（Hosted iMessage）形成接力。
  链接：https://github.com/nanocoai/nanoclaw/pull/3076

**文档与技能**
- **[#1678] docs(skills): update voice transcription skills for Telegram + Linux**（作者：Saxin，已关闭）— 更新语音转写技能文档，扩展 `use-local-whisper` 从仅支持 WhatsApp 到支持 Telegram 和 Linux 环境，提升了技能的跨平台可用性。
  链接：https://github.com/nanocoai/nanoclaw/pull/1678

**工具链**
- **[#3165] Codex/copilot changes**（作者：soren5，已关闭）— 标注为遵循贡献指南的变更，虽无详细描述，但已关闭，可能为工具链或开发流程的辅助性调整。
  链接：https://github.com/nanocoai/nanoclaw/pull/3165

**整体判断：** 今日合并的 PR 以渠道集成和发布工程为主，项目在 iMessage 适配和版本流程两个方向都有明确进展。同时 #3076 的关闭与 #3164（Hosted iMessage 注册流程）的提出之间可能存在分支演进关系，需关注项目是否正将 iMessage 支持推进到托管模式。

---

## 4. 社区热点

### 讨论最活跃的 Issues

**#1184 — 受限 K8s 环境中部署 NanoClaw 的挑战**
- 作者：JachinShen | 评论：3 | 👍：1 | 创建：2026-03-17 | 最后更新：2026-07-31
- 用户对 NanoClaw 的极简和安全设计表示认可，但在生产环境（尤其是 Sealos 这类受限 K8s 环境）部署时遇到阻碍。评论数最多，说明部署灵活性问题在社区中有共鸣。
  链接：https://github.com/nanocoai/nanoclaw/issues/1184

**#1732 — 原生运行模式：绕过 Docker 以访问宿主工具**
- 作者：stevengonsalvez | 评论：3 | 创建：2026-04-10 | 最后更新：2026-07-31
- 这是今日社区讨论最深入的功能请求。用户详细列举了容器隔离对"宿主集成"类用例（tmux 编程会话、有头浏览器、macOS API）造成的阻塞，认为目前除了挂载整个宿主文件系统外没有变通方案。虽然 👍 数并不高，但 3 条评论和详尽的问题陈述表明这是一个被认真讨论的方向。
  链接：https://github.com/nanocoai/nanoclaw/issues/1732

**#2588 — skill/apple-container 分支与主线严重不同步**
- 作者：snymanpaul | 评论：1 | 创建：2026-05-22
- 该 Issue 指出 `skill/apple-container` 分支引用了主线上已不存在的 API，且假设了 Node+tsc 运行时，而主线已迁移到 bun。这直接导致 `/convert-to-apple-container` 技能无法使用，涉及 macOS 用户的核心使用路径，社区关注度高。
  链接：https://github.com/nanocoai/nanoclaw/issues/2588

**诉求分析：** 社区热点呈现出"部署形态灵活性"与"Apple 容器生态支持"两个核心诉求。前者反映了容器隔离的安全优势与宿主集成需求之间的矛盾，后者则说明随着 NanoClaw 用户群扩展到 macOS，Apple Container 的适配成了关键痛点。

---

## 5. Bug 与稳定性

### 按严重程度排列

**🔴 高优先级**
- **[#3162] Telegram 配对在启动时 getMe 失败后整个进程生命周期内静默失效**（作者：glifocat，创建：2026-07-31，评论：0）
  一次启动时的 HTTP 调用失败就能永久锁定用户的配对能力，且无任何提示。已验证于 `channels` 分支 6ee516ad。这是今日新报告的 Bug，尚无明确的 fix PR 关联。
  链接：https://github.com/nanocoai/nanoclaw/issues/3162

**🟠 安全相关**
- **[#2923] ask_user_question 卡片可被伪造点击篡改显示内容**（作者：glifocat，创建：2026-07-04，评论：0）
  伪造的按钮点击可在响应被正确拒绝的情况下，仍然覆盖卡片显示的文本，构成显示/完整性欺骗。虽然不影响代理的响应结果，但属于安全加固范畴。已有对应修复 PR：#2651。
  链接：https://github.com/nanocoai/nanoclaw/issues/2923

**🟡 中等问题**
- **[#2589] Apple Container 中 host.docker.internal 在 OneCLI 代理 URL 中无法解析**（作者：snymanpaul，创建：2026-05-22，评论：1）
  Apple Container 不自动解析 `host.docker.internal` 且不支持 `--add-host`，导致通过 `/convert-to-apple-container` 技能启动的代理容器内网关 URL 失效。已有一个月未更新，建议确认是否在 #2809 的 Apple Container 运行时 PR 中覆盖。
  链接：https://github.com/nanocoai/nanoclaw/issues/2589

### 有修复 PR 的 Bug
- **#2923** → 对应 PR **[#2651] fix(interactive): validate pending question response origin**（作者：Hinotoi-agent，Open）— 该 PR 通过携带回调确认的 `platformId` 和 `threadId`，确保待处理问题只能从原渠道目标回答。目前仍然开放中。
  链接：https://github.com/nanocoai/nanoclaw/pull/2651

---

## 6. 功能请求与路线图信号

### 新功能/增强需求

**#1732 — native runner mode（绕过 Docker 访问宿主工具）**
- 提出时间较早（2026-04-10）但持续活跃，目标是为 tmux 编程、有头浏览器、macOS API 等场景提供直接宿主集成能力，是容器隔离架构的一个重大补全。
  链接：https://github.com/nanocoai/nanoclaw/issues/1732

**#2354 — Kubernetes 容器运行时**
- 用户希望在已有 K8s 集群上以 Pod 方式生成代理容器，而非依赖本地 Docker。目前 `container-runtime.ts` 硬编码了 `docker`。这个需求与 #1184（受限 K8s 部署）互补，反映出企业级用户对部署形态的诉求。
  链接：https://github.com/nanocoai/nanoclaw/issues/2354

**#1225 — 无 Docker 运行**
- 作者希望在没有 Docker 的 Windows 和 Linux 机器上运行 NanoClaw。提出于 3 月，虽然评论不多，但与 #1732 和 #2354 共同指向"容器依赖"这一核心痛点。
  链接：https://github.com/nanocoai/nanoclaw/issues/1225

**#2588 — 同步 skill/apple-container 分支到主线**
- 该 Issue 虽然表现为 Bug，但本质上是让 Apple Container 支持跟上主线演进（bun 运行时、新 API），是 macOS 用户基础功能请求的前置问题。
  链接：https://github.com/nanocoai/nanoclaw/issues/2588

### 可能被纳入下一版本的方向

- **Apple Container 运行时**：PR #2809 已在 6 月 18 日提出，且 #2588、#2589 两个 Issue 都围绕 Apple Container 展开，该 PR 的推进值得关注。若合并，将同时解决功能可用性和 host.docker.internal 解析问题。
  链接：https://github.com/nanocoai/nanoclaw/pull/2809

- **iMessage 托管模式（Photon）**：PR #3164（Hosted iMessage）在 #3076 合并后迅速提出，明确"supersede #2999 with a working registration flow"，表明维护团队正积极推动 iMessage 渠道的托管注册能力。
  链接：https://github.com/nanocoai/nanoclaw/pull/3164

- **安全日志脱敏**：PR #3161 正在修复结构化日志中凭据明文写入的问题，属于安全底线加固，大概率会在下一个补丁版本中合入。
  链接：https://github.com/nanocoai/nanoclaw/pull/3161

---

## 7. 用户反馈摘要

**部署痛点**
- JachinShen（#1184）在受限 K8s 环境（Sealos）中部署遇到挑战，虽然赞赏 NanoClaw 的极简/安全设计，但生产部署的实际门槛偏高。这体现了一个核心矛盾：轻量极简的架构在标准 Docker 环境中体验优秀，但在企业既有基础设施中反而缺少适配层。
  链接：https://github.com/nanocoai/nanoclaw/issues/1184

**宿主集成需求**
- stevengonsalvez（#1732）指出容器隔离是安全优势，但对 tmux 编程、有头浏览器、macOS API 等场景成为 "hard blocker"。用户对当前"只能挂载整个宿主文件系统"的变通方案不满意，需要更精细的宿主工具访问机制。
  链接：https://github.com/nanocoai/nanoclaw/issues/1732

**Apple 生态支持缺口**
- snymanpaul（#2588）在验证 `/convert-to-apple-container` 技能时发现分支已严重落后于主线（API 不存在、运行时假设过时），导致该技能开箱即失败。这说明 Apple Container 相关能力目前停留在"实验性"状态，与主线演进脱节。
  链接：https://github.com/nanocoai/nanoclaw/issues/2588

**积极评价**
- JachinShen（#1184）明确表示"appreciate the minimalist approach"和"lightweight, secure alternative to the more bloated agent frameworks"，认为用现有代码代理构建精简的"Claw"是 "brilliant" 的设计。这类正面反馈说明 NanoClaw 的极简定位在社区中获得了品牌认知度。

---

## 8. 待处理积压

### 长期未响应的 Issues

- **[#1225] Run it without docker**（创建于 2026-03-18，最后更新 2026-07-31）
  已存在超过 4 个月，仅 2 条评论，无 core-team 回应。这是需求明确但被长期搁置的问题，与 #1732 和 #2354 一起构成了"去 Docker 依赖"三连问。
  链接：https://github.com/nanocoai/nanoclaw/issues/1225

- **[#1732] native runner mode**（创建于 2026-04-10，最后更新 2026-07-31）
  提出近 4 个月，3 条评论，无维护者明确表态。考虑到这是架构层面的变更，可能需要 roadmap 层面的决策。
  链接：https://github.com/nanocoai/nanoclaw/issues/1732

- **[#2588] skill/apple-container 分支不同步**（创建于 2026-05-22，最后更新 2026-07-31）
  已 2 个月未更新，影响 macOS 用户的 Apple Container 使用路径。PR #2809 可能覆盖此问题，但 PR 也已有近 1.5 个月未合并。
  链接：https://github.com/nanocoai/nanoclaw/issues/2588

### 待合并的重要 PR

- **[#2809] feat(apple-container): Apple Container runtime + remote OneCLI gateway**（创建于 2026-06-18，Open）
  这是 Apple Container 支持的核心 PR，与 #2588、#2589 两个 Issue 直接相关。1.5 个月未合并，建议维护团队评估其状态。
  链接：https://github.com/nanocoai/nanoclaw/pull/2809

- **[#2651] fix(interactive): validate pending question response origin**（创建于 2026-05-30，Open）
  安全修复类 PR，对应 #2923 的安全问题，已存在 2 个月未合并。安全修复建议优先处理。
  链接：https://github.com/nanocoai/nanoclaw/pull/2651

- **[#3041] feat(channels): add Dial channel adapter (SMS + AI voice calls)**（创建于 2026-07-14，Open）
  新渠道适配器（Dial，支持 SMS 和 AI 语音通话），2 周 + 未合入，尚在正常审查周期内。
  链接：https://github.com/nanocoai/nanoclaw/pull/3041

---

**项目健康度总结：** NanoClaw 处于功能扩展活跃、安全加固同步推进的健康状态。社区对部署灵活性的需求持续增长（无 Docker / K8s / Apple Container / 原生模式），但多个相关 PR 和 Issue 停留时间较长，需要维护团队给出明确的方向性决策。安全方面 #2651 的安全修复等待合并时间过长，建议优先推进。发布工程已修复（#3163），预计下一个版本（v2.1.54+）的发布通道将恢复顺畅。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw 项目动态日报 — 2026-08-01

## 1. 今日速览

过去24小时内，NullClaw 项目 Issue 活动为零（无新开、无关闭），PR 方面有 1 条待合并更新（#981），无新版本发布。整体活跃度处于低位，但存在一项有实质意义的待合并 PR——新增 `grok-cli` provider，表明项目仍在扩展 AI 提供商支持面。该项目当前处于"低摩擦、高确定性"的推进阶段：无紧急 Bug 报告、无社区争议，但长期来看 Issue 与 PR 的响应速度需要关注。

---

## 2. 版本发布

无新版本发布。

---

## 3. 项目进展

今日无 PR 被合并或关闭，因此没有功能完成落地。但值得关注的是待合并的 **PR #981**，它为项目带来了新的方向性进展：

- **[#981] feat(provider): add grok-cli provider for xAI Grok CLI**
  - 作者：valonmulolli
  - 状态：OPEN（2026-07-29 创建，最后更新 2026-07-31）
  - 链接：https://github.com/nullclaw/nullclaw/pull/981

该 PR 新增了一个基于 CLI 的 provider，委托本地 `grok` CLI 执行请求，完全复用现有 `codex-cli` / `gemini-cli` / `claude-cli` 的 spawn-per-request 模式，且被设计为可选 provider（需要用户自行安装并认证 `grok` CLI）。该 PR 将 NullClaw 的 provider 生态进一步扩展至 xAI 阵营，若被合并，项目将支持 4 种本地 CLI 后端，增强了在不同 AI 服务间的可迁移性与用户选择自由度。

---

## 4. 社区热点

今日评论与互动数据均为零，唯一活跃条目为 **PR #981**（https://github.com/nullclaw/nullclaw/pull/981）。虽然是新提交且未引发大量讨论，但其存在本身反映了社区的潜在诉求：

- 用户希望将 xAI Grok 纳入 NullClaw 支持范围，且倾向通过本地 CLI 方式集成（而非 API Key 直连），强调了**隐私与本地执行**的偏好。
- 该 PR 的提交时间（2026-07-29）与最后更新（2026-07-31）表明作者在持续维护，但维护者尚未介入评审，需注意响应时效。

---

## 5. Bug 与稳定性

今日无新报告的 Bug、崩溃或回归问题。项目当前稳定性状态良好，无已知的急性问题需要处理。

---

## 6. 功能请求与路线图信号

尽管今日无新 Issue，但 **PR #981** 是一个明确的功能请求信号——为 xAI Grok CLI 提供一等公民支持。结合项目现有的 `codex-cli`、`gemini-cli`、`claude-cli` provider，可以合理推断：

- NullClaw 有意构建一个**插件式本地 CLI provider 体系**，对各家 AI 厂商保持中立、可插拔的架构。
- 社区对新 provider 的贡献方式是 **实现 + 复用现有模式**，这降低了后续新增 provider（如 `ollama`、`llama.cpp` 等）的门槛。
- 如果该项目维护者保持当前的开放态度，下一版本（或后续小版本）极有可能合并该 PR，并随之更新文档中的 provider 列表。

---

## 7. 用户反馈摘要

今日无 Issue 评论可供分析。从 PR #981 的描述中可以间接捕捉到用户侧的需求特征：

- **痛点**：现有 provider 未覆盖 xAI Grok 用户的人群，需要手动配置或等待官方支持。
- **使用偏好**：用户倾向于通过命令行工具（CLI）与 AI 后端交互，而非直接使用 API SDK——这通常意味偏好轻量、可脚本化、可审计的本地工作流。
- **满意度信号**：新增 provider 遵循既有模式，说明现有实现方式（spawn-per-request）已被社区认可，成为事实上的集成标准。

---

## 8. 待处理积压

当前积压项极少，仅有一项需要关注：

- **PR #981**（https://github.com/nullclaw/nullclaw/pull/981）：已待评审 3 天（7/29 创建，至今未合并、未评论）。建议维护者尽快进行代码审查，确认是否合入或提出修改意见，以保持社区贡献者的积极性。

---

**综合健康度评估**：项目当前无严重问题，但活跃度偏低。核心风险在于 PR 评审周期与 Issue 响应速度是否会成为社区贡献的瓶颈。建议维护者在未来 48 小时内对 #981 做出明确响应。

*数据来源：[github.com/nullclaw/nullclaw](https://github.com/nullclaw/nullclaw)*

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-08-01

## 1. 今日速览

过去 24 小时项目处于高活跃状态：共 36 条 Issue 更新（新增/活跃 29 条、关闭 7 条），50 条 PR 更新（待合并 21 条、已合并/关闭 29 条），无新版本发布。核心里程碑是目标架构（Target Architecture）WS1 波次的契约抽取重构（WS1.1–WS1.4）相继完成合并，`ironclaw_loop/extension/product_contracts` 三个中性契约层正式落地，依赖边界显著理顺。与此同时，pi-harness 采纳计划集中提交了一批 P0/P1 的提示缓存与 token 计费优化 Issue（#6984–#6990），预示下一阶段性能优化重点。安全方面，#6900 跨用户内存泄漏、#6866 共享 home 目录、#6778 Hosted-MCP 元数据暴露等隐私类缺陷在本日数据中尤为突出，值得优先处理。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日最重大的进展是 **WS1 契约抽取重构波次的批量落地**，目标架构从设计走向可执行：

- **WS1.1** #6967（已合并）：完成 host_api 的 turn 词汇表，退役 turns shims。
  https://github.com/nearai/ironclaw/pull/6967

- **WS1.2** #6975（已合并）：抽取 `ironclaw_loop_contracts`，将 `agent_loop` 切换到该契约层。
  https://github.com/nearai/ironclaw/pull/6975

- **WS1.3** #6977（已合并）：抽取 `ironclaw_extension_contracts`，关闭双重导入路径。
  https://github.com/nearai/ironclaw/pull/6977

- **WS1.4** #6980（已合并）：抽取 `ironclaw_product_contracts`，并落地 WS1.3 所依赖的 ChannelAdapter 适配器。
  https://github.com/nearai/ironclaw/pull/6980

- **WS1.5–WS1.7** #6981、#6982（待合并，XL 级）：将协议证据铸造收口至 witness grants（安全敏感，PROPOSAL §12.1a）、`ironclaw_common` 瘦身并消除 product→runner 单符号边。两个 PR 均发现原方案多条条款与代码现状不符（WS1.6 六条中五条、WS1.7 两条均偏离），说明实际代码比规划更复杂，合并值得期待。
  https://github.com/nearai/ironclaw/pull/6981
  https://github.com/nearai/ironclaw/pull/6982

WebUI 修复与功能：

- #6908（已合并）：管理端用户列表分页，修复 #6903 中超过 100 用户无法加载后续页的问题。
  https://github.com/nearai/ironclaw/pull/6908

- #6906（待合并，L 级）：Projects 页面移除捏造的 spend/gate/failure/thread/activity/health 指标，仅渲染 API 真实数据。
  https://github.com/nearai/ironclaw/pull/6906

扩展与工具链：

- #6930（已合并，15000+ 行）：托管 MCP 服务器注册，打通扩展安装、激活、调用、停用全生命周期。
  https://github.com/nearai/ironclaw/pull/6930

- #6979（已合并）：目标架构文档与 #6930 对齐（纯文档，5 个 markdown 文件 +27/−11）。
  https://github.com/nearai/ironclaw/pull/6979

- #4022（已合并）：HTTP 响应错误恢复为"模型可见、可恢复"的工具错误，修复 #4014 引入的运行终止回归。
  https://github.com/nearai/ironclaw/pull/4022

- #3942（已合并）：PilotAllowlist 从字符串匹配改为 serde 驱动的枚举，落实 #3738 合并时遗留的评审意见。
  https://github.com/nearai/ironclaw/pull/3942

整体来看，WS1 波次完成后，核心运行时与宿主 API 的依赖边界大幅理顺，架构债清理进入实质性收获阶段；WebUI 侧"只展示真实数据"的修复方向也体现了对用户信任的重视。

## 4. 社区热点

- **[Issue #6284] error-recoverability endgame（15 评论）**：今日讨论热度最高。该 epic 要求每次运行中错误必须满足可恢复契约（运行存活、模型可见、携带原因与成功条件、模型获得行动回合、不报告非成功为成功）。这反映了社区对 Agent 运行可靠性的核心诉求——模型不仅要"看到"错误，还要能真正"处理"错误。
  https://github.com/nearai/ironclaw/issues/6284

- **[Issue #6963] Path-keyed CI 门禁（5 评论）**：#6946（WS10）未重写的 8 个 CI/dev 门禁追踪，全部硬编码扁平 `crates/ironclaw_*` 目录结构，需改为路径键控。这是架构重构与 CI 基建错位的典型技术债，由 PR 评审意见升级为独立追踪项。
  https://github.com/nearai/ironclaw/issues/6963

- **[Issue #6524] Hermetic 能力与旅程测试平台 epic（4 评论）**：讨论如何机械化回答"每个受支持能力与关键用户旅程是否有确定性覆盖"，涉及录制 fixture 与 Emulate 工作的延伸。
  https://github.com/nearai/ironclaw/issues/6524

## 5. Bug 与稳定性

按严重程度排列：

**P0 / 安全**

- **#6900 跨用户内存泄漏**：共享频道默认主体绑定将所有用户折叠进操作者的内存命名空间，内存读写必须按真实用户隔离，否则应 fail-closed。suggested_P0、security、p0 三重标记，暂无 fix PR。
  https://github.com/nearai/ironclaw/issues/6900

- **pi-harness 缓存破坏组（P0 #1–#4）**：#6984 需显式 Anthropic `cache_control` 断点（当前仅单根节点注入）；#6985 提示词前缀因 nudges/时间戳/每次运行的记忆检索而持续变异，导致整个缓存前缀失效；#6986 工具数组在运行中被子集提升（`PromotedSet`）变更，破坏字节一致性；#6987 要求以回归测试钉死前缀不变性。四者共同指向"提示缓存几乎从未命中"的性能根源。
  https://github.com/nearai/ironclaw/issues/6984
  https://github.com/nearai/ironclaw/issues/6985
  https://github.com/nearai/ironclaw/issues/6986
  https://github.com/nearai/ironclaw/issues/6987

- **#6866 共享 home 目录**：所有用户可见彼此工作区，p2 隐私缺陷，0 评论、无维护者响应。
  https://github.com/nearai/ironclaw/issues/6866

- **#6778 Hosted-MCP 跨用户元数据暴露**：工具目录按扩展 ID 而非安装实例发布，多主体服务器上存在跨用户元数据泄漏。
  https://github.com/nearai/ironclaw/issues/6778

**P1**

- **PR #6973 Postgres API 容量回归修复**：托管单租户 Postgres 容量门禁从 p95 3.74s / 6.86 ops/s 恶化至 12.0s / 2.57 ops/s（`send_message` p95 275ms→4.78s），根因是 #6696 行式进程日志；PR #6973 已提交待合并。
  https://github.com/nearai/ironclaw/pull/6973

- **#6974 libSQL 写入病理**：自 #6696 后工具密集压力场景 p95 达 37–135s，从 #6973 拆分出的独立追踪项。
  https://github.com/nearai/ironclaw/issues/6974

- **#6989 token 计费 Bug**：`ModelWorkRequest::for_assistant` 从 `content_ref` 字符串的长度估算输入 token，而非被引用内容的实际长度；同时需要混合 provider 用量 + 尾部估算。
  https://github.com/nearai/ironclaw/issues/6989

- **#6988 压缩预算硬编码**：compaction 触发阈值写死 128k−20k=108k，未按实际模型窗口推导。
  https://github.com/nearai/ironclaw/issues/6988

- **#6990 压缩推理污染缓存**：一次性摘要推理共享 prompt 前缀，需确保不破坏缓存与会话亲和性。
  https://github.com/nearai/ironclaw/issues/6990

**P2**

- **#6940 IronHub skill CTA 全量 404**（2 评论），无 fix PR。
  https://github.com/nearai/ironclaw/issues/6940

- **#6972 新账户邮箱认证不可用**，用户无法登录。
  https://github.com/nearai/ironclaw/issues/6972

- **#6903 管理端用户列表分页失效** —— ✅ 已由 #6908 修复并合并。
  https://github.com/nearai/ironclaw/issues/6903

- **#6902 Projects 页面展示捏造指标** —— ✅ fix PR #6906 待合并。
  https://github.com/nearai/ironclaw/issues/6902

**CI / 工具链缺陷**

- **#6978** reborn-tests.yml 的 `workflow_dispatch` 运行结构性失败：critical-mutation 被跳过但又被禁止跳过，导致零真实失败仍显示红（已从运行 30665278857 证明链路）。
  https://github.com/nearai/ironclaw/issues/6978

- **#6947** `classify-test-scope.sh` 的 glob 早于 product-crate 合并，导致 `ironclaw_product` 被误分桶为 legacy-only。
  https://github.com/nearai/ironclaw/issues/6947

- **PR #6992**（待合并）：`discover-reborn-package-crates.sh` 的 `comm` 排序在 UTF-8 collation 下将 `ironclaw_events` 排在 `ironclaw_event_streams` 之后（与 C locale 相反），导致 `comm` 报错；修复为 `LC_ALL=C`。
  https://github.com/nearai/ironclaw/pull/6992

## 6. 功能请求与路线图信号

- **pi-harness 采纳计划成为明确路线图**：PR #6991（XS，待合并）新增 `docs/research/pi-agent-deep-dive.md` 深度分析，引用了 Databricks、nqawhc、openbench、Portkey 等最新同模型基准，Pi 在成本与 token 利用率上排名最佳/接近最佳。配套的 #6984–#6990 已按 P0/P1 排期，说明"提示缓存命中率 + token 计费准确性"是下一版本的确定性优化主题。
  https://github.com/nearai/ironclaw/pull/6991

- **技能生态优先级上升**：#6941 新 epic（#6565 的子集）——"模型可发现、可选择、可使用的技能，且自建技能真正产生回报"，21 条验收标准，完全可度量，并将 #6638、#4428、#5581、#4543 等他人工作排除在外。信号：技能功能正从"能用"走向"可度量地好用"。
  https://github.com/nearai/ironclaw/issues/6941

- **遗留迁移工具**：#6939 用户提出将 Hermes/Openclaw 的配置与内存迁移到 IronClaw 的 Feature 请求，若纳入路线图将直接降低切换成本、扩大潜在用户转化。
  https://github.com/nearai/ironclaw/issues/6939

- **CLI 易用性**：#6983 建议为 `ironhub` 子命令添加 `hub` 别名（当前仅有 `iron-hub`），提升文档与仪表盘兼容性。
  https://github.com/nearai/ironclaw/issues/6983

- **架构后续波次**：#6920（已关闭）确立目标架构基线、前置清理与异常棘轮；#6921（开放）继续追踪中性契约抽取与证据铸造收口——与 WS1 系列 PR 形成呼应，本轮重构尚有 WS1.5–1.7 待合并。
  https://github.com/nearai/ironclaw/issues/6921

## 7. 用户反馈摘要

- **品牌一致性困惑**：#6854 用户发现扩展页描述仍使用 "Reborn" 品牌，与对外 "Ironclaw 1.0" 宣传不一致；#6971 用户对 "Tools" vs "Extensions" 术语混淆，并追问工具/频道作为扩展类型的模型是否延续。
  https://github.com/nearai/ironclaw/issues/6854
  https://github.com/nearai/ironclaw/issues/6971

- **隐私明确担忧**：#6866 用户 tobias.holenstein 直指"所有用户共享同一 home 目录、工作区互相可见"是隐私问题，要求按用户隔离。
  https://github.com/nearai/ironclaw/issues/6866

- **新用户 onboarding 受阻**：#6972 新账户邮箱认证失败，用户无法进入产品；#6940 IronHub CTA 全量 404，用户"不确定该找谁反馈"。两例都直接损害第一印象。
  https://github.com/nearai/ironclaw/issues/6972
  https://github.com/nearai/ironclaw/issues/6940

- **迁移成本阻碍采纳**：#6939 用户明确表示"老用户不愿从 clean slate 重新开始"，若无迁移工具可能不会切换到 IronClaw。
  https://github.com/nearai/ironclaw/issues/6939

- **数据可信度受损**：#6902 用户发现 Projects 页面展示的 `$0.00 spend`、`0 pending gates`、`0 failures` 并非后端数据，属于误导性虚构指标。
  https://github.com/nearai/ironclaw/issues/6902

- **无人值守部署痛点**：#6976 用户 kmjayadeep 在 Debian VM 上发现 `ironclaw service install` 未启用 user lingering，无头服务器/虚拟机无法可靠常驻。
  https://github.com/nearai/ironclaw/issues/6976

## 8. 待处理积压

- **#6284 error-recoverability endgame（2026-07-19 创建，15 评论）**：社区热度最高但两周未关闭的 epic，建议维护者明确阶段性验收节奏，避免大 epic 长期悬置。
  https://github.com/nearai/ironclaw/issues/6284

- **PR #5981 与 #5982（2026-07-11 创建，相互依赖，XL 级）**：queued-message steering 与预算审批门禁两个功能 PR 已存在三周，虽持续更新但仍未合入；长时间开放存在大 diff 漂移与冲突累积风险，建议推进评审或拆分。
  https://github.com/nearai/ironclaw/pull/5981
  https://github.com/nearai/ironclaw/pull/5982

- **PR #5598 chore: release（2026-07-03 创建）**：release bot 发起近一个月，包含 `ironclaw_common` 0.4.2→0.5.0 与 `ironclaw_skills` 0.3.0→0.4.0 两个 breaking changes，可能被 WS1 重构阻塞，建议确认发布窗口。
  https://github.com/nearai/ironclaw/pull/5598

- **#6778 Hosted-MCP 跨用户元数据暴露（2026-07-28 创建，仅 1 评论）**：安全相关问题关注度不足，但性质与 #6900 同属"跨用户隔离"缺陷，建议合并提级评审。
  https://github.com/nearai/ironclaw/issues/6778

- **#6866 共享 home 目录隐私问题（2026-07-29 创建，0 评论）**：实名用户反馈，无维护者响应，属"已报告但未认领"状态，建议至少打上 triage 标记。
  https://github.com/nearai/ironclaw/issues/6866

- **#6524 与 #6578 两个大型 epic（7 月 22–23 日创建）**：Hermetic 测试平台与 Admin-Managed Agents 均停留在低评论状态，长期无排期信号，建议补充路线图承诺或明确搁置理由。
  https://github.com/nearai/ironclaw/issues/6524
  https://github.com/nearai/ironclaw/issues/6578

---

**项目健康度小结**：WS1 重构波次高效落地说明架构治理在执行层面运转良好；但 P0 级跨用户隔离缺陷（#6900、#6778、#6866）与提示缓存整体失效问题（#6984–#6987）同时存在，前者关乎信任底线、后者关乎成本竞争力，建议在下一迭代优先分配人力。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-08-01

> 数据窗口：2026-07-31 至 2026-08-01 | 数据源：github.com/netease-youdao/LobsterAI

---

## 1. 今日速览

项目过去 24 小时处于**清理与稳定性收尾期**：4 条 4 月遗留的 stale issue 全部关闭，12 条 PR 中有 11 条合并/关闭、仅 1 条待合并。核心动作集中在 **OpenClaw 稳定性修复**（3 条 PR 均针对 DeepSeek 长会话缓存命中率与工具协议泄漏）与 **Renderer 端 UX 增强合入**（侧边栏拖拽、快捷键提示、骨架屏）。随着 #2416 Release/2026.7.31 合并，本批功能预计随 2026.7.31 版本发布。整体活跃度中等偏高，项目健康度良好，技术债清理节奏正常。

---

## 2. 版本发布

今日无新版本发布。但合并了 `#2416 Release/2026.7.31`，表明 7 月 31 日发布流程已经走完，本批功能与修复将在该版本中交付。若需确认具体版本号与发布说明，建议关注 Release 页面后续更新。

---

## 3. 项目进展

今日 11 条 PR 合并/关闭，按主题可分为三类：

### 3.1 OpenClaw 稳定性修复（重点）

- **[#2413] fix(openclaw): keep live prompt tool-result history byte-stable across turns**
  修复实时 prompt 投影中，每次请求重新应用 4x 聚合字符上限导致已缓存历史被重写的问题。合并后未变化的历史保持字节稳定，作为稳定前缀供缓存复用。由 `fisherdaddy` 提交。
  https://github.com/netease-youdao/LobsterAI/pull/2413

- **[#2415] fix(openclaw): drop aggregate cap in live tool-result prompt projection**
  承接 #2413，进一步移除实时 prompt 组装中的聚合上限，彻底解决 DeepSeek 长会话命中率从 ~100% 暴跌至 ~57% 的问题。由 `fisherdaddy` 提交。
  https://github.com/netease-youdao/LobsterAI/pull/2415

- **[#2414] fix(cowork): prevent BTW tool protocol leakage**
  对侧聊（side-chat）结果中的工具调用标记进行清洗；当侧问题需要工具时返回稳定的引导文案；同时保留通过 OpenClaw 网关传递的错误元数据。由 `liuzhq1986` 提交。
  https://github.com/netease-youdao/LobsterAI/pull/2414

**项目进展评估**：这三条 PR 直接提升了 DeepSeek 长会话场景的稳定性和成本效率（缓存命中率翻倍），属于对生产环境影响较大的修复。

### 3.2 Renderer UX 增强合入

- **[#1315] 功能增强：支持拖拽调整侧边栏宽度**
  实现 180~480px 范围的拖拽调宽，带 `col-resize` 光标与全局鼠标事件清理。对应 issue #1314。
  https://github.com/netease-youdao/LobsterAI/pull/1315

- **[#1318] 功能增强：侧边栏按钮显示键盘快捷键 kbd 提示**
  新增 `formatShortcutLabels()`，按平台显示 ⌘/Ctrl 等符号，在按钮右侧以 `<kbd>` 徽标展示。对应 issue #1317。
  https://github.com/netease-youdao/LobsterAI/pull/1318

- **[#1320] 功能增强：会话列表添加骨架屏加载状态**
  新增 `sessionsLoaded` 标志位，区分"加载中"与"空状态"，消除启动时空状态闪烁。对应 issue #1319。
  https://github.com/netease-youdao/LobsterAI/pull/1320

- **[#1321] fix(settings): dismiss overlays when switching settings tabs**
  修复设置页切换选项卡时，记忆编辑器/模型连接测试弹层残留为全窗口遮罩导致界面看似只读的问题。
  https://github.com/netease-youdao/LobsterAI/pull/1321

- **[#2417] fix(sites): add copy success feedback**
  为站点 URL 与分享码复用会话复制的图标和交互，增加复制成功反馈。
  https://github.com/netease-youdao/LobsterAI/pull/2417

### 3.3 陈旧 PR 清理

- **[#172] feat(oauth): add Antigravity OAuth integration and proxy compatibility** — 4 月初提出后长期未合并，今日以 stale 关闭。
  https://github.com/netease-youdao/LobsterAI/pull/172
- **[#1308] feat(cowork): isolate home-screen input draft per agent** — 同样以 stale 状态关闭。
  https://github.com/netease-youdao/LobsterAI/pull/1308

**项目进展评价**：项目在稳定性和可用性上双向推进，一批 4 月提出的 UX 需求在 7 月底获得实现并合入。维护者对过期 PR 的清理动作也较为及时。

---

## 4. 社区热点

今日无新增 issue，讨论热点集中在 4 条被关闭的 stale issue 上（各有 2 条评论）：

- **[#1311] 表格内容换行展示带原始标签；长文本截断后可加 hover 展示全文** — 作者 Cathylkx，反馈表格渲染的显示问题，含截图。此需求无对应 PR 合入，今日以 stale 关闭。
  https://github.com/netease-youdao/LobsterAI/issues/1311

- **[#1314] 功能增强：支持拖拽调整侧边栏宽度** — 作者 MaoQianTu，指出 240px 固定宽度在小屏/大屏下的问题，并给出 180~480px 限制、`col-resize` 光标等具体方案，已被 PR #1315 实现。
  https://github.com/netease-youdao/LobsterAI/issues/1314

- **[#1317] 侧边栏按钮显示键盘快捷键 kbd 提示** — 作者 MaoQianTu，指出 Ctrl+N / Ctrl+F 快捷键发现成本高，给出含平台感知（⌘/Ctrl）的 `<kbd>` 徽标方案，已被 PR #1318 实现。
  https://github.com/netease-youdao/LobsterAI/issues/1317

- **[#1319] 会话列表添加骨架屏加载状态** — 作者 MaoQianTu，指出初始化期间 `sessions` 为空数组导致"暂无会话"空状态闪烁，提出 `sessionsLoaded` 标志位方案，已被 PR #1320 实现。
  https://github.com/netease-youdao/LobsterAI/issues/1319

**趋势洞察**：MaoQianTu 的系列 issue 集中在侧边栏/会话列表的体验细节上，且都附带具体实现建议，属于高质量社区反馈，并在今日全部落地。

---

## 5. Bug 与稳定性

按严重程度排列：

| 严重程度 | 问题描述 | 状态 | 修复 PR |
|---------|---------|------|---------|
| **高** | DeepSeek 长会话缓存命中率从 ~100% 暴跌至 ~57%，原因：实时 prompt 投影对未变更的工具结果历史重复应用 4x 聚合上限，导致重写已缓存前缀 | ✅ 已修复 | [#2413](https://github.com/netease-youdao/LobsterAI/pull/2413) / [#2415](https://github.com/netease-youdao/LobsterAI/pull/2415) |
| **中** | 侧聊（side-chat）结果中的 BTW 工具协议标记泄漏到用户可见内容；需要工具时缺少稳定引导 | ✅ 已修复 | [#2414](https://github.com/netease-youdao/LobsterAI/pull/2414) |
| **低** | 设置页切换选项卡后，记忆编辑器/模型连接测试弹层残留为全窗口遮罩，导致界面点击无效（看起来只读） | ✅ 已修复 | [#1321](https://github.com/netease-youdao/LobsterAI/pull/1321) |
| **低** | 应用启动时会话列表先显示"暂无会话"空状态，数据到达后才刷出真实列表（闪烁） | ✅ 已修复 | [#1320](https://github.com/netease-youdao/LobsterAI/pull/1320) |

**稳定性评价**：今日无新增 bug 报告。3 个已知问题全部获得修复，且"缓存命中率"修复对生产环境影响显著，说明项目在性能与成本优化方面持续投入。

---

## 6. 功能请求与路线图信号

### 已落地（预计随 2026.7.31 版本发布）

| 功能需求 | 原始 Issue | 实现 PR |
|---------|-----------|---------|
| 侧边栏拖拽调整宽度（180~480px） | [#1314](https://github.com/netease-youdao/LobsterAI/issues/1314) | [#1315](https://github.com/netease-youdao/LobsterAI/pull/1315) |
| 侧边栏按钮快捷键 `<kbd>` 提示 | [#1317](https://github.com/netease-youdao/LobsterAI/issues/1317) | [#1318](https://github.com/netease-youdao/LobsterAI/pull/1318) |
| 会话列表骨架屏加载状态 | [#1319](https://github.com/netease-youdao/LobsterAI/issues/1319) | [#1320](https://github.com/netease-youdao/LobsterAI/pull/1320) |
| 站点 URL/分享码复制成功反馈 | — | [#2417](https://github.com/netease-youdao/LobsterAI/pull/2417) |

### 需求已提出但尚无对应实现

- **表格 hover 展示全文与原始标签优化（[#1311](https://github.com/netease-youdao/LobsterAI/issues/1311)）**：今日被 stale 关闭且无对应 PR。若后续有用户再次提出，可考虑实现"长文本截断 + hover tooltip"的通用组件。

### 长期信号

- **Antigravity OAuth 集成（[#172](https://github.com/netease-youdao/LobsterAI/pull/172)）**：该 PR 包含 OAuth 子系统、SQLite profile 持久化、OpenAI 兼容代理支持等较大改动，今日以 stale 关闭。功能本身价值较高但久未推进，建议维护者明确是否纳入路线图，避免社区重复劳动。

---

## 7. 用户反馈摘要

从今日处理的 issue 评论中提炼：

- **侧边栏是 UX 集中反馈区**：MaoQianTu 连续提出 3 个侧边栏相关需求（宽度、快捷键、骨架屏），反映用户对侧边栏可定制性和加载状态反馈的需求真实存在。其反馈都附有具体实现方案，参考价值高。
- **表格渲染体验待改进**：Cathylkx 反馈表格内容换行时带原始标签、长文本截断后无法查看全文。该问题已在 4 月提出，但一直未获实现，相关需求可能需要产品侧确认优先级。
- **开发者对成本敏感**：从 #2413/#2415 的合入可以看出，维护者关注 DeepSeek 长会话的缓存命中率，这直接影响用户的使用成本（API 费用）。修复后命中率恢复至 ~100%，对用户是实质性的成本利好。

---

## 8. 待处理积压

| 项目 | 类型 | 创建日期 | 最后更新 | 状态/风险 |
|------|------|---------|---------|----------|
| **[#2234] fix(openclaw): cron yield descendant finalization** | PR（待合并） | 2026-06-30 | 2026-07-31 | 今日唯一未合入 PR，修复 cron 场景下子 agent 完成事件无法驱动父 agent 的问题，含 3 种场景测试计划。长期未合入需关注。 |
| https://github.com/netease-youdao/LobsterAI/pull/2234 | | | | |
| **[#1311] 表格 hover 展示全文** | Issue（stale 关闭） | 2026-04-02 | 2026-07-31 | 已关闭但功能未实现。如需保留需求，建议重新开启并标记 `good first issue` 或排期。 |
| https://github.com/netease-youdao/LobsterAI/issues/1311 | | | | |
| **[#172] Antigravity OAuth 集成** | PR（stale 关闭） | 2026-02-27 | 2026-07-31 | 大功能 PR 被关闭，需确认是否完全放弃，避免社区重复提交。 |
| https://github.com/netease-youdao/LobsterAI/pull/172 | | | | |
| **[#1308] home-screen 输入草稿按 agent 隔离** | PR（stale 关闭） | 2026-04-02 | 2026-07-31 | 功能未被采用，但多 agent 场景下草稿互相覆盖的问题可能仍然存在。 |
| https://github.com/netease-youdao/LobsterAI/pull/1308 | | | | |

**维护者提醒**：
1. **#2234** 已待合并超过一个月，涉及 cron 执行链路的正确性，建议尽快 review 或明确关闭原因。
2. 今日集中关闭了 4 条 stale issue 和 5 条 stale PR，但其中 #1311 和 #172 包含未落地的有效需求，建议在关闭前补充评论说明原因，避免贡献者困惑。

---

## 项目健康度总结

| 维度 | 评价 |
|------|------|
| 活跃度 | ★★★★☆（24h 内 16 条更新，节奏正常） |
| 稳定性 | ★★★★★（3 个生产级 bug 全部修复） |
| 社区反馈 | ★★★★☆（高质量 UX 反馈，全部被采纳） |
| 积压风险 | ★★★☆☆（1 条 PR 长期待合并，2 个有效需求被 stale 关闭） |
| 整体趋势 | 稳定向好，进入发布前夕的收敛阶段 |

**数据截止**：2026-08-01 | 生成时间：2026-08-01

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 — 2026-08-01

## 1. 今日速览

过去24小时 Moltis 项目保持平稳活跃：共 2 条 Issue 更新（1 条新开、1 条关闭），6 条 PR 动态（4 条待合并、2 条已合并/关闭）。外部开发者 tsauvajon 一次性提交了两项安全加固 PR（#1179、#1180），表明社区对项目安全性的关注度正在上升。功能层面，Web 端 Markdown 复制与会话导出（#1176）已合并，直接解决了用户两周前提出的功能请求（#1131）。Nostr NIP-29 群聊支持（#1168）亦已完成，为 Buzz 集成铺平道路。今日无新版本发布。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日共有 2 个 PR 被合并/关闭，项目在协议集成与 Web 体验两个方向均有实质推进：

- **feat(nostr): add NIP-29 group chat support for Buzz channels**（[PR #1168](https://github.com/moltis-org/moltis/pull/1168)，已合并/关闭）— 由 penso 贡献，为 `moltis-nostr` 增加了 NIP-29 群聊协议支持，使 Moltis 能够接入 Block 开源的 Buzz 工作区。这是一项重要的协议互操作性扩展，AI 代理与人类将能在同一团队频道内协作。
- **feat(web): add Markdown copy and session export**（[PR #1176](https://github.com/moltis-org/moltis/pull/1176)，已合并/关闭）— 由 Jonesxq 贡献，Web 端在复制助手回复时保留原始 Markdown，并新增「Save as Markdown」会话级导出能力，支持完整分页历史导出。该 PR 关闭了此前用户提出的功能请求 [Issue #1131](https://github.com/moltis-org/moltis/issues/1131)。

这一天的变化说明项目不仅在横向拓展外部协议（Nostr/Buzz），也在纵向上打磨日常使用体验（Markdown 工作流），整体处于健康发展的状态。

## 4. 社区热点

> 注：本日数据未包含评论数，以下基于开放时长、关闭状态、功能关联度等维度综合判断。

- **[Issue #1131 [Feature]: Add copy + export as Markdown](https://github.com/moltis-org/moltis/issues/1131)（已关闭，👍 1）** — 自 6 月 17 日提出，历时一个半月后由 PR #1176 实现并关闭。该请求获得用户👍，代表了「内容可移植性」类诉求的典型闭环，是社区驱动开发的一个积极信号。
- **[PR #1170 fix(channels): gate /sh and privileged tools behind a per-account operators list](https://github.com/moltis-org/moltis/pull/1170)（待合并）** — 已开放 6 天，涉及访问权限与操作员特权的分离，属于权限模型的重要加固。该改动将影响命令、回调、队列回放、聊天执行及外部工具等多个场景，预计会引发较高关注。
- **[PR #1158 feat(memory): add zvec vector database memory backend](https://github.com/moltis-org/moltis/pull/1158)（待合并）** — 已开放 15 天，作者自述为「vibe-coded」实验性后端，基于 Zvec + redb，配合本地 llama-cpp server 运行 embedding 模型。这反映了部分社区用户对本地优先、可定制记忆方案的明确偏好。

## 5. Bug 与稳定性

按严重程度由高到低排列：

1. **任意文件写入 / 潜在 RCE（高严重度，已有修复 PR）** — [PR #1180 fix(security): harden model and zip paths](https://github.com/moltis-org/moltis/pull/1180)（待合并）修复了两类可导致越权写入的漏洞：恶意 ZIP 或 HuggingFace 仓库可能覆盖用户信任的配置、凭据与脚本，进而获得代码执行能力。涉及 `clawhub.rs` 的 Zip 解压路径校验，建议优先合入。
2. **节点配对签名绕过（高严重度，已有修复 PR）** — [PR #1179 fix(gateway): verify node pairing signatures](https://github.com/moltis-org/moltis/pull/1179)（待合并）将 `node.pair.verify` 绑定到服务器签发的待处理请求，防止调用方自行提供密钥或 challenge，从而堵住配对流程中的认证绕过风险。
3. **GPT 5.6 Luna 集成异常（严重度待定，新报告）** — [Issue #1181 [Bug]: Issue with GPT 5.6 Luna](https://github.com/moltis-org/moltis/issues/1181) 为昨日新开报告，尚无评论与复现细节。需要社区补充会话上下文、错误日志等信息，以判断是模型兼容性问题还是 API 配置问题。

## 6. 功能请求与路线图信号

- **Markdown 复制与导出（已实现）**：Issue #1131 已被 PR #1176 关闭，说明「内容可携带性」方向的请求会被维护者积极采纳，这一能力很可能随下一版本发布。
- **本地化/可插拔记忆后端（进行中）**：[PR #1158](https://github.com/moltis-org/moltis/pull/1158)（zvec）如被合并，将提供除默认记忆外的本地优先方案，与 llama-cpp 等本地 embedding 服务协同，符合数据隐私与自托管趋势。不过，该 PR 已开放 15 天，需要维护者明确给出评估结论或修改指引。
- **细粒度操作员权限（进行中）**：[PR #1170](https://github.com/moltis-org/moltis/pull/1170) 将访问白名单与特权操作解耦，预计对多租户/团队协作场景有实质影响，是权限体系走向成熟的重要信号。
- **安全加固集中提交（强烈信号）**：tsauvajon 的 [PR #1179](https://github.com/moltis-org/moltis/pull/1179) 和 [PR #1180](https://github.com/moltis-org/moltis/pull/1180) 直指网关签名与解压路径两大安全隐患，说明社区正推动项目向「生产可用」的安全基线靠拢。

## 7. 用户反馈摘要

- **安全顾虑是外部采用的实际门槛**：tsauvajon 在 PR #1179 中直言 *"I'd like to use Moltis, but I've got a couple of security fixes I'd like to get in before doing so"*。这表明部分潜在用户并非因功能不足而观望，而是希望先满足自身安全标准，且愿意通过代码贡献的方式推动改进。
- **Markdown 导出是真实需求**：Issue #1131 的用户等待了一个半月，最终由 Web PR 实现并关闭。说明用户对会话数据的可移植与再加工有明确需求，尤其面向写作、归档、分享等场景。
- **实验性技术尝鲜存在**：PR #1158 作者自述使用 vibe-coding 方式快速搭建了 Zvec 后端并作为个人日常配置（*"This is my current setup"*），反映社区中存在一批愿意拥抱新存储引擎、快速验证原型的开发者。若维护者能够给出反馈，将有助于维持这类贡献者的积极性。

## 8. 待处理积压

提请维护者关注以下长期未合入的 PR，以及需要分类标记的新 Issue：

- **[PR #1158 feat(memory): add zvec vector database memory backend](https://github.com/moltis-org/moltis/pull/1158)（已开放 15 天）** — 实验性记忆后端，长时间无 review 可能导致贡献者流失。建议明确是否合入，或在文档中说明不支持原因。
- **[PR #1170 fix(channels): gate /sh and privileged tools behind a per-account operators list](https://github.com/moltis-org/moltis/pull/1170)（已开放 6 天）** — 权限模型的重要变更，涉及多个模块，需要尽早安排 review 以减少与后续 PR 的冲突风险。
- **[PR #1179](https://github.com/moltis-org/moltis/pull/1179) 与 [PR #1180](https://github.com/moltis-org/moltis/pull/1180)（各开放 1 天，但严重度高）** — 两项安全修复直接影响部署安全性，建议在积压队列中提升优先级。作者已明确表达「先修复再使用」的立场，快速响应有助于提升社区信任。
- **[Issue #1181 [Bug]: Issue with GPT 5.6 Luna](https://github.com/moltis-org/moltis/issues/1181)（新开，无评论）** — 缺少详细信息，建议维护者添加 `bug` 标签并引导报告者补充复现步骤、日志与模型配置等上下文。

---

**总体评估**：Moltis 当前处于「社区贡献活跃、安全加固集中、功能逐步收口」阶段。外部开发者正在帮助项目解决安全与协议集成问题，Web 端功能也在快速迭代。建议维护者将安全类 PR 的 review 优先级提到最高，并尽快对长期开放的 PR（#1158、#1170）给出明确结论，以维持社区贡献势能、降低外部采用门槛。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报 — 2026-08-01

## 1. 今日速览

过去 24 小时 CoPaw 项目保持高活跃度：Issue 更新 16 条（新开/活跃 11、关闭 5），PR 更新 34 条（待合并 24、已合并/关闭 10），无新版本发布。社区反馈集中在三条主线上：**shell 命令执行稳定性**（输出截断、UI 冻结、超时失效）、**记忆系统数据丢失**（#6555 及其修复）、**agentscope 2.0.4.post1 兼容性**（#6612）。多数高严重度 Bug 已在本周内获得对应修复 PR，项目正处在密集的缺陷修复与回归收敛阶段。多个社区新人提交修复 PR，贡献者生态活跃。

## 2. 版本发布

无。

## 3. 项目进展

过去 24 小时共有 10 个 PR 合并/关闭，覆盖音频渠道、记忆持久化与工具参数兼容三个方向：

- **修复音频消息转写静默失败** — [PR #6573](https://github.com/agentscope-ai/QwenPaw/pull/6573)（已关闭）修复了 AgentScope 2.0 迁移后飞书等渠道音频消息无法进入转录流程的回归，对应 Issue #6544。
- **修复记忆文件缺失早期会话** — [PR #6592](https://github.com/agentscope-ai/QwenPaw/pull/6592)（已关闭）在 Scroll 上下文淘汰前强制 flush Auto-Memory，解决每日记忆文件遗漏早间事件的问题，对应 Issue #6555。
- **read_file 工具参数兼容性** — [PR #6606](https://github.com/agentscope-ai/QwenPaw/pull/6606)（已关闭）允许 `read_file` 接受数字字符串形式的行范围参数，修复了模型工具调用中的一个解析障碍。

此外，[PR #6607](https://github.com/agentscope-ai/QwenPaw/pull/6607)（全局热键快速输入窗）、[PR #6615](https://github.com/agentscope-ai/QwenPaw/pull/6615)（agentscope 兼容性修复）、[PR #6610](https://github.com/agentscope-ai/QwenPaw/pull/6610)（shell 命令超时与 UI 冻结修复）等均已进入待合并队列，预计在下一个合并窗口落地。

## 4. 社区热点

过去 24 小时讨论最集中的五个议题：

- **[Issue #6537](https://github.com/agentscope-ai/QwenPaw/issues/6537) — Skill tags 重启后消失（10 条评论）**：用户确认通过 `PUT /skills/pool/{name}/tags` 接口保存成功，但应用重启后 manifest 重新协调时丢失，属 #3270 的回归。该问题触及配置持久化的核心信任，社区讨论热度最高。
- **[Issue #6601](https://github.com/agentscope-ai/QwenPaw/issues/6601) — 长会话不报空响应错误（5 条评论）**：长对话因工具调用累积逼近窗口上限后模型空响应，框架层不报错，最终导致会话彻底失去响应。
- **[Issue #6588](https://github.com/agentscope-ai/QwenPaw/issues/6588) — `spawn_subagent` 单任务模式不可用（4 条评论）**：模型面向的工具 schema 将 `batch` 暴露为必填参数，与 `batch=None` 的单任务模式矛盾；省略则校验失败，传空值又被特殊处理。
- **[Issue #6520](https://github.com/agentscope-ai/QwenPaw/issues/6520) — `agent.json` 系统性损坏（3 条评论）**：Windows 环境下 BOM 头、缺失引号、双重编码三种损坏同时出现，导致完全系统故障。
- **[Issue #6614](https://github.com/agentscope-ai/QwenPaw/issues/6614) — 微信 cron 推送静默失败**：任务一直显示 `success` 但微信侧从未收到，`context_token` 失效，已烧掉约 44M token。该问题虽评论数少，但影响时间长、后果隐蔽。

**诉求归纳**：以上热点背后是三个共性期待——配置写入后必须可靠恢复（#6537）、长会话必须可预期地报错而非静默失效（#6601/#6588）、渠道推送必须真实可验证（#6614）。

## 5. Bug 与稳定性

按严重程度排列，并标注修复状态：

### P0 — 系统级故障
- **[#6520](https://github.com/agentscope-ai/QwenPaw/issues/6520) agent.json 系统性损坏**：BOM 头、缺失闭引号、双重编码中文，跨 20+ 字段损坏，导致系统完全不可用。已有修复 PR [#6528](https://github.com/agentscope-ai/QwenPaw/pull/6528)（含安全 JSON 读取、BOM 剥离、编码修复）。
- **[#6612](https://github.com/agentscope-ai/QwenPaw/issues/6612) 与 agentscope 2.0.4.post1 不兼容**：proactive/记忆演化子系统的 `Msg.content` 类型崩溃 + 工具权限死锁。已有修复 PR [#6615](https://github.com/agentscope-ai/QwenPaw/pull/6615)。
- **[#6608](https://github.com/agentscope-ai/QwenPaw/issues/6608) 长运行 shell 命令绕过超时，阻塞飞书会话 1.5 小时**：取消时产生孤儿子进程，且缺少按渠道的总超时。已有修复 PR [#6610](https://github.com/agentscope-ai/QwenPaw/pull/6610)（对任意大超时封顶至配置上限，默认 600s）。

### P1 — 功能不可用/严重退化
- **[#6537](https://github.com/agentscope-ai/QwenPaw/issues/6537) Skill tags 重启后丢失**：#3270 的回归，配置保存与启动协调逻辑不一致。暂无对应修复 PR。
- **[#6601](https://github.com/agentscope-ai/QwenPaw/issues/6601) 长会话不报空响应错误**：框架层缺失窗口上限保护机制。暂无对应修复 PR。
- **[#6588](https://github.com/agentscope-ai/QwenPaw/issues/6588) `spawn_subagent` 单任务模式不可用**：batch 参数 schema 定义错误。已有修复 PR [#6609](https://github.com/agentscope-ai/QwenPaw/pull/6609)（将 `Optional[list | str]` 改为 `list | str | None`）。
- **[#6589](https://github.com/agentscope-ai/QwenPaw/issues/6589) `execute_shell_command` 大量输出导致 UI 冻结**：数万行 stdout 一次性渲染阻塞主线程。已有修复 PR [#6610](https://github.com/agentscope-ai/QwenPaw/pull/6610)。
- **[#6614](https://github.com/agentscope-ai/QwenPaw/issues/6614) 微信 cron 推送静默失败**：status 显示 success 但微信侧 `ret=-2`，已消耗约 44M token。暂无对应修复 PR。

### P2 — 中等影响
- **[#6512](https://github.com/agentscope-ai/QwenPaw/issues/6512) `execute_shell_command` 大输出截断**：>30KB 时结果尾部中断，偶发 `Internal error`。与 #6589 同根因，PR #6610 部分覆盖，流式读取/自动落盘方案仍待推进。

### 已关闭
- [#6555](https://github.com/agentscope-ai/QwenPaw/issues/6555) 记忆文件遗漏早间事件 — 由 PR #6592 修复。
- [#6544](https://github.com/agentscope-ai/QwenPaw/issues/6544) 飞书音频消息转写静默失败 — 由 PR #6573 修复。
- [#6529](https://github.com/agentscope-ai/QwenPaw/issues/6529) ACP `new_session` 响应缺少 models 字段。
- [#6558](https://github.com/agentscope-ai/QwenPaw/issues/6558) 多会话 UI 数据完整性问题（消息丢失/指令漂移/重复渲染）。
- [#6549](https://github.com/agentscope-ai/QwenPaw/issues/6549) v2.0.1 Desktop 输入框被遮挡。

## 6. 功能请求与路线图信号

- **[#6260](https://github.com/agentscope-ai/QwenPaw/issues/6260) 结果呈现方式优化**：用户要求折叠思考与工具调用过程，让 Agent 交付的结果成为 UI 主体。自 7 月 19 日起持续开放，获得社区 👍 支持。属于 UI/UX 设计方向调整，可能需要产品设计团队介入。
- **[#6512](https://github.com/agentscope-ai/QwenPaw/issues/6512) 大输出自动写入文件或提供流式读取机制**：与 #6589/#6608 同属 shell 输出治理方向，且与 PR #6610 的修复互补。建议纳入下一迭代。
- **[#6587](https://github.com/agentscope-ai/QwenPaw/issues/6587) 应用名由 "QwenPaw Desktop" 简化为 "QwenPaw"**：低成本、高用户感知的变更。
- **新功能 PR 信号**：[#6607](https://github.com/agentscope-ai/QwenPaw/pull/6607)（全局热键快速输入窗）、[#6526](https://github.com/agentscope-ai/QwenPaw/pull/6526)（NVIDIA NIM provider 支持）、[#6302](https://github.com/agentscope-ai/QwenPaw/pull/6302)（统一 provider 发现/模型元数据/路由）。其中 PR #6302 是大型重构，涉及模型管理与 Console 配置，若进入下一版本将成为重要的架构里程碑。
- **记忆系统与 AgentScope 生命周期对齐**：[PR #6611](https://github.com/agentscope-ai/QwenPaw/pull/6611) 将 Scroll 收敛为唯一上下文协议，按 AgentScope Agent 基类范式重组 context 与 memory 生命周期，与 #6555 的修复目标一致，是架构层面的长期改进。

## 7. 用户反馈摘要

- **静默失败最伤信任**：#6614 用户报告微信定时推送"从未真正送达"但系统一直显示成功，且排查过程烧掉约 44M token；#6601 用户遇到长会话彻底无响应且无错误提示。两例共同指向"没有可观测性"的挫败感。
- **配置持久化回归引发不满**：#6537 用户明确表示"Tags 已正确保存到 `skill_pool/skill.json`"，但重启后仍然丢失。确认保存成功却收不到预期结果，这类回归对信任打击较大。
- **过程淹没结果**：#6260 用户直言"思考过程和工具调用占满全屏，结果被淹没在执行过程中"，希望界面直接交付结果而非展示过程。该反馈被 1 名用户点赞支持。
- **UI 冻结被迫强杀**：#6589 用户描述界面完全卡死、只能强制关闭应用，属于最恶劣的体验问题之一。
- **积极信号**：过去 24 小时有 5 个来自 first-time-contributor 的修复 PR（#6618、#6615、#6609、#6610、#6528），说明问题可复现性高、贡献门槛友好，社区的 self-healing 能力在增强。

## 8. 待处理积压

以下为长时间未获得维护者响应或推进缓慢的重要条目：

- **[Issue #6260](https://github.com/agentscope-ai/QwenPaw/issues/6260)（7 月 19 日提出，已开放 13 天）**：结果呈现优化建议。虽有用户支持，但无维护者回复，建议纳入 UI 迭代排期。
- **[PR #6203](https://github.com/agentscope-ai/QwenPaw/pull/6203)（7 月 16 日创建，标记 Under Review 已超两周）**：修复 Windows `tasklist` 探测缺失 timeout/隐藏窗口/按 PID 过滤的问题。维护者需尽快推进审查或给出反馈。
- **[PR #6306](https://github.com/agentscope-ai/QwenPaw/pull/6306)（7 月 21 日创建）**：desktop 侧边栏增加 workspace 快捷入口，对应 Issue #6083，等待合并约 11 天。
- **[PR #6302](https://github.com/agentscope-ai/QwenPaw/pull/6302)（7 月 21 日创建）**：统一 provider 发现、模型元数据与路由的大型重构。推进缓慢可能影响后续版本模型管理功能的落地节奏。
- **[Issue #6512](https://github.com/agentscope-ai/QwenPaw/issues/6512)（7 月 28 日提出）**：shell 大输出自动落盘/流式读取建议。PR #6610 仅覆盖超时与冻结，此处的产品级方案仍缺维护者回应。
- **[Issue #6537](https://github.com/agentscope-ai/QwenPaw/issues/6537)（7 月 28 日提出，现为社区讨论热点）**：skill tags 重启丢失回归，截至日报生成时无维护者确认或修复 PR，建议优先响应。

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