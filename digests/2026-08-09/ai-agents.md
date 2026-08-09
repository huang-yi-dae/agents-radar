# OpenClaw 生态日报 2026-08-09

> Issues: 500 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-08-09 01:23 UTC

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

# OpenClaw 项目动态日报 — 2026-08-09

## 今日速览

过去 24 小时项目保持高活跃度：共处理 500 条 Issues（新开/活跃 449 条，关闭 51 条）和 500 条 PRs（待合并 314 条，已合并/关闭 186 条），并发布 2 个新版本（v2026.6.34、v2026.6.33）。值得关注的是，尽管整体吞吐量大，但关闭/合并比例偏低（Issue 约 10%，PR 约 37%），且大量 Issue 带有 `clawsweeper:needs-maintainer-review` 和 `needs-product-decision` 标签，表明维护者审阅与决策环节存在一定积压。同时，多个 P0/P1 级别的稳定性问题（内存泄漏、启动失败回归、崩溃循环）仍在持续活跃，建议维护团队优先调配资源处理。

## 版本发布

### v2026.6.34
- **发布时间**：2026-08-09
- **核心内容**：
  - **更安全的浏览器与网络边界**：新增沙箱浏览器路由、可信 DNS 目标、自定义浏览器来源以及 loopback 提供商端点，现在会拒绝不安全的访问路径。涉及 PRs：[#97958](https://github.com/openclaw/openclaw/pull/97958)、[#38290](https://github.com/openclaw/openclaw/pull/38290)、[#103075](https://github.com/openclaw/openclaw/pull/103075)、[#110693](https://github.com/openclaw/openclaw/pull/110693)。
- **致谢贡献者**：@eleqtrizit、@brunowowk、@mosidevv、@pgondhi987 等。
- **迁移注意事项**：本次更新涉及网络边界安全策略收紧，如用户配置了自定义 DNS 或浏览器来源，请确认相关域名/端点已被新策略允许，避免服务被误拦截。

### v2026.6.33
- **发布时间**：2026-08-09
- **核心内容**：
  - **更安全的网络与机密边界**：提供商流、Discord REST 响应、浏览器抓取、OAuth 路径和日志现在会限制恶意响应大小，并将 Telegram 凭据从诊断信息中排除。涉及 PRs：[#96989](https://github.com/openclaw/openclaw/pull/96989)、[#95412](https://github.com/openclaw/openclaw/pull/95412)、[#99428](https://github.com/openclaw/openclaw/pull/99428)。
- **致谢贡献者**：@wangmiao0668000666、@Alix-007 等。
- **迁移注意事项**：日志中不再包含 Telegram 凭据，依赖日志排查认证问题的用户需调整排查方式。

## 项目进展

过去 24 小时共有 186 条 PR 被合并或关闭，以下为值得关注的重要变化：

- [#120716](https://github.com/openclaw/openclaw/pull/120716) **[已关闭]** `refactor: one code path behind doctor legacy-state migrations` — 将 Doctor 中两套并行的旧状态迁移机制统一为单一代码路径，消除通道插件声明方式的歧义，降低维护成本。
- [#120800](https://github.com/openclaw/openclaw/pull/120800) **[已关闭]** `fix(telegram): acquire polling queue before starting worker` — 修复 Telegram 轮询后台任务在队列初始化失败时仍存活的问题，避免资源泄漏。
- [#115465](https://github.com/openclaw/openclaw/pull/115465) **[已关闭]** `fix(google): reject malformed video operation JSON` — 修复 Google 视频生成 REST 操作响应中畸形 JSON 可能泄漏原始解析错误的问题。
- [#119879](https://github.com/openclaw/openclaw/pull/119879) **[已关闭]** `fix(cron): reject blank --agent/--session-key on cron edit` — 修复 cron 编辑时接受空白参数的问题，并已处理 ClawSweeper 的审阅意见。
- [#120798](https://github.com/openclaw/openclaw/pull/120798) **[已关闭]** `fix(test): gate long-context live shard by opt-in` — 修复 release 配置文件错误选择需要环境变量才能运行的测试导致报告失败的问题。
- [#120700](https://github.com/openclaw/openclaw/pull/120700) **[已关闭]** `ci: extend watchdog for cold migration proofs` — 延长冷启动迁移证明的 CI 看门狗超时时间，避免合法任务被误杀。
- [#120227](https://github.com/openclaw/openclaw/pull/120227) **[已关闭]** `fix: scope embedded-run session ownership by derived agent` — 修复插件调用 `runEmbeddedAgent()` 时因无法解析 SQLite session scope 而失败的问题。

上述合并内容显示项目正在系统性地加固网络/安全边界、修复通道稳定性问题并优化内部架构。安全加固是本阶段的主线。

## 社区热点

- [#116277](https://github.com/openclaw/openclaw/issues/116277) **[已关闭]** DeepSeek v4 Flash 静默回复失败（179 条评论）— 用户报告模型生成回复时静默失败并回退到通用错误消息。该问题虽已关闭，但 179 条评论表明事件影响范围较大。核心诉求：**模型静默失败缺少根因诊断与告警机制**，用户希望 OpenClaw 能区分"模型未生成"与"回复投递失败"。
- [#7707](https://github.com/openclaw/openclaw/issues/7707) **[开放中]** 内存信任标签功能请求（31 条评论）— 用户建议按来源（用户命令、网页抓取、第三方技能）为代理内存条目标记信任等级，以防范通过不可信内容进行的记忆投毒攻击。该 Issue 已活跃超过 6 个月仍无定论，涉及安全审查与产品决策。
- [#44925](https://github.com/openclaw/openclaw/issues/44925) **[开放中]** 子代理完成静默丢失（24 条评论）— 多个失败模式下子代理结果静默丢失，无重试、无通知、无自动重启。用户对"静默失败"体验强烈不满。
- [#91588](https://github.com/openclaw/openclaw/issues/91588) **[开放中]** 网关内存泄漏导致 OOM 崩溃（22 条评论）— RSS 从 350MB 增长至 15.5GB，导致反复崩溃。社区高度关注该 P0 问题。
- [#120716](https://github.com/openclaw/openclaw/pull/120716) Doctor 旧状态迁移重构 — 作为大规模重构 PR，获得大量关注。

**热点诉求分析**：今日热点集中在"**静默失败**"这一主题上——无论是模型回复、子代理完成还是 cron 任务，当失败发生时用户得不到明确通知和可操作的诊断信息。其次，**内存泄漏与稳定性**问题持续引发讨论。

## Bug 与稳定性

以下为过去 24 小时活跃的高优先级 Bug，按严重程度排列：

| 严重程度 | Issue | 问题描述 | Fix PR 状态 |
|---------|-------|---------|-------------|
| P0 | [#91588](https://github.com/openclaw/openclaw/issues/91588) | 网关内存泄漏，RSS 从 350MB 增长至 15.5GB 导致 OOM 崩溃 | 无 |
| P0 | [#108435](https://github.com/openclaw/openclaw/issues/108435) | 升级至 2026.7.1 后网关无法启动（回归） | 无 |
| P0 | [#112395](https://github.com/openclaw/openclaw/issues/112395) | 从 6.11 升级至 7.1 后启动迁移预检阻塞网关 | 无 |
| P0 | [#106231](https://github.com/openclaw/openclaw/issues/106231) | 循环检测阻止 exec 但未终止卡住的代理运行 | 无 |
| P1 | [#96834](https://github.com/openclaw/openclaw/issues/96834) | WhatsApp 1:1 入站图片阻塞主通道约 3 分钟 | 无 |
| P1 | [#86215](https://github.com/openclaw/openclaw/issues/86215) | Codex OAuth 刷新失败可能卡住代理数小时 | 无 |
| P1 | [#92076](https://github.com/openclaw/openclaw/issues/92076) | 子代理完成投递在请求者会话不活跃时失败 | 无 |
| P1 | [#103231](https://github.com/openclaw/openclaw/issues/103231) | `claude-cli` 后端的 `ownsNativeCompaction` 假设不成立，会话无限增长 | 无 |
| P1 | [#114020](https://github.com/openclaw/openclaw/issues/114020) | 升级至 2026.7.2-beta.4 后飞书/Telegram 通道分发失败 | [PR #120443](https://github.com/openclaw/openclaw/pull/120443) 相关修复进行中 |
| P1 | [#119971](https://github.com/openclaw/openclaw/issues/119971) | 自动压缩返回 no-op 未发出原生请求 | [PR #120443](https://github.com/openclaw/openclaw/pull/120443) 修复中 |
| P1 | [#84583](https://github.com/openclaw/openclaw/issues/84583) | cron 播报投递触发 EmbeddedAttemptSessionTakeoverError | 无 |
| P1 | [#87109](https://github.com/openclaw/openclaw/issues/87109) | macOS 上网关堆内存空闲状态增长至 1073MB+，cron 静默失败 | 无 |

**稳定性评估**：当前存在 3 个 P0 级问题（内存泄漏、启动回归 ×2），其中内存泄漏问题已活跃 2 个月仍未解决，属于持续影响用户的关键缺陷。此外 P1 级 message-loss / session-state 类问题占比较高，反映出消息投递与会话管理链路是当前稳定性短板。

## 功能请求与路线图信号

以下为今日活跃的功能请求，结合 PR 状态判断其纳入下一版本的可能性：

| 功能请求 | Issue | 当前状态 | 路线图信号 |
|---------|-------|---------|------------|
| 内存信任标签 | [#7707](https://github.com/openclaw/openclaw/issues/7707) | 开放中，需安全审查 + 产品决策 | 已有相关安全加固 PR 合入，但该功能仍需产品决策，**近期纳入可能性中等** |
| 主题会话族 | [#90916](https://github.com/openclaw/openclaw/issues/90916) | 开放中，需产品决策 | 涉及核心会话模型变更，**短期纳入可能性低** |
| 

---

## 横向生态对比

# 个人 AI 智能体开源生态横向分析日报 — 2026-08-09

---

## 1. 生态全景

个人 AI 智能体开源生态正处于"规模扩张与稳定性阵痛并存"的阶段。以 OpenClaw 为绝对核心（日处理 500 条 Issue + 500 条 PR），生态内部已形成清晰的分层：头部项目（OpenClaw、NanoBot、Zeroclaw）在安全加固、Token 可观测性、静默失败治理等方向密集投入，而腰部项目（CoPaw、IronClaw）正经历架构迁移或 Beta 版本回归的集中爆发。跨项目反复出现的共同主题——**静默失败、内存泄漏、MCP 稳定性、Token 成本可观测性**——表明生态已从"功能堆叠"阶段进入"可靠性治理"阶段，用户对智能体的核心诉求正从"能做"转向"可信"。

---

## 2. 各项目活跃度对比

| 项目 | Issues（新开/活跃） | PRs（待合并） | PRs（合并/关闭） | 版本发布 | 健康度评估 |
|------|-------------------|-------------|-----------------|---------|-----------|
| **OpenClaw** | 449 活跃，51 关闭 | 314 | 186 | v2026.6.33, v2026.6.34 | 🟡 吞吐量极大，但维护者审阅积压，3 个 P0 未解 |
| **NanoBot** | 5 新开 | 5 | 4 | 无 | 🟢 Issue 响应快，问题-修复闭环短（Token 追踪 3 天闭环） |
| **Zeroclaw** | 48 活跃，2 关闭 | 48 | 2 | 无 | 🟡 安全审计积压（同一批次多个 P1），S0 级 Matrix 发现缺陷新开 |
| **PicoClaw** | 3 更新 | 4（含 2 个逾期） | 0 | 无 | 🟡 修复 PR 已提交但合并停滞，WhatsApp 通道不可用 |
| **NanoClaw** | 8 新开 | 6 | 3 | 无 | 🟡 Discord 审批高危 Bug 已修复待合并，Signal 附件问题积压 3 个月 |
| **NullClaw** | — | — | — | — | ⚪ 无活动 |
| **IronClaw** | 6 活跃，24 关闭 | 18 | 32 | 无 | 🟢 Reborn 迁移收敛，新功能密集合入，社区贡献活跃 |
| **LobsterAI** | 1 新开 | 3 | 1 | 无 | 🟡 活跃度低，4 个月 PR 未合并，stale 标记普遍 |
| **TinyClaw** | — | — | — | — | ⚪ 无活动 |
| **Moltis** | 1 新开，1 关闭 | 0 | 1 | 无 | 🟢 积压清理完毕，长期 Docker 沙箱 Bug 修复合入 |
| **CoPaw** | 19 活跃 | 50 | 0（3 关闭未合并） | 无 | 🟡 Beta 回归密集但响应快，多处修复已就绪待合并 |
| **ZeptoClaw** | — | — | — | — | ⚪ 无活动 |
| **EasyClaw** | 0 | 0 | 3 | v1.8.88–v1.8.92（5 个） | 🟢 零积压、密集发布、迁移平滑，唯一需关注 macOS 签名问题 |

---

## 3. OpenClaw 在生态中的定位

OpenClaw 是生态的**基础设施层与事实标准**。其日处理 500 条 Issue + 500 条 PR 的吞吐量，较第二名 Zeroclaw（48 Issue + 48 PR）高出一个数量级。技术路线上，OpenClaw 采用"gateway 统一入口 + 通道插件 + 沙箱浏览器"的架构，当前正系统性收紧网络与机密边界（v2026.6.33/34 连续两个版本聚焦安全加固）。与同类相比：

- **优势**：通道覆盖最广（Telegram / WhatsApp / Discord / 飞书 / cron 等）、版本迭代节奏最快（日更）、社区贡献者规模最大；
- **劣势**：维护者审阅瓶颈明显（仅约 10% Issue 和 37% PR 被关闭），P0 级内存泄漏问题已活跃 2 个月未解，反映出"吞吐量越大、稳定性欠债越深"的规模困境。

生态中其他项目多定位为"轻量替代"或"垂直场景优化"：NanoBot 以 5 条 Issue 级别的体量追求极简部署；EasyClaw 作为桌面端封装层跟随 OpenClaw 上游版本；IronClaw 与 Zeroclaw 则在架构现代性（Rust 重写 / Reborn 迁移）上与 OpenClaw 形成差异化竞争。

---

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|---------|---------|----------|
| **静默失败治理** | OpenClaw（模型回复、子代理、cron）、Zeroclaw（cron 输出静默丢弃）、NanoClaw（附件静默丢失） | 失败时需明确通知 + 可操作的诊断信息，而非仅记录日志；区分"未生成"与"投递失败" |
| **Token 消耗可观测性** | NanoBot（2 小时烧百万 Token）、IronClaw（预估错误）、Zeroclaw（成本上报恒为 $0）、PicoClaw（前缀缓存失效） | 需按迭代/调用粒度记录 Token 消耗，前端可视化展示，支持成本预算触发 |
| **MCP 生态成熟度** | NanoBot（HTTP 530 导致崩溃、OAuth 支持）、NanoClaw（远程 MCP 已合并）、CoPaw（MCP 断连永久阻塞对话）、Zeroclaw（stdio 僵尸进程） | 故障隔离、OAuth 网页授权、Schema 预算控制、连接超时配置 |
| **会话/消息可靠性** | OpenClaw（子代理结果丢失、升级后分发失败）、CoPaw（推理模型 reasoning_content 传递失败）、NanoClaw（SQLite 锁竞争） | 会话状态持久化、跨通道一致性、消息不丢失不重复 |
| **安全与权限边界** | OpenClaw（内存信任标签）、Zeroclaw（路径权限失效、紧急停止无效、审批人验证）、IronClaw（SafetyLayer 无调用者）、CoPaw（审批项可读性） | 来源可信度分级、配置即代码、审批流程需兼顾安全与效率 |

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构关键差异 |
|------|---------|---------|-----------------|
| **OpenClaw** | 全功能自主智能体（通道、技能、cron、沙箱） | 开发者 / 重度自托管用户 | Node.js + 网关 + 沙箱浏览器；通道插件化，生态最丰富 |
| **EasyClaw** | OpenClaw 桌面端封装（RivonClaw/TK Copilot） | 非技术用户 / macOS 桌面场景 | 桌面应用 + 内置 runtime + 自动迁移，跟随上游版本 pin 策略 |
| **Zeroclaw** | Rust 高性能实现，强调安全审计与硬件整合 | 安全敏感型 / 嵌入式开发者 | Rust 全栈，SOP 无头执行，硬件 crate 整合（aardvark-sys → zeroclaw-hardware） |
| **IronClaw** | 架构现代化（Reborn 迁移）与 Web Push / Debug Inspector | 企业级 / 架构演进关注者 | "run as invoker"主体模型、技能由模型自主选择（非关键词打分）、Gate 审计 |
| **NanoBot** | 轻量部署 + Token 可观测性 | 个人用户 / 资源受限环境 | 后端记录 + WebUI 展示的 Token 诊断链路；MCP 支持但稳定性待加固 |
| **NanoClaw** | 多平台渠道扩展（Mattermost、远程 MCP、Strava） | 多渠道社群运营者 | OpenAI 兼容端点 + 远程 MCP 联合类型；渠道按 ChannelAdapter/channel-registry 新架构重写 |
| **CoPaw** | 多提供商兼容（火山引擎、小米 MiMo）与模型故障转移 | 国内云服务/多模型用户 | 冷却机制实现模型 fallback；Responses prompt caching；桌面端支持（Whisper/Windows 安装器） |
| **PicoClaw** | 嵌入式 / 特定通道优化（IRC、WhatsApp、Simplex） | 小众渠道用户 | 依赖升级响应快（whatsmeow），前缀缓存位置调优以省 Token |
| **LobsterAI** | LiteLLM 网关聚合（100+ 供应商） | 多供应商切换需求者 | OpenAI 兼容处理器复用，低侵入扩展 |
| **Moltis** | 沙箱一致性（Docker/Apple Container） | 多沙箱后端 / macOS 开发者 | 沙箱文件操作回退逻辑 + 跨平台回归测试 |

---

## 6. 社区热度与成熟度

**第一梯队 — 高吞吐 / 快速迭代（每日合并 20+ PR）**
- OpenClaw（日合并 186 条 PR）、IronClaw（32 条）、CoPaw（50 条 PR 在途）

**第二梯队 — 中活跃 / 功能推进（日均合并 1–10 条 PR）**
- NanoBot（4 条）、NanoClaw（3 条）、EasyClaw（3 条）、Zeroclaw（2 条）

**第三梯队 — 低活跃 / 维护期**
- PicoClaw（修复 PR 等待合并）、Moltis（积压清理）、LobsterAI（4 个月无合并）

**阶段判断：**

- **快速迭代期**：OpenClaw、IronClaw、CoPaw、EasyClaw — 版本密集、新功能持续合入，但同时面临回归风险。
- **质量巩固期**：NanoBot、Moltis、Zeroclaw — 问题修复与安全审计为主，版本节奏放慢，侧重收敛。
- **风险信号**：PicoClaw（WhatsApp 通道不可用但修复 PR 未合并）、LobsterAI（stale 堆积可能流失贡献者）、NanoClaw（Signal 附件 3 个月未响应）。

---

## 7. 值得关注的趋势信号

1. **"静默失败"已成为生态公敌**：从 OpenClaw 的模型回复丢失到 Zeroclaw 的 cron 输出丢弃，再到 NanoClaw 的附件静默过滤，用户对任何形式的"无感知失败"零容忍。**开发者启示**：智能体框架应将"可观测性"内建为一等公民，每个失败路径都应有显式告警与诊断上下文。

2. **Token 成本可观测性从"可选"变为"刚需"**：NanoBot 的 Token 追踪从 Issue 到 PR 合并仅用 3 天，说明社区对成本焦虑已到临界点。**开发者启示**：按迭代/调用粒度的 Token 计量 + 前端可视化，将成为智能体应用的默认必备功能。

3. **MCP 正从"配置即用"走向"生命周期管理"**：多个项目同时出现 MCP 连接失败崩溃、OAuth 授权缺失、Schema 预算控制需求，说明 MCP 生态已越过"能否接入"阶段，进入"可靠性、安全性、资源效率"的深水区。**开发者启示**：MCP 客户端需内置超时、故障隔离、OAuth 流与 Schema 裁剪，否则将拖累宿主应用稳定性。

4. **安全机制正在从"外围防护"下沉到"行为语义"**：OpenClaw 的内存信任标签、Zeroclaw 的紧急停止状态文件失效、IronClaw 的 SafetyLayer 无调用者，共同指向一个事实：安全不能是"文档中的数据流"，必须是运行时强制执行的行为约束。**开发者启示**：权限检查、审批验证与安全策略需有明确的执行路径和测试覆盖，否则将形同虚设。

5. **架构迁移成为双刃剑**：IronClaw 的 Reborn 迁移通过批量关闭追踪 Issue 完成收敛，而 CoPaw 的 v2.1.0-beta 则因迁移引入多处回归（MCP、内存压缩、前端 CPU）。**开发者启示**：大版本重构需配套迁移工具（IronClaw #6939）与回归测试门禁，否则用户切换成本与稳定性损耗将抵消架构收益。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报

**日期：2026-08-09** | **数据窗口：过去 24 小时**


## 今日速览

过去 24 小时 NanoBot 社区活跃度较高：共产生 5 条 Issue（全部处于开放状态）和 9 条 PR（其中 4 条已合并/关闭，5 条待合并）。今日最显著的趋势是 **Token 消耗可观测性**成为社区核心诉求——既有用户报告"每小时烧掉大量 Token"的痛点 Issue（#5266），也有对应的 PR（#5293、#5299）在同日提交并合并，形成快速的"问题-响应"闭环。此外，MCP 相关议题占据相当比例（2 个 Issue、1 个 PR），涵盖 OAuth 网页授权与连接失败崩溃两个维度，显示 MCP 生态的成熟度正在成为用户关注焦点。整体项目健康度良好，Issue 响应速度较快，但需注意"待合并 PR 堆积"（5 个）和"MCP 崩溃 Bug"的潜在影响。


## 版本发布

**无新版本发布**。当前合并的 PR 尚未形成新的 release tag，相关功能更新需等待下一个版本周期。


## 项目进展

今日合并/关闭了 4 个 PR，核心进展集中在 **Token 使用可观测性**与 **WebUI 体验优化**：

- **feat(usage): log per-iteration token diagnostics**（#5293，已合并）— 针对 Issue #5266 的直接响应。此前方按日聚合统计 Token 消耗，难以定位具体是哪个 agent 执行产生了异常消耗；此 PR 在每次迭代粒度记录 Token 诊断信息，为定位 Token 烧损问题提供了数据基础。

- **feat(webui): show recent token usage details**（#5299，已合并，与 #5293 联动）— 在前端展示最近一次调用的 input/output/cached Token 明细，使用户能直接在界面上看到每次调用的消耗。两个 PR 一前一后形成完整链路：后端记录 + 前端展示。

- **fix(webui): prevent image hover clipping**（#5294，已合并）— 修复了图片悬停缩放/光晕导致容器裁剪图片边缘的视觉问题，保留缩放光标、静态边框和键盘焦点环，并补充回归测试。属于 WebUI 体验打磨类修复。

- **refactor: remove verified dead code**（#5296，已合并）— 清理了 19 个代码库内部死代码单元、11 个仅测试可达的测试桩，同时保留了 6 个需要兼容性决策的 API 敏感单元。该 PR 降低了维护成本，但需注意其 "test-only seams" 的移除是否会影响测试覆盖率。

**待合并 PR 中值得关注**：#5271（修复后台任务在会话清理后覆盖数据的竞态）、#5206（修复流式响应重复日志）、#4276（跨模型通用计算机操作工具，已悬置 2 个月）。


## 社区热点

1. **#5266 - Token 消耗追踪需求**（评论 13 条，创建于 2026-08-06，活跃至今）
   - 链接：https://github.com/HKUDS/nanobot/issues/5266
   - 用户报告 nanobot 在无明显用户活动的情况下 2 小时内消耗了约百万级 Token，要求提供每次调用的 Token 消耗日志。此 Issue 获得了今日最多的评论数，并直接催生了 #5293 和 #5299 两个 PR 的提交与合并，是今日社区驱动开发的典型案例。

2. **#5295 - Docker Compose 部署权限错误**（评论 2 条）
   - 链接：https://github.com/HKUDS/nanobot/issues/5295
   - 用户按官方文档部署时遇到 `cannot open /usr/local/bin/entrypoint.sh: Permission denied` 错误，导致网关容器反复重启。属于部署路径的阻塞性问题，评论数较少但影响面可能较大。

3. **#5297 - MCP OAuth 网页授权需求**（评论 2 条）
   - 链接：https://github.com/HKUDS/nanobot/issues/5297
   - 用户希望支持需要通过网页授权才能使用的 MCP 服务（如 XMind 的 MCP），因为目前无法在 nanobot 中完成配置。这反映出 MCP 生态系统正从"纯 API Key"模式向"OAuth 授权"模式演进。


## Bug 与稳定性

按严重程度排列：

| 严重度 | Issue | 描述 | 状态 |
|--------|-------|------|------|
| **高** | #5300 - [MCP 连接失败引发进程崩溃] | 远程 MCP 返回 HTTP 530 时，anyio cancel scope 跨任务崩溃导致网关崩溃/卡死、任务泄漏、CPU 飙升 | **无 fix PR** |
| **高** | #5295 - [Docker Compose 部署失败] | entrypoint.sh 权限拒绝导致容器无法启动 | **无 fix PR** |
| **中** | #5271 - [后台任务覆盖会话数据]（PR） | `/new` 后旧后台任务可能保存过期会话数据，属于数据一致性问题 | 已有 fix PR 待合并 |
| **低** | #5206 - [流式响应重复日志]（PR） | 流式消息产生重复的 "Response to" 日志行，纯日志噪音问题 | 已有 fix PR 待合并 |

**需特别关注 #5300**：这是今日报告的严重程度最高的 Bug——MCP 连接失败的异常处理路径本身存在缺陷，导致"故障处理"变成"进程崩溃"。且该 Issue 与 #5297 同属 MCP 领域，说明 MCP 的稳定性和功能完整性都存在缺口。目前没有任何 fix PR，建议维护者优先关注。


## 功能请求与路线图信号

| 功能请求 | 来源 | 现有 PR / 证据 | 可能纳入的版本 |
|----------|------|----------------|----------------|
| **Token 使用明细日志** | #5266 - 用户要求追踪单次调用的 Token 消耗 | ✅ 已有 #5293 + #5299 已合并 | 下一版本大概率纳入 |
| **MCP OAuth 网页授权** | #5297 - 支持 XMind 等需网页授权的 MCP 服务 | ❌ 无对应 PR | 路线图暂不确定，但需求真实存在 |
| **MCP Schema 预算控制** | #5298 - 减少大型 MCP 工具集对上下文的占用 | ❌ 无对应 PR，但 #4276（computer use）已悬置 2 个月 | 短期概率低，长期方向正确 |
| **计算机使用工具（computer_use + browser）** | PR #4276（6 月 10 日提交，仍在开放） | ✅ 已有完整实现，等待 review | 取决于维护者对其安全性和架构的评估 |
| **矩阵房间级回复关联** | PR #5292（今日新提交） | ✅ 功能完整，修复回复不关联的问题 | 待合并后纳入 |

**综合判断**：Token 可观测性已通过 PR 合并基本敲定进入下一版本。MCP 功能增强（OAuth + 稳定性）是当前社区呼声最高的方向，但尚无对应的代码实现，建议维护者在路线图中同步响应。


## 用户反馈摘要

来自今日 Issues 评论的真实声音：

1. **Token 消耗焦虑**（#5266）：用户描述"2 小时烧掉约百万 Token，且没有任何用户可感知的活动"，这并非偶发而是常态——说明 nanobot 的默认行为（可能是自动重试、后台任务等）可能在持续产生 Token 消耗，用户对此有强烈的不可控感。评论区的讨论还涉及"哪些调用在消耗 Token""是否有可能在后台循环重试"等追问，但原 Issue 的"无用户可感知的活动"描述可能不够严谨。

2. **MCP 连接失败的连带损害**（#5300）：用户指出 MCP 连接失败"直接导致网关进程崩溃/卡死"、"事件循环空转 CPU 飙升到异常高"——暴露出在 MCP 故障时 nanobot 缺乏故障隔离机制，单一 MCP 服务的不稳定会拖垮整个网关。用户还补充了 "Task exception was never retrieved" 的残留任务泄漏现象。

3. **部署文档与实际不符**（#5295）：用户严格按照 deployment.md 操作却遇到 entrypoint 权限错误，说明文档可能存在遗漏（如文件权限设置步骤）。用户在评论中补充了完整的复现步骤和日志，便于开发者定位。

4. **大型 MCP 工具集导致上下文膨胀**（#5298）：用户观察到当 MCP 工具数量较大时，`ToolRegistry.get_definitions()` 返回的 schemas 全部传给 provider，直接推高上下文成本——提出了对 MCP schemas 进行 "budget"（预算控制）的方案建议。


## 待处理积压

| 项目 | 类型 | 创建时间 | 等待时长 | 备注 |
|------|------|----------|----------|------|
| **#4276 - 跨模型通用计算机使用工具** | PR（feature） | 2026-06-10 | 60 天 | 大型功能 PR，涉及 computer_use + browser 两个工具，长期无人 review。可能是由于其牵涉面广、安全评估成本高，但也可能面临被放弃的风险。 |
| **#5266 - Token 消耗追踪** | Issue | 2026-08-06 | 3 天 | 虽已有对应 PR 合并，但 Issue 仍未关闭，评论区持续有新讨论。建议合并 PR 后及时关闭此 Issue 以保持追踪整洁。 |
| **#5206 - 流式响应重复日志** | PR（bug fix） | 2026-08-01 | 8 天 | 修复已就绪，等待合并。此问题虽不严重，但长期搁置会积累技术债。 |

**其他提醒**：今日有 5 个 PR 处于待合并状态（#5271、#5206、#4276、#5292、#5299 中 #5299 已合并），合并队列有一定积压。其中 #5271 涉及会话数据一致性（P0 优先级标记），建议优先 review。

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

## Zeroclaw 项目动态日报 — 2026-08-09

### 今日速览

过去24小时内 Zeroclaw 项目保持高活跃度，共产生100条 Issue/PR 更新，新开/活跃 Issue 48条、待合并 PR 48条，关闭/合并各2条，无新版本发布。社区讨论密集分布于安全加固（泄漏检测、路径权限）、SOP 无头执行缺陷、以及硬件相关 crate 整合等方向。多个 P0/P1 级安全与稳定性 Bug 正处于 accepted/in-progress 状态，其中部分已有修复 PR 在途。整体项目健康度良好，但安全审计类问题积压值得关注。

### 版本发布

今日无新版本发布。

### 项目进展

今日合并/关闭的关键 PR 集中于 SOP 执行链路修复：

- **[PR #9494] [CLOSED]** — fix(sop): drive cron-started headless runs。修复 cron 触发的 SOP 运行因缺少 agent 循环而永远无法执行 `ExecuteStep` 的问题，将 cron 启动的运行纳入共享的无头运行驱动器。该 PR 的关闭直接推动长悬 Bug [#9805] 的解决进程。
  https://github.com/zeroclaw-labs/zeroclaw/pull/9494

- **[PR #9798] [CLOSED]** — docs(sop): document which agent executes SOP steps。纯文档补丁，已被 [#9841] 取代（因运行时修复改变了文档所描述的行为）。
  https://github.com/zeroclaw-labs/zeroclaw/pull/9798

- **[Issue #9843] [CLOSED]** — bug(zerocode): long-lived client can enter sustained CPU spin alongside daemon。CPU 空转问题已关闭，状态为 `r:needs-repro`，需进一步复现确认。
  https://github.com/zeroclaw-labs/zeroclaw/issues/9843

**项目整体向前推进的增量**：
- SOP 无头执行缺陷已有关键修复 PR [#9841] 接棒（含5项修复），目前处于 OPEN 状态；
- 硬件 crate 整合方向出现实质性动作：PR [#9853] 直接删除 `aardvark-sys` 与 `zeroclaw-robot-kit` 两个 crate，对应 RFC #8043 / #9803；
- 提供者上下文窗口发现逻辑获得优化 PR [#9854]，从手写八家名单改为家族注册表推导。

https://github.com/zeroclaw-labs/zeroclaw/pull/9841
https://github.com/zeroclaw-labs/zeroclaw/pull/9853
https://github.com/zeroclaw-labs/zeroclaw/pull/9854

### 社区热点

今日讨论最集中的议题呈现明显的「安全审计 + 硬件架构」双主线：

- **[Issue #8043] RFC: Retire the standalone aardvark-sys crate**（11评论，已关闭）— 硬件 crate 整合的发起者，主张将 aardvark-sys 并入 zeroclaw-hardware。与 [#9803]（robot-kit 同类整合）形成系列动作，背后诉求是降低维护成本、扫清 crates.io 发布障碍（#9381）。社区对该方向的认可度较高，已从 RFC 推进到实际 PR。
  https://github.com/zeroclaw-labs/zeroclaw/issues/8043

- **[Issue #8424] RFC: Workspace-relative forbidden path patterns and optional .zeroclawignore**（11评论）— 用户需要保护工作区内敏感文件（如 `.env`、`config.yaml`）免受 agent 访问，当前 `forbidden_paths` 仅能阻止工作区外路径。与已接受的 Bug [#9815]（forbidden_paths 对 allowed_roots 下路径完全失效）形成呼应，表明路径权限体系存在设计缺口。
  https://github.com/zeroclaw-labs/zeroclaw/issues/8424

- **[Issue #8054] System prompt tool-availability mismatch across entry points**（10评论）— 系统提示词中工具可用性标注与各入口实际生效工具不一致的问题，已修复直接 runtime 路径，但 gateway、WebSocket、多模态等入口仍有同类问题。该 Issue 横跨 channel/gateway/runtime 多个组件，反映「提示词-工具一致性」是全链路系统性挑战。
  https://github.com/zeroclaw-labs/zeroclaw/issues/8054

**社区讨论背后的核心诉求**：
1. 零信任安全模型 — 用户对泄漏检测、路径权限、审批来源验证等安全机制要求更高可控性；
2. 架构精简 — 社区认可合并同类 crate、减少表面冗余的方向；
3. 跨入口一致性 — 无论从哪个通道接入，agent 行为与工具能力必须一致。

### Bug 与稳定性

**S0 — 数据丢失/安全风险**：

- **[Issue #9855]** — Matrix channel 不通过 `.well-known/matrix/client` 进行 homeserver 发现，直接从配置字符串构造 API 基础 URL，绕过标准客户端发现机制。新建于 2026-08-09，尚无 PR。
  https://github.com/zeroclaw-labs/zeroclaw/issues/9855

**S1 — 工作流阻断/高安全性影响**：

- **[Issue #8559] [P1] Agents stop their work when exiting chat window in web dashboard（4评论）** — 用户离开 Web 聊天窗口即触发 agent 循环中断，无法后台持续工作。in-progress，尚无修复 PR。
  https://github.com/zeroclaw-labs/zeroclaw/issues/8559

- **[Issue #9035] [P2] Docker Compose gateway can remain loopback-bound behind a published port（3评论）** — 容器内 gateway 绑定回环地址导致端口映射无效，报 Connection refused。S1 严重度，in-progress。
  https://github.com/zeroclaw-labs/zeroclaw/issues/9035

- **[Issue #9390] [P1] emergency stop is a CLI-only state file that no runtime path reads（3评论）** — 紧急停止机制实际不生效：状态文件仅由 CLI 写入，运行时无任何路径读取。安全审计发现，in-progress。
  https://github.com/zeroclaw-labs/zeroclaw/issues/9390

- **[Issue #9340] [P1] CLI-created cron jobs cannot deliver output（3评论）** — CLI 创建的 cron 任务 delivery 被硬编码为 none，运行结果被静默丢弃。in-progress。
  https://github.com/zeroclaw-labs/zeroclaw/issues/9340

**S2 — 行为降级**：

- **[Issue #9825]** — 泄漏检测器将公开区块链地址误判为高熵令牌并打码，导致支付请求 URL 无法投递。accepted，无 PR。
  https://github.com/zeroclaw-labs/zeroclaw/issues/9825

- **[Issue #9486]** — 高频熵检测器对 Solana 钱包地址误打码，且 `high_entropy_tokens=false` 在通道路径上不生效。in-progress，与 #9825 为同源问题。
  https://github.com/zeroclaw-labs/zeroclaw/issues/9486

- **[Issue #8410]** — 通道任务缺少「有意不回复」的一等公民机制，条件性任务（如「无新邮件则保持沉默」）仍会发送可见响应。accepted。
  https://github.com/zeroclaw-labs/zeroclaw/issues/8410

- **[Issue #8731]** — stdio MCP 服务器在守护进程 PIDs 下累积为僵尸进程。in-progress。
  https://github.com/zeroclaw-labs/zeroclaw/issues/8731

- **[Issue #9573]** — 同一 provider 类型下多个别名时成本定价查询失败，token 价格被忽略。accepted。
  https://github.com/zeroclaw-labs/zeroclaw/issues/9573

- **[Issue #9816]** — Anthropic provider 成本上报恒为 $0.00，导致日/月预算上限永远不会触发。accepted。
  https://github.com/zeroclaw-labs/zeroclaw/issues/9816

- **[Issue #9815]** — `forbidden_paths` 对 `allowed_roots` 或工作区下任何路径均不生效，权限检查在 allowed-root 判定时即返回，永远无法到达 forbidden 检查。accepted。
  https://github.com/zeroclaw-labs/zeroclaw/issues/9815

**S3 — 轻微问题**：

- **[Issue #9834]** — `cargo test -p zeroclaw-runtime` 偶发失败，由进程全局共享状态（turn_streamed receipts + model_switch）引起。accepted。
  https://github.com/zeroclaw-labs/zeroclaw/issues/9834

- **[Issue #9656]** — Telegram 审批等待期间持续发送 typing 指示器，阻塞中的 turn 看起来像正常工作中。in-progress。
  https://github.com/zeroclaw-labs/zeroclaw/issues/9656

- **[Issue #9202]** — `zeroclaw desktop` 使用失效下载 URL 且无法检测已安装的 AppImage。in-progress。
  https://github.com/zeroclaw-labs/zeroclaw/issues/9202

**安全审计类（同一审计批次，均 P1）**：

- **[Issue #9387]** — Telegram/Slack/Lark/Matrix 上任意群成员均可响应交互式审批。in-progress。
  https://github.com/zeroclaw-labs/zeroclaw/issues/9387

- **[Issue #9390]** — 同上文 emergency stop 无效问题。

### 功能请求与路线图信号

社区较为活跃的功能请求方向及对应在途 PR：

- **Agent 可配置化配置作者** — [PR #9828] feat(tools): agent-facing config authoring with operator-approved policy previews。以 JSON Patch 方式为 agent 提供受控的配置修改路径，替代 shell 直接写文件。功能完成后将显著提升 agent 自主性与操作安全性。
  https://github.com/zeroclaw-labs/zeroclaw/pull/9828

- **OpenAI 兼容 API 端点** — [Issue #8550] 请求新增 OpenAI-compatible chat completions endpoint，使 Open WebUI、LobeChat 等标准客户端可直接接入。目前 WebSocket 和通道专属协议是唯一接入方式。当前无对应 PR。
  https://github.com/zeroclaw-labs/zeroclaw/issues/8550

- **Web 工具集简化** — [Issue #9824] 将默认注册的五个重叠 web 工具收敛为三个不同动词（`web_fetch` / `web_research` / `http_request`），原始 `web_search_tool` 移入 research 子-agent，浏览器自动化改为显式 opt-in。in-progress，方向与现有 PR #9580（网络防护原语下沉）互补。
  https://github.com/zeroclaw-labs/zeroclaw/issues/9824

- **Telegram 多条消息模式** — [Issue #8445] 每个 agent turn 的文本独立成消息，而非拼接为一条。in-progress。另有 [Issue #5514]（将 Telegram 媒体组合并为一个多模态 turn）也在推进。
  https://github.com/zeroclaw-labs/zeroclaw/issues/8445
  https://github.com/zeroclaw-labs/zeroclaw/issues/5514

- **Telegram 共享群会话** — [PR #9772] 增加 `per_user_session` 开关，使群聊中多人协作时共享同一会话上下文（当前硬编码为按发送者隔离）。
  https://github.com/zeroclaw-labs/zeroclaw/pull/9772

- **Anthropic 服务端故障转移** — [PR #9265] / [#9266] / [#9268] / [#9272] 四件套：opt-in 服务端 fallback 请求、读取服务端 fallback 信号、在渠道表面展示 safeguard fallback 通知、在 Web 聊天中展示同一通知。这一系列 PR 形成完整的功能闭环。
  https://github.com/zeroclaw-labs/zeroclaw/pull/9265
  https://github.com/zeroclaw-labs/zeroclaw/pull/9268
  https://github.com/zeroclaw-labs/zeroclaw/pull/9272

- **Herdr agent 集成** — [PR #8337] 在 CLI 交互模式中默认启用 Herdr agent 状态上报。自 2026-06-26 起已 OPEN 六周，需维护者关注。
  https://github.com/zeroclaw-labs/zeroclaw/pull/8337

**可纳入下一版本的信号**：路径权限体系（#8424 / #9815）与泄漏检测误报（#9825 / #9486）是当前安全方向最高频的两类请求，且涉及面广（Telegram、Solana、Matrix 均有报告），预计会成为下一迭代的重点。

### 用户反馈摘要

- **🔴 泄漏检测器误伤实际用例**：Solana 钱包地址被系统性打码，用户原话场景「Agent: Твой кошелёк (mainnet): [REDACTED_HIGH_ENTROPY_TOKEN]」——该功能设计初衷是防泄漏，却使正常 MCP 工具输出不可用。且关闭开关在通道路径无效，用户对「配置了却不生效」的挫败感明显。 ([#9486])
  https://github.com/zeroclaw-labs/zeroclaw/issues/9486

- **🔴 工作流中断令用户无法并行工作**：「When exiting the chat session after giving an agent a task, it stops the loop as interrupted. This completely blocks from doing stuff while the agent is working」——Web 端离开聊天即终止 agent 运行，用户期望后台任务不受前端页面影响。 ([#8559])
  https://github.com/zeroclaw-labs/zeroclaw/issues/8559

- **🟡 cron 输出静默丢失**：「The run is recorded as `ok`, so nothing indicates the result went nowhere」——CLI 创建的 cron 任务不投递输出且标记成功，用户完全无法感知结果丢失。 ([#9340])
  https://github.com/zeroclaw-labs/zeroclaw/issues/9340

- **🟡 条件性任务无法保持沉默**：「if there is new email, inform the user; otherwise stay silent」仍发送可见回复，用户对「自然语言约定的行为与实际不一致」感到困扰。 ([#8410])
  https://github.com/zeroclaw-labs/zeroclaw/issues/8410

- **🟢 bot 协作模式需求明确**：Telegram 群组中多人协作时，当前按发送者隔离会话导致跟进问题无法引用上下文，用户期望共享会话。该方向已有 PR #9772 在途。 ([#9772])
  https://github.com/zeroclaw-labs/zeroclaw/pull/9772

- **🟢 标准客户端接入愿望强烈**：用户明确表示「Standard OpenAI-compatible clients cannot connect without building custom integrations」，对接入门槛的抱怨较具体（点名 Open WebUI、LobeChat）。 ([#8550])
  https://github.com/zeroclaw-labs/zeroclaw/issues/8550

### 待处理积压

以下问题长期未获得维护者响应或明确排期，建议优先关注：

- **[PR #8337] herdr agent 集成** — 自 2026-06-26 至今已 OPEN 六周以上，无维护者评论，功能形态完整（含观察性标签），涉及 observability 方向。
  https://github.com/zeroclaw-labs/zeroclaw/pull/8337

- **[Issue #6663] Telegram 部分流式中展示工具调用进度** — 自 2026-05-14 提出，已近三个月；功能明确（在 `stream_mode = "partial"` 时通过 `update_draft_progress` 展示工具调用进度），实现路径清晰。
  https://github.com/zeroclaw-labs/zeroclaw/issues/6663

- **[Issue #7099] `zeroclaw status` 输出接入 CLI i18n** — 自 2026-06-02 提出，涉及用户可见字符串的国际化基建；PR #5987 评审中已达成共识，但仍未排期。
  https://github.com/zeroclaw-labs/zeroclaw/issues/7099

- **[Issue #9179] MCP 内嵌资源 blob 摄入** — 自 2026-07-19 提出，涉及 MCP 工具返回二进制内容时在模型侧的可消费性，对多模态/文件处理场景有基础性意义。
  https://github.com/zeroclaw-labs/zeroclaw/issues/9179

- **[PR #9744] Webhook 入口必须认证** — 自 2026-08-04 提出，安全增强型重构（密封类型保证已验证入口），标为 risk:high、size:XL，需维护者安排评审。
  https://github.com/zeroclaw-labs/zeroclaw/pull/9744

- **[Issue #5514] Telegram 媒体组合并** — 自 2026-04-08 提出，已四个月，P2 且 in-progress；多图连续触发多条输出消息影响 Telegram 端用户体验。
  https://github.com/zeroclaw-labs/zeroclaw/issues/5514

- **[PR #9571] 移除 WATI channel** — P0 优先级、七周未合并；移除完整通道（含配置、路由、CI、迁移条目），涉及面广，建议尽早合入避免与后续变更冲突。当前标注 needs-author-action。
  https://github.com/zeroclaw-labs/zeroclaw/pull/9571

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

### PicoClaw 项目动态日报 — 2026-08-09

---

#### 1. 今日速览

PicoClaw 项目今日活跃度**中等偏上**，过去 24 小时内有 3 条 Issue 更新和 4 条 PR 更新，但均无新的合并/关闭动作，也未有新版本发布。当前关注焦点集中于**功能请求**（IRC 长消息处理、OAuth 2.1 支持）与**关键 Bug 修复**（WhatsApp 客户端过期、Agent 前缀缓存）。值得注意的是，今日有两条新 PR 提交，针对性解决 WhatsApp 通道失效与 LLM 前缀缓存失效问题，显示维护者正在积极响应用户反馈，但大量 PR 处于待合并状态（含 2 个逾期 PR），项目合并节奏有待加速。

---

#### 2. 版本发布

无新版本发布。

---

#### 3. 项目进展

今日 **无 PR 被合并或关闭**。但新提交的两条 PR 是重要的进展信号，均针对即时问题：

- **PR #3320**：升级 `whatsmeow` 依赖以修复 WhatsApp 通道因客户端版本过期导致的持续断连（405 错误）。该 PR 若合并，将直接恢复 WhatsApp 通道的可用性。
- **PR #3321**：调整动态上下文（当前时间、运行时等）在系统提示中的位置，将其移至历史对话之后，以保持前缀缓存（prefix caching）的有效性，避免每次请求重新计算全部 token，对降低 API 成本和延迟有实际作用。

这两条 PR 均处于待合并状态，建议维护者优先审查合并。

---

#### 4. 社区热点

今日讨论热度最高的 Issue 为 **#3287**（IRC 长消息支持），虽是 7 月 22 日创建，但今日仍有更新（4 条评论），社区对 IRC 协议限制（512 字节）下消息被拆分的问题有持续关注。用户诉求是希望 PicoClaw 能将 IRCv3 拆分的长消息视为单一整体消息处理，提升多行代码块或长文本的交互体验。

链接：[Issue #3287](https://github.com/sipeed/picoclaw/issues/3287)

---

#### 5. Bug 与稳定性

| 严重程度 | Issue / PR | 描述 | 状态 |
| --- | --- | --- | --- |
| **高** | PR #3320 | WhatsApp 通道因客户端版本过期（405）断连且无法重连，通道完全不可用 | 已提交修复 PR，待合并 |
| **中** | Issue #3292（已关闭） | 聊天界面输入框选中时 CPU 占用过高（Firefox/Web 端） | 已关闭，推测已解决或转为其他处理 |
| **中** | PR #3321 | Agent 前缀缓存失效，导致每次请求重复消耗计算资源（隐患） | 已提交修复 PR，待合并 |

---

#### 6. 功能请求与路线图信号

- **Issue #3302**：支持 MCP 服务器的 OAuth 2.1（与 #2546 同源）。该请求已获得 2 条评论，被标记为 "Nice-to-Have / Enhancement"。目前没有对应 PR 或里程碑关联，短期内进入开发的可能性较低。
- **Issue #3287**：IRC 长消息支持。该请求带有 `[stale]` 标记，但仍有活跃讨论，是否纳入路线图尚不明确。
- **PR #3193（simplex 通道类型）**：新增通道类型的 PR 已逾期一个月以上（创建于 6 月 27 日），至今未合并，且无新增评论。若该通道对路线图有重要意义，建议维护者明确其状态（合并/关闭/延后），避免社区困惑。

---

#### 7. 用户反馈摘要

- **IRC 长消息场景**：用户（superuser-does）明确指出 IRC 默认 512 字节限制导致消息被客户端拆分，PicoClaw 需识别并重组这些分段，否则长消息（如代码、日志）会被割裂，影响读取与上下文理解。
- **WhatsApp 通道故障**：用户（grrowl）报告 WhatsApp 通道因依赖版本过期直接废弃，服务器无重连机制，属于用户可感知的**功能不可用**问题，反馈语气务实，期待快速修复。
- **前缀缓存优化**：用户（grrowl）从技术层面提交了性能优化建议，说明有用户关注 Token 成本与响应延迟，愿意协作改进核心逻辑。

---

#### 8. 待处理积压

以下为长期未获响应或合并的 PR/Issue，提请维护者关注：

1. **PR #3222**（deltachat 重构，-200 LOC）：创建于 7 月 3 日，已逾期超一个月，带 `[stale]` 标记。涉及移除密码配置、更新文档与重命名接口，属重构型变更，建议明确合并意向或提供反馈。
   链接：[PR #3222](https://github.com/sipeed/picoclaw/pull/3222)

2. **PR #3193**（新增 simplex 通道）：创建于 6 月 27 日，已逾期超 6 周，带 `[stale]` 标记。属于新功能扩展，若优先级不高，建议关闭或标注 "not planned"，减少积压噪音。
   链接：[PR #3193](https://github.com/sipeed/picoclaw/pull/3193)

3. **Issue #3287**（IRC 长消息）：虽今天有更新，但创建已 18 天且带 `[stale]` 标记。用户需求明确，建议标记为 `accepted` 或 `future`，避免请求悬空。
   链接：[Issue #3287](https://github.com/sipeed/picoclaw/issues/3287)

---

**总结**：项目今日无新版本与合并动作，但两条新 PR 直指用户痛点（WhatsApp 挂掉、缓存浪费），整体健康度良好，社区反馈具有建设性。主要风险是积压的 PR（尤其是两个逾期超过一个月的）缺少维护者明确回应，可能影响贡献者积极性。建议本周集中处理 PR #3320 与 #3321，并对逾期 PR 给出明确结论。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

### NanoClaw 项目动态日报 — 2026-08-09

---

#### 1. 今日速览

项目过去24小时活跃度中等偏高，共产生8条Issue和6条PR。虽无新版本发布，但核心开发聚焦明显：Discord审批流程的严重Bug（#3201）已关闭并有一对一修复PR（#3185）待合并，同时多项针对代码库重构滞后（add-opencode、codex provider）的Issue被提出，暴露出文档与主分支不同步的问题。此外，Mattermost与远程MCP服务器等功能性PR的合并与迭代仍在推进，项目整体处于功能扩展与稳定性修复并行阶段。

---

#### 2. 版本发布

无。

---

#### 3. 项目进展

今日关闭了3个PR，其中两个由 clementdecoligny 提交，为项目功能性扩展：

- **PR #2776 (已关闭)** — 支持远程 HTTP/SSE MCP 服务器。扩展了 `McpServerConfig` 为联合类型，并添加 `McpServerRemoteConfig` 配置（含 `type`、`url`、`headers` 等字段），同时更新了 `ncl groups config add-mcp-server` 命令。这标志着 NanoClaw 的 agent 能力接入不再局限于本地 stdio 传输。 [链接](https://github.com/nanocoai/nanoclaw/pull/2776)
- **PR #2777 (已关闭)** — 新增 `/add-strava` 技能，用于接入官方 Strava MCP 端点，并附带主机侧 OAuth 流程与 token 自动刷新模块。 [链接](https://github.com/nanocoai/nanoclaw/pull/2777)

另外，Mattermost 渠道集成出现了迭代版本推进：PR #3199（旧版 ChannelAdapter）已关闭，其继任者 PR #3202 基于当前 `ChannelAdapter`/`channel-registry.ts` 契约重写并保持打开状态，说明新架构正在逐步替换老代码。 [链接](https://github.com/nanocoai/nanoclaw/pull/3202) | [链接](https://github.com/nanocoai/nanoclaw/pull/3199)

---

#### 4. 社区热点

- **Issue #3201 [已关闭]** — “Discord 审批按钮点击无响应”是所有Issue中互动最频繁的（2条评论）。该问题直接阻断群组配置更新流程（点击Approve后系统显示0票并拒绝请求），属于高影响Bug。虽然已关闭，但引发了对 PR #3185（解决方案）的合并等待。 [链接](https://github.com/nanocoai/nanoclaw/issues/3201)
- **Issue #3200 [已关闭]** — 内容为非技术性的“角色扮演”环境设定，属于极少数噪音Issue，仅1条评论。社区主旋律仍以实用功能与Bug报告为主。

---

#### 5. Bug 与稳定性

按严重程度排列：

1. **高 — Discord 审批按钮失效 (Issue #3201)**：管理员点击同意却导致请求被拒，阻断管理操作。根因疑似在Chat SDK桥接层对 `custom_id` 的解析错误（详见 PR #3185）。**已有修复PR（#3185）等待合并**。 [Issue 链接](https://github.com/nanocoai/nanoclaw/issues/3201) | [PR 链接](https://github.com/nanocoai/nanoclaw/pull/3185)

2. **中 — 附件静默丢失 (Issue #3206, OPEN)**：在 Google Chat 等消息ID含路径分隔符的渠道，所有入站附件被 `isSafeAttachmentName` 检查静默丢弃。**暂无对应PR**。 [链接](https://github.com/nanocoai/nanoclaw/issues/3206)

3. **中 — Signal 渠道附件无法读取 (Issue #2528, OPEN)**：老Bug复现，容器内 agent 无法访问主机接收的图片/PDF。已持续近3个月，今日无新评论。 [链接](https://github.com/nanocoai/nanoclaw/issues/2528)

4. **中 — SQLite 锁竞争 (Issue #3177, 已关闭)**：修复已合入，解决了 Docker 跨挂载文件系统上的 “database is locked” 错误（涉及删除日志模式与 VirtioFS 的兼容性）。 [链接](https://github.com/nanocoai/nanoclaw/issues/3177)

5. **低 — codex provider 抛出未声明事件 (Issue #3203, OPEN)**：类型检查失败导致 `/add-codex` 链路断开，且生成的图片无人消费。**暂无对应PR**。 [链接](https://github.com/nanocoai/nanoclaw/issues/3203)

6. **低 — add-opencode 技能文档与代码库脱节 (Issue #3204, OPEN)**：SKILL.md 仍指示编辑已被 `cli-tools.json` 重构移除的 Dockerfile 安装块，自我守卫测试断言了旧结构。文档与主分支不同步。 [链接](https://github.com/nanocoai/nanoclaw/issues/3204)

---

#### 6. 功能请求与路线图信号

- **持续的渠道扩展**：**Mattermost 集成 (PR #3202)** 基于新架构提交，与已关闭的 PR #3199 (迭代版) 以及稍早的 PR #2776（远程MCP）共同表明，项目正积极扩展在不同消息平台与外部工具之间的连接能力。
- **安全与权限模型演进**：**Issue #3205 (OPEN)** 提出了持久化群组级 OneCLI 密钥分配的请求，直指当前 spawn-time 密钥分配设计存在矛盾（存在两个冲突的方向且缺乏持久模型）。这是一个深层次的多租户权限设计问题，若解决将大幅提升企业级可用性，值得维护者评估是否纳入 roadmap。 [链接](https://github.com/nanocoai/nanoclaw/issues/3205)
- **富文本渲染**：**PR #2877 (OPEN)** 请求为 Telegram 渠道添加原生富文本渲染支持（引用 Bot API 10.1 的 `sendRichMessage`）。该PR已搁置月余，但仍是渠道体验差异化的重要候选。

---

#### 7. 用户反馈摘要

- **审批流程挫败感**：Issue #3201 中，用户 (`churchcrm-hazel`) 经历了“点击批准却导致请求被拒”的荒谬结果，反映出 Discord 桥接层不稳定对核心管理功能的直接影响。
- **功能期待**：Mattermost 集成 PR #3202 的活跃提交（由 `wakqasahmed` 提交）表明社区对企业通信工具的需求真实存在，且新架构重新实装的态度积极。
- **长期痛点未解**：Issue #2528 (Signal 附件) 已存在多月无回应，用户估计已停止追问，但该渠道的可用性缺口（无法查看图片/PDF）依然存在，对依赖 Signal 的隐私敏感用户群体是重大缺陷。

---

#### 8. 待处理积压

维护者需重点关注以下长期未响应的条目：

- **Issue #2528 (OPEN, 2026-05-18)**：Signal 渠道附件不可达。该问题自5月18日起至今未获官方置评或指派，已积压约3个月，属于渠道核心功能缺陷。 [链接](https://github.com/nanocoai/nanoclaw/issues/2528)
- **PR #2877 (OPEN, 2026-06-28)**：Telegram 富文本渲染。已搁置1个多月，虽标记为 “follows-guidelines” 且技术上可能依赖于 Bot API 版本升级，但若无明确冲突应尽早回应社区贡献者。 [链接](https://github.com/nanocoai/nanoclaw/pull/2877)
- **PR #3185 (OPEN, 2026-08-04)**：修复Discord审批解析的PR。鉴于对应Bug (#3201) 已被标记为关闭（可能是自动关闭），该修复应尽快审阅合并，否则回归风险高。 [链接](https://github.com/nanocoai/nanoclaw/pull/3185)

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

### 1. 今日速览

IronClaw 项目当前处于高强度迭代期，24小时内关闭了24个Issue与32个PR，但新开/活跃的6个Issue和18个待合并PR同样显示出持续的功能开发动力。今日核心焦点集中在两大块：一是 **Reborn 架构迁移**进入收尾阶段，大量历史追踪Issue（如#3280、#3288）被批量关闭，表明这一长期重构主线正在加速收敛；二是 **Web Debug Inspector**(#7218) 与 **Web Push 通知**(#7398) 等新功能进入冲刺阶段，同时多项围绕 **Slack/Telegram 共享会话**(#7397)、**技能系统**(#7171) 的修复正在落地。值得注意的是，新贡献者（theredspoon、italic-jinxin）提交了多份高价值PR（如#7395、#7394），社区参与度处于健康水平，但安全审计类Issue(#7391)仍需及时跟进。

---

### 3. 项目进展

**核心机制修复（合并/关闭）：**

- **[PR #7377] (已合并) feat!: a run acts as its invoker — remove shared-route subject binding** — 这是#7157后最重要的行为变更，确立“**运行会话以调用者身份行动**”这一核心原则，修复了共享路由中的主体绑定分裂问题。该合并是今日多项后续工作的基础。  
  https://github.com/nearai/ironclaw/pull/7377

- **[PR #7382] (已合并) feat(stress): scripted tool-call workload with durable write read-back** — 针对#7360，为API压力测试增加脚本化工具调用工作负载，使内置能力写入路径的回归能被压力测试覆盖。  
  https://github.com/nearai/ironclaw/pull/7382

- **[PR #6938] (已合并) fix(skills): the model chooses the skill, not a keyword scorer** — 对技能选择机制的根本性修正，消除了宿主侧隐式技能激活路径，确保模型决策可追踪。属于技能系统重构(#6941)的关键部分。  
  https://github.com/nearai/ironclaw/pull/6938

**Reborn 迁移主线：**

- 随着 **#3280、#3288、#3287、#3286、#3285、#3279** 等大量Reborn追踪Issue批量关闭，Reborn架构迁移的核心工作（ProductWorkflow facade、Capability生命周期、产品表面对接、命令路由、Agent循环）已在代码库中落地。

**新功能开发中（待合并）：**

- **[PR #7398] feat(web-push): browser push notifications + PWA** — 将Web App升级为第一方通知渠道，实现与Slack/Telegram同级的通知能力。  
  https://github.com/nearai/ironclaw/pull/7398

- **[PR #7396] feat(channels): add generic progressive previews for Slack** — 引入渐进式消息预览契约。  
  https://github.com/nearai/ironclaw/pull/7396

- **[PR #7291] feat(inspector): complete statistics, navigation, and localization** — 完善Debug Inspector功能。  
  https://github.com/nearai/ironclaw/pull/7291

---

### 4. 社区热点

- **[Issue #7218] Epic: Add the Web Debug Inspector** — 8月5日创建，至今0评论但已带动 **#7225、#7226** 两个子任务关闭及 **[PR #7291]**、**[PR #7280]** 两个大型PR的开发，表明团队内部运作紧密，社区关注度持续升温。  
  https://github.com/nearai/ironclaw/issues/7218

- **[Issue #6989] Token accounting: hybrid provider-usage + tail estimates** — 讨论最活跃的Bug之一（5条评论），涉及令牌估算逻辑缺陷。作为pi-harness adoption (P1) 的一部分，直接影响成本计费正确性，目前无关联PR提出，需重点跟进。  
  https://github.com/nearai/ironclaw/issues/6989

- **[PR #7395] fix(outbound): close send-claim TOCTOU race** — 由新贡献者提出，直指外部发送路径中的竞态条件问题，风险级别标注为low但涉及并发正确性，属于高价值防御性修复，值得关注审查动态。  
  https://github.com/nearai/ironclaw/pull/7395

---

### 5. Bug 与稳定性

**高风险（数据正确性）：**

- **[Issue #6989] Token accounting 估算错误** — `ModelWorkRequest::for_assistant` 从引用字符串而非实际内容估算Token，导致成本计量偏差。影响计费准确性，暂无修复PR。  
  https://github.com/nearai/ironclaw/issues/6989

**中风险（安全/并发）：**

- **[Issue #7391] SafetyLayer::validate_input 无调用者** — 文档描述的安全数据流在实时路径上未被执行，存在安全校验缺失隐患。为新开Issue，暂无响应。  
  https://github.com/nearai/ironclaw/issues/7391

- **[PR #7395] 修复 outbound send-claim TOCTOU 竞态** — 虽然此PR为修复项，但暴露了现有实现中的竞态条件，可能导致消息发送状态错乱。已在PR中修复，等待合并。  
  https://github.com/nearai/ironclaw/pull/7395

**回归修复（已解决）：**

- **[Issue #7360] 压力测试覆盖缺口** — 内置能力写入路径未被压力测试覆盖。已通过 **[PR #7382]** 解决Phase 1。  
  https://github.com/nearai/ironclaw/issues/7360  
  https://github.com/nearai/ironclaw/pull/7382

- **[PR #7389] live-qa 通道自#7157合并后持续失败** — 由于旧推送记录不再生成导致。已通过适配两通道契约修复并合入。  
  https://github.com/nearai/ironclaw/pull/7389

---

### 6. 功能请求与路线图信号

- **迁移工具（#6939）** — 用户对从 Hermes/Openclaw 迁移的高成本表示不满，明确提出需要迁移工具。该Issue目前仅2条评论，但结合生态建设考量，可能被纳入后续版本规划，值得关注。  
  https://github.com/nearai/ironclaw/issues/6939

- **Web Debug Inspector (#7218)** — 已进入开发尾声（相关PR #7291、#7280已提交），作为v1.1.0的一部分，预计近期完成合并。  
  https://github.com/nearai/ironclaw/issues/7218

- **Web Push 通知 (#7398)** — 该PR使Web App成为第一方通知渠道，是对自动化通知体系的重要补充，有望随审查完成进入主分支。  
  https://github.com/nearai/ironclaw/pull/7398

- **替换编码工具为 omp 工具面 (#7392)** — 这是一个**重要信号**，因为该Issue暗含采用外部生态标准（`can1357/oh-my-pi`）的意图，且目标是通过**always-on host-owned**机制交付。这可能对默认工具集和沙盒模型产生深远影响。此Issue非常值得跟进。  
  https://github.com/nearai/ironclaw/issues/7392

- **默认OAuth账户（#4382）** — 该功能已关闭，但“Gate never re-fires”的描述暗示其可能已实现，相关机制可作为后续参考。  
  https://github.com/nearai/ironclaw/issues/4382

---

### 7. 用户反馈摘要

- **迁移痛点** — 用户明确表达从 Hermes/Openclaw 迁移到 IronClaw 的**高切换成本**是阻碍采用的主要因素，核心诉求是**保留既有配置和记忆数据**。此反馈来自真实用户使用场景，具有较强业务价值。  
  https://github.com/nearai/ironclaw/issues/6939

- **功能可用性反馈** — 技能安装后被“静默丢弃”的问题在社区中引发关注，**[PR #7171]** 对此进行了系统性修复（已备合并），说明组内通过直接修复快速回应了此类隐性体验问题。  
  https://github.com/nearai/ironclaw/pull/7171

- **不满情绪** — 暂无明确对立性评论，但从Issue关闭速率看，多人协作下对工作流稳定性的担忧（如#7157引起的CI连续失败）已通过 **[PR #7373]**（Gate审计）得到主动响应，反映出对质量基线的重视。  
  https://github.com/nearai/ironclaw/pull/7373

---

### 8. 待处理积压

**长期未响应（高优先级）：**

- **[Issue #6989] Token 计量Bug** — 自8月1日创建，已活跃一周且无关联PR。作为计费正确性问题，长期未解决可能导致用户信任损失。  
  https://github.com/nearai/ironclaw/issues/6989

- **[Issue #7391] 安全校验缺失** — 8月8日新开，但涉及安全绕过风险，建议尽快分配给相关模块维护者评估。  
  https://github.com/nearai/ironclaw/issues/7391

**待审查/整合的堆积PR（长期Open）：**

- **[PR #7028] / [PR #7029] / [PR #7048]** — theredspoon 提交的这三个修复（outbound 状态恢复、交付claim、WASM日志清理）自8月3日已停留一周，彼此有依赖关系，存在栈式合并复杂度。由于牵涉outbound核心可靠性和WASM安全性，建议尽快组织审查力推合并。  
  https://github.com/nearai/ironclaw/pull/7028  
  https://github.com/nearai/ironclaw/pull/7029  
  https://github.com/nearai/ironclaw/pull/7048

- **[PR #7171] 技能树修复** — 8月4日创建，至今未合并。修复了技能安装后消失的关键体验问题，建议优先审查。  
  https://github.com/nearai/ironclaw/pull/7171

- **[PR #7373] Gate审计** — 涉及37个架构测试门和5个模块宪章门，影响CI稳定性，目前已有积极讨论但尚未合并，建议跟进审查进度。  
  https://github.com/nearai/ironclaw/pull/7373

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-08-09

## 今日速览

项目近24小时活跃度处于低位：新增 1 条 Issue、3 条 PR 更新，无新版本发布。值得注意的是，今日所有动态均标记为 `stale`（长期未响应），其中 #1192、#1193 已悬置超过 4 个月，#2193 在关闭前也经历了 6 周以上的搁置，反映出维护响应速度有所滞后。积极的信号是，LiteLLM 网关集成 PR（#2193）已被正式关闭合并，为项目引入了多供应商 AI 网关支持能力，属于近期少数实质性的功能进展。

---

## 项目进展

**LiteLLM 网关集成（#2193，已合并）**

今日唯一被合并的 PR 为 LobsterAI 新增了 LiteLLM AI 网关提供商支持。用户将 Base URL 指向 LiteLLM 代理后，即可通过一个 OpenAI 兼容端点访问 100+ LLM 供应商。该实现复用了现有的 `chatWithOpenAICompatible` 处理器，未引入新的依赖，属于低侵入性的架构扩展。

该合并实质性地拓宽了项目的模型接入生态位，降低了用户绑定单一供应商的风险，对 LobsterAI 作为 Agent 框架的通用性是一次有效补强。

---

## 社区热点

**Issue #1192 — 自定义已有工具的默认配置**（[链接](https://github.com/netease-youdao/LobsterAI/issues/1192)）

该 Issue 由用户 `duzhen1996` 提出，请求支持"写死"工具默认配置，典型场景是让 browser 工具默认以无头模式启动以避免弹窗打扰。该用户表示已尝试通过"记忆"机制让模型遵循无头模式指令，但大模型的指令跟随经常不稳定。

核心诉求指向一个深层次的 Agent 框架设计问题：可控性与自主性之间的张力。用户希望 Agent 工具行为具备确定性的配置入口，而不是依赖模型每次"正确理解"指令，这反映了真实使用场景中对可预测性的强烈需求。

---

## Bug 与稳定性

今日无新报告的 Bug、崩溃或回归问题。

但需注意，PR #1193（SQLite 写入放大优化）仍处于长期未合并状态（4个月），其修复的 `db.export()` + `fs.writeFileSync()` 全量序列化问题会随数据量增长产生显著的持久化性能劣化甚至阻塞风险。尽管该 PR 非今日新增，但对于使用 SQLite 存储且数据规模较大的用户，该问题持续存在，建议维护团队优先评估。

---

## 功能请求与路线图信号

**工具默认配置覆盖（#1192）** — 用户明确请求为内置工具提供用户侧默认配置能力（如 browser 无头模式）。当前无对应 PR 认领，但该需求与 Agent 框架的可配置性方向一致。

**SQLite 批量写入优化（#1193，待合并）** — 该 PR 提出通过防抖（debounce）与批量事务（batch transactions）彻底消除写放大。若被采纳，将显著提升长期运行场景下的持久化性能，建议纳入下一版本计划。

**LiteLLM 网关支持（#2193，已合并）** — 已落地，标志着 LobeAI 在 AI 供应商聚合方向上迈出一步。后续可关注是否会有多网关管理与自动路由等延伸功能。

---

## 待处理积压

| 编号 | 类型 | 标题 | 等待时长 | 优先级建议 |
|------|------|------|----------|-----------|
| [#1193](https://github.com/netease-youdao/LobsterAI/pull/1193) | PR | perf(sqlite): eliminate write amplification with debounce + batch transactions | ~4个月 | 高 — 直接关联存储性能与稳定性 |
| [#1192](https://github.com/netease-youdao/LobsterAI/issues/1192) | Issue | 自定义已有工具的默认配置 | ~4个月 | 中 — 影响日常使用体验，需求明确，实现路径清晰 |
| [#2294](https://github.com/netease-youdao/LobsterAI/pull/2294) | PR | docs: add TakoAPI directory badge | ~1个月 | 低 — 纯文档变更，成本极低，建议快速处理 |

以上项目均已挂上 `stale` 标记，存在被自动关闭的风险。其中 #1193 与 #1192 分别对应性能优化与可用性诉求，建议维护者优先进行 triage，避免有价值的贡献因搁置而被遗漏。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 — 2026-08-09

## 今日速览

Moltis 项目过去 24 小时活跃度中等偏平稳：共 2 条 Issue 更新（1 开 1 关）、1 条 PR 更新（已合并/关闭），无新版本发布。值得关注的是，一条积压两个月的 Docker 沙箱文件系统工具 Bug（#1096）已关闭，对应的修复 PR（#1105）也已合入，标志着该长期问题正式解决，但同日新开的 Apple Container 1.x 沙箱误判问题（#1185）表明沙箱兼容层仍是当前稳定性短板。项目整体处于"修复与回归验证并行"的迭代阶段。

## 项目进展

- **[CLOSED] [PR #1105] Fix Docker sandbox filesystem tool fallback**（[链接](https://github.com/moltis-org/moltis/pull/1105)），作者 penso，创建于 2026-06-05，最终于 2026-08-08 合并/关闭。该 PR 针对 Docker 沙箱环境下 `Read`/`Write`/`Edit`/`MultiEdit` 工具失效的问题（即 Issue #1096），新增了针对 `/home/sandbox` 与 `workspace/data` 路径的回归测试；核心修复逻辑是在网关进程无法访问宿主机挂载点时，从"翻译后的 Docker 宿主路径"回退到"容器内直接操作"；同时保留了直接宿主路径缺失列表的语义。该 PR 的合入意味着 #1096 的修复已正式进入主干，Docker 沙箱文件操作的可靠性得到实质提升，项目向"沙箱一致性"目标迈出明确一步。

## 社区热点

今日无高互动讨论（所有条目评论数为 0，👍 均为 0）。相对值得关注的是 Issue #1185（[链接](https://github.com/moltis-org/moltis/issues/1185)），它是今日唯一新开 Issue，报告的 Apple Container 1.x 沙箱"进程已启动但 Moltis 判定未运行"问题，反映了用户对 macOS 沙箱支持的实际需求，以及沙箱状态检测逻辑在不同容器实现间的一致性缺口。

## Bug 与稳定性

- **[NEW] [Bug] Apple Container 1.x sandbox starts but Moltis treats it as not running**（[链接](https://github.com/moltis-org/moltis/issues/1185)），作者 mikz，严重程度判定为功能异常（沙箱可用性误判导致工作流中断）。目前无评论、无 👍，暂无对应 fix PR。该问题与 #1096 同属沙箱层缺陷，但平台不同（Apple Container vs Docker），建议维护者排查沙箱状态检测的通用抽象层是否存在平台相关假设。
- **[CLOSED] [Bug] `Read`/`Write`/`Edit` tools don't work in Docker**（[链接](https://github.com/moltis-org/moltis/issues/1096)），修复已合入（见 PR #1105），无遗留风险。

## 功能请求与路线图信号

今日无新功能请求。但从已合入的 PR #1105 看，其包含的回归测试覆盖了沙箱内路径（`/home/sandbox`、`workspace/data`）的读写编辑操作，表明维护者将"沙箱文件操作一致性"视为重要质量门槛。结合 #1185 的 Apple Container 问题，可预判"多沙箱后端（Docker/Apple/其他）的统一文件系统语义"将是下一阶段的隐含路线图主题。

## 用户反馈摘要

今日无新的用户评论或讨论串。从 Issue 描述中可提取的间接信息：
- #1185 用户（mikz）严格遵循了 Bug 报告模板，勾选了预检清单，表明其已完成搜索、确认使用最新版本，且明确表示"如果在聊天会话中发生，会附上完整会话上下文"，说明用户对项目 Bug 报告流程的规范性有较高配合度，也侧面反映社区维护较为有序。
- #1096 用户（IlyaBizyaev）的 bug 自 2026-06-03 提交至 2026-08-08 修复，历时约 2 个月，期间无评论互动。该修复周期较长，可能对部分受影响的 Docker 用户造成了一定时期的工作流阻塞，建议维护者关注类似环境特定问题的响应时效。

## 待处理积压

- **[OPEN] Issue #1185 — Apple Container 1.x 沙箱误判**（[链接](https://github.com/moltis-org/moltis/issues/1185)）：新开问题，暂无回复。虽未进入"长期未响应"范畴，但属于平台相关 Bug，建议维护者尽快标记优先级（如 `bug` + `sandbox` + `macos`），并确认是否与 #1096 的修复逻辑存在交叉影响（Docker 回退逻辑是否同样适用于 Apple Container 的进程状态检测）。
- **历史遗留 PR/Issue 提醒**：当前 PR #1105 已关闭，但未发现其他长期滞留的 PR。Issue #1096 已关闭，积压清理完毕。整体积压状况健康。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

### 1. 今日速览

CoPaw 项目过去24小时活跃度极高，核心聚焦于稳定性修复与体验优化。Issue 和 PR 数量均处于高位（19 条 Issue、50 条 PR），社区参与积极，涌现了多位首次贡献者。当前最突出的问题是 v2.1.0-beta 系列引入的一系列回归，包括 MCP 连接可靠性、前端空闲 CPU 占用过高、以及多提供商 API 兼容性问题，但多数 Bug 已被迅速定位并已有对应修复 PR。项目整体处于密集迭代期，健康度良好，维护者响应迅速，但 Beta 版本的稳定性仍需打磨。

### 2. 版本发布

过去 24 小时无新版本发布。

---

### 3. 项目进展

今日无直接合并的 PR，但有三条 PR 被关闭，其中两条为功能性修复，一个关键合并信号值得关注：

- **[PR #6835 - fix(llm): resolve KeyError '__aiter__' during auto-title generation](https://github.com/agentscope-ai/QwenPaw/pull/6835) [已关闭]**：修复了对话自动标题生成因部分提供商返回非流式响应（如 dict 或纯文本）而崩溃的问题。该修复直接针对 Issue #6813。
- **[PR #6836 - fix(mcp): wire read_timeout_seconds into MCP SDK ClientSession](https://github.com/agentscope-ai/QwenPaw/pull/6836) [已关闭]**：修复了 MCP 客户端会话未应用配置的超时时间，可能导致请求无限期挂起的问题。该修复直接针对 Issue #6822。

**重点项目进展与信号：**

- [PR #6830 - fix(memory): align compression and toolkit lifecycle](https://github.com/agentscope-ai/QwenPaw/pull/6830) **[OPEN]**：对内存管理中间件进行了较大重构，以对齐上下文压缩生命周期，并修复自动记忆污染会话历史的问题。该 PR 仍处于开放状态，属于深度优化，若合并将显著提升长对话场景的稳定性。
- [PR #6659 - feat(providers): implement model fallback with cooldown mechanism](https://github.com/agentscope-ai/QwenPaw/pull/6659) **[OPEN]**：实现模型自动故障转移及冷却机制，有望解决因限流、超时导致的对话中断问题（关联 Issue #2199, #1327, #2089）。该功能已处于 "Under Review" 阶段，是解决用户痛点的关键特性，预计不久将合并。

---

### 4. 社区热点

今日讨论热度最高的 Issue 为：

- **[Issue #6782 - [Bug]: 2.0.1 docker版本，插件市场、应用市场始终提示维护中，无法使用](https://github.com/agentscope-ai/QwenPaw/issues/6782)**（9 条评论）：这是影响面最广的 Bug 报告，涉及 Docker 部署用户无法使用核心功能。背后诉求是期望 Docker 版本与主版本功能对齐，且能快速获得热修复。
- **[Issue #6811 - OpenAI Responses continuation summary ignores `disable_thinking` and misreports 60-second cancellation as malformed output](https://github.com/agentscope-ai/QwenPaw/issues/6811)**（5 条评论）：该问题揭示了逻辑推理模型（reasoning model）在长对话场景下的两个核心缺陷：配置不生效与错误信息误导。用户对对话中断和错误的错误提示表现出较高的困惑与不满。

---

### 5. Bug 与稳定性

今日 Bug 报告密集且多为实际使用痛点，按严重程度排列：

**高严重度（阻断/崩溃级）：**

- **[Issue #6814 - SIGBUS (FS pagein 22) in sqlite3WalFindFrame while opening Scroll history.db on macOS](https://github.com/agentscope-ai/QwenPaw/issues/6814)**：macOS 上打开历史数据库时直接崩溃，属于数据访问层的严重缺陷。暂未关联修复 PR。
- **[Issue #6811 - OpenAI Responses continuation summary ignores `disable_thinking` and misreports 60-second cancellation as malformed output](https://github.com/agentscope-ai/QwenPaw/issues/6811)**：续写摘要功能阻塞主对话，且错误误报，严重影响使用体验。暂未关联修复 PR。

**中严重度（功能异常/资源占用）：**

- **[Issue #6828 - Console frontend at idle keeps repainting (~20% CPU) due to infinite CSS animations](https://github.com/agentscope-ai/QwenPaw/issues/6828)**：桌面端空闲 CPU 占用过高，导致 UI 卡顿。已有对应修复 [PR #6834](https://github.com/agentscope-ai/QwenPaw/pull/6834)（使用 IntersectionObserver 暂停屏外动画）。
- **[Issue #6822 - A transient streamable HTTP MCP connection failure permanently blocks the active conversation](https://github.com/agentscope-ai/QwenPaw/issues/6822)**：MCP 网络抖动可导致对话永久阻塞。已有两个修复方案：[PR #6825](https://github.com/agentscope-ai/QwenPaw/pull/6825) 和 [PR #6836](https://github.com/agentscope-ai/QwenPaw/pull/6836)（已关闭）。
- **[Issue #6812 - Model 'unknown' execution failed. In Google API](https://github.com/agentscope-ai/QwenPaw/issues/6812)**：Gemini 提供商因发送不受支持的 `$schema` 字段导致调用失败。暂未关联修复 PR。
- **[Issue #6821 - reasoning_content relay fails for thinking-mode models → 400 BadRequestError](https://github.com/agentscope-ai/QwenPaw/issues/6821)**：多轮对话中未能正确传递 `reasoning_content` 参数，导致 400 错误。暂未关联修复 PR。
- **[Issue #6810 - Windows 安装/更新需先终止占用安装目录的进程](https://github.com/agentscope-ai/QwenPaw/issues/6810)**：NSIS 安装器因文件占用报错，影响 Windows 用户体验。属于安装器逻辑缺陷，暂未关联修复 PR。

**低严重度（体验/显示问题）：**

- [Issue #6820](https://github.com/agentscope-ai/QwenPaw/issues/6820) 与 [Issue #6826](https://github.com/agentscope-ai/QwenPaw/issues/6826)：前端 UI 流式输出/时间显示异常，影响状态感知。
- [Issue #6831](https://github.com/agentscope-ai/QwenPaw/issues/6831)：macOS 桌面端 Whisper 因 PATH 问题无法识别 Homebrew 的 ffmpeg，功能性缺失。

**已修复（Closed）：**

- [Issue #6756](https://github.com/agentscope-ai/QwenPaw/issues/6756)（`run_tool_batch` 报错）与 [Issue #4558](https://github.com/agentscope-ai/QwenPaw/issues/4558)（长文本输出 CPU 占用高），说明维护者正在持续清理旧账。

---

### 6. 功能请求与路线图信号

- **模型/提供商扩展**：[Issue #6490 - Add Volcengine Agent Plan and Xiaomi MiMo Standard API as built-in providers](https://github.com/agentscope-ai/QwenPaw/issues/6490) 请求增加火山引擎和小米 MiMo 提供商。结合已开放的 [PR #6659（模型故障转移）](https://github.com/agentscope-ai/QwenPaw/pull/6659) 和 [PR #6668（Responses prompt caching）](https://github.com/agentscope-ai/QwenPaw/pull/6668) 可以看出，多提供商支持、成本优化与稳定性是当前后端演进的核心方向，此类请求很可能在后续版本被采纳。
- **安全/审批体验优化**：[Issue #6832 - AI要求审批时加入对于审批项目的描述](https://github.com/agentscope-ai/QwenPaw/issues/6832) 要求审批请求附带可读的描述信息，直击安全与易用性的平衡痛点。同时，[PR #6833](https://github.com/agentscope-ai/QwenPaw/pull/6833) 正在修复审批路由字段丢失的问题，表明审批链路正在被积极重构和增强，该功能请求极有可能进入开发管线。
- **对话/文件生命周期管理**：[Issue #6827 - 删除对话时可选清理该对话产生的任意临时文件](https://github.com/agentscope-ai/QwenPaw/issues/6827) 关注存储占用与数据卫生。这属于长期优化方向，短期内合入可能性较低，但值得纳入路线图讨论。

---

### 7. 用户反馈摘要

- **Docker 用户存在隔离感**：Issue #6782 表明 2.0.1 的 Docker 版本与主版本功能存在较大差距，用户期望同步更新，而非滞后。
- **对“永久阻塞”零容忍**：无论是 MCP 断连（#6822）还是续写摘要卡死（#6811），用户对任何形式的对话无限期挂起都表现出极大的负面反馈，这已成为体验的底线要求。
- **推理模型使用门槛高**：多个问题（#6821、#6812）表明配置 thinking-mode 模型或不同提供商 API 时错误频出，普通用户难以自行排查。社区期望 QwenPaw 能抹平不同提供商间的协议差异，提供即插即用的体验。
- **桌面端性能敏感度高**：Issue #6828 指出空闲状态 20% 的 CPU 占用被用户视为严重问题，表明桌面端用户对资源占用的容忍度较低，也反映出用户对应用流畅度的期待值很高。
- **审批机制需兼顾安全与效率**：Issue #6832 的反馈显示用户认可审批机制，但认为当前信息展示不足，增加了审查成本。用户需要的是“一眼可判断”的审批卡片，而非阅读代码。

---

### 8. 待处理积压

以下为长期未闭合或需要维护者重点关注的高价值线程：

- **Issue #6490**：[Add Volcengine Agent Plan and Xiaomi MiMo Standard API as built-in providers](https://github.com/agentscope-ai/QwenPaw/issues/6490)（自 7 月 27 日活跃至今）。社区对新兴提供商支持有持续需求，建议维护者确认是否纳入路线图。
- **PR #5930**：[feat: add structured run outcome to SSE response for API automation](https://github.com/agentscope-ai/QwenPaw/pull/5930)（自 7 月 10 日开放至今）。该 PR 对 API 自动化集成有重要价值（解决异常结束无法感知的问题），但已搁置近一个月，建议维护者尽快处理或给出反馈，避免打击贡献者积极性。
- **Issue #6810**：[Windows 安装/更新需先终止占用安装目录的进程](https://github.com/agentscope-ai/QwenPaw/issues/6810)。Windows 安装器体验问题直接影响新用户转化，虽不复杂但影响面大，建议优先处理。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

# EasyClaw 项目动态日报 — 2026-08-09

**数据覆盖区间**：2026-08-08 ~ 2026-08-09（过去 24 小时）

---

## 今日速览

EasyClaw (RivonClaw/TK Copilot) 在过去 24 小时内保持中高活跃度：无新增或活跃 Issue，但合并了 3 个 PR，并连续发布了 5 个版本（v1.8.88–v1.8.92），节奏密集。所有 PR 均在当日完成关闭，无遗留待合并项。今日工作重点集中在桌面端稳定性加固、OpenClaw 运行时升级（SQLite 会话迁移）、以及 CI 构建缓存修复。项目整体处于快速迭代、稳定性收敛阶段，维护者响应迅速。

---

## 版本发布

24 小时内连续发布 5 个版本，均为补丁级迭代，无破坏性变更；但 v1.8.89 包含数据存储迁移，需用户注意。

### v1.8.92 — 微信兼容性恢复 + 启动可靠性
- **更新内容**：适配 OpenClaw SDK import 变更，恢复微信兼容性；迁移已配置的 workspace 状态，提升 gateway 启动可靠性。
- **迁移注意**：workspace 状态将自动迁移至新配置格式，首次启动 gateway 时可能略有延迟。
- 🔗 [查看 Release](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.92)

### v1.8.91 — Gateway 启动前自动迁移
- **更新内容**：在 Gateway 启动前自动迁移旧版智能体 workspace 状态。
- **影响**：作为 v1.8.92 的前置步骤，此版本确保旧用户平滑过渡。
- 🔗 [查看 Release](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.91)

### v1.8.90 — 飞书集成修复
- **更新内容**：恢复飞书消息收件人（recipients）与升级卡片（escalation card）更新功能。
- **影响**：修复飞书渠道通知失效问题，影响使用飞书作为通知渠道的用户。
- 🔗 [查看 Release](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.90)

### v1.8.89 — OpenClaw 运行时升级（SQLite 会话）
- **更新内容**：升级内置 OpenClaw runtime，改进 SQLite 会话能力；增强桌面端基线和 gateway 启动稳定性。
- **⚠️ 迁移注意**：会话与聊天记录将从 legacy `sessions.json` 迁移至 per-agent SQLite/WAL 存储。首次启动桌面端时将自动执行迁移，建议提前备份 `sessions.json`。
- 🔗 [查看 Release](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.89)

### v1.8.88 — 桌面端内存与端点持久化
- **更新内容**：提高 gateway 内存余量，提升桌面端会话稳定性；在桌面端重启后保留路由后的云端 Provider 端点。
- **影响**：修复了桌面端会话可能因内存不足而中断的问题，并减少重启后重新路由的延迟。
- 🔗 [查看 Release](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.88)

---

## 项目进展

今日 3 个 PR 全部合并关闭，覆盖三个维度：

| PR | 类型 | 核心贡献 |
|---|---|---|
| [#35 feat(vendor): upgrade OpenClaw with SQLite sessions](https://github.com/gaoyangz77/rivonclaw/pull/35) | 功能 | 将 OpenClaw 锁定至 commit `dabe191`，实现会话/聊天记录从 `sessions.json` 到 per-agent SQLite/WAL 的迁移；自动执行官方启动状态迁移，适配 Desktop、Panel、配置生成等全链路 |
| [#36 fix(desktop): restore vendor package pruning](https://github.com/gaoyangz77/rivonclaw/pull/36) | 修复 | 恢复桌面端 vendor 包裁剪：移除未暴露的 memory-lancedb 与 MXC 插件运行时；在 Control UI bundle 裁剪后清理其专属依赖；收紧打包运行时契约；容错 Windows 临时目录清理锁问题 |
| [#37 fix(ci): cache complete vendor workspace builds](https://github.com/gaoyangz77/rivonclaw/pull/37) | 修复 | CI 缓存 `@openclaw/ai` workspace 构建产物；拒绝不完整的 vendor 构建缓存并触发自动重建；使上一工作流产生的损坏 dist/prod 缓存失效；显式断言打包后的 AI runtime 入口点 |

**整体判断**：三个 PR 共同指向「构建链路可靠性与包体精简」。SQLite 迁移（#35）是数据层的重要升级，为后续基于会话的智能体功能打下基础；#36/#37 则从产物质量和 CI 缓存层面消除隐患。项目在核心运行时升级与工程质量两方面同步推进。

---

## 社区热点

今日无活跃 Issue，3 个 PR 均无评论。项目当前处于维护者主导的密集发布期，社区公开讨论较少。

**说明**：此前版本（如 v1.8.90 飞书修复）或许在用户侧有较高关注，但 24 小时窗口内无对应 Issue/评论可供分析。值得关注的是，Release 说明中针对 macOS Gatekeeper 拦截（"'RivonClaw' is damaged"）的反复解释，说明该问题在用户侧反复出现，是潜在的文档与签名流程痛点，但未形成 Issue 讨论。

---

## Bug 与稳定性

| 严重程度 | 问题描述 | 状态 | 关联 PR/Release |
|---|---|---|---|
| 🟡 中 | **飞书消息收件人与升级卡片更新失效** | ✅ 已修复 | [v1.8.90](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.90) |
| 🟡 中 | **桌面端会话因 gateway 内存不足而不稳定** | ✅ 已修复 | [v1.8.88](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.88) |
| 🟢 低 | **macOS Gatekeeper 误报（"'RivonClaw' is damaged"）** | ⚠️ 持续存在 | 未签名应用导致，各 Release 说明中反复提示，建议尽快解决代码签名/公证问题 |
| 🟢 低 | **Windows 临时目录清理偶发锁冲突** | ✅ 已修复 | [#36](https://github.com/gaoyangz77/rivonclaw/pull/36) 中容错处理 |

---

## 功能请求与路线图信号

当前无新增功能请求 Issue。结合已合并 PR 与 Release 版本演进，以下方向可预判为活跃路线图：

1. **会话数据基建升级**（#35 → v1.8.89）：迁移至 SQLite/WAL 后，按 agent 维度的会话检索、跨会话记忆等能力将具备数据层基础，预计后续版本将开放相关能力。
2. **多平台渠道兼容性修复**（v1.8.90 飞书，v1.8.92 微信）：近期发布密集修复 IM 渠道，暗示渠道兼容性仍在持续打磨中。
3. **桌面端体验加固**（v1.8.88 内存/端点持久化，v1.8.89 启动稳定性）：桌面版是近期迭代重点，预估后续将推进 Control UI 相关增强。

---

## 用户反馈摘要

24 小时窗口内无新增 Issue 评论。可参考的间接反馈信号：

- **macOS Gatekeeper 阻止启动**：在 v1.8.88–v1.8.92 连续 5 个版本的安装说明中，均需附上"文件未损坏，这是 Gatekeeper 拦截"的英文+中文提示，说明该问题在 macOS 用户中高频出现。用户需手动绕过安全检查，体验受损。
- **升级密度**：24 小时 5 个版本，对部分用户可能带来更新疲劳，但版本均为补丁级、自动迁移平滑，整体风险可控。

---

## 待处理积压

当前积压状况良好：

- **Issues**：无未关闭 Issue。
- **PRs**：无待合并 PR。
- **长期未响应**：无。

**值得维护者关注的潜在隐患**：

- macOS 代码签名/公证问题长期未解决。每次发布都需用户在安装说明中手动绕过 Gatekeeper，建议评估 Apple Developer ID 签名或公证流程，可从根源消除该高频用户痛点。
- OpenClaw SDK 的 import 变更导致微信兼容性回归（v1.8.92 修复），说明上游依赖的 breaking change 对下游影响较敏感。建议考虑将 OpenClaw 版本 pin 策略（已在 #35 中实施）推广为长期实践，并增加上游变更的自动化回归测试。

---

**项目健康度评估**：🟢 优秀 — 高速迭代、无积压、修复及时；唯一需要关注的是 macOS 签名流程与上游依赖变更的长期稳定性。

</details>

---
*本日报由 [agents-radar](https://github.com/huang-yi-dae/agents-radar) 自动生成。*