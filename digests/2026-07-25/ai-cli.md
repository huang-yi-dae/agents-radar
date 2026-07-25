# AI CLI 工具社区动态日报 2026-07-25

> 生成时间: 2026-07-25 02:57 UTC | 覆盖工具: 7 个

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

好的，作为专注 AI 开发工具生态的资深技术分析师，基于您提供的 2026-07-25 各工具社区动态，现为您呈现一份横向对比分析报告。

---

### 一、生态全景：从“能用”到“好用与可靠”的阵痛与跃迁

当前 AI CLI 工具生态已全面跨过“能用”的早期阶段，进入以 **稳定性、安全性和跨平台体验** 为核心的“好用与可靠”攻坚期。社区反馈从早期的“如何配置”转向对 **Agent 行为的确定性、上下文管理的可预测性、以及付费权益的透明度** 的强烈诉求。各工具厂商均在加速迭代，但普遍陷入“功能增加”与“回归 Bug”并存的阵痛。一个显著信号是，**工具间的能力互相渗透**（如 Copilot CLI 引入 Claude Opus 5），预示生态正从“单模型绑定”走向“多模型路由”的混合架构时代。

---

### 二、各工具活跃度对比（2026-07-25）

| 工具 | Issues 数 (精选) | PRs 数 (重要) | 版本发布 | 社区核心关键词 |
| :--- | :--- | :--- | :--- | :--- |
| **Claude Code** | 10 | 1 | v2.1.219/220 | 额度异常、网络控制、上下文管理 |
| **OpenAI Codex** | 10 | 10 | 5 个 Alpha 补丁 | Windows 稳定性、Git 进程泄漏、模型降级 |
| **GitHub Copilot CLI** | 10 | 0 | v1.0.75 | plan-mode 回归、OOM、僵尸进程 |
| **Gemini CLI** | 10 | 10 | 无 | 代理稳定性、git 安全、文档矛盾 |
| **Kimi Code** | 5 | 2 | 无 | 登录失败、远程控制、企业代理 |
| **OpenCode** | 10 | 10 | v1.18.5 | 代理无故停止、本地模型兼容性 |
| **Qwen Code** | 10 | 10 | v0.21.0 | Web Shell 集成、SWE-bench 测试、冷启动 |

**分析**:
- **高产组**: OpenAI Codex、Gemini CLI、OpenCode、Qwen Code 均提交了 10+ 个 PR，显示出强劲的开发动能。
- **稳定组**: Claude Code 发布正式版，但其 Issue 数庞大（仅一个热点 Issue 就有 805 评论），表明用户基数大，问题反馈多。
- **低产组**: Kimi Code 和 Copilot CLI 昨日活跃度较低，但遗留的严重 Bug 较多。

---

### 三、共同关注的功能方向

多个工具社区在不同程度上聚焦于相同痛点，这表明了全行业的共性挑战：

| 共性方向 | 涉及工具 | 具体诉求 |
| :--- | :--- | :--- |
| **远程控制与跨设备协作** | **Claude Code** (#40043), **Gemini CLI** (#1282) | 要求能跨设备（手机、平板）连接和恢复本地终端会话，提升工作流连续性。 |
| **MCP/插件系统稳定性** | **Claude Code** (#36431), **Codex** (#35280, #35216), **Gemini CLI** (#28481), **Kimi Code** (#1637), **Qwen Code** (#7697) | 普遍出现插件认证失败、配置隔离不良、日志输出混乱、连接断开等问题，严重影响自动化流程。 |
| **模型选择与控制权** | **Claude Code** (#81025), **Codex** (#34677), **Copilot CLI** (支持 Opus 5), **Gemini CLI** (#20498) | 用户对模型被静默降级、默认回退、付费后无法使用新模型等问题敏感，要求行为透明可控。 |
| **上下文管理与“记忆”** | **Claude Code** (#80883 PR), **Copilot CLI** (#4183) | 自动上下文压缩功能失效，或存在 5MB body 硬限制，导致长会话“失忆”或卡死，需更智能的上下文策略。 |
| **安全性与权限控制** | **Gemini CLI** (#23411), **Claude Code** (#66697), **OpenCode** (#36091) | 用户要求对 Agent 的破坏性操作（如 git push --force）、网络安全误报、权限批准合并等有更强控制。 |

---

### 四、差异化定位分析

| 工具 | 核心定位 | 目标用户 | 技术路线/特色 | 主要挑战 |
| :--- | :--- | :--- | :--- | :--- |
| **Claude Code** | 高端全栈 Agent | 追求极致响应与安全的企业、高级开发者 | 强安全沙箱、精细上下文控制、Anthropic 独家模型 | **计费与信任**问题（额度异常）；企业功能成熟度不足（远程控制）。 |
| **OpenAI Codex** | 深度集成 IDE 的智能副驾 | Open AI 生态重度用户、Node.js 开发者 | 与 VS Code/Cursor 等深度绑定；Rust 运行时推进性能 | **Windows 平台体验差**；Git 进程管理混乱；核心稳定性回归多。 |
| **GitHub Copilot CLI** | 轻量终端助手 | 所有 GitHub 用户、DevOps 工程师 | 与 GitHub 生态（actions, codespaces）无缝集成；强调 plan mode | **功能单一**；权限门控逻辑退步；社区沉寂，问题修复慢。 |
| **Gemini CLI** | 企业级安全 Agent | 注重数据合规与安全的大型团队 | 强策略引擎、OAuth 认证、SSE 管道（SSR 自动化修复） | **自身稳定性不足**（代理丢失状态）；**开发体验不友好**（Windows 二等公民）。 |
| **Kimi Code (小团队)** | 轻量、高性价比选择 | 预算敏感的中小开发者、中文社区 | 简洁配置、快速上手 | **基础功能不牢**（登录流程脆弱）；企业环境兼容性差。 |
| **OpenCode (社区驱动)** | 模型灵活、开源透明 | 关注隐私、偏好本地模型的极客 | 深度社区驱动、无缝切换/组合多种本地/云端模型 | **核心稳定性堪忧**（代理无故停止）；跨平台一致性差。 |
| **Qwen Code (新锐)** | 高性能、中文友好 | 中文开发者、全栈工程师、学术研究者 | 在 SWE-bench 测试中表现惊艳；Web Shell 集成度深；注重性能指标 | **国际化/UI 成熟度**不足；非英文字符渲染问题多。 |

---

### 五、社区热度与成熟度

- **成熟度最高，但稳定性成隐忧**: **Claude Code** 和 **OpenAI Codex** 社区最活跃，Issue 讨论深度最高，但也是回归 Bug 的重灾区。大量长期未解决的严重 Bug（Codex 的 Git 进程、Claude Code 的额度）正消耗着用户的耐心，这可能表明它们在快速商业化过程中，质量保障（QA）体系未能跟上。
- **快速迭代期，潜力巨大**: **Qwen Code** 和 **OpenCode** 展现出极强的活力和快速迭代能力。Qwen Code 通过 SWE-bench 测试结果证明了其代码能力的上限，而 OpenCode 则通过社区 PR 快速修复核心问题。它们正从“小众工具”向“主流选择”迈进。
- **“稳”中求破**: **GitHub Copilot CLI** 和 **Gemini CLI** 凭借母公司生态背书，用户基数稳定，但社区活跃度（Issue 讨论量和深度）相对较低，且长期 Bug 更新缓慢，给人“大厂病”印象，创新动力略显不足。
- **小而美，但需成长**: **Kimi Code** 社区体量小，但用户对基础功能的反馈（登录、方向键）说明其核心流程尚不够健壮。

---

### 六、值得关注的趋势信号（对开发者的启示）

1.  **Agent 行为的“确定性”是终极目标**：社区不再满足于“能完成任务”，而是要求 Agent **行为可预测、过程可审计、结果可复现**。开发者应关注工具的 **plan mode (计划模式)、工具调用日志、以及权限策略引擎**，这些是评估“确定性”的关键指标。
2.  **跨平台体验一致性将成为开发者选型的“否决项”**：Windows 用户在多个工具中普遍感觉是“二等公民”。随着混合开发环境成为常态，对 WSL、PowerShell、CRLF 行尾等问题的处理能力，将直接影响工具的普及度。
3.  **“模型选择权”是付费意愿的基石**：用户越来越反感被“锁定”在单一模型生态。支持多模型路由、让用户自由选择（甚至降级）以平衡成本与效果的工具有望获得更高忠诚度。
4.  **性能与资源消耗成为新的“场景基石”**：长时间会话的 OOM、SQLite 高写、冷启动慢等问题，阻碍了 AI CLI 工具深度融入“重型”开发工作流。开发者需注意工具的**资源管理**（进程、内存、网络）是否健壮。
5.  **自动化测试与评估框架正在兴起**：Qwen Code 的 SWE-bench 测试、Gemini CLI 的 Caretaker Agent 评估框架，都表明头部项目开始引入**自动化、量化的评估手段**来衡量自身能力。这将是未来评估 AI 工具真实水平的硬指标。

**总结**：当前 AI CLI 工具市场正处于 **“百花齐放”到“大浪淘沙”** 的转折点。对于开发者而言，选择工具不仅要看功能亮点，更应关注其 **社区的健康度（Bug 修复速度）、跨平台的包容度、以及底层模型的透明度和可控性**。那些能率先解决“稳定性”和“信任”问题的工具，将最终赢得市场。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

好的，作为专注于 Claude Code 生态的技术分析师，我已审阅截至 2026-07-25 的 `anthropics/skills` 仓库数据。以下是为您生成的社区热点报告。

---

### Claude Code Skills 社区热点报告 (截至 2026-07-25)

#### 1. 热门 Skills 排行

以下 PR 获得了社区最高关注度（按评论/讨论热度排序），反映了当前社区的开发焦点：

1.  **`fix(skill-creator): run_eval.py always reports 0% recall` (PR #1298)**
    *   **功能:** 修复 `run_eval.py` 及依赖其信号的优化循环（`run_loop.py`, `improve_description.py`）报告 0% 召回率的根本性问题。
    *   **社区热点:** 这是社区的一个核心痛点，被多个 Issue （#556, #1169）独立复现。其影响是导致“描述优化循环”在噪音上进行优化，Skill 开发流程基本瘫痪。此 PR 是解决 skill-creator 工具链可靠性的关键。
    *   **状态:** Open
    *   **链接:** [PR #1298](https://github.com/anthropics/skills/pull/1298)

2.  **`Add document-typography skill` (PR #514)**
    *   **功能:** 提供针对 AI 生成文档的排版质量控制，解决孤字（orphan）、寡行/孤行（widow）和编号错位等常见问题。
    *   **社区热点:** 用户认为这是“每个 Claude 生成的文档都会受影响”的通用痛点，讨论集中在如何精确处理不同渲染引擎的排版差异。
    *   **状态:** Open
    *   **链接:** [PR #514](https://github.com/anthropics/skills/pull/514)

3.  **`Add ODT skill` (PR #486)**
    *   **功能:** 实现对 OpenDocument 格式（.odt, .ods）的创建、填充、读取和转换。
    *   **社区热点:** 满足了企业对开源/ISO 标准格式文档处理的需求，尤其在 LibreOffice 生态中。讨论焦点在于模板填充的准确性和对复杂格式的兼容性。
    *   **状态:** Open
    *   **链接:** [PR #486](https://github.com/anthropics/skills/pull/486)

4.  **`Improve frontend-design skill clarity and actionability` (PR #210)**
    *   **功能:** 修订前端设计 Skill，使其指令更清晰、可操作且内在一致，确保 Claude 能在单次对话中准确执行。
    *   **社区热点:** 这是一个元改进，反映了社区对 Skill 质量本身的关注。讨论点在于如何平衡“精确指导”与“足够灵活性”，以避免限定 Claude 的设计创意。
    *   **状态:** Open
    *   **链接:** [PR #210](https://github.com/anthropics/skills/pull/210)

5.  **`Add skill-quality-analyzer and skill-security-analyzer to marketplace` (PR #83)**
    *   **功能:** 新增元技能（meta-skills）：`skill-quality-analyzer`（从结构、文档、示例等五个维度评估 Skill 质量）和 `skill-security-analyzer`（分析 Skill 安全风险）。
    *   **社区热点:** 这是一个生态基建设施，旨在规范化 Skill 开发和评审。社区讨论了这些分析器的评分标准是否合理，以及对安全漏洞的检测能力。
    *   **状态:** Open
    *   **链接:** [PR #83](https://github.com/anthropics/skills/pull/83)

6.  **`Add comprehensive system documentation and flowcharts` (PR #95)**
    *   **功能:** 为证据管理系统创建完整的文档，包括系统概述、架构图、工作流等。
    *   **社区热点:** 展示了 Skill 在复杂企业流程文档化上的潜力。讨论聚焦于文档生成的准确性和如何保持与代码的同步更新。
    *   **状态:** Open
    *   **链接:** [PR #95](https://github.com/anthropics/skills/pull/95)

7.  **`fix(skill-creator): warn on unquoted description with YAML special characters` (PR #539) 和 `Detect unquoted YAML special characters in description fields` (PR #361)**
    *   **功能:** 在 `quick_validate.py` 中增加预解析校验，警告用户使用未引用的 YAML 特殊字符（如 `:`, `#`, `{`）导致的静默解析失败。
    *   **社区热点:** 这是 Skill 创作中的一个常见陷阱，两个并行的 PR 表明其紧迫性。社区讨论了哪种验证方法更优雅、错误信息更友好。
    *   **状态:** Open
    *   **链接:** [PR #539](https://github.com/anthropics/skills/pull/539), [PR #361](https://github.com/anthropics/skills/pull/361)

#### 2. 社区需求趋势

从 Issues 中可以看出，社区对以下方向表现出强烈且集中的期待：

-   **🧰 工具链可靠性:** 最大的呼声集中在 `skill-creator` 工具链的稳定性上。大量 Issue（#556, #1169, #1061, #202）反馈 `run_eval.py` 在 Windows 或特定环境下无法正常工作，导致 Skill 开发循环崩溃。社区急需一个跨平台、零配置、开箱即用的开发工具链。
-   **🛡️ 安全与信任:** Issue #492 的 43 条评论（居首）揭示了严重的信任危机：社区成员对“社区 Skill 可被伪装成官方 Skill 在 `anthropic/` 命名空间下分发”这一事实感到担忧。这引发了如何建立 Skill 身份验证、安全审查和分级机制的讨论。
-   **🏢 企业级协作:** Issue #228 要求实现组织内的 Skill 共享（Org-wide sharing），而 Issue #1175 则关注在 SharePoint Online 等企业身份验证系统中操作文档时的安全与上下文窗口管理。这明确指向了企业级部署的需求。
-   **⏱️ 工作流与执行:** 社区对能定义“工作流”的高级 Skill 表现出兴趣，例如 `agent-governance`（#412 ）提议安全模式，`compact-memory`（#1329）关注长时任务的内存管理，以及 `Reasoning Quality Gate`（#1385）关注推理质量。这表明社区正从“单一任务”向“多步骤、有状态、高质量”的代理流程演进。

#### 3. 高潜力待合并 Skills

以下 PR 评论活跃、功能重要且已具雏形，有望在近期落地：

1.  **(已完成) `fix(skill-creator): run_eval.py always reports 0% recall` (PR #1298) & `fix(skill-creator): run_eval trigger detection misses real skill name` (PR #1323)**
    *   **潜力:** 这两个 PR 直接解决了 skill-creator 工具链的核心故障。一旦合并，将极大恢复社区对 Skill 开发的信心并提升效率。
    *   **链接:** [PR #1298](https://github.com/anthropics/skills/pull/1298), [PR #1323](https://github.com/anthropics/skills/pull/1323)

2.  **`Add document-typography skill` (PR #514)**
    *   **潜力:** 解决了一个通用性极高且用户感知强烈的问题。该 Skill 实现简单、自包含，不太可能引入复杂依赖，合并门槛较低。
    *   **链接:** [PR #514](https://github.com/anthropics/skills/pull/514)

3.  **`Add ODT skill` (PR #486)**
    *   **潜力:** 填补了开源办公文档处理领域的空白，与 `docx` skill 互补。对于需要与 LibreOffice 交互的企业用户至关重要，社区需求明确。
    *   **链接:** [PR #486](https://github.com/anthropics/skills/pull/486)

4.  **`Add testing-patterns skill` (PR #723)**
    *   **潜力:** 提供了一个完整的测试方法论和代码模式指导，覆盖从单元测试到 React 组件测试的现代实践。这对于提升 Claude 生成代码的质量至关重要。
    *   **链接:** [PR #723](https://github.com/anthropics/skills/pull/723)

5.  **`Add pyxel skill for retro game development` (PR #525)**
    *   **潜力:** 聚焦于一个特定、有趣的生态位，与 `pyxel-mcp` 服务器结合，展示了 Skill 与外部 MCP 服务交互的集成能力。该 PR 更新至 7 月 15 日，说明作者仍在维护。
    *   **链接:** [PR #525](https://github.com/anthropics/skills/pull/525)

#### 4.  Skills 生态洞察

**一句话总结：当前社区在 Skills 层面最集中的诉求是**：**“渴求一个稳定可靠的工具链来支撑生态基座”，同时“呼唤更完善的安全信任机制和组织级协作能力，以支撑其向企业级应用进阶”。** 前者体现在对 `skill-creator` 的强烈修复呼声，后者则体现在安全命名空间和组织共享的核心需求上。社区正从零散的个人实验转向寻求一个可依赖、可扩展的标准化平台。

---

好的，作为专注于 AI 开发工具的技术分析师，以下是根据您提供的 GitHub 数据生成的 2026-07-25 Claude Code 社区动态日报。

---

# Claude Code 社区动态日报 | 2026-07-25

## 今日速览
Claude Code 发布 v2.1.219/220 版本，正式引入新旗舰模型 **Claude Opus 5** 并默认设置为 Opus 模型，同时新增了更严格的沙箱网络控制能力。社区方面，关于 **Claude Max 计划会话限额异常耗尽** 的旧 Issue 热度不减，已成为本月焦点。此外，大量新提交的 Issue 集中反映了 **Fable 5 模型在终端上的可见性和部署一致性问题**，以及 **远程控制、桌面端与 CLI 行为不一致** 等痛点。

## 版本发布
- **[v2.1.220]** 常规 bug 修复和可靠性改进。
- **[v2.1.219]**
    - **新模型支持**：新增 **Claude Opus 5** (`claude-opus-5`)，现已成为默认 Opus 模型。提供 100 万 token 上下文窗口，定价为 $10/$50 每百万 token (输入/输出)。
    - **沙箱安全增强**：新增 `sandbox.network.strictAllowlist` 配置项，启用后将拒绝所有非允许列表中的主机访问，无需用户二次确认。
    - **新钩子 (Hook)**：新增 `DirectoryAdded` 钩子，便于在添加目录时执行自定义操作。

## 社区热点 Issues
以下精选了 10 个最值得关注的 Issue：

1.  **[[BUG] Claude Max 计划会话限额异常耗尽](https://github.com/anthropics/claude-code/issues/38335)**
    - **热度**: 🔥🔥🔥 (805 评论, 470 👍)
    - **重要性**: 极高。该问题自 3 月 24 日提出，至今仍是社区中活跃度最高的 Issue。大量 Max 用户反馈 CLI 使用场景下会话额度消耗速度远超预期，本质上是严重的**限流与计费感知问题**，对重度用户影响巨大。
    - **社区反应**: 情绪强烈，大量用户提供日志和复现步骤，但官方回复较少。

2.  **[[Enhancement] 允许从 Cowork 项目上下文中移除本地文件夹](https://github.com/anthropics/claude-code/issues/40043)**
    - **热度**: 21 评论, 63 👍
    - **重要性**: 对于远程协作开发场景至关重要。当前无法移除已加入 Cowork 项目的本地文件夹，导致工作目录混乱或暴露敏感代码。该需求反映了社区对**更精细的上下文控制能力**的渴望。

3.  **[[BUG] Telegram 插件 MCP 通道通知无法送达](https://github.com/anthropics/claude-code/issues/36431)**
    - **热度**: 21 评论, 32 👍
    - **重要性**: 核心 MCP 集成功能严重缺陷。插件能接收消息但无法将其传递给会话，导致“单向沟通”。该问题长期存在，影响了基于 Telegram 等即时通讯工具的**自动化工作流稳定性**。

4.  **[[BUG] “购买积分”按钮永久禁用](https://github.com/anthropics/claude-code/issues/62644)**
    - **热度**: 13 评论, 0 👍
    - **重要性**: 严重的**付费流程阻断问题**。免费账户用户遇到页面错误，导致无法正常升级或购买积分。这直接阻碍了用户转化并可能带来商业损失。

5.  **[[BUG] API 连接在请求中途关闭](https://github.com/anthropics/claude-code/issues/69336)**
    - **热度**: 10 评论, 11 👍
    - **重要性**: **核心稳定性问题**。用户报告在开启新上下文窗口后立即出现“Connection closed mid-response”错误，严重打断开发流程。该问题影响 Linux 平台，与 API 和 Agent SDK 相关。

6.  **[[BUG] 远程控制桥接失败: 有效 OAuth 令牌间歇性 401](https://github.com/anthropics/claude-code/issues/78469)**
    - **热度**: 6 评论, 1 👍
    - **重要性**: **远程协作功能的核心障碍**。`/v1/code/sessions`端点对有效令牌返回 401，导致 `--remote-control` 功能在大约 50-70% 的请求中失败。这表明后端认证服务存在严重的“分裂”或配置错误。

7.  **[[BUG] Fable 5 网络安全隐患误报](https://github.com/anthropics/claude-code/issues/66697)**
    - **热度**: 5 评论, 3 👍
    - **重要性**: **安全性与可用性的冲突**。Fable 5 的安全分类器在用户进行授权的安全审计时产生误报，直接阻断工作流程。这对安全从业者或开发者进行安全自检是巨大打击。该 Issue 已被关闭，可能表示已修复或需要更多信息。

8.  **[[BUG] 会话默认回退模型并覆盖偏好设置](https://github.com/anthropics/claude-code/issues/81025)**
    - **热度**: 3 评论, 0 👍
    - **重要性**: **配置管理逻辑缺陷**。新会话默认使用 Opus 5 (1M 上下文)，倘若用户所在组织不可用该模型，CLI 会静默回退并**覆盖**用户之前保存的模型偏好。这种“静默变更”行为非常危险，可能导致意外的成本或行为变更。

9.  **[[BUG] 桌面端错误报告上下文窗口大小](https://github.com/anthropics/claude-code/issues/81039)**
    - **热度**: 1 评论, 0 👍
    - **重要性**: **行为不一致问题**。桌面端应用始终使用 200K 上下文的 Opus 5 变体，而终端 CLI 正确使用 1M 版本。这不仅是个显示 bug，更意味着桌面端的**上下文窗口能力被严重阉割**，且自动压缩机制失效。

10. **[[BUG] `/insights` 命令渲染失败](https://github.com/anthropics/claude-code/issues/81043)**
    - **热度**: 0 评论, 0 👍
    - **重要性**: **新版本引发的新功能回退**。升级到 v2.1.220 后，`/insights` 命令的所有叙事性分析部分消失，仅显示统计数字。这很可能是一个由更新引起的引入性 bug，对于依赖此功能进行项目回顾的开发者影响明显。

## 重要 PR 进展
- **[#80883] [feat: Add context-safety-net plugin](https://github.com/anthropics/claude-code/pull/80883)**
    - **状态**: OPEN | **作者**: jeshiomurmu
    - **简介**: 针对长期存在的自动上下文压缩导致关键信息丢失的问题（如 #42542, #13112），该 PR 提议新增一个名为 `context-safety-net` 的插件。该插件旨在提供一种确定性恢复状态的能力，缓解 `auto-compact` 带来的“记忆衰减”问题。
    - **分析**: 这是一个社区驱动的功能插件提案，表明用户对**更可控的上下文管理**有着迫切需求。

## 功能需求趋势
从近期的 Issues 和 PR 中可以提炼出以下社区最关注的功能方向：

1.  **更精细的上下文与安全控制**：无论是 Cowork 的文件夹管理、沙箱的严格网络控制，还是自动压缩的“安全网”插件，社区都希望拥有对**模型工作范围和数据流动的绝对控制权**。
2.  **模型选择与切换的确定性**：用户对默认模型回退、模型偏好被覆盖、Fable 5 在特定平台不可用等问题非常敏感。他们期望在选择模型时获得**明确、可靠且可预测**的行为。
3.  **CI/CD 与自动化工作流的稳定性**：MCP 插件通知失败、Routines 自动执行报错等，表明社区正将 Claude Code 深度整合到自动化流程中，对 API 的稳定性和插件的可靠性提出了更高要求。

## 开发者关注点
当前开发者反馈中最突出的痛点和需求包括：

-   **核心稳定性与网络问题**：`ECONNRESET`、`socket connection closed` 等网络错误频发，且与特定平台(Linux/KVM)相关，严重影响了开发体验。
-   **远程协作功能尚不成熟**：`Remote Control` 的认证失败、令牌刷新竞态等问题，表明该功能在商业环境下的可靠性仍有待提升。
-   **跨平台体验不一致**：桌面端与 CLI 在上文窗口大小、模型行为上的差异，给用户带来了困惑和不确定性。
-   **计费与额度透明度不足**：Max 计划额度异常消耗问题长期悬而未决，显示出用户对**计费模型透明度和监控能力**的强烈诉求。

---

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-07-25

## 今日速览

Windows 桌面应用稳定性仍是社区最大痛点：连续多个 Git 进程泄漏、多根目录项目崩溃、更新后无法启动等问题集中爆发。同时，GPT-5.6 模型行为异常（串行调用、静默降级）和 CLI 会话中毒、SQLite 高写等性能问题也引发关注。开发团队在 24 小时内密集发布了 5 个 Rust 运行时 alpha 补丁（v0.146.0-alpha.6~10），并合并了 20+ 个修复 PR，重点涉及 MCP 配置隔离、插件认证路由、线程分叉支持等基础设施改进。

---

## 版本发布

过去 24 小时 Codex 发布了 **5 个 Rust 运行时 alpha 版本**（v0.146.0-alpha.6 → alpha.10），均为小版本迭代，未附带详细变更说明。推测为紧急修复上游依赖或内部集成问题。建议使用 Rust 运行时的开发者尽快升级至最新 alpha.10 版本。

---

## 社区热点 Issues（Top 10）

1. **#35057 — Windows 桌面在添加第二个文件夹后无法启动**  
   [链接](https://github.com/openai/codex/issues/35057)  
   ⚠️ 严重程度高：用户将第二个目录加入项目后，Codex Desktop 卡在“发生错误”界面，无法恢复。已获 19 条评论，Windows 11 用户反馈集中。

2. **#17229 — Windows App 持续生成 `git.exe status` 并残留孤儿进程**  
   [链接](https://github.com/openai/codex/issues/17229)  
   🔁 长期 Bug：自 4 月起上报，至今仍有 33 条讨论，被标记为 `bug`、`windows-os`、`app`。表现为频繁调用 git 状态查询并留下 zombie 进程。

3. **#20880 — App 每次启动在 `~/Documents/Codex` 创建空文件夹**  
   [链接](https://github.com/openai/codex/issues/20880)  
   👎 用户不满度高（39 👍），20 条评论。虽然不影响功能，但用户认为这是不必要的垃圾文件行为。

4. **#35050 — GPT-5.6 串行执行独立 Code Mode 调用，显式批处理可降低 27–45% 加权用量**  
   [链接](https://github.com/openai/codex/issues/35050)  
   💡 性能/成本优化关键：模型在 Codex App 中不会自动合并独立 Code Mode 调用，导致加权 token 浪费。用户已验证手动批处理有效。

5. **#20933 — Windows 桌面打开项目/聊天时触发多个 `git.exe add -A` 导致高 CPU 和磁盘**  
   [链接](https://github.com/openai/codex/issues/20933)  
   🐌 性能类热门：自 5 月上报，持续被关注。每次打开聊天界面都可能并行启动多个 `git add -A`，严重影响低配机器。

6. **#33450 — Windows App 每秒 spawn 12–13 个 git.exe 进程并重建无效空 .git 目录**  
   [链接](https://github.com/openai/codex/issues/33450)  
   🔄 与 #17229、#20933 同属 Git 进程泛滥问题，但更极端：每秒十几进程，需要手动修复。社区已形成系列反馈。

7. **#34677 — GPT-5.6 Pro 被静默降级到 Instant / GPT-5.5 Mini**  
   [链接](https://github.com/openai/codex/issues/34677)  
   🔍 模型行为严重：用户选择 GPT-5.6 Pro，但响应返回无思考过程，模型自认为是 GPT-5.5 Mini。影响 Pro 订阅者信任。

8. **#35119 — Windows WSL 仓库被误判为“非 Git”并提示 Git 不可用**  
   [链接](https://github.com/openai/codex/issues/35119)  
   🔧 回归 Bug：最新 26.721.3404 版本无法识别 WSL2 内的 Git 仓库，导致无法使用项目功能。用户降级到旧版可恢复。

9. **#35195 — 多根目录项目导致 App 渲染器崩溃（`process is not defined`）**  
   [链接](https://github.com/openai/codex/issues/35195)  
   💥 复现高：创建含两个根目录的项目后，每次选中该任务都会崩溃，需重新安装。与 #35057 高度关联。

10. **#35284 — App 崩溃后无法再次打开，直到修复安装**  
    [链接](https://github.com/openai/codex/issues/35284)  
    🚨 当日新上报：版本 26.721.41059，Plus 用户。崩溃后直接无法启动，必须使用“修复”选项。可能涉及应用状态损坏。

---

## 重要 PR 进展（Top 10）

1. **#35280 — 跳过无 allowlist 时的 MCP 过滤**  
   [链接](https://github.com/openai/codex/pull/35280)  
   ✅ 已合并。优化插件 MCP 服务器加载：当所有插件未声明 `mcp_servers` 时，不再进行过滤，减少不必要的配置开销。

2. **#35275 — 追踪远程执行服务器连接建立**  
   [链接](https://github.com/openai/codex/pull/35275)  
   ✅ 已合并。在远程环境启动后台任务中保留 tracing span，增加对 WebSocket 连接阶段的跨度，便于诊断远程执行故障。

3. **#35271 — 在 Responses Lite 元数据中包含 code-mode 工具名称**  
   [链接](https://github.com/openai/codex/pull/35271)  
   ✅ 已合并。允许客户端识别 Code Mode 工具调用，为后续前端展示和计费审计提供更细粒度信息。

4. **#35267 — 强化网络审批取消与并发处理**  
   [链接](https://github.com/openai/codex/pull/35267)  
   ✅ 已合并。修复重复网络请求合并、审批超时取消等问题，提升多线程环境下网络审批的稳定性。

5. **#35266 — 允许禁用进程内 code-mode host 回退**  
   [链接](https://github.com/openai/codex/pull/35266)  
   ✅ 已合并。新增配置选项：当外部 code-mode host 启动失败时，可选择不再回退到内嵌 V8，而是返回工具错误。利于调试和一致性。

6. **#35264 — 签名 macOS 辅助二进制文件（rg、zsh）**  
   [链接](https://github.com/openai/codex/pull/35264)  
   ✅ 已合并。修复 macOS 打包流程中 `rg` 和 zsh 未经过签名/公证的问题，避免 Gatekeeper 拦截。

7. **#35251 — 支持分页线程的临时分叉**  
   [链接](https://github.com/openai/codex/pull/35251)  
   ✅ 已合并。允许对使用分页历史的线程创建临时分叉，使长会话也能使用分叉功能。

8. **#35239 — 通过运行时 HTTP 客户端路由 MCP 认证发现**  
   [链接](https://github.com/openai/codex/pull/35239)  
   ✅ 已合并。确保 MCP 服务的 OAuth 发现走正确的代理/路由，解决企业环境下认证失败问题。

9. **#35238 — 支持 ent26 企业计划**  
   [链接](https://github.com/openai/codex/pull/35238)  
   ✅ 已合并。为新的企业套餐 `ent26` 添加认证、速率限制、用户界面支持。

10. **#35216 — 跨线程独立刷新 MCP 配置**  
    [链接](https://github.com/openai/codex/pull/35216)  
    ✅ 已合并。之前 MCP 配置刷新会在一个线程失败时影响所有线程，现改为每个线程独立刷新并记录错误，提升鲁棒性。

---

## 功能需求趋势

- **Windows 稳定性与 Git 集成改进** — 多起 Git 进程泄漏、崩溃、WSL 识别问题成为社区最大呼声，要求统一修复 Git 扫描和进程管理。
- **模型行为透明化** — GPT-5.6 Pro 被静默降级、串行调用浪费额度等问题促使社区要求模型选择和行为可审计。
- **CLI 会话持久性** — “Request blocked” 永久毒化线程、SQLite 高频写导致性能下降，用户希望更健壮的会话恢复和日志策略。
- **多根目录项目支持** — 连续出现多根目录崩溃、无法启动等 Bug，说明多项目工作流需求增长但实现不成熟。
- **MCP & 插件管理** — PR 中大量涉及 MCP 配置隔离、认证发现、线程独立刷新，表明 Codex 在扩展生态的兼容性和安全性投入加大。

---

## 开发者关注点

- **高频痛点：Git 进程泛滥** — 多个 Issue (#17229, #20933, #33450) 描述同一类问题：App 无节制地 spawn git 进程，建议开发者临时禁用自动 Git 索引或在大型仓库中使用排除规则。
- **更新后系统不可用** — 多个版本更新后导致崩溃、WSL 仓库无法识别，建议用户保留旧版安装包，以便快速回退。
- **模型行为黑盒** — GPT-5.6 串行调用、静默降级导致额外费用，建议高级用户手动监控 token 使用，并在 ChatGPT Web 端对比验证。
- **CLI 数据库锁问题** — #31184 “database is locked” 在 Linux 上长时间未解决，提示使用 API key 认证的用户注意并发会话数量。
- **安全策略误拦截** — #34306、#35160 等报告安全检测误拦正常请求，开发者希望 Codex 提供更宽松的审核日志或申诉机制。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-07-25

## 今日速览

社区焦点集中在**代理稳定性与安全性**上：多个高优先级 Issue 报告了编码代理状态丢失、git 危险操作、OAuth 认证循环等关键问题；同时，团队正积极推进 **SSR 自动化流水线**与 **Caretaker 工单自动分类**两个大型内部项目。文档与隐私方面的争议讨论热度不减，付费用户对新模型访问限制的不满持续发酵。

---

## 社区热点 Issues

以下精选 10 条上周更新且对话活跃的 Issue，覆盖安全性、代理可靠性、文档争议等议题。

### 1. #20498 付费订阅但无法访问 Gemini 3
- **链接**: [Issue #20498](https://github.com/google-gemini/gemini-cli/issues/20498)
- **标签**: `priority/p3`, `customer-issue`
- **重要性**: 用户明确反映“付费了却没有最新模型”，质疑付费与免费的无差别。获得 12 条评论和 2 个赞同，说明是普通用户的真实痛点。
- **状态**: 已关闭（stale），但问题本身未解决，可能需要在下次版本更新中明确说明模型访问策略。

### 2. #26736 编码代理多步骤任务中丢失工作流状态、超出批准范围
- **链接**: [Issue #26736](https://github.com/google-gemini/gemini-cli/issues/26736)
- **标签**: `priority/p2`, `area/agent`, `kind/bug`
- **重要性**: 详细描述了一个复杂的 Go 仓库任务中代理不遵循检查点流程，擅自执行未批准步骤。影响生产环境下的增量开发，6 条评论表明该问题具有代表性。
- **状态**: 已关闭（stale），但值得关注后续是否在核心逻辑中修复。

### 3. #21937 `gemini-3.1-pro-preview` 100% 错误率 / 无限加载
- **链接**: [Issue #21937](https://github.com/google-gemini/gemini-cli/issues/21937)
- **标签**: `priority/p1`, `area/agent`, `kind/bug`
- **重要性**: P1 优先级，指定模型完全挂起无响应，导致 Windows 用户无法使用。6 条评论，用户提供了详细环境信息。
- **状态**: 已关闭（stale），但类似模型可用性问题仍有隐患。

### 4. #23411 为 `git reset --hard` 和 `git push --force` 增加保护
- **链接**: [Issue #23411](https://github.com/google-gemini/gemini-cli/issues/23411)
- **标签**: `priority/p2`, `area/agent`, `kind/enhancement`
- **重要性**: 用户报告代理直接使用危险命令清除了 git 历史，要求权限确认。6 条评论，体现开发者对数据安全的核心关切。
- **状态**: 仍为 **OPEN**，等待人工分类，值得关注后续防护方案。

### 5. #20355 策略引擎未阻止匹配的命令
- **链接**: [Issue #20355](https://github.com/google-gemini/gemini-cli/issues/20355)
- **标签**: `priority/p1`, `area/enterprise`, `kind/bug`
- **重要性**: P1 企业级 Bug，用户配置了策略引擎但依然无法防止代理删除本地 git 分支。6 条评论，影响团队协作安全。
- **状态**: **OPEN**，仍在等待修复，是企业用户的上线障碍。

### 6. #20569 文档中关于付费用户数据是否用于模型训练的隐私矛盾
- **链接**: [Issue #20569](https://github.com/google-gemini/gemini-cli/issues/20569)
- **标签**: `priority/p2`, `area/documentation`, `kind/bug`
- **重要性**: 5 条评论但获得 **7 个赞同**，是当日最高赞 Issue。用户指出 Gemini CLI 文档与 Gemini Code Assist FAQ 说法冲突，影响付费用户对数据安全的信任。
- **状态**: 已关闭（stale），但官方需尽快统一口径。

### 7. #21818 人类确认逻辑关键失败：代理直接执行，不等待用户确认
- **链接**: [Issue #21818](https://github.com/google-gemini/gemini-cli/issues/21818)
- **标签**: `priority/p1`, `area/agent`, `kind/bug`
- **重要性**: 报告代理在生成“是否继续？”后立即执行工具，跳过用户确认。5 条评论，直接破坏人机协作的安全基础。
- **状态**: 已关闭（stale），但该问题若未完全修复将导致严重后果。

### 8. #22025 依赖库存在安全警告长期未更新
- **链接**: [Issue #22025](https://github.com/google-gemini/gemini-cli/issues/22025)
- **标签**: `priority/p2`, `area/security`, `kind/bug`
- **重要性**: 用户情绪强烈，指出 Google 产品连续数月未更新已弃用且含安全警告的依赖。4 条评论，1 个赞同，代表对供应链安全的不信任。
- **状态**: 已关闭（stale），但安全审计应持续进行。

### 9. #22062 文档未说明 `gemini-3.1-pro-preview-customtools` 仅限 API Key 认证
- **链接**: [Issue #22062](https://github.com/google-gemini/gemini-cli/issues/22062)
- **标签**: `priority/p3`, `area/documentation`, `kind/bug`
- **重要性**: 用户尝试使用自定义工具模型时发现认证方式限制，文档未提及，导致配置失败。7 条评论，1 个赞同，影响首次使用体验。
- **状态**: 已关闭，但文档改进是持续需求。

### 10. #22159 浏览器代理中 Chrome 致命错误导致输入阻塞器未恢复
- **链接**: [Issue #22159](https://github.com/google-gemini/gemini-cli/issues/22159)
- **标签**: `priority/p2`, `area/agent`, `kind/bug`
- **重要性**: 代理在 Chrome 连接断开时未正确释放输入阻塞，导致界面永久卡死。7 条评论，属于代理稳定性关键问题。
- **状态**: 已关闭（stale），类似的资源泄漏模式需警惕。

---

## 重要 PR 进展

以下 10 个 PR 在昨日有更新，涵盖安全修复、核心功能改进和内部工具建设。

### 1. #28353 防止 `restore` 命令路径遍历攻击
- **链接**: [PR #28353](https://github.com/google-gemini/gemini-cli/pull/28353)
- **标签**: `size/s`, `status/need-issue`
- **内容**: 在 A2A 服务器中增加了对 `restore` 命令参数路径归一化和包含检查，防止用户输入如 `../../../etc/passwd` 读取任意文件。属于防御性深度安全。
- **状态**: 已合并（CLOSED），提升了服务端安全性。

### 2. #28348 修复 `MaxListenersExceededWarning` 及无限认证循环
- **链接**: [PR #28348](https://github.com/google-gemini/gemini-cli/pull/28348)
- **标签**: `area/core`, `size/m`
- **内容**: 解决因事件监听器未移除导致的警告，以及 Windows 下 OAuth 成功后陷入无限循环的问题（对应 #28313、#28341）。这是常见用户痛点。
- **状态**: 已合并，影响认证流程稳定性。

### 3. #28509 过滤 `getHistoryTurns` 中的内部思维部分
- **链接**: [PR #28509](https://github.com/google-gemini/gemini-cli/pull/28509)
- **标签**: `size/m`, `status/need-issue`
- **内容**: 确保在 Gemini 2.x 及更新模型中，当上下文管理禁用时完全剔除 `thought: true` 部分，防止思维泄漏导致重复推理块。
- **状态**: 已合并，提升了对话历史的一致性。

### 4. #28517 强制 `GoogleCredentialsAuthProvider` 使用 HTTPS
- **链接**: [PR #28517](https://github.com/google-gemini/gemini-cli/pull/28517)
- **标签**: `size/m`, `status/need-issue`
- **内容**: 添加协议检查，防止 ADC 令牌通过明文 HTTP 传输，避免凭据泄露。
- **状态**: 已合并，增强了基础认证安全性。

### 5. #28481 刷新 MCP OAuth 令牌时使用存储的 client ID
- **链接**: [PR #28481](https://github.com/google-gemini/gemini-cli/pull/28481)
- **标签**: `priority/p1`, `area/security`, `size/m`
- **内容**: 修复通过动态注册添加的 MCP 服务器在令牌刷新时因 client ID 丢失导致强制重新认证的问题。P1 优先级，直接影响 MCP 集成体验。
- **状态**: OPEN，正在等待合并。

### 6. #28446 使用原生 fetch 替换 `node-fetch` 解决 OAuth 令牌交换“Premature close”错误
- **链接**: [PR #28446](https://github.com/google-gemini/gemini-cli/pull/28446)
- **标签**: `priority/p1`, `area/security`, `size/m`
- **内容**: 针对某些无头 VPS 上 `gemini login` 因 `Premature close` 失败的问题，改用 Node.js 原生 fetch 库。P1 优先级，直接影响远程环境登录。
- **状态**: OPEN，目前有 1 条评论。

### 7. #28523 为文件凭证存储强制显式认证标签长度（128位）
- **链接**: [PR #28523](https://github.com/google-gemini/gemini-cli/pull/28523)
- **标签**: `size/m`, `status/need-issue`
- **内容**: 确保文件 keychain 中的加密认证标签使用标准的 16 字节长度，并增加对异常数据的校验，防止跨运行时兼容性问题。
- **状态**: OPEN，强化本地数据安全。

### 8. #28531 修复 A2A 服务器中 CRLF 行尾导致 Windows 差异视图无高亮
- **链接**: [PR #28531](https://github.com/google-gemini/gemini-cli/pull/28531)
- **标签**: `size/m`, `status/need-issue`
- **内容**: 在 `getProposedContent` 中将 CRLF 转换为 LF，解决 Gemini Code Assist Windows 客户端中生成内容 diff 不显示修改的问题。直接改善 Windows 开发体验。
- **状态**: OPEN，目前有 2 条评论。

### 9. #28532 & #28530 新增 Caretaker 工单分代评估框架与黄金数据集工具
- **链接**: [PR #28532](https://github.com/google-gemini/gemini-cli/pull/28532) & [PR #28530](https://github.com/google-gemini/gemini-cli/pull/28530)
- **标签**: `size/l`, `status/need-issue`
- **内容**: 两个大型 PR 为 Caretaker Agent（自动工单分类与分代）添加了基于 LLM-as-Judge 的评估框架、并行 Git Worktree 基准运行器、以及本地黄金数据集收集和 Firestore 同步工具。属于内部基础设施，但表明团队正系统化提升工单处理 AI 的质量。
- **状态**: OPEN，依赖 #28530 先合并。

### 10. #28435 / #28433 / #28434 / #28432 / #28431 SSE Pipeline 系列 PR
- **链接**: 分别为 [#28435](https://github.com/google-gemini/gemini-cli/pull/28435) 等
- **标签**: `size/l`/`xl`, `status/need-issue`
- **内容**: 五个 PR 共同构成 Gemini CLI 的 **SSR（Self-Supervised Repair）代码生成流水线**，包括环境配置解析、Antigravity 代理运行器、Firestore 并发锁、Cloud Run 基础设施、迭代错误修复状态机等。这是一个庞大的内部工程，旨在自动将 Issue 转换为 PR 并修复 bug。
- **状态**: 全部 OPEN，属于 2026 年实习生项目，预计将显著提升自动 bug 修复能力。

---

## 功能需求趋势

从近期 Issue 和 PR 中可以提炼出以下社区最关注的功能方向：

| 方向 | 代表 Issue / PR | 说明 |
|---|---|---|
| **代理稳定性与可预测性** | #26736、#21937、#21818、#22159 | 用户期望代理严格遵循工作流、不跳过确认、不丢失状态、不无限等待 |
| **安全防护与权限控制** | #23411、#20355、#28353、#28446、#28517 | 防止 git 破坏、路径遍历、明文传输、OAuth 循环，尤其企业用户强需求 |
| **文档准确性与隐私透明度** | #20569、#22062 | 用户要求统一、清晰的模型访问条件和数据使用政策 |
| **新模型支持与付费权益** | #20498、#21937 | 付费用户希望及时获得最新模型，且稳定可用 |
| **开发环境与工具链** | #21302（Docker）、#21301（链接检查） | 贡献者希望有更友好的开发环境（Docker）、自动化 CI 检查 |
| **评估与质量保障** | #21990（错误恢复评估）、#28530（分代评估） | 社区关注代理错误自修复能力的量化测试 |
| **跨平台适配** | #21997（PowerShell 命令拼接）、#22149（Windows 构建失败） | Windows 用户要求一致的行为和可运行性 |

---

## 开发者关注点

综合 Issue 评论和反馈，以下是最集中的痛点与高频需求：

1. **付费权益名不副实** – #20498 中用户质疑：“既然付了钱为什么还没有 Gemini 3？免费和付费的区别是什么？” 需官方明确模型访问分层策略。
2. **代理对 git 的破坏性操作缺乏保护** – #23411 和 #20355 均描述代理未经许可执行 `git push --force` 或 `git reset --hard` 导致历史丢失，用户强烈要求增加确认机制或 revert 模式。
3. **人类中断（Human-in-the-loop）被架空** – #21818 代理在给出确认提示后立即执行，使用户失去控制权。这是协作安全的核心缺陷。
4. **文档与隐私矛盾引发信任危机** – #20569 获得 7 个赞，开发者担心付费后代码仍被用于训练模型，希望 Google 给出明确且一致的回应。
5. **依赖安全长期被忽视** – #22025 用户情绪激动：“Google 产品持续数月发布带有安全警告的依赖，这太荒谬了。” 社区希望加快依赖更新节奏。
6. **Windows 环境体验差** – #22149 `npm run preflight` 原生失败，#21997 代理仍使用 `&&` 而非 `;`，#28531 CRLF 问题——Windows 用户感到“二等公民”。
7. **代理资源泄漏与死锁** – #22159 浏览器代理输入阻塞器未释放，#28348 事件监听器溢出——这些让用户对长时间对话的可靠性存疑。

---

*数据来源: github.com/google-gemini/gemini-cli 截至 2026-07-25 UTC*  
*报告生成时间: 2026-07-25*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报 | 2026-07-25

## 📊 今日速览

- **版本 v1.0.75 发布**：新增对 Claude Opus 5 的支持，进一步提升模型能力。
- **权限与计划模式回归问题持续发酵**：多个 Issue 报告 `plan-mode` 下误拦截只读命令（如 `gh api`），以及 `Ctrl+C` 中断失效等回归，社区关注度高。
- **大会话恢复 OOM 回归**：v1.0.74 引入的内存与 CPU 性能倒退（#4251）成为新热点，开发者呼吁紧急修复。

---

## 🚀 版本发布

### v1.0.75 (2026-07-24)
- **主要更新**：新增对 **Claude Opus 5** 模型的支持。
- 无其他功能或 bug 修复说明。

---

## 🔥 社区热点 Issues（10 个精选）

### 1. [#4188 - plan-mode 回归：阻止 shell 命令执行](https://github.com/github/copilot-cli/issues/4188)
- **标签**：`area:permissions` `area:tools`  |  评论 4  |  赞 👍3
- **重要性**：plan-mode 本应允许只读命令以丰富计划，但最新版本却拦截了 `gh` 等常用工具，破坏工作流。
- **社区反应**：用户指出此回归严重影响计划辅助能力，期待紧急修复。

### 2. [#4183 - 自动压缩无效：CAPI 5MB body 限制导致会话永久不可用](https://github.com/github/copilot-cli/issues/4183)
- **标签**：`area:context-memory` `area:models`  |  评论 3  |  赞 👍10
- **重要性**：即使 token 容量足够，长期工具调用也可能因序列化后的请求体超过 5MB 限制而彻底卡死。社区对自动压缩机制的可靠性提出质疑。
- **社区反应**：高赞需求，多位用户报告影响大型项目开发。

### 3. [#4163 - v1.0.71 子进程不回收导致 zombie 进程堆积](https://github.com/github/copilot-cli/issues/4163)
- **标签**：`area:platform-linux` `area:tools`   |  评论 3  |  赞 👍3
- **重要性**：Linux 上每 2 分钟产生一个僵尸进程，长期运行消耗大量 PID 资源。虽然标签为 CLOSED，但社区的持续关注表明修复需要验证。
- **社区反应**：用户提供了详细的内存/状态截图，要求彻底解决。

### 4. [#4222 - Windows 终端无限渲染循环回归](https://github.com/github/copilot-cli/issues/4222)
- **标签**：`area:platform-windows` `area:terminal-rendering`   |  评论 1  |  赞 👍0
- **重要性**：v1.0.72+ 在 VS Code 集成终端中重现了 #2802 的 "Maximum update depth exceeded" 错误，导致主界面冻结、无法输出。
- **社区反应**：Windows 用户高频痛点，回归后体验严重下降。

### 5. [#4220 - plan-mode 误拦截只读 gh api GET/GraphQL 查询](https://github.com/github/copilot-cli/issues/4220)
- **标签**：`area:permissions`   |  评论 1  |  赞 👍1
- **重要性**：与 #4188 同类问题，但聚焦于 `gh api` 的误判，导致日常调研工作流中断。
- **社区反应**：开发者建议改进命令门控逻辑，区分只读与写操作。

### 6. [#3773 - 浅色主题对比度低，文本难以阅读](https://github.com/github/copilot-cli/issues/3773)
- **标签**：`area:theming-accessibility`   |  评论 3  |  赞 👍3
- **重要性**：长期存在的无障碍 bug，用户提示栏黑底黑字（或低对比度），影响正常使用。
- **社区反应**：缺乏进展，社区呼吁优先处理。

### 7. [#1128 - 请求添加 awaitingUserInput 钩子](https://github.com/github/copilot-cli/issues/1128)
- **标签**：`area:theming-accessibility`   |  评论 5  |  赞 👍28
- **重要性**：功能需求最高赞（28）。现有钩子仅在用户提交后触发，缺少“等待输入”阶段的事件，限制第三方集成和辅助工具的响应能力。
- **社区反应**：持续活跃，有多位开发者补充使用场景。

### 8. [#4251 - v1.0.74 恢复大会话时 OOM / CPU 100% 回归](https://github.com/github/copilot-cli/issues/4251)
- **标签**：`triage`   |  评论 0  |  赞 👍0
- **重要性**：最新发现的高危回归：在 1.0.74 中恢复大型会话时内存占用激增 3-4 倍，CPU 单核 70 分钟后才失败。直接影响每日持续使用重型任务的用户。
- **社区反应**：紧急上报，需立即调查。

### 9. [#4253 - /ask 命令频繁无结果](https://github.com/github/copilot-cli/issues/4253)
- **标签**：`triage`   |  评论 0  |  赞 👍0
- **重要性**：v1.0.75 新版本中 `/ask` 命令在无错误提示下返回空结果，可能影响整体问答体验。
- **社区反应**：刚提交，等待官方确认。

### 10. [#4242 - /sandbox 命令不可用](https://github.com/github/copilot-cli/issues/4242)
- **标签**：`CLOSED`   |  评论 3  |  赞 👍0
- **重要性**：用户尝试使用 `/sandbox` 时收到 "Unknown command"，影响沙盒测试工作流。已关闭但未说明原因，社区表示疑惑。

---

## 📌 功能需求趋势

从当前 Issues 中提炼出的社区核心关注方向：

| 需求方向 | 代表 Issue | 热度 |
|--------|-----------|------|
| **IDE / 非交互模式集成** | #4233 ACP 模式输出使用量更新、#4234 MCP 插件工作目录问题 | 🟢 中等 |
| **新模型支持** | 最新版本已支持 Claude Opus 5，社区对多模型路由、模型选择配置仍有期待 | 🟢 已回应 |
| **权限与安全改进** | #4188 #4220 计划模式下的命令门控误判 | 🔴 高 |
| **性能与稳定性** | #4183 上下文膨胀、#4251 大会话 OOM、#4163 僵尸进程 | 🔴 极高 |
| **主题与无障碍** | #1128 等待输入钩子、#3773 浅色主题对比度 | 🟡 中等 |
| **插件系统** | #2200 插件安装路径错误、#4247 插件注册未持久化、#4234 MCP 工作目录 | 🟡 中等 |

**点评**：性能/稳定性回归成为本周期最突出痛点，尤其是大会话处理、进程管理、终端渲染等基础问题。权限逻辑的误判也在快速积聚负面反馈。

---

## 🧠 开发者关注点

1. **回归恐惧**：多个功能（Ctrl+C 中断、plan-mode 只读命令、Windows 终端渲染、大会话恢复）在近几个版本中反复出现回归，开发者对质量测试流程表示担忧。
2. **上下文管理与 CAPI 限制**：5MB body 限制成为长期会话的硬天花板，自动压缩未能避免，社区期望提供更灵活的裁剪策略或分块机制。
3. **跨平台体验不一致**：Windows（渲染循环）、Linux（僵尸进程）的平台特定问题持续存在，用户呼吁增加平台专项测试。
4. **插件/MCP 集成不成熟**：插件安装、注册、工作目录解析等基础环节仍有 bug，影响第三方生态发展。
5. **命令行交互细节**：`/ask` 无响应、密码屏蔽干扰 agent、编辑器打开模式异常等小问题虽不致命，但累积影响日常效率。

---

*数据来源：GitHub `github/copilot-cli` 仓库，统计截至 2026-07-25 08:00 UTC。*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报 — 2026-07-25

---

## 📌 今日速览

过去 24 小时社区活跃度平稳，未发布新版本，但 **2 个已关闭 / 新开的 bug** 均涉及核心登录流程（网络不可达 & OAuth 失败），对用户体验影响较大。功能方面，**“远程控制”提案（#1282）获得 16 个 👍**，成为社区呼声最高的需求；两个 PR 分别围绕企业代理 SSL 认证和 MCP 服务器日志处理进行修复，体现了企业对生产环境兼容性的关注。

---

## 🚀 版本发布

无（2026-07-25 无新版本发布）

---

## 🔥 社区热点 Issues

### 1. [bug] Login failed: Cannot connect to host auth.kimi.com:443 ssl:default [Network is unreachable] (#1070)
- **状态**：✅ 已关闭  
- **摘要**：用户运行 `kimi login` 时因网络不可达认证服务器，无法完成登录。  
- **为什么重要**：登录是 CLI 使用的第一步，该问题在 1.9.0 版本中仍出现，说明对特殊网络环境（如代理、防火墙）的支持仍需加强。  
- **社区反应**：7 条评论，虽已关闭但未给出根治方案，用户需手动配置网络。  
- 🔗 [Issue #1070](https://github.com/MoonshotAI/kimi-cli/issues/1070)

### 2. [enhancement] Feature Request: Remote Control - Continue local sessions from any device (#1282)
- **状态**：📌 开放  
- **摘要**：建议增加远程控制功能，允许用户在手机/平板上继续本地终端会话，保持工作流连续性。  
- **为什么重要**：获 **16 个 👍**，是当前最高赞的 Feature Request，反映开发者对移动端或异地延续会话的强烈需求。  
- **社区反应**：7 条讨论，用户积极补充使用场景（如出差时继续编译任务）。  
- 🔗 [Issue #1282](https://github.com/MoonshotAI/kimi-cli/issues/1282)

### 3. [bug] VS code Kimi Freezes (#2326)
- **状态**：📌 开放  
- **摘要**：VS Code 扩展频繁卡死，涉及 `kimi 2.6` 模型和 Ubuntu 平台。  
- **为什么重要**：IDE 集成是开发者核心工作路径，卡死（freeze）直接降低生产效率。  
- **社区反应**：3 条评论，但未提供复现步骤，开发者需进一步排查。  
- 🔗 [Issue #2326](https://github.com/MoonshotAI/kimi-cli/issues/2326)

### 4. [bug] windows 版本的herdr中，无法使用方向键选择 (#2521)
- **状态**：📌 开放  
- **摘要**：Windows 版 `herdr`（推测为 `helm-dashboard` 或类似 TUI）中方向键失效，无法选择选项。  
- **为什么重要**：Windows 用户无法正常使用命令行交互界面，关键交互流程受阻。  
- **社区反应**：仅 1 条评论，但属于平台兼容性基础问题，影响面广。  
- 🔗 [Issue #2521](https://github.com/MoonshotAI/kimi-cli/issues/2521)

### 5. [bug] kimi login fails (#2556)
- **状态**：📌 开放（2026-07-24 新创建）  
- **摘要**：用户购买订阅后运行 `kimi login` 失败（Linux ARM64，OAuth 方式）。  
- **为什么重要**：刚购买服务即遇到登录失败，严重影响新用户转化和信任。  
- **社区反应**：0 条评论，刚上报，但开发者应优先处理。  
- 🔗 [Issue #2556](https://github.com/MoonshotAI/kimi-cli/issues/2556)

---

## 🔧 重要 PR 进展

### 1. fix: respect SSL_CERT_FILE env var for corporate proxy support (#762)
- **状态**：📌 开放  
- **功能**：增加对 `SSL_CERT_FILE` 环境变量的支持，使 CLI 能够识别企业代理（如 Zscaler、BlueCoat）的自签名证书，避免 SSL 证书验证错误。  
- **为什么重要**：直接关联 Issue #1070 的网络不可达问题，若合并可解决大量企业用户登录失败。  
- 🔗 [PR #762](https://github.com/MoonshotAI/kimi-cli/pull/762)

### 2. fix: route MCP server log notifications to loguru instead of TUI (#1637)
- **状态**：📌 开放  
- **功能**：将 MCP 服务器的日志通知从 TUI 输出重定向到 `loguru`，避免 `fastmcp` 默认的 `RichHandler` 将日志信息 dump 到终端界面，造成界面混乱。  
- **为什么重要**：提升使用 MCP 工具（如 SearXNG）时的用户体验，使终端输出更干净。  
- 🔗 [PR #1637](https://github.com/MoonshotAI/kimi-cli/pull/1637)

---

## 📊 功能需求趋势

从本期所有活跃 Issues 及 PR 中可看出社区关注以下方向：

| 功能方向 | 代表 Issue/PR | 社区热度 |
|---------|--------------|---------|
| **远程控制 / 跨设备会话延续** | #1282 | 🔥🔥🔥（16 👍） |
| **企业网络兼容性（SSL、代理）** | #1070, #762 | 🔥🔥（直接影响登录） |
| **IDE 集成稳定性** | #2326 | 🔥（VS Code 卡死） |
| **Windows 平台 TUI 可用性** | #2521 | 🔥（方向键失效） |
| **MCP 工具链日志优化** | #1637 | 🔥（专业用户场景） |

---

## 👨‍💻 开发者关注点

- **登录流程脆弱**：网络不可达（#1070）和 OAuth 失败（#2556）在短短几小时内出现，开发者期望 CLI 能提供更清晰的错误提示和重试策略。
- **企业环境支持不足**：缺少`SSL_CERT_FILE`支持导致公司网络用户无法使用，PR #762 虽已提交但尚未合并，社区呼吁尽快处理。
- **Windows 体验差距**：方向键无法使用（#2521）影响了 Windows 用户的基本操作，表明跨平台测试覆盖需加强。
- **VS Code 扩展质量**：扩展卡死（#2326）直接中断工作流，开发者希望优先修复并增强稳定性。
- **功能可扩展性**：远程控制需求（#1282）表明用户不再满足于单机终端，期望 CLI 成为云原生工作流的一部分。

---

*本日报基于 MoonshotAI/kimi-cli 仓库 2026-07-24 公开数据自动整理，仅供参考。*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

好的，作为专注于 AI 开发工具的技术分析师，以下是基于您提供的 GitHub 数据汇总的 2026-07-25 日 OpenCode 社区动态日报。

---

# OpenCode 社区动态日报 | 2026-07-25

## 今日速览

今日社区动态主要围绕 **v1.18.5 版本发布** 展开，该版本修复了多个核心稳定性问题，特别是针对 Claude、Mistral 等模型的处理。与此同时，**代理无故停止工作** 成为社区反馈最强烈的痛点，大量用户报告任务执行中断，急需手动恢复。此外，**新模型支持** 与 **桌面应用稳定性** 是当前社区最关注的两大功能方向。

## 版本发布

### v1.18.5

**发布目的**：紧急修复多个核心 Bug，提升模型兼容性和稳定性。

**核心更新内容**：
- **Bug 修复**:
    - **Claude**: 改进了 Claude 自适应思考（Adaptive Thinking）的处理逻辑，适配了更多响应格式。
    - **OpenAI**: 修复了可能导致部分对话中断的响应阶段处理问题。
    - **搜索 (grep)**: 修复了搜索结果中符号链接路径未保留的问题。（感谢 @remixz）
    - **Mistral**: 修复了跨会话轮次时推理历史的保存问题，并稳定了 Mistral 模型的处理。

**🔗 GitHub Release**: [v1.18.5](https://github.com/anomalyco/opencode/releases/tag/v1.18.5)

## 社区热点 Issues

本周社区讨论热度集中在模型兼容性和代理（Agent）稳定性上，“代理无故停止”的问题尤为突出。

1.  **#6231 [功能请求] 自动发现 OpenAI 兼容性本地 Provider 的模型** - 评论: 32，👍: 188
    - **为何重要**: 这是社区最热切期望的功能。用户需要手动在 `opencode.json` 中配置本地 provider（如 LM Studio, Ollama）的模型列表，过程繁琐且易错，请求自动发现模型列表以简化配置。
    - **🔗 Issue #6231**: [链接](https://github.com/anomalyco/opencode/issues/6231)

2.  **#24316 [Bug] 使用 Qwen 3.6 35b-a3b 模型时，console 出现裸 tool_call 导致进度中断** - 评论: 19
    - **为何重要**: 核心模型兼容性bug。与 Qwen 和 llama.cpp 的组合使用导致工具调用失败，影响了使用本地大模型的用户。
    - **🔗 Issue #24316**: [链接](https://github.com/anomalyco/opencode/issues/24316)

3.  **#25130 [Bug] Opencode 突然切换成另一种语言回复** - 评论: 10
    - **为何重要**: 一个奇怪的模型输出行为问题。使用某些模型（Big Pickle）时，偶尔会切换语言回复，影响正常使用。
    - **🔗 Issue #25130**: [链接](https://github.com/anomalyco/opencode/issues/25130)

4.  **#38749 [Bug] 代理频繁无故停止** - 评论: 4
    - **为何重要**: 这是近期最普遍的痛点。大量用户反馈无法完成一个完整的任务，代理会在中途无错误提示地停止，需要用户不断输入“continue”。这严重影响了核心工作流。
    - **🔗 Issue #38749**: [链接](https://github.com/anomalyco/opencode/issues/38749) (类似问题详见 #38731、#38782)

5.  **#38378 [Bug] OpenCode Go: Kimi K3 在 /v1/chat/completions 成功，但在 /v1/messages 失败** - 评论: 4
    - **为何重要**: 涉及 OpenCode Go 网关的模型兼容性问题。Kimi 模型通过 OpenAI 兼容端点和 Anthropic 兼容端点表现不一致，可能指向网关路由或协议处理问题。
    - **🔗 Issue #38378**: [链接](https://github.com/anomalyco/opencode/issues/38378)

6.  **#38770 [Bug] 后台子代理通知静默地将手动选择的模型回滚为默认配置** - 评论: 3
    - **为何重要**: 多代理协作时的体验问题。启用后台子代理功能后，用户手动选择的模型会被无声地替换，导致预期外的行为。
    - **🔗 Issue #38770**: [链接](https://github.com/anomalyco/opencode/issues/38770)

7.  **#38787 [Bug] Agent 循环因消息ID非单调对比产生重复响应** - 评论: 2
    - **为何重要**: 一个核心逻辑Bug。`runLoop` 函数仅通过字符串比较消息ID来判断流程，导致在会话导入等场景下陷入死循环或产生重复响应。
    - **🔗 Issue #38787**: [链接](https://github.com/anomalyco/opencode/issues/38787)

8.  **#35496 [功能请求] 增加 `opencode research` 命令 (自动化研究模式)** - 评论: 3
    - **为何重要**: 一个有潜力的新功能建议。旨在将“修改-测量-记录”的实验循环作为一等公民，支持自动化和可复现的研究流程，提高开发效率。
    - **🔗 Issue #35496**: [链接](https://github.com/anomalyco/opencode/issues/35496)

9.  **#35887 [Bug] Linux 下无法通过 Enter 键提交 Prompt** - 评论: 2，👍: 3
    - **为何重要**: 影响 Linux 用户基本使用流程的严重Bug。尽管收到的反馈不多，但其严重性高，会完全阻碍基础交互。
    - **🔗 Issue #35887**: [链接](https://github.com/anomalyco/opencode/issues/35887)

10. **#34006 [Bug] 桌面版 vs 终端版粘贴本地文件路径行为不一致** - 评论: 4
    - **为何重要**: 跨平台体验不一致问题。在桌面版和终端版粘贴文件路径的行为不同，且均无法以纯文本形式粘贴，这在涉及文件操作的工作流中非常不便。
    - **🔗 Issue #34006**: [链接](https://github.com/anomalyco/opencode/issues/34006)

## 重要 PR 进展

今日 PR 动作频繁，主要覆盖了 UI 修复、核心逻辑优化和桌面新功能。

1.  **#38793 [修复] Desktop: 移除全屏时的标题栏插入区** (by Hona)
    - **内容**: 修复了 macOS 桌面版在全屏模式下，红绿灯窗口控制按钮的边距问题。
    - **🔗 PR #38793**: [链接](https://github.com/anomalyco/opencode/pull/38793)

2.  **#38689 [修复] UI: 支持 LaTeX 数学渲染** (by 8Nothing8)
    - **内容**: 解决了 `$...$` 和 `$$...$$` 格式的 LaTeX 渲染问题，对需要展示数学公式的用户是重要更新。
    - **🔗 PR #38689**: [链接](https://github.com/anomalyco/opencode/pull/38689)

3.  **#36091 [修复] Core: 合并等效的待处理权限请求** (by umi008)
    - **内容**: 当多个工具同时请求相同类型的权限（如写文件）时，系统会合并提示，避免用户反复确认，提升交互体验。
    - **🔗 PR #36091**: [链接](https://github.com/anomalyco/opencode/pull/36091)

4.  **#36088 [修复] TUI: 规范化问题文本中的回车符** (by umi008)
    - **内容**: 修复了部分 LLM 输出中包含 `\r` 字符导致 TUI 解析问题失败的问题。
    - **🔗 PR #36088**: [链接](https://github.com/anomalyco/opencode/pull/36088)

5.  **#36087 [修复] TUI: 对推理内容使用 Markdown 渲染器** (by umi008)
    - **内容**: 修复了 `ReasoningPart` 渲染问题，原代码会导致每个 token 都显示为独立行。
    - **🔗 PR #36087**: [链接](https://github.com/anomalyco/opencode/pull/36087)

6.  **#38743 [重构] Core: 无锁的步骤结算方案** (by kitlangton)
    - **内容**: 删除 runner 中所有步骤事件的锁，通过先连接所有工具纤程再写入结算状态，使代码更简洁高效。这是一个重要的性能优化和架构改进。
    - **🔗 PR #38743**: [链接](https://github.com/anomalyco/opencode/pull/38743)

7.  **#38759 [修复] Core: 基于分支的仓库缓存与门控引用就绪状态** (by kitlangton)
    - **内容**: 修复 `RepositoryCache` 中所有分支共享同一个工作目录导致的正确性Bug。现在每个分支拥有独立缓存，提升了 Git 引用管理的可靠性。
    - **🔗 PR #38759**: [链接](https://github.com/anomalyco/opencode/pull/38759)

8.  **#38777 [修复] AI: 保留响应消息的阶段信息** (by rekram1-node)
    - **内容**: 对齐 OpenAI 官方的响应阶段合约，并确保这些元数据在后续请求中得以保留。这有助于更好地理解和调试模型行为。
    - **🔗 PR #38777**: [链接](https://github.com/anomalyco/opencode/pull/38777)

9.  **#38778 [修复] Opencode: 确保 DeepSeek 助手内容非空** (by razmser)
    - **内容**: 修复了 DeepSeek 模型只返回 `reasoning_content` 而内容为空时导致的问题，保证 assistant turn 有内容。
    - **🔗 PR #38778**: [链接](https://github.com/anomalyco/opencode/pull/38778)

10. **#38764 [修复] TUI: 处理 Windows 路径分隔符** (by Sewer56)
    - **内容**: 修复了在 Windows 上 `/status` 命令显示的文件路径格式错误问题。
    - **🔗 PR #38764**: [链接](https://github.com/anomalyco/opencode/pull/38764)

## 功能需求趋势

从今日的 Issues 可以提炼出社区关注的三大功能方向：

1.  **模型兼容性与自动发现**: 用户强烈希望 OpenCode 能自动从本地 OpenAI 兼容 Provider（如 LM Studio、Ollama）发现可用模型列表，无需手动配置。同时，对新模型（如 GPT-5.6、Ling 3.0）的支持和兼容性修复也是持续的重点。
2.  **核心稳定性与体验优化**: “代理无故停止”是当前的首要痛点。社区急需该问题的根本解决方案。此外，针对代码模式的执行工具边界、后台子代理的模型选择一致性、以及循环逻辑等核心稳定性的修复，是未来的开发重点。
3.  **高级开发功能**: 社区开始探索更高级的功能，如 `opencode research` 命令（自动化实验循环）和桌面版内置的 Agent 浏览器面板，预示着 OpenCode 正从“对话式编程”向“半自动化开发平台”演进。

## 开发者关注点

开发者反馈中的核心痛点和需求高度集中：

-   **代理稳定性堪忧**: 这是压倒性的首要痛点。大量用户在多个 Issue 中反映，代理在运行任务约30秒后或在执行单个工具调用后无故停止，无法完成自动化任务。这极大地影响了开发者的效率和信任度。
-   **模型特定问题频出**: 针对特定模型（如Qwen、Kimi、Ling 3.0、DeepSeek）的兼容性问题不断，包括请求失败、工具调用错误、输出格式异常等。开发者希望官方能优先进行更多模型的适配和回归测试。
-   **Windows 平台体验欠佳**: Windows 用户报告了多个特定问题，包括窗口闪烁、路径分隔符显示错误、以及桌面应用的设置页面输入框无法聚焦等。这提示开发组需要加强对 Windows 端用户体验的关注。
-   **桌面与终端行为不一致**: 用户在桌面应用和终端中使用时的体验存在差异，例如文件路径粘贴行为。社区期望这两个界面能提供一致且可预期的交互逻辑。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

好的，各位开发者朋友们，早上好！

欢迎阅读 **2026年7月25日** 的 **Qwen Code 社区动态日报**。我是你们的AI开发工具技术分析师。

今天社区异常活跃，最引人注目的莫过于 **Qwen Code v0.21.0 正式版发布**，同时，多个针对 SWE-bench 的 POC 测试结果同步曝光，其中一次全量测试就解决了 **332个问题**，展示了强大的代码修复能力。此外，社区在性能优化、Web Shell 集成等方面也有多项重要进展。

---

### 📰 今日速览

1.  **🚀 正式版发布**：**Qwen Code v0.21.0 正式版**已于昨日发布，带来了全新的 Web Shell 工作区选择器。
2.  **🧪 SWE-bench 亮点**：多个 DSW SWE-bench 全量测试结果公布，其中一次显示 **332/500** 的问题被成功解决，表明了 Qwen Code 在复杂代码库上的强大潜力。
3.  **⚡ 性能优化**：社区开始大力推动性能优化，其中一项 PR 旨在通过**延迟加载非核心依赖**来改善冷启动速度（#7686）。

---

### 💾 版本发布

#### 🏁 [Qwen Code v0.21.0 正式版](https://github.com/QwenLM/qwen-code/releases/tag/v0.21.0)
这是最新的稳定版本。主要亮点：
- **Web Shell**: 在 Composer 工具栏中新增了**工作区选择器按钮**，支持添加和切换工作区，极大提升了多项目管理的便利性（#7390）。
- 其他常规修复和改进。

#### 🌙 [v0.21.0-nightly.20260725.1183a4c82](https://github.com/QwenLM/qwen-code/releases/tag/v0.21.0-nightly.20260725.1183a4c82)
夜间构建版本，包含以下修复：
- **CLI**: 修复了 Insight 报告中日期和时间显示不一致的问题，现在统一使用本地时间（#7670）。
- **自动修复**: 对扩展（Extension）功能进行了重构（#7670）。

#### 🧪 [SWE-bench 测试预发布版本]
为了测试 PR #7656，社区在昨日进行了**四次**独立的 SWE-bench Verified 全量测试 (POC)，并由 DSW 自托管 Runner 生成了详细结果。其中一次结果显示：在 500 个问题中，成功解决了 **332** 个，另有 107 个未解决，56 个执行错误。这证明了项目在真实代码修复任务上的强大能力。
- [dsw-swe-full-poc-20260724-fadeed2](https://github.com/QwenLM/qwen-code/releases/tag/dsw-swe-full-poc-20260724-fadeed2)
- [dsw-swe-full-async-poc-20260724-2c5ad4a5d0-r3](https://github.com/QwenLM/qwen-code/releases/tag/dsw-swe-full-async-poc-20260724-2c5ad4a5d0-r3)

---

### 🔥 社区热点 Issues

1.  [#5800 ✨ bug(cli): 终端输出过长时最后一行被覆盖](https://github.com/QwenLM/qwen-code/issues/5800)
    - **为什么重要**: 一个存在了一个月之久的**中优先级Bug**，影响终端对话体验。当回复过长时，最后一行会丢失。
    - **社区反应**: 已有 8 条评论，社区在积极讨论和期待修复方案。

2.  [#7684 ✨ bug(cui): MacOS 下 Command 模式输入法框位置错误](https://github.com/QwenLM/qwen-code/issues/7684)
    - **为什么重要**: 直接影响到 Mac 用户的日常使用体验。当 statusline 显示多行时，输入法候选框会远离光标，干扰输入流程。
    - **社区反应**: 开发者 inshink 提交了详细的截图和复现方式，社区反应迅速，已有 5 条评论。

3.  [#7699 ✨ bug(cli): 数学公式渲染识别不一致](https://github.com/QwenLM/qwen-code/issues/7699)
    - **为什么重要**: 影响着 Markdown 中行内数学公式的正确渲染、复制和表格显示。会遗漏 `$x$` 这种简单的表达式。
    - **社区反应**: 刚提交不久，已有 3 条评论，说明该问题触及了很多用户的痛点。

4.  [#7264 ✨ enh(core): 冷启动性能优化](https://github.com/QwenLM/qwen-code/issues/7264)
    - **为什么重要**: 一个关键技术债务 Issue，旨在通过懒加载减少 ACP 子进程的启动时间（高达 17.24 MiB/2420 个模块）。长期改善所有用户的冷启动体验。
    - **社区反应**: 已有 5 条评论，社区对该方向的技术方案进行了深入探讨。

5.  [#7631 ✨ bug(core): xterm.js 解析错误频繁出现](https://github.com/QwenLM/qwen-code/issues/7631)
    - **为什么重要**: 微信用户群中报告了大量终端解析错误，可能影响 Shell 交互的稳定性。
    - **社区反应**: 尽管 Issue 较新，但用户 Varorbc 报告称错误“很多”，可能是一个普遍问题，引起了社区的关注。

6.  [#7671 ✨ bug(core): 计划模式退出时通知缺失及模糊错误提示](https://github.com/QwenLM/qwen-code/issues/7671)
    - **为什么重要**: 当用户手动退出“计划模式”时，模型未被通知，且返回的“拒绝”错误信息对AI决策无帮助，是个交互流程缺陷。
    - **社区反应**: 该 Issue 已被关闭，相关修复（#7682）也已合并，体现了社区高效的修复速度。

7.  [#7626 ✨ bug(core): 后台运行Shell因输出为空被错误重启](https://github.com/QwenLM/qwen-code/issues/7626)
    - **为什么重要**: 一个棘手的Bug。当运行长时间的后台任务（如模型训练）时，如果输出被缓存导致文件为空，Qwen Code 会误认为任务已完成，从而重新启动它。
    - **社区反应**: 开发者详细描述了复现场景，引起了社区的重视。

8.  [#7697 ✨ bug(integration): VS Code 扩展无法连接 Unity MCP](https://github.com/QwenLM/qwen-code/issues/7697)
    - **为什么重要**: 指出了在 VS Code 集成场景下，MCP (模型上下文协议) 连接的兼容性问题，影响了游戏开发者使用 Qwen Code 进行 Unity 开发的体验。
    - **社区反应**: 用户报告其他工具如 Claude Code 可以正常连接，凸显了问题的特殊性。

9.  [#7618 ✨ enh(core): 讨论 Cua Driver 作为直接上游依赖](https://github.com/QwenLM/qwen-code/issues/7618)
    - **为什么重要**: 来自 Cua 团队的 Francesco 主动发起讨论，希望 Qwen Code 能够直接依赖其计算机操作驱动，而不是目前的内嵌方式。这关乎到项目未来的架构和生态合作。
    - **社区反应**: 这是一个有价值的开放性讨论，有助于推动专业化的集成。

10. [#7659 ✨ bug(core): 思考模式下 `tool_choice: "required"` 被拒绝](https://github.com/QwenLM/qwen-code/issues/7659)
    - **为什么重要**: 当模型启用“思考模式”时，API 会拒绝强制调用工具 (`tool_choice: "required"`) 的请求，导致内存召回等功能失效。这是一个与后端模型的兼容性问题。
    - **社区反应**: 开发者指出了深层原因，需要手动配置 `thinkingMandatory` 选项，尚未有一步到位的修复方案。

---

### ⚙️ 重要 PR 进展

1.  [#7701 🛠️ fix(cli): 统一行内数学公式识别](https://github.com/QwenLM/qwen-code/pull/7701)
    - **功能/修复**: 修复了 Markdown 行内数学公式在渲染、复制、表格等场景下识别不一致的问题，解决了 #7699。
    - **为何重要**: 致力于为数学用户提供稳定、一致的编辑体验。

2.  [#7686 🛠️ perf(core): 延迟加载首次使用依赖](https://github.com/QwenLM/qwen-code/pull/7686)
    - **功能/修复**: 性能优化，将一些非核心但占用启动资源的依赖改为懒加载，旨在显著**降低冷启动时间**。
    - **为何重要**: 直接回应了 #7264 提出的性能痛点，是所有用户都能感受到的改进。

3.  [#7691 🛠️ feat(review): 为 Review 功能添加提交约束](https://github.com/QwenLM/qwen-code/pull/7691)
    - **功能/修复**: 修复了 `/review` 功能可以绕过 `qwen review submit` 命令直接向 PR 写入的缺陷，增加了安全“绊线”。
    - **为何重要**: 这是对代码审查功能安全性的重要增强，防止了误操作和数据泄露。

4.  [#7680 🛠️ perf(web-shell): 优化 Git 分支显示性能](https://github.com/QwenLM/qwen-code/pull/7680)
    - **功能/修复**: 性能优化，使 Web Shell 中的 Git 芯片（分支名）在打开新会话时**几乎能立即显示**，并通过后台缓存和推送机制保持更新。
    - **为何重要**: 显著提升了 Web Shell 的反应速度和用户体验。

5.  [#7677 🛠️ feat(stats): 展示生成速度指标](https://github.com/QwenLM/qwen-code/pull/7677)
    - **功能/修复**: 新功能！在 `/stats` 命令中显示**TPS （每秒Token数）** 和 **TTFT（首Token延迟）** 等关键生成性能指标。
    - **为何重要**: 这是社区 #4252 Feature Request 的实现，让用户能够直观地评价和优化模型性能。

6.  [#7683 🛠️ feat(web-shell): 新增 GitHub PR 只读面板](https://github.com/QwenLM/qwen-code/pull/7683)
    - **功能/修复**: 新功能！为 Web Shell 的 Git 对话框增加了“Pull requests”标签页，支持查看 PR 列表、标题、状态、CI 结果和发布时间，并支持 `/prs` 命令。
    - **为何重要**: 加强了 Web Shell 与 GitHub 的集成深度，极大地方便了代码审查流程。

7.  [#7681 🛠️ fix(cli): 清除自动恢复时的陈旧重试错误](https://github.com/QwenLM/qwen-code/pull/7681)
    - **功能/修复**: 修复了当 Agent 自动从 API 临时错误中恢复后，旧的重试提示（“Press Ctrl+Y to retry”）仍留在屏幕上的问题。
    - **为何重要**: 这是一个细节优化，清除了残留的错误信息，让交互界面更加清爽。

8.  [#7682 🛠️ fix(core): 手动退出计划模式时通知模型](https://github.com/QwenLM/qwen-code/pull/7682)
    - **功能/修复**: 解决了 #7671 中的问题，当用户手动退出计划模式时，会向模型发送一次性的通知，帮助模型了解当前的状态变化。
    - **为何重要**: 对 Agent 交互上下文感知能力的重要补充。

9.  [#7637 🛠️ feat(serve): 暴露工作区渠道管理 API](https://github.com/QwenLM/qwen-code/pull/7637)
    - **功能/修复**: 新功能！为 `qwen serve` 模式增加了 Channel 管理 API，支持工作区级别的类型发现、CRUD 操作和生命周期管理。
    - **为何重要**: 这是构建多租户、多工作区服务化部署的核心基础设施。

10. [#7666 🛠️ feat(core): 支持配置流式限流重试延迟](https://github.com/QwenLM/qwen-code/pull/7666)
    - **功能/修复**: 新功能！允许用户通过配置 `retryInitialDelayMs` 和 `retryMaxDelayMs` 来覆盖 SSE 流式限流的硬编码重试延迟（60s/120s/240s）。
    - **为何重要**: 回应了 #7658 中的需求，给予用户更多灵活性来适配不同的 API 限流策略。

---

### 🔮 功能需求趋势

从过去24小时的 Issues 中，可以清晰地看到社区需求的几个主要方向：

1.  **Agent 工具及智能增强**：核心围绕**子Agent**（Subagent）的功能扩展，出现了多个 Feature Request：
    -   **子Agent模型选择**（#7685）：要求在 spawn 子Agent时，能指定其使用的模型等级（small/medium/high）。
    -   **Service Agent 引擎**（#7696）：提议一个 Agent 无关的运行时框架，用于创建和管理后台自动化 Agent，实现长期运行的监控任务。
    -   **分支配置（Fork Profile）**（#7625）：希望为分支定义一个预设的工具权限和提示词，用于缓存共享和特定任务（如自省）。

2.  **终端渲染、UI 和交互体验**：始终是社区关注的热点，主要是**Bug修复和体验优化**：
    -   **渲染正确性**：如数学公式识别不一致（#7699）、WSL下字符重复渲染（#7634）、终端输出过长被覆盖（#5800）。
    -   **国际化与兼容性**：Mac下的输入法位置（#7684）、中文字符与渲染的交互问题。
    -   **Web Shell 集成**：新增的PR面板和Git功能优化表明，社区期望 Web Shell 能承载更多功能。

3.  **扩展生态与集成**：开发者对**扩展**和**外部服务集成**的需求持续旺盛：
    -   **MCP连接优化**：修复VS Code扩展无法连接特定MCP服务器的问题（#7697）。
    -   **扩展安装**：修复了同一仓库下多个扩展（如`dotnet`和`dotnet-test`）ID冲突的问题（#7568）。
    -   **新集成**：如钉钉（DingTalk）渠道支持发送图片（#7687）、GitHub频道适配器（#7632）。

---

### 💡 开发者关注点

1.  **渲染和UI问题依然是最大痛点**：多个高讨论度的 Issue 都指向了终端和UI的渲染问题，特别是**非英文字符**（中文、数学符号）的显示和输入。这表明在复杂的 TUI 模式中，处理好不同内容的呈现仍然是提升用户体验的关键。
2.  **对“开发者工具”属性的高期待**：开发者不仅希望 Qwen Code 是一个AI助手，更希望它本身就是一个**优秀的开发工具**。例如，要求显示生成性能指标（#7677）、优化冷启动速度（#7686）、改进Git集成（#7680），这些都体现了开发者对工具本身品质的苛刻要求。
3.  **Agent 行为的“可控性”和“可预测性”**：从**子Agent选择模型**（#7685）、**计划模式退出通知模型**（#7682）、**后台任务重启用逻辑**（#7626）等讨论可以看出，开发者希望 Agent 的行为更加透明、可控，并能根据用户的明确意图或上下文状态做出正确反应，而不是“黑盒”操作。
4.  **扩展系统稳定性**：扩展ID冲突（#7568）和热加载问题（#7268）的提出，表明随着扩展数量的增加，其稳定性和正确性成为了影响开发者使用的关键因素。社区需要一个更健壮、更可靠且更易调试的扩展系统。

---
以上就是今天的全部动态。社区正在向着更强大、更稳定、更好用的方向大步前进。我们明天再见！

</details>

---
*本日报由 [agents-radar](https://github.com/huang-yi-dae/agents-radar) 自动生成。*