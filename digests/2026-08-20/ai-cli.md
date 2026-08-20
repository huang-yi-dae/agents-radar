# AI CLI 工具社区动态日报 2026-08-20

> 生成时间: 2026-08-20 04:55 UTC | 覆盖工具: 7 个

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

# AI CLI 工具社区动态横向对比分析报告（2026-08-20）

## 1. 生态全景

AI CLI 工具已进入高频迭代与精细化竞争阶段：Claude Code、OpenAI Codex、Gemini CLI、GitHub Copilot CLI、Qwen Code 在 24 小时内均有版本发布，OpenCode 与 Qwen Code 各有 50 条 PR 动态。社区反馈重心正从“模型能力”转向“工程可信度”——TUI 交互细节、权限沙箱边界、上下文压缩后的数据可访问性、MCP/ACP 协议稳定性成为跨工具共通的痛点。安全加固显著提速：Git 命令默认信任被移除、MCP 配置 fail-open 漏洞修复、插件 Git 操作隔离等在同日合入。与此同时，Windows 平台问题（尤其 OpenAI Codex）与 gpt-5.6 系列新模型的兼容性/成本问题，正在成为用户流失的高风险点。

## 2. 各工具活跃度对比

| 工具 | 热点/活跃 Issues | 重要 PR 动态 | Releases（今日） |
|------|----------------|-------------|----------------|
| Claude Code | 12（Top 10 + 2 补充） | 1 | v2.1.236 / v2.1.237 |
| OpenAI Codex | 10 | 10 | rust-v0.149.0-alpha.2 / alpha.3 |
| Gemini CLI | 10 | 10 | v0.56.0 稳定版、v0.57.0-preview.0、nightly |
| GitHub Copilot CLI | 10 | 0 | v1.0.81-3 / -4 / -5 |
| Kimi Code CLI | 1（已关闭） | 0 | 无 |
| OpenCode | 18 更新 | 50 更新 | 无 |
| Qwen Code | 6 活跃 | 50 更新 | v0.21.14（dsw-eas-full-20260820-r1） |

## 3. 共同关注的功能方向

- **TUI / 终端交互稳定性**：Claude Code 复制粘贴混入缩进（#18170，286👍/134 评论）、输出截断不可展开（#26954）、Ghostty 快捷键失效（#18157）；OpenCode 输入内容被静默销毁（#43563）、标签页无法关闭（#43553）、/tmp 泄漏导致启动失败（#42700）；GitHub Copilot CLI TUI 死锁（#4533）；Qwen Code Web Shell 剪贴板在非 localhost HTTP 环境失效（#9485）。基础交互问题成为社区最高频诉求。
- **权限与安全边界**：GitHub Copilot CLI ACP 模式自动批准工具调用（#4537）、沙箱策略未决时强制启用（#4522）、非交互模式绕过 managed settings（#4528）；Gemini CLI 修复 MCP 配置损坏 fail-open（#28794）、扩展环境变量注入需用户同意（#28863）；OpenAI Codex 不再默认信任 Git 命令（#39524）、隔离自动插件 Git 操作（#39520）；Claude Code 引号命令权限误报（#27957）、会话级 acceptEdits 不持久（#12070）。
- **上下文管理与跨压缩记忆**：Claude Code 压缩后历史不可回看（#27242）、用户自建跨压缩记忆系统（#34556，95 评论）、上下文用量显示不准确（#6616）；Gemini CLI Auto Memory 脱敏前置化与日志隐私争议（#26525）、低信号 session 无限重试（#26522）；OpenAI Codex 本地压缩 v2 保留无界 input_image 导致重复压缩（#33493）；GitHub Copilot CLI 社区同样提出压缩后长期记忆需求。
- **MCP/ACP 开放协议成熟度**：GitHub Copilot CLI Atlassian MCP OAuth 连续两版本失败（#4480/#4490）、`server/discover` 与 legacy `initialize` 双协议握手破坏（#4525）；Claude Code Notion MCP JSON 参数被序列化为字符串（#25865）；OpenAI Codex Windows 下 stdio MCP server 反复启动不回收（#38754）；Kimi Code ACP 模式 Grep/Glob 被硬性限制（#2609）。
- **模型兼容性与成本透明度**：OpenAI Codex GPT-5.6 串行化工具调用导致 27–45% 额外加权用量（#35050）；OpenCode gpt-5.6-sol-fast 被注入不支持的 `prompt_cache_retention`（#43367）、gpt-5.6-luna 空响应/403（#43565）；Qwen Code 模型路由切换后 token 计数失效（#9506）。
- **企业级配置与跨平台质量**：GitHub Copilot CLI GHEC 数据驻留租户下 prompt 模式 401（#4527）、组织启用模型不同步（#4390）；OpenAI Codex Windows 平台问题集中爆发，包括 Trusted RPC 初始化失败（#39136，80 评论）、`\\?\` 路径归档失败（#39239）、WSL PTY 静默失败（#37104）。

## 4. 差异化定位分析

- **Claude Code**：在 TUI 交互精细度上用户期望最高，社区高赞问题集中于复制粘贴、快捷键、输出展开等日常体验。功能侧持续强化输出风格控制（Concise）、默认模型切换（`ANTHROPIC_DEFAULT_MODEL`）与跨会话通知。定位为专业开发者日常主力终端工具。
- **OpenAI Codex**：Rust 重写推进中且与桌面端同步迭代，全平台覆盖意图明显，但 Windows 质量问题（浏览器插件、路径处理、沙箱、PTY）构成最突出短板。安全 PR 方向清晰（Git 信任收紧、插件隔离），定位为 OpenAI 模型能力与桌面/IDE/移动端全场景入口。
- **Gemini CLI**：双轨道发布（稳定版 + 预览版）验证严谨，安全修复与 IDE/云端集成（Cloud Workstations OAuth、VS Code Companion）并重。特色功能包括本地 Whisper 语音输入、GCS 轨迹日志、前缀缓存优化。定位为 Google 生态开发者与 Gemini 模型深度绑定用户。
- **GitHub Copilot CLI**：企业治理导向最明确：managed policy、沙箱强制、数据驻留、审计合规是核心语境。当前社区争论集中在安全策略的过度强制与 ACP/沙箱绕过风险。定位为企业受管环境中的 Copilot 入口。
- **Kimi Code CLI**：社区规模最小，今日仅 1 条被关闭的 ACP 相关问题（Grep/Glob 在 ACP runtime 被限制）。反映其当前重点是打通 ACP/IDE 集成基础链路，生态尚处早期。
- **OpenCode**：社区贡献驱动的开源工具，PR 活跃度极高（50 条），插件系统扩展至 HTTP 路由/webhook，同时进行 Effect Latch 重构、模型能力限制移除等底层清理。问题则包括数据丢失级 TUI 缺陷与桌面端 Sidecar 启动超时。定位为追求最新模型与高度可定制性的开发者。
- **Qwen Code**：开发流程高度自动化（大量 bot 驱动的 autofix PR），强调端到端验证（SWE-bench Verified 500/500、Terminal-Bench 89 分）与沙箱镜像 digest 绑定。渠道集成侧重 IM（DingTalk 引用消息修复），并持续运营 CI/CD 机器人看板。定位为面向验证严谨性和中国 IM/云生态的用户。

## 5. 社区热度与成熟度

- **高活跃、高期望**：Claude Code 社区反馈强度最高（单 issue 286👍、134 评论），用户讨论深入且对体验缺陷零容忍；GitHub Copilot CLI 因安全回归（ACP 自动批准）引发激烈争论，企业用户与安全合规诉求碰撞明显。
- **快速迭代、质量承压**：OpenAI Codex 双 alpha 同日发布但 Windows 回归问题跨版本复现，社区对其发布节奏与质量门禁存在质疑；OpenCode 贡献者活跃但 issue 暴露数据丢失、OOM 等严重问题，呈现典型的高速演进期特征。
- **稳健推进、安全优先**：Gemini CLI 稳定版/预览版分轨清晰，PR 以安全加固与可靠性修复为主，社区讨论围绕 subagent 可信度与记忆隐私，成熟度中上。
- **自动化主导、外部参与待观察**：Qwen Code 50 条 PR 中大量来自 bot 自动修复/接管，issue 数量少且多由官方跟进，开发流程高度工业化但外部社区声量有限；Kimi Code 活跃度垫底，仍在补齐基础能力。

## 6. 值得关注的趋势信号

- **安全边界从“默认信任”转向“默认隔离”**：OpenAI Codex 不再将 Git 命令视为安全、Gemini CLI 修复 MCP fail-open、GitHub Copilot CLI 收紧 ACP/非交互模式的绕过路径——AI CLI 正在集体收敛对本地环境的最小信任原则。开发者为 CI 或编辑器接入时应重新审视权限授予范围。
- **上下文压缩与记忆持久化是下一轮体验分水岭**：Claude Code 用户因压缩后无法回看历史而自建记忆系统（#34556），Gemini 的 Auto Memory 又引发隐私争议。能在“可回溯、可控制、隐私安全”三方面同时给出方案的工具有望建立长期粘性。
- **TUI 基础体验成为选型硬指标**：复制粘贴缩进污染、快捷键终端兼容性、输出截断、输入静默丢失等“小问题”占据各工具高赞榜。对技术决策者而言，在真实终端环境（Ghostty、WSL、Wayland、Windows Terminal）中的可用性测试应优先于模型能力对比。
- **Windows/Linux 桌面是未被充分满足的市场**：OpenAI Codex 的 Windows 问题密度最高（Trusted RPC、路径前缀、沙箱 EPERM、WSL PTY），Gemini Browser agent 在 Wayland 下失败，OpenCode 桌面端 Sidecar 启动超时。跨平台质量正在成为后来者差异化切入的机会点。
- **模型行为变更直接影响账单与兼容性**：GPT-5.6 串行化带来 27–45% 额外加权用量（Codex #35050），gpt-5.6 系列在 OpenCode 上出现参数注入与空响应问题。开发者应对新模型保持“先小规模验证成本与行为，再大规模切换”的策略，并关注工具是否提供用量统计的路由身份绑定（如 Qwen #9506）。
- **开放协议方向明确，但实现成熟度不足**：MCP/ACP 在 OAuth 发现、双协议握手、工具能力边界、进程生命周期方面接连出问题，且部分回归跨版本未修复。依赖第三方 MCP/ACP 的团队应预留降级方案，并优先选择协议实现迭代快的工具。
- **AI 工具自身开发流程已深度 AI 化**：Qwen Code 的 autofix/takeover bot、OpenCode 的 opencode-agent bot 自动提交 PR，显示 AI 已参与自身软件工程与发布质量门禁。这一模式若被更多厂商采用，将加快问题修复速度，但对人工审查机制提出新要求。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

**数据截止：2026-08-20** | 数据来源：github.com/anthropics/skills


## 一、热门 Skills 排行

按社区关注度与讨论热度排序，当前最受关注的 5 个 Skill PR：

### 1. skill-creator 评估系统修复（run_eval.py）
- **PR**: [#1298](https://github.com/anthropics/skills/pull/1298) | 状态: **OPEN** | 作者: MartinCajiao
- **功能**: 修复 `run_eval.py` 始终报告 `recall=0%` 的严重缺陷，该问题导致 skill 描述优化循环在噪声数据上运行。
- **社区焦点**: 影响面大——直接关联 [#556](https://github.com/anthropics/skills/issues/556)（12 条评论，7 个 👍，10+ 独立复现），且与 Windows 兼容性修复（[#1099](https://github.com/anthropics/skills/pull/1099)、[#1050](https://github.com/anthropics/skills/pull/1050)）形成修复集群，是当前生态最集中的技术债。

### 2. document-typography 文档排版质检 Skill
- **PR**: [#514](https://github.com/anthropics/skills/pull/514) | 状态: **OPEN** | 作者: PGTBoos
- **功能**: 针对 AI 生成文档的排版质量控制——孤行文字（1-6 个词溢出到下一行）、页底孤立标题、编号错位。
- **社区焦点**: 直击 AI 生成文档的普遍痛点，属于"用户不会主动要求但明显影响质量"的隐性需求，讨论集中在触发词设计和质检规则的边界情况。

### 3. skill-quality-analyzer + skill-security-analyzer 元技能
- **PR**: [#83](https://github.com/anthropics/skills/pull/83) | 状态: **OPEN** | 作者: eovidiu
- **功能**: 新增两个元技能——Skill 质量分析器（SKILL.md 结构、文档、示例、资源等五个维度评分）和安全分析器。
- **社区焦点**: 与 [#492](https://github.com/anthropics/skills/issues/492)（43 条评论的安全信任边界问题）形成呼应，反映了社区对 Skill 质量和安全评估工具的需求。

### 4. ServiceNow 平台综合 Skill
- **PR**: [#568](https://github.com/anthropics/skills/pull/568) | 状态: **OPEN** | 作者: Vanka07
- **功能**: 覆盖 ITSM、ITOM、ITAM/SAM Pro、FSM、HRSD、CSM、SPM/PPM、Vulnerability Response、Security Incident Response 和 IntegrationHub 的 ServiceNow 平台助手。
- **社区焦点**: 企业级平台集成需求，跨度大、覆盖面广，更新活跃（最近更新 2026-08-12），讨论围绕技能边界和平台版本适配。

### 5. Pyxel 复古游戏开发 Skill
- **PR**: [#525](https://github.com/anthropics/skills/pull/525) | 状态: **OPEN** | 作者: kitao（pyxel-mcp 作者）
- **功能**: 基于 Pyxel 引擎的复古/像素风/8-bit 游戏开发 MCP skill，覆盖"编写 → 运行截图 → 检查 → 迭代"的完整工作流。
- **社区焦点**: 官方引擎作者亲自提交，具备完整生态支持，关注度随时间持续上升（创建 3 月，更新至 7 月）。

### 6. ODT 格式支持 Skill
- **PR**: [#486](https://github.com/anthropics/skills/pull/486) | 状态: **OPEN** | 作者: GitHubNewbie0
- **功能**: OpenDocument 格式（.odt/.ods）的创建、填充、读取与转换为 HTML，触发词覆盖 ODT/ODS/ODF/OpenDocument/LibreOffice 等。
- **社区焦点**: 补充现有 docx/pdf 之外的开源文档格式支持，讨论集中在 LibreOffice 兼容性和模板填充的可靠性。


## 二、社区需求趋势

从 Issues 数据提炼，社区最关注的方向呈以下五个趋势：

### 1. 安全与信任边界管理（最高热度）
- **Issue #492**（43 条评论）: 社区制作 Skill 在 `anthropic/` 命名空间下分发，伪装官方 Anthropic Skill，构成信任边界滥用漏洞——用户可能向非官方 Skill 授予过高权限。
- 这表明社区对 Skill 供应链安全有强烈关注，预期将推动官方签名/认证机制。

### 2. 企业级 Skill 分发与共享
- **Issue #228**（16 条评论，8 个 👍，👍 数最高）: 要求支持组织内直接共享 Skill（目前需手动下载 .skill 文件并通过 Slack/Teams 传输），期望建立共享 Skill 库或直接分享链接。
- 结合 [#189](https://github.com/anthropics/skills/issues/189)（插件重复安装问题），说明技能分发链路尚不成熟。

### 3. Skill 开发工具链的可靠性
- **Issue #556**: `run_eval.py` 0% 触发率 bug，7 个 👍，10+ 独立复现——Skill 自动化评估工具存在系统性缺陷，导致优化循环失效。
- **Issue #202**: skill-creator 应更新为最佳实践——当前更像开发者文档而非可操作 Skill，违反自身规范。

### 4. 上下文窗口管理
- **Issue #1487**（4 条评论）: `claude-api` Skill 一次工具调用即注入约 156k tokens，直接耗尽上下文窗口。
- **Issue #1175**: SharePoint Online 文档处理对安全与上下文窗口的顾虑。

### 5. 推理质量与治理
- **Issue #1385**（4 条评论）: 推理质量门控管线——预任务校准 → 对抗性审查 → 交付验证，代表社区对输出质量控制的进阶需求。
- **Issue #412**: agent-governance 安全模式提案——策略执行、威胁检测、信任评分与审计追踪。


## 三、高潜力待合并 Skills

以下 PR 讨论活跃、价值明确，近期有较大概率落地：

| Skill | PR | 亮点 | 当前状态 |
|---|---|---|---|
| **ServiceNow 平台 Skill** | [#568](https://github.com/anthropics/skills/pull/568) | 企业级平台全覆盖，最近更新 8 月 12 日，讨论持续活跃 | OPEN（4.5 个月） |
| **Pyxel 复古游戏开发** | [#525](https://github.com/anthropics/skills/pull/525) | 官方引擎作者提交，生态完整，7 月仍有更新 | OPEN（4.5 个月） |
| **skill-quality-analyzer** | [#83](https://github.com/anthropics/skills/pull/83) | 直击社区对 Skill 质量评估的需求，与 #492 安全诉求形成协同 | OPEN（9 个月） |
| **self-audit 推理质量门控** | [#1367](https://github.com/anthropics/skills/pull/1367) | 文件校验 + 四维推理审计，通用性强，与 #1385 提案配套 | OPEN（1.5 个月） |
| **run_eval.py 修复集** | [#1298](https://github.com/anthropics/skills/pull/1298) | 修复可复现的系统性 bug，有 10+ 复现报告背书 | OPEN（2.5 个月） |
| **ODT 文档处理** | [#486](https://github.com/anthropics/skills/pull/486) | 明确的功能空白，触发词设计完整 | OPEN（5.5 个月） |


## 四、Skills 生态洞察

**当前社区最集中的诉求是：Skill 工程化的"基础设施"建设——评估工具的可信度（#556、#1298）、分发链路的安全与便捷（#492、#228）、以及上下文窗口的占用控制（#1487）——三者共同指向一个核心问题：Skill 生态正从"能做什么"转向"如何安全、可靠、高效地规模化使用"。**

---

# Claude Code 社区动态日报（2026-08-20）

## 今日速览

- 发布 v2.1.236 与 v2.1.237，带来 **Concise 输出风格**、`ANTHROPIC_DEFAULT_MODEL` 环境变量与跨会话 SendMessage 通知能力，同时修复 LLM 网关/custom base URL 下的 prompt caching 问题。
- 社区热度集中在 TUI 复制粘贴缺陷（#18170，286👍/134评论）、上下文压缩后历史不可访问（#27242，80👍）、引号命令权限误报（#27957，74👍）三大问题上。
- PR 侧较平静，过去 24 小时仅 1 条文档类更新。

## 版本发布

**v2.1.237**
- 修复：使用 LLM 网关或自定义 base URL 的会话中 prompt caching 失效的问题
- 新增：内置 **"Concise" 输出风格**——Claude 直接给出结果、跳过开场白和叙述，同时保持同等的执行深度。可在 `/config` 的 Output style 下选择

**v2.1.236**
- 新增：`ANTHROPIC_DEFAULT_MODEL` 环境变量，设定新会话的起始模型；`/model` 选择可覆盖它，且重启后保持（不同于 `ANTHROPIC_MODEL`）
- 新增：跨会话 `SendMessage` 的 `notify_when_idle` 参数，可请求另一个 Claude Code 会话空闲时通知

## 社区热点 Issues

**1. #18170 [TUI] 终端复制粘贴混入多余缩进与行尾空格**
评论: 134 | 👍: 286 | [链接](https://github.com/anthropics/claude-code/issues/18170)
从终端输出复制段落或代码块时，每行会自动带上与提示符对齐的视觉缩进和行尾空格，粘贴到编辑器后需要手动清理。这是当前社区反馈最强烈的 TUI 问题，评论数远超其他 Issue，操作频率高、影响面广。

**2. #27242 [TUI] 上下文压缩/plan-mode 清理/分支切换后无法回看历史对话**
评论: 17 | 👍: 80 | [链接](https://github.com/anthropics/claude-code/issues/27242)
`transcript.jsonl` 中完整数据始终保留，但 TUI 没有任何可用入口翻查被清理的对话。涉及压缩后、plan-mode 清理、分支导航三种高频场景，用户对"数据在本地却看不到"的落差感强烈。

**3. #27957 [权限] 无法禁用 'Command contains quoted characters in flag names' 警告**
评论: 26 | 👍: 74 | [链接](https://github.com/anthropics/claude-code/issues/27957)
更新后所有含引号 flag 的命令（如 `git commit -m "message"`、`bun run build --outdir "dist"`）都会触发确认弹窗，完全正常的操作被误报拦截。开发者普遍认为该警告标准过宽，要求提供关闭开关，日常 git 工作流被强制打断。

**4. #26997 [Desktop] SSH 对话框无法处理加密的默认私钥**
评论: 31 | 👍: 42 | [链接](https://github.com/anthropics/claude-code/issues/26997)
当 `~/.ssh/id_ed25519` 存在且受 passphrase 保护时，桌面端 SSH 连接直接失败。内置 SSH 库没有 passphrase 输入入口，使用加密密钥这一常见安全实践反而成为硬阻塞。

**5. #18157 [TUI] Ghostty 终端下 Option+Backspace（删除单词）失效**
评论: 13 | 👍: 38 | [链接](https://github.com/anthropics/claude-code/issues/18157)
macOS 上使用 Ghostty 终端时，Option+Backspace 在 Claude Code 内无法删除前一个单词，终端内其他程序正常。关联 #5196、#9219，表明该系列快捷键问题持续未解决。

**6. #26996 [Tools] Edit 工具静默将 tab 转为空格，导致反复匹配失败**
评论: 20 | 👍: 30 | [链接](https://github.com/anthropics/claude-code/issues/26996)
编辑 tab 缩进的文件时，Edit 工具会静默改变缩进字符，后续 string match 因格式不一致而反复失败。对以 tab 为缩进规范的代码库影响明显，且问题隐蔽、难以排查。

**7. #26954 [TUI] Bash 输出截断后 Ctrl+O/Ctrl+E 无法完整展开**
评论: 18 | 👍: 30 | [链接](https://github.com/anthropics/claude-code/issues/26954)
约 30-40 行的命令输出在会话中即被截断，按下 ctrl+o/ctrl+e 后仍不显示完整内容。日志检索、grep 等场景下关键信息直接丢失，影响 Agent 对上下文的判断。

**8. #26572 [Agents] 提议 CustomPaneBackend 协议，解耦 agent teams 与 tmux CLI**
评论: 8 | 👍: 28 | [链接](https://github.com/anthropics/claude-code/issues/26572)
KILD 项目作者提出以自定义 Pane 后端协议替代对 tmux 的强依赖，以支持 Ghostty、WezTerm、Zellij、KILD 及远程部署。这是由独立工具作者提出的建设性架构方案，反映生态对更开放 agent 基础设施的诉求。

**9. #12070 [权限] 会话级 acceptEdits 权限模式未持久生效**
评论: 12 | 👍: 26 | [链接](https://github.com/anthropics/claude-code/issues/12070)
选择 "Yes, and accept all for this session" 后，后续 Edit 仍反复弹出权限请求。session 级权限承诺未兑现，阻塞长时间批量编辑任务。

**10. #25865 [MCP] Notion MCP 连接器将 JSON 对象参数序列化为字符串**
评论: 14 | 👍: 23 | [链接](https://github.com/anthropics/claude-code/issues/25865)
Notion 连接器在传递 JSON 对象参数时被转成字符串，导致 update/move/create 等操作失败。MCP 生态是官方主推方向，此问题影响第三方工具集成可信度。

**补充关注**（未入 Top 10）：
- #34556 [closed] 用户经历 59 次上下文压缩后自建了完整记忆持久化系统，95 条评论讨论热烈，反映跨压缩记忆是真实痛点（[链接](https://github.com/anthropics/claude-code/issues/34556)）
- #6616 显示 86% 可用上下文却被误报 "Context low" 且 `/compact` 失败，上下文使用量计算问题再度浮现（[链接](https://github.com/anthropics/claude-code/issues/6616)）

## 重要 PR 进展

过去 24 小时 PR 活跃度低，仅 1 条：

**#77977 [docs] 文档：记录 plugin-dev 中 skipLfs marketplace 来源**
作者: superdiaodiao | 创建: 2026-07-16 | 更新: 2026-08-19 | [链接](https://github.com/anthropics/claude-code/pull/77977)
为 plugin-dev 的 marketplace 指南补充 `skipLfs` 选项说明，支持在 GitHub 简写与通用 Git URL 来源中跳过 Git LFS 下载，引用 #63035。文档类变更，无代码逻辑修改。

## 功能需求趋势

从今日活跃 Issues 可提炼 5 个主要方向：

| 方向 | 代表 Issues | 社区诉求 |
|------|-----------|---------|
| 上下文管理 | #27242、#34556、#6616 | 压缩后历史可回看、跨压缩持久记忆、上下文用量计算准确 |
| TUI 交互体验 | #18170、#18157、#26954 | 复制粘贴干净、快捷键兼容各终端、输出可完整展开 |
| 权限系统精细化 | #27957、#12070、#10089 | 减少误报/可关闭规则、会话级权限真正持久、可强制拦截危险参数 |
| Agent 基础设施 | #26572、#26479 | 摆脱 tmux 强依赖、teammate 继承项目权限配置、支持更多终端/远程 |
| MCP 生态稳定性 | #25865、#27625 | 连接器参数保真、内置 MCP server 可靠连接 |

## 开发者关注点

1. **TUI 复制粘贴是当前最大痛点**：#18170 以 286👍 居首，输出混入视觉缩进和行尾空格，直接影响将 Claude 结果移入编辑器或 IDE 的核心工作流。
2. **压缩后历史成了"黑匣子"**：#27242 与 #34556 指向同一矛盾——完整数据保存在本地 `transcript.jsonl`，界面层却无任何途径访问。用户甚至因此自建了记忆持久化系统。
3. **权限确认误报损害自动化信心**：引号命令告警（#27957）和 acceptEdits 不持久（#12070）共同导致高频重复确认，开发者对权限机制的可信度下降。
4. **SSH 远程场景仍显粗糙**：#26997（加密密钥被阻塞）与 #25664（本地插件/MCP 路径被错误传递给远端导致挂起）表明远程连接的配置隔离和密钥处理未成熟。
5. **上下文用量显示可信度不足**：#6616、#17959、#18159 等多条 Issue 指向 statusline 百分比与实际内部计算不一致，用户无法信任界面数据来做 compact 决策。
6. **终端生态兼容性欠账积累**：Ghostty 快捷键（#18157）、macOS 全屏 TUI 下 Cmd+C 复制失效（#65844）、detached 窗口缩放问题（#62449）等多终端/桌面问题长期未闭环。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-08-20

## 今日速览

- 发布两个 Rust 新 alpha 版本（v0.149.0-alpha.2 / alpha.3），为 CLI 与桌面端持续迭代。
- Windows 平台问题集中爆发：内置浏览器插件 Trusted RPC 初始化失败形成系列回归，涉及多个版本（#39136 评论已达 80 条）；`\\?\` 路径前缀导致会话归档失败也出现两个独立 Issue。
- 上游合入多项安全加固 PR：Git 命令不再被默认视为安全、自动插件 Git 操作将被隔离，降低供应链与仓库配置注入风险。

## 版本发布

- [rust-v0.149.0-alpha.2](https://github.com/openai/codex/releases/tag/rust-v0.149.0-alpha.2) — 2026-08-20 发布
- [rust-v0.149.0-alpha.3](https://github.com/openai/codex/releases/tag/rust-v0.149.0-alpha.3) — 2026-08-20 发布

两个 alpha 的发布说明均为 `Release 0.149.0-alpha.x` 的占位格式，未附详细 changelog，具体变更需查看 tag 对应的 commit 记录。

## 社区热点 Issues（10 条）

1. **[#39136 — Windows 内置浏览器插件初始化失败：Trusted RPC 依赖不在可信代码路径内](https://github.com/openai/codex/issues/39136)**
   作者: Double-hhd | 评论: 80 | 👍: 42
   影响范围极大：ChatGPT Plus 用户使用 26.814.41407 版本时，Codex 内置浏览器 UI 打开即失败，Trusted RPC 依赖路径校验不通过。同一问题在 #39399、#39387、#39486 中分别被不同用户复现，指向近期 Windows 浏览器插件回归。

2. **[#35050 — GPT-5.6 频繁序列化独立的 Code Mode 调用；显式批处理降低 27–45% 加权用量](https://github.com/openai/codex/issues/35050)**
   作者: MakerOfToys | 评论: 25 | 👍: 40
   用户通过对比测试发现 GPT-5.6 会把本可并行的工具调用改为串行执行，显式批处理能显著降低 token 消耗。社区高赞，属于模型行为 + 成本控制的核心关注。

3. **[#39239 — Windows: `thread/archive` 在 `thread/resume` 后因 `\\?\` 路径失败](https://github.com/openai/codex/issues/39239)**
   作者: shaded0 | 评论: 21 | 👍: 1
   Resume 会话后续归档时报 `os error 2`。根因是 Windows verbatim path（`\\?\` 前缀）导致路径相等性判断失误，同一文件被排队两次。与 #39150 同源，属于 Windows 路径处理的系统性问题。

4. **[#33493 — 本地压缩 v2 保留无界 input_image 负载，导致反复自动压缩](https://github.com/openai/codex/issues/33493)**
   作者: snrui | 评论: 18 | 👍: 4
   长对话且图片较多的 Codex Desktop 线程陷入重复自动压缩循环，`gpt-5.6-sol` 下明显。影响重度多模态用户的上下文管理体验。

5. **[#27117 — Windows 独立更新从 pwsh 启动时继承 PSModulePath，导致 Get-FileHash 失败](https://github.com/openai/codex/issues/27117)**
   作者: BlueOcean223 | 评论: 18 | 👍: 13
   更新流程在 PowerShell 7 启动场景下错误继承 `PSModulePath`，使子进程 `powershell.exe` 中的 Get-FileHash 异常，最终更新失败。更新器健壮性问题的典型代表。

6. **[#39162 — macOS 打开已存在会话导致 ChatGPT 认证失效并跳转登录](https://github.com/openai/codex/issues/39162)**
   作者: gaozhitw | 评论: 15 | 👍: 14
   稳定复现路径：打开旧会话 → 登录态失效。用户确认 26.810.52044 正常、26.814.41407 触发，属桌面端回归问题，影响面广。

7. **[#23527 — Codex 移动端不显示连接 Mac 主机上的 SSH 远程项目](https://github.com/openai/codex/issues/23527)**
   作者: jameBoy | 评论: 15 | 👍: 21
   Mac 桌面端可正常使用 SSH 远程项目，但同一主机的移动端项目选择器中缺失这些项。远程开发链路在移动端不完整，iOS 用户诉求强烈。

8. **[#37104 — Windows WSL 集成终端在 PTY/WSL 启动前静默失败，侧边栏/底部面板无法打开](https://github.com/openai/codex/issues/37104)**
   作者: cxzhong | 评论: 14 | 👍: 8
   WSL 场景下集成终端完全不可用，且错误静默，应用层面没有提示。属于「Papercuts 2026」Windows 体验类问题。

9. **[#37029 — Windows Computer Use 在应用选择前因 EPERM lstat 失败](https://github.com/openai/codex/issues/37029)**
   作者: Ahmedmabdallah484 | 评论: 13 | 👍: 4
   Computer Use 在 Windows 上执行前即报 EPERM，沙箱与运行时文件访问权限存在冲突，无法进入应用选择界面。

10. **[#38754 — Windows Codex App 内本地 stdio MCP 服务被反复启动且不回收](https://github.com/openai/codex/issues/38754)**
    作者: youngraison | 评论: 10 | 👍: 2
    单个任务中每个新 turn 都会重新 spawn MCP server，进程不被正确 reap。对 MCP 生态开发者影响明显：资源消耗高、调试困难。

## 重要 PR 进展（10 条）

1. **[#31155 — 修复 shutdown 失败后释放 rollout writer](https://github.com/openai/codex/pull/31155)**
   在 shutdown 后 rollout 持久化未完成时，终端会话与本地 store 之间的 live-writer lease 不再被错误保留，避免后续写入被阻塞。

2. **[#39524 — 不再将 Git 命令视为固有安全](https://github.com/openai/codex/pull/39524)**
   仓库配置可诱导只读 Git 命令执行 helper，因此移除 Unix/Windows 上 Git 命令的 known-safe 分类。安全边界收紧，降低供应链攻击面。

3. **[#39520 — 隔离自动插件 Git 操作](https://github.com/openai/codex/pull/39520)**
   后台 marketplace 与插件刷新不再继承项目级 Git 配置，防止配置重定向 remote 或在自动操作期间调用 Git helper。

4. **[#39523 — 在首个 turn 之前持久化线程 section 移动](https://github.com/openai/codex/pull/39523)**
   非临时线程在首个 turn 前没有持久化 rollout/preview，移动到 section 后会从 section 过滤列表中消失。该 PR 修复此数据一致性问题。

5. **[#39514 — 物化 turn 摘要时使用存储的 item_type](https://github.com/openai/codex/pull/39514)**
   改用持久化的 `item_type` 列选择 user/agent 摘要项，并在该列为空时回退到 `item_json` 类型，保证旧客户端写入的行仍可生成正确摘要。

6. **[#39510 — 追踪内置控制工具的调用分析事件](https://github.com/openai/codex/pull/39510)**
   为 `request_user_input`、`update_plan`、`view_image` 等内置控制工具新增 `codex_control_tool_call_event`，记录状态（完成/失败/拒绝/中断）与耗时元数据，提升可观测性。

7. **[#39452 — 移除 async user messages 的 feature gate](https://github.com/openai/codex/pull/39452)**
   当所选模型支持时，根代理直接开放 `send_user_message_async`；旧的 `send_async_message` 作为兼容 flag 保留，不再影响工具可用性。

8. **[#39474 — 将 Guardian 扩展整合进 `codex-guardian-v2`](https://github.com/openai/codex/pull/39474)**
   统一 Guardian 线程生命周期与 subagent-spawn 上下文，通过单一扩展入口安装 lifecycle contributor 和异步风险评分器，减少冗余扩展点。

9. **[#39493 — HeadTailBuffer 容量改为 const generic](https://github.com/openai/codex/pull/39493)**
   将 `HeadTailBuffer` 参数化为 const `MAX_BYTES`，head/tail 预算从该值推导，生产环境默认容量保持一致，测试覆盖更聚焦。

10. **[#31817 — 自动更新 models.json](https://github.com/openai/codex/pull/31817)**
    GitHub Actions 自动提交模型清单更新，确保 CLI 与 App 能及时识别最新模型 ID 与能力元数据。

## 功能需求趋势

- **Windows 平台稳定性成为最突出的社区诉求**：Trusted RPC 路径校验、`\\?\` 路径前缀、沙箱 EPERM、WSL PTY、Schannel 凭据等系统性问题的反馈密度最高，大量 Issue 停留在 OPEN 状态且持续被复现。
- **浏览器/Chrome 插件回归**：多个 Windows 用户报告内置浏览器插件初始化失败，集中在 26.814.x 版本。Trusted code path 的同步与校验逻辑急需修复。
- **成本与用量控制**：GPT-5.6 的串行工具调用（#35050）与高频率 code-mode 轮询放大上下文（#32309）表明，社区希望 Codex 在模型行为变化时提供更透明的用量控制选项。
- **MCP 生态稳定性**：Windows 上 local stdio MCP server 的 spawn/reap 生命周期存在明显缺陷，限制重度 MCP 用户的使用。
- **订阅与授权边界**：围绕 auth 失效（#39162）、已购 credits 自动扣费（#28382）、banked resets 消失（#39577）的讨论说明用户对账户安全与配额控制高度敏感。

## 开发者关注点

- **Windows 是当前最大的痛点平台**：浏览器插件、会话归档、沙箱执行、更新器、PTY 终端均有独立 Issue 且相互交叉，开发者建议官方设立 Windows 专项质量门禁。
- **归档/会话恢复链路脆弱**：`\\?\` 路径前缀导致归档失败（#39239/#39150）、压缩保留 input_image（#33493）、远程 compact 404（#38706）共同指向会话存储层需要更严格的跨平台测试。
- **Trusted RPC 校验引发连锁回归**：从浏览器插件到 bundled Browser service，多个组件在同一校验逻辑上失败，涉及 26.814.x 桌面版多个构建。
- **Git 安全边界收紧受到肯定**：社区对「Git 命令不再默认安全」和「隔离插件 Git 操作」的 PR 反应正面，认为这是对抗仓库配置投毒的正确方向。
- **模型行为变化被直接关联到账单数字**：#35050 中用户用加权用量对比证明 GPT-5.6 的串行化带来 27–45% 额外消耗，开发者希望官方发布模型行为变更说明与成本控制开关，而非让用户自行猜测。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-08-20

## 今日速览

今日发布 v0.56.0 稳定版、v0.57.0-preview.0 预览版及一个 nightly 版本，重点修复 Cloud Workstations OAuth 流程与 IDE 连接目录匹配问题。社区讨论持续聚焦 subagent 状态误报、generalist agent 挂起等稳定性和信任机制问题；安全方面，多个 PR 集中修补 MCP 配置损坏时的 fail-open 漏洞。

## 版本发布

### v0.56.0（稳定版）
正式稳定版发布，完整变更请见 [v0.55.1...v0.56.0 对比](https://github.com/google-gemini/gemini-cli/compare/v0.55.1...v0.56.0)。

### v0.57.0-preview.0（预览版）
- **Cloud Workstations OAuth 修复**：动态解析代理重定向 URI，修复 OAuth 流程在 Cloud Workstations 环境下的失败问题（[#28688](https://github.com/google-gemini/gemini-cli/pull/28688)）
- **IDE 连接修复**：解决 IDE 连接中目录不匹配被静默吞掉的问题，提升 VS Code 等 IDE 协作的可靠性

### v0.56.0-nightly.20260820.ge90c63fa1（Nightly）
- 修复 core 层在工具调用或媒体内容后，空文本 turns 被丢弃的问题（[#28892](https://github.com/google-gemini/gemini-cli/pull/28892)）

## 社区热点 Issues

### 1. [P1] Subagent MAX_TURNS 被误报为 GOAL 成功 — [#22323](https://github.com/google-gemini/gemini-cli/issues/22323)
`codebase_investigator` 子代理在达到最大轮次限制后仍然报告 `status: "success"` 和 `Termination Reason: "GOAL"`，而实际上它没有任何分析产出。12 条评论，2 👍。该 issue 处于 need-retesting，维护者正在关注此误导性问题。

### 2. [P1] Generalist agent 无限挂起 — [#21409](https://github.com/google-gemini/gemini-cli/issues/21409)
当 CLI 将任务 defer 给 generalist agent 时会无限期挂起，简单的文件夹创建操作也受影响，最长等待 1 小时仍未完成。8 条评论，8 👍。社区共鸣强烈，用户表示通过禁止模型使用子代理可绕过此问题。

### 3. [P2] 零依赖 OS 沙箱化与 bash 意图路由 — [#19873](https://github.com/google-gemini/gemini-cli/issues/19873)
利用 Gemini 3 模型天然的 bash 操作能力，希望通过零依赖沙箱化方式让模型安全地使用原生 POSIX 工具，在执行后增加意图路由。8 条评论，1 👍。这是涉及安全与能力释放的重要方向。

### 4. [P2] Auto Memory 缺乏确定性脱敏与日志过重 — [#26525](https://github.com/google-gemini/gemini-cli/issues/26525)
Auto Memory 将本地 transcript 原始内容发送给模型后才指示其脱敏，且服务端可能记录包含 skill 内容的高敏日志。4 条评论。引发对后台记忆提取隐私边界的讨论。

### 5. [P1] Shell 命令执行后卡在 "Waiting input" — [#25166](https://github.com/google-gemini/gemini-cli/issues/25166)
简单 CLI 命令执行完成后，终端仍显示该命令为活动状态并等待输入，必须手动中断。4 条评论，3 👍。该问题严重影响自动化工作流，涉及 core 层交互管理。

### 6. [P2] AST-aware 文件读取与代码库映射评估 — [#22745](https://github.com/google-gemini/gemini-cli/issues/22745)
EPIC 调研通过 AST 感知工具实现精确读取方法边界、导航代码，以减少 tokens 噪声和读取错位。7 条评论，1 👍。代表社区对上下文效率优化的强烈兴趣。

### 7. [P2] 模型不主动使用自定义 skills 和 sub-agents — [#21968](https://github.com/google-gemini/gemini-cli/issues/21968)
用户反馈 Gemini CLI 几乎不会主动使用已配置的 gradle、git 等自定义技能，即使任务高度相关，仍需显式指令。6 条评论。代理自主性问题引发维护者讨论。

### 8. [P2] Auto Memory 对低信号 session 无限重试 — [#26522](https://github.com/google-gemini/gemini-cli/issues/26522)
自动记忆系统对标记为低信号且未被读取的 session 永不标记为已处理，导致重复出现在待处理索引中并被反复重试。5 条评论。

### 9. [P1] Browser 子代理在 Wayland 下失败 — [#21983](https://github.com/google-gemini/gemini-cli/issues/21983)
浏览器子代理在 Wayland 会话中直接失败。4 条评论，1 👍。已标记 need-retesting，社区仍关注跨 Linux 显示协议的兼容性。

### 10. [P2] Browser agent 需要自动 session 接管与锁恢复 — [#22232](https://github.com/google-gemini/gemini-cli/issues/22232)
浏览器代理遇到持久化 profile 被锁时采用 fail-fast 策略，希望改为自动接管或恢复，提升长时任务的鲁棒性。4 条评论。

## 重要 PR 进展

### 1. [P1] 修复 MCP enablement 配置损坏导致的 fail-open 漏洞 — [#28794](https://github.com/google-gemini/gemini-cli/pull/28794)
`mcp-server-enablement.json` 损坏时 `readConfig()` 返回空对象，导致所有 server 被默认启用并可能覆盖用户禁用配置，造成数据丢失风险。本 PR 修复该 fail-open 行为。相关修复见 [#28787](https://github.com/google-gemini/gemini-cli/pull/28787)。

### 2. [P1] VS Code IDE Companion stop() 挂起与 keep-alive 失败阈值修复 — [#28789](https://github.com/google-gemini/gemini-cli/pull/28789)
修复 `IdeServer.stop()` 在存在活跃 MCP streaming 会话时无限挂起，以及 keep-alive 偶发失败导致的内存泄漏问题。

### 3. 扩展环境变量注入需用户同意 — [#28863](https://github.com/google-gemini/gemini-cli/pull/28863)
扩展更新可能绕过用户同意并向 MCP server 注入未授权环境变量。本 PR 将环境配置纳入同意字符串，并清理会影响运行时行为的环境变量。

### 4. 子进程执行安全加固 — [#28898](https://github.com/google-gemini/gemini-cli/pull/28898)
增强编排器子进程的安全与可靠性：阻止认证 token 泄漏至不可信工具环境，加固配置读取与 GitHub API 交互。

### 5. 一致化 symlink 与 ignore 路径处理 — [#28915](https://github.com/google-gemini/gemini-cli/pull/28915)
确保 `.geminiignore` 和 `.gitignore` 对字面路径与解析后的规范路径一致评估，消除工具因 symlink 产生的行为差异。

### 6. Whisper 转写 stdout 分块缓冲修复 — [#28916](https://github.com/google-gemini/gemini-cli/pull/28916)
修复 `WhisperTranscriptionProvider` 中时间戳行被 stdout `data` 事件切分后丢失的问题，保证本地语音模式转写完整。对应 issue [#28648](https://github.com/google-gemini/gemini-cli/issues/28648)。

### 7. Whisper 模型原子下载 — [#28917](https://github.com/google-gemini/gemini-cli/pull/28917)
`downloadModel()` 改为写入临时文件、校验长度、处理流错误，并在成功后原子重命名，避免中断下载导致模型文件损坏。对应 issue [#28644](https://github.com/google-gemini/gemini-cli/issues/28644)。

### 8. 重试 nudge 注入 conversation 以保留前缀缓存 — [#28914](https://github.com/google-gemini/gemini-cli/pull/28914)
将 on-retry 提示信息从 `systemInstruction` 移至 `contents` 末尾，既保留静态 prompt 前缀缓存，又确保模型在生成前立即看到恢复提示。对应 issue [#28909](https://github.com/google-gemini/gemini-cli/issues/28909)。

### 9. GCS 轨迹日志与 artifact 保存 — [#28922](https://github.com/google-gemini/gemini-cli/pull/28922)
为生产与评估运行实现 GCS 轨迹日志器和调试 artifact 存储，支持 coding、evaluation、repair loop 的流式分块与 diff 产物持久化。

### 10. 行为评估扩展：skills 激活与 URL 抓取 — [#28788](https://github.com/google-gemini/gemini-cli/pull/28788)
新增 `activate_skill` 与 `web_fetch` 行为评估，修复 EDK 报告聚合器对未执行用例的过滤逻辑，并增强本地评估环境的 Windows 兼容性。

## 功能需求趋势

1. **代理（Agent）可靠性与自主性**
   - Subagent 错误报告与恢复逻辑（[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)、[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)）
   - 更主动地使用自定义 skills 和 sub-agents（[#21968](https://github.com/google-gemini/gemini-cli/issues/21968)）
   - Browser agent 的 session 恢复能力（[#22232](https://github.com/google-gemini/gemini-cli/issues/22232)）

2. **上下文效率与 Token 优化**
   - AST-aware 读取与代码库映射（[#22745](https://github.com/google-gemini/gemini-cli/issues/22745)、[#22746](https://github.com/google-gemini/gemini-cli/issues/22746)）
   - Tactful Extraction 实现手术式低 token 读取（[#19561](https://github.com/google-gemini/gemini-cli/issues/19561)）
   - 重试提示与前缀缓存协同优化（[#28914](https://github.com/google-gemini/gemini-cli/pull/28914)）

3. **安全与信任机制强化**
   - MCP 配置损坏时的 fail-closed 行为（[#28787](https://github.com/google-gemini/gemini-cli/pull/28787)、[#28794](https://github.com/google-gemini/gemini-cli/pull/28794)）
   - 子进程与扩展环境变量隔离（[#28863](https://github.com/google-gemini/gemini-cli/pull/28863)、[#28898](https://github.com/google-gemini/gemini-cli/pull/28898)）
   - 抑制模型破坏性命令（[#22672](https://github.com/google-gemini/gemini-cli/issues/22672)）

4. **记忆系统健壮化与隐私**
   - Auto Memory 脱敏前置化与日志收敛（[#26525](https://github.com/google-gemini/gemini-cli/issues/26525)）
   - 低信号 session 不无限重试（[#26522](https://github.com/google-gemini/gemini-cli/issues/26522)）
   - 无效 memory patch 隔离或暴露（[#26523](https://github.com/google-gemini/gemini-cli/issues/26523)）

5. **IDE 与云端环境集成**
   - Cloud Workstations OAuth 支持（[#28688](https://github.com/google-gemini/gemini-cli/pull/28688)）
   - IDE 目录匹配与连接稳定性（[#28789](https://github.com/google-gemini/gemini-cli/pull/28789)、[#28922](https://github.com/google-gemini/gemini-cli/pull/28922)）

## 开发者关注点

- **Subagent 行为不可预测**：开发者反复反馈子代理要么挂起、要么谎报成功，且不主动使用已配置的 skills，严重削弱了对多代理工作流的信任。
- **Shell 执行偶发卡死**：命令完成但状态仍为 "Waiting input"（[#25166](https://github.com/google-gemini/gemini-cli/issues/25166)），以及交互式 prompt（如 vite 创建）卡住（[#22465](https://github.com/google-gemini/gemini-cli/issues/22465)），是自动化场景的主要障碍。
- **配置损坏导致安全降级**：MCP 配置 JSON 损坏后 fail-open 的默认行为引起安全担忧，开发者期待更稳妥的配置失效处理。
- **记忆系统隐私与可靠性**：后台 Auto Memory 在模型上下文脱敏前就读取全量 transcript 的做法受到质疑，且低信号 session 反复重试浪费资源。
- **Browser agent 环境兼容性**：Wayland 下的失败与持久化 profile 锁问题仍是高频痛点，影响浏览器自动化在 Linux 桌面端的落地。
- **上下文管理与工具数量限制**：超过 128/400 个工具时触发 400 错误（[#24246](https://github.com/google-gemini/gemini-cli/issues/24246)），以及模型到处创建临时脚本导致工作区污染（[#23571](https://github.com/google-gemini/gemini-cli/issues/23571)），是 token 控制之外另一层实操困扰。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报 — 2026-08-20

## 今日速览
昨日连发三个 prerelease（1.0.81-3/4/5），其中 1.0.81-5 修复了 pending 行残留问题。社区层面，Sandbox 强制启用与权限绕过（ACP 模式、非交互模式）成为最激烈的争论点；MCP OAuth 认证问题连续两个版本未修复，且有新报障指向 1.0.81 协议初始化兼容性回归。

## 版本发布（过去 24 小时）
- **[v1.0.81-5](https://github.com/github/copilot-cli/releases/tag/v1.0.81-5)** — 修复 agent 工作期间发送 prompt 后，第二份 prompt 残留为 `(pending)` 且无法清除的问题。
- **v1.0.81-4** / **v1.0.81-3** — 官方仅标注 “Fixes and changes”，未提供详细变更说明。

## 社区热点 Issues（10 个）

1. **[#4537 ACP 模式自动批准工具调用（回归 #845）](https://github.com/github/copilot-cli/issues/4537)**
   1.0.81-1 起 `--acp` 模式不再发送 `session/request_permission`，shell 命令、文件编辑和删除全部无人值守执行。严重安全回归，今日新提交，暂无评论但风险极高。

2. **[#4480 Atlassian MCP OAuth 失败（1.0.79 回归）](https://github.com/github/copilot-cli/issues/4480)**
   连接 Atlassian 远程 MCP server 时 OAuth 发现阶段报 RFC 8414 §3.3 issuer 不匹配。6 👍 / 6 评论，大量用户受第三方 MCP 认证影响。

3. **[#4490 Atlassian MCP OAuth 在 1.0.80 仍失败](https://github.com/github/copilot-cli/issues/4490)**
   与 #4480 同根因，1.0.80 仍未修复，1.0.78 尚正常。说明该回归已跨两个版本。

4. **[#4522 1.0.81 在托管策略未决时强制启用沙箱](https://github.com/github/copilot-cli/issues/4522)**
   即使用户显式配置 `sandbox.enabled=false`，只要服务端 managed policy 暂时无法确定，本地沙箱仍被强制开启。7 👍，企业用户抱怨配置被无视。

5. **[#4524 Sandbox 导致 git 不可用（Windows）](https://github.com/github/copilot-cli/issues/4524)**
   enforced-sandbox 更新后即使放行整个工作目录，git 操作仍被阻断，agent 无法正常工作流。

6. **[#4390 组织启用的模型缺失（Claude Sonnet 5/Opus 5、Kimi K3）](https://github.com/github/copilot-cli/issues/4390)**
   Copilot Business 组织显式启用的 Anthropic 模型在 CLI 模型目录中不可用。7 👍 / 15 评论，已经关闭但影响面大。

7. **[#4525 1.0.81-1 先发 `server/discover` 再发 legacy `initialize` 导致 -32022](https://github.com/github/copilot-cli/issues/4525)**
   对 Python MCP SDK 2.0.0 双协议 runner 的 stdio server，CLI 发起现代 `server/discover` 后又发送旧版 `initialize`，破坏 MCP 协议协商流程。

8. **[#4527 GHEC 数据驻留租户下 `copilot -p` 401](https://github.com/github/copilot-cli/issues/4527)**
   1.0.81-1 起 prompt 模式模型目录请求错误打到 `api.githubcopilot.com` 而非租户端点；交互模式同凭据正常。企业数据驻留场景被完全阻断。

9. **[#4528 非交互模式绕过 `disableBypassPermissionsMode`](https://github.com/github/copilot-cli/issues/4528)**
   `-p` 模式加 `--allow-all`/`--yolo` 可无视 managed settings 中的权限禁用策略直接放行，合规性风险明显。

10. **[#4533 TUI 在并行子代理启动后停止消费事件](https://github.com/github/copilot-cli/issues/4533)**
    1.0.81-4/5 上并行 subagent 一启动，终端 UI 即停止响应输入与滚动，Rust runtime 仍在后台运行。UI 死锁类问题会被用户直接感知。

## 重要 PR 进展
过去 24 小时数据源显示无新增或合并的 Pull Requests，暂无进展可汇报。

## 功能需求趋势
- **MCP 生态兼容性**：OAuth 认证（RFC 8414 issuer 校验）、协议版本协商（`server/discover` vs `initialize`）、图片内容块透传、第三方 MCP 服务器稳定性是当前最集中的议题。
- **沙箱/权限体系可控性**：社区强烈要求沙箱可彻底关闭、可按进程类型（JVM、git）精细授权，并且不被服务端策略覆盖。
- **企业级配置与合规**：模型目录正确同步、GHEC 数据驻留端点、managed settings 对非交互模式和 ACP 模式生效。
- **状态持久化**：跨会话保留 reasoning effort、压缩后上下文长期记忆、`store_memory` 可用性。
- **终端交互稳定性**：退格键行为、焦点事件丢失、pending 行累积、TUI 死锁等输入与渲染问题。
- **更新机制可预测性**：`autoUpdate:false` 应真正生效，prerelease 缓存不应覆盖 stable 安装。

## 开发者关注点
- **沙箱策略过于强制**：显式禁用无效、策略未决时强制执行、误伤 git 和 JVM 子进程，是最近几天最集中的开发者痛点。
- **MCP OAuth 连续版本回归**：Atlassian 等第三方 MCP 用户在 1.0.79/1.0.80 连续受阻，信任成本上升。
- **权限绕过安全风险**：ACP 模式自动放行工具调用、非交互模式绕过 managed settings，企业管理员可能无法强制审计。
- **更新机制混乱**：npm stable 安装被 `~/.copilot` 下缓存的 prerelease 抢占，且无法通过配置关闭。
- **企业数据驻留支持不完整**：prompt 模式请求走错域名导致 401，与交互模式行为不一致。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报 2026-08-20

## 今日速览

今日社区无新版本发布，PR 也无更新。唯一值得关注的动态是 Issue #2609 被关闭，该问题报告了 ACP（Agent Client Protocol）环境下 `Grep`/`Glob` 工具被限制，仅在允许交互式 Bash 的进程内可用，导致 Zed 等 ACP 客户端用户遇到工具调用失败。该问题从创建到关闭仅不到一天，可能已由官方快速响应或定位为设计行为。

## 版本发布

今日无新版本发布。

## 社区热点 Issues

### 1. [#2609 [ACP] Grep/Glob blocked: “ACP runtime only supports interactive Bash tool processes”; Bash intermittently reports “ACP terminal capability is unavailable”](https://github.com/MoonshotAI/kimi-cli/issues/2609)

- **作者**：SolomonFang
- **创建/更新**：2026-08-19 / 2026-08-19
- **状态**：已关闭（CLOSED）
- **评论/赞**：0 / 0

**为什么重要**  
这是今日唯一更新的 Issue，直接暴露了 `kimi acp` 在 ACP 模式下的关键限制：`Grep` 和 `Glob` 工具几乎必然失败，提示“ACP runtime only supports interactive Bash tool processes”。而 `Read` 工具正常工作。该问题影响使用 Zed 等 ACP 客户端的用户，说明非交互式只读工具在受限运行环境中无法使用，可能打断了依赖代码搜索的自动化流程。

**社区反应**  
目前无评论和点赞，但由于 issue 在 24 小时内即被关闭，社区尚未形成讨论。关闭原因可能是官方确认这是当前 ACP 运行时设计边界，或者是补丁快速合入前的临时关闭，需要后续进一步观察。

## 重要 PR 进展

今日无重要 PR 更新。

## 功能需求趋势

基于当前仅有的 Issue，可以观察到以下社区关注点：

- **ACP 模式工具能力边界**：用户希望 `Grep`/`Glob` 这类无需交互的只读工具在 ACP runtime 中也能正常工作，而不是被强制要求使用交互式 Bash。
- **IDE 集成场景的可靠性**：问题出现在 macOS 上的 Zed 通过 `kimi acp` 调用的过程，反映社区对非 VS Code 编辑器的支持质量有期待，尤其需要保证基础搜索工具不因 runtime 模式而失效。
- **错误信息可观测性**：Bash 间歇性报告“ACP terminal capability is unavailable”，说明错误提示不够稳定和可解释，社区期望更明确的失败原因和应对指引。

## 开发者关注点

- **ACP 模式下工具调用失败是当前最大痛点**：内置 `Grep` 和 `Glob` 被硬性拒绝，对依赖只读搜索的编码辅助场景影响明显。
- **希望提供配置开关或更精细的权限策略**：让开发者能够选择是否允许在 ACP runtime 中执行非交互式 Bash 工具，而不是直接一刀切。
- **错误处理与降级方案**：出现“terminal capability unavailable”时，应该给出备用建议（例如使用 `Read` 还是修改客户端配置），而不是让用户自行排查。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-08-20

## 今日速览

过去 24 小时无新版本发布，但社区提交活跃：18 个 Issue 更新、50 个 PR 更新。焦点集中在 TUI 稳定性（粘贴失效、文本丢失、资源泄漏）、AI 模型兼容性（gpt-5.6 系列在 OpenCode Go 上频发错误）、以及性能问题（30GB 数据库膨胀、/tmp 填充导致启动失败）。

## 社区热点 Issues

**1. [2.0] TUI：每次启动向 /tmp 泄漏约 21MB .so 文件，填满 tmpfs 后导致 TUI 无法启动**
`#42700` | 作者: jsongalvez | 评论: 3
TUI 每次启动都会在临时目录写入一个约 21MB 的 .so 文件且从不清理，多次启动后直接填满 tmpfs，随后以 OpenTUI 库加载错误告终。对于长期使用 TUI 的开发者是一个确定性故障，且清理成本极高。
🔗 https://github.com/anomalyco/opencode/issues/42700

**2. [2.0] subagents: gpt-5.6-sol-fast 因注入 prompt_cache_retention 而失败**
`#43367` | 作者: brandon-julio-t | 评论: 7 | 👍: 10（今日最高赞）
使用 `openai/gpt-5.6-sol-fast` 的 subagent 在工具执行后停止运行，原因是 OpenCode 发送了该模型不支持的 `prompt_cache_retention` 参数。三个独立 review subagent 在三分钟内陆续失败，影响面广且难以排查。
🔗 https://github.com/anomalyco/opencode/issues/43367

**3. OOM 与约 30GB 数据库：工作区大文件差异被完整序列化到每次 message.updated 事件**
`#43551` | 作者: isHarryh | 评论: 1
当工作区内的文本文件在会话期间持续增长（作者场景中两个日志文件分别达 292MB 和 407MB），OpenCode 将完整文件差异嵌入消息摘要，且每次 `message.updated` 事件都重新序列化，最终导致 OOM 和数据库膨胀至约 30GB。属于极端但真实的性能陷阱。
🔗 https://github.com/anomalyco/opencode/issues/43551

**4. 自动更新器破坏全局 npm 安装：stub 二进制 + 缺失 shim，并遗留挂起的 npm 进程**
`#42291` | 作者: hyp-type | 评论: 3
Windows 11 上通过 `npm install -g opencode-ai` 安装后，自动更新器在每次启动时可能将全局安装替换为 stub 二进制、丢失 shim，并留下无法终止的 npm 进程。对 npm 用户而言，一次更新即可永久破坏安装环境。
🔗 https://github.com/anomalyco/opencode/issues/42291

**5. OpenCode Go：gpt-5.6-luna 返回空响应 / 403 错误**
`#43565` | 作者: misaka11033 | 评论: 1
通过 Claude Code CLI 接入 OpenCode Go 端点使用 `gpt-5.6-luna` 时返回空响应或 403。与该系列另一个模型问题（#43367）叠加，说明 gpt-5.6 系在 OpenCode Go 上的兼容性仍是短板。
🔗 https://github.com/anomalyco/opencode/issues/43565

**6. [2.0] TUI：提交 POST 进行中输入的内容被静默销毁**
`#43563` | 作者: kitlangton | 评论: 0
通过种子化网络故障注入测试发现（seeds 1/7/99 均能复现）：当 `session.prompt` POST 尚未返回时，用户输入的内容会被静默清除，因为 composer 只在请求 resolve 后才清空。属于数据丢失级缺陷。
🔗 https://github.com/anomalyco/opencode/issues/43563

**7. [2.0] server: workspace=global 请求全部返回 HTTP 500**
`#42532` | 作者: wujiachen0727 | 评论: 2
桌面客户端几乎所有与 workspace 相关的 API 在 workspace 为 `global` 时返回 `Path is not absolute: global`，导致界面不断弹出“无法重新加载 global”的 toast。核心用户路径（全局配置/对话管理）完全不可用。
🔗 https://github.com/anomalyco/opencode/issues/42532

**8. Sidecar 60 秒内未就绪（桌面端启动失败）**
`#43568` / `#43559` | 作者: rpb24 / vilesupe | 评论: 各 1
两位用户在同一天报告相同错误：`Sidecar did not become ready within 60000ms`，涉及 `@opencode-aidesktop` 的 `app.asar` 侧车进程。桌面端存在启动可靠性问题，值得优先排查。
🔗 https://github.com/anomalyco/opencode/issues/43568 / https://github.com/anomalyco/opencode/issues/43559

**9. [2.0] TUI：无法关闭当前活跃会话的标签页**
`#43553` | 作者: austin-thesing | 评论: 1
点击 X 后标签页短暂消失又立即恢复，重启后依然存在；同一项目内其他标签页可正常关闭。属于 TUI 会话管理的基础交互缺陷。
🔗 https://github.com/anomalyco/opencode/issues/43553

**10. [FEATURE] 桌面应用内实现消息搜索（Cmd+F / Ctrl+F）**
`#19143` | 作者: mpiosik | 评论: 8 | 👍: 7
自 3 月提出至今仍在更新，是 Issue 列表中生命周期最长的功能请求。长会话中无法快速定位历史消息，用户迫切需要类似编辑器的搜索能力。
🔗 https://github.com/anomalyco/opencode/issues/19143

---

## 重要 PR 进展

**1. fix(core): 正确处理外来类型工具调用失败（避免永久 pending）**
`#43576` | 作者: kitlangton | 状态: OPEN
插件工具抛出非 `Tool.Error` 的外来类型错误时，工具调用会永远处于 running 状态，spinner 不消失而步骤继续执行。该 PR 将此类失败正式结算为失败而不是丢弃。
🔗 https://github.com/anomalyco/opencode/pull/43576

**2. feat(core): 为已配置模型添加保守的变体后备方案**
`#43574` | 作者: rekram1-node | 状态: OPEN
当用户配置新模型而未指定 `variants` 时，自动生成包感知的保守 variants；同时保留 `variants: []` 作为显式退出机制。覆盖 AI SDK、OpenAI、Azure、Google、Vertex、Anthropic 等提供方。
🔗 https://github.com/anomalyco/opencode/pull/43574

**3. fix(tui): 停止为每条 transcript 行注册一个 resize 监听器**
`#43562` | 作者: kitlangton | 状态: OPEN
监听器数量随 transcript 长度线性增长，触发 Bun 的 `MaxListeners` 警告——大约 4 条 prompt 后就会出现，长会话中可达数十甚至更多。这是 TUI 长期会话内存/事件泄漏的重要修复。
🔗 https://github.com/anomalyco/opencode/pull/43562

**4. fix(ai): 结算 pending 的 Responses 工具调用**
`#43575` | 作者: rekram1-node | 状态: CLOSED
当 Responses 流在未发出 `response.output_item.done` 的情况下成功结束时，现在会先结算挂起的函数调用，再走既有工具输入路径完成步骤，避免会话卡死。
🔗 https://github.com/anomalyco/opencode/pull/43575

**5. refactor(ai): 移除模型能力限制**
`#43581` | 作者: rekram1-node | 状态: OPEN
从 AI 模型、路由和 provider-package 默认值中移除模型能力上限，停止将 Core catalog 限制投影到 AI provider 设置中；Anthropic Messages 默认 `max_tokens` 改为 32K。
🔗 https://github.com/anomalyco/opencode/pull/43581

**6. feat(plugin): 为插件添加 HTTP 路由（webhook 端点）支持**
`#43499` | 作者: minderm | 状态: CLOSED
为 OpenCode server 插件新增 HTTP 路由能力，允许插件暴露 webhook 端点。关闭 #41362，是插件系统的重要扩展。
🔗 https://github.com/anomalyco/opencode/pull/43499

**7. fix(tui): 展示加密推理状态**
`#43578` | 作者: opencode-agent[bot] | 状态: OPEN
当推理部分包含不透明 provider 元数据但没有可读文本时，不再渲染成空白；完成后展示为 `Thought · <duration> · encrypted`，保留交互性并如实反映加密推理的存在。
🔗 https://github.com/anomalyco/opencode/pull/43578

**8. feat(desktop): 优化冷启动开发流程（17.4s → 6.4s）**
`#42722` | 作者: Hona | 状态: OPEN
将 desktop 冷启动中位数从 17,422ms 降至约 6.4s，经过 rebase 到当前 V2 架构后仍保持约 2.7 倍加速。对桌面端开发者体验是一次显著改进。
🔗 https://github.com/anomalyco/opencode/pull/42722

**9. feat(ai): 将流式拒答（refusal）保留为可见文本**
`#43343` | 作者: rekram1-node | 状态: OPEN
OpenAI Chat 的 `delta.refusal` 以及 Responses 的 `response.refusal.delta/done` 现在会作为普通助手文本展示，而不是静默丢弃。有利于用户感知模型拒绝行为。
🔗 https://github.com/anomalyco/opencode/pull/43343

**10. feat(stats): 合并 Free 与 Go 用量统计**
`#43577` | 作者: opencode-agent[bot] | 状态: CLOSED（含后续 `#43580` 修正文案）
将 Free 数据行纳入现有 Go 作用域的统计查询，并经过同一聚合路径输出，应用数据结构和对外文案保持不变。
🔗 https://github.com/anomalyco/opencode/pull/43577

**其他值得关注的 PR 进展：**
- `#43567` — 将 Effect 升级至 rc.110，统一 workspace 依赖。
- `#43569` ~ `#43573` — 系列重构（kitlangton）：使用 Effect `Latch` 替换手写的 `Deferred` 信号门，覆盖插件 supervisor、MCP 启动、server 关停、renderer 关停、shell 输出门等场景。
- `#43579` — 桌面端从活跃目录解析分支，对齐 V2 TUI 的 location-first 行为。
- `#32370` — Linux 主剪贴板支持仍在持续更新（`linux_clipboard_selection` 配置项）。

🔗 https://github.com/anomalyco/opencode/pulls

---

## 功能需求趋势

1. **TUI/桌面端交互修复成为绝对主线** — 今日 18 个 Issue 中超过半数指向 TUI/桌面端问题：粘贴失效（#43241、#43233）、文本静默丢失（#43563）、标签页无法关闭（#43553）、Sidecar 启动超时（#43568、#43559）等。2.0 版本的终端 UI 稳定性是社区当前最大的痛点。
2. **gpt-5.6 系列模型兼容性** — `gpt-5.6-sol-fast` 与 `gpt-5.6-luna` 在 OpenCode 上分别出现参数注入错误和空响应/403（#43367、#43565、#43557），新模型支持节奏快但质量跟踪不足，社区反应强烈。
3. **资源管理与性能治理** — 从 /tmp 泄漏（#42700）、30GB 数据库膨胀（#43551）、启动时间优化（#42722）、到 resize 监听器泄漏（#43562），性能问题是贯穿 Issue 与 PR 的共同主题。
4. **消息/会话检索能力** — #19143 的桌面消息搜索请求持续获得关注（8 评论、7 👍），长会话场景下用户对内容可发现性的需求明确。
5. **插件系统能力扩展** — #43499 为插件引入 HTTP 路由/webhook 支持，插件生态正在从“工具调用”向“服务端能力”延伸。

---

## 开发者关注点

- **桌面端 Sidecar 启动超时集中爆发**：一天内两名独立用户报告完全相同的 `Sidecar did not become ready within 60000ms` 错误（#43568、#43559），且均被标记为 `needs:compliance`，桌面版发布质量需要复盘。
- **AI 模型接入的“隐性破坏”**：多个问题来自 OpenCode 自动注入模型不支持参数（如 `prompt_cache_retention`）或加密内容校验失败（#43557），开发者倾向于认为这是 OpenCode 的兼容层责任，而非模型问题。
- **数据丢失的零容忍**：TUI 中“请求发送中输入被静默抹掉”（#43563）虽然是网络故障注入测试发现的边缘场景，但开发者在反馈中认为这是“数据丢失级别”的严重缺陷，社区会以极高优先级看待。
- **自动更新器的信任危机**：npm 全局安装被 stub 二进制破坏并遗留挂起进程（#42291）一旦规模化触达用户，对更新机制的信任成本很高。
- **结构性重构开始回归**：多位贡献者（kitlangton、rekram1-node）正在推动将手写 `Deferred` 模式替换为 Effect `Latch`、移除模型能力限制等底层清理，说明社区在追赶功能的同时也在强调代码基础的可维护性。

---

*本日报数据来自 GitHub: anomalyco/opencode，统计区间为 2026-08-19 至 2026-08-20。*

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 — 2026-08-20

## 今日速览

今日 Qwen Code 完成 v0.21.14 的端到端验证发布（SWE-bench Verified 500/500 全数通过，Terminal-Bench 2.0 得分 89）。社区侧聚焦稳定性与渠道集成：Web Shell 剪贴板在非 localhost HTTP 场景失效的问题获得修复 PR，ACP 多会话日志串扰被报告为 P2 bug，DingTalk 引用消息静默丢失问题同步出现 issue 与修复 PR。

## 版本发布

**dsw-eas-full-20260820-r1**（对应 v0.21.14）
- 全链路端到端验证通过：SWE-bench Verified 500 条全部成功（500/500）、Release 回写、Terminal-Bench 2.0 共 89 项测试及最终回写。
- 前序验证版本 `dsw-eas-full-20260819-r1` 状态一致，均为 **SUCCEEDED**。
- 当前共梳理 6 条活跃 issue（其中 2 条为今日新增 P2 bug），50 条 PR 在过去 24 小时内有更新。

## 社区热点 Issues

今日共 6 条更新，按关注度排列如下：

1. **#9485 Web Shell 复制按钮在非 localhost HTTP 场景下失效** `[P2/bug, category/ui]`
   https://github.com/QwenLM/qwen-code/issues/9485
   - daemon 在远程 Linux 机器上运行时，通过 `http://<remote-ip>:4170` 打开 Web Shell，所有复制按钮报 `Clipboard API is not available`。
   - **社区反应**：4 条评论，为今日讨论最活跃的 issue，同一作者已于当日提交修复 PR #9540。

2. **#9534 / #9535 ACP 多路复用进程调试日志串扰** `[P2/bug, scope/session-management, scope/logging]`
   - https://github.com/QwenLM/qwen-code/issues/9534
   - https://github.com/QwenLM/qwen-code/issues/9535
   - 同一作者提交的两条 issue，分别从文件日志与 daemon 进程级两个角度描述同一根因：多会话共存的 ACP 进程中，新 `Config` 通过 `setDebugLogSession(this)` 覆盖进程级日志会话，导致会话 A 的调试信息写入会话 B 的日志文件。各获 2 条评论。
   - **关键影响**：在多会话排障场景下调试日志不可信，会直接误导问题定位。

3. **#9536 DingTalk 渠道丢弃引用消息内容** `[P2/bug, category/integration]`
   https://github.com/QwenLM/qwen-code/issues/9536
   - DingTalk 适配器在构建 agent prompt 前提取引用消息，但字段映射与实际 `text.repliedMsg` 负载不匹配，text/richText/interactiveCard 三类引用内容被静默丢弃。当日即有 PR #9537 跟进修复。
   - **社区反应**：2 条评论，问题复现路径清晰，修复方向明确。

4. **#7167 Fleet Shepherd Dashboard** `[scope/ci-cd]`
   https://github.com/QwenLM/qwen-code/issues/7167
   - 机器人自动维护的 CI/CD 状态看板，最近一次 tick 正常（scan-signal 年龄 4 分钟，0 syncs / 0 dispatches / 0 releases）。3 条评论。

5. **#9032 暴露结构化 Workflow 执行状态** `[P2/feature-request, roadmap/multi-agent, roadmap/background-automation]`
   https://github.com/QwenLM/qwen-code/issues/9032
   - 请求将阶段转换、代理分发、依赖边、审批关联与有序事件历史暴露为稳定的 JSON-safe 状态，以支撑下游工作流编排。该 issue 今日已关闭，讨论仍值得参考。

## 重要 PR 进展（精选 10 条）

1. **#9540 Web Shell/WebUI 剪贴板降级修复** `[fix, review/self-reported]`
   https://github.com/QwenLM/qwen-code/pull/9540
   - 新增 `writeClipboardText()` 统一复制入口：优先使用异步 Clipboard API，在非安全上下文降级为隐藏 textarea + `document.execCommand('copy')`，并在最终失败时给出可操作错误提示。直接解决 #9485。

2. **#9518 CI Shepherd 僵尸队列修复** `[fix, autofix/takeover]`
   https://github.com/QwenLM/qwen-code/pull/9518
   - GitHub 拒绝启动 workflow 时仍会创建 run（零 job 永久卡在 queued，且 cancel/delete 均被拒），此前被误计为 in-flight，现已修复计数逻辑。背景是 2026-08-19 超大 `qwen-autofix.yml` 触发的死锁。

3. **#9537 DingTalk 引用消息提取修复** `[fix, review/self-reported]`
   https://github.com/QwenLM/qwen-code/pull/9537
   - 按钉钉实际交付的引用类型分支解析：纯文本从正确嵌套字段读取正文，富文本与卡片引用均得到修复。对应 issue #9536，当日提交当日跟进。

4. **#9402 Agent Board — 跨 Agent 工作共享** `[feat]`
   https://github.com/QwenLM/qwen-code/pull/9402
   - 基于文件系统的 Agent Board MVP，使独立启动的多个 agent 可以共享工作成果。该 PR 说明此前删除 agent-view 基础代码的变更已废弃，仅保留新功能。

5. **#9527 沙箱镜像绑定拉取 digest** `[fix, autofix/takeover]`
   https://github.com/QwenLM/qwen-code/pull/9527
   - 将导出的沙箱镜像绑定到 pull 阶段实际得到的 digest，确保镜像内容可复现、抗篡改。重新落地自冻结的 #9214，并修复了审查提出的两个 Critical（R11-1/R11-2）。

6. **#9303 Web Shell transcript 保留上限，修复 renderer OOM** `[fix, autofix/takeover]`
   https://github.com/QwenLM/qwen-code/pull/9303
   - 限制浏览器端保留的 daemon 会话历史：原始回放快照注入 transcript store 后立即释放，回放重建与 live 增长共用块上限。

7. **#9506 模型路由切换时 token 计数失效** `[fix]`
   https://github.com/QwenLM/qwen-code/pull/9506
   - GeminiChat 的 API 报告 token 计数现在记录路由身份（模型 ID + 认证类型 + endpoint），活动路由切换后旧计数自动失效，避免计费用量数据失真。

8. **#9441 PreToolUse hook 返回 ask 时展示编辑/执行 diff** `[fix]`
   https://github.com/QwenLM/qwen-code/pull/9441
   - 被 hook 拦截的工具调用弹出等待审批时，不再只给纯文本提示，而是展示实际的编辑/执行差异供用户确认。

9. **#9533 Web Shell 侧边栏会话同步** `[fix]`
   https://github.com/QwenLM/qwen-code/pull/9533
   - 创建/重命名/删除/归档/固定/分组/改色后立即 reconcile 工作区；用户手动重试可绕过目录服务瞬时 backoff，后台刷新不受影响。

10. **#9466 将 rewind 映射锚定到稳定提示词身份** `[refactor, review/self-reported]`
    https://github.com/QwenLM/qwen-code/pull/9466
    - 以提示词身份作为可见用户轮次、模型历史、持久化会话、ACP rewind 与 fork 历史的唯一权威锚点，统一符号键元数据，提升回放可靠性。

**其他值得关注的 PR**：
- #9532 npm publish 全面启用 `--provenance` 与 `id-token` 权限（供应链签名）
- #9361 计划任务支持绑定已有存活会话
- #8927 渠道 sessionRotation 会话生命周期上限

## 功能需求趋势

从今日 Issues 中可以提炼出社区最关注的 5 个方向：

1. **Web Shell 浏览器端体验**（#9485）— 远程非安全上下文下的能力降级与可用性是当前前端最高频诉求。
2. **ACP/daemon 多会话隔离**（#9534/#9535）— 多路复用进程下的日志、状态等资源隔离要求提高，单条 issue 已不足以覆盖影响面。
3. **IM 渠道消息语义保真**（#9536）— 引用/富文本内容必须按各平台真实负载映射，静默丢弃是不可接受的失败模式。
4. **CI/CD 自动化运维可观测性**（#7167）— 机器人看板持续监控 bot fleet、同步与发布状态，社区对发布质量门禁的透明度有稳定需求。
5. **Workflow 状态结构化解耦**（#9032）— 调用方需要稳定的 JSON-safe 执行状态（阶段、依赖、审批、事件历史）来接驳下游编排，而非依赖内部 task 快照。

## 开发者关注点

- **非安全上下文浏览器 API 降级**：HTTP 非 localhost 访问时 Clipboard API 不可用，开发者要求优雅降级（如 execCommand 回退）而非直接报错。
- **调试日志的可信度**：日志串扰直接破坏多会话排障链路，进程级 fallback 调试会话需要与显式会话参数强隔离。
- **渠道字段映射静默失败**：DingTalk 等 IM 回调字段嵌套复杂，解析错误时静默丢弃比显式报错更难发现，建议为各消息类型补充解析器单元测试。
- **模型路由切换后的元数据一致性**：token 计数等 API 元数据必须绑定到产生它的路由身份，否则计费与用量分析失真（#9506）。
- **长会话内存膨胀**：daemon 将完整回放快照推送给浏览器端会触发 renderer OOM，需统一 live/回放两条路径的内存上限并尽快释放快照（#9303）。

</details>

---
*本日报由 [agents-radar](https://github.com/huang-yi-dae/agents-radar) 自动生成。*