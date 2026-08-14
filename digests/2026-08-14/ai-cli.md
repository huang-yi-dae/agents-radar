# AI CLI 工具社区动态日报 2026-08-14

> 生成时间: 2026-08-14 01:40 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析日报

**日期：2026-08-14**

---

## 一、生态全景

当前 AI CLI 工具已进入**规模化落地与稳定性阵痛并存**的阶段。六大主流工具（Claude Code、OpenAI Codex、Gemini CLI、GitHub Copilot CLI、Kimi Code、OpenCode、Qwen Code）均在加速迭代，核心竞争已从"能用"转向"可靠"：跨会话消息投递、MCP 稳定性和子代理状态真实性成为普遍痛点。与此同时，各工具正沿差异化路线推进——Claude Code 深耕会话间协作，Codex 强化多代理编排与企业级集成，Gemini CLI 侧重安全加固与子代理可靠性，Qwen Code 聚焦多智能体 fleet 架构，而 Kimi Code 与 OpenCode 则在稳定性和基础体验上追赶。

---

## 二、各工具活跃度对比

| 工具 | Issues（24h） | PRs（24h） | Release | 版本节奏 | 最热 Issue 点赞/评论 |
|------|------|------|---------|---------|---------------------|
| **Claude Code** | ~15 条热点 | 2 条 | v2.1.231 / v2.1.232 | 高频（每日） | 723 👍 / 165 💬（多账号管理） |
| **OpenAI Codex** | 10 条热点 | 10 条（全部合并） | 4 个 alpha（0.148.0-a.11~14） | 极高频（每日多版） | 36 👍 / 15 💬（多代理模型兼容） |
| **Gemini CLI** | 10 条热点 | 10 条（4 合并 / 6 开放） | nightly v0.56.0 | 每日 nightly | 8 👍 / 8 💬（generalist 代理挂起） |
| **Copilot CLI** | 10 条热点 | 1 条（已关闭） | v1.0.80-0 / -1 | 中等（补丁为主） | 20 👍 / 6 💬（Agent effort 配置） |
| **Kimi Code** | 3 条活跃 | 0 条 | 无 | 停滞（无新版本） | 38 💬 / 0 👍（记忆系统） |
| **OpenCode** | 10 条热点 | 10 条（9 开放 / 1 关闭） | 无正式版（V2 迭代中） | 高频（V2 预发布） | 41 👍 / 37 💬（保留旧布局） |
| **Qwen Code** | 10 条热点 | 10 条（1 合并） | v0.21.11 / preview / nightly | 高频（每日） | 3 👍（Windows 安装器问题） |

---

## 三、共同关注的功能方向

### 1. 多智能体/子代理可靠性（全工具最高频）
- **Claude Code**：Subagent forking 默认开启后，跨会话消息投递回归成大事故（#86385 等 7 条互相印证）
- **OpenAI Codex**：Multi-Agent V2 拒绝新模型 gpt-5.6-luna（#34700，36 👍）
- **Gemini CLI**：子代理误报 GOAL 成功（#22323）、generalist 无限挂起（#21409，8 👍）
- **Qwen Code**：fleet 架构推进中，后台 Agent 恢复机制（#8586）
- **Copilot CLI**：code-review 子代理模型被静默替换（#4462）

### 2. 远程 MCP 稳定性（Codex、Copilot、Claude Code 三方叠加）
- OAuth 刷新竞态（Copilot #4472）、回调端口配置（Codex PR #38448）、redirect URI mismatch（Claude Code v2.1.231）、stdio 管道泄漏导致 EMFILE（Codex #26984）

### 3. 上下文管理准确性
- **Claude Code**：auto-compact 触发值异常膨胀（1.36M preTokens）
- **OpenCode**：手动 /compact 因超限失败（#42448）、上下文修剪静默丢弃指令（#42437）
- **Codex**：会话日志膨胀至 145GiB、上下文压缩后读取截断

### 4. 跨平台一致性（Windows 为重灾区）
- Windows 桌面端消息投递失效（Claude Code）、扩展资源加载失败（Codex #37458）、Ctrl+V 粘贴失效（Qwen #9061）、沙箱设置解析失败（Codex #30829）、剪贴板不可用（OpenCode #41470）

### 5. 多账号/Profile 管理
- Claude Desktop 多账号请求 723 👍（#18435）为全行业最高赞

### 6. 模型路由"不听话"
- Copilot 的 explore 硬编码模型（#3954）、Qwen 的 Gemini thinkingLevel 无条件发送（#9019）、Codex 的 spawn_agent 拒绝新模型（#34700）

---

## 四、差异化定位分析

| 工具 | 核心定位 | 目标用户 | 技术路线特征 |
|------|---------|---------|------------|
| **Claude Code** | 深度代理协作与多会话工作流 | 重度 agent 用户、桌面端深度使用者 | Subagent forking、@会话引用、强调上下文继承与 prompt cache |
| **OpenAI Codex** | 企业级、多环境适配的通用 CLI | 企业开发团队、多 IDE（VSCode/Devin）用户 | Rust 实现、高强度 PR 合并（当日 10/10）、Bedrock 等第三方 Provider 扩展 |
| **Gemini CLI** | 安全优先、模型能力最大化 | 关注供应链安全与模型原生的开发者 | 零依赖 OS 沙箱提案、AST 感知工具探索、A2A 协议 |
| **Copilot CLI** | 与 GitHub/VS Code 生态深度绑定 | GitHub 生态开发者、Copilot 订阅用户 | Agent 配置文件共享（.agent.md）、MCP 支持铺设中 |
| **Kimi Code** | 轻量级、聚焦核心对话体验 | 中文开发者、轻量用户 | 功能精简、无独立生态建设，迭代节奏缓慢 |
| **OpenCode** | 开源社区驱动、高可定制性 | 开源爱好者、自托管用户 | V2 重写中、大量依赖精简与性能优化、社区 PR 活跃 |
| **Qwen Code** | 多智能体编排（fleet）先行者 | 自动化/无头场景、中文生态 | `/coordinate` 命令、daemon 可观测性 API、SWE-bench 基准驱动 |

---

## 五、社区热度与成熟度

**最活跃（迭代最快）**：OpenAI Codex 与 Qwen Code — 每日多版本发布，PR 密度高（Codex 当日 10 条 PR 全部合并），处于功能快速扩张期。

**社区声量最大**：Claude Code — 723 👍 的多账号请求为全行业最高，但当日最大的跨会话消息回归事故也发生在该生态，头部工具的高关注度伴随高容忍度。

**安全加固期**：Gemini CLI — 连续出现供应链 RCE 修复（#28740）、CVE 升级（#28778）、A2A 认证绕过（#28699），显示进入安全成熟化阶段。

**社区驱动型**：OpenCode — 大量 V2 功能补齐与 UI 回归需求（41 👍 的布局保留请求），社区参与度高但项目仍处 V2 迁移的过渡期。

**增长缓慢**：Kimi Code — 无版本发布、无 PR 进展，核心功能（记忆系统）长期悬而未决，社区活跃度明显低于同期其他工具。

**最稳定的补丁节奏**：Copilot CLI — 补丁为主（v1.0.80-0/-1），功能谨慎推进，但模型配置灵活性的长期需求（#2904，20 👍）悬而未决，反映其保守的产品策略。

---

## 六、值得关注的趋势信号

### 信号 1：静默失败是行业级信任危机
从 Claude Code 的 `send_message` 报告成功但实际未投递（#86275）、Gemini 的子代理误报 GOAL（#22323）、到 Copilot 的模型配置被静默替换（#4462）——"报告成功但实际失败"正在成为跨工具的系统性通病。**对开发者的参考**：在自动化工作流中增加外部验证机制，不盲目信任 CLI 的状态报告。

### 信号 2：上下文压缩正在成为安全边界
OpenCode 报告上下文修剪**静默丢弃指令内容**（#42437，被标记为中高风险），Claude Code 报告压缩触发值虚高导致不必要的信息丢失。当压缩策略开始影响指令约束时，这不再是成本问题而是安全与合规问题。**对开发者的参考**：关键约束应写入文件而非依赖会话上下文。

### 信号 3：多代理的"调度透明度"缺口
所有推多代理的工具（Claude Code、Codex、Gemini、Qwen）都在同一天出现子代理行为不可控的报告——挂起、误报、拒绝新模型。多代理的价值已获共识，但**调度决策的黑盒化**正成为反噬。**对开发者的参考**：对子代理结果增加超时与校验，对关键任务使用单代理模式更可靠。

### 信号 4：Windows 平台成为"二等公民"的集体反噬
七大工具在同一天集中出现 Windows 专属严重 bug——粘贴失效、沙箱失败、安装器失败、消息投递失效。**对开发者的参考**：Windows 用户在选择工具时应关注特定版本的平台回归记录，并考虑锁定版本而非跟随自动更新。

### 信号 5：供应链安全从"最佳实践"变为"合格线"
Gemini 的 PR 工作流 RCE 修复、Copilot 的版本锁定、OpenCode 的 curl|bash 注入报告（#42434）——工具自身的供应链安全已从加分项变为门槛。**对开发者的参考**：审查所用 CLI 的安装方式与 CI/CD 集成链路的完整性校验。

### 信号 6：基准测试质量门禁开始发挥作用
Qwen Code 的 SWE-bench Verified 全量测试被标记 QUARANTINED（0/500 resolved），这是一个积极的信号——项目方在**主动公开质量回退**而非隐藏。**对开发者的参考**：关注工具官方基准状态页，作为版本升级决策的参考依据。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（数据截至 2026-08-14）

## 1. 热门 Skills 排行

**#1298 — skill-creator 修复：run_eval.py 误报 0% recall**（Open）
[GitHub](https://github.com/anthropics/skills/pull/1298) | 作者: MartinCajiao | 更新: 2026-06-23
修复 skill-creator 评估循环中始终报 recall=0% 的严重 bug，涉及 Windows 管道读取、触发检测及并行 worker。该问题有 10+ 独立复现，直接影响描述优化循环的信号质量，是当前社区最关注的 PR。

**#514 — document-typography 技能：生成文档的排版质量控制**（Open）
[GitHub](https://github.com/anthropics/skills/pull/514) | 作者: PGTBoos | 更新: 2026-03-13
解决 AI 生成文档中的孤词换行、孤行段落和编号错位等排版问题，覆盖所有 Claude 生成文档的通用痛点。

**#486 — ODT 技能：OpenDocument 创建/填充/解析**（Open）
[GitHub](https://github.com/anthropics/skills/pull/486) | 作者: GitHubNewbie0 | 更新: 2026-04-14
支持 .odt/.ods 格式的创建、模板填充、读取及转 HTML，触发词覆盖 ODT/ODS/ODF/OpenDocument/LibreOffice 等。

**#538 / #541 / #539 — Lubrsy706 系列修复**（均 Open）
[#538 PDF 大小写引用修复](https://github.com/anthropics/skills/pull/538)（更新: 2026-04-29）
[#541 DOCX 跟踪修订 w:id 冲突修复](https://github.com/anthropics/skills/pull/541)（更新: 2026-04-16）
[#539 skill-creator YAML 特殊字符校验](https://github.com/anthropics/skills/pull/539)（更新: 2026-04-16）
三个修复 PR 均针对文件格式技能的具体 bug，社区讨论集中在跨平台兼容性和文档损坏问题。

**#1367 — self-audit 技能：机械验证 + 四维推理质量门控**（Open）
[GitHub](https://github.com/anthropics/skills/pull/1367) | 作者: YuhaoLin2005 | 更新: 2026-07-02
交付前审计技能，先做输出文件机械验证，再按损害严重度排序执行四维推理审计，声称通用适配任何项目/技术栈/模型。

**#83 — skill-quality-analyzer 与 skill-security-analyzer 元技能**（Open）
[GitHub](https://github.com/anthropics/skills/pull/83) | 作者: eovidiu | 更新: 2026-01-07
为 marketplace 添加两个元技能：质量分析器（结构/文档、示例、资源五维评估）与安全分析器，是早期提交但持续被引用。

---

## 2. 社区需求趋势

**安全与信任边界**（热度最高）
[#492 Security: 社区技能冒充官方命名空间](https://github.com/anthropics/skills/issues/492) — 43 条评论，揭露 `anthropic/` 命名空间下的信任边界漏洞，用户可能向非官方技能授予高权限。

**组织级技能共享**
[#228 组织内直接共享技能](https://github.com/anthropics/skills/issues/228) — 16 条评论，8 👍，要求技能库/分享链接替代手动下载上传。

**技能创建工具链可靠性**
[#556 run_eval.py 触发率 0%](https://github.com/anthropics/skills/issues/556) — 12 条评论，7 👍，与 PR #1298/#1099/#1050 呼应，是社区最集中的技术债。
[#1169 同一 bug 的补充报告](https://github.com/anthropics/skills/issues/1169)

**Agent 生命周期管理**
[#1329 compact-memory 符号化压缩记忆](https://github.com/anthropics/skills/issues/1329) — 长跑 agent 的上下文管理。
[#1385 推理质量门控流水线提案](https://github.com/anthropics/skills/issues/1385) — 预校准→对抗评审→交付验证三阶段。

**文档处理边界问题**
[#12 DOCX 空白格式破坏](https://github.com/anthropics/skills/issues/12)、[#1175 SharePoint 权限设计](https://github.com/anthropics/skills/issues/1175) — 格式兼容性和权限控制持续受关注。

---

## 3. 高潜力待合并 Skills

**#723 — testing-patterns 技能**（更新: 2026-04-21）
[GitHub](https://github.com/anthropics/skills/pull/723)
覆盖完整测试栈：Testing Trophy 模型、单元测试 AAA 模式、React 组件测试（Testing Library）、边界用例。评论活跃，测试方向需求明确。

**#568 — ServiceNow 平台技能**（更新: 2026-08-12，最新活跃）
[GitHub](https://github.com/anthropics/skills/pull/568)
覆盖 ITSM/ITOM/ITAM/SAM/FSM/HRSD/CSDM/IntegrationHub 全模块，定位为平台助手而非窄脚本工具，近期仍在更新。

**#525 — Pyxel 复古游戏开发技能**（更新: 2026-07-15）
[GitHub](https://github.com/anthropics/skills/pull/525)
基于 pyxel-mcp 的像素风游戏工作流（写→运行捕获→检查→迭代），作者为 Pyxel 引擎原开发者，有品牌背书。

**#1479 — plan-file-hygiene 技能**（更新: 2026-07-27）
[GitHub](https://github.com/anthropics/skills/pull/1479)
解决规划产物无生命周期、持续堆积的问题，直接回应 #1417 issue，社区协作痕迹明显。

**#181 — SAP-RPT-1-OSS 预测技能**（更新: 2026-03-16）
[GitHub](https://github.com/anthropics/skills/pull/181)
基于 SAP 开源表格基础模型的预测分析，面向企业数据分析场景。

---

## 4. Skills 生态洞察

社区最集中的诉求是 **skill-creator 工具链的可靠性修复**（Windows 兼容、评估信号准确、YAML 校验）——这是阻碍社区贡献技能的核心瓶颈；其次是**安全边界治理**和**文档格式兼容性**两大方向。

---

# Claude Code 社区动态日报

**2026-08-14**


## 今日速览

昨日发布 v2.1.232 和 v2.1.231 两个版本，其中 Subagent forking 正式默认开启，并修复了 MCP OAuth 登录的 redirect URI 问题。社区方面，**Windows 桌面端跨会话消息投递失效**成为绝对热点，大量 issue 指向 2.1.227 运行时引入的回归，且 2.1.231 中仍未修复。

## 版本发布

### v2.1.232
- **Subagent forking 默认开启**：`subagent_type: "fork"` 的子代理现在继承完整对话上下文与 prompt cache；交互式会话中的非 teammate agent 默认在后台运行
- **会话快速引用**：在提示符中输入 `@` 即可按名称引用另一个 Claude 会话

### v2.1.231
- 修复 MCP OAuth 登录时，使用预注册 OAuth client（如 Slack）的服务器出现的 redirect URI mismatch 问题

## 社区热点 Issues

### 🔥 跨会话消息投递回归（Windows 桌面端）——当日最大事故

自桌面应用将内置运行时更新至 2.1.227 后，`send_message` 工具在 Windows 上出现系统性失效。多条 issue 相互印证，且 **2.1.231 仍未修复**。

- **[#86385]** 消息进入目标会话队列但永远不触发响应轮次——已在 2.1.231 复测仍复现（3 评论，1 👍）
- **[#86386]** 跨会话消息触发的轮次卡在 0 tokens，手动输入正常（4 评论，1 👍）
- **[#86237]** 消息渲染在目标会话 UI 中但从未进入运行时输入队列（4 评论，1 👍）
- **[#86298]** 消息被静默丢弃——因等待一个 UI 从未提供的审批，约 5 分钟后过期（4 评论）
- **[#86275]** 发送端报告"成功"但消息从未送达（8 评论，4 👍）
- **[#86014]** Windows 11 上 send_message 返回成功但 0/4 投递（7 评论，2 👍）
- **[#86012]** 跨会话消息导致接收方完全无响应，直至桌面端 idle-timeout 强制杀死（15 评论，3 👍）

**社区反应**：大量用户报告，多份包含完整复现步骤，已有多条被标记为 duplicate 指向同一根因。涉及 agent 协作的深度用户受影响最重。

- [#86398] 接收会话在消息触发的轮次上无限挂起（2 评论，1 👍）
- [#86370] macOS 上同样存在静默丢弃问题（3 评论，1 👍）

### 其他值得关注的 Issue

- **[#18435]** 请求 Claude Desktop 支持多账号配置与快速切换（165 评论，723 👍）—— 超长生命周期需求，社区呼声极高
- **[#84352]** CVP 已批准的组织在 Claude Code 中仍收到 cyber safeguard 拦截（94 评论，14 👍）—— 认证状态回溯问题
- **[#37323]** `/btw` 命令缺失于 VS Code 扩展，要求与终端 CLI 对齐（36 评论，164 👍）
- **[#85603]** 交互式 TUI 中，轮次进行中输入的内容在 turn 结束时被静默丢弃（22 评论，1 👍）
- **[#82092]** Apps gateway 向 Claude Desktop 下发无认证头的 OTLP endpoint，遥测数据全部被拒（10 评论，5 👍）

## 重要 PR 进展

- **[#86537]** 修复 CHANGELOG.md 中 "to to" 重复词——文档修正，无功能变更
- **[#60280]** 对剩余 workflows 中的 `actions/checkout` 和 `actions/github-script` 进行 SHA 固定（已关闭）—— 供应链安全加固的收尾工作

> 注：过去 24 小时内 PR 活跃度较低（共 2 条），版本发布为主要变更通道。

## 功能需求趋势

- **多账号/多 Profile 管理**（#18435，723 👍）：用户在 Claude Desktop 中管理多个 Claude 账号并快速切换的需求持续高涨
- **终端与 IDE 功能对齐**（#37323）：`/btw` 等命令在 VS Code 扩展中的缺失，反映社区对 CLI/IDE 一致体验的重视
- **Subagent 与多会话协作机制**：fork 模式默认开启后，围绕会话间通信可靠性的讨论急剧增加
- **OAuth 与认证稳定性**（#84352）：企业级认证审批状态的一致性问题日益突出

## 开发者关注点

- **运行时自动更新风险**：2.1.222 → 2.1.227 的桌面端捆绑更新引入了严重的跨会话消息回归，且跨版本持续存在。多名开发者反映自动更新后生产工作流中断，亟需版本回退机制或更谨慎的发布策略
- **静默失败比报错更可怕**：`send_message` 在多个场景下"报告成功但实际未投递"（#86275、#86014、#86088 等），开发者无法区分正常与失败，排查成本极高
- **会话生命周期管理**：消息在 paused/idle 会话、未加载会话上的行为不一致（#86138、#80863、#85679），且过期消息无通知机制，接收方永远无从知晓
- **上下文管理准确性**：auto-compact 触发值异常膨胀（#82863 达 1.36M preTokens，超过 1M 窗口；#81029 Advisor 工具虚增上下文计数），导致不必要的压缩，影响长会话稳定性

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报

**日期：2026-08-14**


## 今日速览

过去 24 小时内，Codex 发布了 4 个 Rust 版本（0.148.0-alpha.11 至 alpha.14）。社区讨论热度集中于 VS Code 扩展在 Windows 平台上的资源加载失败问题，以及多智能体（Multi-Agent V2）模式下的模型兼容性议题。值得关注的 PR 动态包括新增 Amazon Bedrock Runtime 提供商支持，以及对技能（Skills）前端元数据的模型标注解析功能。


## 版本发布

### Rust v0.148.0-alpha.11 ~ alpha.14

过去 24 小时内发布了 4 个 alpha 版本迭代：

- **rust-v0.148.0-alpha.11**
- **rust-v0.148.0-alpha.12**
- **rust-v0.148.0-alpha.13**
- **rust-v0.148.0-alpha.14**

此次密集发布暂未附带详细变更日志，推测与近期多项 bug 修复（如 MCP 泄漏、Windows 沙箱清单嵌入等）和内部功能迭代有关。


## 社区热点 Issues（Top 10）

**1. Codex 扩展无法启动："The extension couldn't load its resources"**
- **Issue**: [#37458](https://github.com/openai/codex/issues/37458)（已关闭）
- **标签**: Windows / 扩展
- **热度**: 53 条评论，👍 11
- **关注点**: 打开 VSCode 后 Codex 面板无法启动，提示资源加载失败。涉及 Windows x64 + VSCode 1.132.0，扩展版本 26.803.41515。同类问题在多个 Windows / Remote-SSH 环境中被报告，属高频阻塞性问题。

**2. MCP stdio 服务器泄漏管道 fd + 孤儿子进程 → 累积 EMFILE**
- **Issue**: [#26984](https://github.com/openai/codex/issues/26984)（开启中）
- **标签**: MCP / CLI
- **热度**: 21 条评论，👍 4
- **关注点**: 长时间运行 Codex CLI 后，MCP stdio 服务器泄漏文件描述符及孤儿进程，最终导致 "Too many open files" 错误。影响 0.137.0 及以上版本的长期会话。

**3. macOS 桌面版无法恢复远程控制 / CLI 线程**
- **Issue**: [#37403](https://github.com/openai/codex/issues/37403)（开启中）
- **标签**: macOS / 回归 / App
- **热度**: 19 条评论，👍 11
- **关注点**: 8 月 7 日更新后，桌面客户端无法从手机端远程控制恢复 CLI 线程，报 `already has an active writer` 错误，影响跨设备的无缝协作工作流。

**4. VS Code 扩展更新后停止自动包含 IDE 上下文**
- **Issue**: [#31553](https://github.com/openai/codex/issues/31553)（已关闭）
- **标签**: Windows / 扩展
- **热度**: 17 条评论，👍 12
- **关注点**: 在 VS Code Remote/容器（.vscode-server）环境中，扩展更新后无法自动附带 IDE 上下文。社区高度关注此回归。

**5. Windows 桌面版本地状态在断电后无法崩溃恢复**
- **Issue**: [#26990](https://github.com/openai/codex/issues/26990)（开启中）
- **标签**: Windows / 会话 / 配置
- **热度**: 15 条评论
- **关注点**: 断电后固定（pins）/项目被重置、配置回退，时间戳异常。反映桌面端持久化机制的可靠性缺口。

**6. TUI 不支持 Markdown 数学公式渲染（LaTeX）**
- **Issue**: [#18906](https://github.com/openai/codex/issues/18906)（开启中）
- **标签**: 增强 / TUI
- **热度**: 15 条评论，👍 22
- **关注点**: 终端 UI 中无法显示行内/块级 LaTeX 公式。技术类用户的长期功能诉求，点赞数高，社区意向明确。

**7. Multi-Agent V2 拒绝 gpt-5.6-luna 作为子代理**
- **Issue**: [#34700](https://github.com/openai/codex/issues/34700)（开启中）
- **标签**: Windows / App / 子代理
- **热度**: 15 条评论，👍 36
- **关注点**: Codex App 26.715.9868.0 下启用 multi_agent_v2 后，spawn_agent 拒绝 gpt-5.6-luna。高赞问题，新版模型与多代理功能的兼容性亟待解决。

**8. IDE 上下文在近期扩展版本中出现 RPC 序列化错误**
- **Issue**: [#34920](https://github.com/openai/codex/issues/34920)（已关闭）
- **标签**: Windows / 扩展 / 工具调用
- **热度**: 10 条评论，👍 5
- **关注点**: 26.715.x 系列扩展中 IDE Context 功能因 RPC 序列化错误失效，影响多个 IDE（VSCode / Devin）。

**9. Windows 沙箱设置程序因 bin 符号链接未被 CLI 找到**
- **Issue**: [#30829](https://github.com/openai/codex/issues/30829)（开启中）
- **标签**: Windows / 沙箱 / CLI
- **热度**: 10 条评论
- **关注点**: 全新安装后，`codex-windows-sandbox-setup.exe` 无法被 CLI 解析（bin junction 问题），导致沙箱功能不可用。企业版用户受影响。

**10. 功能请求：监控后台服务**
- **Issue**: [#2062](https://github.com/openai/codex/issues/2062)（开启中）
- **标签**: 增强 / 代理
- **热度**: 9 条评论，👍 10
- **关注点**: 允许代理监控长时间运行的构建/服务器进程，不阻塞其他任务，并可在完成后检查日志。长线功能请求，2025 年提出，社区仍有持续需求。


## 重要 PR 进展（Top 10）

**1. 新增 Amazon Bedrock Runtime 提供商**
- **PR**: [#38470](https://github.com/openai/codex/pull/38470)（已合并）
- **内容**: 新增内置 `amazon-bedrock-runtime` 提供商，支持 OpenAI 兼容的 Bedrock Runtime 端点，含 SigV4 服务配置及 AWS Profile/Region 支持。

**2. 解析技能（Skill）前置元数据中的模型标注**
- **PR**: [#38467](https://github.com/openai/codex/pull/38467)（已合并）
- **内容**: 为技能元数据增加可选 `model` 字段，识别 `model: luna` 等值且不阻断其他元数据加载。

**3. 跨 revert 重载保留线程订阅**
- **PR**: [#38463](https://github.com/openai/codex/pull/38463)（已合并）
- **内容**: 修复 `thread/revert` 请求连接关闭时订阅丢失的问题，保留并重启监听任务。

**4. 集中化回合环境选择状态**
- **PR**: [#38461](https://github.com/openai/codex/pull/38461)（已合并）
- **内容**: 将 `TurnEnvironmentSelection` 直接存储于 TurnEnvironment，消除环境 ID、工作目录等重复字段，相关解析、批准流程同步更新。

**5. 为 FileSystemPath 添加 AbsolutePathBuf 转换**
- **PR**: [#38460](https://github.com/openai/codex/pull/38460)（已合并）
- **内容**: 实现 `From<AbsolutePathBuf>` 转换，用于文件系统权限路径构造。

**6. 新增实验性线程队列 API**
- **PR**: [#38456](https://github.com/openai/codex/pull/38456)（已合并）
- **内容**: 新增 `thread/queue/add` 系列 API，支持持久化排队提交及 FIFO 自动调度。

**7. 在 Windows Bazel 构建中嵌入沙箱设置清单**
- **PR**: [#38450](https://github.com/openai/codex/pull/38450)（已合并）
- **内容**: 解决 `rules_rust` 丢弃链接器指令的问题，确保 `asInvoker` 清单嵌入 Windows 沙箱设置助手。

**8. 支持每服务器 MCP OAuth 回调端口**
- **PR**: [#38448](https://github.com/openai/codex/pull/38448)（已合并）
- **内容**: 新增 `oauth.callback_port` 配置项，支持插件声明和技能依赖元数据中的回调端口，优先使用服务器特定端口。

**9. 为全历史子代理刷新当前时间提醒**
- **PR**: [#38446](https://github.com/openai/codex/pull/38446)（已合并）
- **内容**: 排除父历史中的时间提醒消息，保留子代理新生成的提醒，防止重复累积。

**10. 在模型上下文中标记当前时间提醒**
- **PR**: [#38443](https://github.com/openai/codex/pull/38443)（已合并）
- **内容**: 将注入的时间提醒包装为 `<current_time_reminder>` 标签，工具输出保持纯文本。


## 功能需求趋势

- **IDE 上下文稳定性与兼容性**：VS Code 扩展在 Windows、WSL2、Remote-SSH 场景下多次出现 IDE 上下文失效或序列化错误，社区对跨平台一致性的期望显著增强。
- **多代理（Multi-Agent）能力**：新模型（如 gpt-5.6-luna）与多代理 V2 的兼容性引发高频讨论，期望新模型能即刻适配现有 Agent 调度。
- **Windows 沙箱与进程管理**：沙箱初始化、权限提升、子代理残留、文件句柄泄漏等问题频发，Windows 平台底层稳定性是明显的痛点。
- **长期会话与上下文管理**：会话日志膨胀（145GiB）、上下文压缩后读取截断、线程订阅保留等问题，反映长时运行场景下数据持久化的挑战。
- **外部模型与自定义 Provider**：MCP 回调端口、Amazon Bedrock Runtime 等 PR 表明社区对第三方服务集成的需求正在增长。


## 开发者关注点

- **高频痛点—— "扩展资源加载失败"**：已有多起独立报告（#37458、#37517、#37508），涉及 Windows、Remote-SSH、macOS 等多个环境，是影响面最广的阻塞性问题。
- **新模型 gpt-5.6-luna 兼容性**：多代理 spawn_agent 拒绝新模型（#34700、#38107），独立 CLI 与扩展内置 CLI 行为不一致，导致用户困惑。
- **Windows 沙箱 setup 文件解析失败**：bin junction 和 Bazel 构建清单问题（#28457、#30829、PR #38450）表明 Windows 沙箱链路仍在持续加固中。
- **进程与文件描述符泄漏**：MCP stdio 和子代理导致的 EMFILE 错误（#26984）及旧子代理卡死（#38408），是长时间运行场景下的稳定性隐患。
- **桌面应用会话可靠性**：断电恢复、上下文压缩后数据膨胀/截断、远程控制中断等问题，反映出桌面端在长周期使用下的持久化与恢复能力仍需提升。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报

**日期：2026-08-14**

---

## 今日速览

今日发布 nightly 版本 v0.56.0-nightly.20260814，主要包含针对容量错误的静默重试机制和 E2E 测试稳定性修复。社区讨论热度集中在 Agent 子代理的可靠性问题（误报成功、挂起）以及 Auto Memory 功能的安全与重试机制缺陷。安全方面，两项关键 PR 分别修复了 GitHub Actions 中的供应链 RCE 漏洞和 simple-git 的严重 CVE。

---

## 版本发布

### v0.56.0-nightly.20260814.gc0d192452

- 修复 `file-system-interactive` 端到端测试在慢速 CI 机器上的稳定性问题（PR #28793）
- 实现上下文感知的静默重试机制：针对容量（capacity）错误，在无人值守/非交互模式下自动退避重试，最多进行 2 次静默重试，并引入可用性 TTL（PR #28790，对应 Issue #28761）

---

## 社区热点 Issues

### 1. Subagent 达到 MAX_TURNS 后被误报为 GOAL 成功
**#22323** | P1 | 评论 12 | 👍 2
`codebase_investigator` 子代理在达到最大轮次限制、未进行任何分析的情况下，仍报告 `status: "success"` 和 `Termination Reason: "GOAL"`，掩盖了真实的中断原因。对依赖子代理结果的自动化流程有严重误导性。
[查看 Issue](https://github.com/google-gemini/gemini-cli/issues/22323)

### 2. Generalist 代理无限挂起
**#21409** | P1 | 评论 8 | 👍 8
当 CLI 将任务委托给 generalist 代理时，即使简单如创建文件夹的操作也会永久挂起（用户最长等待 1 小时）。通过提示词禁止使用子代理可规避此问题。社区关注度最高，已有 8 个 👍。
[查看 Issue](https://github.com/google-gemini/gemini-cli/issues/21409)

### 3. 利用模型 bash 亲和力：零依赖 OS 沙箱与执行后意图路由
**#19873** | P2 | 评论 8 | 👍 1
提议充分利用 Gemini 3 模型原生擅长 POSIX 工具链的特点，在保证安全的前提下，通过零依赖 OS 沙箱和“执行后意图路由”机制，让模型以更自然的方式操作代码库。属于架构级增强提案。
[查看 Issue](https://github.com/google-gemini/gemini-cli/issues/19873)

### 4. 组件级评估体系（EPIC）
**#24353** | P1 | 评论 7
在已有 76 个行为评估测试的基础上，扩展为组件级评估体系，覆盖 6 个受支持的 Gemini 模型。属于工程基建类 EPIC，影响后续所有 Agent 功能的迭代质量。
[查看 Issue](https://github.com/google-gemini/gemini-cli/issues/24353)

### 5. 评估 AST 感知的文件读取/搜索/代码库映射的价值
**#22745** | P2 | 评论 7 | 👍 1
EPIC 跟踪调查：AST 感知工具能否通过单次调用精确读取方法边界、减少 token 噪声和轮次浪费，从而提升效率。
[查看 Issue](https://github.com/google-gemini/gemini-cli/issues/22745)

### 6. Gemini 对自定义 Skills 和 Sub-agents 的使用率过低
**#21968** | P2 | 评论 6
用户反馈 Gemini 几乎不会主动使用自定义 skills 和子代理（除非明确指示），即使任务与已配置的 skill 高度相关。影响自定义工作流生态的实际价值。
[查看 Issue](https://github.com/google-gemini/gemini-cli/issues/21968)

### 7. Auto Memory 对低信号会话无限重试
**#26522** | P2 | 评论 5
后台提取代理若判定某会话为低信号而不读取，该会话永远不被标记为已处理，会被反复拉取重试。导致资源浪费和潜在死循环。
[查看 Issue](https://github.com/google-gemini/gemini-cli/issues/26522)

### 8. Auto Memory 需增加确定性脱敏并减少日志
**#26525** | P2 | 评论 4
Auto Memory 在将本地转录内容发送给模型前，未进行确定性的敏感信息脱敏（依赖模型自觉），且服务可能记录已存在的 skill 技能内容，存在隐私泄露风险。
[查看 Issue](https://github.com/google-gemini/gemini-cli/issues/26525)

### 9. Shell 命令执行完成后卡在 "Waiting input"
**#25166** | P1 | 评论 4 | 👍 3
终端显示命令仍在运行并等待输入，但实际命令早已完成。影响核心交互体验，优先级 P1。
[查看 Issue](https://github.com/google-gemini/gemini-cli/issues/25166)

### 10. 浏览器子代理在 Wayland 下失败
**#21983** | P1 | 评论 4 | 👍 1
`browser_agent` 在 Wayland 环境下运行失败，报告 `Termination Reason: GOAL` 但没有实际完成目标。P1 优先级，影响 Linux 用户的浏览器自动化场景。
[查看 Issue](https://github.com/google-gemini/gemini-cli/issues/21983)

---

## 重要 PR 进展

### 1. 修复 eval-pr 工作流中的供应链 RCE 漏洞
**#28740** | security | 🟢 Open
修复未信任的 fork 代码在特权 `pull_request_target` 上下文中执行的问题（对应 Issue #28336）。将评估工作流拆分为安全的 PR 构建步骤和受信任的 `workflow_run` 执行步骤。
[查看 PR](https://github.com/google-gemini/gemini-cli/pull/28740)

### 2. 修复 simple-git 严重 CVE（CVE-2026-28292）
**#28778** | security | 🟢 Open
将 `simple-git` 从 3.28.0 升级至 3.32.3，修复被 Trivy 标记为 CRITICAL 的漏洞。
[查看 PR](https://github.com/google-gemini/gemini-cli/pull/28778)

### 3. 多轮请求在取消/中止时整体回滚
**#28801** | core | ⚫ Closed
修复多轮请求中止后聊天历史残留未完成工具响应的问题——现在取消时整体回滚该次请求，避免会话状态错乱。
[查看 PR](https://github.com/google-gemini/gemini-cli/pull/28801)

### 4. 新增 Claude Sonnet 4.5 和 Opus 4.8 模型定义
**#28803** | models | ⚫ Closed
新增 Claude 系列模型的常量、别名解析、策略链回退和默认配置，扩展多模型支持。
[查看 PR](https://github.com/google-gemini/gemini-cli/pull/28803)

### 5. 容量错误的静默重试与可用性 TTL
**#28790** | core | ⚫ Closed
关闭 Issue #28761。非交互模式下自动退避重试容量错误，最多 2 次静默重试。
[查看 PR](https://github.com/google-gemini/gemini-cli/pull/28790)

### 6. 修复 Windows 下 ripgrep 的 EFTYPE 错误
**#25378** | core/agent | 🟢 Open
修复 Windows 上 `grep_search` 因架构不匹配（如下载了 ARM 版二进制）导致的 `spawn EFTYPE` 错误。该 PR 标注了 `help wanted`。
[查看 PR](https://github.com/google-gemini/gemini-cli/pull/25378)

### 7. 支持 WSL2 剪贴板图片粘贴
**#27588** | core/non-interactive | 🟢 Open
在 WSL 环境中通过 PowerShell 互操作读取 Windows 剪贴板并保存 PNG，修复 Issue #22274。已包含测试。标注 `help wanted`。
[查看 PR](https://github.com/google-gemini/gemini-cli/pull/27588)

### 8. 修复 boolean thought parts 泄漏为可见文本
**#28624** | agent | 🟢 Open
修复内部思考块中 `thought: true` 的布尔字段泄漏到模型输出中，显示为 `[Thought: true]` 的问题（对应 Issue #23525）。
[查看 PR](https://github.com/google-gemini/gemini-cli/pull/28624)

### 9. A2A 服务器强制认证并阻止 checkpoint 路径穿越
**#28699** | security | 🟢 Open
A2A 服务器的自定义 REST 路由（`/tasks`、`/executeCommand` 等）绕过认证直接注册，且存在 checkpoint 路径穿越漏洞。该 PR 修复了这两个安全问题。
[查看 PR](https://github.com/google-gemini/gemini-cli/pull/28699)

### 10. 修复 VSCode IDE Companion 的 stop() 挂起与 keep-alive 故障阈值
**#28789** | core | 🟢 Open
修复 `IdeServer.stop()` 在存在活跃 MCP 流会话时无限挂起的问题，以及 keep-alive 心跳间歇性失败未达阈值导致资源泄漏的问题（对应 Issue #28785）。
[查看 PR](https://github.com/google-gemini/gemini-cli/pull/28789)

---

## 功能需求趋势

| 方向 | 热度 | 代表 Issues |
|------|------|------------|
| **Agent 可靠性** | 🔥🔥🔥 | 子代理状态误报（#22323）、generalist 挂起（#21409）、shell 命令卡死（#25166） |
| **安全加固** | 🔥🔥🔥 | Auto Memory 脱敏（#26525）、PR 工作流 RCE（#28740）、simple-git CVE（#28778）、A2A 认证绕过（#28699） |
| **Auto Memory 改进** | 🔥🔥 | 无限重试低信号会话（#26522）、无效补丁静默跳过（#26523）、内存系统质量跟踪（#26516） |
| **AST 感知能力** | 🔥 | AST 感知文件读取与搜索（#22745）、AST 感知代码库映射 CLI 工具（#22746） |
| **新模型支持** | 🔥 | Claude Sonnet 4.5 / Opus 4.8（PR #28803） |
| **终端体验** | 🔥 | 终端 resize 闪烁（#21924）、外部编辑器退出后界面损坏（#24935） |
| **子代理透明度** | 🔥 | 子代理轨迹可通过 `/chat share` 分享（#22598）、bugreport 缺少子代理上下文（#21763） |

---

## 开发者关注点

- **状态误报问题突出**：子代理在 MAX_TURNS 或失败时仍报告 GOAL 成功（#22323、#21983），严重干扰用户对 Agent 真实状态的判断。社区对“隐藏中断”行为明显不满。
- **“挂起”成为高频词**：Generalist 代理挂起（#21409）、shell 命令假死（#25166）、退出编辑器后 UI 损坏（#24935）。交互可靠性是当前最大的体验瓶颈。
- **Auto Memory 引发隐私和资源双重担忧**：内容在脱敏前即进入模型上下文（#26525），低信号会话被无限重试（#26522）。后台服务的资源使用和隐私边界需要更严格的控制。
- **安全漏洞修复正在加速**：近期集中修复了供应链 RCE（#28740）、严重 CVE（#28778）、认证绕过与路径穿越（#28699），表明项目正在经历一轮安全加固周期。
- **子代理被“闲置”**：模型不会主动使用自定义 skills 和子代理（#21968），社区期待更智能的自动调度，而非仅靠用户显式指令触发。

---

> 数据来源：[google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli) | 统计窗口：2026-08-13 ~ 2026-08-14

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

## GitHub Copilot CLI 社区动态日报 — 2026-08-14

### 今日速览

今日发布补丁版本 v1.0.80-0/1，核心新增 `--enable-mcp-server` 参数以在本次运行中临时启用被禁用的 MCP 服务器，并增强了共享会话的客户端数量显示。Issue 侧，连续第二天出现多个关于 `claude-haiku-4.5` 子代理 reasoning effort 不支持 `medium` 的重复报告，且多个长期存在的模型/Agent 配置问题（自定义 Agent 的 reasoning effort 支持、explore 工具硬编码模型）在今日获得大量关注。

---

### 版本发布

**v1.0.80-1** ([Release 链接](https://github.com/github/copilot-cli/releases))
- 常规修复与变更。

**v1.0.80-0** ([Release 链接](https://github.com/github/copilot-cli/releases))
- **新增** `--enable-mcp-server` 参数：允许在本次运行中重新启用因配置而被禁用的 MCP 服务器。
- **改进**：共享会话现在会在 `/ahp` 模式的 Sessions 标签中明确显示 `2 clients`（或更多）标识，便于区分有他人加入的会话。

---

### 社区热点 Issues（10 条）

**1. 自定义 Agent YAML Frontmatter 应支持 Reasoning Effort** — [#2904](https://github.com/github/copilot-cli/issues/2904)
- **标签**：agents / models | 状态：OPEN | 👍 20 | 💬 6
- **要点**：自定义 Agent（`.agent.md`）目前仅支持通过 `model` 字段指定模型，但无法为 Agent 单独设置推理努力度（reasoning effort），只能依赖全局 `--effort` 参数。
- **社区反应**：Issue 已持续近四个月，是目前该领域获赞最多的需求，属于长期悬而未决的配置灵活性缺口。

**2. `claude-haiku-4.5` 不支持 `medium` 推理努力度** — [#4345](https://github.com/github/copilot-cli/issues/4345)
- **标签**：agents / models | 状态：CLOSED | 👍 4 | 💬 5
- **要点**：当特定 feature flags（`copilot_cli_opus_medium_effort_default` 等）激活时，CLI 在子代理执行阶段对 `claude-haiku-4.5` 注入 `medium` 推理努力度，导致执行失败。
- **社区反应**：虽然该 Issue 已关闭，但今日出现多条同根因的新报告（#4473 等），说明修复可能未覆盖所有路径。

**3. 自定义 Agent `model` 字段拒绝数组语法** — [#2133](https://github.com/github/copilot-cli/issues/2133)
- **标签**：agents / models | 状态：OPEN | 👍 7 | 💬 4
- **要点**：VS Code Copilot Chat 支持 `model` 字段使用数组语法，但 Copilot CLI 会直接解析报错，拒绝加载 Agent，导致两个产品间的 Agent 配置文件不兼容。
- **社区反应**：老牌 Issue（近 5 个月），持续影响跨工具共享自定义 Agent 配置的开发者。

**4. `explore` 工具硬编码模型，忽略自定义/DeepSeek 配置** — [#3954](https://github.com/github/copilot-cli/issues/3954)
- **标签**：agents / models | 状态：OPEN | 👍 3 | 💬 3
- **要点**：v1.0.65 后 `explore` 工具忽略用户配置的自定义模型（如 DeepSeek 端点），强行向 API 传递 `gpt-5.4-mini` 参数，导致自定义模型使用者请求失败。
- **社区反应**：影响面覆盖所有 BYOK（自带密钥）用户，加上今日多条同类模型路由问题（#4462），"模型路由不尊重配置"已成为近期高频问题。

**5. 远程 MCP（OAuth）并发调用在 Token 刷新时互相取消** — [#4472](https://github.com/github/copilot-cli/issues/4472)
- **标签**：triage | 状态：OPEN | 评论 0
- **要点**：当多个工具调用并发命中同一 OAuth MCP 服务器且 Token 过期时，每个调用都会独立触发刷新逻辑并创建新的 rmcp 服务实例，导致在途请求被 "transport closed" 错误取消。
- **社区反应**：今日新提交，指向并发场景下的共享状态管理缺陷，预计会获得较高关注。

**6. 远程 MCP 初始化遇到瞬时 5xx 后整个会话不再重试** — [#4466](https://github.com/github/copilot-cli/issues/4466)
- **标签**：networking / mcp | 状态：OPEN | 评论 0
- **要点**：`initialize` 阶段遭遇瞬时 502 会被视为硬失败，会话剩余生命周期内不再重试该服务器。
- **社区反应**：与 #4472 同为远程 MCP 稳定性问题，MCP 相关 Bug 占今日新 Issue 约 1/3。

**7. MCP OAuth 在 Windows 上间歇性失败（socket error 10013）** — [#4463](https://github.com/github/copilot-cli/issues/4463)
- **标签**：authentication / platform-windows / mcp | 状态：OPEN | 评论 0
- **要点**：OAuth 流程在打开浏览器授权前，间歇性遭遇 Windows 套接字权限错误。
- **社区反应**：Windows 平台相关 OAuth 问题今日出现两条（另见 #4464），平台适配问题呈现集中爆发趋势。

**8. MCP OAuth 静默刷新作用域拼接错误（AADSTS70011）** — [#4464](https://github.com/github/copilot-cli/issues/4464)
- **标签**：authentication / mcp | 状态：OPEN | 评论 0
- **要点**：Microsoft Entra OAuth 的刷新请求错误地混合了 `.default` 与资源特定作用域，导致静默刷新永久失败，用户每 60-75 分钟被迫重新交互登录。
- **社区反应**：企业级用户的直接痛点，会显著影响 Azure 生态用户的使用体验。

**9. `code-review` 子代理的模型覆盖被静默忽略** — [#4462](https://github.com/github/copilot-cli/issues/4462)
- **标签**：agents / models | 状态：OPEN | 评论 0
- **要点**：内置 `code-review` 子代理配置为 `gpt-5.6-luna`，但 CLI 实际以 `gpt-5.6-sol` 启动，配置值被静默替换。
- **社区反应**：与 #3954 呼应，模型路由逻辑存在多层面的配置不生效问题。

**10. 长时间运行会话语义事件存储耗尽，导致会话状态异常** — [#4467](https://github.com/github/copilot-cli/issues/4467)
- **标签**：sessions / agents | 状态：OPEN | 评论 0
- **要点**：长时运行的项目会话生成大量子代理后，远程事件存储耗尽，会话状态与交接变得不可靠——进程存活却显示为已取消。
- **社区反应**：影响重度复杂任务开发者，属于规模上限类问题。

---

### 重要 PR 进展

**1. [CLOSED] docs: 记录自定义 Agent 的 effort frontmatter（方案 A）** — [#4476](https://github.com/github/copilot-cli/pull/4476)
- **内容**：为 #2904（effort 支持）补充文档，提出增设与 `model` 平行的 `effort` frontmatter 字段，并在 README 中新增 "Custom Agents" 参考章节。
- **状态**：已关闭（未合并）。
- **重要性**：作为需求 #2904 的文档前置尝试，虽被关闭，但表明维护者已关注该方向。

> 注：由于过去 24 小时内仅有一条 PR 更新记录，以下 PR 条目来自之前时间段，但仍为当前社区的活跃关注点。

---

### 功能需求趋势

从近 24 小时的所有 Issues 中可提炼出以下四大方向：

1. **模型/Agent 配置的精细化控制**（#2904、#2133、#3954、#4462）
   - 社区对当前的"全局统一逻辑 / 硬编码默认值"模式不满意，要求做到按 Agent 设置推理努力度、支持模型数组语法、模型路由严格遵循用户配置。
2. **远程 MCP 稳定性与并发正确性**（#4472、#4466、#4463、#4464）
   - OAuth 刷新竞态、初始化失败不重试、Windows 兼容性等问题表明，MCP 支持正经历规模化使用的阵痛期。
3. **会话生命周期管理**（#4467、#4468、#4469、#4474、#4477）
   - 包括：会话事件存储上限、`--server` 模式下扩展进程泄漏、"停止"后会话丢失、孤儿 `permission.requested` 事件重放等。社区期望更强的会话可见性和可恢复性。
4. **可观测性**（#4470）
   - 有开发者明确引用 Claude Code 的 `claude agents --json`，呼吁提供 JSON 格式的会话列表与状态查询接口，以便构建外部监控面板——这是一个清晰的功能信号。

---

### 开发者关注点

1. **模型路由"不听话"成为第一大痛点**：从 #3954（explore 硬编码）到 #4462（code-review 模型替换），再到 #4345/#4473（haiku 不支持 medium），模型选择逻辑的不可预测性正消耗着开发者大量的信任成本。
2. **远程 MCP 的高频故障**：OAuth 刷新错误、瞬时 5xx 不重试、并发调用互相取消、Windows socket 错误——当日新提交 Issue 中近 1/3 与 MCP 相关，且多为刚更新到 1.0.79 后出现，提示该版本可能存在回归。
3. **会话状态丢失与进程泄漏**：多个 Issue 指向长时间会话（事件存储耗尽、进程堆积、日志丢失）和停止操作后的状态不一致，凸显 CLI 在"长时间运行 + 频繁打断"的真实工作流下仍显脆弱。
4. **权限配置的边界问题**：`allowed_directories` 不生效（#4482）与 `permission.requested` 事件重放（#4469）表明权限系统在精细化场景下存在状态同步缺陷。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报 — 2026-08-14

## 今日速览

今日社区聚焦于三大问题：运行时稳定性（流式响应挂死与失控生成）、长期记忆机制缺失，以及 ACP 协议模式下的连接可靠性。近期无新版本发布，PR 侧亦无新增动态，社区讨论主要围绕上述 Bug 复现与特性设计展开。

## 版本发布

过去 24 小时内无新版本发布。

## 社区热点 Issues

本栏目精选过去 24 小时内有更新或高讨论度的 Issues，按关注度排序。

### 1. ACP/print 流式响应静默挂死（Issue #2598）
- **链接**: [MoonshotAI/kimi-cli Issue #2598](https://github.com/MoonshotAI/kimi-cli/issues/2598)
- **状态**: OPEN | 更新: 2026-08-13 | 评论: 1
- **核心问题**: ACP 模式下（kimi acp 0.34.0），流式响应结束后终端帧 `[DONE]` 偶发不返回，CLI 无限等待无超时机制；用户发送下一条消息后，挂死轮被静默顶替，且已流式答复未写入 wire.jsonl（无 content.part、无 usage.record）。
- **重要性**: 直指 ACP 协议实现中两个关键缺陷：缺乏空闲超时保护、被顶替轮次数据落盘不完整。0.31.1 版本仅覆盖 Esc 场景，此次暴露的是更普遍的"无声挂死"路径。
- **社区反应**: 尚无维护者响应，问题提交者给出了详细的现象描述与复现路径。

### 2. 失控乱码生成——单步生成 88k tokens（Issue #2597）
- **链接**: [MoonshotAI/kimi-cli Issue #2597](https://github.com/MoonshotAI/kimi-cli/issues/2597)
- **状态**: OPEN | 更新: 2026-08-13 | 评论: 1
- **核心问题**: 正常交互会话中，单次 LLM step 运行 3214 秒（约 53 分钟），输出 88,114 个乱码 token（多语言碎片、断裂 Markdown、无限重复）。
- **重要性**: 该问题揭示模型端缺少生成长度上限与异常输出熔断机制。此类失控会消耗大量 token 额度、阻塞会话，并可能导致历史记录被污染。
- **社区反应**: 暂时仅有提交者详述，无维护者回复。

### 3. 功能请求：跨会话持久化内存系统（Issue #1283）
- **链接**: [MoonshotAI/kimi-cli Issue #1283](https://github.com/MoonshotAI/kimi-cli/issues/1283)
- **状态**: OPEN | 更新: 2026-08-13 | 评论: 38 | 👍: 0
- **核心问题**: 请求实现综合 Memory System，支持跨会话记住项目模式、用户偏好等上下文，包含 AI 自动记忆与用户手动定义指令两种模式。
- **重要性**: 38 条评论表明社区对该功能需求强烈且讨论充分。该 Issue 自今年 2 月创建至今仍开放，长期活跃排第一。
- **社区反应**: 已在评论区展开对记忆粒度、存储安全与隐私策略的讨论，是当前社区最受期待的功能方向之一。

## 重要 PR 进展

过去 24 小时内无新增或更新的 Pull Requests。

## 功能需求趋势

从近期 Activities 中可提炼出以下社区关注方向（按热度排序）：

- **上下文记忆系统**：持久化跨会话上下文为最高频需求，Issue #1283 长期居首。
- **会话稳定性与协议可靠性**：ACP 模式下流式响应超时机制、数据落盘一致性是核心关注点。
- **生成异常防护**：要求增加输出长度上限、乱码检测等熔断与告警机制，防止单次失控生成阻塞会话。

## 开发者关注点

- **超时兜底机制缺失**: ACP 模式没有空闲超时配置项，无限等待导致会话挂死无法自愈（相关 Issue #2598）。
- **数据丢失隐患**: 被顶替的轮次未完整写盘（wire.jsonl 缺失 content.part），对审计、调试、成本核算均有负面影响。
- **长时阻塞与成本**: 单步生成 88k token 的失控案例引发关注，开发者普遍希望获得可配置的最大 token 上限与异常中断能力（相关 Issue #2597）。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-08-14

## 今日速览

今日社区核心关注点集中在三类问题上：OpenCode Zen **免费模型额度频繁触发 429 限流**（连续多条 Issue 报告）引发广泛讨论；V2 版本在**数据库迁移、TODO 工具缺失、Windows 控制台闪烁**等方面存在兼容性与体验问题；此外，**安全类报告**（升级脚本无完整性校验、webfetch SSRF、上下文修剪静默丢弃指令）成为今日新增焦点。PR 方面，`kitlangton` 主导了一批针对 V2 的性能优化与依赖清理工作。

## 社区热点 Issues

### 1. 保留旧版布局选项 — #37012
**讨论热度最高（37 条评论），👍 41**。用户详细列举了旧布局的便捷性优势：主窗口直达几乎所有功能，新版本需要多层导航；工作区管理更高效等。社区对此有较高呼声，是 UI 回归需求的最集中表达。
[GitHub Issue #37012](https://github.com/anomalyco/opencode/issues/37012)

### 2. VSCode Server 中"复制到剪贴板"失效 — #41470
在 VSCode Server（Docker 环境）中使用时，界面提示"Copied to clipboard"但实际并未写入系统剪贴板。影响远程开发场景下的基础操作，15 条评论表明多人复现。
[GitHub Issue #41470](https://github.com/anomalyco/opencode/issues/41470)

### 3. GitHub Copilot Provider 模型不显示 — #42083
在 1.18.15 上 `github-copilot` provider 认证成功，但模型选择器中完全看不到 Copilot 模型，`opencode models` 返回"Provider not found"。影响 Copilot 订阅用户的核心功能。
[GitHub Issue #42083](https://github.com/anomalyco/opencode/issues/42083)

### 4. 桌面应用启动加载失败 — #40516
约 80% 的启动场景下，provider/model/MCP 信息加载失败，已定位为版本回归：v1.18.4 正常，v1.18.5 至 v1.18.13 均异常。多人所在组织受影响，严重阻塞日常使用。
[GitHub Issue #40516](https://github.com/anomalyco/opencode/issues/40516)

### 5. `opencode upgrade` 存在 curl|bash 注入风险 — #42434
新增安全报告：升级脚本从远程直接拉取并管道至 bash 执行，无任何完整性校验（Supply-chain / TOCTOU 风险），确认后以完整用户权限运行。建议关注修复进展。
[GitHub Issue #42434](https://github.com/anomalyco/opencode/issues/42434)

### 6. V2 运行时丢失 TODO 工具 — #42421
V2 版本（0.0.0-next-17403）中模型不再暴露 `todowrite`/`todoread` 工具，TUI 中原生 TODO 列表功能对模型不可用，属 V1→V2 的功能降级。
[GitHub Issue #42421](https://github.com/anomalyco/opencode/issues/42421)

### 7. 压缩请求超出上下文窗口 — #42448
V2 会话中上下文已用 236k/299k（79%），自动压缩未触发，手动 `/compact` 因"提示词+输出超限"而失败。高输出模型在接近窗口上限时陷入无法压缩的僵局。
[GitHub Issue #42448](https://github.com/anomalyco/opencode/issues/42448)

### 8. opencode2 修改共享数据库破坏 V1 共存 — #42260
V2 迁移了数据库 Schema 导致 V1 的 `/move` 命令异常，会话被困在 worktree 中。影响双版本共存的用户，属于升级路径的兼容性事故。
[GitHub Issue #42260](https://github.com/anomalyco/opencode/issues/42260)

### 9. 上下文修剪静默丢弃指令内容 — #42437
安全报告（中高风险）：`session/compact` 在上下文裁剪时会静默丢弃含有指令/约束的内容，不仅是成本问题，更可能导致模型绕过用户设定的约束。
[GitHub Issue #42437](https://github.com/anomalyco/opencode/issues/42437)

### 10. webfetch 存在 SSRF 漏洞 — #42435
`webfetch` 工具可访问 loopback/私有地址，构成本地 SSRF；此前修复 PR（#40851）已关闭但未合并。叠加模型可能猜测 URL 的能力，风险放大。
[GitHub Issue #42435](https://github.com/anomalyco/opencode/issues/42435)

## 重要 PR 进展

### 1. 保留响应模型元数据 — #42433
修复 AI SDK adapter 丢弃 provider 返回的实际响应模型 ID 的问题，客户端目前只能看到请求别名（如 `provider/auto`）。首次提交后已获社区点赞，目前处于开放状态。
[GitHub PR #42433](https://github.com/anomalyco/opencode/pull/42433)

### 2. 延迟加载 npm 包解析器 — #42467
将 `npm-package-arg` 从启动路径中剥离，仅在实际执行 `Npm.add` 时加载，减少 CLI 冷启动开销。与 #42458（延迟加载 npm config）同属启动性能优化系列。
[GitHub PR #42467](https://github.com/anomalyco/opencode/pull/42467)

### 3. 本地 TUI 插件 SEA 加载修复 — #42466
修复 Node SEA 构建（opencode2-node）无法加载本地 TUI 插件的问题（`ERR_UNKNOWN_BUILTIN_MODULE`），通过 SEA 安全的运行时导入解决。
[GitHub PR #42466](https://github.com/anomalyco/opencode/pull/42466)

### 4. 移除 xdg-basedir 依赖 — #42222
用本地兼容实现替换 `xdg-basedir`，减少一个 6.8KB 的直接运行时依赖。另有 #42462 完整移除该依赖包，持续精简依赖图。
[GitHub PR #42222](https://github.com/anomalyco/opencode/pull/42222) | [PR #42462](https://github.com/anomalyco/opencode/pull/42462)

### 5. V2 实验性性能改进 — #40427
将 V2-only 的性能优化系列从 dev 时代变更中精简提炼，涵盖会话路由加载等核心路径。已关闭，等待合入评估。
[GitHub PR #40427](https://github.com/anomalyco/opencode/pull/40427)

### 6. 隔离各标签页滚动状态 — #42456
修复启用 `tab_scroll` 实验后，切换标签页会串位的问题。此前 A 页滚动位置可能被 B 页保存，导致阅读位置错乱。
[GitHub PR #42456](https://github.com/anomalyco/opencode/pull/42456)

### 7. 从缺失目录中恢复会话 — #42455
会话工作目录被删除后，不再强制要求该目录 runner 启动，即可恢复会话；同时避免新会话落入不可用的继承目录，并修正 toast 渲染稳定性。
[GitHub PR #42455](https://github.com/anomalyco/opencode/pull/42455)

### 8. 修正标签页右键菜单行为 — #42453
V2 TUI 的标签页右键菜单改为纯指针交互：外部点击/右键关闭菜单且不触发底层 UI，右键打开中的菜单直接关闭，重命名操作稳定触发。
[GitHub PR #42453](https://github.com/anomalyco/opencode/pull/42453)

### 9. 按时间顺序截断回退边界 — #42461
回退视图的 staged/committed 截断改为按消息的时间顺序位置计算，而非比较不透明的消息 ID，覆盖了 ID 排序与时间戳翻转的边界场景。
[GitHub PR #42461](https://github.com/anomalyco/opencode/pull/42461)

### 10. 清理 V2 孤立导出 — #42459
移除 Schema/Core 中三个无调用方的 V2 导出（`McpEvent.BrowserOpenFailed`、`DurableEventManifest.SessionDurable`、`Instructions.applyDelta`），净删 29 行代码。
[GitHub PR #42459](https://github.com/anomalyco/opencode/pull/42459)

## 功能需求趋势

- **UI 布局与交互回归**: 旧版布局保留（#37012）、TUI 右侧栏显示后台子代理活动（#42369）表明部分用户对 V2 的导航效率不满意，希望保留或加强信息密度与直达性。
- **本地化支持**: 新增希伯来语（he）完整翻译请求（#42447），社区对多语言覆盖的需求持续扩展。
- **V2 功能补齐**: 从 TODO 工具缺失（#42421）、Plan/Build 模式切换异常（#42439）等 Issue 看，社区正在系统性地对照 V1 功能清单做 V2 差距分析，并积极反馈。
- **安全与完整性**: 今日集中出现升级脚本校验（#42434）、SSRF 防护（#42435）、上下文修剪完整性（#42437）三份安全报告，表明社区开始对工具的供应链安全和上下文数据完整性提出更高要求。

## 开发者关注点

- **免费模型限流体验不佳**: 多条 429 FreeUsageLimitError 报告（#42029、#42074、#42449、#42452），反映出免费额度的触发条件不透明（提及"未使用但被限"），以及恢复后短时间内再次被限的"假冷却"问题，开发者体验受损明显。相关 Issue #34344 指出通过 VPN 轮换可绕过 IP 限流，说明现有限流机制存在设计缺陷。
- **远程/容器环境剪贴板不可用**: VSCode Server 与 Docker 场景下复制功能失效，属于远程开发工作流的实际痛点，需要平台层适配。
- **桌面应用稳定性回归**: 1.18.5 起的多版本加载失败与升级脚本的供应链风险叠加，开发者对发布流程的质量把控提出了质疑。
- **依赖精简与启动性能**: 多个 PR 针对启动路径的依赖延迟加载与清理持续进行，社区对 CLI 冷启动耗时较为敏感。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报

**日期：2026-08-14**


## 今日速览

昨日发布 v0.21.11 正式版，核心亮点是 Agent Plugins v1 与原生多智能体 `/coordinate` 命令；与此同时，SWE-bench Verified 全量 E2E 基准测试状态为 **QUARANTINED（全 500 条用例 0 resolved）**，需警惕质量回退风险。社区焦点集中在多智能体 fleet 架构推进与 Windows 平台的若干回归 bug 上。

---

## 版本发布

### v0.21.11（正式版）
- **Agent Plugins v1**：支持通过插件扩展 Agent 能力（[#8834](https://github.com/QwenLM/qwen-code/pull/8834)）
- **原生多智能体工作流**：通过 `/coordinate` 命令支持只读 teammate 协同（[#8804](https://github.com/QwenLM/qwen-code/pull/8804)）

### v0.21.12-preview.1 / v0.21.11-nightly.20260814
- 修复 web-shell 独立会话目标保持问题（[#9038](https://github.com/QwenLM/qwen-code/pull/9038)）
- web-shell 新增工作区文件上传支持

> ⚠️ **基准测试警告**：`dsw-eas-full-20260813-r1/r3` 全量 SWE-bench Verified 验证（500/500 完成）结果为 **0 resolved**，状态 QUARANTINED，基准参考版本为 v0.21.11。

---

## 社区热点 Issues（Top 10）

1. **[RFC] 多 Qwen 会话原生协调机制**（[#8718](https://github.com/QwenLM/qwen-code/issues/8718)）
  多智能体 fleet 架构的纲领性提案：leader 可调度多个独立 worker 并保持交互。9 条评论，多个后续 issue 均依赖此设计。

2. **会话恢复超时时保留当前会话**（[#8678](https://github.com/QwenLM/qwen-code/issues/8678)）
  大体积恢复超时导致会话丢失。PR1 已合入（#8691），实现超时契约与可观测性，8 条评论持续跟进。

3. **Windows 独立安装器 Get-FileHash 失败**（[#7118](https://github.com/QwenLM/qwen-code/issues/7118)）
  安装时 SHA-256 校验失败导致安装中断。👍 3 为近期最高，已关闭（PR #9112 已修复）。

4. **Gemini 2.5 在 Vertex AI 上完全不可用**（[#9019](https://github.com/QwenLM/qwen-code/issues/9019)）
  `thinkingLevel` 字段被无条件发送（含 UNSPECIFIED 占位值），导致所有请求 400 失败，阻断 Gemini 2.5 用户。

5. **Keyless Vertex AI 无法从环境推断认证类型**（[#9025](https://github.com/QwenLM/qwen-code/issues/9025)）
  纯环境变量配置的 keyless ADC 在无头模式启动即失败，与 #9019 构成 Gemini/Vertex 双重阻断。

6. **Python SDK 拒绝 `permission_mode="auto"`**（[#9002](https://github.com/QwenLM/qwen-code/issues/9002)）
  SDK 客户端校验与 CLI 支持不一致，`auto` 值被 ValidationError 拦截。

7. **后台 Agent 恢复机制与 activeWork 追踪**（[#8586](https://github.com/QwenLM/qwen-code/issues/8586)）
  要求 daemon 深度健康检查暴露 `activeWork` 事实，为超时/卡死的后台 Agent 建立恢复路径（对应 PR #9042）。

8. **无工具结果时无头运行硬失败**（[#9026](https://github.com/QwenLM/qwen-code/issues/9026)）
  模型在工具结果后静默结束 turn 时，`NO_TOOL_RESULT_PROGRESS` 错误直接中止整个无头运行，影响自动化场景。

9. **`read_file` 仅凭扩展名将非图片文件发给模型**（[#9088](https://github.com/QwenLM/qwen-code/issues/9088)）
  伪 `.png` 文件（实为 JSON）被直接发送至多模态 API，原始 400 错误中断整个 turn。需 MIME 嗅探。

10. **Windows CLI 中 Ctrl+V 粘贴完全失效**（[#9061](https://github.com/QwenLM/qwen-code/issues/9061)）
  0.21.x 回归（0.21.0 正常），P1 优先级，影响 Windows 日常交互效率。

---

## 重要 PR 进展（Top 10）

1. **[#9086](https://github.com/QwenLM/qwen-code/pull/9086) `fix(review)`：修复 /review 管线的四个真实运行缺陷**
  针对三个真实 PR 端到端运行中暴露的 4 个缺陷逐一修复并附带回归测试。

2. **[#9080](https://github.com/QwenLM/qwen-code/pull/9080) `feat(serve)`：可轮询的 daemon turn 状态**
  新增 `GET /session/:id/turns/current` 与 `GET /session/:id/turns/:promptId`，支持外部轮询 `idle/queued/running/completed/cancelled/error` 状态。

3. **[#9111](https://github.com/QwenLM/qwen-code/pull/9111) `fix(desktop)`：补齐 Web Shell 外部链接打开**
  修复桌面 webview 静默丢弃 `target="_blank"` 的剩余四个链接面，统一走 Tauri opener。

4. **[#8978](https://github.com/QwenLM/qwen-code/pull/8978) `feat(serve)`：空 channel 集合优雅降级**
  `--channel all` 在有效 channel 为空时不再 `exit(1)` 拖垮 daemon，改为优雅 no-op。

5. **[#9039](https://github.com/QwenLM/qwen-code/pull/9039) `feat(core)`：隐私安全的工具结果边界诊断**
  在不泄露内容的前提下为工具结果边界增加诊断能力。

6. **[#9095](https://github.com/QwenLM/qwen-code/pull/9095) `feat(review)`：前瞻性收敛无限发现类别**
  让 `/review` 前瞻性地识别"枚举陷阱"类缺陷，而非逐个枚举无限变体。

7. **[#9042](https://github.com/QwenLM/qwen-code/pull/9042) `feat(daemon)`：后台 shell 纳入 activeWork 追踪**
  Session 管理的后台 shell（运行中/通知排队/驱动父 continuation）以 bounded hold 形式上报。

8. **[#9112](https://github.com/QwenLM/qwen-code/pull/9112) `fix(install)`：Windows 校验和绕过 Get-FileHash**（已合并）
  改用内联流式 .NET SHA-256 计算，修复 #7118。

9. **[#9007](https://github.com/QwenLM/qwen-code/pull/9007) `fix(serve)`：ACP HTTP 预附加缓冲区按字节限界**
  防止预附加阶段内存无界增长，属于资源安全加固。

10. **[#9098](https://github.com/QwenLM/qwen-code/pull/9098) `feat(cli)`：settings 键启用动态工作流**
  新增 `tools.workflowsEnabled` 设置，替代此前仅有的隐藏环境变量。

---

## 功能需求趋势

1. **多智能体编排（fleet）** — 最集中的开发主线：`/coordinate` 命令落地、teammate 运行时、fleet 持久化/恢复/加固（阶段 1A→3）全链路推进。
2. **Daemon 可观测性与恢复能力** — `activeWork` 事实、turn 状态轮询端点、后台 Agent 恢复路径，持续增强无人值守稳定性。
3. **Web Shell 完善** — 工作区文件上传、Channel 策略重设计、外部链接可靠性、会话隔离与 workspace 管理。
4. **Omni 多模态实验** — Memory 最小召回、Policy 链路闭环（降质压缩/能力补全）、治理收尾（GC/容量预算）多线并行。
5. **LLM 兼容性** — 指向 Gemini 2.5 在 Vertex AI 的双重阻断问题，暴露对第三方模型的适配深度不足。
6. **供应链安全与安装体验** — CODEOWNERS/最小权限/Scorecard、Windows 安装器 hash 算法替换，属持续加固方向。

---

## 开发者关注点

- **Windows 平台回归频发** — Ctrl+V 失效（P1）、安装器 Hash 失败、Desktop 弹出运行时终端等问题同日密集出现，Windows 用户体验需系统性回归验证。
- **无头/自动化场景脆弱** — 无工具结果硬失败（#9026）、keyless 认证推断失败（#9025）直接阻断 CI/CD 类使用。
- **第三方模型服务兼容性** — Gemini 2.5 + Vertex AI 的 `thinkingLevel` 问题被视为高优 bug，社区对多模型提供商支持的稳定性有明确期待。
- **客户端/服务端行为一致性** — SDK 与 CLI 的参数校验不一致（如 `permission_mode="auto"`）造成隐性摩擦。
- **文件类型判断过于天真** — 仅凭扩展名决定是否作为图片发送（#9088），开发者呼吁基于内容的 MIME 嗅探。
- **SWE-bench Verified 全量 0 resolved 引发警觉** — QUARANTINED 状态意味着质量回归风险，社区可能期待后续说明或修复版本。

</details>

---
*本日报由 [agents-radar](https://github.com/huang-yi-dae/agents-radar) 自动生成。*