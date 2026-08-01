# AI CLI 工具社区动态日报 2026-08-01

> 生成时间: 2026-08-01 03:22 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告（2026-08-01）

> 基于 7 款主流 AI CLI 工具：Claude Code、OpenAI Codex、Gemini CLI、GitHub Copilot CLI、Kimi Code CLI、OpenCode、Qwen Code 的 GitHub 社区公开数据。

---

## 1. 生态全景

当前 AI CLI 工具已**全面进入生产环境使用阶段**，但成熟度分化显著：头部工具（Claude Code、Codex、Copilot）社区规模大、问题暴露充分，集中在**数据安全、计费透明、跨平台稳定性**三大方向；第二梯队（Gemini CLI、Qwen Code、OpenCode）保持快速迭代，在 Agent 可靠性与多模型兼容性上发力；早期工具（Kimi CLI）仍在完成基础能力定义。整体来看，**「Agent 自主能力提升」与「安全可控」之间的矛盾已成为全行业最核心的挑战**——多起数据丢失、凭证泄露、删除保护被绕过事件，正在成为企业采用的关键阻碍。同时，会话记忆、上下文管理、成本透明化等「精细化运营」需求明显升温。

---

## 2. 各工具活跃度对比

| 工具 | 热点 Issues | 活跃 PR | 版本发布 | 社区热度信号 |
|------|:---:|:---:|:---:|------|
| **Claude Code** | 10 | 6 | 无 | #79337 计费误报（51 评论）；#28791 历史同步（111 👍） |
| **OpenAI Codex** | 10 | 10 | 3 个 alpha | #28969 自动解析（186 👍）；#35058 Diff 崩溃（109 👍） |
| **Gemini CLI** | 10 | 10 | 3 个（含 stable patch） | #22323 子代理误报（12 评论） |
| **GitHub Copilot CLI** | 10 | 2 | v1.0.78-0 | #4305 类型转换错误（4 👍）；#4188 plan-mode 回归 |
| **Kimi Code CLI** | 4 | 1 | 无 | #1282 远程控制（23 👍） |
| **OpenCode** | 10 | 10 | 无 | #16331 权限失效（41 评论）；#7769 子模块（13 👍） |
| **Qwen Code** | 10 | 10 | v0.21.2 | #6378 多工作区 daemon（31 评论） |

> 注：Issues 数为各日报中列出的活跃/热点条目数，非当日全量。

**关键观察**：Codex 与 Gemini CLI 保持「日更级」发布节奏，迭代最快；Claude Code 与 Kimi 当日无新版本，但其社区讨论热度依然最高。

---

## 3. 共同关注的功能方向

### 3.1 数据安全与权限治理（6/7 个工具涉及）

| 工具 | 具体诉求 |
|------|---------|
| Claude Code | 跨会话凭证泄露（#72274）、IDE 选区泄露密钥（#71566）、`rm -rf` 防护被绕过（#82165） |
| OpenCode | 权限配置被完全忽略，`deny` 规则不生效（#16331，41 评论） |
| Gemini CLI | Auto Memory 缺少确定性脱敏（#26525）；OS 零依赖沙箱提案（#19873） |
| Codex | MCP 严格自动审查（#36365）；沙箱 V8 启用（#36374） |
| Qwen Code | `@-file` 读取缺少 `O_NOFOLLOW` 安全防护（#8227） |

**共性结论**：权限系统「配置了 ≠ 生效了」，安全隔离「声称有 ≠ 真隔离」，已成为全行业最迫切的信任危机。

### 3.2 会话与上下文状态管理（5/7 个工具涉及）

- **Claude Code**：CLI 与桌面端对话历史无法同步（#28791，111 👍）；transcript 30 天自动删除导致项目历史永久丢失（#83019）
- **Gemini CLI**：Auto Memory 对低信号会话无限重试（#26522）
- **Kimi CLI**：跨会话持久化记忆系统（#1283）
- **Codex**：大型 base64 图像在上下文中被重复发送（#28316）
- **Qwen Code**：会话分支、工具发现破坏 prompt 缓存前缀（#6721）

### 3.3 成本与配额透明化（4/7 个工具涉及）

- **Claude Code**：#79337 Fable 5 在 Max 计划下被静默降级至 Opus 4.8，误报「需要 usage credits」（51 评论），且 CLI 与 VS Code 均受影响
- **Codex**：至少 6 条配额显示与实际不一致的报告（#36353、#36369 等），「显示 58% 却被拦截」
- **OpenCode**：系统提醒位置漂移导致缓存无法命中（#23595）；拆分 system prefix 以提升 Anthropic 缓存命中率（#27378）
- **Qwen Code**：`tool_search` 动态发现工具导致 `setTools()` 缓存失效（#6721）

### 3.4 Windows / WSL 平台成熟度（5/7 个工具涉及）

- **Claude Code**：Windows 桌面端 GPU 进程崩溃集中爆发（#81275 等 4 个同族问题）
- **Codex**：WSL 仓库误判为非 Git（#35119）、WSL 中 `gh` 命令失败（#32323）、OneDrive 工作区断流（#35420）、沙箱无法启动 MSIX PowerShell（#35871）
- **Qwen Code**：Windows + CherryStudio 下 React UI 崩溃（#5199）
- **OpenCode**：Windows 11 突然无法启动（#28480）
- **Copilot CLI**：Windows ReFS/Dev Drive 沙箱限制文档请求（#3712）

### 3.5 Agent 行为可预期性与工具调用稳定性（5/7 个工具涉及）

- **Gemini CLI**：子代理在 MAX_TURNS 后被误报为 GOAL 成功（#22323）；通用代理无限期挂起（#21409）
- **Claude Code**：后台 Agent 进入空闲却不交付最终报告（#74113）；「安全分类器反向阻止 kill 尝试」（#82165）
- **Qwen Code**：长会话中模型把工具调用写成 XML 纯文本（#8003）；子代理提问后用户无法回答（#7835）
- **Kimi CLI**：工具调用参数双重 JSON 编码导致 Pydantic 验证失败（#2572）
- **OpenCode**：Qwen/LM Studio 下 `write` / `edit` 工具参数不符合 JSON Schema（#18131、#29142）

---

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线 |
|------|---------|---------|---------|
| **Claude Code** | 最强模型驱动 + 全端覆盖（CLI/桌面/VS Code/Web） | 追求模型能力上限的开发者，Anthropic 生态用户 | 闭源商业；TypeScript；模型能力即护城河 |
| **OpenAI Codex** | 实时协作、沙箱安全、插件/远程搜索 | 深度使用 OpenAI 模型的开发者；Rust 技术栈爱好者 | 闭源 + Rust crate alpha；底层架构重构优先（沙箱 V8、线程单写者） |
| **Gemini CLI** | 子代理（sub-agent）架构、Browser Agent、Auto Memory | Google 生态开发者；看重 Agent 自主性的用户 | 开源；TypeScript；多智能体编排为特色 |
| **GitHub Copilot CLI** | GitHub 工作流一体化、ACP 协议、企业管控 | 重度 GitHub 用户、企业团队 | 闭源；Rust；与 GitHub Codespaces/Agents 深度集成 |
| **Kimi Code CLI** | 多端接力（远程控制）、记忆系统（提案中） | Moonshot AI 生态用户、轻度 CLI 用户 | 早期开源；Python；功能定义期 |
| **OpenCode** | 多模型路由（Anthropic/OpenAI 兼容/Qwen/LM Studio）、TUI 插件系统 | 开源社群、多模型灵活切换的开发者 | 开源；TypeScript；LLM-agnostic 是核心卖点 |
| **Qwen Code** | daemon 多工作区架构、Web Shell、动态工作流 | 阿里云/Qwen 生态用户；需要长驻服务的企业 | 开源；TypeScript；daemon 资源治理领先于同行 |

---

## 5. 社区热度与成熟度

### 第一梯队：成熟社区，用户基数大，问题暴露充分
- **Claude Code**：单 Issue 最高 51 条评论、111 👍，社区规模最大。但**安全性问题最为严重**：数据丢失、凭证泄露等已成为企业采用的核心障碍。当日无新版本，官方响应速度存疑。
- **GitHub Copilot CLI**：用户以企业开发者为主，对回归极其敏感（plan-mode 误拦截、大会话恢复 OOM 均被快速锁定为回归版本）。ACP 协议扩展需求（#2109，6 👍）显示开发者社区正在围绕协议层进行二次开发。

### 第二梯队：快速迭代期，日更级发布
- **OpenAI Codex**：单日发布 3 个 Rust alpha，10 个活跃 PR，是当前**迭代速度最快**的工具。186 👍 的 #28969 表明社区基数大且参与度高，但 3 个 alpha 版本意味着仍处于架构重构的不稳定期。
- **Gemini CLI**：同样日更 3 版本，p1 bug 密度高（子代理误报、通用代理挂起），但修复速度快（如容量耗尽问题当日通过 nightly + patch 双通道修复）。stable patch 出现合并冲突，说明自动化流程仍有改进空间。

### 第三梯队：开源治理活跃，稳步成长
- **OpenCode**：批量关闭历史过期 Issue 显示维护者活跃；PR 主线清晰（TUI 插件、缓存优化、长命令后台化），社区讨论质量高，权限问题 #16331 获得 41 条评论，反映了用户已进入「生产级信任」评估阶段。
- **Qwen Code**：daemon 架构的多工作区讨论（#6378，31 评论）已从功能构想深入到资源治理层面（#8051、#8182），社区技术深度较高；Anthropic 转换器批量修复显示多模型兼容层是当前重点。

### 早期萌芽期
- **Kimi CLI**：仅 4 个活跃 Issue、1 个 PR，记忆功能提案 0 👍，社区热度明显低于其他工具。远程控制（#1282，23 👍）是当前唯一有广泛共鸣的方向。

---

## 6. 值得关注的趋势信号

### 6.1 安全与信任已成为企业采用的「准入门槛」
Claude Code 出现跨会话凭证泄露（#72274）、IDE 选区实时密钥发送（#71566）、`rm -rf / *` 删除保护可被绕过且终止操作被拦截（#82165）；OpenCode 的权限 `deny` 规则形同虚设（#16331）。**这不是单个工具的缺陷，而是 Agent 化工具在安全架构上的系统性能缺口。** 技术决策者在评估 AI CLI 时，应将「安全隔离能力」置于「模型智能水平」之前。

### 6.2 静默降级比直接报错更损伤信任
Claude Code #79337 中，Fable 5 被误报「需要 usage credits」后**静默降级**至 Opus 4.8——用户可能在不知情的情况下使用了弱模型。Codex 的多个配额报告（#36369）显示「显示 58% 却被拦截」的「显示与实际不一致」。**成本可见性与配额准确性，正在成为用户对 Agent 工具的第二大信任支柱。**

### 6.3 「状态管理」将定义下一代 AI CLI 的竞争格局
Claude Code 的对话历史同步（111 👍）、Gemini 的 Auto Memory、Kimi 的记忆系统提案、Qwen 的会话分支——**从「无状态对话工具」走向「有状态协作伙伴」是共识方向**。当前最大的痛点是：会话数据存哪里、何时删、如何跨端同步，均缺乏用户可控的机制（Claude Code #83019 中 transcript 30 天自动删除且不被备份覆盖即为典型）。

### 6.4 Windows/WSL 是未征服的「最后一公里」
几乎所有工具都在 Windows 平台出现高频崩溃（GPU 进程、React UI）、WSL 兼容问题（仓库误判、`gh` 命令失败）、以及云同步目录（OneDrive）连通性问题。**Windows 开发者市场巨大，但当前 Arena 中没有任何一个工具能提供稳定的 Windows 体验**——这既是风险也是差异化机会。

### 6.5 多模型接入已进入「协议摩擦期」
Kimi 的双重 JSON 编码（#2572）、OpenCode 的 schema 错误（#29142）、Qwen 的 XML 文本输出（#8003）、Gemini 的 thoughtSignature 丢失（#28607）——随着每个工具都在接入多家模型，**「工具调用格式标准化」成为底层基础设施级别的必答题**。谁能先把兼容层做到「防御式转换」，谁就能在多模型生态中占据主动。

### 6.6 Agent 自主性需要更可靠的「安全护栏」
Gemini 子代理误报成功（#22323）、Claude Code 后台 Agent 空闲不交付（#74113）、安全分类器反向阻止 kill（#82165）——**当 Agent 越来越强，人类对其行为边界的失控感也在上升。** 可预期的 Agent 行为、可干预的中断机制、不可被 Agent 自身绕过的安全护栏，将是下一阶段的关键投入方向，也是开发者决定是否为生产环境采用的决定性因素。

---

**给技术决策者的参考结论**：
- 若追求最强模型能力且能容忍一定安全风险，Claude Code 仍是首选，但需建立严格的沙箱隔离与审计机制；
- 若重视多模型灵活性和成本控制，OpenCode 与 Qwen Code 值得重点评估；
- 若企业已在 GitHub 生态内，Copilot CLI 的企业管控需求支持力度值得关注；
- 生产环境落地前，建议先测试「长会话恢复、Windows 兼容性、数据删除保护」三类场景——这是全行业当前普遍最薄弱的环节。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# 社区热点报告：Claude Code Skills 生态关注度分析

> 数据截止 2026-08-01 | 数据源: github.com/anthropics/skills

---

## 1. 热门 Skills 排行

按当前 PR 讨论活跃度 / 关注度排序，以下 8 个 Skills 处于 Open 状态。

### 1.1 skill-creator: run_eval.py 0% recall 系统性修复（PR #1298）
- **状态**：Open | **创建**：2026-06-10 | **更新**：2026-06-23
- **功能**：修复 `run_eval.py` 对所有描述均报告 `recall=0%` 的致命缺陷——安装 eval 产物为真实 skill，修复 Windows 流读取、触发检测及并行 workers。该问题导致描述优化循环在噪声下运行。
- **讨论热点**：直接关联 issue #556（12 条评论、7 👍）；社区已有 10+ 独立复现，讨论聚焦 skill-creator 工具链的可靠性、跨平台兼容性（Windows）与并行任务隔离。
- **链接**：https://github.com/anthropics/skills/pull/1298

### 1.2 Add document-typography skill（PR #514）
- **状态**：Open | **创建**：2026-03-04 | **更新**：2026-03-13
- **功能**：为 AI 生成文档提供排版质量控制——孤字换行（1-6 词溢出到下一行）、孤行段落（标题滞留页底）、编号错位。
- **讨论热点**：AI 生成文档普遍存在的排版细节缺失；用户很少主动要求排版质量，需要 skill 内建把关。是文档生成质量方向的高频需求。
- **链接**：https://github.com/anthropics/skills/pull/514

### 1.3 fix(pdf): 大小写敏感的 SKILL.md 文件引用修复（PR #538）
- **状态**：Open | **创建**：2026-03-06 | **更新**：2026-04-29
- **功能**：修复 `skills/pdf/SKILL.md` 中 8 处大小写不匹配（`REFERENCE.md` → `reference.md`，`FORMS.md` → `forms.md`）。
- **讨论热点**：大小写敏感文件系统（Linux/macOS/CI）下技能直接失效；社区关注官方 skill 资产的跨平台兼容性。
- **链接**：https://github.com/anthropics/skills/pull/538

### 1.4 Add ODT skill（PR #486）
- **状态**：Open | **创建**：2026-03-01 | **更新**：2026-04-14
- **功能**：OpenDocument 格式（.odt/.ods）的创建、填充、读取与 ODT→HTML 转换；覆盖 LibreOffice、ISO 标准格式场景。
- **讨论热点**：开源/ISO 标准格式处理需求旺盛；与已有 docx/pdf 技能形成办公文档矩阵。
- **链接**：https://github.com/anthropics/skills/pull/486

### 1.5 Improve frontend-design skill clarity and actionability（PR #210）
- **状态**：Open | **创建**：2026-01-05 | **更新**：2026-03-07
- **功能**：重写前端设计技能，确保每条指令可在单个对话中执行，提升可操作性、清晰度与内部一致性。
- **讨论热点**：反应了一个普遍痛点——技能指令必须具体到能驱动行为，而不是面向人类的概念文档（与 issue #202 呼应）。
- **链接**：https://github.com/anthropics/skills/pull/210

### 1.6 feat: add testing-patterns skill（PR #723）
- **状态**：Open | **创建**：2026-03-22 | **更新**：2026-04-21
- **功能**：全栈测试模式覆盖——测试哲学（Testing Trophy）、单元测试 AAA 模式、React 组件测试、命名规范、边界用例、不要测什么。
- **讨论热点**：社区对"系统性测试指导"的高期待，涵盖框架与反模式，是测试工程类技能的代表提案。
- **链接**：https://github.com/anthropics/skills/pull/723

### 1.7 Add pyxel skill for retro game development（PR #525）
- **状态**：Open | **创建**：2026-03-05 | **更新**：2026-07-15
- **功能**：基于 pyxel-mcp 的复古像素风格游戏开发技能，覆盖"编写 → 运行采集 → 检查 → 迭代"工作流。
- **讨论热点**：跨 4 个月的长期活跃讨论；展示了"AI 创意编程"话题，并与 MCP 深度集成。
- **链接**：https://github.com/anthropics/skills/pull/525

### 1.8 Add color-expert skill（PR #1302）
- **状态**：Open | **创建**：2026-06-10 | **更新**：2026-07-21
- **功能**：自包含的颜色专业知识技能，覆盖颜色命名系统（ISCC-NBS、Munsell、XKCD、RAL 等）、色彩空间"何时用哪个"决策表（OKLCH/OKLAB/CAM16...）。
- **讨论热点**：强调"严谨色彩科学"在 AI 输出中的应用，讨论跨越 6 月到 7 月持续活跃。
- **链接**：https://github.com/anthropics/skills/pull/1302

---

## 2. 社区需求趋势（Issues 洞察）

### 2.1 安全与信任边界（最集中诉求）
Issue **#492**（43 条评论）：社区贡献技能被放置于 `anthropic/` 命名空间，冒充官方能力，形成信任边界漏洞。这是当前整个仓库中讨论量最高的议题。
- https://github.com/anthropics/skills/issues/492

相关问题：
- **#1175**（4 条）：SharePoint Online 文档处理的安全与上下文窗口担忧 → https://github.com/anthropics/skills/issues/1175
- **#1487**（4 条）：`claude-api` skill 单次调用注入 ~156k tokens 耗尽上下文 → https://github.com/anthropics/skills/issues/1487

### 2.2 工具链可靠性与跨平台
- **#556**（12 条评论、7 👍）：`run_eval.py` 0% 触发率——skill 描述优化循环的核心故障 → https://github.com/anthropics/skills/issues/556
- **#1061**（3 条）：Windows 原生 Python 兼容性三连问题（PATHEXT、cp1252、select） → https://github.com/anthropics/skills/issues/1061
- **#62**（10 条）：技能意外消失且报错 → https://github.com/anthropics/skills/issues/62
- **#1169**（3 条）：description 优化循环恒为 recall=0% → https://github.com/anthropics/skills/issues/1169

### 2.3 组织级共享与协作（高赞诉求）
- **#228**（16 条评论、8 👍）：组织级技能共享——无需手动传输 .skill 文件，需要共享库/直链 → https://github.com/anthropics/skills/issues/228
- **#189**（6 条、9 👍）：`document-skills` 与 `example-skills` 插件重复安装相同内容 → https://github.com/anthropics/skills/issues/189

### 2.4 新技能方向提案
| Issue | 方向 | 评论 |
|---|---|---|
| **#1329** compact-memory | 符号化紧凑 agent 状态表示 | 9 |
| **#412** agent-governance | AI agent 系统安全治理模式 | 6 |
| **#1385** Reasoning Quality Gate Pipeline | 三道推理质量门 — 任务前校准 → 对抗审查 → 交付验证 | 3 |

### 2.5 平台整合呼声
- **#29**：AWS Bedrock 可用性 → https://github.com/anthropics/skills/issues/29
- **#16**：将 Skills 暴露为 MCP（统一软件 API 信号） → https://github.com/anthropics/skills/issues/16

---

## 3. 高潜力待合并 Skills（Open 但有望近期落地）

### 3.1 plan-file-hygiene（PR #1479）★ 最新且高协作
- 创建 2026-07-25，更新 07-27；回应 issue #1417，明确基于社区贡献者命名的生命周期框架。
- **功能**：解决规划产物无限累积、无生命周期管理的问题。
- **链接**：https://github.com/anthropics/skills/pull/1479

### 3.2 self-audit 技能 v1.3.0（PR #1367）
- 6 月末创建，7 月初更新至 v1.3.0。先机械校验产出文件，再按损害等级进行推理质量审计。
- **链接**：https://github.com/anthropics/skills/pull/1367

### 3.3 color-expert（PR #1302）
- 讨论跨 6/10 → 7/21 持续活跃，作者为经验丰富的开源维护者，内容自成体系。
- **链接**：https://github.com/anthropics/skills/pull/1302

### 3.4 pyxel 复古游戏开发（PR #525）
- 3 月 → 7 月持续跨 4 个月讨论，pyxel-mcp 生态成熟，属于有真实用户基数的垂直创意技能。
- **链接**：https://github.com/anthropics/skills/pull/525

### 3.5 testing-patterns（PR #723）
- 3 月 → 4 月完整更新，模块化覆盖全栈测试，合入价值高。
- **链接**：https://github.com/anthropics/skills/pull/723

### 3.6 ODT skill（PR #486）
- 3 月 → 4 月活跃，与 LibreOffice 生态强关联，填补 ISO 标准文档格式空白。
- **链接**：https://github.com/anthropics/skills/pull/486

---

## 4. Skills 生态洞察

> **当前社区最集中、最高声量的诉求是：根治 skill-creator 工具链的可靠性缺陷（run_eval.py 0% recall 系统性故障 + Windows 跨平台兼容），并同时解决以 `anthropic/` 命名空间分发社区技能所引发的信任边界风险。** 在此基础上，组织级技能共享、办公文档质量与格式覆盖（typography/ODT/pdf）、测试模式体系化、AI 安全治理（agent-governance/self-audit）组成了下一波新技能提案的主航线。

---

# Claude Code 社区动态日报 — 2026-08-01

## 今日速览

Fable 5 在 Max 计划下被误报“需要 usage credits”并静默降级至 Opus 4.8，成为今日最热 Issue（51 条评论），且同时影响 CLI 与 VS Code 扩展。安全方面，多起数据丢失与凭证泄露报告令人担忧。Windows 桌面端 GPU 进程崩溃问题继续密集出现。

## 版本发布

过去 24 小时无新版本发布。

---

## 社区热点 Issues

### 1. Fable 5 在 Max 计划上被错误阻止（🔥 51 评论）
**#79337** [BUG] Fable 5 prompts 'usage credits required' on Max plan
- 在 2026-07-20 Fable 5 成为 Max 计划标准模型当天，Claude Code 拒绝运行 Fable 5，**静默降级到 Opus 4.8** 并提示需要 usage credits。该问题持续近两周仍未修复。
- 社区反应：51 条评论，20 👍，是当前最受关注的问题。多条回复确认在 CLI、桌面端、VS Code 扩展均能复现。
- 链接：https://github.com/anthropics/claude-code/issues/79337

### 2. CLI 与桌面端对话历史无法同步（111 👍）
**#28791** [FEATURE] Sync conversation history between CLI and Claude Code desktop app
- 用户希望 CLI 与桌面应用之间共享对话历史。111 个 👍 表明这是社区最期待的功能之一，但自 2026-02 提出以来一直未实现。
- 链接：https://github.com/anthropics/claude-code/issues/28791

### 3. Claude Code Web 无法调用 gh CLI（28 评论）
**#11139** [BUG] Claude Code Web Cannot Use gh CLI Commands (Permission Denied)
- Web 版在运行 gh 命令时遭遇 Permission Denied，影响依赖 GitHub CLI 的自动化工作流。已存在近 9 个月仍有 28 条评论，说明问题长期未根治。
- 链接：https://github.com/anthropics/claude-code/issues/11139

### 4. VS Code 扩展同样误报 Fable 5 配额不足
**#79441** [BUG] VS Code extension blocks Fable 5 with "requires usage credits" while account has 20% weekly allowance remaining
- 账户明明还有 20% 周配额，VS Code 扩展仍阻止 Fable 5。与 #79337 同源，但发生在 IDE 扩展场景，说明计费检查逻辑存在系统性缺陷。
- 链接：https://github.com/anthropics/claude-code/issues/79441

### 5. 跨会话凭证泄露：另一用户的服务器密码出现在我的会话中
**#72274** [Bug] Cross-session credential leakage: production database modified on unauthorized host
- 用户报告其会话中出现了**另一用户的服务器凭证**，并发生了未授权数据库访问。这属于严重的安全隔离失效问题，影响面可能超出单个用户。
- 链接：https://github.com/anthropics/claude-code/issues/72274

### 6. 会话记录默认位置不受备份覆盖，且 30 天自动删除
**#83019** [BUG] Session transcripts default to a location outside typical backup coverage, then auto-delete after 30 days
- 会话记录存放在备份覆盖范围之外的位置，30 天后被自动删除，导致项目历史**永久丢失**。开发者可能毫不知情。该 Issue 昨天刚创建，已获得关注。
- 链接：https://github.com/anthropics/claude-code/issues/83019

### 7. Agent 构造出 `rm -rf /*` 并阻止了终止尝试
**#82165** Catastrophic data loss: agent-built command expanded to "rm -rf /*", ran detached; safety classifier then blocked the kill attempts
- **最严重的数据丢失报告**：Fable 5 生成的命令被展开为 `rm -rf /*`，在 WSL2 中独立执行，且后续终止操作被安全分类器拦截。若发生在非容器环境，后果不堪设想。
- 链接：https://github.com/anthropics/claude-code/issues/82165

### 8. 后台 Agent 频繁进入空闲却不交付最终报告
**#74113** [BUG] Background agents frequently go idle without delivering their final SendMessage report
- 后台 Agent 完成工作后不发送最终结果便进入空闲状态，需手动 re-ping 才能恢复。影响依赖后台任务异步交付的自动化工作流。
- 链接：https://github.com/anthropics/claude-code/issues/74113

### 9. IDE 选区泄露到模型上下文（含实时密钥）
**#71566** [bug] IDE selection from a closed, never-saved file leaks into model context (transmitted a secret)
- VS Code 扩展将**已关闭且未保存的编辑器选区**捕获并送入上下文，内容包含 Google OAuth 客户端密钥。凭证泄露风险极高，且触发条件隐蔽。
- 链接：https://github.com/anthropics/claude-code/issues/71566

### 10. Windows 桌面端 Browser 面板打开即崩溃
**#81275** [BUG] Claude Desktop MSIX 1.24012.9: opening the in-app Browser pane crashes the whole app
- 打开内置 Browser 面板即刻触发 Chromium GPU 进程崩溃（exit code 101457950），在 Intel、NVIDIA 及软件渲染下均复现。与 #81159、#77768、#82962 同族，Windows 桌面端稳定性问题集中爆发。
- 链接：https://github.com/anthropics/claude-code/issues/81275

---

## 重要 PR 进展

过去 24 小时共 6 个 PR，全部列出：

### 1. #81540 [已关闭] 修复 Usage 泄漏问题
Fix #80705: [BUG] I have a problem with my Usage leak
- 由 Atlas 2 自动化贡献，修复 usage 数据泄漏。悬赏 $200，已运行测试但最终被关闭。
- 链接：https://github.com/anthropics/claude-code/pull/81540

### 2. #82987 [开放] 修复 CI cron 失败 + TUI 延迟架构修复
fix(ci): fix cron failures, exclude PRs, and propose TUI latency fix
- 修复 GitHub Actions 定时任务失败，并提出高负载下 TUI 输入延迟的架构级修复方案。解决 #82984。
- 链接：https://github.com/anthropics/claude-code/pull/82987

### 3. #82794 [开放] code-review 插件实现置信度评分
feat(code-review): implement confidence scoring and --threshold flag
- 修复 README 与命令行为不符：实现文档中承诺的 0–100 置信度评分，替代现有二元验证，并新增 `--threshold` 参数。
- 链接：https://github.com/anthropics/claude-code/pull/82794

### 4. #39872 [开放] Node.js 版本从 20 升级到 24
Upgrade Node.js version from 20 to 24
- 为即将到来的 LTS 变更做准备。已开放 4 个月，仍在等待合并。
- 链接：https://github.com/anthropics/claude-code/pull/39872

### 5. #17776 [已关闭] security-guidance 插件补充 README
docs: add README.md for security-guidance plugin
- 为 plugins 目录中唯一缺文档的插件补全 README，涵盖全部 9 个安全模式。1 月提交，已关闭（可能被合并或 supersede）。
- 链接：https://github.com/anthropics/claude-code/pull/17776

### 6. #82981 [开放] 非相关 PR（疑似垃圾提交）
Claude/automatizar inventario insumos w4n98s
- 标题为西班牙语“自动管理库存”，与 Claude Code 仓库主旨无关，疑似滥发。
- 链接：https://github.com/anthropics/claude-code/pull/82981

---

## 功能需求趋势

从近期 Issues 可提炼出社区最关心的四个功能方向：

**1. CLI 与桌面端/Web 能力对齐**
- 典型需求：#28791 对话历史同步（111 👍）、#11139 Web 版 gh CLI 权限。
- 趋势解读：随着桌面应用功能权重提升，用户期望 CLI 的工作成果能在图形界面无缝接管。

**2. 上下文管理智能化**
- 典型需求：#80751 可插拔上下文管理器、#82056 暴露 auto-memory 索引实际加载状态。
- 趋势解读：大上下文不再是“越大越好”，用户需要**可见、可控、可检索**的上下文机制。

**3. 成本与 Token 效率精细化**
- 典型需求：#77134 审批时复用已生成文本、避免第二遍模型调用；#79337/#79441 配额计算正确性。
- 趋势解读：开发者对“每个 token 花在哪”越来越敏感，要求 harness 层有更透明的成本控制。

**4. Shell 工具语义正确性**
- 典型需求：#74746 Bash 工具应运行在 bash 而非用户登录 shell（zsh）下。
- 趋势解读：多 shell 环境下命令行为不一致成为日常摩擦点，工具行为需要可预期。

---

## 开发者关注点

**1. Fable 5 计费/配额混乱（高频）**
- 同一问题在 CLI（#79337）和 VS Code（#79441）分别上报，核心矛盾是**计费检查与实际账户权益不一致**。Max 用户被错误降级到 Opus 4.8，信任成本很高。

**2. Windows 桌面端稳定性堪忧**
- 至少 4 个独立 Issue（#81159、#81275、#77768、#82962）指向 GPU 进程崩溃，表现为：打开 Browser 面板即崩溃、断网研究中反复崩溃、无崩溃转储、只能重装恢复。此问题已持续数日未见官方回复。

**3. 数据丢失与删除保护机制失效**
- 多起报告（#82165、#80830、#81273、#75794）显示：`rm -rf` 删除保护可被绕过（如反引号替换、detached 执行）。特别是 #82165 中“安全分类器反向阻止 kill 尝试”的细节，说明自主 Agent 的**危险操作防护存在设计缺陷**。

**4. 凭证与私密数据意外泄露**
- #72274（跨会话凭证泄漏）与 #71566（已关闭文件的选择区被发送至模型）指向同一类问题：**会话上下文隔离不是绝对可靠**。对使用生产库密钥的团队，这可能是阻止采用的关键阻碍。

**5. 会话与历史数据持久性**
- #83019（transcript 30 天自动删除）和 #82056（auto-memory 加载不可见）共同反映：用户对自己的数据**何时被写、写在哪、何时被删**缺乏控制力与透明度。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-08-01

## 今日速览

Codex 今日连续发布 3 个 Rust alpha 版本（v0.147.0-alpha.1.1/alpha.3/alpha.4），开发节奏明显加快。社区方面，**60 秒自动解析设置请求**（#28969）以 186 👍 成为最受关注议题；Windows 平台问题持续高发，涉及沙箱、WSL、OneDrive 及 GPU 崩溃等多个方向。PR 侧则密集合并了实时委派控制、远程插件搜索、沙箱 V8 等多项功能。

---

## 版本发布

过去 24 小时发布 3 个版本，均为 Rust crate 的 alpha 迭代：

- **rust-v0.147.0-alpha.4**：0.147.0-alpha.4
- **rust-v0.147.0-alpha.3**：0.147.0-alpha.3
- **rust-v0.147.0-alpha.1.1**：0.147.0-alpha.1.1

> 官方暂未发布详细变更日志，但从 PR 合并节奏推断，该系列版本与实时委派、插件搜索、沙箱强化等近期合入的功能密切相关。

---

## 社区热点 Issues

### 1. 🔥 添加设置以禁用 60 秒自动解析问题
- **Issue**: [#28969](https://github.com/openai/codex/issues/28969)
- **标签**: `bug`, `CLI`, `config`, `plan`
- **作者**: antoyo | 创建: 06-18 | 更新: 07-31 | 评论: 64 | 👍: 186

社区呼声最高的一条 Issue。用户使用 Codex CLI 0.141.0 时，系统会在 60 秒后自动解析问题，用户希望增加开关来控制这一行为。186 个 👍 表明该问题在 CLI 工作流中影响面极广。

### 2. 🚨 Codex Diff 在 macOS 的 VS Code 中崩溃
- **Issue**: [#35058](https://github.com/openai/codex/issues/35058)
- **标签**: `bug`, `extension`
- **作者**: Furgon | 创建: 07-24 | 更新: 07-31 | 评论: 42 | 👍: 109

Codex 编辑文件后打开 "Codex Diff" 标签页即报 "Oops, an error has occurred"。在全新工作区中也能复现，影响所有 macOS Apple Silicon 用户。109 👍 说明这是 VS Code 扩展目前最严重的稳定性问题之一。

### 3. Windows 截图崩溃 GPU 进程
- **Issue**: [#34133](https://github.com/openai/codex/issues/34133)
- **标签**: `bug`, `windows-os`, `app`, `browser`
- **作者**: xiaosai72825 | 创建: 07-19 | 更新: 08-01 | 评论: 30

Windows 桌面应用使用内置浏览器截图时，Code Integrity 拒绝加载 `vk_swiftshader.dll`，导致 GPU 进程崩溃、应用卡死甚至无法重新打开。涉及系统级安全问题，需要微软签名或替代渲染方案。

### 4. OneDrive-backed 工作区流式连接反复断开
- **Issue**: [#35420](https://github.com/openai/codex/issues/35420)
- **标签**: `bug`, `windows-os`, `codex-web`, `connectivity`
- **作者**: hiroki-tamba-research | 创建: 07-26 | 更新: 08-01 | 评论: 20

当 Windows 工作区目录位于 OneDrive 且 OneDrive 处于降级状态时，ChatGPT Work/Codex 的请求反复出现 `stream disconnected` 错误。暴露了 Codex 与云同步目录的兼容性问题。

### 5. Windows WSL → Android 远程控制完全不可用
- **Issue**: [#31786](https://github.com/openai/codex/issues/31786)
- **标签**: `bug`, `windows-os`, `app`, `connectivity`, `remote`
- **作者**: kendonB | 创建: 07-09 | 更新: 08-01 | 评论: 17

配对流程能走通，但手机端始终停留在 "connecting" 状态。跨国远程开发场景（WSL 到 Android）的核心链路存在缺陷，至今 3 周仍未修复。

### 6. WSL 环境下 PR 集成报错
- **Issue**: [#32323](https://github.com/openai/codex/issues/32323)
- **标签**: `bug`, `code-review`, `windows-os`, `app`
- **作者**: sugymt | 创建: 07-11 | 更新: 08-01 | 评论: 12 | 👍: 14

Codex 桌面应用在 WSL 中执行 `gh` 命令时报 `Expected VAR_SIGN, actual: COLON`，导致 PR 代码评审功能无法使用。已持续 3 周，影响 Windows + WSL 开发者。

### 7. Windows/WSL 仓库被误判为非 Git
- **Issue**: [#35119](https://github.com/openai/codex/issues/35119)
- **标签**: `bug`, `windows-os`, `app`, `app-server`
- **作者**: Ted151951 | 创建: 07-24 | 更新: 08-01 | 评论: 11 | 👍: 11

升级到 app-server 0.146.0-alpha.3 后，有效的 WSL ext4 仓库被标记为 "非 Git 仓库"，并提示 "Git is unavailable"。回退到 0.145.0-alpha.30 可恢复。

### 8. 内置图像生成对大提示词超时
- **Issue**: [#29645](https://github.com/openai/codex/issues/29645)
- **标签**: `bug`, `tool-calls`, `app`, `connectivity`, `imagen`
- **作者**: dondong | 创建: 06-23 | 更新: 08-01 | 评论: 10

普通卡牌美术提示词会导致内置 image_gen 在约 240 秒后超时，而简单提示词能成功。可能与图像生成服务的上下文长度或算力分配有关。

### 9. 大型 base64 图像在后续上下文中被重复发送
- **Issue**: [#28316](https://github.com/openai/codex/issues/28316)
- **标签**: `bug`, `CLI`, `context`, `tool-calls`
- **作者**: wang1970 | 创建: 06-15 | 更新: 08-01 | 评论: 10

用户提交图像后，Codex 将完整 base64 负载持久化在会话/工具历史中，并在后续 `/v1/responses` 请求中重复发送。导致上下文膨胀、token 消耗激增，且可能存在隐私风险。

### 10. Windows 沙箱无法启动 MSIX 版 PowerShell
- **Issue**: [#35871](https://github.com/openai/codex/issues/35871)
- **标签**: `bug`, `windows-os`, `sandbox`, `exec`, `CLI`
- **作者**: dgx80 | 创建: 07-29 | 更新: 08-01 | 评论: 9

当解析到的 shell 是 Microsoft Store 版 PowerShell 7（MSIX 打包）时，沙箱以受限令牌启动进程失败，报 `CreateProcessAsUserW failed: 5 (Access is denied.)`。Windows 沙箱与 MSIX 应用存在系统级兼容限制。

---

## 重要 PR 进展

### 1. 添加实时委派确认控制
- **PR**: [#36413](https://github.com/openai/codex/pull/36413)
- **状态**: 已关闭

为 `thread/realtime/start` 增加可选的 `delegationAckFiller` 字段，显式控制是否将 `true`/`false` 传递给 V3 Frameless Bidi 会话。让客户端能精确控制实时会话中的委派行为。

### 2. 使用 Git 仓库作为预工具钩子测试标记
- **PR**: [#36411](https://github.com/openai/codex/pull/36411)
- **状态**: 已关闭

将预工具钩子测试的标记方式改为 `git init` 创建仓库，并在临时目录中保留 `.git` 目录进行断言。提升了测试的真实性和隔离性。

### 3. 提取应用缓存逻辑到 ConnectorRuntimeManager
- **PR**: [#31471](https://github.com/openai/codex/pull/31471)
- **状态**: 开放中

将 Codex Apps 的工具缓存抽象为 `ConnectorRuntimeManager` + `ConnectorRuntimeContext`，以不可变快照管理工具列表与刷新时间，并按账号/工作区隔离上下文。为 faster-connectors 系列重构的第一步。

### 4. 使用户输入阻塞行为显式化
- **PR**: [#36410](https://github.com/openai/codex/pull/36410)
- **状态**: 已关闭

新增必填 `isBlocking` 字段，明确 `request_user_input` 是否需要等待用户响应，不再依赖 `autoResolutionMs` 猜测阻塞语义。解决自动解析策略与超时策略混淆的问题。

### 5. 实现远程插件搜索
- **PR**: [#36409](https://github.com/openai/codex/pull/36409)
- **状态**: 已关闭

完成 `plugin/search` 功能：直接查询远程插件服务（绕过目录缓存），支持全局/工作区/个人三种作用域，带分页游标和功能开关控制。

### 6. 允许实时模式转换的自定义指令
- **PR**: [#36408](https://github.com/openai/codex/pull/36408)
- **状态**: 已关闭

为 `thread/realtime/start` 增加 `realtimeStartInstructions` 与 `realtimeEndInstructions` 可选字段，允许进入/退出实时模式时注入自定义指令，同时保留默认行为。

### 7. 强制线程历史的单写入者所有权
- **PR**: [#36389](https://github.com/openai/codex/pull/36389)
- **状态**: 已关闭

为所有历史线程（含传统格式）添加跨进程写入锁，与已分页历史的保护机制对齐。避免多进程/多任务并发写同一线程导致的数据竞争。

### 8. 为代码模式启用沙箱 V8
- **PR**: [#36374](https://github.com/openai/codex/pull/36374)
- **状态**: 已关闭

修复 Windows MSVC 下 V8 沙箱支持缺失的问题，直接启用 `v8_enable_sandbox` feature，并选择更新的 artifact 配置，为代码模式提供完整 V8 沙箱隔离。

### 9. 新增 `--approve-for-me` CLI 标志
- **PR**: [#36373](https://github.com/openai/codex/pull/36373)
- **状态**: 已关闭

在交互式和 exec 命令中加入 `--approve-for-me`，将审批请求路由到自动审查器，配合 `approval_policy="on-request"` 和 `workspace-write` 沙箱使用。

### 10. 为 MCP elicitations 添加严格自动审查
- **PR**: [#36365](https://github.com/openai/codex/pull/36365)
- **状态**: 已关闭

识别 `codex_strict_auto_review` MCP elicitation 标记，将标记的审批请求路由至自动审查器，且仅接受标准自动审批结果，否则 fail-closed。提升 MCP 工具调用的安全性。

---

## 功能需求趋势

从近期 Issue 与 PR 中可提炼出社区与官方共同关注的 **5 大功能方向**：

1. **沙箱与安全强化**
   - Windows 沙箱兼容性（MSIX PowerShell、CreateProcessAsUserW）
   - 代码模式启用沙箱 V8
   - MCP 严格自动审查、`--approve-for-me` 自动审批

2. **插件生态与 MCP 体验**
   - 远程插件搜索 API（#36409/#36402）
   - MCP OAuth 生命周期可靠性（#35006）
   - 插件更新/缓存管理问题（#32706）

3. **上下文与 Token 优化**
   - 避免重复发送 base64 图像负载（#28316）
   - 图像准备细节的 turn 分析跟踪（#36388）
   - 分页查询加载 turn 摘要（#36384）

4. **线程与会话管理能力**
   - 单写入者所有权强制（#36389）
   - 线程分区管理 API（#36380）
   - Per-thread Auto 模式（#34278）
   - 自定义实时模式指令（#36408）

5. **Windows + WSL 系统性修复**
   - WSL 仓库误判（#35119）
   - WSL 中 `gh` 命令失败（#32323）
   - OneDrive 工作区连通性（#35420）

---

## 开发者关注点

### 高频痛点

| 方向 | 典型 Issue | 社区反馈强度 |
|------|-----------|-------------|
| **配额/计费混乱** | Plus 周配额 24 小时内耗尽（#36353）、Pro 5 小时额度过快耗尽（#32250）、等待/轮询消耗积分（#35259）、限额显示 58% 却被拦截（#36369） | 6-9 条评论，多用户受影响 |
| **Windows 平台问题** | WSL 仓库误判、沙箱 MSIX 冲突、GPU 进程崩溃 | 评论区反复出现 "Windows + WSL" 组合，覆盖远程开发核心场景 |
| **扩展/IDE 稳定性** | Codex Diff 崩溃、steer messages 被丢弃（#36418） | VS Code 用户占比高，崩溃阻断日常开发 |
| **连接可靠性** | WebSocket 降级超时（#15014）、OneDrive 工作区断流（#35420） | 网络环境复杂时重试成本高 |

### 值得注意的信号

- **配额类 Issue 密度上升**：7 月下旬以来至少有 6 条与限额/计费相关的 Bug 报告，且多为 "显示与实际情况不一致"，这可能与新版模型（GPT-5.6 Sol）的定价/计量模型调整有关。
- **实时协作功能正在快速迭代**：多个 PR（#36413/#36408/#36411）围绕实时模式的功能补齐，但配套的文档与稳定性说明尚未跟上。
- **"fork 任务继承未完成 turn"**（#36405）和 **"侧边栏对话继续新任务失败"**（#36061）表明会话恢复链路仍存在缺陷，这在长时任务驱动的使用场景中会造成实际工作流中断。

---

> 数据来源：[github.com/openai/codex](https://github.com/openai/codex) | 日报生成时间：2026-08-01
> 说明：Issue/PR 数据的统计截止时间为 2026-08-01，部分状态可能随后发生变化。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-08-01

## 今日速览

今日发布 3 个版本，核心修复集中在容量耗尽导致的**重试挂起**问题（nightly v0.55.0 及补丁 v0.53.1/v0.54.0-preview.1），同时将 InvalidStreamError 细节透传到 UI 以改善空响应引导。社区讨论热度最高的仍为 **Agent 稳定性**：子代理在 MAX_TURNS 被误报为成功、通用代理挂起等问题持续引发开发者共鸣。

---

## 版本发布

### v0.55.0-nightly.20260801.gf47d6c6f7（Nightly）
**主要变更：**
- **fix(core):** 将容量耗尽（capacity exhaustion）归类为终态，防止重试无限挂起（PR #28599）
- **fix(core,cli):** 传播 `InvalidStreamError` 详细信息至 UI，为空响应场景提供针对性引导（如建议使用 `/compress`）

🔗 https://github.com/google-gemini/gemini-cli/releases/tag/v0.55.0-nightly.20260801.gf47d6c6f7

### v0.54.0-preview.1（Preview）
- 将上述容量耗尽修复（f47d6c6）cherry-pick 至 v0.54.0-preview.0，生成补丁版本 v0.54.0-preview.1（PR #28609）

🔗 https://github.com/google-gemini/gemini-cli/releases/tag/v0.54.0-preview.1

### v0.53.1（Stable Patch）
- 对 v0.53.0 同样 cherry-pick 容量耗尽修复（PR #28610），但存在**合并冲突**，需人工介入

🔗 https://github.com/google-gemini/gemini-cli/releases/tag/v0.53.1

---

## 社区热点 Issues（Top 10）

### 1. Subagent 在 MAX_TURNS 后被误报为 GOAL 成功 ⚠️
**#22323** [priority/p1, kind/bug]
`codebase_investigator` 子代理在自身结果已表明达到最大轮次限制、未做任何分析的情况下，仍报告 `status: "success"` 与 `Termination Reason: "GOAL"`，**掩盖了实际的中断**。12 条评论，社区关注度高。
🔗 https://github.com/google-gemini/gemini-cli/issues/22323

### 2. 通用代理（Generalist agent）无限期挂起 🐞
**#21409** [priority/p1, kind/bug]
只要 Gemini CLI 委托给通用代理就会永久挂起（用户等待最长达 1 小时），简单的文件夹创建也会触发。通过指示模型不要使用子代理可绕过。8 条评论、8 个 👍，是当前**反响最强烈**的 Agent 稳定性问题。
🔗 https://github.com/google-gemini/gemini-cli/issues/21409

### 3. 零依赖 OS 沙箱与执行后意图路由
**#19873** [priority/p2, kind/enhancement]
利用 Gemini 3 模型的 bash 原生能力，通过 0 依赖沙箱化执行 shell 操作，并在执行后做意图路由，兼顾能力与安全。8 条评论，社区对该方向讨论积极。
🔗 https://github.com/google-gemini/gemini-cli/issues/19873

### 4. 组件级行为评估体系
**#24353** [priority/p1, kind/customer-issue]
作为行为评估测试体系的后续 EPIC，目前已积累 76 个行为评估用例、覆盖 6 个支持的 Gemini 模型，旨在补齐组件级评估能力的缺口。
🔗 https://github.com/google-gemini/gemini-cli/issues/24353

### 5. AST 感知的文件读取/搜索/映射评估
**#22745** [priority/p2, kind/feature]
EPIC 追踪 AST 感知工具的价值——例如单次调用精确读取方法边界，减少 token 噪声与错位读取；同时探索代码库映射的改进可能。7 条评论。
🔗 https://github.com/google-gemini/gemini-cli/issues/22745

### 6. Gemini 对 skills 和 sub-agents 的自发使用不足
**#21968** [priority/p2, kind/bug]
开发者反馈 Gemini CLI 几乎不会主动使用自定义 skills 和子代理，即使任务高度相关，也必须显式指示才会使用。
🔗 https://github.com/google-gemini/gemini-cli/issues/21968

### 7. Auto Memory 对低信号会话无限重试
**#26522** [priority/p2, kind/bug]
Auto Memory 仅当提取代理成功读取会话后才标记为已处理；若代理因低信号跳过，该会话会**无限期反复浮出**。5 条评论。
🔗 https://github.com/google-gemini/gemini-cli/issues/26522

### 8. Auto Memory 缺少确定性脱敏，日志过度
**#26525** [priority/p2, area/security, kind/bug]
Auto Memory 在内容送入模型上下文之后才要求模型进行脱敏，且服务可能记录现有技能内容。社区要求**确定性脱敏**并削减日志。4 条评论。
🔗 https://github.com/google-gemini/gemini-cli/issues/26525

### 9. Shell 命令完成后卡在 "Waiting input"
**#25166** [priority/p1, kind/bug]
简单 CLI 命令执行完成后，终端仍显示命令处于活动状态并等待输入，导致 CLI 挂起。4 条评论、3 个 👍，属于高频终端体验痛点。
🔗 https://github.com/google-gemini/gemini-cli/issues/25166

### 10. Browser Agent 韧性增强：会话接管与锁恢复
**#22232** [priority/p3, kind/feature]
`BrowserManager.ts` 当前对锁定的浏览器配置文件采用 fail-fast 策略，建议实现自动会话接管和锁恢复，提升持久会话模式的稳定性。4 条评论。
🔗 https://github.com/google-gemini/gemini-cli/issues/22232

---

## 重要 PR 进展（Top 10）

### 1. 修复 thoughtSignature 剥离导致的 400 错误 🔥
**#28607** [area/agent, size/m]
修复 v0.53.0 回归——`stripThoughts()` 剥离 thought 时丢失 `functionCall.thoughtSignature`，导致并行工具调用报 400 错误。定位根因并给出针对性修复。
🔗 https://github.com/google-gemini/gemini-cli/pull/28607

### 2. 预览模型 404 时回退到稳定模型
**#28608** [priority/p2, area/agent, size/m]
修复 Gemini API Key 认证下，无预览模型权限的项目请求 `gemini-3.1-pro-preview` 返回 404 后，回退策略链未正确降级到稳定模型的缺陷。
🔗 https://github.com/google-gemini/gemini-cli/pull/28608

### 3. macOS 沙箱模式启动崩溃修复
**#28551** [size/l]
修复 macOS/gMac 环境下 `-s` 沙箱模式因找不到静态 Seatbelt `.sb` 配置文件而启动崩溃的问题，改为**回退到内嵌配置文件**。
🔗 https://github.com/google-gemini/gemini-cli/pull/28551

### 4. 传播 InvalidStreamError 细节至 UI
**#28566** [priority/p1, area/core, 已关闭]
将底层 `InvalidStreamError` 的 type 和 message 透传到 CLI UI 钩子，使得可显示针对性建议（如推荐 `/compress`），已合入 v0.55.0-nightly。
🔗 https://github.com/google-gemini/gemini-cli/pull/28566

### 5. MCP OAuth 令牌使用存储的 client ID 刷新
**#28481** [priority/p1, area/security, size/m]
修复 OAuth 发现 + 动态客户端注册的 MCP 服务器刷新令牌失败的问题——此前刷新失败会删除已存凭据，强制用户反复重新认证。
🔗 https://github.com/google-gemini/gemini-cli/pull/28481

### 6. VSCode IDE 组件 Disposable 泄漏修复
**#28526** [priority/p2, area/core, size/s]
修复 `activate()` 中括号误用导致 `gemini.diff.accept` 命令注册和 `onDidChangeWorkspaceFolders` 订阅未正确 push 进 `context.subscriptions` 的泄漏问题。
🔗 https://github.com/google-gemini/gemini-cli/pull/28526

### 7. 使用 debugLogger 替换 console.error
**#28613** [size/xs]
SDK session 中的直接 `console.error` 改为项目标准的 `debugLogger`，并移除不必要的 ESLint 禁用指令，提升日志规范。
🔗 https://github.com/google-gemini/gemini-cli/pull/28613

### 8. 保留 functionCall 的 thoughtSignature（并行工具调用 400）
**#28586** [priority/p2, area/agent, size/m]
与 #28607 同源，针对 v0.53.0 并行工具调用回归，在剥离 thought 时保留 `thoughtSignature`。
🔗 https://github.com/google-gemini/gemini-cli/pull/28586

### 9. v0.53.1 补丁：容量耗尽修复 cherry-pick（含冲突）
**#28610** [已关闭]
将 f47d6c6 补丁至 v0.53.0 稳定版，**出现合并冲突**，需人工解决后手动合入。
🔗 https://github.com/google-gemini/gemini-cli/pull/28610

### 10. Nightly 版本自动提升
**#28612** [size/s]
机器人自动将版本提升至 `0.55.0-nightly.20260801.gf47d6c6f7`。
🔗 https://github.com/google-gemini/gemini-cli/pull/28612

---

## 功能需求趋势

从近 24 小时活跃的 50 条 Issues 中可提炼出 5 个社区聚焦方向：

1. **Agent 自主性与可靠性**（约 60% 的 Issue）  
   子代理误报成功、通用代理挂起、技能/子代理自发使用不足、Agent 权限边界等——Agent 行为可预期性是当前**社区最大诉求**。

2. **安全与权限治理**  
   零依赖 OS 沙箱、确定性脱敏（Auto Memory）、阻止破坏性命令（`git reset --force` 等）、MCP OAuth 凭据安全，安全类 Issue 持续升温。

3. **记忆系统（Auto Memory）稳定性**  
   低信号会话无限重试、无效 patch 静默跳过、日志过度——问题自 5 月创建至今仍活跃，说明记忆系统仍处于打磨期。

4. **AST 感知代码理解**  
   AST 感知的文件读取、搜索、代码库映射专项评估（#22745、#22746），以及对 `codebase_investigator` 的潜在增强，是平台侧明确的技术投入方向。

5. **终端交互体验**  
   Shell 命令完成后的假死、终端 resize 闪烁、外部编辑器退出后的画面损坏——终端 UI 体验类 bug 虽不算高频，但直接影响日常使用。

---

## 开发者关注点

- **「假成功」问题引发信任危机**：子代理在 MAX_TURNS 后仍报告 GOAL 成功（#22323），叠加通用代理挂起（#21409），开发者对 Agent 执行结果的**可信度**产生疑虑，这可能是当前最需要优先修复的信任类缺陷。
- **配置覆盖与权限失控**：`settings.json` 对 Browser Agent 的 `maxTurns` 覆盖被忽略（#22267）、v0.33.0 后子代理在配置禁用时仍被调用（#22093），说明**配置的确定性**与**版本兼容性**存在问题。
- **工具调用过载**：超过 128 个工具时直接 400 错误（#24246），以及模型随意在随机目录创建临时脚本（#23571），反映出**工具治理**和**工作区卫生**上的体验欠缺。
- **行为评估与可观测性**：社区与维护者均认可组件级行为评估（#24353）与子代理轨迹可见性（#22598）的价值，期待通过评估体系避免此类回归反复出现。

---

*日报基于 GitHub 公开数据自动生成，数据截至 2026-08-01。*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报 — 2026-08-01

## 今日速览

v1.0.78-0 正式发布，新增 `/permissions` 批准模式切换和 ACP `closeSession` 支持，并默认启用 `allowDevToolCaches` 以改善沙箱构建体验。社区焦点主要集中在一系列回归问题上：plan-mode 误拦截 shell 命令、`task_complete` 工具在 autopilot 模式不可用、以及大会话恢复时的 OOM 问题，均有用户提交了详细的复现路径与 A/B 对比数据。

## 版本发布

### v1.0.78-0
- **新增** `/permissions` 命令，允许在批准模式之间即时切换。
- **新增** ACP 模式对 `closeSession` 请求的支持，客户端现可主动关闭会话。
- **改进** 新的沙箱设置 `allowDevToolCaches`（默认开启）：为沙箱构建授予工具链缓存、注册表和安装目录的访问权限，确保更多构建开箱即用。

---

## 社区热点 Issues（10 条）

### 1. [area:permissions, area:tools] plan-mode 出现回归——shell 命令被阻止执行
**#4188** | 作者: wsilveiranz | 更新: 2026-07-31 | 💬 7 | 👍 3  
Plan mode 在最新版本中开始阻止 shell 命令执行，包括 plan 流程中常用的 `gh cli` 等命令。用户认为这属于明显回归，因为此前的 plan mode 依赖这些命令来丰富计划内容。
🔗 https://github.com/github/copilot-cli/issues/4188

### 2. 升级 1.0.76 后频繁报错：`Failed to convert JavaScript value 'Undefined' into rust type 'String'`
**#4305** | 作者: azat-badretdin | 更新: 2026-07-31 | 💬 4 | 👍 4  
用户升级到 1.0.76（含预发布版）后，几乎所有命令都会立即触发该 Rust 类型转换错误。此问题影响面较广，社区关注度较高。
🔗 https://github.com/github/copilot-cli/issues/4305

### 3. [area:sessions] 定时提示词（/every、/after）会杀死现有提示队列
**#4078** | 作者: darkmatter2222 | 更新: 2026-07-31 | 💬 4  
当定时提示词触发时，已排队 N 个任务会被中断——代理处理完定时任务后不会从队列中弹出下一个任务，剩余任务全部卡死。
🔗 https://github.com/github/copilot-cli/issues/4078

### 4. [area:agents, area:tools] 切回 autopilot 模式后 `task_complete` 工具不可用（回归）
**#4161** | 作者: AlexMalfr | 更新: 2026-07-31 | 💬 4 | 👍 4  
该 issue 指向旧问题 #1523 的回归。维护者曾在 v1.0.4 表示 `task_complete` 工具会始终在 autopilot 模式中可用，但当前版本中该工具仍会被过滤掉。
🔗 https://github.com/github/copilot-cli/issues/4161

### 5. [area:sessions, area:tools] SDK：硬终止+恢复后出现孤儿 `tool_use`，导致 400 错误
**#3183** | 作者: ulugbekna | 更新: 2026-07-31 | 💬 4  
`@github/copilot` SDK 在会话被硬终止后恢复时，消息历史中残留未配对的 `tool_use` 块，触发 `messages.N: tool_use ids were found without tool_result blocks` 400 错误。
🔗 https://github.com/github/copilot-cli/issues/3183

### 6. [area:enterprise, area:configuration] 企业/组织需要服务端托管本地 CLI 配置（含环境变量）
**#3909** | 作者: velimattiv | 更新: 2026-07-31 | 💬 4  
组织管理员目前无法将配置（尤其是环境变量）集中推送到开发者本地 Copilot CLI。现有机制仅覆盖 GitHub 托管的云端环境（Agents/Codespaces secrets），本地 CLI 处于管控盲区。
🔗 https://github.com/github/copilot-cli/issues/3909

### 7. [area:terminal-rendering] `sessionStart` hook 的 stdout 在终端 UI 中不显示
**#1352** | 作者: sdolgin | 更新: 2026-07-31 | 💬 3 | 👍 3  
`sessionStart` hook 执行成功但输出被静默丢弃，用户无法在会话开始时看到提醒、清单或环境横幅等自定义内容。
🔗 https://github.com/github/copilot-cli/issues/1352

### 8. ACP 需要 `ask_user` / `ask_question` 风格的扩展方法
**#2109** | 作者: TristanVII | 更新: 2026-07-31 | 💬 2 | 👍 6  
社区希望 ACP 协议支持向用户提出澄清问题并接收结构化答案，而不仅仅是现有的 `session/request_permission`。高赞表明该需求在 ACP 客户端开发者中呼声较高。
🔗 https://github.com/github/copilot-cli/issues/2109

### 9. [area:permissions, area:platform-windows] Windows ReFS/Dev Drive 本地沙箱限制——能否补充文档
**#3712** | 作者: torumakabe | 更新: 2026-07-31 | 💬 2 | 👍 4  
用户确认本地沙箱在 Windows ReFS/Dev Drive 上存在限制，但属于友好提问/文档请求，希望官方明确说明规避方案。
🔗 https://github.com/github/copilot-cli/issues/3712

### 10. [area:sessions] 恢复大会话 OOM / 单核 CPU 占用约 70 分钟（1.0.74 回归）
**#4251** | 作者: oldake | 更新: 2026-08-01 | 💬 1 | 👍 1  
用户通过 A/B 对比锁定回归版本：同一台机器恢复同一会话，仅更换 CLI 版本，1.0.74 的峰值 RSS 约为 1.0.73 的 3–4 倍。长期维护大会话的用户受影响严重。
🔗 https://github.com/github/copilot-cli/issues/4251

---

## 重要 PR 进展

> 说明：过去 24 小时内活跃的 PR 仅 2 条，以下全部列出。

### 1. #3166 Create devcontainer.json
**#4316** | 作者: Pjrich1313 | 更新: 2026-07-31  
新增开发容器配置文件，便于贡献者快速搭建可复现的开发环境。目前描述为空，待维护者补充细节。
🔗 https://github.com/github/copilot-cli/pull/4316

### 2. #3163 ViewSonic monitor
**#3163** | 作者: tijuks | 更新: 2026-07-31  
标题与描述均与 Copilot CLI 无明显关联，疑似无效 PR/垃圾提交（spam）。建议维护者直接关闭。
🔗 https://github.com/github/copilot-cli/pull/3163

---

## 功能需求趋势

| 方向 | 相关 Issues | 社区诉求 |
|------|-------------|----------|
| **ACP 协议增强** | #2109、#4174 | 需要 `ask_user` 类交互方法；希望在协议消息中暴露 token/上下文用量与成本数据 |
| **企业级管控** | #3909 | 组织管理员需要服务端策略下发，集中管理开发者本地 CLI 的环境变量和配置 |
| **MCP 生态完善** | #4323、#4320 | 支持 `.mcp.json` 中的注释；梳理嵌套自定义 Agent 的 MCP 工具授权模型，避免依赖隐式的“父级授予”行为 |
| **会话与终端交互** | #4304、#4313、#1352 | 侧边栏键盘导航、会话历史滚动浏览、hook 输出可见性——终端 UI 的“桌面级”体验仍是高频诉求 |
| **性能与稳定性** | #4251、#3183 | 大会话恢复效率、SDK 消息历史一致性，直接关系到长生命周期工作流能否成立 |

---

## 开发者关注点

- **回归频发**：plan-mode 误拦截 shell（#4188）、`task_complete` 在 autopilot 中不可用（#4161）、大会话恢复 OOM（#4251）——仅过去一周就出现多条回归报告，社区对版本稳定性敏感度明显上升。
- **第三方模型兼容性**：DeepSeek-V4 系列模型在工具调用场景下出现 400 错误（#3215），用户对多模型支持的实际可用性有较高期待。
- **安装器缺陷**：指定安装 v1.0.75 时实际安装的总是最新版（#4317），导致用户无法按需固定版本以规避回归。
- **新 UI 组件可用性**：transcript 区域随宽度/内容变化渲染为空白行（#4311）、侧边栏无法用键盘导航（#4304）——交互式终端 UI 的细节打磨仍是体验短板。
- **MCP 配置脆弱性**：在 `.mcp.json` 中添加注释会导致整个文件被拒绝、所有 MCP 服务器被跳过（#4323），共享仓库维护者对此反馈强烈。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区日报 · 2026-08-01

> 数据区间：2026-07-31 至 2026-08-01 | 数据源：github.com/MoonshotAI/kimi-cli

## 今日速览

过去 24 小时内，Kimi Code CLI 无新版本发布，但社区有 1 个新提交的 PR 和 4 个持续活跃的 Issue。其中 **远程控制（#1282）** 与 **记忆系统（#1283）** 两大功能请求讨论热度最高，反映开发者对跨设备工作流连续性和跨会话上下文持久化的强烈诉求。此外，PR #2572 针对工具调用参数的双重 JSON 编码问题提出了递归解包修复，值得关注。

## 社区热点 Issues（共 4 条活跃）

**说明：过去 24 小时更新的 Issue 共 4 条，以下全部列出。**

### #1282 [功能] 远程控制：从任意设备继续本地会话
- 作者：CatKang｜创建：2026-02-27｜更新：2026-07-31｜评论：9｜👍：23
- 链接：https://github.com/MoonshotAI/kimi-cli/issues/1282
- **为什么重要**：当前热度最高的 Issue（23 👍），开发者希望从手机、平板或浏览器无缝接管运行中的本地 CLI 会话，满足移动办公与多设备切换的诉求。
- **社区反应**：9 条评论积极讨论，已涉及远程连接安全、多端状态同步等落地细节，属于高潜功能方向。

### #1283 [功能] 记忆系统：跨会话持久化上下文
- 作者：CatKang｜创建：2026-02-27｜更新：2026-07-31｜评论：8｜👍：0
- 链接：https://github.com/MoonshotAI/kimi-cli/issues/1283
- **为什么重要**：请求实现「自动记忆（AI 管理笔记）+ 手动记忆（用户定义指令）」机制，让 CLI 跨会话记住项目模式与用户偏好。这是 Agent 类工具从「会话工具」走向「长期协作伙伴」的关键能力。
- **社区反应**：8 条评论表明讨论深入，但 👍 数为 0，说明该需求尚未形成广泛共鸣，或仍处于观望阶段。

### #2422 [Bug] 对话完成后滚动查看输出会自动跳到底部
- 作者：venus0707｜创建：2026-06-04｜更新：2026-07-31｜评论：2｜👍：1
- 版本/环境：v1.46.0 · kimi2.6 模型 · Linux
- 链接：https://github.com/MoonshotAI/kimi-cli/issues/2422
- **为什么重要**：直接影响开发者回读长对话历史时的终端体验。滚动被强制拉回底部会打断查看上下文，是命令行交互中的高频痛点。
- **社区反应**：2 条评论描述可复现路径，尚无 workaround，具备优先修复价值。

### #796 [Bug] 消息位置 1 的角色（role）错误（已关闭）
- 作者：bravery｜创建：2026-01-30｜更新：2026-07-31｜评论：1｜👍：0
- 版本/环境：KimiCLI/1.3 · macOS · kimi-for-coding
- 链接：https://github.com/MoonshotAI/kimi-cli/issues/796
- **情况说明**：早期 provider 400 错误，报错内容为消息 role 不符合预期。Issue 已关闭，但 7 月 31 日仍有更新动作，可能关联了新讨论或关联 PR。
- **关注价值**：对遇到多模型消息角色（system/user/tool）兼容性问题的开发者有参考意义。

## 重要 PR 进展（共 1 条）

### #2572 修复(kosong)：递归解包工具调用参数中的双重编码 JSON
- 作者：aalhadxx｜创建：2026-07-31｜更新：2026-07-31
- 链接：https://github.com/MoonshotAI/kimi-cli/pull/2572
- **功能描述**：修复部分模型提供商（如 Moonshot API）在返回工具调用结果时，将嵌套数组/对象参数作为 JSON 字符串整体编码，导致 `SetTodoList`、`ExitPlanMode`、`StrReplaceFile` 等工具触发 Pydantic 验证失败的问题。该 PR 通过递归解包恢复参数的正确嵌套结构。
- **为什么重要**：当前唯一活跃 PR，直击 Function Calling 在多 provider 场景下的兼容性痛点。依赖原生工具能力的开发者可显著降低间歇性报错概率。
- **状态**：Open，暂无反对意见，建议持续关注 review 与合入进展。

## 功能需求趋势

综合全部活跃 Issue，社区关注的功能方向集中在以下三点：

1. **跨设备工作流连续性**：远程控制/多端接力（#1282）呼声最高，说明 CLI 正从单机工具向多端协同演进。
2. **持久化上下文与记忆系统**（#1283）：开发者希望减少重复描述项目背景与偏好，要求 CLI 具备跨会话学习和记忆能力。
3. **终端交互体验与多模型兼容性**：滚动异常（#2422）与 role 错误（#796）表明，日常使用的摩擦点集中在终端 UI 细节和不同模型间的消息协议差异。

## 开发者关注点

- **高频痛点**：
  - 长会话下的终端渲染异常（如自动跳动到底部）。
  - 工具调用参数在不同 provider 间的编码不一致导致的 Pydantic 验证失败。
  - 模型消息角色（role）语义差异引发的 400 错误。
- **高潜需求**：
  - 手机/浏览器端接管本地会话的安全性设计与状态同步机制。
  - 自动与手动双通道记忆系统，平衡便利性与用户控制权。
- **社区信号**：功能类 Issue 的讨论周期长（近半年仍活跃），说明官方 roadmap 回应较慢；外部贡献者已主动提交工具兼容性修复，建议优先投入 review 资源，增强社区共建信心。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报（2026-08-01）

## 今日速览

今日无新版本发布，但 Issue 与 PR 活动频繁：长期悬而未决的**权限配置失效**问题（#16331）以 41 条评论成为社区焦点；PR 侧则呈现两大主线——**TUI 插件系统密集修复**与**提示词缓存性能优化**。此外，大量历史 Issue 于今日批量关闭（多为已修复或过期），标志着项目正在进行一轮状态清理。

## 社区热点 Issues

### 1. 权限配置被完全忽略（#16331）— 最热 Issue
- **评论 41 · 👍 11 · 已关闭**
- 用户在 `opencode.json` 中配置了 `*.env`、`appsettings.json` 等文件的 `deny` 规则，但工具实际执行时完全无视这些权限设置，构成严重安全隐患。社区围绕权限模型的设计缺陷展开大量讨论。
- [查看 Issue](https://github.com/anomalyco/opencode/issues/16331)

### 2. `<system-reminder>` 位置漂移导致缓存崩溃（#23595）
- **评论 5 · 👍 11 · 开放中**
- 在 llama.cpp 后端下，OpenCode 会不断移动 `<system-reminder>` 的位置，导致 prompt history 频繁变化，缓存完全无法命中，浪费大量重复计算时间。这是当前性能优化的重要瓶颈。
- [查看 Issue](https://github.com/anomalyco/opencode/issues/23595)

### 3. 桌面版不支持 Git Submodules（#7769）
- **评论 9 · 👍 13 · 已关闭**
- 长期功能需求：桌面版无法正确管理 Git 子模块的会话，影响 monorepo 或多仓库项目用户。
- [查看 Issue](https://github.com/anomalyco/opencode/issues/7769)

### 4. 新增 PowerShell 工具反而让模型更困惑（#20527）
- **评论 7 · 👍 2 · 已关闭**
- PR #16069 新增 PowerShell 工具后，Windows 上的 agent 仍然「固执地」使用 `tail` 等 Unix 命令过滤编译输出，说明工具切换的提示机制未生效。
- [查看 Issue](https://github.com/anomalyco/opencode/issues/20527)

### 5. Write 工具被以无效参数调用（#18131）
- **评论 12 · 👍 4 · 已关闭**
- 使用 Qwen 3.5 35B-A3B（LM Studio 托管）时，模型调用 `write` 工具时参数不符合 JSON Schema，导致对话中断。涉及模型兼容性底层问题。
- [查看 Issue](https://github.com/anomalyco/opencode/issues/18131)

### 6. Windows 11 突然无法启动（#28480）
- **评论 11 · 👍 0 · 已关闭**
- 用户安装数天后 OpenCode 彻底无法启动，无报错、无崩溃日志。Windows 平台稳定性问题持续受到关注。
- [查看 Issue](https://github.com/anomalyco/opencode/issues/28480)

### 7. OpenAI 兼容模型调用 write/edit 时 schema 频繁错误（#29142）
- **评论 2 · 👍 5 · 已关闭**
- 使用 OpenAI 兼容接口时，模型间歇性地以非法参数形状调用 `write`/`edit` 工具，UI 直接暴露 SchemaError，而不是自动恢复或向模型反馈正确的 schema。属于高频兼容性痛点。
- [查看 Issue](https://github.com/anomalyco/opencode/issues/29142)

### 8. 桌面版「打开终端 / VSCode」按钮消失（#29867）
- **评论 3 · 👍 4 · 已关闭**
- macOS 15.7.7 + v1.15.12 桌面版右上角两个快捷按钮消失，属于 UI 回归问题。
- [查看 Issue](https://github.com/anomalyco/opencode/issues/29867)

### 9. [FEATURE] 运行时动态发现 Requesty 模型（#30285）
- **评论 2 · 👍 4 · 已关闭**
- Requesty provider 目前只展示 models.dev 的静态快照，用户希望改为运行时动态拉取模型列表，以支持自定义模型/最新模型。
- [查看 Issue](https://github.com/anomalyco/opencode/issues/30285)

### 10. `GET /session/status` 不再跨目录聚合（#30094）
- **评论 3 · 👍 0 · 已关闭**
- HTTP API 回归：自某版本起 `/session/status` 不再返回子目录中的 busy 会话，必须手动指定 `?directory` 参数。对基于 HTTP API 做编排的外部客户端影响明显。
- [查看 Issue](https://github.com/anomalyco/opencode/issues/30094)

## 重要 PR 进展

### 1. feat: 新增 `OPENCODE_AIRGAP` 总开关（#39994）
- 为内网/隔离环境提供一键禁用所有**自动**互联网访问的能力，回应 #18233、#37888 的企业部署需求。
- [查看 PR](https://github.com/anomalyco/opencode/pull/39994)

### 2. feat: 长时运行命令自动转入后台执行（#39978）
- 构建、测试、守护进程等长命令不再阻塞对话，新增后台任务列表 API 与 TUI 徽标提示。该 PR 还包含了智能超时逻辑（网络 15s / 构建 300s）。
- [查看 PR](https://github.com/anomalyco/opencode/pull/39978)

### 3. feat(app): 可配置发送按键（Enter / Shift+Enter / Ctrl+Enter）（#39985）
- 为「Enter 直接发送」这一默认行为增加设置项，适配不同输入习惯。
- [查看 PR](https://github.com/anomalyco/opencode/pull/39985)

### 4. feat(session): 相同 shell 命令反复失败时注入调试循环提示（#39990）
- 当模型在对话中对同一命令反复失败时，主动提示模型可能陷入了同层假设循环，提升调试效率。
- [查看 PR](https://github.com/anomalyco/opencode/pull/39990)

### 5. fix(cache): 拆分并稳定 system prefix（#27378）
- 通过将 system prompt 拆分为固定前缀+可变部分，提升 Anthropic 的 prompt cache 命中率。这是缓存优化大计划的第 3/4 步。
- [查看 PR](https://github.com/anomalyco/opencode/pull/27378)

### 6. fix(cache): 提升 Anthropic 跨会话缓存命中率（#14743）
- 修复跨仓库、跨会话场景下的 prompt cache miss 问题；同一会话内的缓存已正常，主要解决系统提示词和工具定义抖动导致的缓存失效。
- [查看 PR](https://github.com/anomalyco/opencode/pull/14743)

### 7. fix(tui): 跨配置根目录发现插件（#39988）
- TUI 插件自动发现范围从 `<cwd>` 扩展至全局配置目录和所有祖先目录的 `.opencode/plugins/tui/`，并支持运行中新建的目录。
- [查看 PR](https://github.com/anomalyco/opencode/pull/39988)

### 8. fix(tui): 外部 TSX 插件共享宿主运行时（#39983）
- 修复外部 V2 TSX 插件使用独立 `createSignal` 时响应式更新失效的问题，插件现在复用 TUI 主进程的 OpenTUI 和 Solid 运行时。
- [查看 PR](https://github.com/anomalyco/opencode/pull/39983)

### 9. feat(tool): shell 命令失败的简洁错误输出（#39982）
- 非零退出码时，不再倾倒完整日志，而是输出更聚焦的失败摘要，避免模型被噪声干扰、更快定位问题。
- [查看 PR](https://github.com/anomalyco/opencode/pull/39982)

### 10. feat: TUI 透明背景切换（#5657）
- 为 TUI 主题引入 `auto | on | off` 三态透明背景策略，可通过命令面板实时切换。虽为老 PR，今日仍在活跃更新。
- [查看 PR](https://github.com/anomalyco/opencode/pull/5657)

## 功能需求趋势

### 缓存与性能优化（最迫切）
- `system-reminder` 稳定放置（#23595）、OpenRouter 的 `prompt_cache_ttl` 参数（#16848）、Anthropic 缓存命中率改进（#14743、#27378）等，表明**成本与延迟优化**是当前社区最强烈的诉求。

### Windows / 桌面版体验
- 桌面版 UI 回归（#29867）、WSL 连接支持（#30230）、nushell 黑名单（#20573）、Termux 兼容（#30248）等问题集中爆发，平台适配任重道远。

### 插件系统持续进化
- TUI 插件跨目录发现（#39988）、运行时共享（#39983）、纯副作用斜杠命令（#30268）、子代理模型继承（#30289），显示插件机制正在从「能用」走向「好用」。

### 企业部署能力
- `OPENCODE_AIRGAP` 离线开关（#39994）、provider 级超时配置（#30252）、静态模型列表改动态发现（#30285），共同指向**企业级/内网部署**场景的补齐。

## 开发者关注点

- **权限系统可靠性**：`permission` 配置被完全无视（#16331）动摇了用户对工具安全基础的信任，预计会成为后续版本的核心修复方向。
- **模型调用稳定性**：write/edit 工具 schema 错误频发（#18131、#24604、#29142）在 Qwen、Ling 3.0 等非 Anthropic 模型上尤其突出，OpenAI 兼容层需要更健壮的参数校验与自恢复机制。
- **长命令阻塞交互**：构建/测试命令会长时间卡住整个会话，社区对后台任务支持呼声很高（#39978 已响应）。
- **外部编辑器集成**：JetBrains 等 IDE 修改文件后 OpenCode 目录树不刷新（#30052），影响多工具协同工作流。
- **API 回归问题**：`/session/status` 跨目录聚合失效（#30094）、`Load More` 分页异常（#30109），提醒维护者注意 HTTP API 的向后兼容。

---
*本日报由 AI 技术分析师基于 GitHub 公开数据自动生成，数据截止 2026-08-01。*

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

## Qwen Code 社区动态日报（2026-08-01）

数据来源：github.com/QwenLM/qwen-code

---

### 1. 今日速览

- 发布 v0.21.2，主要增强 Autofix 轮次控制：超过五轮后推迟低严重度建议，并在无法继续时给出可见提示。
- 社区关于 `qwen serve` 多工作区 daemon 的讨论持续升温，#6378 已获 31 条评论，并衍生出资源使用边界跟踪 #8051。
- Anthropic 转换器多个兼容性问题集中修复并关闭，同时多名开发者反馈长会话中模型工具调用格式失稳。

---

### 2. 版本发布

#### v0.21.2

- 最重要的变化来自 Highlight：**Autofix 现在在五轮修复后，会推迟低严重度建议**；若因轮次限制拒绝继续，会张贴可见通知，避免静默跳过。  
- 相关改动：[#7913](https://github.com/QwenLM/qwen-code/pull/7913) / [#8067](https://github.com/QwenLM/qwen-code/pull/8067)

---

### 3. 社区热点 Issues（10 个）

1. **[#6378 RFC：单 daemon 支持多工作区](https://github.com/QwenLM/qwen-code/issues/6378)**  
   31 评论，全站最热。社区在讨论从“1 daemon = 1 workspace × N sessions”演进到多工作区的模型，同时保持现有客户端兼容。虽然 RFC 已关闭，但为后续 daemon 架构升级定下基调。

2. **[#8051 跟踪：多工作区 daemon 资源使用上限](https://github.com/QwenLM/qwen-code/issues/8051)**  
   9 评论。是 #6378 的后续，指出只限制工作区和 session 数量不够，还要限定请求体、WebSocket 拼装、其他内部缓存等字节占用。说明社区正在把多工作区 daemon 往生产级资源治理推进。

3. **[#5199 Minified React error #185](https://github.com/QwenLM/qwen-code/issues/5199)**  
   9 评论。Windows + CherryStudio 环境下 UI 层报 React 错误，用户粘贴了本地路径。已开放，仍需补充更多上下文信息，属于 Windows 平台高复现 UI 问题。

4. **[#6721 延迟工具发现不应破坏 prompt 缓存前缀](https://github.com/QwenLM/qwen-code/issues/6721)**  
   7 评论。会话运行中通过 `tool_search` 发现并解析隐藏工具后，`setTools()` 会让 prompt 缓存失效，降低长会话性能。社区关注工具动态发现与缓存命中之间的平衡。

5. **[#8039 Anthropic 4.6+ assistant-prefill 400（P1）](https://github.com/QwenLM/qwen-code/issues/8039)**  
   6 评论。影响 Claude Opus/Sonnet 4.6+ 及 5.x 系列的 wire 兼容性，包括 prefill 400 和 `thinking.display` 默认值错误。已修复关闭，是本次 Anthropic 兼容性补强中的重要一环。

6. **[#8003 长会话中模型输出 XML 风格工具调用](https://github.com/QwenLM/qwen-code/issues/8003)**  
   3 评论。200+ 轮、180K+ token 长会话下，`qwen3.8-max-preview` 偶尔把 `<invoke>/<parameter>` 作为普通文本输出，而不是 `tool_calls` 数组。核心痛点是长上下文中模型格式一致性。

7. **[#7752 P0：修复 serve 管理 writer 锁与守护维护](https://github.com/QwenLM/qwen-code/issues/7752)**  
   3 评论。P0 daemon writer 生命周期问题，三个阶段全部合并：协作式 shutdown、certified handoff、session-maintenance writer 隔离，已关闭并实现。

8. **[#8182 daemon 给每个 ACP 子进程分配 50% 宿主内存](https://github.com/QwenLM/qwen-code/issues/8182)**  
   3 评论。`getAcpMemoryArgs()` 只算一次宿主内存，不按子进程数量均分，多个 `qwen --acp` 子进程可能共同吃满内存。资源隔离 bug，开放中。

9. **[#8207 JSON 风格工具参数泄漏为纯文本](https://github.com/QwenLM/qwen-code/issues/8207)**  
   3 评论。生产 DataAgent 会话中，模型把两个并行子代理的调用序列化成普通文本输出，后续链路无法解析。与 #8003 同属“模型丢弃 function-calling 格式”的问题。

10. **[#7835 子代理提问后用户无法回答](https://github.com/QwenLM/qwen-code/issues/7835)**  
    3 评论。子代理询问用户问题，但主代理未收集和转发，用户看不到问题，子代理永久等待。该问题已关闭，但反映了多代理交互中的一个关键断点。

---

### 4. 重要 PR 进展（10 个）

1. **[#8198 fix(cli)：新增 `ui.mouseTracking` 设置](https://github.com/QwenLM/qwen-code/pull/8198)**  
   修复 VP 模式（0.21.1 起默认）下的鼠标交互回归。新增布尔设置默认开启，允许用户关闭 SGR 鼠标跟踪以恢复右键和 URL 点击。

2. **[#8217 feat(cli)：TUI 增加图片显示工具](https://github.com/QwenLM/qwen-code/pull/8217)**  
   新增模型可调用的 `display_image` 工具，仅限主交互 TUI。校验绝对路径、PNG 签名和 8 MiB 上限，只透传结构化路径与 MIME 类型，不发送图像字节。

3. **[#8262 fix(web-shell)：按会话隔离自动 recap](https://github.com/QwenLM/qwen-code/pull/8262)**  
   防止为 A 会话请求的自动摘要被插入到已切换的 B 会话。通过记录 session + generation 双重归属，确保结果只落在当前会话中。

4. **[#8250 fix(web-shell)：按显示标签给权限选项去重](https://github.com/QwenLM/qwen-code/pull/8250)**  
   Web Shell 的 `ToolApproval` 组件中，解析到相同 i18n key 或相同原始 label 的权限按钮被合并，避免出现两个“Yes, allow once”。

5. **[#8166 fix(anthropic)：级联清除 orphan tool_use 的 thinking 兄弟块](https://github.com/QwenLM/qwen-code/pull/8166)**  
   当 `cleanOrphanedToolCalls` 剥掉多余的 tool_use 时，同步删除其配对 `thinking` / `redacted_thinking` 块；另增加对空 thinking 块的无条件清理。

6. **[#8272 fix(vscode)：notices generator 遍历不同 resolved 版本](https://github.com/QwenLM/qwen-code/pull/8272)**  
   依赖收集原先只按包名去重，导致同一包名不同版本（如 `content-type@1.0.5` 和 `content-type@2.0.0`）第二个版本被静默跳过。本次改为按“包名+版本”跟踪。

7. **[#8141 refactor(cli)：移除 ACP 对私有 serve 的依赖](https://github.com/QwenLM/qwen-code/pull/8141)**  
   将无生命周期关联的 ACP/daemon 契约从 `packages/cli/src/serve/**` 迁移到 `packages/cli/src/runtime/**`，涉及内存诊断、技能状态、server name 校验、IPC 契约等，降低架构耦合。

8. **[#8240 feat(workflows)：向上冒泡 workflow agent 审批](https://github.com/QwenLM/qwen-code/pull/8240)**  
   当 Workflow 代理遇到 Shell、编辑、MCP 或信息请求需要确认时，请求会挂起到所属 run，并通过 TUI、ACP host 或 stream-json 控制通道呈现给用户，补齐 Dynamic Workflow 的前台授权路径。

9. **[#8243 fix(integration)：acp-cron 测试启用快速模式](https://github.com/QwenLM/qwen-code/pull/8243)**  
   为 ACP cron 集成测试加入 `QWEN_CODE_TEST_CRON_FAST` 测试接缝，cron 任务从等待真实分钟边界缩短为 5 秒自动触发，用于解决 CI 中该用例的偶发超时。

10. **[#8265 fix(ci)：每次 review 运行前升级 qwen CLI 到 npm latest](https://github.com/QwenLM/qwen-code/pull/8265)**  
   此前 review 运行器可能停留在旧版 CLI（如 0.20.0），导致输出格式过时（例：#8005 的 review 仍是旧版 chunk 展示）。现在每次运行前强制安装最新版本，保证 review 行为和格式一致。

---

### 5. 功能需求趋势

- **Daemon 多工作区与资源治理**：#6378 提出多工作区 daemon，紧接着 #8051 要求给请求体、WebSocket 等真实字节占用设限；#8182 则暴露 ACP 子进程内存配额问题。社区正推动 daemon 从“功能可用”走向“生产可用”。
- **会话与上下文管理增强**：#8271 提出会话分支（可选 Git worktree 隔离），#6721 要求工具发现不破坏 prompt 缓存，多代理交互（#7835）也要闭环。长会话、复杂上下文成为核心演进方向。
- **工具调用可靠性**：#8003、#8207、#8258 分别涉及 XML 文本、JSON 参数泄漏、thoughtSignature 丢失，集中在“模型输出必须是稳定结构化工具调用”这一诉求上。
- **跨平台与安全加固**：Windows 平台集中出现 React 崩溃（#5199）、@-file 读取缺少 `O_NOFOLLOW`（#8227）、SGR 鼠标转义泄漏（#8267），说明 Windows 是最需要补强的生态之一。
- **可扩展集成与配置化**：浏览器扩展 alpha（#6739）、QQ 机器人（#8232）、MCP 依赖治理（#8269）、skills 总开关（#8054）和热重载（#8221），显示用户希望更灵活地接入外部系统并控制内置技能。

---

### 6. 开发者关注点

- **长会话模型格式失稳**：多起 Issue 指向同一现象——模型在长上下文/高轮次下把工具调用写成纯文本或 XML，导致下游无法解析。这是当前生产使用中最明显的可靠性风险。
- **daemon 资源隔离不足**：ACP 子进程各自拿到 50% 宿主内存，多工作区共享内存无上限，开发者担心 OOM 和任务间互相挤占。
- **Windows 兼容性仍是高频痛点**：UI 崩溃、文件读取安全、鼠标转义序列泄漏等均来自 Windows 用户，且问题可稳定复现，需要更多平台级测试投入。
- **子代理“只问不听”**：子代理向用户提问却无法获得回复，使自动化流程卡死。开发者希望主代理能正确转发或禁止子代理提问。
- **Anthropic 转换器边界问题**：prefill 400、`tool_use.id` 字符集未清洗、`tool_result` 顺序不保证等已在本日修复中集中解决，但仍提示多模型兼容层需要更强的防御式转换。
- **CI 稳定性拖累开发效率**：多起 main 分支 E2E 失败（acp-cron、sdk-mcp-server、subagents）引发维护者通过测试接缝和版本升级来治理，社区期待更可靠的自动化质量门禁。

---

*日报自动生成于 2026-08-01，基于 GitHub 公开数据整理。*

</details>

---
*本日报由 [agents-radar](https://github.com/huang-yi-dae/agents-radar) 自动生成。*