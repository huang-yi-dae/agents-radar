# AI CLI 工具社区动态日报 2026-08-21

> 生成时间: 2026-08-21 02:30 (GMT+8) | 覆盖工具: 7 个 CLI + Claude Code Skills
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

# AI CLI 工具社区动态横向对比分析报告（2026-08-21）

## 1. 生态全景

AI CLI 工具进入「日更竞争」阶段：今日 Claude Code、OpenAI Codex、Gemini CLI、GitHub Copilot CLI、OpenCode、Qwen Code 均有版本发布，IronClaw / EasyClaw / Moltis / CoPaw 等周边生态也同步出新。社区诉求的焦点从「模型能力」进一步转向「工程可信度与平台质量」——Windows 平台问题（Codex 尤为突出）、TUI 终端交互细节、上下文压缩后的记忆持久化、以及沙箱/权限的最小信任边界，成为跨工具共通的痛点。一个明显趋势是：**自动化 bot 正在深度参与各工具的发布质量门禁**（Codex 的 `copyberry[bot]`、Qwen 的 `qwen-code-review-bot`、OpenCode 的 `opencode-agent` 等），修复与发布的频次被显著拉高，但外部人类社区的声量分化加剧。

## 2. 各工具活跃度对比（近 24h）

| 工具 | 活跃 Issues | 重要 PR | Releases（今日） |
|------|-----------|--------|----------------|
| Claude Code | 12+（高赞集中） | 0 | v2.1.236 / v2.1.237 |
| OpenAI Codex | 12（Windows 主导） | 12+（bot 驱动） | rust-v0.149.0-alpha.4 / .3 / .2 / .1 |
| Gemini CLI | 16 | 12+ | v0.56.0（稳定）/ v0.57.0-preview.0 |
| GitHub Copilot CLI | 14+ | 1 | v1.0.81-6 / -5 / -4 / -3 / -2 |
| Kimi Code CLI | 0 | 0 | 无 |
| OpenCode | 14 | 12+ | v1.18.19 |
| Qwen Code | 0（issue） | 12+ | v0.21.15 |

## 3. 共同关注的功能方向

- **Windows / 跨平台质量**：OpenAI Codex 的 Windows 冻结（#20214，86👍/107💬）、独立安装包诉求（#13993，242👍）、Trusted RPC 浏览器插件失败（#39136）持续高赞；Copilot CLI 的 `wta.exe` 路径引号错误（#4540）与沙箱阻断 git（#4524）；OpenCode 此前暴露的 `/tmp` 泄漏、Sidecar 超时等仍被社区引用。Windows 是第一大痛点平台。
- **TUI / 终端交互稳定性**：Claude Code 复制粘贴缩进污染（#18170，287👍/134💬）仍是社区最高频诉求；OpenCode 的剪贴板写入静默失败修复（#41924）仍在开放；Gemini CLI 的滚动/渲染（#13107、#10673）与拖拽图片（#27855）被持续提出。
- **上下文与跨压缩记忆**：Claude Code 用户自建跨压缩记忆系统（#34556，98💬）热度不减；OpenCode 的「中断流被记为干净停止」（#37852，56👍）暴露 subagent 用量统计失真；Gemini 的 subagent 误报成功（#22323）仍在讨论。
- **权限 / 沙箱最小信任**：Copilot CLI 沙箱策略过度强制（#4524）、`store_memory` 在 1.0.81 失败（#4535）、非交互模式绕过 managed settings（#4103）构成企业治理语境的核心争议；Codex 收紧 Git 命令信任、隔离插件 Git 操作等安全 PR 方向清晰。
- **模型兼容性与成本透明**：Codex GPT-5.6 串行化导致 27–45% 额外用量（#35050，72👍）；OpenCode 的 gpt-5.6 系列参数注入/空响应问题（昨日 #43367/#43565）仍在被引用；Qwen Code 路由切换后 token 计数失效（#9506）已修复并绑定路由身份。
- **自动化发布质量门禁**：Codex `copyberry[bot]` 今日批量合入 12+ PR（模型定义刷新、shell 统一执行、MCP 事件流等）；Qwen `qwen-code-review-bot` 发布 v0.21.15；OpenCode `opencode-agent` 持续提交。AI 已深度参与自身软件工程。

## 4. 差异化定位

- **Claude Code**：社区期望最高、反馈最尖锐，复制粘贴/快捷键/输出展开等体验细节被零容忍审视；v2.1.237 新增「Concise」输出风格与 prompt caching 修复，定位专业开发者日常主力终端。PR 侧近 24h 静默，意味着主干进入稳定打磨期。
- **OpenAI Codex**：Rust 重写持续推进，bot 驱动发布节奏快；Windows 质量与桌面端集成（Computer Use、浏览器插件）是最突出短板。安全方向（Git 信任收紧、插件隔离）获社区肯定，定位 OpenAI 全场景入口。
- **Gemini CLI**：稳定版/预览版分轨清晰，PR 以安全加固（Cloud Workstations OAuth、IDE 连接、环境变更同意）与模型接入（Gemini 3.6/3.7 Flash）为主，成熟度中上。
- **GitHub Copilot CLI**：企业受管语境最明确，managed settings 强制、沙箱、数据驻留、审计是核心；今日 v1.0.81-6 新增 `defaultMode`/`defaultPermissionMode` 与 `--with-token` 登录，ACP 客户端获得 subagent ID 等能力。定位企业受管环境的 Copilot 入口。
- **Kimi Code CLI**：今日零动态（issues/PRs/releases 全空），生态处于早期静默期。
- **OpenCode**：社区贡献极活跃，v1.18.19 新增 Cloudflare AI Gateway 原生透传、对齐 Codex 速率限制、Go provider 启用 web 搜索；问题集中在 TUI 数据丢失级缺陷与 gpt-5.6 兼容性。定位追求最新模型与高度可定制的开发者。
- **Qwen Code**：v0.21.15 强化 Web Shell 文件附件、混合模型 Thinking 开关、`/review --resume`、鉴权 HTTPS Git 扩展安装，工业化的 release/CI bot 体系成熟，定位验证严谨性与中国 IM/云生态用户。

## 5. 值得关注的趋势信号

- **Windows 是未被充分满足的硬市场**：Codex 冻结/安装包/插件、Copilot 路径引号、Gemini Browser agent 跨显示协议失败——后来者若把 Windows 质量当作一等公民，是差异化切口。
- **TUI 基础体验成为选型硬指标**：复制粘贴、滚动、拖拽图片等「小问题」占据各工具高赞榜，真实终端环境（WSL、Ghostty、Windows Terminal）可用性测试应优先于模型能力对比。
- **记忆持久化是下一轮分水岭**：压缩后历史可回溯 + 隐私安全 + 可控，三件事同时做好的工具有望建立长期粘性。
- **自动化发布门禁双刃剑**：bot 提速修复，但也让外部人类贡献者声量被稀释，对人工审查机制提出新要求。
- **模型行为变更直接关联账单**：GPT-5.6 串行化带来额外用量（#35050），开发者应「先小规模验证成本再大规模切换」，并要求工具提供路由身份绑定的用量统计。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

# Claude Code 社区动态日报（2026-08-21）

## 今日速览
- 发布 v2.1.237 与 v2.1.236：v2.1.237 带来内置「Concise」输出风格并修复自定义 base URL 下的 prompt caching；v2.1.236 新增 `ANTHROPIC_DEFAULT_MODEL`、跨会话 `notify_when_idle`、macOS 沙箱通配读拒绝规则强化及多项渲染/会话修复。
- 社区高赞问题持续集中在终端复制粘贴（#18170，287👍/134💬）、多账号切换（#36151，847👍）、跨压缩记忆（#34556，98💬）。
- PR 侧近 24h 静默（0 条合并/更新），主干进入稳定打磨期。

## 版本发布
**v2.1.237**
- 修复：使用 LLM 网关或自定义 base URL 的会话中 prompt caching 失效。
- 新增：内置「Concise」输出风格——Claude 直接给结果、跳过开场白与叙述，同时保持同等的执行深度，可在 `/config` 的 Output style 下选择。

**v2.1.236**
- 新增 `ANTHROPIC_DEFAULT_MODEL` 环境变量（设定新会话起始模型，`/model` 可覆盖且重启保持，区别于 `ANTHROPIC_MODEL`）。
- 新增跨会话 `SendMessage` 的 `notify_when_idle`（macOS/Linux，opt-in 一次性通知）。
- 沙箱（macOS）：通配读拒绝规则（如 `**/.env`）在允许读区域内优先、覆盖匹配目录内容且不可通过重命名绕过。
- 修复：切换目录被删除后剪贴板复制/后台会话/本地 MCP 日志损坏（自 2.1.229）；全屏渲染器单次启动失败后回退经典渲染器；`/model` 选择器超高时只显示适配行数；SendMessage 畸形闭合标签拒绝；WSL 下 `powershell.exe` 未启动时的未处理 promise 拒绝；全屏模式新消息不刷新等。

## 社区热点 Issues（近 24h 活跃）
1. **#6235 [FEATURE] 支持 AGENTS.md**（6335👍）— 社区长期最高赞功能诉求，呼吁原生支持项目级 `AGENTS.md` 指令文件。
2. **#36151 多账号切换**（847👍/开放）— 希望在 Claude Mobile 中无需共享邮箱即可切换多账号。
3. **#18170 终端复制粘贴混入缩进与行尾空格**（287👍/134💬）— 社区最高频 TUI 痛点，影响将结果移入编辑器的工作流。
4. **#84352 CVP 已批准的组织仍被 cyber safeguard 拦截**（21👍/130💬）— 企业合规场景的误杀问题。
5. **#60705 /goal Stop-hook 被当作越权授权**（127💬）— hook 指令边界与安全的讨论。
6. **#10199 API Error 400 Thinking Block 修改错误**（65👍/100💬）— 思考块相关 API 调用稳定性。
7. **#34556 跨压缩持久记忆**（98💬）— 用户自建记忆系统，社区共鸣强烈。
8. **#4953 内存泄漏至 120GB 被 OOM 杀死**（75👍/97💬）— 进程资源管理长期隐患。
9. **#32479 GitHub Connector 在 Desktop 已连但 CLI 不识别**（140👍/89💬）— 连接器状态一致性。
10. **#22543 Cowork 创建 10GB VM 包拖慢性能**（259👍/76💬）— 资源占用。
11. **#79337 Fable 5 提示需用量积分**（26👍/75💬）— 计费/权益相关。
12. **#63875 模型工具调用无法解析（重试也失败）反复打断会话**（116👍/75💬）— 解析稳定性。

## 功能需求趋势
| 方向 | 代表 Issues | 社区诉求 |
|------|-----------|---------|
| 项目级指令 | #6235、#60705 | 原生 AGENTS.md、hook 指令边界清晰 |
| TUI 交互 | #18170、#4953 | 复制粘贴干净、内存可控 |
| 账户/组织 | #36151、#84352、#32479 | 数据驻留、连接器一致性 |
| 资源/性能 | #22543、#4953 | VM 包瘦身、泄漏治理 |

## 开发者关注点
1. **复制粘贴仍是最大痛点**：#18170 以 287👍居首，直接冲击核心工作流。
2. **跨压缩记忆成黑匣子**：#34556 反映压缩后历史不可回看，用户被迫自建系统。
3. **资源与健康度**：内存泄漏（#4953）、10GB VM（#22543）影响长时间使用信心。
4. **企业合规误杀**：#84352 显示已批准组织仍被拦截，合规规则需更精细。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-08-21

## 今日速览
- 发布 rust-v0.149.0-alpha.4（及 .3/.2/.1 系列），release note 为占位格式，具体变更见对应 tag 的 commit。
- 社区 Windows 平台问题继续主导：App 冻结（#20214，86👍/107💬）、独立安装包诉求（#13993，242👍）、Trusted RPC 浏览器插件失败（#39136，82💬）。
- `copyberry[bot]` 批量合入 12+ PR，覆盖模型定义刷新、shell 统一执行、MCP 事件流、权限档案选择等。

## 版本发布
- [rust-v0.149.0-alpha.4](https://github.com/openai/codex/releases/tag/rust-v0.149.0-alpha.4) — 2026-08-20
- [rust-v0.149.0-alpha.3](https://github.com/openai/codex/releases/tag/rust-v0.149.0-alpha.3) — 2026-08-20
- [rust-v0.149.0-alpha.2](https://github.com/openai/codex/releases/tag/rust-v0.149.0-alpha.2) — 2026-08-19
- [rust-v0.149.0-alpha.1](https://github.com/openai/codex/releases/tag/rust-v0.149.0-alpha.1) — 2026-08-19

## 社区热点 Issues（近 24h 活跃）
1. **#20214 Windows 11 上频繁冻结/卡顿**（86👍/107💬）— 资源充足仍卡顿，最高讨论度。
2. **#28969 增加关闭 60 秒自动 resolve 的设置**（201👍/83💬）— 提问自动解决过激。
3. **#39136 内置浏览器插件初始化失败：Trusted RPC 依赖不在可信代码路径**（42👍/82💬）— Windows 回归。
4. **#13993 支持独立 Windows 安装包 `codex-setup.exe`**（242👍/79💬）— 安装体验诉求。
5. **#39397 0.148 对 gpt-5.6-sol 发送 prompt_cache_retention 致每轮失败**（37👍/41💬）— 模型参数注入。
6. **#30009 apply_patch 因 Windows 沙箱相关错误失败**（11👍/34💬）。
7. **#28507 所选模型容量已满**（33👍/33💬）— 容量与配额。
8. **#38455 ChatGPT 桌面端 Computer Use worker 反复 spawn 并 V8 OOM**（13👍/32💬）。
9. **#25178 Windows 10 22H2 Computer Use 截图失败**（15👍/28💬）。
10. **#39239 `thread/archive` 因 `\\?\` 路径失败**（3👍/26💬）。
11. **#39162 macOS 打开旧会话使 ChatGPT 认证失效**（18👍/25💬）。
12. **#35050 GPT-5.6 串行化工具调用，显式批处理降低 27–45% 加权用量**（72👍/25💬）。

## 重要 PR 进展（近 24h，`copyberry[bot]` 主导）
1. **#39770 刷新内置模型定义**
2. **#39765 在插件安装元数据中包含 suggestion IDs**
3. **#39761 增加 app-server MCP 事件流**
4. **#39757 将 shell 执行统一到 unified exec**
5. **#39756 在 exec server 中缓存 shell 快照**
6. **#39755 将 managed developer instructions 加入 requirements**
7. **#39752 暴露未编译的权限档案选择**
8. **#39749 要求文件系统后端实现目录遍历**
9. **#39746 从 executors 刷新 resumed thread 的 capability roots**
10. **#39744 对短 composer 输入跳过后处理**
11. **#39741 使用模型特定的 auto-review 结果指令**
12. **#39738 遵从模型默认中的 Guardian runtime 设置**

## 功能需求趋势
- **Windows 稳定性是第一诉求**：冻结、安装包、Trusted RPC、沙箱、Computer Use 截图等问题密度最高。
- **成本与用量可控**：GPT-5.6 串行化（#35050）放大上下文与账单，社区希望更透明。
- **交互尊重用户节奏**：60 秒自动 resolve（#28969）被高赞反对，需可关闭。
- **安全边界收紧获肯定**：Git 命令不再默认安全、插件 Git 隔离方向正确。

## 开发者关注点
- **Windows 是最大痛点平台**：从安装到运行时处处是独立高赞 Issue。
- **容量/配额焦虑**：模型满载（#28507）与额度（#39397 之外的计费讨论）并存。
- **bot 提速发布但需人工审查**：`copyberry[bot]` 高频合入，质量门禁依赖自动化测试覆盖。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-08-21

## 今日速览
今日发布 v0.56.0 稳定版、v0.57.0-preview.0 预览版；PR 围绕 Cloud Workstations OAuth、IDE 连接修复、环境变更同意、Gemini 3.6/3.7 Flash 模型接入、subagent 误报修复等。社区高赞问题集中在公开路线图（#4191，173👍）、V1.0 后工作（#3132，150👍）与模型可用性（#28802，40👍）。

## 版本发布
- **v0.56.0（稳定版）**：完整变更见 [v0.55.1...v0.56.0](https://github.com/google-gemini/gemini-cli/compare/v0.55.1...v0.56.0)。
- **v0.57.0-preview.0**：动态解析 Cloud Workstations 代理重定向 URI 修复 OAuth（[#28688](https://github.com/google-gemini/gemini-cli/pull/28688)）；修复 IDE 连接目录不匹配被静默吞掉（[#28729](https://github.com/google-gemini/gemini-cli/pull/28729)）；eval 校验与工具调用格式化（[#28344](https://github.com/google-gemini/gemini-cli/pull/28344)、[#28305](https://github.com/google-gemini/gemini-cli/pull/28305)）；上下文感知静默重试与可用性 TTL（[#28790](https://github.com/google-gemini/gemini-cli/pull/28790)）；取消/中止时回滚整个多轮请求（[#28801](https://github.com/google-gemini/gemini-cli/pull/28801)）。

## 社区热点 Issues（近 24h 活跃）
1. **#4191 公开路线图**（173👍）— 社区希望透明的产品规划。
2. **#3132 V1.0 之后工作**（150👍/45💬）— 后发布路线图讨论。
3. **#28802 最新 Gemini 模型（Flash 3.5/3.6/3.7）已可用**（40👍/10💬）— 模型接入反馈。
4. **#27393 命令替换块应可用户配置而非硬编码墙**（19💬）。
5. **#28052 antigravity.google URL 末尾句点导致链接无法加载**（14💬）。
6. **#22323 Subagent MAX_TURNS 后误报 GOAL 成功**（12💬）— 信任机制。
7. **#21409 Generalist agent 挂起**（8👍/8💬）。
8. **#27855 原生终端拖拽与图片拖放（多模态对齐）**（8💬）。
9. **#19873 零依赖 OS 沙箱化与执行后意图路由**（8💬）。
10. **#22745 AST 感知文件读取/搜索/映射的影响评估**（7💬）。

## 重要 PR 进展（近 24h）
1. **#28932 Antigravity agent runner 与异步流解析（pr-generation）**
2. **#28915 修复 ignore 路径处理中 symlink 评估一致性**
3. **#28931 明确全局 npm 安装的默认稳定发布通道**
4. **#28863 环境变更需用户同意并清理影响运行时行为的环境变量**
5. **#28933 迭代式编排状态机（pr-generation）**
6. **#28867 防止 agents 模式禁用时 subagent 运行**
7. **#28910 新增 Gemini 3.7 Flash / 3.6 Flash 模型配置与选择**
8. **#28828 预览模型被静默替换时告警**
9. **#28926 Windows longpaths 设置说明**
10. **#28917 Whisper 模型原子下载与失败清理**

## 功能需求趋势
- **路线图透明**：#4191/#3132 高赞，社区要清晰规划。
- **代理可靠性**：subagent 误报成功（#22323）、generalist 挂起（#21409）。
- **多模态终端体验**：图片拖放（#27855）、AST 感知读取（#22745）。
- **安全与一致性**：环境变更同意（#28863）、symlink 评估（#28915）、预览模型替换告警（#28828）。

## 开发者关注点
- **subagent 行为不可预测**仍是信任短板。
- **多模态与本地化体验**（拖拽图片、Windows longpaths）被持续提出。
- **模型可用性反馈积极**（#28802），Gemini 3.x Flash 系列接入预期高。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报 — 2026-08-21

## 今日速览
今日连发 v1.0.81-2 至 v1.0.81-6 五个 prerelease。v1.0.81-6 新增 `defaultMode`/`defaultPermissionMode` 设置、`--with-token` 登录，ACP 客户端获得 subagent ID 与实时标题/模式/命令/计划更新，Canvas 窗口改为后台打开不抢焦点。社区层面，`store_memory` 在 1.0.81 失败（#4535）、沙箱阻断 git（#4524）等治理类问题仍被引用；PR 侧仅 1 条（`#4510` 移除 README 中的 Copilot CLI 文档，来自外部账户）。

## 版本发布（今日）
- **[v1.0.81-6](https://github.com/github/copilot-cli/releases/tag/v1.0.81-6)** — 新增 `defaultMode`/`defaultPermissionMode`（新交互会话的启动模式与审批行为）、`--with-token` 从 stdin 读取 auth token；ACP 客户端获得 subagent IDs、原始事件订阅、实时标题/模式/命令/计划更新；`/instructions` 分文件展示；managed settings 对 enabledPlugins/extraKnownMarketplaces 逐条胜出；Canvas 窗口后台打开刷新。
- v1.0.81-5 / -4 / -3 / -2 — 官方标注 “Fixes and changes”。

## 社区热点 Issues（近 24h 活跃）
1. **#4535 `store_memory` 在 v1.0.81 prerelease 失败：`Instance id is required`**（开放）— 记忆持久化回归。
2. **#4524 沙箱禁止 copilot 使用 git**（已关闭）— 沙箱策略误伤。
3. **#4103 插件 marketplace 克隆禁用 Git credential helpers，破坏私有 HTTPS 仓库**（开放）— 非交互模式安全边界。
4. **#4540 `wta.exe` 启动失败 0x80070002：路径引号错位破坏 "Program Files"**（开放）— Windows 路径处理。
5. **#4447 Backspace 一次删一个词**（开放）— 终端输入体验。
6. **#4503 SDK server 未鉴权即报 ready，Slack 会话创建泛型失败**（已关闭）。
7. **#4439 1.0.79 拒绝 GitLab MCP OAuth 元数据（RFC 8414 issuer 不匹配）**（已关闭）。
8. **#4390 组织启用模型缺失（Claude Sonnet 5/Opus 5、Kimi K3）**（已关闭，15💬）。
9. **#4096 第三方 MCP 显示 Connected 但工具缺失**（已关闭）。
10. **#4206 内置 GitHub MCP 握手停滞时环境页卡在 Loading**（已关闭）。

## 重要 PR 进展
- **#4510 从 README 移除 GitHub Copilot CLI 文档**（@prioritizedprotection086，开放）— 外部账户提交，疑似清理/更名动作。

## 功能需求趋势
- **企业治理可控性**：沙箱可彻底关闭、managed settings 生效范围、`store_memory` 可靠。
- **MCP/ACP 稳定性**：第三方 MCP 工具缺失、OAuth issuer 校验、SDK server 鉴权时序。
- **Windows 路径与输入**：`wta.exe` 引号、Backspace 行为。
- **私有仓库友好**：Git credential helpers 不被禁用。

## 开发者关注点
- **沙箱策略仍偏强制**：显式禁用无效、误伤 git，是企业用户核心痛点。
- **`store_memory` 回归需尽快修复**：记忆能力在 1.0.81 不可用。
- **文档/命名清理**：#4510 暗示文档或品牌调整。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报 2026-08-21

## 今日速览
今日社区完全静默：issues、PRs、releases 均为 0。相较昨日仅有的 ACP Grep/Glob 限制问题（#2609，已关闭），今日无新增动态，生态仍处于早期静默期。

## 版本发布
今日无新版本发布。

## 社区热点 Issues
今日无更新。

## 重要 PR 进展
今日无更新。

## 功能需求趋势
基于连日低活跃度，社区当前重心可能在打通 ACP/IDE 基础链路与内部迭代，外部声量有限。

## 开发者关注点
- 生态早期，活跃度在 7 个 CLI 中垫底；建议关注其 ACP runtime 工具能力边界的后续修复。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-08-21

## 今日速览
发布 v1.18.19：新增 Cloudflare AI Gateway 的 OpenAI/Anthropic 原生透传、对齐 Codex 速率限制、移除会发送不支持设置的 Qwen 采样默认值、Go provider 启用 web 搜索等。社区侧 14 个 Issue 活跃，焦点延续 TUI 数据丢失级缺陷、subagent 中断流被记为干净停止（#37852，56👍）、gpt-5.6 兼容性、以及异步 sub-agent 委派（#5887，98👍）等长期诉求。PR 侧 12+ 更新，贡献者驱动特征明显。

## 版本发布
**[v1.18.19](https://github.com/anomalyco/opencode/releases/tag/v1.18.19)**
- Core：新增 Cloudflare AI Gateway 模型的 OpenAI/Anthropic 原生透传；更贴近 ChatGPT 订阅限制地对齐 Codex 速率限制。
- Bugfix：移除会发送不支持设置的 Qwen 采样默认值；`/connect` 正确展示已鉴权 provider；忽略畸形模型定价而非破坏用量计算；OpenAI websocket 超消息大小限制时回退；转发 ChatGPT workspace 计算驻留到 Codex 请求；更新账户连接默认 Console URL；Go provider 启用 web 搜索；兼容现有 v1 数据库。
- Desktop：server 对话框中已保存的 server 详情可编辑。

## 社区热点 Issues（近 24h 活跃）
1. **#5887 真正的异步/后台 Sub-Agent 委派**（98👍/26💬）— 长期高赞功能诉求。
2. **#37852 中断的 provider 流被记为干净停止（finish=unknown，零用量，无文本）**（56👍/19💬）— subagent 用量统计失真。
3. **#11865 Codex/OpenAI 的 Tasks/Subagents 频繁卡死无超时/重试**（19💬）— 可靠性。
4. **#27906 v1.15.1+ 破坏 Bun 安装**（16💬）— 安装回归。
5. **#7006 `permission.ask` 插件 hook 已定义但不触发**（23👬）— 权限钩子。
6. **#13626 Web UI 从 server 自动同步项目**（26💬）— 项目同步。
7. **#11232 原生调度（Native Scheduling）**（33💬，已关闭）— 已落地或被采纳。
8. **#10531 原生多模态上下文支持（视频/音频）**（16💬，已关闭）。
9. **#25848 会话重命名**（13💬）。
10. **#29462 Skills 工具无上限枚举所有 skill 进系统提示**（12💬，已关闭）。

## 重要 PR 进展（近 24h）
1. **#40310 新增 llmgateway-providers provider**（@smakosh）
2. **#43674 新增 QwenCloud International provider**（@navegantesjr）
3. **#43574 配置的模型变体兜底**（@rekram1-node）
4. **#43123 向模型暴露结构化内容（MCP）**（@mcostasilva）
5. **#40857 实例查找前拒绝外部目录提示**（@romanilyin）
6. **#43664 保留模型 ID 中斜杠以兼容 legacy server 解析**（@StreamOfRon）
7. **#43665 从循环退出条件排除 'unknown' finish**（@madebysaira）
8. **#41924 TUI 暴露剪贴板写入失败而非假成功**（@aishangwuji）
9. **#43498 保留 Vertex Anthropic 工具续接**（@major）
10. **#43695/#43690 Ox Alpha 免费模型 ID 文档对齐**（@MrMushrooooom）

## 功能需求趋势
- **可靠性优先**：subagent 卡死/中断统计失真（#11865、#37852）是社区最高频痛点。
- **provider 广度**：llmgateway、QwenCloud、Vertex 等持续扩展。
- **TUI 体验**：剪贴板失败暴露（#41924）、项目自动同步（#13626）。
- **多模态与调度**：原生多模态（#10531）、原生调度（#11232）已被讨论并部分落地。

## 开发者关注点
- **用量统计可信度**：中断流被记为干净停止直接污染计费与评测。
- **安装与兼容性回归**：Bun 安装（#27906）、模型 ID 斜杠解析（#43664）需谨慎。
- **贡献者生态活跃**：大量社区 PR 推动 provider 与 TUI 修复。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 — 2026-08-21

## 今日速览
发布 v0.21.15：Web Shell 支持文件附件插入、混合模型 Thinking 开关、`/review --resume`、鉴权 HTTPS Git 扩展安装、工具审批改为底部抽屉式。近 24h issue 侧无新增（0），但 PR 侧 12+ 更新，工业化 release/CI bot（`qwen-code-review-bot`）体系成熟。

## 版本发布
**[v0.21.15](https://github.com/QwenLM/qwen-code/releases/tag/v0.21.15)**
- Web Shell 支持通过 composer 或 @ 选择插入文件附件，流式性能提升，侧边栏即时同步（[#9405](https://github.com/QwenLM/qwen-code/pull/9405)、[#9477](https://github.com/QwenLM/qwen-code/pull/9477)、[#9570](https://github.com/QwenLM/qwen-code/pull/9570)、[#9533](https://github.com/QwenLM/qwen-code/pull/9533)）。
- Qwen 混合模型暴露简单 Thinking 开关，稳定版 qwen3.8-max 可在 `/model` 选择（[#9574](https://github.com/QwenLM/qwen-code/pull/9574)、[#9383](https://github.com/QwenLM/qwen-code/pull/9383)）。
- `--resume` 支持 `/review` 与 CI 重试，在 PR head 未移动时继续中断的审查（[#9153](https://github.com/QwenLM/qwen-code/pull/9153)）。
- 支持鉴权 HTTPS Git 扩展安装，凭证持久化可配置（[#9458](https://github.com/QwenLM/qwen-code/pull/9458)）。
- 工具审批/询问对话框改为与聊天宽度对齐的底部抽屉（[#9351](https://github.com/QwenLM/qwen-code/pull/9351)）。
- 修复 `/rewind` 错误丢弃对话历史、重复 tool-call ID 导致执行错误（[#9331](https://github.com/QwenLM/qwen-code/pull/9331)、[#9436](https://github.com/QwenLM/qwen-code/pull/9436)）。

## 社区热点 Issues
近 24h 无新 issue 进入窗口（stats 显示 0 条更新）。此前的活跃议题（Web Shell 剪贴板、ACP 多会话日志串扰、DingTalk 引用消息）已在昨日被修复 PR 跟进。

## 重要 PR 进展（近 24h 精选）
1. **#9332 `/review` 一键导入扩宽合入 `fetch-pr --since`**（@wenshao）
2. **#9190 内容锚定的增量 review-fix 循环**（@wenshao）
3. **#9513 恢复被 PR2A 身份收紧收窄的行为**（@doudouOUC）
4. **#9500 同步已加载 skill 状态与历史驱逐**（@ZijianZhang989）
5. **#9606 chore(release): v0.21.15**（@qwen-code-review-bot）
6. **#9590 provider 感知的推理控制**（@callmeYe）
7. **#7803 agent view roster UI**（@ZijianZhang989）
8. **#9392 让 channel worker 可达 TLS 启用的 daemon**（@qqqys）
9. **#9526 持续关键的收敛建议（land-with-residual-risk）**（@wenshao）
10. **#9530 选择遗忘候选时不限扫描**（@harjothkhara）
11. **#9577 release CI 禁用安装脚本并加固安全校验 workflow**（@yiliang114）
12. **#9568 在 banner 标记预估压缩 token 数**（@yiliang114）

## 功能需求趋势
- **Web Shell 体验**：文件附件、流式、侧边栏同步是前端主线。
- **审查自动化**：`/review` 增量循环、收敛建议、CI 重试。
- **provider 与推理控制**：混合模型 Thinking 开关、provider 感知推理。
- **记忆与 skill 一致性**：加载状态与历史驱逐同步（#9500）。

## 开发者关注点
- **工业化发布门禁**：`qwen-code-review-bot` 驱动 v0.21.15，质量门禁高度自动化。
- **路由身份绑定用量**：此前 #9506 已落地，计费可信度提升。
- **安全收紧后的行为补偿**：#9513 恢复被身份收紧误伤的合法行为。

</details>

---

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills) | 近 24h 活跃

- **#1613 claude-api frontmatter description 超过 1024 字符限制**（1💬，开放）— 技能元数据长度约束问题。
- **#1616 修复 claude-api description 限制**（@BRGOVIND，开放）— 对应 #1613 的修复 PR。
- **#1615 新增 scnet-hpc skill**（@lql341，开放）— HPC 场景技能。
- **#1614 新增 web-security-audit skill**（@cnbruce，开放）— Web 安全审计技能。
- **#807 新增 x-twitter-scraper：X 数据 API 技能**（@kriptoburak，已合并）— 社交媒体数据抓取技能。

Skills 生态今日节奏平稳，以单点 bug 修复与新增技能为主，无大规模架构讨论。

---

*本日报由 [agents-radar](https://github.com/huang-yi-dae/agents-radar) 自动生成，所有内容基于 GitHub 公开 API 实时抓取并由执行代理人工撰写，未调用任何外部大模型。*
