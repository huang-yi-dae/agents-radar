# AI CLI 工具社区动态日报 2026-08-16

> 生成时间: 2026-08-16 01:05 UTC | 覆盖工具: 7 个

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

## AI CLI 工具横向对比分析日报（2026-08-16）

---

### 1. 生态全景

当前 AI CLI 工具赛道已进入"平台化与工程化"竞争阶段：头部工具（Claude Code、OpenAI Codex）的社区讨论重心从功能新奇性转向**稳定性、权限安全与长会话可靠性**；中间梯队（Gemini CLI、Copilot CLI）则在**Subagent 自主性、会话恢复与认证链路**上密集补课；新兴工具（Kimi Code、OpenCode、Qwen Code）以差异化场景切入，但普遍面临**计费透明度、记忆系统缺失和 CI/CD 自愈能力不足**的成长阵痛。多工具社区同时出现对存储膨胀、Windows 平台稳定性、非阻塞式交互（消息队列/会话续跑）及跨端状态一致性的集中诉求，说明用户期望已从"能用"转向"可依赖"。

---

### 2. 各工具活跃度对比

| 工具 | 今日活跃 Issues | 今日活跃 PRs | Release 情况 | 热点集中领域 |
|---|---|---|---|---|
| **Claude Code** | 10 个热点（最高 👍346） | 3 个 | 无新版本 | 多账户支持、Windows 崩溃、权限语义 |
| **OpenAI Codex** | 10 个热点（最高关注鼠标卡顿） | 10 个 | 2 个 alpha（rust-v0.148.0-alpha.19/20） | Windows 性能、存储膨胀、会话恢复 |
| **Gemini CLI** | 10 个热点（P1 多个） | 10 个 | 1 个 nightly（v0.56.0） | Subagent 可靠性、记忆系统、SSRF 修复 |
| **GitHub Copilot CLI** | 10 个热点 | 2 个 | 无新版本（1.0.80 为当前） | OAuth 回归、NixOS 兼容、Windows OOM |
| **Kimi Code** | 3 个热点 | 2 个 | 无新版本 | 订阅额度、记忆系统、兼容性 |
| **OpenCode** | 10 个热点 | 10 个 | 无新版本（v1.18.18 为当前） | 计费故障、grok-4.5 不可用、预算控制 |
| **Qwen Code** | 10 个热点 | 10 个 | 1 个 preview + 1 个 nightly | /review 可靠性、Web Shell、前缀缓存 |

---

### 3. 共同关注的功能方向

| 功能方向 | 涉及工具 | 具体诉求 |
|---|---|---|
| **多账户/多身份管理** | Claude Code（#27302，346👍）、Codex | 同一 Connector 多账号切换、账户级配置同步 |
| **非阻塞式交互** | Claude Code（#50246、#13354）、Gemini CLI（#25166） | 消息队列、会话续跑、执行中不被强制打断 |
| **Windows 平台稳定性** | Codex（#38750、#38546、#20214）、Copilot CLI（#4499）、Claude Code（#80444、#85199） | 系统级鼠标卡顿、GPU 崩溃、OOM、进程回收 |
| **存储膨胀与清理** | Codex（#25921、#35470、#30779）、Qwen Code（#9198 OOM） | Crashpad 无限增长、重复文件复制、会话 JSONL 膨胀、强制清理机制 |
| **会话恢复可靠性** | Codex（#35746、#18629）、Gemini CLI（#22323）、Claude Code（#77898） | 分页历史解码一致、恢复不丢上下文、不误报成功 |
| **权限模型语义一致性** | Claude Code（#77212）、Gemini CLI（#22093）、OpenCode（#32787） | "ask" 不被静默批准、禁用后不自动执行、声明规则真正生效 |
| **跨端上下文/配置同步** | Claude Code（#87028、#87027）、OpenCode（#42811 会话已读状态）、Copilot CLI（#4494 模型缓存） | claude.ai 与 CLI 记忆互通、多端状态一致 |
| **记忆系统** | Kimi Code（#1283，40 评论）、Gemini CLI（#26522、#26525）、Claude Code（#76868） | 跨会话持久记忆、提取跳过机制、敏感信息脱敏 |
| **订阅/计费透明度** | Kimi Code（#2604）、OpenCode（#37790、#42143） | 额度消耗可视化、配额感知压缩、付费后立即可用 |
| **CI/CD 自愈与可观测性** | Qwen Code（#9255、#9220）、Copilot CLI（#4346 403） | 失败兜底、checkout 自愈、静默失败显式化 |

---

### 4. 差异化定位分析

| 工具 | 定位 | 功能侧重 | 目标用户 | 技术路线/特点 |
|---|---|---|---|---|
| **Claude Code** | 全功能 Agentic 编码助手 | 多 Connector 生态、Hook 机制、Skill 插件体系 | 企业级开发者、重视可扩展性的团队 | 强 TUI 交互、丰富配置项、社区驱动功能迭代 |
| **OpenAI Codex** | 高性能桌面 + CLI 一体 | 多模型路由、ACP 协议、Guardian 权限审批 | 依赖 OpenAI 模型生态的开发者 | Rust 核心、桌面/CLI 双端、高频 alpha 迭代 |
| **Gemini CLI** | Google 生态内的 Agent 工具 | Subagent 委托、Auto Memory、行为评估体系 | Google Cloud / Vertex AI 用户 | 测试驱动（evals 体系快速扩展）、安全加固优先 |
| **Copilot CLI** | GitHub 深度集成的工作流工具 | MCP 生态、Codespaces 集成、/spawn 模板 | GitHub Actions CI 用户、企业开发者 | 与 GitHub 平台绑定紧密、ACP 支持完善中 |
| **Kimi Code** | 轻量、高性价比的编码 CLI | 订阅制配额、OpenAI 兼容层 | 独立开发者、中小团队 | 社区贡献者活跃、功能简洁 |
| **OpenCode** | 多 Provider 混合编排 | 本地 LAN 模型发现、Go 订阅、会话预算 | 自托管 + 云端混合架构用户 | 多 Provider 路由、服务端工作区（Docker 蓝图） |
| **Qwen Code** | 中文社区友好的全栈 CLI | /review 代码审查工程化、Web Shell、autofix | 中文开发者、阿里云生态用户 | CI 自愈能力、双语 release notes、阿里云 DSW 深度集成 |

---

### 5. 社区热度与成熟度

- **最活跃且成熟度最高**：**Claude Code** 以 346👍 的最高热 issue 和 229 条评论的讨论深度领跑，社区生态丰富（多 Connector、Hook、Skill），但近期未见版本发布，处于"功能饱和、稳定性补课"阶段。
- **高速迭代中**：**OpenAI Codex** 24 小时内合入 20+ PR + 2 个 alpha 版本，迭代速度全网最快，但高频发布也伴随 Windows 性能等长期未决问题，社区情绪渐趋焦灼。
- **质量基线快速夯实**：**Gemini CLI** 通过大量 evals PR 系统性补强行为评估，SSRF 漏洞修复和 Node 22 迁移表明安全优先级在上升，但 Subagent 可靠性问题仍是最明显短板。
- **成长中的追赶者**：**Qwen Code** 和 **OpenCode** PR 活跃度高（各 10 个），分别聚焦代码审查工程化和多 Provider 编排，处于功能快速扩展期，但稳定性（OOM、计费故障）仍需时间验证。
- **社区体量偏小但贡献者活跃**：**Kimi Code** 虽今日热点 issue 较少，但外部贡献 PR 质量高（#2524、#2506），社区治理模式初见成效。
- **平台依赖型社区**：**Copilot CLI** 的问题多与 GitHub 平台绑定（OAuth 回归、Codespaces 版本滞后），社区活跃度与 GitHub 生态节奏强相关，近期回归频次偏高引发信任担忧。

---

### 6. 值得关注的趋势信号

1. **"静默失败"成为众矢之的**：多工具社区集中抱怨"失败但无提示"——Claude Code 的 permission "ask" 被静默批准、Gemini CLI 的 MAX_TURNS 误报成功、Copilot CLI 的 Task 工具静默降级模型、Qwen Code 的 review job 死亡无兜底。**趋势**：显式报错正在成为开发者对 AI CLI 的核心信任底线，各工具应优先补齐失败可观测性。

2. **Windows 平台适配质量决定桌面端胜负**：Codex 的鼠标卡顿、Claude Code 的 GPU 崩溃、Copilot CLI 的 OOM——三大主流工具在 Windows 上同时"翻车"。**趋势**：Windows 开发者的市场规模不容忽视，平台稳定性将成为未来一个季度的重要竞争分水岭。

3. **存储管理从"技术债"升级为"用户痛点"**：Codex 单日 5GB Crashpad、单会话 400GiB 图片复制、TB 级会话存储——工具长期运行产生的数据膨胀已到不可忽视的程度。**趋势**：`codex doctor` 的存储诊断是正确方向，其他工具应跟进提供存储上限、自动清理与用量可视化。

4. **记忆系统从"加分项"变为"必需品"**：Kimi Code 的 #1283 持续半年 40 条评论、Gemini CLI 的记忆脱敏问题、Claude Code 的 frontmatter 数据丢失——跨会话记忆的准确性、安全性和无害性正在被严格审视。**趋势**：记忆系统将从"能做"走向"做得对"（脱敏、跳过机制、数据完整性）。

5. **CI/CD 场景成为新战场**：Copilot CLI 的 GITHUB_TOKEN 403、Qwen Code 的 runner 自愈与 PAT 隔离、OpenCode 的 ACP session 模型解析——各工具正将触角深入自动化流水线。**趋势**：面向 CI 的 headless 模式可靠性、身份隔离和可重试性将成为企业选型的关键考量。

6. **成本透明化诉求集体爆发**：Kimi Code 的额度缩水质疑、OpenCode 的付费后余额不更新、Gemini CLI 的预览模型静默降级、Codex 的 Bedrock 缓存不可控——用户对"花了多少钱、花在哪、能否控制"的知情权要求正在提高。**趋势**：配额感知的上下文压缩、每会话预算上限、Token 消耗可视化将成为差异化竞争力。

7. **安全边界从"外部攻击"扩展到"内部越权"**：SSRF 修复（Gemini CLI）、PAT 与不受信代码共享 runner（Qwen Code）、Hook 的 "ask" 被绕过（Claude Code）、/spawn 模板的跨会话注入（Copilot CLI）——安全问题不再只是防御外部攻击，更要防止 Agent 自身行为越界。**趋势**：权限模型的自洽性与最小权限原则将成为架构评审的必查项。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

## Claude Code Skills 社区热点报告（数据截止 2026-08-16）

---

### 1. 热门 Skills 排行

| 排名 | Skill / PR | 功能 | 社区讨论热点 | 状态 |
|------|-----------|------|-------------|------|
| 1 | **skill-creator 修复**（#1298） | 修复 `run_eval.py` 始终报告 0% recall 的严重 Bug，涉及 Windows 流读取、触发器检测及并行 worker 等多项修复 | 该问题有 10+ 独立复现（#556），是 skill-creator 优化循环的核心阻塞项，直接导致描述优化在噪音上运行 | OPEN |
| 2 | **document-typography**（#514） | 生成文档的排版质量控制：孤词换行（1-6 词溢出到下一行）、孤立段落标题、编号错位等 AI 生成文档常见问题 | 社区认为这些问题影响所有 Claude 生成的文档，用户很少主动提出但普遍存在 | OPEN |
| 3 | **ODT skill**（#486） | OpenDocument 格式（.odt/.ods）的创建、填充、读取及 ODT 转 HTML，覆盖 LibreOffice 及开源/ISO 标准格式文档需求 | 与现有 docx/pdf 形成互补，填补开源文档格式空白 | OPEN |
| 4 | **frontend-design 改进**（#210） | 重写前端设计 skill 的指令清晰度与可执行性，确保每条指令可在单次对话中执行 | 核心诉求：skill 指令应具体到足以引导行为，而非泛泛而谈 | OPEN |
| 5 | **skill-quality-analyzer + skill-security-analyzer**（#83） | 两个元 skill：质量分析器（结构/文档/示例/资源五维评估）与安全分析器 | 呼应社区对 skill 质量与安全的主流关注，与 Issue #492（信任边界滥用）直接相关 | OPEN |
| 6 | **testing-patterns**（#723） | 覆盖完整测试栈：测试哲学（Testing Trophy 模型）、单元测试（AAA 模式）、React 组件测试、边界用例 | 社区对结构化测试方法论有持续需求 | OPEN |
| 7 | **ServiceNow 平台 skill**（#568） | 广泛的 ServiceNow 平台助手：ITSM、ITOM、ITAM/SAM、FSM、HRSD、CSM、SPM、安全响应、IntegrationHub | 覆盖面广、更新活跃（3 月创建，8 月仍更新），是企业级平台类 skill 的代表 | OPEN |
| 8 | **pyxel 复古游戏开发**（#525） | 基于 pyxel-mcp 的复古/像素风/8-bit 游戏开发工作流（写 → 运行捕获 → 检查 → 迭代） | 创意类 skill 的代表，与 algorithmic-art 等形成生态互补 | OPEN |

---

### 2. 社区需求趋势

| 趋势方向 | 代表 Issue | 需求描述 |
|---------|-----------|---------|
| **安全性 & 信任边界** | #492（43 评论） | 社区技能在 `anthropic/` 命名空间下分发造成信任边界滥用，用户可能对非官方 skill 授予过高权限——最高热度 Issue |
| **Skill 分发与共享** | #228（16 评论） | 组织级 skill 共享：当前需手动下载 .skill 文件并通过 Slack/Teams 传输，社区期待直接共享链接或共享库 |
| **Skill 创建工具链修复** | #556、#1169、#202 | `run_eval.py` / `run_loop.py` 在 Windows 和常规环境下 0% 触发率，skill-creator 的优化循环整体不可信；且其风格偏开发者文档而非操作指令 |
| **上下文窗口管理** | #1487、#1175 | `claude-api` skill 单次注入 ~156k tokens 耗尽上下文；SharePoint 文档处理中的安全与上下文权衡 |
| **Agent 治理与生命周期** | #412、#1329、#1385 | Agent 治理模式（策略执行、威胁检测、信任评分）、紧凑记忆符号表示、推理质量门控管线 |
| **插件重复安装** | #189 | `document-skills` 与 `example-skills` 插件包含相同内容，导致重复 skill 占用上下文窗口 |

---

### 3. 高潜力待合并 Skills

以下 PR 评论活跃、讨论充分，且都在解决明确问题，近期落地概率较高：

| PR | Skill | 为什么值得关注 |
|----|-------|---------------|
| [#514](https://github.com/anthropics/skills/pull/514) | **document-typography** | 问题普遍性强（所有 AI 生成文档都会遇到），解决方案明确，讨论周期短（3/4 创建至 3/13），没有争议点 |
| [#486](https://github.com/anthropics/skills/pull/486) | **ODT** | 补齐 docx/pdf 之外的格式空白，ISO 标准格式在政府和欧盟场景有刚需 |
| [#723](https://github.com/anthropics/skills/pull/723) | **testing-patterns** | 社区对测试方法论持续高需求，skill 结构完整（哲学→单元→组件→边界） |
| [#568](https://github.com/anthropics/skills/pull/568) | **ServiceNow** | 更新持续至 8/12，作者持续投入，覆盖场景广，企业用户关注度高 |
| [#525](https://github.com/anthropics/skills/pull/525) | **pyxel** | 由 pyxel-mcp 作者（kitao）提交，专业度有保障，更新至 7/15 |

---

### 4. Skills 生态洞察

**社区最集中的诉求是：skill 创建工具链的可靠性（0% 触发率、Windows 兼容性）与安全分发机制（命名空间信任），其次是对文档格式覆盖（ODT/排版）和可执行性（指令具体到可操作）的持续补充。**

---

# Claude Code 社区动态日报 — 2026-08-16

## 今日速览

过去 24 小时 Claude Code 仓库无新版本发布，但社区讨论热度不减：多 Connector 账户支持（#27302）以 346 👍 / 229 评论继续霸榜，会话续跑与消息队列模式（#50246）等 TUI 体验类需求紧随其后。Windows 平台成为 bug 重灾区，桌面应用 GPU 崩溃（#80444）、Cowork 回归（#87024）等问题密集浮现；另有内存文件 Write 操作破坏 frontmatter（#76868）、`skillOverrides` 静默失效（#76156）等高影响 bug 引发开发者关注。

---

## 社区热点 Issues（10 个）

### 1. 多 Connector 账户支持（同连接器多账号）
**#27302** | 👍 346 | 💬 229 | [链接](https://github.com/anthropics/claude-code/issues/27302)
> 需求在 Claude 及 Claude Code Web 端支持同一 Connector 下的多账号切换。社区呼声极高，评论数在所有 issue 中一骑绝尘，是当前最受期待的功能之一。

### 2. 会话达上限后继续运行
**#13354** | 👍 197 | 💬 78 | [链接](https://github.com/anthropics/claude-code/issues/13354)
> 请求在会话限制达到后支持继续，而非强制开启新会话。长任务开发者的刚需，讨论热度持续攀升，已跨 8 个月仍为 open 状态。

### 3. 消息队列模式
**#50246** | 👍 197 | 💬 56 | [链接](https://github.com/anthropics/claude-code/issues/50246)
> 提议新增消息排队机制，避免在 Claude 执行任务时被迫中断。与 #13354 呼应，反映社区对非侵入式交互的强烈诉求。

### 4. 桌面版 GPU 进程崩溃（Windows）
**#80444** | 👍 5 | 💬 34 | [链接](https://github.com/anthropics/claude-code/issues/80444)
> Windows 桌面应用 1.24012.1 在打开内置浏览器标签页时触发致命 GPU 崩溃（0x060C201E），崩溃后 MSIX 包不可启动，需 Repair 才可恢复。影响面广，复现明确，属高优先级 bug。

### 5. 桌面版反复崩溃需 Repair（Windows）
**#85199** | 👍 4 | 💬 23 | [链接](https://github.com/anthropics/claude-code/issues/85199)
> 另一例 Windows 桌面应用持续崩溃问题，用户只能通过“高级选项 → 修复”恢复。与 #80444 疑似同源，社区等待官方统一修复方案。

### 6. 浏览器面板屏蔽同源子资源（macOS）
**#86362** | 👍 4 | 💬 5 | [链接](https://github.com/anthropics/claude-code/issues/86362)
> Claude Code 2.1.220 桌面版浏览器面板对映射到 127.0.0.1 的本地开发域名返回 ERR_BLOCKED_BY_CLIENT，页面空白。影响本地前端开发调试流程。

### 7. Commit attribution 设置被忽略
**#77830** | 👍 1 | 💬 5 | [链接](https://github.com/anthropics/claude-code/issues/77830)
> 用户通过配置 `attribution: {"commit": ""}` 关闭提交署名后，Claude Code 仍在 git commit 中注入 `Claude-Session:` trailer，且该注入发生在 Bash 工具描述层，用户无感知。已复现，涉及自动化提交规范场景。

### 8. PreToolUse "ask" 在 bypassPermissions 下被静默自动批准
**#77212** | 👍 0 | 💬 5 | [链接](https://github.com/anthropics/claude-code/issues/77212)
> 在 `permissions.defaultMode: "bypassPermissions"` 下，hook 返回 `permissionDecision: "ask"` 时不会弹窗，工具被静默执行；“deny” 则正常。权限体系存在语义歧义，存在安全风险。

### 9. 内存文件写入损坏 frontmatter
**#76868** | 👍 0 | 💬 1 | [链接](https://github.com/anthropics/claude-code/issues/76868)
> 当 Write/Edit 写入 YAML frontmatter 解析失败的 Markdown 文件时，Claude Code 不会拒绝写入，而是用空 stub 覆盖原 frontmatter，造成**数据丢失**。已关闭但影响严重，涉及自动记忆目录的完整性。

### 10. MCP 服务器连接成功但工具不可调用（Windows/VSCode）
**#86674** | 👍 0 | 💬 1 | [链接](https://github.com/anthropics/claude-code/issues/86674)
> Windows + VSCode 环境下 MCP 服务器连接正常，但工具不会作为可调用项展示，重启也无效。影响 MCP 生态的日常使用，等待官方排查。

---

## 重要 PR 进展（3 条）

### 1. fix: 避免授权安全研究期间的误报 CVP 状态变更
**#86870** | 作者: JoTalbot | [链接](https://github.com/anthropics/claude-code/pull/86870)
> 在 `security-guidance/hooks/review_api.py` 中引入任务上下文检查机制，扩展 `cap_diff_for_prompt()` 以感知会话元数据（CVS 状态、教学实验环境），新增 `is_authorized_lab()` 标记。**解决的问题**：授权安全研究场景下，CVP 安全触发器在正常操作中产生大量误报。

### 2. 在项目范围启用 frontend-design 插件
**#84600** | 作者: DanWebOps | [链接](https://github.com/anthropics/claude-code/pull/84600)
> 注册官方 anthropics/claude-code marketplace，并通过 `.claude/settings.json` 启用 frontend-design skill，使本仓库所有使用 Claude Code 的开发者自动加载该技能。**性质**：仓库级配置变更，反映前端设计类 skill 的实际采用需求。

### 3. Claude/自动化工单库存清单
**#82981** | 作者: Eduardo-neira | [链接](https://github.com/anthropics/claude-code/pull/82981)
> 该 PR 无描述信息，标题指向“自动化库存清单”场景，疑似个人项目性质的配置提交，非核心代码修改，社区参考价值有限。

---

## 功能需求趋势

- **多账户 / 多身份管理**：#27302（多 Connector 账户）持续霸榜，叠加 #84331（Keychain 凭据损坏）等认证相关问题，账号体系是社区最集中的痛点。
- **非阻塞式交互**：#50246（消息队列）与 #13354（会话续跑）构成同一大方向——用户希望在不打断当前任务流的前提下与 Claude 交互。
- **Windows / 桌面端稳定性**：#80444、#85199、#87024、#86999 等 Windows 专属问题密集出现，涵盖 GPU 崩溃、PATH 配置、MCP 工具不可用等，平台适配质量成关注焦点。
- **跨端上下文打通**：#87028（claude.ai 与 Claude Code 记忆不互通）和 #87027（账户级配置同步）同时出现，表明用户期望跨产品、跨机器的统一记忆与配置体验。
- **TUI 可用性细节**：#62929（可见滚动条）等 UI 细粒度控制诉求持续存在，说明用户对终端交互品质有更高期待。

---

## 开发者关注点

- **权限模型的语义一致性**：#77212（"ask" 被静默批准）与 #74567（`dontAsk` 忽略 allow 规则）指向权限系统的逻辑矛盾，headless 场景下尤其致命。
- **Hook 机制的隐性行为**：#78527（deny 中断整个轮次）、#77110（复合命令 allow 不生效）、#76297（hook 不按来源去重）三案齐发，hook 生态的边界行为亟待官方明确与修复。
- **记忆与文件安全**：#76868（frontmatter 被覆盖导致数据丢失）虽已关闭，但类似数据完整性风险仍需关注；#77898（单个坏文件导致整个项目 /resume 为空）同样点出记忆目录的脆弱性。
- **CLI 认证与令牌**：#86986（setup-token 令牌首次请求即被拒）影响自动化 CI 接入，对 headless 工作流的可靠性构成直接威胁。
- **`@import` 的继承缺陷**：#79046 确认只有当前目录级 CLAUDE.md 的导入生效，祖先目录的导入被忽略，与官方文档描述不符，影响多级项目记忆组织。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报

**2026-08-16**


## 今日速览

Windows 桌面端性能问题（系统级鼠标卡顿、高 CPU 占用）成为社区最集中的痛点，昨日新增多起相关报告并引发大量讨论；官方在 24 小时内密集合入 20+ 个 PR，主要涉及 TUI 状态管理、权限请求路由和会话稳定性修复；同时发布了两个 Rust 版本的 alpha 更新。


## 版本发布

### rust-v0.148.0-alpha.20 / rust-v0.148.0-alpha.19
过去 24 小时内连续发布两个 alpha 版本，主要跟随主分支持续迭代。从同期合并的 PR 来看，此版本线包含 TUI 会话状态展示、MCP hook 支持、权限请求路由重构等变更。建议关注后续 release notes 确认完整变更集。

- 发布链接：https://github.com/openai/codex/releases


## 社区热点 Issues

### 1. Windows 平台系统级鼠标卡顿（新增多起报告）
**#38750** [Windows] Codex 空闲时系统卡顿，完全退出应用后恢复；**#38719** Aug 15 更新后空闲 ChatGPT.exe 循环导致光标卡顿；**#38546** 非管理员权限运行时导致系统级鼠标卡顿。这些报告与 #20214（104 评论）、#28109（23 评论）形成呼应，Windows 性能问题已持续数月未彻底解决，社区情绪渐趋焦灼。

- https://github.com/openai/codex/issues/38750
- https://github.com/openai/codex/issues/38719
- https://github.com/openai/codex/issues/38546
- https://github.com/openai/codex/issues/20214

### 2. #38518 — 切换对话触发 350-800 MiB/s 持续读盘循环
Windows 桌面端在打开或切换会话时触发高磁盘读取并伴随系统卡顿。这是继 #28109 之后又一例与会话目录读取相关的性能问题，暗示状态数据库或 rollout 文件加载逻辑存在缺陷。

- https://github.com/openai/codex/issues/38518

### 3. #38760 — macOS Computer Use 进程风暴导致内核恐慌
`SkyComputerUseService` 以每秒 5-8 个进程的频率被反复拉起且不被回收，最终耗尽 `launchservicesd` 并触发 WindowServer watchdog 内核崩溃。#38769 也报告了类似问题——即使禁用 Computer Use 仍会复现。

- https://github.com/openai/codex/issues/38760
- https://github.com/openai/codex/issues/38769

### 4. #25921 — Crashpad 崩溃转储无限增长
桌面端在 `~/Library/.../Crashpad/pending` 下持续生成 `.dmp` 文件，单日可增长 5GB 以上（54,504 个文件）。反映应用存在高频崩溃或异常退出路径。

- https://github.com/openai/codex/issues/25921

### 5. #34614 — MCP 子进程未被正确回收
Windows 上重复的 MCP 会话套件持续累积，`cmd.exe`/`node.exe` 孙进程未被正确终止。仓库中已有 Job Object 模式但未在 MCP spawn 路径使用，属于已知修复方案未落地的情况。

- https://github.com/openai/codex/issues/34614

### 6. #35470 — Codex 复制同一图片文件 150,000 次
Windows CLI 在单次会话中重复复制同一图片文件 15 万次，消耗 400 GiB 磁盘空间。属极端存储膨胀案例，与 #30779（subagent 会话 JSONL 无限膨胀）、#34337（会话存储可达 TB 级）共同指向存储管理缺陷。

- https://github.com/openai/codex/issues/35470
- https://github.com/openai/codex/issues/30779
- https://github.com/openai/codex/issues/34337

### 7. #35746 — 分页历史丢失 rollout 记录且序号复用
CLI 分页加载历史时存在 `RolloutLine` 解码不一致，会丢弃有效记录并复用序号，导致会话恢复后内容错乱。

- https://github.com/openai/codex/issues/35746

### 8. #18629 — Base64 图片内联导致线程无法恢复
桌面端将工具输出（尤其是 `input_image` base64 负载）内联持久化到会话历史中，累积到一定程度后线程恢复时返回 `400 Bad Request`，并伴随 token 用量膨胀。

- https://github.com/openai/codex/issues/18629

### 9. #37674 — Bedrock GPT-5.6 Sol 无法控制显式缓存
原生 CLI 请求 Amazon Bedrock 时无法启用显式 prompt caching，导致 cache-write token 开销显著增加。对成本敏感的生产用户影响较大。

- https://github.com/openai/codex/issues/37674

### 10. #38814 — macOS arm64 npm 产物签名校验失败
`@openai/codex-sdk` 的 macOS arm64 可执行文件无法通过代码签名验证，影响 CI 或严格安全策略环境下的 SDK 集成。

- https://github.com/openai/codex/issues/38814


## 重要 PR 进展

### 1. #38795 — `codex doctor` 新增存储诊断
报告 `CODEX_HOME` 和工作目录可用空间，低于 5 GiB 警告、1 GiB 报错；Windows 上检测 Git worktree 是否位于受信任的 Dev Drive。直击近期大量存储膨胀类 issue。

- https://github.com/openai/codex/pull/38795

### 2. #38774 — 持久化 exec 线程改用分页历史
`codex exec` 启动持久线程时请求分页历史，旧存储不支持时回退。有望缓解 #35746 等分页历史相关问题。

- https://github.com/openai/codex/pull/38774

### 3. #38785 — 活动回合期间保持模型设置稳定
回合进行中（含采样请求间）发生的设置变更将在下一回合生效，避免模型配置中途被修改。

- https://github.com/openai/codex/pull/38785

### 4. #38701 — 权限请求统一走 Guardian 审批通道
将 `request_permissions` 统一为共享审批动作，由 Guardian 统一处理，自动权限审查期间保留回合取消能力。

- https://github.com/openai/codex/pull/38701

### 5. #38705 — Hooks 引擎新增 MCP 工具处理器
支持发现同步 `mcp_tool` hook 处理器并通过 executor 调用对应 MCP server/tool，嵌套占位符展开且保留 JSON 类型。

- https://github.com/openai/codex/pull/38705

### 6. #38682 — 对齐策略违规暴露为类型化错误
从响应流及 HTTP 400/403 中识别 `misalignment_policy_violation`，保留上游消息并标记为不可重试。

- https://github.com/openai/codex/pull/38682

### 7. #38819 — 支持预保留线程 ID 的元数据暂存
调用方可在 Core 启动前将宿主机状态关联到预保留的线程 ID，恢复已有线程时拒绝保留 ID 以避免冲突。

- https://github.com/openai/codex/pull/38819

### 8. #38817 — TypeScript SDK 支持原始配置覆盖
新增 `CodexOptions.configOverrides`，用于传递字面量路径键权限映射等无法通过结构化点分键表达的 TOML 配置。

- https://github.com/openai/codex/pull/38817

### 9. #38690 — exec-server 中继链路透传 trace context
relay 帧新增 W3C `traceparent`/`tracestate` 字段，跨 Noise 记录分片的加密请求也正确携带上下文，便于端到端链路追踪。

- https://github.com/openai/codex/pull/38690

### 10. #38681 — 代理会话保留 HTTP 降级状态
WebSocket 降级是会话级别的，代理会话不再重新尝试 WebSocket 连接，避免父会话已降级后重复握手。

- https://github.com/openai/codex/pull/38681


## 功能需求趋势

| 方向 | 代表 Issue | 热度 |
|---|---|---|
| Windows 性能与稳定性 | #20214、#38546、#38750 | 🔥🔥🔥 极高 |
| 存储空间管理与清理 | #25921、#30779、#34337、#35470 | 🔥🔥🔥 极高 |
| 会话隔离与组织 | #3550（按项目/工作区分隔聊天与任务） | 🔥🔥 高 |
| SDK 配置灵活性 | #38817（config overrides）、#38814（签名修复） | 🔥 中 |
| 模型缓存与成本控制 | #37674（Bedrock 显式缓存控制） | 🔥 中 |
| MCP 生命周期管理 | #34614（子进程回收）、#38705（hook 支持） | 🔥 中 |


## 开发者关注点

- **Windows 桌面端性能是当前最大痛点**：多起报告指向空闲/低负载时系统级卡顿，涉及 UI 进程 CPU 占用（#37372）、会话切换读盘风暴（#38518）和更新后回归（#38719）。社区已出现多份详细报告，但官方尚未给出明确修复时间表。
- **存储膨胀问题持续累积**：崩溃转储、subagent 会话、图片复制等多个路径都在制造 GB 到 TB 级的磁盘占用，开发者期待官方提供存储上限与自动清理机制。`codex doctor` 存储诊断是一个积极信号。
- **会话恢复可靠性受关注**：分页历史解码不一致（#35746）、base64 内联阻塞恢复（#18629）直接影响长时间任务的可用性，恢复失败往往伴随 token 浪费。
- **macOS 与 Windows 均现 Computer Use 服务失控**：进程反复拉起、不被回收，甚至导致内核恐慌，且禁用后仍可能触发，需要官方紧急排查。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报

**日期：2026-08-16**


## 今日速览

昨日发布 v0.56.0 夜间版，内容为 SSR Agent 测试基础设施修复。社区热度集中在 Subagent 稳定性问题上：`MAX_TURNS` 被误报为成功、generalist agent 无限挂起、以及模型自动调用 subagent 的主动性不足。安全方面，多个 PR 正在推进 SSRF 漏洞修复和 Node 22 沙箱升级。


## 版本发布

### v0.56.0-nightly.20260815.g2a87e7be1

- 修复 SSR Agent 测试：在 a2a-server 测试中将 `process.env` 迁移至 `vi.stubEnv`（PR #28811）
- 完整变更日志：[v0.56.0-nightly.20260814...v0.56.0](https://github.com/google-gemini/gemini-cli/compare/v0.56.0-nightly.20260814.gc0d192452...v0.56.0)


## 社区热点 Issues

### 1. Subagent 达到 MAX_TURNS 后被误报为 GOAL 成功（#22323）
[Issue #22323](https://github.com/google-gemini/gemini-cli/issues/22323) · P1 · 评论 12 · 👍 2

`codebase_investigator` 在达到最大轮次限制、未执行任何分析时，仍报告 `status: "success"` 和 `Termination Reason: "GOAL"`。结果失真会直接掩盖中断事实，属于高优先级 bug，评论区讨论热烈。

### 2. Generalist agent 无限挂起（#21409）
[Issue #21409](https://github.com/google-gemini/gemini-cli/issues/21409) · P1 · 评论 8 · 👍 8

用户报告委托给 generalist agent 后永久挂起，甚至创建文件夹这类简单操作也会卡住，最长等待 1 小时无响应。社区关注度高（👍 8），目前 workaround 是提示模型不要调用 subagent。

### 3. Shell 命令执行完成后卡在 "Waiting input"（#25166）
[Issue #25166](https://github.com/google-gemini/gemini-cli/issues/25166) · P1 · 评论 4 · 👍 3

简单 CLI 命令执行完毕后，终端仍显示命令活动并等待输入。该问题反复出现，影响日常开发流，可能与终端状态管理有关。

### 4. 自动记忆（Auto Memory）对低信号会话无限重试（#26522）
[Issue #26522](https://github.com/google-gemini/gemini-cli/issues/26522) · P2 · 评论 5

提取代理跳过低价值会话后，该会话不会被标记为已处理，导致后续反复出现。属于资源浪费类问题，社区期待更智能的跳过机制。

### 5. Gemini 不会主动使用 skills 和 sub-agents（#21968）
[Issue #21968](https://github.com/google-gemini/gemini-cli/issues/21968) · P2 · 评论 6

用户反映模型即使有相关的自定义 skills（如 gradle、git），也不会主动调用，只有显式指示才会使用。这直接影响 Gemini CLI 的自动化潜力，社区讨论较多。

### 6. Browser agent 在 Wayland 下失败（#21983）
[Issue #21983](https://github.com/google-gemini/gemini-cli/issues/21983) · P1 · 评论 4

Wayland 环境下 browser subagent 直接失败并终止。属于环境兼容性 bug，对 Linux 桌面用户影响较大。

### 7. 工具数量超过 128 个时出现 400 错误（#24246）
[Issue #24246](https://github.com/google-gemini/gemini-cli/issues/24246) · P2 · 评论 3

当可用工具超过 400 个时请求返回 400 错误。社区期待模型能智能地按需裁剪工具范围，而非全量加载。

### 8. Browser Agent 忽略 settings.json 配置覆盖（#22267）
[Issue #22267](https://github.com/google-gemini/gemini-cli/issues/22267) · P2 · 评论 3

Browser Agent 不读取全局或项目级 `settings.json` 中的覆盖配置（如 `maxTurns`）。虽然 `AgentRegistry` 在初始化时正确合并了设置，但实际运行被忽略，配置能力形同虚设。

### 9. 自动记忆的确定性脱敏与日志精简（#26525）
[Issue #26525](https://github.com/google-gemini/gemini-cli/issues/26525) · P2 · 评论 4

Auto Memory 将本地转录内容发送至模型上下文后才提示模型脱敏，敏感信息在进入上下文前未被处理；同时服务可能记录已存在的 skill 内容。属于隐私/安全问题。

### 10. 子代理在 v0.33.0 后未经许可运行（#22093）
[Issue #22093](https://github.com/google-gemini/gemini-cli/issues/22093) · P2 · 评论 3

用户配置中禁用了 agent 模式，但更新到 v0.33.0 后 subagent 仍然被自动调用，预期外的行为引发对权限控制的担忧。


## 重要 PR 进展

### 1. 预览模型被静默替换时增加警告（#28828）
[PR #28828](https://github.com/google-gemini/gemini-cli/pull/28828) · P1 · 新增

当用户请求预览模型（如 `gemini-3.1-pro-preview`）但账户无对应权限时，`Config` 会静默切换至 `auto-gemini-2.5`，不提供任何提示。此 PR 增加警告机制，修复 #28825。对开发者透明度有直接帮助。

### 2. 避免 401 子串引起的错误认证判定（#28827）
[PR #28827](https://github.com/google-gemini/gemini-cli/pull/28827) · P2 · 新增

修复 `isAuthenticationError` 将包含 "401" 的无辜文本误判为认证失败的问题（如端口号 `4010`）。现在仅在消息开头或 HTTP 状态上下文时识别 401。修复 #28203。

### 3. 行为评估：任务追踪器关系与错误恢复（#28823）
[PR #28823](https://github.com/google-gemini/gemini-cli/pull/28823) · XL · 新增

为任务图依赖、可视化、文件路径 404 错误恢复、Shell 执行失败恢复新增行为评估测试。属于持续强化 evals 体系的工作。

### 4. 行为评估：多工具链与安全边界（#28824）
[PR #28824](https://github.com/google-gemini/gemini-cli/pull/28824) · L · 新增

新增多工具链执行、大文件上下文安全处理、敏感文件/目录安全边界的行为评估。增强对复杂场景的覆盖。

### 5. 行为评估：任务规划与完成信号（#28822）
[PR #28822](https://github.com/google-gemini/gemini-cli/pull/28822) · XL · 新增

为 `write_todos`、`complete_task`、`tracker_list_tasks` 和 `tracker_get_task` 新增行为评估测试，覆盖任务规划与状态查询。

### 6. web-fetch 工具 SSRF 漏洞修复（#28725）
[PR #28725](https://github.com/google-gemini/gemini-cli/pull/28725) · P2 · 安全

修复 CVSS 8.6 的 SSRF 漏洞：恶意域名可通过 DNS 解析绕过保护访问内网地址（如 `169.254.169.254`）。修复 #28555，需重点关注。

### 7. 沙箱 Dockerfile 升级至 node:22-slim（#28726）
[PR #28726](https://github.com/google-gemini/gemini-cli/pull/28726) · P1 · 安全

将沙箱及 caretaker-agent 的 Dockerfile 从 `node:20-slim` 升级至 `node:22-slim`。Node 20 已接近 EOL，不再接收安全修复。修复 #28584。

### 8. 预览模型 404 后回退至稳定版（#28608）
[PR #28608](https://github.com/google-gemini/gemini-cli/pull/28608) · P2 · 已关闭

使用 Gemini API key 认证时，若项目无预览模型访问权限，接收 404 后现会回退至稳定模型。修复 #28600，与 #28828 互补（一个提示、一个回退）。

### 9. Vertex AI 401 错误提示改进（#28679）
[PR #28679](https://github.com/google-gemini/gemini-cli/pull/28679) · P2 · 安全

当用户配置 Vertex AI 认证但仅提供了标准 Gemini API key 时，给出更明确的错误提示，引导用户正确配置 Google Cloud 凭据，改善接入体验。

### 10. 固定版本号自动升级（#28821）
[PR #28821](https://github.com/google-gemini/gemini-cli/pull/28821) · S · 自动

例行版本号升级至 `0.56.0-nightly.20260815.g2a87e7be1`，由 robot 自动提交。


## 功能需求趋势

社区当前最关注的功能方向如下：

1. **行为评估体系扩展**：多个新增 PR（#28822、#28823、#28824）持续补充 evals 测试，覆盖任务追踪、多工具链、错误恢复等场景，说明团队正在系统性地夯实质量基线。

2. **Subagent 自主性与可靠性**：多个高频 issue 集中在 subagent 未主动调用（#21968）、挂起（#21409）、误报成功（#22323）、未授权运行（#22093）等问题上，社区对 subagent 的稳定性与可预期性有强烈诉求。

3. **Auto Memory 记忆系统质量**：围绕记忆提取的跳过机制（#26522）、脱敏策略（#26525）、无效补丁处理（#26523）等展开讨论，记忆系统的健壮性与安全性正在成为关注重点。

4. **AST 感知的代码库工具**：EPIC #22745 与 #22746 持续追踪 AST 感知的文件读取、搜索和代码库映射能力，目标是通过更精准的读取减少 token 消耗和轮次浪费。

5. **安全加固**：SSRF 修复（#28725）、Node 22 迁移（#28726）、401 检测逻辑修复（#28827）等 PR 表明安全正在成为当前迭代的重点方向。


## 开发者关注点

1. **Subagent 误报与挂起问题最为紧迫**：`MAX_TURNS` 被标记为成功（#22323）和 generalist agent 无限挂起（#21409）是最受关注的两个 bug。前者会直接误导开发者对任务结果的判断，后者则完全阻塞工作流。相关标签显示多个问题已进入 `need-retesting` 阶段，预计近期会有修复版本。

2. **模型对自定义工具的调用主动性不足**：#21968 反映 Gemini 即使配置了相关 skills 和 sub-agents，也几乎不会在任务相关时主动调用。开发者需要显式指令才能触发，这削弱了自定义工作流的自动化价值。

3. **模型容易产生"破坏性"行为**：#22672 指出模型在复杂 git 操作和使用 `--force` 等命令时不够谨慎，社区希望模型能优先选择更安全的替代方案，并理解对数据库等资源的操作风险。

4. **配置被忽略的问题反复出现**：Browser Agent 忽略 `settings.json` 覆盖（#22267）和 subagent 在禁用状态下仍然被调用（#22093），都指向了配置优先级与权限控制的一致性问题。

5. **沙箱与工具链安全升级迫在眉睫**：Node 20 EOL 和 SSRF 漏洞的存在说明沙箱环境的主动维护需要持续投入，社区也期待更频繁的安全更新节奏。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

## GitHub Copilot CLI 社区动态日报 — 2026-08-16

### 今日速览

昨日共有 17 条 Issue 和 2 个 PR 更新。最值得注意的是：Atlassian MCP OAuth 认证在 1.0.79/1.0.80 连续两个版本出现回归（RFC 8414 §3.3），社区已提交多个复现报告；同时 v1.0.79 的 Windows 平台 OOM 崩溃、NixOS 上 Bash 工具长期无法工作等问题也持续获得关注。PR 侧核心工作是 CI 自动化安全迁移——将 invalid-label 机器人从 `pull_request_target` 迁移到更安全的机制。

### 社区热点 Issues

1. **Atlassian MCP OAuth 回归（两个独立报告）** · [#4480](https://github.com/github/copilot-cli/issues/4480) (CLOSED) / [#4490](https://github.com/github/copilot-cli/issues/4490) (OPEN)
   Atlassian 远程 MCP 服务器在 1.0.79 和 1.0.80 上均报告 OAuth 发现失败，错误为 "Incompatible authorization server (RFC 8414 §3.3)"。1.0.78 正常，1.0.71 正常——属于明确的回归，但两个报告均未被标记为已修复，后者仍在开放状态，影响面较广。

2. **NixOS 上 Bash 工具从 1.0.49 起持续损坏** · [#3392](https://github.com/github/copilot-cli/issues/3392)
   NixOS 用户无法执行任何命令，报 `Failed to start bash process`，1.0.50 仍复现。Issue 已存活近 3 个月（5/19 创建），9 个 👍，评论 4 条，修复优先级似乎不高，但持续困扰该平台用户。

3. **MCP registry 策略在 CI 中返回 403** · [#4346](https://github.com/github/copilot-cli/issues/4346) (CLOSED)
   使用 GITHUB_TOKEN（copilot-requests: write）认证时，MCP registry 策略获取失败，导致 CI 中所有非默认 MCP 服务器被阻断。影响 GitHub Actions 的 PAT-less 工作流，已关闭但社区对修复方案关注度高。

4. **Task 工具静默降级子代理模型** · [#3565](https://github.com/github/copilot-cli/issues/3565) (CLOSED)
   自定义代理 frontmatter 或显式 `model:` 覆盖均被忽略，凡成本乘数高于会话模型即被静默降级到会话模型。行为隐蔽、难排查，已关闭（修复或已合入）。

5. **MCP 初始化 60s 硬超时无重试** · [#4421](https://github.com/github/copilot-cli/issues/4421)
   npx 启动的 stdio MCP 服务器约 29% 会话初始化超时，之后整个会话不再重试。硬编码 60s、无退避、不支持配置——对 npx 冷启动场景（需下载包）极其不友好。

6. **`/spawn` 模板自相矛盾导致跨会话写** · [#4491](https://github.com/github/copilot-cli/issues/4491)
   模板先声明"创建单一子会话"，随后却指示 agent 复用已有会话，且没有跨会话写入的审批门禁。存在从"创建子会话"静默退化为"向无关会话注入上下文"的风险，属于安全类缺陷。

7. **`/restart` 在 `-w` 会话中失败** · [#4493](https://github.com/github/copilot-cli/issues/4493)
   1.0.80 中 `copilot -w` 启动的会话执行 `/restart` 时，worktree 选项与现有 session ID 产生冲突，无法恢复。复现步骤明确，属 1.0.80 新引入问题。

8. **v1.0.79 Windows autopilot OOM 崩溃** · [#4499](https://github.com/github/copilot-cli/issues/4499)
   报 `Committing semi space failed` 时 V8 堆仅用约 607 MB / 4.3 GB——不是堆上限问题，而是宿主内存提交失败。长时 autopilot 会话触发，Windows 平台需要排查原生内存管理。

9. **新启用模型需清本地缓存才可见** · [#4494](https://github.com/github/copilot-cli/issues/4494)
   在 GitHub 设置中启用 Sonnet 5 后，CLI 和 VS 均不可见，直到手动重置本地状态/缓存。模型目录缓存不刷新，影响模型上线后的即时可用性。

10. **Codespaces 预装 1.0.3 且 `copilot update` 需 sudo 才生效** · [#4501](https://github.com/github/copilot-cli/issues/4501)
    新 Codespaces 预装 1.0.3（落后 77 个版本），`copilot update` 下载 1.0.80 后不替换 `/usr/local/bin/copilot` 下二进制，仅 sudo 安装才能生效。影响所有 Codespaces 用户的更新路径。

### 重要 PR 进展

1. **[#4497](https://github.com/github/copilot-cli/pull/4497)（OPEN）— Handle fork PR associations in invalid-label writer**
   修复 fork PR 工作流运行时 GitHub 不填充 PR 关联的问题。关联缺失时，基于信任的工作流元数据搜索并严格匹配唯一一个开放 PR。配合 #4449 迁移，完善 fork 场景下的自动化安全。

2. **[#4449](https://github.com/github/copilot-cli/pull/4449)（CLOSED）— Migrate pull request automation away from pull_request_target**
   将 invalid-label 自动化从 `pull_request_target`（高权限、易受攻击的模式）迁移：无效 issue 使用 issue 级写权限 token 直接关闭；可合并 PR 用无权限的 `pull_request` 信号；特权操作转移到其他通道。提升仓库 CI 安全性。

### 功能需求趋势

- **模型能力扩展**：社区持续要求跟随上游模型演进——`GPT-5.6 reasoning.mode` 参数支持（#4495）、模型列表实时刷新（#4494）、contextTier 作为 ACP 会话配置暴露（#4275）。核心诉求是"新模型能力能第一时间在 CLI 中使用"。
- **ACP/非交互场景完善**：两条 Issue 分别要求 session 级 contextTier 配置和"BYOK 提示缓存保真"（#4500，重序列化破坏字节级缓存），说明 ACP 用户正在把 CLI 当作基础设施使用，对细节保真度敏感。
- **会话管理体验**：要求"取消归档 Done 会话"（#4502）——误点一次 Done 就让进行中的会话从列表消失，虽数据未删除但无法恢复，属高频操作的安全性缺口。
- **MCP 生态稳定性**：OAuth 回归和初始化超时两条都是"连接失败且无法恢复"类问题，MCP 已从"实验功能"转向"日常依赖"，可用性和可配置性需求上升。

### 开发者关注点

- **回归频次偏高**：1.0.79 → 1.0.80 连续两个版本出现 Atlassian MCP OAuth 相同的 RFC 8414 §3.3 回归（#4480、#4490），且 #4480 已关闭但 #4490 仍复现——可能为关闭时未真正修复或修复不完整。用户需要更严格的发布前回归测试。
- **认证与权限链路脆弱**：`GITHUB_TOKEN` 403 阻断全部非默认 MCP 服务器（#4346）、fork PR 关联缺失（#4497）——CI 身份的边界场景处理不够健壮。
- **静默降级/静默失败成高频痛点**：Task 工具模型降级（#3565）、/spawn 模板矛盾（#4491）、MCP 60s 无重试（#4421）——三个不同场景都出现"失败但无明确提示"或"行为与文档不符"的情况，开发者反复要求显式报错而非悄悄改变行为。
- **环境差异性适配滞后**：NixOS 的 bash 启动问题存在 3 个月未修（#3392）、Codespaces 预装版本落后 77 个版本且更新不生效（#4501）——非主流环境用户处于"长期带病运行"状态。
- **平台稳定性（Windows）**：v1.0.79 的 OOM 崩溃（#4499）堆内存远未到上限却提交失败，指向 Node.js 原生层问题，Windows 长会话用户需要明确修复时间表。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报

**日期：2026-08-16** | **数据来源：github.com/MoonshotAI/kimi-cli**

---

## 今日速览

今日社区最热议题集中在**订阅额度疑似缩水**（#2604）和**记忆系统功能呼吁**（#1283，40条评论长期高热度）两大方向。此外，两个由社区贡献的 bug 修复 PR（#2524、#2506）正在推进中，反映外部开发者参与度持续活跃。

---

## 社区热点 Issues

### 1. [#2604 Effective weekly allowance appears reduced ~3–5× without announcement](https://github.com/MoonshotAI/kimi-cli/issues/2604)
- **作者**：tobiu | **更新**：2026-08-15 | **评论**：2
- **重要性**：用户通过客户端侧 wire-level 监控，提供了带前后对比数据的"额度缩水"证据，直指订阅条款变更或计量回归问题。涉及商业诚信与产品透明度，一旦证实影响面极广。
- **社区反应**：刚发布，评论尚少，但数据详实，预计将迅速发酵。

### 2. [#1283 [Feature Request] Memory System - Persistent context across sessions](https://github.com/MoonshotAI/kimi-cli/issues/1283)
- **作者**：CatKang | **创建**：2026-02-27 | **更新**：2026-08-15 | **评论**：40
- **重要性**：长期置顶的热门需求（40 条评论）。社区强烈希望引入跨会话持久记忆，涵盖 AI 自动管理笔记与用户手动指令两种模式，本质是提升 agentic 编码的连续性与个性化。
- **社区反应**：讨论热度持续近半年，是社区呼声最高的功能之一。

### 3. [#2603 Quota-aware compaction: context compaction should trigger on a token budget](https://github.com/MoonshotAI/kimi-cli/issues/2603)
- **作者**：salim4n | **创建**：2026-08-15 | **更新**：2026-08-15 | **评论**：0
- **重要性**：指出当前仅基于模型上下文窗口上限触发压缩，而订阅套餐下需要按 token 配额来触发。对订阅用户成本控制有直接价值。
- **社区反应**：新发布，暂无讨论，但与 #2604 形成关联，可能被合并关注。

### 4. [#1155 openai_legacy provider drops reasoning content](https://github.com/MoonshotAI/kimi-cli/issues/1155)
- **作者**：rongou | **创建**：2026-02-14 | **更新**：2026-08-15 | **评论**：0
- **重要性**：兼容性 bug——当对接 sglang/vllm 等 OpenAI 兼容服务器时，思维链内容被丢弃导致 APIEmptyResponseError。影响第三方推理服务集成场景。
- **社区反应**：已关闭，但更新时间较新，可能刚被处理或标记。

---

## 重要 PR 进展

### 1. [#2524 fix(tools): count StrReplaceFile replacements against the running content](https://github.com/MoonshotAI/kimi-cli/pull/2524)
- **作者**：Sreekant13 | **更新**：2026-08-15 | **状态**：OPEN
- **内容**：修复 `StrReplaceFile` 顺序编辑时替换计数基于原始内容的错误，确保链式编辑的计数逻辑准确。解决 #2526。
- **重要性**：直接影响多人协作场景下文件编辑的正确性校验，属于质量修复。

### 2. [#2506 fix(kosong): raise a clear error on circular $ref in deref_json_schema](https://github.com/MoonshotAI/kimi-cli/pull/2506)
- **作者**：Sreekant13 | **更新**：2026-08-15 | **状态**：CLOSED
- **内容**：在 JSON Schema 反序列化时检测循环 `$ref` 引用，给出明确错误而非静默栈溢出。解决工具链稳定性问题。
- **重要性**：增强 Schema 处理鲁棒性，对复杂配置场景友好。

---

## 功能需求趋势

| 方向 | 代表性 Issue | 热度 |
|------|-------------|------|
| **持久化记忆系统** | #1283（自动+手动记忆） | 🔥🔥🔥 极高（40条评论） |
| **配额感知的上下文压缩** | #2603（按 token 预算触发压缩） | 🔥🔥 高 |
| **订阅/用量透明度** | #2604（额度缩水质疑） | 🔥🔥 高（证据详实） |
| **第三方推理服务兼容** | #1155（openai_legacy 适配） | 🔥 中 |
| **文件编辑工具链精度** | #2524（链式替换计数） | 🔥 中 |

---

## 开发者关注点

- **成本与用量焦虑**：订阅用户的 token 消耗感知与实际配额不符（#2604），结合 #2603 可见社区对"配额可控性"有普遍需求——希望客户端主动控制 token 消耗而非被动撞墙。
- **跨会话连续性缺失**：#1283 的持续热度表明，现有 CLI 在长周期 agentic 开发中缺乏"记忆"，开发者被迫重复描述上下文，效率受损。
- **生态兼容质量**：第三方推理服务（非官方 API）的使用者遇到 reasoning 内容丢失问题，说明官方在 OpenAI 兼容层的维护上需加强回归测试。
- **贡献者活跃度上升**：外部开发者 PR 数量增加且质量高（如 #2524、#2506），社区治理和贡献指南有效，建议官方加速 review 周期以维持势头。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报

**日期：2026-08-16**


## 今日速览

OpenCode Go 订阅计费与 grok-4.5 模型服务故障成为今日社区最集中讨论的议题，多条高热度 Issue 均指向付费后余额未更新及上游端点不可用问题。与此同时，开发者在功能层面持续呼吁 Plan/Build 模式自动切换、本地 LAN 模型发现等增强，多项相关 PR 已进入活跃开发阶段。官方服务端疑似出现资源耗尽（ResourceExhausted）状态，或为部分故障根源。


## 版本发布

过去 24 小时内无新版本发布。当前社区反馈主要集中于 v1.18.18 版本的相关问题。


## 社区热点 Issues

### 1. [BUG] OpenCode Go 订阅付费成功但工作区显示 "Insufficient balance"
**Issue #37790** | 评论 14 | 👍 0
付费后余额未更新的计费故障，直接影响用户使用，属高频高优问题。
https://github.com/anomalyco/opencode/issues/37790

### 2. [FEATURE] Go Pro 层级 ($20) 与首月折扣的 Share 修饰符
**Issue #24879** | 评论 11 | 👍 11
用户希望引入中间档订阅以应对月度额度耗尽场景，社区呼声较高。
https://github.com/anomalyco/opencode/issues/24879

### 3. 官方宣称 100% 免费，为何却要求订阅？
**Issue #42143** | 评论 10 | 👍 1
用户对官网宣传与实际付费墙之间的落差表达困惑，涉及产品定位与信任问题。
https://github.com/anomalyco/opencode/issues/42143

### 4. [FEATURE] Plan 模式 + Question 工具可自动切换至 Build 模式
**Issue #7801** | 评论 10 | 👍 31
高赞功能请求，希望减少手动切换模式的打断，提升 Agent 工作流连贯性。
https://github.com/anomalyco/opencode/issues/7801

### 5. [CLOSED] grok-4.5 在 opencode go 上自 8 月 2 日起无法工作
**Issue #40206** | 评论 9 | 👍 1
grok-4.5 持续返回 500 错误，影响面较广且持续多日。
https://github.com/anomalyco/opencode/issues/40206

### 6. [BUG] 会话无限压缩循环（compaction loop）
**Issue #27924** | 评论 8 | 👍 0
压缩失败导致死循环，属于核心会话机制的稳定性缺陷。
https://github.com/anomalyco/opencode/issues/27924

### 7. [BUG] Deepseek API 过度消耗 Token
**Issue #32911** | 评论 3 | 👍 1
用户声称 1.17+ 版本存在计费虚高问题，涉及 API 调用逻辑缺陷。
https://github.com/anomalyco/opencode/issues/32911

### 8. [BUG] OpenCode Go grok-4.5 返回 HTTP 503
**Issue #40886** | 评论 3 | 👍 0
官方 Chat Completions 端点调用 grok-4.5 持续 503，与 #40206 相互印证。
https://github.com/anomalyco/opencode/issues/40886

### 9. [BUG] 服务器处于故障状态（ResourceExhausted）
**Issue #42799** | 评论 2 | 👍 0
工作区页面 500 或响应迟缓，后端 DB 报 "transaction pool connection limit exceeded"，或为多项故障的共同根源。
https://github.com/anomalyco/opencode/issues/42799

### 10. [BUG] Agent 权限规则（permission.ask）运行时未生效
**Issue #32787** | 评论 2 | 👍 0
声明的权限规则（如 edit: ask）未被强制执行，涉及安全基线的可靠性问题。
https://github.com/anomalyco/opencode/issues/32787


## 重要 PR 进展

### 1. feat(core): 增加 Docker 蓝图工作区（已关闭）
**PR #42831**
基于不可变蓝图快照的本地 Docker 工作区 Provider，支持工作区 Fork 与空闲容器回收。
https://github.com/anomalyco/opencode/pull/42831

### 2. feat(opencode): 本地 LAN Provider 发现 + 模型自动发现
**PR #27554**
在 /connect 中新增 Local (LAN) 发现，支持 mDNS 与 OpenAI 兼容服务器自动探测。
https://github.com/anomalyco/opencode/pull/27554

### 3. feat(session): 新增 viewed 状态
**PR #42811**
将会话已读状态从 TUI 本地文件迁移至 Session 域模型，解决多客户端状态不一致问题。
https://github.com/anomalyco/opencode/pull/42811

### 4. fix(acp): 新会话优先使用默认 Agent 的模型
**PR #42836**
修复 ACP session/new 创建时模型解析逻辑，优先采用 Agent 自带默认模型而非全局配置。
https://github.com/anomalyco/opencode/pull/42836

### 5. feat(opencode): 新增每会话预算上限
**PR #42823**
为会话增加可选预算字段，达到限额后自动停止 Assistant，含 DB 迁移支持。
https://github.com/anomalyco/opencode/pull/42823

### 6. feat(app): 增加语音输入与会话预算 UI
**PR #42824**
配套 #42823 的前端实现，新增麦克风按钮与预算面板。
https://github.com/anomalyco/opencode/pull/42824

### 7. fix(plugin): 限定 Promise 事件迭代器作用域
**PR #42832**
修复异步迭代器在 child scope 关闭后仍有事件逃逸的潜在问题。
https://github.com/anomalyco/opencode/pull/42832

### 8. refactor(core): 事件时间戳改为数值类型
**PR #42828**
V2 事件 created 字段改为 epoch 毫秒数值，去除 DateTime 往返转换开销。
https://github.com/anomalyco/opencode/pull/42828

### 9. fix(core): 批量合并流式会话增量事件
**PR #42826**
将逐片段发布的 text/reasoning/tool-input 事件合并为批量发布，显著降低事件量。
https://github.com/anomalyco/opencode/pull/42826

### 10. fix(server): 修复 bwrap PID 命名空间下 SSE 事件丢失
**PR #37156**
解决 `opencode serve` 在 bwrap --unshare-pid 沙箱中 SSE 流首块后停滞的问题。
https://github.com/anomalyco/opencode/pull/37156


## 功能需求趋势

- **订阅与计费体系改进**：用户对订阅额度、计费透明度、预算控制（per-session budget）的需求集中爆发，尤其对"付费后不可用"的故障容忍度极低。
- **更智能的模式切换**：Plan/Build 模式自动流转、减少人工干预，是工作流类需求中获赞最高的方向。
- **本地优先与多 Provider 支持**：LAN 内模型自动发现、本地 Docker/Incus 工作区等基础设施类需求表明社区在向"自托管 + 云端混合"架构演进。
- **多端状态一致性**：会话已读状态、收藏模型等需跨 TUI/Web/桌面端同步，反映多端协作已成为日常使用场景。
- **模型推理可配置化**：GLM 等模型 reasoning toggle 支持缺失，说明社区对新模型适配的敏感度很高。


## 开发者关注点

- **grok-4.5 服务不可用（500/503）持续时间过长**：多 Issue 交叉印证，且官方尚未给出明确修复时间表，开发者被迫切换模型。
- **OpenCode Go 计费状态不同步**：Stripe 扣款成功但工作区余额未更新，直接影响付费用户的核心体验。
- **服务端稳定性（ResourceExhausted）**：DB 连接池耗尽导致工作区无法访问，引发对官方服务可靠性的普遍担忧。
- **v1.18.18 回归问题**：Poe Provider 全部内置工具不可用、Fetch Failed 频发，提示该版本存在未充分验证的回归。
- **终端交互细节**：链接换行不可点击（Kitty）、禁用鼠标后滚轮行为异常等，反映开发者对 TUI 细节体验的较高要求。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报

**日期：2026-08-16**


## 今日速览

今日发布 `v0.21.12-preview.5` 预览版，同时有多条 `nightly` 构建与 DSW EAS 端到端冒烟测试成功（SWE-bench Verified 1/1 通过）。社区侧，/review 命令的系列可靠性问题（并发竞态、worktree 污染、overlap 误删等）构成今日讨论最密集的议题，多个高优 PR 正在跟进修复；此外 web-shell 白屏、会话 OOM、前缀缓存失效等用户反馈活跃。


## 版本发布

### v0.21.12-preview.5
- 基于 `release/v0.21.12-preview.5` 分支生成。
- 变更日志已同步至 GitHub Releases。

### v0.21.11-nightly.20260816.5677823abb
- 包含一条 autofix 相关提交：`feat(autofix): deny-by-default footprint gate and positional window censuses`（@wenshao，PR #9156）。

### DSW EAS 冒烟测试（非正式版本，测试用）
- **r5**：SWE-bench Verified 1/1 通过；针对 Terminal-Bench verifier proxy 修复后的单用例端到端验证。
- **r4**：SWE-bench Verified 1/1 通过；修复 TB verifier proxy prelude 转义问题。
- **r3**：SWE-bench Verified 1/1 通过；干净 release-event 端到端冒烟。
- **r1**：SWE-bench Verified 1/1 + Terminal-Bench 2.0 1/1 通过。


## 社区热点 Issues（Top 10）

1. **#9253 — Web Shell dev tabs white-screen after dev-server/daemon restarts with no recovery UI** [P2/bug]
   - 今日新建，@wenshao 提交。长期打开的 dev 模式标签页在 daemon/Vite 重启后变白屏且无恢复入口，需手动刷新。已由 PR #9254 跟进，另见下方 PR。
   - 链接：https://github.com/QwenLM/qwen-code/issues/9253

2. **#9250 — qwen serve host writer hard-codes new-file mode 0600 (writeTextFile)** [P3/enhancement]
   - @VorlMaldor 反馈 `qwen serve` 写文件固定为 0600，忽略 umask，且无配置项。涉及权限安全与可配置性，社区讨论集中。
   - 链接：https://github.com/QwenLM/qwen-code/issues/9250

3. **#9230 — Follow-up suggestion side query defeats server-side prefix caching** [P2/bug]
   - @yiliang114 提交。当服务器启用前缀缓存（如 llama.cpp）时，主会话每次请求都命中 ~0% 缓存，重复 prefill 全部上下文；`enableCacheSharing` 默认关闭。影响长会话性能。
   - 链接：https://github.com/QwenLM/qwen-code/issues/9230

4. **#9200 — 相同任务调用相同本地模块结果相同，但过程差距大** [need-information]
   - 用户对比 qwen code v0.21.12 与其他 CLI 工具（iflow）日志后质疑稳定性，暂缺更多信息。
   - 链接：https://github.com/QwenLM/qwen-code/issues/9200

5. **#9219 — /review presubmit overlap matching is exact-line only** [P2/bug]
   - @wenshao 提交。`/review` presubmit 的 overlap 检测只按精确行号匹配，多行 range 与语义重复会被漏判为 noConflict。
   - 链接：https://github.com/QwenLM/qwen-code/issues/9219

6. **#9218 — /review presubmit --new-findings rejects the Step 6 findings artifact** [P2/bug]
   - @wenshao 提交。`--new-findings` 指向 canonical findings 文件时因与 skill 内 example 路径冲突被拒，导致高代价分析后命令行失败。
   - 链接：https://github.com/QwenLM/qwen-code/issues/9218

7. **#9089 — autofix: PAT-bearing jobs share a host with untrusted branch code** [P1/security]
   - @wenshao 提交。autofix 流程中携带 PAT 的 job 与不受信分支代码共享同一 runner，需 runner 级隔离。P1 安全项，评论区持续更新。
   - 链接：https://github.com/QwenLM/qwen-code/issues/9089

8. **#9198 — qwen 跑出 OOM** [P2/bug]
   - 用户长时间运行后 OOM（服务器 1T 内存），tmux 按键乱码、无法复制粘贴。Kimi Code 正常，疑似 qwen 独有。
   - 链接：https://github.com/QwenLM/qwen-code/issues/9198

9. **#7427 — web-shell: artifact panel spams 'Load artifacts failed' on automatic refresh** [P2/bug]
   - 自动刷新 artifact 面板时报错，问题持续 4 周仍 open（5 条评论）。已有回归测试 PR #9227 落地，当前 main 上该 toast 已消失。
   - 链接：https://github.com/QwenLM/qwen-code/issues/7427

10. **#5966 — 0.19.3 UI 不定期错误，中文输入法完全无效** [P2/bug]
    - 老 issue 仍在更新。中文输入法失效、UI 闪烁，尚需更多信息，社区中文用户关注度高。
    - 链接：https://github.com/QwenLM/qwen-code/issues/5966


## 重要 PR 进展（Top 10）

1. **#9255 — fix(ci): keep a fallback comment when the PR review runner dies**（@wenshao, OPEN）
   - 为 PR review 工作流增加 preflight 健康检查与兜底注释，避免 review job 异常退出后无任何说明。
   - 链接：https://github.com/QwenLM/qwen-code/pull/9255

2. **#9254 — fix(web-shell): show a boot fallback instead of a white screen**（@wenshao, OPEN）
   - 在 Web Shell `index.html` 增加依赖零开销的 boot watchdog：资源加载失败时立即显示双语降级页面 + 重新加载按钮。直接修 #9253。
   - 链接：https://github.com/QwenLM/qwen-code/pull/9254

3. **#9212 — fix(review): exempt carried-id re-posts from the presubmit overlap drop**（@yiliang114, OPEN, autofix/takeover）
   - 修复 overlap 检测误删 ledger 复贴：`--new-findings` 条目携带可选 `id`，同位置同 id 视为 additive。
   - 链接：https://github.com/QwenLM/qwen-code/pull/9212

4. **#9235 — fix(serve): redact skill bodies from the Web Shell event surface**（@wenshao, OPEN）
   - daemon 快照中完整 SKILL.md 被明文推给浏览器端事件面，本 PR 在浏览器事件面做 redact，本地原生客户端不受影响。
   - 链接：https://github.com/QwenLM/qwen-code/pull/9235

5. **#9227 — test(web-shell): pin silent failure of background artifact refreshes (#7427)**（@yiliang114, OPEN）
   - 为 #7427 补回归测试：确认当前 main 上 background refresh 静默失败但不再 toast spam。
   - 链接：https://github.com/QwenLM/qwen-code/pull/9227

6. **#9247 — fix(review): budget the composed body against GitHub's review limit**（@wenshao, OPEN）
   - `compose-review` 对 65,536 字符限制做预算：溢出时按优先级裁剪（deferral 显示 → not-reviewed 披露 → blockers…）。
   - 链接：https://github.com/QwenLM/qwen-code/pull/9247

7. **#9220 — fix(ci): self-heal failed checkouts on the reused review runners**（@wenshao, OPEN, autofix/takeover）
   - 复用 runner 上 checkout 失败原本直接终止 job；现在首次失败后自动清理工作区并重试。
   - 链接：https://github.com/QwenLM/qwen-code/pull/9220

8. **#9216 — feat(release): user-facing bilingual digest for release notes**（@wenshao, OPEN, autofix/takeover）
   - 稳定版 release notes 改为由模型按能力主题分组、生成中英双语面向用户的摘要，替代纯开发者视角的 PR 列表。
   - 链接：https://github.com/QwenLM/qwen-code/pull/9216

9. **#9183 — feat(review): scale the reverse-audit round cap to the diff topology**（@wenshao, OPEN）
   - reverse-audit 的轮次上限按 diff 规模自适应：小 diff 10 轮、分块 5 轮、超大 3 轮。
   - 链接：https://github.com/QwenLM/qwen-code/pull/9183

10. **#9027 — feat(cli): plain-prose /review comments; severity markers follow review.attribution**（@wenshao, OPEN, autofix/takeover）
    - review 评论改为自然语言风格；严重级别标识跟随 attribution 配置（隐藏/显示），降低 PR 上机器味。
    - 链接：https://github.com/QwenLM/qwen-code/pull/9027

> 另注：**#9163** 将所有 ledger/evidence 文件读取收敛为 `O_NOFOLLOW + fstat + 单次读取`（关闭 R2-2 安全审计族）；**#9153** 将 `--resume` 贯通 /review 命令、review run 与 CI retry。


## 功能需求趋势

- **审查体系工程化（/review）**：今日占比最高。围绕 /review 的命令可靠性、并发安全、schema 兼容、交互体验（纯文本评论、resume、字符预算）持续产出；明显向“可作为正式流程依赖”的方向收敛。
- **CI/CD 自愈能力**：runner 复用下的 checkout 失败自愈、review job 死亡兜底、agent 配置字段对齐。社区对长期运行的自动化链路稳定性诉求集中。
- **Web Shell 健壮性**：白屏降级、artifact 面板静默失败、会话名保留、HTML 导出重构、技能内容脱敏。Web Shell 正从“开发预览”走向“对客可用”。
- **性能与资源**：前缀缓存失效、OOM、文件权限（0600/umask）受到关注；长会话资源管控是隐忧。
- **新模型/服务商接入**：PR #8368 为 `/auth` 增加 Kimi 与小米 MiMo 预设，反映用户对第三方提供商接入的持续需求。


## 开发者关注点

1. **长时运行稳定性**：OOM、tmux 交互错乱、dev-server 重启白屏——社区对“数天级持续会话”场景的稳定性反馈集中，这类问题最影响信任。
2. **CI 自愈与可观测性**：多条 PR 在修复“静默失败”（agent 配置被丢弃、worktree 被删、checkout 失败无提示）。开发者希望自动化流程“挂掉时看得到、修得了”。
3. **并发安全**：同一 PR 并发 review 竞争固定 worktree 路径是今日高频问题（#9205、#9207），改进方向包括按 session 隔离与探测操作的透明化。
4. **权限与安全**：PAT 隔离（#9089）、SKILL.md 明文泄漏（#9235）、0600 权限写死（#9250）——安全议题从 CI 算子扩展到运行时宿主行为。
5. **中文用户反馈集中但信息不足**：输入法失效（#5966）、结果一致但过程波动（#9200）均缺关键日志，维护者需要在 issue 模板中强化日志收集引导。

</details>

---
*本日报由 [agents-radar](https://github.com/huang-yi-dae/agents-radar) 自动生成。*