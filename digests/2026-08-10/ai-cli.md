# AI CLI 工具社区动态日报 2026-08-10

> 生成时间: 2026-08-10 01:25 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告

**2026-08-10**


## 1. 生态全景

AI CLI 工具已从"代码补全助手"全面进化为"自主智能体运行时"——多代理协作、会话生命周期管理、MCP 生态集成、安全与权限沙箱是各工具共同攻坚的核心战场。当前行业正处于**稳定性优先于新功能**的整合期：普遍暴露的 P1 级问题（会话挂起、误报中止、静默数据丢失）表明快速迭代期积累的技术债正在集中偿还。同时，跨工具社区对**会话持久化、模型回退与故障转移、Auto Memory/长期记忆**形成了高度共识的需求信号，下一阶段竞争焦点将围绕"有状态的 Agent 体验"展开。


## 2. 各工具活跃度对比

| 工具 | 今日 Issues（热点） | 今日 PR 动态 | Release | 社区热度信号 |
|------|-------------------|-------------|---------|-------------|
| **Claude Code** | 10 个热点；单日新增 15+ 条（含同用户 10+ 条系列误报）；最高 👍 76 | 4 个推进中 | 无 | 安全过滤器误报成焦点 |
| **OpenAI Codex** | 10 个热点；最高 👍 150（自定义状态栏） | 6 个合并 | 无 | 高赞功能需求密度最高 |
| **Gemini CLI** | 10 个热点；含 3 个 P1 bug；最高 👍 8 | 10 个（1 个 P1 修复） | v0.56.0-nightly | P1 级缺陷最多 |
| **GitHub Copilot CLI** | 10 个热点；24h 内新增 20+ 条 | 无新增 | 无 | MCP 生态问题集中爆发 |
| **Kimi Code CLI** | 3 个热点；最热 Issue 27 评论 | 1 个推进中（已 7 个月） | 无 | 跨会话记忆呼声最高 |
| **OpenCode** | 10 个热点；最高 👍 110（剪贴板失效） | 10 个（含 V2 主干合入） | 无 | 网关稳定性信任危机 |
| **Qwen Code** | 10 个热点；含 1 个 P1 | 10 个（含 1 个 P1 修复） | v0.21.8-nightly | 多智能体协调架构讨论活跃 |


## 3. 共同关注的功能方向

| 功能方向 | 涉及工具 | 具体诉求 |
|---------|---------|---------|
| **会话持久化与恢复** | Claude Code、Codex、Kimi、Qwen | Claude Code 跨目录恢复（#28745，76👍）+ 桌面端 30 天保留策略删数据；Codex 跨平台聊天记录同步（63👍）；Kimi 跨会话记忆系统（27 评论）；Qwen 大会话恢复超时（P1） |
| **多代理协作与协调** | Gemini、Copilot、Qwen、OpenCode、Claude Code | Gemini 子代理递归调用 PR（#28738）；Copilot 并行工具调用响应乱序（#4420）；Qwen 原生多智能体协调（#8804）+ leader-worker RFC；OpenCode 嵌套子代理权限弹窗挂起；Claude Code 子代理只读不可修正 |
| **MCP 生态可靠性** | Copilot、Gemini、Kimi、Qwen、Claude Code | Copilot 握手 60s 超时无重试 + OAuth 3LO 失败 + `server/discover` 非标准；Gemini 工具超 128 个报 400；Kimi Google GenAI 与 MCP 工具 Schema 冲突（已拖 7 个月）；Qwen Streamable HTTP 拒绝可选流导致连接中断；Claude Code 插件版本解析逃逸 |
| **安全过滤器与权限控制** | Claude Code、Gemini、Copilot | Claude Code 单日 10+ 次误报 session-halted，无法用 /model 覆盖；Gemini 子代理绕过权限配置自动运行；Copilot managed-settings 空允许列表误删用户 MCP 服务器 |
| **模型回退与容错** | OpenCode、Copilot、Claude Code | OpenCode 跨模型 fallback（107👍）；Copilot 并行 explore 子代理触发单模型 429 限流、Claude 模型"幽灵禁用" |
| **终端 UI 定制与本地化** | Codex、Copilot、Qwen、Claude Code、OpenCode | Codex 自定义状态栏（150👍）；Copilot 中文 UI + 可配置 HUD；Qwen TUI Web 终端闪烁；Claude Code UI 本地化；OpenCode 剪贴板功能多端回归 |


## 4. 差异化定位分析

| 工具 | 核心定位 | 技术路线 | 目标用户 |
|------|---------|---------|---------|
| **Claude Code** | 深度 Agent 能力 + 强安全审查 | Opus 分级模型 + ClAudit 安全过滤器 + 插件生态；依托 Anthropic 自研模型能力 | 企业级开发者，重视代码安全审查与合规 |
| **OpenAI Codex** | 多端协同 + 企业级配置 | Electron 桌面端 + ChatGPT 生态打通 + 多代理（MultiAgent）；模型能力由 OpenAI 统一供给 | 跨平台开发者、企业用户、追求模型能力上限的团队 |
| **Gemini CLI** | 高迭代频率 + Agent 稳定性打磨 | 每日 nightly + ACP 协议 + A2A SDK 1.0 升级；依托 Google GenAI SDK | 追求新特性的开发者、Google 生态用户 |
| **GitHub Copilot CLI** | GitHub 生态深度绑定 + MCP 先行者 | GitHub Copilot 平台 + MCP Gateway + 远程会话控制；企业管理策略（managed-settings） | GitHub 重度用户、企业组织、大量使用 MCP 工具的开发者 |
| **Kimi Code CLI** | 轻量 + 高性价比模型 | Moonshot 模型 + ACP 协议 + Qoder 插件扩展 | 独立开发者、对 API 成本敏感的用户、中文开发者 |
| **OpenCode** | 开源生态 + 多 Provider 兼容 | 原生 Go 实现 + V2 架构迭代 + 大模型无关设计（兼容 Claude Code rules/skills）；OpenCode Go 托管订阅 | 开源社区、自托管用户、多模型切换需求者 |
| **Qwen Code** | 国产模型生态 + 多智能体编排 | 阿里 Qwen 模型 + Agent Team 运行时 + workflow 引擎；新增 Kimi、小米 MiMo 第三方提供商 | 中文开发者、阿里云生态用户、多会话协作场景 |


## 5. 社区热度与成熟度

**高活跃度 + 成熟期**：**Claude Code** 与 **OpenAI Codex** 社区规模最大、功能需求密度最高（76👍 / 150👍 级诉求），反馈集中在精细化体验与平台稳定性——已跨越功能补齐阶段，进入"可靠性打磨期"。

**高迭代 + 稳定性阵痛**：**Gemini CLI** 与 **Qwen Code** 保持每日 nightly 发布节奏、PR/Issue 吞吐量领先（各 10 个 PR），但 P1 级缺陷集中（Gemini 3 个 P1、Qwen 1 个 P1 + 多个 E2E CI 失败），处于"功能先行、稳定性追赶"的快速迭代阶段。

**生态扩展 + 基础设施承压**：**Copilot CLI** 单日 20+ 条新 Issue 全部指向 MCP 集成与模型可用性，说明其作为 GitHub 生态入口的用户基数在快速增长，但 MCP 客户端实现成熟度尚浅。**OpenCode** 虽无新版本，但 V2 合并持续滚动且有 75.5% 内存优化 PR，社区对 Go 网关稳定性的信任危机（付费用户"terminated"）与 110 👍 的剪贴板 bug 形成鲜明对比，处于开源热度与产品质量的角力期。

**社区规模较小但需求明确**：**Kimi Code CLI** 与 **Qwen Code** 作为国产新势力，社区体量小于前三者，但需求聚焦（Kimi 的记忆系统、Qwen 的多智能体编排），在细分领域形成差异化卡位。


## 6. 值得关注的趋势信号

**① 会话"有状态化"成为刚需**
跨目录恢复（Claude Code 76👍）、跨端同步（Codex 63👍）、内存系统（Kimi 27 评论）、会话恢复超时（Qwen P1）——四家不约而同聚焦会话生命周期，用户对"永久记忆的 Agent 伙伴"预期正在形成。值得注意的是，Claude Code 桌面端 30 天保留策略删除唯一副本（#81100）和自动更新杀死长驻会话（#85413）两个 bug 恰恰暴露了当前工具**缺乏无人值守场景保护机制**，这是从"交互式工具"走向"自主 Agent"必须补齐的基础设施。

**② 安全机制正从"技术问题"演变为"信任危机"**
Claude Code 安全过滤器单日 10+ 次误报且无法覆盖、Gemini 子代理绕过权限配置、Copilot 模型"幽灵禁用"——安全机制在误报、不可控、不透明三方面同时侵蚀用户信任。开发者并非反对安全审查，而是要求**可配置的覆盖手段 + 透明的判定依据**。这可能催生标准化 Agent 安全审计协议的出现。

**③ MCP 从"能用"走向"规范"的阵痛期**
Copilot 的握手超时/OAuth 3LO 失败/非标准 `server/discover`、Gemini 的工具数超限 400 错误、Kimi 的 Schema 兼容性拖了 7 个月、Qwen 的 Streamable HTTP 降级缺陷——MCP 客户端实现质量参差不齐成为当前最大集成瓶颈。**MCP 协议本身需要更严格的认证与超时标准**，而工具数量的指数增长（Gemini 已触及 128 上限）将迫使各 CLI 实现更智能的动态工具裁剪机制。

**④ 多代理协作从"概念"走向"落地"，但交互模型尚未定型**
Gemini 已提交允许子代理递归调用的 PR（#28738）+ A2A SDK 升至 1.0；Qwen 推出 `/coordinate` 命令 + leader-worker RFC；OpenCode 修复嵌套子代理权限弹窗——各工具正各自探索多代理编排路径，但子代理只读限制（Codex #33885）、并行工具调用响应乱序（Copilot #4420）、权限弹窗挂起（OpenCode #13715）等基础问题仍未解决。**Agent-to-Agent 的标准交互协议（如 A2A 1.0）将成为下一轮竞争的关键变量。**

**⑤ 企业级配置与网关适配需求集中释放**
Copilot 的 BYOK Provider 本地 403、模型组织级同步失败；OpenCode 的 Go 网关模型名前导空格 + 全会话 terminated；Codex 的模型别名映射（企业网关）——企业用户正在将 AI CLI 纳入内部基础设施，对**自定义模型网关、组织级策略同步、可观测性与诊断能力**提出了远高于个人开发者的要求。CLI 工具需要提供更透明的配置生效机制与错误报告（如 Codex PR #37723 增加 I/O 子类型错误码即正确方向）。

---

*报告基于 2026-08-10 各工具 GitHub 公开数据，仅反映当日快照。*

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

> 数据截止：2026-08-10 | 数据源：github.com/anthropics/skills

## 1. 热门 Skills 排行

### 🥇 skill-creator 系列修复（#1298、#1099、#1050、#1323、#1261）
**状态：所有 PR 均 Open 未合并**

社区讨论焦点集中在 skill-creator 的 `run_eval.py` 在 **Windows 平台存在系统性故障**——subprocess 管道读取、`PATHEXT` 解析、编码处理均会导致触发检测全部失效，最终表现为 **"无论描述内容如何，recall 恒为 0%"**。此外，并行评估（默认 10 workers）会将合成的 command 文件写入用户**真实项目的 `.claude/commands/` 目录**，干扰正常会话。这是当前社区投入讨论量最大的技能，关联 Issue #556（12 评论）与 #1169（3 评论）均独立复现了该问题。

- [#1298 fix(skill-creator): run_eval.py always reports 0% recall](https://github.com/anthropics/skills/pull/1298)
- [#1323 fix(skill-creator): run_eval trigger detection misses real skill name](https://github.com/anthropics/skills/pull/1323)
- [#1099 fix skill-creator: run_eval.py crash on Windows subprocess pipe](https://github.com/anthropics/skills/pull/1099)
- [#1261 fix(skill-creator): isolate trigger-eval command files from live project](https://github.com/anthropics/skills/pull/1261)
- [#1050 fix(skill-creator): Windows subprocess + encoding bugs](https://github.com/anthropics/skills/pull/1050)

### 🥈 document-typography（#514）
**状态：Open**

针对 AI 生成文档的排版质量问题：**孤字换行（1-6 个词溢出到下一行）、孤行段落（标题被孤立在页底）、编号错位**。社区认为这些问题普遍存在于 Claude 生成的所有文档中，且用户极少主动要求排版优化，因此该 Skill 定位为"默认防护"型能力。

- [#514 Add document-typography skill](https://github.com/anthropics/skills/pull/514)

### 🥉 testing-patterns（#723）
**状态：Open**

覆盖完整测试栈的综合性 Skill：Testing Trophy 模型、单元测试 AAA 模式、React 组件测试（Testing Library）、边界条件覆盖等。切中 AI 生成代码缺乏测试意识的普遍痛点。

- [#723 feat: add testing-patterns skill](https://github.com/anthropics/skills/pull/723)

### 4. pyxel 复古游戏开发（#525）
**状态：Open**

基于 [pyxel-mcp](https://github.com/kitao/pyxel-mcp)（Pyxel 复古游戏引擎的 MCP 服务端），实现"编写 → 运行捕获 → 检查 → 迭代"的闭环工作流。由 Pyxel 作者 kitao 亲自提交。社区更新活跃（最近更新 2026-07-15），落地可能性高。

- [#525 Add pyxel skill for retro game development](https://github.com/anthropics/skills/pull/525)

### 5. color-expert（#1302）
**状态：Open**

自包含的色彩专业知识库：ISCC-NBS、Munsell、XKCD、RAL、Ridgway 1912 等命名系统，OKLCH/OKLAB/CAM16 等色彩空间的选型对照表。适合设计类工作流。

- [#1302 Add color-expert skill](https://github.com/anthropics/skills/pull/1302)

### 6. skill-quality-analyzer 与 skill-security-analyzer（#83）
**状态：Open**

**元技能**（meta-skills）——用于评估其他 Skill 的质量与安全性。质量分析器从结构文档（20%）、示例、资源等五个维度打分；安全分析器则审查权限边界。反映社区对 **Skill 生态质量管控** 的需求。

- [#83 Add skill-quality-analyzer and skill-security-analyzer](https://github.com/anthropics/skills/pull/83)

### 7. ODT 文档处理（#486）
**状态：Open**

支持 OpenDocument 格式（.odt/.ods）的创建、填充、读取与转换为 HTML，弥补了官方文档技能集中于 DOCX/PDF 的缺口。

- [#486 Add ODT skill](https://github.com/anthropics/skills/pull/486)

---

## 2. 社区需求趋势（来自 Issues）

| 趋势方向 | 代表 Issue | 核心诉求 |
|---------|-----------|---------|
| **安全与信任机制** | [#492 安全边界滥用（43 评论，👍 2）](https://github.com/anthropics/skills/issues/492) | 社区技能混入 anthropic 官方命名空间，用户无法区分官方/社区来源，形成信任边界漏洞。是当前最高热度 Issue |
| **组织级共享与协作** | [#228 组织内技能共享（16 评论，👍 8）](https://github.com/anthropics/skills/issues/228) | 目前技能文件需手动下载再经社交工具传输，期望直接共享链接或团队技能库，是 👍 数最高的需求 |
| **上下文窗口优化** | [#1487 claude-api 技能注入 ~156k tokens（4 评论）](https://github.com/anthropics/skills/issues/1487) | 技能的单次调用消耗几乎占满整个上下文窗口，需按需加载或精简注入机制 |
| **文档格式兼容性** | [#12 DOCX 空白格式重排导致文档损坏](https://github.com/anthropics/skills/issues/12) | 使用 docx skill 添加批注后文档无法被 Word/LibreOffice 打开，需约束格式重排行为 |
| **技能去重** | [#189 document-skills 与 example-skills 内容重复（👍 9）](https://github.com/anthropics/skills/issues/189) | 同时安装两个插件导致技能重复注入、浪费上下文 |
| **外部平台集成** | [#29 AWS Bedrock 支持](https://github.com/anthropics/skills/issues/29) | 希望 Skills 机制可运行于 Bedrock 等非 Claude Code 环境 |
| **模块化与协议化** | [#16 将 Skills 暴露为 MCP](https://github.com/anthropics/skills/issues/16) | 通过 MCP 协议统一 Skill 的调用接口，提升可编程性 |

---

## 3. 高潜力待合并 Skills（评论活跃、近期可能落地）

| PR | Skill | 潜力分析 |
|----|-------|---------|
| [#514 document-typography](https://github.com/anthropics/skills/pull/514) | 文档排版质检 | 针对 AI 生成文档的普遍缺陷，需求明确，实现独立，合并阻力小 |
| [#723 testing-patterns](https://github.com/anthropics/skills/pull/723) | 测试模式库 | 覆盖全测试栈的完整方法论，社区贡献完整度高 |
| [#525 pyxel 游戏开发](https://github.com/anthropics/skills/pull/525) | 复古游戏开发 | 官方仓库作者亲自提交，持续跟进更新（最近 2026-07-15） |
| [#1367 self-audit](https://github.com/anthropics/skills/pull/1367) | 交付前自审（机械验证 + 四维推理审计） | 契合质量保障需求，v1.3.0 迭代成熟，且已拆出 [#1385 Proposal](https://github.com/anthropics/skills/issues/1385) 获得社区讨论 |
| [#1302 color-expert](https://github.com/anthropics/skills/pull/1302) | 色彩专业知识 | 内容完备（7 月 21 日仍活跃更新），设计类用户价值明确 |
| [#83 质量/安全分析器](https://github.com/anthropics/skills/pull/83) | 元技能（Skill 的 Skill） | 与社区对 Skill 质量/安全的关注（Issue #492）形成呼应，讨论热度持续 |
| [#1479 plan-file-hygiene](https://github.com/anthropics/skills/pull/1479) | 规划文件生命周期管理 | 直指规划产物堆积无生命周期的痛点，响应 Issue #1417，社区协作充分 |

---

## 4. Skills 生态洞察

> **社区最集中的诉求是 skill-creator 工具链的可靠性——`run_eval.py` 在 Windows 上的系统性故障导致所有技能描述的 recall 恒为 0%，当前优化循环实际在"对噪音做优化"；其次是安全治理（社区技能混入官方命名空间）与上下文效率（claude-api 注入 156k tokens）两大信任与性能瓶颈。** 新技能方向则偏向**文档排版质检、测试模式库、交付前自审**等质量保障类能力。

---

# Claude Code 社区动态日报 — 2026-08-10

## 今日速览

过去 24 小时内无新版本发布，社区焦点集中在密集的 **ClAudit 安全过滤器误报**问题（同一用户连续提交十余条 "session-halted" 级误报）以及 **macOS 桌面应用自动更新导致会话宿主被杀**的严重故障。功能需求方面，跨目录会话恢复（#28745，76 👍）与 UI 本地化（#31413）持续获得高关注。另有 4 个 PR 在推进中，涉及安全指南模型引用更新与插件开发工具修复。

---

## 社区热点 Issues

### 🔥 高危 Bug 与稳定性

**1. [ClAudit 安全过滤器大规模误报（十余条）— #85375 ~ #85392 系列]**
同一用户 `sworrl` 连续提交超过 10 条 `[Bug][cyber]` 报告（#85375、#85379、#85381-#85392），全部指向同一模式：ClAudit 安全过滤器在正常运维/开发会话中误判为 "cybersecurity or biology"，以 **session-halted（会话中止）** 级别阻止合法工作，涉及的触发内容均为日常对话（如"[REDACTED] Operations Skill"、"fix the f*** adfs"、"Base directory for this skill..."等）。所有报告均标注 `Opus 4.8` 为判定模型，可复现且带 Request ID。社区反应：每条评论 1 条，但系列规模本身即代表严重性——**单一用户单日遭遇十几次会话中止**，说明该过滤器在生产环境中存在系统性误报问题，且用户明确表示无法用 `/model` 覆盖（见 #67246）。链接: [查看系列报告](https://github.com/anthropics/claude-code/issues?q=author%3Asworrl+label%3Acyber)

**2. [Claude Desktop (macOS) 自动更新静默杀死长驻会话宿主 — #85413]**
`ursk` 报告：桌面应用 **1.25927.0 自动更新时直接重启应用**，导致运行数日的 headless ML 任务会话宿主被无声终止。报告者强调该机器是远程无人值守场景（"sessions and jobs are expected to run for days"），且**没有任何选项可以禁用自动更新**。环境为 macOS 26.3 + Mac Studio M3 Ultra + Claude Code 2.1.221。评论 0 条但问题严重——无人值守服务器场景下自动重启等于数据丢失。链接: [#85413](https://github.com/anthropics/claude-code/issues/85413)

**3. [已拒绝的工具调用仍被执行 — #83760]**
`P6oX6GAz` 报告：在终端 CLI 中，用户对 PowerShell 工具调用选择 **"deny"** 后，该工具仍然执行了。属于权限控制失效类严重安全缺陷，目前处于 OPEN 状态，有 2 条评论。链接: [#83760](https://github.com/anthropics/claude-code/issues/83760)

**4. [VSCode fork 会话：新标签页空白且 fork 不可见 — #85008]**
`daniyalasyed` 报告：在 Extension **2.1.226** 中，fork 操作复制了对话但新标签页空白、会话列表中不显示 fork 项，且触发时**完全空闲**（非生成中）。作者指出这与已关闭的 #31831（2.1.71 版本）行为相同，但当前版本仍复现，质疑之前的 race-condition 结论不成立。链接: [#85008](https://github.com/anthropics/claude-code/issues/85008)

**5. [桌面端 30 天保留策略删除仅存副本，留下幽灵条目 — #81100]**
`claell` 报告：桌面应用 30 天清理任务会删除**唯一的** Desktop transcripts 副本，会话列表中留下"点击即报错"的幽灵条目。作者明确指出与 CLI 端的 #59248 (`data-loss` 标签) 不同、且区别于已关闭的 #62959，是新机制。当前 2 条评论。链接: [#81100](https://github.com/anthropics/claude-code/issues/81100)

### 💡 高赞功能需求

**6. [跨目录恢复会话 — #28745（76 👍）]**
`butlersrepos` 请求：当前会话与启动目录绑定，若原目录被删除/重命名（如 git worktree 清理），会话将无法恢复。希望支持从任意目录恢复历史会话。**76 个 👍 是当前数据集中用户需求度最高的一条**，11 条评论持续讨论中。链接: [#28745](https://github.com/anthropics/claude-code/issues/28745)

**7. [UI 语言本地化支持 — #31413（8 👍）]**
`HolliOnRoad` 请求为 Claude Code 界面增加多语言支持。8 👍 + 13 条评论，说明国际化需求有一定社区基础，但优先级不算最高。链接: [#31413](https://github.com/anthropics/claude-code/issues/31413)

### ⚠️ 安全过滤器相关

**8. [安全分类器切换到 Opus 4.8 后无法用 /model 覆盖 — #67246]**
`AndrewTKent` 报告：会话中途 Fable 5 安全分类器将正常工程讨论标记为"网络安全或生物"并**静默切换**模型到 Opus 4.8，且提示承认这是预期行为（"They may flag safe, normal content as well"），但**没有可行的覆盖手段**。与上述 sworrl 系列问题互为印证：安全过滤器不仅误报率高，还剥夺了用户控制权。12 条评论。链接: [#67246](https://github.com/anthropics/claude-code/issues/67246)

### 🔧 其他值得关注

**9. [插件版本解析逃逸 marketplace 根目录 — #82712]**
`kerfern` 报告：当 marketplace 无 `.git` 目录（如 GCS tarball 分发的 `claude-plugins-official`）且插件声明 `"version": null` 时，版本解析会**沿文件系统向上查找 git SHA**，最终解析到用户 `~/.claude` 的 HEAD，导致每次提交都重新 clone 整个仓库。属于依赖解析逻辑缺陷。链接: [#82712](https://github.com/anthropics/claude-code/issues/82712)

**10. [MessageDisplay hook 返回值被忽略 — #83957]**
`frasalvi` 报告：`MessageDisplay` hook 正确收到并返回了合法的 `displayContent`，但终端 CLI（2.1.221）仍渲染原始文本。hook 机制有效性存疑，目前评论 1 条，尚待官方确认。链接: [#83957](https://github.com/anthropics/claude-code/issues/83957)

---

## 重要 PR 进展

**1. [security-guidance: 默认模型引用更新至 Opus 5/Sonnet 5 — #85409]**
`petergoldstein` 提交，将 `security-guidance` 插件中硬编码的过时模型引用（Opus 4.7 默认审查模型、Sonnet 4.6 兜底）全部更新为 Opus 5 / Sonnet 5，涉及 README 与 `SECURITY_REVIEW_MODEL` 等 hook 代码。与前述安全过滤器误报问题的时间点吻合，推测新模型可能改善误报率。链接: [#85409](https://github.com/anthropics/claude-code/pull/85409)

**2. [plugin-dev: 修复 YAML 块标量 agent 描述解析 — #85323]**
`erichanwang` 修复 `validate-agent.sh` 对 `description: |` / `description: >` 多行块标量的解析缺陷——此前错误地将 `|` 标记本身当作整个描述内容。这是对 #83803 遗留问题的补充修复。链接: [#85323](https://github.com/anthropics/claude-code/pull/85323)

**3. [skills: plugin-dev 与 hookify 技能改用规范命名 — #85243]**
`bechor25` 修复 8 个内置技能中声明了含空格标题式 `name` 的问题（如 `Writing Hookify Rules` → 应为规范格式），涉及 `plugins/hookify/skills/writing-rules/SKILL.md`、`plugins/plugin-dev/skills/agent-development/SKILL.md` 等文件。链接: [#85243](https://github.com/anthropics/claude-code/pull/85243)

**4. [agent-session-commit 插件（已关闭）— #17395]**
`Olshansk` 的 PR 在 8 月 9 日被关闭。该 PR 引入 `agent-session-commit` 插件，支持通过 `/session-commit` 手动或 Stop hook 自动触发对 `AGENTS.md` 的增量迭代更新，并将 `CLAUDE.md` 改为指向 `AGENTS.md` 的指针。关闭原因未标注，但该方向（会话结束自动沉淀项目知识）值得关注。链接: [#17395](https://github.com/anthropics/claude-code/pull/17395)

---

## 功能需求趋势

从今日 Issues 中可提炼出以下社区关注方向：

1. **会话生命周期管理（高热度）**：跨目录恢复（#28745，76 👍）、桌面端会话保留策略导致数据丢失（#81100）、自动更新杀死长驻会话（#85413）——社区对**会话的持久性、可移植性与可用性**关注度最高，且涉及 CLI 与桌面端多个平台。

2. **安全过滤器可配置性（高热度）**：累计 15+ 条 Issue 指向安全分类器的**误报率与不可覆盖性**。社区的主要诉求不是取消安全机制，而是希望：① 降低误报率；② 提供 `/model` 之外的覆盖手段（#67246）；③ 对 session-halted 级别的中止提供申诉或 bypass 渠道。

3. **UI 与国际化（中等热度）**：UI 本地化（#31413）与 Remote Control 浏览器渲染（#85240）分别反映了**多语言用户群体**和**远程/移动端使用场景**的兴起。

4. **插件与技能生态规范化（持续进行）**：多个 PR 在修复技能命名规范（#85243）、YAML 解析（#85323）等问题，说明插件生态正在从"能跑"走向"规范"阶段。但插件版本解析的缺陷（#82712）暴露了 marketplace 分发机制的成熟度问题。

---

## 开发者关注点

- **安全过滤器是当前最大痛点**：`sworrl` 单日提交十余条误报报告的行为本身即是强烈的社区信号——"会话被强制中止"对开发者工作流的破坏是灾难性的，且误报内容多为日常对话（含少量俚语/口语），说明过滤器**上下文理解能力存在系统性短板**。叠加 #67246 的"无法覆盖"问题，用户在安全机制面前处于完全被动地位。

- **无人值守场景缺乏保护**：#85413（自动更新重启）与 #81100（30 天保留删除唯一副本）共同指向一个被忽视的使用场景——**远程/无人值守的长期运行任务**。对于这类用户，任何静默重启或数据清理都是不可接受的。建议关注 `--headless` 模式或守护进程支持的需求。

- **历史遗留 Bug 在最新版本复现**：#85008（VSCode fork）与 #83397（hook 返回值被忽略）均指向 2.1.22x 系列版本仍存在老问题，开发者对"关闭 duplicate 但未真正修复"的维护策略表示质疑，期待官方对复现路径进行更严谨的验证。

- **hooks 机制的可信度**：#83957 中 hook 正确执行并返回合法值但结果被无视，这与 #85008 的 fork 失效共同引发了对扩展机制内部一致性的疑虑。

---

*数据来源：[github.com/anthropics/claude-code](https://github.com/anthropics/claude-code) | 统计时间：2026-08-10*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

### 今日速览

过去 24 小时，OpenAI Codex 社区无新版本发布，但 Issue 与 PR 活动频繁。核心焦点集中在 **Windows 桌面端崩溃与功能异常**（电脑使用、终端集成）及 **macOS 桌面端性能回归**（线程切换慢、崩溃）。此外，开发者对 **自定义状态栏** 与 **跨平台聊天记录同步** 的呼声依然居高。代码侧有一批稳健的修复 PR 合并，涉及 Cursor 项目路径解析、gRPC TCP 传输等。

---

### 版本发布

过去 24 小时内无新的 Codex 版本发布。

---

### 社区热点 Issues

挑选了 10 个近期更新频繁、社区反响较大的 Issue，供开发者重点关注：

1.  **自定义状态栏 (Customizable Status Line)** —— [#17827](https://github.com/openai/codex/issues/17827)
    - **热度**：👍 150，评论 39
    - **重要性**：社区呼声最高的功能请求之一。用户希望像 Claude Code 一样，在 TUI 底部通过简单脚本自定义显示 Token 用量、模型名、Git 分支等实时信息。高 👍 数表明这是一个广泛需求的通用功能。

2.  **线程切换缓慢** —— [#11011](https://github.com/openai/codex/issues/11011)
    - **热度**：👍 19，评论 21
    - **重要性**：影响 macOS 用户的严重性能回归。用户在更新后切换线程极慢且无响应，直接破坏核心使用体验。

3.  **支持入站 MCP 通知** —— [#15299](https://github.com/openai/codex/issues/15299)
    - **热度**：👍 14，评论 15
    - **重要性**：社区希望外部渠道能通过 MCP 协议主动推送消息到运行中的 Codex CLI 会话，而目前 Codex 只能调用外部工具，无法被动接收异步事件，这限制了自动化工作流的潜力。

4.  **移动端不显示 SSH 远程项目** —— [#23527](https://github.com/openai/codex/issues/23527)
    - **热度**：👍 19，评论 13
    - **重要性**：iOS 用户反馈，通过 Codex 移动端连接 Mac 主机后，无法在项目选择器中看到 Mac 上已配置的 SSH 远程项目，移动办公体验受阻。

5.  **跨平台聊天记录同步** —— [#5609](https://github.com/openai/codex/issues/5609)
    - **热度**：👍 63，评论 6
    - **重要性**：这是解决 **碎片化体验** 的关键需求。用户希望在 ChatGPT 网页端、VS Code 扩展和桌面应用之间同步聊天记录，实现无缝切换工作环境。

6.  **Windows WSL 集成终端静默失败** —— [#37104](https://github.com/openai/codex/issues/37104)
    - **热度**：👍 1，评论 6
    - **重要性**：新近报告的严重 Bug。更新至 26.730.8199.0 后，在 Windows 下集成终端（PTY/WSL）静默失败，且底部和侧边栏均无法打开，导致应用基本不可用。

7.  **打开未加载的聊天有 5 秒延迟** —— [#37398](https://github.com/openai/codex/issues/37398)
    - **热度**：👍 6，评论 6
    - **重要性**：尽管实际的线程加载仅需 200ms，但桌面端在显示任何未加载的本地聊天前，会等待约 5 秒的固定超时。这个明显的性能瓶颈被社区细心地追踪到了 "owner-discovery" 逻辑上。

8.  **~/.codex/skills/.system 目录间歇性丢失** —— [#19265](https://github.com/openai/codex/issues/19265)
    - **热度**：👍 6，评论 5
    - **重要性**：后台进程会随机删除系统技能目录，导致新回合中的内置技能（如 `imagegen`）不可用，属严重影响功能稳定性的数据丢失问题。

9.  **模型别名配置映射** —— [#21594](https://github.com/openai/codex/issues/21594)
    - **热度**：👍 1，评论 2
    - **重要性**：企业级用户强烈需求。希望能在配置中加入 `model_aliases` 映射，将企业网关的模型名称对应到 Codex 标准模型元数据，以突破自定义模型集成的障碍。

10. **子代理线程接受修正** —— [#33885](https://github.com/openai/codex/issues/33885)
    - **热度**：👍 6，评论 2
    - **重要性**：多代理模式下，父线程的子代理线程被设为只读，导致用户无法对子代理进行中途修正或引导。这限制了复杂多代理任务的交互性和可控性。

---

### 重要 PR 进展

以下 PR 过去 24 小时内在代码库有更新，多数为合并入主分支的修复，稳健地推进了 Codex 的体验与基础设施：

1.  **收紧 Cursor 项目路径解析** —— [#37747](https://github.com/openai/codex/pull/37747) *(已合并)*
    - **内容**：修复了在解析 Cursor 项目名时可能递归扫描巨大目录树的安全/性能隐患，改为探测一组有界的路径候选集。**重要性**：防止卡顿与不必要的资源消耗。

2.  **为 code-mode 主机添加 gRPC TCP 传输** —— [#37745](https://github.com/openai/codex/pull/37745) *(已合并)*
    - **内容**：为 `--listen` 参数扩展了对 `grpc://IP:PORT` 的支持，允许通过 TCP 承载既有服务。**重要性**：为 Codex 的远程执行与分布式集成了新的传输选项。

3.  **报告会话配置导入失败的 I/O 子类型** —— [#37723](https://github.com/openai/codex/pull/37723) *(已合并)*
    - **内容**：在 `failed_to_load_session_config` 错误报告中附加了更具体的 `std::io::ErrorKind`（如 `invalid_data`、`not_found`）。**重要性**：显著提高了诊断会话配置加载问题的可观测性。

4.  **保持换行后的空白符贴合文本** —— [#37709](https://github.com/openai/codex/pull/37709) *(已合并)*
    - **内容**：修复了 TUI 编辑器（Composer）中，溢出空白符可能占独立空行排列的问题。**重要性**：打磨了终端 UI 的视觉体验，提升了内容排版的准确性。

5.  **声明环境配置读取能力** —— [#37654](https://github.com/openai/codex/pull/37654) *(已合并)*
    - **内容**：在 exec-server 能力组件中新增 `environmentConfigRead`，并将其作为本地执行器的默认能力。**重要性**：这是完善 exec-server 能力协商机制的一环，为后续环境配置读取功能铺路。

6.  **自动化更新 models.json** —— [#31817](https://github.com/openai/codex/pull/31817) *(进行中)*
    - **内容**：机器人自动提交的模型元数据更新。**重要性**：持续跟进 OpenAI 最新模型，确保 CLI 与 IDE 能识别并使用新模型。

---

### 功能需求趋势

分析近期的 Issue 讨论，社区最关注的功能方向集中在以下几个方面：

- **终端 UI (TUI) 可定制化**：超越默认布局，提供自定义状态栏、主题等选项，以满足用户的个性化工作流与信息展示需求。
- **跨平台与跨端无缝体验**：用户期望在 ChatGPT 网页端、桌面 App、移动端和 IDE 扩展之间同步会话记录、项目状态，实现真正的 "随处可用"。
- **远程开发与多环境支持**：SSH 远程项目在移动端的可见性问题被频繁提及，表明远程开发工作流在用户中的占比逐渐提高。
- **自动化与触发机制的完善**：用户希望自动化任务具备更智能的错过后补跑（catch-up）策略，并且在执行时能根据上下文自动收尾，避免无进展的死循环。
- **MCP (Model Context Protocol) 协议的深度集成**：不仅仅满足于调用外部工具，更期望支持入站通知，将 Codex 置于由外部事件驱动的自动化体系之中。
- **企业级配置与网关适配**：针对企业用户，希望 Codex 能更好地适配自定义的模型网关与命名映射，降低内部系统集成的复杂度。

---

### 开发者关注点

从高频 Bug 反馈和痛点中，可以提炼出以下核心问题：

- **桌面端性能与稳定性**：性能问题是目前最集中的痛点。这既包括 macOS 端的线程切换慢、启动崩溃，也包含 Windows 端集成终端失效、应用静默崩溃等严重问题。这提示桌面客户端（基于 Electron/WebView 架构）的性能和稳定性优化依然任重道远。
- **Windows 平台支持质量**：大量 Issue 专门标记为 `windows-os`，覆盖了终端集成、文件系统监控、`EnumWindows` 调用失败等多个方面。Windows 用户在功能完整性和系统级兼容性上的体验明显落后于 macOS。
- **多代理 (MultiAgent) 交互限制**：随着多代理功能的推进，开发者开始关注其交互细节。子代理线程的只读属性限制了母线程对子线程的实时干预，这一设计在复杂的协作式开发场景中暴露出灵活性不足的问题。
- **数据与状态一致性**：系统技能目录被意外删除、日志数据库无限增长不回收空间等问题，反映出内部状态管理在边界情况的处理上存在缺陷，威胁到开发环境的长期稳定运行。
- **网络与传输层韧性**：在空闲时遭遇网络波动后，CLI 复用了失效的 WebSocket 连接，导致下一次对话失败。这表明网络层需要更健壮的连接保活与重连机制。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-08-10

## 今日速览

今日发布 v0.56.0 新一夜构建版本，核心变化仍集中在 Agent 子系统的稳定性与行为优化上。社区讨论热度最高的依然是**子代理（Subagent）在达到 MAX_TURNS 后误报成功**、**通用代理（Generalist agent）挂起**以及**Shell 命令执行后卡在“等待输入”**等 P1 级问题。值得关注的是，近期出现一批针对 **Auto Memory** 系统缺陷的集中反馈，以及一项允许子代理递归调用其他子代理的 PR 已提交，或将成为 Agent 协作能力的重要转折点。

---

## 版本发布

**v0.56.0-nightly.20260810.gcf22ac7e8**
- 仅例行 nightly 版本号变更，无公开特性说明。
- 完整变更记录见 [Compare v0.56.0-nightly.20260809...20260810](https://github.com/google-gemini/gemini-cli/compare/v0.56.0-nightly.20260809.gcf22ac7e8...v0.56.0-nightly.20260810.gcf22ac7e8)

---

## 社区热点 Issues（Top 10）

1. **[#22323] Subagent recovery after MAX_TURNS 误报为 GOAL 成功**（P1, bug, 12 评论）
   `codebase_investigator` 子代理在达到最大轮次前未做任何分析，却以 `success` / `GOAL` 状态返回，导致主代理误判任务完成。
   **影响**：直接破坏多代理协作可靠性。
   [GitHub](https://github.com/google-gemini/gemini-cli/issues/22323)

2. **[#21409] Generalist agent 无限挂起**（P1, bug, 8 评论, 👍8）
   简单操作（如创建文件夹）一旦交由通用代理便永久卡住，用户最长等待 1 小时无响应；显式禁止使用子代理可规避。
   **影响**：高赞高频痛点，严重削弱开箱即用体验。
   [GitHub](https://github.com/google-gemini/gemini-cli/issues/21409)

3. **[#25166] Shell 命令执行完成后卡在 "Waiting input"**（P1, bug, 4 评论, 👍3）
   极简命令（无需交互）执行完毕仍显示活动并等待输入，属高频复现性 P1 缺陷。
   [GitHub](https://github.com/google-gemini/gemini-cli/issues/25166)

4. **[#21983] Browser subagent 在 Wayland 下失败**（P1, bug, 4 评论）
   浏览器子代理在 Wayland 会话中直接以 GOAL 状态退出但实际未完成工作。
   [GitHub](https://github.com/google-gemini/gemini-cli/issues/21983)

5. **[#22093] v0.33.0 起子代理绕过权限配置自动运行**（P2, bug, 3 评论）
   用户明确在配置中禁用 Agents 后，子代理仍被自动调用并执行操作，涉及权限沙箱边界。
   [GitHub](https://github.com/google-gemini/gemini-cli/issues/22093)

6. **[#26522] Auto Memory 对低信号会话无限重试**（P2, bug, 5 评论）
   后台提取代理若判定某会话为低信号并跳过，该会话将永不标记为已处理，导致被反复召回重试。
   [GitHub](https://github.com/google-gemini/gemini-cli/issues/26522)

7. **[#26525] Auto Memory 在内容进入模型上下文后才脱敏**（P2, security, 4 评论）
   提取提示词要求模型对机密做脱敏处理，但此时内容已发送至模型上下文中；同时服务会记录现有技能文件数据，存在隐私泄露隐患。
   [GitHub](https://github.com/google-gemini/gemini-cli/issues/26525)

8. **[#24246] 工具数量超过 128 个时遭遇 400 错误**（P2, bug, 3 评论）
   工具列表超限后 API 报错，期望模型能按需裁剪工具范围而非全部加载。
   **影响**：随 MCP 生态扩展，工具数量膨胀是必然趋势。
   [GitHub](https://github.com/google-gemini/gemini-cli/issues/24246)

9. **[#1095] git commit 消息反引号格式错乱**（P2, bug, 5 评论, 👍2）
   虽疑似模型底层问题，但持续数月未修复，属于长期困扰用户的低阶体验问题。
   [GitHub](https://github.com/google-gemini/gemini-cli/issues/1095)

10. **[#26516] 记忆系统缺陷与质量改进合集**（P2, bug, 2 评论）
    以 tracking issue 形式汇总 Auto Memory 相关已知问题，建议关注其子项进展。
    [GitHub](https://github.com/google-gemini/gemini-cli/issues/26516)

---

## 重要 PR 进展（Top 10）

1. **[#28744] fix(acp): 恢复会话前不启动新 chat，避免污染会话文件**（P1, size/m）
   修复 `loadSession` 在 `resumeChat` 前错误调用 `initialize()` 导致会话上下文被污染的问题，关闭 #28693。
   [GitHub](https://github.com/google-gemini/gemini-cli/pull/28744)

2. **[#28738] 允许代理调用代理（Agent-to-Agent）**（P2, size/l, help wanted）
   通过 `tools:` frontmatter 实现子代理递归或委托调用其他子代理（修复 #22092）。若合入，将开启多层级代理协作能力。
   [GitHub](https://github.com/google-gemini/gemini-cli/pull/28738)

3. **[#28743] fix(core): 保留模型解析后的 systemInstruction 与 tools 配置**（size/m）
   修复 `sendMessageStream()` 中已解析配置被聊天级默认值覆盖的问题。
   [GitHub](https://github.com/google-gemini/gemini-cli/pull/28743)

4. **[#26540] fix(core): 解决策略引擎阻止工具审批持久化的缺陷**（P1, size/s, maintainer only）
   修复正则空字节匹配错误，避免 YOLO / AUTO_EDIT 模式下出现冗余审批提示。
   [GitHub](https://github.com/google-gemini/gemini-cli/pull/26540)

5. **[#28747] chore(deps): @a2a-js/sdk 0.3.11 → 1.0.1**（size/m）
   A2A（Agent-to-Agent）协议 SDK 升至 1.0 正式版，或为代理间通信铺路。
   [GitHub](https://github.com/google-gemini/gemini-cli/pull/28747)

6. **[#28752] chore(deps): puppeteer-core 24.0.0 → 25.4.0**（size/l）
   浏览器子代理底层升级，可能改善 Wayland / 会话恢复等问题。
   [GitHub](https://github.com/google-gemini/gemini-cli/pull/28752)

7. **[#28749] chore(deps): @google/genai 1.30.0 → 2.15.0**（size/s）
   GenAI SDK 跨大版本升级。
   [GitHub](https://github.com/google-gemini/gemini-cli/pull/28749)

8. **[#28746] chore(deps): npm-dependencies 批量更新 74 项**（size/xl）
   含 simple-git、MCP SDK 等核心依赖的大规模升级。
   [GitHub](https://github.com/google-gemini/gemini-cli/pull/28746)

9. **[#28757] chore(deps): js-yaml 4.1.1 → 5.2.3**（size/s）
   依赖例行升级。
   [GitHub](https://github.com/google-gemini/gemini-cli/pull/28757)

10. **[#28742] fix(caretaker-agent): 技能命名遵循 Agent Skills 规范**（size/s）
    将下划线命名修复为符合规范的连字符命名。
    [GitHub](https://github.com/google-gemini/gemini-cli/pull/28742)

---

## 功能需求趋势

1. **子代理自主性与协作能力**
   - 允许子代理调用其他子代理（PR #28738）
   - 子代理轨迹可见性与共享（#22598）
   - 提升子代理对自身 CLI 机制的认知（#21432）

2. **浏览器代理稳定性与配置一致性**
   - 自动接管与锁恢复（#22232）
   - 修复忽略 settings.json 覆盖（#22267）
   - 解决 Wayland 兼容性（#21983）

3. **Auto Memory 安全性、健壮性与可观测性**
   - 内容脱敏前置（#26525）
   - 隔离无效补丁（#26523）
   - 退出低信号会话重试循环（#26522）

4. **模型上下文与工具数量可扩展性**
   - 工具超过 128 个报 400 错误（#24246）
   - AST 感知文件读取与代码库映射（#22745 / #22746）

5. **更安全的 Agent 执行行为**
   - 阻止破坏性 git 命令与危险资源操作（#22672）
   - 子代理必须遵守权限配置（#22093）

---

## 开发者关注点

1. **可靠性 > 新特性**：高频 P1 问题集中在 `挂起`、`误报成功`、`卡在等待输入` 三类；用户更期待稳定性修复而非新功能。
2. **权限边界被突破**：v0.33.0 起部分版本存在子代理绕过用户显式禁用配置的问题，引发对安全沙箱的信任危机。
3. **隐私与安全前置需求**：Auto Memory 的“先发送后脱敏”设计引发用户强烈关注，要求将安全机制前置并减少敏感日志输出。
4. **MCP 生态扩展带来的维度压力**：工具数量增长已开始触发 API 长度限制，社区期望更智能的动态工具裁减机制。
5. **终端交互体验细节**：编辑器退出后花屏（#24935）、终端 resize 闪烁（#21924）等低阶但高频的体验问题持续被标记为 need-information，说明 UI 层打磨优先级偏低但呼声不低。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

## GitHub Copilot CLI 社区动态日报 — 2026-08-10

### 今日速览

今日社区活跃度极高，过去 24 小时内涌现了超过 20 条新 Issue，其中超过 10 条处于 triage 阶段，涉及 MCP 初始化/认证、模型可用性、并行工具调用正确性等多个核心领域。**MCP（Model Context Protocol）生态问题成为今日绝对焦点**，包括固定 60 秒握手超时无重试、OAuth 3LO 流程失败、managed-settings 空允许列表导致用户 MCP 服务器被误删等多项严重缺陷。此外，**多个用户报告 Claude 系列模型在 CLI 中被禁用**，尽管组织设置中已启用，疑似服务端配置或权限同步问题。另有数个新功能请求（如 Auto-mode 模型范围配置、可配置 HUD、中文 UI 本地化）反映了社区对 CLI 可定制性和可用性的持续需求。

### 社区热点 Issues（10 个）

**1. MCP initialize 握手固定 60 秒超时且无重试，npx 启动服务器约 29% 会话失败**（#4421）
[链接](https://github.com/github/copilot-cli/issues/4421)
- 硬编码 60 秒预算，超时后服务器在整个会话中不再复活，无重试机制。对依赖 npx 下载的 stdio 服务器影响显著，社区请求可配置超时和自动重试。

**2. 所有 Claude 模型在 CLI 模型选择下被禁用**（#4422）
[链接](https://github.com/github/copilot-cli/issues/4422)
- 用户报告 Enterprise 账户中 Claude 模型（sonnet 5、4.8 等）今日突然报 “This model is disabled”，但 GitHub 设置中显示已启用，回滚版本无效。与 #4390（组织启用模型缺失）高度相关，疑似服务端模型目录同步问题。

**3. 并行工具调用响应顺序非确定性，导致智能体行为混乱**（#4420）
[链接](https://github.com/github/copilot-cli/issues/4420)
- Copilot harness 未能保持并行工具请求与响应的关联性，可能返回无请求的响应或错误关联，会直接导致 multi-agent 协同逻辑出错。

**4. Managed-settings 过渡期空允许列表导致用户 MCP 服务器被永久丢弃**（#4419）
[链接](https://github.com/github/copilot-cli/issues/4419)
- 解析管理设置期间安装 `managedAllowedMcpServerLists: [[]]` 的临时“全部拒绝”策略，该窗口内注册的用户 MCP 服务器被拒绝且无法恢复。社区进一步指出，其他 CLI 也经历过类似问题。

**5. MCP OAuth 3LO（授权码）流程失败，报错 -32042**（#4371）
[链接](https://github.com/github/copilot-cli/issues/4371)
- 连接到配置了 OAuth 3LO 的 MCP Gateway 时工具调用失败，CLI 不支持所需 URL elicitation。阻断使用私有/企业 MCP Gateway 的用户。

**6. 并行 explore 子代理扇出触发单模型 429 限流**（#4416）
[链接](https://github.com/github/copilot-cli/issues/4416)
- 所有 explore 子代理默认使用 `claude-haiku-4.5`，并行调用集中打爆单模型限流，无退避策略，尽管存在 `eligibleForAutoSwitch` 标记但未生效。

**7. `/remote` 不支持非 GitHub 仓库（GitLab、Bitbucket 等）**（#2922）
[链接](https://github.com/github/copilot-cli/issues/2922)
- 长期需求，希望远程会话控制不依赖 git host，允许在任何代码托管平台使用 GitHub 账户进行会话控制，目前仅支持 GitHub 仓库。

**8. CLI 高 CPU 占用：等待 sleep 操作时单核 100%**（#4415）
[链接](https://github.com/github/copilot-cli/issues/4415)
- 仅等待子进程 sleep 时 CPU 占用 100%，说明存在忙等待或事件循环 bug，影响闲置场景的资源使用。

**9. BYOK 自定义 Provider 返回本地 403，请求未达实际 Provider**（#4414）
[链接](https://github.com/github/copilot-cli/issues/4414)
- 配置自定义 OpenAI/Anthropic 兼容 Provider 后所有请求报本地 403 且提示 `/login`，但请求从未到达 Provider。BYOK（Bring Your Own Key）用户被完全阻断。

**10. Copilot CLI 1.0.79-1 与 FastMCP 的 `server/discover` 兼容性问题**（#4370）
[链接](https://github.com/github/copilot-cli/issues/4370)
- CLI 初始化前发送非标准 `server/discover`，FastMCP 返回 -32602 后被视为致命错误。反映了 CLI 在 MCP 标准兼容性方面的问题。

---

### 重要 PR 进展

过去 24 小时内无新增 Pull Request 或更新。

### 功能需求趋势

*   **MCP 生态成熟度**：社区强烈关注 MCP 的初始化可靠性（超时、重试）、认证流程（OAuth 3LO）、标准协议兼容性及配置管理，反映出 MCP 是当前 CLI 集成能力的核心短板，也是用户最热切期望改进的方向。
*   **模型与配置灵活性**：用户对模型选择（如 Auto-mode 设置模型强度偏好）、BYOK 自定义 Provider 以及组织级模型同步的诉求集中爆发，表明用户需要更精细的控制和对服务端配置的可观测性。
*   **可用性与 UI/UX**：包括中文（zh-CN）UI 本地化、浮窗 GUI 提示输入器、可配置 HUD（会话状态展示）等需求，显示 CLI 用户群正从纯终端用户向更广泛开发者扩展，需要更友好的交互界面。
*   **远程会话与仓库兼容性**：`/remote` 对非 GitHub 仓库（GitLab、Bitbucket）的支持呼声持续存在，用户希望远程会话能力与代码托管平台解耦。
*   **健壮性与资源利用**：针对 CPU 高占用、并行工具调用一致性、消息队列管理（取消/移除排队消息）的反馈，说明用户对 CLI 在复杂工作负载下的稳定性和资源效率有更高要求。

### 开发者关注点

*   **MCP 服务器连接失败是最高频痛点**：从固定超时、OAuth 3LO 失败、`server/discover` 非标准请求到 managed-settings 误杀用户服务器，多个 issue 均指向 MCP 客户端实现的可靠性和标准符合度不足，严重影响依赖 MCP 生态的用户。
*   **模型“幽灵禁用”问题**：多个用户报告组织已启用的模型（特别是 Claude 系列）在 CLI 中不可用，且无明确原因或修复手段，提示服务端模型目录与客户端配置同步存在 bug，对于企业用户影响尤为严重。
*   **配置与状态缺乏可观测性**：用户在 `cli_remote_control_enabled` 为 false 时无法获得任何提示、BYOK Provider 被本地 403 阻断且无法诊断，说明 CLI 在错误报告和配置生效机制上需要更透明。

> 注：`cli_remote_control_enabled: false` 无提示的 Issue 见：[#4409](https://github.com/github/copilot-cli/issues/4409)

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报

**2026-08-10** | 数据来源：[MoonshotAI/kimi-cli](https://github.com/MoonshotAI/kimi-cli)

---

## 今日速览

过去24小时无新版本发布，但社区活跃度集中在两个关键议题上：一是长时间悬而未决的**跨会话记忆系统**需求（Issue #1283）再次获得更新，呼声持续走高；二是新提交的 **ACP/print 流式响应静默挂死**严重 Bug（Issue #2598）直指 0.31.1 版本修复不彻底，引发对 ACP 模式稳定性的关注。另有一个修复 Google GenAI 与 MCP 工具兼容性的 PR 仍在推进中。

---

## 社区热点 Issues

### 1. [Feature Request: Memory System - Persistent context across sessions](https://github.com/MoonshotAI/kimi-cli Issue #1283) ⭐ 最热
- **作者**: CatKang | **创建**: 2026-02-27 | **更新**: 2026-08-09 | **评论**: 27
- **为什么重要**: 这是目前社区呼声最高的功能请求，距今已悬置近半年。用户迫切希望 CLI 能跨会话记住项目上下文、代码风格与用户偏好，涵盖 AI 自动记忆与手动指令两种模式，本质上是在要求"有状态的 Agent"体验。
- **社区反应**: 27 条评论持续讨论，说明开发者对 AI 编程工具的期望正从"单次问答"转向"长期协作伙伴"。

### 2. [ACP/print 流式响应静默挂死：无空闲超时、被顶替轮 partial 不落 wire（0.31.1 只覆盖 Esc 场景）](https://github.com/MoonshotAI/kimi-cli Issue #2598) 🔥 新提交
- **作者**: ai-agent-workbench | **创建**: 2026-08-09 | **更新**: 2026-08-09 | **评论**: 0
- **为什么重要**: 0.34.0 版本在 ACP 模式下流式响应存在偶发挂死——内容已全部返回但终帧（`[DONE]`）缺失，且被后续消息顶替后数据不落盘。该问题直指官方声称的 0.31.1 修复（仅覆盖 Esc 场景）不全面，且缺失空闲超时配置，对依赖 `wire.jsonl` 做调试的用户危害极大。
- **社区反应**: 刚提交暂无评论，但标题与细节描述均属高质量 Bug 报告，大概率会获得快速响应。

### 3. [Google GenAI provider 与 MCP 工具 JSON Schema 元数据冲突](https://github.com/MoonshotAI/kimi-cli Issue #734) 
- **背景**: 该 issue 是 PR #739 的关联问题，涉及使用 Exa MCP 等第三方工具时，Google GenAI 因无法识别标准 JSON Schema 字段（如 `title`、`description` 的嵌套结构）而抛错。属于 **MCP 生态互操作性** 的典型痛点。

---

## 重要 PR 进展

### 1. [fix(kosong): strip JSON Schema metadata from Google GenAI tool parameters](https://github.com/MoonshotAI/kimi-cli PR #739)
- **作者**: xiaoju111a | **创建**: 2026-01-28 | **更新**: 2026-08-09 | **状态**: OPEN
- **功能说明**: 该 PR 针对 Issue #734，修复了 Google GenAI provider 对 MCP 工具参数中多余 JSON Schema 元数据的兼容性问题。通过剥离 `title`/`description` 等冗余字段，解决 Google API 的校验失败。
- **意义**: 若合并，将直接解锁 **Gemini 用户使用 MCP 工具链** 的完整能力。PR 已存在超半年，昨日仍获更新，说明作者仍在积极维护。

---

## 功能需求趋势

截至今日，从所有活跃 Issues 中提炼出的社区关注方向：

| 需求方向 | 代表 Issue | 热度 |
|---------|-----------|------|
| **跨会话记忆/状态持久化** | #1283（Memory System） | 🔥🔥🔥 极高 |
| **ACP 流式稳定性与超时控制** | #2598（静默挂死） | 🔥🔥🔥 极高（严重 Bug） |
| **MCP 生态兼容性** | #734 / #739（Google GenAI 冲突） | 🔥🔥 高 |
| **上下文管理与长会话支持** | 与 #1283 强关联 | 🔥🔥 中高 |
| **模型服务商适配** | Google GenAI / 更多 provider 接入 | 🔥🔥 中高 |

---

## 开发者关注点

1. **"内隐记忆"是刚需**：开发者不满足于每次开启会话都从零开始，希望 CLI 能自动积累项目知识库，并支持手动注入长期指令。这已成为衡量 AI 编程工具"智能感"的核心指标。
2. **ACP 协议的可观测性不足**：流式传输缺少空闲超时保护、数据完整性依赖 `wire.jsonl` 落盘，一旦异常静默，调试成本极高。社区对"防挂死兜底机制"和"强制刷盘策略"存在明确诉求。
3. **第三方程模型+工具的打通进度偏慢**：Google GenAI 与 MCP 的适配问题从 1 月拖到 8 月仍为 OPEN，开源社区对官方响应速度已有微词；中间件兼容性正成为用户选择主要模型供应商时的决策变量。

---

> 报告生成时间：2026-08-10 | 数据基于 GitHub 公开动态，仅反映当日快照。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-08-10

## 今日速览

OpenCode Go 的 `deepseek-v4-flash` 模型因网关在模型名中注入前导空格导致 HTTP 400 错误，成为今日最集中的故障热点（关联 #41300、#41306、#41314、#41322 多个 issue），目前官方已关闭部分工单但问题确认仍未彻底修复。核心开发方面，V2 分支持续滚动合并（#41460），并有一批 7 月的 PR 完成自动清理合并，包含嵌套子代理权限弹窗修复、工作区切换等实质性改进。性能优化方面出现一个值得关注的 PR（#40427），声称将初始渲染内存占用降低 75.5%。

## 版本发布

过去 24 小时内无新版本发布。当前社区反馈主要针对 v1.18.14 / v1.18.15 和 1.17.11。

## 社区热点 Issues

1. **#4283 — 复制到剪贴板功能失效**（评论 122，👍 110）
  用户选择回复文本后无法复制到剪贴板，反馈者提供了系统信息与复现步骤。社区热度极高但官方尚未给出修复方案。
  https://github.com/anomalyco/opencode/issues/4283

2. **#7602 — [特性] 原生模型故障转移/回退支持**（评论 29，👍 107）
  社区强需求：目前仅在模型 ID 相同时支持 Provider 级回退，无法定义“模型 A 出错自动回退到模型 B”的策略。长时运行代理场景受影响明显。
  https://github.com/anomalyco/opencode/issues/7602

3. **#785 — 如何禁用流式模式？**（评论 29，👍 38）
  部分代理提供商不支持流式响应导致调用报错，用户希望提供关闭流式的选项。该问题从 2025 年 7 月持续至今仍未解决。
  https://github.com/anomalyco/opencode/issues/785

4. **#24649 — [已关闭] 澄清 Go 订阅中自托管与第三方代理模型的区分**（评论 17，👍 32）
  用户质疑 OpenCode Go 文档中关于基础设施的说明，要求明确哪些模型自托管、哪些经第三方转发。涉及定价可信度问题。
  https://github.com/anomalyco/opencode/issues/24649

5. **#12472 — Claude Code Hooks 原生兼容（PreToolUse/PostToolUse/Stop）**（评论 17，👍 38）
  OpenCode 已兼容 Claude Code 的 rules 和 skills，但 hooks 系统仍然缺失。对从 Claude Code 迁移的用户是明显阻力点。
  https://github.com/anomalyco/opencode/issues/12472

6. **#34743 — Xcode 27 beta 2 中 ACP 忽略 opencode.json 配置**（评论 15）
  在 Xcode 集成场景下，自定义 ACP 代理使用默认模型而非 `opencode.json` 中指定的模型（LMStudio/Ollama 均复现）。
  https://github.com/anomalyco/opencode/issues/34743

7. **#13715 — 嵌套子代理权限请求静默挂起**（评论 11，👍 24）
  子代理生成子代理时，权限弹窗未在 TUI 中渲染，会话无限等待。今日已有修复 PR（#36046）合入。
  https://github.com/anomalyco/opencode/issues/13715

8. **#30221 — OpenCode Go 订阅全部会话报 “terminated” 错误**（评论 9，👍 4）
  Go 订阅下所有活跃会话持续中断，而直连 Deepseek 或 Z.AI API 无此问题，指向网关侧故障。
  https://github.com/anomalyco/opencode/issues/30221

9. **#27361 — 无头模式下 openai-compatible provider 的 options 未透传**（评论 6，👍 4）
  `reasoning.effort` 等模型参数在 `opencode run --format json` 场景被静默丢弃，影响 OpenRouter 用户。
  https://github.com/anomalyco/opencode/issues/27361

10. **#41300 — deepseek-v4-flash 模型名前导空格导致 400**（评论 6）
  OpenCode Go 网关将 `model: "deepseek-v4-flash"` 转发为 `" deepseek-v4-flash"` 而失败。同批问题见 #41306、#41314、#41322。
  https://github.com/anomalyco/opencode/issues/41300

## 重要 PR 进展

1. **#41460 — chore: merge dev into v2**（机器人维护）
  持续同步 dev 分支到 V2，覆盖 App/Desktop/Core/TUI 架构，保留 RTL、本地化、会话时间排序、原生 V2 导出等行为。后端架构演进的核心通道。
  https://github.com/anomalyco/opencode/pull/41460

2. **#37584 — 固定会话溢出压缩循环次数**（修复 #27924）
  当 provider 持续报上下文溢出时，压缩重试有界化，防止 prompt 执行循环陷入无界重试。
  https://github.com/anomalyco/opencode/pull/37584

3. **#40427 —[实验] 渲染性能优化**（作者：Hona）
  基于不可变数据库快照的性能方案，初始渲染内存占用从 7.45 MB 降至 1.82 MB（-75.5%），当前处于 beta 评估阶段。
  https://github.com/anomalyco/opencode/pull/40427

4. **#41450 — 空消息 AI SDK 错误的兜底处理**（作者：rekram1-node）
  当 `AI_APICallError` 的 message 为空时，从 statusCode、响应体、限流头等结构化字段推导错误详情，解决 TUI 显示空错误的问题。
  https://github.com/anomalyco/opencode/pull/41450

5. **#41455 — TUI 模型上下文中包含附件路径**（修复 #41454）
  将本地附件的 `source.path` 以文本形式置于二进制图片之前，便于基于路径的 MCP 工具读取粘贴的图片。
  https://github.com/anomalyco/opencode/pull/41455

6. **#36046 — 嵌套子代理链的权限弹窗修复**（关闭 #13715）
  `children()` memo 不再只收集直接子代，递归展示深层子代理的权限请求，解决会话挂起问题。
  https://github.com/anomalyco/opencode/pull/36046

7. **#36052 — 基于 Worktree 的工作区切换与 stash 跳跃**（新特性）
  新增 `opencode worktree create|list|remove` CLI 子命令，基于 Git worktree 实现工作区快速切换。
  https://github.com/anomalyco/opencode/pull/36052

8. **#36042 — TUI 侧边栏显示子代理状态**（新特性，关联 #4865/#25712）
  内置 TUI 侧边栏新板块展示子代理启动的 child session 及其状态，提升多代理场景可观测性。
  https://github.com/anomalyco/opencode/pull/36042

9. **#36051 — 修复剪贴板图片路径丢失**（关闭 #17771）
  路径类 MCP 工具（如图像读取器）需要本地文件路径，但粘贴图片经常丢失路径信息，此修复确保路径正确传递。
  https://github.com/anomalyco/opencode/pull/36051

10. **#36068 — 兼容 Ollama 的 reasoning 字段**（Bug 修复）
  Ollama `/v1/chat/completions` 输出 reasoning 用的是 `reasoning` 字段而非 DeepSeek 的 `reasoning_content`，Schema 会丢弃未知键，此 PR 补齐兼容。
  https://github.com/anomalyco/opencode/pull/36068

## 功能需求趋势

- **模型回退/容错机制**：#7602 获得 107 👍，是当前呼声最高的架构级特性。用户需要跨模型（而非仅跨 provider）的自动 fallback，以应对限流和单点故障。
- **无流式模式支持**：#785 持续悬而未决，代理网关不支持 SSE 的用户被完全阻断，开关化流式已成为基础可用性诉求。
- **Claude Code 生态兼容延伸**：#12472（hooks）延续了已有 rules/skills 兼容路线，用户在向 OpenCode 迁移时希望 hooks 也能直接复用。
- **持久化会话与记忆**：#41453 提出后台常驻会话守护进程与零工具调用的记忆召回，与 #23775 等旧 issue 重叠，反映用户对上下文连续性的需求。
- **IDE/编辑器集成深度**：#34743（Xcode ACP 忽略配置）、#39588（VS Code 扩展无法复制粘贴）说明桌面端集成仍是薄弱环节。

## 开发者关注点

- **OpenCode Go 网关稳定性是当前最大信任危机**：deepseek-v4-flash 前导空格错误（#41300）、全会话 terminated（#30221）、付费后订阅未激活（#41430）三线并发，直接影响付费用户信心。多个用户已通过 curl 验证问题出在服务端而非客户端配置。
- **剪贴板/复制粘贴功能反复出问题**：#4283（主界面）、#39588（VS Code 扩展）两条独立链路均报失效，该基础功能的多端回归值得关注。
- **自定义 provider 参数透传不可靠**：#27361（reasoning 参数被丢弃）与 #41294（v1.17.11 上仍复现）表明 `opencode.json` 中的模型 options 在无头模式或自定义 provider 下并不可靠。
- **权限系统在复杂代理场景力不从心**：嵌套子代理权限弹窗挂起（#13715）虽已有 PR 修复，但说明代理编排深度增加后，权限交互模式需要重新设计。
- **Windows 平台问题开始密集出现**：#41436（非管理员运行卡死）、#41300（Windows 11 上报）等表明跨平台兼容性测试需加强。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 — 2026-08-10

## 今日速览

昨晚发布了 v0.21.8-nightly.20260810.55e20db328，新增 Qoder 插件扩展支持。社区围绕**多会话编排**（#8718、#8804）与**会话运行时统一**（#8775）展开热烈讨论，这两大方向或预示下一阶段架构重心。同时，多个 E2E 测试失败与发布流水线问题持续发酵，稳定性仍是社区关注重点。

## 版本发布

**v0.21.8-nightly.20260810.55e20db328**

核心变更：支持 Qoder 插件扩展（PR #8661）。CI 新增 issue 自动分派给领域负责人的机制。

## 社区热点 Issues

1. **RFC: 原生协调独立 Qwen 会话**（#8718）— P2，讨论中
   - 提议为多个独立 Qwen Code 会话增加显式协调路径：leader 可派发 2–3 个 worker 并保持交互，实时观察运行状态并收集结构化结果。8 条评论，社区对多智能体协作的架构方案高度关注。
   - https://github.com/QwenLM/qwen-code/issues/8718

2. **提案：统一基于 Turn 的 SessionRuntime 推理循环**（#8775）— P2，讨论中
   - 指出会话推理循环在 TUI、headless、ACP、serve、AgentCore 等各端独立实现，提议统一抽象。直击架构重复建设痛点，已获 2 条评论。
   - https://github.com/QwenLM/qwen-code/issues/8775

3. **Streamable HTTP：可选 GET/SSE 流被 404 拒绝导致整个 MCP 连接中断**（#8784）— P2，新 bug
   - MCP 服务器拒绝可选的通知流时，客户端未降级处理，反而杀死了整个连接。影响所有使用 Streamable HTTP 的 MCP 集成，已获 5 条评论。
   - https://github.com/QwenLM/qwen-code/issues/8784

4. **bug(sdk)：隐藏的未识别诊断事件篡改并驱逐 transcript 状态**（#8823）— P2，新报告
   - 未识别的 daemon 事件经标准化后进入共享 transcript reducer，可能被渲染器隐藏但已造成用户可见的状态污染。涉及 SDK 数据流设计，值得关注。
   - https://github.com/QwenLM/qwen-code/issues/8823

5. **提案：基于 workflow 引擎重建 /review 第 3–5 步编排**（#8769）— P2，讨论中
   - 将 /review 技能的 agent fan-out、验证与反向审计从模型驱动迁移到工作流引擎，使编排结构确定化。反映社区对可预期、可调试工作流的诉求。
   - https://github.com/QwenLM/qwen-code/issues/8769

6. **提案：统一各端会话推理循环（Turn-based SessionRuntime）**（#8775）— 见上文第 2 条，此处略。
   - https://github.com/QwenLM/qwen-code/issues/8775

7. **TUI 在 Web 终端中闪烁/撕裂**（#8659）— P3，welcome-pr
   - Web 终端（如阿里云 Workbench）下虚拟化历史模式的全屏 ANSI 重绘导致持续闪烁，建议提供开关。影响远程开发体验，欢迎 PR。
   - https://github.com/QwenLM/qwen-code/issues/8659

8. **Windows 独立安装器 Get-FileHash 解析失败**（#7118）— P2，欢迎 PR，获 3 👍
   - PowerShell 无法解析 Get-FileHash 时 SHA-256 校验失败，安装回退提示也不够明确。Windows 用户阻塞性痛点，社区关注度高。
   - https://github.com/QwenLM/qwen-code/issues/7118

9. **Main CI 失败：cli/monitor.test.ts 监控工具调用断言**（#8822）— P2，ready-for-agent
   - E2E 测试在 monitor 工具调用场景下持续失败，已标记为 autofix 待处理。测试稳定性问题频发，是当前 CI 健康的短板。
   - https://github.com/QwenLM/qwen-code/issues/8822

10. **fix(serve)：大会话恢复超时时保留当前会话**（#8678）— P1，进行中
    - PR1 已合并（#8691），实现超时契约与可观测性。但完整方案仍需跟进，属 P1 高优先级，影响大会话场景的可靠性。
    - https://github.com/QwenLM/qwen-code/issues/8678

## 重要 PR 进展

1. **feat(cli): 添加原生多智能体协调**（#8804）
   - 新增 `/coordinate <goal>` 命令，基于现有 Agent Team 运行时与 Agent View 构建，不引入新的监督者或 PTY 栈。与 #8718 RFC 直接呼应。
   - https://github.com/QwenLM/qwen-code/pull/8804

2. **fix(web-shell)：按稳定消息 ID 对齐 daemon 状态**（#8798）
   - 让 daemon 成为 mid-turn 消息的唯一权威源，Web Shell 按 ID 对齐会话队列，修复刷新/切换会话后的消息恢复与重复提交问题。
   - https://github.com/QwenLM/qwen-code/pull/8798

3. **fix(web-shell)：停止将未识别 daemon 事件渲染到 transcript**（#8812）
   - 为 daemon UI 归一化器产生的 debug 事件添加结构化 debugReason，Web Shell 按此分支渲染，消除误渲染导致的用户困惑。
   - https://github.com/QwenLM/qwen-code/pull/8812

4. **fix(core)：延迟工具发现期间保持提示缓存稳定**（#8276）
   - `tool_search` 在模型可见结果中呈现匹配 schema，通过稳定的 `deferred_tool_call` 桥接后续调用。优化延迟工具发现场景的缓存命中率。
   - https://github.com/QwenLM/qwen-code/pull/8276

5. **feat(cli)：在 ACP 会话中采用 Goal v3**（#8732）
   - 用 Goal v3 状态机替换 ACP/Web Shell 的旧 Stop-hook 实现，支持 create/status/edit/pause/resume/replace/clear 全生命周期，统一 CLI 与 ACP 行为。
   - https://github.com/QwenLM/qwen-code/pull/8732

6. **fix(core)：在所有 OpenAI 兼容提供商上捕获 content 中 thinking-tag 泄漏**（#8818）
   - 将 thinking-tag 泄漏防御从单厂商 opt-in 扩展为默认行为，并封堵两个绕过路径（#6666 相关）。
   - https://github.com/QwenLM/qwen-code/pull/8818

7. **fix(ci)：看门狗静默沙箱挂起并回收泄漏容器**（#8816）
   - 为 run-agent.mjs 增加空闲看门狗（QWEN_IDLE_TIMEOUT_MS，默认 20 分钟），零输出即杀死 agent；同时回收泄漏容器，缓解 autofix 轮次被静默挂起浪费的问题。
   - https://github.com/QwenLM/qwen-code/pull/8816

8. **perf(ci)：triage 预算改为运营可调并提升上限**（#8810）
   - 将 triage 的 timeout-minutes 改为仓库变量 QWEN_TRIAGE_TIMEOUT_MINUTES（默认 60），替代固定 30 分钟上限。修复大型 PR 频繁被预算截断的问题。
   - https://github.com/QwenLM/qwen-code/pull/8810

9. **feat(cli)：添加 /advisor 命令进行第二意见会话审查**（#7567）
   - 新增手动 `/advisor [focus]` 命令，以只读 fork 方式让评审模型对当前会话给出独立第二意见，共享主会话上下文。
   - https://github.com/QwenLM/qwen-code/pull/7567

10. **feat(auth)：添加 Kimi 与小米 MiMo 提供商**（#8368）
    - /auth 第三方提供商新增 Kimi（Coding Plan/API Key/国际版）与小米 MiMo（按量付费覆盖中国、新加坡等区域），进一步扩展模型生态。
    - https://github.com/QwenLM/qwen-code/pull/8368

## 功能需求趋势

- **多会话编排与协调**：多个 issue/PR 围绕"让多个独立会话协同工作"展开（#8718、#8804、#8775），方向包括 leader-worker 模式、统一 SessionRuntime、跨会话状态共享。
- **企业级上下文与记忆集成**：#7585（外部上下文提供方）与 #7449（企业外部记忆集成）持续推进，目标是提供厂商中立、文档优先的集成规范。
- **新模型提供商支持**：#8368 添加 Kimi 与小米 MiMo，社区对国产模型接入保持持续需求。
- **本地/远程访问模式**：#8595 的 QR 码配对手机访问本地会话、#8659 的 Web 终端渲染适配，反映远程与移动场景的使用诉求。
- **工作流引擎驱动编排**：#8769、#8690 均在推动将更多技能（如 /review、Workflow 工具）迁移到确定性工作流引擎，提升可预期性与可调试性。

## 开发者关注点

- **测试稳定性与 CI 健康**：多个 E2E 测试失败 issue（#8756、#8799、#8766、#8822）与发布流水线失败（#8771）集中出现，开发者对 CI 的可靠性提出质疑。相关修复（#8795、#8813、#8792）也密集跟进，反映维护团队正在积极应对。
- **Windows 安装体验**：#7118 的安装校验失败问题持续被关注（3 👍），说明 Windows 用户基数不小，安装环节的健壮性需要加强。
- **MCP 协议兼容性**：#8784 暴露了 Streamable HTTP 可选流被拒时的降级缺陷，开发者对 MCP 生态的细粒度兼容性有较高要求。
- **会话恢复与大状态处理**：#8678（P1）与 #8411 聚焦会话恢复超时、sessionId 跨通道协调，大项目用户对会话可靠性的需求迫切。
- **TUI/Web 终端渲染适配**：#8659 在 Web 终端中的闪烁问题持续存在，远程开发场景的用户体验有待改善。

</details>

---
*本日报由 [agents-radar](https://github.com/huang-yi-dae/agents-radar) 自动生成。*