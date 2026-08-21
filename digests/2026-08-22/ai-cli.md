# AI CLI 工具社区动态日报 2026-08-22

> 生成时间: 2026-08-22 02:30 (GMT+8) | 覆盖工具: 7 个 CLI + Claude Code Skills
> 本日报由 agents-radar 本地自动化生成，所有摘要/对比/撰写均由执行代理人工完成，未调用任何外部大模型 API。

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [GitHub Copilot CLI](https://github.com/github/copilot-cli)
- [Kimi Code CLI](https://github.com/MoonshotAI/kimi-cli)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Qwen Code](https://github.com/QwenLM/qwen-code)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## 横向对比

# AI CLI 工具社区动态横向对比分析报告（2026-08-22）

## 1. 生态全景

今日 AI CLI 赛道呈现「两端分化」：一端是 **OpenCode（78 PR）与 Qwen Code（82 PR）** 的社区贡献洪流，另一端是 **Claude Code 与 Kimi Code 的近静默**——Claude Code 近 24h 0 条 PR 合入、Kimi Code 仅 1 条 issue。OpenAI Codex 则集中在 **alpha 系列快速迭代**（rust-v0.150.0-alpha.x 与 v0.149.0-alpha.x 于 08-21 连发 5 个预发布），并伴随高赞功能诉求。

共性议题收口到三条主线：**记忆持久化**（Claude #34556 跨压缩记忆、OpenCode #41469「空响应被记为干净停止」）、**Windows/跨平台质量**（Codex #39136 插件初始化失败、#27117 PSModulePath 污染、#37104 WSL 终端静默失败）、以及 **provider 广度与成本透明**（Qwen #8368 接入 Kimi/MiMo、#8276 跨延迟工具发现的 prompt cache 保留；CoPaw/NanoClaw/IronClaw 均在扩展 provider 矩阵）。

## 2. 各工具活跃度对比（近 24h）

| 工具 | 活跃 Issues | 重要 PR | Releases（近期） |
|------|-----------|--------|----------------|
| Claude Code | 100（多为历史 issue 的标签/bot 更新） | 0 | v2.1.238（08-20） |
| OpenAI Codex | 84 | 16 | rust-v0.150.0-alpha.5/.3/.2、v0.149.0-alpha.7.1/.4.1（08-21） |
| Gemini CLI | 98 | 2 | v0.56.0-nightly.20260821、v0.57.0-preview.0 |
| GitHub Copilot CLI | 33 | 0 | v1.0.81-6（08-14，无新发） |
| Kimi Code CLI | 1 | 0 | 1.49.0（07-16，无新发） |
| OpenCode | 22 | 78 | v1.18.21 / v1.18.20（08-21） |
| Qwen Code | 18 | 82 | v0.21.14-nightly.20260821、v0.21.15（08-20） |

## 3. 共同关注的功能方向

- **记忆与上下文压缩**：Claude Code #34556「跨压缩持久记忆」仍居讨论热度前列（111💬，已关闭但被反复引用）；OpenCode #41469「空 LLM 响应导致会话静默停止（finish: unknown, 0 tokens）」是直接污染评测与计费的质量黑洞。两者共同指向「压缩后历史可回溯 + 失败可诊断」的缺口。
- **Windows / 跨平台质量**：Codex 的 #39136 内置浏览器插件 Trusted RPC 依赖不在可信路径（82💬）、#27117 Windows 独立更新把 PSModulePath 带进 powershell.exe、#37104 WSL 集成终端在 PTY 启动前静默失败，构成 Windows 第一痛点平台；Copilot CLI #4521「沙箱无法禁用」、Kimi #2615 后台 subagent 在 TaskStop 后仍持续调用，反映终端/进程生命周期治理仍是共性难题。
- **Provider 广度与模型路由**：Qwen #8368 新增 Kimi 与小米 MiMo provider、#8276 跨「延迟工具发现」保留 prompt cache；NanoClaw 接入 Dial（SMS+语音）、Mattermost；CoPaw 接入 Volcengine Agent Plan & MiMo V2.5；IronClaw 推可插拔 memory over MCP。多模型、多渠道已成各工具差异化主轴。
- **Agent 可靠性与可观测**：Gemini #22323 subagent 在 MAX_TURNS 后被误报为 GOAL 成功、#21409 generalist agent 挂起；OpenCode #785「能否关闭流式模式」（38👍/31💬）与 #34473「随机停止响应」反映流式/中断语义不稳定。

## 4. 差异化定位

- **Claude Code**：主干进入稳定打磨期，近 24h PR 侧静默、issue 侧以历史问题被 bot/标签刷新为主；最新 v2.1.238（08-20）延续「跨会话记忆」「多会话协作」主线（#34556、#24798 跨会话通信）。定位专业开发者的日常主力终端，体验细节被零容忍审视。
- **OpenAI Codex**：Rust 重写持续推进，alpha 系列日更；社区最高赞诉求是 #11626「/rewind 检查点恢复（同时回滚聊天上下文与已应用代码）」（204👍）。Windows 质量（冻结、插件、安装包）与「本地/私有插件市场被 API Key 用户阻挡」（#20621）是核心矛盾。定位 OpenAI 全场景入口。
- **Gemini CLI**：PR 侧极静（仅 2 条 pr-generation 相关），issue 集中在许可校验（#28912「无有效许可证」）、subagent 信任（#22323 误报成功）与「未充分利用 skills/sub-agents」（#21968）。成熟度中等，进入功能深化前的信任建设期。
- **GitHub Copilot CLI**：企业受管语境最明确，#3282/#3709「多 BYOK 模型、单会话内切换模型」（各 26👍）是最高频诉求；#4521「沙箱无法禁用」仍是治理痛点。近期无新发，定位企业受管环境的 Copilot 入口。
- **Kimi Code CLI**：今日仅 1 条 issue（#2615 后台 subagent 在 TaskStop/timeout 后仍调用 LLM），生态处于早期静默期，外部声量最低。
- **OpenCode**：社区贡献极活跃（78 PR），v1.18.21/20（08-21）持续推进；高赞诉求 #785「关闭流式模式」、#24153「归档会话的 unarchive/restore」。定位追求最新模型与高度可定制的开发者，provider 广度（llmgateway、QwenCloud、Vertex 等）持续扩展。
- **Qwen Code**：工业化 PR 体系成熟（82 PR），#8368 接入 Kimi/MiMo、#8332 附件音频桥、#8276 保留 prompt cache、#8992 MCP 2026 core + WebShell Apps host。定位验证严谨性与中国 IM/云生态用户。

## 5. 值得关注的趋势信号

- **贡献者驱动 vs 主干静默分化加剧**：OpenCode/Qwen 由社区 PR 洪流推动，Claude Code/Kimi 主干近乎静默，说明「开放贡献通道」正成为生态活跃度的分水岭。
- **记忆持久化是下一轮分水岭**：跨压缩记忆（Claude）、空响应误判（OpenCode）、自动记忆无限重试（Gemini #26522）三者都指向「失败可诊断、历史可回溯」的统一命题。
- **Windows 仍是未被充分满足的硬市场**：Codex 插件/安装/路径、Copilot 沙箱、Kimi 进程生命周期——后来者把 Windows 质量当一等公民即是切口。
- **provider 矩阵军备竞赛**：Kimi、MiMo、Volcengine、Dial、Mattermost 等接连被接入，多模型/多渠道正从「特色」变为「基线」。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

# Claude Code 社区动态日报（2026-08-22）

## 今日速览
- 最新发布为 **v2.1.238**（2026-08-20），前向 v2.1.237 / v2.1.236 同为该日连续更新；近 24h 内无新版本、PR 侧合入为 0，主干进入稳定打磨期。
- 社区高赞议题延续「跨压缩持久记忆」（#34556，111💬）、「多 Claude 工作流的跨会话通信」（#24798，83💬）。
- 新活跃 bug 集中在文件编码、git 代理、/rewind 与 Esc 交互细节。

## 版本发布
- [v2.1.238](https://github.com/anthropics/claude-code/releases/tag/v2.1.238)（2026-08-20，最新稳定）
- [v2.1.237](https://github.com/anthropics/claude-code/releases/tag/v2.1.237)（2026-08-20）
- [v2.1.236](https://github.com/anthropics/claude-code/releases/tag/v2.1.236)（2026-08-19）

## 社区热点 Issues（近 24h 活跃）
1. **#34556 跨上下文压缩的持久记忆**（111💬，已关闭）— 社区长期最高共鸣，用户自建 59 次压缩的记忆系统。
2. **#24798 多 Claude 工作流的跨会话通信**（26👍/83💬，已关闭）— 多 agent 协作的会话互通诉求。
3. **#7134 不尊重文件编码，破坏 Windows-1252 文件**（23👍/25💬，开放）— 编码处理跨平台回归。
4. **#76248 Cloud/Cowork 会话：git 代理现在阻断所有 push**（8👍/28💬，开放）—「不在本会话授权」误伤合法推送。
5. **#87575 Auto 模式系统提示导致 /rewind 在 Bash 编辑文件上静默失败**（12👍/10💬，开放）。
6. **#64568 按 Esc 退出 /btw 模式会拒绝待定工具调用而非仅关闭**（9👍/11💬，开放）。
7. **#63092 主会话进行中时按 Esc 不关闭 /BTW 对话**（12👍/6💬，开放）。
8. **#77071 Windows 11 Pro 计划下 Dispatch 标签从 Claude Desktop 侧边栏消失**（1👍/14💬，开放）。
9. **#78264 自定义会话标题被 AI 生成标题覆盖；/resume 分叉出重复标题**（3👍/9💬，已关闭）。
10. **#66005 --resume 丢弃会话的 --effort 级别，使 prompt cache 失效**（2👍/9💬，开放）。

## 功能需求趋势
| 方向 | 代表 Issues | 社区诉求 |
|------|-----------|---------|
| 记忆/会话 | #34556、#24798、#66005 | 跨压缩持久记忆、跨会话通信、resume 保真 |
| 编码/跨平台 | #7134、#76248 | Windows-1252 编码、git 代理不误伤 |
| TUI/交互 | #64568、#63092、#87575 | Esc 语义、/rewind 在 Auto 模式下的稳定性 |

## 开发者关注点
1. **记忆是核心资产**：#34556 以 111💬 居首，压缩后历史不可回看仍驱动用户自建方案。
2. **跨平台编码回归**：#7134 影响 Windows-1252 文件，属基础可靠性。
3. **git 代理误伤**：#76248 显示 Cowork 会话的代理策略过严，误阻断 push。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-08-22

## 今日速览
- 08-21 连发 5 个预发布：rust-v0.150.0-alpha.5/.3/.2 与 rust-v0.149.0-alpha.7.1/.4.1，Rust 重写迭代节奏快。
- 社区最高赞功能诉求 **#11626「/rewind 检查点恢复，同时回滚聊天上下文与 Codex 已应用代码」**（204👍/39💬）。
- Windows 质量仍是高频痛点（插件初始化、PSModulePath 污染、WSL 终端静默失败）。

## 版本发布（近期）
- [rust-v0.150.0-alpha.5](https://github.com/openai/codex/releases/tag/rust-v0.150.0-alpha.5)（2026-08-21）
- [rust-v0.150.0-alpha.3](https://github.com/openai/codex/releases/tag/rust-v0.150.0-alpha.3)（2026-08-21）
- [rust-v0.150.0-alpha.2](https://github.com/openai/codex/releases/tag/rust-v0.150.0-alpha.2)（2026-08-21）
- [rust-v0.149.0-alpha.7.1](https://github.com/openai/codex/releases/tag/rust-v0.149.0-alpha.7.1)（2026-08-21）
- [rust-v0.149.0-alpha.4.1](https://github.com/openai/codex/releases/tag/rust-v0.149.0-alpha.4.1)（2026-08-21）

## 社区热点 Issues（近 24h 活跃）
1. **#11626 /rewind 检查点恢复**（204👍/39💬，开放）— 最高赞功能诉求，要求回滚上下文与代码。
2. **#39136 内置浏览器插件初始化失败：Trusted RPC 依赖不在可信代码路径**（42👍/82💬，开放）— Windows 回归。
3. **#38455 ChatGPT 桌面端反复 spawn Computer Use worker 并 V8 OOM**（14👍/34💬，开放）。
4. **#27117 Windows 独立更新从 pwsh 继承 PSModulePath 进入 powershell.exe**（13👍/20💬，开放）。
5. **#38350 周期性定时任务在成功运行后自行禁用，无用户授权**（31💬，开放）。
6. **#20621 Codex App 阻止 API Key 用户使用本地/私有插件市场**（28👍/3💬，开放）。
7. **#37475 Codex CLI 0.147.0 拒绝 Amazon Bedrock 输入并破坏 subagent 交接**（22👍/6💬，开放）。
8. **#33493 本地 compaction v2 保留无界 input_image 负载，导致反复自动压缩**（5👍/20💬，开放）。
9. **#37104 Windows/WSL 集成终端在 PTY/WSL 启动前静默失败**（9👍/16💬，开放）。
10. **#39161 无法归档会话**（14👍/10💬，开放）。

## 重要 PR 进展（近 24h）
1. **#39971 修复提权的 Windows 沙箱设置激活**
2. **#39980 对远程执行强制环境网络策略**
3. **#39976 在 macOS 沙箱允许 semaphore 限制查询**
4. **#39969 合并 code mode 输出辅助测试**
5. **#39967 升级 pnpm 至 10.34.5**
6. **#39962 将 Guardian 审查与 executor MCP server 隔离**
7. **#39961 通过 executor WebSocket 测试 browser MCP bearer token**
8. **#39958 停止从本地 exec server 广播 shell 快照**
9. **#39953 支持语音感知配置与版本偏移构建**
10. **#39952 尊重所选 executor 的必需 MCP server**

## 功能需求趋势
- **可回滚的检查点**（#11626）是头号诉求：用户要的不只是聊天回滚，而是「代码+上下文」一致性恢复。
- **Windows 稳定性**仍是第一痛点平台：插件、安装包、PSModulePath、WSL 终端四处独立高赞。
- **本地/私有生态友好**：#20621 反对 API Key 用户被挡在私有插件市场之外。
- **安全收紧获肯定**：远程执行网络策略、Guardian 隔离方向正确。

## 开发者关注点
- **/rewind 是分水岭功能**：204👍 显示社区对「可撤销的编码动作」极强需求。
- **Windows 平台治理复杂度高**：从安装到运行时处处独立高赞 Issue。
- **定时任务自禁用**（#38350）暴露自动化可靠性的隐性风险。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-08-22

## 今日速览
今日发布 v0.56.0-nightly.20260821 与 v0.57.0-preview.0（08-19）；PR 侧极静（仅 2 条 pr-generation 相关）。社区焦点集中在许可校验（#28912「无有效许可证」）、subagent 信任（#22323 误报 GOAL 成功、#21409 generalist 挂起）与「未充分利用 skills/sub-agents」（#21968）。

## 版本发布
- **v0.56.0-nightly.20260821**（2026-08-21，nightly）
- **v0.57.0-preview.0**（2026-08-19，preview）
- **v0.56.0**（2026-08-19，稳定）

## 社区热点 Issues（近 24h 活跃）
1. **#21409 Generalist agent 挂起**（8👍/8💬，开放）— 代理可靠性。
2. **#28912 提示「You do not have a valid license of this product.」**（6👍/9💬，开放）— 许可校验误报。
3. **#22323 Subagent 在 MAX_TURNS 后被恢复为 GOAL 成功，隐藏中断**（2👍/13💬，开放）— 信任机制。
4. **#19873 通过零依赖 OS 沙箱化与执行后意图路由利用模型的 bash 亲和**（1👍/8💬，开放）。
5. **#22745 评估 AST 感知文件读取/搜索/映射的影响**（1👍/7💬，开放）。
6. **#15269 缺少 Subagent Hook 事件**（8💬，开放）。
7. **#25166 Shell 命令执行在完成后卡在「Waiting input」**（3👍/4💬，开放）。
8. **#24353 鲁棒的组件级评估**（7💬，开放）。
9. **#21968 Gemini 未充分利用 skills 与 sub-agents**（6💬，开放）。
10. **#26522 停止 Auto Memory 对低信号会话无限重试**（5💬，开放）。

## 重要 PR 进展（近 24h）
1. **#28951 feat(pr-generation)：新增 Cloud Run job、Workflow 编排与部署流水线**
2. **#28952 feat(pr-generation)：新增交互式 diff 对比可视化生成器**

## 功能需求趋势
- **许可与信任**：#28912 许可误报、#22323 subagent 误报成功，均削弱用户信任。
- **代理可靠性**：#21409 generalist 挂起、#25166 shell 卡死。
- **能力利用率**：#21968 呼吁更充分使用 skills/sub-agents；#26522 反对无界自动重试。

## 开发者关注点
- **subagent 行为不可预测**仍是信任短板（误报成功 + 挂起）。
- **PR 侧极静**：今日仅 2 条 pr-generation 相关，进入功能深化前的信任建设期。
- **许可校验需更精准**：#28912 误报影响开箱体验。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报 — 2026-08-22

## 今日速览
近期无新版本（最新 v1.0.81-6 为 08-14），近 24h PR 侧为 0。社区最高频诉求是 **多 BYOK 模型与单会话内模型切换**（#3282、#3709，各 26👍）与 **沙箱无法禁用**（#4521）。企业受管语境仍是核心定位。

## 版本发布
- 最新仍为 [v1.0.81-6](https://github.com/github/copilot-cli/releases/tag/v1.0.81-6)（2026-08-14，prerelease），今日无新发。

## 社区热点 Issues（近 24h 活跃）
1. **#3282 在 Copilot CLI 中添加多 BYOK 模型能力**（26👍/8💬，开放）— 最高赞功能诉求。
2. **#3709 允许 /model 在单会话内切换多个模型（含 BYOK/本地 provider）**（26👍/4💬，开放）— 与 #3282 同源诉求。
3. **#1313 Session Branching**（13👍/7💬，开放）— 会话分支管理。
4. **#4345 reasoning effort 'medium' 不支持模型 'claude-haiku-4.5'**（4👍/8💬，开放）。
5. **#4521 沙箱无法禁用**（4👍/3💬，开放）— 企业治理痛点。
6. **#4422 所有 Claude 模型在 CLI 模型选择下被禁用**（3👍/4💬，已关闭）。
7. **#4485 主题在夜间变为浅色**（2👍/2💬，开放）。
8. **#4038 非交互模式：晚连接的 MCP server 注入空用户消息**（3💬，已关闭）。
9. **#4542 工作区 .mcp.json 被 'mcp list'/'mcp get' 识别但未在实际 agent 会话中连接**（1👍/1💬，开放）。
10. **#4511 Session AIC 显示不可靠**（2💬，开放）。

## 重要 PR 进展
今日无新 PR 进入窗口。

## 功能需求趋势
- **多模型/BYOK 自由**：#3282/#3709 高赞，单会话内切换模型是企业与个人共同诉求。
- **沙箱可彻底关闭**：#4521 显示托管环境策略过严。
- **MCP 连接一致性**：#4542 工作区配置被识别但未连接，需端到端校验。

## 开发者关注点
- **模型选择自由度不足**：BYOK/本地 provider 的单会话切换是被反复呼吁的基线能力。
- **沙箱策略仍偏强制**：显式禁用无效，是企业用户核心痛点。
- **近期无新发**：主干进入稳定期，等待下一轮功能释放。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报 2026-08-22

## 今日速览
今日社区近乎静默：仅 1 条 issue 进入窗口，PR 与 releases 均为 0（最新 1.49.0 为 07-16）。相较其他 CLI 的高活跃度，Kimi Code 生态仍处于早期静默期。

## 版本发布
今日无新版本发布（最新 1.49.0，2026-07-16）。

## 社区热点 Issues
1. **#2615 后台 subagent 在 TaskStop/timeout 标记为终止后仍持续调用 LLM**（开放）— 进程生命周期治理问题。

## 重要 PR 进展
今日无更新。

## 功能需求趋势
基于连日低活跃度，社区当前重心可能在打通 ACP/IDE 基础链路与内部迭代，外部声量有限。

## 开发者关注点
- 生态早期，活跃度在 7 个 CLI 中垫底；建议关注其 ACP runtime 工具能力边界的后续修复。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-08-22

## 今日速览
发布 **v1.18.21 / v1.18.20**（2026-08-21），社区贡献极活跃——近 24h 78 个 PR 更新。高赞功能诉求 **#785「能否关闭流式模式」**（38👍/31💬）与 **#24153「归档会话的 unarchive/restore」**（11👍/9💬）。可靠性议题聚焦「空 LLM 响应导致会话静默停止」（#41469）与「随机停止响应」（#34473）。

## 版本发布
- [v1.18.21](https://github.com/anomalyco/opencode/releases/tag/v1.18.21)（2026-08-21）
- [v1.18.20](https://github.com/anomalyco/opencode/releases/tag/v1.18.20)（2026-08-21）
- [v1.18.19](https://github.com/anomalyco/opencode/releases/tag/v1.18.19)（2026-08-20）

## 社区热点 Issues（近 24h 活跃）
1. **#785 能否关闭流式模式？**（38👍/31💬，开放）— 长期高赞体验诉求。
2. **#24153 新增归档会话的 unarchive/restore**（11👍/9💬，开放）— 会话管理。
3. **#41469 空 LLM 响应导致会话静默停止（finish: unknown, 0 tokens）**（10💬，开放）— 用量统计与评测失真。
4. **#34473 OpenCode 随机停止响应**（3👍/6💬，开放）— 流式/中断语义不稳定。
5. **#37345 编辑项目：icon/color 变更未持久化到数据库**（4💬，开放）。
6. **#33219 新增 FreeBSD 支持**（2💬，已关闭）。
7. **#43882 muse-spark 流始终无 finish_reason 结束**（2💬，开放）。
8. **#43907 TUI 复制失效**（2💬，已关闭）。
9. **#41847 权限对话框未渲染，后端阻塞于不可见 prompt，应用假死**（2💬，开放）。
10. **#36196 V2 改进工具搜索命名空间、减少 tool-context cache busts**（2💬，已关闭）。

## 重要 PR 进展（近 24h 精选）
1. **#41936 fix(util)：用可配置超时约束 npm 安装**
2. **#43183 fix(tui)：使文件附件徽标在系统主题下可读**
3. **#42927 feat(tui)：在 token 用量计数与侧边栏显示上下文窗口上限**
4. **#42986 fix(shell)：扫描重定向目标以覆盖 external_directory**
5. **#42907 fix(tui)：按创建时间而非 session ID 排序子会话**
6. **#42819 fix(session)：按原始顺序边界删除回退消息并 tie-break id**
7. **#41723 fix(core)：将不支持的图片附件保留为文本而非丢弃**
8. **#42833 fix(session-ui)：防止移动端变体选择重叠**
9. **#42842 fix(i18n)：修正加泰罗尼亚语（ca）本地化并新增词汇表**
10. **#42936 feat(lsp)：为 Markdown 新增 Marksman 语言服务器**

## 功能需求趋势
- **可靠性优先**：#41469 空响应误判、#34473 随机停止，直接污染计费与评测。
- **流式体验可控**：#785 关闭流式模式是头号体验诉求。
- **会话管理**：#24153 归档恢复、#42907 子会话排序。
- **provider 广度**：llmgateway、QwenCloud、Vertex 等持续扩展。

## 开发者关注点
- **用量统计可信度**：空响应被记为干净停止（finish: unknown, 0 tokens）直接污染计费与评测。
- **贡献者生态活跃**：78 个 PR 推动 TUI、session、core 多维修复。
- **流式语义稳定**：关闭流式的诉求反映流式/中断处理仍是体验短板。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 — 2026-08-22

## 今日速览
发布 **v0.21.14-nightly.20260821** 与 v0.21.15（08-20）；近 24h PR 侧 82 个更新，工业化 PR 体系成熟。焦点 PR：**#8368 接入 Kimi 与小米 MiMo provider**（68💬）、**#8332 附件音频桥**（67💬）、**#8276 跨延迟工具发现保留 prompt cache**（64💬）、**#8992 MCP 2026 core + WebShell Apps host**（32💬）。Issue 侧热度较低（18 条，最高仅 7💬）。

## 版本发布
- [v0.21.14-nightly.20260821](https://github.com/QwenLM/qwen-code/releases/tag/v0.21.14-nightly.20260821)（2026-08-21，nightly）
- [v0.21.15](https://github.com/QwenLM/qwen-code/releases/tag/v0.21.15)（2026-08-20，稳定）

## 社区热点 Issues（近 24h 活跃）
1. **#5180 主会话作项目经理派发任务，subagent 执行到一半崩溃**（7💬，开放）— 多 agent 编排稳定性。
2. **#8993 公共扩展安装需要 Git 2.37，但 Ubuntu 22.04 apt 仅提供 2.34.1**（6💬，已关闭）— 安装门槛。
3. **#5966 0.19.3 UI 不定期错误，中文输入法完全无效**（6💬，开放）— i18n/输入法。
4. **#7167 Fleet Shepherd Dashboard**（3💬，开放）。
5. **#8094 Transport-continuation 恢复使续传 transcript 从中句开始**（3💬，已关闭）。
6. **#9571 避免确认框默认被选中**（3💬，已关闭）。
7. **#9494 流式响应时斜杠命令菜单选择重置到首项**（3💬，已关闭）。
8. **#9487 Web shell 长任务中转译与会话加载指示中途丢失**（3💬，已关闭）。
9. **#9675 会话间 MCP server 断开/不可用即使已配置**（3💬，开放）。
10. **#9693 Qwen Desktop 在 Windows 上启动即报 MCP -32000 Connection closed**（2💬，开放）。

## 重要 PR 进展（近 24h 精选）
1. **#8368 feat(auth)：新增 Kimi 与 Xiaomi MiMo provider**（68💬，开放）
2. **#8332 feat(cli)：为附件新增音频桥**（67💬，开放）
3. **#8276 fix(core)：跨延迟工具发现保留 prompt cache**（64💬，开放）
4. **#8902 fix(cli)：从共享 option 定义派生 bootstrap --help**（43💬，开放）
5. **#9513 fix(cli)：恢复 PR2A 会话行为**（38💬，开放）
6. **#9273 feat(review)：capture-tui 渲染获取像素而非散文**（32💬，开放）
7. **#8992 feat(mcp)：新增 MCP 2026 core 与 WebShell Apps host**（32💬，开放）
8. **#9526 feat(review)：新增持续关键的收敛建议（land-with-residual-risk）**（31💬，开放）
9. **#8927 feat(channels)：用 sessionRotation 约束会话生命周期**（29💬，开放）
10. **#9350 feat(dingtalk)：支持出站文件投递**（27💬，开放）

## 功能需求趋势
- **provider 广度**：Kimi、MiMo 接入（#8368），Volcengine/Mattermost 等外部生态同步扩展。
- **成本与缓存透明**：#8276 保留 prompt cache 直接关联账单可信度。
- **多模态与通道**：音频桥（#8332）、WebShell Apps host（#8992）、DingTalk 文件投递（#9350）。
- **审查自动化**：capture-tui、收敛建议、review 闭环。

## 开发者关注点
- **工业化发布门禁**：82 个 PR 的密集合入显示高度自动化的 release/CI 体系。
- **路由身份绑定用量**：#8276 保留 prompt cache 提升计费可信度。
- **多 agent 编排稳定性**：#5180 subagent 中途崩溃需关注。

</details>

---

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills) | 近 24h 活跃

- **#1620 / #1625 Shell 命令注入：with_server.py 的 --server 参数使用 shell=True**（#1620 已关闭，#1625 开放）— 技能元数据/示例脚本的安全隐患。
- **#1624 claude-api 的 SKIP grep 未锚定——`cohere` 匹配 "coherent"，在含相关词的仓库中误禁用技能**（开放）。
- **#1622 claude-api skill 的 description 超过 1024 字符 frontmatter 上限（1077 字符）**（开放）。
- **#1621 / #1619 MCPConnectionSSE/HTTP 与 MCPConnectionStdio 接受调用方提供的任意 URL/headers/command**（开放）— MCP 连接器的供应链安全风险。
- **#1627 feat：新增 buffer-api Agent Skill（Buffer GraphQL 调度）**（开放）。
- **#1623 更新 claude-api skill：Python SDK 0.x → 1.x 升级指南**（已关闭）。

Skills 生态今日节奏聚焦**安全审计**（命令注入、MCP 任意命令执行）与单点修复，无大规模架构讨论。

---

*本日报由 [agents-radar](https://github.com/huang-yi-dae/agents-radar) 自动生成，所有内容基于 GitHub 公开 API 实时抓取并由执行代理人工撰写，未调用任何外部大模型。*
