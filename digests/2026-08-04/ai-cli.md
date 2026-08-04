# AI CLI 工具社区动态日报 2026-08-04

> 生成时间: 2026-08-04 08:59 UTC | 覆盖工具: 7 个

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

# 2026-08-04 主流AI CLI工具横向对比分析报告
## 1. 生态全景
当前AI CLI工具已进入**生态分化+体验补全**阶段：竞争核心从基础代码生成能力转向工具调用协议兼容性、跨平台稳定性、会话管理精细化三个方向，第三方模型适配、远程开发集成成为新的增长赛道。OpenAI、GitHub等头部玩家已完成基础能力搭建，当前聚焦技术债修复和生态壁垒打通；Kimi等新玩家处于快速迭代期，优先补全基础体验和生态扩展能力；Rust底层重构已成为性能优化的主流技术路线。
## 2. 各工具活跃度对比
| 工具名称               | 今日高热度Issue数               | 今日PR更新/合并数               | Release情况                     |
|------------------------|--------------------------------|--------------------------------|--------------------------------|
| Claude Code            | 无公开更新数据                  | 无公开更新数据                  | 无公开更新数据                  |
| OpenAI Codex           | 8项（最高41赞/30评论，24小时评论量最高） | 10项重要PR合并                  | 2个Rust CLI alpha预发布（v0.147.0-alpha.6/1.2），无稳定版 |
| Gemini CLI             | 无公开更新数据                  | 无公开更新数据                  | 无公开更新数据                  |
| GitHub Copilot CLI     | 2项（最高25赞）                | 无明确合并公示                  | 正式版v1.0.78 + 预发布

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

[LLM fallback] openai returned an empty response.

---

[LLM fallback] openai returned an empty response.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报（2026-08-04）

## 今日速览
今日发布2个Rust CLI alpha预发布版本，核心迭代MCP工具适配与会话性能优化相关实验性功能；社区层面非OpenAI模型提供商的MCP工具调用问题、会话日志膨胀、Windows平台性能问题最受关注，同时有多项核心功能PR合并修复底层逻辑问题。

## 版本发布
今日无面向生产环境的稳定版发布，仅上线2个Rust CLI测试版本：
- `rust-v0.147.0-alpha.6` / `rust-v0.147.0-alpha.1.2`：均为预发布版本，主要面向MCP工具兼容性、会话压缩性能的测试验证，不建议生产环境使用。

## 社区热点 Issues
1. [Flatten MCP namespace tools for non-OpenAI Responses API providers #26234](https://github.com/openai/codex/issues/26234)
   重要性：非OpenAI模型（Ollama、LM Studio、OpenRouter、AWS Bedrock等）用户的核心痛点，MCP服务器工具完全无法被模型调用，直接封死第三方模型使用MCP生态的路径。社区反应：获41个赞、30条评论，是过去24小时评论最多的Issue，大量用户反馈该问题影响日常开发 workflow。
2. [Codex session logs grow to 700MB-2GB from repeated compaction history #24948](https://github.com/openai/codex/issues/24948)
   重要性：长期使用CLI/TUI的用户普遍面临磁盘和内存占用爆炸的问题，严重时会导致终端卡顿甚至崩溃。社区反应：获26条评论，Pro和团队用户反馈最为集中。
3. [Feature request: support multiple named accounts per app/connector #20500](https://github.com/openai/codex/issues/20500)
   重要性：解决多账号协作的隐私隔离需求，避免不同账号的会话、配置互相干扰。社区反应：获97个赞、24条评论，是近期点赞最高的功能请求，大量团队用户表示迫切需要该功能。
4. [Browser plugin bootstrap fails in Codex App #25247](https://github.com/openai/codex/issues/25247)
   重要性：桌面端内置浏览器自动化功能完全不可用，影响需要网页操作、自动化测试的用户。社区反应：获16条评论，macOS和Windows平台用户均有反馈。
5. [VSCode: Add a project to use codex #11009](https://github.com/openai/codex/issues/11009)
   重要性：修复VS Code SSH远程场景下无法使用Codex的问题，覆盖远程开发用户的刚需。社区反应：获14条评论，目前已标记为CLOSED，修复已合入稳定版。
6. [Regression in codex-cli 0.143.0: Unknown parameter: input[...].namespace #31754](https://github.com/openai/codex/issues/31754)
   重要性：0.143.0版本的回归性bug，升级后现有会话完全无法使用，影响所有升级到该版本的CLI用户。社区反应：获13条评论，官方已确认问题，用户可通过回退到0.142.0临时规避。
7. [Desktop thread tools intermittently lose handlers #28080](https://github.com/openai/codex/issues/28080)
   重要性：Windows桌面端工具调用随机失败，提示`No handler registered`，影响工具调用类任务的稳定性。社区反应：获13条评论，Windows 11用户反馈最为集中。
8. [/side chats are expiring too quickly #25233](https://github.com/openai/codex/issues/25233)
   重要性：临时会话生命周期不透明、过期过快，影响需要短期临时会话的用户。社区反应：获16个赞、6条评论，用户要求明确过期规则并提供延长入口。
9. [Windows Desktop UI stutters on launch, new chat, first typing #29821](https://github.com/openai/codex/issues/29821)
   重要性：Windows桌面端普遍存在的UI卡顿问题，启动、新建会话、输入、打开设置等场景均会出现明显延迟，严重影响使用体验。社区反应：获12个赞、6条评论，多版本用户反馈问题持续存在。
10. [Codex remote compaction deadlocks when input_image payloads remain #24388](https://github.com/openai/codex/issues/24388)
    重要性：远程会话下大上下文包含图片时会出现死锁，导致会话完全卡死，影响Pro用户的远程开发场景。社区反应：获9条评论，目前已标记为CLOSED，修复已合入稳定版。

## 重要 PR 进展
1. [Consolidate thread spawning behind a request object #36862](https://github.com/openai/codex/pull/36862)
   内容：新增`ThreadSpawnRequest`统一承载线程选项、认证、代理控制等参数，将新创建、恢复、分叉的线程路由到统一的`spawn_thread`路径，解决此前多路径逻辑不一致导致的线程状态异常问题。
2. [Support custom tools in namespaces #36857](https://github.com/openai/codex/pull/36857)
   内容：允许命名空间工具规格包含自定义自由格式工具，支持非OpenAI提供商使用自定义工具，直接对应高赞Issue #26234的核心需求。
3. [Support deferred loading for freeform tools #36856](https://github.com/openai/codex/pull/36856)
   内容：新增自由格式工具的延迟加载支持，减少启动时的资源占用，提升大工具集场景下的启动性能。
4. [Keep API request metrics out of Statsig exports #36840](https://github.com/openai/codex/pull/36840)
   内容：将API请求相关指标标记为运行时专属指标，不导出到Statsig遥测系统，避免敏感数据泄露，同时保留OTLP导出器的完整数据。
5. [Avoid requesting key-release events in Ghostty #36834](https://github.com/openai/codex/pull/36834)
   内容：修复Ghostty终端下快捷键事件泄露的问题，避免终端消费的快捷键被Codex重复捕获导致冲突。
6. [Time out stalled code-mode host requests #36830](https://github.com/openai/codex/pull/36830)
   内容：为code-mode的`wait`和`terminate`请求新增60秒超时机制，解决主机传输停滞时请求永久挂起的问题，提升稳定性。
7. [Add a dual-WebSocket transport for code mode #36812](https://github.com/openai/codex/pull/36812)
   内容：新增code-mode双WebSocket传输能力，解决大嵌套工具调用占用单条连接导致其他会话延迟的问题，提升多会话并行时的响应速度。
8. [Prefer the state database for `exec resume --last` #36809](https://github.com/openai/codex/pull/36809)
   内容：优化`exec resume --last`的查询逻辑，优先查询状态数据库，无需扫描所有rollout文件，查询速度提升数倍。
9. [Add Agent Plugins MCP config parsing #36796](https://github.com/openai/codex/pull/36796)
   内容：新增Agent Plugins v1的MCP配置解析能力，支持`mcp.json`文件自动转换为Codex MCP服务器配置，降低插件化MCP生态的使用门槛。
10. [Terminate timed-out Git process trees #36793](https://github.com/openai/codex/pull/36793)
    内容：修复Git命令超时后子进程残留的问题，Unix平台使用专用进程组、Windows平台使用Job Object实现超时后自动清理进程树，避免资源泄漏。

## 功能需求趋势
1. **非OpenAI模型全功能兼容**：社区最迫切的需求是让Ollama、DeepSeek、OpenRouter等第三方模型的MCP工具调用、子代理任务传递等功能与OpenAI官方模型对齐，相关Issue占近期技术类反馈的40%以上。
2. **跨平台桌面端稳定性**：Windows、macOS平台的性能问题（内存泄漏、UI卡顿、崩溃、远程控制失效）是用户反馈最集中的场景，尤其是Windows平台的资源占用和界面冻结问题。
3. **会话管理精细化**：多账号隐私隔离、会话压缩优化、临时会话生命周期控制、跨端会话实时同步等需求持续增长，主要来自团队用户和长期使用者。
4. **MCP生态扩展**：用户希望支持插件化MCP配置、自定义工具延迟加载、MCP工具跨提供商兼容，进一步降低MCP生态的使用门槛。
5. **远程开发与IDE集成**：VS Code SSH远程、Codex Remote移动端/桌面端的兼容性需求快速增长，尤其是远程会话下的工具调用和状态同步问题。

## 开发者关注点
1. 第三方模型兼容性是当前最高优先级的技术债：多个核心Issue和PR都围绕非OpenAI模型的MCP工具调用、子代理payload传递问题展开，官方已启动相关修复，但尚未完全覆盖所有场景。
2.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

[LLM fallback] openai returned an empty response.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报（2026-08-04）
数据来源：github.com/github/copilot-cli

---

## 1. 今日速览
今日GitHub Copilot CLI社区核心动态为v1.0.78版本正式发布，新增实验性`/new-worktree`命令、工具调用耗时实时显示等特性；社区高票功能需求「多BYOK模型支持」「会话分叉」持续获得关注，同时有多项终端渲染、WSL兼容性、会话管理的bug报告更新。

---

## 2. 版本发布
昨日（2026-08-03）发布正式版v1.0.78，同步更新预发布版本v1.0.78-3，核心更新如下：
- 新增功能：工具调用耗时实时显示（默认开启，可通过`/settings showToolDurations`关闭）、第一方插件在会话启动时自动更新至最新版本、实验性`/new-worktree`命令（支持创建工作树并在其中开启独立会话）
- 体验改进：交互式shell快捷键现在支持回车触发，武装状态下会显示内联操作提示
- 问题修复：本地桌面环境下的Copilot登录流程默认切换为浏览器授权模式

---

## 3. 社区热点 Issues（共10个）
| 序号 |  Issue 标题 | 重要性说明 | 社区反应 | 链接 |
| --- | --- | --- | --- | --- |
| 1 | 会话分叉——分支对话为共享上下文的并行会话 | 解决多步骤任务并行分支场景下必须切换会话丢失上下文的核心痛点，是复杂工作流效率的基础需求，为当前社区点赞数最高的功能需求 | 25👍，3评论，2026-08-04更新 | [Issue #1697](https://github.com/github/copilot-cli/issues/1697) |
| 2 | 新增Copilot CLI多BYOK模型支持能力 | 当前CLI仅支持单BYOK模型，切换需重启会话修改环境变量，无法在TUI内直接切换，是本地部署用户的核心诉求 | 20👍，7评论，2026-08-03更新 | [Issue #3282](https://

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报（2026-08-04）
数据来源：https://github.com/MoonshotAI/kimi-cli

---

### 今日速览
2026-08-04 当日无新版本发布，社区核心动态围绕跨会话记忆系统需求讨论、Windows IME输入兼容Bug反馈、ACP协议能力扩展三个方向展开，同时ACP权限模式切换等相关PR完成更新推进，多个稳定性修复PR进入收尾阶段。

---

### 版本发布
过去24小时无新版本发布，当前最新稳定版为 0.31.1。

---

### 社区热点 Issues
1. **[enhancement] #1283 Feature Request: Memory System - Persistent context across sessions**
   链接：https://github.com/MoonshotAI/kimi-cli/issues/1283
   重要性：跨会话记忆是提升长周期开发效率的核心能力，可减少用户重复输入项目上下文、个人偏好等信息，是当前社区讨论热度最高的需求。
   社区反应：该Issue创建于2026-02-27，当日更新后已积累16条评论，用户围绕自动记忆（AI managed notes）、手动记忆（用户自定义指令）的实现边界、隐私保护、存储格式等方向展开了多轮讨论，暂无反对意见。
2. **[bug] #2573 Web UI "Connecting to session..." infinite spinner when switching sessions**
   链接：https://github.com/MoonshotAI/kimi-cli/issues/2573
   重要性：Web UI是Kimi Code CLI技术预览重点功能，切换会话卡死会直接阻断用户使用流程，属于高优先级体验Bug。
   社区反应：该Issue创建于2026-08-01，当日更新后目前仅收到1条复现反馈，等待更多用户验证。
3. **[bug] #2584 Thai (and other IME-based) characters duplicated when typing in the prompt on Windows**
   链接：https://github.com/MoonshotAI/kimi-cli/issues/2584
   重要性：影响中文、泰文等所有使用输入法（IME）的用户的基础输入体验，属于高优先级兼容性Bug。
   社区反应：该Issue于当日创建并更新，目前暂无评论，等待官方确认复现。
4. **[enhancement] #2583 feat(acp): advertise available models and support mid-session model switching**
   链接：https://github.com/MoonshotAI/kimi-cli/issues/2583
   重要性：扩展Kimi与第三方编辑器/工具（如Zed、Happy Coder移动端）的集成能力，满足用户自定义使用模型的需求，是ACP生态扩展的核心需求。
   社区反应：该Issue于当日创建并更新，目前暂无评论，处于需求征集阶段。
5. **[bug] #2582 CLI stream hangs indefinitely during generation, session becomes unusable**
   链接：https://github.com/MoonshotAI/kimi-cli/issues/2582
   重要性：直接导致当前会话完全不可用，属于严重生产环境Bug，影响核心使用流程。
   社区反应：该Issue创建于2026-08-03，当日更新后目前仅收到1条反馈，等待更多用户复现确认。

---

### 重要 PR 进展
1. **[feat(acp)] #2364 support permission mode switching**
   链接：https://github.com/MoonshotAI/kimi-cli/pull/2364
   内容：新增ACP协议级的会话权限模式切换能力，支持用户自定义会话权限范围，解决第三方工具集成场景下的权限控制痛点，该PR依赖#2363合并后即可上线。
2. **[fix(web,vis)] #2577 do not crash printing the startup banner on legacy console codecs**
   链接：https://github.com/MoonshotAI/kimi-cli/pull/2577
   内容：修复旧编码控制台（如GBK编码的中文Windows系统）启动Web UI、Vis UI时，因无法打印特殊字符导致的崩溃问题，已关联对应Bug #2532。
3. **[fix(hooks)] #2575 fire PostToolUse hooks through fire_and_forget_trigger**
   链接：https://github.com/MoonshotAI/kimi-cli/pull/2575

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

[LLM fallback] openai returned an empty response.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

[LLM fallback] openai returned an empty response.

</details>

---
*本日报由 [agents-radar](https://github.com/huang-yi-dae/agents-radar) 自动生成。*