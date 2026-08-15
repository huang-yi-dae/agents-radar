# OpenClaw 生态日报 2026-08-15

> Issues: 500 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-08-15 01:01 UTC

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

# OpenClaw 项目动态日报 — 2026-08-15

## 今日速览

项目活跃度处于高位：过去 24 小时新增/活跃 Issue 与 PR 各 500 条，但新版本发布为 0，整体处于密集迭代与问题收敛阶段。合并/关闭的 PR 仅 97 条（约 19%），大量 PR 仍待维护者处理，同时多个 P0 级缺陷（网关内存泄漏、文件工具路径错误等）仍在积压，表明项目在功能推进的同时，稳定性债正在累积。社区讨论最集中的议题是 **silent reply failures 反复出现**（单 Issue 评论达 94 条），以及 **内存泄漏导致 OOM 崩溃** 等可靠性问题，用户对已关闭问题未真正修复表达了明显不满。

---

## 项目进展

今日合并/关闭的 PR 中，以下几条对项目健康度有实质推进：

- **[refactor(sessions): trim maintenance cap duplicate tests](https://github.com/openclaw/openclaw/pull/123909)** — 清理会话维护上限的重复测试，减少维护成本。
- **[fix: recognize xAI in empty-config startup validation](https://github.com/openclaw/openclaw/pull/123904)** — 修复空配置启动校验未识别 xAI 插件导致的发布验证失败，保障发布管线通畅。
- **[feat(security): require acknowledgement for install policy warnings](https://github.com/openclaw/openclaw/pull/116489)**（已关闭）— 引入安装策略警告确认机制，允许 `security.installPolicy` 返回 `warn`，要求操作者确认可疑插件/技能安装，属安全边界增强。

整体来看，项目在安全策略、UI 体验和内部工程质量三线并进，但大量 PR 依赖链较长（如 #123656 依赖 #123645，后者又依赖 #123582），说明 Web UI 正在经历一次大规模重构，短期合并速度可能因此放缓。

---

## 社区热点

### 讨论最集中：Silent reply failures 反复出现（94 条评论）
**[Issue #121058 — Silent reply failures still recurring after #116277 closed](https://github.com/openclaw/openclaw/issues/121058)**

用户 `sloptop-the-terrible` 指出 #116277 虽被关闭，但监控 cron 仍在持续记录新的事件（包括发帖当天）。该问题至今无 fix PR 关联，社区对此表达强烈不满。这是当前社区信任度最受考验的问题之一。

### 高赞功能请求：Memory Trust Tagging by Source（51 条评论）
**[Issue #7707 — Feature Request: Memory Trust Tagging by Source](https://github.com/openclaw/openclaw/issues/7707)**

提出按来源（用户命令、网页抓取、第三方技能）为记忆条目标记信任级别，以防范通过不可信内容进行的记忆投毒攻击。该议题获得 51 条评论，反映用户对 **安全与记忆可靠性** 的持续关注。

### P0 级内存泄漏讨论持续
**[Issue #91588 — Critical: Gateway Memory Leak](https://github.com/openclaw/openclaw/issues/91588)**

RSS 从 350MB 增长至 15.5GB、反复 OOM 崩溃，已有 24 条评论。该问题直接影响生产环境稳定性，是高优先级信号。

---

## Bug 与稳定性

### P0 级（严重，已有或需立即修复）

| Issue | 问题描述 | Fix PR 状态 |
|-------|---------|------------|
| [#91588](https://github.com/openclaw/openclaw/issues/91588) | 网关内存泄漏，RSS 涨至 15.5GB，OOM 崩溃循环 | 无 PR |
| [#119270](https://github.com/openclaw/openclaw/issues/119270) | 文件工具剥离目标路径开头的 `@`，导致写入/删除错误的文件 | 无 PR |
| [#48920](https://github.com/openclaw/openclaw/issues/48920) | Live Docs 领先于正式发布版本，文档配置不可用 | 无 PR |

### P1 级（高优先级）

- **[#91009](https://github.com/openclaw/openclaw/issues/91009) — Codex PreToolUse 钩子产生 CPU 满载进程并阻塞网关 RPC**：有 2 个 👍，暂无 fix PR。
- **[#48003](https://github.com/openclaw/openclaw/issues/48003) — Steer 模式无法在主会话回合中注入消息**（19 条评论，4 👍），已有 linked PR，但 3 月提出至今未关闭。
- **[#47975](https://github.com/openclaw/openclaw/issues/47975) — 子代理会话持久化导致主会话无响应**（11 条评论），无 PR。
- **[#123557](https://github.com/openclaw/openclaw/issues/123557) — ACP 会话 cwd 未传播至 Gateway chat.send**，已有 fix-shape-clear 标记，有 PR 排队。

此外，**重复出现的同类问题**值得注意：`#87109`（Gateway heap 增长至 1073MB，cron 静默失败）、`#86119`（孤儿 node 进程积累）与 #91588 同属一类，提示网关内存与进程生命周期管理存在系统性缺陷。

---

## 功能请求与路线图信号

### 可能被纳入下一版本（已有对应 PR 或明确实现路径）

- **UI 大规模重构**：多条 PR 集中在 Web UI 的侧边栏、会话管理、身份信息展示等方面（如 [#123645](https://github.com/openclaw/openclaw/pull/123645)、[#123656](https://github.com/openclaw/openclaw/pull/123656)、[#123566](https://github.com/openclaw/openclaw/pull/123566) 等），显示 UI/UX 是当前迭代重点。
- **安装策略警告确认**（[#116489](https://github.com/openclaw/openclaw/pull/116489) 已合并，[#120900](https://github.com/openclaw/openclaw/pull/120900) 待合并）— 安全管理能力的持续增强。

### 社区呼声高但尚无明确排期

- **Memory Trust Tagging by Source**（[#7707](https://github.com/openclaw/openclaw/issues/7707)）— 记忆安全相关，评论 51 条，无 PR。
- **Agent-triggered context compaction**（[#6757](https://github.com/openclaw/openclaw/issues/6757)）— 让代理自主触发上下文压缩，2 👍。
- **Per-agent cost budget enforcement**（[#42475](https://github.com/openclaw/openclaw/issues/42475)）— 网关级成本预算控制，1 👍，3 月提出。
- **Fully dynamic model discovery**（[#10687](https://github.com/openclaw/openclaw/issues/10687)）— 动态模型发现（OpenRouter），3 👍。

---

## 用户反馈摘要

- **反复出现的“假修复”**：#121058 用户明确指出“#116277 关闭了但问题依旧”，此反馈极具代表性，说明用户对 issue 关闭标准存疑，建议维护者在关闭前补充更严格的验证标准。
- **消息静默丢失多发于群聊/特定渠道**：WhatsApp（#92186、#50093）、LINE（#86012）、Feishu（#48786）均有消息丢失或占位符未解析的报告，用户强调“控制台能看到回复但用户收不到”，这种不一致体验影响信任。
- **文档与版本不同步**（#48920）及 SecretRef `default` 行为未文档化（#121083）被多次提及，社区希望文档与 release 强绑定。
- **部署/升级路径不清晰**：生产用户请求 Codex compact 404 的安全升级指引（#123799），dev 渠道更新失败（#123073），反映用户对升级可靠性的担忧。

---

## 待处理积压

以下为长期未关闭但重要性高、需维护者优先关注的事项：

- **[#91588 — 网关内存泄漏（P0）](https://github.com/openclaw/openclaw/issues/91588)**：6 月提出，至今无 fix PR，直接影响生产稳定性。
- **[#7707 — Memory Trust Tagging（讨论热烈）](https://github.com/openclaw/openclaw/issues/7707)**：2 月提出，51 条评论，无 action。
- **[#121058 — Silent reply failures 复发（94 条评论）](https://github.com/openclaw/openclaw/issues/121058)**：社区关注度最高，无 fix PR。
- **[#48003 — Steer 模式消息注入失败（P1）](https://github.com/openclaw/openclaw/issues/48003)**：3 月提出，虽有 linked PR 但长期未关闭。
- **[#123073 — dev 渠道更新失败（P1，已有清晰复现）](https://github.com/openclaw/openclaw/issues/123073)**：新近提出，修复路径明确（pnpm 适配），建议优先处理。

---

*数据来源：[github.com/openclaw/openclaw](https://github.com/openclaw/openclaw)，统计窗口为 2026-08-14 至 2026-08-15。*

---

## 横向生态对比

# 个人 AI 助手开源生态横向对比分析报告 — 2026-08-15

## 1. 生态全景

个人 AI 助手/自主智能体开源生态正处于**功能快速迭代与稳定性债务累积并行**的关键阶段。头部项目（OpenClaw、ZeroClaw、CoPaw）保持高吞吐开发节奏，但普遍面临 P0 级缺陷积压（网关内存泄漏、静默消息丢失、假修复循环）与社区信任度挑战。NanoBot、IronClaw 等二线项目在特定方向（WebUI 重构、自动化可靠性）形成差异化竞争力，而 PicoClaw、NanoClaw、NullClaw 等更聚焦于细分场景与兼容性修补。跨项目高度共识的技术方向为：**记忆安全与可信来源标记、多通道消息一致性、安全策略硬化（安装确认/命令分级）、跨协议互操作（Chat Completions/MCP/OAuth）**。整体生态呈现"上层拼体验、下层拼稳定性"的分化态势。

## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | 合并/关闭 PR | Release | 健康度评估 |
|------|------------|---------|-------------|---------|-----------|
| **OpenClaw** | ~500 | ~500 | 97（19%） | 无 | ⚠️ 高活跃但稳定性债累积，P0 缺陷无修复 PR，假修复引发社区不满 |
| **ZeroClaw** | 33 | 50 | 3 | 无 | ✅ 活跃且健康，安全硬化与 RFC 密集推进，但 P1 卡在 needs-author-action |
| **NanoBot** | 3 | 22 | 8（36%） | 无 | ✅ 节奏良好，Bug 修复响应快（当日闭环），WebUI 冲突需协调 |
| **PicoClaw** | 3 | 9 | 5（56%） | 无 | ✅ 中等活跃，MCP 挂起 bug 修复在途，5 条 stale PR 被清理 |
| **NanoClaw** | 2 | 11 | 3（内部测试） | 无 | ✅ 低中活跃，社区贡献者响应快，安装兼容性问题待合入 |
| **NullClaw** | 0 | 1 | 1 | 无 | ✅ 低活跃但正常迭代，无积压 |
| **IronClaw** | 25 | 46 | 未披露 | 无 | ✅ 极高活跃，v1.3.0 自动化重构密集落地，QA 联动迅速 |
| **LobsterAI** | 2 | 27 | 22（81%） | ✅ 2026.8.14 | ✅ 高活跃且高效，合并率高，工程实践成熟 |
| **CoPaw** | 50（12 新开/活跃） | 41 | 15（37%） | 无 | ⚠️ 高活跃但积压明显（26 条待合并），集中清理历史 Issue 是积极信号 |
| **Moltis** | 0 | 2 | 0 | 无 | ✅ 低活跃但方向清晰（连接器/原生集成），社区互动不足 |
| **TinyClaw / ZeptoClaw / EasyClaw** | — | — | — | — | 无活动 |

## 3. OpenClaw 在生态中的定位

OpenClaw 是生态中**活跃度与社区规模绝对领先的头部项目**（单日 Issue+PR 合计约 1000 条，远超 ZeroClaw 的 83 条与 IronClaw 的 71 条），是事实上的生态参照系——多个项目（NanoBot、LobsterAI、PicoClaw）直接围绕其技能、渠道与插件体系做兼容或复用。

- **优势**：生态辐射力强、功能覆盖面广（渠道矩阵、安全策略、UI 重构三线并进）、社区讨论密度高（单 Issue 可达 94 条评论）。
- **技术路线差异**：OpenClaw 采用"大而全"的 monorepo 策略，追求全渠道覆盖与深度集成；相比之下，IronClaw 聚焦自动化可靠性契约（预检/模型固定/静默协议），NanoBot 以轻量架构 + 快速 Bug 闭环见长，LobsterAI 则呈现典型的"商业产品化"迭代节奏（低 Issue 量、高 PR 合并率、定期 Release）。
- **最大风险**：稳定性债务——P0 级内存泄漏（RSS 至 15.5GB）三月无修复 PR、silent reply failures 反复"假修复"（94 条评论），正在侵蚀社区信任。这使得部分用户可能转向 ZeroClaw（安全硬化突出）或 NanoBot（响应更快）等替代品。

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|---------|---------|---------|
| **记忆安全与可信来源** | OpenClaw（#7707）、LobsterAI（#1154 记忆写入测试）、IronClaw（#7664 可插拔内存） | 按来源（用户/网页/第三方技能）为记忆标记信任级别；防止不可信内容投毒；外部记忆系统（Mnesis）需为工具 |
| **多通道消息一致性与可靠性** | OpenClaw（WhatsApp/LINE/Feishu 静默丢失）、IronClaw（#7660 Slack 状态误报）、PicoClaw（#3307 渠道功能对齐） | 控制台有回复但用户收不到；UI 状态与真实连接不一致；渠道能力差异大（WebUI 有会话管理而 Telegram 没有） |
| **安全策略硬化** | ZeroClaw（#7155 高风险命令分级确认）、OpenClaw（#116489 安装策略警告）、NanoBot（#4689 OAuth 状态可见）、ZeroClaw（#9996 原子化预算） | 命令 allow/ask/deny 三级；安装策略需确认；OAuth 令牌过期预警；预算执行需原子性 |
| **跨协议互操作** | ZeroClaw（#8603 Chat Completions profile）、IronClaw（unbound-turns）、CoPaw（MCP 404 反复） | 通过 OpenAI Chat Completions 接入 Open WebUI/LobeChat；版本升级后 MCP 工具契约破坏 |
| **自动化/无人值守可靠性** | IronClaw（#6879 + 4 子任务）、PicoClaw（#3269 MCP 故障挂起）、CoPaw（#7010 后台/守护模式） | 小模型输出不稳定需结构化契约；外部服务故障时 Agent 需优雅降级；需真正后台运行能力 |
| **agent 上下文管理与生命周期** | NanoBot（#5271 会话覆盖）、OpenClaw（#6757 自主上下文压缩）、CoPaw（#4436 会话拆分）、IronClaw（#7634 prepared-context） | 后台任务保存不覆盖新会话；代理自主触发压缩；会话拆分与单条删除；上下文切换架构重构 |

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构关键差异 |
|------|---------|---------|----------------|
| **OpenClaw** | 全功能 AI 助手（多渠道、多模型、插件生态） | 个人开发者到中小团队 | monorepo 大而全；Web UI 大规模重构中；安全策略逐步增强 |
| **ZeroClaw** | 安全与合规优先的自托管 Agent | 安全敏感型团队/企业 | 安全策略硬化（网络守卫、动作预算原子化、命令分级）；Rust 基础设施；RFC 驱动的架构演进 |
| **NanoBot** | 轻量自托管助手，注重开发体验 | 个人开发者、技术爱好者 | TypeScript 全栈；响应速度快（当日 Bug 闭环）；WebUI 重构活跃；MCP SDK v2 迁移 |
| **IronClaw** | 自动化/无人值守 Agent 执行可靠性 | 依赖 Agent 自动化生产工作流的团队 | 结构化执行契约（预检、模型固定、[SILENT] 协议）；Unbound-turns 架构切换；可插拔内存 |
| **CoPaw** | 多渠道 Agent 与插件生态 | 中文社区、跨渠道用户 | 渠道（OneBot/飞书等）优先；插件动态加载；配置管理仍需打磨 |
| **LobsterAI** | 商业级产品化 AI 助手 | 企业用户、Team Edition | 最快迭代节奏（Merge 率 81%，周 Release）；侧边栏商业化；多智能体任务管理 |
| **PicoClaw** | 轻量、低硬件门槛 Agent | 低功耗设备/嵌入式场景用户 | Go 语言实现（并发安全关注）；TTS/多模态渠道接入；模型回退链配置 |
| **NanoClaw** | 容器化部署的轻量 Agent | Docker/K8s 环境用户 | 容器镜像分发（cosign 验证）；Bun 运行时；调度器与孤儿容器管理 |
| **Moltis** | 跨平台连接器（Slack/日历/邮件） | 偏个人知识管理/数据接入场景 | 持久化连接器（CalDAV/Gmail）+ 本地全文本搜索；Slack 原生卡片 |

## 6. 社区热度与成熟度

**快速迭代阶段（高活跃 + 功能推进为主）**：
- **IronClaw** — 极高活跃，自动化可靠性重构密集开发，QA 联动闭环快，架构升级（unbound-turns、可插拔内存）推进中。
- **ZeroClaw** — 活跃度高，安全硬化与多个 RFC（其中 3 个 P1/P2 级）同步修订中，但 P1 级 bug 与安全修复大量卡在 `needs-author-action`，需加速收敛。

**质量巩固阶段（高活跃 + 稳定性/体验打磨为主）**：
- **OpenClaw** — 活跃度最高但稳定性债务最重，大量 PR 待审（合并率仅 19%），P0 缺陷长期无修复，UI 重构拖慢合并节奏。该阶段若不能快速偿还债务，社区信任可能加速流失。
- **NanoBot** — 响应快速、Bug 闭环短（当日修复），WebUI 冲突标签提示功能密集期冲突协调将是近期重点，但整体清欠节奏健康。
- **LobsterAI** — 合并率高（81%）、定期 Release、工程实践最接近商业产品，主要风险是长期 stale 的测试覆盖与功能 PR（#1154、#1155）。
- **CoPaw** — 高活跃，历史 Issue 集中关闭是积极信号，但 26 条待合并 PR（含 2 条停留超 1 个月）提示评审吞吐成为瓶颈，且 MCP 工具 404 复现问题表明版本兼容性测试需加强。

**稳健低活跃期**：
- **PicoClaw / NanoClaw / NullClaw / Moltis** — 按各自节奏推进，PicoClaw 聚焦渠道适配，NanoClaw 在安装/容器兼容性修补，NullClaw 处于日常迭代间歇期，Moltis 由维护者单驱动，路线图清晰但社区互动不足。

## 7. 值得关注的趋势信号

**对技术决策者/开发者的参考价值：**

1. **"假修复"正在成为信任杀手** — OpenClaw #121058 的 94 条评论揭示用户对"关闭 issue 但未真正修复"的强烈不满（#116277 关闭后问题依旧）。信号：**发布验证需与 issue 闭环标准强绑定**，建议在关闭 issue 时附上用户可验证的修复证据或回归测试。对开发者的启示：验证标准需要"用户视角可感知"，而非仅内部逻辑正确。

2. **安全功能误伤可信度问题值得关注** — ZeroClaw 的高熵检测器将 Solana 地址脱敏（#9486）、OpenClaw 的安装策略警告引起争议、安全命令分级（ZeroClaw #7155）的讨论表明：**过度激进的安全策略直接损害核心用户体验**。平衡点在于：安全功能需支持细粒度豁免（白名单、渠道级开关），并提供清晰的可解释性。

3. **自动化/无人值守可靠性是规模化瓶颈** — IronClaw 将 #6879（自动化不可靠）升级为 v1.3.0 史诗并拆分为 4 个子任务（预检、模型固定、授权租约、无声失败抑制），结合 PicoClaw 的 MCP 故障挂起问题（#3269），说明行业正从"演示级 Agent"转向"生产级 Agent"。信号：**结构化执行契约（确定性无投递结果、模型固定、授权租约）将成为自动化 Agent 的基础设施**。

4. **外部数据层成为差异化战场** — IronClaw 的 MCP-backed 可插拔内存（#7664）、Moltis 的 CalDAV/Gmail 持久化连接器（#1190）、OpenClaw 的记忆信任标记（#7707）共同指向：**记忆与外部数据源的管理将从"附属功能"变为"核心架构组件"**，可信来源标记与数据接入方式将成为下一代 Agent 的竞争力来源。

5. **跨平台互操作诉求在累积** — ZeroClaw Chat Completions profile（#8603，19 评论）显示用户希望 Agent 能力能接入 Open WebUI/LobeChat 等第三方客户端；NanoClaw 预构建镜像的 AVX2 依赖问题（#3245）则暴露了"一次构建、到处运行"的兼容性陷阱。信号：**协议标准化（Chat Completions/MCP）与构建产物多架构适配将成为产品化必选项**。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 — 2026-08-15

## 今日速览

过去 24 小时内，NanoBot 项目保持着较高的活跃度：共处理 3 条 Issue（1 条新增、2 条关闭）和 22 条 PR（14 条待合并、8 条已合并/关闭）。其中 Anthropic 流式超时误用 Bug（[#5391](https://github.com/HKUDS/nanobot/issues/5391)）在当天内完成从报告到修复 PR（[#5392](https://github.com/HKUDS/nanobot/pull/5392)）的全流程，响应速度值得肯定。WebUI 相关功能开发密集（侧边栏过渡、拖拽分组、会话协作、粒子背景等），同时 Pyright 严格检查的代码质量重构获得了两条相关 PR 的接力推进。此外，8 条关闭的 PR 中。包括 OAuth 状态警告（#4689）、显式上下文加载（#5018）等较长生命的 PR（分别历时 42 天、24 天）获得合入，显示出维护者正在加速清理积压。整体来看，项目处于功能迭代活跃期。但多条 WebUI PR 带有 `conflict` 标签（#5356、#5358、#5340、#5389、#5371），提示合并冲突协调将成为近期维护工作的重点。

## 版本发布

无新版本发布。

## 项目进展

今日共有 8 条 PR 被合并或关闭，其中对项目有实质推进的亮点如下：

- **[#5392](https://github.com/HKUDS/nanobot/pull/5392) fix(anthropic): treat stream idle timeout as inactivity only, not total time** — 修复了 `NANOBOT_STREAM_IDLE_TIMEOUT_S` 被误用作 Anthropic 无回调流路径总超时的严重 Bug。此前超过 90 秒的活跃生成会被强制中断。已于当日合入。
- **[#4689](https://github.com/HKUDS/nanobot/pull/4689) feat(providers): surface OAuth status and expiry warnings** — 历经 42 天的长跑后关闭，为 CLI、WebUI 和运行时会话增加了 OAuth 状态可见性与令牌过期预警，改善了 OAuth 提供商的用户体验。
- **[#5018](https://github.com/HKUDS/nanobot/pull/5018) feat(skills): support explicit context loading** — 修复了 `ContextBuilder` 中 `skill_names` 输入被忽略的问题，使显式请求的技能可以被预加载到系统提示中，增强了技能调用的灵活性。
- **[#5393](https://github.com/HKUDS/nanobot/pull/5393) feat(webui): polish sidebar and session transitions** — 从 #5358 拆出的 UI 仅优化，已合入 main，包含侧边栏层次结构优化和扁平化标签样式等改动。
- **[#5395](https://github.com/HKUDS/nanobot/pull/5395) feat(webui): refine conversation groups and shared shapes** — 统一分组术语，支持拖拽将会话移入/移出分组，并简化删除确认样式。

以上合入内容覆盖了稳定性修复、技能系统改进、WebUI 体验优化和开发体验（OAuth 状态）多个维度，项目整体处于稳步前进的节奏中。

## 社区热点

今日最受关注的工作集中在 WebUI 拖拽式会话管理这一主题上，核心来自两条相邻的 PR：

- **[#5389](https://github.com/HKUDS/nanobot/pull/5389) feat(webui): add drag-and-drop session organization** — 支持拖拽排序独立会话、拖到另一个会话上创建分组。当前状态为 OPEN，带 `conflict` 标签。
- **[#5395](https://github.com/HKUDS/nanobot/pull/5395) feat(webui): refine conversation groups and shared shapes** — 同为会话分组功能但已被关闭，推测为合入 main，说明该方向已确认纳入主干。

此外，[#5396](https://github.com/HKUDS/nanobot/pull/5396) 修复了 #5161 Pyright 文件级抑制的简化重构，是 [#5158](https://github.com/HKUDS/nanobot/pull/5158) strict 检查合入后的自然延展。

从背后诉求来看，社区参与者对 WebUI 会话管理体验改进有很大期待，特别是拖拽、分组、本地化等交互优化，反映出用户对"会话组织效率"的需求在不断增长。

## Bug 与稳定性

| 严重程度 | Issue/PR | 描述 | 状态 |
|---------|----------|------|------|
| 高 | [#5391](https://github.com/HKUDS/nanobot/issues/5391) | Anthropic 无回调流路径下 idle timeout 被当作总超时，活跃的长生成会被强杀 | 已关闭，[#5392](https://github.com/HKUDS/nanobot/pull/5392) 已合入修复 |
| 中 | [#5378](https://github.com/HKUDS/nanobot/issues/5378) | `enforce_file_cap()` 在归档回调抛错时已变更内存态，后续保存可能持久化错误状态 | 已关闭 |
| 中 | [#5271](https://github.com/HKUDS/nanobot/pull/5271)（OPEN） | 后台任务保存可能覆盖 `/new` 后的新会话数据，涉及会话生命周期竞态，优先级 p0 | 修复 PR 待合入 |
| 中 | [#5382](https://github.com/HKUDS/nanobot/pull/5382)（OPEN） | Windows 上 `os.replace()` 的瞬时 `PermissionError` 导致整个 gateway 崩溃，已在生产日志中确认两次 | 修复 PR 带 `conflict` 标签，待合入 |
| 低 | [#5152](https://github.com/HKUDS/nanobot/pull/5152)（OPEN） | 子代理结果未标记部分完成，模型可能误判所有任务已结束 | 修复 PR 待合入 |

## 功能请求与路线图信号

- **WebUI 会话协作（通过提及）** — [#5358](https://github.com/HKUDS/nanobot/pull/5358) 为持久化会话赋予服务端拥有的 `@name`，支持在编辑器中通过提及选择对等会话。该 PR 标记 `conflict` 但功能方向明确，若能解决冲突很可能进入下一版本。
- **富交互背景效果** — [#5340](https://github.com/HKUDS/nanobot/pull/5340) 引入 Canvas 粒子背景，属于主观视觉偏好类功能，是否合入存在一定不确定性。
- **MCP SDK v2 迁移** — [#5179](https://github.com/HKUDS/nanobot/pull/5179) 将 MCP 客户端集成从 v1 `ClientSession` 迁移到 v2 高级 `Client` API，同时保留 SSRF 验证、DNS pinning 等安全机制，优先级 p1，属于重要的技术债清理。
- **TypeScript 终端 UI** — [#4329](https://github.com/HKUDS/nanobot/pull/4329) 重建 `nanobot agent` 为原生 TypeScript/OpenTUI 客户端，长期未合并，路线图归属有待观察。

## 用户反馈摘要

- 用户在 [#5391](https://github.com/HKUDS/nanobot/issues/5391) 中明确了 Anthropic 流式路径下活跃生成被 90 秒 idle timeout 强行中断的痛点，描述具体、有代码定位（`anthropic_provider.py:842-845`）。
- [#5378](https://github.com/HKUDS/nanobot/issues/5378) 反馈了文件归档失败时会话内存态被修改、错误状态可能被持久化的问题，属于数据一致性方面的真实隐患。
- [#5382](https://github.com/HKUDS/nanobot/pull/5382) 的作者提供了 Windows 生产环境 gateway 日志作为复现证据，确认了 `heartbeat` cron 任务中 `os.replace()` 的瞬时权限错误，说明 Windows 平台稳定性值得关注。
- 在 [#5271](https://github.com/HKUDS/nanobot/pull/5271) 中，用户指出 `/new` 之后后台任务保存会覆盖新会话数据，反映的是实际使用中多会话切换时的数据安全顾虑。

## 待处理积压

- **[#5271](https://github.com/HKUDS/nanobot/pull/5271)（优先级 p0，OPEN）** — 阻止过期的后台任务保存覆盖会话数据。标记为 p0 但自 8 月 6 日起已停留超过一周未合并，建议优先处理，以免影响多会话用户体验。
- **[#4329](https://github.com/HKUDS/nanobot/pull/4329)（OPEN，6 月 13 日创建）** — TypeScript 终端 UI 已等待超过两个月。尽管体量大，但若项目仍希望保留该方向，建议维护者明确表达采纳意图或要求重构后重新提交，避免长期悬置。
- **[#4145](https://github.com/HKUDS/nanobot/pull/4145)（OPEN，6 月 1 日创建）** — Weather Skill 示例贡献已搁置两个多月，长期未获维护者回应。
- **[#5152](https://github.com/HKUDS/nanobot/pull/5152)（OPEN）** — 子代理部分完成标记的修复已等待约两周，功能正确性影响模型行为，建议尽快推进评审。
- **[#5309](https://github.com/HKUDS/nanobot/pull/5309)（OPEN）** — 修复 marketplace 技能无法覆盖内置技能的问题，涉及安装按钮与安装后端行为不一致，从 8 月 9 日至今等待约一周，建议给予关注。

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

### 1. 今日速览

ZeroClaw 项目继续保持高活跃度，过去 24 小时内产生 33 条 Issue 更新和 50 条 PR 更新，主要围绕安全策略硬化、架构 RFC 评审和跨平台兼容性修复。**关键信号**：多项高风险 RFC（#8303、#7155、#7141）仍在密集修订中，且多个高优先级（P1） Bug（Windows 测试失败 #7462、终端响应误报 #9421）处于修复或接受状态。此外，`needs-author-action` 标签在众多 PR 上出现，说明维护者评审反馈及时，但贡献者响应存在积压。总体项目健康度良好，处于功能架构定型和稳定性加固并行阶段，但大量 P1/P2 级 RFC 和 Bug 的堆积需关注解决速率。

---

### 3. 项目进展

今日无新版本发布，合并/关闭的 PR 数量有限（3 条，未列出明细），但多个大型 PR 处于活跃推进状态，是项目进展的主要引擎：

- **安全与合规硬化**（多项依赖 #9580 的系列工作）：
    - **PR #9580** `fix(security): harden built-in HTTP egress on the shared network guard`：强化内置 HTTP 出口边界，将网络分类原语抽取到 `zeroclaw-infra::net_guard` 复用，为插件出口策略奠定基础。
    - **PR #9137** `feat(plugins): add shared egress policy foundation`（依赖 #9580）：基于共享网络守卫，重新切出类型化插件出口基础层。
    - **PR #9996** `fix(security): make action budget accounting atomic`：修复 sender-scoped 动作预算会计逻辑，原子化预留容量，避免并行调用突破 `max_actions_per_hour` 限制。
- **终端响应正确性**：**PR #9999** `fix(compatible): classify output-limited terminal responses`：将 OpenAI 兼容 `finish_reason: "length"` 归类为类型化输出 Token 上限终止失败，并拒绝不完整的非流式文本，直接应对 Issue #9421。
- **核心配置事务性**：**PR #9281** `fix(config): roll back auto-created map aliases when config set fails`：确保 `config/set` RPC 在持久化边界失败时，事务性回滚新物化的别名，避免脏状态。
- **工程效率**：**PR #9962** 与 **PR #9985**（stacked）：将 rust-cache 路由到 provider-aware 复合操作，并将 Blacksmith runner 扩展到 `msrv`、`parallel-runtime-test`、`installer-drift` 等计算密集型任务，持续优化 CI 基础设施。

---

### 4. 社区热点

今日讨论最集中的议题体现了社区对**架构方向**和**安全策略**的高度关注：

- **Issue #8303** `[RFC] Goal mode v1 — bounded foreground Matrix work`（22 评论）：讨论如何在不同轮次间持久化地追求有界用户目标。社区关注点在于初版提案范围过大，耦合了重启切换、信道准入、Web 和异步子任务，正在为其划定更明确的边界（优先在 foreground Matrix 场景落地）。
- **Issue #7155** `[RFC] Add a per-execution confirmation tier for high-risk shell commands`（20 评论）：讨论高风险 Shell 命令的分级确认机制及 Claude Code 风格策略（allow/ask/deny）。当前 Revision 3 已按维护者评审意见将规范范围缩减至 Shell 策略契约。
- **Issue #8603** `[RFC] ZeroClaw Chat Completions profile`（19 评论）：社区强烈需求通过 OpenAI Chat Completions 协议（Open WebUI、LobeChat 等客户端）访问 ZeroClaw 的 Agent 能力，表明互操作性和生态接入是用户关注的重点。
- **Issue #7141** `[RFC] Pluggable inbound authentication and canonical principals`（16 评论）：安全架构核心讨论，涵盖 OIDC、可插拔 Provider 及规范主体，是身份与访问里程碑的关键设计，需持续关注其定稿。

---

### 5. Bug 与稳定性

今日报告的 Bug 按严重程度排列：

- **[S1 - 阻断工作流] Issue #9421** `[Bug]: Incomplete terminal responses can be reported as successful`：Provider 可在无可靠最终答案时结束回合，但运行时仍向调用方报告成功。**已有对应修复 PR #9999**（分类 `finish_reason: length` 为失败），但目前仍标记为 `in-progress`，需确认 PR 合并后关闭。
- **[S2 - 行为降级] Issue #7462** `[Bug]: 74 test failures on Windows`：Windows 11 平台存在 74 个测试失败，源于 Unix-only 测试命令和路径语义差异，CI 未覆盖 Windows 无法捕获。该问题已接受 (`status:accepted`)，但没有绑定具体修复 PR，且 Issue #10001 和 #10002 显示社区正分头修补特定测试（如非 UTF-8 路径 fixture 门控）。
- **[S2 - 行为降级] Issue #9486** `[Bug]: High-entropy detector redacts Solana wallet addresses`：高熵检测器在 Telegram 信道上误将 Solana 钱包地址替换为 `[REDACTED_HIGH_ENTROPY_TOKEN]`，且 `high_entropy_tokens=false` 无效。已接受待处理，影响加密货币相关用户场景。
- **[S3 - 次要] Issue #9983** `[Bug]: Fallback model without vision incorrectly reports cause of error`：当主模型支持视觉、fallback 模型不支持时，错误信息指示错误原因有误，误导排查。

---

### 6. 功能请求与路线图信号

以下新功能请求与现有 PR 呼应，很可能被纳入 v0.8.5 版本线（截止 8 月 30 日）：

- **Agent 可移植性**：**Issue #9982**（已关闭，wontfix / 外部托管推广）被拒，但 **PR #9986** `feat(agents): export an agent to a portable bundle`（新增 `zeroclaw agents export` 命令）正在推进，可导出 Manifest、配置闭包和工作区树，便于 Agent 迁移。
- **Telegram 模型选择器增强**：**Issue #9895** 请求 provider-grouped、分页的 Telegram `/model` 选择器，用于替代当前繁琐的文本命令。该请求直击移动端可用性痛点，状态 `accepted`。
- **Discord 角色授权**：**Issue #9970** 请求 `channels.discord.<alias>.allowed_role_ids`，支持按角色（而非仅用户 ID）授权。状态 `in-progress`。
- **Cron/心跳合约清晰化**：**PR #9842** `feat(cron/heartbeat): state the delivery contract to autonomous turns`：向自主回合明确说明回复投递去向，修复 cron 任务中模型对回复处理方式不透明的「披露缺口」。
- **ZeroCode 转录 UX**：**PR #9994** `feat(zerocode): add transcript copy context menu`：为 ZeroCode 转录消息和代码块添加「复制」上下文菜单，避免右键直接变更剪贴板的非预期行为。

---

### 7. 用户反馈摘要

- **安全功能误伤（可信度受损）**：多位用户报告安全检测器产生误报，如 Solana 地址被脱敏（#9486）。这反映出平衡安全策略与功能可用性是当前最大挑战，过度激进的安全策略会直接损害特定领域（如 Web3）用户的核心体验。
- **通道 UX 是刚需**：Telegram（#9895）和 Discord（#9970）的授权与模型选择请求表明，用户正从个人实验走向团队协作，需要更精细化的多用户管理和移动端流畅操作。
- **对回复正确性要求高**：Issue #9421（不完整响应误报）揭示了用户对 Agent 输出可靠性的高度敏感，特别是在自动化工作流中，误报成功可能导致下游错误决策。
- **负面反馈示例**：Issue #9982（外部托管内存推销）被快速标记 `wontfix` 并关闭，说明用户欢迎有价值的功能提议，但对营销性质或偏离项目自托管核心价值的提案持排斥态度。

---

### 8. 待处理积压

以下长期未关闭但关键的 PR 需要维护者或作者关注，多数处于 `needs-author-action` 状态，存在停滞风险：

- **PR #9574** `fix(channels): authorize approval responders`（P1，7/31 更新）：将工具审批绑定到具体聊天/房间，并按活动 Peer 解析器验证回复者身份。安全关键，等待作者响应。
- **PR #9002** `fix(gateway): keep agent turns alive after viewer disconnect`（P1，`needs-maintainer-review`）：将 Dashboard WebSocket 视为观察者而非 owner，避免导航/断网时取消 Agent 任务。维护者需尽快评审。
- **PR #9713** `feat(runtime): expose token accounting on history-trim events`（高危，XL 尺寸）：历史修剪通知仅报告结构性计数，误导 Token 预算分析。等待作者响应。
- **PR #9420** `fix(anthropic): support stored OAuth profiles`（XL 尺寸，`needs-author-action`）：为 Anthropic 添加 `auth_mode = "oauth"`，支持存储的 OAuth Profile。大型功能，等待作者更新分支。
- **PR #9839** `feat(security): block direct spellings of irreversible destructive commands`（P1）：在 `allowed_commands` 含 `*` 且 `block_high_risk_commands=false` 时，允许列表的短路逻辑可绕过不可逆命令防护。安全补丁，等待作者响应。

**维护者提示**：大量 P1 级安全与稳定性 PR 卡在 `needs-author-action`，建议在 v0.8.5 冻结期前主动 ping 贡献者，避免关键修复滑出窗口。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

### 1. 今日速览

过去24小时内，PicoClaw 项目活跃度中等偏高：**3 条 Issue** 更新（其中1条新开、2条关闭）与 **9 条 PR** 更新（其中4条待合并、5条已合并/关闭）并行推进。核心进展集中在 **Agent 循环稳定性修复**（#3337）与 **渠道适配层重构**（如 DingTalk、DeltaChat）。值得注意的是，有 5 条 PR 被标记为 [stale] 后关闭，表明维护者对长期未推进的 PR 有清理动作，但同时也有 #3222 这类跨月重构 PR 仍在活跃。

---

### 2. 版本发布

今日无新版本发布。

---

### 3. 项目进展

以下为今日合并/关闭且对项目有实质性影响的 PR：

- **#3270 [CLOSED] feat: add DashScope TTS provider and WeChat audio file sending** — 合并了阿里云 DashScope（百炼）TTS 提供商与微信音频文件发送能力。这是多模态交互的一步，丰富了语音渠道集成。
  https://github.com/sipeed/picoclaw/pull/3270

- **#3271 [CLOSED] chore(providers): update default model names to 2026-07 latest** — 刷新了 9 个提供商的默认模型列表，涉及 OpenAI 至 gpt-5.6 系列、Anthropic 等。此举保证夜间构建对用户开箱即可用，避免模型名过期报错。
  https://github.com/sipeed/picoclaw/pull/3271

- **#3279 [CLOSED] fix(seahorse): prevent tool-call format leakage into LLM summaries** — 修复了 seahorse 的 `partsToReadableContent` 将工具调用格式泄漏进用户消息的同类 bug，增强了输出格式的纯净度。
  https://github.com/sipeed/picoclaw/pull/3279

- **#3283 [CLOSED] fix(dingtalk): support picture/image message inbound** — 为钉钉渠道增加了图片消息接收能力，并完善了 OpenAPI token 缓存，降低了渠道接入的门槛。
  https://github.com/sipeed/picoclaw/pull/3283

整体而言，项目在多模态输入（图片、语音）与渠道适配层面持续微迭代，同时修掉了若干核心数据流污染问题。

---

### 4. 社区热点

- **Issue #3269 [OPEN] MCP server 连接失败导致 chat 界面停止回复** — 获 5 条评论，是今日讨论最活跃的 Issue。用户反馈当 MCP 服务不可达时，Agent 循环直接挂起，聊天界面完全失去响应。已被 PR #3337 针对性修复，目前正在审查中。
  https://github.com/sipeed/picoclaw/issues/3269

- **Issue #3307 [CLOSED] Telegram 渠道缺少会话列表/切换命令** — 用户指出 Web UI 有完整的会话管理功能，而 Telegram 等渠道缺失等价能力，是典型的多渠道功能不对等诉求。
  https://github.com/sipeed/picoclaw/issues/3307

- **Issue #3308 [CLOSED] Code Review：并发安全隐患、goroutine 泄漏及优化建议** — 该 Issue 虽然被标记为 [stale] 并关闭，但早期评论侧面反映了社区对低级硬件上运行 Agent 稳定性的关注。
  https://github.com/sipeed/picoclaw/issues/3308

---

### 5. Bug 与稳定性

按严重程度排列：

1. **严重 — MCP server 连接失败导致 Agent 循环挂死（#3269）**：直接影响用户可用性，已对应 PR #3337（待合并），该 PR 通过捕获 `ensureMCPInitialized` 的错误避免 `AgentLoop.Run` 退出，使聊天界面能继续回复。
   https://github.com/sipeed/picoclaw/issues/3269
   https://github.com/sipeed/picoclaw/pull/3337

2. **普通 — exec 工具忽略 per-run timeout 参数与布尔选项声明错误（#3319）**：当前已提 PR 修复，待合并。
   https://github.com/sipeed/picoclaw/pull/3319

3. **普通 — seahorse summaries 产生 tool-call 格式泄漏（#3279）**：已合并修复，无持续影响。
   https://github.com/sipeed/picoclaw/pull/3279

---

### 6. 功能请求与路线图信号

- **HTTP/多渠道会话管理命令（#3307）**：该 Issue 已因 stale 关闭，但 Telegram 渠道缺少会话切换能力仍是长期缺口，社区有明确呼声，预计后续或将在 CLI/API 层统一实现。
  https://github.com/sipeed/picoclaw/issues/3307

- **可配置的默认模型回退链（#3200，OPEN）**：支持用户设置默认模型及 fallback 顺序，对低端硬件上的稳定性运维有利。该 PR 已开放超一个月，目前仍有更新，值得关注。
  https://github.com/sipeed/picoclaw/pull/3200

- **DashScope TTS 与微信音频发送（#3270，已合并）**：音频能力的引入为后续语音交互、TTS 扩展提供了基础组件，是通往多模态 Agent 的信号。

---

### 7. 用户反馈摘要

- **可靠性优先的痛点**：#3269 的评论核心是「当外部服务（MCP）故障时，整个 Agent 必须优雅降级，而不是静默挂死」。这呼应了用户对 7x24 运行场景的期望。
- **渠道一致性的期望**：#3307 反映了用户希望不同渠道的能力尽量对齐，Web UI 与 Telegram 的体验差异会让部分用户感到割裂。
- **代码质量关注**：#3308 中的 Code Review 建议涉及 goroutine 泄漏与并发安全，虽然被 stale 关闭，但说明部分核心用户已经在深度审阅底层代码并愿意贡献优化建议。

---

### 8. 待处理积压

以下为长时间未合并或未响应的关键 PR/Issue，建议维护者优先评估：

- **PR #3222 [OPEN] refactor(deltachat): cleanup implementation, documentation -200LOC**（创建于 2026-07-03）：重构 DeltaChat 渠道，删减 200 行代码，并改善文档。这是活跃度较高的重构，建议安排 review。
  https://github.com/sipeed/picoclaw/pull/3222

- **PR #3200 [OPEN] feat(models): add configurable default fallback chain**（创建于 2026-07-01）：模型回退链功能，对提升整体可用性有价值，但已积压一个月以上。
  https://github.com/sipeed/picoclaw/pull/3200

- **Issue #3269 [OPEN] MCP 故障挂起**：虽然已有 fix PR #3337，但该 PR 在 24 小时内尚未合并，需防止该严重 bug 进入下一轮 nightly 发布。
  https://github.com/sipeed/picoclaw/issues/3269

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

### 1. 今日速览

NanoClaw 项目今日活跃度较高，主要集中于 Bug 修复与稳定性提升。过去 24 小时内有 2 个新 Issue 提交，11 个 PR 更新，其中 3 个核心团队的内部测试 PR 已关闭（均未合并，符合预期）。目前有 8 个 PR 处于待合并状态，社区贡献者（如 jsboige、glifocat）提出的针对安装脚本、调度器及容器运行时的具体修复方案正在等待维护者审阅。项目核心功能在稳步推进，社区反馈的多个实际使用痛点（如旧版 Node 兼容、指令集兼容）已获得针对性修复响应。

---

### 2. 版本发布

无新版本发布。

---

### 3. 项目进展

今日无功能更新被正式合并，项目进展主要体现在对既有 PR 的持续迭代与验证闭环的完善。

- **签名验证流程闭环测试**：核心团队成员 gavrielc 关闭了 3 个内部测试 PR（[#3242](https://github.com/nanocoai/nanoclaw/pull/3242)、[#3243](https://github.com/nanocoai/nanoclaw/pull/3243)、[#3244](https://github.com/nanocoai/nanoclaw/pull/3244)）。这些 PR 虽未合并，但通过“禁止合并”的实弹演练，成功验证了 `verify-agent-image` 的自动审批工作流（包括独立 cosign 验证和自动评审发布）。其中 [#3243](https://github.com/nanocoai/nanoclaw/pull/3243) 修复了 CI 中“启用自动合并”状态错误决定工作流结论的问题，有助于提高未来自动化合并流程的稳定性与准确性。

---

### 4. 社区热点

今日社区热点集中在**安装与部署环节的兼容性问题**上，这两个问题均与用户环境差异直接相关，讨论度高、反映强烈。

- **[#3245 Prebuilt agent image: Bun binary requires AVX2 — SIGILL on CPUs without it](https://github.com/nanocoai/nanoclaw/issues/3245)**：用户 `sergeykad` 报告，默认安装的预构建镜像在 Intel Tremont/Elkhart Lake（如 Celeron J6413/N5105）等不支持 AVX2 指令集的 CPU 上会直接触发 SIGILL 崩溃。这直接阻断了一部分低功耗/嵌入式设备用户的部署路径，属于严重的兼容性屏障，目前暂无评论，但预计会引发维护者关注。

- **[#3248 [bug] setup.sh's "Node missing or too old" branch cannot handle too old](https://github.com/nanocoai/nanoclaw/issues/3248)**：用户 `glifocat` 提交了 Issue 后立即跟进提交了修复 PR（[#3249](https://github.com/nanocoai/nanoclaw/pull/3249)）。该问题指出 `setup.sh` 在检测到 Node 版本过旧时，会调用 `install-node.sh`，但后者因检测到任意 Node 存在而短路退出，导致无法真正执行安装。这是一个逻辑矛盾问题，对于使用旧版 Node 环境的用户是硬性阻塞。

---

### 5. Bug 与稳定性

今日报告的 Bug 按严重程度排列如下，其中两项为环境兼容性问题，一项为后台运行逻辑问题，均已附带修复 PR。

- **严重：CPU 指令集不兼容导致崩溃** — [#3245](https://github.com/nanocoai/nanoclaw/issues/3245)（Issue）提到，预构建 agent 镜像内的 Bun 二进制依赖 AVX2 指令集，在老旧或低功耗 CPU 上运行时会出现 SIGILL 进程崩溃。此问题影响特定硬件用户的正常部署与运行，目前尚无关联修复 PR，建议维护者评估是否提供低指令集版本的构建产物。

- **中等：安装脚本逻辑缺陷** — [#3248](https://github.com/nanocoai/nanoclaw/issues/3248)（Issue）指出，Node 版本过旧时，`setup.sh` 的后续安装流程无法正确触发。修复 PR [#3249](https://github.com/nanocoai/nanoclaw/pull/3249) 已由 Issue 作者提交，目前处于待合并状态。

- **中等：调度器处理畸形 Cron 表达式时重复报错** — PR [#3247](https://github.com/nanocoai/nanoclaw/pull/3247)（由 jsboige 提交）修复了当 cron 解析器拒绝无效字符串（如 `0 21-5 * * *`）时，系统会在每次扫描时重复报错且不清理错误行的问题。该 PR 建议在记录错误后将问题行标记为失效，避免持续刷错。

- **较低：Windows 下垃圾清理命令失效** — PR [#3246](https://github.com/nanocoai/nanoclaw/pull/3246)（由 jsboige 提交）修复了 `cleanupOrphans()` 在 Windows 上因 POSIX 引号解析问题而静默失效的问题，该修复可确保孤儿容器的清理功能在跨平台场景下正常工作。

---

### 6. 功能请求与路线图信号

今日无新增功能请求。但有两项链接到 PR 的长期进行中的功能开发值得关注，它们可能出现在后续版本中：

- **新增 Dial 通道支持**：贡献者 OmriBenShoham 提交了两条关于 Dial 的 PR（[#3041](https://github.com/nanocoai/nanoclaw/pull/3041) 适配器、[#3050](https://github.com/nanocoai/nanoclaw/pull/3050) 安装向导接入），旨在让 NanoClaw 支持通过 Dial 进行 SMS 与 AI 语音通话。这两条 PR 自 7 月中旬提交以来已更新近一个月，今日仍有内容更新，说明该项功能仍在积极开发中。

---

### 7. 用户反馈摘要

- **部署环境兼容性诉求**：用户针对预构建镜像与安装脚本的兼容性问题（[#3245](https://github.com/nanocoai/nanoclaw/issues/3245)、[#3248](https://github.com/nanocoai/nanoclaw/issues/3248)）反馈明确，体现了社区存在相当比例的非主流环境（低功耗设备、旧版软件依赖）使用者，他们对开箱即用的安装体验有较高要求。
- **社区贡献效率高**：Issue 提交者与修复者紧密联动，`glifocat` 提交 Issue 后随即提交修复方案，表明该项目对用户问题响应速度快，社区参与门槛较低。

---

### 8. 待处理积压

以下为长期未处理或今日处于有待跟进状态的历史重要 PR，提醒维护者关注：

- **[#2427 fix: attachment issues](https://github.com/nanocoai/nanoclaw/pull/2427)**：该 PR 自 5 月 12 日创建，旨在修复附件处理问题，已处于待合并状态近 3 个月，且今日（8 月 14 日）有更新。这提示可能是比较棘手的修复，或是该区块的维护者未能及时跟进。目前已由 PR #2752 覆盖了其中 Discord 的特定场景，此长期存在的 PR 可能涉及更底层的公共逻辑，需要维护者决策其去留。

- **[#2752 fix: stage inbound attachments that expose only a url (Discord)](https://github.com/nanocoai/nanoclaw/pull/2752)**：该 PR 专注于修复 Discord 入站附件（文本或图片）无法被 agent 读取的问题。自 6 月 12 日发起，至今已存在 2 个月且处于待合并状态，今日有活跃更新，建议维护者尽快审阅以解决 Discord 用户的该痛点。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw 项目动态日报 — 2026-08-15

## 今日速览

过去24小时内，NullClaw 项目活跃度较低。Issues 侧完全静默，无新开、无关闭；PR 侧仅有一条合并记录（#986），且该 PR 从创建到合并均在 8月14日 完成，当前无待合并的 PR。没有新版本发布，整体处于日常迭代的间歇期，社区讨论热度不高，但合并的 PR 表明开发工作仍在持续推进。

---

## 版本发布

今日无新版本发布。

---

## 项目进展

**PR #986（已合并）— 使 SQLite 内存数据库路径可配置** [链接](https://github.com/nullclaw/nullclaw/pull/986)

作者：gently-whitesnow｜创建/更新：2026-08-14

- **核心变更**：为 SQLite 后端的内存引擎新增了 `memory.database_path` 配置项，允许用户自定义数据库文件位置。
- **兼容性设计**：当该配置项为空时，保持默认的 `<workspace>/memory.db` 行为不变；相对路径会基于 workspace 解析，同时支持绝对路径，以适配只读 workspace 的部署场景。
- **文档同步**：PR 摘要中明确包含了对新配置项的文档更新。

**评估**：此项变更为部署灵活性带来实质性提升，特别是对容器化或受限文件系统环境下的只读部署有直接帮助。默认行为保持兼容，用户无需迁移。项目在配置可扩展性方面向前迈出了一小步。

---

## 社区热点

今日无讨论活跃的 Issues 或 PR。唯一活跃的 PR #986 未产生评论（评论数为 undefined，点赞为 0），说明该变更属于内部驱动的开发任务，而非社区诉求推动。

---

## Bug 与稳定性

今日无新报告的 Bug、崩溃或回归问题。

---

## 功能请求与路线图信号

今日无用户提出的新功能请求。不过，PR #986 所解决的 "SQLite 路径可配置" 问题，可能源自早期 Issue 或内部对部署灵活性的需求。结合该 PR 的实现思路，可以判断项目对以下场景的重视：

- **只读 Workspace 部署**（支持绝对路径指向外部存储）
- **自定义数据目录**（运维/容器场景下的路径挂载）

这些方向很可能在后续版本中继续深化，例如引入更多存储后端的路径配置。

---

## 用户反馈摘要

今日无有效用户反馈数据。PR #986 无评论，Issues 无更新，暂无法提炼用户痛点或满意度信号。

---

## 待处理积压

当前无长期未响应的重要 Issues 或 PR。今日没有发现需要提醒维护者关注的积压项。

---

**总结**：NullClaw 今日处于低活跃但正常迭代的状态。PR #986 的合并为部署配置带来了实质改进，且保持了向后兼容，项目健康度良好。Issues 侧的无活动无需过度解读，属于正常波动区间。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

### 1. 今日速览

IronClaw 项目今日活跃度极高，核心聚焦于 **v1.3.0 自动化可靠性重构** 与 **QA 缺陷修复**。过去 24 小时内有 25 条 Issue 更新与 46 条 PR 更新，其中自动化相关子任务（#7644-#7647）密集开启，并有 3 个对应实现 PR（#7650、#7651）待合并，表明该史诗已进入密集开发期。同时，QA 团队（8/10-8/16 周期）提交了多个 P2 级联调 Bug（Slack 状态、MP4 上传、扩展权限泄漏），且均已有关联修复 PR，响应迅速。核心开发者（serrrfirat、BenKurrek、henrypark133）贡献占比极高，项目整体处于新功能开发与稳定性加固并行的快车道上。

### 2. 版本发布

过去 24 小时内无新版本发布。但 PR #7663 与 #7657 正致力于将已验证的 `1.2.0` 修复（Windows 文件系统/烟雾测试可靠性、线程索引投影修复、运行时 curl 健康检查）前向移植至主分支，为下一版本铺路。

### 3. 项目进展

今日合并了一批重要 PR，同时开启了多项核心功能的实现分支，推进速度显著：

- **自动化执行核心重构（v1.3.0）**：基于已合入的 #7532（结构化执行规范），今日密集开启了 4 个子任务（#7644 预检、#7645 模型固定、#7646 授权租约、#7647 无投递抑制），并提交了对应实现 PR（#7650、#7651）。这标志着自动化可靠性从"设计"转向"落地"，目标是彻底解决 #6879 中"无人值守运行不可靠"的结构性问题。
- **Unbound-turns 模式切换**：PR #7562（设计 + 一期实现）今日被关闭（已合并），其堆叠 PR #7634（完整切换至 prepared-context turns）目前开放待合并。该变更将彻底改变对话上下文处理方式，是架构层面的重要一步。
- **内存可插拔化**：PR #7661（MCP-backed 内存提供者）今日开放，目标是使外部内存系统（如 Mnesis）可通过配置绑定，而非硬编码工厂分支，标志着项目向模块化生态迈进。
- **ACP Harness 执行器**：PR #7648（实验性）与 Issue #7624（v0 范围定义）同步推进，作为唯一的可插拔循环工作项，为未来多执行器后端奠定基础。
- **文档治理与基础设施**：PR #7655 合入，重新锚定了 Slack/Telegram 集成测试覆盖率门槛至实测值，避免 CI 失效阻碍交付。PR #7378/#7379（doc-truth 契约与 docs-live 发布）仍在推进中，旨在根治文档与发布版本漂移问题。

### 4. 社区热点

今日讨论热度相对分散（评论数未披露），但以下几个 Issue/PR 因其重要性或问题本质而成为焦点：

- **[#6879 Automation runs are hit-or-miss](https://github.com/nearai/ironclaw/issues/6879)**：作为 v1.3.0 的史诗级母题，其引发的 5 个子任务（#7644-#7647）与 2 个 PR 构成了今日最核心的开发线程。背后诉求明确：**小型模型（如 DeepSeek V4 Flash）在无人值守场景下的输出极不稳定，需要结构化的契约（预检、模型固定、明确的无结果抑制）来约束模型行为，而非依赖提示词偶然生效**。
- **[#7660 Slack 显示"Reconnect"/"Finish Setup"](https://github.com/nearai/ironclaw/issues/7660)**：尽管连接正常，UI 状态错误，这是一个典型的 P2 高感知度 Bug，直接影响用户信任。修复已包含在 PR #7666 中（"tell the truth on cards"）。
- **[#7664 可插拔内存](https://github.com/nearai/ironclaw/issues/7664)**：该跟踪 Issue 引出了 PR #7661（MCP-backed provider）。表明社区对集成外部内存系统（Mnesis）有明确需求，且项目已采取"开放合约，配置即绑定"的架构策略响应。

### 5. Bug 与稳定性

今日 QA（Bug Bash 周期）报告了多个 P2 级缺陷，均已附带修复：

- **[P2] [#7660 Slack UI 错误显示 "Reconnect" / "Finish Setup"](https://github.com/nearai/ironclaw/issues/7660)**：尽管连接活跃，UI 状态错误。**修复 PR #7666 已合并**，将改善卡片与安装结果的状态真实性。
- **[P2] [#7662 Telegram MP4 上传失败（attachments.mime_type）](https://github.com/nearai/ironclaw/issues/7662)**：即使识别为 video/mp4 仍报错，属于字段校验或序列化问题，暂无明确关联修复 PR。
- **[P2] [#7659 扩展安装状态跨用户泄漏](https://github.com/nearai/ironclaw/issues/7659)**：当前用户可见其他用户安装的扩展，存在数据隔离风险，暂无明确关联修复 PR。
- **[Telegram 2FA 登录缺陷](#7658 修复 PR 已合入)**：修复了 2FA 账户在迁移数据中心上的 QR 扫描问题，并明确了登录码的到达位置，增强了链接设备流程的引导性。

此前报告的 DOCX 损坏问题（#6869）今日被关闭，但关闭原因需注意——这通常意味着问题以某种方式解决或确认非缺陷，值得关注维护者的关闭注释。

### 6. 功能请求与路线图信号

- **v1.3.0 自动化可靠性增强（明确在路线图内）**：今日开启的 #7644-#7647 是 #6879 的直接子任务，配套 PR #7650/#7651 已提交，确认落地中。关键点在于：新增**确定性无投递结果**（`[SILENT]` 协议）、**预检授权租约**、**模型固定**，这将使自动化执行从"碰运气"变为"工程化"。
- **可插拔内存系统（信号强烈）**：Issue #7664 与 PR #7661 表明，除 `native`/`mem0` 外，以 Mnesis 为代表的外部记忆系统将可通过配置纳入，且 PR 明确要"发布契约"。这是向组件化生态发展的关键信号。
- **大型语言模型提问卡片（#7653）**：受 OMP 启发，为 WebUI 实现结构化的 `ask` 工具（非阻塞门控），将提升交互的规范性，目前为开放状态，暂无关联 PR。
- **WebUI 质感提升**：多个设计系统统一 Issue 开启（#7569 共享搜索框（已关）、#7639 共享反馈横幅、#7637 组件边界类型化、#7638 Toast 替代告警），透露出对前端一致性与可维护性的专注。

### 7. 用户反馈摘要

- **自动化不可靠（对 #6879 的共鸣）**：同类提示词在无人值守下"时好时坏"，尤其在 DeepSeek V4 Flash 等小型模型上更明显。用户诉求是希望系统能**保证**按规则执行，而非依赖模型心情。
- **外部集成引导不足（源自 #7658、#7660 修复）**：用户在连接的 Slack/Telegram 上遇到困惑（状态矛盾、登录码去向不明、MP4 上传失败）。这些反馈传达了对**界面状态真实性与引导清晰性**的明确期待。
- **LLM 模型选择权（#7183，已关闭）**：该功能请求已有关联结果，但令人关注的是它今日被标记为关闭——需确认是实现了，还是因优先级被拒绝。若已实现，这将是重要体验更新。

### 8. 待处理积压

以下为长期开放但今日未见更新的重要工作项，需维护者关注：

- **[PR #7255 APDD 治理框架评估](https://github.com/nearai/ironclaw/pull/7255)**：已开放 9 天，仅文档变更，风险低，可能因优先级问题被搁置。
- **[PR #7456 持久化存储与配置文件解耦](https://github.com/nearai/ironclaw/pull/7456)**：已开放 5 天，涉及 Reborn 体验的根目录重构与安全信封持久化，改动大但风险中等，可能因与 unbound-turns 或 release 1.2 合并冲突而推迟。
- **[PR #7636 shell 工具描述优化](https://github.com/nearai/ironclaw/pull/7636)**：小改动（仅描述字符串），但已开放 1 天，未受影响。
- **[Issue #7667 Telegram 手机模式登录码提示](https://github.com/nearai/ironclaw/issues/7667)**：昨日的实时 QA 问题，但无关联 PR，且该 Issue 本身是开放状态，需尽快明确责任人。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-08-15

## 今日速览

过去 24 小时项目活跃度极高。共发生 2 条 Issue 更新、27 条 PR 更新（22 条已合并/关闭、5 条待合并），并发布 1 个新版本（2026.8.14）。PR 合并/关闭率约 81%（22/27），显示维护与合入流程高效。Release 2026.8.14 包含侧边栏签到与广告轮播、多智能体任务活动过滤等功能，同时侧边栏静态广告横幅永久隐藏功能（PR #2374）仍在评审中，值得关注。

## 版本发布

### LobsterAI 2026.8.14

- **新增：** 侧边栏支持签到与横幅轮播（PR #2411）；侧边栏新增多智能体任务活动过滤（PR #2418）；侧边栏功能持续推进。
- **兼容性与迁移：** 未报告破坏性变更。
- 需注意 UI 文案与字体方面的调整已跟进（见 PR #2497、#2495），建议在升级后检查侧边栏与字体渲染是否符合预期。

## 项目进展

今日合入/关闭了 22 个 PR，涵盖功能、修复与依赖升级。主要包括：

- **OpenClaw 技能管理修复（双 PR 合入）：** PR #2491 与 #2483 修复了技能开关因目录名与 frontmatter name 不一致而静默失效的问题，现统一按 frontmatter name 索引，确保 UI 开关实际生效。
- **侧边栏广告横幅管理：** PR #2374 为设置页新增“永久隐藏侧边栏广告横幅”开关（待合并），解决用户只能临时关闭单条横幅的痛点。
- **技能与连接器体验升级：** Release 2026.8.14（PR #2498）整合了 Team Edition 账户与配额流，并对 Skills 与 Connectors 体验进行了更新，涉及 67 个提交、264 个文件（+24,736/-4,253）。
- **Cowork 会话交互优化：** PR #2499 修复了 turn 在等待答案前被过早折叠的问题，现要求在已产生答案后才折叠，避免空时长误读为失败；PR #2496 修复了 badge 弹层越界问题。
- **部署与依赖升级：** rimraf 5.0.10 → 6.1.3（PR #2460）、vite 5.4.21 → 8.2.1（PR #2465）等依赖更新推进中。

## 社区热点

- **PR #2374（待合并）：** “添加永久隐藏侧边栏广告横幅设置”。该 PR 回应了 Issue #2342 的用户诉求——用户此前只能临时屏蔽单条广告，无法永久关闭。项目方通过设置项正面响应，显示对广告体验与用户控制权的平衡考量，社区关注度较高。

## Bug 与稳定性

按严重程度排列如下：

- **高危：** OpenClaw 技能开关静默失效（PR #2491 / #2483 已修复）。目录名与 frontmatter name 不一致时，UI 开关无效且无提示，影响用户对技能启停的预期，现已合入修复。
- **中危：** 会话 turn 在等待答案时被折叠为空时长线，用户可能误判为运行失败（PR #2499 已修复）。
- **中危：** 会话导出图片与卡片切换 UI 问题（PR #2493 已修复）。
- **低危：** 账户积分图标样式/颜色不一致（PR #2492、#2494 已修复）；Cowork goal 与 steer 文案措辞（PR #2497 已修复）。

## 功能请求与路线图信号

- **广告横幅永久隐藏（PR #2374）：** 用户要求更强的广告控制权，已有实现方案，预计纳入下一版本。
- **侧边栏签到与轮播（Release 2026.8.14）：** 已发布，侧边栏商业化与用户活跃功能持续完善。
- **多智能体任务活动过滤（Release 2026.8.14）：** 已发布，提升多智能体任务管理效率。
- 另一长期开放的功能 PR #1155 “会话内页内搜索（Ctrl+F）” 仍无近期合入迹象，建议关注。

## 用户反馈摘要

- **Issue #1154（测试覆盖诉求）：** 用户指出 `commandSafety.ts` 与 `coworkMemoryJudge.ts` 缺乏测试覆盖，存在“AI 静默执行 `rm -rf`、`git push --force`”或“大量无关内容写入用户记忆”的安全/质量风险，希望补充 Vitest 单元测试。该诉求直指核心安全模块，尽管 Issue 已 stale，仍建议优先排期。
- **Issue #2489：** 用户发帖“快更新v4pro！”，表达对新版本（v4 Pro）上线的急切期待。该 Issue 无实质技术内容，但侧面反映用户对项目迭代速度的关注。
- **Issue #2342（由 PR #2374 回应）：** 用户对无法永久隐藏侧边栏广告表示不满，项目方已给出解决方案并进入评审流程。

## 待处理积压

- **Issue #1154（stale，已开放 4.5 个月）：** 为 `commandSafety` 和 `coworkMemoryJudge` 补充单元测试。涉及安全与记忆质量两个核心模块，缺陷可能造成严重事故，建议尽快安排排期，避免继续沉积。
- **PR #1153（stale，已开放 4.5 个月）：** 修复 `buildOpenAIChatCompletionsURL` 对 Google Gemini `/v1` 路径的拼接错误。该 bug 会导致 Gemini 请求 URL 缺 `/` 分隔符，影响使用 Google Gemini 通道的用户，建议合入验证。
- **PR #1155（stale，已开放 4.5 个月）：** 会话内页内搜索（Ctrl+F）功能，功能完整度高，但长期未合入，建议明确排期或给出结论。
- **PR #1151 / #1228 / #1231（stale）：** 多个 4 月提交的 feature/fix 仍未合入，建议统一 triage。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

## Moltis 项目日报 — 2026-08-15

### 今日速览
项目今日活跃度处于**低位**：过去24小时内无新增 Issue、无版本发布、无 PR 合并或关闭，仅新增2条待合并 PR（#1195、#1190），均由维护者 penso 提交，聚焦于连接器与消息平台原生集成。社区讨论几乎为零（无评论、无赞），整体处于维护者驱动的功能开发阶段，外部贡献者参与度较低。项目健康度整体平稳，但需关注社区互动不足的长期信号。

---

### 版本发布
今日无新版本发布。

---

### 项目进展
今日无 PR 被合并或关闭，暂无功能正式落地。值得关注的是，两条待合并 PR 均处于活跃更新状态，预计将在后续合并中为项目带来显著能力扩展：

- **#1195**（待合并，8月15日更新）：为 Slack 添加原生实时任务卡片（live task cards），支持通道无关的工具生命周期更新，并以不透明 run-ID 保护卡片隐私与权限；失败流将清理终端错误。该 PR 将显著提升聊天平台内的任务可视化能力。
- **#1190**（待合并，8月14日更新）：新增持久化的日历、频道与邮件连接器，含原子快照、调度、投影与本地全文本搜索；支持只读 CalDAV、Gmail、Himalaya v2 等数据源，且不复制凭据。该 PR 是实现跨平台数据接入的基础设施级改动，工程量大，建议重点评审。

> 链接：[PR #1195](https://github.com/moltis-org/moltis/pull/1195) | [PR #1190](https://github.com/moltis-org/moltis/pull/1190)

---

### 社区热点
今日无评论、无点赞、无活跃讨论。两条待合并 PR 为近一周内唯一社区可见的更新，且均来自维护者本人，未引发外部讨论。当前缺乏社区参与信号，难以形成热点。建议维护者在后续合并时主动发布 release notes 并在相关频道引导讨论，以激活社区反馈。

---

### Bug 与稳定性
今日无新增 Bug 报告，无崩溃或回归问题记录。项目稳定性状态良好，暂无需要优先处理的缺陷。

---

### 功能请求与路线图信号
今日无新功能请求提交。但两条待合并 PR 透露出明确的路线图方向：

- **平台原生集成**（#1195）： Slack 原生卡片支持，表明项目正从“纯文本输出”转向“渠道原生体验”，后续可能覆盖 Discord、Teams 等平台。
- **外部数据源接入**（#1190）： CalDAV、Gmail、邮件与频道历史数据的持久化连接器，意味着项目正在向“AI 助手 + 个人数据层”演进，日历、邮件等高频场景优先。

> 以上方向若合并顺利，预计将构成下一版本的核心能力集。

---

### 用户反馈摘要
今日无公开用户评论，无法获取直接用户反馈。结合近一周数据，社区反馈渠道近乎静默，可能存在以下情况：项目仍处早期阶段，用户基数有限；或用户主要通过其他渠道（如内部群组）沟通。建议维护者主动通过 GitHub Discussions 或 Issue 模板引导用户表达使用痛点与期望场景。

---

### 待处理积压
- **PR #1190**（8月11日创建，已3天无新评论）：大型功能 PR，涉及多个新连接器与持久化层，改动面广、评审成本高。目前无 reviewer 被指派，存在长期滞留风险，建议尽快分配 reviewer 并拆分为可合并的小步。见 [PR #1190](https://github.com/moltis-org/moltis/pull/1190)。
- **PR #1195**（8月15日创建，今日更新）：依赖 #1190 的部分基础设施（如通道中立生命周期），建议与 #1190 协同评审，避免合并冲突。见 [PR #1195](https://github.com/moltis-org/moltis/pull/1195)。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw (QwenPaw) 项目动态日报 — 2026-08-15

## 今日速览

截至 2026-08-15，CoPaw 项目过去 24 小时保持较高活跃度：共处理 50 条 Issue 更新（12 条新开/活跃，38 条关闭），41 条 PR 更新（26 条待合并，15 条已合并/关闭），无新版本发布。值得关注的是，大量历史遗留 Issue（创建于 3-7 月）于今天被集中关闭，标志着维护团队正在系统性清理积压问题。在合并的 PR 中，OneBot 渠道入站媒体本地化及插件渠道交互式配置为新增功能亮点。多个 Bug（如 MCP 工具 404、tool result 重复写入、Creator 插件冲突）已有对应修复 PR 在审或已合并，项目整体健康度呈向好趋势，但 26 条待合并 PR 中多条长时间停留（如 #5992、#6302）需要关注。

## 项目进展

今日共 15 条 PR 合入或关闭，以下为关键变更：

- **OneBot 渠道入站媒体本地化**（[#6715](https://github.com/agentscope-ai/QwenPaw/pull/6715)，已关闭）：统一 OneBot 渠道的图片/音视频/文件处理流程至 AgentScope 2.0 本地 `DataBlock` 管线，入站媒体在 Agent 处理前即被解析并下载至受管存储。
- **插件渠道交互式配置**（[#6943](https://github.com/agentscope-ai/QwenPaw/pull/6943)，已关闭）：恢复插件渠道在 CLI 交互式配置流程中的 `get_configurator()` 支持，插件注册的 HTTP 路由可正常加载。
- 另有 #7030/#7031（auto-title-sync、skill-system，因重复提交被关闭并重新提交为 #7032/#7033）、#7029（动态技能加载）、#2105（Whisper 安装文档）等合入贡献。

## 社区热点

### 1. 后台/守护模式缺失问题引发共鸣（[#7010](https://github.com/agentscope-ai/QwenPaw/issues/7010)，6 评论）
用户 `haocaifei` 反馈 `qwenpaw app` 缺少真正的后台运行能力，通过 SSH 或无头服务器启动时命令一直挂住、无法返回。该问题表达了远程部署与无人值守运行场景的真实需求，评论区有运维场景用户加码。

### 2. QwenPaw Creator 插件导致所有插件失效（[#7025](https://github.com/agentscope-ai/QwenPaw/issues/7025)，4 评论，新开）
用户 `cmhaoso` 报告安装 Creator 插件后全部插件不可用，并附截图和日志。可能与 [#6806](https://github.com/agentscope-ai/QwenPaw/issues/6806)（Windows 下无法保存模型配置）同源，提示 Creator 插件在配置持久化/侧载机制上可能存在回归。

### 3. MCP 工具 404 问题反复出现（[#6405](https://github.com/agentscope-ai/QwenPaw/issues/6405)，6 评论，已关闭）
升级 2.0 后 `[mcp-key]__[tool_name]` 格式的工具名总提示 "Tool notfound"，与今日新开的[#7016](https://github.com/agentscope-ai/QwenPaw/issues/7016)（工具调用 404）高度相似。

## Bug 与稳定性

| 严重程度 | Issue | 状态 | 修复 PR |
|---------|-------|------|---------|
| 高 | [#7025](https://github.com/agentscope-ai/QwenPaw/issues/7025) Creator 插件安装后所有插件失效 | OPEN | 暂无，建议优先排查 |
| 高 | [#6806](https://github.com/agentscope-ai/QwenPaw/issues/6806) Windows 下 Creator 插件保存模型配置报 Internal Server Error | CLOSED | 暂无 |
| 中 | [#7011](https://github.com/agentscope-ai/QwenPaw/issues/7011) Console 停止请求误取消飞书会话（多 UI 会话场景） | OPEN | 暂无，涉及会话身份隔离需从架构层面修复 |
| 中 | [#6958](https://github.com/agentscope-ai/QwenPaw/issues/6958) FastMCP 返回结构化数据时 tool result 文件写入两份重复数据 | OPEN | [#6969](https://github.com/agentscope-ai/QwenPaw/pull/6969) 已提交修复，合入中 |
| 中 | [#7016](https://github.com/agentscope-ai/QwenPaw/issues/7016) 流式会话工具调用 404 | OPEN | 暂无，疑似与 2.1.0 会话路由变更相关 |
| 低 | [#6972](https://github.com/agentscope-ai/QwenPaw/issues/6972) Chrome 扩展 WebSocket 连接在发送 `tab.create` 命令时断开 | CLOSED | 已有修复 |
| 低 | [#7040](https://github.com/agentscope-ai/QwenPaw/issues/7040) UI 文案错误 "Stopp Running" | CLOSED | 已修复（invalid） |

## 功能请求与路线图信号

- **动态技能生命周期管理**：[#7033](https://github.com/agentscope-ai/QwenPaw/pull/7033) 引入技能热加载/自动卸载/状态检查工具链，支持运行时管理。该 PR 响应了此前社区对技能市场（[#2418](https://github.com/agentscope-ai/QwenPaw/issues/2418)）的诉求，可能随 v2.1.x 进入主线。
- **会话拆分与单条消息删除**：[#4436](https://github.com/agentscope-ai/QwenPaw/issues/4436)（部分对话转移至新会话）、[#4001](https://github.com/agentscope-ai/QwenPaw/issues/4001)（手动删除单条消息）仍为 OPEN，两者均为高频体验优化，可能与 #7035（子代理会话分组）形成系列会话管理改进。
- **per-session 模型覆盖**：[#5992](https://github.com/agentscope-ai/QwenPaw/pull/5992) 已停留逾一个月，但该能力可缓解 [#2763](https://github.com/agentscope-ai/QwenPaw/issues/2763)（对话内切换模型）、[#2314](https://github.com/agentscope-ai/QwenPaw/issues/2314)（provider 无关对话历史）等长期需求。
- **零配置本地模型**：[#6433](https://github.com/agentscope-ai/QwenPaw/issues/6433) 提出应用内下载/运行 GGUF 模型，目前仅 1 条评论，但若 [#6302](https://github.com/agentscope-ai/QwenPaw/pull/6302)（provider 目录化统一）合入，二者可能协同演进。

## 用户反馈摘要

- **正面**：#6951（scroll 压缩后聊天记录不可见）已被关闭，表明上下文压缩后用户可见记录得以保留；#6819 在今日进入关闭列表，渠道工具的批准提示问题获得修正。
- **负面**：多个用户在 Windows 客户端更新流程上表达不满（#2846、#3464），卸载重装式更新体验差。另有用户抱怨模型自动获取不可用（#3045）。
- **公开批评**：#7040 点出 UI 文案错别字问题，虽为小问题但影响成品观感。
- **多用户验证**：`MCP 工具找不到` 类问题（#6405）在升级 2.0 后反复出现，提醒版本兼容性测试需加强。

## 待处理积压

以下问题长期存在但未获维护者响应，建议优先关注：

- **[#2418](https://github.com/agentscope-ai/QwenPaw/issues/2418)**（3 月创建，已关闭）：Skills Hub 管理页面请求，社区呼声高但今日才关闭，未确认是否纳入路线图。
- **[#2846](https://github.com/agentscope-ai/QwenPaw/issues/2846)**（4 月创建，已关闭）：Windows 自动更新 + 任务栏图标问题，两个反馈均在今日关闭，但未见对应 PR。
- **[#6405](https://github.com/agentscope-ai/QwenPaw/issues/6405)**（7 月创建，已关闭）：MCP 工具 404，虽已关闭但今日新开的 #7016 表明此问题在 2.1.0 仍存在。
- **[#4731](https://github.com/agentscope-ai/QwenPaw/issues/4731)**（5 月创建，已关闭）：Edge 退出码 21 导致浏览器启动失败，已关闭但无修复记录。
- **[#5992](https://github.com/agentscope-ai/QwenPaw/pull/5992)**：per-session 模型覆盖 PR 已停留 1 个多月（last update 08-14），需要维护者明确合入意向或给出反馈。

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