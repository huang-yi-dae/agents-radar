# OpenClaw 生态社区动态日报 2026-08-23

> 生成时间: 2026-08-23 02:30 (GMT+8) | 覆盖: OpenClaw + 12 个 peer 项目
> 本日报由 agents-radar 本地自动化生成，所有摘要/对比/撰写均由执行代理人工完成，未调用任何外部大模型 API。

- [OpenClaw](https://github.com/openclaw/openclaw)
- [NanoBot](https://github.com/HKUDS/nanobot)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [NanoClaw](https://github.com/qwibitai/nanoclaw)
- [NullClaw](https://github.com/nullclaw/nullclaw)
- [IronClaw](https://github.com/nearai/ironclaw)
- [LobsterAI](https://github.com/netease-youdao/LobsterAI)
- [TinyClaw](https://github.com/TinyAGI/tinyclaw)
- [CoPaw](https://github.com/agentscope-ai/CoPaw)
- [Moltis](https://github.com/moltis-org/moltis)
- [ZeptoClaw](https://github.com/qhkm/zeptoclaw)
- [EasyClaw](https://github.com/gaoyangz77/easyclaw)

---

## 跨生态对比

# OpenClaw 跨生态对比分析报告（2026-08-23）

## 1. 生态全景

今日 OpenClaw 生态最清晰的信号是：**安全治理已经从"加个开关"进化为"重构信任模型"**。Zeroclaw 今日一次性推进了 `#8289` 安全史诗的三个阶段——[#10248](https://github.com/zeroclaw-labs/zeroclaw/pull/10248)（canonical principals 与共享授权解析，stage 2）、[#10259](https://github.com/zeroclaw-labs/zeroclaw/pull/10259)（RPC 上强制认证主体，native + peercred，stage 3）、[#10255](https://github.com/zeroclaw-labs/zeroclaw/pull/10255)（`oidc.<alias>` 令牌校验 provider，stage 5）。这不是零散补丁，而是**把"谁在调用"做成一等公民**的系统性改造。同一天里 Moltis 新开 [#1230](https://github.com/moltis-org/moltis/issues/1230)（为修改型安全 hook 提供可选的 fail-closed 错误策略）、CoPaw 提交 [#7214](https://github.com/agentscope-ai/CoPaw/pull/7214)（把 Access Policy 列为第五道安全层）——三个独立项目在同一天从三个角度收紧权限边界。

活跃度分布则延续了强烈的两极化。**Zeroclaw（91 PR）与 OpenClaw 本体（54 PR / 46 issue）领跑**，IronClaw（19 PR）、NanoClaw（16 PR）、NanoBot（11 PR）次之；而 **NullClaw、TinyClaw、ZeptoClaw 三个项目连续多日 0 issue / 0 PR，已可判定为事实性停更**（最新 release 分别为 2026-05-29、2026-03-26、2026-04-07）。EasyClaw 是个特例：issue 与 PR 均为 0，但在 08-21 至 08-22 两天内连发 v1.8.108 至 v1.8.112 共 5 个版本——**纯发布流水线，无公开协作痕迹**（且其 release 实际指向 `gaoyangz77/rivonclaw`，仓库已改名）。

## 2. 各项目活跃度对比（近 24h）

| 项目 | 活跃 Issues（新建） | PR（新建） | 最新 Release | 状态判断 |
|------|-------------------|-----------|-------------|---------|
| **OpenClaw** | 46（3） | 54（22） | v2026.8.1-beta.2（08-15） | 主干高强度打磨 |
| **Zeroclaw** | 9（4） | **91（12）** | v0.8.4（08-02） | PR 量第一，安全史诗推进 |
| IronClaw | 9（5） | 19（8） | ironclaw-v1.3.0（08-19） | CI/CD 与 onboarding 双线 |
| NanoClaw | 0（0） | 16（7） | v2.2.0（08-13） | 纯 PR 驱动，多 bot 接入 |
| NanoBot | 0（0） | 11（6） | v0.3.0（07-25） | 可观测性重构 |
| PicoClaw | 2（1） | 6（0） | v0.3.1（06-30） | 低速，MCP 稳定性修复中 |
| LobsterAI | 2（0） | 6（0） | 2026.8.18 | 中文用户驱动的功能补齐 |
| CoPaw | 5（2） | 5（1） | v2.1.1-beta.1（08-20） | 多模态限额与安全分层 |
| Moltis | 1（1） | 2（2） | 20260820.01（08-20） | 小而稳，安全 hook 策略 |
| EasyClaw | 0（0） | 0（0） | **v1.8.112（08-22）** | 高频发布但零公开协作 |
| NullClaw | 0（0） | 0（0） | v2026.5.29 | **事实停更（~3 个月）** |
| TinyClaw | 0（0） | 0（0） | v0.0.20（03-26） | **事实停更（~5 个月）** |
| ZeptoClaw | 0（0） | 0（0） | v0.9.2（04-07） | **事实停更（~4.5 个月）** |

## 3. OpenClaw 本体：性能与可信交付是今日双主线

OpenClaw 今日 PR 讨论量最高的一条是 [#123535](https://github.com/openclaw/openclaw/pull/123535)「避免会话目录刷新风暴」——**153💬，是全生态讨论量第一**。搭配 [#127379](https://github.com/openclaw/openclaw/issues/127379)（`/models` 命令让 gateway 主线程 CPU 打满 100%+，因 `buildModelsProviderData` 反复重建）与 [#72717](https://github.com/openclaw/openclaw/issues/72717)（为 `wiki_search` 引入 SQLite FTS 索引以提升合成查询性能），可以看出**主干正在集中偿还"重复重建"这一类性能债**。

第二条主线是**消息投递的上下文正确性**。今日新建 PR [#127962](https://github.com/openclaw/openclaw/pull/127962)（为入站 turn 保留 gateway 上下文）、[#127797](https://github.com/openclaw/openclaw/pull/127797)（统一同步消息 hook，8💬）、已合并的 [#126424](https://github.com/openclaw/openclaw/pull/126424)（把会话投递限制在 agent 绑定范围内）、[#124548](https://github.com/openclaw/openclaw/pull/124548)（为私聊 turn 持久化发送者身份）连成一条链：**多渠道多 agent 场景下，"这条消息属于谁、该由谁答"必须可靠**。今日新 issue [#128003](https://github.com/openclaw/openclaw/issues/128003)（OpenAI 兼容 HTTP 会话下 subagent 完成通告从不触发，报"In-process gateway di…"）正是这条链上的缺口。

值得单独标注的是两条**自我诊断失真**问题：[#87637](https://github.com/openclaw/openclaw/issues/87637)（`openclaw doctor` 报告记忆搜索已禁用，但 memory-core dreaming 实际在运行）与今日新 PR [#127998](https://github.com/openclaw/openclaw/pull/127998)（Doctor 的权限修复建议里列出了已禁用的自动化）。**诊断工具说的话和系统实际状态不一致，比没有诊断工具更危险**——这与今日 CLI 侧 Gemini #22323「失败被报成成功」属于同一类元问题。

## 4. Peer 项目差异化定位

- **Zeroclaw**：**今日 PR 量第一（91 条活跃 / 12 条新建），且是全生态唯一在做"体系化安全重构"的项目。** `#8289` 史诗的 stage 2/3/5 同日推进（canonical principals、RPC 认证主体、OIDC 令牌校验），配合 [#9574](https://github.com/zeroclaw-labs/zeroclaw/pull/9574)（授权审批响应者）、[#9203](https://github.com/zeroclaw-labs/zeroclaw/pull/9203)（认证 HTTP fan-in），构成完整的身份-授权链路。另一条主线是**上下文与 token 会计**：[#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535)（按模型窗口比例锚定上下文压缩，22💬）、[#9713](https://github.com/zeroclaw-labs/zeroclaw/pull/9713)（在 history-trim 事件上暴露 token 会计，25💬）、[#9447](https://github.com/zeroclaw-labs/zeroclaw/pull/9447)（分类不完整的终端响应，20💬）。**#9447 与今日 CLI 侧 OpenCode 的空响应问题是同一命题的两端——一边报 bug，一边写解法。** provider 侧最亮眼的是 [#9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109)（原生 Hailo-Ollama 支持，44💬），指向本地/边缘推理。治理上 [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)（维护者 RFC 决策队列 Tracker，13💬）与 [#8396](https://github.com/zeroclaw-labs/zeroclaw/issues/8396)（RFC：让 wire protocol 在 provider 构造与 onboarding 中成为一等公民，9💬）说明项目已进入需要显式治理流程的规模。
- **IronClaw**：今日呈现**CI/CD 基建 + onboarding 体验双线并进**。CI 侧一口气推了 T1–T4 四条 PR：[#7821](https://github.com/nearai/ironclaw/pull/7821)（单一 setup-rust 复合动作，toolchain 固定、mold、集中构建 profile）、[#7817](https://github.com/nearai/ironclaw/pull/7817)（nextest 测试流水线、全失败信号、PR 解除限流）、[#7819](https://github.com/nearai/ironclaw/pull/7819)（PR/队列检查收敛，planner 漂移守卫）、[#7809](https://github.com/nearai/ironclaw/pull/7809)（规范化 preflight：统一门禁列表、worktree 安全钩子、自打印 REPRO）——**这是典型的"团队规模到了，必须先修路"信号**。产品侧最高讨论是 [#7650](https://github.com/nearai/ironclaw/pull/7650)（从运行时证据推导 run outcome，45💬）与 [#7818](https://github.com/nearai/ironclaw/pull/7818)（subagent 后台模式：回执式派生、逐子投递、激活与自愈扫描）。onboarding 侧连开 4 条 issue（[#7815](https://github.com/nearai/ironclaw/issues/7815) 打通 connect→suggest→thread 流程、[#7812](https://github.com/nearai/ironclaw/issues/7812) 建议生成时尊重用户级工具权限并用只读工具、[#7823](https://github.com/nearai/ironclaw/issues/7823) Notion 安装失败、[#7822](https://github.com/nearai/ironclaw/issues/7822) Slack 配置失败）——**集成成功率是它当前最真实的瓶颈**。
- **NanoClaw**：0 issue / 16 PR，是全生态**最"纯 PR 驱动"的项目**。今日新 PR 高度集中在多 bot 与 provider 接入：[#3438](https://github.com/qwibitai/nanoclaw/pull/3438)（配置向导在已有 bot 时提供"再加一个 Telegram bot"）、[#3437](https://github.com/qwibitai/nanoclaw/pull/3437)（对应文档与 instance 感知配对）、[#3435](https://github.com/qwibitai/nanoclaw/pull/3435)（把 adapter instance 贯穿配对/首个 agent 初始化/CLI 欢迎流）、[#3355](https://github.com/qwibitai/nanoclaw/pull/3355) + [#3356](https://github.com/qwibitai/nanoclaw/pull/3356)（新增 `/add-cursor` provider skill 与 Cursor Agent SDK payload）。工程侧 [#3442](https://github.com/qwibitai/nanoclaw/pull/3442)（按 driver 隔离能力校验 runtimeTier 并据此选档）与 [#3443](https://github.com/qwibitai/nanoclaw/pull/3443)（弃用 better-sqlite3 自建、改用其自带预编译产物）都是务实取舍。定位：**多 IM 渠道 + 多 agent provider 的接入层**。
- **NanoBot**（★47,283，peer 中 star 最高）：今日 11 条 PR 全部指向**可观测性与会话生命周期**：[#5486](https://github.com/HKUDS/nanobot/pull/5486)（统一 turn 可观测性，已合）、[#5487](https://github.com/HKUDS/nanobot/pull/5487)（WebUI 文件预览路径修复 + subagent 活动与生命周期回放）、[#5420](https://github.com/HKUDS/nanobot/pull/5420)（用户可控的 turn 恢复）、[#5483](https://github.com/HKUDS/nanobot/pull/5483)（防止已删除会话被延迟消息重建）、[#5471](https://github.com/HKUDS/nanobot/pull/5471)（临时 run 不改动会话状态）。另有 [#5484](https://github.com/HKUDS/nanobot/pull/5484)（标记那些 `isError=false` 却返回业务错误信封的 MCP 响应）——**这类"表面成功实则失败"的识别，是今日跨生态反复出现的主题**。[#5156](https://github.com/HKUDS/nanobot/pull/5156)（从静默停滞的 Telegram 轮询中恢复，已合）同理。
- **CoPaw**：主线是**多模态限额与安全分层**。[#7201](https://github.com/agentscope-ai/CoPaw/issues/7201)（按 provider 分别设置 `max_image_bytes` / `max_video_bytes` / `max_audio_bytes`）与 [#7212](https://github.com/agentscope-ai/CoPaw/issues/7212)（内联像素尺寸超出 provider 限制的图片会导致请求崩溃）是一对因果——**限额缺位直接变成崩溃**。[#7214](https://github.com/agentscope-ai/CoPaw/pull/7214) 把 Access Policy 写进 README 作为第五道安全层。中文用户体验反馈依然密集：[#7196](https://github.com/agentscope-ai/CoPaw/issues/7196)（一直显示推理过程是严重视觉干扰，希望可设默认折叠）、[#7213](https://github.com/agentscope-ai/CoPaw/issues/7213)（会话输出总有无意义空行）、[#7043](https://github.com/agentscope-ai/CoPaw/issues/7043)（启动时自动 `chcp 65001` 切 UTF-8，已关闭）。运维侧 [#7050](https://github.com/agentscope-ai/CoPaw/pull/7050)（按 cron job 覆盖模型选择器）与 [#7190](https://github.com/agentscope-ai/CoPaw/pull/7190)（PyPI 运行时路径、docker-compose 一键 demo、环境继承）降低自托管门槛。
- **PicoClaw**：低速但有效。核心 bug [#3269](https://github.com/sipeed/picoclaw/issues/3269)（MCP server 连接失败会导致 agent loop 挂起，进而拖死 PicoClaw 聊天，1👍/6💬）已有对应修复 PR [#3337](https://github.com/sipeed/picoclaw/pull/3337)。今日新 issue [#3343](https://github.com/sipeed/picoclaw/issues/3343)（失败 turn 之后工具反馈动画会无限编辑同一条 Telegram 消息）是同源的"失败态收尾不干净"。[#3222](https://github.com/sipeed/picoclaw/pull/3222)（deltachat 实现重构，减少 200 行，16💬）体现其嵌入式取向的精简偏好。
- **LobsterAI**（网易有道）：完全由**中文用户需求驱动**且闭环极快——[#1213](https://github.com/netease-youdao/LobsterAI/issues/1213)「为会话详情添加导出为 Markdown」提出后即由 [#1214](https://github.com/netease-youdao/LobsterAI/pull/1214) 实现并合并。其余修复同样贴近日常：[#1208](https://github.com/netease-youdao/LobsterAI/pull/1208)（新增手动重试按钮应对瞬时错误）、[#1212](https://github.com/netease-youdao/LobsterAI/pull/1212)（自定义 provider 上限放宽到 20 个）、[#1205](https://github.com/netease-youdao/LobsterAI/pull/1205)（会话重命名失败时给出 error toast）、[#1206](https://github.com/netease-youdao/LobsterAI/issues/1206)（私有化部署的 kimi2.5 分析文档会重复处理，已关闭）。**"用户提—当天合"的节奏是它最大的差异化。**
- **Moltis**：项目小但方向明确。今日全部 3 条均为新建：[#1230](https://github.com/moltis-org/moltis/issues/1230)（为修改型安全 hook 提供可选 fail-closed 错误策略——**hook 出错时默认放行还是拦截，是安全模型的根本选择**）、[#1229](https://github.com/moltis-org/moltis/pull/1229)（支持 Browserless v2 容器）、[#1231](https://github.com/moltis-org/moltis/pull/1231)（服务重启后重新解析当前 MCP client）。后者与 OpenClaw [#68187](https://github.com/openclaw/openclaw/issues/68187)（SSE 支撑的 MCP 会话在服务重启后仍陈旧、报 "Session not found"）**是完全同一个 bug 在两个项目里的独立复现——MCP 重启语义是全生态公摊的坑**。
- **停更三项（NullClaw / TinyClaw / ZeptoClaw）**：连续多日 0 issue / 0 PR，最新 release 距今 3–5 个月。**建议在后续选型与追踪中降权。**
- **EasyClaw**：08-21 至 08-22 连发 5 个版本（v1.8.108 → v1.8.112），但 issue 与 PR 双零，且 release 指向 `gaoyangz77/rivonclaw`（仓库已改名）。**高频发布 + 零公开协作，无法从公开信号判断其社区健康度。**

## 5. 值得关注的趋势信号

- **"表面成功、实则失败"成为全生态第一大元问题。** 今天至少有五处独立出现：OpenClaw #87637（doctor 误报记忆搜索已禁用）与 #128003（subagent 完成通告从不触发）、NanoBot #5484（`isError=false` 却携带业务错误信封）、Zeroclaw #9447（分类不完整的终端响应）、PicoClaw #3343（失败 turn 后动画无限编辑）。**当 agent 开始无人值守长跑，"失败必须响"比"失败别发生"更关键**——这也与今日 CLI 侧 Gemini #22323、Qwen #9733 完全同源。
- **安全模型正在从"功能开关"升级为"身份基础设施"。** Zeroclaw 的 canonical principals / RPC 认证 / OIDC 三阶段，Moltis 的 fail-closed hook 策略，CoPaw 的第五安全层，OpenClaw 的安装策略告警强制确认（[#116489](https://github.com/openclaw/openclaw/pull/116489)，49💬，已合）——**四个项目同日从四个层次收紧权限，说明"agent 有真实执行权"这件事的风险已被普遍认知。**
- **MCP 的重启与会话语义是公摊技术债。** Moltis #1231 与 OpenClaw #68187 独立复现同一 bug，PicoClaw #3269 的 MCP 连接失败会挂死整个 agent loop。**MCP 生态缺少统一的"连接失效—重建—幂等恢复"规范，每个项目都在自己重新踩一遍。**
- **性能债的形态高度一致：重复重建。** OpenClaw #123535（会话目录刷新风暴，153💬）、#127379（`buildModelsProviderData` 反复重建打满 CPU）、#72717（`wiki_search` 缺 FTS 索引），与 CLI 侧 OpenCode #44127（冗余 git 子进程 spawn）、Codex #20864（全量扫描 sessions 目录）形态完全一致。**agent 框架普遍在"每次都重算"的阶段，缓存与增量是下一轮明确的优化红利。**
- **生态尾部正在自然淘汰。** 13 个 peer 中已有 3 个事实停更、1 个仅有发布流水线，真正有持续协作信号的约 8 个。**"claw 系"项目的爆发期已过，进入集中度提升阶段。**

---

## 各项目动态明细

### OpenClaw（[openclaw/openclaw](https://github.com/openclaw/openclaw)）

**最新 Release**：[v2026.8.1-beta.2](https://github.com/openclaw/openclaw/releases/tag/v2026.8.1-beta.2)（08-15）；正式版最新为 v2026.7.1-2（08-04）。

**高讨论 PR**

| PR | 讨论 | 内容 |
|----|------|------|
| [#123535](https://github.com/openclaw/openclaw/pull/123535) | **153💬** | 避免会话目录刷新风暴——全生态讨论量第一 |
| [#116489](https://github.com/openclaw/openclaw/pull/116489) | 49💬（已合） | 安装策略告警需强制确认 |
| [#123975](https://github.com/openclaw/openclaw/pull/123975) | 45💬 | typecheck 在 tsgo 卡死而非失败时会永久挂起 |
| [#120900](https://github.com/openclaw/openclaw/pull/120900) | 44💬（已合） | UI 支持审阅安装策略告警 |
| [#123189](https://github.com/openclaw/openclaw/pull/123189) | 28💬 | 在聊天启动投影中恢复嵌入式 channel run |
| [#126618](https://github.com/openclaw/openclaw/pull/126618) | 25💬 | Tool Search 的 directory/tools 把原生 read/exec 包进 tool_call |
| [#117114](https://github.com/openclaw/openclaw/pull/117114) | 21💬 | 隔离 `pnpm link` 以免污染源码检出更新，并在自链接损坏时告警 |
| [#126424](https://github.com/openclaw/openclaw/pull/126424) | 19💬（已合） | 把会话投递限制在 agent 绑定范围内 |
| [#118067](https://github.com/openclaw/openclaw/pull/118067) | 19💬 | Discord 支持私有 provider 端点 |
| [#124548](https://github.com/openclaw/openclaw/pull/124548) | 18💬 | 为私聊 turn 持久化发送者身份 |

**关键 issue**

- [#127379](https://github.com/openclaw/openclaw/issues/127379) — `/models` 命令让 gateway 主线程 CPU 打满 100%+，因 `buildModelsProviderData` 反复重建。
- [#87637](https://github.com/openclaw/openclaw/issues/87637)（2👍 / 3💬）— **`openclaw doctor` 报告记忆搜索已禁用，但 memory-core dreaming 实际在运行——诊断失真。**
- [#125570](https://github.com/openclaw/openclaw/issues/125570) — Skill Workshop 应用更新时会覆盖线上 skill 的描述，静默破坏其触发。
- [#124099](https://github.com/openclaw/openclaw/issues/124099) — 升级到 2026.8.1-beta.2 后出现 `SessionCanonicalKeyMigrationRequiredError` 循环，trigger-pending 行受影响。
- [#68187](https://github.com/openclaw/openclaw/issues/68187) — SSE 支撑的 MCP 会话在服务重启后仍陈旧，报 "Session not found"。
- [#72717](https://github.com/openclaw/openclaw/issues/72717) — 为 `wiki_search` 引入 SQLite FTS 索引以提升合成查询性能。
- [#88334](https://github.com/openclaw/openclaw/issues/88334) — Gateway 应在凭据轮换后立即刷新 auth epoch。
- [#45184](https://github.com/openclaw/openclaw/issues/45184) — 当消息 @ 的是另一账号的 bot 时应跳过派发。
- [#33102](https://github.com/openclaw/openclaw/issues/33102) — TUI 支持配置 `--deliver` 默认值。
- [#119254](https://github.com/openclaw/openclaw/issues/119254) — 设计 WhatsApp `poll_vote_received` 插件 hook。

**今日新建（3 issue / 22 PR，摘其要）**

- [#128003](https://github.com/openclaw/openclaw/issues/128003) — OpenAI 兼容 HTTP 会话下 subagent 完成通告从不触发。
- [#128006](https://github.com/openclaw/openclaw/issues/128006) — ACPX 直连 agent 启动缺少持久化进程租约覆盖（无上游生命周期 hook）。
- [#128005](https://github.com/openclaw/openclaw/issues/128005) — Android `location.get` 在回退到实时定位时忽略 `maxAgeMs`。
- PR [#127797](https://github.com/openclaw/openclaw/pull/127797)（8💬）— 统一同步消息 hook。
- PR [#127998](https://github.com/openclaw/openclaw/pull/127998)（6💬）— **Doctor 的权限修复建议里列出了已禁用的自动化（诊断准确性修复）。**
- PR [#127962](https://github.com/openclaw/openclaw/pull/127962)（6💬）— 为入站 turn 保留 gateway 上下文。
- PR [#128004](https://github.com/openclaw/openclaw/pull/128004)（已合）— 共享 schema 校验的 format scope（性能）。
- PR [#128001](https://github.com/openclaw/openclaw/pull/128001) — 把请求方的 abort 传播到 ACP spawn。

### Zeroclaw（[zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)）

**最新 Release**：v0.8.4（08-02）。**今日 PR 量全生态第一（91 活跃 / 12 新建）。**

**`#8289` 安全史诗（今日同时推进三阶段）**

- PR [#10248](https://github.com/zeroclaw-labs/zeroclaw/pull/10248) — canonical principals 与共享授权解析（stage 2）。
- PR [#10259](https://github.com/zeroclaw-labs/zeroclaw/pull/10259) — RPC 上强制认证主体，native + peercred（stage 3）。
- PR [#10255](https://github.com/zeroclaw-labs/zeroclaw/pull/10255) — `oidc.<alias>` 令牌校验 provider（stage 5）。

**高讨论 PR**

| PR | 讨论 | 内容 |
|----|------|------|
| [#9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109) | 44💬 | 原生 Hailo-Ollama 支持（边缘推理） |
| [#9707](https://github.com/zeroclaw-labs/zeroclaw/pull/9707) | 33💬 | 把裸 `vision_model_provider` 迁移为点号式别名引用 |
| [#9713](https://github.com/zeroclaw-labs/zeroclaw/pull/9713) | 25💬 | 在 history-trim 事件上暴露 token 会计 |
| [#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535) | 22💬 | 按模型窗口比例锚定上下文压缩 |
| [#9447](https://github.com/zeroclaw-labs/zeroclaw/pull/9447) | 20💬 | **分类不完整的终端响应（与 CLI 侧空响应问题同源的解法）** |
| [#9772](https://github.com/zeroclaw-labs/zeroclaw/pull/9772) | 20💬 | Telegram 群聊共享会话的 `per_user_session` 开关 |
| [#9203](https://github.com/zeroclaw-labs/zeroclaw/pull/9203) | 19💬 | 认证 HTTP fan-in |
| [#9281](https://github.com/zeroclaw-labs/zeroclaw/pull/9281) | 18💬 | `config set` 失败时回滚自动创建的 map 别名 |
| [#9574](https://github.com/zeroclaw-labs/zeroclaw/pull/9574) | 17💬 | 授权审批响应者 |
| [#9291](https://github.com/zeroclaw-labs/zeroclaw/pull/9291) | 17💬 | 检测已安装的 AppImage 并使用可用的桌面端下载 URL |

**治理与今日新建**

- [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)（13💬）— 维护者 RFC 与设计 issue 决策队列 Tracker。
- [#8396](https://github.com/zeroclaw-labs/zeroclaw/issues/8396)（9💬）— RFC：让 wire protocol 在 provider 构造与 onboarding 中成为一等公民。
- [#10141](https://github.com/zeroclaw-labs/zeroclaw/issues/10141) — 「请让 sessions 变得可用」。
- 今日新 issue：[#10251](https://github.com/zeroclaw-labs/zeroclaw/issues/10251)（17 个 telegram `listen_*` 测试依赖挂钟超时断言）、[#10257](https://github.com/zeroclaw-labs/zeroclaw/issues/10257)（`cron update --command` 在 agent job 上写入未使用列）、[#10249](https://github.com/zeroclaw-labs/zeroclaw/issues/10249)（重复 webhook 处理会把调用方可控的幂等键原样写进日志）、[#10261](https://github.com/zeroclaw-labs/zeroclaw/issues/10261)。
- 今日新 PR：[#10256](https://github.com/zeroclaw-labs/zeroclaw/pull/10256)（从日志中脱敏重复幂等键，对应 #10249）、[#10258](https://github.com/zeroclaw-labs/zeroclaw/pull/10258)（把 command patch 映射到 agent job prompt）、[#10260](https://github.com/zeroclaw-labs/zeroclaw/pull/10260)（断连时让 RPC 调用失败）。

### IronClaw（[nearai/ironclaw](https://github.com/nearai/ironclaw)）

**最新 Release**：[ironclaw-v1.3.0](https://github.com/nearai/ironclaw/releases/tag/ironclaw-v1.3.0)（08-19），此前 rc.1 / rc.2（08-17 / 08-18）。

**产品侧高讨论 PR**

- [#7650](https://github.com/nearai/ironclaw/pull/7650)（45💬）— 从运行时证据推导 run outcome。
- [#7818](https://github.com/nearai/ironclaw/pull/7818) — subagent 后台模式：回执式派生、逐子投递、激活与自愈扫描。
- [#7516](https://github.com/nearai/ironclaw/pull/7516)（14💬）— 为 IronHub agent link 提供操作者界面。
- [#7257](https://github.com/nearai/ironclaw/pull/7257)（11💬）— WebUI 设计系统的提案、计划与检查清单（Epic #7038）。
- [#7816](https://github.com/nearai/ironclaw/pull/7816) — 在 OOBE 建议抽屉中加入刷新与连接入口。

**CI 基建四连（T1–T4，均为今日新建）**

- [#7821](https://github.com/nearai/ironclaw/pull/7821) — 单一 setup-rust 复合动作：toolchain 固定、mold、集中构建 profile（T1）。
- [#7817](https://github.com/nearai/ironclaw/pull/7817) — nextest 测试流水线、全失败信号、PR 解除限流（T2）。
- [#7820](https://github.com/nearai/ironclaw/pull/7820) — scope-isolation 测试套件合并探针（T2 后续）。
- [#7819](https://github.com/nearai/ironclaw/pull/7819) — PR / 队列检查收敛：planner 漂移守卫、PR 上跑 default-features clippy（T3）。
- [#7809](https://github.com/nearai/ironclaw/pull/7809) — 规范化 preflight：统一门禁列表、worktree 安全钩子、自打印 REPRO（T4）。

**onboarding / 集成 issue（今日新建 5 条）**

- [#7815](https://github.com/nearai/ironclaw/issues/7815) — onboarding 建议：打通 connect → suggest → thread 流程所需的累积净新增工作量。
- [#7812](https://github.com/nearai/ironclaw/issues/7812) — onboarding 建议应尊重用户级工具权限，并使用只读工具访问生成。
- [#7823](https://github.com/nearai/ironclaw/issues/7823) — Notion 安装在 IronClaw 中失败。
- [#7822](https://github.com/nearai/ironclaw/issues/7822) — Slack 用户无法在 IronClaw 中完成 Slack 配置。
- [#7813](https://github.com/nearai/ironclaw/issues/7813) — 建议面板出现时标题被裁切。

### NanoClaw（[qwibitai/nanoclaw](https://github.com/qwibitai/nanoclaw)）

**最新 Release**：v2.2.0（08-13）。0 issue / 16 PR，纯 PR 驱动。

- [#3438](https://github.com/qwibitai/nanoclaw/pull/3438) — 配置向导在已配置 bot 时提供「再加一个 Telegram bot」。
- [#3437](https://github.com/qwibitai/nanoclaw/pull/3437) — add-another-bot 路径文档、instance 感知配对与接线。
- [#3435](https://github.com/qwibitai/nanoclaw/pull/3435) — 把 adapter instance 贯穿配对、首个 agent 初始化与 CLI 欢迎流。
- [#3355](https://github.com/qwibitai/nanoclaw/pull/3355) / [#3356](https://github.com/qwibitai/nanoclaw/pull/3356) — 新增 `/add-cursor` provider skill；新增 Cursor Agent SDK payload。
- [#3434](https://github.com/qwibitai/nanoclaw/pull/3434) — 轮询型 adapter 不再开启 webhook server。
- [#3446](https://github.com/qwibitai/nanoclaw/pull/3446) — 在未知发送者门禁中自动丢弃自动化发送者。
- [#3442](https://github.com/qwibitai/nanoclaw/pull/3442) — 按 driver 隔离能力校验 `runtimeTier` 并据此选档。
- [#3443](https://github.com/qwibitai/nanoclaw/pull/3443) — 从 `onlyBuiltDependencies` 中移除 better-sqlite3，改用其自带预编译产物。
- [#3441](https://github.com/qwibitai/nanoclaw/pull/3441) — `git show` 失败时保留文件。
- [#3431](https://github.com/qwibitai/nanoclaw/pull/3431) — 配对卡片文案更正为 6 位数字。

### NanoBot（[HKUDS/nanobot](https://github.com/HKUDS/nanobot)）★47,283

**最新 Release**：v0.3.0（07-25）。0 issue / 11 PR，主题为可观测性与会话生命周期。

- [#5486](https://github.com/HKUDS/nanobot/pull/5486)（已合）— 统一 turn 可观测性。
- [#5487](https://github.com/HKUDS/nanobot/pull/5487) — WebUI 文件预览路径修复 + subagent 活动与生命周期回放。
- [#5420](https://github.com/HKUDS/nanobot/pull/5420) — 新增用户可控的 turn 恢复。
- [#5484](https://github.com/HKUDS/nanobot/pull/5484) — **标记那些 `isError=false` 却返回业务错误信封的 MCP 响应。**
- [#5483](https://github.com/HKUDS/nanobot/pull/5483) — 防止已删除会话被延迟消息重新创建。
- [#5471](https://github.com/HKUDS/nanobot/pull/5471) — 让临时（ephemeral）run 不改动会话状态。
- [#5485](https://github.com/HKUDS/nanobot/pull/5485) — 为原生 provider 恢复 LangSmith 追踪。
- [#5156](https://github.com/HKUDS/nanobot/pull/5156)（已合）— 从静默停滞的 Telegram 轮询中恢复。
- [#3294](https://github.com/HKUDS/nanobot/pull/3294)（已合）— dream 可选 kill switch + 自定义 Phase 1/2 模板路径。

### CoPaw（[agentscope-ai/CoPaw](https://github.com/agentscope-ai/CoPaw)）

**最新 Release**：v2.1.1-beta.1（08-20）；正式版 v2.1.0（08-13）。

- [#7196](https://github.com/agentscope-ai/CoPaw/issues/7196)（1👍 / 2💬）— 一直显示推理过程是严重的视觉干扰，希望可设默认是否折叠。
- [#7201](https://github.com/agentscope-ai/CoPaw/issues/7201) — 按 provider 分别设置 `max_image_bytes` / `max_video_bytes` / `max_audio_bytes` 上限。
- [#7212](https://github.com/agentscope-ai/CoPaw/issues/7212) — 内联像素尺寸超出 provider 限制的图片会导致请求崩溃（与 #7201 构成因果）。
- [#7213](https://github.com/agentscope-ai/CoPaw/issues/7213) — 会话输出总是有无意义的空行。
- [#7043](https://github.com/agentscope-ai/CoPaw/issues/7043)（已关闭）— 希望启动时自动执行 `chcp 65001` 切到 UTF-8 环境。
- PR [#7214](https://github.com/agentscope-ai/CoPaw/pull/7214) — README 中把 Access Policy 列为第五道安全层。
- PR [#7054](https://github.com/agentscope-ai/CoPaw/pull/7054) — Chrome 支持 LAN/网络浏览器的远程 bridge 端点。
- PR [#7050](https://github.com/agentscope-ai/CoPaw/pull/7050) — 按 cron job 提供模型覆盖选择器。
- PR [#7190](https://github.com/agentscope-ai/CoPaw/pull/7190) — qwenpaw-data 的 PyPI 运行时路径、docker-compose 一键 demo 与环境继承。
- PR [#6808](https://github.com/agentscope-ai/CoPaw/pull/6808) — Console 显示自定义 profile 的 markdown 文件。

### PicoClaw（[sipeed/picoclaw](https://github.com/sipeed/picoclaw)）

**最新 Release**：v0.3.1（06-30）、nightly（07-02）。

- [#3269](https://github.com/sipeed/picoclaw/issues/3269)（1👍 / 6💬）— **MCP server 连接失败会导致 agent loop 挂起，进而拖死整个 PicoClaw 聊天。** 对应修复 PR [#3337](https://github.com/sipeed/picoclaw/pull/3337)。
- [#3343](https://github.com/sipeed/picoclaw/issues/3343)（今日新建）— 失败 turn 之后，工具反馈动画会无限编辑同一条 Telegram 消息。
- PR [#3222](https://github.com/sipeed/picoclaw/pull/3222)（16💬）— deltachat 实现重构与文档整理，净减约 200 行。
- PR [#3319](https://github.com/sipeed/picoclaw/pull/3319)（已合）— 尊重 exec 超时与布尔型运行选项。

### LobsterAI（[netease-youdao/LobsterAI](https://github.com/netease-youdao/LobsterAI)）

**最新 Release**：2026.8.18（08-18）。中文用户需求驱动，提出到合并极快。

- [#1213](https://github.com/netease-youdao/LobsterAI/issues/1213)（已关闭）— 为会话详情添加「导出为 Markdown」功能 → 由 PR [#1214](https://github.com/netease-youdao/LobsterAI/pull/1214) 实现并合并。
- [#1206](https://github.com/netease-youdao/LobsterAI/issues/1206)（已关闭）— 私有化部署的 kimi2.5 模型分析文档会重复处理或重复回复进度。
- PR [#1208](https://github.com/netease-youdao/LobsterAI/pull/1208)（已合）— 新增手动重试按钮，支持频繁请求等瞬时错误快速重试。
- PR [#1212](https://github.com/netease-youdao/LobsterAI/pull/1212)（已合）— 自定义 provider 上限放宽至 20 个。
- PR [#1205](https://github.com/netease-youdao/LobsterAI/pull/1205)（已合）— 会话重命名失败时给出 error toast。
- PR [#1209](https://github.com/netease-youdao/LobsterAI/pull/1209)（已合）— 修复 web-search 阻断不受支持的 Chrome flags。
- PR [#2452](https://github.com/netease-youdao/LobsterAI/pull/2452) — 为带斜杠的 model id 保留 provider 信息。

### Moltis（[moltis-org/moltis](https://github.com/moltis-org/moltis)）

**最新 Release**：20260820.01（08-20）。今日 3 条全为新建。

- [#1230](https://github.com/moltis-org/moltis/issues/1230) — **为修改型安全 hook 提供可选的 fail-closed 错误策略（hook 出错时默认拦截而非放行）。**
- PR [#1229](https://github.com/moltis-org/moltis/pull/1229)（1👍 / 3💬）— 支持 Browserless v2 容器。
- PR [#1231](https://github.com/moltis-org/moltis/pull/1231)（1👍 / 2💬）— **服务重启后重新解析当前 MCP client（与 OpenClaw #68187 同一 bug 的独立复现）。**

### 低活跃 / 停更项目

| 项目 | 最新 Release | 停滞时长 | 今日活动 |
|------|-------------|---------|---------|
| [EasyClaw](https://github.com/gaoyangz77/easyclaw) | v1.8.112（08-22） | — | **5 个版本连发但 0 issue / 0 PR**；release 实际指向 `gaoyangz77/rivonclaw`（已改名） |
| [NullClaw](https://github.com/nullclaw/nullclaw) | v2026.5.29 | ~3 个月 | 0 / 0 |
| [ZeptoClaw](https://github.com/qhkm/zeptoclaw) | v0.9.2（04-07） | ~4.5 个月 | 0 / 0 |
| [TinyClaw](https://github.com/TinyAGI/tinyclaw) | v0.0.20（03-26） | ~5 个月 | 0 / 0 |

---

*本日报由 [agents-radar](https://github.com/huang-yi-dae/agents-radar) 自动生成，所有内容基于 GitHub 公开 API 实时抓取并由执行代理人工撰写，未调用任何外部大模型。*
