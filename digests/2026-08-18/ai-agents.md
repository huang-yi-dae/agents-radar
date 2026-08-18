# OpenClaw 生态日报 2026-08-18

> Issues: 500 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-08-18 01:01 UTC

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

# OpenClaw 项目动态日报 — 2026-08-18

## 今日速览

OpenClaw 项目在过去 24 小时内保持极高活跃度，共产生 500 条 Issue 更新与 500 条 PR 更新，Issue 关闭率仅 4%（20/500），PR 合并/关闭率约 27%（133/500），显示项目处于大量讨论与待处理状态，但合并节奏相对滞后。今日无新版本发布。高优先级（P1/P0）问题仍大量积压，且多数处于 `clawsweeper:no-new-fix-pr` 状态，说明维护者带宽可能仍是瓶颈。值得注意的是，PR 侧今日有多个高质量修复提交（大小 S/M 为主），涉及 Gateway 会话状态、macOS 签名发布流程、Control UI 界面优化等，方向集中在稳定性与可用性，项目整体处于"活跃讨论、缓慢收口"的阶段。


## 项目进展

今日合并/关闭的 PR 中，以下三项对项目推进有实质意义：

- **[#120900](https://github.com/openclaw/openclaw/pull/120900) `feat(ui): review install policy warnings`（已合并）** — 为 Control UI 增加安装策略警告的审阅能力，管理员可在界面中确认并继续安装存在策略风险的插件。与其姊妹 PR [#116489](https://github.com/openclaw/openclaw/pull/116489)（已合并）共同完善了插件安装安全边界：后者在 CLI/网关层引入了对 `security.installPolicy` 返回 `warn` 的强制确认机制，前者将该能力延伸至 Web UI。两项合并为插件生态的可信安装建立了完整链路。

- **[#122764](https://github.com/openclaw/openclaw/pull/122764) `fix(queue): arbitrate shared capacity across grouped lanes`（已合并）** — 修复了队列系统在 grouped lanes 场景下的共享容量分配问题。将共享槽位的所有权从完成任务的车道转移至容量组调度器，按优先级降序、全局序列升序的策略逐个头选成员，解决了多车道并发下的资源争用问题。这是对消息投递可靠性的重要底层改进，直接关系到 [#122763](https://github.com/openclaw/openclaw/issues/122763) 所描述的生产故障。

- **[#117977](https://github.com/openclaw/openclaw/pull/117977) `🐛 fix(skills): authorize configured canonical workshop roots`（已关闭）** — 该 PR 虽被关闭（未合并），但其讨论明确了技能工作区根目录授权机制的边界——由于将 Kaizen skills 根目录误分类为 personal 而被拒绝，以及 agent workspace shadow 作为竞争源的问题仍然存在。关闭而非合并这一事实，暗示维护者可能倾向不同的实现路径，值得关注后续替代方案。

整体来看，今日合并的 PR 集中于安全边界与基础设施可靠性，方向明确。但 367 个待合并 PR 的积压量仍然很大，其中 `waiting on author` 状态的 PR 占比偏高，部分 PR（如 [#124303](https://github.com/openclaw/openclaw/pull/124303) `fix(sessions): track context window provenance`）虽标注 P1 且直接影响会话状态一致性，却因等待作者响应而无法推进。


## 社区热点

今日讨论热度前十的 Issue 几乎全部是 P1 级可靠性/数据丢失类问题，反映出社区对消息丢失、会话中断、进程崩溃等稳定性问题的高度关注。按评论数排序的热点包括：

1. **[#77598](https://github.com/openclaw/openclaw/issues/77598) Track live dev agent behavior and trajectory（23 评论）** — 对 Pash 开发 agent 的 24 小时观察日志。社区在持续跟踪该 agent 的行为轨迹，这一"元观察"体现了社区对自主 agent 行为研究的浓厚兴趣。

2. **[#91009](https://github.com/openclaw/openclaw/issues/91009) Codex PreToolUse native hook relay 产生 CPU 密集的 openclaw-hooks 进程并阻塞网关 RPC（20 评论）** — 每个 hook 进程消耗 100%+ CPU，直接拖垮网关性能。这一问题的讨论热度表明 Codex 集成路径的性能退化是当前用户的核心痛点之一。

3. **[#68596](https://github.com/openclaw/openclaw/issues/68596) 可配置的流式看门狗超时阈值（15 评论，👍 8）** — 当使用长推理模型（如 DeepSeek-R1）时，30 秒的固定超时频繁误报。用户明确要求可配置化，这是长推理模型普及后必然出现的适配需求。

4. **[#62505](https://github.com/openclaw/openclaw/issues/62505) Coding Agent 不再完成任务（回归，15 评论）** — 在 2026.4.2 及更早版本正常工作的 coding agent 在升级后只会输出模糊状态更新和道歉。回归问题且被标记为 P1，属于高影响问题。

5. **[#38327](https://github.com/openclaw/openclaw/issues/38327) "Cannot convert undefined or null to object"（14 评论，👍 3）** — 2026.3.2 版本在使用 google-vertex/gemini-3.1-pro-preview 时必然触发，被标记为 platinum hermit 级别。

**需求分析**：评论数 TOP 的 Issue 高度同质化——大部分是"消息丢失"、"会话状态损坏"、"进程崩溃/挂起"类问题，且大量被标记为 `clawsweeper:needs-maintainer-review` 和 `needs-product-decision`。这说明当前用户最迫切的需求是**稳定性**而非新功能。社区对开发 agent 行为的观察（#77598）和对编码 agent 退化的抱怨（#62505）共同指向：**自主 agent 的可靠性是用户信任的基石**，而目前这一基石并不牢固。


## Bug 与稳定性

以严重程度和影响范围排序：

### P0 级

- **[#70903](https://github.com/openclaw/openclaw/issues/70903) 持久化文件型 provider cooldown 在账单恢复后仍持续阻塞用户数小时（P0，7 评论）** — 当 provider 返回 402 计费错误时，`disabledUntil` 时间戳被持久化到文件并在网关重启后依然生效。反复失败会延长封禁时间，即使用户已充值也无法立即恢复服务。无 fix PR，且被标记为 `impact: ux-release-blocker`，属于发布阻断级问题。

### P1 级

- **[#91009](https://github.com/openclaw/openclaw/issues/91009) Codex PreToolUse hook relay 产生 CPU 密集进程并阻塞网关 RPC（P1，20 评论）** — 每个 `openclaw-hooks` 进程消耗 100%+ CPU，导致网关 RPC 停滞。影响 Codex 集成的可用性。无 fix PR。

- **[#62505](https://github.com/openclaw/openclaw/issues/62505) Coding Agent 无法完成任务（P1 回归，15 评论）** — 4.2 及更早版本功能正常，新版本中 agent 只输出模糊状态更新。无 fix PR，是社区呼声较高的回归。

- **[#38327](https://github.com/openclaw/openclaw/issues/38327) Gemini-3.1-pro-preview 触发 "Cannot convert undefined or null to object"（P1 回归，14 评论，👍 3）** — 2026.3.2 起必然复现，已被标记为 platinum hermit。无 fix PR。

- **[#86215](https://github.com/openclaw/openclaw/issues/86215) Codex OAuth 刷新失败可阻塞 agent 数小时且无告警（P1，11 评论）** — 401 令牌失效后系统在同一认证通道内持续重试，无主动的 profile 轮换或运维可见告警。无 fix PR。

- **[#78493](https://github.com/openclaw/openclaw/issues/78493) `sudo openclaw update` 造成混合文件属主，doctor 在 EACCES 后覆写配置（P1，7 评论）** — macOS 上以 root 执行更新后，普通用户运行 doctor 遇到权限错误后反而覆写了配置文件。涉及升级安全和配置损坏双重问题。无 fix PR。

- **[#97616](https://github.com/openclaw/openclaw/issues/97616) 子进程（hook/tool）泄漏导致僵尸进程堆积（P1 回归，8 评论）** — 长期运行后 `openclaw-hooks`、`bash`、`codex` 子进程变为僵尸进程，导致运行时性能退化。注意：PR [#125485](https://github.com/openclaw/openclaw/pull/125485) 与 [#125388](https://github.com/openclaw/openclaw/pull/125388) 虽分别处理 exec 提示与本地模型流策略，但均未直接针对该问题。

- **[#53540](https://github.com/openclaw/openclaw/issues/53540) 工具调用参数生成延迟超过底层请求超时导致 "Network connection lost"（P1，8 评论）** — LLM 生成大参数工具调用时，耗时长于底层请求超时。无 fix PR。

- **[#53408](https://github.com/openclaw/openclaw/issues/53408) 长对话后 write/exec 工具参数被静默丢弃（P1，11 评论，👍 2）** — 15+ 轮对话后工具调用参数变为空对象。无 fix PR。

- **[#45224](https://github.com/openclaw/openclaw/issues/45224) Playwright CDP 断言错误导致网关崩溃（P1，7 评论）** — 未捕获的 CDP 断言异常使整个网关进程退出，依赖 launchd 重启。无 fix PR。

### P2 级（部分）

- **[#51429](https://github.com/openclaw/openclaw/issues/51429) 工作路径被硬编码为 `/Users/wangtao` 并随版本发布（P2，12 评论）** — 开发者将个人工作区路径硬编码进代码并合并发布，新用户的工作目录被错误设置为该路径。属于严重的代码审查疏漏。无 fix PR。

- **[#107814](https://github.com/openclaw/openclaw/issues/107814) gpt-5.3-codex-spark 对必需参数的工具调用发出空参数（P2，7 评论）** — 每次调用在 schema 校验前即被拒绝。无 fix PR。

- **[#77930](https://github.com/openclaw/openclaw/issues/77930) Discord 频道在 2026.5.4 未被加载（P2 回归，7 评论）** — 回归矩阵显示 beta.1 正常、beta.2 起损坏。已有 linked PR 在处理。

- **[#112196](https://github.com/openclaw/openclaw/issues/112196) memory_search 的瞬时同步超时被误报为持久性 provider 故障（P2，7 评论）** — 网关重启后 `memory_search` 报 "database is not open" 或 "timed out after 15s"，被误判为 embedding provider 故障。已有 linked PR 在处理。

- **[#71689](https://github.com/openclaw/openclaw/issues/71689) tasks registry 在 SQLite 镜像损坏时恢复失败（P1，7 评论）** — 因 `runs.sqlite` 损坏（"database disk image is malformed"）导致网关启动反复失败。无 fix PR。

**已有关联修复 PR 的 Bug**：
- [#125261](https://github.com/openclaw/openclaw/pull/125261) 修复长会话预览加载冻结，对应 [#125260](https://github.com/openclaw/openclaw/issues/125260)
- [#125388](https://github.com/openclaw/openclaw/pull/125388) 修复本地模型流策略被诊断恢复误中止，对应 [#125147](https://github.com/openclaw/openclaw/issues/125147)
- [#125483](https://github.com/openclaw/openclaw/pull/125483) 修复升级后稳定版配置键损坏，涉及 [#121026](https://github.com/openclaw/openclaw/issues/121026) 系列


## 功能请求与路线图信号

根据今日 PR 动向与热门功能请求的关联度，以下方向可能被纳入后续版本：

1. **长推理模型适配（高概率）**：[#68596](https://github.com/openclaw/openclaw/issues/68596) 要求可配置的流式看门狗超时阈值（👍 8，15 评论），直接服务于 DeepSeek-R1、kimi-k2.5 等长思考模型的场景。这是模型生态变化带来的刚需，PR 方向明确，预计不会太久。

2. **会话/上下文可靠性（高概率）**：[#124303](https://github.com/openclaw/openclaw/pull/124303) 为上下文窗口添加来源追踪和失效机制（P1，`extensions: codex`），直指 [#67419](https://github.com/openclaw/openclaw/issues/67419)（bootstrap 文件每轮重复注入浪费 20-30% token）与模型切换时静默失败（[#58957](https://github.com/openclaw/openclaw/issues/58957)）等上下文管理问题。该 PR 虽等待作者更新，但方向明确，与社区诉求高度对齐。

3. **Control UI 体验持续优化（进行中）**：来自 `vyctorbrzezowski` 的连续 PR（[#125240](https://github.com/openclaw/openclaw/pull/125240) 重构工具调用展示、[#125225](https://github.com/openclaw/openclaw/pull/125225) 修复会话建议宽度、[#125219](https://github.com/openclaw/openclaw/pull/125219) 简化 Markdown 表格样式、[#123356](https://github.com/openclaw/openclaw/pull/123356) 斜杠命令参数暂存）表明 Web UI 正经历一轮系统性的体验打磨。这与 [#75947](https://github.com/openclaw/openclaw/issues/75947)（基于 UX 评分改进 UI，👍 2）和 [#42840](https://github.com/openclaw/openclaw/issues/42840)（MathJax/LaTeX 支持，👍 10）等社区诉求同向。

4. **多代理/多租户支持（观望中）**：[#71058](https://github.com/openclaw/openclaw/issues/71058) 要求单网关支持多个 Azure/Teams 机器人，[#66252](https://github.com/openclaw/openclaw/issues/66252) 要求 per-agent TTS/STT 覆盖，[#67413](https://github.com/openclaw/openclaw/issues/67413) 要求 per-agent dreaming 配置（👍 5）。这些请求共同指向多代理场景下的细粒度配置能力，但目前均无对应 PR，预计优先级不高。

5. **配置格式与可运维性（低概率）**：[#45758](https://github.com/openclaw/openclaw/issues/45758) 要求支持 YAML 配置（👍 2），[#71452](https://github.com/openclaw/openclaw/issues/71452) 要求分页替代硬编码 25 条限制。属于长期存在的改进类需求，暂无明确 PR 信号。


## 用户反馈摘要

- **"升级即退化"的挫败感正在累积**：[#62505](https://github.com/openclaw/openclaw/issues/62505) 的作者描述了一个工作了数周的 coding agent 在升级后"什么都不做，只给出模糊的状态更新然后道歉"。类似的回归报告还包括 Discord 频道加载（[#77930](https://github.com/openclaw/openclaw/issues/77930)）、Gemini 模型调用（[#38327](https://github.com/openclaw/openclaw/issues/38327)）、Coding Agent 行为（[#62505](https://github.com/openclaw/openclaw/issues/62505)）。用户对"升级前能用、升级后坏了"的模式越来越敏感。

- **硬编码路径事件引发信任危机**：[#51429](https://github.com/openclaw/openclaw/issues/51429) 中，中文用户发现全新安装的 OpenClaw 会在 `/Users/wangtao` 下创建工作目录，直指"有人把工作路径硬编码进代码居然被合并发布了"。这反映了社区对代码审查流程的质疑，也暴露了项目在发布前验证上的短板。

- **对"静默失败"的普遍不满**：[#53408](https://github.com/openclaw/openclaw/issues/53408) 描述工具参数被静默丢弃（"工具调用到达时参数为空对象"），[#58957](https://github.com/openclaw/openclaw/issues/58957) 描述模型切换时静默失败且无错误提示，[#80396](https://github.com/openclaw/openclaw/pull/80396) 处理 `MEDIA:` token 在代码块中被静默忽略的问题。用户在多个场景下表达了同一诉求：**失败时请明确告知，不要静默**。

- **正面反馈**：[#73537](https://github.com/openclaw/openclaw/issues/73537) 中用户明确感谢 OpenClaw 团队，"它已成为我们家庭和业务工作流的一部分"（Telegram 集成、自动化、定时任务、Home Assistant 控制）。该作者还提出了生产就绪稳定性标签的建议——用户从"好用"走向了"需要更稳定"的诉求阶段。


## 待处理积压

以下问题长期无实质性推进，需维护者关注：

1. **[#70903](https://github.com/openclaw/openclaw/issues/70903) Persistent file-based provider cooldown（P0，4/24 创建，7 评论）** — 唯一的 P0 级问题且被标记为 `ux-release-blocker`，影响用户充值后的即时恢复。近 4 个月未出现 fix PR，属于发布阻断级风险。

2. **[#38327](https://github.com/openclaw/openclaw/issues/38327) Gemini-3.1-pro-preview "Cannot convert undefined or null to object"（P1，3/6 创建，14 评论）** — 自 2026.3.2 起每次对话必然触发，是 platinum hermit 级别的高影响回归。5 个月过去，修复 PR 迟迟未出现。

3. **[#62505](https://github.com/openclaw/openclaw/issues/62505) Coding Agent 从未完成任何任务（P1，4/7 创建，15 评论）** — 社区强烈关注的回归，直接打击核心场景（编程助手），长时间无 fix PR。

4. **[#91009](https://github.com/openclaw/openclaw/issues/91009) Codex hook relay CPU 密集进程（P1，6/6 创建，20 评论）** — 高热度 + 高影响组合，持续 2 个月+ 无 fix PR，被标记为 platinum hermit。

5. **[#51429](https://github.com/openclaw/openclaw/issues/51429) 工作路径硬编码进代码（P2，3/21 创建，12 评论）** — 虽是 P2，但涉及代码审查流程的可信度问题，需要重视。

6. **长期卡在 `needs-maintainer-review` / `needs-product-decision` 的膏药型问题**：如 [#77598](https://github.com/openclaw/openclaw/issues/77598)（agent 行为追踪，5/5 创建）、[#69208](https://github.com/openclaw/openclaw/issues/69208)（重复 transcript/replay/context 组装，4/20 创建）、[#74704](https://github.com/openclaw/openclaw/issues/74704)（SDK happy path 稳定化，4/30 创建）等，大量问题在同一状态下停滞数月，这些标签实质上已成为"低优先级"的同义词——如果标签失去时效性，整个分类体系的可信度也将下降。

7. **PR 积压风险**：367 个待合并 PR 中，`waiting on author` 状态占比高，如 [#124303](https://github.com/openclaw/openclaw/pull/124303)（P1，上下文窗口来源追踪）、[#123356](https://github.com/openclaw/openclaw/pull/123356)（XL 尺寸，斜杠命令 UI 阶段）等，长期等待作者响应会加重积压，建议维护者明确超时策略。


> **项目健康度总结**：OpenClaw 的社区热度持续走高，但项目正处于"高讨论、低收口"的不平衡状态。P1 级 Bug 大量积压且修复缓慢，部分回归已持续数月未解决；与此同时，新功能 PR（尤其是 Web UI 方向的）在快速迭代，可能分散了维护者处理稳定性问题的精力。建议维护者关注修复合并率（27%），并优先处理带有 `impact: message-loss`、`crash-loop` 标签的高影响问题，避免信任透支。

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向分析日报

**日期：** 2026-08-18


## 1. 生态全景

个人 AI 助手开源生态正处于高速分化与整合并行的阶段。以 OpenClaw 为核心的通用型自主智能体框架持续保持极高的社区热度，但其"高讨论、低收口"的状态凸显了维护者带宽已成为生态发展的共同瓶颈。与此同时，一批聚焦特定场景的项目（Zeroclaw 的安全加固、NanoBot 的 Telegram 稳定性、IronClaw 的持久化优化）正在各自细分领域深耕，形成了差异化的技术路线。生态内多次出现同质化 Bug（工具循环、静默失败、配置持久化失效），反映出框架在"自主 agent 可靠性"这一共性难题上尚未形成成熟解决方案。不同项目间的协作需求（如 LobsterAI 对 OpenClaw 运行时的依赖）也表明，生态正从单体架构走向互操作的模块化阶段。


## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | 合并/关闭 PR | Release | 健康度评估 |
|---|---|---|---|---|---|
| **OpenClaw** | 500 | 500 | 133 | 无 | ⚠️ 活跃度极高，但合并率低（27%），P0/P1 积压严重，处于"高讨论、低收口"状态 |
| **Zeroclaw** | 50（44 活跃，6 关闭） | 50（35 待合并） | 15 | 无 | ✅ 高活跃且产出扎实，安全修复密度高，RFC 治理活跃，v0.9.0 安全加固周期推进顺利 |
| **NanoBot** | 3 | 15 | 5 | 无 | ✅ 活跃度适中，修复与功能并行，Telegram 关键修复已合入，整体健康 |
| **IronClaw** | 29 | 44 | 22 | **1.3.0-rc.1** | ⚠️ 高强度迭代，功能推进快，但候选版本存在阻断性升级崩溃，稳定性风险集中 |
| **NanoClaw** | 30 | 42 | 25 | 无 | ⚠️ 架构整合冲刺期，核心 PR 排队中，Channels/Drivers 层重构活跃，但有回归报告 |
| **CoPaw** | 13 | 33 | 20 | 无 | ✅ 稳定迭代，Console 体验与插件生态双线推进，2.1.0 迭代维护期 |
| **LobsterAI** | 7 | 21 | 18 | 无 | ✅ 活跃，Cowork 体验与安全修复均有实质推进，但历史 stale Issues 积压 |
| **Moltis** | 3 | 9 | 6 | 无 | ✅ 中高活跃，核心逻辑修复推进，但 Podman 兼容问题存在 75 天+ |
| **PicoClaw** | 3 | 3 | 3 | 无 | ✅ 中低活跃，核心静默循环 Bug 已修复，处于渠道兼容性打磨阶段 |
| **EasyClaw** | 0 | 0 | 0 | **v1.8.100** | ✅ 低社区互动但发布节奏正常，维护者驱动模式，无积压 |
| **NullClaw** | 0 | 1 | 0 | 无 | ✅ 维护平稳期，仅依赖例行升级，无社区事件 |
| **TinyClaw** | - | - | - | - | 无活动 |
| **ZeptoClaw** | - | - | - | - | 无活动 |


## 3. OpenClaw 在生态中的定位

OpenClaw 是生态内社区规模与讨论热度最高的通用型自主智能体框架，其 Issue/PR 日更新量（各 500 条）远超其他项目（第二名 Zeroclaw 约各 50 条），是当之无愧的生态核心参照项目。

- **核心优势**：插件生态完善（`security.installPolicy` 机制）、网关/队列基础设施完备（grouped lanes 容量仲裁）、社区活跃度高、讨论深度强（agent 行为元观察类 Issue 热度高）。
- **关键瓶颈**：PR 合并率仅 27%，P0 级问题（#70903 provider cooldown）积压 4 个月未解决，`clawsweeper:no-new-fix-pr` 标签大量堆积，维护者带宽已成为生态发展瓶颈。与 Zeroclaw（合并率 30%、安全修复当天落地）相比，OpenClaw 的响应速度显著落后。
- **技术路线差异**：采用"大而全"的通用框架路线（Web UI + CLI + 多 provider + 插件系统），而 Zeroclaw 走"加固型"路线（v0.9.0 安全里程碑）、NanoBot 走"轻量/可嵌入"路线、IronClaw 聚焦持久化与 DB 优化。OpenClaw 的功能广度领先，但稳定性的追赶成本正在累积。


## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **工具调用循环/静默失败** | OpenClaw、NanoBot、PicoClaw | 工具参数被静默丢弃（OpenClaw #53408）、`complete_goal` 无限循环（NanoBot #4864）、重复工具失败静默循环（PicoClaw #3311，已修复）。共性根因：工具结果/错误缺少显式反馈机制，agent 无法判断是否应终止 |
| **长推理模型适配** | OpenClaw、LobsterAI | 流式看门狗 30s 固定超时频繁误报（OpenClaw #68596）、`finish reason: full` 输出截断（LobsterAI #1671）。长思考模型（DeepSeek-R1 等）需要可配置超时与分批/续写机制 |
| **多 Agent/多频道协作** | OpenClaw、Zeroclaw、LobsterAI、CoPaw | agent 间互不感知（LobsterAI #1644）、按频道独立配置模型（CoPaw #7085）、多 agent 协作会话隔离（CoPaw #7011）。用户期望从"单 agent 对话"走向"多 agent 编排" |
| **跨渠道/会话隔离** | CoPaw、NanoBot、PicoClaw | 多 UI 会话竞态导致停止请求误杀活跃会话（CoPaw #7011）、Telegram 轮询中断（NanoBot #5171）、IRC 长消息重组（PicoClaw #3287）。多渠道部署已是刚需 |
| **配置持久化与热更新** | OpenClaw、Zeroclaw、LobsterAI、Moltis、NanoBot | groupPolicy 被覆盖（LobsterAI #1653）、cron 禁用不生效（NanoBot #5407）、`heartbeat.update` 参数解析覆盖全配置（Moltis #1209）。配置语义一致性成为信任基石 |
| **可插拔架构（Driver/Provider）** | NanoClaw、IronClaw、CoPaw、LobsterAI | 可插拔运行时（NanoClaw #3306）、catalog 驱动模型系统（CoPaw #6302）、Chat Completions 协议兼容（Zeroclaw #8603）、DeepSeek Harness（LobsterAI）。生态正从硬编码走向模块化 |


## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构 |
|---|---|---|---|
| **OpenClaw** | 通用自主智能体框架，功能最全（Web UI、插件、多 provider） | 技术爱好者、开发者、希望深度定制的高阶用户 | 网关/队列/技能三层架构，插件系统 + 可配置政策，社区驱动 |
| **Zeroclaw** | 企业级安全与合规（SSRF 防护、凭据边界、审计）、RFC 治理驱动 | 对安全有强要求的企业/团队用户 | Rust 实现，v0.9.0 安全架构重构（可插拔认证、安全决策管线） |
| **NanoBot** | 轻量、可嵌入、消息稳定性（Telegram/WebUI） | 个人用户、中小团队、Telegram 深度用户 | Python 实现，Gateway + 多 provider 路由，低成本部署 |
| **IronClaw** | 持久化与 DB 写入优化、大规模部署可靠性 | 需要长期运行、高并发场景的生产用户 | Rust 实现，libSQL 持久化，Epic 驱动性能优化 |
| **NanoClaw** | 架构演进、多频道（Slack）深度集成、可插拔 Driver | 开发者社区、Slack 生态用户 | Driver Seam + 频道抽象，核心团队主导快速迭代 |
| **CoPaw** | 多智能体协作、多渠道部署、插件生态 | 企业用户、多平台部署的团队 | Console + 多频道（飞书/钉钉/微信），插件运行时（DataPaw） |
| **LobsterAI** | 桌面端体验、可视化、OpenClaw 运行时集成 | 桌面端用户、非技术用户 | 基于 OpenClaw 运行时，Electron + 桌面端 UI，侧重易用性 |
| **Moltis** | 核心逻辑可靠性（heartbeat/调度）、WebUI 增强 | 需要定时调度与自动化场景的个人用户 | Rust 实现，acp agent 集成，Files 库推进中 |
| **PicoClaw** | 渠道兼容性打磨、轻量级 Agent | 嵌入式/轻量部署场景的用户 | 轻量级实现，多渠道（Telegram/Slack/IRC），注重资源占用 |
| **EasyClaw** | 达人协作/联盟营销 | 特定垂直行业用户 | 维护者驱动，专注业务场景功能扩展 |
| **NullClaw** | 维护平稳、无新特性 | 稳定依赖场景 | Docker 基础镜像，单调维护 |


## 6. 社区热度与成熟度

**快速迭代阶段（高活跃、高产出，但稳定性和合并效率是挑战）：**
- **OpenClaw**：日更新量生态第一，但合并率为 27%，大量 P1 积压，处于"需求爆发增长"阶段。
- **Zeroclaw**：安全加固与 RFC 流程并行推进，产出密度高，迭代节奏快而有序。
- **IronClaw**：大版本发布前夜，功能推进快但候选版本暴露出阻断性升级问题，稳定性需警惕。
- **NanoClaw**：架构重构冲刺期，合并频率高，但回归风险较高。

**质量巩固阶段（迭代稳定，主要精力放在打磨与修复）：**
- **NanoBot**：修复与功能并行，Telegram 关键稳定性修复已合入，整体健康。
- **CoPaw**：2.1.0 迭代维护期，Console 体验优化密集，质量与功能双线推进。
- **LobsterAI**：Cowork 体验打磨 + 安全修复同步进行，节奏稳定。
- **Moltis**：核心逻辑修复推进中，处于质量巩固与功能增强的过渡阶段。
- **PicoClaw**：渠道适配收尾，核心循环问题已解决，进入低频维护期。

**维护平稳阶段（低活跃、无重大事件）：**
- **EasyClaw**：发布节奏正常但社区互动静默。
- **NullClaw**：仅依赖例行升级，社区沉寂。
- **TinyClaw / ZeptoClaw**：24 小时无任何活动。


## 7. 值得关注的趋势信号

1. **"自主 agent 可靠性"是生态共同瓶颈**：OpenClaw（#53408）、NanoBot（#4864）、PicoClaw（#3311）等多个独立项目出现同质的"工具调用循环/静默失败"问题。用户最迫切的需求是"失败时明确告知"（OpenClaw #53408 评论："不要静默"）——这是所有 agent 框架的信任基石，尚未有人彻底解决。建议开发者将"可观测性 + 错误显式反馈"作为最高优先级设计目标。

2. **长推理模型催生基础设施适配需求**：OpenClaw 的流式看门狗超时、LobsterAI 的输出截断都在传递同一个信号——DeepSeek-R1 等"慢思考"模型正在普及，现有超时机制（30 秒固定阈值）和输出长度假设均已过时。这一趋势将推动配置化的超时/续写/批处理能力成为标配。

3. **多 Agent 编排从概念走向刚需**：LobsterAI（#1644）、CoPaw（#6925）、Zeroclaw（#8303 Goal mode）的用户都在要求"让 main agent 组织其他 agent 完成任务"。用户不再满足于单 agent 对话，而是期望框架提供跨 agent 的任务编排能力。这一需求与 VOKO 等跨平台通信层的出现（LobsterAI #2500）共同指向 A2A 标准的萌芽。

4. **多渠道部署的配置灵活性成为生产刚需**：CoPaw（#7085 按频道配置模型）、OpenClaw（#71058 多机器人支持）的诉求表明，用户正在将 agent 部署到飞书、钉钉、微信、Telegram 等多个平台，并期望每个渠道有独立的模型、策略与会话隔离能力。这将推动"catalog 驱动"的配置架构（如 CoPaw #6302）成为主流。

5. **"升级即退化"正在侵蚀用户信任**：OpenClaw（#62505 coding agent 回归）、IronClaw（#7720 升级崩溃）、NanoBot（#5407 cron 禁用不生效）的回归报告，以及 LobsterAI 的配置覆盖问题（#1653），共同指向一个系统性风险：快速迭代缺乏足够的回归测试覆盖。用户在多个项目中表达了"升级前能用、升级后坏了"的强烈挫败感。建议各项目建立**升级回归测试矩阵**，作为发布阻断级检查项——这一举措的成本远低于信任修复的成本。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 — 2026-08-18

## 今日速览

NanoBot 过去 24 小时活跃度较高：共有 3 条 Issue 更新和 15 条 PR 更新，其中 5 条 PR 已合并/关闭，10 条待审查合并。值得关注的是 Gateway 进程管理、Telegram 轮询稳定性与成本控制成为社区核心关切——三个维度均有对应 PR 或 Issue 提出与推进。无新版本发布，但合并的 PR 中包含了 Telegram 轮询停滞后自动恢复的重要修复。整体项目健康度良好，修复与功能开发并行推进，社区贡献者参与积极。

---

## 项目进展

今日合入/关闭的 PR 主要集中在 Telegram 稳定性、CLI 体验及目标循环修复三个方面：

- **[已合并] fix(telegram): recover from silently stalled polling (#5156)** — 修复 #5171，解决瞬时网络故障后 Telegram 轮询永久静默停摆的问题。PR #5301 作为其低风险可观测性拆分件（bridging stdlib logging + 轻量 liveness 检查）也同步合入，为完整 watchdog 机制铺路。这是今日对生产稳定性贡献最大的一项改动。
- **[已合并] feat(cli): add native TypeScript terminal UI (#5406)** — 为 CLI 增加原生 TypeScript 终端 UI，取代此前被误合并后回滚的 #4329。该 PR 保留了完整提交历史并附带跨终端修复，是 CLI 体验的一次实质性升级。
- **[已合并] fix(goal): stop repeating clarification replies (#5410)** — 修复持续目标（sustained goal）激活时，智能体将每个普通文本回复误判为需要延续目标而导致重复澄清的问题，并保留 tool-call 预算边界处的正确延续行为。
- **[已合并] fix(gateway): stabilize process identities (#5416)** — 将 macOS 上依赖区域设置的 `ps lstart` 进程标识替换为原生 `proc_pidinfo` 时间戳，并统一 gateway 客户端租约比较逻辑，提升跨平台进程管理一致性。

整体来看，项目在 Telegram 连接稳定性、CLI 交互体验和 Agent 目标执行正确性三个方向均有实质性推进。此外还有多条针对 Gateway、Slack 文件下载校验和 Provider fallback 的修复 PR 正在待审查状态，下一波合并值得期待。

---

## 社区热点

- **Issue #4864 — `<tool_call>` 无限循环 bug（7 条评论，1 👍）**  
  [链接](https://github.com/HKUDS/nanobot/issues/4864)  
  这是当前讨论最激烈的问题：`complete_goal` 工具因 gateway 将 recap 参数解析为裸字符串而非 JSON 对象而持续报错，导致智能体陷入无限循环。该 Bug 已开放超过一个月（7 月 9 日创建），用户指出这很可能是最近一次 gateway 工具参数序列化改动引入的回归。虽然评论数最多，但尚未看到对应的修复 PR，需重点关注。

- **PR #5406 — 原生 TypeScript 终端 UI（含恢复说明）**  
  [链接](https://github.com/HKUDS/nanobot/pull/5406)  
  该 PR 的"恢复说明"引发社区关注——此前 #4329 因 head 短暂出现在 main 分支上被误标为已合并，随后 main 被立即还原。这一事件暴露了 PR 合并流程的潜在风险，社区对提交历史的完整性保持关注。

- **Issue #5409 — 混合支出防火墙（新开，0 评论）**  
  [链接](https://github.com/HKUDS/nanobot/issues/5409)  
  新提交的 Issue 提出为商业化场景添加混合支出防火墙，防止无限循环导致 LLM 费用失控。虽暂无评论，但切中 Agent 规模化部署的核心痛点，预计会获得较多关注。

---

## Bug 与稳定性

| 严重程度 | Issue/PR | 描述 | 状态 |
|---------|----------|------|------|
| **高** | [#4864 (Issue)](https://github.com/HKUDS/nanobot/issues/4864) | `complete_goal` 因 gateway 参数序列化问题持续报错，导致无限循环 | 🟡 开放，无修复 PR |
| **高** | [#5171 (Issue)](https://github.com/HKUDS/nanobot/issues/5171) | Telegram 轮询在瞬时网络故障后永久静默停摆，进程存活但不再接收消息 | 🟢 已由 #5156 修复并合入 |
| **中** | [#5407 (PR)](https://github.com/HKUDS/nanobot/pull/5407) | 设置 `heartbeat.enabled=false` 并重启后，持久化 cron 任务仍在触发，持续消耗 token | 🟡 修复 PR 待审查 |
| **中** | [#5415 (PR)](https://github.com/HKUDS/nanobot/pull/5415) | Windows 上 gateway 管理的 venv 子进程 PID 归属问题 | 🟡 修复 PR 待审查 |
| **中** | [#5414 (PR)](https://github.com/HKUDS/nanobot/pull/5414) | Slack 私有下载 URL 可能被重定向至恶意地址，缺少完整重定向链校验 | 🟡 修复 PR 待审查 |
| **中** | [#5413 (PR)](https://github.com/HKUDS/nanobot/pull/5413) | LLM provider 抛出异常时无法触发 fallback 策略（仅处理 error response） | 🟡 修复 PR 待审查 |
| **低** | [#5412 (PR)](https://github.com/HKUDS/nanobot/pull/5412) | 后台 gateway/API 进程输出因 Python 块缓冲无法及时写入日志文件 | 🟡 修复 PR 待审查 |

今日修复 Telegram 轮询停摆问题的 #5156 是稳定性方面最重要的进展。而 #4864 作为持续一个月的高严重度循环 Bug 仍无人认领，是当前最大的稳定性风险点。

---

## 功能请求与路线图信号

- **WebUI 会话能力增强（PR #5358, #5364, #5408）** — 三条 PR 分别添加会话 @提及消息、临时侧边会话（`/side`）与后续建议（follow-up suggestions），共同指向 WebUI 从单线程对话向多会话协作工作台演进的方向。均带 `webui` + `feature` 标签，虽存在合并冲突，但功能设计完整且有测试支撑，较可能进入下一版本。
- **混合支出防火墙（Issue #5409）** — 用户建议在框架层增加支出上限与熔断机制，防止 Agent 无限循环消耗 LLM 预算。该需求与 #4864 的无限循环问题直接相关——若循环问题无法根治，防火墙是一种务实的兜底方案，路线图纳入概率较高。
- **CLI 原生 TUI（PR #5406）** — 已合入。终端 UI 将替换现有纯文本交互，后续可能吸引更多终端用户群体。
- **Windows 平台适配（PR #5341, #5415）** — 天气技能中的 `curl` PowerShell 别名问题与 venv 子进程 PID 归属问题均有对应修复 PR，此前对 Windows 支持有明显短板，正在逐步补齐。

---

## 用户反馈摘要

- **Telegram 轮询静默停摆引发信任危机（#5171）** — 用户反馈"进程存活但日志完全静默、消息堆积在服务器端"的现象。手动调用 `getUpdates` 返回 200 但机器人仍不响应，说明问题深藏在轮询循环内部。该问题由瞬时网络故障触发且不可自愈，对依赖 Telegram 作为生产通道的用户影响极大。修复 PR #5156 合入后，建议相关用户尽快升级验证。
- **无限循环导致 LLM 费用失控（#4864 评论 + #5409）** — 用户指出 `complete_goal` 的序列化 bug 导致智能体反复调用同一工具，每次失败不断消耗 token。有用户形容这"像是在烧钱"。这是框架层参数序列化健壮性问题直接转化为财务损失的真实案例。
- **cron 任务禁用不生效（#5407）** — 用户反馈设定 `gateway.heartbeat.enabled=false` 并重启后，持久化的系统任务仍在按原计划触发。虽然启动日志显示"disabled"，但任务实际继续运行并消耗 token——配置语义与运行时行为不一致，影响用户对配置体系的信任。
- **Windows 用户体验改善（#5341）** — 用户指出在 Windows PowerShell 上，裸 `curl` 命令会被解析为 `Invoke-WebRequest` 别名，导致天气技能首次调用必然失败，需智能体自我纠错重试。这是跨平台一致性问题在技能层的具体体现。

---

## 待处理积压

- **Issue #4864 — `<tool_call>` 完整目标无限循环（开放 40 天）**  
  [链接](https://github.com/HKUDS/nanobot/issues/4864)  
  7 条评论、1 个 👍，高严重度。用户明确指出是 gateway 端工具参数序列化改动引起的回归，但至今无修复 PR 或维护者确认。这是当前积压中最需要优先处理的问题——长期存在的循环 bug 会持续消耗用户 LLM 预算并造成体验损伤。

- **PR #5341 — 天气技能 Windows 兼容修复（开放 7 天）**  
  [链接](https://github.com/HKUDS/nanobot/pull/5341)  
  修复方案清晰，带有测试与明确的问题描述，但暂无维护者介入。若项目方认可 Windows 平台为重要支持目标，建议尽快安排审查。

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-08-18

## 今日速览

过去 24 小时 Zeroclaw 仓库保持了较高的活跃度：共产生 50 条 Issue 更新（44 条活跃、6 条关闭）和 50 条 PR 更新（35 条待合并、15 条已合并/关闭），无新版本发布。当前项目处于 **v0.9.0 安全与架构加固周期**，RFC 讨论、安全修复和 CI 基础设施改进三条主线并行推进。值得关注的是，本周多个高优先级安全修复 PR 集中落地（Gemini API key 泄露、QQ/Mattermost 下载边界、action budget 原子性），同时维护者 Audacity88 主导的 RFC 治理流程优化也在实质推进。项目整体健康度较高，但需注意大量 RFC 处于已接受但未完成实施的状态。

## 项目进展

今日合并/关闭的 PR 主要集中在安全修复、CI 改进和测试稳定性三个方向。

**安全修复（v0.9.0 安全里程碑）**

| PR | 说明 | 风险等级 |
|---|---|---|
| [#9973](https://github.com/zeroclaw-labs/zeroclaw/pull/9973) | 修复 Gemini API key 出现在 URL 中的问题，改用 `x-goog-api-key` 请求头，防止 URL 日志泄露凭据 | P1 高 |
| [#10000](https://github.com/zeroclaw-labs/zeroclaw/pull/10000) | 为 QQ 和 Mattermost 频道的附件下载增加统一的有界响应读取器，修复无限制下载的隐患 | P1 高 |
| [#9993](https://github.com/zeroclaw-labs/zeroclaw/pull/9993) | 修复 Email 频道附件隐式读文件的问题——空 payload 不再将显示文件名当作本地文件路径读取 | P2 高 |
| [#9996](https://github.com/zeroclaw-labs/zeroclaw/pull/9996) | 将 action budget 的预检查和记录改为原子操作（先预留、后提交），修复并行调用可能超额使用的问题 | P2 高 |
| [#9612](https://github.com/zeroclaw-labs/zeroclaw/pull/9612) | WhatsApp Cloud approval token 增加 guard 保护，防止进程退出时 token 残留 | P1 高 |
| [#9765](https://github.com/zeroclaw-labs/zeroclaw/pull/9765) | 修复 SOP 定义从 data_dir 而非共享工作区加载的问题 | P1 高 |

**CI 与测试基础设施**

- [#10039](https://github.com/zeroclaw-labs/zeroclaw/pull/10039) 提取了跨工作流共享的 Clippy 命令运行器，避免 Linux/macOS/Windows Clippy 任务之间逻辑漂移
- [#9398](https://github.com/zeroclaw-labs/zeroclaw/pull/9398) 新增 macOS 和 Windows 的定时测试工作流，补上跨平台覆盖缺口
- [#10043](https://github.com/zeroclaw-labs/zeroclaw/pull/10043) 移除了 Lint 中重复的架构测试守卫，明确了 Test 任务的职责归属
- [#10010](https://github.com/zeroclaw-labs/zeroclaw/pull/10010) 修复 cron 自定义 shell 测试中的 ETXTBSY 竞态问题
- [#9547](https://github.com/zeroclaw-labs/zeroclaw/pull/9547) 将 CPAL 依赖从 0.15 升级到 0.18，Voice Wake 模块迁移至统一 API

**行为修复**

- [#9544](https://github.com/zeroclaw-labs/zeroclaw/pull/9544)（合并）修复 delegate 工具未按配置使用 provider fallback 的问题，委托目标现在走 canonical session provider builder，保留配置的别名、路由、重试和回退策略

## 社区热点

**1. RFC: Work Lanes, Board Automation, and Label Cleanup（[#6808](https://github.com/zeroclaw-labs/zeroclaw/issues/6808)）— 23 条评论**

讨论最活跃的 Issue，已迭代到第 26 版修订。该 RFC 旨在让工作路由更自动化，减少维护者的手动看板管理负担。说明社区对项目治理效率的提升有较高期待，同时暗示当前手动流程已有些吃力，**与 #9496（简化 RFC 流程）的诉求形成呼应**。

**2. RFC: ZeroClaw Chat Completions profile（[#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603)）— 23 条评论，0.8.4 已开始推进**

讨论热度最高。核心诉求是让 ZeroClaw 兼容 OpenAI Chat Completions 协议，以接入 Open WebUI、LobeChat、Continue.dev、Aider、LangChain 等主流客户端。这反映出社区对**生态互操作性**的强烈需求——用户希望用熟悉的工具界面来使用 ZeroClaw 的 agent 能力，而不是局限于自有的 WebSocket/ACP/webhook 接口。

**3. RFC: Goal mode v1 — bounded foreground Matrix work（[#8303](https://github.com/zeroclaw-labs/zeroclaw/issues/8303)）— 22 条评论，1 👍**

讨论如何让 agent 在多个轮次中持续追踪一个有边界的用户目标，需要跨轮次维持状态。用户对 agent 能自主完成多步任务的能力有期望，且希望这个过程可控（bounded）。

**4. RFC: 高危 Shell 命令的逐次确认 + 命令策略（allow/ask/deny）（[#7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155)）— 20 条评论**

用户对 shell 工具的安全控制提出了更细粒度的需求——参考 Claude Code 的模式做命令分类策略。这反映了**对 agent 自主执行能力的安全边界关注**正在增加。

## Bug 与稳定性

**已关闭（有修复 PR）**

| Issue | 严重度 | 说明 | 修复 PR |
|---|---|---|---|
| [#9849](https://github.com/zeroclaw-labs/zeroclaw/issues/9849) | S2 | `RateLimitedTool` 预算检查非原子（先检查后记录），并行执行时可超额 | [#9996](https://github.com/zeroclaw-labs/zeroclaw/pull/9996) 已合并 |
| [#9594](https://github.com/zeroclaw-labs/zeroclaw/issues/9594) | S2 | 编码 agent CLI 工具对一次成功调用重复计费两次 action budget | 已关闭 |

**待处理（in-progress 或 open）**

| Issue | 严重度 | 状态 | 说明 |
|---|---|---|---|
| [#10023](https://github.com/zeroclaw-labs/zeroclaw/issues/10023) | P2 | in-progress | 失败日志记录请求的模型名而非实际服务的 fallback 模型名，排查问题时会误导 |
| [#10011](https://github.com/zeroclaw-labs/zeroclaw/issues/10011) | P2 | in-progress | daemon heartbeat 测试中允许运行时写入可执行文件，需重构测试避免 ETXTBSY 竞态 |

## 功能请求与路线图信号

**高热度、可能进入 v0.9.0 的路线图项**

1. **OpenAI Chat Completions 协议兼容（[#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603)）** — 已接受，0.8.4 起开始推进。将显著扩大 ZeroClaw 的客户端生态覆盖，是当前社区呼声最高的功能性需求。

2. **运行时持有的会话会话（[#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487)）与统一附件架构（[#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488)）** — 两者相互关联，都是运行时架构调整，预计合入 v0.9.0 的破坏性变更批次。

3. **统一包/能力/配置/运行时状态目录契约（[#9346](https://github.com/zeroclaw-labs/zeroclaw/issues/9346)）** — 配合 #8908/#8909 分阶段推进，目标是提供产品级的统一目录视图。

4. **ZeroCode 文本输入支持 Option-Backspace 删除单词（[#10059](https://github.com/zeroclaw-labs/zeroclaw/issues/10059)）** — 新建的 good first issue，macOS 用户的体验改进，优先级 P3，预计合入较快。

**值得注意的信号**

- [#10065](https://github.com/zeroclaw-labs/zeroclaw/pull/10065)（新 PR，open）修复 ZeroCode 文件资源管理器搜索模式下方向键无法移动高亮的问题——说明 ZeroCode Web UI 的功能完善仍在继续
- [#9621](https://github.com/zeroclaw-labs/zeroclaw/issues/9621)（分阶段 opt-in 遥测）处于已接受状态但讨论不多，这类涉及隐私的 RFC 日后落地时需关注社区反馈

## 用户反馈摘要

- **对生态互操作性的强烈期待**：多位用户在 [#8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603) 下表达了对标准协议支持的期盼——"希望能在 Open WebUI/LobeChat 里直接用 ZeroClaw"。Chat Completions 兼容被视为打通现有 AI 工具链的关键一步。

- **安全默认值的诉求**：WhatsApp `allowed_groups` 安全问题（[#9397](https://github.com/zeroclaw-labs/zeroclaw/issues/9397)）显示用户对"默认安全"的期待——空列表不应等于放行所有群。此前也存在 SSRF、Email 附件读取等默认不安全的隐患，正在逐项收紧。

- **对配置生效即时性的在意**：多位用户关注配置保存后安全策略/频道是否需要 daemon 重载才能生效（[#7897](https://github.com/zeroclaw-labs/zeroclaw/issues/7897)），期望热更新减少运维摩擦。

- **对 RFC 流程效率的抱怨**：维护者 Audacity88 在 [#9496](https://github.com/zeroclaw-labs/zeroclaw/issues/9496) 中坦承"RPC 流程比它所服务的决策本身还要慢"，并提出了缩短讨论期、降低全票门槛的具体方案，获得了持续关注。

## 待处理积压

以下长期未关闭的 Issue / PR 需要维护者重点关注：

**RFC 积压（已接受、长期处于讨论修订中）**

| 编号 | 标题 | 创建时间 | 标签 | 备注 |
|---|---|---|---|---|
| [#6165](https://github.com/zeroclaw-labs/zeroclaw/issues/6165) | 通过外部集成减轻 ZeroClaw 核心负担 | 2026-04-27 | no-stale, needs-maintainer-review | 已接受，等待维护者决策 |
| [#6954](https://github.com/zeroclaw-labs/zeroclaw/issues/6954) | 内部发起 agent 轮次的来源/会话绑定/回复契约 | 2026-05-26 | accepted | 与 #9487 存在边界重叠，需协调整合 |
| [#6971](https://github.com/zeroclaw-labs/zeroclaw/issues/6971) | 安全态势、凭据边界与统一入口策略 | 2026-05-27 | accepted | 需明确 v0.9.0 的落地负责人 |
| [#7141](https://github.com/zeroclaw-labs/zeroclaw/issues/7141) | 可插拔入站认证与规范化主体 | 2026-06-03 | in-progress | v0.9.0 Identity & Access 里程碑 |
| [#7142](https://github.com/zeroclaw-labs/zeroclaw/issues/7142) | 运行时持有的安全决策管线 | 2026-06-03 | accepted | 与 #7141 同属安全架构，Rev 6 已有较完整方案 |
| [#7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432) | v0.9.0 认证/安全/网关/破坏性变更总追踪 | 2026-06-09 | accepted | 总协调入口 |
| [#7100](https://github.com/zeroclaw-labs/zeroclaw/issues/7100) | 按模型配置能力与上下文窗口 | 2026-06-02 | accepted | 需要实施 |
| [#7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155) | 高危 shell 命令逐次确认 | 2026-06-03 | accepted | 社区关注度高（20 评论），需优先推进 |

**PR 积压**

| 编号 | 标题 | 创建时间 | 状态 | 备注 |
|---|---|---|---|---|
| [#8713](https://github.com/zeroclaw-labs/zeroclaw/pull/8713) | 为 file_download 添加 allowed_private_hosts SSRF 门控 | 2026-07-04 | needs-author-action, 6 周未合并 | 安全相关（SSRF 防护），size:XL，需维护者推动评审 |
| [#9314](https://github.com/zeroclaw-labs/zeroclaw/pull/9314) | 修复 Telegram 长轮询消息丢失问题 | 2026-07-23 | size:XL，P1 | 修复"瞬时失败导致 update 永久丢失"，需推动评审 |
| [#9808](https://github.com/zeroclaw-labs/zeroclaw/pull/9808) | 依赖批量升级（46 个 crate） | 2026-08-07 | risk:high, size:L | Dependabot 自动创建，需安排评审合并 |
| [#9986](https://github.com/zeroclaw-labs/zeroclaw/pull/9986) | agent 导出为可移植 bundle | 2026-08-13 | needs-author-action | 新功能，有利于 agent 跨实例迁移 |
| [#10003](https://github.com/zeroclaw-labs/zeroclaw/pull/10003) | Reliable 拒绝尝试次数精确统计 | 2026-08-15 | needs-maintainer-review | 影响重试/回退的可观测性 |
| [#10021](https://github.com/zeroclaw-labs/zeroclaw/pull/10021) | 将目标思维策略应用于独立 delegate | 2026-08-16 | needs-maintainer-review | 行为修正，需验证不引入回归 |
| [#10038](https://github.com/zeroclaw-labs/zeroclaw/pull/10038) | cron API 拒绝非法 session_target | 2026-08-16 | needs-author-action | 快速修复（size:S），建议加速合并 |

---

**总结**：Zeroclaw 正处于 v0.9.0 安全加固的关键阶段，安全修复的产出密度很高。社区对生态互操作性、配置即时生效、agent 多轮目标执行等方向有明确的需求信号。维护者需注意大量已接受的 RFC 落地进度较慢的问题，建议在 #7432 总追踪中明确各 RFC 的实施排期。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

### PicoClaw 项目动态日报 — 2026-08-18

---

#### 1. 今日速览

PicoClaw 过去 24 小时活跃度中等偏下，无新版本发布。核心动态集中在 Bug 修复与渠道适配收尾：一个导致用户“永远得不到回答”的严重 Bug（重复工具失败静默循环）已通过 PR #3312 修复并关闭；一个针对 Slack 媒体上传的参数缺失问题（PR #3340）已提交待合入。社区侧，关于“IRC 长消息支持”（#3287）的讨论已持续近一个月仍有热度，而新增的 Antigravity 429 报错（#3339）为全新问题，尚未有回应。总体来看，项目处于 Bug 消化与渠道兼容性打磨阶段，核心 Agent 循环稳定性得到实质提升。

---

#### 2. 版本发布

今日无新版本发布。

---

#### 3. 项目进展

今日合并/关闭了 3 个 PR，其中两个为陈旧 PR 今日关闭（#271、#2606），一个为核心 Bug 修复（#3312）。

- **核心修复（已合并）**：[PR #3312 - fix(agent): stop turn early on repeated identical tool failure](https://github.com/sipeed/picoclaw/pull/3312) — 修复了当工具因同一错误（如 `git` 无凭据、被 shell 安全防护拦截）反复失败时，Agent 会静默循环至 `max_tool_iterations` 导致用户永远得不到回答的问题。现在 Agent 会在检测到重复相同失败后提前终止回合，直接向用户反馈错误。该项目长期存在的“假死”现象得到根治，对 Telegram/CLI 等场景的可靠性提升显著。

- **陈旧 PR 关闭**：[#271 - fix: env overrides when config.json is missing](https://github.com/sipeed/picoclaw/pull/271) 与 [#2606 - feat: enhance Weixin channel support](https://github.com/sipeed/picoclaw/pull/2606) 今日标记关闭，具体合入状态不明，但大概率已过时或由其他 PR 替代。

- **待合并**：[PR #3340 - fix(slack): set FileSize on media upload params](https://github.com/sipeed/picoclaw/pull/3340)（见下文 Bug 章节）。

---

#### 4. 社区热点

**[Issue #3287 - Better support long messages in IRC](https://github.com/sipeed/picoclaw/issues/3287)**（OPEN，6 条评论）—— 这是今日讨论最充分的话题。用户诉求是让 PicoClaw 正确理解 IRCv3 下被客户端自动拆分的超长消息（IRC 默认 512 字节限制），将其合并为一条完整消息处理。该 Issue 自 7 月 22 日提出，今日依然有更新，说明 IRC 渠道用户对消息完整性的需求强烈，而目前实现可能直接导致上下文被截断或误解。社区背后诉求：希望 PicoClaw 在受限协议（IRC 等）上具备消息重组能力，避免因协议限制影响对话质量。

---

#### 5. Bug 与稳定性

| 严重程度 | Issue/PR | 描述 | 状态 |
| --- | --- | --- | --- |
| **高** | [Issue #3311](https://github.com/sipeed/picoclaw/issues/3311) / [PR #3312](https://github.com/sipeed/picoclaw/pull/3312) | 重复工具失败导致静默循环至 `max_tool_iterations`，用户永远等不到回答（生产环境 Telegram 实测） | ✅ 已关闭，修复已合入 |
| **中** | [Issue #3339 - Antigravity 429 错误](https://github.com/sipeed/picoclaw/issues/3339) | Google Antigravity 认证与模型发现都成功，但所有生成请求返回 `RESOURCE_EXHAUSTED` (429)，响应中无配额细节 | 🆕 新开，无回应 |
| **中** | [PR #3340 - Slack 上传缺少 FileSize](https://github.com/sipeed/picoclaw/pull/3340) | `SaveMedia` 构建 `UploadFileParameters` 时未设置 `FileSize`（零值），slack-go v0.23.1 会在网络调用前直接拒绝 `files.upload.v2` 流程 | 🔀 待合并，修复方案明确 |

另有陈旧 Bug #3287（IRC 长消息被截断）仍在 open 状态，见“功能请求”部分。

---

#### 6. 功能请求与路线图信号

- **[Issue #3287 - IRC 长消息支持](https://github.com/sipeed/picoclaw/issues/3287)**：要求将 IRCv3 自动拆分的消息在 PicoClaw 内重组为单一消息。这是目前唯一活跃的功能请求，虽已 stale 但仍有讨论。结合项目近期推进的 Slack、Weixin 渠道修复，社区对“通道适配质量”的关注度在上升，预计该需求会在未来版本中被纳入（如引入 IRC 消息缓冲与重组逻辑）。

- **无其他新功能请求**。今日新开 Issue #3339 为服务端 API 配额问题，按 Bug 处理。

---

#### 7. 用户反馈摘要

- **正面反馈（隐含）**：Issue #3311 的关闭标志着一个长期的 Agent 可靠性问题被解决。此前用户在 Telegram 上发送一条要求执行 `git` 命令的消息后，Agent 静默失败且不回复，这直接导致用户对“Agent 是否在正常工作”失去信任。修复后此类场景将直接得到错误提示，预期可显著减少困惑。

- **负面反馈（当前）**：Issue #3311 的原始报告与 #3339 都指向一个共同痛点——当外部依赖（工具失败、API 配额）出错时，PicoClaw 的错误反馈机制不够透明。前者完全静默，后者返回无差异化细节的 429。用户希望看到有意义的错误信息（如“git 凭据缺失”或“配额已用尽，请检查控制台”），以便自行排查。

---

#### 8. 待处理积压

- **[Issue #3287 - IRC 长消息支持](https://github.com/sipeed/picoclaw/issues/3287)**：Open 且已打 stale 标签，但 8 月 17 日仍有新互动。自 7 月 22 日创建以来近一个月无人认领，IRC 渠道用户可能因此转向其他项目或手动分段消息，建议维护者评估并分配。

- **[Issue #3339 - Antigravity 429 无细节错误](https://github.com/sipeed/picoclaw/issues/3339)**：新开仅 1 天，暂未构成积压，但鉴于其影响所有 Antigravity 生成请求，且用户已确认认证与模型发现均正常，属于高影响问题，建议优先关注。

- **[PR #3340 - Slack FileSize 修复](https://github.com/sipeed/picoclaw/pull/3340)**：待合并状态，属于明确的一行修复，若及时合入可避免 Slack 渠道媒体上传完全不可用的状况。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

### 1. 今日速览

NanoClaw 项目今日活跃度极高，核心团队（`core-team`）驱动的架构整合正进入冲刺阶段。过去 24 小时内有 42 条 PR 更新，其中 25 条已合并/关闭，大量针对 `channels` 与 `drivers` 层的 PR 已落地或正在排队。这表明项目正在快速推进一个以“驱动层抽象（Driver Seam）”和“频道层重构”为核心的大版本演进。与此同时，社区反馈的两个关键 Bug（#3203 codex 事件类型错误、#3301 chat 会话中任务日志丢失）均已有关联的修复 PR（#3303, #3311），保持了良好的响应速度。当前无新版本发布，整体处于高强度的主分支开发迭代期。

### 2. 版本发布

今日无新版本发布。

### 3. 项目进展

虽然今天没有合并“驱动层”的 PR（#3306-#3308 尚在队列中），但大量铺垫性 PR 已合并，为架构迁移扫清了障碍。重点进展集中在为多频道（尤其是 Slack）和可插拔运行时铺路。

- **频道层（channels）基础设施大面积落地**：多项 PR 建立了可扩展的频道开发框架，包括：
  - **适配器声明的会话模式（Session-Mode）默认值**（[#3304](https://github.com/nanocoai/nanoclaw/pull/3304)）：允许频道声明每线程（per-thread）或共享（shared）会话模式。
  - **共享频道库与 Canvas 集群**（[#3305](https://github.com/nanocoai/nanoclaw/pull/3305)）：引入了共享的 Slack Web API 客户端和 canvas actions 模块。
  - **入站策略、成员事件、投递后 Hook**：分别通过 [#3292](https://github.com/nanocoai/nanoclaw/pull/3292)、[#3295](https://github.com/nanocoai/nanoclaw/pull/3295) 和 [#3294](https://github.com/nanocoai/nanoclaw/pull/3294) 为桥接层增加了入站策略注册、通用成员事件、以及首次投递上下文的后置 Hook 机制。
- **容器与 Agent 能力增强**：通过 [#3296](https://github.com/nanocoai/nanoclaw/pull/3296) 为 MCP 工具注册表引入了 `extendTool` 扩展能力，允许模块在不修改基础工具源码的情况下增加 schema 与描述。
- **Bug 修复与恢复**：修复了上游合并中意外丢失的 `slack-formatting` 技能（[#3310](https://github.com/nanocoai/nanoclaw/pull/3310)），并完成了 Slack 频道的默认值工厂、成员资格与引导逻辑（[#3309](https://github.com/nanocoai/nanoclaw/pull/3309)）。

**里程碑提示**：核心架构 PR（[#3306](https://github.com/nanocoai/nanoclaw/pull/3306) `drivers` 驱动层）与（[#3307](https://github.com/nanocoai/nanoclaw/pull/3307) `host` 生命周期重构）已准备就绪，若合并将标志着会话运行时从 Docker 硬编码向可插拔 Driver 的实质性跨越。

### 4. 社区热点

今日最热门的讨论集中在两个由用户 `glifocat` 报告的关联问题上，引发了高度关注：

- **[#3301](https://github.com/nanocoai/nanoclaw/issues/3301)：Tasks firing in chat sessions run one-door**（开启，0 评论）：这是 **“一扇门”任务传递机制回归** 的严重问题。2.1.48 引入的变更导致触发于聊天会话中的任务行切换了整个查询模式，使日志丢失、回复被吞、系列取消列出。
- **[#3289](https://github.com/nanocoai/nanoclaw/issues/3289)：Bound pending-message polling for accumulated backlogs**（开启，0 评论）：当有大量待处理消息时，`getPendingMessages()` 会将所有到期行加载到 JS 中，这可能导致内存压力或性能瓶颈。

**分析**：这两个问题均出自同一用户，且直接或间接与 #2988 引入的运行时架构（one-door 传递）以及消息轮询策略有关。这提示社区对系统在高负载、长时间运行下的稳定性与资源使用情况有较强的关注。

### 5. Bug 与稳定性

今日报告了 3 个关键 Bug，**均有相应的修复 PR 提交**：

- **[严重/回归] [#3301](https://github.com/nanocoai/nanoclaw/issues/3301)：聊天会话中的任务触发后日志丢弃、回复被吞**。关联修复 PR：[#3303](https://github.com/nanocoai/nanoclaw/pull/3303)。
- **[中等/内存] [#3289](https://github.com/nanocoai/nanoclaw/issues/3289)：待处理消息轮询** 将大量数据加载进内存导致积压。关联修复 PR：[#3291](https://github.com/nanocoai/nanoclaw/pull/3291)。
- **[中等/编译] [#3203](https://github.com/nanocoai/nanoclaw/issues/3203)：`codex` provider 发出未声明的 `file` ProviderEvent** 导致 `/add-codex` 类型检查失败。当前无直接修复 PR，但存在相关依赖升级 PR（见下方 #3299）。
- **[低/文档] [#1143](https://github.com/nanocoai/nanoclaw/issues/1143)**（已关闭）：技能文档引用了不存在的 `/data/env` 路径，该 Issue 已由 triage bot 在长时间未活动后关闭，未处理。

### 6. 功能请求与路线图信号

结合今日动态，以下功能信号很可能进入 `2.2` 版本：

- **可插拔运行时（Runtime Driver）**：PR [#3306](https://github.com/nanocoai/nanoclaw/pull/3306) 与 [#3307](https://github.com/nanocoai/nanoclaw/pull/3307) 正在建立 `SessionDriver` 接口。这为未来支持除 Docker 之外的运行方式（如 Podman）提供了基础，是核心团队明确的开发方向。
- **本地 Web 聊天频道（Local Web Chat Adapter）**：PR [#3298](https://github.com/nanocoai/nanoclaw/pull/3298) 新增了一个仅回环（loopback）的本地 Web 聊天适配器，这可能使不具备外部网络的本地环境也能便捷测试和使用 Agent。
- **Slack 深度集成（Per-Thread）**：多篇 Slack PR（[#3304](https://github.com/nanocoai/nanoclaw/pull/3304), [#3309](https://github.com/nanocoai/nanoclaw/pull/3309)）确认了 Slack 将全面采用“每线程”会话模式。

### 7. 用户反馈摘要

- **对快节奏开发的不满**：用户对近期合并引入的**行为回归**（如 #3301）表达了不适，说明开发速度虽快但回归测试压力大。
- **配置复杂度增加**：用户反映文档中的环境变量配置路径（`/data/env`）已失效（#1143），指南未能跟上项目快速演进的步伐。**这凸显了文档同步的重要性。**

### 8. 待处理积压

以下为长期未解决或需要关注的积压条目，提醒维护者注意：

- **[待合并/高风险] [#3203](https://github.com/nanocoai/nanoclaw/issues/3203)**：codex provider 生成图片文件事件被静默丢弃的关键 Bug，目前仍在等待合适的修复方案。这是一个会导致功能失效的隐患。
- **[待确认/依赖升级] [#3299](https://github.com/nanocoai/nanoclaw/pull/3299)**：在 `@openai/codex` 升级前，若需继续使用 codex 技能，必须升级依赖 pin 以保留对 GPT-5.4 的支持，该 PR 目前处于开放状态。
- **[低优先级/服务台] [#1143](https://github.com/nanocoai/nanoclaw/issues/1143)**：技术文档更新队列较长，在快速架构迭代期，此类噪音 Issue 可能会增多，可以考虑建立更高效的文档同步机制。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw 项目动态日报 — 2026-08-18

## 今日速览

NullClaw 项目在过去 24 小时内整体活跃度较低。Issues 方面无新开、无关闭、无更新，社区讨论处于沉寂状态。PR 方面仅有 1 条依赖更新（#956）处于待合并状态，无合并或关闭动作。无新版本发布。综合来看，项目当前处于维护平稳期，无重大功能推进或社区事件，供应链依赖的例行升级仍在进行中。

---

## 项目进展

### 待合并 PR

**#956 [dependencies, docker] ci(deps): bump alpine from 3.23 to 3.24 in the docker-images group**
- 作者：dependabot[bot]
- 创建于 2026-06-15，最后更新于 2026-08-17
- 链接：[PR #956](https://github.com/nullclaw/nullclaw/pull/956)

该 PR 由 Dependabot 自动发起，将 Docker 镜像基础层 Alpine Linux 从 3.23 升级至 3.24。这属于例行依赖维护，不涉及功能变更。值得注意的是，该 PR 已存在约两个月且尚未合并，考虑到容器基础镜像的版本更新通常涉及安全修复，建议维护者尽快评估并处理。

**今日无 PR 被合并或关闭，项目核心功能代码无新增推进。**

---

## 社区热点

今日无活跃讨论。唯一有动态的 PR #956 为机器人自动创建，无评论、无互动，不构成社区热点议题。

---

## Bug 与稳定性

今日无新报告的 Bug、崩溃或回归问题。结合近期 Issues 数据（过去 24 小时为 0 条），项目在稳定性层面未出现新的负面信号。唯一与稳定性间接相关的事项为 PR #956 中 Alpine 版本升级的积压，可能涉及基础镜像的安全补丁延迟。

---

## 功能请求与路线图信号

今日无用户提交新的功能请求。从现有数据无法推断下一版本的功能规划。PR #956 为纯依赖升级，不携带功能信号。

---

## 用户反馈摘要

今日无新的用户评论或反馈。项目社区活跃度极低，缺乏可供提炼的用户痛点或使用场景信息。

---

## 待处理积压

**PR #956 — Alpine 3.23 → 3.24 依赖升级**
- 创建于 2026-06-15，已积压约 2 个月
- 链接：[PR #956](https://github.com/nullclaw/nullclaw/pull/956)

该 PR 长期未被合并或关闭，属于自动化依赖更新积压。由于 Docker 基础镜像版本过旧可能积累未修补的安全漏洞，建议维护者优先处理此类供应链安全相关的积压项。当前 Issues 侧无长期未响应的用户报告，积压风险主要集中在自动化依赖 PR 的响应时效上。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

### 1. 今日速览

项目活跃度处于**高位**。过去 24 小时内有 29 条 Issue 更新和 44 条 PR 更新，核心团队围绕“降低持久化 DB 写入压力”（epic #7591）展开了密集攻坚：大型 PR 相继落地（#7717、#7712、#7709），同时发布了 1.3.0-rc.1 候选版本。但**稳定性风险集中爆发**：新版本存在启动崩溃回归（#7720），libSQL 后端出现写连接饥饿导致的级联故障（#7714）。整体而言，项目正处于大版本发布前夜的高强度迭代期，功能推进快，但需要警惕升级兼容性和并发写入路径的隐患。

### 2. 版本发布

**ironclaw-v1.3.0-rc.1** (`1.3.0-rc.1` - 2026-08-17)

- 安装方式：提供 shell 与 PowerShell 脚本安装预编译二进制。
- **注意**：该候选版本存在已知**阻断性升级问题**（详见 Bug 列表 #7720），当前不建议生产环境从 1.2.x 升级。官方未提供详细 Release Notes，破坏性变更与迁移指南尚未明确。

### 3. 项目进展

过去 24 小时合并或关闭的 PR 主要聚焦于**稳定性修复与性能优化**，标志着 epic #7591（降低 DB 写入压力）从设计进入实施阶段。

- **修复 libSQL 写入饥饿问题** (`#7717`, [PR](https://github.com/nearai/ironclaw/pull/7717)): 针对 #7714 的级联故障提供修复 PR，防止资源管理器的日志因单一写连接被饿死而导致的权限失效与预留泄漏。**这是当前最高优先级的稳定性修复。**
- **优化 BeforeModel 检查点批处理** (`#7712`, [PR](https://github.com/nearai/ironclaw/pull/7712)): 将检查点批处理改为**可选**（默认保持原行为），并确保跳过逻辑不会破坏任何“副作用”状态。此为 #7603 的安全变通方案，后续将有更彻底的方案 (#7707)。
- **削减租约围栏读取** (`#7709`, [PR](https://github.com/nearai/ironclaw/pull/7709)): 通过复用已观察到的租约信息，避免每次转录写入前重新读取数据库，减少关键路径上的 I/O。
- **关闭多项 DB 写入压力子任务** (#7594, #7598, #7605, #7637, #7647): 确认完成了 Tier 1/2/3 的部分优化项与设计系统类型化工作。

项目正按照 epic 计划稳步削减每次对话轮次的数据库行数开销，但**性能优化的安全性验证**已成为当前主旋律。

### 4. 社区热点

- **[#7720] 1.3.0-rc.1 启动崩溃循环** ([Issue](https://github.com/nearai/ironclaw/issues/7720)): 新版本发布后即刻出现的最严重问题。从 1.2.x 升级后进程反复崩溃，导致服务端口不可用。直接影响了用户对新版本的信任度，目前无评论，属于**刚被报告的高热紧急事件**。
- **[#7714] libSQL 写连接饥饿导致级联故障** ([Issue](https://github.com/nearai/ironclaw/issues/7714)): 该问题详细描述了一个在负载测试中发现的严重并发缺陷：单一写连接导致资源管理日志停顿、权限反复失效、预留永久泄漏。技术讨论热度高，反映了社区对极端场景下数据一致性与稳定性的关注。
- **[#7591] Epic: 降低持久化 DB 写入压力** ([Issue](https://github.com/nearai/ironclaw/issues/7591)): 作为核心性能目标，该 Epic 下挂载了多个子任务（#7701, #7603, #7604 等），其进展是社区关注的焦点。讨论集中在如何在保持多worker安全的前提下激进地减少写放大。

### 5. Bug 与稳定性

按严重程度排列：

- **严重-升级阻断** `#7720`: 1.3.0-rc.1 在从 1.2.x 升级后启动崩溃循环（`unknown field 'activation_state'`）。**暂无 fix PR。**
- **严重-数据一致性与死锁** `#7714`: libSQL 后端单写连接饥饿导致资源管理器级联故障，含预留泄漏风险。**已有 fix PR #7717。**
- **中等-行为缺陷** `#7702`: 审计记录 (`AuditBefore`/`AuditAfter`) 在生成环境中未按契约写入，属于该写的不写。**暂无 fix PR。**
- **中等-性能风险** `#7705`: CoalescingEventSink 存在无界关闭刷新与错误状态锁存问题，可能导致挂起。**暂无 fix PR。**
- **低-功能缺失** `#7716`, `#7715`: QA 过程中发现的 MCP 服务器添加流程缺少 Bearer 认证，以及 Telegram 连接流程缺少 Bot/个人账户选择确认。

### 6. 功能请求与路线图信号

- **持久化通知收件箱 (Inbox)**：一系列相关 Issue（#7687, #7688, #7689, #7690, #7691）显示团队正计划将现有仅限审批的通知中心，升级为**支持审批、认证、阻塞、失败/完成等类型的通用持久化收件箱**。这是一个明确的产品功能增强方向，涉及前后端与存储契约。
- **新增 GitHub 与 Google Docs 能力**：核心成员提交了为 GitHub 工具增加 Projects v2 字段操作 ([#7719](https://github.com/nearai/ironclaw/issues/7719)) 以及为 Google Docs 增加语义编辑工具 ([#7718](https://github.com/nearai/ironclaw/pull/7718)) 的 PR。表明**增强现有工具链的深度**仍在路线图上。
- **支持“立即运行”自动化任务** ([#7708](https://github.com/nearai/ironclaw/pull/7708)): 该 PR 旨在为自动化任务添加手动触发能力，是产品易用性的重要补充，预计将进入 1.3.0 或后续版本。

### 7. 用户反馈摘要

- **升级恐惧**：`#7720` 的反馈直接表明用户对新版本升级持谨慎态度，任何启动崩溃都会导致强烈的负面情绪和不信任。
- **隐私与体验细节**：针对 Slack 集成，用户反馈了**公开频道中连接提示暴露隐私**且操作繁琐的问题 ([#7681](https://github.com/nearai/ironclaw/issues/7681))，对应的 fix PR #7682 正在进行多轮审查，体现了社区对交互细节的高要求。
- **开发者体验**：社区贡献者提交了 ACP (Agent Communication Protocol) 支持 ([#7513](https://github.com/nearai/ironclaw/pull/7513)) 以接入外部工具，说明第三方开发者希望通过标准协议与 IronClaw 交互，但目前 PR 仍处于开启状态，可能受限于核心团队的审查带宽。

### 8. 待处理积压

- **[#3762] 编辑 AGENTS.md 不更新系统提示词** ([Issue](https://github.com/nearai/ironclaw/issues/3762)): 该问题已存在 3 个月，为 `suggested_P1` 且标记 `v1.4.0`。其行为会严重影响用户对身份文件编辑的即时反馈预期，但近期仅有少量讨论，可能需要维护者评估排期。
- **[#6994] OOBE 自动化任务原型** ([PR](https://github.com/nearai/ironclaw/pull/6994)): 这是社区贡献者提交的首次引导体验（Onboarding）方案，已开放超两周且处于开启状态。设计文档部分可能已就绪，但等待核心团队的实现审查与集成决策。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-08-18

## 今日速览

过去 24 小时项目活跃度较高，共产生 7 条 Issue 更新和 21 条 PR 更新。其中 18 条 PR 已合并/关闭，3 条待合并，无新版本发布。值得关注的是，当日有 4 条来自 0xFLX 的 Cowork 功能 PR 被关闭（含代码合并），以及多条涉及 OpenClaw 运行时升级、敏感日志脱敏、Qwen 控制台链接迁移等修复，项目在功能和稳健性上均有实质推进。社区方面，一条关于跨平台 AI Agent 通信层的项目推广 Issue（#2500）引发讨论；历史遗留的 6 条 stale Issues 仍处于开放状态，未见解决进展。

---

## 项目进展

今日合并/关闭 PR 共 18 条，聚焦于 Cowork 体验优化、OpenClaw 升级、安全/隐私修复及若干稳定性改进：

**产品体验**
- PR #1636（0xFLX）：Cowork 聊天窗口新增悬浮「滚动到底部」按钮，解决长对话场景下回到底部不便的问题。
- PR #1637（0xFLX）：AI 回复新增「重新生成」按钮，悬停显示，点击重发最后一条用户消息。
- PR #1640（0xFLX）：工具执行结果（Bash 输出、文件读取等）增加一键复制按钮，统一与 AI 回复的交互一致性。
- PR #1641（0xFLX）：所有弹窗统一支持 Esc 键关闭，Modal 底层新增 closeOnEscape 控制。
- PR #1642（Yang1k）：Windows 平台新增目录右键菜单支持，通过注册表集成 "Open with LobsterAI"。
- PR #1660（gongzhi-netease）：切换至非 main agent 时，首页欢迎区动态显示 agent 名称和描述，提升个性化体验（仍开放）。
- PR #1675（liulingfeng）：会话列表按时间分组置顶/今天/昨天/7 天内/30 天内/更早，支持快速定位历史记录。
- PR #2503（liuzhq1986）：输入框新增编辑上下文菜单（剪切/复制/粘贴/全选）。
- PR #2501（liuzhq1986）：修复技能升级进度浮层渲染层级问题，并补充升级流程日志。

**OpenClaw 与运行时**
- PR #1663（Ailein）：OpenClaw 运行时升级至 v2026.4.12；openclaw-weixin 插件 1.0.3 → 2.1.8；移除已废弃的 skipMissedJobs 配置同步。
- PR #2502 / #2505 / #2506（fisherdaddy）：新增 DeepSeek Harness（dsh）运行时支持，含进程启动器、引擎集成和文档说明。
- PR #2504（Marc-oss-hub）：新增 OrcaRouter 提供商集成，作为 OpenAI/Anthropic 兼容网关接入 provider 注册中心（待合并）。

**安全与稳定性**
- PR #1661（flowell）：导出日志脱敏，修复 API Key、Bearer token、OAuth token、请求体/响应体明文泄漏问题。
- PR #1669（leedalei）：修复设置页 "测试连接" 按钮禁用逻辑，及自定义提供商名称显示为内部 key 的问题。
- PR #1667（leedalei）：Qwen 控制台链接从灵积迁移至百炼，避免用户访问即将下线的页面。
- PR #1668（swuzjb）：为每个非 main Agent 增加独立工作目录配置，支持回退到 OpenClaw 默认行为。
- PR #1639（0xFLX）：修复多处 Tooltip 硬编码英文未国际化的问题。

> ⏳ 待合并 PR（3 条）：#2504（OrcaRouter 集成）、#1660（欢迎区 agent 名称显示）、#1277（dependabot Electron 依赖升级：40.2.1 → 43.4.0）。

---

## 社区热点

**Issue #2500 — VOKO 跨平台 AI Agent 通信层（1 条评论）**
作者以开源项目作者身份宣传 VOKO，定位为 "AI 智能体的跨平台通信层"，支持本地 Agent 接入、访客对话和群协作，并已接入 OpenClaw、VOKO IM、AstrBot。该 Issue 是典型的生态联动诉求，反映出开发者社区对 Agent 互操作性和开放协议的兴趣。

链接：https://github.com/netease-youdao/LobsterAI/issues/2500

---

## Bug 与稳定性

按严重程度排序：

**中等问题**
- Ollama 本地模型（qwen3 → gemma4）无法使用，报错截图可见，但 Ollama 本身经 cherrystudio 验证可用（含 MCP），问题指向 LobsterAI 与 Ollama 的集成层。已有相关排查但仍开放（Issue #1635）。
- groupPolicy 周期性被覆盖为 allowlist，影响配置持久性（Issue #1653）。

**低严重度**
- 手动创建定时任务点击保存时提示 "还有内容未保存"，但实际已保存成功，疑似误报（Issue #1643）。
- 除 SSE 外的 MCP 引擎无法被识别和使用（Issue #1662）。
- md 转 word 中途失败，日志显示 `sse response finish reason: full`，疑似上下文/输出窗口限制（Issue #1671）。

以上 6 条均为历史 Issues，今日无新增 Bug 报告，且均无对应 fix PR。

---

## 功能请求与路线图信号

- **基于 md 的工作流编排**（Issue #1644）：用户建议 main agent 可编排其它 agent 完成复杂任务，当前 agent 间互不感知、无法互相调用。该建议与 #1660（欢迎区 agent 名称/描述）和 #1668（独立工作目录）方向一致，可能被纳入后续协作模块迭代。
- **Agent 独立工作目录**（PR #1668，已合并）：支持 per-agent 工作目录配置，未配置时回退到 OpenClaw 默认行为，已实现落地。
- **VOKO 跨平台通信层**（Issue #2500）：外部项目提出打通不同 Agent 框架和 IM 渠道，可能推动未来 A2A 标准化探索。
- **OrcaRouter 提供商集成**（PR #2504，待合并）：新增 Anthropic/OpenAI 兼容网关，提供服务商选择多样性。
- **DeepSeek Harness（dsh）运行时**（PR #2502/#2505/#2506，已合并）：新增 dsh 引擎支持，扩展底层运行时能力。

---

## 用户反馈摘要

- **Ollama 集成问题**（#1635）："ollama 本身没有问题，使用 cherrystudio 客户端这两个模型都是好用的" —— 用户已排除前端工具因素，指向 LobsterAI 作为拦截层，诉求是为本地模型提供稳定的 OpenAI 兼容通道。
- **保存提示误报**（#1643）："提示'还有内容未保存'，但应用已经保存成功了" —— 非阻断但降低信任感，用户期望消除误导性提示。
- **Agent 间协作缺失**（#1644）："目前问 main agent 它感知不到其它 agent 的存在……希望能让 main agent 把其它 agent 组织起来完成复杂任务" —— 反映用户对多 Agent 协作编排的真实需求，而非仅对话式交互。
- **配置覆盖问题**（#1653）："每次过一会就会被覆盖" —— 用户对配置持久化稳定性有明确预期，该反馈与群组策略同步机制相关，可能需要排查回写逻辑。
- **md 转 word 截断**（#1671）："做了一半提示 sse response finish reason: full" —— 用户在常见生产场景（文档转换）中遇到输出长度限制，希望获得更鲁棒的分批或续写机制。

---

## 待处理积压

以下均为 4 月创建的 stale Issues，近 4 个月无实质进展，建议维护者安排排查：

| Issue | 问题描述 | 优先级建议 |
|-------|---------|-----------|
| [#1635](https://github.com/netease-youdao/LobsterAI/issues/1635) | Ollama 本地模型无法使用 | **高** — 本地模型是桌面端核心场景，长期未复现或定位可能影响用户信任 |
| [#1653](https://github.com/netease-youdao/LobsterAI/issues/1653) | groupPolicy 周期性被覆盖为 allowlist | **中** — 配置持久化稳定性问题 |
| [#1643](https://github.com/netease-youdao/LobsterAI/issues/1643) | 定时任务保存时误报"还有内容未保存" | **低** — 前端状态判断逻辑错误，易修复 |
| [#1644](https://github.com/netease-youdao/LobsterAI/issues/1644) | 建议支持基于 md 工作流的多 Agent 编排 | **中** — 需求合理，可作为路线图参考项 |
| [#1662](https://github.com/netease-youdao/LobsterAI/issues/1662) | 非 SSE 类型的 MCP 引擎无法使用 | **高** — MCP 支持是集成功能的基石能力 |
| [#1671](https://github.com/netease-youdao/LobsterAI/issues/1671) | md 转 word 中途失败（finish reason: full） | **低** — 可通过输出截断/续写机制缓解 |

另有一条长期开放的 dependabot 依赖升级 PR（[#1277](https://github.com/netease-youdao/LobsterAI/pull/1277)，Electron 40 → 43），已开放 4 个多月，建议确认兼容性后尽快合并，避免依赖过旧引入安全风险。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 — 2026-08-17

## 今日速览

项目活跃度**中等偏高**：过去 24 小时内 3 条 Issue 更新、9 条 PR 更新，其中 6 条 PR 已合并/关闭。核心维护者 Lstarsky0 连续提交 2 个待合并修复（#1209、#1208），分别解决 heartbeat 配置覆盖和定时调度忽略活跃时段的问题，显示项目在修正核心闹钟/心跳逻辑上投入明显。CI 格式化门禁在 main 分支飘红（#1202 已关闭但为已知问题），另有 Podman 集成兼容性 Bug 尚未解决（#1095）。依赖更新和外部 agent 支持（MiniMax Code）已合并，整体功能面持续拓宽。

## 项目进展

今日 6 条 PR 合并/关闭，明确了多个功能方向：

- **外部 agent 模型与 effort 选择**（#1125，由 gptme-thomas 提交）：为外部 agent 提供 `/model` 中的模型和 effort 选择能力，包括配置项、分组展示及元数据持久化。这是一个能力较强的多 provider 管理增强。
- **新增 MiniMax Code ACP agent**（#1204，由 hetaoBackend 提交）：新增 `acp-minimax-code` 外部 agent 类型，纳入默认可执行文件探测与 agent 注册表，同时更新文档和 UI fixtures。外部 agent 生态继续扩张。
- **WebUI RPC 超时时间可配置**（#1130，由 khimaros 提交）：关闭了对应功能请求 #1127，允许用户配置 RPC 超时，增强 WebUI 在弱网络环境下的可用性。
- **Shadow DOM 查找穿透优化**（#1103，由 s-salamatov 提交）：替换 #1100 的无法推送的 commit，使浏览器快照与 ref 查找能高效穿透 shadow DOM。
- 依赖例行升级两批次（#1207 wasmtime-wasi、cmov、quinn-proto、serde_with；#1087 tar 0.4.45→0.4.46），无破坏性变更。

## 社区热点

最值得关注的是 **#1095 Podman 集成不可用**（[Issue #1095](https://github.com/moltis-org/moltis/issues/1095)）。该 Issue 创建于 6 月初，至今已超过两个月，仍为打开状态且仅有 2 条评论，说明用户等待时间较长。考虑到项目今日刚合并了 #1206（新增 Files 库并明确提到了 Docker、Podman、Apple Container 的只读挂载支持），Podman 用户的集成诉求可能很快被重新激活。

## Bug 与稳定性

按严重程度排列：

1. **Podman 无法正常工作**（[#1095](https://github.com/moltis-org/moltis/issues/1095)）— 严重，环境兼容性问题，已开放超 2 个月，无关联 PR，仍待处理。
2. **CI 格式门禁失败**（[#1202](https://github.com/moltis-org/moltis/issues/1202)）— 已关闭，但两个文件超过 1500 行限制（`memory-zvec/src/store.rs` 1799 行、`gateway/src/methods/services/admin.rs` 1531 行），源自提交 `9b47001a`。关闭状态并不意味着代码已按格式规范调整，后续仍可能重新触发。
3. **`heartbeat.update` 参数解析覆盖整个配置**（[#1209](https://github.com/moltis-org/moltis/pull/1209)）— 严重程度中高，由于 `#[serde(default)]`，调用方未传入的字段会被重置为默认值而非保留现状。该 PR 已提交修复，待合并，关闭 #1187。
4. **`heartbeat.active_hours` 未生效**（[#1208](https://github.com/moltis-org/moltis/pull/1208)）— 中等，调度器实际执行时未检查活跃小时，`is_within_active_hours` 函数从未被调用。修复 PR 已提交，待合并，关闭 #1205。

## 功能请求与路线图信号

- 已有明确落地路径的功能请求：**RPC 超时配置**（#1127）已被 #1130 关闭，可确认进入主线。
- **Podman 支持**（#1095）虽然是 bug 报告，但实际反映出容器运行时兼容性需求，且今日 #1206（Files 库 + Settings 浏览器）中已显式加入 Podman 卷挂载逻辑，可以预期这一块在后续版本中会有修复或适配。
- 值得注意的信号：**Files 库和 Settings 浏览器**（[#1206](https://github.com/moltis-org/moltis/pull/1206)）作为大型功能 PR 仍在开放中，包含流式文件列表、上传下载、移动删除、数据目录持久化等能力，以及只读挂载（Docker/Podman/Apple Container），这可能是下一版本的主推功能方向。

## 用户反馈摘要

- #1095 评论中用户期望 moltis 在 Podman 环境下开箱即用，当前需要工作在容器环境下，兼容性缺失直接影响实际使用。
- #1127 的提出（后由 #1130 解决）说明用户对 WebUI 在不可靠网络中的体验有明确诉求，超时不可控会造成操作挂起。

## 待处理积压

- **[#1095] Podman 集成不可用**（开放 >75 天，0 个关联 PR）：高优先级、长期未响应，建议维护者评估容器检测逻辑，或给出明确 workaround。
- **#1206（Files 库 + Settings 浏览器）**开放但规模较大，若能补充 review 进度说明，有助于社区了解合并预期。
- 依赖项升级（#1207、#1087）和外部 agent 相关 PR（#1125、#1204）均已合并，无积压风险。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报 — 2026-08-18

## 今日速览

CoPaw 项目今日活跃度较高：过去 24 小时内有 13 条 Issue 更新（8 条活跃/新开，5 条关闭）和 33 条 PR 更新（13 条待合并，20 条已合并/关闭）。值得注意的是，所有新开 Issue 均集中在 8 月 17 日提交，覆盖 Bug 报告、功能请求和插件生态等方面；PR 方面，昨日关闭的 20 条 PR 中包含多项 Console UI 修复和 DataPaw 插件发布管线完善，体现了项目在稳定性和生态建设上的持续投入。当前无新版本发布，项目处于 2.1.0 版本的迭代维护期。

## 版本发布

过去 24 小时无新版本发布。项目当前最新版本为 v2.1.0，社区反馈集中在 2.0/2.1 版本的迁移问题和回归缺陷上（详见"Bug 与稳定性"部分）。

## 项目进展

今日合并/关闭的 PR 主要集中于 Console 体验优化与插件生态建设：

- **[PR #6940] DataPaw 原生应用运行时与持久化分析工作区**（已合并，首次贡献者）：作为重磅功能合入，为 DataPaw 插件提供了独立的应用运行时和持久化分析工作区，标志着数据分析能力从实验性向产品化迈进。配套的 **[PR #7089]**（待合并）将为其建立独立的版本驱动发布管线，从主项目发布节奏中解耦，实现插件 CDN 独立发布。

- **[PR #7017] Console 新装 PawApps 即时激活，免刷新打开**（已合并）：修复了安装应用后需手动刷新才能使用的问题，更新已安装应用时自动重载页面，确保前端 bundle 生效。

- **[PR #7036] Console 媒体附件下载控制**（已合并）：为聊天中的音频/图片附件增加统一下载能力，音频按钮按"播放→下载→音量→时间/进度"顺序排列，视觉顺序与键盘焦点顺序对齐。

- **[PR #6975] 修复 /compact 后上下文用量环不刷新**（已合并）：解决了 trailing turn_usage SSE 事件在流中止时丢失、导致上下文用量显示停留在压缩前状态的问题。

- **[PR #6968] Token 统计不再将图片 base64 计入文本 token**（已合并）：修复了上传 1-2 张图片后上下文用量环显示 100% 满的误报问题（此前 2MB 照片被估算为约 70 万 token）。

- 其他已合并 PR 包括 **[#5151]** GitPanel 样式前缀修复（ant- 改 qwenpaw-）、**[#6981]** 移除输入框占位符中的审批命令提示、**[#7083]** 后台任务列表紧凑化与滚动提示等多项 Console 细节优化。

整体来看，项目今日完成了约 10 项功能改进与缺陷修复，涵盖 Console 交互细节、插件运行时稳定性和 Token 统计准确性，处于稳定的迭代节奏中。

## 社区热点

今日讨论热度集中在以下 Issue：

- **[Issue #7011] Console 停止请求可取消活跃的飞书会话（多 UI 会话场景）**（6 条评论）：用户 djj532 更新了问题描述，提供了最新的证据——两个 UI 会话的 session identity 值交叉后，Console 的停止请求直接取消了活跃的飞书会话。这是一个涉及多会话隔离的跨渠道竞态问题，讨论仍在进行中。

- **[Issue #6405] 升级 2.0 后 MCP 工具提示 "Tool not found"**（7 条评论，已关闭）：用户报告升级到 2.0.0post3 后工具名变为 `[mcp-key]__[tool_name]` 但仍提示找不到。这是 2.0 迁移中最常见的 MCP 兼容性问题，已确认关闭。

- **[Issue #6925] 智能体协作希望在一个会话窗口内完成**（3 条评论）：用户 cmhaoso 反馈当前多智能体协作每次对话都会创建新会话，且需要手动切换智能体查看各自对话内容，操作成本高。此需求代表了对多智能体协作体验的核心期待。

- **[Issue #7085] 按频道独立配置模型**（3 条评论）：用户希望不同渠道（钉钉/微信/控制台）可以配置不同的模型，而非当前全局或智能体级别的设置。这一需求指向了多渠道部署场景下的灵活配置诉求。

## Bug 与稳定性

按严重程度排列：

**高严重度**

- **[Issue #7063] Agent 执行工具调用时必现崩溃**（已关闭）：v2.1.0 中 `agentscope._execute_tool_call` 对 `_acting` 的协程对象错误地使用了 `async for` 遍历，导致 `TypeError: 'async for' requires an object with __aiter__ method, got coroutine`。属于确定性崩溃缺陷，已确认关闭（无效标记）。

- **[Issue #7082] `_StructuredOutputDynamicClass is not fully defined` 导致 MODEL_EXECUTION_ERROR**（开启中）：控制台通道初始化 agent/toolkit 时 Pydantic 模型未完全定义，需要调用 `model_rebuild()` 或定义 Optional 类型。目前仅有作者本人评论，尚未有维护者回应。

- **[Issue #7088] OneBot 通道将短期有效的 QQ 图片 URL 直传模型，签名 rkey 过期后导致 400 错误并污染会话**（已关闭）：QQ 图片 URL 的签名约 2 小时过期，模型服务端下载时返回 HTTP 400，且过期 URL 留在会话历史中导致后续每次回复都报错。**已有修复 PR [#7087]**（待合并）——在请求模型前将远程媒体 URL 本地化（客户端侧拉取转存）。

**中严重度**

- **[Issue #7077] 插件运行时钩子在 workspace 热重载后静默丢失**（已关闭）：通过 `register_runtime_hook()` / `register_skill_provider()` / `register_mode()` 注册的插件在 workspace 实例被替换后钩子丢失，影响插件在热安装场景下的可靠性。

- **[Issue #7051] Console 聊天中图片附件在会话重载后丢失**（已关闭）：后端提供 data URL 但前端显示损坏缩略图，会话重开后图片不可见。**已有 PR **[#7017]**** 部分改善（PawApps 重载），但此问题标为已关闭，需确认修复方式。

**低严重度**

- **[Issue #7084] 历史对话仅一条时，新开聊天无法打开历史会话**（开启中）：仅有一条历史会话时，点击历史记录无响应；发送消息创建第二条后恢复正常，属于前端状态管理边界条件缺陷。

- **[Issue #7076] qwenpaw-creator LLM 模型配置 404**（开启中）：使用 2.1.0 版本配置模型时返回 404，附有截图，具体原因待排查。

## 功能请求与路线图信号

- **[Issue #7085] 按频道独立配置模型**：用户希望钉钉用 `gpt-4o`、微信用 `qwen-max`、控制台用本地 `llama.cpp`。当前模型配置为全局/智能体级别。**关联 PR [#6302]**（待合并，已持续近一个月）提出统一 provider 发现、模型元数据、路由与智能体控制的 catalog 驱动模型系统，含运行时模型发现、能力感知路由与 fallback 支持。该 PR 一旦合入，将可能为按频道/按会话模型路由奠定架构基础。

- **[Issue #6925] 智能体协作在同一会话窗口内完成**：用户不希望每次协作创建新会话，减少切换成本。这是多智能体体验的核心痛点，暂无明确 PR 关联。

- **[Issue #7079] PowerContext 可插拔长期记忆后端**（Feature + 配套 PR #7080 均为首次贡献者）：通过现有 `BaseMemoryManager` 与 `memory_registry` 扩展点实现可插拔记忆后端，与 `ReMeLightMemoryManager` 并存作为可选项。该 PR 正在反馈中，预计需维护者评审。

- **[Issue #7075] 定时任务运行细节增强**：用户希望展示开始时间、运行时长、结束时间、运行结果等详细记录，而非仅在失败时给出信息。适合后台任务面板下一轮迭代。

- **[PR #6515] 内置 Volcengine Agent Plan 与小米 MiMo V2.5 API**（待合并）：为内置 provider 列表新增火山方舟 Agent Plan 订阅端点和小米 MiMo V2.5 API，解决两类用户无法开箱即用的问题。

## 用户反馈摘要

**迁移阵痛明显**：Issue #6405（2.0 后 MCP 工具 not found）虽已关闭，但代表了 2.0 升级用户最普遍的障碍类别——MCP 工具命名规则变化（`[mcp-key]__[tool_name]`）与既有配置不兼容。建议维护者在升级文档中补充 MCP 相关迁移清单。

**多渠道部署需求旺盛**：Issue #7085（按频道配置模型）和 Issue #7011（多 UI 会话竞态）共同指向一个趋势——用户正在将 QwenPaw 部署到多平台（飞书、钉钉、微信、控制台）同时使用，跨渠道的配置灵活性（#7085）和会话隔离（#7011）已成为实际生产场景的刚需。

**图片/媒体处理是高频痛点**：Issue #7088（OneBot 图片 URL 过期）和 #7051（Console 图片会话重载丢失）说明用户对多渠道图片附件的可靠性有明确预期，且此类问题直接影响对话可用性。

**对细节体验的期待**：用户对后台任务详情（#7075）、语言选项一致性（PR #7086）、下载按钮位置（PR #7036）等细节的关注表明，产品已过了"能用"阶段，用户开始认真打磨"好用"的体验。

## 待处理积压

**长期未合并的 PR（需维护者关注）：**

- **[PR #6302] feat: unify provider discovery, model metadata, routing, and agent controls**（7 月 21 日创建，待合并）：最大体量的架构性 PR，涉及 provider 目录驱动模型系统、能力感知路由与 fallback。对 #7085 等渠道级模型需求有直接影响，建议优先评审。

- **[PR #6515] feat(providers): add Volcengine Agent Plan and Xiaomi MiMo V2.5 API**（7 月 28 日创建，待合并）：简单直接的 provider 扩充，等待时间已超三周。

- **[PR #6719] feat(chat): add persistent workspace artifact cards**（8 月 5 日创建，待合并）：面向 WorkBuddy 风格的工作区工件卡片，涉及会话持久化，需评估与现有存储层的兼容性。

- **[PR #6976] feat: session-scoped multi project directories**（8 月 13 日创建，待合并）：会话级多项目目录绑定，文件工具相对路径和 shell cwd 将支持多根目录解析。

**需关注的新缺陷（无 fix PR 关联）：**

- **[Issue #7082]** `_StructuredOutputDynamicClass is not fully defined`（开启，无回应）
- **[Issue #7076]** qwenpaw-creator 模型配置 404（开启，无回应）
- **[Issue #7084]** 单条历史会话无法打开（开启，低危）

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

# EasyClaw 项目动态日报

**日期：** 2026-08-18  
**数据窗口：** 2026-08-17 ~ 2026-08-18

---

## 1. 今日速览

过去 24 小时，EasyClaw 项目发布新版本 v1.8.100（TK Copilot），为达人协作工作流提供了扩展能力。Issue 与 PR 活跃度均为 0，社区提交与讨论处于低活跃状态，但版本迭代节奏保持正常，表明项目由维护者驱动、按计划稳步推进。整体项目健康度良好，无未处理的新增 Bug 或回归报告。

---

## 2. 版本发布

### v1.8.100（TK Copilot）

- **发布时间：** 2026-08-18  
- **发布链接：** [GitHub Releases - v1.8.100](https://github.com/gaoyangz77/easyclaw/releases)

**更新内容：**

- 扩展达人（Affiliate）协作工作流，支持将外联设备绑定至商务开发（BD）人员
- 改善桌面端内置插件支持

**破坏性变更：** 未提及

**迁移注意事项：**

- macOS 用户若遇到 **"'RivonClaw' is damaged and can't be opened"** 提示，需根据发布说明完成 Gatekeeper 相关解除操作。
- 若现有工作流中已使用达人外联设备，建议在升级后重新检查设备与 BD 人员的绑定关系。

---

## 3. 项目进展

今日无合并或关闭的 PR。项目主要进展体现在 v1.8.100 版本发布上，核心推进了**达人协作流程中设备-人员绑定机制**，将外联设备的管理粒度细化至 BD 人员层级，为后续多角色协同与权限管理打下基础。桌面端插件支持的改善则有助于提升端侧集成体验。

---

## 4. 社区热点

今日无活跃讨论的 Issues 或 PRs。

---

## 5. Bug 与稳定性

今日无新报告的 Bug、崩溃或回归问题。唯一值得关注的是 macOS 安装时可能出现的 **"RivonClaw is damaged"** 提示，这属于 Gatekeeper 签名校验问题，非代码缺陷，已有官方安装说明指引，请 macOS 用户参照 Releases 页面处理。

---

## 6. 功能请求与路线图信号

今日无新增功能请求。结合 v1.8.100 的发布内容，可以观察到以下路线图信号：

- **达人协作/联盟营销**方向正持续加强，设备-人员绑定只是第一步，后续可能延伸出更细粒度的权限管理、数据隔离与分成核算相关功能。
- **桌面端插件体系**在持续完善，暗示项目正从单纯的服务端能力向端侧一体化演进。

---

## 7. 用户反馈摘要

今日无 Issues 评论数据可供分析。

---

## 8. 待处理积压

当前积压数量为 **0**，无长期未响应的 Issue 或 PR。维护响应及时，项目无历史包袱。

---

**健康度总结：** 项目处于稳定迭代轨道，社区互动静默但发布节奏未中断，建议维护者关注社区活跃度偏低的问题，适时通过 issue 模板引导或 roadmap 公示来吸引外部贡献。

</details>

---
*本日报由 [agents-radar](https://github.com/huang-yi-dae/agents-radar) 自动生成。*