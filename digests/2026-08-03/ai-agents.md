# OpenClaw 生态日报 2026-08-03

> Issues: 500 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-08-03 03:23 UTC

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

# OpenClaw 项目动态日报（2026-08-03）

## 1. 今日速览

过去 24 小时 OpenClaw 仓库保持极高活跃度：**500 条 Issue 更新**（449 条新开/活跃、51 条关闭）与 **500 条 PR 更新**（141 条合并/关闭、359 条待合并），并发布 **1 个新版本 v2026.7.2-beta.7**。本日主线非常清晰——**状态安全与恢复**成为新版本核心主题，同时社区关注焦点集中在**消息丢失、会话状态一致性与 API 计费安全**三类问题上。自动修复机器人 clawsweeper[bot] 持续输出渠道层修复（LINE、WhatsApp、Control UI），维护者 steipete 则提交了一批大规模测试固件整合与运行时状态统一重构，整体项目健康度中上，但 P1 级积压问题仍有多项长期未闭环。

## 2. 版本发布

### v2026.7.2-beta.7（2026-08-03）

新版本以 **State safety and recovery（状态安全与恢复）** 为核心主题，围绕持久化数据的健壮性做了系统性增强：

- **Quarantine store**：引入隔离存储区，主数据库损坏时持久化数据仍可存活
- **Crash-recoverable SQLite snapshots**：SQLite 快照支持崩溃恢复
- **Crash-durable filesystem publication**：文件系统发布具有崩溃持久性
- **Schema-upgrade data-loss rejection**：拒绝可能导致数据丢失的 schema 升级
- **Rollback-writer snapshot recovery**：回滚写入者的快照恢复机制

**迁移注意**：该版本为 beta 渠道，状态数据库（`openclaw.sqlite`）的 schema 升级路径发生变更。升级前建议手动备份状态目录；若曾使用 pre-release 版本并遭遇 schema 不匹配，请参考 [#115421](https://github.com/openclaw/openclaw/issues/115421) 中描述的降级恢复场景，新逻辑应能避免旧版本“隔离/清空状态库”的破坏性行为。

## 3. 项目进展

今日共 **141 个 PR 合并/关闭、51 个 Issue 关闭**。在评论数最高的 PR 中，以下合并项值得关注：

| PR | 内容 | 状态 |
|---|---|---|
| [#118064](https://github.com/openclaw/openclaw/pull/118064) | **fix(line)**：投递前跳过无效位置消息（修复 #118029），防止空白 title/address 直达 LINE API | 已合并（bot autofix） |
| [#117697](https://github.com/openclaw/openclaw/pull/117697) | **fix(whatsapp)**：自动反应保留归一化入站消息方向，修复 bot 链接自己账号时的消息方向错乱（修复 #117672） | 已合并（bot autofix） |
| [#118407](https://github.com/openclaw/openclaw/pull/118407) | **refactor(google-meet)**：整合 create 流程与 node host 测试固件，消除重复并降低维护漂移 | 已合并（maintainer） |

**重大在途 PR（信号）**：

- [#118360](https://github.com/openclaw/openclaw/pull/118360) **Make subagent completion delivery durable and recoverable**（P1，关闭 #112616）：将子代理完成投递改为持久化、可恢复的机制，解决“仅排队却标记已投递”“重试 3 次后放弃”“挂起结果被误清理”等问题，直接回应了 #67777 等一批 P1 会话状态问题
- [#118412](https://github.com/openclaw/openclaw/pull/118412) / [#118414](https://github.com/openclaw/openclaw/pull/118414) / [#118398](https://github.com/openclaw/openclaw/pull/118398) / [#118411](https://github.com/openclaw/openclaw/pull/118411) / [#118399](https://github.com/openclaw/openclaw/pull/118399) 等：steipete 发起的**系统性重构系列**，统一 macOS 网关生命周期状态、prepared runtime 发布流程、auto-reply 回滚状态、插件 SDK 测试固件，表明项目正在集中偿还技术债、提升可审计性

整体来看，项目在**渠道层 bug 修复（bot 自动化）+ 核心状态管理层重构（维护者主导）** 双线推进，迈步扎实。

## 4. 社区热点

| Issue | 评论数 | 主题 | 热度分析 |
|---|---|---|---|
| [#116277](https://github.com/openclaw/openclaw/issues/116277)（已关闭） | **87** | DeepSeek v4 Flash 静默回复失败，仅输出通用 fallback “No reply was generated”，导致 Telegram 群消息无响应 | 今日最高热度。背后诉求：**LLM 提供方静默失败时，用户需要透明的错误归因与重试策略，而非一句无信息量的降级文案** |
| [#116201](https://github.com/openclaw/openclaw/issues/116201)（开启） | **51** | Realtime voice 会话可无界保留 provider 与 consult 状态，慢速/突发场景下资源泄漏 | 开发者对**实时语音会话的资源上限治理**高度关注，期望用硬性所有权边界替代现在的条目计数/取消信号 |
| [#115326](https://github.com/openclaw/openclaw/issues/115326)（已关闭） | **26** | Crash-loop breaker 永久压制 Discord/WhatsApp，且文档化恢复路径（channels.start）报 WebSocket 1006 失败 | 回归类问题的典型代表：**断路器机制缺少可靠的退出/恢复通道**，用户对文档失效的容忍度低 |
| [#91009](https://github.com/openclaw/openclaw/issues/91009)（开启） | 19 | Codex PreToolUse hook 中继产生 CPU 满载的 openclaw-hooks 进程并阻塞网关 RPC | 已悬置近 2 个月的 P1，标记 `recovery-stuck`，用户持续 +1 表达影响面 |
| [#117956](https://github.com/openclaw/openclaw/issues/117956)（开启） | 10 | claude-cli 后端在 `CLAUDE_CLI_CLEAR_ENV` 清除 key 后仍产生计费 API 用量，**单日约 1370 万 token 被计费** | 新出现的**安全/计费信任危机**，已挂 `needs-security-review` 与 `needs-info`，需优先澄清 |

## 5. Bug 与稳定性

按严重程度排列今日活跃 Bug：

**P0（数据安全）**
- [#115421](https://github.com/openclaw/openclaw/issues/115421) **Schema 降级恢复不得隔离/清空状态库（定时任务丢失）**：旧版本打开高版本 schema 状态库时，恢复流程将原库移走并新建空库，导致 cron 任务等数据丢失。已有链接 PR（[#113567](https://github.com/openclaw/openclaw/pull/113567) 快照前迁移），今日发布的 v2026.7.2-beta.7 明确包含对应防护，需验证覆盖。

**P1（高影响，按是否已有 fix 标注）**
- [#116201](https://github.com/openclaw/openclaw/issues/116201) Realtime voice 无界状态保留 — 无 fix PR，`needs-maintainer-review`
- [#91009](https://github.com/openclaw/openclaw/issues/91009) Codex hook CPU 满载阻塞 RPC — 无新 fix PR，`recovery-stuck`（6/6 开启，积压超 2 个月）
- [#48003](https://github.com/openclaw/openclaw/issues/48003) Steer 模式无法在 turn 中途注入消息 — 有链接 PR
- [#67777](https://github.com/openclaw/openclaw/issues/67777) 子代理完成投递在超时/排空/孤儿清理时丢失 — 无 fix PR，但 [#118360](https://github.com/openclaw/openclaw/pull/118360) 直接针对该问题域
- [#53408](https://github.com/openclaw/openclaw/issues/53408) 长对话后 write/exec 工具参数被静默丢弃 — 无 fix PR
- [#52249](https://github.com/openclaw/openclaw/issues/52249) ACP 父会话在等待子会话完成时卡死 — 无 fix PR
- [#106231](https://github.com/openclaw/openclaw/issues/106231) 循环检测拦截 exec 但不终止卡死的 agent 运行，持续数小时烧资源 — 有链接 PR
- [#117956](https://github.com/openclaw/openclaw/issues/117956) claude-cli 绕过 key 清除产生计费 — 无 fix PR，`needs-security-review`
- [#114234](https://github.com/openclaw/openclaw/issues/114234) usage-cost 刷新锁在容器 PID 复用后永久不可释放 — 有链接 PR
- [#55694](https://github.com/openclaw/openclaw/issues/55694) 工具调用失败死循环导致消息刷屏（飞书） — 无 fix PR

**已关闭（今日闭环）**
- [#116277](https://github.com/openclaw/openclaw/issues/116277) DeepSeek v4 Flash 静默失败（87 评论，已关闭）
- [#115326](https://github.com/openclaw/openclaw/issues/115326) Crash-loop breaker 永久压制 Discord/WhatsApp（已关闭）
- [#106760](https://github.com/openclaw/openclaw/issues/106760) Telegram 多 content block 场景首段文本被擦除（已关闭）

**稳定性评价**：消息丢失类 issue 持续高频出现，但今日机器人 autofix 与人工 PR 的关闭节奏同步较快；真正拖累健康度的是 **P1 积压中的 `recovery-stuck` 问题（#91009、#113251、#111498、#116022、#109017 等）**，长期卡在 `needs-maintainer-review` 或 `needs-live-repro` 状态。

## 6. 功能请求与路线图信号

**高热度/高价值需求**
- [#113251](https://github.com/openclaw/openclaw/issues/113251) 【P2】WebChat 文件查看器支持图片预览（10 评论，`platinum hermit` 评级）— 属于 Control UI 体验补齐，与今日 [#117721](https://github.com/openclaw/openclaw/pull/117721)（渲染 thinking 事件）同属 UI 增强方向，有较大概率进入后续版本
- [#50093](https://github.com/openclaw/openclaw/issues/50093) 【P2】WhatsApp 重连后回填断线期间消息 — 解决静默丢消息的根因型需求
- [#52640](https://github.com/openclaw/openclaw/issues/52640) 【P2】长时间运行的渠道 turn 提供持久任务状态面板（2 👍）
- [#71058](https://github.com/openclaw/openclaw/issues/71058) 【P2】单网关支持多个 Azure/Teams bot
- [#71195](https://github.com/openclaw/openclaw/issues/71195) 【P2】macOS Talk Mode 增加 OpenAI Realtime 语音到语音路径，与 voice-call 插件体验对齐
- [#71142](https://github.com/openclaw/openclaw/issues/71142) 【P2】Control UI 上传大小限制改为可配置（当前硬编码 5MB）

**路线图信号**：结合 [#118360](https://github.com/openclaw/openclaw/pull/118360)（子代理投递持久化）与 [#117400](https://github.com/openclaw/openclaw/pull/117400)（compaction 估算器使用规范上下文投影），可以看到项目下一阶段将重点攻坚**子代理生命周期可靠性与上下文管理正确性**，这两块正是 P1 积压的重灾区。

## 7. 用户反馈摘要

- **对“静默失败”的普遍反感**：#116277 的 87 条讨论中，用户反复强调“宁可报错也不要发无意义的 fallback”；同样地，[#106760](https://github.com/openclaw/openclaw/issues/106760) 中 Telegram 首段文本被擦除也被用户称为“silent corruption”。**诉求：失败/降级必须有明确标识与可追踪原因。**
- **对计费透明度的不信任**：#117956 中用户对“清除了 key 仍产生 1370 万 token 计费”表示强烈不安，要求安全审查；同类诉求也出现在 [#58498](https://github.com/openclaw/openclaw/issues/58498)（状态卡显示 OAuth 配置与用量归属不一致）中。
- **恢复路径不可用带来挫败感**：#115326 用户反馈“文档写的 channels.start 恢复方法根本走不通”，这类信任损伤比 bug 本身更持久。
- **国内渠道用户的细致体验诉求**：#50490（飞书 activation 切换无效）、#69572（飞书 typing 指示器误用 Reaction API）、#48786（飞书引用消息显示 `@_user_N` 占位符）——飞书渠道仍有多个体验细节待打磨。
- **积极反馈面**：WhatsApp 自动反应方向修复（#117697）、LINE 无效消息拦截（#118064）等 bot autofix 快速闭环，用户对修复速度的认可体现在这些 issue 的关闭效率上。

## 8. 待处理积压

**长期未响应的 P1/P2（提醒维护者重点关注）**

| Issue | 开启时间 | 标签状态 | 说明 |
|---|---|---|---|
| [#91009](https://github.com/openclaw/openclaw/issues/91009) | 2026-06-06 | P1，`recovery-stuck`，`needs-live-repro` | Codex hook CPU 满载阻塞 RPC，近 2 个月无新 fix，2 👍 |
| [#48003](https://github.com/openclaw/openclaw/issues/48003) | 2026-03-16 | P1，有链接 PR | Steer 模式核心功能缺失，悬置超 4 个月，4 👍 |
| [#57901](https://github.com/openclaw/openclaw/issues/57901) | 2026-03-30 | P2，有链接 PR | Safeguard compaction 忽略 compaction.model 配置 |
| [#50093](https://github.com/openclaw/openclaw/issues/50093) | 2026-03-19 | P2 | WhatsApp 断线消息回填，需求呼声持续 |
| [#67777](https://github.com/openclaw/openclaw/issues/67777) | 2026-04-16 | P1，无 fix PR | 子代理完成投递丢失——#118360 已覆盖，应加速关联 |
| [#47975](https://github.com/openclaw/openclaw/issues/47975) | 2026-03-16 | P1 | 子代理会话结束后主会话无响应（WSL2 环境） |
| [#53408](https://github.com/openclaw/openclaw/issues/53408) | 2026-03-24 | P1 | 长对话后 write/exec 参数静默丢弃，2 👍 |
| [#52249](https://github.com/openclaw/openclaw/issues/52249) | 2026-03-22 | P1 | ACP 父会话卡死至手动刷新 |
| [#106231](https://github.com/openclaw/openclaw/issues/106231) | 2026-07-13 | P1，有链接 PR | 循环检测不终止 agent，资源空转 |
| [#117956](https://github.com/openclaw/openclaw/issues/117956) | 2026-08-02 | P1，`needs-security-review` | claude-cli 计费绕过，新开但需安全团队立即介入 |

**长期未合并的 PR（提醒维护者推进）**
- [#100845](https://github.com/openclaw/openclaw/pull/100845)（7/6 开启）修复 one-shot `agent --local` 从不导出 OTel 诊断，已 `automerge armed` 却卡在兼容性风险评审
- [#109734](https://github.com/openclaw/openclaw/pull/109734)（7/17 开启）构建脚本 git commit 解析增加 5 秒超时，防 NFS 挂载卡死构建，`needs proof`
- [#113567](https://github.com/openclaw/openclaw/pull/113567)（7/25 开启）schema 前向迁移前快照状态库——与 #115421 及新版本发布直接相关，建议优先合并
- [#105301](https://github.com/openclaw/openclaw/pull/105301)（7/28 开启）msteams 审批先于 agent 队列解析，卡在 `waiting on author`

---

**日报小结**：OpenClaw 今日处于高活跃度、高强度修复状态，新版本对状态安全的重投入与维护者重构系列表明项目正从“功能扩张期”转向“稳定性夯实期”。健康度风险集中在**长期卡死的 P1 积压**与**计费/安全类信任问题**上，建议维护者优先处理 #117956（安全）与 #115421/#113567（数据安全）这条主线，并加速推动 #118360 的评审合并以闭环子代理投递可靠性问题。

---

## 横向生态对比

# 个人 AI 助手开源生态横向对比分析报告

**报告日期：** 2026-08-03
**分析范围：** OpenClaw、NanoBot、ZeroClaw、PicoClaw、NanoClaw、IronClaw、LobsterAI、Moltis、CoPaw 及 5 个无活跃项目


## 1. 生态全景

当前个人 AI 助手/自主智能体开源生态正处于**从“功能扩张期”向“稳定性夯实期”的关键转折点**。头部项目（OpenClaw、IronClaw、CoPaw）在保持高迭代速度的同时，不约而同地将重心转向**状态持久化、崩溃恢复、投递一致性**等底层可靠性问题，而非单纯堆叠新功能。与此同时，社区对**“静默失败零容忍”**（宁可报错不给无意义 fallback）、**计费与安全透明度**、**OpenAI 生态兼容**的呼声正在形成行业级共识，标志着用户群体正从尝鲜者转向重度依赖者，对系统可信度提出了质变要求。生态整体呈现“头部高活跃分化、尾部静默停滞”的马太效应，健康度差距显著拉大。


## 2. 各项目活跃度对比

| 项目 | Issues（24h） | PRs（24h） | Release | 待合并 PR 积压 | 健康度评估 |
|---|---|---|---|---|---|
| **OpenClaw** | 500 更新（449 新开/51 关） | 500 更新（141 合/关，359 待） | **v2026.7.2-beta.7** | 359 | ★★★★☆ 高活跃，但 P1 积压较多 |
| **ZeroClaw** | 50 更新（37 新开/13 关） | 50 更新（10 合/关，40 待） | **v0.8.4** | 40 | ★★★★☆ 活跃，PR 队列需清理 |
| **IronClaw** | 7 更新（6 新开/1 关） | 31 更新（9 合/关，22 待） | 无 | 22（含 2 个超 30 天） | ★★★★☆ 高活跃，QA 深度高 |
| **CoPaw** | 12 更新（9 新开/3 关） | 28 更新（9 合/关，19 待） | 无（最新 v2.0.1） | 19 | ★★★★☆ 高活跃，依赖兼容性风险 |
| **NanoBot** | 0 新开 | 15 更新（8 合/关，7 待） | 无 | 7 | ★★★★☆ 低 Issue 噪声，PR 吞吐高 |
| **NanoClaw** | 1 新开 | 10 更新（3 合/关，7 待） | 无 | 7（2 个积压 3 周） | ★★★☆☆ 中等偏上，数据库风险 |
| **PicoClaw** | 3 更新 | 9 更新（3 合/关，6 待） | 无 | 6（多个 stale） | ★★★☆☆ 中等，响应快但积压风险 |
| **Moltis** | 0 新开 | 1 待合并 | 无 | 1 | ★★☆☆☆ 低活跃，沉淀期 |
| **LobsterAI** | 0 新开（stale 关 2） | 0 新开（stale 关 2） | 无 | 4（积压 **4 个月**） | ★★☆☆☆ 低活跃，维护严重滞后 |
| **NullClaw** | — | — | — | — | ⚪ 无活动 |
| **TinyClaw** | — | — | — | — | ⚪ 无活动 |
| **ZeptoClaw** | — | — | — | — | ⚪ 无活动 |
| **EasyClaw** | — | — | — | — | ⚪ 无活动 |


## 3. OpenClaw 在生态中的定位

**OpenClaw 是生态的绝对锚点和参照系**，其单日 500+ Issue/500+ PR 的动态量级是第二名 ZeroClaw 的 10 倍，社区规模呈碾压级优势。其核心差异化体现在三个层面：

1. **技术路线：状态安全与恢复的先行者。** v2026.7.2-beta.7 引入的 Quarantine Store、Crash-recoverable SQLite snapshots、Schema-upgrade data-loss rejection 等机制，在生态中尚无同类深度实践。IronClaw 同日也在处理投递恢复竞态（#7017/#7025），但 OpenClaw 已将其系统化为版本级能力而非零散修复。

2. **开发模式：bot 自动化 + 维护者重构双线并行。** 渠道层 bug 由 clawsweeper[bot] 自动修复（LINE/WhatsApp 当日闭环），核心状态管理层由 steipete 主导系统性重构（5 个 PR 系列）。这种“自动化处理琐碎 + 人工攻克深层”的流水线作业，目前是生态中最成熟的工程范式。

3. **社区规模：用户反馈深度与广度兼备。** 从飞书细节体验（#50490、#69572）到 1370 万 token 计费安全（#117956），从 Telegram 静默失败（87 评论）到子代理投递丢失（#67777），OpenClaw 的 issue 覆盖了从底层架构到区域化渠道体验的全谱系需求，这是其他项目尚不具备的社区多样性优势。

**相对短板**：P1 级 `recovery-stuck` 问题积压（#91009 等超 2 个月未闭环）、新版 beta 的 schema 迁移风险、以及对安全类 issue（#117956）的响应速度，与其体量相比仍有提升空间。


## 4. 共同关注的技术方向

### 4.1 消息/任务投递的持久化与幂等性（最高频主题）

| 项目 | 具体诉求 |
|---|---|
| **OpenClaw** | 子代理完成投递在超时/排空/孤儿清理时丢失（#67777，P1）；PR #118360 正改为持久化可恢复机制 |
| **IronClaw** | 并发 coordinator 重复发送同一持久化投递（#7025）；中断恢复覆盖 Delivered 终态（#7017） |
| **NanoClaw** | Docker 跨挂载 SQLite 锁竞争致 29,000+ readonly 错误（#3177） |
| **PicoClaw** | 工具重复失败静默循环至 max_tool_iterations（#3311） |
| **NanoBot** | subagent 中间结果被模型误判为最终结果（#5152） |

**共性结论**：所有项目都在处理同一个核心矛盾——**系统在崩溃、并发、超时三重压力下，如何保证“消息恰好送达一次”**。这是自主智能体从 demo 走向生产的最后一道技术门槛。

### 4.2 状态持久化与崩溃恢复

- **OpenClaw**：v2026.7.2-beta.7 系统性增强（Quarantine Store、SQLite 快照崩溃恢复、Schema 升级数据丢失防护）
- **IronClaw**：以 `Prepared → Sending` CAS 作为投递所有权唯一权威（PR #7029），移除进程内 `in_flight`
- **NanoClaw**：SQLite journal 模式在跨文件系统挂载下的行为一致性，建议 WAL 或独立数据库适配层
- **CoPaw**：Skill tags 重启后被 reconcile 逻辑冲掉（#6537），配置持久化一致性回归

### 4.3 安全边界与计费信任

- **ZeroClaw**：P0 webhook 未鉴权即可注入消息（#9565），“像在公网裸奔”
- **IronClaw**：环境代理变量绕过 SSRF/DNS-rebinding 防护（#7016）；模型 USD 预算未强制执行（#7035）
- **OpenClaw**：claude-cli 清除 key 后仍产生 1370 万 token 计费（#117956，`needs-security-review`）
- **CoPaw**：依赖版本矩阵不兼容导致崩溃（#6612/#6619），影响信任度

### 4.4 静默失败的透明化

- **OpenClaw**：#116277 的 87 条评论中用户反复强调“宁可报错也不要无意义 fallback”；#106760 被称为“silent corruption”
- **NanoBot**：OpenAI Responses API serde 失败时对话“终局失败”（#5214）
- **PicoClaw**：用户对工具失败完全不知情，无错误回执（#3311）
- **NanoClaw**：Signal 渠道 restartService 静默失败（#2626）
- **LobsterAI**：IM 连通性测试全填 1 也能通过（#1287），配置校验形同虚设

### 4.5 OpenAI 协议兼容层

- **ZeroClaw**：RFC #8603 要求暴露 Chat Completions profile，让 Open WebUI、LobeChat、Continue.dev、Aider、LangChain 等直接接入
- **PicoClaw**：AI Router 维护者请求新增 OpenAI 兼容 provider 预设（#3298）
- **CoPaw**：统一 provider discovery 与路由（PR #6302，已积压 13 天）

### 4.6 资源上限治理

- **OpenClaw**：Realtime voice 会话无界保留 provider/consult 状态（#116201）
- **IronClaw**：模型 USD 每日预算上限失效（#7035）
- **ZeroClaw**：Goal mode 有界自主会话（#8303，需预算/取消/暂停机制）
- **NanoBot**：持续目标工具改为显式 runtime-gated（#4833）


## 5. 差异化定位分析

| 项目 | 核心定位 | 目标用户 | 技术架构特征 |
|---|---|---|---|
| **OpenClaw** | 全能型个人 AI 助手网关 | 开发者/重度用户/多渠道部署者 | 多渠道适配层 + 子代理 + 状态安全层；monorepo；beta 渠道高频迭代；bot 自动化修复 |
| **ZeroClaw** | 企业级自主智能体框架 | 团队/组织/需要治理能力的用户 | 强 RFC 治理流程、Work Lanes、SOP/记忆控制平面；Rust 实现；WebSocket/ACP 原生协议 |
| **IronClaw** | 高可靠性 AI 代理运行时 | 对投递一致性/成本控制有硬性要求的用户 | Wave 2 端口反转架构；CI 覆盖率 90% 门槛；QA 驱动的深度测试文化 |
| **CoPaw** | Qwen 生态桌面 AI IDE | 开发者/内容创作者 | 与 agentscope 深度绑定；Console + Creator 双子系统；多智能体协作 |
| **NanoBot** | 轻量级多渠道聊天机器人 | 个人用户/小团队快速部署 | 高 PR 吞吐、低 Issue 噪声；强 provider 兼容性修复；WebUI 体验优先 |
| **NanoClaw** | 渠道集成与技能扩展 | 需要特定渠道（Dial/Teams/Telegram）的用户 | 社区贡献渠道集成（积压 3 周）；SQLite 持久化；技能生态 |
| **PicoClaw** | 本地化 + 安全边界的轻量助手 | 中文/多语言用户，注重命令执行安全 | 活跃 i18n 社区（繁中/捷克语）；customAllowPatterns 安全策略；stale 风险 |
| **LobsterAI** | 面向国内 IM 的 AI 助手 | 钉钉/Telegram/popo 等 IM 用户 | 定时任务 + 会话列表性能优化；维护停滞但社区供给仍在 |
| **Moltis** | MCP 服务器管理平台 | 使用 MCP 协议的开发者 | 受管理 Git 仓库捆绑包（PR #1183）；vault 集成；三层一致工作流 |


## 6. 社区热度与成熟度分层

### 第一梯队：爆发期（日 PR 500+ / 30+）
**OpenClaw** — 生态绝对龙头，bot 自动化 + 维护者重构双轮驱动。处于从功能扩张向稳定性夯实的转型期，体量最大、问题也最多。

### 第二梯队：快速迭代期（日 PR 15~50）
- **IronClaw** — 架构收敛 + QA 深度测试双轨并行，工程严谨度生态最高。当日 QA 团队提交 5 条深水区报告，质量门槛（90% 覆盖率）说明其处于“产品质量巩固 + 架构现代化”阶段。
- **CoPaw** — 修复与积压并存。Critical 兼容性问题当日即有 first-time-contributor 提交修复，维护者响应快，但 PR 审查瓶颈已现（5 个社区 PR 待审）。
- **ZeroClaw** — v0.8.4 发布后进入维护期，RFC 决策效率是当前瓶颈（40 条 PR 待合并，决策队列积压）。
- **NanoBot** — “高 PR 吞吐、低 Issue 噪声”的健康状态，无新 Issue 洪峰说明主分支稳定，处于功能补全阶段。

### 第三梯队：维护巩固期（日 PR < 10）
- **PicoClaw** — 社区响应快（Issue 24h 内即有 fix PR），但 stale 积压风险上升，需维护者清理。
- **NanoClaw** — 核心修复活跃（core-team 近 2 日连续提交），但渠道集成 PR 积压 3 周反映审查瓶颈。
- **Moltis** — 沉淀期，仅 1 个大 PR 在途，方向明确（MCP 管理）但节奏放缓。

### 第四梯队：停滞/风险期
- **LobsterAI** — 4 个高质量 PR 积压 4 个月，属于**维护者响应严重滞后**的典型。外部贡献持续但信心在流失。
- **NullClaw、TinyClaw、ZeptoClaw、EasyClaw** — 24h 完全无活动，可能处于休眠或重命名/迁移状态。


## 7. 值得关注的趋势信号

### 7.1 可恢复性正在成为核心竞争力
从 OpenClaw 的 beta 版本主题、IronClaw 的 CAS 单飞语义到 NanoClaw 的 SQLite 锁竞争，**“崩溃后系统能否自愈且不丢数据”**已成为区分项目成熟度的首要指标。建议开发者选型时，将“持久化投递 + 崩溃恢复 + 幂等性”作为一票否决项。

### 7.2 安全与计费透明度的信任危机
OpenClaw 的 1370 万 token 计费事故、ZeroClaw 的未鉴权 webhook、IronClaw 的 SSRF 绕过三件事同日发生，说明 **AI 代理的“成本失控”与“边界失守”正在从个例变成行业共性问题**。为 AI 代理设计硬性预算上限和默认 fail-closed 的安全策略，将成为标配需求。

### 7.3 OpenAI 兼容层成为生态入口的“万能插头”
ZeroClaw 的 RFC #8603 和 PicoClaw 的 provider 预设请求殊途同归：**面对碎片化的自定义协议（WebSocket/ACP），社区正在用 OpenAI Chat Completions 作为事实标准倒逼项目开放兼容层**。谁先提供稳定的 OpenAI 兼容端点，谁就能接入最大的工具生态（Open WebUI、LangChain、Aider…）。

### 7.4 “静默失败零容忍”的用户共识
从 Telegram 群消息无响应到 shell 命令换行被折叠，用户对“不报错但结果错误”的容忍度正在趋近于零。**可观测性（明确的错误归因、可追踪的降级路径）正从加分项变成刚需**。新项目应在第一天就设计“失败即大声”的错误传播机制。

### 7.5 资源上限治理：从“能跑”到“可控”
Realtime voice 无界状态、模型日预算失效、Goal mode 缺乏有界执行——**自主智能体的“无限循环/无限消耗”风险正在触发行业性的治理机制设计**。预算控制、所有权边界、硬性超时将成为下一代 agent 框架的内建能力。

### 7.6 多智能体的“可发现性”问题
CoPaw 用户 50+ 轮对话后才发现其他 Agent 从未被调用（#6621），NanoBot 的 subagent 误判、OpenClaw 的子代理投递丢失——**多智能体协作的“编排可信度”正在成为新的技术深水区**。如何让父代理准确感知子代理状态、避免中间结果误判，将是下一阶段的核心攻关方向。

### 7.7 维护者瓶颈与社区贡献的“漏斗效率”
LobsterAI 的 4 个月积压、IronClaw 的 31 天 Release PR、PicoClaw 的 7 天 stale——**大量项目正在被 PR 审查瓶颈卡死**。AI 辅助代码审查（如 OpenClaw 的 bot autofix、IronClaw 的架构决策 agent）可能成为突破这一瓶颈的关键路径，也是生态中值得关注的基础设施投资方向。


**报告结论：** 2026-08-03 的个人 AI 助手开源生态呈现出“一超多强、分层加速”的格局。OpenClaw 以体量和系统性重构继续领跑，IronClaw/CoPaw/ZeroClaw 在各自维度（可靠性、生产力、治理）建立差异化壁垒，NanoBot/NanoClaw/PicoClaw 以轻量和渠道集成深耕细分市场，LobsterAI 则警示了维护停滞对社区信心的侵蚀。对技术决策者而言，**“可靠性、安全性、可观测性”**应取代“功能数量”成为选型的第一评估维度；对开发者而言，**投递一致性、资源治理、OpenAI 兼容层**是参与贡献时最具长期价值的技术方向。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目日报 — 2026-08-03

> 数据来源：GitHub HKUDS/nanobot  
> 统计窗口：2026-08-02 ~ 2026-08-03

---

## 1. 今日速览

过去 24 小时 NanoBot 项目没有新增 Issue，也没有新版本发布，但 PR 流动非常活跃：共 15 条 PR 更新，其中 8 条已合并/关闭，7 条仍在开放待审。项目当前处于“高 PR 吞吐、低 Issue 噪声”的状态，社区提交主要集中在 **Provider 兼容性修复、WebUI 体验优化、运行时稳定性** 三个方向。整体项目健康度良好，Bug 修复类 PR 占比高，核心维护者响应速度较快。

---

## 2. 版本发布

今日无新版本发布，因此无更新内容、破坏性变更或迁移注意事项。

---

## 3. 项目进展

今日共有 8 条 PR 被关闭/合并，覆盖了多个重要方向：

### Provider / API 兼容性

- **#5216** [CLOSED] fix(image): send Gemini Flash hints via `generationConfig.imageConfig`  
  修复 Gemini Flash 图片模型在 aspect ratio / image size 等提示参数下返回 `HTTP 400 INVALID_ARGUMENT` 的问题。  
  https://github.com/HKUDS/nanobot/pull/5216

- **#4021** [CLOSED] fix(codex): dedup reasoning items before send, retry on duplicate-item 400 [AI-assisted]  
  解决 OpenAI Codex provider 重复发送 `reasoning` item 导致多轮对话中断的问题。  
  https://github.com/HKUDS/nanobot/pull/4021

### WebUI 与前端体验

- **#5217** [CLOSED] fix(webui): show timestamps for replayed messages  
  为 WebUI 中重播消息补充时间戳显示，并覆盖 cron/proactive 等无 completion 元数据的场景。  
  https://github.com/HKUDS/nanobot/pull/5217

- **#5194** [CLOSED] perf(webui): accelerate JSONL session list and thread loading  
  通过复用 workspace scope、缓存索引签名，显著加快 `/api/sessions` 列表和线程加载速度。  
  https://github.com/HKUDS/nanobot/pull/5194

- **#4822** [CLOSED] fix(webui): preserve automation source on streamed replies  
  保留流式回复中的自动化来源元数据，避免 WebUI 会话重放时丢失 automation 标识。  
  https://github.com/HKUDS/nanobot/pull/4822

### 渠道与运行时

- **#5196** [CLOSED] fix(weixin): recover refreshed state after session expiry  
  修复微信渠道在 `errcode -14` 后暂停 60 分钟期间，若 `account.json` 被刷新，暂停结束后无法恢复新会话状态的问题。  
  https://github.com/HKUDS/nanobot/pull/5196

- **#4833** [CLOSED] Gate sustained goals behind explicit runtime mode  
  将长期任务工具 `long_task` / `complete_goal` 改为仅在显式 `/goal` 运行时注入，避免默认会话中出现不可控的持续目标工具。  
  https://github.com/HKUDS/nanobot/pull/4833

- **#4854** [CLOSED] feat(exec): add RTK command rewriter  
  为 exec 工具增加可选的 `tools.exec.rtk` RTK 命令重写器，先重写再走 sandbox wrapping 与 exec guard。  
  https://github.com/HKUDS/nanobot/pull/4854

---

## 4. 社区热点

数据概览中没有提供 Issues/PR 的评论数，因此无法按评论量排序。从更新时间、优先级标签和 PR 内容看，以下条目关注度较高：

- **#5214** [OPEN] fix(providers): fall back to chat completions on serde body rejections  
  该 PR 针对 OpenAI Responses API 在 serde 反序列化失败时导致对话“终局失败”的问题，标记为 **p1**。  
  https://github.com/HKUDS/nanobot/pull/5214

- **#5216** [CLOSED] Gemini Flash 图片模型的 400 错误修复  
  虽然已关闭，但该问题直接影响 `gemini-3.1-flash-lite-image`、`gemini-2.5-flash-image` 等模型的使用，是社区高频可感知的 Bug。  
  https://github.com/HKUDS/nanobot/pull/5216

- **#5217** [CLOSED] WebUI 历史消息时间戳显示  
  该 PR 解决重播消息无时间信息的问题，涉及 cron/proactive 场景，属于用户日常可见体验优化。  
  https://github.com/HKUDS/nanobot/pull/5217

- **#5211** [OPEN] feat(session): add cross-session search and mentions  
  新功能：支持跨会话搜索与 `@` 提及其他会话，表明社区对长上下文管理和多会话工作流有明确需求。  
  https://github.com/HKUDS/nanobot/pull/5211

---

## 5. Bug 与稳定性

今日没有新 Issue，但通过 PR 暴露或修复了若干稳定性问题。按严重程度排列如下：

### P1

- **#5214** [OPEN] fix(providers): fall back to chat completions on serde body rejections  
  OpenAI Responses API 在反序列化失败时会直接终止对话，影响多轮任务。已有修复 PR，但尚未合并。  
  https://github.com/HKUDS/nanobot/pull/5214

- **#5215** [OPEN] fix(gateway): close agent resources deterministically on stop  
  停止 gateway 时若仍有 exec 会话或 MCP 子进程运行，会产生 `RuntimeError: Event loop is closed`，阻塞优雅退出。已有修复 PR。  
  https://github.com/HKUDS/nanobot/pull/5215

### P2

- **#5216** [CLOSED] Gemini Flash image hints 无效导致 HTTP 400  
  已通过 `generationConfig.imageConfig` 修复。  
  https://github.com/HKUDS/nanobot/pull/5216

- **#5191** [OPEN] Windows 上静态资源 MIME 类型注册错误  
  Windows 注册表将 `.js` 等扩展名设为 `text/plain`，导致 WebUI 静态资源类型错误。有待合并修复。  
  https://github.com/HKUDS/nanobot/pull/5191

- **#5217** [CLOSED] WebUI 重播消息缺少时间戳  
  已修复。  
  https://github.com/HKUDS/nanobot/pull/5217

- **#5196** [CLOSED] 微信渠道 session 过期后状态恢复失败  
  已修复。  
  https://github.com/HKUDS/nanobot/pull/5196

- **#5213** [OPEN] plugins 命令在无 pip 环境下失败  
  `uv tool` 安装环境可能没有 pip，导致 `nanobot plugins enable` 失败；修复为 fallback 到 `uv`。  
  https://github.com/HKUDS/nanobot/pull/5213

- **#5152** [OPEN] subagent 部分完成结果被模型误判  
  subagent 仍有 sibling 任务在运行时，模型可能把中间结果当作最终结果。已有修复 PR，但尚未合并。  
  https://github.com/HKUDS/nanobot/pull/5152

---

## 6. 功能请求与路线图信号

近期 PR 透露出几个明确的路线图方向：

- **多会话管理**  
  #5211 `feat(session): add cross-session search and mentions` 表明用户在 WebUI 中需要跨会话检索、引用和跳转，这可能是下一个 WebUI 版本的核心体验升级。  
  https://github.com/HKUDS/nanobot/pull/5211

- **更多音乐/多媒体 Provider 支持**  
  #5212 `feat: add MiniMax music guidance` 为现有音乐生成 Provider 增加 MiniMax 的工具契约发现和技能引导，显示多媒体生成能力在持续扩展。  
  https://github.com/HKUDS/nanobot/pull/5212

- **插件安装体验优化**  
  #5213 解决无 pip 环境下插件安装失败的问题，说明官方安装方式已成为重要入口，插件生态的易用性被纳入修复范围。  
  https://github.com/HKUDS/nanobot/pull/5213

- **长期目标工具收敛**  
  #4833 将持续目标工具改为显式 runtime-gated，产品方向更强调“用户可控的长期任务”，而非默认暴露给所有会话。  
  https://github.com/HKUDS/nanobot/pull/4833

- **exec 工具增强**  
  #4854 引入 RTK command rewriter，未来可能进一步强化 exec 的沙箱兼容性与智能改写能力。  
  https://github.com/HKUDS/nanobot/pull/4854

---

## 7. 用户反馈摘要

过去 24 小时没有 Issue 更新，也没有可用的 Issue 评论数据，因此无法直接提炼用户的“满意度”或“抱怨点”。从 PR 描述中可以识别出以下真实用户痛点：

- Windows 用户可能因为系统注册表导致 WebUI 静态资源 MIME 类型错误，表现为页面资源加载异常或 JavaScript 未执行。#5191
- 使用 `uv tool` 安装 NanoBot 的用户在启用插件时可能遇到 “pip is unavailable” 报错。#5213
- 微信渠道用户会遇到 session 过期后 60 分钟“假死”，即使账号刷新也无法自动恢复。#5196
- OpenAI Codex 用户在多轮对话中会遇到 `400 Duplicate item found with id rs_…` 错误，导致对话中断。#4021
- Gemini Flash 图片模型用户设置宽高比/尺寸提示时直接 400，完全无法使用。#5216

这些反馈主要来自“非标准安装环境”“特定 provider 兼容性”和“长对话稳定性”三类场景。

---

## 8. 待处理积压

当前没有长期无人响应的 Issue，但仍有多条开放 PR 需要维护者关注：

- **#5152** [OPEN] fix(subagent): mark partial completion results  
  创建于 2026-07-28，已开放约 6 天。该 PR 修复 subagent 中间结果被误判为最终结果的问题，属于模型行为正确性修复。  
  https://github.com/HKUDS/nanobot/pull/5152

- **#5191** [OPEN] Register correct MIME types for static assets on Windows  
  创建于 2026-07-31，修复 Windows 静态资源 MIME 类型错误，影响 WebUI 可用性。  
  https://github.com/HKUDS/nanobot/pull/5191

- **#5214** [OPEN] fall back to chat completions on serde body rejections  
  创建于 2026-08-02，p1 级别，涉及 OpenAI Responses API 对话失败，建议优先 review。  
  https://github.com/HKUDS/nanobot/pull/5214

- **#5215** [OPEN] close agent resources deterministically on stop  
  创建于 2026-08-02，p1 级别，影响 gateway 停止时的稳定性。  
  https://github.com/HKUDS/nanobot/pull/5215

- **#5211** [OPEN] feat(session): add cross-session search and mentions  
  功能型 PR，需要更多的产品评审与测试覆盖。  
  https://github.com/HKUDS/nanobot/pull/5211

- **#5212** [OPEN] feat: add MiniMax music guidance  
  新增 MiniMax 音乐生成支持，需要确认与现有 provider 契约的兼容性。  
  https://github.com/HKUDS/nanobot/pull/5212

- **#5213** [OPEN] fix(plugins): use uv when pip is unavailable  
  插件安装易用性修复，覆盖面广但改动较小。  
  https://github.com/HKUDS/nanobot/pull/5213

---

**总体判断**：NanoBot 项目在 2026-08-03 呈现出“高迭代、低风险”的状态。没有新 Issue 洪峰，说明当前主分支相对稳定；大量 PR 集中修复真实用户场景中的兼容性问题和边缘故障，项目健康度良好。建议下一步优先合并 2 个 p1 级别的稳定性修复（#5214、#5215），并推进 #5211 的多会话功能产品化。

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报 — 2026-08-03

## 1. 今日速览

ZeroClaw 在过去 24 小时保持高活跃度：**50 条 Issue 更新**（37 条新开/活跃、13 条关闭）、**50 条 PR 更新**（40 条待合并、10 条已合并/关闭），并有 **v0.8.4 正式发布**（262 commits，49 位贡献者）。社区讨论重心集中在三个方向：**治理与流程自动化**（RFC #6808）、**OpenAI 协议兼容层**（RFC #8603）、以及 **安全边界加固**（P0 webhook 鉴权漏洞 #9565）。项目整体健康度良好，但 40 条待合并 PR 与多个 P1 bug 的积压是当前主要瓶颈。

## 2. 版本发布

### v0.8.4（维护与加固版）
- **规模**：262 commits，49 位贡献者，属于 v0.8.4 维护列车（tracker #8357 已关闭收官）。
- **主要内容**：
  - 扩展记忆（memory）与 SOP 控制平面
  - 提升 provider 与 channel 的可靠性
  - 强化 sandbox 与凭证（credential）边界
  - 改进桌面端与发布流水线
- **注意事项**：
  - 发布流水线暴露了 **MSRV 漂移问题**：`Containerfile` StageX 镜像仍固定 rustc 1.95.0，低于工作区要求的 1.96.1，导致 `all-features` Docker 变体发布失败。该问题已由 #9676 修复关闭，但根因跟踪见 #9690（进行中）。
  - 涉及 OAuth 凭证存储与 provider 路由的配置，建议升级前备份 `zeroclaw.toml`。

## 3. 项目进展

今日合并/关闭的关键 PR 主要集中于 **runtime 健壮性、provider 稳定性与 gateway 并发安全**：

- **Runtime 文本处理修复**：[PR #9037](https://github.com/zeroclaw-labs/zeroclaw/pull/9037)（closed）— 剥离流式响应中 provider 附加的 `<eom>` 终端标记，修复了 Zerocode Code 页显示原始标记的问题（#9006）。同日新开 [PR #9695](https://github.com/zeroclaw-labs/zeroclaw/pull/9695) 将该修复扩展到非流式路径，目前待合并。
- **Provider SSE 加固**：[PR #8838](https://github.com/zeroclaw-labs/zeroclaw/pull/8838)（closed）— 加固 OpenAI/Anthropic/compatible provider 的 SSE completion 与空闲超时处理，属于终端事件与超时策略的完整修复。
- **Gateway 配置写入并发安全**：[PR #9519](https://github.com/zeroclaw-labs/zeroclaw/pull/9519)（closed）— 序列化配置写入，避免 flush 操作在并发更新时覆盖数据。
- **Channel UX 改进**：[PR #9478](https://github.com/zeroclaw-labs/zeroclaw/pull/9478)（closed）— 回复意图预检（reply-intent precheck）拒绝时向发送者推送固定提示，修复 #9465；Telegram 等渠道不再显示"已读不回"的悬空状态。

整体来看，今日合入的变更以 **稳定性修复** 为主，项目正从 v0.8.4 的 feature-frozen 状态转向后续里程碑。

## 4. 社区热点

| Issue | 评论 | 主题 |
|---|---|---|
| [#6808](https://github.com/zeroclaw-labs/zeroclaw/issues/6808) | 17 | RFC：Work Lanes、Board 自动化与标签清理 |
| [#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603) | 15 | RFC：ZeroClaw Chat Completions profile（OpenAI 兼容） |
| [#7141](https://github.com/zeroclaw-labs/zeroclaw/issues/7141) | 9 | RFC：可插拔入站认证与规范化身份主体 |
| [#8303](https://github.com/zeroclaw-labs/zeroclaw/issues/8303) | 9 | RFC：目标模式（Goal mode）有界自主会话 |
| [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) | 8 | Tracker：维护者 RFC 决策队列 |

**热点诉求分析**：

- **治理自动化呼声最高**（#6808）：随着 RFC 数量激增，维护者希望用 Work Lanes 和 board 自动化减轻人工路由负担，这是项目规模扩张后的自然需求。
- **OpenAI 生态兼容是明确的用户刚需**（#8603）：Open WebUI、LobeChat、Continue.dev、Aider、LangChain 等客户端无法通过 WebSocket/ACP 直接接入，社区要求暴露 Chat Completions 协议。
- **安全架构进入决策期**（#7141/#7142）：围绕可插拔认证与运行时安全决策管线的讨论已持续两个月，维护者需要尽快定稿，以推进 v0.9.0 安全架构。

## 5. Bug 与稳定性

按严重程度排列：

- **[P0 / S0] 网关 webhook 未 fail-closed**：[#9565](https://github.com/zeroclaw-labs/zeroclaw/issues/9565) — WhatsApp Cloud、Linq、WATI 三个入站 webhook 处理器未鉴权即可向 agent 注入消息。**已有缓解**：[PR #9571](https://github.com/zeroclaw-labs/zeroclaw/pull/9571) 整体移除 WATI channel；WhatsApp Cloud 和 Linq 的鉴权修复仍在进行中。
- **[P1] Registry WIT pin 漂移**：[#9624](https://github.com/zeroclaw-labs/zeroclaw/issues/9624) — 插件 registry 的 WIT pin 与 master 不一致，导致已发布插件组件无法构建。状态：已接受（accepted），尚无修复 PR。
- **[P1] Containerfile rustc 版本低于 MSRV**：[#9690](https://github.com/zeroclaw-labs/zeroclaw/issues/9690) — `all-features` Docker 变体自 2026-07-08 起不可构建，v0.8.4 发布时暴露。状态：已接受、进行中。
- **[P1] cron add 帮助示例全部不可用**：[#9672](https://github.com/zeroclaw-labs/zeroclaw/issues/9672) — CLI help 中三个示例各有不同的失败原因，空状态提示还展示了第四种错误格式。状态：已接受，尚无修复 PR。
- **已关闭**：[#8578](https://github.com/zeroclaw-labs/zeroclaw/issues/8578)（daemon 启动失败不退出进程）、[#9465](https://github.com/zeroclaw-labs/zeroclaw/issues/9465)（precheck 拒绝无文本反馈）、[#9676](https://github.com/zeroclaw-labs/zeroclaw/issues/9676)（CI all-features Docker 发布恢复）。

## 6. 功能请求与路线图信号

今日活跃的 RFC 透露出 v0.9.0 的架构方向：

- **协议兼容层**：[#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603) Chat Completions profile — 若被接受，将极大降低第三方客户端接入门槛，预计优先级较高。
- **会话与附件统一**：[#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487)（runtime 持有会话生命周期）、[#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488)（统一附件架构）——将 WebSocket、Web 面板、渠道、ACP 均降级为传输适配器，是架构级重构信号。
- **长期任务模式**：[#8303](https://github.com/zeroclaw-labs/zeroclaw/issues/8303) Goal mode — 用户需要"从目标到完成/取消/预算耗尽"的有界自主执行，与 subagent、cron 互补。
- **可观测性与缓存策略**：[#9352](https://github.com/zeroclaw-labs/zeroclaw/pull/9352)（OTel cross-turn 关联，待合并）、[#8321](https://github.com/zeroclaw-labs/zeroclaw/issues/8321)（响应缓存策略）。

已有实现 PR 的配套功能将在后续合并后落地：Slack 线程上下文（#8969）、MCP 自定义 CA（#9405）、技能默认紧凑注入（#8313）。

## 7. 用户反馈摘要

从今日活跃的 Issue 评论中提炼：

- **维护者负担**（#6808）：维护者反馈手工路由 issue/PR 开销大，需要 board 自动化和标签清理机制，否则 RFC 审查进度会持续滞后。
- **生态接入门槛**（#8603）：用户期待用 OpenAI SDK 直接驱动 ZeroClaw，WebSocket/ACP 自定义协议阻碍了 Open WebUI 等工具链的集成。
- **任务模型缺失**（#8303）：交互式 turn 和 cron 之外，用户需要"一个目标跑到结束"的模式，带预算控制与暂停/恢复。
- **安全信任担忧**（#9565）：有用户指出 webhook 无需认证即可投递消息，"像在公网裸奔"，要求默认 fail-closed。
- **文档/CLI 质量影响实操**（#9672）：按官方 help 示例执行 cron add 全部报错，操作者质疑文档测试流程。
- **外部依赖的隐性风险**（#9644）：Lucid memory 连接器所依赖的上游项目在合并后 4 天即停更，社区重新审视依赖评估流程。
- **Windows 体验问题**（#8578）：Zerocode TUI 在自定义 socket 名启动失败后进程残留，用户需要明确的错误退出码。

## 8. 待处理积压

- **PR 队列**：目前 **40 条 PR 等待合并**，其中多标记 `needs-author-action`（等待作者回应），包括：#9352（OTel 关联）、#8943（Bedrock Nova 2 缓存）、#9571（移除 WATI）、#9002（viewer 断开后保持 agent turn）、#9281（配置回滚）、#9419（限流后凭证轮换）、#9477（`<tools>` 包裹的调用恢复）、#9399（Quickstart 终端宽度修复）。建议维护者集中清理 author-action 队列。
- **长期未决 RFC**：
  - [#6808](https://github.com/zeroclaw-labs/zeroclaw/issues/6808)（5 月创建，Work Lanes，已 17 条评论，仍在 ratification 阶段）
  - [#7141](https://github.com/zeroclaw-labs/zeroclaw/issues/7141) / [#7142](https://github.com/zeroclaw-labs/zeroclaw/issues/7142)（6 月创建，安全架构双 RFC，等待维护者定稿）
  - [#6998](https://github.com/zeroclaw-labs/zeroclaw/issues/6998)（5 月创建，记忆合并 schema 校验）
  - [#7232](https://github.com/zeroclaw-labs/zeroclaw/issues/7232)（6 月创建，结构化可观测性增强）
- **决策协调**：[#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) 作为维护者 RFC 决策队列的活跃 tracker，建议作为 triage 入口优先处理。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

## PicoClaw 项目动态日报 — 2026-08-03

### 1. 今日速览

过去 24 小时项目保持中等偏上的活跃度：3 条 Issue 更新、9 条 PR 更新，无新版本发布。值得肯定的是，Issue #3311（工具重复失败导致静默卡死）在报告后 24 小时内即有对应的修复 PR #3312 提交，社区响应速度较快。同时，修复 `customAllowPatterns` 失效的 PR #3313 被关闭后迅速以 #3314 重新迭代，表明维护者与贡献者之间的协作通道顺畅。需要注意：一批 7 月 26 日左右创建的 PR 和 Issue 已被标记为 `[stale]`，存在积压风险。

### 2. 版本发布

无新版本 Release。

### 3. 项目进展

今日已合并/关闭的 PR 共 3 条，实质性进展如下：

- **[#3261] Add zh-TW locale and Traditional Chinese translations（已合并/关闭）** — 台湾正体中文翻译已落地纳入项目，本地化范围从 WebUI 扩展至设置与引导文档。这标志着 i18n 路线图的进一步推进。 
  https://github.com/sipeed/picoclaw/pull/3261

- **[#3313] Fix: agent not able to execute shell command added to customAllowPatterns（已关闭）** — 修复 `guardCommand` 中默认拒绝策略始终优先于 `customAllowPatterns`，导致 `git push` 等已白名单命令无法执行的问题。该 PR 关闭后，作者以 #3314 重新提交了迭代版本，说明关闭可能源于流程或代码结构问题，而非内容问题。
  https://github.com/sipeed/picoclaw/pull/3313

- **[#3310] Feat/auto pr（已关闭）** — 描述为 "picoclanker did this"，推测是自动化脚本或 bot 触发的测试性 PR，关闭表明该流程仍在试验阶段，但从维护角度看，项目已开始尝试以自动化方式生成 PR，这有助于降低未来自动化集成的门槛。
  https://github.com/sipeed/picoclaw/pull/3310

整体来看，项目在本地化覆盖、命令执行安全边界、社区协作自动化三个方向上均有不同程度推进。

### 4. 社区热点

- **Issue #3298：请求将 AI Router 添加为 OpenAI 兼容的 provider 预设**（评论 1，创建 7 天）
  https://github.com/sipeed/picoclaw/issues/3298
  
  作者是 AI Router 的维护者，公开表达了贡献意愿。作者指出，用户目前可通过设置 `api_base` 指向 `https://api.ai-router.dev/v1` 来使用 AI Router，但缺少命名 provider 预设使该服务在配置体验上不友好。该诉求背后是"openai 兼容 provider 生态"的聚合入口问题，未来可能需要项目设计更通用的 provider 注册机制。

- **Issue #3311：相同工具反复失败时静默循环至 max_tool_iterations，用户得不到答案**（创建当日无评论，但直接催生了 PR #3312）
  https://github.com/sipeed/picoclaw/issues/3311

  已在线生产环境（Telegram）中观察到：让 agent 执行 `git` 命令，因缺少凭据导致反复调用同一工具、不断失败，直到达到 `max_tool_iterations` 上限，用户始终未收到任何回答。虽然该 Issue 起初评论数为 0，但其"生产环境真实用户可见影响"的属性让它成为今日讨论焦点，对应修复 PR #3312 已提交。

### 5. Bug 与稳定性

按严重程度降序排列：

- **高危：工具重复失败导致 agent 循环至 max_tool_iterations 且无响应（Issue #3311）**
  - 影响：生产环境用户请求长时间卡死，无任何错误反馈，体验严重受损
  - 状态：Issue 于 8 月 2 日创建，PR #3312 "stop turn early on repeated identical tool failure" 已提交，但待合并
  - 修复思路：检测到同一工具连续相同错误时提前终止本轮对话，而非无意义重试
  - Issue: https://github.com/sipeed/picoclaw/issues/3311 | PR: https://github.com/sipeed/picoclaw/pull/3312

- **高危：customAllowPatterns 白名单被默认拒绝规则覆盖（PR #3313 / #3314）**
  - 影响：用户配置的 exec 白名单命令（如 `git push`）无法执行
  - 状态：PR #3313 已关闭，新版 #3314 正在等待审查合并
  - 涉及安全边界与可用性的平衡，需要维护者优先评估
  - PR: https://github.com/sipeed/picoclaw/pull/3314

- **中危：/list models 只显示当前模型而非全部已配置模型（Issue #3294）**
  - 影响：命令名与描述均为"Configured models"，但实际仅输出当前模型和 provider，与用户预期不符
  - 状态：Issue 已 stale，目前无关联 PR 跟进修复
  - https://github.com/sipeed/picoclaw/issues/3294

- **低危：SplitMessage 在超大 fence 头部时挂起（PR #3295）**
  - 影响：特定条件下消息拆分会卡住，属于边缘场景但可复现
  - 状态：已有修复 PR（含回归测试）但已 stale 7 天，有待合入
  - https://github.com/sipeed/picoclaw/pull/3295

### 6. 功能请求与路线图信号

- **新增命名 Provider 预设（Issue #3298）** — 若项目决定吸收 AI Router 预设，预计会带动更多 OpenAI 兼容服务（如各种网关、聚合器）的接入需求，可能催生"provider 预设注册表"机制。短期内有较高纳入下一版本的可能性。
  https://github.com/sipeed/picoclaw/issues/3298

- **原生 Exa 网络搜索支持（PR #3299）** — 已实现 `tools.web` / `web_search` 的 Exa 后端，支持日期范围过滤。目前处于 `[stale]` 待处理状态，但功能完整，包含配置与文档，若维护团队时间允许，有望合入后续版本。
  https://github.com/sipeed/picoclaw/pull/3299

- **i18n 覆盖持续扩大** — 繁中（#3261 已合并）、捷克语（#3296）相继提交，说明本地化是社区贡献的热点方向。若无冲突，此类 PR 通常可快速合入。
  https://github.com/sipeed/picoclaw/pull/3296

- **远程 prompt 与执行边界安全加固（PR #3297）** — 涉及远程发送者信息规范化、远程执行默认禁用、schema v4 迁移等，属于安全底层的结构性调整。若合入，属于破坏性变更，需要配套迁移指南。目前处于 stale，但重要度不低。
  https://github.com/sipeed/picoclaw/pull/3297

### 7. 用户反馈摘要

从今日活跃的 Issue 中可提炼出三类真实用户痛点与场景：

- **工具执行失败时的透明度缺失（#3311）**：Telegram 用户请求"运行 git 命令"，agent 无凭据导致每次调用同一失败工具，但用户完全不知情，也没有错误回执。用户期望的是快速失败，并在尝试 1–2 次后向用户反馈错误原因，而不是静默空转数分钟。
  https://github.com/sipeed/picoclaw/issues/3311

- **命令命名与行为的一致性问题（#3294）**：用户明确表达"根据命令名和描述，我预期它能列出所有已配置模型"，而当实际输出与描述不符时，用户会更倾向于信任文档/命令名，而非当前行为。这类"语义偏差"虽不是崩溃级 Bug，但在机器人交互场景中直接影响用户对工具可靠性的判断。
  https://github.com/sipeed/picoclaw/issues/3294

- **provider 集成中的"能用但难用"问题（#3298）**：用户（AI Router 维护者）坦言现有配置方式可以工作，但命名预设缺失会提高使用门槛。反馈中隐含的诉求是：希望降低第三方 provider 接入的摩擦，让终端用户能"看见并选择"服务，而非手写 `api_base`。
  https://github.com/sipeed/picoclaw/issues/3298

### 8. 待处理积压

以下 PR/Issue 已被标记 `[stale]` 或长时间无响应，建议维护者关注：

| 类型 | 编号 | 标题 | 标签/状态 | 建议 |
|------|------|------|-----------|------|
| PR | #3297 | fix(security): harden remote prompt and exec boundaries | stale，7 天 | 安全相关且含破坏性变更，建议人工评估后明确合入计划或打回修订，避免长期悬挂 |
| Issue | #3294 | /list models 只显示当前模型 | stale + 中危 Bug | 用户可见的行为偏差，若短期无资源修复，至少应在文档中注明当前限制 |
| PR | #3299 | Add native Exa web search provider | stale | 新功能完整，可合入或要求 rebase；若短期不计划，请明确告知作者以免贡献流失 |
| PR | #3296 | i18n: complete Czech code wrap labels | stale | 本地化贡献通常低成本，建议快速 review 合入 |
| PR | #3295 | fix(channels): prevent SplitMessage hang on oversized fence headers | stale，有回归测试 | 稳定性修复，风险较低，建议安排尽快合并 |
| PR | #3312 | fix(agent): stop turn early on repeated identical tool failure | 新提交，待 review | 直接解决今日高危 Issue #3311，优先级较高，请尽快并入主干 |

如需完整信息，可访问仓库：https://github.com/sipeed/picoclaw

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 — 2026-08-03

## 1. 今日速览

过去24小时内，NanoClaw 项目共产生 1 条新 Issue、10 条 PR 动态（其中 3 条关闭/合并、7 条待合并），无新版本发布。值得关注的是，今日新开 issue #3177 报告了 Docker 跨挂载文件系统下严重的 SQLite 数据库锁竞争问题，累计造成 29,000+ 次 readonly 错误；与此同时，多条 PR 仍在待合并状态（含 2 条已积压近 3 周的渠道集成功能），项目整体处于**"功能开发活跃，合并审批相对滞后"**的状态。核心团队的多个修复 PR（#3175、#3176）在近两日内陆续提交/合入，表明维护者正在积极应对稳定性问题。综合评定：活跃度中等偏高，稳定性风险需关注。

---

## 2. 版本发布

**无新版本发布。** 最近一次 release 暂无数据。关注 PR #3176（fix: retry post-publish readback）的合入，该修复可能为发布流程的可靠性改进，预计会随下一个版本发布。

---

## 3. 项目进展

今日有 3 条 PR 关闭/合并，均为修复类，值得注意：

- **[#3176] fix(release): retry post-publish readback**（合入，core-team）— 修复发布后读回校验可能失败的问题，通过重试机制提升发布流程健壮性。该 PR 由核心团队成员提交，创建当日即合入，反映团队对发布工具链的重视。[查看 PR](https://github.com/nanocoai/nanoclaw/pull/3176)

- **[#301] feat(skill): enhance add-telegram skill with Markdown rendering, file downloads, and Linux/Docker guidance**（关闭，Type: Skill）— 虽然由今年 2 月提出，但最终关闭。该增强为 Telegram 渠道补充了 markdownToHtml() 渲染（HTML parse mode + 纯文本回退）、≤10MB 文件下载至指定目录的能力，以及 Linux/Docker 使用文档。此 PR 关闭意味着相关能力可能已通过其他方式合入，或决定不再推进。[查看 PR](https://github.com/nanocoai/nanoclaw/pull/301)

- **[#2626] fix(signal): replace silent restartService failure with explicit error**（关闭，fix）— 修复 `setup/channels/signal.ts` 中 `restartService()` 调用 `launchctl kickstart -k` 时将 stderr 重定向至 `ignore` 导致的静默失败问题。原本在 plist 未加载时调用会静默无操作，导致向导误报成功。此修复将该失败转为显式错误。关闭 Issue #2583。[查看 PR](https://github.com/nanocoai/nanoclaw/pull/2626)

⚠️ 另一个值得注意的信号：待合并 PR #3175（fix: route command-gate denials through delivery adapter）由 Joi 提交，修复了 `writeOutboundDirect()` 绕过会话管理器单写者原则、由宿主直接写入容器所属 `outbound.db` 的违规行为。**该 PR 与今日新报告的 #3177 数据库锁竞争问题直接相关**，但 #3175 尚未合入，需要维护者优先关注。

---

## 4. 社区热点

过去 24 小时的话题焦点较为分散，新 Issue #3177 虽尚无评论，但其问题性质严重（29,000+ 错误），预计将快速升温。

**最值得关注的热点候选：**

1. **[Issue #3177] Docker 跨挂载文件系统的会话数据库锁竞争** — 报告在 macOS/Linux 的 Docker VirtioFS 挂载环境下，SQLite 的 DELETE journal 模式无法在挂载边界正确传播，导致 inbound.db/outbound.db 频繁锁竞争，累计 29,000+ readonly 错误和间歇性投递失败。[查看 Issue](https://github.com/nanocoai/nanoclaw/issues/3177)

2. **[PR #3050 / #3041] Dial 渠道集成（channel + wizard/skills）** — 由第三方开发者提交的两条相关 PR（创建 7/14），意在为 NanoClaw 新增 Dial 渠道适配器，支持 SMS 和 AI 语音通话。虽非今日新动态，但在待合并队列中已积压约 3 周，反映了社区对新增渠道的期待与维护审查瓶颈之间的张力。[PR #3050](https://github.com/nanocoai/nanoclaw/pull/3050) | [PR #3041](https://github.com/nanocoai/nanoclaw/pull/3041)

---

## 5. Bug 与稳定性

按严重程度排列：

| 严重度 | 问题 | 状态 | 说明 |
|--------|------|------|------|
| 🔴 高 | **SQLite 数据库锁竞争（Docker 环境）** — [#3177](https://github.com/nanocoai/nanoclaw/issues/3177) | 新开，无评论，无 fix PR 认领 | 影响所有使用 Docker 挂载卷的 macOS/Linux 用户；29,000+ readonly 错误导致投递失败 |
| 🟠 中 | **command-gate 拒绝通知绕过单写者规则** — PR [#3175](https://github.com/nanocoai/nanoclaw/pull/3175) | 已有修复 PR，待合并 | `writeOutboundDirect()` 让宿主直接写入容器拥有的 outbound.db，违反单写者原则；seq 分配存在并发风险，与 #3177 同属数据库写入路径问题 |
| 🟡 低 | **发布后读回校验偶发失败** — PR [#3176](https://github.com/nanocoai/nanoclaw/pull/3176) | 已合入 | 通过重试机制缓解发布流程中的读回不稳定现象 |
| 🟢 已修复 | **Signal 渠道 restartService 静默失败** — PR [#2626](https://github.com/nanocoai/nanoclaw/pull/2626) | 已关闭 | 替换为显式错误输出 |

**重点风险提示**：#3177 反映了 NanoClaw 在 Docker/容器化部署场景下的一个系统性弱点——SQLite 在跨文件系统挂载下的行为一致性。建议维护者评估：(a) 将数据库默认 journal 模式改为 WAL；或 (b) 将数据库放置于容器内部卷而非绑定挂载；或 (c) 考虑为容器环境引入独立的数据库适配层。

---

## 6. 功能请求与路线图信号

以下是当前待合并 PR 所反映的路线图信号，按"可能纳入下一版本的可能性"排序：

| PR | 功能 | 状态 | 推测 |
|----|------|------|------|
| [#3092](https://github.com/nanocoai/nanoclaw/pull/3092) | 支持远程 Streamable HTTP MCP 服务器 | 待合并（core-team） | 核心团队主导，方向与 AI Agent 生态集成一致，合入概率高 |
| [#3090](https://github.com/nanocoai/nanoclaw/pull/3090) | 在所有顶级上下文 Markdown 前追加内容 | 待合并（core-team） | 核心团队主导，影响所有 skill 的上下文生成方式，可能伴随破坏性变更需关注 |
| [#3050](https://github.com/nanocoai/nanoclaw/pull/3050) / [#3041](https://github.com/nanocoai/nanoclaw/pull/3041) | 新增 Dial 渠道（SMS + AI 语音通话） | 待合并，积压 3 周 | 由社区开发者提交，功能完整但审批周期较长 |
| [#2625](https://github.com/nanocoai/nanoclaw/pull/2625) | Teams 渠道开启 `supportsFiles: true` | 待合并，积压 2.5 个月 | 修复 Teams 渠道无法双向传输文件的长期缺陷 |
| [#3172](https://github.com/nanocoai/nanoclaw/pull/3172) | 移除两个 qodo skills | 待合并（core-team） | 清理性变更，可能因维护策略调整而移入废弃流程 |

---

## 7. 用户反馈摘要

现有数据来自 Issue/PR 描述中的问题陈述，暂无直接的用户评论可供引用。从提交内容中提炼的"用户声音"如下：

- **Docker 环境用户正在遭遇实际投递故障**（Issue #3177）：一位用户在 Docker 挂载卷环境中运行 NanoClaw，遭遇大量 readonly 错误和间歇性消息投递失败（29,000+ 次），问题已严重到需要通过 GitHub Issue 公开报告的程度。这说明容器化部署正在成为真实用户的重要使用场景。

- **Teams 渠道的文件传输能力缺失**（PR #2625 描述，关闭 #2461）：现有实现对 `supportsFiles: false` 的硬编码，导致用户在个人聊天中看不到上传按钮，同时机器人侧的 `send_file` 投递被静默丢弃。**双向文件传输在团队协作工具中几乎属于刚需，此问题积压 2.5 个月得不到合并，可能意味着维护者对非核心渠道的修复优先级较低**。

- **telegram 渠道增强需求求而不得**（PR #301）：社区用户从 2 月就开始贡献 Markdown 渲染、文件下载、Linux/Docker 指南等增强，但该 PR 在 8 月才被关闭，最终是否合入尚不明朗。这可能代表第三方 skill 贡献的审核路径不够顺畅。

---

## 8. 待处理积压

> ⚠️ 提示：以下条目为跨越多日仍未合入/或被关闭的 PR，或可能需要维护者介入处理的 Issue。

**高优先级：**

- **[Issue #3177] Docker 跨挂载数据库锁竞争**（新开，无响应）— 严重程度高，涉及大量用户，应快速制定修复方案。[查看 Issue](https://github.com/nanocoai/nanoclaw/issues/3177)
- **[PR #3175] 路由 command-gate denials 通过 delivery adapter**（待合并）— 修复数据库单写者原则违反问题，与 #3177 同属数据库健康度改善，建议优先合入。[查看 PR](https://github.com/nanocoai/nanoclaw/pull/3175)

**中优先级（积压超 2 周）：**

- **[PR #3050] Dial 渠道选择器 + wizard/skills**（待合并，积压 20 天）[查看 PR](https://github.com/nanocoai/nanoclaw/pull/3050)
- **[PR #3041] Dial 渠道适配器（SMS + AI 语音通话）**（待合并，积压 20 天）[查看 PR](https://github.com/nanocoai/nanoclaw/pull/3041)
- **[PR #3090] 上下文 Markdown 前置**（待合并，积压 15 天，core-team）[查看 PR](https://github.com/nanocoai/nanoclaw/pull/3090)
- **[PR #3092] 远程 Streamable HTTP MCP 服务器支持**（待合并，积压 15 天，core-team）[查看 PR](https://github.com/nanocoai/nanoclaw/pull/3092)

**低优先级（积压超 1 个月，需维护者决策）：**

- **[PR #2625] Teams 渠道开启 `supportsFiles`**（待合并，积压 2.5 个月）— 建议明确合入计划或告知关闭原因。[查看 PR](https://github.com/nanocoai/nanoclaw/pull/2625)

---

*报告生成时间：2026-08-03 · 数据来源：[NanoClaw GitHub 仓库](https://github.com/nanocoai/nanoclaw)*

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目日报 — 2026-08-03


## 1. 今日速览

过去 24 小时项目非常活跃：7 条 Issue 更新（6 条新开、1 条关闭），31 条 PR 更新（22 条待合并、9 条已合并/关闭），无新版本发布。QA 团队（theredspoon）连续提交了 5 条高价值稳定性报告，覆盖投递恢复竞态、代理绕过 SSRF 防护、并发协调器重复发送等深水区问题；核心贡献者 BenKurrek 则集中推进 Wave 2 架构决策文档与 `llm_costs` 生产缺口。当日无 Release，但 Wave 2 端口反转栈已合并（#7018），CI 覆盖率门槛修复（#7013）与测试范围规划（#6952）也已落地。整体判断：**项目处于高活跃度、高强度架构收敛与稳定性加固并存的状态**，唯需警惕多个高严重性生产问题尚未修复。


## 2. 版本发布

当日无新版本发布。


## 3. 项目进展

当日共 9 条 PR 被合并/关闭，最重要的 3 条如下：

| PR | 标题 | 说明 |
|---|---|---|
| [#7018](https://github.com/nearai/ironclaw/pull/7018) | refactor(contracts): consolidate the Wave 2 port-inversion stack (WS2.2, WS2.4, WS5) | 将 WS2.1、WS2.5 传输层、WS2.2/WS2.4/WS5 整合为单分支合入 `main`，取代了原先四步合并级联。Wave 2 端口反转架构正式落地 |
| [#7013](https://github.com/nearai/ironclaw/pull/7013) | ci: restore the original 90% changed-line coverage floor | 恢复变更代码 90% 覆盖率门槛，同时保留 fail-closed 行为，避免覆盖率门禁形同虚设 |
| [#6952](https://github.com/nearai/ironclaw/pull/6952) | ci: scope Reborn PR tests by affected area | 新增确定性受影响区域规划器，按变更包+全传递闭包精确计算 PR 测试范围，显著降低 CI 开销 |

此外，[#7033](https://github.com/nearai/ironclaw/pull/7033)（Wave 2 架构决策裁定）与 [#7032](https://github.com/nearai/ironclaw/pull/7032)（决策记录与 main 对齐审计）为待合并的文档型 PR，显示架构治理正在系统化。


## 4. 社区热点

当日 PR/Issue 评论数普遍偏低（数据中多数评论数为空），但以下两组 PR/Issue 形成了明显的关注群：

**热点一：投递可靠性系列（#7025/#7017 → #7028/#7029）**
- [Issue #7025](https://github.com/nearai/ironclaw/issues/7025)：并发 coordinators 可重复发送同一持久化投递
- [Issue #7017](https://github.com/nearai/ironclaw/issues/7017)：中断恢复可覆盖并发 Delivered 状态
- 对应修复：[PR #7028](https://github.com/nearai/ironclaw/pull/7028)（保留终态）与 [PR #7029](https://github.com/nearai/ironclaw/pull/7029)（恢复持久化投递 claim）

这是当日最核心的讨论主题：**持久化投递的所有权边界与状态机一致性**，直接关系到系统在崩溃恢复场景下的正确性。

**热点二：生产预算缺口（#7035）**
- [Issue #7035](https://github.com/nearai/ironclaw/issues/7035)：模型预算执行未接入生产环境，每日 USD 上限自 #6174 后即失效。由核心成员 BenKurrek 在调研 `ModelCostTable` 架构决策时发现并单独立案，措辞明确指向"live production gap"，预计将优先处理。


## 5. Bug 与稳定性

按严重程度排序：

| 严重度 | Issue | 问题 | 状态 |
|---|---|---|---|
| 🔴 高 | [#7035](https://github.com/nearai/ironclaw/issues/7035) | 模型 USD 预算在生成环境未被强制执行，`RebornLoopDriverHostFactory` 未接入预算校验，自 #6174 起每日上限失效 | 无 fix PR |
| 🔴 高 | [#7025](https://github.com/nearai/ironclaw/issues/7025) | 并发 coordinator 可同时发送同一持久化投递，破坏单飞语义 | [PR #7029](https://github.com/nearai/ironclaw/pull/7029) 修复 |
| 🔴 高 | [#7017](https://github.com/nearai/ironclaw/issues/7017) | 中断恢复路径可覆盖并发写入的 Delivered 终态 | [PR #7028](https://github.com/nearai/ironclaw/pull/7028) 修复 |
| 🔴 高 | [#7016](https://github.com/nearai/ironclaw/issues/7016) | 环境代理变量将绕过 ReqwestNetworkTransport 的 DNS-rebinding/SSRF 防护 | [PR #7027](https://github.com/nearai/ironclaw/pull/7027) + [PR #7034](https://github.com/nearai/ironclaw/pull/7034) 修复 |
| 🟡 中 | [#7031](https://github.com/nearai/ironclaw/issues/7031) | 惰性投递恢复失败后，在 coordinator 生命周期内不会重试 | 无 fix PR |
| 🟡 中 | [#7030](https://github.com/nearai/ironclaw/issues/7030) | 宿主介导出口忽略环境代理变量，但 operator 诊断未报告 | [PR #7034](https://github.com/nearai/ironclaw/pull/7034) 修复 |
| 🟢 低 | [#7015](https://github.com/nearai/ironclaw/issues/7015) | Staking 页面 UI bug（已关闭，无截图/复现步骤） | 已关闭 |

稳定性小结：最严重的是 **预算失效（#7035）**——直接影响收入与成本控制；其次是 **投递一致性（#7025/#7017）** 和 **SSRF 防护绕过（#7016）**，三者均为高价值修复，前两者的 PR 已就绪。


## 6. 功能请求与路线图信号

当日无典型新功能需求，但以下 PR 隐含明确的路线图方向：

1. **网络传输硬化** — [PR #7027](https://github.com/nearai/ironclaw/pull/7027) 彻底禁用 reqwest 系统代理发现，使钉住的目地地址成为唯一权威；[PR #7034](https://github.com/nearai/ironclaw/pull/7034) 在 `doctor` 诊断中报告被忽略的代理设置。方向：**安全优先的出口网络策略**。
2. **持久化投递声明的单一权威** — [PR #7029](https://github.com/nearai/ironclaw/pull/7029) 以 `Prepared → Sending` CAS 为唯一所有权权威，移除进程内 `in_flight`。方向：**跨进程/跨协调器的状态一致性收敛**。
3. **架构决策制度化** — [PR #7033](https://github.com/nearai/ironclaw/pull/7033) 以"agent under explicit owner delegation"方式裁定 8 项悬而未决的架构决策，[PR #7032](https://github.com/nearai/ironclaw/pull/7032) 审计决策记录与 main 对齐。方向：**AI 辅助的架构治理流程正式化**。
4. **依赖现代化** — 5 个 Dependabot PR（#7023/#7021/#7022/#7020 等）覆盖 Rust、WebAssembly、GitHub Actions 依赖，其中 `actions/setup-node` 跨越 4.0.2→7.0.0 大版本升级，需关注兼容性。


## 7. 用户反馈摘要

当日 Issue 评论数据有限（仅 #7015 有 1 条评论），但 QA 工程师 theredspoon 提交的 5 条详细报告，本身即为高质量的用户/测试反馈：

- **痛点一：状态不可信**（#7017/#7025）——系统在"中断恢复"与"并发协调"双重压力下，投递状态会互相覆盖或重复发送。用户侧可能看到"已投递"状态被回滚、或同一消息被多次发送给最终用户。修复方向已明确（CAS 守卫 + 单飞）。
- **痛点二：安全边界被环境变量击穿**（#7016）——部署环境中设置 `HTTP_PROXY` 等变量后，SSRF/DNS-rebinding 防护被静默绕过。对于自主 AI 代理场景，这是严重的安全信任缺口。
- **痛点三：诊断盲区**（#7030）——`doctor` 命令不报告"代理变量被忽略"这一事实，导致运营者以为代理已生效、实际网络路径却不可控。
- **痛点四：成本失控风险**（#7035）——预算上限形同虚设，对于按量计费的用户是直接的经济损失风险。
- **正面信号**：#7015 用户反馈 UI bug 时未附带截图/复现步骤即被关闭，反映 Issue 质量门槛有待引导（或需要机器人自动索要补充信息）。


## 8. 待处理积压

| 项目 | 时间 | 说明 |
|---|---|---|
| [PR #5981](https://github.com/nearai/ironclaw/pull/5981) | 2026-07-11 起 | **已挂起 23 天**。Reborn queued-message steering 大型 PR（XL），已移植至当前 main 并修复回合边界竞态，仍待合并 |
| [PR #5598](https://github.com/nearai/ironclaw/pull/5598) | 2026-07-03 起 | **已挂起 31 天**。自动 Release PR（含 `ironclaw_common` 0.5.0 与 `ironclaw_skills` 0.4.0 的破坏性变更），长期未合并可能导致版本积压 |
| [PR #6917](https://github.com/nearai/ironclaw/pull/6917) | 2026-07-30 起 | WebUI 工作区文件链接鉴权预览（XL），已 4 天未合并 |
| [PR #6906](https://github.com/nearai/ironclaw/pull/6906) | 2026-07-30 起 | Projects 页仅展示 API 真实数据（L），移除伪造指标，已 4 天未合并 |

**维护者关注建议**：① #7035（预算失效）应提为 P0 并优先分配；② #7028/#7029 两个修复 PR 建议尽快合入并发布补丁版本；③ #5981 与 #5598 均为长期积压，建议明确时间表或关闭策略；④ 当日 22 条待合并 PR 中 5 条为 Dependabot 依赖更新，建议集中批量处理以降低技术债。


*本日报基于 IronClaw GitHub 公开数据（2026-08-03 快照）自动生成，仅供参考。*


</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-08-03

---

## 1. 今日速览

今日 LobsterAI 项目无新版本发布，新增 Issue 和 PR 均为 0；GitHub 自动 stale 机制标记了 3 个历史 Issue 与 6 个历史 PR，其中 2 个 Issue 和 2 个依赖更新 PR 被关闭。当前有 1 个待处理 Bug 和 4 个待合并的功能/修复 PR 处于长期未响应状态。总体活跃度偏低，项目正处于维护平稳期，近三个月社区提交有所停滞，但 Pending PR 的技术含量较高，值得关注后续合并动态。

---

## 3. 项目进展

今日无 PR 被合并。以下 4 个 PR 处于待合并状态（均自 2026-04-01 起未获更新，带有 stale 标记），其内容涉及近期社区呼声较高的功能与性能改进：

- **[PR #1218] fix(定时任务): 重构任务列表排序规则** — 解决新建任务随机出现在列表中间、启用/禁用任务混排的问题，将排序规则从"UUID 随机序"改为"创建时间/执行时间序"。
  https://github.com/netease-youdao/LobsterAI/pull/1218

- **[PR #1219] perf(cowork): 消除会话列表和详情页的无效重渲染** — 通过添加 `React.memo` 与合并 `useSelector` 调用，减少流式输出时的无效渲染。
  https://github.com/netease-youdao/LobsterAI/pull/1219

- **[PR #1220] perf(cowork): 消除 recentChats/conversationSearch 的 N+1 查询** — 优化每个会话独立查询最新消息的逻辑，改为批量查询，预期显著提升会话列表加载速度。
  https://github.com/netease-youdao/LobsterAI/pull/1220

- **[PR #1215] fix(im): 修复平台凭据保存后 chat handler 未刷新** — 解决保存钉钉/Telegram 等 IM 平台配置后 `systemPrompt` 等设置不生效的问题。
  https://github.com/netease-youdao/LobsterAI/pull/1215

此外，2 个依赖更新 PR（`concurrently` 8→9、`tailwindcss` 3→4）已被 stale 自动关闭，未能完成升级，说明依赖维护流程需要人工介入。

---

## 4. 社区热点

今日评论量最高的 Issue 均来自历史遗留，反映两个方面的社区诉求：

- **[Issue #1287] IM 机器人连通性测试形同虚设**（评论 2）  
  用户指出在设置-IM机器人中对 popo 进行连通性测试时，appkey、appsecret、aes key 全填 1 也能通过测试。这一反馈直接质疑了配置校验逻辑的严谨性，属于用户信任度问题。
  https://github.com/netease-youdao/LobsterAI/issues/1287

- **[Issue #1289] 长代码块折叠/展开功能建议**（评论 2）  
  用户建议为 15~200 行的代码块增加自动折叠/展开功能，以改善 AI 输出超长代码时的阅读体验。属于 UI/UX 层面的产品诉求，讨论热度较高。
  https://github.com/netease-youdao/LobsterAI/issues/1289

- **[Issue #1217] 偶发网关重启 Bug**（评论 1）  
  用户反馈使用过程中每天偶发 3-5 次网关自动重启，并附带了日志文件，属于影响正常使用的稳定性问题。
  https://github.com/netease-youdao/LobsterAI/issues/1217

---

## 5. Bug 与稳定性

按严重程度排列：

| 严重程度 | Issue | 描述 | 状态 | 对应 Fix PR |
|---|---|---|---|---|
| 🟠 高 | [#1217] 运行过程中偶发启动网关 | 每天 3-5 次网关自动重启，影响正常使用，Win10 环境 | 打开中，1 条评论，无维护者回复 | 无 |
| 🟡 中 | [#1287] IM 机器人连通性测试校验缺陷 | appkey/appsecret/aes key 全填 1 也能测试连接通过 | 已关闭（stale），未修复 | 无 |
| 🟡 中 | [#1215] IM 平台配置保存后 chat handler 未刷新 | 保存钉钉/Telegram 凭据后 `systemPrompt` 等设置不生效 | PR 待合并 | [PR #1215]（已提交，待合并） |

https://github.com/netease-youdao/LobsterAI/issues/1217 | https://github.com/netease-youdao/LobsterAI/issues/1287 | https://github.com/netease-youdao/LobsterAI/pull/1215

其中 **#1217 网关重启问题** 目前无任何维护者响应，且日志文件已上传 4 个月，风险较高。

---

## 6. 功能请求与路线图信号

- **长代码块折叠/展开**（Issue #1289，已关闭）：
  高票 UX 优化需求，建议为 15~200 行代码块增加自动折叠/展开能力。该 Issue 同时给出详细实现方案，并点名 `MarkdownContent.tsx` 的 `CodeBlock` 组件，开发成本可控，具备纳入下一版本的条件。
  https://github.com/netease-youdao/LobsterAI/issues/1289

- **定时任务列表排序优化**（PR #1218）：
  对应功能请求为"新建任务应出现在可见位置、区分启用/禁用任务"。该 PR 已提供完整实现，核心是改用 `nextRunAtMs` 与创建时间排序。若合并，将直接提升定时任务模块的可用性。
  https://github.com/netease-youdao/LobsterAI/pull/1218

- **会话列表性能优化**（PR #1219 + #1220）：
  面向大规模会话场景的社区优化方案，消除无效重渲染与 N+1 查询。反映了社区用户对当前聊天页面在流式输出场景下卡顿/延迟的痛点。两个 PR 属于同一贡献者，质量较完整，合入后能有效提升大规模使用体验。
  https://github.com/netease-youdao/LobsterAI/pull/1219 | https://github.com/netease-youdao/LobsterAI/pull/1220

---

## 7. 用户反馈摘要

- **IM 配置信任度受到质疑**：
  在 Issue #1287 中，用户发现 IM 机器人的连通性测试完全不校验参数真实性（全填 1 也能通过），暗示对 LobsterAI 配置验证机制的信任降低。

- **超长代码块影响阅读效率**：
  Issue #1289 的提出者表示，AI 输出的 15~200 行代码块会占满整个会话视图，用户需要大量滚动，严重影响对话阅读体验。这侧面说明当前 AI 输出场景下，代码块渲染交互设计不足。

- **网关自动重启干扰工作流**：
  Issue #1217 用户明确表示"偶发重启网关"已影响正常使用，且复现频率较高（每日 3-5 次），说明该 Bug 对重度用户的干扰已超出可容忍范围。

- **用户对响应速度的隐性质疑**：
  多个重要 Issue/PR 已超过 4 个月未有维护者实质回复或操作，仅被 stale 机器人标记，社区可能对项目的维护活跃度感到失望。

---

## 8. 待处理积压

以下 Issue/PR 长期未获维护者响应，建议优先关注：

| 类型 | 编号 | 摘要 | 等待时长 | 建议 |
|---|---|---|---|---|
| Bug | [#1217] 偶发启动网关 | 影响正常使用，有日志但无回复 | 4 个月 | 优先安排复现与排查 |
| PR | [#1215] IM chat handler 重建修复 | 修复配置不生效问题 | 4 个月 | 应尽快 Code Review 并合并 |
| PR | [#1218] 定时任务排序重构 | 完善定时任务列表体验 | 4 个月 | 建议纳入后续版本 |
| PR | [#1219] 会话列表重渲染优化 | 性能提升 PR | 4 个月 | 建议合并 |
| PR | [#1220] N+1 查询优化 | 性能提升 PR | 4 个月 | 建议合并 |
| Issue | [#1287] IM 连通性测试校验缺陷 | 用户信任度问题 | 4 个月 | 确认 Bug 后以 fix PR 响应 |

https://github.com/netease-youdao/LobsterAI/issues/1217 | https://github.com/netease-youdao/LobsterAI/pull/1215 | https://github.com/netease-youdao/LobsterAI/pull/1218 | https://github.com/netease-youdao/LobsterAI/pull/1219 | https://github.com/netease-youdao/LobsterAI/pull/1220 | https://github.com/netease-youdao/LobsterAI/issues/1287

---

## 项目健康度小结

| 维度 | 状态 | 说明 |
|---|---|---|
| 活跃度 | 🔴 低 | 24h 内无新增 Issue/PR，无合并，无发布 |
| 维护响应 | 🔴 严重滞后 | 4 个功能/修复 PR 等待 4 个月未获处理 |
| 稳定性 | 🟡 中风险 | 网关重启 Bug 未解决，IM 校验逻辑存在漏洞 |
| 社区供给 | 🟢 仍可信 | 外部贡献者持续提供高质量性能优化与 Bug 修复，说明社区仍有投入意愿 |

核心风险在于 **维护者响应严重滞后** 导致 PR 堆积与 Issue 被 stale 清理，若这种状态持续，将削弱外部贡献者信心。建议优先处理 #1217 网关重启与 #1215 IM 配置修复，并尽快合入 4 个待合并 PR。

> 数据时间范围：2026-08-02 至 2026-08-03 | 数据源：github.com/netease-youdao/LobsterAI

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 — 2026-08-03

## 1. 今日速览

Moltis 项目今日整体活跃度较低，并无新 Issues 提交、关闭或新版本发布，仅有 1 条 PR 进入待合并状态，表明当前处于功能开发的中期沉淀阶段。该 PR 由社区贡献者提交，针对 MCP（Model Context Protocol）服务器管理引入了一套重量级功能，涉及 Git 仓库、认证传输与 Web UI 工作流，跨度较大，可能成为下一阶段的核心能力。尽管 Issue 侧静默，但 PR 的推进说明项目仍保有持续的外部贡献输入。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日没有 PR 被合并或关闭，但新增了一例待合并的 PR，值得关注：

- [PR #1183 [OPEN] feat(mcp): add managed repository bundles](https://github.com/moltis-org/moltis/pull/1183) — 作者：penso，创建于 2026-08-02，更新于 2026-08-03
  - 该 PR 为 MCP 服务器管理引入了“受管理 Git 仓库捆绑包”，计划支持发现、预览、安装、更新与删除 MCP 服务器。
  - 覆盖的功能面很广：HTTPS Git 凭据、SSH 传输、vault 生命周期集成、导入仓库后端的 MCP 配置，并包含 CLI、RPC、Web UI 工作流和数据库迁移。
  - 如果该 PR 被合并，将显著提升 MCP 服务器的可运维性与可扩展性，为后续的多源部署与安全集成打下基础。

## 4. 社区热点

今日公开讨论热度较低，仅有 1 条活跃的 PR，且尚无评论：

- [PR #1183](https://github.com/moltis-org/moltis/pull/1183) — 核心热点：该 PR 所涉及的功能范围覆盖了 MCP 服务器的整个生命周期管理，并且把底层 Git 认证、SSH 传输、vault 生命周期等基础设施都纳入统一管理中。反映出社区对更自动化、更安全、可审计的 MCP 服务器管理流程存在较强诉求。

## 5. Bug 与稳定性

今日无新 Bug、崩溃或回归报告记录在案。项目稳定性表面正常，但由于 Issues 侧全部静默，无法排除遗漏或上报延迟的可能。

## 6. 功能请求与路线图信号

虽然无新增 Issue 提出明确功能请求，但从 PR #1183 的提交内容可识别出以下可能进入路线图的方向：

- MCP 服务器的集中化/仓库化管理（discover/preview/install/update/remove）
- Git 凭据管理（HTTPS & SSH）
- 与 vault 生命周期集成
- CLI、RPC、Web UI 三层一致的工作流支持
- 数据库迁移引入（表明底层数据模型将随之变更）

这些信号若被维护者采纳，将推动 Moltis 在 MCP Server 运维层进一步走向成熟，并向企业级安全能力靠拢。

## 7. 用户反馈摘要

今日无新 Issues 及 PR 评论可供提炼用户反馈。仅从 PR #1183 的代码改动范围推断，贡献者关注的是当前 MCP 服务器管理流程中缺少的自动化、可移植性和安全集成能力。待合并后，若用户反馈逐步增加，可进一步验证产品方向是否贴合实际使用场景。

## 8. 待处理积压

当前仓库暂无长期未响应的公开 Issue 或 PR。唯一值得关注的是 [PR #1183](https://github.com/moltis-org/moltis/pull/1183) 已开放超过 24 小时仍处于待合并状态，建议维护者及时评审并反馈意见，避免大型改动长期搁置导致社区贡献动力下降。

---

*数据统计时间范围：2026-08-02 至 2026-08-03 | 数据来源：GitHub API*

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目日报 — 2026-08-03

> 数据统计区间：2026-08-02 ~ 2026-08-03（GitHub 事件时间）

---

## 1. 今日速览

过去 24 小时 CoPaw（QwenPaw）保持**高活跃度**：12 条 Issue 更新（9 条新开/活跃、3 条关闭），28 条 PR 更新（9 条合并/关闭、19 条待合并），未发布新版本。整体健康度**良好但存在结构性风险**：一方面维护者对 Bug 修复响应迅速，如 #6637、#6639 两个 PR 当日创建当日关闭，快速解决了 UI 冻结和编辑器光标错位问题；另一方面出现了代理与 `agentscope 2.0.4.post1` 的兼容性崩溃群（#6612、#6619），且多个 first-time-contributor 的修复 PR 仍滞留待审，#6302 等长周期功能 PR 已积压 13 天。项目正处于 v2.0.1 发布后的密集修 bug、清欠账阶段。

---

## 2. 版本发布

过去 24 小时**无新版本发布**，当前最新版本仍为 **QwenPaw v2.0.1**（桌面版 / pip 安装）。建议关注 agentscope 兼容性修复合入后的 v2.0.2 patch 进度。

---

## 3. 项目进展

今日共关闭/合并 9 条 PR（明细可见其中 4 条），主要集中在 Bug 修复与稳定性加固，未见重大功能合入。

**已关闭/合并 PR 明细：**

- [PR #6639](https://github.com/agentscope-ai/QwenPaw/pull/6639) `fix(console): stop stubbing node_modules CSS in real builds` — 修复了 CSS-stub 插件在生产构建中错误清空 monaco-editor 样式、导致编辑器光标异常偏移的问题（关闭 [#6547](https://github.com/agentscope-ai/QwenPaw/issues/6547)）
- [PR #6637](https://github.com/agentscope-ai/QwenPaw/pull/6637) `Fix/console large tool output UI freeze` — 为大型工具输出增加显示保护（>100KB 或 >1000 行时跳过语法高亮、仅显示首尾段落），修复控制台 UI 冻结（关闭 [#6589](https://github.com/agentscope-ai/QwenPaw/issues/6589)）
- [PR #6640](https://github.com/agentscope-ai/QwenPaw/pull/6640) `feat(creator): rejection feedback loop...` — 同日被关闭，同标题的 [PR #6641](https://github.com/agentscope-ai/QwenPaw/pull/6641) 重新开启，推测为重复提交或分支替换，需维护者确认
- [PR #6521](https://github.com/agentscope-ai/QwenPaw/pull/6521) `fix(console): surface OMP loop modes in slash menu` — 为 console 斜杠菜单补全 OMP `/ultrawork` 等 loop/plugin 模式，附带 i18n 与 Markdown 渲染支持

> ⚠️ 另有 5 条已关闭/合并 PR 未在当前数据列表中展开，暂无法评估内容。

---

## 4. 社区热点

**#6537 技能标签重启丢失（11 条评论，今日关闭）**
[Issue #6537](https://github.com/agentscope-ai/QwenPaw/issues/6537) 是过去 24 小时讨论最激烈的议题：用户通过 `PUT /skills/pool/{name}/tags` 保存的 Skill tags 在重启后被清单 reconcile 逻辑冲掉。这是 [#3270](https://github.com/agentscope-ai/QwenPaw/issues/3270) 的回归，牵涉配置持久化的一致性。虽然该 Issue 今日已关闭，但 11 条评论侧面说明**用户对自定义配置的可靠性有极高敏感度**，建议维护者补一个回归测试防止再次复发。

**#6612 vs #6619：agentscope 兼容性故障群（各 1-2 条评论）**
[#6612](https://github.com/agentscope-ai/QwenPaw/issues/6612) 与 [#6619](https://github.com/agentscope-ai/QwenPaw/issues/6619) 均指向 `qwenpaw==2.0.1` 搭配 `agentscope==2.0.4.post1` 时的 API 变更不兼容（`Msg.content` 类型变更、`ToolCallBlock` 缺少 `extra_content` 字段）。前者会导致 proactive 子系统崩溃和工具权限死锁，后者会在 Gemini 流式响应携带 thought 签名时全量崩溃。依赖锁定与版本同步是本轮社区反馈最集中的技术债。

**中文用户社区活跃**
#6589、#6624、#6621、#6565 四条 Issue 均为中文反馈，问题描述详实、附有复现步骤与环境信息，体现中文用户群体已成为重要的质量反馈来源。

---

## 5. Bug 与稳定性

按严重程度分级（🔴 Critical / 🟠 High / 🟡 Medium / 🟢 Low）：

### 🔴 Critical
- **[#6612](https://github.com/agentscope-ai/QwenPaw/issues/6612) agentscope 2.0.4.post1 不兼容：proactive 崩溃 + 工具权限死锁** — `Msg.content` 类型变更导致 proactive 子系统直接 crash；tool-permission 在特定 agent 组合下出现死锁。**有修复 PR [#6615](https://github.com/agentscope-ai/QwenPaw/pull/6615)（first-time-contributor，待合并）**
- **[#6619](https://github.com/agentscope-ai/QwenPaw/issues/6619) `ToolCallBlock` 缺少 `extra_content` 字段导致流式崩溃** — Gemini thought_signature relay 时 pydantic 校验失败，每一次流式调用都会崩溃。**有修复 PR [#6620](https://github.com/agentscope-ai/QwenPaw/pull/6620)（待合并）**

### 🟠 High
- **[#6565](https://github.com/agentscope-ai/QwenPaw/issues/6565) `execute_shell_command` 两个缺陷：换行折叠为空格 + PIPE 模式后台进程卡死** — 引号外换行被替换为空格导致多行命令语义改变；Linux `stdout=PIPE` 时后台进程继承 fd 使 `communicate()` 永久阻塞。**有修复 PR [#6566](https://github.com/agentscope-ai/QwenPaw/pull/6566)（待合并）**
- **[#6625](https://github.com/agentscope-ai/QwenPaw/issues/6625) ACP `delegate_external_agent` 偶发返回空文本** — `session/update` 通知与 `session/prompt` 响应同包到达时，prompt future 被 inline 解析，导致文本输出丢失。**有修复 PR [#6623](https://github.com/agentscope-ai/QwenPaw/pull/6623)（first-time-contributor，待合并）**
- **[#6624](https://github.com/agentscope-ai/QwenPaw/issues/6624) Scroll 自动压缩不触发 `summarize_when_compact` 记忆流程** — 手动 `/compact` 可触发，自动 eviction 不触发，记忆功能行为分裂。**有修复 PR [#6629](https://github.com/agentscope-ai/QwenPaw/pull/6629)（待合并）**

### 🟡 Medium（已有修复/已关闭）
- [#6589](https://github.com/agentscope-ai/QwenPaw/issues/6589) 大输出 UI 冻结 → ✅ 已由 [#6637](https://github.com/agentscope-ai/QwenPaw/pull/6637) 修复关闭
- [#6547](https://github.com/agentscope-ai/QwenPaw/issues/6547) Coding Mode 光标错位 → ✅ 已由 [#6639](https://github.com/agentscope-ai/QwenPaw/pull/6639) 修复关闭
- [#6537](https://github.com/agentscope-ai/QwenPaw/issues/6537) Skill tags 重启丢失 → ✅ 今日关闭（建议补充回归测试）

### 🟢 Low / 性能
- **[#6635](https://github.com/agentscope-ai/QwenPaw/issues/6635) & [#6633](https://github.com/agentscope-ai/QwenPaw/issues/6633) 慢网络下 Console 页面超时** — 列表接口一次性返回 MB 级未压缩数据（聊天历史 / 技能列表），前端 30s 固定超时导致页面完全不可用。**#6635 的 chat history 部分已有分页 + GZip 修复 PR [#6636](https://github.com/agentscope-ai/QwenPaw/pull/6636)（待合并），skills 部分尚未有对应修复**
- [#6626](https://github.com/agentscope-ai/QwenPaw/issues/6626) CI `Real behavior proof` gate 会完全剥离 fenced 代码块证据，导致仅包含 terminal transcript 的 PR 无法通过 — 属于流程 bug，影响贡献者体验

---

## 6. 功能请求与路线图信号

以下 Issue/PR 释放了下一版本的潜在路线图信号：

- **[#6621](https://github.com/agentscope-ai/QwenPaw/issues/6621) 多智能体协作引导缺失** — 用户反馈 Default Agent 不会自动调用其他已创建 Agent，文档也未说明需在 PROFILE.md 显式声明。这是一个 **onboarding / 可发现性**方向的需求，预计会推动多智能体自动调用或 UI 引导改进
- **[PR #6525](https://github.com/agentscope-ai/QwenPaw/pull/6525) 用户上下文透明穿透（Chat API → Agent → Tool → MCP → SKILL CLI）** — 已在 7-28 提出，全程程序化传参、LLM 不可见。面向多租户 / 业务集成场景，功能价值高，目前仍在 review
- **[PR #6302](https://github.com/agentscope-ai/QwenPaw/pull/6302) 统一 provider discovery、模型元数据、路由与控制** — 大跨度架构改动（对应 #6167），已开放 13 天，若合入将是 v2.1 的重要基础
- **[PR #6641](https://github.com/agentscope-ai/QwenPaw/pull/6641) creator 拒绝反馈闭环 + overlay stacking + 结构化日志** — 创作器（creator）子系统的场景化增强，说明项目在强化 AI 内容创作工作流的生产级能力
- **[PR #6543](https://github.com/agentscope-ai/QwenPaw/pull/6543) OneBot 出站文本与本地媒体发送改进** — QQ/OneBot 渠道体验优化，对国内社交渠道集成用户有实际价值
- **[PR #6550](https://github.com/agentscope-ai/QwenPaw/pull/6550) AI review bot 增强** — 预计算文件变更映射，减少误报、提高 merge-blocker 检出率，属于 CI 基础设施迭代

---

## 7. 用户反馈摘要

从今日 Issue 描述与评论中可提炼以下真实用户痛点：

1. **配置持久化信任危机**（#6537）：用户已通过 API 正确保存的 tags 在重启后丢失，"设置会消失"对用户信心打击极大，尤其是日常依赖 Skill 工作流的用户
2. **工具输出极端场景未防护**（#6589）：当 `execute_shell_command` 产生数万行输出时 UI 直接冻结、只能强杀进程，属高频使用场景下的体验事故
3. **多智能体"存在但不可发现"**（#6621）：用户进行了 50+ 轮对话才发现其他 Agent 从未被调用，数周调试时间被浪费。核心诉求不是文档，而是产品层面的引导与默认行为改进
4. **Shell 语义被静默改写**（#6565）：换行被折叠成空格导致命令语义变化，`cd /some/dir && ls` 与 `pwd` 被合并成一行——这是"最危险的 bug 类型"：不报错但结果完全错误
5. **依赖版本矩阵混乱**（#6612、#6619）：用户按文档安装 `qwenpaw==2.0.1` + `agentscope==2.0.4.post1` 后直接崩溃，需要自行排查 API 变更，说明 **版本锁定/兼容性披露** 还有改进空间

正面信号：多个 Issue 提交者主动上传了环境信息、复现步骤甚至 root cause 分析（#6565、#6625、#6626），并附带了对应修复 PR，社区从"报 bug"进化到了"报 bug + 给修复"，协作效率显著提升。

---

## 8. 待处理积压

以下 Issue/PR 值得维护者优先关注：

| 项目 | 创建日期 | 等待天数 | 说明 |
|---|---|---|---|
| [PR #6302](https://github.com/agentscope-ai/QwenPaw/pull/6302) | 07-21 | 13 天 | provider 统一大功能，长时间未合入，存在与 agentscope 2.0.4 兼容改动冲突的风险 |
| [PR #6525](https://github.com/agentscope-ai/QwenPaw/pull/6525) | 07-28 | 6 天 | 用户上下文穿透功能，无维护者评论记录 |
| [PR #6543](https://github.com/agentscope-ai/QwenPaw/pull/6543) | 07-29 | 5 天 | first-time-contributor，已标记 Under Review 但未见跟进 |
| [PR #6566](https://github.com/agentscope-ai/QwenPaw/pull/6566) | 07-30 | 4 天 | 修复 shell 双 bug（#6565），包含详尽的 root cause 分析，优先级高 |
| [PR #6615](https://github.com/agentscope-ai/QwenPaw/pull/6615) | 07-31 | 3 天 | 修复 Critical 级 agentscope 兼容性 + 死锁问题（#6612），已被社区标记但仍在等 review |
| [PR #6618](https://github.com/agentscope-ai/QwenPaw/pull/6618) | 08-01 | 2 天 | first-time-contributor，去除 UTC 强制归一化，需要后端 #6301 配合 |
| [PR #6609](https://github.com/agentscope-ai/QwenPaw/pull/6609) | 07-31 | 3 天 | first-time-contributor，修复 `spawn_subagent` schema 误判，小而明确的 bugfix |

**维护者行动建议：**
- 优先 review [#6615](https://github.com/agentscope-ai/QwenPaw/pull/6615) 与 [#6620](https://github.com/agentscope-ai/QwenPaw/pull/6620)（阻断两个 Critical 兼容性崩溃）
- 为 5 个 first-time-contributor PR（#6618、#6609、#6620、#6623、#6615）安排及时反馈，避免新贡献者流失
- 确认 #6640 / #6641 的重复关系，并处理 #6636 中 chat history 已修复但 skills 接口（#6633）尚未覆盖的缺口

---

*本日报由 AI 分析师自动生成，基于 2026-08-03 GitHub 公开数据。所有结论请以仓库实际状态为准。*

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